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
      __responder(A, [true, false, true, false, true, true]);           // 4 de 6 = 67% ≥ 60% (régua do padrão): fase 3
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
    assert.equal(r.depoisDe9, 2, "67% com seis respostas passa a régua da fase 2 (60% no padrão)");
    assert.equal(r.comRevisao, 2, "resposta de revisão não muda a fase");
    assert.equal(r.B, 0, "50% de acerto segura na fase 1");
    assert.equal(r.C, 0, "acerto no chute conta como erro");
    assert.equal(r.D, true, "passou das três fases: concluído");
    assert.equal(r.novasDeD, 0, "assunto concluído não recebe questão nova");
    assert.ok(r.motivos.some(m => /^Exploração/.test(m)), JSON.stringify(r.motivos.slice(0, 5)));
    assert.match(r.motivoDeFase, /^Fase 1 de 3 — .+: 3 acertos em 6 nesta fase · questão média$/);
    assert.match(r.texto, /passaram das fases: 1/);
    assert.match(r.texto, /1 de \d+ consolidados/);
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

test("Formado(a): a sessão tira as questões novas dos assuntos em estudo da trilha, com a dificuldade da fase, e a revisão cresce com a fila", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    await pagina.evaluate(PREPARO_FORMADO);
    const r = await pagina.evaluate(() => {
      const { u } = window.__formado, c = CONFIG.cronogramaFormado;
      const t = trilhaDeFormado(u.id), emEstudo = new Set(t.emEstudo.map(it => it.id));
      const cabe = t.emEstudo.length * c.maxPorAssunto;
      const sessao = montarSessaoSemCalendario(u, 20), novas = sessao.filter(it => it.origem === "nao_vista" && !/^Miscelânea/.test(it.motivo));
      const foraDaTrilha = novas.filter(it => !emEstudo.has(getQuestao(it.questaoId).assuntoId)).length;
      const porAssunto = {}; novas.forEach(it => { const a = getQuestao(it.questaoId).assuntoId; porAssunto[a] = (porAssunto[a] || 0) + 1; });
      // sessão maior que a trilha comporta: o excedente vem de fora, e a tela diz por quê
      const grande = montarSessaoSemCalendario(u, cabe + 10).filter(it => it.origem === "nao_vista" && !/^Miscelânea/.test(it.motivo));
      const daTrilhaNaGrande = grande.filter(it => emEstudo.has(getQuestao(it.questaoId).assuntoId)).length;
      const motivoFora = grande.filter(it => !emEstudo.has(getQuestao(it.questaoId).assuntoId)).map(it => it.motivo)[0] || "";
      // passa dos degraus iniciais da revisão
      const q = questoesParaEstudo(u.id)[0];
      for(let i = 0; i < 120; i++) db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: "x-" + i, assuntoId: q.assuntoId, correta: true, confianca: "certeza", data: hojeISO() });
      return { n: novas.length, foraDaTrilha, maxPorAssunto: Math.max(...Object.values(porAssunto)), cabe, daTrilhaNaGrande, motivoFora,
        motivos: novas.map(it => it.motivo), normal: fracaoRevisaoFormado(u.id, 0), cheia: fracaoRevisaoFormado(u.id, c.filaQueAceleraRevisao), revisaoComFilaGrande: c.revisaoComFilaGrande };
    });
    assert.ok(r.n >= 15);
    assert.equal(r.foraDaTrilha, 0, "numa sessão de 20, as novas vêm só dos assuntos em estudo");
    assert.ok(r.maxPorAssunto <= 2, "teto de duas novas por assunto");
    assert.ok(r.motivos.every(m => /questão (fácil|média|difícil)/.test(m) && /na sua trilha/.test(m)), r.motivos[0]);
    assert.equal(r.daTrilhaNaGrande, r.cabe, "a trilha enche até o teto antes de buscar fora");
    assert.match(r.motivoFora, /fora da trilha/);
    assert.equal(r.normal, 0.4);
    assert.equal(r.cheia, r.revisaoComFilaGrande);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Formado(a): menos retorno — acerto com certeza sai da revisão; no assunto consolidado, qualquer acerto; erro e chute voltam", async () => {
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
      daqui(45);   // depois dos 30 dias do acerto na dúvida e antes dos 60 em que a trilha reabre o assunto parado
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

