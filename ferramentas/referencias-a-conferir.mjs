/* ferramentas/referencias-a-conferir.mjs — a fila de referências ainda sem conferência, agrupada por diretriz.

   Lê dados/ do jeito que o navegador lê e lista as questões cuja `referencias` ainda diz "não conferida", "de memória",
   "texto não aberto" ou "em resumos" e que NÃO têm nota de conferência datada (DD/MM/AAAA). Quem anota uma conferência
   com `npm run anotar-conferencia` sai da fila na hora.

   Uso:
     node ferramentas/referencias-a-conferir.mjs                      escreve docs/REFERENCIAS-A-CONFERIR.md (todos os bancos adaptados)
     node ferramentas/referencias-a-conferir.mjs --excluir banco-simulado-epm-6      deixa um banco de fora (ex.: o já realizado)
     node ferramentas/referencias-a-conferir.mjs --bancos banco-simulado-epm-4       só esse(s) banco(s), separados por vírgula
     node ferramentas/referencias-a-conferir.mjs --so-resumo          só os números no terminal, sem escrever o arquivo

   Os bancos são os de ferramentas/bancos-adaptados.json (simulados autorais). Escreve também docs/REFERENCIAS-COM-EDICAO-ANTERIOR.md (todas as provas, pela tabela de edições vigentes). O agrupamento é por palavras-chave
   da referência: serve para decidir por onde começar, não para classificar com rigor. */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { RAIZ, carregar } from "./lib-dados.mjs";

import { FRACA, COM_DATA, alertasDeEdicao, edicoesVigentes, CORTE_DA_CONFERENCIA } from "./lib-referencias.mjs";

/* Grupos, do mais específico ao mais geral; vale o primeiro que casa. */
const FAMILIAS = [
  ["NCCN (melanoma, pulmão, cólon, reto, basocelular, uterino)", /NCCN/],
  ["AHA/ACC/ESC — cardiologia (periop., aorta, valvas, SCA, PCR, ressuscitação)", /AHA|ACC|ESC |SBC|Sociedade Brasileira de Cardiologia/],
  ["Sepse, UTI e ventilação (SSC, ATS/ACCP, AMIB, SBPT)", /Surviving|AMIB|Liberation|ventila/i],
  ["Pneumologia (GINA, GOLD, BTS, ERS, SBPT, ATS/IDSA)", /GINA|GOLD|\bBTS\b|\bERS\b|SBPT|Pneumologia|\bATS\b|Fleischner|Metlay|Polverino|MacDuff|Detterbeck/],
  ["Nefrologia (KDIGO, ACR contraste, SBN)", /KDIGO|ACR Manual|Nefrologia/],
  ["Endocrinologia (ADA, SBD, ATA, AACE, Endocrine Society, paratireoide)", /\bADA\b|Diabetes|Thyroid|Tireoide|AACE|Endocrine Society|Bilezikian|hiperparat|Hipoglic|Hypoglyc|Camacho|Radominski/],
  ["Ginecologia e obstetrícia (ACOG, FIGO, ESHRE, NAMS, FEBRASGO, OMS/CDC MEC, ASCCP, IADPSG)", /ACOG|American College of Obstetricians|FIGO|ESHRE|North American Menopause|FEBRASGO|ASCCP|IADPSG|Eligibility|Elegibilidade|Rotterdam|ESGO|BI-RADS|Climat|Panay|Harlow|Teede|Bump RC/],
  ["Pediatria (SBP, AAP, AAOS pediátrico, OMS, ACMG)", /Sociedade Brasileira de Pediatria|\bAAP\b|AAOS|Pediatric|WHO Growth|Gartland|Kocher|Caird|Aziz K|Topjian|Bradley|Glorieux|Dwan|Freedman|Sperling/],
  ["Cirurgia e trauma (WSES, ASCRS, ESVS/SVS, EAU, ACS, Tóquio, Bologna, HerniaSurge, ACG/AGA)", /WSES|ASCRS|ESVS|SVS|Vascular|EAU|HerniaSurge|Bologna|Tokyo|ACG|AGA|Colégio Brasileiro de Cirurgiões|Gustilo|Kozar|EAST|Hinchey|Sociedade Brasileira de Urologia|Coloproctologia/],
  ["Oncologia (ESMO, AJCC, IASLC, OMS tumores, Stupp, dor)", /ESMO|AJCC|IASLC|Stupp|Louis DN|Cancer pain|Neuroblastoma|INRG/i],
  ["Reumatologia, hematologia e alergia (ACR, EULAR, ASH, WFH, anafilaxia)", /\bACR\b|EULAR|\bASH\b|WFH|Hemophilia|anaphylaxis|Anafilaxia|FitzGerald|Richette|Shaker|Sampson/],
  ["Neurologia, psiquiatria e geriatria (MDS, APA, ASAM, NICE, Lewy, Lancet Commission, Beers)", /MDS|Movement Disorder|Parkinson|\bAPA\b|American Psychiatric|ASAM|\bNICE\b|Lewy|Lancet Commission|Beers|Alzheimer|Keepers|Mayo-Smith|Stabler|Hunt A/],
  ["Gastro/hepato (EASL, AASLD, ACG, Roma, Chicago)", /EASL|AASLD|Rome|Roma|Mearin|Chicago|Vaezi|Biggins|constipation/i],
  ["Infectologia (IDSA, CDC, OMS, SBI, RECOVERY)", /IDSA|\bCDC\b|RECOVERY|COVID|Tamma|Harris PNA|Salavastru/],
  ["Anestesia (ASRA, ASA, DAS)", /ASRA|American Society of Anesthesiologists|Difficult Airway|Garvey|Fidkowski/],
  ["Ministério da Saúde, Conitec e leis (PCDT, manuais, portarias, SUS)", /Minist[ée]rio da Sa[úu]de|Brasil\.|Portaria|PCDT|Lei |Constitui/],
  ["Epidemiologia e bioestatística (livros-texto)", /Gordis|Rothman|Medronho|Fletcher|Altman|Vieira|Sackett|Greenland|Leavell|Jamoulle|Starfield|Campos/],
];
const SEM_GRUPO = "Livros-texto e outras fontes sem diretriz";

