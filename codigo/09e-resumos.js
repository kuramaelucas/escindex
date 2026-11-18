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
   frase acende a cor (de novo, clicar apaga). A tela não mostra números: a
   legenda diz o que cada cor quer dizer.

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
function fecharGavetaDoResumo(){
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
  try { const v = localStorage.getItem(RESUMO_CHAVE_LATERAL); return v === null ? window.innerWidth < 900 : v === "1"; } catch(e){ return window.innerWidth < 900; }
}
function alternarSumarioDoResumo(){
  const el = document.querySelector(".resumo-layout");
  if(!el) return;
  const fechado = el.classList.toggle("lateral-fechada");
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
    <details${escolhida ? " open" : ""}><summary>Ler o caso e tentar responder</summary>
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
function abrirResumo(id){ state.filtroRota.resumoAberto = id || null; render(); window.scrollTo(0, 0); }

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
  const casos = r.doencas.flatMap(d => d.fragmentos.flatMap(f => f.casos || []));
  if(arquivosQueFaltamParaAsQuestoes(casos).length){
    garantirCorpos(casos).then(() => { if(state.route === "resumos") render(); });
    return `<div class="empty-state">Abrindo o resumo…</div>`;
  }
  return _renderCaderno(r);
}

function _renderListaDeResumos(cat){
  return `<div class="page-header"><h2>Resumos <span class="badge badge-accent">Beta</span></h2>
    <p>Textos de estudo escritos a partir das questões de prova. Cada parte do texto é ligada às questões que ela responde, e a cor mostra onde você mais erra.</p></div>
    <div class="card-flat mb-2 text-sm">${iconeSvg("alert")} Em teste: o texto ainda está sendo conferido nas fontes primárias. Achou erro ou tem sugestão? Dentro do resumo há um botão de feedback.</div>
    ${cat.map(r => `<div class="card mb-1">
      <div class="flex justify-between items-center gap-2 quebra">
        <div class="cresce-220"><div class="text-xs muted">${escapeHtml(r.area || "")}</div><div class="card-title">${escapeHtml(r.titulo)}</div></div>
        <button class="btn btn-primary btn-sm" onclick="abrirResumo('${escapeHtml(r.id)}')">Ler</button>
      </div></div>`).join("")}`;
}

function _ordenarPorErro(lista){
  return lista.sort((a, b) => ((b.t === null ? -1 : b.t) - (a.t === null ? -1 : a.t)) || a.i - b.i);
}

function _renderCaderno(r){
  const u = usuarioAtual();
  _resumoUltimas = _ultimasRespostasDe(u.id);
  _resumoTextos = {}; _resumoFrases = [];
  const todas = [...new Set(r.doencas.flatMap(d => d.fragmentos.flatMap(f => f.questoes)))];
  const feitas = todas.filter(id => id in _resumoUltimas).length;
  // sem nenhuma questão feita, não há o que marcar: o caderno fica na ordem do autor
  if(!feitas) _resumoUltimas = null;
  const medir = ids => _resumoUltimas ? _erroDoResumo(ids) : null;
  const caps = r.doencas.map((d, i) => ({ d, i, t: medir([...new Set(d.fragmentos.flatMap(f => f.questoes))]),
    secoes: d.fragmentos.map((f, j) => ({ f, i: j, t: medir(f.questoes) })) }));
  if(_resumoUltimas){ _ordenarPorErro(caps); caps.forEach(c => _ordenarPorErro(c.secoes)); }

  // o corpo primeiro: as frases precisam estar registradas antes dos pontos-chave procurarem por elas
  const corpo = caps.map(({ d, secoes }, c) => {
    const intro = (d.introducao || "").split(/\n\s*\n/).filter(p => p.trim())
      .map((p, k) => _trechoDestacavel("p", p.trim(), `r:${r.id}:${d.id}:i${k}`, d.id)).join("");
    const secs = secoes.map((s, k) => _htmlSecaoDoResumo(r, d.id, `${c + 1}.${k + 1}`, s));
    return { d, c, intro, secs };
  });
  const sumario = caps.map(({ d, t, secoes }, c) => `<li class="resumo-cap-item">
      <div class="resumo-linha"><span class="resumo-num">${c + 1}</span><button class="resumo-link forte" onclick="irParaNoResumo('resumo-c-${escapeHtml(d.id)}')">${escapeHtml(d.titulo)}</button>${_marcaDoResumo(t)}</div>
      <ol class="resumo-sub">${secoes.map(({ f, t }, k) => `<li class="resumo-linha"><span class="resumo-num">${c + 1}.${k + 1}</span><button class="resumo-link" onclick="irParaNoResumo('resumo-s-${escapeHtml(f.id)}')">${escapeHtml(f.titulo)}</button>${_marcaDoResumo(t)}</li>`).join("")}</ol>
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
          ? `<div>${feitas} de ${todas.length} questões deste tema já feitas. Os capítulos que você mais erra vêm primeiro; o ponto-chave em que você erra ganha fundo de cor, e a frase do texto que o explica fica sublinhada (clique nela para acender).</div>
             <div class="resumo-legenda"><span><i class="resumo-marca revisar"></i>Revise com prioridade</span><span><i class="resumo-marca atencao"></i>Vale revisar</span><span><i class="resumo-marca dominado"></i>Você já domina</span></div>`
          : `<div>Você ainda não fez questões deste tema: o resumo aparece na ordem do autor. Ao responder as questões, o texto passa a marcar onde você mais erra.</div>`}
        <div class="text-xs muted">Selecione um trecho para <strong>destacar</strong> em azul ou virar <strong>flashcard</strong>.</div>
      </div>
      ${corpo.map(({ d, c, intro, secs }) => `<section class="resumo-capitulo" id="resumo-c-${escapeHtml(d.id)}">
        <div class="resumo-cap-cab"><div class="resumo-rotulo">Capítulo ${c + 1}</div><h2>${escapeHtml(d.titulo)}</h2></div>
        <div class="resumo-introducao">${intro}</div>${secs.join("")}</section>`).join("")}
      <p class="resumo-fim">Fontes a conferir: ${escapeHtml((r.fontes || []).map(x => x.texto).join("; "))}.</p>
    </article>
    </div>`;
}

function _htmlSecaoDoResumo(r, cap, numero, { f, t }){
  const prosa = (f.prosa || "").split(/\n\s*\n/).filter(p => p.trim())
    .map((p, k) => _trechoDestacavel("p", p.trim(), `r:${r.id}:${f.id}:p${k}`, cap)).join("");
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
    <div class="resumo-sec-cab"><span class="resumo-num">${numero}</span><h3>${escapeHtml(f.titulo)}</h3>${_marcaDoResumo(t)}
      <button class="resumo-ir" onclick="cartaoDaSecaoDoResumo('${escapeHtml(f.id)}')" title="Criar um flashcard desta seção">${iconeSvg("cards")} cartão</button></div>
    ${prosa}
    ${(f.figuras || []).map(fig => _htmlFiguraDoResumo(r, fig)).join("")}
    ${(f.casos || []).map(_htmlCasoDoResumo).join("")}
    <div class="resumo-chave"><div class="resumo-rotulo">Pontos-chave</div><ul>${topicos}</ul></div>
    ${f.conferir ? `<div class="resumo-conferir">Texto ainda a conferir na fonte primária.</div>` : ""}
  </section>`;
}
