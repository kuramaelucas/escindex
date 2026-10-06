/* codigo/11c-banco-e-taxonomia.js — Banco de Questões e o formulário de questão (25), Especialidades e Assuntos (25-B).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   25. ADMIN/PROFESSOR — Banco de Questões (CRUD completo)
   ========================================================================== */
function badgeStatusQuestao(status){
  const map = {ativa:["badge-accent","Ativa"], pendente:["badge-amber","Pendente"], anulada:["badge-muted","Anulada"], desatualizada:["badge-amber","Desatualizada"]};
  const [cls,label] = map[status] || ["badge-muted", status];
  return `<span class="badge ${cls}">${label}</span>`;
}
function filtrosBanco(){
  if(!state.filtroRota.banco) state.filtroRota.banco = {busca:"", banca:"", ano:"", areaId:"", status:"", ultimos5:false, tipo:""};
  return state.filtroRota.banco;
}
function mudarFiltroBanco(campo, valor){
  const f = filtrosBanco();
  if(campo==="ultimos5"){ f.ultimos5 = !!valor; if(f.ultimos5) f.ano = ""; }
  else f[campo] = valor;
  render();
}
function limparFiltrosBanco(){ state.filtroRota.banco = {busca:"", banca:"", ano:"", areaId:"", status:"", ultimos5:false, tipo:""}; render(); }
function buscarNoBanco(){ filtrosBanco().busca = document.getElementById("buscaBancoInput").value; render(); }
function listaFiltradaBanco(){
  const f = filtrosBanco();
  const anosDisponiveis = [...new Set(db.questoes.map(q=>q.ano))].sort((a,b)=>b-a);
  const anoMaisRecente = anosDisponiveis.length ? anosDisponiveis[0] : new Date().getFullYear();
  const termo = (f.busca||"").toLowerCase();
  let lista = db.questoes.slice();
  if(termo) lista = lista.filter(q=>q.enunciado.toLowerCase().includes(termo) || (q.alternativas||[]).some(a=>a.texto.toLowerCase().includes(termo)));
  if(f.banca) lista = lista.filter(q=>q.banca===f.banca);
  if(f.tipo) lista = lista.filter(q=>tipoProvaDe(q)===f.tipo);
  if(f.ano) lista = lista.filter(q=>q.ano===parseInt(f.ano));
  if(f.ultimos5) lista = lista.filter(q=>q.ano > anoMaisRecente-5);
  if(f.areaId) lista = lista.filter(q=>q.areaId===f.areaId);
  if(f.status==="aguarda-imagem") lista = lista.filter(q=>aguardaImagem(q));
  else if(f.status) lista = lista.filter(q=>q.status===f.status);
  lista.sort((a,b)=> b.ano-a.ano || (a.banca||"").localeCompare(b.banca||""));
  return lista;
}
function renderBancoQuestoes(){
  const f = filtrosBanco();
  const bancas = [...new Set(db.questoes.map(q=>q.banca))].sort();
  const anosDisponiveis = [...new Set(db.questoes.map(q=>q.ano))].sort((a,b)=>b-a);
  const anoMaisRecente = anosDisponiveis.length ? anosDisponiveis[0] : new Date().getFullYear();
  const lista = listaFiltradaBanco();
  return `
  <div class="page-header"><h2>Banco de Questões</h2><p>${db.questoes.length} questão(ões) no total (${questoesAtivas(true).length} ativas, excluindo anuladas/desatualizadas das sessões e estatísticas; inclui questões restritas a grupos de alunos). ${db.questoes.filter(aguardaImagem).length} aguardam a figura da prova e não aparecem para os alunos — filtre por Status &gt; Aguardando imagem.</p></div>
  <div class="card mb-2">
    <div class="grid grid-4">
      <div class="field sem-mb"><label class="label">Instituição</label>
        <select class="select" onchange="mudarFiltroBanco('banca', this.value)">
          <option value="">Todas</option>
          ${bancas.map(b=>`<option value="${escapeHtml(b)}" ${f.banca===b?"selected":""}>${escapeHtml(b)}</option>`).join("")}
        </select>
      </div>
      <div class="field sem-mb"><label class="label">Ano</label>
        <select class="select" onchange="mudarFiltroBanco('ano', this.value)" ${f.ultimos5?"disabled":""}>
          <option value="">Todos</option>
          ${anosDisponiveis.map(a=>`<option value="${a}" ${String(f.ano)===String(a)?"selected":""}>${a}</option>`).join("")}
        </select>
      </div>
      <div class="field sem-mb"><label class="label">Grande área</label>
        <select class="select" onchange="mudarFiltroBanco('areaId', this.value)">
          <option value="">Todas</option>
          ${db.taxonomia.areas.map(a=>`<option value="${a.id}" ${f.areaId===a.id?"selected":""}>${escapeHtml(a.nome)}</option>`).join("")}
        </select>
      </div>
      <div class="field sem-mb"><label class="label">Status</label>
        <select class="select" onchange="mudarFiltroBanco('status', this.value)">
          <option value="">Todos</option>
          <option value="ativa" ${f.status==="ativa"?"selected":""}>Ativa</option>
          <option value="pendente" ${f.status==="pendente"?"selected":""}>Pendente de aprovação</option>
          <option value="anulada" ${f.status==="anulada"?"selected":""}>Anulada</option>
          <option value="desatualizada" ${f.status==="desatualizada"?"selected":""}>Desatualizada</option>
          <option value="aguarda-imagem" ${f.status==="aguarda-imagem"?"selected":""}>Aguardando imagem</option>
        </select>
      </div>
    </div>
    <div class="flex gap-1 items-center mt-2 quebra">
      <input class="input" id="buscaBancoInput" aria-label="Buscar questão por texto do enunciado ou alternativa" style="max-width:280px" placeholder="Buscar por texto do enunciado ou alternativa..." value="${escapeHtml(f.busca||"")}" onkeydown="if(event.key==='Enter') buscarNoBanco()">
      <button class="btn btn-secondary btn-sm" onclick="buscarNoBanco()">Buscar</button>
      <select class="select" style="max-width:220px" onchange="mudarFiltroBanco('tipo', this.value)" aria-label="Tipo de prova">
        <option value="">Residência e graduação</option>
        ${CONFIG.tiposProva.map(t=>`<option value="${t.id}" ${f.tipo===t.id?"selected":""}>${escapeHtml(t.nomeLongo)}</option>`).join("")}
      </select>
      <label class="checkbox-row"><input type="checkbox" ${f.ultimos5?"checked":""} onchange="mudarFiltroBanco('ultimos5', this.checked)"> Últimos 5 anos</label>
      <button class="link-btn text-xs" onclick="limparFiltrosBanco()">limpar filtros</button>
    </div>
  </div>
  <div class="flex gap-1 items-center mb-2 quebra">
    <button class="btn btn-primary btn-sm" onclick="abrirFormularioQuestao(null)">${iconeSvg("plus")} Nova questão manual</button>
    <button class="btn btn-secondary btn-sm" onclick="navigate('importar-questoes')">${iconeSvg("upload")} Importar em lote</button>
    ${questoesParaExportar().length ? `<button class="btn btn-ghost btn-sm" onclick="exportarQuestoesParaDados()" title="As questões aprovadas que entraram pela plataforma, num arquivo pronto para a pasta dados/">${iconeSvg("archive")} Exportar ${questoesParaExportar().length} enviada(s) para a pasta dados/</button>` : ""}
    <span class="text-sm muted">${lista.length} resultado(s)</span>
  </div>
  ${podeGerirConteudo() ? barraExclusaoEmLote(lista) : ""}
  ${renderListaBancoQuestoesHtml(lista, paginar(lista, "banco", {assinatura: JSON.stringify(f)}))}`;
}
/* ANEXAR DE VEZ AO BANCO. A questão aprovada pela plataforma já chega a toda
   a turma pela nuvem; este arquivo é o passo seguinte, o de guardá-la na
   pasta dados/ junto com as provas — onde ela passa a valer mesmo sem
   nuvem, entra no conferidor e no backup do repositório. As imagens que
   subiram para a nuvem vão pelo endereço delas. */
