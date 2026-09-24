/* Esc — codigo/10-telas-do-aluno.js  (parte 10 de 13)
   Favoritos, Livro de Ouro, Histórico de Atividade, Meu Desempenho, Meta, Meu Grupo e Perfil.
   Os arquivos de codigo/ são carregados em ordem pelo index.html (lista
   ESC_ARQUIVOS.codigo) e dividem o mesmo espaço: uma função escrita num
   arquivo é usada nos outros sem import. */

/* ==========================================================================
   16. FAVORITOS
   ========================================================================== */
/* Favoritos guarda duas coisas diferentes — questões e cartões —, e por isso
   tem duas abas em vez de uma lista misturada: quem vem procurar "aquela
   questão de choque séptico" não quer tropeçar em cartão de conceito no
   meio, e vice-versa. A contagem de cada aba fica na própria aba, para a
   escolha ser feita sem entrar nas duas. */
function abaFavoritos(){
  const f = state.filtroRota;
  if(f.abaFavoritos !== "cartoes" && f.abaFavoritos !== "questoes") f.abaFavoritos = "questoes";
  return f.abaFavoritos;
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
  const abas = `<div class="flex gap-1 mb-2" style="flex-wrap:wrap">
    <button class="pill ${aba==="questoes"?"active":""}" onclick="mudarAbaFavoritos('questoes')">${iconeSvg("book")} Questões (${favs.length})</button>
    <button class="pill ${aba==="cartoes"?"active":""}" onclick="mudarAbaFavoritos('cartoes')">${iconeSvg("cards")} Flashcards (${cartoes.length})</button>
  </div>`;
  if(aba === "cartoes") return `
  <div class="page-header"><h2>Favoritos</h2><p>O que você salvou para rever: questões numa aba, flashcards na outra.</p></div>
  ${abas}
  ${renderFavoritosCartoes(u, cartoes)}`;
  return `
  <div class="page-header"><h2>Favoritos</h2><p>O que você salvou para rever: questões numa aba, flashcards na outra.</p></div>
  ${abas}
  <p class="text-sm muted mb-2">${favs.length} questão(ões) marcada(s)${comNota?`, ${comNota} com anotação sua`:""}. Abra qualquer uma na íntegra, pratique só ela ou pratique todas em sequência.</p>
  ${favs.length ? `<div class="flex gap-1 mb-2" style="flex-wrap:wrap"><button class="btn btn-primary" onclick="praticarFavoritas()">${iconeSvg("book")} Praticar todas as favoritas</button></div>` : ""}
  ${favs.length ? pag.itens.map(({reg,q})=>{
    const area = getArea(q.areaId);
    const ult = ultimaResposta(u.id, q.id);
    return `<div class="card mb-1">
      <div class="qcard-meta mb-1">
        <span class="badge badge-accent">${escapeHtml(area?area.nome:"—")}</span>
        <span class="badge badge-muted">${escapeHtml(nomeAssunto(q.assuntoId))}</span>
        <span class="badge badge-muted">${escapeHtml(q.banca)} · ${q.ano}</span>
        ${ult ? `<span class="badge ${ult.correta?"badge-accent":"badge-danger"}">última: ${ult.correta?"acertou":"errou"}</span>` : '<span class="badge badge-muted">ainda não respondida</span>'}
        ${errosNaQuestao(u.id, q.id) ? `<span class="badge badge-danger">errada ${rotuloVezes(errosNaQuestao(u.id, q.id))}</span>` : ""}
      </div>
      <div class="text-sm"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${q.id}')">${escapeHtml(q.enunciado.slice(0,200))}${q.enunciado.length>200?"…":""}</span></div>
      ${(reg.nota||"").trim() ? `<div class="nota-pessoal mt-2"><div class="nota-pessoal-titulo">${iconeSvg("message")} Minha anotação</div><div class="text-sm">${escapeHtml(reg.nota)}</div></div>` : ""}
      <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
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
function renderFavoritosCartoes(u, cartoes){
  const pag = paginar(cartoes, "favoritos-cartoes");
  return `
  <p class="text-sm muted mb-2">${cartoes.length} cartão(ões) salvo(s). Salvar não muda a repetição espaçada: o cartão continua voltando na data dele — isto aqui é a sua pilha de "quero rever este conceito".</p>
  ${cartoes.length ? `<div class="flex gap-1 mb-2" style="flex-wrap:wrap"><button class="btn btn-primary" onclick="revisarCartoesFavoritos()">${iconeSvg("cards")} Revisar os cartões salvos</button></div>` : ""}
  ${cartoes.length ? pag.itens.map(({reg,cartao})=>{
    const rev = revisaoDoCartao(u.id, cartao.id);
    return `<div class="card mb-1">
      <div class="qcard-meta mb-1">
        <span class="badge badge-accent">${escapeHtml(nomeAssunto(cartao.assuntoId))}</span>
        ${cartao.usuarioId ? '<span class="badge badge-muted">meu cartão</span>' : '<span class="badge badge-muted">cartão da equipe</span>'}
        ${cartao.origem==="questao" ? '<span class="badge badge-amber">gerado de uma questão</span>' : ""}
        ${rev && rev.proximaRevisao ? `<span class="badge badge-muted">volta em ${formatDataBR(rev.proximaRevisao)}</span>` : '<span class="badge badge-muted">ainda não revisado</span>'}
      </div>
      <div class="text-sm" style="font-weight:600">${escapeHtml(cartao.frente)}</div>
      <div class="text-sm muted mt-1">${escapeHtml(cartao.verso.slice(0,220))}${cartao.verso.length>220?"…":""}</div>
      <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
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
    doacao:      {nome:"Doação",       badge:"badge-amber",  icone:"star"},
    colaboracao: {nome:"Colaboração",  badge:"badge-accent", icone:"users"},
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
        <div class="flex justify-between items-center gap-2" style="flex-wrap:wrap">
          <div>
            <div style="font-weight:700">${escapeHtml(r.nome)} ${r.destaque?'<span class="badge badge-amber">destaque</span>':""}</div>
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
  <div class="card mb-2" style="border-color:var(--amber)">
    <div class="flex justify-between items-center gap-2" style="flex-wrap:wrap">
      <div>
        <div class="card-title">Obrigado</div>
        <p class="text-sm muted">${registros.length} registro(s) de doação, colaboração e apoio. Se você contribuiu e não está aqui, avise a coordenação — a lista é mantida à mão, e esquecer alguém é o único erro que não queremos cometer.</p>
      </div>
      <div class="flex gap-1" style="flex-wrap:wrap">
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
    <div class="modal-header"><h3>Quero contribuir</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
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
  db.feedbacks.push({id:uid("fb"), usuarioId:u.id, papel:u.papel, tipo:"contribuicao ("+tipo+")", texto, data:hojeISO(), lido:false});
  saveState(); fecharModal();
  toast("Recebido! A coordenação vai entrar em contato. Obrigado de verdade.");
}
function abrirFormularioLivroOuro(id){
  if(!podeAdmin("livro-ouro")){ toast("Seu nível de acesso não permite editar o Livro de Ouro.", "err"); return; }
  const r = id ? (db.livroOuro||[]).find(x=>x.id===id) : null;
  const tipos = tiposLivroOuro();
  abrirModal(`
    <div class="modal-header"><h3>${r?"Editar registro":"Registrar agradecimento"}</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
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
    <div class="flex gap-1 mt-1"><button class="btn btn-primary" onclick="salvarRegistroLivroOuro('${id||""}')">Salvar</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
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
  abrirModal(`<div class="modal-header"><h3>Remover registro</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
    <p>Tem certeza? O agradecimento deixará de aparecer para todos.</p>
    <div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="removerRegistroLivroOuroConfirmado('${id}')">Remover</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
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
    respostasSessao: respostas.map(r=>({questaoId:r.questaoId, alternativaEscolhida:r.alternativaEscolhida, correta:r.correta, confianca:r.confianca, data:r.data})),
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
  <div class="grid grid-4 mb-2">
    <div class="stat-tile"><div class="stat-value">${diasAtivos.length}</div><div class="stat-label">dia(s) com estudo registrado · ${sessoes.length} conjunto(s) fechado(s)</div></div>
    <div class="stat-tile"><div class="stat-value">${totalRespostas}</div><div class="stat-label">questões respondidas no total${cartoesTotal?" · "+cartoesTotal+" flashcard(s)":""}</div></div>
    <div class="stat-tile"><div class="stat-value">${totalRespostas?pct(totalAcertos,totalRespostas)+"%":"—"}</div><div class="stat-label">taxa de acerto geral</div></div>
    <div class="stat-tile"><div class="stat-value">${ultimos7.length?pct(ultimos7.filter(r=>r.correta).length, ultimos7.length)+"%":"—"}</div><div class="stat-label">taxa de acerto nos últimos 7 dias (${ultimos7.length} questões)</div></div>
  </div>
  <div class="card mb-2">
    <div class="card-title">Últimos 14 dias</div>
    <div class="mt-2">${graficoBarrasSvg(dias.map(d=>({label:formatDataBR(d.data).slice(0,5), valor: d.total?pct(d.acertos,d.total):null, n:d.total})))}</div>
    <p class="text-xs muted mt-1">Cada barra é a taxa de acerto do dia; o número entre parênteses é quantas questões você respondeu naquele dia.</p>
  </div>
  <div class="card mb-2">
    <div class="card-title mb-1">Dia a dia</div>
    <p class="text-sm muted mb-2">Cada dia é uma linha, com tudo o que você fez nele — inclusive as questões respondidas fora de um conjunto e os flashcards. Clique no dia para reabrir o feedback questão a questão.</p>
    ${diasAtivos.length ? pagDias.itens.map(d=>{
      const taxa = d.total ? pct(d.acertos, d.total) : null;
      const sessoesDoDia = d.sessoes.length;
      return `<div class="card-flat mb-1">
        <div class="flex justify-between items-center gap-2" style="flex-wrap:wrap">
          <div style="min-width:220px;flex:1">
            <div style="font-weight:600">${formatDataBR(d.data)}${d.data===hojeISO()?' · <span class="badge badge-accent">hoje</span>':""}</div>
            <div class="text-xs muted mt-1">
              ${d.total ? `${d.total} questão(ões) · ${d.acertos} acerto(s) · ${d.chutes} chute(s) · ${d.duvidas} na dúvida` : "nenhuma questão neste dia"}
              ${d.cartoes ? ` · ${d.cartoes} flashcard(s)${d.cartoesExatos?"":" (ao menos)"}` : ""}
              ${sessoesDoDia ? ` · ${sessoesDoDia} conjunto(s) fechado(s)` : ""}
              ${d.simulados.length ? ` · ${d.simulados.length} simulado(s)` : ""}
            </div>
          </div>
          <div class="flex items-center gap-1" style="flex-wrap:wrap">
            ${taxa!==null ? `<span class="badge ${taxa>=70?"badge-accent":taxa>=50?"badge-amber":"badge-danger"}">${taxa}% de acerto</span>` : ""}
            ${d.cartoes ? `<span class="badge badge-muted">${iconeSvg("cards")} ${d.cartoes}</span>` : ""}
            ${d.total ? `<button class="btn btn-secondary btn-sm" onclick="abrirDiaDoHistorico('${d.data}')">${iconeSvg("chart")} Abrir o dia</button>` : ""}
          </div>
        </div>
        ${sessoesDoDia ? `<div class="mt-2" style="border-top:1px solid var(--border);padding-top:.6rem">
          ${d.sessoes.map(sess=>{
            const t = pct(sess.acertos, sess.total);
            return `<div class="flex justify-between items-center gap-2 text-xs muted mb-1" style="flex-wrap:wrap">
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
  const lista = prioridadesDeEstudo(u.id).slice(0, limite);
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
    <button class="btn btn-primary btn-sm mt-2" onclick="praticarPrioridadesDaProva()">${iconeSvg("play")} Praticar as 5 maiores prioridades</button>
  </div>`;
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

function renderDesempenho(){
  const u = usuarioAtual();
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

  const graficoAreas = graficoBarrasVerticaisSvg(porArea.map(a=>({
    label: abreviarArea(a.nome), taxa: a.taxa, total: a.total, acertos: a.acertos,
  })), {altura:140, larguraMax:60});

  return `
  <div class="page-header"><h2>Meu Desempenho</h2><p>Primeiro o total de tudo que você já respondeu, depois como está indo no período que você escolher, e por fim onde mexer.</p></div>

  <div class="card mb-2">
    <div class="card-title">Desempenho total — todas as questões</div>
    <p class="text-sm muted">Soma de tudo que você já respondeu na plataforma, sem separar por área, assunto ou tipo de sessão.</p>
    <div class="grid grid-4 mt-2">
      <div class="stat-tile"><div class="stat-value">${totalGeral.taxa!==null?totalGeral.taxa+"%":"—"}</div><div class="stat-label">acerto em todas as respostas (${totalGeral.acertos}/${totalGeral.total})</div></div>
      <div class="stat-tile"><div class="stat-value">${totalGeral.taxaUltimaTentativa!==null?totalGeral.taxaUltimaTentativa+"%":"—"}</div><div class="stat-label">acerto considerando só a última tentativa de cada questão</div></div>
      <div class="stat-tile"><div class="stat-value">${totalGeral.distintas}</div><div class="stat-label">questões diferentes já respondidas (${totalGeral.cobertura}% do banco)</div></div>
      <div class="stat-tile"><div class="stat-value">${totalGeral.naoRespondidas}</div><div class="stat-label">questões do banco que você ainda não viu</div></div>
    </div>
  </div>

  ${htmlCardNotaEstimada(u)}

  <div class="card mb-2">
    <div class="card-title">${iconeSvg("cards")} Flashcards — contagem à parte</div>
    <p class="text-sm muted">Cartão não tem acerto nem erro, só autoavaliação, e leva segundos onde uma questão de prova leva minutos. Por isso ele é contado aqui, separado das questões acima: é volume de revisão, não taxa de acerto.</p>
    <div class="grid grid-4 mt-2">
      <div class="stat-tile"><div class="stat-value">${cartoes.revisoes}</div><div class="stat-label">cartões revisados no total (contando as repetições)</div></div>
      <div class="stat-tile"><div class="stat-value">${cartoes.cartoes}</div><div class="stat-label">cartões diferentes que já passaram pelo seu baralho</div></div>
      <div class="stat-tile"><div class="stat-value">${cartoes.hoje}</div><div class="stat-label">revisados hoje (meta de ${metaCartoesDoUsuario(u)} por dia)</div></div>
      <div class="stat-tile"><div class="stat-value">${cartoes.dias}</div><div class="stat-label">dias com cartão revisado${cartoes.sequencia?` · ${cartoes.sequencia} seguido(s)`:""}</div></div>
    </div>
    <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
      <button class="btn btn-secondary btn-sm" onclick="navigate('flashcards')">${iconeSvg("cards")} Ir para a Revisão Rápida</button>
      ${cartoes.vencidos?`<span class="badge badge-amber" style="align-self:center">${cartoes.vencidos} cartão(ões) vencido(s) esperando</span>`:""}
    </div>
  </div>

  <div class="card mb-2">
    <div class="flex justify-between items-center gap-2 mb-2" style="flex-wrap:wrap">
      <div style="min-width:320px;flex:1">
        <div class="card-title" style="margin-bottom:.2rem">Como você está indo — ${escapeHtml(rotuloPeriodo.toLowerCase())}</div>
        <div class="text-sm muted">Cada barra é 100% das questões daquele ${ehDiario?"dia":"mês"}: a parte verde é o que você acertou, o cinza é o que errou.</div>
      </div>
      <div class="seletor-periodo">
        ${PERIODOS_DESEMPENHO.map(p=>`<button class="pill ${ctx.periodo===p.id?"active":""}" onclick="mudarPeriodoDesempenho('${p.id}')">${p.label}</button>`).join("")}
      </div>
    </div>

    ${ehDiario ? `
    <div class="grid grid-4 mb-2">
      <div class="stat-tile"><div class="stat-value">${resumoAtual.taxa!==null?resumoAtual.taxa+"%":"—"}</div><div class="stat-label">acerto nos últimos ${resumoAtual.dias} dias (${resumoAtual.acertos}/${resumoAtual.total})</div></div>
      <div class="stat-tile">
        <div class="stat-value" ${resumoAtual.variacao!==null&&resumoAtual.variacao<0?'style="color:var(--danger)"':(resumoAtual.variacao!==null&&resumoAtual.variacao>0?'style="color:var(--accent)"':"")}>${resumoAtual.variacao!==null?(resumoAtual.variacao>0?"+":"")+resumoAtual.variacao+" p.p.":"—"}</div>
        <div class="stat-label">contra os ${resumoAtual.dias} dias anteriores${resumoAtual.taxaAnterior!==null?" ("+resumoAtual.taxaAnterior+"%)":""}</div>
      </div>
      <div class="stat-tile"><div class="stat-value">${resumoAtual.diasComEstudo}/${resumoAtual.dias}</div><div class="stat-label">dias em que você estudou</div></div>
      <div class="stat-tile"><div class="stat-value">${resumoAtual.mediaPorDiaEstudado}</div><div class="stat-label">questões por dia estudado</div></div>
    </div>` : `
    <div class="grid grid-4 mb-2">
      <div class="stat-tile"><div class="stat-value">${somaMeses.total?pct(somaMeses.acertos,somaMeses.total)+"%":"—"}</div><div class="stat-label">acerto no período (${somaMeses.acertos}/${somaMeses.total})</div></div>
      <div class="stat-tile"><div class="stat-value">${somaMeses.total}</div><div class="stat-label">questões respondidas no período</div></div>
      <div class="stat-tile"><div class="stat-value">${mesesComEstudo.length}</div><div class="stat-label">meses com pelo menos uma questão</div></div>
      <div class="stat-tile"><div class="stat-value">${melhorMes?melhorMes.taxa+"%":"—"}</div><div class="stat-label">melhor mês${melhorMes?" ("+escapeHtml(melhorMes.label)+")":""}</div></div>
    </div>`}

    ${graficoBarrasVerticaisSvg(dados.itens, {altura:140, larguraMax: ehDiario?30:42, rotuloRotacionado: ehDiario && dados.dias>20})}

    ${ehDiario ? `<p class="text-xs muted mt-1">Traço fino na base = dia sem nenhuma questão. Dia parado aparece de propósito: a constância é metade do resultado, e um gráfico que esconde os buracos mente sobre a rotina.</p>`
      : `<p class="text-xs muted mt-1">Mês sem questão aparece como traço na base. Comparar meses só faz sentido junto do volume: 100% em 3 questões não é melhor do que 72% em 400.</p>`}

    <div class="card-flat mt-2">
      <div class="text-sm" style="font-weight:600">As duas janelas curtas, lado a lado</div>
      <div class="grid grid-2 mt-1">
        <div class="text-sm">Últimos 14 dias: <strong>${resumo14.taxa!==null?resumo14.taxa+"%":"—"}</strong> <span class="muted">(${resumo14.total} questões, ${resumo14.diasComEstudo} dias com estudo)</span></div>
        <div class="text-sm">Últimos 30 dias: <strong>${resumo30.taxa!==null?resumo30.taxa+"%":"—"}</strong> <span class="muted">(${resumo30.total} questões, ${resumo30.diasComEstudo} dias com estudo)</span></div>
      </div>
      ${(resumo14.taxa!==null && resumo30.taxa!==null && Math.abs(resumo14.taxa-resumo30.taxa)>=8) ? `<p class="text-xs mt-1" style="color:var(--amber);font-weight:600">As duas janelas estão distantes (${Math.abs(resumo14.taxa-resumo30.taxa)} p.p.): ${resumo14.taxa>resumo30.taxa?"as duas últimas semanas foram melhores que o mês inteiro — algo que você mudou está funcionando.":"as duas últimas semanas caíram em relação ao mês. Vale ver se mudou o assunto, o tipo de questão ou o ritmo."}</p>` : ""}
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
            <td class="text-sm" style="font-weight:600">${escapeHtml(a.nome)}</td>
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

  ${htmlCardOQueMaisCai(u, 10)}

  <div class="grid grid-3 mb-2">
    <div class="stat-tile"><div class="stat-value">${calibracao.certeza.n?calibracao.certeza.taxa+"%":"—"}</div><div class="stat-label">acerto quando você disse "certeza" (${calibracao.certeza.n})</div></div>
    <div class="stat-tile"><div class="stat-value">${calibracao.duvida.n?calibracao.duvida.taxa+"%":"—"}</div><div class="stat-label">acerto quando disse "na dúvida" (${calibracao.duvida.n})</div></div>
    <div class="stat-tile"><div class="stat-value">${calibracao.chute.n?calibracao.chute.taxa+"%":"—"}</div><div class="stat-label">acerto quando disse "chute" (${calibracao.chute.n})</div></div>
  </div>
  ${(calibracao.alertaExcessoConfianca || falsaSeguranca.length) ? `<div class="card mb-2" style="border-color:var(--amber)">
    <div class="card-title">Onde sua confiança engana</div>
    ${calibracao.alertaExcessoConfianca ? `<p class="text-sm">Nas questões em que você marcou "certeza", a taxa de acerto é de ${calibracao.certeza.taxa}%. Quando alguém tem certeza de verdade, esse número fica perto de 90%: a diferença é o tamanho do ponto cego.</p>` : ""}
    ${falsaSeguranca.length ? `<p class="text-sm muted mt-1">Assuntos em que você respondeu com certeza e errou mesmo assim — é para cá que vale direcionar o estudo antes de qualquer outra coisa:</p>
      ${falsaSeguranca.slice(0,5).map(f=>`<div class="flex justify-between items-center card-flat mb-1 mt-1">
        <span class="text-sm">${escapeHtml(nomeAssunto(f.assuntoId))} <span class="text-xs muted">(${f.n} respostas com "certeza")</span></span>
        <span class="flex items-center gap-1"><span class="badge badge-danger">${f.taxa}%</span><button class="btn btn-secondary btn-sm" onclick="praticarAssuntoFalsaSeguranca('${f.assuntoId}')">Praticar</button></span>
      </div>`).join("")}` : ""}
    <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
      <button class="btn btn-secondary btn-sm" onclick="navigate('revisao')">Ver as filas por tipo de erro</button>
      <button class="btn btn-secondary btn-sm" onclick="iniciarSessaoFlashcards({somenteFalsaSeguranca:true})">${iconeSvg("cards")} Revisão rápida desses assuntos</button>
    </div>
  </div>` : ""}
  ${ritmo ? `<div class="card mb-2">
    <div class="card-title">Ritmo — quanto tempo você leva por questão</div>
    <p class="text-xs muted">Baseado em ${ritmo.n} questão(ões) cronometradas (prática e simulados).</p>
    <div class="grid grid-4 mt-2">
      <div class="stat-tile"><div class="stat-value">${formatarDuracao(ritmo.mediana)}</div><div class="stat-label">tempo mediano por questão</div></div>
      <div class="stat-tile"><div class="stat-value">${formatarDuracao(ritmo.media)}</div><div class="stat-label">tempo médio</div></div>
      <div class="stat-tile"><div class="stat-value">${ritmo.mediaAcertos!==null?formatarDuracao(ritmo.mediaAcertos):"—"}</div><div class="stat-label">média quando acerta</div></div>
      <div class="stat-tile"><div class="stat-value">${ritmo.mediaErros!==null?formatarDuracao(ritmo.mediaErros):"—"}</div><div class="stat-label">média quando erra</div></div>
    </div>
    ${ritmo.assuntosLentos.length ? `<div class="mt-2">
      <div class="text-sm" style="font-weight:600">Assuntos em que você mais trava</div>
      ${ritmo.assuntosLentos.map(a=>`<div class="flex justify-between items-center card-flat mb-1">
        <span class="text-sm">${escapeHtml(nomeAssunto(a.assuntoId))} <span class="text-xs muted">(${a.n} questões)</span></span>
        <span class="badge ${a.media>ritmo.mediana*1.5?"badge-amber":"badge-muted"}">${formatarDuracao(a.media)} por questão</span>
      </div>`).join("")}
    </div>` : ""}
  </div>` : ""}
  `;
}

/* ==========================================================================
   18. META DE ESTUDO
   ==========================================================================
   A meta deixou de ser uma página no menu. Motivo: é um número que se define
   uma vez e se ajusta de vez em quando, mas que precisa ser VISTO todo dia —
   uma página própria invertia isso, escondendo o acompanhamento e dando
   destaque à configuração. Agora o progresso do dia abre a tela Estudar, e o
   ajuste do número fica a um clique, nesta janela.

   A rota "metas" continua existindo e leva para Estudar, para não quebrar
   link antigo, favorito do navegador ou hash salvo por alguém. */
function abrirModalMeta(){
  const u = usuarioAtual();
  const meta = metaDoUsuario(u);
  const feitasHoje = questoesRespondidasHoje(u.id);
  abrirModal(`
    <div class="modal-header"><h3>Meta diária de questões</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
    <p class="text-sm muted">Quantas questões você quer responder por dia. Vale mais uma meta modesta que você cumpre todo dia do que uma ambiciosa que você abandona na terceira semana.</p>
    <div class="field mt-2"><label class="label">Questões por dia</label><input class="input" type="number" id="metaInput" value="${meta}" min="1" max="500"></div>
    <div class="flex gap-1 mb-2" style="flex-wrap:wrap">
      <button class="pill" onclick="document.getElementById('metaInput').value=${db.configGeral.metaMinimaQuestoesDia}">mínimo (${db.configGeral.metaMinimaQuestoesDia})</button>
      <button class="pill" onclick="document.getElementById('metaInput').value=${db.configGeral.metaRecomendadaQuestoesDia}">ideal (${db.configGeral.metaRecomendadaQuestoesDia})</button>
    </div>
    <p class="text-xs muted">Recomendação da coordenação: mínimo de ${db.configGeral.metaMinimaQuestoesDia}/dia, ideal de ${db.configGeral.metaRecomendadaQuestoesDia}/dia. Hoje você já respondeu ${feitasHoje}.</p>
    <div class="flex gap-1 mt-3"><button class="btn btn-primary" onclick="salvarMeta()">Salvar meta</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
}
function salvarMeta(){
  const valor = parseInt(document.getElementById("metaInput").value);
  if(!valor || valor<1){ toast("Informe um número válido.", "err"); return; }
  usuarioAtual().metaQuestoesDia = valor;
  saveState();
  fecharModal();
  toast(valor < db.configGeral.metaMinimaQuestoesDia ? "Meta salva. Está abaixo da recomendação mínima da coordenação." : "Meta salva.");
  render();
}
/* Meta diária de cartões: mesma janela, mesma lógica, outra unidade. */
function abrirModalMetaCartoes(){
  const u = usuarioAtual();
  const meta = metaCartoesDoUsuario(u);
  const feitosHoje = cartoesRevisadosHoje(u.id);
  const recomendada = (db.configGeral && db.configGeral.metaCartoesDia) || CONFIG.metaCartoesDia;
  abrirModal(`
    <div class="modal-header"><h3>Meta diária de cartões</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
    <p class="text-sm muted">Quantos flashcards você quer revisar por dia. Um cartão leva segundos, então a meta de cartões costuma ser bem maior que a de questões — e serve para segurar a rotina nos dias em que não dá para sentar e resolver prova.</p>
    <div class="field mt-2"><label class="label">Cartões por dia</label><input class="input" type="number" id="metaCartoesInput" value="${meta}" min="1" max="500"></div>
    <div class="flex gap-1 mb-2" style="flex-wrap:wrap">
      <button class="pill" onclick="document.getElementById('metaCartoesInput').value=10">dia corrido (10)</button>
      <button class="pill" onclick="document.getElementById('metaCartoesInput').value=${recomendada}">recomendada (${recomendada})</button>
    </div>
    <p class="text-xs muted">Hoje você já revisou ${feitosHoje} cartão(ões). A meta de cartões não substitui a de questões: elas convivem, e bater qualquer uma das duas já mantém sua sequência daquele tipo de estudo.</p>
    <div class="flex gap-1 mt-3"><button class="btn btn-primary" onclick="salvarMetaCartoes()">Salvar meta</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
}
function salvarMetaCartoes(){
  const valor = parseInt(document.getElementById("metaCartoesInput").value);
  if(!valor || valor<1){ toast("Informe um número válido.", "err"); return; }
  usuarioAtual().metaCartoesDia = valor;
  saveState();
  fecharModal();
  toast("Meta de cartões salva.");
  render();
}

/* ==========================================================================
   18-B. MEU GRUPO — cada aluno usa, por padrão, o calendário oficial da
   coordenação, mas pode criar seu próprio grupo/turma com calendário
   customizado, ou adotar o calendário que outro aluno já montou.
   ========================================================================== */
function renderMeuGrupo(){
  const u = usuarioAtual();
  const meuGrupo = getGrupoDoUsuario(u);
  const souDono = meuGrupo.criadoPor === u.id && !meuGrupo.oficial;
  const semTurma = !!meuGrupo.oficial;
  const anoDaMinhaTurma = anoDoGrupo(meuGrupo, u);
  const anoParaCriar = temCalendarioProprio(u.anoFaculdade) ? u.anoFaculdade : CONFIG.anoFaculdadePadrao;
  const outrosGrupos = db.grupos.filter(g=>g.id!==meuGrupo.id && !g.oficial);
  const solicitacoesPendentes = souDono ? (meuGrupo.solicitacoesPendentes||[]) : [];
  const formado = !temCalendarioProprio(u.anoFaculdade);
  return `
  <div class="page-header"><h2>Meu Grupo</h2><p>Todas as turmas do seu ano passam pelos mesmos blocos, na mesma ordem. O que muda de uma para outra é por qual bloco ela começa — é o <strong>Grupo A, B, C ou D</strong> do calendário da faculdade.</p></div>

  ${semTurma ? `<div class="card mb-2" style="border-color:var(--accent)">
    <div class="card-title">${iconeSvg("users")} Escolha a sua turma</div>
    <p class="text-sm">Você ainda está no <strong>calendário oficial da coordenação</strong>. Ele funciona, mas segue o Grupo A: se a sua turma é outra, o bloco atual aparece trocado. Escolha abaixo a turma em que você está — ou crie a sua, se ela ainda não existir aqui.</p>
    ${temCalendarioProprio(u.anoFaculdade) ? `<div class="flex gap-1 items-end mt-2" style="flex-wrap:wrap">
      <div class="field" style="margin-bottom:0;min-width:240px"><label class="label">O jeito rápido: qual é o seu grupo?</label>
        <select class="select" id="rodizioRapido">${opcoesRodizioPorLetra(u.anoFaculdade).map(o=>`<option value="${o.deslocamento}">Grupo ${escapeHtml(o.rotulo)} — começa em ${escapeHtml(o.bloco.nome)}</option>`).join("")}</select>
      </div>
      <button class="btn btn-primary" onclick="entrarNaTurmaDoRodizio(document.getElementById('rodizioRapido').value)">Entrar no meu grupo</button>
    </div>` : ""}
    <p class="text-xs muted mt-1">Dá para trocar depois quantas vezes precisar. Você fica em uma turma de cada vez.</p>
  </div>` : ""}

  <div class="card mb-2">
    <div class="qcard-meta mb-1">${meuGrupo.oficial ? '<span class="badge badge-muted">Calendário oficial — nenhuma turma escolhida</span>' : `<span class="badge badge-accent">${escapeHtml(nomeRodizio(anoDaMinhaTurma, meuGrupo.deslocamento))}</span>` + (meuGrupo.doRodizio ? '<span class="badge badge-muted">Turma do rodízio, aberta</span>' : souDono ? '<span class="badge badge-muted">Criado por você</span>' : '<span class="badge badge-muted">Criado por outro aluno</span>')}</div>
    <div style="font-weight:700;font-size:1.1rem">${escapeHtml(meuGrupo.nome)}</div>
    <div class="text-sm muted mt-1">${blocosDoGrupo(meuGrupo, u).length} bloco(s) na sequência de ${escapeHtml(anoDeReferencia(anoDaMinhaTurma))}${!meuGrupo.oficial?" · "+((meuGrupo.membrosAprovados||[]).length)+" membro(s)":""}.</div>
    ${formado ? `<div class="text-xs muted mt-1">Você está marcado como <strong>${escapeHtml(u.anoFaculdade||"Formado(a)")}</strong>, e quem já se formou não tem calendário de faculdade próprio. Participando de um grupo, você acompanha o calendário do ano daquela turma; fora dele, a plataforma usa a sequência de ${escapeHtml(CONFIG.anoFaculdadePadrao)} como referência.</div>` : ""}
    ${!semTurma ? `<button class="btn btn-ghost btn-sm mt-2" onclick="sairDoMeuGrupo()">Sair desta turma e voltar ao calendário oficial</button>` : ""}
  </div>

  ${solicitacoesPendentes.length ? `<div class="card mb-2" style="border-color:var(--amber)">
    <div class="card-title">Solicitações de acesso pendentes (${solicitacoesPendentes.length})</div>
    <p class="text-sm muted">Essas pessoas pediram para entrar na sua turma. Só entram depois que você aprovar.</p>
    ${solicitacoesPendentes.map(uidSolicitante=>{
      const solicitante = getUsuario(uidSolicitante);
      return `<div class="flex justify-between items-center card-flat mb-1">
        <span class="text-sm">${escapeHtml(solicitante?solicitante.nome:"—")}</span>
        <div class="flex gap-1"><button class="btn btn-primary btn-sm" onclick="aprovarAcessoGrupo('${meuGrupo.id}','${uidSolicitante}')">Aprovar</button><button class="btn btn-ghost btn-sm" onclick="rejeitarAcessoGrupo('${meuGrupo.id}','${uidSolicitante}')">Rejeitar</button></div>
      </div>`;
    }).join("")}
  </div>` : ""}

  <div class="card mb-2">
    <div class="card-title">Calendário desta turma</div>
    ${renderEditorCalendario(meuGrupo, {podeEditar: souDono, usuario: u, podeEditarSequencia: podeAdmin("blocos")})}
    ${!souDono && !semTurma ? '<p class="text-xs muted mt-1">Só quem criou a turma muda o grupo do rodízio. Se a letra estiver errada, avise o dono da turma ou a coordenação.</p>' : ""}
    <p class="text-xs muted mt-1">A ordem dos blocos é a do seu ano e é definida pela coordenação — o que a turma escolhe é por qual deles entra.</p>
  </div>

  ${!meuGrupo.oficial ? renderQuestoesDoGrupo(meuGrupo) : ""}

  <div class="card mb-2">
    <div class="card-title">${semTurma ? "Criar a minha turma" : "Criar outra turma"}</div>
    <p class="text-sm muted">A turma segue a sequência de blocos de ${escapeHtml(anoParaCriar)} (a mesma de todas as turmas do ano) e você escolhe em qual grupo do rodízio ela entra — é assim que duas turmas do mesmo ano estudam matérias diferentes na mesma semana. Quem pedir para entrar precisa da sua aprovação.</p>
    ${formado ? `<p class="text-xs muted">Como você está como ${escapeHtml(u.anoFaculdade||"Formado(a)")}, a turma nasce seguindo o calendário de ${escapeHtml(anoParaCriar)}.</p>` : ""}
    <p class="text-xs muted">Criar uma turma faz você sair da atual: cada pessoa fica em uma só.</p>
    <div class="flex gap-1 items-end mt-1" style="flex-wrap:wrap">
      <div class="field" style="margin-bottom:0;min-width:240px"><label class="label">Nome da turma</label><input class="input" id="novoGrupoNome" placeholder="Ex.: ${escapeHtml(anoParaCriar)} 2026 — Grupo B"></div>
      <div class="field" style="margin-bottom:0;min-width:200px"><label class="label">Grupo do rodízio</label>
        <select class="select" id="novoGrupoRodizio">
          ${opcoesRodizioPorLetra(anoParaCriar).map(o=>`<option value="${o.deslocamento}">Grupo ${escapeHtml(o.rotulo)} — começa em ${escapeHtml(o.bloco.nome)}</option>`).join("")}
        </select>
      </div>
      <button class="btn btn-primary" onclick="criarMeuGrupo()">Criar turma</button>
    </div>
  </div>

  <div class="card">
    <div class="card-title">Entrar em uma turma já existente</div>
    ${outrosGrupos.length ? outrosGrupos.map(g=>{
      const souMembro = g.doRodizio || g.criadoPor===u.id || (g.membrosAprovados||[]).includes(u.id);
      const jaSolicitei = (g.solicitacoesPendentes||[]).includes(u.id);
      const anoG = anoDoGrupo(g, u);
      const atualG = blocoAtualDoGrupo(g, u);
      return `
      <div class="flex justify-between items-center mb-1 card-flat" style="gap:.5rem;flex-wrap:wrap">
        <div>
          <div style="font-weight:600">${escapeHtml(g.nome)} <span class="badge badge-accent">${escapeHtml(rotuloRodizio(anoG, g.deslocamento))}</span></div>
          <div class="text-xs muted">${escapeHtml(anoG)} · hoje em ${escapeHtml(atualG?atualG.nome:"—")} · ${g.doRodizio ? "turma do rodízio, aberta a todos" : "criada por "+escapeHtml(getUsuario(g.criadoPor)?getUsuario(g.criadoPor).nome:"—")}</div>
        </div>
        ${souMembro ? `<button class="btn btn-secondary btn-sm" onclick="usarGrupo('${g.id}')">Entrar nesta turma</button>` :
          jaSolicitei ? `<button class="btn btn-secondary btn-sm" disabled>Solicitação enviada</button>` :
          `<button class="btn btn-secondary btn-sm" onclick="solicitarAcessoGrupo('${g.id}')">Pedir para entrar</button>`}
      </div>`;
    }).join("") : '<p class="text-sm muted">Nenhuma turma criada ainda. Crie a sua acima.</p>'}
  </div>
  <div class="card-flat mt-2 text-xs muted">Com a nuvem ligada, o estudo de cada pessoa viaja entre aparelhos, mas as turmas ainda são deste navegador: um grupo criado aqui só aparece para quem abrir a plataforma neste mesmo computador. Ver <code>nuvem/LEIA-ME.md</code>.</div>
  `;
}
function criarMeuGrupo(){
  const nome = document.getElementById("novoGrupoNome").value.trim();
  if(!nome){ toast("Dê um nome para a turma.", "err"); return; }
  const u = usuarioAtual();
  // a turma herda a sequência de um ano que tenha calendário (quem está como
  // "Formado(a)" não tem, e aí vale o ano padrão) e o que ela escolhe é o
  // grupo do rodízio — o bloco por onde entra na sequência
  const ano = temCalendarioProprio(u.anoFaculdade) ? u.anoFaculdade : CONFIG.anoFaculdadePadrao;
  const campoRodizio = document.getElementById("novoGrupoRodizio");
  const deslocamento = campoRodizio ? (parseInt(campoRodizio.value)||0) : 0;
  const novo = { id:uid("grupo"), nome, criadoPor:u.id, oficial:false, publico:true, criadoEm:hojeISO(),
                 anoFaculdade: ano, deslocamento,
                 blocoAtualIdManual:null, membrosAprovados:[], solicitacoesPendentes:[] };
  db.grupos.push(novo);
  entrarNoGrupo(u, novo.id);
  saveState();
  toast('Turma criada — você está no ' + nomeRodizio(ano, deslocamento) + '.');
  render();
}
function usarGrupo(grupoId){
  const g = getGrupo(grupoId); if(!g) return;
  const u = usuarioAtual();
  if(!g.oficial && !g.doRodizio && g.criadoPor!==u.id && !(g.membrosAprovados||[]).includes(u.id)){
    toast("Você ainda não faz parte desta turma — peça para entrar.", "err"); return;
  }
  entrarNoGrupo(u, grupoId);
  saveState();
  toast('Agora você está em "'+g.nome+'" ('+nomeRodizio(anoDoGrupo(g,u), g.deslocamento)+').');
  render();
}
function entrarNaTurmaDoRodizio(deslocamento){
  const u = usuarioAtual();
  const ano = temCalendarioProprio(u.anoFaculdade) ? u.anoFaculdade : CONFIG.anoFaculdadePadrao;
  const turma = turmaDoRodizio(ano, deslocamento);
  if(!turma){ toast("Não encontrei esse grupo no calendário de "+ano+".", "err"); return; }
  entrarNoGrupo(u, turma.id);
  saveState();
  toast("Agora você está no " + nomeRodizio(ano, turma.deslocamento) + " de " + ano + ".");
  render();
}
/* Sair da turma é voltar ao calendário oficial — nunca ficar sem calendário
   nenhum, o que deixaria a tela Estudar sem bloco atual. */
function sairDoMeuGrupo(){
  const u = usuarioAtual();
  entrarNoGrupo(u, db.grupoOficialId);
  saveState();
  toast("Você voltou ao calendário oficial da coordenação.");
  render();
}
function solicitarAcessoGrupo(grupoId){
  const g = getGrupo(grupoId); if(!g) return;
  const u = usuarioAtual();
  if(!g.solicitacoesPendentes) g.solicitacoesPendentes = [];
  if(!g.solicitacoesPendentes.includes(u.id)) g.solicitacoesPendentes.push(u.id);
  saveState();
  toast("Pedido enviado! Assim que "+(getUsuario(g.criadoPor)?getUsuario(g.criadoPor).nome:"o dono da turma")+" aprovar, você entra nela.");
  render();
}
function aprovarAcessoGrupo(grupoId, usuarioId){
  const g = getGrupo(grupoId); if(!g) return;
  const solicitante = getUsuario(usuarioId);
  if(solicitante) entrarNoGrupo(solicitante, grupoId);
  else g.solicitacoesPendentes = (g.solicitacoesPendentes||[]).filter(id=>id!==usuarioId);
  saveState();
  toast("Acesso aprovado.");
  render();
}
function rejeitarAcessoGrupo(grupoId, usuarioId){
  const g = getGrupo(grupoId); if(!g) return;
  g.solicitacoesPendentes = (g.solicitacoesPendentes||[]).filter(id=>id!==usuarioId);
  saveState();
  toast("Solicitação recusada.");
  render();
}
function renderQuestoesDoGrupo(grupo){
  const questoes = db.questoes.filter(q=>q.grupoId===grupo.id);
  const pagGrupo = paginar(questoes, "questoes-grupo", {porPagina:20});
  return `<div class="card mb-2">
    <div class="flex justify-between items-center mb-1" style="flex-wrap:wrap;gap:.5rem">
      <div class="card-title" style="margin-bottom:0">Questões deste grupo (${questoes.length})</div>
      <div class="flex gap-1" style="flex-wrap:wrap">
        <button class="btn btn-secondary btn-sm" onclick="navigate('importar-questoes')">${iconeSvg("upload")} Colar prova inteira / importar em lote</button>
        <button class="btn btn-primary btn-sm" onclick="abrirFormularioQuestao(null)">${iconeSvg("plus")} Adicionar questão</button>
      </div>
    </div>
    <p class="text-sm muted">Qualquer pessoa do grupo pode contribuir. Essas questões ficam disponíveis só pra quem está neste grupo — em "Estudar &gt; Monte sua lista", marque "incluir questões do meu grupo" pra praticá-las.</p>
    <div class="card-flat mt-2 text-sm">
      <strong>Prova inteira de uma vez:</strong> em "Enviar Questões" você informa a instituição e o ano uma única vez, copia o prompt pronto, cola numa IA junto com o PDF da prova e traz o resultado de volta. Escolha o destino <em>"Questões do meu grupo"</em> para elas caírem direto aqui.
      <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
        <button class="btn btn-secondary btn-sm" onclick="navigate('importar-questoes')">${iconeSvg("search")} Abrir tela com o prompt pronto</button>
        <button class="btn btn-ghost btn-sm" onclick="copiarTexto(gerarPromptImportacao(),'Prompt copiado! Cole numa IA junto com a prova.')">Copiar prompt agora</button>
      </div>
    </div>
    ${questoes.length ? `<div class="table-wrap mt-2"><table><thead><tr><th>Questão</th><th>Assunto</th><th></th></tr></thead><tbody>
      ${pagGrupo.itens.map(q=>`<tr><td class="text-sm"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${q.id}')">${escapeHtml(q.enunciado.slice(0,90))}…</span></td><td class="text-sm">${escapeHtml(nomeAssunto(q.assuntoId))}</td><td class="flex gap-1"><button class="icon-btn" title="Ver na íntegra" onclick="abrirQuestaoCompleta('${q.id}')">${iconeSvg("search")}</button><button class="icon-btn" title="Editar" onclick="abrirFormularioQuestao('${q.id}')">${iconeSvg("edit")}</button></td></tr>`).join("")}
    </tbody></table></div>
    ${controlesPaginacao(pagGrupo, "questão(ões) do grupo")}` : '<p class="text-sm muted mt-1">Nenhuma questão adicionada ainda.</p>'}
  </div>`;
}

/* ==========================================================================
   19. PERFIL
   ==========================================================================
   O backup saiu daqui para todo mundo: exportar o arquivo significa levar
   junto as respostas, os cadastros e os dados de TODOS os usuários deste
   navegador, não só os de quem clicou. Por isso a caixa de backup agora só
   aparece para o administrador máster — em Perfil e em Configurações. */
function renderPerfil(){
  const u = usuarioAtual();
  const ehMaster = podeAdmin("backup", u);
  return `
  <div class="page-header"><h2>Perfil</h2></div>
  <div class="card" style="max-width:460px">
    <div class="field"><label class="label">Nome</label><div>${escapeHtml(u.nome)}</div></div>
    <div class="field"><label class="label">E-mail</label><div>${escapeHtml(u.email)}</div></div>
    <div class="field"><label class="label">Matrícula</label><div>${escapeHtml(u.matricula)}</div></div>
    ${u.papel==="aluno" ? (() => { const g = getGrupoDoUsuario(u); return `<div class="field"><label class="label">Turma / Grupo</label><div>${escapeHtml(g.nome)}${g.oficial ? ' <span class="badge badge-muted">calendário oficial</span>' : ' <span class="badge badge-accent">'+escapeHtml(nomeRodizio(anoDoGrupo(g, u), g.deslocamento))+'</span>'} <button class="link-btn" onclick="navigate('meu-grupo')">gerenciar</button></div>${g.oficial?'<div class="hint mt-1">Você ainda não escolheu a sua turma do rodízio — em Meu Grupo.</div>':""}</div>`; })() : ""}
    ${u.papel==="aluno" ? `<div class="field"><label class="label">Ano da faculdade</label>
      <select class="select" id="perfilAno" onchange="salvarAnoFaculdade()">
        ${CONFIG.anosFaculdade.map(a=>`<option value="${escapeHtml(a)}" ${u.anoFaculdade===a?"selected":""}>${escapeHtml(a)}</option>`).join("")}
      </select>
      <div class="hint mt-1">Atualize quando virar o ano letivo. Quem está no internato marca o ano em que está — 5º ou 6º. Quem já se formou marca "Formado(a)": não há calendário de formado, e a turma de que você participar é que dá o calendário.</div>
    </div>` : ""}
    <div class="field"><label class="label">Papel</label><div>${badgePapel(u.papel, u)}</div></div>
    ${u.papel==="admin" ? `<div class="field"><label class="label">Nível de administrador</label><div>${escapeHtml(rotuloNivelAdmin(nivelAdminDe(u)))}<div class="hint mt-1">${escapeHtml((CONFIG.niveisAdmin.find(n=>n.id===nivelAdminDe(u))||{}).descricao||"")}</div></div></div>` : ""}
    ${u.papel==="aluno" ? `<div class="field"><label class="label">Bloco atual</label><div>${escapeHtml((getBlocoAtual()||{}).nome||"—")}</div></div>` : ""}
  </div>
  ${u.papel==="aluno" ? `<div class="card mt-2" style="max-width:460px">
    <div class="card-title">Lembrete de meta diária</div>
    <p class="text-sm muted">Um aviso do navegador às ${escapeHtml(u.lembreteMetaHorario||"20:00")}, se a meta de questões ou de cartões do dia ainda não tiver sido batida. Funciona com o Esc aberto em alguma aba, em qualquer navegador. Com o Esc <strong>instalado como aplicativo</strong> no Chrome ou no Edge (Android e computador), avisa também com o app fechado, num horário aproximado — o navegador é quem escolhe quando acordar o app.</p>
    ${u.lembreteMetaAtivo ? `
      <div class="field mt-1" style="max-width:160px"><label class="label">Horário do lembrete</label><input class="input" type="time" value="${escapeHtml(u.lembreteMetaHorario||"20:00")}" onchange="salvarHorarioLembreteMeta(this.value)"></div>
      <button class="btn btn-secondary btn-sm mt-1" onclick="desativarLembreteMetaDiaria()">Desativar lembrete</button>
    ` : `<button class="btn btn-primary btn-sm mt-1" onclick="ativarLembreteMetaDiaria()">${iconeSvg("alert")} Ativar lembrete diário</button>`}
  </div>
  <div class="card mt-2" style="max-width:460px">
    <div class="card-title">Contribuir com questões</div>
    <p class="text-sm muted">Adicione questões uma a uma ou cole uma prova inteira (instituição e ano são informados uma vez só). Você escolhe se elas ficam apenas no seu grupo ou se vão como sugestão para o banco geral.</p>
    <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
      <button class="btn btn-primary btn-sm" onclick="navigate('importar-questoes')">${iconeSvg("upload")} Enviar prova ou questões</button>
      <button class="btn btn-secondary btn-sm" onclick="abrirFormularioQuestao(null)">${iconeSvg("plus")} Adicionar uma questão</button>
    </div>
  </div>` : ""}
  ${renderCardInstalarApp()}
  ${renderCardSenha()}
  ${renderCardNuvem()}
  ${ehMaster ? renderCardBackup() : `<div class="card mt-2" style="max-width:460px">
    <div class="card-title">Seus dados</div>
    <p class="text-sm muted">${nuvemConectado()
      ? "Seu estudo fica salvo neste navegador e também na sua conta, na nuvem — por isso você pode continuar de outro aparelho. A cópia de segurança de toda a plataforma continua sendo responsabilidade do administrador máster."
      : "Tudo o que você faz aqui fica salvo neste navegador. A cópia de segurança de toda a plataforma é responsabilidade do administrador máster — se precisar trocar de computador ou recuperar algo, fale com a coordenação antes de limpar os dados do navegador."}</p>
    <button class="btn btn-secondary btn-sm mt-1" onclick="baixarMeusDados()">${iconeSvg("download")} Baixar uma cópia do meu estudo</button>
    <p class="text-xs muted mt-1">Um arquivo com tudo o que é seu: respostas, revisões, favoritos e anotações, cartões pessoais, conjuntos e simulados. Nada de outras pessoas.</p>
  </div>`}`;
}
/* "Baixar uma cópia do meu estudo": tudo o que é DA PESSOA, e só dela — o
   backup completo da plataforma é outra coisa (administrador máster, e o
   automático da nuvem, ver .github/workflows/backup-nuvem.yml). É o direito
   de cada um de ter o próprio estudo num arquivo, e o jeito de levá-lo
   quando a nuvem está desligada. */
function dadosDoUsuario(id){
  const u = getUsuario(id) || {};
  const perfil = Object.assign({}, u); delete perfil.senha;
  const doUsuario = (colecao) => (colecao || []).filter(x => x.usuarioId === id);
  const porUsuario = (mapa) => (mapa && mapa[id]) || {};
  return {
    formato: "esc-meus-dados-1", geradoEm: new Date().toISOString(), plataforma: CONFIG.nomePlataforma,
    perfil,
    respostas: doUsuario(db.respostas),
    revisoesQuestoes: porUsuario(db.revisoes),
    revisoesCartoes: porUsuario(db.revisoesFlashcards),
    cartoesPorDia: porUsuario(db.cartoesPorDia),
    diasComCartao: (db.diasCartoes && db.diasCartoes[id]) || [],
    favoritos: doUsuario(db.favoritos),
    cartoesFavoritos: doUsuario(db.favoritosCartoes),
    questoesEscondidas: doUsuario(db.questoesOcultas),
    cartoesPessoais: (db.flashcards || []).filter(c => c.usuarioId === id),
    sessoes: doUsuario(db.sessoes),
    simulados: doUsuario(db.resultadosSimulados),
    comentarios: comentariosAtivos().filter(c => c.usuarioId === id),
  };
}
function baixarMeusDados(){
  const u = usuarioAtual(); if(!u) return;
  const blob = new Blob([JSON.stringify(dadosDoUsuario(u.id), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "meu-estudo-" + (u.nome || "esc").split(" ")[0].toLowerCase().normalize("NFD").replace(/[^a-z0-9]/g, "") + "-" + hojeISO() + ".json";
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  toast("Cópia do seu estudo baixada.");
}
function salvarAnoFaculdade(){
  const u = usuarioAtual();
  u.anoFaculdade = document.getElementById("perfilAno").value;
  saveState();
  toast("Ano da faculdade atualizado.");
}
/* Caixa de backup — usada no Perfil e em Configurações, sempre só para o
   administrador máster. Exportar/importar JSON é a única rede de segurança
   enquanto os dados vivem no navegador. */
function renderCardBackup(){
  const kb = tamanhoBancoKb();
  const backupAntigo = !(db.ultimoBackupEm && diasEntre(db.ultimoBackupEm, hojeISO()) < 7);
  return `<div class="card mt-2" style="max-width:560px${backupAntigo?";border-color:var(--amber)":""}">
    <div class="card-title">${iconeSvg("archive")} Backup dos dados da plataforma</div>
    <p class="text-sm muted">Todos os dados vivem no localStorage deste navegador. Limpar o histórico do navegador apaga tudo. Recomendação: exportar pelo menos uma vez por semana e guardar o arquivo fora deste computador.</p>
    ${nuvemLigada() ? `<div class="card-flat mt-1 text-sm">${iconeSvg("archive")} <strong>Com a nuvem ligada</strong>, este backup tem só o que está NESTE navegador — não o estudo da turma. A cópia da turma inteira é o <strong>backup automático da nuvem</strong>: uma vez por dia, criptografado, pelo GitHub (passo a passo em <code>nuvem/LEIA-ME.md</code>, "Backup automático").</div>` : ""}
    <p class="text-sm ${kb>3500?"":"muted"}" ${kb>3500?'style="color:var(--amber);font-weight:600"':""}>Espaço ocupado: ${kb} KB${kb>3500?" — perto do limite do navegador. Imagens embutidas são o que mais pesa; prefira recortá-las antes de enviar ou usar links.":""}</p>
    <p class="text-sm ${backupAntigo?"":"muted"}" ${backupAntigo?'style="color:var(--amber);font-weight:600"':""}>Último backup: ${db.ultimoBackupEm ? formatDataBR(db.ultimoBackupEm) : "nunca feito"}</p>
    <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
      <button class="btn btn-secondary btn-sm" onclick="exportarBackup()">${iconeSvg("archive")} Exportar backup</button>
      <button class="btn btn-secondary btn-sm" onclick="baixarMeusDados()">${iconeSvg("download")} Só o meu estudo</button>
      <label class="btn btn-secondary btn-sm" style="cursor:pointer">${iconeSvg("upload")} Importar backup<input type="file" accept=".json" style="display:none" onchange="importarBackupArquivo(this)"></label>
      <button class="btn btn-danger btn-sm" onclick="confirmarReiniciarDemo()">${iconeSvg("trash")} Reiniciar dados</button>
    </div>
    <p class="text-xs muted mt-2">Importar substitui os dados atuais pelos do arquivo — inclusive respostas e cadastros de todos os usuários. Reiniciar apaga tudo e volta ao ponto de partida.</p>
    ${bancoDeResgateDisponivel() ? (() => { const r = resumoDoResgate(); return `<div class="card-flat mt-2" style="border-color:var(--amber)">
      <div class="text-sm" style="font-weight:600;color:var(--amber)">${iconeSvg("archive")} Existe uma cópia de resgate neste navegador</div>
      <p class="text-sm muted mt-1">A plataforma encontrou um defeito nos dados salvos em algum momento e guardou o banco como ele estava antes de consertá-lo${r?`: <strong>${r.usuarios} cadastro(s)</strong>, ${r.respostas} resposta(s), ${r.questoes} questão(ões)`:""}. Se algo tiver se perdido, é daqui que se recupera.</p>
      <button class="btn btn-secondary btn-sm mt-1" onclick="restaurarBancoDeResgate()">Ver e restaurar a cópia de resgate</button>
    </div>`; })() : ""}
  </div>`;
}
