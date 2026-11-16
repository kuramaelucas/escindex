/* COMPARTILHAR COM A FACULDADE, ponta a ponta: três navegadores (Ana e Bia da EPM/Unifesp, Carla da UEL)
   contra um Supabase de mentira que GUARDA as linhas e aplica a regra da faculdade (a de verdade, em
   nuvem/esquema.sql, é conferida por testes/sql/regras.sql e foi exercitada no banco real). */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, srv;
before(async () => { navegador = await chromium.launch(process.env.ESC_CHROMIUM ? { executablePath: process.env.ESC_CHROMIUM } : {}); srv = await subirServidor(); });
after(async () => { await navegador?.close(); await srv?.fechar(); });

const ANA = "11111111-2222-3333-4444-555555555551", BIA = "11111111-2222-3333-4444-555555555552", CARLA = "11111111-2222-3333-4444-555555555553";
const FACULDADE = { [ANA]: "EPM/Unifesp", [BIA]: "EPM/Unifesp", [CARLA]: "UEL" };
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const token = id => b64({ alg: "HS256" }) + "." + b64({ sub: id, exp: 9999999999 }) + ".assinatura";
const slug = f => "faculdade:" + f.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const CHAVE = ["questoes_enviadas", "flashcards_enviados", "flashcards_pessoais"];

function nuvem(){
  const b = { t: {}, relogio: Date.parse("2026-10-01T12:00:00Z") };
  b.tab = n => (b.t[n] = b.t[n] || new Map());
  b.guardar = (n, l) => { b.tab(n).set(l.id, Object.assign({}, b.tab(n).get(l.id) || {}, l, { atualizado_em: new Date(b.relogio += 1000).toISOString() })); };
  // e_do_grupo() para o grupo da faculdade: a faculdade do perfil gera o id
  b.daFaculdade = (gid, uid) => gid === slug(FACULDADE[uid]) && FACULDADE[uid] !== "Outra";
  return b;
}

