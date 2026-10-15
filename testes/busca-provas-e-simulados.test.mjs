/* Provas e Simulados: simulado novo de dados/ chega a quem já tinha banco salvo, e a busca. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(); servidor = await subirServidor(); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  await pagina.goto(servidor.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto };
}

test("simulado da pasta dados/ aparece mesmo para quem já tinha o banco salvo sem ele", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno");
      const alvo = SEED_SIMULADOS.find(s => /EPM/.test(s.titulo));
      db.simulados = db.simulados.filter(s => s.id !== alvo.id);   // banco salvo antes do upload
      sincronizarConteudoNovo();
      return { voltou: db.simulados.some(s => s.id === alvo.id), titulo: alvo.titulo };
    });
    assert.ok(r.voltou, "o simulado enviado deveria voltar ao banco salvo");
  } finally { await contexto.close(); }
});

test("a busca acha prova e simulado por Unifesp ou EPM, nas duas abas", async () => {
  const { pagina, contexto } = await abrir();
  try {
    await pagina.evaluate(() => { fazerLoginDemo("aluno"); navigate("provas-antigas"); });
    for (const termo of ["unifesp", "EPM"]) {
      await pagina.fill("#buscaProvasCampo", termo);
      const cartoes = await pagina.locator("#provasConteudo .prova-card").count();
      assert.ok(cartoes > 0, `"${termo}" deveria achar provas`);
      const textoProvas = await pagina.innerText("#provasConteudo");
      assert.match(textoProvas, /Simulado EPM 2026/, `"${termo}" deveria listar o simulado na aba de provas`);
      await pagina.evaluate(() => mudarAbaProvas("simulados"));
      assert.match(await pagina.inputValue("#buscaProvasCampo"), new RegExp(termo, "i"));
      assert.match(await pagina.innerText("#provasConteudo"), /Simulado EPM 2026/);
      assert.doesNotMatch(await pagina.innerText("#provasConteudo"), /Revisão — Obstetrícia/);
      await pagina.evaluate(() => mudarAbaProvas("antigas"));
    }
    // o campo não perde o foco enquanto se digita
    await pagina.fill("#buscaProvasCampo", "");
    await pagina.focus("#buscaProvasCampo");
    await pagina.keyboard.type("usp");
    assert.equal(await pagina.evaluate(() => document.activeElement.id), "buscaProvasCampo");
    await pagina.fill("#buscaProvasCampo", "zzzxxx");
    assert.match(await pagina.innerText("#provasConteudo"), /Nenhuma prova encontrada/);
  } finally { await contexto.close(); }
});
