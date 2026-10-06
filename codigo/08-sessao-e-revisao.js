/* codigo/08-sessao-e-revisao.js — motor de sessão (seção 11: sessão do dia, barra de questões, cartão da questão, comentários, IA) e a tela de Revisão (seção 12).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   11. MOTOR DE SESSÃO — responder questões (prática e revisão)
   ========================================================================== */
/* ---------- a sessão do dia ----------------------------------------------
   "Começar a sessão recomendada" não sorteia um conjunto novo a cada clique:
   o conjunto é DO DIA. Quem entra, responde cinco questões, sai para ver o
   desempenho e volta encontra as mesmas questões, na mesma ordem, com as
   cinco já respondidas — e não um conjunto novo em folha que joga fora o que
   já tinha feito e re-sorteia tudo.

   O conjunto só se renova quando o dia vira (ou quando o anterior termina).
   Um conjunto inacabado de OUTRO dia não é descartado em silêncio: aí a
   plataforma pergunta, porque a fila de ontem foi montada com a matéria e os
   vencimentos de ontem, e pode não ser o que a pessoa quer hoje. */
function iniciarSessaoRecomendada(){
  const u = usuarioAtual();
  const guardada = sessaoEmAndamentoDe(u);
  if(guardada){
    if((guardada.salvaEm || hojeISO()) === hojeISO()){ retomarSessaoEmAndamento(); return; }
    const feitas = respostasFeitas(guardada).length;
    abrirModalTitulado("Você tem um conjunto de outro dia", `
      <p class="text-sm">Começado em <strong>${formatDataBR(guardada.salvaEm)}</strong>, com <strong>${feitas}</strong> de ${guardada.itens.length} respondida(s). Continuar mantém aquela fila; começar de hoje monta um conjunto novo com a matéria e as revisões vencidas de agora — e a fila de ${formatDataBR(guardada.salvaEm)} se perde.</p>
      <div class="flex gap-1 mt-3 quebra">
        <button class="btn btn-primary" onclick="fecharModal(); retomarSessaoEmAndamento()">Continuar aquele conjunto</button>
        <button class="btn btn-secondary" onclick="fecharModal(); montarSessaoRecomendadaDeHoje()">Começar um conjunto de hoje</button>
      </div>`);
    return;
  }
  montarSessaoRecomendadaDeHoje();
}
function montarSessaoRecomendadaDeHoje(){
  const u = usuarioAtual();
  const feitas = questoesRespondidasHoje(u.id);
  const crono = cronogramaDoUsuario(u);
  // meta batida e cronograma do 6º ano passado da cota: a sessão extra não
  // pode ser de 5 questões, que não dá para treinar prova
  const piso = crono && feitas >= crono.questoesNoSistema ? crono.sessaoMinimaDeProva : 5;
  const restante = Math.max(piso, metaDoUsuario(u) - feitas);
  const tamanho = Math.min(restante, 20);
  iniciarSessaoComLista(montarSessaoDoDia(u.id, tamanho, feitas), "pratica");
}
/* A sessão guardada é de hoje? É o que decide se o botão de Estudar diz
   "continuar" ou "começar". */
function sessaoDeHoje(usuario){
  const guardada = sessaoEmAndamentoDe(usuario || usuarioAtual());
  if(!guardada) return null;
  return (guardada.salvaEm || hojeISO()) === hojeISO() ? guardada : null;
}
function iniciarRevisaoErros(){
  const pares = questoesErroOrdenadasPorAntiguidade(usuarioAtual().id);
  if(!pares.length){ toast("Você não tem erros ou chutes pendentes registrados — ótimo sinal!"); return; }
  const itens = pares.slice(0,20).map(p=>({questaoId:p.questao.id, origem:"erros", motivo:"Erro/chute anterior — respondido em "+formatDataBR(p.ultima.data)}));
  iniciarSessaoComLista(itens, "pratica");
}
/* A fila da revisão espaçada, na ordem de prioridade: o que a pessoa ainda não
   viu nos assuntos já estudados, depois o que errou (ou acertou no chute) e,
   por último, o que acertou e já passou o prazo. Cada item diz por que veio. */
function itensDaRevisaoEspacada(usuarioId, limite){
  const partes = partesDaRevisaoEspacada(usuarioId);
  const novas = selecionarComInterleaving(partes.novas, limite, pesosDeIncidencia(usuarioId))
    .map(q=>({questaoId:q.id, origem:"revisao_nova", motivo:"Revisão espaçada — você ainda não viu esta questão"}));
  const erros = partes.erros.map(v=>({questaoId:v.questao.id, origem:"revisao_erro", motivo:"Revisão espaçada — erro/chute anterior"}));
  const decaimentos = partes.decaimentos.map(v=>({questaoId:v.questao.id, origem:"revisao_decaimento", motivo:"Revisão espaçada — já faz tempo desde o último acerto"}));
  return [...novas, ...erros, ...decaimentos].slice(0, limite);
}
function iniciarRevisaoEspacada(){
  const itens = itensDaRevisaoEspacada(usuarioAtual().id, 20);
  if(!itens.length){ toast("Nada para a revisão espaçada no momento: nenhuma questão nova nos assuntos já estudados e nenhuma vencida."); return; }
  iniciarSessaoComLista(itens, "pratica");
}
function iniciarSessaoComLista(itens, tipo){
  // listas montadas à mão (favoritas, uma prova antiga) também não levam
  // questão à espera da figura — ver aguardaImagem()
  itens = itens.filter(it => !aguardaImagem(getQuestao(it.questaoId)));
  if(!itens.length){ toast("Não há questões disponíveis para esta sessão.", "err"); return; }
  state.sessaoAtual = { id: uid("sessao"), tipo, itens, indiceAtual:0, respostasSessao:[], eliminadas:{}, marcadas:{}, finalizada:false, tsQuestao: Date.now() };
  salvarSessaoEmAndamento();
  navigate("sessao");
}

/* ---------- as respostas andam POR POSIÇÃO na fila, e a fila tem buracos ---
   respostasSessao[i] é a resposta de itens[i]. Desde que se pode pular uma
   questão e voltar a ela depois, uma posição pode estar vazia — e por isso
   contar `respostasSessao.length` mentiria: diria "5 feitas" numa fila com 2
   respondidas e 3 puladas. Quem precisa saber quantas foram feitas usa
   respostasFeitas(); quem precisa da resposta de uma posição usa
   respostaDoIndice(), que devolve null quando aquela ficou em branco. */
function respostaDoIndice(s, i){ return (s && s.respostasSessao && s.respostasSessao[i]) || null; }
function respostasFeitas(s){ return ((s && s.respostasSessao) || []).filter(Boolean); }
function indicesEmBranco(s){
  const fora = [];
  if(!s || !s.itens) return fora;
  s.itens.forEach((it, i) => { if(!respostaDoIndice(s, i)) fora.push(i); });
  return fora;
}
/* Modo foco: esconde menu e topo enquanto a pessoa resolve questões (ver
   desenharTela). É escolha dela e vale só para a sessão em andamento. */
function alternarModoFoco(){
  state.modoFoco = !state.modoFoco;
  render();
}
function sairDaSessao(){
  const eraHistorico = state.sessaoAtual && state.sessaoAtual.somenteLeitura;
  // sair NÃO joga a fila fora: ela fica guardada e a pessoa volta exatamente
  // de onde parou, na mesma sequência de questões (ver salvarSessaoEmAndamento)
  salvarSessaoEmAndamento();
  state.sessaoAtual=null;
  navigate(eraHistorico?"historico":"estudar");
}

/* ---------- sessão que sobrevive a sair da tela (e a fechar o navegador) ----
   Antes, a fila de questões só existia na memória: sair de Estudar, trocar de
   tela ou atualizar a página jogava a sessão fora e a próxima sessão era
   montada do zero. Quem estudava em pedaços ao longo do dia ficava sempre
   recomeçando, e a meta diária virava um monte de começos.

   Agora a sessão de PRÁTICA é gravada junto com o resto dos dados, por
   usuário, e retomada de onde parou — mesma fila, mesma ordem, mesmas
   alternativas riscadas. Simulado não entra aqui de propósito: é prova com
   cronômetro, e prova que se pausa e retoma no dia seguinte não mede nada. */
function salvarSessaoEmAndamento(){
  const s = state.sessaoAtual;
  const u = usuarioAtual();
  if(!u) return;
  if(!db.sessoesEmAndamento) db.sessoesEmAndamento = {};
  const guardavel = s && !s.somenteLeitura && !s.finalizada && s.tipo!=="simulado" && s.itens && s.itens.length;
  if(!guardavel) return;
  db.sessoesEmAndamento[u.id] = {
    id: s.id, tipo: s.tipo, itens: s.itens, indiceAtual: s.indiceAtual,
    respostasSessao: s.respostasSessao, eliminadas: s.eliminadas || {},
    // o que está marcado sem confirmar também é rascunho e também volta:
    // ver "marcar não é responder", logo abaixo
    marcadas: s.marcadas || {}, salvaEm: hojeISO(),
    // a dissertativa também tem rascunho (o texto escrito) e uma etapa entre
    // confirmar e se avaliar: ver 08c-questoes-dissertativas.js
    rascunhos: s.rascunhos || {}, dissertativas: s.dissertativas || {},
  };
  nuvemRegistrar({usuarioId:u.id, sessaoEmAndamento: db.sessoesEmAndamento[u.id]});
  saveState();
}
function limparSessaoEmAndamento(){
  const u = usuarioAtual(); if(!u || !db.sessoesEmAndamento) return;
  if(db.sessoesEmAndamento[u.id]){ delete db.sessoesEmAndamento[u.id]; saveState(); }
}
function sessaoEmAndamentoDe(usuario){
  if(!usuario || !db.sessoesEmAndamento) return null;
  const guardada = db.sessoesEmAndamento[usuario.id];
  if(!guardada || !guardada.itens || !guardada.itens.length) return null;
  // Questão excluída ou desativada desde então some da fila. As respostas
  // andam pela POSIÇÃO na fila, então elas precisam sair junto: tirar a
  // questão 2 e deixar as respostas como estavam faria a resposta da 3
  // aparecer na 2 daí em diante.
  const respostas = guardada.respostasSessao || [];
  const itens = [], mantidas = [];
  guardada.itens.forEach((item, i) => {
    const q = getQuestao(item.questaoId);
    if(!q || aguardaImagem(q)) return;
    itens.push(item);
    mantidas[itens.length-1] = respostas[i] || null;
  });
  if(!itens.length) return null;
  return {...guardada, itens, respostasSessao: mantidas};
}
/* Põe a sessão guardada de volta em memória. Devolve true se conseguiu.
   Separado da navegação de propósito: o roteador chama esta parte durante o
   próprio render (não pode navegar de novo dali), e o botão "Continuar"
   chama a versão que também troca de tela. */
