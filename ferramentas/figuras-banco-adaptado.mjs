/* ferramentas/figuras-banco-adaptado.mjs — gera as figuras (PNG) das questões do
   banco adaptado da UNIFESP 2024 que pedem imagem em vez de descrição.

   Uso: node ferramentas/figuras-banco-adaptado.mjs
   Saída: dados/imagens/q-adap24-NNN.png (001, 020, 021, 043, 078, 081).

   São ilustrações esquemáticas, desenhadas por código a partir dos números do
   próprio enunciado (capnograma, MAPA, Holter, EEG) ou de dados fictícios
   declarados (forest plot, diagrama de dispersão). Nenhuma é exame de um
   paciente de verdade, e cada legenda diz isso. Determinístico: rodar de novo
   gera os mesmos arquivos. Usa o Chromium que o Playwright já traz. */
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
function normal(rand){ return Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand()); }
const f1 = (n) => String(Math.round(n * 10) / 10);
const br = (n, casas = 0) => n.toFixed(casas).replace(".", ",");
const texto = (x, y, s, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" ${FONTE} font-size="${o.t || 14}" fill="${o.cor || C.tinta2}" text-anchor="${o.ancora || "start"}" ${o.peso ? `font-weight="${o.peso}"` : ""} ${o.rot ? `transform="rotate(${o.rot} ${f1(x)} ${f1(y)})"` : ""}>${s}</text>`;
const caminho = (pts) => pts.map((p, i) => (i ? "L" : "M") + f1(p[0]) + " " + f1(p[1])).join(" ");
const moldura = (w, h, corpo) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${C.fundo}"/>${corpo}</svg>`;

/* ---------- 001: capnograma com platô inclinado ("barbatana de tubarão") ---------- */
function capnograma(){
  const W = 1000, H = 420, E = 78, D = 30, T = 56, B = 64;
  const x = (s) => E + (s / 20) * (W - E - D), y = (mm) => H - B - (mm / 60) * (H - T - B);
  let g = "";
  for(const v of [0, 20, 40, 60]){ g += `<line x1="${E}" x2="${W - D}" y1="${y(v)}" y2="${y(v)}" stroke="${C.grade}"/>` + texto(E - 10, y(v) + 5, v, { ancora:"end" }); }
  for(let s = 0; s <= 20; s += 5) g += texto(x(s), H - B + 24, s + " s", { ancora:"middle" });
  const pts = [];
  for(let t = 0; t <= 20; t += 0.02){
    const u = (t % 5) - 0.6;                                    // 12 respirações por minuto: um ciclo a cada 5 s
    // expiração de 2 s: subida sem platô horizontal (curva arredondada, que continua subindo até o fim)
    const co2 = u < 0 || u > 2.05 ? 0 : u < 0.2 ? 22 * (u / 0.2) : 22 + 24 * (1 - Math.exp(-(u - 0.2) / 0.9)) / (1 - Math.exp(-1.85 / 0.9));
    pts.push([t, co2]);
  }
  g += `<path d="${caminho(pts.map(p => [x(p[0]), y(p[1])]))}" fill="none" stroke="${C.azul}" stroke-width="2.5" stroke-linejoin="round"/>`;
  g += texto(E, 32, "Capnograma — CO₂ expirado (mmHg) × tempo", { t:17, cor:C.tinta, peso:600 });
  g += texto(E - 52, (T + H - B) / 2, "CO₂ (mmHg)", { ancora:"middle", rot:-90 });
  return moldura(W, H, g);
}

/* ---------- 020: MAPA de 24 horas ---------- */
function mapa(){
  const W = 1000, H = 560, E = 78, D = 30, T = 56, Bplot = 330;
  const rand = semente(20), N = () => normal(rand);
  // leituras de 20 em 20 minutos a partir das 8h: 51 de vigília (até 23h30 e das 6h30 às 8h) e 21 de sono
  const leituras = [];
  for(let i = 0; i < 72; i++){
    const h = 8 + i / 3, hh = h % 24, sono = hh >= 23.5 || hh < 6.5;
    leituras.push({ h: i / 3, sono, s: N() * 9, d: N() * 6 });
  }
  const ajustar = (grupo, campo, media) => { const m = grupo.reduce((a, l) => a + l[campo], 0) / grupo.length; grupo.forEach(l => l[campo] = media + (l[campo] - m)); };
  const vig = leituras.filter(l => !l.sono), son = leituras.filter(l => l.sono);
  ajustar(vig, "s", 138); ajustar(vig, "d", 88); ajustar(son, "s", 124); ajustar(son, "d", 74);
  const x = (h) => E + (h / 24) * (W - E - D), y = (v) => Bplot - ((v - 40) / 130) * (Bplot - T);
  let g = "";
  // faixa do sono, das 23h30 às 6h30
  g += `<rect x="${f1(x(15.5))}" y="${T}" width="${f1(x(22.5) - x(15.5))}" height="${Bplot - T}" fill="${C.faixa}"/>` + texto((x(15.5) + x(22.5)) / 2, T + 18, "sono", { ancora:"middle" });
  for(const v of [40, 80, 120, 160]){ g += `<line x1="${E}" x2="${W - D}" y1="${y(v)}" y2="${y(v)}" stroke="${C.grade}"/>` + texto(E - 10, y(v) + 5, v, { ancora:"end" }); }
  for(let h = 0; h <= 24; h += 4) g += texto(x(h), Bplot + 24, String((8 + h) % 24).padStart(2, "0") + "h", { ancora:"middle" });
  const serie = (campo, cor) => `<path d="${caminho(leituras.map(l => [x(l.h), y(l[campo])]))}" fill="none" stroke="${cor}" stroke-width="2" stroke-linejoin="round"/>` + leituras.map(l => `<circle cx="${f1(x(l.h))}" cy="${f1(y(l[campo]))}" r="3" fill="${cor}"/>`).join("");
  g += serie("s", C.azul) + serie("d", C.laranja);
  g += texto(x(0.4), y(170) + 4, "Pressão sistólica", { cor:C.azul, peso:600 }) + texto(x(0.4), y(55) + 4, "Pressão diastólica", { cor:C.laranja, peso:600 });
  g += texto(E, 32, "MAPA de 24 horas — pressão arterial (mmHg)", { t:17, cor:C.tinta, peso:600 });
  // quadro-resumo
  const ty = Bplot + 56, col = [E, 330, 560, 790];
  g += `<line x1="${E}" x2="${W - D}" y1="${ty}" y2="${ty}" stroke="${C.eixo}"/>`;
  ["Período", "Média PAS/PAD", "Número de leituras", ""].forEach((s, i) => g += texto(col[i], ty - 8, s, { peso:600, cor:C.tinta }));
  [["Média de 24 horas", "134/84 mmHg", 72], ["Média da vigília", "138/88 mmHg", 51], ["Média do sono", "124/74 mmHg", 21]].forEach((r, i) => {
    const yy = ty + 28 + i * 28;
    g += texto(col[0], yy, r[0], { cor:C.tinta }) + texto(col[1], yy, r[1], { cor:C.tinta }) + texto(col[2], yy, r[2], { cor:C.tinta2 });
  });
  g += texto(col[3], ty + 28, "Descenso noturno: 10%", { cor:C.tinta });
  return moldura(W, H, g);
}

/* ---------- 021: Holter, run de taquicardia ventricular não sustentada ---------- */
function holter(){
  const W = 1100, H = 380, E = 60, T = 56, base = 230, ppx = 200, mv = 80;   // 25 mm/s e 10 mm/mV, com 8 px por mm
  const g1 = (t, t0, a, l) => a * Math.exp(-(((t - t0) / l) ** 2));
  const sinusal = (t, t0) => g1(t, t0 - 0.16, 0.12, 0.04) + g1(t, t0 - 0.03, -0.1, 0.012) + g1(t, t0, 1.0, 0.014) + g1(t, t0 + 0.03, -0.25, 0.014) + g1(t, t0 + 0.28, 0.3, 0.07);
  const ventricular = (t, t0) => g1(t, t0, 1.3, 0.04) + g1(t, t0 + 0.09, -0.5, 0.035) + g1(t, t0 + 0.24, -0.45, 0.08);
  const sinusais = [0.35, 1.25, 4.45, 5.35], rr = 0.33, vent = [];
  for(let i = 0; i < 6; i++) vent.push(2.1 + i * rr);          // seis batimentos a cerca de 180 bpm
  const dur = 6.1, pts = [];
  for(let t = 0; t <= dur; t += 0.0025){
    let v = 0; sinusais.forEach(t0 => v += sinusal(t, t0)); vent.forEach(t0 => v += ventricular(t, t0));
    pts.push([E + t * ppx, base - v * mv]);
  }
  let g = "";
  for(let i = 0; i <= (W - E - 20) / 8; i++){ const xx = E + i * 8; if(xx <= W - 20) g += `<line x1="${xx}" x2="${xx}" y1="${T}" y2="${H - 50}" stroke="${i % 5 ? "#f1d9d6" : "#e5b5ae"}" stroke-width="${i % 5 ? 1 : 1.4}"/>`; }
  for(let yy = T; yy <= H - 50; yy += 8){ const k = (yy - T) / 8; g += `<line x1="${E}" x2="${W - 20}" y1="${yy}" y2="${yy}" stroke="${k % 5 ? "#f1d9d6" : "#e5b5ae"}" stroke-width="${k % 5 ? 1 : 1.4}"/>`; }
  g += `<path d="${caminho(pts)}" fill="none" stroke="#111" stroke-width="1.8" stroke-linejoin="round"/>`;
  g += texto(E, 32, "Holter — derivação DII, 25 mm/s, 10 mm/mV (ilustração esquemática)", { t:16, cor:C.tinta, peso:600 });
  g += texto(E, H - 22, "Registro do episódio sintomático", { cor:C.tinta2 });
  return moldura(W, H, g);
}

/* ---------- 043: EEG com "delta brush" ---------- */
function eeg(){
  const W = 1000, H = 500, E = 110, D = 30, T = 64, passo = 62, canais = ["Fp1–F7", "F7–T3", "T3–T5", "Fp2–F8", "F8–T4", "T4–T6"];
  const rand = semente(43), x = (t) => E + (t / 8) * (W - E - D);
  let g = "";
  for(let s = 0; s <= 8; s++) g += `<line x1="${f1(x(s))}" x2="${f1(x(s))}" y1="${T - 10}" y2="${T + canais.length * passo - 18}" stroke="${C.grade}"/>` + texto(x(s), T + canais.length * passo - 2, s + " s", { ancora:"middle", t:12 });
  canais.forEach((nome, k) => {
    const base = T + k * passo + 14, fase = rand() * 6, amp = 16 + rand() * 6, pts = [];
    for(let t = 0; t <= 8; t += 0.004){
      const ang = 2 * Math.PI * (1.2 * t + 0.08 * Math.sin(2 * Math.PI * 0.23 * t + fase)) + fase;   // onda delta de cerca de 1,2 Hz, com ritmo levemente irregular
      const lenta = Math.sin(ang);
      const env = Math.max(0, Math.sin(ang + 0.9)) ** 3;                          // a atividade rápida "cavalga" a onda lenta
      const rapida = env * 7 * Math.sin(2 * Math.PI * 19 * t + k);
      pts.push([x(t), base - amp * lenta - rapida + (rand() - 0.5) * 1.5]);
    }
    g += texto(E - 12, base + 4, nome, { ancora:"end", t:13 }) + `<path d="${caminho(pts)}" fill="none" stroke="#111" stroke-width="1.3" stroke-linejoin="round"/>`;
  });
  const by = H - 30;
  g += `<line x1="${E}" x2="${E}" y1="${by - 24}" y2="${by}" stroke="${C.tinta}" stroke-width="2"/>` + texto(E + 8, by - 8, "50 µV", { t:12 });
  g += texto(E, 32, "EEG — montagem bipolar (ilustração esquemática)", { t:17, cor:C.tinta, peso:600 });
  return moldura(W, H, g);
}

/* ---------- 078: forest plot dos três estudos fictícios ---------- */
function floresta(){
  const W = 1000, H = 400, X0 = 420, X1 = 790, T = 92, passo = 80;
  const x = (v) => X0 + (Math.log(v / 0.5) / Math.log(8)) * (X1 - X0);
  const linhas = [["I. Estudo transversal", "RP", 0.74, 0.62, 0.89], ["II. Estudo de coorte (15 anos)", "RR", 0.85, 0.77, 0.97], ["III. Ensaio clínico randomizado", "RR", 1.58, 1.10, 3.45]];
  let g = texto(40, 36, "Betacaroteno e evento cardiovascular — resultado de cada estudo (fictício)", { t:17, cor:C.tinta, peso:600 });
  g += texto(40, T - 26, "Estudo", { peso:600, cor:C.tinta }) + texto(X1 + 30, T - 26, "Medida (IC 95%)", { peso:600, cor:C.tinta });
  for(const v of [0.5, 1, 2, 4]){ g += `<line x1="${f1(x(v))}" x2="${f1(x(v))}" y1="${T - 12}" y2="${T + 3 * passo - 30}" stroke="${v === 1 ? C.tinta : C.grade}" stroke-width="${v === 1 ? 1.6 : 1}" ${v === 1 ? 'stroke-dasharray="5 4"' : ""}/>` + texto(x(v), T + 3 * passo - 10, br(v, v < 1 ? 1 : 0), { ancora:"middle" }); }
  linhas.forEach((l, i) => {
    const yy = T + i * passo + 14;
    g += texto(40, yy + 5, l[0], { cor:C.tinta }) + `<line x1="${f1(x(l[3]))}" x2="${f1(x(l[4]))}" y1="${yy}" y2="${yy}" stroke="${C.azul}" stroke-width="2.5"/>`
      + `<rect x="${f1(x(l[2]) - 7)}" y="${yy - 7}" width="14" height="14" fill="${C.azul}" stroke="${C.fundo}" stroke-width="2"/>`
      + texto(X1 + 30, yy + 5, `${l[1]} = ${br(l[2], 2)} (${br(l[3], 2)}–${br(l[4], 2)})`, { cor:C.tinta });
  });
  g += texto(x(1) - 12, H - 32, "◄ menor risco de evento", { ancora:"end", t:13 }) + texto(x(1) + 12, H - 32, "maior risco de evento ►", { t:13 });
  g += texto(40, H - 10, "Escala logarítmica. A linha tracejada marca a ausência de associação (medida = 1).", { t:12 });
  return moldura(W, H, g);
}

/* ---------- 081: diagrama de dispersão, 40 municípios, r = −0,72 ---------- */
function dispersao(){
  const W = 900, H = 580, E = 90, D = 30, T = 60, B = 76, n = 40, alvo = -0.72;
  const rand = semente(81), media = (v) => v.reduce((a, b) => a + b, 0) / v.length;
  const padroniza = (v) => { const m = media(v), dp = Math.sqrt(media(v.map(a => (a - m) ** 2))); return v.map(a => (a - m) / dp); };
  const xz = padroniza(Array.from({ length: n }, () => rand() + rand()));
  let e = Array.from({ length: n }, () => normal(rand));
  const proj = (v, u) => { const k = media(v.map((a, i) => a * u[i])) / media(u.map(a => a * a)); return v.map((a, i) => a - k * u[i]); };
  e = padroniza(proj(proj(e, xz), Array(n).fill(1)));
  const yz = xz.map((a, i) => alvo * a + Math.sqrt(1 - alvo * alvo) * e[i]);
  const X = xz.map(a => Math.min(99, 86 + 6.5 * a)), Y = yz.map(a => Math.max(1, 15 + 5.5 * a));   // cobertura (%) e casos por 100 mil
  const x = (v) => E + ((v - 60) / 40) * (W - E - D), y = (v) => H - B - (v / 40) * (H - T - B);
  let g = "";
  for(const v of [0, 10, 20, 30, 40]) g += `<line x1="${E}" x2="${W - D}" y1="${y(v)}" y2="${y(v)}" stroke="${C.grade}"/>` + texto(E - 10, y(v) + 5, v, { ancora:"end" });
  for(let v = 60; v <= 100; v += 10) g += texto(x(v), H - B + 24, v + "%", { ancora:"middle" });
  const mx = media(X), my = media(Y), b1 = X.reduce((a, v, i) => a + (v - mx) * (Y[i] - my), 0) / X.reduce((a, v) => a + (v - mx) ** 2, 0);
  const rObs = media(X.map((v, i) => (v - mx) * (Y[i] - my))) / (Math.sqrt(media(X.map(v => (v - mx) ** 2))) * Math.sqrt(media(Y.map(v => (v - my) ** 2))));
  console.log("  r da dispersão =", rObs.toFixed(3), "(alvo -0,72; pontos limitados por corte: " + X.filter(v => v >= 99).length + " em X, " + Y.filter(v => v <= 1).length + " em Y)");
  const a0 = Math.min(...X), a1 = Math.max(...X);
  g += `<line x1="${f1(x(a0))}" x2="${f1(x(a1))}" y1="${f1(y(my + b1 * (a0 - mx)))}" y2="${f1(y(my + b1 * (a1 - mx)))}" stroke="${C.tinta2}" stroke-width="2" stroke-dasharray="7 5"/>`;
  g += X.map((v, i) => `<circle cx="${f1(x(v))}" cy="${f1(y(Y[i]))}" r="6" fill="${C.azul}" stroke="${C.fundo}" stroke-width="2"/>`).join("");
  g += texto(E, 34, "Cobertura da vacina tríplice viral × incidência de sarampo", { t:17, cor:C.tinta, peso:600 });
  g += texto((E + W - D) / 2, H - 30, "Cobertura da vacina tríplice viral (%)", { ancora:"middle" });
  g += texto(E - 62, (T + H - B) / 2, "Casos de sarampo por 100 mil habitantes", { ancora:"middle", rot:-90 });
  g += texto(E, H - 8, "Cada ponto é um município (40 pontos). Dados fictícios; a reta tracejada é o ajuste linear.", { t:12 });
  return moldura(W, H, g);
}

const FIGURAS = { "q-adap24-001": capnograma, "q-adap24-020": mapa, "q-adap24-021": holter, "q-adap24-043": eeg, "q-adap24-078": floresta, "q-adap24-081": dispersao };

const navegador = await chromium.launch();
try {
  const pagina = await navegador.newPage();
  for(const [id, desenhar] of Object.entries(FIGURAS)){
    const svg = desenhar();
    const [, w, h] = svg.match(/width="(\d+)" height="(\d+)"/);
    await pagina.setViewportSize({ width: +w, height: +h });
    await pagina.setContent(`<body style="margin:0;background:${C.fundo}">${svg}</body>`);
    await pagina.screenshot({ path: path.join(SAIDA, id + ".png"), clip: { x: 0, y: 0, width: +w, height: +h } });
    console.log(id + ".png", w + "×" + h, Math.round(fs.statSync(path.join(SAIDA, id + ".png")).size / 1024) + " KB");
  }
} finally { await navegador.close(); }
