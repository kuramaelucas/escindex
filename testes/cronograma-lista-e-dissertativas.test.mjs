/* Três regras novas: a lista que a pessoa monta mostra (pequeno) o que ficou
   de fora por resposta recente e deixa recolocar; o cronograma do 6º ano põe
   prova de residência depois da 30ª questão do dia; a questão dissertativa se
   responde escrevendo, dizendo a confiança e se avaliando. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1200, height: 900 } });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  await pagina.goto(semNuvem.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  await pagina.evaluate(() => { fazerLogin("aluno@esc.demo", "aluno123"); fecharModal(); });
  return { pagina, contexto };
}

test("a lista montada não repete questão respondida há pouco e diz quantas ficaram de fora, com o botão de recolocá-las", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      const u = usuarioAtual();
      const antes = buscarQuestoesPorFiltro(u.id, {}).length;
      const feitas = questoesParaEstudo(u.id).slice(0, 12);
      feitas.forEach(q => registrarResposta(u.id, q.id, q.gabarito, "certeza", 20, "pratica"));
      state.filtroRota.listaAberta = true;
      navigate("estudar");
      const caixa = () => document.getElementById("contagemFiltro");
      const fora = { texto: caixa().innerText.replace(/\s+/g, " "), botao: !!caixa().querySelector("button") };
      const sem = buscarQuestoesPorFiltro(u.id, {}).length;
      caixa().querySelector("button").click();
      const dentro = { texto: caixa().innerText.replace(/\s+/g, " "), n: buscarQuestoesPorFiltro(u.id, { incluirRecentes: true }).length };
      caixa().querySelector("button").click();
      return { antes, sem, fora, dentro, depoisDeTirar: caixa().innerText.replace(/\s+/g, " ") };
    });
    assert.equal(r.sem, r.antes - 12, "as 12 respondidas saem da lista");
    assert.match(r.fora.texto, /12 questões ficaram de fora/);
    assert.match(r.fora.texto, /Colocar de volta/);
    assert.equal(r.dentro.n, r.antes);
    assert.match(r.dentro.texto, /Estão dentro as 12/);
    assert.match(r.dentro.texto, /Tirar de novo/);
    assert.match(r.depoisDeTirar, /12 questões ficaram de fora/);
  } finally { await contexto.close(); }
});

test("cronograma do 6º ano: as 30 primeiras do dia seguem o sistema; da 31ª em diante, só prova de residência nos assuntos de maior prioridade", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      const u = usuarioAtual();
      u.anoFaculdade = "6º ano"; saveState();
      const resumo = itens => ({ n: itens.length, extras: itens.filter(it => it.origem === "extra_prova").length,
        todasReais: itens.filter(it => it.origem === "extra_prova").every(it => { const q = getQuestao(it.questaoId); return q.real && !ehConsolidacao(q); }) });
      const comeco = resumo(montarSessaoDoDia(u.id, 20, 0));
      const cruzando = montarSessaoDoDia(u.id, 20, 25);
      const apos = montarSessaoDoDia(u.id, 20, 30);
      // a ordem do cronograma: o sistema vem antes das extras
      const primeiraExtra = cruzando.findIndex(it => it.origem === "extra_prova");
      const ordem = cruzando.slice(primeiraExtra).every(it => it.origem === "extra_prova");
      // prevalência e erro: o assunto das extras pesa mais do que o de uma questão qualquer de residência
      const prior = {}; prioridadesDeEstudo(u.id, TODAS_AS_PROVAS).forEach(p => { prior[p.assuntoId] = p.prioridadeRelativa; });
      const media = ids => ids.reduce((s, id) => s + (prior[getQuestao(id).assuntoId] || 0), 0) / ids.length;
      let mediaExtras = 0; const rodadas = 20;
      for(let i = 0; i < rodadas; i++) mediaExtras += media(montarSessaoDoDia(u.id, 20, 30).map(it => it.questaoId)) / rodadas;
      const todas = questoesParaEstudo(u.id).filter(q => !ehConsolidacao(q)).map(q => q.id);
      const mediaBanco = media(todas);
      const explicacao = explicacaoCronograma(u, 12);
      u.anoFaculdade = "5º ano";
      const quintoAno = resumo(montarSessaoDoDia(u.id, 20, 40));
      return { comeco, cruzando: resumo(cruzando), apos: resumo(apos), ordem, mediaExtras, mediaBanco, explicacao, quintoAno };
    });
    assert.deepEqual(r.comeco, { n: 20, extras: 0, todasReais: true });
    assert.equal(r.cruzando.n, 20); assert.equal(r.cruzando.extras, 15, "5 do sistema e 15 de prova");
    assert.ok(r.ordem, "as extras vêm depois do que é do sistema");
    assert.deepEqual(r.apos, { n: 20, extras: 20, todasReais: true });
    assert.ok(r.cruzando.todasReais && r.apos.todasReais);
    assert.ok(r.mediaExtras > r.mediaBanco * 1.3, `extras ${r.mediaExtras.toFixed(2)} contra banco ${r.mediaBanco.toFixed(2)}`);
    assert.match(r.explicacao, /primeiras 30 questões do dia/);
    assert.match(r.explicacao, /Hoje: 12 de 30/);
    assert.equal(r.quintoAno.extras, 0, "só o 6º ano tem o cronograma");
  } finally { await contexto.close(); }
});

test("questão dissertativa: escreve, diz a confiança, vê a esperada, se avalia — e a tentativa seguinte mostra a anterior", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const base = await pagina.evaluate(() => {
      const modelo = db.questoes.find(x => x.real && x.status === "ativa");
      db.questoes.push({ id: "q-diss-1", tipo: "dissertativa", real: true, banca: "Banca Teste", ano: 2026, numeroNaProva: 1, status: "ativa",
        areaId: modelo.areaId, especialidadeId: modelo.especialidadeId, assuntoId: modelo.assuntoId, dificuldadeManual: "intermediario",
        enunciado: "Descreva a conduta inicial no choque séptico.", alternativas: [], gabarito: "",
        respostaEsperada: "Reposição volêmica precoce, antibiótico na primeira hora e noradrenalina se PAM < 65.",
        explicacaoGeral: "Dicas do enunciado: **choque séptico**. O pacote da primeira hora é o que reduz mortalidade.",
        explicacoesAlternativas: {}, estatisticas: { respostas: 0, acertos: 0, distribuicaoAlternativas: {} }, criadoPor: "seed", criadoEm: hojeISO() });
      saveState();
      iniciarSessaoComLista([{ questaoId: "q-diss-1", motivo: "teste" }], "pratica");
      return true;
    });
    assert.ok(base);
    const pg = () => pagina.locator("#conteudoPagina");
    // 1. sem texto não dá para dizer a confiança, e a resposta esperada não aparece
    await pg().locator("#respostaDissertativa").waitFor();
    assert.equal(await pg().locator("#confiancaDissertativa .confidence-btn").first().isDisabled(), true);
    assert.doesNotMatch(await pg().innerText(), /Resposta esperada pela banca/i);
    assert.doesNotMatch(await pg().innerText(), /Reposição volêmica precoce/);
    // 2. escreve; o rascunho sobrevive a sair e retomar a sessão
    await pg().locator("#respostaDissertativa").fill("Antibiótico e volume.");
    await pg().locator("#respostaDissertativa").blur();
    await pagina.evaluate(() => { sairDaSessao(); retomarSessaoEmAndamento(); });
    assert.equal(await pg().locator("#respostaDissertativa").inputValue(), "Antibiótico e volume.");
    // 3. confirma com a confiança: a esperada e a justificativa aparecem, com os botões de avaliação
    await pg().locator("#confiancaDissertativa .confidence-btn", { hasText: "Na dúvida" }).click();
    const aposConfirmar = await pg().innerText();
    assert.match(aposConfirmar, /Sua resposta/i);
    assert.match(aposConfirmar, /Antibiótico e volume\./);
    assert.match(aposConfirmar, /Resposta esperada pela banca/i);
    assert.match(aposConfirmar, /Reposição volêmica precoce/);
    assert.match(aposConfirmar, /Justificativa/i);
    assert.equal(await pagina.evaluate(() => db.respostas.filter(x => x.questaoId === "q-diss-1").length), 0, "ainda não é resposta: falta a autoavaliação");
    // 4. se avalia
    await pg().getByRole("button", { name: /Errei/ }).click();
    const feito = await pagina.evaluate(() => {
      const rs = db.respostas.filter(x => x.questaoId === "q-diss-1");
      return { n: rs.length, r: rs[0], q: getQuestao("q-diss-1").estatisticas, revisao: !!(db.revisoes[usuarioAtual().id] || {})["q-diss-1"],
               emSessao: respostasFeitas(state.sessaoAtual).length };
    });
    assert.equal(feito.n, 1);
    assert.equal(feito.r.textoResposta, "Antibiótico e volume.");
    assert.equal(feito.r.alternativaEscolhida, null);
    assert.equal(feito.r.correta, false);
    assert.equal(feito.r.confianca, "duvida");
    assert.deepEqual([feito.q.respostas, feito.q.acertos], [1, 0]);
    assert.ok(feito.revisao, "entra na revisão espaçada como qualquer questão");
    assert.equal(feito.emSessao, 1);
    assert.match(await pg().innerText(), /Você avaliou: errou/);
    // 5. outra tentativa, outro dia: a tela mostra o que foi escrito antes
    await pagina.evaluate(() => {
      db.respostas.forEach(x => { if(x.questaoId === "q-diss-1") x.data = somarDias(hojeISO(), -10); });
      saveState(); state.sessaoAtual = null; limparSessaoEmAndamento();
      iniciarSessaoComLista([{ questaoId: "q-diss-1", motivo: "teste" }], "pratica");
    });
    await pg().locator("#respostaDissertativa").fill("Volume, antibiótico em até 1 hora e noradrenalina se PAM < 65.");
    await pg().locator("#confiancaDissertativa .confidence-btn", { hasText: "Certeza" }).click();
    await pg().getByRole("button", { name: /Acertei/ }).click();
    const final = await pg().innerText();
    assert.match(final, /Você avaliou: acertou/);
    assert.match(final, /O que você escreveu antes/i);
    assert.match(final, /Tentativa 1/);
    assert.equal(await pagina.evaluate(() => db.respostas.filter(x => x.questaoId === "q-diss-1").map(x => x.textoResposta).join("|")),
      "Antibiótico e volume.|Volume, antibiótico em até 1 hora e noradrenalina se PAM < 65.");
    // simulado e PDF não levam dissertativa (não há gabarito para corrigir)
    const fora = await pagina.evaluate(() => {
      iniciarSessaoComLista([{ questaoId: "q-diss-1", motivo: "t" }], "pratica");
      const sim = buscarQuestoesPorFiltro(usuarioAtual().id, { incluirInativas: true }).filter(q => !ehDissertativa(q)).some(q => q.id === "q-diss-1");
      return { sim, pdf: questoesDoMaterialPDF().some(q => q.id === "q-diss-1") };
    });
    assert.deepEqual(fora, { sim: false, pdf: false });
  } finally { await contexto.close(); }
});
