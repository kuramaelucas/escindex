/* Regras que já quebraram uma vez e não podem voltar a quebrar. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, comNuvem;
before(async () => { navegador = await chromium.launch(); comNuvem = await subirServidor(); });
after(async () => { await navegador?.close(); await comNuvem?.fechar(); });

async function abrir(opcoes = {}){
  const contexto = await navegador.newContext({ serviceWorkers: "block", ...opcoes });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  return { pagina, contexto };
}
const pronto = p => p.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");

test("com a nuvem ligada, a conta de demonstração do administrador não entra", async () => {
  const { pagina, contexto } = await abrir();
  await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
  await pagina.evaluate(() => fazerLogin("admin@esc.demo", "admin123"));
  assert.equal(await pagina.evaluate(() => usuarioAtual() ? usuarioAtual().papel : null), null);
  // a de aluno continua
  await pagina.evaluate(() => fazerLoginDemo("aluno"));
  assert.equal(await pagina.evaluate(() => usuarioAtual().papel), "aluno");
  await contexto.close();
});

test("o dia vira à meia-noite de Brasília, não às 21h (UTC)", async () => {
  const { pagina, contexto } = await abrir({ timezoneId: "America/Sao_Paulo" });
  await pagina.clock.setFixedTime(new Date("2026-09-25T01:30:00Z"));   // 22h30 de 24/09 em Brasília
  await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
  assert.equal(await pagina.evaluate(() => hojeISO()), "2026-09-24");
  assert.equal(await pagina.evaluate(() => somarDias("2026-09-24", 1)), "2026-09-25");
  await contexto.close();
});

test("questão que espera figura da prova fica fora do que o aluno faz, mas continua no banco", async () => {
  const { pagina, contexto } = await abrir();
  await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
  const r = await pagina.evaluate(() => {
    fazerLoginDemo("aluno");
    const u = usuarioAtual();
    const esperando = db.questoes.filter(q => q.imagemPendente).map(q => q.id);
    const fora = new Set(esperando);
    // nenhuma entra nas listas de estudo, revisão ou provas antigas
    const ativas = questoesAtivas(true).filter(q => fora.has(q.id)).length;
    const estudo = questoesParaEstudo(u.id).filter(q => fora.has(q.id)).length;
    navigate("provas-antigas");
    const naProva = state.filtroRota.provasGrupos.some(g => g.ids.some(id => fora.has(id)));
    // montada à mão, a lista também as tira (e, só com ela, não abre sessão)
    iniciarSessaoComLista([{questaoId:"q-scmsp2022-011", motivo:"teste"}], "pratica");
    return { total: esperando.length, noBanco: esperando.every(id => getQuestao(id)), ativas, estudo, naProva,
             sessao: state.sessaoAtual ? state.sessaoAtual.itens.length : 0, tem036: fora.has("q-scmsp2022-011") };
  });
  assert.ok(r.total > 0 && r.noBanco && r.tem036);
  assert.equal(r.ativas, 0); assert.equal(r.estudo, 0); assert.equal(r.naProva, false); assert.equal(r.sessao, 0);
  await contexto.close();
});

test("a equipe vê a questão à espera da figura com o aviso, e liberá-la a devolve aos alunos", async () => {
  const semNuvem = await subirServidor({ semNuvem: true });
  const { pagina, contexto } = await abrir();
  await pagina.goto(semNuvem.url + "index.html"); await pronto(pagina);
  await pagina.evaluate(() => { fazerLogin("professor@esc.demo", "prof123"); fecharModal(); abrirQuestaoCompleta("q-scmsp2022-011"); });
  await pagina.waitForSelector(".imagem-pendente", { timeout: 5000 });
  assert.equal(await pagina.locator(".qcard-img").count(), 0);
  const r = await pagina.evaluate(() => {
    fecharModal();
    filtrosBanco().status = "aguarda-imagem"; navigate("banco-questoes");
    const listadas = document.querySelectorAll("#conteudoPagina tbody tr").length;
    abrirFormularioQuestao("q-scmsp2022-011");
    document.getElementById("fqImagemChegou").checked = true;
    salvarQuestaoFormulario("q-scmsp2022-011", true);
    const q = getQuestao("q-scmsp2022-011");
    return { listadas, liberada: !q.imagemPendente, ativa: questoesAtivas(true).some(x => x.id === q.id) };
  });
  assert.ok(r.listadas > 0);
  assert.ok(r.liberada && r.ativa);
  // recarregar não traz o aviso de volta da semente
  await pagina.reload(); await pronto(pagina);
  assert.equal(await pagina.evaluate(() => !!getQuestao("q-scmsp2022-011").imagemPendente), false);
  await contexto.close(); await semNuvem.fechar();
});

test("tutorial rápido: passos, guia completo e o pedido de não mostrar ao entrar", async () => {
  const { pagina, contexto } = await abrir();
  await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
  const r = await pagina.evaluate(() => {
    fazerLoginDemo("aluno");
    // em navegador de automação o tour não abre sozinho; aqui ele é forçado
    const abriu = mostrarTutorialAoEntrar({ mesmoComAutomacao: true });
    const passos = TUTORIAL_RAPIDO.aluno.length;
    for(let i = 1; i < passos; i++) passoTutorial(1);
    const ultimo = document.querySelector(".tutorial-passo").dataset.passo;
    const temGuia = !!Array.from(document.querySelectorAll(".modal button")).find(b => /guia completo/i.test(b.textContent));
    // uma vez por sessão: não abre de novo
    fecharTutorial();
    const deNovo = mostrarTutorialAoEntrar({ mesmoComAutomacao: true });
    abrirGuiaCompleto();
    const secoes = document.querySelectorAll(".guia-secao").length;
    fecharModal();
    definirTutorialAoEntrar(false);
    return { abriu, passos, ultimo: Number(ultimo), temGuia, deNovo, secoes, oculto: usuarioAtual().tutorialOcultoAoEntrar };
  });
  assert.equal(r.abriu, true);
  assert.equal(r.ultimo, r.passos - 1);
  assert.ok(r.temGuia);
  assert.equal(r.deNovo, false);
  assert.ok(r.secoes >= 5);
  assert.equal(r.oculto, true);
  // numa sessão nova do navegador, quem pediu para não ver não vê
  await pagina.evaluate(() => sessionStorage.clear());
  await pagina.reload(); await pronto(pagina);
  assert.equal(await pagina.evaluate(() => { fazerLoginDemo("aluno"); return mostrarTutorialAoEntrar({ mesmoComAutomacao: true }); }), false);
  // o Perfil traz as duas entradas e desfaz a escolha
  const perfil = await pagina.evaluate(() => { navigate("perfil"); return document.getElementById("conteudoPagina").textContent; });
  assert.match(perfil, /Tutorial rápido/); assert.match(perfil, /Guia completo/);
  await contexto.close();
});

test("\"Baixar uma cópia do meu estudo\" traz o estudo inteiro, não só contagens", async () => {
  // duas funções com o mesmo nome (a do download e a contagem da janela de
  // excluir cadastro): a carregada depois substituía a outra em silêncio
  const semNuvem = await subirServidor({ semNuvem: true });
  const { pagina, contexto } = await abrir({ acceptDownloads: true });
  try{
    await pagina.goto(semNuvem.url + "index.html"); await pronto(pagina);
    await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); navigate("perfil");
      const u = usuarioAtual(), q = questoesParaEstudo(u.id)[0];
      db.respostas.push({ id: "r-teste", usuarioId: u.id, questaoId: q.id, areaId: q.areaId, alternativaEscolhida: "A", correta: false, confianca: "chute", data: hojeISO() });
      saveState();
    });
    const [download] = await Promise.all([pagina.waitForEvent("download"), pagina.evaluate(() => baixarMeusDados())]);
    const conteudo = JSON.parse(await (await import("node:fs")).promises.readFile(await download.path(), "utf8"));
    assert.equal(conteudo.formato, "esc-meus-dados-1");
    assert.ok(Array.isArray(conteudo.respostas) && conteudo.respostas.some(r => r.id === "r-teste"), "as respostas vão inteiras");
    assert.equal(conteudo.perfil.senha, undefined, "a senha não vai no arquivo");
  }finally{ await contexto.close(); await semNuvem.fechar(); }
});

test("prova antiga tem só questões reais e mostra as anuladas", async () => {
  const { pagina, contexto } = await abrir();
  await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
  const provas = await pagina.evaluate(() => {
    fazerLoginDemo("aluno"); navigate("provas-antigas");
    return state.filtroRota.provasGrupos.map(g => ({ nome: g.banca + " " + g.ano, n: g.ids.length, anuladas: g.anuladas.length, semImagem: g.semImagem,
      todasReais: g.ids.every(id => getQuestao(id).real) }));
  });
  assert.ok(provas.every(p => p.todasReais), JSON.stringify(provas));
  const p2024 = provas.find(p => p.nome === "UNIFESP-EPM 2024");
  // as que esperam a figura ficam fora, mas o cartão as conta
  assert.equal(p2024.n + p2024.anuladas + p2024.semImagem, 100);
  await contexto.close();
});

test("o que mais cai e a nota estimada saem das provas reais", async () => {
  const { pagina, contexto } = await abrir();
  await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
  const r = await pagina.evaluate(() => {
    fazerLoginDemo("aluno");
    const u = usuarioAtual();
    const inc = incidenciaNaBanca("UNIFESP-EPM");
    const antes = estimativaDeNota(u.id);           // sem respostas: não há nota
    // 40 respostas, todas certas em Clínica Médica e todas erradas no resto
    db.questoes.filter(q => q.real && q.status === "ativa").slice(0, 40).forEach((q, i) => {
      db.respostas.push({ id: "t" + i, usuarioId: u.id, questaoId: q.id, areaId: q.areaId, especialidadeId: q.especialidadeId,
        assuntoId: q.assuntoId, alternativaEscolhida: "A", correta: q.areaId === "area-cm", confianca: "certeza", data: hojeISO() });
    });
    saveState();
    const nota = estimativaDeNota(u.id);
    const prio = prioridadesDeEstudo(u.id);
    return { total: inc.total, anos: inc.anos, antes, nota: nota && nota.nota, faixa: nota && [nota.minimo, nota.maximo],
             somaFatias: nota && nota.areas.reduce((s, a) => s + a.fatia, 0), prio0: prio[0], ordenada: prio.every((p, i) => !i || prio[i-1].prioridade >= p.prioridade) };
  });
  assert.equal(r.total, 500);
  assert.deepEqual(r.anos, [2022, 2023, 2024, 2025, 2026]);
  assert.equal(r.antes, null);
  assert.ok(r.nota > 0 && r.nota < 100, "nota " + r.nota);
  assert.ok(r.faixa[0] <= r.nota && r.nota <= r.faixa[1]);
  assert.ok(Math.abs(r.somaFatias - 1) < 1e-9);
  assert.ok(r.ordenada);
  assert.ok(r.prio0.questoesNaProva >= 1);
  await contexto.close();
});

test("cartões em lote: o modelo leva os assuntos e a conferência separa o bom do ruim", async () => {
  const semNuvem = await subirServidor({ semNuvem: true });
  const { pagina, contexto } = await abrir();
  await pagina.goto(semNuvem.url + "index.html"); await pronto(pagina);
  const r = await pagina.evaluate(() => {
    fazerLogin("professor@esc.demo", "prof123");
    const st = estadoLoteCartoes();
    st.selecionados = ["ass-neuro-cefaleias", "ass-uro-escroto"];
    const modelo = modeloLoteCartoes();
    const antes = flashcardsDaEquipe().length;
    const texto = [
      "ASSUNTO: ass-neuro-cefaleias\nFRENTE: Qual sinal de alarme numa cefaleia pede imagem?\nVERSO: Cefaleia súbita e explosiva, a pior da vida.\nFONTE: a conferir\n---",
      "**ASSUNTO:** ass-uro-escroto\n**FRENTE:** Qual a conduta na torção testicular?\n**VERSO:** Exploração cirúrgica imediata,\nsem esperar exame.\n---",
      "ASSUNTO: ass-que-nao-existe\nFRENTE: x?\nVERSO: y\n---",
      "ASSUNTO: ass-neuro-cefaleias\nFRENTE: Qual sinal de alarme numa cefaleia pede imagem?\nVERSO: repetido\n---",
    ].join("\n");
    const analise = analisarTextoLoteCartoes(texto);
    st.analise = analise;
    publicarLoteCartoes();
    return { modelo, validos: analise.validos, problemas: analise.problemas.length, depois: flashcardsDaEquipe().length - antes };
  });
  assert.match(r.modelo, /ass-neuro-cefaleias = Cefaleias/);
  assert.match(r.modelo, /ass-uro-escroto/);
  assert.equal(r.validos.length, 2);
  assert.equal(r.validos[1].verso, "Exploração cirúrgica imediata, sem esperar exame.");
  assert.equal(r.problemas, 2);
  assert.equal(r.depois, 2);
  await contexto.close(); await semNuvem.fechar();
});

test("6º ano (Grupo E): períodos com subdivisões repartem o tempo igualmente e só há o Grupo E", async () => {
  const { pagina, contexto } = await abrir();
  await pagina.clock.setFixedTime(new Date("2026-01-20T15:00:00Z"));
  await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
  const r = await pagina.evaluate(() => {
    const seq = sequenciaDoAno("6º ano");
    const ped = seq[0];
    const partes = subdivisoesComDatas(ped);
    const grupo = { deslocamento: 3 };   // turma antiga, de quando o ano tinha outras letras
    const blocos = blocosDoGrupo(grupo, { anoFaculdade: "6º ano" });
    return {
      n: seq.length, opcoes: opcoesRodizio("6º ano").map(o => o.rotulo),
      partes: partes.map(p => [p.nome, p.dataInicio, p.dataFim]),
      cobre: partes[0].dataInicio === ped.dataInicio && partes[2].dataFim === ped.dataFim,
      primeiro: blocos[0].nome, subs: blocos[0].subdivisoes.length,
      obst: subdivisoesComDatas(seq[1]).map(p => [p.dataInicio, p.dataFim]),
    };
  });
  assert.equal(r.n, 5);
  assert.deepEqual(r.opcoes, ["E"]);
  // 05/01 a 04/03 = 59 dias em 3 partes: 20 + 20 + 19
  assert.deepEqual(r.partes, [["Emergências Pediátricas", "2026-01-05", "2026-01-24"], ["Enfermaria de Pediatria", "2026-01-25", "2026-02-13"], ["Pediatria Neonatal", "2026-02-14", "2026-03-04"]]);
  assert.ok(r.cobre);
  assert.equal(r.primeiro, "Pediatria");
  assert.equal(r.subs, 3);
  // 05/03 a 05/05 = 62 dias em 2 partes de 31
  assert.deepEqual(r.obst, [["2026-03-05", "2026-04-04"], ["2026-04-05", "2026-05-05"]]);
  await contexto.close();
});

test("questão respondida não volta em sessão nova antes do prazo da revisão espaçada", async () => {
  const { pagina, contexto } = await abrir();
  try {
    await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno");
      const u = usuarioAtual();
      // responde 200 questões hoje (certo e errado), depois monta várias sessões
      const feitas = questoesParaEstudo(u.id).slice(0, 200);
      feitas.forEach((q, i) => registrarResposta(u.id, q.id, q.gabarito, i % 2 ? "certeza" : "chute", 30, "pratica"));
      const ids = new Set(feitas.map(q => q.id));
      let repetidas = 0;
      for(let i = 0; i < 10; i++) montarSessaoRecomendada(u.id, 20).forEach(it => { if(ids.has(it.questaoId)) repetidas++; });
      const praticadas = embaralharSemRepetir(u.id, questoesParaEstudo(u.id)).slice(0, 50).filter(q => ids.has(q.id)).length;
      return { repetidas, praticadas };
    });
    assert.equal(r.repetidas, 0);
    assert.equal(r.praticadas, 0);
  } finally { await contexto.close(); }
});

test("a prova dissertativa aparece em Provas antigas, só para praticar (sem simulado com relógio)", async () => {
  const { pagina, contexto } = await abrir();
  await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
  const r = await pagina.evaluate(() => {
    fazerLoginDemo("aluno"); navigate("provas-antigas");
    const g = (state.filtroRota.provasGrupos || []).find(x => x.banca === "UNICAMP (dissertativa)");
    const cartao = [...document.querySelectorAll(".prova-card")].find(c => c.textContent.includes("UNICAMP (dissertativa)"));
    return { existe: !!g, dissertativa: g && g.dissertativa, total: g && g.ids.length,
      botoes: cartao ? [...cartao.querySelectorAll("button")].map(b => b.textContent.trim()) : [] };
  });
  assert.equal(r.existe, true);
  assert.equal(r.dissertativa, true);
  assert.ok(r.total >= 60);
  assert.deepEqual(r.botoes, ["Fazer a prova (sem cronômetro)"]);
  await contexto.close();
});

test("saveState junta a rajada numa gravação só e grava de vez ao sair da página ou com {imediato:true}", async () => {
  const { pagina, contexto } = await abrir();
  try{
    await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
    const r = await pagina.evaluate(() => {
      const lido = () => JSON.parse(localStorage.getItem("medbloco_db_v1")).marcadorTeste || null;
      let gravacoes = 0;
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function(k, v){ if(k === CHAVE_STORAGE) gravacoes++; return original.call(this, k, v); };
      const antes = gravacoes;
      db.marcadorTeste = "a"; saveState(); db.marcadorTeste = "b"; saveState(); db.marcadorTeste = "c"; saveState();
      const semGravarAinda = gravacoes === antes && lido() !== "c";
      window.dispatchEvent(new Event("pagehide"));            // a página vai embora: grava na hora
      const aposPagehide = { gravacoes: gravacoes - antes, valor: lido() };
      db.marcadorTeste = "d"; const ok = saveState({ imediato: true });
      const imediato = { ok, valor: lido() };
      Storage.prototype.setItem = original;
      return { semGravarAinda, aposPagehide, imediato };
    });
    assert.equal(r.semGravarAinda, true);
    assert.deepEqual(r.aposPagehide, { gravacoes: 1, valor: "c" });
    assert.deepEqual(r.imediato, { ok: true, valor: "d" });
  } finally { await contexto.close(); }
});
