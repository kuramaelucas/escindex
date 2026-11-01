/* codigo/04-utilitarios.js — utilidades (seção 3): datas, paginação, janelas (abrirModal, cabecalhoJanela), baixarArquivo, gráficos SVG, rodízio de blocos, consultas por id e permissões de administrador.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   3. UTILITÁRIOS GERAIS
   ========================================================================== */
function uid(prefixo){ return prefixo+"-"+Date.now().toString(36)+Math.random().toString(36).slice(2,7); }

function escapeHtml(str){
  if(str===undefined || str===null) return "";
  return String(str).replace(/[&<>"']/g, function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
  });
}

function iconeSvg(nome, cls){ return '<svg class="icon '+(cls||'')+'"><use href="#i-'+nome+'"></use></svg>'; }

/* ---------- paginação de listas longas -------------------------------------
   Toda tela que lista conteúdo (banco de questões, usuários, favoritos,
   histórico, controle de qualidade, flashcards) desenhava a lista inteira de
   uma vez. Com 135 questões isso não incomoda; com as provas reais carregadas
   (milhares de questões) a tela demoraria a abrir e ninguém rolaria até o fim
   mesmo. Aqui a lista é cortada em páginas.

   Como usar numa tela:
     const p = paginar(lista, "banco", {assinatura: JSON.stringify(filtros)});
     ... desenhe p.itens ...
     ${controlesPaginacao(p, "questão(ões)")}

   A "assinatura" é o que faz a página voltar para a 1 sozinha quando os
   filtros mudam — sem isso, filtrar estando na página 7 mostraria uma lista
   vazia e pareceria um erro. */
/* ORDENAR TABELA PELO TÍTULO DA COLUNA — clique no título ordena; clicar de
   novo inverte. Colunas de número e data começam do maior para o menor (é o
   que se quer ver primeiro: quem mais estudou, o uso mais recente); colunas de
   texto começam em ordem alfabética (clicar em "Aluno" dá A→Z). Vazio ("nunca
   usou", sem valor) vai sempre para o fim, nas duas direções. O empate mantém
   a ordem que a lista já tinha, então a escolha do seletor continua valendo
   como desempate. A escolha vive em `state.filtroRota`, junto dos filtros. */
function ordemDaTabela(tabela){ return (state.filtroRota.ordemTabelas || {})[tabela] || null; }
function limparOrdemDaTabela(tabela){ if(state.filtroRota.ordemTabelas) delete state.filtroRota.ordemTabelas[tabela]; }
function assinaturaOrdemDaTabela(tabela){ const o = ordemDaTabela(tabela); return o ? o.col + ":" + o.dir : ""; }
function clicarOrdemDaTabela(tabela, col, tipo){
  const todas = state.filtroRota.ordemTabelas = state.filtroRota.ordemTabelas || {};
  const o = todas[tabela];
  todas[tabela] = (o && o.col === col) ? { col, dir: o.dir === "desc" ? "asc" : "desc" } : { col, dir: tipo === "texto" ? "asc" : "desc" };
  render();
}
function cabecalhoOrdenavel(tabela, col, rotulo, tipo){
  const o = ordemDaTabela(tabela);
  const ativa = !!o && o.col === col;
  const seta = ativa ? (o.dir === "desc" ? " ▼" : " ▲") : "";
  const sort = ativa ? (o.dir === "desc" ? "descending" : "ascending") : "none";
  return `<th aria-sort="${sort}"><button type="button" class="th-ordem ${ativa ? "ativa" : ""}" title="Ordenar por ${escapeHtml(String(rotulo).replace(/<[^>]*>/g, ""))} (clique de novo para inverter)" onclick="clicarOrdemDaTabela('${tabela}','${col}','${tipo || "numero"}')">${rotulo}${seta}</button></th>`;
}
function ordenarPorColuna(lista, tabela, valores){
  const o = ordemDaTabela(tabela), valor = o && valores[o.col];
  if(!valor) return lista;
  const sinal = o.dir === "desc" ? -1 : 1;
  const vazio = v => v === null || v === undefined || v === "";
  const cmp = (a, b) => (typeof a === "number" && typeof b === "number") ? a - b : String(a).localeCompare(String(b), "pt-BR", { numeric: true, sensitivity: "base" });
  return lista.map((x, i) => ({ x, i, v: valor(x) })).sort((p, q) =>
    (vazio(p.v) || vazio(q.v)) ? (vazio(p.v) - vazio(q.v)) || (p.i - q.i) : (sinal * cmp(p.v, q.v)) || (p.i - q.i)).map(e => e.x);
}

const ITENS_POR_PAGINA = 25;
function estadoPaginas(){
  if(!state.filtroRota.paginas) state.filtroRota.paginas = {};
  return state.filtroRota.paginas;
}
function paginar(lista, chave, opts){
  opts = opts || {};
  const tamanho = opts.porPagina || ITENS_POR_PAGINA;
  const assinatura = opts.assinatura!==undefined ? String(opts.assinatura) : String(lista.length);
  const guardado = estadoPaginas()[chave];
  let pagina = (guardado && guardado.assinatura===assinatura) ? guardado.pagina : 1;
  const paginas = Math.max(1, Math.ceil(lista.length/tamanho));
  if(pagina > paginas) pagina = paginas;
  if(pagina < 1) pagina = 1;
  estadoPaginas()[chave] = {pagina, assinatura};
  const inicio = (pagina-1)*tamanho;
  return {
    chave, pagina, paginas, tamanho,
    total: lista.length,
    primeiro: lista.length ? inicio+1 : 0,
    ultimo: Math.min(inicio+tamanho, lista.length),
    itens: lista.slice(inicio, inicio+tamanho),
  };
}
function irParaPagina(chave, numero){
  const guardado = estadoPaginas()[chave];
  if(!guardado) return;
  guardado.pagina = numero;
  render();
  /* Só a lista muda de página: subir a tela toda (como era) jogava a pessoa
     para longe dos filtros e dos números do painel. Vai-se ao começo do
     cartão da lista — e só se o começo dele ficou para cima da tela. */
  const barra = document.querySelector('[data-pag="'+chave+'"]');
  const bloco = barra && (barra.closest(".card, details") || barra);
  if(!bloco){ window.scrollTo(0,0); return; }
  const topo = bloco.getBoundingClientRect().top;
  if(topo < 70) window.scrollTo({top: Math.max(0, window.scrollY + topo - 70)});
}
/* Uma página só não precisa de controle nenhum: a barra some sozinha. */
function controlesPaginacao(p, rotulo){
  if(p.paginas<=1) return p.total ? `<div class="paginacao-resumo">${p.total} ${rotulo||"item(ns)"}</div>` : "";
  return `<div class="paginacao" data-pag="${p.chave}">
    <div class="paginacao-resumo">Mostrando ${p.primeiro}–${p.ultimo} de ${p.total} ${rotulo||"item(ns)"}</div>
    <div class="flex gap-1 items-center">
      <button class="btn btn-secondary btn-sm" onclick="irParaPagina('${p.chave}',${p.pagina-1})" ${p.pagina<=1?"disabled":""}>Anterior</button>
      <span class="text-sm nowrap">Página ${p.pagina} de ${p.paginas}</span>
      <button class="btn btn-secondary btn-sm" onclick="irParaPagina('${p.chave}',${p.pagina+1})" ${p.pagina>=p.paginas?"disabled":""}>Próxima</button>
    </div>
  </div>`;
}

/* Lista que mostra só as primeiras linhas e abre o resto num clique: onde a
   ordem já põe o mais importante no começo, paginar esconde o resto sem
   avisar e despeja tudo de uma vez pesa. `chave` guarda se a pessoa abriu. */
function limitarLista(lista, chave, maximo){
  const aberta = !!(state.filtroRota.listasAbertas || {})[chave];
  return { itens: aberta ? lista : lista.slice(0, maximo), total: lista.length, aberta, podeAbrir: lista.length > maximo };
}
function botaoMostrarTudo(l, chave, rotulo){
  if(!l.podeAbrir) return "";
  return `<button class="btn btn-ghost btn-sm mt-1" onclick="alternarListaAberta('${chave}')" aria-expanded="${l.aberta}">${l.aberta ? "Mostrar menos" : "Mostrar tudo ("+l.total+(rotulo?" "+rotulo:"")+")"}</button>`;
}
function alternarListaAberta(chave){
  if(!state.filtroRota.listasAbertas) state.filtroRota.listasAbertas = {};
  state.filtroRota.listasAbertas[chave] = !state.filtroRota.listasAbertas[chave];
  render();
}

/* Rolagem infinita: a lista mostra 15 e, ao chegar perto do fim da página,
   acrescenta mais 15 sozinha — sem botão "mostrar mais" nem página seguinte,
   e sem esconder o resto: descer sempre leva a tudo. A sentinela é um
   marcador no fim da lista; `verificarRolagemInfinita` roda a cada rolagem e
   depois de cada desenho de tela (lista curta já nasce cheia até passar do
   fundo da janela). `redesenhar` é o nome da função que refaz só a parte da
   tela, para a posição da rolagem não voltar ao topo. */
