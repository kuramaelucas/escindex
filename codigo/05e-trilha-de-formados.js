/* codigo/05e-trilha-de-formados.js — a trilha do cronograma de Formado(a): quais assuntos estão em estudo, quais esperam e por quê (cálculo e tela "Minha trilha").
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   4-C. MOTOR DE ESTUDOS — trilha de Formado(a)
   ==========================================================================
   A fila (SEED_TRILHA_FORMADOS, dados/trilha-formados.js) junta duas coisas:
   o que MAIS CAI nas provas reais (prova recente pesa mais) e o que um
   assunto EXIGE de outro (ex.: pré-natal antes de trabalho de parto; HAS
   antes de DAC crônica). A pessoa não estuda 277 assuntos ao mesmo tempo: só
   os primeiros `assuntosEmEstudo` da fila que ainda não foram consolidados e
   cujos pré-requisitos já foram. Consolidar = respostas suficientes no
   assunto sem errar com frequência (as mesmas regras do nível por assunto,
   05c). Assim a trilha avança no ritmo de quem estuda, e ninguém cai num
   assunto avançado sem a base — e a tela diz o porquê de cada um. */
let _trilhaFormadoCache = { chave: "", valor: null };

const _ordemDeResposta = (a, b) => String(a.respondidaEm || a.data || "").localeCompare(String(b.respondidaEm || b.data || ""));
function _estatisticaDosAssuntosFormado(usuarioId){
  const porAssunto = {};
  // Todas as respostas contam, inclusive as de SIMULADO (que só são gravadas ao finalizar a prova): por isso
  // a ordem é pela hora em que a pessoa respondeu, não pela ordem em que foram gravadas.
  db.respostas.forEach(r => { if(r.usuarioId === usuarioId && r.assuntoId) (porAssunto[r.assuntoId] = porAssunto[r.assuntoId] || []).push(r); });
  Object.values(porAssunto).forEach(l => l.sort(_ordemDeResposta));
  return porAssunto;
}

/* Quando um assunto está consolidado (CONFIG.cronogramaFormado.consolidacao).
   Assunto PEQUENO (menos de `limitePequeno` questões liberadas): a pessoa fez
   ao menos metade das questões dele e acertou mais de 70% nas últimas 10. Assunto GRANDE: mais
   de 50 respostas e 75% de acerto nas últimas 20 — o acerto de agora, não o
   de quando ela começou. O mínimo de respostas evita consolidar por sorte. */
function assuntoConsolidadoFormado(rs, disponiveis){
  const k = CONFIG.cronogramaFormado.consolidacao;
  if(!disponiveis) return true;                                          // sem questão liberada: nada a consolidar, não trava ninguém
  const acerto = lista => lista.length ? lista.filter(r => r.correta).length / lista.length : 0;
  if(disponiveis < k.limitePequeno){
    const feitas = new Set(rs.map(r => r.questaoId)).size;
    const precisa = Math.max(Math.min(CONFIG.cronogramaFormado.minimoParaConsolidar, disponiveis), Math.ceil(disponiveis * k.fracaoFeitaPequeno));
    return feitas >= precisa && acerto(rs.slice(-k.janelaPequeno)) > k.acertoPequeno;
  }
  return rs.length > k.minimoRespostasGrande && acerto(rs.slice(-k.janelaGrande)) >= k.acertoGrande;
}

/* Um assunto que a regra considera consolidado volta para a fila quando
   a pessoa deixou de pensar nele: há `diasSemRevisar` dias sem responder nada
   dele, ou o acerto das últimas 10 caiu abaixo de `acertoParaReabrir`. Devolve o
   motivo (texto que a tela mostra) ou null. Uma resposta nova zera o prazo; se
   ela errar, é o acerto recente que reabre — de verdade, não só no relógio. */
function motivoDeReaberturaFormado(rs, consolidadoPelaRegra){
  const k = CONFIG.cronogramaFormado.reabertura;
  if(!consolidadoPelaRegra || !rs.length) return null;
  const ultima = rs[rs.length - 1], dias = ultima && ultima.data ? diasEntre(ultima.data, hojeISO()) : 0;
  if(dias > k.diasSemRevisar) return "faz " + dias + " dias que você não responde nada deste assunto";
  const recentes = rs.slice(-10);
  if(recentes.length >= k.minimoRespostas && recentes.filter(r => r.correta).length / recentes.length < k.acertoParaReabrir)
    return "o acerto nas últimas 10 caiu para " + Math.round(100 * recentes.filter(r => r.correta).length / recentes.length) + "%";
  return null;
}

