/* ==========================================================================
   PRIORIDADE-FORMADOS — ordem de assuntos para o calendário de Formados
   ==========================================================================
   Junta DEMANDA (o que cai nas provas reais) com CONSTRUÇÃO (quem precisa de
   quem, em ferramentas/prerequisitos-formados.json) e escreve
   docs/PRIORIDADE-ASSUNTOS-FORMADOS.md.

   Demanda de um assunto = soma, sobre as questões reais ativas dele, de
   0,85^(anos desde a prova mais recente): prova nova pesa mais que prova velha.
   Valor de desbloqueio = demanda própria + 30% da demanda de todos os assuntos
   que dependem dele (direta ou indiretamente): um alicerce que abre muita
   coisa que cai sobe na fila.
   Ordem = a cada passo, entre os assuntos com todos os pré-requisitos já
   cumpridos, entra o de maior valor de desbloqueio (ordenação topológica
   gulosa). Assim nenhum assunto aparece antes do que ele exige.
   Uso: npm run prioridade-formados [-- --json]
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { carregar, RAIZ } from "./lib-dados.mjs";

const PESO_DESBLOQUEIO = 0.3, DECAIMENTO = 0.85, POR_ONDA = 30;
const { D } = carregar();
const T = D.taxonomia;
const pre = JSON.parse(fs.readFileSync(path.join(RAIZ, "ferramentas", "prerequisitos-formados.json"), "utf8"));
delete pre._leia;
const curto = id => id.replace(/^ass-/, "");

const ativas = D.questoes.filter(q => q.real && (!q.status || q.status === "ativa") && q.tipo !== "dissertativa");
const anoMax = Math.max(...ativas.map(q => +q.ano || 0));
const esp = Object.fromEntries(T.especialidades.map(e => [e.id, e]));
const A = {};
for(const a of T.assuntos) A[curto(a.id)] = { id: curto(a.id), nome: a.nome, esp: esp[a.especialidadeId]?.nome || "?", n: 0, w: 0, bancas: new Set(), flash: 0 };
for(const q of ativas){
  const x = A[curto(q.assuntoId)]; if(!x) continue;
  x.n++; x.w += Math.pow(DECAIMENTO, Math.max(0, anoMax - (+q.ano || anoMax))); x.bancas.add(String(q.banca).split(" ")[0]);
}
for(const f of D.flashcards || []){ const x = A[curto(f.assuntoId || "")]; if(x) x.flash++; }

// confere o arquivo de pré-requisitos (id inexistente ou ciclo = erro, não ordem torta)
for(const [k, v] of Object.entries(pre)){
  if(!A[k]) throw new Error("prerequisitos-formados.json: assunto inexistente '" + k + "'");
  for(const p of v) if(!A[p]) throw new Error("prerequisitos-formados.json: '" + k + "' exige '" + p + "', que não existe");
}
const exige = id => pre[id] || [];
const filhos = {}; for(const id in A) filhos[id] = [];
for(const id in A) for(const p of exige(id)) filhos[p].push(id);

const desc = {};
function descendentes(id){
  if(desc[id]) return desc[id];
  const r = new Set();
  for(const f of filhos[id]){ r.add(f); descendentes(f).forEach(x => r.add(x)); }
  return (desc[id] = r);
}
for(const id in A){ A[id].dep = descendentes(id).size; A[id].valor = A[id].w + PESO_DESBLOQUEIO * [...descendentes(id)].reduce((s, d) => s + A[d].w, 0); }

const feitos = new Set(), ordem = [];
while(ordem.length < Object.keys(A).length){
  const livres = Object.values(A).filter(a => !feitos.has(a.id) && exige(a.id).every(p => feitos.has(p)));
  if(!livres.length) throw new Error("ciclo nos pré-requisitos entre: " + Object.values(A).filter(a => !feitos.has(a.id)).map(a => a.id).join(", "));
  livres.sort((a, b) => b.valor - a.valor);
  const a = livres[0]; feitos.add(a.id); ordem.push(a);
}
const total = ativas.length; let acum = 0;
ordem.forEach((a, i) => { acum += a.n; a.pos = i + 1; a.cobAcum = 100 * acum / total; });

if(process.argv.includes("--json")){ console.log(JSON.stringify(ordem.map(a => ({ pos: a.pos, id: "ass-" + a.id, demanda: +a.w.toFixed(1), questoes: a.n, exige: exige(a.id).map(p => "ass-" + p) })), null, 1)); process.exit(0); }

const NOMES_ONDA = ["Alicerces e alto retorno", "Núcleo clínico, cirúrgico, GO e pediátrico", "Aprofundamento e complicações", "Especialidades de apoio", "Cauda longa e refinamento", "Raridades e subespecialidades", "Cauda longa (pouca demanda)"];
const L = [];
L.push("# Prioridade de assuntos para o calendário de Formados", "",
  "> Gerado por `npm run prioridade-formados` — **não editar à mão**. A ordem sai de `ferramentas/prerequisitos-formados.json` (quem precisa de quem) + a demanda das provas reais.", "",
  "## Como a ordem foi feita", "",
  `1. **Demanda** = questões reais ativas de cada assunto (${total} no total, ${Object.keys(A).length} assuntos), cada uma pesando ${DECAIMENTO}^(anos desde a prova mais recente do banco, ${anoMax}): prova recente conta mais.`,
  `2. **Construção**: cada assunto lista o que precisa vir antes (ex.: ciclo menstrual → pré-natal → trabalho de parto → puerpério; HAS → dislipidemia → DAC crônica → SCA → IC).`,
  `3. **Valor de desbloqueio** = demanda + ${PESO_DESBLOQUEIO * 100}% da demanda de tudo que depende dele. Alicerce que abre muito conteúdo cobrado sobe.`,
  "4. **Ordem**: a cada passo entra, entre os assuntos com pré-requisitos já cumpridos, o de maior valor. Nenhum assunto vem antes do que ele exige.",
  `5. Ondas de ${POR_ONDA} assuntos servem para fatiar o calendário (uma onda ≈ um bloco de semanas). **Cobertura acumulada** = % das questões reais do banco que aquelas ondas já cobrem.`, "");

const porOnda = Math.ceil(ordem.length / POR_ONDA);
for(let o = 0; o < porOnda; o++){
  const fatia = ordem.slice(o * POR_ONDA, (o + 1) * POR_ONDA);
  const cob = fatia[fatia.length - 1].cobAcum.toFixed(0);
  L.push(`## Onda ${o + 1} — ${NOMES_ONDA[Math.min(o, NOMES_ONDA.length - 1)]} (assuntos ${fatia[0].pos}–${fatia[fatia.length - 1].pos} · cobertura acumulada ${cob}%)`, "",
    "| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |", "|---:|---|---|---:|---:|---:|---|");
  for(const a of fatia) L.push(`| ${a.pos} | ${a.nome.replace(/ \(.*\)$/, "")} (\`ass-${a.id}\`) | ${a.esp} | ${a.n} | ${a.w.toFixed(1)} | ${a.bancas.size} | ${exige(a.id).map(p => A[p].nome.replace(/ \(.*\)$/, "")).join("; ") || "—"} |`);
  L.push("");
}

// por especialidade: quanto da prova ela pesa e onde cai a sequência
const porEsp = {};
for(const a of ordem){ const e = porEsp[a.esp] || (porEsp[a.esp] = { n: 0, assuntos: 0, primeira: a.pos, ultima: a.pos }); e.n += a.n; e.assuntos++; e.ultima = a.pos; }
L.push("## Peso de cada especialidade e onde ela se espalha na sequência", "", "| Especialidade | % das questões | Assuntos | 1º assunto na posição | último na posição |", "|---|---:|---:|---:|---:|");
Object.entries(porEsp).sort((a, b) => b[1].n - a[1].n).forEach(([k, e]) => L.push(`| ${k} | ${(100 * e.n / total).toFixed(1)}% | ${e.assuntos} | ${e.primeira} | ${e.ultima} |`));
L.push("", "## Lacunas que afetam o calendário", "",
  "Assuntos com **menos de 3 questões reais** (ficam no fim, mas o aluno quase não tem o que praticar neles): " + ordem.filter(a => a.n < 3).map(a => `\`ass-${a.id}\` (${a.n})`).join(", ") + ".", "");
fs.writeFileSync(path.join(RAIZ, "docs", "PRIORIDADE-ASSUNTOS-FORMADOS.md"), L.join("\n"));
console.log(`docs/PRIORIDADE-ASSUNTOS-FORMADOS.md escrito — ${ordem.length} assuntos, ${porOnda} ondas.`);