function carregarSessaoEmAndamento(){
  const guardada = sessaoEmAndamentoDe(usuarioAtual());
  if(!guardada) return false;
  const respostas = (guardada.respostasSessao || []).slice(0, guardada.itens.length);
  const indice = Math.min(guardada.indiceAtual || 0, guardada.itens.length-1);
  // sessão gravada antes de as marcações virarem memória por questão: o que
  // ela guardava era uma marca só, a da questão em que a pessoa parou
  let marcadas = guardada.marcadas;
  if(!marcadas){
    marcadas = {};
    const item = guardada.itens[indice];
    if(guardada.uiSelecionada && item) marcadas[item.questaoId] = guardada.uiSelecionada;
  }
  state.sessaoAtual = {
    id: guardada.id, tipo: guardada.tipo, itens: guardada.itens,
    indiceAtual: indice,
    respostasSessao: respostas, eliminadas: guardada.eliminadas || {},
    marcadas: marcadas,
    rascunhos: guardada.rascunhos || {}, dissertativas: guardada.dissertativas || {},
    finalizada: false, tsQuestao: Date.now(),
  };
  return true;
}
function retomarSessaoEmAndamento(){
  if(!carregarSessaoEmAndamento()){ toast("Não há sessão guardada para continuar.", "err"); return; }
  navigate("sessao");
}
function descartarSessaoEmAndamento(){
  limparSessaoEmAndamento();
  toast("Sessão descartada. A próxima que você começar será montada do zero.");
  render();
}
/* ---------- eliminar alternativas ("riscar", como no rascunho da prova) ------
   Quem resolve questão de múltipla escolha vai cortando o que já descartou
   para diminuir o campo de escolha. Aqui esse corte é guardado por questão
   (pela id da questão, não pela posição), então continua valendo se a pessoa
   voltar para a questão depois — e some junto com a sessão. Riscar não conta
   como resposta: é rascunho, não decisão. */
function eliminadasDaQuestao(questaoId){
  const s = state.sessaoAtual;
  if(!s || !s.eliminadas) return [];
  return s.eliminadas[questaoId] || [];
}
function alternarAlternativaEliminada(altId){
  const s = state.sessaoAtual; if(!s) return;
  if(s.somenteLeitura) return;
  const item = s.itens[s.indiceAtual]; if(!item) return;
  // depois de responder o risco vira histórico e não muda mais. No simulado dá
  // para trocar de ideia até encerrar; na prática, a questão fecha ao responder.
  const fechada = s.tipo==="simulado" ? !!s.finalizado : !!respostaDoIndice(s, s.indiceAtual);
  if(fechada) return;
  if(!s.eliminadas) s.eliminadas = {};
  const lista = (s.eliminadas[item.questaoId] || []).slice();
  const pos = lista.indexOf(altId);
  if(pos>=0) lista.splice(pos,1); else lista.push(altId);
  s.eliminadas[item.questaoId] = lista;
  salvarSessaoEmAndamento();
  redesenharQuestaoDaSessao();
}
/* Marcar uma alternativa que estava riscada desfaz o risco: se a pessoa
   resolveu escolhê-la, ela não está mais descartada. */
function desriscarSeNecessario(altId){
  const s = state.sessaoAtual; if(!s || !s.eliminadas) return;
  const item = s.itens[s.indiceAtual]; if(!item) return;
  const lista = s.eliminadas[item.questaoId];
  if(!lista) return;
  const pos = lista.indexOf(altId);
  if(pos>=0) lista.splice(pos,1);
}
/* ---------- marcar NÃO é responder (e por isso também tem memória) --------
   Marcar uma alternativa é dizer "acho que é esta"; responder é bater o
   martelo e declarar a confiança. Entre uma coisa e outra a pessoa pode
   querer ver a questão seguinte, conferir a anterior ou simplesmente sair —
   e nada disso deve apagar o que ela já tinha decidido.

   Por isso a marca é guardada POR QUESTÃO (pela id, não pela posição), do
   mesmo jeito que os riscos, e volta com ela: dentro do conjunto, ao reabrir
   a fila e em qualquer aparelho, já que a sessão em andamento sobe para a
   nuvem. O que fica guardado é sempre rascunho — nenhuma resposta é contada
   sem a pessoa dizer se foi com certeza, na dúvida ou no chute. */
function marcadaDaQuestao(questaoId){
  const s = state.sessaoAtual;
  if(!s || !s.marcadas) return null;
  return s.marcadas[questaoId] || null;
}
function selecionarAlternativa(altId){
  if(haTextoSelecionado()) return;   // quem arrastou para destacar não escolheu a alternativa
  const s = state.sessaoAtual; if(!s || s.somenteLeitura) return;
  if(respostaDoIndice(s, s.indiceAtual)) return;   // já respondida: não muda mais
  const item = s.itens[s.indiceAtual]; if(!item) return;
  desriscarSeNecessario(altId);
  if(!s.marcadas) s.marcadas = {};
  s.marcadas[item.questaoId] = altId;
  salvarSessaoEmAndamento();
  redesenharQuestaoDaSessao();
}
function confirmarResposta(confianca){
  const sessao = state.sessaoAtual; if(!sessao || sessao.somenteLeitura) return;
  const item = sessao.itens[sessao.indiceAtual]; if(!item) return;
  if(respostaDoIndice(sessao, sessao.indiceAtual)) return;
  const marcada = marcadaDaQuestao(item.questaoId);
  if(!marcada) return;
  const tempoSeg = sessao.tsQuestao ? (Date.now()-sessao.tsQuestao)/1000 : null;
  const resp = registrarResposta(usuarioAtual().id, item.questaoId, marcada, confianca, tempoSeg, origemDoItem(sessao, item));
  sessao.respostasSessao[sessao.indiceAtual] = resp;
  salvarSessaoEmAndamento();
  render();
}
/* ---------- navegação livre, inclusive por cima do que ficou em branco ----
   A fila anda para os dois lados e não exige responder para seguir: travar a
   passagem numa questão que a pessoa não consegue resolver agora faz ela
   abandonar o conjunto inteiro (ou chutar só para destravar, o que suja o
   histórico com um chute que não era chute).

   O que continua valendo é a regra que importa: toda resposta registrada tem
   a confiança declarada. Pular não é responder, e por isso não conta nada —
   a questão só some da lista de em branco quando a pessoa marcar uma
   alternativa e dizer se foi com certeza, na dúvida ou no chute. */
function irQuestaoSessao(delta){
  const s = state.sessaoAtual; if(!s) return;
  irParaIndiceDaSessao(s.indiceAtual + delta);
}
function voltarQuestaoSessao(){ irQuestaoSessao(-1); }
function proximaQuestaoSessao(){
  const sessao = state.sessaoAtual; if(!sessao) return;
  if(sessao.indiceAtual < sessao.itens.length-1) irQuestaoSessao(1);
  else finalizarSessaoPratica();
}
/* Fim do conjunto. Com questões em branco, pergunta antes: chegar ao fim da
   fila e ver o resumo sem perceber que cinco questões ficaram para trás é o
   tipo de coisa que só se descobre depois. Quem quiser fechar assim mesmo
   fecha — as em branco simplesmente não entram no histórico, porque não
   houve resposta nenhuma para guardar. */
function finalizarSessaoPratica(){
  const s = state.sessaoAtual; if(!s) return;
  const emBranco = indicesEmBranco(s);
  if(emBranco.length && !s.somenteLeitura){
    const feitas = respostasFeitas(s).length;
    abrirModalTitulado("Terminar com questões em branco?", `
      <p class="text-sm">Você respondeu <strong>${feitas}</strong> de ${s.itens.length} e deixou <strong>${emBranco.length}</strong> em branco. Questão em branco não conta como erro nem como acerto: ela some do conjunto e não entra no histórico.</p>
      <div class="flex gap-1 mt-3 quebra">
        <button class="btn btn-primary" onclick="fecharModal(); irParaIndiceDaSessao(${emBranco[0]})">Ir para a primeira em branco (questão ${emBranco[0]+1})</button>
        <button class="btn btn-secondary" onclick="fecharModal(); fecharSessaoPratica()">Terminar assim mesmo</button>
      </div>`);
    return;
  }
  fecharSessaoPratica();
}
function fecharSessaoPratica(){
  const s = state.sessaoAtual; if(!s) return;
  s.finalizada = true;
  registrarSessaoNoHistorico(s);
  limparSessaoEmAndamento(); // conjunto concluído: não há mais o que retomar
  render(); window.scrollTo(0,0);
}
/* Guarda o conjunto de questões concluído no histórico do aluno, com o
   detalhe de cada questão (o que marcou, se acertou e qual foi a confiança).
   É esse registro que alimenta a tela "Histórico de Atividade" e permite
   reabrir a página de feedback depois. */
function registrarSessaoNoHistorico(s){
  if(s.somenteLeitura) return;
  const feitas = respostasFeitas(s);
  if(!feitas.length) return;
  if(!db.sessoes) db.sessoes = [];
  const u = usuarioAtual();
  const anterior = db.sessoes.find(x => x.id === s.id) || null;
  // as questões deixadas em branco não entram: não houve resposta, e contá-las
  // como linha do histórico inventaria um erro que não aconteceu
  const itens = [];
  s.itens.forEach((it, i) => {
    const r = respostaDoIndice(s, i);
    if(!r) return;
    itens.push({
      questaoId: it.questaoId,
      motivo: it.motivo,
      alternativaEscolhida: r.alternativaEscolhida,
      correta: r.correta,
      confianca: r.confianca,
      ...(r.textoResposta ? { textoResposta: r.textoResposta } : {}),
    });
  });
  const registro = {
    id: s.id, usuarioId: u.id, tipo: s.tipo||"pratica",
    data: (s.salvaNoHistorico && anterior) ? anterior.data : hojeISO(),
    total: feitas.length,
    acertos: feitas.filter(r=>r.correta).length,
    itens: itens,
  };
  // reescreve em vez de duplicar: depois do resumo a pessoa pode voltar e
  // responder uma questão que tinha ficado em branco, e aí este conjunto
  // passa a ter uma questão a mais — é a mesma sessão, com outro placar
  if(anterior) db.sessoes[db.sessoes.indexOf(anterior)] = registro;
  else db.sessoes.push(registro);
  nuvemRegistrar({sessaoConcluida: registro});
  s.salvaNoHistorico = true;
  saveState();
}
// volta para uma questão específica a partir da tela de feedback
function voltarParaQuestaoDaSessao(indice){
  const s = state.sessaoAtual; if(!s) return;
  s.finalizada = false; s.jaFinalizada = true;
  s.indiceAtual = Math.max(0, Math.min(s.itens.length-1, indice));
  s.tsQuestao = Date.now();
  render(); window.scrollTo(0,0);
}
function voltarAoResumoDaSessao(){
  const s = state.sessaoAtual; if(!s) return;
  s.finalizada = true;
  // se ela voltou e respondeu uma que estava em branco, o histórico acompanha
  if(s.jaFinalizada) registrarSessaoNoHistorico(s);
  render(); window.scrollTo(0,0);
}
// reabre a página de feedback de um conjunto de questões já concluído
function abrirSessaoDoHistorico(sessaoId){
  const reg = (db.sessoes||[]).find(x=>x.id===sessaoId);
  if(!reg){ toast("Registro não encontrado.", "err"); return; }
  state.sessaoAtual = {
    id: reg.id, tipo: reg.tipo, somenteLeitura:true, salvaNoHistorico:true, dataOriginal: reg.data,
    itens: reg.itens.map(i=>({questaoId:i.questaoId, motivo:i.motivo||"Revisão do histórico"})),
    respostasSessao: reg.itens.map(i=>({questaoId:i.questaoId, alternativaEscolhida:i.alternativaEscolhida, textoResposta:i.textoResposta, correta:i.correta, confianca:i.confianca, data:reg.data})),
    indiceAtual:0, marcadas:{}, finalizada:true,
  };
  navigate("sessao");
}
function revisarErrosDestaSessao(){
  const s = state.sessaoAtual; if(!s) return;
  const eu = usuarioAtual().id;
  const pendentes = respostasFeitas(s).filter(r=>!r.correta || r.confianca==="chute");
  // a que a pessoa escondeu no meio do conjunto não volta aqui
  const errados = pendentes.filter(r=>!questaoOculta(eu, r.questaoId)).map(r=>({questaoId:r.questaoId, origem:"erros", motivo:"Erro ou chute no conjunto anterior"}));
  if(!errados.length){ toast(pendentes.length ? "As questões que você errou ou chutou aqui estão escondidas." : "Você não errou nem chutou nenhuma questão deste conjunto."); return; }
  state.sessaoAtual = null;
  iniciarSessaoComLista(errados, "pratica");
}
/* ---------------------- mapa de progresso da sessão -----------------------
   Uma faixa com um quadradinho por questão da fila: o número, e a cor do que
   aconteceu (verde acertou, vermelho errou, neutro ainda não respondida).
   Clicar volta a uma questão já respondida — é a navegação que faltava para
   quem quer conferir "o que foi mesmo que eu marquei na 3?" no meio do
   conjunto, sem perder o lugar.

   O mapa também é o caminho curto para as questões deixadas em branco: toda
   posição é clicável, inclusive as que ainda não foram respondidas, porque a
   fila não exige ordem. A resposta de cada questão é guardada pela POSIÇÃO
   dela na fila (respostasSessao[i] é a resposta de itens[i]), então pular
   não embaralha nada: a posição pulada fica simplesmente vazia.

   O pontinho âmbar marca os dois casos que a plataforma trata como "não
   sabida", e que a tela de fim de conjunto já destaca: acerto no chute e
   erro com certeza.

   O mapa é uma BARRA FINA, de uma linha: "feitas/total", os números num
   trilho que rola de lado com a questão atual centralizada, e um botão que
   expande para o conjunto inteiro (várias linhas, placar e legenda). A
   escolha fica em state.mapaSessaoExpandido e vale para o simulado também
   (ver htmlBarraDeQuestoes). */
