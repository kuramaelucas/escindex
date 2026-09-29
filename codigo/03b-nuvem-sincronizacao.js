/* codigo/03b-nuvem-sincronizacao.js — Nuvem (seção 2-C), parte 2: NUVEM_TABELAS (o estudo de cada pessoa), a fila de envio, a sincronização (enviar, receber, agendar) e o calendário compartilhado.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ---------------------------- o mapa das tabelas -------------------------
   Para cada tabela da nuvem: como um registro local vira linha do banco,
   como uma linha do banco volta para o db local, e se ela é REGISTRO (só
   junta, nunca sobrescreve) ou ESTADO (vale o mais recente). */
const NUVEM_TABELAS = {
  perfis: {
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.id,
    aplicar: linha => { nuvemAplicarPerfilLocal(linha); },
  },
  respostas: {
    tipo: "registro", tempo: "criado_em",
    chave: r => r.id,
    aplicar: linha => {
      if(db.respostas.some(r => r.id === linha.id)) return;
      db.respostas.push({
        id: linha.id, usuarioId: linha.usuario_id, questaoId: linha.questao_id,
        areaId: linha.area_id, especialidadeId: linha.especialidade_id, assuntoId: linha.assunto_id,
        alternativaEscolhida: linha.alternativa_escolhida, correta: linha.correta,
        confianca: linha.confianca, data: linha.data, tempoSeg: linha.tempo_seg,
        sessaoId: linha.sessao_id,
      });
    },
  },
  revisoes: {
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.usuario_id + "|" + r.questao_id,
    aplicar: linha => {
      if(!db.revisoes[linha.usuario_id]) db.revisoes[linha.usuario_id] = {};
      db.revisoes[linha.usuario_id][linha.questao_id] = {
        repeticoes: linha.repeticoes, fator: linha.fator, intervalo: linha.intervalo,
        proximaRevisao: linha.proxima_revisao, ultimaData: linha.ultima_data,
        ultimaCorreta: linha.ultima_correta, ultimaConfianca: linha.ultima_confianca,
      };
    },
  },
  revisoes_flashcards: {
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.usuario_id + "|" + r.cartao_id,
    aplicar: linha => {
      if(!db.revisoesFlashcards) db.revisoesFlashcards = {};
      if(!db.revisoesFlashcards[linha.usuario_id]) db.revisoesFlashcards[linha.usuario_id] = {};
      db.revisoesFlashcards[linha.usuario_id][linha.cartao_id] = {
        repeticoes: linha.repeticoes, fator: linha.fator, intervalo: linha.intervalo,
        vistas: linha.vistas, proximaRevisao: linha.proxima_revisao,
        ultimaData: linha.ultima_data, ultimaNota: linha.ultima_nota,
      };
    },
  },
  dias_cartoes: {
    // registro (um dia é um dia) mas ATUALIZÁVEL: a quantidade de cartões
    // daquele dia cresce ao longo do dia, e o outro aparelho precisa da
    // contagem nova, não da primeira que subiu
    tipo: "registro", atualizavel: true, tempo: "criado_em",
    chave: r => r.usuario_id + "|" + r.dia,
    aplicar: linha => {
      if(!db.diasCartoes) db.diasCartoes = {};
      const lista = db.diasCartoes[linha.usuario_id] = db.diasCartoes[linha.usuario_id] || [];
      if(!lista.includes(linha.dia)){ lista.push(linha.dia); lista.sort(); }
      if(typeof linha.quantidade === "number"){
        if(!db.cartoesPorDia) db.cartoesPorDia = {};
        if(!db.cartoesPorDia[linha.usuario_id]) db.cartoesPorDia[linha.usuario_id] = {};
        const daqui = db.cartoesPorDia[linha.usuario_id][linha.dia] || 0;
        // dois aparelhos no mesmo dia: vale o maior, porque cada um conta só
        // o que passou por ele e a soma real nunca é menor que qualquer um
        db.cartoesPorDia[linha.usuario_id][linha.dia] = Math.max(daqui, linha.quantidade);
      }
    },
  },
  favoritos: {
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.usuario_id + "|" + r.questao_id,
    aplicar: linha => {
      const i = db.favoritos.findIndex(f => f.usuarioId === linha.usuario_id && f.questaoId === linha.questao_id);
      if(linha.removido){ if(i >= 0) db.favoritos.splice(i, 1); return; }
      const fav = { usuarioId: linha.usuario_id, questaoId: linha.questao_id, data: linha.data, nota: linha.nota || "" };
      if(i >= 0) db.favoritos[i] = fav; else db.favoritos.push(fav);
    },
  },
  favoritos_cartoes: {
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.usuario_id + "|" + r.cartao_id,
    aplicar: linha => {
      if(!Array.isArray(db.favoritosCartoes)) db.favoritosCartoes = [];
      const i = db.favoritosCartoes.findIndex(f => f.usuarioId === linha.usuario_id && f.cartaoId === linha.cartao_id);
      if(linha.removido){ if(i >= 0) db.favoritosCartoes.splice(i, 1); return; }
      const fav = { usuarioId: linha.usuario_id, cartaoId: linha.cartao_id, data: linha.data };
      if(i >= 0) db.favoritosCartoes[i] = fav; else db.favoritosCartoes.push(fav);
    },
  },
  questoes_ocultas: {
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.usuario_id + "|" + r.questao_id,
    aplicar: linha => {
      if(!Array.isArray(db.questoesOcultas)) db.questoesOcultas = [];
      const i = db.questoesOcultas.findIndex(o => o.usuarioId === linha.usuario_id && o.questaoId === linha.questao_id);
      if(linha.removido){ if(i >= 0) db.questoesOcultas.splice(i, 1); return; }
      const reg = { usuarioId: linha.usuario_id, questaoId: linha.questao_id, data: linha.data };
      if(i >= 0) db.questoesOcultas[i] = reg; else db.questoesOcultas.push(reg);
    },
  },
  destaques: {
    // um trecho marcado em questão ou cartão; apagar marca "removido" para a
    // remoção também chegar ao outro aparelho
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.id,
    aplicar: linha => {
      if(!Array.isArray(db.destaques)) db.destaques = [];
      const i = db.destaques.findIndex(d => d.id === linha.id);
      if(linha.removido){ if(i >= 0) db.destaques.splice(i, 1); return; }
      const reg = { id: linha.id, usuarioId: linha.usuario_id, alvo: linha.alvo, inicio: +linha.inicio, fim: +linha.fim, trecho: linha.trecho, data: linha.data };
      if(i >= 0) db.destaques[i] = reg; else db.destaques.push(reg);
    },
  },
  flashcards_pessoais: {
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.id,
    aplicar: linha => {
      const i = db.flashcards.findIndex(c => c.id === linha.id);
      if(linha.removido){ if(i >= 0) db.flashcards.splice(i, 1); return; }
      const cartao = {
        id: linha.id, usuarioId: linha.usuario_id, assuntoId: linha.assunto_id,
        frente: linha.frente, verso: linha.verso,
        imagemUrl: linha.imagem_url || "", imagemLegenda: linha.imagem_legenda || "",
        questaoOrigemId: linha.questao_origem_id || null,
        origem: linha.origem || "aluno", status: linha.status || "ativo",
        criadoPor: linha.usuario_id, criadoEm: linha.criado_em || hojeISO(),
      };
      if(i >= 0) db.flashcards[i] = cartao; else db.flashcards.push(cartao);
    },
  },
  sessoes: {
    // é registro (um conjunto concluído nunca vira outro), mas ATUALIZÁVEL:
    // depois de ver o resumo dá para voltar e responder uma questão que
    // ficou em branco, e aí a linha daquele conjunto tem de mudar em vez de
    // conviver com uma cópia velha. A chave é a id do conjunto.
    tipo: "registro", atualizavel: true, tempo: "criado_em",
    chave: r => r.id,
    aplicar: linha => {
      const registro = {
        id: linha.id, usuarioId: linha.usuario_id, tipo: linha.tipo, data: linha.data,
        total: linha.total, acertos: linha.acertos, itens: linha.itens || [],
      };
      const i = db.sessoes.findIndex(s => s.id === linha.id);
      if(i >= 0) db.sessoes[i] = registro; else db.sessoes.push(registro);
    },
  },
  resultados_simulados: {
    tipo: "registro", tempo: "criado_em",
    chave: r => r.id,
    aplicar: linha => {
      if(db.resultadosSimulados.some(r => r.id === linha.id)) return;
      db.resultadosSimulados.push({
        id: linha.id, usuarioId: linha.usuario_id, simuladoId: linha.simulado_id,
        titulo: linha.titulo, nota: linha.nota, acertos: linha.acertos, total: linha.total,
        data: linha.data, itens: linha.itens || [], respostas: linha.respostas || {},
        tempos: linha.tempos || {}, tempoTotalSeg: linha.tempo_total_seg,
      });
    },
  },
  sessao_em_andamento: {
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.usuario_id,
    aplicar: linha => {
      if(!db.sessoesEmAndamento) db.sessoesEmAndamento = {};
      if(linha.dados) db.sessoesEmAndamento[linha.usuario_id] = linha.dados;
      else delete db.sessoesEmAndamento[linha.usuario_id];
    },
  },
};

