/* Ordenar tabela pelo título da coluna, numerar a lista de cartões, Tab na última linha e ações em lote nos cartões. */
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

test("ordenarPorColuna: texto começa A→Z, número começa do maior, vazio sempre no fim, segundo clique inverte", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      const gente = [{ n: "Bia", q: 5, u: "" }, { n: "ana", q: 20, u: "2026-01-02" }, { n: "Caio", q: 9, u: "2026-03-01" }];
      const v = { n: x => x.n, q: x => x.q, u: x => x.u };
      const nomes = () => ordenarPorColuna(gente, "t", v).map(x => x.n).join(",");
      const out = {};
      clicarOrdemDaTabela("t", "n", "texto"); out.nome1 = nomes();
      clicarOrdemDaTabela("t", "n", "texto"); out.nome2 = nomes();
      clicarOrdemDaTabela("t", "q", "numero"); out.q1 = nomes();
      clicarOrdemDaTabela("t", "q", "numero"); out.q2 = nomes();
      clicarOrdemDaTabela("t", "u", "numero"); out.u1 = nomes();
      clicarOrdemDaTabela("t", "u", "numero"); out.u2 = nomes();
      return out;
    });
    assert.deepEqual(r, { nome1: "ana,Bia,Caio", nome2: "Caio,Bia,ana", q1: "ana,Caio,Bia", q2: "Bia,Caio,ana", u1: "Caio,ana,Bia", u2: "ana,Caio,Bia" });
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Painel da Turma: clicar em 'Aluno' ordena por nome; clicar de novo inverte", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    await pagina.evaluate(() => {
      fazerLogin("admin@esc.demo", "admin123"); fecharModal();
      ["Zélia", "Ana", "Mário"].forEach((n, i) => db.usuarios.push({ id: "u-ord-" + i, nome: n, email: n + "@x.com", papel: "aluno", status: "aprovado", anoFaculdade: "6º ano", criadoEm: hojeISO() }));
      filtrosPainelTurma().ano = "todos"; filtrosPainelTurma().aba = "painel"; guardarSecaoPainel("pessoas", true);
      navigate("painel-turma");
    });
    const nomes = () => pagina.$$eval("table:has(.th-ordem) tbody tr td:first-child strong", els => els.map(e => e.textContent));
    await pagina.click('.th-ordem:text-matches("^Aluno")');
    const a = await nomes();
    assert.ok(a.length >= 3);
    assert.deepEqual(a, [...a].sort((x, y) => x.localeCompare(y, "pt-BR", { sensitivity: "base" })));
    await pagina.click('.th-ordem:text-matches("^Aluno")');
    assert.deepEqual(await nomes(), [...a].reverse());
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Criar em lista: linhas numeradas, contador e Tab na última linha abre outra", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal(); navigate("flashcards"); abrirCartoesEmLista(); });
    const numeros = () => pagina.$$eval('#listaCartoesLinhas [data-lista="numero"]', e => e.map(x => x.textContent));
    assert.deepEqual(await numeros(), ["1", "2", "3", "4", "5"]);
    await pagina.fill('#listaCartoesLinhas tr:nth-child(1) [data-lista="frente"]', "F1");
    await pagina.fill('#listaCartoesLinhas tr:nth-child(1) [data-lista="verso"]', "V1");
    await pagina.fill('#listaCartoesLinhas tr:nth-child(2) [data-lista="frente"]', "F2");
    assert.match(await pagina.textContent("#listaCartoesContagem"), /1 cartão\(ões\) na lista.*1 linha\(s\) pela metade.*5 linha/);
    await pagina.click('#listaCartoesLinhas tr:nth-child(2) [title="Tirar esta linha"]');
    assert.deepEqual(await numeros(), ["1", "2", "3", "4"]);
    // Tab no verso de uma linha do meio não cria nada; na última, cria e foca a frente nova
    await pagina.focus('#listaCartoesLinhas tr:nth-child(1) [data-lista="verso"]');
    await pagina.keyboard.press("Tab");
    assert.equal((await numeros()).length, 4);
    await pagina.focus('#listaCartoesLinhas tr:last-child [data-lista="verso"]');
    await pagina.keyboard.press("Tab");
    assert.equal((await numeros()).length, 5);
    assert.equal(await pagina.evaluate(() => document.activeElement === document.querySelector('#listaCartoesLinhas tr:last-child [data-lista="frente"]')), true);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Meus cartões: marcar vários, sugerir à equipe e arquivar de uma vez", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const ids = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      const ids = ["a", "b", "c", "d"].map(l => { const c = { id: uid("fc"), assuntoId: "", frente: "Frente " + l, verso: "V", origem: "aluno", usuarioId: u.id, status: "ativo", criadoPor: u.id, criadoEm: hojeISO() }; db.flashcards.push(c); return c.id; });
      saveState(); navigate("flashcards");
      return ids;
    });
    await pagina.check(`[data-cartao-sel="${ids[0]}"]`);
    await pagina.check(`[data-cartao-sel="${ids[1]}"]`);
    assert.match(await pagina.textContent("#barraSelecaoCartoes"), /2 selecionado/);
    await pagina.click('#barraSelecaoCartoes >> text=Sugerir à equipe');
    const r1 = await pagina.evaluate(ids => ids.map(id => !!db.flashcards.find(c => c.id === id).sugeridoParaEquipe), ids);
    assert.deepEqual(r1, [true, true, false, false]);
    await pagina.check(`[data-cartao-sel="${ids[2]}"]`);
    await pagina.check(`[data-cartao-sel="${ids[3]}"]`);
    await pagina.click('#barraSelecaoCartoes >> text=Arquivar selecionados');
    await pagina.click('.modal >> text=/^Arquivar 2$/');
    const r2 = await pagina.evaluate(ids => ids.map(id => db.flashcards.find(c => c.id === id).status), ids);
    assert.deepEqual(r2, ["ativo", "ativo", "arquivado", "arquivado"]);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
