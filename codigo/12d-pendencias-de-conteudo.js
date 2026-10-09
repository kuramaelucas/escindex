/* codigo/12d-pendencias-de-conteudo.js — Pendências de conteúdo (seção 26-E): o que falta no banco, calculado do próprio banco (figuras, desatualizadas, aguardando aprovação, provas com número faltando, assuntos sem cartão).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   26-E. PENDÊNCIAS DE CONTEÚDO
   ========================================================================== */
/* A lista nasce do banco, não de um texto escrito à mão: quando alguém libera
   uma figura, atualiza uma questão ou cadastra um cartão, o item sai daqui sozinho.
   O PENDENCIAS.md continua guardando o que não é estrutura (gabarito discutível,
   a história de cada prova). */
const PENDENCIAS_LIMITE_NA_LISTA = 12;

function rotuloDaProva(q){
  return q.banca + " " + anoDaProva(q) + (tipoProvaDe(q)!==CONFIG.tipoProvaPadrao ? " · " + infoTipoProva(tipoProvaDe(q)).nome : "");
}
// questão de prova de verdade (a do banco didático e as enviadas por grupos ficam de fora)
function questoesDeProvaReal(){
  return db.questoes.filter(q => q.real && !q.grupoId);
}
function agruparPorProva(questoes){
  const mapa = new Map();
  for(const q of questoes){
    const chave = q.banca + "|" + q.ano + "|" + (q.semestre||"") + "|" + tipoProvaDe(q);
    if(!mapa.has(chave)) mapa.set(chave, {rotulo:rotuloDaProva(q), banca:q.banca, ano:q.ano, itens:[]});
    mapa.get(chave).itens.push(q);
  }
  return [...mapa.values()].sort((a,b) => b.ano - a.ano || a.rotulo.localeCompare(b.rotulo));
}
// números que faltam entre 1 e o maior número da prova (a prova "vai até" o maior que existe)
function numerosFaltandoNaProva(questoes){
  const nums = new Set(questoes.map(q => q.numeroNaProva).filter(Number.isInteger));
  const maior = Math.max(0, ...nums);
  const faltam = [];
  for(let n = 1; n <= maior; n++) if(!nums.has(n)) faltam.push(n);
  return {faltam, maior};
}
function assuntosSemCartaoDaEquipe(){
  const comCartao = new Set((db.flashcards || []).filter(c => !c.usuarioId).map(c => c.assuntoId));
  return db.taxonomia.assuntos.filter(a => !comCartao.has(a.id));
}
// só os dados, sem HTML: é o que o teste confere e o que a tela desenha
function pendenciasDeConteudo(){
  const reais = questoesDeProvaReal();
  const semFigura = agruparPorProva(reais.filter(q => aguardaImagem(q)));
  semFigura.forEach(g => { g.numeros = g.itens.map(q => q.numeroNaProva).filter(Number.isInteger); });
  const lacunas = agruparPorProva(reais).map(g => {
    const r = numerosFaltandoNaProva(g.itens);
    return {rotulo:g.rotulo, banca:g.banca, ano:g.ano, faltam:r.faltam, maior:r.maior};
  }).filter(g => g.faltam.length);
  const desatualizadas = reais.filter(q => q.status === "desatualizada");
  const aguardando = db.questoes.filter(q => q.status === "pendente" || q.status === "rascunho");
  const semCartao = assuntosSemCartaoDaEquipe();
  return {
    semFigura, lacunas, desatualizadas, aguardando, semCartao,
    total: reais.filter(q => aguardaImagem(q)).length + lacunas.reduce((t, g) => t + g.faltam.length, 0)
      + desatualizadas.length + aguardando.length + semCartao.length,
  };
}

