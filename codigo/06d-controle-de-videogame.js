/* codigo/06d-controle-de-videogame.js — controle de videogame (Gamepad API) na sessão de questões, no simulado e nos flashcards (seção 5-D).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   5-D. CONTROLE DE VIDEOGAME
   ==========================================================================
   Quem estuda deitado ou longe da mesa responde com o controle, sem teclado
   nem mouse. É só um jeito de CHEGAR às mesmas funções que o clique e o
   teclado já chamam (selecionarAlternativa, confirmarResposta,
   responderFlashcard, avancarPorGesto…): nenhuma regra de estudo muda aqui,
   então a confiança continua sendo declarada pela pessoa e marcar continua
   não sendo responder.

   Mapa (mapeamento "standard" da Gamepad API; vale para Xbox, PlayStation e
   os genéricos que o navegador reconhece):
     setas ↑ ↓ / analógico esquerdo   rolam a tela (ou a janela aberta); o analógico direito rola mais rápido (para cima/baixo) e, para os lados, anda pela barra de números das questões
     setas ← →                        questão ou cartão anterior / próximo
     botões da direita (questão)      A = cima · B = esquerda · C = direita · D = baixo · R1/RB = E
     com a alternativa marcada        cima = chute · esquerda = certeza · baixo = dúvida
                                      (C e E ficam sem função até desmarcar)
     Start                            abre o menu lateral: ↑ ↓ escolhem a ferramenta, ✕/A (baixo) entra, ○/B (direita) ou Start fecham
     fora das questões e cartões      ↑ ↓ ← → andam pelos botões, links e campos da página (destacados), ✕/A clica
     janela aberta                    o mesmo, só dentro dela; ○/B fecha a janela
     Select / Back                    finaliza o conjunto/simulado, só com todas as questões respondidas
     L1 / LB                          desmarca, para voltar a escolher A, B ou D
     L2 / LT segurado + A–E           risca a alternativa (é o × do mouse) em vez de marcá-la; soltou, volta ao normal
     questão já respondida            baixo = próxima questão
     cartão (flashcard)               direita = virar · esquerda = sabia · baixo = quase · cima = não lembrei
                                      (a mesma régua da questão: certeza, dúvida, chute)

   Os rótulos de equivalência existem no HTML o tempo todo, mas só aparecem
   com um controle conectado (`body.com-controle`): quem não usa controle não
   vê nada novo. O desenho do rótulo é do CSS, pela marca (`data-marca-controle`):
   △ □ ○ ✕ no PlayStation, Y X B A no Xbox e ▲ ◀ ▶ ▼ (a posição) nos demais,
   porque o mesmo botão tem nome diferente em cada fabricante.

   A escolha de usar o controle e a velocidade da rolagem ficam neste aparelho
   (localStorage, não o banco): controle é coisa do aparelho, e quem tem o
   celular sem controle e o computador com não quer a mesma opção nos dois. */

const CONTROLE_BOTAO_LETRA = { 3:"A", 2:"B", 1:"C", 0:"D", 5:"E" };
const CONTROLE_BOTAO_CONFIANCA = { 3:"chute", 2:"certeza", 0:"duvida" };
const CONTROLE_BOTAO_NOTA_CARTAO = { 3:"naolembrei", 2:"sabia", 0:"quase" };
const CONTROLE_POS_LETRA = { A:"cima", B:"esquerda", C:"direita", D:"baixo", E:"r1" };
const CONTROLE_POS_CONFIANCA = { chute:"cima", certeza:"esquerda", duvida:"baixo" };
const CONTROLE_POS_NOTA_CARTAO = { naolembrei:"cima", sabia:"esquerda", quase:"baixo" };
const CONTROLE_BOTAO = { desmarcar:4, gatilhoRiscar:6, select:8, start:9, cima:12, baixo:13, esquerda:14, direita:15 };
const CONTROLE_VELOCIDADES = { lenta:{ nome:"Lenta", px:450 }, normal:{ nome:"Normal", px:900 }, rapida:{ nome:"Rápida", px:1600 } };
const CONTROLE_ZONA_MORTA = 0.25;   // o analógico nunca volta exatamente a zero: sem folga a tela andaria sozinha
const CONTROLE_CHAVE = "esc_controle_v1";

const controleEstado = { rodando:false, anterior:{}, ultimoQuadro:0, avisou:false, menu:false };