/* PULAR UM ASSUNTO ("já domino"). Quem já é experiente não precisa começar
   cada assunto do zero. Só dá para pular assunto que já está liberado (os
   pré-requisitos foram vencidos), então a ordem de construção continua valendo:
   pular a base, sim; pular o avançado sem a base, não. O assunto pulado conta como
   base para os que dependem dele, mas não entra na contagem de consolidados, e
   pode ser desfeito. */
function pularAssuntoDaTrilha(assuntoId){
  const u = usuarioAtual(), t = u && trilhaDeFormado(u.id), it = t && t.itens.find(x => x.id === assuntoId);
  if(!it || !it.liberado || it.consolidado) return;
  abrirModalTitulado("Pular este assunto?", `<div class="modal-body">
    <p class="text-sm"><strong>${escapeHtml(nomeAssunto(assuntoId))}</strong> sai da sua fila e conta como base para os assuntos que dependem dele. Use quando você já domina o tema; as questões dele só voltam se faltar questão nos outros. Você pode desfazer a qualquer momento em “Minha trilha”.</p>
    <div class="flex gap-1 mt-2"><button class="btn btn-primary" onclick="confirmarPuloDaTrilha('${assuntoId}')">Sim, já domino</button><button class="btn btn-ghost" onclick="abrirTrilhaDeFormado()">Cancelar</button></div></div>`);
}
function confirmarPuloDaTrilha(assuntoId){
  const u = usuarioAtual(); if(!u) return;
  u.trilhaPulados = Object.assign({}, u.trilhaPulados, { [assuntoId]: hojeISO() });
  saveState(); toast("Assunto pulado. Ele conta como base para os próximos."); abrirTrilhaDeFormado();
}
function desfazerPuloDaTrilha(assuntoId){
  const u = usuarioAtual(); if(!u || !u.trilhaPulados) return;
  const novo = Object.assign({}, u.trilhaPulados); delete novo[assuntoId];
  u.trilhaPulados = novo; saveState(); abrirTrilhaDeFormado();
}

/* PROJEÇÃO ATÉ A PROVA. Custo de um assunto = respostas que ainda faltam para
   consolidá-lo (pequeno: metade das questões; grande: `respostasAssuntoGrande`);
   o ritmo é a média diária das últimas semanas. Anda pela fila na ordem e vê até
   onde o ritmo chega antes da data da prova, e que ritmo daria a cobertura-meta.
   É uma estimativa, e a tela diz isso. */
function projecaoDaTrilha(usuario, t){
  const alvo = provaAlvoDoUsuario(usuario), k = CONFIG.cronogramaFormado.projecao;
  if(!alvo || !t) return null;
  const desde = somarDias(hojeISO(), -k.diasDeRitmo);
  const feitas = db.respostas.filter(r => r.usuarioId === usuario.id && r.data > desde).length;
  const ritmo = feitas / k.diasDeRitmo, dias = Math.max(1, alvo.dias);
  const custo = it => {
    if(it.misc || it.sem || it.consolidado) return 0;
    const alvoDeRespostas = it.disponiveis < CONFIG.cronogramaFormado.consolidacao.limitePequeno
      ? Math.max(Math.min(CONFIG.cronogramaFormado.minimoParaConsolidar, it.disponiveis), Math.ceil(it.disponiveis * CONFIG.cronogramaFormado.consolidacao.fracaoFeitaPequeno))
      : k.respostasAssuntoGrande;
    return Math.max(1, alvoDeRespostas - it.n);
  };
  const totReais = t.itens.filter(it => !it.misc).reduce((s, it) => s + it.reais, 0) || 1;
  const orcamento = ritmo * dias;
  let gasto = 0, alcanca = null, cobAtual = t.cobertura, cobMeta = t.cobertura, necessario = 0, cobAcum = t.cobertura;
  for(const it of t.itens){
    const cst = custo(it); if(!cst) continue;
    gasto += cst; cobAcum += it.reais / totReais;
    if(gasto <= orcamento){ alcanca = it; cobAtual = cobAcum; }
    if(!necessario && cobAcum >= k.coberturaMeta) necessario = gasto;
  }
  return { alvo, ritmo, orcamento: Math.round(orcamento), alcanca, cobAtual, ritmoNecessario: necessario ? necessario / dias : null, restante: gasto };
}

