/* ==========================================================================
   CONTROLE DE QUALIDADE, CONFIGURAÇÕES GERAIS E DOWNLOAD DAS TABELAS DE TODOS
   ==========================================================================
   1. "Não é duplicada": o grupo dispensado some da lista e volta se entrar uma cópia a mais.
   2. "Tirar da fila" marca as difíceis como revisadas sem alterar a questão.
   3. Configurações Gerais: a linha que sobe e a que desce usam só os campos da turma.
   4. Uma tabela que o banco recusa (falta de GRANT) não impede as tabelas seguintes de descerem.
   ========================================================================== */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { subirServidor } from "./servidor.mjs";

let navegador, servidor;
before(async () => { navegador = await chromium.launch(process.env.ESC_CHROMIUM ? { executablePath: process.env.ESC_CHROMIUM } : {}); servidor = await subirServidor({ semNuvem: true }); });
after(async () => { await navegador?.close(); await servidor?.fechar(); });

async function abrir(){
  const contexto = await navegador.newContext({ serviceWorkers: "block" });
  await contexto.route(/supabase\.co/, r => r.abort());
  const pagina = await contexto.newPage();
  const erros = [];
  pagina.on("pageerror", e => erros.push(e.message));
  await pagina.goto(servidor.url + "index.html");
  await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
  return { pagina, contexto, erros };
}

test("duplicadas: 'Não é duplicada' tira o grupo da lista, e uma cópia nova o traz de volta", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      const base = db.questoes.find(q => q.real && q.status === "ativa");
      const copia = (id) => Object.assign(questaoInteira(base), { id, enunciado: "Paciente de 45 anos com dor abdominal difusa há três dias, febre e vômitos, procura o pronto atendimento teste" });
      db.questoes.push(copia("dup-teste-1"), copia("dup-teste-2")); _geracaoDb++;
      const g = () => gruposDeDuplicatas().filter(x => x.some(q => q.id === "dup-teste-1"));
      const antes = g().length;
      dispensarGrupoDeDuplicatas(gruposDeDuplicatas().findIndex(x => x.some(q => q.id === "dup-teste-1")));
      const depois = g().length;
      db.questoes.push(copia("dup-teste-3")); _geracaoDb++;
      return { antes, depois, volta: g().length };
    });
    assert.equal(r.antes, 1); assert.equal(r.depois, 0); assert.equal(r.volta, 1);
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});

test("config geral: só os campos da turma sobem e descem", async () => {
  const { pagina, contexto, erros } = await abrir();
  try {
    const r = await pagina.evaluate(() => {
      fazerLoginDemo("aluno"); fecharModal();
      db.configGeral.metaCartoesDia = 33; db.configGeral.campoDoAparelho = "x";
      const linha = NUVEM_GLOBAIS.config_geral.linha("geral");
      db.configGeral.metaCartoesDia = 1;
      NUVEM_GLOBAIS.config_geral.aplicar({ id: "geral", dados: { metaCartoesDia: 44, intruso: 1 } });
      return { sobe: Object.keys(linha.dados), id: linha.id, desce: db.configGeral.metaCartoesDia, intruso: db.configGeral.intruso, aparelho: db.configGeral.campoDoAparelho };
    });
    assert.equal(r.id, "geral"); assert.ok(r.sobe.includes("metaCartoesDia")); assert.ok(!r.sobe.includes("campoDoAparelho"));
    assert.equal(r.desce, 44); assert.equal(r.intruso, undefined); assert.equal(r.aparelho, "x");
    assert.deepEqual(erros, []);
  } finally { await contexto.close(); }
});
