/* codigo/11a-simulado-e-pdf.js — Criar Simulado (seção 20) e Material em PDF (20-B).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

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
        <div class="flex justify-between items-center mb-1">
          <div class="label">Instituição (uma ou mais)</div>
          <div class="flex gap-1"><button class="link-btn text-xs" onclick="marcarTodasCaixas('csBanca',false)">limpar</button></div>
        </div>
        <div style="max-height:150px;overflow-y:auto">${[...new Set(db.questoes.map(q=>q.banca))].sort().map(b=>`<label class="checkbox-row mb-1"><input type="checkbox" class="csBanca" value="${escapeHtml(b)}"> ${escapeHtml(b)}</label>`).join("")}</div>
        <button class="btn btn-secondary mt-2" onclick="buscarCandidatasSimulado()">Buscar questões</button>
      </div>
    </div>
  </div>
  ${ctx.pool.length ? `
  <div class="card mt-2">
    <div class="card-title">2. Selecionar questões (${ctx.selecionadas.length} selecionada(s) de ${ctx.pool.length})</div>
    <div class="table-wrap mt-1"><table><thead><tr><th></th><th>Questão</th><th>Assunto</th><th>Instituição / Ano</th></tr></thead><tbody>
    ${ctx.pool.map(qid=>{ const q=getQuestao(qid); const marcado=ctx.selecionadas.includes(qid); return `<tr><td><input type="checkbox" onchange="toggleSelecaoSimulado('${qid}')" ${marcado?"checked":""}></td><td class="text-sm"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${qid}')">${escapeHtml(q.enunciado.slice(0,90))}…</span></td><td class="text-sm">${escapeHtml(nomeAssunto(q.assuntoId))}</td><td class="text-sm">${escapeHtml(q.banca)} · ${anoDaProva(q)}</td></tr>`; }).join("")}
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
  const bancas = [...document.querySelectorAll(".csBanca:checked")].map(el=>el.value);
  const pool = buscarQuestoesPorFiltro(usuarioAtual().id, {areaIds, anos, bancas, incluirInativas:true}).filter(q=>!ehDissertativa(q)).map(q=>q.id);
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
    return (sim.questaoIds||[]).map(getQuestao).filter(q=>q && !ehDissertativa(q));
  }
  // a dissertativa não tem alternativas nem gabarito para o papel
  let pool = questoesAtivas().filter(q=>!ehDissertativa(q));
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
    <div class="flex justify-between items-center gap-2 quebra">
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
      <div class="pdf-meta">${escapeHtml(q.banca)} · ${anoDaProva(q)} · ${escapeHtml(nomeAssunto(q.assuntoId))}</div>
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
      ${questoes.map((q,i)=>`<tr><td>${i+1}</td><td><strong>${escapeHtml(q.gabarito)}</strong></td><td>${escapeHtml(nomeAssunto(q.assuntoId))}</td><td>${escapeHtml(q.banca)} · ${anoDaProva(q)}</td></tr>`).join("")}
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
      <div style="margin-top:.35rem"><strong>Gabarito: ${escapeHtml(q.gabarito)}.</strong>${ctx.comExplicacao&&q.explicacaoGeral?" "+htmlComDestaques(q.explicacaoGeral, null, true):""}</div>
      ${ctx.comReferencias && q.referencias ? `<div class="pdf-meta">Referências: ${escapeHtml(q.referencias)}</div>` : ""}
      <div class="pdf-meta">${escapeHtml(q.banca)} · ${anoDaProva(q)} · ${escapeHtml(nomeAssunto(q.assuntoId))}</div>
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
      <div style="font-size:8.5pt;color:#444;margin-top:.3rem">${escapeHtml(nomeAssuntoDoCartao(c))}</div>
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
