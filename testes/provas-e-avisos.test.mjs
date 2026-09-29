/* Tipo de prova (residência × graduação), a prioridade do 3º e 4º ano, a
   figura anexada no envio em lote e o aviso de pedido de acesso. */
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
  await pagina.goto(semNuvem.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto };
}

// uma prova da graduação de 3 questões, com figura na 2ª
const PROVA_GRADUACAO = [
  "INSTITUICAO: Teste de Progresso", "ANO: 2025", "TIPO: Graduação", "===",
  "NUMERO: 1", "PERGUNTA: Qual é o principal agente da pneumonia comunitária típica em adultos?",
  "A: Streptococcus pneumoniae", "B: Pseudomonas aeruginosa", "C: Klebsiella pneumoniae", "D: Legionella pneumophila",
  "GABARITO: A", "EXPLICACAO: O pneumococo é o agente mais frequente.", "AREA: Clínica Médica", "ESPECIALIDADE: Pneumologia", "ASSUNTO: Pneumonia", "===",
  "NUMERO: 2", "PERGUNTA: Homem de 60 anos com dor torácica. Qual o diagnóstico do ECG a seguir?",
  "A: Infarto com supra de ST inferior", "B: Pericardite", "C: Bloqueio de ramo esquerdo", "D: Normal",
  "GABARITO: A", "EXPLICACAO: Supra de ST em DII, DIII e aVF.", "IMAGEM: sim — ECG com supra de ST em parede inferior", "AREA: Clínica Médica", "===",
  "NUMERO: 3", "PERGUNTA: Qual vacina é aplicada ao nascer no calendário brasileiro, junto com a BCG?",
  "A: Hepatite B", "B: Tríplice viral", "C: Febre amarela", "D: Pneumocócica 10",
  "GABARITO: A", "EXPLICACAO: A hepatite B é dada nas primeiras 24 horas.", "AREA: Pediatria",
].join("\n");

test("tipo de prova: residência é o padrão e o Teste de Progresso é graduação", async () => {
  const { pagina, contexto } = await abrir();
  const r = await pagina.evaluate(() => ({
    real: tipoProvaDe(getQuestao("q-unifesp2022-001")),
    progresso: tipoProvaDe({ banca: "Teste de Progresso 2024" }),
    marcada: tipoProvaDe({ banca: "UNIFESP-EPM", tipoProva: "graduacao" }),
    invalida: tipoProvaDe({ banca: "UNIFESP-EPM", tipoProva: "outra" }),
    textos: ["Graduação", "graduacao", "Teste de Progresso", "Residência", "R1", "qualquer"].map(normalizarTipoProva),
    todasResidencia: db.questoes.filter(q => q.real).every(q => tipoProvaDe(q) === "residencia"),
  }));
  assert.equal(r.real, "residencia");
  assert.equal(r.progresso, "graduacao");
  assert.equal(r.marcada, "graduacao");
  assert.equal(r.invalida, "residencia");
  assert.deepEqual(r.textos, ["graduacao", "graduacao", "graduacao", "residencia", "residencia", null]);
  assert.ok(r.todasResidencia);
  await contexto.close();
});

test("envio em lote: o tipo vem do cabeçalho, a figura anexada vai junto e a que falta espera", async () => {
  const { pagina, contexto } = await abrir();
  const r = await pagina.evaluate((texto) => {
    fazerLogin("professor@esc.demo", "prof123"); fecharModal();
    navigate("importar-questoes");
    document.getElementById("textoImportacao").value = texto;
    previsualizarImportacao();
    const previa = state.filtroRota.previewImportacao;
    const antes = {
      tipos: previa.map(x => x.tipoProva),
      indicadas: previa.map(x => x.imagemIndicada),
      descricao: previa[1].imagemDescricao,
      campoDeImagem: document.querySelectorAll("#previewImportacao .imp-imagem").length,
      faltaFigura: document.querySelectorAll("#previewImportacao .imp-imagem-falta").length,
    };
    // a figura da 2ª chega; a 1ª é "anexada" e depois tirada
    definirImagemImportacao(1, "data:image/png;base64,iVBORw0KGgo=");
    definirImagemImportacao(0, "https://exemplo.org/a.png");
    removerImagemImportacao(0);
    const depois = document.querySelectorAll("#previewImportacao .imp-imagem-falta").length;
    confirmarImportacao();
    const novas = db.questoes.filter(q => q.banca === "Teste de Progresso" && q.ano === 2025).sort((a, b) => a.numeroNaProva - b.numeroNaProva);
    return { antes, depois, n: novas.length,
      tipos: novas.map(q => q.tipoProva), imagem: novas[1].imagemUrl.slice(0, 10), pendente2: !!novas[1].imagemPendente,
      semImagem1: novas[0].imagemUrl };
  }, PROVA_GRADUACAO);
  assert.deepEqual(r.antes.tipos, ["graduacao", "graduacao", "graduacao"]);
  assert.deepEqual(r.antes.indicadas, [false, true, false]);
  assert.equal(r.antes.descricao, "ECG com supra de ST em parede inferior");
  assert.equal(r.antes.campoDeImagem, 3);
  assert.equal(r.antes.faltaFigura, 1);
  assert.equal(r.depois, 0);
  assert.equal(r.n, 3);
  assert.deepEqual(r.tipos, ["graduacao", "graduacao", "graduacao"]);
  assert.equal(r.imagem, "data:image");
  assert.equal(r.pendente2, false);
  assert.equal(r.semImagem1, "");
  await contexto.close();
});

