/* Pendências de conteúdo: a lista nasce do banco — resolver o problema tira o item,
   e quem não é da equipe não entra. */
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

test("a lista sai do banco: liberar figura, preencher número e criar cartão tiram o item", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLogin("admin@esc.demo", "admin123"); fecharModal();
      const antes = pendenciasDeConteudo();
      const comFigura = db.questoes.find(q => q.real && !q.grupoId && aguardaImagem(q));
      comFigura.imagemPendente = "";
      // tira uma questão do meio de uma prova completa: aparece como número faltando
      const prova = db.questoes.filter(q => q.real && !q.grupoId && q.banca === "USP-SP (FMUSP)" && q.ano === 2025);
      const meio = prova.find(q => q.numeroNaProva === 50);
      db.questoes = db.questoes.filter(q => q.id !== meio.id);
      const assunto = assuntosSemCartaoDaEquipe()[0];
      const depoisDeTirar = pendenciasDeConteudo();
      db.flashcards.push({ id: "fc-teste", assuntoId: assunto.id, frente: "f", verso: "v" });
      const depoisDoCartao = pendenciasDeConteudo();
      navigate("pendencias-conteudo");
      return {
        figuraAntes: antes.semFigura.reduce((t, g) => t + g.itens.length, 0),
        figuraDepois: depoisDeTirar.semFigura.reduce((t, g) => t + g.itens.length, 0),
        faltaAntes: antes.lacunas.some(g => g.rotulo.startsWith("USP-SP (FMUSP) 2025")),
        faltaDepois: depoisDeTirar.lacunas.find(g => g.rotulo.startsWith("USP-SP (FMUSP) 2025"))?.faltam,
        semCartaoAntes: antes.semCartao.length, semCartaoDepois: depoisDoCartao.semCartao.length,
        tela: document.getElementById("conteudoPagina").innerText,
        abas: [...document.querySelectorAll("#conteudoPagina .tabs-irmas .tab")].map(b => b.textContent.trim()),
      };
    });
    assert.equal(r.figuraDepois, r.figuraAntes - 1, "figura liberada sai da lista");
    assert.equal(r.faltaAntes, false);
    assert.deepEqual(r.faltaDepois, [50], "o número que sumiu aparece como faltando");
    assert.equal(r.semCartaoDepois, r.semCartaoAntes - 1, "cartão novo tira o assunto da lista");
    assert.match(r.tela, /Pendências de conteúdo/);
    assert.match(r.tela, /Provas com número faltando/);
    assert.ok(r.abas.includes("Pendências"), "a tela é uma aba da família Provas e importação");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("aluno não vê a tela de pendências", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const texto = await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal(); navigate("pendencias-conteudo"); return document.getElementById("conteudoPagina").innerText; });
    assert.doesNotMatch(texto, /Questões esperando figura/);
  } finally { await contexto.close(); }
});
