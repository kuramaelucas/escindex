/* Faculdade do aluno: conteúdo restrito à EPM, cartões levados a outro login, conjunto rápido da busca. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(process.env.ESC_CHROMIUM ? { executablePath: process.env.ESC_CHROMIUM } : {}); servidor = await subirServidor(); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport:{width:1100,height:820} });
  await contexto.route(/supabase\.co/, r => r.abort());
  const p = await contexto.newPage();
  await p.goto(servidor.url + "index.html");
  await p.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { contexto, p };
}

test("simulado da Turma 89 e simulados reais da USP-SP: só EPM/Unifesp (e a equipe) enxerga", async () => {
  const { contexto, p } = await abrir();
  try{
    const ver = () => p.evaluate(() => {
      // a Turma 89 chega inativa na semente (dados/provas-inativas.js), então ela é conferida no banco todo
      const ids = new Set(questoesDoBancoParaMim().map(q => q.banca));
      const estudo = questoesParaEstudo(usuarioAtual().id, true);
      return { turma89: [...ids].some(b => /Turma 89/.test(b)), usp: [...ids].some(b => /^Simulados USP SP/.test(b)),
               estudo: estudo.some(q => /Turma 89|^Simulados USP SP/.test(q.banca)),
               bancasDoFiltro: [...ids].some(b => /Turma 89|^Simulados USP SP/.test(b)) };
    });
    await p.evaluate(() => { fazerLoginDemo("aluno"); usuarioAtual().faculdade = "EPM/Unifesp"; });
    const epm = await ver();
    assert.deepEqual([epm.turma89, epm.usp], [true, true], JSON.stringify(epm));
    await p.evaluate(() => { usuarioAtual().faculdade = "UEL"; });
    const uel = await ver();
    assert.deepEqual(uel, { turma89: false, usp: false, estudo: false, bancasDoFiltro: false });
    await p.evaluate(() => { state.usuarioAtualId = "u-prof"; });
    const prof = await ver();
    assert.deepEqual([prof.turma89, prof.usp], [true, true], JSON.stringify({epm, uel, prof}));
  } finally { await contexto.close(); }
});

test("faculdade inicial: conta antiga vale EPM/Unifesp, Matheus Arabori vale UEL; cadastro pergunta", async () => {
  const { contexto, p } = await abrir();
  try{
    const r = await p.evaluate(() => [faculdadeInicialDe("Ana Souza"), faculdadeInicialDe("Matheus Arabori"), faculdadeInicialDe("matheus arabori silva")]);
    assert.deepEqual(r, ["EPM/Unifesp", "UEL", "UEL"]);
    await p.evaluate(() => navigate("cadastro"));
    assert.ok(await p.locator("#cadFaculdade").count() === 1, "o cadastro precisa perguntar a faculdade");
    assert.deepEqual(await p.locator("#cadFaculdade option").allTextContents(), ["EPM/Unifesp", "UEL", "Outra"]);
  } finally { await contexto.close(); }
});

test("cartões: baixar, importar em outra conta sem duplicar", async () => {
  const { contexto, p } = await abrir();
  try{
    await p.evaluate(() => {
      fazerLoginDemo("aluno");
      const u = usuarioAtual(); const ass = db.taxonomia.assuntos[0].id;
      db.flashcards.push({ id:"fc-t1", assuntoId:ass, frente:"Frente 1", verso:"Verso 1", origem:"aluno", usuarioId:u.id, status:"ativo", criadoPor:u.id, criadoEm:hojeISO() });
      db.flashcards.push({ id:"fc-t2", assuntoId:"", frente:"Sem assunto", verso:"Anotação", origem:"aluno", usuarioId:u.id, status:"ativo", criadoPor:u.id, criadoEm:hojeISO(), conjunto:"Meu conjunto" });
    });
    const arq = await p.evaluate(() => JSON.stringify(arquivoDeCartoes(usuarioAtual(), cartoesParaLevar(usuarioAtual()))));
    assert.equal(JSON.parse(arq).cartoes.length, 2);
    // outra conta: importa uma vez (2 novos) e de novo (nada novo)
    const res = await p.evaluate((arq) => {
      fazerLoginDemo("aluno");
      const u = usuarioAtual();
      db.flashcards = db.flashcards.filter(c => c.usuarioId !== u.id);
      const a1 = analisarArquivoDeCartoes(arq, u);
      _cartoesParaImportar = a1.novos; importarCartoesDoArquivo();
      const a2 = analisarArquivoDeCartoes(arq, u);
      return { novos1: a1.novos.length, meus: db.flashcards.filter(c => c.usuarioId === u.id).length, novos2: a2.novos.length, rep2: a2.repetidos,
               erro: analisarArquivoDeCartoes("{}", u).erro };
    }, arq);
    assert.equal(res.novos1, 2); assert.equal(res.meus, 2); assert.equal(res.novos2, 0); assert.equal(res.rep2, 2);
    assert.match(res.erro, /não é uma lista de cartões/);
  } finally { await contexto.close(); }
});

test("conjunto rápido: sugestão de 15, filtra por instituição e ano e inicia a sessão", async () => {
  const { contexto, p } = await abrir();
  try{
    await p.evaluate(() => fazerLoginDemo("aluno"));
    const assuntoId = await p.evaluate(() => {
      const por = {}; questoesParaEstudo(usuarioAtual().id).forEach(q => { por[q.assuntoId] = (por[q.assuntoId]||0)+1; });
      return Object.entries(por).sort((a,b)=>b[1]-a[1])[0][0];
    });
    await p.evaluate((a) => abrirConjuntoRapido(a), assuntoId);
    assert.equal(await p.locator("#crQtd").inputValue(), "15");
    const total = await p.evaluate(a => questoesDoConjuntoRapido(a, [], []).length, assuntoId);
    assert.match(await p.locator("#crResumo").innerText(), new RegExp("^" + total + " "));
    // filtrar por uma instituição reduz a contagem e a sessão só traz questões dela
    const banca = await p.evaluate(a => questoesDoConjuntoRapido(a, [], [])[0].banca, assuntoId);
    await p.locator(`.crBanca[value="${banca}"]`).check();
    const naBanca = await p.evaluate(([a, b]) => questoesDoConjuntoRapido(a, [b], []).length, [assuntoId, banca]);
    assert.match(await p.locator("#crResumo").innerText(), new RegExp("^" + naBanca + " "));
    await p.locator("#crQtd").fill("3");
    await p.evaluate(a => iniciarConjuntoRapido(a), assuntoId);
    const s = await p.evaluate(() => state.sessaoAtual.itens.map(it => getQuestao(it.questaoId).banca));
    assert.ok(s.length >= 1 && s.length <= 3); assert.ok(s.every(b => b === banca));
  } finally { await contexto.close(); }
});

test("conjunto do assunto: inéditas, depois erradas para revisar, já dominadas só no fim; Praticar põe a revisão antes", async () => {
  const { contexto, p } = await abrir();
  try{
    await p.evaluate(() => fazerLoginDemo("aluno"));
    const r = await p.evaluate(() => {
      const u = usuarioAtual();
      const por = {}; questoesParaEstudo(u.id).forEach(q => { (por[q.assuntoId] = por[q.assuntoId] || []).push(q); });
      const pool = Object.values(por).sort((a,b)=>b.length-a.length)[0];
      const [errada, dominada] = pool;
      db.respostas = db.respostas.filter(x => x.usuarioId !== u.id);
      db.respostas.push({ id:"r-t1", usuarioId:u.id, questaoId:errada.id, correta:false, confianca:"certeza", data:"2020-01-01T10:00:00" });
      (db.revisoes[u.id] = db.revisoes[u.id] || {})[errada.id] = { proximaRevisao:"2020-01-02", ultimaData:"2020-01-01", intervalo:1 };
      db.respostas.push({ id:"r-t2", usuarioId:u.id, questaoId:dominada.id, correta:true, confianca:"certeza", data:hojeISO()+"T10:00:00" });
      saveState();
      const ids = l => l.map(i => i.questaoId);
      const normal = montarConjuntoDoAssunto(u.id, pool, pool.length, "T");
      const revisao = montarConjuntoDoAssunto(u.id, pool, pool.length, "T", true);
      return { n: pool.length, normal: ids(normal), revisao: ids(revisao), errada: errada.id, dominada: dominada.id, motivo: normal.find(i => i.questaoId === errada.id).motivo };
    });
    assert.equal(r.normal.length, r.n);
    assert.equal(r.normal.at(-1), r.dominada);
    assert.equal(r.normal.at(-2), r.errada);
    assert.equal(r.revisao[0], r.errada);
    assert.match(r.motivo, /para revisar: você errou/);
  } finally { await contexto.close(); }
});

test("cartão compartilhado com a faculdade: só quem é da mesma faculdade o recebe; 'Outra' não compartilha", async () => {
  const { contexto, p } = await abrir();
  try{
    await p.evaluate(() => { fazerLoginDemo("aluno"); usuarioAtual().faculdade = "EPM/Unifesp"; });
    const r = await p.evaluate(() => {
      const u = usuarioAtual();
      db.flashcards.push({ id:"fc-f1", assuntoId:"", frente:"De colega", verso:"v", origem:"aluno", usuarioId:"u-colega", grupoId:idDaFaculdade(u), status:"ativo" });
      db.flashcards.push({ id:"fc-f2", assuntoId:"", frente:"Meu", verso:"v", origem:"aluno", usuarioId:u.id, status:"ativo", criadoPor:u.id });
      const recebe = () => flashcardsAtivos(u.id).some(c => c.id === "fc-f1");
      const antes = recebe();
      u.faculdade = "UEL"; const outraFaculdade = recebe();
      u.faculdade = "EPM/Unifesp";
      compartilharCartaoComFaculdade("fc-f2");
      const meu = db.flashcards.find(c => c.id === "fc-f2").grupoId;
      compartilharCartaoComFaculdade("fc-f2");
      const volta = db.flashcards.find(c => c.id === "fc-f2").grupoId;
      u.faculdade = "Outra";
      return { antes, outraFaculdade, meu, volta, outra: idDaFaculdade(u), uel: (u.faculdade = "UEL", idDaFaculdade(u)) };
    });
    assert.deepEqual(r, { antes: true, outraFaculdade: false, meu: "faculdade:epm-unifesp", volta: undefined, outra: null, uel: "faculdade:uel" });
  } finally { await contexto.close(); }
});

test("questão compartilhada com a faculdade: destino no envio, visível só aos da faculdade, sobe para a nuvem", async () => {
  const { contexto, p } = await abrir();
  try{
    await p.evaluate(() => { fazerLoginDemo("aluno"); usuarioAtual().faculdade = "EPM/Unifesp"; window.nuvemConectado = () => true; });
    const r = await p.evaluate(() => {
      const u = usuarioAtual();
      const destinos = opcoesDestinoImportacao().map(d => d[0]);
      const g = grupoDoDestino(u, "faculdade");
      const base = questoesAtivas(true)[0];
      const q = Object.assign(questaoInteira(base), { id: "q-fac-1", grupoId: idDaFaculdade(u), status: "ativa", real: false });
      db.questoes.push(q);
      const veEpm = questoesAtivas(idsDeGruposEFaculdade(u)).some(x => x.id === "q-fac-1");
      const semOpcao = questoesAtivas(idsDosGruposDoUsuario(u)).some(x => x.id === "q-fac-1");
      const sobe = questaoSobeParaNuvem(q);
      u.faculdade = "UEL";
      const veUel = questoesAtivas(idsDeGruposEFaculdade(u)).some(x => x.id === "q-fac-1");
      u.faculdade = "Outra";
      return { destinos, nome: g && g.nome, veEpm, semOpcao, sobe, veUel, outra: grupoDoDestino(u, "faculdade") };
    });
    assert.ok(r.destinos.includes("faculdade"));
    assert.equal(r.nome, "toda a faculdade EPM/Unifesp");
    assert.deepEqual([r.veEpm, r.semOpcao, r.sobe, r.veUel, r.outra], [true, false, true, false, null]);
  } finally { await contexto.close(); }
});
