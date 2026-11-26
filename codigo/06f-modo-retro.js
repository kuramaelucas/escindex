/* codigo/06f-modo-retro.js — visual retrô de videogame (seção 5-F): a escolha por aparelho, o convite na primeira vez que um controle conecta (Easter egg), golpes de acerto/erro, combo, transição entre questões e cartões, e o código secreto.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   5-F. VISUAL RETRÔ
   ==========================================================================
   Só a pele muda: cores de fliperama, fonte pixelada nos títulos, menus e
   botões, bordas duras. O TEXTO DA QUESTÃO, das alternativas, da explicação,
   dos cartões e dos resumos continua na fonte normal — é o que a pessoa lê
   com atenção, e fonte pixelada cansa e confunde letra (I/l/1).

   É do aparelho (localStorage), como o tema claro/escuro: quem liga no
   computador de casa não muda o celular. Desliga em um clique no menu
   ("Visual normal") ou no Perfil. Animações curtas (< 0,7 s), nunca seguram a
   pessoa: o golpe aparece por cima e some sozinho, sem bloquear clique. Quem
   pede menos movimento no sistema vê só o texto do golpe, sem tremor nem
   deslize. No simulado sem modo aprendizado não há golpe: ele contaria o
   acerto antes da hora. */

const CHAVE_RETRO = "esc_visual_retro";
const CHAVE_CONVITE_RETRO = "esc_retro_convite_visto";
const RETRO_FONTE_URL = "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap";
const retroEstado = { combo: 0, konami: [] };

function retroLigado(){
  try{ return localStorage.getItem(CHAVE_RETRO) === "1"; }catch(e){ return false; }
}
/* A fonte só é pedida quando o visual liga: quem nunca usa não baixa nada. */
function retroAplicar(){
  const ligado = retroLigado();
  if(ligado) document.documentElement.setAttribute("data-retro", "1");
  else document.documentElement.removeAttribute("data-retro");
  if(ligado && !document.getElementById("fonteRetro")){
    const l = document.createElement("link");
    l.id = "fonteRetro"; l.rel = "stylesheet"; l.href = RETRO_FONTE_URL;
    document.head.appendChild(l);
  }
}
function definirVisualRetro(ligar, silencioso){
  try{ localStorage.setItem(CHAVE_RETRO, ligar ? "1" : "0"); }catch(e){}
  retroAplicar();
  retroEstado.combo = 0;
  if(typeof render === "function") render();
  if(!silencioso) toast(ligar ? "Visual retrô ligado. Para voltar ao normal: menu › Visual normal (ou Perfil)." : "Visual normal de volta. O retrô fica em Perfil e configurações.");
}
function alternarVisualRetro(){ definirVisualRetro(!retroLigado()); }
retroAplicar();

/* Item do rodapé do menu, ao lado do tema: o "desligar fácil". */
function htmlItemMenuRetro(){
  return `<div class="nav-item" onclick="alternarVisualRetro()">${iconeSvg("play")}<span>${retroLigado() ? "Visual normal" : "Visual retrô"}</span></div>`;
}
function renderCardRetro(){
  const on = retroLigado();
  return `<div class="card mt-2" style="max-width:460px">
    <div class="card-title">Visual retrô</div>
    <p class="text-sm muted">Cores de fliperama, letra pixelada nos menus e botões e golpes rápidos de acerto e erro, como num jogo de luta. O texto das questões, das alternativas e dos cartões continua na letra normal. Vale só neste aparelho e desliga no menu, em <strong>Visual normal</strong>.</p>
    <label class="checkbox-row mt-1"><input type="checkbox" ${on ? "checked" : ""} onchange="definirVisualRetro(this.checked)"><span>Usar o visual retrô</span></label>
  </div>`;
}

