/* codigo/09a-revisao-rapida.js — Revisão Rápida: os flashcards (seção 12-B).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   12-B. REVISÃO RÁPIDA (FLASHCARDS)
   ==========================================================================
   Um cartão por vez: frente com a pergunta, verso com a resposta, e o aluno
   se autoavalia em três níveis. Não há alternativa para eliminar — é
   justamente esse o ponto. Serve para os assuntos em que a pessoa tem
   FALSA SEGURANÇA: marca "certeza" na questão e erra.

   O baralho se monta sozinho (ver montarBaralhoFlashcards, no motor de
   estudos), misturando cartões de conceito escritos pela equipe com cartões
   gerados a partir das questões que o aluno errou com certeza ou acertou no
   chute. Cada cartão tem seu próprio intervalo de revisão, independente do
   intervalo das questões. */
function renderFlashcards(){
  const u = usuarioAtual();
  const sessao = state.sessaoFlash;
  if(sessao && !sessao.finalizada) return renderFlashcardEmSessao(sessao);
  if(sessao && sessao.finalizada) return renderFlashcardsResumo(sessao);
  return renderFlashcardsInicio(u);
}
function renderFlashcardsInicio(u){
  const resumo = resumoFlashcards(u.id);
  const falsaSeguranca = assuntosComFalsaSeguranca(u.id);
  const filtro = state.filtroRota.flashcards || {};
  const podeEditar = podeGerirConteudo(u) && !state.modoAluno;
  const revs = db.revisoesFlashcards[u.id] || {};
  const vistosHoje = Object.values(revs).filter(r=>r.ultimaData===hojeISO()).length;
  const meus = meusFlashcards(u.id).slice().sort((a,b)=>(b.criadoEm||"").localeCompare(a.criadoEm||""));
  const daEquipe = flashcardsDaEquipe();
  const metaCartoes = metaCartoesDoUsuario(u);
  const seqCartoes = sequenciaDiasCartoes(u.id);
  const faltamCartoes = Math.max(0, metaCartoes - vistosHoje);
  const pagMeus = paginar(meus, "flash-meus", {porPagina:20});
  const pagEquipe = paginar(daEquipe, "flash-equipe", {porPagina:20});
  return `
  <div class="page-header"><h2>Revisão Rápida</h2><p>Cartões de conceito: você tenta lembrar, vira o cartão e diz honestamente se sabia. Serve para fixar o que a questão longa não fixa — e para atacar o assunto em que você jura que sabe e erra.</p></div>

  <div class="card mb-2" ${vistosHoje>=metaCartoes?'style="border-color:var(--accent)"':""}>
    <div class="flex justify-between items-center gap-2 quebra">
      <div class="cresce-220">
        <div class="card-title mb-02">Meta de cartões de hoje</div>
        <div class="text-sm muted">${vistosHoje>=metaCartoes
          ? "Meta de cartões batida. Se o dia não der para questão, o estudo de hoje já aconteceu."
          : `Faltam <strong>${faltamCartoes}</strong> cartão(ões) para fechar o dia.`}</div>
      </div>
      <div class="flex items-center gap-2 quebra">
        <div class="texto-dir">
          <div class="stat-value" style="font-size:1.5rem">${vistosHoje}/${metaCartoes}</div>
          <div class="stat-label">cartões hoje${seqCartoes?" · "+seqCartoes+" dia(s) seguidos":""}</div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="abrirModalMetaCartoes()">${iconeSvg("target")} Ajustar meta</button>
      </div>
    </div>
    <div class="progress-track mt-2"><div class="progress-fill" style="width:${Math.min(100,pct(vistosHoje,metaCartoes))}%"></div></div>
    <p class="text-xs muted mt-1">Esta meta é separada da de questões, de propósito: cartão e questão treinam coisas diferentes, e num dia corrido dá para manter o ritmo só com cartões.</p>
  </div>

  <div class="grid grid-4">
    <div class="stat-tile"><div class="stat-value">${resumo.vencidos}</div><div class="stat-label">cartão(ões) vencido(s) hoje</div></div>
    <div class="stat-tile"><div class="stat-value">${resumo.novos}</div><div class="stat-label">ainda não vistos</div></div>
    <div class="stat-tile"><div class="stat-value">${resumo.deFalsaSeguranca}</div><div class="stat-label">em assuntos de falsa segurança</div></div>
    <div class="stat-tile"><div class="stat-value">${resumo.meus}</div><div class="stat-label">cartões escritos por você</div></div>
  </div>

  <div class="card mt-2">
    <div class="flex justify-between items-center gap-2 quebra">
      <div>
        <div class="card-title">Baralho recomendado</div>
        <div class="text-sm muted">A plataforma escolhe a ordem: primeiro o que venceu, depois os assuntos em que sua confiança engana, depois os erros caros e só então o que você ainda não viu.</div>
      </div>
      <button class="btn btn-primary" onclick="iniciarSessaoFlashcards({})">${iconeSvg("cards")} Começar</button>
    </div>
  </div>

  ${falsaSeguranca.length ? `<div class="card mt-2 borda-alerta">
    <div class="card-title">${iconeSvg("alert")} Só os assuntos em que você erra dizendo ter certeza</div>
    <p class="text-sm muted">${falsaSeguranca.slice(0,5).map(f=>escapeHtml(nomeAssunto(f.assuntoId))+" ("+f.taxa+"%)").join(" · ")}</p>
    <button class="btn btn-secondary mt-2" onclick="iniciarSessaoFlashcards({somenteFalsaSeguranca:true})">Revisar só esses</button>
  </div>` : ""}

  <div class="card mt-2">
    <div class="flex justify-between items-center gap-2 quebra">
      <div class="cresce-220">
        <div class="card-title mb-02">Monte o seu baralho</div>
        <div class="text-sm muted">Um baralho do tamanho e do assunto que você escolher — por área, especialidade ou assunto, só os vencidos, só os que você ainda não viu ou só os que você escreveu.</div>
      </div>
      <button class="btn ${filtro.montagemAberta?"btn-secondary":"btn-primary"}" onclick="alternarMontagemBaralho()" aria-expanded="${!!filtro.montagemAberta}">${filtro.montagemAberta ? "Fechar a montagem" : iconeSvg("plus")+" Criar meu baralho"}</button>
    </div>
    ${filtro.montagemAberta ? `<div class="mt-2">
    <div class="grid grid-3">
      <div class="field"><label class="label">Grande área</label>
        <select class="select" id="flashArea" onchange="atualizarFiltroFlash()">
          <option value="">Todas</option>
          ${db.taxonomia.areas.map(a=>`<option value="${a.id}" ${filtro.areaId===a.id?"selected":""}>${escapeHtml(a.nome)}</option>`).join("")}
        </select></div>
      <div class="field"><label class="label">Especialidade</label>
        <select class="select" id="flashEsp" onchange="atualizarFiltroFlash()">
          <option value="">Todas</option>
          ${db.taxonomia.especialidades.filter(e=>!filtro.areaId || e.areaId===filtro.areaId).map(e=>`<option value="${e.id}" ${filtro.especialidadeId===e.id?"selected":""}>${escapeHtml(e.nome)}</option>`).join("")}
        </select></div>
      <div class="field"><label class="label">Assunto</label>
        <select class="select" id="flashAssunto" onchange="atualizarFiltroFlash()">
          <option value="">Todos</option>
          ${db.taxonomia.assuntos.filter(a=>!filtro.especialidadeId || a.especialidadeId===filtro.especialidadeId).map(a=>`<option value="${a.id}" ${filtro.assuntoId===a.id?"selected":""}>${escapeHtml(a.nome)}</option>`).join("")}
        </select></div>
    </div>
    <div class="grid grid-3">
      <div class="field"><label class="label">Quais cartões</label>
        <select class="select" id="flashSituacao" onchange="atualizarOpcoesBaralho()">
          ${[["","Todos (a plataforma ordena)"],["vencidos","Só os vencidos"],["novos","Só os que ainda não vi"],["meus","Só os que eu escrevi"]].map(([v,r])=>`<option value="${v}" ${(filtro.situacao||"")===v?"selected":""}>${r}</option>`).join("")}
        </select></div>
      <div class="field"><label class="label">Nº de cartões</label>
        <input class="input" id="flashTamanho" type="number" min="1" max="100" value="${filtro.tamanho||20}" onchange="atualizarOpcoesBaralho()"></div>
    </div>
    <div class="text-sm muted mb-2" id="contagemBaralho">${textoContagemBaralho(u.id, filtro)}</div>
    <button class="btn btn-primary" onclick="iniciarSessaoFlashcards(state.filtroRota.flashcards||{})">${iconeSvg("cards")} Começar com este baralho</button>
    </div>` : ""}
  </div>

  ${meus.length ? `<div class="card mt-2">
    <div class="flex justify-between items-center gap-2 quebra">
      <div class="cresce-220">
        <div class="card-title">Meus cartões (${meus.length})</div>
        <div class="text-sm muted">Os que você escreveu enquanto resolvia questões. São seus: ninguém mais vê, e entram no baralho junto com os da equipe.</div>
      </div>
      <button class="btn btn-primary btn-sm" onclick="abrirAdicionarBaralho()">${iconeSvg("plus")} Adicionar baralho</button>
    </div>
    <div class="table-wrap mt-2"><table><thead><tr><th>Frente</th><th>Assunto</th><th>Criado em</th><th></th></tr></thead><tbody>
      ${pagMeus.itens.map(c=>`<tr>
        <td class="text-sm"><span class="enunciado-clicavel" onclick="abrirFormularioFlashcard('${c.id}')">${escapeHtml(c.frente.slice(0,110))}${c.frente.length>110?"…":""}</span>${badgeSugestaoFlashcard(c)}${c.grupoId ? ' <span class="badge badge-muted" title="Os colegas do seu grupo recebem este cartão no baralho deles">no grupo</span>' : ""}</td>
        <td class="text-sm">${escapeHtml(nomeAssunto(c.assuntoId))}</td>
        <td class="text-xs muted">${c.criadoEm?formatDataBR(c.criadoEm):"—"}</td>
        <td class="flex gap-1">
          ${c.questaoOrigemId?`<button class="icon-btn" title="Ver a questão que originou o cartão" onclick="abrirQuestaoCompleta('${c.questaoOrigemId}')">${iconeSvg("search")}</button>`:""}
          <button class="icon-btn" title="Editar" onclick="abrirFormularioFlashcard('${c.id}')">${iconeSvg("edit")}</button>
          ${(c.grupoId || !grupoAtualDoCartao(u).oficial) ? `<button class="icon-btn" title="${c.grupoId ? "Tirar do grupo (volta a ser só seu)" : "Compartilhar com o meu grupo"}" onclick="compartilharCartaoComGrupo('${c.id}')">${iconeSvg("users")}</button>` : ""}
          ${!c.sugeridoParaEquipe || c.decisaoEm ? `<button class="icon-btn" title="Sugerir para o baralho da equipe" onclick="sugerirFlashcardParaEquipe('${c.id}')">${iconeSvg("upload")}</button>` : ""}
          <button class="icon-btn" title="Arquivar" onclick="arquivarFlashcard('${c.id}')">${iconeSvg("trash")}</button>
        </td></tr>`).join("")}
    </tbody></table></div>
    ${controlesPaginacao(pagMeus, "cartão(ões) seu(s)")}
  </div>` : `<div class="card-flat mt-2 text-sm">
    <div class="flex justify-between items-center gap-2 quebra">
      <div class="cresce-220"><strong>Escreva seus próprios cartões.</strong> Ao responder uma questão, o botão “${"Virar flashcard"}” monta um cartão já no assunto daquela questão — é o melhor momento para isso, porque o conceito que faltou ainda está fresco. Esses cartões são só seus.</div>
      <button class="btn btn-primary btn-sm" onclick="abrirAdicionarBaralho()">${iconeSvg("plus")} Adicionar baralho</button>
    </div>
  </div>`}

  ${renderCartoesDoGrupo(u)}

  ${podeEditar ? `<div class="card mt-2">
    <div class="flex justify-between items-center gap-2 quebra">
      <div class="cresce-220"><div class="card-title">Cartões da equipe (${daEquipe.length})</div>
      <div class="text-sm muted">Material oficial, visível para todos os alunos. Os cartões pessoais que cada aluno escreve não aparecem aqui.</div></div>
      <div class="flex gap-1 quebra">
        <button class="btn btn-secondary btn-sm" onclick="navigate('material-pdf')">${iconeSvg("printer")} Imprimir baralho</button>
        <button class="btn btn-primary btn-sm" onclick="abrirFormularioFlashcard(null)">${iconeSvg("plus")} Novo cartão</button>
      </div>
    </div>
    <div class="table-wrap mt-2"><table><thead><tr><th>Frente</th><th>Assunto</th><th></th></tr></thead><tbody>
      ${pagEquipe.itens.map(c=>`<tr>
        <td class="text-sm"><span class="enunciado-clicavel" onclick="abrirFormularioFlashcard('${c.id}')">${escapeHtml(c.frente.slice(0,110))}${c.frente.length>110?"…":""}</span></td>
        <td class="text-sm">${escapeHtml(nomeAssunto(c.assuntoId))}</td>
        <td class="flex gap-1">
          <button class="icon-btn" title="Editar" onclick="abrirFormularioFlashcard('${c.id}')">${iconeSvg("edit")}</button>
          <button class="icon-btn" title="Arquivar" onclick="arquivarFlashcard('${c.id}')">${iconeSvg("trash")}</button>
        </td></tr>`).join("")}
    </tbody></table></div>
    ${controlesPaginacao(pagEquipe, "cartão(ões) da equipe")}
  </div>
  ${renderCartoesEmLote()}` : ""}

  <div class="card-flat mt-2 text-sm">
    <strong>Como funciona:</strong> cada cartão tem seu próprio intervalo. "Sabia" empurra o cartão para longe; nenhum cartão volta antes de 1 semana; "quase" fica sempre no prazo mínimo de 7 dias, porque lembrar com esforço é exatamente o sinal de que o conceito ainda não está firme; "não lembrei" devolve o cartão em 7 dias. Esse histórico é separado do das questões: dá para saber o conceito e ainda assim errar a questão, e a plataforma trata os dois como coisas diferentes.
  </div>`;
}
function atualizarFiltroFlash(){
  const f = state.filtroRota.flashcards = state.filtroRota.flashcards || {};
  const area = document.getElementById("flashArea").value;
  const esp = document.getElementById("flashEsp").value;
  const ass = document.getElementById("flashAssunto").value;
  // trocar de área/especialidade zera os níveis abaixo, pra não ficar filtro incoerente
  if(area !== (f.areaId||"")){ f.areaId = area||null; f.especialidadeId = null; f.assuntoId = null; }
  else if(esp !== (f.especialidadeId||"")){ f.especialidadeId = esp||null; f.assuntoId = null; }
  else f.assuntoId = ass||null;
  render();
}
/* O botão "Criar meu baralho" abre as opções de montagem; a escolha (área,
   situação, tamanho) fica em state.filtroRota.flashcards e sobrevive aos
   redesenhos da tela. */
