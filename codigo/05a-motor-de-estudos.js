/* codigo/05a-motor-de-estudos.js — Motor de estudos (seção 4), parte 1: bloco atual, dificuldade, respostas, questões escondidas, repetição espaçada, flashcards, montagem de sessões e registro da resposta.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

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

/* QUESTÃO À ESPERA DA FIGURA. Uma questão que depende de uma imagem da prova
   (ECG, radiografia, tabela) que ainda não foi anexada traz `imagemPendente`
   — a descrição do que a prova mostrava. Sem a figura ela não se resolve
   direito, então fica FORA de tudo o que monta fila para o aluno (estudo,
   revisão, provas antigas, simulados, estatísticas): continua no banco,
   separada para a equipe (Banco de Questões > Status > "Aguardando imagem").
   Ela volta sozinha quando a figura chega: apagando `imagemPendente` no
   arquivo de dados/, ou pela própria tela de edição da questão (anexar a
   imagem ou marcar "a imagem já chegou"). */
function aguardaImagem(q){ return !!(q && q.imagemPendente); }

/* TIPO DE PROVA: residência ou graduação (CONFIG.tiposProva). A questão diz
   o seu em `tipoProva`; sem o campo, vale o padrão (residência) — exceto o
   Teste de Progresso, que é da graduação pelo próprio nome, para ninguém
   precisar lembrar de marcar. */
function tipoProvaValido(id){ return CONFIG.tiposProva.some(t=>t.id===id); }
function tipoProvaDe(q){
  if(q && tipoProvaValido(q.tipoProva)) return q.tipoProva;
  return q && /progresso/i.test(q.banca||"") ? "graduacao" : CONFIG.tipoProvaPadrao;
}
function infoTipoProva(id){ return CONFIG.tiposProva.find(t=>t.id===id) || CONFIG.tiposProva.find(t=>t.id===CONFIG.tipoProvaPadrao); }
/* "Graduação", "graduacao", "Teste de Progresso" → "graduacao". Devolve null
   quando o texto não diz nada reconhecível (quem chamou decide o padrão). */
function normalizarTipoProva(texto){
  const t = String(texto||"").trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  if(!t) return null;
  if(t.startsWith("grad") || t.includes("progresso") || t.includes("faculdade")) return "graduacao";
  if(t.startsWith("resid") || t.startsWith("r1")) return "residencia";
  return null;
}
/* 3º e 4º ano estudam primeiro pela prova da graduação (CONFIG.anosQuePriorizamGraduacao). */
function priorizaGraduacao(usuario){
  return !!(usuario && (CONFIG.anosQuePriorizamGraduacao||[]).includes(usuario.anoFaculdade));
}
function tipoProvaPreferido(usuario){ return priorizaGraduacao(usuario) ? "graduacao" : null; }
// põe na frente as questões do tipo preferido, sem mudar a ordem dentro de cada metade
function primeiroDoTipo(lista, tipo){
  if(!tipo) return lista;
  const antes = [], depois = [];
  lista.forEach(q=>(tipoProvaDe(q)===tipo ? antes : depois).push(q));
  return antes.concat(depois);
}

function questoesAtivas(incluirGrupoId){
  // "ativa" exclui questões anuladas ou desatualizadas de sessões e estatísticas,
  // conforme pedido: nunca usar questão anulada/desatualizada para calcular dificuldade.
  // Questões marcadas com um grupoId (upload de aluno pro próprio grupo) ficam
  // escondidas do banco geral por padrão — só entram se o chamador pedir
  // explicitamente esse grupo (incluirGrupoId = id do grupo) ou tudo (true).
  return db.questoes.filter(q=>{
    if(q.status!=="ativa") return false;
    if(aguardaImagem(q)) return false;
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
    if(!q || q.status!=="ativa" || aguardaImagem(q)) return;
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
function selecionarComInterleaving(pool, quantidade, pesos, tipoPreferido){
  // agrupa por assunto, ordena cada grupo do mais fácil ao mais difícil, e
  // intercala entre os grupos (em vez de esgotar um assunto antes de ir pro
  // próximo) — isso é o princípio de "interleaving" citado na recomendação
  // científica: misturar assuntos ajuda a discriminar diagnósticos parecidos.
  // Com `pesos` (assuntoId -> peso), a ordem dos assuntos continua sorteada,
  // mas o sorteio favorece os de peso maior (o que mais cai e a pessoa erra):
  // cada grupo recebe a chave aleatório^(1/peso) e a lista vai da maior
  // chave para a menor — peso 4 tende a vir antes de peso 1, sem garantia.
  // Com `tipoPreferido` ("graduacao" no 3º e 4º ano), dentro de cada assunto
  // as questões daquele tipo de prova vêm antes das outras.
  const porAssunto = {};
  pool.forEach(q=>{ (porAssunto[q.assuntoId] = porAssunto[q.assuntoId]||[]).push(q); });
  const grupos = pesos
    ? Object.values(porAssunto).map(g=>({g, chave: Math.pow(Math.random(), 1/(pesos[g[0].assuntoId]||1))})).sort((a,b)=>b.chave-a.chave).map(x=>x.g)
    : embaralhar(Object.values(porAssunto));
  const foraDoTipo = q => tipoPreferido && tipoProvaDe(q)!==tipoPreferido ? 1 : 0;
  grupos.forEach(lista=> lista.sort((a,b)=>foraDoTipo(a)-foraDoTipo(b) || calcularDificuldade(a)-calcularDificuldade(b)));
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
  // 3º e 4º ano: a prova da graduação na frente (CONFIG.anosQuePriorizamGraduacao)
  const tipoPref = tipoProvaPreferido(usuario);
  const doTipo = q => tipoPref && tipoProvaDe(q)===tipoPref ? " · "+infoTipoProva(tipoPref).nomeLongo.toLowerCase()+" (prioridade do "+usuario.anoFaculdade+")" : "";
  const itensAtual = selecionarComInterleaving(poolAtual, nAtual, pesos, tipoPref).map(q=>({questaoId:q.id,
    motivo:"Bloco atual — "+blocoAtual.nome + (destaque.has(q.assuntoId) ? " · prioridade: cai muito na "+bancaDeReferencia() : "") + doTipo(q)}));

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
    primeiroDoTipo(embaralhar(poolNaoVistas), tipoPref).slice(0,faltam).forEach(q=>itensRevisao.push({questaoId:q.id, motivo:"Assunto de bloco anterior ainda não estudado"+doTipo(q)}));
  }

  const poolPrevia = questoesParaEstudo(usuarioId).filter(q=>assuntosFuturos.includes(q.assuntoId) && q.dificuldadeManual==="fundamental");
  const itensPrevia = primeiroDoTipo(embaralhar(poolPrevia), tipoPref).slice(0,nPrevia).map(q=>({questaoId:q.id, motivo: (proximo ? "Prévia do próximo bloco — "+proximo.nome : "Prévia")+doTipo(q)}));

  let todos = [...itensAtual, ...itensRevisao, ...itensPrevia];
  // se o banco de demonstração não tiver questões suficientes para preencher a
  // meta, completamos com quaisquer questões ativas ainda não usadas nesta sessão
  if(todos.length < tamanho){
    const usados = new Set(todos.map(t=>t.questaoId));
    const extras = primeiroDoTipo(embaralhar(questoesParaEstudo(usuarioId).filter(q=>!usados.has(q.id))), tipoPref).slice(0,tamanho-todos.length)
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
  if(filtros.tiposProva && filtros.tiposProva.length) pool = pool.filter(q=>filtros.tiposProva.includes(tipoProvaDe(q)));
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
