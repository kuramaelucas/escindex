/* ==========================================================================
   ADICIONAR QUESTÕES — um lote de questões numa prova de dados/, sem boilerplate
   ==========================================================================
   Quem escreve a questão escreve só o que é dela; a ferramenta completa o que
   toda questão repete (id, banca, ano, real, área e especialidade pelo
   assunto, estatísticas, autoria), confere ANTES de gravar e grava no formato
   padrão, no fim do arquivo da prova — o resto do arquivo não é lido nem mexido.

     npm run adicionar-questoes -- usp-2027 lote-1.json
     npm run adicionar-questoes -- usp-2027 lote-1.json --simular   (confere, não grava)

   O arquivo é uma lista JSON (ou {"questoes":[…]}) com, por questão:
     n            número na prova                       (obrigatório)
     assunto      id do assunto (npm run dados -- taxonomia palavra)   (obrigatório)
     enunciado    texto da pergunta                     (obrigatório)
     alt          ["texto A", "texto B", …]  as letras vêm da ordem  (obrigatório)
     gabarito     "C"  (vazio quando anulada)           (obrigatório)
     explicacao   explicação no padrão de justificativa (obrigatório)
     referencias, dificuldade (fundamental|intermediario|avancado; padrão intermediario)
     status ("anulada" pede "motivo"), figura ("png"|"jpg"|caminho), imagemPendente, imagemLegenda
     explicacoesAlternativas  {"A":"…"}   (opcional)
   Tudo ou nada: se uma questão falha, nenhuma é gravada e a lista de problemas
   diz qual (pelo número). Depois da gravação, o conferidor roda de novo e, se
   achar erro nessas questões, o arquivo volta ao que era.
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { RAIZ, carregar, lerFicha, questaoComoTexto, acrescentarAoArquivo } from "./lib-dados.mjs";
import { conferir, faltasDeJustificativa, resumirNumeros } from "../testes/conferir-dados.mjs";

const CAMPOS = new Set(["n", "assunto", "enunciado", "alt", "gabarito", "explicacao", "explicacoesAlternativas",
  "referencias", "dificuldade", "status", "motivo", "figura", "imagemPendente", "imagemLegenda"]);
const DIFICULDADES = ["fundamental", "intermediario", "avancado"];
const hoje = () => new Date().toISOString().slice(0, 10);

/* Transforma a entrada compacta em questões completas — ou devolve os problemas. */
export function montarQuestoes(entrada, ficha, { taxonomia, numerosExistentes }){
  const problemas = [], questoes = [], vistos = new Set();
  const asss = new Map(taxonomia.assuntos.map(a => [a.id, a]));
  const esps = new Map(taxonomia.especialidades.map(e => [e.id, e]));
  const letras = "ABCDEFGH".slice(0, ficha.alternativas || 4).split("");
  entrada.forEach((e, i) => {
    const onde = Number.isInteger(e.n) ? `questão ${e.n}` : `item ${i + 1} da lista`;
    const erro = t => problemas.push(`${onde}: ${t}`);
    Object.keys(e).filter(k => !CAMPOS.has(k)).forEach(k => erro(`campo "${k}" desconhecido (campos: ${[...CAMPOS].join(", ")})`));
    if(!Number.isInteger(e.n) || e.n < 1) erro('falta "n" (número na prova)');
    else if(vistos.has(e.n) || numerosExistentes.has(e.n)) erro(`o número ${e.n} já existe ${vistos.has(e.n) ? "neste lote" : "na prova"}`);
    vistos.add(e.n);
    const ass = asss.get(e.assunto);
    if(!ass) erro(`assunto "${e.assunto}" não existe (npm run dados -- taxonomia palavra)`);
    if(!String(e.enunciado || "").trim()) erro("enunciado vazio");
    if(!Array.isArray(e.alt) || e.alt.length !== letras.length) erro(`"alt" deve ter ${letras.length} alternativas (tem ${Array.isArray(e.alt) ? e.alt.length : 0})`);
    else if(e.alt.some(t => !String(t).trim())) erro("alternativa vazia");
    const anulada = e.status === "anulada";
    if(e.status !== undefined && !["ativa", "anulada", "rascunho"].includes(e.status)) erro(`status "${e.status}" não existe (ativa, anulada, rascunho)`);
    if(anulada){ if(!e.motivo) erro('questão anulada pede "motivo"'); if(e.gabarito) erro("questão anulada fica sem gabarito"); }
    else if(!letras.includes(e.gabarito)) erro(`gabarito "${e.gabarito}" não é uma das letras ${letras.join(", ")}`);
    if(e.dificuldade !== undefined && !DIFICULDADES.includes(e.dificuldade)) erro(`dificuldade "${e.dificuldade}" não existe (${DIFICULDADES.join(", ")})`);
    const q = {
      id: `${ficha.prefixo}-${String(e.n).padStart(3, "0")}`, banca: ficha.banca, real: true,
      ...(ficha.tipoProva ? { tipoProva: ficha.tipoProva } : {}), ano: ficha.ano, numeroNaProva: e.n,
      areaId: ass && esps.get(ass.especialidadeId) ? esps.get(ass.especialidadeId).areaId : undefined,
      especialidadeId: ass ? ass.especialidadeId : undefined, assuntoId: e.assunto,
      enunciado: e.enunciado,
      alternativas: Array.isArray(e.alt) ? e.alt.map((t, k) => ({ id: letras[k], texto: String(t) })) : [],
      gabarito: anulada ? "" : e.gabarito,
      explicacaoGeral: e.explicacao,
      explicacoesAlternativas: e.explicacoesAlternativas || {},
      referencias: e.referencias,
      dificuldadeManual: e.dificuldade || "intermediario", status: e.status || "ativa",
      ...(anulada ? { motivoStatus: e.motivo } : {}),
      criadoPor: "seed", criadoEm: hoje(),
    };
    if(e.figura) q.imagemUrl = /^(png|jpe?g|webp)$/i.test(e.figura) ? `dados/imagens/${q.id}.${e.figura.toLowerCase()}` : e.figura;
    if(e.imagemPendente) q.imagemPendente = e.imagemPendente;
    if(e.imagemLegenda) q.imagemLegenda = e.imagemLegenda;
    // a regra de justificativa é a do conferidor — a mesma que vale depois
    faltasDeJustificativa(q).forEach(f => erro(`explicação fora do padrão — ${f}`));
    [q.explicacaoGeral, ...Object.values(q.explicacoesAlternativas)].forEach(t => {
      if(t && (String(t).match(/\*\*/g) || []).length % 2) erro('"**" sem par na explicação');
    });
    questoes.push(q);
  });
  return { problemas, questoes: questoes.sort((a, b) => a.numeroNaProva - b.numeroNaProva) };
}

