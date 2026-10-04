/* ==========================================================================
   TESTAR MUDANÇA — roda só os testes que a mudança pode ter quebrado
   ==========================================================================
     npm run testar-mudanca            olha o que mudou (git) e escolhe
     npm run testar-mudanca -- --ver   só mostra a escolha, não roda

   Conteúdo (dados/) e plataforma (codigo/, index.html, sw.js) são
   independentes por desenho — então o teste também é:
     - só documentos: confere o conteúdo e a higiene;
     - conteúdo e ferramentas, sem tocar na plataforma: conteúdo, higiene,
       ferramentas e uma passada pelas telas (fumaça) — segundos em vez de ~3 min;
     - qualquer outra coisa (código, moldura, nuvem, o que não conheço): a
       suíte inteira. Na dúvida, roda tudo.
   O CI sempre roda a suíte inteira; isto é para o dia a dia.
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { RAIZ } from "./mapa-do-codigo.mjs";

const git = (...a) => { try{ return execFileSync("git", a, { cwd: RAIZ, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }); }catch(e){ return ""; } };
/* O ponto de comparação é o último envio da própria branch (o que ainda não
   subiu), não a main: a cópia local da main costuma estar velha. */
const base = () => git("rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}").trim() || null;

export function arquivosMudados(){
  const lista = new Set(), b = base();
  const juntar = txt => txt.split("\n").forEach(f => f && lista.add(f));
  if(b) juntar(git("diff", "--name-only", `${b}...HEAD`));
  juntar(git("diff", "--name-only", "HEAD"));
  juntar(git("ls-files", "--others", "--exclude-standard"));
  return [...lista];
}

/* O index.html muda a cada publicação (a linha da versão): se for só ela, não é
   mudança de plataforma. */
function indexSoMudouAVersao(){
  const b = base();
  const diff = (b ? git("diff", "-U0", `${b}...HEAD`, "--", "index.html") : "") + git("diff", "-U0", "HEAD", "--", "index.html");
  const linhas = diff.split("\n").filter(l => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
  return linhas.every(l => /ESC_VERSAO/.test(l));
}

const DOCUMENTO = f => /\.md$/.test(f) || f.startsWith("docs/");
const CONTEUDO = f => f.startsWith("dados/") && !DOCUMENTO(f);
const FERRAMENTA = f => f.startsWith("ferramentas/") || /^testes\/(conferir-dados\.mjs|ferramentas[^/]*\.test\.mjs|conteudo\.test\.mjs|higiene\.test\.mjs)$/.test(f);

/* Qual conjunto de testes uma lista de arquivos mudados pede. */
export function escolher(mudados, { versaoSozinha = false } = {}){
  const sobra = mudados.filter(f => !DOCUMENTO(f) && !CONTEUDO(f) && !FERRAMENTA(f) && !(f === "index.html" && versaoSozinha) && f !== "package.json");
  if(!mudados.length) return { nome: "nada mudou", arquivos: [] };
  if(sobra.length) return { nome: `a plataforma mudou (${sobra.slice(0, 3).join(", ")}${sobra.length > 3 ? "…" : ""})`, arquivos: null };
  const base = ["testes/conteudo.test.mjs", "testes/higiene.test.mjs"];
  if(mudados.every(DOCUMENTO)) return { nome: "só documentos", arquivos: base };
  return { nome: "só conteúdo e ferramentas", arquivos: [...base, "testes/ferramentas.test.mjs", "testes/ferramentas-de-dados.test.mjs", "testes/fumaca.test.mjs"] };
}

if(process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])){
  const mudados = arquivosMudados(), esc = escolher(mudados, { versaoSozinha: mudados.includes("index.html") && indexSoMudouAVersao() });
  console.log(`Mudou ${mudados.length} arquivo(s) → ${esc.nome}: ${esc.arquivos ? (esc.arquivos.length ? esc.arquivos.join(" ") : "nada a rodar") : "suíte inteira"}`);
  if(process.argv.includes("--ver") || (esc.arquivos && !esc.arquivos.length)) process.exit(0);
  const todos = fs.readdirSync(path.join(RAIZ, "testes")).filter(f => f.endsWith(".test.mjs")).map(f => "testes/" + f);
  const r = spawnSync("node", ["--test", "--test-concurrency=1", ...(esc.arquivos || todos)], { cwd: RAIZ, stdio: "inherit" });
  if(r.status) process.exit(r.status);
  if(esc.arquivos) process.exit(spawnSync("node", ["testes/conferir-dados.mjs"], { cwd: RAIZ, stdio: "inherit" }).status || 0);
}
