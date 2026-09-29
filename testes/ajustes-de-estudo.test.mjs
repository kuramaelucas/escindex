/* Ajustes de estudo: progressão consolidação → residência por ano, ordem dos
   estágios do 6º ano, "não mostrar mais" só depois do segundo erro, taxa de
   acerto individual escondida e uso no Painel da Turma. */
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
  return { pagina, contexto };
}

test("progressão: 70/30 no 3º ano, 60/40 no 4º, 25/75 no 5º e 0/100 no 6º", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      const u = { anoFaculdade: "3º ano" };
      const fracoes = {};
      ["3º ano", "4º ano", "5º ano", "6º ano", "Formado(a)"].forEach(a => { fracoes[a] = fracaoConsolidacao({ anoFaculdade: a }); });
      // pool artificial: 100 de consolidação (didáticas) e 100 reais de residência
      const cons = Array.from({ length: 100 }, (_, i) => ({ id: "c" + i, real: false, banca: "Esc — Banco Didático" }));
      const res = Array.from({ length: 100 }, (_, i) => ({ id: "r" + i, real: true, banca: "UNIFESP-EPM" }));
      const conta = ano => {
        const pick = selecionarComProgressao(cons.concat(res), 20, { anoFaculdade: ano }, (p, k) => p.slice(0, k));
        return { total: pick.length, cons: pick.filter(ehConsolidacao).length };
      };
      // sem questão de consolidação, a residência completa (a sessão não fica curta)
      const semCons = selecionarComProgressao(res, 20, u, (p, k) => p.slice(0, k));
      const tp = { id: "g", real: true, banca: "Teste de Progresso" };
      return { fracoes, p3: conta("3º ano"), p4: conta("4º ano"), p5: conta("5º ano"), p6: conta("6º ano"), semCons: semCons.length,
        graduacaoContaComoConsolidacao: ehConsolidacao(tp), residenciaNao: ehConsolidacao(res[0]) };
    });
    assert.deepEqual(r.fracoes, { "3º ano": 0.7, "4º ano": 0.6, "5º ano": 0.25, "6º ano": 0, "Formado(a)": 0 });
    assert.deepEqual(r.p3, { total: 20, cons: 14 });
    assert.deepEqual(r.p4, { total: 20, cons: 12 });
    assert.deepEqual(r.p5, { total: 20, cons: 5 });
    assert.deepEqual(r.p6, { total: 20, cons: 0 });
    assert.equal(r.semCons, 20);
    assert.ok(r.graduacaoContaComoConsolidacao);
    assert.ok(!r.residenciaNao);
  } finally { await contexto.close(); }
});

test("progressão: a sessão recomendada do 6º ano é só prova real de residência e o Estudar explica a regra", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      const sessao = ano => {
        u.anoFaculdade = ano;
        const itens = montarSessaoRecomendada(u.id, 30);
        return { n: itens.length, cons: itens.filter(i => ehConsolidacao(getQuestao(i.questaoId))).length,
          rotulos: itens.filter(i => /consolidação|prova de residência/.test(i.motivo)).length };
      };
      const s6 = sessao("6º ano"), s3 = sessao("3º ano");
      navigate("estudar");
      return { s6, s3, texto: document.getElementById("conteudoPagina").textContent };
    });
    assert.equal(r.s6.cons, 0);
    assert.equal(r.s6.n, 30);
    assert.ok(r.s3.cons > r.s6.cons, "no 3º ano entra consolidação");
    assert.ok(r.s3.rotulos > 0, "cada questão diz de que tipo é");
    assert.match(r.texto, /consolidação de conhecimento e \d+% provas reais de residência/);
  } finally { await contexto.close(); }
});

