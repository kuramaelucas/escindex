/* codigo/05c-cronogramas-de-sessao.js — Motor de estudos (seção 4), parte 3: a sessão de quem não segue calendário, o cronograma de Formados e o do 6º ano (dificuldade por assunto, sessão do dia).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* SESSÃO SEM CALENDÁRIO. Quem não segue bloco nenhum (o formado sem grupo, ou
   quem está num grupo que existe só para dividir questões) não tem "matéria
   do momento": a sessão é 40% revisão espaçada (o que errou e o que já
   venceu, sem repetir o que domina) e o resto é questão que a pessoa ainda
   não viu, com os assuntos de maior prioridade (o que mais cai e ela mais
   erra) vindo antes. */
/* CRONOGRAMA DE FORMADOS (CONFIG.cronogramaFormado). A sessão de quem é
   Formado(a): explorar muitos assuntos com questões fáceis e deixar CADA
   assunto subir de dificuldade sozinho. O nível de um assunto sai das últimas
   respostas dele: acerto com certeza com frequência sobe; erro frequente
   segura no fácil. Nada disso mexe nos outros assuntos. */
function cronogramaDeFormado(usuario){
  const c = CONFIG.cronogramaFormado;
  return c && usuario && c.anos.includes(usuario.anoFaculdade) ? c : null;
}
const ROTULO_NIVEL_FORMADO = ["fácil", "médio", "difícil"];
function nivelDoAssuntoFormado(usuarioId, assuntoId){
  const c = CONFIG.cronogramaFormado;
  const rs = db.respostas.filter(r=>r.usuarioId===usuarioId && r.assuntoId===assuntoId).slice(-c.janela);
  const seguras = rs.filter(r=>r.correta && r.confianca==="certeza").length;
  const erros = rs.filter(r=>!r.correta).length;
  const base = { nivel: 0, n: rs.length, seguras, erros };
  if(rs.length < c.amostraMinima) return base;                      // ainda explorando: fácil
  if(erros/rs.length >= c.taxaErroQueSegura) return base;           // erra com frequência: não progride
  if(seguras/rs.length >= c.taxaSeguraDificil && rs.length >= c.minimoParaDificil) return { ...base, nivel: 2 };
  if(seguras/rs.length >= c.taxaSeguraMedio) return { ...base, nivel: 1 };
  return base;
}
// fatia da sessão que é revisão: pouca no começo (quem acabou de chegar tem pouco a rever)
function fracaoRevisaoFormado(usuarioId){
  const feitas = db.respostas.filter(r=>r.usuarioId===usuarioId).length;
  const degrau = CONFIG.cronogramaFormado.revisaoPorRespostas.find(([ate]) => feitas < ate);
  return degrau ? degrau[1] : CONFIG.revisaoSemCalendario;
}
function montarSessaoDeFormado(usuario, tamanho){
  const usuarioId = usuario.id, c = CONFIG.cronogramaFormado;
  const partes = partesDaRevisaoEspacada(usuarioId);
  const nRevisao = Math.round(tamanho * fracaoRevisaoFormado(usuarioId));
  const itens = [...partes.erros, ...partes.decaimentos].slice(0, nRevisao).map(v=>({questaoId:v.questao.id,
    origem: v.motivo==="erro" ? "revisao_erro" : "revisao_decaimento",
    motivo: v.motivo==="erro" ? "Revisão espaçada — erro/chute anterior" : "Revisão espaçada — já faz tempo desde o último acerto"}));
  const usados = new Set(itens.map(it=>it.questaoId));
  const naoVistas = semRepeticaoPrematura(usuarioId, questoesParaEstudo(usuarioId).filter(q=>!usados.has(q.id) && !jaFoiRespondida(usuarioId, q.id)));
  const niveis = {};
  const nivelDe = q => niveis[q.assuntoId] || (niveis[q.assuntoId] = nivelDoAssuntoFormado(usuarioId, q.assuntoId));
  const porAssunto = {};
  const peso = q => { const nv = nivelDe(q); return (nv.n ? 1 : c.pesoAssuntoNovo) * (nivelDaQuestao(q) === nv.nivel ? 2 : 1); };
  // 1) o que o nível do assunto permite (o mesmo nível ou abaixo), sorteado com peso e com teto por assunto
  const permitidas = naoVistas.filter(q => nivelDaQuestao(q) <= nivelDe(q).nivel);
  const motivoDe = q => {
    const nv = nivelDe(q), rotulo = ROTULO_NIVEL_FORMADO[nivelDaQuestao(q)];
    if(!nv.n) return "Exploração — "+nomeAssunto(q.assuntoId)+" é novo para você · questão "+rotulo;
    if(nv.nivel === 0) return "Exploração — "+nomeAssunto(q.assuntoId)+": ainda no nível fácil ("+nv.seguras+" acerto(s) com certeza em "+nv.n+") · questão "+rotulo;
    return "Progressão — "+nomeAssunto(q.assuntoId)+": você acerta com certeza ("+nv.seguras+" em "+nv.n+") · questão "+rotulo;
  };
  const pegar = (pool, n, teto) => {
    sortearComPeso(pool, pool.length, peso).forEach(q => {
      if(n <= 0 || usados.has(q.id) || (porAssunto[q.assuntoId]||0) >= teto) return;
      itens.push({questaoId:q.id, origem:"nao_vista", motivo:motivoDe(q)});
      usados.add(q.id); porAssunto[q.assuntoId] = (porAssunto[q.assuntoId]||0)+1; n--;
    });
  };
  pegar(permitidas, tamanho - itens.length, c.maxPorAssunto);
  // 2) faltou: assuntos que só têm questão acima do nível entram pela mais fácil, e o teto sobe um pouco
  if(itens.length < tamanho){
    const acima = naoVistas.filter(q=>!usados.has(q.id)).sort((a,b)=>nivelDaQuestao(a)-nivelDaQuestao(b));
    acima.forEach(q => {
      if(itens.length >= tamanho || (porAssunto[q.assuntoId]||0) >= c.maxPorAssunto+1) return;
      itens.push({questaoId:q.id, origem:"nao_vista", motivo:motivoDe(q)+" (o assunto não tem questão mais fácil sem resposta)"});
      usados.add(q.id); porAssunto[q.assuntoId] = (porAssunto[q.assuntoId]||0)+1;
    });
  }
  if(itens.length < tamanho){
    const sobra = questoesParaEstudo(usuarioId).filter(q=>!usados.has(q.id));
    embaralharSemRepetir(usuarioId, sobra).slice(0, tamanho - itens.length).forEach(q=>itens.push({questaoId:q.id, origem:"complemento", motivo:"Complemento — você já respondeu quase tudo do banco"}));
  }
  return embaralhar(itens);
}
/* O que a tela diz: a regra e em que ponto a pessoa está. */
function explicacaoCronogramaFormado(usuario){
  const c = cronogramaDeFormado(usuario); if(!c) return "";
  const todos = db.taxonomia.assuntos.filter(a=>questoesParaEstudo(usuario.id).some(q=>q.assuntoId===a.id));
  const niveis = todos.map(a=>({a, ...nivelDoAssuntoFormado(usuario.id, a.id)}));
  const explorados = niveis.filter(x=>x.n > 0).length;
  const medio = niveis.filter(x=>x.nivel === 1).length, dificil = niveis.filter(x=>x.nivel === 2).length;
  return "Cronograma de formado(a): você começa explorando muitos assuntos com questões fáceis. Cada assunto sobe de nível sozinho (fácil, médio, difícil) quando você acerta com certeza com frequência, e fica no fácil se você erra muito nele — um assunto não muda o nível dos outros. "+
    "Hoje: "+explorados+" de "+todos.length+" assuntos explorados · "+medio+" no nível médio · "+dificil+" no difícil. A fatia de revisão cresce com o que você já respondeu ("+Math.round(fracaoRevisaoFormado(usuario.id)*100)+"% agora).";
}
function montarSessaoSemCalendario(usuario, tamanho){
  if(cronogramaDeFormado(usuario)) return montarSessaoDeFormado(usuario, tamanho);
  const usuarioId = usuario.id;
  const rotulo = q => rotuloProgressao(q, usuario);
  const pesos = pesosDeIncidencia(usuarioId);
  const partes = partesDaRevisaoEspacada(usuarioId);
  const nRevisao = Math.round(tamanho * CONFIG.revisaoSemCalendario);
  const itens = [...partes.erros, ...partes.decaimentos].slice(0, nRevisao).map(v=>({questaoId:v.questao.id,
    origem: v.motivo==="erro" ? "revisao_erro" : "revisao_decaimento",
    motivo: v.motivo==="erro" ? "Revisão espaçada — erro/chute anterior" : "Revisão espaçada — já faz tempo desde o último acerto"}));
  const usados = new Set(itens.map(it=>it.questaoId));
  const naoVistas = questoesParaEstudo(usuarioId).filter(q=>!usados.has(q.id) && !jaFoiRespondida(usuarioId, q.id));
  selecionarComProgressao(naoVistas, tamanho - itens.length, usuario, (p,k)=>selecionarComInterleaving(p, k, pesos))
    .forEach(q=>{ itens.push({questaoId:q.id, origem:"nao_vista", motivo:"Questão que você ainda não viu"+rotulo(q)}); usados.add(q.id); });
  if(itens.length < tamanho){
    // banco quase todo respondido: completa com o que já venceu e, por fim, com qualquer questão
    const sobra = questoesParaEstudo(usuarioId).filter(q=>!usados.has(q.id));
    embaralharSemRepetir(usuarioId, sobra).slice(0, tamanho - itens.length).forEach(q=>itens.push({questaoId:q.id, origem:"complemento", motivo:"Complemento — você já respondeu quase tudo do banco"}));
  }
  return embaralhar(itens);
}

