/* ferramentas/figuras-banco-unifesp-2025-adaptado.mjs — gera as figuras (PNG) das
   questões do banco adaptado da UNIFESP 2025 em que o dado é visual por natureza
   (eletrocardiograma, ritmo, curva ROC, heredograma, cardiotocografia, curva de crescimento).

   Uso: node ferramentas/figuras-banco-unifesp-2025-adaptado.mjs [id ...]
   Saída: dados/imagens/q-adap25-NNN.png

   São ilustrações esquemáticas, desenhadas por código a partir dos números do
   próprio enunciado. Nenhuma é exame de paciente real, e cada legenda diz isso.
   Determinístico: rodar de novo gera os mesmos arquivos. Usa o Chromium que o
   Playwright já traz. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SAIDA = path.join(RAIZ, "dados", "imagens");

// tokens de cor: superfície clara, tinta em dois níveis, azul como série principal
const C = { fundo:"#fcfcfb", tinta:"#0b0b0b", tinta2:"#52514e", grade:"#e3e2de", eixo:"#8d8c87", azul:"#2a78d6", laranja:"#eb6834", faixa:"#efeeea" };
const FONTE = "font-family=\"Helvetica, Arial, sans-serif\"";

// gerador pseudoaleatório fixo (as figuras não mudam de uma execução para outra)
function semente(s){ return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; }
const f1 = (n) => String(Math.round(n * 10) / 10);
const br = (n, casas = 0) => n.toFixed(casas).replace(".", ",");
const texto = (x, y, s, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" ${FONTE} font-size="${o.t || 14}" fill="${o.cor || C.tinta2}" text-anchor="${o.ancora || "start"}" ${o.peso ? `font-weight="${o.peso}"` : ""} ${o.rot ? `transform="rotate(${o.rot} ${f1(x)} ${f1(y)})"` : ""}>${s}</text>`;
const caminho = (pts) => pts.map((p, i) => (i ? "L" : "M") + f1(p[0]) + " " + f1(p[1])).join(" ");
const moldura = (w, h, corpo) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${C.fundo}"/>${corpo}</svg>`;
const gauss = (t, t0, a, l) => a * Math.exp(-(((t - t0) / l) ** 2));

/* papel milimetrado do eletrocardiograma: quadrados de 1 mm (px por mm = ppm) e de 5 mm mais escuros */
function papelEcg(x0, y0, larg, alt, ppm){
  let g = "";
  for(let i = 0; i <= larg / ppm; i++){ const xx = x0 + i * ppm; g += `<line x1="${f1(xx)}" x2="${f1(xx)}" y1="${y0}" y2="${y0 + alt}" stroke="${i % 5 ? "#f4e1de" : "#e8bcb4"}" stroke-width="${i % 5 ? 0.8 : 1.3}"/>`; }
  for(let j = 0; j <= alt / ppm; j++){ const yy = y0 + j * ppm; g += `<line x1="${x0}" x2="${x0 + larg}" y1="${f1(yy)}" y2="${f1(yy)}" stroke="${j % 5 ? "#f4e1de" : "#e8bcb4"}" stroke-width="${j % 5 ? 0.8 : 1.3}"/>`; }
  return g;
}

