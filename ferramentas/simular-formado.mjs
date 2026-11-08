/* ferramentas/simular-formado.mjs — conferência do cronograma de Formados.
   Abre a plataforma de verdade (Chromium), cria um(a) aluno(a) Formado(a) e
   faz N semanas de sessões recomendadas com um ritmo (questões por semana) e
   um perfil de acerto simulados, respondendo pelo próprio registrarResposta.
   Depois confere o que o cronograma promete:
     · trilha: questão nova de fora dos assuntos em estudo, ou de assunto já
       consolidado, só entra quando a trilha não bastou — e o motivo diz isso;
     · mistura: dentro de cada fase, fácil/média/difícil batem com CONFIG;
     · cobertura por grande área e assuntos consolidados: informados, não exigidos
       (a trilha abre poucos assuntos de cada vez, na ordem da demanda);
     · nenhuma questão repete na mesma sessão nem volta antes do intervalo mínimo;
     · a fila de revisão vencida não passa de duas semanas de revisão crescendo (com 8 semanas ou mais).
   Uso: npm run simular-formado -- [--semanas 8] [--por-semana 200] [--acerto 0.7] [--ritmo firme|padrao|rapida] [--exigir] [--json]
   O teste testes/cronograma-formados.test.mjs usa simularFormado() direto. */
import { pathToFileURL } from "node:url";

export const OPCOES_PADRAO = { semanas: 8, porSemana: 200, diasPorSemana: 6, acerto: 0.7, semente: 7,
  toleranciaMistura: 0.10 };