/* CRONOGRAMA DO 6º ANO (CONFIG.cronogramaDoSextoAno). Só vale para quem está
   no ano listado lá; sem ele, a sessão do dia é a recomendada de sempre. */
function cronogramaDoUsuario(usuario){
  const c = CONFIG.cronogramaDoSextoAno;
  const ano = (usuario && usuario.anoFaculdade) || CONFIG.anoFaculdadePadrao;
  return c && c.anos.includes(ano) ? c : null;
}
/* A sessão do dia: as primeiras questões do cronograma pelo sistema atual e,
   passada a cota, as extras de prova de residência. `feitasHoje` é o que a
   pessoa já respondeu hoje; a cota que falta cabe numa sessão só em parte
   (a sessão que cruza a 30ª questão sai metade de cada). */
function montarSessaoDoDia(usuarioId, tamanho, feitasHoje){
  const crono = cronogramaDoUsuario(getUsuario(usuarioId));
  if(!crono) return montarSessaoRecomendada(usuarioId, tamanho);
  const noSistema = Math.min(tamanho, Math.max(0, crono.questoesNoSistema - feitasHoje));
  const doSistema = noSistema ? montarSessaoRecomendada(usuarioId, noSistema) : [];
  const usadas = new Set(doSistema.map(it=>it.questaoId));
  // o sistema atual vem primeiro e as extras depois: a ordem é a do cronograma
  const extras = montarSessaoDeProvaReal(usuarioId, tamanho - doSistema.length, usadas);
  return [...doSistema, ...extras];
}
/* Sorteio ponderado sem repetição: cada questão recebe a chave sorteio^(1/peso)
   e vão as de maior chave (peso 11 quase sempre passa na frente de peso 1).
   Diferente do interleaving, que dá uma questão por assunto e dilui a
   prioridade: aqui o assunto que mais cai e em que a pessoa mais erra pode
   trazer várias questões da mesma sessão. */
