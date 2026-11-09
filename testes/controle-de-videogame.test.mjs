/* Controle de videogame (Gamepad API, codigo/06d): as setas rolam a tela, os botões da direita escolhem
   alternativa e confiança, e os rótulos de equivalência só aparecem com um controle conectado.
   O controle é de mentira: navigator.getGamepads devolve um objeto que o teste aperta e solta. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); });

/* botões do mapeamento "standard": 0 baixo, 1 direita, 2 esquerda, 3 cima, 4 L1, 5 R1, 12–15 setas */
const BOTAO = { baixo:0, direita:1, esquerda:2, cima:3, l1:4, r1:5, setaCima:12, setaBaixo:13, setaEsq:14, setaDir:15 };

async function abrirPagina(contexto) {
  await contexto.addInitScript(() => {
    window.__pad = { index:0, id:"Controle de teste", connected:true, mapping:"standard", axes:[0,0,0,0],
      buttons:Array.from({length:17}, () => ({ pressed:false, value:0 })) };
    window.__padLigado = false;
    navigator.getGamepads = () => [window.__padLigado ? window.__pad : null, null, null, null];
  });
  const pagina = await contexto.newPage();
  await pagina.goto(semNuvem.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return pagina;
}
const ligar = pagina => pagina.evaluate(() => { window.__padLigado = true; window.dispatchEvent(new Event("gamepadconnected")); }).then(() => pagina.waitForTimeout(150));
/* aperta e solta, dando um quadro de animação entre os dois para o laço enxergar a mudança */
async function apertar(pagina, botao) {
  await pagina.evaluate(b => { window.__pad.buttons[b].pressed = true; }, botao);
  await pagina.waitForTimeout(80);
  await pagina.evaluate(b => { window.__pad.buttons[b].pressed = false; }, botao);
  await pagina.waitForTimeout(80);
}

test("os rótulos dos botões só aparecem com controle conectado, na questão e na confiança", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1200, height: 900 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await abrirPagina(contexto);
    await pagina.evaluate(() => { fazerLogin("aluno@esc.demo", "aluno123"); fecharModal(); iniciarSessaoRecomendada(); });
    const visiveis = () => pagina.evaluate(() => [...document.querySelectorAll(".dica-controle")].filter(e => getComputedStyle(e).display !== "none").map(e => getComputedStyle(e, "::before").content.replace(/"/g, "")));
    assert.deepEqual(await visiveis(), [], "sem controle, nenhum rótulo");
    await ligar(pagina);
    await pagina.waitForFunction(() => document.body.classList.contains("com-controle"));
    const alts = await visiveis();
    assert.deepEqual(alts.slice(0, 4), ["▲", "◀", "▶", "▼"], "A cima, B esquerda, C direita, D baixo");
    // com a alternativa marcada, ▲ ◀ ▼ viram a confiança (chute, certeza, dúvida)
    await apertar(pagina, BOTAO.direita);
    const confirmando = await pagina.evaluate(() => [...document.querySelectorAll(".confidence-btn")].map(b => b.textContent.replace(/\s+/g, " ").trim() + " " + getComputedStyle(b.querySelector(".dica-controle"), "::before").content.replace(/"/g, "")));
    assert.match(confirmando[0], /Certeza.*◀/);
    assert.match(confirmando[1], /dúvida.*▼/);
    assert.match(confirmando[2], /Chute.*▲/);
    assert.match(await pagina.evaluate(() => document.querySelector(".dica-controle-linha").textContent), /L1/);
    // controle desconectado: os rótulos somem
    await pagina.evaluate(() => { window.__padLigado = false; window.dispatchEvent(new Event("gamepaddisconnected")); });
    await pagina.waitForFunction(() => !document.body.classList.contains("com-controle"));
    assert.deepEqual(await visiveis(), []);
  } finally { await contexto.close(); }
});

test("botões da direita escolhem a alternativa, e esquerda / baixo / cima dão a confiança", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1200, height: 900 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await abrirPagina(contexto);
    await pagina.evaluate(() => { fazerLogin("aluno@esc.demo", "aluno123"); fecharModal(); iniciarSessaoRecomendada(); });
    await ligar(pagina);
    const marcada = () => pagina.evaluate(() => { const s = state.sessaoAtual; return marcadaDaQuestao(s.itens[s.indiceAtual].questaoId); });
    // botão de baixo = D; depois L1 desmarca e o de cima (A) volta a escolher
    await apertar(pagina, BOTAO.baixo);
    assert.equal(await marcada(), "D");
    await apertar(pagina, BOTAO.direita);
    assert.equal(await marcada(), "C", "C ainda troca a alternativa com algo marcado");
    await apertar(pagina, BOTAO.l1);
    assert.equal(await marcada(), null, "L1 desmarca");
    await apertar(pagina, BOTAO.cima);
    assert.equal(await marcada(), "A");
    // marcar não é responder: nada foi gravado até a confiança
    assert.equal(await pagina.evaluate(() => respostaDoIndice(state.sessaoAtual, 0) || null), null);
    // esquerda = certeza
    await apertar(pagina, BOTAO.esquerda);
    const resp = await pagina.evaluate(() => { const r = respostaDoIndice(state.sessaoAtual, 0); return r && { alt: r.alternativaEscolhida, confianca: r.confianca }; });
    assert.deepEqual(resp, { alt: "A", confianca: "certeza" });
  } finally { await contexto.close(); }
});

test("cima = chute e baixo = dúvida; R1 só vale se a questão tem alternativa E", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1200, height: 900 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await abrirPagina(contexto);
    await pagina.evaluate(() => { fazerLogin("aluno@esc.demo", "aluno123"); fecharModal(); iniciarSessaoRecomendada(); });
    await ligar(pagina);
    const confianca = () => pagina.evaluate(() => { const r = respostaDoIndice(state.sessaoAtual, state.sessaoAtual.indiceAtual); return r && r.confianca; });
    await apertar(pagina, BOTAO.direita);   // marca C
    await apertar(pagina, BOTAO.cima);
    assert.equal(await confianca(), "chute");
    // na questão seguinte: baixo marca D e, em seguida, baixo de novo confirma como dúvida
    await pagina.evaluate(() => proximaQuestaoSessao());
    const temE = await pagina.evaluate(() => { const s = state.sessaoAtual; return getQuestao(s.itens[s.indiceAtual].questaoId).alternativas.some(a => a.id === "E"); });
    await apertar(pagina, BOTAO.r1);
    const aposR1 = await pagina.evaluate(() => { const s = state.sessaoAtual; return marcadaDaQuestao(s.itens[s.indiceAtual].questaoId); });
    assert.equal(aposR1, temE ? "E" : null, "R1 é a alternativa E; sem E, não faz nada");
    await apertar(pagina, BOTAO.baixo);
    if (!temE) {
      assert.equal(await pagina.evaluate(() => { const s = state.sessaoAtual; return marcadaDaQuestao(s.itens[s.indiceAtual].questaoId); }), "D");
      await apertar(pagina, BOTAO.baixo);
      assert.equal(await confianca(), "duvida");
    }
  } finally { await contexto.close(); }
});

test("seta para baixo rola a tela, seta para cima volta, e esquerda / direita trocam de questão", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1000, height: 500 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await abrirPagina(contexto);
    await pagina.evaluate(() => { fazerLogin("aluno@esc.demo", "aluno123"); fecharModal(); iniciarSessaoRecomendada(); });
    await ligar(pagina);
    assert.ok(await pagina.evaluate(() => document.documentElement.scrollHeight > innerHeight + 200), "a questão é mais alta que a tela");
    await pagina.evaluate(() => { window.__pad.buttons[13].pressed = true; });
    await pagina.waitForTimeout(400);
    await pagina.evaluate(() => { window.__pad.buttons[13].pressed = false; });
    const desceu = await pagina.evaluate(() => scrollY);
    assert.ok(desceu > 100, "rolou para baixo (" + desceu + ")");
    await pagina.evaluate(() => { window.__pad.buttons[12].pressed = true; });
    await pagina.waitForTimeout(400);
    await pagina.evaluate(() => { window.__pad.buttons[12].pressed = false; });
    assert.ok(await pagina.evaluate(() => scrollY) < desceu, "voltou para cima");
    // direita avança e esquerda volta, como as setas do teclado
    const indice = () => pagina.evaluate(() => state.sessaoAtual.indiceAtual);
    await apertar(pagina, BOTAO.setaDir);
    assert.equal(await indice(), 1);
    await apertar(pagina, BOTAO.setaEsq);
    assert.equal(await indice(), 0);
  } finally { await contexto.close(); }
});