function renderMapaSessao(sessao){
  const total = sessao.itens.length;
  const feitasLista = respostasFeitas(sessao);
  const feitas = feitasLista.length;
  const acertos = feitasLista.filter(r => r.correta).length;
  const erros = feitas - acertos;
  const emBranco = total - feitas;
  const resumo = feitas
    ? `<strong>${feitas} de ${total}</strong> · ${acertos} ${acertos===1?"acerto":"acertos"} · ${erros} ${erros===1?"erro":"erros"}${emBranco?` · ${emBranco} em branco`:""}`
    : `<strong>0 de ${total}</strong> · o conjunto ainda não começou`;
  const pills = sessao.itens.map((item, i) => {
    const r = respostaDoIndice(sessao, i);
    const atual = i === sessao.indiceAtual;
    const marcadaSemResponder = !r && !!(marcadaDaQuestao(item.questaoId) || dissertativaConfirmada(item.questaoId) || rascunhoDaDissertativa(item.questaoId).trim());
    let classe = "mapa-pill";
    let descricao = "Questão " + (i+1);
    let marca = "";
    if(r){
      classe += r.correta ? " acertou" : " errou";
      descricao += r.correta ? " — você acertou" : " — você errou";
      if(r.confianca === "chute") descricao += r.correta ? ", no chute (a plataforma conta como não sabida)" : ", no chute";
      else if(r.confianca === "certeza") descricao += r.correta ? ", com certeza" : ", com certeza (o erro mais caro)";
      else descricao += ", na dúvida";
      const atencao = (r.correta && r.confianca === "chute") || (!r.correta && r.confianca === "certeza");
      if(atencao) marca = `<span class="marca" aria-hidden="true"></span>`;
    } else if(marcadaSemResponder){
      classe += " marcada";
      descricao += " — em andamento, falta confirmar a resposta";
      marca = `<span class="marca" aria-hidden="true"></span>`;
    } else {
      classe += " agora";
      descricao += " — ainda em branco";
    }
    if(atual){ classe += " atual"; descricao += " (você está aqui)"; }
    // selo no canto: ✓ acertou, ✕ errou — a cor sozinha não distingue bem numa barra pequena
    const selo = r ? `<span class="selo-resp ${r.correta ? "v" : "x"}" aria-hidden="true">${r.correta ? "✓" : "✕"}</span>` : "";
    return `<button class="${classe}" title="${escapeHtml(descricao)}" aria-label="${escapeHtml(descricao)}"${atual?' aria-current="true"':""} onclick="irParaIndiceDaSessao(${i})">${i+1}${marca}${selo}</button>`;
  }).join("");
  const detalhe = `<div class="text-xs muted">${resumo}</div>
    ${feitas ? `<div class="mapa-sessao-legenda text-xs muted">
      <span><i class="amostra acertou"></i>✓ acertou</span>
      <span><i class="amostra errou"></i>✕ errou</span>
      <span><i class="amostra marcada"></i><span class="so-largo">acerto no chute ou erro com certeza</span><span class="so-estreito">chute ou erro com certeza</span></span>
      <span class="so-largo"><i class="amostra"></i>em branco</span>
    </div>` : `<div class="text-xs muted mt-1">Cada quadradinho é uma questão da fila. Clique para ir a qualquer uma, respondida ou não; assim que você responder, ele mostra se acertou.</div>`}`;
  return htmlBarraDeQuestoes({ id: "mapaDaSessao", feitas, total, pills, detalhe,
    titulo: `${feitas} de ${total} respondidas · ${acertos} acerto(s) · ${erros} erro(s)${emBranco ? " · " + emBranco + " em branco" : ""}` });
}
/* A barra fina, comum à prática e ao simulado. Quem chama entrega os botões
   (pills) e o que aparece só com a barra expandida (detalhe). */
function htmlBarraDeQuestoes(o){
  const expandida = !!state.mapaSessaoExpandido;
  return `<div class="barra-questoes${expandida ? " expandida" : ""}" id="${o.id}">
    <div class="barra-questoes-linha">
      <span class="barra-questoes-resumo" title="${escapeHtml(o.titulo || "")}">${o.feitas}/${o.total}</span>
      ${expandida ? "" : `<button class="barra-questoes-seta" onclick="passarPelaBarra(-1)" aria-label="Questão anterior" title="Questão anterior (a barra acompanha)">‹</button>`}
      <div class="barra-questoes-trilho" role="navigation" aria-label="Questões do conjunto">${o.pills}</div>
      ${expandida ? "" : `<button class="barra-questoes-seta" onclick="passarPelaBarra(1)" aria-label="Próxima questão" title="Próxima questão (a barra acompanha)">›</button>`}
      <button class="barra-questoes-expandir" onclick="alternarMapaSessao()" aria-expanded="${expandida}" title="${expandida ? "Recolher a barra" : "Expandir: ver todas as questões"}">${iconeSvg("chevron-d")}</button>
    </div>
    ${expandida ? `<div class="barra-questoes-detalhe">${o.detalhe || ""}</div>` : ""}
  </div>`;
}
/* As setas das pontas da barra passam a questão (anterior/próxima), e o trilho
   acompanha sozinho — centralizarBarraDeQuestoes roda a cada desenho. Para ir
   longe de uma vez, a roda do mouse (abaixo) ou o dedo rolam o trilho solto. */
function passarPelaBarra(sentido){ if(sentido > 0) avancarPorGesto(); else voltarPorGesto(); }
/* Rolagem lateral do trilho durante a prova: a roda do mouse (que só rola
   para cima e para baixo) convertida em rolagem de lado.
   No celular o dedo já arrasta o trilho. Só vale com a barra recolhida — a
   expandida mostra tudo e não rola. */