/* null = sem trilha (conteúdo sem o arquivo). Do contrário:
   { itens: [{id, pos, n, erros, nivel, consolidado, liberado, esperaPor[], disponiveis, reais}],
     emEstudo, proximos, consolidados, total, cobertura } */
function trilhaDeFormado(usuarioId){
  if(typeof SEED_TRILHA_FORMADOS === "undefined" || !SEED_TRILHA_FORMADOS) return null;
  const chave = usuarioId + "|" + (typeof _geracaoDb !== "undefined" ? _geracaoDb : 0) + "|" + db.respostas.length;
  if(_trilhaFormadoCache.chave === chave) return _trilhaFormadoCache.valor;
  const c = CONFIG.cronogramaFormado, { ordem, exige } = SEED_TRILHA_FORMADOS;
  const resp = _estatisticaDosAssuntosFormado(usuarioId), pulados = (getUsuario(usuarioId) || {}).trilhaPulados || {};
  const disponiveis = {}, reais = {};
  questoesParaEstudo(usuarioId).forEach(q => { disponiveis[q.assuntoId] = (disponiveis[q.assuntoId] || 0) + 1; });
  questoesAtivas().forEach(q => { if(q.real) reais[q.assuntoId] = (reais[q.assuntoId] || 0) + 1; });
  const itens = ordem.filter(id => getAssunto(id)).map((id, i) => {
    const rs = resp[id] || [], erros = rs.filter(r => !r.correta).length;
    const sem = !disponiveis[id];
    // assunto com pouquíssimas questões vira "miscelânea": sem fila própria, não trava nem é travado (ver montarSessaoDeFormado)
    const misc = !sem && disponiveis[id] < c.miscelania.minimoPorAssunto;
    const pulado = !!(pulados[id]) && !misc && !sem;
    const porRegra = misc || assuntoConsolidadoFormado(rs, disponiveis[id] || 0);
    const reabertura = pulado || misc || sem ? null : motivoDeReaberturaFormado(rs, porRegra);
    const consolidado = pulado || (porRegra && !reabertura);
    return { id, pos: i + 1, n: rs.length, erros, nivel: nivelDoAssuntoFormado(usuarioId, id).nivel, consolidado, sem, misc, pulado, reabertura,
      // quem depende deste assunto só espera pela REGRA: um assunto reaberto para revisão não tira os de cima da fila
      base: pulado || porRegra,
      disponiveis: disponiveis[id] || 0, reais: reais[id] || 0 };
  });
  const por = Object.fromEntries(itens.map(it => [it.id, it]));
  itens.forEach(it => {
    it.esperaPor = (exige[it.id] || []).filter(p => por[p] && !por[p].base);
    it.liberado = !it.esperaPor.length;
  });
  const pendentes = itens.filter(it => !it.consolidado);   // miscelânea já vem consolidada: fora das filas
  // os reabertos (revisão) vêm primeiro; depois a fila na ordem da demanda
  const abertos = pendentes.filter(it => it.liberado);
  const emEstudo = [...abertos.filter(it => it.reabertura), ...abertos.filter(it => !it.reabertura)].slice(0, c.assuntosEmEstudo);
  const marcados = new Set(emEstudo.map(it => it.id));
  const proximos = pendentes.filter(it => !marcados.has(it.id)).slice(0, 10);
  const totReais = itens.filter(it => !it.misc).reduce((s, it) => s + it.reais, 0) || 1;
  const valor = { itens, emEstudo, proximos, consolidados: itens.filter(it => it.consolidado && !it.sem && !it.misc && !it.pulado).length, total: itens.filter(it => !it.misc).length,
    miscelania: itens.filter(it => it.misc), pulados: itens.filter(it => it.pulado), reabertos: itens.filter(it => it.reabertura), cobertura: itens.filter(it => it.consolidado && !it.sem && !it.misc && !it.pulado).reduce((s, it) => s + it.reais, 0) / totReais };
  _trilhaFormadoCache = { chave, valor };
  return valor;
}

