/* Esc — codigo/12-importacao-e-central.js  (parte 12 de 13)
   Importar/enviar questões e a Central de Provas.
   Os arquivos de codigo/ são carregados em ordem pelo index.html (lista
   ESC_ARQUIVOS.codigo) e dividem o mesmo espaço: uma função escrita num
   arquivo é usada nos outros sem import. */

/* ==========================================================================
   26. IMPORTAR / ENVIAR QUESTÕES EM LOTE
   ==========================================================================
   Aberta para admin, professor, residente e aluno — o que muda é o DESTINO
   das questões (banco geral, fila de aprovação, ou o grupo do aluno).
   Dois modos de prompt:
   - "Prova inteira": instituição e ano são informados UMA vez, no começo,
     e não se repetem questão a questão.
   - "Questões avulsas": cada questão traz a própria instituição e ano. */
function contextoImportacao(){
  if(!state.filtroRota.importacao){
    state.filtroRota.importacao = { modo:"prova", instituicao:CONFIG.bancaFoco, ano:String(new Date().getFullYear()) };
  }
  return state.filtroRota.importacao;
}
function mudarModoImportacao(modo){ contextoImportacao().modo = modo; sincronizarCabecalhoImportacao(); render(); }
function sincronizarCabecalhoImportacao(){
  const ctx = contextoImportacao();
  const inst = document.getElementById("impInstituicao");
  const ano = document.getElementById("impAno");
  if(inst) ctx.instituicao = inst.value.trim() || CONFIG.bancaFoco;
  if(ano) ctx.ano = (ano.value||"").trim();
}
function atualizarPromptImportacao(){
  sincronizarCabecalhoImportacao();
  const area = document.getElementById("promptImportacaoTexto");
  if(area) area.value = gerarPromptImportacao();
}
/* As duas regras de conteúdo — o que PODE ser copiado (enunciado oficial de
   prova pública) e o que NUNCA pode (a explicação de terceiros) — valem para
   todo caminho de importação: prova inteira, questões avulsas e os lotes da
   Central de Provas. Por isso moram numa função só: mudar a política aqui
   muda o prompt de todas as telas de uma vez, sem risco de uma ficar para
   trás com a regra antiga. */
function regrasDeConteudoImportacao(){
  return "REGRA SOBRE O ENUNCIADO (pode copiar):\n"+
  "- O enunciado, as alternativas e o gabarito oficial de uma prova pública (ex.: USP-SP, USP-RP, UNIFESP, Santa Casa de São Paulo, IAMSPE, UNESP) são domínio público. Transcreva-os na íntegra, sem parafrasear.\n\n"+
  "REGRAS SOBRE A EXPLICAÇÃO (importante — isto NÃO pode ser copiado):\n"+
  "- NÃO copie, reescreva ou resuma resoluções de sites de questões, bancos de questões comerciais, cursinhos (Medway, Estratégia MED etc.) ou apostilas. Esse material é propriedade intelectual de terceiros e frequentemente está desatualizado ou errado.\n"+
  "- Baseie a explicação em fontes primárias e oficiais: diretrizes e consensos de sociedades de especialidade, protocolos e PCDT do Ministério da Saúde, manuais de sociedades internacionais reconhecidas, revisões sistemáticas e artigos originais.\n"+
  "- Cite essas fontes no campo REFERENCIAS, com nome e ano. Se não tiver certeza da referência, escreva que não tem certeza em vez de inventar nome, ano ou número de estudo.\n"+
  "- Se a evidência for conflitante ou o gabarito oficial parecer discutível, diga isso na explicação em vez de forçar uma justificativa.\n\n"+
  "O QUE A EXPLICAÇÃO PRECISA TER (as duas metades, sempre):\n"+
  "- Primeiro: por que a alternativa do gabarito está certa.\n"+
  "- Depois: por que CADA uma das outras está errada, uma por uma, na ordem (A, B, C...), começando pelo que o PRÓPRIO ENUNCIADO diz — o dado do caso que a descarta (idade, sexo, tempo de evolução, sinal ou sintoma presente ou ausente, achado do exame físico, resultado de exame, comorbidade, medicação em uso, contexto epidemiológico). Dizer apenas \"não é a conduta indicada\" não serve: o aluno precisa saber ONDE, no caso, a alternativa morre.\n"+
  "- Quando uma alternativa estiver errada por conhecimento que não vem do caso (dose errada, conduta inexistente, conceito trocado), diga isso explicitamente em vez de inventar uma pista no enunciado.\n"+
  "- Escreva isso em texto corrido, numa linha só (o campo EXPLICACAO não aceita quebra de linha).\n\n";
}
function gerarPromptImportacao(){
  const ctx = contextoImportacao();
  const areas = db.taxonomia.areas.map(a=>a.nome).join(" / ");
  const formatoQuestao =
    "PERGUNTA: [enunciado completo da questão, incluindo o caso clínico se houver]\n"+
    "A: [texto da alternativa A]\nB: [texto da alternativa B]\nC: [texto da alternativa C]\nD: [texto da alternativa D]\nE: [texto da alternativa E]\n"+
    "GABARITO: [letra correta, de A a E]\n"+
    "EXPLICACAO: [explicação clínica objetiva, escrita com suas próprias palavras: por que a alternativa do gabarito está certa e, em seguida, por que cada uma das outras está errada, apontando no enunciado o dado que descarta cada uma — tudo em texto corrido, sem quebra de linha]\n"+
    "REFERENCIAS: [as fontes que sustentam a explicação: diretriz/consenso de sociedade de especialidade, protocolo do Ministério da Saúde, PCDT, revisão sistemática ou artigo primário, com nome e ano]\n"+
    "IMAGEM: [endereço (URL) da imagem da questão — ECG, radiografia, fundo de olho, foto de lesão. Deixe em branco se a questão não tiver imagem]\n"+
    "LEGENDA: [legenda curta da imagem, se houver]\n"+
    "AREA: [uma destas opções, exatamente: "+areas+"]\n"+
    "ESPECIALIDADE: [ex.: Cardiologia, Pneumologia...]\n"+
    "ASSUNTO: [assunto específico, ex.: Síndrome coronariana aguda]\n"+
    "DIFICULDADE: [fundamental, intermediario ou avancado]\n";

  if(ctx.modo === "prova"){
    return "Você vai transcrever uma PROVA INTEIRA de residência médica para um formato de texto específico.\n\n"+
    "IMPORTANTE: a prova inteira é da MESMA instituição e do MESMO ano. Portanto, informe a instituição e o ano UMA ÚNICA VEZ, num cabeçalho no começo da resposta, e NÃO repita esses dados em cada questão.\n\n"+
    "Comece a resposta exatamente assim (sem nada antes):\n\n"+
    "INSTITUICAO: "+(ctx.instituicao||CONFIG.bancaFoco)+"\n"+
    "ANO: "+(ctx.ano||new Date().getFullYear())+"\n"+
    "===\n\n"+
    "Em seguida, para CADA questão da prova, na ordem em que aparecem, gere um bloco EXATAMENTE neste formato, sem markdown, sem numeração extra, sem comentários seus:\n\n"+
    "NUMERO: [número da questão na prova]\n"+
    formatoQuestao+
    "\n"+regrasDeConteudoImportacao()+
  "Regras de formato:\n"+
    "- Separe cada questão com uma linha contendo apenas: ===\n"+
    "- NÃO repita INSTITUICAO nem ANO dentro das questões (isso já está no cabeçalho).\n"+
    "- Transcreva o enunciado na íntegra, sem resumir e sem corrigir o texto original da prova.\n"+
    "- Se a questão tiver sido anulada pela banca, acrescente a linha: STATUS: anulada\n"+
    "- Se a prova tiver menos de 5 alternativas por questão, repita a última letra existente e deixe as demais vazias apenas se for inevitável; o ideal é manter exatamente as alternativas originais.\n"+
    "- Se você não tiver certeza do gabarito oficial, escreva GABARITO: ? e explique a dúvida no campo EXPLICACAO, em vez de inventar.\n\n"+
    "Aqui está a prova (colo o texto abaixo ou anexo o PDF/imagem):\n[COLE AQUI O TEXTO DA PROVA OU ANEXE O ARQUIVO]";
  }
  return "Você vai me ajudar a transcrever questões avulsas de provas de residência médica para um formato de texto específico.\n\n"+
  "Para CADA questão que eu enviar (vou colar o texto, ou anexar um PDF/imagem), gere um bloco EXATAMENTE neste formato, sem nenhum texto antes ou depois, sem markdown, sem numeração extra:\n\n"+
  formatoQuestao+
  "INSTITUICAO: [nome da instituição da prova, ex.: "+CONFIG.bancaFoco+"]\nANO: [ano da prova]\n\n"+
  regrasDeConteudoImportacao()+
  "Separe cada questão com uma linha contendo apenas: ===\n\n"+
  "Aqui está(ão) a(s) questão(ões) para transcrever:\n[COLE AQUI O TEXTO OU DESCREVA O ARQUIVO ANEXADO]";
}
function opcoesDestinoImportacao(){
  const u = usuarioAtual();
  if(u.papel==="aluno") return [
    ["grupo","Questões do meu grupo (ficam disponíveis na hora, só para o grupo)"],
    ["sugerir","Sugerir para o banco geral (passa por aprovação de um professor)"],
  ];
  if(u.papel==="residente") return [
    ["sugerir","Enviar para o banco geral (passa por aprovação de um professor)"],
    ["ativa","Publicar direto no banco geral"],
  ];
  return [
    ["ativa","Publicar direto no banco geral"],
    ["sugerir","Deixar pendente de revisão antes de publicar"],
  ];
}
function renderImportarQuestoes(){
  const u = usuarioAtual();
  const ctx = contextoImportacao();
  const destinos = opcoesDestinoImportacao();
  const meuGrupo = u.papel==="aluno" ? getGrupoDoUsuario(u) : null;
  return `
  <div class="page-header"><h2>${u.papel==="aluno"||u.papel==="residente"?"Enviar Provas e Questões":"Importar Questões"}</h2>
  <p>Cole uma prova inteira ou questões avulsas — por exemplo, já formatadas por uma IA a partir do PDF da prova — para adicionar ao banco em lote.</p></div>
${podeUsarCentralProvas(u) ? `<div class="card-flat mb-2 text-sm">
    ${iconeSvg("archive")} <strong>Vai subir uma prova inteira, de 60 ou 100 questões?</strong> A <button class="link-btn" onclick="navigate('central-provas')">Central de Provas</button> corta a prova em lotes, dá um modelo pronto para cada faixa de questões e guarda o que já chegou — é o caminho para fazer a prova em pedaços, em mais de uma conversa ao mesmo tempo, sem perder a conta.
    <div class="text-xs muted mt-1">Esta tela aqui continua sendo a certa para questões avulsas e para uma prova pequena que sai de uma vez só.</div>
  </div>` : ""}

  <div class="card mb-2">
    <div class="card-title">Passo 1 — identifique a prova</div>
    <p class="text-sm muted">No modo "prova inteira", a instituição e o ano valem para todas as questões e são informados só aqui — não é preciso repetir questão a questão.</p>
    <div class="tabs mt-2" style="margin-bottom:1rem">
      <div class="tab ${ctx.modo==="prova"?"active":""}" onclick="mudarModoImportacao('prova')">Prova inteira (mesma instituição e ano)</div>
      <div class="tab ${ctx.modo==="avulsas"?"active":""}" onclick="mudarModoImportacao('avulsas')">Questões avulsas</div>
    </div>
    <div class="grid grid-3">
      <div class="field" style="margin-bottom:0"><label class="label">Instituição da prova</label>
        <input class="input" id="impInstituicao" list="listaBancasImport" value="${escapeHtml(ctx.instituicao||CONFIG.bancaFoco)}" onchange="atualizarPromptImportacao()" ${ctx.modo==="avulsas"?'placeholder="usada só quando a questão não trouxer a própria"':""}>
        <datalist id="listaBancasImport">${[...new Set([...CONFIG.instituicoesReferencia, ...db.questoes.map(q=>q.banca)])].map(b=>`<option value="${escapeHtml(b)}"></option>`).join("")}</datalist>
      </div>
      <div class="field" style="margin-bottom:0"><label class="label">Ano da prova</label>
        <input class="input" type="number" id="impAno" value="${escapeHtml(String(ctx.ano||new Date().getFullYear()))}" onchange="atualizarPromptImportacao()">
      </div>
      <div class="field" style="margin-bottom:0"><label class="label">Destino das questões</label>
        <select class="select" id="impDestino">${destinos.map(([v,l])=>`<option value="${v}">${escapeHtml(l)}</option>`).join("")}</select>
        ${meuGrupo ? `<div class="hint mt-1">Seu grupo atual: ${escapeHtml(meuGrupo.nome)}</div>` : ""}
      </div>
    </div>
  </div>

  <div class="card mb-2">
    <div class="card-title">Passo 2 — peça a uma IA para formatar</div>
    <p class="text-sm muted">Copie o prompt abaixo (pode revisar antes), cole numa IA junto com o PDF/texto da prova, e traga o resultado para o Passo 3.</p>
    <div class="field mt-1"><textarea class="textarea textarea-mono" id="promptImportacaoTexto" style="min-height:170px">${escapeHtml(gerarPromptImportacao())}</textarea></div>
    <div class="flex gap-1" style="flex-wrap:wrap">
      <button class="btn btn-secondary btn-sm" onclick="copiarTexto(document.getElementById('promptImportacaoTexto').value,'Prompt copiado! Cole numa IA junto com a prova.')">${iconeSvg("search")} Copiar prompt</button>
      <button class="btn btn-ghost btn-sm" onclick="atualizarPromptImportacao()">${iconeSvg("refresh")} Atualizar prompt com instituição/ano acima</button>
    </div>
  </div>

  <div class="card">
    <div class="card-title">Passo 3 — cole aqui o texto formatado</div>
    <p class="text-sm muted mb-1">Pode colar junto o cabeçalho com INSTITUICAO e ANO: ele é lido uma vez e aplicado a todas as questões.</p>
    <textarea class="textarea textarea-mono" id="textoImportacao" style="min-height:200px" placeholder="INSTITUICAO: ${escapeHtml(ctx.instituicao||CONFIG.bancaFoco)}
ANO: ${escapeHtml(String(ctx.ano||""))}
===
PERGUNTA: ...
A: ...
B: ...
GABARITO: B
==="></textarea>
    <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
      <button class="btn btn-primary" onclick="previsualizarImportacao()">Pré-visualizar</button>
      <label class="btn btn-secondary" style="cursor:pointer">${iconeSvg("upload")} Carregar arquivo .txt<input type="file" accept=".txt,.md,.csv" style="display:none" onchange="carregarArquivoImportacao(this)"></label>
    </div>
  </div>
  <div id="previewImportacao" class="mt-2"></div>`;
}
function carregarArquivoImportacao(input){
  const arq = input.files && input.files[0]; if(!arq) return;
  const leitor = new FileReader();
  leitor.onload = e => { document.getElementById("textoImportacao").value = e.target.result; toast("Arquivo carregado. Confira e clique em Pré-visualizar."); };
  leitor.readAsText(arq);
}
/* ---------- leitura do texto colado ---------- */
/* `padroes` é opcional: quem chama de fora da tela de Importar Questões (a
   Central de Provas, por exemplo) passa a instituição e o ano da prova em vez
   de depender do que está digitado naquela tela. */
