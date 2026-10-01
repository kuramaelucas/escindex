/* codigo/09c-cartoes-em-lote.js — Cartões em lote, a exportação do baralho para dados/ (seção 12-C) e o baralho inteiro trazido de uma IA (12-D).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   12-C. CARTÕES EM LOTE — cobrir os assuntos que ainda não têm cartão
   ==========================================================================
   O mesmo caminho da Central de Provas, para flashcards: a tela mostra os
   assuntos com menos cartões da equipe (os que mais caem na prova primeiro),
   a pessoa escolhe alguns, copia um modelo pronto para uma conversa de IA,
   cola a resposta de volta, CONFERE (assunto existe? frente e verso
   preenchidos? cartão repetido?) e publica. Conferir não publica nada.

   Publicado aqui, o cartão fica no navegador de quem publicou — como tudo o
   que a equipe cria pela plataforma. "Exportar para a pasta dados/" baixa um
   arquivo pronto para entrar na pasta (e na lista ESC_ARQUIVOS do
   index.html): é o que o torna de todo mundo. */
const CARTOES_POR_ASSUNTO_ALVO = 3;
function estadoLoteCartoes(){
  if(!state.filtroRota.loteCartoes) state.filtroRota.loteCartoes = { selecionados: [], porAssunto: CARTOES_POR_ASSUNTO_ALVO, texto: "", analise: null, aberto: false };
  return state.filtroRota.loteCartoes;
}
function coberturaDeCartoes(){
  const conta = {};
  flashcardsDaEquipe().forEach(c => { conta[c.assuntoId] = (conta[c.assuntoId]||0) + 1; });
  const inc = incidenciaNaBanca();
  return db.taxonomia.assuntos.map(a => ({
    assuntoId: a.id, nome: a.nome, especialidadeId: a.especialidadeId,
    cartoes: conta[a.id] || 0, naProva: (inc.porAssunto[a.id] || {}).n || 0,
  })).sort((x, y) => x.cartoes - y.cartoes || y.naProva - x.naProva || x.nome.localeCompare(y.nome));
}
function renderCartoesEmLote(){
  const st = estadoLoteCartoes();
  const cob = coberturaDeCartoes();
  const faltando = cob.filter(c => c.cartoes < CARTOES_POR_ASSUNTO_ALVO);
  const semNenhum = cob.filter(c => c.cartoes === 0).length;
  const cabecalho = `<div class="flex justify-between items-center gap-2" style="flex-wrap:wrap">
      <div style="min-width:220px;flex:1"><div class="card-title">${iconeSvg("cards")} Cobrir os assuntos sem cartão — em lote</div>
      <div class="text-sm muted">${semNenhum} assunto(s) sem nenhum cartão da equipe e ${faltando.length - semNenhum} com menos de ${CARTOES_POR_ASSUNTO_ALVO}. Os que mais caem na prova vêm primeiro.</div></div>
      <button class="btn btn-secondary btn-sm" onclick="estadoLoteCartoes().aberto=!estadoLoteCartoes().aberto; render()">${st.aberto ? "Fechar" : "Abrir"}</button>
    </div>`;
  if(!st.aberto) return `<div class="card mt-2">${cabecalho}</div>`;
  const lista = faltando.slice(0, 40);
  const sel = new Set(st.selecionados);
  const a = st.analise;
  return `<div class="card mt-2">${cabecalho}
    <div class="mt-2 text-sm"><strong>1. Escolha os assuntos</strong> <span class="muted">(de 5 a 10 por conversa funciona bem)</span>
      <button class="link-btn text-sm" onclick="selecionarAssuntosDoLote(8)">marcar os 8 primeiros</button> ·
      <button class="link-btn text-sm" onclick="selecionarAssuntosDoLote(0)">desmarcar</button></div>
    <div class="lote-assuntos mt-1">${lista.map(c => `<label class="checkbox-row text-sm"><input type="checkbox" ${sel.has(c.assuntoId)?"checked":""} onchange="alternarAssuntoDoLote('${c.assuntoId}', this.checked)">
      ${escapeHtml(c.nome)} <span class="text-xs muted">${escapeHtml(nomeEspecialidade(c.especialidadeId))} · ${c.cartoes} cartão(ões)${c.naProva?` · caiu ${c.naProva}× na prova`:""}</span></label>`).join("")}</div>
    <div class="flex gap-1 items-center mt-2" style="flex-wrap:wrap">
      <span class="text-sm">Cartões por assunto:</span>
      <input class="input" type="number" min="1" max="10" style="max-width:80px" value="${st.porAssunto}" onchange="estadoLoteCartoes().porAssunto=Math.max(1,Math.min(10,parseInt(this.value)||3)); render()">
      <button class="btn btn-primary btn-sm" ${sel.size?"":"disabled"} onclick="copiarTexto(modeloLoteCartoes(), 'Modelo copiado. Cole numa conversa de IA e traga a resposta para o campo abaixo.')">${iconeSvg("clipboard")} 2. Copiar o modelo (${sel.size} assunto(s))</button>
    </div>
    <div class="mt-2 text-sm"><strong>3. Cole a resposta e confira</strong></div>
    <textarea class="textarea textarea-mono mt-1" id="loteCartoesTexto" style="min-height:160px" placeholder="ASSUNTO: ass-...&#10;FRENTE: ...&#10;VERSO: ...&#10;FONTE: ...&#10;---">${escapeHtml(st.texto||"")}</textarea>
    <div class="flex gap-1 mt-1" style="flex-wrap:wrap">
      <button class="btn btn-secondary btn-sm" onclick="conferirLoteCartoes()">Conferir</button>
      ${a && a.validos.length ? `<button class="btn btn-primary btn-sm" onclick="publicarLoteCartoes()">4. Publicar ${a.validos.length} cartão(ões)</button>` : ""}
      <button class="btn btn-ghost btn-sm" onclick="exportarCartoesParaDados()">${iconeSvg("download")} Exportar cartões publicados para a pasta dados/</button>
    </div>
    ${a ? `<div class="card-flat mt-2 text-sm">
      <strong>${a.validos.length}</strong> cartão(ões) prontos para publicar${a.problemas.length?`, <strong style="color:var(--danger)">${a.problemas.length}</strong> com problema`:""}.
      ${a.problemas.length ? `<ul class="text-xs mt-1">${a.problemas.slice(0,15).map(p=>`<li>${escapeHtml(p)}</li>`).join("")}</ul>` : ""}
      ${a.validos.length ? `<div class="table-wrap mt-1"><table><thead><tr><th>Assunto</th><th>Frente</th><th>Verso</th></tr></thead><tbody>${a.validos.slice(0,12).map(c=>`<tr><td class="text-xs">${escapeHtml(nomeAssunto(c.assuntoId))}</td><td class="text-xs">${escapeHtml(c.frente)}</td><td class="text-xs">${escapeHtml(c.verso)}</td></tr>`).join("")}</tbody></table></div>${a.validos.length>12?`<div class="text-xs muted">… e mais ${a.validos.length-12}.</div>`:""}` : ""}
    </div>` : ""}
    <p class="text-xs muted mt-2">Os cartões publicados aqui ficam neste navegador. Para chegarem a todos, use "Exportar para a pasta dados/", ponha o arquivo na pasta e o nome dele na lista ESC_ARQUIVOS.dados do index.html (dados/LEIA-ME.md explica).</p>
  </div>`;
}
function selecionarAssuntosDoLote(n){
  const st = estadoLoteCartoes();
  st.selecionados = n ? coberturaDeCartoes().filter(c => c.cartoes < CARTOES_POR_ASSUNTO_ALVO).slice(0, n).map(c => c.assuntoId) : [];
  render();
}
function alternarAssuntoDoLote(id, marcado){
  const st = estadoLoteCartoes();
  st.selecionados = st.selecionados.filter(x => x !== id);
  if(marcado) st.selecionados.push(id);
  render();
}
function modeloLoteCartoes(){
  const st = estadoLoteCartoes();
  const existentes = flashcardsDaEquipe();
  const linhas = st.selecionados.map(id => {
    const a = getAssunto ? getAssunto(id) : db.taxonomia.assuntos.find(x => x.id === id);
    const ja = existentes.filter(c => c.assuntoId === id).map(c => "   (já existe: " + c.frente + ")").join("\n");
    return "- " + id + " = " + (a ? a.nome : id) + " (" + nomeEspecialidade(a ? a.especialidadeId : "") + ")" + (ja ? "\n" + ja : "");
  }).join("\n");
  return "Você vai escrever FLASHCARDS para estudantes de medicina que se preparam para a prova de residência médica no Brasil (banca de referência: " + bancaDeReferencia() + ").\n\n" +
    "ASSUNTOS (escreva " + st.porAssunto + " cartões para CADA um; use o código exatamente como está):\n" + linhas + "\n\n" +
    "COMO É UM BOM CARTÃO:\n" +
    "- FRENTE: uma pergunta curta e específica, que tenha UMA resposta (nada de \"fale sobre...\").\n" +
    "- VERSO: a resposta direta em 1 a 3 frases, com o dado que a prova cobra (critério, dose, conduta, número de corte, achado clássico) e, quando couber, o porquê.\n" +
    "- Priorize o que mais cai em prova: critério diagnóstico, primeira conduta, contraindicação, exame de escolha, pegadinha clássica.\n" +
    "- Cada cartão do mesmo assunto cobre um ponto DIFERENTE, e nenhum repete os que já existem (listados acima).\n" +
    "- Português do Brasil; nomes de medicamentos pela DCB.\n\n" +
    "REGRAS DE CONTEÚDO:\n" +
    "- Escreva com as suas palavras. NÃO copie nem resuma material de cursinhos, bancos de questões comerciais ou apostilas.\n" +
    "- Baseie-se em fontes primárias e oficiais: diretrizes de sociedades de especialidade, protocolos e PCDT do Ministério da Saúde, consensos internacionais. Diga a fonte no campo FONTE (nome e ano). Se não tiver certeza da fonte, escreva \"a conferir\" — nunca invente.\n" +
    "- Se um ponto for controverso ou tiver mudado recentemente, escolha outro ponto.\n\n" +
    "FORMATO (exatamente assim, um bloco por cartão, separados por uma linha com ---):\n" +
    "ASSUNTO: [código do assunto, ex.: " + (st.selecionados[0] || "ass-exemplo") + "]\n" +
    "FRENTE: [pergunta]\n" +
    "VERSO: [resposta]\n" +
    "FONTE: [diretriz/consenso e ano]\n" +
    "---\n\n" +
    "Responda só com os blocos, sem introdução nem comentários.";
}
/* Lê o texto devolvido pela IA: um bloco por cartão, separados por uma linha
   com ---, cada campo numa linha "CAMPO: texto". Linha sem rótulo continua o
   campo anterior. Serve ao lote por assunto (acima) e ao baralho inteiro (12-D). */
