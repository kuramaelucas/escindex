/* codigo/05g-ciclo-por-tema.js — ciclo por tema: ler o resumo → conjunto planejado de questões → resultado → releitura opcional (seção 4-E).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   4-E. CICLO POR TEMA (docs/PROJETO-INTEGRACAO-RESUMOS.md, seções 2 a 4-B)
   ==========================================================================
   Cada tema tem um CONJUNTO PLANEJADO de até 20 questões, gerado fora do
   navegador (npm run conjuntos-por-tema → resumos/conjuntos-por-tema.js) e
   igual para todos: quem construiu do zero e quem reparou falhas são medidos
   pela mesma régua. A ordem importa: as primeiras cobrem as partes do tema
   que mais caem.

   NADA NOVO É GUARDADO. O estado do tema sai do que já existe:
   - leitura = u.resumosLidos (09e, já sobe para a nuvem);
   - progresso = a PRIMEIRA resposta da pessoa a cada questão do conjunto
     (revisão depois não conta: traz de volta o que ela errou e puxaria o
     acerto para baixo por construção — a mesma regra das fases de Formado);
   - por isso "continuar de onde parou" é automático: o graduando que volta a
     pediatria numa segunda passagem recebe as questões do conjunto que ainda
     não fez, nunca as 20 de novo.

   Quem segue o ciclo:
   - antes do 6º ano: sempre, pelos assuntos do bloco atual do calendário;
     a leitura é OBRIGATÓRIA na primeira passagem (sem ela as questões do tema
     não abrem); depois de lido, reler é opcional;
   - 6º ano e Formado(a) em "do zero": mesma regra (6º ano pelo bloco do
     calendário; Formado pela fila da trilha, dados/trilha-formados.js);
   - "reparar falhas por tema": direto às questões, pela trilha, sem leitura;
   - Formado em "continuar como está": fora do ciclo (cronograma de 05c).
   Tema sem resumo: só as questões, e a tela diz por quê (seção 4-B).
   Fechou o tema com menos de 75% de acerto: sugere reler o resumo — sempre
   opcional, nunca trava o tema seguinte. */
const CICLO_POR_TEMA = { corteDeAcerto: 0.75 };

/* ---------------------------- os conjuntos (carga sob demanda) ---------------------------- */
// Pede resumos/conjuntos-por-tema.js (e o catálogo) na primeira vez e redesenha quando chegam.
function conjuntosPorTema(){
  const c = window.EscResumos && window.EscResumos.conjuntos;
  if(c) return c;
  _carregarScriptDeResumo("conjuntos-por-tema").then(ok => { if(ok) render(); });
  return null;
}
// a chave (pasta do resumo, ou id do assunto sem resumo) cujo conjunto atende o assunto
function temaDoAssunto(assuntoId){
  const c = conjuntosPorTema();
  if(!c) return null;
  for(const chave in c) if(c[chave].assuntos.includes(assuntoId)) return chave;
  return null;
}
function tituloDoTema(chave){
  const c = conjuntosPorTema(), t = c && c[chave];
  if(!t) return chave;
  return t.semResumo ? nomeAssunto(t.assunto) : tituloDoResumo(chave);
}

/* ---------------------------- estado de um tema ---------------------------- */
function _primeirasRespostas(usuarioId){
  const m = new Map();
  for(const r of db.respostas) if(r.usuarioId === usuarioId && !m.has(r.questaoId)) m.set(r.questaoId, r);
  return m;
}
/* { chave, titulo, semResumo, ids (só as que servem agora), feitas, acertos, taxa,
     proximas, concluido, abaixoDoCorte, lidoEm, ultimaData } */