function parseImportText(texto, padroes){
  const rotulos = ["NUMERO","PERGUNTA","A","B","C","D","E","GABARITO","EXPLICACAO","REFERENCIAS","IMAGEM","LEGENDA","AREA","ESPECIALIDADE","ASSUNTO","BANCA","INSTITUICAO","ANO","DIFICULDADE","STATUS"];
  const ctx = padroes || contextoImportacao();
  const blocosBrutos = texto.split(/\n\s*===\s*\n?/).map(b=>b.trim()).filter(Boolean);
  const blocos = blocosBrutos.length ? blocosBrutos : [texto.trim()];
  const lerCampos = (bloco)=>{
    const campos = {}; let campoAtual = null;
    bloco.split(/\r?\n/).forEach(linha=>{
      const m = linha.match(/^([A-Za-zÇÃÕçãõ]+)\s*:\s*(.*)$/);
      const rotulo = m ? rotulos.find(r=>r.toLowerCase()===m[1].trim().toLowerCase()) : null;
      if(rotulo){ campoAtual = rotulo; campos[campoAtual] = (m[2]||"").trim(); }
      else if(campoAtual){ campos[campoAtual] += "\n"+linha; }
    });
    return campos;
  };
  // 1) cabeçalho da prova: primeiro bloco sem PERGUNTA, só com instituição/ano
  let cabecalho = {};
  let inicio = 0;
  const primeiro = lerCampos(blocos[0]||"");
  if(!primeiro.PERGUNTA && (primeiro.INSTITUICAO || primeiro.BANCA || primeiro.ANO)){
    cabecalho = primeiro; inicio = 1;
  }
  const instituicaoProva = (cabecalho.INSTITUICAO || cabecalho.BANCA || ctx.instituicao || CONFIG.bancaFoco).trim();
  const anoProva = parseInt(cabecalho.ANO || ctx.ano) || new Date().getFullYear();

  const assinaturasDoLote = {};
  return blocos.slice(inicio).map((bloco, idx)=>{
    const campos = lerCampos(bloco);
    const erros = [];
    if(!campos.PERGUNTA) erros.push("faltando PERGUNTA");
    // E é opcional: várias bancas (ex.: UNIFESP-EPM) usam só 4 alternativas.
    ["A","B","C","D"].forEach(l=>{ if(!campos[l]) erros.push("faltando alternativa "+l); });
    const gab = (campos.GABARITO||"").trim().toUpperCase();
    if(!["A","B","C","D","E"].includes(gab)) erros.push("GABARITO ausente ou inválido"+(gab==="?"?" (a IA marcou dúvida — confira o gabarito oficial)":""));

    // taxonomia: não é mais erro bloqueante — vira sugestão editável na tela
    const areaEncontrada = db.taxonomia.areas.find(a=>a.nome.toLowerCase()===((campos.AREA||"").trim().toLowerCase()));
    const areaId = areaEncontrada ? areaEncontrada.id : db.taxonomia.areas[0].id;
    const espEncontrada = db.taxonomia.especialidades.find(e=>e.areaId===areaId && e.nome.toLowerCase()===((campos.ESPECIALIDADE||"").trim().toLowerCase()));
    const espId = espEncontrada ? espEncontrada.id : "__novo__";
    const assEncontrado = espEncontrada ? db.taxonomia.assuntos.find(a=>a.especialidadeId===espEncontrada.id && a.nome.toLowerCase()===((campos.ASSUNTO||"").trim().toLowerCase())) : null;
    const assId = assEncontrado ? assEncontrado.id : "__novo__";
    const avisos = [];
    if(!areaEncontrada && (campos.AREA||"").trim()) avisos.push('grande área "'+campos.AREA.trim()+'" não existe na plataforma');
    if(!espEncontrada) avisos.push('especialidade "'+((campos.ESPECIALIDADE||"").trim()||"(vazia)")+'" não encontrada');
    if(!assEncontrado) avisos.push('assunto "'+((campos.ASSUNTO||"").trim()||"(vazio)")+'" não encontrado');

    // duplicidade: contra o banco atual e contra o próprio lote colado
    const duplicadasBanco = campos.PERGUNTA ? questoesDuplicadasDe(campos.PERGUNTA) : [];
    const assinatura = campos.PERGUNTA ? assinaturaEnunciado(campos.PERGUNTA) : "";
    const duplicadaNoLote = assinatura && assinaturasDoLote[assinatura] ? assinaturasDoLote[assinatura] : null;
    if(assinatura && !assinaturasDoLote[assinatura]) assinaturasDoLote[assinatura] = idx+1;
    const duplicada = duplicadasBanco.length>0 || !!duplicadaNoLote;

    return {
      indice: idx+1, campos, erros, avisos, valido: erros.length===0,
      // número da questão na prova original, quando a linha NUMERO vier
      // preenchida: é o que permite conferir se um lote chegou completo
      numero: parseInt(campos.NUMERO) || null,
      duplicada, duplicadasBanco: duplicadasBanco.map(q=>q.id), duplicadaNoLote,
      importar: !duplicada,
      referencias: (campos.REFERENCIAS||"").trim(),
      imagemUrl: (campos.IMAGEM||"").trim(),
      imagemLegenda: (campos.LEGENDA||"").trim(),
      areaId, especialidadeId: espId, assuntoId: assId,
      banca: (campos.INSTITUICAO || campos.BANCA || instituicaoProva).trim(),
      ano: parseInt(campos.ANO) || anoProva,
      status: ((campos.STATUS||"").trim().toLowerCase()==="anulada") ? "anulada" : null,
    };
  });
}
function previsualizarImportacao(){
  sincronizarCabecalhoImportacao();
  const texto = document.getElementById("textoImportacao").value;
  if(!texto.trim()){ toast("Cole o texto das questões primeiro.", "err"); return; }
  const resultado = parseImportText(texto);
  state.filtroRota.previewImportacao = resultado;
  state.filtroRota.destinoImportacao = document.getElementById("impDestino").value;
  document.getElementById("previewImportacao").innerHTML = renderPreviewImportacaoHtml(resultado);
}
/* ---------- selects de taxonomia da pré-visualização ----------
   Quando a IA manda uma especialidade/assunto que não existe (ou não manda
   nada), a pessoa escolhe aqui um equivalente da lista OU cria um novo com
   o nome sugerido, sem precisar sair da tela. */
