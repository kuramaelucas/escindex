/* ==========================================================================
   PROVA-ALVO E REGISTRO DE ESTUDO (com a nuvem)
   ==========================================================================
   1. A prova-alvo é sempre o início de dezembro do 6º ano; só quem está no 6º
      ano troca por uma data exata; Formado(a) fica sem. Perto da prova, a
      revisão espaçada encurta o intervalo (e só encurta).
   2. Cada resposta guarda de onde veio, que tentativa é, há quantos dias foi a
      anterior e a hora exata; cada avaliação de cartão vira uma linha de log.
   3. Nada disso fica só no navegador: sobe para a nuvem (colunas novas em
      respostas e perfis, tabela log_revisoes_cartoes, que só SOBE), e um banco
      que ainda não rodou o esquema.sql de novo continua sincronizando o resto.
   ========================================================================== */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem, comNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); comNuvem = await subirServidor(); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); await comNuvem?.fechar(); });

async function abrirLocal(){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(semNuvem.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto, erros };
}

test("a prova-alvo: início de dezembro do 6º ano para todos; data exata só no 6º ano; Formado(a) sem", async () => {
  const { pagina, contexto, erros } = await abrirLocal();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      const hoje = iso => { CONFIG.hoje = () => new Date(iso + "T12:00:00"); };
      const alvo = (ano, extra = {}) => { u.anoFaculdade = ano; delete u.provaAlvoData; Object.assign(u, extra); const a = provaAlvoDoUsuario(u); return a && { data: a.data, exata: a.exata, dias: a.dias }; };
      hoje("2026-10-04");
      const saida = {
        terceiro: alvo("3º ano"), quarto: alvo("4º ano"), quinto: alvo("5º ano"), sexto: alvo("6º ano"),
        // quem não está no 6º ano não escolhe: a data guardada não vale
        terceiroComData: alvo("3º ano", { provaAlvoData: "2026-11-10" }),
        sextoExato: alvo("6º ano", { provaAlvoData: "2026-11-10" }),
        sextoInvalida: alvo("6º ano", { provaAlvoData: "2026-02-30" }),
        sextoJaPassou: alvo("6º ano", { provaAlvoData: "2026-09-01" }),
        formado: alvo("Formado(a)"), semAno: alvo(""),
      };
      hoje("2026-12-15"); saida.sextoDepoisDeDezembro = alvo("6º ano");
      hoje("2027-01-10"); saida.quintoEmJaneiro = alvo("5º ano");
      return saida;
    });
    assert.deepEqual(r.terceiro, { data: "2029-12-01", exata: false, dias: 1154 });
    assert.equal(r.quarto.data, "2028-12-01");
    assert.equal(r.quinto.data, "2027-12-01");
    assert.deepEqual(r.sexto, { data: "2026-12-01", exata: false, dias: 58 });
    assert.equal(r.terceiroComData.data, "2029-12-01", "3º ano não escolhe data");
    assert.deepEqual(r.sextoExato, { data: "2026-11-10", exata: true, dias: 37 });
    assert.equal(r.sextoInvalida.exata, false, "data inexistente é ignorada");
    assert.deepEqual([r.sextoJaPassou.data, r.sextoJaPassou.exata], ["2026-12-01", false], "data exata que passou volta ao padrão");
    assert.equal(r.formado, null);
    assert.equal(r.semAno, null);
    assert.equal(r.sextoDepoisDeDezembro, null, "o padrão já passou");
    assert.equal(r.quintoEmJaneiro.data, "2028-12-01", "em janeiro de 2027 quem está no 5º ano será do 6º em 2028 (a pessoa atualiza o ano ao virar o ano letivo)");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Perfil: 6º ano marca e desfaz a data exata; 3º a 5º só veem o padrão; mudar de ano apaga a data", async () => {
  const { pagina, contexto, erros } = await abrirLocal();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      CONFIG.hoje = () => new Date("2026-10-04T12:00:00");
      const tela = () => { navigate("perfil"); return document.getElementById("app").innerText; };
      const campo = () => !!document.getElementById("perfilProvaAlvo");
      u.anoFaculdade = "6º ano"; const sexto = { texto: tela(), campo: campo() };
      document.getElementById("perfilProvaAlvo").value = "2026-11-10"; salvarProvaAlvo();
      const salva = u.provaAlvoData;
      document.getElementById("perfilProvaAlvo").value = "2026-09-01"; salvarProvaAlvo();      // já passou
      const aposPassada = u.provaAlvoData;
      document.getElementById("perfilProvaAlvo").value = "2028-01-01"; salvarProvaAlvo();      // longe demais
      const aposLonge = u.provaAlvoData;
      const inicio = (navigate("inicio"), document.getElementById("app").innerText);
      tela(); limparProvaAlvo(); const limpa = u.provaAlvoData;
      tela(); document.getElementById("perfilProvaAlvo").value = "2026-11-10"; salvarProvaAlvo();
      tela(); document.getElementById("perfilAno").value = "5º ano"; salvarAnoFaculdade();
      const aposMudar = { data: u.provaAlvoData, campo: campo(), texto: document.getElementById("app").innerText };
      u.anoFaculdade = "Formado(a)"; tela(); const formado = campo();
      return { sexto, salva, aposPassada, aposLonge, inicio, limpa, aposMudar, formado };
    });
    assert.ok(r.sexto.campo, "o 6º ano vê o campo da data");
    assert.match(r.sexto.texto, /Data da primeira prova importante/);
    assert.equal(r.salva, "2026-11-10");
    assert.equal(r.aposPassada, "2026-11-10", "data que já passou é recusada e a anterior fica");
    assert.equal(r.aposLonge, "2026-11-10", "data a mais de 400 dias é recusada");
    assert.match(r.inicio, /Prova-alvo: 10\/11\/2026/);
    assert.match(r.inicio, /a data da primeira prova importante que você marcou/);
    assert.equal(r.limpa, undefined);
    assert.equal(r.aposMudar.data, undefined, "mudar de ano apaga a data exata");
    assert.equal(r.aposMudar.campo, false, "no 5º ano não há campo para escolher");
    assert.match(r.aposMudar.texto, /sempre o início de dezembro do 6º ano/);
    assert.equal(r.formado, false);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("perto da prova a revisão encurta o intervalo — e só encurta; longe dela, nada muda", async () => {
  const { pagina, contexto, erros } = await abrirLocal();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      CONFIG.hoje = () => new Date("2026-10-04T12:00:00");
      const q = questoesAtivas().filter(x => x.gabarito)[0], outras = questoesAtivas().filter(x => x.gabarito).slice(1, 6);
      const intervaloApos = (ano, questao, confianca = "certeza") => {
        u.anoFaculdade = ano; delete db.revisoes[u.id];
        db.respostas = db.respostas.filter(x => x.usuarioId !== u.id);
        registrarResposta(u.id, questao.id, questao.gabarito, confianca, 5);
        return db.revisoes[u.id][questao.id].intervalo;
      };
      const saida = {
        sexto: intervaloApos("6º ano", q),            // 58 dias até 1/12: teto de 25% = 15 dias
        sextoChute: intervaloApos("6º ano", q, "chute"),
        terceiro: intervaloApos("3º ano", q),         // 3 anos de prazo: o teto passa de um mês
        formado: intervaloApos("Formado(a)", q),
      };
      // a 3 dias da prova o piso de uma semana continua valendo
      CONFIG.hoje = () => new Date("2026-11-28T12:00:00"); saida.vesperas = intervaloApos("6º ano", q);
      // desligado, volta ao de sempre
      CONFIG.hoje = () => new Date("2026-10-04T12:00:00");
      CONFIG.revisaoPelaProva.ligado = false; saida.desligado = intervaloApos("6º ano", q); CONFIG.revisaoPelaProva.ligado = true;
      // cartão: a mesma regra
      u.anoFaculdade = "6º ano";
      const cartao = db.flashcards.find(c => !c.usuarioId);
      for(let i = 0; i < 4; i++){ CONFIG.hoje = () => new Date("2026-10-0" + (4 + i) + "T12:00:00"); registrarRevisaoFlashcard(u.id, cartao.id, "sabia"); }
      saida.cartao = db.revisoesFlashcards[u.id][cartao.id].intervalo;
      // explicação na tela
      CONFIG.hoje = () => new Date("2026-10-04T12:00:00");
      saida.inicio = (navigate("inicio"), document.getElementById("app").innerText);
      return saida;
    });
    assert.equal(r.sexto, 15, "58 dias até a prova: 25% = 15 dias, em vez de um mês");
    assert.equal(r.sextoChute, 7, "o chute já volta no piso de uma semana");
    assert.equal(r.terceiro, 30, "a três anos da prova nada muda");
    assert.equal(r.formado, 30, "Formado(a) não tem prova-alvo");
    assert.equal(r.vesperas, 7, "nunca abaixo do piso de uma semana");
    assert.equal(r.desligado, 30, "CONFIG.revisaoPelaProva.ligado = false devolve o comportamento de antes");
    assert.ok(r.cartao <= 15, "o cartão também respeita o prazo da prova (veio " + r.cartao + ")");
    assert.match(r.inicio, /voltam em no máximo 15 dias \(25% do tempo que falta\)/, "a tela explica por que encurtou");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("cada resposta guarda origem, tentativa, dias desde a anterior e a hora exata; o cartão deixa uma linha de log", async () => {
  const { pagina, contexto, erros } = await abrirLocal();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      u.anoFaculdade = "Formado(a)";
      const dia = (iso, hora = "12:00:00") => { CONFIG.hoje = () => new Date(iso + "T" + hora); };
      const [q1, q2] = questoesAtivas().filter(x => x.gabarito);
      dia("2026-03-01", "08:15:00");
      const a = registrarResposta(u.id, q1.id, q1.gabarito, "certeza", 12);
      dia("2026-03-11");
      const b = registrarResposta(u.id, q1.id, q1.gabarito, "duvida", 9, "revisao_decaimento");
      const c = registrarResposta(u.id, q2.id, q2.gabarito, "certeza", 9, "origem-que-nao-existe");
      // a origem sai do item da fila, pela sessão (confirmarResposta)
      iniciarSessaoComLista([{ questaoId: q2.id, origem: "previa", motivo: "teste" }], "pratica");
      selecionarAlternativa(q2.gabarito); confirmarResposta("certeza");
      const d = db.respostas[db.respostas.length - 1];
      // as filas montadas pelo algoritmo trazem a origem em todo item
      const itens = [...montarSessaoRecomendada(u.id, 20), ...itensDaRevisaoEspacada(u.id, 20)];
      const origens = [...new Set(itens.map(i => i.origem))];
      // cartão
      const cartao = db.flashcards.find(x => !x.usuarioId);
      dia("2026-04-01"); registrarRevisaoFlashcard(u.id, cartao.id, "sabia");
      dia("2026-04-09"); registrarRevisaoFlashcard(u.id, cartao.id, "quase");
      const log = db.logCartoes.filter(l => l.usuarioId === u.id);
      CONFIG.limiteLogCartoesLocal = 3;
      for(let i = 0; i < 5; i++) registrarRevisaoFlashcard(u.id, cartao.id, "naolembrei");
      const aposLimite = db.logCartoes.length;
      return { a, b, c, d: { origem: d.origem, tentativa: d.tentativa }, origens, todasValidas: origens.every(o => o && ORIGENS_DE_QUESTAO[o]), validasNoCodigo: Object.keys(ORIGENS_DE_QUESTAO), log, aposLimite, meusDados: dadosDoUsuario(u.id).historicoDeCartoes.length };
    });
    assert.deepEqual([r.a.origem, r.a.tentativa, r.a.diasDesdeUltima], ["lista", 1, null], "sem item, a origem é a lista; primeira tentativa não tem 'dias desde'");
    assert.match(r.a.respondidaEm, /^2026-03-01T\d\d:15:00\.000Z$/, "a hora exata, em UTC (a data local continua em `data`)");
    assert.deepEqual([r.b.origem, r.b.tentativa, r.b.diasDesdeUltima], ["revisao_decaimento", 2, 10]);
    assert.equal(r.c.origem, "lista", "origem desconhecida cai em lista em vez de gravar lixo");
    assert.deepEqual(r.d, { origem: "previa", tentativa: 2 });
    assert.ok(r.todasValidas, "todo item montado pelo algoritmo traz origem válida: " + JSON.stringify(r.origens));
    assert.equal(r.log.length, 2);
    assert.deepEqual([r.log[0].nota, r.log[0].intervaloAntes, r.log[0].intervaloDepois, r.log[0].diasDesdeUltima, r.log[0].vistas], ["sabia", null, 7, null, 1]);
    assert.deepEqual([r.log[1].nota, r.log[1].intervaloAntes, r.log[1].diasDesdeUltima, r.log[1].vistas], ["quase", 7, 8, 2]);
    assert.equal(r.aposLimite, 3, "o navegador guarda só a janela recente do log (a nuvem guarda tudo)");
    assert.equal(r.meusDados, 3, "'Baixar uma cópia do meu estudo' leva o histórico de cartões");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

