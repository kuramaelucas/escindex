/* codigo/12a-importacao.js — Importar / Enviar questões em lote (seção 26).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

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
    state.filtroRota.importacao = { modo:"prova", instituicao:CONFIG.bancaFoco, ano:String(new Date().getFullYear()), tipoProva:CONFIG.tipoProvaPadrao };
  }
  if(!tipoProvaValido(state.filtroRota.importacao.tipoProva)) state.filtroRota.importacao.tipoProva = CONFIG.tipoProvaPadrao;
  return state.filtroRota.importacao;
}
function mudarModoImportacao(modo){ contextoImportacao().modo = modo; sincronizarCabecalhoImportacao(); render(); }
function sincronizarCabecalhoImportacao(){
  const ctx = contextoImportacao();
  const inst = document.getElementById("impInstituicao");
  const ano = document.getElementById("impAno");
  const tipo = document.getElementById("impTipoProva");
  if(inst) ctx.instituicao = inst.value.trim() || CONFIG.bancaFoco;
  if(ano) ctx.ano = (ano.value||"").trim();
  if(tipo && tipoProvaValido(tipo.value)) ctx.tipoProva = tipo.value;
}
/* Trocar o tipo de prova troca também a instituição sugerida, quando ela
   ainda é a sugestão do outro tipo: quem escolhe "Graduação" quase nunca
   está subindo uma prova da UNIFESP-EPM. */
function mudarTipoProvaImportacao(tipo){
  if(!tipoProvaValido(tipo)) return;
  const ctx = contextoImportacao();
  const anterior = ctx.tipoProva;
  sincronizarCabecalhoImportacao();
  ctx.tipoProva = tipo;
  // troca no lugar, sem redesenhar a tela: o texto colado e a pré-visualização
  // (com as figuras já anexadas) continuam onde estavam
  const sugestao = t => t==="graduacao" ? CONFIG.instituicoesGraduacao[0] : CONFIG.bancaFoco;
  const campoInst = document.getElementById("impInstituicao");
  if(campoInst && (!ctx.instituicao || ctx.instituicao===sugestao(anterior))){ ctx.instituicao = sugestao(tipo); campoInst.value = ctx.instituicao; }
  const lista = document.getElementById("listaBancasImport");
  if(lista) lista.innerHTML = htmlSugestoesDeInstituicao(tipo);
  const dica = document.getElementById("impTipoProvaDica");
  if(dica) dica.textContent = infoTipoProva(tipo).descricao+".";
  atualizarPromptImportacao();
  // na pré-visualização, muda o tipo das questões cujo texto não dizia o seu
  const previa = state.filtroRota.previewImportacao;
  if(previa && document.getElementById("previewImportacao")){
    previa.forEach(r=>{ if(!r.tipoDoTexto) r.tipoProva = tipo; });
    redesenharPreviewImportacao();
  }
}
// as instituições sugeridas no campo: as de referência daquele tipo e as que já têm prova dele no banco
function htmlSugestoesDeInstituicao(tipo){
  const base = tipo==="graduacao" ? CONFIG.instituicoesGraduacao : CONFIG.instituicoesReferencia;
  return [...new Set([...base, ...db.questoes.filter(q=>tipoProvaDe(q)===tipo).map(q=>q.banca)])].map(b=>`<option value="${escapeHtml(b)}"></option>`).join("");
}
// "de residência médica" / "da graduação em Medicina (...)": o prompt diz à IA que prova ela tem na frente
function descricaoProvaNoPrompt(tipo){
  return tipo==="graduacao"
    ? "da GRADUAÇÃO em Medicina (prova da faculdade ou Teste de Progresso)"
    : "de residência médica";
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
  "- Escreva isso em texto corrido, numa linha só (o campo EXPLICACAO não aceita quebra de linha).\n\n"+
  regraDeParametrosObjetivos()+"\n";
}
/* A imagem da questão (ECG, radiografia, foto de lesão) quase nunca tem um
   endereço na internet: ela está no PDF. Por isso a IA só marca que ela
   existe — IMAGEM: sim — e quem está enviando anexa o arquivo na
   pré-visualização, questão por questão (carregarImagemImportacao). */
