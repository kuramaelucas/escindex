/* codigo/10a-favoritos-historico-desempenho.js — Favoritos (16), Livro de Ouro (16-A), Histórico de Atividade (16-B) e Meu Desempenho (17).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   16. FAVORITOS
   ========================================================================== */
/* Favoritos guarda duas coisas diferentes — questões e cartões —, e por isso
   tem duas abas em vez de uma lista misturada: quem vem procurar "aquela
   questão de choque séptico" não quer tropeçar em cartão de conceito no
   meio, e vice-versa. A contagem de cada aba fica na própria aba, para a
   escolha ser feita sem entrar nas duas.

   A terceira aba guarda o contrário do favorito: as questões que a pessoa
   RETIROU da revisão ("não mostrar mais"). Ficam aqui, do lado de quem se
   quer rever, porque são as duas listas manuais da pessoa — o que ela pediu
   para ver de novo e o que ela pediu para nunca mais ver — e é o lugar
   onde se procura para desfazer a escolha. */
function abaFavoritos(){
  const f = state.filtroRota;
  if(!["cartoes","questoes","retiradas"].includes(f.abaFavoritos)) f.abaFavoritos = "questoes";
  return f.abaFavoritos;
}
/* As questões que a pessoa escondeu, da mais recente para a mais antiga. */
function questoesRetiradasDaRevisao(usuarioId){
  return (db.questoesOcultas||[]).filter(o=>o.usuarioId===usuarioId)
    .map(o=>({reg:o, q:getQuestao(o.questaoId)})).filter(x=>x.q)
    .sort((a,b)=>(b.reg.data||"").localeCompare(a.reg.data||""));
}
function mudarAbaFavoritos(aba){ state.filtroRota.abaFavoritos = aba; render(); }
function renderFavoritos(){
  const u = usuarioAtual();
  const cartoes = meusCartoesFavoritos(u.id);
  const aba = abaFavoritos();
  const favs = db.favoritos.filter(f=>f.usuarioId===u.id).map(f=>({reg:f, q:getQuestao(f.questaoId)})).filter(x=>x.q)
    .sort((a,b)=>(b.reg.data||"").localeCompare(a.reg.data||""));
  const comNota = favs.filter(x=>(x.reg.nota||"").trim()).length;
  const pag = paginar(favs, "favoritos");
  const retiradas = questoesRetiradasDaRevisao(u.id);
  const abas = `<div class="flex gap-1 mb-2 quebra">
    <button class="pill ${aba==="questoes"?"active":""}" onclick="mudarAbaFavoritos('questoes')">${iconeSvg("book")} Questões (${favs.length})</button>
    <button class="pill ${aba==="cartoes"?"active":""}" onclick="mudarAbaFavoritos('cartoes')">${iconeSvg("cards")} Flashcards (${cartoes.length})</button>
    <button class="pill ${aba==="retiradas"?"active":""}" onclick="mudarAbaFavoritos('retiradas')">${iconeSvg("eye-off")} Retiradas da revisão (${retiradas.length})</button>
  </div>`;
  const cabecalho = `<div class="page-header"><h2>Favoritos</h2><p>O que você salvou para rever — questões e flashcards — e, na terceira aba, o que você tirou da revisão.</p></div>`;
  if(aba === "cartoes") return `
  ${cabecalho}
  ${abas}
  ${renderFavoritosCartoes(u, cartoes)}`;
  if(aba === "retiradas") return `
  ${cabecalho}
  ${abas}
  ${renderQuestoesRetiradas(u, retiradas)}`;
  return `
  ${cabecalho}
  ${abas}
  <p class="text-sm muted mb-2">${favs.length} questão(ões) marcada(s)${comNota?`, ${comNota} com anotação sua`:""}. Abra qualquer uma na íntegra, pratique só ela ou pratique todas em sequência.</p>
  ${favs.length ? `<div class="flex gap-1 mb-2 quebra"><button class="btn btn-primary" onclick="praticarFavoritas()">${iconeSvg("book")} Praticar todas as favoritas</button></div>` : ""}
  ${favs.length ? pag.itens.map(({reg,q})=>{
    const area = getArea(q.areaId);
    const ult = ultimaResposta(u.id, q.id);
    return `<div class="card mb-1">
      <div class="qcard-meta mb-1">
        <span class="badge badge-accent">${escapeHtml(area?area.nome:"—")}</span>
        <span class="badge badge-muted">${escapeHtml(nomeAssunto(q.assuntoId))}</span>
        <span class="badge badge-muted">${escapeHtml(q.banca)} · ${anoDaProva(q)}</span>
        ${ult ? `<span class="badge ${ult.correta?"badge-accent":"badge-danger"}">última: ${ult.correta?"acertou":"errou"}</span>` : '<span class="badge badge-muted">ainda não respondida</span>'}
        ${errosNaQuestao(u.id, q.id) ? `<span class="badge badge-danger">errada ${rotuloVezes(errosNaQuestao(u.id, q.id))}</span>` : ""}
      </div>
      <div class="text-sm"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${q.id}')">${escapeHtml(q.enunciado.slice(0,200))}${q.enunciado.length>200?"…":""}</span></div>
      ${(reg.nota||"").trim() ? `<div class="nota-pessoal mt-2"><div class="nota-pessoal-titulo">${iconeSvg("message")} Minha anotação</div><div class="text-sm">${escapeHtml(reg.nota)}</div></div>` : ""}
      <div class="flex gap-1 mt-2 quebra">
        ${botaoVerNaIntegra(q.id, "Abrir questão completa")}
        <button class="btn btn-secondary btn-sm" onclick="praticarSoEstaQuestao('${q.id}')">${iconeSvg("book")} Praticar só esta</button>
        <button class="btn btn-secondary btn-sm" onclick="abrirNotaFavorita('${q.id}')">${iconeSvg("message")} ${(reg.nota||"").trim()?"Editar anotação":"Anotar uma dúvida"}</button>
        <button class="btn btn-ghost btn-sm" onclick="toggleFavoritoUI('${q.id}')">${iconeSvg("star")} Remover dos favoritos</button>
      </div>
      <div class="text-xs muted mt-1">Favoritada em ${formatDataBR(reg.data||hojeISO())}</div>
    </div>`;
  }).join("") : '<div class="empty-state">Você ainda não favoritou nenhuma questão. Use o botão "Favoritar" durante uma sessão de estudo.</div>'}
  ${controlesPaginacao(pag, "favorita(s)")}
  `;
}
function renderQuestoesRetiradas(u, retiradas){
  const pag = paginar(retiradas, "favoritos-retiradas", {porPagina:10});
  return `
  <p class="text-sm muted mb-2">${retiradas.length} questão(ões) que você pediu para não ver mais. Elas continuam no banco, nas provas antigas e nos seus números — só não voltam nas suas sessões, revisões e listas.</p>
  ${retiradas.length>1 ? `<div class="flex gap-1 mb-2"><button class="btn btn-secondary btn-sm" onclick="mostrarTodasAsEscondidas()">${iconeSvg("eye")} Voltar a mostrar todas</button></div>` : ""}
  ${retiradas.length ? pag.itens.map(({reg,q})=>{
    const n = errosNaQuestao(u.id, q.id);
    return `<div class="card mb-1">
      <div class="qcard-meta mb-1">
        <span class="badge badge-muted">${escapeHtml(nomeAssunto(q.assuntoId))}</span>
        <span class="badge badge-muted">${escapeHtml(q.banca)} · ${anoDaProva(q)}</span>
        ${n ? `<span class="badge badge-danger">errada ${rotuloVezes(n)}</span>` : ""}
      </div>
      <div class="text-sm"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${q.id}')">${escapeHtml(q.enunciado.slice(0,200))}${q.enunciado.length>200?"…":""}</span></div>
      <div class="flex gap-1 mt-2 quebra">
        ${botaoVerNaIntegra(q.id, "Abrir questão completa")}
        <button class="btn btn-secondary btn-sm" onclick="alternarQuestaoOcultaUI('${q.id}')">${iconeSvg("eye")} Voltar a mostrar</button>
      </div>
      <div class="text-xs muted mt-1">Retirada em ${formatDataBR(reg.data||hojeISO())}</div>
    </div>`;
  }).join("") : '<div class="empty-state">Nenhuma questão retirada. Depois de errar uma questão pela segunda vez, o botão "Não mostrar mais" permite tirá-la da sua revisão.</div>'}
  ${controlesPaginacao(pag, "questão(ões) retirada(s)")}
  `;
}
function renderFavoritosCartoes(u, cartoes){
  const pag = paginar(cartoes, "favoritos-cartoes");
  return `
  <p class="text-sm muted mb-2">${cartoes.length} cartão(ões) salvo(s). Salvar não muda a repetição espaçada: o cartão continua voltando na data dele — isto aqui é a sua pilha de "quero rever este conceito".</p>
  ${cartoes.length ? `<div class="flex gap-1 mb-2 quebra"><button class="btn btn-primary" onclick="revisarCartoesFavoritos()">${iconeSvg("cards")} Revisar os cartões salvos</button></div>` : ""}
  ${cartoes.length ? pag.itens.map(({reg,cartao})=>{
    const rev = revisaoDoCartao(u.id, cartao.id);
    return `<div class="card mb-1">
      <div class="qcard-meta mb-1">
        <span class="badge badge-accent">${escapeHtml(nomeAssuntoDoCartao(cartao))}</span>
        ${cartao.usuarioId ? '<span class="badge badge-muted">meu cartão</span>' : '<span class="badge badge-muted">cartão da equipe</span>'}
        ${cartao.origem==="questao" ? '<span class="badge badge-muted">gerado de uma questão</span>' : ""}
        ${rev && rev.proximaRevisao ? `<span class="badge badge-muted">volta em ${formatDataBR(proximaRevisaoCartao(rev))}</span>` : '<span class="badge badge-muted">ainda não revisado</span>'}
      </div>
      <div class="text-sm peso-600">${escapeHtml(cartao.frente)}</div>
      <div class="text-sm muted mt-1">${escapeHtml(cartao.verso.slice(0,220))}${cartao.verso.length>220?"…":""}</div>
      <div class="flex gap-1 mt-2 quebra">
        <button class="btn btn-secondary btn-sm" onclick="revisarSoEsteCartao('${cartao.id}')">${iconeSvg("cards")} Revisar só este</button>
        ${cartao.origem==="questao" && cartao.questaoId ? botaoVerNaIntegra(cartao.questaoId, "Ver a questão de origem") : ""}
        ${podeMexerNoCartao(cartao) ? `<button class="btn btn-secondary btn-sm" onclick="abrirFormularioFlashcard('${cartao.id}')">${iconeSvg("edit")} Editar</button>` : ""}
        <button class="btn btn-ghost btn-sm" onclick="toggleFavoritoCartaoUI('${cartao.id}')">${iconeSvg("star")} Tirar dos favoritos</button>
      </div>
      <div class="text-xs muted mt-1">Salvo em ${formatDataBR(reg.data||hojeISO())}</div>
    </div>`;
  }).join("") : '<div class="empty-state">Nenhum cartão salvo ainda. Na Revisão Rápida, use a estrela no alto do cartão para guardar o que você quer rever de novo.</div>'}
  ${controlesPaginacao(pag, "cartão(ões)")}
  `;
}
/* Revisar só o que foi salvo: mesma sessão de sempre, com o baralho trocado.
   Serve para a véspera da prova, quando a pessoa quer rever a pilha dela e
   não o que a repetição espaçada escolheria. */
