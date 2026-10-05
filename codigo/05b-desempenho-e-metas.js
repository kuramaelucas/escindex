/* codigo/05b-desempenho-e-metas.js — Motor de estudos (seção 4), parte 2: desempenho (assunto, dia, mês, janela), calibração da confiança, metas de questões e de cartões, lembrete, o que mais cai e a nota estimada.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ---------- desempenho / sugestões / calibração de confiança ---------- */
function desempenhoPorAssunto(usuarioId){
  const porAssunto = {};
  db.respostas.filter(r=>r.usuarioId===usuarioId).forEach(r=>{
    (porAssunto[r.assuntoId] = porAssunto[r.assuntoId]||[]).push(r);
  });
  return Object.entries(porAssunto).map(([assuntoId, respostas])=>{
    respostas.sort((a,b)=>a.data.localeCompare(b.data));
    const total = respostas.length;
    const acertos = respostas.filter(r=>r.correta).length;
    // evolução: média móvel em blocos de até 3 respostas, para dar uma linha
    // de tendência mesmo com poucos dados (comum no início de uso)
    const tamanhoBloco = Math.max(1, Math.ceil(total/8));
    const evolucao = [];
    for(let i=0;i<total;i+=tamanhoBloco){
      const fatia = respostas.slice(i, i+tamanhoBloco);
      evolucao.push(pct(fatia.filter(r=>r.correta).length, fatia.length));
    }
    const revisao = proximaRevisaoAssunto(usuarioId, assuntoId);
    return {
      assuntoId, total, acertos, taxa: pct(acertos,total), evolucao,
      especialidadeId: especialidadeDeAssunto(assuntoId)?.id,
      areaId: areaDeAssunto(assuntoId)?.id,
      proximaRevisao: revisao ? revisao.proxima : null,
    };
  }).sort((a,b)=>a.taxa-b.taxa);
}
// agrega o desempenho por assunto nas 5 grandes áreas — sempre retorna as
// 5, mesmo sem nenhuma resposta ainda, pra dar uma visão completa
function desempenhoPorArea(usuarioId){
  const porAssunto = desempenhoPorAssunto(usuarioId);
  const acumulado = {};
  porAssunto.forEach(d=>{
    if(!d.areaId) return;
    if(!acumulado[d.areaId]) acumulado[d.areaId] = {total:0, acertos:0, assuntos:[]};
    acumulado[d.areaId].total += d.total;
    acumulado[d.areaId].acertos += d.acertos;
    acumulado[d.areaId].assuntos.push(d);
  });
  return db.taxonomia.areas.map(area=>{
    const info = acumulado[area.id] || {total:0, acertos:0, assuntos:[]};
    return {
      areaId: area.id, nome: area.nome, total: info.total, acertos: info.acertos,
      taxa: info.total ? pct(info.acertos, info.total) : null,
      assuntos: info.assuntos.sort((a,b)=>a.taxa-b.taxa),
    };
  });
}
/* ---------- desempenho recente, por dia e por mês -------------------------
   A tela de Meu Desempenho mostra quatro recortes de tempo, escolhidos pelo
   próprio aluno: últimos 14 dias, últimos 30 dias, últimos 12 meses e o ano
   corrente mês a mês.

   Dias sem estudo entram na lista com taxa `null` em vez de sumirem. Isso é
   proposital: um gráfico que pula os dias parados dá a impressão de rotina
   contínua que não existiu, e a constância é justamente o que essas janelas
   curtas deveriam revelar. */
function desempenhoPorDia(usuarioId, dias){
  const respostas = db.respostas.filter(r=>r.usuarioId===usuarioId);
  const porDia = {};
  respostas.forEach(r=>{
    if(!porDia[r.data]) porDia[r.data] = {total:0, acertos:0};
    porDia[r.data].total++;
    if(r.correta) porDia[r.data].acertos++;
  });
  const hoje = hojeISO();
  const lista = [];
  for(let i=dias-1; i>=0; i--){
    const data = somarDias(hoje, -i);
    const info = porDia[data] || {total:0, acertos:0};
    const d = new Date(data+"T00:00:00");
    lista.push({
      chave: data,
      label: String(d.getDate()).padStart(2,"0")+"/"+String(d.getMonth()+1).padStart(2,"0"),
      total: info.total, acertos: info.acertos,
      erros: info.total - info.acertos,
      taxa: info.total ? pct(info.acertos, info.total) : null,
    });
  }
  return lista;
}
const NOMES_MES_CURTO = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
/* modo "12meses": os 12 meses que terminam no mês atual (inclui o ano passado).
   modo "ano": de janeiro do ano corrente até o mês atual. */
