/* Tirar dúvida com IA: o botão da IA só libera depois de copiar; a IA escolhida e a cadastrada pelo aluno. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(); servidor = await subirServidor(); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

test("botão da IA nasce desativado, libera ao copiar e abre a IA escolhida (ou a cadastrada)", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block", permissions: ["clipboard-read", "clipboard-write"] });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await contexto.newPage();
    await pagina.goto(servidor.url + "index.html");
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof abrirPromptDuvida === "function");
    await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal(); abrirPromptDuvida(questoesParaEstudo(usuarioAtual().id).find(q => !ehDissertativa(q)).id); });
    assert.equal(await pagina.isDisabled("#botaoAbrirIa"), true);
    assert.match(await pagina.innerText("#botaoAbrirIa"), /ChatGPT/);
    await pagina.click("text=1. Copiar prompt");
    assert.equal(await pagina.isEnabled("#botaoAbrirIa"), true);
    // a dúvida específica entra no prompt, depois da questão, e invalida a cópia anterior
    await pagina.fill("#duvidaEspecifica", "Por que não é a C?");
    assert.equal(await pagina.isDisabled("#botaoAbrirIa"), true);
    const prompt = await pagina.inputValue("#promptDuvidaTexto");
    assert.ok(prompt.indexOf("MINHA DÚVIDA ESPECÍFICA") > prompt.indexOf("FIM DA QUESTÃO"));
    assert.match(prompt, /Por que não é a C\?/);
    await pagina.fill("#duvidaEspecifica", "");
    assert.doesNotMatch(await pagina.inputValue("#promptDuvidaTexto"), /MINHA DÚVIDA/);
    await pagina.click("text=1. Copiar prompt");
    assert.equal(await pagina.isEnabled("#botaoAbrirIa"), true);
    await pagina.selectOption("#iaDoPrompt", "gemini");
    assert.match(await pagina.innerText("#botaoAbrirIa"), /Gemini/);
    const r = await pagina.evaluate(() => {
      const u = usuarioAtual();
      const ruim = urlDeIaValida("javascript:alert(1)"), boa = urlDeIaValida(" https://chat.deepseek.com/ ");
      u.iaPropria = { nome: "DeepSeek", url: "https://chat.deepseek.com/" }; u.iaPreferida = "propria";
      return { ruim, boa, escolhida: iaEscolhidaDoUsuario(u).nome, opcoes: opcoesDeIa(u).length };
    });
    assert.equal(r.ruim, null);
    assert.equal(r.boa, "https://chat.deepseek.com/");
    assert.equal(r.escolhida, "DeepSeek");
    assert.equal(r.opcoes, 5);
  } finally { await contexto.close(); }
});
