/* ferramentas/medir-banco-adaptado.mjs — mede um banco de questões adaptadas (autorais) em
   relação à prova real em que se inspiram, sem abrir arquivo nenhum, e FALHA quando uma meta
   do pedido de simulado não é cumprida.

   Uso:
     node ferramentas/medir-banco-adaptado.mjs banco-simulado-epm-2 prova-unifesp-2025
     node ferramentas/medir-banco-adaptado.mjs banco-simulado-epm-2 prova-unifesp-2025 --exigir   (sai com código 1 se faltar meta)
     node ferramentas/medir-banco-adaptado.mjs banco-simulado-epm-2 prova-unifesp-2025 --md       (tabela pronta para a auditoria)
     node ferramentas/medir-banco-adaptado.mjs --todos --exigir        (os bancos de ferramentas/bancos-adaptados.json)
   Opções: --margem 10 (limite, em %, da alternativa mais longa sobre a 2ª) · --direcao acima (gabarito = letra anterior; padrão abaixo) · --incluir-anteriores (com --todos)

   Metas que exigem (as do pedido de simulado):
   - a letra do gabarito: cada uma perto de 100/k % (tolerância de 4 pontos);
   - a posição do gabarito por tamanho de alternativa (1ª a kª), cada uma perto de 100/k %;
   - a alternativa mais longa passa a 2ª em no máximo 10% — olhe posição por posição, não só o máximo;
   - a distribuição por área idêntica à da prova real;
   - o gabarito é a alternativa SEGUINTE à da prova real (A→B … último→A) — ou a ANTERIOR (B→A … A→último)
     quando o banco declara `"direcao": "acima"` em bancos-adaptados.json; onde a real foi anulada a letra
     é livre e só sai na lista, para conferir o equilíbrio;
   - o assunto de cada posição é o da questão real da mesma posição;
   - a semelhança do enunciado (palavras de 3 letras ou mais) com o da questão real correspondente e
     com as outras questões reais da mesma prova: no máximo 50%;
   - nenhuma questão repete outra do banco (≥25% de trechos de 4 palavras ou ≥60% do vocabulário).
   Só informa, sem exigir: maior sequência da mesma letra, distribuição de dificuldade (alvo
   30/50/20 depois de calibrada pelo desempenho real), alternativas erradas comentadas na explicação ("B está errada porque…").
   Só lê o conteúdo de dados/ (pela lista do manifesto); não grava nada. */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { carregar, RAIZ } from "./lib-dados.mjs";

export const METAS = { toleranciaPontos: 4, margemMaxPct: 10, semelhancaMaxPct: 50, trechosPct: 25, vocabularioPct: 60, dificuldade: { fundamental: 30, intermediario: 50, avancado: 20 } };

const semAcento = (t) => String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const palavras = (t) => new Set(semAcento(t).match(/[a-z0-9]{3,}/g) || []);
const trechos = (t, k = 4) => { const w = semAcento(t).match(/[a-z0-9]+/g) || []; const s = new Set(); for(let i = 0; i + k <= w.length; i++) s.add(w.slice(i, i + k).join(" ")); return s; };
const proporcao = (A, B) => A.size ? [...A].filter(w => B.has(w)).length / A.size : 0;
const contar = (lista, chave) => lista.reduce((m, x) => { const k = chave(x); m[k] = (m[k] || 0) + 1; return m; }, {});
const pct1 = (x) => (x * 100).toFixed(1).replace(/\.0$/, "") + "%";

