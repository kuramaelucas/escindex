/* ==========================================================================
   A NUVEM, SIMULADA
   ==========================================================================
   Nenhum teste fala com o Supabase de verdade. Aqui as chamadas para
   *.supabase.co são respondidas por um servidor de mentira (o `falsa` de
   cada teste), que registra o que o site pediu. Assim dá para conferir, sem
   internet e sem mexer na turma, que:
     - o cadastro manda o endereço de volta (redirect_to) e a volta do link
       do e-mail mostra a tela certa e apaga o token do endereço;
     - "esqueci a senha" chega até a troca de senha;
     - comentário sobe para a tabela `comentarios`;
     - o percentil usa as notas da turma;
     - o Painel da Turma lê as funções do banco.
   ========================================================================== */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, srv;
before(async () => { navegador = await chromium.launch(); srv = await subirServidor(); });
after(async () => { await navegador?.close(); await srv?.fechar(); });

const ID = "11111111-2222-3333-4444-555555555555";
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const TOKEN = b64({ alg: "HS256" }) + "." + b64({ sub: ID, email: "nova@turma.br", exp: 9999999999 }) + ".assinatura";

/* O Supabase de mentira. `perfil` é o que /rest/v1/perfis devolve;
   `rpc` são as respostas das funções. Tudo o que chega fica em `pedidos`. */
async function abrirComNuvemFalsa({ caminho = "index.html", perfil = null, rpc = {}, sessao = null } = {}){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  const pedidos = [];
  await contexto.route(/supabase\.co/, async rota => {
    const req = rota.request();
    const url = new URL(req.url());
    const corpo = req.postData();
    pedidos.push({ metodo: req.method(), caminho: url.pathname, busca: url.search, corpo, auth: req.headers()["authorization"] || "" });
    const json = (dados, status = 200) => rota.fulfill({ status, contentType: "application/json", body: JSON.stringify(dados) });
    if(url.pathname.startsWith("/rest/v1/rpc/")) return json(rpc[url.pathname.slice(13)] ?? []);
    if(url.pathname === "/rest/v1/perfis" && req.method() === "GET") return json(perfil ? [perfil] : []);
    if(url.pathname.startsWith("/rest/v1/")) return req.method() === "GET" ? json([]) : rota.fulfill({ status: 201, body: "" });
    if(url.pathname.startsWith("/auth/v1/")) return json({});
    return rota.abort();
  });
  if(sessao) await contexto.addInitScript(s => localStorage.setItem("esc_nuvem_sessao", JSON.stringify(s)), sessao);
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(srv.url + caminho);
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto, pedidos, erros };
}
const perfilDe = (status, papel = "aluno") => ({ id: ID, nome: "Nova Aluna", email: "nova@turma.br", papel, status, ano_faculdade: "3º ano" });

test("cadastro manda o endereço de volta para o site no link do e-mail", async () => {
  const { pagina, contexto, pedidos, erros } = await abrirComNuvemFalsa();
  await pagina.evaluate(() => nuvemCadastrarPelaTela({ email: "nova@turma.br", senha: "segredo1", nome: "Nova", matricula: "1" }));
  const cadastro = pedidos.find(p => p.caminho === "/auth/v1/signup");
  assert.ok(cadastro, "o cadastro deveria chamar /auth/v1/signup");
  const volta = new URLSearchParams(cadastro.busca).get("redirect_to");
  assert.equal(volta, srv.url + "index.html");
  // sem sessão devolvida = confirmação ligada: a tela diz para olhar o e-mail
  await pagina.waitForFunction(() => state.route === "retorno-email");
  assert.match(await pagina.innerText("#app"), /Confira o seu e-mail/);
  assert.deepEqual(erros, []);
  await contexto.close();
});

