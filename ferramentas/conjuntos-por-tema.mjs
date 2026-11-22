/* ==========================================================================
   CONJUNTOS POR TEMA — as 20 questões planejadas de cada tema (com resumo ou não)
   ==========================================================================
     npm run conjuntos-por-tema                 visão geral (um tema por linha)
     npm run conjuntos-por-tema -- sepse        um tema: cada questão e o fragmento que cobre
     npm run conjuntos-por-tema -- ass-xxx      assunto sem resumo: as questões escolhidas pelo texto
     npm run conjuntos-por-tema -- --gravar     escreve resumos/conjuntos-por-tema.js

   Regra (cobertura de fragmentos, depois dificuldade e ano): ferramentas/lib-conjuntos.mjs.
   Rode --gravar depois de resumo novo ou lote de questões novas; o `npm run conferir`
   avisa quando o arquivo ficou para trás.
   ========================================================================== */
import fs from "node:fs";
import { carregar } from "./lib-dados.mjs";
import { carregarResumo } from "./lib-resumos.mjs";
import { montarTodos, montarConjunto, textoDoArquivo, ARQUIVO_CONJUNTOS, TAMANHO_DO_CONJUNTO } from "./lib-conjuntos.mjs";

const { D } = await carregar();
const args = process.argv.slice(2), tema = args.find(a => !a.startsWith("--"));
const porId = new Map(D.questoes.map(q => [q.id, q]));

if(tema && !fs.existsSync(new URL(`../resumos/${tema}/resumo.js`, import.meta.url))){
  const c = montarTodos(D.questoes)[tema];
  if(!c){ console.log(`${tema}: não é pasta de resumo nem assunto sem resumo com questões (npm run dados -- taxonomia <palavra>)`); process.exit(1); }
  console.log(`${tema} (sem resumo, provisório): ${c.ids.length} questões · níveis ${JSON.stringify(c.niveis)}`);
  c.ids.forEach((id, i) => { const q = porId.get(id); console.log(`  ${String(i + 1).padStart(2)}. ${id.padEnd(24)} ${String(q.ano).padEnd(5)} ${(q.dificuldadeManual || "").padEnd(13)} ${String(q.enunciado).slice(0, 70)}`); });
  process.exit(0);
}
if(tema){
  const r = carregarResumo(tema), c = montarConjunto(r, porId);
  const fragDe = new Map();
  for(const d of r.doencas) for(const f of d.fragmentos) for(const id of f.questoes){ if(!fragDe.has(id)) fragDe.set(id, []); fragDe.get(id).push(`${d.id}/${f.id}`); }
  console.log(`${r.titulo}: ${c.ids.length} questões, ${c.cobertos} de ${c.fragmentos} fragmentos cobertos · níveis ${JSON.stringify(c.niveis)}`);
  c.ids.forEach((id, i) => { const q = porId.get(id); console.log(`  ${String(i + 1).padStart(2)}. ${id.padEnd(24)} ${String(q.ano).padEnd(5)} ${(q.dificuldadeManual || "").padEnd(13)} ${fragDe.get(id).join(", ")}`); });
  if(c.semQuestao.length) console.log(`  fragmentos sem questão que sirva: ${c.semQuestao.join(", ")}`);
  process.exit(0);
}

const todos = montarTodos(D.questoes);
const lista = Object.entries(todos).filter(([, c]) => !c.semResumo), sem = Object.entries(todos).filter(([, c]) => c.semResumo);
const curtos = lista.filter(([, c]) => c.ids.length < TAMANHO_DO_CONJUNTO);
const incompletos = lista.filter(([, c]) => c.cobertos < c.fragmentos - c.semQuestao.length);
console.log(`${lista.length} temas com resumo · ${lista.reduce((s, [, c]) => s + c.ids.length, 0)} questões nos conjuntos`);
console.log(`  com menos de ${TAMANHO_DO_CONJUNTO} questões: ${curtos.length}${curtos.length ? " (" + curtos.map(([t, c]) => `${t} ${c.ids.length}`).join(", ") + ")" : ""}`);
console.log(`  com fragmento sem questão no conjunto (mais fragmentos que ${TAMANHO_DO_CONJUNTO}): ${incompletos.length}${incompletos.length ? " (" + incompletos.map(([t, c]) => `${t} ${c.cobertos}/${c.fragmentos}`).join(", ") + ")" : ""}`);
const semCurtos = sem.filter(([, c]) => c.ids.length < TAMANHO_DO_CONJUNTO);
console.log(`${sem.length} assuntos sem resumo (conjunto provisório, diversidade pelo texto) · ${sem.reduce((s, [, c]) => s + c.ids.length, 0)} questões · ${semCurtos.length} com menos de ${TAMANHO_DO_CONJUNTO}`);
if(args.includes("--gravar")){ fs.writeFileSync(ARQUIVO_CONJUNTOS, textoDoArquivo(todos)); console.log("resumos/conjuntos-por-tema.js escrito."); }