const PASSO_ROLAGEM_INFINITA = 15;
function rolagemLista(lista, chave, passo){
  const mapa = state.filtroRota.rolagem = state.filtroRota.rolagem || {};
  const n = mapa[chave] || passo || PASSO_ROLAGEM_INFINITA;
  return { itens: lista.slice(0, n), total: lista.length, restam: Math.max(0, lista.length - n) };
}
function sentinelaRolagem(l, chave, redesenhar){
  return l.restam ? `<div class="rolagem-sentinela text-xs muted mt-1" data-rolagem="${escapeHtml(chave)}" data-redesenhar="${redesenhar||""}" role="status">Mostrando ${l.itens.length} de ${l.total} — o resto carrega ao descer…</div>` : "";
}
function verificarRolagemInfinita(){
  const alvo = document.querySelector(".rolagem-sentinela");
  if(!alvo) return;
  if(alvo.getBoundingClientRect().top > window.innerHeight + 400) return;
  const mapa = state.filtroRota.rolagem = state.filtroRota.rolagem || {};
  const chave = alvo.dataset.rolagem;
  mapa[chave] = (mapa[chave] || PASSO_ROLAGEM_INFINITA) + PASSO_ROLAGEM_INFINITA;
  const fn = alvo.dataset.redesenhar;
  if(fn && typeof window[fn] === "function") window[fn](); else render();
  requestAnimationFrame(verificarRolagemInfinita);
}
document.addEventListener("scroll", () => requestAnimationFrame(verificarRolagemInfinita), true);
window.addEventListener("resize", () => requestAnimationFrame(verificarRolagemInfinita));

/* A data "AAAA-MM-DD" do DIA DE QUEM ESTÁ USANDO, no relógio local.
   toISOString() dá a data em UTC — no Brasil (UTC−3), a partir das 21h ela
   já é a de amanhã: a meta do dia zerava às nove da noite, a sequência de
   dias pulava e a "sessão do dia" virava antes da meia-noite. Toda data de
   calendário da plataforma passa por aqui. */
function dataLocalISO(d){
  const p = n => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth()+1) + "-" + p(d.getDate());
}
function hojeISO(){ return dataLocalISO(CONFIG.hoje()); }

/* Quando a justificativa da questão foi escrita (AAAA-MM): serve para saber
   quais explicações revisar quando uma diretriz muda. Questão sem o campo usa
   o mês de criação, que na prática é o mês em que a explicação nasceu. */
function mesDaJustificativa(q){
  const m = String((q && (q.justificativaEm || q.criadoEm)) || "").slice(0, 7);
  return /^\d{4}-\d{2}$/.test(m) ? m : "";
}
function rotuloMesDaJustificativa(q){
  const m = mesDaJustificativa(q); if(!m) return "";
  const meses = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
  return meses[parseInt(m.slice(5), 10) - 1] + "/" + m.slice(0, 4);
}
function htmlMesDaJustificativa(q){
  const r = rotuloMesDaJustificativa(q);
  return r ? `<div class="text-xs muted mt-1 justificativa-mes" title="Mês em que esta justificativa foi escrita; diretrizes podem mudar depois">justificativa de ${r}</div>` : "";
}
/* QUESTÃO ALTERADA. A equipe pode ter mexido no texto de uma questão de prova
   real (dado ou unidade corrigidos, pergunta mais clara, gabarito revisado). O
   campo `questaoAlterada` diz em uma frase o que mudou e NÃO torna a questão
   autoral: ela continua `real:true`, da banca e do ano de origem. O selo
   aparece sempre, para o aluno saber que o texto não é o do caderno; a frase
   só depois de responder, porque ela pode revelar o gabarito. */
function notaDeQuestaoAlterada(q){
  return q && typeof q.questaoAlterada === "string" ? q.questaoAlterada.trim() : "";
}
function badgeQuestaoAlterada(q){
  return notaDeQuestaoAlterada(q) ? '<span class="badge badge-amber badge-questao-alterada" title="A equipe alterou esta questão em relação à prova original; o que mudou aparece depois que você responde">Questão alterada</span>' : "";
}
function htmlAvisoQuestaoAlterada(q){
  const nota = notaDeQuestaoAlterada(q);
  return nota ? `<div class="card-flat mt-2 text-xs borda-alerta aviso-questao-alterada">${iconeSvg("alert")} <strong>Questão alterada</strong> em relação à prova original: ${escapeHtml(nota)}</div>` : "";
}
function formatDataBR(iso){
  if(!iso) return "—";
  const [a,m,d] = iso.slice(0,10).split("-");
  return d+"/"+m+"/"+a;
}

function diasEntre(isoInicio, isoFim){
  const d1 = new Date(isoInicio+"T00:00:00");
  const d2 = new Date(isoFim+"T00:00:00");
  return Math.round((d2-d1)/86400000);
}

function somarDias(iso, dias){
  const d = new Date(iso+"T00:00:00");
  d.setDate(d.getDate()+dias);
  return dataLocalISO(d);
}

function formatarDuracao(segundos){
  segundos = Math.max(0, Math.round(segundos||0));
  const h = Math.floor(segundos/3600), m = Math.floor((segundos%3600)/60), seg = segundos%60;
  const dois = (n)=>String(n).padStart(2,"0");
  return h ? h+":"+dois(m)+":"+dois(seg) : m+":"+dois(seg);
}
function pct(numerador, denominador){
  if(!denominador) return 0;
  return Math.round((numerador/denominador)*100);
}

function toast(msg, tipo){
  const cont = document.getElementById("toastContainer");
  const el = document.createElement("div");
  el.className = "toast"+(tipo==="err" ? " err" : "");
  el.textContent = msg;
  cont.appendChild(el);
  setTimeout(()=>{ el.style.opacity="0"; el.style.transition="opacity .25s"; setTimeout(()=>el.remove(),260); }, 3200);
}

function abrirModal(innerHtml, tamanho){
  fecharModal();
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "modalOverlayAtivo";
  overlay.onclick = function(e){ if(e.target===overlay) fecharModalComConfirmacao(); };
  overlay.innerHTML = '<div class="modal '+(tamanho==="lg"?"modal-lg":"")+'">'+innerHtml+'</div>';
  document.body.appendChild(overlay);
  rotularCamposParaLeitorDeTela(overlay); // janela não passa pelo desenho de tela, precisa da ligação aqui
}
/* ---------- acessibilidade: ligar cada rótulo ao seu campo ----------------
   Quem enxerga liga a palavra "Senha" à caixinha logo abaixo pela posição na
   tela. Um leitor de tela só faz essa ligação se ela estiver marcada no HTML;
   sem isso anuncia "caixa de edição" sem dizer de quê, e a pessoa não sabe o
   que escrever em cada campo.
   Como todo formulário daqui sai do mesmo molde (um rótulo .label seguido do
   campo), a ligação é feita de uma vez a cada desenho de tela e a cada janela
   aberta, em vez de repetida à mão em dezenas de lugares: vale também para
   telas futuras e nunca fica diferente do rótulo na tela, porque é dele que o
   nome sai. Um rótulo nomeia um campo só: quando o bloco tem dois, o segundo
   traz o próprio aria-label no HTML. Campo sem rótulo visível (seletor no fim
   de linha de tabela, busca) também, porque só ali se sabe a que linha pertence. */
let _seqCampoA11y = 0;
function rotularCamposParaLeitorDeTela(raiz){
  const escopo = raiz || document;
  escopo.querySelectorAll("input:not([type=hidden]), select, textarea").forEach(campo=>{
    // já tem nome (escrito à mão, ou o campo está dentro do próprio rótulo)
    if(campo.getAttribute("aria-label") || campo.getAttribute("aria-labelledby") || campo.closest("label")) return;
    if(campo.id && document.querySelector('label[for="'+campo.id+'"]')) return;
    const rotulo = rotuloVisivelDoCampo(campo);
    if(!rotulo) return;
    if(rotulo.getAttribute("for") || rotulo.dataset.a11yUsado) return;
    if(!campo.id) campo.id = "campo-a11y-"+(++_seqCampoA11y);
    rotulo.dataset.a11yUsado = "1";
    if(rotulo.tagName==="LABEL"){
      rotulo.setAttribute("for", campo.id);
    } else {
      // rótulo escrito como <div class="label">: não aceita "for", então a
      // ligação é pelo caminho inverso (o campo aponta para o rótulo)
      if(!rotulo.id) rotulo.id = "rotulo-a11y-"+(++_seqCampoA11y);
      campo.setAttribute("aria-labelledby", rotulo.id);
    }
  });
}
// o rótulo de um campo é o .label logo antes dele ou, dentro de um bloco
// .field, o primeiro .label do bloco — como todos os formulários são montados
function rotuloVisivelDoCampo(campo){
  const anterior = campo.previousElementSibling;
  if(anterior && anterior.classList && anterior.classList.contains("label")) return anterior;
  const bloco = campo.closest(".field");
  return bloco ? bloco.querySelector(".label") : null;
}
function fecharModal(){
  const el = document.getElementById("modalOverlayAtivo");
  if(el) el.remove();
  const aba = document.getElementById("modalMinimizado");
  if(aba) aba.remove();
}
/* Minimizar a janela: esconde-a (sem apagar nada do que foi escrito) e deixa
   uma aba no canto para voltar. Serve para o cartão em montagem: quem está
   virando uma questão em flashcard precisa rever o enunciado e a explicação
   que a janela cobre, e esquecer de algo não deve custar o texto digitado. */