function revisarCartoesFavoritos(){
  const u = usuarioAtual();
  const cartoes = meusCartoesFavoritos(u.id).map(x=>x.cartao);
  if(!cartoes.length){ toast("Você ainda não salvou nenhum cartão.", "err"); return; }
  state.sessaoFlash = { cartoes: embaralhar(cartoes.slice()), indice:0, virado:false, notas:[], finalizada:false };
  navigate("flashcards");
}
function revisarSoEsteCartao(cartaoId){
  const cartao = getFlashcard(cartaoId);
  if(!cartao){ toast("Cartão não encontrado.", "err"); return; }
  state.sessaoFlash = { cartoes:[cartao], indice:0, virado:false, notas:[], finalizada:false };
  navigate("flashcards");
}
function praticarFavoritas(){
  const u = usuarioAtual();
  const favs = db.favoritos.filter(f=>f.usuarioId===u.id).map(f=>getQuestao(f.questaoId)).filter(Boolean);
  iniciarSessaoComLista(favs.map(q=>({questaoId:q.id, motivo:"Questão favoritada"})), "pratica");
}

/* ==========================================================================
   16-A. LIVRO DE OURO — doações, apoios e agradecimentos
   ==========================================================================
   Página aberta a todos os usuários. Além dos registros cadastrados à mão
   pela coordenação, a plataforma calcula sozinha um reconhecimento com base
   no que cada pessoa realmente fez aqui dentro (questões enviadas, dúvidas
   respondidas, problemas sinalizados). */
