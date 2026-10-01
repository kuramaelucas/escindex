/* codigo/03e-nuvem-grupos.js — Nuvem (seção 2-C), parte 5: grupos, membros e grupos de estudo na nuvem, e os cartões enviados (à equipe e ao grupo). As questões de grupo usam a tabela das questões enviadas (03c).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   GRUPOS NA NUVEM (tabelas grupos, grupo_membros e subgrupos, seção 11-J do
   esquema.sql)
   ==========================================================================
   Antes, um grupo existia só no navegador de quem o criou. Agora ele sobe
   como as questões enviadas: é de todos, mas cada linha diz quem pode ler e
   quem pode mexer (o RLS do banco decide; aqui só se evita mandar o que ele
   recusaria).

   COMO SOBE: sem um gancho em cada tela que mexe num grupo — a sincronização
   COMPARA o que há no navegador com o que já subiu (db.nuvem.gruposSig) e
   enfileira só a diferença, como nuvemConferirPerfil faz com o perfil. Quem
   criou um grupo antes da nuvem sobe tudo na primeira sincronização, sem
   nenhuma ação extra. As linhas de grupo vão para a FRENTE da fila: as
   questões e os cartões do grupo dependem de a pessoa já ser membro no banco.

   QUEM ESCREVE O QUÊ: o dono sobe o grupo e aprova pedidos (a linha de OUTRA
   pessoa vai como alteração, PATCH — o upsert passaria pela regra de
   inserção, que só aceita linha própria); cada pessoa pede para entrar e sai
   por conta própria; a turma do rodízio é aberta (entra direto) e só ganha
   linha em `grupos` quando alguém divide as questões; qualquer membro mexe
   no grupo de estudo.

   O QUE DESCE vira o que a plataforma já usava: g.membrosAprovados,
   g.solicitacoesPendentes e db.subgrupos. Como o navegador de cada pessoa só
   conhece o próprio cadastro, o nome dos colegas vem na linha e fica em
   g.nomesMembros. */
function grupoDeNuvem(g){ return !!g && !g.oficial && (!!g.doRodizio || ehUuid(g.criadoPor)); }
function statusLocalNoGrupo(g, usuarioId){
  if(g.criadoPor === usuarioId || (g.membrosAprovados || []).includes(usuarioId)) return "aprovado";
  if((g.solicitacoesPendentes || []).includes(usuarioId)) return "pendente";
  return null;
}
function nuvemLembrarEnviado(chave, valor){
  if(!db.nuvem.gruposSig) db.nuvem.gruposSig = {};
  db.nuvem.gruposSig[chave] = valor;
}
// à frente da fila: grupo e membros precisam existir no banco antes do que depende deles
function nuvemMarcarNoInicio(tabela, chave){
  nuvemMarcarGlobalPendente(tabela, chave);
  const fila = db.nuvem.globaisPendentes || [];
  const i = fila.findIndex(p => p.tabela === tabela && p.chave === chave);
  if(i > 0) fila.unshift(fila.splice(i, 1)[0]);   // se já estava na fila, só vai para a frente
}