function alternarMontagemBaralho(){
  const f = state.filtroRota.flashcards = state.filtroRota.flashcards || {};
  f.montagemAberta = !f.montagemAberta;
  render();
}
function atualizarOpcoesBaralho(){
  const f = state.filtroRota.flashcards = state.filtroRota.flashcards || {};
  f.situacao = document.getElementById("flashSituacao").value || null;
  f.tamanho = Math.max(1, Math.min(100, parseInt(document.getElementById("flashTamanho").value) || 20));
  const c = document.getElementById("contagemBaralho");
  if(c) c.textContent = textoContagemBaralho(usuarioAtual().id, f);
}
// quantos cartões o recorte tem de verdade, antes de começar: evita a sessão vazia
function textoContagemBaralho(usuarioId, filtro){
  const n = montarBaralhoFlashcards(usuarioId, 1000, filtro || {}).length;
  const tam = Math.min(n, (filtro && filtro.tamanho) || 20);
  return n ? n + " cartão(ões) neste recorte — o baralho terá " + tam + "." : "Nenhum cartão neste recorte. Tente um filtro mais amplo.";
}
function iniciarSessaoFlashcards(filtro){
  const u = usuarioAtual();
  const cartoes = montarBaralhoFlashcards(u.id, (filtro && filtro.tamanho) || 20, filtro||{});
  if(!cartoes.length){ toast("Não há cartões para este recorte ainda. Tente um filtro mais amplo, ou peça à equipe para cadastrar cartões desse assunto.", "err"); return; }
  state.sessaoFlash = { cartoes, indice:0, virado:false, notas:[], finalizada:false };
  navigate("flashcards");
}
function virarFlashcard(){
  if(haTextoSelecionado()) return;   // quem arrastou para destacar não quis virar o cartão
  const s = state.sessaoFlash; if(!s) return;
  s.virado = !s.virado; render();
}
function responderFlashcard(nota){
  const s = state.sessaoFlash; if(!s) return;
  const cartao = s.cartoes[s.indice];
  registrarRevisaoFlashcard(usuarioAtual().id, cartao.id, nota);
  s.notas.push({cartaoId:cartao.id, nota});
  if(s.indice < s.cartoes.length-1){ s.indice++; s.virado = false; }
  else s.finalizada = true;
  render(); window.scrollTo(0,0);
}
function pularFlashcard(delta){
  const s = state.sessaoFlash; if(!s) return;
  s.indice = Math.max(0, Math.min(s.cartoes.length-1, s.indice+delta));
  s.virado = false; render();
}
function sairDaSessaoFlash(){ state.sessaoFlash = null; navigate("flashcards"); }
function renderFlashcardEmSessao(s){
  const cartao = s.cartoes[s.indice];
  const assunto = nomeAssunto(cartao.assuntoId);
  const rev = revisaoDoCartao(usuarioAtual().id, cartao.id);
  const favoritoAqui = isFavoritoCartao(usuarioAtual().id, cartao.id);
  return `
  <div class="flex justify-between items-center mb-2">
    <div class="text-sm muted">Cartão ${s.indice+1} de ${s.cartoes.length}</div>
    <button class="btn btn-ghost btn-sm" onclick="sairDaSessaoFlash()">Sair</button>
  </div>
  <div class="progress-track mb-3"><div class="progress-fill" style="width:${pct(s.notas.length, s.cartoes.length)}%"></div></div>
  <div class="why-tag">${iconeSvg("target")}<span>${escapeHtml(assunto)}${cartao.origem==="questao"?" · gerado de uma questão que você errou com certeza ou acertou no chute":""}${rev&&rev.vistas?" · visto "+rev.vistas+"x":""}</span></div>
  <div class="flash-palco">
    <div class="flashcard ${s.virado?"virado":""} area-gesto" id="areaGestoQuestao" onclick="virarFlashcard()">
      <button class="icon-btn flash-favorito" title="${favoritoAqui?"Tirar dos favoritos":"Salvar este cartão nos favoritos"}" aria-label="${favoritoAqui?"Tirar este cartão dos favoritos":"Salvar este cartão nos favoritos"}" onclick="event.stopPropagation();toggleFavoritoCartaoUI('${cartao.id}')" style="${favoritoAqui?"border-color:var(--amber);color:var(--amber)":""}">${iconeSvg("star")}</button>
      <div class="flash-etiqueta">${s.virado?"Resposta":"Pergunta"}</div>
      ${cartao.imagemUrl ? `<div class="qcard-img-wrap"><img class="qcard-img" src="${escapeHtml(cartao.imagemUrl)}" alt="${escapeHtml(cartao.imagemLegenda||"Imagem do cartão")}" loading="lazy">${cartao.imagemLegenda?`<div class="qcard-img-legenda">${escapeHtml(cartao.imagemLegenda)}</div>`:""}</div>` : ""}
      ${s.virado
        ? `<div class="flash-verso" ${atributoDestacavel(alvoDeCartao(cartao.id,"verso"))}>${htmlComDestaques(cartao.verso, alvoDeCartao(cartao.id,"verso"))}</div>${cartao.fonte ? `<div class="text-xs muted mt-1">Fonte: ${escapeHtml(cartao.fonte)}${cartao.revisao==="pendente" && podeGerirConteudo() ? ' · <span class="badge badge-amber">revisão pendente</span>' : ""}</div>` : ""}`
        : `<div class="flash-frente" ${atributoDestacavel(alvoDeCartao(cartao.id,"frente"))}>${htmlComDestaques(cartao.frente, alvoDeCartao(cartao.id,"frente"))}</div>`}
      <div class="flash-toque">${iconeSvg("refresh")} ${s.virado?"Clique no cartão para ver a pergunta de novo":"Clique no cartão para ver a resposta"}</div>
    </div>
  </div>
  ${s.virado ? `<div class="flash-notas">
    <button class="flash-nota ruim" onclick="responderFlashcard('naolembrei')">Não lembrei<small>volta em 1 semana</small></button>
    <button class="flash-nota medio" onclick="responderFlashcard('quase')">Quase<small>volta em 1 semana</small></button>
    <button class="flash-nota bom" onclick="responderFlashcard('sabia')">Sabia<small>vai para longe</small></button>
  </div>
  <p class="text-xs muted mt-1" style="text-align:center;max-width:640px;margin-left:auto;margin-right:auto">Responda com honestidade: o intervalo do cartão depende disso, e enganar o algoritmo aqui só faz você revisar na véspera da prova o que devia ter fixado agora.</p>`
  : `<p class="text-xs muted mt-2" style="text-align:center">Tente lembrar antes de virar — é a tentativa, e não a leitura, que fixa.</p>`}
  ${cartao.origem==="questao" ? `<div class="flex justify-center mt-2"><button class="btn btn-ghost btn-sm" onclick="abrirQuestaoCompleta('${cartao.questaoId}')">${iconeSvg("search")} Ver a questão inteira</button></div>` : ""}
  <div class="dica-arrastar">${iconeSvg("swipe")}<span>arraste para o lado para passar de cartão</span></div>`;
}
function renderFlashcardsResumo(s){
  const cont = {naolembrei:0, quase:0, sabia:0};
  s.notas.forEach(n=>cont[n.nota]++);
  const total = s.notas.length;
  const aRever = s.notas.filter(n=>n.nota!=="sabia");
  return `
  <div class="page-header"><h2>Fim da revisão rápida</h2><p>${total} cartão(ões) revisado(s). Cada um já tem nova data de retorno.</p></div>
  <div class="grid grid-3">
    <div class="stat-tile"><div class="stat-value">${cont.sabia}</div><div class="stat-label">sabia</div></div>
    <div class="stat-tile"><div class="stat-value">${cont.quase}</div><div class="stat-label">quase — voltam em poucos dias</div></div>
    <div class="stat-tile"><div class="stat-value">${cont.naolembrei}</div><div class="stat-label">não lembrei — voltam em 1 semana</div></div>
  </div>
  ${aRever.length ? `<div class="card mt-2">
    <div class="card-title">O que ficou pendente</div>
    ${aRever.map(n=>{ const c = getFlashcard(n.cartaoId); if(!c) return ""; return `<div class="card-flat mb-1">
      <div class="text-sm peso-600">${escapeHtml(c.frente.slice(0,160))}${c.frente.length>160?"…":""}</div>
      <div class="text-xs muted mt-1">${escapeHtml(nomeAssunto(c.assuntoId))} · ${n.nota==="quase"?"lembrou com esforço":"não lembrou"}</div>
    </div>`; }).join("")}
  </div>` : `<div class="card mt-2"><p class="text-sm">Você acertou todos de primeira. Se isso se repetir, vale aumentar o recorte do baralho ou voltar para as questões — cartão fácil demais deixa de ensinar.</p></div>`}
  <div class="flex gap-1 mt-2 quebra">
    <button class="btn btn-primary" onclick="iniciarSessaoFlashcards({})">Mais uma rodada</button>
    ${aRever.length ? `<button class="btn btn-secondary" onclick="praticarQuestoesDoBaralho()">Praticar questões desses assuntos</button>` : ""}
    <button class="btn btn-ghost" onclick="sairDaSessaoFlash()">Encerrar</button>
  </div>`;
}
/* Ponte entre os dois formatos: depois do cartão, treinar a questão do mesmo
   assunto é o que transforma o conceito decorado em raciocínio. */
