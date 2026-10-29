/* codigo/05d-trilha-de-estudos.js — trilha de estudos: sessão montada pela proporção de erro de cada assunto (cálculo, janela de montagem e cartão de sugestão).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   4. MOTOR DE ESTUDOS — trilha por taxa de erro
   ==========================================================================
   A sessão recomendada segue o calendário; a trilha segue o ERRO. Cada assunto
   entra com peso igual à sua taxa de erro: quem erra 40% em um assunto e 20%
   em outro recebe duas questões do primeiro para cada uma do segundo. As
   questões saem misturadas na proporção (não um assunto inteiro e depois o
   outro), porque alternar assuntos fixa mais do que repetir um só.

   Dentro de cada assunto a ordem é: ainda não feitas, depois as erradas (e os
   chutes), depois as certas — e em cada grupo da mais antiga para a mais
   nova. A pessoa escolhe quais grupos entram. */
const TRILHA_MINIMO_DE_RESPOSTAS = 3;     // abaixo disso a taxa de erro de um assunto não diz nada
const TRILHA_PESO_MINIMO = 0.05;          // assunto com 0% de erro ainda aparece de vez em quando
const TRILHA_TAMANHOS = [10, 20, 30, 50];
const TRILHA_TAMANHO_MAXIMO = 200;
// assuntos: os ids marcados na janela (null = ainda não sugeridos); verTodos: mostra a fila inteira dos não marcados
let _trilha = { n: 20, naoFeitas: true, erradas: true, certas: true, foco: 0, assuntos: null, verTodos: false };

/* Taxa de erro por assunto, contando todas as respostas (repetições incluídas):
   é a pergunta "em tal assunto, quanto eu erro?". Do que mais erra ao que menos. */
function taxaDeErroPorAssunto(usuarioId){
  const mapa = {};
  db.respostas.forEach(r => {
    if(r.usuarioId !== usuarioId || !r.assuntoId) return;
    const m = mapa[r.assuntoId] = mapa[r.assuntoId] || { assuntoId: r.assuntoId, total: 0, erros: 0 };
    m.total++; if(!r.correta) m.erros++;
  });
  return Object.values(mapa).map(m => ({ ...m, taxaErro: m.erros / m.total }))
    .sort((a, b) => b.taxaErro - a.taxaErro || b.total - a.total);
}
/* Os assuntos em que mais se erra, com amostra suficiente para valer. */
function assuntosComMaisErro(usuarioId, limite){
  return taxaDeErroPorAssunto(usuarioId)
    .filter(m => m.total >= TRILHA_MINIMO_DE_RESPOSTAS && m.taxaErro > 0 && getAssunto(m.assuntoId))
    .slice(0, limite || 3);
}

/* Divide `n` vagas entre os itens ({id, peso, cap}) na proporção do peso, sem
   passar do que cada um tem (cap). O que um item não comporta volta para a
   divisão dos outros; arredondamento pelo maior resto. */
function distribuirPorPeso(itens, n){
  const alocado = {};
  itens.forEach(i => { alocado[i.id] = 0; });
  let restante = Math.min(n, itens.reduce((s, i) => s + i.cap, 0));
  while(restante > 0){
    const ativos = itens.filter(i => alocado[i.id] < i.cap && i.peso > 0);
    if(!ativos.length) break;
    const soma = ativos.reduce((s, i) => s + i.peso, 0);
    const quotas = ativos.map(i => ({ i, q: restante * i.peso / soma }));
    let dados = 0;
    quotas.forEach(x => {
      const d = Math.min(Math.floor(x.q), x.i.cap - alocado[x.i.id]);
      alocado[x.i.id] += d; dados += d;
    });
    restante -= dados;
    const ordem = quotas.filter(x => alocado[x.i.id] < x.i.cap)
      .sort((a, b) => (b.q - Math.floor(b.q)) - (a.q - Math.floor(a.q)) || b.i.peso - a.i.peso);
    for(const x of ordem){ if(restante <= 0) break; alocado[x.i.id]++; restante--; }
  }
  return alocado;
}

/* Em que grupo a questão está para esta pessoa: "nova", "errada" (última
   resposta errada ou acertada no chute) ou "certa". */