test("'Não mostrar mais' só é oferecido depois do segundo erro na mesma questão", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      const q = db.questoes.find(x => x.status === "ativa" && x.real);
      const errada = q.gabarito === "A" ? "B" : "A";
      const botao = () => /Não mostrar mais/.test(renderAcoesQuestao(q));
      const antes = { pode: podeEsconderQuestao(u.id, q.id), botao: botao() };
      registrarResposta(u.id, q.id, errada, "duvida", 10);
      const umErro = { pode: podeEsconderQuestao(u.id, q.id), botao: botao() };
      alternarQuestaoOcultaUI(q.id);
      const recusada = { oculta: questaoOculta(u.id, q.id), toast: [...document.querySelectorAll("#toastContainer .toast")].map(t => t.textContent).join("|") };
      registrarResposta(u.id, q.id, errada, "duvida", 10);
      const doisErros = { pode: podeEsconderQuestao(u.id, q.id), botao: botao() };
      alternarQuestaoOcultaUI(q.id);
      const escondida = questaoOculta(u.id, q.id);
      // escondida, o botão continua para poder voltar a mostrar
      return { antes, umErro, recusada, doisErros, escondida, voltar: /Voltar a mostrar/.test(renderAcoesQuestao(q)) };
    });
    assert.deepEqual(r.antes, { pode: false, botao: false });
    assert.deepEqual(r.umErro, { pode: false, botao: false });
    assert.equal(r.recusada.oculta, false);
    assert.match(r.recusada.toast, /depois de errá-la 2 vezes/);
    assert.deepEqual(r.doisErros, { pode: true, botao: true });
    assert.equal(r.escondida, true);
    assert.ok(r.voltar);
  } finally { await contexto.close(); }
});

test("Painel da Turma (neste navegador): equipe aparece só com uso e ninguém tem acerto individual", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLogin("admin@esc.demo", "admin123"); fecharModal();
      // o aluno de demonstração responde algumas questões; sozinho ele não forma média (mínimo de 3 alunos)
      const aluno = db.usuarios.find(u => u.papel === "aluno");
      const q = db.questoes.find(x => x.status === "ativa");
      for(let i = 0; i < 4; i++) db.respostas.push({ id: "r-painel-" + i, usuarioId: aluno.id, questaoId: q.id, areaId: q.areaId, correta: i < 2, data: hojeISO(), confianca: "certeza" });
      db.respostas.push({ id: "r-painel-equipe", usuarioId: usuarioAtual().id, questaoId: q.id, areaId: q.areaId, correta: true, data: hojeISO(), confianca: "certeza" });
      saveState();
      filtrosPainelTurma().ano = "todos"; navigate("painel-turma");
      const dados = state.filtroRota.painelDados.dados;
      const alunos = document.getElementById("app").innerText;
      // a tabela de pessoas é a última da tela; as de cima são as médias por ano e por turma
      const tabelas = [...document.querySelectorAll("#app table")];
      const cabecalhoAlunos = [...tabelas[tabelas.length - 1].querySelectorAll("thead th")].map(t => t.innerText);
      mudarFiltroPainelTurma("ano", "equipe");
      const equipe = document.getElementById("app").innerText;
      const csvColunas = (() => { let nome = "", corpo = ""; const orig = baixarArquivo; baixarArquivo = (n, c) => { nome = n; corpo = c; }; exportarPainelTurmaCsv(); baixarArquivo = orig; return corpo.split("\n")[0]; })();
      return { temEquipe: dados.pessoas.some(p => p.papel !== "aluno"), semMedias: dados.medias.length, alunos, cabecalhoAlunos, equipe, csvColunas };
    });
    assert.ok(r.temEquipe, "professor, residente e administrador entram nos dados");
    assert.equal(r.semMedias, 0, "um aluno só não forma média");
    assert.ok(!r.cabecalhoAlunos.some(c => /acerto/i.test(c)), r.cabecalhoAlunos.join("|"));
    assert.match(r.alunos, /menos de 3 alunos com resposta/);
    assert.match(r.equipe, /Coordenação do Esc/);
    assert.match(r.equipe, /Administrador/);
    assert.doesNotMatch(r.csvColunas, /acerto/i);
  } finally { await contexto.close(); }
});

