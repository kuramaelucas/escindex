/* ferramentas/vigencia.mjs — quais explicações ficaram velhas quando uma diretriz mudou.

   O que cada questão registra: `referencias` (diretriz, edição e ano) e `justificativaEm` (AAAA-MM em que a
   explicação foi escrita; sem o campo vale o mês de `criadoEm`). Isto cruza os dois.

   Uso:
     node ferramentas/vigencia.mjs --termo KDIGO                  as questões que citam KDIGO, com o ano de cada citação
     node ferramentas/vigencia.mjs --termo KDIGO --ate 2023       só as que citam KDIGO com ano até 2023 (a edição de 2024 é a nova)
     node ferramentas/vigencia.mjs --ate 2020                     qualquer diretriz citada com ano até 2020
     node ferramentas/vigencia.mjs --antes 2026-01                escritas antes de jan/2026
     node ferramentas/vigencia.mjs --banco banco-simulado-epm-2   restringe a um arquivo de dados/ (padrão: o banco todo)
     node ferramentas/vigencia.mjs --so-autorais                  deixa de fora as provas reais transcritas (a explicação delas também é autoral, mas a regra é a da época)

   Serve para decidir o que revisar, não para dizer que está errado: uma citação de 2019 pode ser a edição
   vigente. Cada linha traz o que foi citado para a pessoa julgar. */
import { pathToFileURL } from "node:url";
import { carregar } from "./lib-dados.mjs";

const ANO = /(?<![\d/,.])(19[89]\d|20[0-4]\d)(?![\d])/g;

export const mesDaJustificativa = (q) => q.justificativaEm || String(q.criadoEm || "").slice(0, 7) || "";

/* os anos citados em `referencias`; sem referências, os da própria explicação */
export function anosCitados(q){
  const fonte = String(q.referencias || "").trim() || String(q.explicacaoGeral || "");
  return [...new Set([...fonte.matchAll(ANO)].map(m => Number(m[1])))].sort((a, b) => a - b);
}

export function filtrar(questoes, { termo, ate, antes } = {}){
  const t = termo ? termo.toLowerCase() : "";
  return questoes.flatMap(q => {
    const refs = String(q.referencias || ""), texto = refs + " " + String(q.explicacaoGeral || "");
    if(t && !texto.toLowerCase().includes(t)) return [];
    const anos = anosCitados(q);
    // com --termo, só vale o ano que aparece junto do termo (a referência é uma frase com vários itens)
    const doTermo = t ? anosPertoDoTermo(refs || texto, t) : anos;
    const anosVale = t && doTermo.length ? doTermo : anos;
    if(ate !== undefined && !(anosVale.length && Math.max(...anosVale) <= ate)) return [];
    if(antes && !(mesDaJustificativa(q) && mesDaJustificativa(q) < antes)) return [];
    return [{ id: q.id, mes: mesDaJustificativa(q), anos: anosVale, referencias: refs.replace(/\s+/g, " ").trim().slice(0, 140) }];
  });
}
function anosPertoDoTermo(texto, termo){
  const baixo = texto.toLowerCase(), anos = new Set();
  let i = baixo.indexOf(termo);
  while(i >= 0){
    for(const m of texto.slice(i, i + termo.length + 80).matchAll(ANO)) anos.add(Number(m[1]));
    i = baixo.indexOf(termo, i + 1);
  }
  return [...anos].sort((a, b) => a - b);
}

function principal(){
  const args = process.argv.slice(2), valor = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };
  const opc = { termo: valor("--termo"), ate: valor("--ate") !== undefined ? Number(valor("--ate")) : undefined, antes: valor("--antes") };
  if(!opc.termo && opc.ate === undefined && !opc.antes){ console.error("uso: node ferramentas/vigencia.mjs [--termo KDIGO] [--ate 2023] [--antes 2026-01] [--banco arquivo] [--so-autorais]"); process.exit(1); }
  const { arquivos } = carregar(), banco = valor("--banco");
  let questoes = arquivos.filter(a => a.questoes && (!banco || a.nome === banco)).flatMap(a => a.questoes);
  if(banco && !questoes.length){ console.error(`${banco} não é um arquivo de questões de dados/`); process.exit(1); }
  if(args.includes("--so-autorais")) questoes = questoes.filter(q => q.real === false);
  const achadas = filtrar(questoes, opc);
  console.log(`${achadas.length} de ${questoes.length} questões` + (opc.termo ? ` citam "${opc.termo}"` : "") + (opc.ate !== undefined ? ` com ano ≤ ${opc.ate}` : "") + (opc.antes ? ` escritas antes de ${opc.antes}` : ""));
  achadas.forEach(a => console.log(`  ${a.id}  [${a.mes || "sem data"}]  anos ${a.anos.join(", ") || "—"}  ${a.referencias}`));
}
if(process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) principal();
