/* ferramentas/lib-figuras.mjs — o que as figuras desenhadas por código têm em comum.

   Tokens de cor, texto/caminho/moldura SVG, gerador pseudoaleatório fixo (as figuras não mudam de uma
   execução para outra) e o desenho do SVG em PNG com o Chromium que o Playwright já traz.
   Os desenhos em si estão em figuras-modelos.mjs; o CLI é figuras.mjs. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

export const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const SAIDA = path.join(RAIZ, "dados", "imagens");

// tokens de cor: superfície clara, tinta em dois níveis, azul como série principal
export const C = { fundo:"#fcfcfb", tinta:"#0b0b0b", tinta2:"#52514e", grade:"#e3e2de", eixo:"#8d8c87", azul:"#2a78d6", laranja:"#eb6834", faixa:"#efeeea" };
export const FONTE = "font-family=\"Helvetica, Arial, sans-serif\"";

// gerador pseudoaleatório fixo
export function semente(s){ return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; }
export function normal(rand){ return Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand()); }
export const f1 = (n) => String(Math.round(n * 10) / 10);
export const br = (n, casas = 0) => n.toFixed(casas).replace(".", ",");
export const texto = (x, y, s, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" ${FONTE} font-size="${o.t || 14}" fill="${o.cor || C.tinta2}" text-anchor="${o.ancora || "start"}" ${o.peso ? `font-weight="${o.peso}"` : ""} ${o.rot ? `transform="rotate(${o.rot} ${f1(x)} ${f1(y)})"` : ""}>${s}</text>`;
export const caminho = (pts) => pts.map((p, i) => (i ? "L" : "M") + f1(p[0]) + " " + f1(p[1])).join(" ");
export const moldura = (w, h, corpo) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${C.fundo}"/>${corpo}</svg>`;
export const gauss = (t, t0, a, l) => a * Math.exp(-(((t - t0) / l) ** 2));

/* O SVG de uma figura vira PNG em dados/imagens/<id>.png. `figuras` = { id: () => svg }; `pedidos` filtra os ids. */
export async function gerarPng(figuras, pedidos = []){
  fs.mkdirSync(SAIDA, { recursive: true });
  const navegador = await chromium.launch();
  try{
    const pagina = await navegador.newPage();
    for(const [id, desenhar] of Object.entries(figuras)){
      if(pedidos.length && !pedidos.includes(id)) continue;
      const svg = desenhar();
      const [, w, h] = svg.match(/width="(\d+)" height="(\d+)"/);
      await pagina.setViewportSize({ width: +w, height: +h });
      await pagina.setContent(`<body style="margin:0;background:${C.fundo}">${svg}</body>`);
      await pagina.screenshot({ path: path.join(SAIDA, id + ".png"), clip: { x: 0, y: 0, width: +w, height: +h } });
      console.log(id + ".png", w + "×" + h, Math.round(fs.statSync(path.join(SAIDA, id + ".png")).size / 1024) + " KB");
    }
  } finally { await navegador.close(); }
}
