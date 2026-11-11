/* ferramentas/lib-indice.mjs — o índice leve das questões (fase 2 de docs/PROJETO-CARGA-INICIAL.md).
   Cada questão se divide em FICHA (campos de filtro, contagem e montagem de sessão: sempre
   carregada, vem de dados/indice-questoes.js) e CORPO (texto pesado: continua nos arquivos de
   prova e só chega quando a questão é aberta). Os dois arquivos gerados — indice-questoes.js e
   indice-busca.js (primeiros caracteres do enunciado, para a busca global) — saem de
   `npm run publicar`; ninguém os edita à mão. */
import fs from "node:fs";
import path from "node:path";
import { RAIZ, carregar } from "./lib-dados.mjs";

/* O que é corpo. TUDO o mais é ficha: um campo novo na questão fica na ficha (seguro, só pesa um
   pouco) até alguém decidir movê-lo para cá. Mesma lista em codigo/02b-corpos-das-questoes.js. */
export const CAMPOS_DO_CORPO = ["enunciado", "alternativas", "explicacaoGeral", "explicacoesAlternativas", "referencias",
  "imagemUrl", "imagemLegenda", "respostaEsperada"];
export const ARQUIVOS_GERADOS = ["indice-questoes", "indice-busca"];
export const TAMANHO_DO_TRECHO_DE_BUSCA = 160;

const DEST_INDICE = path.join(RAIZ, "dados", "indice-questoes.js");
const DEST_BUSCA = path.join(RAIZ, "dados", "indice-busca.js");

/* A chave de comparação de enunciados da plataforma (chaveTextoQuestao, 11c): sem acento, pontuação nem
   espaço extra. A detecção de duplicatas usa os 160 primeiros caracteres dela. */
export function chaveTextoQuestao(texto){
  return String(texto || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}
/* O começo do enunciado para a busca e para a detecção de duplicatas sem baixar a prova: o menor trecho,
   cortado numa palavra, que cobre os 160 primeiros caracteres da chave (assim a assinatura do trecho é a
   mesma da do enunciado inteiro), com no mínimo TAMANHO_DO_TRECHO_DE_BUSCA caracteres do texto. */
export function trechoDeBusca(enunciado){
  const t = String(enunciado || "").replace(/\s+/g, " ").trim();
  let fim = Math.min(t.length, TAMANHO_DO_TRECHO_DE_BUSCA);
  while(fim < t.length){
    if(fim >= TAMANHO_DO_TRECHO_DE_BUSCA && chaveTextoQuestao(t.slice(0, fim)).length >= 160) break;
    const prox = t.indexOf(" ", fim + 1);
    fim = prox < 0 ? t.length : prox;
  }
  return t.slice(0, fim);
}

export function montarIndices(){
  const { arquivos } = carregar();
  const doCorpo = new Set(CAMPOS_DO_CORPO);
  const nomes = [], questoes = [];
  for(const a of arquivos) if(a.questoes){ nomes.push(a.nome); a.questoes.forEach(q => questoes.push([q, nomes.length - 1])); }
  const campos = [];
  for(const [q] of questoes) for(const k of Object.keys(q)) if(!doCorpo.has(k) && !campos.includes(k)) campos.push(k);
  const linhas = questoes.map(([q, a]) => {
    const l = campos.map(k => {
      if(!(k in q)) return null;                              // null = campo ausente nesta questão
      if(q[k] === null) throw new Error(`${q.id}: ${k} é null; o índice usa null para "ausente"`);
      return q[k];
    });
    l.push(a);
    return l;
  });
  const cab = `/* dados/indice-questoes.js — ÍNDICE LEVE das questões (a "ficha" de cada uma).
   GERADO por \`npm run publicar\` — NÃO edite à mão. O texto (enunciado, alternativas,
   explicações, referências, imagem) fica nos arquivos de prova e só chega quando preciso.
   Cada linha: os valores de \`campos\` na ordem (null = ausente) e, por último, o número do
   arquivo de origem em \`arquivos\`. */\n`;
  const indice = cab + "window.EscDados.registrarIndice(" + JSON.stringify({ campos, arquivos: nomes, linhas }) + ");\n";
  const busca = `/* dados/indice-busca.js — começo do enunciado de cada questão (cobre os 160 primeiros caracteres da chave de duplicata), na ordem de
   indice-questoes.js, para a busca global achar questão sem baixar as provas. GERADO por \`npm run publicar\`. */\n` +
    "window.EscDados.registrarIndiceBusca(" + JSON.stringify(questoes.map(([q]) => trechoDeBusca(q.enunciado))) + ");\n";
  return { indice, busca };
}

export function indicesEmDia(){
  const { indice, busca } = montarIndices();
  const le = f => fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null;
  return le(DEST_INDICE) === indice && le(DEST_BUSCA) === busca;
}
export function gravarIndices(){
  const { indice, busca } = montarIndices();
  const le = f => fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null;
  const mudou = le(DEST_INDICE) !== indice || le(DEST_BUSCA) !== busca;
  if(mudou){ fs.writeFileSync(DEST_INDICE, indice); fs.writeFileSync(DEST_BUSCA, busca); }
  return mudou;
}
