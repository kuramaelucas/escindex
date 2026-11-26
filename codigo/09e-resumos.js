/* codigo/09e-resumos.js — Resumos (Beta) (seção 14-B): o caderno de estudo adaptativo de resumos/, dentro de Estudar.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   14-B. RESUMOS (BETA) — o livro-texto que se marca pelo erro de quem lê
   ==========================================================================
   O conteúdo mora em resumos/ (regras em resumos/LEIA-ME.md), fora de dados/:
   o catálogo (resumos/catalogo.js) só chega quando a pessoa abre a tela, e
   cada resumo só quando é aberto — nada disso pesa na abertura do site.

   Cada seção do resumo é ligada às questões reais que ela responde. Pela
   última resposta da pessoa a cada questão (acerto no chute = meio erro), a
   tela pinta, com cor fraca: capítulos e seções no sumário, o ponto-chave em
   que ela erra e a frase do texto ([[frase|q-ids]]) que o explica. Clicar na
   frase acende a cor (de novo, clicar apaga). A legenda diz o que cada cor quer dizer; ao lado da cor vai a contagem
   (erradas/feitas) e, no topo, o erro no assunto inteiro.

   O que é da pessoa reaproveita o que já existe na plataforma:
   - destaques em azul-claro = os destaques de texto (08b), com alvo
     "r:<resumo>:<trecho>"; sobem para a nuvem como os outros;
   - "Flashcard" na barra do trecho selecionado = cartão pessoal (09a), com o
     trecho no verso e o assunto do resumo;
   - feedback = o feedback geral (07), com resumoId (coluna resumo_id).
   O tamanho da letra fica só neste aparelho (localStorage): é escolha de tela. */

const RESUMO_ESCALAS = [0.88, 1, 1.12, 1.25, 1.4];
const RESUMO_CHAVE_FONTE = "esc_resumo_fonte";
const RESUMO_CHAVE_LATERAL = "esc_resumo_sumario_fechado";   // sumário lateral recolhido, por aparelho
const _resumoCargas = {};       // caminho -> Promise da carga do script
let _resumoTextos = {};         // alvo -> texto bruto do trecho (com ** e [[…]]), para repintar após um destaque
let _resumoFrases = [];         // frases ligadas a questões, na ordem da tela: {chave, cap, ids}
let _resumoUltimas = null;      // questaoId -> peso de erro da última resposta da pessoa
let _resumoCasos = {};          // questaoId -> letra escolhida no caso ilustrado (só nesta tela, não vira resposta)

/* ---------------------------- carga sob demanda ---------------------------- */
// Sem ?v=: o service worker busca na rede primeiro, então um resumo corrigido chega sem mexer no código.
function _carregarScriptDeResumo(caminho){
  if(_resumoCargas[caminho]) return _resumoCargas[caminho];
  _resumoCargas[caminho] = new Promise(resolve => {
    const s = document.createElement("script");
    s.src = "resumos/" + caminho + ".js";
    s.onload = () => resolve(true);
    s.onerror = () => { s.remove(); resolve(false); };
    document.head.appendChild(s);
  });
  return _resumoCargas[caminho];
}
function catalogoDeResumos(){ return (window.EscResumos && window.EscResumos.catalogo) || null; }
function resumoCarregado(id){ return ((window.EscResumos && window.EscResumos.lista) || []).find(r => r.id === id) || null; }
// Título para o feedback dos usuários; sem o catálogo ainda, pede e mostra o id enquanto isso.
function tituloDoResumo(id){
  const cat = catalogoDeResumos();
  if(!cat){ _carregarScriptDeResumo("catalogo").then(ok => { if(ok) render(); }); return id; }
  const r = cat.find(x => x.id === id);
  return r ? r.titulo : id;
}

/* ---------------------------- medida do erro ---------------------------- */
function _ultimasRespostasDe(usuarioId){
  const ult = {};
  (db.respostas || []).filter(r => r.usuarioId === usuarioId)
    .sort((a, b) => String(a.respondidaEm || a.data || "").localeCompare(String(b.respondidaEm || b.data || "")))
    .forEach(r => { ult[r.questaoId] = r.correta ? (r.confianca === "chute" ? .5 : 0) : 1; });
  return ult;
}
function _erroDoResumo(ids){
  const feitas = ids.filter(id => id in _resumoUltimas);
  return feitas.length ? feitas.reduce((s, id) => s + _resumoUltimas[id], 0) / feitas.length : null;
}
// Limiares de resumos/LEIA-ME.md: ≥ 50% revisar, 20–49% atenção, < 20% domina.
function _nivelDoResumo(t){ return t === null ? "" : t >= .5 ? "revisar" : t >= .2 ? "atencao" : "dominado"; }
const RESUMO_NOMES = { revisar: "Revise com prioridade", atencao: "Vale revisar", dominado: "Você já domina" };
function _marcaDoResumo(t){
  const n = _nivelDoResumo(t);
  return n ? `<i class="resumo-marca ${n}" title="${RESUMO_NOMES[n]}" aria-label="${RESUMO_NOMES[n]}"></i>` : "";
}

/* ---------------------------- um trecho de texto ---------------------------- */
/* Texto bruto → texto puro + faixas: **negrito**, *itálico* e [[frase|q-ids]].
   As posições valem para o texto puro, que é o que está na tela: é sobre ele
   que os destaques da pessoa (08b) guardam início e fim. */
