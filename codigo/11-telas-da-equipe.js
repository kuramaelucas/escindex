/* Esc — codigo/11-telas-da-equipe.js  (parte 11 de 13)
   Criar simulado, Material em PDF, questões difíceis, fila de dúvidas, cadastros e usuários, banco de questões e taxonomia.
   Os arquivos de codigo/ são carregados em ordem pelo index.html (lista
   ESC_ARQUIVOS.codigo) e dividem o mesmo espaço: uma função escrita num
   arquivo é usada nos outros sem import. */

/* ==========================================================================
   20. PROFESSOR — Criar Simulado
   ========================================================================== */
function renderCriarSimulado(){
  const ctx = state.filtroRota.criarSimulado || {pool:[], selecionadas:[]};
  return `
  <div class="page-header"><h2>Criar Simulado</h2><p>Monte uma prova a partir do banco de questões e recomende para um ou mais blocos (inclusive futuros).</p></div>
  <div class="card">
    <div class="card-title">1. Buscar questões candidatas</div>
    <div class="grid grid-3 mt-1">
      <div>
        <div class="flex justify-between items-center mb-1">
          <div class="label">Grande área</div>
          <div class="flex gap-1"><button class="link-btn text-xs" onclick="marcarTodasCaixas('csArea',true)">todas</button><button class="link-btn text-xs" onclick="marcarTodasCaixas('csArea',false)">limpar</button></div>
        </div>
        ${db.taxonomia.areas.map(a=>`<label class="checkbox-row mb-1"><input type="checkbox" class="csArea" value="${a.id}"> ${escapeHtml(a.nome)}</label>`).join("")}
      </div>
      <div>
        <div class="flex justify-between items-center mb-1">
          <div class="label">Ano</div>
          <div class="flex gap-1"><button class="link-btn text-xs" onclick="marcarUltimos5Caixas('csAno')">últimos 5 anos</button><button class="link-btn text-xs" onclick="marcarTodasCaixas('csAno',false)">limpar</button></div>
        </div>
        <div style="max-height:150px;overflow-y:auto">${[...new Set(db.questoes.map(q=>q.ano))].sort((a,b)=>b-a).map(ano=>`<label class="checkbox-row mb-1"><input type="checkbox" class="csAno" value="${ano}"> ${ano}</label>`).join("")}</div>
      </div>
      <div>
        <div class="label mb-1">Instituição</div>
        <select class="select" id="csBanca">
          <option value="">Todas as instituições</option>
          ${[...new Set(db.questoes.map(q=>q.banca))].sort().map(b=>`<option value="${escapeHtml(b)}">${escapeHtml(b)}</option>`).join("")}
        </select>
        <button class="btn btn-secondary mt-2" onclick="buscarCandidatasSimulado()">Buscar questões</button>
      </div>
    </div>
  </div>
  ${ctx.pool.length ? `
  <div class="card mt-2">
    <div class="card-title">2. Selecionar questões (${ctx.selecionadas.length} selecionada(s) de ${ctx.pool.length})</div>
    <div class="table-wrap mt-1"><table><thead><tr><th></th><th>Questão</th><th>Assunto</th><th>Instituição / Ano</th></tr></thead><tbody>
    ${ctx.pool.map(qid=>{ const q=getQuestao(qid); const marcado=ctx.selecionadas.includes(qid); return `<tr><td><input type="checkbox" onchange="toggleSelecaoSimulado('${qid}')" ${marcado?"checked":""}></td><td class="text-sm"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${qid}')">${escapeHtml(q.enunciado.slice(0,90))}…</span></td><td class="text-sm">${escapeHtml(nomeAssunto(q.assuntoId))}</td><td class="text-sm">${escapeHtml(q.banca)} · ${q.ano}</td></tr>`; }).join("")}
    </tbody></table></div>
  </div>
  <div class="card mt-2">
    <div class="card-title">3. Detalhes do simulado</div>
    <div class="field"><label class="label">Título</label><input class="input" id="csTitulo" placeholder="Ex.: Simulado de Revisão — Cardiologia"></div>
    <div class="field"><label class="label">Duração (minutos)</label><input class="input" type="number" id="csDuracao" value="${Math.max(10,ctx.selecionadas.length*2)}"></div>
    <div class="field"><label class="label">Recomendar para o(s) bloco(s) do calendário oficial</label>
      ${(() => { const grupoOf = getGrupoOficial(); const atualOf = blocoAtualDoGrupo(grupoOf); return blocosDoGrupo(grupoOf).slice().sort((a,b)=>a.ordem-b.ordem).map(b=>`<label class="checkbox-row mb-1"><input type="checkbox" class="csBloco" value="${b.id}"> ${escapeHtml(b.nome)} ${atualOf&&b.id===atualOf.id?'<span class="badge badge-accent">atual</span>':(atualOf&&b.ordem>atualOf.ordem?'<span class="badge badge-muted">futuro</span>':"")}</label>`).join(""); })()}
    </div>
    <button class="btn btn-primary" onclick="salvarSimuladoCriado()" ${!ctx.selecionadas.length?"disabled":""}>Criar simulado</button>
  </div>` : ""}
  `;
}
// helpers de seleção rápida usados nos filtros com caixas de marcação
function marcarTodasCaixas(classe, marcar){ document.querySelectorAll("."+classe).forEach(el=>{ el.checked = !!marcar; }); }
function marcarUltimos5Caixas(classe){
  const caixas = [...document.querySelectorAll("."+classe)];
  const anos = caixas.map(el=>parseInt(el.value)).sort((a,b)=>b-a).slice(0,5);
  caixas.forEach(el=>{ el.checked = anos.includes(parseInt(el.value)); });
  toast(anos.length ? "Selecionados os últimos 5 anos: "+anos.join(", ") : "Nenhum ano disponível.");
}
function buscarCandidatasSimulado(){
  const areaIds = [...document.querySelectorAll(".csArea:checked")].map(el=>el.value);
  const anos = [...document.querySelectorAll(".csAno:checked")].map(el=>parseInt(el.value));
  const campoBanca = document.getElementById("csBanca");
  const banca = campoBanca ? campoBanca.value : "";
  const pool = buscarQuestoesPorFiltro(usuarioAtual().id, {areaIds, anos, bancas: banca?[banca]:[], incluirInativas:true}).map(q=>q.id);
  if(!state.filtroRota) state.filtroRota = {};
  state.filtroRota.criarSimulado = {pool, selecionadas:[]};
  render();
}
function toggleSelecaoSimulado(qid){
  const ctx = state.filtroRota.criarSimulado;
  const idx = ctx.selecionadas.indexOf(qid);
  if(idx>=0) ctx.selecionadas.splice(idx,1); else ctx.selecionadas.push(qid);
  render();
}
function salvarSimuladoCriado(){
  const ctx = state.filtroRota.criarSimulado;
  const titulo = document.getElementById("csTitulo").value.trim() || "Simulado sem título";
  const duracao = parseInt(document.getElementById("csDuracao").value) || Math.max(10,ctx.selecionadas.length*2);
  const blocos = [...document.querySelectorAll(".csBloco:checked")].map(el=>el.value);
  db.simulados.push({id:uid("sim"), titulo, questoes:ctx.selecionadas.slice(), duracaoMin:duracao, recomendadoParaBlocos:blocos, tipo:"simulado_professor", criadoPor:usuarioAtual().id, criadoEm:hojeISO()});
  saveState();
  state.filtroRota.criarSimulado = null;
  toast("Simulado criado.");
  navigate("simulados");
}

/* ==========================================================================
   20-B. MATERIAL EM PDF (professores, coordenação e moderadores)
   ==========================================================================
   Professor precisa de papel: prova impressa para aplicar em sala, lista de
   exercícios para entregar, baralho de flashcards para recortar, relatório
   de desempenho para levar à reunião de coordenação.

   Como a plataforma não pode depender de biblioteca externa, o PDF é gerado
   pelo próprio navegador: montamos o material dentro da div #areaImpressao
   (que fica invisível o tempo todo) e chamamos window.print(). Em todos os
   sistemas atuais existe a opção "Salvar como PDF" na janela de impressão —
   e o resultado é um PDF de texto real, pesquisável, não uma foto da tela.

   As regras de conteúdo valem aqui também: o material sai com a origem de
   cada questão e com as referências, e nada é copiado de terceiros. */