function questoesParaExportar(){
  return db.questoes.filter(q => q.real && !q.grupoId && q.status!=="pendente" && !questaoDaSemente(q.id));
}
function exportarQuestoesParaDados(){
  const lista = questoesParaExportar();
  if(!lista.length){ toast("Não há questão aprovada pela plataforma para exportar.", "err"); return; }
  const nome = "questoes-enviadas-" + hojeISO();
  const campos = ["banca","real","tipoProva","ano","numeroNaProva","areaId","especialidadeId","assuntoId","enunciado","alternativas","gabarito",
    "explicacaoGeral","explicacoesAlternativas","referencias","imagemUrl","imagemLegenda","imagemPendente","dificuldadeManual","status","motivoStatus","faseProva"];
  const linhas = lista.map(q => {
    const o = { id: q.id };
    campos.forEach(c => { if(q[c] !== undefined && q[c] !== "" && q[c] !== null) o[c] = q[c]; });
    o.tipoProva = tipoProvaDe(q);
    o.estatisticas = { respostas:0, acertos:0, distribuicaoAlternativas:{} };
    o.criadoPor = "seed"; o.criadoEm = q.criadoEm || hojeISO();
    return JSON.stringify(o) + ",";
  });
  const semNumero = lista.filter(q => !Number.isInteger(q.numeroNaProva)).length;
  // assunto ou especialidade criados pela plataforma também precisam ir para dados/taxonomia.js
  const espNovas = [...new Set(lista.map(q=>q.especialidadeId))].filter(id => !(SEED_TAXONOMIA.especialidades||[]).some(e=>e.id===id));
  const assNovos = [...new Set(lista.map(q=>q.assuntoId))].filter(id => !(SEED_TAXONOMIA.assuntos||[]).some(a=>a.id===id));
  const avisoTax = (espNovas.length || assNovos.length)
    ? "\n   ATENÇÃO: estas questões usam especialidade/assunto criados pela plataforma, que\n   precisam entrar em dados/taxonomia.js antes deste arquivo:\n" +
      espNovas.map(id => { const e = db.taxonomia.especialidades.find(x=>x.id===id) || {}; return "     especialidade " + JSON.stringify({ id, areaId: e.areaId, nome: e.nome }); }).join("\n") + (espNovas.length ? "\n" : "") +
      assNovos.map(id => { const a = db.taxonomia.assuntos.find(x=>x.id===id) || {}; return "     assunto " + JSON.stringify({ id, especialidadeId: a.especialidadeId, nome: a.nome }); }).join("\n")
    : "";
  const arquivo = "/* Questões enviadas pela plataforma e aprovadas pela equipe, exportadas em " + formatDataBR(hojeISO()) + " (" + lista.length + ").\n" +
    "   Para entrarem de vez no banco: salve este arquivo na pasta dados/, acrescente\n" +
    "   \"" + nome + "\" à lista de dados/manifesto.js e rode npm run conferir." +
    (semNumero ? "\n   " + semNumero + " questão(ões) não têm numeroNaProva (o número na prova original): o conferidor\n   exige esse campo em questão real — preencha antes de publicar." : "") + avisoTax + " */\n" +
    "window.EscDados.registrarQuestoes(\"" + nome + "\", [\n" + linhas.join("\n") + "\n]);\n";
  baixarArquivo(nome + ".js", arquivo, "text/javascript");
  toast(lista.length + " questão(ões) exportada(s)" + (semNumero ? " — " + semNumero + " sem o número na prova: preencha antes de publicar (o arquivo explica)." : ". Salve o arquivo na pasta dados/."));
}
/* EXCLUSÃO EM LOTE. A seleção vive em `state` (não é dado do aluno). "Todas as
   do filtro" serve para tirar uma prova ou um simulado inteiro: filtre por
   instituição + ano e exclua; o aviso mostra quantas respostas de alunos
   ficam sem a questão, porque excluir apaga o histórico delas. */
