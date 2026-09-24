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

test("questão que espera figura da prova avisa em vez de mostrar imagem quebrada", async () => {
  const { pagina, contexto } = await abrir();
  await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
  await pagina.evaluate(() => { fazerLoginDemo("aluno"); iniciarSessaoComLista([{questaoId:"q-unifesp2026-036", motivo:"teste"}], "pratica"); });
  await pagina.waitForSelector(".imagem-pendente", { timeout: 5000 });
  assert.equal(await pagina.locator(".qcard-img").count(), 0);
  await contexto.close();
});

test("prova antiga tem só questões reais e mostra as anuladas", async () => {
  const { pagina, contexto } = await abrir();
  await pagina.goto(comNuvem.url + "index.html"); await pronto(pagina);
  const provas = await pagina.evaluate(() => {
    fazerLoginDemo("aluno"); navigate("provas-antigas");
    return state.filtroRota.provasGrupos.map(g => ({ nome: g.banca + " " + g.ano, n: g.ids.length, anuladas: g.anuladas.length,
      todasReais: g.ids.every(id => getQuestao(id).real) }));
  });
  assert.ok(provas.every(p => p.todasReais), JSON.stringify(provas));
  const p2024 = provas.find(p => p.nome === "UNIFESP-EPM 2024");
  assert.equal(p2024.n + p2024.anuladas, 100);
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
