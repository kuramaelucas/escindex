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
    // desatualizada não conta na incidência (a regra mudou, a prova não vale como retrato): o esperado vem dos dados, não de um 500 fixo
    const esperado = db.questoes.filter(q => q.real && q.banca === "UNIFESP-EPM" && q.status !== "desatualizada").length;
    return { total: inc.total, esperado, anos: inc.anos, antes, nota: nota && nota.nota, faixa: nota && [nota.minimo, nota.maximo],
             somaFatias: nota && nota.areas.reduce((s, a) => s + a.fatia, 0), prio0: prio[0], ordenada: prio.every((p, i) => !i || prio[i-1].prioridade >= p.prioridade) };
  });
  assert.equal(r.total, r.esperado);
  assert.ok(r.total >= 490, "cinco provas de 100 questões, menos as poucas desatualizadas: " + r.total);
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

test("a mesma questão não aparece duas vezes na fila de uma sessão", async () => {
  const { pagina, contexto } = await abrir();
  try{
    await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno");
      const ids = db.questoes.filter(q => q.status === "ativa").slice(0, 4).map(q => q.id);
      // a mesma questão vinda de duas fatias (ex.: bloco atual e revisão)
      const lista = [ids[0], ids[1], ids[0], ids[2], ids[1]].map(id => ({ questaoId: id, origem: "teste", motivo: "t" }));
      iniciarSessaoComLista(lista, "pratica");
      const fila = state.sessaoAtual.itens.map(i => i.questaoId);
      // e a sessão recomendada, montada várias vezes, nunca repete
      const u = usuarioAtual();
      const repetiu = Array.from({ length: 30 }, () => montarSessaoRecomendada(u.id, 20)).some(s => new Set(s.map(i => i.questaoId)).size !== s.length);
      return { fila, esperado: [ids[0], ids[1], ids[2]], repetiu };
    });
    assert.deepEqual(r.fila, r.esperado);
    assert.equal(r.repetiu, false);
  } finally { await contexto.close(); }
});

test("a atualização automática da página não recarrega com janela aberta, sessão em andamento ou texto digitado", async () => {
  const { pagina, contexto } = await abrir();
  try{
    await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); navigate("inicio");
      const livre = podeRecarregarSemInterromper();
      abrirModal("<p>janela</p>");
      const comJanela = podeRecarregarSemInterromper();
      fecharModal();
      navigate("estudar");
      const foraDoInicio = podeRecarregarSemInterromper();
      navigate("inicio");
      const ids = db.questoes.filter(q => q.status === "ativa").slice(0, 2).map(q => q.id);
      iniciarSessaoComLista(ids.map(id => ({ questaoId: id, origem: "t", motivo: "t" })), "pratica");
      const comSessao = podeRecarregarSemInterromper();
      return { livre, comJanela, foraDoInicio, comSessao };
    });
    assert.deepEqual(r, { livre: true, comJanela: false, foraDoInicio: false, comSessao: false });
  } finally { await contexto.close(); }
});

test("Evolução por assunto: a seção e as áreas abertas continuam abertas quando a tela se redesenha", async () => {
  const { pagina, contexto } = await abrir();
  try{
    await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
    const r = await pagina.evaluate(async () => {
      fazerLoginDemo("aluno"); navigate("desempenho");
      const u = usuarioAtual();
      db.questoes.filter(q => q.status === "ativa").slice(0, 6).forEach((q, i) => db.respostas.push({ id: "ev" + i, usuarioId: u.id, questaoId: q.id,
        areaId: q.areaId, especialidadeId: q.especialidadeId, assuntoId: q.assuntoId, alternativaEscolhida: "A", correta: i % 2 === 0, confianca: "certeza", data: hojeISO() }));
      saveState(); render();
      const caixa = () => document.querySelector("#evolucaoAssuntos > details");
      if(!caixa()) return { semSecao: true };
      caixa().open = true;
      await new Promise(r => setTimeout(r, 50));
      const area = document.querySelector("#evolucaoAssuntos details.evolucao-area");
      area.open = true;
      await new Promise(r => setTimeout(r, 50));
      render();
      return { secao: caixa().open, area: document.querySelector("#evolucaoAssuntos details.evolucao-area").open };
    });
    assert.deepEqual(r, { secao: true, area: true });
  } finally { await contexto.close(); }
});