test("trocar o tipo no passo 1 não apaga o texto colado nem as figuras já anexadas", async () => {
  const { pagina, contexto } = await abrir();
  const r = await pagina.evaluate((texto) => {
    fazerLogin("professor@esc.demo", "prof123"); fecharModal();
    navigate("importar-questoes");
    const semTipo = texto.replace("TIPO: Graduação\n", "").replace("INSTITUICAO: Teste de Progresso", "INSTITUICAO: Faculdade X");
    document.getElementById("textoImportacao").value = semTipo;
    previsualizarImportacao();
    const antes = state.filtroRota.previewImportacao.map(x => x.tipoProva);
    definirImagemImportacao(1, "data:image/png;base64,iVBORw0KGgo=");
    document.getElementById("impTipoProva").value = "graduacao";
    mudarTipoProvaImportacao("graduacao");
    return { antes, depois: state.filtroRota.previewImportacao.map(x => x.tipoProva),
      texto: document.getElementById("textoImportacao").value === semTipo,
      figura: !!document.querySelector("#previewImportacao .imp-imagem-previa"),
      instituicao: document.getElementById("impInstituicao").value,
      prompt: /GRADUAÇÃO em Medicina/.test(document.getElementById("promptImportacaoTexto").value) };
  }, PROVA_GRADUACAO);
  assert.deepEqual(r.antes, ["residencia", "residencia", "residencia"]);
  assert.deepEqual(r.depois, ["graduacao", "graduacao", "graduacao"]);
  assert.ok(r.texto && r.figura && r.prompt);
  assert.equal(r.instituicao, "Teste de Progresso");
  await contexto.close();
});

test("figura dita e não anexada: a questão entra aguardando imagem, fora do estudo", async () => {
  const { pagina, contexto } = await abrir();
  const r = await pagina.evaluate((texto) => {
    fazerLogin("professor@esc.demo", "prof123"); fecharModal();
    const resultado = parseImportText(texto, { instituicao: "x", ano: 2025, tipoProva: "residencia" });
    const feito = importarItensAnalisados(resultado, "ativa");
    const q = getQuestao(feito.ids[1]);
    return { aguardando: feito.aguardandoImagem, pendente: q.imagemPendente, ativa: questoesAtivas(true).some(x => x.id === q.id) };
  }, PROVA_GRADUACAO);
  assert.equal(r.aguardando, 1);
  assert.equal(r.pendente, "ECG com supra de ST em parede inferior.");
  assert.equal(r.ativa, false);
  await contexto.close();
});

test("central de provas: tipo da carga, figura guardada com o lote e o botão de publicar não se perde", async () => {
  const { pagina, contexto } = await abrir();
  const r = await pagina.evaluate((texto) => {
    fazerLogin("professor@esc.demo", "prof123"); fecharModal();
    navigate("central-provas");
    document.getElementById("cpTipoProva").value = "graduacao";
    document.getElementById("cpInstituicao").value = "Teste de Progresso";
    document.getElementById("cpAno").value = "2024";
    document.getElementById("cpTotal").value = "3";
    criarCargaProva();
    const carga = cargasProvas().find(c => c.instituicao === "Teste de Progresso" && c.ano === 2024);
    const lote = carga.lotes[0];
    const modelo = modeloConstrucaoLote(carga, lote);
    abrirLoteProva(carga.id, lote.id);
    document.getElementById("textoLote-" + lote.id).value = texto.replace("ANO: 2025", "ANO: 2024");
    conferirLoteProva(carga.id, lote.id);
    definirImagemImportacao(1, "data:image/png;base64,iVBORw0KGgo=");
    alternarImportacaoItem(2); alternarImportacaoItem(2);   // redesenha a pré-visualização
    const botao = document.querySelector("#previewImportacao .btn-primary:last-child").getAttribute("onclick");
    // fecha e reabre o lote: a figura continua lá
    abrirLoteProva(carga.id, lote.id); abrirLoteProva(carga.id, lote.id);
    const reaberta = state.filtroRota.previewImportacao[1].imagemUrl.slice(0, 10);
    publicarLoteProva(carga.id, lote.id);
    const novas = db.questoes.filter(q => q.banca === "Teste de Progresso" && q.ano === 2024);
    return { tipo: carga.tipoProva, modelo, botao, reaberta, n: novas.length, tipos: [...new Set(novas.map(q => q.tipoProva))],
      comImagem: novas.filter(q => q.imagemUrl).length, imagensDoLote: lote.imagens };
  }, PROVA_GRADUACAO);
  assert.equal(r.tipo, "graduacao");
  assert.match(r.modelo, /prova pública da GRADUAÇÃO em Medicina/);
  assert.match(r.modelo, /TIPO: Graduação/);
  assert.match(r.botao, /publicarLoteProva/);
  assert.equal(r.reaberta, "data:image");
  assert.equal(r.n, 3);
  assert.deepEqual(r.tipos, ["graduacao"]);
  assert.equal(r.comImagem, 1);
  assert.equal(r.imagensDoLote, undefined);
  await contexto.close();
});

