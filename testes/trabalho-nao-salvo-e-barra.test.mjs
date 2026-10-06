/* Confirmação antes de perder texto escrito, e a barra de questões maior com ✓/✕. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(); servidor = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1000, height: 800 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(servidor.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto, erros };
}

test("Clicar fora da janela com texto escrito pergunta antes; sem texto fecha direto", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const perguntas = [];
    let resposta = false;
    pagina.on("dialog", d => { perguntas.push(d.message()); resposta ? d.accept() : d.dismiss(); });
    await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal(); navigate("flashcards"); abrirCartoesEmLista(); });
    // janela limpa: fecha sem perguntar
    await pagina.mouse.click(5, 5);
    assert.equal(await pagina.evaluate(() => !!document.getElementById("modalOverlayAtivo")), false);
    assert.equal(perguntas.length, 0);
    // com texto: o clique fora pergunta e, recusado, a janela e o texto ficam
    await pagina.evaluate(() => { abrirCartoesEmLista(); document.querySelector('[data-lista="frente"]').value = "20 cartões escritos"; });
    await pagina.mouse.click(5, 5);
    assert.equal(perguntas.length, 1);
    assert.match(perguntas[0], /perder o texto/);
    assert.equal(await pagina.evaluate(() => document.querySelector('[data-lista="frente"]').value), "20 cartões escritos");
    // o X e o Cancelar também perguntam
    await pagina.evaluate(() => document.querySelector(".modal-header .icon-btn").click());
    await pagina.evaluate(() => [...document.querySelectorAll("button")].find(b => b.textContent.trim() === "Cancelar").click());
    assert.equal(perguntas.length, 3);
    // aceitando, fecha
    resposta = true;
    await pagina.mouse.click(5, 5);
    assert.equal(await pagina.evaluate(() => !!document.getElementById("modalOverlayAtivo")), false);
    // salvar não pergunta
    await pagina.evaluate(() => { abrirCartoesEmLista(); const t = document.querySelector("#listaCartoesLinhas tr"); t.querySelector('[data-lista="frente"]').value = "F"; t.querySelector('[data-lista="verso"]').value = "V"; salvarCartoesEmLista(); });
    assert.equal(perguntas.length, 4, "salvar não pergunta (só a aceitação anterior contou)");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Sair da tela de importação com texto colado pergunta; importado ou vazio não", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const perguntas = [];
    let resposta = false;
    pagina.on("dialog", d => { perguntas.push(d.message()); resposta ? d.accept() : d.dismiss(); });
    await pagina.evaluate(() => { fazerLogin("admin@esc.demo", "admin123"); fecharModal(); navigate("importar-questoes"); });
    await pagina.evaluate(() => navigate("inicio"));
    assert.equal(perguntas.length, 0, "sem texto, sai direto");
    await pagina.evaluate(() => { navigate("importar-questoes"); document.getElementById("textoImportacao").value = "PERGUNTA: algo longo"; });
    await pagina.evaluate(() => navigate("inicio"));
    assert.equal(perguntas.length, 1);
    assert.equal(await pagina.evaluate(() => state.route), "importar-questoes");
    resposta = true;
    await pagina.evaluate(() => navigate("inicio"));
    assert.equal(await pagina.evaluate(() => state.route), "inicio");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Barra de questões: maior, com setas, e ✓/✕ no canto das respondidas", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal(); });
    const r = await pagina.evaluate(() => {
      const pool = questoesParaEstudo(usuarioAtual().id).slice(0, 12);
      iniciarSessaoComLista(pool.map(q => ({ questaoId: q.id, motivo: "teste" })), "pratica");
      const s = state.sessaoAtual;
      // uma certa e uma errada, direto no registro da sessão
      const q0 = getQuestao(s.itens[0].questaoId), q1 = getQuestao(s.itens[1].questaoId);
      const errada = q1.alternativas.find(a => a.id !== q1.gabarito).id;
      [[0, q0.gabarito], [1, errada]].forEach(([i, alt]) => { s.indiceAtual = i; selecionarAlternativa(alt); confirmarResposta("certeza"); });
      s.indiceAtual = 2; render();
      return { n: s.itens.length, selos: [...document.querySelectorAll(".barra-questoes .selo-resp")].map(e => e.textContent) };
    });
    assert.ok(r.n >= 6);
    assert.deepEqual(r.selos, ["✓", "✕"]);
    const medida = await pagina.evaluate(() => {
      const p = document.querySelector(".barra-questoes .mapa-pill"); const b = p.getBoundingClientRect();
      return { w: Math.round(b.width), h: Math.round(b.height), setas: document.querySelectorAll(".barra-questoes-seta").length };
    });
    assert.ok(medida.h >= 36 && medida.w >= 39, JSON.stringify(medida));
    assert.equal(medida.setas, 2);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