function linhaDoGrupo(g){
  const dados = {};
  if(g.doRodizio) dados.doRodizio = true;
  if(g.anoFaculdade) dados.anoFaculdade = g.anoFaculdade;
  dados.deslocamento = g.deslocamento || 0;
  if(g.nomeAutomatico) dados.nomeAutomatico = true;
  if(g.blocoAtualIdManual) dados.blocoAtualIdManual = g.blocoAtualIdManual;
  if(Array.isArray(g.blocosProprios)) dados.blocosProprios = copiaProfunda(g.blocosProprios);
  if(g.divisao && Object.keys(g.divisao).length) dados.divisao = copiaProfunda(g.divisao);
  const dono = ehUuid(g.criadoPor) ? getUsuario(g.criadoPor) : null;
  return { id: g.id, nome: g.nome || "", criado_por: ehUuid(g.criadoPor) ? g.criadoPor : null,
           criado_por_nome: g.criadoPorNome || (dono && dono.nome) || "", dados };
}
function linhaDoMembro(g, usuarioId){
  const eu = nuvemSessao.usuarioId;
  return { grupo_id: g.id, usuario_id: usuarioId, usuario_nome: nomeDoMembro(g, usuarioId),
           status: statusLocalNoGrupo(g, usuarioId) || (usuarioId === eu ? "saiu" : "recusado") };
}
function linhaDoSubgrupo(sg){
  return { id: sg.id, grupo_id: sg.grupoId, nome: sg.nome || "", criado_por: ehUuid(sg.criadoPor) ? sg.criadoPor : nuvemSessao.usuarioId,
           dados: { membros: sg.membros || [], questaoIds: sg.questaoIds || [], divisao: sg.divisao || {} }, removido: false };
}

/* O que mudou desde o último envio, posto na fila. Chamada no começo de cada
   sincronização. */
function nuvemConferirGrupos(){
  if(!nuvemConectado()) return;
  const eu = euNaNuvem(); if(!eu || eu.status !== "aprovado") return;
  if(!db.nuvem.gruposSig) db.nuvem.gruposSig = {};
  if(!db.nuvem.subgruposSubidos) db.nuvem.subgruposSubidos = {};
  const env = db.nuvem.gruposSig;
  const novos = [];
  const subir = (tabela, chave, assinatura) => { if(env[tabela + "|" + chave] !== assinatura) novos.push({ tabela, chave }); };
  const meus = new Set();
  (db.grupos || []).forEach(g => {
    if(!grupoDeNuvem(g)) return;
    const dono = g.criadoPor === eu.id;
    const meuStatus = statusLocalNoGrupo(g, eu.id);
    if(meuStatus) meus.add(g.id);
    // a turma do rodízio só ganha linha quando alguém divide as questões
    if(dono || (g.doRodizio && meuStatus && g.divisao && Object.keys(g.divisao).length)) subir("grupos", g.id, JSON.stringify(linhaDoGrupo(g)));
    const minha = g.id + "|" + eu.id;
    if(meuStatus) subir("grupo_membros", minha, meuStatus);
    else if(env["grupo_membros|" + minha] !== undefined) subir("grupo_membros", minha, "saiu");
    if(!dono) return;
    // o dono aprova e recusa os pedidos dos outros
    const aEsteGrupo = (g.membrosAprovados || []).concat(g.solicitacoesPendentes || []).filter(id => id !== eu.id && ehUuid(id));
    aEsteGrupo.forEach(id => subir("grupo_membros", g.id + "|" + id, statusLocalNoGrupo(g, id)));
    Object.keys(env).filter(k => k.indexOf("grupo_membros|" + g.id + "|") === 0).forEach(k => {
      const id = k.slice(("grupo_membros|" + g.id + "|").length);
      if(id !== eu.id && !aEsteGrupo.includes(id) && env[k] !== "recusado" && env[k] !== "saiu") subir("grupo_membros", g.id + "|" + id, "recusado");
    });
  });
  // grupo excluído aqui: sobe a marca `removido` (a exclusão só vale para os outros aparelhos depois disto)
  Object.keys(db.nuvem.gruposRemovidos || {}).forEach(id => subir("grupos", id, "removido"));
  (db.subgrupos || []).forEach(sg => {
    if(!meus.has(sg.grupoId) || !ehUuid(sg.criadoPor)) return;
    subir("subgrupos", sg.id, JSON.stringify(linhaDoSubgrupo(sg)));
  });
  Object.keys(db.nuvem.subgruposSubidos).forEach(id => { if(!getSubgrupo(id)) subir("subgrupos", id, "removido"); });
  // à frente da fila, na ordem em que foram achados (cada um passa para a frente: do último ao primeiro)
  novos.reverse().forEach(n => nuvemMarcarNoInicio(n.tabela, n.chave));
}

