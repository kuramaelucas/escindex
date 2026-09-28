/* codigo/03c-nuvem-compartilhadas.js — Nuvem (seção 2-C), parte 3: NUVEM_GLOBAIS, as tabelas de todos — Livro de Ouro, formatação aprovada, comentários, feedback, questões enviadas (imagens no Storage) e correções das questões de dados/.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* Quem entra em Revisar Formatação: a equipe e os residentes — a mesma
   regra de e_revisor(), em nuvem/esquema.sql. */
function podeRevisarNaNuvem(){
  const eu = nuvemSessao && db.usuarios.find(x => x.id === nuvemSessao.usuarioId);
  return !!(eu && eu.status === "aprovado" && ["professor","admin","residente"].includes(eu.papel));
}

/* ---------------------------- outras tabelas compartilhadas --------------
   Como o calendário, estas são de TODO MUNDO, não de uma pessoa: o Livro de
   Ouro (os agradecimentos que aparecem na tela inicial) e as questões cuja
   formatação já foi aprovada em Revisar Formatação (para a questão sair da
   fila dos outros revisores). Todos leem; grava quem tem o papel certo, e
   quem salvar por último vence aquele registro.

   Cada tabela diz como transformar a linha da nuvem em dado local
   (aplicar) e como montar a linha a partir do dado local (linha). A fila é
   de CHAVES, não de linhas: a linha é montada na hora de subir, então duas
   edições seguidas do mesmo registro sobem uma vez, já com a última
   versão — e uma remoção sobe como remoção. */
const NUVEM_GLOBAIS = {
  livro_ouro: {
    chave: l => l.id,
    podeGravar: () => podeEditarCalendarioNaNuvem(),
    aplicar: l => {
      if(!Array.isArray(db.livroOuro)) db.livroOuro = [];
      const i = db.livroOuro.findIndex(x => x.id === l.id);
      if(l.removido){ if(i >= 0) db.livroOuro.splice(i, 1); return; }
      const reg = Object.assign({}, l.dados || {}, { id: l.id });
      if(i >= 0) db.livroOuro[i] = reg; else db.livroOuro.push(reg);
    },
    linha: id => {
      const r = (db.livroOuro || []).find(x => x.id === id);
      if(!r) return { id, dados: {}, removido: true };
      const dados = Object.assign({}, r); delete dados.id;
      return { id, dados, removido: false };
    },
  },
  formatacao_aprovada: {
    chave: l => l.questao_id,
    podeGravar: () => podeRevisarNaNuvem(),
    aplicar: l => {
      if(!db.formatacaoAprovada) db.formatacaoAprovada = {};
      if(l.aprovada) db.formatacaoAprovada[l.questao_id] = { porNome: l.por_nome || "", em: (l.atualizado_em || "").slice(0,10) || hojeISO() };
      else delete db.formatacaoAprovada[l.questao_id];
    },
    linha: qid => {
      const a = (db.formatacaoAprovada || {})[qid];
      return { questao_id: qid, aprovada: !!a, por_nome: a ? (a.porNome || "") : "" };
    },
  },
};
/* COMENTÁRIOS E DÚVIDAS nas questões. São de todos (a dúvida do aluno
   precisa chegar ao residente), mas cada linha tem dono: o banco só aceita
   o comentário de quem está escrevendo, e "resposta oficial" só de quem
   revisa (ver comentarios no esquema.sql). Remover um comentário marca
   `removido` — assim a remoção também desce para os outros aparelhos. */
NUVEM_GLOBAIS.comentarios = {
  chave: l => l.id,
  colunaChave: "id",
  alheia: l => !!nuvemSessao && l.usuario_id !== nuvemSessao.usuarioId,
  podeGravar: () => true,
  aplicar: l => {
    if(!Array.isArray(db.comentarios)) db.comentarios = [];
    const i = db.comentarios.findIndex(x => x.id === l.id);
    const reg = {
      id: l.id, questaoId: l.questao_id, usuarioId: l.usuario_id, autorNome: l.autor_nome || "",
      papelAutor: l.papel_autor || "aluno", texto: l.texto || "", data: l.data || (l.atualizado_em || "").slice(0,10),
      respostaOficial: !!l.resposta_oficial, removido: !!l.removido,
    };
    if(i >= 0) db.comentarios[i] = Object.assign(db.comentarios[i], reg); else db.comentarios.push(reg);
  },
  linha: id => {
    const c = (db.comentarios || []).find(x => x.id === id);
    if(!c) return null;
    return {
      id: c.id, questao_id: c.questaoId, usuario_id: c.usuarioId, autor_nome: c.autorNome || "",
      papel_autor: c.papelAutor || null, texto: c.texto || "", data: c.data || null,
      resposta_oficial: !!c.respostaOficial, removido: !!c.removido,
    };
  },
};

