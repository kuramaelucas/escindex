/* codigo/12c-questoes-para-atualizar.js — Questões para Atualizar: correções das questões de dados/ e o arquivo de atualizações (seção 26-D).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   26-D. QUESTÕES PARA ATUALIZAR (equipe e residentes)
   ==========================================================================
   Uma tela só com as questões que precisam de conserto — a figura da prova
   que não foi anexada, o texto cortado no material de origem, o rascunho
   que falta completar, a questão que os alunos sinalizaram ou que está
   marcada como desatualizada. Quem não é aluno conserta aqui mesmo (o
   formulário de edição de sempre, com o envio da imagem), e o conserto:

     1. vale na hora neste navegador;
     2. sobe para a NUVEM (tabela correcoes_questoes, a imagem no Storage) e
        desce para todo mundo — a questão consertada volta ao estudo da
        turma sem esperar ninguém mexer em arquivo;
     3. sai num arquivo com SÓ as questões atualizadas ("Baixar as
        atualizações"), que ferramentas/aplicar-atualizacoes.mjs grava nos
        arquivos da pasta dados/ (e as imagens em dados/imagens/). Depois
        de publicada a pasta, a correção fica igual à semente e some da
        lista sozinha; "Encerrar" limpa a linha da nuvem.

   A correção é sempre a DIFERENÇA entre a questão daqui e a da pasta dados/
   (correcaoDaQuestao), calculada na hora — nada de guardar uma segunda
   cópia de texto e imagem no navegador. Só os campos de conteúdo entram:
   a classificação (área, assunto), banca e ano continuam sendo decisão da
   pasta dados/, para um ajuste automático de taxonomia num navegador não
   virar "correção" para a turma inteira. */
const CAMPOS_CORRIGIVEIS = ["enunciado", "alternativas", "gabarito", "explicacaoGeral", "explicacoesAlternativas", "referencias",
  "imagemUrl", "imagemLegenda", "imagemPendente", "status", "motivoStatus"];