function linhaImagemDoPrompt(){
  return "IMAGEM: [escreva sim se a questão tiver imagem (ECG, radiografia, tomografia, fundo de olho, foto de lesão, gráfico ou tabela em figura) — o arquivo é anexado depois, na plataforma. Se houver um endereço (URL) público da imagem, pode escrever o endereço no lugar. Deixe em branco se a questão não tiver imagem]\n";
}
function gerarPromptImportacao(){
  const ctx = contextoImportacao();
  const areas = db.taxonomia.areas.map(a=>a.nome).join(" / ");
  const formatoQuestao =
    "PERGUNTA: [enunciado completo da questão, incluindo o caso clínico se houver]\n"+
    "A: [texto da alternativa A]\nB: [texto da alternativa B]\nC: [texto da alternativa C]\nD: [texto da alternativa D]\nE: [texto da alternativa E]\n"+
    "GABARITO: [letra correta, de A a E]\n"+
    "EXPLICACAO: [explicação clínica objetiva, escrita com suas próprias palavras: por que a alternativa do gabarito está certa e, em seguida, por que cada uma das outras está errada, apontando no enunciado o dado que descarta cada uma — tudo em texto corrido, sem quebra de linha. Quando a conduta depender de um parâmetro objetivo (valor de exame, sinal vital, escore), destaque-o entre ** ** e diga o valor normal e o ponto de corte, como nas regras abaixo]\n"+
    "REFERENCIAS: [as fontes que sustentam a explicação: diretriz/consenso de sociedade de especialidade, protocolo do Ministério da Saúde, PCDT, revisão sistemática ou artigo primário, com nome e ano]\n"+
    linhaImagemDoPrompt()+
    "LEGENDA: [legenda curta da imagem, se houver]\n"+
    "AREA: [uma destas opções, exatamente: "+areas+"]\n"+
    "ESPECIALIDADE: [ex.: Cardiologia, Pneumologia...]\n"+
    "ASSUNTO: [assunto específico, ex.: Síndrome coronariana aguda]\n"+
    "DIFICULDADE: [fundamental, intermediario ou avancado]\n";

  if(ctx.modo === "prova"){
    return "Você vai transcrever uma PROVA INTEIRA "+descricaoProvaNoPrompt(ctx.tipoProva)+" para um formato de texto específico.\n\n"+
    "IMPORTANTE: a prova inteira é da MESMA instituição e do MESMO ano. Portanto, informe a instituição e o ano UMA ÚNICA VEZ, num cabeçalho no começo da resposta, e NÃO repita esses dados em cada questão.\n\n"+
    "Comece a resposta exatamente assim (sem nada antes):\n\n"+
    "INSTITUICAO: "+(ctx.instituicao||CONFIG.bancaFoco)+"\n"+
    "ANO: "+(ctx.ano||new Date().getFullYear())+"\n"+
    "TIPO: "+infoTipoProva(ctx.tipoProva).nome+"\n"+
    "===\n\n"+
    "Em seguida, para CADA questão da prova, na ordem em que aparecem, gere um bloco EXATAMENTE neste formato, sem markdown (a única marcação permitida são os ** em volta de parâmetros objetivos dentro de EXPLICACAO), sem numeração extra, sem comentários seus:\n\n"+
    "NUMERO: [número da questão na prova]\n"+
    formatoQuestao+
    "\n"+regrasDeConteudoImportacao()+
  "Regras de formato:\n"+
    "- Separe cada questão com uma linha contendo apenas: ===\n"+
    "- NÃO repita INSTITUICAO nem ANO dentro das questões (isso já está no cabeçalho).\n"+
    "- Transcreva o enunciado na íntegra, sem resumir e sem corrigir o texto original da prova.\n"+
    "- Se a questão tiver sido anulada pela banca, acrescente a linha: STATUS: anulada\n"+
    "- Se a prova tiver menos de 5 alternativas por questão, repita a última letra existente e deixe as demais vazias apenas se for inevitável; o ideal é manter exatamente as alternativas originais.\n"+
    "- Se você não tiver certeza do gabarito oficial, escreva GABARITO: ? e explique a dúvida no campo EXPLICACAO, em vez de inventar.\n"+
    "- Responda só com os blocos das questões: esse texto vai ser salvo num documento (.docx ou .txt) e enviado direto para a plataforma, então qualquer comentário seu fora do formato atrapalha a leitura.\n\n"+
    "Aqui está a prova (colo o texto abaixo ou anexo o PDF/imagem):\n[COLE AQUI O TEXTO DA PROVA OU ANEXE O ARQUIVO]";
  }
  return "Você vai me ajudar a transcrever questões avulsas de provas "+descricaoProvaNoPrompt(ctx.tipoProva)+" para um formato de texto específico.\n\n"+
  "Para CADA questão que eu enviar (vou colar o texto, ou anexar um PDF/imagem), gere um bloco EXATAMENTE neste formato, sem nenhum texto antes ou depois, sem markdown (a única marcação permitida são os ** em volta de parâmetros objetivos dentro de EXPLICACAO), sem numeração extra:\n\n"+
  formatoQuestao+
  "INSTITUICAO: [nome da instituição da prova, ex.: "+(ctx.tipoProva==="graduacao" ? CONFIG.instituicoesGraduacao[0] : CONFIG.bancaFoco)+"]\nANO: [ano da prova]\n"+
  "TIPO: [Residência ou Graduação — prova da faculdade e Teste de Progresso são Graduação; na dúvida, "+infoTipoProva(ctx.tipoProva).nome+"]\n\n"+
  regrasDeConteudoImportacao()+
  "Separe cada questão com uma linha contendo apenas: ===\n\n"+
  "Aqui está(ão) a(s) questão(ões) para transcrever:\n[COLE AQUI O TEXTO OU DESCREVA O ARQUIVO ANEXADO]";
}
function opcoesDestinoImportacao(){
  const u = usuarioAtual();
  if(u.papel==="aluno") return [
    ...opcoesDeDestinoDeGrupo(u, "Questões do meu grupo (ficam disponíveis na hora, só para o grupo)", g=>"Questões do grupo "+g.nome+" (ficam disponíveis na hora, só para ele)"),
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
  const meusGrupos = u.papel==="aluno" ? gruposDoUsuario(u) : [];
  return `
  <div class="page-header"><h2>${u.papel==="aluno"||u.papel==="residente"?"Enviar Provas e Questões":"Importar Questões"}</h2>
  <p>Cole uma prova inteira ou questões avulsas — por exemplo, já formatadas por uma IA a partir do PDF da prova — para adicionar ao banco em lote.</p></div>
  ${renderCardMeusEnvios()}
${podeUsarCentralProvas(u) ? `<div class="card-flat mb-2 text-sm">
    ${iconeSvg("archive")} <strong>Vai subir uma prova inteira, de 60 ou 100 questões?</strong> A <button class="link-btn" onclick="navigate('central-provas')">Central de Provas</button> corta a prova em lotes, dá um modelo pronto para cada faixa de questões e guarda o que já chegou — é o caminho para fazer a prova em pedaços, em mais de uma conversa ao mesmo tempo, sem perder a conta.
    <div class="text-xs muted mt-1">Esta tela aqui continua sendo a certa para questões avulsas e para uma prova pequena que sai de uma vez só.</div>
  </div>` : ""}

  <div class="card mb-2">
    <div class="card-title">Passo 1 — identifique a prova</div>
    <p class="text-sm muted">No modo "prova inteira", o tipo de prova, a instituição e o ano valem para todas as questões e são informados só aqui — não é preciso repetir questão a questão.</p>
    <div class="tabs mt-2" style="margin-bottom:1rem">
      <div class="tab ${ctx.modo==="prova"?"active":""}" onclick="mudarModoImportacao('prova')">Prova inteira (mesma instituição e ano)</div>
      <div class="tab ${ctx.modo==="avulsas"?"active":""}" onclick="mudarModoImportacao('avulsas')">Questões avulsas</div>
    </div>
    <div class="grid grid-4">
      <div class="field sem-mb"><label class="label">Tipo de prova</label>
        <select class="select" id="impTipoProva" onchange="mudarTipoProvaImportacao(this.value)">${CONFIG.tiposProva.map(t=>`<option value="${t.id}" ${ctx.tipoProva===t.id?"selected":""}>${escapeHtml(t.nome)}${t.id===CONFIG.tipoProvaPadrao?" (padrão)":""}</option>`).join("")}</select>
        <div class="hint mt-1" id="impTipoProvaDica">${escapeHtml(infoTipoProva(ctx.tipoProva).descricao)}.</div>
      </div>
      <div class="field sem-mb"><label class="label">Instituição da prova</label>
        <input class="input" id="impInstituicao" list="listaBancasImport" value="${escapeHtml(ctx.instituicao||CONFIG.bancaFoco)}" onchange="atualizarPromptImportacao()" ${ctx.modo==="avulsas"?'placeholder="usada só quando a questão não trouxer a própria"':""}>
        <datalist id="listaBancasImport">${htmlSugestoesDeInstituicao(ctx.tipoProva)}</datalist>
      </div>
      <div class="field sem-mb"><label class="label">Ano da prova</label>
        <input class="input" type="number" id="impAno" value="${escapeHtml(String(ctx.ano||new Date().getFullYear()))}" onchange="atualizarPromptImportacao()">
      </div>
      <div class="field sem-mb"><label class="label">Destino das questões</label>
        <select class="select" id="impDestino">${destinos.map(([v,l])=>`<option value="${v}">${escapeHtml(l)}</option>`).join("")}</select>
        ${meusGrupos.length ? `<div class="hint mt-1">${meusGrupos.length>1?"Seus grupos":"Seu grupo atual"}: ${meusGrupos.map(g=>escapeHtml(g.nome)).join(" e ")}</div>` : ""}
      </div>
    </div>
  </div>

  <div class="card mb-2">
    <div class="card-title">Passo 2 — peça a uma IA para formatar</div>
    <p class="text-sm muted">Copie o prompt abaixo (pode revisar antes), cole numa IA junto com o PDF/texto da prova, e traga o resultado para o Passo 3 — colando o texto ou salvando a resposta num documento do Word (.docx) e enviando o arquivo.</p>
    <div class="field mt-1"><textarea class="textarea textarea-mono" id="promptImportacaoTexto" aria-label="Prompt pronto para copiar" style="min-height:170px">${escapeHtml(gerarPromptImportacao())}</textarea></div>
    <div class="flex gap-1 quebra">
      <button class="btn btn-secondary btn-sm" onclick="copiarTexto(document.getElementById('promptImportacaoTexto').value,'Prompt copiado! Cole numa IA junto com a prova.')">${iconeSvg("search")} Copiar prompt</button>
      <button class="btn btn-ghost btn-sm" onclick="atualizarPromptImportacao()">${iconeSvg("refresh")} Atualizar prompt com tipo/instituição/ano acima</button>
    </div>
  </div>

  <div class="card">
    <div class="card-title">Passo 3 — cole o texto ou envie o arquivo da prova</div>
    <p class="text-sm muted mb-1">Pode colar junto o cabeçalho com INSTITUICAO, ANO e TIPO: ele é lido uma vez e aplicado às questões que vierem depois dele (enviando vários arquivos, cada um pode trazer o próprio cabeçalho). <strong>Questão com imagem?</strong> Na pré-visualização, cada questão tem o seu lugar para anexar a figura.</p>
    <textarea class="textarea textarea-mono" id="textoImportacao" aria-label="Cole aqui o resultado da IA ou o texto da prova" style="min-height:200px" placeholder="INSTITUICAO: ${escapeHtml(ctx.instituicao||CONFIG.bancaFoco)}
ANO: ${escapeHtml(String(ctx.ano||""))}
TIPO: ${escapeHtml(infoTipoProva(ctx.tipoProva).nome)}
===
PERGUNTA: ...
A: ...
B: ...
GABARITO: B
==="></textarea>
    <div class="flex gap-1 mt-2 quebra">
      <button class="btn btn-primary" onclick="previsualizarImportacao()">Pré-visualizar</button>
      <label class="btn btn-secondary clicavel">${iconeSvg("upload")} Enviar arquivo da prova<input type="file" accept=".docx,.txt,.md,.csv" multiple style="display:none" onchange="carregarArquivoImportacao(this)"></label>
      <button class="btn btn-ghost btn-sm" onclick="baixarModeloImportacao()">${iconeSvg("archive")} Baixar modelo</button>
    </div>
    <p class="text-xs muted mt-1">Aceita documento do Word (.docx) e texto (.txt, .md, .csv), um ou vários de uma vez — o conteúdo precisa estar no formato do script do Passo 2. Documento .doc antigo: salve como .docx primeiro.</p>
  </div>
  <div id="previewImportacao" class="mt-2"></div>`;
}
/* Upload de prova em arquivo (.docx do Word, .txt, .md, .csv). O caminho real
   de quem monta prova é pedir o script a uma IA, a resposta ir parar num
   documento do Word, e ser esse documento que a pessoa tem na mão. O arquivo
   é só o transporte: quem manda no formato continua sendo o script do Passo 2.
   O .docx é lido sem biblioteca (regra do projeto): é um ZIP comum com o texto
   em word/document.xml; o ZIP é aberto lendo o índice do fim do arquivo e o
   conteúdo é descompactado pelo próprio navegador (DecompressionStream).
   Documento .doc antigo não é ZIP: a plataforma explica que basta salvar como
   .docx, em vez de falhar sem dizer por quê. */

/* Acha um arquivo dentro de um ZIP e devolve o conteúdo dele como texto.
   Devolve null quando o arquivo não existe dentro do ZIP. */
async function extrairDoZip(buffer, caminhoProcurado){
  const bytes = new Uint8Array(buffer);
  const dv = new DataView(buffer);
  // o índice do ZIP (EOCD) fica no fim do arquivo; procura a assinatura dele
  // de trás para frente, porque pode haver comentário depois
  let eocd = -1;
  const limite = Math.max(0, bytes.length - 66000);
  for(let i = bytes.length - 22; i >= limite; i--){
    if(bytes[i]===0x50 && bytes[i+1]===0x4b && bytes[i+2]===0x05 && bytes[i+3]===0x06){ eocd = i; break; }
  }
  if(eocd < 0) return null; // não é um ZIP (logo, não é um .docx)
  const totalEntradas = dv.getUint16(eocd+10, true);
  let p = dv.getUint32(eocd+16, true); // onde começa a tabela central
  const decodificador = new TextDecoder("utf-8");
  for(let n = 0; n < totalEntradas; n++){
    if(p+46 > bytes.length || dv.getUint32(p, true) !== 0x02014b50) return null;
    const metodo    = dv.getUint16(p+10, true);
    const tamComp   = dv.getUint32(p+20, true);
    const tamNome   = dv.getUint16(p+28, true);
    const tamExtra  = dv.getUint16(p+30, true);
    const tamComent = dv.getUint16(p+32, true);
    const offLocal  = dv.getUint32(p+42, true);
    const nome = decodificador.decode(bytes.subarray(p+46, p+46+tamNome));
    if(nome === caminhoProcurado){
      // o cabeçalho local diz onde exatamente começam os bytes do conteúdo
      if(dv.getUint32(offLocal, true) !== 0x04034b50) return null;
      const inicio = offLocal + 30 + dv.getUint16(offLocal+26, true) + dv.getUint16(offLocal+28, true);
      const comprimido = buffer.slice(inicio, inicio + tamComp);
      if(metodo === 0) return decodificador.decode(new Uint8Array(comprimido)); // guardado sem compressão
      if(metodo !== 8) throw new Error("compressao-nao-suportada");
      if(typeof DecompressionStream !== "function") throw new Error("navegador-antigo");
      const fluxo = new Blob([comprimido]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
      return await new Response(fluxo).text();
    }
    p += 46 + tamNome + tamExtra + tamComent;
  }
  return null;
}

/* Converte o XML do Word em texto corrido, preservando as quebras de linha
   (é o que o script usa para separar PERGUNTA, A, B...). */
function xmlDoWordParaTexto(xml){
  let t = xml;
  t = t.replace(/<w:instrText[\s\S]*?<\/w:instrText>/g, "");   // códigos de campo (sumário, links)
  t = t.replace(/<w:delText[\s\S]*?<\/w:delText>/g, "");        // texto apagado com controle de alterações
  t = t.replace(/<w:tab\b[^>]*\/?>/g, "\t");
  t = t.replace(/<w:br\b[^>]*\/?>/g, "\n");
  t = t.replace(/<\/w:p>/g, "\n");                               // fim de parágrafo = quebra de linha
  t = t.replace(/<[^>]+>/g, "");                                 // todo o resto da marcação some
  t = t.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'")
       .replace(/&#x([0-9a-fA-F]+);/g, (m,h)=>String.fromCodePoint(parseInt(h,16)))
       .replace(/&#(\d+);/g, (m,d)=>String.fromCodePoint(parseInt(d,10)))
       .replace(/&amp;/g, "&");                                  // o & vem por último, senão desfaz os de cima
  return t;
}

/* Tira as sujeirinhas que o Word deixa e que atrapalham a leitura dos
   rótulos do script: espaço que não quebra, caractere invisível, linha de "="
   de tamanho variado, parágrafo vazio. */
function normalizarTextoDeProva(texto){
  return (texto||"")
    .replace(/\r\n?/g, "\n")
    .replace(/[   ]/g, " ")
    .replace(/[​‌‍⁠﻿­]/g, "")
    .split("\n").map(l=>l.replace(/[ \t]+$/, "")).join("\n")
    .replace(/^[ \t]*={3,}[ \t]*$/gm, "===")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/* Lê um arquivo escolhido pelo usuário e devolve o texto dele. */
async function lerArquivoDeProva(arquivo){
  const nome = (arquivo.name||"").toLowerCase();
  if(nome.endsWith(".doc")){
    throw new Error('O arquivo "'+arquivo.name+'" está no formato antigo .doc (Word 97-2003), que não pode ser aberto aqui. No Word, use "Salvar como" e escolha "Documento do Word (.docx)".');
  }
  if(nome.endsWith(".docx")){
    let xml = null;
    try{
      xml = await extrairDoZip(await arquivo.arrayBuffer(), "word/document.xml");
    }catch(e){
      if(e && e.message==="navegador-antigo") throw new Error("Este navegador não sabe abrir .docx. Atualize o navegador, ou salve o documento como .txt e envie novamente.");
      throw new Error('Não foi possível abrir "'+arquivo.name+'". Abra o documento no Word e salve de novo como .docx, ou salve como .txt.');
    }
    if(xml === null) throw new Error('"'+arquivo.name+'" não parece ser um documento do Word válido. Abra e salve novamente como .docx, ou salve como .txt.');
    return normalizarTextoDeProva(xmlDoWordParaTexto(xml));
  }
  const texto = await new Promise((resolve, reject)=>{
    const leitor = new FileReader();
    leitor.onload = e => resolve(e.target.result);
    leitor.onerror = () => reject(new Error('Não foi possível ler "'+arquivo.name+'".'));
    leitor.readAsText(arquivo);
  });
  return normalizarTextoDeProva(texto);
}

/* Quantas questões no formato do script existem neste texto. Avisar na hora
   que o arquivo veio fora do formato é mais barato do que deixar a pessoa
   clicar em Pré-visualizar e receber uma lista de erros. */
function contarQuestoesNoTexto(texto){
  const m = (texto||"").match(/^[ \t]*PERGUNTA[ \t]*:/gmi);
  return m ? m.length : 0;
}

/* Aceita vários arquivos de uma vez (uma prova por arquivo), na ordem escolhida. */
async function carregarArquivoImportacao(input){
  const arquivos = [...(input.files||[])];
  input.value = ""; // permite escolher o mesmo arquivo de novo depois
  if(!arquivos.length) return;
  const area = document.getElementById("textoImportacao");
  const partes = [];
  const falhas = [];
  for(const arq of arquivos){
    try{ partes.push(await lerArquivoDeProva(arq)); }
    catch(e){ falhas.push(e.message); }
  }
  falhas.forEach(msg => toast(msg, "err"));
  if(!partes.length) return;
  // vários arquivos entram um atrás do outro, separados pela linha do script
  const textoNovo = partes.join("\n===\n");
  const jaTinha = (area.value||"").trim();
  area.value = jaTinha ? jaTinha + "\n===\n" + textoNovo : textoNovo;
  const quantas = contarQuestoesNoTexto(textoNovo);
  if(!quantas){
    toast("O arquivo foi aberto, mas não tem nenhuma questão no formato do script (falta PERGUNTA:).", "err");
    document.getElementById("previewImportacao").innerHTML = renderAvisoArquivoForaDoFormato(arquivos.map(a=>a.name));
    return;
  }
  toast(quantas+" questão(ões) encontrada(s) em "+partes.length+" arquivo(s). Confira a pré-visualização abaixo.");
  previsualizarImportacao();
}
function renderAvisoArquivoForaDoFormato(nomes){
  return `<div class="card" style="border-color:var(--amber)">
    <div class="card-title">${iconeSvg("alert")} O arquivo abriu, mas não está no formato do script</div>
    <p class="text-sm">${escapeHtml(nomes.join(", "))} — o texto foi carregado no Passo 3, mas não há nenhuma linha começando com <strong>PERGUNTA:</strong>, que é como cada questão começa no script.</p>
    <p class="text-sm muted mt-1">O arquivo é só o transporte: o conteúdo dele precisa estar no formato do Passo 2. O caminho normal é copiar o prompt do Passo 2, colar numa IA junto com o PDF da prova, salvar a resposta num documento (.docx ou .txt) e enviar esse documento aqui.</p>
    <p class="text-sm muted mt-1">Enviar o PDF ou o Word original da prova, do jeito que a banca publicou, não funciona: ali não existe gabarito marcado nem explicação, e a plataforma não inventa nenhum dos dois.</p>
    <div class="flex gap-1 mt-2 quebra">
      <button class="btn btn-secondary btn-sm" onclick="copiarTexto(document.getElementById('promptImportacaoTexto').value,'Prompt copiado! Cole numa IA junto com a prova.')">Copiar o prompt do Passo 2</button>
      <button class="btn btn-ghost btn-sm" onclick="baixarModeloImportacao()">${iconeSvg("archive")} Baixar modelo preenchido</button>
    </div>
  </div>`;
}
/* Modelo com uma questão inteira preenchida, para quem prefere escrever a
   prova à mão no Word em vez de pedir a uma IA. */
function baixarModeloImportacao(){
  const ctx = contextoImportacao();
  const modelo =
    "INSTITUICAO: "+(ctx.instituicao||CONFIG.bancaFoco)+"\n"+
    "ANO: "+(ctx.ano||new Date().getFullYear())+"\n"+
    "===\n"+
    "PERGUNTA: Homem de 62 anos, hipertenso, chega ao pronto-socorro com dor torácica em aperto há 40 minutos. ECG mostra supradesnivelamento de ST em parede inferior. Qual a conduta imediata?\n"+
    "A: Angioplastia primária, se disponível em até 120 minutos\n"+
    "B: Apenas anticoagulação plena e observação\n"+
    "C: Teste ergométrico antes de qualquer conduta\n"+
    "D: Alta com sintomático e reavaliação ambulatorial\n"+
    "GABARITO: A\n"+
    "EXPLICACAO: Escreva aqui, com suas palavras, por que essa alternativa é a correta e por que as outras não são.\n"+
    "REFERENCIAS: Diretriz da sociedade de especialidade, com nome e ano.\n"+
    "AREA: Clínica Médica\n"+
    "ESPECIALIDADE: Cardiologia\n"+
    "ASSUNTO: Síndrome coronariana aguda\n"+
    "DIFICULDADE: intermediario\n"+
    "===\n"+
    "PERGUNTA: (repita o bloco acima para cada questão, sempre separado por uma linha com três sinais de igual)\n";
  baixarArquivo("modelo-prova-esc.txt", modelo, "text/plain;charset=utf-8");
  toast("Modelo baixado. Preencha no Word ou no bloco de notas e envie de volta aqui.");
}
/* ---------- leitura do texto colado ---------- */
/* `padroes` é opcional: quem chama de fora da tela de Importar Questões (a
   Central de Provas, por exemplo) passa a instituição e o ano da prova em vez
   de depender do que está digitado naquela tela. */
function parseImportText(texto, padroes){
  const rotulos = ["NUMERO","PERGUNTA","A","B","C","D","E","GABARITO","EXPLICACAO","REFERENCIAS","IMAGEM","LEGENDA","AREA","ESPECIALIDADE","ASSUNTO","BANCA","INSTITUICAO","ANO","TIPO","DIFICULDADE","STATUS"];
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
  /* 1) cabeçalho da prova: bloco sem PERGUNTA, só com instituição/ano/tipo.
     Pode aparecer mais de uma vez no mesmo texto — é o que acontece ao enviar
     dois arquivos de uma vez, cada um com a sua prova. Cada cabeçalho vale das
     questões seguintes até o próximo. */
  let instituicaoProva = (ctx.instituicao || CONFIG.bancaFoco).trim();
  let anoProva = parseInt(ctx.ano) || new Date().getFullYear();
  // o tipo de prova: o que o texto disser (na questão ou no cabeçalho), senão
  // o que a instituição diz (Teste de Progresso é graduação), senão o
  // escolhido na tela, senão o padrão
  let tipoDoCabecalho = "";
  const tipoDaTela = tipoProvaValido(ctx.tipoProva) ? ctx.tipoProva : CONFIG.tipoProvaPadrao;

  const assinaturasDoLote = {};
  const resultado = [];
  blocos.forEach(bloco=>{
    const campos = lerCampos(bloco);
    if(!campos.PERGUNTA){
      // sem enunciado: ou é cabeçalho de prova, ou é lixo (rodapé, "segue a
      // prova:", página em branco) — o cabeçalho passa a valer daqui para a
      // frente e nenhum dos dois vira questão
      const ehCabecalho = campos.INSTITUICAO || campos.BANCA || campos.ANO || campos.TIPO;
      if(campos.INSTITUICAO || campos.BANCA) instituicaoProva = (campos.INSTITUICAO || campos.BANCA).trim();
      if(parseInt(campos.ANO)) anoProva = parseInt(campos.ANO);
      if(campos.TIPO) tipoDoCabecalho = normalizarTipoProva(campos.TIPO);
      if(ehCabecalho || !bloco.trim()) return;
    }
    const idx = resultado.length;
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

    const banca = (campos.INSTITUICAO || campos.BANCA || instituicaoProva).trim();
    const imagem = lerCampoImagem(campos.IMAGEM);
    resultado.push({
      indice: idx+1, campos, erros, avisos, valido: erros.length===0,
      // a linha IMAGEM disse que tem figura / o enunciado fala de uma figura
      imagemIndicada: imagem.tem, imagemDescricao: imagem.descricao,
      pareceTerImagem: imagem.tem || enunciadoPedeImagem(campos.PERGUNTA),
      // número da questão na prova original, quando a linha NUMERO vier
      // preenchida: é o que permite conferir se um lote chegou completo
      numero: parseInt(campos.NUMERO) || null,
      duplicada, duplicadasBanco: duplicadasBanco.map(q=>q.id), duplicadaNoLote,
      importar: !duplicada,
      referencias: (campos.REFERENCIAS||"").trim(),
      imagemUrl: imagem.url,
      imagemLegenda: (campos.LEGENDA||"").trim(),
      areaId, especialidadeId: espId, assuntoId: assId,
      banca,
      tipoProva: normalizarTipoProva(campos.TIPO) || tipoDoCabecalho || (/progresso/i.test(banca) ? "graduacao" : tipoDaTela),
      tipoDoTexto: !!(normalizarTipoProva(campos.TIPO) || tipoDoCabecalho || /progresso/i.test(banca)),
      ano: parseInt(campos.ANO) || anoProva,
      status: ((campos.STATUS||"").trim().toLowerCase()==="anulada") ? "anulada" : null,
    });
  });
  return resultado;
}
/* A linha IMAGEM pode trazer um endereço (vira a imagem da questão) ou só
   dizer que a questão tem figura ("sim", ou uma descrição): aí a figura é
   anexada na pré-visualização. */
function lerCampoImagem(valor){
  const v = String(valor||"").trim();
  if(!v || /^(n[aã]o|nenhuma|-+|—)\.?$/i.test(v)) return {url:"", tem:false, descricao:""};
  if(/^(https?:\/\/|data:image\/|dados\/)/i.test(v)) return {url:v, tem:true, descricao:""};
  // "sim — ECG com supra de ST": o que vem depois do sim é a descrição
  return {url:"", tem:true, descricao: v.replace(/^sim\b[\s.,:;—–-]*/i, "").trim()};
}
// o enunciado fala de uma figura que não veio junto ("a imagem abaixo", "ECG a seguir")
function enunciadoPedeImagem(texto){
  return /\b(imagem|imagens|figura|foto|fotografia|radiografia|tomografia|resson[aâ]ncia|ultrassonografia|ecg|eletrocardiograma|gr[aá]fico|tra[cç]ado)\b[^.]{0,50}\b(abaixo|a seguir|anexa|anexo|anexada|seguinte|ao lado|acima)\b|\((imagem|figura)\)/i.test(String(texto||""));
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
/* Redesenha a pré-visualização no lugar, com o mesmo botão final de antes:
   na Central de Provas ele publica o lote, e não pode virar o "Importar" da
   outra tela só porque a pessoa desmarcou uma questão ou anexou uma figura. */
function redesenharPreviewImportacao(){
  const alvo = document.getElementById("previewImportacao");
  const resultado = state.filtroRota.previewImportacao;
  if(alvo && resultado) alvo.innerHTML = renderPreviewImportacaoHtml(resultado, state.filtroRota.previewImportacaoOpts);
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
function impMudarTipo(i, valor){
  const r = state.filtroRota.previewImportacao[i];
  if(tipoProvaValido(valor)) r.tipoProva = valor;
  redesenharPreviewImportacao();
}
function alternarImportacaoItem(i){
  const r = state.filtroRota.previewImportacao[i];
  r.importar = !r.importar;
  redesenharPreviewImportacao();
}

/* ---------- a figura de cada questão, anexada por quem está enviando ----------
   ECG, radiografia, foto de lesão: a IA não tem como devolver a figura no
   texto, então cada questão da pré-visualização tem o seu lugar para anexar
   o arquivo (reduzido e comprimido como no formulário de questão). Na
   Central de Provas a figura fica guardada com o lote até ele ser publicado —
   fechar o lote e voltar depois não a perde. */
function chaveImagemImportacao(r){ return r.numero ? "n"+r.numero : "i"+r.indice; }
function loteAbertoNaCentral(){
  if(state.route!=="central-provas") return null;
  const ctx = ctxCentralProvas();
  const carga = ctx.cargaAberta ? getCargaProva(ctx.cargaAberta) : null;
  return carga && ctx.loteAberto ? loteDaCarga(carga, ctx.loteAberto) : null;
}
function definirImagemImportacao(i, url){
  const r = state.filtroRota.previewImportacao && state.filtroRota.previewImportacao[i]; if(!r) return;
  r.imagemUrl = url || "";
  const lote = loteAbertoNaCentral();
  if(lote){
    lote.imagens = lote.imagens || {};
    if(r.imagemUrl) lote.imagens[chaveImagemImportacao(r)] = {url:r.imagemUrl, legenda:r.imagemLegenda||""};
    else delete lote.imagens[chaveImagemImportacao(r)];
    saveState();
  }
  redesenharPreviewImportacao();
}
function carregarImagemImportacao(i, input){ comprimirImagemDoArquivo(input, url=>definirImagemImportacao(i, url)); }
function definirImagemImportacaoPorUrl(i){
  const r = state.filtroRota.previewImportacao[i];
  const url = (window.prompt("Cole o endereço (URL) da imagem:", r.imagemUrl && !/^data:/.test(r.imagemUrl) ? r.imagemUrl : "")||"").trim();
  if(!url) return;
  definirImagemImportacao(i, url);
  toast("Link da imagem definido. Se o site dela sair do ar, a imagem some — enviar o arquivo é mais seguro.");
}
function removerImagemImportacao(i){ definirImagemImportacao(i, ""); toast("Imagem removida da questão."); }
function mudarLegendaImportacao(i, valor){
  const r = state.filtroRota.previewImportacao[i]; if(!r) return;
  r.imagemLegenda = String(valor||"").trim();
  const lote = loteAbertoNaCentral();
  if(lote && lote.imagens && lote.imagens[chaveImagemImportacao(r)]){ lote.imagens[chaveImagemImportacao(r)].legenda = r.imagemLegenda; saveState(); }
}
// devolve às questões relidas do texto do lote as figuras que já tinham sido anexadas
function aplicarImagensDoLote(resultado, lote){
  const imagens = (lote && lote.imagens) || {};
  resultado.forEach(r=>{
    const img = imagens[chaveImagemImportacao(r)];
    if(img && img.url){ r.imagemUrl = img.url; if(img.legenda) r.imagemLegenda = img.legenda; }
  });
  return resultado;
}
function htmlImagemDaImportacao(r, i){
  const falta = r.pareceTerImagem && !r.imagemUrl;
  return `<div class="imp-imagem mt-2 ${falta?"imp-imagem-falta":""}">
    <div class="label">${iconeSvg("upload")} Imagem da questão ${falta ? "— <strong>esta questão parece ter figura</strong>" : r.imagemUrl ? "" : "(opcional)"}</div>
    ${falta ? `<div class="text-xs mb-1">${r.imagemIndicada
      ? "A transcrição diz que há uma imagem"+(r.imagemDescricao?" ("+escapeHtml(r.imagemDescricao)+")":"")+". Anexe o recorte da prova. Se importar sem ela, a questão entra como <em>aguardando imagem</em> e fica fora do estudo até a figura chegar."
      : "O enunciado fala de uma figura. Se ela existir, anexe o recorte da prova — sem ela a questão não se resolve."}</div>` : ""}
    ${r.imagemUrl ? `<img class="imp-imagem-previa" src="${escapeHtml(r.imagemUrl)}" alt="${escapeHtml(r.imagemLegenda||"Imagem da questão")}">` : ""}
    <div class="flex gap-1 mt-1 quebra">
      <label class="btn ${falta?"btn-primary":"btn-secondary"} btn-sm" style="cursor:pointer">${iconeSvg("upload")} ${r.imagemUrl?"Trocar imagem":"Enviar imagem"}<input type="file" accept="image/*" style="display:none" onchange="carregarImagemImportacao(${i}, this)"></label>
      <button class="btn btn-ghost btn-sm" onclick="definirImagemImportacaoPorUrl(${i})">Usar link</button>
      ${r.imagemUrl ? `<button class="btn btn-ghost btn-sm" onclick="removerImagemImportacao(${i})">${iconeSvg("trash")} Remover</button>` : ""}
    </div>
    ${r.imagemUrl || r.pareceTerImagem ? `<input class="input mt-1" id="impLegenda-${i}" placeholder="Legenda (ex.: ECG de 12 derivações na admissão)" value="${escapeHtml(r.imagemLegenda||"")}" onchange="mudarLegendaImportacao(${i}, this.value)">` : ""}
  </div>`;
}
/* `opts.aoConfirmar` e `opts.rotulo` trocam só o botão do final: a tela de
   Importar Questões manda para o banco, a Central de Provas publica o lote e
   marca a faixa como concluída. O miolo (classificação, duplicidade, avisos)
   é exatamente o mesmo nos dois lugares. */
function renderPreviewImportacaoHtml(resultado, opts){
  opts = opts || {};
  state.filtroRota.previewImportacaoOpts = opts;
  const validas = resultado.filter(r=>r.valido && r.importar!==false).length;
  const duplicadas = resultado.filter(r=>r.duplicada).length;
  const semFigura = resultado.filter(r=>r.valido && r.importar!==false && r.pareceTerImagem && !r.imagemUrl).length;
  return `<div class="card">
    <div class="card-title">Pré-visualização: ${validas} de ${resultado.length} questão(ões) marcadas para importar</div>
    <p class="text-sm muted mb-2">Confira a classificação de cada questão. Onde a IA não acertou a especialidade ou o assunto, escolha um equivalente da lista ou crie um novo com o nome sugerido.</p>
    ${duplicadas ? `<div class="card-flat mb-2 text-sm borda-alerta">${iconeSvg("alert")} <strong>${duplicadas} questão(ões) já existem</strong> no banco ou se repetem dentro deste mesmo lote. Elas vêm desmarcadas — marque manualmente se quiser importar assim mesmo.</div>` : ""}
    ${semFigura ? `<div class="card-flat mb-2 text-sm borda-alerta">${iconeSvg("alert")} <strong>${semFigura} questão(ões) parecem ter figura</strong> e ainda estão sem imagem. Anexe cada uma no campo "Imagem da questão", logo abaixo da classificação.</div>` : ""}
    ${resultado.map((r,i)=>`<div class="card-flat mb-1" ${r.valido?"":'style="border-color:var(--danger)"'}>
      <div class="flex justify-between items-center quebra-gap-p">
        <span class="peso-600">Questão ${r.indice} · ${escapeHtml(r.banca)} ${r.ano}${r.status==="anulada"?" · anulada":""}</span>
          <span class="badge ${r.tipoProva==="graduacao"?"badge-amber":"badge-muted"}">${escapeHtml(infoTipoProva(r.tipoProva).nome)}</span>
        <span class="flex items-center gap-1">
          ${r.numero?`<span class="badge badge-muted">nº ${r.numero} na prova</span>`:""}
          ${r.duplicada?`<span class="badge badge-amber" title="${r.duplicadaNoLote?"repetida dentro do texto colado":"já existe no banco"}">duplicada${r.duplicadaNoLote?" (igual à nº "+r.duplicadaNoLote+")":""}</span>`:""}
          ${r.imagemUrl?'<span class="badge badge-accent">com imagem</span>':r.pareceTerImagem?'<span class="badge badge-amber">falta a imagem</span>':""}
          ${r.referencias?'<span class="badge badge-accent" title="'+escapeHtml(r.referencias)+'">com referência</span>':""}
          <span class="badge ${r.valido?"badge-accent":"badge-danger"}">${r.valido?"Pronta":"Com problema"}</span>
        </span>
      </div>
      ${r.valido?`<label class="checkbox-row mt-1"><input type="checkbox" ${r.importar!==false?"checked":""} onchange="alternarImportacaoItem(${i})"> Importar esta questão</label>`:""}
      ${r.duplicada && r.duplicadasBanco.length?`<div class="text-xs muted mt-1">Já no banco: <button class="link-btn" onclick="abrirQuestaoCompleta('${r.duplicadasBanco[0]}')">ver questão existente</button></div>`:""}
      <div class="text-sm mt-1">${escapeHtml((r.campos.PERGUNTA||"(sem enunciado)").slice(0,180))}…</div>
      ${r.erros.length ? `<div class="text-xs mt-1 texto-perigo">${r.erros.map(e=>escapeHtml(e)).join(" · ")}</div>` : ""}
      ${r.avisos.length ? `<div class="text-xs mt-1 texto-alerta">${iconeSvg("alert")} ${r.avisos.map(e=>escapeHtml(e)).join(" · ")}</div>` : ""}
      <div class="grid grid-3 mt-2">
        <div class="field sem-mb"><label class="label">Grande área</label>
          <select class="select" id="impArea-${i}" onchange="impMudarArea(${i})">${db.taxonomia.areas.map(a=>`<option value="${a.id}" ${r.areaId===a.id?"selected":""}>${escapeHtml(a.nome)}</option>`).join("")}</select></div>
        <div class="field sem-mb"><label class="label">Especialidade</label>
          <select class="select" id="impEsp-${i}" onchange="impMudarEsp(${i})">${htmlOpcoesEspecialidade(r.areaId, r.especialidadeId, r.campos.ESPECIALIDADE)}</select></div>
        <div class="field sem-mb"><label class="label">Assunto</label>
          <select class="select" id="impAss-${i}" onchange="impMudarAssunto(${i})">${htmlOpcoesAssunto(r.especialidadeId, r.assuntoId, r.campos.ASSUNTO)}</select></div>
      </div>
      <div class="grid grid-3 mt-2">
        <div class="field sem-mb"><label class="label">Tipo de prova</label>
          <select class="select" onchange="impMudarTipo(${i}, this.value)">${CONFIG.tiposProva.map(t=>`<option value="${t.id}" ${r.tipoProva===t.id?"selected":""}>${escapeHtml(t.nome)}</option>`).join("")}</select></div>
      </div>
      ${htmlImagemDaImportacao(r, i)}
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
  // cada confirmação é UM lote: as questões saem daqui com o mesmo loteId e o
  // mesmo instante, que é o que deixa Revisar Formatação mostrar "o que subiu
  // junto" em vez de uma lista corrida de centenas de questões
  const loteId = uid("lote");
  const importadoEm = new Date().toISOString();
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
      tipoProva: tipoProvaValido(r.tipoProva) ? r.tipoProva : CONFIG.tipoProvaPadrao,
      explicacoesAlternativas: {},
      dificuldadeManual: ["fundamental","intermediario","avancado"].includes((c.DIFICULDADE||"").trim().toLowerCase()) ? c.DIFICULDADE.trim().toLowerCase() : "intermediario",
      status: r.status || (destino==="sugerir" ? "pendente" : "ativa"),
      estatisticas: {respostas:0, acertos:0, distribuicaoAlternativas:{}},
      criadoPor: u.id, autorPapel: u.papel, criadoEm: hojeISO(),
      loteId, importadoEm,
    };
    if(destinoEhGrupo(destino)){ nova.grupoId = grupoDoDestino(u, destino).id; nova.status = r.status || "ativa"; }
    // rastro da prova de origem: o número da questão no caderno original é o
    // que permite depois conferir se a prova entrou inteira ou ficou buraco
    if(r.numero) nova.numeroNaProva = r.numero;
    if(extras.faseProva) nova.faseProva = extras.faseProva;
    // disseram que tem figura e ela não veio: a questão espera por ela fora do
    // estudo, como as das provas da pasta dados/ (ver aguardaImagem), e a
    // equipe a encontra em Banco de Questões > Status > Aguardando imagem
    if(!nova.imagemUrl && r.imagemIndicada){
      nova.imagemPendente = (r.imagemDescricao ? r.imagemDescricao.replace(/\.?$/, ".") : "uma figura que não foi anexada no envio.");
    }
    db.questoes.push(nova);
    idsCriados.push(nova.id);
    // com a nuvem, a questão (e a figura) sobe e chega à equipe — ver questoes_enviadas, seção 2-C
    nuvemMarcarQuestao(nova.id);
  });
  novosAssuntos = db.taxonomia.assuntos.length - antesAssuntos;
  saveState();
  const aguardandoImagem = idsCriados.filter(id=>aguardaImagem(getQuestao(id))).length;
  return {importadas: idsCriados.length, ignoradas, novosAssuntos, aguardandoImagem, ids: idsCriados};
}
function confirmarImportacao(){
  const resultado = state.filtroRota.previewImportacao || [];
  const destino = state.filtroRota.destinoImportacao || "ativa";
  const u = usuarioAtual();
  const r = importarItensAnalisados(resultado, destino);
  state.filtroRota.previewImportacao = null;
  toast(r.importadas+" questão(ões) importada(s)"+(r.ignoradas?" · "+r.ignoradas+" duplicada(s) ignorada(s)":"")+(r.novosAssuntos?" · "+r.novosAssuntos+" assunto(s) novo(s) criado(s)":"")+
    (r.aguardandoImagem?" · "+r.aguardandoImagem+" aguardando a imagem":"")+
    (destinoEhGrupo(destino) ? " — disponíveis para o seu grupo. Em Meu Grupo, dá para dividir o conjunto entre quem quiser."
      : nuvemConectado() ? (destino==="sugerir" ? " — subindo para a nuvem, onde esperam a aprovação da equipe." : " — subindo para a nuvem, para toda a turma.")
      : destino==="sugerir" ? " — aguardando aprovação de um professor." : "."));
  navigate(destinoEhGrupo(destino) ? "meu-grupo" : (u.papel==="aluno"||u.papel==="residente") ? "inicio" : "banco-questoes");
}
