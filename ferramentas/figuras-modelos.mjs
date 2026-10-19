/* ferramentas/figuras-modelos.mjs — o catálogo de figuras que se desenham por código.

   Cada modelo devolve um SVG e aceita um objeto de parâmetros; sem parâmetros, devolve a figura que já foi
   publicada (por isso as imagens antigas saem iguais byte a byte). São ilustrações esquemáticas ou de dados
   fictícios, e cada legenda diz isso sem entregar o achado. Radiografia, ultrassom, histologia e foto de
   lesão NÃO se desenham: a questão fica com `imagemPendente`.

   Para usar num simulado novo, sem copiar nada:
     node ferramentas/figuras.mjs listar
     node ferramentas/figuras.mjs gerar curvaRoc q-adapNN-053 '{"expoente":4}'
   ou monte um mapa { id: () => MODELOS.x.desenhar(params) } e chame gerarPng (lib-figuras.mjs). */
import { C, semente, normal, f1, br, texto, caminho, moldura, gauss } from "./lib-figuras.mjs";

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
function ecg12({ rr = 0.667, derivacoes = DERIVACOES } = {}){
  const ppm = 5, W = 1360, H = 760, E = 50, T = 70, larg = 4 * 62.5 * ppm / 1, linhaAlt = 30 * ppm;   // 2,5 s por derivação a 25 mm/s
  const celula = 62.5 * ppm;                                                               // 90 bpm
  const disposicao = [["I", "aVR", "V1", "V4"], ["II", "aVL", "V2", "V5"], ["III", "aVF", "V3", "V6"]];
  let g = papelEcg(E, T, larg, 3 * linhaAlt + 150 + 10, ppm);
  const traco = (nome, x0, yBase, dur, passo = 0.004) => {
    const d = derivacoes[nome], pts = [];
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
  for(let t = 0; t <= dur; t += 0.004){ let v = 0; for(let b = 0.35; b < dur + 0.5; b += rr){ const u = t - b; if(Math.abs(u) < 0.6) v += batimento(u, derivacoes.II); } pts.push([E + t * 25 * ppm, yRit - v * ppm]); }
  g += `<path d="${caminho(pts)}" fill="none" stroke="#111" stroke-width="1.7" stroke-linejoin="round"/>` + texto(E + 8, yRit - 44, "II", { t: 17, cor: C.tinta, peso: 700 });
  g += texto(E, 38, "Eletrocardiograma de 12 derivações — 25 mm/s, 10 mm/mV (ilustração esquemática)", { t: 18, cor: C.tinta, peso: 600 });
  g += texto(E, H - 14, "Traçado esquemático desenhado por computador; não é o exame de um paciente.", { t: 13 });
  return moldura(W, H, g);
}

/* ---------- 030: fibrilação atrial com resposta ventricular rápida (derivação DII) ---------- */
function fibrilacaoAtrial({ batimentos = 14, dur = 6, sementeAleatoria = 30 } = {}){
  const ppm = 5, E = 50, T = 70, W = E + dur * 25 * ppm + 40, H = 360, yBase = T + 150, rand = semente(sementeAleatoria);
  // 14 batimentos em 6 s (cerca de 138 bpm), com intervalos RR irregulares
  const alvo = batimentos, rrs = Array.from({ length: alvo }, () => 0.28 + rand() * 0.3);
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
function curvaRoc({ expoente = 6 } = {}){
  const W = 780, H = 720, E = 100, D = 40, T = 70, B = 100, lado = Math.min(W - E - D, H - T - B);
  const x = (v) => E + v * lado, y = (v) => T + (1 - v) * lado;
  let g = "";
  for(let v = 0; v <= 1.0001; v += 0.2){
    g += `<line x1="${E}" x2="${x(1)}" y1="${f1(y(v))}" y2="${f1(y(v))}" stroke="${C.grade}"/><line x1="${f1(x(v))}" x2="${f1(x(v))}" y1="${T}" y2="${y(0)}" stroke="${C.grade}"/>`;
    g += texto(E - 12, y(v) + 5, br(v, 1), { ancora: "end" }) + texto(x(v), y(0) + 24, br(v, 1), { ancora: "middle" });
  }
  g += `<rect x="${E}" y="${T}" width="${lado}" height="${lado}" fill="none" stroke="${C.eixo}"/>`;
  g += `<line x1="${x(0)}" y1="${y(0)}" x2="${x(1)}" y2="${y(1)}" stroke="${C.eixo}" stroke-width="1.6" stroke-dasharray="7 6"/>`;
  const curva = []; for(let v = 0; v <= 1.0001; v += 0.01) curva.push([x(v), y(1 - Math.pow(1 - v, expoente))]);
  g += `<path d="${caminho(curva)}" fill="none" stroke="${C.azul}" stroke-width="3.2" stroke-linejoin="round"/>`;
  const pontos = [["1", 1, 1, -22, 30], ["2", 0.2, 1 - Math.pow(0.8, expoente), 24, -6], ["3", 0, 0, 24, -22], ["4", 0.5, 0.5, 26, 6]];
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

/* ---------- 063: heredograma de herança recessiva ligada ao X ---------- */
function heredograma(){
  const W = 1020, H = 520, T = 40, lado = 36, r = 19;
  const gen = { I: 100, II: 230, III: 380 };
  let g = "";
  const linha = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.tinta}" stroke-width="2"/>`;
  const simbolo = (x, y, sexo, afetado, rotulo) => {
    const forma = sexo === "M"
      ? `<rect x="${x - lado / 2}" y="${y - lado / 2}" width="${lado}" height="${lado}" fill="${afetado ? C.tinta : C.fundo}" stroke="${C.tinta}" stroke-width="2.2"/>`
      : `<circle cx="${x}" cy="${y}" r="${r}" fill="${afetado ? C.tinta : C.fundo}" stroke="${C.tinta}" stroke-width="2.2"/>`;
    return forma + (rotulo ? texto(x, y + lado / 2 + 20, rotulo, { ancora: "middle", t: 14, cor: C.tinta2 }) : "");
  };
  const casal = (xa, xb, y) => linha(xa + lado / 2, y, xb - lado / 2, y);
  // geração I
  g += simbolo(470, gen.I, "M", false, "1") + simbolo(590, gen.I, "F", false, "2") + casal(470, 590, gen.I);
  const yIrm = 165;
  g += linha(530, gen.I, 530, yIrm) + linha(200, yIrm, 760, yIrm);
  // geração II: filhos do casal I-1 e I-2
  const filhosII = [[200, "F", false, "1"], [360, "M", true, "2"], [600, "M", false, "3"], [760, "F", false, "4"]];
  for(const [x, sexo, af, rot] of filhosII){ g += linha(x, yIrm, x, gen.II - lado / 2) + simbolo(x, gen.II, sexo, af, rot); }
  // cônjuges de II-1, II-2 e II-4 (sem rótulo)
  g += simbolo(80, gen.II, "M", false, "") + casal(80, 200, gen.II);
  g += simbolo(480, gen.II, "F", false, "") + casal(360, 480, gen.II);
  g += simbolo(880, gen.II, "M", false, "") + casal(760, 880, gen.II);
  // geração III
  const familias = [
    { meio: 140, filhos: [[60, "M", true, "1"], [150, "F", false, "2"], [240, "M", false, "3"]] },
    { meio: 420, filhos: [[380, "F", false, "4"], [460, "M", false, "5"]] },
    { meio: 820, filhos: [[780, "F", false, "6"], [870, "M", true, "7"]] },
  ];
  const yIrm3 = 300;
  for(const f of familias){
    const xs = f.filhos.map(c => c[0]);
    g += linha(f.meio, gen.II, f.meio, yIrm3) + linha(Math.min(...xs), yIrm3, Math.max(...xs), yIrm3);
    for(const [x, sexo, af, rot] of f.filhos){ g += linha(x, yIrm3, x, gen.III - lado / 2) + simbolo(x, gen.III, sexo, af, rot); }
  }
  // numeração das gerações
  for(const [rom, y] of Object.entries(gen)) g += texto(20, y + 6, rom, { t: 18, cor: C.tinta, peso: 700 });
  // legenda
  const ly = 470;
  g += `<rect x="300" y="${ly - 14}" width="22" height="22" fill="${C.fundo}" stroke="${C.tinta}" stroke-width="2"/>` + texto(330, ly + 4, "homem", { t: 14 });
  g += `<circle cx="415" cy="${ly - 3}" r="12" fill="${C.fundo}" stroke="${C.tinta}" stroke-width="2"/>` + texto(435, ly + 4, "mulher", { t: 14 });
  g += `<rect x="520" y="${ly - 14}" width="22" height="22" fill="${C.tinta}" stroke="${C.tinta}" stroke-width="2"/>` + texto(550, ly + 4, "afetado", { t: 14 });
  g += texto(20, 28, "Heredograma", { t: 19, cor: C.tinta, peso: 600 });
  return moldura(W, H, g);
}

/* ---------- 080: cardiotocografia, desacelerações tardias recorrentes com variabilidade mínima ---------- */
function cardiotocografia({ base = 150, picos = [1.3, 3.8, 6.3, 8.8], fundos = [38, 42, 36, 40], atraso = 0.45 } = {}){
  const W = 1100, H = 620, E = 90, D = 40, T = 70, alturaFcf = 300, alturaToco = 130, vao = 36, dur = 10;
  const x = (min) => E + (min / dur) * (W - E - D);
  const yF = (b) => T + (1 - (b - 60) / 150) * alturaFcf;                   // FCF de 60 a 210 bpm
  const yoToco = T + alturaFcf + vao, yU = (mm) => yoToco + (1 - mm / 100) * alturaToco;
  let g = `<rect x="${E}" y="${f1(yF(160))}" width="${W - E - D}" height="${f1(yF(110) - yF(160))}" fill="${C.faixa}"/>`;
  for(let b = 60; b <= 210; b += 30){ g += `<line x1="${E}" x2="${W - D}" y1="${f1(yF(b))}" y2="${f1(yF(b))}" stroke="${C.grade}"/>` + texto(E - 10, yF(b) + 5, b, { ancora: "end" }); }
  for(let m = 0; m <= dur; m++){ g += `<line x1="${f1(x(m))}" x2="${f1(x(m))}" y1="${T}" y2="${yoToco + alturaToco}" stroke="${m % 5 ? C.grade : C.eixo}" stroke-width="${m % 5 ? 1 : 1.4}"/>` + texto(x(m), yoToco + alturaToco + 24, m, { ancora: "middle" }); }
  for(let u = 0; u <= 100; u += 25){ g += `<line x1="${E}" x2="${W - D}" y1="${f1(yU(u))}" y2="${f1(yU(u))}" stroke="${C.grade}"/>` + texto(E - 10, yU(u) + 5, u, { ancora: "end" }); }
  g += `<rect x="${E}" y="${T}" width="${W - E - D}" height="${alturaFcf}" fill="none" stroke="${C.eixo}"/><rect x="${E}" y="${yoToco}" width="${W - E - D}" height="${alturaToco}" fill="none" stroke="${C.eixo}"/>`;
  // atividade uterina: contrações de cerca de 75 s, a cada 2,5 min
  const toco = []; for(let t = 0; t <= dur; t += 0.01){ let v = 10; picos.forEach(c => v += 55 * Math.exp(-(((t - c) / 0.33) ** 2))); toco.push([x(t), yU(v)]); }
  g += `<path d="${caminho(toco)}" fill="none" stroke="${C.laranja}" stroke-width="2.4" stroke-linejoin="round"/>`;
  // frequência cardíaca fetal: linha de base de 150 bpm, variabilidade mínima e desacelerações tardias (nadir 27 s depois do pico)
  const fcf = [];
  for(let t = 0; t <= dur; t += 0.01){
    let v = base + 1.6 * Math.sin(2 * Math.PI * t * 5.2) + 1.2 * Math.sin(2 * Math.PI * t * 9.1 + 1) + 0.9 * Math.sin(2 * Math.PI * t * 14.3 + 2);
    picos.forEach((c, i) => { const tn = c + atraso; v -= fundos[i] * Math.exp(-(((t - tn) / (t < tn ? 0.30 : 0.36)) ** 2)); });
    fcf.push([x(t), yF(v)]);
  }
  g += `<path d="${caminho(fcf)}" fill="none" stroke="${C.azul}" stroke-width="2.6" stroke-linejoin="round"/>`;
  g += texto(E, 36, "Cardiotocografia — últimos 10 minutos (ilustração esquemática)", { t: 18, cor: C.tinta, peso: 600 });
  g += texto(E - 62, T + alturaFcf / 2, "FCF (bpm)", { ancora: "middle", rot: -90, t: 14 }) + texto(E - 62, yoToco + alturaToco / 2, "Útero (mmHg)", { ancora: "middle", rot: -90, t: 14 });
  g += texto((E + W - D) / 2, yoToco + alturaToco + 52, "Tempo (min)", { ancora: "middle", t: 14 });
  g += texto(E, H - 12, "Traçado esquemático desenhado por computador. A faixa cinza marca 110 a 160 bpm.", { t: 12.5 });
  return moldura(W, H, g);
}

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
function floresta({ titulo = "Betacaroteno e evento cardiovascular — resultado de cada estudo (fictício)", linhas = [["I. Estudo transversal", "RP", 0.74, 0.62, 0.89], ["II. Estudo de coorte (15 anos)", "RR", 0.85, 0.77, 0.97], ["III. Ensaio clínico randomizado", "RR", 1.58, 1.10, 3.45]] } = {}){
  const W = 1000, X0 = 420, X1 = 790, T = 92, passo = 80, H = 400 + Math.max(0, linhas.length - 3) * passo;
  const x = (v) => X0 + (Math.log(v / 0.5) / Math.log(8)) * (X1 - X0);
  let g = texto(40, 36, titulo, { t:17, cor:C.tinta, peso:600 });
  g += texto(40, T - 26, "Estudo", { peso:600, cor:C.tinta }) + texto(X1 + 30, T - 26, "Medida (IC 95%)", { peso:600, cor:C.tinta });
  for(const v of [0.5, 1, 2, 4]){ g += `<line x1="${f1(x(v))}" x2="${f1(x(v))}" y1="${T - 12}" y2="${T + linhas.length * passo - 30}" stroke="${v === 1 ? C.tinta : C.grade}" stroke-width="${v === 1 ? 1.6 : 1}" ${v === 1 ? 'stroke-dasharray="5 4"' : ""}/>` + texto(x(v), T + 3 * passo - 10, br(v, v < 1 ? 1 : 0), { ancora:"middle" }); }
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
function dispersao({ alvo = -0.72, n = 40 } = {}){
  const W = 900, H = 580, E = 90, D = 30, T = 60, B = 76;
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
  g += texto(E, H - 8, `Cada ponto é um município (${n} pontos). Dados fictícios; a reta tracejada é o ajuste linear.`, { t:12 });
  return moldura(W, H, g);
}

/* ---------- taquicardia regular de QRS estreito (supraventricular), derivação DII ---------- */
function taquicardiaSupraventricular({ fc = 168, dur = 6 } = {}){
  const ppm = 5, E = 50, T = 70, W = E + dur * 25 * ppm + 40, H = 360, yBase = T + 150, rr = 60 / fc;
  let g = papelEcg(E, T, dur * 25 * ppm, 250, ppm);
  const pts = [];
  for(let t = 0; t <= dur; t += 0.004){
    let v = 0;
    // sem onda P visível: o QRS é estreito (cerca de 80 ms) e o segmento ST tem leve infradesnivelamento, comum na taquicardia rápida
    for(let b = 0.3; b < dur + 0.5; b += rr){ const u = t - b; if(Math.abs(u) < 0.3) v += gauss(u, -0.025, -0.8, 0.008) + gauss(u, 0, 10, 0.011) + gauss(u, 0.026, -1.8, 0.011) + gauss(u, 0.09, -0.9, 0.05) + gauss(u, 0.16, 0.8, 0.04); }
    pts.push([E + t * 25 * ppm, yBase - v * ppm]);
  }
  g += `<path d="${caminho(pts)}" fill="none" stroke="#111" stroke-width="1.7" stroke-linejoin="round"/>`;
  g += texto(E, 38, "Derivação DII — 25 mm/s, 10 mm/mV (ilustração esquemática)", { t: 18, cor: C.tinta, peso: 600 });
  g += texto(E, H - 16, "Traçado esquemático desenhado por computador; não é o exame de um paciente.", { t: 13 });
  return moldura(W, H, g);
}

/* nome → { desenhar, descricao, parametros } */
export const MODELOS = {
  taquicardiaSupraventricular: { desenhar: taquicardiaSupraventricular, descricao: "DII com taquicardia regular de QRS estreito, sem onda P visível (padrão: 168 bpm)", parametros: "fc (bpm), dur (s)" },
  ecg12:            { desenhar: ecg12,            descricao: "Eletrocardiograma de 12 derivações com ritmo longo em DII (padrão: infarto anterior com supra de ST, 90 bpm)", parametros: "rr (s), derivacoes" },
  fibrilacaoAtrial: { desenhar: fibrilacaoAtrial, descricao: "DII com fibrilação atrial e resposta ventricular rápida (RR irregular, sem onda P)", parametros: "batimentos, dur (s), sementeAleatoria" },
  curvaRoc:         { desenhar: curvaRoc,         descricao: "Curva ROC com quatro pontos numerados", parametros: "expoente" },
  heredograma:      { desenhar: heredograma,      descricao: "Heredograma de herança recessiva ligada ao X (três gerações)", parametros: "(nenhum)" },
  cardiotocografia: { desenhar: cardiotocografia, descricao: "Cardiotocografia com desacelerações tardias e variabilidade mínima", parametros: "base (bpm), picos (min), fundos (bpm), atraso (min)" },
  capnograma:       { desenhar: capnograma,       descricao: "Capnograma com platô inclinado (barbatana de tubarão)", parametros: "(nenhum)" },
  mapa:             { desenhar: mapa,             descricao: "MAPA de 24 horas com quadro-resumo", parametros: "(nenhum)" },
  holter:           { desenhar: holter,           descricao: "Holter com run de taquicardia ventricular não sustentada", parametros: "(nenhum)" },
  eeg:              { desenhar: eeg,              descricao: "EEG bipolar com delta brush", parametros: "(nenhum)" },
  floresta:         { desenhar: floresta,         descricao: "Forest plot de estudos fictícios, escala logarítmica", parametros: "titulo, linhas [[rótulo, medida, valor, ic inferior, ic superior]]" },
  dispersao:        { desenhar: dispersao,        descricao: "Diagrama de dispersão com reta de ajuste e correlação alvo", parametros: "alvo (r), n" },
};