async function abrir(b, id, nome){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  const perfil = { id, nome, email: nome.split(" ")[0].toLowerCase() + "@x.br", papel: "aluno", status: "aprovado", ano_faculdade: "3º ano", faculdade: FACULDADE[id] };
  await contexto.route(/supabase\.co/, async rota => {
    const req = rota.request(), url = new URL(req.url()), busca = new URLSearchParams(url.search);
    const tabela = url.pathname.replace("/rest/v1/", "");
    const json = (d, s = 200) => rota.fulfill({ status: s, contentType: "application/json", body: JSON.stringify(d) });
    if(CHAVE.includes(tabela)){
      if(req.method() === "POST"){
        for(const l of JSON.parse(req.postData())){
          const dono = l.autor_id || l.usuario_id;
          if(dono !== id) return json({ code: "42501", message: "row-level security" }, 403);
          // insert na faculdade: só quem a tem no perfil
          if(l.grupo_id && /^faculdade:/.test(l.grupo_id) && !b.daFaculdade(l.grupo_id, id)) return json({ code: "42501", message: "row-level security" }, 403);
          b.guardar(tabela, l);
        }
        return rota.fulfill({ status: 201, body: "" });
      }
      if(req.method() === "PATCH"){ const i = (busca.get("id") || "").replace(/^eq\./, ""); if(b.tab(tabela).has(i)) b.guardar(tabela, Object.assign({}, b.tab(tabela).get(i), JSON.parse(req.postData()))); return rota.fulfill({ status: 204, body: "" }); }
      const desde = (busca.get("atualizado_em") || "gt.1970").slice(3);
      const pode = l => tabela === "flashcards_pessoais" ? l.usuario_id === id
        : (l.grupo_id ? b.daFaculdade(l.grupo_id, id) : (l.status === "aprovado" || l.status === "aprovada"))  || l.autor_id === id;
      return json([...b.tab(tabela).values()].filter(pode).filter(l => l.atualizado_em > desde));
    }
    if(url.pathname === "/rest/v1/perfis" && req.method() === "GET") return json([perfil]);
    if(url.pathname.startsWith("/rest/v1/rpc/")) return json([]);
    if(url.pathname.startsWith("/rest/v1/")) return req.method() === "GET" ? json([]) : rota.fulfill({ status: 201, body: "" });
    if(url.pathname.startsWith("/auth/v1/")) return json({});
    return rota.abort();
  });
  await contexto.addInitScript(s => localStorage.setItem("esc_nuvem_sessao", JSON.stringify(s)), { token: token(id), refresh: "r1", usuarioId: id, email: perfil.email });
  const pagina = await contexto.newPage(); const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(srv.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  await pagina.evaluate(async p => { const u = nuvemAplicarPerfilLocal(p); state.usuarioAtualId = u.id; while(nuvemEstado.sincronizando) await new Promise(ok => setTimeout(ok, 50)); }, perfil);
  return { pagina, contexto, erros };
}
const sync = p => p.evaluate(async () => { while(nuvemEstado.sincronizando) await new Promise(ok => setTimeout(ok, 50)); await nuvemSincronizarAgora(); });

const LOTE = `INSTITUICAO: Lista da Faculdade
ANO: 2026
===
NUMERO: 1
PERGUNTA: Paciente de 30 anos com febre e tosse produtiva ha 3 dias, consolidacao lobar. Qual o agente mais provavel?
A: S. pneumoniae
B: H. influenzae
GABARITO: A
`;

test("cartão e questão compartilhados pela Ana chegam à Bia (mesma faculdade) e não à Carla (UEL); descompartilhar tira da Bia", async () => {
  const b = nuvem();
  const ana = await abrir(b, ANA, "Ana Aluna"), bia = await abrir(b, BIA, "Bia Aluna"), carla = await abrir(b, CARLA, "Carla Aluna");
  try{
    // Ana cria um cartão pessoal e o compartilha pelo botão da tela (a mesma função do ícone)
    await ana.pagina.evaluate(() => {
      const u = usuarioAtual();
      const c = { id: "fc-ana-1", assuntoId: "", frente: "Frente da Ana", verso: "Verso", origem: "aluno", usuarioId: u.id, status: "ativo", criadoPor: u.id, criadoEm: hojeISO() };
      db.flashcards.push(c); nuvemRegistrar({ cartaoPessoal: c }); saveState();
      compartilharCartaoComFaculdade("fc-ana-1");
    });
    // e envia uma questão para toda a faculdade
    const opcoes = await ana.pagina.evaluate(() => opcoesDestinoImportacao().map(o => o[0]));
    assert.ok(opcoes.includes("faculdade"), "o envio oferece 'toda a minha faculdade'");
    const ids = await ana.pagina.evaluate(lote => importarItensAnalisados(parseImportText(lote, { instituicao: "X", ano: 2026, tipoProva: "residencia" }), "faculdade").ids, LOTE);
    assert.equal(ids.length, 1);
    await sync(ana.pagina);
    assert.equal(b.tab("flashcards_enviados").get("fc-ana-1").grupo_id, "faculdade:epm-unifesp");
    assert.equal(b.tab("questoes_enviadas").get(ids[0]).grupo_id, "faculdade:epm-unifesp");

    // Bia: o cartão entra no baralho e aparece na tela; a questão aparece em Estudar
    await sync(bia.pagina);
    const naBia = await bia.pagina.evaluate(id => {
      navigate("flashcards");
      return { baralho: flashcardsAtivos().some(c => c.id === "fc-ana-1"), tela: document.body.innerText,
               questao: questoesAtivas(idsDeGruposEFaculdade(usuarioAtual())).some(q => q.id === id), semOpcao: questoesAtivas(idsDosGruposDoUsuario(usuarioAtual())).some(q => q.id === id) };
    }, ids[0]);
    assert.equal(naBia.baralho, true); assert.equal(naBia.questao, true); assert.equal(naBia.semOpcao, false);
    assert.match(naBia.tela, /Cartões de colegas de EPM\/Unifesp/);
    assert.match(naBia.tela, /Frente da Ana/);

    // Carla (UEL): nada chega, nem ao banco local
    await sync(carla.pagina);
    const naCarla = await carla.pagina.evaluate(() => ({ cartoes: (db.flashcards || []).filter(c => c.grupoId).length, questoes: db.questoes.filter(q => q.grupoId).length }));
    assert.deepEqual(naCarla, { cartoes: 0, questoes: 0 });

    // Carla não consegue publicar na faculdade da EPM nem chamando a função por fora
    await carla.pagina.evaluate(() => { const c = { id: "fc-carla-1", assuntoId: "", frente: "Intrusa", verso: "v", origem: "aluno", usuarioId: usuarioAtual().id, status: "ativo", grupoId: "faculdade:epm-unifesp" }; db.flashcards.push(c); nuvemMarcarGlobalPendente("flashcards_enviados", c.id); });
    await sync(carla.pagina);
    assert.equal(b.tab("flashcards_enviados").has("fc-carla-1"), false, "a nuvem recusa o cartão para a faculdade alheia");

    // Ana tira o cartão da faculdade: some do baralho da Bia
    await ana.pagina.evaluate(() => compartilharCartaoComFaculdade("fc-ana-1"));
    await sync(ana.pagina); await sync(bia.pagina);
    assert.equal(await bia.pagina.evaluate(() => flashcardsAtivos().some(c => c.id === "fc-ana-1")), false);
    for(const t of [ana, bia, carla]) assert.deepEqual(t.erros, []);
  } finally { for(const t of [ana, bia, carla]) await t.contexto.close(); }
});
