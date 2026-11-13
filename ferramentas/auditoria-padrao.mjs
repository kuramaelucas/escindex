/* ferramentas/auditoria-padrao.mjs — projeto de adequação ao padrão + mapa de diretrizes.

   Dois produtos, gerados de dados/ (nada é escrito em dados/):
     1. ADEQUAÇÃO: mede em TODAS as questões (inclusive as anteriores aos cortes de data, que o conferidor
        não cobra) o que falta para cumprir o padrão de dados/PADRAO-EXPLICACAO.md — justificativa (faltasDeJustificativa)
        e referência (problemasDeReferencia sem corte de data). Resultado por prova: docs/ADEQUACAO-AO-PADRAO.md.
     2. MAPA DE DIRETRIZES: liga cada diretriz (tabela ferramentas/edicoes-vigentes.json e as famílias de
        referencias-a-conferir) às questões que dependem dela. Quando chegar um arquivo/edição nova, uma consulta
        devolve na hora quais questões revisar: docs/MAPA-DE-DIRETRIZES.md (resumo) e docs/mapa-de-diretrizes.json (índice completo).

   Uso:
     npm run auditoria-padrao                      gera os dois documentos e imprime o resumo
     npm run auditoria-padrao -- --so-resumo       só imprime, sem escrever
     npm run auditoria-padrao -- diretriz <texto>  questões que dependem de uma diretriz (id, nome ou trecho da referência)
     npm run auditoria-padrao -- prova <nome>      o que falta em cada questão de uma prova (ex.: usp-2026)
     npm run auditoria-padrao -- sem-diretriz      questões cuja referência não casa com nenhuma diretriz conhecida
*/
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { RAIZ, carregar } from "./lib-dados.mjs";
import { faltasDeJustificativa } from "../testes/conferir-dados.mjs";
import { FRACA, COM_DATA, alertasDeEdicao, edicoesVigentes } from "./lib-referencias.mjs";
import { agrupar } from "./referencias-a-conferir.mjs";

const hoje = () => new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
const nomeCurto = (n) => n.replace(/^(banco|prova)-/, "");

/* Estado da referência, sem corte de data (a regra oficial só vale para questão nova). */
export function estadoDaReferencia(q){
  const ref = String(q.referencias || "").trim();
  if(!ref) return "vazia";
  if(!COM_DATA.test(ref)) return "sem-data";
  // livro-texto aceito pela equipe como referência, registrado SEM ler o texto: é uma indicação, não uma conferência
  if(/registrada sem leitura/i.test(ref)) return "indicada";
  if(FRACA.test(ref) && !/lid[oa]|conferid[oa] em/i.test(ref)) return "fraca";
  return "datada";
}

/* CONTEÚDO (itens 7 e 8 do padrão): o conferidor oficial não checa. Aqui é só heurística por palavra-chave —
   serve para dimensionar o trabalho e achar candidatas, NÃO para aprovar: uma explicação pode ter o mecanismo sem a
   palavra, ou a palavra sem o mecanismo. Anulada fica de fora (não tem resposta a explicar). */
/* Sem acento nos dois lados: "epidemiológico" não casava com /epidemiolog/. */
const semAcento = (t) => String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const MECANISMO = /fisiopatolog|mecanismo|patogen|por que (o|a|os|as) /i;
const EPIDEMIOLOGIA = /epidemiolog|prevalenc|incidenc|frequenc|mais comum|fator(es)? de risco|faixa etaria|no brasil/i;
export function faltasDeConteudo(q){
  if(q.status === "anulada") return [];
  const t = semAcento(q.explicacaoGeral || ""), f = [];
  if(!MECANISMO.test(t)) f.push("sem mecanismo/fisiopatologia");
  if(!EPIDEMIOLOGIA.test(t)) f.push("sem epidemiologia");
  return f;
}

