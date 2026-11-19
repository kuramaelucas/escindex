/* Resumos (Beta), 09e: o caderno abre de resumos/ sob demanda, marca pelo erro da
   pessoa (ponto-chave e frase ligada), aceita destaque azul que sobrevive ao repintar,
   o trecho selecionado vira cartão preenchido e o feedback guarda de que resumo veio. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); });

test("resumo: marca pelo erro, destaque azul, cartão do trecho e feedback com o resumo", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await contexto.newPage();
    const erros = [];
    pagina.on("pageerror", e => erros.push(e.message));
    await pagina.goto(semNuvem.url + "index.html");
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    await pagina.evaluate(() => {
      fazerLogin("aluno@esc.demo", "aluno123"); fecharModal();
      const u = usuarioAtual();
      // errou a questão do Koplik; acertou a de exantema súbito
      db.respostas.push({ id: "r1", usuarioId: u.id, questaoId: "q-iamspe2025-065", correta: false, confianca: "certeza", data: hojeISO() });
      db.respostas.push({ id: "r2", usuarioId: u.id, questaoId: "q-scmsp2025-053", correta: true, confianca: "certeza", data: hojeISO() });
      saveState();
      navigate("estudar");
    });
    assert.ok(await pagina.evaluate(() => navItemsParaPapel("aluno").some(i => i.id === "resumos") && GRUPO_DO_ITEM_ALUNO.resumos === "Estudar"), "Resumos está no menu lateral, no grupo Estudar");
    assert.equal(await pagina.locator("text=Abrir resumos").count(), 0, "a página Estudar não traz mais o cartão de Resumos");
    await pagina.evaluate(() => navigate("resumos"));
    await pagina.waitForSelector("text=Doenças exantemáticas na infância");
    await pagina.evaluate(() => abrirResumo("exantematicas"));
    await pagina.waitForSelector(".resumo-caderno");

    const r = await pagina.evaluate(() => {
      const primeiro = document.querySelector(".resumo-capitulo h2").textContent;
      const koplik = [...document.querySelectorAll(".resumo-chave li.revisar")].some(li => li.textContent.includes("Koplik"));
      const frase = document.querySelector(".resumo-frase.revisar");
      alternarFraseDoResumo(frase);
      const acesa = frase.classList.contains("acesa");
      // destaque da pessoa num parágrafo: grava e repinta mantendo as frases ligadas
      const p = document.querySelector('#resumo-c-sarampo p[data-alvo]');
      const alvo = p.getAttribute("data-alvo"), texto = p.textContent;
      db.destaques = db.destaques || [];
      db.destaques.push({ id: "d-t", usuarioId: usuarioAtual().id, alvo, inicio: 0, fim: 10, trecho: texto.slice(0, 10), data: hojeISO() });
      repintarAlvo(p);
      const marcou = !!p.querySelector("mark.destaque");
      const frasesFicaram = document.querySelectorAll("#resumo-c-sarampo .resumo-frase").length > 0;
      // trecho selecionado → cartão com o trecho no verso e o assunto do resumo
      _destaquePendente = { trecho: "Koplik é patognomônico", alvo };
      cartaoDoTrechoSelecionado();
      const verso = document.getElementById("fcVerso").value, assunto = document.getElementById("fcAssunto").value;
      fecharModal();
      abrirModalFeedback("exantematicas");
      document.getElementById("fbTexto").value = "Faltou figura do Koplik";
      enviarFeedbackGeral("exantematicas");
      const fb = db.feedbacks[db.feedbacks.length - 1];
      return { primeiro, koplik, acesa, marcou, frasesFicaram, verso, assunto, resumoId: fb.resumoId };
    });
    assert.equal(r.primeiro, "Sarampo", "o capítulo com mais erro vem primeiro");
    // o capítulo verde (exantema súbito, só acerto) vai para o fim, depois dos ainda sem resposta
    const ordem = await pagina.evaluate(() => [...document.querySelectorAll(".resumo-capitulo h2")].map(h => h.textContent));
    assert.equal(ordem[ordem.length - 1], "Exantema súbito (roséola infantum)", "o que já domina fica depois do que ainda não foi respondido");
    assert.ok(r.koplik, "o ponto-chave do Koplik fica marcado para revisar");
    assert.ok(r.acesa, "clicar na frase acende a cor");
    assert.ok(r.marcou && r.frasesFicaram, "o destaque aparece e as frases ligadas continuam");
    assert.equal(r.verso, "Koplik é patognomônico");
    assert.equal(r.assunto, "ass-exantematicas");
    assert.equal(r.resumoId, "exantematicas");
    // caso ilustrado: figura à vista; tentar a alternativa mostra o gabarito e NÃO grava resposta
    const caso = await pagina.evaluate(() => {
      const el = document.getElementById("resumo-caso-q-uspsp1-004");
      const temFigura = !!el.querySelector("img.qcard-img");
      const antes = db.respostas.length;
      responderCasoDoResumo("q-uspsp1-004", "A");
      const novo = document.getElementById("resumo-caso-q-uspsp1-004");
      return { temFigura, gravou: db.respostas.length !== antes, certa: !!novo.querySelector(".qcard-alt.correct"), gabarito: novo.textContent.includes("Gabarito: C") };
    });
    assert.ok(caso.temFigura && caso.certa && caso.gabarito, "o caso ilustrado mostra figura e gabarito");
    assert.ok(!caso.gravou, "tentar o caso no resumo não vira resposta");
    // ilustração própria: o arquivo de resumos/<tema>/figuras carrega de fato
    // (a imagem é lazy: fora da tela não carrega, então confere pelo endereço)
    const figura = await pagina.evaluate(async () => { const i = document.querySelector(".resumo-figura img"); const r = await fetch(i.src); return r.ok && (r.headers.get("content-type") || "").includes("svg"); });
    assert.ok(figura, "a ilustração própria do resumo existe e é SVG");
    // capítulo comparativo: a tabela em Markdown vira <table> com células destacáveis, e a seção de conduta diz a diretriz
    const tabela = await pagina.evaluate(() => {
      const t = document.querySelector("#resumo-c-comparativo .resumo-tabela table");
      return t && { linhas: t.querySelectorAll("tbody tr").length, colunas: t.querySelectorAll("thead th").length,
        destacavel: !!t.querySelector("td[data-alvo]"), negrito: !!t.querySelector("td strong"),
        diretriz: document.querySelector("#resumo-s-kaw-trat").textContent.includes("Conduta conforme: American Heart Association") };
    });
    assert.deepEqual(tabela, { linhas: 9, colunas: 9, destacavel: true, negrito: true, diretriz: true });
    // celular: o sumário é gaveta; tocar fora (no véu) fecha
    await pagina.setViewportSize({ width: 390, height: 800 });
    await pagina.waitForTimeout(400);   // o menu lateral do app leva 0,2 s para sair da tela
    await pagina.evaluate(() => document.querySelector(".resumo-layout").classList.remove("lateral-fechada"));
    const gavetaAberta = await pagina.locator(".resumo-lateral").isVisible();
    await pagina.mouse.click(10, 400);
    assert.ok(gavetaAberta && !(await pagina.locator(".resumo-lateral").isVisible()), "tocar fora fecha a gaveta do sumário");
    await pagina.setViewportSize({ width: 1280, height: 800 });
    // todo resumo do catálogo abre e desenha capítulos (pega erro de sintaxe ou de ligação num resumo novo)
    const ids = await pagina.evaluate(() => catalogoDeResumos().map(r => r.id));
    for(const id of ids){
      await pagina.evaluate(i => abrirResumo(i), id);
      await pagina.waitForFunction(() => document.querySelectorAll(".resumo-capitulo").length > 0, null, { timeout: 10000 });
    }
    assert.ok(ids.length >= 3);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("resumos: lista por grande área e por erro, voltar fecha o resumo, marcar como lido, Ler resumo no desempenho e meta semanal", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await contexto.newPage();
    const erros = [];
    pagina.on("pageerror", e => erros.push(e.message));
    await pagina.goto(semNuvem.url + "index.html");
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    await pagina.evaluate(() => {
      fazerLogin("aluno@esc.demo", "aluno123"); fecharModal();
      const u = usuarioAtual();
      // três questões diferentes do assunto (o erro conta a última resposta de cada questão)
      questoesAtivas().filter(q => q.assuntoId === "ass-exantematicas").slice(0, 3)
        .forEach((q, i) => db.respostas.push({ id: "r" + i, usuarioId: u.id, questaoId: q.id, correta: false, confianca: "certeza", data: hojeISO() }));
      saveState();
      navigate("resumos");
    });
    await pagina.waitForSelector("text=Doenças exantemáticas na infância");
    const lista = await pagina.evaluate(() => ({
      areas: [...document.querySelectorAll("#app h3")].map(h => h.textContent),
      primeiro: document.querySelector("#app .card .card-title").textContent,
    }));
    assert.ok(lista.areas.length >= 1, "agrupado por grande área");
    assert.match(lista.primeiro, /exantemáticas/, "o resumo do assunto em que a pessoa errou vem primeiro");
    await pagina.evaluate(() => mudarOrdemDosResumos("alfabetica"));
    await pagina.evaluate(() => abrirResumo("exantematicas"));
    await pagina.waitForSelector(".resumo-caderno");
    await pagina.goBack();
    await pagina.waitForFunction(() => !document.querySelector(".resumo-caderno") && state.route === "resumos");
    await pagina.evaluate(() => abrirResumo("exantematicas"));
    await pagina.waitForSelector("text=Marcar como lido");
    await pagina.click("text=Marcar como lido");
    const lido = await pagina.evaluate(() => ({ n: quantosResumosLidos(usuarioAtual()), painel: painelTurmaLocal().pessoas.find(p => p.id === usuarioAtual().id).resumosLidos, linha: linhaDoPerfil(usuarioAtual()).resumos_lidos }));
    assert.equal(lido.n, 1); assert.equal(lido.painel, 1); assert.ok(lido.linha.exantematicas);
    await pagina.evaluate(() => navigate("desempenho"));
    await pagina.waitForFunction(() => document.body.innerText.includes("Leitura para os seus pontos fracos"));
    await pagina.click("text=Ler resumo");
    await pagina.waitForSelector(".resumo-caderno");

    const meta = await pagina.evaluate(() => {
      const u = usuarioAtual();
      CONFIG.hoje = () => new Date("2026-11-19T12:00:00");   // quinta-feira: 4º dia da semana
      db.respostas = db.respostas.filter(r => r.usuarioId !== u.id);
      for(let i = 0; i < 80; i++) db.respostas.push({ id: "m" + i, usuarioId: u.id, questaoId: "x", correta: true, data: "2026-11-17" });
      u.metaQuestoesSemana = 140;
      const emDia = progressoDaMeta(u);
      u.metaQuestoesSemana = 210;
      const atrasado = progressoDaMeta(u);
      return { emDia, atrasado };
    });
    assert.equal(meta.emDia.batida, true, "80 de 140 na quinta: em dia, mesmo sem estudar hoje");
    assert.equal(meta.emDia.faltamNaSemana, 60);
    assert.equal(meta.atrasado.batida, false);
    assert.equal(meta.atrasado.faltam, 40, "210 × 4/7 = 120 esperado");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
