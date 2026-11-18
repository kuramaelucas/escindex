/* codigo/08d-revisao.js — a tela de Revisão (seção 12): visão por assunto e fila de erros e chutes.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   12. REVISÃO (visão por assunto + fila de erros/chutes)
   ========================================================================== */
function renderRevisao(){
  const u = usuarioAtual();
  const assuntos = assuntosParaRevisarHoje(u.id);
  const vencidos = limitarLista(assuntos, "revisao-vencidos", 5);
  const erros = questoesErroOrdenadasPorAntiguidade(u.id);
  const emEspera = fraseErrosEChutesEmEspera(u.id);
  const partesEspacada = partesDaRevisaoEspacada(u.id);
  const naoVistas = partesEspacada.novas.length;
  const porDecaimento = partesEspacada.decaimentos.length;
  const porErro = partesEspacada.erros.length;
  const totalEspacada = naoVistas + porErro + porDecaimento;
  const errosComCerteza = questoesErroComCerteza(u.id);
  const acertosNoChute = questoesAcertoNoChute(u.id);
  const errosNaDuvida = questoesErroNaDuvida(u.id);
  const falsaSeguranca = assuntosComFalsaSeguranca(u.id);
  /* quem ainda não respondeu nada via seis cartões zerados: um cartão só, com o
     caminho para a primeira sessão; as filas aparecem quando passam a ter o que mostrar */
  if(!db.respostas.some(r=>r.usuarioId===u.id)) return `
  <div class="page-header"><h2>Revisão</h2><p>Assuntos e questões que, pelo seu histórico, estão no momento certo de voltar.</p></div>
  <div class="empty-state">
    <h3>Sua revisão começa depois das primeiras questões</h3>
    <p class="mt-2">Cada questão que você responder ganha um prazo para voltar: erros e chutes em 1 semana, acertos seguros em 1 mês. Os flashcards já podem ser revisados.</p>
    <div class="flex gap-1 mt-3 quebra" style="justify-content:center">
      <button class="btn btn-primary" onclick="iniciarSessaoRecomendada()">Começar agora</button>
      <button class="btn btn-secondary" onclick="iniciarSessaoFlashcards({})">${iconeSvg("cards")} Flashcards</button>
    </div>
  </div>`;
  return `
  <div class="page-header"><h2>Revisão</h2><p>Assuntos e questões que, pelo seu histórico, estão no momento certo de voltar.</p></div>
  <div class="card">
    <div class="card-title">Revisão espaçada de questões (${totalEspacada})</div>
    <p class="text-sm muted">Vem nesta ordem: primeiro as questões dos assuntos que você já estudou e <strong>ainda não viu</strong> (${naoVistas}); depois as que você <strong>errou ou acertou no chute</strong> (${porErro}); por último as que você acertou e já passou o prazo (${porDecaimento}).</p>
    <p class="text-xs muted mt-1">Questão que você acertou com segurança só volta depois de <strong>1 mês</strong> — e de 2 meses no segundo acerto seguido; em assunto em que você vai bem, o prazo cresce ainda mais. Depois de <strong>3 acertos seguidos</strong> ela sai da revisão espaçada. Errar (ou acertar no chute) zera a conta e a questão volta em <strong>1 semana</strong> — nenhuma questão reaparece antes disso.</p>
    <button class="btn btn-primary mt-2" onclick="iniciarRevisaoEspacada()" ${!totalEspacada?"disabled":""}>Revisar agora</button>
  </div>
  <div class="card mt-2">
    <div class="card-title">Assuntos vencidos (${assuntos.length})</div>
    ${assuntos.length ? `<div class="mt-2">
      ${vencidos.itens.map(a=>`<div class="linha-fina"><span class="linha-fina-nome">${escapeHtml(nomeAssunto(a.assuntoId))}</span><span class="text-xs muted nowrap">${Math.round(a.taxa*100)}% · ${a.atrasoDias} ${plural(a.atrasoDias,"dia","dias")} de atraso</span><button class="btn btn-secondary btn-sm" onclick="praticarAssunto('${a.assuntoId}')">Praticar</button></div>`).join("")}
      ${botaoMostrarTudo(vencidos, "revisao-vencidos", "assuntos")}
    </div>` : '<p class="text-sm muted mt-1">Nenhum assunto vencido hoje — em dia com a revisão.</p>'}
  </div>
  <div class="card mt-2">
    <div class="card-title">Filas por tipo de erro</div>
    <p class="text-sm muted mb-2">Nem todo erro é igual. Errar achando que sabia é o mais caro, porque você não voltaria a esse assunto por conta própria. Acertar no chute é o oposto do que parece: conta como não sabido.</p>
    <div class="grid grid-3">
      <div class="card-flat fila-erro fila-certeza">
        <div class="peso-600">Errou com certeza <span class="badge badge-danger">${errosComCerteza.length}</span></div>
        <p class="text-xs muted mt-1">Conceito consolidado de forma errada. Prioridade máxima.</p>
        <button class="btn ${errosComCerteza.length ? "btn-primary" : "btn-secondary"} btn-sm mt-2" onclick="praticarFilaDeConfianca('certeza')" ${!errosComCerteza.length?"disabled":""}>Praticar</button>
      </div>
      <div class="card-flat fila-erro fila-chute">
        <div class="peso-600">Acertou no chute <span class="badge badge-amber">${acertosNoChute.length}</span></div>
        <p class="text-xs muted mt-1">A estatística diz acerto, mas você não sabia. Volta como se tivesse errado.</p>
        <button class="btn btn-secondary btn-sm mt-2" onclick="praticarFilaDeConfianca('chute')" ${!acertosNoChute.length?"disabled":""}>Praticar</button>
      </div>
      <div class="card-flat fila-erro fila-duvida">
        <div class="peso-600">Errou na dúvida <span class="badge badge-muted">${errosNaDuvida.length}</span></div>
        <p class="text-xs muted mt-1">Você já sabia que não sabia — aqui falta conteúdo, não calibração.</p>
        <button class="btn btn-secondary btn-sm mt-2" onclick="praticarFilaDeConfianca('duvida')" ${!errosNaDuvida.length?"disabled":""}>Praticar</button>
      </div>
    </div>
    ${falsaSeguranca.length ? `<div class="mt-2">
      <div class="text-sm peso-600">Assuntos em que sua confiança não bate com o acerto</div>
      ${falsaSeguranca.slice(0,5).map(f=>`<div class="flex justify-between items-center card-flat mb-1">
        <span class="text-sm">${escapeHtml(nomeAssunto(f.assuntoId))} <span class="text-xs muted">— ${f.n} ${flexionar(f.n, "resposta(s)")} marcadas como "certeza"</span></span>
        <span class="flex items-center gap-1"><span class="badge badge-danger">${f.taxa}% de acerto</span><button class="btn btn-secondary btn-sm" onclick="praticarAssuntoFalsaSeguranca('${f.assuntoId}')">Praticar</button></span>
      </div>`).join("")}
    </div>` : ""}
  </div>
  ${htmlCardTrilhaSugerida(u)}
  ${htmlCardRevisaoSugerida(u)}
  <div class="card mt-2">
    <div class="card-title">Flashcards (${resumoFlashcards(u.id).vencidos} ${flexionar(resumoFlashcards(u.id).vencidos, "vencido(s)")})</div>
    <p class="text-sm muted">Cartão de conceito em vez de questão: sem alternativa para eliminar, você tenta lembrar do zero e diz se sabia. Leva segundos por cartão e é o formato certo para os assuntos de falsa segurança — aqueles em que você marca "certeza" e erra.</p>
    <div class="flex gap-1 mt-2 quebra">
      <button class="btn btn-primary" onclick="iniciarSessaoFlashcards({})">${iconeSvg("cards")} Revisar cartões</button>
      ${falsaSeguranca.length ? `<button class="btn btn-secondary" onclick="iniciarSessaoFlashcards({somenteFalsaSeguranca:true})">Só onde minha confiança engana</button>` : ""}
      <button class="btn btn-ghost" onclick="navigate('flashcards')">Ver baralho e filtros</button>
    </div>
  </div>
  ${renderCartaoQuestoesErradas(u)}
  <div class="card mt-2">
    <div class="card-title">Só erros e chutes pendentes (${erros.length})</div>
    <p class="text-sm muted">Se quiser focar especificamente no que errou ou chutou, sem misturar com revisão por decaimento, use esta lista — ordenada da mais antiga para a mais recente.</p>
    ${emEspera ? `<p class="text-xs muted mt-1">${emEspera}</p>` : ""}
    <button class="btn btn-secondary mt-2" onclick="iniciarRevisaoErros()" ${!erros.length?"disabled":""}>Revisar só erros</button>
  </div>
  ${htmlCurvaDeRetencao(u)}
  <details class="card-flat mt-2 text-sm" ${secaoRecolhivelAberta("revisao-como-funciona", false) ? "open" : ""} ontoggle="lembrarSecaoRecolhivel('revisao-como-funciona', this.open)">
    <summary class="peso-600">Como funciona a revisão?</summary><p class="mt-1">Cada questão tem seu próprio intervalo de revisão, que cresce quando você acerta com confiança e encolhe quando você erra ou chuta (mesmo acertando no chute), mas nunca abaixo de 1 semana. A revisão espaçada geral, acima, respeita isso pra TODAS as questões já respondidas — não só as erradas — porque até quem acerta esquece com o tempo, mas sem repetir o que você já domina: acerto seguro espera um mês e, depois de três, a questão sai da fila. Errar com certeza antecipa também até ${CONFIG.irmasAntecipadas} questões do mesmo assunto que estavam de molho (prazo de 1 semana), porque o erro com certeza costuma ser lacuna do assunto, não da questão. Assuntos inteiros também têm um intervalo próprio, baseado na taxa de acerto das suas últimas respostas naquele assunto.</p>
  </details>`;
}
/* As questões que a pessoa já errou, com quantas vezes cada uma — a
   mais errada primeiro. É aqui que se esconde em lote ("já entendi essas,
   não quero mais"); o que foi escondido volta em Favoritos > Retiradas da
   revisão. */
