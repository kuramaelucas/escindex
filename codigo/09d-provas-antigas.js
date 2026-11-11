/* codigo/09d-provas-antigas.js — a aba Provas Antigas da tela "Provas e Simulados" (seção 14): provas reais por instituição e ano, filtros, as duas versões da prova.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   14. PROVAS ANTIGAS — a aba de provas reais da tela "Provas e Simulados"
   (organizadas por instituição e ano, com filtros)
   ========================================================================== */
function filtrosProvas(){
  if(!state.filtroRota.provas) state.filtroRota.provas = {banca:"", ano:"", areaId:"", ultimos5:false, tipo:""};
  return state.filtroRota.provas;
}
function mudarFiltroProvas(campo, valor){
  const f = filtrosProvas();
  if(campo==="ultimos5"){ f.ultimos5 = !!valor; if(f.ultimos5) f.ano = ""; }
  else f[campo] = valor;
  // a instituição escolhida pode não ter prova do tipo novo
  if(campo==="tipo") f.banca = "";
  if(state.filtroRota.rolagem) Object.keys(state.filtroRota.rolagem).filter(k=>k.startsWith("provas-antigas-")).forEach(k=>delete state.filtroRota.rolagem[k]);
  render();
}
function limparFiltrosProvas(){ state.filtroRota.provas = {banca:"", ano:"", areaId:"", ultimos5:false, tipo:""}; render(); }
function renderProvasAntigas(){ return renderProvasESimulados(); }
function renderAbaProvasAntigas(u, simuladosDaBusca){
  const f = filtrosProvas();
  const grupoUsuario = (u.papel==="aluno"||state.modoAluno) ? idsDosGruposDoUsuario(u) : true;
  /* Só questão REAL forma prova: a prova antiga é "a prova de verdade, do
     jeito que caiu". As questões autorais (banco didático, demonstração)
     continuam em Estudar > Monte sua própria lista. */
  // a prova dissertativa também é prova de verdade: aparece aqui, mas só para
  // praticar (não há como corrigi-la sozinha nem cronometrá-la como simulado)
  const todasDosTipos = questoesAtivas(grupoUsuario).filter(q=>q.real && q.status!=="desatualizada");   // a desatualizada entra à parte (g.desatualizadas)
  /* RESIDÊNCIA E GRADUAÇÃO SEPARADAS. A prova da faculdade (e o Teste de
     Progresso) e a de residência não se comparam: uma confere o que ficou
     do ano, a outra seleciona para o R1. Cada uma tem a sua seção, e no 3º
     e 4º ano, onde a consolidação é maioria (CONFIG.progressaoConsolidacao), a da graduação vem primeiro. */
  const tipoPref = tipoProvaPreferido(u);
  const ordemTipos = CONFIG.tiposProva.map(t=>t.id).sort((a,b)=>(b===tipoPref)-(a===tipoPref));
  const qtdPorTipo = {};
  todasDosTipos.forEach(q=>{ const t = tipoProvaDe(q); qtdPorTipo[t] = (qtdPorTipo[t]||0)+1; });
  const todas = f.tipo ? todasDosTipos.filter(q=>tipoProvaDe(q)===f.tipo) : todasDosTipos;
  const bancas = [...new Set(todas.map(q=>q.banca))].sort();
  const anosDisponiveis = [...new Set(todas.map(q=>q.ano))].sort((a,b)=>b-a);
  const anoMaisRecente = anosDisponiveis.length ? anosDisponiveis[0] : new Date().getFullYear();

  let pool = todas;
  if(f.banca) pool = pool.filter(q=>q.banca===f.banca);
  if(f.ano) pool = pool.filter(q=>q.ano===parseInt(f.ano));
  if(buscaProvas().trim()) pool = pool.filter(q=>combinaComBusca([q.banca, q.ano, q.semestre ? q.semestre+"º semestre" : "", q.faseProva, infoTipoProva(tipoProvaDe(q)).nomeLongo]));
  if(f.areaId) pool = pool.filter(q=>q.areaId===f.areaId);
  if(f.ultimos5) pool = pool.filter(q=>q.ano > anoMaisRecente-5);

  // agrupa por instituição + ano + tipo (uma "prova" é a combinação das três
  // coisas), na ordem da prova original quando a questão sabe o próprio número
  const mapa = {};
  const chaveDaProva = chaveDaProvaDe;
  pool.forEach(q=>{ const chave = chaveDaProva(q); (mapa[chave] = mapa[chave] || {banca:q.banca, ano:q.ano, semestre:q.semestre||0, tipo:tipoProvaDe(q), ids:[], anuladas:[], desatualizadas:[], semImagem:0}).ids.push(q.id); });
  Object.values(mapa).forEach(g => { g.dissertativa = g.ids.every(id=>ehDissertativa(getQuestao(id))); });
  const ordemNaProva = id => { const q = getQuestao(id); return (q && q.numeroNaProva) || 9999; };
  Object.values(mapa).forEach(g => g.ids.sort((a,b)=> ordemNaProva(a)-ordemNaProva(b)));
  /* AS ANULADAS NÃO SOMEM EM SILÊNCIO. Questão anulada não tem gabarito, então
     não entra na prova feita aqui (não teria como ser corrigida) — mas uma
     prova de 100 questões aparecendo com 93, sem explicação, parece prova
     incompleta. O cartão diz quantas são, quais são, e deixa abrir cada uma. */
  db.questoes.forEach(q=>{
    if((q.status!=="anulada" && q.status!=="desatualizada") || !q.real) return;
    const g = mapa[chaveDaProva(q)]; if(!g) return;
    if(f.areaId && q.areaId!==f.areaId) return;
    (q.status==="anulada" ? g.anuladas : g.desatualizadas).push(q.id);
  });
  Object.values(mapa).forEach(g => { g.anuladas.sort((a,b)=> ordemNaProva(a)-ordemNaProva(b)); g.desatualizadas.sort((a,b)=> ordemNaProva(a)-ordemNaProva(b)); });
  // as que esperam a figura da prova também ficam de fora, e o cartão diz
  // quantas (ver aguardaImagem)
  db.questoes.forEach(q=>{
    if(!aguardaImagem(q) || !q.real || q.status!=="ativa") return;
    const g = mapa[chaveDaProva(q)]; if(!g) return;
    if(f.areaId && q.areaId!==f.areaId) return;
    g.semImagem++;
  });
  const grupos = Object.values(mapa).sort((a,b)=> ordemTipos.indexOf(a.tipo)-ordemTipos.indexOf(b.tipo) || b.ano-a.ano || b.semestre-a.semestre || a.banca.localeCompare(b.banca));
  state.filtroRota.provasGrupos = grupos;
  const cartaoDaProva = (g, i) => {
      const previo = g.dissertativa ? null : desempenhoPrevioSimulado(null, "Prova "+g.banca+" "+anoDaProva(g)+" (simulado)");
      const respondidas = g.ids.filter(id=>jaFoiRespondida(u.id, id)).length;
      return `<div class="card prova-card">
        <div class="prova-ano">${anoDaProva(g)}</div>
        <div class="text-sm prova-banca">${escapeHtml(g.banca)}</div>
        <div class="qcard-meta mb-1"><span class="badge ${g.tipo==="graduacao"?"badge-accent":"badge-muted"}">${escapeHtml(infoTipoProva(g.tipo).nome)}</span>${g.dissertativa ? ` <span class="badge badge-accent">Dissertativa</span>` : ""}</div>
        ${g.dissertativa ? `<div class="text-xs muted mb-1">Você escreve a resposta, diz a confiança e se avalia pela resposta esperada da banca. Não há simulado com relógio nem nota automática.</div>` : ""}
        <div class="text-sm muted mb-1">${g.ids.length} ${plural(g.ids.length,"questão","questões")} · ${respondidas} já ${flexionar(respondidas,"respondida(s)")} por você</div>
        ${reposicoesDaProva(g).length ? `<div class="text-xs mb-1"><span class="badge badge-amber">${reposicoesDaProva(g).length} com reposição por IA</span> <span class="muted">ao começar, você escolhe a versão da prova</span></div>` : ""}
        ${g.anuladas.length ? `<div class="text-xs muted mb-1" title="Questões anuladas pela banca aparecem na prova, mas a resposta não conta na nota">+ ${g.anuladas.length} ${flexionar(g.anuladas.length, "anulada(s)")} pela banca, aparecem na prova e ficam fora da nota: ${g.anuladas.map(id=>{ const q = getQuestao(id); return `<button class="link-btn text-xs" onclick="abrirQuestaoCompleta('${id}')">${q && q.numeroNaProva ? "nº "+q.numeroNaProva : "ver"}</button>`; }).join(", ")}</div>` : ""}
        ${g.semImagem ? `<div class="text-xs muted mb-1" title="Estas questões dependem de uma figura da prova que ainda não foi anexada">+ ${g.semImagem} à espera da figura da prova, fora por enquanto</div>` : ""}
        ${(()=>{ const em = simuladoEmAndamentoDe(u, "prova:Prova "+g.banca+" "+anoDaProva(g)+" (simulado)"); if(!em) return ""; const p = progressoDoSimuladoEmAndamento(em); return `<div class="qcard-meta mb-1"><span class="badge badge-amber">simulado em andamento · ${p.feitas} de ${p.total} respondidas</span></div>`; })()}
        ${previo ? `<div class="qcard-meta mb-1"><span class="badge ${classeBadgeNota(previo.ultima.nota)}">já fez como simulado · ${previo.ultima.nota}%</span> <button class="link-btn text-xs" onclick="abrirHistoricoDoSimulado(${JSON.stringify("Prova "+g.banca+" "+anoDaProva(g)+" (simulado)").replace(/"/g,"&quot;")})">${previo.n>1 ? "ver as "+previo.n+" tentativas" : "ver a tentativa"}</button></div>` : ""}
        <div class="flex gap-1 prova-acoes quebra">
          ${g.dissertativa ? "" : (simuladoEmAndamentoDe(u, "prova:Prova "+g.banca+" "+anoDaProva(g)+" (simulado)")
            ? `<button class="btn btn-primary btn-sm" onclick="continuarSimulado('prova:Prova ${escapeHtml(g.banca).replace(/'/g,"&#39;")} ${anoDaProva(g)} (simulado)')">Continuar o simulado</button>
               <button class="btn btn-ghost btn-sm" onclick="fazerProvaComoSimulado(${i})" title="Descarta o que já foi respondido e começa do zero">Recomeçar</button>`
            : `<button class="btn btn-primary btn-sm" onclick="fazerProvaComoSimulado(${i})">Fazer como simulado</button>`)}
          ${g.dissertativa || !ehEquipeVendoSimulado() ? "" : `<button class="btn btn-ghost btn-sm" onclick="abrirDesempenhoDosAlunos(${JSON.stringify("Prova "+g.banca+" "+anoDaProva(g)+" (simulado)").replace(/"/g,"&quot;")}, '${escapeHtml(g.banca).replace(/'/g,"&#39;")} ${anoDaProva(g)}')" title="Notas dos alunos, somadas e anônimas">${iconeSvg("chart")} Desempenho dos alunos</button>`}
          <button class="btn ${g.dissertativa ? "btn-primary" : "btn-secondary"} btn-sm" onclick="praticarProva(${i})">${g.dissertativa ? "Fazer a prova (sem cronômetro)" : "Praticar sem cronômetro"}</button>
          ${podeGerirConteudo() ? `<button class="icon-btn" onclick="confirmarInativarProva(${i})" title="Inativar ou excluir esta prova" aria-label="Inativar ou excluir a prova">${iconeSvg("trash")}</button>` : ""}
        </div>
      </div>`;
  };
  // uma seção por tipo de prova, na ordem de prioridade de quem está vendo
  const secoes = (f.tipo ? [f.tipo] : ordemTipos).map(tipo=>{
    const info = infoTipoProva(tipo);
    const daSecao = grupos.map((g,i)=>({g,i})).filter(x=>x.g.tipo===tipo);
    const prioritaria = tipo===tipoPref;
    if(!daSecao.length){
      // seção vazia só aparece para quem ela é prioridade (ou quando filtrada)
      if(!prioritaria && !f.tipo) return "";
      return `<div class="card-title mt-2 mb-1">${escapeHtml(info.nomeLongo)}</div>
        <div class="empty-state mb-2">${qtdPorTipo[tipo]
          ? "Nenhuma prova deste tipo com os filtros atuais."
          : `Ainda não há ${escapeHtml(info.nomeLongo.toLowerCase())} no banco (${escapeHtml(info.descricao)}). Quem tiver uma pode <button class="link-btn" onclick="navigate('importar-questoes')">enviar pela plataforma</button>, escolhendo o tipo de prova ${escapeHtml(info.nome)}.`}</div>`;
    }
    /* Todas as provas da seção, 15 por vez ao descer a página (rolagem
       infinita); a busca ativa também mostra só o que combina. */
    const visiveis = rolagemLista(daSecao, "provas-antigas-"+tipo);
    return `<div class="card-title mt-2 mb-1">${escapeHtml(info.nomeLongo)} <span class="text-sm muted peso-400">· ${escapeHtml(info.descricao)} · ${daSecao.length} ${flexionar(daSecao.length, "prova(s)")}</span></div>
      ${prioritaria ? `<p class="text-xs muted mb-1">${iconeSvg("star")} No ${escapeHtml(u.anoFaculdade)}, estas vêm primeiro: são as que consolidam o conhecimento do ano. As de residência continuam logo abaixo.</p>` : ""}
      <div class="grid grid-3 mb-1">${visiveis.itens.map(x=>cartaoDaProva(x.g, x.i)).join("")}</div>${sentinelaRolagem(visiveis, "provas-antigas-"+tipo, "redesenharProvasConteudo")}<div class="mb-2"></div>`;
  }).join("");

  return `
  <p class="text-sm muted mb-2">A prova de verdade de cada instituição, do jeito que caiu. Faça inteira no relógio, para medir onde você está contra a banca, ou sem cronômetro, para estudar com calma.</p>
  <div class="flex gap-1 mb-2 quebra">
    <button class="pill ${!f.tipo?"active":""}" onclick="mudarFiltroProvas('tipo','')">Todas (${todasDosTipos.length})</button>
    ${ordemTipos.map(t=>`<button class="pill ${f.tipo===t?"active":""}" onclick="mudarFiltroProvas('tipo','${t}')">${escapeHtml(infoTipoProva(t).nomeLongo)} (${qtdPorTipo[t]||0})</button>`).join("")}
  </div>
  <div class="card mb-2">
    <div class="grid grid-4">
      <div class="field sem-mb">
        <label class="label">Instituição</label>
        <select class="select" onchange="mudarFiltroProvas('banca', this.value)">
          <option value="">Todas (${bancas.length})</option>
          ${bancas.map(b=>`<option value="${escapeHtml(b)}" ${f.banca===b?"selected":""}>${escapeHtml(b)}</option>`).join("")}
        </select>
      </div>
      <div class="field sem-mb">
        <label class="label">Ano</label>
        <select class="select" onchange="mudarFiltroProvas('ano', this.value)" ${f.ultimos5?"disabled":""}>
          <option value="">Todos os anos</option>
          ${anosDisponiveis.map(a=>`<option value="${a}" ${String(f.ano)===String(a)?"selected":""}>${a}</option>`).join("")}
        </select>
      </div>
      <div class="field sem-mb">
        <label class="label">Grande área</label>
        <select class="select" onchange="mudarFiltroProvas('areaId', this.value)">
          <option value="">Todas as áreas</option>
          ${db.taxonomia.areas.map(a=>`<option value="${a.id}" ${f.areaId===a.id?"selected":""}>${escapeHtml(a.nome)}</option>`).join("")}
        </select>
      </div>
      <div class="field sem-mb">
        <label class="label">Atalhos</label>
        <label class="checkbox-row mb-1"><input type="checkbox" ${f.ultimos5?"checked":""} onchange="mudarFiltroProvas('ultimos5', this.checked)"> Só os últimos 5 anos (${Math.max(anoMaisRecente-4,0)}–${anoMaisRecente})</label>
        <button class="link-btn text-xs" onclick="limparFiltrosProvas()">limpar filtros</button>
      </div>
    </div>
  </div>
  <p class="text-sm muted mb-2">${grupos.length} ${flexionar(grupos.length, "prova(s) encontrada(s)")} · ${pool.length} ${plural(pool.length,"questão","questões")} no total com os filtros atuais.</p>
  ${secoes || '<div class="empty-state">Nenhuma prova encontrada com esses filtros.</div>'}
  ${htmlProvasInativas()}
  ${buscaProvas().trim() && simuladosDaBusca.length ? `<div class="card-title mt-3 mb-1">Simulados que combinam com a busca <span class="text-sm muted peso-400">· ${simuladosDaBusca.length}</span></div>${simuladosDaBusca.map(renderSimuladoCard).join("")}` : ""}`;
}
/* As provas inativas ficam listadas aqui, só para quem gere conteúdo (para os
   alunos a prova deixou de existir), com quantas questões guardam, para
   reativar com um clique — nada foi apagado e as estatísticas ficam. */
function htmlProvasInativas(){
  if(!podeGerirConteudo()) return "";
  const lista = provasInativasLista();
  if(!lista.length) return "";
  const linhas = lista.map(p=>{
    const n = db.questoes.filter(q=>q.real && chaveDaProvaDe(q)===p.chave).length;
    return `<div class="flex justify-between items-center gap-2 quebra mt-1"><span class="text-sm"><strong>${escapeHtml(p.rotulo)}</strong> · <span class="muted">${n} ${plural(n,"questão","questões")} guardadas${p.data ? ", inativa desde " + escapeHtml(formatDataBR(p.data)) : ", já chegou inativa"}${p.por ? " (" + escapeHtml(p.por) + ")" : ""}</span></span>
      <button class="btn btn-secondary btn-sm" onclick="reativarProvaDoBanco(${JSON.stringify(p.chave).replace(/"/g,"&quot;")})">Reativar</button></div>`;
  }).join("");
  return `<div class="card mt-3"><div class="card-title">Provas inativas <span class="text-sm muted peso-400">· ${lista.length} · só você e a equipe veem esta lista</span></div>
    <p class="text-xs muted">Os alunos não veem nem estudam estas provas. Nada foi apagado: as questões, as respostas e as estatísticas continuam guardadas. Reativar traz tudo de volta para todos.</p>${linhas}</div>`;
}
/* Inativar × excluir: a pergunta que o administrador vê ao clicar na lixeira
   da prova. Inativar esconde dos alunos e guarda tudo (reativa depois);
   excluir apaga as questões da prova de vez. */
