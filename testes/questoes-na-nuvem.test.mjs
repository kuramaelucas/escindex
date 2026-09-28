/* ==========================================================================
   QUESTÕES ENVIADAS PELA NUVEM (tabela questoes_enviadas e o Storage)
   ==========================================================================
   Um Supabase de mentira que GUARDA o que recebe: as linhas de
   questoes_enviadas (com o carimbo de hora, como o gatilho do banco) e os
   arquivos enviados ao Storage. Assim dá para conferir o caminho inteiro:
   o aluno envia com imagem → a imagem sobe primeiro e a linha leva só o
   endereço → a equipe recebe na fila, aprova ou recusa → a turma recebe a
   aprovada, e quem enviou vê a recusa com o motivo.
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
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const token = id => b64({ alg: "HS256" }) + "." + b64({ sub: id, exp: 9999999999 }) + ".assinatura";
const PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

function nuvemQueGuarda(){
  const banco = { linhas: new Map(), arquivos: [], pedidos: [], relogio: Date.parse("2026-09-28T12:00:00Z") };
  banco.carimbo = () => new Date(banco.relogio += 1000).toISOString();
  banco.guardar = linha => {
    const antiga = banco.linhas.get(linha.id) || { criado_em: banco.carimbo() };
    banco.linhas.set(linha.id, Object.assign({}, antiga, linha, { atualizado_em: banco.carimbo() }));
  };
  return banco;
}

async function abrir(banco, { id, papel, nome, semBalde = false }){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  const perfil = { id, nome, email: nome + "@turma.br", papel, status: "aprovado", ano_faculdade: "3º ano" };
  await contexto.route(/supabase\.co/, async rota => {
    const req = rota.request();
    const url = new URL(req.url());
    banco.pedidos.push({ metodo: req.method(), caminho: url.pathname, busca: url.search, corpo: req.postData() });
    const json = (dados, status = 200) => rota.fulfill({ status, contentType: "application/json", body: JSON.stringify(dados) });
    if(url.pathname.startsWith("/storage/v1/object/questoes/")){
      if(semBalde) return json({ statusCode: "404", error: "Bucket not found", message: "Bucket not found" }, 400);
      banco.arquivos.push({ caminho: url.pathname, tipo: req.headers()["content-type"], bytes: (req.postDataBuffer() || Buffer.alloc(0)).length });
      return json({ Key: url.pathname.replace("/storage/v1/object/", "") });
    }
    if(url.pathname === "/rest/v1/questoes_enviadas"){
      if(req.method() === "POST"){ JSON.parse(req.postData()).forEach(banco.guardar); return rota.fulfill({ status: 201, body: "" }); }
      if(req.method() === "PATCH"){
        const alvo = new URLSearchParams(url.search).get("id").replace(/^eq\./, "");
        if(banco.linhas.has(alvo)) banco.guardar(Object.assign({ id: alvo }, JSON.parse(req.postData())));
        return rota.fulfill({ status: 204, body: "" });
      }
      const desde = (new URLSearchParams(url.search).get("atualizado_em") || "gt.1970").slice(3);
      // o RLS de mentira: a equipe vê tudo; os outros, as aprovadas/removidas e as próprias
      const visiveis = [...banco.linhas.values()].filter(l => papel === "professor" || l.autor_id === id || ["aprovada", "removida"].includes(l.status));
      return json(visiveis.filter(l => l.atualizado_em > desde).sort((a, b) => a.atualizado_em.localeCompare(b.atualizado_em)));
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

const QUESTAO = [
  "INSTITUICAO: Teste de Progresso", "ANO: 2025", "TIPO: Graduação", "===",
  "NUMERO: 7", "PERGUNTA: Homem de 60 anos com dor torácica. Qual o diagnóstico do ECG a seguir?",
  "A: Infarto inferior", "B: Pericardite", "C: Bloqueio de ramo esquerdo", "D: Normal",
  "GABARITO: A", "EXPLICACAO: Supra de ST em DII, DIII e aVF.", "IMAGEM: sim", "AREA: Clínica Médica",
  "ESPECIALIDADE: Cardiologia", "ASSUNTO: Assunto criado no envio",
].join("\n");

async function alunaEnvia(banco){
  const aluna = await abrir(banco, { id: ALUNA, papel: "aluno", nome: "Ana Aluna" });
  const qid = await aluna.pagina.evaluate(({ texto, png }) => {
    const resultado = parseImportText(texto, {});
    resultado[0].imagemUrl = png;                       // a figura anexada na pré-visualização
    return importarItensAnalisados(resultado, "sugerir").ids[0];
  }, { texto: QUESTAO, png: PNG });
  await sincronizar(aluna.pagina);
  return { aluna, qid };
}

test("a questão enviada sobe com a imagem no Storage e a linha leva só o endereço", async () => {
  const banco = nuvemQueGuarda();
  const { aluna, qid } = await alunaEnvia(banco);
  assert.equal(banco.arquivos.length, 1, "a imagem deveria subir uma vez");
  assert.match(banco.arquivos[0].caminho, new RegExp("/questoes/" + ALUNA + "/"));
  assert.equal(banco.arquivos[0].tipo, "image/png");
  assert.ok(banco.arquivos[0].bytes > 20);
  const linha = banco.linhas.get(qid);
  assert.equal(linha.status, "pendente");
  assert.equal(linha.autor_id, ALUNA);
  assert.equal(linha.autor_nome, "Ana Aluna");
  assert.equal(linha.dados.tipoProva, "graduacao");
  assert.equal(linha.dados.numeroNaProva, 7);
  assert.match(linha.dados.imagemUrl, /^https:\/\/.*\/storage\/v1\/object\/public\/questoes\//);
  assert.ok(linha.dados.taxonomiaNova && linha.dados.taxonomiaNova.assunto.nome === "Assunto criado no envio");
  const local = await aluna.pagina.evaluate(id => ({ url: getQuestao(id).imagemUrl, fila: db.nuvem.globaisPendentes.length, envio: db.nuvem.meusEnvios[id] }), qid);
  assert.match(local.url, /^https:/, "a cópia local passa a apontar para o Storage");
  assert.equal(local.fila, 0);
  assert.equal(local.envio.status, "pendente");
  // uma nova sincronização não manda a imagem de novo
  await sincronizar(aluna.pagina);
  assert.equal(banco.arquivos.length, 1);
  assert.deepEqual(aluna.erros, []);
  await aluna.contexto.close();
});

test("a equipe recebe a enviada na fila, aprova, e a questão desce para a turma", async () => {
  const banco = nuvemQueGuarda();
  const { aluna, qid } = await alunaEnvia(banco);
  const prof = await abrir(banco, { id: PROF, papel: "professor", nome: "Paulo Professor" });
  await sincronizar(prof.pagina);
  const naFila = await prof.pagina.evaluate(id => {
    const q = getQuestao(id);
    state.filtroRota.abaQualidade = "sugeridas"; navigate("revisao-dificeis");
    return { status: q.status, autor: q.autorNome, imagem: q.imagemUrl, assunto: nomeAssunto(q.assuntoId),
      naTela: document.getElementById("conteudoPagina").textContent.includes("Ana Aluna"),
      miniatura: !!document.querySelector("#conteudoPagina img.imp-imagem-previa"),
      aviso: gerarNotificacoes(usuarioAtual()).some(n => /questão enviada aguardando/.test(n.texto)) };
  }, qid);
  assert.equal(naFila.status, "pendente");
  assert.equal(naFila.autor, "Ana Aluna");
  assert.match(naFila.imagem, /storage\/v1\/object\/public/);
  assert.equal(naFila.assunto, "Assunto criado no envio");
  assert.ok(naFila.naTela && naFila.miniatura && naFila.aviso);

  await prof.pagina.evaluate(id => aprovarQuestaoSugerida(id), qid);
  await sincronizar(prof.pagina);
  const linha = banco.linhas.get(qid);
  assert.equal(linha.status, "aprovada");
  assert.equal(linha.decidido_por_nome, "Paulo Professor");
  assert.equal(linha.autor_id, ALUNA, "aprovar não troca o autor");

  // outra aluna, noutro aparelho, recebe a questão pronta para estudar
  const outra = await abrir(banco, { id: "22222222-3333-4444-5555-666666666666", papel: "aluno", nome: "Bia" });
  await sincronizar(outra.pagina);
  const r = await outra.pagina.evaluate(id => ({ ativa: questoesAtivas(true).some(q => q.id === id), tipo: tipoProvaDe(getQuestao(id)) }), qid);
  assert.deepEqual(r, { ativa: true, tipo: "graduacao" });

  // e a aluna que enviou vê que foi aprovada
  await sincronizar(aluna.pagina);
  assert.equal(await aluna.pagina.evaluate(id => db.nuvem.meusEnvios[id].status, qid), "aprovada");

  // a equipe exclui: a questão sai do aparelho da outra aluna também
  await prof.pagina.evaluate(id => excluirQuestaoConfirmado(id), qid);
  await sincronizar(prof.pagina);
  assert.equal(banco.linhas.get(qid).status, "removida");
  await sincronizar(outra.pagina);
  assert.equal(await outra.pagina.evaluate(id => !!getQuestao(id), qid), false);
  for(const p of [aluna, prof, outra]){ assert.deepEqual(p.erros, []); await p.contexto.close(); }
});

test("recusar devolve o motivo a quem enviou", async () => {
  const banco = nuvemQueGuarda();
  const { aluna, qid } = await alunaEnvia(banco);
  const prof = await abrir(banco, { id: PROF, papel: "professor", nome: "Paulo Professor" });
  await sincronizar(prof.pagina);
  await prof.pagina.evaluate(id => {
    abrirRecusaQuestaoSugerida(id);
    document.getElementById("motivoRecusaQuestao").value = "Já existe no banco.";
    recusarQuestaoSugerida(id);
  }, qid);
  await sincronizar(prof.pagina);
  assert.equal(banco.linhas.get(qid).status, "recusada");
  assert.equal(banco.linhas.get(qid).motivo, "Já existe no banco.");
  await sincronizar(aluna.pagina);
  const r = await aluna.pagina.evaluate(id => {
    navigate("importar-questoes");
    return { local: !!getQuestao(id), envio: db.nuvem.meusEnvios[id], tela: document.getElementById("conteudoPagina").textContent };
  }, qid);
  assert.equal(r.local, false);
  assert.equal(r.envio.status, "recusada");
  assert.match(r.tela, /Suas questões enviadas/);
  assert.match(r.tela, /Motivo:\s*Já existe no banco\./);
  await aluna.contexto.close(); await prof.contexto.close();
});

test("sem o espaço de imagens no banco, a questão espera na fila sem travar o resto", async () => {
  const banco = nuvemQueGuarda();
  const aluna = await abrir(banco, { id: ALUNA, papel: "aluno", nome: "Ana Aluna", semBalde: true });
  const r = await aluna.pagina.evaluate(async ({ texto, png }) => {
    const resultado = parseImportText(texto, {});
    resultado[0].imagemUrl = png;
    const qid = importarItensAnalisados(resultado, "sugerir").ids[0];
    registrarComentario("q-unifesp2024-001", "Dúvida qualquer", false);
    while(nuvemEstado.sincronizando) await new Promise(ok => setTimeout(ok, 50));
    await nuvemSincronizarAgora();
    return { qid, aviso: db.nuvem.avisoImagens || "", naFila: db.nuvem.globaisPendentes.filter(p => p.tabela === "questoes_enviadas").length,
      comentarioNaFila: db.nuvem.globaisPendentes.filter(p => p.tabela === "comentarios").length, erro: nuvemEstado.ultimoErro,
      aindaDataUri: /^data:/.test(getQuestao(qid).imagemUrl) };
  }, { texto: QUESTAO, png: PNG });
  assert.match(r.aviso, /esquema\.sql/);
  assert.equal(r.naFila, 1);
  assert.equal(r.comentarioNaFila, 0, "o comentário sobe mesmo assim");
  assert.equal(r.erro, null);
  assert.ok(r.aindaDataUri);
  assert.equal(banco.linhas.size, 0);
  assert.ok(banco.pedidos.some(p => p.caminho === "/rest/v1/comentarios" && p.metodo === "POST"));
  await aluna.contexto.close();
});

test("questões criadas antes, só neste navegador, sobem pelo botão, e a equipe exporta para dados/", async () => {
  const banco = nuvemQueGuarda();
  const prof = await abrir(banco, { id: PROF, papel: "professor", nome: "Paulo Professor" });
  const r = await prof.pagina.evaluate(async texto => {
    // como se tivesse sido publicada sem a nuvem: fora da fila
    const ids = importarItensAnalisados(parseImportText(texto, {}), "ativa").ids;
    db.nuvem.globaisPendentes = db.nuvem.globaisPendentes.filter(p => p.tabela !== "questoes_enviadas");
    navigate("importar-questoes");
    const antes = document.getElementById("conteudoPagina").textContent.includes("estão só neste navegador");
    nuvemEnviarQuestoesDesteNavegador();
    while(nuvemEstado.sincronizando) await new Promise(ok => setTimeout(ok, 50));
    await nuvemSincronizarAgora();
    return { id: ids[0], antes, depois: questoesSoNesteNavegador().length };
  }, QUESTAO);
  assert.ok(r.antes);
  assert.equal(r.depois, 0);
  assert.equal(banco.linhas.get(r.id).status, "aprovada", "a equipe publica direto");
  // e daí para a pasta dados/: um arquivo pronto, que avisa do assunto novo
  await prof.pagina.evaluate(() => navigate("banco-questoes"));
  const [baixado] = await Promise.all([
    prof.pagina.waitForEvent("download"),
    prof.pagina.getByRole("button", { name: /Exportar 1 enviada/ }).click(),
  ]);
  assert.match(baixado.suggestedFilename(), /^questoes-enviadas-\d{4}-\d{2}-\d{2}\.js$/);
  const conteudo = await new Promise((ok, falha) => baixado.createReadStream().then(fluxo => {
    let t = ""; fluxo.on("data", c => t += c); fluxo.on("end", () => ok(t)); fluxo.on("error", falha);
  }));
  assert.match(conteudo, /window\.EscDados\.registrarQuestoes\("questoes-enviadas-/);
  assert.ok(conteudo.includes('"id":"' + r.id + '"'));
  assert.match(conteudo, /"tipoProva":"graduacao"/);
  assert.match(conteudo, /precisam entrar em dados\/taxonomia\.js/);
  await prof.contexto.close();
});