test("6º ano: cada aluno reordena os próprios estágios sem sair do grupo e sem mexer nos colegas", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const eu = usuarioAtual();
      eu.anoFaculdade = "6º ano";
      const colega = { id: "u-colega-estagios", nome: "Colega", papel: "aluno", status: "aprovado", anoFaculdade: "6º ano" };
      db.usuarios.push(colega);
      const grupoAntes = eu.grupoId;
      const estagios = (usuario) => blocosDoGrupo(getGrupoDoUsuario(usuario), usuario).find(b => b.id === "b6-pediatria").subdivisoes;
      const original = estagios(eu).slice();
      moverEstagioPessoal("b6-pediatria", 0, 1);
      const depois = estagios(eu).slice();
      const doColega = estagios(colega).slice();
      const bloco = blocosDoGrupo(getGrupoDoUsuario(eu), eu).find(b => b.id === "b6-pediatria");
      const datas = subdivisoesComDatas(bloco).map(p => p.nome + "@" + p.dataInicio);
      navigate("meu-grupo");
      const tela = document.getElementById("app").innerText;
      const guardado = JSON.stringify(eu.ordemEstagios);
      // reordenar de volta ao original apaga a chave (nada a sincronizar)
      moverEstagioPessoal("b6-pediatria", 1, -1);
      const igualAoOriginal = { chaves: Object.keys(eu.ordemEstagios).length, estagios: estagios(eu).join("|") === original.join("|") };
      moverEstagioPessoal("b6-pediatria", 2, -1);
      restaurarOrdemDosEstagios("b6-pediatria");
      // o que veio da nuvem de outro aparelho vale; um estágio que a coordenação renomeou é ignorado
      nuvemAplicarPerfilLocal({ id: eu.id, papel: "aluno", status: "aprovado", ordem_estagios: { "b6-pediatria": ["Pediatria Neonatal", "Estágio que não existe mais", "Emergências Pediátricas"] } });
      const daNuvem = estagios(eu).slice();
      return { original, depois, doColega, datas, tela, guardado, igualAoOriginal, restaurado: Object.keys(eu.ordemEstagios || {}).length === 1, grupoDepois: eu.grupoId, grupoAntes, daNuvem };
    });
    assert.deepEqual(r.original, ["Emergências Pediátricas", "Enfermaria de Pediatria", "Pediatria Neonatal"]);
    assert.deepEqual(r.depois, ["Enfermaria de Pediatria", "Emergências Pediátricas", "Pediatria Neonatal"]);
    assert.deepEqual(r.doColega, r.original, "a ordem é só de quem mexeu");
    assert.match(r.datas[0], /^Enfermaria de Pediatria@/);
    assert.match(r.tela, /Meus estágios/);
    assert.match(r.tela, /Você continua no mesmo grupo/);
    assert.deepEqual(JSON.parse(r.guardado), { "b6-pediatria": r.depois });
    assert.deepEqual(r.igualAoOriginal, { chaves: 0, estagios: true });
    assert.equal(r.grupoDepois, r.grupoAntes, "o grupo não muda");
    assert.deepEqual(r.daNuvem, ["Pediatria Neonatal", "Emergências Pediátricas", "Enfermaria de Pediatria"]);
  } finally { await contexto.close(); }
});