/* ---------- escolha da pessoa (por aparelho) ---------- */
function controleConfig(){
  let c = {};
  try { c = JSON.parse(localStorage.getItem(CONTROLE_CHAVE) || "{}") || {}; } catch(e){ c = {}; }
  return { ativo: c.ativo !== false, velocidade: CONTROLE_VELOCIDADES[c.velocidade] ? c.velocidade : "normal" };
}
function controleSalvarConfig(parcial){
  const nova = { ...controleConfig(), ...parcial };
  try { localStorage.setItem(CONTROLE_CHAVE, JSON.stringify(nova)); } catch(e){ /* sem armazenamento: vale só até recarregar */ }
  controleAtualizarClasse();
  controleIniciar();
}
function renderCardControle(){
  const c = controleConfig();
  return `<div class="card mt-2" style="max-width:460px">
    <div class="card-title">Controle de videogame</div>
    <p class="text-sm muted">Com um controle conectado (aperte um botão para o navegador reconhecê-lo), Start abre o menu lateral e as setas andam pelos botões de cada tela; nas questões, as setas rolam e trocam de questão, e os botões da direita escolhem a alternativa e a confiança. ${controleConectados().length ? "<strong>Há um controle conectado agora.</strong>" : "Nenhum controle conectado agora."} Esta opção vale só neste aparelho.</p>
    <label class="checkbox-row mt-1"><input type="checkbox" ${c.ativo?"checked":""} onchange="controleSalvarConfig({ativo:this.checked})"><span>Usar o controle quando conectado</span></label>
    <div class="field mt-1"><label class="label" for="controleVelocidade">Velocidade da rolagem</label>
      <select class="input" id="controleVelocidade" style="max-width:200px" onchange="controleSalvarConfig({velocidade:this.value})">
        ${Object.entries(CONTROLE_VELOCIDADES).map(([id, v]) => `<option value="${id}" ${c.velocidade===id?"selected":""}>${v.nome}</option>`).join("")}
      </select></div>
  </div>`;
}

/* ---------- rótulos de equivalência (entram no HTML; o desenho é do CSS) ---------- */
/* `emConfirmacao`: já há alternativa marcada esperando a confiança. Nesse
   momento os botões de letra não marcam mais: cima, esquerda e baixo viram a
   confiança e C e E ficam sem função. O rótulo só reaparece com L2 segurado
   (`dica-so-riscar`), quando os botões de letra servem para riscar. */
function htmlDicaDoControle(posicao){
  return posicao ? `<span class="dica-controle" data-pos="${posicao}" aria-hidden="true"></span>` : "";
}
function htmlDicaDoControleAlternativa(letra, emConfirmacao){
  const dica = htmlDicaDoControle(CONTROLE_POS_LETRA[letra]);
  return emConfirmacao ? dica.replace('class="dica-controle"', 'class="dica-controle dica-so-riscar"') : dica;
}
function htmlDicaDoControleConfianca(confianca){ return htmlDicaDoControle(CONTROLE_POS_CONFIANCA[confianca]); }
function htmlDicaDoControleNotaCartao(nota){ return htmlDicaDoControle(CONTROLE_POS_NOTA_CARTAO[nota]); }
function htmlDicaDoControleTrocar(){
  return `<div class="dica-controle-linha text-xs muted mt-1">Controle: com a alternativa marcada, só a confiança e L1 / LB (que desmarca para escolher outra) respondem; segure L2 / LT e aperte uma alternativa para riscá-la.</div>`;
}

/* ---------- conexão ---------- */
function controleConectados(){
  const lista = typeof navigator.getGamepads === "function" ? navigator.getGamepads() : [];
  return Array.from(lista || []).filter(g => g && g.connected);
}
function controleMarca(g){
  const id = String(g && g.id || "");
  if(/054c|playstation|dualshock|dualsense|wireless controller/i.test(id)) return "ps";
  if(/xbox|045e|xinput/i.test(id)) return "xbox";
  return "generico";
}
function controleAtualizarClasse(){
  if(!document.body) return;
  const pads = controleConectados();
  const ligado = pads.length > 0 && controleConfig().ativo;
  document.body.classList.toggle("com-controle", ligado);
  if(pads[0]) document.body.dataset.marcaControle = controleMarca(pads[0]);
}
function controleIniciar(){
  controleAtualizarClasse();
  if(controleEstado.rodando || !controleConectados().length) return;
  controleEstado.rodando = true;
  controleEstado.ultimoQuadro = 0;
  // botões que já estavam apertados ao conectar não contam como aperto novo
  controleEstado.anterior = {};
  controleConectados().forEach(g => { controleEstado.anterior[g.index] = Array.from(g.buttons).map(b => b.pressed); });
  requestAnimationFrame(controleQuadro);
}
window.addEventListener("gamepadconnected", function(){
  controleIniciar();
  if(!controleEstado.avisou && controleConfig().ativo){ controleEstado.avisou = true; toast("Controle conectado: os botões aparecem nas alternativas."); }
});
window.addEventListener("gamepaddisconnected", function(){ controleAtualizarClasse(); });