test("senha de conta local: guardada com sal + hash (nunca em texto), conta antiga é convertida e a troca de senha continua valendo", async () => {
  const { createHash } = await import("node:crypto");
  const { pagina, contexto } = await abrir();
  try{
    await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
    // o SHA-256 próprio bate com o do Node, inclusive com acento e texto longo
    const textos = ["", "abc", "senha com acentuação ção ü", "x".repeat(200)];
    const nossos = await pagina.evaluate(ts => ts.map(sha256Hex), textos);
    assert.deepEqual(nossos, textos.map(t => createHash("sha256").update(t).digest("hex")));

    const r = await pagina.evaluate(() => {
      // conta antiga, com a senha em texto
      db.usuarios.push({ id: "u-antiga", nome: "Antiga", email: "antiga@teste.local", matricula: "A1", senha: "segredo1", papel: "aluno", status: "ativo" });
      const errada = (fazerLogin("antiga@teste.local", "outra"), usuarioAtual());
      fazerLogin("antiga@teste.local", "segredo1");
      const u = getUsuario("u-antiga");
      const aposLogin = { logou: usuarioAtual() && usuarioAtual().id === "u-antiga", texto: u.senha, temHash: !!u.senhaHash && !!u.senhaSal };
      // a troca de senha vale: a nova entra, a velha não
      document.body.insertAdjacentHTML("beforeend", '<input id="senhaAtual" value="segredo1"><input id="senhaNova" value="novasenha"><input id="senhaNova2" value="novasenha">');
      trocarMinhaSenha();
      state.usuarioAtualId = null;
      fazerLogin("antiga@teste.local", "segredo1"); const velhaEntrou = !!usuarioAtual();
      fazerLogin("antiga@teste.local", "novasenha"); const novaEntrou = !!usuarioAtual();
      return { errada: errada === null, aposLogin, velhaEntrou, novaEntrou, noBanco: JSON.stringify(db).includes("segredo1") || JSON.stringify(db).includes("novasenha") };
    });
    assert.equal(r.errada, true);
    assert.deepEqual(r.aposLogin, { logou: true, texto: undefined, temHash: true });
    assert.equal(r.velhaEntrou, false);
    assert.equal(r.novaEntrou, true);
    assert.equal(r.noBanco, false, "nenhuma senha em texto no banco");

    // a migração da carga converte o que veio de um backup antigo
    await pagina.evaluate(() => { db.usuarios.push({ id: "u-bkp", nome: "Bkp", email: "bkp@teste.local", matricula: "B1", senha: "daBackup", papel: "aluno", status: "ativo" }); saveState({ imediato: true }); });
    await pagina.reload(); await pronto(pagina);
    const m = await pagina.evaluate(() => { const u = getUsuario("u-bkp"); return { texto: u.senha, hash: !!u.senhaHash, entra: (fazerLogin("bkp@teste.local", "daBackup"), !!usuarioAtual()) }; });
    assert.deepEqual(m, { texto: undefined, hash: true, entra: true });
  } finally { await contexto.close(); }
});

