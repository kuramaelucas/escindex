/* ==========================================================================
   QUESTÕES PARA ATUALIZAR, FEEDBACK NA NUVEM, SENHA E A BARRA DE QUESTÕES
   ==========================================================================
   Um Supabase de mentira que GUARDA as linhas que recebe (com o carimbo de
   hora, como o gatilho do banco), para conferir o caminho inteiro:
     - a equipe conserta uma questão da pasta dados/ (a figura que faltava):
       a imagem vai para o Storage, a correção sobe e desce para a turma, e
       a questão volta ao estudo do aluno; "Baixar as atualizações" leva só
       essa questão;
     - o feedback do aluno chega ao administrador, e "marcar como lido" vai
       como alteração da linha (PATCH), não como upsert;
     - trocar a senha na nuvem exige a senha atual;
     - a barra de questões é fina, de uma linha, e expande;
     - o tutorial não está mais no menu lateral.
   ========================================================================== */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, srv;
before(async () => { navegador = await chromium.launch(); srv = await subirServidor(); });
after(async () => { await navegador?.close(); await srv?.fechar(); });

const ALUNA = "11111111-2222-3333-4444-555555555555";
const PROF = "99999999-8888-7777-6666-555555555555";
const ADMIN = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const token = id => b64({ alg: "HS256" }) + "." + b64({ sub: id, exp: 9999999999 }) + ".assinatura";
const PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
const CHAVES = { feedbacks: "id", correcoes_questoes: "questao_id" };

function nuvemQueGuarda(){
  const banco = { tabelas: {}, arquivos: [], pedidos: [], relogio: Date.parse("2026-09-28T12:00:00Z") };
  banco.carimbo = () => new Date(banco.relogio += 1000).toISOString();
  banco.tabela = t => (banco.tabelas[t] = banco.tabelas[t] || new Map());
  banco.guardar = (t, linha) => {
    const k = linha[CHAVES[t]];
    banco.tabela(t).set(k, Object.assign({}, banco.tabela(t).get(k) || {}, linha, { atualizado_em: banco.carimbo() }));
  };
  return banco;
}

