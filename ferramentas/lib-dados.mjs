/* ==========================================================================
   LIB-DADOS — o que as ferramentas da pasta dados/ têm em comum
   ==========================================================================
   Lê o conteúdo do jeito que o navegador lê (pela lista de dados/manifesto.js),
   sabe de qual arquivo veio cada questão, escreve uma questão no formato
   padrão dos arquivos e mantém a lista do manifesto. Quem usa:
   publicar.mjs, dados.mjs, nova-prova.mjs e adicionar-questoes.mjs.
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { RAIZ } from "./mapa-do-codigo.mjs";
import { carregarConteudo } from "../testes/conferir-dados.mjs";

export { RAIZ };
export const MANIFESTO = path.join(RAIZ, "dados", "manifesto.js");

/* A segunda linha de cada arquivo de dados/ é o título dele ("   UNESP (FMB)
   2023 — Residência Médica, R1 Acesso Direto"): é o que o catálogo mostra. */
export function tituloDoArquivo(nome){
  const arq = path.join(RAIZ, "dados", nome + ".js");
  if(!fs.existsSync(arq)) return "";
  return (fs.readFileSync(arq, "utf8").split("\n")[1] || "").replace(/^\s+/, "").trim();
}

/* O conteúdo carregado + um registro por arquivo: { nome, tipo, itens, titulo,
   questoes } (questoes só nos arquivos de questões, na ordem do arquivo). */
export function carregar(){
  const { dados: D, faltando } = carregarConteudo();
  const arquivos = [];
  let desde = 0;
  for(const a of D.arquivos){
    const reg = { nome: a.nome, tipo: a.tipo, itens: a.itens, titulo: tituloDoArquivo(a.nome) };
    if(a.tipo === "questões"){ reg.questoes = D.questoes.slice(desde, desde + a.itens); desde += a.itens; }
    arquivos.push(reg);
  }
  return { D, faltando, arquivos };
}

/* ---------- a lista do manifesto ---------- */
export function lerManifesto(){
  const txt = fs.readFileSync(MANIFESTO, "utf8");
  const m = /ESC_ARQUIVOS\.dados\s*=\s*\[([^\]]*)\]/.exec(txt);
  if(!m) throw new Error("dados/manifesto.js sem a lista window.ESC_ARQUIVOS.dados");
  return [...m[1].matchAll(/"([^"]+)"/g)].map(x => x[1]);
}

/* Põe o arquivo novo logo depois da última "prova-" da lista (as provas
   ficam juntas; cartões e simulados continuam depois delas). */
export function registrarNoManifesto(nome){
  const lista = lerManifesto();
  if(lista.includes(nome)) return false;
  let pos = -1;
  lista.forEach((n, i) => { if(n.startsWith("prova-")) pos = i; });
  if(pos < 0) pos = Math.max(lista.indexOf("banco-didatico"), lista.indexOf("calendario"), 0);
  lista.splice(pos + 1, 0, nome);
  const txt = fs.readFileSync(MANIFESTO, "utf8")
    .replace(/(ESC_ARQUIVOS\.dados\s*=\s*)\[[^\]]*\]/, "$1[\n" + lista.map(n => `  "${n}",`).join("\n") + "\n]");
  fs.writeFileSync(MANIFESTO, txt);
  return true;
}

/* ---------- escrever uma questão no formato dos arquivos ---------- */
const js = v => JSON.stringify(v);

/* Ordem e quebra de linha iguais às das provas que já existem, para o diff do
   git mostrar só o que é novo. Campo que a questão não tem não é escrito. */
export function questaoComoTexto(q){
  const L = [], pares = (...campos) => campos.filter(c => q[c] !== undefined).map(c => `${c}:${js(q[c])}`).join(", ");
  L.push("{");
  L.push("  " + pares("id", "banca", "real", "tipoProva", "ano", "numeroNaProva") + ",");
  L.push("  " + pares("areaId", "especialidadeId", "assuntoId") + ",");
  if(q.imagemUrl !== undefined || q.imagemPendente !== undefined || q.imagemLegenda !== undefined)
    L.push("  " + pares("imagemUrl", "imagemPendente", "imagemLegenda") + ",");
  L.push("  enunciado:" + js(q.enunciado) + ",");
  L.push("  alternativas:[" + q.alternativas.map(a => `{id:${js(a.id)},texto:${js(a.texto)}}`).join(",") + "],");
  L.push("  gabarito:" + js(q.gabarito) + ",");
  L.push("  explicacaoGeral:" + js(q.explicacaoGeral) + ",");
  L.push("  explicacoesAlternativas:" + js(q.explicacoesAlternativas || {}) + ",");
  if(q.referencias !== undefined) L.push("  referencias:" + js(q.referencias) + ",");
  L.push("  " + pares("dificuldadeManual", "status", "motivoStatus") + ",");
  L.push("  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},");
  L.push("  " + pares("criadoPor", "criadoEm"));
  L.push("}");
  return L.join("\n");
}

/* Acrescenta questões (já em texto) ao fim da lista de um arquivo de prova,
   antes do "]);" final, cuidando da vírgula. */
export function acrescentarAoArquivo(nome, textos){
  const arq = path.join(RAIZ, "dados", nome + ".js");
  const src = fs.readFileSync(arq, "utf8");
  const fim = src.lastIndexOf("]);");
  if(fim < 0) throw new Error(`${nome}.js não termina em "]);"`);
  let antes = src.slice(0, fim).replace(/\s+$/, "");
  if(/[}\]]$/.test(antes) && !/\[$/.test(antes)) antes += ",";
  fs.writeFileSync(arq, antes + "\n" + textos.join(",\n") + "\n" + src.slice(fim));
}

/* A ficha de uma prova: o que todas as questões dela repetem. Fica numa linha
   do cabeçalho do arquivo (@ficha {...}); em arquivo antigo, sem a linha, vem
   da primeira questão. */
export function lerFicha(nome){
  const arq = path.join(RAIZ, "dados", nome + ".js");
  if(!fs.existsSync(arq)) throw new Error(`dados/${nome}.js não existe — crie com: npm run nova-prova -- …`);
  const src = fs.readFileSync(arq, "utf8");
  const m = /@ficha (\{.*\})/.exec(src);
  if(m) return JSON.parse(m[1]);
  const { arquivos } = carregar();
  const reg = arquivos.find(a => a.nome === nome);
  const q = reg && reg.questoes && reg.questoes[0];
  if(!q) throw new Error(`${nome}.js não tem a linha "@ficha" nem questão para copiar a ficha`);
  return {
    banca: q.banca, ano: q.ano, tipoProva: q.tipoProva,
    prefixo: q.id.replace(/-\d+$/, ""), alternativas: q.alternativas.length,
  };
}
