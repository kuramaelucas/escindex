/* Telas de lista e de análise enxutas: filtros do Banco recolhidos com chips,
   e seções secundárias do Meu Desempenho fechadas (com o resumo à vista). */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(semNuvem.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto, erros };
}

test("Banco: filtros começam recolhidos, a busca fica à vista, chip mostra o filtro ligado e o x o desliga", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLogin("admin@esc.demo", "admin123"); fecharModal();
      navigate("banco-questoes");
      const q = s => document.querySelector("#conteudoPagina " + s);
      const inicio = { selects: document.querySelectorAll("#conteudoPagina .filtros-corpo select").length, busca: !!q("#buscaBancoInput"), chips: document.querySelectorAll(".chip-filtro").length };
      const total = document.querySelectorAll("#conteudoPagina tbody tr").length;
      mudarFiltroBanco("status", "anulada");
      const chip = document.querySelector(".chip-filtro")?.textContent.trim();
      const botao = document.querySelector(".filtros-barra .btn")?.textContent.replace(/\s+/g, " ").trim();
      alternarFiltrosRecolhiveis("banco-filtros");
      const aberto = document.querySelectorAll("#conteudoPagina .filtros-corpo select").length;
      document.querySelector(".chip-x").click();
      return { inicio, total, chip, botao, aberto, depois: document.querySelectorAll(".chip-filtro").length, aindaAberto: document.querySelectorAll("#conteudoPagina .filtros-corpo select").length };
    });
    assert.deepEqual(r.inicio, { selects: 0, busca: true, chips: 0 });
    assert.ok(r.total > 0);
    assert.equal(r.chip, "Anulada");
    assert.match(r.botao, /Filtros \(1 ativo\)/);
    assert.ok(r.aberto >= 4, "abrir os filtros mostra os campos");
    assert.equal(r.depois, 0, "o x desliga o filtro");
    assert.ok(r.aindaAberto >= 4, "o painel continua aberto depois de mexer: a escolha é da pessoa");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Meu Desempenho: flashcards e ritmo fechados com o resumo à vista; abrir lembra a escolha ao redesenhar", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      navigate("desempenho");
      const sec = chave => [...document.querySelectorAll("#conteudoPagina details.secao-recolhivel")].find(d => d.getAttribute("ontoggle").includes(chave));
      const cartoes = sec("desempenho-cartoes");
      const antes = { existe: !!cartoes, aberta: cartoes.open, resumo: cartoes.querySelector(".secao-resumo").textContent };
      cartoes.open = true; lembrarSecaoRecolhivel("desempenho-cartoes", true);
      render();
      return { antes, depois: sec("desempenho-cartoes").open, titulos: [...document.querySelectorAll("#conteudoPagina .card-title")].map(t => t.textContent.trim()) };
    });
    assert.equal(r.antes.existe, true);
    assert.equal(r.antes.aberta, false);
    assert.match(r.antes.resumo, /revisões/);
    assert.equal(r.depois, true, "redesenhar a tela não fecha o que a pessoa abriu");
    assert.ok(r.titulos.some(t => /Comparação entre as 5 grandes áreas/.test(t)), "o essencial segue aberto");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
