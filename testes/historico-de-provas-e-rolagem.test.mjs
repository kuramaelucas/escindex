/* Provas e Simulados: aba Histórico (filtros, ordenação), rolagem de 15 em 15 e administrador contando como aluno na turma. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(); servidor = await subirServidor(); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  await pagina.goto(servidor.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto };
}

test("aba Histórico: filtra simulado × prova, ordena por nota e data e carrega de 15 em 15", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno");
      const u = usuarioAtual();
      db.resultadosSimulados = db.resultadosSimulados.filter(x => x.usuarioId !== u.id);
      for(let i = 0; i < 40; i++){
        const dia = String(1 + (i % 28)).padStart(2, "0");
        db.resultadosSimulados.push({ id: "h" + i, usuarioId: u.id, simuladoId: i % 2 ? "sim-x" : null, titulo: (i % 2 ? "Simulado " : "Prova ") + i, nota: i, acertos: i, total: 100, data: "2026-03-" + dia });
      }
      navigate("simulados"); mudarAbaProvas("historico");
      const linhas = () => document.querySelectorAll("#provasConteudo tbody tr").length;
      const inicial = linhas();
      mudarFiltroHistoricoNotas("simulados");
      const soSim = [...document.querySelectorAll("#provasConteudo tbody tr")].every(tr => /Simulado/.test(tr.children[1].textContent));
      mudarFiltroHistoricoNotas("todos");
      ordenarHistoricoNotas("nota");
      const maior = document.querySelector("#provasConteudo tbody tr .badge").textContent;
      ordenarHistoricoNotas("nota");
      const menor = document.querySelector("#provasConteudo tbody tr .badge").textContent;
      return { inicial, soSim, maior, menor, temSentinela: !!document.querySelector(".rolagem-sentinela") };
    });
    assert.equal(r.inicial, 15);
    assert.ok(r.soSim);
    assert.equal(r.maior, "39%");
    assert.equal(r.menor, "0%");
    assert.ok(r.temSentinela);
    // descer a página acrescenta mais 15, sem clicar em nada
    await pagina.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await pagina.waitForFunction(() => document.querySelectorAll("#provasConteudo tbody tr").length > 15);
    const depois = await pagina.evaluate(() => new Promise(res => setTimeout(() => res(document.querySelectorAll("#provasConteudo tbody tr").length), 300)));
    assert.ok(depois >= 30, "deveria ter carregado mais 15 ao descer: " + depois);
  } finally { await contexto.close(); }
});

test("o administrador conta como aluno nas notas da turma", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno");
      const adm = db.usuarios.find(x => x.papel === "admin");
      const prof = db.usuarios.find(x => x.papel === "professor");
      db.resultadosSimulados = [];
      db.resultadosSimulados.push({ id: "a1", usuarioId: adm.id, simuladoId: "s1", titulo: "S", nota: 80, data: "2026-03-01" });
      if(prof) db.resultadosSimulados.push({ id: "p1", usuarioId: prof.id, simuladoId: "s1", titulo: "S", nota: 90, data: "2026-03-01" });
      return { contaAdm: contaComoAluno(adm), contaProf: prof ? contaComoAluno(prof) : false, notas: notasAnonimasDoSimulado("s1").notas };
    });
    assert.ok(r.contaAdm);
    assert.ok(!r.contaProf);
    assert.deepEqual(r.notas, [80]);
  } finally { await contexto.close(); }
});
