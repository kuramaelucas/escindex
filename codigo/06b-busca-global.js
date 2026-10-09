/* codigo/06b-busca-global.js — busca global (Ctrl/Cmd+K ou o botão do topo): ir para uma tela, abrir um assunto ou achar uma questão pelo enunciado.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   5-B. BUSCA GLOBAL
   ========================================================================== */
/* Quem enxerga o quê: a pessoa estudando (aluno, ou equipe em modo aluno) só
   acha as questões que entrariam na fila de estudo dela — sem anuladas, sem
   as que esperam figura, sem as que ela escondeu. A equipe fora do modo aluno
   acha tudo do banco, porque o uso dela é achar a questão para consertá-la. */
const BUSCA_MIN_LETRAS_QUESTAO = 3;
const BUSCA_MAX_QUESTOES = 8;
const BUSCA_MAX_ASSUNTOS = 6;
let _buscaItens = [];       // o que está na lista agora (cada um com a ação que roda ao escolher)
let _buscaSel = 0;          // posição destacada
let _buscaIndice = null;    // texto já normalizado de cada questão; refeito quando o banco muda

// sem acento e em minúsculas: "cardiopatia" acha "Cardiopatías" e "CARDIOPATIA"
function buscaNormalizar(s){
  return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}
function buscaComoAluno(u){ return !!u && (u.papel==="aluno" || state.modoAluno); }
function buscaPoolDeQuestoes(u){
  return buscaComoAluno(u) ? questoesParaEstudo(u.id, idsDosGruposDoUsuario(u)) : db.questoes;
}
/* Normalizar ~5 mil enunciados a cada tecla travaria o celular; por isso o
   texto de cada questão é normalizado uma vez e só refeito quando o banco
   muda (_geracaoDb sobe a cada saveState) ou a lista que a pessoa enxerga muda. */
function buscaIndiceDeQuestoes(u){
  const chave = _geracaoDb + "|" + (u ? u.id : "") + "|" + (buscaComoAluno(u) ? "a" : "e");
  if(_buscaIndice && _buscaIndice.chave === chave) return _buscaIndice.itens;
  const itens = buscaPoolDeQuestoes(u).map(q => ({
    q,
    texto: buscaNormalizar([q.enunciado, nomeAssunto(q.assuntoId), q.banca, q.ano, (q.alternativas||[]).map(a=>a.texto).join(" ")].join(" ")),
  }));
  _buscaIndice = { chave, itens };
  return itens;
}
function buscaPalavras(termo){ return buscaNormalizar(termo).split(/\s+/).filter(Boolean); }
// um trecho do enunciado em volta da primeira palavra achada, para a pessoa reconhecer a questão
function buscaTrecho(q, palavras){
  const txt = String(q.enunciado || "").replace(/\s+/g, " ");
  const norm = buscaNormalizar(txt);
  const pos = palavras.map(p => norm.indexOf(p)).filter(i => i >= 0).sort((a,b)=>a-b)[0];
  if(pos === undefined) return txt.slice(0, 110) + (txt.length > 110 ? "…" : "");
  const ini = Math.max(0, pos - 40);
  return (ini > 0 ? "…" : "") + txt.slice(ini, ini + 130) + (ini + 130 < txt.length ? "…" : "");
}
function buscaItensDeTelas(u, palavras){
  const telas = navItemsParaPapel(u.papel).slice();
  if(!telas.some(t => t.id==="perfil")) telas.push({id:"perfil", label:"Perfil e configurações", icon:"user"});
  if(!telas.some(t => t.id==="livro-ouro")) telas.push({id:"livro-ouro", label:"Livro de Ouro", icon:"star"});
  return telas
    .filter(t => { const n = buscaNormalizar(t.label); return palavras.every(p => n.includes(p)); })
    .map(t => ({ tipo:"Tela", icone:t.icon, titulo:t.label, acao:() => navigate(t.id) }));
}
function buscaItensDeAssuntos(u, palavras){
  if(!buscaComoAluno(u) || !palavras.length) return [];
  const comQuestao = new Set(questoesParaEstudo(u.id).map(q => q.assuntoId));
  return db.taxonomia.assuntos
    .filter(a => comQuestao.has(a.id) && palavras.every(p => buscaNormalizar(a.nome).includes(p)))
    .slice(0, BUSCA_MAX_ASSUNTOS)
    .map(a => ({ tipo:"Assunto", icone:"book", titulo:a.nome, detalhe:"Praticar até 15 questões deste assunto", acao:() => praticarAssunto(a.id) }));
}
function buscaItensDeQuestoes(u, palavras){
  if(palavras.join("").length < BUSCA_MIN_LETRAS_QUESTAO) return [];
  const achadas = [];
  for(const it of buscaIndiceDeQuestoes(u)){
    if(palavras.every(p => it.texto.includes(p))){ achadas.push(it.q); if(achadas.length >= BUSCA_MAX_QUESTOES) break; }
  }
  return achadas.map(q => ({
    tipo:"Questão", icone:"search", questaoId:q.id,
    titulo:buscaTrecho(q, palavras),
    detalhe:q.banca + " · " + anoDaProva(q) + (q.numeroNaProva ? " · nº " + q.numeroNaProva : "") + " · " + nomeAssunto(q.assuntoId),
    acao:() => abrirQuestaoCompleta(q.id),
  }));
}
function buscaResultados(termo){
  const u = usuarioAtual();
  if(!u) return [];
  const palavras = buscaPalavras(termo);
  return buscaItensDeTelas(u, palavras).concat(buscaItensDeAssuntos(u, palavras), buscaItensDeQuestoes(u, palavras));
}

