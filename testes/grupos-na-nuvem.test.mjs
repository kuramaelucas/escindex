/* GRUPOS NA NUVEM: o grupo, o pedido de entrada e a aprovação, as questões do
   grupo, os grupos de estudo e os cartões (sugeridos à equipe e compartilhados
   com o grupo). Um Supabase de mentira que GUARDA as linhas, com o RLS dos
   pontos que importam (linha de outra pessoa não entra por upsert; quem é de
   fora não lê o grupo) — o RLS de verdade é o de testes/sql/regras.sql. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, srv;
before(async () => { navegador = await chromium.launch(); srv = await subirServidor(); });
after(async () => { await navegador?.close(); await srv?.fechar(); });

const ANA = "11111111-2222-3333-4444-555555555551";
const BIA = "11111111-2222-3333-4444-555555555552";
const CARLA = "11111111-2222-3333-4444-555555555553";
const PROF = "99999999-8888-7777-6666-555555555555";
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const token = id => b64({ alg: "HS256" }) + "." + b64({ sub: id, exp: 9999999999 }) + ".assinatura";
const CHAVES = {
  grupos: l => l.id, grupo_membros: l => l.grupo_id + "|" + l.usuario_id, subgrupos: l => l.id,
  questoes_enviadas: l => l.id, flashcards_enviados: l => l.id, flashcards_pessoais: l => l.id,
};

function nuvemQueGuarda(){
  const banco = { tabelas: {}, pedidos: [], relogio: Date.parse("2026-10-01T12:00:00Z") };
  banco.carimbo = () => new Date(banco.relogio += 1000).toISOString();
  banco.tabela = t => (banco.tabelas[t] = banco.tabelas[t] || new Map());
  banco.guardar = (t, linha) => {
    const k = CHAVES[t](linha);
    banco.tabela(t).set(k, Object.assign({}, banco.tabela(t).get(k) || {}, linha, { atualizado_em: banco.carimbo() }));
  };
  // quem é do grupo: linha aprovada ou a dona
  banco.doGrupo = (gid, uid) => !!gid && ([...banco.tabela("grupo_membros").values()].some(m => m.grupo_id === gid && m.usuario_id === uid && m.status === "aprovado")
    || (banco.tabela("grupos").get(gid) || {}).criado_por === uid);
  return banco;
}

async function abrir(banco, { id, papel = "aluno", nome, semTabelas = false }){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  const perfil = { id, nome, email: nome.split(" ")[0].toLowerCase() + "@turma.br", papel, status: "aprovado", ano_faculdade: "3º ano" };
  await contexto.route(/supabase\.co/, async rota => {
    const req = rota.request();
    const url = new URL(req.url());
    const busca = new URLSearchParams(url.search);
    banco.pedidos.push({ quem: id, metodo: req.method(), tabela: url.pathname.replace("/rest/v1/", ""), busca: url.search, prefer: req.headers()["prefer"] || "", corpo: req.postData() });
    const json = (dados, status = 200) => rota.fulfill({ status, contentType: "application/json", body: JSON.stringify(dados) });
    const tabela = url.pathname.replace("/rest/v1/", "");
    const equipe = papel === "professor" || papel === "admin";
    if(CHAVES[tabela] && semTabelas && tabela !== "questoes_enviadas") return json({ code: "PGRST205", message: "Could not find the table 'public." + tabela + "' in the schema cache" }, 404);
    if(CHAVES[tabela]){
      if(req.method() === "POST"){
        const linhas = JSON.parse(req.postData());
        const ignorar = /ignore-duplicates/.test(req.headers()["prefer"] || "");
        for(const l of linhas){
          // o RLS de inserção: só em nome próprio (a equipe grava qualquer uma)
          const dono = { flashcards_pessoais: l.usuario_id, grupos: l.criado_por, grupo_membros: l.usuario_id, subgrupos: l.criado_por, questoes_enviadas: l.autor_id, flashcards_enviados: l.autor_id }[tabela];
          const rodizio = tabela === "grupos" && /^rodizio-/.test(l.id) && !l.criado_por;
          if(!equipe && dono !== id && !rodizio) return rota.fulfill({ status: 403, contentType: "application/json", body: JSON.stringify({ code: "42501", message: "new row violates row-level security policy" }) });
          if(tabela === "grupo_membros" && l.status === "aprovado" && !equipe && !/^rodizio-/.test(l.grupo_id) && (banco.tabela("grupos").get(l.grupo_id) || {}).criado_por !== id)
            return rota.fulfill({ status: 403, contentType: "application/json", body: JSON.stringify({ code: "42501", message: "new row violates row-level security policy" }) });
          if(ignorar && banco.tabela(tabela).has(CHAVES[tabela](l))) continue;
          banco.guardar(tabela, l);
        }
        return rota.fulfill({ status: 201, body: "" });
      }
      if(req.method() === "PATCH"){
        const g = busca.get("grupo_id"), u = busca.get("usuario_id"), i = busca.get("id");
        const chave = tabela === "grupo_membros" ? (g || "").replace(/^eq\./, "") + "|" + (u || "").replace(/^eq\./, "") : (i || "").replace(/^eq\./, "");
        if(banco.tabela(tabela).has(chave)) banco.guardar(tabela, Object.assign({}, banco.tabela(tabela).get(chave), JSON.parse(req.postData())));
        return rota.fulfill({ status: 204, body: "" });
      }
      const desde = (busca.get("atualizado_em") || "gt.1970").slice(3);
      // o RLS de leitura das tabelas de grupo
      const pode = l => {
        if(equipe) return true;
        if(tabela === "grupos") return true;
        if(tabela === "grupo_membros") return l.usuario_id === id || banco.doGrupo(l.grupo_id, id);
        if(tabela === "subgrupos") return banco.doGrupo(l.grupo_id, id);
        if(tabela === "questoes_enviadas") return l.grupo_id ? banco.doGrupo(l.grupo_id, id) : (l.status === "aprovada" || l.autor_id === id);
        if(tabela === "flashcards_pessoais") return l.usuario_id === id;
        if(tabela === "flashcards_enviados") return l.grupo_id ? banco.doGrupo(l.grupo_id, id) : (l.status === "aprovado" || l.status === "removido" || l.autor_id === id);
        return false;
      };
      return json([...banco.tabela(tabela).values()].filter(pode).filter(l => l.atualizado_em > desde).sort((a, b) => a.atualizado_em.localeCompare(b.atualizado_em)));
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
const sincronizar = async p => { await p.evaluate(async () => { while(nuvemEstado.sincronizando) await new Promise(ok => setTimeout(ok, 50)); await nuvemSincronizarAgora(); }); };

test("grupo na nuvem: criar, pedir para entrar, aprovar, questão do grupo, grupo de estudo", async () => {
  const banco = nuvemQueGuarda();
  const ana = await abrir(banco, { id: ANA, nome: "Ana Aluna" });
  const bia = await abrir(banco, { id: BIA, nome: "Bia Aluna" });
  const carla = await abrir(banco, { id: CARLA, nome: "Carla Aluna" });
  try{
    // 1) a Ana cria um grupo; ele sobe, com ela como membro, e o grupo vem ANTES do membro
    const gid = await ana.pagina.evaluate(() => {
      navigate("meu-grupo");
      document.getElementById("novoGrupoTipo").value = "proprio";
      document.getElementById("novoGrupoNome").value = "Grupo da Ana";
      criarMeuGrupo();
      return usuarioAtual().grupoId;
    });
    await sincronizar(ana.pagina);
    assert.equal(banco.tabela("grupos").get(gid).nome, "Grupo da Ana");
    assert.equal(banco.tabela("grupos").get(gid).criado_por, ANA);
    assert.equal(banco.tabela("grupo_membros").get(gid + "|" + ANA).status, "aprovado");
    const ordem = banco.pedidos.filter(p => p.quem === ANA && p.metodo === "POST" && /^grupos?|grupo_membros/.test(p.tabela)).map(p => p.tabela);
    assert.ok(ordem.indexOf("grupos") < ordem.indexOf("grupo_membros"), "o grupo sobe antes do membro: " + ordem);

    // 2) a Bia, em outro aparelho, vê o grupo e pede para entrar
    await sincronizar(bia.pagina);
    assert.equal(await bia.pagina.evaluate(id => !!getGrupo(id), gid), true, "o grupo desce para quem não o criou");
    await bia.pagina.evaluate(id => solicitarAcessoGrupo(id), gid);
    await sincronizar(bia.pagina);
    assert.equal(banco.tabela("grupo_membros").get(gid + "|" + BIA).status, "pendente");

    // 3) o pedido chega à Ana, com o nome; ela aprova (PATCH, não upsert); a Bia passa a estar no grupo
    await sincronizar(ana.pagina);
    const pedido = await ana.pagina.evaluate(([id, bia]) => ({ pend: getGrupo(id).solicitacoesPendentes.slice(), nome: nomeDoMembro(getGrupo(id), bia) }), [gid, BIA]);
    assert.deepEqual(pedido.pend, [BIA]);
    assert.equal(pedido.nome, "Bia Aluna");
    await ana.pagina.evaluate(([id, bia]) => aprovarAcessoGrupo(id, bia), [gid, BIA]);
    await sincronizar(ana.pagina);
    assert.equal(banco.tabela("grupo_membros").get(gid + "|" + BIA).status, "aprovado");
    assert.ok(banco.pedidos.some(p => p.quem === ANA && p.metodo === "PATCH" && p.tabela === "grupo_membros"), "aprovar o pedido de outra pessoa vai como alteração da linha");
    await sincronizar(bia.pagina);
    const naBia = await bia.pagina.evaluate(id => ({ membro: getGrupo(id).membrosAprovados.includes(usuarioAtual().id), grupo: usuarioAtual().grupoId,
      integrantes: membrosDoGrupo(getGrupo(id)).map(m => m.nome) }), gid);
    assert.equal(naBia.membro, true); assert.equal(naBia.grupo, gid);
    assert.deepEqual(naBia.integrantes, ["Ana Aluna", "Bia Aluna"]);

    // 4) questão do grupo: sobe já aprovada, com o id do grupo; só os membros a recebem
    await ana.pagina.evaluate(id => {
      db.questoes.push({ id: "q-grupo-1", real: true, grupoId: id, banca: "Lista X", ano: 2026, status: "ativa", areaId: db.taxonomia.areas[0].id,
        especialidadeId: db.taxonomia.especialidades[0].id, assuntoId: db.taxonomia.assuntos[0].id, enunciado: "Pergunta do grupo?",
        alternativas: [{ id: "A", texto: "um" }, { id: "B", texto: "dois" }], gabarito: "A", criadoPor: usuarioAtual().id, criadoEm: hojeISO(),
        estatisticas: { respostas: 0, acertos: 0, distribuicaoAlternativas: {} } });
      nuvemMarcarQuestao("q-grupo-1");
    }, gid);
    await sincronizar(ana.pagina);
    const linhaQ = banco.tabela("questoes_enviadas").get("q-grupo-1");
    assert.equal(linhaQ.grupo_id, gid); assert.equal(linhaQ.status, "aprovada");
    await sincronizar(bia.pagina); await sincronizar(carla.pagina);
    assert.equal(await bia.pagina.evaluate(() => (getQuestao("q-grupo-1") || {}).grupoId), gid, "o colega do grupo recebe a questão");
    assert.equal(await carla.pagina.evaluate(() => !!getQuestao("q-grupo-1")), false, "quem é de fora não a recebe");
    // a Bia corrige a questão da Ana: vai como alteração, não como upsert em nome da Ana
    await bia.pagina.evaluate(() => { getQuestao("q-grupo-1").enunciado = "Pergunta do grupo, corrigida pela Bia?"; nuvemMarcarQuestao("q-grupo-1"); });
    await sincronizar(bia.pagina);
    assert.equal(banco.tabela("questoes_enviadas").get("q-grupo-1").dados.enunciado, "Pergunta do grupo, corrigida pela Bia?");
    assert.equal(banco.tabela("questoes_enviadas").get("q-grupo-1").autor_id, ANA);

    // 5) grupo de estudo: a Ana monta com a Bia; a divisão chega à Bia
    await sincronizar(ana.pagina);
    await ana.pagina.evaluate(([bia]) => {
      abrirFormularioSubgrupo(null);
      document.getElementById("sgNome").value = "Dupla";
      document.querySelectorAll(".sgMembro").forEach(el => { el.checked = true; });
      document.querySelectorAll(".sgConjunto").forEach(el => { el.checked = true; });
      salvarSubgrupo("");
    }, [BIA]);
    await sincronizar(ana.pagina);
    assert.equal(banco.tabela("subgrupos").size, 1);
    await sincronizar(bia.pagina); await sincronizar(carla.pagina);
    const sgBia = await bia.pagina.evaluate(() => ({ n: db.subgrupos.length, nome: db.subgrupos[0] && db.subgrupos[0].nome, dividida: Object.keys((db.subgrupos[0] || {}).divisao || {}).length }));
    assert.deepEqual(sgBia, { n: 1, nome: "Dupla", dividida: 1 });
    assert.equal(await carla.pagina.evaluate(() => db.subgrupos.length), 0, "o grupo de estudo é só do grupo");
    // a Bia sai do grupo de estudo: PATCH na linha da Ana
    await bia.pagina.evaluate(() => sairDoSubgrupo(db.subgrupos[0].id));
    await sincronizar(bia.pagina);
    assert.ok(!banco.tabela("subgrupos").values().next().value.dados.membros.includes(BIA));
    // a Ana exclui: some para a Bia
    await sincronizar(ana.pagina);
    await ana.pagina.evaluate(() => { const id = db.subgrupos[0].id; db.subgrupos = db.subgrupos.filter(s => s.id !== id); saveState(); });
    await sincronizar(ana.pagina); await sincronizar(bia.pagina);
    assert.equal(await bia.pagina.evaluate(() => db.subgrupos.length), 0, "o grupo de estudo excluído some para os outros");
    for(const t of [ana, bia, carla]) assert.deepEqual(t.erros, []);
  } finally { await ana.contexto.close(); await bia.contexto.close(); await carla.contexto.close(); }
});

test("pedido de entrada avisa a dona em outro aparelho, e retirar alguém do grupo chega ao aparelho dele", async () => {
  const banco = nuvemQueGuarda();
  const ana = await abrir(banco, { id: ANA, nome: "Ana Aluna" });
  const bia = await abrir(banco, { id: BIA, nome: "Bia Aluna" });
  try{
    const gid = await ana.pagina.evaluate(() => {
      navigate("meu-grupo");
      document.getElementById("novoGrupoTipo").value = "proprio";
      document.getElementById("novoGrupoNome").value = "Grupo da Ana";
      criarMeuGrupo();
      return usuarioAtual().grupoId;
    });
    await sincronizar(ana.pagina);
    await sincronizar(bia.pagina);
    await bia.pagina.evaluate(id => solicitarAcessoGrupo(id), gid);
    await sincronizar(bia.pagina);
    // o pedido desce para a Ana, que é avisada (uma vez) e vê o número no menu
    await sincronizar(ana.pagina);
    const aviso = await ana.pagina.evaluate(() => {
      checarPedidosDeEntradaNoGrupo(); checarPedidosDeEntradaNoGrupo();
      const toasts = [...document.querySelectorAll("#toastContainer .toast")].map(t => t.textContent).filter(t => /pediu para entrar/.test(t));
      return { toasts, menu: document.getElementById("sidebarMenu").innerText };
    });
    assert.equal(aviso.toasts.length, 1);
    assert.match(aviso.toasts[0], /Bia Aluna pediu para entrar no grupo "Grupo da Ana"/);
    assert.match(aviso.menu, /Meu Grupo\s*1/);
    // aprova; a Bia entra
    await ana.pagina.evaluate(([id, bia]) => aprovarAcessoGrupo(id, bia), [gid, BIA]);
    await sincronizar(ana.pagina); await sincronizar(bia.pagina);
    assert.equal(await bia.pagina.evaluate(() => usuarioAtual().grupoId), gid);
    // a Ana retira a Bia: sobe como recusa (PATCH na linha dela) e a Bia volta ao calendário oficial
    await ana.pagina.evaluate(([id, bia]) => { window.confirm = () => true; retirarDoGrupo(id, bia); }, [gid, BIA]);
    await sincronizar(ana.pagina);
    assert.equal(banco.tabela("grupo_membros").get(gid + "|" + BIA).status, "recusado");
    await sincronizar(bia.pagina);
    const naBia = await bia.pagina.evaluate(id => ({ grupo: usuarioAtual().grupoId, oficial: db.grupoOficialId, membro: getGrupo(id).membrosAprovados.includes(usuarioAtual().id) }), gid);
    assert.equal(naBia.grupo, naBia.oficial, "o aparelho dela volta ao calendário oficial");
    assert.equal(naBia.membro, false);
    for(const t of [ana, bia]) assert.deepEqual(t.erros, []);
  } finally { await ana.contexto.close(); await bia.contexto.close(); }
});

test("cartões: compartilhado com o grupo chega aos colegas; sugerido à equipe chega ao professor, que aprova para todos", async () => {
  const banco = nuvemQueGuarda();
  const ana = await abrir(banco, { id: ANA, nome: "Ana Aluna" });
  const bia = await abrir(banco, { id: BIA, nome: "Bia Aluna" });
  const carla = await abrir(banco, { id: CARLA, nome: "Carla Aluna" });
  const prof = await abrir(banco, { id: PROF, papel: "professor", nome: "Paula Prof" });
  try{
    // a Ana e a Bia no mesmo grupo (a Bia entra pela turma do rodízio, que é aberta)
    for(const t of [ana, bia]) await t.pagina.evaluate(() => { entrarNaTurmaDoRodizio(CONFIG.anosFaculdade.indexOf("3º ano") >= 0 ? 0 : 0); });
    await sincronizar(ana.pagina); await sincronizar(bia.pagina);
    const gid = await ana.pagina.evaluate(() => usuarioAtual().grupoId);
    assert.match(gid, /^rodizio-/);
    assert.equal(banco.tabela("grupo_membros").get(gid + "|" + BIA).status, "aprovado", "a turma do rodízio é aberta: entra direto");
    // a Bia cria um cartão e o compartilha com o grupo
    await bia.pagina.evaluate(() => {
      db.flashcards.push({ id: "fc-bia-1", assuntoId: db.taxonomia.assuntos[0].id, frente: "Frente da Bia", verso: "Verso", origem: "aluno", usuarioId: usuarioAtual().id, status: "ativo", criadoPor: usuarioAtual().id, criadoEm: hojeISO() });
      compartilharCartaoComGrupo("fc-bia-1");
    });
    await sincronizar(bia.pagina);
    const linha = banco.tabela("flashcards_enviados").get("fc-bia-1");
    assert.equal(linha.grupo_id, gid); assert.equal(linha.status, "aprovado");
    await sincronizar(ana.pagina); await sincronizar(carla.pagina);
    assert.ok(await ana.pagina.evaluate(() => flashcardsAtivos(usuarioAtual().id).some(c => c.id === "fc-bia-1")), "a colega do grupo recebe o cartão no baralho");
    assert.equal(await carla.pagina.evaluate(() => (db.flashcards || []).some(c => c.id === "fc-bia-1")), false, "quem é de fora não o recebe");
    // a Bia tira do grupo: some do baralho da Ana
    await bia.pagina.evaluate(() => compartilharCartaoComGrupo("fc-bia-1"));
    await sincronizar(bia.pagina); await sincronizar(ana.pagina);
    assert.equal(banco.tabela("flashcards_enviados").get("fc-bia-1").status, "removido");
    assert.equal(await ana.pagina.evaluate(() => flashcardsAtivos(usuarioAtual().id).some(c => c.id === "fc-bia-1")), false);

    // a Bia sugere um cartão à equipe: o professor o recebe, aprova, e ele vira da equipe para todos
    await bia.pagina.evaluate(() => {
      db.flashcards.push({ id: "fc-bia-2", assuntoId: db.taxonomia.assuntos[0].id, frente: "Sugestão da Bia", verso: "Verso 2", origem: "aluno", usuarioId: usuarioAtual().id, status: "ativo", criadoPor: usuarioAtual().id, criadoEm: hojeISO() });
      sugerirFlashcardParaEquipe("fc-bia-2");
    });
    await sincronizar(bia.pagina);
    assert.equal(banco.tabela("flashcards_enviados").get("fc-bia-2").status, "pendente");
    assert.equal(await carla.pagina.evaluate(async () => { await nuvemSincronizarAgora(); return (db.flashcards || []).some(c => c.id === "fc-bia-2"); }), false, "pendente não chega à turma");
    await sincronizar(prof.pagina);
    assert.deepEqual(await prof.pagina.evaluate(() => flashcardsSugeridos().map(c => c.id)), ["fc-bia-2"]);
    await prof.pagina.evaluate(() => aprovarFlashcardSugerido("fc-bia-2"));
    await sincronizar(prof.pagina);
    assert.equal(banco.tabela("flashcards_enviados").get("fc-bia-2").status, "aprovado");
    assert.ok(banco.pedidos.some(p => p.quem === PROF && p.metodo === "PATCH" && p.tabela === "flashcards_enviados"), "aprovar o cartão de um aluno vai como alteração da linha dele");
    for(const t of [carla, bia, ana]) await sincronizar(t.pagina);
    for(const t of [carla, bia, ana]){
      assert.ok(await t.pagina.evaluate(() => flashcardsDaEquipe().some(c => c.id === "fc-bia-2")), "o cartão aprovado vira da equipe, para todos");
    }
    // o professor publica um cartão pela plataforma: sobe aprovado e chega à turma
    await prof.pagina.evaluate(() => {
      db.flashcards.push({ id: "fc-prof-1", assuntoId: db.taxonomia.assuntos[0].id, frente: "Da equipe", verso: "v", origem: "autoral", usuarioId: null, status: "ativo", criadoPor: usuarioAtual().id, criadoEm: hojeISO() });
    });
    await sincronizar(prof.pagina); await sincronizar(carla.pagina);
    assert.ok(await carla.pagina.evaluate(() => flashcardsDaEquipe().some(c => c.id === "fc-prof-1")));
    // nada subiu em duplicidade: sincronizar de novo não reenvia o que já subiu
    const antes = banco.pedidos.filter(p => p.metodo !== "GET" && /flashcards_enviados|grupos|grupo_membros/.test(p.tabela)).length;
    for(const t of [ana, bia, carla, prof]) await sincronizar(t.pagina);
    const depois = banco.pedidos.filter(p => p.metodo !== "GET" && /flashcards_enviados|grupos|grupo_membros/.test(p.tabela)).length;
    assert.equal(depois, antes, "sem mudança, nada é reenviado");
    for(const t of [ana, bia, carla, prof]) assert.deepEqual(t.erros, []);
  } finally { for(const t of [ana, bia, carla, prof]) await t.contexto.close(); }
});

test("banco que ainda não rodou o esquema.sql desta versão: os grupos esperam no navegador e o resto continua subindo", async () => {
  const banco = nuvemQueGuarda();
  const ana = await abrir(banco, { id: ANA, nome: "Ana Aluna", semTabelas: true });
  try{
    const r = await ana.pagina.evaluate(() => {
      navigate("meu-grupo");
      document.getElementById("novoGrupoTipo").value = "proprio";
      document.getElementById("novoGrupoNome").value = "Grupo sem tabela";
      criarMeuGrupo();
      db.flashcards.push({ id: "fc-x", assuntoId: db.taxonomia.assuntos[0].id, frente: "f", verso: "v", origem: "aluno", usuarioId: usuarioAtual().id, status: "ativo", criadoPor: usuarioAtual().id, criadoEm: hojeISO(), grupoId: usuarioAtual().grupoId });
      return usuarioAtual().grupoId;
    });
    await sincronizar(ana.pagina);
    await sincronizar(ana.pagina);
    const depois = await ana.pagina.evaluate(id => ({ grupo: !!getGrupo(id), usuario: usuarioAtual().grupoId, sincronizou: !!db.nuvem.ultimaSyncEm, erro: nuvemEstado.ultimoErro }), r);
    assert.equal(depois.grupo, true, "o grupo continua no navegador");
    assert.equal(depois.usuario, r);
    assert.equal(depois.sincronizou, true, "a sincronização do resto não quebra por causa das tabelas novas");
    assert.equal(banco.tabela("grupos").size, 0);
    assert.deepEqual(ana.erros, []);
  } finally { await ana.contexto.close(); }
});

test("cartão que o aluno cria só para si aparece nos outros aparelhos dele, e não nos dos colegas", async () => {
  const banco = nuvemQueGuarda();
  const celular = await abrir(banco, { id: BIA, nome: "Bia Aluna" });
  const notebook = await abrir(banco, { id: BIA, nome: "Bia Aluna" });
  const colega = await abrir(banco, { id: ANA, nome: "Ana Aluna" });
  try{
    // pelo formulário, como a pessoa faria (inclui editar e arquivar)
    await celular.pagina.evaluate(() => {
      abrirFormularioFlashcard(null);
      document.getElementById("fcFrente").value = "Cartão só meu";
      document.getElementById("fcVerso").value = "Resposta";
      salvarFlashcard("", "");
    });
    await sincronizar(celular.pagina);
    assert.equal(banco.tabela("flashcards_pessoais").size, 1);
    await sincronizar(notebook.pagina); await sincronizar(colega.pagina);
    assert.deepEqual(await notebook.pagina.evaluate(() => meusFlashcards(usuarioAtual().id).map(c => c.frente)), ["Cartão só meu"], "o cartão chega ao outro aparelho da mesma pessoa");
    assert.equal(await colega.pagina.evaluate(() => (db.flashcards || []).some(c => c.frente === "Cartão só meu")), false, "e não aparece para os colegas");
    // arquivar no celular some no notebook
    await celular.pagina.evaluate(() => arquivarFlashcardConfirmado(meusFlashcards(usuarioAtual().id)[0].id));
    await sincronizar(celular.pagina); await sincronizar(notebook.pagina);
    assert.equal(await notebook.pagina.evaluate(() => meusFlashcards(usuarioAtual().id).length), 0, "arquivar chega ao outro aparelho");
    for(const t of [celular, notebook, colega]) assert.deepEqual(t.erros, []);
  } finally { for(const t of [celular, notebook, colega]) await t.contexto.close(); }
});
