/* codigo/08-sessao-e-revisao.js — motor de sessão (seção 11: sessão do dia, barra de questões, cartão da questão); comentários e dúvidas estão em 08e; a tela de Revisão (seção 12) está em 08d.
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
  itens = semQuestoesRepetidas(itens.filter(it => !aguardaImagem(getQuestao(it.questaoId))));
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
  // setas e detalhe existem nos dois estados e o CSS os mostra/esconde: assim
  // alternarMapaSessao anima a MESMA barra em vez de trocar o HTML (o "pulo")
  return `<div class="barra-questoes${expandida ? " expandida" : ""}" id="${o.id}">
    <div class="barra-questoes-linha">
      <span class="barra-questoes-resumo" title="${escapeHtml(o.titulo || "")}">${o.feitas}/${o.total}</span>
      <button class="barra-questoes-seta" onclick="passarPelaBarra(-1)" aria-label="Questão anterior" title="Questão anterior (a barra acompanha)" ${expandida ? "tabindex=\"-1\"" : ""}>‹</button>
      <div class="barra-questoes-trilho" role="navigation" aria-label="Questões do conjunto">${o.pills}</div>
      <button class="barra-questoes-seta" onclick="passarPelaBarra(1)" aria-label="Próxima questão" title="Próxima questão (a barra acompanha)" ${expandida ? "tabindex=\"-1\"" : ""}>›</button>
      <button class="barra-questoes-expandir" onclick="alternarMapaSessao()" aria-expanded="${expandida}" title="${expandida ? "Recolher a barra" : "Expandir: ver todas as questões"}">${iconeSvg("chevron-d")}</button>
    </div>
    <div class="barra-questoes-detalhe"><div class="barra-questoes-detalhe-miolo">${o.detalhe || ""}</div></div>
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
/* Expandir/recolher sem redesenhar: a barra que já está na tela troca de
   classe e o trilho anima a altura do que tinha para a que passa a ter (o
   detalhe e as setas animam por CSS). Redesenhar trocava o HTML de uma vez,
   e a barra "pulava". */
function alternarMapaSessao(){
  state.mapaSessaoExpandido = !state.mapaSessaoExpandido;
  const expandida = state.mapaSessaoExpandido;
  const barra = document.querySelector(".barra-questoes");
  if(!barra){ render(); return; }
  const trilho = barra.querySelector(".barra-questoes-trilho");
  const antes = trilho.offsetHeight;
  barra.classList.toggle("expandida", expandida);
  const botao = barra.querySelector(".barra-questoes-expandir");
  botao.setAttribute("aria-expanded", String(expandida));
  botao.title = expandida ? "Recolher a barra" : "Expandir: ver todas as questões";
  barra.querySelectorAll(".barra-questoes-seta").forEach(b => { if(expandida) b.setAttribute("tabindex", "-1"); else b.removeAttribute("tabindex"); });
  if(!expandida) centralizarBarraDeQuestoes();
  const depois = trilho.scrollHeight;
  if(!window.matchMedia || window.matchMedia("(prefers-reduced-motion: reduce)").matches || antes === depois) return;
  trilho.style.overflow = "hidden";
  trilho.style.height = antes + "px";
  trilho.getBoundingClientRect(); // fixa o ponto de partida antes de animar
  trilho.style.transition = "height .26s ease";
  trilho.style.height = depois + "px";
  const fim = () => { trilho.style.height = trilho.style.transition = trilho.style.overflow = ""; trilho.removeEventListener("transitionend", fim); };
  trilho.addEventListener("transitionend", fim);
  setTimeout(fim, 400); // rede de segurança se o transitionend não vier
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
    return `<div class="stat-tile"><div class="stat-value" style="font-size:var(--fs-lg)">${c.n?pct(c.ok,c.n)+"%":"—"}</div><div class="stat-label">acerto quando ${rotulo} (${c.n} questão(ões))</div></div>`;
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
      <span class="qcard-trilha">${escapeHtml(q.banca)} · ${anoDaProva(q)}${q.numeroNaProva ? ` · questão ${q.numeroNaProva}` : ""}</span>
      ${badgeAutoriaQuestao(q)}
      ${q.real && tipoProvaDe(q)==="graduacao" ? `<span class="badge badge-accent" title="${escapeHtml(infoTipoProva("graduacao").descricao)}">Prova da graduação</span>` : ""}${dicas}
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

/* ---------------------------- SEED_SIMULADOS ------------------------------
   As provas montadas pela equipe moram em dados/simulados-equipe.js — um
   simulado é uma lista de ids de questão, um tempo e, se quiser, o bloco do
   calendário para o qual ele é recomendado.
   Simulado montado por um professor pela tela Criar Simulado nasce no
   navegador dele; levar para aquele arquivo é o que o torna de todo mundo. */
const SEED_SIMULADOS = (window.EscDados && window.EscDados.simulados) || [];
