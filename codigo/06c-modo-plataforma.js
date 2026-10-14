/* codigo/06c-modo-plataforma.js — modo resumido × estatístico do aluno: a escolha, a pergunta, o cartão do Perfil (seção 5-C).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   5-C. MODO DA PLATAFORMA — resumido (padrão) ou estatístico
   ==========================================================================
   É só APRESENTAÇÃO. O modo resumido esconde quadros de estatística, textos
   explicativos e itens do menu; nunca esconde um campo que coleta dado (a
   confiança da questão, a autoavaliação do cartão) e nunca deixa de gravar
   nada. Trocar de modo, nos dois sentidos, não apaga nem altera uma resposta,
   revisão, cartão ou meta: muda `u.modoPlataforma` e redesenha.

   Quem ainda não escolheu usa o resumido e é perguntado uma vez (ver
   perguntarModoDaPlataforma); a escolha fica no cadastro da pessoa e, com a
   nuvem ligada, vai para a conta (perfis.modo_plataforma), então vale em
   qualquer aparelho. Equipe não tem modo: vê tudo, exceto no "modo aluno",
   que mostra o que o aluno veria.

   O que o resumido reduz nunca some sem rastro: as explicações de "por que
   esta questão / esta sessão" ficam recolhidas atrás de um "Por quê?"
   (explicacaoRecolhida), porque a plataforma explica o que faz. */
const MODOS_PLATAFORMA = {
  resumido: { nome: "Resumido", descricao: "Só o essencial: a meta do dia, o botão de começar e um menu enxuto (Início, Estudar, Revisão Rápida e Meu Desempenho; o resto em “Mais”). Sem os quadros de sugestões e os textos explicativos." },
  estatistico: { nome: "Estatístico", descricao: "Tudo à mostra: sugestões de assuntos, o que mais cai e você erra, explicações de por que cada questão e cada sessão aparecem, e o menu completo." },
};
const ITENS_DO_MENU_RESUMIDO = ["inicio", "estudar", "flashcards", "desempenho"];

function modoDaPlataforma(u){
  u = u || usuarioAtual();
  if(!u || !(u.papel === "aluno" || state.modoAluno)) return "estatistico";
  return u.modoPlataforma === "estatistico" ? "estatistico" : "resumido";
}
function modoResumido(){ return modoDaPlataforma() === "resumido"; }
// trecho que só existe no modo estatístico (no resumido, nada é desenhado)
function soNoEstatistico(html){ return modoResumido() ? "" : html; }
// o mesmo trecho, mas no resumido fica atrás de um "Por quê?" em vez de sumir
function explicacaoRecolhida(titulo, html){
  if(!modoResumido()) return html;
  return `<details class="detalhes-bloco text-sm muted mt-1"><summary>${escapeHtml(titulo)}</summary>${html}</details>`;
}

function definirModoPlataforma(modo){
  const u = usuarioAtual();
  if(!u || !MODOS_PLATAFORMA[modo]) return;
  u.modoPlataforma = modo;
  saveState();
  fecharModal();
  render();
  toast("Modo " + MODOS_PLATAFORMA[modo].nome.toLowerCase() + " ativado. Seus dados continuam todos guardados.");
  mostrarTutorialAoEntrar();   // se a pergunta adiou o tutorial, ele vem agora (no-op quando já visto)
}

/* A pergunta de primeira vez: só ao chegar no Início, só para aluno que ainda
   não escolheu, nunca por cima de outra janela. A janela não fecha por clique
   fora nem tem X — fechar sem escolher deixaria a pessoa sem decisão guardada
   e a pergunta voltaria; escolher é um clique. Devolve true se abriu. */
function perguntarModoDaPlataforma(opts){
  opts = opts || {};
  const u = usuarioAtual();
  if(!u || u.papel !== "aluno" || state.modoAluno || u.modoPlataforma) return false;
  if(!opts.mesmoComAutomacao && typeof navigator !== "undefined" && navigator.webdriver) return false;
  if(document.getElementById("modalOverlayAtivo")) return false;
  abrirModal(`<div class="modal-header"><h3>Como você prefere usar o Esc?</h3></div>
    <p class="text-sm muted">Você começa no modo <strong>resumido</strong>. Se preferir ver as estatísticas e as explicações completas, escolha o estatístico. Em nenhum dos dois você perde dados.</p>
    <div class="grid grid-2 mt-2">
      ${Object.entries(MODOS_PLATAFORMA).map(([id, m]) => `<div class="card ${id==="resumido"?"borda-destaque":""}">
        <div class="card-title">${escapeHtml(m.nome)}${id==="resumido" ? ' <span class="badge badge-accent">atual</span>' : ""}</div>
        <p class="text-sm muted">${escapeHtml(m.descricao)}</p>
        <button class="btn ${id==="resumido"?"btn-primary":"btn-secondary"} btn-block mt-2" onclick="definirModoPlataforma('${id}')">${id==="resumido" ? "Ficar no resumido" : "Quero o estatístico"}</button>
      </div>`).join("")}
    </div>
    <p class="text-xs muted mt-2">Dá para mudar quando quiser, em Perfil e configurações.</p>`, "lg");
  const overlay = document.getElementById("modalOverlayAtivo");
  if(overlay) overlay.onclick = null;
  return true;
}

// O cartão de Perfil e configurações: troca na hora, nos dois sentidos.
function renderCardModoPlataforma(u){
  if(!u || !(u.papel === "aluno" || state.modoAluno)) return "";
  const atual = modoDaPlataforma(u);
  return `<div class="card mt-2" style="max-width:460px">
    <div class="card-title">Modo da plataforma</div>
    <p class="text-sm muted">Muda só o que você vê. As suas respostas, revisões, cartões e metas são guardados do mesmo jeito nos dois modos, e nada se perde ao trocar.</p>
    ${Object.entries(MODOS_PLATAFORMA).map(([id, m]) => `<label class="checkbox-row mt-1" style="align-items:flex-start">
      <input type="radio" name="modoPlataforma" value="${id}" ${atual===id?"checked":""} onchange="trocarModoPlataforma('${id}')">
      <span><strong>${escapeHtml(m.nome)}</strong><span class="text-xs muted" style="display:block">${escapeHtml(m.descricao)}</span></span>
    </label>`).join("")}
  </div>`;
}
function trocarModoPlataforma(modo){
  const u = usuarioAtual();
  if(!u || !MODOS_PLATAFORMA[modo] || u.modoPlataforma === modo) return;
  u.modoPlataforma = modo;
  saveState();
  render();
  toast("Modo " + MODOS_PLATAFORMA[modo].nome.toLowerCase() + " ativado. Seus dados continuam todos guardados.");
}
// a linha discreta do Início que avisa do modo e leva à troca
function htmlNotaModoResumido(){
  if(!modoResumido()) return "";
  return `<p class="text-xs muted mt-2">Você está no modo resumido: sem os quadros de estatística e os textos extras. <button class="link-btn" onclick="navigate('perfil')">Mudar o modo</button></p>`;
}