function sortearComPeso(pool, n, pesoDe){
  return pool.map(q=>({q, chave: Math.pow(Math.random(), 1/Math.max(pesoDe(q), 1e-6))}))
    .sort((a,b)=>b.chave-a.chave).slice(0, n).map(x=>x.q);
}
/* As extras: só questão real de residência, dos assuntos que mais caem nas
   provas do banco e em que a pessoa mais erra (a nota de prioridade de
   prioridadesDeEstudo, que já cruza as duas coisas), sem repetir o que ela
   respondeu há pouco. Se faltar questão desses assuntos, completa com
   qualquer outra de prova real; faltando ainda, com o resto do banco. */
function montarSessaoDeProvaReal(usuarioId, n, excluidas){
  if(n <= 0) return [];
  const crono = cronogramaDoUsuario(getUsuario(usuarioId)) || CONFIG.cronogramaDoSextoAno;
  const prior = {}, pesos = {};
  prioridadesDeEstudo(usuarioId, TODAS_AS_PROVAS).forEach(p=>{ prior[p.assuntoId] = p; pesos[p.assuntoId] = 1 + crono.pesoExtras*p.prioridadeRelativa; });
  const livres = questoesParaEstudo(usuarioId).filter(q=>!excluidas.has(q.id));
  const reais = livres.filter(q=>!ehConsolidacao(q));
  const motivo = q => {
    const p = prior[q.assuntoId];
    return "Extra do cronograma — prova de residência" + (p ? ": "+nomeAssunto(q.assuntoId)+" tem "+p.questoesNaProva+" questão(ões) nas provas do banco"+(p.taxa!==null ? " e você acerta "+p.taxa+"%" : " e você ainda não o respondeu") : "");
  };
  const itens = sortearComPeso(semRepeticaoPrematura(usuarioId, reais), n, q=>pesos[q.assuntoId] || 1)
    .map(q=>({questaoId:q.id, origem:"extra_prova", motivo:motivo(q)}));
  if(itens.length < n){
    const ja = new Set(itens.map(it=>it.questaoId));
    const resto = livres.filter(q=>!ja.has(q.id));
    [...embaralharSemRepetir(usuarioId, resto.filter(q=>!ehConsolidacao(q))), ...embaralharSemRepetir(usuarioId, resto.filter(ehConsolidacao))]
      .slice(0, n - itens.length)
      .forEach(q=>itens.push({questaoId:q.id, origem:"extra_prova", motivo:"Extra do cronograma — as provas de residência do banco já foram quase todas respondidas"}));
  }
  return itens;
}
/* O que a tela diz sobre o cronograma e em que ponto do dia a pessoa está. */
function explicacaoCronograma(usuario, feitasHoje){
  const crono = cronogramaDoUsuario(usuario);
  if(!crono) return "";
  const cota = crono.questoesNoSistema;
  return "Cronograma do 6º ano: as primeiras "+cota+" questões do dia seguem o sistema (bloco, revisão e prévia); da "+(cota+1)+"ª em diante só entram questões de prova real de residência, nos assuntos que mais caem no banco e em que você mais erra. "+
    (feitasHoje >= cota ? "Hoje você já passou das "+cota+": o que vier agora é de prova." : "Hoje: "+feitasHoje+" de "+cota+" no sistema.");
}

