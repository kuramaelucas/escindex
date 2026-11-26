/* codigo/07b-montagem-da-lista.js — Estudar › Monte sua própria lista: árvore
   Área › Especialidade › Assunto com busca e contagem, etiquetas do que foi
   escolhido, "Mais filtros" recolhido, barra fixa com a contagem e a geração
   da lista (em camadas, montarConjuntoEmCamadas, 08d).

   Por que a árvore: antes eram três listas soltas (áreas em caixas,
   especialidades e assuntos em <select multiple>, que pede Ctrl para escolher
   mais de um — ninguém descobria e no celular não funciona) e a de assuntos
   mostrava todos até se escolher a especialidade. Agora uma escolha só: marcar
   a área ou a especialidade marca os assuntos dela; abrir (▸) deixa escolher
   um por um. O que está escolhido é sempre um conjunto de assuntos
   (state.montagemLista.marcados); nada marcado = todos. */

function _estadoMontagem(){
  if(!state.montagemLista) state.montagemLista = { marcados: new Set(), abertos: new Set(), busca: "" };
  return state.montagemLista;
}
function _normalizarBusca(t){ return String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }

/* Total e inéditas por assunto, das questões que a pessoa estuda. Guardado por
   _geracaoDb: marcar e desmarcar redesenha a árvore várias vezes seguidas. */
let _cacheContagemArvore = null;
function contagemDaArvoreDeAssuntos(usuarioId){
  if(_cacheContagemArvore && _cacheContagemArvore.geracao === _geracaoDb && _cacheContagemArvore.usuarioId === usuarioId) return _cacheContagemArvore.porAssunto;
  const porAssunto = {};
  questoesParaEstudo(usuarioId).forEach(q => {
    const c = porAssunto[q.assuntoId] || (porAssunto[q.assuntoId] = { total: 0, ineditas: 0 });
    c.total++; if(!jaFoiRespondida(usuarioId, q.id)) c.ineditas++;
  });
  _cacheContagemArvore = { geracao: _geracaoDb, usuarioId, porAssunto };
  return porAssunto;
}
/* A árvore só com o que tem questão: assunto vazio é ruído na escolha. */
function arvoreDeAssuntos(usuarioId){
  const cont = contagemDaArvoreDeAssuntos(usuarioId);
  const soma = lista => lista.reduce((s, x) => ({ total: s.total + x.total, ineditas: s.ineditas + x.ineditas }), { total: 0, ineditas: 0 });
  return db.taxonomia.areas.map(area => {
    const especialidades = db.taxonomia.especialidades.filter(e => e.areaId === area.id).map(esp => {
      const assuntos = db.taxonomia.assuntos.filter(a => a.especialidadeId === esp.id && cont[a.id])
        .map(a => ({ id: a.id, nome: a.nome, total: cont[a.id].total, ineditas: cont[a.id].ineditas, filhos: [] }));
      return Object.assign({ id: esp.id, nome: esp.nome, filhos: assuntos }, soma(assuntos));
    }).filter(e => e.total);
    return Object.assign({ id: area.id, nome: area.nome, filhos: especialidades }, soma(especialidades));
  }).filter(a => a.total);
}
function _assuntosDoNo(no){ return no.filhos.length ? no.filhos.flatMap(_assuntosDoNo) : [no.id]; }
function _acharNo(arvore, id){
  for(const no of arvore){ if(no.id === id) return no; const f = _acharNo(no.filhos, id); if(f) return f; }
  return null;
}
// 0 = nada marcado, 1 = parte, 2 = tudo
function _marcacaoDoNo(no, marcados){
  const ids = _assuntosDoNo(no), n = ids.filter(id => marcados.has(id)).length;
  return n === 0 ? 0 : n === ids.length ? 2 : 1;
}
function _noCasaComBusca(no, busca){
  return !busca || _normalizarBusca(no.nome).includes(busca) || no.filhos.some(f => _noCasaComBusca(f, busca));
}
function _htmlNoDaArvore(no, nivel, est, busca, paiCasou){
  const casaAqui = !!busca && _normalizarBusca(no.nome).includes(busca);
  if(busca && !paiCasou && !_noCasaComBusca(no, busca)) return "";
  const temFilhos = no.filhos.length > 0;
  // com busca, abre o caminho até o que casou; o ramo que casou inteiro abre só se a pessoa pedir
  const aberto = temFilhos && (est.abertos.has(no.id) || (!!busca && !casaAqui && !paiCasou));
  const marca = _marcacaoDoNo(no, est.marcados);
  const id = escapeHtml(no.id);
  return `<div class="arvore-no arvore-n${nivel}">
      <button type="button" class="arvore-seta${aberto ? " aberta" : ""}" ${temFilhos ? `onclick="abrirNoDaMontagem('${id}')" aria-expanded="${aberto}" aria-label="${aberto ? "Fechar" : "Abrir"} ${escapeHtml(no.nome)}"` : `tabindex="-1" aria-hidden="true" style="visibility:hidden"`}>${iconeSvg("chevron-r")}</button>
      <label class="arvore-rotulo"><input type="checkbox" class="arvoreCaixa" data-no="${id}" ${marca === 2 ? "checked" : ""} ${marca === 1 ? 'data-meio="1"' : ""} onchange="marcarNoDaMontagem('${id}')"> <span>${escapeHtml(no.nome)}</span></label>
      <span class="arvore-cont"><span class="arvore-total">${no.total.toLocaleString("pt-BR")} · </span><strong>${no.ineditas.toLocaleString("pt-BR")} ${plural(no.ineditas, "inédita", "inéditas")}</strong></span>
    </div>
    ${aberto ? `<div class="arvore-filhos">${no.filhos.map(f => _htmlNoDaArvore(f, nivel + 1, est, busca, paiCasou || casaAqui)).join("")}</div>` : ""}`;
}
/* Etiquetas do que está escolhido, agrupadas: área inteira vira uma etiqueta,
   especialidade inteira também — 40 assuntos não viram 40 etiquetas. */