function _partesDoTrechoDeResumo(bruto){
  let plano = "", abreN = -1, abreI = -1;
  const negritos = [], italicos = [], frases = [];
  const somar = s => {
    for(let k = 0; k < s.length; k++){
      if(s[k] === "*" && s[k + 1] === "*"){ if(abreN < 0) abreN = plano.length; else { negritos.push({ inicio: abreN, fim: plano.length }); abreN = -1; } k++; }
      else if(s[k] === "*"){ if(abreI < 0) abreI = plano.length; else { italicos.push({ inicio: abreI, fim: plano.length }); abreI = -1; } }
      else plano += s[k];
    }
  };
  String(bruto || "").split(/(\[\[[^\]]+\]\])/).forEach(peca => {
    const m = peca.match(/^\[\[(.+)\|([^|\]]+)\]\]$/);
    if(!m){ somar(peca); return; }
    const inicio = plano.length;
    somar(m[1]);
    frases.push({ inicio, fim: plano.length, ids: m[2].split(",").map(x => x.trim()) });
  });
  return { plano, negritos, italicos, frases };
}
function htmlTrechoDeResumo(bruto, alvo){
  const { plano, negritos, italicos, frases } = _partesDoTrechoDeResumo(bruto);
  const meus = destaquesValidosDoTexto(plano, alvo);
  const cortes = new Set([0, plano.length]);
  [negritos, italicos, frases, meus].forEach(l => l.forEach(f => { cortes.add(f.inicio); cortes.add(f.fim); }));
  const pontos = [...cortes].sort((a, b) => a - b);
  const dentro = (lista, de, ate) => lista.find(f => f.inicio <= de && f.fim >= ate);
  let html = "";
  for(let i = 0; i < pontos.length - 1; i++){
    const de = pontos[i], ate = pontos[i + 1];
    if(de === ate) continue;
    let t = escapeHtml(plano.slice(de, ate));
    if(dentro(italicos, de, ate)) t = "<em>" + t + "</em>";
    if(dentro(negritos, de, ate)) t = "<strong>" + t + "</strong>";
    const fr = dentro(frases, de, ate);
    if(fr){
      const k = frases.indexOf(fr), n = _resumoUltimas ? _nivelDoResumo(_erroDoResumo(fr.ids)) : "";
      const cls = n === "dominado" ? "" : n;
      t = `<span class="resumo-frase ${cls}" data-frase="${escapeHtml(alvo + "|" + k)}" onclick="alternarFraseDoResumo(this)"${cls ? ` title="${RESUMO_NOMES[cls]} · clique para acender"` : ""}>${t}</span>`;
    }
    const d = dentro(meus, de, ate);
    if(d) t = `<mark class="destaque" data-destaque="${escapeHtml(d.id)}" title="Clique para remover o destaque">${t}</mark>`;
    html += t;
  }
  return html;
}
// chamado pelo repintarAlvo (08b) depois que a pessoa destaca ou remove um destaque num trecho do resumo
function repintarTrechoDeResumo(el){
  const alvo = el.getAttribute("data-alvo");
  if(alvo in _resumoTextos) el.innerHTML = htmlTrechoDeResumo(_resumoTextos[alvo], alvo);
}
// registra o trecho (para repintar) e anota as frases ligadas a questões (para os pontos-chave apontarem)
function _trechoDestacavel(tag, bruto, alvo, cap, extra){
  _resumoTextos[alvo] = bruto;
  _partesDoTrechoDeResumo(bruto).frases.forEach((f, k) => _resumoFrases.push({ chave: alvo + "|" + k, cap, ids: f.ids }));
  return `<${tag} ${atributoDestacavel(alvo)}${extra || ""}>${htmlTrechoDeResumo(bruto, alvo)}</${tag}>`;
}