function montarSessaoRecomendada(usuarioId, tamanho){
  const usuario = getUsuario(usuarioId);
  const grupo = getGrupoDoUsuario(usuario);
  const blocoAtual = getBlocoAtual(usuario);
  if(!blocoAtual) return montarSessaoSemCalendario(usuario, tamanho);
  const blocosGrupo = blocosDoGrupo(grupo);
  const proximo = getProximoBloco(blocoAtual, blocosGrupo);
  const mistura = misturaEfetiva(usuario);

  const assuntosAtual = assuntoIdsDoBloco(blocoAtual);
  // a revisão considera os blocos já vencidos DESTE ano e também o que o aluno
  // estudou em anos anteriores (essencial no começo do ano letivo)
  const assuntosPassados = assuntosParaRevisao(usuario);
  const assuntosFuturos = proximo ? assuntoIdsDoBloco(proximo) : [];

  const nAtual = Math.round(tamanho*mistura.atual);
  const nRevisao = Math.round(tamanho*mistura.revisaoPassados);
  const nPrevia = Math.max(0, tamanho - nAtual - nRevisao);

  const poolAtual = semRepeticaoPrematura(usuarioId, questoesParaEstudo(usuarioId).filter(q=>assuntosAtual.includes(q.assuntoId)));
  const pesos = pesosDeIncidencia(usuarioId);
  const destaque = assuntosQueMaisCaem(usuarioId);
  /* A proporção consolidação/residência do ano do aluno (CONFIG.progressaoConsolidacao)
     vale para o que é matéria NOVA da sessão: bloco atual, assunto de bloco
     anterior ainda não visto, prévia e complemento. A revisão espaçada
     vencida não entra na conta — é questão que a pessoa já fez, e o prazo
     dela não muda porque o ano mudou. */
  const rotulo = q => rotuloProgressao(q, usuario);
  const itensAtual = selecionarComProgressao(poolAtual, nAtual, usuario, (p,k)=>selecionarComInterleaving(p, k, pesos)).map(q=>({questaoId:q.id, origem:"bloco_atual",
    motivo:"Bloco atual — "+blocoAtual.nome + (destaque.has(q.assuntoId) ? " · prioridade: cai muito na "+bancaDeReferencia() : "") + rotulo(q)}));

  /* Ordem da revisão: primeiro o que a pessoa AINDA NÃO VIU, depois o que
     ela ERROU (ou acertou no chute), e só por último o que acertou e já
     passou o prazo — ver partesDaRevisaoEspacada. */
  const partesRevisao = partesDaRevisaoEspacada(usuarioId, assuntosPassados);
  const itensRevisao = selecionarComProgressao(partesRevisao.novas, nRevisao, usuario, (p,k)=>selecionarComInterleaving(p, k, pesos))
    .map(q=>({questaoId:q.id, origem:"revisao_nova", motivo:"Revisão — assunto de bloco anterior que você ainda não viu"+rotulo(q)}));
  const atrasoDe = v => diasEntre(proximaRevisaoEfetiva(v.entry), hojeISO());
  [...partesRevisao.erros, ...partesRevisao.decaimentos].slice(0, Math.max(0, nRevisao - itensRevisao.length)).forEach(v=>{
    const atraso = atrasoDe(v);
    const porErro = partesRevisao.erros.includes(v);
    itensRevisao.push({questaoId:v.questao.id, origem: porErro ? "revisao_erro" : "revisao_decaimento", motivo: (porErro ? "Revisão espaçada — erro/chute anterior" : "Revisão espaçada — já faz tempo desde o último acerto") + (atraso>0 ? ", vencida há "+atraso+" dia(s)" : ", no prazo")});
  });

  const poolPrevia = semRepeticaoPrematura(usuarioId, questoesParaEstudo(usuarioId).filter(q=>assuntosFuturos.includes(q.assuntoId) && q.dificuldadeManual==="fundamental"));
  const itensPrevia = selecionarComProgressao(poolPrevia, nPrevia, usuario, (p,k)=>embaralhar(p).slice(0,k)).map(q=>({questaoId:q.id, origem:"previa", motivo: (proximo ? "Prévia do próximo bloco — "+proximo.nome : "Prévia")+rotulo(q)}));

  let todos = semQuestoesRepetidas([...itensAtual, ...itensRevisao, ...itensPrevia]);
  // se o banco de demonstração não tiver questões suficientes para preencher a
  // meta, completamos com quaisquer questões ativas ainda não usadas nesta sessão
  if(todos.length < tamanho){
    const usados = new Set(todos.map(t=>t.questaoId));
    const extras = selecionarComProgressao(questoesParaEstudo(usuarioId).filter(q=>!usados.has(q.id)), tamanho-todos.length, usuario, (p,k)=>embaralharSemRepetir(usuarioId, p).slice(0,k))
      .map(q=>({questaoId:q.id, origem:"complemento", motivo:"Complemento — banco de demonstração ainda é pequeno"+rotulo(q)}));
    todos = [...todos, ...extras];
  }
  return embaralhar(todos);
}

