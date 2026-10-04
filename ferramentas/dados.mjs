/* ==========================================================================
   DADOS — consultar a pasta dados/ sem abrir os arquivos (que têm 300 KB cada)
   ==========================================================================
     npm run dados                         o que há: uma linha por arquivo, com totais
     npm run dados -- usp-2026             uma prova: faixa de números, o que falta, anuladas, figuras
     npm run dados -- q-usp2026-017        uma questão (a explicação vem cortada; --tudo mostra inteira)
     npm run dados -- taxonomia            os ids de área, especialidade e assunto
     npm run dados -- taxonomia cardio     só os que combinam com a palavra
     npm run dados -- buscar "sepse"       questões cujo enunciado tem a palavra (para não repetir)

   É o que se roda ANTES de ler um arquivo de dados/: quase sempre a resposta
   já está aqui, em poucas linhas.
   ========================================================================== */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { carregar } from "./lib-dados.mjs";
import { resumirNumeros } from "../testes/conferir-dados.mjs";

const sem = s => String(s || "").normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
const aguardaImagem = q => !!q.imagemPendente;

export function resumoDaProva(reg){
  const qs = reg.questoes || [], nums = qs.map(q => q.numeroNaProva).filter(Number.isInteger);
  const maior = Math.max(0, ...nums), faltam = [];
  for(let n = 1; n <= maior; n++) if(!nums.includes(n)) faltam.push(n);
  const por = {};
  qs.forEach(q => { por[q.status || "ativa"] = (por[q.status || "ativa"] || 0) + 1; });
  return {
    questoes: qs.length, ate: maior, faltam,
    anuladas: qs.filter(q => q.status === "anulada").map(q => q.numeroNaProva),
    semFigura: qs.filter(aguardaImagem).map(q => q.numeroNaProva),
    comFigura: qs.filter(q => q.imagemUrl && !q.imagemPendente).length,
    status: por, bancas: [...new Set(qs.map(q => `${q.banca} ${q.ano}`))],
  };
}

function listarTudo({ D, arquivos }){
  const reais = D.questoes.filter(q => q.real).length;
  console.log(`${D.questoes.length} questões (${reais} reais, ${D.questoes.length - reais} autorais), ${D.flashcards.length} cartões, ${D.taxonomia.assuntos.length} assuntos, ${D.simulados.length} simulado(s) — ${arquivos.length} arquivos.`);
  for(const a of arquivos){
    let extra = "";
    if(a.questoes){
      const r = resumoDaProva(a);
      extra = [r.faltam.length ? `faltam ${resumirNumeros(r.faltam)}` : "", r.anuladas.length ? `${r.anuladas.length} anulada(s)` : "", r.semFigura.length ? `${r.semFigura.length} sem figura` : ""].filter(Boolean).join("; ");
    }
    console.log(`  ${a.nome.padEnd(28)} ${String(a.itens).padStart(4)} ${a.tipo.padEnd(11)} ${extra}`);
  }
  console.log("\nMais: npm run dados -- <prova> | <id da questão> | taxonomia [palavra] | buscar \"texto\"");
}

function umaProva(reg){
  const r = resumoDaProva(reg), q1 = reg.questoes[0];
  console.log(`${reg.nome} — ${reg.titulo}`);
  console.log(`  ${r.questoes} questões, números 1–${r.ate}${r.faltam.length ? `, faltam ${resumirNumeros(r.faltam)}` : " (sem buracos)"}`);
  if(q1) console.log(`  banca "${q1.banca}", ${q1.ano}, ${q1.tipoProva || "residencia"}, ${q1.alternativas.length} alternativas, ids ${q1.id.replace(/\d+$/, "NNN")}`);
  console.log(`  status: ${Object.entries(r.status).map(([k, v]) => `${k} ${v}`).join(", ")}`);
  if(r.anuladas.length) console.log(`  anuladas: ${resumirNumeros(r.anuladas)}`);
  console.log(`  figuras: ${r.comFigura} com imagem${r.semFigura.length ? `; esperando figura: ${resumirNumeros(r.semFigura)}` : ""}`);
}

function umaQuestao(q, tudo){
  const meta = ["banca", "ano", "numeroNaProva", "tipoProva", "status", "assuntoId", "dificuldadeManual", "imagemUrl", "imagemPendente", "motivoStatus"]
    .filter(c => q[c] !== undefined && q[c] !== "").map(c => `${c}=${q[c]}`).join("  ");
  const exp = String(q.explicacaoGeral || "");
  console.log(`${q.id}  ${meta}`);
  console.log(q.enunciado);
  (q.alternativas || []).forEach(a => console.log(`  ${a.id}) ${a.texto}`));
  console.log(`gabarito: ${q.gabarito || "(anulada)"}`);
  console.log("explicação: " + (tudo || exp.length <= 240 ? exp : exp.slice(0, 240) + `… [${exp.length} caracteres; --tudo mostra inteira]`));
  if(q.referencias) console.log("referências: " + q.referencias);
}

function taxonomia({ D }, busca){
  const { areas, especialidades, assuntos } = D.taxonomia, b = sem(busca);
  const casa = (...c) => !b || c.some(x => sem(x).includes(b));
  let n = 0;
  for(const a of areas){
    for(const e of especialidades.filter(x => x.areaId === a.id)){
      const ass = assuntos.filter(x => x.especialidadeId === e.id && (casa(x.id, x.nome) || casa(e.id, e.nome) || casa(a.id, a.nome)));
      if(!ass.length) continue;
      console.log(`${a.id} · ${e.id} (${e.nome})`);
      ass.forEach(x => { console.log(`    ${x.id.padEnd(30)} ${x.nome}`); n++; });
    }
  }
  if(!n) console.log(`nenhum assunto combina com "${busca}"`);
}

function buscar({ D }, texto){
  const b = sem(texto), achadas = D.questoes.filter(q => sem(q.enunciado).includes(b));
  console.log(`${achadas.length} questões com "${texto}" no enunciado${achadas.length > 20 ? " (mostrando 20)" : ""}:`);
  achadas.slice(0, 20).forEach(q => console.log(`  ${q.id}  ${q.enunciado.slice(0, 90).replace(/\s+/g, " ")}…`));
}

if(process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])){
  try{
    const args = process.argv.slice(2).filter(a => a !== "--tudo"), tudo = process.argv.includes("--tudo");
    const c = carregar(), cmd = args[0];
    if(!cmd) listarTudo(c);
    else if(cmd === "taxonomia") taxonomia(c, args.slice(1).join(" "));
    else if(cmd === "buscar") buscar(c, args.slice(1).join(" "));
    else if(/^q-/.test(cmd)){
      const q = c.D.questoes.find(x => x.id === cmd);
      if(!q) throw new Error(`questão ${cmd} não existe`);
      umaQuestao(q, tudo);
    } else {
      const nome = cmd.replace(/^prova-/, "");
      const reg = c.arquivos.find(a => a.nome === cmd || a.nome === "prova-" + nome);
      if(!reg) throw new Error(`"${cmd}" não é um arquivo de dados/ (veja: npm run dados)`);
      if(reg.questoes) umaProva(reg); else console.log(`${reg.nome} — ${reg.titulo}\n  ${reg.itens} ${reg.tipo}`);
    }
  }catch(e){ console.error("Erro: " + e.message); process.exit(1); }
}
