/* codigo/08b-destaques-de-texto.js — Destaques de texto (seção 11-B): selecionar um trecho da questão ou do flashcard e marcá-lo, guardado por pessoa.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   11-B. DESTAQUES DE TEXTO — marcar o que importa, na hora de estudar
   ==========================================================================
   Enquanto resolve uma questão (ou vira um flashcard), a pessoa seleciona
   um trecho — "PAS < 90", "internar", um dado do enunciado — e aparece uma
   barrinha com "Destacar". O trecho fica marcado da próxima vez que a
   questão aparecer. Clicar num trecho marcado oferece "Remover destaque".

   Onde vale: enunciado, alternativas e explicação da questão; frente e verso
   do cartão. Cada lugar é um `alvo` ("q:<id>:enunciado", "q:<id>:alt-B",
   "q:<id>:explicacao", "q:<id>:explicacao-alt", "c:<id>:frente"…), e o
   elemento da tela que aceita destaque carrega `data-alvo`.

   Como se guarda: db.destaques = [{id, usuarioId, alvo, inicio, fim, trecho,
   data}], posições no texto puro do alvo. O `trecho` vai junto porque o texto
   de uma questão pode ser corrigido depois: se as posições deixaram de bater,
   o site procura o trecho no texto novo; se não achar, o destaque some da
   tela (e fica guardado). Sobe para a nuvem (tabela `destaques`) e é só da
   pessoa: ninguém vê o destaque de ninguém. */
function destaquesDoAlvo(usuarioId, alvo){
  return (db.destaques || []).filter(d => d.usuarioId === usuarioId && d.alvo === alvo);
}
function alvoDeQuestao(questaoId, campo){ return "q:" + questaoId + ":" + campo; }
function alvoDeCartao(cartaoId, campo){ return "c:" + cartaoId + ":" + campo; }
// atributo que faz um elemento aceitar destaque
function atributoDestacavel(alvo){ return 'data-alvo="' + escapeHtml(alvo) + '"'; }

/* Os destaques do alvo que ainda batem com o texto, ordenados e sem
   sobreposição, com as posições já corrigidas. */
function destaquesValidosDoTexto(texto, alvo){
  const u = usuarioAtual();
  if(!u || !db.destaques || !db.destaques.length) return [];
  const validos = destaquesDoAlvo(u.id, alvo).map(d => {
    let inicio = d.inicio;
    if(texto.slice(inicio, d.fim) !== d.trecho){
      inicio = texto.indexOf(d.trecho);
      if(inicio < 0) return null;
    }
    return { id: d.id, inicio, fim: inicio + d.trecho.length, trecho: d.trecho };
  }).filter(Boolean).sort((a, b) => a.inicio - b.inicio);
  const semSobrepor = [];
  validos.forEach(d => { if(!semSobrepor.length || d.inicio >= semSobrepor[semSobrepor.length - 1].fim) semSobrepor.push(d); });
  return semSobrepor;
}
/* ÊNFASE DO AUTOR NAS EXPLICAÇÕES. Quem escreve a explicação marca com
   **dois asteriscos** o parâmetro objetivo que define a conduta ("**PAS 82
   mmHg** (normal: 90–120)", "**CURB-65 = 3**"); na tela vira um realce
   próprio (strong.parametro), diferente do destaque amarelo que a pessoa faz
   por conta dela. Número ímpar de pares fecha só os completos: um "**" que
   sobra fica como texto. As posições dos destaques da pessoa valem para o
   texto SEM os asteriscos — é o que está na tela. */
function separarEnfase(texto){
  const partes = String(texto === null || texto === undefined ? "" : texto).split("**");
  const pares = Math.floor((partes.length - 1) / 2);
  let plano = "";
  const faixas = [];
  partes.forEach((parte, i) => {
    if(i > 2 * pares){ plano += "**" + parte; return; }        // asteriscos sem par: texto comum
    if(i % 2 === 1) faixas.push({ inicio: plano.length, fim: plano.length + parte.length });
    plano += parte;
  });
  return { plano, faixas: faixas.filter(f => f.fim > f.inicio) };
}
// o texto sem a marcação de ênfase, para onde ela não se aplica (cartão gerado, prompt)
function textoSemEnfase(texto){ return separarEnfase(texto).plano; }
/* O texto já escapado, com <mark> nos trechos destacados pela pessoa e
   <strong class="parametro"> na ênfase do autor. Sem nenhum dos dois, é
   exatamente escapeHtml(texto). `comEnfase` liga a leitura dos "**" (só as
   explicações usam); `alvo` nulo = sem destaques da pessoa (PDF). */
