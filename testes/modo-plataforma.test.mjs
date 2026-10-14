/* Modo resumido × estatístico do aluno (codigo/06c-modo-plataforma.js): começa no resumido,
   pergunta uma vez, lembra a escolha (inclusive vinda da nuvem), mantém o menu reduzido e,
   acima de tudo, nunca perde nem altera dado de estudo ao trocar de modo. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(); servidor = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1280, height: 900 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(servidor.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto, erros };
}

test("quem não escolheu começa no resumido, é perguntado uma vez e a escolha sobrevive a recarregar a página", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      const inicial = { modo: modoDaPlataforma(u), escolha: u.modoPlataforma };
      navigate("inicio");
      const abriu = perguntarModoDaPlataforma({ mesmoComAutomacao: true });
      const overlay = document.getElementById("modalOverlayAtivo");
      const textoModal = overlay ? overlay.innerText : "";
      overlay && overlay.click();   // clicar fora não pode fechar nem decidir por ela
      const seguiu = !!document.getElementById("modalOverlayAtivo") && !usuarioAtual().modoPlataforma;
      const outraVez = perguntarModoDaPlataforma({ mesmoComAutomacao: true });   // já há janela aberta
      definirModoPlataforma("estatistico");
      const depois = { modo: modoDaPlataforma(usuarioAtual()), escolha: usuarioAtual().modoPlataforma, janela: !!document.getElementById("modalOverlayAtivo") };
      const perguntaDeNovo = perguntarModoDaPlataforma({ mesmoComAutomacao: true });
      return { inicial, abriu, textoModal, seguiu, outraVez, depois, perguntaDeNovo };
    });
    assert.deepEqual(r.inicial, { modo: "resumido", escolha: undefined });
    assert.ok(r.abriu && r.seguiu);
    assert.match(r.textoModal, /Resumido/); assert.match(r.textoModal, /Estatístico/);
    assert.equal(r.outraVez, false);
    assert.deepEqual(r.depois, { modo: "estatistico", escolha: "estatistico", janela: false });
    assert.equal(r.perguntaDeNovo, false, "decidiu uma vez, não pergunta mais");
    await pagina.reload();
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    const apos = await pagina.evaluate(() => { const u = db.usuarios.find(x => x.modoPlataforma); return u ? { modo: u.modoPlataforma, perguntaria: (()=>{ fazerLoginDemo("aluno"); fecharModal(); return perguntarModoDaPlataforma({ mesmoComAutomacao: true }); })() } : null; });
    assert.deepEqual(apos, { modo: "estatistico", perguntaria: false });
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("menu reduzido no resumido (quatro itens + Mais); completo no estatístico; nenhuma rota some", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const itens = () => [...document.querySelectorAll("#sidebarMenu .nav-list .nav-item")].map(e => e.innerText.trim());
      navigate("inicio");
      const resumido = { visiveis: itens(), mais: !!document.querySelector('#sidebarMenu .nav-grupo[data-grupo="Mais"]'), fechado: !!document.querySelector('#sidebarMenu .nav-grupo.fechado[data-grupo="Mais"]') };
      document.querySelector('#sidebarMenu .nav-grupo[data-grupo="Mais"]').click();   // abre o "Mais"
      const aberto = itens();
      const rotasDoMenu = navItemsParaPapel("aluno").map(i => i.id);
      trocarModoPlataforma("estatistico");
      const completo = itens();
      // rota fora do menu resumido continua respondendo
      trocarModoPlataforma("resumido"); navigate("historico");
      const rotaOk = state.route === "historico" && document.getElementById("conteudoPagina").innerText.length > 20;
      const maisAbertoNaRota = !document.querySelector('#sidebarMenu .nav-grupo.fechado[data-grupo="Mais"]');
      return { resumido, aberto, completo, rotasDoMenu, rotaOk, maisAbertoNaRota };
    });
    assert.deepEqual(r.resumido.visiveis.slice(0, 4), ["Início", "Estudar", "Revisão Rápida", "Meu Desempenho"]);
    assert.ok(r.resumido.mais && r.resumido.fechado);
    assert.equal(r.resumido.visiveis.length, 4 + 0 + r.resumido.visiveis.filter(t => /Perfil|Tema|Sair|aluno/.test(t)).length);
    for(const nome of ["Revisão", "Meu Grupo", "Provas e Simulados", "Histórico de Atividade", "Favoritos", "Enviar Questões"]) assert.ok(r.aberto.includes(nome), "no Mais: " + nome);
    assert.ok(r.completo.length >= r.rotasDoMenu.length);
    assert.ok(r.rotaOk && r.maisAbertoNaRota, "a tela aberta pelo menu reduzido mostra o grupo Mais aberto");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Início, Estudar e Revisão Rápida: o resumido reduz o texto, mas guarda o porquê atrás de 'Por quê?'", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const tela = rota => { navigate(rota); return document.getElementById("conteudoPagina").innerText; };
      const lerTudo = () => ({ inicio: tela("inicio"), estudar: tela("estudar"), flash: tela("flashcards") });
      trocarModoPlataforma("resumido"); const res = lerTudo();
      navigate("inicio");
      const botoesInicio = !!document.querySelector("button[onclick^='iniciarSessaoRecomendada']");
      navigate("estudar"); const porQue = [...document.querySelectorAll("#conteudoPagina details summary")].map(s => s.innerText);
      trocarModoPlataforma("estatistico"); const est = lerTudo();
      return { res, est, botoesInicio, porQue };
    });
    assert.doesNotMatch(r.res.inicio, /Sugestões de assuntos para melhorar/);
    assert.match(r.res.inicio, /modo resumido/i);
    assert.match(r.est.inicio, /Sugestões de assuntos para melhorar/);
    assert.ok(r.botoesInicio, "Começar agora segue no resumido");
    assert.ok(r.res.estudar.length < r.est.estudar.length);
    assert.ok(r.porQue.some(t => /Por que esta sessão/.test(t)), "a explicação da sessão fica acessível");
    assert.doesNotMatch(r.res.flash, /Esta meta é separada da de questões/);
    assert.match(r.est.flash, /Esta meta é separada da de questões/);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("trocar de modo não perde nem altera nenhum dado de estudo, e o resumido grava tudo (inclusive a confiança)", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      const estudo = () => { const d = dadosDoUsuario(u.id); delete d.perfil; delete d.geradoEm; return JSON.stringify(d); };
      trocarModoPlataforma("resumido");
      const q = questoesAtivas().filter(x => x.gabarito)[0];
      iniciarSessaoComLista([{ questaoId: q.id, origem: "previa", motivo: "teste" }], "pratica");
      selecionarAlternativa(q.gabarito);
      const campoConfianca = document.querySelectorAll(".confidence-btn").length === 3;   // o campo que coleta dado segue na tela
      confirmarResposta("certeza");
      const gravada = db.respostas[db.respostas.length - 1];
      const antes = estudo();
      trocarModoPlataforma("estatistico"); const noEstatistico = estudo();
      trocarModoPlataforma("resumido"); const deVolta = estudo();
      const perfilSomaOModo = dadosDoUsuario(u.id).perfil.modoPlataforma;
      return { campoConfianca, gravada: { q: gravada.questaoId, conf: gravada.confianca, usuario: gravada.usuarioId }, antes, noEstatistico, deVolta, perfilSomaOModo, qId: q.id, uId: u.id, n: db.respostas.filter(x => x.usuarioId === u.id).length };
    });
    assert.ok(r.campoConfianca, "o campo de confiança continua no resumido");
    assert.deepEqual(r.gravada, { q: r.qId, conf: "certeza", usuario: r.uId });
    assert.equal(r.antes, r.noEstatistico);
    assert.equal(r.antes, r.deVolta);
    assert.equal(r.perfilSomaOModo, "resumido", "o modo viaja na cópia do estudo");
    assert.ok(r.n >= 1);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("nuvem: a escolha vinda da conta vale para quem ainda não escolheu; a deste aparelho nunca é sobrescrita", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      const base = { id: "u-nuvem", nome: "Ana", email: "a@a.br", papel: "aluno", status: "aprovado" };
      nuvemAplicarPerfilLocal(Object.assign({}, base, { modo_plataforma: "estatistico" }));
      const u = db.usuarios.find(x => x.id === "u-nuvem");
      const veio = u.modoPlataforma;
      u.modoPlataforma = "resumido";   // escolheu neste aparelho
      nuvemAplicarPerfilLocal(Object.assign({}, base, { modo_plataforma: "estatistico" }));
      const local = u.modoPlataforma;
      nuvemAplicarPerfilLocal(Object.assign({}, base, { modo_plataforma: "lixo" }));
      return { veio, local, lixo: db.usuarios.find(x => x.id === "u-nuvem").modoPlataforma };
    });
    assert.deepEqual(r, { veio: "estatistico", local: "resumido", lixo: "resumido" });
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Perfil e configurações: o cartão do modo troca nos dois sentidos; equipe não tem modo", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal(); navigate("perfil");
      const cartao = !!document.querySelector('input[name="modoPlataforma"][value="resumido"]:checked');
      document.querySelector('input[name="modoPlataforma"][value="estatistico"]').click();
      const virou = { modo: usuarioAtual().modoPlataforma, marcado: !!document.querySelector('input[name="modoPlataforma"][value="estatistico"]:checked') };
      document.querySelector('input[name="modoPlataforma"][value="resumido"]').click();
      const voltou = usuarioAtual().modoPlataforma;
      fazerLogout(); fazerLoginDemo("admin"); fecharModal(); navigate("perfil");
      return { cartao, virou, voltou, equipe: !!document.querySelector('input[name="modoPlataforma"]'), modoEquipe: modoDaPlataforma(usuarioAtual()) };
    });
    assert.ok(r.cartao);
    assert.deepEqual(r.virou, { modo: "estatistico", marcado: true });
    assert.equal(r.voltou, "resumido");
    assert.equal(r.equipe, false);
    assert.equal(r.modoEquipe, "estatistico");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
