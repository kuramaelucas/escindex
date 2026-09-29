/* Rodada de ajustes: tags da questão só depois de responder, imagem entre o
   enunciado e as alternativas, questões retiradas da revisão em Favoritos,
   regras da revisão espaçada (não vistas, depois erros; mês mínimo entre
   acertos; três acertos e a questão sai), grupos (sem letra → bloco de início,
   mudar o nome, formado sem calendário, calendário próprio, dividir questões)
   e o painel de avisos da coordenação — sem nuvem e com uma nuvem de mentira. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem, comNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); comNuvem = await subirServidor(); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); await comNuvem?.fechar(); });

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

test("questão em aberto não mostra área, assunto nem dificuldade; a imagem vem entre o enunciado e as alternativas", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const q = Object.assign({}, db.questoes.find(x => x.status === "ativa" && x.real),
        { imagemUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==" });
      const assunto = nomeAssunto(q.assuntoId);
      const aberta = renderQuestionCard(q, {});
      const simulado = renderQuestionCard(q, { modoSimulado: true, selecionada: "A" });
      const respondida = renderQuestionCard(q, { respondida: true, selecionada: q.gabarito });
      const ordem = html => [html.indexOf("qcard-enunciado"), html.indexOf("qcard-img-wrap"), html.indexOf("qcard-alts")];
      return {
        assunto,
        abertaTemAssunto: aberta.includes(">" + assunto.replace(/&/g, "&amp;") + "<"), simuladoTemAssunto: simulado.includes(">" + assunto.replace(/&/g, "&amp;") + "<"),
        abertaTemDificuldade: /Difícil|Fácil|Intermediária|Média|Muito/.test(aberta.split('class="qcard-enunciado"')[0]),
        abertaTemBanca: aberta.includes(q.banca.replace(/&/g, "&amp;")),
        respondidaTemAssunto: respondida.includes(">" + assunto.replace(/&/g, "&amp;") + "<"),
        respondidaTemDificuldade: respondida.includes(rotuloDificuldade(calcularDificuldade(q))),
        ordemAberta: ordem(aberta), ordemRespondida: ordem(respondida),
        explica: /depois que você responder/.test(aberta),
      };
    });
    assert.equal(r.abertaTemAssunto, false);
    assert.equal(r.simuladoTemAssunto, false);
    assert.equal(r.abertaTemDificuldade, false);
    assert.ok(r.abertaTemBanca, "a origem da questão (banca e ano) continua à vista");
    assert.ok(r.respondidaTemAssunto && r.respondidaTemDificuldade, "respondida, as tags aparecem");
    assert.ok(r.explica, "a tela diz por que as tags não estão lá");
    for(const [enun, img, alts] of [r.ordemAberta, r.ordemRespondida]){
      assert.ok(enun >= 0 && enun < img && img < alts, "ordem: enunciado, imagem, alternativas");
    }
  } finally { await contexto.close(); }
});

test("as questões retiradas da revisão ficam em Favoritos e voltam com um clique", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      const q = db.questoes.find(x => x.status === "ativa" && x.real);
      const errada = q.gabarito === "A" ? "B" : "A";
      registrarResposta(u.id, q.id, errada, "duvida", 5); registrarResposta(u.id, q.id, errada, "duvida", 5);
      alternarQuestaoOcultaUI(q.id);
      navigate("favoritos");
      const abas = document.getElementById("app").innerText;
      state.filtroRota.abaFavoritos = "retiradas"; render();
      const aba = document.getElementById("app").innerText;
      const revisao = (navigate("revisao"), document.getElementById("app").innerText);
      const antes = questaoOculta(u.id, q.id);
      state.filtroRota.abaFavoritos = "retiradas"; navigate("favoritos");
      alternarQuestaoOcultaUI(q.id);
      return { abas, aba, revisao, antes, depois: questaoOculta(u.id, q.id), vazia: document.getElementById("app").innerText };
    });
    assert.match(r.abas, /Retiradas da revisão \(1\)/);
    assert.match(r.aba, /Voltar a mostrar/);
    assert.match(r.revisao, /Favoritos > Retiradas da revisão/);
    assert.equal(r.antes, true);
    assert.equal(r.depois, false);
    assert.match(r.vazia, /Retiradas da revisão \(0\)/);
  } finally { await contexto.close(); }
});

test("revisão espaçada: não vistas, depois erros, depois acertos vencidos — e o acerto só volta em um mês", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      u.anoFaculdade = "Formado(a)";          // sem calendário: a revisão olha os assuntos em que já respondeu
      const dia = iso => { CONFIG.hoje = () => new Date(iso + "T12:00:00"); };
      // três questões do mesmo assunto: uma vai ser acertada, uma errada, uma nunca vista
      const porAssunto = {};
      questoesAtivas().forEach(q => { (porAssunto[q.assuntoId] = porAssunto[q.assuntoId] || []).push(q); });
      const [certa, errada, nova] = Object.values(porAssunto).find(l => l.length >= 3);
      const marcarErro = q => (q.gabarito === "A" ? "B" : "A");
      dia("2026-03-01");
      registrarResposta(u.id, certa.id, certa.gabarito, "certeza", 5);
      registrarResposta(u.id, errada.id, marcarErro(errada), "certeza", 5);
      const e1 = db.revisoes[u.id][certa.id], e2 = db.revisoes[u.id][errada.id];
      const primeiro = { intervalo: e1.intervalo, prox: e1.proximaRevisao, intervaloErro: e2.intervalo };
      dia("2026-03-30"); const venceEm29 = revisaoVencida(u.id, certa.id);
      dia("2026-03-31"); const venceEm30 = revisaoVencida(u.id, certa.id);
      // a fila, no dia 31: nova → erro → acerto que já venceu
      const itens = itensDaRevisaoEspacada(u.id, 200);
      const ordemMotivos = itens.map(i => /ainda não viu/.test(i.motivo) ? 0 : /erro/.test(i.motivo) ? 1 : 2);
      const ordenada = ordemMotivos.every((v, i) => i === 0 || ordemMotivos[i - 1] <= v);
      const posicoes = { nova: itens.findIndex(i => i.questaoId === nova.id), erro: itens.findIndex(i => i.questaoId === errada.id), certa: itens.findIndex(i => i.questaoId === certa.id) };
      // segundo acerto seguido: 60 dias; o terceiro aposenta a questão
      registrarResposta(u.id, certa.id, certa.gabarito, "certeza", 5);
      const segundo = db.revisoes[u.id][certa.id].intervalo;
      registrarResposta(u.id, certa.id, certa.gabarito, "duvida", 5);
      saveState();
      dia("2028-01-01");
      const dominada = { dominada: questaoDominada(u.id, certa.id), vencida: revisaoVencida(u.id, certa.id),
        naLista: questoesRevisaoEspacadaVencidas(u.id).some(v => v.questao.id === certa.id), naFila: itensDaRevisaoEspacada(u.id, 500).some(i => i.questaoId === certa.id) };
      // errar zera a conta e a questão volta logo
      registrarResposta(u.id, certa.id, marcarErro(certa), "duvida", 5);
      const aposErro = { dominada: questaoDominada(u.id, certa.id), intervalo: db.revisoes[u.id][certa.id].intervalo };
      // acerto no chute continua voltando cedo e não conta como acerto firme
      registrarResposta(u.id, nova.id, nova.gabarito, "chute", 5);
      const chute = { intervalo: db.revisoes[u.id][nova.id].intervalo, firmes: acertosFirmesSeguidos(respostasDaQuestao(u.id, nova.id)) };
      const tela = (navigate("revisao"), document.getElementById("app").innerText);
      return { primeiro, venceEm29, venceEm30, ordenada, posicoes, segundo, dominada, aposErro, chute, tela };
    });
    assert.equal(r.primeiro.intervalo, 30, "primeiro acerto seguro: um mês");
    assert.equal(r.primeiro.prox, "2026-03-31");
    assert.equal(r.primeiro.intervaloErro, 7, "errar volta em uma semana, nunca antes");
    assert.equal(r.venceEm29, false);
    assert.equal(r.venceEm30, true);
    assert.ok(r.ordenada, "não vistas antes de erros, erros antes de acertos vencidos");
    assert.ok(r.posicoes.nova >= 0 && r.posicoes.nova < r.posicoes.erro && r.posicoes.erro < r.posicoes.certa, JSON.stringify(r.posicoes));
    assert.equal(r.segundo, 60);
    assert.deepEqual(r.dominada, { dominada: true, vencida: false, naLista: false, naFila: false });
    assert.deepEqual(r.aposErro, { dominada: false, intervalo: 7 });
    assert.equal(r.chute.intervalo, 7, "acerto no chute também espera a semana mínima");
    assert.equal(r.chute.firmes, 0);
    assert.match(r.tela, /ainda não viu/);
    assert.match(r.tela, /3 acertos seguidos/);
  } finally { await contexto.close(); }
});

test("revisão espaçada: assunto em que a pessoa vai bem alonga o intervalo, e um prazo curto antigo não vale depois de acerto seguro", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      CONFIG.hoje = () => new Date("2026-05-01T12:00:00");
      const porAssunto = {};
      questoesAtivas().forEach(q => { (porAssunto[q.assuntoId] = porAssunto[q.assuntoId] || []).push(q); });
      const lista = Object.values(porAssunto).find(l => l.length >= 2);
      const [a, b] = lista;
      // dez respostas certas seguidas no assunto (todas em outras datas): taxa 100%
      for(let i = 0; i < 10; i++) db.respostas.push({ id: "bonus" + i, usuarioId: u.id, questaoId: "outra" + i, areaId: a.areaId, assuntoId: a.assuntoId, correta: true, confianca: "certeza", data: "2026-04-" + String(10 + i).padStart(2, "0") });
      registrarResposta(u.id, a.id, a.gabarito, "certeza", 5);
      const forte = db.revisoes[u.id][a.id].intervalo;
      // uma revisão antiga, guardada com prazo de 7 dias depois de um acerto seguro
      db.revisoes[u.id][b.id] = { repeticoes: 2, fator: 2.5, intervalo: 7, proximaRevisao: "2026-05-08", ultimaConfianca: "certeza", ultimaCorreta: true, ultimaData: "2026-05-01" };
      CONFIG.hoje = () => new Date("2026-05-09T12:00:00");
      const antigaVenceu = revisaoVencida(u.id, b.id);
      CONFIG.hoje = () => new Date("2026-05-31T12:00:00");
      return { forte, antigaVenceu, antigaAos30: revisaoVencida(u.id, b.id) };
    });
    assert.equal(r.forte, 60, "30 dias × 2 em assunto com mais de 85% de acerto");
    assert.equal(r.antigaVenceu, false, "o piso de um mês vale também para o que já estava guardado");
    assert.equal(r.antigaAos30, true);
  } finally { await contexto.close(); }
});

test("grupo sem letra é identificado pelo bloco de início; o nome pode ser mudado; o do rodízio, não", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      u.anoFaculdade = "4º ano";
      const seq = db.sequenciasAno["4º ano"];
      const comLetra = opcoesRodizioPorLetra("4º ano").map(tituloOpcaoRodizio);
      // um ano sem letras no calendário: só a ordem dos blocos, contada pela plataforma
      const copia = JSON.parse(JSON.stringify(seq)); copia.forEach(b => delete b.grupoRodizio);
      db.sequenciasAno["4º ano"] = copia;
      const semLetra = opcoesRodizioPorLetra("4º ano").map(tituloOpcaoRodizio);
      const nomeSemLetra = nomeRodizio("4º ano", 1);
      navigate("meu-grupo");
      const tela = document.getElementById("app").innerText;
      // criar sem nome: o nome vira o bloco de início
      document.getElementById("novoGrupoNome").value = "";
      document.getElementById("novoGrupoRodizio").value = "2";
      criarMeuGrupo();
      const g = getGrupoDoUsuario(u);
      const criado = { nome: g.nome, auto: g.nomeAutomatico, dono: g.criadoPor === u.id };
      // mudar o nome
      abrirRenomearGrupo(g.id);
      document.getElementById("renomearGrupoNome").value = "Turma do Fulano";
      salvarNomeDoGrupo(g.id);
      const renomeado = { nome: g.nome, auto: g.nomeAutomatico, botao: /Mudar o nome do grupo/.test(document.getElementById("app").innerText) };
      // o outro aluno não renomeia
      const outro = { id: "u-outro", papel: "aluno", nome: "Outro", status: "aprovado", anoFaculdade: "4º ano" };
      db.usuarios.push(outro);
      const podeOutro = podeRenomearGrupo(g, outro);
      // turma do rodízio: id decide o nome, não se renomeia
      const rod = turmaDoRodizio("4º ano", 1);
      return { comLetra, semLetra, nomeSemLetra, telaTemLetraInventada: /Grupo [A-J] —/.test(tela.split("Criar")[0] || ""), criado, renomeado, podeOutro, podeRodizio: podeRenomearGrupo(rod, u) };
    });
    assert.ok(r.comLetra.every(t => /^Grupo [A-Z] — começa em /.test(t)), r.comLetra.join("|"));
    assert.ok(r.semLetra.every(t => /^Começa em /.test(t)), r.semLetra.join("|"));
    assert.match(r.nomeSemLetra, /^Começa em /);
    assert.match(r.criado.nome, /^4º ano — Começa em /);
    assert.equal(r.criado.auto, true);
    assert.deepEqual(r.renomeado, { nome: "Turma do Fulano", auto: false, botao: true });
    assert.equal(r.podeOutro, false);
    assert.equal(r.podeRodizio, false);
  } finally { await contexto.close(); }
});

test("formado não tem calendário: cria grupo com calendário próprio, divide questões e a sessão não quebra", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      u.anoFaculdade = "Formado(a)"; u.grupoId = db.grupoOficialId;
      const semBloco = { bloco: getBlocoAtual(u), blocos: blocosDoGrupo(getGrupoDoUsuario(u), u).length };
      const telas = {};
      ["inicio", "estudar", "simulados", "meu-grupo", "perfil"].forEach(rota => { navigate(rota); telas[rota] = document.getElementById("app").innerText; });
      const sessaoSemCalendario = montarSessaoRecomendada(u.id, 20);
      // criar o grupo: só há calendário próprio, e o nome é obrigatório
      navigate("meu-grupo");
      const tiposOferecidos = [...document.getElementById("novoGrupoTipo").options].map(o => o.value);
      criarMeuGrupo();
      const semNome = !getGrupoDoUsuario(u).blocosProprios;
      document.getElementById("novoGrupoNome").value = "Residência 2027";
      criarMeuGrupo();
      const g = getGrupoDoUsuario(u);
      const criado = { proprio: Array.isArray(g.blocosProprios), vazio: g.blocosProprios.length, bloco: getBlocoAtual(u) };
      // montar o calendário do grupo
      const espIds = db.taxonomia.especialidades.slice(0, 2).map(e => e.id);
      abrirFormularioBlocoProprio(g.id, null);
      document.getElementById("fbpNome").value = "Cirurgia";
      document.getElementById("fbpInicio").value = "2000-01-01"; document.getElementById("fbpFim").value = "2999-12-31";
      document.querySelectorAll(".fbpEsp").forEach(el => { el.checked = espIds.includes(el.value); });
      salvarBlocoProprio(g.id, "");
      const comBloco = { n: g.blocosProprios.length, atual: (getBlocoAtual(u) || {}).nome, sessao: montarSessaoRecomendada(u.id, 12).length };
      navigate("inicio");
      const inicio = document.getElementById("app").innerText;
      // dividir as questões do grupo entre dois membros
      const colega = { id: "u-colega", papel: "aluno", nome: "Colega Z", status: "aprovado", anoFaculdade: "Formado(a)" };
      db.usuarios.push(colega); entrarNoGrupo(colega, g.id); u.grupoId = g.id; entrarNoGrupo(u, g.id);
      const base = db.questoes.find(q => q.status === "ativa" && q.real);
      for(let i = 0; i < 5; i++) db.questoes.push(Object.assign(copiaProfunda(base), { id: "q-grupo-" + i, grupoId: g.id, real: false }));
      dividirQuestoesDoGrupo(g.id);
      const minhas = minhaParteDoGrupo(g, u.id).length, dele = minhaParteDoGrupo(g, colega.id).length;
      navigate("meu-grupo");
      const telaGrupo = document.getElementById("app").innerText;
      desfazerDivisaoDoGrupo(g.id);
      return { semBloco, telas, sessaoSemCalendario: sessaoSemCalendario.length, tiposOferecidos, semNome, criado, comBloco, inicio, minhas, dele, telaGrupo, aposDesfazer: minhaParteDoGrupo(g, u.id).length };
    });
    assert.deepEqual(r.semBloco, { bloco: null, blocos: 0 });
    assert.match(r.telas.inicio, /Você não segue um calendário de blocos/);
    assert.match(r.telas["meu-grupo"], /Entre num grupo ou crie o seu/);
    assert.equal(r.sessaoSemCalendario, 20);
    assert.deepEqual(r.tiposOferecidos, ["proprio"]);
    assert.equal(r.semNome, true, "sem nome não cria");
    assert.deepEqual(r.criado, { proprio: true, vazio: 0, bloco: null });
    assert.deepEqual([r.comBloco.n, r.comBloco.atual, r.comBloco.sessao], [1, "Cirurgia", 12]);
    assert.match(r.inicio, /Bloco atual: Cirurgia/);
    assert.equal(r.minhas + r.dele, 5);
    assert.ok(Math.abs(r.minhas - r.dele) <= 1, "divisão equilibrada");
    assert.match(r.telaGrupo, /Praticar minha parte/);
    assert.match(r.telaGrupo, /Responsável/);
    assert.equal(r.aposDesfazer, 0);
    assert.deepEqual(erros, [], "nenhuma tela quebrou");
  } finally { await contexto.close(); }
});

test("avisos da coordenação (sem nuvem): chega a quem é o destinatário, some ao dispensar ou vencer", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLogin("admin@esc.demo", "admin123"); fecharModal();
      const admin = usuarioAtual();
      navigate("enviar-avisos");
      const noMenu = navItemsParaPapel("admin").some(i => i.id === "enviar-avisos");
      document.getElementById("avTitulo").value = "Simulado abre segunda";
      document.getElementById("avTexto").value = "Prepare-se.\nBoa sorte!";
      document.querySelector('.avPapel[value="aluno"]').checked = true;
      document.querySelector('.avAno[value="6º ano"]').checked = true;
      document.getElementById("avRota").value = "simulados";
      enviarAviso();
      const enviados = document.getElementById("app").innerText;
      document.getElementById("avTitulo").value = "Vencido"; document.getElementById("avTexto").value = "x"; enviarAviso();
      db.avisos.find(a => a.titulo === "Vencido").expiraEm = "2000-01-01";
      const aluno = db.usuarios.find(u => u.papel === "aluno"); aluno.anoFaculdade = "6º ano";
      const quintoAno = { id: "u-5", papel: "aluno", nome: "Quinto", status: "aprovado", anoFaculdade: "5º ano" };
      const prof = db.usuarios.find(u => u.papel === "professor");
      const chega = { aluno6: avisosNaoLidos(aluno).map(a => a.titulo), aluno5: avisosNaoLidos(quintoAno).map(a => a.titulo), prof: prof ? avisosNaoLidos(prof).map(a => a.titulo) : [], autor: avisosNaoLidos(admin).map(a => a.titulo) };
      // o aluno vê no Início e dispensa
      fazerLogout(); fazerLogin(aluno.email, "aluno123"); fecharModal(); navigate("inicio");
      const inicio = document.getElementById("app").innerText;
      const idAviso = db.avisos.find(a => a.titulo === "Simulado abre segunda").id;
      dispensarAviso(idAviso);
      const depois = document.getElementById("app").innerText;
      // um aluno não abre o painel
      navigate("enviar-avisos");
      const acesso = document.getElementById("app").innerText;
      return { noMenu, enviados, chega, inicio, depois, lido: aluno.avisosLidos, acesso, restantes: avisosNaoLidos(aluno).length };
    });
    assert.ok(r.noMenu);
    assert.match(r.enviados, /Avisos enviados \(1\)|Avisos enviados \(2\)/);
    assert.deepEqual(r.chega.aluno6, ["Simulado abre segunda"]);
    assert.deepEqual(r.chega.aluno5, []);
    assert.deepEqual(r.chega.prof, []);
    assert.deepEqual(r.chega.autor, [], "quem escreve já tem o aviso como lido (e o dele não é para administradores)");
    assert.match(r.inicio, /Avisos da coordenação/);
    assert.match(r.inicio, /Simulado abre segunda/);
    assert.doesNotMatch(r.depois, /Simulado abre segunda/);
    assert.equal(r.restantes, 0);
    assert.match(r.acesso, /Acesso restrito/);
  } finally { await contexto.close(); }
  assert.deepEqual(erros, []);
});

/* ------- com a nuvem: o aviso sobe, chega ao outro aparelho e a leitura volta ------- */
const ADMIN = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
const ALUNA = "11111111-2222-3333-4444-555555555555";
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const token = id => b64({ alg: "HS256" }) + "." + b64({ sub: id, exp: 9999999999 }) + ".assinatura";

