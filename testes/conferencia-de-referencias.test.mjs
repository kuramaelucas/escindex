/* testes/conferencia-de-referencias.test.mjs — as ferramentas de conferência de referências (anotar, listar, baixar).
   Sem navegador e sem rede: só texto. Protege o que mais importa em `dados/`: a nota entra na questão certa, nos dois
   formatos de arquivo, com aspas escapadas, e uma troca ambígua é recusada em vez de gravar errado. */
import test from "node:test";
import assert from "node:assert/strict";
import { aplicarNota, paraString } from "../ferramentas/anotar-conferencia.mjs";
import { agrupar } from "../ferramentas/referencias-a-conferir.mjs";
import { urlDoArquivo } from "../ferramentas/texto-oficial.mjs";

const FORMATO_JS = `  id:"q-a-001", banca:"X",\n   referencias:"Fonte A (não conferida).",\n   dificuldadeManual:"fundamental",\n  id:"q-a-002", banca:"X",\n   referencias:"Fonte B.",\n`;
const FORMATO_JSON = `  "id": "q-b-001",\n  "referencias": "Fonte A (não conferida).",\n  "status": "ativa",\n  "id": "q-b-002",\n  "referencias": "Fonte B.",\n`;

test("a nota entra no fim de referencias da questão certa, nos dois formatos", () => {
  for(const base of [FORMATO_JS, FORMATO_JSON]){
    const id = base.includes("q-a-") ? "q-a-002" : "q-b-002";
    const novo = aplicarNota(base, id, "Lido em 29/10/2026.", "");
    assert.ok(novo.includes('"Fonte B. Lido em 29/10/2026."'));
    assert.ok(novo.includes("Fonte A (não conferida)."), "a outra questão não pode mudar");
  }
});

test("aspas e barras da nota são escapadas para caber na string do arquivo", () => {
  assert.equal(paraString('ele disse "x" \\ y'), 'ele disse \\"x\\" \\\\ y');
  const novo = aplicarNota(FORMATO_JS, "q-a-001", 'diz "sim"', "");
  assert.ok(novo.includes('diz \\"sim\\"'));
});

test("--troca substitui um trecho único e recusa trecho ausente ou repetido", () => {
  const novo = aplicarNota(FORMATO_JS, "q-a-001", "conferida em 29/10/2026", "não conferida");
  assert.ok(novo.includes("Fonte A (conferida em 29/10/2026)."));
  assert.throws(() => aplicarNota(FORMATO_JS, "q-a-001", "x", "não existe"), /aparece 0 vez/);
  const dobro = FORMATO_JS.replace("Fonte A (não conferida).", "ab ab");
  assert.throws(() => aplicarNota(dobro, "q-a-001", "x", "ab"), /aparece 2 vez/);
});

test("id inexistente dá erro claro", () => {
  assert.throws(() => aplicarNota(FORMATO_JS, "q-zzz", "x", ""), /não encontrado/);
});

test("o agrupamento separa diretrizes de livros-texto", () => {
  const g = agrupar([
    { q: { id: "q1", referencias: "NCCN Guidelines Colon Cancer (versão 2025)" }, banco: "b" },
    { q: { id: "q2", referencias: "Gordis L. Epidemiology, 6ª ed." }, banco: "b" },
    { q: { id: "q3", referencias: "Obra sem diretriz conhecida" }, banco: "b" },
  ]);
  const nomes = g.map(([n]) => n);
  assert.ok(nomes.some((n) => n.startsWith("NCCN")));
  assert.ok(nomes.some((n) => n.startsWith("Epidemiologia")));
  assert.ok(nomes.some((n) => n.startsWith("Livros-texto")));
});

