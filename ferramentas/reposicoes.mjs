/* ==========================================================================
   REPOSIÇÕES — o que falta corrigir nas questões anuladas e desatualizadas
   ==========================================================================
   Uma REPOSIÇÃO é uma questão à parte (campo `reposicaoDe` aponta para a
   original), escrita pela equipe a partir de diretriz lida, que o aluno só
   encontra na prova "com correção por IA" e no estudo geral. Método, fontes que
   abrem e armadilhas: docs/REPOSICOES-DE-QUESTOES.md.

     npm run reposicoes                      resumo: quantas anuladas/desatualizadas, quantas já têm reposição
     npm run reposicoes -- pendentes         as que ainda não têm (uma linha cada: id, assunto, imagem?, começo do enunciado)
     npm run reposicoes -- pendentes cardio  só as do assunto/prova que combinam com a palavra
     npm run reposicoes -- feitas            as que já têm reposição (ativa ou rascunho) e o arquivo
     npm run reposicoes -- <q-id>            a original e a reposição (se houver) lado a lado, sem cortar

   Só leitura. Existe porque a lista das pendentes se perde entre conversas:
   refazê-la lendo prova por prova custa centenas de KB. */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { carregar } from "./lib-dados.mjs";

const SITUACOES = new Set(["anulada", "desatualizada"]);

export function analisar(){
  const { arquivos } = carregar();
  const reposicoes = new Map();   // id da original -> { q, arquivo }
  const originais = [];           // anuladas e desatualizadas de prova real
  const porId = new Map();
  for(const a of arquivos){
    for(const q of a.questoes || []){
      porId.set(q.id, { q, arquivo: a.nome });
      if(q.reposicaoDe) reposicoes.set(q.reposicaoDe, { q, arquivo: a.nome });
      else if(q.real && SITUACOES.has(q.status)) originais.push({ q, arquivo: a.nome });
    }
  }
  const feitas = originais.filter(o => reposicoes.has(o.q.id));
  const pendentes = originais.filter(o => !reposicoes.has(o.q.id));
  // reposição apontando para uma original que não existe mais é erro de digitação
  const orfas = [...reposicoes.keys()].filter(id => !porId.has(id));
  return { originais, feitas, pendentes, reposicoes, porId, orfas };
}

const linha = ({ q, arquivo }) =>
  `${q.id}  ${q.status === "anulada" ? "ANU" : "DES"}  ${q.assuntoId || "-"}${q.imagemUrl || q.imagemPendente ? "  [imagem]" : ""}  ${arquivo}\n    ${(q.enunciado || "").replace(/\s+/g, " ").slice(0, 150)}`;

function principal(args){
  const R = analisar();
  const [cmd, termo] = args;
  if(R.orfas.length){ console.error("Reposição sem original: " + R.orfas.join(", ")); process.exitCode = 1; }
  if(!cmd){
    const cont = lista => lista.reduce((m, o) => (m[o.q.status] = (m[o.q.status] || 0) + 1, m), {});
    const ativas = [...R.reposicoes.values()].filter(r => r.q.status === "ativa").length;
    const rascunho = [...R.reposicoes.values()].filter(r => r.q.status !== "ativa").length;
    console.log(`Provas reais: ${R.originais.length} anuladas/desatualizadas (${JSON.stringify(cont(R.originais))}).`);
    console.log(`Com reposição: ${R.feitas.length} (${ativas} ativas, ${rascunho} em rascunho). Sem reposição: ${R.pendentes.length} (${JSON.stringify(cont(R.pendentes))}).`);
    console.log(`Dessas pendentes, ${R.pendentes.filter(o => o.q.imagemUrl || o.q.imagemPendente).length} dependem de imagem.`);
    console.log("Detalhe: npm run reposicoes -- pendentes [palavra] | feitas | <q-id>");
    return;
  }
  if(cmd === "pendentes" || cmd === "feitas"){
    const lista = (cmd === "pendentes" ? R.pendentes : R.feitas)
      .filter(o => !termo || (o.q.id + " " + o.q.assuntoId + " " + o.arquivo + " " + o.q.enunciado).toLowerCase().includes(termo.toLowerCase()));
    for(const o of lista){
      console.log(linha(o));
      if(cmd === "feitas"){ const r = R.reposicoes.get(o.q.id); console.log(`    -> ${r.q.id} (${r.q.status}) em dados/${r.arquivo}.js`); }
    }
    console.log(`\n${lista.length} questão(ões).`);
    return;
  }
  const o = R.porId.get(cmd);
  if(!o){ console.error(`Não achei ${cmd}. Use: npm run reposicoes -- pendentes | feitas | <q-id>`); process.exitCode = 1; return; }
  const mostrar = (rotulo, { q, arquivo }) => {
    console.log(`\n=== ${rotulo}: ${q.id} (${q.status}, dados/${arquivo}.js) ===`);
    console.log(q.enunciado);
    (q.alternativas || []).forEach(a => console.log(`  ${a.id}) ${a.texto}`));
    console.log(`gabarito: ${q.gabarito || "(sem)"}`);
    console.log(`explicação: ${q.explicacaoGeral}`);
    console.log(`referências: ${q.referencias || "(sem)"}`);
  };
  const original = o.q.reposicaoDe ? R.porId.get(o.q.reposicaoDe) : o;
  mostrar("ORIGINAL", original);
  const rep = R.reposicoes.get(original.q.id);
  if(rep) mostrar("REPOSIÇÃO", rep); else console.log("\n(sem reposição ainda)");
}

if(process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) principal(process.argv.slice(2));
