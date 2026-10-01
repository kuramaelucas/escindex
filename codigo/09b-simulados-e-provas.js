/* codigo/09b-simulados-e-provas.js — Provas e Simulados: simulado cronometrado e resultado (seção 13) e provas antigas (seção 14).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   13. SIMULADOS (lista, execução cronometrada, resultado)
   ========================================================================== */
/* ---------- uma tela só para prova cronometrada -----------------------------
   Simulados e Provas Antigas eram duas entradas de menu que levavam ao mesmo
   lugar mental — "fazer uma prova inteira, no relógio" — e a pessoa tinha de
   lembrar em qual delas estava o que queria. Agora são duas abas de uma tela
   só, e a diferença continua explícita, porque ela é real:

   - PROVA ANTIGA é a prova de verdade de uma instituição num ano, do jeito
     que caiu. Serve para medir onde você está contra a banca.
   - SIMULADO é um recorte montado pela equipe (ou por você), com tempo e
     tamanho escolhidos. Serve para treinar um bloco ou um assunto.

   O histórico de notas é o mesmo para os dois, então fica embaixo das duas
   abas em vez de duplicado. */
function abaProvas(){
  const f = state.filtroRota;
  if(f.abaProvas !== "simulados" && f.abaProvas !== "antigas") f.abaProvas = "antigas";
  return f.abaProvas;
}
function mudarAbaProvas(aba){ state.filtroRota.abaProvas = aba; render(); }
function renderProvasESimulados(){
  const u = usuarioAtual();
  const aba = abaProvas();
  const bloco = getBlocoAtual();
  const recomendados = bloco ? db.simulados.filter(s=>s.recomendadoParaBlocos && s.recomendadoParaBlocos.includes(bloco.id)) : [];
  const outros = db.simulados.filter(s=>!recomendados.includes(s));
  const meusResultados = db.resultadosSimulados.filter(r=>r.usuarioId===u.id).sort((a,b)=>b.data.localeCompare(a.data));
  const pagResultados = paginar(meusResultados, "provas-resultados", {porPagina:10});
  return `
  <div class="page-header"><h2>Provas e Simulados</h2><p>Prova inteira, no relógio. Na primeira aba, as provas antigas como caíram; na segunda, os simulados montados pela equipe para um bloco ou assunto.</p></div>
  <div class="flex gap-1 mb-2" style="flex-wrap:wrap">
    <button class="pill ${aba==="antigas"?"active":""}" onclick="mudarAbaProvas('antigas')">${iconeSvg("archive")} Provas antigas</button>
    <button class="pill ${aba==="simulados"?"active":""}" onclick="mudarAbaProvas('simulados')">${iconeSvg("clipboard")} Simulados da equipe (${db.simulados.length})</button>
  </div>
  ${aba==="antigas" ? renderAbaProvasAntigas(u) : `
    <p class="text-sm muted mb-2">Montados por professores, com tempo e tamanho definidos por eles. ${bloco ? `Os recomendados são os do seu bloco atual (${escapeHtml(bloco.nome)}).` : "Sem calendário de blocos, não há simulado recomendado para o seu bloco: todos aparecem juntos."}</p>
    ${recomendados.length ? `<div class="card-title mb-1">Recomendados para o seu bloco atual</div>${recomendados.map(renderSimuladoCard).join("")}` : ""}
    ${outros.length ? `<div class="card-title mt-3 mb-1">Outros simulados disponíveis</div>${outros.map(renderSimuladoCard).join("")}` : ""}
    ${!db.simulados.length ? '<div class="empty-state">Nenhum simulado disponível ainda. Peça a um professor para criar e recomendar um simulado para o seu bloco — ou faça uma prova antiga inteira, na aba ao lado.</div>' : ""}
  `}
  ${meusResultados.length ? `<div class="card mt-3">
    <div class="card-title mb-1">Suas notas (provas antigas e simulados)</div>
    <div class="table-wrap"><table><thead><tr><th>Prova</th><th>Nota</th><th>Data</th><th></th></tr></thead><tbody>
      ${pagResultados.itens.map(r=>`<tr><td class="text-sm">${escapeHtml(r.titulo||"—")}</td><td><span class="badge ${r.nota>=70?"badge-accent":r.nota>=50?"badge-amber":"badge-danger"}">${r.nota}%</span></td><td class="text-sm">${formatDataBR(r.data)}</td><td>${r.itens?`<button class="link-btn" onclick="verDetalheResultadoSimulado('${r.id}')">ver detalhes</button>`:""}</td></tr>`).join("")}
    </tbody></table></div>
    ${controlesPaginacao(pagResultados, "resultado(s)")}
  </div>` : ""}
  `;
}
// as duas rotas antigas continuam respondendo e levam à mesma tela
function renderSimulados(){ return renderProvasESimulados(); }
/* histórico do próprio usuário naquele simulado, para ele saber, na hora de
   escolher, se já fez e como foi */