export function agrupar(questoesComBanco){
  const grupos = new Map();
  for(const { q, banco } of questoesComBanco){
    const nome = (FAMILIAS.find(([, re]) => re.test(q.referencias || "")) || [SEM_GRUPO])[0];
    if(!grupos.has(nome)) grupos.set(nome, []);
    grupos.get(nome).push({ q, banco });
  }
  return [...grupos.entries()].sort((a, b) => b[1].length - a[1].length);
}

function argValor(args, nome){ const i = args.indexOf(nome); return i >= 0 ? args[i + 1] : ""; }

function principal(){
  const args = process.argv.slice(2);
  const adaptados = Object.keys(JSON.parse(fs.readFileSync(path.join(RAIZ, "ferramentas", "bancos-adaptados.json"), "utf8")));
  const so = argValor(args, "--bancos").split(",").filter(Boolean);
  const fora = argValor(args, "--excluir").split(",").filter(Boolean);
  const bancos = (so.length ? so : adaptados).filter((b) => !fora.includes(b));

  const { arquivos } = carregar();
  const fila = [];
  for(const a of arquivos){
    if(!bancos.includes(a.nome) || !a.questoes) continue;
    for(const q of a.questoes){
      const ref = String(q.referencias || "");
      if(FRACA.test(ref) && !COM_DATA.test(ref)) fila.push({ q, banco: a.nome });
    }
  }
  const grupos = agrupar(fila);
  console.log(`${fila.length} questão(ões) com referência sem conferência datada (${bancos.length} banco(s)).`);
  for(const [nome, v] of grupos) console.log(`  ${String(v.length).padStart(3)}  ${nome}`);
  if(args.includes("--so-resumo")) return;

  const hoje = new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
  let md = `# Referências de simulados autorais ainda com confirmação fraca\n\nGerado por \`npm run referencias-a-conferir\` em ${hoje} a partir de \`dados/\` (bancos: ${bancos.join(", ")}). `
    + `Lista as questões cuja referência ainda diz "não conferida", "de memória", "texto não aberto" ou "em resumos" e que **não** têm nota de conferência datada.\n\n`
    + `Total: **${fila.length}** questões. Para conferir uma: \`npm run dados -- q-id\`, abra o texto oficial (ver \`.claude/skills/conferir-referencias/SKILL.md\`) e registre com \`npm run anotar-conferencia\`.\n\n`
    + `| Grupo | Questões |\n|---|---|\n` + grupos.map(([n, v]) => `| ${n} | ${v.length} |\n`).join("") + "\n";
  for(const [nome, v] of grupos){
    md += `## ${nome} (${v.length})\n\n`;
    for(const { q, banco } of v){
      const ref = String(q.referencias).replace(/\s+/g, " ").replace(/Nível de confirmação.*$/, "").slice(0, 150).trim();
      md += `- \`${q.id}\` (gab. ${q.gabarito}, ${banco.replace("banco-", "")}): ${ref}\n`;
    }
    md += "\n";
  }
  fs.writeFileSync(path.join(RAIZ, "docs", "REFERENCIAS-A-CONFERIR.md"), md);
  console.log("escrito: docs/REFERENCIAS-A-CONFERIR.md");

  /* Segunda lista: TODAS as provas (reais e autorais), não só os simulados — as questões que citam uma diretriz da
     tabela ferramentas/edicoes-vigentes.json sem mencionar a edição vigente. É o ponto de partida para revisar as provas reais. */
  const porEdicao = new Map();
  let total = 0;
  for(const a of arquivos){
    if(!a.questoes || fora.includes(a.nome)) continue;
    for(const q of a.questoes) for(const e of alertasDeEdicao(q.referencias)){
      if(!porEdicao.has(e.id)) porEdicao.set(e.id, { e, itens: [] });
      porEdicao.get(e.id).itens.push({ q, banco: a.nome }); total++;
    }
  }
  const ordem = [...porEdicao.values()].sort((x, y) => y.itens.length - x.itens.length);
  console.log(`${total} citação(ões) de edição anterior à vigente em ${ordem.reduce((n, g) => n + g.itens.length, 0)} par(es) questão×diretriz (todas as provas).`);
  let md2 = `# Questões que citam uma diretriz sem a edição vigente\n\nGerado por \`npm run referencias-a-conferir\` em ${hoje} para **todas** as provas de \`dados/\` (reais e autorais), com a tabela \`ferramentas/edicoes-vigentes.json\` (${edicoesVigentes().length} diretrizes). `
    + `Uma questão entra aqui se a referência casa com a diretriz e não menciona o ano da edição vigente nem um posterior. Isso **não** prova que a explicação esteja errada: é a fila de revisão. `
    + `Questões criadas a partir de ${CORTE_DA_CONFERENCIA} não podem ficar aqui (o conferidor recusa).\n\n`
    + `| Diretriz (edição vigente) | Questões |\n|---|---|\n` + ordem.map(g => `| ${g.e.nome}: ${g.e.edicao} | ${g.itens.length} |\n`).join("") + "\n";
  for(const g of ordem){
    md2 += `## ${g.e.nome} — vigente: ${g.e.edicao} (${g.itens.length})\n\n`;
    md2 += g.itens.slice(0, 60).map(({ q, banco }) => `\`${q.id}\` (${banco.replace(/^(banco|prova)-/, "")})`).join(", ");
    if(g.itens.length > 60) md2 += `, … e mais ${g.itens.length - 60}`;
    md2 += "\n\n";
  }
  fs.writeFileSync(path.join(RAIZ, "docs", "REFERENCIAS-COM-EDICAO-ANTERIOR.md"), md2);
  console.log("escrito: docs/REFERENCIAS-COM-EDICAO-ANTERIOR.md");
}

if(import.meta.url === pathToFileURL(process.argv[1]).href) principal();
