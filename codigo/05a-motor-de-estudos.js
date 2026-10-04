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
/* PROGRESSÃO CONSOLIDAÇÃO → RESIDÊNCIA (CONFIG.progressaoConsolidacao).
   "Consolidação" é tudo o que não é prova real de residência: as questões
   autorais (banco didático, demonstração) e as provas da graduação. */
function ehConsolidacao(q){ return !q.real || tipoProvaDe(q)==="graduacao"; }
function fracaoConsolidacao(usuario){
  const mapa = (db.configGeral && db.configGeral.progressaoConsolidacao) || CONFIG.progressaoConsolidacao || {};
  const f = mapa[(usuario && usuario.anoFaculdade) || CONFIG.anoFaculdadePadrao];
  return typeof f==="number" ? Math.min(1, Math.max(0, f)) : 0;
}
/* "3º ano: 70% consolidação, 30% residência" — o texto que a tela mostra. */
function textoProgressao(usuario){
  const c = Math.round(fracaoConsolidacao(usuario)*100);
  return c+"% consolidação de conhecimento e "+(100-c)+"% provas reais de residência";
}
/* Na graduação (3º e 4º ano) a consolidação é maioria: Provas Antigas abre
   pela prova da graduação, que é a que consolida. */
function priorizaGraduacao(usuario){ return fracaoConsolidacao(usuario) >= 0.5; }
function tipoProvaPreferido(usuario){ return priorizaGraduacao(usuario) ? "graduacao" : null; }
/* Escolhe `n` questões do pool na proporção do ano do aluno. `selecionar
   (pool, k)` é o critério de cada trecho da sessão (interleaving, sorteio…).
   Se um dos lados não tem questão suficiente naquele trecho, o outro cobre a
   falta — a sessão não pode ficar curta —, e `faltou` conta quantas vieram
   do lado errado para a tela poder avisar. */
function selecionarComProgressao(pool, n, usuario, selecionar){
  const fc = fracaoConsolidacao(usuario);
  const cons = pool.filter(ehConsolidacao), res = pool.filter(q=>!ehConsolidacao(q));
  let nCons = Math.round(n*fc), nRes = n - nCons;
  if(cons.length < nCons){ nRes += nCons - cons.length; nCons = cons.length; }
  if(res.length < nRes){ nCons = Math.min(cons.length, nCons + nRes - res.length); nRes = res.length; }
  return selecionar(cons, nCons).concat(selecionar(res, nRes));
}
/* O que a tela diz sobre a proporção: a regra do ano, o que conta como
   consolidação e a exceção (falta de questão de um dos lados). */
function explicacaoProgressao(usuario){
  const ano = (usuario && usuario.anoFaculdade) || CONFIG.anoFaculdadePadrao;
  if(!CONFIG.anosFaculdade.includes(ano)) return "";
  if(!fracaoConsolidacao(usuario)) return "No "+ano+" a sessão recomendada é 100% de provas reais de residência: é a reta final, treino com a prova de verdade. As questões didáticas continuam disponíveis em Estudar.";
  const prog = CONFIG.progressaoConsolidacao;
  const roteiro = Object.keys(prog).map(a=>a+" "+Math.round(prog[a]*100)+"/"+(100-Math.round(prog[a]*100))).join(" · ");
  return "No "+ano+" a matéria nova da sessão recomendada é "+textoProgressao(usuario)+". Consolidação são as questões didáticas do Esc e as provas da graduação, que firmam a base; a proporção vai virando prova real de residência a cada ano ("+roteiro+", em consolidação/residência). Se faltar questão de um dos lados naquele assunto, o outro completa.";
}
// "· consolidação" / "· prova de residência" no motivo de cada questão da sessão
function rotuloProgressao(q, usuario){
  if(!usuario || !CONFIG.anosFaculdade.includes(usuario.anoFaculdade)) return "";
  return ehConsolidacao(q) ? " · consolidação" : " · prova de residência";
}