function desempenhoPorMes(usuarioId, modo){
  const respostas = db.respostas.filter(r=>r.usuarioId===usuarioId);
  const porMes = {};
  respostas.forEach(r=>{
    const chave = r.data.slice(0,7); // AAAA-MM
    if(!porMes[chave]) porMes[chave] = {total:0, acertos:0};
    porMes[chave].total++;
    if(r.correta) porMes[chave].acertos++;
  });
  const hoje = new Date(hojeISO()+"T00:00:00");
  const anoAtual = hoje.getFullYear(), mesAtual = hoje.getMonth();
  const meses = [];
  if(modo==="ano"){
    for(let m=0; m<=mesAtual; m++) meses.push({ano:anoAtual, mes:m});
  }else{
    for(let i=11; i>=0; i--){
      const d = new Date(anoAtual, mesAtual-i, 1);
      meses.push({ano:d.getFullYear(), mes:d.getMonth()});
    }
  }
  return meses.map(({ano,mes})=>{
    const chave = ano+"-"+String(mes+1).padStart(2,"0");
    const info = porMes[chave] || {total:0, acertos:0};
    return {
      chave,
      label: NOMES_MES_CURTO[mes] + (modo==="ano" ? "" : "/"+String(ano).slice(2)),
      total: info.total, acertos: info.acertos,
      erros: info.total - info.acertos,
      taxa: info.total ? pct(info.acertos, info.total) : null,
    };
  });
}
/* Resumo de uma janela qualquer: soma o período inteiro e compara com a
   janela imediatamente anterior, do mesmo tamanho. A comparação é o que
   transforma o número em informação — 68% só quer dizer algo ao lado do
   que era antes. */
function resumoJanela(usuarioId, dias){
  const hoje = hojeISO();
  const inicio = somarDias(hoje, -(dias-1));
  const inicioAnterior = somarDias(hoje, -(2*dias-1));
  const fimAnterior = somarDias(hoje, -dias);
  const minhas = db.respostas.filter(r=>r.usuarioId===usuarioId);
  const noPeriodo = minhas.filter(r=>r.data>=inicio && r.data<=hoje);
  const anterior = minhas.filter(r=>r.data>=inicioAnterior && r.data<=fimAnterior);
  const taxa = noPeriodo.length ? pct(noPeriodo.filter(r=>r.correta).length, noPeriodo.length) : null;
  const taxaAnterior = anterior.length ? pct(anterior.filter(r=>r.correta).length, anterior.length) : null;
  const diasComEstudo = new Set(noPeriodo.map(r=>r.data)).size;
  return {
    dias, total: noPeriodo.length,
    acertos: noPeriodo.filter(r=>r.correta).length,
    erros: noPeriodo.filter(r=>!r.correta).length,
    taxa, taxaAnterior,
    variacao: (taxa!==null && taxaAnterior!==null) ? taxa-taxaAnterior : null,
    diasComEstudo,
    mediaPorDiaEstudado: diasComEstudo ? Math.round(noPeriodo.length/diasComEstudo) : 0,
  };
}

/* Desempenho somado de TODAS as questões respondidas pelo usuário, sem
   separar por área ou assunto — incluindo quantas questões distintas do
   banco ele já viu (cobertura) e como está o desempenho considerando
   apenas a última tentativa de cada questão. */
function desempenhoTotal(usuarioId){
  const respostas = db.respostas.filter(r=>r.usuarioId===usuarioId);
  const total = respostas.length;
  const acertos = respostas.filter(r=>r.correta).length;
  const distintas = [...new Set(respostas.map(r=>r.questaoId))];
  const bancoAtivo = questoesAtivas(true).length;
  let ultimasCertas = 0;
  distintas.forEach(qid=>{ const ult = ultimaResposta(usuarioId, qid); if(ult && ult.correta) ultimasCertas++; });
  const porArea = {};
  respostas.forEach(r=>{ (porArea[r.areaId] = porArea[r.areaId] || {total:0, acertos:0}); porArea[r.areaId].total++; if(r.correta) porArea[r.areaId].acertos++; });
  return {
    total, acertos,
    taxa: total ? pct(acertos, total) : null,
    distintas: distintas.length,
    bancoAtivo,
    cobertura: bancoAtivo ? pct(distintas.length, bancoAtivo) : 0,
    taxaUltimaTentativa: distintas.length ? pct(ultimasCertas, distintas.length) : null,
    naoRespondidas: Math.max(0, bancoAtivo - distintas.length),
  };
}
function sugestoesDeMelhoria(usuarioId, limite){
  return desempenhoPorAssunto(usuarioId).filter(d=>d.total>=5 && d.taxa<70).slice(0, limite||5);
}
/* Ritmo do aluno ao longo de todas as respostas cronometradas. */
function analiseDeTempo(usuarioId){
  const respostas = db.respostas.filter(r=>r.usuarioId===usuarioId && r.tempoSeg);
  if(respostas.length < 5) return null;
  const segs = respostas.map(r=>r.tempoSeg).sort((a,b)=>a-b);
  const meio = Math.floor(segs.length/2);
  const mediana = segs.length%2 ? segs[meio] : Math.round((segs[meio-1]+segs[meio])/2);
  const media = Math.round(segs.reduce((a,b)=>a+b,0)/segs.length);
  const certas = respostas.filter(r=>r.correta), erradas = respostas.filter(r=>!r.correta);
  const medIa = (lista)=> lista.length ? Math.round(lista.reduce((a,b)=>a+b.tempoSeg,0)/lista.length) : null;
  const porAssunto = {};
  respostas.forEach(r=>{ (porAssunto[r.assuntoId] = porAssunto[r.assuntoId] || []).push(r.tempoSeg); });
  const assuntosLentos = Object.entries(porAssunto)
    .filter(([,l])=>l.length>=3)
    .map(([assuntoId,l])=>({assuntoId, n:l.length, media: Math.round(l.reduce((a,b)=>a+b,0)/l.length)}))
    .sort((a,b)=>b.media-a.media).slice(0,5);
  return {n:respostas.length, media, mediana, mediaAcertos: medIa(certas), mediaErros: medIa(erradas), assuntosLentos};
}