test("destacar texto: selecionar um trecho da questão, marcar, continuar marcado ao voltar e remover", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const ids = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const q = db.questoes.find(x => x.status === "ativa" && x.enunciado.length > 60);
      praticarSoEstaQuestao(q.id);
      return { qid: q.id, enunciado: q.enunciado };
    });
    await pagina.waitForSelector(".qcard-enunciado[data-alvo]");
    // seleciona os 10 primeiros caracteres do enunciado, como o mouse faria
    const selecionar = () => pagina.evaluate(() => {
      const el = document.querySelector(".qcard-enunciado[data-alvo]");
      const no = el.firstChild;
      const r = document.createRange(); r.setStart(no, 2); r.setEnd(no, 14);
      const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
      return r.toString();
    });
    const marcado = await selecionar();
    await pagina.waitForSelector("#barraDestaque:not([hidden]) button");
    await pagina.click("#barraDestaque button");
    const depois = await pagina.evaluate(() => ({
      marcas: [...document.querySelectorAll(".qcard-enunciado mark.destaque")].map(m => m.textContent),
      salvo: db.destaques.map(d => ({ alvo: d.alvo, trecho: d.trecho, inicio: d.inicio, fim: d.fim, usuario: d.usuarioId === usuarioAtual().id })),
      barraEscondida: document.getElementById("barraDestaque").hidden,
      textoIntacto: document.querySelector(".qcard-enunciado").textContent,
    }));
    assert.deepEqual(depois.marcas, [marcado.trim()]);
    assert.equal(depois.salvo.length, 1);
    assert.equal(depois.salvo[0].alvo, "q:" + ids.qid + ":enunciado");
    assert.equal(depois.salvo[0].trecho, marcado.trim());
    assert.ok(depois.salvo[0].usuario);
    assert.ok(depois.barraEscondida);
    assert.equal(depois.textoIntacto, ids.enunciado, "marcar não muda o texto da questão");

    // sobreposição: marcar um trecho que encosta no anterior funde os dois num só
    await pagina.evaluate(() => {
      const el = document.querySelector(".qcard-enunciado[data-alvo]");
      const r = document.createRange(); r.setStart(el.lastChild, 0); r.setEnd(el.lastChild, 5);
      const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
    });
    await pagina.waitForSelector("#barraDestaque:not([hidden]) button");
    await pagina.click("#barraDestaque button");
    assert.equal(await pagina.evaluate(() => db.destaques.length), 2, "trecho separado é outro destaque");
    await pagina.evaluate(() => {
      const el = document.querySelector(".qcard-enunciado[data-alvo]");
      const r = document.createRange(); r.selectNodeContents(el);
      const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
    });
    await pagina.waitForSelector("#barraDestaque:not([hidden]) button");
    await pagina.click("#barraDestaque button");
    assert.equal(await pagina.evaluate(() => db.destaques.length), 1, "o destaque que engloba os outros os substitui");

    // volta à questão: continua marcado; e sobrevive a recarregar a página
    await pagina.evaluate(qid => { navigate("inicio"); praticarSoEstaQuestao(qid); }, ids.qid);
    await pagina.waitForSelector(".qcard-enunciado mark.destaque");
    await pagina.reload();
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    assert.equal(await pagina.evaluate(() => db.destaques.length), 1, "guardado no navegador");
    await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal(); });

    // o texto da questão mudou de lugar: o destaque acha o trecho de novo
    const achou = await pagina.evaluate(() => {
      const d = db.destaques[0];
      return htmlComDestaques("Antes. " + d.trecho + " depois.", d.alvo).includes('<mark class="destaque"');
    });
    assert.ok(achou);

    // remover: clicar no trecho marcado
    await pagina.evaluate(qid => { praticarSoEstaQuestao(qid); }, ids.qid);
    await pagina.waitForSelector(".qcard-enunciado mark.destaque");
    await pagina.click(".qcard-enunciado mark.destaque");
    await pagina.waitForSelector("#barraDestaque:not([hidden]) button");
    await pagina.click("#barraDestaque button");
    const removido = await pagina.evaluate(() => ({ n: db.destaques.length, marcas: document.querySelectorAll(".qcard-enunciado mark.destaque").length }));
    assert.deepEqual(removido, { n: 0, marcas: 0 });
  } finally { await contexto.close(); }
});

