/* Visual retrô (06f): liga e desliga fácil, golpes só onde o gabarito já aparece, texto da questão na fonte normal, convite do primeiro controle uma vez só. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); });

test("visual retrô: liga pelo menu, golpe ao responder, questão na fonte normal e desliga pelo menu", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  try{
    const pagina = await contexto.newPage();
    await pagina.goto(semNuvem.url + "index.html");
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const itemMenu = () => Array.from(document.querySelectorAll(".sidebar .nav-item")).find(n => /Visual (retrô|normal)/.test(n.textContent));
      const antes = itemMenu().textContent.trim();
      itemMenu().click();
      const ligado = document.documentElement.getAttribute("data-retro");
      iniciarSessaoRecomendadaAgora();
      const s = state.sessaoAtual, q = getQuestao(s.itens[s.indiceAtual].questaoId);
      selecionarAlternativa(q.gabarito);
      confirmarResposta("certeza");
      const tela = state.route, golpe = document.getElementById("retroGolpe")?.textContent || "";
      const fonteEnunciado = getComputedStyle(document.querySelector(".qcard-enunciado")).fontFamily;
      const fonteTitulo = getComputedStyle(document.querySelector(".topbar-title")).fontFamily;
      itemMenu().click();
      return { tela, antes, ligado, golpe, fonteEnunciado, fonteTitulo, depois: document.documentElement.getAttribute("data-retro") };
    });
    assert.match(r.antes, /Visual retrô/);
    assert.equal(r.ligado, "1");
    assert.match(r.golpe, /PERFECT/);
    assert.doesNotMatch(r.fonteEnunciado, /Press Start|VT323/);
    assert.match(r.fonteTitulo, /Press Start/);
    assert.equal(r.depois, null);
  } finally { await contexto.close(); }
});

test("Easter egg: o primeiro controle convida para o visual retrô uma vez só", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  try{
    const pagina = await contexto.newPage();
    await pagina.goto(semNuvem.url + "index.html");
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      retroConviteDoControle();
      const convite = /PLAYER 1 READY/.test(document.body.textContent);
      fecharModal(); retroConviteDoControle();
      return { convite, deNovo: /PLAYER 1 READY/.test(document.body.textContent), ligado: retroLigado() };
    });
    assert.ok(r.convite); assert.equal(r.deNovo, false); assert.equal(r.ligado, false);
  } finally { await contexto.close(); }
});
