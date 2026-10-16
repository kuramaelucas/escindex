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
/* ---------- busca da tela (vale para as duas abas) ----------
   Um campo só, acima das abas: "unifesp" ou "epm" acha a prova da UNIFESP-EPM
   e também os simulados dela, esteja a pessoa na aba que estiver. As palavras
   se combinam (todas precisam aparecer), sem diferenciar maiúscula nem acento. */
function buscaProvas(){ return state.filtroRota.buscaProvas || ""; }
function normalizarBusca(t){ return String(t||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function textoBuscavelProva(partes){
  let t = normalizarBusca(partes.filter(Boolean).join(" "));
  // UNIFESP e EPM são a mesma instituição (UNIFESP-EPM): quem digita um acha o outro
  if(/unifesp|\bepm\b/.test(t)) t += " unifesp epm unifesp-epm";
  return t;
}
function combinaComBusca(partes){
  const termos = normalizarBusca(buscaProvas()).split(/\s+/).filter(Boolean);
  if(!termos.length) return true;
  const texto = textoBuscavelProva(partes);
  return termos.every(t=>texto.includes(t));
}
// um simulado é achado pelo título e pela instituição e ano das questões dele
function simuladoCombinaComBusca(s){
  if(!buscaProvas().trim()) return true;
  const qs = (s.questoes||[]).map(getQuestao).filter(Boolean);
  return combinaComBusca([s.titulo, ...new Set(qs.map(q=>q.banca)), ...new Set(qs.map(q=>q.ano))]);
}
function digitarBuscaProvas(valor){
  state.filtroRota.buscaProvas = valor;
  // só o resultado é redesenhado: redesenhar a tela inteira tiraria o foco do campo
  const alvo = document.getElementById("provasConteudo");
  if(alvo) alvo.innerHTML = conteudoProvasESimulados(usuarioAtual());
}
function limparBuscaProvas(){ state.filtroRota.buscaProvas = ""; render(); }
function renderProvasESimulados(){
  const u = usuarioAtual();
  return `
  <div class="page-header"><h2>Provas e Simulados</h2><p>Prova inteira, no relógio. Na primeira aba, as provas antigas como caíram; na segunda, os simulados (os da equipe e os que foram enviados para a plataforma).</p></div>
  <div class="card mb-2">
    <label class="label" for="buscaProvasCampo">Buscar</label>
    <div class="flex gap-1 quebra">
      <input class="input" id="buscaProvasCampo" type="search" autocomplete="off" value="${escapeHtml(buscaProvas())}" placeholder="Ex.: Unifesp, EPM, USP 2024, Santa Casa…" aria-label="Buscar em provas e simulados" oninput="digitarBuscaProvas(this.value)" style="flex:1;min-width:220px">
      ${buscaProvas() ? `<button class="btn btn-secondary btn-sm" onclick="limparBuscaProvas()">Limpar</button>` : ""}
    </div>
    <div class="text-xs muted mt-1">Procura por instituição, ano e título do simulado, nas provas antigas e nos simulados ao mesmo tempo. "Unifesp" e "EPM" acham as mesmas coisas.</div>
  </div>
  <div id="provasConteudo">${conteudoProvasESimulados(u)}</div>`;
}
function conteudoProvasESimulados(u){
  const aba = abaProvas();
  const busca = buscaProvas().trim();
  const bloco = getBlocoAtual();
  const simuladosVisiveis = db.simulados.filter(simuladoCombinaComBusca);
  const recomendados = bloco ? simuladosVisiveis.filter(s=>s.recomendadoParaBlocos && s.recomendadoParaBlocos.includes(bloco.id)) : [];
  const outros = simuladosVisiveis.filter(s=>!recomendados.includes(s));
  const meusResultados = db.resultadosSimulados.filter(r=>r.usuarioId===u.id).sort((a,b)=>b.data.localeCompare(a.data));
  const pagResultados = paginar(meusResultados, "provas-resultados", {porPagina:10});
  return `
  <div class="flex gap-1 mb-2 quebra">
    <button class="pill ${aba==="antigas"?"active":""}" onclick="mudarAbaProvas('antigas')">${iconeSvg("archive")} Provas antigas</button>
    <button class="pill ${aba==="simulados"?"active":""}" onclick="mudarAbaProvas('simulados')">${iconeSvg("clipboard")} Simulados (${busca ? simuladosVisiveis.length+" de "+db.simulados.length : db.simulados.length})</button>
  </div>
  ${aba==="antigas" ? renderAbaProvasAntigas(u, simuladosVisiveis) : `
    <p class="text-sm muted mb-2">Os da equipe e os enviados para a plataforma, com tempo e tamanho já definidos. ${bloco ? `Os recomendados são os do seu bloco atual (${escapeHtml(bloco.nome)}).` : "Sem calendário de blocos, não há simulado recomendado para o seu bloco: todos aparecem juntos."}</p>
    ${recomendados.length ? `<div class="card-title mb-1">Recomendados para o seu bloco atual</div>${recomendados.map(renderSimuladoCard).join("")}` : ""}
    ${outros.length ? `<div class="card-title mt-3 mb-1">${recomendados.length ? "Outros simulados disponíveis" : "Simulados disponíveis"}</div>${outros.map(renderSimuladoCard).join("")}` : ""}
    ${!db.simulados.length ? '<div class="empty-state">Nenhum simulado disponível ainda. Peça a um professor para criar e recomendar um simulado para o seu bloco — ou faça uma prova antiga inteira, na aba ao lado.</div>'
      : !simuladosVisiveis.length ? `<div class="empty-state">Nenhum simulado combina com "${escapeHtml(busca)}". <button class="link-btn" onclick="limparBuscaProvas()">limpar a busca</button> ou veja as provas antigas na aba ao lado.</div>` : ""}
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
    <div class="flex justify-between items-center gap-2 quebra">
      <div>
        <div class="peso-700">${escapeHtml(s.titulo)}</div>
        <div class="text-sm muted">${s.questoes.length} questões · ${s.duracaoMin} min${s.tipo==="simulado_professor" && !simuladoLiberadoParaEstudo(usuarioAtual().id, s.id) ? " · questões fora das suas trilhas de estudo" : ""}</div>
        ${previo ? `<div class="qcard-meta mt-1">
            <span class="badge ${previo.ultima.nota>=70?"badge-accent":previo.ultima.nota>=50?"badge-amber":"badge-danger"}">já feito · última nota ${previo.ultima.nota}%</span>
            <span class="badge badge-muted">melhor: ${previo.melhor}%</span>
            <span class="badge badge-muted">${previo.n} tentativa(s) · ${formatDataBR(previo.ultima.data)}</span>
            ${previo.variacao!==null ? `<span class="badge ${previo.variacao>=0?"badge-accent":"badge-danger"}">${previo.variacao>=0?"+":""}${previo.variacao} pts vs. anterior</span>` : ""}
          </div>` : '<div class="qcard-meta mt-1"><span class="badge badge-muted">ainda não realizado</span></div>'}
      </div>
      <div class="flex gap-1 quebra">
        ${s.tipo==="simulado_professor" ? (simuladoLiberadoParaEstudo(usuarioAtual().id, s.id)
          ? `<button class="btn btn-ghost btn-sm" onclick="alternarSimuladoNoEstudo('${s.id}')" title="As questões deste simulado estão no seu estudo geral">${iconeSvg("check")} No meu estudo · retirar</button>`
          : `<button class="btn btn-ghost btn-sm" onclick="alternarSimuladoNoEstudo('${s.id}')" title="Hoje estas questões ficam fora das suas trilhas, da revisão e dos filtros do Estudar">Trazer para o estudo geral</button>`) : ""}
        ${podeGerirConteudo() ? `<button class="btn btn-ghost btn-sm" onclick="abrirRenomearSimulado('${s.id}')" title="Mudar o nome deste simulado">${iconeSvg("edit")} Renomear</button>` : ""}
        ${ehEquipeVendoSimulado() ? `<button class="btn btn-ghost btn-sm" onclick="abrirDesempenhoDosAlunos('${s.id}', '${escapeHtml(s.titulo).replace(/'/g,"&#39;")}')" title="Notas dos alunos, somadas e anônimas">${iconeSvg("chart")} Desempenho dos alunos</button>` : ""}
        ${previo && previo.ultima.itens ? `<button class="btn btn-secondary btn-sm" onclick="verDetalheResultadoSimulado('${previo.ultima.id}')">Ver resultado anterior</button>` : ""}
        <button class="btn btn-primary btn-sm" onclick="iniciarSimulado('${s.id}')">${previo?"Refazer":"Começar"}</button>
      </div>
    </div>
  </div>`;
}
/* Renomear um simulado (equipe). O que liga as notas ao simulado é o id, não
   o título: mudar o nome não apaga histórico nem comparação com a turma. */
function abrirRenomearSimulado(simuladoId){
  const s = db.simulados.find(x=>x.id===simuladoId);
  if(!s || !podeGerirConteudo()) return;
  abrirModal(`${cabecalhoJanela("Mudar o nome do simulado")}
    <div class="field"><label class="label" for="renomearSimuladoNome">Nome do simulado</label><input class="input" id="renomearSimuladoNome" value="${escapeHtml(s.titulo)}" maxlength="100" onkeydown="if(event.key==='Enter')salvarNomeDoSimulado('${s.id}')">
      <div class="hint mt-1">As notas e o histórico dos alunos continuam ligados a este simulado.</div></div>
    <div class="flex gap-1 mt-2"><button class="btn btn-primary" onclick="salvarNomeDoSimulado('${s.id}')">Salvar</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
  setTimeout(()=>{ const c = document.getElementById("renomearSimuladoNome"); if(c){ c.focus(); c.select(); } }, 50);
}
function salvarNomeDoSimulado(simuladoId){
  const s = db.simulados.find(x=>x.id===simuladoId);
  if(!s || !podeGerirConteudo()) return;
  const nome = document.getElementById("renomearSimuladoNome").value.trim();
  if(!nome){ toast("Dê um nome para o simulado.", "err"); return; }
  s.titulo = nome;
  saveState();
  fecharModal();
  toast('O simulado agora se chama "'+nome+'".');
  render();
}
/* A tabela "simulado × estudo" (ver comparativoSimuladoEstudo, 05b), usada no
   resultado do simulado e em Meu Desempenho. Diz o que cada linha significa:
   a plataforma explica o que mostra. */
function htmlComparativoSimuladoEstudo(linhas, titulo, intro, opcoes){
  if(!linhas.length) return "";
  const rotulo = l => l.queda===null ? '<span class="badge badge-muted">poucas respostas fora</span>'
    : l.queda>=15 ? '<span class="badge badge-amber">rende menos no simulado</span>'
    : l.queda<=-15 ? '<span class="badge badge-accent">rende mais no simulado</span>'
    : l.simTaxa<60 ? '<span class="badge badge-danger">fraco nos dois</span>' : '<span class="badge badge-accent">parecido</span>';
  const tabela = lista => `<div class="table-wrap mt-1"><table class="tabela-compacta"><thead><tr><th>Assunto</th><th>Simulado</th><th>Fora</th><th></th></tr></thead><tbody>
      ${lista.map(l=>`<tr>
        <td>${escapeHtml(nomeAssunto(l.assuntoId))}</td>
        <td><strong>${l.simTaxa}%</strong> <span class="muted">(${l.simAcertos}/${l.simTotal})</span></td>
        <td>${l.estTotal ? `<strong>${l.estTaxa}%</strong> <span class="muted">(${l.estAcertos}/${l.estTotal})</span>` : '<span class="muted">—</span>'}</td>
        <td>${rotulo(l)}</td></tr>`).join("")}
    </tbody></table></div>`;
  // `maximo`: a página de resultado mostra de início só os assuntos que mais
  // pedem atenção (a lista já vem ordenada); o resto abre sob demanda
  const maximo = opcoes && opcoes.maximo;
  const visiveis = maximo ? linhas.slice(0, maximo) : linhas;
  const resto = maximo ? linhas.slice(maximo) : [];
  return `<div class="card mt-2">
    <div class="card-title">${escapeHtml(titulo)}</div>
    <p class="text-xs muted">${intro}</p>
    ${tabela(visiveis)}
    ${resto.length ? `<details class="mt-1"><summary class="text-xs link-btn">Ver os outros ${resto.length} assuntos</summary>${tabela(resto)}</details>` : ""}
    <p class="text-xs muted mt-1">"Fora" soma as questões feitas nas trilhas, na revisão e nas listas. Só há comparação com ${MINIMO_RESPOSTAS_PARA_COMPARAR} respostas ou mais no assunto.</p>
  </div>`;
}
function iniciarSimulado(simuladoId){
  if(contaTesteAtiva()){ toast("Simulados ficam fechados na conta de teste.", "err"); return; }
  const s = db.simulados.find(x=>x.id===simuladoId); if(!s) return;
  // simulado montado antes de a questão ficar à espera da figura (ou
  // questão que saiu do banco) não entra — ver aguardaImagem()
  const qids = s.questoes.filter(qid=>{ const q = getQuestao(qid); return q && !aguardaImagem(q); });
  if(!qids.length){ toast("Este simulado não tem questões disponíveis no momento.", "err"); return; }
  state.sessaoAtual = { id:uid("simsessao"), tipo:"simulado", simuladoId, titulo:s.titulo, itens:qids.map(qid=>({questaoId:qid, motivo:"Simulado: "+s.titulo})), indiceAtual:0, respostasSimulado:{}, duracaoMin:s.duracaoMin, finalizado:false, modoAprendizado:false, escolhaPendente:{}, ocultarTimer:false, pausadoDesde:null, inicioMs:Date.now(), tsQuestao:Date.now(), tempos:{} };
  navigate("simulado-ativo");
}

/* ---------- cronômetro do simulado e tempo por questão ----------
   O relógio corre num intervalo próprio e só escreve no elemento da tela,
   sem redesenhar a página inteira a cada segundo. O tempo gasto em cada
   questão é acumulado toda vez que o aluno troca de questão ou finaliza —
   é esse número que depois mostra onde ele trava.

   O relógio PARA quando a pessoa sai da página (troca de aba, minimiza,
   bloqueia o celular): tempo longe da tela não é tempo de prova. Em vez de
   guardar pausas à parte, ao voltar empurramos `inicioMs` e `tsQuestao` para
   frente pelo tempo que ficou fora — todas as contas (restante, tempo por
   questão, tempo total) continuam certas sem saber que houve pausa. */
let intervaloCronometro = null;
function momentoDeReferenciaSimulado(s){ return s.pausadoDesde || s.fimMs || Date.now(); }
function pausarCronometroSimulado(){
  const s = state.sessaoAtual;
  if(!s || s.tipo!=="simulado" || s.finalizado || !s.inicioMs || s.pausadoDesde) return;
  s.pausadoDesde = Date.now();
}
function retomarCronometroSimulado(){
  const s = state.sessaoAtual;
  if(!s || s.tipo!=="simulado" || !s.pausadoDesde) return;
  const fora = Date.now() - s.pausadoDesde;
  s.inicioMs += fora;
  if(s.tsQuestao) s.tsQuestao += fora;
  s.pausadoDesde = null;
  atualizarCronometro();
}
if(typeof document!=="undefined"){
  document.addEventListener("visibilitychange", () => { if(document.hidden) pausarCronometroSimulado(); else retomarCronometroSimulado(); });
}
function acumularTempoQuestaoSimulado(){
  const s = state.sessaoAtual;
  if(!s || s.tipo!=="simulado" || !s.tsQuestao) return;
  const item = s.itens[s.indiceAtual]; if(!item) return;
  const agora = s.pausadoDesde || Date.now();
  const delta = (agora - s.tsQuestao)/1000;
  if(delta>0 && delta<7200) s.tempos[item.questaoId] = (s.tempos[item.questaoId]||0) + delta;
  s.tsQuestao = agora;
}
function tempoDecorridoSimulado(){
  const s = state.sessaoAtual;
  if(!s || !s.inicioMs) return 0;
  return Math.floor((momentoDeReferenciaSimulado(s) - s.inicioMs)/1000);
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
  const pausa = s.pausadoDesde ? " (pausado)" : "";
  if(!limite){ el.textContent = formatarDuracao(decorrido)+" decorridos"+pausa; return; }
  const restante = limite - decorrido;
  if(restante<=0){
    el.textContent = "tempo esgotado";
    toast("Tempo esgotado. O simulado foi finalizado automaticamente — suas respostas estão salvas.", "err");
    finalizarSimulado();
    return;
  }
  el.textContent = formatarDuracao(restante)+" restantes"+pausa;
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
  const qid = sessao.itens[sessao.indiceAtual].questaoId;
  if(sessao.modoAprendizado){
    // no modo aprendizado a resposta só vale ao confirmar (e, confirmada, trava):
    // o clique sozinho não revela a explicação por engano
    if(sessao.respostasSimulado[qid] !== undefined) return;
    (sessao.escolhaPendente = sessao.escolhaPendente || {})[qid] = altId;
    render(); return;
  }
  sessao.respostasSimulado[qid] = altId;
  render();
}
function confirmarRespostaSimulado(){
  const sessao = state.sessaoAtual; if(!sessao) return;
  const qid = sessao.itens[sessao.indiceAtual].questaoId;
  const escolha = (sessao.escolhaPendente||{})[qid];
  if(!escolha){ toast("Escolha uma alternativa antes de confirmar.", "err"); return; }
  sessao.respostasSimulado[qid] = escolha;
  delete sessao.escolhaPendente[qid];
  render();
}
function alternarOcultarTimerSimulado(){
  const sessao = state.sessaoAtual; if(!sessao) return;
  sessao.ocultarTimer = !sessao.ocultarTimer;
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
  retomarCronometroSimulado();   // fechar a prova com o relógio parado contaria o tempo fora
  acumularTempoQuestaoSimulado();
  sessao.fimMs = Date.now();
  const tempoTotalSeg = sessao.inicioMs ? tempoDecorridoSimulado() : null;
  let acertos = 0;
  sessao.itens.forEach(it=>{
    const q = getQuestao(it.questaoId);
    const resp = sessao.respostasSimulado[it.questaoId];
    if(resp===q.gabarito) acertos++;
    if(resp) registrarResposta(u.id, it.questaoId, resp, "duvida", sessao.tempos ? sessao.tempos[it.questaoId] : null, "simulado");
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
  const escolhaPendente = (sessao.escolhaPendente||{})[q.id];
  garantirCronometro();
  return `<div class="coluna-questao">
  <div class="flex justify-between items-center mb-2 quebra-gap">
    <div class="text-sm muted flex items-center gap-1 quebra">
      <span>Questão ${sessao.indiceAtual+1} de ${sessao.itens.length} · ${respondidasCount} respondida(s) · ${emBranco} em branco</span>
      ${sessao.ocultarTimer ? "" : iconeSvg("clock")}<span class="badge badge-muted" id="cronometroSimulado"${sessao.ocultarTimer ? ' style="display:none"' : ""}>${sessao.duracaoMin?formatarDuracao(Math.max(0,sessao.duracaoMin*60 - tempoDecorridoSimulado()))+" restantes":formatarDuracao(tempoDecorridoSimulado())+" decorridos"}</span>
    </div>
    <div class="flex gap-1 quebra">
      <button class="btn btn-ghost btn-sm" onclick="alternarOcultarTimerSimulado()" title="O tempo continua correndo e o simulado ainda termina no limite; só some da tela">${iconeSvg(sessao.ocultarTimer?"eye":"eye-off")} ${sessao.ocultarTimer?"Mostrar cronômetro":"Esconder cronômetro"}</button>
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
      // no modo aprendizado a pessoa já vê a correção de cada questão, então a
      // barra também mostra acerto e erro (✓/✕); fora dele, só "respondida"
      if(emModoAprendizado && respondida){
        const qp = getQuestao(it.questaoId);
        const certa = !!qp && sessao.respostasSimulado[it.questaoId] === qp.gabarito;
        const desc = "Questão "+(i+1)+(certa?" — você acertou":" — você errou")+(atual?" (você está nesta)":"");
        return `<button class="mapa-pill ${certa?"acertou":"errou"}${atual?" atual":""}" onclick="irQuestaoSimuladoIndice(${i})" title="${desc}" aria-label="${desc}"${atual?' aria-current="true"':""}>${i+1}<span class="selo-resp ${certa?"v":"x"}" aria-hidden="true">${certa?"✓":"✕"}</span></button>`;
      }
      return `<button class="pill pill-mapa ${respondida?"respondida":"em-branco"}${atual?" atual":""}" onclick="irQuestaoSimuladoIndice(${i})" title="Questão ${i+1} — ${respondida?"respondida":"em branco"}${atual?" (você está nesta)":""}" aria-label="Questão ${i+1}, ${respondida?"respondida":"em branco"}"${atual?' aria-current="true"':""}>${respondida?'<span class="ponto-resp"></span>':""}${i+1}</button>`;
    }).join(""),
    detalhe: `<div class="mapa-legenda text-xs muted">
      <span class="amostra"><span class="quadro"></span>respondida (${respondidasCount})</span>
      <span class="amostra"><span class="quadro vazio"></span>em branco (${emBranco})</span>
    </div>
    <div class="text-xs muted mt-1">Clique num número para ir direto, ou use as teclas A (anterior) / D (próxima). ${emModoAprendizado
      ? "No modo aprendizado a barra mostra ✓ nas que você acertou e ✕ nas que errou."
      : "A barra mostra só o que já foi respondido; se a resposta está certa ou errada você fica sabendo no resultado, quando o simulado acabar (ou ativando o modo aprendizado)."}</div>` })}
  <div class="area-gesto" id="areaGestoQuestao">
    ${renderQuestionCard(q, emModoAprendizado ? {selecionada:jaRespondeuEssa ? respostaAtual : escolhaPendente, modoSimulado:true, respondida:jaRespondeuEssa} : {selecionada:respostaAtual, modoSimulado:true, respondida:false})}
  </div>
  ${emModoAprendizado && !jaRespondeuEssa ? `<div class="flex items-center gap-1 mt-2 quebra">
    <button class="btn btn-primary" onclick="confirmarRespostaSimulado()" ${escolhaPendente?"":"disabled"}>${iconeSvg("check")} Confirmar resposta <span class="text-xs">(espaço)</span></button>
    <span class="text-xs muted">${escolhaPendente?"Depois de confirmar não dá para trocar: a explicação aparece e a resposta fica registrada.":"Escolha uma alternativa e confirme para ver a explicação."}</span>
  </div>` : ""}
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
/* A revisão deixou de ser uma lista de todas as questões: a página de
   resultado é um resumo, e o que o aluno quer reler é o que errou. */
function alternarVerSoErrosSimulado(){
  const sessao = state.sessaoAtual; if(!sessao) return;
  sessao.verSoErros = !sessao.verSoErros;
  render();
  if(sessao.verSoErros){ const alvo = document.getElementById("res-erros"); if(alvo) alvo.scrollIntoView({behavior:"smooth", block:"start"}); }
}
function revisarErrosDoSimulado(){
  const sessao = state.sessaoAtual; if(!sessao) return;
  const errados = sessao.itens.filter(it=>{
    const q = getQuestao(it.questaoId);
    return q && sessao.respostasSimulado[it.questaoId] !== q.gabarito && !questaoOculta(usuarioAtual().id, it.questaoId);
  }).map(it=>({questaoId:it.questaoId, origem:"erros", motivo:"Erro no simulado: "+(sessao.titulo||"")}));
  if(!errados.length){ toast("Você não errou nenhuma questão deste simulado."); return; }
  state.sessaoAtual = null;
  iniciarSessaoComLista(errados, "pratica");
}
function alternarModoAprendizadoSimulado(){
  const sessao = state.sessaoAtual; if(!sessao) return;
  sessao.modoAprendizado = !sessao.modoAprendizado;
  toast(sessao.modoAprendizado ? "Modo aprendizado ativado: escolha a alternativa e confirme para ver a explicação; a barra passa a mostrar acertos e erros." : "Modo aprendizado desativado — voltando ao formato de prova.");
  render();
}
/* O painel anônimo da turma, para quem não é aluno (administrador, professor,
   residente): nota média, distribuição e as questões em que mais se erra. Só
   números somados — nunca nome nem nota de uma pessoa. */
function htmlDesempenhoDosAlunos(chave){
  const t = estatisticasTurmaSimulado(chave);
  if(!t) return `<div class="card-flat text-sm muted"><strong>${frasePoucosAlunosNoSimulado(chave)}</strong> O desempenho dos alunos aparece quando pelo menos ${MINIMO_ALUNOS_NA_COMPARACAO} tiverem feito; com menos, os números identificariam as pessoas.</div>`;
  const piores = t.questoes.slice(0,5);
  return `<div class="card-title">Desempenho dos alunos <span class="text-sm muted peso-400">· anônimo, ${t.n} alunos ${t.origem==="turma" ? "da turma" : "deste navegador"}, uma nota por aluno</span></div>
    <div class="grid grid-4 mt-1">
      <div class="stat-tile"><div class="stat-value">${t.n}</div><div class="stat-label">alunos</div></div>
      <div class="stat-tile"><div class="stat-value">${Math.round(t.media)}%</div><div class="stat-label">média</div></div>
      <div class="stat-tile"><div class="stat-value">${Math.round(t.mediana)}%</div><div class="stat-label">mediana</div></div>
      <div class="stat-tile"><div class="stat-value">${Math.round(t.p90)}%</div><div class="stat-label">percentil 90</div></div>
    </div>
    <div class="mt-2">${graficoHistogramaSvg(t.buckets, -1, ["0-20","21-40","41-60","61-80","81-100"])}</div>
    ${piores.length ? `<div class="text-sm peso-600 mt-2">Questões com menor taxa de acerto</div>
      <div class="table-wrap mt-1"><table><thead><tr><th>Questão</th><th>Assunto</th><th>Acerto</th></tr></thead><tbody>
      ${piores.map(c=>{ const q = getQuestao(c.questaoId); return `<tr><td class="text-sm"><button class="link-btn" onclick="abrirQuestaoCompleta('${c.questaoId}')">${q.numeroNaProva ? "nº "+q.numeroNaProva : "ver"}</button></td><td class="text-sm">${escapeHtml(nomeAssunto(q.assuntoId))}</td><td class="text-sm"><strong>${c.taxa}%</strong> <span class="muted">(${c.acertos}/${c.total})</span></td></tr>`; }).join("")}
      </tbody></table></div>
      <p class="text-xs muted mt-1">Taxa de acerto por questão, contando só as respostas deste navegador${t.origem==="turma" ? " (a nuvem devolve só as notas)" : ""}.</p>` : ""}`;
}
function ehEquipeVendoSimulado(){ const u = usuarioAtual(); return !!u && u.papel !== "aluno" && !state.modoAluno; }
function abrirDesempenhoDosAlunos(chave, titulo){
  abrirModalTitulado("Desempenho dos alunos · "+titulo, htmlDesempenhoDosAlunos(chave), "lg");
}
/* Acerto por grande área (as 5 especialidades da taxonomia) neste simulado:
   mostra de relance onde a nota foi puxada para baixo. */
function htmlAcertoPorEspecialidade(linhas){
  const por = {};
  linhas.forEach(l=>{
    if(!l.q.areaId) return;
    const c = por[l.q.areaId] = por[l.q.areaId] || {total:0, acertos:0};
    c.total++; if(l.correta) c.acertos++;
  });
  const areas = db.taxonomia.areas.filter(a=>por[a.id]);
  if(!areas.length) return "";
  return `<div class="card mt-2">
    <div class="card-title">Acerto por especialidade</div>
    ${areas.map(a=>{ const c = por[a.id], t = pct(c.acertos, c.total); return `<div class="linha-barra"><span class="linha-barra-nome">${escapeHtml(a.nome)}</span><span class="linha-barra-trilho"><span style="width:${t}%;background:${t>=70?"var(--accent)":t>=50?"var(--amber, #d99a1e)":"var(--danger)"}"></span></span><span class="linha-barra-valor"><strong>${t}%</strong> <span class="muted">(${c.acertos}/${c.total})</span></span></div>`; }).join("")}
  </div>`;
}
/* Gabarito corrigido depois da prova (arquivo de atualizações ou correção na
   plataforma) muda a nota de quem já fez: refaz acertos e nota de todo
   resultado guardado, com o gabarito de hoje. Os da própria pessoa sobem de
   novo para a nuvem; os dos outros alunos sobem quando cada um abre o site
   (a linha é dele e só ele pode alterá-la). */
function recalcularResultadosSimulados(){
  let mudou = 0;
  db.resultadosSimulados.forEach(r=>{
    if(!r.itens || !r.itens.length) return;
    const qs = r.itens.map(it=>getQuestao(it.questaoId));
    if(qs.some(q=>!q)) return;   // questão saiu do banco: mantém a nota que valia
    const acertos = r.itens.reduce((t,it,i)=> t + ((r.respostas||{})[it.questaoId]===qs[i].gabarito ? 1 : 0), 0);
    const nota = pct(acertos, r.itens.length);
    if(acertos===r.acertos && nota===r.nota) return;
    r.acertos = acertos; r.nota = nota; mudou++;
    if(typeof nuvemRegistrar === "function") nuvemRegistrar({resultadoSimulado:r});
  });
  if(mudou) saveState();
  return mudou;
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
  const equipe = ehEquipeVendoSimulado();
  const ranking = equipe ? null : estatisticasRankingSimulado(chaveRanking, nota);
  const erradas = linhas.filter(l=>!l.correta);
  const pillMapa = l => `<button class="pill" style="min-width:38px;justify-content:center;${l.resp===undefined?"":l.correta?"background:var(--accent);border-color:var(--accent);color:#fff":"background:var(--danger);border-color:var(--danger);color:#fff"}" onclick="abrirQuestaoCompleta('${l.q.id}')" title="${l.resp===undefined?"em branco":(l.correta?"acertou":"errou")} · abrir a questão">${l.i+1}</button>`;
  return `<div class="coluna-resultado">
  <div class="card">
    <h2>Resultado do simulado</h2>
    <div class="flex items-center gap-2 quebra mt-1">
      <div class="stat-tile"><div class="stat-value">${nota}%</div><div class="stat-label">${acertos} de ${total} corretas</div></div>
      <div class="text-sm muted">${erradas.length ? `${erradas.length} errada(s) ou em branco` : "Você acertou tudo."}</div>
    </div>
    <div class="flex gap-1 mt-2 quebra">
      <button class="btn btn-primary btn-sm" onclick="state.sessaoAtual=null;navigate('simulados')">Voltar aos simulados</button>
      ${erradas.length ? `<button class="btn btn-secondary btn-sm" onclick="revisarErrosDoSimulado()">${iconeSvg("refresh")} Praticar as que errei</button>
      <button class="btn btn-secondary btn-sm" onclick="alternarVerSoErrosSimulado()">${sessao.verSoErros ? "Esconder as que errei" : "Ver só as que errei"}</button>` : ""}
      <button class="btn btn-ghost btn-sm" onclick="state.sessaoAtual=null;navigate('historico')">Histórico</button>
    </div>
    <div class="text-sm peso-600 mt-2">Mapa de acertos <span class="muted peso-400">· verde acertou, vermelho errou, cinza em branco; clique para abrir a questão</span></div>
    <div class="flex gap-1 quebra mt-1">${linhas.map(pillMapa).join("")}</div>
  </div>
  ${equipe ? `<div class="card mt-2">${htmlDesempenhoDosAlunos(chaveRanking)}</div>` : ranking ? `
  <div class="card mt-2">
    <div class="card-title">Como você se saiu, de forma anônima</div>
    <p class="text-sm muted">${ranking.origem==="turma"
      ? `Comparado a ${ranking.n} alunos que fizeram este simulado, em qualquer aparelho (uma nota por aluno, sem identificar ninguém).`
      : `Comparado a ${ranking.n} alunos que fizeram este simulado neste navegador (uma nota por aluno, sem identificar ninguém).${nuvemLigada() && !nuvemConectado() ? " Entrando com a sua conta da nuvem, a comparação passa a ser com a turma inteira." : ""}`}</p>
    <div class="grid grid-3 mt-1">
      <div class="stat-tile"><div class="stat-value">Percentil ${ranking.percentil}</div><div class="stat-label">você superou ${ranking.percentil}% dos alunos</div></div>
      <div class="stat-tile"><div class="stat-value">${Math.round(ranking.mediana)}%</div><div class="stat-label">percentil 50 (nota mediana)</div></div>
      <div class="stat-tile"><div class="stat-value">${Math.round(ranking.p90)}%</div><div class="stat-label">percentil 90 (os 10% melhores)</div></div>
    </div>
    <div class="mt-2">${graficoCurvaGaussSvg(ranking, nota)}</div>
    <p class="text-xs muted mt-1">Curva de Gauss desenhada com a média (${Math.round(ranking.media)}%) e o desvio padrão (${Math.round(ranking.desvio)} pontos) das notas dos alunos: é um ajuste, não a contagem exata.</p>
    <div class="mt-2">${graficoHistogramaSvg(ranking.buckets, ranking.bucketAtual, ["0-20","21-40","41-60","61-80","81-100"])}</div>
  </div>` : `<div class="card-flat mt-2 text-sm muted">A comparação com os outros alunos (percentil, curva de Gauss, P50 e P90) aparece quando pelo menos ${MINIMO_ALUNOS_NA_COMPARACAO} alunos tiverem feito este simulado. <strong>${frasePoucosAlunosNoSimulado(chaveRanking)}</strong></div>`}
  ${htmlAcertoPorEspecialidade(linhas)}
  ${htmlComparativoSimuladoEstudo(comparativoSimuladoEstudo(usuarioAtual().id, {sessaoId:sessao.id}), "Seus assuntos neste simulado × o seu estudo", "O acerto de cada assunto no simulado ao lado do acerto fora dele. Bom no estudo e mal aqui: tempo ou formato da prova. Mal nos dois: falta conteúdo.", {maximo:5})}
  ${analiseTempo ? `<div class="card mt-2">
    <div class="card-title">Tempo</div>
    <div class="grid grid-3 mt-1">
      <div class="stat-tile"><div class="stat-value">${formatarDuracao(analiseTempo.total)}</div><div class="stat-label">tempo total${sessao.duracaoMin?" (limite de "+sessao.duracaoMin+" min)":""}</div></div>
      <div class="stat-tile"><div class="stat-value">${formatarDuracao(analiseTempo.media)}</div><div class="stat-label">média por questão</div></div>
      <div class="stat-tile"><div class="stat-value">${formatarDuracao(analiseTempo.mediana)}</div><div class="stat-label">tempo mediano</div></div>
    </div>
    ${analiseTempo.lentas.length ? `<div class="mt-2">
      <div class="text-sm peso-600">Onde você travou</div>
      <p class="text-xs muted mb-1">Questões que consumiram bem mais tempo que a sua mediana; numa prova cronometrada, esse tempo sai de outra questão.</p>
      ${analiseTempo.lentas.map(l=>`<div class="flex justify-between items-center card-flat mb-1">
        <span class="text-sm">Questão ${l.i+1} · ${escapeHtml(nomeAssunto(getQuestao(l.qid).assuntoId))} <span class="badge ${l.correta?"badge-accent":"badge-danger"}">${l.correta?"acertou":"errou"}</span></span>
        <span class="flex items-center gap-1"><span class="badge badge-muted">${formatarDuracao(l.seg)}</span><button class="link-btn" onclick="abrirQuestaoCompleta('${l.qid}')">ver</button></span>
      </div>`).join("")}
    </div>` : '<p class="text-xs muted mt-2">Seu ritmo foi parelho: nenhuma questão destoou muito da mediana.</p>'}
  </div>` : ""}
  ${sessao.verSoErros && erradas.length ? `<div class="mt-2" id="res-erros"><div class="card-title mb-1">Questões que você errou ou deixou em branco <span class="text-sm muted peso-400">· ${erradas.length}</span></div>
  ${erradas.map(l=>`<div class="mb-2"><span class="badge ${l.resp===undefined?"badge-muted":"badge-danger"}">Questão ${l.i+1}: ${l.resp===undefined?"em branco":"incorreta"}</span>${renderQuestionCard(l.q,{selecionada:l.resp, respondida:true})}</div>`).join("")}
  </div>` : ""}
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
function renderAbaProvasAntigas(u, simuladosDaBusca){
  const f = filtrosProvas();
  const grupoUsuario = (u.papel==="aluno"||state.modoAluno) ? idsDosGruposDoUsuario(u) : true;
  /* Só questão REAL forma prova: a prova antiga é "a prova de verdade, do
     jeito que caiu". As questões autorais (banco didático, demonstração)
     continuam em Estudar > Monte sua própria lista. */
  // a prova dissertativa também é prova de verdade: aparece aqui, mas só para
  // praticar (não há como corrigi-la sozinha nem cronometrá-la como simulado)
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
  if(buscaProvas().trim()) pool = pool.filter(q=>combinaComBusca([q.banca, q.ano, q.semestre ? q.semestre+"º semestre" : "", q.faseProva, infoTipoProva(tipoProvaDe(q)).nomeLongo]));
  if(f.areaId) pool = pool.filter(q=>q.areaId===f.areaId);
  if(f.ultimos5) pool = pool.filter(q=>q.ano > anoMaisRecente-5);

  // agrupa por instituição + ano + tipo (uma "prova" é a combinação das três
  // coisas), na ordem da prova original quando a questão sabe o próprio número
  const mapa = {};
  const chaveDaProva = q => q.banca+" ||| "+q.ano+" ||| "+(q.semestre||"")+" ||| "+tipoProvaDe(q);
  pool.forEach(q=>{ const chave = chaveDaProva(q); (mapa[chave] = mapa[chave] || {banca:q.banca, ano:q.ano, semestre:q.semestre||0, tipo:tipoProvaDe(q), ids:[], anuladas:[], semImagem:0}).ids.push(q.id); });
  Object.values(mapa).forEach(g => { g.dissertativa = g.ids.every(id=>ehDissertativa(getQuestao(id))); });
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
  const grupos = Object.values(mapa).sort((a,b)=> ordemTipos.indexOf(a.tipo)-ordemTipos.indexOf(b.tipo) || b.ano-a.ano || b.semestre-a.semestre || a.banca.localeCompare(b.banca));
  state.filtroRota.provasGrupos = grupos;
  const cartaoDaProva = (g, i) => {
      const previo = g.dissertativa ? null : desempenhoPrevioSimulado(null, "Prova "+g.banca+" "+anoDaProva(g)+" (simulado)");
      const respondidas = g.ids.filter(id=>jaFoiRespondida(u.id, id)).length;
      return `<div class="card prova-card">
        <div class="prova-ano">${anoDaProva(g)}</div>
        <div class="text-sm prova-banca">${escapeHtml(g.banca)}</div>
        <div class="qcard-meta mb-1"><span class="badge ${g.tipo==="graduacao"?"badge-accent":"badge-muted"}">${escapeHtml(infoTipoProva(g.tipo).nome)}</span>${g.dissertativa ? ` <span class="badge badge-accent">Dissertativa</span>` : ""}</div>
        ${g.dissertativa ? `<div class="text-xs muted mb-1">Você escreve a resposta, diz a confiança e se avalia pela resposta esperada da banca. Não há simulado com relógio nem nota automática.</div>` : ""}
        <div class="text-sm muted mb-1">${g.ids.length} questão(ões) · ${respondidas} já respondida(s) por você</div>
        ${g.anuladas.length ? `<div class="text-xs muted mb-1" title="Questões anuladas pela banca não têm gabarito e ficam fora da prova feita aqui">+ ${g.anuladas.length} anulada(s) pela banca, fora da nota: ${g.anuladas.map(id=>{ const q = getQuestao(id); return `<button class="link-btn text-xs" onclick="abrirQuestaoCompleta('${id}')">${q && q.numeroNaProva ? "nº "+q.numeroNaProva : "ver"}</button>`; }).join(", ")}</div>` : ""}
        ${g.semImagem ? `<div class="text-xs muted mb-1" title="Estas questões dependem de uma figura da prova que ainda não foi anexada">+ ${g.semImagem} à espera da figura da prova, fora por enquanto</div>` : ""}
        ${previo ? `<div class="qcard-meta mb-1"><span class="badge ${previo.ultima.nota>=70?"badge-accent":previo.ultima.nota>=50?"badge-amber":"badge-danger"}">já fez como simulado · ${previo.ultima.nota}%</span></div>` : ""}
        <div class="flex gap-1 prova-acoes quebra">
          ${g.dissertativa ? "" : `<button class="btn btn-primary btn-sm" onclick="fazerProvaComoSimulado(${i})">Fazer como simulado</button>`}
          ${g.dissertativa || !ehEquipeVendoSimulado() ? "" : `<button class="btn btn-ghost btn-sm" onclick="abrirDesempenhoDosAlunos(${JSON.stringify("Prova "+g.banca+" "+anoDaProva(g)+" (simulado)").replace(/"/g,"&quot;")}, '${escapeHtml(g.banca).replace(/'/g,"&#39;")} ${anoDaProva(g)}')" title="Notas dos alunos, somadas e anônimas">${iconeSvg("chart")} Desempenho dos alunos</button>`}
          <button class="btn ${g.dissertativa ? "btn-primary" : "btn-secondary"} btn-sm" onclick="praticarProva(${i})">${g.dissertativa ? "Fazer a prova (sem cronômetro)" : "Praticar sem cronômetro"}</button>
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
    return `<div class="card-title mt-2 mb-1">${escapeHtml(info.nomeLongo)} <span class="text-sm muted peso-400">· ${escapeHtml(info.descricao)} · ${daSecao.length} prova(s)</span></div>
      ${prioritaria ? `<p class="text-xs muted mb-1">${iconeSvg("star")} No ${escapeHtml(u.anoFaculdade)}, estas vêm primeiro: são as que consolidam o conhecimento do ano. As de residência continuam logo abaixo.</p>` : ""}
      <div class="grid grid-3 mb-2">${daSecao.map(x=>cartaoDaProva(x.g, x.i)).join("")}</div>`;
  }).join("");

  return `
  <p class="text-sm muted mb-2">A prova de verdade de cada instituição, do jeito que caiu. Faça inteira no relógio, para medir onde você está contra a banca, ou sem cronômetro, para estudar com calma.</p>
  <div class="flex gap-1 mb-2 quebra">
    <button class="pill ${!f.tipo?"active":""}" onclick="mudarFiltroProvas('tipo','')">Todas (${todasDosTipos.length})</button>
    ${ordemTipos.map(t=>`<button class="pill ${f.tipo===t?"active":""}" onclick="mudarFiltroProvas('tipo','${t}')">${escapeHtml(infoTipoProva(t).nomeLongo)} (${qtdPorTipo[t]||0})</button>`).join("")}
  </div>
  <div class="card mb-2">
    <div class="grid grid-4">
      <div class="field sem-mb">
        <label class="label">Instituição</label>
        <select class="select" onchange="mudarFiltroProvas('banca', this.value)">
          <option value="">Todas (${bancas.length})</option>
          ${bancas.map(b=>`<option value="${escapeHtml(b)}" ${f.banca===b?"selected":""}>${escapeHtml(b)}</option>`).join("")}
        </select>
      </div>
      <div class="field sem-mb">
        <label class="label">Ano</label>
        <select class="select" onchange="mudarFiltroProvas('ano', this.value)" ${f.ultimos5?"disabled":""}>
          <option value="">Todos os anos</option>
          ${anosDisponiveis.map(a=>`<option value="${a}" ${String(f.ano)===String(a)?"selected":""}>${a}</option>`).join("")}
        </select>
      </div>
      <div class="field sem-mb">
        <label class="label">Grande área</label>
        <select class="select" onchange="mudarFiltroProvas('areaId', this.value)">
          <option value="">Todas as áreas</option>
          ${db.taxonomia.areas.map(a=>`<option value="${a.id}" ${f.areaId===a.id?"selected":""}>${escapeHtml(a.nome)}</option>`).join("")}
        </select>
      </div>
      <div class="field sem-mb">
        <label class="label">Atalhos</label>
        <label class="checkbox-row mb-1"><input type="checkbox" ${f.ultimos5?"checked":""} onchange="mudarFiltroProvas('ultimos5', this.checked)"> Só os últimos 5 anos (${Math.max(anoMaisRecente-4,0)}–${anoMaisRecente})</label>
        <button class="link-btn text-xs" onclick="limparFiltrosProvas()">limpar filtros</button>
      </div>
    </div>
  </div>
  <p class="text-sm muted mb-2">${grupos.length} prova(s) encontrada(s) · ${pool.length} questão(ões) no total com os filtros atuais.</p>
  ${secoes || '<div class="empty-state">Nenhuma prova encontrada com esses filtros.</div>'}
  ${buscaProvas().trim() && simuladosDaBusca.length ? `<div class="card-title mt-3 mb-1">Simulados que combinam com a busca <span class="text-sm muted peso-400">· ${simuladosDaBusca.length}</span></div>${simuladosDaBusca.map(renderSimuladoCard).join("")}` : ""}`;
}
function grupoDeProva(indice){
  const grupos = state.filtroRota.provasGrupos || [];
  return grupos[indice] || null;
}
function fazerProvaComoSimulado(indice){
  const g = grupoDeProva(indice); if(!g) return;
  if(g.dissertativa){ praticarProva(indice); return; }
  const titulo = "Prova "+g.banca+" "+anoDaProva(g)+" (simulado)";
  state.sessaoAtual = { id:uid("simsessao"), tipo:"simulado", simuladoId:null, titulo,
    itens: g.ids.map(id=>({questaoId:id, motivo:"Prova "+g.banca+" "+anoDaProva(g)})), indiceAtual:0, respostasSimulado:{},
    duracaoMin: g.ids.length*2, finalizado:false, modoAprendizado:false,
    inicioMs:Date.now(), tsQuestao:Date.now(), tempos:{} };
  navigate("simulado-ativo");
}
function praticarProva(indice){
  const g = grupoDeProva(indice); if(!g) return;
  iniciarSessaoComLista(g.ids.map(id=>({questaoId:id, motivo:"Prática — prova "+g.banca+" "+anoDaProva(g)})), "pratica");
}