test("com uma janela aberta o controle só rola: não responde por trás dela", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1200, height: 900 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await abrirPagina(contexto);
    await pagina.evaluate(() => { fazerLogin("aluno@esc.demo", "aluno123"); fecharModal(); iniciarSessaoRecomendada(); });
    await ligar(pagina);
    await pagina.evaluate(() => abrirModalTitulado("Aviso", "<p>texto</p>"));
    await apertar(pagina, BOTAO.cima);
    assert.equal(await pagina.evaluate(() => { const s = state.sessaoAtual; return marcadaDaQuestao(s.itens[s.indiceAtual].questaoId); }), null);
  } finally { await contexto.close(); }
});

test("a marca do controle muda o desenho dos rótulos (PlayStation △ □ ○ ✕, Xbox Y X B A)", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1200, height: 900 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await abrirPagina(contexto);
    await pagina.evaluate(() => { fazerLogin("aluno@esc.demo", "aluno123"); fecharModal(); iniciarSessaoRecomendada(); });
    const rotulos = () => pagina.evaluate(() => [...document.querySelectorAll(".qcard-alt .dica-controle")].slice(0, 4).map(e => getComputedStyle(e, "::before").content.replace(/"/g, "")));
    await pagina.evaluate(() => { window.__pad.id = "054c-0ce6-Wireless Controller"; });
    await ligar(pagina);
    await pagina.waitForFunction(() => document.body.dataset.marcaControle === "ps");
    assert.deepEqual(await rotulos(), ["△", "□", "○", "✕"]);
    await pagina.evaluate(() => { window.__pad.id = "Xbox 360 Controller (STANDARD GAMEPAD Vendor: 045e)"; });
    await pagina.waitForFunction(() => document.body.dataset.marcaControle === "xbox");
    assert.deepEqual(await rotulos(), ["Y", "X", "B", "A"]);
  } finally { await contexto.close(); }
});

test("depois de responder, o botão de baixo vai para a próxima questão; L2 segurado risca a alternativa; vibra ao responder", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1200, height: 900 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await abrirPagina(contexto);
    await pagina.evaluate(() => {
      window.__vibrou = [];
      window.__pad.vibrationActuator = { playEffect: (t, o) => { window.__vibrou.push(o.duration); return Promise.resolve(); } };
      fazerLogin("aluno@esc.demo", "aluno123"); fecharModal(); iniciarSessaoRecomendada();
    });
    await ligar(pagina);
    const idx = () => pagina.evaluate(() => state.sessaoAtual.indiceAtual);
    // marcar C e riscar com L2 segurado: some a marca e a alternativa fica eliminada
    await apertar(pagina, BOTAO.direita);
    await pagina.evaluate(() => { window.__pad.buttons[6].pressed = true; });
    await pagina.waitForTimeout(100);
    assert.equal(await pagina.evaluate(() => document.body.classList.contains("controle-riscando")), true);
    await apertar(pagina, BOTAO.direita);   // L2 segurado: C é riscada (e a marca some), não marcada
    await pagina.evaluate(() => { window.__pad.buttons[6].pressed = false; });
    await pagina.waitForTimeout(100);
    assert.equal(await pagina.evaluate(() => document.body.classList.contains("controle-riscando")), false);
    const riscou = await pagina.evaluate(() => { const s = state.sessaoAtual; const id = s.itens[s.indiceAtual].questaoId; return { marcada: marcadaDaQuestao(id), eliminadas: (s.eliminadas || {})[id] || [] }; });
    assert.equal(riscou.marcada, null);
    assert.deepEqual(riscou.eliminadas, ["C"]);
    // responder (A + certeza) vibra; em seguida o botão de baixo avança
    await apertar(pagina, BOTAO.cima);
    await apertar(pagina, BOTAO.esquerda);
    assert.equal(await pagina.evaluate(() => window.__vibrou.length), 1, "vibrou uma vez ao responder");
    assert.equal(await idx(), 0);
    await apertar(pagina, BOTAO.baixo);
    assert.equal(await idx(), 1, "respondida: baixo = próxima");
  } finally { await contexto.close(); }
});