/* ---------- 021: eletrocardiograma de 12 derivações, infarto anterior com supradesnivelamento de ST ---------- */
// cada derivação: amplitudes em mm (10 mm/mV): p, q, r, s, st (desvio do segmento ST), tw (onda T)
const DERIVACOES = {
  I:   { p: 1.0, q: 0.8, r: 8,  s: 0.5, st: 1.0,  tw: 3 },
  aVR: { p: -0.8, q: 0, r: 0.5, s: 8,   st: -1.0, tw: -2 },
  V1:  { p: 0.5, q: 0, r: 1,  s: 9,   st: 2.0,  tw: 5 },
  V4:  { p: 1.0, q: 0.5, r: 9, s: 4,   st: 3.0,  tw: 6 },
  II:  { p: 1.5, q: 0.5, r: 10, s: 0.5, st: -0.5, tw: 2 },
  aVL: { p: 0.5, q: 0.5, r: 5,  s: 1,   st: 1.0,  tw: 2 },
  V2:  { p: 0.8, q: 0, r: 2,  s: 12,  st: 4.0,  tw: 8 },
  V5:  { p: 1.0, q: 0.5, r: 12, s: 1,   st: 2.0,  tw: 4 },
  III: { p: 1.0, q: 0.5, r: 4,  s: 1,   st: -1.0, tw: 0.5 },
  aVF: { p: 1.2, q: 0.5, r: 7,  s: 0.5, st: -1.0, tw: 1 },
  V3:  { p: 0.8, q: 0, r: 4,  s: 9,   st: 4.0,  tw: 7 },
  V6:  { p: 0.8, q: 1.0, r: 10, s: 0, st: 1.0,  tw: 3 },
};
function batimento(t, d){        // t em segundos, a partir do pico do QRS; devolve mm
  return gauss(t, -0.17, d.p, 0.028) + gauss(t, -0.028, -d.q, 0.008) + gauss(t, 0, d.r, 0.011) + gauss(t, 0.026, -d.s, 0.011)
    + gauss(t, 0.12, d.st, 0.075) + gauss(t, 0.27, d.tw, 0.07);
}
function ecg12(){
  const ppm = 5, W = 1360, H = 760, E = 50, T = 70, larg = 4 * 62.5 * ppm / 1, linhaAlt = 30 * ppm;   // 2,5 s por derivação a 25 mm/s
  const celula = 62.5 * ppm, rr = 0.667;                                                               // 90 bpm
  const disposicao = [["I", "aVR", "V1", "V4"], ["II", "aVL", "V2", "V5"], ["III", "aVF", "V3", "V6"]];
  let g = papelEcg(E, T, larg, 3 * linhaAlt + 150 + 10, ppm);
  const traco = (nome, x0, yBase, dur, passo = 0.004) => {
    const d = DERIVACOES[nome], pts = [];
    for(let t = 0; t <= dur; t += passo){
      let v = 0; for(let b = 0.35; b < dur + 0.5; b += rr){ const u = t - b; if(Math.abs(u) < 0.6) v += batimento(u, d); }
      pts.push([x0 + t * 25 * ppm, yBase - v * ppm]);
    }
    return `<path d="${caminho(pts)}" fill="none" stroke="#111" stroke-width="1.7" stroke-linejoin="round"/>`;
  };
  disposicao.forEach((linha, i) => linha.forEach((nome, k) => {
    const x0 = E + k * celula, yBase = T + i * linhaAlt + linhaAlt * 0.62;
    g += traco(nome, x0, yBase, 2.5) + texto(x0 + 8, T + i * linhaAlt + 22, nome, { t: 17, cor: C.tinta, peso: 700 });
    if(k) g += `<line x1="${x0}" x2="${x0}" y1="${yBase - 30}" y2="${yBase + 8}" stroke="#111" stroke-width="1.2"/>`;
  }));
  const yRit = T + 3 * linhaAlt + 100;
  const pts = []; const dur = 10;
  for(let t = 0; t <= dur; t += 0.004){ let v = 0; for(let b = 0.35; b < dur + 0.5; b += rr){ const u = t - b; if(Math.abs(u) < 0.6) v += batimento(u, DERIVACOES.II); } pts.push([E + t * 25 * ppm, yRit - v * ppm]); }
  g += `<path d="${caminho(pts)}" fill="none" stroke="#111" stroke-width="1.7" stroke-linejoin="round"/>` + texto(E + 8, yRit - 44, "II", { t: 17, cor: C.tinta, peso: 700 });
  g += texto(E, 38, "Eletrocardiograma de 12 derivações — 25 mm/s, 10 mm/mV (ilustração esquemática)", { t: 18, cor: C.tinta, peso: 600 });
  g += texto(E, H - 14, "Traçado esquemático desenhado por computador; não é o exame de um paciente.", { t: 13 });
  return moldura(W, H, g);
}

/* ---------- 030: fibrilação atrial com resposta ventricular rápida (derivação DII) ---------- */
function fibrilacaoAtrial(){
  const ppm = 5, E = 50, T = 70, dur = 6, W = E + dur * 25 * ppm + 40, H = 360, yBase = T + 150, rand = semente(30);
  // 14 batimentos em 6 s (cerca de 138 bpm), com intervalos RR irregulares
  const alvo = 14, rrs = Array.from({ length: alvo }, () => 0.28 + rand() * 0.3);
  const soma = rrs.reduce((a, b) => a + b, 0), esc = (dur - 0.5) / soma;
  const picos = []; let acum = 0.25; rrs.forEach(r => { acum += r * esc; picos.push(acum); });
  const ondaF = []; for(let k = 0; k < 40; k++) ondaF.push({ f: 5 + rand() * 4, fase: rand() * 6.28, a: 0.15 + rand() * 0.2 });
  let g = papelEcg(E, T, dur * 25 * ppm, 250, ppm);
  const pts = [];
  for(let t = 0; t <= dur; t += 0.004){
    let v = 0;
    picos.forEach(b => { const u = t - b; if(Math.abs(u) < 0.5) v += gauss(u, -0.028, -0.6, 0.008) + gauss(u, 0, 10, 0.011) + gauss(u, 0.026, -1.5, 0.011) + gauss(u, 0.2, 1.6, 0.06); });
    v += ondaF.slice(0, 4).reduce((a, o) => a + o.a * Math.sin(2 * Math.PI * o.f * t + o.fase), 0) * 0.5;      // ondas f finas, sem onda P
    pts.push([E + t * 25 * ppm, yBase - v * ppm]);
  }
  g += `<path d="${caminho(pts)}" fill="none" stroke="#111" stroke-width="1.7" stroke-linejoin="round"/>`;
  g += texto(E, 38, "Derivação DII — 25 mm/s, 10 mm/mV (ilustração esquemática)", { t: 18, cor: C.tinta, peso: 600 });
  g += texto(E, H - 16, "Traçado esquemático desenhado por computador; não é o exame de um paciente.", { t: 13 });
  return moldura(W, H, g);
}

