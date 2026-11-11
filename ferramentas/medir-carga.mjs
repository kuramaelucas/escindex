/* ferramentas/medir-carga.mjs — quanto custa abrir a plataforma.
   Abre o site de verdade (Chromium, servidor local, sem service worker) em dois
   cenários — "entrada" (tela pública, 1ª visita) e "início" (aluno logado, visita
   seguinte) — e em duas máquinas: desktop e "celular" (CPU 4× mais lenta).
   Lê as marcas performance.mark do index.html e de 14-admin-e-inicializacao.js
   (esc:html, esc:dados-prontos, esc:codigo-prontos, esc:db-montado, esc:primeira-tela),
   conta arquivos e bytes baixados e a memória (heap JS). Serve de linha de base da
   carga inicial (docs/PROJETO-CARGA-INICIAL.md, seção 4).
   Uso: npm run medir-carga -- [--exigir] [--json] [--repeticoes 3]
   Sem --exigir é só informativo (a exigência começa depois da fase 2 do projeto);
   com --exigir, falha se passar do orçamento. */
import { pathToFileURL } from "node:url";

/* Orçamento da seção 4 do projeto (celular 4×; transferência e heap em qualquer máquina). */
export const ORCAMENTO = {
  entradaCelularMs: 1000, inicioCelularMs: 2000, transferenciaEntradaMB: 2, heapInicioMB: 80,
};

const mediana = v => { const o = [...v].sort((a, b) => a - b); return o[Math.floor(o.length / 2)]; };

async function medirUma(navegador, servidor, { cenario, cpu }){
  const contexto = await navegador.newContext({ serviceWorkers: "block", viewport: { width: 1280, height: 800 } });
  await contexto.route(/supabase\.co/, rota => rota.abort());
  const pagina = await contexto.newPage();
  const cdp = await contexto.newCDPSession(pagina);
  await cdp.send("Network.enable"); await cdp.send("Performance.enable");
  let bytes = 0, arquivos = 0, deDados = 0, deCodigo = 0, contando = true;
  const urls = new Map();
  cdp.on("Network.requestWillBeSent", e => urls.set(e.requestId, e.request.url));
  cdp.on("Network.loadingFinished", e => {
    if(!contando) return;
    bytes += e.encodedDataLength; const u = urls.get(e.requestId) || "";
    if(/\.js(\?|$)/.test(u)){ arquivos++; if(u.includes("/dados/")) deDados++; else if(u.includes("/codigo/")) deCodigo++; }
  });
  const esperar = () => pagina.waitForFunction(() => performance.getEntriesByName("esc:primeira-tela").length > 0, null, { timeout: 120000 });
  const ler = () => pagina.evaluate(() => {
    const m = n => { const e = performance.getEntriesByName(n)[0]; return e ? Math.round(e.startTime) : null; };
    const nav = performance.getEntriesByType("navigation")[0];
    return { html: m("esc:html"), moldura: m("esc:moldura"), dados: m("esc:dados-prontos"), codigo: m("esc:codigo-prontos"), db: m("esc:db-montado"),
      primeiraTela: m("esc:primeira-tela"), dcl: Math.round(nav.domContentLoadedEventEnd) };
  });
  try{
    if(cenario === "inicio"){
      // visita seguinte: o banco já foi gravado no navegador por uma carga sem limite de CPU
      await pagina.goto(servidor.url + "index.html"); await esperar();
      await pagina.evaluate(() => saveState());
      contando = false;
    }
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
    bytes = 0; arquivos = 0; deDados = 0; deCodigo = 0; contando = true;
    await pagina.goto(servidor.url + "index.html"); await esperar();
    // o login local não sobrevive a recarregar (só a nuvem guarda a sessão): o Início
    // é medido entrando como aluno logo depois da 1ª tela, o que inclui desenhá-lo
    if(cenario === "inicio") await pagina.evaluate(() => { fazerLoginDemo("aluno"); fecharModal(); performance.mark("esc:primeira-tela-aluno"); });
    const marcas = await ler();
    // na entrada (tela pública) a pessoa já vê e usa a moldura: é o que a meta de 1 s mede
    if(cenario === "entrada") marcas.primeiraTela = marcas.moldura;
    if(cenario === "inicio") marcas.primeiraTela = await pagina.evaluate(() => Math.round(performance.getEntriesByName("esc:primeira-tela-aluno")[0].startTime));
    const heap = (await cdp.send("Performance.getMetrics")).metrics.find(x => x.name === "JSHeapUsedSize").value / 1048576;
    const custos = await pagina.evaluate(() => {
      const t = f => { const a = performance.now(); f(); return Math.round(performance.now() - a); };
      return { copiaDaSemente: t(() => copiaProfunda(SEED_QUESTOES)), gravarBanco: t(() => JSON.stringify(compactarParaArmazenar(db))), questoes: SEED_QUESTOES.length };
    });
    return { ...marcas, heapMB: heap, transferenciaMB: bytes / 1048576, arquivos, deDados, deCodigo, ...custos };
  } finally { await contexto.close(); }
}

