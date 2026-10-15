/* Anotação rápida: cartão pessoal sem assunto (miscelânea), sem mexer no que já existia. */
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

test("Novo cartão do aluno abre a lista com uma linha; sem assunto vai para a miscelânea e com conjunto o filtro o encontra", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      navigate("flashcards");
      const antes = db.flashcards.length;
      const botao = /Novo cartão/.test(document.body.innerHTML);
      abrirFormularioFlashcard(null);
      const linhasAoAbrir = document.querySelectorAll("#listaCartoesLinhas tr").length;
      const tr = document.querySelector("#listaCartoesLinhas tr");
      tr.querySelector('[data-lista="frente"]').value = "Minha anotação";
      tr.querySelector('[data-lista="verso"]').value = "Resposta solta";
      document.getElementById("listaConjunto").value = "  Cardio   R1 ";
      salvarCartoesEmLista();
      const novo = db.flashcards[db.flashcards.length - 1];
      const u = usuarioAtual();
      const livres = montarBaralhoFlashcards(u.id, 50, { situacao: "livres" });
      const doConjunto = montarBaralhoFlashcards(u.id, 50, { conjunto: "Cardio R1" });
      const outroConjunto = montarBaralhoFlashcards(u.id, 50, { conjunto: "Outro" });
      return { botao, linhasAoAbrir, antes, depois: db.flashcards.length,
        assunto: novo.assuntoId, conjunto: novo.conjunto, pessoal: novo.usuarioId === u.id, rotulo: nomeAssuntoDoCartao(novo),
        livres: livres.map(c => c.id), doConjunto: doConjunto.map(c => c.id), outroConjunto: outroConjunto.length, id: novo.id,
        conjuntos: conjuntosDoUsuario(u.id) };
    });
    assert.ok(r.botao);
    assert.equal(r.linhasAoAbrir, 1);
    assert.equal(r.depois, r.antes + 1);
    assert.ok(!r.assunto);
    assert.equal(r.conjunto, "Cardio R1");
    assert.deepEqual(r.conjuntos, ["Cardio R1"]);
    assert.ok(r.pessoal);
    assert.match(r.rotulo, /Miscelânea/);
    assert.deepEqual(r.livres, [r.id]);
    assert.deepEqual(r.doConjunto, [r.id]);
    assert.equal(r.outroConjunto, 0);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Cartão da equipe continua exigindo assunto", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLogin("admin@esc.demo", "admin123"); fecharModal();
      const antes = db.flashcards.length;
      abrirFormularioFlashcard(null);
      document.getElementById("fcAssunto").value = "";
      document.getElementById("fcFrente").value = "F"; document.getElementById("fcVerso").value = "V";
      salvarFlashcard("", "");
      return db.flashcards.length - antes;
    });
    assert.equal(r, 0);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Criar em lista: vários cartões de uma vez, colar com Tab, linha pela metade não grava nada", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal(); navigate("flashcards");
      const botao = /Novo cartão/.test(document.body.innerHTML);
      const antes = db.flashcards.length;
      abrirCartoesEmLista();
      const linhas = () => [...document.querySelectorAll("#listaCartoesLinhas tr")];
      const preencher = (i, f, v) => { const tr = linhas()[i]; tr.querySelector('[data-lista="frente"]').value = f; tr.querySelector('[data-lista="verso"]').value = v; };
      // meia linha: nada é gravado
      preencher(0, "Só frente", "");
      salvarCartoesEmLista();
      const meia = db.flashcards.length - antes;
      // colagem com Tab a partir da primeira linha (7 linhas: passa da única que abre)
      const colado = Array.from({length: 7}, (_, i) => "P" + i + "\tR" + i).join("\n");
      const campo = linhas()[0].querySelector('[data-lista="frente"]');
      const ev = new Event("paste", { cancelable: true }); ev.clipboardData = { getData: () => colado };
      colarNaListaDeCartoes(ev, campo);
      const nLinhas = linhas().length;
      salvarCartoesEmLista();
      const criados = db.flashcards.slice(antes);
      return { botao, meia, nLinhas, criados: criados.length, semAssunto: criados.every(c => !c.assuntoId), pessoais: criados.every(c => c.usuarioId === usuarioAtual().id),
        par: [criados[3].frente, criados[3].verso], modalFechou: !document.getElementById("listaCartoesLinhas") };
    });
    assert.ok(r.botao);
    assert.equal(r.meia, 0);
    assert.ok(r.nLinhas >= 7);
    assert.equal(r.criados, 7);
    assert.ok(r.semAssunto && r.pessoais && r.modalFechou);
    assert.deepEqual(r.par, ["P3", "R3"]);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Revisão rápida: editar o cartão durante a sessão e o cartão só gira ao virar", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      db.flashcards.push({ id: "fc-meu-1", assuntoId: "", conjunto: "X", frente: "F antiga", verso: "V antiga", origem: "aluno", usuarioId: u.id, status: "ativo", criadoPor: u.id, criadoEm: hojeISO() });
      iniciarSessaoFlashcards({ conjunto: "X" });
      const botaoEditar = !!document.querySelector(".flash-editar");
      virarFlashcard();
      const giraAoVirar = !!document.querySelector(".flashcard.girando");
      render();
      const giraAoRedesenhar = !!document.querySelector(".flashcard.girando");
      abrirFormularioFlashcard("fc-meu-1");
      document.getElementById("fcFrente").value = "F nova";
      salvarFlashcard("fc-meu-1", "");
      return { botaoEditar, giraAoVirar, giraAoRedesenhar, frenteNaSessao: state.sessaoFlash.cartoes[0].frente, virado: state.sessaoFlash.virado };
    });
    assert.ok(r.botaoEditar && r.giraAoVirar);
    assert.equal(r.giraAoRedesenhar, false);
    assert.equal(r.frenteNaSessao, "F nova");
    assert.equal(r.virado, true);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
