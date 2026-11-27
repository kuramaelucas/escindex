/* ferramentas/auditoria-didatica.mjs — projeto de didática das explicações (docs/PROJETO-DIDATICA.md).

   Mede, por prova, o quanto cada explicação ENSINA, além de justificar: (1) traz o conceito-chave como regra
   que vale fora do caso; (2) trata cada alternativa errada com frase própria, com o erro específico e em que situação
   aquela opção seria a certa; (3) avisa a armadilha ("Como não errar"). É heurística por palavra e tamanho: serve para
   dimensionar e ordenar a fila, NÃO para aprovar (quem aprova é a leitura). Não grava em dados/.

   Uso:
     npm run didatica                          resumo por prova das bancas do projeto (unifesp, usp, iamspe)
     npm run didatica -- <prova> [--fila N]    questões da prova da mais rasa à mais funda (N primeiras; padrão 25)
     npm run didatica -- q-<id>                a medida de uma questão e o trecho de cada errada
*/
import { pathToFileURL } from "node:url";
import { carregar } from "./lib-dados.mjs";

const BANCAS = /^prova-(unifesp|usp-|iamspe)/;
const nomeCurto = (n) => n.replace(/^(banco|prova)-/, "");
const semAcento = (t) => String(t).normalize("NFD").replace(/[̀-ͯ]/g, "");

/* As explicações do banco usam formatos variados: "B) Errada: …", "B está errada porque …", "C fica para …",
   "A e C estão erradas …" e a menção no meio do texto "Artrite séptica (alternativa A) exigiria …". O analisador
   divide em frases e atribui cada uma à letra que ela abre (as frases seguintes, sem letra, continuam a mesma letra
   até um rótulo como "Epidemiologia:"). A letra do gabarito nunca é "errada". */
const ABRE_LETRA = /^(?:([A-E])\)|([A-E])(?: e ([A-E]))?\s+(?:est[aá]o?|est[aã]o|fica(?:m)?|serve|seria|[eé]\s|trata|corresponde|descreve|define|exige|indica|pode|não|nao|cita|apresenta|propõe|propoe|refere))/;
const ROTULO = /^(?:Fisiopatologia|Epidemiologia|Como n[aã]o errar|Conceito-chave|Refer[eê]ncias|Dicas)/i;
const QUANDO_SERIA = /(seria (a )?(correta|certa|indicad|adequad|a escolha|a op)|ser[ií]a|[eé] indicad[ao] (quando|se|em|para)|indicad[ao] (quando|se|em|para)|reserva-se|fica(ria)? para|serve para|trata (de|a|o)|quando (houver|ha|há|o |a |se )|se (o|a|os|as) (paciente|quadro|caso)|vale para|[eé] a (conduta|escolha|op[cç][aã]o) (de|na|no|quando|para)|correspond[ea] a|descreve|define|exigiria|seria preciso|seria o caso|aplica-se|cabe (quando|em|se)|de quem|[eé] (a )?(janela|manobra|m[eé]todo|t[eé]cnica|posi[cç][aã]o|d[eé]ficit|dia|a[cç][aã]o|n[ií]vel|causa|marcador|achado|exame|f[aá]rmaco|droga|tratamento) (de|da|do|prim|em|para|que)|cuida de|atua (antes|em|sobre)|protege|refletem|medem|contribui|proeminente|prim[aá]rio em|[eé] o d[eé]ficit)/i;
const CONCEITO = /conceito[- ]chave\s*:|regra (geral|de ouro)\s*:|ideia central\s*:/i;
const ARMADILHA = /como n[aã]o errar\s*:|armadilha\s*:|pegadinha\s*:/i;