/* ---------- calibração: onde a confiança engana ----------
   Errar achando que sabia é o erro mais caro: o aluno não volta ao assunto
   porque acha que já domina. Estas funções separam a fila de revisão por
   tipo de erro, em vez de tratar todo erro do mesmo jeito. */
function questoesErroComCerteza(usuarioId){
  return questoesParaEstudo(usuarioId).filter(q=>{ const u = ultimaResposta(usuarioId,q.id); return u && !u.correta && u.confianca==="certeza"; });
}
function questoesAcertoNoChute(usuarioId){
  return questoesParaEstudo(usuarioId).filter(q=>{ const u = ultimaResposta(usuarioId,q.id); return u && u.correta && u.confianca==="chute"; });
}
function questoesErroNaDuvida(usuarioId){
  return questoesParaEstudo(usuarioId).filter(q=>{ const u = ultimaResposta(usuarioId,q.id); return u && !u.correta && u.confianca==="duvida"; });
}
function assuntosComFalsaSeguranca(usuarioId, minimo){
  minimo = minimo || 3;
  const porAssunto = {};
  db.respostas.filter(r=>r.usuarioId===usuarioId && r.confianca==="certeza").forEach(r=>{
    (porAssunto[r.assuntoId] = porAssunto[r.assuntoId] || []).push(r);
  });
  return Object.entries(porAssunto)
    .map(([assuntoId, lista])=>({assuntoId, n:lista.length, taxa: pct(lista.filter(r=>r.correta).length, lista.length)}))
    .filter(x=>x.n>=minimo && x.taxa<70)
    .sort((a,b)=>a.taxa-b.taxa);
}
function praticarFilaDeConfianca(tipo){
  const u = usuarioAtual();
  const mapa = {
    certeza: {lista: questoesErroComCerteza(u.id), motivo:"Você errou esta questão achando que tinha certeza"},
    chute:   {lista: questoesAcertoNoChute(u.id),  motivo:"Você acertou no chute — o acerto não significa domínio"},
    duvida:  {lista: questoesErroNaDuvida(u.id),   motivo:"Você errou estando na dúvida"},
  }[tipo];
  if(!mapa || !mapa.lista.length){ toast("Nenhuma questão nesta fila no momento."); return; }
  iniciarSessaoComLista(embaralhar(mapa.lista).slice(0,20).map(q=>({questaoId:q.id, motivo:mapa.motivo})), "pratica");
}
function praticarAssuntoFalsaSeguranca(assuntoId){
  const pool = questoesParaEstudo(usuarioAtual().id).filter(q=>q.assuntoId===assuntoId);
  if(!pool.length){ toast("Não há questões ativas deste assunto.", "err"); return; }
  iniciarSessaoComLista(embaralharSemRepetir(usuarioAtual().id, pool).slice(0,15).map(q=>({questaoId:q.id, motivo:"Assunto em que sua confiança não bate com o acerto: "+nomeAssunto(assuntoId)})), "pratica");
}
function calibracaoConfianca(usuarioId){
  const respostas = db.respostas.filter(r=>r.usuarioId===usuarioId);
  const porTipo = {certeza:[], duvida:[], chute:[]};
  respostas.forEach(r=>{ if(porTipo[r.confianca]) porTipo[r.confianca].push(r); });
  const resumo = {};
  Object.keys(porTipo).forEach(tipo=>{
    const lista = porTipo[tipo];
    resumo[tipo] = {n:lista.length, taxa: lista.length ? pct(lista.filter(r=>r.correta).length, lista.length) : null};
  });
  const alertaExcessoConfianca = resumo.certeza.n>=10 && resumo.certeza.taxa<75;
  return {...resumo, alertaExcessoConfianca};
}

/* ---------- notificações da página inicial (calculadas na hora, sem precisar
   de um servidor de notificações — cada papel vê o que é relevante pra ele) ---------- */