/* ---------------------------- a fila de envio ----------------------------
   Guardada dentro do db (e portanto no localStorage), para sobreviver a
   fechar o navegador no meio de uma sessão de estudo sem internet. */
function nuvemEnfileirar(tabela, registro){
  if(!nuvemConectado()) return;
  if(!db.filaNuvem) db.filaNuvem = [];
  const desc = NUVEM_TABELAS[tabela];
  if(!desc) return;
  const chave = desc.chave(registro);
  if(desc.tipo === "estado" || desc.atualizavel){
    // estado não se acumula: a versão nova substitui a que ainda não subiu
    const i = db.filaNuvem.findIndex(op => op.tabela === tabela && op.chave === chave);
    if(i >= 0){ db.filaNuvem[i].registro = registro; return; }
  } else if(db.filaNuvem.some(op => op.tabela === tabela && op.chave === chave)){
    return; // registro já enfileirado
  }
  db.filaNuvem.push({ tabela, chave, registro });
}

/* Atalho usado pelas funções do app: monta a linha a partir do que acabou de
   acontecer e põe na fila. Fica tudo num lugar só para o resto do código não
   precisar saber os nomes das colunas do banco. */
function nuvemRegistrar(o){
  if(!nuvemConectado()) return;
  const meuId = nuvemSessao.usuarioId;
  if(o.resposta && o.resposta.usuarioId === meuId){
    const r = o.resposta;
    nuvemEnfileirar("respostas", {
      id: r.id, usuario_id: r.usuarioId, questao_id: r.questaoId,
      area_id: r.areaId || null, especialidade_id: r.especialidadeId || null,
      assunto_id: r.assuntoId || null, alternativa_escolhida: r.alternativaEscolhida,
      correta: !!r.correta, confianca: r.confianca || null, tempo_seg: r.tempoSeg || null,
      sessao_id: r.sessaoId || null, data: r.data,
    });
  }
  if(o.revisao && o.usuarioId === meuId){
    const e = o.revisao;
    nuvemEnfileirar("revisoes", {
      usuario_id: o.usuarioId, questao_id: o.questaoId,
      repeticoes: e.repeticoes, fator: e.fator, intervalo: e.intervalo,
      proxima_revisao: e.proximaRevisao || null, ultima_data: e.ultimaData || null,
      ultima_correta: typeof e.ultimaCorreta === "boolean" ? e.ultimaCorreta : null,
      ultima_confianca: e.ultimaConfianca || null,
    });
  }
  if(o.revisaoCartao && o.usuarioId === meuId){
    const e = o.revisaoCartao;
    nuvemEnfileirar("revisoes_flashcards", {
      usuario_id: o.usuarioId, cartao_id: o.cartaoId,
      repeticoes: e.repeticoes, fator: e.fator, intervalo: e.intervalo, vistas: e.vistas || 0,
      proxima_revisao: e.proximaRevisao || null, ultima_data: e.ultimaData || null,
      ultima_nota: e.ultimaNota || null,
    });
  }
  if(o.diaCartao && o.usuarioId === meuId){
    nuvemEnfileirar("dias_cartoes", {
      usuario_id: o.usuarioId, dia: o.diaCartao,
      quantidade: typeof o.quantidadeCartoesDoDia === "number" ? o.quantidadeCartoesDoDia : 0,
    });
  }
  if(o.favorito && o.favorito.usuarioId === meuId){
    nuvemEnfileirar("favoritos", {
      usuario_id: o.favorito.usuarioId, questao_id: o.favorito.questaoId,
      data: o.favorito.data || hojeISO(), nota: o.favorito.nota || "",
      removido: !!o.favorito.removido,
    });
  }
  if(o.favoritoCartao && o.favoritoCartao.usuarioId === meuId){
    nuvemEnfileirar("favoritos_cartoes", {
      usuario_id: o.favoritoCartao.usuarioId, cartao_id: o.favoritoCartao.cartaoId,
      data: o.favoritoCartao.data || hojeISO(), removido: !!o.favoritoCartao.removido,
    });
  }
  if(o.questaoOculta && o.questaoOculta.usuarioId === meuId){
    nuvemEnfileirar("questoes_ocultas", {
      usuario_id: o.questaoOculta.usuarioId, questao_id: o.questaoOculta.questaoId,
      data: o.questaoOculta.data || hojeISO(), removido: !!o.questaoOculta.removido,
    });
  }
  if(o.destaque && o.destaque.usuarioId === meuId){
    const d = o.destaque;
    nuvemEnfileirar("destaques", {
      id: d.id, usuario_id: d.usuarioId, alvo: d.alvo, inicio: d.inicio, fim: d.fim, trecho: d.trecho,
      data: d.data || hojeISO(), removido: !!d.removido,
    });
  }
  if(o.cartaoPessoal && o.cartaoPessoal.usuarioId === meuId){
    const c = o.cartaoPessoal;
    nuvemEnfileirar("flashcards_pessoais", {
      id: c.id, usuario_id: c.usuarioId, assunto_id: c.assuntoId || null,
      frente: c.frente, verso: c.verso, imagem_url: c.imagemUrl || null,
      imagem_legenda: c.imagemLegenda || null, questao_origem_id: c.questaoOrigemId || null,
      origem: c.origem || "aluno", status: c.status || "ativo",
      removido: !!o.removido, criado_em: c.criadoEm || hojeISO(),
    });
  }
  if(o.sessaoConcluida && o.sessaoConcluida.usuarioId === meuId){
    const s = o.sessaoConcluida;
    nuvemEnfileirar("sessoes", {
      id: s.id, usuario_id: s.usuarioId, tipo: s.tipo, data: s.data,
      total: s.total, acertos: s.acertos, itens: s.itens || [],
    });
  }
  if(o.resultadoSimulado && o.resultadoSimulado.usuarioId === meuId){
    const r = o.resultadoSimulado;
    nuvemEnfileirar("resultados_simulados", {
      id: r.id, usuario_id: r.usuarioId, simulado_id: r.simuladoId || null,
      titulo: r.titulo || null, nota: r.nota, acertos: r.acertos, total: r.total,
      data: r.data, itens: r.itens || [], respostas: r.respostas || {},
      tempos: r.tempos || {}, tempo_total_seg: r.tempoTotalSeg || null,
    });
  }
  if(o.sessaoEmAndamento && o.usuarioId === meuId){
    nuvemEnfileirar("sessao_em_andamento", {
      usuario_id: o.usuarioId,
      dados: o.sessaoEmAndamento === "apagar" ? null : o.sessaoEmAndamento,
    });
  }
}