function renderCartaoQuestoesErradas(u){
  const erradas = questoesErradasPeloUsuario(u.id);
  const escondidas = questoesRetiradasDaRevisao(u.id);
  const aberta = !!state.filtroRota.errosAbertos;
  const pag = aberta ? paginar(erradas, "revisao-erradas", {porPagina:10}) : null;
  const repetidas = erradas.filter(x=>x.erros>1).length;
  const linha = (x)=>`<div class="card-flat mb-1">
      <div class="qcard-meta mb-1">
        <span class="badge badge-danger">errada ${rotuloVezes(x.erros)}</span>
        <span class="badge badge-muted">${x.tentativas} ${x.tentativas===1?"tentativa":"tentativas"}</span>
        <span class="badge ${x.ultima.correta?"badge-accent":"badge-muted"}">última: ${x.ultima.correta?"acertou":"errou"} em ${formatDataBR(x.ultima.data)}</span>
        <span class="badge badge-muted">${escapeHtml(nomeAssunto(x.questao.assuntoId))}</span>
      </div>
      <div class="text-sm"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${x.questao.id}')">${escapeHtml(x.questao.enunciado.slice(0,160))}${x.questao.enunciado.length>160?"…":""}</span></div>
      <div class="flex gap-1 mt-1 quebra">
        <button class="btn btn-secondary btn-sm" onclick="praticarSoEstaQuestao('${x.questao.id}')">${iconeSvg("book")} Refazer</button>
        ${podeEsconderQuestao(u.id, x.questao.id) ? `<button class="btn btn-ghost btn-sm" onclick="alternarQuestaoOcultaUI('${x.questao.id}')">${iconeSvg("eye-off")} Não mostrar mais</button>` : ""}
      </div>
    </div>`;
  return `
  <div class="card mt-2">
    <div class="card-title">Questões que você errou (${erradas.length})</div>
    <p class="text-sm muted">Cada uma com quantas vezes você já errou${repetidas ? ` — ${repetidas} você errou mais de uma vez` : ""}. A mais errada vem primeiro. Se já entendeu uma e não quer mais vê-la, "Não mostrar mais" a tira das suas sessões, revisões e listas (só das suas).</p>
    ${erradas.length ? `<div class="flex gap-1 mt-2 mb-2 quebra">
      <button class="btn btn-primary btn-sm" onclick="praticarQuestoesMaisErradas()">${iconeSvg("book")} Refazer as mais erradas</button>
      <button class="btn btn-secondary btn-sm" onclick="alternarListaDeErradas()" aria-expanded="${aberta}">${aberta ? "Esconder a lista" : "Ver todas as questões erradas ("+erradas.length+")"}</button>
    </div>
    ${aberta ? pag.itens.map(linha).join("")+controlesPaginacao(pag, "questão(ões) errada(s)") : ""}` : '<p class="text-sm muted mt-1">Nenhuma questão errada fora das escondidas.</p>'}
  </div>
  <div class="card-flat mt-2 text-sm">${iconeSvg("eye-off")} As questões que você pediu para não ver mais (${escondidas.length}) ficam em <button class="link-btn" onclick="state.filtroRota.abaFavoritos='retiradas';navigate('favoritos')">Favoritos &gt; Retiradas da revisão</button>, junto do que você salvou para rever.</div>`;
}
/* A lista fica fechada até a pessoa pedir: dezenas de enunciados empurravam
   para baixo o resto da Revisão, que é o que ela veio ver. */