async function abrir(banco, { id, papel, nome, senha = "certa1", nivel = null }){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  const perfil = { id, nome, email: nome.split(" ")[0].toLowerCase() + "@turma.br", papel, status: "aprovado", ano_faculdade: "3º ano", nivel_admin: nivel };
  await contexto.route(/supabase\.co/, async rota => {
    const req = rota.request();
    const url = new URL(req.url());
    const busca = new URLSearchParams(url.search);
    banco.pedidos.push({ quem: id, metodo: req.method(), caminho: url.pathname, busca: url.search, corpo: req.postData() });
    const json = (dados, status = 200) => rota.fulfill({ status, contentType: "application/json", body: JSON.stringify(dados) });
    if(url.pathname.startsWith("/storage/v1/object/questoes/")){
      banco.arquivos.push({ caminho: url.pathname, tipo: req.headers()["content-type"] });
      return json({ Key: url.pathname.replace("/storage/v1/object/", "") });
    }
    const tabela = url.pathname.replace("/rest/v1/", "");
    if(CHAVES[tabela]){
      if(req.method() === "POST"){ JSON.parse(req.postData()).forEach(l => banco.guardar(tabela, l)); return rota.fulfill({ status: 201, body: "" }); }
      if(req.method() === "PATCH"){
        const col = CHAVES[tabela], alvo = (busca.get(col) || "").replace(/^eq\./, "");
        if(banco.tabela(tabela).has(alvo)) banco.guardar(tabela, Object.assign({ [col]: alvo }, JSON.parse(req.postData())));
        return rota.fulfill({ status: 204, body: "" });
      }
      const desde = (busca.get("atualizado_em") || "gt.1970").slice(3);
      // o RLS de mentira do feedback: quem escreveu vê o seu; o administrador, todos
      const visiveis = [...banco.tabela(tabela).values()].filter(l => tabela !== "feedbacks" || papel === "admin" || l.usuario_id === id);
      return json(visiveis.filter(l => l.atualizado_em > desde).sort((a, b) => a.atualizado_em.localeCompare(b.atualizado_em)));
    }
    if(url.pathname === "/rest/v1/perfis" && req.method() === "GET") return json([perfil]);
    if(url.pathname.startsWith("/rest/v1/rpc/")) return json([]);
    if(url.pathname.startsWith("/rest/v1/")) return req.method() === "GET" ? json([]) : rota.fulfill({ status: 201, body: "" });
    if(url.pathname === "/auth/v1/token" && busca.get("grant_type") === "password"){
      const corpo = JSON.parse(req.postData());
      if(corpo.password !== senha) return json({ error: "invalid_grant", error_description: "Invalid login credentials" }, 400);
      return json({ access_token: token(id), refresh_token: "r2", user: { id, email: corpo.email } });
    }
    if(url.pathname.startsWith("/auth/v1/")) return json({});
    return rota.abort();
  });
  await contexto.addInitScript(s => localStorage.setItem("esc_nuvem_sessao", JSON.stringify(s)),
    { token: token(id), refresh: "r1", usuarioId: id, email: perfil.email });
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(srv.url + "index.html");
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

test("conserto de questão da pasta dados/: a figura sobe, a correção chega à turma e o arquivo leva só ela", async () => {
  const banco = nuvemQueGuarda();
  const QID = "q-scmsp2022-011";
  const prof = await abrir(banco, { id: PROF, papel: "professor", nome: "Paula Prof" });
  const tela = await prof.pagina.evaluate(qid => {
    navigate("atualizar-questoes");
    const texto = document.getElementById("conteudoPagina").innerText;
    return { texto, listada: questoesParaAtualizar().some(x => x.q.id === qid), noMenu: navItemsParaPapel("professor").some(i => i.id === "atualizar-questoes") };
  }, QID);
  assert.ok(tela.noMenu && tela.listada);
  assert.match(tela.texto, /Questões para Atualizar/);
  assert.match(tela.texto, /Falta a figura/);
  // a figura chega pelo atalho da lista
  await prof.pagina.evaluate(({ qid, png }) => {
    const q = getQuestao(qid);
    q.imagemUrl = png; delete q.imagemPendente; q.imagemLiberada = true;
    registrarCorrecaoDaQuestao(qid); saveState();
  }, { qid: QID, png: PNG });
  await sincronizar(prof.pagina);
  assert.equal(banco.arquivos.length, 1, "a figura deveria subir para o Storage");
  const linha = banco.tabela("correcoes_questoes").get(QID);
  assert.ok(linha, "a correção deveria subir para correcoes_questoes");
  assert.match(linha.campos.imagemUrl, /^https:\/\/.+\/storage\/v1\/object\/public\/questoes\//);
  assert.deepEqual(linha.remover, ["imagemPendente"]);
  assert.equal(linha.removido, false);
  assert.equal(linha.autor_nome, "Paula Prof");
  // o arquivo de atualizações leva SÓ esta questão, com a figura embutida
  const arquivo = await prof.pagina.evaluate(async () => {
    const orig = window.fetch;
    window.fetch = async u => /supabase\.co\/storage/.test(String(u)) ? new Response(new Blob([new Uint8Array([137, 80, 78, 71])], { type: "image/png" })) : orig(u);
    try{ return (await montarArquivoDeAtualizacoes()).conteudo; } finally { window.fetch = orig; }
  });
  assert.equal(arquivo.formato, "esc-atualizacoes-questoes");
  assert.deepEqual(arquivo.questoes.map(q => q.id), [QID]);
  assert.match(arquivo.questoes[0].campos.imagemUrl, new RegExp("^dados/imagens/" + QID + "-[a-z0-9]+\\.png$"));
  assert.match(arquivo.questoes[0].imagem.dataUrl, /^data:image\/png;base64,/);
  // publicada a pasta dados/ com a atualização, a correção é reconhecida
  // como incorporada (mesmo com a figura apontando para a nuvem aqui)
  const incorporada = await prof.pagina.evaluate(({ qid, caminho }) => {
    const s = sementeDaQuestao(qid);
    const copia = JSON.parse(JSON.stringify(s));
    s.imagemUrl = caminho; delete s.imagemPendente;
    const r = correcaoDaQuestao(getQuestao(qid));
    Object.keys(s).forEach(k => delete s[k]); Object.assign(s, copia);
    return r;
  }, { qid: QID, caminho: arquivo.questoes[0].campos.imagemUrl });
  assert.equal(incorporada, null);
  assert.deepEqual(prof.erros, []);

  // a aluna recebe a correção: a questão volta ao estudo dela
  const aluna = await abrir(banco, { id: ALUNA, papel: "aluno", nome: "Ana Aluna" });
  await sincronizar(aluna.pagina);
  const r = await aluna.pagina.evaluate(qid => {
    const q = getQuestao(qid);
    return { pendente: !!q.imagemPendente, url: q.imagemUrl, noEstudo: questoesParaEstudo(usuarioAtual().id).some(x => x.id === qid) };
  }, QID);
  assert.equal(r.pendente, false);
  assert.match(r.url, /storage\/v1\/object\/public/);
  assert.equal(r.noEstudo, true);
  // aluno não vê a tela nem grava correção
  assert.equal(await aluna.pagina.evaluate(() => { navigate("atualizar-questoes"); return document.getElementById("conteudoPagina").innerText; }).then(t => /Acesso restrito/.test(t)), true);

  // desfazer encerra a correção na nuvem, e a aluna volta a não ver a questão
  await prof.pagina.evaluate(qid => desfazerCorrecao(qid), QID);
  await sincronizar(prof.pagina);
  assert.equal(banco.tabela("correcoes_questoes").get(QID).removido, true);
  await sincronizar(aluna.pagina);
  assert.equal(await aluna.pagina.evaluate(qid => !!getQuestao(qid).imagemPendente, QID), true);
  assert.deepEqual(aluna.erros, []);
  await prof.contexto.close(); await aluna.contexto.close();
});

test("feedback da plataforma sobe e chega ao administrador; marcar como lido vai por PATCH", async () => {
  const banco = nuvemQueGuarda();
  const aluna = await abrir(banco, { id: ALUNA, papel: "aluno", nome: "Ana Aluna" });
  await aluna.pagina.evaluate(() => {
    abrirModalFeedback();
    document.getElementById("fbTipo").value = "sugestao";
    document.getElementById("fbTexto").value = "Queria um modo de revisão por assunto.";
    enviarFeedbackGeral();
  });
  await sincronizar(aluna.pagina);
  const [linha] = [...banco.tabela("feedbacks").values()];
  assert.ok(linha, "o feedback deveria subir para /rest/v1/feedbacks");
  assert.equal(linha.usuario_id, ALUNA);
  assert.equal(linha.autor_nome, "Ana Aluna");
  assert.equal(linha.tipo, "sugestao");
  assert.equal(linha.lido, false);

  const admin = await abrir(banco, { id: ADMIN, papel: "admin", nome: "Adm Coordenação", nivel: "coordenacao" });
  await sincronizar(admin.pagina);
  const tela = await admin.pagina.evaluate(() => { navigate("feedback-usuarios"); return { texto: document.getElementById("conteudoPagina").innerText, menu: document.getElementById("sidebarMenu").innerText }; });
  assert.match(tela.texto, /Queria um modo de revisão por assunto/);
  assert.match(tela.texto, /Ana Aluna/);
  assert.match(tela.menu, /Feedback dos Usuários\s*1/);
  await admin.pagina.evaluate(id => marcarFeedbackLido(id), linha.id);
  await sincronizar(admin.pagina);
  const patch = banco.pedidos.find(p => p.quem === ADMIN && p.caminho === "/rest/v1/feedbacks" && p.metodo === "PATCH");
  assert.ok(patch, "marcar como lido deveria ir como PATCH na linha de quem escreveu");
  assert.equal(banco.tabela("feedbacks").get(linha.id).lido, true);
  assert.equal(banco.tabela("feedbacks").get(linha.id).lido_por_nome, "Adm Coordenação");
  assert.equal(banco.pedidos.some(p => p.quem === ADMIN && p.caminho === "/rest/v1/feedbacks" && p.metodo === "POST"), false);
  assert.deepEqual(admin.erros, []);
  await aluna.contexto.close(); await admin.contexto.close();
});

test("trocar a senha da conta da nuvem exige a senha atual", async () => {
  const banco = nuvemQueGuarda();
  const aluna = await abrir(banco, { id: ALUNA, papel: "aluno", nome: "Ana Aluna", senha: "certa1" });
  const trocar = (atual, nova) => aluna.pagina.evaluate(async ([a, n]) => {
    navigate("perfil");
    document.getElementById("senhaAtual").value = a;
    document.getElementById("senhaNova").value = n;
    document.getElementById("senhaNova2").value = n;
    trocarMinhaSenha();
    await new Promise(ok => setTimeout(ok, 300));
  }, [atual, nova]);
  assert.equal(await aluna.pagina.evaluate(() => !!document.getElementById("senhaAtual") || (navigate("perfil"), !!document.getElementById("senhaAtual"))), true);
  await trocar("", "novasenha9");
  await trocar("errada", "novasenha9");
  assert.equal(banco.pedidos.some(p => p.caminho === "/auth/v1/user" && p.metodo === "PUT"), false, "sem a senha atual certa, nada muda");
  await trocar("certa1", "novasenha9");
  const conferiu = banco.pedidos.filter(p => p.caminho === "/auth/v1/token" && /grant_type=password/.test(p.busca));
  assert.equal(JSON.parse(conferiu[conferiu.length - 1].corpo).password, "certa1");
  const put = banco.pedidos.find(p => p.caminho === "/auth/v1/user" && p.metodo === "PUT");
  assert.ok(put, "com a senha atual certa, a troca acontece");
  assert.deepEqual(JSON.parse(put.corpo), { password: "novasenha9" });
  assert.deepEqual(aluna.erros, []);
  await aluna.contexto.close();
});

test("a barra de questões é fina, de uma linha, e expande; o tutorial saiu do menu", async () => {
  const semNuvem = await subirServidor({ semNuvem: true });
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 390, height: 800 } });
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(semNuvem.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  const r = await pagina.evaluate(async () => {
    fazerLoginDemo("aluno");
    const menu = document.getElementById("sidebarMenu").innerText;
    const ids = questoesParaEstudo(usuarioAtual().id).slice(0, 40).map(q => ({ questaoId: q.id, motivo: "teste" }));
    iniciarSessaoComLista(ids, "pratica");
    irParaIndiceDaSessao(30);
    await new Promise(ok => setTimeout(ok, 50));
    const barra = document.getElementById("mapaDaSessao");
    const trilho = barra.querySelector(".barra-questoes-trilho");
    const atual = trilho.querySelector(".atual");
    const fina = { altura: barra.offsetHeight, rolou: trilho.scrollLeft > 0,
      atualVisivel: atual.offsetLeft >= trilho.scrollLeft && atual.offsetLeft + atual.offsetWidth <= trilho.scrollLeft + trilho.clientWidth };
    alternarMapaSessao();
    const expandida = document.getElementById("mapaDaSessao");
    const aberta = { altura: expandida.offsetHeight, legenda: /acertou/.test(expandida.innerText) || /quadradinho/.test(expandida.innerText) };
    alternarMapaSessao();
    return { menu, fina, aberta, largura: document.documentElement.scrollWidth };
  });
  assert.doesNotMatch(r.menu, /Tutorial/);
  assert.match(r.menu, /Perfil e configurações/);
  assert.ok(r.fina.altura <= 48, "a barra recolhida deveria ter uma linha só (veio " + r.fina.altura + "px)");
  assert.ok(r.fina.rolou && r.fina.atualVisivel, "a questão atual deveria estar à vista no trilho");
  assert.ok(r.aberta.altura > r.fina.altura * 2 && r.aberta.legenda, "expandida, a barra mostra o conjunto inteiro e a legenda");
  assert.ok(r.largura <= 390, "sem rolagem lateral da página no celular");
  // o tutorial continua em Perfil e configurações
  const perfil = await pagina.evaluate(() => { navigate("perfil"); return document.getElementById("conteudoPagina").innerText; });
  assert.match(perfil, /Ajuda e tutorial/);
  assert.deepEqual(erros, []);
  await contexto.close(); await semNuvem.fechar();
});