/* ---------------------------- frases e navegação ---------------------------- */
function _elementosDaFrase(chave){ return [...document.querySelectorAll(`.resumo-frase[data-frase="${CSS.escape(chave)}"]`)]; }
// clicar na frase acende a cor (e apaga no clique seguinte); o arrasto de quem está selecionando não conta
function alternarFraseDoResumo(el){
  if(haTextoSelecionado()) return;
  const partes = _elementosDaFrase(el.getAttribute("data-frase"));
  const acesa = !el.classList.contains("acesa");
  partes.forEach(p => p.classList.toggle("acesa", acesa));
}
// ponto-chave → a frase do mesmo capítulo que divide mais questões com ele
function _fraseDoPontoChave(cap, ids){
  let melhor = null, max = 0;
  _resumoFrases.forEach(f => {
    if(f.cap !== cap) return;
    const n = ids.filter(id => f.ids.includes(id)).length;
    if(n > max){ max = n; melhor = f; }
  });
  return melhor;
}
function irParaFraseDoResumo(chave){
  const partes = _elementosDaFrase(chave);
  if(!partes.length) return;
  partes.forEach(p => p.classList.add("acesa", "piscando"));
  partes[0].scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => partes.forEach(p => p.classList.remove("piscando")), 1800);
}
// o sumário rola até a seção sem mexer no endereço (o #/rota é do roteador)
// No celular o sumário é gaveta: fecha ao escolher um capítulo ou ao tocar fora (o véu),
// sem gravar a preferência — fechar a gaveta não é "quero o sumário recolhido".
// Guardado em memória (não no aparelho): o redesenho da sincronização refaz o caderno e,
// sem isto, a gaveta que a pessoa acabou de fechar reabria sozinha por cima do texto.
let _resumoLateralAgora = null;
function fecharGavetaDoResumo(){
  _resumoLateralAgora = true;
  const l = document.querySelector(".resumo-layout");
  if(l) l.classList.add("lateral-fechada");
}
function irParaNoResumo(id){
  const el = document.getElementById(id);
  if(window.innerWidth < 900) fecharGavetaDoResumo();
  if(el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------------------------- sumário lateral ----------------------------
   O sumário fica numa coluna à direita do texto (fixa ao rolar) em vez de no topo:
   quem está no meio da leitura navega sem voltar ao início. Recolher é escolha de
   tela, como a letra: fica neste aparelho. No celular a coluna não cabe, então o
   sumário vira uma gaveta que abre por cima e fecha ao escolher o capítulo. */
function _sumarioDoResumoFechado(){
  if(_resumoLateralAgora !== null) return _resumoLateralAgora;
  try { const v = localStorage.getItem(RESUMO_CHAVE_LATERAL); return v === null ? window.innerWidth < 900 : v === "1"; } catch(e){ return window.innerWidth < 900; }
}
function alternarSumarioDoResumo(){
  const el = document.querySelector(".resumo-layout");
  if(!el) return;
  const fechado = el.classList.toggle("lateral-fechada");
  _resumoLateralAgora = fechado;
  try { localStorage.setItem(RESUMO_CHAVE_LATERAL, fechado ? "1" : "0"); } catch(e){ /* sem armazenamento: vale só agora */ }
}

/* ---------------------------- tamanho da letra ---------------------------- */
function _indiceDaFonteDoResumo(){
  try { const i = Number(localStorage.getItem(RESUMO_CHAVE_FONTE)); return Number.isInteger(i) && RESUMO_ESCALAS[i] ? i : 1; } catch(e){ return 1; }
}
function mudarFonteDoResumo(passo){
  const i = Math.max(0, Math.min(RESUMO_ESCALAS.length - 1, _indiceDaFonteDoResumo() + passo));
  try { localStorage.setItem(RESUMO_CHAVE_FONTE, String(i)); } catch(e){ /* sem armazenamento: vale só agora */ }
  const caderno = document.querySelector(".resumo-caderno");
  if(caderno) caderno.style.setProperty("--resumo-escala", RESUMO_ESCALAS[i]);
}

/* ---------------------------- cartão e feedback ---------------------------- */
function _assuntoDoResumoAberto(){
  const r = resumoCarregado(state.filtroRota.resumoAberto);
  return r ? r.assunto : null;
}
// "Flashcard" da barra do trecho selecionado (08b): o trecho vai para o verso
function cartaoDoTrechoSelecionado(){
  const p = _destaquePendente;
  if(!p) return;
  window.getSelection().removeAllRanges();
  esconderBarraDeDestaque();
  abrirFormularioFlashcard(null, { verso: p.trecho, assuntoId: _assuntoDoResumoAberto() });
}
function cartaoDaSecaoDoResumo(fragId){
  const r = resumoCarregado(state.filtroRota.resumoAberto);
  const f = r && r.doencas.flatMap(d => d.fragmentos).find(x => x.id === fragId);
  if(f) abrirFormularioFlashcard(null, { frente: f.titulo, assuntoId: r.assunto });
}

/* ---------------------------- casos ilustrados ----------------------------
   Seção com `casos: [ids]` mostra a questão com figura (foto clínica, radiografia,
   curva) junto do texto: ver o achado ensina mais que descrevê-lo. Tentar a
   alternativa aqui NÃO grava resposta — senão a marcação pelo erro passaria a medir
   o que a pessoa acabou de ler, e não o que ela sabia. */
function _htmlCasoDoResumo(id){
  const q = getQuestao(id);
  if(!q || !q.imagemUrl) return "";
  const escolhida = _resumoCasos[id] || null;
  const alts = q.alternativas.map(a => {
    let cls = "qcard-alt";
    if(escolhida) cls += " disabled" + (a.id === q.gabarito ? " correct" : a.id === escolhida ? " incorrect" : "");
    return `<div class="${cls}"${escolhida ? "" : ` onclick="responderCasoDoResumo('${escapeHtml(id)}','${escapeHtml(a.id)}')"`}><span class="alt-letter">${escapeHtml(a.id)}</span><span class="alt-text">${escapeHtml(a.texto)}</span></div>`;
  }).join("");
  return `<div class="resumo-caso" id="resumo-caso-${escapeHtml(id)}">
    <div class="resumo-rotulo">Caso ilustrado · ${escapeHtml(q.banca || "")} ${escapeHtml(String(q.ano || ""))}</div>
    ${renderImagemQuestao(q)}
    <details id="resumo-caso-det-${escapeHtml(id)}"${escolhida ? " open" : ""}><summary>Ler o caso e tentar responder</summary>
      <div class="resumo-caso-enunciado">${htmlComDestaques(q.enunciado, null, true)}</div>
      <div class="qcard-alts">${alts}</div>
      ${escolhida ? `<div class="feedback-box ${escolhida === q.gabarito ? "ok" : "no"}"><strong>Gabarito: ${escapeHtml(q.gabarito)}.</strong> ${htmlComDestaques(q.explicacaoGeral, null, true)}</div>
        <div class="text-xs muted mt-1">Aqui é só para estudar: esta tentativa não conta no seu desempenho. <button class="link-btn" onclick="responderCasoDoResumo('${escapeHtml(id)}', null)">Tentar de novo</button></div>` : ""}
    </details>
  </div>`;
}
/* Ilustração própria (esquema autoral em resumos/<tema>/figuras/) ou foto de licença livre
   (Wikimedia Commons), para o que nenhuma questão do banco mostra. Foto de terceiros traz
   `credito` (autor e licença) e `fonte` (página do arquivo): a licença CC exige a atribuição. Fundo branco no próprio arquivo, então serve aos dois temas sem trocar cor. */
function _htmlFiguraDoResumo(r, fig){
  const src = `resumos/${r.id}/${fig.arquivo}`;
  return `<figure class="resumo-figura">
    <img src="${escapeHtml(src)}" alt="${escapeHtml(fig.alt || fig.legenda || "")}" loading="lazy" onclick="ampliarFiguraDoResumo(this.src, this.alt)">
    ${fig.legenda || fig.credito ? `<figcaption>${escapeHtml(fig.legenda || "")}${fig.credito ? `<span class="resumo-credito">${fig.fonte ? `<a href="${escapeHtml(fig.fonte)}" target="_blank" rel="noopener">${escapeHtml(fig.credito)}</a>` : escapeHtml(fig.credito)}</span>` : ""}</figcaption>` : ""}
  </figure>`;
}
function ampliarFiguraDoResumo(src, alt){
  abrirModal(`<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" style="width:100%;height:auto;background:#fff;border-radius:8px">`, "lg");
}
function responderCasoDoResumo(id, letra){
  if(letra) _resumoCasos[id] = letra; else delete _resumoCasos[id];
  const el = document.getElementById("resumo-caso-" + id);
  if(el) el.outerHTML = _htmlCasoDoResumo(id);
}

/* ---------------------------- telas ---------------------------- */
/* Abrir um resumo empilha uma entrada no histórico do navegador (mesmo endereço,
   #/resumos): assim o botão voltar do celular ou do navegador fecha o resumo e
   volta à lista dos resumos, em vez de sair da tela de Resumos. */
function abrirResumo(id){
  if(!id && history.state && history.state.resumoAberto){ history.back(); return; }  // o popstate abaixo fecha
  if(id && state.route === "resumos"){ try { history.pushState({ resumoAberto: id }, "", "#/resumos"); } catch(e){ /* abrir por arquivo pode recusar: só não empilha */ } }
  state.filtroRota.resumoAberto = id || null; render(); window.scrollTo(0, 0);
}
window.addEventListener("popstate", function(ev){
  if(state.route !== "resumos" || !state.filtroRota || !state.filtroRota.resumoAberto) return;
  const noHistorico = ev.state && ev.state.resumoAberto;
  if(noHistorico === state.filtroRota.resumoAberto) return;
  state.filtroRota.resumoAberto = noHistorico || null; render(); window.scrollTo(0, 0);
});

/* ---------------------------- lidos ----------------------------
   u.resumosLidos = { resumoId: "AAAA-MM-DD" } (false = desmarcado: a marca de
   "desfiz" precisa viajar para o outro aparelho, senão a união da nuvem a traria
   de volta). Sobe no perfil (perfis.resumos_lidos) e o Painel da Turma conta. */
function resumoLidoEm(u, id){ const v = u && u.resumosLidos && u.resumosLidos[id]; return v || null; }
function quantosResumosLidos(u){ return Object.values((u && u.resumosLidos) || {}).filter(Boolean).length; }
function marcarResumoComoLido(id, lido){
  const u = usuarioAtual();
  if(!u) return;
  u.resumosLidos = Object.assign({}, u.resumosLidos || {}, { [id]: lido ? hojeISO() : false });
  saveState();
  toast(lido ? "Resumo marcado como lido." : "Marca de lido desfeita.");
  render();
}

/* ---------------------------- ligação com o desempenho ----------------------------
   Meu Desempenho e os assuntos fracos levam direto ao resumo do assunto, quando há.
   O catálogo chega sob demanda: na primeira vez o botão não aparece, o catálogo é
   pedido e a tela se redesenha com ele. */
function resumoDoAssunto(assuntoId){
  const cat = catalogoDeResumos();
  if(!cat){ _carregarScriptDeResumo("catalogo").then(ok => { if(ok && state.route !== "resumos") render(); }); return null; }
  return cat.find(r => r.assunto === assuntoId || (Array.isArray(r.assuntos) && r.assuntos.includes(assuntoId))) || null;
}
function botaoLerResumo(assuntoId){
  const r = resumoDoAssunto(assuntoId);
  return r ? `<button class="btn btn-ghost btn-sm" onclick="lerResumoDoAssunto('${escapeHtml(r.id)}')" title="Abrir o resumo: ${escapeHtml(r.titulo)}">${iconeSvg("book")} Ler resumo</button>` : "";
}
/* Cartão de Meu Desempenho (nos dois modos): os resumos dos assuntos em que a
   pessoa mais erra, com pelo menos 3 questões feitas — leitura dirigida pelo erro. */
function htmlResumosDosPontosFracos(u){
  const cat = catalogoDeResumos();
  if(!cat){ resumoDoAssunto(null); return ""; }
  const erros = _erroPorAssunto(u.id);
  const fracos = cat.map(r => ({ r, e: erros[r.assunto] })).filter(x => x.e && x.e.n >= 3 && x.e.e / x.e.n >= .2)
    .sort((a, b) => b.e.e / b.e.n - a.e.e / a.e.n).slice(0, 3);
  if(!fracos.length) return "";
  return `<div class="card mb-2"><div class="card-title">${iconeSvg("book")} Leitura para os seus pontos fracos</div>
    <p class="text-sm muted">Os resumos dos assuntos em que você mais erra (com pelo menos 3 questões feitas). Dentro do resumo, a cor mostra o trecho exato.</p>
    ${fracos.map(x => `<div class="flex justify-between items-center gap-1 card-flat mb-1"><span class="text-sm">${escapeHtml(x.r.titulo)} <span class="text-xs muted">(erro em ${Math.round(x.e.e / x.e.n * 100)}% de ${x.e.n})${resumoLidoEm(u, x.r.id) ? " · lido em " + formatDataBR(resumoLidoEm(u, x.r.id)) : ""}</span></span>
      <button class="btn btn-secondary btn-sm" onclick="lerResumoDoAssunto('${escapeHtml(x.r.id)}')">${iconeSvg("book")} Ler resumo</button></div>`).join("")}</div>`;
}
function lerResumoDoAssunto(id){
  navigate("resumos");
  abrirResumo(id);
}

function renderResumos(){
  const cat = catalogoDeResumos();
  if(!cat){
    _carregarScriptDeResumo("catalogo").then(() => { if(state.route === "resumos") render(); });
    return `<div class="page-header"><h2>Resumos <span class="badge badge-accent">Beta</span></h2></div><div class="empty-state">Carregando os resumos…</div>`;
  }
  const id = state.filtroRota.resumoAberto;
  if(!id || !cat.find(x => x.id === id)) return _renderListaDeResumos(cat);
  const r = resumoCarregado(id);
  if(!r){
    _carregarScriptDeResumo(id + "/resumo").then(ok => { if(state.route === "resumos") render(); if(!ok) toast("Não foi possível abrir este resumo agora. Confira a internet e tente de novo.", "err"); });
    return `<div class="empty-state">Abrindo o resumo…</div>`;
  }
  // o texto dos casos ilustrados vem do arquivo da prova (02b): pede antes de desenhar
  // e o das questões erradas fora do resumo, para localizar a seção provável pelo texto
  const casos = r.doencas.flatMap(d => d.fragmentos.flatMap(f => f.casos || []))
    .concat(_errosForaDoResumo(r, _ultimasRespostasDe(usuarioAtual().id)));
  if(arquivosQueFaltamParaAsQuestoes(casos).length){
    garantirCorpos(casos).then(() => { if(state.route === "resumos") render(); });
    return `<div class="empty-state">Abrindo o resumo…</div>`;
  }
  return _renderCaderno(r);
}

/* A lista: agrupada pelas grandes áreas (a área do assunto do resumo na taxonomia),
   na ordem padrão de MAIOR ERRO da pessoa nas questões do assunto — o que mais
   rende vem primeiro. A pessoa pode trocar para ordem alfabética ou para os
   nunca lidos primeiro; a escolha fica em state.filtroRota.resumoOrdem. */
const RESUMO_ORDENS = { erro: "Onde você mais erra (%)", "erro-qtd": "Mais erros (em número)", alfabetica: "Ordem alfabética", "nao-lidos": "Nunca lidos primeiro" };
function mudarOrdemDosResumos(v){ state.filtroRota.resumoOrdem = RESUMO_ORDENS[v] ? v : "erro"; render(); }
function _erroPorAssunto(usuarioId){
  const ult = _ultimasRespostasDe(usuarioId), soma = {};
  Object.keys(ult).forEach(qid => {
    const q = getQuestao(qid);
    if(!q) return;
    const s = soma[q.assuntoId] || (soma[q.assuntoId] = { e: 0, n: 0 });
    s.e += ult[qid]; s.n++;
  });
  return soma;
}
/* Cada grande área é um bloco expansível. Fechado por padrão e, aberto, mostra só os
   RESUMO_POR_AREA de pior desempenho (os mesmos que a ordem "erro" põe primeiro): a lista
   inteira numa tela só dificultava achar o que estudar. "Mostrar todos" abre o resto. */
const RESUMO_POR_AREA = 5;
function _htmlAreaDeResumos(k, lista, cartao){
  const f = state.filtroRota;
  const aberta = !!(f.resumoAreasAbertas && f.resumoAreasAbertas[k]);
  const todos = !!(f.resumoAreasTodas && f.resumoAreasTodas[k]);
  const porQtd = f.resumoOrdem === "erro-qtd";
  const piores = new Set([...lista].sort((a, b) => porQtd ? ((b.e || 0) - (a.e || 0)) || ((b.t || 0) - (a.t || 0)) || a.r.titulo.localeCompare(b.r.titulo, "pt-BR") : (_faixaDoResumo(b.t) - _faixaDoResumo(a.t)) || ((b.t || 0) - (a.t || 0)) || a.r.titulo.localeCompare(b.r.titulo, "pt-BR")).slice(0, RESUMO_POR_AREA));
  const vistos = todos ? lista : lista.filter(it => piores.has(it));
  const nome = k ? lista[0].area.nome : "Outros";
  const resto = lista.length - vistos.length;
  return `<details class="resumo-area mt-2" id="resumo-area-${escapeHtml(k || "outros")}"${aberta ? " open" : ""} ontoggle="alternarAreaDeResumos('${escapeHtml(k)}', this.open)">
    <summary><h3 class="mb-1" style="display:inline">${escapeHtml(nome)} <span class="text-xs muted peso-400">(${lista.length})</span></h3></summary>
    ${vistos.map(cartao).join("")}
    ${resto > 0 ? `<p class="text-xs muted mb-1">Mostrando os ${vistos.length} de pior desempenho. <button class="link-btn" onclick="mostrarTodosOsResumosDaArea('${escapeHtml(k)}', true)">Mostrar todos (${lista.length})</button></p>` : (todos && lista.length > RESUMO_POR_AREA ? `<p class="text-xs muted mb-1"><button class="link-btn" onclick="mostrarTodosOsResumosDaArea('${escapeHtml(k)}', false)">Mostrar só os ${RESUMO_POR_AREA} de pior desempenho</button></p>` : "")}
  </details>`;
}
function alternarAreaDeResumos(k, aberta){
  const f = state.filtroRota;
  f.resumoAreasAbertas = Object.assign({}, f.resumoAreasAbertas, { [k]: aberta });
}
function mostrarTodosOsResumosDaArea(k, todos){
  const f = state.filtroRota;
  f.resumoAreasTodas = Object.assign({}, f.resumoAreasTodas, { [k]: todos });
  render();
}
function _renderListaDeResumos(cat){
  const u = usuarioAtual();
  const ordem = RESUMO_ORDENS[state.filtroRota.resumoOrdem] ? state.filtroRota.resumoOrdem : "erro";
  const erros = _erroPorAssunto(u.id);
  const itens = cat.map(r => {
    const e = erros[r.assunto];
    const area = areaDeAssunto(r.assunto);
    return { r, t: e && e.n ? e.e / e.n : null, n: e ? e.n : 0, e: e ? e.e : 0, lido: resumoLidoEm(u, r.id), area };
  });
  const porNome = (a, b) => a.r.titulo.localeCompare(b.r.titulo, "pt-BR");
  const ordens = {
    // sem resposta fica depois de quem erra e antes de quem domina (mesma regra do caderno, _faixaDoResumo)
    erro: (a, b) => (_faixaDoResumo(b.t) - _faixaDoResumo(a.t)) || ((b.t || 0) - (a.t || 0)) || porNome(a, b),
    // quantidade absoluta de erros: 12 erros em 60 questões pesa mais que 2 em 3
    "erro-qtd": (a, b) => ((b.e || 0) - (a.e || 0)) || ((b.t || 0) - (a.t || 0)) || porNome(a, b),
    alfabetica: porNome,
    "nao-lidos": (a, b) => (!!a.lido - !!b.lido) || (_faixaDoResumo(b.t) - _faixaDoResumo(a.t)) || ((b.t || 0) - (a.t || 0)) || porNome(a, b),
  };
  itens.sort(ordens[ordem]);
  const ordemDasAreas = (db.areas || []).map(a => a.id);
  const grupos = {};
  itens.forEach(it => { const k = it.area ? it.area.id : ""; (grupos[k] = grupos[k] || []).push(it); });
  const chaves = Object.keys(grupos).sort((a, b) => (a === "") - (b === "") || ordemDasAreas.indexOf(a) - ordemDasAreas.indexOf(b));
  const lidos = itens.filter(it => it.lido).length;
  const cartao = it => `<div class="card mb-1">
      <div class="flex justify-between items-center gap-2 quebra">
        <div class="cresce-220"><div class="text-xs muted">${escapeHtml(it.r.area || "")}</div>
          <div class="card-title">${escapeHtml(it.r.titulo)} ${_marcaDoResumo(it.t)}</div>
          <div class="text-xs muted">${it.t === null ? "Você ainda não respondeu questões deste assunto" : RESUMO_NOMES[_nivelDoResumo(it.t)] + " — " + it.e + " " + plural(it.e, "erro", "erros") + " em " + it.n + " " + plural(it.n, "questão", "questões") + " (" + Math.round(it.t * 100) + "%)"}${it.lido ? " · <strong>lido em " + formatDataBR(it.lido) + "</strong>" : " · nunca lido"}</div></div>
        <button class="btn ${it.lido ? "btn-secondary" : "btn-primary"} btn-sm" onclick="abrirResumo('${escapeHtml(it.r.id)}')">${it.lido ? "Reler" : "Ler"}</button>
      </div></div>`;
  return `<div class="page-header"><h2>Resumos <span class="badge badge-accent">Beta</span></h2>
    <p>Textos de estudo escritos a partir das questões de prova. Cada parte do texto é ligada às questões que ela responde, e a cor mostra onde você mais erra.</p></div>
    <div class="card-flat mb-2 text-sm">${iconeSvg("alert")} Em teste: o texto ainda está sendo conferido nas fontes primárias. Achou erro ou tem sugestão? Dentro do resumo há um botão de feedback.</div>
    <div class="flex justify-between items-center gap-1 quebra mb-2">
      <span class="text-sm muted">${lidos} de ${itens.length} ${plural(itens.length, "resumo lido", "resumos lidos")}</span>
      <label class="text-sm flex items-center gap-1">Ordem
        <select class="select" aria-label="Ordem dos resumos" onchange="mudarOrdemDosResumos(this.value)">${Object.entries(RESUMO_ORDENS).map(([k, v]) => `<option value="${k}" ${k === ordem ? "selected" : ""}>${v}</option>`).join("")}</select></label>
    </div>
    ${ordem === "erro-qtd" ? `<p class="text-xs muted mb-2">Dentro de cada grande área, primeiro os resumos com mais questões erradas em número absoluto, mesmo que a porcentagem seja menor.</p>` : ""}
    ${ordem === "erro" ? `<p class="text-xs muted mb-2">Dentro de cada grande área, primeiro os resumos dos assuntos em que você mais erra, depois os que você ainda não respondeu e por último os que já domina.</p>` : ""}
    ${chaves.map(k => _htmlAreaDeResumos(k, grupos[k], cartao)).join("")}`;
}

// Ordem: o que a pessoa erra (tijolo, depois ocre) → o que ela ainda não respondeu →
// o que já domina (verde). Sem resposta vem antes do verde porque é matéria nunca
// medida: estudar o que já se domina primeiro seria gastar tempo no que menos rende.
function _faixaDoResumo(t){ return t === null ? 1 : t >= .2 ? 2 : 0; }
function _ordenarPorErro(lista){
  return lista.sort((a, b) => (_faixaDoResumo(b.t) - _faixaDoResumo(a.t)) || ((b.t || 0) - (a.t || 0)) || a.i - b.i);
}

/* ---------------------------- desempenho no assunto ----------------------------
   O resumo não se adapta às questões, mas mede e localiza o erro: a pessoa vê quanto
   erra no assunto inteiro (todas as questões dele, não só as ligadas a uma seção),
   quanto erra em cada seção e, para a questão errada que nenhuma seção cita, a seção
   cujo texto mais se parece com o dela (palavras raras em comum) — com o aviso de que
   é um palpite. Nada disso é guardado: sai das respostas a cada abertura. */
function _assuntosDoResumo(r){
  const c = (catalogoDeResumos() || []).find(x => x.id === r.id) || r;
  return new Set([c.assunto].concat(c.assuntos || []).filter(Boolean));
}
function _idsLigadosAoResumo(r){ return new Set(r.doencas.flatMap(d => d.fragmentos.flatMap(f => f.questoes.concat(f.casos || [])))); }
// questões do assunto que a pessoa errou (ou acertou no chute) e que nenhuma seção cita
function _errosForaDoResumo(r, ult){
  const ass = _assuntosDoResumo(r), ligados = _idsLigadosAoResumo(r);
  return Object.keys(ult).filter(id => ult[id] > 0 && !ligados.has(id) && ass.has((getQuestao(id) || {}).assuntoId));
}
const _RESUMO_PALAVRAS_VAZIAS = new Set("sobre entre quando qual quais assinale alternativa correta incorreta paciente anos idade apresenta seguinte seguintes mais menos pode podem deve devem como para pela pelo com sem dos das nos nas uma umas este esta esse essa isso caso exame exames achado diagnostico conduta tratamento".split(" "));
function _palavrasDoTexto(t){
  return new Set(String(t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\[\[|\]\]|\|[^\]\s]*|\{[^}]*\}|\*/g, " ")
    .split(/[^a-z0-9]+/).filter(w => w.length >= 5 && !_RESUMO_PALAVRAS_VAZIAS.has(w)));
}
// devolve { questaoId: fragmento } para os erros que dá para localizar com alguma confiança
function _localizarErros(r, ids){
  const secoes = r.doencas.flatMap(d => d.fragmentos.map(f => ({ f, cap: d, p: _palavrasDoTexto([d.titulo, f.titulo, f.prosa, f.texto].join(" ")) })));
  const freq = {};
  secoes.forEach(s => s.p.forEach(w => { freq[w] = (freq[w] || 0) + 1; }));
  const achados = {};
  ids.forEach(id => {
    const q = getQuestao(id);
    let texto;
    try { texto = [q.enunciado, (q.alternativas || []).map(a => a.texto || a).join(" "), q.explicacao].join(" "); } catch(e){ return; }
    const pq = _palavrasDoTexto(texto);
    let melhor = null, segunda = 0;
    secoes.forEach(s => {
      // palavra que aparece em poucas seções pesa mais: é ela que diz "de qual parte" é a questão
      let nota = 0; pq.forEach(w => { if(s.p.has(w)) nota += 1 / freq[w]; });
      if(!melhor || nota > melhor.nota){ segunda = melhor ? melhor.nota : 0; melhor = { s, nota }; } else if(nota > segunda) segunda = nota;
    });
    if(melhor && melhor.nota >= 2 && melhor.nota >= segunda * 1.3) achados[id] = melhor.s.f;
  });
  return achados;
}
function _htmlDesempenhoNoAssunto(r, ult, todas){
  const ass = _assuntosDoResumo(r);
  const doAssunto = Object.keys(ult).filter(id => ass.has((getQuestao(id) || {}).assuntoId) || todas.includes(id));
  if(!doAssunto.length) return "";
  const erro = doAssunto.reduce((s, id) => s + ult[id], 0) / doAssunto.length;
  const erradas = doAssunto.filter(id => ult[id] > 0);
  const fora = _errosForaDoResumo(r, ult);
  const local = _localizarErros(r, fora);
  const porSecao = {};
  fora.forEach(id => { const f = local[id]; const k = f ? f.id : ""; (porSecao[k] = porSecao[k] || []).push(id); });
  const nomeQ = id => { const q = getQuestao(id); return escapeHtml(q ? [q.banca, q.ano].filter(Boolean).join(" ") + (q.numeroNaProva ? " · Q" + q.numeroNaProva : "") : id); };
  const linhas = Object.keys(porSecao).sort((a, b) => (a === "") - (b === "")).map(k => {
    const f = k ? r.doencas.flatMap(d => d.fragmentos).find(x => x.id === k) : null;
    return `<li>${f ? `<button class="link-btn" onclick="irParaNoResumo('resumo-s-${escapeHtml(f.id)}')">${escapeHtml(f.titulo)}</button>` : "Sem seção provável"}: ${porSecao[k].map(nomeQ).join(", ")}</li>`;
  }).join("");
  return `<div class="resumo-desempenho">
    <div><strong>Seu desempenho no assunto:</strong> erro em ${Math.round(erro * 100)}% de ${doAssunto.length} ${plural(doAssunto.length, "questão feita", "questões feitas")} (${erradas.length} ${plural(erradas.length, "errada ou no chute", "erradas ou no chute")}; acerto no chute conta meio erro).</div>
    ${fora.length ? `<div>${fora.length} ${plural(fora.length, "erro seu não está ligado", "erros seus não estão ligados")} a nenhuma seção. Pelo texto da questão, a parte do resumo que provavelmente ${plural(fora.length, "o explica", "os explica")} (palpite):<ul class="resumo-erros-fora">${linhas}</ul></div>` : ""}
  </div>`;
}
// "2 de 5 erradas" ao lado da cor: a cor diz a faixa, o número diz quanto
function _contagemDaSecao(ids){
  if(!_resumoUltimas) return "";
  const feitas = ids.filter(id => id in _resumoUltimas);
  if(!feitas.length) return "";
  const err = feitas.filter(id => _resumoUltimas[id] > 0).length;
  return `<span class="resumo-contagem" title="Questões ligadas a esta parte: erradas (ou no chute) de feitas">${err}/${feitas.length}</span>`;
}