export async function medirCarga({ repeticoes = 3 } = {}){
  const { chromium } = await import("playwright");
  const { subirServidor } = await import("../testes/servidor.mjs");
  const navegador = await chromium.launch(process.env.ESC_CHROMIUM ? { executablePath: process.env.ESC_CHROMIUM } : {}), servidor = await subirServidor({ semNuvem: true });
  const r = {};
  try{
    for(const cenario of ["entrada", "inicio"]) for(const [maquina, cpu] of [["desktop", 1], ["celular", 4]]){
      const rodadas = [];
      for(let i = 0; i < repeticoes; i++) rodadas.push(await medirUma(navegador, servidor, { cenario, cpu }));
      const med = {};
      for(const k of Object.keys(rodadas[0])) med[k] = mediana(rodadas.map(x => x[k]));
      r[`${cenario}/${maquina}`] = med;
    }
  } finally { await navegador.close(); await servidor.fechar(); }
  return r;
}

export function conferirOrcamento(r){
  const falhas = [], o = ORCAMENTO;
  const e = r["entrada/celular"], i = r["inicio/celular"];
  if(e.primeiraTela > o.entradaCelularMs) falhas.push(`tela de entrada no celular: ${e.primeiraTela} ms (meta ≤ ${o.entradaCelularMs})`);
  if(i.primeiraTela > o.inicioCelularMs) falhas.push(`Início no celular: ${i.primeiraTela} ms (meta ≤ ${o.inicioCelularMs})`);
  if(e.transferenciaMB > o.transferenciaEntradaMB) falhas.push(`transferência até a entrada: ${e.transferenciaMB.toFixed(1)} MB (meta ≤ ${o.transferenciaEntradaMB})`);
  if(i.heapMB > o.heapInicioMB) falhas.push(`heap depois do Início: ${i.heapMB.toFixed(0)} MB (meta ≤ ${o.heapInicioMB})`);
  return falhas;
}

async function principal(){
  const a = process.argv.slice(2), exigir = a.includes("--exigir"), json = a.includes("--json");
  const rep = a.indexOf("--repeticoes") >= 0 ? Number(a[a.indexOf("--repeticoes") + 1]) : 3;
  const r = await medirCarga({ repeticoes: rep });
  if(json) console.log(JSON.stringify(r, null, 1));
  else {
    console.log(`Carga inicial (mediana de ${rep}; "celular" = CPU 4× mais lenta; tempos em ms desde o início da navegação)\n`);
    const cols = Object.keys(r), L = (nome, f) => console.log(nome.padEnd(30) + cols.map(c => String(f(r[c])).padStart(18)).join(""));
    console.log(" ".repeat(30) + cols.map(c => c.padStart(18)).join(""));
    L("HTML começou a rodar", x => x.html); L("DOMContentLoaded", x => x.dcl);
    L("dados/ executados", x => x.dados); L("codigo/ executado", x => x.codigo);
    L("moldura desenhada", x => x.moldura); L("db montado (loadState)", x => x.db); L("tela pronta (entrada=moldura)", x => x.primeiraTela);
    L("arquivos .js (dados+codigo)", x => `${x.arquivos} (${x.deDados}+${x.deCodigo})`);
    L("transferência (MB)", x => x.transferenciaMB.toFixed(1)); L("heap JS (MB)", x => x.heapMB.toFixed(0));
    L("copiaProfunda(SEED) ms", x => x.copiaDaSemente); L("gravar o banco ms", x => x.gravarBanco);
    console.log(`\nQuestões na semente: ${r[cols[0]].questoes}`);
  }
  const falhas = conferirOrcamento(r);
  if(falhas.length){
    console.log(`\nFora do orçamento (docs/PROJETO-CARGA-INICIAL.md, seção 4)${exigir ? "" : " — só informativo"}:\n  - ` + falhas.join("\n  - "));
    if(exigir) process.exit(1);
  } else console.log("\nDentro do orçamento.");
}
if(import.meta.url === pathToFileURL(process.argv[1]).href) principal().catch(e => { console.error(e); process.exit(1); });