function tiposLivroOuro(){
  return {
    doacao:      {nome:"Doação",       badge:"badge-accent",  icone:"star"},
    colaboracao: {nome:"Colaboração",  badge:"badge-muted", icone:"users"},
    apoio:       {nome:"Apoio",        badge:"badge-muted",  icone:"check"},
  };
}
function contribuicoesAutomaticas(){
  const porUsuario = {};
  const garantir = (id)=>{ if(!id || id==="seed") return null; if(!porUsuario[id]) porUsuario[id] = {usuarioId:id, questoes:0, respostas:0, sinalizacoes:0}; return porUsuario[id]; };
  db.questoes.forEach(q=>{
    if(q.criadoPor==="seed") return;
    const reg = garantir(q.criadoPor); if(reg && q.status!=="pendente") reg.questoes++;
  });
  comentariosAtivos().filter(c=>c.respostaOficial).forEach(c=>{ const reg = garantir(c.usuarioId); if(reg) reg.respostas++; });
  db.questoes.forEach(q=>(q.sinalizacoes||[]).forEach(sig=>{ const reg = garantir(sig.usuarioId); if(reg) reg.sinalizacoes++; }));
  return Object.values(porUsuario)
    .map(r=>({...r, total: r.questoes + r.respostas + r.sinalizacoes, usuario: getUsuario(r.usuarioId)}))
    .filter(r=>r.usuario && r.total>0)
    .sort((a,b)=>b.total-a.total);
}
function renderLivroOuro(){
  const podeEditar = podeAdmin("livro-ouro");
  const registros = (db.livroOuro||[]).slice().sort((a,b)=>(b.destaque?1:0)-(a.destaque?1:0) || (b.data||"").localeCompare(a.data||""));
  const tipos = tiposLivroOuro();
  const automaticas = contribuicoesAutomaticas().slice(0,10);
  const porTipo = (t)=>registros.filter(r=>r.tipo===t);
  const secao = (t, titulo, subtitulo)=>{
    const lista = porTipo(t);
    if(!lista.length) return "";
    return `<div class="card mb-2">
      <div class="card-title">${titulo}</div>
      <p class="text-sm muted mb-2">${subtitulo}</p>
      ${lista.map(r=>`<div class="card-flat mb-1">
        <div class="flex justify-between items-center gap-2 quebra">
          <div>
            <div class="peso-700">${escapeHtml(r.nome)} ${r.destaque?'<span class="badge badge-accent">destaque</span>':""}</div>
            <div class="text-sm muted mt-1">${escapeHtml(r.descricao||"")}</div>
            ${r.mensagem?`<div class="text-sm mt-1" style="font-family:var(--font-display);font-style:italic">“${escapeHtml(r.mensagem)}”</div>`:""}
            <div class="text-xs muted mt-1">${r.data?formatDataBR(r.data):""}${r.valor?" · "+escapeHtml(r.valor):""}</div>
          </div>
          ${podeEditar?`<div class="flex gap-1">
            <button class="icon-btn" title="Editar" onclick="abrirFormularioLivroOuro('${r.id}')">${iconeSvg("edit")}</button>
            <button class="icon-btn" title="Remover" onclick="removerRegistroLivroOuro('${r.id}')">${iconeSvg("trash")}</button>
          </div>`:""}
        </div>
      </div>`).join("")}
    </div>`;
  };
  return `
  <div class="page-header"><h2>Livro de Ouro</h2><p>Esta plataforma é mantida por gente que doou dinheiro, tempo ou conhecimento. Aqui ficam registrados, com nome, quem tornou isso possível.</p></div>
  <div class="card mb-2 borda-alerta">
    <div class="flex justify-between items-center gap-2 quebra">
      <div>
        <div class="card-title">Obrigado</div>
        <p class="text-sm muted">${registros.length} registro(s) de doação, colaboração e apoio. Se você contribuiu e não está aqui, avise a coordenação — a lista é mantida à mão, e esquecer alguém é o único erro que não queremos cometer.</p>
      </div>
      <div class="flex gap-1 quebra">
        <button class="btn btn-secondary btn-sm" onclick="abrirModalContribuir()">${iconeSvg("message")} Quero contribuir</button>
        ${podeEditar?`<button class="btn btn-primary btn-sm" onclick="abrirFormularioLivroOuro(null)">${iconeSvg("plus")} Registrar agradecimento</button>`:""}
      </div>
    </div>
  </div>
  ${registros.length ? "" : '<div class="empty-state">Nenhum registro ainda. A coordenação pode cadastrar o primeiro agradecimento pelo botão acima.</div>'}
  ${secao("doacao","Doações","Quem ajudou a pagar as contas: hospedagem, materiais, impressão, premiação de simulados.")}
  ${secao("colaboracao","Colaborações","Quem doou tempo e conhecimento: escrita e revisão de questões, respostas a dúvidas, organização do calendário.")}
  ${secao("apoio","Apoios e parcerias","Instituições, empresas e grupos que apoiaram a plataforma de alguma forma.")}
  <div class="card">
    <div class="card-title">Reconhecimento automático da plataforma</div>
    <p class="text-sm muted mb-2">Calculado pelo próprio sistema, a partir do que cada pessoa fez aqui dentro: questões enviadas ao banco, dúvidas respondidas oficialmente e problemas sinalizados em questões.</p>
    ${automaticas.length ? `<div class="table-wrap"><table><thead><tr><th>Pessoa</th><th>Questões enviadas</th><th>Dúvidas respondidas</th><th>Sinalizações</th><th>Total</th></tr></thead><tbody>
      ${automaticas.map(r=>`<tr>
        <td class="text-sm">${escapeHtml(r.usuario.nome)} ${badgePapel(r.usuario.papel, r.usuario)}</td>
        <td class="text-sm">${r.questoes}</td><td class="text-sm">${r.respostas}</td><td class="text-sm">${r.sinalizacoes}</td>
        <td><span class="badge badge-accent">${r.total}</span></td>
      </tr>`).join("")}
    </tbody></table></div>` : '<p class="text-sm muted">Ainda não há contribuições registradas pelo sistema. Envie questões, responda dúvidas ou sinalize problemas e seu nome aparece aqui.</p>'}
  </div>`;
}
function abrirModalContribuir(){
  abrirModal(`
    ${cabecalhoJanela("Quero contribuir")}
    <p class="text-sm muted">Conte como você pode ajudar — doação, revisão de questões, respostas a dúvidas, aulas, organização. A mensagem vai direto para a coordenação, que entra em contato e registra o agradecimento no Livro de Ouro.</p>
    <div class="field mt-2"><label class="label">Como você quer ajudar</label>
      <select class="select" id="contribTipo">
        <option value="doacao">Doação (dinheiro ou material)</option>
        <option value="colaboracao">Colaboração (tempo e conhecimento)</option>
        <option value="apoio">Apoio institucional / parceria</option>
      </select></div>
    <div class="field"><label class="label">Mensagem</label><textarea class="textarea" id="contribTexto" style="min-height:110px" placeholder="Ex.: posso revisar as questões de pediatria uma vez por semana."></textarea></div>
    <button class="btn btn-primary" onclick="enviarContribuicao()">Enviar</button>`);
}
function enviarContribuicao(){
  const tipo = document.getElementById("contribTipo").value;
  const texto = (document.getElementById("contribTexto").value||"").trim();
  if(!texto){ toast("Escreva uma mensagem antes de enviar.", "err"); return; }
  const u = usuarioAtual();
  const fb = {id:uid("fb"), usuarioId:u.id, autorNome:u.nome, papel:u.papel, tipo:"contribuicao ("+tipo+")", texto, data:hojeISO(), lido:false};
  db.feedbacks.push(fb);
  nuvemMarcarFeedback(fb.id);
  saveState(); fecharModal();
  toast("Recebido! A coordenação vai entrar em contato. Obrigado de verdade.");
}
function abrirFormularioLivroOuro(id){
  if(!podeAdmin("livro-ouro")){ toast("Seu nível de acesso não permite editar o Livro de Ouro.", "err"); return; }
  const r = id ? (db.livroOuro||[]).find(x=>x.id===id) : null;
  const tipos = tiposLivroOuro();
  abrirModal(`
    ${cabecalhoJanela(r?"Editar registro":"Registrar agradecimento")}
    <div class="field"><label class="label">Nome (pessoa, turma, instituição)</label><input class="input" id="loNome" value="${escapeHtml(r?r.nome:"")}"></div>
    <div class="grid grid-2">
      <div class="field"><label class="label">Tipo</label><select class="select" id="loTipo">
        ${Object.entries(tipos).map(([k,v])=>`<option value="${k}" ${r&&r.tipo===k?"selected":""}>${escapeHtml(v.nome)}</option>`).join("")}
      </select></div>
      <div class="field"><label class="label">Valor ou quantidade (opcional)</label><input class="input" id="loValor" placeholder="Ex.: R$ 500 · 20 questões" value="${escapeHtml(r?(r.valor||""):"")}"></div>
    </div>
    <div class="field"><label class="label">O que foi feito</label><textarea class="textarea" id="loDescricao" style="min-height:80px">${escapeHtml(r?(r.descricao||""):"")}</textarea></div>
    <div class="field"><label class="label">Mensagem da pessoa (opcional)</label><textarea class="textarea" id="loMensagem" style="min-height:60px">${escapeHtml(r?(r.mensagem||""):"")}</textarea></div>
    <div class="grid grid-2">
      <div class="field"><label class="label">Data</label><input class="input" type="date" id="loData" value="${escapeHtml(r?(r.data||hojeISO()):hojeISO())}"></div>
      <div class="field"><label class="label">Destaque</label><label class="checkbox-row"><input type="checkbox" id="loDestaque" ${r&&r.destaque?"checked":""}> Mostrar no topo da lista</label></div>
    </div>
    <div class="flex gap-1 mt-1"><button class="btn btn-primary" onclick="salvarRegistroLivroOuro('${id||""}')">Salvar</button><button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button></div>`);
}
function salvarRegistroLivroOuro(id){
  const dados = {
    nome: (document.getElementById("loNome").value||"").trim(),
    tipo: document.getElementById("loTipo").value,
    valor: (document.getElementById("loValor").value||"").trim(),
    descricao: (document.getElementById("loDescricao").value||"").trim(),
    mensagem: (document.getElementById("loMensagem").value||"").trim(),
    data: document.getElementById("loData").value || hojeISO(),
    destaque: document.getElementById("loDestaque").checked,
  };
  if(!dados.nome){ toast("Informe ao menos o nome de quem está sendo agradecido.", "err"); return; }
  if(!db.livroOuro) db.livroOuro = [];
  let idSalvo = id;
  if(id){ Object.assign(db.livroOuro.find(x=>x.id===id), dados); }
  else { idSalvo = uid("lo"); db.livroOuro.push({id:idSalvo, ...dados, registradoPor:usuarioAtual().id}); }
  nuvemMarcarGlobalPendente("livro_ouro", idSalvo);
  saveState(); fecharModal(); toast("Registro salvo no Livro de Ouro."+(nuvemConectado()?" Subindo para a nuvem.":"")); render();
}
function removerRegistroLivroOuro(id){
  if(!podeAdmin("livro-ouro")){ toast("Seu nível de acesso não permite editar o Livro de Ouro.", "err"); return; }
  abrirModal(`${cabecalhoJanela("Remover registro")}
    <p>Tem certeza? O agradecimento deixará de aparecer para todos.</p>
    <div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="removerRegistroLivroOuroConfirmado('${id}')">Remover</button><button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button></div>`);
}
function removerRegistroLivroOuroConfirmado(id){
  db.livroOuro = (db.livroOuro||[]).filter(x=>x.id!==id);
  nuvemMarcarGlobalPendente("livro_ouro", id);   // a remoção também sobe
  saveState(); fecharModal(); toast("Registro removido."); render();
}
/* Registros feitos antes de o Livro de Ouro subir para a nuvem ficaram só
   no navegador de quem os fez: este botão manda todos de uma vez. */
function enviarLivroOuroParaNuvem(){
  if(!podeAdmin("livro-ouro")) return;
  if(!nuvemConectado()){ toast("Entre na sua conta da nuvem para enviar.", "err"); return; }
  (db.livroOuro||[]).forEach(r => nuvemMarcarGlobalPendente("livro_ouro", r.id));
  saveState();
  nuvemSincronizarAgora({forcarRedesenho:true});
  toast((db.livroOuro||[]).length + " registro(s) do Livro de Ouro a caminho da nuvem.");
}

/* ==========================================================================
   16-B. HISTÓRICO DE ATIVIDADE — conjuntos de questões já feitos, com a
   taxa de acerto de cada um e atalho para reabrir a página de feedback
   (a mesma que aparece ao terminar um conjunto de questões).
   ========================================================================== */
function atividadePorDia(usuarioId, dias){
  const out = [];
  for(let i=dias-1;i>=0;i--){
    const iso = somarDias(hojeISO(), -i);
    const rs = db.respostas.filter(r=>r.usuarioId===usuarioId && r.data===iso);
    out.push({data:iso, total:rs.length, acertos:rs.filter(r=>r.correta).length});
  }
  return out;
}