function questoesAtivas(incluirGrupoId){
  // "ativa" exclui questões anuladas ou desatualizadas de sessões e estatísticas,
  // conforme pedido: nunca usar questão anulada/desatualizada para calcular dificuldade.
  // Questões marcadas com um grupoId (upload de aluno pro próprio grupo) ficam
  // escondidas do banco geral por padrão — só entram se o chamador pedir
  // explicitamente esse grupo (incluirGrupoId = id do grupo, ou a lista dos
  // grupos da pessoa) ou tudo (true).
  return db.questoes.filter(q=>{
    if(q.status!=="ativa") return false;
    if(aguardaImagem(q)) return false;
    if(q.grupoId && incluirGrupoId!==true && q.grupoId!==incluirGrupoId && !(Array.isArray(incluirGrupoId) && incluirGrupoId.includes(q.grupoId))) return false;
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
   Voltar a mostrar é um clique, em Favoritos > Retiradas da revisão. */
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
/* Esconder só depois do segundo erro (CONFIG.errosParaEsconderQuestao): a
   primeira vez que se erra uma questão é justamente quando ela mais ensina.
   Quem já escondeu antes disso (ou sincronizou de outro aparelho) sempre
   pode voltar a mostrar. */
function podeEsconderQuestao(usuarioId, questaoId){
  return questaoOculta(usuarioId, questaoId) || errosNaQuestao(usuarioId, questaoId) >= CONFIG.errosParaEsconderQuestao;
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
/* ACERTO COM SEGURANÇA. Acertar no chute não prova que a pessoa sabe, então
   não conta: só vale o acerto marcado com certeza ou na dúvida. */
function acertoFirme(r){ return !!r.correta && r.confianca !== "chute"; }
/* Quantos acertos firmes SEGUIDOS a questão tem no fim do histórico — um erro
   (ou um acerto no chute) zera a conta. `respostas` em ordem cronológica. */
function acertosFirmesSeguidos(respostas){
  let n = 0;
  for(let i = respostas.length - 1; i >= 0 && acertoFirme(respostas[i]); i--) n++;
  return n;
}
/* Questão DOMINADA: acertou com segurança mais de duas vezes seguidas. Sai da
   revisão espaçada — repetir o que a pessoa já sabe é tirar tempo do que ela
   ainda erra. Vem do histórico de respostas (que sincroniza), não de um campo
   da revisão, para valer igual em todos os aparelhos e para o histórico antigo. */
function questaoDominada(usuarioId, questaoId){
  return acertosFirmesSeguidos(respostasDaQuestao(usuarioId, questaoId)) >= CONFIG.acertosParaDominarQuestao;
}
/* Quanto o intervalo cresce por o assunto estar bem: taxa das últimas 10
   respostas naquele assunto, com um mínimo de respostas para não premiar
   sorte. 1 = sem bônus. */
function fatorDoAssuntoForte(usuarioId, assuntoId){
  const ultimas = db.respostas.filter(r=>r.usuarioId===usuarioId && r.assuntoId===assuntoId).slice(-10);
  if(ultimas.length < CONFIG.minRespostasAssuntoForte) return 1;
  const taxa = ultimas.filter(r=>r.correta).length / ultimas.length;
  const faixa = CONFIG.bonusAssuntoForte.find(b => taxa >= b.taxa);
  return faixa ? faixa.fator : 1;
}
function registrarRevisao(usuarioId, questaoId, correta, confianca){
  if(!db.revisoes[usuarioId]) db.revisoes[usuarioId] = {};
  const entry = db.revisoes[usuarioId][questaoId] || {repeticoes:0, fator:2.5, intervalo:0};
  const q = qualidadeSM2(correta, confianca);
  const escada = (db.configGeral && db.configGeral.intervalosBase) || CONFIG.intervalosBase;
  if(q < 3){ entry.repeticoes = 0; entry.intervalo = escada[0]; }
  else{
    entry.repeticoes += 1;
    if(confianca === "chute"){
      // acertou no chute: volta no prazo mínimo — ver a regra abaixo
      entry.intervalo = CONFIG.intervaloMinimoRevisao;
    }else{
      // acerto com segurança: o intervalo mínimo é de um mês (ver
      // CONFIG.intervalosAposAcerto). A resposta de agora já está em
      // db.respostas, mas o índice por questão só se renova no saveState —
      // por isso a conta é feita direto na lista.
      const historico = db.respostas.filter(r=>r.usuarioId===usuarioId && r.questaoId===questaoId);
      const seguidos = Math.max(1, acertosFirmesSeguidos(historico));
      const degraus = CONFIG.intervalosAposAcerto;
      const base = degraus[Math.min(seguidos, degraus.length) - 1];
      const assuntoId = (getQuestao(questaoId) || {}).assuntoId;
      entry.intervalo = Math.round(base * fatorDoAssuntoForte(usuarioId, assuntoId));
    }
  }
  entry.fator = Math.max(1.3, entry.fator + (0.1 - (5-q)*(0.08+(5-q)*0.02)));
  // acertou no chute: volta no prazo mínimo, e não deixamos a questão "se
  // aposentar" da revisão só porque o chute deu certo
  if(confianca==="chute"){ entry.intervalo = CONFIG.intervaloMinimoRevisao; entry.repeticoes = Math.min(entry.repeticoes,1); }
  // a escada configurável (db.configGeral) pode trazer degraus curtos: o piso vale sempre
  entry.intervalo = Math.max(entry.intervalo, CONFIG.intervaloMinimoRevisao);
  // perto da prova-alvo a questão não pode voltar só depois dela (ver limitarIntervaloPelaProva)
  entry.intervalo = limitarIntervaloPelaProva(usuarioId, entry.intervalo);
  entry.proximaRevisao = somarDias(hojeISO(), entry.intervalo);
  entry.ultimaConfianca = confianca; entry.ultimaCorreta = correta; entry.ultimaData = hojeISO();
  db.revisoes[usuarioId][questaoId] = entry;
  nuvemRegistrar({usuarioId, questaoId, revisao:entry});
}
/* Quando a questão volta de fato. Revisões guardadas antes dos pisos (um mês
   depois de acerto firme, uma semana nos demais casos) podem trazer prazo
   curto; o piso vale para elas também, sem reescrever o que já está guardado. */
function proximaRevisaoEfetiva(entry){
  if(!entry || !entry.proximaRevisao) return null;
  if(entry.ultimaData){
    const acertoFirme = entry.ultimaCorreta && entry.ultimaConfianca !== "chute";
    const piso = somarDias(entry.ultimaData, acertoFirme ? CONFIG.intervalosAposAcerto[0] : CONFIG.intervaloMinimoRevisao);
    if(piso > entry.proximaRevisao) return piso;
  }
  return entry.proximaRevisao;
}
function revisaoVencida(usuarioId, questaoId){
  const entry = db.revisoes[usuarioId] && db.revisoes[usuarioId][questaoId];
  const proxima = proximaRevisaoEfetiva(entry);
  return !!proxima && proxima <= hojeISO() && !questaoDominada(usuarioId, questaoId);
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
           + (q.explicacaoGeral ? "\n\n"+textoSemEnfase(q.explicacaoGeral) : ""),
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
  const dono = uid ? getUsuario(uid) : null;
  const gruposDele = dono ? idsDosGruposDoUsuario(dono) : [];
  return (db.flashcards||[]).filter(c=>{
    if(c.status==="arquivado") return false;
    if(!c.usuarioId) return true;        // cartão da equipe: visível a todos
    if(c.grupoId && gruposDele.includes(c.grupoId)) return true;   // compartilhado com um grupo da pessoa
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
/* Quando o cartão volta de fato: cartões guardados antes do piso de uma
   semana (CONFIG.intervaloMinimoRevisao) ganham o piso sem reescrever o que
   já está guardado. */
function proximaRevisaoCartao(entry){
  if(!entry || !entry.proximaRevisao) return null;
  if(!entry.ultimaData) return entry.proximaRevisao;
  const piso = somarDias(entry.ultimaData, CONFIG.intervaloMinimoRevisao);
  return piso > entry.proximaRevisao ? piso : entry.proximaRevisao;
}
function cartaoVencido(usuarioId, cartaoId){
  const proxima = proximaRevisaoCartao(revisaoDoCartao(usuarioId, cartaoId));
  return !!proxima && proxima <= hojeISO();
}
/* Mesma lógica SM-2 das questões, com a autoavaliação no lugar da confiança:
   "não lembrei" = 0, "quase" = 3, "sabia" = 5. */
function registrarRevisaoFlashcard(usuarioId, cartaoId, nota){
  if(!db.revisoesFlashcards) db.revisoesFlashcards = {};
  if(!db.revisoesFlashcards[usuarioId]) db.revisoesFlashcards[usuarioId] = {};
  const entry = db.revisoesFlashcards[usuarioId][cartaoId] || {repeticoes:0, fator:2.5, intervalo:0, vistas:0};
  // o que valia ANTES desta avaliação, para o registro de cada revisão
  const antes = { intervalo: entry.vistas ? entry.intervalo : null, ultimaData: entry.ultimaData || null };
  const q = nota==="sabia" ? 5 : nota==="quase" ? 3 : 0;
  const minimo = CONFIG.intervaloMinimoRevisao;
  if(q < 3){ entry.repeticoes = 0; entry.intervalo = minimo; }
  else{
    if(entry.repeticoes===0) entry.intervalo = minimo;
    else if(entry.repeticoes===1) entry.intervalo = minimo * 2;
    else entry.intervalo = Math.round(entry.intervalo * entry.fator);
    entry.repeticoes += 1;
  }
  entry.fator = Math.max(1.3, entry.fator + (0.1 - (5-q)*(0.08+(5-q)*0.02)));
  // "quase" nunca deixa o cartão dormir muito: é o sinal clássico de falsa segurança
  if(nota==="quase") entry.intervalo = minimo;
  entry.intervalo = Math.max(entry.intervalo, minimo);
  entry.intervalo = limitarIntervaloPelaProva(usuarioId, entry.intervalo);
  entry.proximaRevisao = somarDias(hojeISO(), entry.intervalo);
  entry.ultimaNota = nota; entry.ultimaData = hojeISO();
  entry.vistas = (entry.vistas||0) + 1;
  db.revisoesFlashcards[usuarioId][cartaoId] = entry;
  nuvemRegistrar({usuarioId, cartaoId, revisaoCartao:entry});
  registrarLogDeCartao(usuarioId, cartaoId, nota, antes, entry);
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
/* Uma linha por avaliação de cartão. A revisão espaçada (revisoesFlashcards)
   guarda só o ESTADO de cada cartão — a última nota e o próximo prazo —, e
   por isso não dá para saber depois quanto o cartão foi lembrado a cada
   intervalo. Este registro só se acumula (nunca é reescrito): é o que permite
   calibrar o agendamento com a retenção real da turma. */
function registrarLogDeCartao(usuarioId, cartaoId, nota, antes, entry){
  const cartao = getFlashcard(cartaoId) || {};
  const linha = {
    id: uid("lc"), usuarioId, cartaoId, assuntoId: cartao.assuntoId || null, nota,
    intervaloAntes: antes.intervalo, intervaloDepois: entry.intervalo,
    diasDesdeUltima: antes.ultimaData ? Math.max(0, diasEntre(antes.ultimaData, hojeISO())) : null,
    vistas: entry.vistas, data: hojeISO(), em: CONFIG.hoje().toISOString(),
  };
  if(!Array.isArray(db.logCartoes)) db.logCartoes = [];
  db.logCartoes.push(linha);
  // só uma janela recente fica aqui (a nuvem guarda tudo); ver CONFIG.limiteLogCartoesLocal
  const sobra = db.logCartoes.length - CONFIG.limiteLogCartoesLocal;
  if(sobra > 0) db.logCartoes.splice(0, sobra);
  nuvemRegistrar({logCartao: linha});
}
/* Monta o baralho da sessão de revisão rápida. `filtro` aceita
   {assuntoId, especialidadeId, areaId, somenteFalsaSeguranca,
    situacao: "vencidos" | "novos" | "meus"} */
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

  // situação pedida em "Monte o seu baralho"
  if(filtro.situacao){
    const revs = db.revisoesFlashcards[usuarioId] || {};
    const meus = new Set(meusFlashcards(usuarioId).map(c=>c.id));
    candidatos = candidatos.filter(c => filtro.situacao==="vencidos" ? cartaoVencido(usuarioId, c.id)
      : filtro.situacao==="novos" ? !revs[c.id]
      : filtro.situacao==="meus" ? meus.has(c.id) : true);
  }
  if(!candidatos.length) return [];

  const blocoAtual = getBlocoAtual();
  const assuntosDoBloco = assuntoIdsDoBloco(blocoAtual);

  const prioridade = (c)=>{
    const rev = revisaoDoCartao(usuarioId, c.id);
    if(rev && proximaRevisaoCartao(rev) <= hoje) return 0;                    // vencido
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
  const intervalo = taxa>=0.8 ? 21 : taxa>=0.6 ? 14 : taxa>=0.4 ? 7 : CONFIG.intervaloMinimoRevisao;
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

  // sem calendário (formado sem grupo, ou grupo só para dividir questões) não
  // há "bloco atual": a sessão é revisão e matéria ainda não vista, ver
  // montarSessaoSemCalendario
  if(!blocoAtual){
    return {atual:0, revisaoPassados:CONFIG.revisaoSemCalendario, previaFuturos:0, ajustada:false, temAnteriores:false, indiceBloco:0, semCalendario:true,
      explicacao:"Você não segue um calendário de blocos: a sessão mistura revisão (o que você errou e o que já venceu) com questões que você ainda não viu, começando pelos assuntos que mais caem e em que você mais erra. Para ter bloco atual, entre num grupo com calendário em Meu Grupo."};
  }
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

/* SESSÃO SEM CALENDÁRIO. Quem não segue bloco nenhum (o formado sem grupo, ou
   quem está num grupo que existe só para dividir questões) não tem "matéria
   do momento": a sessão é 40% revisão espaçada (o que errou e o que já
   venceu, sem repetir o que domina) e o resto é questão que a pessoa ainda
   não viu, com os assuntos de maior prioridade (o que mais cai e ela mais
   erra) vindo antes. */
function montarSessaoSemCalendario(usuario, tamanho){
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
    embaralhar(sobra).slice(0, tamanho - itens.length).forEach(q=>itens.push({questaoId:q.id, origem:"complemento", motivo:"Complemento — você já respondeu quase tudo do banco"}));
  }
  return embaralhar(itens);
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

  const poolAtual = questoesParaEstudo(usuarioId).filter(q=>assuntosAtual.includes(q.assuntoId));
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

  const poolPrevia = questoesParaEstudo(usuarioId).filter(q=>assuntosFuturos.includes(q.assuntoId) && q.dificuldadeManual==="fundamental");
  const itensPrevia = selecionarComProgressao(poolPrevia, nPrevia, usuario, (p,k)=>embaralhar(p).slice(0,k)).map(q=>({questaoId:q.id, origem:"previa", motivo: (proximo ? "Prévia do próximo bloco — "+proximo.nome : "Prévia")+rotulo(q)}));

  let todos = [...itensAtual, ...itensRevisao, ...itensPrevia];
  // se o banco de demonstração não tiver questões suficientes para preencher a
  // meta, completamos com quaisquer questões ativas ainda não usadas nesta sessão
  if(todos.length < tamanho){
    const usados = new Set(todos.map(t=>t.questaoId));
    const extras = selecionarComProgressao(questoesParaEstudo(usuarioId).filter(q=>!usados.has(q.id)), tamanho-todos.length, usuario, (p,k)=>embaralhar(p).slice(0,k))
      .map(q=>({questaoId:q.id, origem:"complemento", motivo:"Complemento — banco de demonstração ainda é pequeno"+rotulo(q)}));
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
/* REVISÃO ESPAÇADA EM TRÊS PARTES, na ordem de prioridade: 1) as questões que
   a pessoa ainda NÃO VIU nos assuntos já estudados — o que nunca foi
   testado é a maior lacuna possível; 2) as que ela ERROU ou acertou no
   chute, que já provaram ser lacuna; 3) as que acertou e já passou o prazo
   (um mês ou mais). `assuntos`, se vier, restringe as três a esses assuntos. */
function partesDaRevisaoEspacada(usuarioId, assuntos){
  const usuario = getUsuario(usuarioId);
  const dosAssuntos = new Set(assuntos || assuntosParaRevisao(usuario));
  const vencidas = questoesRevisaoEspacadaVencidas(usuarioId).filter(v => !assuntos || dosAssuntos.has(v.questao.assuntoId));
  return {
    novas: questoesParaEstudo(usuarioId).filter(q => dosAssuntos.has(q.assuntoId) && !jaFoiRespondida(usuarioId, q.id)),
    erros: vencidas.filter(v => v.motivo === "erro"),
    decaimentos: vencidas.filter(v => v.motivo === "decaimento"),
  };
}

/* ---------- registrar uma resposta (retrieval practice) ---------- */
/* De onde a questão veio, em código (para analisar depois se o algoritmo
   funciona: a revisão espaçada de fato recupera mais do que a prévia?). Fica
   em cada item da fila (`origem`); item montado à mão cai em "lista". */
const ORIGENS_DE_QUESTAO = {
  bloco_atual: "bloco atual", revisao_nova: "revisão: assunto anterior ainda não visto",
  revisao_erro: "revisão espaçada: erro ou chute anterior", revisao_decaimento: "revisão espaçada: acerto antigo",
  previa: "prévia do próximo bloco", nao_vista: "questão ainda não vista (sem calendário)", complemento: "complemento da sessão",
  erros: "refazer erros", lista: "lista montada pela pessoa", simulado: "simulado",
};
function origemDoItem(sessao, item){
  if(item && item.origem) return item.origem;
  return sessao && sessao.tipo === "simulado" ? "simulado" : "lista";
}
function registrarResposta(usuarioId, questaoId, alternativaEscolhida, confianca, tempoSeg, origem){
  const q = getQuestao(questaoId);
  const correta = alternativaEscolhida === q.gabarito;
  /* Quantas vezes esta pessoa já respondeu esta questão e há quantos dias foi
     a última: a conta é feita direto na lista (o índice por questão só se
     renova no saveState). Com a hora exata (respondidaEm), dá para estudar
     em que horário e depois de qual intervalo a pessoa acerta mais. */
  const anteriores = db.respostas.filter(r=>r.usuarioId===usuarioId && r.questaoId===questaoId);
  const ultimaData = anteriores.reduce((m, r)=> r.data && r.data > m ? r.data : m, "");
  const resposta = {
    id:uid("r"), usuarioId, questaoId,
    areaId:q.areaId, especialidadeId:q.especialidadeId, assuntoId:q.assuntoId,
    alternativaEscolhida, correta, confianca, data:hojeISO(),
    tempoSeg: (tempoSeg && tempoSeg>0 && tempoSeg<3600) ? Math.round(tempoSeg) : null,
    sessaoId: state.sessaoAtual ? state.sessaoAtual.id : null,
    origem: origem && ORIGENS_DE_QUESTAO[origem] ? origem : "lista",
    tentativa: anteriores.length + 1,
    diasDesdeUltima: ultimaData ? Math.max(0, diasEntre(ultimaData, hojeISO())) : null,
    respondidaEm: CONFIG.hoje().toISOString(),
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