const MARCA_TEXTO_INCOMPLETO = /\[texto incompleto/i;

function podeAtualizarQuestoes(u){
  u = u || usuarioAtual();
  if(!u || state.modoAluno) return false;
  return u.papel === "residente" || podeGerirConteudo(u);
}
function sementeDaQuestao(id){ return sementesPorId("questoes", () => SEED_QUESTOES).get(id) || null; }

/* "vazio" é vazio de qualquer jeito: ausente, null, "" ou {} */
function valorDeConteudo(v){
  if(v === undefined || v === null || (typeof v === "string" && !v.trim())) return undefined;
  if(typeof v === "object" && !Array.isArray(v) && !Object.keys(v).length) return undefined;
  return v;
}
/* Para comparar, espaço nas pontas não conta: o formulário apara o texto, e
   abrir e salvar uma questão sem mexer não pode virar "correção". */
function jsonParaComparar(v){ return JSON.stringify(v, (k, x) => typeof x === "string" ? x.trim() : x); }
/* O arquivo em que a figura da correção entra na pasta dados/imagens/:
   o id da questão mais uma marca da própria figura (o carimbo do arquivo na
   nuvem, ou um resumo do conteúdo). Com o nome determinístico, a plataforma
   reconhece sozinha, depois de a pasta ser publicada, que aquela figura já
   está lá — e a correção sai da lista. */
function hashCurto(texto){
  let h = 5381;
  for(let i = 0; i < texto.length; i++) h = ((h << 5) + h + texto.charCodeAt(i)) >>> 0;
  return h.toString(36);
}
function arquivoDaImagemParaDados(qid, url){
  const m = /\/storage\/v1\/object\/public\/[^?#]*-([a-z0-9]+)\.[a-z0-9]+(?:[?#]|$)/i.exec(url || "");
  return "dados/imagens/" + qid + "-" + (m ? m[1] : hashCurto(String(url || ""))) + "." + extensaoDaImagem(url);
}
/* O que a questão daqui tem de diferente da pasta dados/: campos com valor
   novo e campos a apagar (o caso típico: imagemPendente, quando a figura
   chega). null quando não há diferença. */
function correcaoDaQuestao(q){
  const s = q && sementeDaQuestao(q.id); if(!s) return null;
  const campos = {}, remover = [];
  CAMPOS_CORRIGIVEIS.forEach(c => {
    const antes = valorDeConteudo(s[c]), agora = valorDeConteudo(q[c]);
    if(jsonParaComparar(antes) === jsonParaComparar(agora)) return;
    // a figura da nuvem (ou embutida) que a pasta dados/ já trouxe, com o
    // nome que "Baixar as atualizações" deu a ela
    if(c === "imagemUrl" && agora && /^(https?:|data:)/i.test(agora) && antes === arquivoDaImagemParaDados(q.id, agora)) return;
    if(agora === undefined) remover.push(c); else campos[c] = copiaProfunda(agora);
  });
  return (Object.keys(campos).length || remover.length) ? { campos, remover } : null;
}
function voltarQuestaoASemente(q, s){
  CAMPOS_CORRIGIVEIS.forEach(c => { if(s[c] === undefined) delete q[c]; else q[c] = copiaProfunda(s[c]); });
  if(s.imagemPendente) delete q.imagemLiberada;
}
/* Chamado por toda tela que muda uma questão: se ela é da pasta dados/, a
   diferença vira correção (e sobe); se voltou a ser igual à pasta, a
   correção que já estava na nuvem é encerrada. */
function registrarCorrecaoDaQuestao(qid){
  if(!sementeDaQuestao(qid)) return false;
  const q = getQuestao(qid); if(!q) return false;
  if(!db.correcoes) db.correcoes = {};
  const antes = db.correcoes[qid];
  const c = correcaoDaQuestao(q);
  if(c) db.correcoes[qid] = { porNome: (usuarioAtual() || {}).nome || "", em: hojeISO(), naNuvem: false };
  else delete db.correcoes[qid];
  if(c || (antes && antes.naNuvem)) nuvemMarcarCorrecao(qid);
  return true;
}

/* ---------- o que precisa de atualização ---------- */
function motivosParaAtualizar(q){
  const m = [];
  if(aguardaImagem(q)) m.push({ tipo: "imagem", rotulo: "Falta a figura", texto: q.imagemPendente });
  const textos = [q.enunciado, ...(q.alternativas || []).map(a => a && a.texto)].join(" ");
  if(MARCA_TEXTO_INCOMPLETO.test(textos)) m.push({ tipo: "texto", rotulo: "Texto cortado", texto: "Um trecho não veio no material de origem." });
  if(q.status === "rascunho") m.push({ tipo: "rascunho", rotulo: "Rascunho", texto: q.motivoStatus || "Fora do estudo até ser completada." });
  if(q.status === "desatualizada") m.push({ tipo: "desatualizada", rotulo: "Desatualizada", texto: q.motivoStatus || "Marcada como desatualizada." });
  if((q.sinalizacoes || []).length) m.push({ tipo: "sinalizada", rotulo: "Sinalizada", texto: q.sinalizacoes.length + " sinalização(ões) de aluno." });
  return m;
}
const TIPOS_DE_ATUALIZACAO = [
  { id: "imagem", nome: "Falta a figura" }, { id: "texto", nome: "Texto cortado" }, { id: "rascunho", nome: "Rascunho" },
  { id: "desatualizada", nome: "Desatualizada" }, { id: "sinalizada", nome: "Sinalizada por aluno" },
];
let _cacheParaAtualizar = null;
function questoesParaAtualizar(){
  if(_cacheParaAtualizar && _cacheParaAtualizar.geracao === _geracaoDb && _cacheParaAtualizar.lista0 === db.questoes && _cacheParaAtualizar.n === db.questoes.length) return _cacheParaAtualizar.itens;
  const itens = db.questoes.filter(q => !q.grupoId).map(q => ({ q, motivos: motivosParaAtualizar(q) })).filter(x => x.motivos.length);
  _cacheParaAtualizar = { geracao: _geracaoDb, lista0: db.questoes, n: db.questoes.length, itens };
  return itens;
}
/* As questões da pasta dados/ que têm correção — é exatamente o que vai no
   arquivo de atualizações. */
function questoesComCorrecao(){
  return db.questoes.filter(q => sementeDaQuestao(q.id)).map(q => ({ q, c: correcaoDaQuestao(q) })).filter(x => x.c);
}

function filtrosAtualizar(){
  if(!state.filtroRota.atualizar) state.filtroRota.atualizar = { tipo: "", banca: "", aba: "pendentes" };
  return state.filtroRota.atualizar;
}
function mudarFiltroAtualizar(campo, valor){ filtrosAtualizar()[campo] = valor; render(); }

function renderAtualizarQuestoes(){
  if(!podeAtualizarQuestoes()) return `<div class="empty-state"><h3>Acesso restrito</h3><p class="mt-2">Esta tela é da equipe e dos residentes.</p><button class="btn btn-primary mt-3" onclick="navigate('inicio')">Voltar ao início</button></div>`;
  const f = filtrosAtualizar();
  const todas = questoesParaAtualizar();
  const corrigidas = questoesComCorrecao();
  const naFila = ((db.nuvem && db.nuvem.globaisPendentes) || []).filter(p => p.tabela === "correcoes_questoes").length;
  const conta = tipo => todas.filter(x => x.motivos.some(m => m.tipo === tipo)).length;
  const bancas = [...new Set(todas.map(x => x.q.banca))].sort();
  let lista = todas;
  if(f.tipo) lista = lista.filter(x => x.motivos.some(m => m.tipo === f.tipo));
  if(f.banca) lista = lista.filter(x => x.q.banca === f.banca);
  lista = lista.slice().sort((a, b) => (a.q.banca || "").localeCompare(b.q.banca || "") || (a.q.ano - b.q.ano) || ((a.q.numeroNaProva || 0) - (b.q.numeroNaProva || 0)));
  const pag = paginar(lista, "atualizar-questoes", { porPagina: 15, assinatura: JSON.stringify([f.tipo, f.banca]) });
  const incorporadas = Object.keys(db.correcoes || {}).filter(id => { const q = getQuestao(id); return q && !correcaoDaQuestao(q); });
  const nuvem = nuvemConectado();
  return `
  <div class="page-header"><h2>Questões para Atualizar</h2><p>As questões que precisam de conserto — figura que falta, texto cortado, rascunho, desatualizada ou sinalizada. Enquanto esperam a figura, elas ficam fora do estudo dos alunos.</p></div>
  <div class="card mb-2">
    <div class="card-title">${iconeSvg("refresh")} Como funciona</div>
    <ol class="text-sm lista-passos">
      <li><strong>Conserte</strong> aqui: envie a figura, complete o texto, reveja o gabarito. Vale na hora neste navegador.</li>
      <li>${nuvem ? "O conserto <strong>sobe para a nuvem</strong> (a imagem vai junto) e chega a toda a turma — a questão volta ao estudo dos alunos." : "Com a sua conta da <strong>nuvem</strong>, o conserto sobe e chega a toda a turma. Sem ela, fica só neste navegador."}</li>
      <li><strong>Baixe as atualizações</strong>: um arquivo com <em>só</em> as questões consertadas, e as imagens. Na pasta do projeto, <code>npm run atualizar-dados -- arquivo.json</code> grava tudo nos arquivos de <code>dados/</code>.</li>
    </ol>
  </div>
  <div class="grid grid-4 mb-2">
    ${TIPOS_DE_ATUALIZACAO.slice(0, 4).map(t => `<button class="stat-mini${f.tipo === t.id ? " ativo" : ""}" onclick="mudarFiltroAtualizar('tipo', '${f.tipo === t.id ? "" : t.id}')"><div class="stat-value">${conta(t.id)}</div><div class="stat-label">${escapeHtml(t.nome)}</div></button>`).join("")}
  </div>
  <div class="card mb-2">
    <div class="flex justify-between items-center" style="flex-wrap:wrap;gap:.6rem">
      <div>
        <div class="card-title mb-02">${iconeSvg("download")} Atualizações para a pasta dados/</div>
        <div class="text-sm muted">${corrigidas.length
          ? `<strong>${corrigidas.length}</strong> questão(ões) consertada(s) ainda diferente(s) da pasta dados/${naFila ? ` · ${naFila} subindo agora…` : ""}.`
          : "Nenhuma questão consertada esperando para ir à pasta dados/."}</div>
        ${db.nuvem && db.nuvem.avisoImagens ? `<div class="text-xs mt-1 texto-alerta">${iconeSvg("alert")} ${escapeHtml(db.nuvem.avisoImagens)}</div>` : ""}
      </div>
      <div class="flex gap-1 quebra">
        ${nuvem ? `<button class="btn btn-secondary btn-sm" onclick="nuvemSincronizar({forcarRedesenho:true})">${iconeSvg("refresh")} Buscar da nuvem</button>` : ""}
        <button class="btn btn-primary btn-sm" onclick="baixarAtualizacoesParaDados()" ${corrigidas.length ? "" : "disabled"}>${iconeSvg("download")} Baixar as atualizações</button>
      </div>
    </div>
    ${corrigidas.length ? `<div class="table-wrap mt-2"><table><thead><tr><th>Questão</th><th>O que muda</th><th>Por</th><th></th></tr></thead><tbody>
      ${corrigidas.slice(0, 50).map(({ q, c }) => { const meta = (db.correcoes || {})[q.id] || {}; return `<tr>
        <td class="text-sm nowrap">${escapeHtml(q.banca)} ${q.ano}${q.numeroNaProva ? " · nº " + q.numeroNaProva : ""}</td>
        <td class="text-xs">${[...Object.keys(c.campos).map(k => rotuloCampoCorrigivel(k, c.campos[k])), ...c.remover.map(k => k === "imagemPendente" ? "figura liberada" : "sem " + rotuloCampoCorrigivel(k))].map(escapeHtml).join(", ")}</td>
        <td class="text-xs muted">${escapeHtml(meta.porNome || "—")}${meta.naNuvem ? ` <span class="badge badge-accent" title="Já está na nuvem">nuvem</span>` : (nuvem ? ` <span class="badge badge-amber">subindo</span>` : ` <span class="badge badge-muted">só aqui</span>`)}</td>
        <td class="flex gap-1"><button class="icon-btn" title="Ver" onclick="abrirQuestaoCompleta('${q.id}')">${iconeSvg("search")}</button><button class="icon-btn" title="Editar" onclick="abrirFormularioQuestao('${q.id}')">${iconeSvg("edit")}</button><button class="icon-btn" title="Desfazer ou encerrar o conserto (a questão volta ao que a pasta dados/ diz)" onclick="confirmarDesfazerCorrecao('${q.id}')">${iconeSvg("trash")}</button></td>
      </tr>`; }).join("")}
    </tbody></table></div>${corrigidas.length > 50 ? `<div class="text-xs muted mt-1">… e mais ${corrigidas.length - 50}. Todas vão no arquivo.</div>` : ""}` : ""}
    ${incorporadas.length ? `<div class="card-flat mt-2 text-sm">${iconeSvg("check")} ${incorporadas.length} correção(ões) já estão na pasta dados/ publicada.
      <button class="btn btn-ghost btn-sm" onclick="encerrarCorrecoesIncorporadas()">Encerrar na nuvem</button></div>` : ""}
  </div>
  <div class="card mb-2">
    <div class="flex gap-1 items-center quebra">
      <select class="select" style="max-width:220px" onchange="mudarFiltroAtualizar('tipo', this.value)" aria-label="O que falta">
        <option value="">Tudo o que falta (${todas.length})</option>
        ${TIPOS_DE_ATUALIZACAO.map(t => `<option value="${t.id}" ${f.tipo === t.id ? "selected" : ""}>${escapeHtml(t.nome)} (${conta(t.id)})</option>`).join("")}
      </select>
      <select class="select" style="max-width:220px" onchange="mudarFiltroAtualizar('banca', this.value)" aria-label="Instituição">
        <option value="">Todas as instituições</option>
        ${bancas.map(b => `<option value="${escapeHtml(b)}" ${f.banca === b ? "selected" : ""}>${escapeHtml(b)}</option>`).join("")}
      </select>
      <span class="text-sm muted">${lista.length} questão(ões)</span>
    </div>
  </div>
  ${lista.length ? pag.itens.map(({ q, motivos }) => `<div class="card mb-1">
    <div class="flex justify-between items-center quebra-gap-p">
      <span class="text-sm peso-600">${escapeHtml(q.banca)} ${q.ano}${q.numeroNaProva ? " · nº " + q.numeroNaProva : ""}</span>
      <span class="qcard-meta sem-m">${motivos.map(m => `<span class="badge ${m.tipo === "imagem" || m.tipo === "rascunho" ? "badge-amber" : m.tipo === "sinalizada" ? "badge-danger" : "badge-muted"}">${escapeHtml(m.rotulo)}</span>`).join("")}</span>
    </div>
    <div class="text-sm mt-1"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${q.id}')">${escapeHtml((q.enunciado || "").slice(0, 160))}${(q.enunciado || "").length > 160 ? "…" : ""}</span></div>
    ${motivos.map(m => `<div class="text-xs muted mt-1"><strong>${escapeHtml(m.rotulo)}:</strong> ${escapeHtml(m.texto)}</div>`).join("")}
    ${motivos.some(m => m.tipo === "imagem") && q.imagemUrl ? `<div class="text-xs muted mt-1">Arquivo esperado: <code>${escapeHtml(q.imagemUrl)}</code></div>` : ""}
    <div class="flex gap-1 mt-2 quebra">
      <button class="btn btn-primary btn-sm" onclick="abrirFormularioQuestao('${q.id}')">${iconeSvg("edit")} Consertar</button>
      ${motivos.some(m => m.tipo === "imagem") ? `<label class="btn btn-secondary btn-sm clicavel">${iconeSvg("upload")} Enviar a figura<input type="file" accept="image/*" style="display:none" onchange="enviarFiguraDaQuestao('${q.id}', this)"></label>` : ""}
      ${motivos.some(m => m.tipo === "sinalizada") ? `<button class="btn btn-ghost btn-sm" onclick="descartarSinalizacoes('${q.id}')">Descartar sinalizações</button>` : ""}
    </div>
  </div>`).join("") + controlesPaginacao(pag, "questão(ões)") : `<div class="empty-state">${todas.length ? "Nada com esses filtros." : "Nenhuma questão precisa de atualização. ✓"}</div>`}`;
}
function rotuloCampoCorrigivel(k, v){
  const nomes = { enunciado: "enunciado", alternativas: "alternativas", gabarito: "gabarito", explicacaoGeral: "explicação", explicacoesAlternativas: "explicações das alternativas",
    referencias: "referências", imagemUrl: "figura", imagemLegenda: "legenda da figura", imagemPendente: "aviso de figura", status: "status", motivoStatus: "motivo do status" };
  if(k === "gabarito" && v) return "gabarito → " + v;
  if(k === "status" && v) return "status → " + v;
  return nomes[k] || k;
}
/* Atalho da lista: a figura chega direto, sem abrir o formulário inteiro. */
function enviarFiguraDaQuestao(qid, input){
  comprimirImagemDoArquivo(input, dataUrl => {
    const q = getQuestao(qid); if(!q) return;
    q.imagemUrl = dataUrl;
    if(q.imagemPendente){ delete q.imagemPendente; q.imagemLiberada = true; }
    registrarCorrecaoDaQuestao(qid);
    nuvemMarcarQuestao(qid);
    saveState();
    toast("Figura anexada: a questão volta ao estudo dos alunos" + (nuvemConectado() ? " e o conserto sobe para a nuvem." : " deste navegador."));
    render();
  });
}
function confirmarDesfazerCorrecao(qid){
  abrirModal(`${cabecalhoJanela("Desfazer o conserto")}
    <p class="text-sm">A questão volta a ser exatamente o que está na pasta dados/ — texto, gabarito e figura.${nuvemConectado() ? " A correção sai da nuvem e dos outros aparelhos também." : ""}</p>
    <div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="desfazerCorrecao('${qid}')">Desfazer</button><button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button></div>`);
}
function desfazerCorrecao(qid){
  const q = getQuestao(qid), s = sementeDaQuestao(qid);
  if(!q || !s){ fecharModal(); return; }
  voltarQuestaoASemente(q, s);
  registrarCorrecaoDaQuestao(qid);
  saveState(); fecharModal(); toast("Conserto desfeito."); render();
}
/* Correções que a pasta dados/ publicada já traz: a linha da nuvem não tem
   mais o que fazer, e sai (para ninguém baixá-la de novo). */
function encerrarCorrecoesIncorporadas(){
  const ids = Object.keys(db.correcoes || {}).filter(id => { const q = getQuestao(id); return q && !correcaoDaQuestao(q); });
  ids.forEach(id => registrarCorrecaoDaQuestao(id));
  saveState();
  toast(ids.length + " correção(ões) encerrada(s)" + (nuvemConectado() ? " — saem da nuvem na próxima sincronização." : "."));
  render();
}

/* ---------- o arquivo de atualizações ----------
   Só as questões consertadas, com a diferença de cada uma e as figuras
   dentro do próprio arquivo (a da nuvem é baixada e embutida; se não der,
   vai o endereço, e a ferramenta baixa). O formato é lido por
   ferramentas/aplicar-atualizacoes.mjs. */
function extensaoDaImagem(url){
  const tipo = (/^data:image\/([a-z+]+)/i.exec(url || "") || [])[1];
  if(tipo) return { jpeg: "jpg", "svg+xml": "svg" }[tipo.toLowerCase()] || tipo.toLowerCase();
  const m = /\.(png|jpe?g|webp|gif)(\?|#|$)/i.exec(url || "");
  return m ? m[1].toLowerCase().replace("jpeg", "jpg") : "jpg";
}
function blobParaDataUrl(blob){
  return new Promise((ok, falha) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = falha; r.readAsDataURL(blob); });
}
async function montarArquivoDeAtualizacoes(){
  const itens = questoesComCorrecao();
  const questoes = [];
  let semImagemEmbutida = 0;
  for(const { q, c } of itens){
    const campos = copiaProfunda(c.campos);
    let imagem = null;
    if(campos.imagemUrl && /^(data:|https?:)/i.test(campos.imagemUrl)){
      const arquivo = arquivoDaImagemParaDados(q.id, campos.imagemUrl);
      imagem = { arquivo };
      if(/^data:/i.test(campos.imagemUrl)) imagem.dataUrl = campos.imagemUrl;
      else{
        try{
          const r = await fetch(campos.imagemUrl);
          if(!r.ok) throw new Error("HTTP " + r.status);
          imagem.dataUrl = await blobParaDataUrl(await r.blob());
        }catch(e){ imagem.url = campos.imagemUrl; semImagemEmbutida++; }
      }
      campos.imagemUrl = arquivo;
    }
    questoes.push({ id: q.id, banca: q.banca, ano: q.ano, numeroNaProva: q.numeroNaProva || null, campos, remover: c.remover, imagem });
  }
  const u = usuarioAtual() || {};
  return { conteudo: { formato: "esc-atualizacoes-questoes", versao: 1, geradoEm: new Date().toISOString(), por: u.nome || "", total: questoes.length, questoes }, semImagemEmbutida };
}
async function baixarAtualizacoesParaDados(){
  if(!podeAtualizarQuestoes()){ toast("Esta ação é da equipe e dos residentes.", "err"); return; }
  if(!questoesComCorrecao().length){ toast("Nenhuma questão consertada para baixar.", "err"); return; }
  toast("Montando o arquivo com as questões consertadas…");
  const { conteudo, semImagemEmbutida } = await montarArquivoDeAtualizacoes();
  const nome = "atualizacoes-questoes-" + hojeISO() + ".json";
  baixarArquivo(nome, JSON.stringify(conteudo, null, 1), "application/json");
  toast(conteudo.total + " questão(ões) no arquivo " + nome + ". Na pasta do projeto: npm run atualizar-dados -- " + nome +
    (semImagemEmbutida ? " (" + semImagemEmbutida + " figura(s) vão pelo endereço da nuvem; a ferramenta baixa)." : "."));
}