test("Trilha: errar na revisão não reabre o assunto consolidado; errar nas questões que a pessoa escolheu fazer, sim", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      const R = (c, origem, i) => ({ id: "r" + i, questaoId: "q" + i, correta: c, origem, data: hojeISO(), respondidaEm: hojeISO() + "T10:" + String(i % 60).padStart(2, "0") + ":00Z" });
      const base = Array.from({ length: 60 }, (_, i) => R(true, "nao_vista", i));
      const comRevisao = [...base, ...Array.from({ length: 10 }, (_, i) => R(false, "revisao_erro", 100 + i))];
      const comLista = [...base, ...Array.from({ length: 5 }, (_, i) => R(false, "lista", 200 + i))];
      return { revisao: motivoDeReaberturaFormado(comRevisao, true), lista: motivoDeReaberturaFormado(comLista, true) };
    });
    assert.equal(r.revisao, null, "a revisão traz o que a pessoa errou: o acerto dela não reabre o assunto");
    assert.match(r.lista || "", /acerto nas últimas 10 caiu/);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Formado(a): ritmo das fases — a régua muda por aluno, refaz as fases e a escolha vai para a nuvem", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    await pagina.evaluate(PREPARO_FORMADO);
    const r = await pagina.evaluate(() => {
      const { u, grandes: [A, B] } = window.__formado, fase = a => faseDoAssuntoFormado(u.id, a).fase;
      __responder(A, [true, false, true, false, true, false]);             // 50%
      __responder(B, [true, false, true, false, true, true]);              // 67%
      const em = ritmo => { if(ritmo) u.reguaFormado = ritmo; else delete u.reguaFormado; return [fase(A), fase(B)]; };
      const padrao = em(null), firme = em("firme"), rapida = em("rapida");
      const reguas = { padrao: (delete u.reguaFormado, reguaDoFormado(u)), lixo: (u.reguaFormado = "xyz", ritmoDoFormado(u)) };
      delete u.reguaFormado;
      abrirRitmoDoFormado();
      const janela = document.querySelectorAll('input[name="ritmoFormado"]').length;
      document.querySelector('input[name="ritmoFormado"][value="rapida"]').checked = true;
      salvarRitmoDoFormado();
      const salvo = u.reguaFormado, linha = linhaDoPerfil(u).regua_formado, texto = explicacaoCronogramaFormado(u);
      abrirRitmoDoFormado();
      document.querySelector('input[name="ritmoFormado"][value="padrao"]').checked = true;
      salvarRitmoDoFormado();
      const voltou = !("reguaFormado" in u);
      const base = { id: u.id, nome: u.nome, papel: u.papel, status: "aprovado" };
      nuvemAplicarPerfilLocal({ ...base, regua_formado: "firme" });
      const daNuvem = u.reguaFormado;
      NUVEM_TABELAS.perfis.aplicar({ ...base, regua_formado: null });
      return { padrao, firme, rapida, reguas, janela, salvo, linha, texto, voltou, daNuvem, nuloApaga: !("reguaFormado" in u) };
    });
    assert.deepEqual(r.padrao, [0, 1], "padrão (60%): 50% fica, 67% sobe");
    assert.deepEqual(r.firme, [0, 0], "firme (70%): nenhum sobe");
    assert.deepEqual(r.rapida, [1, 1], "rápido (50%): os dois sobem");
    assert.deepEqual(r.reguas.padrao, [0.6, 0.6, 0.55]);
    assert.equal(r.reguas.lixo, "padrao", "valor desconhecido vale o padrão");
    assert.equal(r.janela, 3);
    assert.equal(r.salvo, "rapida"); assert.equal(r.linha, "rapida");
    assert.match(r.texto, /50%, 50%, 45% .*ritmo Rápido/);
    assert.equal(r.voltou, true, "escolher o padrão apaga a escolha");
    assert.equal(r.daNuvem, "firme");
    assert.equal(r.nuloApaga, true);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Formado(a): o ritmo e o tamanho escolhidos ficam guardados ao recarregar e um perfil antigo da nuvem não os apaga", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const id = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual(); u.anoFaculdade = "Formado(a)"; u.grupoId = null;
      abrirRitmoDoFormado();
      document.querySelector('input[name="ritmoFormado"][value="firme"]').checked = true;
      salvarRitmoDoFormado();
      abrirModalMeta(); document.getElementById("tamanhoSessaoInput").value = "30"; salvarMeta();
      return u.id;
    });
    await pagina.reload();
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    const r = await pagina.evaluate(id => {
      const u = db.usuarios.find(x => x.id === id);
      const guardado = { ritmo: u.reguaFormado, tamanho: u.tamanhoSessao, botao: "" };
      // o login de demonstração não sobrevive ao recarregar; entrar de novo não pode apagar a escolha
      if(!usuarioAtual() || usuarioAtual().id !== id){ fazerLoginDemo("aluno"); fecharModal(); }
      navigate("estudar");
      const b = document.querySelector('button[onclick="abrirRitmoDoFormado()"]'); guardado.botao = b ? b.textContent : "(sem botão)";
      guardado.ritmoDepoisDeEntrar = u.reguaFormado;
      // perfil que desce ANTES da escolha subir: a deste aparelho vale
      db.nuvem = db.nuvem || {};
      db.nuvem.perfilEnviado = JSON.stringify({ ...linhaDoPerfil(u), regua_formado: null, tamanho_sessao: null });
      NUVEM_TABELAS.perfis.aplicar({ id: u.id, nome: u.nome, papel: u.papel, status: "aprovado", regua_formado: null, tamanho_sessao: null });
      const comPendencia = { ritmo: u.reguaFormado, tamanho: u.tamanhoSessao };
      // já subiu: aí o perfil da nuvem decide (voltou ao padrão noutro aparelho)
      db.nuvem.perfilEnviado = JSON.stringify(linhaDoPerfil(u));
      NUVEM_TABELAS.perfis.aplicar({ id: u.id, nome: u.nome, papel: u.papel, status: "aprovado", regua_formado: "rapida", tamanho_sessao: null });
      return { guardado, comPendencia, depois: { ritmo: u.reguaFormado, tamanho: u.tamanhoSessao ?? null } };
    }, id);
    assert.equal(r.guardado.ritmo, "firme"); assert.equal(r.guardado.tamanho, 30);
    assert.equal(r.guardado.ritmoDepoisDeEntrar, "firme", "entrar de novo mantém a escolha");
    assert.match(r.guardado.botao, /Ritmo das fases: Firme/, "o botão diz o ritmo escolhido");
    assert.deepEqual(r.comPendencia, { ritmo: "firme", tamanho: 30 }, "perfil antigo não apaga a escolha que ainda não subiu");
    assert.deepEqual(r.depois, { ritmo: "rapida", tamanho: null });
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