test("flashcards: direita vira, e esquerda / baixo / cima dão sabia / quase / não lembrei", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1200, height: 900 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await abrirPagina(contexto);
    await pagina.evaluate(() => { fazerLogin("aluno@esc.demo", "aluno123"); fecharModal(); iniciarSessaoFlashcards(); });
    await ligar(pagina);
    const sessao = () => pagina.evaluate(() => ({ rota: state.route, indice: state.sessaoFlash && state.sessaoFlash.indice, virado: state.sessaoFlash && state.sessaoFlash.virado, notas: state.sessaoFlash ? state.sessaoFlash.notas.map(n => n.nota) : [] }));
    assert.equal((await sessao()).rota, "flashcards");
    await apertar(pagina, BOTAO.esquerda);   // sem virar, a nota não vale
    assert.deepEqual((await sessao()).notas, []);
    await apertar(pagina, BOTAO.direita);
    assert.equal((await sessao()).virado, true);
    await apertar(pagina, BOTAO.esquerda);
    let r = await sessao();
    assert.deepEqual(r.notas, ["sabia"]);
    assert.equal(r.virado, false);
    await apertar(pagina, BOTAO.direita); await apertar(pagina, BOTAO.baixo);
    await apertar(pagina, BOTAO.direita); await apertar(pagina, BOTAO.cima);
    assert.deepEqual((await sessao()).notas, ["sabia", "quase", "naolembrei"]);
  } finally { await contexto.close(); }
});