/* Cada item que falta, reduzido a uma etiqueta estável para contar. */
function etiquetas(faltas){
  return faltas.map((f) => f.startsWith("menos de 300") ? "corpo curto"
    : f.startsWith("nenhum dado") ? "sem destaque **"
    : f.startsWith("sem \"Dicas") ? "sem Dicas do enunciado"
    : f.startsWith("não diz por que erram") ? "errada sem motivo"
    : f.startsWith("alternativa errada sem a marca") ? "sem marca \"X) Errada:\""
    : f);
}

export function auditar(){
  const { arquivos } = carregar();
  const provas = [], porDiretriz = new Map(), semDiretriz = [];
  const tabela = edicoesVigentes();
  const registrar = (chave, nome, q, banco, extra) => {
    if(!porDiretriz.has(chave)) porDiretriz.set(chave, { nome, itens: [], ...extra });
    porDiretriz.get(chave).itens.push({ id: q.id, banco, desatualizada: !!(extra && extra.edicaoSuperada) });
  };
  for(const a of arquivos){
    if(!a.questoes) continue;
    const p = { nome: a.nome, total: 0, completas: 0, conteudoOk: 0, formaOk: 0, faltas: {}, ref: { vazia: 0, "sem-data": 0, indicada: 0, fraca: 0, datada: 0 }, questoes: [] };
    for(const q of a.questoes){
      if(q.status === "rascunho") continue;
      p.total++;
      const forma = etiquetas(faltasDeJustificativa(q)), conteudo = faltasDeConteudo(q), est = estadoDaReferencia(q);
      const faltas = [...forma, ...conteudo];
      p.ref[est]++;
      if(!conteudo.length) p.conteudoOk++;
      if(!forma.length) p.formaOk++;
      if(!faltas.length && est === "datada") p.completas++;
      faltas.forEach((f) => { p.faltas[f] = (p.faltas[f] || 0) + 1; });
      p.questoes.push({ id: q.id, faltas, ref: est });
      // mapa: toda diretriz da tabela citada pela questão (com a marca de edição superada), senão a família
      const ref = String(q.referencias || "");
      const citadas = tabela.filter((e) => e.re.test(ref));
      const superadas = new Set(alertasDeEdicao(ref).map((e) => e.id));
      citadas.forEach((e) => registrar("tabela:" + e.id, e.nome, q, a.nome, { vigente: e.edicao, termo: e.termo, tipo: "tabela", edicaoSuperada: superadas.has(e.id) }));
      if(!citadas.length){
        if(!ref.trim()) semDiretriz.push({ id: q.id, banco: a.nome, motivo: "sem referências" });
        else {
          const [fam] = agrupar([{ q, banco: a.nome }])[0];
          registrar("familia:" + fam, fam, q, a.nome, { tipo: "familia" });
        }
      }
    }
    provas.push(p);
  }
  return { provas, porDiretriz, semDiretriz };
}

function resumo({ provas, porDiretriz, semDiretriz }){
  const tot = provas.reduce((n, p) => n + p.total, 0), ok = provas.reduce((n, p) => n + p.completas, 0);
  const soma = (f) => provas.reduce((n, p) => n + f(p), 0);
  const faltasTot = {};
  provas.forEach((p) => Object.entries(p.faltas).forEach(([k, v]) => { faltasTot[k] = (faltasTot[k] || 0) + v; }));
  const cOk = soma((p) => p.conteudoOk), fOk = soma((p) => p.formaOk);
  const linhas = [`${tot} questões em ${provas.length} arquivos; ${ok} já cumprem forma + mecanismo/epidemiologia + referência datada (${(100 * ok / tot).toFixed(1)}%).`,
    `Conteúdo (heurística por palavra-chave, itens 7 e 8): ${cOk} de ${tot} mencionam mecanismo E epidemiologia (${(100 * cOk / tot).toFixed(1)}%). Forma da justificativa (itens 1–4): ${fOk} de ${tot} sem falta (${(100 * fOk / tot).toFixed(1)}%).`,
    `Referências: ${soma((p) => p.ref.datada)} lidas e datadas, ${soma((p) => p.ref.indicada)} de livro-texto indicadas sem leitura, ${soma((p) => p.ref["sem-data"])} sem data, ${soma((p) => p.ref.vazia)} vazias, ${soma((p) => p.ref.fraca)} fracas.`,
    "Justificativa — o que falta:"];
  Object.entries(faltasTot).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => linhas.push(`  ${String(v).padStart(5)}  ${k}`));
  const dt = [...porDiretriz.entries()].filter(([k]) => k.startsWith("tabela:"));
  linhas.push(`Mapa: ${dt.length} diretrizes da tabela + ${porDiretriz.size - dt.length} famílias; ${semDiretriz.length} questões sem referência.`);
  return linhas.join("\n");
}