/* Um laço só, e só enquanto há controle: sem ele nada roda. A leitura é por
   quadro porque a Gamepad API não avisa quando um botão muda, só entrega o
   estado de agora; o aperto é o momento em que passa de solto para apertado. */
function controleQuadro(agora){
  const pads = controleConectados();
  controleAtualizarClasse();
  if(!pads.length){ controleEstado.rodando = false; return; }
  const ativo = controleConfig().ativo;
  const dt = controleEstado.ultimoQuadro ? Math.min(0.05, (agora - controleEstado.ultimoQuadro) / 1000) : 0.016;
  controleEstado.ultimoQuadro = agora;
  let rolar = 0;
  pads.forEach(g => {
    const antes = controleEstado.anterior[g.index] || [];
    const atual = Array.from(g.buttons).map(b => b.pressed);
    // desligado nas configurações: o estado continua sendo lido (para não disparar tudo de uma vez ao religar), mas nada age
    if(ativo){
      atual.forEach((apertado, i) => { if(apertado && !antes[i]) controleAoApertar(i, g); });
      // as setas só rolam na questão e no cartão; no menu, nas janelas e nas outras telas elas andam de botão em botão
      const setasRolam = !controleEstado.menu && !controleJanelaAberta() && controleEmEstudo();
      if(setasRolam && atual[CONTROLE_BOTAO.cima]) rolar -= 1;
      if(setasRolam && atual[CONTROLE_BOTAO.baixo]) rolar += 1;
      const esquerdo = g.axes && g.axes[1] || 0;
      if(Math.abs(esquerdo) > CONTROLE_ZONA_MORTA) rolar += esquerdo;
      const direito = g.axes && g.axes[3] || 0;
      if(Math.abs(direito) > CONTROLE_ZONA_MORTA) rolar += direito * 2.5;   // o direito é o "rolar depressa", para explicações longas
    }
    controleEstado.anterior[g.index] = atual;
  });
  // analógico direito para os lados: anda pela barra de números das questões, na velocidade da inclinação
  if(ativo){
    const lado = pads.reduce((soma, g) => { const v = g.axes && g.axes[2] || 0; return Math.abs(v) > CONTROLE_ZONA_MORTA ? soma + v : soma; }, 0);
    const trilho = lado && !controleJanelaAberta() ? document.querySelector(".barra-questoes:not(.expandida) .barra-questoes-trilho") : null;
    if(trilho) trilho.scrollLeft += lado * 900 * dt;
  }
  document.body.classList.toggle("controle-riscando", ativo && pads.some(controleRiscando));
  if(rolar) controleRolar(Math.max(-2.5, Math.min(2.5, rolar)) * CONTROLE_VELOCIDADES[controleConfig().velocidade].px * dt);
  requestAnimationFrame(controleQuadro);
}

/* ---------- ações ---------- */
function controleJanelaAberta(){
  return !!document.getElementById("modalOverlayAtivo") && !document.getElementById("modalMinimizado");
}
function controleRolar(px){
  const janela = document.querySelector("#modalOverlayAtivo .modal");
  if(controleJanelaAberta() && janela) janela.scrollTop += px; else window.scrollBy(0, px);
}
/* Vibração curta ao acertar, mais longa ao errar: o feedback chega sem olhar
   a tela. Nem todo controle tem motor, e o navegador pode negar: nada disso
   pode quebrar a resposta, que já foi gravada. */
