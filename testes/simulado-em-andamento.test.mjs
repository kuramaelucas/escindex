/* Simulado em andamento: cada resposta é guardada, o simulado volta de onde
   parou depois de recarregar a página, a lista mostra quantas questões já
   foram respondidas e finalizar apaga o rascunho. Também: datas de cadastro e
   aprovação (Detalhes) e de liberação do simulado. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); });

async function abrir(contexto){
  const pagina = await contexto.newPage();
  await pagina.goto(semNuvem.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return pagina;
}

test("simulado: respostas guardadas, progresso na lista, continuar depois de recarregar e finalizar limpa", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    let pagina = await abrir(contexto);
    const sim = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const ids = db.questoes.filter(q => !q.tipo && q.status === "ativa" && !aguardaImagem(q) && q.gabarito).slice(0, 4).map(q => q.id);
      db.simulados.push({ id: "sim-t1", titulo: "Simulado de teste", questoes: ids, duracaoMin: 60, tipo: "simulado_professor", criadoEm: "2026-10-01", liberadoEm: "2026-10-05" });
      saveState();
      iniciarSimulado("sim-t1");
      selecionarAlternativaSimulado("A");
      irQuestaoSimulado(1);
      selecionarAlternativaSimulado("B");
      return { ids };
    });
    const guardado = await pagina.evaluate(() => { const u = usuarioAtual(); return simuladoEmAndamentoDe(u, "sim-t1"); });
    assert.equal(Object.keys(guardado.respostasSimulado).length, 2, "as duas respostas já estão guardadas");
    assert.equal(guardado.indiceAtual, 1);

    // recarrega a página: a sessão em memória some, o rascunho fica
    await pagina.reload();
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    const apos = await pagina.evaluate(() => {
      const u = db.usuarios.find(x => x.papel === "aluno" && x.status === "aprovado") || usuarioAtual();
      return { logado: !!usuarioAtual(), sessao: !!state.sessaoAtual, guardados: Object.keys((db.simuladosEmAndamento || {})[(usuarioAtual() || u).id] || {}) };
    });
    assert.deepEqual(apos.guardados, ["sim-t1"], "o rascunho sobrevive ao recarregar");

    const lista = await pagina.evaluate(() => {
      if(!usuarioAtual()) fazerLoginDemo("aluno");
      fecharModal();
      const s = db.simulados.find(x => x.id === "sim-t1");
      return { card: renderSimuladoCard(s) };
    });
    assert.match(lista.card, /em andamento · 2 de 4 questões respondidas/);
    assert.match(lista.card, /Continuar/);
    assert.match(lista.card, /liberado em 05\/10\/2026 · enviado em 01\/10\/2026/);

    const retomado = await pagina.evaluate(() => {
      continuarSimulado("sim-t1");
      const s = state.sessaoAtual;
      return { indice: s.indiceAtual, respostas: Object.keys(s.respostasSimulado).length, finalizado: s.finalizado };
    });
    assert.equal(retomado.indice, 1);
    assert.equal(retomado.respostas, 2);

    const fim = await pagina.evaluate(() => {
      finalizarSimulado();
      return { sobrou: simuladoEmAndamentoDe(usuarioAtual(), "sim-t1"), resultados: db.resultadosSimulados.filter(r => r.simuladoId === "sim-t1").length };
    });
    assert.equal(fim.sobrou, null, "finalizar apaga o rascunho");
    assert.equal(fim.resultados, 1);
  } finally { await contexto.close(); }
});

test("sair do simulado: guardar mantém, descartar apaga; o botão de confirmar não cita o espaço", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await abrir(contexto);
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const ids = db.questoes.filter(q => !q.tipo && q.status === "ativa" && !aguardaImagem(q) && q.gabarito).slice(0, 3).map(q => q.id);
      db.simulados.push({ id: "sim-t2", titulo: "Outro", questoes: ids, duracaoMin: 30, tipo: "simulado_professor", criadoEm: "2026-10-01" });
      iniciarSimulado("sim-t2");
      alternarModoAprendizadoSimulado();
      selecionarAlternativaSimulado("A");
      const html = renderSimuladoAtivo();
      confirmarRespostaSimulado("certeza");
      sairDoSimuladoGuardando();
      const guardou = !!simuladoEmAndamentoDe(usuarioAtual(), "sim-t2");
      continuarSimulado("sim-t2");
      sairDoSimuladoDescartando();
      return { html, guardou, depois: simuladoEmAndamentoDe(usuarioAtual(), "sim-t2"), card: renderSimuladoCard(db.simulados.find(x => x.id === "sim-t2")) };
    });
    assert.match(r.html, /confirmarRespostaSimulado\('certeza'\)/);
    assert.doesNotMatch(r.html, /\(espaço\)/);
    assert.ok(r.guardou);
    assert.equal(r.depois, null);
    assert.doesNotMatch(r.card, /em andamento/);
  } finally { await contexto.close(); }
});

test("detalhes do cadastro: datas de cadastro e aprovação, com a conta local", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await abrir(contexto);
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("admin"); fecharModal();
      db.usuarios.push({ id: "u-pend", nome: "Pessoa Nova", email: "nova@x", matricula: "1", papel: "aluno", status: "pendente", criadoEm: "2026-09-12" });
      aprovarUsuario("u-pend");
      const u = getUsuario("u-pend");
      abrirDetalhesDoUsuario("u-pend", "local");
      return { aprovadoEm: u.aprovadoEm, modal: document.body.innerText, datas: htmlDatasDoCadastro("2026-09-12T15:00:00Z", null), antiga: dataDoCarimbo("2026-09-12") };
    });
    assert.match(r.aprovadoEm, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(r.modal, /Cadastro feito em\s+12\/09\/2026/);
    assert.match(r.modal, /Aprovado em\s+\d{2}\/\d{2}\/\d{4}/);
    assert.match(r.datas, /cadastro 1[12]\/09\/2026/);
    assert.equal(r.antiga, "12/09/2026");
  } finally { await contexto.close(); }
});

test("os prompts de importação e de dúvida pedem fisiopatologia e epidemiologia", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await abrir(contexto);
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      return { importacao: regrasDeConteudoImportacao(), duvida: gerarPromptDuvida(db.questoes.find(q => !q.tipo)) };
    });
    assert.match(r.importacao, /FISIOPATOLOGIA E EPIDEMIOLOGIA/);
    assert.match(r.importacao, /MECANISMO fisiopatológico/);
    assert.match(r.duvida, /Fisiopatologia e epidemiologia/);
    assert.match(r.duvida, /EPIDEMIOLÓGICO/);
  } finally { await contexto.close(); }
});
