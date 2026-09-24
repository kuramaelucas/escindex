/* O aplicativo instalável: manifesto válido e, depois de uma visita com
   internet, a plataforma abre sem internet. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, srv;
before(async () => { navegador = await chromium.launch(); srv = await subirServidor(); });
after(async () => { await navegador?.close(); await srv?.fechar(); });

test("o manifesto aponta para ícones que existem", async () => {
  const resp = await fetch(srv.url + "manifest.webmanifest");
  const m = await resp.json();
  assert.equal(m.short_name, "Esc");
  for(const ic of m.icons){
    const r = await fetch(srv.url + ic.src);
    assert.equal(r.status, 200, "ícone faltando: " + ic.src);
  }
});

test("depois de uma visita com internet, a plataforma abre sem internet", async () => {
  const contexto = await navegador.newContext();
  await contexto.route(/supabase\.co|fonts\.g/, r => r.abort());
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(srv.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db);
  // espera o service worker assumir a página e guardar os arquivos dela
  await pagina.evaluate(() => navigator.serviceWorker.ready);
  await pagina.reload();
  await pagina.waitForFunction(() => !!navigator.serviceWorker.controller && typeof db !== "undefined" && db);
  await contexto.setOffline(true);
  await pagina.reload();
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && db.questoes.length > 500, null, { timeout: 15000 });
  assert.ok((await pagina.evaluate(() => document.getElementById("app").innerText.length)) > 50);
  assert.deepEqual(erros, []);
  await contexto.close();
});