function confirmarInativarProva(indice){
  const g = grupoDeProva(indice); if(!g) return;
  const q = getQuestao(g.ids[0]); if(!q) return;
  const chave = chaveDaProvaDe(q);
  const todas = db.questoes.filter(x => x.real && chaveDaProvaDe(x) === chave);
  const ids = new Set(todas.map(x => x.id));
  const respostas = (db.respostas||[]).filter(r => ids.has(r.questaoId)).length;
  const daPasta = todas.some(x => questaoDaSemente(x.id));
  const nome = g.banca+" "+anoDaProva(g);
  abrirModal(`${cabecalhoJanela(iconeSvg("trash") + " " + escapeHtml(nome))}<div class="modal-body">
    <p class="text-sm"><strong>O que fazer com esta prova</strong> (${todas.length} questões)?</p>
    <div class="feedback-box ok mt-1"><strong>Inativar</strong> (recomendado): a prova deixa de aparecer para os alunos, no estudo, nas provas e nos simulados. <strong>Nada é apagado</strong>: questões, respostas e estatísticas ficam, e dá para reativar quando quiser.
      <div class="mt-1"><button class="btn btn-primary btn-sm" onclick="inativarProvaDoBanco(${indice})">Inativar a prova</button></div></div>
    <div class="feedback-box mt-2" style="border-color:var(--danger,#b3372b)"><strong>Excluir</strong>: apaga as ${todas.length} questões do banco${respostas ? "; " + respostas+" "+flexionar(respostas, "resposta(s)")+" de alunos perdem a questão de origem" : ""}. Não dá para desfazer.${daPasta ? " Como a prova vem da pasta dados/, ela volta na próxima carga a não ser que o arquivo dela seja apagado de dados/." : ""}
      <div class="mt-1"><button class="btn btn-danger btn-sm" onclick="excluirProvaDoBanco(${indice})">Excluir a prova</button></div></div>
    <div class="mt-2"><button class="btn btn-ghost btn-sm" onclick="fecharModal()">Cancelar</button></div>
  </div>`);
}
function excluirProvaDoBanco(indice){
  const g = grupoDeProva(indice); if(!g) return;
  const q = getQuestao(g.ids[0]); if(!q) return;
  const chave = chaveDaProvaDe(q);
  const alvo = db.questoes.filter(x => x.real && chaveDaProvaDe(x) === chave);
  const ids = new Set(alvo.map(x => x.id));
  alvo.forEach(x => nuvemMarcarQuestaoFora(x, x.status==="pendente" ? "recusada" : "removida", x.status==="pendente" ? "Excluída pela equipe." : ""));
  db.questoes = db.questoes.filter(x => !ids.has(x.id));
  if((db.provasInativas||[]).some(p => p.chave === chave)) db.provasInativas = db.provasInativas.filter(p => p.chave !== chave);
  saveState(); fecharModal();
  toast("Prova excluída (" + alvo.length + " questões).");
  render();
}
function inativarProvaDoBanco(indice){
  const g = grupoDeProva(indice); if(!g) return;
  const q = getQuestao(g.ids[0]); if(!q) return;
  inativarProva(chaveDaProvaDe(q), g.banca+" "+anoDaProva(g));
  fecharModal();
  toast("Prova inativada para todos. Dá para reativar no fim da lista de provas.");
  render();
}
function reativarProvaDoBanco(chave){
  reativarProva(chave);
  toast("Prova de volta ao banco.");
  render();
}
function grupoDeProva(indice){
  const grupos = state.filtroRota.provasGrupos || [];
  return grupos[indice] || null;
}
/* AS DUAS VERSÕES DA PROVA. Feita na íntegra, a prova mostra as questões
   anuladas ou desatualizadas (a resposta delas não conta para a nota). Quando
   alguma tem reposição corrigida por IA, a pessoa escolhe antes de começar:
   "original" = como foi realizada de fato; "ia" = a reposição no lugar da
   anulada. A versão com IA continua valendo para o desempenho diário e mensal,
   mas fica fora da classificação (percentil) do simulado. */
