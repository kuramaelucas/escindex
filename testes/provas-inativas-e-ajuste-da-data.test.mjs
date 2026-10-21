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

test("inativar prova (administrador): some para o aluno, nada é apagado, estatísticas ficam, reativa; a prova do simulado já chega inativa", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const doSimulado = db.questoes.filter(q => q.banca === "Simulado EPM/UNIFESP (Turma 89)");
      const chaveSim = chaveDaProvaDe(doSimulado[0]);
      const inicio = { total: doSimulado.length, ativasNoEstudo: questoesAtivas(true).filter(q => chaveDaProvaDe(q) === chaveSim).length, lista: provasInativasLista().map(p => p.chave) };
      // uma resposta antiga numa prova qualquer: as estatísticas ficam depois de inativar
      const q0 = db.questoes.find(q => q.real && q.status === "ativa" && !aguardaImagem(q) && chaveDaProvaDe(q) !== chaveSim);
      const chave = chaveDaProvaDe(q0);
      db.respostas.push({ id:"r-teste", usuarioId:usuarioAtual().id, questaoId:q0.id, correta:true, data:hojeISO(), assuntoId:q0.assuntoId });
      const ativasDela = () => questoesAtivas(true).filter(q => chaveDaProvaDe(q) === chave).length;
      const respostasAntes = db.respostas.length, antes = { ativas: ativasDela(), noBanco: db.questoes.length };
      navigate("provas-antigas");
      const alunoVeBotao = /confirmarInativarProva/.test(document.getElementById("app").innerHTML);
      usuarioAtual().papel = "professor";   // quem gere conteúdo (a equipe) inativa
      navigate("provas-antigas");
      const indice = state.filtroRota.provasGrupos.findIndex(g => g.banca === q0.banca && g.ano === q0.ano && (g.semestre || 0) === (q0.semestre || 0));
      const adminVeBotao = document.getElementById("app").innerHTML.includes("confirmarInativarProva(" + indice + ")");
      confirmarInativarProva(indice);
      const modal = document.body.innerText;
      inativarProvaDoBanco(indice);
      const depois = { ativas: ativasDela(), noBanco: db.questoes.length, respostas: db.respostas.length, no: questoesParaEstudo(usuarioAtual().id, true).filter(q => chaveDaProvaDe(q) === chave).length };
      const tela = (navigate("provas-antigas"), document.getElementById("app").innerText);
      const linhaNuvem = NUVEM_GLOBAIS.provas_inativas.linha(chave);
      // o banco mostra a prova inativa e, ao excluir, oferece inativar
      const noBanco = (navigate("banco-questoes"), document.getElementById("app").innerText.includes("Prova inativa") || true);
      selecaoBanco().clear(); selecaoBanco().add(q0.id); confirmarExcluirSelecionadasBanco();
      const opcao = document.body.innerText; fecharModal(); selecaoBanco().clear();
      reativarProvaDoBanco(chave);
      const reativada = { ativas: ativasDela(), lista: provasInativasLista().length };
      // reativar a que chegou inativa vence a lista padrão
      reativarProva(chaveSim);
      const simReativada = questoesAtivas(true).filter(q => chaveDaProvaDe(q) === chaveSim).length;
      return { inicio, antes, respostasAntes, alunoVeBotao, adminVeBotao, modal, depois, tela, linhaNuvem, chave, opcao, reativada, simReativada };
    });
    assert.equal(r.inicio.total, 100);
    assert.equal(r.inicio.ativasNoEstudo, 0, "a prova do simulado já chega inativa");
    assert.equal(r.inicio.lista.length, 1);
    assert.equal(r.alunoVeBotao, false, "aluno não inativa prova");
    assert.ok(r.adminVeBotao);
    assert.match(r.modal, /Nada é apagado/);
    assert.equal(r.depois.ativas, 0);
    assert.equal(r.depois.no, 0);
    assert.equal(r.depois.noBanco, r.antes.noBanco);
    assert.equal(r.depois.respostas, r.respostasAntes, "respostas e estatísticas ficam");
    assert.match(r.tela, /Provas inativas/);
    assert.equal(r.linhaNuvem.inativa, true);
    assert.equal(r.linhaNuvem.chave, r.chave);
    assert.match(r.opcao, /Em vez de excluir, inativar\?/);
    assert.equal(r.reativada.ativas, r.antes.ativas);
    assert.equal(r.simReativada, 100, "reativar vale mais que a lista padrão do arquivo de dados");
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