function _etiquetasDaMontagem(arvore, marcados){
  const out = [];
  const visitar = no => {
    const m = _marcacaoDoNo(no, marcados);
    if(m === 2) out.push(no); else if(m === 1) no.filhos.forEach(visitar);
  };
  arvore.forEach(visitar);
  return out;
}
function _htmlArvoreDaMontagem(arvore, est){
  const busca = _normalizarBusca(est.busca);
  return arvore.map(no => _htmlNoDaArvore(no, 1, est, busca, false)).join("") || `<div class="text-sm muted">Nada encontrado para “${escapeHtml(est.busca)}”.</div>`;
}
function _htmlEtiquetasDaMontagem(arvore, est){
  const lista = _etiquetasDaMontagem(arvore, est.marcados);
  return lista.length
    ? lista.map(no => `<span class="chip-filtro">${escapeHtml(no.nome)}<button type="button" class="chip-x" onclick="marcarNoDaMontagem('${escapeHtml(no.id)}')" aria-label="Tirar ${escapeHtml(no.nome)}">${iconeSvg("x")}</button></span>`).join("")
      + `<button type="button" class="link-btn text-xs" onclick="limparMontagem()">limpar tudo</button>`
    : `<span class="text-xs muted">Nada marcado: valem todos os assuntos.</span>`;
}
/* A caixa "em parte" (indeterminate) só existe pelo JS, não pelo HTML. */
function _marcarCaixasEmParte(){ document.querySelectorAll("#montagemArvore [data-meio]").forEach(el => { el.indeterminate = true; }); }
/* Redesenha só a árvore, as etiquetas e a contagem: a busca mantém o foco e
   os outros filtros continuam como estão. */
