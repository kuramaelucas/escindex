/* codigo/05f-revisao-sugerida.js — revisão sugerida: um conjunto de questões já feitas, de assuntos que a pessoa estudou e não vê há tempo (cálculo, janela e cartão).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   4-D. MOTOR DE ESTUDOS — revisão sugerida
   ==========================================================================
   A repetição espaçada cuida de cada QUESTÃO; esta cuida do ASSUNTO inteiro
   que esfriou: a pessoa já respondeu questões dele (ao menos `minimoRespostas`)
   e a última foi há `diasSemVer` dias ou mais. Os assuntos entram na ordem
   pedida: primeiro os de maior taxa de erro, depois os há mais tempo sem ver.
   A pessoa diz quantas questões quer e o conjunto é preenchido nessa ordem,
   por rodadas de poucas questões por assunto (para um assunto não engolir
   o conjunto). Dentro do assunto vêm primeiro as que errou ou acertou no
   chute e depois as acertadas, da mais antiga para a mais nova. Questão feita há
   menos que o intervalo mínimo de revisão não entra (voltar rápido é reler).
   Não cria grupo nem assunto na plataforma: é só um jeito de montar a sessão. */
const REVISAO_SUGERIDA_TAMANHOS = [10, 20, 30, 50];
let _revisaoSugerida = { n: 20 };

function candidatosDaRevisaoSugerida(usuarioId){
  const k = CONFIG.revisaoSugerida, hoje = hojeISO();
  const ultimaPorQuestao = {}, porAssunto = {};
  db.respostas.forEach(r => {
    if(r.usuarioId !== usuarioId || !r.assuntoId || !r.questaoId) return;
    const a = porAssunto[r.assuntoId] = porAssunto[r.assuntoId] || { assuntoId: r.assuntoId, total: 0, erros: 0, ultima: "" };
    a.total++; if(!r.correta) a.erros++;
    if(r.data && r.data > a.ultima) a.ultima = r.data;
    const antes = ultimaPorQuestao[r.questaoId];
    if(!antes || String(r.respondidaEm || r.data).localeCompare(String(antes.respondidaEm || antes.data)) >= 0) ultimaPorQuestao[r.questaoId] = r;
  });
  const questoes = {};
  questoesParaEstudo(usuarioId).forEach(q => {
    const u = ultimaPorQuestao[q.id];
    if(!u || ehDissertativa(q) || !q.assuntoId || !u.data || diasEntre(u.data, hoje) < CONFIG.intervaloMinimoRevisao) return;
    (questoes[q.assuntoId] = questoes[q.assuntoId] || []).push({ q, errada: !u.correta || u.confianca === "chute", quando: String(u.respondidaEm || u.data) });
  });
  Object.values(questoes).forEach(l => l.sort((a, b) => (b.errada - a.errada) || a.quando.localeCompare(b.quando)));
  const assuntos = Object.values(porAssunto)
    .filter(a => a.total >= k.minimoRespostas && a.ultima && diasEntre(a.ultima, hoje) >= k.diasSemVer && questoes[a.assuntoId] && getAssunto(a.assuntoId))
    .map(a => ({ ...a, taxaErro: a.erros / a.total, dias: diasEntre(a.ultima, hoje), cap: questoes[a.assuntoId].length }))
    .sort((a, b) => b.taxaErro - a.taxaErro || b.dias - a.dias || b.erros - a.erros);
  return { assuntos, questoes };
}

/* Preenche `n` vagas na ordem dos assuntos, `porRodada` questões de cada vez. */
function montarRevisaoSugerida(usuarioId, n, cand){
  n = Math.max(1, Math.min(TRILHA_TAMANHO_MAXIMO, Math.round(Number(n) || 20)));
  cand = cand || candidatosDaRevisaoSugerida(usuarioId);
  const dadas = {}, itens = [];
  for(let rodada = 0; itens.length < n; rodada++){
    let andou = false;
    for(const a of cand.assuntos){
      const ja = dadas[a.assuntoId] || 0, pega = Math.min(CONFIG.revisaoSugerida.porRodada, a.cap - ja, n - itens.length);
      if(pega <= 0) continue;
      cand.questoes[a.assuntoId].slice(ja, ja + pega).forEach(c => itens.push({ questaoId: c.q.id, origem: "revisao_sugerida", assuntoId: a.assuntoId,
        motivo: "Revisão sugerida — " + nomeAssunto(a.assuntoId) + ": erro de " + Math.round(a.taxaErro * 100) + "% e faz " + a.dias + " dias que você não vê · questão " + (c.errada ? "que você errou ou chutou" : "que você acertou") }));
      dadas[a.assuntoId] = ja + pega; andou = true;
      if(itens.length >= n) break;
    }
    if(!andou) break;
  }
  const resumo = cand.assuntos.filter(a => dadas[a.assuntoId]).map(a => ({ ...a, alocadas: dadas[a.assuntoId] }));
  return { itens, resumo, faltaram: n - itens.length, disponiveis: cand.assuntos.reduce((s, a) => s + a.cap, 0) };
}