function minimizarModal(rotulo){
  const el = document.getElementById("modalOverlayAtivo");
  if(!el || document.getElementById("modalMinimizado")) return;
  el.style.display = "none";
  const aba = document.createElement("button");
  aba.id = "modalMinimizado";
  aba.className = "btn btn-primary modal-minimizado";
  aba.type = "button";
  aba.innerHTML = iconeSvg("cards") + " " + escapeHtml(rotulo || "Voltar à janela") + " · voltar";
  aba.onclick = restaurarModalMinimizado;
  document.body.appendChild(aba);
}
function restaurarModalMinimizado(){
  const el = document.getElementById("modalOverlayAtivo");
  if(el) el.style.display = "";
  const aba = document.getElementById("modalMinimizado");
  if(aba) aba.remove();
}
/* TRABALHO NÃO SALVO. Fechar uma janela ou sair de uma tela de escrita sem
   querer (clique fora da janela, até um arrastar que termina fora dela;
   botão voltar; fechar a aba) apagava tudo o que estava digitado — já custou
   20 cartões escritos em lista. Por isso os caminhos de quem FECHA (clicar
   fora, o X, Cancelar, trocar de tela, fechar a aba) perguntam antes; os
   caminhos de quem terminou (salvou, importou) chamam fecharModal() direto e
   não perguntam. "Escrito" é texto que difere do que o campo tinha ao ser
   desenhado (defaultValue): filtro vazio ou campo que veio preenchido e não
   foi mexido não conta. */
const TEXTO_PERDIDO_PERGUNTA = "Você escreveu algo aqui e ainda não salvou. Sair agora apaga o que foi escrito.\n\nSair mesmo assim e perder o texto?";
function camposComTextoNovo(raiz, seletor){
  if(!raiz) return false;
  return [...raiz.querySelectorAll(seletor || "textarea, input")].some(el => {
    if(el.tagName === "INPUT" && !/^(text|number|search|url|email|tel)$/i.test(el.type || "text")) return false;
    return el.value.trim() !== el.defaultValue.trim();
  });
}
// textareas de tela inteira (Importar questões, lotes da Central de Provas) levam data-proteger
function telaTemTextoNaoSalvo(){ return camposComTextoNovo(document.body, "[data-proteger]"); }
function haTrabalhoNaoSalvo(){ return camposComTextoNovo(document.getElementById("modalOverlayAtivo")) || telaTemTextoNaoSalvo(); }
function fecharModalComConfirmacao(){
  const el = document.getElementById("modalOverlayAtivo");
  if(el && camposComTextoNovo(el) && !confirm(TEXTO_PERDIDO_PERGUNTA)) return;
  fecharModal();
}
// true = pode sair da tela (nada escrito, ou a pessoa aceitou perder)
function confirmarSairDaTela(){ return !telaTemTextoNaoSalvo() || confirm(TEXTO_PERDIDO_PERGUNTA); }
window.addEventListener("beforeunload", function(e){ if(haTrabalhoNaoSalvo()){ e.preventDefault(); e.returnValue = ""; } });

/* Janela com cabeçalho padrão. Existe porque abrirModal recebe o HTML
   inteiro num argumento só: quem chamava abrirModal("Título", corpo) via a
   janela abrir com o título e NADA do corpo — o segundo argumento ia para o
   lugar do tamanho e o corpo era descartado. Era o que acontecia ao sair da
   conta com fila pendente (a janela aparecia sem os botões "Sincronizar e
   sair" / "Sair mesmo assim") e ao trazer para a conta o estudo guardado
   neste navegador. */
function abrirModalTitulado(titulo, corpoHtml, tamanho){
  abrirModal(cabecalhoJanela(escapeHtml(titulo)) + (corpoHtml || ""), tamanho);
}
/* O cabeçalho padrão de toda janela: título (já em HTML — pode ter ícone)
   e o X de fechar. */
function cabecalhoJanela(tituloHtml, opcoes){
  const minimizar = opcoes && opcoes.minimizavel
    ? '<button class="btn btn-ghost btn-sm" type="button" title="Esconder esta janela para ver a tela por trás; o que você escreveu fica guardado" onclick="minimizarModal(\'' + String(opcoes.minimizavel).replace(/'/g, "") + '\')">Minimizar</button>' : "";
  return '<div class="modal-header"><h3>' + tituloHtml + '</h3><span class="flex gap-1 items-center">' + minimizar + '<button class="icon-btn" onclick="fecharModalComConfirmacao()">' + iconeSvg("x") + '</button></span></div>';
}

function copiarTexto(texto, mensagem){
  const fazer = () => toast(mensagem || "Copiado para a área de transferência.");
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(texto).then(fazer).catch(()=>{
      window.prompt("Copie o texto abaixo (Ctrl+C):", texto);
    });
  }else{
    window.prompt("Copie o texto abaixo (Ctrl+C):", texto);
  }
}

/* Entrega um arquivo para a pessoa salvar (backup, exportações, planilha).
   O endereço temporário só é liberado alguns segundos depois: liberar na
   hora cancela o download em alguns navegadores. */
