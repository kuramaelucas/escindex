/* ferramentas/pos-simulado.mjs — depois que os alunos fizeram o simulado: quais questões olhar primeiro.

   Junta o desempenho real por questão (acerto, alternativa mais marcada, tempo) com os relatos de alunos
   e aponta o que merece revisão: questão que quase ninguém acerta, que quase todos acertam (não discrimina),
   cujo distrator vence o gabarito (o gabarito está certo? o distrator está bom demais?) e as relatadas.

   Uso:
     node ferramentas/pos-simulado.mjs sim-epm2 esc-backup-1.json [esc-backup-2.json …] [--relatos relatos-2026-10-20.json] [--min 10]

   Entrada: o backup do site (Configurações › Backup, só o administrador máster) de cada pessoa que fez o
   simulado — o JSON traz `resultadosSimulados`. O gabarito vem de dados/. Os backups ficam FORA do
   repositório (têm nome e e-mail); esta ferramenta só imprime números por questão, nunca quem respondeu.
   `--min` é o menor número de respostas para confiar no percentual (padrão 10): abaixo disso a questão só é
   listada como "poucas respostas". */
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { carregar } from "./lib-dados.mjs";
import { lerRelatos, agruparPorQuestao } from "./relatos.mjs";

export const LIMITES = { dificil: 0.25, facil: 0.95 };

/* resultados: [{ respostas:{qid:letra}, tempos:{qid:seg} }]; devolve, por questão do simulado, as contagens */
export function agregar(qids, resultados, questaoPorId){
  const porQ = new Map(qids.map(id => [id, { id, n: 0, acertos: 0, escolhas: {}, tempoTotal: 0, comTempo: 0 }]));
  for(const r of resultados){
    for(const id of qids){
      const letra = (r.respostas || {})[id]; if(!letra) continue;
      const q = questaoPorId.get(id), a = porQ.get(id);
      a.n++; if(q && letra === q.gabarito) a.acertos++;
      a.escolhas[letra] = (a.escolhas[letra] || 0) + 1;
      const t = (r.tempos || {})[id]; if(typeof t === "number" && t > 0){ a.tempoTotal += t; a.comTempo++; }
    }
  }
  return [...porQ.values()];
}

/* o que olhar em cada questão (lista vazia = nada de especial) */
export function avaliar(a, q, { min = 10, relatos = 0 } = {}){
  const motivos = [];
  if(a.n < min) return { motivos: [a.n ? `poucas respostas (${a.n})` : "ninguém respondeu"], taxa: a.n ? a.acertos / a.n : null };
  const taxa = a.acertos / a.n, k = q ? q.alternativas.length : 4;
  if(taxa < LIMITES.dificil) motivos.push(`acerto de ${(taxa * 100).toFixed(0)}% — ${taxa < 1 / k ? "abaixo do acaso: confira o gabarito e o enunciado" : "muito difícil: o conteúdo é esse mesmo?"}`);
  if(taxa > LIMITES.facil) motivos.push(`acerto de ${(taxa * 100).toFixed(0)}% — não discrimina: pista no enunciado ou nas alternativas?`);
  const errada = Object.entries(a.escolhas).filter(([l]) => !q || l !== q.gabarito).sort((x, y) => y[1] - x[1])[0];
  if(errada && errada[1] > a.acertos) motivos.push(`a alternativa ${errada[0]} (${errada[1]} de ${a.n}) foi mais marcada que o gabarito (${a.acertos}): ela é mesmo errada pela diretriz de hoje?`);
  if(relatos) motivos.push(`${relatos} relato(s) de aluno — npm run relatos -- <arquivo> ${a.id}`);
  return { motivos, taxa };
}

function principal(){
  const args = process.argv.slice(2), valor = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };
  const posicionais = args.filter((a, i) => !a.startsWith("--") && !["--relatos", "--min"].includes(args[i - 1]));
  const [simuladoId, ...backups] = posicionais;
  if(!simuladoId || !backups.length){ console.error("uso: node ferramentas/pos-simulado.mjs <id-do-simulado> <backup.json> [outros backups] [--relatos arquivo] [--min 10]"); process.exit(1); }
  const min = valor("--min") ? Number(valor("--min")) : 10;
  const { D } = carregar();
  const simulado = D.simulados.find(s => s.id === simuladoId);
  if(!simulado){ console.error(`simulado ${simuladoId} não existe em dados/ (ids: ${D.simulados.map(s => s.id).join(", ")})`); process.exit(1); }
  const questaoPorId = new Map(D.questoes.map(q => [q.id, q]));
  const vistos = new Set(), resultados = [];
  for(const arq of backups){
    const db = JSON.parse(fs.readFileSync(arq, "utf8"));
    for(const r of db.resultadosSimulados || []) if(r.simuladoId === simuladoId && !vistos.has(r.id)){ vistos.add(r.id); resultados.push(r); }
  }
  const porRelato = new Map(valor("--relatos") ? agruparPorQuestao(lerRelatos(valor("--relatos")).relatos).map(([id, l]) => [id, l.length]) : []);
  const linhas = agregar(simulado.questoes, resultados, questaoPorId);
  console.log(`${simulado.titulo}: ${resultados.length} resultado(s) em ${backups.length} backup(s); ${linhas.filter(a => a.n >= min).length} de ${linhas.length} questões com ${min} respostas ou mais`);
  if(resultados.length < min) console.log(`  (menos de ${min} resultados: os percentuais ainda não dizem nada de confiável)`);
  const media = resultados.length ? resultados.reduce((s, r) => s + (r.nota || 0), 0) / resultados.length : 0;
  console.log(`  nota média ${media.toFixed(1)}%\n`);
  let marcadas = 0;
  linhas.forEach((a, i) => {
    const q = questaoPorId.get(a.id), av = avaliar(a, q, { min, relatos: porRelato.get(a.id) || 0 });
    if(!av.motivos.length) return;
    marcadas++;
    console.log(`posição ${i + 1} (${a.id})${av.taxa === null ? "" : ` — acerto ${(av.taxa * 100).toFixed(0)}%`}${a.comTempo ? `, ${Math.round(a.tempoTotal / a.comTempo)} s em média` : ""}`);
    av.motivos.forEach(m => console.log("  · " + m));
  });
  console.log(`\n${marcadas} questão(ões) para olhar. Depois de corrigir uma, registre com: npm run relatos -- registrar <id> --acao "…"`);
}
if(process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) principal();
