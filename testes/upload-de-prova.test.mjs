/* Upload de prova em arquivo na tela de Importar Questões: .docx (comprimido e
   guardado sem compressão), .txt, vários arquivos de uma vez, e o aviso quando
   o arquivo não serve (.doc antigo, documento fora do formato do script). */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import zlib from "node:zlib";
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
  await pagina.evaluate(() => { fazerLogin("professor@esc.demo", "prof123"); fecharModal(); navigate("importar-questoes"); });
  return { pagina, contexto };
}

/* Monta um .docx mínimo (um ZIP com word/document.xml) na mão: cada linha do
   texto vira um parágrafo do Word, como o Word faz. `comprimir` escolhe entre
   deflate (o normal) e guardado sem compressão. */
function montarDocx(linhas, comprimir = true){
  const esc = t => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const xml = '<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="x"><w:body>' +
    linhas.map(l => `<w:p><w:r><w:t xml:space="preserve">${esc(l)}</w:t></w:r></w:p>`).join("") + "</w:body></w:document>";
  const nome = Buffer.from("word/document.xml");
  const dados = Buffer.from(xml, "utf8");
  const conteudo = comprimir ? zlib.deflateRawSync(dados) : dados;
  const crc = zlib.crc32(dados);
  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(comprimir ? 8 : 0, 8);
  local.writeUInt32LE(crc, 14); local.writeUInt32LE(conteudo.length, 18); local.writeUInt32LE(dados.length, 22);
  local.writeUInt16LE(nome.length, 26);
  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50, 0); central.writeUInt16LE(20, 4); central.writeUInt16LE(20, 6);
  central.writeUInt16LE(comprimir ? 8 : 0, 10); central.writeUInt32LE(crc, 16);
  central.writeUInt32LE(conteudo.length, 20); central.writeUInt32LE(dados.length, 24); central.writeUInt16LE(nome.length, 28);
  const inicioCentral = local.length + nome.length + conteudo.length;
  const fim = Buffer.alloc(22);
  fim.writeUInt32LE(0x06054b50, 0); fim.writeUInt16LE(1, 8); fim.writeUInt16LE(1, 10);
  fim.writeUInt32LE(central.length + nome.length, 12); fim.writeUInt32LE(inicioCentral, 16);
  return Buffer.concat([local, nome, conteudo, central, nome, fim]);
}

const questao = (n, enunciado, gab = "A") => [
  `NUMERO: ${n}`, `PERGUNTA: ${enunciado}`, "A: Primeira", "B: Segunda", "C: Terceira", "D: Quarta",
  `GABARITO: ${gab}`, "EXPLICACAO: Texto da explicação.", "AREA: Clínica Médica", "ESPECIALIDADE: Cardiologia", "===",
];
const PROVA_A = ["INSTITUICAO: Prova de Teste Alfa", "ANO: 2031", "===",
  ...questao(1, "Pergunta alfa um sobre síndrome & coronariana <aguda> do upload?"), ...questao(2, "Pergunta alfa dois do upload em Word?", "B")];
const PROVA_B = ["INSTITUICAO: Prova de Teste Beta", "ANO: 2032", "===",
  ...questao(1, "Pergunta beta um do upload em texto puro?", "C")];

// o que a tela mostra depois de enviar os arquivos
const lerPrevia = (pagina) => pagina.evaluate(() => (state.filtroRota.previewImportacao || []).map(x => ({
  banca: x.banca, ano: x.ano, numero: x.numero, gabarito: x.campos.GABARITO, valido: x.valido,
  pergunta: x.campos.PERGUNTA,
})));

