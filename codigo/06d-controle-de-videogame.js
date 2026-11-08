/* codigo/06d-controle-de-videogame.js — controle de videogame (Gamepad API) na sessão de questões e no simulado (seção 5-D).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   5-D. CONTROLE DE VIDEOGAME
   ==========================================================================
   Quem estuda deitado ou longe da mesa responde com o controle, sem teclado
   nem mouse. É só um jeito de CHEGAR às mesmas funções que o clique e o
   teclado já chamam (selecionarAlternativa, confirmarResposta,
   avancarPorGesto…): nenhuma regra de estudo muda aqui, então a confiança
   continua sendo declarada pela pessoa e marcar continua não sendo responder.

   Mapa (mapeamento "standard" da Gamepad API; vale para Xbox, PlayStation e
   os genéricos que o navegador reconhece):
     setas ↑ ↓ (e analógico esquerdo)  rolam a tela (ou a janela aberta)
     setas ← →                        questão anterior / próxima (como as setas do teclado)
     botões da direita                A = cima · B = esquerda · C = direita · D = baixo
     R1 / RB                          alternativa E (provas de 5 alternativas)
     com uma alternativa marcada      cima = chute · esquerda = certeza · baixo = dúvida
                                      (C e E continuam trocando a alternativa)
     L1 / LB                          desmarca, para voltar a escolher A, B ou D

   Os rótulos de equivalência (qual botão é qual) existem no HTML o tempo todo,
   mas só aparecem com um controle conectado (`body.com-controle`): quem não
   usa controle não vê nada novo. Mostram a POSIÇÃO do botão (▲ ◀ ▶ ▼), e não
   o desenho de um fabricante, porque o mesmo botão tem nome diferente em cada
   marca. */

const CONTROLE_BOTAO_LETRA = { 3:"A", 2:"B", 1:"C", 0:"D", 5:"E" };
const CONTROLE_BOTAO_CONFIANCA = { 3:"chute", 2:"certeza", 0:"duvida" };
const CONTROLE_GLIFO_LETRA = { A:"▲", B:"◀", C:"▶", D:"▼", E:"R1" };
const CONTROLE_GLIFO_CONFIANCA = { chute:"▲", certeza:"◀", duvida:"▼" };
const CONTROLE_BOTAO = { desmarcar:4, cima:12, baixo:13, esquerda:14, direita:15 };
const CONTROLE_PX_POR_SEGUNDO = 900;
const CONTROLE_ZONA_MORTA = 0.25;   // o analógico nunca volta exatamente a zero: sem folga a tela andaria sozinha

const controleEstado = { rodando:false, anterior:{}, ultimoQuadro:0, avisou:false };

/* ---------- rótulos de equivalência (entram no HTML da questão) ---------- */
/* `emConfirmacao`: já há alternativa marcada esperando a confiança. Nesse
   momento ▲ ◀ ▼ passam a significar a confiança, então só C e E mostram a
   letra (são os botões que ainda trocam a alternativa). Mostrar "A = ▲" ali
   ensinaria um botão que não faz isso. */
function htmlDicaDoControleAlternativa(letra, emConfirmacao){
  const glifo = CONTROLE_GLIFO_LETRA[letra];
  if(!glifo || (emConfirmacao && letra!=="C" && letra!=="E")) return "";
  return `<span class="dica-controle" title="No controle: botão ${glifo}" aria-hidden="true">${glifo}</span>`;
}
function htmlDicaDoControleConfianca(confianca){
  const glifo = CONTROLE_GLIFO_CONFIANCA[confianca];
  return glifo ? `<span class="dica-controle" title="No controle: botão ${glifo}" aria-hidden="true">${glifo}</span>` : "";
}
function htmlDicaDoControleTrocar(){
  return `<div class="dica-controle-linha text-xs muted mt-1">Controle: L1 / LB desmarca para escolher outra alternativa.</div>`;
}

/* ---------- conexão ---------- */
function controleConectados(){
  const lista = typeof navigator.getGamepads === "function" ? navigator.getGamepads() : [];
  return Array.from(lista || []).filter(g => g && g.connected);
}
function controleAtualizarClasse(){
  if(document.body) document.body.classList.toggle("com-controle", controleConectados().length > 0);
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
  if(!controleEstado.avisou){ controleEstado.avisou = true; toast("Controle conectado: os botões aparecem nas alternativas."); }
});
window.addEventListener("gamepaddisconnected", function(){ controleAtualizarClasse(); });

/* Um laço só, e só enquanto há controle: sem ele nada roda. A leitura é por
   quadro porque a Gamepad API não avisa quando um botão muda, só entrega o
   estado de agora; o aperto é o momento em que passa de solto para apertado. */
function controleQuadro(agora){
  const pads = controleConectados();
  controleAtualizarClasse();
  if(!pads.length){ controleEstado.rodando = false; return; }
  const dt = controleEstado.ultimoQuadro ? Math.min(0.05, (agora - controleEstado.ultimoQuadro) / 1000) : 0.016;
  controleEstado.ultimoQuadro = agora;
  let rolar = 0;
  pads.forEach(g => {
    const antes = controleEstado.anterior[g.index] || [];
    const atual = Array.from(g.buttons).map(b => b.pressed);
    atual.forEach((apertado, i) => { if(apertado && !antes[i]) controleAoApertar(i); });
    controleEstado.anterior[g.index] = atual;
    if(atual[CONTROLE_BOTAO.cima]) rolar -= 1;
    if(atual[CONTROLE_BOTAO.baixo]) rolar += 1;
    const analogico = g.axes && g.axes[1] || 0;
    if(Math.abs(analogico) > CONTROLE_ZONA_MORTA) rolar += analogico;
  });
  if(rolar) controleRolar(Math.max(-1, Math.min(1, rolar)) * CONTROLE_PX_POR_SEGUNDO * dt);
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
function controleAoApertar(botao){
  const alvo = document.activeElement;
  if(alvo && (alvo.tagName==="INPUT" || alvo.tagName==="TEXTAREA" || alvo.isContentEditable)) return;   // quem está escrevendo não responde sem querer
  if(controleJanelaAberta()) return;   // com uma janela aberta o controle só rola; responder por trás dela seria às cegas
  if(botao===CONTROLE_BOTAO.esquerda){ voltarPorGesto(); return; }
  if(botao===CONTROLE_BOTAO.direita){ avancarPorGesto(); return; }
  const ctx = controleContextoDaQuestao();
  if(!ctx) return;
  if(botao===CONTROLE_BOTAO.desmarcar){ if(ctx.marcada && ctx.desmarcar) ctx.desmarcar(); return; }
  if(ctx.pedeConfianca && ctx.marcada && CONTROLE_BOTAO_CONFIANCA[botao]){ ctx.confirmar(CONTROLE_BOTAO_CONFIANCA[botao]); return; }
  const letra = CONTROLE_BOTAO_LETRA[botao];
  if(letra && ctx.q.alternativas.some(a => a.id===letra)) ctx.selecionar(letra);
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