function _renderCaderno(r){
  const u = usuarioAtual();
  _resumoUltimas = _ultimasRespostasDe(u.id);
  const ultTodas = _resumoUltimas;
  _resumoTextos = {}; _resumoFrases = [];
  const todas = [...new Set(r.doencas.flatMap(d => d.fragmentos.flatMap(f => f.questoes)))];
  const feitas = todas.filter(id => id in _resumoUltimas).length;
  // sem nenhuma questão feita, não há o que marcar: o caderno fica na ordem do autor
  if(!feitas) _resumoUltimas = null;
  const medir = ids => _resumoUltimas ? _erroDoResumo(ids) : null;
  const caps = r.doencas.map((d, i) => ({ d, i, ids: [...new Set(d.fragmentos.flatMap(f => f.questoes))], t: medir([...new Set(d.fragmentos.flatMap(f => f.questoes))]),
    secoes: d.fragmentos.map((f, j) => ({ f, i: j, t: medir(f.questoes) })) }));
  if(_resumoUltimas){ _ordenarPorErro(caps); caps.forEach(c => _ordenarPorErro(c.secoes)); }

  // o corpo primeiro: as frases precisam estar registradas antes dos pontos-chave procurarem por elas
  const corpo = caps.map(({ d, secoes }, c) => {
    const intro = (d.introducao || "").split(/\n\s*\n/).filter(p => p.trim())
      .map((p, k) => _trechoDestacavel("p", p.trim(), `r:${r.id}:${d.id}:i${k}`, d.id)).join("");
    const secs = secoes.map((s, k) => _htmlSecaoDoResumo(r, d.id, `${c + 1}.${k + 1}`, s));
    return { d, c, intro, secs };
  });
  const sumario = caps.map(({ d, t, ids, secoes }, c) => `<li class="resumo-cap-item">
      <div class="resumo-linha"><span class="resumo-num">${c + 1}</span><button class="resumo-link forte" onclick="irParaNoResumo('resumo-c-${escapeHtml(d.id)}')">${escapeHtml(d.titulo)}</button>${_marcaDoResumo(t)}${_contagemDaSecao(ids)}</div>
      <ol class="resumo-sub">${secoes.map(({ f, t }, k) => `<li class="resumo-linha"><span class="resumo-num">${c + 1}.${k + 1}</span><button class="resumo-link" onclick="irParaNoResumo('resumo-s-${escapeHtml(f.id)}')">${escapeHtml(f.titulo)}</button>${_marcaDoResumo(t)}${_contagemDaSecao(f.questoes)}</li>`).join("")}</ol>
    </li>`).join("");

  return `<div class="flex justify-between items-center gap-1 quebra mb-2">
      <button class="link-btn" onclick="abrirResumo(null)">← Todos os resumos</button>
      <div class="flex gap-1 items-center quebra">
        <button class="btn btn-ghost btn-sm" onclick="alternarSumarioDoResumo()" aria-label="Mostrar ou recolher o sumário">${iconeSvg("menu")} Sumário</button>
        <span class="text-xs muted">Letra</span>
        <button class="btn btn-ghost btn-sm" onclick="mudarFonteDoResumo(-1)" aria-label="Diminuir a letra">A−</button>
        <button class="btn btn-ghost btn-sm" onclick="mudarFonteDoResumo(1)" aria-label="Aumentar a letra">A+</button>
        <button class="btn btn-ghost btn-sm" onclick="abrirModalFeedback('${escapeHtml(r.id)}')">${iconeSvg("message")} Feedback</button>
      </div>
    </div>
    <div class="resumo-layout${_sumarioDoResumoFechado() ? " lateral-fechada" : ""}">
    <div class="resumo-veu" onclick="fecharGavetaDoResumo()" aria-hidden="true"></div>
    <aside class="resumo-lateral" aria-label="Sumário">
      <div class="resumo-lateral-cab"><span class="resumo-rotulo">Sumário</span><button class="resumo-ir" onclick="alternarSumarioDoResumo()" title="Recolher o sumário">recolher »</button></div>
      <ol>${sumario}</ol>
    </aside>
    <article class="resumo-caderno" style="--resumo-escala:${RESUMO_ESCALAS[_indiceDaFonteDoResumo()]}">
      <div class="resumo-rotulo">Resumo <span class="badge badge-accent">Beta</span></div>
      <h1 class="resumo-titulo">${escapeHtml(r.titulo)}</h1>
      <div class="resumo-aluno">
        ${_resumoUltimas
          ? `<div>${feitas} de ${todas.length} questões deste tema já feitas. Os capítulos que você mais erra vêm primeiro, depois os que você ainda não respondeu e por último os que já domina; o ponto-chave em que você erra ganha fundo de cor, e a frase do texto que o explica fica sublinhada (clique nela para acender).</div>
             <div class="resumo-legenda"><span><i class="resumo-marca revisar"></i>Revise com prioridade</span><span><i class="resumo-marca atencao"></i>Vale revisar</span><span><i class="resumo-marca dominado"></i>Você já domina</span></div>`
          : `<div>Você ainda não fez questões deste tema: o resumo aparece na ordem do autor. Ao responder as questões, o texto passa a marcar onde você mais erra.</div>`}
        ${_htmlDesempenhoNoAssunto(r, ultTodas, todas)}
        <div class="text-xs muted">Selecione um trecho para <strong>destacar</strong> em azul ou virar <strong>flashcard</strong>.</div>
      </div>
      ${corpo.map(({ d, c, intro, secs }) => `<section class="resumo-capitulo" id="resumo-c-${escapeHtml(d.id)}">
        <div class="resumo-cap-cab"><div class="resumo-rotulo">Capítulo ${c + 1}</div><h2>${escapeHtml(d.titulo)}</h2></div>
        <div class="resumo-introducao">${intro}</div>${secs.join("")}</section>`).join("")}
      <p class="resumo-fim">Fontes a conferir: ${escapeHtml((r.fontes || []).map(x => x.texto).join("; "))}.</p>
      <div class="resumo-lido card-flat mt-2 flex justify-between items-center gap-1 quebra">${resumoLidoEm(u, r.id)
        ? `<span class="text-sm">${iconeSvg("check")} Você marcou este resumo como lido em ${formatDataBR(resumoLidoEm(u, r.id))}.</span><button class="btn btn-ghost btn-sm" onclick="marcarResumoComoLido('${escapeHtml(r.id)}', false)">Desmarcar</button>`
        : `<span class="text-sm">Terminou a leitura?</span><button class="btn btn-primary btn-sm" onclick="marcarResumoComoLido('${escapeHtml(r.id)}', true)">${iconeSvg("check")} Marcar como lido</button>`}</div>
      ${htmlPosLeituraDoResumo(u, r.id)}
    </article>
    </div>`;
}

