/* Trilha por erro, validade de 7 dias da sessão guardada (com o resto indo para o
   Histórico), "Suas notas" clicável e o dia certo das respostas do simulado. */
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
  await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal(); });
  return { pagina, contexto };
}

test("trilha: assunto com o dobro de erro recebe o dobro de questões, misturadas; nova antes de errada", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      const u = usuarioAtual();
      db.respostas = db.respostas.filter(x => x.usuarioId !== u.id);
      const pool = questoesParaEstudo(u.id).filter(q => !ehDissertativa(q) && q.assuntoId);
      const porAssunto = {};
      pool.forEach(q => (porAssunto[q.assuntoId] = porAssunto[q.assuntoId] || []).push(q));
      const [A, B] = Object.keys(porAssunto).filter(id => porAssunto[id].length >= 14);
      const responder = (qs, erros) => qs.forEach((q, i) => db.respostas.push({
        id: "rt" + q.id, usuarioId: u.id, questaoId: q.id, assuntoId: q.assuntoId, correta: i >= erros, confianca: "certeza",
        data: "2026-10-01", respondidaEm: "2026-10-01T10:00:0" + i + "Z", origem: "lista", tentativa: 1,
      }));
      responder(porAssunto[A].slice(0, 5), 2);   // A: erra 40%
      responder(porAssunto[B].slice(0, 5), 1);   // B: erra 20%
      saveState();
      // foco 2: só A e B; sem ele os outros assuntos (sem respostas) entram com o erro médio
      const t = montarTrilhaPorErro(u.id, { n: 12, naoFeitas: true, erradas: true, certas: true, foco: 2 });
      const todos = montarTrilhaPorErro(u.id, { n: 12, naoFeitas: true, erradas: true, certas: true, foco: 0 });
      const assuntosTodos = new Set(todos.itens.map(it => getQuestao(it.questaoId).assuntoId)).size;
      const conta = id => t.itens.filter(it => getQuestao(it.questaoId).assuntoId === id).length;
      const sits = t.itens.filter(it => getQuestao(it.questaoId).assuntoId === A).map(it => situacaoDaQuestaoNaTrilha(u.id, it.questaoId));
      const so3 = montarTrilhaPorErro(u.id, { n: 12, naoFeitas: true, erradas: true, certas: true, foco: 3 });
      const apenasErradas = montarTrilhaPorErro(u.id, { n: 50, naoFeitas: false, erradas: true, certas: false, foco: 0 });
      return {
        assuntosTodos, a: conta(A), b: conta(B), total: t.itens.length, sits,
        primeirosDois: t.itens.slice(0, 4).map(it => getQuestao(it.questaoId).assuntoId === A ? "A" : "B").join(""),
        so3Assuntos: new Set(so3.itens.map(it => getQuestao(it.questaoId).assuntoId)).size,
        apenasErradas: apenasErradas.itens.length, repetidas: t.itens.length - new Set(t.itens.map(i => i.questaoId)).size,
        card: htmlCardTrilhaSugerida(u),
      };
    });
    assert.equal(r.total, 12);
    assert.equal(r.a, 8, "o assunto com 40% de erro recebe o dobro");
    assert.equal(r.b, 4);
    assert.equal(r.repetidas, 0);
    assert.ok(r.assuntosTodos > 2, "sem foco, assuntos ainda sem respostas também entram");
    assert.deepEqual([...r.sits].sort((x, y) => ({ nova: 0, errada: 1, certa: 2 })[x] - ({ nova: 0, errada: 1, certa: 2 })[y]), r.sits, "novas, depois erradas, depois certas");
    assert.ok(/AB|BA/.test(r.primeirosDois) && r.primeirosDois.includes("A") && r.primeirosDois.includes("B"), "intercala os assuntos: " + r.primeirosDois);
    assert.ok(r.so3Assuntos <= 3);
    assert.equal(r.apenasErradas, 3, "só as 3 respostas erradas (2 + 1)");
    assert.match(r.card, /Montar trilha/);
    // a janela abre com os assuntos de mais erro marcados; desmarcar redistribui, marcar um da fila o inclui
    await pagina.evaluate(() => { definirTamanhoDaTrilha(12); abrirTrilhaDeEstudos(2); });
    const marcados0 = await pagina.evaluate(() => [..._trilha.assuntos]);
    assert.equal(marcados0.length, 2, "a plataforma sugere os 2 de mais erro");
    assert.match(await pagina.textContent("#previaTrilha"), /Próximos da fila/);
    const depoisDesmarcar = await pagina.evaluate(() => { alternarAssuntoDaTrilha(_trilha.assuntos[0]); return montarTrilhaPorErro(usuarioAtual().id, { ..._trilha, foco: 0 }).itens.length; });
    assert.equal(depoisDesmarcar, 12, "as 12 questões passam para o assunto que ficou");
    const depoisMarcar = await pagina.evaluate(() => {
      const fila = document.querySelectorAll("#previaTrilha input[type=checkbox]:not(:checked)");
      fila[0].click();
      return _trilha.assuntos.length;
    });
    assert.equal(depoisMarcar, 2, "marcar um assunto da fila o inclui");
    assert.match(await pagina.textContent("#previaTrilha"), /questão\(ões\)/);
    await pagina.evaluate(() => iniciarTrilhaDeEstudos());
    const sessao = await pagina.evaluate(() => ({ n: state.sessaoAtual.itens.length, origem: state.sessaoAtual.itens[0].origem }));
    assert.equal(sessao.origem, "trilha");
    assert.ok(sessao.n > 0);
  } finally { await contexto.close(); }
});

