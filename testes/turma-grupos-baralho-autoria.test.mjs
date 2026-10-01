/* Rodada de 02/10/2026: tela Turma (painel + pedidos de acesso + usuários numa só), coluna
   Condição, aviso de pedido para entrar no grupo, retirar alguém do grupo e do grupo de
   estudo, "Criar minha lista"/"Criar meu baralho", questão centralizada e autoria da questão
   enviada por aluno. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(); servidor = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

async function abrir(viewport){
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: viewport || { width: 1280, height: 800 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(servidor.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto, erros };
}

test("Painel da Turma: a coluna se chama Condição e todo aluno tem uma (em dia, parado ou nunca estudou)", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLogin("admin@esc.demo", "admin123"); fecharModal();
      const aluno = db.usuarios.find(u => u.papel === "aluno");
      const q = db.questoes.find(x => x.status === "ativa");
      db.respostas.push({ id: "r-cond", usuarioId: aluno.id, questaoId: q.id, areaId: q.areaId, correta: true, data: hojeISO(), confianca: "certeza" });
      saveState();
      filtrosPainelTurma().ano = "todos"; filtrosPainelTurma().aba = "painel"; guardarSecaoPainel("pessoas", true); navigate("painel-turma");
      const tabela = [...document.querySelectorAll("#app table")].pop();
      const cab = [...tabela.querySelectorAll("thead th")].map(t => t.textContent);
      const linhas = [...tabela.querySelectorAll("tbody tr")].map(t => t.textContent);
      return { cab, linhas, texto: document.getElementById("app").innerText,
        condicoes: { nunca: alertasDoAluno({}).condicao.texto, emDia: alertasDoAluno({ ultimaResposta: hojeISO() }).condicao.texto,
          parado: alertasDoAluno({ ultimaResposta: somarDias(hojeISO(), -10) }).condicao.texto } };
    });
    assert.ok(r.cab.includes("Condição"), r.cab.join("|"));
    assert.ok(!r.cab.includes("Atenção"));
    assert.equal(r.condicoes.nunca, "nunca estudou");
    assert.equal(r.condicoes.emDia, "em dia");
    assert.match(r.condicoes.parado, /parado há 10 dias/);
    assert.ok(r.linhas.some(l => /em dia/.test(l)), "o aluno que estudou hoje está em dia");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Turma: painel, pedidos de acesso e usuários numa tela só; as rotas antigas abrem a aba certa", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(async () => {
      fazerLogin("admin@esc.demo", "admin123"); fecharModal();
      db.usuarios.push({ id: "u-pedido-t", nome: "Beltrana Pedinte", email: "b@teste", matricula: "1", senha: "abcd", papel: "aluno", status: "pendente", anoFaculdade: "3º ano", criadoEm: hojeISO() });
      saveState();
      const itens = navItemsParaPapel("admin").map(i => i.id);
      navigate("painel-turma");
      const painel = { abas: [...document.querySelectorAll("#app .tabs")[0].querySelectorAll(".tab")].map(t => t.innerText.trim()), faixa: /pedido de acesso aguardando/.test(document.getElementById("app").innerText) };
      navigate("usuarios");
      const viaUsuarios = { rota: state.route, hash: location.hash, texto: document.getElementById("app").innerText };
      navigate("aprovar-cadastros");
      const viaCadastros = { rota: state.route, aba: filtrosPainelTurma().aba };
      aprovarUsuario("u-pedido-t");
      return { itens, painel, viaUsuarios, viaCadastros, aprovado: getUsuario("u-pedido-t").status,
        menu: document.getElementById("sidebarMenu").innerText };
    });
    assert.ok(r.itens.includes("painel-turma"));
    assert.ok(!r.itens.includes("aprovar-cadastros") && !r.itens.includes("usuarios"), "saíram do menu: estão dentro de Turma");
    assert.match(r.painel.abas.join("|"), /Painel de uso.*Cadastros e usuários/);
    assert.ok(r.painel.faixa, "o painel avisa dos pedidos aguardando");
    assert.equal(r.viaUsuarios.rota, "painel-turma");
    assert.equal(r.viaUsuarios.hash, "#/painel-turma");
    assert.match(r.viaUsuarios.texto, /Pedidos de acesso/);
    assert.match(r.viaUsuarios.texto, /Beltrana Pedinte/);
    assert.match(r.viaUsuarios.texto, /Contas deste navegador/);
    assert.equal(r.viaCadastros.rota, "painel-turma");
    assert.equal(r.viaCadastros.aba, "pessoas");
    assert.equal(r.aprovado, "aprovado");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Turma: professor vê só o painel (sem abas); aluno não abre; coordenação aprova mas não administra usuários", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      const abasDe = u => abasDaTurma(u);
      const prof = { papel: "professor" }, aluno = { papel: "aluno" };
      const coord = { papel: "admin", nivelAdmin: "coordenacao" }, mod = { papel: "admin", nivelAdmin: "moderador" }, master = { papel: "admin", nivelAdmin: "master" };
      fazerLoginDemo("aluno"); navigate("painel-turma");
      const alunoVe = /Acesso restrito/.test(document.getElementById("app").innerText);
      return { prof: abasDe(prof), aluno: abasDe(aluno), coord: abasDe(coord), mod: abasDe(mod), master: abasDe(master), alunoVe,
        podeUsuariosCoord: podeAdmin("usuarios", coord) };
    });
    assert.deepEqual(r.prof, ["painel"]);
    assert.deepEqual(r.aluno, []);
    assert.deepEqual(r.coord, ["painel", "pessoas"]);
    assert.deepEqual(r.mod, []);
    assert.deepEqual(r.master, ["painel", "pessoas"]);
    assert.ok(r.alunoVe);
    assert.equal(r.podeUsuariosCoord, false);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

const prepararGrupoNaPagina = pagina => pagina.evaluate(`window.prepararGrupo = ${prepararGrupo.toString()}`);
function prepararGrupo(){
  fazerLoginDemo("aluno");
  const u = usuarioAtual();
  const colega = { id: "u-colega", nome: "Colega Teste", email: "c@x", papel: "aluno", status: "aprovado" };
  const terceiro = { id: "u-terceiro", nome: "Terceiro Teste", email: "t@x", papel: "aluno", status: "aprovado" };
  db.usuarios.push(colega, terceiro);
  const g = { id: "g-teste", nome: "Turma teste", criadoPor: u.id, membrosAprovados: [u.id, colega.id, terceiro.id], solicitacoesPendentes: [], deslocamento: 0, blocosProprios: [], anoFaculdade: u.anoFaculdade };
  db.grupos.push(g); u.grupoId = g.id; colega.grupoId = g.id; terceiro.grupoId = g.id;
  return { u, colega, terceiro, g };
}

test("pedido para entrar no grupo avisa a pessoa que o criou, uma vez só, e aparece no menu e no Início", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    await prepararGrupoNaPagina(pagina);
    const r = await pagina.evaluate(() => {
      const { u, g } = window.prepararGrupo();
      db.usuarios.push({ id: "u-pede", nome: "Quem Pede", email: "p@x", papel: "aluno", status: "aprovado" });
      saveState();
      navigate("meu-grupo");
      const antes = quantosPedidosDeEntradaNoGrupo(u);
      g.solicitacoesPendentes.push("u-pede");
      const toasts = () => [...document.querySelectorAll("#toastContainer .toast")].map(t => t.textContent).filter(t => /pedir|pediu/.test(t));
      checarPedidosDeEntradaNoGrupo();
      const primeiro = toasts().length;
      checarPedidosDeEntradaNoGrupo();
      const segundo = toasts().length;
      return { antes, primeiro, segundo, texto: toasts()[0], menu: document.getElementById("sidebarMenu").innerText,
        notif: gerarNotificacoes(u).map(n => n.texto), tela: document.getElementById("app").innerText, avisados: u.pedidosGrupoAvisados };
    });
    assert.equal(r.antes, 0);
    assert.equal(r.primeiro, 1);
    assert.equal(r.segundo, 1, "o mesmo pedido não avisa duas vezes");
    assert.match(r.texto, /Quem Pede pediu para entrar no grupo "Turma teste"/);
    assert.match(r.menu, /Meu Grupo\s*1/);
    assert.ok(r.notif.some(t => /1 pessoa pediu para entrar no seu grupo/.test(t)));
    assert.match(r.tela, /Pedidos para entrar no grupo \(1\)/);
    assert.match(r.tela, /Quem Pede/);
    assert.deepEqual(r.avisados, ["g-teste|u-pede"]);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("quem criou o grupo retira um integrante (volta ao calendário oficial) e as questões dele passam para quem ficou", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    await prepararGrupoNaPagina(pagina);
    const r = await pagina.evaluate(() => {
      const { u, colega, terceiro, g } = window.prepararGrupo();
      ["a","b","c","d"].forEach(i => db.questoes.push({ id: "q-ret-"+i, grupoId: g.id, banca: "Lista X", ano: 2026, status: "ativa", real: true, assuntoId: db.taxonomia.assuntos[0].id, enunciado: "e", alternativas: [], gabarito: "A" }));
      g.divisao = dividirEntreMembros(db.questoes.filter(q => q.grupoId === g.id), membrosDoGrupo(g));
      db.subgrupos.push({ id: "sg-ret", grupoId: g.id, nome: "Trio", criadoPor: u.id, membros: [u.id, colega.id, terceiro.id], questaoIds: ["q-ret-a","q-ret-b","q-ret-c"] });
      const sg = db.subgrupos[0]; sg.divisao = dividirEntreMembros(questoesDoSubgrupo(sg), membrosDoSubgrupo(sg));
      navigate("meu-grupo");
      const temX = document.querySelectorAll('#app [onclick*="retirarDoGrupo"]').length;
      const temXSg = document.querySelectorAll('#app [onclick*="retirarDoSubgrupo"]').length;
      window.confirm = () => true;
      // do grupo de estudo: continua na turma
      retirarDoSubgrupo("sg-ret", terceiro.id);
      const sgDepois = { membros: sg.membros.slice(), donos: [...new Set(Object.values(sg.divisao))].sort(), naTurma: membrosDoGrupo(g).some(m => m.id === terceiro.id) };
      // do grupo inteiro
      retirarDoGrupo(g.id, terceiro.id);
      const depois = { membros: g.membrosAprovados.slice(), turmaDele: getUsuario(terceiro.id).grupoId, oficial: db.grupoOficialId,
        donos: [...new Set(Object.values(g.divisao))].sort(), nomeNaLista: document.getElementById("app").innerText.includes("Terceiro Teste") };
      // o dono e a própria pessoa não saem por aqui
      retirarDoGrupo(g.id, u.id);
      return { temX, temXSg, sgDepois, depois, euAinda: membrosDoGrupo(g).some(m => m.id === u.id), u: u.id, colega: colega.id };
    });
    assert.equal(r.temX, 2, "um × por integrante, menos o dono");
    assert.equal(r.temXSg, 2, "um × por participante do grupo de estudo, menos o criador");
    assert.ok(!r.sgDepois.membros.includes("u-terceiro"));
    assert.ok(!r.sgDepois.donos.includes("u-terceiro"));
    assert.ok(r.sgDepois.naTurma, "sair do grupo de estudo não tira da turma");
    assert.ok(!r.depois.membros.includes("u-terceiro"));
    assert.equal(r.depois.turmaDele, r.depois.oficial);
    assert.ok(!r.depois.donos.includes("u-terceiro"), "as questões dele passaram para quem ficou");
    assert.ok(r.depois.donos.length >= 1);
    assert.equal(r.depois.nomeNaLista, false);
    assert.ok(r.euAinda);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Estudar: 'Criar minha lista' abre a montagem; Revisão Rápida: 'Criar meu baralho' abre as opções e respeita a situação e o tamanho", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      navigate("estudar");
      const painel = () => document.getElementById("montagemLista");
      const fechada = painel().hidden;
      document.getElementById("botaoMontarLista").click();
      const aberta = !painel().hidden;
      document.getElementById("botaoMontarLista").click();
      const fechouDeNovo = painel().hidden;
      // baralho
      navigate("flashcards");
      const antes = !!document.getElementById("flashSituacao");
      alternarMontagemBaralho();
      const abriu = !!document.getElementById("flashSituacao") && !!document.getElementById("flashTamanho");
      const u = usuarioAtual();
      const todos = montarBaralhoFlashcards(u.id, 1000, {}).length;
      const novos = montarBaralhoFlashcards(u.id, 1000, { situacao: "novos" }).length;
      const vencidos = montarBaralhoFlashcards(u.id, 1000, { situacao: "vencidos" }).length;
      const meus = montarBaralhoFlashcards(u.id, 1000, { situacao: "meus" }).length;
      const tres = montarBaralhoFlashcards(u.id, 3, {}).length;
      document.getElementById("flashSituacao").value = "novos"; document.getElementById("flashTamanho").value = "4"; atualizarOpcoesBaralho();
      const filtro = Object.assign({}, state.filtroRota.flashcards);
      iniciarSessaoFlashcards(state.filtroRota.flashcards);
      return { fechada, aberta, fechouDeNovo, antes, abriu, todos, novos, vencidos, meus, tres, filtro, nSessao: state.sessaoFlash.cartoes.length };
    });
    assert.ok(r.fechada, "a montagem começa recolhida");
    assert.ok(r.aberta && r.fechouDeNovo);
    assert.equal(r.antes, false);
    assert.ok(r.abriu);
    assert.ok(r.todos > 0 && r.novos > 0 && r.novos <= r.todos);
    assert.equal(r.vencidos, 0, "ninguém revisou nada ainda");
    assert.equal(r.meus, 0);
    assert.equal(r.tres, 3);
    assert.equal(r.filtro.situacao, "novos");
    assert.equal(r.filtro.tamanho, 4);
    assert.equal(r.nSessao, 4);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("questão enviada por aluno diz quem enviou; a da equipe, a da pasta dados/ e a didática não levam nome", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const base = db.questoes.find(x => x.status === "ativa" && x.real);
      const aluno = db.usuarios.find(x => x.papel === "aluno");
      const prof = db.usuarios.find(x => x.papel === "professor");
      const mk = (id, extra) => Object.assign({}, base, { id }, extra);
      const doAluno = mk("q-aut-1", { criadoPor: aluno.id });
      const doProf = mk("q-aut-2", { criadoPor: prof.id });
      const outroAparelho = mk("q-aut-3", { criadoPor: "00000000-0000-4000-8000-000000000001", autorNome: "Marina Souza", autorPapel: "aluno" });
      const outroAparelhoEquipe = mk("q-aut-4", { criadoPor: "00000000-0000-4000-8000-000000000002", autorNome: "Prof. Lima", autorPapel: "professor" });
      const antiga = mk("q-aut-5", { criadoPor: "00000000-0000-4000-8000-000000000003", autorNome: "Sem Papel" });
      const html = q => renderQuestionCard(q, {});
      return {
        daSemente: autoriaDaQuestao(base), aluno: autoriaDaQuestao(doAluno), prof: autoriaDaQuestao(doProf),
        marina: autoriaDaQuestao(outroAparelho), equipe: autoriaDaQuestao(outroAparelhoEquipe), antiga: autoriaDaQuestao(antiga),
        card: html(outroAparelho).includes("Enviada por Marina Souza"), cardEquipe: html(outroAparelhoEquipe).includes("Enviada por"),
        nuvemLeva: CAMPOS_DA_QUESTAO_NA_NUVEM.includes("autorPapel"),
      };
    });
    assert.equal(r.daSemente, null);
    assert.equal(r.prof, null);
    assert.equal(r.equipe, null);
    assert.equal(r.antiga, null, "sem saber o papel de quem enviou, não se atribui");
    assert.ok(r.aluno, "a questão do aluno local traz o nome dele");
    assert.equal(r.marina, "Marina Souza");
    assert.ok(r.card);
    assert.equal(r.cardEquipe, false);
    assert.ok(r.nuvemLeva, "o papel de quem enviou viaja com a questão");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("a questão em andamento fica centralizada no computador", async () => {
  const { pagina, contexto, erros } = await abrir({ width: 1700, height: 900 });
  try{
    await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal(); iniciarSessaoRecomendada(); });
    await pagina.waitForSelector(".coluna-questao .qcard");
    const m = await pagina.evaluate(() => {
      const c = document.querySelector(".coluna-questao .qcard").getBoundingClientRect();
      const principal = document.querySelector(".main").getBoundingClientRect();
      return { centroCartao: c.left + c.width / 2, centroPrincipal: principal.left + principal.width / 2, largura: c.width };
    });
    assert.ok(Math.abs(m.centroCartao - m.centroPrincipal) < 4, `cartão fora do centro: ${m.centroCartao} x ${m.centroPrincipal}`);
    assert.ok(m.largura <= 741);
    // no celular a coluna ocupa a largura toda, sem rolagem lateral
    await pagina.setViewportSize({ width: 390, height: 800 });
    const sem = await pagina.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
    assert.ok(sem, "sem rolagem horizontal no celular");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