function situacaoDaQuestaoNaTrilha(usuarioId, questaoId){
  const u = ultimaResposta(usuarioId, questaoId);
  if(!u) return "nova";
  return (!u.correta || u.confianca === "chute") ? "errada" : "certa";
}
const ROTULO_SITUACAO_TRILHA = { nova: "ainda não feita", errada: "errada ou chute", certa: "já acertada" };
const ORDEM_SITUACAO_TRILHA = { nova: 0, errada: 1, certa: 2 };

/* As candidatas por assunto (já filtradas pelos grupos aceitos e na ordem de
   apresentação) e os assuntos que têm alguma, com taxa de erro e peso. Fica
   separado da montagem para a janela mostrar a lista inteira, marcada ou não. */
function candidatosDaTrilha(usuarioId, opcoes){
  const aceitas = { nova: !!opcoes.naoFeitas, errada: !!opcoes.erradas, certa: !!opcoes.certas };
  const todas = taxaDeErroPorAssunto(usuarioId);
  const totalGeral = todas.reduce((s, m) => s + m.total, 0);
  const erroGeral = totalGeral ? todas.reduce((s, m) => s + m.erros, 0) / totalGeral : 0.5;
  const taxas = {};
  todas.forEach(m => { taxas[m.assuntoId] = m; });

  const porAssunto = {};
  questoesParaEstudo(usuarioId).forEach(q => {
    if(ehDissertativa(q) || !q.assuntoId) return;
    const sit = situacaoDaQuestaoNaTrilha(usuarioId, q.id);
    if(!aceitas[sit]) return;
    const u = ultimaResposta(usuarioId, q.id);
    (porAssunto[q.assuntoId] = porAssunto[q.assuntoId] || []).push({ q, sit, quando: u ? (u.respondidaEm || u.data) : "" });
  });
  Object.values(porAssunto).forEach(lista => lista.sort((a, b) =>
    ORDEM_SITUACAO_TRILHA[a.sit] - ORDEM_SITUACAO_TRILHA[b.sit]
    || (a.sit === "nova"
      ? (a.q.ano || 0) - (b.q.ano || 0) || (a.q.numeroNaProva || 0) - (b.q.numeroNaProva || 0)
      : String(a.quando).localeCompare(String(b.quando)))));

  const assuntos = Object.keys(porAssunto).map(id => {
    const m = taxas[id];
    const conhecido = !!(m && m.total >= TRILHA_MINIMO_DE_RESPOSTAS);
    // sem amostra, o assunto vale o erro médio da pessoa: nem vira prioridade
    // nem some só porque ela ainda não o conhece
    const taxaErro = conhecido ? m.taxaErro : erroGeral;
    return { id, assuntoId: id, taxaErro, conhecido, respondidas: m ? m.total : 0,
      peso: Math.max(TRILHA_PESO_MINIMO, taxaErro), cap: porAssunto[id].length };
  }).sort((a, b) => (b.conhecido - a.conhecido) || b.taxaErro - a.taxaErro || b.cap - a.cap);
  return { porAssunto, assuntos };
}
/* O que a plataforma sugere marcar: os assuntos de mais erro (com amostra), uns
   3 questões por assunto, ou exatamente `quantos` quando o cartão pede. */
function assuntosSugeridosDaTrilha(cand, n, quantos){
  const comErro = cand.assuntos.filter(a => a.conhecido && a.taxaErro > 0);
  const base = comErro.length ? comErro : cand.assuntos;
  const k = quantos > 0 ? quantos : Math.floor(n / 3);
  return base.slice(0, Math.max(1, Math.min(base.length, k))).map(a => a.id);
}

/* Monta a trilha. `opcoes`: n (quantas), naoFeitas / erradas / certas (quais
   grupos entram) e os assuntos: `assuntos` (ids marcados) ou `foco` (0 = todos;
   N = só os N em que mais erra). Devolve os itens da sessão, o resumo por
   assunto e quantas faltaram. `cand` evita recalcular as candidatas. */
