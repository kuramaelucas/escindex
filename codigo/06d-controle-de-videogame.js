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
     setas ↑ ↓ / analógico esquerdo   rolam a tela (ou a janela aberta); o analógico direito rola mais rápido
     setas ← →                        questão ou cartão anterior / próximo
     botões da direita (questão)      A = cima · B = esquerda · C = direita · D = baixo · R1/RB = E
     com a alternativa marcada        cima = chute · esquerda = certeza · baixo = dúvida
                                      (C e E continuam trocando a alternativa)
     L1 / LB                          desmarca, para voltar a escolher A, B ou D
     L3 (analógico apertado)          risca a alternativa marcada (é o × do mouse)
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
const CONTROLE_BOTAO = { desmarcar:4, riscar:10, cima:12, baixo:13, esquerda:14, direita:15 };
const CONTROLE_VELOCIDADES = { lenta:{ nome:"Lenta", px:450 }, normal:{ nome:"Normal", px:900 }, rapida:{ nome:"Rápida", px:1600 } };
const CONTROLE_ZONA_MORTA = 0.25;   // o analógico nunca volta exatamente a zero: sem folga a tela andaria sozinha
const CONTROLE_CHAVE = "esc_controle_v1";

const controleEstado = { rodando:false, anterior:{}, ultimoQuadro:0, avisou:false };

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
    <p class="text-sm muted">Com um controle conectado (aperte um botão para o navegador reconhecê-lo), as setas rolam e trocam de questão, e os botões da direita escolhem a alternativa e a confiança. ${controleConectados().length ? "<strong>Há um controle conectado agora.</strong>" : "Nenhum controle conectado agora."} Esta opção vale só neste aparelho.</p>
    <label class="checkbox-row mt-1"><input type="checkbox" ${c.ativo?"checked":""} onchange="controleSalvarConfig({ativo:this.checked})"><span>Usar o controle quando conectado</span></label>
    <div class="field mt-1"><label class="label" for="controleVelocidade">Velocidade da rolagem</label>
      <select class="input" id="controleVelocidade" style="max-width:200px" onchange="controleSalvarConfig({velocidade:this.value})">
        ${Object.entries(CONTROLE_VELOCIDADES).map(([id, v]) => `<option value="${id}" ${c.velocidade===id?"selected":""}>${v.nome}</option>`).join("")}
      </select></div>
  </div>`;
}

/* ---------- rótulos de equivalência (entram no HTML; o desenho é do CSS) ---------- */
/* `emConfirmacao`: já há alternativa marcada esperando a confiança. Nesse
   momento cima, esquerda e baixo passam a significar a confiança, então só C e E
   mostram a letra (são os botões que ainda trocam a alternativa). Mostrar "A"
   ali ensinaria um botão que não faz isso. */
function htmlDicaDoControle(posicao){
  return posicao ? `<span class="dica-controle" data-pos="${posicao}" aria-hidden="true"></span>` : "";
}
function htmlDicaDoControleAlternativa(letra, emConfirmacao){
  if(emConfirmacao && letra!=="C" && letra!=="E") return "";
  return htmlDicaDoControle(CONTROLE_POS_LETRA[letra]);
}
function htmlDicaDoControleConfianca(confianca){ return htmlDicaDoControle(CONTROLE_POS_CONFIANCA[confianca]); }
function htmlDicaDoControleNotaCartao(nota){ return htmlDicaDoControle(CONTROLE_POS_NOTA_CARTAO[nota]); }
function htmlDicaDoControleTrocar(){
  return `<div class="dica-controle-linha text-xs muted mt-1">Controle: L1 / LB desmarca para escolher outra alternativa; L3 (analógico apertado) risca a marcada.</div>`;
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
      if(atual[CONTROLE_BOTAO.cima]) rolar -= 1;
      if(atual[CONTROLE_BOTAO.baixo]) rolar += 1;
      const esquerdo = g.axes && g.axes[1] || 0;
      if(Math.abs(esquerdo) > CONTROLE_ZONA_MORTA) rolar += esquerdo;
      const direito = g.axes && g.axes[3] || 0;
      if(Math.abs(direito) > CONTROLE_ZONA_MORTA) rolar += direito * 2.5;   // o direito é o "rolar depressa", para explicações longas
    }
    controleEstado.anterior[g.index] = atual;
  });
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
function controleAoApertar(botao, g){
  const alvo = document.activeElement;
  if(alvo && (alvo.tagName==="INPUT" || alvo.tagName==="TEXTAREA" || alvo.isContentEditable)) return;   // quem está escrevendo não responde sem querer
  if(controleJanelaAberta()) return;   // com uma janela aberta o controle só rola; responder por trás dela seria às cegas
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
  if(botao===CONTROLE_BOTAO.riscar){
    // riscar o que acabou de marcar: desmarca e risca, como o × do mouse (só na prática, onde o × existe)
    if(ctx.marcada && ctx.desmarcar && state.route==="sessao"){ const letra = ctx.marcada; ctx.desmarcar(); alternarAlternativaEliminada(letra); }
    return;
  }
  if(ctx.pedeConfianca && ctx.marcada && CONTROLE_BOTAO_CONFIANCA[botao]){
    ctx.confirmar(CONTROLE_BOTAO_CONFIANCA[botao]);
    const r = state.route==="sessao" && state.sessaoAtual ? respostaDoIndice(state.sessaoAtual, state.sessaoAtual.indiceAtual) : null;
    if(r && !r.correta) controleVibrar(g, 450, 0.9); else controleVibrar(g, 120, 0.5);
    return;
  }
  const letra = CONTROLE_BOTAO_LETRA[botao];
  if(letra && ctx.q.alternativas.some(a => a.id===letra)) ctx.selecionar(letra);
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
    // prova de verdade: marcar já é responder, e marcar outra letra troca; não há confiança nem desmarcar
    return { q, pedeConfianca:false, marcada:s.respostasSimulado[qid] || null, selecionar:selecionarAlternativaSimulado, confirmar:null, desmarcar:null };
  }
  return null;
}
controleIniciar();
