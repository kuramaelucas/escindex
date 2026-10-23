/* "Mais uma rodada" no fim da revisão rápida repete o recorte da sessão que acabou
   (área, situação, conjunto…), e não volta ao baralho recomendado. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); });

test("mais uma rodada de cartões mantém o filtro da sessão anterior", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await contexto.newPage();
    const erros = [];
    pagina.on("pageerror", e => erros.push(e.message));
    await pagina.goto(semNuvem.url + "index.html");
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    const r = await pagina.evaluate(() => {
      fazerLogin("aluno@esc.demo", "aluno123"); fecharModal();
      const u = usuarioAtual();
      // três cartões do conjunto "Meu conjunto" e um fora dele
      ["a", "b", "c"].forEach(x => db.flashcards.push({ id: "fc-" + x, usuarioId: u.id, frente: "f" + x, verso: "v", conjunto: "Meu conjunto", criadoEm: hojeISO() }));
      db.flashcards.push({ id: "fc-fora", usuarioId: u.id, frente: "fora", verso: "v", criadoEm: hojeISO() });
      saveState();
      iniciarSessaoFlashcards({ conjunto: "Meu conjunto", situacao: "meus", tamanho: 1 });
      const primeira = state.sessaoFlash.cartoes.map(c => c.conjunto);
      state.filtroRota.flashcards = { conjunto: "outro" };   // a tela mudou o filtro depois
      state.sessaoFlash.finalizada = true;
      render();
      const botao = document.body.innerText.includes("Mais uma rodada");
      maisUmaRodadaFlashcards();
      return { primeira, botao, filtro: state.sessaoFlash.filtro, conjuntos: state.sessaoFlash.cartoes.map(c => c.conjunto) };
    });
    assert.equal(r.botao, true);
    assert.deepEqual(r.primeira, ["Meu conjunto"]);
    assert.equal(r.filtro.conjunto, "Meu conjunto");
    assert.ok(r.conjuntos.length && r.conjuntos.every(c => c === "Meu conjunto"), "a nova rodada só traz cartões do mesmo conjunto: " + r.conjuntos);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