function desenharArvoreDaMontagem(){
  const alvo = document.getElementById("montagemArvore"); if(!alvo) return;
  const est = _estadoMontagem(), arvore = arvoreDeAssuntos(usuarioAtual().id);
  alvo.innerHTML = _htmlArvoreDaMontagem(arvore, est);
  const etq = document.getElementById("montagemEtiquetas");
  if(etq) etq.innerHTML = _htmlEtiquetasDaMontagem(arvore, est);
  _marcarCaixasEmParte();
  atualizarContagemFiltro();
}
function marcarNoDaMontagem(id){
  const est = _estadoMontagem(), no = _acharNo(arvoreDeAssuntos(usuarioAtual().id), id); if(!no) return;
  const ids = _assuntosDoNo(no), ligar = _marcacaoDoNo(no, est.marcados) !== 2;
  ids.forEach(a => ligar ? est.marcados.add(a) : est.marcados.delete(a));
  desenharArvoreDaMontagem();
}
function abrirNoDaMontagem(id){
  const est = _estadoMontagem();
  est.abertos.has(id) ? est.abertos.delete(id) : est.abertos.add(id);
  desenharArvoreDaMontagem();
}
function buscarNaMontagem(texto){ _estadoMontagem().busca = texto; desenharArvoreDaMontagem(); }
function limparMontagem(){ _estadoMontagem().marcados.clear(); desenharArvoreDaMontagem(); }
/* Atalho: os assuntos em que a pessoa mais erra (a mesma régua da trilha, 05d). */
function marcarAssuntosComMaisErro(){
  const lista = assuntosComMaisErro(usuarioAtual().id, 5);
  if(!lista.length){ toast("Ainda não há respostas suficientes para saber em que você mais erra."); return; }
  const est = _estadoMontagem();
  est.marcados.clear();
  lista.forEach(m => est.marcados.add(m.assuntoId));
  desenharArvoreDaMontagem();
  toast("Marcados os " + lista.length + " assuntos em que você mais erra.");
}

function htmlMontagemLista(u, o){
  const est = _estadoMontagem();
  const caixa = (classe, valor, texto, extra) => `<label class="caixa-chip"${extra || ""}><input type="checkbox" class="${classe}" value="${escapeHtml(String(valor))}"> ${escapeHtml(texto)}</label>`;
  const temErros = assuntosComMaisErro(u.id, 1).length > 0;
  const arvore = arvoreDeAssuntos(u.id);
  setTimeout(_marcarCaixasEmParte, 0);   // a caixa "em parte" só existe depois que o HTML entra na página
  return `
    <div class="mt-2">
      <label class="label" for="montagemBusca">O que você quer estudar?</label>
      <div class="montagem-busca">${iconeSvg("search")}<input class="input" id="montagemBusca" type="search" placeholder="Buscar assunto ou especialidade (ex.: sepse, asma)" value="${escapeHtml(est.busca)}" oninput="buscarNaMontagem(this.value)" autocomplete="off"></div>
      ${temErros ? `<div class="mt-1"><button type="button" class="chip-tempo" onclick="marcarAssuntosComMaisErro()">Meus assuntos com mais erro</button></div>` : ""}
      <div class="montagem-etiquetas" id="montagemEtiquetas" aria-live="polite">${_htmlEtiquetasDaMontagem(arvore, est)}</div>
      <div class="montagem-arvore" id="montagemArvore">${_htmlArvoreDaMontagem(arvore, est)}</div>
      <p class="text-xs muted mt-1">Marque uma área ou especialidade inteira, ou abra (▸) e escolha só os assuntos. Ao lado, quantas questões há e quantas você ainda não fez.</p>
    </div>
    <details class="montagem-mais mt-2" onchange="atualizarContagemFiltro()" ${state.filtroRota.maisFiltrosAbertos ? "open" : ""} ontoggle="state.filtroRota.maisFiltrosAbertos=this.open">
      <summary>Mais filtros <span class="badge badge-accent" id="seloMaisFiltros" style="display:none"></span></summary>
      <div class="grid grid-2 mt-2">
        <div>
          <div class="label mb-1">Instituição</div>
          <div class="caixas-chip">${o.bancas.map(b => caixa("filtroBanca", b, b)).join("")}</div>
        </div>
        <div>
          <div class="flex justify-between items-center mb-1"><div class="label">Ano da prova</div><button type="button" class="link-btn text-xs" onclick="marcarUltimos5Anos()">últimos 5 anos</button></div>
          <div class="caixas-chip">${o.anos.map(a => caixa("filtroAno", a, a)).join("")}</div>
        </div>
        <div>
          <div class="label mb-1">Tipo de prova</div>
          <div class="caixas-chip">${CONFIG.tiposProva.map(t => caixa("filtroTipoProva", t.id, t.nomeLongo, ` title="${escapeHtml(t.descricao)}"`)).join("")}</div>
        </div>
        <div>
          <div class="label mb-1">Situação</div>
          <div class="caixas-chip">
            <label class="caixa-chip"><input type="checkbox" id="filtroApenasErros"> Só erros e chutes</label>
            <label class="caixa-chip"><input type="checkbox" id="filtroApenasFavoritas"> Só favoritas</label>
            <label class="caixa-chip"><input type="checkbox" id="filtroApenasNaoRespondidas"> Só inéditas</label>
            ${o.qtdQuestoesGrupo ? `<label class="caixa-chip"><input type="checkbox" id="filtroIncluirGrupo"> Incluir ${o.idFac && db.questoes.some(q => q.grupoId === o.idFac) ? "do meu grupo e da faculdade" : o.idsMeusGrupos.length > 1 ? "dos meus grupos" : "do meu grupo"} (${o.qtdQuestoesGrupo})</label>` : ""}
          </div>
        </div>
      </div>
      <p class="text-xs muted mt-1">Filtro em branco vale “todos”. Dá para marcar mais de uma instituição, ano e tipo de prova.</p>
    </details>
    <div class="montagem-barra">
      <div class="cresce-220 text-sm" id="contagemFiltro" aria-live="polite">${_htmlContagemAtual(u, { assuntoIds: [...est.marcados], incluirRecentes: !!state.filtroRota.incluirRecentes }, 15)}</div>
      <div class="flex items-center gap-1 quebra">
        <input class="input montagem-qtd" id="filtroTamanho" type="number" value="15" min="1" max="100" title="Número de questões" aria-label="Número de questões" oninput="atualizarContagemFiltro()">
        <button class="btn btn-secondary" onclick="gerarListaPersonalizada(true)">Como simulado</button>
        <button class="btn btn-primary" onclick="gerarListaPersonalizada()">Gerar lista</button>
      </div>
    </div>`;
}