test("voltando do link de confirmação: e-mail confirmado, aguardando aprovação, token fora do endereço", async () => {
  const { pagina, contexto, erros } = await abrirComNuvemFalsa({
    caminho: `index.html#access_token=${TOKEN}&expires_in=3600&refresh_token=r1&token_type=bearer&type=signup`,
    perfil: perfilDe("pendente"),
  });
  await pagina.waitForFunction(() => document.getElementById("app").innerText.includes("E-mail confirmado"));
  assert.match(await pagina.innerText("#app"), /falta a coordenação aprovar/);
  assert.doesNotMatch(await pagina.evaluate(() => location.href), /access_token/);
  assert.equal(await pagina.evaluate(() => usuarioAtual()), null);
  assert.equal(await pagina.evaluate(() => localStorage.getItem("esc_nuvem_sessao")), null, "a sessão provisória não pode ficar guardada");
  assert.deepEqual(erros, []);
  await contexto.close();
});

test("voltando do link de confirmação já aprovado: entra direto", async () => {
  const { pagina, contexto, erros } = await abrirComNuvemFalsa({
    caminho: `index.html#access_token=${TOKEN}&refresh_token=r1&type=signup`,
    perfil: perfilDe("aprovado"),
  });
  await pagina.waitForFunction(() => usuarioAtual() && usuarioAtual().id === "11111111-2222-3333-4444-555555555555");
  assert.deepEqual(erros, []);
  await contexto.close();
});

test("link vencido: a tela explica e oferece outro", async () => {
  const { pagina, contexto } = await abrirComNuvemFalsa({
    caminho: "index.html#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired",
  });
  await pagina.waitForFunction(() => document.getElementById("app").innerText.includes("Este link não vale mais"));
  assert.match(await pagina.innerText("#app"), /expirou/);
  await contexto.close();
});

test("esqueci a senha: o link volta para a troca de senha, que usa o token do e-mail", async () => {
  const { pagina, contexto, pedidos } = await abrirComNuvemFalsa({ caminho: `index.html#access_token=${TOKEN}&refresh_token=r1&type=recovery` });
  await pagina.waitForSelector("#novaSenha1");
  await pagina.fill("#novaSenha1", "senhanova9");
  await pagina.fill("#novaSenha2", "senhanova9");
  await pagina.evaluate(() => salvarNovaSenhaDoEmail());
  await pagina.waitForFunction(() => state.route === "login");
  const troca = pedidos.find(p => p.caminho === "/auth/v1/user" && p.metodo === "PUT");
  assert.ok(troca, "deveria chamar PUT /auth/v1/user");
  assert.equal(troca.auth, "Bearer " + TOKEN);
  assert.deepEqual(JSON.parse(troca.corpo), { password: "senhanova9" });
  // e o pedido do link também leva o endereço de volta
  await pagina.evaluate(() => nuvemPedirNovaSenha("nova@turma.br"));
  const pedido = pedidos.find(p => p.caminho === "/auth/v1/recover");
  assert.equal(new URLSearchParams(pedido.busca).get("redirect_to"), srv.url + "index.html");
  await contexto.close();
});

test("comentário na questão sobe para a nuvem com o nome de quem escreveu", async () => {
  const sessao = { token: TOKEN, refresh: "r1", usuarioId: ID, email: "nova@turma.br" };
  const { pagina, contexto, pedidos, erros } = await abrirComNuvemFalsa({ perfil: perfilDe("aprovado"), sessao });
  await pagina.evaluate(async () => {
    const u = nuvemAplicarPerfilLocal({ id: "11111111-2222-3333-4444-555555555555", nome: "Nova Aluna", papel: "aluno", status: "aprovado" });
    state.usuarioAtualId = u.id;
    registrarComentario("q-unifesp2024-001", "Por que não é a A?", false);
    // a sincronização da abertura pode estar no meio: espera ela acabar
    while(nuvemEstado.sincronizando) await new Promise(ok => setTimeout(ok, 50));
    await nuvemSincronizarAgora();
  });
  const envio = pedidos.find(p => p.caminho === "/rest/v1/comentarios" && p.metodo === "POST");
  assert.ok(envio, "o comentário deveria subir para /rest/v1/comentarios");
  const linha = JSON.parse(envio.corpo)[0];
  assert.equal(linha.questao_id, "q-unifesp2024-001");
  assert.equal(linha.usuario_id, ID);
  assert.equal(linha.autor_nome, "Nova Aluna");
  assert.equal(linha.resposta_oficial, false);
  assert.deepEqual(erros, []);
  await contexto.close();
});

