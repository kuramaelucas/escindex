/* Carga inicial, fase 1 (docs/PROJETO-CARGA-INICIAL.md): a moldura aparece antes
   de o conteúdo de dados/ chegar; ações pedidas nesse intervalo esperam o banco
   e acontecem quando ele fica pronto; nada quebra com os dados chegando devagar. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(); servidor = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

/* Segura os arquivos de conteúdo pesados até liberar() ser chamada. */
async function abrirComDadosAtrasados(){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  let liberar; const portao = new Promise(r => { liberar = r; });
  await contexto.route(/\/dados\/(prova|banco|reposicoes|flashcards|simulados|provas-inativas|demonstracao)[^/]*\.js/, async rota => { await portao; await rota.continue(); });
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(servidor.url + "index.html", { waitUntil: "domcontentloaded" });
  return { pagina, contexto, erros, liberar };
}
const bancoPronto = pagina => pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");

test("a landing aparece sem o banco; ao chegar o conteúdo, a tela real a substitui", async () => {
  const { pagina, contexto, erros, liberar } = await abrirComDadosAtrasados();
  try {
    await pagina.waitForSelector(".public-nav");
    assert.equal(await pagina.evaluate(() => db), null, "ainda sem banco");
    assert.match(await pagina.locator("#app").innerText(), /Solicitar cadastro/);
    liberar(); await bancoPronto(pagina);
    assert.match(await pagina.locator("#app").innerText(), /\d[\d.]* questões/, "com o banco, a landing traz o número de questões");
    assert.deepEqual(erros, []);
  } finally { liberar(); await contexto.close(); }
});

test("'Ver como aluno' e 'Entrar' clicados na moldura esperam o banco e valem depois", async () => {
  const a = await abrirComDadosAtrasados();
  try {
    await a.pagina.waitForSelector(".public-nav");
    await a.pagina.getByText("Ver como aluno").click();
    assert.equal(await a.pagina.evaluate(() => db), null);
    a.liberar(); await bancoPronto(a.pagina);
    await a.pagina.waitForFunction(() => !!usuarioAtual());
    assert.equal(await a.pagina.evaluate(() => state.route), "inicio");
    assert.deepEqual(a.erros, []);
  } finally { a.liberar(); await a.contexto.close(); }

  const b = await abrirComDadosAtrasados();
  try {
    await b.pagina.waitForSelector(".public-nav");
    await b.pagina.getByRole("button", { name: "Entrar" }).first().click();
    assert.match(await b.pagina.locator("#app").innerText(), /Carregando/, "outra rota mostra o carregando");
    b.liberar(); await bancoPronto(b.pagina);
    assert.equal(await b.pagina.evaluate(() => state.route), "login");
    assert.deepEqual(b.erros, []);
  } finally { b.liberar(); await b.contexto.close(); }
});

test("arquivo de conteúdo que falha não trava a carga", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  await contexto.route(/\/dados\/prova-usp-2026\.js/, r => r.abort());
  const pagina = await contexto.newPage();
  try {
    await pagina.goto(servidor.url + "index.html");
    await bancoPronto(pagina);
    assert.ok(await pagina.evaluate(() => ESC_FALTOU.includes("dados/prova-usp-2026.js")));
  } finally { await contexto.close(); }
});