/* Roda dentro da página: só usa o que a plataforma já tem no escopo global. */
function simularNaPagina(op){
  let s = op.semente;
  const rnd = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;   // repetível entre execuções
  fazerLoginDemo("aluno"); fecharModal();
  const u = usuarioAtual(); u.anoFaculdade = "Formado(a)"; u.grupoId = null; u.grupoQuestoesId = null;
  if(op.ritmo) u.reguaFormado = op.ritmo; else delete u.reguaFormado;
  db.respostas = db.respostas.filter(r => r.usuarioId !== u.id); db.revisoes[u.id] = {};
  const areas = [...new Set(questoesParaEstudo(u.id).map(q => q.areaId))];
  // cada área com um acerto próprio: uma mais fraca, uma mais forte (o aluno real não é uniforme)
  const ajuste = {}; areas.forEach((a, i) => { ajuste[a] = i === 0 ? 0.1 : i === 1 ? -0.15 : 0; });
  const acertoDe = q => Math.max(0.05, Math.min(0.98, op.acerto + ajuste[q.areaId] + [0.15, 0, -0.2][nivelProprioDaQuestao(q)]));
  const porDia = Math.ceil(op.porSemana / op.diasPorSemana);
  const inicio = new Date("2027-01-04T12:00:00");
  const semanas = [], falhas = [];
  const novasPorArea = {}, misturaPorFase = [[0,0,0],[0,0,0],[0,0,0]], misturaReabertos = [0,0,0];
  let dia = 0, duplicadas = 0, repeticoesCedo = 0, novaEmConsolidadoSemAviso = 0, foraDaTrilhaSemAviso = 0, novasNaTrilha = 0;
  for(let w = 0; w < op.semanas; w++){
    const sem = { semana: w+1, feitas: 0, novas: 0, revisao: 0, complemento: 0 };
    for(let d = 0; d < 7; d++, dia++){
      const data = new Date(inicio.getTime() + dia*86400000);
      CONFIG.hoje = () => new Date(data);
      if(d >= op.diasPorSemana) continue;
      let feitas = 0;
      while(feitas < porDia){
        const n = Math.min(tamanhoDaSessaoDoUsuario(u), porDia - feitas);
        const lista = montarSessaoDoDia(u.id, n, feitas);
        if(!lista.length) break;
        const fases = fasesDosAssuntosFormado(u.id), naSessao = new Set();
        const trilha = trilhaDeFormado(u.id), emEstudo = new Set(trilha ? trilha.emEstudo.map(it => it.id) : []);
        const consolidado = new Set(trilha ? trilha.itens.filter(it => it.consolidado && !it.misc).map(it => it.id) : []);
        for(const it of lista){
          const q = getQuestao(it.questaoId);
          if(naSessao.has(q.id)) duplicadas++;
          naSessao.add(q.id);
          const anteriores = db.respostas.filter(r => r.usuarioId === u.id && r.questaoId === q.id);
          if(anteriores.length && diasEntre(anteriores[anteriores.length-1].data, hojeISO()) < CONFIG.intervaloMinimoRevisao) repeticoesCedo++;
          const e = fases[q.assuntoId];
          if(it.origem === "nao_vista"){
            sem.novas++;
            novasPorArea[q.areaId] = (novasPorArea[q.areaId] || 0) + 1;
            if(emEstudo.has(q.assuntoId)) novasNaTrilha++;
            else if(trilha && !/fora da trilha|consolidado|^Miscelânea/.test(it.motivo)) foraDaTrilhaSemAviso++;
            if(consolidado.has(q.assuntoId) && !/consolidado/.test(it.motivo)) novaEmConsolidadoSemAviso++;
            // assunto que já passou das fases e a trilha reabriu (esfriou) vai à parte: não é a fase 3 em andamento
            if(e && e.concluido) misturaReabertos[nivelProprioDaQuestao(q)]++;
            else misturaPorFase[e ? e.fase : 0][nivelProprioDaQuestao(q)]++;
          } else if(/^revisao_/.test(it.origem)) sem.revisao++; else sem.complemento++;
          const ok = rnd() < acertoDe(q);
          const errada = (q.alternativas || []).map(a => a.letra || a.id).find(l => l !== q.gabarito) || "A";
          const confianca = ok ? (rnd() < 0.7 ? "certeza" : "duvida") : (rnd() < 0.3 ? "chute" : "duvida");
          registrarResposta(u.id, q.id, ok ? q.gabarito : errada, confianca, 60, it.origem);
          feitas++; sem.feitas++;
        }
        if(lista.length < n) break;
      }
    }
    const fases = fasesDosAssuntosFormado(u.id);
    const comQuestao = [...new Set(questoesParaEstudo(u.id).map(q => q.assuntoId))];
    sem.explorados = comQuestao.filter(a => fases[a] && fases[a].total).length;
    sem.assuntos = comQuestao.length;
    sem.porFase = [0,1,2].map(f => comQuestao.filter(a => fases[a] && !fases[a].concluido && fases[a].fase === f && fases[a].total).length);
    sem.concluidos = comQuestao.filter(a => fases[a] && fases[a].concluido).length;
    const t = trilhaDeFormado(u.id);
    sem.consolidados = t ? t.consolidados : sem.concluidos;
    const vencidas = questoesRevisaoEspacadaVencidas(u.id);
    sem.vencidas = vencidas.length;
    sem.vencidasErro = vencidas.filter(v => v.motivo === "erro").length;
    semanas.push(sem);
  }
  const totalNovas = Object.values(novasPorArea).reduce((a, b) => a + b, 0);
  const cobertura = areas.map(a => ({ area: nomeArea(a), real: totalNovas ? (novasPorArea[a] || 0) / totalNovas : 0 }));
  const fatiaDaTrilha = totalNovas ? novasNaTrilha / totalNovas : 0;
  const mistura = misturaPorFase.map((v, f) => { const t = v.reduce((a, b) => a + b, 0);
    return { fase: f+1, n: t, real: v.map(x => t ? x/t : 0), alvo: CONFIG.cronogramaFormado.fases[f] }; });
  // só fases com amostra: com poucas questões a proporção ainda não fechou
  mistura.forEach(m => { if(m.n >= 60) m.real.forEach((x, l) => { if(Math.abs(x - m.alvo[l]) > op.toleranciaMistura)
    falhas.push(`mistura: fase ${m.fase} com ${(x*100).toFixed(0)}% de ${["fácil","média","difícil"][l]}, alvo ${(m.alvo[l]*100).toFixed(0)}%`); }); });
  const ultima = semanas[semanas.length-1];
  /* fila de revisão: falha se passou de duas semanas do que a sessão revisa E ainda cresceu mais de 50% nas
     últimas 4 semanas — fila pequena que oscila não é problema; a que cresce além da capacidade, sim */
  if(semanas.length >= 8){ const antes = semanas[semanas.length-5].vencidas, capacidade = 2 * ultima.revisao;
    if(ultima.vencidas > capacidade && ultima.vencidas > antes*1.5)
      falhas.push(`fila de revisão crescendo: ${antes} → ${ultima.vencidas} revisões vencidas nas últimas 4 semanas (mais de duas semanas de revisão, ${capacidade})`); }
  if(duplicadas) falhas.push(`${duplicadas} questão(ões) repetida(s) dentro da mesma sessão`);
  if(repeticoesCedo) falhas.push(`${repeticoesCedo} questão(ões) de volta antes de ${CONFIG.intervaloMinimoRevisao} dias`);
  if(foraDaTrilhaSemAviso) falhas.push(`${foraDaTrilhaSemAviso} questão(ões) nova(s) de fora da trilha sem o motivo dizer por quê`);
  if(novaEmConsolidadoSemAviso) falhas.push(`${novaEmConsolidadoSemAviso} questão(ões) nova(s) de assunto já consolidado sem o motivo dizer por quê`);
  return { opcoes: op, semanas, cobertura, fatiaDaTrilha, mistura, misturaReabertos, falhas };
}