/* Tabela (Markdown de tabela num parágrafo da prosa): usada no capítulo comparativo do fim
   dos temas de doenças parecidas. Cada célula é um trecho destacável próprio (alvo …:pK:lIcJ),
   para que destacar e virar flashcard funcionem também dentro da tabela. */
function _ehTabelaDoResumo(p){ const l = p.trim().split("\n"); return l.length > 2 && l.every(x => x.trim().startsWith("|")) && /^\|[\s:|-]+\|$/.test(l[1].trim()); }
function _htmlTabelaDoResumo(p, alvo, cap){
  const linhas = p.trim().split("\n").filter((x, i) => i !== 1)
    .map(x => x.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(c => c.trim()));
  const celulas = (cs, i, tag) => cs.map((c, j) => _trechoDestacavel(tag, c, `${alvo}:l${i}c${j}`, cap)).join("");
  return `<div class="resumo-tabela"><table><thead><tr>${celulas(linhas[0], 0, "th")}</tr></thead>
    <tbody>${linhas.slice(1).map((cs, i) => `<tr>${celulas(cs, i + 1, "td")}</tr>`).join("")}</tbody></table></div>`;
}
// Seção de conduta diz de que diretriz depende: é ela que muda quando sai edição nova.
function _htmlDiretrizesDaSecao(r, f){
  const nomes = (f.diretrizes || []).map(id => ((r.fontes || []).find(x => x.id === id) || {}).texto).filter(Boolean);
  return nomes.length ? `<div class="resumo-conferir">Conduta conforme: ${escapeHtml(nomes.join("; "))}.</div>` : "";
}