function htmlComDestaques(texto, alvo, comEnfase){
  const { plano, faixas } = comEnfase ? separarEnfase(texto) : { plano: String(texto === null || texto === undefined ? "" : texto), faixas: [] };
  const lista = alvo ? destaquesValidosDoTexto(plano, alvo) : [];
  if(!lista.length && !faixas.length) return escapeHtml(plano);
  const cortes = new Set([0, plano.length]);
  lista.forEach(d => { cortes.add(d.inicio); cortes.add(d.fim); });
  faixas.forEach(f => { cortes.add(f.inicio); cortes.add(f.fim); });
  const pontos = [...cortes].sort((a, b) => a - b);
  let html = "";
  for(let i = 0; i < pontos.length - 1; i++){
    const de = pontos[i], ate = pontos[i + 1];
    let trecho = escapeHtml(plano.slice(de, ate));
    if(faixas.some(f => f.inicio <= de && f.fim >= ate)) trecho = '<strong class="parametro">' + trecho + '</strong>';
    const d = lista.find(x => x.inicio <= de && x.fim >= ate);
    if(d) trecho = '<mark class="destaque" data-destaque="' + escapeHtml(d.id) + '" title="Clique para remover o destaque">' + trecho + '</mark>';
    html += trecho;
  }
  return html;
}

/* ---------- a seleção → um destaque ---------- */
function elementoDestacavel(no){
  const el = no && (no.nodeType === 1 ? no : no.parentElement);
  return el && el.closest ? el.closest("[data-alvo]") : null;
}
// há texto selecionado agora? Os cliques que selecionam alternativa ou viram
// o cartão ignoram o "solta o mouse" de quem acabou de arrastar para marcar
function haTextoSelecionado(){
  const sel = window.getSelection ? window.getSelection() : null;
  return !!(sel && !sel.isCollapsed && sel.toString().trim());
}
/* O trecho selecionado, se ele está inteiro dentro de UM alvo: onde é, as
   posições e o texto (sem espaço nas pontas). Senão, null. */
function destaqueDaSelecao(){
  const sel = window.getSelection ? window.getSelection() : null;
  if(!sel || sel.isCollapsed || !sel.rangeCount) return null;
  const faixa = sel.getRangeAt(0);
  const el = elementoDestacavel(faixa.startContainer);
  if(!el || el !== elementoDestacavel(faixa.endContainer)) return null;
  const antes = document.createRange();
  antes.selectNodeContents(el);
  antes.setEnd(faixa.startContainer, faixa.startOffset);
  const bruto = faixa.toString();
  const folga = bruto.length - bruto.trimStart().length;
  const trecho = bruto.trim();
  if(!trecho) return null;
  const inicio = antes.toString().length + folga;
  return { el, alvo: el.getAttribute("data-alvo"), inicio, fim: inicio + trecho.length, trecho };
}

let _destaquePendente = null;   // o que o botão "Destacar" vai gravar
let _destaqueAberto = null;     // o <mark> que o botão "Remover" vai apagar
let _temporizadorDestaque = null;