function selecaoBanco(){ if(!state.selecaoBanco) state.selecaoBanco = new Set(); return state.selecaoBanco; }
function alternarSelecaoBanco(qid, marcado){ marcado ? selecaoBanco().add(qid) : selecaoBanco().delete(qid); render(); }
function selecionarPaginaBanco(marcado){
  const lista = listaFiltradaBanco();
  const pag = paginar(lista, "banco", {assinatura: JSON.stringify(filtrosBanco())});
  pag.itens.forEach(q=> marcado ? selecaoBanco().add(q.id) : selecaoBanco().delete(q.id));
  render();
}
function selecionarTodasDoFiltroBanco(){ listaFiltradaBanco().forEach(q=>selecaoBanco().add(q.id)); render(); }
function limparSelecaoBanco(){ selecaoBanco().clear(); render(); }
function barraExclusaoEmLote(lista){
  const n = selecaoBanco().size;
  return `<div class="flex gap-1 items-center mb-2 quebra">
    <button class="btn btn-secondary btn-sm" onclick="selecionarTodasDoFiltroBanco()" title="Marca as ${lista.length} questões do filtro atual, de todas as páginas">Selecionar as ${lista.length} do filtro</button>
    ${n ? `<span class="text-sm">${n} selecionada(s)</span>
    <button class="btn btn-danger btn-sm" onclick="confirmarExcluirSelecionadasBanco()">${iconeSvg("trash")} Excluir selecionadas</button>
    <button class="link-btn text-xs" onclick="limparSelecaoBanco()">limpar seleção</button>` : `<span class="text-sm muted">Marque questões na lista, ou filtre uma prova inteira e use "Selecionar as do filtro".</span>`}
  </div>`;
}
function confirmarExcluirSelecionadasBanco(){
  const ids = [...selecaoBanco()].filter(id=>getQuestao(id));
  if(!ids.length){ limparSelecaoBanco(); return; }
  const set = new Set(ids);
  const respostas = (db.respostas||[]).filter(r=>set.has(r.questaoId)).length;
  abrirModal(`${cabecalhoJanela("Excluir " + ids.length + " questão(ões)")}<p>Esta ação não pode ser desfeita. As questões saem do banco e das sessões${respostas ? "; " + respostas + " resposta(s) de alunos perdem a questão de origem" : ""}. Para manter o histórico, prefira marcar como "anulada" ou "desatualizada".</p><p class="text-sm muted">Questões que vêm da pasta dados/ voltam na próxima carga; para tirá-las de vez, apague-as dos arquivos de dados.</p><div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="excluirSelecionadasBancoConfirmado()">Excluir ${ids.length} mesmo assim</button><button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button></div>`);
}
function excluirSelecionadasBancoConfirmado(){
  const set = selecaoBanco();
  const alvo = db.questoes.filter(q=>set.has(q.id));
  alvo.forEach(q=> nuvemMarcarQuestaoFora(q, q.status==="pendente" ? "recusada" : "removida", q.status==="pendente" ? "Excluída pela equipe." : ""));
  db.questoes = db.questoes.filter(q=>!set.has(q.id));
  set.clear(); saveState(); fecharModal(); toast(alvo.length + " questão(ões) excluída(s)."); render();
}
function renderListaBancoQuestoesHtml(lista, paginaInfo){
  if(!lista.length) return '<div class="empty-state">Nenhuma questão encontrada com esses filtros.</div>';
  return `<div class="table-wrap"><table><thead><tr><th style="width:1%"><input type="checkbox" aria-label="Selecionar as questões desta página" ${(paginaInfo?paginaInfo.itens:lista).every(q=>selecaoBanco().has(q.id))?"checked":""} onchange="selecionarPaginaBanco(this.checked)"></th><th>Questão</th><th>Instituição / Ano</th><th>Assunto</th><th>Status</th><th></th></tr></thead><tbody>
    ${(paginaInfo ? paginaInfo.itens : lista).map(q=>`<tr>
      <td><input type="checkbox" aria-label="Selecionar questão" ${selecaoBanco().has(q.id)?"checked":""} onchange="alternarSelecaoBanco('${q.id}', this.checked)"></td>
      <td class="text-sm"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${q.id}')">${escapeHtml(q.enunciado.slice(0,90))}…</span> ${q.grupoId?`<span class="badge badge-muted" title="Restrita ao grupo">${escapeHtml(getGrupo(q.grupoId)?getGrupo(q.grupoId).nome:"grupo")}</span>`:""}</td>
      <td class="text-sm nowrap">${escapeHtml(q.banca)}<br><span class="muted">${q.ano}</span>${tipoProvaDe(q)!==CONFIG.tipoProvaPadrao ? ` <span class="badge badge-amber">${escapeHtml(infoTipoProva(tipoProvaDe(q)).nome)}</span>` : ""}</td>
      <td class="text-sm">${escapeHtml(nomeAssunto(q.assuntoId))}</td>
      <td>${badgeStatusQuestao(q.status)}${aguardaImagem(q) ? ` <span class="badge badge-amber" title="${escapeHtml(q.imagemPendente)}">Aguardando imagem</span>` : ""}</td>
      <td class="flex gap-1">
        <button class="icon-btn" title="Ver na íntegra" onclick="abrirQuestaoCompleta('${q.id}')">${iconeSvg("search")}</button>
        <button class="icon-btn" title="Editar" onclick="abrirFormularioQuestao('${q.id}')">${iconeSvg("edit")}</button>
        <button class="icon-btn" title="Excluir" onclick="confirmarExcluirQuestao('${q.id}')">${iconeSvg("trash")}</button>
      </td>
    </tr>`).join("")}
  </tbody></table></div>
  ${paginaInfo ? controlesPaginacao(paginaInfo, "questão(ões)") : ""}`;
}
function abrirFormularioQuestao(qid){
  const q = qid ? getQuestao(qid) : null;
  const u = usuarioAtual();
  const criandoComoAluno = !q && u.papel==="aluno";
  const valorAlt = (letra)=> q ? ((q.alternativas.find(a=>a.id===letra)||{}).texto || "") : "";
  const dissertativa = ehDissertativa(q);
  abrirModal(`
    ${cabecalhoJanela(q?"Editar questão":"Nova questão")}
    <div class="field"><label class="label">Enunciado</label><textarea class="textarea" id="fqEnunciado" style="min-height:100px">${escapeHtml(q?q.enunciado:"")}</textarea></div>
    <div class="field"><label class="label">Formato da questão</label><select class="select" id="fqFormato" onchange="alternarFormatoNoFormulario()">
      <option value="objetiva" ${dissertativa?"":"selected"}>Múltipla escolha</option>
      <option value="dissertativa" ${dissertativa?"selected":""}>Dissertativa (o aluno escreve a resposta e se avalia)</option>
    </select></div>
    <div id="fqBlocoObjetivo" ${dissertativa?"hidden":""}>
      <div class="grid grid-2">${["A","B","C","D","E"].map(letra=>`<div class="field"><label class="label">Alternativa ${letra}${letra==="E"?" (opcional)":""}</label><input class="input" id="fqAlt${letra}" value="${escapeHtml(valorAlt(letra))}"></div>`).join("")}</div>
      <div class="hint mb-2">Deixe a alternativa E em branco se a prova original tiver só 4 alternativas (A-D) — é o caso, por exemplo, da UNIFESP-EPM.</div>
    </div>
    <div id="fqBlocoDissertativa" ${dissertativa?"":"hidden"}>
      <div class="field"><label class="label">Resposta esperada pela banca</label><textarea class="textarea" id="fqRespostaEsperada" style="min-height:100px">${escapeHtml(q?(q.respostaEsperada||""):"")}</textarea>
        <div class="hint">É o que o aluno vê depois de escrever a dele e dizer a confiança. A justificativa (mais abaixo, em "Explicação") vem logo em seguida. A correção é do próprio aluno, que marca se acertou ou errou; dissertativa não entra em simulado nem em PDF.</div></div>
    </div>
    <div class="grid grid-4">
      <div class="field"><label class="label">Tipo de prova</label><select class="select" id="fqTipoProva">${CONFIG.tiposProva.map(t=>`<option value="${t.id}" ${(q?tipoProvaDe(q):CONFIG.tipoProvaPadrao)===t.id?"selected":""} title="${escapeHtml(t.descricao)}">${escapeHtml(t.nome)}</option>`).join("")}</select></div>
      <div class="field" id="fqCampoGabarito" ${dissertativa?"hidden":""}><label class="label">Gabarito</label><select class="select" id="fqGabarito">${q&&!q.gabarito?`<option value="" selected>— (sem gabarito: anulada)</option>`:""}${["A","B","C","D","E"].map(l=>`<option value="${l}" ${q&&q.gabarito===l?"selected":""}>${l}</option>`).join("")}</select></div>
      <div class="field"><label class="label">Banca</label><input class="input" id="fqBanca" list="listaBancasForm" value="${escapeHtml(q?q.banca:CONFIG.bancaFoco)}">
        <datalist id="listaBancasForm">${[...new Set([...CONFIG.instituicoesReferencia, ...CONFIG.instituicoesGraduacao, ...db.questoes.map(x=>x.banca)])].map(b=>`<option value="${escapeHtml(b)}"></option>`).join("")}</datalist>
      </div>
      <div class="field"><label class="label">Ano</label><input class="input" type="number" id="fqAno" value="${q?q.ano:new Date().getFullYear()}"></div>
    </div>
    <div class="grid grid-3">
      <div class="field"><label class="label">Grande área</label><select class="select" id="fqArea" onchange="atualizarSelectsTaxonomiaForm()">${db.taxonomia.areas.map(a=>`<option value="${a.id}" ${q&&q.areaId===a.id?"selected":""}>${escapeHtml(a.nome)}</option>`).join("")}</select></div>
      <div class="field"><label class="label">Especialidade</label><select class="select" id="fqEspecialidade" onchange="atualizarSelectAssuntoForm()"></select></div>
      <div class="field"><label class="label">Assunto</label><select class="select" id="fqAssunto"></select></div>
    </div>
    <div class="flex gap-1 mb-2 quebra">
      <button class="btn btn-secondary btn-sm" onclick="criarEspecialidadeRapida()">${iconeSvg("plus")} Nova especialidade</button>
      <button class="btn btn-secondary btn-sm" onclick="criarAssuntoRapido()">${iconeSvg("plus")} Novo assunto</button>
      <span class="hint">Se a especialidade ou o assunto certo não estiver na lista, crie aqui mesmo — a questão já nasce classificada corretamente.</span>
    </div>
    <div class="grid grid-2">
      <div class="field"><label class="label">Dificuldade manual</label><select class="select" id="fqDificuldade">
        <option value="fundamental" ${q&&q.dificuldadeManual==="fundamental"?"selected":""}>Fundamental</option>
        <option value="intermediario" ${!q||q.dificuldadeManual==="intermediario"?"selected":""}>Intermediário</option>
        <option value="avancado" ${q&&q.dificuldadeManual==="avancado"?"selected":""}>Avançado</option>
      </select></div>
      ${criandoComoAluno ? `<div class="field"><label class="label">Destino</label><select class="select" id="fqDestino">
        ${opcoesDeDestinoDeGrupo(u, "Só para o meu grupo (fica disponível na hora)", g=>"Só para o grupo "+g.nome+" (fica disponível na hora)").map(([v,l])=>`<option value="${v}">${escapeHtml(l)}</option>`).join("")}
        <option value="geral">Sugerir para o banco geral (passa por revisão do admin)</option>
      </select></div>` : `<div class="field"><label class="label">Status</label><select class="select" id="fqStatus">
        <option value="ativa" ${!q||q.status==="ativa"?"selected":""}>Ativa</option>
        <option value="anulada" ${q&&q.status==="anulada"?"selected":""}>Anulada</option>
        <option value="desatualizada" ${q&&q.status==="desatualizada"?"selected":""}>Desatualizada</option>
        ${q&&q.status==="rascunho" ? `<option value="rascunho" selected>Rascunho (fora do estudo)</option>` : ""}
      </select></div>`}
    </div>
    <div class="field"><label class="label">Explicação (resposta correta)</label><textarea class="textarea" id="fqExplicacao" style="min-height:90px">${escapeHtml(q?q.explicacaoGeral:"")}</textarea>
      <div class="hint">Escreva com suas palavras, a partir de diretriz, consenso ou artigo — não copie a resolução de sites de questões ou de cursinhos.</div></div>
    <div class="field"><label class="label">Referências consultadas</label><input class="input" id="fqReferencias" placeholder="Ex.: Diretriz da Sociedade Brasileira de Cardiologia 2024; Ministério da Saúde, PCDT 2023" value="${escapeHtml(q?(q.referencias||""):"")}"></div>
    <div class="field"><label class="label">Imagem da questão (opcional)</label>
      <div class="flex gap-1 quebra">
        <label class="btn btn-secondary btn-sm clicavel">${iconeSvg("upload")} Enviar imagem<input type="file" accept="image/*" style="display:none" onchange="carregarImagemQuestao(this)"></label>
        <button class="btn btn-secondary btn-sm" onclick="definirImagemPorUrl()">${iconeSvg("search")} Usar link</button>
        <button class="btn btn-ghost btn-sm" onclick="removerImagemFormulario()">${iconeSvg("trash")} Remover</button>
      </div>
      <div id="fqImagemPreview" class="mt-1"></div>
      <input class="input mt-1" id="fqImagemLegenda" placeholder="Legenda (ex.: ECG de 12 derivações na admissão)" value="${escapeHtml(q?(q.imagemLegenda||""):"")}">
      <div class="hint">Imagens enviadas são reduzidas e comprimidas antes de serem guardadas. ECG, radiografia, fundo de olho e fotos de lesão são o motivo de este campo existir.</div>
      ${q && aguardaImagem(q) ? `<div class="imagem-pendente mt-1">${iconeSvg("alert")}<div><strong>Aguardando imagem — esta questão não aparece para os alunos.</strong>
        <div class="text-xs mt-1">Na prova: ${escapeHtml(q.imagemPendente)} Arquivo esperado: <code>${escapeHtml(q.imagemUrl||"")}</code>. Enviar a imagem aqui já libera a questão.</div>
        <label class="checkbox-row mt-1"><input type="checkbox" id="fqImagemChegou"> A imagem já foi salva em dados/imagens/ — liberar a questão para os alunos</label></div></div>` : ""}
    </div>
    ${(q && (u.papel==="admin"||u.papel==="professor")) ? `<div class="text-xs muted mb-1">Criada por ${escapeHtml(getUsuario(q.criadoPor)?getUsuario(q.criadoPor).nome:"—")} em ${formatDataBR(q.criadoEm)}${q.aprovadoPor?" · aprovada por "+escapeHtml(getUsuario(q.aprovadoPor)?getUsuario(q.aprovadoPor).nome:"—"):""}${q.grupoId?" · restrita ao grupo "+escapeHtml(getGrupo(q.grupoId)?getGrupo(q.grupoId).nome:"—"):""}</div>` : ""}
    <div class="flex gap-1 mt-1"><button class="btn btn-primary" onclick="salvarQuestaoFormulario('${qid||""}')">Salvar</button><button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button></div>
  `, "lg");
  state.filtroRota.imagemFormulario = q ? (q.imagemUrl || "") : "";
  setTimeout(()=>{
    popularSelectEspecialidade(q?q.areaId:db.taxonomia.areas[0].id, q?q.especialidadeId:null);
    popularSelectAssunto(q?q.especialidadeId:null, q?q.assuntoId:null);
    atualizarPreviewImagemFormulario();
  }, 0);
}
/* permite classificar uma questão num assunto/especialidade que ainda não
   existe na taxonomia, sem sair do formulário */