test("gabarito corrigido depois da prova refaz a nota de quem já fez, e o acerto por especialidade aparece no resultado", async () => {
  const { pagina, contexto } = await abrir();
  try {
    await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
    const r = await pagina.evaluate(() => {
      const q = db.questoes.find(x => x.gabarito && x.areaId && !ehDissertativa(x) && x.status === "ativa");
      const outra = ["A","B","C","D","E"].find(l => l !== q.gabarito);
      db.resultadosSimulados.push({ id: "res-t", usuarioId: "u-x", titulo: "T", nota: 100, acertos: 1, total: 1, data: hojeISO(), itens: [{ questaoId: q.id }], respostas: { [q.id]: q.gabarito } });
      const antes = recalcularResultadosSimulados();
      q.gabarito = outra;   // a banca mudou o gabarito
      const mudou = recalcularResultadosSimulados();
      const res = db.resultadosSimulados.find(x => x.id === "res-t");
      const html = htmlAcertoPorEspecialidade([{ q, correta: false }]);
      return { antes, mudou, nota: res.nota, acertos: res.acertos, html: html.includes("Acerto por especialidade") && html.includes("0%") };
    });
    assert.deepEqual(r, { antes: 0, mudou: 1, nota: 0, acertos: 0, html: true });
  } finally { await contexto.close(); }
});

test("Criar Simulado: a sugestão marca a mistura mais difícil e completa pelo nível mais próximo", async () => {
  const { pagina, contexto } = await abrir();
  try {
    await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
    await pagina.evaluate(() => fazerLoginDemo("aluno"));
    const r = await pagina.evaluate(() => {
      const pool = questoesAtivas().filter(q => !ehDissertativa(q)).map(q => q.id);
      state.filtroRota = state.filtroRota || {};
      state.filtroRota.criarSimulado = { pool, selecionadas: [] };
      const campo = document.createElement("input"); campo.id = "csQuantidade"; campo.value = "40"; document.body.appendChild(campo);
      sugerirSelecaoSimulado();
      const n = [0, 0, 0];
      state.filtroRota.criarSimulado.selecionadas.forEach(id => n[nivelDaQuestao(getQuestao(id))]++);
      const disponivel = [0, 0, 0]; pool.forEach(id => disponivel[nivelDaQuestao(getQuestao(id))]++);
      return { n, disponivel };
    });
    const total = r.n[0] + r.n[1] + r.n[2];
    assert.equal(total, 40);
    // difícil é o alvo maior: 16 de 40, ou tudo o que existe se houver menos
    assert.ok(r.n[2] >= Math.min(16, r.disponivel[2]));
    assert.ok(r.n[0] <= 6 || r.disponivel[1] + r.disponivel[2] < 34);
  } finally { await contexto.close(); }
});

test("desempenho do assunto: conta a primeira resposta, mostra a faixa e pesa as últimas 15", async () => {
  const { pagina, contexto } = await abrir();
  try {
    await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
    const r = await pagina.evaluate(() => {
      fazerLogin("aluno@esc.demo", "aluno123"); fecharModal();
      const u = usuarioAtual();
      db.respostas = db.respostas.filter(x => x.usuarioId !== u.id);
      const [a, b] = db.taxonomia.assuntos;
      const poe = (ass, q, correta, dia) => db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: q, assuntoId: ass, correta, data: somarDias(hojeISO(), -dia), respondidaEm: somarDias(hojeISO(), -dia) + "T10:00:00Z", confianca: "duvida" });
      // assunto A: 20 questões, erra as 10 primeiras e acerta as 10 últimas; depois refaz todas e acerta
      for(let i = 0; i < 20; i++) poe(a.id, "qa" + i, i >= 10, 60 - i);
      for(let i = 0; i < 20; i++) poe(a.id, "qa" + i, true, 1);
      // assunto B: uma única resposta errada, só para existir mais de um assunto no total geral
      poe(b.id, "qb0", false, 5);
      const A = desempenhoPorAssunto(u.id).find(x => x.assuntoId === a.id);
      return { total: A.total, acertos: A.acertos, todas: A.totalTodas, taxaTodas: A.taxaTodas, rec: A.recente, estimado: A.acertoEstimado, faixa: [A.minimo, A.maximo], geral: acertoGeralDoUsuario(u.id).total };
    });
    assert.equal(r.total, 20);          // repetição não conta como domínio
    assert.equal(r.acertos, 10);
    assert.equal(r.todas, 40);          // mas continua registrada como retenção
    assert.equal(r.taxaTodas, 75);
    assert.deepEqual([r.rec.total, r.rec.acertos], [15, 10]);   // últimas 15: as 5 mais antigas erradas já saíram
    assert.ok(r.estimado > 0.5, "as últimas questões puxam o estimado para cima da taxa de 50%");
    assert.ok(r.faixa[0] < 50 && r.faixa[1] > 50);
    assert.equal(r.geral, 21);
  } finally { await contexto.close(); }
});