function montarTrilhaPorErro(usuarioId, opcoes, cand){
  const n = Math.max(1, Math.min(TRILHA_TAMANHO_MAXIMO, Math.round(Number(opcoes.n) || 20)));
  cand = cand || candidatosDaTrilha(usuarioId, opcoes);
  const porAssunto = cand.porAssunto;
  let assuntos = cand.assuntos;
  if(opcoes.assuntos){
    const marcados = new Set(opcoes.assuntos);
    assuntos = assuntos.filter(a => marcados.has(a.id));
  }else if(opcoes.foco > 0){
    const piores = new Set(assuntosComMaisErro(usuarioId, opcoes.foco).map(m => m.assuntoId));
    assuntos = assuntos.filter(a => piores.has(a.id));
  }
  const alocado = distribuirPorPeso(assuntos, n);

  // intercala na proporção: a cada passo sai do assunto que tem mais por dar
  // em relação ao que já deu
  const restam = { ...alocado }, usadas = {};
  const itens = [];
  const total = Object.values(alocado).reduce((s, x) => s + x, 0);
  for(let k = 0; k < total; k++){
    let melhor = null, melhorRazao = -1;
    assuntos.forEach(a => {
      if(!restam[a.id]) return;
      const razao = restam[a.id] / alocado[a.id];
      if(razao > melhorRazao || (razao === melhorRazao && a.peso > melhor.peso)){ melhor = a; melhorRazao = razao; }
    });
    const pos = usadas[melhor.id] = usadas[melhor.id] || 0;
    const c = porAssunto[melhor.id][pos];
    usadas[melhor.id]++; restam[melhor.id]--;
    const erroTxt = melhor.conhecido ? "você erra "+Math.round(melhor.taxaErro*100)+"% em "+nomeAssunto(melhor.id) : nomeAssunto(melhor.id)+" (poucas respostas suas ainda)";
    itens.push({ questaoId: c.q.id, origem: "trilha", motivo: "Trilha por erro — "+erroTxt+"; questão "+ROTULO_SITUACAO_TRILHA[c.sit] });
  }
  const resumo = assuntos.filter(a => alocado[a.id]).map(a => {
    const dadas = porAssunto[a.id].slice(0, alocado[a.id]);
    return { assuntoId: a.id, taxaErro: a.taxaErro, conhecido: a.conhecido, respondidas: a.respondidas, alocadas: alocado[a.id],
      novas: dadas.filter(c => c.sit === "nova").length, erradas: dadas.filter(c => c.sit === "errada").length, certas: dadas.filter(c => c.sit === "certa").length };
  }).sort((a, b) => b.taxaErro - a.taxaErro || b.alocadas - a.alocadas);
  return { itens, resumo, faltaram: n - itens.length, disponiveis: assuntos.reduce((s, a) => s + a.cap, 0) };
}

/* ---------- a janela "Trilha de estudos" ------------------------------------
   A plataforma já abre com os assuntos de mais erro marcados e a quantidade de
   cada um. Desmarcar redistribui as questões entre os que ficam; marcar um dos
   "próximos da fila" o inclui na divisão. */
