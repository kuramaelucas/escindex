/* ==========================================================================
   MAPA DO CÓDIGO — onde está cada coisa, com a linha, sem abrir arquivo
   ==========================================================================
   Para achar o trecho certo antes de ler (e ler só ele):

     npm run mapa                  todos os arquivos de codigo/, na ordem de
                                   carga, com as seções de cada um
     npm run mapa -- 11c           um arquivo: seções e as funções de cada
                                   seção, com a linha
     npm run mapa -- feedback      busca em nomes de função, seções e
                                   descrições: arquivo:linha de cada achado

   (Ou node ferramentas/mapa-do-codigo.mjs …, sem o cabeçalho do npm.)
   As linhas saem do arquivo como ele está agora — o mapa nunca envelhece.
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/* ESC_RAIZ troca a pasta do projeto — é como os testes das ferramentas
   trabalham numa cópia, sem tocar na pasta de verdade. */
export const RAIZ = process.env.ESC_RAIZ || path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* Os arquivos de codigo/ na ordem de carga (ESC_ARQUIVOS.codigo). */
export function arquivosDeCodigo(){
  const html = fs.readFileSync(path.join(RAIZ, "index.html"), "utf8");
  const lista = /codigo:\s*\[([^\]]*)\]/.exec(html);
  return lista ? [...lista[1].matchAll(/"([^"]+)"/g)].map(m => "codigo/" + m[1] + ".js") : [];
}

/* Seções (títulos numerados entre linhas de ====, e subtítulos /* ---- x ----)
   e funções de primeiro nível de um arquivo. */
export function mapaDoArquivo(rel){
  const L = fs.readFileSync(path.join(RAIZ, rel), "utf8").split("\n");
  const cab = /^\/\* codigo\/\S+ — (.*)$/.exec(L[0] || "");
  const secoes = [], funcoes = [];
  L.forEach((l, i) => {
    const n = i + 1;
    if(/^\/\* =+\s*$/.test(l) && L[i + 1] && /^\s+\S/.test(L[i + 1])) secoes.push({ linha: n, titulo: L[i + 1].trim(), nivel: 1 });
    const sub = /^\/\* -{3,} ?([^-].*?)\s*-*\s*(\*\/)?$/.exec(l);
    if(sub && sub[1].trim()) secoes.push({ linha: n, titulo: sub[1].trim(), nivel: 2 });
    // subtítulo em caixa alta no começo de um comentário: /* FEEDBACK DA PLATAFORMA (…
    const alto = !sub && /^\/\* ([A-ZÀ-Ý][A-ZÀ-Ý0-9]+(?:[ -][A-ZÀ-Ý0-9][A-ZÀ-Ý0-9/]*)+)/.exec(l);
    if(alto && !/^\/\* =/.test(l)) secoes.push({ linha: n, titulo: alto[1].trim(), nivel: 2 });
    const f = /^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\)/.exec(l);
    if(f) funcoes.push({ linha: n, nome: f[1], params: f[2].trim() });
    const c = /^(?:const|let)\s+([A-Z_][A-Z0-9_]*)\s*=/.exec(l);   // constantes em CAIXA ALTA (CONFIG, NUVEM_TABELAS…)
    if(c) funcoes.push({ linha: n, nome: c[1], params: null });
  });
  return { rel, linhas: L.length - (L[L.length - 1] === "" ? 1 : 0), descricao: cab ? cab[1] : "", secoes, funcoes };
}

function imprimirArquivo(m, comFuncoes){
  console.log(`${m.rel} (${m.linhas} linhas) — ${m.descricao}`);
  const sec = m.secoes.length ? m.secoes : [{ linha: 1, titulo: "(início)", nivel: 1 }];
  sec.forEach((s, k) => {
    console.log(`  ${String(s.linha).padStart(5)}  ${s.nivel === 2 ? "  · " : ""}${s.titulo}`);
    if(!comFuncoes) return;
    const ate = k + 1 < sec.length ? sec[k + 1].linha : Infinity;
    const dentro = m.funcoes.filter(f => f.linha >= s.linha && f.linha < ate);
    const antes = k === 0 ? m.funcoes.filter(f => f.linha < s.linha) : [];
    const todas = [...antes, ...dentro];
    if(todas.length) console.log("         " + todas.map(f => `${f.linha} ${f.nome}`).join(" · "));
  });
}

if(process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])){
  const termo = (process.argv[2] || "").trim();
  const arquivos = arquivosDeCodigo();
  const mapas = arquivos.map(mapaDoArquivo);
  if(!termo){
    mapas.forEach(m => imprimirArquivo(m, false));
    console.log(`\n${arquivos.length} arquivos, ${mapas.reduce((s, m) => s + m.linhas, 0)} linhas. Detalhe de um arquivo: npm run mapa -- 11c · busca: npm run mapa -- palavra`);
  }else{
    const doArquivo = mapas.filter(m => path.basename(m.rel).startsWith(termo) || path.basename(m.rel, ".js") === termo);
    if(doArquivo.length){
      doArquivo.forEach(m => imprimirArquivo(m, true));
    }else{
      const t = termo.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      const norm = x => String(x).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      let achados = 0;
      mapas.forEach(m => {
        const aqui = [
          ...m.funcoes.filter(f => norm(f.nome).includes(t)).map(f => `${m.rel}:${f.linha}  ${f.nome}${f.params !== null ? "(" + f.params + ")" : ""}`),
          ...m.secoes.filter(s => norm(s.titulo).includes(t)).map(s => `${m.rel}:${s.linha}  [seção] ${s.titulo}`),
        ];
        if(!aqui.length && norm(m.descricao).includes(t)) aqui.push(`${m.rel}:1  [arquivo] ${m.descricao}`);
        aqui.forEach(x => console.log(x)); achados += aqui.length;
      });
      if(!achados) console.log(`Nada com "${termo}" em nomes de função, seções ou descrições. Tente: grep -rn "${termo}" codigo/`);
    }
  }
}