/* FEEDBACK DA PLATAFORMA (tabela feedbacks, seção 11-G do esquema.sql):
   "Enviar feedback" e "Quero contribuir". Até aqui a mensagem ficava em
   db.feedbacks do navegador de quem escreveu — e a coordenação, que a lê em
   Feedback dos Usuários, estava em outro navegador: nada chegava. Agora
   sobe; quem escreveu vê as suas, os administradores veem todas e marcam
   como lidas (a marca também viaja). O nome vai na linha porque o
   administrador não tem, no navegador dele, o cadastro de todo mundo. */
NUVEM_GLOBAIS.feedbacks = {
  chave: l => l.id,
  colunaChave: "id",
  alheia: l => !!nuvemSessao && l.usuario_id !== nuvemSessao.usuarioId,
  podeGravar: () => true,
  aplicar: l => {
    if(!Array.isArray(db.feedbacks)) db.feedbacks = [];
    const i = db.feedbacks.findIndex(x => x.id === l.id);
    const reg = {
      id: l.id, usuarioId: l.usuario_id, autorNome: l.autor_nome || "", papel: l.papel || "aluno",
      tipo: l.tipo || "comentario", texto: l.texto || "", data: l.data || (l.atualizado_em || "").slice(0, 10),
      lido: !!l.lido, lidoPorNome: l.lido_por_nome || "", naNuvem: true,
    };
    if(i >= 0) db.feedbacks[i] = Object.assign(db.feedbacks[i], reg); else db.feedbacks.push(reg);
  },
  linha: id => {
    const f = (db.feedbacks || []).find(x => x.id === id);
    if(!f) return null;
    const autor = getUsuario(f.usuarioId);
    return {
      id: f.id, usuario_id: ehUuid(f.usuarioId) ? f.usuarioId : nuvemSessao.usuarioId,
      autor_nome: f.autorNome || (autor && autor.nome) || "", papel: f.papel || null, tipo: f.tipo || "comentario",
      texto: f.texto || "", data: f.data || null, lido: !!f.lido, lido_por_nome: f.lidoPorNome || "",
    };
  },
};
/* Chamado ao escrever um feedback (e ao marcá-lo como lido). Sem conta na
   nuvem, fica só neste navegador — e a tela diz isso a quem enviou. */
function nuvemMarcarFeedback(id){
  if(!nuvemConectado()) return false;
  // só sobe o que veio da nuvem ou o que é da própria conta conectada: uma
  // conta local deste navegador não pode escrever em nome de outra
  const f = (db.feedbacks || []).find(x => x.id === id);
  if(!f || (!f.naNuvem && f.usuarioId !== nuvemSessao.usuarioId)) return false;
  nuvemMarcarGlobalPendente("feedbacks", id);
  nuvemAgendarSync();
  return true;
}

/* QUESTÕES ENVIADAS PELA PLATAFORMA (tabela questoes_enviadas, seção 11-E
   do esquema.sql). Até aqui, a questão enviada por Enviar/Importar
   Questões, pela Central de Provas ou por "Nova questão" ficava só no
   navegador de quem enviou: a coordenação nunca a via, e a questão que ela
   própria publicava não chegava aos alunos. Agora:

   - quem envia sobe a questão (aluno: pendente; residente e equipe podem
     publicar já aprovada) e a IMAGEM vai antes, para o Storage do Supabase
     (balde "questoes"): a linha guarda só o endereço dela, porque uma
     imagem em texto dentro de cada questão encheria o navegador de todos;
   - a equipe recebe as pendentes na fila de sempre (Controle de Qualidade ›
     Sugeridas), confere, corrige e aprova — e a aprovada desce para todos;
   - recusar manda o motivo de volta a quem enviou; excluir uma aprovada a
     marca "removida", e ela sai dos outros aparelhos também.

   A fila é a mesma das outras tabelas compartilhadas (chaves, linha montada
   na hora de subir); a diferença é o envio próprio (`enviar`), que sobe a
   imagem primeiro. Recusa e remoção ficam em db.nuvem.questoesDecididas até
   subirem, porque a questão em si já saiu do banco local. */