function estadoDoTema(u, chave, primeiras){
  const c = conjuntosPorTema(), t = c && c[chave];
  if(!t) return null;
  primeiras = primeiras || _primeirasRespostas(u.id);
  // questão que saiu do estudo depois de gerado o conjunto (anulada, esperando figura) não conta nem trava
  const ids = t.ids.filter(id => { const q = getQuestao(id); return q && (q.status || "ativa") === "ativa" && !aguardaImagem(q); });
  const feitasR = ids.map(id => primeiras.get(id)).filter(Boolean);
  const acertos = feitasR.filter(r => r.correta).length;
  const concluido = ids.length > 0 && feitasR.length >= ids.length;
  const taxa = feitasR.length ? acertos / feitasR.length : null;
  return {
    chave, titulo: tituloDoTema(chave), semResumo: !!t.semResumo, assunto: t.assunto, ids,
    feitas: feitasR.length, acertos, taxa, concluido,
    proximas: ids.filter(id => !primeiras.has(id)),
    // questões de assunto incorporado ao resumo depois que a pessoa começou: vêm primeiro (lib-conjuntos)
    incorporadas: new Set(t.incorporadas || []),
    novasIncorporadas: feitasR.length ? ids.filter(id => !primeiras.has(id) && (t.incorporadas || []).includes(id)).length : 0,
    abaixoDoCorte: concluido && taxa < CICLO_POR_TEMA.corteDeAcerto,
    lidoEm: t.semResumo ? null : resumoLidoEm(u, chave),
    ultimaData: feitasR.reduce((m, r) => (r.data > m ? r.data : m), ""),
  };
}

/* ---------------------------- quem segue o ciclo e em que ordem ---------------------------- */
// "graduando" | "zero" | "reparar-tema" | null (fora do ciclo)
function caminhoDoCiclo(u){
  u = u || usuarioAtual();
  if(!u || !(u.papel === "aluno" || state.modoAluno)) return null;
  const grupo = grupoDoModoDeInicio(u);
  if(!grupo) return "graduando";
  const modo = modoDeInicio(u);
  return modo === "reparar" ? null : modo;
}
// a leitura trava as questões? Só para quem constrói do zero e só enquanto não leu.
function leituraObrigatoria(u, e){
  const cam = caminhoDoCiclo(u);
  return !!e && !e.semResumo && !e.lidoEm && (cam === "graduando" || cam === "zero");
}
/* Ordem dos assuntos: o bloco atual do calendário (graduando e 6º ano do zero)
   ou a fila da trilha de Formados (Formado do zero e reparar por tema). */
function _assuntosNaOrdemDoCiclo(u){
  const cam = caminhoDoCiclo(u);
  if(!cam) return [];
  const peloCalendario = cam === "graduando" || (cam === "zero" && grupoDoModoDeInicio(u) === "sexto");
  if(peloCalendario){ const b = getBlocoAtual(u); if(b) return assuntoIdsDoBloco(b); }
  return (typeof SEED_TRILHA_FORMADOS !== "undefined" && SEED_TRILHA_FORMADOS && SEED_TRILHA_FORMADOS.ordem) || [];
}
/* { atual, ultimoConcluido, caminho, peloCalendario } — atual = primeiro tema da ordem
   ainda não concluído; ultimoConcluido = o fechado mais recente (para o resultado). */
function cicloDoAluno(u){
  u = u || usuarioAtual();
  const caminho = caminhoDoCiclo(u);
  if(!caminho || !conjuntosPorTema()) return null;
  const peloCalendario = caminho === "graduando" || (caminho === "zero" && grupoDoModoDeInicio(u) === "sexto");
  const primeiras = _primeirasRespostas(u.id), vistos = new Set();
  let atual = null, ultimoConcluido = null;
  for(const a of _assuntosNaOrdemDoCiclo(u)){
    const chave = temaDoAssunto(a);
    if(!chave || vistos.has(chave)) continue;
    vistos.add(chave);
    const e = estadoDoTema(u, chave, primeiras);
    if(!e || !e.ids.length) continue;
    if(e.concluido){ if(!ultimoConcluido || e.ultimaData > ultimoConcluido.ultimaData) ultimoConcluido = e; }
    else if(!atual) atual = e;
  }
  return { atual, ultimoConcluido, caminho, peloCalendario };
}