/* Ids por prova em forma compacta: `q-usp2026`: 003, 004 (o sufixo numérico é o que muda). */
function compactar(itens){
  const por = new Map();
  for(const { id } of itens){
    const m = /^(.*?)-?(\d+)$/.exec(id), pref = m ? m[1] : id, n = m ? m[2] : "";
    if(!por.has(pref)) por.set(pref, []);
    por.get(pref).push(n);
  }
  return [...por.entries()].map(([p, ns]) => `\`${p}\`: ${ns.join(", ")}`).join("; ");
}

function escreverDocumentos(r){
  const { provas, porDiretriz, semDiretriz } = r, d = hoje();
  // 1) adequação por prova
  const pior = [...provas].sort((a, b) => (b.total - b.completas) - (a.total - a.completas));
  let md = `# Adequação das questões ao padrão da plataforma\n\nGerado por \`npm run auditoria-padrao\` em ${d}. Mede **todas** as questões (também as anteriores aos cortes de data que o conferidor usa) contra \`dados/PADRAO-EXPLICACAO.md\`: justificativa (\`faltasDeJustificativa\`) e referência com data de leitura. "Completa" = forma da justificativa sem falta, **mecanismo e epidemiologia presentes (heurística por palavra-chave, não prova qualidade)** e referência datada. Não é erro: \`npm run conferir\` só cobra o padrão de conteúdo novo.\n\n`
    + "```\n" + resumo(r) + "\n```\n\n"
    + `## Por arquivo (mais questões a adequar primeiro)\n\n| Arquivo | Questões | Completas | Mecanismo + epidem. | Ref. sem data/vazia/fraca | Principais faltas |\n|---|---:|---:|---:|---|---|\n`;
  for(const p of pior){
    const fl = Object.entries(p.faltas).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => `${k} (${v})`).join("; ") || "—";
    md += `| ${nomeCurto(p.nome)} | ${p.total} | ${p.completas} | ${p.conteudoOk} | ${p.ref["sem-data"]}/${p.ref.vazia}/${p.ref.fraca} | ${fl} |\n`;
  }
  md += `\nPara ver questão a questão: \`npm run auditoria-padrao -- prova <nome>\`.\n`;
  fs.writeFileSync(path.join(RAIZ, "docs", "ADEQUACAO-AO-PADRAO.md"), md);

  // 2) mapa de diretrizes
  const lista = [...porDiretriz.entries()].sort((a, b) => b[1].itens.length - a[1].itens.length);
  let m2 = `# Mapa de diretrizes → questões\n\nGerado por \`npm run auditoria-padrao\` em ${d}. Quando chegar edição nova de uma diretriz (ou arquivo novo), procure-a abaixo ou rode \`npm run auditoria-padrao -- diretriz <texto>\`: as questões listadas são as que dependem dela. Índice completo em \`docs/mapa-de-diretrizes.json\`. `
    + `"Superadas" = a referência não menciona a edição vigente da tabela \`ferramentas/edicoes-vigentes.json\`. Diretriz ainda fora da tabela aparece como **família** (agrupamento por palavra-chave de \`referencias-a-conferir\`): vale promovê-la à tabela quando houver edição nova.\n\n`
    + `## Diretrizes da tabela de edições vigentes\n\n| Diretriz | Edição vigente | Questões | Superadas |\n|---|---|---:|---:|\n`;
  const tabelaLista = lista.filter(([k]) => k.startsWith("tabela:"));
  for(const [, g] of tabelaLista) m2 += `| ${g.nome} | ${g.vigente} | ${g.itens.length} | ${g.itens.filter((i) => i.desatualizada).length} |\n`;
  m2 += `\n## Famílias (diretriz fora da tabela)\n\n| Família | Questões |\n|---|---:|\n`;
  for(const [k, g] of lista.filter(([k]) => k.startsWith("familia:"))) m2 += `| ${g.nome} | ${g.itens.length} |\n`;
  m2 += `\n**Sem nenhuma referência:** ${semDiretriz.length} questões (\`npm run auditoria-padrao -- sem-diretriz\`).\n\n## Questões por diretriz da tabela (só as superadas; as demais pelo JSON)\n\n`;
  for(const [, g] of tabelaLista){
    const sup = g.itens.filter((i) => i.desatualizada);
    if(sup.length) m2 += `### ${g.nome} — vigente: ${g.vigente} (${sup.length})\n\n${compactar(sup)}\n\n`;
  }
  fs.writeFileSync(path.join(RAIZ, "docs", "MAPA-DE-DIRETRIZES.md"), m2);
  const json = { geradoEm: new Date().toISOString().slice(0, 10), diretrizes: Object.fromEntries(lista.map(([k, g]) => [k, { nome: g.nome, vigente: g.vigente || null, questoes: g.itens.map((i) => i.id), superadas: g.itens.filter((i) => i.desatualizada).map((i) => i.id) }])), semReferencia: semDiretriz.map((s) => s.id) };
  fs.writeFileSync(path.join(RAIZ, "docs", "mapa-de-diretrizes.json"), JSON.stringify(json));
  console.log("escrito: docs/ADEQUACAO-AO-PADRAO.md, docs/MAPA-DE-DIRETRIZES.md, docs/mapa-de-diretrizes.json");
}

