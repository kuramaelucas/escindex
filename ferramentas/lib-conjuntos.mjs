/* ferramentas/lib-conjuntos.mjs — monta o CONJUNTO PLANEJADO de questões de cada tema com resumo
   (docs/PROJETO-INTEGRACAO-RESUMOS.md, seção 4). É o mesmo conjunto da pós-leitura (construção do
   zero) e da trilha por tema (reparar falhas): por isso é gerado aqui, congelado em
   resumos/conjuntos-por-tema.js e igual para todos os alunos.

   Por que cobertura e não sorteio: 20 questões sorteadas de um tema tendem a repetir o trecho que
   mais cai (três questões de "quando puncionar" e nenhuma de recorrência). Cada fragmento do resumo
   já lista as questões que cobrem aquele conceito, então "nuances diferentes" = fragmentos
   diferentes. A ordem da lista importa: quem tem meta curta faz só as primeiras N, e elas já são
   as que cobrem os fragmentos de maior peso. */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { carregarResumo, temasDeResumo } from "./lib-resumos.mjs";

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
export const ARQUIVO_CONJUNTOS = path.join(RAIZ, "resumos", "conjuntos-por-tema.js");
export const TAMANHO_DO_CONJUNTO = 20;
const DECAIMENTO = 0.85;   // o mesmo de prioridade-formados: prova nova pesa mais
// mistura-alvo de dificuldade (fundamental · intermediário · avançado); "basico" conta como fundamental
const MISTURA = { fundamental: 0.3, intermediario: 0.5, avancado: 0.2 };
const nivel = q => (q.dificuldadeManual === "basico" ? "fundamental" : q.dificuldadeManual) || "intermediario";

// Questão que pode ir para o aluno: ativa (anulada/desatualizada fica fora; a reposição é ativa e
// entra), com figura, de múltipla escolha (dissertativa fica fora de lista e simulado).
export function questaoServe(q){
  return !!q && (q.status || "ativa") === "ativa" && !q.imagemPendente && q.tipo !== "dissertativa";
}

/* { ids: [...], fragmentos: n, cobertos: n, semQuestao: [ids de fragmento] } para um resumo. */
export function montarConjunto(r, porId, tamanho = TAMANHO_DO_CONJUNTO){
  const anoMax = Math.max(0, ...[...porId.values()].map(q => +q.ano || 0));
  const peso = q => Math.pow(DECAIMENTO, Math.max(0, anoMax - (+q.ano || anoMax)));
  const frags = [];
  for(const d of r.doencas) for(const f of d.fragmentos){
    const qs = [...new Set(f.questoes)].map(id => porId.get(id)).filter(questaoServe);
    frags.push({ id: `${d.id}/${f.id}`, qs, peso: qs.reduce((s, q) => s + peso(q), 0) });
  }
  const fragsDa = new Map();   // questão → fragmentos que ela cobre (pode cobrir mais de um)
  for(const f of frags) for(const q of f.qs){ if(!fragsDa.has(q.id)) fragsDa.set(q.id, []); fragsDa.get(q.id).push(f); }
  const escolhidas = [], usadas = new Set(), contaNivel = { fundamental: 0, intermediario: 0, avancado: 0 };
  const falta = n => MISTURA[n] * (escolhidas.length + 1) - contaNivel[n];   // > 0: o nível está abaixo da mistura
  // Rodadas: na 1ª cada fragmento recebe no máximo uma questão; só na 2ª um fragmento repete.
  while(escolhidas.length < tamanho){
    const cobertos = new Set();
    let pegouNaRodada = false;
    const abertos = () => frags.filter(f => !cobertos.has(f.id) && f.qs.some(q => !usadas.has(q.id)));
    for(let a = abertos(); a.length && escolhidas.length < tamanho; a = abertos()){
      a.sort((x, y) => y.peso - x.peso || x.id.localeCompare(y.id));
      const alvo = a[0];
      // dentro do fragmento: a que cobre mais fragmentos ainda abertos, depois o nível que falta, depois a mais recente
      const nota = q => fragsDa.get(q.id).filter(f => !cobertos.has(f.id)).reduce((s, f) => s + f.peso, 0);
      const cand = alvo.qs.filter(q => !usadas.has(q.id))
        .sort((x, y) => nota(y) - nota(x) || falta(nivel(y)) - falta(nivel(x)) || (+y.ano || 0) - (+x.ano || 0) || x.id.localeCompare(y.id));
      const q = cand[0];
      escolhidas.push(q); usadas.add(q.id); contaNivel[nivel(q)]++; pegouNaRodada = true;
      for(const f of fragsDa.get(q.id)) cobertos.add(f.id);
    }
    if(!pegouNaRodada) break;   // tema com menos questões que o tamanho: usa todas
  }
  return {
    ids: escolhidas.map(q => q.id),
    fragmentos: frags.length,
    cobertos: new Set(escolhidas.flatMap(q => fragsDa.get(q.id).map(f => f.id))).size,
    semQuestao: frags.filter(f => !f.qs.length).map(f => f.id),
    niveis: contaNivel,
  };
}

