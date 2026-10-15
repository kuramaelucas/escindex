/* Ajustes: pesquisa de flashcards (meus × todos), simulado de Obstetrícia
   retirado, questões de simulado fora das trilhas, comparação com a turma só a
   partir de 10 alunos (P50, P90, Gauss), simulado × estudo por assunto e a
   conta de aluno de teste (sem memória, sem simulados). */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  await pagina.goto(semNuvem.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto };
}

test("pesquisar cartões: 'todos da plataforma' acha os da equipe, 'só os meus' acha só os meus", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      db.flashcards.push({ id: "fc-meu-1", usuarioId: u.id, status: "ativo", frente: "Zumbidoxtremo meu cartão", verso: "resposta minha", assuntoId: null });
      db.flashcards.push({ id: "fc-eq-1", status: "ativo", frente: "Zumbidoxtremo da equipe", verso: "resposta da equipe", assuntoId: null });
      db.flashcards.push({ id: "fc-outro", usuarioId: "outra-pessoa", status: "ativo", frente: "Zumbidoxtremo de outra pessoa", verso: "x", assuntoId: null });
      state.filtroRota.buscaFlashcards = { texto: "ZUMBIDOXTREMO", escopo: "todos" };
      const todos = cartoesDaBusca(u).map(c => c.id).sort();
      state.filtroRota.buscaFlashcards = { texto: "zumbidoxtremo", escopo: "meus" };
      const meus = cartoesDaBusca(u).map(c => c.id);
      state.filtroRota.buscaFlashcards = { texto: "", escopo: "todos" };
      navigate("flashcards");
      return { todos, meus, tela: !!document.getElementById("buscaCartoesCampo") };
    });
    assert.deepEqual(r.todos, ["fc-eq-1", "fc-meu-1"], "cartão pessoal de outra pessoa nunca aparece");
    assert.deepEqual(r.meus, ["fc-meu-1"]);
    assert.ok(r.tela, "a tela de Revisão Rápida tem o campo de pesquisa");
  } finally { await contexto.close(); }
});

test("simulado de Obstetrícia saiu da semente e de quem já o tinha salvo", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      const naSemente = SEED_SIMULADOS.some(s => s.id === "sim-1");
      db.simulados.push({ id: "sim-1", titulo: "Simulado de Revisão — Obstetrícia", questoes: ["q-019"], duracaoMin: 20, tipo: "simulado_professor" });
      sincronizarConteudoNovo();
      return { naSemente, aindaNoBanco: db.simulados.some(s => s.id === "sim-1") };
    });
    assert.equal(r.naSemente, false);
    assert.equal(r.aindaNoBanco, false);
  } finally { await contexto.close(); }
});

test("questões de simulado da equipe ficam fora do estudo até a pessoa trazê-las", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      const sim = db.simulados.find(s => s.id === "sim-epm2026-1");
      const reservada = sim.questoes.find(id => { const q = getQuestao(id); return q && questoesAtivas().some(a => a.id === id); });
      const antes = questoesParaEstudo(u.id).some(q => q.id === reservada);
      alternarSimuladoNoEstudo("sim-epm2026-1");
      const liberada = questoesParaEstudo(u.id).some(q => q.id === reservada);
      alternarSimuladoNoEstudo("sim-epm2026-1");
      const deNovoFora = !questoesParaEstudo(u.id).some(q => q.id === reservada);
      // a sessão recomendada nunca traz questão de simulado
      const itens = montarSessaoRecomendada(u.id, 30);
      const noSimulado = new Set(sim.questoes);
      return { reservada: !!reservada, antes, liberada, deNovoFora, vazouNaTrilha: itens.some(i => noSimulado.has(i.questaoId)) };
    });
    assert.ok(r.reservada);
    assert.equal(r.antes, false);
    assert.equal(r.liberada, true);
    assert.equal(r.deNovoFora, true);
    assert.equal(r.vazouNaTrilha, false);
  } finally { await contexto.close(); }
});

