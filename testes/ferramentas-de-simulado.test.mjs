/* As ferramentas que ajudam a montar e a revisar um simulado autoral (ferramentas/medir-banco-adaptado,
   conferir-numeros, vigencia, pos-simulado, figuras). Testam as funções puras com questões de mentira:
   cada meta do pedido de simulado tem um caso que a quebra, para a ferramenta nunca deixar passar. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { medir, tabelaMarkdown } from "../ferramentas/medir-banco-adaptado.mjs";
import { divergencias, dicasDoEnunciado, conferirQuestoes } from "../ferramentas/conferir-numeros.mjs";
import { filtrar, anosCitados, mesDaJustificativa } from "../ferramentas/vigencia.mjs";
import { agregar, avaliar } from "../ferramentas/pos-simulado.mjs";
import { sugerir } from "../ferramentas/figuras.mjs";
import { MODELOS } from "../ferramentas/figuras-modelos.mjs";

const LETRAS = ["A", "B", "C", "D"];
/* palavras próprias de cada questão, para que uma não repita o vocabulário da outra */
const SILABAS = ["ba", "ce", "di", "fo", "gu", "ha", "ji", "ko", "lu", "ma", "ne", "pi"];
const palavraUnica = (n, k) => `${SILABAS[n % 12]}${SILABAS[Math.floor(n / 12) % 12]}${SILABAS[(n * 7 + k) % 12]}${k}`;
const texto = (n, tam) => (Array.from({ length: 8 }, (_, k) => palavraUnica(n, k)).join(" ") + " ".repeat(40)).replace(/ +/g, " ").slice(0, tam).padEnd(tam, "x");

/* uma questão com gabarito `g`; o tamanho das alternativas faz a correta ter o rank pedido (1 = a mais longa) */
function questao(n, { g = "A", rank = 1, area = "area-x", assunto = "ass-1", enunciado, expl, status } = {}){
  const tam = [60, 58, 56, 54];  // diferenças de ~3%: dentro da margem
  const ordem = LETRAS.filter(l => l !== g); ordem.splice(rank - 1, 0, g);
  const porLetra = Object.fromEntries(ordem.map((l, i) => [l, tam[i]]));
  return {
    id: `q-t-${String(n).padStart(3, "0")}`, areaId: area, assuntoId: assunto, gabarito: g, status,
    enunciado: enunciado || `Caso ${n}: ` + Array.from({ length: 12 }, (_, k) => palavraUnica(n, k)).join(" ") + "?",
    alternativas: LETRAS.map(l => ({ id: l, texto: texto(n * 4 + LETRAS.indexOf(l), porLetra[l]) })),
    explicacaoGeral: expl || `A alternativa ${g} está correta. ${LETRAS.filter(l => l !== g).map(l => `${l} está errada porque sim.`).join(" ")}`,
  };
}
/* a prova real de 8 questões e o banco adaptado: gabarito = letra seguinte, mesmo assunto e área */
const reais = [..."ABCDABCD"].map((g, i) => questao(i + 1, { g, assunto: `ass-${i}`, area: i < 4 ? "area-a" : "area-b", enunciado: `Real ${i}: ` + Array.from({ length: 12 }, (_, k) => palavraUnica(i + 100, k)).join(" ") }));
const proxima = (g) => LETRAS[(LETRAS.indexOf(g) + 1) % 4];
const bancoBom = () => reais.map((r, i) => questao(i + 1, { g: proxima(r.gabarito), rank: (i % 4) + 1, assunto: r.assuntoId, area: r.areaId }));
const metas = (r) => r.violacoes.map(v => v.meta);

test("medir: um banco que cumpre tudo não tem violação e a tabela diz 'ok'", () => {
  const r = medir(bancoBom(), reais, []);
  assert.deepEqual(r.violacoes, [], JSON.stringify(r.violacoes));
  assert.doesNotMatch(tabelaMarkdown(r), /\*\*falta\*\*/);
});

