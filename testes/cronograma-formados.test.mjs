/* Cronograma de formados (nível por assunto), dificuldade com pouca resposta e setas do teclado. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(); servidor = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1000, height: 800 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(servidor.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto, erros };
}

test("Dificuldade: com poucas respostas vale a dificuldade sugerida; a taxa de acerto só pesa com amostra", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      const base = db.questoes.find(q => q.status === "ativa");
      const mk = (dif, respostas, acertos) => ({ ...base, dificuldadeManual: dif, estatisticas: { respostas, acertos, distribuicaoAlternativas: {} } });
      const f = calcularDificuldade(mk("fundamental", 0, 0)), a = calcularDificuldade(mk("avancado", 0, 0));
      // 2 respostas e 2 erros: o erro não pode transformar uma questão fundamental em difícil
      const poucosErros = calcularDificuldade(mk("fundamental", 2, 0));
      const muitosErros = calcularDificuldade(mk("fundamental", 60, 0));
      return { f, a, poucosErros, muitosErros };
    });
    assert.ok(r.f < 35, "fundamental sem respostas é fácil: " + r.f);
    assert.ok(r.a >= 60, "avançada sem respostas é difícil: " + r.a);
    assert.ok(r.poucosErros < 35, "2 erros não mudam o rótulo: " + r.poucosErros);
    assert.ok(r.muitosErros > r.poucosErros, "com amostra grande a taxa passa a pesar");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Formado(a): começa no fácil, sobe só o assunto em que acerta com certeza e segura o que erra", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual(); u.anoFaculdade = "Formado(a)";
      const ativas = questoesParaEstudo(u.id);
      // dois assuntos com respostas fabricadas: A (acerta com certeza) e B (erra)
      const assuntos = [...new Set(ativas.map(q => q.assuntoId))];
      const [A, B] = assuntos;
      const resp = (assuntoId, correta, confianca) => db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: "x-" + Math.random(), assuntoId, correta, confianca, data: hojeISO() });
      const antes = { A: nivelDoAssuntoFormado(u.id, A).nivel, B: nivelDoAssuntoFormado(u.id, B).nivel };
      for(let i = 0; i < 8; i++) resp(A, true, "certeza");
      for(let i = 0; i < 6; i++) resp(B, i % 2 === 0 ? false : true, "certeza");   // 50% de erro
      const depois = { A: nivelDoAssuntoFormado(u.id, A).nivel, B: nivelDoAssuntoFormado(u.id, B).nivel };
      // assunto sem nenhuma resposta continua no fácil
      const C = assuntos.find(a => a !== A && a !== B);
      const novo = nivelDoAssuntoFormado(u.id, C);
      const sessao = montarSessaoSemCalendario(u, 20);
      const tamanho = sessao.length;
      const motivos = sessao.map(it => it.motivo);
      const porAssunto = {}; sessao.forEach(it => { const q = getQuestao(it.questaoId); porAssunto[q.assuntoId] = (porAssunto[q.assuntoId] || 0) + 1; });
      return { antes, depois, novo: novo.nivel, tamanho, maxPorAssunto: Math.max(...Object.values(porAssunto)),
        exploracao: motivos.some(m => /^Exploração/.test(m)), texto: explicacaoCronogramaFormado(u), cronoDe6: !!cronogramaDoUsuario(u) };
    });
    assert.deepEqual(r.antes, { A: 0, B: 0 });
    assert.equal(r.depois.A, 2, "acerto com certeza frequente sobe o assunto A");
    assert.equal(r.depois.B, 0, "erro frequente segura o assunto B no fácil");
    assert.equal(r.novo, 0);
    assert.ok(r.tamanho >= 15 && r.maxPorAssunto <= 3, JSON.stringify(r));
    assert.ok(r.exploracao);
    assert.match(r.texto, /assuntos explorados/);
    assert.equal(r.cronoDe6, false);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("Setas do teclado passam questão e flashcard; as setas da barra também", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal();
      const pool = questoesParaEstudo(usuarioAtual().id).slice(0, 10);
      iniciarSessaoComLista(pool.map(q => ({ questaoId: q.id, motivo: "t" })), "pratica"); });
    const indice = () => pagina.evaluate(() => state.sessaoAtual.indiceAtual);
    await pagina.keyboard.press("ArrowRight"); assert.equal(await indice(), 1);
    await pagina.keyboard.press("ArrowRight"); assert.equal(await indice(), 2);
    await pagina.keyboard.press("ArrowLeft"); assert.equal(await indice(), 1);
    await pagina.evaluate(() => document.querySelectorAll(".barra-questoes-seta")[1].click()); assert.equal(await indice(), 2);
    await pagina.evaluate(() => document.querySelectorAll(".barra-questoes-seta")[0].click()); assert.equal(await indice(), 1);
    // flashcards: precisa virar antes de seguir (regra de sempre)
    await pagina.evaluate(() => { state.sessaoAtual = null; iniciarSessaoFlashcards({}); });
    const i0 = await pagina.evaluate(() => state.sessaoFlash.indice);
    await pagina.keyboard.press("ArrowRight");
    assert.equal(await pagina.evaluate(() => state.sessaoFlash.indice), i0, "sem virar, não passa");
    await pagina.evaluate(() => virarFlashcard());
    await pagina.keyboard.press("ArrowRight");
    assert.equal(await pagina.evaluate(() => state.sessaoFlash.indice), i0 + 1);
    await pagina.keyboard.press("ArrowLeft");
    assert.equal(await pagina.evaluate(() => state.sessaoFlash.indice), i0);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
