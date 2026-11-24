/* codigo/06e-modo-de-inicio.js — como o aluno quer começar: construir do zero ou reparar falhas (seção 5-E).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   5-E. MODO DE INÍCIO — do zero × reparar falhas (docs/PROJETO-INTEGRACAO-RESUMOS.md, seção 1)
   ==========================================================================
   Só 6º ano e Formado(a) escolhem. Quem está antes do 6º ano constrói do zero
   SEMPRE, pelo calendário da turma: ainda não viu a matéria inteira, então
   "reparar falhas" não tem o que reparar — por isso nem é perguntado.

   `u.modoDeInicio`:
     "zero"           construção do zero (Formado: o resumo de cada tema,
                      recomendado, e depois o conjunto planejado; 6º ano:
                      calendário do 6º ano)
     "reparar-tema"   reparar falhas por tema (só 6º ano: o conjunto planejado
                      direto, < 75% no tema sugere o resumo)
     "reparar-manter" reparar e manter (só Formado, 24/11/2026): 1º estágio,
                      o conjunto de cada tema da trilha como diagnóstico (< 75%
                      recomenda o resumo); 2º, o tema ≥ 75% entra em
                      manutenção ("Não esquecer", 05g)
   Valores antigos do Formado ("reparar" = continuar como está, e
   "reparar-tema") existem nos aparelhos E voltam da nuvem: são lidos como
   "reparar-manter" (traduzirModoDeInicio), nos dois caminhos. A migração do
   loadState (02) só reescreve "reparar", que nunca valeu fora do Formado;
   "reparar-tema" continua válido no 6º ano e por isso é traduzido na leitura.
   Ausente = ainda não escolheu (a pergunta aparece uma vez no Início). Valor
   que não vale para o ano da pessoa é lido como o padrão do ano, sem apagar
   a escolha: se ela voltar a esse ano, a escolha antiga volta a valer.

   Trocar de modo não apaga nem altera resposta, revisão ou meta: muda o que
   o cronograma sugere daqui para a frente. */
const MODOS_DE_INICIO = {
  zero: { nome: "Construir do zero", curto: "do zero",
    descricao: { formado: "Tema por tema: o resumo (recomendado, dá para pular), depois um conjunto de 20 questões escolhidas para cobrir cada parte do tema. Para quem quer rever a matéria inteira com calma.",
                 sexto: "Segue o calendário do 6º ano, estágio por estágio, com o resumo de cada tema recomendado antes das questões (dá para pular)." } },
  "reparar-tema": { nome: "Reparar falhas por tema", curto: "reparar falhas por tema",
    descricao: { sexto: "Direto às questões: 20 por tema, escolhidas para cobrir cada parte dele. Ficou abaixo de 75% no tema? A plataforma sugere o resumo, com um botão que leva até ele." } },
  "reparar-manter": { nome: "Reparar e manter", curto: "reparar e manter",
    descricao: { formado: "Primeiro, 20 questões por tema como diagnóstico (abaixo de 75%, o resumo é recomendado). Tema com 75% ou mais entra em \"Não esquecer\": poucas questões por dia para manter o que você já sabe." } },
};

// "formado" | "sexto" | null (antes do 6º ano, equipe ou sem ano: não escolhe)
function grupoDoModoDeInicio(u){
  u = u || usuarioAtual();
  if(!u || !(u.papel === "aluno" || state.modoAluno)) return null;
  if(typeof cronogramaDeFormado === "function" && cronogramaDeFormado(u)) return "formado";
  if(CONFIG.cronogramaDoSextoAno && CONFIG.cronogramaDoSextoAno.anos.includes(u.anoFaculdade)) return "sexto";
  return null;
}
function modosDeInicioDoGrupo(grupo){
  return Object.keys(MODOS_DE_INICIO).filter(id => MODOS_DE_INICIO[id].descricao[grupo]);
}
// valores antigos → os de hoje (ver o topo). Sem grupo: devolve como veio.
const MODOS_DE_INICIO_ANTIGOS = { formado: { reparar: "reparar-manter", "reparar-tema": "reparar-manter" } };
function traduzirModoDeInicio(valor, grupo){
  const t = grupo && MODOS_DE_INICIO_ANTIGOS[grupo];
  return (t && t[valor]) || valor;
}
// o modo que vale agora: a escolha (traduzida), se ela vale para o ano da pessoa; senão "zero"
function modoDeInicio(u){
  u = u || usuarioAtual();
  const grupo = grupoDoModoDeInicio(u);
  if(!grupo) return "zero";
  const modo = traduzirModoDeInicio(u.modoDeInicio, grupo);
  return modosDeInicioDoGrupo(grupo).includes(modo) ? modo : "zero";
}
function _gravarModoDeInicio(modo){
  const u = usuarioAtual(), grupo = grupoDoModoDeInicio(u);
  if(!u || !grupo || !modosDeInicioDoGrupo(grupo).includes(modo)) return false;
  u.modoDeInicio = modo;
  saveState();
  return true;
}
function definirModoDeInicio(modo){
  if(!_gravarModoDeInicio(modo)) return;
  fecharModal();
  render();
  toast("Você vai " + (modo === "zero" ? "construir do zero" : MODOS_DE_INICIO[modo].curto) + ". Dá para mudar em Perfil e configurações.");
  mostrarTutorialAoEntrar();   // o tutorial esperou as perguntas de primeira vez (no-op quando já visto)
}

