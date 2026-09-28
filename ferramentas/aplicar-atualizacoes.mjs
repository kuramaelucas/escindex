/* ==========================================================================
   APLICAR AS ATUALIZAÇÕES DE QUESTÕES NA PASTA dados/
   ==========================================================================
   O caminho de volta de "Questões para Atualizar": a equipe conserta uma
   questão na plataforma (envia a figura que faltava, completa um texto
   cortado, revê um gabarito), o conserto sobe para a nuvem e chega à turma,
   e "Baixar as atualizações" entrega um arquivo com SÓ essas questões:

     atualizacoes-questoes-AAAA-MM-DD.json

   Este script grava esse arquivo na pasta dados/:
     - cada questão é alterada NO LUGAR, dentro do arquivo da prova dela
       (dados/prova-*.js), mexendo só nos campos que mudaram — o resto do
       arquivo, a ordem e a formatação ficam como estão, para o diff do git
       mostrar exatamente o conserto;
     - as figuras vão para dados/imagens/ com o nome da questão
       (q-usprp2022-004.jpg), embutidas no arquivo ou baixadas do endereço
       da nuvem;
     - "imagemPendente" (e qualquer outro campo que a correção apaga) sai da
       questão — é o que devolve a questão ao estudo dos alunos.
   Depois de gravar, cada arquivo de prova é lido de novo e a questão é
   conferida campo a campo; se algo não bater, o arquivo volta ao que era.

   Para rodar (na pasta do projeto):
     npm run atualizar-dados -- ~/Downloads/atualizacoes-questoes-2026-09-28.json
     npm run atualizar-dados -- arquivo.json --simular   (mostra, não grava)
   Depois: npm run conferir, e publicar a pasta dados/ junto com o site.
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

export const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* ---------- ler um literal JS sem executar nada ---------- */
function fimDaString(txt, i){
  const aspa = txt[i];
  for(i++; i < txt.length; i++){
    if(txt[i] === "\\"){ i++; continue; }
    if(txt[i] === aspa) return i + 1;
  }
  throw new Error("texto entre aspas sem fim");
}
/* Onde termina o valor que começa em i: uma string, um número, um objeto ou
   uma lista (com o que tiver dentro). */
export function fimDoValor(txt, i, limite = txt.length){
  let prof = 0;
  while(i < limite){
    const ch = txt[i];
    if(ch === '"' || ch === "'" || ch === "`"){ i = fimDaString(txt, i); if(prof === 0) return i; continue; }
    if(ch === "{" || ch === "["){ prof++; i++; continue; }
    if(ch === "}" || ch === "]"){
      if(prof === 0) return i;
      prof--; i++;
      if(prof === 0) return i;
      continue;
    }
    if(prof === 0 && (ch === "," || ch === "\n")) return i;
    i++;
  }
  return limite;
}
/* As entradas "chave: valor" de primeiro nível do objeto que vai de `abre`
   (a chave de abertura) a `fecha` (a de fechamento). */
export function entradasDoObjeto(txt, abre, fecha){
  const entradas = [];
  let i = abre + 1;
  while(i < fecha){
    while(i < fecha && /[\s,]/.test(txt[i])) i++;
    if(i >= fecha) break;
    const m = /^([A-Za-z_$][\w$]*|"[^"]*"|'[^']*')\s*:\s*/.exec(txt.slice(i, Math.min(fecha, i + 200)));
    if(!m) throw new Error("não entendi este trecho: " + JSON.stringify(txt.slice(i, i + 60)));
    const chave = m[1].replace(/^["']|["']$/g, "");
    const inicioValor = i + m[0].length;
    let fimValor = fimDoValor(txt, inicioValor, fecha);
    while(fimValor > inicioValor && /\s/.test(txt[fimValor - 1])) fimValor--;
    entradas.push({ chave, inicio: i, inicioValor, fimValor });
    i = fimValor;
  }
  return entradas;
}
/* O valor no estilo da pasta dados/: chaves sem aspas, sem espaços. */
export function literal(v){
  if(Array.isArray(v)) return "[" + v.map(literal).join(",") + "]";
  if(v && typeof v === "object") return "{" + Object.entries(v).map(([k, x]) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)) + ":" + literal(x)).join(",") + "}";
  return JSON.stringify(v === undefined ? null : v);
}