/* `filtros.incluirRecentes` recoloca na lista o que a pessoa respondeu há
   pouco e ainda não venceu na revisão espaçada: por padrão a lista que ela
   monta também não repete questão prematuramente (ver semRepeticaoPrematura),
   e a tela diz quantas ficaram de fora e deixa trazê-las de volta
   (contagemDaListaPersonalizada). */
function buscarQuestoesPorFiltro(usuarioId, filtros){
  // telas de equipe (PDF) pedem o banco inteiro; as de estudo, só o que a
  // pessoa não escondeu
  let pool = filtros.incluirInativas ? db.questoes.slice() : questoesParaEstudo(usuarioId, filtros.incluirGrupoId);
  if(filtros.areaIds && filtros.areaIds.length) pool = pool.filter(q=>filtros.areaIds.includes(q.areaId));
  if(filtros.especialidadeIds && filtros.especialidadeIds.length) pool = pool.filter(q=>filtros.especialidadeIds.includes(q.especialidadeId));
  if(filtros.assuntoIds && filtros.assuntoIds.length) pool = pool.filter(q=>filtros.assuntoIds.includes(q.assuntoId));
  if(filtros.bancas && filtros.bancas.length) pool = pool.filter(q=>filtros.bancas.includes(q.banca));
  if(filtros.tiposProva && filtros.tiposProva.length) pool = pool.filter(q=>filtros.tiposProva.includes(tipoProvaDe(q)));
  if(filtros.anos && filtros.anos.length) pool = pool.filter(q=>filtros.anos.includes(q.ano));
  if(filtros.apenasErros) pool = pool.filter(q=>{ const u=ultimaResposta(usuarioId,q.id); return u && (!u.correta || u.confianca==="chute"); });
  if(filtros.apenasFavoritas) pool = pool.filter(q=>isFavorita(usuarioId,q.id));
  if(filtros.apenasNaoRespondidas) pool = pool.filter(q=>!jaFoiRespondida(usuarioId,q.id));
  if(!filtros.incluirRecentes && !filtros.incluirInativas) pool = semRepeticaoPrematura(usuarioId, pool);
  return pool;
}
/* Quantas questões os filtros dão, quantas delas foram respondidas há pouco
   (`recentes`) e se estão dentro da conta (`incluidas`) — o que a tela mostra,
   em letra pequena, com o botão de tirá-las ou recolocá-las. */