const TRILHA_PROXIMOS_VISIVEIS = 5;
function abrirTrilhaDeEstudos(quantosSugeridos){
  _trilha.foco = quantosSugeridos || 0;
  _trilha.assuntos = null;      // a primeira atualização sugere
  _trilha.verTodos = false;
  const u = usuarioAtual();
  const emAndamento = sessaoDeHoje(u);
  abrirModalTitulado("Trilha de estudos por erro", `
    <p class="text-sm muted">Os assuntos em que você mais erra recebem mais questões: erro de 40% traz o dobro de questões de um assunto com 20%. As questões saem misturadas, na proporção. Desmarque o que não quer ou marque outros assuntos.</p>
    <div class="mt-2 text-sm peso-600">Quantas questões?</div>
    <div class="tempo-atalhos mt-1" id="atalhosTamanhoTrilha">
      ${TRILHA_TAMANHOS.map(t => `<button class="chip-tempo" data-n="${t}" onclick="definirTamanhoDaTrilha(${t})">${t}</button>`).join("")}
      <input id="tamanhoTrilha" type="number" min="1" max="${TRILHA_TAMANHO_MAXIMO}" inputmode="numeric" aria-label="Número de questões" style="width:5rem" oninput="definirTamanhoDaTrilha(this.value, true)">
    </div>
    <div class="mt-2 text-sm peso-600">Quais questões entram (nesta ordem, da mais antiga para a mais nova)</div>
    <div class="mt-1">
      <label class="text-sm" style="display:block"><input type="checkbox" id="trilhaNaoFeitas" ${_trilha.naoFeitas?"checked":""} onchange="mudarOpcaoDaTrilha()"> Ainda não feitas</label>
      <label class="text-sm" style="display:block"><input type="checkbox" id="trilhaErradas" ${_trilha.erradas?"checked":""} onchange="mudarOpcaoDaTrilha()"> Erradas e chutes</label>
      <label class="text-sm" style="display:block"><input type="checkbox" id="trilhaCertas" ${_trilha.certas?"checked":""} onchange="mudarOpcaoDaTrilha()"> Já acertadas</label>
    </div>
    <div class="card-flat text-sm mt-2" id="previaTrilha"></div>
    ${emAndamento ? `<p class="text-xs muted mt-1">Você tem um conjunto de hoje em andamento; iniciar a trilha monta um novo e deixa aquele de lado.</p>` : ""}
    <div class="flex gap-1 mt-3 quebra">
      <button class="btn btn-primary" id="iniciarTrilha" onclick="iniciarTrilhaDeEstudos()">Iniciar trilha</button>
      <button class="btn btn-ghost" onclick="fecharModal()">Cancelar</button>
    </div>`, "lg");
  atualizarJanelaDaTrilha();
}
function definirTamanhoDaTrilha(valor, deDigitacao){
  _trilha.n = Math.max(0, Math.min(TRILHA_TAMANHO_MAXIMO, Math.round(Number(valor) || 0)));
  atualizarJanelaDaTrilha(deDigitacao);
}
function mudarOpcaoDaTrilha(){
  _trilha.naoFeitas = document.getElementById("trilhaNaoFeitas").checked;
  _trilha.erradas = document.getElementById("trilhaErradas").checked;
  _trilha.certas = document.getElementById("trilhaCertas").checked;
  atualizarJanelaDaTrilha(true);
}
function alternarAssuntoDaTrilha(assuntoId){
  const marcados = _trilha.assuntos || [];
  _trilha.assuntos = marcados.includes(assuntoId) ? marcados.filter(id => id !== assuntoId) : [...marcados, assuntoId];
  atualizarJanelaDaTrilha(true);
}
function mostrarTodosOsAssuntosDaTrilha(){ _trilha.verTodos = true; atualizarJanelaDaTrilha(true); }
/* `deDigitacao`: o campo de número não pode ser reescrito debaixo do dedo. */
function atualizarJanelaDaTrilha(deDigitacao){
  const campo = document.getElementById("tamanhoTrilha");
  if(!campo) return;
  if(!deDigitacao || document.activeElement !== campo) campo.value = _trilha.n || "";
  document.querySelectorAll("#atalhosTamanhoTrilha .chip-tempo").forEach(b => b.setAttribute("aria-pressed", String(Number(b.dataset.n) === _trilha.n)));
  const previa = document.getElementById("previaTrilha"), botao = document.getElementById("iniciarTrilha");
  const bloquear = (texto) => { previa.textContent = texto; botao.disabled = true; botao.textContent = "Iniciar trilha"; };
  if(_trilha.n < 1) return bloquear("Escolha quantas questões quer fazer.");
  if(!_trilha.naoFeitas && !_trilha.erradas && !_trilha.certas) return bloquear("Marque ao menos um tipo de questão.");
  const uid_ = usuarioAtual().id;
  const cand = candidatosDaTrilha(uid_, _trilha);
  if(!cand.assuntos.length) return bloquear("Não há questões disponíveis com essas escolhas. Marque outros tipos de questão.");
  if(!_trilha.assuntos) _trilha.assuntos = assuntosSugeridosDaTrilha(cand, _trilha.n, _trilha.foco);
  // mudar os tipos de questão pode tirar um assunto marcado da lista: ele sai da seleção
  const existentes = new Set(cand.assuntos.map(a => a.id));
  _trilha.assuntos = _trilha.assuntos.filter(id => existentes.has(id));
  const marcados = new Set(_trilha.assuntos);
  const t = montarTrilhaPorErro(uid_, { ..._trilha, foco: 0 }, cand);
  const alocadas = {}; t.resumo.forEach(r => { alocadas[r.assuntoId] = r; });
  const doMarcado = cand.assuntos.filter(a => marcados.has(a.id));
  const fila = cand.assuntos.filter(a => !marcados.has(a.id));
  const visiveis = _trilha.verTodos ? fila : fila.slice(0, TRILHA_PROXIMOS_VISIVEIS);
  // quanto o assunto da fila receberia se entrasse: a mesma divisão, com ele
  const comMais = (a) => distribuirPorPeso(cand.assuntos.filter(x => marcados.has(x.id) || x.id === a.id), Math.min(_trilha.n, TRILHA_TAMANHO_MAXIMO))[a.id];
  const erroTxt = (a) => a.conhecido ? `erro de <strong>${Math.round(a.taxaErro*100)}%</strong> · ${a.respondidas} respostas` : "poucas respostas suas";
  const linha = (a, direita) => `<label class="flex justify-between gap-2 quebra" style="padding:.2rem 0;cursor:pointer">
      <span><input type="checkbox" ${marcados.has(a.id)?"checked":""} onchange="alternarAssuntoDaTrilha('${escapeHtml(a.id)}')"> ${escapeHtml(nomeAssunto(a.id))}</span>
      <span class="muted">${erroTxt(a)} · ${direita}</span></label>`;
  previa.innerHTML = `<div class="peso-600 mb-1">Na trilha (${t.itens.length} questões)</div>
    ${doMarcado.length ? doMarcado.map(a => { const r = alocadas[a.id]; return linha(a, `<strong>${r ? r.alocadas : 0}</strong> questão(ões)${r && (r.novas||r.erradas||r.certas) ? " ("+[r.novas?r.novas+" nova(s)":"", r.erradas?r.erradas+" errada(s)":"", r.certas?r.certas+" acertada(s)":""].filter(Boolean).join(", ")+")" : ""}`); }).join("") : '<p class="text-xs muted">Nenhum assunto marcado.</p>'}
    ${fila.length ? `<div class="peso-600 mt-2 mb-1">Próximos da fila (marque para incluir)</div>
      ${visiveis.map(a => linha(a, `+${comMais(a)} se incluir`)).join("")}
      ${fila.length > visiveis.length ? `<button class="link-btn text-xs" onclick="mostrarTodosOsAssuntosDaTrilha()">ver mais ${fila.length - visiveis.length} assunto(s)</button>` : ""}` : ""}
    ${t.faltaram > 0 && t.itens.length ? `<p class="text-xs muted mt-1">Você pediu ${_trilha.n}, mas os assuntos marcados só têm ${t.itens.length} questões com essas escolhas.</p>` : ""}
    <p class="text-xs muted mt-1">As questões se dividem na proporção do erro de cada assunto marcado. Assunto com menos de ${TRILHA_MINIMO_DE_RESPOSTAS} respostas suas entra com o seu erro médio, porque ainda não dá para saber.</p>`;
  botao.disabled = !t.itens.length;
  botao.textContent = t.itens.length ? "Iniciar trilha com "+t.itens.length+" questões" : "Iniciar trilha";
}
function iniciarTrilhaDeEstudos(){
  const t = montarTrilhaPorErro(usuarioAtual().id, { ..._trilha, foco: 0 });
  if(!t.itens.length){ toast("Não há questões disponíveis para esta trilha.", "err"); return; }
  fecharModal();
  iniciarSessaoComLista(t.itens, "pratica");
}

