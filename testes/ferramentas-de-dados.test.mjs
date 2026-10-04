/* As ferramentas que cuidam da pasta dados/ (nova-prova, adicionar-questoes,
   dados, publicar): trabalham numa CÓPIA mínima do projeto (ESC_RAIZ), nunca na
   pasta de verdade. O que se garante: prova nova entra só por dados/ (arquivo +
   manifesto), o lote é tudo-ou-nada, e a versão/catálogo estão em dia. */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { RAIZ } from "../ferramentas/mapa-do-codigo.mjs";

const EXPLICACAO = "A alternativa C está correta. Dicas do enunciado: **dor torácica há 2 horas** com **supradesnivelamento de ST** em parede inferior (normal: ST isoelétrico): infarto com supra, que pede reperfusão imediata (ICP em até 90 minutos do primeiro contato). A está errada porque o anti-inflamatório não trata a causa. B está errada porque a observação atrasa a reperfusão. D está errada porque a alta hospitalar expõe o paciente ao risco de morte.";
const questao = (n, extra = {}) => ({
  n, assunto: "ass-sca", enunciado: `Enunciado da questão ${n}?`,
  alt: ["Anti-inflamatório.", "Observação.", "Cateterismo urgente.", "Alta."], gabarito: "C",
  explicacao: EXPLICACAO, referencias: "Diretriz X, 2025.", ...extra,
});

/* uma cópia mínima: a moldura, a taxonomia, o calendário e um manifesto só com eles */
function copiaMinima(){
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "esc-dados-"));
  fs.mkdirSync(path.join(dir, "dados"));
  fs.copyFileSync(path.join(RAIZ, "index.html"), path.join(dir, "index.html"));
  for(const f of ["taxonomia.js", "calendario.js"]) fs.copyFileSync(path.join(RAIZ, "dados", f), path.join(dir, "dados", f));
  fs.writeFileSync(path.join(dir, "dados", "manifesto.js"), 'window.ESC_ARQUIVOS.dados = [\n  "taxonomia",\n  "calendario",\n  "flashcards-x",\n];\n');
  fs.writeFileSync(path.join(dir, "dados", "flashcards-x.js"), 'window.EscDados.registrarFlashcards("flashcards-x", []);\n');
  return dir;
}
const rodar = (dir, ferramenta, ...args) =>
  spawnSync("node", [path.join(RAIZ, "ferramentas", ferramenta + ".mjs"), ...args], { env: { ...process.env, ESC_RAIZ: dir }, encoding: "utf8" });
const gravarLote = (dir, lista, nome = "lote.json") => { const f = path.join(dir, nome); fs.writeFileSync(f, JSON.stringify(lista)); return f; };