function principal(){
  const args = process.argv.slice(2), r = auditar();
  const [cmd, ...resto] = args, termo = resto.join(" ").trim();
  if(cmd === "diretriz"){
    if(!termo){ console.log("uso: -- diretriz <id|nome|trecho>"); return; }
    const re = new RegExp(termo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    const achadas = [...r.porDiretriz.entries()].filter(([k, g]) => re.test(k) || re.test(g.nome));
    if(!achadas.length) console.log("nenhuma diretriz no mapa casa com isso; tente `-- diretriz` com outra palavra ou veja docs/MAPA-DE-DIRETRIZES.md");
    for(const [k, g] of achadas){
      console.log(`\n${g.nome} [${k}]${g.vigente ? " — vigente: " + g.vigente : ""}: ${g.itens.length} questão(ões)`);
      const sup = g.itens.filter((i) => i.desatualizada);
      if(sup.length) console.log(`  superadas (${sup.length}): ` + compactar(sup).replace(/`/g, ""));
      console.log("  todas: " + compactar(g.itens).replace(/`/g, ""));
    }
    return;
  }
  if(cmd === "prova"){
    const ps = r.provas.filter((p) => p.nome.includes(termo));
    if(!termo || !ps.length){ console.log("prova não encontrada; nomes: " + r.provas.map((p) => nomeCurto(p.nome)).join(", ")); return; }
    for(const p of ps){
      console.log(`\n${p.nome}: ${p.completas}/${p.total} completas`);
      p.questoes.filter((q) => q.faltas.length || q.ref !== "datada").forEach((q) => console.log(`  ${q.id}  ref:${q.ref}  ${q.faltas.join("; ")}`));
    }
    return;
  }
  if(cmd === "sem-diretriz"){ r.semDiretriz.forEach((s) => console.log(`${s.id}\t${nomeCurto(s.banco)}\t${s.motivo}`)); return; }
  console.log(resumo(r));
  if(!args.includes("--so-resumo")) escreverDocumentos(r);
}

if(import.meta.url === pathToFileURL(process.argv[1]).href) principal();