function controleVibrar(g, ms, forte){
  try {
    const motor = g && g.vibrationActuator;
    if(motor && motor.playEffect) motor.playEffect("dual-rumble", { duration:ms, strongMagnitude:forte, weakMagnitude:forte/2 });
  } catch(e){ /* sem motor */ }
}
/* L2 / LT é um gatilho analógico: em vários controles o `pressed` só vira true no fim do curso, e quem aperta pela
   metade segura "de verdade" sem o navegador avisar. O valor (0 a 1) pega a pegada leve. */
function controleRiscando(g){
  const gatilho = g && g.buttons && g.buttons[CONTROLE_BOTAO.gatilhoRiscar];
  return !!(gatilho && (gatilho.pressed || gatilho.value > 0.3));
}
function controleAoApertar(botao, g){
  const alvo = document.activeElement;
  if(alvo && (alvo.tagName==="INPUT" || alvo.tagName==="TEXTAREA" || alvo.isContentEditable)) return;   // quem está escrevendo não responde sem querer
  if(botao===CONTROLE_BOTAO.start){ controleAlternarMenu(); return; }
  if(controleEstado.menu){ controleNoMenu(botao); return; }
  // janela aberta: anda pelos botões DELA (nunca responde por trás, às cegas); ○/B fecha
  if(controleJanelaAberta()){ controleNaPagina(botao, document.querySelector("#modalOverlayAtivo .modal")); return; }
  // Select finaliza o conjunto, mas só com todas as questões respondidas (nunca fecha às cegas)
  if(botao===CONTROLE_BOTAO.select){ controleFinalizar(); return; }
  if(!controleEmEstudo()){ controleNaPagina(botao, document.getElementById("conteudoPagina")); return; }
  if(botao===CONTROLE_BOTAO.esquerda){ voltarPorGesto(); return; }
  if(botao===CONTROLE_BOTAO.direita){ avancarPorGesto(); return; }
  if(state.route==="flashcards" && state.sessaoFlash && !state.sessaoFlash.finalizada){ controleNoCartao(botao, g); return; }
  const ctx = controleContextoDaQuestao();
  if(!ctx){
    // questão já respondida: o botão de baixo vai para a próxima, em vez de ficar sem uso
    if(botao===0 && controleRespondida()) avancarPorGesto();
    return;
  }
  if(botao===CONTROLE_BOTAO.desmarcar){ if(ctx.marcada && ctx.desmarcar) ctx.desmarcar(); return; }
  if(botao===CONTROLE_BOTAO.gatilhoRiscar) return;
  // L2 segurado: os mesmos botões que marcariam a alternativa a riscam (e a trazem de volta, como o ×), na prática
  // e no simulado, onde o × também existe. Com o gatilho segurado nada é marcado, para não marcar por engano.
  if(controleRiscando(g)){
    const alvoRisco = CONTROLE_BOTAO_LETRA[botao];
    if(alvoRisco && ctx.q.alternativas.some(a => a.id===alvoRisco)){
      if(ctx.marcada===alvoRisco && ctx.desmarcar) ctx.desmarcar();   // riscar o que está marcado desfaz a marca: as duas coisas juntas não fazem sentido
      alternarAlternativaEliminada(alvoRisco);
    }
    return;
  }
  if(ctx.pedeConfianca && ctx.marcada && CONTROLE_BOTAO_CONFIANCA[botao]){
    ctx.confirmar(CONTROLE_BOTAO_CONFIANCA[botao]);
    const r = state.route==="sessao" && state.sessaoAtual ? respostaDoIndice(state.sessaoAtual, state.sessaoAtual.indiceAtual) : null;
    if(r && !r.correta) controleVibrar(g, 450, 0.9); else controleVibrar(g, 120, 0.5);
    return;
  }
  // com a alternativa já marcada esperando a confiança, os botões de letra não fazem mais nada (C e E não têm função de
  // confiança, mas trocar a marca por eles seria um aperto sem querer): para trocar, L1 desmarca e se escolhe de novo
  if(ctx.pedeConfianca && ctx.marcada) return;
  const letra = CONTROLE_BOTAO_LETRA[botao];
  if(letra && ctx.q.alternativas.some(a => a.id===letra)) ctx.selecionar(letra);
}
/* ---------- navegação pela plataforma ----------
   Sem isso o controle só servia dentro de um conjunto já aberto: para chegar
   a ele era preciso o mouse. Start abre o menu lateral (no celular ele desliza
   como no botão ☰), e nas outras telas as setas levam um destaque de um
   elemento clicável ao seguinte, na ordem da página — o mesmo foco do Tab do
   teclado, então o leitor de tela acompanha. "Em estudo" (questão aberta ou
   cartão em revisão) as setas continuam rolando e trocando de questão. */