test("sessão guardada há mais de 7 dias deixa de ser oferecida e vira conjunto não terminado no Histórico", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      const u = usuarioAtual();
      const ids = questoesParaEstudo(u.id).filter(q => !ehDissertativa(q)).slice(0, 4).map(q => q.id);
      const guardar = (id, salvaEm) => {
        db.sessoesEmAndamento[u.id] = {
          id, tipo: "pratica", itens: ids.map(questaoId => ({ questaoId, motivo: "teste" })), indiceAtual: 2, salvaEm,
          respostasSessao: [
            { questaoId: ids[0], alternativaEscolhida: "A", correta: true, confianca: "certeza" },
            { questaoId: ids[1], alternativaEscolhida: "B", correta: false, confianca: "duvida" }, null, null],
          eliminadas: {}, marcadas: {},
        };
      };
      guardar("sessao-recente", somarDias(hojeISO(), -5));
      arquivarSessoesVencidas();
      const recente = { oferecida: !!sessaoEmAndamentoDe(u), historico: db.sessoes.some(s => s.id === "sessao-recente") };
      guardar("sessao-velha", somarDias(hojeISO(), -9));
      const oferecidaAntes = !!sessaoEmAndamentoDe(u);
      arquivarSessoesVencidas();
      const reg = db.sessoes.find(s => s.id === "sessao-velha");
      return {
        recente, oferecidaAntes, oferecidaDepois: !!sessaoEmAndamentoDe(u), guardada: !!db.sessoesEmAndamento[u.id],
        reg: reg && { naoTerminada: reg.naoTerminada, total: reg.total, acertos: reg.acertos, planejadas: reg.planejadas },
        html: renderHistorico(),
      };
    });
    assert.deepEqual(r.recente, { oferecida: true, historico: false }, "com 5 dias ainda se pode continuar");
    assert.equal(r.oferecidaAntes, false, "com 9 dias já não é oferecida");
    assert.equal(r.guardada, false);
    assert.deepEqual(r.reg, { naoTerminada: true, total: 2, acertos: 1, planejadas: 4 });
    assert.match(r.html, /não terminado/);
  } finally { await contexto.close(); }
});

test("Suas notas: a linha da prova abre o detalhe e não há mais o botão 'ver detalhes'", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const html = await pagina.evaluate(() => {
      const u = usuarioAtual();
      const ids = questoesParaEstudo(u.id).filter(q => !ehDissertativa(q)).slice(0, 2).map(q => q.id);
      db.resultadosSimulados.push({ id: "res-clique", usuarioId: u.id, titulo: "Prova clicável", nota: 50, acertos: 1, total: 2, data: hojeISO(),
        itens: ids.map(questaoId => ({ questaoId })), respostas: {}, tempos: {} });
      navigate("simulados"); mudarAbaProvas("historico");
      return document.body.innerHTML;
    });
    assert.doesNotMatch(html, /ver detalhes/);
    await pagina.click("tr.linha-clicavel");
    assert.equal(await pagina.evaluate(() => state.route), "simulado-ativo");
    assert.equal(await pagina.evaluate(() => state.sessaoAtual.resultadoId), "res-clique");
  } finally { await contexto.close(); }
});

test("finalizar simulado conta cada resposta no dia em que foi dada, não no dia de finalizar", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      const u = usuarioAtual();
      db.respostas = db.respostas.filter(x => x.usuarioId !== u.id);
      const ids = db.questoes.filter(q => !q.tipo && q.status === "ativa" && !aguardaImagem(q) && q.gabarito).slice(0, 3).map(q => q.id);
      db.simulados.push({ id: "sim-dias", titulo: "Simulado de vários dias", questoes: ids, duracaoMin: 60, tipo: "simulado_professor", criadoEm: "2026-10-01" });
      iniciarSimulado("sim-dias");
      selecionarAlternativaSimulado("A");
      const carimbo = state.sessaoAtual.momentos[ids[0]];
      // a pessoa fechou o simulado e só o terminou dias depois
      const antes = somarDias(hojeISO(), -3);
      state.sessaoAtual.momentos[ids[0]] = { data: antes, respondidaEm: antes + "T12:00:00.000Z" };
      salvarSimuladoEmAndamento();
      sairDoSimuladoGuardando();
      continuarSimulado("sim-dias");
      irQuestaoSimulado(1);
      selecionarAlternativaSimulado("B");
      finalizarSimulado();
      const minhas = db.respostas.filter(x => x.usuarioId === u.id);
      return { carimbo: carimbo.data, hoje: hojeISO(), antes, datas: minhas.map(x => x.data).sort(), hojeConta: questoesRespondidasHoje(u.id),
        diasDesde: minhas.map(x => x.diasDesdeUltima) };
    });
    assert.equal(r.carimbo, r.hoje, "responder carimba o dia de hoje");
    assert.deepEqual(r.datas, [r.antes, r.hoje].sort());
    assert.equal(r.hojeConta, 1, "só a resposta de hoje conta na meta de hoje");
  } finally { await contexto.close(); }
});
