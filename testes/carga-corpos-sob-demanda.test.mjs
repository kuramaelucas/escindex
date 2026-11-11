/* Carga inicial, fase 2 (docs/PROJETO-CARGA-INICIAL.md): a questão em ficha (índice leve) e corpo (texto no
   arquivo da prova, só quando preciso). O servidor abre o site como o aluno abre (corposSobDemanda) e a leitura de
   texto que não chegou LANÇA ERRO (ESC_CORPO_ESTRITO): é assim que um caminho que esqueceu de pedir o texto aparece. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(); servidor = await subirServidor({ semNuvem: true, corposSobDemanda: true }); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

async function abrir({ contextoOpcoes = {}, estrito = true } = {}){
  const contexto = await navegador.newContext({ serviceWorkers: "block", ...contextoOpcoes });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  if(estrito) await pagina.addInitScript(() => { window.ESC_CORPO_ESTRITO = true; });
  await pagina.goto(servidor.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto, erros };
}
const arquivosDeDados = servidor0 => servidor0.pedidos.filter(c => /^\/dados\/(prova|banco|reposicoes)-?.*\.js$/.test(c));

test("abre só com as fichas: nenhum arquivo de prova baixado e a memória leve", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    const r = await pagina.evaluate(() => ({ questoes: db.questoes.length, corpos: Object.keys(EscDados.corpos).length,
      heap: Math.round(performance.memory.usedJSHeapSize / 1048576), ficha: ehFichaDaSemente(db.questoes[0]) }));
    assert.ok(r.questoes > 10000, "as fichas estão todas no banco");
    assert.equal(r.corpos, 0, "nenhum texto carregado na abertura");
    assert.equal(r.ficha, true);
    assert.ok(r.heap < 60, "heap de " + r.heap + " MB");
    assert.equal(arquivosDeDados(servidor).filter(c => /\/dados\/prova-/.test(c)).length, 0, "nenhuma prova pedida");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("ler o texto sem carregar lança erro no modo estrito; garantirCorpos traz o texto e a leitura passa", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(async () => {
      const q = db.questoes[3000];
      let erro = ""; try{ void q.enunciado; }catch(e){ erro = e.message; }
      await garantirCorpos([q.id]);
      return { erro, enunciado: q.enunciado.length > 20, alternativas: q.alternativas.length, expl: q.explicacaoGeral.length > 20, copia: copiaProfunda(q).enunciado === q.enunciado,
        json: JSON.parse(JSON.stringify(q)).alternativas.length === q.alternativas.length };
    });
    assert.match(r.erro, /ainda não foi carregado/);
    assert.equal(r.enunciado, true); assert.ok(r.alternativas >= 2); assert.equal(r.expl, true);
    assert.equal(r.copia, true, "copiaProfunda de uma ficha leva o texto"); assert.equal(r.json, true);
  } finally { await contexto.close(); }
});

test("edição do texto vence a semente e é gravada só como diferença; recarregar mantém", async () => {
  const { pagina, contexto } = await abrir({ estrito: false });
  try {
    const id = await pagina.evaluate(async () => {
      state.usuarioAtualId = "u-admin"; navigate("inicio"); fecharModal();
      const q = db.questoes[10]; await garantirCorpos([q.id]);
      q.enunciado = "TEXTO EDITADO PELA EQUIPE"; saveState({ imediato: true });
      const guardado = JSON.parse(localStorage.getItem(CHAVE_STORAGE));
      const dif = guardado.questoes.find(x => x.id === q.id);
      window.__tamanhoDiferenca = Object.keys(dif).sort().join(",");
      return q.id;
    });
    assert.equal(await pagina.evaluate(() => window.__tamanhoDiferenca), "_semente,enunciado,id", "só o campo editado é gravado");
    await pagina.reload();
    await pagina.waitForFunction(() => typeof db !== "undefined" && db);
    assert.equal(await pagina.evaluate(async id => { const q = getQuestao(id); await garantirCorpos([q.id]); return q.enunciado; }, id), "TEXTO EDITADO PELA EQUIPE");
  } finally { await contexto.close(); }
});

test("sessão: o texto da fila é baixado antes de desenhar, sem erro, e a questão aparece inteira", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal(); });
    await pagina.evaluate(() => { const u = usuarioAtual(); iniciarSessaoComLista(questoesParaEstudo(u.id).slice(0, 5).map(q => ({ questaoId: q.id, origem: "nao_vista" })), "estudo"); });
    await pagina.waitForSelector(".qcard-enunciado", { timeout: 20000 });
    assert.ok((await pagina.locator(".qcard-enunciado").first().innerText()).length > 20);
    assert.ok((await pagina.locator(".qcard-alts").first().innerText()).length > 5);
    // e o texto de uma segunda sessão é adiantado em segundo plano (decisão 3 do projeto), sem erro
    await pagina.waitForFunction(() => _textoAdiantadoDoDia !== "", null, { timeout: 10000 });
    await pagina.waitForTimeout(3000);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("busca acha pelo começo do enunciado sem baixar provas; abrir o resultado traz o texto", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal(); });
    const palavra = await pagina.evaluate(async () => {
      await new Promise(r => { const s = document.createElement("script"); s.src = escEndereco("dados", "indice-busca"); s.onload = r; document.head.appendChild(s); });
      for(const q of questoesParaEstudo(usuarioAtual().id).slice(2500)){
        const m = /[A-Za-zÀ-ú]{9,}/.exec(EscDados.indiceBusca[SEED_QUESTOES.findIndex(x => x.id === q.id)] || "");
        if(m) return buscaNormalizar(m[0]).toUpperCase();
      }
    });
    const antes = Object.keys(await pagina.evaluate(() => EscDados.corpos)).length;
    await pagina.keyboard.press("Control+k");
    await pagina.fill("#buscaGlobalCampo", palavra);
    await pagina.waitForSelector(".busca-item[onclick*='buscaEscolher']");
    assert.equal(Object.keys(await pagina.evaluate(() => EscDados.corpos)).length, antes, "buscar não baixou provas");
    const achou = await pagina.locator(".busca-grupo", { hasText: "Questões" }).count();
    assert.ok(achou > 0, "achou questão pelo começo do enunciado");
    await pagina.locator(".busca-item").filter({ has: pagina.locator(".busca-item-detalhe") }).last().click();
    await pagina.waitForSelector("text=Questão na íntegra");
    assert.ok((await pagina.locator(".qcard-enunciado, .modal").first().innerText()).length > 20);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("duplicata: o enunciado completo de uma questão da semente a acha pelo índice de busca, sem baixar a prova", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(async () => {
      const alvo = db.questoes[4000];
      await garantirCorpos([alvo.id]);
      const enunciado = alvo.enunciado, id = alvo.id;
      // aparelho "novo": fora o texto desta prova, nada do corpo na memória
      const antes = Object.keys(EscDados.arquivosComCorpo).length;
      await carregarIndiceDeBusca();
      return { achou: questoesDuplicadasDe(enunciado, "outro-id").some(q => q.id === id), antes, depois: Object.keys(EscDados.arquivosComCorpo).length };
    });
    assert.equal(r.achou, true);
    assert.equal(r.depois, r.antes, "achar duplicata não baixou provas");
  } finally { await contexto.close(); }
});

test("lista com texto (Favoritos) nasce inteira: baixa só o que falta e redesenha sem erro", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      questoesParaEstudo(u.id).slice(0, 3).forEach(q => toggleFavorito(u.id, q.id));
      navigate("favoritos");
    });
    await pagina.waitForFunction(() => /Favoritos/.test(document.getElementById("app").innerText) && !/Baixando as questões/.test(document.getElementById("app").innerText), null, { timeout: 30000 });
    assert.ok((await pagina.locator("#app").innerText()).length > 100);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("tela da equipe que lê o banco inteiro mostra o download e depois abre", async () => {
  const { pagina, contexto, erros } = await abrir({ estrito: false });
  try {
    await pagina.evaluate(() => { state.usuarioAtualId = "u-admin"; navigate("banco-questoes"); fecharModal(); });
    await pagina.waitForFunction(() => !faltaCorpoDeAlgumaQuestao(), null, { timeout: 120000 });
    await pagina.waitForSelector("table, .card", { timeout: 20000 });
    assert.match(await pagina.locator("#app").innerText(), /Banco de Questões|questões/i);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("uso offline: o que já foi aberto continua abrindo sem internet", async () => {
  const { pagina, contexto, erros } = await abrir({ contextoOpcoes: { serviceWorkers: "allow" }, estrito: false });
  try {
    await pagina.evaluate(() => navigator.serviceWorker.ready);
    await pagina.reload();
    await pagina.waitForFunction(() => !!navigator.serviceWorker.controller && typeof db !== "undefined" && db);
    const id = await pagina.evaluate(async () => { const q = db.questoes[2000]; await garantirCorpos([q.id]); return q.id; });
    await contexto.setOffline(true);
    await pagina.reload();
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function", null, { timeout: 30000 });
    const texto = await pagina.evaluate(async id => { const q = getQuestao(id); await garantirCorpos([q.id]); return q.enunciado.length; }, id);
    assert.ok(texto > 20, "o texto da prova já vista abre offline");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