/* ---------- o dia como unidade de histórico ------------------------------
   Um conjunto de questões é uma unidade útil, mas não é a única: boa parte
   do estudo acontece solta — cinco questões esperando o elevador, uma
   revisão rápida no intervalo, dez cartões antes de dormir. Nada disso
   aparecia aqui, porque só conjunto concluído virava linha.

   Então a unidade passa a ser o DIA: tudo o que foi respondido naquele dia
   (dentro ou fora de um conjunto), a taxa de acerto, os conjuntos que
   fecharam nele e quantos cartões foram revisados. O dia é clicável como um
   conjunto — reabre o mesmo feedback questão a questão —, e os conjuntos
   daquele dia continuam listados dentro dele, para quem quer o recorte. */
function diasDeAtividade(usuarioId){
  const porDia = new Map();
  const garantir = (dia) => {
    if(!porDia.has(dia)) porDia.set(dia, { data:dia, respostas:[], sessoes:[], simulados:[], cartoes:0, cartoesExatos:true });
    return porDia.get(dia);
  };
  db.respostas.filter(r=>r.usuarioId===usuarioId).forEach(r=>{ if(r.data) garantir(r.data).respostas.push(r); });
  (db.sessoes||[]).filter(x=>x.usuarioId===usuarioId).forEach(sess=>{ if(sess.data) garantir(sess.data).sessoes.push(sess); });
  (db.resultadosSimulados||[]).filter(x=>x.usuarioId===usuarioId).forEach(sim=>{ if(sim.data) garantir(sim.data).simulados.push(sim); });
  // dias em que só houve cartão também são dias de estudo e entram na lista
  ((db.diasCartoes && db.diasCartoes[usuarioId]) || []).forEach(dia => garantir(dia));
  Object.keys((db.cartoesPorDia && db.cartoesPorDia[usuarioId]) || {}).forEach(dia => garantir(dia));
  const dias = [...porDia.values()];
  dias.forEach(d=>{
    const c = cartoesFeitosNoDia(usuarioId, d.data);
    d.cartoes = c.n; d.cartoesExatos = c.exato;
    d.total = d.respostas.length;
    d.acertos = d.respostas.filter(r=>r.correta).length;
    d.chutes = d.respostas.filter(r=>r.confianca==="chute").length;
    d.duvidas = d.respostas.filter(r=>r.confianca==="duvida").length;
  });
  return dias.filter(d=>d.total || d.cartoes || d.sessoes.length || d.simulados.length)
             .sort((a,b)=>b.data.localeCompare(a.data));
}
/* Reabre um dia inteiro no mesmo feedback questão a questão dos conjuntos.
   É uma sessão de leitura montada na hora a partir das respostas do dia —
   não existe "conjunto do dia" guardado, e inventar um seria criar histórico
   que ninguém fez. */
function abrirDiaDoHistorico(dia){
  const u = usuarioAtual();
  const respostas = db.respostas.filter(r=>r.usuarioId===u.id && r.data===dia)
    .filter(r=>getQuestao(r.questaoId));
  if(!respostas.length){ toast("Neste dia você revisou cartões, mas não respondeu questões.", "err"); return; }
  state.sessaoAtual = {
    id: "dia-"+dia, tipo:"pratica", somenteLeitura:true, salvaNoHistorico:true, dataOriginal: dia,
    itens: respostas.map(r=>({questaoId:r.questaoId, motivo:"Respondida em "+formatDataBR(dia)})),
    respostasSessao: respostas.map(r=>({id:r.id, questaoId:r.questaoId, alternativaEscolhida:r.alternativaEscolhida, textoResposta:r.textoResposta, correta:r.correta, confianca:r.confianca, data:r.data})),
    indiceAtual:0, marcadas:{}, finalizada:true,
  };
  navigate("sessao");
}
function renderHistorico(){
  const u = usuarioAtual();
  const sessoes = (db.sessoes||[]).filter(x=>x.usuarioId===u.id).slice().reverse();
  const simulados = db.resultadosSimulados.filter(r=>r.usuarioId===u.id).sort((a,b)=>b.data.localeCompare(a.data));
  const dias = atividadePorDia(u.id, 14);
  const totalRespostas = db.respostas.filter(r=>r.usuarioId===u.id).length;
  const totalAcertos = db.respostas.filter(r=>r.usuarioId===u.id && r.correta).length;
  const ultimos7 = db.respostas.filter(r=>r.usuarioId===u.id && diasEntre(r.data, hojeISO())<7);
  const diasAtivos = diasDeAtividade(u.id);
  const pagDias = paginar(diasAtivos, "historico-dias", {porPagina:15});
  const pagSimulados = paginar(simulados, "historico-simulados", {porPagina:15});
  const cartoesTotal = diasAtivos.reduce((soma,d)=>soma+d.cartoes, 0);
  return `
  <div class="page-header"><h2>Histórico de Atividade</h2><p>Tudo o que você já estudou, dia a dia, do mais recente para o mais antigo — questões (dentro ou fora de um conjunto), flashcards e simulados.</p></div>
  <div class="grid grid-4 compacto mb-2">
    <div class="stat-tile"><div class="stat-value">${diasAtivos.length}</div><div class="stat-label">dia(s) com estudo registrado · ${sessoes.length} conjunto(s) fechado(s)</div></div>
    <div class="stat-tile"><div class="stat-value">${totalRespostas}</div><div class="stat-label">questões respondidas no total${cartoesTotal?" · "+cartoesTotal+" flashcard(s)":""}</div></div>
    <div class="stat-tile"><div class="stat-value">${totalRespostas?pct(totalAcertos,totalRespostas)+"%":"—"}</div><div class="stat-label">taxa de acerto geral</div></div>
    <div class="stat-tile"><div class="stat-value">${ultimos7.length?pct(ultimos7.filter(r=>r.correta).length, ultimos7.length)+"%":"—"}</div><div class="stat-label">taxa de acerto nos últimos 7 dias (${ultimos7.length} questões)</div></div>
  </div>
  <div class="card mb-2">
    <div class="card-title">Últimos 14 dias</div>
    <div class="mt-2">${graficoBarrasSvg(dias.map(d=>({label:formatDataBR(d.data).slice(0,5), valor: d.total?pct(d.acertos,d.total):null, n:d.total})), {fino:true})}</div>
    <p class="text-xs muted mt-1">Cada barra é a taxa de acerto do dia; o número entre parênteses é quantas questões você respondeu naquele dia.</p>
  </div>
  <div class="card mb-2">
    <div class="card-title mb-1">Dia a dia</div>
    <p class="text-sm muted mb-2">Cada dia é uma linha, com tudo o que você fez nele — inclusive as questões respondidas fora de um conjunto e os flashcards. Clique no dia para reabrir o feedback questão a questão.</p>
    ${diasAtivos.length ? pagDias.itens.map(d=>{
      const taxa = d.total ? pct(d.acertos, d.total) : null;
      const sessoesDoDia = d.sessoes.length;
      return `<div class="card-flat mb-1">
        <div class="flex justify-between items-center gap-2 quebra">
          <div class="cresce-220">
            <div class="peso-600">${formatDataBR(d.data)}${d.data===hojeISO()?' · <span class="badge badge-accent">hoje</span>':""}</div>
            <div class="text-xs muted mt-1">
              ${d.total ? `${d.total} questão(ões) · ${d.acertos} acerto(s) · ${d.chutes} chute(s) · ${d.duvidas} na dúvida` : "nenhuma questão neste dia"}
              ${d.cartoes ? ` · ${d.cartoes} flashcard(s)${d.cartoesExatos?"":" (ao menos)"}` : ""}
              ${sessoesDoDia ? ` · ${sessoesDoDia} conjunto(s) fechado(s)` : ""}
              ${d.simulados.length ? ` · ${d.simulados.length} simulado(s)` : ""}
            </div>
          </div>
          <div class="flex items-center gap-1 quebra">
            ${taxa!==null ? `<span class="badge ${taxa>=70?"badge-accent":taxa>=50?"badge-amber":"badge-danger"}">${taxa}% de acerto</span>` : ""}
            ${d.cartoes ? `<span class="badge badge-muted">${iconeSvg("cards")} ${d.cartoes}</span>` : ""}
            ${d.total ? `<button class="btn btn-secondary btn-sm" onclick="abrirDiaDoHistorico('${d.data}')">${iconeSvg("chart")} Abrir o dia</button>` : ""}
          </div>
        </div>
        ${sessoesDoDia ? `<div class="mt-2" style="border-top:1px solid var(--border);padding-top:.6rem">
          ${d.sessoes.map(sess=>{
            const t = pct(sess.acertos, sess.total);
            return `<div class="flex justify-between items-center gap-2 text-xs muted mb-1 quebra">
              <span>${iconeSvg("book")} conjunto de ${sess.total} questão(ões) — ${escapeHtml(sess.itens[0] && sess.itens[0].motivo ? sess.itens[0].motivo : "sessão de prática")}</span>
              <span class="flex items-center gap-1"><span class="badge ${t>=70?"badge-accent":t>=50?"badge-amber":"badge-danger"}">${t}%</span>
              <button class="link-btn text-xs" onclick="abrirSessaoDoHistorico('${sess.id}')">abrir este conjunto</button></span>
            </div>`;
          }).join("")}
        </div>` : ""}
      </div>`;
    }).join("") : '<p class="text-sm muted mt-1">Você ainda não estudou nenhum dia por aqui. Comece em "Estudar" ou na "Revisão Rápida".</p>'}
    ${controlesPaginacao(pagDias, "dia(s)")}
  </div>
  <div class="card">
    <div class="card-title mb-1">Simulados realizados</div>
    ${simulados.length ? `<div class="table-wrap mt-1"><table><thead><tr><th>Simulado</th><th>Nota</th><th>Data</th><th></th></tr></thead><tbody>
      ${pagSimulados.itens.map(r=>`<tr><td class="text-sm">${escapeHtml(r.titulo||"—")}</td><td><span class="badge ${r.nota>=70?"badge-accent":r.nota>=50?"badge-amber":"badge-danger"}">${r.nota}%</span></td><td class="text-sm">${formatDataBR(r.data)}</td><td>${r.itens?`<button class="btn btn-secondary btn-sm" onclick="verDetalheResultadoSimulado('${r.id}')">Abrir feedback</button>`:""}</td></tr>`).join("")}
    </tbody></table></div>` : '<p class="text-sm muted mt-1">Nenhum simulado realizado ainda.</p>'}
    ${controlesPaginacao(pagSimulados, "simulado(s)")}
  </div>`;
}