test("medir: gabarito que não é a letra seguinte da prova real, e assunto trocado, são apontados pela posição", () => {
  const b = bancoBom();
  b[0].gabarito = "D"; b[0] = { ...b[0] };
  b[2].assuntoId = "ass-errado";
  const r = medir(b, reais, []);
  assert.ok(metas(r).includes("gabarito = letra seguinte"));
  assert.ok(r.violacoes.some(v => v.meta === "assunto da posição" && /posição 3/.test(v.detalhe)));
});

test("medir: prova real anulada deixa a letra livre (não é violação) e aparece na lista", () => {
  const rr = reais.map((q, i) => i === 1 ? { ...q, status: "anulada", gabarito: "" } : q);
  const b = bancoBom(); b[1].gabarito = "A";
  const r = medir(b, rr, []);
  assert.ok(!r.violacoes.some(v => v.meta === "gabarito = letra seguinte" && /posição 2/.test(v.detalhe)));
  assert.deepEqual(r.dados.livres, [2]);
});

test("medir: alternativa mais longa mais de 10% acima da segunda é apontada, com a posição e se é o gabarito", () => {
  const b = bancoBom();
  b[4].alternativas[0].texto = "x".repeat(80);   // a correta (A ou outra) deixa de ser a mais longa por pouco: força margem
  const maior = b[4].alternativas.reduce((m, a) => a.texto.length > m.texto.length ? a : m);
  maior.texto = "y".repeat(120);
  const r = medir(b, reais, [], {});
  const v = r.violacoes.find(x => x.meta === "margem de tamanho");
  assert.ok(v && /posição 5/.test(v.detalhe), JSON.stringify(r.violacoes));
});

test("medir: distribuição de área diferente da prova real é apontada", () => {
  const b = bancoBom(); b[7].areaId = "area-a";
  assert.ok(metas(medir(b, reais, [])).includes("distribuição por área"));
});

test("medir: letras do gabarito muito desiguais são apontadas", () => {
  const b = bancoBom().map(q => ({ ...q, gabarito: "A" }));
  assert.ok(metas(medir(b, reais, [])).includes("letra do gabarito"));
});

test("medir: enunciado quase igual ao da prova real, e enunciado repetido de outra questão do banco", () => {
  const b = bancoBom();
  b[0].enunciado = reais[0].enunciado + " a";
  const r1 = medir(b, reais, []);
  assert.ok(metas(r1).includes("semelhança com a prova real"));
  const b2 = bancoBom();
  const outra = { id: "q-outra", enunciado: b2[3].enunciado };
  assert.ok(metas(medir(b2, reais, [outra])).includes("repete outra questão do banco"));
});

test("conferir-numeros: 9 minutos no enunciado e 11 na explicação é suspeito; o ponto de corte e o escore calculado não", () => {
  const d = divergencias("Recupera a circulação após 2 choques e 9 minutos de reanimação. PAM de 75 mmHg.",
    "A alternativa D está correta. Dicas do enunciado: retorno após **11 minutos de reanimação** com **PAM de 75 mmHg**. A PAM deve ficar em 65 mmHg ou mais.");
  assert.deepEqual(d.map(x => x.unidade), ["minutos"]);
  assert.deepEqual(d[0].soNoEnunciado, ["9"]); assert.deepEqual(d[0].soNaExplicacao, ["11"]);
  // o corte "65 mmHg ou mais" fica fora da frase de dicas; e dentro da frase, palavra de limite é ignorada
  assert.deepEqual(divergencias("Paciente com 36 anos e PAM de 75 mmHg.", "Dicas do enunciado: **36 anos**, PAM de 75 mmHg (alvo de 65 mmHg ou mais). Outro texto com 80 anos."), []);
  assert.match(dicasDoEnunciado("A está correta. Dicas do enunciado: dado um e dado dois. Resto aqui."), /dado dois\.$/);
  assert.equal(conferirQuestoes([{ id: "q-1", enunciado: "Tem 9 minutos.", explicacaoGeral: "Dicas do enunciado: tem **11 minutos**. Fim." }]).length, 1);
});

