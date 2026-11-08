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

function _estatisticaDosAssuntosFormado(usuarioId){
  const c = CONFIG.cronogramaFormado, porAssunto = {};
  db.respostas.forEach(r => { if(r.usuarioId === usuarioId && r.assuntoId) (porAssunto[r.assuntoId] = porAssunto[r.assuntoId] || []).push(r); });
  Object.keys(porAssunto).forEach(a => { porAssunto[a] = porAssunto[a].slice(-c.janela); });
  return porAssunto;
}

/* null = sem trilha (conteúdo sem o arquivo). Do contrário:
   { itens: [{id, pos, n, erros, nivel, consolidado, liberado, esperaPor[], disponiveis, reais}],
     emEstudo, proximos, consolidados, total, cobertura } */
function trilhaDeFormado(usuarioId){
  if(typeof SEED_TRILHA_FORMADOS === "undefined" || !SEED_TRILHA_FORMADOS) return null;
  const chave = usuarioId + "|" + (typeof _geracaoDb !== "undefined" ? _geracaoDb : 0) + "|" + db.respostas.length;
  if(_trilhaFormadoCache.chave === chave) return _trilhaFormadoCache.valor;
  const c = CONFIG.cronogramaFormado, { ordem, exige } = SEED_TRILHA_FORMADOS;
  const resp = _estatisticaDosAssuntosFormado(usuarioId);
  const disponiveis = {}, reais = {};
  questoesParaEstudo(usuarioId).forEach(q => { disponiveis[q.assuntoId] = (disponiveis[q.assuntoId] || 0) + 1; });
  questoesAtivas().forEach(q => { if(q.real) reais[q.assuntoId] = (reais[q.assuntoId] || 0) + 1; });
  const itens = ordem.filter(id => getAssunto(id)).map((id, i) => {
    const rs = resp[id] || [], erros = rs.filter(r => !r.correta).length;
    const sem = !disponiveis[id];                                      // sem questão liberada: nada a consolidar, não trava ninguém
    const meta = Math.min(c.minimoParaConsolidar, disponiveis[id] || 0);   // assunto com poucas questões se consolida com todas elas
    const consolidado = sem || (rs.length >= meta && (!rs.length || erros / rs.length < c.taxaErroQueSegura));
    return { id, pos: i + 1, n: rs.length, erros, nivel: nivelDoAssuntoFormado(usuarioId, id).nivel, consolidado, sem, meta,
      disponiveis: disponiveis[id] || 0, reais: reais[id] || 0 };
  });
  const por = Object.fromEntries(itens.map(it => [it.id, it]));
  itens.forEach(it => {
    it.esperaPor = (exige[it.id] || []).filter(p => por[p] && !por[p].consolidado);
    it.liberado = !it.esperaPor.length;
  });
  const pendentes = itens.filter(it => !it.consolidado);
  const emEstudo = pendentes.filter(it => it.liberado).slice(0, c.assuntosEmEstudo);
  const marcados = new Set(emEstudo.map(it => it.id));
  const proximos = pendentes.filter(it => !marcados.has(it.id)).slice(0, 10);
  const totReais = itens.reduce((s, it) => s + it.reais, 0) || 1;
  const valor = { itens, emEstudo, proximos, consolidados: itens.filter(it => it.consolidado && !it.sem).length, total: itens.length,
    cobertura: itens.filter(it => it.consolidado && !it.sem).reduce((s, it) => s + it.reais, 0) / totReais };
  _trilhaFormadoCache = { chave, valor };
  return valor;
}

function _linhaDaTrilha(it, comEspera){
  const a = getAssunto(it.id), esp = getEspecialidade(a.especialidadeId);
  const nivel = ROTULO_NIVEL_FORMADO[it.nivel];
  const andamento = it.n ? `${it.n} resposta(s), ${it.erros} erro(s) · nível ${nivel}` : "ainda não começou";
  const porque = comEspera
    ? (it.esperaPor.length ? `Libera depois de consolidar: ${it.esperaPor.map(nomeAssunto).join("; ")}` : "Entra assim que abrir vaga em “Em estudo”")
    : `${it.reais} questão(ões) real(is) já caíram em prova · nº ${it.pos} na fila`;
  return `<div class="card-flat mt-1"><div class="text-sm"><strong>${escapeHtml(a.nome)}</strong> <span class="muted">· ${escapeHtml(esp ? esp.nome : "")}</span></div>
    <div class="text-xs muted">${escapeHtml(porque)} · ${escapeHtml(andamento)}</div></div>`;
}

function abrirTrilhaDeFormado(){
  const u = usuarioAtual(), t = u && trilhaDeFormado(u.id), c = CONFIG.cronogramaFormado;
  if(!t){ toast("A trilha ainda não está disponível neste conteúdo.", "err"); return; }
  const pct = Math.round(t.cobertura * 100);
  abrirModalTitulado("Minha trilha de estudos", `
    <div class="modal-body">
      <p class="text-sm">Você consolidou <strong>${t.consolidados} de ${t.total}</strong> assuntos, que juntos respondem por cerca de <strong>${pct}%</strong> das questões reais do banco.</p>
      <div class="progress-track mt-1"><div class="progress-fill" style="width:${Math.min(100, pct)}%"></div></div>
      <div class="card-flat mt-2 text-xs">${iconeSvg("target")} <strong>Como a trilha é montada.</strong> A fila junta o que <em>mais cai nas provas</em> (provas recentes pesam mais) com o que <em>um assunto exige de outro</em>: por exemplo, pré-natal vem antes de trabalho de parto, e hipertensão antes de doença coronariana. Você estuda até <strong>${c.assuntosEmEstudo} assuntos por vez</strong>. Um assunto fica <strong>consolidado</strong> quando você responde ao menos ${c.minimoParaConsolidar} questões dele e erra menos de ${Math.round(c.taxaErroQueSegura * 100)}%; aí ele abre vaga e libera os que dependem dele. Questões de assuntos fora de “Em estudo” só entram quando as de cima acabam.</div>
      <h4 class="mt-3">Em estudo agora (${t.emEstudo.length})</h4>
      ${t.emEstudo.map(it => _linhaDaTrilha(it, false)).join("") || '<p class="text-sm muted">Nada pendente: você consolidou tudo o que a trilha tem hoje.</p>'}
      <h4 class="mt-3">Vêm a seguir</h4>
      ${t.proximos.map(it => _linhaDaTrilha(it, true)).join("") || '<p class="text-sm muted">Não há mais assuntos na fila.</p>'}
    </div>`, "lg");
}
