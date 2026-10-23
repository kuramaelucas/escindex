/* ENVIO DE QUESTÕES AO GRUPO (destino, exclusão, lista, saída do grupo). Mesma nuvem de mentira de grupos-na-nuvem.test.mjs.
   Antes dele, GRUPOS NA NUVEM: o grupo, o pedido de entrada e a aprovação, as questões do
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


const PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
const LOTE = `INSTITUICAO: Lista do Grupo
ANO: 2026
===
NUMERO: 1
PERGUNTA: Paciente de 30 anos com febre e tosse produtiva ha 3 dias, consolidacao lobar. Qual o agente mais provavel?
A: S. pneumoniae
B: H. influenzae
GABARITO: A
ASSUNTO: Assunto Inventado
ESPECIALIDADE: Especialidade Inventada
===
NUMERO: 2
PERGUNTA: Observe o ECG abaixo. Qual o diagnostico do ritmo apresentado?
A: FA
B: Flutter
GABARITO: B
IMAGEM: sim - ECG
`;
const criarGrupo = (p, nome) => p.evaluate(n => { navigate("meu-grupo"); document.getElementById("novoGrupoTipo").value = "proprio"; document.getElementById("novoGrupoNome").value = n; criarMeuGrupo(); return usuarioAtual().grupoId; }, nome);
async function entrar(banco, dona, membro, gid){
  await sincronizar(dona.pagina); await sincronizar(membro.pagina);
  await membro.pagina.evaluate(id => solicitarAcessoGrupo(id), gid); await sincronizar(membro.pagina); await sincronizar(dona.pagina);
  await dona.pagina.evaluate(([id, u]) => aprovarAcessoGrupo(id, u), [gid, BIA]); await sincronizar(dona.pagina); await sincronizar(membro.pagina);
}

test("sem grupo na nuvem não existe destino do grupo: o padrão é sugerir e nada fica preso no aparelho", async () => {
  const banco = nuvemQueGuarda();
  const carla = await abrir(banco, { id: CARLA, nome: "Carla Aluna" });
  try{
    const r = await carla.pagina.evaluate(lote => {
      const opcoes = opcoesDestinoImportacao().map(o => o[0]);
      navigate("importar-questoes");
      const dica = document.body.innerText.includes("não está em um grupo") || document.body.innerText.includes("ainda não está em um grupo");
      const res = parseImportText(lote, { instituicao: "X", ano: 2026, tipoProva: "residencia" });
      const out = importarItensAnalisados(res, "grupo");
      return { opcoes, dica, importadas: out.importadas, semGrupo: !!out.semGrupo, grupoNaQuestao: db.questoes.filter(q => q.grupoId).length };
    }, LOTE);
    assert.deepEqual(r.opcoes, ["sugerir"]);
    assert.equal(r.dica, true, "a tela explica como entrar num grupo");
    assert.equal(r.importadas, 0); assert.equal(r.semGrupo, true);
    assert.equal(r.grupoNaQuestao, 0, "nada é criado no calendário oficial");
    assert.deepEqual(carla.erros, []);
  } finally { await carla.contexto.close(); }
});

test("Meu Grupo abre o envio já apontando para o grupo, o destino sobrevive à troca de modo e o botão diz para onde vai", async () => {
  const banco = nuvemQueGuarda();
  const ana = await abrir(banco, { id: ANA, nome: "Ana Aluna" });
  try{
    const g1 = await criarGrupo(ana.pagina, "Grupo Um");
    const g2 = await ana.pagina.evaluate(() => { const a = usuarioAtual(); const novo = { id: "11111111-aaaa-bbbb-cccc-000000000002", nome: "Grupo Dois", oficial: false, publico: true, criadoPor: a.id, membrosAprovados: [a.id], solicitacoesPendentes: [] }; db.grupos.push(novo); a.grupoQuestoesId = novo.id; saveState(); return novo.id; });
    const r = await ana.pagina.evaluate(([g1, g2, lote]) => {
      const opcoes = opcoesDestinoImportacao().map(o => o[0]);
      abrirEnvioParaGrupo(g2);
      const sel = document.getElementById("impDestino").value;
      mudarModoImportacao("avulsas");
      const depoisDoModo = document.getElementById("impDestino").value;
      document.getElementById("textoImportacao").value = lote;
      previsualizarImportacao();
      const botao = [...document.querySelectorAll("#previewImportacao .btn-primary")].pop().textContent;
      const aviso = document.getElementById("previewImportacao").innerText;
      return { opcoes, sel, depoisDoModo, botao, aviso };
    }, [g1, g2, LOTE]);
    assert.deepEqual(r.opcoes, ["grupo", "grupo2", "sugerir"]);
    assert.equal(r.sel, "grupo2"); assert.equal(r.depoisDoModo, "grupo2");
    assert.match(r.botao, /para o grupo Grupo Dois/);
    assert.match(r.aviso, /Destino: só o grupo Grupo Dois/);
    assert.match(r.aviso, /Outros › Assunto geral/);
    assert.deepEqual(ana.erros, []);
  } finally { await ana.contexto.close(); }
});

test("envio ao grupo: assunto inventado não vira taxonomia, imagem tem nome imprevisível, lista mostra autoria e quem não enviou não exclui", async () => {
  const banco = nuvemQueGuarda();
  const ana = await abrir(banco, { id: ANA, nome: "Ana Aluna" });
  const bia = await abrir(banco, { id: BIA, nome: "Bia Aluna" });
  const arquivos = [];
  try{
    for(const t of [ana, bia]) await t.contexto.route(/storage\/v1/, r => { arquivos.push(new URL(r.request().url()).pathname); return r.fulfill({ status: 200, contentType: "application/json", body: "{}" }); });
    const gid = await criarGrupo(ana.pagina, "Grupo da Ana");
    await entrar(banco, ana, bia, gid);
    const antes = await ana.pagina.evaluate(() => db.taxonomia.assuntos.length);
    const ids = await ana.pagina.evaluate(async ([lote, png]) => {
      const res = parseImportText(lote, { instituicao: "X", ano: 2026, tipoProva: "residencia" });
      res[1].imagemUrl = png;
      return importarItensAnalisados(res, "grupo").ids;
    }, [LOTE, PNG]);
    await sincronizar(ana.pagina);
    const depois = await ana.pagina.evaluate(() => ({ n: db.taxonomia.assuntos.length, inventado: db.taxonomia.assuntos.some(a => /Inventado/.test(a.nome)) }));
    assert.equal(depois.inventado, false, "assunto inventado não entra na taxonomia");
    assert.ok(depois.n - antes <= 1, "no máximo o genérico");
    assert.equal(arquivos.length, 1);
    assert.match(arquivos[0], /\/g-[0-9a-f]{32}\.png$/, "a figura do grupo leva um nome impossível de adivinhar");
    await sincronizar(bia.pagina);
    // a lista mostra quem enviou e a prova; a Bia não pode excluir a questão da Ana, a Ana pode
    const lista = await bia.pagina.evaluate(() => { navigate("meu-grupo"); return document.body.innerText; });
    assert.match(lista, /Provas e listas enviadas ao grupo/);
    assert.match(lista, /Ana Aluna/);
    assert.equal(await bia.pagina.evaluate(() => document.querySelectorAll('button[title="Excluir"]').length), 0, "a Bia não vê excluir nas questões da Ana");
    const biaTenta = await bia.pagina.evaluate(id => { excluirQuestaoConfirmado(id); return !!getQuestao(id); }, ids[0]);
    assert.equal(biaTenta, true, "a regra também vale fora da tela");
    assert.equal(await ana.pagina.evaluate(() => { navigate("meu-grupo"); return document.querySelectorAll('button[title="Excluir"]').length; }), 2);
    // a Ana exclui a prova inteira; some para a Bia
    await ana.pagina.evaluate(([gid]) => { excluirProvaDoGrupoConfirmado(gid, encodeURIComponent("Lista do Grupo|2026")); }, [gid]);
    await sincronizar(ana.pagina); await sincronizar(bia.pagina);
    assert.equal(await bia.pagina.evaluate(() => db.questoes.filter(q => q.grupoId).length), 0);
    assert.equal(banco.tabela("questoes_enviadas").get(ids[0]).status, "removida");
    for(const t of [ana, bia]) assert.deepEqual(t.erros, []);
  } finally { await ana.contexto.close(); await bia.contexto.close(); }
});

test("quem é retirado do grupo deixa de ter as questões dele no aparelho, e o grupo excluído leva as questões junto", async () => {
  const banco = nuvemQueGuarda();
  const ana = await abrir(banco, { id: ANA, nome: "Ana Aluna" });
  const bia = await abrir(banco, { id: BIA, nome: "Bia Aluna" });
  try{
    const gid = await criarGrupo(ana.pagina, "Grupo da Ana");
    await entrar(banco, ana, bia, gid);
    await ana.pagina.evaluate(lote => importarItensAnalisados(parseImportText(lote, { instituicao: "X", ano: 2026, tipoProva: "residencia" }), "grupo"), LOTE);
    await sincronizar(ana.pagina); await sincronizar(bia.pagina);
    assert.equal(await bia.pagina.evaluate(() => db.questoes.filter(q => q.grupoId).length), 2);
    await ana.pagina.evaluate(([id, u]) => { window.confirm = () => true; retirarDoGrupo(id, u); }, [gid, BIA]);
    await sincronizar(ana.pagina); await sincronizar(bia.pagina);
    assert.equal(await bia.pagina.evaluate(() => db.questoes.filter(q => q.grupoId).length), 0, "retirada, ela não guarda as questões do grupo");
    assert.equal(await ana.pagina.evaluate(() => db.questoes.filter(q => q.grupoId).length), 2, "quem continua no grupo as mantém");
    await ana.pagina.evaluate(id => { window.confirm = () => true; excluirGrupo(id); }, gid);
    assert.equal(await ana.pagina.evaluate(() => db.questoes.filter(q => q.grupoId).length), 0, "grupo excluído não deixa questão órfã");
    for(const t of [ana, bia]) assert.deepEqual(t.erros, []);
  } finally { await ana.contexto.close(); await bia.contexto.close(); }
});