/* Mede e devolve { dados, violacoes }. `outras` = o resto do banco (para achar repetição); pode ser [] */
export function medir(novas, reais, outras = [], opcoes = {}){
  const margemMax = (opcoes.margemMaxPct ?? METAS.margemMaxPct) / 100;
  const violacoes = [];
  const falha = (meta, detalhe) => violacoes.push({ meta, detalhe });
  const n = novas.length, k = Math.max(...novas.map(q => q.alternativas.length));
  const letras = novas[0].alternativas.map(a => a.id);
  const alvo = 1 / k, tol = METAS.toleranciaPontos / 100;
  const passo = opcoes.direcao === "acima" ? -1 : 1, nomeDirecao = passo === 1 ? "seguinte" : "anterior";

  // letra do gabarito e posição do gabarito por tamanho
  const porLetra = contar(novas, q => q.gabarito);
  letras.forEach(l => { const s = (porLetra[l] || 0) / n; if(Math.abs(s - alvo) > tol) falha("letra do gabarito", `${l} tem ${pct1(s)} (alvo ${pct1(alvo)} ± ${METAS.toleranciaPontos} pontos)`); });
  const posicoes = novas.map((q, i) => {
    const tam = q.alternativas.map(a => a.texto.length), gi = q.alternativas.findIndex(a => a.id === q.gabarito);
    const ordem = tam.map((t, j) => [t, j]).sort((a, b) => b[0] - a[0]);
    return { pos: i + 1, id: q.id, empate: tam.filter(t => t === tam[gi]).length > 1, rank: ordem.findIndex(o => o[1] === gi) + 1, margem: ordem[0][0] / ordem[1][0] - 1, longaEGabarito: ordem[0][1] === gi };
  });
  const porRank = contar(posicoes, p => p.rank);
  for(let r = 1; r <= k; r++){ const s = (porRank[r] || 0) / n; if(Math.abs(s - alvo) > tol) falha("posição do gabarito por tamanho", `a ${r}ª mais longa tem ${pct1(s)} dos gabaritos (alvo ${pct1(alvo)} ± ${METAS.toleranciaPontos} pontos)`); }
  const acimaMargem = posicoes.filter(p => p.margem > margemMax + 1e-9);
  acimaMargem.forEach(p => falha("margem de tamanho", `posição ${p.pos} (${p.id}): a mais longa passa a 2ª em ${pct1(p.margem)}${p.longaEGabarito ? ", e é o gabarito" : ""} (limite ${pct1(margemMax)})`));
  let seq = 1, maiorSeq = 1; novas.forEach((q, i) => { seq = i && q.gabarito === novas[i - 1].gabarito ? seq + 1 : 1; maiorSeq = Math.max(maiorSeq, seq); });

  // área
  const areaNovas = contar(novas, q => q.areaId), areaReais = contar(reais, q => q.areaId);
  new Set([...Object.keys(areaNovas), ...Object.keys(areaReais)]).forEach(a => { if((areaNovas[a] || 0) !== (areaReais[a] || 0)) falha("distribuição por área", `${a}: ${areaNovas[a] || 0} no banco, ${areaReais[a] || 0} na prova real`); });

  // gabarito = letra seguinte à da prova real; assunto = o da real
  const livres = [];
  novas.forEach((q, i) => {
    const r = reais[i]; if(!r) return;
    const ri = letras.indexOf(r.gabarito);
    if(!r.gabarito || r.status === "anulada" || ri < 0) livres.push(i + 1);
    else if(q.gabarito !== letras[(ri + passo + k) % k]) falha("gabarito = letra seguinte", `posição ${i + 1} (${q.id}): a real é ${r.gabarito}, o esperado (letra ${nomeDirecao}) é ${letras[(ri + passo + k) % k]}, o banco tem ${q.gabarito}`);
    if(r.assuntoId && q.assuntoId !== r.assuntoId) falha("assunto da posição", `posição ${i + 1} (${q.id}): ${q.assuntoId}, a real é ${r.assuntoId}`);
  });
  const livresPorLetra = contar(livres.map(p => novas[p - 1]), q => q.gabarito);

  // semelhança com a prova real
  const pn = novas.map(q => palavras(q.enunciado)), pr = reais.map(q => palavras(q.enunciado));
  const sim = pn.map((A, i) => reais[i] ? proporcao(A, pr[i]) : 0);
  const simMax = Math.max(...sim), simPos = sim.indexOf(simMax) + 1;
  sim.forEach((s, i) => { if(s * 100 > METAS.semelhancaMaxPct) falha("semelhança com a prova real", `posição ${i + 1} (${novas[i].id}): ${pct1(s)} das palavras do enunciado estão no da real (limite ${METAS.semelhancaMaxPct}%)`); });
  let cruzada = [0, ""];
  pn.forEach((A, i) => pr.forEach((B, j) => { if(i === j) return; const s = proporcao(A, B); if(s > cruzada[0]) cruzada = [s, `posição ${i + 1} × real ${j + 1}`]; if(s * 100 > METAS.semelhancaMaxPct) falha("semelhança com outra questão real", `posição ${i + 1} × real ${j + 1}: ${pct1(s)} (limite ${METAS.semelhancaMaxPct}%)`); }));

  // repetição de outras questões do banco (índices calculados uma vez só)
  const idx = outras.map(o => ({ id: o.id, t: trechos(o.enunciado), p: palavras(o.enunciado) }));
  const repetidas = [];
  novas.forEach((q, i) => {
    const t = trechos(q.enunciado), pal = pn[i]; let melhor = [0, ""], vocab = [0, ""];
    for(const o of idx){
      if(t.size){ let c = 0; for(const x of t) if(o.t.has(x)) c++; if(c / t.size > melhor[0]) melhor = [c / t.size, o.id]; }
      if(pal.size){ let c = 0; for(const w of pal) if(o.p.has(w)) c++; if(c / pal.size > vocab[0]) vocab = [c / pal.size, o.id]; }
    }
    if(melhor[0] * 100 >= METAS.trechosPct || vocab[0] * 100 >= METAS.vocabularioPct){
      const d = `posição ${i + 1} (${q.id}): trechos iguais ${pct1(melhor[0])} (${melhor[1]}), vocabulário em comum ${pct1(vocab[0])} (${vocab[1]})`;
      repetidas.push(d); falha("repete outra questão do banco", d);
    }
  });

  // só informam
  const dificuldade = contar(novas, q => q.dificuldadeManual || "(sem marcação)");
  // a explicação comenta cada alternativa errada ("B está errada porque…"): é o que o padrão de justificativa pede
  const semComentario = [];
  novas.forEach((q, i) => q.alternativas.filter(a => a.id !== q.gabarito).forEach(a => { if(!new RegExp(`\\b${a.id}\\b[^.]{0,40}?errad`).test(q.explicacaoGeral || "")) semComentario.push(`${i + 1}${a.id}`); }));
  const erradas = novas.reduce((s, q) => s + q.alternativas.length - 1, 0), explicadas = erradas - semComentario.length;

  return { violacoes, dados: { direcao: opcoes.direcao === "acima" ? "acima" : "abaixo", n, k, porLetra, porRank, empates: posicoes.filter(p => p.empate).length, maiorMargem: Math.max(...posicoes.map(p => p.margem)), acimaMargem: acimaMargem.length, maiorSeq,
    areaNovas, areaReais, livres, livresPorLetra, semComentario, simMax, simPos, simMedia: sim.reduce((a, b) => a + b, 0) / n, simAcima: sim.filter(s => s * 100 > METAS.semelhancaMaxPct).length, cruzada, repetidas, dificuldade, erradas, explicadas } };
}

