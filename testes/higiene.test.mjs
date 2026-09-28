/* Higiene do código: regras que mantêm codigo/ fácil de ler e de mexer — por
   gente e por IA — e que pegam defeitos que nenhum teste de tela pega. A
   primeira nasceu de um caso real: duas funções dadosDoUsuario em arquivos
   diferentes; a carregada depois substituía a outra em silêncio, e o "Baixar
   uma cópia do meu estudo" entregava só contagens. */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { RAIZ, arquivosDeCodigo } from "../ferramentas/mapa-do-codigo.mjs";

const arquivos = arquivosDeCodigo();
const fontes = Object.fromEntries(arquivos.map(a => [a, fs.readFileSync(path.join(RAIZ, a), "utf8")]));
const LIMITE_DE_LINHAS = 1400;

/* Nomes declarados no primeiro nível (coluna 0) de cada arquivo. */
function declaracoes(){
  const lista = [];
  for(const [arq, s] of Object.entries(fontes)){
    for(const m of s.matchAll(/^(?:async\s+)?(function|const|let|var|class)\s+([A-Za-z_$][\w$]*)/gm)){
      lista.push({ tipo: m[1], nome: m[2], arq, linha: s.slice(0, m.index).split("\n").length });
    }
  }
  return lista;
}

test("a lista ESC_ARQUIVOS.codigo do index.html é exatamente a pasta codigo/", () => {
  const pasta = fs.readdirSync(path.join(RAIZ, "codigo")).filter(f => f.endsWith(".js")).map(f => "codigo/" + f).sort();
  assert.deepEqual([...arquivos].sort(), pasta, "arquivo de codigo/ fora da lista (não carrega) ou item da lista sem arquivo");
  assert.deepEqual(arquivos, [...arquivos].sort(), "a ordem de carga segue a numeração dos nomes");
});

test("nenhum nome de primeiro nível declarado duas vezes", () => {
  const vistos = new Map(), repetidos = [];
  for(const d of declaracoes()){
    if(vistos.has(d.nome)) repetidos.push(`${d.nome}: ${vistos.get(d.nome)} e ${d.arq}:${d.linha}`);
    else vistos.set(d.nome, `${d.arq}:${d.linha}`);
  }
  assert.deepEqual(repetidos, [], "a declaração carregada depois substitui a outra em silêncio — renomeie uma delas");
});

test("toda função é usada em algum lugar", () => {
  // o que chama uma função: o próprio código (inclusive onclick="..." nas
  // telas), o index.html e os testes (que chamam funções pelo navegador)
  const extras = [path.join(RAIZ, "index.html"), ...fs.readdirSync(path.join(RAIZ, "testes")).filter(f => f.endsWith(".mjs")).map(f => path.join(RAIZ, "testes", f))];
  const tudo = Object.values(fontes).join("\n") + "\n" + extras.map(f => fs.readFileSync(f, "utf8")).join("\n");
  const semUso = declaracoes().filter(d => d.tipo === "function")
    .filter(d => (tudo.match(new RegExp("(?<![\\w$.])" + d.nome.replace(/\$/g, "\\$") + "(?![\\w$])", "g")) || []).length < 2)
    .map(d => `${d.nome} (${d.arq}:${d.linha})`);
  assert.deepEqual(semUso, [], "função que ninguém chama: apague (o git guarda a história)");
});

test(`cada arquivo diz o que tem na primeira linha e nenhum passa de ${LIMITE_DE_LINHAS} linhas`, () => {
  const problemas = [];
  for(const [arq, s] of Object.entries(fontes)){
    if(!s.startsWith("/* " + arq + " — ")) problemas.push(`${arq}: a primeira linha deve ser "/* ${arq} — o que este arquivo tem"`);
    const n = s.split("\n").length;
    if(n > LIMITE_DE_LINHAS) problemas.push(`${arq}: ${n} linhas — divida por assunto (03a, 03b…) e atualize ESC_ARQUIVOS e o CLAUDE.md`);
  }
  assert.deepEqual(problemas, []);
});

test("o CLAUDE.md cita todo arquivo de codigo/", () => {
  const guia = fs.readFileSync(path.join(RAIZ, "CLAUDE.md"), "utf8");
  const faltam = arquivos.map(a => path.basename(a)).filter(nome => !guia.includes(nome));
  assert.deepEqual(faltam, [], "arquivo novo em codigo/ sem linha no mapa do CLAUDE.md");
});