function desempenhoPrevioSimulado(simuladoId, titulo){
  const u = usuarioAtual();
  const tentativas = db.resultadosSimulados
    .filter(r=>r.usuarioId===u.id && (simuladoId ? r.simuladoId===simuladoId : r.titulo===titulo))
    .sort((a,b)=>a.data.localeCompare(b.data));
  if(!tentativas.length) return null;
  const notas = tentativas.map(t=>t.nota);
  const ultima = tentativas[tentativas.length-1];
  return {
    n: tentativas.length, ultima, melhor: Math.max(...notas),
    variacao: tentativas.length>1 ? ultima.nota - tentativas[tentativas.length-2].nota : null,
  };
}
function renderSimuladoCard(s){
  const previo = desempenhoPrevioSimulado(s.id, s.titulo);
  return `<div class="card mb-1">
    <div class="flex justify-between items-center gap-2" style="flex-wrap:wrap">
      <div>
        <div style="font-weight:700">${escapeHtml(s.titulo)}</div>
        <div class="text-sm muted">${s.questoes.length} questões · ${s.duracaoMin} min</div>
        ${previo ? `<div class="qcard-meta mt-1">
            <span class="badge ${previo.ultima.nota>=70?"badge-accent":previo.ultima.nota>=50?"badge-amber":"badge-danger"}">já feito · última nota ${previo.ultima.nota}%</span>
            <span class="badge badge-muted">melhor: ${previo.melhor}%</span>
            <span class="badge badge-muted">${previo.n} tentativa(s) · ${formatDataBR(previo.ultima.data)}</span>
            ${previo.variacao!==null ? `<span class="badge ${previo.variacao>=0?"badge-accent":"badge-danger"}">${previo.variacao>=0?"+":""}${previo.variacao} pts vs. anterior</span>` : ""}
          </div>` : '<div class="qcard-meta mt-1"><span class="badge badge-muted">ainda não realizado</span></div>'}
      </div>
      <div class="flex gap-1" style="flex-wrap:wrap">
        ${previo && previo.ultima.itens ? `<button class="btn btn-secondary btn-sm" onclick="verDetalheResultadoSimulado('${previo.ultima.id}')">Ver resultado anterior</button>` : ""}
        <button class="btn btn-primary btn-sm" onclick="iniciarSimulado('${s.id}')">${previo?"Refazer":"Começar"}</button>
      </div>
    </div>
  </div>`;
}
function iniciarSimulado(simuladoId){
  const s = db.simulados.find(x=>x.id===simuladoId); if(!s) return;
  // simulado montado antes de a questão ficar à espera da figura (ou
  // questão que saiu do banco) não entra — ver aguardaImagem()
  const qids = s.questoes.filter(qid=>{ const q = getQuestao(qid); return q && !aguardaImagem(q); });
  if(!qids.length){ toast("Este simulado não tem questões disponíveis no momento.", "err"); return; }
  state.sessaoAtual = { id:uid("simsessao"), tipo:"simulado", simuladoId, titulo:s.titulo, itens:qids.map(qid=>({questaoId:qid, motivo:"Simulado: "+s.titulo})), indiceAtual:0, respostasSimulado:{}, duracaoMin:s.duracaoMin, finalizado:false, modoAprendizado:false, inicioMs:Date.now(), tsQuestao:Date.now(), tempos:{} };
  navigate("simulado-ativo");
}

/* ---------- cronômetro do simulado e tempo por questão ----------
   O relógio corre num intervalo próprio e só escreve no elemento da tela,
   sem redesenhar a página inteira a cada segundo. O tempo gasto em cada
   questão é acumulado toda vez que o aluno troca de questão ou finaliza —
   é esse número que depois mostra onde ele trava. */