function gerarNotificacoes(usuario){
  const notifs = [];
  if(usuario.papel==="aluno"){
    // a turma passou a ser escolhida DEPOIS do cadastro (o cadastro pergunta
    // só o ano), então a plataforma precisa lembrar quem ainda não escolheu —
    // no calendário oficial o aluno vê o bloco do Grupo A, que pode não ser o
    // dele
    if(getGrupoDoUsuario(usuario).oficial && temCalendarioProprio(usuario.anoFaculdade)){
      notifs.push({icon:"users", texto:"Escolha a sua turma do rodízio em Meu Grupo — até lá você segue o calendário oficial.", rota:"meu-grupo"});
    }
    const vencidas = questoesRevisaoEspacadaVencidas(usuario.id).length;
    if(vencidas>0) notifs.push({icon:"refresh", texto:vencidas+" questão(ões) vencida(s) para revisão espaçada.", rota:"revisao"});
    const bloco = getBlocoAtual(usuario);
    const simsRecomendados = bloco ? db.simulados.filter(s=>s.recomendadoParaBlocos && s.recomendadoParaBlocos.includes(bloco.id) && !db.resultadosSimulados.some(r=>r.usuarioId===usuario.id && r.simuladoId===s.id)) : [];
    if(simsRecomendados.length) notifs.push({icon:"clipboard", texto:simsRecomendados.length+" simulado(s) novo(s) recomendado(s) para o seu bloco.", rota:"simulados", aba:"simulados"});
    const meta = metaDoUsuario(usuario);
    const hoje = questoesRespondidasHoje(usuario.id);
    if(hoje < meta) notifs.push({icon:"target", texto:"Faltam "+(meta-hoje)+" questão(ões) para bater sua meta de hoje.", rota:"estudar"});
    const metaCards = metaCartoesDoUsuario(usuario);
    const cardsHoje = cartoesRevisadosHoje(usuario.id);
    if(cardsHoje < metaCards) notifs.push({icon:"cards", texto:"Faltam "+(metaCards-cardsHoje)+" cartão(ões) para bater sua meta de revisão rápida.", rota:"flashcards"});
    const pendente = sessaoEmAndamentoDe(usuario);
    if(pendente) notifs.push({icon:"refresh", texto:"Você tem uma sessão pela metade ("+respostasFeitas(pendente).length+" de "+pendente.itens.length+") esperando para continuar.", rota:"estudar"});
  }
  // quem pediu para entrar em algum grupo que a pessoa criou (Meu Grupo mostra e aprova)
  const pedidosTurma = quantosPedidosDeEntradaNoGrupo(usuario);
  if(pedidosTurma) notifs.push({icon:"users", texto:pedidosTurma+(pedidosTurma===1?" pessoa pediu":" pessoas pediram")+" para entrar no seu grupo.", rota:"meu-grupo"});
  // pedidos de acesso à plataforma: deste navegador e da nuvem (vigiarPedidosDeAcesso)
  if(podeAprovarCadastros(usuario)){
    const pendCad = quantosPedidosDeAcesso();
    if(pendCad) notifs.push({icon:"check", texto:pendCad+(pendCad===1?" pedido de acesso aguardando":" pedidos de acesso aguardando")+" aprovação.", rota:"aprovar-cadastros"});
  }
  if(usuario.papel==="admin"){
    const diasSemBackup = db.ultimoBackupEm ? diasEntre(db.ultimoBackupEm, hojeISO()) : 999;
    if(diasSemBackup>=7) notifs.push({icon:"archive", texto: db.ultimoBackupEm ? "Já se passaram "+diasSemBackup+" dias desde o último backup. Exporte um novo." : "Você ainda não fez nenhum backup dos dados. Exporte um agora.", rota:"perfil"});
    const feedbacksNaoLidos = db.feedbacks.filter(f=>!f.lido).length;
    if(feedbacksNaoLidos) notifs.push({icon:"message", texto:feedbacksNaoLidos+" feedback(s) novo(s) de usuários.", rota:"feedback-usuarios"});
  }
  if(usuario.papel==="admin" || usuario.papel==="professor"){
    // questões que a turma enviou (de qualquer aparelho, com a nuvem) esperando aprovação
    const sugeridas = questoesSugeridas().length;
    if(sugeridas) notifs.push({icon:"upload", texto:sugeridas+(sugeridas===1?" questão enviada aguardando":" questões enviadas aguardando")+" aprovação.", rota:"revisao-dificeis", abaQualidade:"sugeridas"});
    const dif = questoesDificeis().length;
    if(dif) notifs.push({icon:"alert", texto:dif+" questão(ões) na fila de difíceis.", rota:"revisao-dificeis"});
    const sinalizadas = db.questoes.filter(q=>q.sinalizacoes && q.sinalizacoes.length>0).length;
    if(sinalizadas) notifs.push({icon:"flag", texto:sinalizadas+" questão(ões) sinalizada(s) pelos alunos.", rota:"revisao-dificeis"});
  }
  if(usuario.papel==="residente"){
    const pend = duvidasPendentes(usuario).length;
    if(pend) notifs.push({icon:"message", texto:pend+" dúvida(s) aguardando resposta.", rota:"fila-duvidas"});
  }
  return notifs;
}
/* Recolhida por padrão: a maior parte é lembrete que muda o dia todo (meta de
   hoje, cartões, revisão vencida) e não precisa ocupar o Início inteiro. O
   cabeçalho já diz quantas são; abrir mostra a lista. A escolha fica
   guardada enquanto a página está aberta. */