function alternarListaDeErradas(){
  state.filtroRota.errosAbertos = !state.filtroRota.errosAbertos;
  render();
}
function praticarQuestoesMaisErradas(){
  const u = usuarioAtual();
  const itens = questoesErradasPeloUsuario(u.id).slice(0,20)
    .map(x=>({questaoId:x.questao.id, motivo:"Você já errou esta questão "+rotuloVezes(x.erros)}));
  if(!itens.length){ toast("Nenhuma questão errada para refazer."); return; }
  iniciarSessaoComLista(itens, "pratica");
}
function mostrarTodasAsEscondidas(){
  const n = (db.questoesOcultas||[]).filter(o=>o.usuarioId===usuarioAtual().id).length;
  if(!n) return;
  abrirModalTitulado("Voltar a mostrar todas", `<p class="text-sm">As ${n} questões escondidas voltam a entrar nas suas sessões, revisões e listas.</p>
    <div class="flex gap-1 mt-3">
      <button class="btn btn-primary" onclick="fecharModal();mostrarTodasAsEscondidasConfirmado()">Voltar a mostrar</button>
      <button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button>
    </div>`);
}
function mostrarTodasAsEscondidasConfirmado(){
  const u = usuarioAtual();
  const minhas = (db.questoesOcultas||[]).filter(o=>o.usuarioId===u.id);
  if(!minhas.length) return;
  db.questoesOcultas = db.questoesOcultas.filter(o=>o.usuarioId!==u.id);
  minhas.forEach(o=>nuvemRegistrar({questaoOculta:{usuarioId:u.id, questaoId:o.questaoId, data:hojeISO(), removido:true}}));
  saveState();
  toast(minhas.length+" questões voltaram para o seu estudo.");
  render();
}
/* "Praticar" vem de telas de revisão (assunto vencido, pior desempenho): aqui
   o que está para revisar vem antes das inéditas. */