/* ---------------------------- ações ---------------------------- */
function iniciarQuestoesDoTema(chave){
  const u = usuarioAtual(), e = u && estadoDoTema(u, chave);
  if(!e) return;
  if(leituraObrigatoria(u, e)){ toast("Leia o resumo de " + e.titulo + " primeiro: as questões do tema abrem depois.", "err"); return; }
  if(!e.proximas.length){ toast("Você já fez todas as questões do conjunto deste tema."); return; }
  const total = e.ids.length;
  iniciarSessaoComLista(e.proximas.map(id => ({ questaoId: id,
    motivo: "Conjunto planejado de " + e.titulo + ": questão " + (e.ids.indexOf(id) + 1) + " de " + total + (e.incorporadas.has(id)
      ? " (assunto vizinho incorporado ao resumo: estas vêm primeiro)" : " (escolhidas para cobrir cada parte do tema)") })), "pratica");
}
function lerResumoDoTema(chave){ lerResumoDoAssunto(chave); }

/* ---------------------------- o cartão do Início ---------------------------- */
function _htmlResultadoDoTema(e){
  if(!e) return "";
  const pctTxt = Math.round(e.taxa * 100) + "%";
  if(!e.abaixoDoCorte) return `<p class="text-sm mt-1">${iconeSvg("check")} Último tema fechado: <strong>${escapeHtml(e.titulo)}</strong>, ${pctTxt} de acerto (${e.acertos} de ${e.feitas}).</p>`;
  /* releu depois de fechar? então a sugestão já foi atendida. Estrito (>): a marca de lido guarda só
     o dia, e quem leu ANTES das questões no mesmo dia em que fechou o tema ainda deve ver a sugestão. */
  if(e.lidoEm && e.lidoEm > e.ultimaData) return "";
  return `<div class="card-flat mt-1"><p class="text-sm"><strong>${escapeHtml(e.titulo)}</strong>: ${pctTxt} de acerto (${e.acertos} de ${e.feitas}), abaixo de ${Math.round(CICLO_POR_TEMA.corteDeAcerto * 100)}%.
    ${e.semResumo ? "Este assunto ainda não tem resumo: vale revisar os erros e os cartões dele." : "Recomendamos reler o resumo — ele abre marcado nos trechos em que você errou. É opcional: o próximo tema já está liberado."}</p>
    <div class="flex gap-1 mt-1 quebra">${e.semResumo
      ? `<button class="btn btn-secondary btn-sm" onclick="navigate('revisao')">Revisar os erros</button>`
      : `<button class="btn btn-secondary btn-sm" onclick="lerResumoDoTema('${escapeHtml(e.chave)}')">${iconeSvg("book")} Reler o resumo</button>`}</div></div>`;
}
function htmlCartaoDoCicloPorTema(u){
  if(!CONFIG.integracaoResumos.cicloNoInicio) return "";
  const ciclo = cicloDoAluno(u);
  if(!ciclo) return "";
  const e = ciclo.atual, cam = ciclo.caminho;
  const porque = cam === "graduando" ? "Você constrói o conhecimento do zero pelo calendário: em cada tema do bloco, primeiro o resumo, depois as questões."
    : cam === "zero" ? "Você escolheu construir do zero: primeiro o resumo do tema, depois as questões."
    : "Você escolheu reparar falhas por tema: direto às questões; abaixo de 75% no tema, o resumo é sugerido.";
  let corpo;
  if(!e) corpo = `<p class="text-sm mt-1">Todos os temas ${ciclo.peloCalendario ? "deste bloco" : "da sua trilha"} com conjunto planejado estão fechados. A sessão recomendada segue com revisão e questões novas.</p>`;
  else {
    const obrigatoria = leituraObrigatoria(u, e);
    const passo1 = e.semResumo ? `<li class="text-sm muted">Este assunto ainda não tem resumo: o tema vai direto às questões.</li>`
      : `<li class="text-sm">${e.lidoEm ? `${iconeSvg("check")} Resumo lido em ${formatDataBR(e.lidoEm)}` : obrigatoria ? "<strong>Ler o resumo</strong> (as questões abrem depois)" : "Resumo (opcional neste caminho)"}</li>`;
    const passo2 = `<li class="text-sm">${e.feitas ? `Questões: <strong>${e.feitas} de ${e.ids.length}</strong>${e.feitas ? ` · ${Math.round(e.taxa * 100)}% de acerto até aqui` : ""}` : `<strong>${e.ids.length} questões</strong> escolhidas para cobrir cada parte do tema`}</li>`;
    corpo = `<div class="text-sm mt-1">Tema agora: <strong>${escapeHtml(e.titulo)}</strong></div>
      <ol class="mt-1">${passo1}${passo2}</ol>
      <div class="flex gap-1 mt-1 quebra">
        ${e.semResumo ? "" : `<button class="btn btn-secondary btn-sm" onclick="lerResumoDoTema('${escapeHtml(e.chave)}')">${iconeSvg("book")} ${e.lidoEm ? "Reler o resumo" : "Ler o resumo"}</button>`}
        <button class="btn btn-secondary btn-sm" ${obrigatoria ? "disabled title=\"Leia o resumo primeiro\"" : ""} onclick="iniciarQuestoesDoTema('${escapeHtml(e.chave)}')">${e.feitas ? "Continuar as questões" : "Fazer as questões"}</button>
      </div>`;
  }
  // botões secundários: o Início tem uma só ação principal ("Começar agora"), regra do visual
  return `<div class="card mt-2">
    <div class="card-title">${iconeSvg("book")} Seu tema</div>
    ${explicacaoRecolhida("Por que este tema?", `<p class="text-sm muted">${porque} As questões contam para a sua meta normalmente.</p>`)}
    ${corpo}
    ${_htmlResultadoDoTema(ciclo.ultimoConcluido)}
  </div>`;
}

