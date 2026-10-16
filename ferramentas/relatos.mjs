/* ==========================================================================
   RELATOS — chegar rápido às questões que os alunos relataram e deixar
   registrado o que foi feito, para uma pessoa conferir depois
   ==========================================================================
     npm run relatos -- relatos-2026-10-16.json              as questões relatadas, da mais citada para a menos
     npm run relatos -- relatos-2026-10-16.json q-adap25-038 os relatos dessa questão + a questão inteira
     npm run relatos -- registrar q-adap25-038 --relatos sin_x,com_y --acao "Explicação: escore nomeado e somado item a item"
                                                              grava a linha em docs/REGISTRO-DE-RELATOS.md
     npm run relatos -- pendentes                            o que ainda espera conferência humana
     npm run relatos -- conferir q-adap25-038 --por "Nome"   marca a linha como conferida

   O arquivo de relatos sai do próprio site (Questões para Atualizar › "Baixar
   os relatos"): sinalizações e dúvidas sem resposta oficial, SEM nome de
   aluno. Ele fica fora do repositório (a pasta relatos/ é ignorada pelo git):
   o texto escrito por aluno não vai para o GitHub. O que vai é o registro —
   quem relatou não aparece nele, só a questão, os ids e o que foi feito.
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { carregar, RAIZ } from "./lib-dados.mjs";

export const REGISTRO = path.join(RAIZ, "docs", "REGISTRO-DE-RELATOS.md");
const CABECALHO = `# Registro de relatos de questões

O que foi feito com cada questão relatada por alunos (sinalização ou dúvida): quem confere marca a coluna **Conferido**.
Escrito por \`npm run relatos -- registrar …\`; \`npm run relatos -- pendentes\` lista o que falta conferir.
O texto dos alunos não entra aqui (fica no arquivo de relatos, fora do repositório).

| Data | Questão | Relatos | O que foi feito | Campos alterados | Conferido |
|---|---|---|---|---|---|
`;

/* ---------- ler o arquivo de relatos ---------- */
export function lerRelatos(arquivo){
  const j = JSON.parse(fs.readFileSync(arquivo, "utf8"));
  if(j.formato !== "esc-relatos-questoes" || !Array.isArray(j.relatos)) throw new Error(`${arquivo} não é um arquivo de relatos do Esc (baixe de Questões para Atualizar › Baixar os relatos)`);
  return j;
}
export function agruparPorQuestao(relatos){
  const por = new Map();
  relatos.forEach(r => { if(!por.has(r.questaoId)) por.set(r.questaoId, []); por.get(r.questaoId).push(r); });
  return [...por.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
}

/* ---------- o registro ---------- */
export function linhasDoRegistro(){
  if(!fs.existsSync(REGISTRO)) return [];
  return fs.readFileSync(REGISTRO, "utf8").split("\n").filter(l => /^\| \d{4}-\d{2}-\d{2} \|/.test(l));
}
const celula = t => String(t || "").replace(/\|/g, "/").replace(/\s+/g, " ").trim();
export function linhaDoRegistro({ data, questaoId, relatos, acao, campos }){
  return `| ${data} | ${questaoId} | ${celula((relatos || []).join(", ")) || "—"} | ${celula(acao)} | ${celula((campos || []).join(", ")) || "—"} | ☐ a conferir |`;
}
function gravarLinha(linha){
  if(!fs.existsSync(REGISTRO)) fs.writeFileSync(REGISTRO, CABECALHO);
  const txt = fs.readFileSync(REGISTRO, "utf8").replace(/\s*$/, "\n");
  fs.writeFileSync(REGISTRO, txt + linha + "\n");
}

/* Quais campos da questão mudaram desde o último commit: compara, linha a
   linha, o bloco da questão no arquivo de dados/ de hoje e no do HEAD (os
   arquivos guardam um campo por linha — ver questaoComoTexto em lib-dados). */
export function blocoDaQuestao(texto, id){
  const linhas = texto.split("\n");
  const i = linhas.findIndex(l => l.includes(`id:"${id}"`));
  if(i < 0) return null;
  let ini = i; while(ini > 0 && !/^\s*\{\s*$/.test(linhas[ini])) ini--;
  let fim = i; while(fim < linhas.length - 1 && !/^\s*\},?\s*$/.test(linhas[fim])) fim++;
  return linhas.slice(ini, fim + 1);
}
const CAMPOS = ["enunciado", "alternativas", "gabarito", "explicacaoGeral", "explicacoesAlternativas", "referencias", "imagemUrl", "imagemPendente", "status", "motivoStatus", "assuntoId", "dificuldadeManual", "justificativaEm"];
export function camposAlterados(antes, depois){
  const por = bloco => { const m = {}; (bloco || []).forEach(l => { for(const c of CAMPOS){ if(new RegExp(`(^|\\s|,)${c}:`).test(l) && l.trim().startsWith(c + ":")) m[c] = l.trim(); } }); return m; };
  const a = por(antes), d = por(depois);
  return CAMPOS.filter(c => a[c] !== d[c]);
}
function camposDesdeOHead(questaoId, arquivoDados){
  const rel = path.relative(RAIZ, arquivoDados).split(path.sep).join("/");
  let antes = "";
  try{ antes = execFileSync("git", ["show", `HEAD:${rel}`], { cwd: RAIZ, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 * 1024 * 1024 }); }
  catch(e){ return null; }
  const depois = fs.readFileSync(arquivoDados, "utf8");
  const ba = blocoDaQuestao(antes, questaoId), bd = blocoDaQuestao(depois, questaoId);
  if(!ba || !bd) return null;
  return camposAlterados(ba, bd);
}
function arquivoDaQuestao(c, questaoId){
  const reg = c.arquivos.find(a => a.questoes && a.questoes.some(q => q.id === questaoId));
  return reg ? path.join(RAIZ, "dados", reg.nome + ".js") : null;
}

/* ---------- comandos ---------- */
function opcao(args, nome){ const i = args.indexOf("--" + nome); return i >= 0 ? args[i + 1] : undefined; }
function imprimirQuestao(q){
  console.log(`${q.id}  ${q.banca} ${q.ano}${q.numeroNaProva ? ` · nº ${q.numeroNaProva}` : ""} · ${q.status || "ativa"} · assunto ${q.assuntoId}`);
  console.log(q.enunciado);
  (q.alternativas || []).forEach(a => console.log(`  ${a.id}) ${a.texto}`));
  console.log(`gabarito: ${q.gabarito || "(anulada)"}\nexplicação: ${q.explicacaoGeral}`);
  if(q.referencias) console.log("referências: " + q.referencias);
}
function listar(arquivo, c){
  const j = lerRelatos(arquivo), grupos = agruparPorQuestao(j.relatos);
  const jaRegistradas = new Set(linhasDoRegistro().map(l => l.split("|")[2].trim()));
  console.log(`${j.relatos.length} relato(s) em ${grupos.length} questão(ões) — gerado em ${j.geradoEm}\n`);
  for(const [id, rs] of grupos){
    const q = c.D.questoes.find(x => x.id === id);
    const onde = q ? `${q.banca} ${q.ano}${q.numeroNaProva ? " nº " + q.numeroNaProva : ""}` : "(não está em dados/: questão enviada pela plataforma)";
    console.log(`${id}  ${onde}  [${rs.length} relato(s)]${jaRegistradas.has(id) ? "  ✓ já tem registro" : ""}`);
    rs.forEach(r => console.log(`   - ${r.tipo} ${r.id} (${r.data}): ${String(r.texto || "(sem texto)").replace(/\s+/g, " ").slice(0, 200)}`));
    if(q) console.log(`   ver tudo: npm run relatos -- ${path.basename(arquivo)} ${id}`);
  }
}
function registrar(args, c){
  const id = args[1], acao = opcao(args, "acao");
  if(!/^q-/.test(id || "") || !acao) throw new Error('uso: npm run relatos -- registrar <id da questão> --relatos id1,id2 --acao "o que foi feito"');
  const relatos = (opcao(args, "relatos") || "").split(",").map(x => x.trim()).filter(Boolean);
  const arq = arquivoDaQuestao(c, id);
  const campos = arq ? camposDesdeOHead(id, arq) : null;
  const linha = linhaDoRegistro({ data: new Date().toISOString().slice(0, 10), questaoId: id, relatos, acao, campos: campos || [] });
  gravarLinha(linha);
  console.log(linha + (campos === null ? "\n(não deu para comparar com o último commit; os campos alterados ficaram em branco)" : ""));
}
function pendentes(){
  const l = linhasDoRegistro().filter(x => x.includes("☐"));
  console.log(l.length ? `${l.length} linha(s) esperando conferência em docs/REGISTRO-DE-RELATOS.md:\n` + l.join("\n") : "Nada esperando conferência.");
}
function conferir(args){
  const id = args[1], por = opcao(args, "por");
  if(!/^q-/.test(id || "") || !por) throw new Error('uso: npm run relatos -- conferir <id da questão> --por "Nome"');
  const txt = fs.readFileSync(REGISTRO, "utf8"); let n = 0;
  const novo = txt.split("\n").map(l => { if(l.includes(`| ${id} |`) && l.includes("☐")){ n++; return l.replace("☐ a conferir", `✓ ${celula(por)} ${new Date().toISOString().slice(0, 10)}`); } return l; }).join("\n");
  if(!n) throw new Error(`nenhuma linha esperando conferência para ${id}`);
  fs.writeFileSync(REGISTRO, novo);
  console.log(`${n} linha(s) de ${id} conferida(s) por ${por}.`);
}

if(process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])){
  try{
    const args = process.argv.slice(2), cmd = args[0];
    if(cmd === "pendentes") pendentes();
    else if(cmd === "conferir") conferir(args);
    else if(cmd === "registrar") registrar(args, carregar());
    else if(cmd){
      const c = carregar();
      if(args[1]){
        const j = lerRelatos(cmd), rs = j.relatos.filter(r => r.questaoId === args[1]);
        const q = c.D.questoes.find(x => x.id === args[1]);
        console.log(`${rs.length} relato(s):`); rs.forEach(r => console.log(`- ${r.tipo} ${r.id} (${r.data}, ${r.papelAutor || "?"}): ${r.texto || "(sem texto)"}`));
        console.log(""); if(q) imprimirQuestao(q); else console.log("(a questão não está em dados/: foi enviada pela plataforma)");
      } else listar(cmd, c);
    } else console.log("uso: npm run relatos -- <arquivo.json> [id da questão] | registrar | pendentes | conferir (cabeçalho do arquivo ferramentas/relatos.mjs)");
  }catch(e){ console.error("Erro: " + e.message); process.exit(1); }
}
