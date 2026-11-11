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
   O navegador pede codigo/ com ?v=cHASH e cada dados/X.js com o hash do próprio X (ESC_HASH_DADOS). Resultado: mudar
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
import { resumirNumeros, conferir } from "../testes/conferir-dados.mjs";
import { gravarIndices, indicesEmDia } from "./lib-indice.mjs";

const INDEX = path.join(RAIZ, "index.html");
const CATALOGO = path.join(RAIZ, "dados", "CATALOGO.md");
const LINHA_VERSAO = /(window\.ESC_VERSAO\s*=\s*")([^"]*)(")/;
const LINHA_HASHES = /window\.ESC_HASH_DADOS\s*=\s*\{[^}]*\};/;

const listar = pasta => fs.readdirSync(path.join(RAIZ, pasta)).filter(f => /\.(js|css)$/.test(f)).sort().map(f => pasta + "/" + f);

function hashDe(arquivos, normalizar = (rel, buf) => buf){
  const h = crypto.createHash("sha256");
  for(const rel of arquivos){
    h.update(rel + "\0");
    h.update(normalizar(rel, fs.readFileSync(path.join(RAIZ, rel))));
  }
  return h.digest("hex").slice(0, 8);
}

/* Um hash por arquivo de dados/: prova nova ou corrigida muda só o endereço
   dela, e o aluno baixa só ela (antes um hash único refazia o download de tudo). */
export function hashesPorArquivo(){
  const mapa = {};
  for(const rel of listar("dados").filter(f => f.endsWith(".js"))) mapa[path.basename(rel, ".js")] = hashDe([rel]);
  return mapa;
}

/* O index.html entra no hash do código, menos a linha da versão e a dos hashes
   de dados (senão gravá-las mudaria o hash para sempre — e mexer em conteúdo
   refaria o download do código). */
export function hashes(){
  const semVersao = (rel, buf) => rel === "index.html" ? Buffer.from(buf.toString("utf8").replace(LINHA_VERSAO, "$1$3").replace(LINHA_HASHES, "")) : buf;
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

const linhaDeHashes = () => "window.ESC_HASH_DADOS = " + JSON.stringify(hashesPorArquivo()) + ";";
const hashesGravados = () => (LINHA_HASHES.exec(fs.readFileSync(INDEX, "utf8")) || [""])[0];

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

/* Os números do banco nos documentos (RESUMO-PROJETO-ESC.md e PENDENCIAS.md): o
   texto entre <!-- numeros:inicio --> e <!-- numeros:fim --> é escrito daqui, para
   "5.455 questões" nunca envelhecer num parágrafo. Só esse trecho é gerado. */
const DOCS_COM_NUMEROS = ["RESUMO-PROJETO-ESC.md", "PENDENCIAS.md"];
const MARCADOR = /(<!-- numeros:inicio -->)[\s\S]*?(<!-- numeros:fim -->)/;
export function blocoDeNumeros(){
  const t = conferir().totais, n = x => Number(x).toLocaleString("pt-BR");
  return `> **Números do banco (gerados por \`npm run publicar\`):** ${n(t.questoes)} questões (${n(t.reais)} reais, em ${n(t.provas)} provas), ` +
    `${n(t.cartoes)} cartões da equipe e ${n(t.assuntos)} assuntos (${n(t.assuntosSemCartao)} ainda sem cartão). Detalhe: \`npm run dados\` e \`dados/CATALOGO.md\`.`;
}
function docsVelhos(bloco){
  return DOCS_COM_NUMEROS.map(f => path.join(RAIZ, f)).filter(f => fs.existsSync(f)).filter(f => {
    const txt = fs.readFileSync(f, "utf8");
    return MARCADOR.test(txt) && !txt.includes("\n" + bloco + "\n");
  });
}
function gravarNumeros(bloco){
  for(const f of docsVelhos(bloco)) fs.writeFileSync(f, fs.readFileSync(f, "utf8").replace(MARCADOR, (m, a, b) => a + "\n" + bloco + "\n" + b));
}

if(process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])){
  const soConferir = process.argv.includes("--conferir");
  // os índices leves (ficha e busca) saem do conteúdo: antes de tudo, porque entram no hash dos dados
  const indicesVelhos = soConferir ? !indicesEmDia() : gravarIndices();
  const versao = versaoEsperada(), cat = catalogo();
  const velhaVersao = versao !== versaoGravada() || hashesGravados() !== linhaDeHashes();
  const velhoCatalogo = !fs.existsSync(CATALOGO) || fs.readFileSync(CATALOGO, "utf8") !== cat;
  const bloco = blocoDeNumeros(), velhosDocs = docsVelhos(bloco);
  if(soConferir){
    if(indicesVelhos) console.error("dados/indice-questoes.js e indice-busca.js estão velhos — o conteúdo mudou. Rode: npm run publicar");
    if(velhaVersao) console.error(`A versão do index.html (${versaoGravada()}) está velha — o código ou o conteúdo mudou. Rode: npm run publicar`);
    if(velhoCatalogo) console.error("dados/CATALOGO.md está velho — o conteúdo mudou. Rode: npm run publicar");
    if(velhosDocs.length) console.error("Números desatualizados em " + velhosDocs.map(f => path.basename(f)).join(", ") + ". Rode: npm run publicar");
    process.exit(indicesVelhos || velhaVersao || velhoCatalogo || velhosDocs.length ? 1 : 0);
  }
  if(velhaVersao) fs.writeFileSync(INDEX, fs.readFileSync(INDEX, "utf8").replace(LINHA_VERSAO, `$1${versao}$3`).replace(LINHA_HASHES, () => linhaDeHashes()));
  if(velhoCatalogo) fs.writeFileSync(CATALOGO, cat);
  gravarNumeros(bloco);
  const antes = versaoGravada();
  console.log(indicesVelhos ? "Índices leves (dados/indice-*.js) atualizados." : "Índices leves já em dia.");
  console.log(velhaVersao ? `Versão: ${versao}` : `Versão já em dia: ${antes}`);
  console.log(velhoCatalogo ? "dados/CATALOGO.md atualizado." : "dados/CATALOGO.md já em dia.");
}
