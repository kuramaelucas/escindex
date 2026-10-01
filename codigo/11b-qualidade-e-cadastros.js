/* codigo/11b-qualidade-e-cadastros.js — Questões Difíceis e controle de qualidade (21), Fila de Dúvidas (23), cadastros, usuários e Feedback dos Usuários (24).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   21. PROFESSOR — Fila de Questões Difíceis
   ========================================================================== */
function renderRevisaoDificeis(){
  const aba = state.filtroRota.abaQualidade || "dificeis";
  const lista = questoesDificeis();
  const sinalizadas = questoesSinalizadas();
  const sugeridas = questoesSugeridas();
  const duplicadas = gruposDeDuplicatas();
  const cartoesSugeridos = flashcardsSugeridos();
  return `
  <div class="page-header"><h2>Controle de Qualidade</h2><p>Questões que merecem uma segunda olhada: baixa taxa de acerto, sinalizadas por alunos, ou sugeridas para o banco geral. Professores, residentes e administradores têm acesso — e podem editar a questão direto daqui.</p></div>
  <div class="tabs">
    <div class="tab ${aba==="dificeis"?"active":""}" onclick="mudarAbaQualidade('dificeis')">Questões Difíceis (${lista.length})</div>
    <div class="tab ${aba==="sinalizadas"?"active":""}" onclick="mudarAbaQualidade('sinalizadas')">Sinalizadas por Alunos (${sinalizadas.length})</div>
    <div class="tab ${aba==="sugeridas"?"active":""}" onclick="mudarAbaQualidade('sugeridas')">Enviadas pela Turma (${sugeridas.length})</div>
    <div class="tab ${aba==="duplicadas"?"active":""}" onclick="mudarAbaQualidade('duplicadas')">Duplicadas (${duplicadas.length})</div>
    <div class="tab ${aba==="flashcards"?"active":""}" onclick="mudarAbaQualidade('flashcards')">Flashcards Sugeridos (${cartoesSugeridos.length})</div>
  </div>
  ${aba==="dificeis" ? renderListaDificeis(lista)
    : aba==="sinalizadas" ? renderListaSinalizadas(sinalizadas)
    : aba==="duplicadas" ? renderListaDuplicadas(duplicadas)
    : aba==="flashcards" ? renderListaFlashcardsSugeridos(cartoesSugeridos)
    : renderListaSugeridas(sugeridas)}`;
}
function renderListaFlashcardsSugeridos(lista){
  const pag = paginar(lista, "qualidade-flashcards", {porPagina:10});
  return `<p class="text-sm muted mb-2">Cartões que alunos escreveram no próprio caderno e sugeriram para o baralho oficial da equipe. Só ficam visíveis para todos depois de aprovados — até lá, continuam apenas no baralho de quem os escreveu.</p>
  ${lista.length ? pag.itens.map(c=>{
    const autor = getUsuario(c.criadoPor);
    return `<div class="card mb-2">
      <div class="qcard-meta"><span class="badge badge-muted">${escapeHtml(nomeAssunto(c.assuntoId))}</span></div>
      <div class="text-sm mt-1" style="font-weight:600">${escapeHtml(c.frente)}</div>
      <div class="text-sm mt-1 muted">${escapeHtml(c.verso)}</div>
      ${c.imagemUrl ? `<div class="text-xs muted mt-1">Inclui imagem${c.imagemLegenda?": "+escapeHtml(c.imagemLegenda):""}</div>` : ""}
      <div class="text-xs muted mt-1">Sugerido por ${escapeHtml(autor?autor.nome:"—")} em ${formatDataBR(c.sugeridoEm)}</div>
      <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
        <button class="btn btn-secondary btn-sm" onclick="abrirFormularioFlashcard('${c.id}')">${iconeSvg("edit")} Ver/editar antes de aprovar</button>
        ${podeGerirConteudo() ? `<button class="btn btn-primary btn-sm" onclick="aprovarFlashcardSugerido('${c.id}')">Aprovar para o baralho da equipe</button>
        <button class="btn btn-danger btn-sm" onclick="recusarFlashcardSugerido('${c.id}')">Recusar</button>` : ""}
      </div>
    </div>`;
  }).join("") : '<div class="empty-state">Nenhuma sugestão de flashcard pendente no momento.</div>'}
  ${controlesPaginacao(pag, "sugestão(ões) de flashcard")}`;
}
function mudarAbaQualidade(aba){ state.filtroRota.abaQualidade = aba; render(); }
function podeAprovarQuestoes(){ const u = usuarioAtual(); return u && (u.papel==="admin" || u.papel==="professor"); }
function questoesSinalizadas(){
  return db.questoes.filter(q=>q.sinalizacoes && q.sinalizacoes.length>0).sort((a,b)=>b.sinalizacoes.length-a.sinalizacoes.length);
}
function questoesSugeridas(){
  return db.questoes.filter(q=>q.status==="pendente").sort((a,b)=>a.criadoEm.localeCompare(b.criadoEm));
}
function renderListaDuplicadas(grupos){
  const pag = paginar(grupos, "qualidade-duplicadas", {porPagina:10});
  return `<p class="text-sm muted mb-2">Questões com enunciado praticamente idêntico — normalmente a mesma prova importada duas vezes, ou uma questão que a banca repetiu. Manter duplicatas estraga as estatísticas (a mesma questão conta duas vezes) e faz o aluno responder o mesmo caso sem perceber.</p>
  ${grupos.length ? pag.itens.map((g,gi)=>`<div class="card mb-2">
    <div class="qcard-meta mb-1"><span class="badge badge-amber">${g.length} cópias</span><span class="badge badge-muted">${escapeHtml(nomeAssunto(g[0].assuntoId))}</span></div>
    <div class="text-sm" style="font-weight:600"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${g[0].id}')">${escapeHtml(g[0].enunciado.slice(0,180))}…</span></div>
    <div class="table-wrap mt-2"><table><thead><tr><th>Instituição / Ano</th><th>Status</th><th>Respostas</th><th></th></tr></thead><tbody>
      ${g.map((q,i)=>`<tr>
        <td class="text-sm">${escapeHtml(q.banca)} · ${q.ano}${i===0?' <span class="badge badge-accent">mais antiga</span>':""}</td>
        <td>${badgeStatusQuestao(q.status)}</td>
        <td class="text-sm">${(q.estatisticas&&q.estatisticas.respostas)||0}</td>
        <td class="flex gap-1">
          <button class="icon-btn" title="Ver na íntegra" onclick="abrirQuestaoCompleta('${q.id}')">${iconeSvg("search")}</button>
          <button class="icon-btn" title="Editar" onclick="abrirFormularioQuestao('${q.id}')">${iconeSvg("edit")}</button>
          <button class="icon-btn" title="Excluir esta cópia" onclick="confirmarExcluirQuestao('${q.id}')">${iconeSvg("trash")}</button>
        </td>
      </tr>`).join("")}
    </tbody></table></div>
    <button class="btn btn-danger btn-sm mt-2" onclick="manterApenasUmaDuplicata(${gi + (pag.pagina-1)*pag.tamanho})">Manter só a com mais respostas e excluir as outras</button>
  </div>`).join("") : '<div class="empty-state">Nenhuma questão duplicada encontrada no banco.</div>'}
  ${controlesPaginacao(pag, "grupo(s) de duplicatas")}`;
}
function manterApenasUmaDuplicata(indiceGrupo){
  const grupos = gruposDeDuplicatas();
  const g = grupos[indiceGrupo]; if(!g) return;
  const manter = g.slice().sort((a,b)=>(((b.estatisticas||{}).respostas||0)-((a.estatisticas||{}).respostas||0)))[0];
  const excluir = g.filter(q=>q.id!==manter.id);
  abrirModal(`${cabecalhoJanela(`Excluir ${excluir.length} cópia(s)`)}
    <p class="text-sm">Será mantida a cópia com mais respostas registradas (${(manter.estatisticas||{}).respostas||0} resposta(s), ${escapeHtml(manter.banca)} ${manter.ano}). As demais serão excluídas definitivamente, junto com as estatísticas delas.</p>
    <div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="confirmarManterApenasUma('${manter.id}','${excluir.map(q=>q.id).join(",")}')">Excluir as cópias</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
}
function confirmarManterApenasUma(manterId, idsExcluir){
  const ids = (idsExcluir||"").split(",").filter(Boolean);
  ids.forEach(id=>{ const q = getQuestao(id); if(q) nuvemMarcarQuestaoFora(q, q.status==="pendente" ? "recusada" : "removida", "Cópia duplicada de outra questão do banco."); });
  db.questoes = db.questoes.filter(q=>!ids.includes(q.id));
  saveState(); fecharModal();
  toast(ids.length+" cópia(s) excluída(s).");
  render();
}
function renderListaSugeridas(lista){
  const pag = paginar(lista, "qualidade-sugeridas", {porPagina:10});
  return `<p class="text-sm muted mb-2">Questões que a turma enviou para o banco geral (não restritas a nenhum grupo). Só ficam disponíveis para todo mundo depois de aprovadas — e a plataforma guarda quem enviou e quem aprovou.${nuvemConectado() ? " <strong>Com a nuvem ligada, chegam aqui as enviadas de qualquer aparelho</strong>, com a imagem; aprovar coloca a questão no banco de todos, e recusar devolve o motivo a quem enviou." : ""}</p>
  ${lista.length ? pag.itens.map(q=>{
    const autor = getUsuario(q.criadoPor);
    return `<div class="card mb-2">
      <div class="qcard-meta"><span class="badge badge-muted">${escapeHtml(nomeAssunto(q.assuntoId))}</span><span class="badge badge-muted">${escapeHtml(q.banca||"")} ${q.ano}${q.numeroNaProva?" · nº "+q.numeroNaProva:""}</span>
        <span class="badge ${tipoProvaDe(q)==="graduacao"?"badge-amber":"badge-muted"}">${escapeHtml(infoTipoProva(tipoProvaDe(q)).nome)}</span>
        ${q.imagemUrl ? '<span class="badge badge-accent">com imagem</span>' : aguardaImagem(q) ? '<span class="badge badge-amber">falta a imagem</span>' : ""}
        ${q.naNuvem ? '<span class="badge badge-muted">na nuvem</span>' : ""}</div>
      <div class="text-sm mt-1" style="font-weight:600"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${q.id}')">${escapeHtml(q.enunciado.slice(0,180))}…</span></div>
      ${q.imagemUrl ? `<img class="imp-imagem-previa" src="${escapeHtml(q.imagemUrl)}" alt="${escapeHtml(q.imagemLegenda||"Imagem da questão")}" loading="lazy">` : ""}
      <div class="text-xs muted mt-1">Enviada por ${escapeHtml(autor?autor.nome:(q.autorNome||"—"))} em ${formatDataBR(q.criadoEm)}</div>
      <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
        ${botaoVerNaIntegra(q.id, "Ver questão completa")}
        <button class="btn btn-secondary btn-sm" onclick="abrirFormularioQuestao('${q.id}')">${iconeSvg("edit")} Ver/editar antes de aprovar</button>
        ${podeAprovarQuestoes() ? `<button class="btn btn-primary btn-sm" onclick="aprovarQuestaoSugerida('${q.id}')">Aprovar para o banco geral</button>
        <button class="btn btn-danger btn-sm" onclick="abrirRecusaQuestaoSugerida('${q.id}')">Recusar</button>` : '<span class="text-xs muted">A aprovação final para o banco geral é feita por um professor ou administrador — mas suas correções de formatação já ficam salvas.</span>'}
      </div>
    </div>`;
  }).join("") : '<div class="empty-state">Nenhuma sugestão pendente no momento.</div>'}
  ${controlesPaginacao(pag, "sugestão(ões)")}`;
}
function aprovarQuestaoSugerida(qid){
  const q = getQuestao(qid);
  q.status = "ativa";
  q.aprovadoPor = usuarioAtual().id;
  q.aprovadoPorNome = usuarioAtual().nome;
  nuvemMarcarQuestao(qid);
  saveState();
  toast(nuvemConectado() && questaoSobeParaNuvem(q)
    ? "Questão aprovada: ela entra no banco geral e desce para toda a turma na próxima sincronização."
    : "Questão aprovada e adicionada ao banco geral.");
  render();
}
/* Recusar é diferente de excluir: quem enviou fica sabendo, com o motivo
   (Enviar Questões › Suas questões enviadas). */
function abrirRecusaQuestaoSugerida(qid){
  abrirModal(`${cabecalhoJanela("Recusar a questão enviada")}
    <p class="text-sm">A questão sai da fila e não entra no banco. Quem enviou vê que ela foi recusada${nuvemConectado() ? ", com o motivo que você escrever aqui" : ""}.</p>
    <div class="field mt-1"><label class="label">Motivo (opcional)</label>
      <textarea class="textarea" id="motivoRecusaQuestao" placeholder="ex.: já existe no banco; gabarito diferente do oficial; falta a imagem da prova"></textarea></div>
    <div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="recusarQuestaoSugerida('${qid}')">Recusar</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
}
function recusarQuestaoSugerida(qid){
  const q = getQuestao(qid); if(!q) return;
  const campo = document.getElementById("motivoRecusaQuestao");
  nuvemMarcarQuestaoFora(q, "recusada", campo ? campo.value.trim() : "");
  db.questoes = db.questoes.filter(x=>x.id!==qid);
  saveState(); fecharModal();
  toast("Questão recusada.");
  render();
}
function renderListaDificeis(lista){
  const pag = paginar(lista, "qualidade-dificeis", {porPagina:10});
  return `<p class="text-sm muted mb-2">Taxa de acerto abaixo de ${Math.round(CONFIG.limiarTaxaAcertoDificil*100)}% (com pelo menos ${CONFIG.minRespostasParaAvaliarDificuldade} respostas). Avalie se são legitimamente difíceis ou se precisam de ajuste.</p>
  ${lista.length ? pag.itens.map(q=>{
    const taxa = pct(q.estatisticas.acertos, q.estatisticas.respostas);
    const dist = q.estatisticas.distribuicaoAlternativas;
    const maxDist = Math.max(1, ...Object.values(dist));
    const elim = q.estatisticas.eliminacoesAoErrar || {};
    const totalErros = q.estatisticas.respostas - q.estatisticas.acertos;
    const gabaritoEliminado = elim[q.gabarito] || 0;
    return `<div class="card mb-2">
      <div class="qcard-meta"><span class="badge badge-danger">${taxa}% de acerto</span><span class="badge badge-muted">${q.estatisticas.respostas} respostas</span><span class="badge badge-muted">${escapeHtml(nomeAssunto(q.assuntoId))}</span><span class="badge badge-muted">${q.ano}</span></div>
      <div class="text-sm mt-1" style="font-weight:600"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${q.id}')">${escapeHtml(q.enunciado.slice(0,180))}…</span></div>
      <div class="mt-2">
        ${q.alternativas.map(alt=>{
          const n = dist[alt.id]||0, largura = pct(n,maxDist);
          const nElim = elim[alt.id]||0;
          return `<div class="flex items-center gap-1 mb-1"><span class="text-xs" style="width:34px">${alt.id}${alt.id===q.gabarito?" ✓":""}</span><div class="progress-track" style="flex:1"><div class="progress-fill ${alt.id===q.gabarito?"":"amber"}" style="width:${largura}%"></div></div><span class="text-xs muted" style="width:26px;text-align:right">${n}</span>${nElim?`<span class="text-xs muted" style="width:120px;text-align:right" title="Vezes que quem errou já tinha riscado esta alternativa">riscada por ${nElim}${alt.id===q.gabarito?" ⚠":""}</span>`:""}</div>`;
        }).join("")}
      </div>
      ${gabaritoEliminado>0 ? `<div class="card-flat mt-2 text-xs" style="border-color:var(--amber)">${iconeSvg("alert")} <strong>${gabaritoEliminado} de ${totalErros}</strong> aluno(s) que erraram esta questão tinham riscado justamente a alternativa correta (${escapeHtml(q.gabarito)}) antes de responder — sinal de que o gabarito está redigido de um jeito que soa errado. Vale revisar a redação da alternativa ${escapeHtml(q.gabarito)}.</div>` : ""}
      <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
        ${botaoVerNaIntegra(q.id, "Ver questão completa")}
        <button class="btn btn-primary btn-sm" onclick="abrirFormularioQuestao('${q.id}')">${iconeSvg("edit")} Editar esta questão agora</button>
        <button class="btn btn-secondary btn-sm" onclick="marcarRevisadaProfessor('${q.id}')">Manter (é difícil mesmo)</button>
        <button class="btn btn-danger btn-sm" onclick="marcarQuestaoStatus('${q.id}','desatualizada')">Marcar desatualizada</button>
      </div>
    </div>`;
  }).join("") : '<div class="empty-state">Nenhuma questão na fila no momento.</div>'}
  ${controlesPaginacao(pag, "questão(ões) difícil(eis)")}`;
}
function renderListaSinalizadas(lista){
  const pag = paginar(lista, "qualidade-sinalizadas", {porPagina:10});
  return `<p class="text-sm muted mb-2">Questões que alunos marcaram como possivelmente desatualizadas ou incorretas, mais sinalizadas primeiro. Se houver muitas reclamações concordantes, considere excluir.</p>
  ${lista.length ? pag.itens.map(q=>`
    <div class="card mb-2">
      <div class="qcard-meta"><span class="badge badge-danger">${q.sinalizacoes.length} sinalização${q.sinalizacoes.length===1?"":"ões"}</span><span class="badge badge-muted">${escapeHtml(nomeAssunto(q.assuntoId))}</span><span class="badge badge-muted">${q.ano}</span>${badgeStatusQuestao(q.status)}</div>
      <div class="text-sm mt-1" style="font-weight:600"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${q.id}')">${escapeHtml(q.enunciado.slice(0,180))}…</span></div>
      <div class="mt-2">
        ${q.sinalizacoes.map(s=>`<div class="card-flat mb-1 text-sm"><span class="muted">${formatDataBR(s.data)}:</span> ${escapeHtml(s.comentario || "(sem comentário adicional)")}</div>`).join("")}
      </div>
      <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
        ${botaoVerNaIntegra(q.id, "Ver questão completa")}
        <button class="btn btn-primary btn-sm" onclick="abrirFormularioQuestao('${q.id}')">${iconeSvg("edit")} Editar esta questão agora</button>
        <button class="btn btn-secondary btn-sm" onclick="marcarQuestaoStatus('${q.id}','desatualizada')">Marcar desatualizada</button>
        <button class="btn btn-secondary btn-sm" onclick="descartarSinalizacoes('${q.id}')">Descartar sinalizações</button>
        <button class="btn btn-danger btn-sm" onclick="confirmarExcluirQuestao('${q.id}')">Excluir questão</button>
      </div>
    </div>`).join("") : '<div class="empty-state">Nenhuma questão sinalizada no momento.</div>'}
  ${controlesPaginacao(pag, "questão(ões) sinalizada(s)")}`;
}
function descartarSinalizacoes(qid){ getQuestao(qid).sinalizacoes = []; saveState(); toast("Sinalizações descartadas."); render(); }
function marcarRevisadaProfessor(qid){ getQuestao(qid).revisadaProfessor = true; saveState(); toast("Marcada como revisada pelo professor."); render(); }

/* ==========================================================================
   23. RESIDENTE — Fila de Dúvidas
   ========================================================================== */
function mudarAbaDuvidas(aba){ state.filtroRota.abaDuvidas = aba; render(); }
// dúvidas que já receberam resposta oficial (para consulta e para o residente
// acompanhar o que ele mesmo já respondeu)
function duvidasRespondidas(usuario){
  const todos = comentariosAtivos();
  const deAlunos = todos.filter(c=>!c.respostaOficial);
  let lista = deAlunos.filter(c=>todos.some(r=>r.questaoId===c.questaoId && r.respostaOficial && r.data>=c.data));
  if(usuario) lista = lista.filter(c=>{ const q=getQuestao(c.questaoId); return q && dentroDaAreaDeAtuacao(usuario, q.areaId); });
  return lista.sort((a,b)=>b.data.localeCompare(a.data));
}
function renderCardDuvida(c, respondida){
  const q = getQuestao(c.questaoId);
  if(!q) return "";
  const area = getArea(q.areaId);
  const respostas = comentariosAtivos().filter(r=>r.questaoId===c.questaoId && r.respostaOficial && r.data>=c.data).sort((a,b)=>a.data.localeCompare(b.data));
  return `<div class="card mb-2">
    <div class="qcard-meta">
      <span class="badge badge-accent">${escapeHtml(area?area.nome:"—")}</span>
      <span class="badge badge-muted">${escapeHtml(nomeEspecialidade(q.especialidadeId))}</span>
      <span class="badge badge-muted">${escapeHtml(nomeAssunto(q.assuntoId))}</span>
      <span class="badge badge-muted">${escapeHtml(q.banca)} · ${q.ano}</span>
      ${badgeStatusQuestao(q.status)}
    </div>
    <div class="text-sm mt-2" style="font-weight:600;white-space:pre-line"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${q.id}')">${escapeHtml(q.enunciado.slice(0,320))}${q.enunciado.length>320?"…":""}</span></div>
    <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
      ${botaoVerNaIntegra(q.id, "Abrir questão na íntegra (enunciado, alternativas, gabarito e explicação)")}
      <button class="btn btn-secondary btn-sm" onclick="abrirPromptDuvida('${q.id}')">${iconeSvg("message")} Prompt de segunda opinião (IA)</button>
      <button class="btn btn-secondary btn-sm" onclick="abrirFormularioQuestao('${q.id}')">${iconeSvg("edit")} Editar questão</button>
    </div>
    <div class="card-flat mt-2"><span style="font-weight:600">${escapeHtml(nomeAutorComentario(c))}</span> <span class="text-xs muted">em ${formatDataBR(c.data)}</span><div class="text-sm mt-1">${escapeHtml(c.texto)}</div></div>
    ${respostas.length ? respostas.map(r=>{
      return `<div class="card-flat mt-1" style="border-color:var(--accent)"><span style="font-weight:600">${escapeHtml(nomeAutorComentario(r))}</span> <span class="badge badge-accent">resposta oficial</span><div class="text-sm mt-1">${escapeHtml(r.texto)}</div><div class="text-xs muted mt-1">${formatDataBR(r.data)}</div></div>`;
    }).join("") : ""}
    ${!respondida ? `<textarea class="textarea mt-2" id="respostaDuvida-${c.id}" placeholder="Escreva a resposta oficial..." style="min-height:80px"></textarea>
    <button class="btn btn-primary btn-sm mt-1" onclick="responderDuvida('${c.id}','${q.id}')">Enviar resposta</button>` : `<div class="mt-2"><button class="link-btn" onclick="responderDuvidaExtra('${c.id}','${q.id}')">Acrescentar outra resposta oficial</button></div>`}
  </div>`;
}
function renderFilaDuvidas(){
  const u = usuarioAtual();
  const aba = state.filtroRota.abaDuvidas || "pendentes";
  const pendentes = duvidasPendentes(u);
  const respondidas = duvidasRespondidas(u);
  return `
  <div class="page-header"><h2>Fila de Dúvidas</h2><p>Perguntas de alunos${u.areasAtuacao&&u.areasAtuacao.length?" nas suas áreas de atuação ("+u.areasAtuacao.map(nomeArea).join(", ")+")":""}. Cada dúvida traz a questão completa, para você responder com o enunciado inteiro à vista.</p></div>
  <div class="tabs">
    <div class="tab ${aba==="pendentes"?"active":""}" onclick="mudarAbaDuvidas('pendentes')">Aguardando resposta (${pendentes.length})</div>
    <div class="tab ${aba==="respondidas"?"active":""}" onclick="mudarAbaDuvidas('respondidas')">Já respondidas (${respondidas.length})</div>
  </div>
  ${aba==="pendentes"
    ? (pendentes.length ? pendentes.map(c=>renderCardDuvida(c,false)).join("") : '<div class="empty-state">Nenhuma dúvida pendente no momento. 🎉</div>')
    : (respondidas.length ? respondidas.map(c=>renderCardDuvida(c,true)).join("") : '<div class="empty-state">Nenhuma dúvida respondida ainda.</div>')}
  `;
}
function responderDuvidaExtra(comentarioId, questaoId){
  abrirModal(`${cabecalhoJanela("Acrescentar resposta oficial")}
    <textarea class="textarea" id="respostaExtraTexto" style="min-height:120px" placeholder="Complemente a resposta anterior..."></textarea>
    <div class="flex gap-1 mt-2"><button class="btn btn-primary" onclick="enviarRespostaExtra('${questaoId}')">Enviar</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
}
function enviarRespostaExtra(questaoId){
  const texto = (document.getElementById("respostaExtraTexto").value||"").trim();
  if(!texto){ toast("Escreva a resposta antes de enviar.", "err"); return; }
  registrarComentario(questaoId, texto, true);
  fecharModal(); toast("Resposta enviada."); render();
}
function responderDuvida(comentarioId, questaoId){
  const texto = document.getElementById("respostaDuvida-"+comentarioId).value.trim();
  if(!texto){ toast("Escreva uma resposta antes de enviar.", "err"); return; }
  registrarComentario(questaoId, texto, true);
  toast("Resposta enviada.");
  render();
}
/* Revisar Formatação é trabalho dividido entre várias pessoas. Sem marcar
   o que já foi conferido, cada revisor relia do começo as mesmas questões.
   "Aprovar formatação" tira a questão da fila de TODOS os revisores (sobe
   para a nuvem, tabela formatacao_aprovada); ela continua no banco, igual,
   e volta para a fila com "Devolver à fila". Aprovar não é aprovar o
   conteúdo clínico — é só "a forma está boa, não precisa reler". */
function formatacaoAprovadaDe(qid){ return (db.formatacaoAprovada||{})[qid] || null; }
function renderRevisaoFormatacao(){
  const f = state.filtroRota;
  const termo = (f.buscaFormatacao||"").toLowerCase();
  const verAprovadas = !!f.formatacaoVerAprovadas;
  const todas = questoesAtivas(true);
  const nAprovadas = todas.filter(q=>formatacaoAprovadaDe(q.id)).length;
  let lista = todas.filter(q=>verAprovadas ? !!formatacaoAprovadaDe(q.id) : !formatacaoAprovadaDe(q.id));
  if(termo) lista = lista.filter(q=>q.enunciado.toLowerCase().includes(termo));
  lista = lista.slice().sort((a,b)=>(b.criadoEm||"").localeCompare(a.criadoEm||""));
  const pagFormatacao = paginar(lista, "formatacao", {porPagina:15, assinatura:termo+"|"+verAprovadas+"|"+lista.length});
  return `
  <div class="page-header"><h2>Revisar Formatação</h2><p>Leia as questões na íntegra pra pegar erro de digitação, alternativa fora de ordem ou mal formatada. "Editar" corrige na hora — pense nisso como uma revisão de forma, não necessariamente de conteúdo clínico. Quando a questão estiver boa, <strong>"Aprovar formatação"</strong> a tira da fila de todos os revisores, para ninguém reler o que já foi conferido.</p></div>
  <div class="flex gap-1 mb-2" style="flex-wrap:wrap">
    <button class="pill ${!verAprovadas?"active":""}" onclick="verFormatacaoAprovadas(false)">A revisar (${todas.length - nAprovadas})</button>
    <button class="pill ${verAprovadas?"active":""}" onclick="verFormatacaoAprovadas(true)">${iconeSvg("check")} Já aprovadas (${nAprovadas})</button>
  </div>
  <div class="flex gap-1 mb-2">
    <input class="input" id="buscaFormatacaoInput" style="max-width:280px" placeholder="Buscar por texto..." value="${escapeHtml(f.buscaFormatacao||"")}" onkeydown="if(event.key==='Enter') buscarFormatacao()">
    <button class="btn btn-secondary btn-sm" onclick="buscarFormatacao()">Buscar</button>
  </div>
  ${nuvemLigada() && !nuvemConectado() ? `<p class="text-xs muted mb-2">Você está numa conta só deste navegador: a aprovação vale aqui, mas não chega aos outros revisores. Entre com a conta da nuvem para dividir a fila.</p>` : ""}
  ${pagFormatacao.itens.map(q=>{
    const ap = formatacaoAprovadaDe(q.id);
    return `
    <div class="card mb-2">
      <div class="qcard-meta mb-1"><span class="badge badge-muted">${escapeHtml(nomeAssunto(q.assuntoId))}</span><span class="badge badge-muted">${escapeHtml(q.banca)} · ${q.ano}</span>${badgeStatusQuestao(q.status)}${ap ? `<span class="badge badge-accent">formatação aprovada${ap.porNome?" por "+escapeHtml(ap.porNome):""} em ${formatDataBR(ap.em)}</span>` : ""}</div>
      <div class="text-sm" style="white-space:pre-line">${escapeHtml(q.enunciado)}</div>
      <div class="mt-2">${q.alternativas.map(a=>`<div class="text-sm">${escapeHtml(a.id)}) ${escapeHtml(a.texto)}${a.id===q.gabarito?" ✓":""}</div>`).join("")}</div>
      <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
        ${ap
          ? `<button class="btn btn-ghost btn-sm" onclick="alternarFormatacaoAprovada('${q.id}')">${iconeSvg("refresh")} Devolver à fila</button>`
          : `<button class="btn btn-primary btn-sm" onclick="alternarFormatacaoAprovada('${q.id}')">${iconeSvg("check")} Aprovar formatação</button>`}
        <button class="btn btn-secondary btn-sm" onclick="abrirFormularioQuestao('${q.id}')">${iconeSvg("edit")} Editar</button>
      </div>
    </div>`;
  }).join("") || `<div class="empty-state">${verAprovadas ? "Nenhuma questão aprovada ainda." : (termo ? "Nenhuma questão encontrada." : "Nenhuma questão esperando revisão — todas já foram aprovadas.")}</div>`}
  ${controlesPaginacao(pagFormatacao, "questão(ões), da mais recente para a mais antiga")}`;
}
function verFormatacaoAprovadas(sim){ state.filtroRota.formatacaoVerAprovadas = !!sim; render(); }
function alternarFormatacaoAprovada(qid){
  if(!db.formatacaoAprovada) db.formatacaoAprovada = {};
  const u = usuarioAtual();
  const aprovou = !db.formatacaoAprovada[qid];
  if(aprovou) db.formatacaoAprovada[qid] = { porNome: (u && u.nome) || "", em: hojeISO() };
  else delete db.formatacaoAprovada[qid];
  nuvemMarcarGlobalPendente("formatacao_aprovada", qid);
  saveState();
  toast(aprovou
    ? "Formatação aprovada: a questão saiu da fila"+(nuvemConectado()?" de todos os revisores.":" (neste navegador).")
    : "A questão voltou para a fila de revisão.");
  render();
}
function buscarFormatacao(){ state.filtroRota.buscaFormatacao = document.getElementById("buscaFormatacaoInput").value; render(); }
/* ==========================================================================
   24. ADMIN — pedidos de acesso e usuários (aba "Cadastros e usuários" da
   tela Turma, seção 24-C)
   ==========================================================================
   Painel da Turma, Aprovar Cadastros e Usuários eram três telas sobre as
   mesmas pessoas: aprovar alguém o tirava de uma lista e o punha em outra, e
   quem olhava o uso da turma tinha de ir a outro menu para liberar o aluno
   que acabou de pedir. Agora é uma tela só (Turma), com duas abas: o painel
   de uso e esta, que reúne os pedidos de acesso (no alto, porque são o que
   espera decisão) e a lista de todos. As rotas antigas, "aprovar-cadastros"
   e "usuarios", continuam respondendo: abrem esta aba. */
function renderTurmaPessoas(u){
  const souMaster = podeAdmin("usuarios", u);
  return `
  ${podeAprovarCadastros(u) ? renderPedidosDeAcesso() : ""}
  ${souMaster ? `<details class="secao-expansivel">
    <summary><span class="card-title" style="margin:0">Níveis de administrador</span><span class="text-xs muted">o que cada nível enxerga</span></summary>
    <div class="secao-corpo">
      <p class="text-sm muted mb-2">Cada nível enxerga apenas as áreas correspondentes no menu. Só um administrador máster pode alterar papéis e níveis.</p>
      ${CONFIG.niveisAdmin.map(n=>`<div class="card-flat mb-1"><div style="font-weight:600">${escapeHtml(n.nome)}</div><div class="text-sm muted mt-1">${escapeHtml(n.descricao)}</div></div>`).join("")}
    </div>
  </details>
  ${renderUsuariosDaNuvem(souMaster)}
  ${renderUsuariosLocais(souMaster, u)}` : `<p class="text-xs muted mt-2">Papéis, níveis e exclusão de cadastros são do administrador máster.</p>`}`;
}
function renderPedidosDeAcesso(){
  const pendentes = db.usuarios.filter(u=>u.status==="pendente");
  return `
  <div class="card-title mb-1">Pedidos de acesso</div>
  <p class="text-sm muted mb-2">Solicitações aguardando aprovação. Quem é aprovado aparece na lista de usuários, logo abaixo.</p>
  ${renderCadastrosPendentesDaNuvem()}
  ${renderCardAvisoPedidosDeAcesso()}
  ${nuvemConectado() && pendentes.length ? '<div class="text-sm muted mb-1">Solicitações antigas, feitas só neste navegador:</div>' : ""}
  ${pendentes.length ? `<div class="table-wrap mb-2"><table><thead><tr><th>Nome</th><th>E-mail</th><th>Matrícula</th><th>Acesso solicitado</th><th>Data</th><th></th></tr></thead><tbody>
    ${pendentes.map(u=>`<tr><td>${escapeHtml(u.nome)}</td><td>${escapeHtml(u.email)}</td><td>${escapeHtml(u.matricula)}</td><td class="text-sm">${badgePapel(u.papel)}${u.areasAtuacao&&u.areasAtuacao.length?"<br><span class=\"text-xs muted\">"+u.areasAtuacao.map(nomeArea).join(", ")+"</span>":""}${u.assuntosAjuda&&u.assuntosAjuda.length?"<br><span class=\"text-xs muted\">ajuda com: "+u.assuntosAjuda.map(nomeEspecialidade).join(", ")+"</span>":""}</td><td>${formatDataBR(u.criadoEm)}</td><td class="flex gap-1"><button class="btn btn-primary btn-sm" onclick="aprovarUsuario('${u.id}')">Aprovar</button><button class="btn btn-danger btn-sm" onclick="rejeitarUsuario('${u.id}')">Recusar</button></td></tr>`).join("")}
  </tbody></table></div>` : (nuvemConectado() ? "" : '<div class="empty-state mb-2">Nenhuma solicitação pendente.</div>')}
  `;
}
function badgeStatusUsuario(status){
  const map = {aprovado:["badge-accent","Aprovado"], pendente:["badge-amber","Pendente"], rejeitado:["badge-danger","Recusado"], inativo:["badge-muted","Inativo"]};
  const [cls,label] = map[status] || ["badge-muted", status];
  return `<span class="badge ${cls}">${label}</span>`;
}
/* A turma de verdade: todo mundo que tem conta na nuvem, aprovado ou não.
   É aqui que reaparece quem foi aprovado em Aprovar Cadastros. */
function renderUsuariosDaNuvem(souMaster){
  if(!nuvemLigada()) return "";
  if(!nuvemConectado()){
    return `<div class="card mb-2" style="border-color:var(--amber)">
      <div class="card-title">${iconeSvg("database")} Cadastros da nuvem</div>
      <p class="text-sm muted">A nuvem está configurada, mas você entrou por uma conta só deste navegador. Saia e entre com o e-mail e a senha da sua conta da nuvem para ver e administrar a turma.</p>
    </div>`;
  }
  if(nuvemUsuarios === null){
    nuvemBuscarUsuarios();
    return `<div class="card mb-2"><p class="text-sm muted">Buscando os cadastros na nuvem…</p></div>`;
  }
  const porStatus = {aprovado:[], pendente:[], inativo:[], rejeitado:[]};
  nuvemUsuarios.forEach(p => { (porStatus[p.status] || (porStatus[p.status] = [])).push(p); });
  const pag = paginar(nuvemUsuarios, "usuarios-nuvem", {porPagina:30});
  return `<div class="card mb-2">
    <div class="flex justify-between items-center mb-1" style="flex-wrap:wrap;gap:.5rem">
      <div class="card-title" style="margin-bottom:0">${iconeSvg("database")} Cadastros da nuvem (${nuvemUsuarios.length})</div>
      <button class="btn btn-secondary btn-sm" onclick="nuvemBuscarUsuarios()">${iconeSvg("refresh")} Atualizar</button>
    </div>
    <p class="text-sm muted">${porStatus.aprovado.length} aprovado(s) · ${porStatus.pendente.length} pendente(s) · ${porStatus.inativo.length} inativo(s) · ${porStatus.rejeitado.length} recusado(s). <strong>Quem você aprova nos pedidos de acesso aparece aqui</strong> — a lista de pedidos mostra só quem ainda está pendente.</p>
    ${nuvemUsuariosErro ? `<p class="text-sm mt-1" style="color:var(--amber);font-weight:600">${escapeHtml(nuvemUsuariosErro)}</p>` : ""}
    ${nuvemUsuarios.length ? `<div class="table-wrap mt-2"><table>
      <thead><tr><th>Nome</th><th>E-mail / Matrícula</th><th>Ano</th><th>Papel</th><th>Nível de admin</th><th>Status</th><th></th></tr></thead>
      <tbody>${pag.itens.map(p => {
        const souEu = nuvemSessao && p.id === nuvemSessao.usuarioId;
        return `<tr>
        <td>${escapeHtml(p.nome || "(sem nome)")}${souEu?' <span class="badge badge-muted">você</span>':""}</td>
        <td class="text-sm">${escapeHtml(p.email || "")}<br><span class="muted">${escapeHtml(p.matricula || "—")}</span></td>
        <td class="text-sm">${escapeHtml(p.ano_faculdade || "—")}</td>
        <td>${souMaster
          ? `<select class="select" style="padding:.3rem .5rem" onchange="mudarPapelNaNuvem('${p.id}', this.value)">${CONFIG.papeis.map(x=>`<option value="${x}" ${p.papel===x?"selected":""}>${x}</option>`).join("")}</select>`
          : badgePapel(p.papel)}</td>
        <td>${p.papel !== "admin" ? '<span class="text-xs muted">—</span>'
          : souMaster
            ? `<select class="select" style="padding:.3rem .5rem" onchange="mudarNivelNaNuvem('${p.id}', this.value)">${CONFIG.niveisAdmin.map(n=>`<option value="${n.id}" ${(p.nivel_admin||"coordenacao")===n.id?"selected":""}>${escapeHtml(n.nome)}</option>`).join("")}</select>`
            : `<span class="badge badge-amber">${escapeHtml(rotuloNivelAdmin(p.nivel_admin||"coordenacao"))}</span>`}</td>
        <td>${badgeStatusUsuario(p.status)}</td>
        <td class="flex gap-1" style="flex-wrap:wrap">
          ${!souMaster ? '<span class="text-xs muted">sem permissão</span>' : souEu ? '<span class="text-xs muted">sua conta</span>' : `
            ${p.status !== "aprovado" ? `<button class="btn btn-primary btn-sm" onclick="mudarStatusNaNuvem('${p.id}','aprovado')">Aprovar</button>` : ""}
            ${p.status === "aprovado" ? `<button class="btn btn-ghost btn-sm" onclick="mudarStatusNaNuvem('${p.id}','inativo')">Inativar</button>` : ""}
            <button class="btn btn-danger btn-sm" onclick="confirmarExcluirUsuario('${p.id}','nuvem')">${iconeSvg("trash")} Excluir</button>`}
        </td></tr>`;
      }).join("")}</tbody>
    </table></div>
    ${controlesPaginacao(pag, "cadastro(s) na nuvem")}` : `<p class="text-sm mt-2">Nenhum cadastro na nuvem ainda.</p>`}
  </div>`;
}

function renderUsuariosLocais(souMaster, eu){
  const pagUsuarios = paginar(db.usuarios, "usuarios", {porPagina:30});
  const admins = db.usuarios.filter(u=>u.papel==="admin");
  return `<div class="card">
    <div class="card-title">Contas deste navegador (${db.usuarios.length})</div>
    <p class="text-sm muted mb-2">${nuvemConectado()
      ? "As contas de teste e as de antes da nuvem. Elas funcionam só neste computador e não sincronizam — a turma de verdade é a lista acima."
      : db.usuarios.length + " cadastro(s) no total · " + admins.length + " administrador(es)."}</p>
    <div class="table-wrap"><table><thead><tr><th>Nome</th><th>E-mail / Matrícula</th><th>Turma / Ano</th><th>Papel</th><th>Nível de admin</th><th>Status</th><th></th></tr></thead><tbody>
    ${pagUsuarios.itens.map(u=>`<tr>
      <td>${escapeHtml(u.nome)}${u.id===eu.id?' <span class="badge badge-muted">você</span>':""}${u.daNuvem?' <span class="badge badge-accent">da nuvem</span>':""}</td>
      <td class="text-sm">${escapeHtml(u.email)}<br><span class="muted">${escapeHtml(u.matricula)}</span></td>
      <td class="text-sm">${escapeHtml(u.papel==="aluno"?getGrupoDoUsuario(u).nome:"—")}<br><span class="muted">${escapeHtml(u.anoFaculdade||"—")}</span></td>
      <td>${souMaster
        ? `<select class="select" style="padding:.3rem .5rem" onchange="alterarPapelUsuario('${u.id}', this.value)">${CONFIG.papeis.map(p=>`<option value="${p}" ${u.papel===p?"selected":""}>${p}</option>`).join("")}</select>`
        : badgePapel(u.papel, u)}</td>
      <td>${u.papel!=="admin" ? '<span class="text-xs muted">—</span>'
        : souMaster
          ? `<select class="select" style="padding:.3rem .5rem" onchange="alterarNivelAdmin('${u.id}', this.value)">${CONFIG.niveisAdmin.map(n=>`<option value="${n.id}" ${nivelAdminDe(u)===n.id?"selected":""}>${escapeHtml(n.nome)}</option>`).join("")}</select>`
          : `<span class="badge badge-amber">${escapeHtml(rotuloNivelAdmin(nivelAdminDe(u)))}</span>`}</td>
      <td>${badgeStatusUsuario(u.status)}</td>
      <td class="flex gap-1" style="flex-wrap:wrap">${!souMaster ? '<span class="text-xs muted">sem permissão</span>' : `
        ${u.status==="inativo" ? `<button class="btn btn-secondary btn-sm" onclick="reativarUsuario('${u.id}')">Reativar</button>` : `<button class="btn btn-ghost btn-sm" onclick="desativarUsuario('${u.id}')">Inativar</button>`}
        ${u.id===eu.id ? "" : `<button class="btn btn-danger btn-sm" onclick="confirmarExcluirUsuario('${u.id}','local')">${iconeSvg("trash")} Excluir</button>`}`}
      </td>
    </tr>`).join("")}
    </tbody></table></div>
    ${controlesPaginacao(pagUsuarios, "cadastro(s) neste navegador")}
  </div>`;
}
function mudarPapelNaNuvem(id, papel){
  if(!podeAdmin("usuarios")){ toast("Só um administrador máster pode alterar papéis.", "err"); render(); return; }
  const linhaAtual = (nuvemUsuarios||[]).find(p=>p.id===id);
  // deixar de ser admin é deixar de ser máster: passa pela mesma trava
  if(papel !== "admin" && linhaAtual && linhaAtual.papel === "admin" && (linhaAtual.nivel_admin||"") === "master"
     && !podeDeixarDeSerMaster(id, "coordenacao", "nuvem")){ render(); return; }
  const campos = { papel };
  if(papel === "admin"){
    const linha = (nuvemUsuarios||[]).find(p=>p.id===id);
    if(linha && !linha.nivel_admin) campos.nivel_admin = "moderador";
  }
  nuvemAtualizarPerfil(id, campos, "Papel atualizado na nuvem.");
}
function mudarNivelNaNuvem(id, nivel){
  if(!podeAdmin("usuarios")){ toast("Só um administrador máster pode alterar níveis.", "err"); render(); return; }
  if(!podeDeixarDeSerMaster(id, nivel, "nuvem")) { render(); return; }
  nuvemAtualizarPerfil(id, { nivel_admin: nivel }, "Nível de acesso atualizado para " + rotuloNivelAdmin(nivel) + ".");
}
function mudarStatusNaNuvem(id, status){
  if(!podeAdmin("usuarios")){ toast("Só um administrador máster pode alterar o acesso.", "err"); return; }
  const rotulos = {aprovado:"Cadastro aprovado — a pessoa já pode entrar.", inativo:"Conta inativada: a pessoa deixa de conseguir entrar, mas o estudo dela fica guardado.", rejeitado:"Cadastro recusado."};
  nuvemAtualizarPerfil(id, { status }, rotulos[status] || "Status atualizado.");
}
/* Não dá para ficar sem administrador máster — e as duas listas NÃO se
   somam. Uma conta local de demonstração é máster só deste navegador: ela
   não passa no e_equipe() do banco, então não administra a turma da nuvem.
   Contá-la deixaria a coordenação se rebaixar achando que havia um suplente,
   e a partir daí ninguém mais poderia aprovar, promover ou excluir ninguém
   na nuvem — sem conserto pelo site, só pelo painel do Supabase.
   Por isso cada lado só conta com os seus. */
function podeDeixarDeSerMaster(id, novoNivel, ondeMora){
  if(novoNivel === "master") return true;
  const suplentes = ondeMora === "nuvem"
    ? (nuvemUsuarios||[]).filter(p => p.papel==="admin" && (p.nivel_admin||"coordenacao")==="master" && p.id!==id && p.status==="aprovado").length
    : db.usuarios.filter(u => u.papel==="admin" && nivelAdminDe(u)==="master" && u.id!==id).length;
  if(suplentes === 0){
    toast(ondeMora === "nuvem"
      ? "É preciso manter pelo menos um administrador máster NA NUVEM — é ele que aprova e administra a turma. Promova outra pessoa antes."
      : "É preciso manter pelo menos um administrador máster neste navegador.", "err");
    return false;
  }
  return true;
}

/* ---------------------------- excluir um cadastro -------------------------
   Inativar e excluir respondem a coisas diferentes: inativar é "esta pessoa
   não entra mais", guardando o estudo dela; excluir é "esta pessoa nunca
   deveria ter entrado" — um cadastro duplicado, um e-mail errado, alguém de
   fora da turma. Como excluir não tem volta, a janela diz, antes de
   confirmar, exatamente o que vai junto e o que fica. (Só as CONTAGENS:
   o estudo inteiro da pessoa é dadosDoUsuario, em "Seus dados". As duas
   tinham o mesmo nome, e esta, carregada depois, substituía a outra — o
   "Baixar uma cópia do meu estudo" entregava só números.) */
function contagemDosDadosDoUsuario(id){
  return {
    respostas: db.respostas.filter(r=>r.usuarioId===id).length,
    favoritos: db.favoritos.filter(f=>f.usuarioId===id).length + (db.favoritosCartoes||[]).filter(f=>f.usuarioId===id).length,
    cartoes: db.flashcards.filter(c=>c.usuarioId===id).length,
    sessoes: db.sessoes.filter(x=>x.usuarioId===id).length,
    simulados: db.resultadosSimulados.filter(x=>x.usuarioId===id).length,
    questoes: db.questoes.filter(q=>q.criadoPor===id).length,
    comentarios: db.comentarios.filter(c=>c.usuarioId===id).length,
    turmas: db.grupos.filter(g=>!g.oficial && g.criadoPor===id).length,
  };
}
function confirmarExcluirUsuario(id, onde){
  if(!podeAdmin("usuarios")){ toast("Só um administrador máster pode excluir cadastros.", "err"); return; }
  const local = getUsuario(id);
  const naNuvem = (nuvemUsuarios||[]).find(p=>p.id===id);
  const nome = (naNuvem && naNuvem.nome) || (local && local.nome) || "este cadastro";
  const email = (naNuvem && naNuvem.email) || (local && local.email) || "";
  if(usuarioAtual() && usuarioAtual().id === id){ toast("Você não pode excluir a própria conta.", "err"); return; }
  const ehMasterNaNuvem = !!(naNuvem && naNuvem.papel==="admin" && (naNuvem.nivel_admin||"")==="master");
  const ehMasterLocal = !!(local && local.papel==="admin" && nivelAdminDe(local)==="master");
  if(onde==="nuvem" && ehMasterNaNuvem && !podeDeixarDeSerMaster(id, "coordenacao", "nuvem")) return;
  if(onde==="local" && ehMasterLocal && !podeDeixarDeSerMaster(id, "coordenacao", "local")) return;
  const d = contagemDosDadosDoUsuario(id);
  const vaiJunto = [
    d.respostas ? d.respostas + " resposta(s)" : "",
    d.favoritos ? d.favoritos + " favorito(s)" : "",
    d.cartoes ? d.cartoes + " cartão(ões) pessoal(is)" : "",
    d.sessoes ? d.sessoes + " sessão(ões)" : "",
    d.simulados ? d.simulados + " nota(s) de simulado" : "",
  ].filter(Boolean);
  const fica = [
    d.questoes ? d.questoes + " questão(ões) que enviou ao banco" : "",
    d.comentarios ? d.comentarios + " comentário(s) em questões" : "",
    d.turmas ? d.turmas + " turma(s) que criou" : "",
  ].filter(Boolean);
  abrirModal(`
    ${cabecalhoJanela(`Excluir o cadastro de ${escapeHtml(nome)}?`)}
    <p class="text-sm">${escapeHtml(email)}</p>
    <p class="text-sm mt-2"><strong>Isto não pode ser desfeito.</strong> Se a intenção é só tirar o acesso, use <em>Inativar</em>: a pessoa deixa de entrar e o estudo dela continua guardado.</p>
    ${vaiJunto.length ? `<div class="card-flat mt-2"><div class="text-sm" style="font-weight:600">Vai junto, deste navegador:</div><div class="text-sm muted mt-1">${vaiJunto.join(" · ")}</div></div>` : '<div class="card-flat mt-2 text-sm muted">Não há estudo desta pessoa guardado neste navegador.</div>'}
    ${fica.length ? `<div class="card-flat mt-1"><div class="text-sm" style="font-weight:600">Fica na plataforma (é conteúdo da turma, não dado pessoal):</div><div class="text-sm muted mt-1">${fica.join(" · ")}</div></div>` : ""}
    ${onde==="nuvem" ? `<p class="text-xs muted mt-2">Na nuvem, o que se apaga é o <strong>cadastro</strong> (a linha de <code>perfis</code>) — e é isso que corta a entrada, mesmo com e-mail e senha certos. Duas coisas continuam lá até alguém removê-las pelo painel do Supabase, porque este site não tem a chave que faz isso: a conta de autenticação e as respostas que a pessoa já tinha sincronizado (elas ficam ligadas à conta, não ao cadastro). Removendo a conta pelo painel, o estudo dela sai junto, em cascata.</p>` : ""}
    <div class="flex gap-1 mt-3">
      <button class="btn btn-danger" onclick="excluirUsuarioConfirmado('${id}','${onde}')">${iconeSvg("trash")} Excluir mesmo assim</button>
      <button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button>
    </div>`);
}
async function excluirUsuarioConfirmado(id, onde){
  if(!podeAdmin("usuarios")){ toast("Só um administrador máster pode excluir cadastros.", "err"); return; }
  if(onde === "nuvem"){
    const ok = await nuvemExcluirPerfil(id);
    if(!ok){ fecharModal(); render(); return; }
  }
  apagarDadosLocaisDoUsuario(id);
  saveState();
  fecharModal();
  toast("Cadastro excluído.");
  render();
}
/* Apaga do banco deste navegador tudo o que é PESSOAL daquele id. Questões,
   comentários e turmas que a pessoa criou não entram: são conteúdo que a
   turma usa, e apagá-los tiraria material de quem ficou. */
function apagarDadosLocaisDoUsuario(id){
  db.usuarios = db.usuarios.filter(u => u.id !== id);
  db.respostas = db.respostas.filter(r => r.usuarioId !== id);
  db.favoritos = db.favoritos.filter(f => f.usuarioId !== id);
  db.favoritosCartoes = (db.favoritosCartoes||[]).filter(f => f.usuarioId !== id);
  db.questoesOcultas = (db.questoesOcultas||[]).filter(o => o.usuarioId !== id);
  db.destaques = (db.destaques||[]).filter(d => d.usuarioId !== id);
  db.flashcards = db.flashcards.filter(c => c.usuarioId !== id);
  db.sessoes = db.sessoes.filter(x => x.usuarioId !== id);
  db.resultadosSimulados = db.resultadosSimulados.filter(x => x.usuarioId !== id);
  if(db.revisoes) delete db.revisoes[id];
  if(db.revisoesFlashcards) delete db.revisoesFlashcards[id];
  if(db.diasCartoes) delete db.diasCartoes[id];
  if(db.cartoesPorDia) delete db.cartoesPorDia[id];
  if(db.sessoesEmAndamento) delete db.sessoesEmAndamento[id];
  (db.grupos||[]).forEach(g => {
    g.membrosAprovados = (g.membrosAprovados||[]).filter(x => x !== id);
    g.solicitacoesPendentes = (g.solicitacoesPendentes||[]).filter(x => x !== id);
  });
  (db.subgrupos||[]).forEach(sg => { sg.membros = (sg.membros||[]).filter(x => x !== id); if(sg.divisao) Object.keys(sg.divisao).forEach(q => { if(sg.divisao[q] === id) delete sg.divisao[q]; }); });
}

function alterarNivelAdmin(id, nivel){
  const eu = usuarioAtual();
  if(!podeAdmin("usuarios", eu)){ toast("Só um administrador máster pode alterar níveis de acesso.", "err"); return; }
  const alvo = getUsuario(id);
  if(nivelAdminDe(alvo)==="master" && !podeDeixarDeSerMaster(id, nivel, "local")){ render(); return; }
  alvo.nivelAdmin = nivel;
  saveState();
  toast("Nível de acesso atualizado para "+rotuloNivelAdmin(nivel)+".");
  render();
}
/* Com a nuvem, a lista é a de TODA a plataforma (tabela feedbacks): o que
   qualquer pessoa enviou de qualquer aparelho chega aqui na sincronização,
   e "marcar como lido" também sobe, para os outros administradores. */
function renderFeedbackUsuarios(){
  const lista = (db.feedbacks||[]).slice().sort((a,b)=>(b.data||"").localeCompare(a.data||""));
  const naoLidos = lista.filter(f=>!f.lido).length;
  const rotulos = {comentario:["badge-muted","Comentário"], sugestao:["badge-accent","Sugestão"], reclamacao:["badge-danger","Reclamação"], contribuicao:["badge-amber","Quer contribuir"]};
  const pag = paginar(lista, "feedbacks", { porPagina: 20 });
  return `
  <div class="page-header"><h2>Feedback dos Usuários</h2><p>Comentários, sugestões e reclamações enviados por qualquer pessoa da plataforma${naoLidos ? ` — <strong>${naoLidos} não lido(s)</strong>` : ""}.</p></div>
  <div class="card-flat mb-2 text-sm">${nuvemConectado()
    ? `${iconeSvg("database")} Vindos da nuvem: aqui aparece o que qualquer pessoa enviou, de qualquer aparelho. <button class="link-btn" onclick="nuvemSincronizar({forcarRedesenho:true})">buscar agora</button>`
    : `${iconeSvg("alert")} Sem conta na nuvem, esta lista mostra só o que foi enviado <strong>neste navegador</strong>. Entre com a sua conta da nuvem para receber o feedback de toda a turma.`}</div>
  ${lista.length ? pag.itens.map(f=>{
    const autor = getUsuario(f.usuarioId);
    const [cls,label] = rotulos[String(f.tipo||"").split(" ")[0]]||rotulos.comentario;
    return `<div class="card mb-1" style="${f.lido?"opacity:.6":""}">
      <div class="flex justify-between items-center"><span class="badge ${cls}">${label}</span><span class="text-xs muted">${formatDataBR(f.data)}</span></div>
      <div class="text-sm mt-1" style="white-space:pre-wrap">${escapeHtml(f.texto)}</div>
      <div class="flex justify-between items-center mt-1">
        <span class="text-xs muted">${escapeHtml(f.autorNome || (autor?autor.nome:"—"))} (${badgePapel(f.papel)})</span>
        ${!f.lido ? `<button class="link-btn" onclick="marcarFeedbackLido('${f.id}')">marcar como lido</button>` : `<span class="text-xs muted">lido${f.lidoPorNome ? " por " + escapeHtml(f.lidoPorNome) : ""}</span>`}
      </div>
    </div>`;
  }).join("") + controlesPaginacao(pag, "mensagem(ns)") : '<div class="empty-state">Nenhum feedback recebido ainda.</div>'}`;
}
function marcarFeedbackLido(id){
  const f = (db.feedbacks||[]).find(x=>x.id===id); if(!f) return;
  f.lido = true;
  f.lidoPorNome = (usuarioAtual()||{}).nome || "";
  // só o que veio da nuvem sobe de volta: um feedback deste navegador, de
  // uma conta local, não tem dono na nuvem
  if(f.naNuvem) nuvemMarcarFeedback(f.id);
  saveState(); render();
}
function feedbacksNaoLidos(){ return (db.feedbacks||[]).filter(f=>!f.lido).length; }