test("comparação com a turma: só a partir de 10 alunos, uma nota por aluno, com P50, P90 e curva", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      const alunos = n => Array.from({ length: n }, (_, i) => {
        db.usuarios.push({ id: "al" + i, nome: "Aluno " + i, email: i + "@x", matricula: "m" + i, papel: "aluno", status: "aprovado" });
        return "al" + i;
      });
      const ids = alunos(12);
      const notas = [30, 40, 45, 50, 55, 60, 65, 70, 80, 90, 95, 100];
      db.resultadosSimulados.length = 0;
      ids.slice(0, 9).forEach((id, i) => db.resultadosSimulados.push({ id: "r" + i, usuarioId: id, simuladoId: "S", titulo: "S", nota: notas[i], data: "2026-10-01" }));
      // quem refaz não conta duas vezes; professor não é aluno
      db.resultadosSimulados.push({ id: "refaz", usuarioId: "al0", simuladoId: "S", titulo: "S", nota: 100, data: "2026-10-05" });
      db.usuarios.push({ id: "prof-x", nome: "P", email: "p@x", matricula: "p", papel: "professor", status: "aprovado" });
      db.resultadosSimulados.push({ id: "prof", usuarioId: "prof-x", simuladoId: "S", titulo: "S", nota: 100, data: "2026-10-05" });
      const com9 = estatisticasRankingSimulado("S", 70);
      ids.slice(9).forEach((id, i) => db.resultadosSimulados.push({ id: "r" + (9 + i), usuarioId: id, simuladoId: "S", titulo: "S", nota: notas[9 + i], data: "2026-10-02" }));
      const com12 = estatisticasRankingSimulado("S", 70);
      return { com9, com12, svg: graficoCurvaGaussSvg(com12, 70) };
    });
    assert.equal(r.com9, null, "9 alunos não bastam");
    assert.equal(r.com12.n, 12);
    assert.equal(r.com12.mediana, 62.5);
    assert.equal(r.com12.p90, 95);
    assert.equal(r.com12.percentil, 67);
    assert.match(r.svg, /P50/);
    assert.match(r.svg, /P90/);
    assert.match(r.svg, /você/);
  } finally { await contexto.close(); }
});

test("simulado × estudo: compara o acerto no simulado com o acerto fora dele, por assunto", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      const uid = "u-cmp";
      db.respostas.length = 0;
      const resp = (assuntoId, correta, origem, sessaoId) => db.respostas.push({ id: uid + db.respostas.length, usuarioId: uid, questaoId: "q", assuntoId, correta, origem, sessaoId, data: "2026-10-01" });
      for(let i = 0; i < 5; i++) resp("a1", i < 4, "bloco_atual");        // 80% no estudo
      for(let i = 0; i < 4; i++) resp("a1", i < 1, "simulado", "S1");     // 25% no simulado
      resp("a2", false, "simulado", "S1");                                // sem base fora do simulado
      const linhas = comparativoSimuladoEstudo(uid);
      const so = comparativoSimuladoEstudo(uid, { sessaoId: "S2" });
      return { linhas, so };
    });
    assert.equal(r.linhas.length, 2);
    assert.equal(r.linhas[0].assuntoId, "a1");
    assert.equal(r.linhas[0].simTaxa, 25);
    assert.equal(r.linhas[0].estTaxa, 80);
    assert.equal(r.linhas[0].queda, 55);
    assert.equal(r.linhas[1].queda, null, "sem 3 respostas fora do simulado não há comparação");
    assert.equal(r.so.length, 0);
  } finally { await contexto.close(); }
});

test("conta de teste: não grava nada, não tem simulados e sumir ao recarregar", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const antes = await pagina.evaluate(() => localStorage.getItem(CHAVE_STORAGE));
    const r = await pagina.evaluate(async () => {
      entrarComoAlunoTeste(); fecharModal();
      const u = usuarioAtual();
      const q = questoesParaEstudo(u.id)[0];
      registrarResposta(u.id, q.id, q.alternativas[0].id, "duvida", 10, "lista");
      saveState({ imediato: true });
      await new Promise(ok => setTimeout(ok, 500));
      const menu = navItemsParaPapel(u.papel).map(i => i.id);
      navigate("simulados");
      const bloqueio = document.getElementById("conteudoPagina").textContent;
      const respondeu = db.respostas.some(x => x.usuarioId === u.id);
      return { menu, bloqueio, respondeu, guardado: localStorage.getItem(CHAVE_STORAGE), nome: u.nome };
    });
    assert.equal(r.nome, "Aluno de teste");
    assert.ok(r.respondeu, "dentro da conta de teste as funções funcionam");
    assert.ok(!r.menu.includes("simulados"), "simulados fora do menu");
    assert.match(r.bloqueio, /Indisponível na conta de teste/);
    assert.equal(r.guardado, antes, "nada foi gravado no navegador");
    // sair recarrega a página e o banco volta ao que estava gravado
    await Promise.all([pagina.waitForNavigation(), pagina.evaluate(() => fazerLogout())]);
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    const depois = await pagina.evaluate(() => ({ teste: db.usuarios.some(u => u.id === "u-aluno-teste"), logado: !!usuarioAtual() }));
    assert.deepEqual(depois, { teste: false, logado: false });
  } finally { await contexto.close(); }
});
