/* Sessão pelo tempo disponível (ritmo do aluno + 10%), confiança e tempo por
   questão no simulado em treino, e o enxugamento visual (uma ação principal,
   avisos recolhidos, selos em "detalhes", enunciado 7% menor). */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(); servidor = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1200, height: 900 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(servidor.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal(); });
  return { pagina, contexto, erros };
}

test("Sessão por tempo: o tempo de cada questão é o do aluno + 10% e define o tamanho", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      const u = usuarioAtual();
      const semHistorico = ritmoPorQuestao(u.id);
      const qs = questoesAtivas().filter(q => !ehDissertativa(q) && !aguardaImagem(q)).slice(0, 8);
      qs.forEach(q => registrarResposta(u.id, q.id, q.gabarito, "certeza", 60, "pratica"));
      const comHistorico = ritmoPorQuestao(u.id);
      state.tempoSessaoMin = 30;
      const cabem = questoesQueCabemEm(u.id, 30);
      state.sessaoAtual = null;
      montarSessaoRecomendadaDeHoje();
      return { semHistorico, comHistorico, cabem, itens: state.sessaoAtual.itens.length, frase: fraseTempoDaSessao(u.id) };
    });
    assert.equal(r.semHistorico.medido, false);
    assert.equal(r.semHistorico.estimadoSeg, 132);          // 120 s padrão + 10%
    assert.equal(r.comHistorico.medido, true);
    assert.equal(r.comHistorico.baseSeg, 60);
    assert.equal(r.comHistorico.estimadoSeg, 66);           // 60 s + 10%
    assert.equal(r.cabem, 27);                              // 1800 / 66
    assert.equal(r.itens, 27);
    assert.match(r.frase, /27 questões/);
    assert.match(r.frase, /10% de folga/);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Início: o seletor de tempo existe e escolher 15 min muda a frase", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    await pagina.evaluate(() => navigate("inicio"));
    await pagina.selectOption("#tempoDaSessao", "15");
    const frase = await pagina.textContent("#fraseTempoDaSessao");
    assert.match(frase, /15 min ≈ \d+ questões/);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Simulado em treino: pergunta a confiança e mostra o resumo e o tempo por questão no fim", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      const qs = questoesAtivas().filter(q => !ehDissertativa(q) && !aguardaImagem(q)).slice(0, 4);
      state.sessaoAtual = { id: "s1", tipo: "simulado", simuladoId: "x", titulo: "T", itens: qs.map(q => ({ questaoId: q.id })), indiceAtual: 0, respostasSimulado: {}, duracaoMin: 60, finalizado: false, modoAprendizado: true, inicioMs: Date.now(), tsQuestao: Date.now(), tempos: {}, confiancas: {} };
      navigate("simulado-ativo");
      const s = state.sessaoAtual, out = {};
      out.tresBotoes = document.querySelectorAll(".confidence-btn").length;
      const q0 = getQuestao(s.itens[0].questaoId);
      selecionarAlternativaSimulado(q0.alternativas[0].id);
      confirmarRespostaSimulado();                         // sem confiança: recusa
      out.semConfianca = s.respostasSimulado[q0.id];
      confirmarRespostaSimulado("chute");
      out.comChute = s.confiancas[q0.id];
      const tempos = [50, 40, 200, 30], conf = ["certeza", "chute", "duvida", "certeza"];
      s.itens.forEach((it, i) => {
        const q = getQuestao(it.questaoId);
        s.respostasSimulado[it.questaoId] = i % 2 ? q.gabarito : q.alternativas.find(a => a.id !== q.gabarito).id;
        s.confiancas[it.questaoId] = conf[i]; s.tempos[it.questaoId] = tempos[i];
      });
      s.indiceAtual = 0; s.tsQuestao = Date.now();
      finalizarSimulado();
      const salvas = db.respostas.filter(x => x.origem === "simulado").map(x => x.confianca);
      out.salvas = salvas;
      out.html = document.body.innerText;
      out.linhasDeTempo = document.querySelectorAll(".tempo-linha").length;
      out.resultado = db.resultadosSimulados[db.resultadosSimulados.length - 1];
      out.resultado = { confiancas: out.resultado.confiancas };
      return out;
    });
    assert.equal(r.tresBotoes, 3);
    assert.equal(r.semConfianca, undefined);
    assert.equal(r.comChute, "chute");
    assert.deepEqual(r.salvas, ["certeza", "chute", "duvida", "certeza"]);
    assert.match(r.html, /Sua confiança neste treino/);
    assert.match(r.html, /erro\(s\) com certeza/);
    assert.match(r.html, /Ver o tempo de cada questão/);
    assert.equal(r.linhasDeTempo, 4);
    assert.equal(Object.keys(r.resultado.confiancas).length, 4);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Visual: uma ação principal no Início, avisos recolhidos, selos em detalhes e enunciado 7% menor", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    for(const modo of ["resumido", "estatistico"]){
      await pagina.evaluate(m => {
        const u = usuarioAtual(); u.modoPlataforma = m;
        const q = questoesAtivas().find(x => !ehDissertativa(x) && !aguardaImagem(x));
        // erro com certeza e meta batida: o que antes acendia um segundo botão principal
        for(let i = 0; i < 6; i++) registrarResposta(u.id, q.id, q.alternativas.find(a => a.id !== q.gabarito).id, "certeza", 30, "pratica");
        navigate("inicio");
      }, modo);
      const n = await pagina.evaluate(() => [...document.querySelectorAll(".btn-primary")].filter(b => b.offsetParent).length);
      assert.ok(n <= 1, `modo ${modo}: ${n} botões principais no Início`);
    }
    // avisos: só o título do mais recente enquanto fechado
    await pagina.evaluate(() => {
      db.avisos = [{ id: "av1", titulo: "Simulado na sexta", texto: "TEXTO-LONGO-DO-AVISO", data: hojeISO(), autorNome: "Coordenação", papeis: ["aluno"] }];
      state.avisosAbertos = false; navigate("inicio");
    });
    let corpo = await pagina.evaluate(() => document.body.innerText);
    assert.match(corpo, /Avisos da coordenação/);
    assert.match(corpo, /Simulado na sexta/);
    assert.doesNotMatch(corpo, /TEXTO-LONGO-DO-AVISO/);
    await pagina.evaluate(() => alternarAvisos());
    corpo = await pagina.evaluate(() => document.body.innerText);
    assert.match(corpo, /TEXTO-LONGO-DO-AVISO/);

    // questão: um selo no máximo na linha de cima; contexto em "detalhes"; fonte 7% menor, caixa igual
    const q = await pagina.evaluate(() => {
      const x = questoesAtivas().find(y => y.real && !ehDissertativa(y) && !aguardaImagem(y));
      iniciarSessaoComLista([{ questaoId: x.id }], "pratica");
      const meta = document.querySelector(".qcard > .qcard-meta");
      const en = document.querySelector(".qcard-enunciado");
      const lg = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.22;
      return { selosVisiveis: meta.querySelectorAll(".badge").length, detalhes: !!document.querySelector(".qcard-detalhes"),
        fonte: parseFloat(getComputedStyle(en).fontSize), lg, largura: Math.round(document.querySelector(".qcard").getBoundingClientRect().width) };
    });
    assert.ok(q.selosVisiveis <= 1, "linha de cima com no máximo um selo");
    assert.ok(Math.abs(q.fonte / q.lg - 0.93) < 0.005, `enunciado = 93% de --fs-lg (deu ${q.fonte / q.lg})`);
    assert.ok(q.largura <= 814 && q.largura >= 700, "a caixa mantém a largura");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