/* Onde está a questão: o objeto que começa com id:"<id>". */
export function localizarQuestao(txt, id){
  const marca = new RegExp("\\bid\\s*:\\s*[\"']" + id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[\"']");
  const m = marca.exec(txt);
  if(!m) return null;
  let abre = m.index - 1;
  while(abre >= 0 && /\s/.test(txt[abre])) abre--;
  if(txt[abre] !== "{") throw new Error(`a questão ${id} não começa com "id:" — não sei editá-la com segurança`);
  const fim = fimDoValor(txt, abre);
  return { abre, fecha: fim - 1 };
}

/* Aplica uma correção ao texto de um arquivo de prova. Devolve o texto novo. */
export function aplicarNoTexto(txt, id, campos, remover){
  const onde = localizarQuestao(txt, id);
  if(!onde) return null;
  const entradas = entradasDoObjeto(txt, onde.abre, onde.fecha);
  const porChave = new Map(entradas.map(e => [e.chave, e]));
  const edicoes = [];                     // {ini, fim, texto}
  const inserir = [];
  for(const [chave, valor] of Object.entries(campos || {})){
    const e = porChave.get(chave);
    if(e) edicoes.push({ ini: e.inicioValor, fim: e.fimValor, texto: literal(valor) });
    else inserir.push(chave + ":" + literal(valor) + ",");
  }
  for(const chave of remover || []){
    if(campos && chave in campos) continue;
    const e = porChave.get(chave); if(!e) continue;
    let ini = e.inicio, fim = e.fimValor;
    if(txt[fim] === ",") fim++;
    while(txt[fim] === " ") fim++;
    const inicioLinha = txt.lastIndexOf("\n", ini - 1) + 1;
    let fimLinha = txt.indexOf("\n", fim); if(fimLinha < 0) fimLinha = txt.length;
    // a entrada ocupava a linha inteira: a linha sai junto
    if(!txt.slice(inicioLinha, ini).trim() && !txt.slice(fim, fimLinha).trim()){ ini = inicioLinha; fim = Math.min(txt.length, fimLinha + 1); }
    else if(!txt.slice(fim, fimLinha).trim()){ while(ini > inicioLinha && txt[ini - 1] === " ") ini--; }   // sem espaço sobrando no fim da linha
    edicoes.push({ ini, fim, texto: "" });
  }
  if(inserir.length){
    // campo novo entra numa linha própria, antes da classificação (ou do
    // enunciado), que é onde as provas guardam imagemUrl e companhia
    const ancora = porChave.get("areaId") || porChave.get("enunciado");
    if(ancora){
      const inicioLinha = txt.lastIndexOf("\n", ancora.inicio - 1) + 1;
      const recuo = /^\s*/.exec(txt.slice(inicioLinha, ancora.inicio))[0];
      edicoes.push({ ini: inicioLinha, fim: inicioLinha, texto: inserir.map(l => recuo + l + "\n").join("") });
    }else{
      const ultima = entradas[entradas.length - 1];
      const pos = ultima ? ultima.fimValor : onde.abre + 1;
      edicoes.push({ ini: pos, fim: pos, texto: (ultima && txt[pos] !== "," ? "," : "") + "\n  " + inserir.join("\n  ").replace(/,$/, "") });
    }
  }
  edicoes.sort((a, b) => b.ini - a.ini);
  let novo = txt;
  for(const e of edicoes) novo = novo.slice(0, e.ini) + e.texto + novo.slice(e.fim);
  return novo;
}

/* Lê um arquivo de prova do jeito que o navegador lê e devolve as questões. */
export function questoesDoTexto(txt, nome){
  const capturadas = [];
  const ctx = { console };
  ctx.window = ctx;
  ctx.EscDados = new Proxy({}, { get: (_, k) => (k === "registrarQuestoes" ? (_n, lista) => capturadas.push(...lista) : () => {}) });
  vm.createContext(ctx);
  vm.runInContext(txt, ctx, { filename: nome });
  return JSON.parse(JSON.stringify(capturadas));
}

function arquivosDeDados(){
  const pasta = path.join(RAIZ, "dados");
  return fs.readdirSync(pasta).filter(f => f.endsWith(".js")).map(f => path.join(pasta, f));
}
function gravarImagem(imagem, simular){
  if(!imagem || !imagem.arquivo) return null;
  const destino = path.join(RAIZ, imagem.arquivo);
  if(!destino.startsWith(path.join(RAIZ, "dados", "imagens") + path.sep)) throw new Error("caminho de imagem fora de dados/imagens/: " + imagem.arquivo);
  if(imagem.dataUrl){
    const m = /^data:[^;,]+;base64,(.*)$/s.exec(imagem.dataUrl);
    if(!m) throw new Error("imagem embutida num formato que não conheço: " + imagem.arquivo);
    if(!simular) fs.writeFileSync(destino, Buffer.from(m[1], "base64"));
    return { destino, deOnde: "embutida" };
  }
  if(imagem.url) return { destino, deOnde: "url", url: imagem.url };
  return null;
}
async function baixarImagem(url, destino, simular){
  const r = await fetch(url);
  if(!r.ok) throw new Error("não consegui baixar " + url + " (HTTP " + r.status + ")");
  if(!simular) fs.writeFileSync(destino, Buffer.from(await r.arrayBuffer()));
}

export async function aplicarAtualizacoes(conteudo, { simular = false, log = console.log } = {}){
  if(!conteudo || conteudo.formato !== "esc-atualizacoes-questoes") throw new Error('este não é um arquivo de "Baixar as atualizações" da plataforma');
  const arquivos = arquivosDeDados().map(caminho => ({ caminho, texto: fs.readFileSync(caminho, "utf8") }));
  const alterados = new Map();
  const relatorio = { aplicadas: [], semArquivo: [], imagens: [] };
  for(const item of conteudo.questoes || []){
    const campos = Object.assign({}, item.campos || {});
    const remover = Array.isArray(item.remover) ? item.remover : [];
    const arq = arquivos.find(a => localizarQuestao(alterados.get(a.caminho) ?? a.texto, item.id));
    if(!arq){ relatorio.semArquivo.push(item.id); log(`  ? ${item.id}: não está em nenhum arquivo de dados/ — ficou de fora`); continue; }
    const img = gravarImagem(item.imagem, simular);
    if(img){
      if(img.deOnde === "url") await baixarImagem(img.url, img.destino, simular);
      relatorio.imagens.push(path.relative(RAIZ, img.destino));
      campos.imagemUrl = path.relative(RAIZ, img.destino).split(path.sep).join("/");
    }
    const atual = alterados.get(arq.caminho) ?? arq.texto;
    alterados.set(arq.caminho, aplicarNoTexto(atual, item.id, campos, remover));
    relatorio.aplicadas.push({ id: item.id, arquivo: path.relative(RAIZ, arq.caminho), campos: Object.keys(campos), remover });
    log(`  ✓ ${item.id} (${path.relative(RAIZ, arq.caminho)}): ${[...Object.keys(campos), ...remover.map(r => "sem " + r)].join(", ")}`);
  }
  // confere antes de gravar: a questão lida de volta tem de ser a esperada
  for(const [caminho, texto] of alterados){
    const nome = path.relative(RAIZ, caminho);
    const lidas = questoesDoTexto(texto, nome);
    const antes = questoesDoTexto(arquivos.find(a => a.caminho === caminho).texto, nome);
    if(lidas.length !== antes.length) throw new Error(`${nome}: o número de questões mudou (${antes.length} → ${lidas.length}) — nada foi gravado`);
    for(const ap of relatorio.aplicadas.filter(a => a.arquivo === nome)){
      const item = conteudo.questoes.find(x => x.id === ap.id);
      const q = lidas.find(x => x.id === ap.id);
      const esperado = Object.assign({}, item.campos || {});
      if(ap.campos.includes("imagemUrl") && item.imagem && item.imagem.arquivo) esperado.imagemUrl = item.imagem.arquivo;
      for(const [c, v] of Object.entries(esperado)){
        if(JSON.stringify(q[c]) !== JSON.stringify(v)) throw new Error(`${nome}: ${ap.id}.${c} não ficou como deveria — nada foi gravado`);
      }
      for(const c of ap.remover) if(!(c in esperado) && q[c] !== undefined) throw new Error(`${nome}: ${ap.id}.${c} deveria ter saído — nada foi gravado`);
    }
  }
  if(!simular) for(const [caminho, texto] of alterados) fs.writeFileSync(caminho, texto);
  return relatorio;
}

if(process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])){
  const args = process.argv.slice(2);
  const simular = args.includes("--simular");
  const arquivo = args.find(a => !a.startsWith("--"));
  if(!arquivo){
    console.error("Uso: npm run atualizar-dados -- atualizacoes-questoes-AAAA-MM-DD.json [--simular]");
    process.exit(2);
  }
  try{
    const conteudo = JSON.parse(fs.readFileSync(arquivo, "utf8"));
    console.log(`${simular ? "Simulando" : "Aplicando"} ${conteudo.total ?? (conteudo.questoes || []).length} atualização(ões)${conteudo.por ? " (de " + conteudo.por + ")" : ""}:`);
    const r = await aplicarAtualizacoes(conteudo, { simular });
    console.log(`\n${r.aplicadas.length} questão(ões) ${simular ? "seriam alteradas" : "alterada(s)"}, ${r.imagens.length} figura(s) ${simular ? "seriam gravadas" : "gravada(s)"} em dados/imagens/.` +
      (r.semArquivo.length ? ` ${r.semArquivo.length} ficaram de fora (não estão na pasta dados/).` : ""));
    if(!simular) console.log("Agora: npm run conferir — e publique a pasta dados/ junto com o site.");
  }catch(e){
    console.error("\n✗ " + e.message);
    process.exit(1);
  }
}