/* A tabela da seção "Medidas" da auditoria, com a situação de cada critério */
export function tabelaMarkdown(r){
  const d = r.dados, ok = (meta) => r.violacoes.some(v => v.meta === meta) ? "**falta**" : "ok";
  const lista = (o) => Object.keys(o).sort().map(k => `${k} ${o[k]}`).join(", ");
  return [
    "| Critério | Resultado | Alvo | Situação |", "|---|---|---|---|",
    `| Letra do gabarito | ${lista(d.porLetra)} | ~${pct1(1 / d.k)} cada | ${ok("letra do gabarito")} |`,
    `| Posição do gabarito por tamanho (1ª = mais longa) | ${Object.keys(d.porRank).sort().map(k => `${k}ª ${d.porRank[k]}`).join(", ")} (${d.empates} com empate) | ~${pct1(1 / d.k)} cada | ${ok("posição do gabarito por tamanho")} |`,
    `| Maior margem da alternativa mais longa sobre a 2ª | ${pct1(d.maiorMargem)}; ${d.acimaMargem} posição(ões) acima do limite | no máximo ${METAS.margemMaxPct}% | ${ok("margem de tamanho")} |`,
    `| Distribuição por área | ${lista(d.areaNovas)} | idêntica à da prova real | ${ok("distribuição por área")} |`,
    `| Gabarito = letra ${d.direcao === "acima" ? "anterior" : "seguinte"} à da prova real | ${d.livres.length} posição(ões) livre(s) (anuladas): ${d.livres.join(", ") || "—"} | ${d.direcao === "acima" ? "B→A, C→B…" : "A→B, B→C…"} | ${ok("gabarito = letra seguinte")} |`,
    `| Semelhança do enunciado com a questão real correspondente | máxima ${pct1(d.simMax)} (posição ${d.simPos}); média ${pct1(d.simMedia)}; ${d.simAcima} acima do limite | no máximo ${METAS.semelhancaMaxPct}% | ${ok("semelhança com a prova real")} |`,
    `| Repete outra questão do banco | ${d.repetidas.length} | 0 | ${ok("repete outra questão do banco")} |`,
    `| Alternativas erradas comentadas na explicação | ${d.explicadas} de ${d.erradas} | todas | — |`,
  ].join("\n");
}