/* --------------------------- com a nuvem ------------------------------- */
const ALUNO = "11111111-2222-3333-4444-555555555555";
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const token = id => b64({ alg: "HS256" }) + "." + b64({ sub: id, exp: 9999999999 }) + ".assinatura";
const COLUNAS_NOVAS = ["origem", "tentativa", "dias_desde_ultima", "respondida_em"];

/* Um Supabase de mentira que registra o que recebe. `semColunas`: banco que
   ainda não rodou o esquema.sql de novo — recusa a coluna nova, como o PostgREST. */
async function abrirNaNuvem({ semColunas = false, ano = "6º ano", provaAlvo = null } = {}){
  const banco = { posts: [], gets: [], perfilPatch: [] };
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  const perfil = { id: ALUNO, nome: "Ana Aluna", email: "ana@turma.br", papel: "aluno", status: "aprovado", ano_faculdade: ano, boas_vindas_em: "2026-09-01", prova_alvo_data: provaAlvo };
  if(semColunas) delete perfil.prova_alvo_data;   // um banco antigo nem devolve a coluna
  await contexto.route(/supabase\.co/, async rota => {
    const req = rota.request(), url = new URL(req.url());
    const json = (d, status = 200) => rota.fulfill({ status, contentType: "application/json", body: JSON.stringify(d) });
    const tabela = url.pathname.replace("/rest/v1/", "");
    if(req.method() === "GET" && url.pathname.startsWith("/rest/v1/")) banco.gets.push(tabela);
    if(url.pathname === "/rest/v1/perfis" && req.method() === "GET") return json([perfil]);
    if(url.pathname.startsWith("/rest/v1/rpc/")) return json([]);
    if(url.pathname.startsWith("/rest/v1/") && req.method() === "POST"){
      const linhas = JSON.parse(req.postData());
      if(semColunas && tabela === "respostas"){
        const falta = COLUNAS_NOVAS.find(c => linhas.some(l => c in l));
        if(falta) return json({ code: "PGRST204", message: `Could not find the '${falta}' column of 'respostas' in the schema cache` }, 400);
      }
      if(semColunas && tabela === "perfis" && linhas.some(l => "prova_alvo_data" in l))
        return json({ code: "PGRST204", message: "Could not find the 'prova_alvo_data' column of 'perfis' in the schema cache" }, 400);
      banco.posts.push({ tabela, linhas });
      return rota.fulfill({ status: 201, body: "" });
    }
    if(url.pathname.startsWith("/rest/v1/")) return json([]);
    if(url.pathname.startsWith("/auth/v1/")) return json({});
    return rota.abort();
  });
  await contexto.addInitScript(s => localStorage.setItem("esc_nuvem_sessao", JSON.stringify(s)),
    { token: token(ALUNO), refresh: "r1", usuarioId: ALUNO, email: perfil.email });
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
  return { pagina, contexto, erros, banco };
}
const estudarEsincronizar = p => p.evaluate(async () => {
  const u = usuarioAtual();
  CONFIG.hoje = () => new Date("2026-10-04T12:00:00");
  const q = questoesAtivas().filter(x => x.gabarito)[0], cartao = db.flashcards.find(c => !c.usuarioId);
  registrarResposta(u.id, q.id, q.gabarito, "certeza", 8, "revisao_erro");
  registrarRevisaoFlashcard(u.id, cartao.id, "sabia");
  u.provaAlvoData = "2026-11-10";
  while(nuvemEstado.sincronizando) await new Promise(ok => setTimeout(ok, 50));
  await nuvemSincronizarAgora();
  return { fila: nuvemPendentes(), recusados: (db.nuvem.recusados || []).length, qid: q.id, cid: cartao.id };
});