/* ---------------------------- sincronizar --------------------------------- */
async function nuvemSincronizar(opcoes = {}){
  if(!nuvemConectado() || nuvemEstado.sincronizando) return false;
  // sessão vencida: insistir só geraria erro atrás de erro. A fila fica
  // guardada e sobe quando a pessoa entrar de novo.
  if(nuvemEstado.sessaoExpirada){
    nuvemEstado.ultimoErro = "Sua sessão expirou. Entre de novo para sincronizar — nada foi perdido.";
    return false;
  }
  if(typeof navigator !== "undefined" && navigator.onLine === false){
    nuvemEstado.ultimoErro = "Sem conexão — a fila sobe assim que a internet voltar.";
    return false;
  }
  nuvemEstado.sincronizando = true;
  _nuvemDentroDaSync = true;
  const erroAntes = nuvemEstado.ultimoErro;
  nuvemEstado.ultimoErro = null;
  try{
    nuvemConferirPerfil();
    let recusados = await nuvemEnviarFila();
    await nuvemReceberMudancas();
    await nuvemBaixarCalendario();
    recusados += await nuvemEnviarCalendarioPendente();
    recusados += await nuvemEnviarGlobaisPendentes();
    await nuvemBaixarGlobais();
    if(recusados){
      nuvemEstado.ultimoErro = recusados + (recusados === 1
        ? " registro foi recusado pela nuvem (veja o motivo abaixo). O resto subiu."
        : " registros foram recusados pela nuvem (veja os motivos abaixo). O resto subiu.");
    }
    nuvemEstado.ultimaSyncEm = new Date().toISOString();
    db.nuvem.ultimaSyncEm = nuvemEstado.ultimaSyncEm;
    saveState();
    return true;
  }catch(e){
    nuvemEstado.ultimoErro = e.semRede
      ? "Sem conexão — a fila sobe assim que a internet voltar."
      : (e.message || "Falha ao sincronizar.");
    saveState();
    if(!opcoes.silencioso && !e.semRede) toast(nuvemEstado.ultimoErro, "err");
    return false;
  }finally{
    nuvemEstado.sincronizando = false;
    _nuvemDentroDaSync = false;
    if(!opcoes.semRedesenhar && (opcoes.forcarRedesenho || erroAntes !== nuvemEstado.ultimoErro || nuvemPendentes() === 0)){
      if(typeof render === "function" && state.usuarioAtualId) render();
    }
  }
}

