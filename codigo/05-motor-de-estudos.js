/* Esc — codigo/05-motor-de-estudos.js  (parte 5 de 13)
   O motor de estudos: dificuldade, repetição espaçada, flashcards, montagem de sessões, desempenho, calibração e lembretes.
   Os arquivos de codigo/ são carregados em ordem pelo index.html (lista
   ESC_ARQUIVOS.codigo) e dividem o mesmo espaço: uma função escrita num
   arquivo é usada nos outros sem import. */

/* ==========================================================================
   4. MOTOR DE ESTUDOS (o "cérebro" da plataforma)
   ==========================================================================
   Aqui ficam as regras de: dificuldade progressiva, repetição espaçada,
   montagem da sessão recomendada (mistura bloco atual + revisão + prévia),
   filtros personalizados e cálculo de desempenho/sugestões. Cada função tem
   um comentário explicando a regra em português simples — a ideia é que
   qualquer pessoa da equipe consiga entender e ajustar os números do CONFIG
   sem precisar entender o código todo. */

function embaralhar(array){
  const a = array.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function questoesAtivas(incluirGrupoId){
  // "ativa" exclui questões anuladas ou desatualizadas de sessões e estatísticas,
  // conforme pedido: nunca usar questão anulada/desatualizada para calcular dificuldade.
  // Questões marcadas com um grupoId (upload de aluno pro próprio grupo) ficam
  // escondidas do banco geral por padrão — só entram se o chamador pedir
  // explicitamente esse grupo (incluirGrupoId = id do grupo) ou tudo (true).
  return db.questoes.filter(q=>{
    if(q.status!=="ativa") return false;
    if(q.grupoId && incluirGrupoId!==true && q.grupoId!==incluirGrupoId) return false;
    return true;
  });
}

/* ---------- bloco atual / passados / futuros (por grupo/turma do usuário) ---------- */
function blocoAtualDoGrupo(grupo, usuario){
  const blocos = blocosDoGrupo(grupo, usuario);
  if(!blocos.length) return null;
  if(grupo.blocoAtualIdManual){ const fixado = blocos.find(b=>b.id===grupo.blocoAtualIdManual); if(fixado) return fixado; }
  const hoje = hojeISO();
  const ordenados = blocos.slice().sort((a,b)=>a.ordem-b.ordem);
  for(const b of ordenados){ if(hoje>=b.dataInicio && hoje<=b.dataFim) return b; }
  return hoje < ordenados[0].dataInicio ? ordenados[0] : ordenados[ordenados.length-1];
}
function getBlocoAtual(usuario){
  usuario = usuario || usuarioAtual();
  return blocoAtualDoGrupo(getGrupoDoUsuario(usuario), usuario);
}
// o parâmetro se chama "blocos" e não "blocosDoGrupo" para não esconder a
// função de mesmo nome definida acima
function getBlocosPassados(blocoAtual, blocos){ return blocos.filter(b=>b.ordem < blocoAtual.ordem).sort((a,b)=>a.ordem-b.ordem); }
function getProximoBloco(blocoAtual, blocos){ return blocos.find(b=>b.ordem === blocoAtual.ordem+1) || null; }
function assuntoIdsDeEspecialidades(espIds){ return db.taxonomia.assuntos.filter(a=>espIds.includes(a.especialidadeId)).map(a=>a.id); }
function assuntoIdsDoBloco(bloco){ return bloco ? assuntoIdsDeEspecialidades(bloco.especialidadeIds) : []; }

/* ---------- dificuldade progressiva ----------
   score de 0 (mais fácil) a 100 (mais difícil), combinando:
   - taxa de acerto geral da questão (peso configurável, o maior dos três)
   - especificidade do assunto (fundamental/intermediário/avançado)
   - prevalência do assunto no banco (assuntos mais cobrados contam como
     prioridade/mais "básicos" de dominar primeiro — logo, menos "difíceis"
     nesta lógica de progressão de estudo) */
function especificidadeNivel(dificuldadeManual){
  return {fundamental:0, intermediario:0.5, avancado:1}[dificuldadeManual] ?? 0.5;
}
/* Prevalência de todos os assuntos, calculada de uma vez só e reaproveitada
   enquanto o banco não mudar (controlado por _geracaoDb, que saveState()
   incrementa a cada gravação). Sem esse cache, calcularDificuldade() refazia
   essa varredura do banco inteiro a cada questão — ok com 135 questões, mas
   ficaria lento à medida que o banco crescer para milhares. */
let _cachePrevalencias = null;
function mapaPrevalenciasAssuntos(){
  if(_cachePrevalencias && _cachePrevalencias.geracao===_geracaoDb) return _cachePrevalencias;
  const mapa = {};
  questoesAtivas().forEach(q=>{ mapa[q.assuntoId] = (mapa[q.assuntoId]||0)+1; });
  let max = 1;
  db.taxonomia.assuntos.forEach(a=>{ if((mapa[a.id]||0)>max) max = mapa[a.id]; });
  _cachePrevalencias = { geracao:_geracaoDb, mapa, max };
  return _cachePrevalencias;
}
function prevalenciaAssunto(assuntoId){
  return mapaPrevalenciasAssuntos().mapa[assuntoId] || 0;
}
function calcularDificuldade(q){
  const taxa = (q.estatisticas && q.estatisticas.respostas>0) ? (q.estatisticas.acertos/q.estatisticas.respostas) : 0.7;
  const espNivel = especificidadeNivel(q.dificuldadeManual);
  const cache = mapaPrevalenciasAssuntos();
  const prevNorm = (cache.mapa[q.assuntoId]||0)/cache.max;
  const pesos = (db.configGeral && db.configGeral.pesosDificuldade) || CONFIG.pesosDificuldade;
  const score = pesos.taxaAcerto*(1-taxa) + pesos.especificidade*espNivel + pesos.prevalencia*(1-prevNorm);
  return Math.round(score*100);
}
function rotuloDificuldade(score){ return score<35 ? "Fácil" : score<60 ? "Médio" : "Difícil"; }

/* ---------- respostas do usuário (consultas) ----------
   respostasDaQuestao() é chamada QUESTÃO A QUESTÃO por vários filtros (sessão
   recomendada, "só erros", desempenho...). Antes, cada chamada varria
   db.respostas inteiro (filter+sort) — imperceptível com poucas respostas,
   mas ao filtrar milhares de questões contra milhares de respostas isso vira
   uma varredura repetida (O(questões × respostas)), o mesmo tipo de gargalo
   já corrigido em calcularDificuldade(). Aqui o índice por usuário é montado
   uma vez (O(respostas)) e reaproveitado enquanto o banco não muda — mesma
   ideia de cache por _geracaoDb usada em mapaPrevalenciasAssuntos(). */
let _cacheRespostasPorUsuario = null;
function indiceRespostasDoUsuario(usuarioId){
  if(!_cacheRespostasPorUsuario || _cacheRespostasPorUsuario.geracao !== _geracaoDb){
    _cacheRespostasPorUsuario = { geracao:_geracaoDb, porUsuario:{} };
  }
  let idx = _cacheRespostasPorUsuario.porUsuario[usuarioId];
  if(!idx){
    idx = new Map();
    db.respostas.forEach(r=>{
      if(r.usuarioId!==usuarioId) return;
      if(!idx.has(r.questaoId)) idx.set(r.questaoId, []);
      idx.get(r.questaoId).push(r);
    });
    idx.forEach(arr=>arr.sort((a,b)=>a.data.localeCompare(b.data)));
    _cacheRespostasPorUsuario.porUsuario[usuarioId] = idx;
  }
  return idx;
}
function respostasDaQuestao(usuarioId, questaoId){
  return indiceRespostasDoUsuario(usuarioId).get(questaoId) || [];
}
function jaFoiRespondida(usuarioId, questaoId){ return respostasDaQuestao(usuarioId,questaoId).length>0; }
function ultimaResposta(usuarioId, questaoId){ const rs=respostasDaQuestao(usuarioId,questaoId); return rs.length?rs[rs.length-1]:null; }
function isFavorita(usuarioId, questaoId){ return db.favoritos.some(f=>f.usuarioId===usuarioId && f.questaoId===questaoId); }
function favoritoDe(usuarioId, questaoId){ return db.favoritos.find(f=>f.usuarioId===usuarioId && f.questaoId===questaoId) || null; }
function toggleFavorito(usuarioId, questaoId){
  const idx = db.favoritos.findIndex(f=>f.usuarioId===usuarioId && f.questaoId===questaoId);
  const nota = idx>=0 ? (db.favoritos[idx].nota||"") : "";
  if(idx>=0) db.favoritos.splice(idx,1); else db.favoritos.push({usuarioId,questaoId,data:hojeISO(),nota:""});
  // desfavoritar também sobe: o outro aparelho precisa saber que saiu
  nuvemRegistrar({favorito:{usuarioId, questaoId, data:hojeISO(), nota, removido: idx>=0}});
  saveState();
  return idx<0; // retorna true se acabou de favoritar
}

/* ---------- o mesmo para os flashcards ------------------------------------
   Cartão salvo é outra coisa de questão salva: um é "quero rever este
   conceito", o outro é "quero rever esta questão". Por isso são duas listas
   e duas abas em Favoritos, e não uma lista misturada em que o aluno procura
   a questão e tropeça em cartão. A estrutura é a mesma (dono + item + data),
   e o desfavoritar também sobe para a nuvem, para sumir nos outros
   aparelhos. */
function isFavoritoCartao(usuarioId, cartaoId){
  return (db.favoritosCartoes||[]).some(f=>f.usuarioId===usuarioId && f.cartaoId===cartaoId);
}
function toggleFavoritoCartao(usuarioId, cartaoId){
  if(!Array.isArray(db.favoritosCartoes)) db.favoritosCartoes = [];
  const idx = db.favoritosCartoes.findIndex(f=>f.usuarioId===usuarioId && f.cartaoId===cartaoId);
  if(idx>=0) db.favoritosCartoes.splice(idx,1);
  else db.favoritosCartoes.push({usuarioId, cartaoId, data:hojeISO()});
  nuvemRegistrar({favoritoCartao:{usuarioId, cartaoId, data:hojeISO(), removido: idx>=0}});
  saveState();
  return idx<0;
}
/* ---------- questões escondidas e quantas vezes cada uma foi errada -------
   Errar a mesma questão três vezes diz mais do que "última: errou" — por
   isso o número de erros aparece no cartão da questão, no feedback e na
   lista de Revisão. E há questão que a pessoa não quer mais ver: já
   entendeu o erro, ou a questão é de uma área que não vai prestar. Ela pode
   escondê-la. Escondida, a questão sai do estudo DAQUELA pessoa — a sessão
   do dia, a revisão espaçada, as filas de erro, as listas por filtro e as
   práticas por assunto — e só dela: não some do banco, das provas antigas
   (a prova inteira continua inteira), dos favoritos nem das estatísticas.
   Voltar a mostrar é um clique, em Revisão > Questões escondidas. */
let _cacheOcultas = null;
function idsOcultosDo(usuarioId){
  if(!_cacheOcultas || _cacheOcultas.geracao !== _geracaoDb) _cacheOcultas = { geracao:_geracaoDb, porUsuario:{} };
  let conj = _cacheOcultas.porUsuario[usuarioId];
  if(!conj){
    conj = new Set((db.questoesOcultas||[]).filter(o=>o.usuarioId===usuarioId).map(o=>o.questaoId));
    _cacheOcultas.porUsuario[usuarioId] = conj;
  }
  return conj;
}
function questaoOculta(usuarioId, questaoId){ return idsOcultosDo(usuarioId).has(questaoId); }
function ocultacaoDe(usuarioId, questaoId){ return (db.questoesOcultas||[]).find(o=>o.usuarioId===usuarioId && o.questaoId===questaoId) || null; }
/* As questões ativas que ainda entram no estudo desta pessoa. É o
   questoesAtivas() de toda tela que MONTA fila de estudo; telas que contam
   o banco ou montam prova inteira continuam no questoesAtivas(). */
function questoesParaEstudo(usuarioId, incluirGrupoId){
  const ocultas = idsOcultosDo(usuarioId);
  const ativas = questoesAtivas(incluirGrupoId);
  return ocultas.size ? ativas.filter(q=>!ocultas.has(q.id)) : ativas;
}
function alternarQuestaoOculta(usuarioId, questaoId){
  if(!Array.isArray(db.questoesOcultas)) db.questoesOcultas = [];
  const idx = db.questoesOcultas.findIndex(o=>o.usuarioId===usuarioId && o.questaoId===questaoId);
  if(idx>=0) db.questoesOcultas.splice(idx,1);
  else db.questoesOcultas.push({usuarioId, questaoId, data:hojeISO()});
  // voltar a mostrar também sobe: o outro aparelho precisa saber
  nuvemRegistrar({questaoOculta:{usuarioId, questaoId, data:hojeISO(), removido: idx>=0}});
  saveState();
  return idx<0; // true se acabou de esconder
}
function errosNaQuestao(usuarioId, questaoId){
  return respostasDaQuestao(usuarioId, questaoId).filter(r=>!r.correta).length;
}
/* Toda questão que a pessoa já errou alguma vez, com quantas vezes errou e
   quantas tentou — da mais errada para a menos, e, no empate, a do erro
   mais antigo primeiro. As escondidas vêm à parte (ocultas: true) para a
   tela poder listar as duas coisas separadas. */
function questoesErradasPeloUsuario(usuarioId, opts){
  opts = opts || {};
  const ocultas = idsOcultosDo(usuarioId);
  const lista = [];
  indiceRespostasDoUsuario(usuarioId).forEach((rs, questaoId)=>{
    const erros = rs.filter(r=>!r.correta).length;
    if(!erros) return;
    if(!!opts.ocultas !== ocultas.has(questaoId)) return;
    const q = getQuestao(questaoId);
    if(!q || q.status!=="ativa") return;
    const ultimoErro = rs.filter(r=>!r.correta).pop();
    lista.push({ questao:q, erros, tentativas: rs.length, ultima: rs[rs.length-1], ultimoErro });
  });
  return lista.sort((a,b)=> (b.erros-a.erros) || a.ultimoErro.data.localeCompare(b.ultimoErro.data));
}
function rotuloVezes(n){ return n===1 ? "1 vez" : n+" vezes"; }

function meusCartoesFavoritos(usuarioId){
  return (db.favoritosCartoes||[])
    .filter(f=>f.usuarioId===usuarioId)
    .map(f=>({reg:f, cartao:getFlashcard(f.cartaoId)}))
    .filter(x=>x.cartao)
    .sort((a,b)=>(b.reg.data||"").localeCompare(a.reg.data||""));
}

/* ---------- a anotação da questão salva ----------------------------------
   Guardar uma questão quase sempre vem com um motivo: "não entendi por que
   não é a C", "conferir a dose", "cai todo ano". Esse motivo sumia — a
   pessoa voltava à lista de favoritos semanas depois e via só o enunciado,
   sem lembrar o que queria tirar a limpo ali.

   A anotação é PESSOAL: fica junto do favorito daquele usuário e não tem
   nada a ver com os comentários públicos da questão (aqueles são dúvida
   feita à equipe, na fila de dúvidas, e todo mundo lê). Ela sobe para a
   nuvem com o resto do favorito, então acompanha a pessoa entre aparelhos.

   Anotar numa questão que ainda não estava salva salva a questão junto: era
   isso que a pessoa estava querendo fazer de qualquer jeito. */
function notaDaFavorita(usuarioId, questaoId){
  const f = favoritoDe(usuarioId, questaoId);
  return (f && f.nota) || "";
}
function salvarNotaFavorita(usuarioId, questaoId, texto){
  const nota = (texto||"").trim().slice(0, 2000);
  let f = favoritoDe(usuarioId, questaoId);
  const novaFavorita = !f;
  if(!f){
    f = {usuarioId, questaoId, data:hojeISO(), nota:""};
    db.favoritos.push(f);
  }
  f.nota = nota;
  nuvemRegistrar({favorito:{usuarioId, questaoId, data:f.data||hojeISO(), nota, removido:false}});
  saveState();
  return { novaFavorita, apagou: !nota };
}

/* ---------- repetição espaçada (baseada no algoritmo SM-2, simplificada) ----------
   Ideia: cada vez que o usuário responde, calculamos uma "qualidade" de 0 a 5
   cruzando ACERTO/ERRO com a CONFIANÇA que o usuário disse ter. Isso é o que
   implementa o pedido de "revisar de novo mesmo se acertei, mas chutei":
   um acerto no chute vale pouco (qualidade 3) e faz a questão voltar cedo. */
function qualidadeSM2(correta, confianca){
  if(correta && confianca==="certeza") return 5;
  if(correta && confianca==="duvida") return 4;
  if(correta && confianca==="chute") return 3;
  if(!correta && confianca==="chute") return 2;
  if(!correta && confianca==="duvida") return 1;
  return 0; // errou tendo certeza — pior cenário, indica lacuna real de conhecimento
}
function registrarRevisao(usuarioId, questaoId, correta, confianca){
  if(!db.revisoes[usuarioId]) db.revisoes[usuarioId] = {};
  const entry = db.revisoes[usuarioId][questaoId] || {repeticoes:0, fator:2.5, intervalo:0};
  const q = qualidadeSM2(correta, confianca);
  // escada de intervalos: os primeiros acertos seguidos sobem os degraus de
  // CONFIG.intervalosBase (1, 3, 7, 16, 35, 75 dias); depois de esgotar a
  // escada, o intervalo passa a crescer pelo fator, como no SM-2 clássico.
  const escada = (db.configGeral && db.configGeral.intervalosBase) || CONFIG.intervalosBase;
  if(q < 3){ entry.repeticoes = 0; entry.intervalo = escada[0]; }
  else{
    entry.intervalo = entry.repeticoes < escada.length ? escada[entry.repeticoes] : Math.round(entry.intervalo * entry.fator);
    entry.repeticoes += 1;
  }
  entry.fator = Math.max(1.3, entry.fator + (0.1 - (5-q)*(0.08+(5-q)*0.02)));
  // regra especial pedida: acertou no chute continua "voltando" logo, não deixamos
  // a questão "se aposentar" da revisão só porque o chute deu certo
  if(confianca==="chute"){ entry.intervalo = Math.min(entry.intervalo, 2); entry.repeticoes = Math.min(entry.repeticoes,1); }
  entry.proximaRevisao = somarDias(hojeISO(), entry.intervalo);
  entry.ultimaConfianca = confianca; entry.ultimaCorreta = correta; entry.ultimaData = hojeISO();
  db.revisoes[usuarioId][questaoId] = entry;
  nuvemRegistrar({usuarioId, questaoId, revisao:entry});
}
function revisaoVencida(usuarioId, questaoId){
  const entry = db.revisoes[usuarioId] && db.revisoes[usuarioId][questaoId];
  return !!entry && entry.proximaRevisao <= hojeISO();
}

/* ---------- FLASHCARDS: revisão rápida ------------------------------------
   A questão de múltipla escolha treina raciocínio clínico, mas é lenta e
   permite acertar por eliminação. O flashcard faz o oposto: obriga a
   lembrar do zero e leva segundos. É o formato certo para o problema que a
   plataforma chama de FALSA SEGURANÇA — assunto que o aluno marca "certeza"
   e erra. Por isso o baralho é montado nesta ordem de prioridade:

     1. cartões vencidos pela repetição espaçada dos próprios cartões;
     2. cartões de assuntos em que o aluno erra dizendo ter certeza;
     3. cartões gerados a partir de questões que ele errou com certeza ou
        acertou no chute (frente = enunciado, verso = gabarito comentado);
     4. cartões novos, ainda não vistos, do bloco atual;
     5. o resto do baralho, embaralhado.

   Os cartões gerados a partir de questões não ficam salvos: são montados na
   hora, com id previsível ("fc-q-" + id da questão), para que o histórico de
   revisão deles continue valendo entre sessões. */
function cartaoDeQuestao(q){
  if(!q) return null;
  const alternativaCerta = (q.alternativas||[]).find(a=>a.id===q.gabarito);
  return {
    id: "fc-q-"+q.id,
    origem: "questao",
    questaoId: q.id,
    assuntoId: q.assuntoId,
    status: "ativo",
    frente: q.enunciado,
    verso: (alternativaCerta ? q.gabarito+") "+alternativaCerta.texto : "Gabarito: "+q.gabarito)
           + (q.explicacaoGeral ? "\n\n"+q.explicacaoGeral : ""),
  };
}
/* Cartões que um usuário enxerga.

   Há dois tipos de cartão na plataforma, e a diferença importa:
   - cartão da EQUIPE (usuarioId ausente): escrito por professor, residente
     ou administrador de conteúdo; vale para todo mundo.
   - cartão do ALUNO (usuarioId preenchido): criado por ele durante a
     resolução das questões; é caderno pessoal e não aparece para mais
     ninguém, porque é anotação de estudo, não material publicado.

   Chamar sem argumento devolve os cartões do usuário logado. */
function flashcardsAtivos(usuarioId){
  const uid = usuarioId!==undefined ? usuarioId : (usuarioAtual() ? usuarioAtual().id : null);
  return (db.flashcards||[]).filter(c=>{
    if(c.status==="arquivado") return false;
    if(!c.usuarioId) return true;        // cartão da equipe: visível a todos
    return c.usuarioId === uid;           // cartão pessoal: só para o dono
  });
}
/* Só os cartões da equipe — usado na tela de manutenção e no material em PDF,
   onde faz diferença não misturar caderno de aluno com material oficial. */
function flashcardsDaEquipe(){
  return (db.flashcards||[]).filter(c=>c.status!=="arquivado" && !c.usuarioId);
}
function meusFlashcards(usuarioId){
  return (db.flashcards||[]).filter(c=>c.status!=="arquivado" && c.usuarioId===usuarioId);
}
function getFlashcard(id){
  const salvo = (db.flashcards||[]).find(c=>c.id===id);
  if(salvo) return salvo;
  if(id && id.indexOf("fc-q-")===0) return cartaoDeQuestao(getQuestao(id.slice(5)));
  return null;
}
function revisaoDoCartao(usuarioId, cartaoId){
  return (db.revisoesFlashcards[usuarioId]||{})[cartaoId] || null;
}
function cartaoVencido(usuarioId, cartaoId){
  const e = revisaoDoCartao(usuarioId, cartaoId);
  return !!e && e.proximaRevisao <= hojeISO();
}
/* Mesma lógica SM-2 das questões, com a autoavaliação no lugar da confiança:
   "não lembrei" = 0, "quase" = 3, "sabia" = 5. */
function registrarRevisaoFlashcard(usuarioId, cartaoId, nota){
  if(!db.revisoesFlashcards) db.revisoesFlashcards = {};
  if(!db.revisoesFlashcards[usuarioId]) db.revisoesFlashcards[usuarioId] = {};
  const entry = db.revisoesFlashcards[usuarioId][cartaoId] || {repeticoes:0, fator:2.5, intervalo:0, vistas:0};
  const q = nota==="sabia" ? 5 : nota==="quase" ? 3 : 0;
  if(q < 3){ entry.repeticoes = 0; entry.intervalo = 1; }
  else{
    if(entry.repeticoes===0) entry.intervalo = 1;
    else if(entry.repeticoes===1) entry.intervalo = 4;
    else entry.intervalo = Math.round(entry.intervalo * entry.fator);
    entry.repeticoes += 1;
  }
  entry.fator = Math.max(1.3, entry.fator + (0.1 - (5-q)*(0.08+(5-q)*0.02)));
  // "quase" nunca deixa o cartão dormir muito: é o sinal clássico de falsa segurança
  if(nota==="quase") entry.intervalo = Math.min(entry.intervalo, 3);
  entry.proximaRevisao = somarDias(hojeISO(), entry.intervalo);
  entry.ultimaNota = nota; entry.ultimaData = hojeISO();
  entry.vistas = (entry.vistas||0) + 1;
  db.revisoesFlashcards[usuarioId][cartaoId] = entry;
  nuvemRegistrar({usuarioId, cartaoId, revisaoCartao:entry});
  // diário de dias com cartão revisado, que alimenta a sequência diária
  if(!db.diasCartoes) db.diasCartoes = {};
  if(!db.diasCartoes[usuarioId]) db.diasCartoes[usuarioId] = [];
  if(!db.diasCartoes[usuarioId].includes(hojeISO())) db.diasCartoes[usuarioId].push(hojeISO());
  /* Quantos cartões naquele dia. Precisa ser um contador à parte porque cada
     cartão guarda só a ÚLTIMA data em que foi visto: rever hoje um cartão de
     ontem apagaria ontem da conta. É esse número que o Histórico de Atividade
     mostra ao lado das questões do dia. */
  if(!db.cartoesPorDia) db.cartoesPorDia = {};
  if(!db.cartoesPorDia[usuarioId]) db.cartoesPorDia[usuarioId] = {};
  const feitosNoDia = (db.cartoesPorDia[usuarioId][hojeISO()] || 0) + 1;
  db.cartoesPorDia[usuarioId][hojeISO()] = feitosNoDia;
  nuvemRegistrar({usuarioId, diaCartao:hojeISO(), quantidadeCartoesDoDia:feitosNoDia});
  saveState();
}
/* Monta o baralho da sessão de revisão rápida. `filtro` aceita
   {assuntoId, especialidadeId, areaId, somenteFalsaSeguranca} */
function montarBaralhoFlashcards(usuarioId, tamanho, filtro){
  filtro = filtro || {};
  tamanho = tamanho || 20;
  const hoje = hojeISO();
  const assuntosFalsos = assuntosComFalsaSeguranca(usuarioId).map(f=>f.assuntoId);

  const combinaFiltro = (assuntoId)=>{
    if(filtro.assuntoId && assuntoId!==filtro.assuntoId) return false;
    if(filtro.especialidadeId){
      const a = getAssunto(assuntoId);
      if(!a || a.especialidadeId!==filtro.especialidadeId) return false;
    }
    if(filtro.areaId){
      const a = getAssunto(assuntoId); const e = a ? getEspecialidade(a.especialidadeId) : null;
      if(!e || e.areaId!==filtro.areaId) return false;
    }
    if(filtro.somenteFalsaSeguranca && !assuntosFalsos.includes(assuntoId)) return false;
    return true;
  };

  // 1) cartões autorais que passam pelo filtro
  let candidatos = flashcardsAtivos(usuarioId).filter(c=>combinaFiltro(c.assuntoId));

  // 2) cartões gerados a partir das questões mais "caras" do histórico:
  //    errou com certeza e acertou no chute são as duas pontas da má calibração
  const questoesCaras = []
    .concat(questoesErroComCerteza(usuarioId).map(x=>x.questao||x))
    .concat(questoesAcertoNoChute(usuarioId).map(x=>x.questao||x))
    .filter(q=>q && combinaFiltro(q.assuntoId));
  const jaIncluidas = {};
  questoesCaras.forEach(q=>{
    if(jaIncluidas[q.id]) return;
    jaIncluidas[q.id] = true;
    const c = cartaoDeQuestao(q);
    if(c) candidatos.push(c);
  });

  if(!candidatos.length) return [];

  const blocoAtual = getBlocoAtual();
  const assuntosDoBloco = assuntoIdsDoBloco(blocoAtual);

  const prioridade = (c)=>{
    const rev = revisaoDoCartao(usuarioId, c.id);
    if(rev && rev.proximaRevisao <= hoje) return 0;                    // vencido
    if(assuntosFalsos.includes(c.assuntoId)) return 1;                 // falsa segurança
    if(c.origem==="questao") return 2;                                 // erro caro recente
    if(!rev) return assuntosDoBloco.includes(c.assuntoId) ? 3 : 4;     // novo (bloco atual primeiro)
    return 5;
  };
  return embaralhar(candidatos)
    .map(c=>({cartao:c, p:prioridade(c)}))
    .sort((a,b)=>a.p-b.p)
    .slice(0, tamanho)
    .map(x=>x.cartao);
}
/* Números mostrados na tela de Revisão e no painel inicial. */
function resumoFlashcards(usuarioId){
  const ativos = flashcardsAtivos(usuarioId);
  const revs = db.revisoesFlashcards[usuarioId] || {};
  const vencidos = ativos.filter(c=>cartaoVencido(usuarioId, c.id)).length;
  const novos = ativos.filter(c=>!revs[c.id]).length;
  const falsos = assuntosComFalsaSeguranca(usuarioId).map(f=>f.assuntoId);
  const deFalsaSeguranca = ativos.filter(c=>falsos.includes(c.assuntoId)).length;
  return {
    total:ativos.length, vencidos, novos, deFalsaSeguranca,
    meus: meusFlashcards(usuarioId).length,
  };
}

/* ---------- revisão periódica por ASSUNTO (visão mais "de cima") ----------
   Baseada na taxa de acerto recente (últimas 10 respostas) daquele assunto:
   quanto pior a taxa, mais cedo o assunto inteiro volta a ser sugerido. */
function proximaRevisaoAssunto(usuarioId, assuntoId){
  const respostas = db.respostas.filter(r=>r.usuarioId===usuarioId && r.assuntoId===assuntoId).sort((a,b)=>a.data.localeCompare(b.data));
  if(!respostas.length) return null;
  const ultimas = respostas.slice(-10);
  const taxa = ultimas.filter(r=>r.correta).length/ultimas.length;
  const ultimaData = respostas[respostas.length-1].data;
  const intervalo = taxa>=0.8 ? 21 : taxa>=0.6 ? 14 : taxa>=0.4 ? 7 : 3;
  return { proxima: somarDias(ultimaData, intervalo), taxa, ultimaData, intervaloAplicado:intervalo };
}
function assuntosParaRevisarHoje(usuarioId){
  const assuntosEstudados = [...new Set(db.respostas.filter(r=>r.usuarioId===usuarioId).map(r=>r.assuntoId))];
  return assuntosEstudados.map(assuntoId=>{
    const info = proximaRevisaoAssunto(usuarioId, assuntoId);
    return info ? {assuntoId, ...info, atrasoDias: diasEntre(info.proxima, hojeISO())} : null;
  }).filter(x=>x && x.proxima<=hojeISO()).sort((a,b)=>b.atrasoDias-a.atrasoDias);
}

/* ---------- montagem de sessões de estudo ---------- */
function selecionarComInterleaving(pool, quantidade, pesos){
  // agrupa por assunto, ordena cada grupo do mais fácil ao mais difícil, e
  // intercala entre os grupos (em vez de esgotar um assunto antes de ir pro
  // próximo) — isso é o princípio de "interleaving" citado na recomendação
  // científica: misturar assuntos ajuda a discriminar diagnósticos parecidos.
  // Com `pesos` (assuntoId -> peso), a ordem dos assuntos continua sorteada,
  // mas o sorteio favorece os de peso maior (o que mais cai e a pessoa erra):
  // cada grupo recebe a chave aleatório^(1/peso) e a lista vai da maior
  // chave para a menor — peso 4 tende a vir antes de peso 1, sem garantia.
  const porAssunto = {};
  pool.forEach(q=>{ (porAssunto[q.assuntoId] = porAssunto[q.assuntoId]||[]).push(q); });
  const grupos = pesos
    ? Object.values(porAssunto).map(g=>({g, chave: Math.pow(Math.random(), 1/(pesos[g[0].assuntoId]||1))})).sort((a,b)=>b.chave-a.chave).map(x=>x.g)
    : embaralhar(Object.values(porAssunto));
  grupos.forEach(lista=> lista.sort((a,b)=>calcularDificuldade(a)-calcularDificuldade(b)));
  const resultado = [];
  let i=0, tentativas=0;
  while(resultado.length<quantidade && grupos.some(g=>g.length>0) && tentativas < quantidade*20){
    const g = grupos[i % grupos.length];
    if(g.length>0) resultado.push(g.shift());
    i++; tentativas++;
  }
  return resultado;
}

function anoDaData(iso){ return parseInt((iso||"").slice(0,4)) || 0; }

/* Assuntos que o aluno já viu em ANOS ANTERIORES — seja porque o calendário
   do grupo tem blocos de anos passados, seja porque ele respondeu questões
   daquele assunto em outro ano. É esse material que sustenta a revisão nos
   primeiros blocos do ano novo, quando ainda não há bloco anterior no
   calendário corrente. */
function assuntosDeAnosAnteriores(usuarioId){
  const usuario = getUsuario(usuarioId);
  if(!usuario) return [];
  const anoAtual = CONFIG.hoje().getFullYear();
  const grupo = getGrupoDoUsuario(usuario);
  const conjunto = new Set();
  blocosDoGrupo(grupo).filter(b=>anoDaData(b.dataFim) < anoAtual).forEach(b=>assuntoIdsDoBloco(b).forEach(a=>conjunto.add(a)));
  db.respostas.filter(r=>r.usuarioId===usuarioId && anoDaData(r.data) < anoAtual).forEach(r=>{ if(r.assuntoId) conjunto.add(r.assuntoId); });
  return [...conjunto];
}

/* Mistura realmente aplicada à sessão recomendada deste aluno, já com o
   ajuste de começo de ano. Devolve também uma explicação em português para
   a tela mostrar — a plataforma nunca muda a proporção em silêncio. */
function misturaEfetiva(usuario){
  usuario = usuario || usuarioAtual();
  const base = (db.configGeral && db.configGeral.misturaBlocos) || CONFIG.misturaBlocos;
  const rampa = (db.configGeral && db.configGeral.rampaRevisaoInicio) || CONFIG.rampaRevisaoInicio;
  const grupo = getGrupoDoUsuario(usuario);
  const blocoAtual = getBlocoAtual(usuario);
  const passados = blocoAtual ? getBlocosPassados(blocoAtual, blocosDoGrupo(grupo)) : [];
  const assuntosPassados = passados.flatMap(assuntoIdsDoBloco);
  const anteriores = assuntosDeAnosAnteriores(usuario.id);
  const indice = blocoAtual ? Math.max(0, blocoAtual.ordem-1) : 0;

  if(anteriores.length){
    return {...base, ajustada:false, temAnteriores:true, indiceBloco:indice,
      explicacao:"A revisão está na proporção cheia desde o primeiro bloco porque há matéria de anos anteriores disponível ("+anteriores.length+" assunto(s) já estudado(s) antes deste ano) para alimentar a revisão espaçada."};
  }
  if(indice >= rampa.length){
    return {...base, ajustada:false, temAnteriores:false, indiceBloco:indice, explicacao:""};
  }
  let alvo = Math.min(base.revisaoPassados, rampa[indice] || 0);
  if(!assuntosPassados.length) alvo = 0;
  const sobra = Math.max(0, base.revisaoPassados - alvo);
  return {
    atual: base.atual + sobra,
    revisaoPassados: alvo,
    previaFuturos: base.previaFuturos,
    ajustada: true, temAnteriores:false, indiceBloco:indice,
    explicacao: "Começo de ano: como ainda não há matéria de anos anteriores para revisar, a carga de revisão entra devagar — "+
      rampa.map((v,i)=>Math.round(v*100)+"%").join(", ")+" nos três primeiros blocos. Neste bloco (o "+(indice+1)+"º) a revisão está em "+
      Math.round(alvo*100)+"%, e o que sobra volta para o bloco atual.",
  };
}

function montarSessaoRecomendada(usuarioId, tamanho){
  const usuario = getUsuario(usuarioId);
  const grupo = getGrupoDoUsuario(usuario);
  const blocoAtual = getBlocoAtual(usuario);
  const blocosGrupo = blocosDoGrupo(grupo);
  const passados = getBlocosPassados(blocoAtual, blocosGrupo);
  const proximo = getProximoBloco(blocoAtual, blocosGrupo);
  const mistura = misturaEfetiva(usuario);

  const assuntosAtual = assuntoIdsDoBloco(blocoAtual);
  // a revisão considera os blocos já vencidos DESTE ano e também o que o aluno
  // estudou em anos anteriores (essencial no começo do ano letivo)
  const assuntosPassados = [...new Set([...passados.flatMap(assuntoIdsDoBloco), ...assuntosDeAnosAnteriores(usuarioId)])];
  const assuntosFuturos = proximo ? assuntoIdsDoBloco(proximo) : [];

  const nAtual = Math.round(tamanho*mistura.atual);
  const nRevisao = Math.round(tamanho*mistura.revisaoPassados);
  const nPrevia = Math.max(0, tamanho - nAtual - nRevisao);

  const poolAtual = questoesParaEstudo(usuarioId).filter(q=>assuntosAtual.includes(q.assuntoId));
  const pesos = pesosDeIncidencia(usuarioId);
  const destaque = assuntosQueMaisCaem(usuarioId);
  const itensAtual = selecionarComInterleaving(poolAtual, nAtual, pesos).map(q=>({questaoId:q.id,
    motivo:"Bloco atual — "+blocoAtual.nome + (destaque.has(q.assuntoId) ? " · prioridade: cai muito na "+bancaDeReferencia() : "")}));

  let poolRevisaoVencida = questoesParaEstudo(usuarioId).filter(q=>assuntosPassados.includes(q.assuntoId) && jaFoiRespondida(usuarioId,q.id) && revisaoVencida(usuarioId,q.id));
  poolRevisaoVencida.sort((a,b)=>{
    const ea = db.revisoes[usuarioId][a.id], eb = db.revisoes[usuarioId][b.id];
    return ea.proximaRevisao.localeCompare(eb.proximaRevisao); // mais atrasada (data mais antiga) primeiro
  });
  let itensRevisao = poolRevisaoVencida.slice(0,nRevisao).map(q=>{
    const atraso = diasEntre(db.revisoes[usuarioId][q.id].proximaRevisao, hojeISO());
    return {questaoId:q.id, motivo: atraso>0 ? "Revisão espaçada — vencida há "+atraso+" dia(s)" : "Revisão espaçada — no prazo"};
  });
  if(itensRevisao.length < nRevisao){
    const faltam = nRevisao - itensRevisao.length;
    const poolNaoVistas = questoesParaEstudo(usuarioId).filter(q=>assuntosPassados.includes(q.assuntoId) && !jaFoiRespondida(usuarioId,q.id) && !itensRevisao.some(it=>it.questaoId===q.id));
    embaralhar(poolNaoVistas).slice(0,faltam).forEach(q=>itensRevisao.push({questaoId:q.id, motivo:"Assunto de bloco anterior ainda não estudado"}));
  }

  const poolPrevia = questoesParaEstudo(usuarioId).filter(q=>assuntosFuturos.includes(q.assuntoId) && q.dificuldadeManual==="fundamental");
  const itensPrevia = embaralhar(poolPrevia).slice(0,nPrevia).map(q=>({questaoId:q.id, motivo: proximo ? "Prévia do próximo bloco — "+proximo.nome : "Prévia"}));

  let todos = [...itensAtual, ...itensRevisao, ...itensPrevia];
  // se o banco de demonstração não tiver questões suficientes para preencher a
  // meta, completamos com quaisquer questões ativas ainda não usadas nesta sessão
  if(todos.length < tamanho){
    const usados = new Set(todos.map(t=>t.questaoId));
    const extras = embaralhar(questoesParaEstudo(usuarioId).filter(q=>!usados.has(q.id))).slice(0,tamanho-todos.length)
      .map(q=>({questaoId:q.id, motivo:"Complemento — banco de demonstração ainda é pequeno"}));
    todos = [...todos, ...extras];
  }
  return embaralhar(todos);
}

function buscarQuestoesPorFiltro(usuarioId, filtros){
  // telas de equipe (PDF) pedem o banco inteiro; as de estudo, só o que a
  // pessoa não escondeu
  let pool = filtros.incluirInativas ? db.questoes.slice() : questoesParaEstudo(usuarioId, filtros.incluirGrupoId);
  if(filtros.areaIds && filtros.areaIds.length) pool = pool.filter(q=>filtros.areaIds.includes(q.areaId));
  if(filtros.especialidadeIds && filtros.especialidadeIds.length) pool = pool.filter(q=>filtros.especialidadeIds.includes(q.especialidadeId));
  if(filtros.assuntoIds && filtros.assuntoIds.length) pool = pool.filter(q=>filtros.assuntoIds.includes(q.assuntoId));
  if(filtros.bancas && filtros.bancas.length) pool = pool.filter(q=>filtros.bancas.includes(q.banca));
  if(filtros.anos && filtros.anos.length) pool = pool.filter(q=>filtros.anos.includes(q.ano));
  if(filtros.apenasErros) pool = pool.filter(q=>{ const u=ultimaResposta(usuarioId,q.id); return u && (!u.correta || u.confianca==="chute"); });
  if(filtros.apenasFavoritas) pool = pool.filter(q=>isFavorita(usuarioId,q.id));
  if(filtros.apenasNaoRespondidas) pool = pool.filter(q=>!jaFoiRespondida(usuarioId,q.id));
  return pool;
}

function questoesErroOrdenadasPorAntiguidade(usuarioId){
  const pool = questoesParaEstudo(usuarioId).filter(q=>{
    const u = ultimaResposta(usuarioId,q.id);
    return u && (!u.correta || u.confianca==="chute");
  });
  return pool.map(q=>({questao:q, ultima:ultimaResposta(usuarioId,q.id)}))
    .sort((a,b)=>a.ultima.data.localeCompare(b.ultima.data)); // mais antigas primeiro
}

/* A revisão não pode se basear só em erro: mesmo quem acertou com certeza
   esquece com o tempo. Esta função junta TODAS as questões já respondidas
   cujo prazo de revisão espaçada (SM-2) já venceu — acertos e erros — e
   mostra, pra transparência, se cada uma volta por erro/chute recente ou
   por decaimento natural (fazia tempo que não via, mesmo tendo acertado). */
function questoesRevisaoEspacadaVencidas(usuarioId){
  const revisoesDoUsuario = db.revisoes[usuarioId] || {};
  const pool = questoesParaEstudo(usuarioId).filter(q => revisaoVencida(usuarioId, q.id));
  return pool.map(q=>{
    const entry = revisoesDoUsuario[q.id];
    const motivo = (!entry.ultimaCorreta || entry.ultimaConfianca==="chute") ? "erro" : "decaimento";
    return {questao:q, entry, motivo};
  }).sort((a,b)=>a.entry.proximaRevisao.localeCompare(b.entry.proximaRevisao)); // mais atrasada primeiro
}

/* ---------- registrar uma resposta (retrieval practice) ---------- */
function registrarResposta(usuarioId, questaoId, alternativaEscolhida, confianca, tempoSeg){
  const q = getQuestao(questaoId);
  const correta = alternativaEscolhida === q.gabarito;
  const resposta = {
    id:uid("r"), usuarioId, questaoId,
    areaId:q.areaId, especialidadeId:q.especialidadeId, assuntoId:q.assuntoId,
    alternativaEscolhida, correta, confianca, data:hojeISO(),
    tempoSeg: (tempoSeg && tempoSeg>0 && tempoSeg<3600) ? Math.round(tempoSeg) : null,
    sessaoId: state.sessaoAtual ? state.sessaoAtual.id : null,
  };
  db.respostas.push(resposta);
  nuvemRegistrar({resposta});          // entra na fila de envio para a nuvem
  q.estatisticas.respostas += 1;
  if(correta) q.estatisticas.acertos += 1;
  q.estatisticas.distribuicaoAlternativas[alternativaEscolhida] = (q.estatisticas.distribuicaoAlternativas[alternativaEscolhida]||0)+1;
  // Estatística de qualidade da questão: qual alternativa o aluno já tinha
  // RISCADO (eliminado) quando ele acabou errando. Um distrator eliminado
  // com frequência por quem erra é inofensivo (todo mundo já sabia que era
  // errado); a informação valiosa é quando o gabarito aparece aqui — sinal
  // de que a resposta certa está disfarçada de errada para o aluno.
  if(!correta){
    if(!q.estatisticas.eliminacoesAoErrar) q.estatisticas.eliminacoesAoErrar = {};
    eliminadasDaQuestao(questaoId).forEach(altId=>{
      q.estatisticas.eliminacoesAoErrar[altId] = (q.estatisticas.eliminacoesAoErrar[altId]||0)+1;
    });
  }
  registrarRevisao(usuarioId, questaoId, correta, confianca);
  saveState();
  return resposta;
}

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
  iniciarSessaoComLista(embaralhar(pool).slice(0,15).map(q=>({questaoId:q.id, motivo:"Assunto em que sua confiança não bate com o acerto: "+nomeAssunto(assuntoId)})), "pratica");
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
    if(getGrupoDoUsuario(usuario).oficial){
      notifs.push({icon:"users", texto:"Escolha a sua turma do rodízio (Grupo A, B, C ou D) — até lá você segue o calendário oficial.", rota:"meu-grupo"});
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
  if(usuario.papel==="admin"){
    const pendCad = db.usuarios.filter(x=>x.status==="pendente").length;
    if(pendCad) notifs.push({icon:"check", texto:pendCad+" cadastro(s) aguardando aprovação.", rota:"aprovar-cadastros"});
    const diasSemBackup = db.ultimoBackupEm ? diasEntre(db.ultimoBackupEm, hojeISO()) : 999;
    if(diasSemBackup>=7) notifs.push({icon:"archive", texto: db.ultimoBackupEm ? "Já se passaram "+diasSemBackup+" dias desde o último backup. Exporte um novo." : "Você ainda não fez nenhum backup dos dados. Exporte um agora.", rota:"perfil"});
    const feedbacksNaoLidos = db.feedbacks.filter(f=>!f.lido).length;
    if(feedbacksNaoLidos) notifs.push({icon:"message", texto:feedbacksNaoLidos+" feedback(s) novo(s) de usuários.", rota:"feedback-usuarios"});
  }
  if(usuario.papel==="admin" || usuario.papel==="professor"){
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
function renderNotificacoesCard(usuario){
  const notifs = gerarNotificacoes(usuario);
  if(!notifs.length) return "";
  return `<div class="card mb-2" style="border-color:var(--accent)">
    <div class="card-title" style="margin-bottom:.5rem">${iconeSvg("alert")} Notificações</div>
    ${notifs.map(n=>`<div class="flex items-center gap-1 mb-1" ${n.rota?`style="cursor:pointer" onclick="${n.aba?`mudarAbaProvas('${n.aba}');`:""}navigate('${n.rota}')"`:""}>${iconeSvg(n.icon)}<span class="text-sm">${escapeHtml(n.texto)}</span></div>`).join("")}
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
    vencidos: entradas.filter(r => r.proximaRevisao && r.proximaRevisao <= hoje).length,
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
function bancasComProvaReal(){
  const m = {};
  db.questoes.forEach(q=>{ if(q.real && q.banca){ (m[q.banca] = m[q.banca] || new Set()).add(q.ano); } });
  return Object.keys(m).sort().map(b=>({ banca:b, anos:[...m[b]].sort() }));
}
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