document.addEventListener("wheel", function(e){
  const trilho = e.target.closest && e.target.closest(".barra-questoes:not(.expandida) .barra-questoes-trilho");
  if(!trilho || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
  e.preventDefault();
  trilho.scrollLeft += e.deltaY;
}, { passive: false });
/* No trilho de uma linha, a questão atual fica à vista, no meio. Rola só o
   trilho (scrollLeft), nunca a página. */
function centralizarBarraDeQuestoes(){
  document.querySelectorAll(".barra-questoes:not(.expandida) .barra-questoes-trilho").forEach(trilho => {
    const atual = trilho.querySelector(".atual");
    if(!atual) return;
    const alvo = atual.offsetLeft - (trilho.clientWidth - atual.offsetWidth) / 2;
    const anterior = trilho.style.scrollBehavior;
    trilho.style.scrollBehavior = "auto";          // sem animação ao redesenhar
    trilho.scrollLeft = Math.max(0, alvo);
    trilho.style.scrollBehavior = anterior;
  });
}
function alternarMapaSessao(){
  state.mapaSessaoExpandido = !state.mapaSessaoExpandido;
  const s = state.sessaoAtual;
  const mapa = document.getElementById("mapaDaSessao");
  if(mapa && s && s.tipo !== "simulado" && !s.finalizada && state.route === "sessao"){
    mapa.outerHTML = renderMapaSessao(s); centralizarBarraDeQuestoes(); return;
  }
  render();
}
/* Vai direto a uma questão da fila — qualquer uma, respondida ou em branco.
   O que a pessoa tinha marcado e riscado em cada questão continua lá, porque
   esses rascunhos são guardados pela id da questão, e não pela posição. */
function irParaIndiceDaSessao(indice){
  const s = state.sessaoAtual; if(!s) return;
  const destino = Math.max(0, Math.min(s.itens.length - 1, indice));
  if(destino === s.indiceAtual) return;
  s.indiceAtual = destino;
  s.tsQuestao = Date.now();
  salvarSessaoEmAndamento();
  render();
  window.scrollTo(0, 0);
}
/* O cartão da questão em si — só ele. Marcar uma alternativa ou riscar outra
   muda esta parte e mais nada: o mapa, a barra e os botões continuam os
   mesmos. Redesenhar só isto (em vez de a tela inteira) é o que mantém o
   conjunto de questões parado enquanto a pessoa pensa, sem o pisca-pisca de
   antes. Se a tela não estiver montada, cai no render() normal. */
function htmlCartaoDaSessao(sessao){
  const item = sessao.itens[sessao.indiceAtual];
  const q = getQuestao(item.questaoId);
  const resp = respostaDoIndice(sessao, sessao.indiceAtual);
  return renderQuestionCard(q, resp
    ? {selecionada: resp.alternativaEscolhida, respondida:true, resposta: resp, somenteLeitura: !!sessao.somenteLeitura}
    : {selecionada: marcadaDaQuestao(item.questaoId), respondida:false, somenteLeitura: !!sessao.somenteLeitura});
}
function redesenharQuestaoDaSessao(){
  const area = document.getElementById("areaGestoQuestao");
  const sessao = state.sessaoAtual;
  if(!area || !sessao || sessao.finalizada || state.route!=="sessao"){ render(); return; }
  area.innerHTML = htmlCartaoDaSessao(sessao);
  // o mapa mostra quais questões já têm alternativa marcada: ele acompanha
  const mapa = document.getElementById("mapaDaSessao");
  if(mapa){ mapa.outerHTML = renderMapaSessao(sessao); centralizarBarraDeQuestoes(); }
}
function renderSessao(){
  const sessao = state.sessaoAtual;
  if(!sessao || sessao.finalizada) return renderSessaoResumo();
  const item = sessao.itens[sessao.indiceAtual];
  const respondidaAqui = !!respostaDoIndice(sessao, sessao.indiceAtual);
  const feitas = respostasFeitas(sessao).length;
  const emBranco = sessao.itens.length - feitas;
  const naUltima = sessao.indiceAtual === sessao.itens.length-1;
  const soLeitura = sessao.jaFinalizada || sessao.somenteLeitura;
  // uma linha só, em vez de dois avisos soltos; o "em branco" só depois que o
  // conjunto começou (no primeiro cartão é só o tamanho da fila)
  const avisoRodape = [
    (!respondidaAqui && !soLeitura && !naUltima) ? "Dá para seguir sem responder: a questão fica em branco no mapa e você volta a ela quando quiser — o que estiver marcado e riscado continua aqui." : "",
    (!soLeitura && emBranco && feitas) ? `${emBranco} ${emBranco===1?"questão em branco":"questões em branco"} neste conjunto.` : "",
  ].filter(Boolean).join(" ");
  return `<div class="coluna-questao">
  <div class="flex justify-between items-center mb-2">
    <div class="text-sm muted">Questão ${sessao.indiceAtual+1} de ${sessao.itens.length}${sessao.somenteLeitura?' · <span class="badge badge-muted">revisão do histórico</span>':""}</div>
    <div class="flex gap-1">
      ${soLeitura ? `<button class="btn btn-secondary btn-sm" onclick="voltarAoResumoDaSessao()">${iconeSvg("chart")} Voltar ao resumo</button>` : ""}
      <button class="btn btn-ghost btn-sm" onclick="alternarModoFoco()" title="Esconde o menu e o topo para estudar sem distração">${state.modoFoco ? "Sair do foco" : "Modo foco"}</button>
      <button class="btn btn-ghost btn-sm" onclick="sairDaSessao()">Sair</button>
    </div>
  </div>
  ${renderMapaSessao(sessao)}
  <div class="why-tag">${iconeSvg("target")}<span>${escapeHtml(item.motivo)}</span></div>
  <div class="area-gesto" id="areaGestoQuestao">
    ${htmlCartaoDaSessao(sessao)}
  </div>
  <div class="dica-arrastar">${iconeSvg("swipe")}<span>arraste para o lado para trocar de questão</span></div>
  <div class="flex justify-between items-center mt-2 gap-1 quebra">
    <button class="btn btn-secondary" onclick="voltarQuestaoSessao()" ${sessao.indiceAtual>0?"":"disabled"}>Anterior</button>
    <div class="text-xs muted dica-teclas">Teclas A (anterior) / D (próxima)</div>
    ${naUltima
      ? `<button class="btn btn-primary" onclick="${soLeitura?"voltarAoResumoDaSessao()":"finalizarSessaoPratica()"}">${soLeitura?"Ver resumo":"Finalizar sessão"}</button>`
      : `<button class="btn ${respondidaAqui?"btn-secondary":"btn-ghost"}" onclick="irQuestaoSessao(1)">${respondidaAqui?"Próxima":"Deixar para depois"}</button>`}
  </div>
  ${avisoRodape ? `<div class="text-xs muted mt-1">${avisoRodape}</div>` : ""}
  </div>`;
}
function renderSessaoResumo(){
  const sessao = state.sessaoAtual;
  if(!sessao) return `<div class="empty-state">Nenhuma sessão ativa.<br><button class="btn btn-primary mt-2" onclick="navigate('estudar')">Ir para Estudar</button></div>`;
  const respostas = respostasFeitas(sessao);
  const total = respostas.length;
  const acertos = respostas.filter(r=>r.correta).length;
  const emBranco = (sessao.itens ? sessao.itens.length : total) - total;
  const porConfianca = {certeza:{n:0,ok:0}, duvida:{n:0,ok:0}, chute:{n:0,ok:0}};
  respostas.forEach(r=>{ if(porConfianca[r.confianca]){ porConfianca[r.confianca].n++; if(r.correta) porConfianca[r.confianca].ok++; } });
  const errosEChutes = respostas.filter(r=>!r.correta || r.confianca==="chute").length;
  const primeiraEmBranco = indicesEmBranco(sessao)[0];
  const linhaConfianca = (chave, rotulo) => {
    const c = porConfianca[chave];
    return `<div class="stat-tile"><div class="stat-value" style="font-size:1.3rem">${c.n?pct(c.ok,c.n)+"%":"—"}</div><div class="stat-label">acerto quando ${rotulo} (${c.n} questão(ões))</div></div>`;
  };
  return `
  <div class="page-header"><h2>Conjunto de questões concluído</h2><p>${sessao.somenteLeitura?"Revisão do conjunto respondido em "+formatDataBR(sessao.dataOriginal||hojeISO())+".":"Veja abaixo, questão a questão, o que você acertou, errou, chutou ou respondeu na dúvida. Clique em qualquer uma para voltar a ela."}</p></div>
  <div class="grid ${emBranco?"grid-3":"grid-2"} mb-2">
    <div class="stat-tile"><div class="stat-value">${total?pct(acertos,total):0}%</div><div class="stat-label">de acerto neste conjunto (${acertos}/${total})</div></div>
    <div class="stat-tile"><div class="stat-value">${errosEChutes}</div><div class="stat-label">questão(ões) para revisar (erros e chutes)</div></div>
    ${emBranco?`<div class="stat-tile"><div class="stat-value">${emBranco}</div><div class="stat-label">deixada(s) em branco — não contam como erro</div></div>`:""}
  </div>
  ${(emBranco && !sessao.somenteLeitura && primeiraEmBranco!==undefined) ? `<div class="card-flat mb-2 flex justify-between items-center gap-2 quebra">
    <div class="text-sm">Ainda dá para responder o que ficou em branco: a fila continua guardada com as suas marcações.</div>
    <button class="btn btn-secondary btn-sm" onclick="voltarParaQuestaoDaSessao(${primeiraEmBranco})">${iconeSvg("refresh")} Ir para a questão ${primeiraEmBranco+1}</button>
  </div>` : ""}
  <div class="grid grid-3 mb-2">
    ${linhaConfianca("certeza","tinha certeza")}
    ${linhaConfianca("duvida","estava na dúvida")}
    ${linhaConfianca("chute","chutou")}
  </div>
  <div class="card mb-2">
    <div class="card-title mb-1">Questão a questão</div>
    <p class="text-sm muted mb-2">Clique em "voltar à questão" para rever o enunciado, as alternativas e a explicação completa dentro da sessão — sem perder este resumo.</p>
    ${(sessao.itens||[]).map((item,i)=>{
      const r = respostaDoIndice(sessao, i);
      if(!r) return "";
      const q = getQuestao(r.questaoId);
      if(!q) return "";
      const badgeResultado = r.correta ? '<span class="badge badge-accent">Acertou</span>' : '<span class="badge badge-danger">Errou</span>';
      const corConf = r.confianca==="certeza" ? "badge-accent" : r.confianca==="duvida" ? "badge-amber" : "badge-danger";
      const alerta = (r.correta && r.confianca==="chute") ? '<span class="badge badge-amber">acerto no chute</span>'
                   : (!r.correta && r.confianca==="certeza") ? '<span class="badge badge-danger">erro com certeza — atenção</span>' : "";
      return `<div class="card-flat mb-1">
        <div class="qcard-meta mb-1">
          <span class="badge badge-muted">${i+1}</span>
          ${badgeResultado}
          <span class="badge ${corConf}">${escapeHtml(rotuloConfianca(r.confianca))}</span>
          ${alerta}
          <span class="badge badge-muted">${escapeHtml(nomeAssunto(q.assuntoId))}</span>
        </div>
        <div class="text-sm"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${q.id}')">${escapeHtml(q.enunciado.slice(0,180))}${q.enunciado.length>180?"…":""}</span></div>
        <div class="text-xs muted mt-1">${ehDissertativa(q) ? "Dissertativa · você se avaliou: "+(r.correta?"acertou":"errou") : "Você marcou "+escapeHtml(r.alternativaEscolhida)+" · gabarito "+escapeHtml(q.gabarito)}</div>
        <div class="flex gap-1 mt-2 quebra">
          <button class="btn btn-secondary btn-sm" onclick="voltarParaQuestaoDaSessao(${i})">${iconeSvg("refresh")} Voltar à questão</button>
          ${botaoVerNaIntegra(q.id, "Ver na íntegra")}
          <button class="btn ${(!r.correta||r.confianca==="chute")?"btn-secondary":"btn-ghost"} btn-sm" onclick="abrirFormularioFlashcard(null,{questaoId:'${q.id}'})">${iconeSvg("cards")} Virar flashcard</button>
          <button class="btn btn-ghost btn-sm" onclick="toggleFavoritoUI('${q.id}')">${iconeSvg("star")} ${isFavorita(usuarioAtual().id,q.id)?"Desfavoritar":"Favoritar"}</button>
          <button class="btn btn-ghost btn-sm" onclick="abrirNotaFavorita('${q.id}')">${iconeSvg("message")} ${notaDaFavorita(usuarioAtual().id,q.id)?"Editar anotação":"Anotar dúvida"}</button>
        </div>
        ${cartoesDaQuestao(usuarioAtual().id, q.id).length ? `<div class="text-xs muted mt-1">${iconeSvg("cards")} cartão já criado a partir desta questão</div>` : ""}
      </div>`;
    }).join("")}
  </div>
  <div class="flex gap-1 quebra">
    ${!sessao.somenteLeitura && errosEChutes ? `<button class="btn btn-primary" onclick="revisarErrosDestaSessao()">${iconeSvg("refresh")} Revisar agora os erros e chutes (${errosEChutes})</button>` : ""}
    <button class="btn btn-secondary" onclick="state.sessaoAtual=null;navigate('estudar')">Nova sessão</button>
    <button class="btn btn-secondary" onclick="state.sessaoAtual=null;navigate('historico')">Ver histórico de atividade</button>
    <button class="btn btn-ghost" onclick="state.sessaoAtual=null;navigate('inicio')">Voltar ao início</button>
  </div>`;
}

/* ---------- cartão de questão (reutilizado em prática, simulado e revisão) ---------- */
/* Imagem da questão (ECG, radiografia, fundo de olho, foto de lesão...).
   Pode ser um link externo, uma imagem embutida em data URI (já entra
   redimensionada e comprimida, para não estourar o armazenamento do
   navegador) ou um arquivo da pasta dados/imagens/.

   IMAGEM QUE AINDA NÃO CHEGOU. Algumas questões reais dependem de uma
   figura da prova (um ECG, uma tabela 2×2, uma radiografia) que ainda não
   foi anexada. Elas trazem `imagemPendente` — a descrição do que a prova
   mostrava — e apontam para o arquivo que DEVE existir em dados/imagens/.
   Enquanto ele não existe, a questão diz isso com todas as letras, em vez
   de mostrar um ícone de imagem quebrada ou, pior, parecer completa. Salvar
   o arquivo com aquele nome (em .png, .jpg ou .webp — as três servem) basta
   para a imagem aparecer. */
const EXTENSOES_IMAGEM = [".png", ".jpg", ".jpeg", ".webp"];
function avisoImagemPendente(q){
  return `<div class="imagem-pendente">${iconeSvg("alert")}<div><strong>Esta questão tinha uma imagem na prova original, que ainda não foi anexada.</strong>
    <div class="text-xs mt-1">Na prova: ${escapeHtml(q.imagemPendente)} A explicação descreve o achado esperado.</div></div></div>`;
}
function renderImagemQuestao(q){
  if(!q.imagemUrl) return q.imagemPendente ? avisoImagemPendente(q) : "";
  const local = !/^(https?:|data:)/.test(q.imagemUrl);
  return `<div class="qcard-img-wrap" data-questao="${escapeHtml(q.id)}">
    <img class="qcard-img" src="${escapeHtml(q.imagemUrl)}" alt="${escapeHtml(q.imagemLegenda||"Imagem da questão")}" onclick="ampliarImagemQuestao('${q.id}', this.src)" loading="lazy"${local ? ` onerror="imagemDaQuestaoFalhou(this, '${q.id}')"` : ""}>
    ${q.imagemLegenda?`<div class="qcard-img-legenda">${escapeHtml(q.imagemLegenda)}</div>`:""}
  </div>`;
}
/* O arquivo não veio: tenta as outras extensões (quem salvou .jpg no lugar
   de .png não precisa mexer no arquivo de dados) e, esgotadas, troca a
   imagem pelo aviso. */
function imagemDaQuestaoFalhou(img, qid){
  const q = getQuestao(qid); if(!q) return;
  const base = q.imagemUrl.replace(/\.(png|jpe?g|webp)$/i, "");
  const tentadas = (img.dataset.tentadas || "").split(",").filter(Boolean);
  tentadas.push(img.getAttribute("src"));
  img.dataset.tentadas = tentadas.join(",");
  const proxima = EXTENSOES_IMAGEM.map(ext => base + ext).find(c => !tentadas.includes(c));
  if(proxima){ img.src = proxima; return; }
  const caixa = img.closest(".qcard-img-wrap");
  if(caixa) caixa.outerHTML = q.imagemPendente ? avisoImagemPendente(q)
    : `<div class="imagem-pendente">${iconeSvg("alert")}<div>A imagem desta questão não carregou (<code>${escapeHtml(q.imagemUrl)}</code>).</div></div>`;
}
function ampliarImagemQuestao(qid, src){
  const q = getQuestao(qid); if(!q || !q.imagemUrl) return;
  abrirModal(`${cabecalhoJanela(escapeHtml(q.imagemLegenda||"Imagem da questão"))}
    <img src="${escapeHtml(src || q.imagemUrl)}" style="width:100%;border-radius:var(--radius-sm)" alt="">`, "lg");
}
function renderReferenciasQuestao(q){
  if(!q.referencias) return "";
  return `<div class="card-flat mt-2 text-xs"><strong>Referências consultadas:</strong> ${escapeHtml(q.referencias)}</div>`;
}
/* AUTORIA. A questão que um ALUNO enviou diz quem a enviou: quem estuda por
   ela sabe de quem é o trabalho (e a quem agradecer ou perguntar), e o aluno
   ganha o crédito. A de equipe, a da pasta dados/ e a didática não levam
   nome — são do material oficial. O papel de quem enviou vai junto com a
   questão (autorPapel), porque, com a nuvem, o navegador de cada pessoa só
   conhece o próprio cadastro; sem ele a questão de antes dessa regra, vinda
   de outro aparelho, não tem como dizer se o autor era aluno e fica sem nome. */
function autoriaDaQuestao(q){
  if(!q || !q.criadoPor || q.criadoPor === "seed" || questaoDaSemente(q.id)) return null;
  const autor = getUsuario(q.criadoPor);
  const papel = (autor && autor.papel) || q.autorPapel;
  const nome = (autor && autor.nome) || q.autorNome;
  return papel === "aluno" && nome ? nome : null;
}
function badgeAutoriaQuestao(q){
  const nome = autoriaDaQuestao(q);
  return nome ? `<span class="badge badge-muted" title="Questão enviada por um aluno">Enviada por ${escapeHtml(nome)}</span>` : "";
}
function renderQuestionCard(q, opts){
  opts = opts || {};
  if(ehDissertativa(q)) return renderCartaoDissertativa(q, opts);
  const esp = getEspecialidade(q.especialidadeId), area = getArea(q.areaId);
  const dificuldade = calcularDificuldade(q);
  const corDificuldade = dificuldade<35 ? "badge-accent" : dificuldade<60 ? "badge-amber" : "badge-danger";
  // quantas vezes ESTA pessoa já errou a questão — fora do simulado, que
  // imita a prova e não dá pista nenhuma
  const eu = usuarioAtual();
  const errosAqui = (eu && !opts.modoSimulado) ? errosNaQuestao(eu.id, q.id) : 0;
  const escondida = !!(eu && !opts.modoSimulado && questaoOculta(eu.id, q.id));
  /* AS TAGS SÓ DEPOIS DE RESPONDER. Área, especialidade e assunto entregam o
     diagnóstico ("Pancreatite aguda" logo acima do enunciado), a dificuldade
     e o número de erros anteriores dão pista da alternativa. Enquanto a
     questão está em aberto ficam só as tags de ORIGEM (banca, ano, tipo da
     prova), que dizem de onde a questão veio e não o que ela cobra. */
  const classificacao = opts.respondida ? `
      <span class="badge badge-accent">${escapeHtml(area?area.nome:"")}</span>
      <span class="qcard-trilha">${escapeHtml(esp?esp.nome:"")} › ${escapeHtml(nomeAssunto(q.assuntoId))}</span>` : "";
  const dicas = opts.respondida ? `
      <span class="badge ${corDificuldade}">${rotuloDificuldade(dificuldade)}</span>
      ${errosAqui ? `<span class="badge badge-danger" title="Quantas vezes você já errou esta questão">errada ${rotuloVezes(errosAqui)}</span>` : ""}
      ${escondida ? `<span class="badge badge-muted" title="Você escondeu esta questão: ela não entra mais nas suas sessões">escondida</span>` : ""}` : "";
  let html = `<div class="qcard">
    <div class="qcard-meta">${classificacao}
      <span class="qcard-trilha">${escapeHtml(q.banca)} · ${q.ano}${q.numeroNaProva ? ` · questão ${q.numeroNaProva}` : ""}</span>
      ${badgeAutoriaQuestao(q)}
      ${q.real && tipoProvaDe(q)==="graduacao" ? `<span class="badge badge-amber" title="${escapeHtml(infoTipoProva("graduacao").descricao)}">Prova da graduação</span>` : ""}${dicas}
      ${(q.banca||"").indexOf("Didático")>=0
        ? '<span class="badge badge-accent" title="Questão autoral de construção de conhecimento: cobra o conceito de base antes do caso complexo">Didática</span>'
        : (!q.real ? '<span class="badge badge-muted" title="Questão original escrita para esta demonstração, no estilo e nível da banca">Demonstração</span>' : "")}
    </div>
    <!-- aqui o enunciado já aparece inteiro, então ele não vira link para
         "ver na íntegra": abrir uma janela com o mesmo texto não acrescenta
         nada. O enunciado clicável continua valendo nas LISTAS, onde o texto
         aparece cortado. A imagem vem DEPOIS do enunciado: é ele que diz o
         que olhar nela (o ECG, a radiografia), e a figura logo no topo
         chegava antes da pergunta. -->
    <div class="qcard-enunciado" ${atributoDestacavel(alvoDeQuestao(q.id,"enunciado"))}>${htmlComDestaques(q.enunciado, alvoDeQuestao(q.id,"enunciado"))}</div>
    ${renderImagemQuestao(q)}
    <div class="qcard-alts">
      ${(()=>{
        const eliminadas = eliminadasDaQuestao(q.id);
        // só dá para riscar enquanto a questão está em aberto: depois de
        // respondida os riscos viram registro do que a pessoa pensou, não
        // mais rascunho editável
        const podeRiscar = !opts.respondida && !opts.somenteLeitura;
        return q.alternativas.map(alt=>{
          const riscada = eliminadas.includes(alt.id);
          let classe = "qcard-alt";
          let onclickAttr = "";
          if(riscada) classe += " eliminada";
          if(opts.respondida){
            classe += " disabled";
            if(alt.id===q.gabarito) classe += " correct";
            else if(alt.id===opts.selecionada) classe += " incorrect";
          } else {
            if(alt.id===opts.selecionada) classe += " selected";
            onclickAttr = opts.modoSimulado ? ` onclick="selecionarAlternativaSimulado('${alt.id}')"` : ` onclick="selecionarAlternativa('${alt.id}')"`;
          }
          const botaoRiscar = podeRiscar
            ? `<button class="alt-cortar" title="${riscada?"Trazer a alternativa de volta":"Eliminar esta alternativa"}" aria-label="${riscada?"Trazer a alternativa "+alt.id+" de volta":"Eliminar a alternativa "+alt.id}" onclick="event.stopPropagation();alternarAlternativaEliminada('${alt.id}')">${iconeSvg("x")}</button>`
            : "";
          return `<div class="${classe}"${onclickAttr}><span class="alt-letter">${alt.id}</span><span class="alt-text" ${atributoDestacavel(alvoDeQuestao(q.id,"alt-"+alt.id))}>${htmlComDestaques(alt.texto, alvoDeQuestao(q.id,"alt-"+alt.id))}</span>${botaoRiscar}</div>`;
        }).join("");
      })()}
    </div>`;
  if(!opts.respondida){
    const nRiscadas = eliminadasDaQuestao(q.id).length;
    // uma linha só: o que falta fazer, o que o × faz e por que as tags esperam
    const dicaRiscar = comeco => opts.somenteLeitura ? "" :
      `<div class="text-xs muted mt-2">${comeco}${iconeSvg("eye-off")} Assunto, especialidade e dificuldade aparecem depois que você responder, para não entregar o diagnóstico. ${nRiscadas
        ? `${nRiscadas} alternativa(s) eliminada(s) — clique no × de novo para trazer de volta.`
        : "Use o × ao lado de cada alternativa para eliminar o que você já descartou."}</div>`;
    if(opts.modoSimulado){
      // no simulado (fora do modo aprendizado): sem confiança e sem feedback imediato — só marca e segue
      html += dicaRiscar("");
    } else {
    html += opts.selecionada ? `
      <div class="confidence-row">
        <button class="confidence-btn" onclick="confirmarResposta('certeza')">Certeza</button>
        <button class="confidence-btn" onclick="confirmarResposta('duvida')">Na dúvida</button>
        <button class="confidence-btn" onclick="confirmarResposta('chute')">Chute</button>
      </div>
      <div class="text-xs muted mt-1">Sua confiança ajuda a plataforma a saber quando esta questão deve voltar para revisão.</div>` : "";
    html += dicaRiscar(opts.selecionada ? "" : "Selecione uma alternativa para continuar. ");
    }
  } else {
    html += renderFeedbackQuestao(q, opts);
  }
  html += "</div>";
  return html;
}
function renderFeedbackQuestao(q, opts){
  const correta = opts.selecionada === q.gabarito;
  let html = `<div class="feedback-box ${correta?"ok":"no"}"><strong>${correta?"Resposta correta.":"Resposta incorreta."}</strong> Gabarito: ${q.gabarito}.<br><span ${atributoDestacavel(alvoDeQuestao(q.id,"explicacao"))}>${htmlComDestaques(q.explicacaoGeral, alvoDeQuestao(q.id,"explicacao"), true)}</span>`;
  if(q.explicacoesAlternativas && q.explicacoesAlternativas[opts.selecionada] && opts.selecionada!==q.gabarito){
    html += `<br><br><em>Sobre a alternativa que você marcou:</em> <span ${atributoDestacavel(alvoDeQuestao(q.id,"explicacao-alt"))}>${htmlComDestaques(q.explicacoesAlternativas[opts.selecionada], alvoDeQuestao(q.id,"explicacao-alt"), true)}</span>`;
  }
  html += `</div>`;
  // Riscar a alternativa certa é um erro diferente de escolher a errada: a
  // pessoa não hesitou entre duas, ela descartou a resposta. Vale dizer isso.
  const riscadas = eliminadasDaQuestao(q.id);
  if(riscadas.length){
    html += riscadas.includes(q.gabarito)
      ? `<div class="card-flat mt-2 text-xs borda-alerta">${iconeSvg("alert")} Você tinha <strong>eliminado a alternativa ${escapeHtml(q.gabarito)}</strong>, que era a correta. Vale reler a explicação olhando para o motivo que fez você descartá-la — é ali que está a lacuna.</div>`
      : `<div class="card-flat mt-2 text-xs muted">${iconeSvg("check")} Você eliminou ${riscadas.length} alternativa(s) e nenhuma delas era a correta.</div>`;
  }
  return html + renderRodapeDaQuestaoRespondida(q);
}
/* O que vem depois do gabarito e da explicação, na múltipla escolha e na
   dissertativa: quantas vezes errou, aviso de questão anulada, referências,
   ações e comentários. */
function renderRodapeDaQuestaoRespondida(q){
  let html = "";
  const historicoDaQuestao = respostasDaQuestao(usuarioAtual().id, q.id);
  const totalErros = historicoDaQuestao.filter(r=>!r.correta).length;
  if(totalErros){
    // o número de erros é o que importa aqui: a mesma questão errada três
    // vezes é lacuna, não distração. Tirá-la da frente só é oferecido a
    // partir do segundo erro (podeEsconderQuestao): no primeiro, ela ainda
    // está ensinando.
    const oculta = questaoOculta(usuarioAtual().id, q.id);
    const podeEsconder = podeEsconderQuestao(usuarioAtual().id, q.id);
    html += `<div class="card-flat mt-2 text-xs borda-perigo">
      <div>${iconeSvg("alert")} Você já errou esta questão <strong>${rotuloVezes(totalErros)}</strong>${historicoDaQuestao.length>1 ? ` em ${historicoDaQuestao.length} tentativas` : ""}.${oculta ? " Ela está escondida: não volta mais nas suas sessões." : ""}${podeEsconder ? "" : " Ela volta na revisão espaçada; se você errar de novo, poderá pedir para não vê-la mais."}</div>
      ${podeEsconder ? `<button class="btn btn-ghost btn-sm mt-1" onclick="alternarQuestaoOcultaUI('${q.id}')">${iconeSvg(oculta?"eye":"eye-off")} ${oculta ? "Voltar a mostrar esta questão" : "Não mostrar mais esta questão para mim"}</button>` : ""}
    </div>`;
  }else if(historicoDaQuestao.length>1){
    html += `<div class="card-flat mt-2 text-xs muted">${iconeSvg("clock")} Histórico nesta questão: ${historicoDaQuestao.length} tentativas, nenhum erro.</div>`;
  }
  if(q.status==="anulada" || q.status==="desatualizada"){
    html += `<div class="feedback-box" style="background:var(--amber-soft);border:1px solid var(--amber)"><strong>${iconeSvg("alert")} Atenção:</strong> ${q.status==="anulada"?"esta questão foi anulada.":"esta questão está marcada como desatualizada."} ${escapeHtml(q.motivoStatus||"")} Ela não entra nas suas estatísticas nem em novas sessões.</div>`;
  }
  html += renderReferenciasQuestao(q);
  html += renderAcoesQuestao(q);
  html += renderComentarios(q.id);
  return html;
}
function renderAcoesQuestao(q){
  const uidAtual = usuarioAtual().id;
  const fav = isFavorita(uidAtual, q.id);
  // sem botão de "expandir": estas ações só aparecem embaixo da questão já
  // aberta por inteiro (enunciado, alternativas, gabarito e explicação), então
  // não há mais nada para expandir.
  const nota = notaDaFavorita(uidAtual, q.id);
  return `<div class="qcard-actions">
    <button class="btn btn-secondary btn-sm" onclick="toggleFavoritoUI('${q.id}')">${iconeSvg("star")} ${fav?"Remover dos favoritos":"Favoritar"}</button>
    <button class="btn btn-secondary btn-sm" onclick="abrirNotaFavorita('${q.id}')">${iconeSvg("message")} ${nota?"Editar minha anotação":"Anotar uma dúvida"}</button>
    <button class="btn btn-secondary btn-sm" onclick="abrirFormularioFlashcard(null,{questaoId:'${q.id}'})">${iconeSvg("cards")} Virar flashcard</button>
    ${podeEsconderQuestao(uidAtual, q.id) ? `<button class="btn btn-secondary btn-sm" onclick="alternarQuestaoOcultaUI('${q.id}')">${iconeSvg(questaoOculta(uidAtual, q.id)?"eye":"eye-off")} ${questaoOculta(uidAtual, q.id)?"Voltar a mostrar":"Não mostrar mais"}</button>` : ""}
    <button class="btn btn-secondary btn-sm" onclick="abrirSinalizarDesatualizada('${q.id}')">${iconeSvg("flag")} Sinalizar desatualizada</button>
    <button class="btn btn-secondary btn-sm" onclick="abrirPromptDuvida('${q.id}')">${iconeSvg("message")} Tirar dúvida com IA</button>
  </div>
  ${nota ? `<div class="nota-pessoal mt-2"><div class="nota-pessoal-titulo">${iconeSvg("message")} Minha anotação</div><div class="text-sm">${escapeHtml(nota)}</div></div>` : ""}
  ${cartoesDaQuestao(uidAtual, q.id).length ? `<div class="text-xs muted mt-1">${iconeSvg("cards")} Você já tem ${cartoesDaQuestao(uidAtual, q.id).length} cartão(ões) escrito(s) a partir desta questão.</div>` : ""}`;
}
/* Cartões pessoais que o usuário criou a partir de uma questão específica. */
function cartoesDaQuestao(usuarioId, questaoId){
  return (db.flashcards||[]).filter(c=>c.status!=="arquivado" && c.usuarioId===usuarioId && c.questaoOrigemId===questaoId);
}
function alternarQuestaoOcultaUI(qid){
  if(!podeEsconderQuestao(usuarioAtual().id, qid)){
    toast("Você só pode pedir para não ver mais uma questão depois de errá-la "+CONFIG.errosParaEsconderQuestao+" vezes.", "err");
    return;
  }
  const escondeu = alternarQuestaoOculta(usuarioAtual().id, qid);
  toast(escondeu
    ? "Questão escondida: ela não volta nas suas sessões, revisões e listas. Para trazê-la de volta, vá em Favoritos > Retiradas da revisão."
    : "A questão voltou a aparecer no seu estudo.");
  render();
}
function toggleFavoritoUI(qid){ const ficou = toggleFavorito(usuarioAtual().id, qid); toast(ficou?"Adicionado aos favoritos.":"Removido dos favoritos."); render(); }
function toggleFavoritoCartaoUI(cid){
  const ficou = toggleFavoritoCartao(usuarioAtual().id, cid);
  toast(ficou?"Cartão salvo em Favoritos.":"Cartão removido dos favoritos.");
  render();
}

/* ---------- anotar uma dúvida na questão salva ---------- */
function abrirNotaFavorita(qid){
  const u = usuarioAtual(); if(!u) return;
  const q = getQuestao(qid); if(!q) return;
  const nota = notaDaFavorita(u.id, qid);
  const jaEra = isFavorita(u.id, qid);
  abrirModal(`
    ${cabecalhoJanela(`${iconeSvg("message")} Minha anotação nesta questão`)}
    <p class="text-sm muted">É só sua: ninguém mais vê, nem a coordenação. Serve para guardar a dúvida que ficou — "por que não é a C?", "conferir a dose", "revisar antes da prova". Ela aparece junto da questão em Favoritos e sobe para a nuvem com a sua conta.</p>
    ${jaEra ? "" : '<p class="text-xs muted mt-1">Esta questão ainda não estava salva. Ao anotar, ela entra nos seus favoritos.</p>'}
    <div class="text-xs muted mt-2">${escapeHtml(q.enunciado.slice(0,150))}${q.enunciado.length>150?"…":""}</div>
    <div class="field mt-2">
      <label class="label">Anotação</label>
      <textarea class="textarea" id="notaFavoritaTexto" placeholder="Ex.: entendi o gabarito, mas não sei descartar a alternativa C — conferir critério de gravidade.">${escapeHtml(nota)}</textarea>
    </div>
    <div class="flex gap-1">
      <button class="btn btn-primary" onclick="salvarNotaFavoritaUI('${qid}')">Salvar anotação</button>
      ${nota ? `<button class="btn btn-secondary" onclick="apagarNotaFavoritaUI('${qid}')">Apagar anotação</button>` : ""}
      <button class="btn btn-ghost" onclick="fecharModalComConfirmacao()">Cancelar</button>
    </div>
    ${(!jaEra && !nota) ? "" : '<p class="text-xs muted mt-2">Tirar a questão dos favoritos apaga a anotação junto.</p>'}`);
}
function salvarNotaFavoritaUI(qid){
  const campo = document.getElementById("notaFavoritaTexto");
  const texto = campo ? campo.value : "";
  const r = salvarNotaFavorita(usuarioAtual().id, qid, texto);
  fecharModal();
  toast(r.apagou ? "Anotação apagada." : (r.novaFavorita ? "Anotação salva — a questão entrou nos seus favoritos." : "Anotação salva."));
  render();
}
function apagarNotaFavoritaUI(qid){
  salvarNotaFavorita(usuarioAtual().id, qid, "");
  fecharModal();
  toast("Anotação apagada. A questão continua nos favoritos.");
  render();
}

/* ---------- comentários / dúvidas em cada questão ----------
   Com a nuvem ligada, o comentário sobe para a tabela `comentarios` e chega
   a todo mundo — é o que faz a dúvida do aluno aparecer na Fila de Dúvidas
   do residente, que antes só existia no navegador de quem escreveu. O nome
   de quem escreveu vai junto (autorNome), porque ninguém enxerga o perfil
   dos outros. Remover não apaga: marca `removido`, para a remoção também
   viajar. */
function comentariosAtivos(){ return (db.comentarios || []).filter(c => !c.removido); }
function nomeAutorComentario(c){ const a = getUsuario(c.usuarioId); return (a && a.nome) || c.autorNome || "Usuário"; }
function registrarComentario(questaoId, texto, oficial){
  const u = usuarioAtual();
  const c = { id: uid("com"), questaoId, usuarioId: u.id, autorNome: u.nome || "", papelAutor: u.papel, texto, data: hojeISO(), respostaOficial: !!oficial };
  db.comentarios.push(c);
  nuvemMarcarGlobalPendente("comentarios", c.id);
  saveState();
  return c;
}
function podeRemoverComentario(c){
  const u = usuarioAtual();
  return !!u && (c.usuarioId === u.id || u.papel === "professor" || u.papel === "admin");
}
function removerComentario(id){
  const c = (db.comentarios || []).find(x => x.id === id); if(!c || !podeRemoverComentario(c)) return;
  if(!confirm("Remover este comentário? Ele some para todo mundo.")) return;
  c.removido = true;
  nuvemMarcarGlobalPendente("comentarios", c.id);
  saveState(); toast("Comentário removido."); render();
}
function renderComentarios(questaoId){
  const comentarios = comentariosAtivos().filter(c=>c.questaoId===questaoId).sort((a,b)=>a.data.localeCompare(b.data));
  return `<div class="mt-3" style="border-top:1px solid var(--border);padding-top:1rem">
    <div style="font-weight:600;font-size:.9rem;margin-bottom:.6rem">${iconeSvg("message")} Comentários e dúvidas (${comentarios.length})</div>
    ${comentarios.map(c=>{
      return `<div class="card-flat mb-1" ${c.respostaOficial?'style="border-color:var(--accent)"':""}>
        <div class="flex items-center gap-1"><span class="text-sm peso-600">${escapeHtml(nomeAutorComentario(c))}</span>${badgePapel(c.papelAutor)}${c.respostaOficial?'<span class="badge badge-accent">Resposta oficial</span>':""}</div>
        <div class="text-sm mt-1">${escapeHtml(c.texto)}</div>
        <div class="text-xs muted mt-1">${formatDataBR(c.data)}${podeRemoverComentario(c) ? ` · <button class="link-btn text-xs" onclick="removerComentario('${c.id}')">remover</button>` : ""}</div>
      </div>`;
    }).join("") || '<div class="text-sm muted">Nenhum comentário ainda. Seja o primeiro a comentar.</div>'}
    <div class="mt-2">
      <textarea class="textarea" id="novoComentario-${questaoId}" placeholder="Escreva um comentário ou dúvida sobre esta questão..." style="min-height:70px"></textarea>
      <button class="btn btn-secondary btn-sm mt-1" onclick="enviarComentario('${questaoId}')">Enviar comentário</button>
    </div>
  </div>`;
}
function enviarComentario(questaoId){
  const el = document.getElementById("novoComentario-"+questaoId);
  const texto = el.value.trim(); if(!texto) return;
  const u = usuarioAtual();
  registrarComentario(questaoId, texto, (u.papel==="professor"||u.papel==="residente"||u.papel==="admin") && !state.modoAluno);
  toast(nuvemConectado() ? "Comentário enviado — ele chega à turma e à fila de dúvidas." : "Comentário enviado."); render();
}
// se o usuário (professor/residente) tiver áreas de atuação definidas,
// restringe o que ele vê a essas áreas; sem áreas definidas, vê tudo
// (mantém o comportamento das contas de demonstração, que não têm isso)
function dentroDaAreaDeAtuacao(usuario, areaId){
  return !usuario.areasAtuacao || !usuario.areasAtuacao.length || usuario.areasAtuacao.includes(areaId);
}
/* ---------- regra das grandes áreas de professor/residente ----------------
   Teto de CONFIG.maxAreasAtuacao áreas, sendo no máximo UMA clínica; a
   Preventiva (CONFIG.areaTransversalId) é a única que pode ser somada. As
   funções abaixo são a fonte única dessa regra: o formulário de cadastro, a
   validação do envio e a migração de contas antigas (loadState) usam todas
   elas — mudar o teto é mexer só no CONFIG. */
function ehAreaTransversal(areaId){ return areaId === CONFIG.areaTransversalId; }
function areasClinicas(areas){ return (areas||[]).filter(a=>!ehAreaTransversal(a)); }
function validarAreasAtuacao(areas){
  areas = [...new Set((areas||[]).filter(Boolean))];
  if(!areas.length) return {ok:false, msg:"Selecione pelo menos uma grande área de atuação."};
  if(areas.length > CONFIG.maxAreasAtuacao) return {ok:false, msg:"São no máximo "+CONFIG.maxAreasAtuacao+" grandes áreas por pessoa."};
  if(areasClinicas(areas).length > 1){
    return {ok:false, msg:"Escolha uma única grande área clínica. A segunda vaga é de "+nomeArea(CONFIG.areaTransversalId)+", que é transversal e pode ser somada a qualquer uma."};
  }
  return {ok:true};
}
// devolve a seleção já dentro da regra: mantém a primeira área clínica e, se
// houver, a Preventiva. Serve à migração de cadastros feitos antes da regra.
function normalizarAreasAtuacao(areas){
  areas = [...new Set((areas||[]).filter(Boolean))];
  return [areasClinicas(areas)[0], areas.find(ehAreaTransversal)].filter(Boolean);
}
// um professor não pode se oferecer para responder dúvida de área que não cobre
function assuntosAjudaDentroDasAreas(assuntos, areas){
  return (assuntos||[]).filter(id=>{
    const e = getEspecialidade(id);
    return e && (areas||[]).includes(e.areaId);
  });
}
function duvidasPendentes(usuario){
  // uma dúvida é considerada "pendente" se, entre os comentários daquela questão
  // feitos por um aluno, nenhum comentário oficial posterior a ela responde
  const todos = comentariosAtivos();
  const deAlunos = todos.filter(c=>!c.respostaOficial);
  let pendentes = deAlunos.filter(c=>{
    return !todos.some(r=>r.questaoId===c.questaoId && r.respostaOficial && r.data>=c.data);
  });
  if(usuario) pendentes = pendentes.filter(c=>{ const q=getQuestao(c.questaoId); return q && dentroDaAreaDeAtuacao(usuario, q.areaId); });
  return pendentes;
}

/* ---------- sinalizar questão desatualizada ---------- */
function abrirSinalizarDesatualizada(qid){
  abrirModal(`
    ${cabecalhoJanela("Sinalizar questão")}
    <p class="text-sm muted">Isso avisa a coordenação para revisar a questão. Ela continua disponível normalmente até que um professor ou administrador confirme a alteração.</p>
    <div class="field mt-2"><label class="label">O que parece desatualizado ou incorreto? (opcional)</label><textarea class="textarea" id="motivoSinalizacao" placeholder="Ex.: a diretriz citada mudou em 2025..."></textarea></div>
    <div class="flex gap-1"><button class="btn btn-primary" onclick="confirmarSinalizacao('${qid}')">Enviar sinalização</button><button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button></div>`);
}
function confirmarSinalizacao(qid){
  const q = getQuestao(qid);
  if(!q.sinalizacoes) q.sinalizacoes = [];
  q.sinalizacoes.push({usuarioId:usuarioAtual().id, data:hojeISO(), comentario:(document.getElementById("motivoSinalizacao").value||"").trim()});
  saveState(); fecharModal();
  toast("Sinalização enviada. Obrigado — isso ajuda a manter o banco de questões confiável.");
}

/* ---------- o padrão de justificativa: parâmetro objetivo em destaque ----------
   Quando o que decide o diagnóstico ou a conduta é um número (sinal vital,
   exame, medida de imagem, tempo, dose, idade-limite, escore), a explicação
   tem de mostrar o número, o valor normal ou esperado e o ponto de corte que
   muda a conduta — não só dizer "está alterado". Esta é a ÚNICA definição
   dessa regra: o prompt de importação/transcrição (12a, 12b) e o de tirar
   dúvida com IA (abaixo) usam este mesmo texto, para uma IA responder a
   questão do mesmo jeito em qualquer caminho. Na tela, os "**" viram o
   realce do parâmetro (separarEnfase, seção 11-B). */
function regraDeParametrosObjetivos(){
  return "QUANDO A CONDUTA OU O DIAGNÓSTICO DEPENDE DE UM PARÂMETRO OBJETIVO (sinal vital, exame laboratorial, medida de imagem, tempo, dose, idade-limite ou escore):\n"+
  "- Destaque o parâmetro entre dois asteriscos, já com o valor do caso: **PAS 82 mmHg**, **Glasgow 8**, **CURB-65 = 3**, **TSH 12 mUI/L**.\n"+
  "- Ao lado, diga o valor normal ou esperado (ou o alvo terapêutico), com a unidade: \"(normal: 90–120 mmHg)\".\n"+
  "- Diga o ponto de corte que muda a conduta e o que ele muda: \"< 90 mmHg define choque → expansão volêmica\".\n"+
  "- Se houver escore validado (Glasgow, APGAR, CURB-65, qSOFA, Wells, CHA2DS2-VASc, HAS-BLED, Child-Pugh, MELD, Alvarado, Ranson, Bishop, Framingham etc.), calcule-o para o caso apresentado, mostre a soma item a item e a faixa de risco ou a conduta que ele indica.\n"+
  "- Os valores de referência e os pontos de corte são os da diretriz citada em REFERENCIAS; se o valor muda com idade, sexo, gestação ou método do laboratório, diga para qual população vale. Se você não tiver certeza do número, diga que não tem, em vez de inventar.\n"+
  "- Use os asteriscos só nesses parâmetros (poucos por explicação; nunca em títulos nem em palavras comuns). Se a questão não depende de nenhum parâmetro objetivo, explique normalmente, sem asteriscos.\n";
}

/* ---------- prompt pronto para tirar dúvida com uma IA ---------- */
function gerarPromptDuvida(q){
  if(ehDissertativa(q)) return "Aja como um médico revisor especialista em provas de residência médica no Brasil.\n\n"+
    "Analise CRITICAMENTE a questão dissertativa abaixo, com base em diretrizes e fontes primárias atuais, e diga se a resposta esperada está correta, completa e atualizada.\n\n"+
    "--- QUESTÃO ("+q.banca+", "+q.ano+") ---\n"+q.enunciado+"\n\nResposta esperada pela banca: "+(q.respostaEsperada||"(não informada)")+"\nJustificativa atual da plataforma: "+q.explicacaoGeral+"\n--- FIM DA QUESTÃO ---\n\n"+
    "Responda de forma estruturada:\n1) A resposta esperada está correta e completa? O que falta ou está desatualizado?\n2) Quais pontos uma resposta de nota máxima precisa trazer?\n3) Quais diretrizes/referências (com nome e, se souber, ano) sustentam isso?\n\n"+
    regraDeParametrosObjetivos();
  const alts = q.alternativas.map(a=>a.id+") "+a.texto).join("\n");
  return "Aja como um médico revisor especialista em questões de concursos de residência médica no Brasil.\n\n"+
  "Analise CRITICAMENTE a questão abaixo. Baseie-se em evidências científicas atuais e em fontes primárias: diretrizes e consensos de sociedades de especialidade, protocolos e PCDT do Ministério da Saúde, revisões sistemáticas e artigos originais. NÃO use nem reproduza resoluções de sites de questões, bancos comerciais ou cursinhos. NÃO invente referências ou dados — se não souber ou não tiver certeza de algo, diga isso explicitamente em vez de arriscar uma resposta incorreta.\n\n"+
  "Considere também a possibilidade de a questão estar mal formulada, ambígua, desatualizada, ou de o gabarito considerado estar incorreto — isso acontece de verdade em provas de residência e costuma gerar recursos administrativos.\n\n"+
  "--- QUESTÃO ("+q.banca+", "+q.ano+") ---\n"+q.enunciado+"\n\nAlternativas:\n"+alts+"\n\n"+
  "Gabarito considerado correto pela plataforma: "+q.gabarito+"\nExplicação atual da plataforma: "+q.explicacaoGeral+"\n--- FIM DA QUESTÃO ---\n\n"+
  "Responda de forma estruturada:\n"+
  "1) Você concorda com o gabarito? Justifique clinicamente.\n"+
  "2) Há alguma ambiguidade, erro ou desatualização na questão ou nas alternativas? Se sim, qual e por quê?\n"+
  "3) Quais diretrizes/referências (com nome e, se souber, ano) sustentam a resposta correta?\n"+
  "4) Percorra TODAS as alternativas incorretas, uma por uma, na ordem (A, B, C...), e explique por que cada uma está errada. "+
  "Em cada uma, comece pelo que o PRÓPRIO ENUNCIADO diz: cite o dado do caso que a descarta — idade, sexo, tempo de evolução, "+
  "sinal ou sintoma presente ou ausente, achado de exame físico, resultado de exame, comorbidade, medicação em uso, contexto "+
  "epidemiológico. Diga o que teria de ser diferente no enunciado para aquela alternativa passar a ser a correta. "+
  "Quando a alternativa estiver errada por conhecimento que não vem do caso (uma dose errada, uma conduta que não existe, um "+
  "conceito trocado), diga isso explicitamente, em vez de forçar uma justificativa que o enunciado não sustenta.\n"+
  "5) Aponte a pegadinha da questão: qual alternativa é a \"quase certa\", o que a torna atraente e qual detalhe do enunciado a derruba.\n"+
  "6) Parâmetros objetivos: se a conduta ou o diagnóstico depende de um número, siga o padrão abaixo (é o mesmo das explicações da plataforma).\n\n"+
  regraDeParametrosObjetivos();
}
function abrirPromptDuvida(qid){
  const prompt = gerarPromptDuvida(getQuestao(qid));
  abrirModal(`
    ${cabecalhoJanela("Prompt para tirar dúvida com uma IA")}
    <p class="text-sm muted mb-2">Copie o texto abaixo e cole em qualquer assistente de IA (Claude, ChatGPT, Gemini...) para obter uma segunda opinião, com evidências, sobre esta questão.</p>
    <textarea class="textarea textarea-mono" style="min-height:280px" readonly id="promptDuvidaTexto">${escapeHtml(prompt)}</textarea>
    <div class="flex gap-1 mt-2">
      <button class="btn btn-primary" onclick="copiarTexto(document.getElementById('promptDuvidaTexto').value,'Prompt copiado! Cole em uma IA de sua confiança.')">${iconeSvg("search")} Copiar prompt</button>
      <button class="btn btn-secondary" onclick="fecharModal()">Fechar</button>
    </div>`, "lg");
}
/* ---------------------------- SEED_SIMULADOS ------------------------------
   As provas montadas pela equipe moram em dados/simulados-equipe.js — um
   simulado é uma lista de ids de questão, um tempo e, se quiser, o bloco do
   calendário para o qual ele é recomendado.
   Simulado montado por um professor pela tela Criar Simulado nasce no
   navegador dele; levar para aquele arquivo é o que o torna de todo mundo. */
const SEED_SIMULADOS = (window.EscDados && window.EscDados.simulados) || [];

/* ==========================================================================
   12. REVISÃO (visão por assunto + fila de erros/chutes)
   ========================================================================== */
function renderRevisao(){
  const u = usuarioAtual();
  const assuntos = assuntosParaRevisarHoje(u.id);
  const erros = questoesErroOrdenadasPorAntiguidade(u.id);
  const partesEspacada = partesDaRevisaoEspacada(u.id);
  const naoVistas = partesEspacada.novas.length;
  const porDecaimento = partesEspacada.decaimentos.length;
  const porErro = partesEspacada.erros.length;
  const totalEspacada = naoVistas + porErro + porDecaimento;
  const errosComCerteza = questoesErroComCerteza(u.id);
  const acertosNoChute = questoesAcertoNoChute(u.id);
  const errosNaDuvida = questoesErroNaDuvida(u.id);
  const falsaSeguranca = assuntosComFalsaSeguranca(u.id);
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
    ${assuntos.length ? `<div class="table-wrap mt-2"><table><thead><tr><th>Assunto</th><th>Taxa recente</th><th>Atraso</th><th></th></tr></thead><tbody>
      ${assuntos.map(a=>`<tr><td>${escapeHtml(nomeAssunto(a.assuntoId))}</td><td>${Math.round(a.taxa*100)}%</td><td>${a.atrasoDias} dia(s)</td><td><button class="btn btn-secondary btn-sm" onclick="praticarAssunto('${a.assuntoId}')">Praticar</button></td></tr>`).join("")}
    </tbody></table></div>` : '<p class="text-sm muted mt-1">Nenhum assunto vencido hoje — em dia com a revisão.</p>'}
  </div>
  <div class="card mt-2">
    <div class="card-title">Filas por tipo de erro</div>
    <p class="text-sm muted mb-2">Nem todo erro é igual. Errar achando que sabia é o mais caro, porque você não voltaria a esse assunto por conta própria. Acertar no chute é o oposto do que parece: conta como não sabido.</p>
    <div class="grid grid-3">
      <div class="card-flat">
        <div class="peso-600">Errou com certeza <span class="badge badge-danger">${errosComCerteza.length}</span></div>
        <p class="text-xs muted mt-1">Conceito consolidado de forma errada. Prioridade máxima.</p>
        <button class="btn btn-primary btn-sm mt-2" onclick="praticarFilaDeConfianca('certeza')" ${!errosComCerteza.length?"disabled":""}>Praticar</button>
      </div>
      <div class="card-flat">
        <div class="peso-600">Acertou no chute <span class="badge badge-amber">${acertosNoChute.length}</span></div>
        <p class="text-xs muted mt-1">A estatística diz acerto, mas você não sabia. Volta como se tivesse errado.</p>
        <button class="btn btn-secondary btn-sm mt-2" onclick="praticarFilaDeConfianca('chute')" ${!acertosNoChute.length?"disabled":""}>Praticar</button>
      </div>
      <div class="card-flat">
        <div class="peso-600">Errou na dúvida <span class="badge badge-muted">${errosNaDuvida.length}</span></div>
        <p class="text-xs muted mt-1">Você já sabia que não sabia — aqui falta conteúdo, não calibração.</p>
        <button class="btn btn-secondary btn-sm mt-2" onclick="praticarFilaDeConfianca('duvida')" ${!errosNaDuvida.length?"disabled":""}>Praticar</button>
      </div>
    </div>
    ${falsaSeguranca.length ? `<div class="mt-2">
      <div class="text-sm peso-600">Assuntos em que sua confiança não bate com o acerto</div>
      ${falsaSeguranca.slice(0,5).map(f=>`<div class="flex justify-between items-center card-flat mb-1">
        <span class="text-sm">${escapeHtml(nomeAssunto(f.assuntoId))} <span class="text-xs muted">— ${f.n} resposta(s) marcadas como "certeza"</span></span>
        <span class="flex items-center gap-1"><span class="badge badge-danger">${f.taxa}% de acerto</span><button class="btn btn-secondary btn-sm" onclick="praticarAssuntoFalsaSeguranca('${f.assuntoId}')">Praticar</button></span>
      </div>`).join("")}
    </div>` : ""}
  </div>
  <div class="card mt-2">
    <div class="card-title">Revisão rápida por flashcards (${resumoFlashcards(u.id).vencidos} vencido(s))</div>
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
    <button class="btn btn-secondary mt-2" onclick="iniciarRevisaoErros()" ${!erros.length?"disabled":""}>Revisar só erros</button>
  </div>
  <div class="card-flat mt-2 text-sm">
    <strong>Como funciona:</strong> cada questão tem seu próprio intervalo de revisão, que cresce quando você acerta com confiança e encolhe quando você erra ou chuta (mesmo acertando no chute), mas nunca abaixo de 1 semana. A revisão espaçada geral, acima, respeita isso pra TODAS as questões já respondidas — não só as erradas — porque até quem acerta esquece com o tempo, mas sem repetir o que você já domina: acerto seguro espera um mês e, depois de três, a questão sai da fila. Assuntos inteiros também têm um intervalo próprio, baseado na taxa de acerto das suas últimas respostas naquele assunto.
  </div>`;
}
/* As questões que a pessoa já errou, com quantas vezes cada uma — a
   mais errada primeiro. É aqui que se esconde em lote ("já entendi essas,
   não quero mais"); o que foi escondido volta em Favoritos > Retiradas da
   revisão. */
function renderCartaoQuestoesErradas(u){
  const erradas = questoesErradasPeloUsuario(u.id);
  const escondidas = questoesRetiradasDaRevisao(u.id);
  const pag = paginar(erradas, "revisao-erradas", {porPagina:10});
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
    </div>
    ${pag.itens.map(linha).join("")}
    ${controlesPaginacao(pag, "questão(ões) errada(s)")}` : '<p class="text-sm muted mt-1">Nenhuma questão errada fora das escondidas.</p>'}
  </div>
  <div class="card-flat mt-2 text-sm">${iconeSvg("eye-off")} As questões que você pediu para não ver mais (${escondidas.length}) ficam em <button class="link-btn" onclick="state.filtroRota.abaFavoritos='retiradas';navigate('favoritos')">Favoritos &gt; Retiradas da revisão</button>, junto do que você salvou para rever.</div>`;
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
function praticarAssunto(assuntoId){
  const pool = questoesParaEstudo(usuarioAtual().id).filter(q=>q.assuntoId===assuntoId);
  const itens = embaralharSemRepetir(usuarioAtual().id, pool).slice(0,15).map(q=>({questaoId:q.id, motivo:"Revisão do assunto: "+nomeAssunto(assuntoId)}));
  iniciarSessaoComLista(itens, "pratica");
}