function baixarArquivo(nome, conteudo, tipo){
  const blob = conteudo instanceof Blob ? conteudo : new Blob([conteudo], { type: tipo || "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = nome;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

// gráfico de barras horizontal (SVG puro) — usado para comparar taxas de
// acerto entre categorias, por exemplo as 5 grandes áreas
function graficoBarrasSvg(itens, opts){
  // itens: [{label, valor (0-100 ou null se sem dados), n}]
  // opts.fino: barras baixas para listas longas (os 14 dias do Histórico)
  const fino = !!(opts && opts.fino);
  const w = fino ? 560 : 640, alturaBarra = fino ? 12 : 26, gap = fino ? 6 : 12, padEsq = fino ? 60 : 230, padDir = fino ? 80 : 90;
  const tamTexto = fino ? 11 : 13;
  const larguraUtil = w - padEsq - padDir;
  const h = itens.length*(alturaBarra+gap) + gap;
  const barras = itens.map((it,i)=>{
    const y = gap + i*(alturaBarra+gap);
    const valor = it.valor==null ? 0 : it.valor;
    const largura = Math.max(2, (valor/100)*larguraUtil);
    const cor = it.valor==null ? "var(--border-strong)" : (valor<50 ? "var(--danger)" : valor<70 ? "var(--amber)" : "var(--accent)");
    const rotulo = it.valor==null ? "sem dados" : it.valor+"% ("+it.n+")";
    return '<text x="'+(padEsq-12)+'" y="'+(y+alturaBarra/2+4)+'" text-anchor="end" font-size="'+tamTexto+'" fill="var(--ink-2)">'+escapeHtml(it.label)+'</text>'+
      '<rect x="'+padEsq+'" y="'+y+'" width="'+larguraUtil+'" height="'+alturaBarra+'" rx="5" fill="var(--surface-2)"/>'+
      '<rect x="'+padEsq+'" y="'+y+'" width="'+largura+'" height="'+alturaBarra+'" rx="5" fill="'+cor+'"/>'+
      '<text x="'+(padEsq+larguraUtil+10)+'" y="'+(y+alturaBarra/2+4)+'" font-size="'+(fino?11:12)+'" fill="var(--ink-2)">'+rotulo+'</text>';
  }).join("");
  return '<svg viewBox="0 0 '+w+' '+h+'" width="100%" height="'+h+'">'+barras+'</svg>';
}

/* Gráfico de barras VERTICAIS empilhadas (SVG puro).
   Cada barra representa 100% das questões respondidas naquele período ou
   categoria. A parte de baixo, em verde claro, é a fatia de ACERTOS; o que
   sobra em cima, em cinza claro, são os ERROS. Assim 65% de acerto aparece
   como 65% da barra em verde e 35% em cinza, e a leitura é imediata: barra
   mais verde é dia melhor, sem precisar decorar escala.

   itens: [{label, taxa (0-100 ou null), total, acertos}]
   opts:  {altura, larguraMax, rotuloRotacionado} */
function graficoBarrasVerticaisSvg(itens, opts){
  opts = opts || {};
  if(!itens || !itens.length) return '<div class="text-xs muted">Sem dados no período.</div>';
  const comDados = itens.filter(i=>i.taxa!==null && i.total>0);
  if(!comDados.length) return '<div class="text-xs muted">Você ainda não respondeu questões neste período.</div>';

  const alturaPlot = opts.altura || 170;
  const padTopo = 34, padBaixo = opts.rotuloRotacionado ? 52 : 30, padEsq = 34, padDir = 8;
  // barras finas quando há muitos dias, largas quando são poucas categorias
  const larguraBarra = Math.min(opts.larguraMax || 46, Math.max(8, 620/itens.length - 6));
  const gap = Math.max(3, larguraBarra*0.28);
  const larguraUtil = itens.length*(larguraBarra+gap) + gap;
  const w = padEsq + larguraUtil + padDir;
  const h = alturaPlot + padTopo + padBaixo;
  // mostra o número dentro/acima da barra só quando cabe sem embolar
  const mostrarPct = larguraBarra >= 22;

  // volume: 2 de 2 não pesa como 80 de 100. A cor da barra esmaece conforme o
  // total do período fica pequeno perto do maior (piso de 20 questões, para
  // um período inteiro de poucas questões também parecer fraco) e o número de
  // questões vai escrito sob a porcentagem.
  const referencia = Math.max(20, ...comDados.map(i=>i.total));
  const grade = [0,25,50,75,100].map(v=>{
    const y = padTopo + alturaPlot - (v/100)*alturaPlot;
    return '<line x1="'+padEsq+'" y1="'+y+'" x2="'+(w-padDir)+'" y2="'+y+'" stroke="var(--border)" stroke-width="1"'+(v===0?'':' stroke-dasharray="2 3"')+'/>'+
      '<text x="'+(padEsq-7)+'" y="'+(y+3.5)+'" text-anchor="end" font-size="9.5" fill="var(--muted)">'+v+'</text>';
  }).join("");

  const barras = itens.map((it,i)=>{
    const x = padEsq + gap + i*(larguraBarra+gap);
    const semDados = it.taxa===null || !it.total;
    const rotulo = '<text x="'+(x+larguraBarra/2)+'" y="'+(padTopo+alturaPlot+(opts.rotuloRotacionado?14:15))+'" text-anchor="'+(opts.rotuloRotacionado?"end":"middle")+'" font-size="10" fill="var(--muted)"'+
      (opts.rotuloRotacionado?' transform="rotate(-40 '+(x+larguraBarra/2)+' '+(padTopo+alturaPlot+14)+')"':'')+'>'+escapeHtml(it.label)+'</text>';
    if(semDados){
      // dia/mês sem estudo: risco sutil na linha de base, não uma barra vazia
      return '<line x1="'+x+'" y1="'+(padTopo+alturaPlot)+'" x2="'+(x+larguraBarra)+'" y2="'+(padTopo+alturaPlot)+'" stroke="var(--border-strong)" stroke-width="2"/>'+rotulo;
    }
    const alturaAcerto = (it.taxa/100)*alturaPlot;
    const alturaErro = alturaPlot - alturaAcerto;
    const yAcerto = padTopo + alturaPlot - alturaAcerto;
    const titulo = escapeHtml(it.label)+": "+it.taxa+"% de acerto ("+it.acertos+" de "+it.total+")";
    // em 0% de acerto a barra fica inteiramente cinza: nenhum resquício de
    // verde, senão o gráfico sugere um acerto que não houve
    const verde = it.taxa>0 ? Math.max(2, alturaAcerto) : 0;
    const opacidade = (0.35 + 0.65*Math.min(1, it.total/referencia)).toFixed(2);
    return '<g><title>'+titulo+'</title><g opacity="'+opacidade+'">'+
      '<rect x="'+x+'" y="'+padTopo+'" width="'+larguraBarra+'" height="'+Math.max(0,alturaErro)+'" fill="var(--barra-erro)" rx="3"/>'+
      (verde ? '<rect x="'+x+'" y="'+yAcerto+'" width="'+larguraBarra+'" height="'+verde+'" fill="var(--barra-acerto)" rx="3"/>' : "")+'</g>'+
      (mostrarPct ? '<text x="'+(x+larguraBarra/2)+'" y="'+(padTopo-17)+'" text-anchor="middle" font-size="10.5" font-weight="700" fill="var(--ink-2)">'+it.taxa+'%</text>'+
        '<text x="'+(x+larguraBarra/2)+'" y="'+(padTopo-6)+'" text-anchor="middle" font-size="9" fill="var(--muted)">'+it.total+'q</text>' : "")+
      '</g>'+rotulo;
  }).join("");

  // sem altura fixa: o viewBox governa a proporção, para o gráfico encolher
  // junto com a tela em vez de deixar um vão embaixo no celular. Mas ele
  // ENCOLHE e não CRESCE além de ~15% do tamanho desenhado: com width 100%
  // e nada mais, num monitor largo o gráfico das 5 áreas esticava até quase
  // 600 px de altura, com letras de título. O teto é max-width.
  return '<div style="overflow-x:auto"><svg class="grafico-barras" viewBox="0 0 '+w+' '+h+'" width="100%" style="height:auto;display:block;max-width:'+Math.round(w*(opts.escalaMax||1.15))+'px;min-width:'+Math.min(w,300)+'px">'+grade+barras+'</svg></div>'+
    '<div class="legenda-barras">'+
      '<span><i style="background:var(--barra-acerto)"></i>acertos</span>'+
      '<span><i style="background:var(--barra-erro)"></i>erros</span>'+
      '<span class="muted">barra mais clara = menos questões (o número abaixo da % é o total)</span>'+
      (mostrarPct?'':'<span class="muted">passe o dedo ou o mouse numa barra para ver o número</span>')+
    '</div>';
}

// histograma simples (curva de notas) — usado no ranking anônimo de simulados
function graficoHistogramaSvg(buckets, bucketAtual, labels){
  const w=480, h=170, padBaixo=28, padTopo=22, gap=14;
  const maxV = Math.max(1, ...buckets);
  const larguraBarra = (w - gap*(buckets.length+1))/buckets.length;
  const barras = buckets.map((v,i)=>{
    const altura = (v/maxV)*(h-padBaixo-padTopo);
    const x = gap + i*(larguraBarra+gap);
    const y = h-padBaixo-altura;
    const cor = i===bucketAtual ? "var(--accent)" : "var(--border-strong)";
    return (i===bucketAtual ? '<text x="'+(x+larguraBarra/2)+'" y="14" text-anchor="middle" font-size="11" font-weight="700" fill="var(--accent-dark)">você</text>' : "") +
      '<rect x="'+x+'" y="'+y+'" width="'+larguraBarra+'" height="'+Math.max(2,altura)+'" rx="4" fill="'+cor+'"/>'+
      (v>0 ? '<text x="'+(x+larguraBarra/2)+'" y="'+(y-6)+'" text-anchor="middle" font-size="11" fill="var(--ink-2)">'+v+'</text>' : "")+
      '<text x="'+(x+larguraBarra/2)+'" y="'+(h-padBaixo+16)+'" text-anchor="middle" font-size="11" fill="var(--ink-2)">'+labels[i]+'</text>';
  }).join("");
  return '<svg viewBox="0 0 '+w+' '+h+'" width="100%" height="'+h+'">'+barras+'</svg>';
}
// ranking anônimo: compara a nota do usuário com as dos ALUNOS que fizeram o
// MESMO simulado (por id, ou por título quando é uma "prova antiga" avulsa),
// sem expor quem são — só a posição. Conta uma nota por aluno (a da primeira
// tentativa): quem refaz o simulado várias vezes não pode puxar a curva.
//
// Com a nuvem ligada, as notas são as da TURMA INTEIRA (anônimas, vindas de
// notas_do_simulado, no esquema.sql, que já devolve uma por aluno), somadas às
// deste navegador que ainda não subiram — por id, para a mesma tentativa não
// contar duas vezes. `origem` diz de onde veio, e a tela conta isso à pessoa.
//
// Só há comparação a partir de MINIMO_ALUNOS_NA_COMPARACAO alunos: com menos,
// percentil, p90 e curva identificariam as pessoas ou enganariam.
const MINIMO_ALUNOS_NA_COMPARACAO = 10;
// Quantos alunos já fizeram, mesmo abaixo do mínimo: só a contagem aparece
// (ela não identifica ninguém); as notas continuam escondidas até o mínimo.
function frasePoucosAlunosNoSimulado(chave){
  const n = notasAnonimasDoSimulado(chave).notas.length;
  const falta = Math.max(0, MINIMO_ALUNOS_NA_COMPARACAO - n);
  return (n === 1 ? "Até agora 1 aluno fez" : n === 0 ? "Ainda nenhum aluno fez" : `Até agora ${n} alunos fizeram`) +
    ` isto ${nuvemConectado() ? "na turma" : "neste navegador"}` +
    (n ? `; faltam ${falta} para liberar os números` : "") + ".";
}
/* O administrador também estuda: entra nas contas da turma (gráfico de todos
   os alunos, percentil, média do ano e da turma dele) como qualquer aluno.
   Professor e residente continuam fora — são equipe. */
function contaComoAluno(u){ return !!u && (u.papel === "aluno" || u.papel === "admin"); }
function notasAnonimasDoSimulado(chave){
  const primeiraPorAluno = new Map();
  db.resultadosSimulados.filter(r => (r.simuladoId || r.titulo) === chave).forEach(r => {
    const u = getUsuario(r.usuarioId);
    if(u && !contaComoAluno(u)) return;
    const antes = primeiraPorAluno.get(r.usuarioId);
    if(!antes || (r.data || "") < (antes.data || "")) primeiraPorAluno.set(r.usuarioId, r);
  });
  const locais = [...primeiraPorAluno.values()].map(r => ({ id: r.id, nota: r.nota }));
  const daTurma = (typeof notasDaTurmaDoSimulado === "function") ? notasDaTurmaDoSimulado(chave) : null;
  const porId = new Map();
  (daTurma || []).forEach(r => porId.set(r.id, r.nota));
  locais.forEach(r => { if(!porId.has(r.id)) porId.set(r.id, r.nota); });
  return { notas: [...porId.values()].sort((a,b)=>a-b), origem: daTurma ? "turma" : "navegador", tentativas: [...primeiraPorAluno.values()] };
}
/* Visão da equipe (administrador, professor, residente): o mesmo conjunto
   anônimo do percentil, sem uma nota "da pessoa". Além das notas, a taxa de
   acerto de cada questão — só com o que este navegador tem (a nuvem devolve
   apenas notas), e só a partir do mesmo mínimo de alunos, para ninguém ser
   identificado. */
function estatisticasTurmaSimulado(chave){
  const {notas, origem, tentativas} = notasAnonimasDoSimulado(chave);
  const n = notas.length;
  if(n < MINIMO_ALUNOS_NA_COMPARACAO) return null;
  const media = notas.reduce((t,x)=>t+x,0)/n;
  const mediana = n%2===0 ? (notas[n/2-1]+notas[n/2])/2 : notas[Math.floor(n/2)];
  const buckets = [0,0,0,0,0];
  notas.forEach(nt=>{ buckets[Math.min(4, Math.floor(nt/20))]++; });
  const porQuestao = {};
  tentativas.forEach(r => (r.itens||[]).forEach(it => {
    const q = getQuestao(it.questaoId); if(!q) return;
    const c = porQuestao[it.questaoId] = porQuestao[it.questaoId] || {questaoId:it.questaoId, total:0, acertos:0};
    c.total++; if(r.respostas && r.respostas[it.questaoId] === q.gabarito) c.acertos++;
  }));
  const questoes = Object.values(porQuestao).filter(c=>c.total >= MINIMO_ALUNOS_NA_COMPARACAO)
    .map(c=>({...c, taxa: pct(c.acertos, c.total)})).sort((a,b)=>a.taxa-b.taxa);
  return {n, media, mediana, p90: notas[Math.ceil(0.9*n)-1], buckets, origem, questoes};
}
function estatisticasRankingSimulado(chave, notaAtual){
  const {notas, origem} = notasAnonimasDoSimulado(chave);
  const n = notas.length;
  if(n < MINIMO_ALUNOS_NA_COMPARACAO) return null;
  const abaixoOuIgual = notas.filter(x=>x<=notaAtual).length;
  const percentil = Math.round((abaixoOuIgual/n)*100);
  const mediana = n%2===0 ? (notas[n/2-1]+notas[n/2])/2 : notas[Math.floor(n/2)];
  // p90 pelo posto mais próximo: a menor nota que deixa 90% da turma nela ou abaixo
  const p90 = notas[Math.ceil(0.9*n)-1];
  const media = notas.reduce((t,x)=>t+x,0)/n;
  const desvio = Math.sqrt(notas.reduce((t,x)=>t+(x-media)*(x-media),0)/n);
  const buckets = [0,0,0,0,0];
  notas.forEach(nt=>{ buckets[Math.min(4, Math.floor(nt/20))]++; });
  const bucketAtual = Math.min(4, Math.floor(notaAtual/20));
  return {n, percentil, mediana, p90, media, desvio, buckets, bucketAtual, origem};
}
/* Curva de Gauss (normal) com a média e o desvio da turma, de 0 a 100, com
   marcas no percentil 50, no percentil 90 e na nota da pessoa. É a curva
   ajustada às notas, não um histograma: ajuda a ver a posição relativa, e a
   tela diz isso. Desvio muito pequeno é suavizado (mínimo 3 pontos) para a
   curva não virar uma agulha. */
function graficoCurvaGaussSvg(r, notaAtual){
  const w=480, h=190, padBaixo=30, padTopo=26, padLado=14;
  const dp = Math.max(3, r.desvio);
  const dens = x => Math.exp(-0.5*Math.pow((x-r.media)/dp, 2));
  const X = v => padLado + (Math.max(0, Math.min(100, v))/100)*(w-2*padLado);
  const Y = d => h-padBaixo - d*(h-padBaixo-padTopo);
  const pontos = [];
  for(let v=0; v<=100; v+=2) pontos.push([X(v), Y(dens(v))]);
  const linha = pontos.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ");
  const area = linha+" L"+X(100).toFixed(1)+" "+Y(0)+" L"+X(0).toFixed(1)+" "+Y(0)+" Z";
  const marca = (v, rotulo, cor, alto) =>
    '<line x1="'+X(v)+'" x2="'+X(v)+'" y1="'+(padTopo-4)+'" y2="'+Y(0)+'" stroke="'+cor+'" stroke-width="2" stroke-dasharray="'+(alto?"":"4 3")+'"/>'+
    '<text x="'+X(v)+'" y="'+(alto?12:22)+'" text-anchor="middle" font-size="11" font-weight="700" fill="'+cor+'">'+rotulo+'</text>';
  const eixo = [0,20,40,60,80,100].map(v=>'<text x="'+X(v)+'" y="'+(h-10)+'" text-anchor="middle" font-size="11" fill="var(--ink-2)">'+v+'</text>').join("");
  return '<svg viewBox="0 0 '+w+' '+h+'" width="100%" height="'+h+'" role="img" aria-label="Curva de Gauss das notas da turma, com percentil 50, percentil 90 e a sua nota">'+
    '<path d="'+area+'" fill="var(--border-strong)" opacity=".35"/>'+
    '<path d="'+linha+'" fill="none" stroke="var(--ink-2)" stroke-width="2"/>'+
    '<line x1="'+X(0)+'" x2="'+X(100)+'" y1="'+Y(0)+'" y2="'+Y(0)+'" stroke="var(--border-strong)"/>'+
    marca(r.mediana, "P50 · "+Math.round(r.mediana), "var(--ink-2)", false)+
    marca(r.p90, "P90 · "+Math.round(r.p90), "var(--amber)", false)+
    marca(notaAtual, "você · "+notaAtual, "var(--accent)", true)+
    eixo+'</svg>';
}

/* ---------------------------- consultas rápidas ---------------------------
   getQuestao() é chamada dentro de laços por quase toda tela (histórico,
   revisão, desempenho, listas da equipe) e varria as 2.700 questões a cada
   chamada. Agora um índice id -> posição responde na hora. Ele não precisa
   ser avisado de nada: a cada consulta confere se a lista é a mesma, do
   mesmo tamanho, e se a posição ainda guarda aquele id — qualquer mudança
   (push, splice, troca da lista, reordenação) só faz o índice ser refeito. */
const _indicesPorId = {};
function buscarPorId(nome, lista, id){
  if(!Array.isArray(lista)) return undefined;
  const c = _indicesPorId[nome];
  if(c && c.lista === lista && c.n === lista.length){
    const i = c.mapa.get(id);
    if(i !== undefined && lista[i] && lista[i].id === id) return lista[i];
    // não está no índice: confere na lista (um splice seguido de push deixa
    // o tamanho igual) e só refaz o índice se o item existir de fato
    if(i === undefined && !lista.some(x => x && x.id === id)) return undefined;
  }
  const mapa = new Map();
  lista.forEach((x, i) => { if(x && !mapa.has(x.id)) mapa.set(x.id, i); });
  _indicesPorId[nome] = { lista, n: lista.length, mapa };
  const i = mapa.get(id);
  return i === undefined ? undefined : lista[i];
}
function getUsuario(id){ return db.usuarios.find(u=>u.id===id); }
function getArea(id){ return db.taxonomia.areas.find(a=>a.id===id); }
function getEspecialidade(id){ return buscarPorId("especialidades", db.taxonomia.especialidades, id); }
function getAssunto(id){ return buscarPorId("assuntos", db.taxonomia.assuntos, id); }
function getQuestao(id){ return buscarPorId("questoes", db.questoes, id); }
function getGrupo(id){ return db.grupos.find(g=>g.id===id); }
function getGrupoOficial(){ return getGrupo(db.grupoOficialId); }
// cada aluno pertence a um grupo/turma (calendário de blocos próprio ou
// compartilhado); quem não tiver grupoId definido usa o calendário oficial
function getGrupoDoUsuario(usuario){
  if(usuario && usuario.grupoId){
    const g = getGrupo(usuario.grupoId) || recriarTurmaDoRodizio(usuario.grupoId);
    if(g) return g;
  }
  return getGrupoOficial();
}
/* TURMAS DO RODÍZIO. Uma por ano e por letra ("4º ano — Grupo C"), abertas:
   entra quem quiser, sem pedir a ninguém — ao contrário das turmas criadas
   por alunos, que têm dono e aprovação. É o que a tela de primeiro acesso
   oferece, porque quem acabou de chegar sabe a própria letra, mas não sabe
   se algum colega já criou a turma dela neste navegador.

   O id diz o ano e o grupo (rodizio-<índice do ano>-<deslocamento>). As
   turmas ainda não sobem para a nuvem, mas o grupo_id da pessoa sobe: em
   outro aparelho, a turma que falta é recriada a partir do id, e a pessoa
   continua no mesmo grupo. */
function idTurmaDoRodizio(ano, deslocamento){
  return "rodizio-" + CONFIG.anosFaculdade.indexOf(ano) + "-" + (parseInt(deslocamento)||0);
}
function turmaDoRodizio(ano, deslocamento){
  const id = idTurmaDoRodizio(ano, deslocamento);
  return getGrupo(id) || recriarTurmaDoRodizio(id);
}
function recriarTurmaDoRodizio(id){
  const m = /^rodizio-(\d+)-(\d+)$/.exec(id || "");
  if(!m) return null;
  const ano = CONFIG.anosFaculdade[parseInt(m[1])];
  const deslocamento = parseInt(m[2]);
  if(!ano || !temCalendarioProprio(ano) || deslocamento >= sequenciaDoAno(ano).length) return null;
  const turma = { id, nome: ano + " — " + nomeRodizio(ano, deslocamento), criadoPor:null, oficial:false, doRodizio:true,
                  publico:true, criadoEm:hojeISO(), anoFaculdade:ano, deslocamento,
                  blocoAtualIdManual:null, membrosAprovados:[], solicitacoesPendentes:[] };
  if(!db.grupos) db.grupos = [];
  db.grupos.push(turma);
  return turma;
}
/* ---------- sequência de blocos do ano + rodízio das turmas ----------------
   A sequência pertence ao ANO DA FACULDADE; o grupo escolhe só onde começa.
   blocosDoGrupo() devolve a lista já girada, no mesmo formato de antes
   ({id, ordem, nome, dataInicio, dataFim, especialidadeIds, subdivisoes}), então todo o
   resto da plataforma continua funcionando sem saber do rodízio. */
function anoDoGrupo(grupo, usuario){
  // o calendário oficial serve a todos os anos: nele, o ano é o de quem olha
  if(grupo && grupo.anoFaculdade) return grupo.anoFaculdade;
  usuario = usuario || usuarioAtual();
  return (usuario && usuario.anoFaculdade) || CONFIG.anoFaculdadePadrao;
}
/* Anos sem calendário próprio (hoje só "Formado(a)"): quem está neles não
   tem sequência de blocos para chamar de sua, então empresta a do ano de
   referência. Isso é o que permite a uma pessoa já formada participar de um
   grupo normalmente — ela acompanha o calendário do ano da turma — sem que a
   coordenação precise manter um calendário de formados que ninguém cursa. */
function temCalendarioProprio(ano){
  return !!ano && !(CONFIG.anosSemCalendario||[]).includes(ano);
}
function anosComCalendario(){
  return CONFIG.anosFaculdade.filter(temCalendarioProprio);
}
function anoDeReferencia(ano){
  return temCalendarioProprio(ano) ? ano : CONFIG.anoFaculdadePadrao;
}
function sequenciaDoAno(ano){
  const seqs = db.sequenciasAno || {};
  const alvo = anoDeReferencia(ano);
  const lista = seqs[alvo] || seqs[CONFIG.anoFaculdadePadrao] || Object.values(seqs)[0] || [];
  return lista.slice().sort((a,b)=>a.ordem-b.ordem);
}
/* ---------- as turmas do rodízio: "Grupo A", "Grupo B"… -------------------
   Uma turma é identificada pelo bloco em que entra na sequência — é o
   `deslocamento`. Pedir esse número à pessoa seria pedir que ela traduzisse
   o calendário impresso da faculdade; ela sabe é que está "no grupo B".

   A ponte entre as duas coisas fica no próprio bloco: `grupoRodizio` na
   posição i da sequência é a letra da turma que COMEÇA ali, ou seja, a turma
   de deslocamento i. No 3º ano a ordem das letras não é alfabética
   (A, D, C, B) porque o calendário real da faculdade é assim — por isso a
   letra é um dado editável, e não uma conta feita a partir do índice. Onde a
   coordenação não tiver preenchido nada, vale a ordem alfabética. */
function letraPadraoRodizio(i){ return String.fromCharCode(65 + (((i%26)+26)%26)); }
function normalizarDeslocamento(deslocamento, tamanho){
  const n = tamanho || 1;
  return (((deslocamento||0) % n) + n) % n;
}

/* ---------- quando o rodízio NÃO é um ciclo ------------------------------
   O 3º ano gira em ciclo: quem entra no segundo bloco segue para o terceiro,
   o quarto, e volta ao primeiro. O 5º ano não — o quadro da faculdade
   emparelha os estágios dois a dois (quem faz Clínica Cirúrgica 1 na
   primeira janela faz a 2 na segunda, e vice-versa) e troca as duas metades
   do ano no meio do caminho. Nenhuma conta a partir do índice reproduz isso.

   Então um bloco pode trazer a LINHA do quadro impresso em `turmasPorJanela`:
   a turma que está NELE em cada janela de data, na ordem das janelas. Onde
   essa linha existe, ela manda; onde não existe, vale o ciclo de sempre.
   As duas formas convivem no mesmo formato de sequência, e nenhuma tela
   precisa saber qual delas o ano usa — todas passam por aqui. */
function turmaDoBlocoNaJanela(bloco, i){
  const linha = bloco && bloco.turmasPorJanela;
  if(!Array.isArray(linha) || !linha[i]) return null;
  return String(linha[i]).trim().toUpperCase();
}
/* O conteúdo que a turma `rotulo` cursa na janela `i`. */
function conteudoDaJanela(seq, rotulo, deslocamento, i){
  const n = seq.length;
  if(!n) return null;
  const doQuadro = seq.find(b => turmaDoBlocoNaJanela(b, i) === rotulo);
  return doQuadro || seq[(i + normalizarDeslocamento(deslocamento, n)) % n];
}
/* Os estágios de dentro de um período (6º ano, Grupo E). Vazio nos anos cujos
   blocos não se subdividem — quem chama só mostra o que vier. */
function subdivisoesDoBloco(bloco){
  return Array.isArray(bloco && bloco.subdivisoes) ? bloco.subdivisoes.filter(Boolean) : [];
}
/* ORDEM DOS ESTÁGIOS, POR PESSOA. No 6º ano cada período tem estágios
   (Emergências Pediátricas, Enfermaria, Neonatal…) e a ordem em que cada
   aluno os cumpre varia dentro da turma. Em vez de criar uma turma nova por
   combinação, a pessoa reordena os SEUS estágios em Meu Grupo, sem sair do
   grupo do rodízio: `usuario.ordemEstagios[idDoBloco] = [nomes na ordem
   dela]`. Estágio que a coordenação renomeou ou tirou depois some da lista
   guardada, e o que ela acrescentou entra no fim — a lista da pessoa nunca
   fica desencontrada do calendário. Só a ordem (e, com ela, as datas de cada
   estágio) é pessoal: o período e as especialidades continuam os da turma. */
function ordemDosEstagios(bloco, usuario){
  const base = subdivisoesDoBloco(bloco);
  const salva = usuario && usuario.ordemEstagios && usuario.ordemEstagios[bloco.id];
  if(!Array.isArray(salva) || !salva.length) return base;
  const validos = salva.filter((nome, i) => base.includes(nome) && salva.indexOf(nome) === i);
  return validos.concat(base.filter(nome => !validos.includes(nome)));
}
/* O tempo do período é repartido em partes iguais entre as subdivisões, em
   dias corridos: o cronograma da faculdade só traz a data do período, e
   dividir igualmente é a regra combinada. Quando a conta não fecha, os dias
   que sobram vão um a um para as primeiras subdivisões, de modo que a soma
   sempre cobre o período inteiro, sem buraco nem sobreposição. As datas saem
   do bloco que se recebe (e não do cadastro), porque no rodízio o conteúdo
   muda de janela. */
function subdivisoesComDatas(bloco){
  const nomes = subdivisoesDoBloco(bloco);
  if(!nomes.length || !bloco.dataInicio || !bloco.dataFim) return nomes.map(nome=>({ nome }));
  const total = diasEntre(bloco.dataInicio, bloco.dataFim) + 1;
  const base = Math.floor(total / nomes.length), sobra = total % nomes.length;
  let inicio = bloco.dataInicio;
  return nomes.map((nome, i) => {
    const dias = base + (i < sobra ? 1 : 0);
    const fim = somarDias(inicio, Math.max(dias, 1) - 1);
    const parte = { nome, dataInicio: inicio, dataFim: fim };
    inicio = somarDias(fim, 1);
    return parte;
  });
}
// a subdivisão em que hoje cai (ou a última/primeira, fora do período)
function subdivisaoAtualDoBloco(bloco){
  const partes = subdivisoesComDatas(bloco).filter(p=>p.dataInicio);
  if(!partes.length) return null;
  const hoje = hojeISO();
  return partes.find(p=>hoje>=p.dataInicio && hoje<=p.dataFim) || null;
}
// "Nome (dd/mm – dd/mm)" — uma linha por subdivisão, já escapada
function subdivisoesEmLinha(bloco, sep){
  return subdivisoesComDatas(bloco).map(p => escapeHtml(p.nome) + (p.dataInicio ? ` <span class="muted">(${formatDataBR(p.dataInicio)} – ${formatDataBR(p.dataFim)})</span>` : "")).join(sep);
}
// as turmas possíveis daquele ano, na ordem em que entram na sequência
function opcoesRodizio(ano){
  const seq = sequenciaDoAno(ano);
  /* Se algum bloco declara a sua turma, só os que declaram são ponto de
     partida: é o ano em que só um grupo foi transcrito (6º ano, Grupo E) e
     inventar letras para os outros períodos criaria turmas que não existem.
     Sem nenhuma letra declarada, vale a ordem alfabética, bloco a bloco. */
  const algumDeclara = seq.some(b => b.grupoRodizio);
  // o quadro da faculdade (turmasPorJanela) também é o calendário impresso: as
  // letras dele são de verdade, mesmo sem grupoRodizio escrito no bloco
  const quadroImpresso = seq.some(b => Array.isArray(b.turmasPorJanela) && b.turmasPorJanela.length);
  const opcoes = [];
  seq.forEach((b,i)=>{
    if(algumDeclara && !b.grupoRodizio) return;
    const rotulo = b.grupoRodizio || letraPadraoRodizio(i);
    opcoes.push({
      deslocamento: i,
      rotulo,
      // a letra vem escrita no bloco (calendário impresso) ou foi só contada?
      // Letra contada não é nome de grupo nenhum — ver tituloOpcaoRodizio
      nomeado: !!b.grupoRodizio || quadroImpresso,
      // por qual estágio essa turma começa o ano — pelo quadro, quando ele
      // existe, e não pela posição na lista
      bloco: conteudoDaJanela(seq, rotulo, i, 0) || b,
    });
  });
  return opcoes;
}
/* A turma de um deslocamento guardado. Se o deslocamento não é mais ponto de
   partida de ninguém (turma criada quando o ano tinha outras letras), ela cai
   na primeira turma do ano em vez de ficar sem calendário. */
function turmaDoDeslocamento(ano, deslocamento){
  const seq = sequenciaDoAno(ano);
  const d = normalizarDeslocamento(deslocamento, seq.length);
  const opcoes = opcoesRodizio(ano);
  return opcoes.find(o=>o.deslocamento===d) || opcoes[0] || { deslocamento: d, rotulo: letraPadraoRodizio(d), nomeado: false };
}
/* As mesmas opções em ordem alfabética de letra — que é como o calendário
   impresso lista as turmas (A, B, C, D) e como a pessoa procura a sua. A
   ordem de deslocamento (a da sequência) continua valendo onde o que importa
   é o calendário, não a turma. */
function opcoesRodizioPorLetra(ano){
  return opcoesRodizio(ano).slice().sort((a,b)=>a.rotulo.localeCompare(b.rotulo, "pt-BR"));
}
function rotuloRodizio(ano, deslocamento){ return turmaDoDeslocamento(ano, deslocamento).rotulo; }
/* GRUPO SEM NOME. Só há "Grupo A, B, C…" onde o calendário da faculdade traz
   essas letras (grupoRodizio no bloco). Onde não traz, a letra é só a ordem
   dos blocos, contada pela plataforma — chamar a turma de "Grupo C" seria
   inventar um nome que ninguém usa. Nesses anos o grupo é identificado pelo
   que de fato o distingue: o BLOCO EM QUE COMEÇA. */
function tituloOpcaoRodizio(o){
  const inicio = o.bloco ? o.bloco.nome : "";
  if(o.nomeado) return "Grupo " + o.rotulo + (inicio ? " — começa em " + inicio : "");
  return inicio ? "Começa em " + inicio : "Grupo " + o.rotulo;
}
// o nome do grupo do rodízio nos textos de tela: "Grupo A" ou "Começa em Cardiologia"
function nomeRodizio(ano, deslocamento){
  const t = turmaDoDeslocamento(ano, deslocamento);
  return t.nomeado || !t.bloco ? "Grupo " + t.rotulo : "Começa em " + t.bloco.nome;
}
/* CALENDÁRIO PRÓPRIO DO GRUPO. Além de seguir o rodízio de um ano, um grupo
   pode ter blocos só dele (`blocosProprios`: nome, datas e especialidades,
   montados por quem o criou). Lista vazia vale: é o grupo que existe só para
   dividir questões, sem calendário. */
function grupoComCalendarioProprio(grupo){ return !!grupo && Array.isArray(grupo.blocosProprios); }
function blocosDoGrupo(grupo, usuario){
  if(grupoComCalendarioProprio(grupo)){
    return grupo.blocosProprios.slice().sort((a,b)=>a.dataInicio.localeCompare(b.dataInicio))
      .map((b,i)=>({ id:b.id, nome:b.nome, especialidadeIds:b.especialidadeIds||[], subdivisoes:[], ordem:i+1, dataInicio:b.dataInicio, dataFim:b.dataFim }));
  }
  const ano = anoDoGrupo(grupo, usuario);
  // quem já se formou não tem calendário de faculdade: sem turma de um ano e
  // sem grupo com calendário próprio, não há bloco nenhum para seguir
  if(!temCalendarioProprio(ano)) return [];
  const seq = sequenciaDoAno(ano);
  const n = seq.length;
  if(!n) return [];
  const { deslocamento, rotulo } = turmaDoDeslocamento(ano, grupo && grupo.deslocamento);
  // cada janela de data recebe o conteúdo que o quadro do ano põe nela para
  // esta turma — ou, onde não há quadro, o bloco que está "deslocamento"
  // posições à frente: é o rodízio em ciclo, mesma sequência, começos diferentes
  return seq.map((janela, i) => {
    const conteudo = conteudoDaJanela(seq, rotulo, deslocamento, i);
    return {
      id: conteudo.id, nome: conteudo.nome, especialidadeIds: conteudo.especialidadeIds,
      subdivisoes: ordemDosEstagios(conteudo, usuario || usuarioAtual()),
      ordem: i+1, dataInicio: janela.dataInicio, dataFim: janela.dataFim,
    };
  });
}
/* DOIS LUGARES POR PESSOA. O grupo do CALENDÁRIO (usuario.grupoId: rodízio ou
   calendário próprio) é um só — é o que a turma da vida real é, e entrar
   num grupo é também SAIR do anterior, senão a pessoa ficava listada em três
   turmas ao mesmo tempo. Além dele, a pessoa pode estar em UM grupo só de
   QUESTÕES (usuario.grupoQuestoesId): esse não mexe no calendário, serve só
   para compartilhar e dividir questões e cartões. O calendário oficial é a
   ausência de turma, então não tem lista de membros. */
function getGrupoQuestoesDoUsuario(usuario){
  if(!usuario || !usuario.grupoQuestoesId || usuario.grupoQuestoesId === usuario.grupoId) return null;
  const g = getGrupo(usuario.grupoQuestoesId);
  if(!g || g.oficial) return null;
  return g.criadoPor === usuario.id || (g.membrosAprovados||[]).includes(usuario.id) ? g : null;
}
// os grupos de verdade da pessoa (sem o calendário oficial): o do calendário e o de questões
function gruposDoUsuario(usuario){
  const principal = getGrupoDoUsuario(usuario);
  return [principal.oficial ? null : principal, getGrupoQuestoesDoUsuario(usuario)].filter(Boolean);
}
/* Onde caem as questões e os cartões "do meu grupo" quando só há um destino:
   o grupo do calendário, ou — quem não tem um — o de questões. */
function grupoPrincipalDeQuestoes(usuario){ return gruposDoUsuario(usuario)[0] || getGrupoOficial(); }
/* Destino "do meu grupo" ao enviar questões: "grupo" é o principal e "grupo2"
   o segundo, para quem está em dois. Cada opção diz o nome do grupo, porque
   é a pessoa quem escolhe para qual dos dois a questão vai.
   Só entram os grupos para os quais o envio funciona: com a nuvem ligada, a
   questão de um grupo que só existe neste navegador nunca chegaria aos colegas
   (ver questaoSobeParaNuvem). Sem grupo nenhum não há destino "do grupo" —
   antes ele caía no calendário oficial e a questão ficava presa no aparelho
   enquanto a tela prometia que o grupo a receberia. */
function gruposParaEnviarQuestoes(usuario){
  return gruposDoUsuario(usuario).filter(g => !nuvemConectado() || grupoDeNuvem(g));
}
function destinoEhGrupo(destino){ return destino === "grupo" || destino === "grupo2"; }
function grupoDoDestino(usuario, destino){
  const gs = gruposParaEnviarQuestoes(usuario);
  return (destino === "grupo2" ? gs[1] : gs[0]) || null;
}
function valorDoDestinoDoGrupo(usuario, grupoId){
  const i = gruposParaEnviarQuestoes(usuario).findIndex(g => g.id === grupoId);
  return i < 0 ? "" : (i ? "grupo2" : "grupo");
}
function opcoesDeDestinoDeGrupo(usuario, textoUnico, textoDoGrupo){
  const gs = gruposParaEnviarQuestoes(usuario);
  if(!gs.length) return [];
  if(gs.length < 2) return [["grupo", textoUnico]];
  return gs.map((g, i) => [i ? "grupo2" : "grupo", textoDoGrupo(g)]);
}
function idsDosGruposDoUsuario(usuario){ return gruposDoUsuario(usuario).map(g => g.id); }
/* Quem sai de um grupo (ou é retirado dele) perde o acesso às questões dele na
   nuvem, mas o aparelho nunca recebe esse aviso: a linha deixa de descer e a
   cópia local ficava para sempre. Só as que já subiram são soltas — a que
   ainda está só aqui é de quem a escreveu. */
function soltarQuestoesDoGrupo(grupoId, todas){
  db.questoes = db.questoes.filter(q => !(q.grupoId === grupoId && (todas || q.naNuvem)));
}
function tirarDosGrupos(usuario, manter){
  const eu = typeof euNaNuvem === "function" && nuvemConectado() ? euNaNuvem() : null;
  (db.grupos||[]).forEach(g => {
    if(g.oficial || manter.includes(g.id)) return;
    if(eu && eu.id === usuario.id && (g.membrosAprovados||[]).includes(usuario.id)) soltarQuestoesDoGrupo(g.id);
    g.membrosAprovados = (g.membrosAprovados||[]).filter(id => id !== usuario.id);
    g.solicitacoesPendentes = (g.solicitacoesPendentes||[]).filter(id => id !== usuario.id);
  });
}
/* `opcoes.soQuestoes`: entra como grupo de questões, sem tocar no calendário
   (e sai do grupo de questões anterior). Sem ela, é o grupo do calendário, e
   o de questões só se mantém se for outro grupo. */
function entrarNoGrupo(usuario, grupoId, opcoes){
  if(!usuario) return;
  const destino = getGrupo(grupoId);
  const soQuestoes = !!(opcoes && opcoes.soQuestoes) && !!destino && !destino.oficial;
  // `manterAtual`: o grupo do calendário de agora passa a ser o de questões (ver 10b, oferecerManterGrupoAtualComoDeQuestoes)
  const atual = getGrupo(usuario.grupoId);
  const extra = soQuestoes ? null
    : (opcoes && opcoes.manterAtual && atual && !atual.oficial && !atual.doRodizio && atual.id !== grupoId) ? atual
    : getGrupoQuestoesDoUsuario(usuario);
  const manter = soQuestoes ? [usuario.grupoId, grupoId] : [grupoId, extra && extra.id !== grupoId ? extra.id : null];
  tirarDosGrupos(usuario, manter);
  if(destino && !destino.oficial){
    if(!destino.membrosAprovados) destino.membrosAprovados = [];
    if(!destino.membrosAprovados.includes(usuario.id)) destino.membrosAprovados.push(usuario.id);
    destino.solicitacoesPendentes = (destino.solicitacoesPendentes||[]).filter(id => id !== usuario.id);
  }
  if(soQuestoes){ usuario.grupoQuestoesId = destino.id; return; }
  usuario.grupoId = destino ? destino.id : db.grupoOficialId;
  if(extra && extra.id !== usuario.grupoId) usuario.grupoQuestoesId = extra.id; else delete usuario.grupoQuestoesId;
}
function sairDoGrupoDeQuestoes(usuario){
  const g = getGrupoQuestoesDoUsuario(usuario);
  delete usuario.grupoQuestoesId;
  tirarDosGrupos(usuario, [usuario.grupoId]);
  return g;
}
function especialidadeDeAssunto(assuntoId){ const a=getAssunto(assuntoId); return a ? getEspecialidade(a.especialidadeId) : null; }
function areaDeAssunto(assuntoId){ const e=especialidadeDeAssunto(assuntoId); return e ? getArea(e.areaId) : null; }
function nomeAssunto(id){ const a=getAssunto(id); return a ? a.nome : "—"; }
function nomeEspecialidade(id){ const e=getEspecialidade(id); return e ? e.nome : "—"; }
function nomeArea(id){ const a=getArea(id); return a ? a.nome : "—"; }
/* ---------------------------- PERMISSÕES DE ADMIN -------------------------
   Cada nível de administrador enxerga e altera apenas o que lhe cabe. Para
   mudar o que um nível pode fazer, basta acrescentar ou remover chaves aqui. */
const PERMISSOES_ADMIN = {
  master:      ["conteudo","cadastros","usuarios","blocos","config","livro-ouro","backup","taxonomia","turma","avisos"],
  coordenacao: ["conteudo","cadastros","blocos","livro-ouro","taxonomia","turma","avisos"],
  moderador:   ["conteudo","taxonomia"],
};
// rotas que exigem uma permissão específica de administrador
const PERMISSAO_DA_ROTA = {
  "usuarios":"usuarios", "config-geral":"config", "blocos":"blocos",
  "aprovar-cadastros":"cadastros", "feedback-usuarios":"cadastros", "taxonomia":"taxonomia",
  "material-pdf":"conteudo", "central-provas":"conteudo", "painel-turma":"turma",
  "atualizar-questoes":"conteudo", "pendencias-conteudo":"conteudo", "enviar-avisos":"avisos",
};
function nivelAdminDe(usuario){
  if(!usuario || usuario.papel!=="admin") return null;
  return usuario.nivelAdmin || "coordenacao";
}
function rotuloNivelAdmin(nivel){
  const n = CONFIG.niveisAdmin.find(x=>x.id===nivel);
  return n ? n.nome : "Administrador";
}
function podeAdmin(chave, usuario){
  usuario = usuario || usuarioAtual();
  if(!usuario) return false;
  if(usuario.papel!=="admin") return false;
  return (PERMISSOES_ADMIN[nivelAdminDe(usuario)] || []).includes(chave);
}
// professores também mexem em conteúdo e taxonomia; admins dependem do nível
function podeGerirConteudo(usuario){
  usuario = usuario || usuarioAtual();
  if(!usuario) return false;
  if(usuario.papel==="professor") return true;
  return podeAdmin("conteudo", usuario);
}
function usuarioAtual(){ return state.usuarioAtualId ? getUsuario(state.usuarioAtualId) : null; }

/* ==========================================================================
   SENHA DAS CONTAS LOCAIS (só deste navegador)
   ==========================================================================
   Conta local guardava a senha em texto no banco — e, portanto, em todo
   backup exportado, que circula por e-mail e pasta compartilhada. Agora
   guarda sal + hash (SHA-256 repetido). É síncrono de propósito:
   crypto.subtle é assíncrono e o login local, os testes e a troca de senha
   dependem de resposta na hora. É proteção contra quem lê o arquivo de
   backup por acaso, não contra quem tem o aparelho e tempo: para isso existe
   a conta da nuvem (senha no servidor, com hash de verdade). Conta antiga
   com `senha` em texto continua entrando e é convertida no primeiro login
   (e na carga, ver migração em loadState). */
const ITERACOES_HASH_SENHA = 3000;
function sha256Hex(texto){
  const K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
    0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
  const bytes = Array.from(unescape(encodeURIComponent(texto)), c => c.charCodeAt(0));
  const bits = bytes.length * 8;
  bytes.push(0x80);
  while(bytes.length % 64 !== 56) bytes.push(0);
  for(let i = 7; i >= 0; i--) bytes.push(i >= 4 ? 0 : (bits >>> (i * 8)) & 0xff);
  const h = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
  const w = new Array(64);
  const gira = (x, n) => (x >>> n) | (x << (32 - n));
  for(let o = 0; o < bytes.length; o += 64){
    for(let i = 0; i < 16; i++) w[i] = (bytes[o+i*4] << 24) | (bytes[o+i*4+1] << 16) | (bytes[o+i*4+2] << 8) | bytes[o+i*4+3];
    for(let i = 16; i < 64; i++){
      const s0 = gira(w[i-15], 7) ^ gira(w[i-15], 18) ^ (w[i-15] >>> 3), s1 = gira(w[i-2], 17) ^ gira(w[i-2], 19) ^ (w[i-2] >>> 10);
      w[i] = (w[i-16] + s0 + w[i-7] + s1) | 0;
    }
    let [a, b, c, d, e, f, g, hh] = h;
    for(let i = 0; i < 64; i++){
      const t1 = (hh + (gira(e, 6) ^ gira(e, 11) ^ gira(e, 25)) + ((e & f) ^ (~e & g)) + K[i] + w[i]) | 0;
      const t2 = ((gira(a, 2) ^ gira(a, 13) ^ gira(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
      hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    [a, b, c, d, e, f, g, hh].forEach((v, i) => { h[i] = (h[i] + v) | 0; });
  }
  return h.map(v => (v >>> 0).toString(16).padStart(8, "0")).join("");
}
function hashDaSenha(senha, sal){
  let r = sal + ":" + senha;
  for(let i = 0; i < ITERACOES_HASH_SENHA; i++) r = sha256Hex(r + sal);
  return r;
}
function definirSenhaLocal(usuario, senha){
  const sal = uid("sal") + Math.random().toString(36).slice(2);
  usuario.senhaSal = sal;
  usuario.senhaHash = hashDaSenha(senha, sal);
  delete usuario.senha;
}
function senhaLocalConfere(usuario, senha){
  if(!usuario) return false;
  if(usuario.senhaHash) return hashDaSenha(String(senha), usuario.senhaSal || "") === usuario.senhaHash;
  return typeof usuario.senha === "string" && usuario.senha === senha;   // conta antiga, ainda em texto
}
// converte a conta antiga na hora em que a senha certa é digitada
function converterSenhaLocalSeAntiga(usuario, senha){
  if(usuario && !usuario.senhaHash && typeof usuario.senha === "string" && usuario.senha === senha){ definirSenhaLocal(usuario, senha); saveState(); }
}
// o que nunca sai da conta: no perfil exportado e na cópia vinda da nuvem
function semCamposDeSenha(usuario){
  const copia = Object.assign({}, usuario); delete copia.senha; delete copia.senhaHash; delete copia.senhaSal; return copia;
}

/* ==========================================================================
   SEÇÕES E FILTROS RECOLHÍVEIS
   ========================================================================== */
/* Tela de lista ou de análise com tudo aberto cansa: o que a pessoa vem ver fica
   no alto e o detalhe espera um clique. O estado aberto/fechado vive em
   state.secoesRecolhiveis, porque a tela se redesenha a cada filtro ou período
   e um <details> solto voltaria ao padrão a cada vez. */
function secaoRecolhivelAberta(chave, padrao){
  const s = state.secoesRecolhiveis || {};
  return chave in s ? !!s[chave] : !!padrao;
}
function lembrarSecaoRecolhivel(chave, aberta){
  state.secoesRecolhiveis = state.secoesRecolhiveis || {};
  state.secoesRecolhiveis[chave] = !!aberta;
}
// resumoHtml é a linha que fica visível com a seção fechada: o número que diz se vale abrir
function htmlSecaoRecolhivel(chave, tituloHtml, resumoHtml, corpoHtml, abertaPorPadrao){
  return `<details class="card mb-2 secao-recolhivel" ${secaoRecolhivelAberta(chave, abertaPorPadrao) ? "open" : ""} ontoggle="lembrarSecaoRecolhivel('${chave}', this.open)">
    <summary><span class="card-title sem-m">${tituloHtml}</span>${resumoHtml ? `<span class="secao-resumo text-sm muted">${resumoHtml}</span>` : ""}</summary>
    <div class="secao-corpo">${corpoHtml}</div>
  </details>`;
}
/* Filtros: a barra (botão "Filtros (n)", chips do que está ligado e o que a tela
   quiser deixar sempre à vista, como a busca) e o corpo com os campos, que só
   abre sob pedido. Cada chip tem o x que desliga aquele filtro (`limpar` é o
   código do onclick). */
function alternarFiltrosRecolhiveis(chave){
  lembrarSecaoRecolhivel(chave, !secaoRecolhivelAberta(chave, false));
  render();
}
function htmlFiltrosRecolhiveis(chave, chips, barraExtraHtml, corpoHtml){
  const aberta = secaoRecolhivelAberta(chave, false);
  return `<div class="card mb-2 filtros-recolhiveis">
    <div class="filtros-barra">
      <button class="btn btn-secondary btn-sm" aria-expanded="${aberta}" onclick="alternarFiltrosRecolhiveis('${chave}')">${iconeSvg("filter")} Filtros${chips.length ? " ("+chips.length+" ativo"+(chips.length===1?"":"s")+")" : ""} ${iconeSvg(aberta ? "arrow-up" : "arrow-down")}</button>
      ${barraExtraHtml || ""}
      ${chips.map(c=>`<span class="chip-filtro">${escapeHtml(c.texto)}<button class="chip-x" aria-label="Tirar o filtro ${escapeHtml(c.texto)}" onclick="${c.limpar}">${iconeSvg("x")}</button></span>`).join("")}
    </div>
    ${aberta ? `<div class="filtros-corpo mt-2">${corpoHtml}</div>` : ""}
  </div>`;
}