function ctxMaterialPDF(){
  if(!state.filtroRota.pdf) state.filtroRota.pdf = {
    tipo:"prova", fonte:"filtros", simuladoId:"", areaId:"", especialidadeId:"", banca:"", ano:"",
    quantidade:20, comGabarito:true, comExplicacao:true, comCartaoResposta:true, comReferencias:true,
    titulo:"", subtitulo:"",
  };
  return state.filtroRota.pdf;
}
function atualizarCampoPDF(campo, valor, ehCheck){
  const ctx = ctxMaterialPDF();
  ctx[campo] = ehCheck ? !!valor : valor;
  if(campo==="areaId") ctx.especialidadeId = "";
  render();
}
/* Conjunto de questões que vai para o papel, conforme a fonte escolhida. */
function questoesDoMaterialPDF(){
  const ctx = ctxMaterialPDF();
  if(ctx.fonte==="simulado"){
    const sim = db.simulados.find(s=>s.id===ctx.simuladoId);
    if(!sim) return [];
    return (sim.questaoIds||[]).map(getQuestao).filter(Boolean);
  }
  let pool = questoesAtivas();
  if(ctx.areaId) pool = pool.filter(q=>q.areaId===ctx.areaId);
  if(ctx.especialidadeId) pool = pool.filter(q=>q.especialidadeId===ctx.especialidadeId);
  if(ctx.banca) pool = pool.filter(q=>q.banca===ctx.banca);
  if(ctx.ano) pool = pool.filter(q=>String(q.ano)===String(ctx.ano));
  return embaralhar(pool).slice(0, Math.max(1, parseInt(ctx.quantidade)||20));
}
function flashcardsDoMaterialPDF(){
  const ctx = ctxMaterialPDF();
  // só material da equipe: o caderno pessoal de cada aluno não vira
  // impresso distribuído para a turma
  let pool = flashcardsDaEquipe();
  if(ctx.especialidadeId) pool = pool.filter(c=>{ const a = getAssunto(c.assuntoId); return a && a.especialidadeId===ctx.especialidadeId; });
  else if(ctx.areaId) pool = pool.filter(c=>{ const a = getAssunto(c.assuntoId); const e = a?getEspecialidade(a.especialidadeId):null; return e && e.areaId===ctx.areaId; });
  return pool.slice(0, Math.max(1, parseInt(ctx.quantidade)||20));
}
function renderMaterialPDF(){
  const ctx = ctxMaterialPDF();
  const ehQuestoes = ctx.tipo==="prova" || ctx.tipo==="lista";
  const total = ctx.tipo==="flashcards" ? flashcardsDoMaterialPDF().length
              : ctx.tipo==="desempenho" ? db.usuarios.filter(x=>x.papel==="aluno" && x.status==="aprovado").length
              : questoesDoMaterialPDF().length;
  const rotuloTotal = ctx.tipo==="flashcards" ? "cartão(ões)" : ctx.tipo==="desempenho" ? "aluno(s)" : "questão(ões)";
  return `
  <div class="page-header"><h2>Material em PDF</h2><p>Gere o arquivo pelo próprio navegador: ao clicar em "Gerar PDF", escolha <strong>Salvar como PDF</strong> como destino na janela de impressão. O resultado é um PDF de texto, pesquisável e leve.</p></div>

  <div class="card mb-2">
    <div class="card-title">1. O que você quer imprimir</div>
    <div class="grid grid-2">
      <div class="field"><label class="label">Tipo de material</label>
        <select class="select" onchange="atualizarCampoPDF('tipo', this.value)">
          <option value="prova" ${ctx.tipo==="prova"?"selected":""}>Prova para aplicar (sem gabarito no corpo)</option>
          <option value="lista" ${ctx.tipo==="lista"?"selected":""}>Lista de exercícios comentada (gabarito e explicação junto)</option>
          <option value="flashcards" ${ctx.tipo==="flashcards"?"selected":""}>Baralho de flashcards para recortar</option>
          <option value="desempenho" ${ctx.tipo==="desempenho"?"selected":""}>Relatório de desempenho da turma</option>
        </select>
      </div>
      <div class="field"><label class="label">Título que aparece no cabeçalho</label>
        <input class="input" value="${escapeHtml(ctx.titulo)}" placeholder="${ctx.tipo==="desempenho"?"Ex.: Desempenho — 1º semestre":"Ex.: Simulado de Clínica Médica — 2ª aplicação"}" onchange="atualizarCampoPDF('titulo', this.value)">
      </div>
    </div>
    <div class="field"><label class="label">Linha de apoio (opcional)</label>
      <input class="input" value="${escapeHtml(ctx.subtitulo)}" placeholder="Ex.: Turma 6º ano · duração 2h · não é permitido consulta" onchange="atualizarCampoPDF('subtitulo', this.value)">
    </div>
  </div>

  ${ehQuestoes ? `<div class="card mb-2">
    <div class="card-title">2. De onde vêm as questões</div>
    <div class="field"><label class="label">Fonte</label>
      <select class="select" onchange="atualizarCampoPDF('fonte', this.value)">
        <option value="filtros" ${ctx.fonte==="filtros"?"selected":""}>Montar a partir de filtros do banco</option>
        <option value="simulado" ${ctx.fonte==="simulado"?"selected":""}>Usar um simulado ou prova já existente</option>
      </select>
    </div>
    ${ctx.fonte==="simulado" ? `<div class="field"><label class="label">Simulado / prova</label>
      <select class="select" onchange="atualizarCampoPDF('simuladoId', this.value)">
        <option value="">Selecione…</option>
        ${db.simulados.map(s=>`<option value="${s.id}" ${ctx.simuladoId===s.id?"selected":""}>${escapeHtml(s.nome)} (${(s.questaoIds||[]).length} questões)</option>`).join("")}
      </select>
      <div class="hint mt-1">A ordem das questões é preservada, igual à do simulado na tela.</div>
    </div>` : `<div class="grid grid-4">
      <div class="field"><label class="label">Grande área</label>
        <select class="select" onchange="atualizarCampoPDF('areaId', this.value)">
          <option value="">Todas</option>
          ${db.taxonomia.areas.map(a=>`<option value="${a.id}" ${ctx.areaId===a.id?"selected":""}>${escapeHtml(a.nome)}</option>`).join("")}
        </select></div>
      <div class="field"><label class="label">Especialidade</label>
        <select class="select" onchange="atualizarCampoPDF('especialidadeId', this.value)">
          <option value="">Todas</option>
          ${db.taxonomia.especialidades.filter(e=>!ctx.areaId || e.areaId===ctx.areaId).map(e=>`<option value="${e.id}" ${ctx.especialidadeId===e.id?"selected":""}>${escapeHtml(e.nome)}</option>`).join("")}
        </select></div>
      <div class="field"><label class="label">Instituição</label>
        <select class="select" onchange="atualizarCampoPDF('banca', this.value)">
          <option value="">Todas</option>
          ${[...new Set(db.questoes.map(q=>q.banca))].sort().map(b=>`<option value="${escapeHtml(b)}" ${ctx.banca===b?"selected":""}>${escapeHtml(b)}</option>`).join("")}
        </select></div>
      <div class="field"><label class="label">Ano</label>
        <select class="select" onchange="atualizarCampoPDF('ano', this.value)">
          <option value="">Todos</option>
          ${[...new Set(db.questoes.map(q=>q.ano))].sort((a,b)=>b-a).map(a=>`<option value="${a}" ${String(ctx.ano)===String(a)?"selected":""}>${a}</option>`).join("")}
        </select></div>
    </div>
    <div class="field" style="max-width:220px"><label class="label">Quantidade de questões</label>
      <input class="input" type="number" min="1" max="120" value="${ctx.quantidade}" onchange="atualizarCampoPDF('quantidade', this.value)">
    </div>`}
  </div>

  <div class="card mb-2">
    <div class="card-title">3. O que entra no arquivo</div>
    ${ctx.tipo==="prova" ? `
      <label class="checkbox-row mb-1"><input type="checkbox" ${ctx.comCartaoResposta?"checked":""} onchange="atualizarCampoPDF('comCartaoResposta', this.checked, true)"> Incluir cartão-resposta em folha separada</label>
      <label class="checkbox-row mb-1"><input type="checkbox" ${ctx.comGabarito?"checked":""} onchange="atualizarCampoPDF('comGabarito', this.checked, true)"> Incluir folha de gabarito no fim (para o professor)</label>
      <p class="text-xs muted mt-1">Na prova de aplicar, gabarito e explicação nunca aparecem junto da questão: vão sempre em páginas separadas, que você pode descartar antes de entregar.</p>`
    : `
      <label class="checkbox-row mb-1"><input type="checkbox" ${ctx.comExplicacao?"checked":""} onchange="atualizarCampoPDF('comExplicacao', this.checked, true)"> Incluir a explicação do gabarito</label>
      <label class="checkbox-row mb-1"><input type="checkbox" ${ctx.comReferencias?"checked":""} onchange="atualizarCampoPDF('comReferencias', this.checked, true)"> Incluir as referências de cada questão</label>`}
  </div>` : ""}

  ${ctx.tipo==="flashcards" ? `<div class="card mb-2">
    <div class="card-title">2. Recorte do baralho</div>
    <div class="grid grid-3">
      <div class="field"><label class="label">Grande área</label>
        <select class="select" onchange="atualizarCampoPDF('areaId', this.value)">
          <option value="">Todas</option>
          ${db.taxonomia.areas.map(a=>`<option value="${a.id}" ${ctx.areaId===a.id?"selected":""}>${escapeHtml(a.nome)}</option>`).join("")}
        </select></div>
      <div class="field"><label class="label">Especialidade</label>
        <select class="select" onchange="atualizarCampoPDF('especialidadeId', this.value)">
          <option value="">Todas</option>
          ${db.taxonomia.especialidades.filter(e=>!ctx.areaId || e.areaId===ctx.areaId).map(e=>`<option value="${e.id}" ${ctx.especialidadeId===e.id?"selected":""}>${escapeHtml(e.nome)}</option>`).join("")}
        </select></div>
      <div class="field"><label class="label">Quantidade</label>
        <input class="input" type="number" min="1" max="200" value="${ctx.quantidade}" onchange="atualizarCampoPDF('quantidade', this.value)"></div>
    </div>
    <p class="text-xs muted">Cada cartão sai com a pergunta e a resposta separadas por uma linha tracejada, para dobrar ou recortar.</p>
  </div>` : ""}

  ${ctx.tipo==="desempenho" ? `<div class="card mb-2">
    <div class="card-title">2. Sobre o relatório</div>
    <p class="text-sm muted">Sai uma linha por aluno aprovado, com total de questões respondidas, taxa de acerto, dias estudados e o assunto de pior desempenho. É o material que a coordenação leva para a reunião — e o que mostra quem parou de estudar antes que seja tarde.</p>
    <p class="text-xs muted mt-1">Enquanto os dados vivem só neste navegador, o relatório cobre apenas os alunos que usaram este computador.</p>
  </div>` : ""}

  <div class="card">
    <div class="flex justify-between items-center gap-2" style="flex-wrap:wrap">
      <div><div class="card-title">Pronto para gerar</div>
      <div class="text-sm muted">${total} ${rotuloTotal} ${total?"no material":"— ajuste os filtros acima"}.</div></div>
      <button class="btn btn-primary" onclick="gerarMaterialPDF()" ${total?"":"disabled"}>${iconeSvg("printer")} Gerar PDF</button>
    </div>
  </div>`;
}
/* Monta o HTML de impressão e entrega para o navegador. */
function gerarMaterialPDF(){
  const ctx = ctxMaterialPDF();
  let corpo = "";
  if(ctx.tipo==="prova") corpo = htmlProvaPDF();
  else if(ctx.tipo==="lista") corpo = htmlListaComentadaPDF();
  else if(ctx.tipo==="flashcards") corpo = htmlFlashcardsPDF();
  else corpo = htmlDesempenhoPDF();
  if(!corpo){ toast("Não há conteúdo para imprimir com essas opções.", "err"); return; }
  imprimir(corpo);
}
function cabecalhoPDF(tituloPadrao){
  const ctx = ctxMaterialPDF();
  const titulo = ctx.titulo || tituloPadrao;
  const sub = ctx.subtitulo;
  return `<div class="pdf-cabecalho">
    <h1>${escapeHtml(titulo)}</h1>
    <div class="pdf-sub">${CONFIG.nomePlataforma}${sub?" · "+escapeHtml(sub):""} · gerado em ${formatDataBR(hojeISO())}</div>
  </div>`;
}
function htmlProvaPDF(){
  const ctx = ctxMaterialPDF();
  const questoes = questoesDoMaterialPDF();
  if(!questoes.length) return "";
  let html = cabecalhoPDF("Prova");
  html += `<div style="font-size:9.5pt;margin-bottom:1rem">Nome: ______________________________________________  Turma: ____________  Data: ____/____/______</div>`;
  questoes.forEach((q,i)=>{
    html += `<div class="pdf-questao">
      <span class="pdf-num">${i+1}.</span> ${escapeHtml(q.enunciado)}
      ${q.alternativas.map(a=>`<div class="pdf-alt">${escapeHtml(a.id)}) ${escapeHtml(a.texto)}</div>`).join("")}
      <div class="pdf-meta">${escapeHtml(q.banca)} · ${q.ano} · ${escapeHtml(nomeAssunto(q.assuntoId))}</div>
    </div>`;
  });
  if(ctx.comCartaoResposta){
    html += `<div class="pdf-gabarito"><h2 style="font-size:13pt">Cartão-resposta</h2>
      <div style="font-size:9.5pt;margin-bottom:.8rem">Nome: ______________________________________________  Turma: ____________</div>
      <table class="pdf-tabela"><tbody>
      ${questoes.map((q,i)=>`<tr><td style="width:2.5rem">${i+1}</td>${["A","B","C","D","E"].map(l=>`<td style="width:2.2rem;text-align:center">( ) ${l}</td>`).join("")}</tr>`).join("")}
      </tbody></table></div>`;
  }
  if(ctx.comGabarito){
    html += `<div class="pdf-gabarito"><h2 style="font-size:13pt">Gabarito (uso do professor)</h2>
      <table class="pdf-tabela"><thead><tr><th>Nº</th><th>Gabarito</th><th>Assunto</th><th>Origem</th></tr></thead><tbody>
      ${questoes.map((q,i)=>`<tr><td>${i+1}</td><td><strong>${escapeHtml(q.gabarito)}</strong></td><td>${escapeHtml(nomeAssunto(q.assuntoId))}</td><td>${escapeHtml(q.banca)} · ${q.ano}</td></tr>`).join("")}
      </tbody></table></div>`;
  }
  return html;
}
function htmlListaComentadaPDF(){
  const ctx = ctxMaterialPDF();
  const questoes = questoesDoMaterialPDF();
  if(!questoes.length) return "";
  let html = cabecalhoPDF("Lista de exercícios comentada");
  questoes.forEach((q,i)=>{
    html += `<div class="pdf-questao">
      <span class="pdf-num">${i+1}.</span> ${escapeHtml(q.enunciado)}
      ${q.alternativas.map(a=>`<div class="pdf-alt">${a.id===q.gabarito?"<strong>":""}${escapeHtml(a.id)}) ${escapeHtml(a.texto)}${a.id===q.gabarito?"</strong>":""}</div>`).join("")}
      <div style="margin-top:.35rem"><strong>Gabarito: ${escapeHtml(q.gabarito)}.</strong>${ctx.comExplicacao&&q.explicacaoGeral?" "+escapeHtml(q.explicacaoGeral):""}</div>
      ${ctx.comReferencias && q.referencias ? `<div class="pdf-meta">Referências: ${escapeHtml(q.referencias)}</div>` : ""}
      <div class="pdf-meta">${escapeHtml(q.banca)} · ${q.ano} · ${escapeHtml(nomeAssunto(q.assuntoId))}</div>
    </div>`;
  });
  return html;
}
function htmlFlashcardsPDF(){
  const cartoes = flashcardsDoMaterialPDF();
  if(!cartoes.length) return "";
  let html = cabecalhoPDF("Baralho de flashcards");
  html += `<p style="font-size:9.5pt;margin-bottom:.9rem">Dobre na linha tracejada: a pergunta fica de um lado e a resposta do outro.</p>`;
  cartoes.forEach(c=>{
    html += `<div class="pdf-flash">
      ${c.imagemUrl ? `<img src="${escapeHtml(c.imagemUrl)}" style="max-width:100%;max-height:140px;display:block;margin-bottom:.3rem" alt="">${c.imagemLegenda?`<div style="font-size:8pt;color:#555;margin-bottom:.3rem">${escapeHtml(c.imagemLegenda)}</div>`:""}` : ""}
      <div><strong>${escapeHtml(c.frente)}</strong></div>
      <div class="pdf-corte"></div>
      <div>${escapeHtml(c.verso)}</div>
      <div style="font-size:8.5pt;color:#444;margin-top:.3rem">${escapeHtml(nomeAssunto(c.assuntoId))}</div>
    </div>`;
  });
  return html;
}
function htmlDesempenhoPDF(){
  const alunos = db.usuarios.filter(x=>x.papel==="aluno" && x.status==="aprovado");
  if(!alunos.length) return "";
  let html = cabecalhoPDF("Relatório de desempenho da turma");
  const linhas = alunos.map(a=>{
    const respostas = db.respostas.filter(r=>r.usuarioId===a.id);
    const acertos = respostas.filter(r=>r.correta).length;
    const dias = new Set(respostas.map(r=>r.data)).size;
    const piores = sugestoesDeMelhoria(a.id, 1);
    return {
      nome: a.nome,
      grupo: getGrupoDoUsuario(a).nome,
      ano: a.anoFaculdade || "—",
      total: respostas.length,
      taxa: respostas.length ? pct(acertos, respostas.length)+"%" : "—",
      dias,
      pior: piores.length ? nomeAssunto(piores[0].assuntoId)+" ("+piores[0].taxa+"%)" : "—",
    };
  }).sort((a,b)=>b.total-a.total);
  html += `<table class="pdf-tabela"><thead><tr><th>Aluno</th><th>Turma</th><th>Ano</th><th>Questões</th><th>Acerto</th><th>Dias com estudo</th><th>Assunto mais fraco</th></tr></thead><tbody>
    ${linhas.map(l=>`<tr><td>${escapeHtml(l.nome)}</td><td>${escapeHtml(l.grupo)}</td><td>${escapeHtml(l.ano)}</td><td>${l.total}</td><td>${l.taxa}</td><td>${l.dias}</td><td>${escapeHtml(l.pior)}</td></tr>`).join("")}
  </tbody></table>`;
  html += `<p style="font-size:9pt;margin-top:.9rem;color:#333">Leitura sugerida: quem tem muitas questões e acerto baixo precisa de conteúdo; quem tem acerto alto e poucos dias com estudo precisa de constância; quem tem poucas questões e poucos dias parou — e é com esse que a conversa deve começar.</p>`;
  return html;
}
/* Preenche a área de impressão, chama o navegador e limpa depois. */
function imprimir(html){
  const area = document.getElementById("areaImpressao");
  area.innerHTML = html;
  const limpar = function(){ area.innerHTML = ""; window.removeEventListener("afterprint", limpar); };
  window.addEventListener("afterprint", limpar);
  setTimeout(function(){
    window.print();
    // alguns navegadores não disparam afterprint; limpamos por segurança
    setTimeout(limpar, 3000);
  }, 60);
}

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
    <div class="tab ${aba==="sugeridas"?"active":""}" onclick="mudarAbaQualidade('sugeridas')">Sugeridas por Alunos (${sugeridas.length})</div>
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
  abrirModal(`<div class="modal-header"><h3>Excluir ${excluir.length} cópia(s)</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
    <p class="text-sm">Será mantida a cópia com mais respostas registradas (${(manter.estatisticas||{}).respostas||0} resposta(s), ${escapeHtml(manter.banca)} ${manter.ano}). As demais serão excluídas definitivamente, junto com as estatísticas delas.</p>
    <div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="confirmarManterApenasUma('${manter.id}','${excluir.map(q=>q.id).join(",")}')">Excluir as cópias</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
}
function confirmarManterApenasUma(manterId, idsExcluir){
  const ids = (idsExcluir||"").split(",").filter(Boolean);
  db.questoes = db.questoes.filter(q=>!ids.includes(q.id));
  saveState(); fecharModal();
  toast(ids.length+" cópia(s) excluída(s).");
  render();
}
function renderListaSugeridas(lista){
  const pag = paginar(lista, "qualidade-sugeridas", {porPagina:10});
  return `<p class="text-sm muted mb-2">Questões que alunos sugeriram para o banco geral (não restritas a nenhum grupo). Só ficam disponíveis pra todo mundo depois de aprovadas — e a plataforma guarda quem enviou e quem aprovou.</p>
  ${lista.length ? pag.itens.map(q=>{
    const autor = getUsuario(q.criadoPor);
    return `<div class="card mb-2">
      <div class="qcard-meta"><span class="badge badge-muted">${escapeHtml(nomeAssunto(q.assuntoId))}</span><span class="badge badge-muted">${q.ano}</span></div>
      <div class="text-sm mt-1" style="font-weight:600"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${q.id}')">${escapeHtml(q.enunciado.slice(0,180))}…</span></div>
      <div class="text-xs muted mt-1">Enviada por ${escapeHtml(autor?autor.nome:"—")} em ${formatDataBR(q.criadoEm)}</div>
      <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
        ${botaoVerNaIntegra(q.id, "Ver questão completa")}
        <button class="btn btn-secondary btn-sm" onclick="abrirFormularioQuestao('${q.id}')">${iconeSvg("edit")} Ver/editar antes de aprovar</button>
        ${podeAprovarQuestoes() ? `<button class="btn btn-primary btn-sm" onclick="aprovarQuestaoSugerida('${q.id}')">Aprovar para o banco geral</button>
        <button class="btn btn-danger btn-sm" onclick="confirmarExcluirQuestao('${q.id}')">Rejeitar</button>` : '<span class="text-xs muted">A aprovação final para o banco geral é feita por um professor ou administrador — mas suas correções de formatação já ficam salvas.</span>'}
      </div>
    </div>`;
  }).join("") : '<div class="empty-state">Nenhuma sugestão pendente no momento.</div>'}
  ${controlesPaginacao(pag, "sugestão(ões)")}`;
}
function aprovarQuestaoSugerida(qid){
  const q = getQuestao(qid);
  q.status = "ativa";
  q.aprovadoPor = usuarioAtual().id;
  saveState();
  toast("Questão aprovada e adicionada ao banco geral.");
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
  abrirModal(`<div class="modal-header"><h3>Acrescentar resposta oficial</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
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
   24. ADMIN — Aprovar Cadastros / Gerenciar Usuários
   ========================================================================== */
function renderAprovarCadastros(){
  const pendentes = db.usuarios.filter(u=>u.status==="pendente");
  return `
  <div class="page-header"><h2>Aprovar Cadastros</h2><p>Solicitações de acesso aguardando aprovação.</p></div>
  ${renderCadastrosPendentesDaNuvem()}
  ${nuvemConectado() && pendentes.length ? '<div class="text-sm muted mb-1">Solicitações antigas, feitas só neste navegador:</div>' : ""}
  ${pendentes.length ? `<div class="table-wrap"><table><thead><tr><th>Nome</th><th>E-mail</th><th>Matrícula</th><th>Acesso solicitado</th><th>Data</th><th></th></tr></thead><tbody>
    ${pendentes.map(u=>`<tr><td>${escapeHtml(u.nome)}</td><td>${escapeHtml(u.email)}</td><td>${escapeHtml(u.matricula)}</td><td class="text-sm">${badgePapel(u.papel)}${u.areasAtuacao&&u.areasAtuacao.length?"<br><span class=\"text-xs muted\">"+u.areasAtuacao.map(nomeArea).join(", ")+"</span>":""}${u.assuntosAjuda&&u.assuntosAjuda.length?"<br><span class=\"text-xs muted\">ajuda com: "+u.assuntosAjuda.map(nomeEspecialidade).join(", ")+"</span>":""}</td><td>${formatDataBR(u.criadoEm)}</td><td class="flex gap-1"><button class="btn btn-primary btn-sm" onclick="aprovarUsuario('${u.id}')">Aprovar</button><button class="btn btn-danger btn-sm" onclick="rejeitarUsuario('${u.id}')">Recusar</button></td></tr>`).join("")}
  </tbody></table></div>` : '<div class="empty-state">Nenhuma solicitação pendente.</div>'}
  `;
}
function badgeStatusUsuario(status){
  const map = {aprovado:["badge-accent","Aprovado"], pendente:["badge-amber","Pendente"], rejeitado:["badge-danger","Recusado"], inativo:["badge-muted","Inativo"]};
  const [cls,label] = map[status] || ["badge-muted", status];
  return `<span class="badge ${cls}">${label}</span>`;
}
function renderUsuarios(){
  const eu = usuarioAtual();
  const souMaster = podeAdmin("usuarios", eu);
  return `
  <div class="page-header"><h2>Usuários</h2><p>Quem tem acesso à plataforma. Com a nuvem ligada, a turma de verdade está na nuvem — as contas deste navegador são só as de teste e as de antes da nuvem.</p></div>
  <div class="card mb-2">
    <div class="card-title">Níveis de administrador</div>
    <p class="text-sm muted mb-2">Cada nível enxerga apenas as áreas correspondentes no menu. Só um administrador máster pode alterar papéis e níveis.</p>
    ${CONFIG.niveisAdmin.map(n=>`<div class="card-flat mb-1"><div style="font-weight:600">${escapeHtml(n.nome)}</div><div class="text-sm muted mt-1">${escapeHtml(n.descricao)}</div></div>`).join("")}
  </div>
  ${renderUsuariosDaNuvem(souMaster)}
  ${renderUsuariosLocais(souMaster, eu)}`;
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
    <p class="text-sm muted">${porStatus.aprovado.length} aprovado(s) · ${porStatus.pendente.length} pendente(s) · ${porStatus.inativo.length} inativo(s) · ${porStatus.rejeitado.length} recusado(s). <strong>Quem você aprova em "Aprovar Cadastros" aparece aqui</strong> — aquela tela mostra só quem ainda está pendente.</p>
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
   confirmar, exatamente o que vai junto e o que fica. */
function dadosDoUsuario(id){
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
  const d = dadosDoUsuario(id);
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
    <div class="modal-header"><h3>Excluir o cadastro de ${escapeHtml(nome)}?</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
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
function renderFeedbackUsuarios(){
  const lista = db.feedbacks.slice().sort((a,b)=>b.data.localeCompare(a.data));
  const rotulos = {comentario:["badge-muted","Comentário"], sugestao:["badge-accent","Sugestão"], reclamacao:["badge-danger","Reclamação"]};
  return `
  <div class="page-header"><h2>Feedback dos Usuários</h2><p>Comentários, sugestões e reclamações enviados por qualquer pessoa da plataforma.</p></div>
  ${lista.length ? lista.map(f=>{
    const autor = getUsuario(f.usuarioId);
    const [cls,label] = rotulos[f.tipo]||rotulos.comentario;
    return `<div class="card mb-1" style="${f.lido?"opacity:.6":""}">
      <div class="flex justify-between items-center"><span class="badge ${cls}">${label}</span><span class="text-xs muted">${formatDataBR(f.data)}</span></div>
      <div class="text-sm mt-1">${escapeHtml(f.texto)}</div>
      <div class="flex justify-between items-center mt-1">
        <span class="text-xs muted">${escapeHtml(autor?autor.nome:"—")} (${badgePapel(f.papel)})</span>
        ${!f.lido ? `<button class="link-btn" onclick="marcarFeedbackLido('${f.id}')">marcar como lido</button>` : '<span class="text-xs muted">lido</span>'}
      </div>
    </div>`;
  }).join("") : '<div class="empty-state">Nenhum feedback recebido ainda.</div>'}`;
}
function marcarFeedbackLido(id){ const f=db.feedbacks.find(x=>x.id===id); if(f) f.lido=true; saveState(); render(); }

/* ==========================================================================
   25. ADMIN/PROFESSOR — Banco de Questões (CRUD completo)
   ========================================================================== */
function badgeStatusQuestao(status){
  const map = {ativa:["badge-accent","Ativa"], pendente:["badge-amber","Pendente"], anulada:["badge-muted","Anulada"], desatualizada:["badge-amber","Desatualizada"]};
  const [cls,label] = map[status] || ["badge-muted", status];
  return `<span class="badge ${cls}">${label}</span>`;
}
function filtrosBanco(){
  if(!state.filtroRota.banco) state.filtroRota.banco = {busca:"", banca:"", ano:"", areaId:"", status:"", ultimos5:false};
  return state.filtroRota.banco;
}
function mudarFiltroBanco(campo, valor){
  const f = filtrosBanco();
  if(campo==="ultimos5"){ f.ultimos5 = !!valor; if(f.ultimos5) f.ano = ""; }
  else f[campo] = valor;
  render();
}
function limparFiltrosBanco(){ state.filtroRota.banco = {busca:"", banca:"", ano:"", areaId:"", status:"", ultimos5:false}; render(); }
function buscarNoBanco(){ filtrosBanco().busca = document.getElementById("buscaBancoInput").value; render(); }
function renderBancoQuestoes(){
  const f = filtrosBanco();
  const bancas = [...new Set(db.questoes.map(q=>q.banca))].sort();
  const anosDisponiveis = [...new Set(db.questoes.map(q=>q.ano))].sort((a,b)=>b-a);
  const anoMaisRecente = anosDisponiveis.length ? anosDisponiveis[0] : new Date().getFullYear();
  const termo = (f.busca||"").toLowerCase();
  let lista = db.questoes.slice();
  if(termo) lista = lista.filter(q=>q.enunciado.toLowerCase().includes(termo) || (q.alternativas||[]).some(a=>a.texto.toLowerCase().includes(termo)));
  if(f.banca) lista = lista.filter(q=>q.banca===f.banca);
  if(f.ano) lista = lista.filter(q=>q.ano===parseInt(f.ano));
  if(f.ultimos5) lista = lista.filter(q=>q.ano > anoMaisRecente-5);
  if(f.areaId) lista = lista.filter(q=>q.areaId===f.areaId);
  if(f.status) lista = lista.filter(q=>q.status===f.status);
  lista.sort((a,b)=> b.ano-a.ano || (a.banca||"").localeCompare(b.banca||""));
  return `
  <div class="page-header"><h2>Banco de Questões</h2><p>${db.questoes.length} questão(ões) no total (${questoesAtivas(true).length} ativas, excluindo anuladas/desatualizadas das sessões e estatísticas; inclui questões restritas a grupos de alunos).</p></div>
  <div class="card mb-2">
    <div class="grid grid-4">
      <div class="field" style="margin-bottom:0"><label class="label">Instituição</label>
        <select class="select" onchange="mudarFiltroBanco('banca', this.value)">
          <option value="">Todas</option>
          ${bancas.map(b=>`<option value="${escapeHtml(b)}" ${f.banca===b?"selected":""}>${escapeHtml(b)}</option>`).join("")}
        </select>
      </div>
      <div class="field" style="margin-bottom:0"><label class="label">Ano</label>
        <select class="select" onchange="mudarFiltroBanco('ano', this.value)" ${f.ultimos5?"disabled":""}>
          <option value="">Todos</option>
          ${anosDisponiveis.map(a=>`<option value="${a}" ${String(f.ano)===String(a)?"selected":""}>${a}</option>`).join("")}
        </select>
      </div>
      <div class="field" style="margin-bottom:0"><label class="label">Grande área</label>
        <select class="select" onchange="mudarFiltroBanco('areaId', this.value)">
          <option value="">Todas</option>
          ${db.taxonomia.areas.map(a=>`<option value="${a.id}" ${f.areaId===a.id?"selected":""}>${escapeHtml(a.nome)}</option>`).join("")}
        </select>
      </div>
      <div class="field" style="margin-bottom:0"><label class="label">Status</label>
        <select class="select" onchange="mudarFiltroBanco('status', this.value)">
          <option value="">Todos</option>
          <option value="ativa" ${f.status==="ativa"?"selected":""}>Ativa</option>
          <option value="pendente" ${f.status==="pendente"?"selected":""}>Pendente de aprovação</option>
          <option value="anulada" ${f.status==="anulada"?"selected":""}>Anulada</option>
          <option value="desatualizada" ${f.status==="desatualizada"?"selected":""}>Desatualizada</option>
        </select>
      </div>
    </div>
    <div class="flex gap-1 items-center mt-2" style="flex-wrap:wrap">
      <input class="input" id="buscaBancoInput" style="max-width:280px" placeholder="Buscar por texto do enunciado ou alternativa..." value="${escapeHtml(f.busca||"")}" onkeydown="if(event.key==='Enter') buscarNoBanco()">
      <button class="btn btn-secondary btn-sm" onclick="buscarNoBanco()">Buscar</button>
      <label class="checkbox-row"><input type="checkbox" ${f.ultimos5?"checked":""} onchange="mudarFiltroBanco('ultimos5', this.checked)"> Últimos 5 anos</label>
      <button class="link-btn text-xs" onclick="limparFiltrosBanco()">limpar filtros</button>
    </div>
  </div>
  <div class="flex gap-1 items-center mb-2" style="flex-wrap:wrap">
    <button class="btn btn-primary btn-sm" onclick="abrirFormularioQuestao(null)">${iconeSvg("plus")} Nova questão manual</button>
    <button class="btn btn-secondary btn-sm" onclick="navigate('importar-questoes')">${iconeSvg("upload")} Importar em lote</button>
    <span class="text-sm muted">${lista.length} resultado(s)</span>
  </div>
  ${renderListaBancoQuestoesHtml(lista, paginar(lista, "banco", {assinatura: JSON.stringify(f)}))}`;
}
function renderListaBancoQuestoesHtml(lista, paginaInfo){
  if(!lista.length) return '<div class="empty-state">Nenhuma questão encontrada com esses filtros.</div>';
  return `<div class="table-wrap"><table><thead><tr><th>Questão</th><th>Instituição / Ano</th><th>Assunto</th><th>Status</th><th></th></tr></thead><tbody>
    ${(paginaInfo ? paginaInfo.itens : lista).map(q=>`<tr>
      <td class="text-sm"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${q.id}')">${escapeHtml(q.enunciado.slice(0,90))}…</span> ${q.grupoId?`<span class="badge badge-muted" title="Restrita ao grupo">${escapeHtml(getGrupo(q.grupoId)?getGrupo(q.grupoId).nome:"grupo")}</span>`:""}</td>
      <td class="text-sm nowrap">${escapeHtml(q.banca)}<br><span class="muted">${q.ano}</span></td>
      <td class="text-sm">${escapeHtml(nomeAssunto(q.assuntoId))}</td>
      <td>${badgeStatusQuestao(q.status)}</td>
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
  abrirModal(`
    <div class="modal-header"><h3>${q?"Editar questão":"Nova questão"}</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
    <div class="field"><label class="label">Enunciado</label><textarea class="textarea" id="fqEnunciado" style="min-height:100px">${escapeHtml(q?q.enunciado:"")}</textarea></div>
    <div class="grid grid-2">${["A","B","C","D","E"].map(letra=>`<div class="field"><label class="label">Alternativa ${letra}${letra==="E"?" (opcional)":""}</label><input class="input" id="fqAlt${letra}" value="${escapeHtml(valorAlt(letra))}"></div>`).join("")}</div>
    <div class="hint mb-2">Deixe a alternativa E em branco se a prova original tiver só 4 alternativas (A-D) — é o caso, por exemplo, da UNIFESP-EPM.</div>
    <div class="grid grid-3">
      <div class="field"><label class="label">Gabarito</label><select class="select" id="fqGabarito">${["A","B","C","D","E"].map(l=>`<option value="${l}" ${q&&q.gabarito===l?"selected":""}>${l}</option>`).join("")}</select></div>
      <div class="field"><label class="label">Banca</label><input class="input" id="fqBanca" list="listaBancasForm" value="${escapeHtml(q?q.banca:CONFIG.bancaFoco)}">
        <datalist id="listaBancasForm">${[...new Set([...CONFIG.instituicoesReferencia, ...db.questoes.map(x=>x.banca)])].map(b=>`<option value="${escapeHtml(b)}"></option>`).join("")}</datalist>
      </div>
      <div class="field"><label class="label">Ano</label><input class="input" type="number" id="fqAno" value="${q?q.ano:new Date().getFullYear()}"></div>
    </div>
    <div class="grid grid-3">
      <div class="field"><label class="label">Grande área</label><select class="select" id="fqArea" onchange="atualizarSelectsTaxonomiaForm()">${db.taxonomia.areas.map(a=>`<option value="${a.id}" ${q&&q.areaId===a.id?"selected":""}>${escapeHtml(a.nome)}</option>`).join("")}</select></div>
      <div class="field"><label class="label">Especialidade</label><select class="select" id="fqEspecialidade" onchange="atualizarSelectAssuntoForm()"></select></div>
      <div class="field"><label class="label">Assunto</label><select class="select" id="fqAssunto"></select></div>
    </div>
    <div class="flex gap-1 mb-2" style="flex-wrap:wrap">
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
        <option value="grupo">Só para o meu grupo (fica disponível na hora)</option>
        <option value="geral">Sugerir para o banco geral (passa por revisão do admin)</option>
      </select></div>` : `<div class="field"><label class="label">Status</label><select class="select" id="fqStatus">
        <option value="ativa" ${!q||q.status==="ativa"?"selected":""}>Ativa</option>
        <option value="anulada" ${q&&q.status==="anulada"?"selected":""}>Anulada</option>
        <option value="desatualizada" ${q&&q.status==="desatualizada"?"selected":""}>Desatualizada</option>
      </select></div>`}
    </div>
    <div class="field"><label class="label">Explicação (resposta correta)</label><textarea class="textarea" id="fqExplicacao" style="min-height:90px">${escapeHtml(q?q.explicacaoGeral:"")}</textarea>
      <div class="hint">Escreva com suas palavras, a partir de diretriz, consenso ou artigo — não copie a resolução de sites de questões ou de cursinhos.</div></div>
    <div class="field"><label class="label">Referências consultadas</label><input class="input" id="fqReferencias" placeholder="Ex.: Diretriz da Sociedade Brasileira de Cardiologia 2024; Ministério da Saúde, PCDT 2023" value="${escapeHtml(q?(q.referencias||""):"")}"></div>
    <div class="field"><label class="label">Imagem da questão (opcional)</label>
      <div class="flex gap-1" style="flex-wrap:wrap">
        <label class="btn btn-secondary btn-sm" style="cursor:pointer">${iconeSvg("upload")} Enviar imagem<input type="file" accept="image/*" style="display:none" onchange="carregarImagemQuestao(this)"></label>
        <button class="btn btn-secondary btn-sm" onclick="definirImagemPorUrl()">${iconeSvg("search")} Usar link</button>
        <button class="btn btn-ghost btn-sm" onclick="removerImagemFormulario()">${iconeSvg("trash")} Remover</button>
      </div>
      <div id="fqImagemPreview" class="mt-1"></div>
      <input class="input mt-1" id="fqImagemLegenda" placeholder="Legenda (ex.: ECG de 12 derivações na admissão)" value="${escapeHtml(q?(q.imagemLegenda||""):"")}">
      <div class="hint">Imagens enviadas são reduzidas e comprimidas antes de serem guardadas. ECG, radiografia, fundo de olho e fotos de lesão são o motivo de este campo existir.</div>
    </div>
    ${(q && (u.papel==="admin"||u.papel==="professor")) ? `<div class="text-xs muted mb-1">Criada por ${escapeHtml(getUsuario(q.criadoPor)?getUsuario(q.criadoPor).nome:"—")} em ${formatDataBR(q.criadoEm)}${q.aprovadoPor?" · aprovada por "+escapeHtml(getUsuario(q.aprovadoPor)?getUsuario(q.aprovadoPor).nome:"—"):""}${q.grupoId?" · restrita ao grupo "+escapeHtml(getGrupo(q.grupoId)?getGrupo(q.grupoId).nome:"—"):""}</div>` : ""}
    <div class="flex gap-1 mt-1"><button class="btn btn-primary" onclick="salvarQuestaoFormulario('${qid||""}')">Salvar</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>
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
function carregarImagemFlashcard(input){
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
      definirImagemFlashcard(dataUrl);
      toast("Imagem anexada ("+kb+" KB depois da compressão).");
      if(kb > 400) toast("Imagem grande: prefira recortar só a parte que importa, para não encher o armazenamento.", "err");
    };
    img.onerror = ()=>toast("Arquivo de imagem inválido.", "err");
    img.src = e.target.result;
  };
  leitor.readAsDataURL(arq);
}
function carregarImagemQuestao(input){
  const arq = input.files && input.files[0]; if(!arq) return;
  if(!/^image\//.test(arq.type||"")){ toast("Selecione um arquivo de imagem.", "err"); return; }
  const leitor = new FileReader();
  leitor.onload = e=>{
    const img = new Image();
    img.onload = ()=>{
      // reduz o lado maior para 1100px e comprime em JPEG: um ECG fica com
      // poucas dezenas de KB, o que o armazenamento do navegador aguenta
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
      definirImagemFormulario(dataUrl);
      toast("Imagem anexada ("+kb+" KB depois da compressão).");
      if(kb > 400) toast("Imagem grande: prefira recortar só a parte que importa, para não encher o armazenamento.", "err");
    };
    img.onerror = ()=>toast("Arquivo de imagem inválido.", "err");
    img.src = e.target.result;
  };
  leitor.readAsDataURL(arq);
}

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
function salvarQuestaoFormulario(qid, forcar){
  const dados = {
    enunciado: document.getElementById("fqEnunciado").value.trim(),
    // alternativa E é opcional: provas com só 4 alternativas (ex.: UNIFESP-EPM)
    // não devem ganhar uma 5ª alternativa vazia no banco.
    alternativas: ["A","B","C","D","E"].map(l=>({id:l, texto:document.getElementById("fqAlt"+l).value.trim()})).filter(a=>a.texto),
    gabarito: document.getElementById("fqGabarito").value,
    banca: document.getElementById("fqBanca").value.trim(),
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
  if(!dados.enunciado || dados.alternativas.some(a=>!a.texto)){ toast("Preencha o enunciado e as 5 alternativas.", "err"); return; }
  // antes de criar, avisa se essa questão já existe no banco
  const duplicadas = questoesDuplicadasDe(dados.enunciado, qid||null);
  if(duplicadas.length && !forcar){
    state.filtroRota.questaoPendente = {qid: qid||null, dados, destino: campoDestino?campoDestino.value:null};
    abrirModal(`<div class="modal-header"><h3>Questão possivelmente duplicada</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
      <p class="text-sm">Já existe ${duplicadas.length} questão(ões) com enunciado praticamente igual no banco:</p>
      ${duplicadas.slice(0,3).map(d=>`<div class="card-flat mt-1"><div class="text-sm"><span class="enunciado-clicavel" onclick="fecharModal();abrirQuestaoCompleta('${d.id}')">${escapeHtml(d.enunciado.slice(0,180))}…</span></div><div class="text-xs muted mt-1">${escapeHtml(d.banca)} · ${d.ano} · ${escapeHtml(nomeAssunto(d.assuntoId))}</div><button class="link-btn mt-1" onclick="fecharModal();abrirQuestaoCompleta('${d.id}')">ver questão existente</button></div>`).join("")}
      <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
        <button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button>
        <button class="btn btn-danger" onclick="salvarQuestaoPendente()">Salvar assim mesmo</button>
      </div>`);
    return;
  }
  const u = usuarioAtual();
  if(qid){ Object.assign(getQuestao(qid), dados); }
  else{
    const nova = { id:uid("q"), ...dados, real:true, explicacoesAlternativas:{}, estatisticas:{respostas:0,acertos:0,distribuicaoAlternativas:{}}, criadoPor:u.id, criadoEm:hojeISO() };
    if(campoDestino){
      if(campoDestino.value==="grupo"){ nova.grupoId = getGrupoDoUsuario(u).id; nova.status = "ativa"; }
      else{ nova.status = "pendente"; }
    } else if(!nova.status){ nova.status = "ativa"; }
    db.questoes.push(nova);
  }
  saveState(); fecharModal();
  toast(qid?"Questão atualizada.":"Questão criada.");
  render();
}
/* salva a questão que ficou pendente no aviso de duplicidade (os campos do
   formulário já não existem no DOM, porque o modal foi substituído) */
function salvarQuestaoPendente(){
  const pend = state.filtroRota.questaoPendente;
  if(!pend){ fecharModal(); return; }
  const u = usuarioAtual();
  if(pend.qid){ Object.assign(getQuestao(pend.qid), pend.dados); }
  else{
    const nova = { id:uid("q"), ...pend.dados, real:true, explicacoesAlternativas:{}, estatisticas:{respostas:0,acertos:0,distribuicaoAlternativas:{}}, criadoPor:u.id, criadoEm:hojeISO() };
    if(pend.destino==="grupo"){ nova.grupoId = getGrupoDoUsuario(u).id; nova.status = "ativa"; }
    else if(pend.destino){ nova.status = "pendente"; }
    else if(!nova.status){ nova.status = "ativa"; }
    db.questoes.push(nova);
  }
  state.filtroRota.questaoPendente = null;
  saveState(); fecharModal(); toast("Questão salva."); render();
}
function confirmarExcluirQuestao(qid){
  abrirModal(`<div class="modal-header"><h3>Excluir questão</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div><p>Esta ação não pode ser desfeita. Considere marcar como "anulada" ou "desatualizada" em vez de excluir, para manter o histórico de quem já respondeu.</p><div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="excluirQuestaoConfirmado('${qid}')">Excluir mesmo assim</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
}
function excluirQuestaoConfirmado(qid){ db.questoes = db.questoes.filter(q=>q.id!==qid); saveState(); fecharModal(); toast("Questão excluída."); render(); }
function marcarQuestaoStatus(qid, status){ getQuestao(qid).status = status; saveState(); toast("Status atualizado."); render(); }

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
    <div class="modal-header"><h3>Mesclar assunto</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
    <p class="text-sm muted">Todas as ${contarQuestoesAssunto(id)} questão(ões) de <strong>${escapeHtml(a.nome)}</strong> passam para o assunto escolhido, e o assunto atual é excluído. O histórico de respostas dos alunos acompanha a mudança.</p>
    <div class="field mt-2"><label class="label">Mesclar em</label>
      <select class="select" id="mesclarDestino">
        ${db.taxonomia.areas.map(area=>`<optgroup label="${escapeHtml(area.nome)}">${db.taxonomia.especialidades.filter(e=>e.areaId===area.id).map(e=>outros.filter(x=>x.especialidadeId===e.id).map(x=>`<option value="${x.id}">${escapeHtml(e.nome)} › ${escapeHtml(x.nome)}</option>`).join("")).join("")}</optgroup>`).join("")}
      </select></div>
    <div class="flex gap-1 mt-2"><button class="btn btn-primary" onclick="confirmarMesclarAssunto('${id}')">Mesclar</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
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
    <div class="flex justify-between items-center gap-2" style="flex-wrap:wrap">
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
        <span>${escapeHtml(area.nome)} <span class="text-xs muted" style="font-weight:400">— ${esps.length} especialidade(s), ${totalArea} questão(ões)</span></span>
        ${iconeSvg("chevron-d")}
      </div>
      <div class="tree-body" id="treebody-tax-${area.id}">
        ${podeEditar ? `<button class="btn btn-secondary btn-sm mb-2" onclick="criarEspecialidadeNaArea('${area.id}')">${iconeSvg("plus")} Nova especialidade nesta área</button>` : ""}
        ${esps.length ? esps.map(esp=>{
          const assuntos = db.taxonomia.assuntos.filter(a=>a.especialidadeId===esp.id);
          return `<div class="card-flat mb-2">
            <div class="flex justify-between items-center gap-2" style="flex-wrap:wrap">
              <div><div style="font-weight:700">${escapeHtml(esp.nome)}</div>
                <div class="text-xs muted">${assuntos.length} assunto(s) · ${contarQuestoesEspecialidade(esp.id)} questão(ões)</div></div>
              ${podeEditar ? `<div class="flex gap-1" style="flex-wrap:wrap">
                <button class="btn btn-ghost btn-sm" onclick="renomearEspecialidade('${esp.id}')">${iconeSvg("edit")} Renomear</button>
                <select class="select" style="padding:.3rem .5rem;max-width:200px" onchange="moverEspecialidade('${esp.id}', this.value)">
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
                  <td>${podeEditar ? `<div class="flex gap-1" style="flex-wrap:wrap">
                    <button class="btn btn-ghost btn-sm" onclick="renomearAssunto('${a.id}')">renomear</button>
                    <select class="select" style="padding:.25rem .4rem;max-width:190px" onchange="moverAssunto('${a.id}', this.value)">
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

/* ==========================================================================
   24-C. PAINEL DA TURMA — como os alunos estão indo e usando a plataforma
   ==========================================================================
   Só professor e administrador (coordenação e máster — ver a permissão
   "turma" em PERMISSOES_ADMIN). Separado por ano da faculdade, porque é
   assim que a coordenação pensa: o 3º ano está usando? o 5º está caindo?

   De onde vêm os números:
     - nuvem ligada: das funções painel_turma() e atividade_por_semana() do
       esquema.sql, que somam no próprio banco e devolvem uma linha por
       aluno — números, nunca respostas, anotações ou cartões pessoais. O
       banco confere o papel de quem pede: para qualquer outra pessoa, as
       duas devolvem nada;
     - nuvem desligada: das contas deste navegador (demonstração), com a
       mesma conta — a tela é a mesma, e diz de onde veio.

   Os ALERTAS são o motivo de a tela existir: quem parou de estudar (7 dias
   ou mais sem questão nem cartão), quem nunca começou, e quem caiu 10
   pontos ou mais de um mês para o outro (com pelo menos 20 questões nos
   dois meses, para não alarmar por acaso). */
function podeVerPainelTurma(u){
  u = u || usuarioAtual();
  if(!u || state.modoAluno) return false;
  return u.papel === "professor" || podeAdmin("turma", u);
}
function filtrosPainelTurma(){
  if(!state.filtroRota.painel) state.filtroRota.painel = { ano: "todos", ordem: "alerta", busca: "" };
  return state.filtroRota.painel;
}
function mudarFiltroPainelTurma(campo, valor){ filtrosPainelTurma()[campo] = valor; render(); }

/* Os dados de todos os alunos, do mesmo jeito venham da nuvem ou daqui. */
function normalizarAlunoDaNuvem(l){
  return {
    id: l.usuario_id, nome: l.nome || "(sem nome)", email: l.email || "", ano: l.ano_faculdade || "(sem ano)",
    grupoId: l.grupo_id || null, status: l.status, criadoEm: (l.criado_em || "").slice(0,10),
    respostas: +l.respostas || 0, acertos: +l.acertos || 0, r7: +l.respostas_7d || 0, a7: +l.acertos_7d || 0,
    r30: +l.respostas_30d || 0, a30: +l.acertos_30d || 0, r60: +l.respostas_30a60d || 0, a60: +l.acertos_30a60d || 0,
    dias30: +l.dias_ativos_30d || 0, ultimaResposta: l.ultima_resposta || null,
    cartoes: +l.cartoes_total || 0, cartoes30: +l.cartoes_30d || 0, ultimoCartao: l.ultimo_cartao || null,
    simulados: +l.simulados || 0, mediaSimulados: l.media_simulados !== null && l.media_simulados !== undefined ? Math.round(+l.media_simulados) : null,
    porArea: l.por_area || {},
  };
}
function painelTurmaLocal(){
  const hoje = hojeISO();
  const d7 = somarDias(hoje, -7), d30 = somarDias(hoje, -30), d60 = somarDias(hoje, -60);
  const alunos = db.usuarios.filter(u => u.papel === "aluno").map(u => {
    const rs = db.respostas.filter(r => r.usuarioId === u.id);
    const conta = (lista) => ({ t: lista.length, a: lista.filter(r => r.correta).length });
    const tudo = conta(rs), s7 = conta(rs.filter(r => r.data > d7)), s30 = conta(rs.filter(r => r.data > d30)),
          s60 = conta(rs.filter(r => r.data <= d30 && r.data > d60));
    const porArea = {};
    rs.forEach(r => { const k = r.areaId || "?"; porArea[k] = porArea[k] || [0,0]; porArea[k][0]++; if(r.correta) porArea[k][1]++; });
    const dias = (db.cartoesPorDia && db.cartoesPorDia[u.id]) || {};
    const sims = db.resultadosSimulados.filter(r => r.usuarioId === u.id);
    return {
      id: u.id, nome: u.nome, email: u.email || "", ano: u.anoFaculdade || "(sem ano)", grupoId: u.grupoId || null,
      status: u.status, criadoEm: u.criadoEm || "",
      respostas: tudo.t, acertos: tudo.a, r7: s7.t, a7: s7.a, r30: s30.t, a30: s30.a, r60: s60.t, a60: s60.a,
      dias30: new Set(rs.filter(r => r.data > d30).map(r => r.data)).size,
      ultimaResposta: rs.length ? rs.map(r => r.data).sort().pop() : null,
      cartoes: Object.values(dias).reduce((s, n) => s + (+n || 0), 0),
      cartoes30: Object.entries(dias).filter(([d]) => d > d30).reduce((s, [, n]) => s + (+n || 0), 0),
      ultimoCartao: Object.keys(dias).sort().pop() || null,
      simulados: sims.length, mediaSimulados: sims.length ? Math.round(sims.reduce((s, r) => s + r.nota, 0) / sims.length) : null,
      porArea,
    };
  });
  const semanas = {};
  db.respostas.forEach(r => {
    const u = getUsuario(r.usuarioId); if(!u || u.papel !== "aluno" || !r.data || r.data <= somarDias(hoje, -84)) return;
    const d = new Date(r.data + "T00:00:00"); const seg = somarDias(r.data, -((d.getDay() + 6) % 7));
    const k = (u.anoFaculdade || "(sem ano)") + "|" + seg;
    const s = semanas[k] = semanas[k] || { ano: u.anoFaculdade || "(sem ano)", semana: seg, alunos: new Set(), respostas: 0, acertos: 0 };
    s.alunos.add(u.id); s.respostas++; if(r.correta) s.acertos++;
  });
  return { alunos, semanas: Object.values(semanas).map(s => ({ ano: s.ano, semana: s.semana, alunos: s.alunos.size, respostas: s.respostas, acertos: s.acertos })) };
}
function carregarPainelTurma(forcar){
  const cache = state.filtroRota.painelDados;
  if(!nuvemConectado()){
    state.filtroRota.painelDados = { origem: "local", dados: painelTurmaLocal(), em: Date.now() };
    return;
  }
  if(cache && cache.origem === "nuvem" && !forcar && (cache.carregando || cache.dados || cache.erro)) return;
  state.filtroRota.painelDados = { origem: "nuvem", carregando: true, dados: cache && cache.dados };
  nuvemPainelTurma().then(r => {
    state.filtroRota.painelDados = { origem: "nuvem", em: Date.now(), dados: {
      alunos: r.alunos.map(normalizarAlunoDaNuvem),
      semanas: r.semanas.map(s => ({ ano: s.ano_faculdade, semana: s.semana, alunos: +s.alunos_ativos, respostas: +s.respostas, acertos: +s.acertos })),
    }};
    if(state.route === "painel-turma") render();
  }).catch(e => {
    state.filtroRota.painelDados = { origem: "nuvem", erro: e.status === 404
      ? "O banco ainda não tem as funções do painel. Rode o nuvem/esquema.sql inteiro no Supabase (SQL Editor > Run) — ele cria painel_turma() e atividade_por_semana() sem mexer no resto."
      : (e.message || "Não foi possível carregar o painel.") };
    if(state.route === "painel-turma") render();
  });
}
function diasDesde(iso){ return iso ? diasEntre(iso, hojeISO()) : null; }
function alertasDoAluno(a){
  const ultima = [a.ultimaResposta, a.ultimoCartao].filter(Boolean).sort().pop() || null;
  const parado = diasDesde(ultima);
  const lista = [];
  if(ultima === null) lista.push({ tipo: "nunca", texto: "nunca estudou", peso: 2 });
  else if(parado >= 7) lista.push({ tipo: "parado", texto: `parado há ${parado} dias`, peso: 3 + Math.min(parado, 60)/60 });
  if(a.r30 >= 20 && a.r60 >= 20){
    const queda = pct(a.a60, a.r60) - pct(a.a30, a.r30);
    if(queda >= 10) lista.push({ tipo: "queda", texto: `acerto caiu ${queda} p.p.`, peso: 2 + queda/100 });
  }
  return { lista, ultima, parado, peso: lista.reduce((s, x) => Math.max(s, x.peso), 0) };
}
function badgeTaxa(t, n){
  if(!n) return '<span class="text-xs muted">—</span>';
  const v = pct(t, n);
  return `<span class="badge ${v<50?"badge-danger":v<70?"badge-amber":"badge-accent"}">${v}%</span>`;
}
function nomeDoGrupoPainel(id){ const g = id ? getGrupo(id) : null; return g ? g.nome : ""; }

function renderPainelTurma(){
  const u = usuarioAtual();
  if(!podeVerPainelTurma(u)) return renderSemPermissao("turma");
  carregarPainelTurma(false);
  const f = filtrosPainelTurma();
  const pd = state.filtroRota.painelDados || {};
  const cabecalho = `<div class="page-header"><h2>Painel da Turma</h2><p>Como os alunos estão indo e como estão usando a plataforma, separado por ano da faculdade. Visível só para professores e para a coordenação.</p></div>`;
  if(pd.erro) return cabecalho + `<div class="card" style="border-color:var(--danger)"><div class="card-title">${iconeSvg("alert")} Não deu para carregar</div><p class="text-sm">${escapeHtml(pd.erro)}</p><button class="btn btn-secondary btn-sm mt-2" onclick="carregarPainelTurma(true); render()">Tentar de novo</button></div>`;
  if(!pd.dados) return cabecalho + `<div class="card"><p class="text-sm muted">Carregando os números da turma…</p></div>`;

  const todos = pd.dados.alunos;
  const anos = [...new Set(todos.map(a => a.ano))].sort((a, b) => {
    const ia = CONFIG.anosFaculdade.indexOf(a), ib = CONFIG.anosFaculdade.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
  });
  if(f.ano !== "todos" && !anos.includes(f.ano)) f.ano = "todos";
  let recorte = f.ano === "todos" ? todos : todos.filter(a => a.ano === f.ano);
  const aprovados = recorte.filter(a => a.status !== "rejeitado" && a.status !== "inativo");
  const soma = (lista, k) => lista.reduce((s, a) => s + (a[k] || 0), 0);
  const ativos7 = aprovados.filter(a => a.r7 > 0 || (a.ultimoCartao && diasDesde(a.ultimoCartao) < 7)).length;
  const parados = aprovados.filter(a => { const al = alertasDoAluno(a); return al.lista.some(x => x.tipo === "parado" || x.tipo === "nunca"); }).length;

  // por ano (só na visão "todos")
  const linhasAnos = anos.map(ano => {
    const l = todos.filter(a => a.ano === ano && a.status !== "rejeitado" && a.status !== "inativo");
    const at = l.filter(a => a.r7 > 0).length;
    return { ano, n: l.length, ativos: at, r30: soma(l, "r30"), a30: soma(l, "a30"), resp: soma(l, "respostas"), ac: soma(l, "acertos"),
             cartoes30: soma(l, "cartoes30"), sims: soma(l, "simulados") };
  });
  // grandes áreas do recorte
  const areas = db.taxonomia.areas.map(area => {
    let t = 0, a = 0;
    aprovados.forEach(al => { const v = al.porArea[area.id]; if(v){ t += +v[0]; a += +v[1]; } });
    return { nome: area.nome, t, a };
  });
  // semana a semana do recorte
  const semanasMapa = {};
  pd.dados.semanas.filter(s => f.ano === "todos" || s.ano === f.ano).forEach(s => {
    const k = s.semana; const x = semanasMapa[k] = semanasMapa[k] || { alunos: 0, respostas: 0, acertos: 0 };
    x.alunos += s.alunos; x.respostas += s.respostas; x.acertos += s.acertos;
  });
  const semanasOrdenadas = Object.keys(semanasMapa).sort().slice(-12);
  const grafSemanas = graficoBarrasVerticaisSvg(semanasOrdenadas.map(k => ({
    label: formatDataBR(k).slice(0,5), taxa: semanasMapa[k].respostas ? pct(semanasMapa[k].acertos, semanasMapa[k].respostas) : null,
    total: semanasMapa[k].respostas, acertos: semanasMapa[k].acertos,
  })), { altura: 120, larguraMax: 34 });

  // alunos
  const busca = (f.busca || "").trim().toLowerCase();
  let lista = recorte.map(a => Object.assign({}, a, { _al: alertasDoAluno(a) }));
  if(busca) lista = lista.filter(a => (a.nome + " " + a.email).toLowerCase().includes(busca));
  const ordens = {
    alerta: (x, y) => y._al.peso - x._al.peso || x.nome.localeCompare(y.nome),
    nome: (x, y) => x.nome.localeCompare(y.nome),
    ativos: (x, y) => y.r30 - x.r30 || x.nome.localeCompare(y.nome),
    acerto: (x, y) => (x.r30 ? x.a30/x.r30 : 2) - (y.r30 ? y.a30/y.r30 : 2),
  };
  lista.sort(ordens[f.ordem] || ordens.alerta);
  const p = paginar(lista, "painel-turma", { assinatura: JSON.stringify(f) });

  const origem = pd.origem === "nuvem"
    ? `Dados da nuvem — todos os alunos cadastrados, de qualquer aparelho. Atualizado ${pd.em ? "às " + new Date(pd.em).toLocaleTimeString("pt-BR", {hour:"2-digit", minute:"2-digit"}) : ""}. <button class="link-btn" onclick="carregarPainelTurma(true); render()">atualizar</button>`
    : (nuvemLigada() ? "Você não está numa conta da nuvem: estes são só os alunos com conta NESTE navegador. Entre com a sua conta da nuvem para ver a turma inteira."
                     : "Nuvem desligada: estes são os alunos com conta neste navegador.");

  return cabecalho + `
  <p class="text-xs muted mb-2">${origem}</p>
  <div class="tabs">
    <div class="tab ${f.ano==="todos"?"active":""}" onclick="mudarFiltroPainelTurma('ano','todos')">Todos os anos (${todos.length})</div>
    ${anos.map(ano => `<div class="tab ${f.ano===ano?"active":""}" onclick="mudarFiltroPainelTurma('ano', ${escapeHtml(JSON.stringify(ano))})">${escapeHtml(ano)} (${todos.filter(a=>a.ano===ano).length})</div>`).join("")}
  </div>

  <div class="grid grid-4 mb-2">
    <div class="stat-tile"><div class="stat-value">${aprovados.length}</div><div class="stat-label">aluno(s)${recorte.length!==aprovados.length?` (+${recorte.length-aprovados.length} inativo/recusado)`:""}</div></div>
    <div class="stat-tile"><div class="stat-value">${ativos7}</div><div class="stat-label">estudaram nos últimos 7 dias${aprovados.length?` (${pct(ativos7, aprovados.length)}%)`:""}</div></div>
    <div class="stat-tile"><div class="stat-value">${aprovados.length ? Math.round(soma(aprovados,"r30")/aprovados.length) : 0}</div><div class="stat-label">questões por aluno nos últimos 30 dias (${soma(aprovados,"r30")} no total)</div></div>
    <div class="stat-tile"><div class="stat-value">${soma(aprovados,"r30") ? pct(soma(aprovados,"a30"), soma(aprovados,"r30"))+"%" : "—"}</div><div class="stat-label">acerto da turma nos últimos 30 dias${parados?` · <strong style="color:var(--danger)">${parados} parado(s)</strong>`:""}</div></div>
  </div>

  ${f.ano==="todos" && linhasAnos.length > 1 ? `<div class="card mb-2">
    <div class="card-title">Ano a ano</div>
    <div class="table-wrap"><table>
      <thead><tr><th>Ano</th><th>Alunos</th><th>Ativos (7 dias)</th><th>Questões/aluno (30 dias)</th><th>Acerto (30 dias)</th><th>Acerto geral</th><th>Cartões (30 dias)</th><th>Simulados feitos</th></tr></thead>
      <tbody>${linhasAnos.map(l => `<tr style="cursor:pointer" onclick="mudarFiltroPainelTurma('ano', ${escapeHtml(JSON.stringify(l.ano))})">
        <td class="text-sm" style="font-weight:600">${escapeHtml(l.ano)}</td><td class="text-sm">${l.n}</td>
        <td class="text-sm">${l.ativos} <span class="text-xs muted">${l.n?pct(l.ativos,l.n)+"%":""}</span></td>
        <td class="text-sm">${l.n?Math.round(l.r30/l.n):0}</td><td>${badgeTaxa(l.a30, l.r30)}</td><td>${badgeTaxa(l.ac, l.resp)}</td>
        <td class="text-sm">${l.cartoes30}</td><td class="text-sm">${l.sims}</td></tr>`).join("")}</tbody>
    </table></div>
  </div>` : ""}

  <div class="grid grid-2 mb-2">
    <div class="card">
      <div class="card-title">Semana a semana</div>
      <p class="text-xs muted">Acerto de cada semana (barra) e quantos alunos estudaram nela.</p>
      <div class="mt-2">${semanasOrdenadas.length ? grafSemanas : '<div class="text-sm muted">Ninguém deste recorte respondeu questões nas últimas 12 semanas.</div>'}</div>
      ${semanasOrdenadas.length ? `<div class="text-xs muted mt-1">Alunos ativos por semana: ${semanasOrdenadas.map(k=>`<span class="nowrap">${formatDataBR(k).slice(0,5)}: <strong>${semanasMapa[k].alunos}</strong></span>`).join(" · ")}</div>` : ""}
    </div>
    <div class="card">
      <div class="card-title">Grandes áreas</div>
      <p class="text-xs muted">Todas as respostas do recorte, somadas.</p>
      <div class="table-wrap mt-1"><table>
        <thead><tr><th>Grande área</th><th>Questões</th><th>Acerto</th></tr></thead>
        <tbody>${areas.map(a=>`<tr><td class="text-sm">${escapeHtml(a.nome)}</td><td class="text-sm">${a.t}</td><td>${badgeTaxa(a.a, a.t)}</td></tr>`).join("")}</tbody>
      </table></div>
    </div>
  </div>

  <div class="card">
    <div class="flex justify-between items-center" style="flex-wrap:wrap;gap:.5rem">
      <div class="card-title" style="margin:0">Alunos ${f.ano==="todos"?"":"do "+escapeHtml(f.ano)}</div>
      <div class="flex gap-1 items-center" style="flex-wrap:wrap">
        <input class="input" style="max-width:220px" placeholder="Buscar por nome ou e-mail" value="${escapeHtml(f.busca||"")}" onchange="mudarFiltroPainelTurma('busca', this.value)">
        <select class="select" style="max-width:220px" onchange="mudarFiltroPainelTurma('ordem', this.value)">
          <option value="alerta" ${f.ordem==="alerta"?"selected":""}>Quem precisa de atenção primeiro</option>
          <option value="ativos" ${f.ordem==="ativos"?"selected":""}>Mais ativos (30 dias)</option>
          <option value="acerto" ${f.ordem==="acerto"?"selected":""}>Menor acerto (30 dias)</option>
          <option value="nome" ${f.ordem==="nome"?"selected":""}>Nome</option>
        </select>
        <button class="btn btn-secondary btn-sm" onclick="exportarPainelTurmaCsv()">${iconeSvg("download")} Baixar planilha (CSV)</button>
      </div>
    </div>
    <div class="table-wrap mt-2"><table>
      <thead><tr><th>Aluno</th><th>Ano / turma</th><th>Última atividade</th><th>Dias ativos (30)</th><th>Questões (30 dias)</th><th>Acerto (30 dias)</th><th>Acerto geral</th><th>Cartões (30 dias)</th><th>Simulados</th><th>Atenção</th></tr></thead>
      <tbody>${p.itens.map(a => {
        const al = a._al;
        const tendencia = (a.r30 >= 20 && a.r60 >= 20) ? (pct(a.a30,a.r30) - pct(a.a60,a.r60)) : null;
        return `<tr>
          <td class="text-sm"><strong>${escapeHtml(a.nome)}</strong><div class="text-xs muted">${escapeHtml(a.email)}${a.status && a.status!=="aprovado" ? " · "+escapeHtml(a.status) : ""}</div></td>
          <td class="text-sm">${escapeHtml(a.ano)}${nomeDoGrupoPainel(a.grupoId)?`<div class="text-xs muted">${escapeHtml(nomeDoGrupoPainel(a.grupoId))}</div>`:""}</td>
          <td class="text-sm">${al.ultima ? (al.parado===0 ? "hoje" : al.parado===1 ? "ontem" : "há "+al.parado+" dias") : '<span class="muted">nunca</span>'}</td>
          <td class="text-sm">${a.dias30}</td>
          <td class="text-sm">${a.r30}</td>
          <td class="text-sm">${badgeTaxa(a.a30, a.r30)}${tendencia!==null && Math.abs(tendencia)>=5 ? ` <span class="text-xs" style="color:${tendencia>0?"var(--accent)":"var(--danger)"}">${tendencia>0?"▲":"▼"}${Math.abs(tendencia)}</span>` : ""}</td>
          <td class="text-sm">${badgeTaxa(a.acertos, a.respostas)} <span class="text-xs muted">${a.respostas}</span></td>
          <td class="text-sm">${a.cartoes30}</td>
          <td class="text-sm">${a.simulados ? a.simulados+` <span class="text-xs muted">média ${a.mediaSimulados}%</span>` : "—"}</td>
          <td>${al.lista.map(x=>`<span class="badge ${x.tipo==="queda"?"badge-amber":"badge-danger"}">${escapeHtml(x.texto)}</span>`).join(" ")}</td>
        </tr>`;
      }).join("") || `<tr><td colspan="10" class="text-sm muted">Nenhum aluno neste recorte.</td></tr>`}</tbody>
    </table></div>
    ${controlesPaginacao(p, "aluno(s)")}
    <p class="text-xs muted mt-2">"Parado" = 7 dias ou mais sem responder questão nem revisar cartão. "Acerto caiu" = queda de 10 pontos ou mais entre os últimos 30 dias e os 30 anteriores, com pelo menos 20 questões em cada. As setas comparam os mesmos dois meses.</p>
  </div>`;
}
function exportarPainelTurmaCsv(){
  const pd = state.filtroRota.painelDados; if(!pd || !pd.dados) return;
  const f = filtrosPainelTurma();
  const lista = pd.dados.alunos.filter(a => f.ano === "todos" || a.ano === f.ano);
  const campo = v => { const t = v === null || v === undefined ? "" : String(v); return /[";\n]/.test(t) ? '"' + t.replace(/"/g, '""') + '"' : t; };
  const cab = ["nome","email","ano","turma","status","ultima_atividade","dias_ativos_30d","questoes_30d","acerto_30d_%","questoes_total","acerto_geral_%","cartoes_30d","simulados","media_simulados_%","alertas"];
  const linhas = lista.map(a => { const al = alertasDoAluno(a); return [a.nome, a.email, a.ano, nomeDoGrupoPainel(a.grupoId), a.status, al.ultima || "", a.dias30, a.r30,
    a.r30 ? pct(a.a30, a.r30) : "", a.respostas, a.respostas ? pct(a.acertos, a.respostas) : "", a.cartoes30, a.simulados, a.mediaSimulados ?? "", al.lista.map(x=>x.texto).join(" / ")].map(campo).join(";"); });
  // ";" e BOM: é o que o Excel em português abre sem assistente de importação
  const blob = new Blob(["﻿" + cab.join(";") + "\n" + linhas.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "painel-turma-" + (f.ano === "todos" ? "todos" : f.ano.replace(/[^0-9a-z]+/gi, "-")) + "-" + hojeISO() + ".csv";
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
