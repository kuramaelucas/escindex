/* Evolução por assunto em períodos de 15 dias, listas recolhidas (erradas e
   prioridades), "continuar última sessão" no Início e o Teste de Progresso
   como uma banca só, com o semestre no nome da prova. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  await pagina.goto(semNuvem.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  await pagina.evaluate(() => { fazerLogin("aluno@esc.demo", "aluno123"); fecharModal(); });
  return { pagina, contexto };
}

test("evolução por assunto: 7/10 e depois 8/10, com um período parado no meio", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      const u = usuarioAtual();
      db.respostas = db.respostas.filter(x => x.usuarioId !== u.id);
      const assunto = db.taxonomia.assuntos[0].id, outro = db.taxonomia.assuntos[1].id;
      const poe = (dias, acertos, total, ass) => { for(let i = 0; i < total; i++) db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: "x" + Math.random(), assuntoId: ass, correta: i < acertos, data: somarDias(hojeISO(), -dias), confianca: "duvida" }); };
      poe(40, 7, 10, assunto);   // 3º período contando de hoje
      poe(2, 8, 10, assunto);    // último período; o do meio (16–30 dias) fica sem resposta
      poe(2, 1, 1, outro);
      const ev = evolucaoPorAssunto(u.id);
      const a = ev.assuntos.find(x => x.assuntoId === assunto);
      return { n: ev.periodos.length, celulas: a.celulas.map(c => c && c.taxa), variacao: a.variacao, totalDoOutro: ev.assuntos.find(x => x.assuntoId === outro).total, variacaoDoOutro: ev.assuntos.find(x => x.assuntoId === outro).variacao };
    });
    assert.equal(r.n, 3);
    assert.deepEqual(r.celulas, [70, null, 80]);   // período sem estudo é null, não 0%
    assert.equal(r.variacao, 10);                  // compara 80% com os 70% (último período que teve resposta)
    assert.equal(r.variacaoDoOutro, null);         // uma quinzena só: nada a comparar
    await pagina.evaluate(() => navigate("desempenho"));
    assert.ok(await pagina.locator("#evolucaoAssuntos").count());
    assert.match(await pagina.locator("#evolucaoAssuntos").innerText(), /Evolução por assunto/);
  } finally { await contexto.close(); }
});

test("listas longas ficam recolhidas até serem pedidas", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      const u = usuarioAtual();
      const qs = db.questoes.filter(q => q.real && q.status === "ativa" && q.gabarito).slice(0, 12);
      qs.forEach(q => db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: q.id, areaId: q.areaId, assuntoId: q.assuntoId, correta: false, data: hojeISO(), confianca: "duvida" }));
      saveState();
      navigate("revisao");
      const fechada = !document.body.innerText.includes("errada 1 vez") && [...document.querySelectorAll("button")].some(b => /Ver todas as questões erradas/.test(b.textContent));
      alternarListaDeErradas();
      const aberta = document.querySelectorAll(".enunciado-clicavel").length > 0;
      navigate("desempenho");
      const linhas = () => [...document.querySelectorAll("table")].find(t => /Prioridade/.test(t.innerText)).querySelectorAll("tbody tr").length;
      const cinco = linhas();
      alternarPrioridadesAbertas();
      return { fechada, aberta, cinco, todas: linhas(), total: prioridadesDeEstudo(u.id).length };
    });
    assert.ok(r.fechada && r.aberta);
    assert.equal(r.cinco, 5);
    assert.equal(r.todas, r.total);
  } finally { await contexto.close(); }
});

test("início: continuar a última sessão aparece junto de Começar agora", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const antes = await pagina.evaluate(() => { navigate("inicio"); return document.body.innerText.includes("Continuar última sessão"); });
    assert.equal(antes, false);
    const depois = await pagina.evaluate(() => { iniciarSessaoRecomendada(); const s = state.sessaoAtual; s.respostasSessao = [{ questaoId: s.itens[0].questaoId, correta: true, confianca: "certeza" }]; salvarSessaoEmAndamento(); state.sessaoAtual = null; navigate("inicio"); return document.body.innerText.includes("Continuar última sessão"); });
    assert.equal(depois, true);
  } finally { await contexto.close(); }
});

test("Teste de Progresso é uma banca só; as provas se distinguem por 2023.1 e 2023.2", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      const tp = db.questoes.filter(q => /^Teste de Progresso/.test(q.banca));
      navigate("provas-antigas");
      mudarFiltroProvas("tipo", "graduacao");
      const cartoes = [...document.querySelectorAll(".prova-card .prova-ano")].map(e => e.textContent.trim());
      return { bancas: [...new Set(tp.map(q => q.banca))], cartoes, rotulo: anoDaProva(tp.find(q => q.ano === 2023 && q.semestre === 1)) };
    });
    assert.deepEqual(r.bancas, ["Teste de Progresso NIEPAEM"]);
    assert.ok(r.cartoes.includes("2023.1") && r.cartoes.includes("2023.2"), r.cartoes.join(","));
    assert.equal(r.rotulo, "2023.1");
  } finally { await contexto.close(); }
});

test("barra de questões expande e recolhe a mesma barra (sem trocar o HTML)", async () => {
  const { pagina, contexto } = await abrir();
  try {
    await pagina.evaluate(() => iniciarSessaoRecomendada());
    await pagina.evaluate(() => { window.__barra = document.querySelector(".barra-questoes"); });
    await pagina.click(".barra-questoes-expandir");
    const r = await pagina.evaluate(() => ({ mesma: window.__barra === document.querySelector(".barra-questoes"), expandida: window.__barra.classList.contains("expandida"), aria: document.querySelector(".barra-questoes-expandir").getAttribute("aria-expanded") }));
    assert.deepEqual(r, { mesma: true, expandida: true, aria: "true" });
    await pagina.click(".barra-questoes-expandir");
    assert.equal(await pagina.evaluate(() => document.querySelector(".barra-questoes").classList.contains("expandida")), false);
  } finally { await contexto.close(); }
});
