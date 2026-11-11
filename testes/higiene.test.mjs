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
import { arquivosDeConteudo } from "./conferir-dados.mjs";

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

test("a lista de dados/manifesto.js é exatamente a pasta dados/ (a taxonomia primeiro)", () => {
  const lista = arquivosDeConteudo();
  const pasta = fs.readdirSync(path.join(RAIZ, "dados")).filter(f => f.endsWith(".js") && f !== "manifesto.js").map(f => "dados/" + f).sort();
  assert.deepEqual([...lista].sort(), pasta, "arquivo de dados/ fora do manifesto (não carrega) ou item do manifesto sem arquivo");
  assert.equal(new Set(lista).size, lista.length, "arquivo repetido no manifesto");
  assert.equal(lista[0], "dados/taxonomia.js", "a taxonomia vem primeiro: todo o resto aponta para ela");
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

/* O roteador do CLAUDE.md só serve se acompanhar o projeto: pasta de primeiro
   nível, comando npm ou guia de dados/ que nasce sem linha ali volta a obrigar
   quem trabalha a reler tudo para descobrir onde as coisas estão. */
test("o CLAUDE.md cita toda pasta de primeiro nível, todo comando npm e todo guia de dados/", () => {
  const guia = fs.readFileSync(path.join(RAIZ, "CLAUDE.md"), "utf8");
  const ignoradas = new Set(["node_modules", "testes/resultados"]);
  const pastas = fs.readdirSync(RAIZ, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith(".") && !ignoradas.has(d.name)).map(d => d.name);
  const scripts = Object.keys(JSON.parse(fs.readFileSync(path.join(RAIZ, "package.json"), "utf8")).scripts || {});
  const guias = fs.readdirSync(path.join(RAIZ, "dados")).filter(n => /^[A-Z-]+\.md$/.test(n) && n !== "CATALOGO.md");
  const faltam = [
    ...pastas.filter(p => !guia.includes(p + "/")).map(p => `pasta ${p}/`),
    ...scripts.filter(c => !guia.includes("npm run " + c) && !guia.includes("npm " + c) && !(c === "test" && guia.includes("npm test"))).map(c => `comando npm ${c}`),
    ...guias.filter(g => !guia.includes(g)).map(g => `guia dados/${g}`),
  ];
  assert.deepEqual(faltam, [], "acrescente uma linha no roteador/mapa do CLAUDE.md para: " + faltam.join(", "));
});

/* Nasceu de um defeito real: um comentário do :root escrevia ".mt-*" seguido de "/" e
   o "*" + "/" fechava o comentário no meio; o resto do texto virava uma declaração
   inválida que engolia --esp-1. Sem o token, .mt-1/.mb-1/.gap-1 ficavam sem espaço
   (e qualquer regra nova com var(--esp-1) também). */
test("estilo.css: cada comentário termina onde deveria e os tokens de espaçamento existem", () => {
  const css = fs.readFileSync(path.join(RAIZ, "codigo/estilo.css"), "utf8");
  for(const m of css.matchAll(/\/\*([\s\S]*?)\*\//g)){
    const depois = css.slice(m.index + m[0].length).split("\n")[0];
    assert.ok(!/\*\//.test(depois), "um comentário parece ter sido fechado antes da hora, na linha " + (css.slice(0, m.index).split("\n").length) + ": " + depois.trim().slice(0, 80));
  }
  const raiz = css.match(/:root\{([\s\S]*?)\n\}/)[1].replace(/\/\*[\s\S]*?\*\//g, "");
  for(const t of ["--esp-1", "--esp-2", "--esp-3", "--esp-4"]) assert.match(raiz, new RegExp(t + ":\\s*[\\d.]+rem"), t + " precisa estar definido no :root");
  const usados = new Set([...css.matchAll(/var\((--[\w-]+)/g)].map(m => m[1]));
  const definidos = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map(m => m[1]));
  const sem = [...usados].filter(v => !definidos.has(v));
  assert.deepEqual(sem, [], "variável CSS usada e nunca definida");
});

/* Rede contra XSS: o CSP não tem script-src (a plataforma usa onclick inline),
   então a única barreira é escapeHtml(). Este teste acusa a interpolação direta
   de um campo que costuma vir de gente (nome, texto, comentário, e-mail…) num
   template, sem escapeHtml. É heurístico: um texto que é seu (do código) entra
   em PERMITIDOS, com o motivo. */
const CAMPOS_DE_GENTE = /\.(nome|texto|comentario|mensagem|email|autor|titulo|respostaEsperada|textoResposta|enunciado|explicacao)\s*$/;
const PERMITIDOS = [
  ["codigo/06d-controle-de-videogame.js", "v.nome"],      // nome fixo da velocidade, do próprio código
  ["codigo/13-tutorial.js", "p.texto"],                   // texto do tutorial, escrito no código, com HTML de propósito
];
test("campo que vem de pessoa não entra no HTML sem escapeHtml", () => {
  const achados = [];
  for(const [arq, s] of Object.entries(fontes)){
    for(const m of s.matchAll(/\$\{([^{}]*)\}/g)){
      const expr = m[1].trim();
      if(!CAMPOS_DE_GENTE.test(expr) || /escapeHtml|htmlComDestaques|\(/.test(expr)) continue;
      if(PERMITIDOS.some(([a, e]) => a === arq && e === expr)) continue;
      achados.push(`${arq}:${s.slice(0, m.index).split("\n").length}  \${${expr}}`);
    }
  }
  assert.deepEqual(achados, [], "interpolação sem escapeHtml (texto de usuário no HTML). Use escapeHtml(...) ou, se o texto é do código, acrescente a PERMITIDOS com o motivo");
});

/* Fase 3 da carga inicial (docs/PROJETO-CARGA-INICIAL.md): o texto das questões (corpo) só se lê pela API de
   02b-corpos-das-questoes.js. Quem pega window.EscDados.corpos / arquivosComCorpo / indice direto contorna a
   pré-carga e a rede de segurança. */
test("o corpo das questões só é lido pela API de 02b (nada de EscDados.corpos fora dela)", () => {
  const achados = [];
  for(const [arq, s] of Object.entries(fontes)){
    if(arq === "codigo/02b-corpos-das-questoes.js") continue;
    s.split("\n").forEach((linha, i) => { if(/EscDados\.(corpos|arquivosComCorpo|indice|indiceBusca)\b/.test(linha)) achados.push(`${arq}:${i + 1}`); });
  }
  assert.deepEqual(achados, [], "use corpoCarregadoDe / campoJaDisponivel / garantirCorpos (02b) em vez de EscDados.corpos");
});

test("a lista de campos do corpo é a mesma no navegador (02b) e no gerador do índice", async () => {
  const { CAMPOS_DO_CORPO } = await import("../ferramentas/lib-indice.mjs");
  const m = /const CAMPOS_DO_CORPO = (\[[^\]]*\])/.exec(fontes["codigo/02b-corpos-das-questoes.js"]);
  assert.ok(m, "CAMPOS_DO_CORPO não achada em 02b");
  assert.deepEqual(JSON.parse(m[1]), CAMPOS_DO_CORPO);
});