function reposicoesDaProva(g){
  return [...(g.anuladas||[]), ...(g.desatualizadas||[])].filter(id => reposicaoDaQuestao(id));
}
function itensDaProva(g, versao, rotulo){
  const ordem = id => { const q = getQuestao(id); return (q && q.numeroNaProva) || 9999; };
  const ids = [...g.ids, ...(g.anuladas||[]), ...(g.desatualizadas||[])].sort((a,b)=> ordem(a)-ordem(b));
  return ids.map(id => {
    const rep = versao==="ia" ? reposicaoDaQuestao(id) : null;
    return {questaoId: rep ? rep.id : id, motivo: rotulo};
  });
}
function perguntarVersaoDaProva(indice, acao){
  const g = grupoDeProva(indice); if(!g) return;
  const n = reposicoesDaProva(g).length;
  const fora = (g.anuladas||[]).length + (g.desatualizadas||[]).length;
  const total = g.ids.length;
  const chamada = v => acao==="simulado" ? `fazerProvaComoSimulado(${indice}, true, '${v}')` : `praticarProva(${indice}, '${v}')`;
  abrirModalTitulado("Qual versão da prova você quer fazer?", `
    <p class="text-sm">Esta prova teve ${fora} ${plural(fora,"questão","questões")} ${flexionar(fora, "anulada(s)")} ou desatualizada(s) e ${n} delas ${n===1?"tem":"têm"} uma reposição corrigida por IA.</p>
    <div class="grid gap-1 mt-2">
      <button class="card text-left" id="versaoOriginal" onclick="fecharModal();${chamada("original")}">
        <strong>Como foi realizada de fato</strong>
        <div class="text-sm muted">As ${fora} anuladas aparecem, mas sua resposta não conta como acerto nem erro. A nota é sobre ${total} questões e entra na classificação do simulado.</div>
      </button>
      <button class="card text-left" id="versaoIA" onclick="fecharModal();${chamada("ia")}">
        <strong>Com a correção feita por IA</strong>
        <div class="text-sm muted">${n} ${plural(n,"questão","questões")} vêm no lugar da anulada, com o texto corrigido e o selo "Reposição por IA". Elas contam no seu desempenho diário e na taxa de acerto, mas <strong>esta prova não entra na classificação</strong> do simulado.</div>
      </button>
    </div>
    <div class="flex gap-1 mt-2"><button class="btn btn-ghost btn-sm" onclick="fecharModal()">Cancelar</button></div>`);
}
function fazerProvaComoSimulado(indice, recomecar, versao){
  const g = grupoDeProva(indice); if(!g) return;
  if(g.dissertativa){ praticarProva(indice); return; }
  const comIA = versao==="ia";
  const titulo = "Prova "+g.banca+" "+anoDaProva(g)+(comIA ? " com correção por IA" : "")+" (simulado)";
  const chave = "prova:"+titulo;
  if(!versao && reposicoesDaProva(g).length){ perguntarVersaoDaProva(indice, "simulado"); return; }
  if(simuladoEmAndamentoDe(usuarioAtual(), chave)){
    if(!recomecar){ perguntarRecomecarSimulado(chave, `fazerProvaComoSimulado(${indice}, true${versao ? `, '${versao}'` : ""})`); return; }
    descartarSimuladoEmAndamento(chave);
  }
  const itens = itensDaProva(g, versao, "Prova "+g.banca+" "+anoDaProva(g));
  limparDestaquesDasQuestoes(itens.map(it=>it.questaoId));
  state.sessaoAtual = { id:uid("simsessao"), tipo:"simulado", simuladoId:null, titulo,
    itens, indiceAtual:0, respostasSimulado:{}, versaoProva: versao || "original", semClassificacao: comIA,
    duracaoMin: g.ids.length*2, finalizado:false, modoAprendizado:false,
    inicioMs:Date.now(), tsQuestao:Date.now(), tempos:{} };
  navigate("simulado-ativo");
}
function praticarProva(indice, versao){
  const g = grupoDeProva(indice); if(!g) return;
  if(!versao && reposicoesDaProva(g).length){ perguntarVersaoDaProva(indice, "pratica"); return; }
  iniciarSessaoComLista(itensDaProva(g, versao, "Prática — prova "+g.banca+" "+anoDaProva(g)), "pratica");
}