function criarEspecialidadeRapida(){
  const areaId = document.getElementById("fqArea").value;
  const nome = (window.prompt("Nome da nova especialidade (dentro de "+nomeArea(areaId)+"):")||"").trim();
  if(!nome) return;
  const jaExiste = db.taxonomia.especialidades.find(e=>e.areaId===areaId && e.nome.toLowerCase()===nome.toLowerCase());
  const nova = jaExiste || {id:uid("esp"), areaId, nome};
  if(!jaExiste){ db.taxonomia.especialidades.push(nova); saveState(); }
  popularSelectEspecialidade(areaId, nova.id);
  popularSelectAssunto(nova.id, null);
  toast(jaExiste ? "Essa especialidade já existia — selecionada." : 'Especialidade "'+nome+'" criada.');
}
function criarAssuntoRapido(){
  const espId = document.getElementById("fqEspecialidade").value;
  if(!espId){ toast("Escolha ou crie uma especialidade primeiro.", "err"); return; }
  const nome = (window.prompt("Nome do novo assunto (dentro de "+nomeEspecialidade(espId)+"):")||"").trim();
  if(!nome) return;
  const jaExiste = db.taxonomia.assuntos.find(a=>a.especialidadeId===espId && a.nome.toLowerCase()===nome.toLowerCase());
  const novo = jaExiste || {id:uid("ass"), especialidadeId:espId, nome};
  if(!jaExiste){ db.taxonomia.assuntos.push(novo); saveState(); }
  popularSelectAssunto(espId, novo.id);
  toast(jaExiste ? "Esse assunto já existia — selecionado." : 'Assunto "'+nome+'" criado.');
}
/* ---------- imagem no formulário de questão ---------- */
function atualizarPreviewImagemFormulario(){
  const alvo = document.getElementById("fqImagemPreview"); if(!alvo) return;
  const url = state.filtroRota.imagemFormulario;
  alvo.innerHTML = url
    ? `<img src="${escapeHtml(url)}" style="max-height:180px;max-width:100%;border:1px solid var(--border);border-radius:var(--radius-sm)" alt="">`
    : '<span class="text-xs muted">Nenhuma imagem anexada.</span>';
}
function definirImagemFormulario(url){
  state.filtroRota.imagemFormulario = url || "";
  atualizarPreviewImagemFormulario();
}
function removerImagemFormulario(){ definirImagemFormulario(""); toast("Imagem removida da questão."); }
function definirImagemPorUrl(){
  const url = (window.prompt("Cole o endereço (URL) da imagem:", state.filtroRota.imagemFormulario||"")||"").trim();
  if(!url) return;
  definirImagemFormulario(url);
  toast("Link da imagem definido. Lembre-se: se o site sair do ar, a imagem some — enviar o arquivo é mais seguro.");
}
/* ---------- a mesma imagem (ECG, fundo de olho, lesão de pele...), agora
   também nos flashcards. Mesma compressão da questão, guardada à parte
   (state.filtroRota.imagemFlashcard) para não colidir com o formulário de
   questão quando os dois existirem na mesma sessão de navegação. */
function atualizarPreviewImagemFlashcard(){
  const alvo = document.getElementById("fcImagemPreview"); if(!alvo) return;
  const url = state.filtroRota.imagemFlashcard;
  alvo.innerHTML = url
    ? `<img src="${escapeHtml(url)}" style="max-height:180px;max-width:100%;border:1px solid var(--border);border-radius:var(--radius-sm)" alt="">`
    : '<span class="text-xs muted">Nenhuma imagem anexada.</span>';
}
function definirImagemFlashcard(url){
  state.filtroRota.imagemFlashcard = url || "";
  atualizarPreviewImagemFlashcard();
}
function removerImagemFlashcard(){ definirImagemFlashcard(""); toast("Imagem removida do cartão."); }
function definirImagemFlashcardPorUrl(){
  const url = (window.prompt("Cole o endereço (URL) da imagem:", state.filtroRota.imagemFlashcard||"")||"").trim();
  if(!url) return;
  definirImagemFlashcard(url);
  toast("Link da imagem definido. Lembre-se: se o site sair do ar, a imagem some — enviar o arquivo é mais seguro.");
}
/* Lê o arquivo de imagem escolhido, reduz o lado maior para 1100px e
   comprime em JPEG: um ECG fica com poucas dezenas de KB, o que o
   armazenamento do navegador aguenta. Uma função só para os três lugares que
   recebem imagem — questão, flashcard e as questões do envio em lote. */