function htmlOpcoesEspecialidade(areaId, selecionadoId, nomeSugerido){
  const esps = db.taxonomia.especialidades.filter(e=>e.areaId===areaId);
  let html = esps.map(e=>`<option value="${e.id}" ${selecionadoId===e.id?"selected":""}>${escapeHtml(e.nome)}</option>`).join("");
  const nome = (nomeSugerido||"").trim();
  html += `<option value="__novo__" ${selecionadoId==="__novo__"?"selected":""}>+ criar especialidade${nome?' "'+escapeHtml(nome)+'"':""}</option>`;
  return html;
}
function htmlOpcoesAssunto(especialidadeId, selecionadoId, nomeSugerido){
  const assuntos = especialidadeId==="__novo__" ? [] : db.taxonomia.assuntos.filter(a=>a.especialidadeId===especialidadeId);
  let html = assuntos.map(a=>`<option value="${a.id}" ${selecionadoId===a.id?"selected":""}>${escapeHtml(a.nome)}</option>`).join("");
  const nome = (nomeSugerido||"").trim();
  html += `<option value="__novo__" ${selecionadoId==="__novo__"?"selected":""}>+ criar assunto${nome?' "'+escapeHtml(nome)+'"':""}</option>`;
  return html;
}
function impMudarArea(i){
  const r = state.filtroRota.previewImportacao[i];
  r.areaId = document.getElementById("impArea-"+i).value;
  document.getElementById("impEsp-"+i).innerHTML = htmlOpcoesEspecialidade(r.areaId, null, r.campos.ESPECIALIDADE);
  impMudarEsp(i);
}
function impMudarEsp(i){
  const r = state.filtroRota.previewImportacao[i];
  r.especialidadeId = document.getElementById("impEsp-"+i).value;
  const selAss = document.getElementById("impAss-"+i);
  selAss.innerHTML = htmlOpcoesAssunto(r.especialidadeId, null, r.campos.ASSUNTO);
  r.assuntoId = selAss.value;
}
function impMudarAssunto(i){ state.filtroRota.previewImportacao[i].assuntoId = document.getElementById("impAss-"+i).value; }
function alternarImportacaoItem(i){
  const r = state.filtroRota.previewImportacao[i];
  r.importar = !r.importar;
  document.getElementById("previewImportacao").innerHTML = renderPreviewImportacaoHtml(state.filtroRota.previewImportacao);
}
/* `opts.aoConfirmar` e `opts.rotulo` trocam só o botão do final: a tela de
   Importar Questões manda para o banco, a Central de Provas publica o lote e
   marca a faixa como concluída. O miolo (classificação, duplicidade, avisos)
   é exatamente o mesmo nos dois lugares. */
function renderPreviewImportacaoHtml(resultado, opts){
  opts = opts || {};
  const validas = resultado.filter(r=>r.valido && r.importar!==false).length;
  const duplicadas = resultado.filter(r=>r.duplicada).length;
  return `<div class="card">
    <div class="card-title">Pré-visualização: ${validas} de ${resultado.length} questão(ões) marcadas para importar</div>
    <p class="text-sm muted mb-2">Confira a classificação de cada questão. Onde a IA não acertou a especialidade ou o assunto, escolha um equivalente da lista ou crie um novo com o nome sugerido.</p>
    ${duplicadas ? `<div class="card-flat mb-2 text-sm" style="border-color:var(--amber)">${iconeSvg("alert")} <strong>${duplicadas} questão(ões) já existem</strong> no banco ou se repetem dentro deste mesmo lote. Elas vêm desmarcadas — marque manualmente se quiser importar assim mesmo.</div>` : ""}
    ${resultado.map((r,i)=>`<div class="card-flat mb-1" ${r.valido?"":'style="border-color:var(--danger)"'}>
      <div class="flex justify-between items-center" style="flex-wrap:wrap;gap:.4rem">
        <span style="font-weight:600">Questão ${r.indice} · ${escapeHtml(r.banca)} ${r.ano}${r.status==="anulada"?" · anulada":""}</span>
        <span class="flex items-center gap-1">
          ${r.numero?`<span class="badge badge-muted">nº ${r.numero} na prova</span>`:""}
          ${r.duplicada?`<span class="badge badge-amber" title="${r.duplicadaNoLote?"repetida dentro do texto colado":"já existe no banco"}">duplicada${r.duplicadaNoLote?" (igual à nº "+r.duplicadaNoLote+")":""}</span>`:""}
          ${r.imagemUrl?'<span class="badge badge-muted">com imagem</span>':""}
          ${r.referencias?'<span class="badge badge-accent" title="'+escapeHtml(r.referencias)+'">com referência</span>':""}
          <span class="badge ${r.valido?"badge-accent":"badge-danger"}">${r.valido?"Pronta":"Com problema"}</span>
        </span>
      </div>
      ${r.valido?`<label class="checkbox-row mt-1"><input type="checkbox" ${r.importar!==false?"checked":""} onchange="alternarImportacaoItem(${i})"> Importar esta questão</label>`:""}
      ${r.duplicada && r.duplicadasBanco.length?`<div class="text-xs muted mt-1">Já no banco: <button class="link-btn" onclick="abrirQuestaoCompleta('${r.duplicadasBanco[0]}')">ver questão existente</button></div>`:""}
      <div class="text-sm mt-1">${escapeHtml((r.campos.PERGUNTA||"(sem enunciado)").slice(0,180))}…</div>
      ${r.erros.length ? `<div class="text-xs mt-1" style="color:var(--danger)">${r.erros.map(e=>escapeHtml(e)).join(" · ")}</div>` : ""}
      ${r.avisos.length ? `<div class="text-xs mt-1" style="color:var(--amber)">${iconeSvg("alert")} ${r.avisos.map(e=>escapeHtml(e)).join(" · ")}</div>` : ""}
      <div class="grid grid-3 mt-2">
        <div class="field" style="margin-bottom:0"><label class="label">Grande área</label>
          <select class="select" id="impArea-${i}" onchange="impMudarArea(${i})">${db.taxonomia.areas.map(a=>`<option value="${a.id}" ${r.areaId===a.id?"selected":""}>${escapeHtml(a.nome)}</option>`).join("")}</select></div>
        <div class="field" style="margin-bottom:0"><label class="label">Especialidade</label>
          <select class="select" id="impEsp-${i}" onchange="impMudarEsp(${i})">${htmlOpcoesEspecialidade(r.areaId, r.especialidadeId, r.campos.ESPECIALIDADE)}</select></div>
        <div class="field" style="margin-bottom:0"><label class="label">Assunto</label>
          <select class="select" id="impAss-${i}" onchange="impMudarAssunto(${i})">${htmlOpcoesAssunto(r.especialidadeId, r.assuntoId, r.campos.ASSUNTO)}</select></div>
      </div>
    </div>`).join("")}
    <button class="btn btn-primary mt-2" onclick="${opts.aoConfirmar||"confirmarImportacao()"}" ${validas===0?"disabled":""}>${escapeHtml(opts.rotulo||"Importar")} ${validas} questão(ões)</button>
  </div>`;
}
/* cria especialidade/assunto novos quando a pessoa escolheu "+ criar" */
function resolverTaxonomiaImportacao(r){
  let areaId = r.areaId || db.taxonomia.areas[0].id;
  let espId = r.especialidadeId;
  if(!espId || espId==="__novo__"){
    const nome = (r.campos.ESPECIALIDADE||"").trim() || "Outros";
    let existente = db.taxonomia.especialidades.find(e=>e.areaId===areaId && e.nome.toLowerCase()===nome.toLowerCase());
    if(!existente){ existente = {id:uid("esp"), areaId, nome}; db.taxonomia.especialidades.push(existente); }
    espId = existente.id;
  }
  let assId = r.assuntoId;
  if(!assId || assId==="__novo__"){
    const nome = (r.campos.ASSUNTO||"").trim() || (r.campos.ESPECIALIDADE||"").trim() || "Assunto geral";
    let existente = db.taxonomia.assuntos.find(a=>a.especialidadeId===espId && a.nome.toLowerCase()===nome.toLowerCase());
    if(!existente){ existente = {id:uid("ass"), especialidadeId:espId, nome}; db.taxonomia.assuntos.push(existente); }
    assId = existente.id;
  }
  return {areaId, especialidadeId:espId, assuntoId:assId};
}
/* Cria de fato, no banco, as questões já analisadas e marcadas para importar.
   Ficou separada de confirmarImportacao() porque a Central de Provas publica
   exatamente do mesmo jeito, lote a lote — e duas telas fazendo a mesma coisa
   por dois caminhos diferentes é como nasce diferença de comportamento.
   Devolve o que foi feito, para quem chamou avisar a pessoa e, no caso da
   Central de Provas, guardar os ids do lote publicado. */
