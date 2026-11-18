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
    assert.ok(await pagina.locator("text=Abrir resumos").count(), "Estudar mostra o cartão de Resumos");
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
