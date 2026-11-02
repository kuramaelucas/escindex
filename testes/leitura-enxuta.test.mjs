/* Telas mais limpas (Início, Meu Desempenho e a dica sob as alternativas): menos
   moldura e menos repetição, sem tirar nenhuma informação — o que sai da vista fica
   a um clique e volta sozinho quando passa a fazer sentido. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); });

async function abrir(largura = 1280){
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: largura, height: 900 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(semNuvem.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  await pagina.evaluate(() => { fazerLogin("aluno@esc.demo", "aluno123"); fecharModal(); usuarioAtual().boasVindasEm = hojeISO(); });
  return { pagina, contexto, erros };
}
// respostas de verdade, pelo mesmo caminho da plataforma
const responder = (pagina, n) => pagina.evaluate(n => {
  const u = usuarioAtual();
  questoesParaEstudo(u.id).filter(q => !ehDissertativa(q)).slice(0, n)
    .forEach(q => registrarResposta(u.id, q.id, q.gabarito, "certeza", 60, "pratica"));
  saveState();
}, n);

for(const modo of ["resumido", "estatistico"]){
  test(`Início (${modo}): rodapé numa faixa só, indicadores sem caixa e nada que venceu fica sem atalho`, async () => {
    const { pagina, contexto, erros } = await abrir();
    try {
      await responder(pagina, 6);
      const r = await pagina.evaluate(m => {
        usuarioAtual().modoPlataforma = m; navigate("inicio");
        const pg = document.getElementById("conteudoPagina");
        return { texto: pg.innerText, rodapes: pg.querySelectorAll(".rodape-inicio").length, cinzas: pg.querySelectorAll(".card-flat").length,
          indicadores: pg.querySelectorAll(".indicadores .indicador").length, caixinhas: pg.querySelectorAll(".stat-mini").length,
          revisaoRapida: !!pg.querySelector("button[onclick^='iniciarSessaoFlashcards']") };
      }, modo);
      assert.equal(r.rodapes, 1, "Livro de Ouro e feedback dividem uma faixa");
      assert.equal(r.cinzas, 0, "sem os dois cartões cinza de antes");
      assert.ok(r.indicadores >= 3 && r.caixinhas === 0);
      for(const t of [/Livro de Ouro/, /Quero contribuir/, /Enviar feedback/, /dia\(s\) seguidos estudando/, /acerto geral/, /assunto\(s\) para revisar hoje/]) assert.match(r.texto, t);
      assert.ok(r.revisaoRapida, "o atalho da Revisão rápida continua no Início");
      assert.deepEqual(erros, []);
    } finally { await contexto.close(); }
  });
}

test("Meu Desempenho: sem respostas as seções de números ficam recolhidas; com a primeira resposta voltam a ser cartões", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    const vazio = await pagina.evaluate(() => {
      navigate("desempenho");
      const pg = document.getElementById("conteudoPagina");
      const recolhida = trecho => [...pg.querySelectorAll("details.secao-recolhivel")].find(d => d.textContent.includes(trecho));
      return { total: recolhida("Desempenho total")?.open, areas: recolhida("Comparação entre as 5 grandes áreas")?.open, como: recolhida("Como você está indo")?.open,
        aviso: /Ainda não há respostas para analisar/.test(pg.innerText), lateral: !!pg.querySelector(".grafico-lateral .stat-tile") };
    });
    assert.deepEqual([vazio.total, vazio.areas, vazio.como], [false, false, false]);
    assert.ok(vazio.aviso && vazio.lateral, "o aviso aparece e o conteúdo continua na página, só recolhido");
    await responder(pagina, 3);
    const cheio = await pagina.evaluate(() => {
      navigate("desempenho");
      const pg = document.getElementById("conteudoPagina");
      return { aviso: /Ainda não há respostas/.test(pg.innerText), secoes: [...pg.querySelectorAll("details.secao-recolhivel")].map(d => d.textContent).filter(t => /Desempenho total|Comparação entre as 5|Como você está indo/.test(t)).length };
    });
    assert.equal(cheio.aviso, false);
    assert.equal(cheio.secoes, 0, "com dados, os três voltam a ser cartões abertos");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("'Como funciona' sob as alternativas: aberto para quem é novo, recolhido depois de 10 respostas, e a escolha da pessoa vale sempre", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    const aberto = () => pagina.evaluate(() => {
      sairDaSessao(); iniciarSessaoRecomendada();
      const s = state.sessaoAtual; const i = s.itens.findIndex(it => !ehDissertativa(getQuestao(it.questaoId))); s.indiceAtual = i; render();
      return document.querySelector(".dica-questao").open;
    });
    assert.equal(await aberto(), true, "conta nova vê a explicação");
    assert.match(await pagina.evaluate(() => document.getElementById("conteudoPagina").innerText), /Assunto, especialidade e dificuldade aparecem depois que você responder/);
    await responder(pagina, 12);
    assert.equal(await aberto(), false, "quem já respondeu o bastante a recebe recolhida");
    await pagina.evaluate(() => { document.querySelector(".dica-questao").open = true; });
    await pagina.waitForFunction(() => usuarioAtual().dicasDaQuestaoAbertas === true);
    assert.equal(await aberto(), true, "abrir uma vez vale daí em diante");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("celular: a questão ganha largura e nada rola para o lado", async () => {
  const { pagina, contexto, erros } = await abrir(390);
  try {
    const r = await pagina.evaluate(() => {
      iniciarSessaoRecomendada();
      const s = state.sessaoAtual; s.indiceAtual = s.itens.findIndex(it => !ehDissertativa(getQuestao(it.questaoId))); render();
      const q = document.querySelector(".qcard").getBoundingClientRect();
      return { largura: q.width, pagina: document.documentElement.scrollWidth, padding: getComputedStyle(document.querySelector(".qcard")).paddingLeft };
    });
    assert.ok(r.largura >= 360, "o cartão ocupa quase a tela toda: " + r.largura);
    assert.equal(r.padding, "16px");
    assert.ok(r.pagina <= 396);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
