/* ==========================================================================
   TESTE DE FUMAÇA — "a plataforma abre e as telas não quebram"
   ==========================================================================
   Não testa regra por regra: abre a plataforma num Chromium de verdade, entra
   com cada papel, passa por TODAS as telas do menu e responde uma questão,
   falhando se aparecer qualquer erro de JavaScript no caminho. É o tipo de
   defeito que mais escapa — uma tela que ninguém abriu depois da mudança — e
   o mais barato de pegar automaticamente.

   Para rodar:  npm install  e depois  npm test
   (no GitHub, roda sozinho a cada envio — ver .github/workflows/testes.yml)

   A nuvem nunca é chamada de verdade: o endereço do Supabase é bloqueado, e
   os testes de administrador usam o servidor com semNuvem (ver servidor.mjs).
   ========================================================================== */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { chromium } from "playwright";
import { subirServidor, RAIZ } from "./servidor.mjs";

let navegador, comNuvem, semNuvem;

before(async () => {
  navegador = await chromium.launch();
  comNuvem = await subirServidor();
  semNuvem = await subirServidor({ semNuvem: true });
});
after(async () => {
  await navegador?.close();
  await comNuvem?.fechar();
  await semNuvem?.fechar();
});

/* Abre uma aba nova (banco zerado) e junta todo erro que aparecer nela. */
async function abrir(base, { largura = 1280 } = {}){
  const contexto = await navegador.newContext({ viewport: { width: largura, height: 900 }, serviceWorkers: "block" });
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push("pageerror: " + e.message));
  pagina.on("console", m => {
    if(m.type() !== "error") return;
    const t = m.text();
    // a nuvem bloqueada de propósito gera "Failed to load resource" — esperado
    if(/Failed to load resource|ERR_FAILED|ERR_BLOCKED|net::/.test(t)) return;
    erros.push("console: " + t);
  });
  await contexto.route(/supabase\.co/, r => r.abort());
  await pagina.goto(base + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && document.getElementById("app").innerHTML.length > 100);
  return { pagina, contexto, erros };
}

async function visitarTodasAsTelas(pagina, erros){
  const rotas = await pagina.evaluate(() => {
    const u = usuarioAtual();
    return navItemsParaPapel(u.papel).map(i => i.id).concat(["perfil", "livro-ouro"]);
  });
  assert.ok(rotas.length > 3, "o menu deveria ter várias telas");
  for(const rota of rotas){
    await pagina.evaluate(r => navigate(r), rota);
    const tamanho = await pagina.evaluate(() => document.getElementById("app").innerText.trim().length);
    assert.ok(tamanho > 20, `a tela "${rota}" abriu vazia`);
    assert.deepEqual(erros, [], `erro ao abrir a tela "${rota}"`);
  }
  return rotas;
}

async function entrarComSenha(pagina, email, senha){
  await pagina.evaluate(() => navigate("login"));
  await pagina.fill("#loginId", email);
  await pagina.fill("#loginSenha", senha);
  await pagina.press("#loginSenha", "Enter");
  await pagina.waitForFunction(() => !!usuarioAtual());
  // o primeiro acesso mostra as boas-vindas; aqui interessa o resto
  await pagina.evaluate(() => { const u = usuarioAtual(); if(u && !u.boasVindasEm) u.boasVindasEm = hojeISO(); });
}

test("abre sem erro, com o conteúdo da pasta dados/ carregado", async () => {
  const { pagina, contexto, erros } = await abrir(comNuvem.url);
  const n = await pagina.evaluate(() => ({ questoes: db.questoes.length, cartoes: db.flashcards.length, assuntos: db.taxonomia.assuntos.length }));
  assert.ok(n.questoes >= 500, "questões carregadas: " + n.questoes);
  assert.ok(n.cartoes >= 400, "cartões carregados: " + n.cartoes);
  assert.ok(n.assuntos >= 200, "assuntos carregados: " + n.assuntos);
  assert.equal(await pagina.locator(".aviso-dados").count(), 0, "não deveria aparecer a tarja de conteúdo faltando");
  assert.deepEqual(erros, []);
  await contexto.close();
});

test("o celular pode dar zoom na página", async () => {
  const { pagina, contexto } = await abrir(comNuvem.url);
  const viewport = await pagina.getAttribute('meta[name="viewport"]', "content");
  assert.doesNotMatch(viewport, /maximum-scale|user-scalable\s*=\s*no/);
  await contexto.close();
});

test("aluno de teste: todas as telas abrem e uma questão é respondida", async () => {
  const { pagina, contexto, erros } = await abrir(comNuvem.url);
  await pagina.evaluate(() => fazerLoginDemo("aluno"));
  await pagina.evaluate(() => { const u = usuarioAtual(); if(!u.boasVindasEm) u.boasVindasEm = hojeISO(); });
  await visitarTodasAsTelas(pagina, erros);

  // responde uma questão pela tela, do jeito que o aluno faz
  const antes = await pagina.evaluate(() => db.respostas.length);
  await pagina.evaluate(() => { navigate("estudar"); montarSessaoRecomendadaDeHoje(); });
  await pagina.locator('[onclick^="selecionarAlternativa("]').first().click();
  await pagina.locator(".confidence-btn", { hasText: "Certeza" }).click();
  const depois = await pagina.evaluate(() => db.respostas.length);
  assert.equal(depois, antes + 1, "a resposta deveria ter sido registrada");
  assert.deepEqual(erros, []);
  await contexto.close();
});

test("telas no celular também abrem sem erro", async () => {
  const { pagina, contexto, erros } = await abrir(comNuvem.url, { largura: 390 });
  await pagina.evaluate(() => fazerLoginDemo("aluno"));
  await pagina.evaluate(() => { const u = usuarioAtual(); if(!u.boasVindasEm) u.boasVindasEm = hojeISO(); });
  await visitarTodasAsTelas(pagina, erros);
  const larguraDaPagina = await pagina.evaluate(() => document.documentElement.scrollWidth);
  assert.ok(larguraDaPagina <= 400, "a página não deveria rolar para o lado no celular (largura " + larguraDaPagina + ")");
  await contexto.close();
});

for(const [papel, email, senha] of [
  ["administrador", "admin@esc.demo", "admin123"],
  ["professor", "professor@esc.demo", "prof123"],
  ["residente", "residente@esc.demo", "res123"],
]){
  test(`${papel} (nuvem desligada): todas as telas abrem sem erro`, async () => {
    const { pagina, contexto, erros } = await abrir(semNuvem.url);
    await entrarComSenha(pagina, email, senha);
    await visitarTodasAsTelas(pagina, erros);
    assert.deepEqual(erros, []);
    await contexto.close();
  });
}

test("aberta com dois cliques (file://), a plataforma ainda carrega o conteúdo", async () => {
  const contexto = await navegador.newContext();
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await contexto.route(/supabase\.co/, r => r.abort());
  await pagina.goto(pathToFileURL(path.join(RAIZ, "index.html")).href);
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && db.questoes.length > 0);
  assert.deepEqual(erros, []);
  await contexto.close();
});