function _linhaDaTrilha(it, comEspera, comPular){
  const a = getAssunto(it.id), esp = getEspecialidade(a.especialidadeId);
  const nivel = ROTULO_NIVEL_FORMADO[it.nivel];
  const andamento = it.n ? `${it.n} resposta(s), ${it.erros} erro(s) · nível ${nivel}` : "ainda não começou";
  const acoes = (comPular && it.liberado && !it.consolidado ? ` · <a href="#" onclick="pularAssuntoDaTrilha('${it.id}'); return false;">já domino, pular</a>` : "") + (it.pulado ? ` · <a href="#" onclick="desfazerPuloDaTrilha('${it.id}'); return false;">desfazer o pulo</a>` : "");
  const reaberto = it.reabertura ? ` <span class="badge badge-amber">revisão: ${escapeHtml(it.reabertura)}</span>` : "";
  const porque = comEspera
    ? (it.esperaPor.length ? `Libera depois de consolidar: ${it.esperaPor.map(nomeAssunto).join("; ")}` : "Entra assim que abrir vaga em “Em estudo”")
    : `${it.reais} questão(ões) real(is) já caíram em prova · nº ${it.pos} na fila`;
  return `<div class="card-flat mt-1"><div class="text-sm"><strong>${escapeHtml(a.nome)}</strong> <span class="muted">· ${escapeHtml(esp ? esp.nome : "")}</span>${reaberto}</div>
    <div class="text-xs muted">${escapeHtml(porque)} · ${escapeHtml(andamento)}${it.n ? ` · <a href="#" onclick="abrirDesempenhoDoAssuntoFormado('${it.id}'); return false;">ver desempenho</a>` : ""}${acoes}</div></div>`;
}

function abrirTrilhaDeFormado(){
  const u = usuarioAtual(), t = u && trilhaDeFormado(u.id), k = CONFIG.cronogramaFormado.consolidacao;
  if(!t){ toast("A trilha ainda não está disponível neste conteúdo.", "err"); return; }
  const pct = Math.round(t.cobertura * 100);
  abrirModalTitulado("Minha trilha de estudos", `
    <div class="modal-body">
      <p class="text-sm">Você consolidou <strong>${t.consolidados} de ${t.total}</strong> assuntos, que juntos respondem por cerca de <strong>${pct}%</strong> das questões reais do banco.</p>
      <div class="progress-track mt-1"><div class="progress-fill" style="width:${Math.min(100, pct)}%"></div></div>
      <div class="card-flat mt-2 text-xs">${iconeSvg("target")} <strong>Como a trilha é montada.</strong> A fila junta o que <em>mais cai nas provas</em> (provas recentes pesam mais) com o que <em>um assunto exige de outro</em>: por exemplo, pré-natal vem antes de trabalho de parto, e hipertensão antes de doença coronariana. Você estuda até <strong>${CONFIG.cronogramaFormado.assuntosEmEstudo} assuntos por vez</strong>. Um assunto fica <strong>consolidado</strong> assim: se ele tem <em>menos de ${k.limitePequeno} questões</em>, quando você já fez pelo menos <strong>metade</strong> delas e acertou <strong>mais de ${Math.round(k.acertoPequeno * 100)}% nas últimas ${k.janelaPequeno}</strong>; se tem ${k.limitePequeno} ou mais, quando você respondeu <strong>mais de ${k.minimoRespostasGrande}</strong> e acertou <strong>${Math.round(k.acertoGrande * 100)}% ou mais nas últimas ${k.janelaGrande}</strong>. Aí ele abre vaga e libera os que dependem dele. Assuntos com menos de ${CONFIG.cronogramaFormado.miscelania.minimoPorAssunto} questões (${t.miscelania.length} hoje) não têm fila própria: as questões deles aparecem de vez em quando, misturadas (cerca de 1 a cada ${Math.round(1 / CONFIG.cronogramaFormado.miscelania.chance)} questões), sem formar um grupo na plataforma. Um assunto consolidado <strong>volta para a fila</strong> como revisão se você ficar ${CONFIG.cronogramaFormado.reabertura.diasSemRevisar} dias sem respondê-lo ou se o acerto das últimas 10 cair abaixo de ${Math.round(CONFIG.cronogramaFormado.reabertura.acertoParaReabrir * 100)}%. Já domina um tema? Use <em>já domino, pular</em>. As respostas de <strong>simulados</strong> contam como as das demais questões. Questões de assuntos fora de “Em estudo” só entram quando as de cima acabam.</div>
      ${htmlProjecaoDaTrilha(u, t)}
      <h4 class="mt-3">Seu desempenho, de 10 em 10 respostas</h4>
      ${graficoDesempenhoEmBlocos(db.respostas.filter(r => r.usuarioId === u.id), 12)}
      <h4 class="mt-3">Em estudo agora (${t.emEstudo.length})</h4>
      ${t.emEstudo.map(it => _linhaDaTrilha(it, false, true)).join("") || '<p class="text-sm muted">Nada pendente: você consolidou tudo o que a trilha tem hoje.</p>'}
      <h4 class="mt-3">Vêm a seguir</h4>
      ${t.proximos.map(it => _linhaDaTrilha(it, true)).join("") || '<p class="text-sm muted">Não há mais assuntos na fila.</p>'}
      ${t.pulados.length ? `<h4 class="mt-3">Que você pulou (${t.pulados.length})</h4>${t.pulados.map(it => _linhaDaTrilha(it, false)).join("")}` : ""}
    </div>`, "lg");
}