let intervaloCronometro = null;
function acumularTempoQuestaoSimulado(){
  const s = state.sessaoAtual;
  if(!s || s.tipo!=="simulado" || !s.tsQuestao) return;
  const item = s.itens[s.indiceAtual]; if(!item) return;
  const delta = (Date.now() - s.tsQuestao)/1000;
  if(delta>0 && delta<7200) s.tempos[item.questaoId] = (s.tempos[item.questaoId]||0) + delta;
  s.tsQuestao = Date.now();
}
function tempoDecorridoSimulado(){
  const s = state.sessaoAtual;
  if(!s || !s.inicioMs) return 0;
  return Math.floor(((s.fimMs||Date.now()) - s.inicioMs)/1000);
}
function pararCronometro(){
  if(intervaloCronometro && typeof clearInterval==="function"){ clearInterval(intervaloCronometro); }
  intervaloCronometro = null;
}
function atualizarCronometro(){
  const s = state.sessaoAtual;
  // o relógio se desliga sozinho quando não há simulado em andamento
  if(!s || s.tipo!=="simulado" || s.finalizado || !s.inicioMs){ pararCronometro(); return; }
  const el = (typeof document!=="undefined") ? document.getElementById("cronometroSimulado") : null;
  if(!el) return;
  const decorrido = tempoDecorridoSimulado();
  const limite = (s.duracaoMin||0)*60;
  if(!limite){ el.textContent = formatarDuracao(decorrido)+" decorridos"; return; }
  const restante = limite - decorrido;
  if(restante<=0){
    el.textContent = "tempo esgotado";
    toast("Tempo esgotado. O simulado foi finalizado automaticamente — suas respostas estão salvas.", "err");
    finalizarSimulado();
    return;
  }
  el.textContent = formatarDuracao(restante)+" restantes";
  el.className = "badge " + (restante<300 ? "badge-danger" : restante<600 ? "badge-amber" : "badge-muted");
}
function garantirCronometro(){
  if(intervaloCronometro || typeof setInterval!=="function") return;
  intervaloCronometro = setInterval(atualizarCronometro, 1000);
}
function selecionarAlternativaSimulado(altId){
  if(haTextoSelecionado()) return;   // quem arrastou para destacar não escolheu a alternativa
  const sessao = state.sessaoAtual; if(!sessao) return;
  desriscarSeNecessario(altId);
  sessao.respostasSimulado[sessao.itens[sessao.indiceAtual].questaoId] = altId;
  render();
}
function irQuestaoSimulado(delta){ const s=state.sessaoAtual; acumularTempoQuestaoSimulado(); s.indiceAtual=Math.max(0,Math.min(s.itens.length-1,s.indiceAtual+delta)); render(); }
function irQuestaoSimuladoIndice(i){ acumularTempoQuestaoSimulado(); state.sessaoAtual.indiceAtual=i; render(); }
function confirmarSairSimulado(){
  abrirModal(`${cabecalhoJanela("Sair sem salvar?")}<p>Se sair agora, suas respostas deste simulado não serão registradas.</p><div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="fecharModal();state.sessaoAtual=null;navigate('simulados')">Sair mesmo assim</button><button class="btn btn-secondary" onclick="fecharModal()">Continuar simulado</button></div>`);
}
function finalizarSimulado(){
  const sessao = state.sessaoAtual; const u = usuarioAtual();
  if(sessao.finalizado) return;
  acumularTempoQuestaoSimulado();
  sessao.fimMs = Date.now();
  const tempoTotalSeg = sessao.inicioMs ? tempoDecorridoSimulado() : null;
  let acertos = 0;
  sessao.itens.forEach(it=>{
    const q = getQuestao(it.questaoId);
    const resp = sessao.respostasSimulado[it.questaoId];
    if(resp===q.gabarito) acertos++;
    if(resp) registrarResposta(u.id, it.questaoId, resp, "duvida", sessao.tempos ? sessao.tempos[it.questaoId] : null);
  });
  const nota = pct(acertos, sessao.itens.length);
  db.resultadosSimulados.push({id:uid("res"), usuarioId:u.id, simuladoId:sessao.simuladoId, titulo:sessao.titulo, nota, acertos, total:sessao.itens.length, data:hojeISO(), itens:copiaProfunda(sessao.itens), respostas:{...sessao.respostasSimulado}, tempoTotalSeg, tempos:{...(sessao.tempos||{})}});
  nuvemRegistrar({resultadoSimulado: db.resultadosSimulados[db.resultadosSimulados.length-1]});
  saveState();
  sessao.finalizado = true;
  pararCronometro();
  render();
}
function verDetalheResultadoSimulado(resultadoId){
  const r = db.resultadosSimulados.find(x=>x.id===resultadoId);
  if(!r || !r.itens){ toast("Este resultado é de antes desta função existir e não tem detalhe salvo.", "err"); return; }
  state.sessaoAtual = { id:uid("simsessao"), tipo:"simulado", simuladoId:r.simuladoId, titulo:r.titulo, itens:r.itens, indiceAtual:0, respostasSimulado:{...r.respostas}, finalizado:true, modoAprendizado:false, tempos:{...(r.tempos||{})}, tempoTotalSeg:r.tempoTotalSeg||null };
  navigate("simulado-ativo");
}
function renderSimuladoAtivo(){
  const sessao = state.sessaoAtual;
  if(!sessao || sessao.tipo!=="simulado") return `<div class="empty-state">Nenhum simulado em andamento.<br><button class="btn btn-primary mt-2" onclick="navigate('simulados')">Ver simulados</button></div>`;
  if(sessao.finalizado) return renderResultadoSimulado();
  const item = sessao.itens[sessao.indiceAtual];
  const q = getQuestao(item.questaoId);
  const respostaAtual = sessao.respostasSimulado[q.id];
  // conta sobre a lista da prova (e não sobre as chaves do objeto de
  // respostas), para o número continuar certo mesmo que a mesma questão
  // apareça duas vezes numa lista montada por filtro
  const respondidasCount = sessao.itens.filter(it=>sessao.respostasSimulado[it.questaoId]!==undefined).length;
  const emBranco = sessao.itens.length - respondidasCount;
  const emModoAprendizado = !!sessao.modoAprendizado;
  const jaRespondeuEssa = respostaAtual !== undefined;
  garantirCronometro();
  return `<div class="coluna-questao">
  <div class="flex justify-between items-center mb-2" style="flex-wrap:wrap;gap:.5rem">
    <div class="text-sm muted flex items-center gap-1" style="flex-wrap:wrap">
      <span>Questão ${sessao.indiceAtual+1} de ${sessao.itens.length} · ${respondidasCount} respondida(s) · ${emBranco} em branco</span>
      ${iconeSvg("clock")}<span class="badge badge-muted" id="cronometroSimulado">${sessao.duracaoMin?formatarDuracao(Math.max(0,sessao.duracaoMin*60 - tempoDecorridoSimulado()))+" restantes":formatarDuracao(tempoDecorridoSimulado())+" decorridos"}</span>
    </div>
    <div class="flex gap-1">
      <button class="btn ${emModoAprendizado?"btn-primary":"btn-secondary"} btn-sm" onclick="alternarModoAprendizadoSimulado()" title="Mostra a explicação assim que você responder, sem esperar o fim do simulado">${emModoAprendizado?iconeSvg("check")+" Modo aprendizado ativado":"Ativar modo aprendizado"}</button>
      <button class="btn btn-ghost btn-sm" onclick="confirmarSairSimulado()">Sair sem salvar</button>
    </div>
  </div>
  ${htmlBarraDeQuestoes({ id: "mapaDoSimulado", feitas: respondidasCount, total: sessao.itens.length,
    titulo: respondidasCount + " respondida(s) · " + emBranco + " em branco",
    pills: sessao.itens.map((it,i)=>{
      // o número da questão fica sempre visível: é por ele que a pessoa se
      // localiza na prova e no caderno de rascunho
      const respondida = sessao.respostasSimulado[it.questaoId] !== undefined;
      const atual = i===sessao.indiceAtual;
      return `<button class="pill pill-mapa ${respondida?"respondida":"em-branco"}${atual?" atual":""}" onclick="irQuestaoSimuladoIndice(${i})" title="Questão ${i+1} — ${respondida?"respondida":"em branco"}${atual?" (você está nesta)":""}" aria-label="Questão ${i+1}, ${respondida?"respondida":"em branco"}"${atual?' aria-current="true"':""}>${respondida?'<span class="ponto-resp"></span>':""}${i+1}</button>`;
    }).join(""),
    detalhe: `<div class="mapa-legenda text-xs muted">
      <span class="amostra"><span class="quadro"></span>respondida (${respondidasCount})</span>
      <span class="amostra"><span class="quadro vazio"></span>em branco (${emBranco})</span>
    </div>
    <div class="text-xs muted mt-1">Clique num número para ir direto, ou use as teclas A (anterior) / D (próxima). A barra mostra só o que já foi respondido; se a resposta está certa ou errada você fica sabendo no resultado, quando o simulado acabar.</div>` })}
  <div class="area-gesto" id="areaGestoQuestao">
    ${renderQuestionCard(q, emModoAprendizado ? {selecionada:respostaAtual, modoSimulado:true, respondida:jaRespondeuEssa} : {selecionada:respostaAtual, modoSimulado:true, respondida:false})}
  </div>
  <div class="dica-arrastar">${iconeSvg("swipe")}<span>arraste para o lado para trocar de questão</span></div>
  <div class="flex justify-between mt-2">
    <button class="btn btn-secondary" onclick="irQuestaoSimulado(-1)" ${sessao.indiceAtual===0?"disabled":""}>Anterior</button>
    ${sessao.indiceAtual < sessao.itens.length-1 ? `<button class="btn btn-secondary" onclick="irQuestaoSimulado(1)">Próxima</button>` : `<button class="btn btn-primary" onclick="finalizarSimulado()">Finalizar simulado</button>`}
  </div>
  </div>`;
}
/* Quanto tempo cada questão consumiu e onde o aluno travou. "Travar" aqui é
   passar de 1,6 vez o tempo mediano dele mesmo — comparação com o próprio
   ritmo, não com um padrão externo. */