function praticarAssunto(assuntoId){
  const itens = montarConjuntoEmCamadas(usuarioAtual().id, questoesDoConjuntoRapido(assuntoId, [], []), CONJUNTO_RAPIDO_SUGESTAO, "Revisão do assunto", true);
  iniciarSessaoComLista(itens, "pratica");
}

/* CONJUNTO RÁPIDO DE UM ASSUNTO (aberto pela busca global). A pessoa acha o
   assunto, escolhe quantas questões, de quais instituições e de quais anos, e
   começa. Sem nada marcado em instituição ou ano vale "todas" — a sugestão de
   15 não olha a origem. As questões vêm de questoesParaEstudo, então o que
   está escondido, em simulado reservado ou restrito a outra faculdade não
   aparece nem é contado. */
const CONJUNTO_RAPIDO_SUGESTAO = 15;
function questoesDoConjuntoRapido(assuntoId, bancas, anos){
  return questoesParaEstudo(usuarioAtual().id).filter(q => q.assuntoId === assuntoId
    && (!bancas.length || bancas.includes(q.banca)) && (!anos.length || anos.includes(String(q.ano))));
}
/* Montagem do conjunto de um assunto, em camadas, e não por sorteio puro: um
   sorteio pode entregar 15 questões já dominadas e nunca mostrar as erradas.
   Ordem: inéditas → para revisar (revisão vencida; erro e chute antes) → respondidas
   com revisão ainda no prazo (só para completar; erros antes). Dentro
   de cada camada, rodízio por instituição/ano, para não concentrar numa prova.
   O motivo de cada item diz a camada — a plataforma explica o que fez. */
