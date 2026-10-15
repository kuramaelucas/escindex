/* Simulado: esconder cronômetro, pausa ao sair da aba, confirmação e barra no modo aprendizado. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(); servidor = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(servidor.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto, erros };
}

test("Simulado: esconder cronômetro, pausar fora da aba, confirmar no aprendizado e barra com ✓/✕", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const qs = questoesAtivas().filter(q => !ehDissertativa(q) && !aguardaImagem(q)).slice(0, 3);
      state.sessaoAtual = { id: "s1", tipo: "simulado", simuladoId: "x", titulo: "T", itens: qs.map(q => ({ questaoId: q.id })), indiceAtual: 0, respostasSimulado: {}, duracaoMin: 60, finalizado: false, modoAprendizado: false, escolhaPendente: {}, ocultarTimer: false, pausadoDesde: null, inicioMs: Date.now() - 600000, tsQuestao: Date.now(), tempos: {} };
      navigate("simulado-ativo");
      const out = {};
      // esconder o cronômetro
      alternarOcultarTimerSimulado();
      out.oculto = document.getElementById("cronometroSimulado").style.display === "none";
      alternarOcultarTimerSimulado();
      // pausa: o tempo decorrido não anda enquanto a página está fora
      const s = state.sessaoAtual;
      pausarCronometroSimulado();
      s.pausadoDesde -= 120000;                      // "ficou 2 min fora"
      const decPausado = tempoDecorridoSimulado();
      retomarCronometroSimulado();
      // 10 min de prova - 2 min fora = 8 min; o relógio parado marca o mesmo valor que o relógio retomado
      const depoisDeVoltar = tempoDecorridoSimulado();
      out.pausaDescontada = decPausado === 480 && Math.abs(depoisDeVoltar - 480) <= 1;
      // modo aprendizado: escolher não responde; confirmar responde e trava
      alternarModoAprendizadoSimulado();
      const q = getQuestao(s.itens[0].questaoId);
      const errada = q.alternativas.find(a => a.id !== q.gabarito).id;
      selecionarAlternativaSimulado(errada);
      out.antesDeConfirmar = s.respostasSimulado[q.id];
      out.botaoConfirmar = /Confirmar resposta/.test(document.body.innerHTML);
      confirmarRespostaSimulado();
      out.depois = s.respostasSimulado[q.id];
      selecionarAlternativaSimulado(q.gabarito);
      out.travou = s.respostasSimulado[q.id] === errada;
      out.pillErrou = !!document.querySelector("#mapaDoSimulado .mapa-pill.errou");
      return out;
    });
    assert.ok(r.oculto);
    assert.ok(r.pausaDescontada);
    assert.equal(r.antesDeConfirmar, undefined);
    assert.ok(r.botaoConfirmar);
    assert.ok(r.depois);
    assert.ok(r.travou);
    assert.ok(r.pillErrou);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