function htmlItensDaBusca(termo){
  if(!_buscaItens.length){
    return `<div class="busca-vazio text-sm muted">${buscaPalavras(termo).length ? "Nada encontrado para “"+escapeHtml(termo.trim())+"”." : ""}</div>`;
  }
  let tipoAnterior = "";
  return _buscaItens.map((it, i) => {
    const cab = it.tipo !== tipoAnterior ? `<div class="busca-grupo">${it.tipo === "Tela" ? "Telas" : it.tipo === "Assunto" ? "Assuntos" : "Questões"}</div>` : "";
    tipoAnterior = it.tipo;
    return cab + `<button class="busca-item ${i===_buscaSel?"sel":""}" role="option" aria-selected="${i===_buscaSel}" data-i="${i}" onclick="buscaEscolher(${i})" onmousemove="buscaDestacar(${i}, true)">
      ${iconeSvg(it.icone)}<span class="busca-item-texto"><span class="busca-item-titulo">${escapeHtml(it.titulo)}</span>${it.detalhe ? `<span class="busca-item-detalhe">${escapeHtml(it.detalhe)}</span>` : ""}</span>
    </button>`;
  }).join("");
}
function buscaDesenhar(){
  const campo = document.getElementById("buscaGlobalCampo");
  const lista = document.getElementById("buscaGlobalLista");
  if(!campo || !lista) return;
  const termo = campo.value;
  _buscaItens = buscaResultados(termo);
  _buscaSel = 0;
  lista.innerHTML = htmlItensDaBusca(termo);
}
function buscaDestacar(i, soMarcar){
  if(i < 0 || i >= _buscaItens.length || i === _buscaSel) return;
  const lista = document.getElementById("buscaGlobalLista");
  if(!lista) return;
  lista.querySelector(".busca-item.sel")?.classList.remove("sel");
  const novo = lista.querySelector('.busca-item[data-i="'+i+'"]');
  if(novo){ novo.classList.add("sel"); if(!soMarcar) novo.scrollIntoView({block:"nearest"}); }
  _buscaSel = i;
}
function buscaEscolher(i){
  const it = _buscaItens[i];
  if(!it) return;
  fecharModal();
  it.acao();
}
function buscaTeclado(e){
  if(e.key === "ArrowDown"){ e.preventDefault(); buscaDestacar(Math.min(_buscaSel + 1, _buscaItens.length - 1)); }
  else if(e.key === "ArrowUp"){ e.preventDefault(); buscaDestacar(Math.max(_buscaSel - 1, 0)); }
  else if(e.key === "Enter"){ e.preventDefault(); buscaEscolher(_buscaSel); }
  else if(e.key === "Escape"){ e.preventDefault(); fecharModal(); }
}
function abrirBuscaGlobal(){
  const u = usuarioAtual();
  if(!u) return;
  // no meio de um simulado cronometrado a busca levaria a pessoa para fora da prova sem querer
  if(state.route === "simulado-ativo" && state.sessaoAtual && !state.sessaoAtual.finalizado) return;
  abrirModal(`
    <div class="busca-global">
      <div class="busca-campo">${iconeSvg("search")}<input class="input" id="buscaGlobalCampo" type="search" autocomplete="off" aria-label="Buscar telas, assuntos e questões" placeholder="${buscaComoAluno(u) ? "Ir para uma tela, um assunto ou achar uma questão…" : "Ir para uma tela ou achar uma questão…"}" oninput="buscaDesenhar()" onkeydown="buscaTeclado(event)"></div>
      <div class="busca-lista" id="buscaGlobalLista" role="listbox" aria-label="Resultados"></div>
      <div class="busca-rodape text-xs muted">↑ ↓ para escolher · Enter para abrir · Esc para fechar</div>
    </div>`);
  buscaDesenhar();
  document.getElementById("buscaGlobalCampo").focus();
}
function htmlBotaoBusca(){
  const atalho = /Mac|iPhone|iPad/.test(navigator.platform || "") ? "⌘ K" : "Ctrl K";
  return `<button class="busca-topo" onclick="abrirBuscaGlobal()" aria-label="Buscar telas, assuntos e questões (${atalho})">${iconeSvg("search")}<span class="busca-topo-texto">Buscar</span><kbd>${atalho}</kbd></button>`;
}
// Ctrl/Cmd+K abre de qualquer tela; "Esc" e as setas são do próprio campo (buscaTeclado)
window.addEventListener("keydown", function(e){
  if((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "k"){
    e.preventDefault();
    if(document.getElementById("buscaGlobalCampo")) fecharModal(); else abrirBuscaGlobal();
  }
});