function camadaNoConjunto(usuarioId, q){
  const ult = ultimaResposta(usuarioId, q.id);
  if(!ult) return 0;
  return repeticaoPrematura(usuarioId, q.id) ? 2 : 1;
}
function _rodizioPorOrigem(lista){
  const grupos = new Map();
  embaralhar(lista).forEach(q => { const k = q.banca + "|" + q.ano; if(!grupos.has(k)) grupos.set(k, []); grupos.get(k).push(q); });
  const filas = embaralhar([...grupos.values()]), saida = [];
  while(filas.some(f => f.length)) filas.forEach(f => { if(f.length) saida.push(f.shift()); });
  return saida;
}
function montarConjuntoEmCamadas(usuarioId, pool, qtd, rotulo, revisarPrimeiro){
  const camadas = [[], [], []];
  pool.forEach(q => camadas[camadaNoConjunto(usuarioId, q)].push(q));
  const pesoRevisao = q => { const u = ultimaResposta(usuarioId, q.id); return !u.correta ? 0 : u.confianca === "chute" ? 1 : 2; };
  const revisar = _rodizioPorOrigem(camadas[1]).sort((a, b) => pesoRevisao(a) - pesoRevisao(b));
  const motivo = (q, c) => {
    if(c === 0) return rotulo + " · inédita para você";
    const u = ultimaResposta(usuarioId, q.id), quando = formatDataBR(String(u.data).slice(0, 10));
    if(c === 1) return rotulo + " · para revisar: " + (!u.correta ? "você errou em " : u.confianca === "chute" ? "acertou no chute em " : "revisão vencida desde ") + quando;
    return rotulo + " · já respondida em " + quando + " (revisão ainda no prazo), para completar";
  };
  const ineditas = [0, _rodizioPorOrigem(camadas[0])], paraRevisar = [1, revisar];
  return [...(revisarPrimeiro ? [paraRevisar, ineditas] : [ineditas, paraRevisar]), [2, _rodizioPorOrigem(camadas[2]).sort((a, b) => pesoRevisao(a) - pesoRevisao(b))]]
    .flatMap(([c, l]) => l.map(q => ({ questaoId:q.id, motivo:motivo(q, c) }))).slice(0, qtd);
}
function resumoDasCamadas(usuarioId, pool){
  const n = [0, 0, 0]; pool.forEach(q => n[camadaNoConjunto(usuarioId, q)]++);
  return n[0] + " " + plural(n[0], "inédita", "inéditas") + " · " + n[1] + " para revisar · " + n[2] + " com revisão no prazo";
}
let _poolConjuntoRapido = null; // o assunto filtrado uma vez ao abrir; filtros só reduzem esta lista
function abrirConjuntoRapido(assuntoId){
  const todas = questoesDoConjuntoRapido(assuntoId, [], []);
  _poolConjuntoRapido = { assuntoId, todas };
  if(!todas.length){ toast("Não há questões ativas deste assunto.", "err"); return; }
  const contar = chave => { const m = new Map(); todas.forEach(q => m.set(String(q[chave]), (m.get(String(q[chave])) || 0) + 1)); return m; };
  const bancas = [...contar("banca")].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const anos = [...contar("ano")].sort((a, b) => b[0] - a[0]);
  const caixa = (classe, [valor, n]) => `<label class="checkbox-row"><input type="checkbox" class="${classe}" value="${escapeHtml(valor)}" onchange="atualizarConjuntoRapido('${assuntoId}')"> ${escapeHtml(valor)} <span class="muted">(${n})</span></label>`;
  abrirModalTitulado("Conjunto rápido: " + escapeHtml(nomeAssunto(assuntoId)), `
    <div class="field"><label class="label" for="crQtd">Quantas questões</label>
      <input class="input" type="number" id="crQtd" min="1" max="100" value="${Math.min(CONJUNTO_RAPIDO_SUGESTAO, todas.length)}" style="max-width:6rem" oninput="atualizarConjuntoRapido('${assuntoId}')">
      <div class="hint mt-1">Sugestão: ${CONJUNTO_RAPIDO_SUGESTAO}. Vêm primeiro as inéditas, depois as que estão para revisar (erros e chutes antes) e, só para completar, as que você respondeu e ainda estão no prazo — alternando instituição e ano.</div></div>
    <div class="field"><label class="label">Instituições <span class="muted text-xs">(nenhuma marcada = todas)</span></label>
      <div style="max-height:150px;overflow-y:auto">${bancas.map(b => caixa("crBanca", b)).join("")}</div></div>
    <div class="field"><label class="label">Anos <span class="muted text-xs">(nenhum marcado = todos)</span></label>
      <div style="max-height:110px;overflow-y:auto">${anos.map(a => caixa("crAno", a)).join("")}</div></div>
    <div class="text-sm mb-2" id="crResumo"></div>
    <button class="btn btn-primary" onclick="iniciarConjuntoRapido('${assuntoId}')">Começar</button>`);
  atualizarConjuntoRapido(assuntoId);
}
function lerConjuntoRapido(){
  const marcados = classe => [...document.querySelectorAll("." + classe + ":checked")].map(e => e.value);
  return { bancas: marcados("crBanca"), anos: marcados("crAno"), qtd: Math.max(1, Math.min(100, parseInt((document.getElementById("crQtd") || {}).value, 10) || CONJUNTO_RAPIDO_SUGESTAO)) };
}
function _filtrarConjuntoRapido(assuntoId, r){
  const todas = _poolConjuntoRapido && _poolConjuntoRapido.assuntoId === assuntoId ? _poolConjuntoRapido.todas : questoesDoConjuntoRapido(assuntoId, [], []);
  return todas.filter(q => (!r.bancas.length || r.bancas.includes(q.banca)) && (!r.anos.length || r.anos.includes(String(q.ano))));
}
function atualizarConjuntoRapido(assuntoId){
  const r = lerConjuntoRapido(), pool = _filtrarConjuntoRapido(assuntoId, r), disponiveis = pool.length;
  const el = document.getElementById("crResumo"); if(!el) return;
  el.textContent = disponiveis ? (disponiveis + " " + plural(disponiveis, "questão disponível", "questões disponíveis") + " com estes filtros (" + resumoDasCamadas(usuarioAtual().id, pool) + ")" + (r.qtd > disponiveis ? "; o conjunto terá " + disponiveis + "." : ".")) : "Nenhuma questão com estes filtros.";
}
function iniciarConjuntoRapido(assuntoId){
  const r = lerConjuntoRapido();
  const pool = _filtrarConjuntoRapido(assuntoId, r);
  if(!pool.length){ toast("Nenhuma questão com estes filtros.", "err"); return; }
  const itens = montarConjuntoEmCamadas(usuarioAtual().id, pool, r.qtd, "Conjunto rápido: " + nomeAssunto(assuntoId));
  _poolConjuntoRapido = null;
  fecharModal();
  iniciarSessaoComLista(itens, "pratica");
}