function praticarQuestoesDoBaralho(){
  const s = state.sessaoFlash; if(!s) return;
  const assuntos = [...new Set(s.notas.filter(n=>n.nota!=="sabia").map(n=>{ const c = getFlashcard(n.cartaoId); return c?c.assuntoId:null; }).filter(Boolean))];
  const pool = questoesParaEstudo(usuarioAtual().id).filter(q=>assuntos.includes(q.assuntoId));
  if(!pool.length){ toast("Ainda não há questões cadastradas nesses assuntos.", "err"); return; }
  const itens = embaralhar(pool).slice(0,15).map(q=>({questaoId:q.id, motivo:"Assunto que ficou pendente na revisão rápida"}));
  state.sessaoFlash = null;
  iniciarSessaoComLista(itens, "pratica");
}
/* Formulário de cartão, usado por três caminhos diferentes:
     - equipe criando material oficial (Revisão Rápida > Novo cartão)
     - aluno editando um cartão que ele mesmo escreveu
     - QUALQUER usuário transformando a questão que acabou de responder num
       cartão (opts.questaoId) — nesse caso o assunto já vem escolhido

   Quem não gere conteúdo só cria cartão PESSOAL: entra no baralho dele e não
   aparece para mais ninguém. É caderno de estudo, não material publicado. */