/* Um erro de rede, de sessão ou do servidor é passageiro: a fila espera e
   tenta de novo. Um erro de conteúdo (o servidor entendeu e recusou) não
   melhora com o tempo — insistir nele travaria a fila para sempre. */
function nuvemErroPassageiro(e){
  if(e.semRede) return true;                 // sem internet
  if(e.sessaoExpirada) return true;          // precisa entrar de novo
  if(e.status === 401 || e.status === 403) return true;  // token ou permissão
  if(e.status === 429) return true;          // servidor pedindo calma
  if(e.status >= 500) return true;           // servidor com problema
  return false;
}

/* Colunas que chegaram depois do primeiro esquema.sql. Quem criou o banco
   antes delas ainda não as tem, e o servidor recusaria o lote INTEIRO — a
   pessoa perderia a sincronização daquela tabela por causa de um campo que
   ela nem usa. Então: na primeira recusa por causa da coluna, o envio é
   refeito sem ela, e assim segue até a página ser recarregada (depois de
   rodar o nuvem/esquema.sql, um F5 volta a mandar tudo). O dado em si nunca
   se perde: ele vive no navegador como todo o resto. */
const NUVEM_CAMPOS_NOVOS = {
  perfis: ["boas_vindas_em", "ordem_estagios"],  // primeiro acesso; ordem própria dos estágios do 6º ano
  favoritos: ["nota"],            // a anotação pessoal da questão salva
  dias_cartoes: ["quantidade"],   // quantos cartões naquele dia
};
const _nuvemCamposAusentes = {};  // tabela -> lista de colunas que este banco não tem
function nuvemCampoQueFalta(tabela, e){
  const candidatos = NUVEM_CAMPOS_NOVOS[tabela] || [];
  const jaSabidos = _nuvemCamposAusentes[tabela] || [];
  const msg = e && e.message ? e.message : "";
  return candidatos.find(c => jaSabidos.indexOf(c) < 0 && new RegExp("'?" + c + "'?", "i").test(msg)) || null;
}
function nuvemSemOsCamposQueFaltam(tabela, registros){
  const fora = _nuvemCamposAusentes[tabela];
  if(!fora || !fora.length) return registros;
  return registros.map(r => {
    const copia = Object.assign({}, r);
    fora.forEach(c => delete copia[c]);
    return copia;
  });
}