function relatorio(nomeBanco, nomeProva, r){
  const d = r.dados, lista = (o) => JSON.stringify(o);
  console.log(`${nomeBanco}: ${d.n} questões, ${d.k} alternativas (prova real de referência: ${nomeProva})`);
  console.log("letras do gabarito:", lista(d.porLetra), `· maior sequência da mesma letra: ${d.maiorSeq}`);
  console.log("posição do gabarito por tamanho (1 = mais longa):", lista(d.porRank), `— ${d.empates} com empate de tamanho`);
  console.log(`maior margem da alternativa mais longa sobre a 2ª: ${pct1(d.maiorMargem)} (${d.acimaMargem} posição(ões) acima de ${METAS.margemMaxPct}%)`);
  console.log("por área:", lista(d.areaNovas), "\nna prova real:", lista(d.areaReais));
  console.log(`posições com gabarito livre (real anulada): ${d.livres.join(", ") || "nenhuma"}${d.livres.length ? " — letras escolhidas " + lista(d.livresPorLetra) : ""}`);
  console.log(`semelhança máxima com a questão real correspondente: ${pct1(d.simMax)} (posição ${d.simPos}); média ${pct1(d.simMedia)}; acima de ${METAS.semelhancaMaxPct}%: ${d.simAcima}`);
  console.log(`maior semelhança com OUTRA questão real da mesma prova: ${pct1(d.cruzada[0])} (${d.cruzada[1]})`);
  console.log(`questões que repetem outra do banco (≥${METAS.trechosPct}% de trechos de 4 palavras ou ≥${METAS.vocabularioPct}% do vocabulário): ${d.repetidas.length}`);
  d.repetidas.forEach(x => console.log("  " + x));
  const alvoDif = METAS.dificuldade; console.log("dificuldade marcada:", lista(d.dificuldade), `(alvo depois de calibrar pelo desempenho: ${lista(alvoDif)} %)`);
  console.log(`alternativas erradas comentadas na explicação: ${d.explicadas} de ${d.erradas}${d.semComentario.length ? " — sem comentário: " + d.semComentario.join(", ") : ""}`);
  if(r.violacoes.length){ console.log(`\nFALTA META (${r.violacoes.length}):`); r.violacoes.forEach(v => console.log(`  ✗ ${v.meta} — ${v.detalhe}`)); }
  else console.log("\nTodas as metas cumpridas.");
}

function achar(arquivos, nome){
  const a = arquivos.find(x => x.nome === nome);
  if(!a || !a.questoes) throw new Error(`${nome} não é um arquivo de questões de dados/`);
  return a.questoes;
}
/* Quem é a prova real de cada banco, e se ele já nasceu sob o padrão atual (ferramentas/bancos-adaptados.json) */
export function lerBancos(){ return JSON.parse(fs.readFileSync(path.join(RAIZ, "ferramentas", "bancos-adaptados.json"), "utf8")); }

function principal(){
  const args = process.argv.slice(2);
  const flag = (f) => args.includes(f), valor = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };
  const posicionais = args.filter((a, i) => !a.startsWith("--") && !["--margem", "--direcao"].includes(args[i - 1]));
  const opcoes = valor("--margem") ? { margemMaxPct: Number(valor("--margem")) } : {};
  const { D, arquivos } = carregar();
  const lista = flag("--todos")
    ? Object.entries(lerBancos()).filter(([, c]) => flag("--incluir-anteriores") || c.padrao === "atual").map(([banco, c]) => [banco, c.guia, c.padrao, c.direcao])
    : [[posicionais[0], posicionais[1], "atual", valor("--direcao")]];
  if(!lista[0][0] || !lista[0][1]){ console.error("uso: node ferramentas/medir-banco-adaptado.mjs <banco> <prova-real> [--exigir] [--md]   ou   --todos [--exigir]"); process.exit(1); }
  let faltou = false;
  for(const [banco, guia, padrao, direcao] of lista){
    const novas = achar(arquivos, banco), reais = achar(arquivos, guia), ids = new Set(novas.map(q => q.id));
    const r = medir(novas, reais, D.questoes.filter(q => !ids.has(q.id)), { ...opcoes, direcao });
    if(flag("--md")) console.log(`### ${banco}\n\n${tabelaMarkdown(r)}\n`); else { relatorio(banco, guia, r); if(lista.length > 1) console.log(""); }
    if(r.violacoes.length && padrao === "atual") faltou = true;
  }
  if(flag("--exigir") && faltou) process.exit(1);
}
if(process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) principal();
