/* Simulado feito mais de uma vez: clicar no título abre as tentativas e o
   resultado mostra, como sombra, o que mudou em relação à tentativa anterior. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, semNuvem;
before(async () => { navegador = await chromium.launch(); semNuvem = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await semNuvem?.fechar(); });

test("tentativas do simulado: lista, comparação com a anterior e sombra no mapa de acertos", async () => {
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  try {
    const pagina = await contexto.newPage();
    await pagina.goto(semNuvem.url + "index.html");
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const u = usuarioAtual();
      const qs = db.questoes.filter(q => !q.tipo && q.status === "ativa" && !aguardaImagem(q) && q.gabarito).slice(0, 4);
      const ids = qs.map(q => q.id);
      db.simulados.push({ id: "sim-t2", titulo: "Simulado das tentativas", questoes: ids, duracaoMin: 60, tipo: "simulado_professor", criadoEm: "2026-10-01" });
      const errada = q => q.alternativas.find(a => a.id !== q.gabarito).id;
      // 1ª vez: acerta 0 e 1; 2ª vez: acerta 1 e 2 (0 passa a errar, 2 passa a acertar, 3 erra nas duas)
      const faz = (id, data, certas) => {
        const respostas = {}; qs.forEach((q, i) => { respostas[q.id] = certas.includes(i) ? q.gabarito : errada(q); });
        db.resultadosSimulados.push({ id, usuarioId: u.id, simuladoId: "sim-t2", titulo: "Simulado das tentativas", nota: certas.length * 25, acertos: certas.length, total: 4, data, itens: ids.map(questaoId => ({ questaoId })), respostas, tempos: {} });
      };
      faz("res-a", "2026-10-02", [0, 1]);
      faz("res-b", "2026-10-09", [1, 2]);
      saveState();
      const s = db.simulados.find(x => x.id === "sim-t2");
      const card = renderSimuladoCard(s);
      abrirHistoricoDoSimulado("sim-t2");
      const modal = document.getElementById("modalRoot") ? document.getElementById("modalRoot").innerText : document.body.innerText;
      fecharModal();
      verDetalheResultadoSimulado("res-b");
      const resultado = document.getElementById("app") ? document.getElementById("app").innerHTML : document.body.innerHTML;
      const comp = compararTentativas(db.resultadosSimulados.find(x => x.id === "res-b"), db.resultadosSimulados.find(x => x.id === "res-a"));
      verDetalheResultadoSimulado("res-a");
      const primeira = document.body.innerHTML;
      return { card, modal, resultado, primeira, comp: { ganhou: comp.passouAAcertar.length, perdeu: comp.passouAErrar.length, duas: comp.acertouNasDuas.length, nenhuma: comp.erroNasDuas.length } };
    });
    assert.match(r.card, /abrirHistoricoDoSimulado\('sim-t2'\)/);
    assert.deepEqual(r.comp, { ganhou: 1, perdeu: 1, duas: 1, nenhuma: 1 });
    assert.match(r.modal, /primeira vez/);
    assert.match(r.modal, /passou a acertar\s*1/);
    assert.match(r.modal, /passou a errar\s*1/);
    assert.match(r.resultado, /sombra-anterior/);
    assert.match(r.resultado, /Passou a acertar ↑/);
    assert.match(r.resultado, /Passou a errar ↓/);
    assert.equal((r.resultado.match(/seta-mudanca/g) || []).length, 2, "só as duas questões que mudaram ganham seta");
    assert.doesNotMatch(r.primeira, /sombra-anterior/, "a primeira tentativa não tem com o que comparar");
  } finally { await contexto.close(); }
});