function contagemDaListaPersonalizada(usuarioId, filtros){
  const todas = buscarQuestoesPorFiltro(usuarioId, Object.assign({}, filtros, {incluirRecentes:true}));
  const recentes = todas.length - semRepeticaoPrematura(usuarioId, todas).length;
  const incluidas = !!filtros.incluirRecentes;
  return { total: incluidas ? todas.length : todas.length - recentes, recentes, incluidas };
}

function questoesErroOrdenadasPorAntiguidade(usuarioId){
  const pool = questoesParaEstudo(usuarioId).filter(q=>{
    const u = ultimaResposta(usuarioId,q.id);
    return u && (!u.correta || u.confianca==="chute") && diasEntre(u.data, hojeISO()) >= CONFIG.intervaloMinimoRevisao;
  });
  return pool.map(q=>({questao:q, ultima:ultimaResposta(usuarioId,q.id)}))
    .sort((a,b)=>a.ultima.data.localeCompare(b.ultima.data)); // mais antigas primeiro
}

/* A revisão não pode se basear só em erro: mesmo quem acertou com certeza
   esquece com o tempo. Esta função junta as questões já respondidas cujo
   prazo de revisão espaçada já venceu — acertos e erros — e mostra, pra
   transparência, se cada uma volta por erro/chute recente ou por decaimento
   natural (fazia tempo que não via, mesmo tendo acertado). Questão dominada
   (mais de dois acertos firmes seguidos) já não vence — ver questaoDominada. */
function questoesRevisaoEspacadaVencidas(usuarioId){
  const revisoesDoUsuario = db.revisoes[usuarioId] || {};
  const pool = questoesParaEstudo(usuarioId).filter(q => revisaoVencida(usuarioId, q.id));
  return pool.map(q=>{
    const entry = revisoesDoUsuario[q.id];
    const motivo = (!entry.ultimaCorreta || entry.ultimaConfianca==="chute") ? "erro" : "decaimento";
    return {questao:q, entry, motivo};
  }).sort((a,b)=>proximaRevisaoEfetiva(a.entry).localeCompare(proximaRevisaoEfetiva(b.entry))); // mais atrasada primeiro
}
/* Os assuntos de que a revisão espaçada pode trazer questão que a pessoa
   nunca viu: os dos blocos já passados e os de anos anteriores. Sem bloco
   nenhum (quem não segue calendário, como o formado sem grupo), valem os
   assuntos em que ela já respondeu alguma coisa — não há "passado" no
   calendário para olhar. */
function assuntosParaRevisao(usuario){
  const blocoAtual = getBlocoAtual(usuario);
  const passados = blocoAtual ? getBlocosPassados(blocoAtual, blocosDoGrupo(getGrupoDoUsuario(usuario), usuario)) : [];
  const conjunto = new Set([...passados.flatMap(assuntoIdsDoBloco), ...assuntosDeAnosAnteriores(usuario.id)]);
  if(!blocoAtual) db.respostas.forEach(r=>{ if(r.usuarioId===usuario.id && r.assuntoId) conjunto.add(r.assuntoId); });
  return [...conjunto];
}