/* ==========================================================================
   17. MEU DESEMPENHO
   ==========================================================================
   A página responde, nesta ordem, a três perguntas diferentes:
     1. "Quanto eu já sei?"      -> desempenho total, de tudo que já respondi
     2. "Como estou indo AGORA?" -> janela recente, escolhida pelo aluno
     3. "Onde eu preciso mexer?" -> as 5 grandes áreas e a calibração

   O recorte de tempo fica num seletor único (14 dias, 30 dias, 12 meses ou o
   ano corrente), porque a mesma pergunta muda de escala conforme o momento:
   perto da prova o que importa são os últimos dias; em março, olhar mês a mês
   é o que mostra se o ano está evoluindo de verdade.

   O detalhe assunto a assunto saiu daqui de propósito: virava uma lista de
   dezenas de linhas que ninguém lia até o fim. Aqui ficam as 5 grandes
   áreas, que é o nível em que se decide o que estudar na semana; o assunto
   aparece na tela de Revisão, ao lado da ação correspondente. */
function ctxDesempenho(){
  if(!state.filtroRota.desempenho) state.filtroRota.desempenho = {periodo:"14d"};
  return state.filtroRota.desempenho;
}
function mudarPeriodoDesempenho(p){ ctxDesempenho().periodo = p; render(); }
const PERIODOS_DESEMPENHO = [
  {id:"14d", label:"Últimos 14 dias"},
  {id:"30d", label:"Últimos 30 dias"},
  {id:"12m", label:"Últimos 12 meses"},
  {id:"ano", label:"Este ano, mês a mês"},
];
/* Devolve os dados já prontos para o gráfico, conforme o período escolhido. */
function dadosDoPeriodo(usuarioId, periodo){
  if(periodo==="30d") return {itens: desempenhoPorDia(usuarioId,30), granularidade:"dia", dias:30};
  if(periodo==="12m") return {itens: desempenhoPorMes(usuarioId,"12meses"), granularidade:"mes"};
  if(periodo==="ano") return {itens: desempenhoPorMes(usuarioId,"ano"), granularidade:"mes"};
  return {itens: desempenhoPorDia(usuarioId,14), granularidade:"dia", dias:14};
}
/* Rótulo curto das grandes áreas, para caber embaixo da barra. */
function abreviarArea(nome){
  const mapa = {
    "Clínica Médica":"Clínica",
    "Cirurgia Geral":"Cirurgia",
    "Pediatria":"Pediatria",
    "Ginecologia e Obstetrícia":"GO",
    "Medicina Preventiva e Social":"Preventiva",
  };
  return mapa[nome] || (nome.length>12 ? nome.slice(0,11)+"." : nome);
}
/* ---------- "Se a prova fosse hoje" e "O que mais cai" ---------------------
   As duas contas moram no motor (seção 4, O QUE MAIS CAI NA PROVA); aqui só
   se mostra. Os dois cartões dizem de onde vem o número — quais provas, quantas
   respostas — porque uma nota estimada sem a origem à vista vira profecia. */
function htmlCardNotaEstimada(u){
  const inc = incidenciaNaBanca();
  if(!inc.total) return "";
  const est = estimativaDeNota(u.id);
  const faixaAnos = inc.anos.length ? inc.anos[0]+"–"+inc.anos[inc.anos.length-1] : "";
  if(!est){
    const faltam = CONFIG.incidencia.minRespostasParaNota - acertoGeralDoUsuario(u.id).total;
    return `<div class="card mb-2">
      <div class="card-title">${iconeSvg("target")} Se a prova fosse hoje</div>
      <p class="text-sm muted">Com mais ${faltam} resposta(s), a plataforma estima a sua nota na prova da ${escapeHtml(inc.banca)}, área por área, pelo peso que cada grande área teve nas provas de ${faixaAnos}.</p>
    </div>`;
  }
  const larga = est.maximo - est.minimo > 16;
  return `<div class="card mb-2">
    <div class="card-title">${iconeSvg("target")} Se a prova fosse hoje</div>
    <p class="text-sm muted">Estimativa da sua nota na prova da ${escapeHtml(est.banca)}: o seu acerto em cada grande área, pesado pelo tanto que cada área caiu nas provas de ${faixaAnos} (${inc.total} questões). Não é previsão de aprovação — é o retrato de hoje.</p>
    <div class="nota-estimada mt-2">
      <div><div class="nota-estimada-valor">${est.nota}%</div>
        <div class="text-xs muted">provavelmente entre ${est.minimo}% e ${est.maximo}%${larga ? " — faixa larga porque ainda há poucas respostas; ela estreita com o uso" : ""}</div></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Grande área</th><th>Peso na prova</th><th>Seu acerto</th><th>Pontos de 100</th></tr></thead>
        <tbody>${est.areas.map(a=>`<tr>
          <td class="text-sm">${escapeHtml(a.nome)}</td>
          <td class="text-sm">${Math.round(a.fatia*100)}%</td>
          <td class="text-sm">${a.taxa!==null ? a.taxa+"%" : '<span class="muted">sem respostas</span>'}${a.respondidas && a.respondidas<10 ? ' <span class="text-xs muted">('+a.respondidas+' resp.)</span>' : ""}</td>
          <td class="text-sm">${a.pontos.toFixed(1).replace(".", ",")} <span class="muted">de ${Math.round(a.fatia*100)}</span></td>
        </tr>`).join("")}</tbody>
      </table></div>
    </div>
  </div>`;
}
function htmlCardOQueMaisCai(u, limite){
  const inc = incidenciaNaBanca();
  if(!inc.total) return "";
  const todas = prioridadesDeEstudo(u.id);
  const aberta = !!ctxDesempenho().prioridadesAbertas;
  const lista = aberta ? todas : todas.slice(0, limite);
  const faixaAnos = inc.anos.length ? inc.anos[0]+"–"+inc.anos[inc.anos.length-1] : "";
  return `<div class="card mb-2">
    <div class="card-title">${iconeSvg("star")} O que mais cai na prova × onde você erra</div>
    <p class="text-sm muted">Os assuntos que mais caíram nas provas da ${escapeHtml(inc.banca)} (${faixaAnos}), em ordem de <strong>prioridade</strong>: quanto da prova o assunto ocupa, multiplicado pelo quanto você ainda erra nele. Assunto que você nunca respondeu entra com o seu acerto geral. É esta mesma conta que faz a sessão recomendada trazer primeiro esses assuntos, dentro do bloco atual.</p>
    <div class="table-wrap mt-2"><table>
      <thead><tr><th>Assunto</th><th>Caiu na prova</th><th>Seu acerto</th><th>Prioridade</th><th></th></tr></thead>
      <tbody>${lista.map(p=>`<tr>
        <td class="text-sm"><strong>${escapeHtml(nomeAssunto(p.assuntoId))}</strong> <span class="text-xs muted">${escapeHtml((getArea(p.areaId)||{}).nome||"")}</span></td>
        <td class="text-sm">${p.questoesNaProva} questão(ões) <span class="text-xs muted">em ${p.anosQueCaiu} de ${inc.anos.length} anos</span></td>
        <td class="text-sm">${p.taxa!==null ? `<span class="badge ${p.taxa<50?"badge-danger":p.taxa<70?"badge-amber":"badge-accent"}">${p.taxa}%</span> <span class="text-xs muted">em ${p.respondidas}</span>` : '<span class="text-xs muted">nunca respondeu</span>'}</td>
        <td><div class="barra-prioridade" title="prioridade relativa"><i style="width:${Math.max(4, Math.round(p.prioridadeRelativa*100))}%"></i></div></td>
        <td><button class="btn btn-secondary btn-sm" onclick="praticarAssunto('${p.assuntoId}')">Praticar</button></td>
      </tr>`).join("")}</tbody>
    </table></div>
    <div class="flex gap-1 mt-2 quebra">
      <button class="btn btn-primary btn-sm" onclick="praticarPrioridadesDaProva()">${iconeSvg("play")} Praticar as 5 maiores prioridades</button>
      ${todas.length > limite ? `<button class="btn btn-secondary btn-sm" onclick="alternarPrioridadesAbertas()" aria-expanded="${aberta}">${aberta ? "Mostrar só as "+limite+" primeiras" : "Ver os demais assuntos ("+(todas.length-limite)+")"}</button>` : ""}
    </div>
  </div>`;
}
function alternarPrioridadesAbertas(){ ctxDesempenho().prioridadesAbertas = !ctxDesempenho().prioridadesAbertas; render(); }
/* ---------- Evolução por assunto, de 15 em 15 dias ------------------------
   O motor (evolucaoPorAssunto, seção 4) devolve uma célula por quinzena;
   quinzena sem resposta é "—", nunca 0%. Fica numa área recolhida porque é
   o detalhe fino: quem quer só o retrato do período lê os cartões de cima. */
