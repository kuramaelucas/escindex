/* Revisar Formatação dividida em blocos de envio: o que entrou antes é agrupado
   por dia + banca + ano, o que entra pela importação sai carimbado e vira um
   bloco novo, e a busca ou a aprovação não deixam a tela vazia sem explicação. */
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
  await pagina.goto(semNuvem.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  await pagina.evaluate(() => { fazerLogin("professor@esc.demo", "prof123"); fecharModal(); });
  return { pagina, contexto };
}

const PROVA = [
  "INSTITUICAO: Prova de Teste Lote", "ANO: 2033", "===",
  "NUMERO: 1", "PERGUNTA: Primeira pergunta do lote de teste da revisão?", "A: um", "B: dois", "C: três", "D: quatro",
  "GABARITO: A", "EXPLICACAO: Explicação.", "AREA: Clínica Médica", "===",
  "NUMERO: 2", "PERGUNTA: Segunda pergunta do lote de teste da revisão?", "A: um", "B: dois", "C: três", "D: quatro",
  "GABARITO: B", "EXPLICACAO: Explicação.", "AREA: Clínica Médica",
].join("\n");

test("blocos: o banco antigo se divide por prova e o bloco escolhido filtra a lista", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      const lista = questoesAtivas(true);
      const lotes = lotesDeUpload(lista);
      navigate("revisao-formatacao");
      const total = lotes.reduce((n, l) => n + l.questoes.length, 0);
      const primeiro = lotes[0];
      selecionarLoteFormatacao(primeiro.chave);
      const mostradas = document.querySelectorAll("#app .card.mb-2 .qcard-meta").length;
      return {
        nLotes: lotes.length, total, nLista: lista.length,
        cadaLoteUmaProva: lotes.every(l => l.bancas.size === 1 && l.anos.size === 1),
        chips: document.querySelectorAll(".lote-chip").length,
        primeiroQtd: primeiro.questoes.length, mostradas,
        resumo: document.querySelector(".card-flat.mb-2.text-sm") ? document.querySelector(".card-flat.mb-2.text-sm").innerText : "",
      };
    });
    assert.equal(r.total, r.nLista, "todo bloco soma de volta a lista inteira");
    assert.ok(r.nLotes > 5, "o banco real tem várias provas, cada uma vira um bloco");
    assert.ok(r.cadaLoteUmaProva, "bloco reconstruído = uma prova (banca + ano)");
    assert.equal(r.chips, r.nLotes + 1, "um cartão por bloco, mais o de todas");
    assert.equal(r.mostradas, Math.min(15, r.primeiroQtd), "a lista mostra só o bloco escolhido, paginado de 15 em 15");
    assert.match(r.resumo, /Revisando o bloco de/);
  } finally { await contexto.close(); }
});

test("blocos: importação nova sai carimbada e vira o bloco mais recente, com a hora e o autor", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate((texto) => {
      navigate("importar-questoes");
      document.getElementById("textoImportacao").value = texto;
      previsualizarImportacao();
      confirmarImportacao();
      const novas = db.questoes.filter(q => q.banca === "Prova de Teste Lote");
      navigate("revisao-formatacao");
      const lotes = lotesDeUpload(questoesAtivas(true));
      const primeiro = lotes[0];
      return {
        n: novas.length, mesmoLote: new Set(novas.map(q => q.loteId)).size, carimbadas: novas.every(q => q.loteId && q.importadoEm),
        primeiroEhONovo: primeiro.chave === novas[0].loteId, qtd: primeiro.questoes.length,
        quando: quandoDoLote(primeiro.quando), autor: autorDoLote(primeiro), origem: origemDoLote(primeiro),
        telaAbreNoNovo: document.querySelector(".card-flat.mb-2.text-sm").innerText,
      };
    }, PROVA);
    assert.equal(r.n, 2);
    assert.equal(r.mesmoLote, 1);
    assert.ok(r.carimbadas);
    assert.ok(r.primeiroEhONovo);
    assert.equal(r.qtd, 2);
    assert.match(r.quando, /\d{2}\/\d{2}\/\d{4} às \d{2}:\d{2}/);
    assert.equal(r.origem, "Prova de Teste Lote · 2033");
    assert.match(r.telaAbreNoNovo, /Prova de Teste Lote · 2033, 2 questão/);
  } finally { await contexto.close(); }
});

test("blocos: busca sem resultado e 'Todas' não quebram, e limpar a busca volta ao normal", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      navigate("revisao-formatacao");
      selecionarLoteFormatacao("__todos__");
      const todas = document.querySelectorAll(".qcard-meta").length;
      state.filtroRota.buscaFormatacao = "texto-que-nao-existe-em-nenhuma-questao-xyz";
      render();
      const vazio = document.querySelector("#app").innerText;
      const botaoLimpar = !!document.querySelector("[onclick='limparBuscaFormatacao()']");
      limparBuscaFormatacao();
      return { todas, vazio, botaoLimpar, depois: document.querySelectorAll(".lote-chip").length, busca: state.filtroRota.buscaFormatacao };
    });
    assert.equal(r.todas, 15);
    assert.match(r.vazio, /Nenhum bloco para mostrar/);
    assert.match(r.vazio, /Nenhuma questão encontrada/);
    assert.ok(r.botaoLimpar);
    assert.ok(r.depois > 5);
    assert.equal(r.busca, "");
  } finally { await contexto.close(); }
});