test("nota estimada: a nota dos simulados aparece à parte, só depois de 20 questões feitas em simulado", async () => {
  const { pagina, contexto } = await abrir();
  try {
    await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno");
      const u = usuarioAtual();
      db.respostas = db.respostas.filter(x => x.usuarioId !== u.id);
      const qs = db.questoes.filter(q => q.real && q.status === "ativa").slice(0, 60);
      const poe = (q, i, origem, correta) => db.respostas.push({ id: "t" + origem + i, usuarioId: u.id, questaoId: q.id, areaId: q.areaId, assuntoId: q.assuntoId, correta, origem, confianca: "duvida", data: hojeISO() });
      qs.slice(0, 40).forEach((q, i) => poe(q, i, "lista", true));          // estudo: acerta tudo
      const antes = estimativaDeNota(u.id);
      qs.slice(40, 60).forEach((q, i) => poe(q, i, "simulado", false));      // simulado: erra tudo, questões diferentes
      const depois = estimativaDeNota(u.id);
      return { faltam: antes.faltamParaSimulado, simAntes: antes.simulado, sim: depois.simulado && depois.simulado.nota, est: depois.estudo && depois.estudo.nota, geral: depois.nota };
    });
    assert.equal(r.faltam, 20);
    assert.equal(r.simAntes, null);
    assert.ok(r.sim < r.est, `simulado ${r.sim} deveria ficar abaixo do estudo ${r.est}`);
    assert.ok(r.sim < r.geral && r.geral < r.est);
  } finally { await contexto.close(); }
});

test("errar com certeza antecipa até 3 questões do mesmo assunto; errar na dúvida não mexe em nenhuma", async () => {
  const { pagina, contexto } = await abrir();
  try {
    await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno");
      const u = usuarioAtual();
      db.revisoes[u.id] = {};
      const porAssunto = {};
      db.questoes.filter(q => q.real && q.status === "ativa" && q.gabarito && !aguardaImagem(q)).forEach(q => (porAssunto[q.assuntoId] = porAssunto[q.assuntoId] || []).push(q));
      const grupo = Object.values(porAssunto).find(g => g.length >= 7);
      const [alvo, ...irmas] = grupo;
      const longe = somarDias(hojeISO(), 60);
      irmas.slice(0, 5).forEach(q => { db.revisoes[u.id][q.id] = { repeticoes: 1, fator: 2.5, intervalo: 60, proximaRevisao: longe, ultimaData: hojeISO(), ultimaCorreta: true, ultimaConfianca: "certeza" }; });
      db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: alvo.id, assuntoId: alvo.assuntoId, areaId: alvo.areaId, correta: false, confianca: "duvida", data: hojeISO() });
      registrarRevisao(u.id, alvo.id, false, "duvida");
      const aposDuvida = irmas.slice(0, 5).filter(q => db.revisoes[u.id][q.id].proximaRevisao !== longe).length;
      registrarRevisao(u.id, alvo.id, false, "certeza");
      const antecipadas = irmas.slice(0, 5).filter(q => db.revisoes[u.id][q.id].proximaRevisao !== longe);
      // o que vale é a data EFETIVA (a da fila), e ela tem de sobreviver à ida e volta pela nuvem, que só leva os campos conhecidos
      const viaNuvem = q => { const e = db.revisoes[u.id][q.id]; return proximaRevisaoEfetiva({ repeticoes: e.repeticoes, fator: e.fator, intervalo: e.intervalo, proximaRevisao: e.proximaRevisao, ultimaData: e.ultimaData, ultimaCorreta: e.ultimaCorreta, ultimaConfianca: e.ultimaConfianca }); };
      const efetivas = antecipadas.map(viaNuvem);
      const intactaEfetiva = irmas.slice(0, 5).filter(q => !antecipadas.includes(q)).map(q => proximaRevisaoEfetiva(db.revisoes[u.id][q.id]));
      return { aposDuvida, n: antecipadas.length, data: db.revisoes[u.id][antecipadas[0].id].proximaRevisao, esperada: somarDias(hojeISO(), CONFIG.intervaloMinimoRevisao),
               naoRespondidaIntacta: !db.revisoes[u.id][irmas[6].id], efetivas, intactaEfetiva, longe };
    });
    assert.equal(r.aposDuvida, 0);
    assert.equal(r.n, 3);
    assert.equal(r.data, r.esperada);
    assert.deepEqual(r.efetivas, [r.esperada, r.esperada, r.esperada]);   // o piso de um mês não desfaz a antecipação
    assert.ok(r.intactaEfetiva.every(d => d === r.longe));               // as que não foram antecipadas seguem no prazo
    assert.ok(r.naoRespondidaIntacta);       // questão que a pessoa nunca respondeu não ganha revisão
  } finally { await contexto.close(); }
});