function _cartoesDoModoDeInicio(grupo, atual, acao){
  return modosDeInicioDoGrupo(grupo).map(id => { const m = MODOS_DE_INICIO[id]; return `<div class="card ${id===atual?"borda-destaque":""}">
    <div class="card-title">${escapeHtml(m.nome)}</div>
    <p class="text-sm muted">${escapeHtml(m.descricao[grupo])}</p>
    <button class="btn ${id==="zero"?"btn-primary":"btn-secondary"} btn-block mt-2" onclick="${acao}('${id}')">${escapeHtml(m.nome)}</button>
  </div>`; }).join("");
}

/* A pergunta de primeira vez: mesmas regras da do modo da plataforma (06c) —
   só no Início, só para quem escolhe e ainda não escolheu, nunca por cima de
   outra janela, sem fechar por clique fora. Vem DEPOIS dela (13-tutorial
   encadeia as duas). Devolve true se abriu. */
function perguntarModoDeInicio(opts){
  opts = opts || {};
  const u = usuarioAtual(), grupo = grupoDoModoDeInicio(u);
  if(!CONFIG.integracaoResumos.modoDeInicio) return false;
  if(!u || !grupo || state.modoAluno || u.modoDeInicio) return false;
  if(!opts.mesmoComAutomacao && typeof navigator !== "undefined" && navigator.webdriver) return false;
  if(document.getElementById("modalOverlayAtivo")) return false;
  const opcoes = modosDeInicioDoGrupo(grupo);
  abrirModal(`<div class="modal-header"><h3>Como você quer começar?</h3></div>
    <p class="text-sm muted">${grupo === "formado"
      ? "Você pode reconstruir a matéria do começo, com os resumos antes das questões, ou reparar o que falta e manter o que já sabe."
      : "No 6º ano você pode seguir o calendário construindo do zero ou ir direto ao que precisa reparar."}
      Em todos os caminhos a sua meta diária ou semanal continua valendo.</p>
    <div class="grid grid-2 mt-2">${_cartoesDoModoDeInicio(grupo, "", "definirModoDeInicio")}</div>
    <p class="text-xs muted mt-2">Nada se perde ao trocar depois, em Perfil e configurações.</p>`, "lg");
  const overlay = document.getElementById("modalOverlayAtivo");
  if(overlay) overlay.onclick = null;
  return true;
}

// O cartão de Perfil e configurações. Antes do 6º ano explica por que não há escolha.
function renderCardModoDeInicio(u){
  if(!CONFIG.integracaoResumos.modoDeInicio) return "";
  if(!u || !(u.papel === "aluno" || state.modoAluno)) return "";
  const grupo = grupoDoModoDeInicio(u);
  if(!grupo) return `<div class="card mt-2" style="max-width:460px">
    <div class="card-title">Como você estuda</div>
    <p class="text-sm muted">Antes do 6º ano você constrói o conhecimento do zero, pelo calendário da sua turma, com o resumo de cada tema recomendado antes das questões — se já domina o tema, pode pular direto para elas. A escolha entre construir do zero e reparar falhas abre no 6º ano.</p>
  </div>`;
  const atual = modoDeInicio(u);
  return `<div class="card mt-2" style="max-width:460px">
    <div class="card-title">Como você estuda</div>
    <p class="text-sm muted">Muda o que o cronograma sugere daqui para a frente. Suas respostas, revisões e meta continuam como estão.</p>
    ${modosDeInicioDoGrupo(grupo).map(id => `<label class="checkbox-row mt-1" style="align-items:flex-start">
      <input type="radio" name="modoDeInicio" value="${id}" ${atual===id?"checked":""} onchange="trocarModoDeInicio('${id}')">
      <span><strong>${escapeHtml(MODOS_DE_INICIO[id].nome)}</strong><span class="text-xs muted" style="display:block">${escapeHtml(MODOS_DE_INICIO[id].descricao[grupo])}</span></span>
    </label>`).join("")}
  </div>`;
}
function trocarModoDeInicio(modo){
  const u = usuarioAtual();
  if(!u || modoDeInicio(u) === modo || !_gravarModoDeInicio(modo)) return;
  render();
  toast("Agora: " + MODOS_DE_INICIO[modo].nome.toLowerCase() + ". Seus dados continuam todos guardados.");
}