function importarItensAnalisados(resultado, destino, extras){
  extras = extras || {};
  const u = usuarioAtual();
  const idsCriados = [];
  let novosAssuntos = 0;
  const antesAssuntos = db.taxonomia.assuntos.length;
  const ignoradas = resultado.filter(r=>r.valido && r.importar===false).length;
  resultado.filter(r=>r.valido && r.importar!==false).forEach(r=>{
    const c = r.campos;
    const tax = resolverTaxonomiaImportacao(r);
    const nova = {
      id: uid("q"), banca: r.banca, real: true, ano: r.ano,
      areaId: tax.areaId, especialidadeId: tax.especialidadeId, assuntoId: tax.assuntoId,
      enunciado: c.PERGUNTA.trim(),
      alternativas: ["A","B","C","D","E"].map(l=>({id:l, texto:(c[l]||"").trim()})).filter(a=>a.texto),
      gabarito: (c.GABARITO||"").trim().toUpperCase(),
      explicacaoGeral: (c.EXPLICACAO||"").trim(),
      referencias: r.referencias || "",
      imagemUrl: r.imagemUrl || "",
      imagemLegenda: r.imagemLegenda || "",
      explicacoesAlternativas: {},
      dificuldadeManual: ["fundamental","intermediario","avancado"].includes((c.DIFICULDADE||"").trim().toLowerCase()) ? c.DIFICULDADE.trim().toLowerCase() : "intermediario",
      status: r.status || (destino==="sugerir" ? "pendente" : "ativa"),
      estatisticas: {respostas:0, acertos:0, distribuicaoAlternativas:{}},
      criadoPor: u.id, criadoEm: hojeISO(),
    };
    if(destino==="grupo"){ nova.grupoId = getGrupoDoUsuario(u).id; nova.status = r.status || "ativa"; }
    // rastro da prova de origem: o número da questão no caderno original é o
    // que permite depois conferir se a prova entrou inteira ou ficou buraco
    if(r.numero) nova.numeroNaProva = r.numero;
    if(extras.faseProva) nova.faseProva = extras.faseProva;
    db.questoes.push(nova);
    idsCriados.push(nova.id);
  });
  novosAssuntos = db.taxonomia.assuntos.length - antesAssuntos;
  saveState();
  return {importadas: idsCriados.length, ignoradas, novosAssuntos, ids: idsCriados};
}
function confirmarImportacao(){
  const resultado = state.filtroRota.previewImportacao || [];
  const destino = state.filtroRota.destinoImportacao || "ativa";
  const u = usuarioAtual();
  const r = importarItensAnalisados(resultado, destino);
  state.filtroRota.previewImportacao = null;
  toast(r.importadas+" questão(ões) importada(s)"+(r.ignoradas?" · "+r.ignoradas+" duplicada(s) ignorada(s)":"")+(r.novosAssuntos?" · "+r.novosAssuntos+" assunto(s) novo(s) criado(s)":"")+
    (destino==="sugerir" ? " — aguardando aprovação de um professor." : destino==="grupo" ? " — disponíveis para o seu grupo." : "."));
  navigate(destino==="grupo" ? "meu-grupo" : (u.papel==="aluno"||u.papel==="residente") ? "inicio" : "banco-questoes");
}

/* ==========================================================================
   26-B. CENTRAL DE PROVAS — upload de uma prova em lotes separados
   ==========================================================================
   Por que esta tela existe, separada de "Importar Questões":

   Uma prova inteira (100 questões, cada uma com explicação autoral) não cabe
   numa conversa só com uma IA nem numa sessão só de trabalho. Na prática ela
   é feita aos pedaços — as questões 1 a 25 numa frente, as 26 a 50 em outra,
   muitas vezes as duas ao mesmo tempo — e aí o problema deixa de ser o
   formato do texto e passa a ser a CONTABILIDADE: que pedaço já foi feito,
   qual está pela metade, qual chegou repetido, o que ainda falta.

   A Central de Provas guarda essa contabilidade. Cada prova vira uma "carga"
   com o total de questões declarado; a carga é dividida em LOTES (faixas de
   questões) e cada lote tem três coisas:

   1. um MODELO DE CONSTRUÇÃO pronto — o prompt já com a instituição, o ano e
      a faixa daquele lote escritos dentro, para copiar e colar numa conversa;
   2. um lugar para colar de volta (ou subir um arquivo .txt) o resultado,
      conferir e guardar, sem publicar nada ainda;
   3. a publicação no banco, quando a pessoa mandar — lote a lote.

   Como cada lote é independente, dá para tocar duas (ou cinco) frentes ao
   mesmo tempo, inclusive de provas diferentes, sem perder o fio: o painel
   mostra todas as cargas abertas com o que falta em cada uma, e cada lote tem
   um campo "quem está fazendo" para separar as frentes ("conversa 1",
   "conversa 2", o nome de quem ficou com aquele pedaço).

   Detalhe de armazenamento: o texto colado fica guardado enquanto o lote não
   é publicado, e é descartado assim que vira questão no banco — senão cada
   prova ocuparia espaço duas vezes no navegador (ver limitação de tamanho do
   localStorage na tela de Configurações). */

function cargasProvas(){
  if(!db.cargasProvas) db.cargasProvas = [];
  return db.cargasProvas;
}
function getCargaProva(id){ return cargasProvas().find(c=>c.id===id) || null; }
function loteDaCarga(carga, loteId){ return (carga && (carga.lotes||[]).find(l=>l.id===loteId)) || null; }
function ctxCentralProvas(){
  if(!state.filtroRota.centralProvas) state.filtroRota.centralProvas = {cargaAberta:null, loteAberto:null};
  return state.filtroRota.centralProvas;
}
function podeUsarCentralProvas(u){
  u = u || usuarioAtual();
  return !!u && (u.papel==="residente" || podeGerirConteudo(u));
}
function nomeDaCarga(c){ return c.instituicao+" "+c.ano+(c.fase?" · "+c.fase:""); }

/* A prova é cortada em faixas fechadas de questões: 1–25, 26–50, 51–75... A
   última faixa pode ser menor, e é isso mesmo — é o resto da prova. */
