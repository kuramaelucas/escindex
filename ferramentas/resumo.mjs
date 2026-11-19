/* ==========================================================================
   RESUMO — conferir um resumo adaptativo de resumos/<tema>/resumo.js
   ==========================================================================
     npm run resumo -- exantematicas

   Mostra, para o assunto do resumo, quais questões cada fragmento cobre e quais
   ficaram sem fragmento (nem em foraDoEscopo). Falha se um fragmento citar uma
   questão que não existe: sem a questão não há como medir o erro do aluno, e o
   destaque daquele trecho ficaria mudo sem ninguém perceber.
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { carregar } from "./lib-dados.mjs";
import { carregarResumo, errosDeDiretrizes } from "./lib-resumos.mjs";

const raiz = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const tema = process.argv[2];
if(!tema){ console.log("uso: npm run resumo -- <tema>   (pastas em resumos/)"); process.exit(1); }

const r = carregarResumo(tema);
const { D } = await carregar();
const porId = new Map(D.questoes.map(q => [q.id, q]));

// diretriz citada por seção tem de ser uma fonte com id: é por ela que a edição nova acha a seção
const cobertas = new Map(), erros = errosDeDiretrizes(r);
for(const d of r.doencas) for(const f of d.fragmentos){
  for(const id of f.questoes){
    if(!porId.has(id)) erros.push(`${d.id}/${f.id}: questão ${id} não existe`);
    if(!cobertas.has(id)) cobertas.set(id, []);
    cobertas.get(id).push(f.id);
  }
  // Ilustração própria cujo arquivo não existe: a tela mostraria uma imagem quebrada.
  for(const fig of f.figuras || [])
    if(!fs.existsSync(path.join(raiz, "resumos", tema, fig.arquivo || ""))) erros.push(`${d.id}/${f.id}: figura ${fig.arquivo} não existe`);
    // foto (não SVG autoral) sem crédito e página de origem descumpre a licença
    else if(!/\.svg$/.test(fig.arquivo) && !(fig.credito && fig.fonte)) erros.push(`${d.id}/${f.id}: foto ${fig.arquivo} sem credito/fonte`);
  // Caso ilustrado sem figura não ilustra nada: a tela o pularia em silêncio.
  for(const id of f.casos || []){
    if(!porId.has(id)) erros.push(`${d.id}/${f.id}: caso ilustrado ${id} não existe`);
    else if(!porId.get(id).imagemUrl) erros.push(`${d.id}/${f.id}: caso ilustrado ${id} não tem figura`);
    // anulada/desatualizada não tem gabarito a mostrar depois da tentativa
    else if((porId.get(id).status || "ativa") !== "ativa") erros.push(`${d.id}/${f.id}: caso ilustrado ${id} está ${porId.get(id).status}`);
  }
  // Frase marcada no texto corrido ligada a questão inexistente: o sublinhado nunca acenderia.
  for(const m of `${d.introducao || ""}\n${f.prosa || ""}`.matchAll(/\[\[[^\]|]+\|([^\]]+)\]\]/g)) for(const id of m[1].split(","))
    if(!porId.has(id.trim())) erros.push(`${d.id}/${f.id}: frase marcada cita ${id.trim()}, que não existe`);
  // Tópico ligado a questão que o trecho não lista: o erro dele não somaria no trecho.
  for(const m of f.texto.matchAll(/\{([^}]+)\}\s*$/gm)) for(const id of m[1].split(",").map(x => x.trim()))
    if(!f.questoes.includes(id)) erros.push(`${d.id}/${f.id}: tópico cita ${id}, que não está em questoes do trecho`);
}
const fora = new Set((r.foraDoEscopo || []).flatMap(x => x.questoes));
const doAssunto = D.questoes.filter(q => q.assuntoId === r.assunto && (q.status || "ativa") !== "rascunho");
const semFragmento = doAssunto.filter(q => !cobertas.has(q.id) && !fora.has(q.id));

console.log(`${r.titulo} (${r.assunto})`);
console.log(`  ${doAssunto.length} questões no assunto · ${[...cobertas.keys()].filter(id => porId.get(id)?.assuntoId === r.assunto).length} cobertas · ${fora.size} fora do escopo · ${semFragmento.length} sem fragmento`);
for(const d of r.doencas){
  const ids = new Set(d.fragmentos.flatMap(f => f.questoes));
  console.log(`  ${d.titulo.padEnd(52)} ${String(d.fragmentos.length).padStart(2)} fragmento(s), ${ids.size} questões`);
}
const aConferir = r.doencas.flatMap(d => d.fragmentos).filter(f => f.conferir).length;
if(aConferir) console.log(`  ${aConferir} fragmento(s) com fonte ainda a conferir (conferir: true)`);
const porDiretriz = (r.fontes || []).map(fo => [fo, r.doencas.flatMap(d => d.fragmentos).filter(f => (f.diretrizes || []).includes(fo.id))]);
if(porDiretriz.some(([, l]) => l.length)){
  console.log("\nSeções por diretriz (reescrever estas quando sair edição nova):");
  for(const [fo, l] of porDiretriz) console.log(`  ${(fo.id || "?").padEnd(20)} ${l.length ? l.map(f => f.id).join(", ") : "(nenhuma seção)"}  · lido em ${fo.lidoEm || "—"}`);
}
if(semFragmento.length){
  console.log("\nSem fragmento (escreva um ou ponha em foraDoEscopo com o motivo):");
  semFragmento.forEach(q => console.log(`  ${q.id}  ${String(q.enunciado || "").replace(/\s+/g, " ").slice(0, 90)}`));
}
// Avisos de didática (resumos/LEIA-ME.md, condições 16 a 21): não reprovam um resumo antigo,
// mas um resumo novo sai sem nenhum (`--exigir` transforma os avisos em erro).
const avisos = [];
for(const d of r.doencas) for(const f of d.fragmentos){
  const onde = `${d.id}/${f.id}`, topicos = (f.texto || "").split("\n").filter(l => l.trim().startsWith("-"));
  // explicada = tem prosa, ou a introdução do capítulo traz uma frase [[…]] ligada às questões dela
  const explicada = f.prosa || [...(d.introducao || "").matchAll(/\[\[[^\]|]+\|([^\]]+)\]\]/g)].some(m => m[1].split(",").some(id => f.questoes.includes(id.trim())));
  if(!explicada && d.id !== "armadilhas" && d.id !== "comparativo") avisos.push(`${onde}: seção sem explicação (sem prosa e sem frase da introdução ligada a ela)`);
  if(f.questoes.length > 30) avisos.push(`${onde}: ${f.questoes.length} questões numa seção só (divida por conceito)`);
  const semLig = /mnemonicos/.test(f.id) || !f.questoes.length ? 0 : topicos.filter(l => !/\{[^}]+\}\s*$/.test(l)).length;
  if(semLig) avisos.push(`${onde}: ${semLig} tópico(s) sem questão ligada`);
  if(d.id !== "armadilhas" && topicos.some(l => /gabarito|questão aceita|as provas variam/i.test(l))) avisos.push(`${onde}: tópico que ensina o gabarito — leve para o capítulo "armadilhas"`);
  if(tema !== "calendario-vacinal" && /para decorar|mnem[oô]nic/i.test(`${f.prosa || ""}${f.texto || ""}`)) avisos.push(`${onde}: mnemônico (só o calendário vacinal usa)`);
}
if(!/Veja também/.test(r.doencas[0]?.introducao || "")) avisos.push("primeiro capítulo sem \"Veja também\" (resumos vizinhos)");
if(avisos.length){ console.log(`\nAVISOS DE DIDÁTICA (${avisos.length}):`); avisos.forEach(a => console.log("  " + a)); }
if(process.argv.includes("--exigir")) erros.push(...avisos);
if(erros.length){ console.log("\nERROS:"); erros.forEach(e => console.log("  " + e)); process.exit(1); }