function blocosDeCartoes(texto){
  return String(texto || "").split(/^\s*-{3,}\s*$/m).map(b => b.trim()).filter(Boolean).map(b => {
    const campos = {}; let atual = null;
    b.split(/\r?\n/).forEach(linha => {
      const m = /^\s*\**\s*(ASSUNTO|FRENTE|VERSO|FONTE)\s*\**\s*:\s*(.*)$/i.exec(linha);
      if(m){ atual = m[1].toUpperCase(); campos[atual] = m[2]; }
      else if(atual) campos[atual] += " " + linha;
    });
    const campo = nome => String(campos[nome] || "").replace(/\s+/g, " ").replace(/^\*+|\*+$/g, "").trim();
    return { assunto: campo("ASSUNTO"), frente: campo("FRENTE"), verso: campo("VERSO"), fonte: campo("FONTE") };
  });
}
function analisarTextoLoteCartoes(texto){
  const assuntos = new Set(db.taxonomia.assuntos.map(a => a.id));
  const existentes = new Set(flashcardsDaEquipe().map(c => normalizarFrente(c.frente)));
  const vistos = new Set();
  const validos = [], problemas = [];
  const blocos = blocosDeCartoes(texto);
  blocos.forEach((b, i) => {
    const c = { assuntoId: b.assunto, frente: b.frente, verso: b.verso, fonte: b.fonte };
    const n = "Cartão " + (i + 1);
    if(!c.frente || !c.verso){ problemas.push(n + ": falta FRENTE ou VERSO."); return; }
    if(!assuntos.has(c.assuntoId)){ problemas.push(n + ": assunto \"" + c.assuntoId + "\" não existe na taxonomia."); return; }
    const chave = normalizarFrente(c.frente);
    if(existentes.has(chave)){ problemas.push(n + ": já existe um cartão da equipe com esta frente."); return; }
    if(vistos.has(chave)){ problemas.push(n + ": repetido dentro do próprio lote."); return; }
    vistos.add(chave);
    validos.push(c);
  });
  if(!blocos.length) problemas.push("Nenhum bloco encontrado. Cada cartão começa com ASSUNTO:, FRENTE:, VERSO: e termina numa linha com ---.");
  return { validos, problemas };
}
function normalizarFrente(t){ return String(t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }
function conferirLoteCartoes(){
  const st = estadoLoteCartoes();
  st.texto = (document.getElementById("loteCartoesTexto") || {}).value || "";
  st.analise = analisarTextoLoteCartoes(st.texto);
  render();
}
function publicarLoteCartoes(){
  const st = estadoLoteCartoes();
  if(!st.analise || !st.analise.validos.length) return;
  if(!podeGerirConteudo()){ toast("Só professores e administradores de conteúdo publicam cartões da equipe.", "err"); return; }
  const u = usuarioAtual();
  st.analise.validos.forEach(c => db.flashcards.push({
    id: uid("fc"), assuntoId: c.assuntoId, frente: c.frente, verso: c.verso, fonte: c.fonte || "",
    origem: "autoral", usuarioId: null, status: "ativo", criadoPor: u.id, criadoEm: hojeISO(), revisao: "pendente",
  }));
  const n = st.analise.validos.length;
  saveState();
  st.texto = ""; st.analise = null; st.selecionados = [];
  toast(n + " cartão(ões) publicados neste navegador. Para irem para todos, exporte para a pasta dados/.");
  render();
}
/* Os cartões da equipe criados pela plataforma (não os que vieram da pasta
   dados/), num arquivo pronto para a pasta: registrarFlashcards(...). */
function exportarCartoesParaDados(){
  const novos = flashcardsDaEquipe().filter(c => c.criadoPor !== "seed");
  if(!novos.length){ toast("Não há cartões criados pela plataforma para exportar.", "err"); return; }
  const nome = "flashcards-" + hojeISO();
  const linhas = novos.map(c => "  " + JSON.stringify({ id: c.id, assuntoId: c.assuntoId, frente: c.frente, verso: c.verso, fonte: c.fonte || undefined, origem: "autoral", criadoPor: "seed", criadoEm: c.criadoEm, revisao: c.revisao || undefined }) + ",");
  const arquivo = "/* Cartões da equipe criados pela plataforma em " + formatDataBR(hojeISO()) + " (" + novos.length + ").\n" +
    "   Para entrarem para todos: salve este arquivo na pasta dados/ e acrescente\n" +
    "   \"" + nome + "\" à lista ESC_ARQUIVOS.dados do index.html. */\n" +
    "window.EscDados.registrarFlashcards(\"" + nome + "\", [\n" + linhas.join("\n") + "\n]);\n";
  baixarArquivo(nome + ".js", arquivo, "text/javascript");
}

/* ==========================================================================
   12-D. ADICIONAR BARALHO — trazer um baralho inteiro de uma IA
   ==========================================================================
   Para qualquer pessoa, aluno inclusive: o mesmo caminho do "Enviar
   questões" — a plataforma monta o prompt, a IA escreve os cartões, a pessoa
   cola o resultado, CONFERE e só então adiciona. Conferir não adiciona nada.

   Fica atrás de um único botão ("Adicionar baralho", em Revisão Rápida) para
   não poluir a tela: a janela abre com o essencial (assunto, quantidade, tema)
   e o prompt só aparece se a pessoa quiser lê-lo.

   Cartão de aluno é PESSOAL (ninguém mais vê, entra só no baralho dele). Quem
   gere conteúdo pode, desmarcando "só para mim", publicar para a equipe — com
   revisao "pendente", como no lote por assunto. Cartão que já existe (mesma
   frente) é pulado: o mesmo baralho colado duas vezes não duplica. */
function estadoBaralhoIA(){
  if(!state.filtroRota.baralhoIA) state.filtroRota.baralhoIA = { assuntoId: "", quantidade: 20, tema: "", texto: "", analise: null, pessoal: true, passo: "escolha" };
  return state.filtroRota.baralhoIA;
}
function abrirAdicionarBaralho(){
  state.filtroRota.baralhoIA = null;
  desenharAdicionarBaralho();
}
/* Guarda o que está nos campos antes de redesenhar a janela, para nada que a
   pessoa digitou se perder a cada clique. */
function guardarCamposBaralhoIA(){
  const st = estadoBaralhoIA();
  const campo = id => document.getElementById(id);
  if(campo("baralhoAssunto")) st.assuntoId = campo("baralhoAssunto").value;
  if(campo("baralhoQtd")) st.quantidade = Math.max(5, Math.min(80, parseInt(campo("baralhoQtd").value) || 20));
  if(campo("baralhoTema")) st.tema = campo("baralhoTema").value;
  if(campo("baralhoTexto")) st.texto = campo("baralhoTexto").value;
  if(campo("baralhoPessoal")) st.pessoal = campo("baralhoPessoal").checked;
  if(campo("baralhoGrupo")) st.compartilhar = campo("baralhoGrupo").checked;
  return st;
}
function mudarPassoBaralhoIA(passo){ guardarCamposBaralhoIA().passo = passo; desenharAdicionarBaralho(); }
function desenharAdicionarBaralho(){
  const st = estadoBaralhoIA();
  if(st.passo === "escolha"){
    abrirModal(`
      ${cabecalhoJanela("Adicionar baralho")}
      <p class="text-sm muted">Como você quer montar os cartões?</p>
      <div class="grid grid-2 mt-2">
        <button class="card-flat" style="text-align:left;cursor:pointer" onclick="fecharModal(); abrirFormularioFlashcard(null)">
          <div style="font-weight:700">${iconeSvg("edit")} Escrever um cartão</div>
          <div class="text-xs muted mt-1">Um cartão de cada vez, com as suas palavras.</div>
        </button>
        <button class="card-flat" style="text-align:left;cursor:pointer" onclick="mudarPassoBaralhoIA('ia')">
          <div style="font-weight:700">${iconeSvg("cards")} Trazer um baralho inteiro de uma IA</div>
          <div class="text-xs muted mt-1">A plataforma monta o pedido; você cola a resposta de volta.</div>
        </button>
      </div>`);
    return;
  }
  const podeEquipe = podeGerirConteudo() && !state.modoAluno;
  const a = st.analise;
  abrirModal(`
    ${cabecalhoJanela("Trazer um baralho de uma IA")}
    <p class="text-sm muted">1. Diga o que quer; 2. copie o pedido e cole numa IA (ChatGPT, Claude, Gemini…) — se tiver resumo, aula ou PDF seu, anexe na conversa; 3. traga a resposta de volta e confira.</p>
    <div class="grid grid-2 mt-2">
      <div class="field" style="margin-bottom:0"><label class="label">Assunto dos cartões</label>
        <select class="select" id="baralhoAssunto" onchange="guardarCamposBaralhoIA(); desenharAdicionarBaralho()">
          <option value="">Deixar a IA escolher o assunto de cada cartão</option>
          ${opcoesDeAssuntoAgrupadas(st.assuntoId)}
        </select></div>
      <div class="field" style="margin-bottom:0"><label class="label">Quantos cartões</label>
        <input class="input" id="baralhoQtd" type="number" min="5" max="80" value="${st.quantidade}" onchange="guardarCamposBaralhoIA(); desenharAdicionarBaralho()"></div>
    </div>
    <div class="field mt-2"><label class="label">Tema ou pedido (opcional)</label>
      <textarea class="textarea" id="baralhoTema" style="min-height:60px" placeholder="Ex.: critérios diagnósticos e condutas de insuficiência cardíaca; ou: cartões do material que vou anexar" onchange="guardarCamposBaralhoIA(); desenharAdicionarBaralho()">${escapeHtml(st.tema)}</textarea></div>
    <div class="flex gap-1" style="flex-wrap:wrap">
      <button class="btn btn-primary btn-sm" onclick="guardarCamposBaralhoIA(); copiarTexto(promptBaralhoIA(), 'Pedido copiado. Cole numa IA e traga a resposta para o campo abaixo.')">${iconeSvg("clipboard")} Copiar o pedido para a IA</button>
    </div>
    <details class="mt-1"><summary class="text-xs muted" style="cursor:pointer">Ver o pedido</summary>
      <textarea class="textarea textarea-mono mt-1" readonly style="min-height:140px">${escapeHtml(promptBaralhoIA())}</textarea></details>
    <div class="field mt-2"><label class="label">Resposta da IA</label>
      <textarea class="textarea textarea-mono" id="baralhoTexto" style="min-height:130px" placeholder="FRENTE: ...&#10;VERSO: ...&#10;---">${escapeHtml(st.texto)}</textarea></div>
    ${podeEquipe ? `<label class="checkbox-row mb-1 text-sm"><input type="checkbox" id="baralhoPessoal" ${st.pessoal?"checked":""} onchange="guardarCamposBaralhoIA(); desenharAdicionarBaralho()"> Só para mim (desmarque para publicar no baralho da equipe)</label>` : ""}
    ${(!podeEquipe || st.pessoal) && !getGrupoDoUsuario(usuarioAtual()).oficial ? `<label class="checkbox-row mb-1 text-sm"><input type="checkbox" id="baralhoGrupo" ${st.compartilhar?"checked":""} onchange="guardarCamposBaralhoIA()"> Compartilhar com o meu grupo (${escapeHtml(getGrupoDoUsuario(usuarioAtual()).nome)}) — os colegas recebem estes cartões no baralho deles</label>` : ""}
    <div class="flex gap-1 mt-1" style="flex-wrap:wrap">
      <button class="btn btn-secondary btn-sm" onclick="conferirBaralhoIA()">Conferir</button>
      ${a && a.validos.length ? `<button class="btn btn-primary btn-sm" onclick="adicionarBaralhoIA()">Adicionar ${a.validos.length} cartão(ões)</button>` : ""}
      <button class="btn btn-ghost btn-sm" onclick="mudarPassoBaralhoIA('escolha')">Voltar</button>
    </div>
    ${a ? `<div class="card-flat mt-2 text-sm">
      <strong>${a.validos.length}</strong> cartão(ões) prontos${a.problemas.length?`, <strong style="color:var(--danger)">${a.problemas.length}</strong> com problema (ficam de fora)`:""}.
      ${a.problemas.length ? `<ul class="text-xs mt-1">${a.problemas.slice(0,10).map(p=>`<li>${escapeHtml(p)}</li>`).join("")}</ul>` : ""}
      ${a.validos.length ? `<div class="table-wrap mt-1" style="max-height:200px;overflow:auto"><table><thead><tr><th>Assunto</th><th>Frente</th><th>Verso</th></tr></thead><tbody>${a.validos.slice(0,8).map(c=>`<tr><td class="text-xs">${escapeHtml(nomeAssunto(c.assuntoId))}</td><td class="text-xs">${escapeHtml(c.frente)}</td><td class="text-xs">${escapeHtml(c.verso)}</td></tr>`).join("")}</tbody></table></div>${a.validos.length>8?`<div class="text-xs muted">… e mais ${a.validos.length-8}.</div>`:""}` : ""}
    </div>` : ""}`, "lg");
}
/* O pedido para a IA. Se a pessoa fixou um assunto, o cartão não precisa dizer
   qual é; se deixou para a IA, a lista de códigos vai junto — é o que impede a
   IA de inventar assunto que a plataforma não conhece. */
function promptBaralhoIA(){
  const st = estadoBaralhoIA();
  const fixo = st.assuntoId ? getAssunto(st.assuntoId) : null;
  const listaAssuntos = db.taxonomia.areas.map(area => area.nome + ":\n" + db.taxonomia.especialidades.filter(e => e.areaId === area.id).map(e =>
    "  " + e.nome + ": " + db.taxonomia.assuntos.filter(a => a.especialidadeId === e.id).map(a => a.id + " = " + a.nome).join("; ")).join("\n")).join("\n");
  return "Você vai escrever um BARALHO de " + st.quantidade + " FLASHCARDS para estudantes de medicina que se preparam para a prova de residência médica no Brasil.\n\n" +
    "TEMA: " + (st.tema.trim() || (fixo ? fixo.nome : "o material que anexei a esta conversa (se não houver anexo, escolha os pontos que mais caem em prova do assunto)")) + "\n" +
    (fixo ? "ASSUNTO: " + fixo.nome + " (todos os cartões são deste assunto; não precisa escrever a linha ASSUNTO)\n" : "") +
    "\nCOMO É UM BOM CARTÃO:\n" +
    "- FRENTE: uma pergunta curta e específica, com UMA resposta (nada de \"fale sobre...\").\n" +
    "- VERSO: a resposta direta em 1 a 3 frases, com o dado que a prova cobra (critério, dose, conduta, ponto de corte, achado clássico) e, quando couber, o porquê.\n" +
    "- Cada cartão cobre um ponto DIFERENTE; sem cartões repetidos ou quase iguais.\n" +
    "- Português do Brasil; medicamentos pela DCB.\n\n" +
    "REGRAS DE CONTEÚDO:\n" +
    "- Escreva com as suas palavras; não copie material de cursinho, banco de questões comercial ou apostila. Se eu anexei um material meu, use-o como base.\n" +
    "- Baseie-se em diretrizes, consensos e protocolos oficiais. Na linha FONTE, diga qual (nome e ano); se não tiver certeza, escreva \"a conferir\" — nunca invente.\n\n" +
    (fixo ? "" : "ASSUNTOS (use no campo ASSUNTO o CÓDIGO exatamente como está, escolhendo o que melhor cabe em cada cartão):\n" + listaAssuntos + "\n\n") +
    "FORMATO (exatamente assim, um bloco por cartão, separados por uma linha com ---):\n" +
    (fixo ? "" : "ASSUNTO: [código do assunto]\n") +
    "FRENTE: [pergunta]\nVERSO: [resposta]\nFONTE: [diretriz/consenso e ano]\n---\n\n" +
    "Responda só com os blocos, sem introdução nem comentários.";
}
function analisarBaralhoTrazido(texto, assuntoPadraoId, daEquipe){
  const idsDeAssunto = new Set(db.taxonomia.assuntos.map(a => a.id));
  const porNome = {}; db.taxonomia.assuntos.forEach(a => { porNome[normalizarFrente(a.nome)] = a.id; });
  const u = usuarioAtual();
  const existentes = new Set([...flashcardsDaEquipe(), ...(daEquipe ? [] : meusFlashcards(u.id))].map(c => normalizarFrente(c.frente)));
  const vistos = new Set(), validos = [], problemas = [];
  const blocos = blocosDeCartoes(texto);
  blocos.forEach((b, i) => {
    const n = "Cartão " + (i + 1);
    if(!b.frente || !b.verso){ problemas.push(n + ": falta FRENTE ou VERSO."); return; }
    // o assunto que a IA disse vale se a plataforma o conhece (código ou nome); senão, o escolhido na janela
    const dito = idsDeAssunto.has(b.assunto) ? b.assunto : porNome[normalizarFrente(b.assunto)];
    const assuntoId = assuntoPadraoId || dito || "";
    if(!assuntoId){ problemas.push(n + ": sem assunto reconhecido — escolha um assunto na janela."); return; }
    const chave = normalizarFrente(b.frente);
    if(existentes.has(chave)){ problemas.push(n + ": já existe um cartão com esta frente."); return; }
    if(vistos.has(chave)){ problemas.push(n + ": repetido dentro do próprio baralho."); return; }
    vistos.add(chave);
    validos.push({ assuntoId, frente: b.frente, verso: b.verso, fonte: b.fonte });
  });
  if(!blocos.length) problemas.push("Nenhum cartão encontrado. Cada um começa com FRENTE: e VERSO: e termina numa linha com ---.");
  return { validos, problemas };
}
function conferirBaralhoIA(){
  const st = guardarCamposBaralhoIA();
  const equipe = podeGerirConteudo() && !state.modoAluno && !st.pessoal;
  st.analise = analisarBaralhoTrazido(st.texto, st.assuntoId, equipe);
  desenharAdicionarBaralho();
}
function adicionarBaralhoIA(){
  const st = guardarCamposBaralhoIA();
  const equipe = podeGerirConteudo() && !state.modoAluno && !st.pessoal;
  // reconfere na hora de adicionar: o que foi colado pode ter mudado desde o "Conferir"
  const a = analisarBaralhoTrazido(st.texto, st.assuntoId, equipe);
  if(!a.validos.length){ st.analise = a; desenharAdicionarBaralho(); return; }
  const u = usuarioAtual();
  if(!db.flashcards) db.flashcards = [];
  a.validos.forEach(c => {
    const cartao = {
      id: uid("fc"), assuntoId: c.assuntoId, frente: c.frente, verso: c.verso, fonte: c.fonte || "",
      origem: equipe ? "autoral" : "aluno", usuarioId: equipe ? null : u.id,
      status: "ativo", criadoPor: u.id, criadoEm: hojeISO(),
    };
    if(equipe) cartao.revisao = "pendente";
    else if(st.compartilhar && !getGrupoDoUsuario(u).oficial) cartao.grupoId = getGrupoDoUsuario(u).id;
    db.flashcards.push(cartao);
    if(cartao.usuarioId) nuvemRegistrar({cartaoPessoal: cartao});
  });
  saveState();
  state.filtroRota.baralhoIA = null;
  fecharModal();
  toast(a.validos.length + " cartão(ões) adicionados" + (equipe ? " ao baralho da equipe." : st.compartilhar ? " ao seu baralho e ao do seu grupo." : " ao seu baralho. Entram na sua próxima revisão rápida."));
  render();
}