function analiseTempoSimulado(sessao, linhas){
  const tempos = sessao.tempos || {};
  const comTempo = linhas.map(l=>({i:l.i, qid:l.q.id, correta:l.correta, seg: Math.round(tempos[l.q.id]||0)})).filter(x=>x.seg>0);
  if(comTempo.length < 2) return null;
  const ordenados = comTempo.map(x=>x.seg).sort((a,b)=>a-b);
  const meio = Math.floor(ordenados.length/2);
  const mediana = ordenados.length%2 ? ordenados[meio] : Math.round((ordenados[meio-1]+ordenados[meio])/2);
  const soma = ordenados.reduce((a,b)=>a+b,0);
  const total = sessao.tempoTotalSeg || soma;
  return {
    total, media: Math.round(soma/comTempo.length), mediana,
    lentas: comTempo.filter(x=>x.seg > mediana*1.6).sort((a,b)=>b.seg-a.seg).slice(0,5),
  };
}
function irParaRevisaoQuestaoSimulado(i){
  const alvo = document.getElementById("res-q-"+i);
  if(alvo) alvo.scrollIntoView({behavior:"smooth", block:"start"});
}
function revisarErrosDoSimulado(){
  const sessao = state.sessaoAtual; if(!sessao) return;
  const errados = sessao.itens.filter(it=>{
    const q = getQuestao(it.questaoId);
    return q && sessao.respostasSimulado[it.questaoId] !== q.gabarito && !questaoOculta(usuarioAtual().id, it.questaoId);
  }).map(it=>({questaoId:it.questaoId, motivo:"Erro no simulado: "+(sessao.titulo||"")}));
  if(!errados.length){ toast("Você não errou nenhuma questão deste simulado."); return; }
  state.sessaoAtual = null;
  iniciarSessaoComLista(errados, "pratica");
}
function alternarModoAprendizadoSimulado(){
  const sessao = state.sessaoAtual; if(!sessao) return;
  sessao.modoAprendizado = !sessao.modoAprendizado;
  toast(sessao.modoAprendizado ? "Modo aprendizado ativado: a partir de agora você vê a explicação assim que responder." : "Modo aprendizado desativado — voltando ao formato de prova.");
  render();
}
function renderResultadoSimulado(){
  const sessao = state.sessaoAtual;
  const total = sessao.itens.length;
  let acertos = 0;
  const linhas = sessao.itens.map((it,i)=>{
    const q = getQuestao(it.questaoId);
    const resp = sessao.respostasSimulado[it.questaoId];
    const correta = resp===q.gabarito; if(correta) acertos++;
    return {i,q,resp,correta};
  });
  const nota = pct(acertos,total);
  const analiseTempo = analiseTempoSimulado(sessao, linhas);
  const chaveRanking = sessao.simuladoId || sessao.titulo;
  const ranking = estatisticasRankingSimulado(chaveRanking, nota);
  return `
  <div class="card" style="max-width:480px">
    <h2>Resultado do simulado</h2>
    <div class="stat-tile mt-2"><div class="stat-value">${nota}%</div><div class="stat-label">${acertos} de ${total} corretas</div></div>
    <button class="btn btn-primary mt-2" onclick="state.sessaoAtual=null;navigate('simulados')">Voltar aos simulados</button>
  </div>
  ${ranking ? `
  <div class="card mt-2" style="max-width:520px">
    <div class="card-title">Como você se saiu, de forma anônima</div>
    <p class="text-sm muted">${ranking.origem==="turma"
      ? `Comparado às ${ranking.n} tentativas deste simulado feitas pela turma, em qualquer aparelho (sem identificar ninguém).`
      : `Comparado às ${ranking.n} tentativas deste simulado registradas neste navegador (sem identificar ninguém).${nuvemLigada() && !nuvemConectado() ? " Entrando com a sua conta da nuvem, a comparação passa a ser com a turma inteira." : ""}`}</p>
    <div class="grid grid-2 mt-2">
      <div class="stat-tile"><div class="stat-value">Percentil ${ranking.percentil}</div><div class="stat-label">você superou ${ranking.percentil}% das tentativas</div></div>
      <div class="stat-tile"><div class="stat-value">${ranking.mediana}%</div><div class="stat-label">nota mediana (percentil 50)</div></div>
    </div>
    <div class="mt-2">${graficoHistogramaSvg(ranking.buckets, ranking.bucketAtual, ["0-20","21-40","41-60","61-80","81-100"])}</div>
  </div>` : `<div class="card-flat mt-2 text-sm muted" style="max-width:520px">Ainda não há tentativas suficientes deste simulado ${nuvemConectado() ? "na turma" : "neste navegador"} para calcular um percentil (é preciso pelo menos 3).</div>`}
  ${analiseTempo ? `<div class="card mt-2" style="max-width:620px">
    <div class="card-title">Tempo</div>
    <div class="grid grid-3 mt-2">
      <div class="stat-tile"><div class="stat-value">${formatarDuracao(analiseTempo.total)}</div><div class="stat-label">tempo total${sessao.duracaoMin?" (limite de "+sessao.duracaoMin+" min)":""}</div></div>
      <div class="stat-tile"><div class="stat-value">${formatarDuracao(analiseTempo.media)}</div><div class="stat-label">média por questão</div></div>
      <div class="stat-tile"><div class="stat-value">${formatarDuracao(analiseTempo.mediana)}</div><div class="stat-label">tempo mediano por questão</div></div>
    </div>
    ${analiseTempo.lentas.length ? `<div class="mt-2">
      <div class="text-sm" style="font-weight:600">Onde você travou</div>
      <p class="text-xs muted mb-1">Questões que consumiram bem mais tempo que a sua mediana. Travar numa questão que você acertou também conta: numa prova cronometrada, esse tempo sai de outra questão.</p>
      ${analiseTempo.lentas.map(l=>`<div class="flex justify-between items-center card-flat mb-1">
        <span class="text-sm">Questão ${l.i+1} · ${escapeHtml(nomeAssunto(getQuestao(l.qid).assuntoId))} <span class="badge ${l.correta?"badge-accent":"badge-danger"}">${l.correta?"acertou":"errou"}</span></span>
        <span class="flex items-center gap-1"><span class="badge badge-amber">${formatarDuracao(l.seg)}</span><button class="link-btn" onclick="irParaRevisaoQuestaoSimulado(${l.i})">ver</button></span>
      </div>`).join("")}
    </div>` : '<p class="text-xs muted mt-2">Seu ritmo foi parelho: nenhuma questão destoou muito da mediana.</p>'}
  </div>` : ""}
  <div class="card mt-2">
    <div class="card-title mb-1">Mapa de acertos e erros</div>
    <p class="text-sm muted mb-2">Verde = acertou, vermelho = errou, cinza = deixou em branco. Clique num número para pular direto para a revisão daquela questão.</p>
    <div class="flex gap-1" style="flex-wrap:wrap">
      ${linhas.map(l=>`<button class="pill" style="min-width:38px;justify-content:center;${l.resp===undefined?"":l.correta?"background:var(--accent);border-color:var(--accent);color:#fff":"background:var(--danger);border-color:var(--danger);color:#fff"}" onclick="irParaRevisaoQuestaoSimulado(${l.i})" title="${l.resp===undefined?"em branco":(l.correta?"acertou":"errou")}">${l.i+1}</button>`).join("")}
    </div>
    <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
      <button class="btn btn-secondary btn-sm" onclick="revisarErrosDoSimulado()">${iconeSvg("refresh")} Praticar agora só as que errei</button>
      <button class="btn btn-ghost btn-sm" onclick="state.sessaoAtual=null;navigate('historico')">Ver histórico de atividade</button>
    </div>
  </div>
  <div class="mt-3"><div class="card-title mb-1">Revisão questão a questão</div>
  ${linhas.map(l=>`<div class="mb-2" id="res-q-${l.i}"><span class="badge ${l.resp===undefined?"badge-muted":l.correta?"badge-accent":"badge-danger"}">Questão ${l.i+1}: ${l.resp===undefined?"em branco":l.correta?"correta":"incorreta"}</span>${renderQuestionCard(l.q,{selecionada:l.resp, respondida:true})}</div>`).join("")}
  </div>`;
}

/* ==========================================================================
   14. PROVAS ANTIGAS — a aba de provas reais da tela "Provas e Simulados"
   (organizadas por instituição e ano, com filtros)
   ========================================================================== */
function filtrosProvas(){
  if(!state.filtroRota.provas) state.filtroRota.provas = {banca:"", ano:"", areaId:"", ultimos5:false, tipo:""};
  return state.filtroRota.provas;
}
function mudarFiltroProvas(campo, valor){
  const f = filtrosProvas();
  if(campo==="ultimos5"){ f.ultimos5 = !!valor; if(f.ultimos5) f.ano = ""; }
  else f[campo] = valor;
  // a instituição escolhida pode não ter prova do tipo novo
  if(campo==="tipo") f.banca = "";
  render();
}
function limparFiltrosProvas(){ state.filtroRota.provas = {banca:"", ano:"", areaId:"", ultimos5:false, tipo:""}; render(); }
function renderProvasAntigas(){ return renderProvasESimulados(); }
function renderAbaProvasAntigas(u){
  const f = filtrosProvas();
  const grupoUsuario = (u.papel==="aluno"||state.modoAluno) ? getGrupoDoUsuario(u).id : true;
  /* Só questão REAL forma prova: a prova antiga é "a prova de verdade, do
     jeito que caiu". As questões autorais (banco didático, demonstração)
     continuam em Estudar > Monte sua própria lista. */
  const todasDosTipos = questoesAtivas(grupoUsuario).filter(q=>q.real);
  /* RESIDÊNCIA E GRADUAÇÃO SEPARADAS. A prova da faculdade (e o Teste de
     Progresso) e a de residência não se comparam: uma confere o que ficou
     do ano, a outra seleciona para o R1. Cada uma tem a sua seção, e no 3º
     e 4º ano, onde a consolidação é maioria (CONFIG.progressaoConsolidacao), a da graduação vem primeiro. */
  const tipoPref = tipoProvaPreferido(u);
  const ordemTipos = CONFIG.tiposProva.map(t=>t.id).sort((a,b)=>(b===tipoPref)-(a===tipoPref));
  const qtdPorTipo = {};
  todasDosTipos.forEach(q=>{ const t = tipoProvaDe(q); qtdPorTipo[t] = (qtdPorTipo[t]||0)+1; });
  const todas = f.tipo ? todasDosTipos.filter(q=>tipoProvaDe(q)===f.tipo) : todasDosTipos;
  const bancas = [...new Set(todas.map(q=>q.banca))].sort();
  const anosDisponiveis = [...new Set(todas.map(q=>q.ano))].sort((a,b)=>b-a);
  const anoMaisRecente = anosDisponiveis.length ? anosDisponiveis[0] : new Date().getFullYear();

  let pool = todas;
  if(f.banca) pool = pool.filter(q=>q.banca===f.banca);
  if(f.ano) pool = pool.filter(q=>q.ano===parseInt(f.ano));
  if(f.areaId) pool = pool.filter(q=>q.areaId===f.areaId);
  if(f.ultimos5) pool = pool.filter(q=>q.ano > anoMaisRecente-5);

  // agrupa por instituição + ano + tipo (uma "prova" é a combinação das três
  // coisas), na ordem da prova original quando a questão sabe o próprio número
  const mapa = {};
  const chaveDaProva = q => q.banca+" ||| "+q.ano+" ||| "+tipoProvaDe(q);
  pool.forEach(q=>{ const chave = chaveDaProva(q); (mapa[chave] = mapa[chave] || {banca:q.banca, ano:q.ano, tipo:tipoProvaDe(q), ids:[], anuladas:[], semImagem:0}).ids.push(q.id); });
  const ordemNaProva = id => { const q = getQuestao(id); return (q && q.numeroNaProva) || 9999; };
  Object.values(mapa).forEach(g => g.ids.sort((a,b)=> ordemNaProva(a)-ordemNaProva(b)));
  /* AS ANULADAS NÃO SOMEM EM SILÊNCIO. Questão anulada não tem gabarito, então
     não entra na prova feita aqui (não teria como ser corrigida) — mas uma
     prova de 100 questões aparecendo com 93, sem explicação, parece prova
     incompleta. O cartão diz quantas são, quais são, e deixa abrir cada uma. */
  db.questoes.forEach(q=>{
    if(q.status!=="anulada" || !q.real) return;
    const g = mapa[chaveDaProva(q)]; if(!g) return;
    if(f.areaId && q.areaId!==f.areaId) return;
    g.anuladas.push(q.id);
  });
  Object.values(mapa).forEach(g => g.anuladas.sort((a,b)=> ordemNaProva(a)-ordemNaProva(b)));
  // as que esperam a figura da prova também ficam de fora, e o cartão diz
  // quantas (ver aguardaImagem)
  db.questoes.forEach(q=>{
    if(!aguardaImagem(q) || !q.real || q.status!=="ativa") return;
    const g = mapa[chaveDaProva(q)]; if(!g) return;
    if(f.areaId && q.areaId!==f.areaId) return;
    g.semImagem++;
  });
  const grupos = Object.values(mapa).sort((a,b)=> ordemTipos.indexOf(a.tipo)-ordemTipos.indexOf(b.tipo) || b.ano-a.ano || a.banca.localeCompare(b.banca));
  state.filtroRota.provasGrupos = grupos;
  const cartaoDaProva = (g, i) => {
      const previo = desempenhoPrevioSimulado(null, "Prova "+g.banca+" "+g.ano+" (simulado)");
      const respondidas = g.ids.filter(id=>jaFoiRespondida(u.id, id)).length;
      return `<div class="card prova-card">
        <div class="prova-ano">${g.ano}</div>
        <div class="text-sm prova-banca">${escapeHtml(g.banca)}</div>
        <div class="qcard-meta mb-1"><span class="badge ${g.tipo==="graduacao"?"badge-amber":"badge-muted"}">${escapeHtml(infoTipoProva(g.tipo).nome)}</span></div>
        <div class="text-sm muted mb-1">${g.ids.length} questão(ões) · ${respondidas} já respondida(s) por você</div>
        ${g.anuladas.length ? `<div class="text-xs muted mb-1" title="Questões anuladas pela banca não têm gabarito e ficam fora da prova feita aqui">+ ${g.anuladas.length} anulada(s) pela banca, fora da nota: ${g.anuladas.map(id=>{ const q = getQuestao(id); return `<button class="link-btn text-xs" onclick="abrirQuestaoCompleta('${id}')">${q && q.numeroNaProva ? "nº "+q.numeroNaProva : "ver"}</button>`; }).join(", ")}</div>` : ""}
        ${g.semImagem ? `<div class="text-xs muted mb-1" title="Estas questões dependem de uma figura da prova que ainda não foi anexada">+ ${g.semImagem} à espera da figura da prova, fora por enquanto</div>` : ""}
        ${previo ? `<div class="qcard-meta mb-1"><span class="badge ${previo.ultima.nota>=70?"badge-accent":previo.ultima.nota>=50?"badge-amber":"badge-danger"}">já fez como simulado · ${previo.ultima.nota}%</span></div>` : ""}
        <div class="flex gap-1 prova-acoes" style="flex-wrap:wrap">
          <button class="btn btn-primary btn-sm" onclick="fazerProvaComoSimulado(${i})">Fazer como simulado</button>
          <button class="btn btn-secondary btn-sm" onclick="praticarProva(${i})">Praticar sem cronômetro</button>
        </div>
      </div>`;
  };
  // uma seção por tipo de prova, na ordem de prioridade de quem está vendo
  const secoes = (f.tipo ? [f.tipo] : ordemTipos).map(tipo=>{
    const info = infoTipoProva(tipo);
    const daSecao = grupos.map((g,i)=>({g,i})).filter(x=>x.g.tipo===tipo);
    const prioritaria = tipo===tipoPref;
    if(!daSecao.length){
      // seção vazia só aparece para quem ela é prioridade (ou quando filtrada)
      if(!prioritaria && !f.tipo) return "";
      return `<div class="card-title mt-2 mb-1">${escapeHtml(info.nomeLongo)}</div>
        <div class="empty-state mb-2">${qtdPorTipo[tipo]
          ? "Nenhuma prova deste tipo com os filtros atuais."
          : `Ainda não há ${escapeHtml(info.nomeLongo.toLowerCase())} no banco (${escapeHtml(info.descricao)}). Quem tiver uma pode <button class="link-btn" onclick="navigate('importar-questoes')">enviar pela plataforma</button>, escolhendo o tipo de prova ${escapeHtml(info.nome)}.`}</div>`;
    }
    return `<div class="card-title mt-2 mb-1">${escapeHtml(info.nomeLongo)} <span class="text-sm muted" style="font-weight:400">· ${escapeHtml(info.descricao)} · ${daSecao.length} prova(s)</span></div>
      ${prioritaria ? `<p class="text-xs muted mb-1">${iconeSvg("star")} No ${escapeHtml(u.anoFaculdade)}, estas vêm primeiro: são as que consolidam o conhecimento do ano. As de residência continuam logo abaixo.</p>` : ""}
      <div class="grid grid-3 mb-2">${daSecao.map(x=>cartaoDaProva(x.g, x.i)).join("")}</div>`;
  }).join("");

  return `
  <p class="text-sm muted mb-2">A prova de verdade de cada instituição, do jeito que caiu. Faça inteira no relógio, para medir onde você está contra a banca, ou sem cronômetro, para estudar com calma.</p>
  <div class="flex gap-1 mb-2" style="flex-wrap:wrap">
    <button class="pill ${!f.tipo?"active":""}" onclick="mudarFiltroProvas('tipo','')">Todas (${todasDosTipos.length})</button>
    ${ordemTipos.map(t=>`<button class="pill ${f.tipo===t?"active":""}" onclick="mudarFiltroProvas('tipo','${t}')">${escapeHtml(infoTipoProva(t).nomeLongo)} (${qtdPorTipo[t]||0})</button>`).join("")}
  </div>
  <div class="card mb-2">
    <div class="grid grid-4">
      <div class="field" style="margin-bottom:0">
        <label class="label">Instituição</label>
        <select class="select" onchange="mudarFiltroProvas('banca', this.value)">
          <option value="">Todas (${bancas.length})</option>
          ${bancas.map(b=>`<option value="${escapeHtml(b)}" ${f.banca===b?"selected":""}>${escapeHtml(b)}</option>`).join("")}
        </select>
      </div>
      <div class="field" style="margin-bottom:0">
        <label class="label">Ano</label>
        <select class="select" onchange="mudarFiltroProvas('ano', this.value)" ${f.ultimos5?"disabled":""}>
          <option value="">Todos os anos</option>
          ${anosDisponiveis.map(a=>`<option value="${a}" ${String(f.ano)===String(a)?"selected":""}>${a}</option>`).join("")}
        </select>
      </div>
      <div class="field" style="margin-bottom:0">
        <label class="label">Grande área</label>
        <select class="select" onchange="mudarFiltroProvas('areaId', this.value)">
          <option value="">Todas as áreas</option>
          ${db.taxonomia.areas.map(a=>`<option value="${a.id}" ${f.areaId===a.id?"selected":""}>${escapeHtml(a.nome)}</option>`).join("")}
        </select>
      </div>
      <div class="field" style="margin-bottom:0">
        <label class="label">Atalhos</label>
        <label class="checkbox-row mb-1"><input type="checkbox" ${f.ultimos5?"checked":""} onchange="mudarFiltroProvas('ultimos5', this.checked)"> Só os últimos 5 anos (${Math.max(anoMaisRecente-4,0)}–${anoMaisRecente})</label>
        <button class="link-btn text-xs" onclick="limparFiltrosProvas()">limpar filtros</button>
      </div>
    </div>
  </div>
  <p class="text-sm muted mb-2">${grupos.length} prova(s) encontrada(s) · ${pool.length} questão(ões) no total com os filtros atuais.</p>
  ${secoes || '<div class="empty-state">Nenhuma prova encontrada com esses filtros.</div>'}`;
}
function grupoDeProva(indice){
  const grupos = state.filtroRota.provasGrupos || [];
  return grupos[indice] || null;
}
function fazerProvaComoSimulado(indice){
  const g = grupoDeProva(indice); if(!g) return;
  const titulo = "Prova "+g.banca+" "+g.ano+" (simulado)";
  state.sessaoAtual = { id:uid("simsessao"), tipo:"simulado", simuladoId:null, titulo,
    itens: g.ids.map(id=>({questaoId:id, motivo:"Prova "+g.banca+" "+g.ano})), indiceAtual:0, respostasSimulado:{},
    duracaoMin: g.ids.length*2, finalizado:false, modoAprendizado:false,
    inicioMs:Date.now(), tsQuestao:Date.now(), tempos:{} };
  navigate("simulado-ativo");
}
function praticarProva(indice){
  const g = grupoDeProva(indice); if(!g) return;
  iniciarSessaoComLista(g.ids.map(id=>({questaoId:id, motivo:"Prática — prova "+g.banca+" "+g.ano})), "pratica");
}