function alternarNotificacoes(){
  state.notificacoesAbertas = !state.notificacoesAbertas;
  render();
}
function renderNotificacoesCard(usuario){
  const notifs = gerarNotificacoes(usuario);
  if(!notifs.length) return "";
  const aberta = !!state.notificacoesAbertas;
  return `<div class="card mb-2 borda-destaque">
    <div class="flex justify-between items-center clicavel" role="button" tabindex="0" aria-expanded="${aberta}" onclick="alternarNotificacoes()" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();alternarNotificacoes()}">
      <div class="card-title sem-m">${iconeSvg("alert")} Notificações <span class="badge badge-accent">${notifs.length}</span></div>
      <span class="text-xs muted">${aberta ? "recolher" : "ver"} ${iconeSvg(aberta ? "arrow-up" : "arrow-down")}</span>
    </div>
    ${aberta ? `<div class="mt-2">${notifs.map(n=>`<div class="flex items-center gap-1 mb-1" ${n.rota?`style="cursor:pointer" onclick="${n.aba?`mudarAbaProvas('${n.aba}');`:""}${n.abaQualidade?`state.filtroRota.abaQualidade='${n.abaQualidade}';`:""}navigate('${n.rota}')"`:""}>${iconeSvg(n.icon)}<span class="text-sm">${escapeHtml(n.texto)}</span></div>`).join("")}</div>` : ""}
  </div>`;
}
function sequenciaDiasEstudo(usuarioId){
  const dias = new Set(db.respostas.filter(r=>r.usuarioId===usuarioId).map(r=>r.data));
  let seq=0, cursor=hojeISO();
  while(dias.has(cursor)){ seq++; cursor = somarDias(cursor,-1); }
  return seq;
}
function questoesRespondidasHoje(usuarioId){ return db.respostas.filter(r=>r.usuarioId===usuarioId && r.data===hojeISO()).length; }
function metaDoUsuario(usuario){ return (usuario && usuario.metaQuestoesDia) || (db.configGeral && db.configGeral.metaRecomendadaQuestoesDia) || CONFIG.metaRecomendadaQuestoesDia; }

/* ---------- a mesma régua diária, agora também para os cartões -------------
   Tem gente que estuda melhor por flashcard do que por questão longa — e tem
   dia (fila de espera, ônibus, dez minutos entre um plantão e outro) em que
   só cabe cartão. Por isso a revisão rápida ganhou a mesma estrutura que já
   organizava as questões: uma meta diária, o progresso do dia à vista e a
   sequência de dias seguidos. É a mesma ideia em outro formato, não um
   segundo sistema: quem preferir estudar por cartão tem como manter ritmo
   sem depender da meta de questões. */
function cartoesRevisadosHoje(usuarioId){
  const revs = (db.revisoesFlashcards && db.revisoesFlashcards[usuarioId]) || {};
  return Object.values(revs).filter(r=>r.ultimaData===hojeISO()).length;
}
/* A sequência precisa de um diário de dias à parte: cada cartão guarda só a
   ÚLTIMA data em que foi visto, então rever hoje um cartão de ontem apagaria
   ontem do mapa e zeraria a sequência de quem estuda todo dia — exatamente o
   contrário do que a sequência deveria premiar. */
function sequenciaDiasCartoes(usuarioId){
  const dias = new Set((db.diasCartoes && db.diasCartoes[usuarioId]) || []);
  let seq=0, cursor=hojeISO();
  while(dias.has(cursor)){ seq++; cursor = somarDias(cursor,-1); }
  return seq;
}
/* Quantos cartões a pessoa já revisou — o número que a tela de desempenho
   mostra ao lado (e não junto) das questões. São duas unidades diferentes:
   um cartão leva segundos e não tem acerto nem erro, só autoavaliação, então
   somá-lo às questões respondidas daria um total que não significa nada.
   Aqui contam as REVISÕES (cada vez que um cartão foi visto, que é o esforço
   de fato) e, à parte, quantos cartões diferentes já passaram pelo baralho. */
function resumoCartoesFeitos(usuarioId){
  const revs = (db.revisoesFlashcards && db.revisoesFlashcards[usuarioId]) || {};
  const entradas = Object.values(revs);
  const revisoes = entradas.reduce((soma, r) => soma + (r.vistas || 1), 0);
  const hoje = hojeISO();
  return {
    revisoes,
    cartoes: entradas.length,
    hoje: entradas.filter(r => r.ultimaData === hoje).length,
    dias: ((db.diasCartoes && db.diasCartoes[usuarioId]) || []).length,
    sequencia: sequenciaDiasCartoes(usuarioId),
    vencidos: entradas.filter(r => r.proximaRevisao && proximaRevisaoCartao(r) <= hoje).length,
  };
}
/* Quantos cartões a pessoa revisou num dia. O contador existe desde a
   revisão de 22/09; para os dias anteriores a ele sobra o que dá para saber
   dos próprios cartões (a última data de cada um), que é exato no dia em que
   se olha e vira um piso para trás — por isso o número de um dia antigo vem
   marcado como aproximado na tela, em vez de fingir precisão que não há. */
