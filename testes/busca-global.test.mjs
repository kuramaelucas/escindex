/* Busca global (Ctrl/Cmd+K): acha tela, assunto e questão sem acento nem caixa;
   quem estuda não acha o que não entra na fila dela; a equipe acha tudo. */
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

test("Ctrl+K abre a busca; digitar acha tela (sem acento), assunto e questão; Enter vai", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal(); });
    await pagina.keyboard.press("Control+k");
    assert.ok(await pagina.locator("#buscaGlobalCampo").isVisible(), "Ctrl+K abre o campo");
    await pagina.fill("#buscaGlobalCampo", "desempenho");
    assert.match(await pagina.locator(".busca-item.sel").innerText(), /Meu Desempenho/);
    await pagina.keyboard.press("Enter");
    assert.equal(await pagina.evaluate(() => state.route), "desempenho");
    assert.equal(await pagina.locator("#buscaGlobalCampo").count(), 0, "a busca fecha ao escolher");

    // uma palavra tirada de um enunciado real, escrita sem acento nem caixa
    const palavra = await pagina.evaluate(() => {
      const q = questoesParaEstudo(usuarioAtual().id).find(x => /[A-Za-zÀ-ú]{9,}/.test(x.enunciado));
      return buscaNormalizar(/[A-Za-zÀ-ú]{9,}/.exec(q.enunciado)[0]).toUpperCase();
    });
    await pagina.keyboard.press("Control+k");
    await pagina.fill("#buscaGlobalCampo", palavra);
    assert.ok(await pagina.locator(".busca-grupo", { hasText: "Questões" }).count() >= 1, "acha questão pelo enunciado");
    await pagina.locator(".busca-item").first().click();
    assert.ok(await pagina.locator("#modalOverlayAtivo").innerText().then(t => /Questão na íntegra/.test(t)), "abre a questão na íntegra");
    await pagina.keyboard.press("Control+k");
    await pagina.fill("#buscaGlobalCampo", "zzzxxyy");
    assert.match(await pagina.locator("#buscaGlobalLista").innerText(), /Nada encontrado/);
    await pagina.keyboard.press("Escape");
    assert.equal(await pagina.locator("#buscaGlobalCampo").count(), 0);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("o aluno não acha questão que não entra no estudo dele; a equipe acha", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      // um enunciado cuja palavra rara só aparece nessa questão, para o achado ser inequívoco
      const q = db.questoes.find(x => x.status==="ativa" && !aguardaImagem(x) && !x.grupoId && /[A-Za-zÀ-ú]{10,}/.test(x.enunciado));
      const palavra = /[A-Za-zÀ-ú]{10,}/.exec(q.enunciado)[0];
      const acha = () => buscaResultados(palavra).some(i => i.questaoId === q.id);
      const antes = acha();
      q.status = "anulada"; saveState();
      const aluno = acha();
      fazerLogin("admin@esc.demo", "admin123"); fecharModal();
      const equipe = acha();
      const assuntosParaEquipe = buscaResultados("a").filter(i => i.tipo==="Assunto").length;
      return { antes, aluno, equipe, assuntosParaEquipe };
    });
    assert.equal(r.antes, true, "o aluno acha a questão ativa (ela está entre as primeiras)");
    assert.equal(r.aluno, false, "anulada sai da busca do aluno");
    assert.equal(r.equipe, true, "a equipe ainda acha a anulada, para poder consertá-la");
    assert.equal(r.assuntosParaEquipe, 0, "assunto para praticar é do aluno");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("no meio de um simulado em andamento a busca não abre", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      state.route = "simulado-ativo"; state.sessaoAtual = { finalizado: false };
      abrirBuscaGlobal();
      const abriu = !!document.getElementById("buscaGlobalCampo");
      state.sessaoAtual = null; state.route = "inicio";
      return abriu;
    });
    assert.equal(r, false);
  } finally { await contexto.close(); }
});