/* ---------- golpes: acerto, erro, combo ---------- */
function retroPoucoMovimento(){
  try{ return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){ return false; }
}
function retroGolpe(texto, tipo, sub){
  if(!retroLigado() || !document.body) return;
  const antigo = document.getElementById("retroGolpe"); if(antigo) antigo.remove();
  const d = document.createElement("div");
  d.id = "retroGolpe"; d.className = "retro-golpe retro-" + tipo; d.setAttribute("aria-hidden", "true");
  d.innerHTML = `<span class="retro-golpe-texto">${escapeHtml(texto)}</span>${sub ? `<span class="retro-golpe-sub">${escapeHtml(sub)}</span>` : ""}`;
  document.body.appendChild(d);
  if(tipo === "erro" && !retroPoucoMovimento()){
    document.body.classList.remove("retro-tremor"); void document.body.offsetWidth;   // reinicia a animação
    document.body.classList.add("retro-tremor");
    setTimeout(() => document.body.classList.remove("retro-tremor"), 400);
  }
  setTimeout(() => d.remove(), 750);
}
/* Chamado pela tela que acabou de mostrar o gabarito (sessão e simulado em modo aprendizado). */
function retroAoResponder(correta, confianca){
  if(!retroLigado()) return;
  if(!correta){ retroEstado.combo = 0; retroGolpe("OUCH!", "erro", confianca === "certeza" ? "golpe crítico — vale revisar" : ""); return; }
  retroEstado.combo++;
  const sub = retroEstado.combo >= 3 ? "COMBO ×" + retroEstado.combo : "";
  if(confianca === "chute") retroGolpe("LUCKY!", "sorte", sub || "acerto no chute volta na revisão");
  else retroGolpe(confianca === "certeza" ? "PERFECT!" : "K.O.!", "acerto", sub);
}
function retroAoAvaliarCartao(nota){
  if(!retroLigado()) return;
  if(nota === "sabia"){ retroEstado.combo++; retroGolpe("+1UP", "acerto", retroEstado.combo >= 3 ? "COMBO ×" + retroEstado.combo : ""); }
  else if(nota === "quase"){ retroEstado.combo = 0; retroGolpe("GOOD", "sorte"); }
  else { retroEstado.combo = 0; retroGolpe("MISS", "erro"); }
}
/* Entrada da questão ou do cartão seguinte: um deslize em degraus, como troca de fase. */
function retroTransicao(){
  if(!retroLigado() || retroPoucoMovimento()) return;
  const alvo = document.getElementById("areaGestoQuestao"); if(!alvo) return;
  alvo.classList.remove("retro-entra"); void alvo.offsetWidth;
  alvo.classList.add("retro-entra");
}

/* ---------- Easter egg: o primeiro controle ----------
   Na primeira vez que um controle conecta neste aparelho, a tela vira tela de
   título e oferece o visual retrô. Só uma vez (fica marcado), nunca por cima
   de outra janela nem no meio de um simulado — nesse caso espera a próxima
   conexão. */
function retroConviteDoControle(){
  if(retroLigado() || !document.body) return;
  try{ if(localStorage.getItem(CHAVE_CONVITE_RETRO) === "1") return; }catch(e){ return; }
  if(document.getElementById("modalOverlayAtivo") || state.route === "simulado-ativo" || !usuarioAtual()) return;
  try{ localStorage.setItem(CHAVE_CONVITE_RETRO, "1"); }catch(e){}
  abrirModal(`<div class="retro-titulo-tela">
      <div class="retro-titulo-marca">ESC</div>
      <div class="retro-titulo-pisca">PLAYER 1 READY</div>
      <p class="text-sm">Controle detectado. Quer jogar com o <strong>visual retrô</strong>? Cores de fliperama, golpes de acerto e erro e combo — o texto das questões fica igual.</p>
      <div class="flex gap-1 mt-2 quebra" style="justify-content:center">
        <button class="btn btn-primary" onclick="fecharModal(); definirVisualRetro(true)">▶ PRESS START</button>
        <button class="btn btn-secondary" onclick="fecharModal()">Agora não</button>
      </div>
      <p class="text-xs muted mt-2">Dá para ligar ou desligar quando quiser no menu ou em Perfil e configurações.</p>
    </div>`);
}
// navegador de automação (os testes) não recebe o convite sozinho, para não cobrir as telas que eles clicam; o teste do convite o chama direto
window.addEventListener("gamepadconnected", function(){ if(!navigator.webdriver) setTimeout(retroConviteDoControle, 400); });

/* Código secreto (↑ ↑ ↓ ↓ ← → ← → B A), no teclado: liga e desliga o visual. */
const RETRO_CODIGO = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
window.addEventListener("keydown", function(e){
  const alvo = e.target, digitando = alvo && (alvo.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(alvo.tagName));
  if(digitando) return;
  const tecla = e.key && e.key.length === 1 ? e.key.toLowerCase() : e.key;
  retroEstado.konami.push(tecla);
  if(retroEstado.konami.length > RETRO_CODIGO.length) retroEstado.konami.shift();
  if(retroEstado.konami.join() === RETRO_CODIGO.join()){ retroEstado.konami = []; alternarVisualRetro(); }
});