/* Grava uma linha numa tabela compartilhada. A PRÓPRIA linha vai como upsert.
   A de OUTRA pessoa (aprovar um pedido, corrigir a questão de um colega,
   decidir um cartão) vai como alteração: antes tenta criá-la sem sobrescrever
   — para a linha que ainda não existe, como a da turma do rodízio —, e o que o
   banco recusar nessa tentativa não é erro: a alteração em seguida é a que vale. */
async function nuvemGravarCompartilhada(tabela, filtro, linha, propria){
  const corpo = Object.assign({}, linha, { atualizado_por: nuvemSessao.usuarioId });
  if(propria){
    await nuvemChamar("/rest/v1/" + tabela, { method: "POST", headers: { "Prefer": "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify([corpo]) });
    return;
  }
  try{
    await nuvemChamar("/rest/v1/" + tabela, { method: "POST", headers: { "Prefer": "resolution=ignore-duplicates,return=minimal" }, body: JSON.stringify([corpo]) });
  }catch(e){ if(!nuvemRecusaDePolitica(e)) throw e; }
  const alteracao = Object.assign({}, corpo);
  ["id", "grupo_id", "usuario_id", "criado_por", "autor_id"].forEach(c => delete alteracao[c]);
  await nuvemChamar("/rest/v1/" + tabela + "?" + filtro, { method: "PATCH", headers: { "Prefer": "return=minimal" }, body: JSON.stringify(alteracao) });
}
/* Tenta gravar e LEMBRA o que foi tentado, aceito ou não. Recusa do banco
   (RLS) é definitiva: lembrar o valor tentado impede a sincronização seguinte
   de enfileirar o mesmo envio para ser recusado de novo, para sempre. Só uma
   mudança no registro faz o envio voltar à fila. */
async function nuvemTentarGravar(lembrar, grava){
  try{ await grava(); }
  catch(e){
    if(nuvemRecusaDePolitica(e)){ lembrar(); const def = new Error(e.message); def.status = 400; throw def; }
    throw e;
  }
  lembrar();
}
const _enc = encodeURIComponent;

NUVEM_GLOBAIS.grupos = {
  chave: l => l.id,
  podeGravar: () => podeEnviarQuestoesNaNuvem(),
  aplicar: l => aplicarGrupoDaNuvem(l),
  linha: id => { const g = getGrupo(id); return grupoDeNuvem(g) ? linhaDoGrupo(g) : null; },
  enviar: async id => {
    const apagado = (db.nuvem.gruposRemovidos || {})[id];
    if(apagado && !getGrupo(id)){
      // a pessoa que excluiu manda a marca; sem conteúdo, só o nome para a equipe reconhecer
      const linhaRemovida = { id, nome: apagado.n, criado_por: apagado.c, criado_por_nome: apagado.cn || "", dados: {}, removido: true };
      await nuvemTentarGravar(() => nuvemLembrarEnviado("grupos|" + id, "removido"),
        () => nuvemGravarCompartilhada("grupos", "id=eq." + _enc(id), linhaRemovida, apagado.c === nuvemSessao.usuarioId));
      return true;
    }
    const g = getGrupo(id); if(!grupoDeNuvem(g)) return true;
    const linha = linhaDoGrupo(g);
    await nuvemTentarGravar(() => nuvemLembrarEnviado("grupos|" + id, JSON.stringify(linha)),
      () => nuvemGravarCompartilhada("grupos", "id=eq." + _enc(id), linha, linha.criado_por === nuvemSessao.usuarioId));
    return true;
  },
};
NUVEM_GLOBAIS.grupo_membros = {
  chave: l => l.grupo_id + "|" + l.usuario_id,
  podeGravar: () => podeEnviarQuestoesNaNuvem(),
  aplicar: l => aplicarMembroDaNuvem(l),
  linha: chave => null,   // montada em `enviar`, que precisa do grupo inteiro
  enviar: async chave => {
    const [grupoId, usuarioId] = chave.split("|");
    const g = getGrupo(grupoId); if(!grupoDeNuvem(g) || !ehUuid(usuarioId)) return true;
    const linha = linhaDoMembro(g, usuarioId);
    await nuvemTentarGravar(() => nuvemLembrarEnviado("grupo_membros|" + chave, linha.status),
      () => nuvemGravarCompartilhada("grupo_membros", "grupo_id=eq." + _enc(grupoId) + "&usuario_id=eq." + _enc(usuarioId), linha, usuarioId === nuvemSessao.usuarioId));
    return true;
  },
};
NUVEM_GLOBAIS.subgrupos = {
  chave: l => l.id,
  podeGravar: () => podeEnviarQuestoesNaNuvem(),
  aplicar: l => aplicarSubgrupoDaNuvem(l),
  linha: id => null,
  enviar: async id => {
    const sg = getSubgrupo(id);
    const conhecido = (db.nuvem.subgruposSubidos || {})[id];
    if(!sg && !conhecido) return true;
    // excluído aqui: sobe a marca `removido`, sem o conteúdo
    const linha = sg ? linhaDoSubgrupo(sg) : { id, grupo_id: conhecido.g, nome: conhecido.n, dados: {}, removido: true };
    const propria = !!sg && linha.criado_por === nuvemSessao.usuarioId;
    await nuvemTentarGravar(() => {
      if(sg){ nuvemLembrarEnviado("subgrupos|" + id, JSON.stringify(linha)); db.nuvem.subgruposSubidos[id] = { g: sg.grupoId, n: sg.nome }; }
      else{ delete db.nuvem.gruposSig["subgrupos|" + id]; delete db.nuvem.subgruposSubidos[id]; }
    }, () => nuvemGravarCompartilhada("subgrupos", "id=eq." + _enc(id), linha, propria));
    return true;
  },
};

/* ---------- o que desce ---------- */
function aplicarGrupoDaNuvem(l){
  if(!l || !l.id) return;
  const d = l.dados || {};
  let g = getGrupo(l.id) || (/^rodizio-/.test(l.id) ? recriarTurmaDoRodizio(l.id) : null);
  if(l.removido){
    if(g) removerGrupoDoNavegador(l.id);
    nuvemLembrarEnviado("grupos|" + l.id, "removido");
    return;
  }
  if(!g){
    g = { id: l.id, oficial: false, publico: true, membrosAprovados: [], solicitacoesPendentes: [] };
    db.grupos.push(g);
  }
  Object.assign(g, {
    nome: l.nome || g.nome || "", criadoPor: l.criado_por || null, criadoPorNome: l.criado_por_nome || "",
    doRodizio: !!d.doRodizio, criadoEm: (l.criado_em || "").slice(0, 10) || g.criadoEm || hojeISO(),
    anoFaculdade: d.anoFaculdade || null, deslocamento: d.deslocamento || 0, nomeAutomatico: !!d.nomeAutomatico,
    blocoAtualIdManual: d.blocoAtualIdManual || null,
  });
  if(Array.isArray(d.blocosProprios)) g.blocosProprios = copiaProfunda(d.blocosProprios); else delete g.blocosProprios;
  if(d.divisao && typeof d.divisao === "object") g.divisao = copiaProfunda(d.divisao); else delete g.divisao;
  nuvemLembrarEnviado("grupos|" + l.id, JSON.stringify(linhaDoGrupo(g)));
}
function aplicarMembroDaNuvem(l){
  if(!l || !l.grupo_id || !l.usuario_id) return;
  const g = getGrupo(l.grupo_id) || recriarTurmaDoRodizio(l.grupo_id);
  if(!g) return;   // grupo que este aparelho ainda não conhece (a linha dele desce na próxima)
  const id = l.usuario_id;
  const estavaPendente = (g.solicitacoesPendentes || []).includes(id);
  g.membrosAprovados = (g.membrosAprovados || []).filter(x => x !== id);
  g.solicitacoesPendentes = (g.solicitacoesPendentes || []).filter(x => x !== id);
  if(l.status === "aprovado") g.membrosAprovados.push(id);
  if(l.status === "pendente") g.solicitacoesPendentes.push(id);
  if(!g.nomesMembros) g.nomesMembros = {};
  if(l.usuario_nome) g.nomesMembros[id] = l.usuario_nome;
  nuvemLembrarEnviado("grupo_membros|" + l.grupo_id + "|" + id, l.status);
  // o dono me retirou do grupo (ou recusou o pedido): se eu ainda o tinha como turma, volto ao calendário oficial
  if(id === nuvemSessao.usuarioId && l.status === "recusado"){
    const eu = euNaNuvem();
    if(eu && eu.grupoId === g.id) entrarNoGrupo(eu, db.grupoOficialId);
    if(eu && eu.grupoQuestoesId === g.id) delete eu.grupoQuestoesId;
  }
  // o dono aprovou o meu pedido: agora eu estou nesta turma (e saio da anterior)
  if(id === nuvemSessao.usuarioId && l.status === "aprovado" && estavaPendente){
    const eu = euNaNuvem();
    if(eu){
      // o pedido foi "só questões"? então o calendário continua como estava
      const soQuestoes = !!(eu.pedidoSoQuestoes && eu.pedidoSoQuestoes[g.id]);
      if(eu.pedidoSoQuestoes) delete eu.pedidoSoQuestoes[g.id];
      entrarNoGrupo(eu, g.id, { soQuestoes });
    }
  }
}
function aplicarSubgrupoDaNuvem(l){
  if(!l || !l.id) return;
  if(!db.subgrupos) db.subgrupos = [];
  if(!db.nuvem.subgruposSubidos) db.nuvem.subgruposSubidos = {};
  if(l.removido){
    db.subgrupos = db.subgrupos.filter(s => s.id !== l.id);
    delete db.nuvem.subgruposSubidos[l.id];
    if(db.nuvem.gruposSig) delete db.nuvem.gruposSig["subgrupos|" + l.id];
    return;
  }
  const d = l.dados || {};
  let sg = getSubgrupo(l.id);
  if(!sg){ sg = { id: l.id }; db.subgrupos.push(sg); }
  Object.assign(sg, { grupoId: l.grupo_id, nome: l.nome || "", criadoPor: l.criado_por || "", criadoEm: (l.criado_em || "").slice(0, 10) || hojeISO(),
    membros: Array.isArray(d.membros) ? d.membros : [], questaoIds: Array.isArray(d.questaoIds) ? d.questaoIds : [], divisao: d.divisao && typeof d.divisao === "object" ? d.divisao : {} });
  nuvemLembrarEnviado("subgrupos|" + l.id, JSON.stringify(linhaDoSubgrupo(sg)));
  db.nuvem.subgruposSubidos[l.id] = { g: sg.grupoId, n: sg.nome };
}

/* ==========================================================================
   CARTÕES ENVIADOS (tabela flashcards_enviados, seção 11-J do esquema.sql)
   ==========================================================================
   O cartão pessoal do aluno já sobe para o caderno dele (flashcards_pessoais).
   Esta tabela é para o que sai do caderno:
     - SUGERIDO à equipe: sobe como pendente; o professor aprova (vira cartão da
       equipe, para todos) ou recusa (com o motivo, que volta ao aluno);
     - COMPARTILHADO com o grupo: sobe já aprovado, e só os membros do grupo
       o recebem no baralho (c.grupoId);
     - PUBLICADO pela equipe pela plataforma (cartão novo, lote, baralho de
       IA): sobe aprovado e chega a todos. O cartão da pasta dados/ não sobe.
   Como os grupos, o que sobe sai da COMPARAÇÃO com o último envio
   (c.nuvemSig), sem gancho em cada tela que mexe num cartão. O id do cartão é
   o mesmo nas duas tabelas: ao ser promovido, o cartão pessoal vira o da
   equipe (usuarioId nulo) e a cópia pessoal deixa de valer. */
let _idsCartoesDaSemente = null;
function cartaoDaSemente(id){
  if(!_idsCartoesDaSemente || _idsCartoesDaSemente.n !== SEED_FLASHCARDS.length) _idsCartoesDaSemente = { n: SEED_FLASHCARDS.length, ids: new Set(SEED_FLASHCARDS.map(c => c.id)) };
  return _idsCartoesDaSemente.ids.has(id);
}
function linhaDoCartaoEnviado(c){
  const eu = euNaNuvem();
  if(!eu || !c || cartaoDaSemente(c.id) || (c.id || "").indexOf("fc-q-") === 0) return null;
  const arquivado = c.status === "arquivado";
  const daEquipe = podeGerirConteudo(eu);
  let status, grupo = null, autor, motivo = "", decididoPor = "";
  if(!c.usuarioId){                                   // cartão da equipe
    if(!daEquipe) return null;
    status = arquivado ? "removido" : "aprovado";
    autor = c.autorOriginalId || c.criadoPor;
    if(c.aprovadoEm) decididoPor = c.aprovadoPorNome || eu.nome || "";
  }else if(c.grupoId){                                // compartilhado com o grupo
    if(c.usuarioId !== eu.id && !daEquipe) return null;
    status = arquivado ? "removido" : "aprovado"; grupo = c.grupoId; autor = c.usuarioId;
  }else if(c.grupoAntigoId && c.usuarioId === eu.id && !c.sugeridoParaEquipe){   // tirado do grupo: a nuvem o retira dos colegas
    status = "removido"; grupo = c.grupoAntigoId; autor = c.usuarioId;
  }else if(c.sugeridoParaEquipe){                     // sugerido à equipe
    if(c.usuarioId !== eu.id && !daEquipe) return null;
    autor = c.usuarioId;
    if(!c.decisaoEm) status = "pendente";
    else{ status = c.aprovadoEm ? "aprovado" : "recusado"; motivo = c.motivoRecusa || ""; }
  }else return null;
  const dados = { assuntoId: c.assuntoId, frente: c.frente, verso: c.verso };
  ["fonte", "imagemUrl", "imagemLegenda", "origem"].forEach(k => { if(c[k]) dados[k] = c[k]; });
  return { id: c.id, autor_id: ehUuid(autor) ? autor : eu.id, autor_nome: c.autorNome || (getUsuario(autor) || {}).nome || (autor === eu.id ? eu.nome : ""),
           grupo_id: grupo, status, dados, motivo, decidido_por_nome: decididoPor };
}
function nuvemConferirCartoes(){
  if(!nuvemConectado() || !euNaNuvem()) return;
  (db.flashcards || []).forEach(c => {
    const linha = linhaDoCartaoEnviado(c);
    if(!linha) return;
    if(c.nuvemSig !== JSON.stringify(linha)) nuvemMarcarGlobalPendente("flashcards_enviados", c.id);
  });
}
NUVEM_GLOBAIS.flashcards_enviados = {
  chave: l => l.id,
  podeGravar: () => podeEnviarQuestoesNaNuvem(),
  aplicar: l => aplicarCartaoDaNuvem(l),
  linha: id => null,
  enviar: async id => {
    const c = (db.flashcards || []).find(x => x.id === id);
    if(!c) return true;
    if(/^data:image\//.test(c.imagemUrl || "")){
      try{ c.imagemUrl = await nuvemSubirImagem(c.imagemUrl, id); saveState(); }
      catch(e){
        if(e.semRede || e.sessaoExpirada || e.status === 401 || e.status === 429 || e.status >= 500) throw e;
        db.nuvem.avisoImagens = "A imagem de um cartão não subiu: " + (e.message || "o espaço de imagens recusou o arquivo") +
          " Rode de novo o nuvem/esquema.sql no Supabase; o cartão sobe sozinho depois.";
        return false;
      }
    }
    const linha = linhaDoCartaoEnviado(c);
    if(!linha) return true;
    await nuvemTentarGravar(() => { c.nuvemSig = JSON.stringify(linha); },
      () => nuvemGravarCompartilhada("flashcards_enviados", "id=eq." + _enc(id), linha, linha.autor_id === nuvemSessao.usuarioId));
    return true;
  },
};
function aplicarCartaoDaNuvem(l){
  if(!l || !l.id || cartaoDaSemente(l.id)) return;
  const d = l.dados || {};
  const eu = nuvemSessao.usuarioId;
  if(!db.flashcards) db.flashcards = [];
  let c = db.flashcards.find(x => x.id === l.id);
  const campos = { assuntoId: d.assuntoId, frente: d.frente || "", verso: d.verso || "", fonte: d.fonte || "", imagemUrl: d.imagemUrl || "", imagemLegenda: d.imagemLegenda || "" };
  const novo = extra => Object.assign({ id: l.id, status: "ativo", criadoPor: l.autor_id, autorNome: l.autor_nome || "", criadoEm: (l.criado_em || "").slice(0, 10) || hojeISO() }, campos, extra);
  const guardar = () => { if(c){ const linha = linhaDoCartaoEnviado(c); c.nuvemSig = linha ? JSON.stringify(linha) : undefined; if(c.nuvemSig === undefined) delete c.nuvemSig; } };
  if(l.status === "removido"){
    if(c){ if(c.usuarioId === eu) delete c.grupoId; else c.status = "arquivado"; }
    guardar(); return;
  }
  if(l.grupo_id){                                     // compartilhado com um grupo
    if(!c){ c = novo({ usuarioId: l.autor_id, grupoId: l.grupo_id, origem: "aluno" }); db.flashcards.push(c); }
    else Object.assign(c, campos, { grupoId: l.grupo_id });
    guardar(); return;
  }
  if(l.status === "aprovado"){                        // cartão da equipe, para todos
    if(!c){ c = novo({ usuarioId: null, origem: d.origem || "promovido", autorOriginalId: l.autor_id, aprovadoEm: (l.atualizado_em || "").slice(0, 10), decisaoEm: (l.atualizado_em || "").slice(0, 10), aprovadoPorNome: l.decidido_por_nome || "" }); db.flashcards.push(c); }
    else{
      if(c.usuarioId) c.autorOriginalId = c.usuarioId;
      Object.assign(c, campos, { usuarioId: null, decisaoEm: (l.atualizado_em || "").slice(0, 10), aprovadoEm: (l.atualizado_em || "").slice(0, 10), aprovadoPorNome: l.decidido_por_nome || "" });
      delete c.grupoId;
      if(c.origem === "aluno") c.origem = "promovido";
    }
    guardar(); return;
  }
  if(l.status === "recusado"){
    if(c && c.usuarioId && c.usuarioId !== eu){ db.flashcards = db.flashcards.filter(x => x.id !== l.id); return; }   // a equipe não guarda o cartão recusado
    if(c){ Object.assign(c, { sugeridoParaEquipe: true, decisaoEm: (l.atualizado_em || "").slice(0, 10), motivoRecusa: l.motivo || "" }); delete c.aprovadoEm; }
    guardar(); return;
  }
  // pendente: o autor já o tem; a equipe recebe uma cópia para a fila de sugeridos
  if(!c){ c = novo({ usuarioId: l.autor_id, origem: "aluno", sugeridoParaEquipe: true, sugeridoEm: (l.criado_em || "").slice(0, 10) || hojeISO() }); db.flashcards.push(c); }
  else{ Object.assign(c, campos); if(c.usuarioId === eu) c.sugeridoParaEquipe = true; }
  guardar();
}
