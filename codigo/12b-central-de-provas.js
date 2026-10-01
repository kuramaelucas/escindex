/* codigo/12b-central-de-provas.js — Central de Provas: uma prova inteira, em lotes (seção 26-B).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

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
function nomeDaCarga(c){ return c.instituicao+" "+c.ano+(c.fase?" · "+c.fase:"")+(tipoDaCarga(c)!==CONFIG.tipoProvaPadrao?" · "+infoTipoProva(tipoDaCarga(c)).nome:""); }
// cargas criadas antes do tipo de prova existir são de residência (o padrão)
function tipoDaCarga(c){ return tipoProvaValido(c && c.tipoProva) ? c.tipoProva : (/progresso/i.test((c&&c.instituicao)||"") ? "graduacao" : CONFIG.tipoProvaPadrao); }
// o que parseImportText precisa saber da prova, venha o texto de onde vier
function padroesDaCarga(c){ return {instituicao:c.instituicao, ano:c.ano, tipoProva:tipoDaCarga(c)}; }

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
  return opcoesDestinoImportacao().filter(([v])=>!destinoEhGrupo(v));
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
  const tipoProva = tipoProvaValido(valor("cpTipoProva")) ? valor("cpTipoProva") : CONFIG.tipoProvaPadrao;
  const igual = cargasProvas().find(c=>c.instituicao.toLowerCase()===instituicao.toLowerCase() && c.ano===ano && (c.fase||"").toLowerCase()===fase.toLowerCase());
  if(igual){
    toast("Já existe uma prova aberta para "+nomeDaCarga(igual)+" — abri ela para você, em vez de criar outra igual.", "err");
    ctxCentralProvas().cargaAberta = igual.id; ctxCentralProvas().loteAberto = null; render(); return;
  }
  const carga = {
    id: uid("carga"), instituicao, ano, fase, tipoProva, totalQuestoes: total, tamanhoLote: tamanho, destino,
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
  abrirModal(`${cabecalhoJanela("Descartar o acompanhamento desta prova?")}
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
  return "Você vai transcrever UM PEDAÇO de uma prova pública "+descricaoProvaNoPrompt(tipoDaCarga(carga))+" para um formato de texto que a plataforma Esc lê automaticamente.\n\n"+
  "PROVA: "+carga.instituicao+" · "+carga.ano+(carga.fase?" · "+carga.fase:"")+"\n"+
  "PEDAÇO DESTE LOTE: "+faixa+" ("+quantas+" questão(ões), nem mais nem menos)\n\n"+
  "Transcreva SOMENTE "+faixa+". Não adiante questões de outros trechos, não volte às anteriores e não invente questão nenhuma para fechar a conta: se a prova terminar antes do número "+lote.fim+", escreva isso numa linha depois do último bloco, em vez de completar.\n\n"+
  "Comece a resposta exatamente assim, sem nada antes:\n\n"+
  "INSTITUICAO: "+carga.instituicao+"\n"+
  "ANO: "+carga.ano+"\n"+
  "TIPO: "+infoTipoProva(tipoDaCarga(carga)).nome+"\n"+
  "===\n\n"+
  "Depois, para CADA questão, na ordem da prova, um bloco exatamente neste formato — sem markdown (a única marcação permitida são os ** em volta de parâmetros objetivos dentro de EXPLICACAO), sem numeração extra, sem comentários seus:\n\n"+
  "NUMERO: [número da questão na prova, de "+lote.inicio+" a "+lote.fim+"]\n"+
  "PERGUNTA: [enunciado completo da questão, incluindo o caso clínico se houver]\n"+
  "A: [texto da alternativa A]\nB: [texto da alternativa B]\nC: [texto da alternativa C]\nD: [texto da alternativa D]\nE: [texto da alternativa E — apague esta linha se a prova tiver só 4 alternativas]\n"+
  "GABARITO: [letra correta]\n"+
  "EXPLICACAO: [explicação clínica objetiva, escrita com suas próprias palavras: por que a alternativa do gabarito está certa e, em seguida, por que cada uma das outras está errada, apontando no enunciado o dado que descarta cada uma — tudo em texto corrido, sem quebra de linha]\n"+
  "REFERENCIAS: [as fontes que sustentam a explicação: diretriz/consenso de sociedade de especialidade, protocolo do Ministério da Saúde, PCDT, revisão sistemática ou artigo primário, com nome e ano]\n"+
  linhaImagemDoPrompt()+
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
  abrirModal(`${cabecalhoJanela(`Modelo de construção — questões ${lote.inicio} a ${lote.fim}`)}
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
    state.filtroRota.previewImportacao = aplicarImagensDoLote(parseImportText(lote.textoBruto, padroesDaCarga(carga)), lote);
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
  const resultado = aplicarImagensDoLote(parseImportText(texto, padroesDaCarga(carga)), lote);
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
  lote.textoBruto = ""; lote.resumo = null; lote.status = "pendente"; lote.recebidoEm = null; delete lote.imagens;
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
    : aplicarImagensDoLote(parseImportText(lote.textoBruto||"", padroesDaCarga(carga)), lote);
  const r = importarItensAnalisados(resultado, carga.destino, {faseProva: carga.fase||""});
  if(!r.importadas){ if(!silencioso) toast("Nenhuma questão deste lote está marcada para publicar.", "err"); return null; }
  lote.status = "publicado";
  lote.publicadoEm = hojeISO();
  lote.questaoIds = r.ids;
  lote.resumo = Object.assign({}, lote.resumo||{}, {publicadas:r.importadas, ignoradas:r.ignoradas});
  // o rascunho já virou questão no banco: guardar o texto (e as figuras) de
  // novo só ocuparia espaço do navegador duas vezes
  lote.textoBruto = "";
  delete lote.imagens;
  if(ctx.loteAberto===loteId){ ctx.loteAberto = null; state.filtroRota.previewImportacao = null; }
  saveState();
  if(!silencioso){
    toast(r.importadas+" questão(ões) publicada(s)"+(r.ignoradas?" · "+r.ignoradas+" duplicada(s) ignorada(s)":"")+(r.novosAssuntos?" · "+r.novosAssuntos+" assunto(s) novo(s)":"")+
      (r.aguardandoImagem?" · "+r.aguardandoImagem+" aguardando a imagem":"")+
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
  abrirModal(`${cabecalhoJanela(`Publicar ${conferidos.length===1?"o lote conferido":"os "+conferidos.length+" lotes conferidos"} no banco?`)}
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
    <div class="grid grid-4 mt-2">
      <div class="field" style="margin-bottom:0"><label class="label">Tipo de prova</label>
        <select class="select" id="cpTipoProva">${CONFIG.tiposProva.map(t=>`<option value="${t.id}" ${t.id===CONFIG.tipoProvaPadrao?"selected":""} title="${escapeHtml(t.descricao)}">${escapeHtml(t.nome)}${t.id===CONFIG.tipoProvaPadrao?" (padrão)":""}</option>`).join("")}</select></div>
      <div class="field" style="margin-bottom:0"><label class="label">Instituição</label>
        <input class="input" id="cpInstituicao" list="listaBancasCarga" value="${escapeHtml(CONFIG.bancaFoco)}">
        <datalist id="listaBancasCarga">${[...new Set([...CONFIG.instituicoesReferencia, ...CONFIG.instituicoesGraduacao, ...db.questoes.map(q=>q.banca)])].map(b=>`<option value="${escapeHtml(b)}"></option>`).join("")}</datalist>
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
    <p>Tipo de prova: ${escapeHtml(infoTipoProva(tipoDaCarga(carga)).nome)} · ${carga.totalQuestoes} questões declaradas, divididas em ${(carga.lotes||[]).length} lote(s) de até ${carga.tamanhoLote}. Destino ao publicar: ${escapeHtml(rotuloDestino)}.</p>
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
