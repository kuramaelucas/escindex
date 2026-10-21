/* ==========================================================================
   PROVA INATIVA E "AJUSTAR A DATA" DA PROVA-ALVO
   ==========================================================================
   1. Tirar uma prova do banco não apaga nada: as questões continuam em
      db.questoes, deixam de contar como ativas (estudo, provas antigas,
      estatísticas) e voltam inteiras quando a prova é reativada.
   2. O "Ajustar a data" do Início abre uma janela com o campo de data (e o
      calendário do navegador), salva ali mesmo e permite voltar ao padrão.
   ========================================================================== */
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

test("tirar a prova do banco só a inativa: sai do estudo e das provas, volta ao reativar, nada é apagado", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const q0 = db.questoes.find(q => q.real && q.status === "ativa" && !aguardaImagem(q));
      const chave = chaveDaProvaDe(q0);
      const daProva = () => db.questoes.filter(q => q.real && chaveDaProvaDe(q) === chave);
      const ativasDela = () => questoesAtivas(true).filter(q => chaveDaProvaDe(q) === chave).length;
      const total = daProva().length;
      const antes = { ativas: ativasDela(), noBanco: db.questoes.length };
      navigate("provas-antigas");
      const indice = state.filtroRota.provasGrupos.findIndex(g => g.banca === q0.banca && g.ano === q0.ano && (g.semestre || 0) === (q0.semestre || 0));
      const temBotao = document.getElementById("app").innerHTML.includes("confirmarInativarProva(" + indice + ")");
      confirmarInativarProva(indice);
      const modal = document.body.innerText;
      inativarProvaDoBanco(indice);
      const depois = { ativas: ativasDela(), noBanco: db.questoes.length, daProva: daProva().length, na: questoesParaEstudo(usuarioAtual().id, true).filter(q => chaveDaProvaDe(q) === chave).length };
      const tela = (navigate("provas-antigas"), document.getElementById("app").innerText);
      const lista = db.provasInativas.map(p => p.chave);
      reativarProvaDoBanco(chave);
      const reativada = { ativas: ativasDela(), lista: db.provasInativas.length };
      return { total, antes, temBotao, modal, depois, tela, lista, chave, reativada };
    });
    assert.ok(r.total > 1);
    assert.ok(r.temBotao, "cada prova antiga tem o botão Tirar do banco");
    assert.match(r.modal, /Nenhuma questão é apagada/);
    assert.equal(r.depois.ativas, 0, "inativa: nenhuma questão da prova conta como ativa");
    assert.equal(r.depois.na, 0, "e some da fila de estudo");
    assert.equal(r.depois.noBanco, r.antes.noBanco, "nada foi apagado do banco");
    assert.equal(r.depois.daProva, r.total);
    assert.match(r.tela, /Provas fora do banco/);
    assert.deepEqual(r.lista, [r.chave]);
    assert.equal(r.reativada.ativas, r.antes.ativas, "reativada, a prova volta inteira");
    assert.equal(r.reativada.lista, 0);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Início: Ajustar a data abre a janela com a data, salva ali e volta ao padrão", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      u.anoFaculdade = "6º ano"; delete u.provaAlvoData;
      CONFIG.hoje = () => new Date("2026-10-04T12:00:00");
      navigate("inicio");
      const botao = document.getElementById("app").innerHTML.includes("abrirAjusteProvaAlvo()");
      abrirAjusteProvaAlvo();
      const campo = document.getElementById("ajusteProvaAlvo");
      const tipo = campo && campo.type;
      campo.value = "2026-11-10"; salvarProvaAlvo("ajusteProvaAlvo");
      const salva = u.provaAlvoData;
      const fechou = !document.getElementById("ajusteProvaAlvo");
      const inicio = document.getElementById("app").innerText;
      abrirAjusteProvaAlvo(); limparProvaAlvo();
      return { botao, tipo, salva, fechou, inicio, limpa: u.provaAlvoData, fechouAoLimpar: !document.getElementById("ajusteProvaAlvo") };
    });
    assert.ok(r.botao, "o Início chama a janela, não leva ao Perfil");
    assert.equal(r.tipo, "date");
    assert.equal(r.salva, "2026-11-10");
    assert.ok(r.fechou);
    assert.match(r.inicio, /Prova-alvo: 10\/11\/2026/);
    assert.equal(r.limpa, undefined);
    assert.ok(r.fechouAoLimpar);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