const BALDE_IMAGENS_QUESTOES = "questoes";
const CAMPOS_DA_QUESTAO_NA_NUVEM = ["banca", "ano", "tipoProva", "areaId", "especialidadeId", "assuntoId", "enunciado", "alternativas",
  "gabarito", "explicacaoGeral", "explicacoesAlternativas", "referencias", "imagemUrl", "imagemLegenda", "imagemPendente",
  "dificuldadeManual", "numeroNaProva", "faseProva", "motivoStatus", "criadoEm"];
let _idsDaSemente = null;
function questaoDaSemente(id){
  if(!_idsDaSemente || _idsDaSemente.n !== SEED_QUESTOES.length) _idsDaSemente = { n: SEED_QUESTOES.length, ids: new Set(SEED_QUESTOES.map(q => q.id)) };
  return _idsDaSemente.ids.has(id);
}
// a questão da pasta dados/ já é de todos, e a do grupo é só do grupo: nenhuma das duas sobe
function questaoSobeParaNuvem(q){ return !!q && !q.grupoId && !questaoDaSemente(q.id); }
function euNaNuvem(){ return nuvemSessao ? db.usuarios.find(x => x.id === nuvemSessao.usuarioId) || null : null; }
function podeEnviarQuestoesNaNuvem(){ const eu = euNaNuvem(); return !!(eu && eu.status === "aprovado"); }
function ehUuid(t){ return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(t || "")); }

// chamada por toda tela que cria ou muda uma questão
function nuvemMarcarQuestao(qid){
  if(!nuvemConectado() || !questaoSobeParaNuvem(getQuestao(qid))) return;
  if(db.nuvem.questoesDecididas) delete db.nuvem.questoesDecididas[qid];
  nuvemMarcarGlobalPendente("questoes_enviadas", qid);
  nuvemAgendarSync();
}
/* Recusa ou remoção: a questão sai daqui, e a decisão fica guardada até subir. */
function nuvemMarcarQuestaoFora(q, status, motivo){
  if(!nuvemConectado() || !q || !questaoSobeParaNuvem(q)) return;
  const eu = euNaNuvem() || {};
  if(!db.nuvem.questoesDecididas) db.nuvem.questoesDecididas = {};
  db.nuvem.questoesDecididas[q.id] = { status, motivo: motivo || "", porNome: eu.nome || "" };
  nuvemMarcarGlobalPendente("questoes_enviadas", q.id);
  nuvemAgendarSync();
}
function linhaDaQuestaoNaNuvem(q){
  const eu = euNaNuvem() || {};
  const dados = {};
  CAMPOS_DA_QUESTAO_NA_NUVEM.forEach(c => { if(q[c] !== undefined && q[c] !== null && q[c] !== "") dados[c] = copiaProfunda(q[c]); });
  dados.situacao = q.status === "pendente" ? "ativa" : q.status;      // ativa, anulada ou desatualizada, depois de aprovada
  // especialidade e assunto criados na hora do envio não existem nos outros navegadores: vão junto
  const esp = db.taxonomia.especialidades.find(e => e.id === q.especialidadeId);
  const ass = db.taxonomia.assuntos.find(a => a.id === q.assuntoId);
  const nova = {};
  if(esp && !(SEED_TAXONOMIA.especialidades || []).some(e => e.id === esp.id)) nova.especialidade = { id: esp.id, areaId: esp.areaId, nome: esp.nome };
  if(ass && !(SEED_TAXONOMIA.assuntos || []).some(a => a.id === ass.id)) nova.assunto = { id: ass.id, especialidadeId: ass.especialidadeId, nome: ass.nome };
  if(nova.especialidade || nova.assunto) dados.taxonomiaNova = nova;
  const autorId = ehUuid(q.criadoPor) ? q.criadoPor : nuvemSessao.usuarioId;
  // aluno só envia para aprovação, qualquer que seja o status dela aqui (o banco recusaria)
  const aprovada = q.status !== "pendente" && ["professor", "admin", "residente"].includes(eu.papel);
  return {
    id: q.id, autor_id: autorId, autor_nome: q.autorNome || (autorId === eu.id ? eu.nome : "") || "",
    status: aprovada ? "aprovada" : "pendente", dados,
    decidido_por_nome: aprovada ? (q.aprovadoPorNome || eu.nome || "") : "",
  };
}
/* A imagem anexada (data:image/...) sobe como arquivo para o Storage, e a
   questão passa a apontar para o endereço público dela — aqui também, para
   uma nova tentativa não mandar a mesma imagem de novo. */
