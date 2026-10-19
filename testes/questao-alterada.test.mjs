/* Questão alterada: o campo `questaoAlterada` dá o selo "Questão alterada" na
   questão e, só depois de responder, a frase do que mudou (ela pode revelar o
   gabarito). A entrada compacta das ferramentas de dados também a grava. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";
import { montarQuestoes } from "../ferramentas/adicionar-questoes.mjs";
import { questaoComoTexto } from "../ferramentas/lib-dados.mjs";

let navegador, semNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); });

test("selo na questão em aberto; a frase só no rodapé de depois de responder", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  try {
    await pagina.goto(semNuvem.url + "index.html");
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const q = copiaProfunda(db.questoes.find(x => !x.tipo && x.status === "ativa" && !aguardaImagem(x)));
      const semCampo = { card: renderQuestionCard(q, {}), aviso: htmlAvisoQuestaoAlterada(q), badge: badgeQuestaoAlterada(q) };
      q.questaoAlterada = "Gabarito revisado: a <tabela> somava 702 casos.";
      return {
        semCampo,
        aberta: renderQuestionCard(q, {}),
        aviso: htmlAvisoQuestaoAlterada(q),
        rodape: renderRodapeDaQuestaoRespondida(q),
      };
    });
    assert.equal(r.semCampo.aviso, ""); assert.equal(r.semCampo.badge, "");
    assert.doesNotMatch(r.semCampo.card, /Questão alterada/);
    assert.match(r.aberta, /badge-questao-alterada/, "o selo aparece com a questão em aberto");
    assert.doesNotMatch(r.aberta, /702 casos/, "a frase do que mudou não aparece antes de responder");
    assert.match(r.aviso, /702 casos/);
    assert.match(r.aviso, /&lt;tabela&gt;/, "o texto da nota é escapado");
    assert.match(r.rodape, /aviso-questao-alterada/, "depois de responder, a frase aparece no rodapé");
  } finally { await contexto.close(); }
});

test("a entrada compacta grava `alterada` como questaoAlterada, e vazio é recusado", () => {
  const taxonomia = { assuntos: [{ id: "ass-sca", especialidadeId: "esp-cardio" }], especialidades: [{ id: "esp-cardio", areaId: "area-cm" }] };
  const ficha = { banca: "UNIFESP-EPM", ano: 2026, prefixo: "q-teste", alternativas: 4 };
  const base = {
    n: 1, assunto: "ass-sca", enunciado: "Homem de 58 anos com dor torácica.", alt: ["a", "b", "c", "d"], gabarito: "C", referencias: "Diretriz X.",
    explicacao: "A alternativa C está correta. Dicas do enunciado: **dor torácica típica** em homem de **58 anos** indica síndrome coronariana aguda e o ECG deve ser feito em até 10 minutos, "
      + "com troponina seriada. A) Errada: não explica o quadro. B) Errada: não explica o quadro. D) Errada: não explica o quadro, e a conduta correta é outra, descrita acima.",
  };
  const ok = montarQuestoes([{ ...base, alterada: "Enunciado reescrito para maior clareza." }], ficha, { taxonomia, numerosExistentes: new Set() });
  assert.deepEqual(ok.problemas, []);
  assert.equal(ok.questoes[0].questaoAlterada, "Enunciado reescrito para maior clareza.");
  assert.equal(ok.questoes[0].real, true, "alterada não torna a questão autoral");
  assert.match(questaoComoTexto(ok.questoes[0]), /questaoAlterada:"Enunciado reescrito para maior clareza\."/);
  const vazio = montarQuestoes([{ ...base, alterada: "  " }], ficha, { taxonomia, numerosExistentes: new Set() });
  assert.match(vazio.problemas.join(" "), /alterada/);
});