/* ---------------------------- pós-leitura (no fim do resumo) ----------------------------
   A parte do ciclo que já está no ar (CONFIG.integracaoResumos.posLeitura): marcou o resumo como
   lido, o conjunto planejado do tema aparece logo abaixo. Mesma régua do ciclo — primeira resposta,
   continua de onde parou, < 75% sugere reler — e nada trava. */
function htmlPosLeituraDoResumo(u, resumoId){
  if(!CONFIG.integracaoResumos.posLeitura || !u || !resumoLidoEm(u, resumoId)) return "";
  if(!conjuntosPorTema()) return "";
  const e = estadoDoTema(u, resumoId);
  if(!e || !e.ids.length) return "";
  const pctTxt = e.taxa === null ? "" : Math.round(e.taxa * 100) + "%";
  let linha, botao = "";
  if(!e.feitas) { linha = `Agora, <strong>${e.ids.length} questões pós-leitura</strong>, escolhidas para cobrir cada parte deste tema.`; botao = "Fazer as questões pós-leitura"; }
  else if(!e.concluido) { linha = `Questões pós-leitura: <strong>${e.feitas} de ${e.ids.length}</strong> · ${pctTxt} de acerto até aqui. Você continua das que ainda não fez.` + (e.novasIncorporadas
    ? ` O resumo passou a cobrir um assunto vizinho: ${e.novasIncorporadas === 1 ? "a questão nova vem" : `as <strong>${e.novasIncorporadas} questões novas</strong> vêm`} primeiro.` : ""); botao = "Continuar as questões"; }
  else linha = `Questões pós-leitura feitas: <strong>${pctTxt}</strong> de acerto (${e.acertos} de ${e.feitas}).` + (e.abaixoDoCorte
    ? ` Abaixo de ${Math.round(CICLO_POR_TEMA.corteDeAcerto * 100)}%: vale reler os trechos marcados acima — opcional.` : "");
  return `<div class="resumo-pos-leitura card-flat mt-1 flex justify-between items-center gap-1 quebra"><span class="text-sm">${linha}</span>${botao
    ? `<button class="btn btn-primary btn-sm" onclick="iniciarQuestoesDoTema('${escapeHtml(resumoId)}')">${botao}</button>` : ""}</div>`;
}