test("o endereço .pdf do gov.br vira o do arquivo; outros ficam como estão", () => {
  assert.equal(urlDoArquivo("https://www.gov.br/conitec/pt-br/midias/protocolos/x.pdf"), "https://www.gov.br/conitec/pt-br/midias/protocolos/x.pdf/@@display-file/file");
  assert.equal(urlDoArquivo("https://www.gov.br/a/b.pdf/@@display-file/file"), "https://www.gov.br/a/b.pdf/@@display-file/file");
  assert.equal(urlDoArquivo("https://kdigo.org/x.pdf"), "https://kdigo.org/x.pdf");
});

/* ---------- a regra que vale para tudo que for criado depois do corte ---------- */
import { problemasDeReferencia, alertasDeEdicao, prepararTermo, edicoesVigentes, CORTE_DA_CONFERENCIA } from "../ferramentas/lib-referencias.mjs";

const NOVA = { criadoEm: CORTE_DA_CONFERENCIA };

test("questão criada depois do corte sem referências, ou sem data de conferência, é recusada", () => {
  assert.equal(problemasDeReferencia({ ...NOVA, referencias: "" }).length, 1);
  const semData = problemasDeReferencia({ ...NOVA, referencias: "KDIGO 2024 CKD guideline. Nível de confirmação: memória." });
  assert.ok(semData.some(t => /data de conferência/.test(t)));
});

test("referência lida e datada, com a edição vigente, passa", () => {
  const ok = problemasDeReferencia({ ...NOVA, referencias: "Surviving Sepsis Campaign 2026 (Intensive Care Med 2026), texto lido em 02/11/2026 em idsociety.org." });
  assert.deepEqual(ok, []);
});

test("dizer com data que o texto não abriu vale como registro honesto", () => {
  const ok = problemasDeReferencia({ ...NOVA, referencias: "Diretriz X 2025; texto oficial não aberto (domínio bloqueado) em 05/12/2026." });
  assert.deepEqual(ok, []);
});

test("citar uma diretriz da tabela sem a edição vigente é recusado, e mencioná-la libera", () => {
  const velha = problemasDeReferencia({ ...NOVA, referencias: "GOLD 2022, conferido em 02/11/2026." });
  assert.ok(velha.some(t => /GOLD, DPOC/.test(t) && /vigente/.test(t)));
  const liberada = problemasDeReferencia({ ...NOVA, referencias: "GOLD 2022 (usada de propósito); a edição GOLD 2026 foi lida e não muda esta conduta, conferido em 02/11/2026." });
  assert.deepEqual(liberada, []);
});

test("questão anterior ao corte não falha (entra na fila)", () => {
  assert.deepEqual(problemasDeReferencia({ criadoEm: "2026-10-30", referencias: "" }), []);
});

test("a sigla só casa como palavra inteira, também junto de acento", () => {
  const tab = edicoesVigentes();
  const gina = tab.find(e => e.id === "gina");
  assert.ok(!gina.re.test("veja a página do site"), '"página" não é GINA');
  assert.ok(!gina.re.test("câncer de vagina"));
  assert.ok(gina.re.test("GINA 2019"));
  assert.equal(alertasDeEdicao("GINA 2019").length, 1);
  assert.equal(alertasDeEdicao("GINA 2026").length, 0);
  assert.equal(prepararTermo("\\bGINA\\b"), "(?<![\\p{L}])GINA(?![\\p{L}])");
});

test("pneumonia do adulto é distinta da pediátrica na tabela", () => {
  assert.equal(alertasDeEdicao("Bradley JS et al. Management of Community-Acquired Pneumonia in Infants and Children (PIDS/IDSA), 2011").length, 0);
  assert.equal(alertasDeEdicao("Metlay JP et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia, 2019").length, 1);
});

test("toda entrada da tabela de edições tem termo válido, ano e fonte", () => {
  for(const e of edicoesVigentes()){
    assert.ok(e.id && e.nome && Number.isInteger(e.vigente) && e.edicao && e.verificadoEm, `entrada incompleta: ${e.id}`);
  }
  assert.equal(new Set(edicoesVigentes().map(e => e.id)).size, edicoesVigentes().length, "id repetido");
});