async function nuvemEnviarImagemDaQuestao(q){
  q.imagemUrl = await nuvemSubirImagem(q.imagemUrl, q.id);
  saveState();
}
/* Sobe uma imagem data:image/... para o balde e devolve o endereço público. */
async function nuvemSubirImagem(dataUrl, nomeBase){
  const [cabecalho, base64] = String(dataUrl).split(",");
  const tipo = (/^data:([^;,]+)/.exec(cabecalho) || [])[1] || "image/jpeg";
  const binario = atob(base64 || "");
  const bytes = new Uint8Array(binario.length);
  for(let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
  const ext = { "image/png": "png", "image/webp": "webp", "image/gif": "gif" }[tipo] || "jpg";
  const caminho = nuvemSessao.usuarioId + "/" + encodeURIComponent(nomeBase) + "-" + Date.now().toString(36) + "." + ext;
  await nuvemChamar("/storage/v1/object/" + BALDE_IMAGENS_QUESTOES + "/" + caminho, {
    method: "POST", headers: { "Content-Type": tipo, "x-upsert": "false" }, body: new Blob([bytes], { type: tipo }),
  });
  return CONFIG.nuvem.url.replace(/\/+$/, "") + "/storage/v1/object/public/" + BALDE_IMAGENS_QUESTOES + "/" + caminho;
}
// a recusa do banco (RLS) é definitiva: não é "sem permissão por enquanto"
function nuvemRecusaDePolitica(e){ return e && e.status === 403 && /row-level security|42501/i.test(e.textoDoServidor || ""); }

NUVEM_GLOBAIS.questoes_enviadas = {
  chave: l => l.id,
  podeGravar: () => podeEnviarQuestoesNaNuvem(),
  aplicar: l => aplicarQuestaoDaNuvem(l),
  linha: id => { const q = getQuestao(id); return q && questaoSobeParaNuvem(q) ? linhaDaQuestaoNaNuvem(q) : null; },
  enviar: async id => {
    const decisao = (db.nuvem.questoesDecididas || {})[id];
    try{
      if(decisao){
        await nuvemChamar("/rest/v1/questoes_enviadas?id=eq." + encodeURIComponent(id), {
          method: "PATCH", headers: { "Prefer": "return=minimal" },
          body: JSON.stringify({ status: decisao.status, motivo: decisao.motivo, decidido_por_nome: decisao.porNome, atualizado_por: nuvemSessao.usuarioId }),
        });
        delete db.nuvem.questoesDecididas[id];
        return true;
      }
      const q = getQuestao(id);
      if(!q || !questaoSobeParaNuvem(q)) return true;
      if(/^data:image\//.test(q.imagemUrl || "")){
        try{ await nuvemEnviarImagemDaQuestao(q); }
        catch(e){
          if(e.semRede || e.sessaoExpirada || e.status === 401 || e.status === 429 || e.status >= 500) throw e;
          // balde que não existe ou regra que falta: o esquema.sql desta versão
          // ainda não rodou. A questão espera na fila, sem travar o resto.
          db.nuvem.avisoImagens = "A imagem de uma questão não subiu: " + (e.message || "o espaço de imagens recusou o arquivo") +
            " Rode de novo o nuvem/esquema.sql no Supabase (ele cria o espaço de imagens \"questoes\"); a questão sobe sozinha depois.";
          return false;
        }
      }
      await nuvemChamar("/rest/v1/questoes_enviadas", {
        method: "POST", headers: { "Prefer": "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify([Object.assign(linhaDaQuestaoNaNuvem(q), { atualizado_por: nuvemSessao.usuarioId })]),
      });
      q.naNuvem = true;
      delete db.nuvem.avisoImagens;
      return true;
    }catch(e){
      if(nuvemRecusaDePolitica(e)){ const def = new Error(e.message); def.status = 400; throw def; }
      throw e;
    }
  },
};
/* CORREÇÕES DAS QUESTÕES DA PASTA dados/ (tabela correcoes_questoes, seção
   11-H do esquema.sql). As questões das provas não sobem — são iguais para
   todos e vêm da pasta dados/. Mas uma delas pode precisar de conserto: a
   figura que faltava, um texto cortado, um gabarito revisto. Antes, o
   conserto feito em Questões para Atualizar ficava no navegador de quem
   consertou. Agora sobe como UMA LINHA POR QUESTÃO com a diferença em
   relação à pasta dados/ (campos novos e campos a apagar — ver
   correcaoDaQuestao, seção 26-D), a imagem vai antes para o Storage, e a
   correção desce para todo mundo: a questão consertada volta ao estudo da
   turma na hora. Depois, "Baixar as atualizações" leva só essas questões
   para a pasta dados/ (ferramentas/aplicar-atualizacoes.mjs), e a linha
   pode ser encerrada. */
NUVEM_GLOBAIS.correcoes_questoes = {
  chave: l => l.questao_id,
  podeGravar: () => podeRevisarNaNuvem(),
  aplicar: l => aplicarCorrecaoDaNuvem(l),
  linha: qid => linhaDaCorrecao(qid),
  enviar: async qid => {
    const q = getQuestao(qid);
    try{
      if(q && /^data:image\//.test(q.imagemUrl || "")){
        try{
          q.imagemUrl = await nuvemSubirImagem(q.imagemUrl, qid);
          saveState();
        }catch(e){
          if(e.semRede || e.sessaoExpirada || e.status === 401 || e.status === 429 || e.status >= 500) throw e;
          db.nuvem.avisoImagens = "A imagem de uma questão consertada não subiu: " + (e.message || "o espaço de imagens recusou o arquivo") +
            " Rode de novo o nuvem/esquema.sql no Supabase (ele cria o espaço de imagens \"questoes\"); a correção sobe sozinha depois.";
          return false;
        }
      }
      await nuvemChamar("/rest/v1/correcoes_questoes", {
        method: "POST", headers: { "Prefer": "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify([Object.assign(linhaDaCorrecao(qid), { atualizado_por: nuvemSessao.usuarioId })]),
      });
      const meta = (db.correcoes || {})[qid];
      if(meta) meta.naNuvem = true;
      delete db.nuvem.avisoImagens;
      return true;
    }catch(e){
      if(nuvemRecusaDePolitica(e)){ const def = new Error(e.message); def.status = 400; throw def; }
      throw e;
    }
  },
};
function nuvemMarcarCorrecao(qid){
  if(!nuvemConectado()) return false;
  nuvemMarcarGlobalPendente("correcoes_questoes", qid);
  nuvemAgendarSync();
  return true;
}
function linhaDaCorrecao(qid){
  const q = getQuestao(qid);
  const c = q ? correcaoDaQuestao(q) : null;
  const meta = (db.correcoes || {})[qid] || {};
  return { questao_id: qid, campos: c ? c.campos : {}, remover: c ? c.remover : [], removido: !c,
    autor_nome: meta.porNome || (euNaNuvem() || {}).nome || "" };
}
/* A linha que desce é a diferença inteira em relação à pasta dados/: a
   questão volta primeiro ao que a pasta diz e recebe a correção por cima.
   Assim uma correção que deixou de mexer num campo também o devolve, e uma
   correção encerrada (removido) devolve a questão à pasta. */
function aplicarCorrecaoDaNuvem(l){
  const qid = l && l.questao_id; if(!qid) return;
  if(!db.correcoes) db.correcoes = {};
  const q = getQuestao(qid), s = sementeDaQuestao(qid);
  if(q && s) voltarQuestaoASemente(q, s);
  if(l.removido){ delete db.correcoes[qid]; return; }
  db.correcoes[qid] = { porNome: l.autor_nome || "", em: (l.atualizado_em || "").slice(0, 10) || hojeISO(), naNuvem: true };
  if(!q) return;
  const campos = l.campos || {};
  Object.keys(campos).forEach(c => { if(CAMPOS_CORRIGIVEIS.includes(c)) q[c] = copiaProfunda(campos[c]); });
  (Array.isArray(l.remover) ? l.remover : []).forEach(c => { if(CAMPOS_CORRIGIVEIS.includes(c)) delete q[c]; });
  if(!q.imagemPendente && s && s.imagemPendente) q.imagemLiberada = true;
}

/* O que desce: a aprovada entra no banco de todos; a pendente, no de quem
   enviou e no da equipe (é a fila de Sugeridas); a recusada e a removida
   saem. Quem enviou guarda o andamento dos próprios envios (meusEnvios),
   inclusive o motivo da recusa. */
function aplicarQuestaoDaNuvem(l){
  if(!l || !l.id || questaoDaSemente(l.id)) return;
  const d = l.dados || {};
  if(nuvemSessao && l.autor_id === nuvemSessao.usuarioId){
    if(!db.nuvem.meusEnvios) db.nuvem.meusEnvios = {};
    db.nuvem.meusEnvios[l.id] = { autorId: l.autor_id, status: l.status, motivo: l.motivo || "", decididoPor: l.decidido_por_nome || "",
      em: (l.atualizado_em || "").slice(0, 10), banca: d.banca || "", ano: d.ano || "", resumo: String(d.enunciado || "").slice(0, 140), numero: d.numeroNaProva || null };
  }
  const i = db.questoes.findIndex(x => x.id === l.id);
  if(l.status === "recusada" || l.status === "removida"){
    if(i >= 0) db.questoes.splice(i, 1);
    return;
  }
  const nova = d.taxonomiaNova || {};
  if(nova.especialidade && !db.taxonomia.especialidades.some(e => e.id === nova.especialidade.id)) db.taxonomia.especialidades.push(Object.assign({}, nova.especialidade));
  if(nova.assunto && !db.taxonomia.assuntos.some(a => a.id === nova.assunto.id)) db.taxonomia.assuntos.push(Object.assign({}, nova.assunto));
  const antiga = i >= 0 ? db.questoes[i] : null;
  const q = { id: l.id, real: true };
  CAMPOS_DA_QUESTAO_NA_NUVEM.forEach(c => { if(d[c] !== undefined) q[c] = copiaProfunda(d[c]); });
  Object.assign(q, {
    status: l.status === "pendente" ? "pendente" : (d.situacao || "ativa"),
    criadoPor: l.autor_id || (antiga && antiga.criadoPor) || "", autorNome: l.autor_nome || "",
    criadoEm: d.criadoEm || (l.criado_em || "").slice(0, 10) || hojeISO(),
    aprovadoPorNome: l.decidido_por_nome || "", naNuvem: true,
    explicacoesAlternativas: q.explicacoesAlternativas || {},
    dificuldadeManual: q.dificuldadeManual || "intermediario",
    alternativas: q.alternativas || [],
    // o que é deste aparelho (estatísticas, sinalizações) fica
    estatisticas: (antiga && antiga.estatisticas) || { respostas: 0, acertos: 0, distribuicaoAlternativas: {} },
  });
  if(antiga && antiga.sinalizacoes) q.sinalizacoes = antiga.sinalizacoes;
  if(i >= 0) db.questoes[i] = q; else db.questoes.push(q);
}
/* Questões criadas neste navegador antes de a nuvem as receber (ou sem
   conta): quem enviou — ou a equipe, para as que publicou — manda de uma vez. */
function questoesSoNesteNavegador(){
  const eu = euNaNuvem(); if(!eu) return [];
  const daEquipe = podeGerirConteudo(eu);
  return db.questoes.filter(q => questaoSobeParaNuvem(q) && !q.naNuvem && (daEquipe || q.criadoPor === eu.id || !ehUuid(q.criadoPor)));
}
/* O que a pessoa enviou e em que pé está: pendente, aprovada, recusada (com
   o motivo). Aparece em Enviar/Importar Questões. */
function renderCardMeusEnvios(){
  if(!nuvemConectado()) return "";
  const eu = euNaNuvem(); if(!eu) return "";
  const envios = Object.entries((db.nuvem && db.nuvem.meusEnvios) || {}).filter(([, e]) => e.autorId === eu.id)
    .map(([id, e]) => Object.assign({ id }, e)).sort((a, b) => (b.em || "").localeCompare(a.em || ""));
  const soAqui = questoesSoNesteNavegador();
  const naFila = ((db.nuvem && db.nuvem.globaisPendentes) || []).filter(p => p.tabela === "questoes_enviadas").length;
  if(!envios.length && !soAqui.length && !naFila) return "";
  const conta = st => envios.filter(e => e.status === st).length;
  const rotulo = { pendente: ["badge-amber", "aguardando a equipe"], aprovada: ["badge-accent", "aprovada — no banco de todos"], recusada: ["badge-danger", "recusada"], removida: ["badge-muted", "removida do banco"] };
  const pag = paginar(envios, "meus-envios", { porPagina: 8 });
  return `<div class="card mb-2">
    <div class="card-title">${iconeSvg("upload")} Suas questões enviadas</div>
    <p class="text-sm muted">Com a nuvem ligada, o que você envia sobe junto com as imagens e chega à equipe, que confere e aprova. Aprovada, a questão entra no banco de toda a turma.</p>
    ${naFila ? `<p class="text-sm mt-1">${iconeSvg("refresh")} ${naFila} questão(ões) subindo agora…</p>` : ""}
    ${db.nuvem.avisoImagens ? `<p class="text-xs mt-1" style="color:var(--amber)">${iconeSvg("alert")} ${escapeHtml(db.nuvem.avisoImagens)}</p>` : ""}
    ${soAqui.length ? `<div class="card-flat mt-2 text-sm">${iconeSvg("alert")} <strong>${soAqui.length} questão(ões) estão só neste navegador</strong> — foram criadas antes de subirem para a nuvem.
      <button class="btn btn-secondary btn-sm mt-1" onclick="nuvemEnviarQuestoesDesteNavegador()">${iconeSvg("upload")} Enviar para a nuvem</button></div>` : ""}
    ${envios.length ? `<div class="qcard-meta mt-2">
        <span class="badge badge-amber">${conta("pendente")} aguardando</span><span class="badge badge-accent">${conta("aprovada")} aprovada(s)</span>
        ${conta("recusada") ? `<span class="badge badge-danger">${conta("recusada")} recusada(s)</span>` : ""}</div>
      ${pag.itens.map(e => `<div class="card-flat mt-1">
        <div class="flex justify-between items-center" style="flex-wrap:wrap;gap:.4rem"><span class="text-sm" style="font-weight:600">${escapeHtml(e.banca)} ${escapeHtml(String(e.ano||""))}${e.numero ? " · nº " + e.numero : ""}</span>
          <span class="badge ${(rotulo[e.status] || rotulo.pendente)[0]}">${(rotulo[e.status] || rotulo.pendente)[1]}</span></div>
        <div class="text-xs muted mt-1">${escapeHtml(e.resumo)}${e.resumo && e.resumo.length >= 140 ? "…" : ""}</div>
        ${e.status === "recusada" ? `<div class="text-xs mt-1">${e.motivo ? "<strong>Motivo:</strong> " + escapeHtml(e.motivo) : "Sem motivo informado."}${e.decididoPor ? " — " + escapeHtml(e.decididoPor) : ""}</div>` : ""}
        ${e.status === "aprovada" && e.decididoPor ? `<div class="text-xs muted mt-1">aprovada por ${escapeHtml(e.decididoPor)}${e.em ? " em " + formatDataBR(e.em) : ""}</div>` : ""}
      </div>`).join("")}
      ${controlesPaginacao(pag, "envio(s)")}` : ""}
  </div>`;
}
function nuvemEnviarQuestoesDesteNavegador(){
  const lista = questoesSoNesteNavegador();
  if(!lista.length){ toast("Não há questão deste navegador esperando para subir."); return; }
  lista.forEach(q => nuvemMarcarGlobalPendente("questoes_enviadas", q.id));
  saveState();
  nuvemSincronizarAgora({ forcarRedesenho: true });
  toast(lista.length + " questão(ões) a caminho da nuvem" + (lista.some(q => /^data:image\//.test(q.imagemUrl || "")) ? ", com as imagens" : "") + ".");
}