export async function simularFormado(pagina, opcoes = {}){
  return pagina.evaluate(simularNaPagina, { ...OPCOES_PADRAO, ...opcoes });
}

function lerArgumentos(argv){
  const op = {}, nomes = { "--semanas": "semanas", "--por-semana": "porSemana", "--acerto": "acerto", "--dias": "diasPorSemana" };
  for(let i = 0; i < argv.length; i++){
    if(nomes[argv[i]]) op[nomes[argv[i]]] = Number(argv[++i]);
    else if(argv[i] === "--exigir") op.exigir = true;
    else if(argv[i] === "--json") op.json = true;
    else if(argv[i] === "--ritmo") op.ritmo = argv[++i];
  }
  return op;
}

async function principal(){
  const { exigir, json, ...op } = lerArgumentos(process.argv.slice(2));
  const { chromium } = await import("playwright");
  const { subirServidor } = await import("../testes/servidor.mjs");
  const navegador = await chromium.launch(), servidor = await subirServidor({ semNuvem: true });
  let r;
  try{
    const contexto = await navegador.newContext({ serviceWorkers: "block" });
    await contexto.route(/supabase\.co/, rota => rota.abort());
    const pagina = await contexto.newPage();
    await pagina.goto(servidor.url + "index.html");
    await pagina.waitForFunction(() => typeof db !== "undefined" && db && typeof render === "function");
    r = await simularFormado(pagina, op);
  } finally { await navegador.close(); await servidor.fechar(); }
  if(json){ console.log(JSON.stringify(r, null, 1)); }
  else {
    const o = r.opcoes, pc = x => (x*100).toFixed(0).padStart(3) + "%";
    console.log(`Formado(a): ${o.porSemana} questões/semana em ${o.diasPorSemana} dias, acerto base ${pc(o.acerto)}, ritmo ${o.ritmo || "padrao"}, ${o.semanas} semanas\n`);
    console.log("sem  feitas novas revisão compl. explorados    fase1 fase2 fase3 consolidados vencidas (erro/acerto antigo)");
    r.semanas.forEach(s => console.log(
      `${String(s.semana).padStart(3)} ${String(s.feitas).padStart(7)} ${String(s.novas).padStart(5)} ${String(s.revisao).padStart(7)} ${String(s.complemento).padStart(6)} ${(s.explorados+"/"+s.assuntos).padStart(11)} ` +
      `${s.porFase.map(n => String(n).padStart(5)).join(" ")} ${String(s.consolidados).padStart(12)} ${String(s.vencidas).padStart(8)} (${s.vencidasErro}/${s.vencidas - s.vencidasErro})`));
    console.log(`\nQuestões novas dos assuntos em estudo da trilha: ${pc(r.fatiaDaTrilha)}`);
    console.log("Cobertura das áreas (questões novas, só informativo — a trilha segue a demanda):");
    r.cobertura.forEach(c => console.log(`  ${c.area.padEnd(32)} ${pc(c.real)}`));
    console.log("\nMistura dentro de cada fase (fácil/média/difícil):");
    r.mistura.forEach(m => console.log(`  fase ${m.fase}: ${m.real.map(pc).join(" /")}  (alvo ${m.alvo.map(pc).join(" /")}, ${m.n} questões)`));
    const nr = r.misturaReabertos.reduce((a, b) => a + b, 0);
    if(nr) console.log(`  reabertos (passaram das fases e esfriaram): ${r.misturaReabertos.map(x => pc(x/nr)).join(" /")}  (${nr} questões)`);
    console.log(r.falhas.length ? "\nFalhas:\n  " + r.falhas.join("\n  ") : "\nTudo dentro do esperado.");
  }
  if(exigir && r.falhas.length) process.exit(1);
}

if(import.meta.url === pathToFileURL(process.argv[1] || "").href) principal();