test("prova nova: o arquivo nasce e entra no manifesto depois da última prova, sem tocar no index.html", () => {
  const dir = copiaMinima();
  try{
    const indexAntes = fs.readFileSync(path.join(dir, "index.html"), "utf8");
    const r = rodar(dir, "nova-prova", "zz-2099", "Banca ZZ", "2099", "--total", "2");
    assert.equal(r.status, 0, r.stderr);
    const manifesto = fs.readFileSync(path.join(dir, "dados", "manifesto.js"), "utf8");
    assert.match(manifesto, /"calendario",\s+"prova-zz-2099",\s+"flashcards-x"/, "a prova entra antes dos cartões");
    assert.match(fs.readFileSync(path.join(dir, "dados", "prova-zz-2099.js"), "utf8"), /@ficha \{"banca":"Banca ZZ","ano":2099,"prefixo":"q-zz2099"/);
    assert.equal(fs.readFileSync(path.join(dir, "index.html"), "utf8"), indexAntes);
    assert.notEqual(rodar(dir, "nova-prova", "zz-2099", "Banca ZZ", "2099").status, 0, "não sobrescreve prova existente");
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test("lote de questões: completa o que se repete, grava no formato padrão e o conteúdo carrega", () => {
  const dir = copiaMinima();
  try{
    assert.equal(rodar(dir, "nova-prova", "zz-2099", "Banca ZZ", "2099", "--total", "3").status, 0);
    let r = rodar(dir, "adicionar-questoes", "zz-2099", gravarLote(dir, [questao(2), questao(1, { status: "anulada", gabarito: "", motivo: "Anulada pela banca." })]));
    assert.equal(r.status, 0, r.stdout + r.stderr);
    assert.match(r.stdout, /Gravadas 2 questões \(1, 2\)/);
    assert.match(r.stdout, /Ainda faltam: 3/);
    r = rodar(dir, "adicionar-questoes", "zz-2099", gravarLote(dir, [questao(3, { figura: "png" })]));
    assert.equal(r.status, 1, "figura declarada que não existe no disco é erro do conferidor");
    assert.match(r.stderr, /imagem/);
    r = rodar(dir, "adicionar-questoes", "zz-2099", gravarLote(dir, [questao(3, { imagemPendente: "ECG de admissão" })]));
    assert.equal(r.status, 0, r.stdout + r.stderr);
    const resumo = rodar(dir, "dados", "zz-2099").stdout;
    assert.match(resumo, /3 questões, números 1–3 \(sem buracos\)/);
    assert.match(resumo, /anuladas: 1/);
    assert.match(resumo, /esperando figura: 3/);
    const q = rodar(dir, "dados", "q-zz2099-002").stdout;
    assert.match(q, /areaId|assuntoId=ass-sca/);
    assert.match(q, /banca=Banca ZZ {2}ano=2099 {2}numeroNaProva=2/);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test("lote é tudo ou nada: um problema e nenhuma questão entra (o arquivo fica igual)", () => {
  const dir = copiaMinima();
  try{
    rodar(dir, "nova-prova", "zz-2099", "Banca ZZ", "2099");
    const arq = path.join(dir, "dados", "prova-zz-2099.js"), antes = fs.readFileSync(arq, "utf8");
    const ruins = {
      "assunto que não existe": questao(1, { assunto: "ass-inventado" }),
      "gabarito fora das alternativas": questao(1, { gabarito: "E" }),
      "explicação fora do padrão": questao(1, { explicacao: "Porque sim." }),
      "campo desconhecido": questao(1, { respostaa: "C" }),
      "alternativas a menos": questao(1, { alt: ["só", "duas"] }),
    };
    for(const [nome, ruim] of Object.entries(ruins)){
      const r = rodar(dir, "adicionar-questoes", "zz-2099", gravarLote(dir, [questao(2), ruim]));
      assert.equal(r.status, 1, nome + " deveria falhar");
      assert.match(r.stderr, /questão 1/, nome + ": o problema aponta o número da questão");
      assert.equal(fs.readFileSync(arq, "utf8"), antes, nome + ": nada foi gravado");
    }
    assert.equal(rodar(dir, "adicionar-questoes", "zz-2099", gravarLote(dir, [questao(1)]), "--simular").status, 0);
    assert.equal(fs.readFileSync(arq, "utf8"), antes, "--simular não grava");
    assert.equal(rodar(dir, "adicionar-questoes", "zz-2099", gravarLote(dir, [questao(1)])).status, 0);
    const repetido = rodar(dir, "adicionar-questoes", "zz-2099", gravarLote(dir, [questao(1)]));
    assert.equal(repetido.status, 1);
    assert.match(repetido.stderr, /já existe/);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test("a consulta: taxonomia com palavra e busca de enunciado respondem sem abrir arquivo", () => {
  const taxo = execFileSync("node", [path.join(RAIZ, "ferramentas", "dados.mjs"), "taxonomia", "coronariana"], { encoding: "utf8" });
  assert.match(taxo, /ass-sca\s+Síndrome Coronariana Aguda/);
  const busca = execFileSync("node", [path.join(RAIZ, "ferramentas", "dados.mjs"), "buscar", "cetoacidose"], { encoding: "utf8" });
  assert.match(busca, /questões com "cetoacidose"/);
});

test("a versão do index.html e o catálogo estão em dia com o código e os dados (rode: npm run publicar)", () => {
  const r = spawnSync("node", [path.join(RAIZ, "ferramentas", "publicar.mjs"), "--conferir"], { encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr);
});

test("a versão separa código de dados: formato AAAA-MM-DD.cHASH.dHASH", () => {
  const v = /window\.ESC_VERSAO\s*=\s*"([^"]+)"/.exec(fs.readFileSync(path.join(RAIZ, "index.html"), "utf8"))[1];
  assert.match(v, /^\d{4}-\d{2}-\d{2}\.c[0-9a-f]{8}\.d[0-9a-f]{8}$/);
});