/* Curva de retenção: o que acontece quando uma questão que você acertou com segurança volta. */
function htmlCurvaDeRetencao(u){
  const faixas = curvaDeRetencao(u.id);
  const veredito = {
    alargar: "Você ainda acerta quase tudo: os intervalos podem crescer.",
    encurtar: "Já esquece nessa distância: a revisão está chegando tarde.",
    adequada: "Na medida: o intervalo mantém o que você sabe.",
    poucos: "Ainda poucos casos para opinar.",
  };
  const total = faixas.reduce((s,f)=>s+f.n, 0);
  return htmlSecaoRecolhivel("revisao-retencao", "Quanto você retém entre uma revisão e outra", total ? total+" revisões medidas" : "sem dados ainda", `
    <p class="text-sm muted">Quando uma questão que você acertou com segurança volta depois de N dias, quanto você acerta? A plataforma busca manter perto de ${CONFIG.retencaoAlvo}%. Só opina com ${CONFIG.minParesParaRetencao} casos ou mais por faixa, e a faixa provável mostra o quanto o número ainda pode variar. Isto só mede: os intervalos não mudam sozinhos.</p>
    <div class="table-wrap"><table>
      <thead><tr><th>Voltou depois de</th><th>Casos</th><th>Acerto</th><th>Faixa provável</th><th></th></tr></thead>
      <tbody>${faixas.map(f=>`<tr><td class="text-sm">${f.rotulo}</td><td class="text-sm">${f.n}</td><td class="text-sm">${f.taxa!==null?f.taxa+"%":"—"}</td><td class="text-sm">${f.n?f.minimo+"–"+f.maximo+"%":"—"}</td><td class="text-sm muted">${veredito[f.veredito]}</td></tr>`).join("")}</tbody>
    </table></div>`);
}