test("Simulação: quatro semanas de 200 questões seguem a trilha e a mistura das fases e não repetem cedo", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await simularFormado(pagina, { semanas: 4, porSemana: 200 });
    assert.deepEqual(r.falhas, [], JSON.stringify(r.cobertura));
    assert.ok(r.semanas.every(s => s.feitas >= 200), "o ritmo de 200 por semana coube nas sessões");
    assert.ok(r.fatiaDaTrilha > 0.9, "as questões novas vêm dos assuntos em estudo: " + r.fatiaDaTrilha);
    assert.ok(r.semanas[3].consolidados > r.semanas[0].consolidados, "assuntos consolidam e a trilha anda");
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

test("Formado(a): a trilha abre só os assuntos em estudo, trava o que depende de base não consolidada e libera ao consolidar", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual(); u.anoFaculdade = "Formado(a)";
      const t0 = trilhaDeFormado(u.id);
      const exige = SEED_TRILHA_FORMADOS.exige;
      const filho = Object.keys(exige).find(k => t0.itens.find(i => i.id === k && !i.sem) && exige[k].every(p => t0.itens.find(i => i.id === p && !i.sem)));
      const base = exige[filho][0];
      const antes = { filhoEmEstudo: t0.emEstudo.some(i => i.id === filho), baseEmEstudo: t0.emEstudo.some(i => i.id === base), n: t0.emEstudo.length };
      const real = Math.random; Math.random = () => 0.5;    // sem a miscelânea rara (1%) entrando por sorteio
      const sessao = montarSessaoSemCalendario(u, 20);
      Math.random = real;
      const ids = new Set(sessao.map(it => getQuestao(it.questaoId).assuntoId));
      const foraDaTrilha = [...ids].filter(a => !t0.emEstudo.some(i => i.id === a)).length;
      // consolida a base e todos os pré-requisitos dela, acertando com certeza
      const consolidar = id => { for(const p of (exige[id] || [])) consolidar(p); for(let i = 0; i < 60; i++) db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: "x" + Math.random(), assuntoId: id, correta: true, confianca: "certeza", data: hojeISO() }); };
      (exige[filho] || []).forEach(consolidar);
      const t1 = trilhaDeFormado(u.id);
      abrirTrilhaDeFormado();
      const tela = document.querySelector(".modal") ? document.querySelector(".modal").innerText : "";
      return { antes, foraDaTrilha, depois: t1.emEstudo.some(i => i.id === filho), consolidados: t1.consolidados, tela };
    });
    assert.equal(r.antes.filhoEmEstudo, false, "assunto que exige base não consolidada não está em estudo");
    assert.ok(r.antes.n <= 12);
    assert.equal(r.foraDaTrilha, 0, "com a trilha cheia, a sessão fica nos assuntos em estudo");
    assert.equal(r.depois, true, "consolidada a base, o assunto entra em estudo");
    assert.match(r.tela, /Em estudo agora/);
    assert.match(r.tela, /de 10 em 10 respostas/);
    assert.match(r.tela, /Libera depois de consolidar|Vêm a seguir/);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Formado(a): regra de consolidação (assunto pequeno × grande) e gráfico de 10 em 10", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      const mk = (n, acertos) => Array.from({ length: n }, (_, i) => ({ questaoId: "q" + i, correta: i < acertos }));
      const antigoRuim = [...mk(40, 0).map((x, i) => ({ ...x, questaoId: "a" + i })), ...mk(20, 18).map((x, i) => ({ ...x, questaoId: "b" + i }))];
      const u = (fazerLoginDemo("aluno"), fecharModal(), usuarioAtual());
      const q = questoesParaEstudo(u.id)[0];
      for(let i = 0; i < 23; i++) db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: q.id, assuntoId: q.assuntoId, correta: i % 2 === 0, data: "2026-11-0" + (1 + i % 8) });
      return {
        peqOk: assuntoConsolidadoFormado(mk(10, 8), 20),         // 10 de 20 feitas, 80%
        peqPoucas: assuntoConsolidadoFormado(mk(9, 9), 20),      // menos da metade
        peqBaixo: assuntoConsolidadoFormado(mk(10, 7), 20),      // 70% não passa de 70%
        peqRecente: assuntoConsolidadoFormado([...mk(10, 0).map((x, i) => ({ ...x, questaoId: "z" + i })), ...mk(10, 9)], 20),  // começou mal, últimas 10 = 90%
        grandeOk: assuntoConsolidadoFormado(antigoRuim, 120),    // 60 respostas; últimas 20 = 90%
        grandeCedo: assuntoConsolidadoFormado(mk(50, 50), 120),  // 50 não é "mais de 50"
        semQuestao: assuntoConsolidadoFormado([], 0),
        simuladoConta: (() => { const a = q.assuntoId, antes = trilhaDeFormado(u.id).itens.find(i => i.id === a).n;
          db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: "sim-x", assuntoId: a, correta: true, origem: "simulado", data: "2026-11-09", respondidaEm: "2026-11-09T10:00:00Z" });
          return trilhaDeFormado(u.id).itens.find(i => i.id === a).n === antes + 1; })(),
        svg: graficoDesempenhoEmBlocos(db.respostas.filter(x => x.usuarioId === u.id), 12),
      };
    });
    assert.deepEqual([r.peqOk, r.peqPoucas, r.peqBaixo, r.peqRecente, r.grandeOk, r.grandeCedo, r.semQuestao], [true, false, false, true, true, false, true]);
    assert.equal(r.simuladoConta, true, 'resposta de simulado entra na trilha');
    assert.match(r.svg, /<svg/);
    assert.match(r.svg, /1–10/);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Formado(a): assuntos com menos de 5 questões viram miscelânea rara, sem fila própria nem grupo na taxonomia", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual(); u.anoFaculdade = "Formado(a)";
      const t = trilhaDeFormado(u.id);
      const misc = new Set(t.miscelania.map(i => i.id));
      const antesTax = db.taxonomia.assuntos.length;
      const real = Math.random;
      const contar = (valor) => { Math.random = () => valor; let n = 0; try{ for(let k = 0; k < 5; k++) n += montarSessaoDeFormado(u, 20).filter(it => misc.has(getQuestao(it.questaoId).assuntoId) && /^Miscelânea/.test(it.motivo)).length; } finally { Math.random = real; } return n; };
      return { qtd: misc.size, emEstudoMisc: t.emEstudo.some(i => misc.has(i.id)), proximosMisc: t.proximos.some(i => misc.has(i.id)),
        semSorteio: contar(0.5), comSorteio: contar(0.0), taxonomia: db.taxonomia.assuntos.length === antesTax, nomeGrupo: db.taxonomia.assuntos.some(a => /miscel/i.test(a.nome)) };
    });
    assert.ok(r.qtd > 0, "o banco tem assuntos com menos de 5 questões");
    assert.equal(r.emEstudoMisc, false); assert.equal(r.proximosMisc, false);
    assert.equal(r.semSorteio, 0, "sem sorteio favorável, nenhuma miscelânea");
    assert.ok(r.comSorteio > 0, "com sorteio favorável, a miscelânea aparece");
    assert.equal(r.taxonomia, true); assert.equal(r.nomeGrupo, false);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Trilha: reabre assunto parado ou com acerto recente baixo, pular respeita pré-requisito, projeção até a prova e painel somado", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual(); u.anoFaculdade = "Formado(a)"; u.provaAlvoData = somarDias(hojeISO(), 100);
      const R = (a, q, c, d) => ({ id: uid("r"), usuarioId: u.id, questaoId: q, assuntoId: a, correta: c, data: d, respondidaEm: d + "T10:00:00Z" });
      const t0 = trilhaDeFormado(u.id);
      const exige = SEED_TRILHA_FORMADOS.exige;
      const naoLiberado = t0.itens.find(i => !i.liberado && !i.consolidado);
      pularAssuntoDaTrilha(naoLiberado.id);
      const recusouNaoLiberado = !(document.querySelector(".modal") && /Pular este assunto/.test(document.querySelector(".modal").innerText));
      const base = t0.emEstudo[0].id;                                   // assunto livre de pré-requisito
      const dependente = Object.keys(exige).find(k => exige[k].includes(base) && t0.itens.find(i => i.id === k && !i.misc && !i.sem));
      // 1) consolida a base há 90 dias: a regra diz "consolidado", mas o tempo reabre
      for(let i = 0; i < 70; i++) db.respostas.push(R(base, "v" + i, true, somarDias(hojeISO(), -90)));
      const t1 = trilhaDeFormado(u.id), itBase = t1.itens.find(i => i.id === base);
      const reabriuPorTempo = !!itBase.reabertura && /dias/.test(itBase.reabertura) && t1.emEstudo[0].id === base;
      const dependenteLiberado = dependente ? !t1.itens.find(i => i.id === dependente).esperaPor.length : true;   // reabrir a base não trava quem depende dela
      // acerto recente baixo reabre também
      db.respostas = db.respostas.filter(x => x.assuntoId !== base);
      for(let i = 0; i < 60; i++) db.respostas.push(R(base, "w" + i, true, somarDias(hojeISO(), -2)));
      for(let i = 0; i < 5; i++) db.respostas.push(R(base, "e" + i, false, hojeISO()));
      const motivoRecente = motivoDeReaberturaFormado(_estatisticaDosAssuntosFormado(u.id)[base], true);
      // 2) pular: só assunto liberado; o dependente passa a ficar liberado
      db.respostas = db.respostas.filter(x => x.assuntoId !== base);
      confirmarPuloDaTrilha(base);
      const t2 = trilhaDeFormado(u.id);
      const pulou = t2.pulados.some(i => i.id === base) && !t2.emEstudo.some(i => i.id === base);
      const depLiberou = dependente ? !t2.itens.find(i => i.id === dependente).esperaPor.length : true;
      const naoContaComoConsolidado = t2.consolidados === t0.consolidados;
      const perfil = linhaDoPerfil(u);
      // 3) projeção
      for(let i = 0; i < 56; i++) db.respostas.push(R(t2.emEstudo[0].id, "p" + i, i % 2 === 0, somarDias(hojeISO(), -(i % 28))));
      const proj = projecaoDaTrilha(u, trilhaDeFormado(u.id));
      abrirTrilhaDeFormado();
      const tela = document.querySelector(".modal").innerText;
      // 6) painel
      const resumo = resumoDaTrilha(u);
      const tres = [1, 2, 3].map(() => ({ trilha: resumo }));
      return { reabriuPorTempo, dependenteLiberado, motivoRecente, recusouNaoLiberado, pulou, depLiberou, naoContaComoConsolidado,
        perfilTrilha: perfil.trilha && Object.keys(perfil.trilha.pulados), perfilResumo: Object.keys(perfil.trilha.resumo),
        proj: proj && { ritmo: proj.ritmo > 1, pos: !!proj.alcanca || proj.orcamento >= 0 }, tela,
        painel: htmlTrilhaDaTurma(tres), painelPoucos: htmlTrilhaDaTurma(tres.slice(0, 2)), temAcerto: JSON.stringify(resumo).includes("correta") };
    });
    assert.ok(r.reabriuPorTempo, "90 dias parado reabre e vai para o início da fila");
    assert.ok(r.dependenteLiberado, "reabrir a base não trava quem depende dela");
    assert.match(r.motivoRecente, /acerto nas últimas 10 caiu/);
    assert.ok(r.recusouNaoLiberado, "não se pula assunto cujos pré-requisitos não foram vencidos");
    assert.ok(r.pulou); assert.ok(r.depLiberou); assert.ok(r.naoContaComoConsolidado);
    assert.ok(r.perfilTrilha.length === 1 && r.perfilResumo.includes("emEstudo"));
    assert.ok(r.proj.ritmo);
    assert.match(r.tela, /Até sua prova/); assert.match(r.tela, /questões por dia/); assert.match(r.tela, /já domino, pular/); assert.match(r.tela, /Que você pulou/);
    assert.match(r.painel, /Trilha dos Formados/); assert.match(r.painel, /posição mediana/);
    assert.match(r.painelPoucos, /Menos de 3 formados/);
    assert.equal(r.temAcerto, false, "o resumo não carrega taxa de acerto");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Revisão sugerida: assuntos esfriados, mais erro primeiro e depois mais tempo parado, no tamanho pedido", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      const porAssunto = {}; questoesParaEstudo(u.id).forEach(q => { if(!ehDissertativa(q)) (porAssunto[q.assuntoId] = porAssunto[q.assuntoId] || []).push(q); });
      const total = {}; questoesAtivas().forEach(q => { total[q.assuntoId] = (total[q.assuntoId] || 0) + 1; });
      const com = (min, max) => Object.keys(porAssunto).filter(a => porAssunto[a].length >= 10 && total[a] >= min && total[a] < max);
      const [A, B, C, D, E] = com(20, 1e9);
      const [F, G] = com(10, 20);                                 // pequenos: bimestral
      const H = Object.keys(porAssunto).find(a => total[a] < 10 && porAssunto[a].length >= 4);   // sem revisão por tempo
      const R = (a, q, correta, dias) => db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: q.id, assuntoId: a, correta, confianca: "certeza", data: somarDias(hojeISO(), -dias), respondidaEm: somarDias(hojeISO(), -dias) + "T10:00:00Z" });
      // A: erra 80%, parado há 35 dias · B: erra 80%, 50 dias (empate no erro → B vem antes por tempo) · C: erra 40%, 31 dias · D: recente (20 dias, ainda dentro do mês) · E: poucas respostas
      // F (pequeno): 45 dias, ainda não esfriou · G (pequeno): 70 dias, esfriou · H (menos de 10 questões): 300 dias, sem revisão por tempo
      porAssunto[A].slice(0, 10).forEach((q, i) => R(A, q, i < 2, 35));
      porAssunto[B].slice(0, 10).forEach((q, i) => R(B, q, i < 2, 50));
      porAssunto[C].slice(0, 10).forEach((q, i) => R(C, q, i < 6, 31));
      porAssunto[D].slice(0, 10).forEach((q, i) => R(D, q, false, 20));
      porAssunto[E].slice(0, 2).forEach((q) => R(E, q, false, 60));
      porAssunto[F].slice(0, 10).forEach((q, i) => R(F, q, i < 3, 45));
      porAssunto[G].slice(0, 10).forEach((q, i) => R(G, q, i < 9, 70));
      porAssunto[H].slice(0, 4).forEach((q) => R(H, q, false, 300));
      const cand = candidatosDaRevisaoSugerida(u.id);
      const ordem = cand.assuntos.map(a => a.assuntoId);
      const m8 = montarRevisaoSugerida(u.id, 8), m3 = montarRevisaoSugerida(u.id, 3);
      const assuntosDe = m => m.itens.map(it => getQuestao(it.questaoId).assuntoId);
      const primeiraB = getQuestao(m8.itens[0].questaoId);
      abrirRevisaoSugerida(8);
      const tela = document.querySelector(".modal").innerText;
      return { A, B, C, D, E, F, G, H, ordem, a8: assuntosDe(m8), a3: assuntosDe(m3), motivo: m8.itens[0].motivo, origem: m8.itens[0].origem, tela, card: htmlCardRevisaoSugerida(u) };
    });
    assert.deepEqual(r.ordem, [r.B, r.A, r.C, r.G], "taxa de erro primeiro; empate, mais tempo parado; recente, pequeno que ainda não esfriou, pouca resposta e menos de 10 questões ficam fora");
    assert.deepEqual(r.a8, [...Array(5).fill(r.B), ...Array(3).fill(r.A)], "5 por rodada, na ordem dos assuntos, até completar o pedido");
    assert.deepEqual(r.a3, Array(3).fill(r.B));
    assert.match(r.motivo, /Revisão sugerida — .*erro de 80% e faz 50 dias/);
    assert.equal(r.origem, "revisao_sugerida");
    assert.match(r.tela, /8 questões, nesta ordem de assuntos/);
    assert.match(r.card, /Montar revisão sugerida/);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