function montarLotesDaCarga(total, tamanho){
  const lotes = [];
  for(let inicio=1; inicio<=total; inicio+=tamanho){
    lotes.push({
      id: uid("lote"), inicio, fim: Math.min(inicio+tamanho-1, total),
      status: "pendente",       // pendente → conferido → publicado
      responsavel: "",           // quem (ou qual conversa) está com este pedaço
      textoBruto: "", resumo: null,
      recebidoEm: null, publicadoEm: null, questaoIds: [],
    });
  }
  return lotes;
}
/* "1, 2, 3, 7, 8" vira "1–3, 7–8": lista de número solta fica ilegível quando
   falta meia prova, e o que a pessoa precisa enxergar é o buraco. */
function resumirNumeros(lista, limite){
  const nums = [...new Set(lista)].sort((a,b)=>a-b);
  if(!nums.length) return "";
  const faixas = [];
  let ini = nums[0], ant = nums[0];
  for(let i=1;i<=nums.length;i++){
    const n = nums[i];
    if(n !== ant+1){ faixas.push(ini===ant ? String(ini) : ini+"–"+ant); ini = n; }
    ant = n;
  }
  const max = limite || 12;
  return faixas.length>max ? faixas.slice(0,max).join(", ")+" … (+"+(faixas.length-max)+")" : faixas.join(", ");
}
function resumoCarga(carga){
  const lotes = carga.lotes || [];
  const publicadas = lotes.filter(l=>l.status==="publicado").reduce((s,l)=>s+((l.questaoIds||[]).length),0);
  const prontas = lotes.filter(l=>l.status==="conferido").reduce((s,l)=>s+((l.resumo && l.resumo.validas)||0),0);
  const total = carga.totalQuestoes || (publicadas+prontas) || 0;
  return {
    total, publicadas, prontas,
    faltam: Math.max(0, total - publicadas - prontas),
    lotes: lotes.length,
    pendentes: lotes.filter(l=>l.status==="pendente").length,
    conferidos: lotes.filter(l=>l.status==="conferido").length,
    publicados: lotes.filter(l=>l.status==="publicado").length,
    pctFeito: pct(publicadas+prontas, total),
    pctPublicado: pct(publicadas, total),
    concluida: lotes.length>0 && lotes.every(l=>l.status==="publicado"),
  };
}
/* Conferência contra o banco, e não contra o que a tela acha que mandou:
   olha as questões daquela instituição e ano que já estão no banco e diz
   quais números da prova continuam faltando. */
function conferenciaDaProva(carga){
  const noBanco = db.questoes.filter(q=>q.banca===carga.instituicao && q.ano===carga.ano);
  const numeros = new Set(noBanco.map(q=>q.numeroNaProva).filter(n=>n));
  const faltando = [];
  for(let n=1;n<=(carga.totalQuestoes||0);n++){ if(!numeros.has(n)) faltando.push(n); }
  return {noBanco: noBanco.length, comNumero: numeros.size, faltando};
}