test("com a nuvem: a resposta sobe com origem, tentativa e hora; o log do cartão e a data da prova também; o log não desce", async () => {
  const { pagina, contexto, banco, erros } = await abrirNaNuvem();
  try {
    const r = await estudarEsincronizar(pagina);
    assert.equal(r.fila, 0, "nada ficou na fila");
    const resposta = banco.posts.filter(p => p.tabela === "respostas").flatMap(p => p.linhas)[0];
    assert.equal(resposta.origem, "revisao_erro");
    assert.equal(resposta.tentativa, 1);
    assert.equal(resposta.dias_desde_ultima, null);
    assert.match(resposta.respondida_em, /^2026-10-04T\d\d:\d\d:\d\d\.\d{3}Z$/);
    const log = banco.posts.filter(p => p.tabela === "log_revisoes_cartoes").flatMap(p => p.linhas);
    assert.equal(log.length, 1);
    assert.deepEqual([log[0].cartao_id, log[0].nota, log[0].usuario_id, log[0].intervalo_antes, log[0].intervalo_depois], [r.cid, "sabia", ALUNO, null, 7]);
    assert.ok(log[0].id && log[0].respondida_em);
    const perfil = banco.posts.filter(p => p.tabela === "perfis").flatMap(p => p.linhas).pop();
    assert.equal(perfil.prova_alvo_data, "2026-11-10");
    assert.ok(!banco.gets.includes("log_revisoes_cartoes"), "o log só sobe: o site não o baixa de volta");
    assert.ok(banco.gets.includes("respostas"), "as demais tabelas continuam descendo");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("com a nuvem: banco que ainda não rodou o esquema.sql de novo continua sincronizando (sem as colunas novas)", async () => {
  const { pagina, contexto, banco, erros } = await abrirNaNuvem({ semColunas: true });
  try {
    const r = await estudarEsincronizar(pagina);
    assert.equal(r.fila, 0, "a fila esvaziou apesar das colunas que faltam");
    assert.equal(r.recusados, 0, "nenhum registro foi recusado de vez");
    const resposta = banco.posts.filter(p => p.tabela === "respostas").flatMap(p => p.linhas)[0];
    assert.ok(resposta && resposta.questao_id === r.qid, "a resposta subiu");
    COLUNAS_NOVAS.forEach(c => assert.ok(!(c in resposta), "sem a coluna " + c));
    assert.ok(banco.posts.some(p => p.tabela === "perfis" && p.linhas.every(l => !("prova_alvo_data" in l))), "o perfil sobe sem a data");
    // e o que está no navegador não se perdeu
    const local = await pagina.evaluate(() => ({ data: usuarioAtual().provaAlvoData, origem: db.respostas[db.respostas.length - 1].origem }));
    assert.deepEqual(local, { data: "2026-11-10", origem: "revisao_erro" });
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("com a nuvem: a data da prova desce no perfil; nula na nuvem apaga; coluna ausente não apaga o que é local", async () => {
  const { pagina, contexto, erros } = await abrirNaNuvem({ provaAlvo: "2026-11-10" });
  try {
    const r = await pagina.evaluate(() => {
      const u = usuarioAtual();
      const base = { id: u.id, nome: u.nome, papel: "aluno", status: "aprovado", ano_faculdade: "6º ano" };
      const depoisDeDescer = u.provaAlvoData;
      nuvemAplicarPerfilLocal({ ...base });                               // banco antigo: sem a coluna
      const semColuna = u.provaAlvoData;
      nuvemAplicarPerfilLocal({ ...base, prova_alvo_data: null });        // a pessoa voltou ao padrão em outro aparelho
      return { depoisDeDescer, semColuna, nula: u.provaAlvoData };
    });
    assert.equal(r.depoisDeDescer, "2026-11-10");
    assert.equal(r.semColuna, "2026-11-10");
    assert.equal(r.nula, undefined);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