function barraDeDestaque(){
  let barra = document.getElementById("barraDestaque");
  if(!barra){
    barra = document.createElement("div");
    barra.id = "barraDestaque";
    barra.className = "barra-destaque";
    barra.hidden = true;
    // pointerdown/mousedown sem foco: clicar no botão não pode desfazer a seleção antes de gravar
    barra.addEventListener("mousedown", e => e.preventDefault());
    barra.addEventListener("pointerdown", e => e.preventDefault());
    document.body.appendChild(barra);
  }
  return barra;
}
function esconderBarraDeDestaque(){
  const barra = document.getElementById("barraDestaque");
  if(barra) barra.hidden = true;
  _destaquePendente = null; _destaqueAberto = null;
}
function mostrarBarraDeDestaque(faixa, html){
  const barra = barraDeDestaque();
  barra.innerHTML = html;
  barra.hidden = false;
  // acima do trecho no computador; abaixo no celular, onde o menu nativo do
  // toque já ocupa o espaço de cima
  const toque = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  const larg = barra.offsetWidth, alt = barra.offsetHeight;
  let x = faixa.left + faixa.width / 2 - larg / 2;
  let y = toque ? faixa.bottom + 10 : faixa.top - alt - 8;
  if(y < 8) y = faixa.bottom + 10;
  x = Math.max(8, Math.min(x, window.innerWidth - larg - 8));
  y = Math.max(8, Math.min(y, window.innerHeight - alt - 8));
  // posição na PÁGINA (não na janela): a barra rola junto com o texto que ela marca
  barra.style.left = (x + window.scrollX) + "px";
  barra.style.top = (y + window.scrollY) + "px";
}
function atualizarBarraDeDestaque(){
  const u = usuarioAtual();
  const d = u ? destaqueDaSelecao() : null;
  if(!d){
    // a barra de "Remover" fica até o próximo clique; a de "Destacar" some com a seleção
    if(!_destaqueAberto) esconderBarraDeDestaque();
    return;
  }
  _destaqueAberto = null;
  _destaquePendente = d;
  const faixa = window.getSelection().getRangeAt(0).getBoundingClientRect();
  mostrarBarraDeDestaque(faixa, '<button type="button" class="btn btn-primary btn-sm" onclick="destacarSelecao()">' + iconeSvg("star") + ' Destacar</button>');
}
// o texto puro do alvo, sem as marcas (é sobre ele que as posições valem)
function textoDoAlvo(el){ return el.textContent; }
function repintarAlvo(el){
  if(!el) return;
  el.innerHTML = htmlComDestaques(textoDoAlvo(el), el.getAttribute("data-alvo"));
}
function destacarSelecao(){
  const p = _destaquePendente, u = usuarioAtual();
  if(!p || !u) return;
  let { inicio, fim } = p;
  const texto = textoDoAlvo(p.el);
  // o que encosta ou sobrepõe um destaque que já existe vira um só
  destaquesValidosDoTexto(texto, p.alvo).forEach(existente => {
    if(existente.inicio <= fim && existente.fim >= inicio){
      inicio = Math.min(inicio, existente.inicio); fim = Math.max(fim, existente.fim);
      apagarDestaque(existente.id);
    }
  });
  if(!Array.isArray(db.destaques)) db.destaques = [];
  const novo = { id: uid("d"), usuarioId: u.id, alvo: p.alvo, inicio, fim, trecho: texto.slice(inicio, fim), data: hojeISO() };
  db.destaques.push(novo);
  nuvemRegistrar({ destaque: novo });
  saveState();
  const el = p.el;
  window.getSelection().removeAllRanges();
  esconderBarraDeDestaque();
  repintarAlvo(el);
}
// tira do banco e avisa a nuvem; quem chama repinta a tela
function apagarDestaque(id){
  const i = (db.destaques || []).findIndex(d => d.id === id);
  if(i < 0) return null;
  const [d] = db.destaques.splice(i, 1);
  nuvemRegistrar({ destaque: Object.assign({}, d, { removido: true }) });
  return d;
}
function removerDestaque(id){
  const marca = document.querySelector('mark.destaque[data-destaque="' + id + '"]');
  const el = marca ? marca.closest("[data-alvo]") : null;
  if(!apagarDestaque(id)) return;
  saveState();
  esconderBarraDeDestaque();
  repintarAlvo(el);
}
// clicar num trecho marcado oferece desmarcar
function clicouEmDestaque(e){
  const barra = document.getElementById("barraDestaque");
  if(barra && barra.contains(e.target)) return;
  const marca = e.target.closest ? e.target.closest("mark.destaque") : null;
  if(!marca || haTextoSelecionado()){ if(_destaqueAberto) esconderBarraDeDestaque(); return; }
  _destaqueAberto = marca;
  _destaquePendente = null;
  mostrarBarraDeDestaque(marca.getBoundingClientRect(),
    '<button type="button" class="btn btn-secondary btn-sm" onclick="removerDestaque(\'' + marca.getAttribute("data-destaque") + '\')">' + iconeSvg("x") + ' Remover destaque</button>');
}
function ativarDestaquesDeTexto(){
  // selectionchange dispara a cada letra do arrasto: só se olha quando a seleção assenta
  document.addEventListener("selectionchange", () => {
    clearTimeout(_temporizadorDestaque);
    _temporizadorDestaque = setTimeout(atualizarBarraDeDestaque, 160);
  });
  document.addEventListener("click", clicouEmDestaque);
}