/* Tabela nova que o banco de quem já usava a nuvem ainda não tem (enquanto o
   nuvem/esquema.sql não for rodado de novo). Sem isto, a DESCIDA quebraria
   inteira no primeiro 404 — uma tabela nova derrubaria a sincronização de
   todas as outras, que é o oposto do que uma novidade deve fazer. Aqui ela é
   anotada e pulada até a página ser recarregada; o que é dela fica guardado
   no navegador, como tudo mais. */
const _nuvemTabelasAusentes = new Set();
function nuvemTabelaNaoExiste(e){
  if(!e) return false;
  // tabela que falta responde 404 com o nome dela no caminho; coluna que
  // falta responde 400 e é tratada em NUVEM_CAMPOS_NOVOS, não aqui
  return e.status === 404 && !!e.tabela;
}
async function nuvemPostarLote(tabela, desc, registros){
  const juntar = (desc.tipo === "registro" && !desc.atualizavel) ? "resolution=ignore-duplicates" : "resolution=merge-duplicates";
  try{
    await nuvemChamar("/rest/v1/" + tabela, {
      method: "POST",
      headers: { "Prefer": juntar + ",return=minimal" },
      body: JSON.stringify(nuvemSemOsCamposQueFaltam(tabela, registros)),
    });
  }catch(e){
    const campo = nuvemCampoQueFalta(tabela, e);
    if(!campo) throw e;
    if(!_nuvemCamposAusentes[tabela]) _nuvemCamposAusentes[tabela] = [];
    _nuvemCamposAusentes[tabela].push(campo);
    await nuvemPostarLote(tabela, desc, registros);   // de novo, agora sem a coluna
  }
}

function nuvemTirarDaFila(ops){
  const fora = new Set(ops);
  db.filaNuvem = db.filaNuvem.filter(op => !fora.has(op));
}

/* Registro que a nuvem recusou de vez. Fica guardado (no máximo 50, os mais
   recentes) para a pessoa e a coordenação verem o motivo em Perfil, em vez
   de a fila só ficar parada sem explicação. */
function nuvemGuardarRecusado(tabela, op, motivo){
  if(!Array.isArray(db.nuvem.recusados)) db.nuvem.recusados = [];
  db.nuvem.recusados.unshift({
    tabela, chave: op.chave, motivo: motivo || "recusado pela nuvem",
    em: new Date().toISOString(),
  });
  db.nuvem.recusados = db.nuvem.recusados.slice(0, 50);
}

/* ---------------------------- calendário (compartilhado) -----------------
   O calendário de blocos não é estudo de uma pessoa: é o mesmo para todo
   mundo do ano, e só professor/administrador grava (a regra fica no banco,
   em calendario_alterar). Por isso ele não entra no mapa NUVEM_TABELAS (que
   é todo pensado em "linhas de um usuário só") — tem sua própria descida e
   subida, mais simples: a tabela inteira baixa para quem está conectado, e
   sobe só quando alguém com permissão de editar salva um ano. */
async function nuvemBaixarCalendario(){
  if(!db.nuvem.marcas) db.nuvem.marcas = {};
  if(!db.nuvem.calendarioPendente) db.nuvem.calendarioPendente = [];
  const desde = db.nuvem.marcas.calendario || "1970-01-01T00:00:00Z";
  const linhas = await nuvemChamar("/rest/v1/calendario?atualizado_em=gt." +
    encodeURIComponent(desde) + "&order=atualizado_em.asc&select=*");
  if(!linhas || !linhas.length) return;
  if(!db.sequenciasAno) db.sequenciasAno = {};
  let maior = desde;
  linhas.forEach(l => {
    // um ano que está na fila para subir daqui é mais novo que o que
    // acabou de descer: não sobrescreve o que ainda não foi enviado
    if(db.nuvem.calendarioPendente.includes(l.ano)) return;
    db.sequenciasAno[l.ano] = l.sequencia || [];
    // o exemplo antigo guardado na nuvem não pode desfazer o calendário real;
    // quem é da equipe já sobe o real no lugar, para ninguém mais receber
    if(trocarSequenciaDeExemplo(l.ano) && podeEditarCalendarioNaNuvem()) nuvemMarcarCalendarioPendente(l.ano);
    if(l.atualizado_em > maior) maior = l.atualizado_em;
  });
  if(maior !== desde) db.nuvem.marcas.calendario = maior;
}