function cartoesFeitosNoDia(usuarioId, dia){
  const contados = db.cartoesPorDia && db.cartoesPorDia[usuarioId] && db.cartoesPorDia[usuarioId][dia];
  if(typeof contados === "number") return { n: contados, exato: true };
  const revs = (db.revisoesFlashcards && db.revisoesFlashcards[usuarioId]) || {};
  const n = Object.values(revs).filter(r => r.ultimaData === dia).length;
  return { n, exato: dia === hojeISO() };
}
function metaCartoesDoUsuario(usuario){
  return (usuario && usuario.metaCartoesDia)
    || (db.configGeral && db.configGeral.metaCartoesDia)
    || CONFIG.metaCartoesDia;
}

/* ---------- lembrete de meta diária (Notification do navegador) -----------
   A plataforma já avisa DENTRO do app quando a meta do dia não foi batida
   (ver gerarNotificacoes, acima) — mas isso só ajuda quem já abriu o app.
   Este lembrete usa a Notification API do navegador para avisar mesmo que
   a pessoa só tenha a aba aberta em outra janela/minimizada.
   ONDE FUNCIONA: com o Esc aberto em alguma aba (checarLembreteMetaDiaria,
   a cada minuto), em qualquer navegador. Com o app FECHADO, só onde o
   navegador acorda o service worker de tempos em tempos (Chrome e Edge,
   com o Esc instalado como aplicativo): a página deixa um recado com o
   horário e o andamento da meta (atualizarRecadoLembrete, seção 27-C) e o
   sw.js decide se avisa. O horário ali é aproximado — o navegador escolhe
   quando acorda, em geral uma vez a cada uma ou duas horas. */
function notificacaoDisponivel(){ return typeof Notification !== "undefined"; }
function ativarLembreteMetaDiaria(){
  if(!notificacaoDisponivel()){ toast("Este navegador não suporta notificações.", "err"); return; }
  Notification.requestPermission().then(perm=>{
    const u = usuarioAtual();
    if(perm === "granted"){
      u.lembreteMetaAtivo = true;
      if(!u.lembreteMetaHorario) u.lembreteMetaHorario = "20:00";
      saveState();
      toast("Lembrete ativado. Você será avisado às "+u.lembreteMetaHorario+" se ainda não tiver batido a meta do dia.");
      atualizarRecadoLembrete();
      pedirLembreteComAppFechado();
    } else {
      toast("Permissão de notificação negada pelo navegador.", "err");
    }
    render();
  });
}
function desativarLembreteMetaDiaria(){
  const u = usuarioAtual();
  u.lembreteMetaAtivo = false;
  saveState();
  atualizarRecadoLembrete();
  render();
}
function salvarHorarioLembreteMeta(valor){
  const u = usuarioAtual();
  u.lembreteMetaHorario = valor || "20:00";
  saveState();
  atualizarRecadoLembrete();
}
/* Chamada a cada minuto (ver INICIALIZAÇÃO, fim do arquivo). Só considera o
   usuário logado nesta aba — cada aluno usa seu próprio navegador. */
function checarLembreteMetaDiaria(){
  if(!state.usuarioAtualId || !notificacaoDisponivel() || Notification.permission!=="granted") return;
  const u = usuarioAtual();
  if(!u || u.papel!=="aluno" || !u.lembreteMetaAtivo) return;
  const horario = u.lembreteMetaHorario || "20:00";
  const agora = CONFIG.hoje();
  const hhmm = String(agora.getHours()).padStart(2,"0")+":"+String(agora.getMinutes()).padStart(2,"0");
  if(hhmm < horario) return;
  if(u.lembreteMetaUltimoEnvio === hojeISO()) return; // já avisou (ou já bateu a meta) hoje
  const faltamQ = Math.max(metaDoUsuario(u) - questoesRespondidasHoje(u.id), 0);
  const faltamC = Math.max(metaCartoesDoUsuario(u) - cartoesRevisadosHoje(u.id), 0);
  u.lembreteMetaUltimoEnvio = hojeISO();
  saveState();
  if(faltamQ===0 && faltamC===0) return; // meta batida, nada para lembrar
  const partes = [];
  if(faltamQ>0) partes.push(faltamQ+" questão(ões)");
  if(faltamC>0) partes.push(faltamC+" cartão(ões)");
  mostrarNotificacao(CONFIG.nomePlataforma+" — meta do dia", "Faltam "+partes.join(" e ")+" para bater sua meta de hoje.", "estudar");
  atualizarRecadoLembrete();
}

/* ---------- fila de questões "difíceis" para revisão do professor ---------- */
function questoesDificeis(){
  return questoesAtivas()
    .filter(q=>q.estatisticas.respostas>=CONFIG.minRespostasParaAvaliarDificuldade)
    .filter(q=>(q.estatisticas.acertos/q.estatisticas.respostas) < CONFIG.limiarTaxaAcertoDificil)
    .filter(q=>!q.revisadaProfessor)
    .sort((a,b)=>(a.estatisticas.acertos/a.estatisticas.respostas)-(b.estatisticas.acertos/b.estatisticas.respostas));
}

