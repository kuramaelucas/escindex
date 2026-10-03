/* Sessão de questões mais limpa: modo foco, dicas numa linha só, origem e
   trilha em texto. Nada que explicava o que a plataforma faz pode sumir. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); });

test("modo foco esconde menu e topo só na sessão e se desliga ao sair; as dicas continuam à vista", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1200, height: 900 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await contexto.newPage();
    await pagina.goto(semNuvem.url + "index.html");
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    const r = await pagina.evaluate(() => {
      fazerLogin("aluno@esc.demo", "aluno123"); fecharModal();
      iniciarSessaoRecomendada();
      const visivel = el => !!el && getComputedStyle(el).display !== "none";
      const pg = () => document.getElementById("conteudoPagina");
      const antes = { menu: visivel(document.getElementById("sidebarMenu")), topo: visivel(document.getElementById("topoBarra")) };
      const dicas = pg().innerText;
      const nDicas = pg().querySelectorAll(".qcard > .text-xs.muted").length;
      alternarModoFoco();
      const foco = { menu: visivel(document.getElementById("sidebarMenu")), topo: visivel(document.getElementById("topoBarra")), classe: document.body.classList.contains("modo-foco"), botao: /Sair do foco/.test(pg().innerText) };
      const botaoCrescido = visivel(pg());
      sairDaSessao();
      const depois = { classe: document.body.classList.contains("modo-foco"), menu: visivel(document.getElementById("sidebarMenu")), estado: state.modoFoco };
      return { antes, dicas, nDicas, foco, botaoCrescido, depois };
    });
    assert.deepEqual(r.antes, { menu: true, topo: true });
    assert.match(r.dicas, /Selecione uma alternativa para continuar/);
    assert.match(r.dicas, /Assunto, especialidade e dificuldade aparecem depois que você responder/);
    assert.match(r.dicas, /Use o × ao lado de cada alternativa/);
    assert.equal(r.nDicas, 1, "as dicas viraram uma linha só");
    assert.deepEqual(r.foco, { menu: false, topo: false, classe: true, botao: true });
    assert.ok(r.botaoCrescido);
    assert.deepEqual(r.depois, { classe: false, menu: true, estado: false });
  } finally { await contexto.close(); }
});

test("depois de responder, a classificação continua inteira (área, especialidade, assunto)", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await contexto.newPage();
    await pagina.goto(semNuvem.url + "index.html");
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    const r = await pagina.evaluate(() => {
      fazerLogin("aluno@esc.demo", "aluno123"); fecharModal();
      const q = db.questoes.find(x => x.real && x.status === "ativa");
      const html = renderQuestionCard(q, { respondida: true, selecionada: q.gabarito });
      const caixa = document.createElement("div"); caixa.innerHTML = html;
      const texto = caixa.querySelector(".qcard-meta").textContent.replace(/\s+/g, " ");
      return { texto, esp: getEspecialidade(q.especialidadeId)?.nome, assunto: nomeAssunto(q.assuntoId), banca: q.banca, ano: q.ano };
    });
    assert.ok(r.texto.includes(r.esp) && r.texto.includes(r.assunto) && r.texto.includes(r.banca) && r.texto.includes(String(r.ano)), r.texto);
  } finally { await contexto.close(); }
});
