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
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { carregar } from "./lib-dados.mjs";

const raiz = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const tema = process.argv[2];
if(!tema){ console.log("uso: npm run resumo -- <tema>   (pastas em resumos/)"); process.exit(1); }

const contexto = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(raiz, "resumos", tema, "resumo.js"), "utf8"), contexto);
const r = contexto.window.EscResumos.lista[0];
const { D } = await carregar();
const porId = new Map(D.questoes.map(q => [q.id, q]));

const cobertas = new Map(), erros = [];
for(const d of r.doencas) for(const f of d.fragmentos){
  for(const id of f.questoes){
    if(!porId.has(id)) erros.push(`${d.id}/${f.id}: questão ${id} não existe`);
    if(!cobertas.has(id)) cobertas.set(id, []);
    cobertas.get(id).push(f.id);
  }
  // Caso ilustrado sem figura não ilustra nada: a tela o pularia em silêncio.
  for(const id of f.casos || []){
    if(!porId.has(id)) erros.push(`${d.id}/${f.id}: caso ilustrado ${id} não existe`);
    else if(!porId.get(id).imagemUrl) erros.push(`${d.id}/${f.id}: caso ilustrado ${id} não tem figura`);
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
if(semFragmento.length){
  console.log("\nSem fragmento (escreva um ou ponha em foraDoEscopo com o motivo):");
  semFragmento.forEach(q => console.log(`  ${q.id}  ${String(q.enunciado || "").replace(/\s+/g, " ").slice(0, 90)}`));
}
if(erros.length){ console.log("\nERROS:"); erros.forEach(e => console.log("  " + e)); process.exit(1); }
