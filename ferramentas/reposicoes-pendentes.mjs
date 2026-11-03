/* ferramentas/reposicoes-pendentes.mjs — quais questões anuladas ou desatualizadas ainda não têm reposição.

   A reposição é uma questão à parte com `reposicaoDe: "<id da original>"` (arquivos dados/reposicoes-*.js). Esta
   ferramenta lê dados/ do jeito que o navegador lê, cruza as duas pontas e lista o que falta, sem ninguém precisar
   refazer a conta a cada conversa.

   Uso:
     npm run reposicoes-pendentes                 contagem por área e lista curta (id, assunto, começo do enunciado)
     npm run reposicoes-pendentes -- cardio       só as pendentes cujo assunto/especialidade/enunciado casam com o texto
     npm run reposicoes-pendentes -- --todas      inclui também os bancos didáticos próprios (real:false)
     npm run reposicoes-pendentes -- --md         escreve docs/REPOSICOES-PENDENTES.md (lista completa, gerada)

   O que já foi tentado e o estado das fontes (o que abre e o que está bloqueado na rede da sessão) fica à mão em
   docs/REPOSICOES-NOTAS.md: este arquivo só calcula. */
import fs from "node:fs";
import path from "node:path";
import { RAIZ, carregar } from "./lib-dados.mjs";

const { D } = carregar();
const todas = D.questoes;
const feitas = new Set(todas.filter(q => q.reposicaoDe).map(q => q.reposicaoDe));
const args = process.argv.slice(2);
/* Por padrão só as provas reais: os bancos didáticos próprios (real:false) também têm questões "desatualizadas", mas
   isso se resolve editando o próprio banco, não com uma reposição. `--todas` inclui tudo. */
const todasAsOrigens = args.includes("--todas");
const pendentes = todas.filter(q => (q.status === "anulada" || q.status === "desatualizada") && !feitas.has(q.id)
  && (todasAsOrigens || q.real === true));

const md = args.includes("--md");
const filtro = args.filter(a => !a.startsWith("--")).join(" ").toLowerCase();
const lista = filtro
  ? pendentes.filter(q => [q.assuntoId, q.especialidadeId, q.areaId, q.enunciado].join(" ").toLowerCase().includes(filtro))
  : pendentes;

const porArea = {};
for(const q of pendentes) porArea[q.areaId || "sem-area"] = (porArea[q.areaId || "sem-area"] || 0) + 1;
const resumo = `${pendentes.length} anuladas/desatualizadas sem reposição; ${feitas.size} já têm reposição.\n` +
  Object.entries(porArea).sort((a, b) => b[1] - a[1]).map(([a, n]) => `  ${a}: ${n}`).join("\n");

const linha = q => `${q.id}  ${q.status}  ${q.assuntoId}  | ${String(q.enunciado).replace(/\s+/g, " ").slice(0, 90)}`;

if(md){
  const grupos = {};
  for(const q of pendentes) (grupos[q.areaId || "sem-area"] ||= []).push(q);
  let t = "# Reposições pendentes\n\nGerado por `npm run reposicoes-pendentes -- --md`; não editar à mão. O que já foi tentado e o estado das fontes está em `docs/REPOSICOES-NOTAS.md`.\n\n```\n" + resumo + "\n```\n";
  for(const [area, qs] of Object.entries(grupos)) t += `\n## ${area} (${qs.length})\n\n` + qs.map(q => `- \`${q.id}\` (${q.status}, ${q.assuntoId}): ${String(q.enunciado).replace(/\s+/g, " ").slice(0, 110)}`).join("\n") + "\n";
  fs.writeFileSync(path.join(RAIZ, "docs", "REPOSICOES-PENDENTES.md"), t);
  console.log(resumo + "\n\ndocs/REPOSICOES-PENDENTES.md escrito.");
} else {
  console.log(resumo + (filtro ? `\n\nFiltro "${filtro}": ${lista.length}\n` : "\n"));
  for(const q of lista.slice(0, 60)) console.log(linha(q));
  if(lista.length > 60) console.log(`... e mais ${lista.length - 60}`);
}