test("3º e 4º ano: a prova da graduação vem primeiro em Provas Antigas", async () => {
  const { pagina, contexto } = await abrir();
  const r = await pagina.evaluate((texto) => {
    fazerLogin("professor@esc.demo", "prof123"); fecharModal();
    importarItensAnalisados(parseImportText(texto, {}), "ativa");
    fazerLogout();
    fazerLoginDemo("aluno"); fecharModal();
    const u = usuarioAtual();
    const ordem = ano => {
      u.anoFaculdade = ano; filtrosProvas().tipo = ""; navigate("provas-antigas");
      return state.filtroRota.provasGrupos[0].tipo;
    };
    const ordem3 = ordem("3º ano"), ordem4 = ordem("4º ano"), ordem6 = ordem("6º ano");
    const grad = db.questoes.find(q => q.banca === "Teste de Progresso" && q.numeroNaProva === 1);
    u.anoFaculdade = "3º ano"; navigate("provas-antigas");
    const secoes = [...document.querySelectorAll("#conteudoPagina .card-title")].map(e => e.textContent).filter(t => /^Provas d/.test(t.trim()));
    return { ordem3, ordem4, ordem6, gradId: grad.id, aviso: !!document.body.textContent.match(/estas vêm primeiro/),
      prefere3: tipoProvaPreferido({ anoFaculdade: "3º ano" }), prefere5: tipoProvaPreferido({ anoFaculdade: "5º ano" }),
      primeiraSecao: (secoes[0] || "").trim().slice(0, 19) };
  }, PROVA_GRADUACAO);
  assert.equal(r.ordem3, "graduacao");
  assert.equal(r.ordem4, "graduacao");
  assert.equal(r.ordem6, "residencia");
  assert.ok(r.aviso);
  assert.equal(r.prefere3, "graduacao");
  assert.equal(r.prefere5, null);
  assert.equal(r.primeiraSecao, "Provas da graduação");
  await contexto.close();
});

test("pedido de acesso novo avisa quem aprova cadastros, uma vez só, e aparece no menu", async () => {
  const { pagina, contexto } = await abrir();
  const r = await pagina.evaluate(async () => {
    fazerLogin("admin@esc.demo", "admin123"); fecharModal();
    const eu = usuarioAtual();
    db.usuarios.push({ id: "u-pedido-teste", nome: "Fulana de Teste", email: "fulana@teste", matricula: "999", senha: "abcd", papel: "aluno", status: "pendente", anoFaculdade: "3º ano", criadoEm: hojeISO() });
    saveState();
    const toasts = () => [...document.querySelectorAll("#toastContainer .toast")].map(t => t.textContent);
    await checarPedidosDeAcesso();
    const primeiro = toasts().filter(t => /pedido de acesso/i.test(t));
    await checarPedidosDeAcesso();
    const segundo = toasts().filter(t => /pedido de acesso/i.test(t));
    const menu = document.querySelector("#sidebarMenu").textContent;
    const notifs = gerarNotificacoes(eu).map(n => n.texto);
    navigate("aprovar-cadastros");
    const cartao = !!document.body.textContent.match(/Avisos de novos pedidos/);
    return { primeiro, segundo: segundo.length, menu, notifs, avisados: eu.cadastrosAvisados, cartao,
      alunoNaoVe: podeAprovarCadastros({ papel: "aluno" }) };
  });
  assert.equal(r.primeiro.length, 1);
  assert.match(r.primeiro[0], /Fulana de Teste \(3º ano\)/);
  assert.equal(r.segundo, 1, "o mesmo pedido não avisa duas vezes");
  assert.match(r.menu, /Aprovar Cadastros\s*1/);
  assert.ok(r.notifs.some(t => /1 pedido de acesso aguardando/.test(t)));
  assert.ok(r.avisados.includes("u-pedido-teste"));
  assert.ok(r.cartao);
  assert.equal(r.alunoNaoVe, false);
  await contexto.close();
});