function comprimirImagemDoArquivo(input, aoTerminar){
  const arq = input.files && input.files[0]; if(!arq) return;
  if(!/^image\//.test(arq.type||"")){ toast("Selecione um arquivo de imagem.", "err"); return; }
  const leitor = new FileReader();
  leitor.onload = e=>{
    const img = new Image();
    img.onload = ()=>{
      const maxLado = 1100;
      const escala = Math.min(1, maxLado/Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width*escala);
      canvas.height = Math.round(img.height*escala);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      let dataUrl;
      try{ dataUrl = canvas.toDataURL("image/jpeg", 0.72); }
      catch(err){ toast("Não foi possível processar esta imagem.", "err"); return; }
      const kb = Math.round(dataUrl.length*0.75/1024);
      aoTerminar(dataUrl);
      toast("Imagem anexada ("+kb+" KB depois da compressão).");
      if(kb > 400) toast("Imagem grande: prefira recortar só a parte que importa, para não encher o armazenamento.", "err");
    };
    img.onerror = ()=>toast("Arquivo de imagem inválido.", "err");
    img.src = e.target.result;
  };
  leitor.readAsDataURL(arq);
}
function carregarImagemFlashcard(input){ comprimirImagemDoArquivo(input, definirImagemFlashcard); }
function carregarImagemQuestao(input){ comprimirImagemDoArquivo(input, definirImagemFormulario); }

/* ---------- detecção de questões duplicadas ----------
   Compara o enunciado normalizado (sem acento, pontuação ou espaço extra).
   Os 160 primeiros caracteres bastam: provas repetidas costumam vir com o
   mesmo caso clínico, ainda que a formatação mude. */
function chaveTextoQuestao(texto){
  return normalizarNome(texto).replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
}
function assinaturaEnunciado(texto){ return chaveTextoQuestao(texto).slice(0,160); }
/* Índice assinatura -> questões, na mesma linha das outras caches por
   _geracaoDb. Sem ele, colar uma prova inteira (100 questões) chamava
   questoesDuplicadasDe() 100 vezes, e cada chamada varria o banco inteiro
   de novo (refazendo a normalização de cada enunciado já existente) — com
   milhares de questões isso passa de fração de segundo para vários
   segundos de travamento na pré-visualização da importação. */
let _cacheIndiceAssinaturas = null;
function indiceAssinaturasQuestoes(){
  if(_cacheIndiceAssinaturas && _cacheIndiceAssinaturas.geracao===_geracaoDb) return _cacheIndiceAssinaturas.mapa;
  const mapa = new Map();
  db.questoes.forEach(q=>{
    const chave = assinaturaEnunciado(q.enunciado);
    if(chave.length < 25) return;
    if(!mapa.has(chave)) mapa.set(chave, []);
    mapa.get(chave).push(q);
  });
  _cacheIndiceAssinaturas = { geracao:_geracaoDb, mapa };
  return mapa;
}
function questoesDuplicadasDe(enunciado, ignorarId){
  const alvo = assinaturaEnunciado(enunciado);
  if(alvo.length < 25) return [];
  return (indiceAssinaturasQuestoes().get(alvo) || []).filter(q=>q.id!==ignorarId);
}
function gruposDeDuplicatas(){
  return [...indiceAssinaturasQuestoes().values()].filter(g=>g.length>1)
    .sort((a,b)=>b.length-a.length);
}
function popularSelectEspecialidade(areaId, especialidadeIdSelecionada){
  const sel = document.getElementById("fqEspecialidade"); if(!sel) return;
  sel.innerHTML = db.taxonomia.especialidades.filter(e=>e.areaId===areaId).map(e=>`<option value="${e.id}" ${especialidadeIdSelecionada===e.id?"selected":""}>${escapeHtml(e.nome)}</option>`).join("");
}
function popularSelectAssunto(especialidadeId, assuntoIdSelecionado){
  const selEsp = document.getElementById("fqEspecialidade");
  const espId = especialidadeId || (selEsp?selEsp.value:null);
  const sel = document.getElementById("fqAssunto"); if(!sel) return;
  sel.innerHTML = db.taxonomia.assuntos.filter(a=>a.especialidadeId===espId).map(a=>`<option value="${a.id}" ${assuntoIdSelecionado===a.id?"selected":""}>${escapeHtml(a.nome)}</option>`).join("");
}
function atualizarSelectsTaxonomiaForm(){ popularSelectEspecialidade(document.getElementById("fqArea").value, null); popularSelectAssunto(null,null); }
function atualizarSelectAssuntoForm(){ popularSelectAssunto(document.getElementById("fqEspecialidade").value, null); }
// dissertativa não tem alternativas nem gabarito: troca o que o formulário pede
function alternarFormatoNoFormulario(){
  const dissertativa = document.getElementById("fqFormato").value === "dissertativa";
  document.getElementById("fqBlocoObjetivo").hidden = dissertativa;
  document.getElementById("fqCampoGabarito").hidden = dissertativa;
  document.getElementById("fqBlocoDissertativa").hidden = !dissertativa;
}
function salvarQuestaoFormulario(qid, forcar){
  const dissertativa = document.getElementById("fqFormato").value === "dissertativa";
  const dados = {
    enunciado: document.getElementById("fqEnunciado").value.trim(),
    // alternativa E é opcional: provas com só 4 alternativas (ex.: UNIFESP-EPM)
    // não devem ganhar uma 5ª alternativa vazia no banco.
    alternativas: ["A","B","C","D","E"].map(l=>({id:l, texto:document.getElementById("fqAlt"+l).value.trim()})).filter(a=>a.texto),
    gabarito: document.getElementById("fqGabarito").value,
    banca: document.getElementById("fqBanca").value.trim(),
    tipoProva: document.getElementById("fqTipoProva").value || CONFIG.tipoProvaPadrao,
    ano: parseInt(document.getElementById("fqAno").value) || new Date().getFullYear(),
    areaId: document.getElementById("fqArea").value,
    especialidadeId: document.getElementById("fqEspecialidade").value,
    assuntoId: document.getElementById("fqAssunto").value,
    dificuldadeManual: document.getElementById("fqDificuldade").value,
    explicacaoGeral: document.getElementById("fqExplicacao").value.trim(),
    referencias: (document.getElementById("fqReferencias").value||"").trim(),
    imagemUrl: state.filtroRota.imagemFormulario || "",
    imagemLegenda: (document.getElementById("fqImagemLegenda").value||"").trim(),
  };
  const campoDestino = document.getElementById("fqDestino");
  const campoStatus = document.getElementById("fqStatus");
  if(campoStatus) dados.status = campoStatus.value;
  if(dissertativa){
    dados.tipo = "dissertativa";
    dados.respostaEsperada = (document.getElementById("fqRespostaEsperada").value||"").trim();
    dados.alternativas = []; dados.gabarito = "";
    if(!dados.enunciado || !dados.respostaEsperada){ toast("Preencha o enunciado e a resposta esperada pela banca.", "err"); return; }
  }else{
    // questão que deixou de ser dissertativa perde os campos dela
    if(qid && ehDissertativa(getQuestao(qid))){ dados.tipo = ""; dados.respostaEsperada = ""; }
    if(!dados.enunciado || dados.alternativas.some(a=>!a.texto)){ toast("Preencha o enunciado e as 5 alternativas.", "err"); return; }
  }
  // antes de criar, avisa se essa questão já existe no banco
  const duplicadas = questoesDuplicadasDe(dados.enunciado, qid||null);
  if(duplicadas.length && !forcar){
    state.filtroRota.questaoPendente = {qid: qid||null, dados, destino: campoDestino?campoDestino.value:null};
    abrirModal(`${cabecalhoJanela("Questão possivelmente duplicada")}
      <p class="text-sm">Já existe ${duplicadas.length} questão(ões) com enunciado praticamente igual no banco:</p>
      ${duplicadas.slice(0,3).map(d=>`<div class="card-flat mt-1"><div class="text-sm"><span class="enunciado-clicavel" onclick="fecharModal();abrirQuestaoCompleta('${d.id}')">${escapeHtml(d.enunciado.slice(0,180))}…</span></div><div class="text-xs muted mt-1">${escapeHtml(d.banca)} · ${d.ano} · ${escapeHtml(nomeAssunto(d.assuntoId))}</div><button class="link-btn mt-1" onclick="fecharModal();abrirQuestaoCompleta('${d.id}')">ver questão existente</button></div>`).join("")}
      <div class="flex gap-1 mt-2 quebra">
        <button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button>
        <button class="btn btn-danger" onclick="salvarQuestaoPendente()">Salvar assim mesmo</button>
      </div>`);
    return;
  }
  const u = usuarioAtual();
  if(qid){
    const atual = getQuestao(qid);
    // a figura chegou (anexada aqui, ou marcada como já presente na pasta
    // dados/imagens/): a questão deixa de esperar e volta para os alunos
    const liberar = document.getElementById("fqImagemChegou");
    if(atual.imagemPendente && ((dados.imagemUrl && dados.imagemUrl !== atual.imagemUrl) || (liberar && liberar.checked))){
      delete atual.imagemPendente;
      atual.imagemLiberada = true;
    }
    Object.assign(atual, dados);
    // questão da pasta dados/: o conserto vira correção, sobe e desce para
    // todos (Questões para Atualizar, seção 26-D); as outras sobem inteiras
    registrarCorrecaoDaQuestao(atual.id);
    nuvemMarcarQuestao(atual.id);
  }
  else{
    const nova = { id:uid("q"), ...dados, real:true, explicacoesAlternativas:{}, estatisticas:{respostas:0,acertos:0,distribuicaoAlternativas:{}}, criadoPor:u.id, autorPapel:u.papel, criadoEm:hojeISO() };
    if(campoDestino){
      if(destinoEhGrupo(campoDestino.value)){ nova.grupoId = grupoDoDestino(u, campoDestino.value).id; nova.status = "ativa"; }
      else{ nova.status = "pendente"; }
    } else if(!nova.status){ nova.status = "ativa"; }
    db.questoes.push(nova);
    nuvemMarcarQuestao(nova.id);
  }
  saveState(); fecharModal();
  toast(qid?"Questão atualizada.":"Questão criada."+(nuvemConectado() && campoDestino && !destinoEhGrupo(campoDestino.value) ? " Ela sobe para a nuvem e espera a aprovação da equipe." : ""));
  render();
}
/* salva a questão que ficou pendente no aviso de duplicidade (os campos do
   formulário já não existem no DOM, porque o modal foi substituído) */
function salvarQuestaoPendente(){
  const pend = state.filtroRota.questaoPendente;
  if(!pend){ fecharModal(); return; }
  const u = usuarioAtual();
  if(pend.qid){ Object.assign(getQuestao(pend.qid), pend.dados); registrarCorrecaoDaQuestao(pend.qid); nuvemMarcarQuestao(pend.qid); }
  else{
    const nova = { id:uid("q"), ...pend.dados, real:true, explicacoesAlternativas:{}, estatisticas:{respostas:0,acertos:0,distribuicaoAlternativas:{}}, criadoPor:u.id, autorPapel:u.papel, criadoEm:hojeISO() };
    if(destinoEhGrupo(pend.destino)){ nova.grupoId = grupoDoDestino(u, pend.destino).id; nova.status = "ativa"; }
    else if(pend.destino){ nova.status = "pendente"; }
    else if(!nova.status){ nova.status = "ativa"; }
    db.questoes.push(nova);
    nuvemMarcarQuestao(nova.id);
  }
  state.filtroRota.questaoPendente = null;
  saveState(); fecharModal(); toast("Questão salva."); render();
}
function confirmarExcluirQuestao(qid){
  abrirModal(`${cabecalhoJanela("Excluir questão")}<p>Esta ação não pode ser desfeita. Considere marcar como "anulada" ou "desatualizada" em vez de excluir, para manter o histórico de quem já respondeu.</p><div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="excluirQuestaoConfirmado('${qid}')">Excluir mesmo assim</button><button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button></div>`);
}
function excluirQuestaoConfirmado(qid){
  const q = getQuestao(qid);
  // enviada pela plataforma: a exclusão também sai dos outros aparelhos
  // (uma pendente vira "recusada" para quem enviou; uma aprovada, "removida")
  if(q) nuvemMarcarQuestaoFora(q, q.status==="pendente" ? "recusada" : "removida", q.status==="pendente" ? "Excluída pela equipe." : "");
  db.questoes = db.questoes.filter(q=>q.id!==qid); saveState(); fecharModal(); toast("Questão excluída."); render();
}
function marcarQuestaoStatus(qid, status){ getQuestao(qid).status = status; registrarCorrecaoDaQuestao(qid); nuvemMarcarQuestao(qid); saveState(); toast("Status atualizado."); render(); }

/* ==========================================================================
   25-B. ESPECIALIDADES E ASSUNTOS (taxonomia)
   ==========================================================================
   Aqui se resolve a bagunça que aparece com o tempo: assunto criado na
   especialidade errada, assunto duplicado com nome quase igual, questão cuja
   área/especialidade não bate com o assunto, especialidade "Outros" criada
   pela importação. Tudo pode ser renomeado, movido, mesclado ou excluído, e
   há uma verificação automática de consistência. */
function normalizarNome(nome){
  return (nome||"").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
}
function contarQuestoesAssunto(assuntoId){ return db.questoes.filter(q=>q.assuntoId===assuntoId).length; }
function contarQuestoesEspecialidade(espId){ return db.questoes.filter(q=>q.especialidadeId===espId).length; }

/* Verificação de consistência: devolve tudo que está fora do lugar. */
function diagnosticoTaxonomia(){
  const idsAssunto = new Set(db.taxonomia.assuntos.map(a=>a.id));
  const idsEsp = new Set(db.taxonomia.especialidades.map(e=>e.id));
  const idsArea = new Set(db.taxonomia.areas.map(a=>a.id));
  const questoesSemAssunto = db.questoes.filter(q=>!idsAssunto.has(q.assuntoId));
  const questoesIncoerentes = db.questoes.filter(q=>{
    const a = getAssunto(q.assuntoId); if(!a) return false;
    const e = getEspecialidade(a.especialidadeId); if(!e) return false;
    return q.especialidadeId!==e.id || q.areaId!==e.areaId;
  });
  const assuntosOrfaos = db.taxonomia.assuntos.filter(a=>!idsEsp.has(a.especialidadeId));
  const especialidadesOrfas = db.taxonomia.especialidades.filter(e=>!idsArea.has(e.areaId));
  const vistos = {};
  const duplicados = [];
  db.taxonomia.assuntos.forEach(a=>{
    const chave = a.especialidadeId+"|"+normalizarNome(a.nome);
    if(vistos[chave]) duplicados.push({original:vistos[chave], copia:a});
    else vistos[chave] = a;
  });
  const assuntosVazios = db.taxonomia.assuntos.filter(a=>contarQuestoesAssunto(a.id)===0);
  const total = questoesSemAssunto.length + questoesIncoerentes.length + assuntosOrfaos.length + especialidadesOrfas.length + duplicados.length;
  return {questoesSemAssunto, questoesIncoerentes, assuntosOrfaos, especialidadesOrfas, duplicados, assuntosVazios, total};
}

/* Correção automática — a parte segura e reversível do problema:
   1) alinha área/especialidade de cada questão ao assunto dela;
   2) devolve assuntos órfãos para uma especialidade "A classificar" da área;
   3) mescla assuntos com o mesmo nome dentro da mesma especialidade;
   4) manda questões sem assunto válido para um assunto "A classificar".
   Nada é apagado sem que as questões sejam realocadas antes. */
function especialidadeAClassificar(areaId){
  let esp = db.taxonomia.especialidades.find(e=>e.areaId===areaId && normalizarNome(e.nome)==="a classificar");
  if(!esp){ esp = {id:uid("esp"), areaId, nome:"A classificar"}; db.taxonomia.especialidades.push(esp); }
  return esp;
}
function assuntoAClassificar(especialidadeId){
  let ass = db.taxonomia.assuntos.find(a=>a.especialidadeId===especialidadeId && normalizarNome(a.nome)==="a classificar");
  if(!ass){ ass = {id:uid("ass"), especialidadeId, nome:"A classificar"}; db.taxonomia.assuntos.push(ass); }
  return ass;
}
function trocarAssuntoNasRespostas(origemId, destinoId){
  const destino = getAssunto(destinoId);
  const esp = destino ? getEspecialidade(destino.especialidadeId) : null;
  db.respostas.forEach(r=>{ if(r.assuntoId===origemId){ r.assuntoId = destinoId; if(esp){ r.especialidadeId = esp.id; r.areaId = esp.areaId; } } });
}
function corrigirTaxonomiaAutomaticamente(){
  let ajustes = 0;
  /* Todo conserto daqui para baixo precisa de uma área para onde mandar o
     que está órfão. Sem nenhuma área, `db.taxonomia.areas[0].id` estourava —
     e, como esta função roda dentro do carregamento, o estouro derrubava a
     leitura inteira do banco e levava os cadastros junto. Um banco sem área
     nenhuma acontece de verdade: basta a pasta "dados/" não ter chegado na
     primeiríssima abertura, ou alguém apagar as áreas na tela de taxonomia.
     Aqui não há o que corrigir — sincronizarConteudoNovo() repõe a taxonomia
     logo em seguida, a partir da pasta. */
  if(!db.taxonomia || !Array.isArray(db.taxonomia.areas) || !db.taxonomia.areas.length) return 0;
  const areaPadraoId = db.taxonomia.areas[0].id;
  // especialidades órfãs -> primeira área
  db.taxonomia.especialidades.forEach(e=>{
    if(!getArea(e.areaId)){ e.areaId = areaPadraoId; ajustes++; }
  });
  // assuntos órfãos -> especialidade "A classificar" da primeira área
  db.taxonomia.assuntos.forEach(a=>{
    if(!getEspecialidade(a.especialidadeId)){ a.especialidadeId = especialidadeAClassificar(areaPadraoId).id; ajustes++; }
  });
  // duplicados -> mescla no primeiro
  diagnosticoTaxonomia().duplicados.forEach(({original, copia})=>{
    db.questoes.forEach(q=>{ if(q.assuntoId===copia.id){ q.assuntoId = original.id; } });
    trocarAssuntoNasRespostas(copia.id, original.id);
    db.taxonomia.assuntos = db.taxonomia.assuntos.filter(a=>a.id!==copia.id);
    ajustes++;
  });
  // questões sem assunto válido -> "A classificar" da especialidade (ou da área)
  db.questoes.forEach(q=>{
    if(!getAssunto(q.assuntoId)){
      const esp = getEspecialidade(q.especialidadeId) || especialidadeAClassificar(getArea(q.areaId) ? q.areaId : areaPadraoId);
      if(!esp) return;   // não há onde classificar: a questão fica como está
      q.assuntoId = assuntoAClassificar(esp.id).id;
      ajustes++;
    }
  });
  // alinha área/especialidade da questão (e das respostas) ao assunto
  db.questoes.forEach(q=>{
    const a = getAssunto(q.assuntoId); if(!a) return;
    const e = getEspecialidade(a.especialidadeId); if(!e) return;
    if(q.especialidadeId!==e.id || q.areaId!==e.areaId){ q.especialidadeId = e.id; q.areaId = e.areaId; ajustes++; }
  });
  db.respostas.forEach(r=>{
    const a = getAssunto(r.assuntoId); if(!a) return;
    const e = getEspecialidade(a.especialidadeId); if(!e) return;
    if(r.especialidadeId!==e.id || r.areaId!==e.areaId){ r.especialidadeId = e.id; r.areaId = e.areaId; }
  });
  if(ajustes) saveState();
  return ajustes;
}
function corrigirTaxonomiaUI(){
  const n = corrigirTaxonomiaAutomaticamente();
  toast(n ? n+" inconsistência(s) corrigida(s)." : "Nada a corrigir — a taxonomia está consistente.");
  render();
}

/* ---------- edição manual ---------- */
function renomearEspecialidade(id){
  const e = getEspecialidade(id); if(!e) return;
  const nome = (window.prompt("Novo nome da especialidade:", e.nome)||"").trim();
  if(!nome) return;
  e.nome = nome; saveState(); toast("Especialidade renomeada."); render();
}
function moverEspecialidade(id, areaId){
  const e = getEspecialidade(id); if(!e) return;
  e.areaId = areaId;
  db.questoes.forEach(q=>{ if(q.especialidadeId===id) q.areaId = areaId; });
  db.respostas.forEach(r=>{ if(r.especialidadeId===id) r.areaId = areaId; });
  saveState(); toast("Especialidade movida de grande área."); render();
}
function excluirEspecialidade(id){
  if(contarQuestoesEspecialidade(id)>0){ toast("Esta especialidade ainda tem questões. Mova ou mescle os assuntos antes de excluir.", "err"); return; }
  db.taxonomia.assuntos = db.taxonomia.assuntos.filter(a=>a.especialidadeId!==id);
  db.taxonomia.especialidades = db.taxonomia.especialidades.filter(e=>e.id!==id);
  saveState(); toast("Especialidade excluída."); render();
}
function criarEspecialidadeNaArea(areaId){
  const nome = (window.prompt("Nome da nova especialidade em "+nomeArea(areaId)+":")||"").trim();
  if(!nome) return;
  db.taxonomia.especialidades.push({id:uid("esp"), areaId, nome});
  saveState(); toast("Especialidade criada."); render();
}
function criarAssuntoNaEspecialidade(espId){
  const nome = (window.prompt("Nome do novo assunto em "+nomeEspecialidade(espId)+":")||"").trim();
  if(!nome) return;
  db.taxonomia.assuntos.push({id:uid("ass"), especialidadeId:espId, nome});
  saveState(); toast("Assunto criado."); render();
}
function renomearAssunto(id){
  const a = getAssunto(id); if(!a) return;
  const nome = (window.prompt("Novo nome do assunto:", a.nome)||"").trim();
  if(!nome) return;
  a.nome = nome; saveState(); toast("Assunto renomeado."); render();
}
function moverAssunto(id, novaEspId){
  const a = getAssunto(id); if(!a || !novaEspId) return;
  a.especialidadeId = novaEspId;
  const esp = getEspecialidade(novaEspId);
  db.questoes.forEach(q=>{ if(q.assuntoId===id){ q.especialidadeId = esp.id; q.areaId = esp.areaId; } });
  db.respostas.forEach(r=>{ if(r.assuntoId===id){ r.especialidadeId = esp.id; r.areaId = esp.areaId; } });
  saveState(); toast('Assunto movido para "'+esp.nome+'".'); render();
}
function abrirMesclarAssunto(id){
  const a = getAssunto(id); if(!a) return;
  const outros = db.taxonomia.assuntos.filter(x=>x.id!==id);
  abrirModal(`
    ${cabecalhoJanela("Mesclar assunto")}
    <p class="text-sm muted">Todas as ${contarQuestoesAssunto(id)} questão(ões) de <strong>${escapeHtml(a.nome)}</strong> passam para o assunto escolhido, e o assunto atual é excluído. O histórico de respostas dos alunos acompanha a mudança.</p>
    <div class="field mt-2"><label class="label">Mesclar em</label>
      <select class="select" id="mesclarDestino">
        ${db.taxonomia.areas.map(area=>`<optgroup label="${escapeHtml(area.nome)}">${db.taxonomia.especialidades.filter(e=>e.areaId===area.id).map(e=>outros.filter(x=>x.especialidadeId===e.id).map(x=>`<option value="${x.id}">${escapeHtml(e.nome)} › ${escapeHtml(x.nome)}</option>`).join("")).join("")}</optgroup>`).join("")}
      </select></div>
    <div class="flex gap-1 mt-2"><button class="btn btn-primary" onclick="confirmarMesclarAssunto('${id}')">Mesclar</button><button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button></div>`);
}
function confirmarMesclarAssunto(origemId){
  const destinoId = document.getElementById("mesclarDestino").value;
  if(!destinoId){ toast("Escolha o assunto de destino.", "err"); return; }
  const destino = getAssunto(destinoId), esp = getEspecialidade(destino.especialidadeId);
  db.questoes.forEach(q=>{ if(q.assuntoId===origemId){ q.assuntoId = destinoId; q.especialidadeId = esp.id; q.areaId = esp.areaId; } });
  trocarAssuntoNasRespostas(origemId, destinoId);
  db.taxonomia.assuntos = db.taxonomia.assuntos.filter(a=>a.id!==origemId);
  saveState(); fecharModal(); toast("Assuntos mesclados."); render();
}
function excluirAssunto(id){
  if(contarQuestoesAssunto(id)>0){ toast("Este assunto ainda tem questões. Use 'mesclar' ou mova as questões antes de excluir.", "err"); return; }
  db.taxonomia.assuntos = db.taxonomia.assuntos.filter(a=>a.id!==id);
  saveState(); toast("Assunto excluído."); render();
}
function renderTaxonomia(){
  const d = diagnosticoTaxonomia();
  const podeEditar = podeGerirConteudo();
  return `
  <div class="page-header"><h2>Especialidades e Assuntos</h2><p>Organize a árvore grande área › especialidade › assunto. É aqui que se conserta assunto na especialidade errada, nome duplicado e questão classificada de forma incoerente.</p></div>

  <div class="card mb-2" style="${d.total?"border-color:var(--amber)":""}">
    <div class="flex justify-between items-center gap-2 quebra">
      <div>
        <div class="card-title">Verificação de consistência</div>
        <p class="text-sm muted">${d.total ? d.total+" problema(s) encontrado(s)." : "Nenhum problema encontrado — árvore e questões estão coerentes."}</p>
      </div>
      ${podeEditar && d.total ? `<button class="btn btn-primary btn-sm" onclick="corrigirTaxonomiaUI()">${iconeSvg("check")} Corrigir automaticamente</button>` : ""}
    </div>
    ${d.total ? `<div class="mt-2">
      ${d.questoesIncoerentes.length ? `<div class="card-flat mb-1 text-sm"><strong>${d.questoesIncoerentes.length} questão(ões)</strong> com grande área ou especialidade diferente da do próprio assunto. A correção realinha pelo assunto — que é a classificação mais específica.</div>` : ""}
      ${d.questoesSemAssunto.length ? `<div class="card-flat mb-1 text-sm"><strong>${d.questoesSemAssunto.length} questão(ões)</strong> apontam para um assunto que não existe mais. Serão movidas para um assunto "A classificar" da especialidade.</div>` : ""}
      ${d.duplicados.length ? `<div class="card-flat mb-1 text-sm"><strong>${d.duplicados.length} assunto(s) duplicado(s)</strong> (mesmo nome na mesma especialidade): ${escapeHtml(d.duplicados.map(x=>x.copia.nome).join(", "))}. Serão mesclados no primeiro.</div>` : ""}
      ${d.assuntosOrfaos.length ? `<div class="card-flat mb-1 text-sm"><strong>${d.assuntosOrfaos.length} assunto(s) órfão(s)</strong>, sem especialidade válida: ${escapeHtml(d.assuntosOrfaos.map(a=>a.nome).join(", "))}.</div>` : ""}
      ${d.especialidadesOrfas.length ? `<div class="card-flat mb-1 text-sm"><strong>${d.especialidadesOrfas.length} especialidade(s)</strong> sem grande área válida.</div>` : ""}
    </div>` : ""}
    ${d.assuntosVazios.length ? `<p class="text-xs muted mt-2">${d.assuntosVazios.length} assunto(s) sem nenhuma questão — não é erro, mas eles aparecem vazios nos filtros dos alunos.</p>` : ""}
  </div>

  ${db.taxonomia.areas.map(area=>{
    const esps = db.taxonomia.especialidades.filter(e=>e.areaId===area.id);
    const totalArea = db.questoes.filter(q=>q.areaId===area.id).length;
    return `<div class="tree-area">
      <div class="tree-area-head" onclick="toggleTreeArea('tax-${area.id}')">
        <span>${escapeHtml(area.nome)} <span class="text-xs muted peso-400">— ${esps.length} especialidade(s), ${totalArea} questão(ões)</span></span>
        ${iconeSvg("chevron-d")}
      </div>
      <div class="tree-body" id="treebody-tax-${area.id}">
        ${podeEditar ? `<button class="btn btn-secondary btn-sm mb-2" onclick="criarEspecialidadeNaArea('${area.id}')">${iconeSvg("plus")} Nova especialidade nesta área</button>` : ""}
        ${esps.length ? esps.map(esp=>{
          const assuntos = db.taxonomia.assuntos.filter(a=>a.especialidadeId===esp.id);
          return `<div class="card-flat mb-2">
            <div class="flex justify-between items-center gap-2 quebra">
              <div><div class="peso-700">${escapeHtml(esp.nome)}</div>
                <div class="text-xs muted">${assuntos.length} assunto(s) · ${contarQuestoesEspecialidade(esp.id)} questão(ões)</div></div>
              ${podeEditar ? `<div class="flex gap-1 quebra">
                <button class="btn btn-ghost btn-sm" onclick="renomearEspecialidade('${esp.id}')">${iconeSvg("edit")} Renomear</button>
                <select class="select" style="padding:.3rem .5rem;max-width:200px" aria-label="Mover a especialidade ${escapeHtml(esp.nome)} para outra grande área" onchange="moverEspecialidade('${esp.id}', this.value)">
                  ${db.taxonomia.areas.map(a=>`<option value="${a.id}" ${a.id===esp.areaId?"selected":""}>mover p/ ${escapeHtml(a.nome)}</option>`).join("")}
                </select>
                <button class="btn btn-secondary btn-sm" onclick="criarAssuntoNaEspecialidade('${esp.id}')">${iconeSvg("plus")} Assunto</button>
                <button class="icon-btn" title="Excluir especialidade (só se estiver sem questões)" onclick="excluirEspecialidade('${esp.id}')">${iconeSvg("trash")}</button>
              </div>` : ""}
            </div>
            ${assuntos.length ? `<div class="table-wrap mt-2"><table><thead><tr><th>Assunto</th><th>Questões</th><th></th></tr></thead><tbody>
              ${assuntos.map(a=>{
                const n = contarQuestoesAssunto(a.id);
                return `<tr>
                  <td class="text-sm">${escapeHtml(a.nome)}</td>
                  <td class="text-sm">${n}</td>
                  <td>${podeEditar ? `<div class="flex gap-1 quebra">
                    <button class="btn btn-ghost btn-sm" onclick="renomearAssunto('${a.id}')">renomear</button>
                    <select class="select" style="padding:.25rem .4rem;max-width:190px" aria-label="Mover o assunto ${escapeHtml(a.nome)} para outra especialidade" onchange="moverAssunto('${a.id}', this.value)">
                      <option value="${esp.id}">mover para…</option>
                      ${db.taxonomia.especialidades.filter(e=>e.id!==esp.id).map(e=>`<option value="${e.id}">${escapeHtml(nomeArea(e.areaId))} › ${escapeHtml(e.nome)}</option>`).join("")}
                    </select>
                    <button class="btn btn-ghost btn-sm" onclick="abrirMesclarAssunto('${a.id}')">mesclar</button>
                    <button class="icon-btn" title="Excluir (só se estiver vazio)" onclick="excluirAssunto('${a.id}')">${iconeSvg("trash")}</button>
                  </div>` : `<span class="text-xs muted">somente leitura</span>`}</td>
                </tr>`;
              }).join("")}
            </tbody></table></div>` : '<p class="text-sm muted mt-1">Nenhum assunto cadastrado nesta especialidade.</p>'}
          </div>`;
        }).join("") : '<p class="text-sm muted">Nenhuma especialidade nesta área.</p>'}
      </div>
    </div>`;
  }).join("")}`;
}