test("curva de retenção: só conta acerto firme seguido de nova resposta, por faixa de dias, e só opina com casos suficientes", async () => {
  const { pagina, contexto } = await abrir();
  try {
    await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno");
      const u = usuarioAtual();
      db.respostas = db.respostas.filter(x => x.usuarioId !== u.id);
      const base = "2026-01-01";
      const poe = (q, dia, correta, confianca) => db.respostas.push({ id: uid("r"), usuarioId: u.id, questaoId: q, correta, confianca, data: somarDias(base, dia), respondidaEm: somarDias(base, dia) + "T10:00:00Z" });
      // 12 questões: acerto firme, volta 40 dias depois — 11 acertam e 1 erra
      for(let i = 0; i < 12; i++){ poe("q" + i, 0, true, "certeza"); poe("q" + i, 40, i !== 0, "certeza"); }
      // acerto no chute não conta como ponto de partida; mesmo dia também não
      poe("c", 0, true, "chute"); poe("c", 10, false, "duvida");
      poe("d", 0, true, "certeza"); poe("d", 0, false, "certeza");
      const f = curvaDeRetencao(u.id);
      return Object.fromEntries(f.map(x => [x.id, { n: x.n, taxa: x.taxa, veredito: x.veredito }]));
    });
    assert.deepEqual(r.ate14, { n: 0, taxa: null, veredito: "poucos" });
    assert.equal(r.ate60.n, 12);
    assert.equal(r.ate60.taxa, 92);
    assert.equal(r.ate60.veredito, "adequada");   // 11/12: faixa provável ainda inclui a meta, não dá para mandar alargar
  } finally { await contexto.close(); }
});