test("destacar texto: só da própria pessoa, e clique de quem selecionou não escolhe a alternativa", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const q = db.questoes.find(x => x.status === "ativa" && x.enunciado.length > 60);
      const alvo = alvoDeQuestao(q.id, "enunciado");
      db.destaques.push({ id: "d-alheio", usuarioId: "outra-pessoa", alvo, inicio: 0, fim: 5, trecho: q.enunciado.slice(0, 5), data: hojeISO() });
      const dosOutros = htmlComDestaques(q.enunciado, alvo) === escapeHtml(q.enunciado);
      const html = htmlComDestaques("a <b>negrito</b> & c", "q:x:enunciado");
      // selecionar e escolher: com texto selecionado o clique na alternativa é ignorado
      praticarSoEstaQuestao(q.id);
      const alt = document.querySelector(".qcard-alt .alt-text");
      const rg = document.createRange(); rg.selectNodeContents(alt);
      getSelection().removeAllRanges(); getSelection().addRange(rg);
      const antes = JSON.stringify(state.sessaoAtual.marcadas || {});
      selecionarAlternativa("A");
      const depois = JSON.stringify(state.sessaoAtual.marcadas || {});
      getSelection().removeAllRanges();
      selecionarAlternativa("A");
      return { dosOutros, html, ignorou: antes === depois, escolheu: JSON.stringify(state.sessaoAtual.marcadas || {}) !== depois };
    });
    assert.ok(r.dosOutros, "destaque de outra pessoa não aparece");
    assert.equal(r.html, "a &lt;b&gt;negrito&lt;/b&gt; &amp; c", "sem destaque o texto continua escapado");
    assert.ok(r.ignorou);
    assert.ok(r.escolheu);
  } finally { await contexto.close(); }
});

test("destacar texto: o flashcard também aceita destaque, na frente e no verso", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const c = db.flashcards.find(x => x.frente && x.frente.length > 20);
      db.destaques.push({ id: "d-f1", usuarioId: usuarioAtual().id, alvo: alvoDeCartao(c.id, "frente"), inicio: 0, fim: 5, trecho: c.frente.slice(0, 5), data: hojeISO() });
      state.sessaoFlash = { cartoes: [c], indice: 0, virado: false, notas: [], finalizada: false };
      navigate("flashcards");
      const frente = document.querySelector(".flash-frente");
      return { alvo: frente.getAttribute("data-alvo"), marca: (frente.querySelector("mark.destaque") || {}).textContent, esperado: c.frente.slice(0, 5), id: c.id };
    });
    assert.equal(r.alvo, "c:" + r.id + ":frente");
    assert.equal(r.marca, r.esperado);
  } finally { await contexto.close(); }
});

test("justificativa: **parâmetro** vira realce, convive com o destaque do aluno e os prompts trazem o mesmo padrão", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const texto = "Choque: **PAS 82 mmHg** (normal: 90–120) exige volume.";
      const puro = htmlComDestaques(texto, null, true);
      const semPar = htmlComDestaques("a ** solta <b>", null, true);
      const plano = textoSemEnfase(texto);
      // o destaque do aluno vale sobre o texto sem os asteriscos e atravessa o realce
      db.destaques.push({ id: "d-e", usuarioId: usuarioAtual().id, alvo: "q:x:explicacao", inicio: plano.indexOf("82"), fim: plano.indexOf("82") + 12, trecho: plano.slice(plano.indexOf("82"), plano.indexOf("82") + 12), data: hojeISO() });
      const misto = htmlComDestaques(texto, "q:x:explicacao", true);
      const tmp = document.createElement("div"); tmp.innerHTML = misto;
      const q = db.questoes.find(x => x.status === "ativa");
      const regra = regraDeParametrosObjetivos();
      return { puro, semPar, plano, misto, textoDoMisto: tmp.textContent, regra,
        duvida: gerarPromptDuvida(q).includes(regra), importacao: gerarPromptImportacao().includes(regra),
        central: regrasDeConteudoImportacao().includes(regra) };
    });
    assert.equal(r.puro, 'Choque: <strong class="parametro">PAS 82 mmHg</strong> (normal: 90–120) exige volume.');
    assert.equal(r.semPar, "a ** solta &lt;b&gt;");
    assert.equal(r.plano, "Choque: PAS 82 mmHg (normal: 90–120) exige volume.");
    assert.match(r.misto, /<mark class="destaque"[^>]*>(<strong class="parametro">)?/);
    assert.equal(r.textoDoMisto, r.plano, "as marcas não mudam o texto");
    assert.match(r.regra, /valor normal ou esperado/);
    assert.match(r.regra, /escore/);
    assert.ok(r.duvida && r.importacao && r.central, "os três prompts usam a mesma regra");
  } finally { await contexto.close(); }
});