/* { tema: {titulo, assunto, assuntos, ids, ...} } para todos os resumos. `assuntos` = assuntos das
   questões do conjunto (um resumo pode cobrir assuntos vizinhos agrupados): é por eles que a
   trilha de Formados acha o tema de um assunto. */
export function montarTodos(questoes){
  const porId = new Map(questoes.map(q => [q.id, q]));
  const saida = {};
  for(const tema of temasDeResumo()){
    const r = carregarResumo(tema), c = montarConjunto(r, porId);
    const assuntos = [...new Set([r.assunto, ...c.ids.map(id => porId.get(id).assuntoId)])];
    saida[tema] = { titulo: r.titulo, assunto: r.assunto, assuntos, ...c };
  }
  return saida;
}

export function textoDoArquivo(todos){
  const linhas = Object.entries(todos).map(([tema, c]) =>
    `  ${JSON.stringify(tema)}: { assunto: ${JSON.stringify(c.assunto)}, assuntos: ${JSON.stringify(c.assuntos)}, ids: ${JSON.stringify(c.ids)} },`);
  return `/* resumos/conjuntos-por-tema.js — o conjunto planejado de questões de cada tema com resumo
   Gerado por \`npm run conjuntos-por-tema -- --gravar\` (não editar à mão; regra em
   ferramentas/lib-conjuntos.mjs e docs/PROJETO-INTEGRACAO-RESUMOS.md, seção 4).
   \`ids\` está em ordem: as primeiras cobrem os fragmentos de maior peso, então quem tem meta curta
   faz as N primeiras. É a pós-leitura da construção do zero e a trilha por tema de reparar falhas. */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).conjuntos = {
${linhas.join("\n")}
};
`;
}

export function lerConjuntosGravados(){
  if(!fs.existsSync(ARQUIVO_CONJUNTOS)) return null;
  const contexto = { window: {} };
  vm.runInNewContext(fs.readFileSync(ARQUIVO_CONJUNTOS, "utf8"), contexto);
  return contexto.window.EscResumos.conjuntos;
}

/* Para o `npm run conferir`: id que sumiu ou deixou de servir é ERRO (o aluno receberia uma
   questão anulada ou nada); arquivo atrás do banco é só AVISO (ainda funciona, só não usa o novo). */
export function conferirConjuntos(questoes){
  const erros = [], avisos = [], gravados = lerConjuntosGravados();
  if(!gravados){ avisos.push("resumos/conjuntos-por-tema.js não existe: rode npm run conjuntos-por-tema -- --gravar"); return { erros, avisos }; }
  const porId = new Map(questoes.map(q => [q.id, q])), temas = new Set(temasDeResumo());
  for(const [tema, c] of Object.entries(gravados)){
    if(!temas.has(tema)) erros.push(`conjuntos-por-tema: o tema ${tema} não tem resumo`);
    if(new Set(c.ids).size !== c.ids.length) erros.push(`conjuntos-por-tema: ${tema} tem questão repetida`);
    for(const id of c.ids){
      if(!porId.has(id)) erros.push(`conjuntos-por-tema: ${tema} cita ${id}, que não existe`);
      else if(!questaoServe(porId.get(id))) erros.push(`conjuntos-por-tema: ${tema} cita ${id}, que não serve mais (status/figura/dissertativa)`);
    }
  }
  if(textoDoArquivo(montarTodos(questoes)) !== fs.readFileSync(ARQUIVO_CONJUNTOS, "utf8"))
    avisos.push("resumos/conjuntos-por-tema.js está atrás dos resumos/questões: rode npm run conjuntos-por-tema -- --gravar");
  return { erros, avisos };
}
