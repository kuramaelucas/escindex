/* Ajustes: barra de espaço e teclas 1/2/3 para confirmar a resposta, minimizar
   a janela do cartão em montagem, renomear simulado, contagem de alunos antes
   do mínimo e a ferramenta de relatos (ferramentas/relatos.mjs). */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";
import { agruparPorQuestao, linhaDoRegistro, camposAlterados, blocoDaQuestao } from "../ferramentas/relatos.mjs";

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

test("prática: espaço repete a última confiança, 1/2/3 escolhem; sem confiança o espaço só avisa", async () => {
  const { pagina, contexto } = await abrir();
  try {
    await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const ids = db.questoes.filter(q => !q.tipo && q.status === "ativa" && !aguardaImagem(q)).slice(0, 3).map(q => ({ questaoId: q.id, motivo: "t" }));
      iniciarSessaoComLista(ids, "pratica"); navigate("sessao");
    });
    const marcar = () => pagina.evaluate(() => selecionarAlternativa("A"));
    await marcar();
    await pagina.keyboard.press(" ");
    assert.equal(await pagina.evaluate(() => respostasFeitas(state.sessaoAtual).length), 0, "sem confiança declarada, o espaço não registra nada");
    await pagina.keyboard.press("2");
    assert.equal(await pagina.evaluate(() => state.sessaoAtual.respostasSessao[0].confianca), "duvida");
    await pagina.evaluate(() => { irParaIndiceDaSessao(1); });
    await marcar();
    await pagina.keyboard.press(" ");
    assert.equal(await pagina.evaluate(() => state.sessaoAtual.respostasSessao[1].confianca), "duvida", "o espaço repete a última confiança");
  } finally { await contexto.close(); }
});

test("minimizar a janela do cartão guarda o texto e deixa uma aba para voltar", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const q = db.questoes.find(x => !x.tipo && x.status === "ativa");
      abrirFormularioFlashcard(null, { questaoId: q.id });
      const campo = document.querySelector("#modalOverlayAtivo textarea"); campo.value = "rascunho do cartão";
      minimizarModal("Cartão em montagem");
      const escondida = document.getElementById("modalOverlayAtivo").style.display === "none";
      const aba = !!document.getElementById("modalMinimizado");
      restaurarModalMinimizado();
      return { escondida, aba, voltou: document.getElementById("modalOverlayAtivo").style.display !== "none", texto: document.querySelector("#modalOverlayAtivo textarea").value, abaSumiu: !document.getElementById("modalMinimizado") };
    });
    assert.deepEqual(r, { escondida: true, aba: true, voltou: true, texto: "rascunho do cartão", abaSumiu: true });
  } finally { await contexto.close(); }
});

test("equipe renomeia o simulado e as notas continuam ligadas pelo id; a tela conta os alunos antes do mínimo", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal(); usuarioAtual().papel = "professor";
      db.simulados.push({ id: "sim-ren", titulo: "Antigo", questoes: [], duracaoMin: 10, tipo: "simulado_professor" });
      const antes = frasePoucosAlunosNoSimulado("sim-ren");
      abrirRenomearSimulado("sim-ren");
      document.getElementById("renomearSimuladoNome").value = "Novo nome";
      salvarNomeDoSimulado("sim-ren");
      return { antes, titulo: db.simulados.find(s => s.id === "sim-ren").titulo, vazio: htmlDesempenhoDosAlunos("sim-ren") };
    });
    assert.match(r.antes, /nenhum aluno/i);
    assert.equal(r.titulo, "Novo nome");
    assert.match(r.vazio, /Ainda nenhum aluno fez/);
  } finally { await contexto.close(); }
});

test("relatos: agrupa por questão, registra sem texto de aluno e acha os campos que mudaram", () => {
  const g = agruparPorQuestao([{ questaoId: "q-b", id: "1" }, { questaoId: "q-a", id: "2" }, { questaoId: "q-a", id: "3" }]);
  assert.deepEqual(g.map(([id, rs]) => [id, rs.length]), [["q-a", 2], ["q-b", 1]]);
  const linha = linhaDoRegistro({ data: "2026-10-16", questaoId: "q-a", relatos: ["2", "3"], acao: "corrigi | o gabarito", campos: ["gabarito"] });
  assert.match(linha, /^\| 2026-10-16 \| q-a \| 2, 3 \| corrigi \/ o gabarito \| gabarito \| ☐ a conferir \|$/);
  const arq = id => `[\n{\n  id:"${id}", banca:"x",\n  enunciado:"e",\n  gabarito:"A",\n  explicacaoGeral:"velha",\n},\n{\n  id:"q-z",\n  gabarito:"B",\n},\n]`;
  const a = blocoDaQuestao(arq("q-a"), "q-a"), d = blocoDaQuestao(arq("q-a").replace("velha", "nova"), "q-a");
  assert.deepEqual(camposAlterados(a, d), ["explicacaoGeral"]);
  assert.equal(blocoDaQuestao(arq("q-a"), "q-z").length, 4, "o bloco para na chave da própria questão");
});