async function abrirNaNuvem(banco, { id, papel, nome, ano = "6º ano" }){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  const perfil = { id, nome, email: nome.split(" ")[0].toLowerCase() + "@turma.br", papel, status: "aprovado", ano_faculdade: ano, nivel_admin: papel === "admin" ? "coordenacao" : null, boas_vindas_em: "2026-09-01" };
  await contexto.route(/supabase\.co/, async rota => {
    const req = rota.request();
    const url = new URL(req.url());
    const busca = new URLSearchParams(url.search);
    banco.pedidos.push({ quem: id, metodo: req.method(), caminho: url.pathname, corpo: req.postData() });
    const json = (dados, status = 200) => rota.fulfill({ status, contentType: "application/json", body: JSON.stringify(dados) });
    if(url.pathname === "/rest/v1/avisos"){
      if(req.method() === "POST"){
        JSON.parse(req.postData()).forEach(l => {
          // o RLS de mentira: só o administrador grava
          if(papel !== "admin") return;
          banco.avisos.set(l.id, Object.assign({}, banco.avisos.get(l.id) || {}, l, { atualizado_em: new Date(banco.relogio += 1000).toISOString() }));
        });
        return rota.fulfill({ status: papel === "admin" ? 201 : 403, contentType: "application/json", body: papel === "admin" ? "" : JSON.stringify({ message: "new row violates row-level security policy" }) });
      }
      const desde = (busca.get("atualizado_em") || "gt.1970").slice(3);
      return json([...banco.avisos.values()].filter(l => l.atualizado_em > desde));
    }
    if(url.pathname === "/rest/v1/perfis" && req.method() === "GET") return json([perfil]);
    if(url.pathname.startsWith("/rest/v1/rpc/")) return json([]);
    if(url.pathname.startsWith("/rest/v1/")) return req.method() === "GET" ? json([]) : rota.fulfill({ status: 201, body: "" });
    if(url.pathname.startsWith("/auth/v1/")) return json({});
    return rota.abort();
  });
  await contexto.addInitScript(s => localStorage.setItem("esc_nuvem_sessao", JSON.stringify(s)),
    { token: token(id), refresh: "r1", usuarioId: id, email: perfil.email });
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(comNuvem.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  await pagina.evaluate(async p => {
    const u = nuvemAplicarPerfilLocal(p);
    state.usuarioAtualId = u.id;
    while(nuvemEstado.sincronizando) await new Promise(ok => setTimeout(ok, 50));
  }, perfil);
  return { pagina, contexto, erros };
}
const sincronizar = p => p.evaluate(async () => {
  while(nuvemEstado.sincronizando) await new Promise(ok => setTimeout(ok, 50));
  await nuvemSincronizarAgora();
});

test("avisos com nuvem: o administrador envia, a aluna recebe em outro aparelho, dispensa e a leitura sobe no perfil", async () => {
  const banco = { avisos: new Map(), pedidos: [], relogio: Date.parse("2026-09-29T12:00:00Z") };
  const admin = await abrirNaNuvem(banco, { id: ADMIN, papel: "admin", nome: "Ana Admin" });
  const aluna = await abrirNaNuvem(banco, { id: ALUNA, papel: "aluno", nome: "Bia Aluna" });
  try {
    await admin.pagina.evaluate(() => {
      navigate("enviar-avisos");
      document.getElementById("avTitulo").value = "Manutenção no sábado";
      document.getElementById("avTexto").value = "A plataforma fica fora do ar de manhã.";
      enviarAviso();
    });
    await sincronizar(admin.pagina);
    const linha = [...banco.avisos.values()][0];
    assert.ok(linha, "o aviso deveria subir para a tabela avisos");
    assert.equal(linha.titulo, "Manutenção no sábado");
    assert.equal(linha.autor_nome, "Ana Admin");
    assert.deepEqual(linha.papeis, []);
    assert.equal(linha.removido, false);

    await sincronizar(aluna.pagina);
    const naAluna = await aluna.pagina.evaluate(() => { navigate("inicio"); return { texto: document.getElementById("app").innerText, n: avisosNaoLidos(usuarioAtual()).length }; });
    assert.equal(naAluna.n, 1);
    assert.match(naAluna.texto, /Manutenção no sábado/);
    // dispensar sobe no perfil (avisos_lidos), para não voltar em outro aparelho
    await aluna.pagina.evaluate(id => dispensarAviso(id), linha.id);
    await sincronizar(aluna.pagina);
    const perfilEnviado = banco.pedidos.filter(p => p.quem === ALUNA && p.caminho === "/rest/v1/perfis" && p.corpo).map(p => p.corpo).join("\n");
    assert.match(perfilEnviado, /"avisos_lidos":\["[^"]+"\]/);
    // a aluna não consegue gravar aviso (o banco recusa) — e a plataforma nem tenta enfileirar
    const tentou = await aluna.pagina.evaluate(() => nuvemMarcarAviso("aviso-que-nao-existe") && (db.nuvem.globaisPendentes || []).some(p => p.tabela === "avisos"));
    assert.equal(tentou, false);

    // o administrador retira; a retirada desce para a aluna
    await admin.pagina.evaluate(id => retirarAvisoConfirmado(id), linha.id);
    await sincronizar(admin.pagina);
    assert.equal([...banco.avisos.values()][0].removido, true);
    await sincronizar(aluna.pagina);
    assert.equal(await aluna.pagina.evaluate(() => (db.avisos || []).filter(a => !a.removido).length), 0);
    assert.deepEqual([...admin.erros, ...aluna.erros], []);
  } finally { await admin.contexto.close(); await aluna.contexto.close(); }
});

test("flashcards: nenhum cartão volta antes de 7 dias, e o cartão antigo ganha o piso", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      CONFIG.hoje = () => new Date("2026-06-01T12:00:00");
      const intervalo = id => db.revisoesFlashcards[u.id][id].intervalo;
      registrarRevisaoFlashcard(u.id, "c1", "naolembrei");
      registrarRevisaoFlashcard(u.id, "c2", "quase");
      registrarRevisaoFlashcard(u.id, "c3", "sabia");
      const primeiro = [intervalo("c1"), intervalo("c2"), intervalo("c3")];
      registrarRevisaoFlashcard(u.id, "c3", "sabia");
      const segundo = intervalo("c3");
      db.revisoesFlashcards[u.id].c4 = { repeticoes: 0, fator: 2.5, intervalo: 1, proximaRevisao: "2026-06-02", ultimaData: "2026-06-01", vistas: 1 };
      CONFIG.hoje = () => new Date("2026-06-05T12:00:00");
      const antigoAos4 = cartaoVencido(u.id, "c4");
      CONFIG.hoje = () => new Date("2026-06-08T12:00:00");
      return { primeiro, segundo, antigoAos4, antigoAos7: cartaoVencido(u.id, "c4") };
    });
    assert.deepEqual(r.primeiro, [7, 7, 7]);
    assert.equal(r.segundo, 14);
    assert.equal(r.antigoAos4, false);
    assert.equal(r.antigoAos7, true);
  } finally { await contexto.close(); }
});