function celulaEvolucao(c){
  if(!c) return '<span class="muted" title="Nenhuma questão deste assunto nesta quinzena">—</span>';
  return `<span class="badge ${c.taxa<50?"badge-danger":c.taxa<70?"badge-amber":"badge-accent"}">${c.taxa}%</span> <span class="text-xs muted">${c.acertos}/${c.total}</span>`;
}
function tendenciaEvolucao(v){
  if(v===null) return '<span class="text-xs muted" title="Só uma quinzena com respostas: ainda não há com o que comparar">—</span>';
  if(v===0) return '<span class="text-xs muted">= igual</span>';
  return `<span class="peso-600" style="color:var(${v>0?"--accent":"--danger"})" title="Última quinzena com respostas contra a anterior que também teve">${v>0?"▲ +":"▼ "}${v} p.p.</span>`;
}
function evolucaoAgrupadaPorArea(ev){
  return db.taxonomia.areas.map(area=>{
    const assuntos = ev.assuntos.filter(a=>a.areaId===area.id);
    const total = assuntos.reduce((t,a)=>t+a.total,0), acertos = assuntos.reduce((t,a)=>t+a.acertos,0);
    return {area, assuntos, total, acertos};
  }).filter(g=>g.assuntos.length);
}
function htmlEvolucaoPorAssunto(u){
  const ev = evolucaoPorAssunto(u.id);
  if(!ev.assuntos.length) return `<div class="card mb-2"><div class="card-title">${iconeSvg("chart")} Evolução por assunto, de 15 em 15 dias</div><p class="text-sm muted">Aparece aqui quando você responder as primeiras questões.</p></div>`;
  const grupos = evolucaoAgrupadaPorArea(ev);
  return `<div class="card mb-2" id="evolucaoAssuntos">
    <details>
      <summary class="card-title" style="cursor:pointer">${iconeSvg("chart")} Evolução por assunto, de 15 em 15 dias <span class="text-xs muted peso-400">(${ev.assuntos.length} assunto(s) · ${ev.periodos.length} período(s))</span></summary>
      <p class="text-sm muted mt-1">Cada coluna é um período de 15 dias; o último termina hoje. Em cada célula, o acerto no assunto naquele período e quantas você acertou (ex.: <strong>80%</strong> <span class="text-xs muted">8/10</span>). <strong>—</strong> quer dizer que você não fez questões daquele assunto no período — não é erro nem acerto, e a comparação só vale entre períodos em que você fez. Pouca questão engana: 100% em 2 não é melhor que 75% em 40.${ev.cortou ? " Mostramos os últimos "+ev.periodos.length+" períodos ("+ev.periodos.length*DIAS_DO_PERIODO+" dias)." : ""}</p>
      <div class="flex gap-1 mt-2 quebra">
        <button class="btn btn-secondary btn-sm" onclick="alternarAreasDaEvolucao(true)">Abrir todas as áreas</button>
        <button class="btn btn-secondary btn-sm" onclick="alternarAreasDaEvolucao(false)">Recolher todas</button>
        <button class="btn btn-primary btn-sm" onclick="baixarEvolucaoPDF()">${iconeSvg("printer")} Salvar em PDF</button>
      </div>
      ${grupos.map(g=>`<details class="evolucao-area mt-2">
        <summary class="peso-600 text-sm">${escapeHtml(g.area.nome)} <span class="text-xs muted peso-400">· ${g.assuntos.length} assunto(s) · ${pct(g.acertos,g.total)}% de acerto em ${g.total} respostas</span></summary>
        <div class="table-wrap mt-1"><table class="evolucao-tabela">
          <thead><tr><th>Assunto</th>${ev.periodos.map(p=>`<th>${p.rotulo}</th>`).join("")}<th>Tendência</th></tr></thead>
          <tbody>${g.assuntos.map(a=>`<tr>
            <td class="text-sm">${escapeHtml(nomeAssunto(a.assuntoId))} <span class="text-xs muted">(${a.acertos}/${a.total})</span></td>
            ${a.celulas.map(c=>`<td class="text-sm">${celulaEvolucao(c)}</td>`).join("")}
            <td>${tendenciaEvolucao(a.variacao)}</td>
          </tr>`).join("")}</tbody>
        </table></div>
      </details>`).join("")}
    </details>
  </div>`;
}
function alternarAreasDaEvolucao(abrir){
  document.querySelectorAll("#evolucaoAssuntos details.evolucao-area").forEach(d=>{ d.open = abrir; });
}
/* PDF = a impressão do navegador (como o Material em PDF): sem cor, com o
   número por extenso, e em paisagem porque são até 12 colunas de período. */
function htmlEvolucaoPDF(u){
  const ev = evolucaoPorAssunto(u.id);
  if(!ev.assuntos.length) return "";
  const cel = c => c ? c.taxa+"% ("+c.acertos+"/"+c.total+")" : "—";
  const tend = v => v===null ? "—" : (v>0?"+":"")+v+" p.p.";
  return `<style>@page{size:A4 landscape;margin:12mm}</style>
  <div class="pdf-cabecalho"><h1>Evolução por assunto — ${escapeHtml(u.nome)}</h1>
    <div class="pdf-sub">${CONFIG.nomePlataforma} · períodos de 15 dias, o último termina em ${formatDataBR(hojeISO())} · gerado em ${formatDataBR(hojeISO())}</div></div>
  ${evolucaoAgrupadaPorArea(ev).map(g=>`<h2 style="font-size:12pt;margin:.9rem 0 .3rem">${escapeHtml(g.area.nome)} <span style="font-weight:400;font-size:9pt">— ${pct(g.acertos,g.total)}% em ${g.total} respostas</span></h2>
    <table class="pdf-tabela" style="font-size:8pt"><thead><tr><th>Assunto</th>${ev.periodos.map(p=>`<th>${p.rotulo}</th>`).join("")}<th>Tendência</th></tr></thead>
    <tbody>${g.assuntos.map(a=>`<tr><td>${escapeHtml(nomeAssunto(a.assuntoId))} (${a.acertos}/${a.total})</td>${a.celulas.map(c=>`<td>${cel(c)}</td>`).join("")}<td>${tend(a.variacao)}</td></tr>`).join("")}</tbody></table>`).join("")}
  <p style="font-size:8.5pt;margin-top:.8rem;color:#333">— = nenhuma questão do assunto no período (não é erro nem acerto). Tendência: última quinzena com respostas contra a anterior que também teve. Quantidades pequenas pesam pouco: 100% em 2 questões não supera 75% em 40.</p>`;
}
function baixarEvolucaoPDF(){
  const html = htmlEvolucaoPDF(usuarioAtual());
  if(!html){ toast("Responda algumas questões para gerar o relatório.", "err"); return; }
  imprimir(html);
}
/* Um conjunto com as questões dos 5 assuntos de maior prioridade — primeiro
   as que a pessoa nunca viu ou errou, intercaladas por assunto. */