/* Letras citadas no meio da frase: "(A, C)", "(alternativa A)", "A (só antibiótico)", "B e C são …", "B; C". */
function letrasCitadas(f){
  const out = new Set();
  for(const m of f.matchAll(/\(((?:alternativas?\s+)?[A-E](?:\s*(?:,|;|e|ou|a)\s*[A-E])*)\)/g)) for(const l of m[1].match(/[A-E]/g) || []) out.add(l);
  for(const m of f.matchAll(/(?:^|[\s;,])([A-E])\s*\(/g)) out.add(m[1]);
  for(const m of f.matchAll(/(?:^|[\s;,])([A-E])\s+e\s+([A-E])\s+(?:s[aã]o|est[aã]o|fica|ficam|n[aã]o)/g)){ out.add(m[1]); out.add(m[2]); }
  return [...out];
}

/* Separa a explicação em: corpo (o que não é motivo de errada) e, por letra errada, o texto e o quanto dele é só dela.
   Uma frase que cita várias letras é "compartilhada": conta como tratada, mas não como motivo próprio. */
export function partesDaExplicacao(txt, gabarito = "", porAlternativa = {}){
  const gab = gabarito.toUpperCase();
  const frases = String(txt || "").replace(/\s+/g, " ").split(/(?<=[.;!?])\s+(?=[A-ZÁÉÍÓÚ(*])/);
  const erradas = {}; let corpo = ""; let atual = [];
  const dar = (l, f, propria) => { const e = erradas[l] || (erradas[l] = { texto: "", propria: 0 }); e.texto += (e.texto ? " " : "") + f; if(propria) e.propria += f.length; };
  for(const f of frases){
    if(ROTULO.test(f)){ atual = []; corpo += f + " "; continue; }
    if(/^A alternativa [A-E] est[aá] correta/.test(f)){ corpo += f + " "; atual = []; continue; }
    const ab = ABRE_LETRA.exec(f);
    const abre = ab ? [ab[1] || ab[2], ab[3]].filter(Boolean) : [];
    const cit = letrasCitadas(f);
    const alvo = [...new Set([...abre, ...cit])].filter((l) => l !== gab);
    if(alvo.length){ atual = abre.length ? alvo : []; for(const l of alvo) dar(l, f, alvo.length === 1); }
    else if(atual.length){ for(const l of atual) dar(l, f, atual.length === 1); }
    else corpo += f + " ";
  }
  for(const [l, t] of Object.entries(porAlternativa || {})) if(t && l.toUpperCase() !== gab) dar(l.toUpperCase(), t, true);
  return { corpo, erradas };
}

/* A medida de uma questão de múltipla escolha ativa; devolve null para anulada/dissertativa. */
export function medirDidatica(q){
  if(q.status === "anulada" || q.tipo === "dissertativa") return null;
  const expl = String(q.explicacaoGeral || "");
  const alts = q.alternativas || [];
  const gab = String(q.gabarito || "").toUpperCase();
  const { corpo, erradas } = partesDaExplicacao(expl, gab, q.explicacoesAlternativas);
  const letras = alts.map((a, i) => (a && a.id) || String.fromCharCode(65 + i)).filter((l) => l !== gab);
  const textos = letras.map((l) => (erradas[l] || {}).texto || "");
  const proprias = letras.map((l) => (erradas[l] || {}).propria || 0);
  const m = {
    id: q.id, total: expl.length, corpo: corpo.length, nErradas: letras.length,
    tratadas: textos.filter((t) => t.length > 0).length,
    rasas: proprias.filter((n) => n < 90).length,
    compartilhadas: letras.filter((l, i) => textos[i] && proprias[i] === 0).length,
    comQuando: textos.filter((t) => QUANDO_SERIA.test(t)).length,
    mediaErrada: textos.length ? Math.round(textos.reduce((s, t) => s + t.length, 0) / textos.length) : 0,
    conceito: CONCEITO.test(expl), armadilha: ARMADILHA.test(expl),
    formatoNovo: /[A-E]\)\s*Errada:/.test(expl),
  };
  /* "Funda" = conceito-chave + toda errada com >= 90 caracteres e metade ou mais dizendo quando seria certa. */
  m.completa = m.conceito && m.tratadas === m.nErradas && m.rasas === 0 && m.comQuando >= Math.ceil(m.nErradas * 0.5);
  /* pontuação só para ordenar a fila: quanto menor, mais rasa */
  m.nota = (m.conceito ? 3 : 0) + (m.armadilha ? 1 : 0) + m.comQuando * 1.5 + (m.nErradas - m.rasas) + Math.min(m.total, 3000) / 600;
  return m;
}

function resumoDaProva(arq){
  const ms = (arq.questoes || []).map(medirDidatica).filter(Boolean);
  const n = ms.length || 1;
  const pct = (k) => Math.round((100 * ms.filter(k).length) / n);
  return { nome: arq.nome, n: ms.length,
    conceito: pct((m) => m.conceito), armadilha: pct((m) => m.armadilha), formatoNovo: pct((m) => m.formatoNovo),
    todasTratadas: pct((m) => m.tratadas === m.nErradas), erradaRasa: pct((m) => m.rasas > 0),
    comQuando: pct((m) => m.comQuando >= Math.ceil(m.nErradas * 0.5)),
    mediaTotal: Math.round(ms.reduce((s, m) => s + m.total, 0) / n),
    mediaErrada: Math.round(ms.reduce((s, m) => s + m.mediaErrada, 0) / n),
    completas: ms.filter((m) => m.completa).length };
}

function tabela(rs){
  const col = (v, w) => String(v).padStart(w);
  console.log("prova".padEnd(28) + col("ativas", 7) + col("concei%", 8) + col("armad%", 7) + col("fmtNovo%", 9) + col("todas%", 7) + col("rasa%", 6) + col("quando%", 8) + col("chars", 7) + col("c/errada", 9) + col("funda", 6));
  for(const r of rs) console.log(nomeCurto(r.nome).padEnd(28) + col(r.n, 7) + col(r.conceito, 8) + col(r.armadilha, 7) + col(r.formatoNovo, 9) + col(r.todasTratadas, 7) + col(r.erradaRasa, 6) + col(r.comQuando, 8) + col(r.mediaTotal, 7) + col(r.mediaErrada, 9) + col(r.completas, 6));
  console.log("\nconcei% = traz 'Conceito-chave:'; armad% = traz 'Como não errar:'; fmtNovo% = erradas em 'X) Errada:'; todas% = todas as erradas tratadas;\nrasa% = ao menos uma errada com motivo PRÓPRIO < 90 caracteres (frase que junta várias letras não conta como própria); quando% = >= 50% das erradas dizem em que situação seriam certas; funda = cumpre tudo.");
}

function principal(){
  const args = process.argv.slice(2);
  const { arquivos } = carregar();
  const alvo = args.find((a) => !a.startsWith("--"));
  if(alvo && /^q-/.test(alvo)){
    for(const arq of arquivos) for(const q of arq.questoes || []) if(q.id === alvo){
      const m = medirDidatica(q);
      console.log(JSON.stringify(m, null, 1));
      for(const [l, t] of Object.entries(partesDaExplicacao(q.explicacaoGeral, q.gabarito, q.explicacoesAlternativas).erradas)) console.log(`\n[${l}] (${t.texto.length} car., própria ${t.propria}) ${t.texto}`);
      return;
    }
    console.log("questão não encontrada"); return;
  }
  if(alvo){
    const arq = arquivos.find((a) => a.nome === alvo || a.nome === "prova-" + alvo);
    if(!arq){ console.log("prova não encontrada"); return; }
    const iN = args.indexOf("--fila"); const N = iN >= 0 ? +args[iN + 1] : 25;
    const ms = arq.questoes.map(medirDidatica).filter(Boolean).sort((a, b) => a.nota - b.nota).slice(0, N);
    for(const m of ms) console.log(`${m.id}  nota ${m.nota.toFixed(1)}  ${m.total} car.  erradas ${m.tratadas}/${m.nErradas}  rasas ${m.rasas}  quando ${m.comQuando}  conceito ${m.conceito ? "sim" : "não"}`);
    return;
  }
  tabela(arquivos.filter((a) => a.tipo === "questões" && BANCAS.test(a.nome)).map(resumoDaProva));
}
if(import.meta.url === pathToFileURL(process.argv[1]).href) principal();