/* ---------- O QUE MAIS CAI NA PROVA (incidência na banca) -----------------
   As provas reais que estão no banco dizem, assunto por assunto, o que a
   banca cobra — e quanto. Cruzado com o acerto de cada pessoa, isso vira a
   pergunta que interessa na reta final: "o que cai muito E eu ainda erro?".

   incidenciaNaBanca(banca) conta as questões REAIS daquela banca (anuladas
   incluídas: a banca cobrou o tema, só errou a questão) por assunto e por
   grande área, e em quantos anos diferentes cada assunto apareceu.

   prioridadesDeEstudo(usuarioId, banca) dá uma nota de prioridade a cada
   assunto cobrado:
       prioridade = (fatia da prova que o assunto ocupa) × (1 − acerto estimado)
   O acerto estimado é "puxado" para o acerto geral da pessoa quando há
   poucas respostas no assunto (média com CONFIG.incidencia.respostasDePeso
   respostas imaginárias no acerto geral): 1 erro em 1 questão não pode
   virar "0% de acerto, prioridade máxima". Assunto nunca respondido entra
   com o acerto geral — a pessoa não sabe se sabe, e a prova cobra. */
let _cacheIncidencia = null;
function bancaDeReferencia(){ return (db.configGeral && db.configGeral.bancaFoco) || CONFIG.bancaFoco; }
function incidenciaNaBanca(banca){
  banca = banca || bancaDeReferencia();
  if(_cacheIncidencia && _cacheIncidencia.geracao===_geracaoDb && _cacheIncidencia.banca===banca) return _cacheIncidencia.r;
  const reais = db.questoes.filter(q=>q.real && q.banca===banca && q.status!=="desatualizada");
  const porAssunto = {}, porArea = {}, anos = new Set();
  reais.forEach(q=>{
    anos.add(q.ano);
    const a = porAssunto[q.assuntoId] = porAssunto[q.assuntoId] || { assuntoId:q.assuntoId, areaId:q.areaId, n:0, anos:new Set() };
    a.n++; a.anos.add(q.ano);
    porArea[q.areaId] = (porArea[q.areaId]||0) + 1;
  });
  const r = { banca, total: reais.length, anos: [...anos].sort(), porAssunto, porArea };
  _cacheIncidencia = { geracao:_geracaoDb, banca, r };
  return r;
}
function acertoGeralDoUsuario(usuarioId){
  const rs = db.respostas.filter(r=>r.usuarioId===usuarioId);
  return { total: rs.length, acertos: rs.filter(r=>r.correta).length,
           taxa: rs.length ? rs.filter(r=>r.correta).length/rs.length : CONFIG.incidencia.acertoPresumido };
}
function prioridadesDeEstudo(usuarioId, banca){
  const inc = incidenciaNaBanca(banca);
  if(!inc.total) return [];
  const geral = acertoGeralDoUsuario(usuarioId);
  const k = CONFIG.incidencia.respostasDePeso;
  const minhas = {};
  db.respostas.forEach(r=>{
    if(r.usuarioId!==usuarioId) return;
    const m = minhas[r.assuntoId] = minhas[r.assuntoId] || { total:0, acertos:0 };
    m.total++; if(r.correta) m.acertos++;
  });
  const lista = Object.values(inc.porAssunto).map(a=>{
    const m = minhas[a.assuntoId] || { total:0, acertos:0 };
    const acertoEstimado = (m.acertos + k*geral.taxa) / (m.total + k);
    const fatia = a.n / inc.total;
    return {
      assuntoId: a.assuntoId, areaId: a.areaId, questoesNaProva: a.n, anosQueCaiu: a.anos.size,
      fatia, respondidas: m.total, acertos: m.acertos, taxa: m.total ? pct(m.acertos, m.total) : null,
      acertoEstimado, prioridade: fatia * (1 - acertoEstimado),
    };
  });
  const max = Math.max(...lista.map(x=>x.prioridade), 1e-9);
  lista.forEach(x=>{ x.prioridadeRelativa = x.prioridade/max; });
  return lista.sort((a,b)=>b.prioridade-a.prioridade);
}
/* Peso de cada assunto na montagem da sessão recomendada: 1 para quem não
   cai na prova, até 1 + CONFIG.incidencia.pesoNaSessao para o assunto de
   maior prioridade. Não tira nada do bloco atual — só muda a ORDEM em que os
   assuntos do bloco são visitados, então o que cai muito e a pessoa erra
   aparece primeiro. */
function pesosDeIncidencia(usuarioId){
  const extra = CONFIG.incidencia.pesoNaSessao;
  const mapa = {};
  if(!extra) return mapa;
  prioridadesDeEstudo(usuarioId).forEach(p=>{ mapa[p.assuntoId] = 1 + extra*p.prioridadeRelativa; });
  return mapa;
}
function assuntosQueMaisCaem(usuarioId){
  return new Set(prioridadesDeEstudo(usuarioId).slice(0, CONFIG.incidencia.topParaDestacar).map(p=>p.assuntoId));
}