/* O cartão que sugere a trilha, na tela Estudar e no Meu Desempenho. Só aparece
   quando há assunto com erro e amostra suficiente. */
function htmlCardTrilhaSugerida(u){
  const piores = assuntosComMaisErro(u.id, 3);
  if(!piores.length) return "";
  return `<div class="card mt-2">
    <div class="card-title">${iconeSvg("target")} Trilha para corrigir seus erros mais frequentes</div>
    <p class="text-sm muted">${piores.map(p => `<strong>${escapeHtml(nomeAssunto(p.assuntoId))}</strong> (erro de ${Math.round(p.taxaErro*100)}% em ${p.total} respostas)`).join(" · ")}</p>
    <p class="text-xs muted mt-1">A trilha dá mais questões aos assuntos em que você mais erra, começando pelas que você ainda não fez, depois as que errou e por fim as que acertou — das mais antigas para as mais novas.</p>
    <div class="flex gap-1 mt-2 quebra">
      <button class="btn btn-primary" onclick="abrirTrilhaDeEstudos(${piores.length})">${iconeSvg("play")} Montar trilha dos ${piores.length===1?"meu pior assunto":piores.length+" piores assuntos"}</button>
      <button class="btn btn-secondary" onclick="abrirTrilhaDeEstudos(0)">Trilha com todos os assuntos</button>
    </div>
  </div>`;
}
