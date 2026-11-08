/* Cronograma de formados (fases por assunto, cota por área, tamanho da sessão, simulação), dificuldade com pouca resposta e setas do teclado. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";
import { simularFormado } from "../ferramentas/simular-formado.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(); servidor = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1000, height: 800 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(servidor.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto, erros };
}

test("Dificuldade: com poucas respostas vale a dificuldade sugerida; a taxa de acerto só pesa com amostra", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      const base = db.questoes.find(q => q.status === "ativa");
      const mk = (dif, respostas, acertos) => ({ ...base, dificuldadeManual: dif, estatisticas: { respostas, acertos, distribuicaoAlternativas: {} } });
      const f = calcularDificuldade(mk("fundamental", 0, 0)), a = calcularDificuldade(mk("avancado", 0, 0));
      // 2 respostas e 2 erros: o erro não pode transformar uma questão fundamental em difícil
      const poucosErros = calcularDificuldade(mk("fundamental", 2, 0));
      const muitosErros = calcularDificuldade(mk("fundamental", 60, 0));
      return { f, a, poucosErros, muitosErros };
    });
    assert.ok(r.f < 35, "fundamental sem respostas é fácil: " + r.f);
    assert.ok(r.a >= 60, "avançada sem respostas é difícil: " + r.a);
    assert.ok(r.poucosErros < 35, "2 erros não mudam o rótulo: " + r.poucosErros);
    assert.ok(r.muitosErros > r.poucosErros, "com amostra grande a taxa passa a pesar");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

/* Responde questões REAIS de um assunto (a fase olha o nível de cada uma). */
const PREPARO_FORMADO = () => {
  fazerLoginDemo("aluno"); fecharModal();
  const u = usuarioAtual(); u.anoFaculdade = "Formado(a)"; u.grupoId = null;
  const porAssunto = {};
  questoesParaEstudo(u.id).forEach(q => { (porAssunto[q.assuntoId] = porAssunto[q.assuntoId] || []).push(q); });
  const grandes = Object.keys(porAssunto).filter(a => porAssunto[a].length >= 15);
  window.__formado = { u, porAssunto, grandes, usadas: {} };
  window.__responder = (a, acertos, confianca, origem) => {
    const f = window.__formado, i = f.usadas[a] || 0;
    acertos.forEach((ok, k) => { const q = f.porAssunto[a][i+k];
      db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: q.id, assuntoId: a, areaId: q.areaId, correta: ok,
        confianca: confianca || "certeza", origem: origem || "nao_vista", data: hojeISO() }); });
    f.usadas[a] = i + acertos.length;
  };
};