/* ---------- 053: curva ROC com quatro pontos numerados ---------- */
function curvaRoc(){
  const W = 780, H = 720, E = 100, D = 40, T = 70, B = 100, lado = Math.min(W - E - D, H - T - B);
  const x = (v) => E + v * lado, y = (v) => T + (1 - v) * lado;
  let g = "";
  for(let v = 0; v <= 1.0001; v += 0.2){
    g += `<line x1="${E}" x2="${x(1)}" y1="${f1(y(v))}" y2="${f1(y(v))}" stroke="${C.grade}"/><line x1="${f1(x(v))}" x2="${f1(x(v))}" y1="${T}" y2="${y(0)}" stroke="${C.grade}"/>`;
    g += texto(E - 12, y(v) + 5, br(v, 1), { ancora: "end" }) + texto(x(v), y(0) + 24, br(v, 1), { ancora: "middle" });
  }
  g += `<rect x="${E}" y="${T}" width="${lado}" height="${lado}" fill="none" stroke="${C.eixo}"/>`;
  g += `<line x1="${x(0)}" y1="${y(0)}" x2="${x(1)}" y2="${y(1)}" stroke="${C.eixo}" stroke-width="1.6" stroke-dasharray="7 6"/>`;
  const curva = []; for(let v = 0; v <= 1.0001; v += 0.01) curva.push([x(v), y(1 - Math.pow(1 - v, 6))]);
  g += `<path d="${caminho(curva)}" fill="none" stroke="${C.azul}" stroke-width="3.2" stroke-linejoin="round"/>`;
  const pontos = [["1", 1, 1, -22, 30], ["2", 0.2, 1 - Math.pow(0.8, 6), 24, -6], ["3", 0, 0, 24, -22], ["4", 0.5, 0.5, 26, 6]];
  for(const [rot, px, py, dx, dy] of pontos){
    g += `<circle cx="${f1(x(px))}" cy="${f1(y(py))}" r="8" fill="${C.tinta}" stroke="${C.fundo}" stroke-width="2.5"/>`;
    g += `<circle cx="${f1(x(px) + dx)}" cy="${f1(y(py) + dy)}" r="13" fill="${C.fundo}" stroke="${C.tinta}" stroke-width="1.6"/>` + texto(x(px) + dx, y(py) + dy + 6, rot, { ancora: "middle", t: 17, cor: C.tinta, peso: 700 });
  }
  g += texto(E, 38, "Curva ROC de um teste diagnóstico", { t: 19, cor: C.tinta, peso: 600 });
  g += texto(x(0.5), y(0) + 58, "1 − especificidade (taxa de falsos-positivos)", { ancora: "middle", t: 15 });
  g += texto(E - 62, y(0.5), "Sensibilidade (taxa de verdadeiros-positivos)", { ancora: "middle", t: 15, rot: -90 });
  g += texto(E, H - 18, "Curva e pontos esquemáticos (dados fictícios). A linha tracejada é a diagonal de referência.", { t: 12.5 });
  return moldura(W, H, g);
}

const FIGURAS = { "q-adap25-021": ecg12, "q-adap25-030": fibrilacaoAtrial, "q-adap25-053": curvaRoc };

const pedidos = process.argv.slice(2);
const navegador = await chromium.launch();
try {
  const pagina = await navegador.newPage();
  for(const [id, desenhar] of Object.entries(FIGURAS)){
    if(pedidos.length && !pedidos.includes(id)) continue;
    const svg = desenhar();
    const [, w, h] = svg.match(/width="(\d+)" height="(\d+)"/);
    await pagina.setViewportSize({ width: +w, height: +h });
    await pagina.setContent(`<body style="margin:0;background:${C.fundo}">${svg}</body>`);
    await pagina.screenshot({ path: path.join(SAIDA, id + ".png"), clip: { x: 0, y: 0, width: +w, height: +h } });
    console.log(id + ".png", w + "×" + h, Math.round(fs.statSync(path.join(SAIDA, id + ".png")).size / 1024) + " KB");
  }
} finally { await navegador.close(); }