function controleEmEstudo(){
  // conjunto terminado (tela de resultado) é tela comum: as setas levam aos botões "mais uma rodada", "voltar"…
  const s = state.sessaoAtual;
  if(state.route==="sessao") return !!s && !s.finalizada;
  if(state.route==="simulado-ativo") return !!s && !s.finalizado;
  return state.route==="flashcards" && !!state.sessaoFlash && !state.sessaoFlash.finalizada;
}
const CONTROLE_SELETOR_FOCO = 'button:not([disabled]), a[href], input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [onclick], [role="button"], [tabindex="0"]';
function controleFocaveis(raiz){
  if(!raiz) return [];
  return Array.from(raiz.querySelectorAll(CONTROLE_SELETOR_FOCO)).filter(el => {
    if(!el.getClientRects().length || getComputedStyle(el).visibility === "hidden") return false;
    // um [onclick] que só embrulha outro botão duplicaria o passo: fica o de dentro
    return !(el.matches("[onclick]") && el.tagName !== "BUTTON" && el.querySelector("button, a[href], input, select"));
  });
}
function controleFocar(el){
  document.querySelectorAll(".controle-foco").forEach(x => x.classList.remove("controle-foco"));
  if(!el) return;
  el.classList.add("controle-foco");
  if(!el.hasAttribute("tabindex") && !/^(BUTTON|A|INPUT|SELECT|TEXTAREA|SUMMARY)$/.test(el.tagName)) el.setAttribute("tabindex", "-1");
  try{ el.focus({ preventScroll:true }); }catch(e){}
  el.scrollIntoView({ block:"nearest", inline:"nearest" });
}
function controleMover(lista, passo){
  if(!lista.length) return;
  const atual = lista.findIndex(el => el.classList.contains("controle-foco"));
  // sem destaque ainda: começa pelo primeiro elemento visível na tela, não pelo topo da página
  const inicio = atual >= 0 ? atual + passo : Math.max(0, lista.findIndex(el => el.getBoundingClientRect().bottom > 0));
  controleFocar(lista[Math.max(0, Math.min(lista.length - 1, inicio))]);
}
function controleAtivar(el){
  if(!el) return;
  if(el.tagName === "INPUT" && /^(text|search|number|email|password|date|)$/.test(el.type || "")) { el.focus(); return; }
  el.click();
}
function controleNaPagina(botao, raiz){
  const lista = controleFocaveis(raiz);
  if(botao===CONTROLE_BOTAO.cima || botao===CONTROLE_BOTAO.esquerda){ controleMover(lista, -1); return; }
  if(botao===CONTROLE_BOTAO.baixo || botao===CONTROLE_BOTAO.direita){ controleMover(lista, 1); return; }
  if(botao===0){ controleAtivar(lista.find(el => el.classList.contains("controle-foco"))); return; }
  if(botao===1 && controleJanelaAberta()) fecharModal();
}
function controleAlternarMenu(){
  if(controleEstado.menu){ controleFecharMenu(); return; }
  if(controleJanelaAberta()) return;
  const barra = document.getElementById("sidebarMenu"); if(!barra) return;
  controleEstado.menu = true;
  document.body.classList.add("controle-no-menu");
  if(getComputedStyle(barra).transform !== "none" || barra.getBoundingClientRect().right <= 0) abrirMenuMobile();
  const itens = controleFocaveis(barra);
  controleFocar(itens.find(el => el.classList.contains("active")) || itens[0]);
}
function controleFecharMenu(){
  controleEstado.menu = false;
  document.body.classList.remove("controle-no-menu");
  document.querySelectorAll(".controle-foco").forEach(x => x.classList.remove("controle-foco"));
  fecharMenuMobile();
}
function controleNoMenu(botao){
  const barra = document.getElementById("sidebarMenu"), itens = controleFocaveis(barra);
  if(botao===CONTROLE_BOTAO.cima){ controleMover(itens, -1); return; }
  if(botao===CONTROLE_BOTAO.baixo){ controleMover(itens, 1); return; }
  if(botao===1){ controleFecharMenu(); return; }
  if(botao===0){
    const el = itens.find(x => x.classList.contains("controle-foco")); if(!el) return;
    // abrir ou fechar um grupo do menu (Mais, Gestão…) não sai do menu: redesenha e mantém o destaque no grupo
    if(el.classList.contains("nav-grupo")){ const nome = el.dataset.grupo; el.click();
      controleFocar(controleFocaveis(document.getElementById("sidebarMenu")).find(x => x.dataset && x.dataset.grupo === nome)); return; }
    controleFecharMenu(); el.click();
    // já na tela nova: o destaque nasce no primeiro botão dela
    controleMover(controleFocaveis(document.getElementById("conteudoPagina")), 1);
  }
}
/* Cartão: a mesma régua da confiança da questão (esquerda certeza → "sabia",
   baixo dúvida → "quase", cima chute → "não lembrei"). A nota só vale com o
   cartão virado, como no botão: tentar lembrar antes de virar é o que fixa. */