test("Formado(a): o assunto sobe de fase pela taxa de acerto, 100% sobe na hora, chute é erro e revisão não conta", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    await pagina.evaluate(PREPARO_FORMADO);
    const r = await pagina.evaluate(() => {
      const { u, grandes: [A, B, C, D] } = window.__formado, fase = a => faseDoAssuntoFormado(u.id, a);
      const novo = fase(A).fase;
      __responder(A, [true, true, true]);                               // 100% nas 3 primeiras: fase 2
      const depoisDe3 = fase(A).fase;
      __responder(A, [true, false, true, false, true, true]);           // 4 de 6 = 67% ≥ 65%: fase 3
      const depoisDe9 = fase(A).fase;
      // revisão: a mesma questão de novo, errada, não mexe na fase
      const q = window.__formado.porAssunto[A][0];
      db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: q.id, assuntoId: A, correta: false, confianca: "certeza", origem: "revisao_erro", data: hojeISO() });
      const comRevisao = fase(A).fase;
      __responder(B, [true, false, true, false, true, false]);          // 50%: fica na fase 1
      __responder(C, [true, true, true], "chute");                      // acerto no chute é erro
      __responder(D, [true, true, true, true, true, true, true, true, true]);   // 3 fases de 100%: concluído
      const sessao = montarSessaoSemCalendario(u, 40);
      const novasDeD = sessao.filter(it => it.origem === "nao_vista" && getQuestao(it.questaoId).assuntoId === D).length;
      return { novo, depoisDe3, depoisDe9, comRevisao, B: fase(B).fase, C: fase(C).fase, D: fase(D).concluido, novasDeD,
        motivos: sessao.map(it => it.motivo), motivoDeFase: motivoFormado(fase(B), B, 1), texto: explicacaoCronogramaFormado(u), cronoDe6: !!cronogramaDoUsuario(u) };
    });
    assert.equal(r.novo, 0);
    assert.equal(r.depoisDe3, 1, "100% nas três primeiras sobe de fase");
    assert.equal(r.depoisDe9, 2, "67% com seis respostas passa a régua da fase 2 (65%)");
    assert.equal(r.comRevisao, 2, "resposta de revisão não muda a fase");
    assert.equal(r.B, 0, "50% de acerto segura na fase 1");
    assert.equal(r.C, 0, "acerto no chute conta como erro");
    assert.equal(r.D, true, "passou das três fases: concluído");
    assert.equal(r.novasDeD, 0, "assunto concluído não recebe questão nova");
    assert.ok(r.motivos.some(m => /^Exploração/.test(m)), JSON.stringify(r.motivos.slice(0, 5)));
    assert.match(r.motivoDeFase, /^Fase 1 de 3 — .+: 3 acerto\(s\) em 6 nesta fase · questão média$/);
    assert.match(r.texto, /concluídos: 1/);
    assert.match(r.texto, /50%\/35%\/15%/);
    assert.equal(r.cronoDe6, false);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Formado(a): a dificuldade segue a mistura da fase e pula o nível que falta", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      const c = CONFIG.cronogramaFormado;
      // muitas fases começando do zero: a primeira questão sai na proporção da mistura
      const primeiras = [0,0,0];
      for(let i = 0; i < 3000; i++) primeiras[proximoNivelDaFase(0, [0,0,0], [9,9,9])]++;
      // uma fase longa: depois de 20 questões a contagem fica colada na mistura
      const longa = c.fases.map((m, f) => { const feitas = [0,0,0];
        for(let i = 0; i < 20; i++) feitas[proximoNivelDaFase(f, feitas, [99,99,99])]++; return feitas; });
      const semMedia = new Set(); for(let i = 0; i < 200; i++) semMedia.add(proximoNivelDaFase(1, [0,0,0], [5,0,5]));
      return { primeiras: primeiras.map(x => x/3000), longa, fases: c.fases, semMedia: [...semMedia], nada: proximoNivelDaFase(0, [0,0,0], [0,0,0]) };
    });
    r.primeiras.forEach((x, l) => assert.ok(Math.abs(x - r.fases[0][l]) < 0.04, "primeira questão: " + JSON.stringify(r.primeiras)));
    r.longa.forEach((feitas, f) => feitas.forEach((n, l) => assert.ok(Math.abs(n - 20*r.fases[f][l]) <= 1.5, `fase ${f+1}: ${feitas}`)));
    assert.ok(!r.semMedia.includes(1), "sem questão média disponível, o nível é pulado");
    assert.equal(r.nada, null);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Formado(a): as questões novas da sessão se dividem entre as áreas pela cota e a revisão cresce com a fila", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    await pagina.evaluate(PREPARO_FORMADO);
    const r = await pagina.evaluate(() => {
      const { u } = window.__formado;
      const sessao = montarSessaoSemCalendario(u, 40), novas = sessao.filter(it => it.origem === "nao_vista");
      const porArea = {}; novas.forEach(it => { const a = getQuestao(it.questaoId).areaId; porArea[a] = (porArea[a] || 0) + 1; });
      const alvo = alvoDasAreasFormado(Object.keys(porArea));
      const porAssunto = {}; novas.forEach(it => { const a = getQuestao(it.questaoId).assuntoId; porAssunto[a] = (porAssunto[a] || 0) + 1; });
      // passa dos degraus iniciais da revisão
      const q = questoesParaEstudo(u.id)[0];
      for(let i = 0; i < 120; i++) db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: "x-" + i, assuntoId: q.assuntoId, correta: true, confianca: "certeza", data: hojeISO() });
      const c = CONFIG.cronogramaFormado;
      return { n: novas.length, porArea, alvo, somaAlvo: Object.values(alvo).reduce((a, b) => a + b, 0), maxPorAssunto: Math.max(...Object.values(porAssunto)),
        normal: fracaoRevisaoFormado(u.id, 0), cheia: fracaoRevisaoFormado(u.id, c.filaQueAceleraRevisao), revisaoComFilaGrande: c.revisaoComFilaGrande };
    });
    assert.equal(Object.keys(r.porArea).length, 5, "as cinco grandes áreas entram: " + JSON.stringify(r.porArea));
    Object.keys(r.porArea).forEach(a => assert.ok(Math.abs(r.porArea[a] - r.alvo[a]*r.n) <= 1.5, a + ": " + JSON.stringify(r)));
    assert.ok(Math.abs(r.somaAlvo - 1) < 1e-9);
    assert.ok(r.maxPorAssunto <= 2, "teto de duas novas por assunto");
    assert.equal(r.normal, 0.4);
    assert.equal(r.cheia, r.revisaoComFilaGrande);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Formado(a): menos retorno — acerto com certeza sai da revisão; no assunto concluído, qualquer acerto; erro e chute voltam", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    await pagina.evaluate(PREPARO_FORMADO);
    const r = await pagina.evaluate(() => {
      const { u, porAssunto, grandes: [A, D] } = window.__formado;
      const hoje = CONFIG.hoje;
      const q = porAssunto[A];
      const responder = (questao, certa, confianca) => registrarResposta(u.id, questao.id, certa ? questao.gabarito : (questao.alternativas||[]).map(x=>x.letra||x.id).find(l=>l!==questao.gabarito), confianca, 60, "nao_vista");
      responder(q[0], true, "certeza"); responder(q[1], true, "duvida"); responder(q[2], false, "certeza"); responder(q[3], true, "chute");
      // D concluído (3 fases de 100%) e uma questão dele acertada na dúvida
      const qd = porAssunto[D];
      for(let i = 0; i < 9; i++) responder(qd[i], true, "certeza");
      responder(qd[9], true, "duvida");
      const daqui = dias => { const t = Date.now() + dias*86400000; CONFIG.hoje = () => new Date(t); };
      daqui(70);
      const vencida = x => revisaoVencida(u.id, x.id);
      const formado = { certeza: vencida(q[0]), duvida: vencida(q[1]), erro: vencida(q[2]), chute: vencida(q[3]), duvidaConcluido: vencida(qd[9]) };
      u.anoFaculdade = "6º ano";
      const outroAno = vencida(q[0]);
      CONFIG.hoje = hoje;
      return { formado, concluido: faseDoAssuntoFormado(u.id, D).concluido, outroAno };
    });
    assert.equal(r.concluido, true);
    assert.deepEqual(r.formado, { certeza: false, duvida: true, erro: true, chute: true, duvidaConcluido: false });
    assert.equal(r.outroAno, true, "fora do cronograma de Formados, o acerto com certeza continua voltando");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Tamanho da sessão: a pessoa escolhe em Ajustar meta, a sessão respeita e o perfil leva para a nuvem", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      const padrao = tamanhoDaSessaoDoUsuario(u);
      abrirModalMeta();
      document.getElementById("metaInput").value = "50";
      document.getElementById("tamanhoSessaoInput").value = "35";
      salvarMeta();
      const salvo = u.tamanhoSessao, linha = linhaDoPerfil(u).tamanho_sessao;
      montarSessaoRecomendadaDeHoje();
      const naSessao = state.sessaoAtual.itens.length;
      abrirModalMeta();
      document.getElementById("tamanhoSessaoInput").value = String(CONFIG.tamanhoSessaoPadrao);
      salvarMeta();
      const voltouAoPadrao = !("tamanhoSessao" in u);
      abrirModalMeta(); document.getElementById("tamanhoSessaoInput").value = "2"; salvarMeta();
      const recusou = !("tamanhoSessao" in u) && !!document.getElementById("tamanhoSessaoInput");
      fecharModal();
      const base = { id: u.id, nome: u.nome, papel: u.papel, status: "aprovado" };
      nuvemAplicarPerfilLocal({ ...base, tamanho_sessao: 12 });
      const daNuvem = u.tamanhoSessao;
      NUVEM_TABELAS.perfis.aplicar({ ...base, tamanho_sessao: null });
      const nuloApaga = !("tamanhoSessao" in u);
      u.tamanhoSessao = 15; NUVEM_TABELAS.perfis.aplicar({ ...base });
      return { padrao, salvo, linha, naSessao, voltouAoPadrao, recusou, daNuvem, nuloApaga, semColunaMantem: u.tamanhoSessao };
    });
    assert.equal(r.padrao, 20);
    assert.equal(r.salvo, 35); assert.equal(r.linha, 35);
    assert.equal(r.naSessao, 35, "a sessão traz o tamanho escolhido (a meta de 50 ainda não foi batida)");
    assert.equal(r.voltouAoPadrao, true, "escolher o padrão apaga a escolha");
    assert.equal(r.recusou, true, "menos de 5 por sessão é recusado");
    assert.equal(r.daNuvem, 12);
    assert.equal(r.nuloApaga, true, "nulo na nuvem = voltou ao padrão no outro aparelho");
    assert.equal(r.semColunaMantem, 15, "banco sem a coluna não apaga a escolha");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Simulação: quatro semanas de 200 questões cobrem as áreas, seguem a mistura e não repetem cedo", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await simularFormado(pagina, { semanas: 4, porSemana: 200 });
    assert.deepEqual(r.falhas, [], JSON.stringify(r.cobertura));
    assert.ok(r.semanas.every(s => s.feitas >= 200), "o ritmo de 200 por semana coube nas sessões");
    assert.ok(r.semanas[3].explorados / r.semanas[3].assuntos > 0.75, "em quatro semanas a maior parte dos assuntos foi vista");
    assert.ok(r.semanas[3].porFase[1] > 0, "algum assunto já subiu de fase");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Setas do teclado passam questão e flashcard; as setas da barra também", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal();
      const pool = questoesParaEstudo(usuarioAtual().id).slice(0, 10);
      iniciarSessaoComLista(pool.map(q => ({ questaoId: q.id, motivo: "t" })), "pratica"); });
    const indice = () => pagina.evaluate(() => state.sessaoAtual.indiceAtual);
    await pagina.keyboard.press("ArrowRight"); assert.equal(await indice(), 1);
    await pagina.keyboard.press("ArrowRight"); assert.equal(await indice(), 2);
    await pagina.keyboard.press("ArrowLeft"); assert.equal(await indice(), 1);
    await pagina.evaluate(() => document.querySelectorAll(".barra-questoes-seta")[1].click()); assert.equal(await indice(), 2);
    await pagina.evaluate(() => document.querySelectorAll(".barra-questoes-seta")[0].click()); assert.equal(await indice(), 1);
    // flashcards: precisa virar antes de seguir (regra de sempre)
    await pagina.evaluate(() => { state.sessaoAtual = null; iniciarSessaoFlashcards({}); });
    const i0 = await pagina.evaluate(() => state.sessaoFlash.indice);
    await pagina.keyboard.press("ArrowRight");
    assert.equal(await pagina.evaluate(() => state.sessaoFlash.indice), i0, "sem virar, não passa");
    await pagina.evaluate(() => virarFlashcard());
    await pagina.keyboard.press("ArrowRight");
    assert.equal(await pagina.evaluate(() => state.sessaoFlash.indice), i0 + 1);
    await pagina.keyboard.press("ArrowLeft");
    assert.equal(await pagina.evaluate(() => state.sessaoFlash.indice), i0);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