/* GRÁFICO DE DESEMPENHO EM BLOCOS DE 10. As respostas, em ordem, são cortadas de
   10 em 10; em cada bloco há uma barra por dificuldade da questão (fácil,
   médio, difícil) com a taxa de acerto DAQUELA dificuldade naquele bloco. Assim
   dá para ver se a pessoa sobe de nível sem perder acerto — uma média única
   esconderia que o acerto no difícil caiu quando ela chegou nele. Dificuldade
   sem questão no bloco fica sem barra (não é 0%). */
const _CORES_NIVEL_FORMADO = ["var(--accent)", "var(--amber)", "var(--danger)"];
function graficoDesempenhoEmBlocos(respostas, maxBlocos){
  const rs = (respostas || []).filter(r => r.questaoId).slice().sort(_ordemDeResposta);
  if(!rs.length) return '<div class="text-xs muted">Sem respostas ainda: o gráfico aparece depois das primeiras 10.</div>';
  const blocos = [];
  for(let i = 0; i < rs.length; i += 10){
    const grupo = rs.slice(i, i + 10), por = [0, 1, 2].map(() => ({ t: 0, a: 0 }));
    grupo.forEach(r => { const q = getQuestao(r.questaoId), nv = q ? nivelDaQuestao(q) : null; if(nv !== null && por[nv]){ por[nv].t++; if(r.correta) por[nv].a++; } });
    blocos.push({ de: i + 1, ate: i + grupo.length, geral: Math.round(100 * grupo.filter(r => r.correta).length / grupo.length), por });
  }
  const mostrados = blocos.slice(-(maxBlocos || 12));
  const larg = 3 * 14 + 22, altura = 120, topo = 16, base = topo + altura, w = 34 + mostrados.length * larg + 8, h = base + 34;
  const grade = [0, 50, 75, 100].map(v => { const y = base - v / 100 * altura;
    return `<line x1="30" y1="${y}" x2="${w - 6}" y2="${y}" stroke="var(--border)" stroke-dasharray="${v ? "2 3" : "0"}"/><text x="26" y="${y + 3.5}" text-anchor="end" font-size="9.5" fill="var(--muted)">${v}</text>`; }).join("");
  const barras = mostrados.map((b, i) => {
    const x0 = 34 + i * larg + 8;
    const col = b.por.map((p, k) => {
      if(!p.t) return "";
      const pct = Math.round(100 * p.a / p.t), alt = Math.max(2, pct / 100 * altura);
      return `<g><title>${ROTULO_NIVEL_FORMADO[k]}: ${pct}% de acerto (${p.a} de ${p.t}) — respostas ${b.de} a ${b.ate}</title><rect x="${x0 + k * 14}" y="${base - alt}" width="12" height="${alt}" rx="2" fill="${_CORES_NIVEL_FORMADO[k]}"/></g>`;
    }).join("");
    return col + `<text x="${x0 + 21}" y="${base + 13}" text-anchor="middle" font-size="9.5" fill="var(--ink-2)">${b.de}–${b.ate}</text><text x="${x0 + 21}" y="${base + 25}" text-anchor="middle" font-size="9" fill="var(--muted)">${b.geral}% geral</text>`;
  }).join("");
  const legenda = ROTULO_NIVEL_FORMADO.map((n, k) => `<span class="text-xs"><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${_CORES_NIVEL_FORMADO[k]};margin-right:.25rem"></span>${n}</span>`).join(" &nbsp; ");
  return `<div style="overflow-x:auto"><svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Taxa de acerto por dificuldade em blocos de 10 respostas">${grade}${barras}</svg></div>
    <div class="mt-1">${legenda} <span class="text-xs muted">· taxa de acerto de cada dificuldade em cada bloco de 10 respostas (simulados incluídos)</span></div>`;
}