/* ---------- criar / apagar uma carga ---------- */
function opcoesDestinoCarga(){
  // uma prova real nunca vai para o banco de um grupo: ela é conteúdo da
  // plataforma inteira, então esse destino não aparece aqui
  return opcoesDestinoImportacao().filter(([v])=>v!=="grupo");
}
function criarCargaProva(){
  if(!podeUsarCentralProvas()){ toast("Sua conta não tem acesso à Central de Provas.", "err"); return; }
  const valor = (id)=>{ const el = document.getElementById(id); return el ? String(el.value||"").trim() : ""; };
  const instituicao = valor("cpInstituicao") || CONFIG.bancaFoco;
  const ano = parseInt(valor("cpAno")) || new Date().getFullYear();
  const fase = valor("cpFase");
  const total = Math.max(1, Math.min(500, parseInt(valor("cpTotal")) || 100));
  const tamanho = Math.max(1, Math.min(total, parseInt(valor("cpTamanhoLote")) || 25));
  const destino = valor("cpDestino") || "ativa";
  const igual = cargasProvas().find(c=>c.instituicao.toLowerCase()===instituicao.toLowerCase() && c.ano===ano && (c.fase||"").toLowerCase()===fase.toLowerCase());
  if(igual){
    toast("Já existe uma prova aberta para "+nomeDaCarga(igual)+" — abri ela para você, em vez de criar outra igual.", "err");
    ctxCentralProvas().cargaAberta = igual.id; ctxCentralProvas().loteAberto = null; render(); return;
  }
  const carga = {
    id: uid("carga"), instituicao, ano, fase, totalQuestoes: total, tamanhoLote: tamanho, destino,
    criadoPor: usuarioAtual().id, criadoEm: hojeISO(), lotes: montarLotesDaCarga(total, tamanho),
  };
  cargasProvas().push(carga);
  saveState();
  ctxCentralProvas().cargaAberta = carga.id;
  ctxCentralProvas().loteAberto = null;
  toast("Prova criada e dividida em "+carga.lotes.length+" lote(s). Cada lote já tem o próprio modelo pronto para copiar.");
  render();
}
function confirmarExcluirCarga(cargaId){
  const carga = getCargaProva(cargaId); if(!carga) return;
  const r = resumoCarga(carga);
  abrirModal(`<div class="modal-header"><h3>Descartar o acompanhamento desta prova?</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
    <p>Isso apaga o controle de lotes de <strong>${escapeHtml(nomeDaCarga(carga))}</strong>${r.prontas?" e o texto de "+r.prontas+" questão(ões) conferida(s) e ainda não publicada(s)":""}.</p>
    <p class="text-sm muted mt-1">As ${r.publicadas} questão(ões) já publicadas no banco <strong>continuam lá</strong> — quem apaga questão do banco é a tela Banco de Questões.</p>
    <div class="flex gap-1 mt-3"><button class="btn btn-danger" onclick="excluirCargaProva('${carga.id}')">Descartar acompanhamento</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
}
function excluirCargaProva(cargaId){
  db.cargasProvas = cargasProvas().filter(c=>c.id!==cargaId);
  saveState();
  const ctx = ctxCentralProvas();
  if(ctx.cargaAberta===cargaId){ ctx.cargaAberta = null; ctx.loteAberto = null; }
  fecharModal();
  toast("Acompanhamento descartado.");
  render();
}
function abrirCargaProva(cargaId){ const ctx = ctxCentralProvas(); ctx.cargaAberta = cargaId; ctx.loteAberto = null; state.filtroRota.previewImportacao = null; render(); }
function voltarAoPainelProvas(){ const ctx = ctxCentralProvas(); ctx.cargaAberta = null; ctx.loteAberto = null; state.filtroRota.previewImportacao = null; render(); }

/* ---------- o modelo de construção de cada lote ----------
   É o prompt pronto: a mesma política de conteúdo do resto da plataforma,
   mais a faixa de questões daquele lote escrita por extenso e a conferência
   que a própria IA deve fazer antes de responder. Quem for tocar duas
   frentes ao mesmo tempo copia um modelo em cada conversa e não precisa
   lembrar de nada: a faixa já está dentro do texto. */
function modeloConstrucaoLote(carga, lote){
  const areas = db.taxonomia.areas.map(a=>a.nome).join(" / ");
  const quantas = lote.fim - lote.inicio + 1;
  const faixa = lote.inicio===lote.fim ? ("a questão "+lote.inicio) : ("as questões "+lote.inicio+" a "+lote.fim);
  return "Você vai transcrever UM PEDAÇO de uma prova pública de residência médica para um formato de texto que a plataforma Esc lê automaticamente.\n\n"+
  "PROVA: "+carga.instituicao+" · "+carga.ano+(carga.fase?" · "+carga.fase:"")+"\n"+
  "PEDAÇO DESTE LOTE: "+faixa+" ("+quantas+" questão(ões), nem mais nem menos)\n\n"+
  "Transcreva SOMENTE "+faixa+". Não adiante questões de outros trechos, não volte às anteriores e não invente questão nenhuma para fechar a conta: se a prova terminar antes do número "+lote.fim+", escreva isso numa linha depois do último bloco, em vez de completar.\n\n"+
  "Comece a resposta exatamente assim, sem nada antes:\n\n"+
  "INSTITUICAO: "+carga.instituicao+"\n"+
  "ANO: "+carga.ano+"\n"+
  "===\n\n"+
  "Depois, para CADA questão, na ordem da prova, um bloco exatamente neste formato — sem markdown, sem numeração extra, sem comentários seus:\n\n"+
  "NUMERO: [número da questão na prova, de "+lote.inicio+" a "+lote.fim+"]\n"+
  "PERGUNTA: [enunciado completo da questão, incluindo o caso clínico se houver]\n"+
  "A: [texto da alternativa A]\nB: [texto da alternativa B]\nC: [texto da alternativa C]\nD: [texto da alternativa D]\nE: [texto da alternativa E — apague esta linha se a prova tiver só 4 alternativas]\n"+
  "GABARITO: [letra correta]\n"+
  "EXPLICACAO: [explicação clínica objetiva, escrita com suas próprias palavras: por que a alternativa do gabarito está certa e, em seguida, por que cada uma das outras está errada, apontando no enunciado o dado que descarta cada uma — tudo em texto corrido, sem quebra de linha]\n"+
  "REFERENCIAS: [as fontes que sustentam a explicação: diretriz/consenso de sociedade de especialidade, protocolo do Ministério da Saúde, PCDT, revisão sistemática ou artigo primário, com nome e ano]\n"+
  "IMAGEM: [endereço (URL) da imagem da questão — ECG, radiografia, fundo de olho, foto de lesão. Deixe em branco se não houver]\n"+
  "LEGENDA: [legenda curta da imagem, se houver]\n"+
  "AREA: [uma destas opções, exatamente: "+areas+"]\n"+
  "ESPECIALIDADE: [ex.: Cardiologia, Pneumologia...]\n"+
  "ASSUNTO: [assunto específico, ex.: Síndrome coronariana aguda]\n"+
  "DIFICULDADE: [fundamental, intermediario ou avancado]\n\n"+
  regrasDeConteudoImportacao()+
  "Regras de formato:\n"+
  "- Separe cada questão com uma linha contendo apenas: ===\n"+
  "- NÃO repita INSTITUICAO nem ANO dentro das questões (já estão no cabeçalho).\n"+
  "- Transcreva o enunciado na íntegra, sem resumir e sem corrigir o texto original da prova.\n"+
  "- Se a questão tiver sido anulada pela banca, acrescente a linha: STATUS: anulada\n"+
  "- Mantenha exatamente as alternativas originais: se a prova tem 4 (A a D), não invente uma quinta.\n"+
  "- Se você não tiver certeza do gabarito oficial, escreva GABARITO: ? e explique a dúvida no campo EXPLICACAO, em vez de inventar.\n\n"+
  "Antes de me entregar, confira você mesmo: devem ser "+quantas+" bloco(s), com NUMERO indo de "+lote.inicio+" a "+lote.fim+", sem pular e sem repetir. Se faltar alguma, diga qual falta e por quê.\n\n"+
  "Aqui está a prova (colo o texto abaixo ou anexo o PDF/imagem):\n[COLE AQUI O TEXTO DA PROVA OU ANEXE O ARQUIVO]";
}
function copiarModeloLote(cargaId, loteId){
  const carga = getCargaProva(cargaId); const lote = loteDaCarga(carga, loteId);
  if(!carga || !lote) return;
  copiarTexto(modeloConstrucaoLote(carga, lote), "Modelo das questões "+lote.inicio+"–"+lote.fim+" copiado. Cole numa conversa de IA junto com o PDF da prova.");
}
function verModeloLote(cargaId, loteId){
  const carga = getCargaProva(cargaId); const lote = loteDaCarga(carga, loteId);
  if(!carga || !lote) return;
  abrirModal(`<div class="modal-header"><h3>Modelo de construção — questões ${lote.inicio} a ${lote.fim}</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
    <p class="text-sm muted">Pode editar antes de copiar (o texto daqui não é salvo: o modelo é sempre remontado a partir da prova e da faixa).</p>
    <textarea class="textarea textarea-mono mt-1" id="modeloLoteTexto" style="min-height:320px">${escapeHtml(modeloConstrucaoLote(carga, lote))}</textarea>
    <div class="flex gap-1 mt-2"><button class="btn btn-primary" onclick="copiarTexto(document.getElementById('modeloLoteTexto').value,'Modelo copiado.')">${iconeSvg("search")} Copiar</button><button class="btn btn-secondary" onclick="fecharModal()">Fechar</button></div>`, "lg");
}
/* Roteiro curto da prova inteira: serve para combinar quem pega o quê, ou
   para colar num bloco de notas antes de abrir as conversas. */
function copiarRoteiroCarga(cargaId){
  const carga = getCargaProva(cargaId); if(!carga) return;
  const rotulos = {pendente:"a fazer", conferido:"conferido, aguardando publicação", publicado:"publicado no banco"};
  const linhas = (carga.lotes||[]).map(l=>"- Questões "+l.inicio+"–"+l.fim+": "+rotulos[l.status]+(l.responsavel?" (com "+l.responsavel+")":""));
  copiarTexto("Prova "+nomeDaCarga(carga)+" — "+carga.totalQuestoes+" questões em "+(carga.lotes||[]).length+" lotes\n"+linhas.join("\n")+
    "\n\nCada lote tem um modelo próprio na Central de Provas do Esc: abra a prova, clique em \"Copiar modelo\" no lote e cole numa conversa de IA junto com o PDF.", "Roteiro da prova copiado.");
}

/* ---------- receber, conferir e publicar cada lote ---------- */
function abrirLoteProva(cargaId, loteId){
  const ctx = ctxCentralProvas();
  const carga = getCargaProva(cargaId); const lote = loteDaCarga(carga, loteId);
  ctx.loteAberto = (ctx.loteAberto===loteId) ? null : loteId;
  state.filtroRota.previewImportacao = null;
  // lote já conferido e ainda não publicado: remonta a pré-visualização a
  // partir do texto guardado, para a pessoa poder ajustar a classificação
  if(ctx.loteAberto && lote && lote.status==="conferido" && lote.textoBruto){
    state.filtroRota.previewImportacao = parseImportText(lote.textoBruto, {instituicao:carga.instituicao, ano:carga.ano});
    state.filtroRota.destinoImportacao = carga.destino;
  }
  render();
}
function definirResponsavelLote(cargaId, loteId, valor){
  const carga = getCargaProva(cargaId); const lote = loteDaCarga(carga, loteId);
  if(!lote) return;
  lote.responsavel = String(valor||"").trim().slice(0,60);
  saveState();
}
function carregarArquivoLote(input, loteId){
  const arq = input.files && input.files[0]; if(!arq) return;
  const leitor = new FileReader();
  leitor.onload = e => {
    const campo = document.getElementById("textoLote-"+loteId);
    if(campo){ campo.value = e.target.result; toast("Arquivo carregado. Clique em Conferir lote."); }
  };
  leitor.readAsText(arq);
}
/* O que o "conferir" verifica, além do formato de cada questão: se a
   quantidade bate com a faixa pedida, se algum número veio repetido, se
   algum caiu fora da faixa e quais faltam. É a diferença entre saber que
   "chegou texto" e saber que "chegou o pedaço certo". */
function resumoDoLote(resultado, lote){
  const esperado = lote.fim - lote.inicio + 1;
  const numeros = resultado.map(r=>r.numero).filter(n=>n);
  const naFaixa = numeros.filter(n=>n>=lote.inicio && n<=lote.fim);
  const faltando = [];
  if(numeros.length){
    for(let n=lote.inicio;n<=lote.fim;n++){ if(naFaixa.indexOf(n)<0) faltando.push(n); }
  }
  return {
    total: resultado.length, esperado,
    validas: resultado.filter(r=>r.valido && r.importar!==false).length,
    comProblema: resultado.filter(r=>!r.valido).length,
    duplicadas: resultado.filter(r=>r.duplicada).length,
    semNumero: resultado.length - numeros.length,
    faltando,
    repetidos: [...new Set(naFaixa.filter((n,i)=>naFaixa.indexOf(n)!==i))],
    foraDaFaixa: [...new Set(numeros.filter(n=>n<lote.inicio||n>lote.fim))],
  };
}
function conferirLoteProva(cargaId, loteId){
  const carga = getCargaProva(cargaId); const lote = loteDaCarga(carga, loteId);
  if(!carga || !lote) return;
  const campo = document.getElementById("textoLote-"+loteId);
  const texto = campo ? campo.value : "";
  if(!texto.trim()){ toast("Cole (ou carregue) o texto deste lote antes de conferir.", "err"); return; }
  const resultado = parseImportText(texto, {instituicao:carga.instituicao, ano:carga.ano});
  lote.textoBruto = texto;
  lote.resumo = resumoDoLote(resultado, lote);
  lote.status = "conferido";
  lote.recebidoEm = hojeISO();
  saveState();
  ctxCentralProvas().loteAberto = loteId;
  state.filtroRota.previewImportacao = resultado;
  state.filtroRota.destinoImportacao = carga.destino;
  render();
  const r = lote.resumo;
  toast(r.validas+" questão(ões) prontas de "+r.esperado+" esperadas"+(r.comProblema?" · "+r.comProblema+" com problema":"")+(r.faltando.length?" · faltam as nº "+resumirNumeros(r.faltando,4):"")+". Nada foi publicado ainda.", (r.comProblema||r.faltando.length)?"err":undefined);
}
function limparLoteProva(cargaId, loteId){
  const carga = getCargaProva(cargaId); const lote = loteDaCarga(carga, loteId);
  if(!lote || lote.status==="publicado") return;
  lote.textoBruto = ""; lote.resumo = null; lote.status = "pendente"; lote.recebidoEm = null;
  state.filtroRota.previewImportacao = null;
  saveState();
  toast("Lote esvaziado. O modelo continua o mesmo — é só refazer esse pedaço.");
  render();
}
function publicarLoteProva(cargaId, loteId, silencioso){
  const carga = getCargaProva(cargaId); const lote = loteDaCarga(carga, loteId);
  if(!carga || !lote) return null;
  if(lote.status!=="conferido"){ if(!silencioso) toast("Confira o lote antes de publicar.", "err"); return null; }
  const ctx = ctxCentralProvas();
  // se este é o lote aberto na tela, publica exatamente o que está na
  // pré-visualização (com os ajustes de classificação que a pessoa fez);
  // senão, relê o texto guardado
  const resultado = (ctx.loteAberto===loteId && state.filtroRota.previewImportacao)
    ? state.filtroRota.previewImportacao
    : parseImportText(lote.textoBruto||"", {instituicao:carga.instituicao, ano:carga.ano});
  const r = importarItensAnalisados(resultado, carga.destino, {faseProva: carga.fase||""});
  if(!r.importadas){ if(!silencioso) toast("Nenhuma questão deste lote está marcada para publicar.", "err"); return null; }
  lote.status = "publicado";
  lote.publicadoEm = hojeISO();
  lote.questaoIds = r.ids;
  lote.resumo = Object.assign({}, lote.resumo||{}, {publicadas:r.importadas, ignoradas:r.ignoradas});
  // o rascunho já virou questão no banco: guardar o texto de novo só ocuparia
  // espaço do navegador duas vezes
  lote.textoBruto = "";
  if(ctx.loteAberto===loteId){ ctx.loteAberto = null; state.filtroRota.previewImportacao = null; }
  saveState();
  if(!silencioso){
    toast(r.importadas+" questão(ões) publicada(s)"+(r.ignoradas?" · "+r.ignoradas+" duplicada(s) ignorada(s)":"")+(r.novosAssuntos?" · "+r.novosAssuntos+" assunto(s) novo(s)":"")+
      (carga.destino==="sugerir"?" — aguardando aprovação.":"."));
    render();
  }
  return r;
}
function confirmarPublicarConferidos(cargaId){
  const carga = getCargaProva(cargaId); if(!carga) return;
  const conferidos = (carga.lotes||[]).filter(l=>l.status==="conferido");
  if(!conferidos.length){ toast("Não há lote conferido esperando publicação.", "err"); return; }
  const questoes = conferidos.reduce((s,l)=>s+((l.resumo&&l.resumo.validas)||0),0);
  abrirModal(`<div class="modal-header"><h3>Publicar ${conferidos.length===1?"o lote conferido":"os "+conferidos.length+" lotes conferidos"} no banco?</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
    <p>Vão para o banco cerca de <strong>${questoes} questão(ões)</strong> de ${escapeHtml(nomeDaCarga(carga))}${carga.destino==="sugerir"?", como pendentes de aprovação":""}.</p>
    <p class="text-sm muted mt-1">Faixas: ${conferidos.map(l=>l.inicio+"–"+l.fim).join(", ")}. Depois de publicadas, elas passam a ser editadas pelo Banco de Questões como qualquer outra.</p>
    <div class="flex gap-1 mt-3"><button class="btn btn-primary" onclick="publicarConferidosDaCarga('${carga.id}')">Publicar tudo</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
}
function publicarConferidosDaCarga(cargaId){
  const carga = getCargaProva(cargaId); if(!carga) return;
  fecharModal();
  let total = 0, lotesOk = 0;
  (carga.lotes||[]).filter(l=>l.status==="conferido").forEach(l=>{
    const r = publicarLoteProva(cargaId, l.id, true);
    if(r){ total += r.importadas; lotesOk++; }
  });
  toast(lotesOk ? ((lotesOk===1?"1 lote publicado":lotesOk+" lotes publicados")+" · "+total+" questão(ões) no banco.") : "Nenhum lote pôde ser publicado.", lotesOk?undefined:"err");
  render();
}

/* ---------- telas ---------- */
function renderCentralProvas(){
  const u = usuarioAtual();
  if(!podeUsarCentralProvas(u)){
    return `<div class="empty-state"><h3>Acesso restrito</h3><p class="mt-2">A Central de Provas é de quem cuida do conteúdo (professor, coordenação, moderador) e do residente que envia provas.</p><button class="btn btn-primary mt-3" onclick="navigate('inicio')">Voltar ao início</button></div>`;
  }
  const ctx = ctxCentralProvas();
  const carga = ctx.cargaAberta ? getCargaProva(ctx.cargaAberta) : null;
  if(carga) return renderCargaProva(carga);

  const todas = cargasProvas().slice().sort((a,b)=>(b.criadoEm||"").localeCompare(a.criadoEm||""));
  const abertas = todas.filter(c=>!resumoCarga(c).concluida);
  const concluidas = todas.filter(c=>resumoCarga(c).concluida);
  return `
  <div class="page-header"><h2>Central de Provas</h2>
  <p>Uma prova inteira não sai numa sentada só. Aqui ela entra em pedaços: cada faixa de questões tem o modelo pronto para copiar, um lugar para colar o resultado e a publicação no banco quando você mandar — e você acompanha o que já foi e o que falta.</p></div>

  <div class="card mb-2">
    <div class="card-title">Como trabalhar duas frentes ao mesmo tempo</div>
    <div class="grid grid-4 mt-2">
      <div class="card-flat"><div class="text-xs muted">1</div><div class="text-sm">Cadastre a prova abaixo com o total de questões. Ela é cortada sozinha em lotes.</div></div>
      <div class="card-flat"><div class="text-xs muted">2</div><div class="text-sm">Copie o modelo do lote 1 numa conversa de IA e o do lote 2 em outra. Cada modelo já diz qual faixa transcrever.</div></div>
      <div class="card-flat"><div class="text-xs muted">3</div><div class="text-sm">Conforme cada frente responder, cole aqui e confira. O lote fica guardado, sem publicar nada.</div></div>
      <div class="card-flat"><div class="text-xs muted">4</div><div class="text-sm">Publique lote a lote (ou tudo de uma vez). A prova aparece sozinha em Provas e Simulados.</div></div>
    </div>
    <p class="text-xs muted mt-2">Use o campo <em>quem está fazendo</em> de cada lote para não se perder entre as frentes — "conversa 1", "conversa 2", o nome de quem ficou com o pedaço.</p>
  </div>

  <div class="card mb-2">
    <div class="card-title">Nova prova</div>
    <p class="text-sm muted">O total de questões é o da prova oficial. O tamanho do lote é quanto cabe, com folga, numa conversa só — 25 costuma ser um bom corte para questões com explicação autoral.</p>
    <div class="grid grid-3 mt-2">
      <div class="field" style="margin-bottom:0"><label class="label">Instituição</label>
        <input class="input" id="cpInstituicao" list="listaBancasCarga" value="${escapeHtml(CONFIG.bancaFoco)}">
        <datalist id="listaBancasCarga">${[...new Set([...CONFIG.instituicoesReferencia, ...db.questoes.map(q=>q.banca)])].map(b=>`<option value="${escapeHtml(b)}"></option>`).join("")}</datalist>
      </div>
      <div class="field" style="margin-bottom:0"><label class="label">Ano da prova</label>
        <input class="input" type="number" id="cpAno" value="${new Date().getFullYear()}"></div>
      <div class="field" style="margin-bottom:0"><label class="label">Fase / caderno (opcional)</label>
        <input class="input" id="cpFase" placeholder="ex.: Acesso Direto (R1)"></div>
    </div>
    <div class="grid grid-3 mt-2">
      <div class="field" style="margin-bottom:0"><label class="label">Total de questões da prova</label>
        <input class="input" type="number" id="cpTotal" value="100" min="1" max="500"></div>
      <div class="field" style="margin-bottom:0"><label class="label">Questões por lote</label>
        <input class="input" type="number" id="cpTamanhoLote" value="25" min="1" max="100"></div>
      <div class="field" style="margin-bottom:0"><label class="label">Destino ao publicar</label>
        <select class="select" id="cpDestino">${opcoesDestinoCarga().map(([v,l])=>`<option value="${v}">${escapeHtml(l)}</option>`).join("")}</select></div>
    </div>
    <button class="btn btn-primary mt-2" onclick="criarCargaProva()">${iconeSvg("plus")} Criar prova e dividir em lotes</button>
  </div>

  ${abertas.length ? `<div class="card-title mb-1">Provas em andamento (${abertas.length})</div>
  <div class="grid grid-2 mb-2">${abertas.map(cardCargaProva).join("")}</div>` : `<div class="empty-state mb-2">Nenhuma prova em andamento. Cadastre a primeira acima — e, se for tocar duas ao mesmo tempo, cadastre as duas: elas ficam lado a lado aqui.</div>`}
  ${concluidas.length ? `<div class="card-title mb-1">Provas concluídas (${concluidas.length})</div>
  <div class="grid grid-2">${concluidas.map(cardCargaProva).join("")}</div>` : ""}`;
}
function cardCargaProva(c){
  const r = resumoCarga(c);
  return `<div class="card">
    <div class="flex justify-between items-center" style="flex-wrap:wrap;gap:.4rem">
      <div style="font-weight:700">${escapeHtml(nomeDaCarga(c))}</div>
      <span class="badge ${r.concluida?"badge-accent":r.publicadas?"badge-amber":"badge-muted"}">${r.concluida?"concluída":r.publicadas?"em andamento":"não começada"}</span>
    </div>
    <div class="text-sm muted mt-1">${r.publicadas} de ${r.total} questão(ões) no banco${r.prontas?" · "+r.prontas+" conferida(s) esperando publicação":""}</div>
    <div class="progress-track mt-1"><div class="progress-fill" style="width:${r.pctPublicado}%"></div></div>
    <div class="qcard-meta mt-1">
      <span class="badge badge-muted">${r.publicados}/${r.lotes} lotes publicados</span>
      ${r.conferidos?`<span class="badge badge-amber">${r.conferidos} conferido(s)</span>`:""}
      ${r.pendentes?`<span class="badge badge-muted">${r.pendentes} a fazer</span>`:""}
    </div>
    <button class="btn btn-primary btn-sm mt-2" onclick="abrirCargaProva('${c.id}')">Abrir</button>
  </div>`;
}
function renderCargaProva(carga){
  const ctx = ctxCentralProvas();
  const r = resumoCarga(carga);
  const conf = conferenciaDaProva(carga);
  const rotuloDestino = (opcoesDestinoCarga().find(([v])=>v===carga.destino)||["",carga.destino])[1];
  return `
  <div class="page-header">
    <button class="link-btn" onclick="voltarAoPainelProvas()">← todas as provas</button>
    <h2>${escapeHtml(nomeDaCarga(carga))}</h2>
    <p>${carga.totalQuestoes} questões declaradas, divididas em ${(carga.lotes||[]).length} lote(s) de até ${carga.tamanhoLote}. Destino ao publicar: ${escapeHtml(rotuloDestino)}.</p>
  </div>

  <div class="card mb-2">
    <div class="grid grid-3">
      <div class="stat-tile"><div class="stat-value">${r.publicadas}</div><div class="stat-label">questão(ões) já no banco (de ${r.total})</div></div>
      <div class="stat-tile"><div class="stat-value">${r.prontas}</div><div class="stat-label">conferida(s), esperando você publicar</div></div>
      <div class="stat-tile"><div class="stat-value">${r.faltam}</div><div class="stat-label">ainda não transcrita(s)</div></div>
    </div>
    <div class="progress-track mt-2"><div class="progress-fill" style="width:${r.pctPublicado}%"></div></div>
    <p class="text-xs muted mt-1">${r.pctPublicado}% publicado · ${r.pctFeito}% já transcrito (publicado + conferido).</p>
    <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
      ${r.conferidos?`<button class="btn btn-primary btn-sm" onclick="confirmarPublicarConferidos('${carga.id}')">${iconeSvg("upload")} Publicar ${r.conferidos===1?"o lote conferido":"os "+r.conferidos+" lotes conferidos"}</button>`:""}
      <button class="btn btn-secondary btn-sm" onclick="copiarRoteiroCarga('${carga.id}')">${iconeSvg("clipboard")} Copiar roteiro da prova</button>
      ${r.publicadas?`<button class="btn btn-ghost btn-sm" onclick="navigate('provas-antigas')">${iconeSvg("archive")} Ver em Provas e Simulados</button>`:""}
      <button class="btn btn-ghost btn-sm" onclick="confirmarExcluirCarga('${carga.id}')">${iconeSvg("trash")} Descartar acompanhamento</button>
    </div>
  </div>

  <div class="card-flat mb-2 text-sm">
    <strong>Conferência contra o banco:</strong> ${conf.noBanco} questão(ões) de ${escapeHtml(carga.instituicao)} ${carga.ano} existem hoje no banco${conf.comNumero?" ("+conf.comNumero+" com o número da prova registrado)":""}.
    ${conf.faltando.length ? `<div class="mt-1" style="color:var(--amber)">${iconeSvg("alert")} Faltam os números: ${resumirNumeros(conf.faltando)}</div>`
      : `<div class="mt-1" style="color:var(--accent-dark)">${iconeSvg("check")} Todos os ${carga.totalQuestoes} números da prova já estão no banco.</div>`}
    <div class="text-xs muted mt-1">A conferência olha o campo "número na prova" das questões publicadas. Questão importada antes desta tela existir não tem esse número e por isso não aparece aqui — o que não quer dizer que esteja faltando no banco.</div>
  </div>

  <div class="card-title mb-1">Lotes</div>
  ${(carga.lotes||[]).map(l=>renderLoteProva(carga, l, ctx.loteAberto===l.id)).join("")}`;
}
function renderLoteProva(carga, lote, aberto){
  const badge = {pendente:['badge-muted','a fazer'], conferido:['badge-amber','conferido — não publicado'], publicado:['badge-accent','publicado no banco']}[lote.status] || ['badge-muted',lote.status];
  const res = lote.resumo || null;
  const preview = aberto && lote.status==="conferido" && state.filtroRota.previewImportacao;
  return `<div class="card mb-1">
    <div class="flex justify-between items-center" style="flex-wrap:wrap;gap:.5rem">
      <div>
        <div style="font-weight:700">Questões ${lote.inicio} a ${lote.fim} <span class="badge ${badge[0]}">${badge[1]}</span></div>
        <div class="text-xs muted mt-1">${lote.fim-lote.inicio+1} questão(ões) esperadas${lote.recebidoEm?" · conferido em "+formatDataBR(lote.recebidoEm):""}${lote.publicadoEm?" · publicado em "+formatDataBR(lote.publicadoEm):""}</div>
      </div>
      <div class="flex gap-1" style="flex-wrap:wrap">
        <button class="btn btn-secondary btn-sm" onclick="copiarModeloLote('${carga.id}','${lote.id}')">${iconeSvg("search")} Copiar modelo</button>
        <button class="btn btn-ghost btn-sm" onclick="verModeloLote('${carga.id}','${lote.id}')">ver modelo</button>
        ${lote.status!=="publicado" ? `<button class="btn ${aberto?"btn-ghost":"btn-primary"} btn-sm" onclick="abrirLoteProva('${carga.id}','${lote.id}')">${aberto?"fechar":(lote.status==="conferido"?"revisar e publicar":"colar resultado")}</button>` : ""}
      </div>
    </div>
    ${lote.status!=="publicado" ? `<div class="field mt-2" style="margin-bottom:0;max-width:340px">
      <label class="label">Quem está fazendo este lote</label>
      <input class="input" value="${escapeHtml(lote.responsavel||"")}" placeholder="ex.: conversa 1, conversa 2, Ana" onchange="definirResponsavelLote('${carga.id}','${lote.id}',this.value)">
    </div>` : (lote.responsavel?`<div class="text-xs muted mt-1">feito por ${escapeHtml(lote.responsavel)}</div>`:"")}
    ${res ? `<div class="qcard-meta mt-2">
      <span class="badge ${res.validas===res.esperado?"badge-accent":"badge-amber"}">${res.validas} pronta(s) de ${res.esperado}</span>
      ${res.comProblema?`<span class="badge badge-danger">${res.comProblema} com problema</span>`:""}
      ${res.duplicadas?`<span class="badge badge-amber">${res.duplicadas} duplicada(s)</span>`:""}
      ${res.semNumero?`<span class="badge badge-muted">${res.semNumero} sem NUMERO</span>`:""}
      ${res.faltando && res.faltando.length?`<span class="badge badge-amber">faltam nº ${resumirNumeros(res.faltando,4)}</span>`:""}
      ${res.repetidos && res.repetidos.length?`<span class="badge badge-danger">repetidas nº ${resumirNumeros(res.repetidos,4)}</span>`:""}
      ${res.foraDaFaixa && res.foraDaFaixa.length?`<span class="badge badge-danger">fora da faixa: nº ${resumirNumeros(res.foraDaFaixa,4)}</span>`:""}
      ${lote.status==="publicado"?`<span class="badge badge-accent">${(lote.questaoIds||[]).length} no banco</span>`:""}
    </div>` : ""}
    ${aberto && lote.status!=="publicado" ? `
    <div class="mt-2">
      <p class="text-sm muted mb-1">Cole aqui o que a IA devolveu para as questões ${lote.inicio} a ${lote.fim}. Conferir não publica nada: só lê, valida e guarda.</p>
      <textarea class="textarea textarea-mono" id="textoLote-${lote.id}" style="min-height:180px" placeholder="INSTITUICAO: ${escapeHtml(carga.instituicao)}
ANO: ${carga.ano}
===
NUMERO: ${lote.inicio}
PERGUNTA: ...
A: ...
B: ...
GABARITO: B
===">${escapeHtml(lote.textoBruto||"")}</textarea>
      <div class="flex gap-1 mt-1" style="flex-wrap:wrap">
        <button class="btn btn-primary btn-sm" onclick="conferirLoteProva('${carga.id}','${lote.id}')">${iconeSvg("check")} Conferir lote</button>
        <label class="btn btn-secondary btn-sm" style="cursor:pointer">${iconeSvg("upload")} Carregar arquivo .txt<input type="file" accept=".txt,.md,.csv" style="display:none" onchange="carregarArquivoLote(this,'${lote.id}')"></label>
        ${lote.status==="conferido"?`<button class="btn btn-ghost btn-sm" onclick="limparLoteProva('${carga.id}','${lote.id}')">${iconeSvg("trash")} Esvaziar lote</button>`:""}
      </div>
    </div>
    ${preview ? `<div id="previewImportacao" class="mt-2">${renderPreviewImportacaoHtml(state.filtroRota.previewImportacao, {aoConfirmar:`publicarLoteProva('${carga.id}','${lote.id}')`, rotulo:"Publicar no banco"})}</div>` : ""}` : ""}
  </div>`;
}
