/* Prova com questão anulada: duas versões (como realizada × com correção por IA). */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(process.env.ESC_CHROMIUM ? { executablePath: process.env.ESC_CHROMIUM } : {}); servidor = await subirServidor(); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

const PRINTS = process.env.ESC_PRINTS || "";
test("escolha da versão, anulada fora da nota e prova com IA fora da classificação", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport:{width:1100,height:820}, deviceScaleFactor:2 });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const p = await contexto.newPage();
    await p.goto(servidor.url + "index.html");
    await p.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    // a reposição do arquivo de dados está em rascunho até alguém conferi-la na AHA 2025;
    // aqui ela vale como modelo (fixture) para exercitar a função
    await p.evaluate(() => { getQuestao("q-amrigs2021-001-ia").status = "ativa"; });
    await p.evaluate(() => { fazerLoginDemo("aluno"); navigate("provas-antigas"); });
    await p.evaluate(() => { state.filtroRota.provas = {banca:"AMRIGS", ano:"2021", areaId:"", ultimos5:false, tipo:""}; render(); });
    const indice = await p.evaluate(() => state.filtroRota.provasGrupos.findIndex(g => g.banca==="AMRIGS" && g.ano===2021));
    assert.ok(indice >= 0);
    if(PRINTS) await p.locator(".prova-card").first().screenshot({ path: PRINTS + "/1-cartao.png" });

    // desatualizada entra no estudo geral (com selo); anulada continua fora
    const estudo = await p.evaluate(() => ({ des: questoesAtivas(true).some(q => q.status==="desatualizada"), anu: questoesAtivas(true).some(q => q.status==="anulada") }));
    assert.equal(estudo.des, true); assert.equal(estudo.anu, false);

    // a pergunta aparece nas duas funções
    for(const acao of [`fazerProvaComoSimulado(${indice})`, `praticarProva(${indice})`]){
      await p.evaluate(acao);
      assert.ok(await p.locator("#versaoOriginal").isVisible(), acao);
      assert.ok(await p.locator("#versaoIA").isVisible(), acao);
      if(PRINTS && acao.startsWith("fazer")) await p.locator(".modal, [role=dialog]").first().screenshot({ path: PRINTS + "/2-pergunta.png" });
      await p.evaluate(() => fecharModal());
    }

    // versão original: a anulada aparece (7 anuladas + 92 ativas + 1 desatualizada) e não conta
    await p.evaluate(`fazerProvaComoSimulado(${indice})`);
    await p.click("#versaoOriginal");
    const orig = await p.evaluate(() => ({ n: state.sessaoAtual.itens.length, tem: state.sessaoAtual.itens.some(it => it.questaoId==="q-amrigs2021-001"), titulo: state.sessaoAtual.titulo }));
    assert.equal(orig.n, 100); assert.ok(orig.tem);
    const antes = await p.evaluate(() => db.respostas.length);
    const r1 = await p.evaluate(() => {
      const s = state.sessaoAtual;
      s.itens.forEach(it => { const q = getQuestao(it.questaoId); s.respostasSimulado[it.questaoId] = q.gabarito || "A"; });
      finalizarSimulado();
      const r = db.resultadosSimulados.slice(-1)[0];
      return { nota:r.nota, total:r.total, acertos:r.acertos, semClassificacao:r.semClassificacao };
    });
    assert.equal(r1.total, 92, "100 questões na prova, 8 fora da nota");
    assert.equal(r1.acertos, r1.total); assert.equal(r1.nota, 100); assert.equal(r1.semClassificacao, false);
    const gravadas = await p.evaluate(() => db.respostas.length) - antes;
    assert.equal(gravadas, r1.total, "a anulada não grava resposta");
    if(PRINTS) await p.screenshot({ path: PRINTS + "/3-resultado-original.png" });

    // versão com IA: a reposição entra no lugar da anulada, grava resposta e fica fora da classificação
    await p.evaluate(() => { state.sessaoAtual = null; navigate("provas-antigas"); });
    await p.evaluate(`fazerProvaComoSimulado(${indice})`);
    await p.click("#versaoIA");
    const ia = await p.evaluate(() => ({ tem: state.sessaoAtual.itens.some(it => it.questaoId==="q-amrigs2021-001-ia"), sem: state.sessaoAtual.itens.some(it => it.questaoId==="q-amrigs2021-001"), titulo: state.sessaoAtual.titulo, semClass: state.sessaoAtual.semClassificacao }));
    assert.ok(ia.tem && !ia.sem && ia.semClass);
    if(PRINTS){
      await p.evaluate(() => { state.sessaoAtual.indiceAtual = state.sessaoAtual.itens.findIndex(it => it.questaoId==="q-amrigs2021-001-ia"); render(); });
      await p.screenshot({ path: PRINTS + "/4-reposicao-na-prova.png" });
    }
    const r2 = await p.evaluate(() => {
      const s = state.sessaoAtual;
      s.respostasSimulado["q-amrigs2021-001-ia"] = "C";
      finalizarSimulado();
      const r = db.resultadosSimulados.slice(-1)[0];
      const rep = db.respostas.filter(x => x.questaoId==="q-amrigs2021-001-ia");
      return { semClassificacao:r.semClassificacao, nRep: rep.length, hoje: rep[0] && rep[0].data===hojeISO() && rep[0].correta,
               naTurma: notasAnonimasDoSimulado(r.titulo).notas.length };
    });
    assert.equal(r2.semClassificacao, true); assert.equal(r2.nRep, 1); assert.ok(r2.hoje);
    assert.equal(r2.naTurma, 0, "prova com IA não entra na classificação");
    if(PRINTS) await p.screenshot({ path: PRINTS + "/5-resultado-com-ia.png" });
  } finally { await contexto.close(); }
});
