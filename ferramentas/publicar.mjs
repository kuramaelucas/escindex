/* ==========================================================================
   PUBLICAR — o passo único antes de subir: versão automática + catálogo
   ==========================================================================
     npm run publicar               atualiza a versão no index.html e regera dados/CATALOGO.md
     npm run publicar -- --conferir só confere (não grava): sai com erro se algo estiver velho
                                    (é o que o teste de higiene e o CI rodam)

   A VERSÃO (window.ESC_VERSAO, no index.html) tem o formato
   AAAA-MM-DD.cHASH.dHASH, e quem a escreve é esta ferramenta — ninguém troca à mão:
     cHASH  vem do código  (codigo/, sw.js, manifest, o index.html fora a linha da versão)
     dHASH  vem do conteúdo (dados/*.js)
   O navegador pede codigo/ com ?v=cHASH e dados/ com ?v=dHASH. Resultado: mudar
   a plataforma não faz ninguém baixar as questões de novo, e acrescentar uma
   prova não refaz o download do código. A data só muda quando algum hash muda.

   O CATÁLOGO (dados/CATALOGO.md) é a tabela do que há em dados/, gerada do
   próprio conteúdo: contagens que nunca envelhecem, sem ninguém atualizar
   número em documento.
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { RAIZ, carregar } from "./lib-dados.mjs";
import { resumoDaProva } from "./dados.mjs";
import { resumirNumeros } from "../testes/conferir-dados.mjs";

const INDEX = path.join(RAIZ, "index.html");
const CATALOGO = path.join(RAIZ, "dados", "CATALOGO.md");
const LINHA_VERSAO = /(window\.ESC_VERSAO\s*=\s*")([^"]*)(")/;

const listar = pasta => fs.readdirSync(path.join(RAIZ, pasta)).filter(f => /\.(js|css)$/.test(f)).sort().map(f => pasta + "/" + f);

function hashDe(arquivos, normalizar = (rel, buf) => buf){
  const h = crypto.createHash("sha256");
  for(const rel of arquivos){
    h.update(rel + "\0");
    h.update(normalizar(rel, fs.readFileSync(path.join(RAIZ, rel))));
  }
  return h.digest("hex").slice(0, 8);
}

/* O index.html entra no hash do código, menos a própria linha da versão (senão
   gravar a versão mudaria o hash para sempre). */
export function hashes(){
  const semVersao = (rel, buf) => rel === "index.html" ? Buffer.from(buf.toString("utf8").replace(LINHA_VERSAO, "$1$3")) : buf;
  return {
    codigo: hashDe([...listar("codigo"), "sw.js", "manifest.webmanifest", "index.html"], semVersao),
    dados: hashDe(listar("dados")),
  };
}

export function versaoGravada(){
  const m = LINHA_VERSAO.exec(fs.readFileSync(INDEX, "utf8"));
  return m ? m[2] : "";
}

/* A versão que o conteúdo atual pede: a gravada, se os dois hashes ainda
   batem; senão uma nova, com a data de hoje. */
export function versaoEsperada(){
  const h = hashes(), atual = versaoGravada(), p = atual.split(".");
  if(p[1] === "c" + h.codigo && p[2] === "d" + h.dados) return atual;
  return `${new Date().toISOString().slice(0, 10)}.c${h.codigo}.d${h.dados}`;
}

export function catalogo(){
  const { D, arquivos } = carregar();
  const reais = D.questoes.filter(q => q.real).length;
  const linhas = [
    "# Catálogo de `dados/`", "",
    "> Gerado por `npm run publicar` a partir do próprio conteúdo — **não edite**. A ordem é a de",
    "> carga (`dados/manifesto.js`). Para o detalhe de uma prova ou questão sem abrir arquivo: `npm run dados`.", "",
    `**Total:** ${D.questoes.length} questões (${reais} reais, ${D.questoes.length - reais} autorais), ${D.flashcards.length} cartões, ` +
      `${D.taxonomia.assuntos.length} assuntos, ${D.simulados.length} simulado(s), ${arquivos.length} arquivos.`, "",
    "| Arquivo | O que é | Itens | Observações |", "| --- | --- | ---: | --- |",
  ];
  for(const a of arquivos){
    let obs = "";
    if(a.questoes){
      const r = resumoDaProva(a);
      obs = [r.faltam.length ? `faltam ${resumirNumeros(r.faltam)}` : "", r.anuladas.length ? `${r.anuladas.length} anulada(s)` : "",
        r.semFigura.length ? `${r.semFigura.length} esperando figura` : ""].filter(Boolean).join("; ");
    }
    linhas.push(`| \`${a.nome}.js\` | ${a.titulo.replace(/\|/g, "/")} | ${a.itens} ${a.tipo} | ${obs} |`);
  }
  return linhas.join("\n") + "\n";
}

if(process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])){
  const soConferir = process.argv.includes("--conferir");
  const versao = versaoEsperada(), cat = catalogo();
  const velhaVersao = versao !== versaoGravada();
  const velhoCatalogo = !fs.existsSync(CATALOGO) || fs.readFileSync(CATALOGO, "utf8") !== cat;
  if(soConferir){
    if(velhaVersao) console.error(`A versão do index.html (${versaoGravada()}) está velha — o código ou o conteúdo mudou. Rode: npm run publicar`);
    if(velhoCatalogo) console.error("dados/CATALOGO.md está velho — o conteúdo mudou. Rode: npm run publicar");
    process.exit(velhaVersao || velhoCatalogo ? 1 : 0);
  }
  if(velhaVersao) fs.writeFileSync(INDEX, fs.readFileSync(INDEX, "utf8").replace(LINHA_VERSAO, `$1${versao}$3`));
  if(velhoCatalogo) fs.writeFileSync(CATALOGO, cat);
  const antes = versaoGravada();
  console.log(velhaVersao ? `Versão: ${versao}` : `Versão já em dia: ${antes}`);
  console.log(velhoCatalogo ? "dados/CATALOGO.md atualizado." : "dados/CATALOGO.md já em dia.");
}