test("a opção do Perfil desliga o controle, e o analógico direito rola mais depressa que a seta", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1000, height: 500 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await abrirPagina(contexto);
    await pagina.evaluate(() => { fazerLogin("aluno@esc.demo", "aluno123"); fecharModal(); iniciarSessaoRecomendada(); });
    await ligar(pagina);
    const rolar = async (aplicar, limpar) => {
      await pagina.evaluate(() => scrollTo(0, 0));
      await pagina.evaluate(aplicar); await pagina.waitForTimeout(300); await pagina.evaluate(limpar);
      return pagina.evaluate(() => scrollY);
    };
    const seta = await rolar(() => { window.__pad.buttons[13].pressed = true; }, () => { window.__pad.buttons[13].pressed = false; });
    const analogico = await rolar(() => { window.__pad.axes[3] = 1; }, () => { window.__pad.axes[3] = 0; });
    assert.ok(analogico > seta * 1.5, `analógico direito (${analogico}) mais rápido que a seta (${seta})`);
    // desligado: rótulos somem e o botão não responde
    await pagina.evaluate(() => controleSalvarConfig({ ativo: false }));
    assert.equal(await pagina.evaluate(() => document.body.classList.contains("com-controle")), false);
    await apertar(pagina, BOTAO.cima);
    assert.equal(await pagina.evaluate(() => { const s = state.sessaoAtual; return marcadaDaQuestao(s.itens[s.indiceAtual].questaoId); }), null);
    await pagina.evaluate(() => controleSalvarConfig({ ativo: true }));
    await apertar(pagina, BOTAO.cima);
    assert.equal(await pagina.evaluate(() => { const s = state.sessaoAtual; return marcadaDaQuestao(s.itens[s.indiceAtual].questaoId); }), "A");
    // o cartão do Perfil existe e reflete a escolha
    assert.match(await pagina.evaluate(() => renderCardControle()), /Usar o controle quando conectado/);
  } finally { await contexto.close(); }
});
