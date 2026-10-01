/* Rodada de 01/10/2026: restaurar metas, ordenar o painel por último uso, mais de uma
   instituição por conjunto, baralho inteiro de uma IA, integrantes e grupos de estudo. */
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

test("Restaurar padrão apaga a meta pessoal e volta a seguir a coordenação", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno");
      const u = usuarioAtual();
      u.metaQuestoesDia = 7; u.metaCartoesDia = 9;
      abrirModalMeta();
      const botao = !!document.querySelector("#modalOverlayAtivo [onclick*=\"restaurarMetaPadrao('questoes')\"]");
      restaurarMetaPadrao("questoes"); restaurarMetaPadrao("cartoes");
      return { botao, q: metaDoUsuario(u), c: metaCartoesDoUsuario(u), propria: "metaQuestoesDia" in u };
    });
    assert.ok(r.botao);
    assert.equal(r.q, await pagina.evaluate(() => db.configGeral.metaRecomendadaQuestoesDia));
    assert.equal(r.c, await pagina.evaluate(() => db.configGeral.metaCartoesDia || CONFIG.metaCartoesDia));
    assert.equal(r.propria, false);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Painel da Turma ordena por último uso, sem a opção 'precisa de atenção'", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLogin("admin@esc.demo", "admin123"); fecharModal();
      navigate("painel-turma");
      const html = document.body.innerHTML;
      return { carregando: /Carregando os números/.test(html), nuvem: nuvemLigada(), atencao: /precisa de atenção/i.test(html), ultimo: /Último uso: mais recente primeiro/.test(html), padrao: filtrosPainelTurma().ordem };
    });
    assert.equal(r.atencao, false);
    assert.ok(r.ultimo);
    assert.equal(r.padrao, "ultimo");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Monte sua lista aceita mais de uma instituição e mais de um tipo de prova", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno");
      navigate("estudar");
      const bancas = [...document.querySelectorAll(".filtroBanca")];
      if(bancas.length < 2) return { bancas: bancas.length };
      bancas[0].checked = true; bancas[1].checked = true;
      const f = lerFiltrosPersonalizados();
      const so1 = buscarQuestoesPorFiltro(usuarioAtual().id, { bancas: [bancas[0].value] }).length;
      const dois = buscarQuestoesPorFiltro(usuarioAtual().id, f).length;
      document.querySelectorAll(".filtroTipoProva").forEach(el => { el.checked = true; });
      return { bancas: bancas.length, escolhidas: f.bancas.length, tipos: lerFiltrosPersonalizados().tiposProva.length, so1, dois };
    });
    assert.ok(r.bancas >= 2);
    assert.equal(r.escolhidas, 2);
    assert.equal(r.tipos, 2);
    assert.ok(r.dois >= r.so1);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("baralho inteiro de uma IA: confere, pula repetido, e entra só no baralho da pessoa", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno");
      navigate("flashcards");
      const botao = !!document.querySelector("[onclick='abrirAdicionarBaralho()']");
      abrirAdicionarBaralho();
      mudarPassoBaralhoIA("ia");
      const assunto = db.taxonomia.assuntos[0].id;
      // como a pessoa faria: preenche os campos da janela
      document.getElementById("baralhoAssunto").value = assunto;
      document.getElementById("baralhoQtd").value = "10";
      document.getElementById("baralhoTema").value = "tema de teste";
      guardarCamposBaralhoIA();
      const st = estadoBaralhoIA();
      const prompt = promptBaralhoIA();
      document.getElementById("baralhoTexto").value = "FRENTE: Pergunta um?\nVERSO: Resposta um.\nFONTE: Diretriz 2024\n---\nFRENTE: Pergunta dois?\nVERSO: Resposta dois.\n---\nFRENTE: Pergunta um?\nVERSO: repetida\n---\nFRENTE: Sem verso\n";
      guardarCamposBaralhoIA();
      const a = analisarBaralhoTrazido(st.texto, assunto, false);
      const antes = meusFlashcards(usuarioAtual().id).length;
      adicionarBaralhoIA();
      const meus = meusFlashcards(usuarioAtual().id);
      const outraVez = analisarBaralhoTrazido(st.texto || "FRENTE: Pergunta um?\nVERSO: x", assunto, false);
      return { botao, validos: a.validos.length, problemas: a.problemas.length, adicionados: meus.length - antes,
               assuntoOk: meus.every(c => c.assuntoId === assunto), pessoal: meus.every(c => c.usuarioId === usuarioAtual().id),
               promptTemTema: prompt.includes("tema de teste") && !prompt.includes("ASSUNTOS (use"),
               repetidoDeNovo: analisarBaralhoTrazido("FRENTE: Pergunta um?\nVERSO: x", assunto, false).validos.length };
    });
    assert.ok(r.botao);
    assert.equal(r.validos, 2); assert.equal(r.problemas, 2);
    assert.equal(r.adicionados, 2);
    assert.ok(r.assuntoOk && r.pessoal && r.promptTemTema);
    assert.equal(r.repetidoDeNovo, 0);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("grupo de estudo: divide as questões escolhidas só entre os participantes", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno");
      const u = usuarioAtual();
      const outro = { id: "u-colega", nome: "Colega Teste", email: "c@x", papel: "aluno", status: "aprovado" };
      const terceiro = { id: "u-terceiro", nome: "Terceiro Teste", email: "t@x", papel: "aluno", status: "aprovado" };
      db.usuarios.push(outro, terceiro);
      const g = { id: "g-teste", nome: "Turma teste", criadoPor: u.id, membrosAprovados: [u.id, outro.id, terceiro.id], solicitacoesPendentes: [], deslocamento: 0, blocosProprios: [], anoFaculdade: u.anoFaculdade };
      db.grupos.push(g); u.grupoId = g.id;
      ["A","B","C","D"].forEach((l, i) => db.questoes.push({ id: "q-sg-"+i, grupoId: g.id, banca: i<3 ? "Lista X" : "Lista Y", ano: 2026, status: "ativa", real: true, assuntoId: db.taxonomia.assuntos[0].id, enunciado: "e", alternativas: [], gabarito: "A" }));
      navigate("meu-grupo");
      const integrantes = (document.body.innerHTML.match(/Integrantes do grupo \((\d+)\)/) || [])[1];
      abrirFormularioSubgrupo(null);
      document.getElementById("sgNome").value = "Dupla";
      document.querySelectorAll(".sgMembro").forEach(el => { el.checked = el.value !== terceiro.id; });
      document.querySelectorAll(".sgConjunto").forEach(el => { el.checked = el.value.startsWith("Lista X"); });
      salvarSubgrupo("");
      const sg = db.subgrupos[0];
      const cont = Object.values(sg.divisao).reduce((m, id) => (m[id] = (m[id]||0)+1, m), {});
      return { integrantes, qtd: sg.questaoIds.length, cont, terceiro: terceiro.id, outro: outro.id, eu: u.id,
               minhaParte: minhaParteDoSubgrupo(sg, u.id).length, daTerceiro: minhaParteDoSubgrupo(sg, terceiro.id).length };
    });
    assert.equal(r.integrantes, "3");
    assert.equal(r.qtd, 3);
    assert.equal(r.cont[r.terceiro], undefined);
    assert.equal(r.cont[r.eu] + r.cont[r.outro], 3);
    assert.equal(r.daTerceiro, 0);
    assert.ok(r.minhaParte >= 1);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("o gráfico de 'Como você está indo' tem os números ao lado", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno");
      navigate("desempenho");
      return { lateral: !!document.querySelector(".grafico-com-lateral .grafico-lateral .stat-tile"), principal: !!document.querySelector(".grafico-com-lateral .grafico-principal") };
    });
    assert.ok(r.lateral && r.principal);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