function controleNoCartao(botao, g){
  const s = state.sessaoFlash;
  if(botao===1){ virarFlashcard(); return; }   // botão da direita: virar (e desvirar), como o clique no cartão
  const nota = CONTROLE_BOTAO_NOTA_CARTAO[botao];
  if(nota && s.virado){ responderFlashcard(nota); controleVibrar(g, 100, 0.4); return; }
}
function controleFinalizar(){
  const s = state.sessaoAtual;
  if(!s || s.somenteLeitura || !s.itens) return;
  if(state.route==="sessao" && !s.finalizada && !indicesEmBranco(s).length){ finalizarSessaoPratica(); return; }
  if(state.route==="simulado-ativo" && !s.finalizado && s.itens.every(it => s.respostasSimulado[it.questaoId] !== undefined)){ pedirFinalizarSimulado(); return; }
  if(state.route==="sessao" || state.route==="simulado-ativo") toast("Responda todas as questões para finalizar com Select.");
}
function controleRespondida(){
  const s = state.sessaoAtual;
  if(!s || !s.itens) return false;
  if(state.route==="sessao" && !s.finalizada) return !!respostaDoIndice(s, s.indiceAtual);
  if(state.route==="simulado-ativo" && !s.finalizado && s.modoAprendizado) return s.respostasSimulado[s.itens[s.indiceAtual].questaoId] !== undefined;
  return false;
}
/* A questão que está aberta e ainda aceita resposta, com as funções que a
   tela dela já usa. Devolve null onde não há o que responder (resultado,
   questão já respondida, dissertativa, modo somente leitura), e o controle
   então só navega e rola. */
function controleContextoDaQuestao(){
  const s = state.sessaoAtual;
  if(!s || s.somenteLeitura || !s.itens) return null;
  const item = s.itens[s.indiceAtual]; if(!item) return null;
  const q = getQuestao(item.questaoId);
  if(!q || ehDissertativa(q) || !q.alternativas) return null;
  if(state.route==="sessao" && !s.finalizada){
    if(respostaDoIndice(s, s.indiceAtual)) return null;
    return { q, pedeConfianca:true, marcada:marcadaDaQuestao(item.questaoId), selecionar:selecionarAlternativa, confirmar:confirmarResposta,
      desmarcar(){ delete s.marcadas[item.questaoId]; salvarSessaoEmAndamento(); redesenharQuestaoDaSessao(); } };
  }
  if(state.route==="simulado-ativo" && !s.finalizado){
    const qid = item.questaoId;
    // modo aprendizado: escolher e depois confirmar com a confiança, como na prática
    if(s.modoAprendizado){
      if(s.respostasSimulado[qid] !== undefined) return null;
      return { q, pedeConfianca:true, marcada:(s.escolhaPendente||{})[qid] || null, selecionar:selecionarAlternativaSimulado, confirmar:confirmarRespostaSimulado,
        desmarcar(){ delete s.escolhaPendente[qid]; salvarSimuladoEmAndamento(); render(); } };
    }
    // prova de verdade: marcar já é responder, e marcar outra letra troca; não há confiança (L1 e riscar a marcada desfazem a resposta)
    return { q, pedeConfianca:false, marcada:s.respostasSimulado[qid] || null, selecionar:selecionarAlternativaSimulado, confirmar:null,
      desmarcar(){ delete s.respostasSimulado[qid]; salvarSimuladoEmAndamento(); render(); } };
  }
  return null;
}
controleIniciar();