// leva a pessoa ao Banco já filtrado: a pendência só serve se der para agir nela
function abrirPendenciaNoBanco(banca, ano, status){
  state.filtroRota.banco = {busca:"", banca:banca||"", ano:ano ? String(ano) : "", areaId:"", status:status||"", ultimos5:false, tipo:""};
  navigate("banco-questoes");
}
function htmlAvisoDeListaCortada(total){
  return total > PENDENCIAS_LIMITE_NA_LISTA ? `<p class="text-xs muted mt-1">Mostrando ${PENDENCIAS_LIMITE_NA_LISTA} de ${total}.</p>` : "";
}
function htmlLinhaDePendencia(textoHtml, acaoHtml){
  return `<div class="flex justify-between items-center gap-2 card-flat mb-1 quebra"><span class="text-sm">${textoHtml}</span>${acaoHtml || ""}</div>`;
}
function htmlPendenciaSemFigura(p){
  if(!p.semFigura.length) return '<p class="text-sm muted">Nenhuma questão espera figura.</p>';
  return p.semFigura.slice(0, PENDENCIAS_LIMITE_NA_LISTA).map(g => htmlLinhaDePendencia(
    `<strong>${escapeHtml(g.rotulo)}</strong> · ${g.itens.length} questão(ões)${g.numeros.length ? " (nº " + resumirNumeros(g.numeros, 6) + ")" : ""}`,
    `<button class="btn btn-secondary btn-sm" onclick="abrirPendenciaNoBanco('${escapeHtml(g.banca).replace(/'/g, "\\'")}', ${g.ano}, 'aguarda-imagem')">Ver no Banco</button>`
  )).join("") + htmlAvisoDeListaCortada(p.semFigura.length);
}
function htmlPendenciaLacunas(p){
  if(!p.lacunas.length) return '<p class="text-sm muted">Todas as provas estão com a numeração completa.</p>';
  return '<p class="text-xs muted mb-1">A prova “vai até” o maior número que o banco tem; o que falta antes dele aparece aqui. Prova ainda em lotes na Central de Provas também aparece, até ser concluída.</p>'
    + p.lacunas.slice(0, PENDENCIAS_LIMITE_NA_LISTA).map(g => htmlLinhaDePendencia(
      `<strong>${escapeHtml(g.rotulo)}</strong> · faltam nº ${resumirNumeros(g.faltam, 8)} <span class="muted">(vai até a ${g.maior})</span>`
    )).join("") + htmlAvisoDeListaCortada(p.lacunas.length);
}
function htmlPendenciaQuestoes(lista, status, rotuloVazio){
  if(!lista.length) return `<p class="text-sm muted">${rotuloVazio}</p>`;
  return lista.slice(0, PENDENCIAS_LIMITE_NA_LISTA).map(q => htmlLinhaDePendencia(
    `<strong>${escapeHtml(rotuloDaProva(q))}${q.numeroNaProva ? " · nº " + q.numeroNaProva : ""}</strong> · ${escapeHtml(nomeAssunto(q.assuntoId))}${q.motivoStatus ? `<br><span class="text-xs muted">${escapeHtml(q.motivoStatus)}</span>` : ""}`,
    `<button class="btn btn-secondary btn-sm" onclick="abrirQuestaoCompleta('${q.id}')">${iconeSvg("search")} Abrir</button>`
  )).join("") + htmlAvisoDeListaCortada(lista.length)
    + `<button class="link-btn text-xs mt-1" onclick="abrirPendenciaNoBanco('', '', '${status}')">Ver todas no Banco</button>`;
}
function htmlPendenciaSemCartao(p){
  if(!p.semCartao.length) return '<p class="text-sm muted">Todo assunto tem pelo menos um cartão da equipe.</p>';
  const porEspecialidade = {};
  for(const a of p.semCartao){ const e = nomeEspecialidadeDoAssunto(a); (porEspecialidade[e] = porEspecialidade[e] || []).push(a.nome); }
  return Object.entries(porEspecialidade).sort((a, b) => a[0].localeCompare(b[0])).map(([esp, nomes]) =>
    htmlLinhaDePendencia(`<strong>${escapeHtml(esp)}</strong> · ${nomes.map(escapeHtml).join("; ")}`)
  ).join("") + `<div class="mt-1"><button class="btn btn-secondary btn-sm" onclick="navigate('flashcards')">${iconeSvg("cards")} Ir para os flashcards</button></div>`;
}
function nomeEspecialidadeDoAssunto(a){
  const e = getEspecialidade(a.especialidadeId);
  return e ? e.nome : "Sem especialidade";
}

function renderPendenciasDeConteudo(){
  if(!podeUsarCentralProvas()) return renderSemPermissao("conteudo");
  const p = pendenciasDeConteudo();
  const faltamNasProvas = p.lacunas.reduce((t, g) => t + g.faltam.length, 0);
  const secoes = [
    ["pend-figura", iconeSvg("upload") + " Questões esperando figura", p.semFigura.reduce((t, g) => t + g.itens.length, 0), "questão(ões) fora do estudo dos alunos até a figura chegar", htmlPendenciaSemFigura(p)],
    ["pend-lacunas", iconeSvg("archive") + " Provas com número faltando", faltamNasProvas, "questão(ões) a transcrever", htmlPendenciaLacunas(p)],
    ["pend-desatualizadas", iconeSvg("alert") + " Questões desatualizadas", p.desatualizadas.length, "questão(ões) com gabarito ou conduta que mudou", htmlPendenciaQuestoes(p.desatualizadas, "desatualizada", "Nenhuma questão desatualizada.")],
    ["pend-aprovacao", iconeSvg("check") + " Esperando aprovação", p.aguardando.length, "questão(ões) pendente(s) ou em rascunho", htmlPendenciaQuestoes(p.aguardando, "pendente", "Nada esperando aprovação.")],
    ["pend-cartoes", iconeSvg("cards") + " Assuntos sem cartão da equipe", p.semCartao.length, "assunto(s) sem nenhum cartão", htmlPendenciaSemCartao(p)],
  ];
  return `
  <div class="page-header"><h2>Pendências de conteúdo</h2><p>${p.total ? `${p.total} item(ns) esperando a equipe.` : "Nada pendente no banco."} A lista é calculada do banco: o que for resolvido sai daqui sozinho. Gabaritos discutíveis e a história de cada prova continuam no PENDENCIAS.md.</p></div>
  <div class="stat-mini-row mb-2">
    ${secoes.map(s => `<div class="stat-mini"><span class="stat-value">${s[2]}</span><span class="stat-label">${s[3]}</span></div>`).join("")}
  </div>
  ${secoes.map(s => htmlSecaoRecolhivel(s[0], s[1], s[2] + " " + (s[2] ? "pendente(s)" : "· em dia"), s[4], s[2] > 0 && s[2] <= 40)).join("")}`;
}