function _htmlSecaoDoResumo(r, cap, numero, { f, t }){
  const prosa = (f.prosa || "").split(/\n\s*\n/).filter(p => p.trim())
    .map((p, k) => _ehTabelaDoResumo(p) ? _htmlTabelaDoResumo(p, `r:${r.id}:${f.id}:p${k}`, cap)
      : _trechoDestacavel("p", p.trim(), `r:${r.id}:${f.id}:p${k}`, cap)).join("");
  const topicos = f.texto.split("\n").filter(l => l.trim()).map((l, k) => {
    const m = l.match(/\s*\{([^}]+)\}\s*$/);
    const ids = m ? m[1].split(",").map(x => x.trim()) : null;
    const bruto = l.replace(/^\s*-\s*/, "").replace(/\s*\{[^}]+\}\s*$/, "");
    const n = _resumoUltimas && ids ? _nivelDoResumo(_erroDoResumo(ids)) : "";
    const cls = n === "dominado" ? "" : n;
    // o link para a frase só aparece onde ajuda: no ponto em que a pessoa erra (ou sem dados, em todos)
    const fr = (!_resumoUltimas || cls) ? _fraseDoPontoChave(cap, ids || f.questoes) : null;
    const ir = fr ? ` <button class="resumo-ir" onclick="irParaFraseDoResumo('${escapeHtml(fr.chave)}')" title="Ir à explicação no texto">no texto ↑</button>` : "";
    return `<li class="${cls}"${cls ? ` title="${RESUMO_NOMES[cls]}"` : ""}>${_trechoDestacavel("span", bruto, `r:${r.id}:${f.id}:k${k}`, cap)}${ir}</li>`;
  }).join("");
  return `<section class="resumo-secao" id="resumo-s-${escapeHtml(f.id)}">
    <div class="resumo-sec-cab"><span class="resumo-num">${numero}</span><h3>${escapeHtml(f.titulo)}</h3>${_marcaDoResumo(t)}${_contagemDaSecao(f.questoes)}
      <button class="resumo-ir" onclick="cartaoDaSecaoDoResumo('${escapeHtml(f.id)}')" title="Criar um flashcard desta seção">${iconeSvg("cards")} cartão</button></div>
    ${prosa}
    ${(f.figuras || []).map(fig => _htmlFiguraDoResumo(r, fig)).join("")}
    ${(f.casos || []).map(_htmlCasoDoResumo).join("")}
    <div class="resumo-chave"><div class="resumo-rotulo">Pontos-chave</div><ul>${topicos}</ul></div>
    ${_htmlDiretrizesDaSecao(r, f)}
    ${f.conferir ? `<div class="resumo-conferir">Texto ainda a conferir na fonte primária.</div>` : ""}
  </section>`;
}