function abrirRevisaoSugerida(n){
  if(n) _revisaoSugerida.n = n;
  abrirModalTitulado("Revisão sugerida", `
    <p class="text-sm muted">Assuntos em que você já respondeu questões e que não vê há ${CONFIG.revisaoSugerida.diasSemVer} dias ou mais. Entram primeiro os de <strong>maior taxa de erro</strong> e, empatando, os <strong>há mais tempo sem ver</strong>; dentro de cada assunto, as questões que você errou ou chutou vêm antes das acertadas.</p>
    <div class="mt-2 text-sm peso-600">Quantas questões?</div>
    <div class="tempo-atalhos mt-1" id="atalhosRevisaoSugerida">
      ${REVISAO_SUGERIDA_TAMANHOS.map(t => `<button class="chip-tempo" data-n="${t}" onclick="definirTamanhoDaRevisaoSugerida(${t})">${t}</button>`).join("")}
      <input id="tamanhoRevisaoSugerida" type="number" min="1" max="${TRILHA_TAMANHO_MAXIMO}" inputmode="numeric" aria-label="Número de questões" style="width:5rem" oninput="definirTamanhoDaRevisaoSugerida(this.value, true)">
    </div>
    <div class="card-flat text-sm mt-2" id="previaRevisaoSugerida"></div>
    <div class="flex gap-1 mt-3 quebra">
      <button class="btn btn-primary" id="iniciarRevisaoSugerida" onclick="iniciarRevisaoSugerida()">Iniciar revisão</button>
      <button class="btn btn-ghost" onclick="fecharModal()">Cancelar</button>
    </div>`, "lg");
  atualizarRevisaoSugerida();
}
function definirTamanhoDaRevisaoSugerida(valor, deDigitacao){
  _revisaoSugerida.n = Math.max(0, Math.min(TRILHA_TAMANHO_MAXIMO, Math.round(Number(valor) || 0)));
  atualizarRevisaoSugerida(deDigitacao);
}
function atualizarRevisaoSugerida(deDigitacao){
  const campo = document.getElementById("tamanhoRevisaoSugerida"); if(!campo) return;
  if(!deDigitacao || document.activeElement !== campo) campo.value = _revisaoSugerida.n || "";
  document.querySelectorAll("#atalhosRevisaoSugerida .chip-tempo").forEach(b => b.setAttribute("aria-pressed", String(Number(b.dataset.n) === _revisaoSugerida.n)));
  const previa = document.getElementById("previaRevisaoSugerida"), botao = document.getElementById("iniciarRevisaoSugerida");
  botao.disabled = true; botao.textContent = "Iniciar revisão";
  if(_revisaoSugerida.n < 1){ previa.textContent = "Escolha quantas questões quer fazer."; return; }
  const r = montarRevisaoSugerida(usuarioAtual().id, _revisaoSugerida.n);
  if(!r.itens.length){ previa.textContent = "Nenhum assunto esfriou ainda: não há assunto com respostas suas e " + CONFIG.revisaoSugerida.diasSemVer + " dias ou mais sem ver."; return; }
  previa.innerHTML = `<div class="peso-600 mb-1">${r.itens.length} questões, nesta ordem de assuntos</div>` + r.resumo.map((a, i) =>
    `<div class="flex justify-between gap-2 quebra" style="padding:.15rem 0"><span>${i + 1}. ${escapeHtml(nomeAssunto(a.assuntoId))}</span>
      <span class="muted">erro de <strong>${Math.round(a.taxaErro * 100)}%</strong> · ${a.total} respostas · há ${a.dias} dias · <strong>${a.alocadas}</strong> questão(ões)</span></div>`).join("") +
    (r.faltaram > 0 ? `<p class="text-xs muted mt-1">Você pediu ${_revisaoSugerida.n}, mas só há ${r.itens.length} questões de revisão disponíveis agora.</p>` : "");
  botao.disabled = false; botao.textContent = "Iniciar revisão com " + r.itens.length + " questões";
}
function iniciarRevisaoSugerida(){
  const r = montarRevisaoSugerida(usuarioAtual().id, _revisaoSugerida.n);
  if(!r.itens.length){ toast("Não há questões para esta revisão.", "err"); return; }
  fecharModal();
  iniciarSessaoComLista(r.itens, "pratica");
}

/* O cartão nas telas Início/Estudar e Revisão. Só aparece quando algum assunto esfriou. */
function htmlCardRevisaoSugerida(u){
  const cand = candidatosDaRevisaoSugerida(u.id);
  if(!cand.assuntos.length) return "";
  const primeiros = cand.assuntos.slice(0, 3);
  return `<div class="card mt-2">
    <div class="card-title">${iconeSvg("clock")} Revisão sugerida: assuntos que esfriaram</div>
    <p class="text-sm muted">${cand.assuntos.length} assunto(s) em que você já fez questões e não vê há ${CONFIG.revisaoSugerida.diasSemVer} dias ou mais. Começa por ${primeiros.map(a => `<strong>${escapeHtml(nomeAssunto(a.assuntoId))}</strong> (erro de ${Math.round(a.taxaErro * 100)}%, há ${a.dias} dias)`).join(" · ")}.</p>
    <div class="flex gap-1 mt-2 quebra"><button class="btn btn-primary" onclick="abrirRevisaoSugerida()">${iconeSvg("play")} Montar revisão sugerida</button></div>
  </div>`;
}