function praticarPrioridadesDaProva(){
  const u = usuarioAtual();
  const top = prioridadesDeEstudo(u.id).slice(0,5).map(p=>p.assuntoId);
  if(!top.length){ toast("Ainda não há prova real no banco para calcular as prioridades.", "err"); return; }
  const pool = questoesParaEstudo(u.id).filter(q=>top.includes(q.assuntoId)).filter(q=>{
    const ult = ultimaResposta(u.id, q.id);
    return !ult || !ult.correta || ult.confianca==="chute";
  });
  const itens = selecionarComInterleaving(pool.length ? pool : questoesParaEstudo(u.id).filter(q=>top.includes(q.assuntoId)), 15)
    .map(q=>({questaoId:q.id, motivo:"Prioridade pela prova — "+nomeAssunto(q.assuntoId)}));
  if(!itens.length){ toast("Não há questões desses assuntos disponíveis para você agora.", "err"); return; }
  iniciarSessaoComLista(itens, "pratica");
}

/* Os números do Meu Desempenho, sem HTML (a tela só desenha o que está aqui). */
function dadosDoDesempenho(u){
  const ctx = ctxDesempenho();
  const porArea = desempenhoPorArea(u.id);
  const calibracao = calibracaoConfianca(u.id);
  const totalGeral = desempenhoTotal(u.id);
  const falsaSeguranca = assuntosComFalsaSeguranca(u.id);
  const ritmo = analiseDeTempo(u.id);
  const cartoes = resumoCartoesFeitos(u.id);

  const dados = dadosDoPeriodo(u.id, ctx.periodo);
  const rotuloPeriodo = (PERIODOS_DESEMPENHO.find(p=>p.id===ctx.periodo)||PERIODOS_DESEMPENHO[0]).label;
  const ehDiario = dados.granularidade==="dia";
  const resumo14 = resumoJanela(u.id, 14);
  const resumo30 = resumoJanela(u.id, 30);
  const resumoAtual = ehDiario ? resumoJanela(u.id, dados.dias) : null;
  const somaMeses = !ehDiario ? dados.itens.reduce((acc,m)=>({total:acc.total+m.total, acertos:acc.acertos+m.acertos}), {total:0,acertos:0}) : null;
  const mesesComEstudo = !ehDiario ? dados.itens.filter(m=>m.total>0) : [];
  const melhorMes = mesesComEstudo.length ? mesesComEstudo.slice().sort((a,b)=>b.taxa-a.taxa)[0] : null;
  return {ctx, porArea, calibracao, totalGeral, falsaSeguranca, ritmo, cartoes, dados, rotuloPeriodo, ehDiario, resumo14, resumo30, resumoAtual, somaMeses, mesesComEstudo, melhorMes};
}
function renderDesempenho(){
  const u = usuarioAtual();
  const {ctx, porArea, calibracao, totalGeral, falsaSeguranca, ritmo, cartoes, dados, rotuloPeriodo, ehDiario, resumo14, resumo30, resumoAtual, somaMeses, mesesComEstudo, melhorMes} = dadosDoDesempenho(u);

  const graficoAreas = graficoBarrasVerticaisSvg(porArea.map(a=>({
    label: abreviarArea(a.nome), taxa: a.taxa, total: a.total, acertos: a.acertos,
  })), {altura:140, larguraMax:60});

  return `
  <div class="page-header"><h2>Meu Desempenho</h2><p>Primeiro o total de tudo que você já respondeu, depois como está indo no período que você escolher, e por fim onde mexer.</p></div>

  <div class="card mb-2">
    <div class="card-title">Desempenho total — todas as questões</div>
    <p class="text-sm muted">Soma de tudo que você já respondeu na plataforma, sem separar por área, assunto ou tipo de sessão.</p>
    <div class="grid grid-4 compacto mt-2">
      <div class="stat-tile"><div class="stat-value">${totalGeral.taxa!==null?totalGeral.taxa+"%":"—"}</div><div class="stat-label">acerto em todas as respostas (${totalGeral.acertos}/${totalGeral.total})</div></div>
      <div class="stat-tile"><div class="stat-value">${totalGeral.taxaUltimaTentativa!==null?totalGeral.taxaUltimaTentativa+"%":"—"}</div><div class="stat-label">acerto considerando só a última tentativa de cada questão</div></div>
      <div class="stat-tile"><div class="stat-value">${totalGeral.distintas}</div><div class="stat-label">questões diferentes já respondidas (${totalGeral.cobertura}% do banco)</div></div>
      <div class="stat-tile"><div class="stat-value">${totalGeral.naoRespondidas}</div><div class="stat-label">questões do banco que você ainda não viu</div></div>
    </div>
  </div>

  ${htmlSecaoRecolhivel("desempenho-cartoes", iconeSvg("cards")+" Flashcards — contagem à parte", cartoes.revisoes+" revisões · "+cartoes.hoje+" hoje"+(cartoes.vencidos?" · "+cartoes.vencidos+" vencido(s)":""), `
    <p class="text-sm muted">Cartão não tem acerto nem erro, só autoavaliação, e leva segundos onde uma questão de prova leva minutos. Por isso ele é contado aqui, separado das questões acima: é volume de revisão, não taxa de acerto.</p>
    <div class="grid grid-4 compacto mt-2">
      <div class="stat-tile"><div class="stat-value">${cartoes.revisoes}</div><div class="stat-label">cartões revisados no total (contando as repetições)</div></div>
      <div class="stat-tile"><div class="stat-value">${cartoes.cartoes}</div><div class="stat-label">cartões diferentes que já passaram pelo seu baralho</div></div>
      <div class="stat-tile"><div class="stat-value">${cartoes.hoje}</div><div class="stat-label">revisados hoje (meta de ${metaCartoesDoUsuario(u)} por dia)</div></div>
      <div class="stat-tile"><div class="stat-value">${cartoes.dias}</div><div class="stat-label">dias com cartão revisado${cartoes.sequencia?` · ${cartoes.sequencia} seguido(s)`:""}</div></div>
    </div>
    <div class="flex gap-1 mt-2 quebra">
      <button class="btn btn-secondary btn-sm" onclick="navigate('flashcards')">${iconeSvg("cards")} Ir para a Revisão Rápida</button>
      ${cartoes.vencidos?`<span class="badge badge-amber" style="align-self:center">${cartoes.vencidos} cartão(ões) vencido(s) esperando</span>`:""}
    </div>
  `)}

  ${htmlCardNotaEstimada(u)}

  <div class="card mb-2">
    <div class="flex justify-between items-center gap-2 mb-2 quebra">
      <div style="min-width:320px;flex:1">
        <div class="card-title mb-02">Como você está indo — ${escapeHtml(rotuloPeriodo.toLowerCase())}</div>
        <div class="text-sm muted">Cada barra é 100% das questões daquele ${ehDiario?"dia":"mês"}: a parte verde é o que você acertou, o cinza é o que errou.</div>
      </div>
      <div class="seletor-periodo">
        ${PERIODOS_DESEMPENHO.map(p=>`<button class="pill ${ctx.periodo===p.id?"active":""}" onclick="mudarPeriodoDesempenho('${p.id}')">${p.label}</button>`).join("")}
      </div>
    </div>

    <div class="grafico-com-lateral">
    <div class="grafico-principal">
    ${graficoBarrasVerticaisSvg(dados.itens, {altura:130, larguraMax: ehDiario?22:36, rotuloRotacionado: ehDiario && dados.dias>20})}
    ${ehDiario ? `<p class="text-xs muted mt-1">Traço fino na base = dia sem nenhuma questão. Dia parado aparece de propósito: a constância é metade do resultado, e um gráfico que esconde os buracos mente sobre a rotina.</p>`
      : `<p class="text-xs muted mt-1">Mês sem questão aparece como traço na base. Comparar meses só faz sentido junto do volume: 100% em 3 questões não é melhor do que 72% em 400.</p>`}
    </div>
    <div class="grafico-lateral">
    ${ehDiario ? `
    <div class="grid compacto">
      <div class="stat-tile"><div class="stat-value">${resumoAtual.taxa!==null?resumoAtual.taxa+"%":"—"}</div><div class="stat-label">acerto nos últimos ${resumoAtual.dias} dias (${resumoAtual.acertos}/${resumoAtual.total})</div></div>
      <div class="stat-tile">
        <div class="stat-value" ${resumoAtual.variacao!==null&&resumoAtual.variacao<0?'style="color:var(--danger)"':(resumoAtual.variacao!==null&&resumoAtual.variacao>0?'style="color:var(--accent)"':"")}>${resumoAtual.variacao!==null?(resumoAtual.variacao>0?"+":"")+resumoAtual.variacao+" p.p.":"—"}</div>
        <div class="stat-label">contra os ${resumoAtual.dias} dias anteriores${resumoAtual.taxaAnterior!==null?" ("+resumoAtual.taxaAnterior+"%)":""}</div>
      </div>
      <div class="stat-tile"><div class="stat-value">${resumoAtual.diasComEstudo}/${resumoAtual.dias}</div><div class="stat-label">dias em que você estudou</div></div>
      <div class="stat-tile"><div class="stat-value">${resumoAtual.mediaPorDiaEstudado}</div><div class="stat-label">questões por dia estudado</div></div>
    </div>` : `
    <div class="grid compacto">
      <div class="stat-tile"><div class="stat-value">${somaMeses.total?pct(somaMeses.acertos,somaMeses.total)+"%":"—"}</div><div class="stat-label">acerto no período (${somaMeses.acertos}/${somaMeses.total})</div></div>
      <div class="stat-tile"><div class="stat-value">${somaMeses.total}</div><div class="stat-label">questões respondidas no período</div></div>
      <div class="stat-tile"><div class="stat-value">${mesesComEstudo.length}</div><div class="stat-label">meses com pelo menos uma questão</div></div>
      <div class="stat-tile"><div class="stat-value">${melhorMes?melhorMes.taxa+"%":"—"}</div><div class="stat-label">melhor mês${melhorMes?" ("+escapeHtml(melhorMes.label)+")":""}</div></div>
    </div>`}

    <div class="card-flat">
      <div class="text-sm peso-600">As duas janelas curtas, lado a lado</div>
      <div class="grid grid-2 janelas-curtas mt-1">
        <div class="text-sm">Últimos 14 dias: <strong>${resumo14.taxa!==null?resumo14.taxa+"%":"—"}</strong> <span class="muted">(${resumo14.total} questões, ${resumo14.diasComEstudo} dias com estudo)</span></div>
        <div class="text-sm">Últimos 30 dias: <strong>${resumo30.taxa!==null?resumo30.taxa+"%":"—"}</strong> <span class="muted">(${resumo30.total} questões, ${resumo30.diasComEstudo} dias com estudo)</span></div>
      </div>
      ${(resumo14.taxa!==null && resumo30.taxa!==null && Math.abs(resumo14.taxa-resumo30.taxa)>=8) ? `<p class="text-xs mt-1 texto-alerta peso-600">As duas janelas estão distantes (${Math.abs(resumo14.taxa-resumo30.taxa)} p.p.): ${resumo14.taxa>resumo30.taxa?"as duas últimas semanas foram melhores que o mês inteiro — algo que você mudou está funcionando.":"as duas últimas semanas caíram em relação ao mês. Vale ver se mudou o assunto, o tipo de questão ou o ritmo."}</p>` : ""}
    </div>
    </div>
    </div>
  </div>

  <div class="card mb-2">
    <div class="card-title">Comparação entre as 5 grandes áreas</div>
    <p class="text-sm muted">Todas as suas respostas somadas, agrupadas nas cinco áreas cobradas na prova. É neste nível que se decide onde colocar as próximas horas de estudo.</p>
    <div class="areas-lado-a-lado mt-2">
    <div class="areas-grafico">${graficoAreas}</div>
    <div class="table-wrap"><table>
      <thead><tr><th>Grande área</th><th>Acertos</th><th>Erros</th><th>Taxa</th><th>Assunto mais fraco</th><th></th></tr></thead>
      <tbody>
        ${porArea.map(a=>{
          const pior = a.assuntos.filter(x=>x.total>=3)[0] || a.assuntos[0] || null;
          return `<tr>
            <td class="text-sm peso-600">${escapeHtml(a.nome)}</td>
            <td class="text-sm">${a.acertos}</td>
            <td class="text-sm">${a.total-a.acertos}</td>
            <td>${a.taxa!==null?`<span class="badge ${a.taxa<50?"badge-danger":a.taxa<70?"badge-amber":"badge-accent"}">${a.taxa}%</span>`:'<span class="text-xs muted">sem dados</span>'}</td>
            <td class="text-sm">${pior?escapeHtml(nomeAssunto(pior.assuntoId))+' <span class="muted">('+pior.taxa+'% em '+pior.total+')</span>':"—"}</td>
            <td>${pior?`<button class="btn btn-secondary btn-sm" onclick="praticarAssunto('${pior.assuntoId}')">Praticar</button>`:""}</td>
          </tr>`;
        }).join("")}
      </tbody>
    </table></div>
    </div>
    <p class="text-xs muted mt-1">O detalhe assunto a assunto fica em <button class="link-btn" onclick="navigate('revisao')">Revisão</button>, ao lado da fila que diz o que fazer com cada um.</p>
  </div>

  ${htmlCardOQueMaisCai(u, 5)}

  ${htmlEvolucaoPorAssunto(u)}

  ${htmlSecaoRecolhivel("desempenho-confianca", "Sua confiança e o acerto", (calibracao.certeza.n ? "certeza: "+calibracao.certeza.taxa+"% de acerto" : "sem dados ainda")+((calibracao.alertaExcessoConfianca||falsaSeguranca.length) ? " · atenção" : ""), `
  <div class="grid grid-3 compacto mb-2">
    <div class="stat-tile"><div class="stat-value">${calibracao.certeza.n?calibracao.certeza.taxa+"%":"—"}</div><div class="stat-label">acerto quando você disse "certeza" (${calibracao.certeza.n})</div></div>
    <div class="stat-tile"><div class="stat-value">${calibracao.duvida.n?calibracao.duvida.taxa+"%":"—"}</div><div class="stat-label">acerto quando disse "na dúvida" (${calibracao.duvida.n})</div></div>
    <div class="stat-tile"><div class="stat-value">${calibracao.chute.n?calibracao.chute.taxa+"%":"—"}</div><div class="stat-label">acerto quando disse "chute" (${calibracao.chute.n})</div></div>
  </div>
  ${(calibracao.alertaExcessoConfianca || falsaSeguranca.length) ? `<div class="card-flat mb-1 borda-alerta">
    <div class="card-title">Onde sua confiança engana</div>
    ${calibracao.alertaExcessoConfianca ? `<p class="text-sm">Nas questões em que você marcou "certeza", a taxa de acerto é de ${calibracao.certeza.taxa}%. Quando alguém tem certeza de verdade, esse número fica perto de 90%: a diferença é o tamanho do ponto cego.</p>` : ""}
    ${falsaSeguranca.length ? `<p class="text-sm muted mt-1">Assuntos em que você respondeu com certeza e errou mesmo assim — é para cá que vale direcionar o estudo antes de qualquer outra coisa:</p>
      ${falsaSeguranca.slice(0,5).map(f=>`<div class="flex justify-between items-center card-flat mb-1 mt-1">
        <span class="text-sm">${escapeHtml(nomeAssunto(f.assuntoId))} <span class="text-xs muted">(${f.n} respostas com "certeza")</span></span>
        <span class="flex items-center gap-1"><span class="badge badge-danger">${f.taxa}%</span><button class="btn btn-secondary btn-sm" onclick="praticarAssuntoFalsaSeguranca('${f.assuntoId}')">Praticar</button></span>
      </div>`).join("")}` : ""}
    <div class="flex gap-1 mt-2 quebra">
      <button class="btn btn-secondary btn-sm" onclick="navigate('revisao')">Ver as filas por tipo de erro</button>
      <button class="btn btn-secondary btn-sm" onclick="iniciarSessaoFlashcards({somenteFalsaSeguranca:true})">${iconeSvg("cards")} Revisão rápida desses assuntos</button>
    </div>
  </div>` : ""}
  `, calibracao.alertaExcessoConfianca || falsaSeguranca.length)}
  ${ritmo ? htmlSecaoRecolhivel("desempenho-ritmo", "Ritmo — quanto tempo você leva por questão", "mediana de "+formatarDuracao(ritmo.mediana)+" por questão", `
    <p class="text-xs muted">Baseado em ${ritmo.n} questão(ões) cronometradas (prática e simulados).</p>
    <div class="grid grid-4 compacto mt-2">
      <div class="stat-tile"><div class="stat-value">${formatarDuracao(ritmo.mediana)}</div><div class="stat-label">tempo mediano por questão</div></div>
      <div class="stat-tile"><div class="stat-value">${formatarDuracao(ritmo.media)}</div><div class="stat-label">tempo médio</div></div>
      <div class="stat-tile"><div class="stat-value">${ritmo.mediaAcertos!==null?formatarDuracao(ritmo.mediaAcertos):"—"}</div><div class="stat-label">média quando acerta</div></div>
      <div class="stat-tile"><div class="stat-value">${ritmo.mediaErros!==null?formatarDuracao(ritmo.mediaErros):"—"}</div><div class="stat-label">média quando erra</div></div>
    </div>
    ${ritmo.assuntosLentos.length ? `<div class="mt-2">
      <div class="text-sm peso-600">Assuntos em que você mais trava</div>
      ${ritmo.assuntosLentos.map(a=>`<div class="flex justify-between items-center card-flat mb-1">
        <span class="text-sm">${escapeHtml(nomeAssunto(a.assuntoId))} <span class="text-xs muted">(${a.n} questões)</span></span>
        <span class="badge ${a.media>ritmo.mediana*1.5?"badge-amber":"badge-muted"}">${formatarDuracao(a.media)} por questão</span>
      </div>`).join("")}
    </div>` : ""}
  `) : ""}
  `;
}