/* ---------- SE A PROVA FOSSE HOJE (estimativa de nota) --------------------
   A prova da banca tem uma proporção de questões por grande área (a média
   das provas reais do banco). A nota esperada é essa proporção aplicada ao
   acerto da pessoa em cada área:
       nota = Σ (fatia da área na prova) × (acerto estimado na área)
   com o mesmo "puxão" para o acerto geral quando a área tem poucas
   respostas. A faixa (mais ou menos) é o erro-padrão dessa conta: com
   poucas respostas ela é larga, e a tela diz isso em vez de fingir precisão.
   Só aparece a partir de CONFIG.incidencia.minRespostasParaNota respostas. */
function estimativaDeNota(usuarioId, banca){
  const inc = incidenciaNaBanca(banca);
  const geral = acertoGeralDoUsuario(usuarioId);
  if(!inc.total || geral.total < CONFIG.incidencia.minRespostasParaNota) return null;
  const k = CONFIG.incidencia.respostasDePeso;
  let nota = 0, variancia = 0;
  const areas = db.taxonomia.areas.map(area=>{
    const rs = db.respostas.filter(r=>r.usuarioId===usuarioId && r.areaId===area.id);
    const acertos = rs.filter(r=>r.correta).length;
    const p = (acertos + k*geral.taxa) / (rs.length + k);
    const fatia = (inc.porArea[area.id]||0) / inc.total;
    nota += fatia * p;
    variancia += fatia*fatia * p*(1-p) / (rs.length + k);
    return { areaId: area.id, nome: area.nome, fatia, respondidas: rs.length, taxa: rs.length ? pct(acertos, rs.length) : null, acertoEstimado: p,
             pontos: fatia * p * 100 };
  });
  const ep = Math.sqrt(variancia);
  return { banca: inc.banca, anos: inc.anos, nota: Math.round(nota*100),
           minimo: Math.max(0, Math.round((nota - 1.96*ep)*100)), maximo: Math.min(100, Math.round((nota + 1.96*ep)*100)),
           respostas: geral.total, areas };
}

/* ---------- a prova-alvo e o prazo da revisão ----------
   Só tem prova-alvo quem está no 6º ano ou é Formado(a) (CONFIG.provaAlvo.anos).
   Sem data marcada vale o 1º de dezembro — o próximo que ainda não passou —,
   e a pessoa pode trocar pela data exata da primeira prova importante
   (usuario.provaAlvoData). Do 3º ao 5º ano, e para quem não informou o ano,
   não há prova-alvo: a data seria um palpite, e a plataforma prefere não ter
   a data a ter uma que não é da pessoa. */
function temProvaAlvo(usuario){
  return !!usuario && CONFIG.provaAlvo.anos.includes(usuario.anoFaculdade);
}
function dataISOValida(iso){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(iso || "")) return false;
  const d = new Date(iso + "T00:00:00");
  return !isNaN(d) && dataLocalISO(d) === iso;
}
/* { data, exata, dias } — `exata` quando é a data que a pessoa escolheu;
   `dias` é quanto falta (0 = hoje). Data exata que já passou volta ao padrão.
   Devolve null para quem não tem prova-alvo. */
function provaAlvoDoUsuario(usuario){
  if(!temProvaAlvo(usuario)) return null;
  const hoje = hojeISO();
  if(dataISOValida(usuario.provaAlvoData) && usuario.provaAlvoData >= hoje){
    return { data: usuario.provaAlvoData, exata: true, dias: diasEntre(hoje, usuario.provaAlvoData) };
  }
  const p = x => String(x).padStart(2, "0");
  const doAno = ano => ano + "-" + p(CONFIG.provaAlvo.mes) + "-" + p(CONFIG.provaAlvo.dia);
  const ano = +hoje.slice(0, 4);
  const data = doAno(ano) >= hoje ? doAno(ano) : doAno(ano + 1);
  return { data, exata: false, dias: diasEntre(hoje, data) };
}
/* "faltam 58 dias" / "faltam cerca de 14 meses": o número exato de dias a três
   anos de distância é falsa precisão. */
function tempoParaProvaAlvo(dias){
  if(dias === 0) return "é hoje";
  if(dias <= 100) return "falta" + (dias === 1 ? " 1 dia" : "m " + dias + " dias");
  const meses = Math.round(dias / 30.4);
  return "faltam cerca de " + (meses >= 24 ? Math.round(meses / 12) + " anos" : meses + " meses");
}
/* O intervalo de revisão (dias), sem passar de uma fração do tempo que falta
   para a prova-alvo (CONFIG.revisaoPelaProva) e sem baixar do piso. Sem
   prova-alvo, devolve o intervalo como veio. */
function limitarIntervaloPelaProva(usuarioId, intervalo){
  const cfg = CONFIG.revisaoPelaProva;
  if(!cfg || !cfg.ligado) return intervalo;
  const alvo = provaAlvoDoUsuario(getUsuario(usuarioId));
  if(!alvo) return intervalo;
  const teto = Math.max(CONFIG.intervaloMinimoRevisao, Math.round(alvo.dias * cfg.fracaoDoPrazo));
  return Math.min(intervalo, teto);
}