test("suspeitas da turma: aponta o padrão de erro (alternativa errada mais marcada que o gabarito, erro com certeza), não só a taxa baixa", async () => {
  const { pagina, contexto } = await abrir();
  try {
    await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("admin");
      const [a, b, c, d] = db.questoes.filter(q => q.real && q.status === "ativa" && q.gabarito && !ehDissertativa(q) && !q.revisadaProfessor);
      const errada = q => q.alternativas.find(x => x.id !== q.gabarito).id;
      const linhas = [
        { questao_id: a.id, alunos: 20, acertos: 4, erros_com_certeza: 10, alternativas: { [errada(a)]: 12, [a.gabarito]: 4 } },   // suspeita nos dois sinais
        { questao_id: b.id, alunos: 20, acertos: 5, erros_com_certeza: 1, alternativas: { [b.gabarito]: 5, [errada(b)]: 5 } },       // difícil, mas sem padrão: não é suspeita
        { questao_id: c.id, alunos: 6, acertos: 0, erros_com_certeza: 6, alternativas: { [errada(c)]: 6 } },                         // poucos alunos: ainda não decide
        { questao_id: d.id, alunos: 15, acertos: 6, erros_com_certeza: 6, alternativas: { [d.gabarito]: 6, [errada(d)]: 5 } },       // só erro com certeza
      ];
      const lista = suspeitasDeQuestoes(linhas);
      state.filtroRota.suspeitasDados = { lista, questoes: linhas.length };
      const html = renderListaSuspeitas();
      return { ids: lista.map(s => s.q.id), esperados: [a.id, d.id], sinaisA: lista[0].sinais.length, sinaisD: lista[1].sinais.length, mostraA: html.includes(a.id), mostraB: html.includes(b.id) };
    });
    assert.deepEqual(r.ids, r.esperados);       // a primeira (dois sinais) vem antes
    assert.equal(r.sinaisA, 2);
    assert.equal(r.sinaisD, 1);
    assert.ok(r.mostraA && !r.mostraB);
  } finally { await contexto.close(); }
});

test("acerto estimado: o recente é comparado com o antigo (sem contar duas vezes) e pesa mais quando o histórico é curto", async () => {
  const { pagina, contexto } = await abrir();
  try {
    await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
    const r = await pagina.evaluate(() => {
      const g = 0.5;
      const longo = acertoEstimadoDoRecorte({ total: 115, acertos: 65, recente: { total: 15, acertos: 15 } }, g);   // 100 antigas a 50% + 15 recentes certas
      const semAntigo = acertoEstimadoDoRecorte({ total: 15, acertos: 15, recente: { total: 15, acertos: 15 } }, g);
      const total = (15 + 4 * g) / (15 + 4);
      const curto = acertoEstimadoDoRecorte({ total: 20, acertos: 10, recente: { total: 15, acertos: 10 } }, g);     // 5 antigas erradas + 15 recentes a 67%
      const pouco = acertoEstimadoDoRecorte({ total: 8, acertos: 4, recente: { total: 4, acertos: 4 } }, g);         // menos de 5 recentes: vale só o total
      return { longo, semAntigo, total, curto, pouco, poucoTotal: (4 + 4 * g) / (8 + 4) };
    });
    assert.ok(r.longo > 0.57 && r.longo < 0.62, "histórico longo: o recente puxa pouco, " + r.longo);
    assert.ok(Math.abs(r.semAntigo - r.total) < 1e-9, "sem parte antiga não há o que comparar");
    assert.ok(r.curto > 0.55, "histórico curto: o recente domina, " + r.curto);
    assert.ok(Math.abs(r.pouco - r.poucoTotal) < 1e-9);
  } finally { await contexto.close(); }
});

test("duplicadas: mesmo caso clínico com pergunta diferente não é cópia; enunciado igual por inteiro é", async () => {
  const { pagina, contexto } = await abrir();
  await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
  const r = await pagina.evaluate(() => {
    const caso = "Paciente de 45 anos, diabético, com febre há três dias, tosse produtiva e dispneia progressiva, saturação de 88% em ar ambiente. ";
    return {
      outraPergunta: assinaturaEnunciado(caso + "Qual o diagnóstico mais provável?") === assinaturaEnunciado(caso + "Qual a conduta inicial?"),
      mesmaComFormatacao: assinaturaEnunciado(caso + "Qual a conduta inicial?") === assinaturaEnunciado(caso.toUpperCase() + "  Qual a conduta inicial?!")
    };
  });
  assert.equal(r.outraPergunta, false);
  assert.equal(r.mesmaComFormatacao, true);
  await contexto.close();
});