/* Os filtros da lista personalizada, lidos da tela. Uma função só, para a
   contagem ao vivo e o "Gerar lista" nunca discordarem do que está marcado. */
function lerFiltrosPersonalizados(){
  const u = usuarioAtual();
  const marcado = id => { const el = document.getElementById(id); return !!(el && el.checked); };
  return {
    assuntoIds: [..._estadoMontagem().marcados],
    anos: [...document.querySelectorAll(".filtroAno:checked")].map(el=>parseInt(el.value)),
    // mais de uma instituição ou tipo de prova no mesmo conjunto; nenhuma marcada = todas
    bancas: [...document.querySelectorAll(".filtroBanca:checked")].map(el=>el.value),
    tiposProva: [...document.querySelectorAll(".filtroTipoProva:checked")].map(el=>el.value),
    apenasErros: marcado("filtroApenasErros"),
    apenasFavoritas: marcado("filtroApenasFavoritas"),
    apenasNaoRespondidas: marcado("filtroApenasNaoRespondidas"),
    incluirGrupoId: marcado("filtroIncluirGrupo") ? idsDeGruposEFaculdade(u) : undefined,
    incluirRecentes: !!state.filtroRota.incluirRecentes,
  };
}
/* A contagem, com as camadas (o que a lista vai trazer primeiro) e, pequeno,
   o aviso das questões que ficaram de fora por terem sido respondidas há
   pouco, com o botão de recolocá-las (ou de tirá-las de novo). */