test("vigencia: acha a citação de uma diretriz pelo termo e pelo ano, e a data da justificativa", () => {
  const qs = [
    { id: "q-1", referencias: "KDIGO 2021 Clinical Practice Guideline. Kidney Int 2021.", criadoEm: "2026-01-10" },
    { id: "q-2", referencias: "KDIGO 2024 Clinical Practice Guideline.", justificativaEm: "2026-10" },
    { id: "q-3", referencias: "ATS/IDSA 2019. Am J Respir Crit Care Med.", criadoEm: "2026-03-02" },
  ];
  assert.deepEqual(filtrar(qs, { termo: "KDIGO", ate: 2023 }).map(x => x.id), ["q-1"]);
  assert.deepEqual(filtrar(qs, { termo: "kdigo" }).map(x => x.id), ["q-1", "q-2"]);
  assert.deepEqual(filtrar(qs, { ate: 2019 }).map(x => x.id), ["q-3"]);
  assert.deepEqual(filtrar(qs, { antes: "2026-06" }).map(x => x.id), ["q-1", "q-3"]);
  assert.equal(mesDaJustificativa(qs[0]), "2026-01");
  assert.deepEqual(anosCitados(qs[2]), [2019]);
});

test("pos-simulado: aponta acerto abaixo do acaso, questão que não discrimina, distrator que vence e poucas respostas", () => {
  const q = (gab) => ({ gabarito: gab, alternativas: LETRAS.map(id => ({ id })) });
  const questoes = new Map([["q-a", q("A")], ["q-b", q("A")], ["q-c", q("A")], ["q-d", q("A")]]);
  const resp = (a, b, c, d) => ({ respostas: { "q-a": a, "q-b": b, "q-c": c, ...(d ? { "q-d": d } : {}) }, tempos: { "q-a": 60 } });
  const resultados = [];
  for(let i = 0; i < 12; i++) resultados.push(resp("B", "A", i < 5 ? "B" : "A", i === 0 ? "A" : undefined));   // a: 0% | b: 100% | c: 7/12 | d: 1 resposta
  const ags = agregar(["q-a", "q-b", "q-c", "q-d"], resultados, questoes);
  const por = Object.fromEntries(ags.map(a => [a.id, avaliar(a, questoes.get(a.id), { min: 10 })]));
  assert.match(por["q-a"].motivos.join(" "), /abaixo do acaso/);
  assert.match(por["q-a"].motivos.join(" "), /mais marcada que o gabarito/);
  assert.match(por["q-b"].motivos.join(" "), /não discrimina/);
  assert.deepEqual(por["q-c"].motivos, []);
  assert.match(por["q-d"].motivos.join(" "), /poucas respostas/);
  assert.match(avaliar(ags[0], questoes.get("q-a"), { min: 10, relatos: 3 }).motivos.join(" "), /3 relato/);
});

test("figuras: o catálogo é determinístico, os parâmetros mudam o desenho e a sugestão separa o que se desenha do exame de imagem", () => {
  assert.equal(MODELOS.curvaRoc.desenhar(), MODELOS.curvaRoc.desenhar());
  assert.notEqual(MODELOS.curvaRoc.desenhar({ expoente: 3 }), MODELOS.curvaRoc.desenhar());
  assert.match(MODELOS.floresta.desenhar({ linhas: [["a", "RR", 0.9, 0.8, 1.1], ["b", "RR", 1.2, 1, 1.5], ["c", "RR", 1, 0.7, 1.4], ["d", "RR", 2, 1.1, 3]] }), /<svg[^>]+height="480"/);
  assert.match(sugerir("Traçado de cardiotocografia"), /cardiotocografia/);
  assert.match(sugerir("Radiografia de tórax realizada na sala de emergência"), /não se desenha/);
  assert.match(sugerir("Curva de IMC para idade"), /sem modelo/);
});