/* Sobe os anos marcados como pendentes. Devolve quantos foram recusados de
   vez (ex.: quem salvou não é professor/admin, ou a política do banco ainda
   não foi criada) — o mesmo padrão de nuvemEnviarFila, reaproveitando
   nuvemGuardarRecusado para aparecer no mesmo lugar da tela. */
async function nuvemEnviarCalendarioPendente(){
  if(!db.nuvem.calendarioPendente || !db.nuvem.calendarioPendente.length) return 0;
  const pendentes = db.nuvem.calendarioPendente.slice();
  let recusados = 0;
  for(const ano of pendentes){
    try{
      await nuvemChamar("/rest/v1/calendario", {
        method: "POST",
        headers: { "Prefer": "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify([{ ano, sequencia: db.sequenciasAno[ano] || [], atualizado_por: nuvemSessao.usuarioId }]),
      });
      db.nuvem.calendarioPendente = db.nuvem.calendarioPendente.filter(a => a !== ano);
    }catch(e){
      if(nuvemErroPassageiro(e)) throw e;   // fica pendente, tenta de novo depois
      nuvemGuardarRecusado("calendario", { chave: ano }, e.message);
      db.nuvem.calendarioPendente = db.nuvem.calendarioPendente.filter(a => a !== ano);
      recusados++;
    }
  }
  return recusados;
}

/* Mesma regra do banco (e_equipe(), em nuvem/esquema.sql): só professor ou
   administrador aprovado grava o calendário. Conferir antes evita pôr na
   fila um envio que a nuvem certamente recusaria. */
function podeEditarCalendarioNaNuvem(){
  const eu = nuvemSessao && db.usuarios.find(x => x.id === nuvemSessao.usuarioId);
  return !!(eu && eu.status === "aprovado" && (eu.papel === "professor" || eu.papel === "admin"));
}

function nuvemMarcarGlobalPendente(tabela, chave){
  if(!nuvemConectado() || !NUVEM_GLOBAIS[tabela] || !NUVEM_GLOBAIS[tabela].podeGravar()) return;
  if(!Array.isArray(db.nuvem.globaisPendentes)) db.nuvem.globaisPendentes = [];
  if(!db.nuvem.globaisPendentes.some(p => p.tabela === tabela && p.chave === chave)) db.nuvem.globaisPendentes.push({ tabela, chave });
}
async function nuvemBaixarGlobais(){
  if(!db.nuvem.marcas) db.nuvem.marcas = {};
  const pendentes = db.nuvem.globaisPendentes || [];
  for(const [tabela, desc] of Object.entries(NUVEM_GLOBAIS)){
    if(_nuvemTabelasAusentes.has(tabela)) continue;
    const desde = db.nuvem.marcas[tabela] || "1970-01-01T00:00:00Z";
    let linhas;
    try{
      linhas = await nuvemChamar("/rest/v1/" + tabela + "?atualizado_em=gt." +
        encodeURIComponent(desde) + "&order=atualizado_em.asc&limit=1000&select=*");
    }catch(e){
      // tabela que o esquema.sql desta versão cria e o banco ainda não tem
      if(!nuvemTabelaNaoExiste(e)) throw e;
      _nuvemTabelasAusentes.add(tabela);
      continue;
    }
    let maior = desde;
    (linhas || []).forEach(l => {
      const chave = desc.chave(l);
      // o que ainda vai subir daqui é mais novo que o que desceu
      if(!pendentes.some(p => p.tabela === tabela && p.chave === chave)){
        try{ desc.aplicar(l); }catch(e){ console.error("Linha da nuvem ignorada em " + tabela, e); }
      }
      if(l.atualizado_em > maior) maior = l.atualizado_em;
    });
    if(maior !== desde) db.nuvem.marcas[tabela] = maior;
  }
}
async function nuvemEnviarGlobaisPendentes(){
  const fila = (db.nuvem.globaisPendentes || []).slice();
  let recusados = 0;
  for(const p of fila){
    const desc = NUVEM_GLOBAIS[p.tabela];
    const tirar = () => { db.nuvem.globaisPendentes = db.nuvem.globaisPendentes.filter(x => !(x.tabela === p.tabela && x.chave === p.chave)); };
    if(!desc){ tirar(); continue; }
    if(_nuvemTabelasAusentes.has(p.tabela)) continue;   // sobe quando a tabela existir
    try{
      // tabela com envio próprio (as questões: imagem primeiro, depois a linha)
      if(desc.enviar){
        if(await desc.enviar(p.chave) !== false) tirar();  // false = fica na fila, tenta de novo depois
        continue;
      }
      const linha = desc.linha(p.chave);
      if(!linha){ tirar(); continue; }                   // o registro não existe mais aqui: nada a subir
      Object.assign(linha, { atualizado_por: nuvemSessao.usuarioId });
      if(desc.alheia && desc.alheia(linha)){
        // a linha é de OUTRA pessoa (moderar um comentário, marcar um
        // feedback como lido): vai como alteração da linha que já existe.
        // O upsert passaria pela regra de INSERÇÃO do banco, que só aceita
        // linha em nome próprio — e a moderação seria recusada.
        await nuvemChamar("/rest/v1/" + p.tabela + "?" + desc.colunaChave + "=eq." + encodeURIComponent(p.chave), {
          method: "PATCH", headers: { "Prefer": "return=minimal" }, body: JSON.stringify(linha),
        });
      }else{
        await nuvemChamar("/rest/v1/" + p.tabela, {
          method: "POST",
          headers: { "Prefer": "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify([linha]),
        });
      }
      tirar();
    }catch(e){
      if(nuvemTabelaNaoExiste(e)){ _nuvemTabelasAusentes.add(p.tabela); continue; }
      if(nuvemErroPassageiro(e)) throw e;
      nuvemGuardarRecusado(p.tabela, { chave: p.chave }, e.message);
      tirar();
      recusados++;
    }
  }
  return recusados;
}

/* Marca um ano para subir na próxima sincronização — chamado depois de
   qualquer edição na sequência de blocos daquele ano. */
function nuvemMarcarCalendarioPendente(ano){
  if(!nuvemConectado()) return;
  if(!db.nuvem.calendarioPendente) db.nuvem.calendarioPendente = [];
  if(!db.nuvem.calendarioPendente.includes(ano)) db.nuvem.calendarioPendente.push(ano);
}

/* Sobe a fila. Devolve quantos registros a nuvem recusou de vez.
   Um registro ruim (uma coluna que o banco não conhece, um id repetido de
   outra pessoa) não pode impedir todo o resto de subir nem o download de
   acontecer: por isso, quando um lote é recusado, ele é tentado de novo um a
   um e só o registro culpado sai da fila, com o motivo guardado. */
async function nuvemEnviarFila(){
  if(!db.filaNuvem || !db.filaNuvem.length) return 0;
  // uma chamada por tabela, em lotes, mantendo a ordem em que aconteceram
  const tabelas = [];
  db.filaNuvem.forEach(op => { if(!tabelas.includes(op.tabela)) tabelas.push(op.tabela); });
  let recusados = 0;
  for(const tabela of tabelas){
    const desc = NUVEM_TABELAS[tabela];
    if(!desc){ nuvemTirarDaFila(db.filaNuvem.filter(op => op.tabela === tabela)); continue; }
    if(_nuvemTabelasAusentes.has(tabela)) continue;  // sobe quando a tabela existir
    const ops = db.filaNuvem.filter(op => op.tabela === tabela);
    for(let i = 0; i < ops.length; i += 200){
      const lote = ops.slice(i, i + 200);
      try{
        await nuvemPostarLote(tabela, desc, lote.map(op => op.registro));
        nuvemTirarDaFila(lote);              // só sai da fila o que o servidor confirmou
      }catch(e){
        if(nuvemTabelaNaoExiste(e)){
          // a tabela é nova e este banco ainda não a tem: o que é dela espera
          // guardado, e as outras tabelas seguem sincronizando normalmente
          _nuvemTabelasAusentes.add(tabela);
          break;
        }
        if(nuvemErroPassageiro(e)) throw e;  // a fila inteira espera a próxima vez
        for(const op of lote){
          try{
            await nuvemPostarLote(tabela, desc, [op.registro]);
            nuvemTirarDaFila([op]);
          }catch(e2){
            if(nuvemErroPassageiro(e2)) throw e2;
            nuvemGuardarRecusado(tabela, op, e2.message);
            nuvemTirarDaFila([op]);
            recusados++;
          }
        }
      }
    }
  }
  return recusados;
}

async function nuvemReceberMudancas(){
  const meuId = nuvemSessao.usuarioId;
  if(!db.nuvem.marcas) db.nuvem.marcas = {};
  for(const [tabela, desc] of Object.entries(NUVEM_TABELAS)){
    if(_nuvemTabelasAusentes.has(tabela)) continue;
    const coluna = tabela === "perfis" ? "id" : "usuario_id";
    const desde = db.nuvem.marcas[tabela] || "1970-01-01T00:00:00Z";
    let maior = desde, pagina = 0;
    while(true){
      let linhas;
      try{
        linhas = await nuvemChamar(
          "/rest/v1/" + tabela +
          "?" + coluna + "=eq." + encodeURIComponent(meuId) +
          "&" + desc.tempo + "=gt." + encodeURIComponent(desde) +
          "&order=" + desc.tempo + ".asc&limit=500&offset=" + (pagina * 500));
      }catch(e){
        // tabela nova que este banco ainda não tem: pula e segue com o resto,
        // em vez de derrubar a descida inteira por causa dela
        if(!nuvemTabelaNaoExiste(e)) throw e;
        _nuvemTabelasAusentes.add(tabela);
        break;
      }
      if(!linhas || !linhas.length) break;
      linhas.forEach(linha => {
        // o que ainda está na fila é mais novo que o servidor: não sobrescreve
        const chave = desc.chave(linha);
        if(db.filaNuvem.some(op => op.tabela === tabela && op.chave === chave)) return;
        try{ desc.aplicar(linha); }
        catch(e){ console.error("Linha da nuvem ignorada em " + tabela, e); }
        const t = linha[desc.tempo];
        if(t && t > maior) maior = t;
      });
      if(linhas.length < 500) break;
      pagina++;
    }
    // a marca d'água usa o relógio DO SERVIDOR (o horário que veio na linha),
    // nunca o do computador — relógio adiantado no celular pularia registros
    if(maior !== desde) db.nuvem.marcas[tabela] = maior;
  }
}

/* Chamada depois de cada gravação: junta as mudanças e sobe em bloco poucos
   segundos depois, em vez de uma chamada de rede por clique. Ver NUVEM_RITMO,
   no alto desta seção, para a tabela completa de "quando sobe o quê". */
function nuvemAgendarSync(){
  if(!nuvemConectado() || _nuvemDentroDaSync) return;
  // fila grande não espera: quanto mais coisa parada no navegador, mais se
  // perde se o aparelho for fechado antes do próximo envio
  if(nuvemPendentes() >= NUVEM_RITMO.filaGrande){ nuvemSincronizarAgora(); return; }
  const agora = Date.now();
  if(!_nuvemEsperandoDesde) _nuvemEsperandoDesde = agora;
  const restaDoTeto = NUVEM_RITMO.tetoAgrupar - (agora - _nuvemEsperandoDesde);
  const espera = Math.max(0, Math.min(NUVEM_RITMO.agrupar, restaDoTeto));
  if(_nuvemTimer) clearTimeout(_nuvemTimer);
  _nuvemTimer = setTimeout(() => { _nuvemTimer = null; nuvemSincronizarAgora(); }, espera);
}

/* Sobe agora, sem esperar o agrupamento: é o caminho de quem voltou para a
   aba, recuperou a internet, entrou ou saiu da conta, e também o fim da
   espera acima. Devolve a promessa da sincronização, para quem precisa
   esperar o fim dela (sair da conta, por exemplo). */
function nuvemSincronizarAgora(opcoes = {}){
  if(_nuvemTimer){ clearTimeout(_nuvemTimer); _nuvemTimer = null; }
  if(_nuvemTimerOcioso){ clearTimeout(_nuvemTimerOcioso); _nuvemTimerOcioso = null; }
  _nuvemEsperandoDesde = 0;
  const promessa = nuvemSincronizar(Object.assign({silencioso:true}, opcoes));
  const depois = (subiu) => {
    // sobrou fila porque algo entrou nela durante o envio: novo lote, mesma
    // regra de agrupamento. Se a sincronização falhou, quem tenta de novo é o
    // ciclo da aba aberta (ou a volta da internet) — insistir aqui viraria um
    // laço de tentativas a cada dois segundos com a internet caída.
    if(subiu && nuvemPendentes() > 0){ nuvemAgendarSync(); return; }
    nuvemCicloOcioso();
  };
  promessa.then(depois, () => depois(false));
  return promessa;
}

/* Aba aberta e sem ninguém mexendo: de 45 em 45 s a plataforma confere se há
   novidade vinda de outro aparelho. Com a aba escondida o ciclo para — não
   adianta gastar rede numa tela que ninguém está vendo, e voltar para a aba
   já sincroniza na hora (ver nuvemLigarGatilhos). */
function nuvemCicloOcioso(){
  if(_nuvemTimerOcioso){ clearTimeout(_nuvemTimerOcioso); _nuvemTimerOcioso = null; }
  if(!nuvemConectado() || typeof window === "undefined") return;
  if(typeof document !== "undefined" && document.hidden) return;
  _nuvemTimerOcioso = setTimeout(() => {
    _nuvemTimerOcioso = null;
    if(typeof document !== "undefined" && document.hidden) return;
    nuvemSincronizarAgora();
  }, NUVEM_RITMO.ocioso);
}
