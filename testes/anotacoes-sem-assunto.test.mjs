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

test("Anotação rápida cria cartão pessoal sem assunto e o filtro 'livres' o encontra", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      navigate("flashcards");
      const antes = db.flashcards.length;
      const botao = /Anotação rápida/.test(document.body.innerHTML);
      // o formulário comum continua com o primeiro assunto como padrão
      abrirFormularioFlashcard(null);
      const padraoComum = document.getElementById("fcAssunto").value;
      fecharModal();
      abrirAnotacaoRapida();
      const sel = document.getElementById("fcAssunto");
      const padraoLivre = sel.value;
      const botaoOutro = /Salvar e criar outro/.test(document.body.innerHTML);
      document.getElementById("fcFrente").value = "Minha anotação";
      document.getElementById("fcVerso").value = "Resposta solta";
      salvarFlashcard("", "", true);
      const novo = db.flashcards[db.flashcards.length - 1];
      const reabriu = !!document.getElementById("fcFrente") && document.getElementById("fcFrente").value === "";
      fecharModal();
      const u = usuarioAtual();
      const livres = montarBaralhoFlashcards(u.id, 50, { situacao: "livres" });
      return { botao, antes, depois: db.flashcards.length, padraoComum, padraoLivre, botaoOutro, reabriu,
        assunto: novo.assuntoId, pessoal: novo.usuarioId === u.id, rotulo: nomeAssuntoDoCartao(novo),
        livres: livres.map(c => c.id), id: novo.id };
    });
    assert.ok(r.botao);
    assert.ok(r.padraoComum !== "", "o formulário comum não pode passar a vir sem assunto");
    assert.equal(r.padraoLivre, "");
    assert.ok(r.botaoOutro && r.reabriu);
    assert.equal(r.depois, r.antes + 1);
    assert.ok(!r.assunto);
    assert.ok(r.pessoal);
    assert.match(r.rotulo, /Miscelânea/);
    assert.deepEqual(r.livres, [r.id]);
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
