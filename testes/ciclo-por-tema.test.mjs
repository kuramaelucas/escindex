/* Ciclo por tema (codigo/05g-ciclo-por-tema.js): ler o resumo → conjunto planejado → resultado →
   releitura opcional. Leitura obrigatória só para quem constrói do zero e só antes de ler; o
   progresso sai da primeira resposta (segunda passagem continua de onde parou); abaixo de 75%
   sugere o resumo sem travar o tema seguinte; Formado "como está" fica fora do ciclo. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(process.env.ESC_CHROMIUM ? { executablePath: process.env.ESC_CHROMIUM } : {}); servidor = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1280, height: 900 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(servidor.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  // partes ainda desligadas no ar (CONFIG.integracaoResumos): o teste as liga para conferir o código que espera a fase 3
  await pagina.evaluate(() => { CONFIG.integracaoResumos.modoDeInicio = true; CONFIG.integracaoResumos.cicloNoInicio = true; });
  await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal(); conjuntosPorTema(); resumoDoAssunto(null); });
  await pagina.waitForFunction(() => window.EscResumos && window.EscResumos.conjuntos && window.EscResumos.catalogo);
  return { pagina, contexto, erros };
}

test("ciclo: graduando lê antes (obrigatório), continua de onde parou, < 75% sugere reler sem travar o próximo", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      const u = usuarioAtual(); u.anoFaculdade = "4º ano"; db.respostas = db.respostas.filter(x => x.usuarioId !== u.id);
      const c0 = cicloDoAluno(u), e = c0.atual;
      // procura um tema com resumo na ordem (o bloco pode começar por um sem resumo)
      const comResumo = e.semResumo ? null : e;
      const caminho = c0.caminho, obrig = leituraObrigatoria(u, comResumo);
      navigate("inicio"); const cartao = document.body.innerText.includes("Seu tema");
      iniciarQuestoesDoTema(comResumo.chave); const travou = !state.sessaoAtual || state.route !== "sessao";
      marcarResumoComoLido(comResumo.chave, true);
      const liberou = !leituraObrigatoria(u, estadoDoTema(u, comResumo.chave));
      iniciarQuestoesDoTema(comResumo.chave);
      const sessao = state.sessaoAtual ? state.sessaoAtual.itens.map(i => i.questaoId) : [];
      const motivo = state.sessaoAtual ? state.sessaoAtual.itens[0].motivo : "";
      state.sessaoAtual = null; navigate("inicio");
      // 1ª passagem: responde 5 (revisão depois não conta); a 2ª passagem continua nas outras
      const ids = estadoDoTema(u, comResumo.chave).ids, hoje = hojeISO();
      ids.slice(0, 5).forEach(id => db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: id, correta: true, data: "2026-01-10" }));
      db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: ids[0], correta: false, data: hoje });   // revisão
      const meio = estadoDoTema(u, comResumo.chave);
      // fecha o tema com 50%: abaixo do corte → sugere reler; o atual já é outro tema
      ids.slice(5).forEach((id, i) => db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: id, correta: i % 3 === 0, data: hoje }));
      const fim = estadoDoTema(u, comResumo.chave), c1 = cicloDoAluno(u);
      render(); const texto = document.body.innerText;
      // releu depois de fechar: a sugestão some
      u.resumosLidos[comResumo.chave] = "2099-01-01"; render(); const depoisDeReler = document.body.innerText.includes("Reler o resumo") && document.body.innerText.includes("abaixo de 75%");
      return { caminho, obrig, cartao, travou, liberou, n: sessao.length, idsN: ids.length, motivoOk: /Conjunto planejado/.test(motivo),
        meio: { feitas: meio.feitas, acertos: meio.acertos, proximas: meio.proximas.length },
        fim: { concluido: fim.concluido, abaixo: fim.abaixoDoCorte }, outroTema: c1.atual && c1.atual.chave !== comResumo.chave, ultimo: c1.ultimoConcluido && c1.ultimoConcluido.chave === comResumo.chave,
        sugere: texto.includes("Reler o resumo") && texto.includes("abaixo de 75%") && texto.includes("o próximo tema já está liberado"), depoisDeReler };
    });
    assert.equal(r.caminho, "graduando");
    assert.equal(r.obrig, true); assert.ok(r.cartao); assert.ok(r.travou, "sem ler, as questões não abrem");
    assert.ok(r.liberou); assert.equal(r.n, r.idsN); assert.ok(r.motivoOk);
    assert.deepEqual(r.meio, { feitas: 5, acertos: 5, proximas: r.idsN - 5 }, "a revisão não conta e a passagem seguinte continua de onde parou");
    assert.deepEqual(r.fim, { concluido: true, abaixo: true });
    assert.ok(r.outroTema && r.ultimo);
    assert.ok(r.sugere); assert.equal(r.depoisDeReler, false);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("ciclo: reparar por tema vai direto às questões; Formado 'como está' fica fora; tema sem resumo diz por quê", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      const u = usuarioAtual(); u.anoFaculdade = "Formado(a)"; db.respostas = db.respostas.filter(x => x.usuarioId !== u.id);
      u.modoDeInicio = "reparar"; const fora = cicloDoAluno(u); navigate("inicio"); const semCartao = !document.body.innerText.includes("Seu tema");
      u.modoDeInicio = "reparar-tema"; const c = cicloDoAluno(u);
      const semLeitura = !leituraObrigatoria(u, c.atual);
      u.modoDeInicio = "zero"; const zero = caminhoDoCiclo(u);
      const chaveSem = Object.keys(window.EscResumos.conjuntos).find(k => window.EscResumos.conjuntos[k].semResumo);
      const eSem = estadoDoTema(u, chaveSem);
      iniciarQuestoesDoTema(chaveSem); const abriuSemResumo = state.route === "sessao";
      return { fora, semCartao, caminho: c.caminho, semLeitura, zero, semResumo: eSem.semResumo, obrigSem: leituraObrigatoria(u, eSem), abriuSemResumo };
    });
    assert.equal(r.fora, null); assert.ok(r.semCartao);
    assert.equal(r.caminho, "reparar-tema"); assert.ok(r.semLeitura);
    assert.equal(r.zero, "zero");
    assert.deepEqual([r.semResumo, r.obrigSem, r.abriuSemResumo], [true, false, true]);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("no ar hoje: só a pós-leitura — sem pergunta de início nem cartão no Início; marcou lido, o conjunto aparece no fim do resumo", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      Object.assign(CONFIG.integracaoResumos, { modoDeInicio: false, cicloNoInicio: false, posLeitura: true });
      const u = usuarioAtual(); u.anoFaculdade = "Formado(a)"; delete u.modoDeInicio; db.respostas = db.respostas.filter(x => x.usuarioId !== u.id);
      const pergunta = perguntarModoDeInicio({ mesmoComAutomacao: true });
      navigate("inicio"); const cartao = document.body.innerText.includes("Seu tema");
      const id = window.EscResumos.catalogo[0].id;
      lerResumoDoAssunto(id);
      return { pergunta, cartao, id };
    });
    await pagina.waitForSelector(".resumo-lido");
    const r2 = await pagina.evaluate(id => {
      const antes = !!document.querySelector(".resumo-pos-leitura");
      marcarResumoComoLido(id, true);
      const depois = document.querySelector(".resumo-pos-leitura"), texto = depois ? depois.innerText : "";
      if(depois) depois.querySelector("button").click();
      return { antes, texto, sessao: state.route === "sessao" && state.sessaoAtual.itens.length };
    }, r.id);
    Object.assign(r, r2);
    assert.equal(r.pergunta, false); assert.equal(r.cartao, false); assert.equal(r.antes, false);
    assert.match(r.texto, /questões pós-leitura/);
    assert.ok(r.sessao > 0);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("assunto incorporado ao resumo: quem já fez as 20 do tema recebe as novas primeiro, com o motivo", async () => {
  const { pagina, contexto, erros } = await abrir();
  try{
    const r = await pagina.evaluate(() => {
      const u = usuarioAtual(); db.respostas = db.respostas.filter(x => x.usuarioId !== u.id);
      const c = window.EscResumos.conjuntos, chave = Object.keys(c).find(k => (c[k].incorporadas || []).length);
      const t = c[chave], inc = new Set(t.incorporadas), base = t.ids.filter(id => !inc.has(id));
      const ordemOk = t.ids.slice(0, inc.size).every(id => inc.has(id));
      // fez as originais antes de o assunto vizinho entrar no resumo
      base.forEach(id => db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: id, correta: true, data: "2026-01-10" }));
      const e = estadoDoTema(u, chave);
      u.resumosLidos = u.resumosLidos || {}; u.resumosLidos[chave] = "2026-01-09";
      const pos = htmlPosLeituraDoResumo(u, chave);
      iniciarQuestoesDoTema(chave);
      const itens = state.sessaoAtual ? state.sessaoAtual.itens : [];
      return { ordemOk, concluido: e.concluido, novas: e.novasIncorporadas, proximasSaoNovas: e.proximas.every(id => inc.has(id)), nInc: e.ids.filter(id => inc.has(id)).length,
        primeiraNova: itens.length > 0 && inc.has(itens[0].questaoId), motivo: itens[0] ? itens[0].motivo : "", avisa: /vêm primeiro|vem primeiro/.test(pos),
        doAssunto: resumoDoAssunto(t.assuntos.find(a => a !== t.assunto)) && resumoDoAssunto(t.assuntos.find(a => a !== t.assunto)).id === chave };
    });
    assert.ok(r.ordemOk, "as incorporadas abrem a lista");
    assert.equal(r.concluido, false, "o tema volta a ter o que fazer");
    assert.equal(r.novas, r.nInc); assert.ok(r.proximasSaoNovas);
    assert.ok(r.primeiraNova); assert.match(r.motivo, /incorporado/);
    assert.ok(r.avisa, "a pós-leitura diz que as novas vêm primeiro");
    assert.ok(r.doAssunto, "o assunto incorporado leva ao resumo que o cobre");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