test("upload: .docx comprimido e .docx sem compressão chegam como questões, cada um com o seu cabeçalho", async () => {
  const { pagina, contexto } = await abrir();
  try {
    await pagina.setInputFiles("input[type=file][accept*='.docx']", [
      { name: "alfa.docx", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", buffer: montarDocx(PROVA_A, true) },
      { name: "beta.docx", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", buffer: montarDocx(PROVA_B, false) },
    ]);
    await pagina.waitForFunction(() => (state.filtroRota.previewImportacao || []).length === 3);
    const previa = await lerPrevia(pagina);
    assert.deepEqual(previa.map(p => [p.banca, p.ano, p.numero, p.gabarito, p.valido]), [
      ["Prova de Teste Alfa", 2031, 1, "A", true],
      ["Prova de Teste Alfa", 2031, 2, "B", true],
      ["Prova de Teste Beta", 2032, 1, "C", true],
    ]);
    // o XML do Word volta a ser texto: &amp; e &lt; viram & e <
    assert.match(previa[0].pergunta, /síndrome & coronariana <aguda> do upload/);
    // e a prévia vira questão de verdade ao confirmar
    const total = await pagina.evaluate(() => {
      const antes = db.questoes.length; confirmarImportacao();
      return { novas: db.questoes.length - antes, bancas: [...new Set(db.questoes.filter(q => /^Prova de Teste /.test(q.banca)).map(q => q.banca + " " + q.ano))].sort() };
    });
    assert.equal(total.novas, 3);
    assert.deepEqual(total.bancas, ["Prova de Teste Alfa 2031", "Prova de Teste Beta 2032"]);
  } finally { await contexto.close(); }
});

test("upload: .txt segue funcionando e acrescenta ao que já estava no campo", async () => {
  const { pagina, contexto } = await abrir();
  try {
    await pagina.fill("#textoImportacao", PROVA_A.join("\n"));
    await pagina.setInputFiles("input[type=file][accept*='.docx']", [
      { name: "beta.txt", mimeType: "text/plain", buffer: Buffer.from(PROVA_B.join("\r\n"), "utf8") },
    ]);
    await pagina.waitForFunction(() => (state.filtroRota.previewImportacao || []).length === 3);
    const previa = await lerPrevia(pagina);
    assert.deepEqual(previa.map(p => p.banca), ["Prova de Teste Alfa", "Prova de Teste Alfa", "Prova de Teste Beta"]);
  } finally { await contexto.close(); }
});

test("upload: .doc antigo e documento fora do formato recebem aviso que explica o caminho, sem lista de erros", async () => {
  const { pagina, contexto } = await abrir();
  try {
    await pagina.setInputFiles("input[type=file][accept*='.docx']", [
      { name: "velho.doc", mimeType: "application/msword", buffer: Buffer.from("qualquer coisa") },
    ]);
    await pagina.waitForSelector(".toast.err, .toast-err, [class*=toast]");
    const aviso = await pagina.evaluate(() => document.body.innerText);
    assert.match(aviso, /formato antigo \.doc/);
    assert.equal(await pagina.inputValue("#textoImportacao"), "");

    await pagina.setInputFiles("input[type=file][accept*='.docx']", [
      { name: "prova-original.docx", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        buffer: montarDocx(["Questão 1. Qual a conduta?", "(A) um", "(B) dois"]) },
    ]);
    await pagina.waitForSelector("#previewImportacao .card");
    const texto = await pagina.innerText("#previewImportacao");
    assert.match(texto, /não está no formato do script/);
    assert.match(texto, /PERGUNTA:/);
    assert.equal(await pagina.evaluate(() => (state.filtroRota.previewImportacao || []).length), 0);
  } finally { await contexto.close(); }
});

test("upload: o modelo para baixar é lido pela própria tela sem erro", async () => {
  const { pagina, contexto } = await abrir();
  try {
    const [download] = await Promise.all([pagina.waitForEvent("download"), pagina.evaluate(() => baixarModeloImportacao())]);
    assert.equal(download.suggestedFilename(), "modelo-prova-esc.txt");
    const fs = await import("node:fs");
    const modelo = fs.readFileSync(await download.path(), "utf8");
    const lidas = await pagina.evaluate((m) => parseImportText(m).map(x => [x.valido, x.campos.GABARITO]), modelo);
    // a primeira questão do modelo está completa; a segunda é só a instrução de repetir o bloco
    assert.deepEqual(lidas[0], [true, "A"]);
  } finally { await contexto.close(); }
});
