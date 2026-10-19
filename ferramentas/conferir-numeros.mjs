/* ferramentas/conferir-numeros.mjs — acha questões em que o número do enunciado não é o da explicação.

   Defeito que isso pega (aconteceu no Simulado EPM 2): a explicação dizia "11 minutos de parada" e o
   enunciado "9 minutos de reanimação". Quem escreve e quem revisa o próprio texto não vê.

   Uso:
     node ferramentas/conferir-numeros.mjs banco-simulado-epm-2        um arquivo de questões de dados/
     node ferramentas/conferir-numeros.mjs --todos                     os bancos de ferramentas/bancos-adaptados.json
     node ferramentas/conferir-numeros.mjs banco-x --exigir            sai com código 1 se houver suspeita

   Como decide: junta cada número à unidade que vem logo depois ("9 minutos", "36 anos", "72 mg/dL").
   Para cada unidade que aparece nos DOIS textos, a questão é suspeita quando o enunciado tem um valor
   que a explicação não repete E a explicação tem um valor que o enunciado não traz. Valor calculado pela
   explicação (soma de escore, conversão de unidade) aparece em outra unidade ou sem unidade, então
   passa; o que sobra é lista para um humano olhar, não veredito. */
import { pathToFileURL } from "node:url";
import { carregar } from "./lib-dados.mjs";
import { lerBancos } from "./medir-banco-adaptado.mjs";

const UNIDADES = "anos?|meses|mes|dias?|semanas?|horas?|h|minutos?|min|segundos?|seg|mg\\/dl|mg\\/kg|mg\\/l|mg|mcg|g\\/dl|g\\/l|g|kg|ml\\/kg|ml\\/min|ml|l|mmhg|cmh2o|bpm|irpm|rpm|mmol\\/l|meq\\/l|ui|u\\/l|%|°c|cm|mm|m|\\/mm³|\\/mm3|mil\\/mm³|mosm\\/kg|kcal|mmhg";
const NUM = "\\d{1,3}(?:\\.\\d{3})+(?:,\\d+)?|\\d+(?:,\\d+)?";
const PAR = new RegExp(`(?<![\\d,.])(${NUM})\\s*(${UNIDADES})(?![a-zà-ú0-9²³])`, "gi");
const sinonimo = { ano: "anos", anos: "anos", mes: "meses", meses: "meses", dia: "dias", dias: "dias", semana: "semanas", semanas: "semanas", hora: "horas", horas: "horas", h: "horas", minuto: "minutos", minutos: "minutos", min: "minutos", segundo: "segundos", segundos: "segundos", seg: "segundos", mmh2o: "cmh2o" };

/* palavras que mostram que o número é um limite, não um dado do caso: a explicação cita corte, alvo e
   valor normal ao lado do dado do caso, e isso não é divergência */
const LIMIAR = /(corte|normal|alvo|limite|meta|m[ií]nim|m[aá]xim|pelo menos|no m[aá]ximo|acima|abaixo|maior|menor|mais de|menos de|at[eé]|a partir|superior|inferior|igual ou|ou mais|ou menos|refer[eê]ncia|ideal|faixa|entre|equivale|cada)/i;

export function paresNumeroUnidade(texto, { ignorarLimiares = false } = {}){
  const mapa = new Map(), limpo = String(texto || "").replace(/\*\*/g, "");
  for(const m of limpo.matchAll(PAR)){
    if(ignorarLimiares && LIMIAR.test(limpo.slice(Math.max(0, m.index - 50), m.index) + " " + limpo.slice(m.index + m[0].length, m.index + m[0].length + 25))) continue;
    const u = m[2].toLowerCase(), un = sinonimo[u] || u;
    const valor = m[1].replace(/\./g, "").replace(",", ".");
    if(!mapa.has(un)) mapa.set(un, new Set());
    mapa.get(un).add(String(Number(valor)));
  }
  return mapa;
}

/* Só a primeira frase depois de "Dicas do enunciado:" (ou "Dicas da imagem:") repete os dados do caso; o resto
   da explicação é conteúdo (cortes, escores, outros casos) e traria números que nunca estiveram no enunciado */
export function dicasDoEnunciado(explicacao){
  const t = String(explicacao || ""), i = t.search(/Dicas d[oa] (enunciado|imagem):/i);
  if(i < 0) return "";
  const resto = t.slice(i).replace(/^Dicas d[oa] (enunciado|imagem):/i, "");
  const fim = resto.search(/[.;:] (?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ])/);
  return fim < 0 ? resto : resto.slice(0, fim + 1);
}

/* [{ unidade, soNoEnunciado:[...], soNaExplicacao:[...] }] */
export function divergencias(enunciado, explicacao){
  const e = paresNumeroUnidade(enunciado), x = paresNumeroUnidade(dicasDoEnunciado(explicacao), { ignorarLimiares: true }), saida = [];
  for(const [u, ve] of e){
    if(!x.has(u)) continue;
    const vx = x.get(u);
    const soE = [...ve].filter(v => !vx.has(v)), soX = [...vx].filter(v => !ve.has(v));
    if(soE.length && soX.length) saida.push({ unidade: u, soNoEnunciado: soE, soNaExplicacao: soX });
  }
  return saida;
}

export function conferirQuestoes(questoes){
  const achados = [];
  questoes.forEach((q, i) => {
    const d = divergencias(q.enunciado, q.explicacaoGeral);
    if(d.length) achados.push({ pos: i + 1, id: q.id, divergencias: d });
  });
  return achados;
}

function principal(){
  const args = process.argv.slice(2), exigir = args.includes("--exigir");
  const nomes = args.includes("--todos") ? Object.keys(lerBancos()) : args.filter(a => !a.startsWith("--"));
  if(!nomes.length){ console.error("uso: node ferramentas/conferir-numeros.mjs <arquivo-de-questoes> | --todos [--exigir]"); process.exit(1); }
  const { arquivos } = carregar();
  let total = 0;
  for(const nome of nomes){
    const a = arquivos.find(x => x.nome === nome);
    if(!a || !a.questoes){ console.error(`${nome} não é um arquivo de questões de dados/`); process.exit(1); }
    const achados = conferirQuestoes(a.questoes); total += achados.length;
    console.log(`${nome}: ${achados.length} questão(ões) com número diferente entre enunciado e explicação (de ${a.questoes.length})`);
    achados.forEach(x => x.divergencias.forEach(d => console.log(`  posição ${x.pos} (${x.id}) — ${d.unidade}: só no enunciado ${d.soNoEnunciado.join(", ")}; só na explicação ${d.soNaExplicacao.join(", ")}`)));
  }
  if(exigir && total) process.exit(1);
}
if(process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) principal();