/* <option>s de todos os assuntos, agrupados por grande área, para os <select>
   de cartão (um só e baralho inteiro): "Especialidade › Assunto". */
function opcoesDeAssuntoAgrupadas(selecionado){
  return db.taxonomia.areas.map(area=>`<optgroup label="${escapeHtml(area.nome)}">${
    db.taxonomia.especialidades.filter(e=>e.areaId===area.id).map(e=>
      db.taxonomia.assuntos.filter(a=>a.especialidadeId===e.id).map(a=>
        `<option value="${a.id}" ${selecionado===a.id?"selected":""}>${escapeHtml(e.nome)} › ${escapeHtml(a.nome)}</option>`).join("")).join("")
  }</optgroup>`).join("");
}
function abrirFormularioFlashcard(id, opts){
  opts = opts || {};
  const u = usuarioAtual();
  const c = id ? (db.flashcards||[]).find(x=>x.id===id) : null;
  if(c && c.usuarioId && c.usuarioId!==u.id){ toast("Este cartão é de outro usuário.", "err"); return; }
  if(c && !c.usuarioId && !podeGerirConteudo()){ toast("Cartões da equipe só podem ser editados por professores e administradores de conteúdo.", "err"); return; }

  const daEquipe = podeGerirConteudo() && !state.modoAluno && !(c && c.usuarioId);
  const questao = opts.questaoId ? getQuestao(opts.questaoId) : null;
  // assunto pré-selecionado: o do cartão em edição, ou o da questão de origem
  const assuntoEscolhido = c ? c.assuntoId : (questao ? questao.assuntoId : null);
  const titulo = c ? "Editar cartão" : (questao ? "Virar flashcard" : "Novo cartão");
  state.filtroRota.imagemFlashcard = c ? (c.imagemUrl || "") : "";

  abrirModal(`
    ${cabecalhoJanela(titulo)}
    ${questao ? `<div class="card-flat mb-2">
      <div class="text-xs muted" style="font-weight:700;letter-spacing:.06em;text-transform:uppercase">Questão de origem</div>
      <div class="text-sm mt-1">${escapeHtml(questao.enunciado.slice(0,220))}${questao.enunciado.length>220?"…":""}</div>
      <div class="text-xs muted mt-1">${escapeHtml(questao.banca)} · ${questao.ano} · gabarito ${escapeHtml(questao.gabarito)}</div>
    </div>` : ""}
    <p class="text-sm muted">Cartão bom é curto e cobra UMA coisa. Se a frente precisa de dois parágrafos, provavelmente são dois cartões — ou é caso de questão, não de flashcard.</p>
    ${!daEquipe ? `<div class="card-flat mt-2 text-xs">${iconeSvg("user")} Este cartão fica <strong>só no seu baralho</strong>. Ninguém mais vê, e ele entra nas suas revisões junto com os cartões da equipe.</div>` : ""}
    <div class="field mt-2"><label class="label">Assunto</label>
      <select class="select" id="fcAssunto">
        ${opcoesDeAssuntoAgrupadas(assuntoEscolhido)}
      </select>
      ${questao ? `<div class="hint mt-1">Já veio marcado com o assunto da questão (${escapeHtml(nomeAssunto(questao.assuntoId))}). Troque se o seu cartão for sobre outra coisa.</div>` : ""}
    </div>
    <div class="field"><label class="label">Frente (a pergunta)</label><textarea class="textarea" id="fcFrente" style="min-height:80px" placeholder="${questao?"Ex.: o conceito que faltou para você acertar esta questão, virado em pergunta curta.":"Ex.: Qual é o tempo-alvo para angioplastia primária no IAM com supra?"}">${escapeHtml(c?c.frente:"")}</textarea></div>
    <div class="field"><label class="label">Verso (a resposta)</label><textarea class="textarea" id="fcVerso" style="min-height:120px" placeholder="Resposta direta, em uma ou duas frases, com a justificativa essencial.">${escapeHtml(c?c.verso:"")}</textarea></div>
    ${questao && !c ? `<button class="link-btn mb-2" onclick="preencherCartaoComGabarito('${questao.id}')">Preencher o verso com o gabarito comentado</button>` : ""}
    <div class="field">
      <label class="label">Imagem (opcional — ECG, fundo de olho, lesão de pele...)</label>
      <div id="fcImagemPreview" class="mb-1">${state.filtroRota.imagemFlashcard ? `<img src="${escapeHtml(state.filtroRota.imagemFlashcard)}" style="max-height:180px;max-width:100%;border:1px solid var(--border);border-radius:var(--radius-sm)" alt="">` : '<span class="text-xs muted">Nenhuma imagem anexada.</span>'}</div>
      <div class="flex gap-1 quebra">
        <label class="btn btn-secondary btn-sm clicavel">${iconeSvg("upload")} Enviar arquivo<input type="file" accept="image/*" style="display:none" onchange="carregarImagemFlashcard(this)"></label>
        <button class="btn btn-ghost btn-sm" onclick="definirImagemFlashcardPorUrl()">Usar link (URL)</button>
        ${state.filtroRota.imagemFlashcard ? `<button class="btn btn-ghost btn-sm" onclick="removerImagemFlashcard()">Remover imagem</button>` : ""}
      </div>
      <input class="input mt-1" id="fcImagemLegenda" placeholder="Legenda (ex.: ECG de 12 derivações, ritmo de base)" value="${escapeHtml(c?(c.imagemLegenda||""):"")}">
      <div class="hint mt-1">A imagem aparece na frente do cartão, antes de virar — ideal para cartões de reconhecimento (identifique o achado antes de ver a resposta).</div>
    </div>
    <p class="text-xs muted">${daEquipe
      ? "Mesma regra de conteúdo das questões: escrita autoral, baseada em diretrizes, consensos e protocolos oficiais. Nada copiado de cursinho, apostila ou banco comercial."
      : "Escreva com suas palavras. Cartão copiado do enunciado inteiro não ensina nada — o esforço de resumir é metade do aprendizado."}</p>
    <div class="flex gap-1 mt-2"><button class="btn btn-primary" onclick="salvarFlashcard('${id||""}','${opts.questaoId||""}')">Salvar cartão</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
}
/* Atalho: joga o gabarito comentado no verso, para o aluno editar em cima
   em vez de começar da folha em branco. */
function preencherCartaoComGabarito(qid){
  const q = getQuestao(qid); if(!q) return;
  const alt = (q.alternativas||[]).find(a=>a.id===q.gabarito);
  const texto = (alt ? q.gabarito+") "+alt.texto : "Gabarito: "+q.gabarito) + (q.explicacaoGeral ? "\n\n"+textoSemEnfase(q.explicacaoGeral) : "");
  const campo = document.getElementById("fcVerso");
  if(campo){ campo.value = texto; campo.focus(); }
}
function salvarFlashcard(id, questaoOrigemId){
  const frente = (document.getElementById("fcFrente").value||"").trim();
  const verso = (document.getElementById("fcVerso").value||"").trim();
  const assuntoId = document.getElementById("fcAssunto").value;
  const imagemUrl = state.filtroRota.imagemFlashcard || "";
  const imagemLegenda = (document.getElementById("fcImagemLegenda").value||"").trim();
  if(!frente || !verso){ toast("Preencha frente e verso.", "err"); return; }
  const u = usuarioAtual();
  if(!db.flashcards) db.flashcards = [];
  if(id){
    const c = db.flashcards.find(x=>x.id===id);
    if(!c) { toast("Cartão não encontrado.", "err"); return; }
    if(c.usuarioId && c.usuarioId!==u.id){ toast("Este cartão é de outro usuário.", "err"); return; }
    if(!c.usuarioId && !podeGerirConteudo()){ toast("Cartões da equipe só podem ser editados por professores e administradores.", "err"); return; }
    Object.assign(c, {frente, verso, assuntoId, imagemUrl, imagemLegenda});
    if(c.usuarioId) nuvemRegistrar({cartaoPessoal:c});
  } else {
    // sem permissão de conteúdo (ou em modo aluno) o cartão nasce pessoal
    const pessoal = !(podeGerirConteudo() && !state.modoAluno);
    db.flashcards.push({
      id: uid("fc"), frente, verso, assuntoId, imagemUrl, imagemLegenda,
      origem: pessoal ? "aluno" : "autoral",
      usuarioId: pessoal ? u.id : null,
      questaoOrigemId: questaoOrigemId || null,
      status: "ativo", criadoPor: u.id, criadoEm: hojeISO(),
    });
    const novoCartao = db.flashcards[db.flashcards.length-1];
    if(novoCartao.usuarioId) nuvemRegistrar({cartaoPessoal:novoCartao});
  }
  state.filtroRota.imagemFlashcard = "";
  saveState(); fecharModal();
  toast(id ? "Cartão atualizado." : "Cartão criado. Ele entra na sua próxima revisão rápida.");
  render();
}
/* ---------- promoção de cartão pessoal para o baralho da equipe -----------
   Hoje os dois mundos (cartão pessoal do aluno e baralho oficial da equipe)
   não se comunicam. Isto abre uma ponte com aprovação no meio: o aluno
   sugere, mas o cartão só vira material da equipe (visível a todos) depois
   que um professor ou administrador de conteúdo aprova — mesma lógica já
   usada para questões sugeridas (ver aprovarQuestaoSugerida). Até lá, o
   cartão continua sendo só do aluno, então nada muda para ele enquanto
   espera. */
function badgeSugestaoFlashcard(c){
  if(!c.sugeridoParaEquipe) return "";
  if(c.decisaoEm) return c.aprovadoEm
    ? ` <span class="badge badge-accent">promovido</span>`
    : ` <span class="badge badge-danger" title="${escapeHtml(c.motivoRecusa||"")}">recusado</span>`;
  return ` <span class="badge badge-amber">aguardando aprovação</span>`;
}
/* COMPARTILHAR COM O GRUPO. O cartão continua sendo de quem o escreveu (só
   essa pessoa edita e arquiva), mas os colegas do grupo o recebem no
   baralho. Compartilhar e sugerir à equipe são caminhos separados — o
   cartão só segue um deles por vez, porque na nuvem cada um é uma linha
   com um destino (03e). */
function grupoAtualDoCartao(u){ return grupoPrincipalDeQuestoes(u); }
function compartilharCartaoComGrupo(id){
  const u = usuarioAtual();
  const c = (db.flashcards||[]).find(x=>x.id===id);
  if(!c || c.usuarioId!==u.id){ toast("Cartão não encontrado.", "err"); return; }
  if(c.grupoId){
    c.grupoAntigoId = c.grupoId;      // a nuvem precisa saber de qual grupo retirar
    delete c.grupoId;
    toast("O cartão voltou a ser só seu.");
  }else{
    const g = grupoAtualDoCartao(u);
    if(g.oficial){ toast("Entre num grupo em Meu Grupo para compartilhar cartões com os colegas.", "err"); return; }
    if(c.sugeridoParaEquipe && !c.decisaoEm){ toast("Este cartão está esperando a decisão da equipe. Depois dela, você pode compartilhá-lo.", "err"); return; }
    c.grupoId = g.id; delete c.grupoAntigoId;
    toast("Cartão compartilhado com o grupo "+g.nome+".");
  }
  if(c.usuarioId) nuvemRegistrar({cartaoPessoal:c});
  saveState(); render();
}
/* Os cartões que os colegas do grupo compartilharam: entram no baralho de
   todos e ficam à vista aqui, para ninguém estranhar cartão que não escreveu. */
function renderCartoesDoGrupo(u){
  const g = grupoAtualDoCartao(u);
  if(g.oficial) return "";
  const dosColegas = (db.flashcards||[]).filter(c=>c.grupoId===g.id && c.usuarioId && c.usuarioId!==u.id && c.status!=="arquivado");
  if(!dosColegas.length) return `<div class="card-flat mt-2 text-sm">${iconeSvg("users")} Os cartões que os colegas do seu grupo compartilharem aparecem aqui e entram no seu baralho. Para compartilhar os seus, use o ícone de grupo em <strong>Meus cartões</strong> ou marque a opção em <strong>Adicionar baralho</strong>.</div>`;
  const pag = paginar(dosColegas, "flash-grupo", {porPagina:10});
  return `<div class="card mt-2">
    <div class="card-title">${iconeSvg("users")} Cartões do grupo (${dosColegas.length})</div>
    <div class="text-sm muted">Compartilhados pelos colegas de ${escapeHtml(g.nome)}. Entram no seu baralho junto com os da equipe; só quem escreveu edita.</div>
    <div class="table-wrap mt-2"><table><thead><tr><th>Frente</th><th>Assunto</th><th>Colega</th></tr></thead><tbody>
      ${pag.itens.map(c=>`<tr><td class="text-sm">${escapeHtml(c.frente.slice(0,110))}${c.frente.length>110?"…":""}</td><td class="text-sm">${escapeHtml(nomeAssunto(c.assuntoId))}</td><td class="text-sm">${escapeHtml(nomeDoMembro(g, c.usuarioId))}</td></tr>`).join("")}
    </tbody></table></div>
    ${controlesPaginacao(pag, "cartão(ões) do grupo")}
  </div>`;
}
function sugerirFlashcardParaEquipe(id){
  const u = usuarioAtual();
  const c = (db.flashcards||[]).find(x=>x.id===id);
  if(!c || c.usuarioId!==u.id){ toast("Cartão não encontrado.", "err"); return; }
  if(c.grupoId){ c.grupoAntigoId = c.grupoId; delete c.grupoId; }   // um destino por vez
  c.sugeridoParaEquipe = true;
  c.sugeridoEm = hojeISO();
  delete c.decisaoEm; delete c.aprovadoEm; delete c.aprovadoPor; delete c.motivoRecusa;
  saveState();
  toast("Cartão enviado para aprovação da coordenação/professor. Ele continua no seu baralho normalmente enquanto isso.");
  render();
}
function flashcardsSugeridos(){
  return (db.flashcards||[]).filter(c=>c.usuarioId && c.sugeridoParaEquipe && !c.decisaoEm).sort((a,b)=>(a.sugeridoEm||"").localeCompare(b.sugeridoEm||""));
}
function aprovarFlashcardSugerido(id){
  const c = (db.flashcards||[]).find(x=>x.id===id); if(!c) return;
  c.autorOriginalId = c.usuarioId;
  c.usuarioId = null;
  c.origem = "promovido";
  c.decisaoEm = hojeISO();
  c.aprovadoEm = hojeISO();
  c.aprovadoPor = usuarioAtual().id;
  c.aprovadoPorNome = usuarioAtual().nome;
  saveState();
  toast("Cartão promovido: agora faz parte do baralho da equipe, visível para todos.");
  render();
}
function recusarFlashcardSugerido(id){
  const motivo = (window.prompt("Motivo da recusa (o aluno vai ver isto; pode deixar em branco):", "")||"").trim();
  const c = (db.flashcards||[]).find(x=>x.id===id); if(!c) return;
  c.decisaoEm = hojeISO();
  c.motivoRecusa = motivo;
  saveState();
  toast("Sugestão recusada. O cartão continua pessoal do aluno, que pode ajustar e enviar de novo.");
  render();
}
function podeMexerNoCartao(c){
  if(!c) return false;
  const u = usuarioAtual();
  if(c.usuarioId) return c.usuarioId === u.id;          // pessoal: só o dono
  return podeGerirConteudo();                            // da equipe: quem gere conteúdo
}
function arquivarFlashcard(id){
  const c = (db.flashcards||[]).find(x=>x.id===id); if(!c) return;
  if(!podeMexerNoCartao(c)){ toast("Você não pode arquivar este cartão.", "err"); return; }
  const pessoal = !!c.usuarioId;
  abrirModal(`${cabecalhoJanela("Arquivar cartão")}
    <p>${pessoal
      ? "O cartão sai do seu baralho. O histórico de revisão dele fica guardado, caso você queira retomá-lo depois."
      : "O cartão deixa de aparecer nos baralhos de todos os alunos, mas o histórico de quem já o revisou é preservado."}</p>
    <div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="arquivarFlashcardConfirmado('${id}')">Arquivar</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
}
function arquivarFlashcardConfirmado(id){
  const c = (db.flashcards||[]).find(x=>x.id===id);
  if(!podeMexerNoCartao(c)){ toast("Você não pode arquivar este cartão.", "err"); return; }
  c.status = "arquivado";
  if(c.usuarioId) nuvemRegistrar({cartaoPessoal:c});
  saveState(); fecharModal(); toast("Cartão arquivado."); render();
}
