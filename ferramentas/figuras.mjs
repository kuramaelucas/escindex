/* ferramentas/figuras.mjs — figuras desenhadas por código para as questões: o catálogo, uma figura avulsa e
   a lista do que ainda falta.

   Uso:
     node ferramentas/figuras.mjs listar                                     os modelos e os parâmetros de cada um
     node ferramentas/figuras.mjs gerar curvaRoc q-adap26-053 '{"expoente":4}'   grava dados/imagens/q-adap26-053.png
     node ferramentas/figuras.mjs pendentes [arquivo-de-dados]                questões com `imagemPendente`, por arquivo, com o modelo que serviria

   Quem é desenhável: o que é dado ou traçado (ECG, ritmo, CTG, curva ROC, heredograma, MAPA, EEG, capnograma,
   forest plot, dispersão). Radiografia, tomografia, ressonância, ultrassom, histologia e foto de lesão NÃO se
   desenham: um desenho não substitui o exame, então a questão espera a imagem real. */
import { pathToFileURL } from "node:url";
import { MODELOS } from "./figuras-modelos.mjs";
import { gerarPng } from "./lib-figuras.mjs";
import { carregar } from "./lib-dados.mjs";

const SUGESTOES = [
  [/eletrocardiograma|\becg\b|\bekg\b/i, "ecg12 (ou fibrilacaoAtrial para um ritmo)"], [/holter/i, "holter"], [/cardiotocograf|\bctg\b/i, "cardiotocografia"],
  [/\broc\b|curva roc/i, "curvaRoc"], [/heredograma|genealog/i, "heredograma"], [/capnogra/i, "capnograma"], [/\bmapa\b|monitoriza[cç][aã]o ambulatorial/i, "mapa"],
  [/\beeg\b|eletroencefalograma/i, "eeg"], [/forest|metan[aá]lise|raz[aã]o de risco.*estudos/i, "floresta"], [/dispers[aã]o|correla[cç][aã]o/i, "dispersao"],
];
const NAO_DESENHA = /radiograf|raio.?x|tomograf|resson[aâ]ncia|ultrassom|ultrassonograf|histolog|bi[oó]psia|foto|fotografia|dermatosc|fundo de olho|colposcop|endoscop|mamograf|cintilograf|angiograf|ecocardiograf/i;

export function sugerir(descricao){
  const s = SUGESTOES.find(([re]) => re.test(descricao));
  if(s) return `modelo ${s[1]}`;
  return NAO_DESENHA.test(descricao) ? "exame de imagem: não se desenha, espera a imagem real" : "sem modelo no catálogo: veja `listar` ou crie um modelo novo em figuras-modelos.mjs";
}

async function principal(){
  const [cmd, ...resto] = process.argv.slice(2);
  if(cmd === "listar"){
    Object.entries(MODELOS).forEach(([nome, m]) => console.log(`${nome.padEnd(18)} ${m.descricao}\n${"".padEnd(18)} parâmetros: ${m.parametros}`));
  } else if(cmd === "gerar"){
    const [nome, id, json] = resto;
    if(!MODELOS[nome] || !id){ console.error("uso: node ferramentas/figuras.mjs gerar <modelo> <id-da-questao> ['{\"parametro\":valor}']  (modelos: " + Object.keys(MODELOS).join(", ") + ")"); process.exit(1); }
    await gerarPng({ [id]: () => MODELOS[nome].desenhar(json ? JSON.parse(json) : undefined) });
  } else if(cmd === "pendentes"){
    const { arquivos } = carregar();
    let total = 0;
    for(const a of arquivos.filter(x => x.questoes && (!resto[0] || x.nome === resto[0]))){
      const lista = a.questoes.filter(q => q.imagemPendente);
      if(!lista.length) continue;
      total += lista.length;
      console.log(`${a.nome}: ${lista.length} questão(ões) esperando figura`);
      lista.forEach(q => console.log(`  ${q.id} — ${String(q.imagemPendente).replace(/\s+/g, " ").slice(0, 110)}\n      → ${sugerir(String(q.imagemPendente))}`));
    }
    console.log(total ? `\n${total} no total.` : "Nenhuma questão com imagemPendente.");
  } else {
    console.error("uso: node ferramentas/figuras.mjs listar | gerar <modelo> <id> [json] | pendentes [arquivo]"); process.exit(1);
  }
}
if(process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await principal();
