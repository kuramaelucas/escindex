/* ferramentas/anotar-conferencia.mjs — registra, no campo `referencias` de uma questão de dados/, o que foi
   conferido numa fonte (e o que ficou sem conferir).

   Por que existe: a conferência de uma referência (PubMed, site oficial, PDF da diretriz) só serve ao futuro se ficar
   escrita junto da questão, com a data e a fonte. Editar um arquivo de dados/ de 300 KB à mão é lento e erra aspas;
   esta ferramenta acha a questão pelo id, escapa o texto e confere o resultado carregando o conteúdo de novo
   (se algo estiver errado, o arquivo volta ao que era).

   Uso:
     node ferramentas/anotar-conferencia.mjs q-adap26-033 "Texto oficial lido (idsociety.org, IDSA 2026): …"
     node ferramentas/anotar-conferencia.mjs q-adap26-087 "texto novo" --troca "trecho antigo da referência"
     node ferramentas/anotar-conferencia.mjs q-adap26-033 "…" --simular      mostra o que mudaria e não grava

   Sem --troca, o texto vai no fim de `referencias`. Com --troca, o trecho antigo (que tem de aparecer uma única vez)
   é substituído, o que serve para trocar um "não conferido" por "conferido". Se o texto não trouxer uma data
   (DD/MM/AAAA), a ferramenta acrescenta "(conferido em <hoje>)". Não mexe no gabarito nem na explicação: mudança
   de conteúdo se faz à parte, com `npm run atualizar-dados` ou editando o arquivo, e se registra aqui também. */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { RAIZ, carregar } from "./lib-dados.mjs";

const TEM_DATA = /\b\d{2}\/\d{2}\/20\d{2}\b/;
export const hojeBR = () => new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });

/* Escapa para dentro de uma string entre aspas duplas, como os arquivos de dados/ escrevem. */
export const paraString = (t) => t.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\s*\n\s*/g, " ");

/* Devolve o novo texto do arquivo, ou lança Error com o motivo. Funciona nos dois formatos de dados/
   (`id:"q-…"` e `"id": "q-…"`). */
export function aplicarNota(texto, id, nota, troca){
  const mid = new RegExp(`"?id"?:\\s*"${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`).exec(texto);
  if(!mid) throw new Error(`id ${id} não encontrado no arquivo`);
  const mref = /"?referencias"?:\s*"/.exec(texto.slice(mid.index + mid[0].length));
  if(!mref) throw new Error(`a questão ${id} não tem o campo referencias`);
  const ini = mid.index + mid[0].length + mref.index;
  const fim = texto.indexOf("\n", ini);
  const linha = texto.slice(ini, fim);
  const m = /^(.*?referencias"?:\s*")(.*?)("\s*,?\s*)$/.exec(linha);
  if(!m) throw new Error(`não entendi o fim da linha de referencias de ${id}`);
  const novaNota = paraString(nota);
  let corpo;
  if(troca){
    const velho = paraString(troca);
    const n = m[2].split(velho).length - 1;
    if(n !== 1) throw new Error(`o trecho a trocar aparece ${n} vez(es) em ${id}; precisa aparecer uma só`);
    corpo = m[2].replace(velho, () => novaNota);
  } else {
    corpo = `${m[2].trimEnd()} ${novaNota}`;
  }
  return texto.slice(0, ini) + m[1] + corpo + m[3] + texto.slice(fim);
}

function principal(){
  const args = process.argv.slice(2);
  const simular = args.includes("--simular");
  const iTroca = args.indexOf("--troca");
  const troca = iTroca >= 0 ? args[iTroca + 1] : "";
  const posicionais = args.filter((a, i) => !a.startsWith("--") && !(iTroca >= 0 && i === iTroca + 1));
  const [id, notaBruta] = posicionais;
  if(!id || !notaBruta){
    console.error('uso: node ferramentas/anotar-conferencia.mjs <id-da-questão> "<nota>" [--troca "<trecho antigo>"] [--simular]');
    process.exit(2);
  }
  const nota = TEM_DATA.test(notaBruta) ? notaBruta : `${notaBruta.replace(/\s*$/, "")} (conferido em ${hojeBR()})`;

  const { arquivos } = carregar();
  const arq = arquivos.find((a) => (a.questoes || []).some((q) => q.id === id));
  if(!arq){ console.error(`questão ${id} não encontrada em dados/`); process.exit(1); }
  const caminho = path.join(RAIZ, "dados", arq.nome + ".js");
  const original = fs.readFileSync(caminho, "utf8");
  let novo;
  try { novo = aplicarNota(original, id, nota, troca); }
  catch(e){ console.error("erro: " + e.message); process.exit(1); }

  if(simular){
    const antes = arq.questoes.find((q) => q.id === id).referencias;
    console.log(`[simulação] ${arq.nome} · ${id}\nantes : ${antes}\nnota  : ${nota}`);
    return;
  }
  fs.writeFileSync(caminho, novo);
  try {
    const depois = carregar().arquivos.find((a) => a.nome === arq.nome).questoes.find((q) => q.id === id).referencias;
    if(!depois.includes(nota)) throw new Error("a nota não apareceu em referencias depois de gravar");
  } catch(e){
    fs.writeFileSync(caminho, original);
    console.error("erro: " + e.message + " — o arquivo foi restaurado");
    process.exit(1);
  }
  console.log(`ok: ${arq.nome} · ${id} anotada. Ao fim da rodada: npm run publicar e npm run testar-mudanca.`);
}

if(import.meta.url === pathToFileURL(process.argv[1]).href) principal();