export function adicionar(nome, arquivoEntrada, { simular = false } = {}){
  nome = nome.replace(/^prova-/, "");
  const slug = "prova-" + nome, arq = path.join(RAIZ, "dados", slug + ".js");
  const ficha = lerFicha(slug);
  let entrada = JSON.parse(fs.readFileSync(arquivoEntrada, "utf8"));
  if(entrada && !Array.isArray(entrada)) entrada = entrada.questoes;
  if(!Array.isArray(entrada) || !entrada.length) throw new Error("o arquivo precisa ser uma lista de questões (ou {\"questoes\":[…]})");
  const { D, arquivos } = carregar();
  const reg = arquivos.find(a => a.nome === slug);
  if(!reg) throw new Error(`${slug} não está em dados/manifesto.js`);
  const numerosExistentes = new Set(reg.questoes.map(q => q.numeroNaProva));
  const { problemas, questoes } = montarQuestoes(entrada, ficha, { taxonomia: D.taxonomia, numerosExistentes });
  if(problemas.length) return { ok: false, problemas };
  if(simular) return { ok: true, simulado: true, questoes };

  const original = fs.readFileSync(arq, "utf8");
  acrescentarAoArquivo(slug, questoes.map(questaoComoTexto));
  const idsNovos = new Set(questoes.map(q => q.id));
  const r = conferir();
  const meus = r.erros.filter(e => [...idsNovos].some(id => e.includes(id)) || /id repetido|arquivo da lista/.test(e));
  if(meus.length){ fs.writeFileSync(arq, original); return { ok: false, problemas: meus.map(e => "(conferidor) " + e), desfeito: true }; }
  const todos = [...reg.questoes, ...questoes].map(q => q.numeroNaProva);
  const maior = Math.max(ficha.total || 0, ...todos);
  const faltam = []; for(let n = 1; n <= maior; n++) if(!todos.includes(n)) faltam.push(n);
  return { ok: true, questoes, total: todos.length, faltam, avisos: r.avisos.filter(a => [...idsNovos].some(id => a.includes(id))) };
}

if(process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])){
  try{
    const args = process.argv.slice(2).filter(a => !a.startsWith("--"));
    if(args.length < 2) throw new Error("uso: npm run adicionar-questoes -- usp-2027 lote-1.json [--simular]");
    const r = adicionar(args[0], args[1], { simular: process.argv.includes("--simular") });
    if(!r.ok){
      console.error(`Nada foi gravado${r.desfeito ? " (o arquivo voltou ao que era)" : ""}. Problemas (${r.problemas.length}):`);
      r.problemas.forEach(p => console.error("  ✗ " + p));
      process.exit(1);
    }
    const nums = resumirNumeros(r.questoes.map(q => q.numeroNaProva));
    if(r.simulado) console.log(`Conferido, nada gravado: ${r.questoes.length} questões (${nums}) estão no padrão.`);
    else {
      console.log(`Gravadas ${r.questoes.length} questões (${nums}) em dados/prova-${args[0].replace(/^prova-/, "")}.js — ${r.total} na prova.`);
      if(r.faltam.length) console.log(`Ainda faltam: ${resumirNumeros(r.faltam)}.`);
      (r.avisos || []).forEach(a => console.log("  aviso: " + a));
      console.log("Ao terminar: npm run publicar");
    }
  }catch(e){ console.error("Erro: " + e.message); process.exit(1); }
}