function abrirDesempenhoDoAssuntoFormado(assuntoId){
  const u = usuarioAtual(); if(!u) return;
  const rs = db.respostas.filter(r => r.usuarioId === u.id && r.assuntoId === assuntoId);
  abrirModalTitulado("Desempenho — " + nomeAssunto(assuntoId), `<div class="modal-body">${graficoDesempenhoEmBlocos(rs, 14)}</div>`, "lg");
}

function htmlProjecaoDaTrilha(u, t){
  const p = projecaoDaTrilha(u, t);
  if(!p) return "";
  const prova = p.alvo.exata ? `sua prova (${formatDataBR(p.alvo.data)}, ${tempoParaProvaAlvo(p.alvo.dias)})` : `a prova estimada para ${formatDataBR(p.alvo.data)} (${tempoParaProvaAlvo(p.alvo.dias)}) — informe a data exata no Perfil`;
  const meta = Math.round(CONFIG.cronogramaFormado.projecao.coberturaMeta * 100);
  const ritmo = Math.round(p.ritmo * 10) / 10;
  return `<div class="card-flat mt-2 text-xs">${iconeSvg("target")} <strong>Até ${prova}.</strong> Pelo seu ritmo (${ritmo} questões por dia nas últimas ${CONFIG.cronogramaFormado.projecao.diasDeRitmo} dias), dá para consolidar ${p.alcanca ? `até o assunto nº ${p.alcanca.pos} da fila — cerca de <strong>${Math.round(p.cobAtual * 100)}%</strong> das questões reais do banco` : "pouca coisa nova"}.
    ${p.ritmoNecessario ? `Para chegar a ${meta}% de cobertura seria preciso <strong>cerca de ${Math.ceil(p.ritmoNecessario)} questões por dia</strong>.` : `Você já passa de ${meta}% de cobertura.`} É uma estimativa: quem acerta mais cedo consolida com menos questões.</div>`;
}

/* O resumo da trilha que sobe para o Painel da Turma (e que o painel local usa):
   só posição, contagens e ids de assunto — nunca resposta nem taxa de acerto de
   ninguém. `travados` = em estudo com 20 respostas ou mais e ainda sem consolidar. */
function resumoDaTrilha(usuario){
  const t = cronogramaDeFormado(usuario) && trilhaDeFormado(usuario.id);
  if(!t) return null;
  const primeiro = t.itens.find(it => !it.consolidado && !it.misc);
  return { posicao: primeiro ? primeiro.pos : t.total, consolidados: t.consolidados, total: t.total,
    emEstudo: t.emEstudo.map(it => it.id), travados: t.emEstudo.filter(it => it.n >= 20).map(it => it.id),
    reabertos: t.reabertos.map(it => it.id), pulados: t.pulados.map(it => it.id) };
}
/* A coluna `trilha` do perfil: os pulados (que seguem a pessoa) + o resumo (que o painel soma). Null para quem nunca usou. */
function linhaDaTrilhaDoPerfil(usuario){
  const resumo = resumoDaTrilha(usuario);
  if(!resumo && !usuario.trilhaPulados) return null;
  return { pulados: usuario.trilhaPulados || {}, resumo };
}