function htmlContagemFiltro(c, camadas, qtd){
  if(!c.total) return `${iconeSvg("alert")} <strong>Nenhuma questão</strong> com esses filtros — tire algum para ampliar.`;
  let aviso = "";
  if(c.recentes) aviso = c.incluidas
    ? `<div class="text-xs muted">Estão dentro as ${c.recentes.toLocaleString("pt-BR")} que você respondeu há pouco. <button class="link-btn text-xs" onclick="alternarRecentesNaLista(false)">Tirar de novo</button></div>`
    : `<div class="text-xs muted">${c.recentes.toLocaleString("pt-BR")} ${c.recentes===1?"questão ficou":"questões ficaram"} de fora por você ${c.recentes===1?"tê-la respondido":"tê-las respondido"} há pouco. <button class="link-btn text-xs" onclick="alternarRecentesNaLista(true)">Colocar de volta</button></div>`;
  return `<strong>${c.total.toLocaleString("pt-BR")} ${plural(c.total, "questão", "questões")}</strong>${_estadoMontagem().marcados.size ? "" : ` <span class="muted">(todos os assuntos)</span>`}
    <div class="text-xs muted">${camadas} · a lista de ${Math.min(qtd, c.total)} começa pelas inéditas e erros.</div>${aviso}`;
}
function _htmlContagemAtual(u, filtros, qtd){
  const c = contagemDaListaPersonalizada(u.id, filtros);
  return htmlContagemFiltro(c, c.total ? resumoDasCamadas(u.id, buscarQuestoesPorFiltro(u.id, filtros)) : "", qtd);
}
function atualizarContagemFiltro(){
  const alvo = document.getElementById("contagemFiltro"); if(!alvo) return;
  const u = usuarioAtual(), filtros = lerFiltrosPersonalizados();
  alvo.innerHTML = _htmlContagemAtual(u, filtros, parseInt((document.getElementById("filtroTamanho") || {}).value, 10) || 15);
  const selo = document.getElementById("seloMaisFiltros");
  if(selo){
    const n = filtros.anos.length + filtros.bancas.length + filtros.tiposProva.length + [filtros.apenasErros, filtros.apenasFavoritas, filtros.apenasNaoRespondidas, !!filtros.incluirGrupoId].filter(Boolean).length;
    selo.hidden = !n; selo.style.display = n ? "" : "none"; selo.textContent = n + " " + plural(n, "ligado", "ligados");
  }
}
function alternarRecentesNaLista(incluir){
  state.filtroRota.incluirRecentes = !!incluir;
  atualizarContagemFiltro();
}
function marcarUltimos5Anos(){
  const caixas = [...document.querySelectorAll(".filtroAno")];
  const ultimos = caixas.map(el=>parseInt(el.value)).sort((a,b)=>b-a).slice(0,5);
  caixas.forEach(el=>{ el.checked = ultimos.includes(parseInt(el.value)); });
  atualizarContagemFiltro();
  toast(ultimos.length ? "Selecionados os últimos 5 anos disponíveis: "+ultimos.join(", ") : "Nenhum ano disponível.");
}
/* A lista sai em camadas (inéditas → para revisar → no prazo), como o
   conjunto do assunto; o simulado usa as mesmas questões, embaralhadas. */
function gerarListaPersonalizada(comoSimulado, recomecar){
  const u = usuarioAtual();
  // simulado personalizado deixado pela metade: pergunta antes de gerar outro por cima
  if(comoSimulado === true && !recomecar){
    const mapa = (db.simuladosEmAndamento && db.simuladosEmAndamento[u.id]) || {};
    const chave = Object.keys(mapa).find(k => !mapa[k].simuladoId && /^prova:Simulado personalizado/.test(k) && simuladoEmAndamentoDe(u, k));
    if(chave){ perguntarRecomecarSimulado(chave, `descartarSimuladoEmAndamento('${chave}');gerarListaPersonalizada(true, true)`); return; }
  }
  const tamanho = parseInt(document.getElementById("filtroTamanho").value)||15;
  // simulado corrige sozinho e a dissertativa não tem gabarito: fica de fora dele
  const pool = buscarQuestoesPorFiltro(u.id, lerFiltrosPersonalizados()).filter(q=>comoSimulado!==true || !ehDissertativa(q));
  if(!pool.length){ toast("Nenhuma questão encontrada com esses filtros.", "err"); return; }
  const itens = montarConjuntoEmCamadas(u.id, pool, tamanho, "Lista personalizada");
  if(comoSimulado===true){
    const escolhidas = embaralhar(itens.map(i => getQuestao(i.questaoId)));
    limparDestaquesDasQuestoes(escolhidas.map(q=>q.id));
    state.sessaoAtual = { id:uid("simsessao"), tipo:"simulado", simuladoId:null, titulo:"Simulado personalizado ("+escolhidas.length+" questões)",
      itens: escolhidas.map(q=>({questaoId:q.id, motivo:"Simulado personalizado"})), indiceAtual:0, respostasSimulado:{},
      duracaoMin: escolhidas.length*2, finalizado:false, modoAprendizado:false,
      // sem estes três campos o cronômetro não liga e o tempo por questão
      // não é medido — a análise de "onde você travou" vinha vazia aqui
      inicioMs:Date.now(), tsQuestao:Date.now(), tempos:{} };
    navigate("simulado-ativo");
    return;
  }
  iniciarSessaoComLista(itens, "pratica");
}