test("percentil do simulado usa as notas da turma inteira", async () => {
  const sessao = { token: TOKEN, refresh: "r1", usuarioId: ID, email: "nova@turma.br" };
  const notas = [40, 50, 60, 70, 80, 90].map((n, i) => ({ id: "t" + i, nota: n }));
  const { pagina, contexto } = await abrirComNuvemFalsa({ perfil: perfilDe("aprovado"), sessao, rpc: { notas_do_simulado: notas } });
  const r = await pagina.evaluate(async () => {
    estatisticasRankingSimulado("Prova X", 75);                 // dispara a busca
    await new Promise(ok => setTimeout(ok, 300));
    return estatisticasRankingSimulado("Prova X", 75);
  });
  assert.equal(r.origem, "turma");
  assert.equal(r.n, 6);
  assert.equal(r.percentil, 67);
  await contexto.close();
});

test("Painel da Turma lê as funções do banco e separa por ano", async () => {
  const sessao = { token: TOKEN, refresh: "r1", usuarioId: ID, email: "prof@turma.br" };
  const hoje = new Date().toISOString().slice(0, 10);
  const aluno = (id, nome, ano, r30, a30, ultima) => ({ usuario_id: id, nome, email: id + "@t.br", ano_faculdade: ano, status: "aprovado",
    respostas: r30, acertos: a30, respostas_7d: r30 ? 5 : 0, acertos_7d: 3, respostas_30d: r30, acertos_30d: a30, respostas_30a60d: 0, acertos_30a60d: 0,
    dias_ativos_30d: r30 ? 4 : 0, ultima_resposta: ultima, cartoes_total: 0, cartoes_30d: 0, ultimo_cartao: null, simulados: 0, media_simulados: null, por_area: { "area-cm": [r30, a30] } });
  const { pagina, contexto, erros } = await abrirComNuvemFalsa({ perfil: perfilDe("aprovado", "professor"), sessao, rpc: {
    painel_turma: [aluno("a1", "Ana", "3º ano", 40, 30, hoje), aluno("a2", "Beto", "4º ano", 0, 0, null), aluno("a3", "Caio", "4º ano", 20, 8, hoje)],
    atividade_por_semana: [{ ano_faculdade: "3º ano", semana: hoje, alunos_ativos: 1, respostas: 40, acertos: 30 }],
  }});
  await pagina.evaluate(() => {
    const u = nuvemAplicarPerfilLocal({ id: "11111111-2222-3333-4444-555555555555", nome: "Prof", papel: "professor", status: "aprovado" });
    state.usuarioAtualId = u.id;
    navigate("painel-turma");
  });
  await pagina.waitForFunction(() => document.getElementById("app").innerText.includes("Beto"));
  const texto = await pagina.innerText("#app");
  assert.match(texto, /Dados da nuvem/);
  assert.match(texto, /3º ano \(1\)/);
  assert.match(texto, /4º ano \(2\)/);
  assert.match(texto, /nunca estudou/);
  await pagina.evaluate(() => mudarFiltroPainelTurma("ano", "4º ano"));
  const doQuarto = await pagina.innerText("#app");
  assert.doesNotMatch(doQuarto, /Ana/);
  assert.deepEqual(erros, []);
  await contexto.close();
});

test("aluno não abre o Painel da Turma", async () => {
  const { pagina, contexto } = await abrirComNuvemFalsa();
  await pagina.evaluate(() => { fazerLoginDemo("aluno"); navigate("painel-turma"); });
  assert.match(await pagina.innerText("#app"), /Acesso restrito/);
  assert.equal(await pagina.evaluate(() => navItemsParaPapel("aluno").some(i => i.id === "painel-turma")), false);
  await contexto.close();
});
