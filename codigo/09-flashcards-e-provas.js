/* Esc — codigo/09-flashcards-e-provas.js  (parte 9 de 13)
   Revisão Rápida (flashcards), simulados e provas antigas.
   Os arquivos de codigo/ são carregados em ordem pelo index.html (lista
   ESC_ARQUIVOS.codigo) e dividem o mesmo espaço: uma função escrita num
   arquivo é usada nos outros sem import. */

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
    <div class="flex justify-between items-center gap-2" style="flex-wrap:wrap">
      <div style="min-width:220px;flex:1">
        <div class="card-title" style="margin-bottom:.2rem">Meta de cartões de hoje</div>
        <div class="text-sm muted">${vistosHoje>=metaCartoes
          ? "Meta de cartões batida. Se o dia não der para questão, o estudo de hoje já aconteceu."
          : `Faltam <strong>${faltamCartoes}</strong> cartão(ões) para fechar o dia.`}</div>
      </div>
      <div class="flex items-center gap-2" style="flex-wrap:wrap">
        <div style="text-align:right">
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
    <div class="flex justify-between items-center gap-2" style="flex-wrap:wrap">
      <div>
        <div class="card-title">Baralho recomendado</div>
        <div class="text-sm muted">A plataforma escolhe a ordem: primeiro o que venceu, depois os assuntos em que sua confiança engana, depois os erros caros e só então o que você ainda não viu.</div>
      </div>
      <button class="btn btn-primary" onclick="iniciarSessaoFlashcards({})">${iconeSvg("cards")} Começar</button>
    </div>
  </div>

  ${falsaSeguranca.length ? `<div class="card mt-2" style="border-color:var(--amber)">
    <div class="card-title">${iconeSvg("alert")} Só os assuntos em que você erra dizendo ter certeza</div>
    <p class="text-sm muted">${falsaSeguranca.slice(0,5).map(f=>escapeHtml(nomeAssunto(f.assuntoId))+" ("+f.taxa+"%)").join(" · ")}</p>
    <button class="btn btn-secondary mt-2" onclick="iniciarSessaoFlashcards({somenteFalsaSeguranca:true})">Revisar só esses</button>
  </div>` : ""}

  <div class="card mt-2">
    <div class="card-title">Escolher um recorte</div>
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
    <button class="btn btn-secondary" onclick="iniciarSessaoFlashcards(state.filtroRota.flashcards||{})">Começar com esse recorte</button>
  </div>

  ${meus.length ? `<div class="card mt-2">
    <div class="flex justify-between items-center gap-2" style="flex-wrap:wrap">
      <div style="min-width:220px;flex:1">
        <div class="card-title">Meus cartões (${meus.length})</div>
        <div class="text-sm muted">Os que você escreveu enquanto resolvia questões. São seus: ninguém mais vê, e entram no baralho junto com os da equipe.</div>
      </div>
    </div>
    <div class="table-wrap mt-2"><table><thead><tr><th>Frente</th><th>Assunto</th><th>Criado em</th><th></th></tr></thead><tbody>
      ${pagMeus.itens.map(c=>`<tr>
        <td class="text-sm"><span class="enunciado-clicavel" onclick="abrirFormularioFlashcard('${c.id}')">${escapeHtml(c.frente.slice(0,110))}${c.frente.length>110?"…":""}</span>${badgeSugestaoFlashcard(c)}</td>
        <td class="text-sm">${escapeHtml(nomeAssunto(c.assuntoId))}</td>
        <td class="text-xs muted">${c.criadoEm?formatDataBR(c.criadoEm):"—"}</td>
        <td class="flex gap-1">
          ${c.questaoOrigemId?`<button class="icon-btn" title="Ver a questão que originou o cartão" onclick="abrirQuestaoCompleta('${c.questaoOrigemId}')">${iconeSvg("search")}</button>`:""}
          <button class="icon-btn" title="Editar" onclick="abrirFormularioFlashcard('${c.id}')">${iconeSvg("edit")}</button>
          ${!c.sugeridoParaEquipe || c.decisaoEm ? `<button class="icon-btn" title="Sugerir para o baralho da equipe" onclick="sugerirFlashcardParaEquipe('${c.id}')">${iconeSvg("upload")}</button>` : ""}
          <button class="icon-btn" title="Arquivar" onclick="arquivarFlashcard('${c.id}')">${iconeSvg("trash")}</button>
        </td></tr>`).join("")}
    </tbody></table></div>
    ${controlesPaginacao(pagMeus, "cartão(ões) seu(s)")}
  </div>` : `<div class="card-flat mt-2 text-sm">
    <strong>Escreva seus próprios cartões.</strong> Ao responder uma questão, o botão “${"Virar flashcard"}” monta um cartão já no assunto daquela questão — é o melhor momento para isso, porque o conceito que faltou ainda está fresco. Esses cartões são só seus.
  </div>`}

  ${podeEditar ? `<div class="card mt-2">
    <div class="flex justify-between items-center gap-2" style="flex-wrap:wrap">
      <div style="min-width:220px;flex:1"><div class="card-title">Cartões da equipe (${daEquipe.length})</div>
      <div class="text-sm muted">Material oficial, visível para todos os alunos. Os cartões pessoais que cada aluno escreve não aparecem aqui.</div></div>
      <div class="flex gap-1" style="flex-wrap:wrap">
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
  </div>` : ""}

  <div class="card-flat mt-2 text-sm">
    <strong>Como funciona:</strong> cada cartão tem seu próprio intervalo. "Sabia" empurra o cartão para longe; "quase" trava o intervalo em no máximo 3 dias, porque lembrar com esforço é exatamente o sinal de que o conceito ainda não está firme; "não lembrei" devolve o cartão para o dia seguinte. Esse histórico é separado do das questões: dá para saber o conceito e ainda assim errar a questão, e a plataforma trata os dois como coisas diferentes.
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
function iniciarSessaoFlashcards(filtro){
  const u = usuarioAtual();
  const cartoes = montarBaralhoFlashcards(u.id, 20, filtro||{});
  if(!cartoes.length){ toast("Não há cartões para este recorte ainda. Tente um filtro mais amplo, ou peça à equipe para cadastrar cartões desse assunto.", "err"); return; }
  state.sessaoFlash = { cartoes, indice:0, virado:false, notas:[], finalizada:false };
  navigate("flashcards");
}
function virarFlashcard(){
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
        ? `<div class="flash-verso">${escapeHtml(cartao.verso)}</div>`
        : `<div class="flash-frente">${escapeHtml(cartao.frente)}</div>`}
      <div class="flash-toque">${iconeSvg("refresh")} ${s.virado?"Clique no cartão para ver a pergunta de novo":"Clique no cartão para ver a resposta"}</div>
    </div>
  </div>
  ${s.virado ? `<div class="flash-notas">
    <button class="flash-nota ruim" onclick="responderFlashcard('naolembrei')">Não lembrei<small>volta amanhã</small></button>
    <button class="flash-nota medio" onclick="responderFlashcard('quase')">Quase<small>volta em poucos dias</small></button>
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
    <div class="stat-tile"><div class="stat-value">${cont.naolembrei}</div><div class="stat-label">não lembrei — voltam amanhã</div></div>
  </div>
  ${aRever.length ? `<div class="card mt-2">
    <div class="card-title">O que ficou pendente</div>
    ${aRever.map(n=>{ const c = getFlashcard(n.cartaoId); if(!c) return ""; return `<div class="card-flat mb-1">
      <div class="text-sm" style="font-weight:600">${escapeHtml(c.frente.slice(0,160))}${c.frente.length>160?"…":""}</div>
      <div class="text-xs muted mt-1">${escapeHtml(nomeAssunto(c.assuntoId))} · ${n.nota==="quase"?"lembrou com esforço":"não lembrou"}</div>
    </div>`; }).join("")}
  </div>` : `<div class="card mt-2"><p class="text-sm">Você acertou todos de primeira. Se isso se repetir, vale aumentar o recorte do baralho ou voltar para as questões — cartão fácil demais deixa de ensinar.</p></div>`}
  <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
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
    <div class="modal-header"><h3>${titulo}</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
    ${questao ? `<div class="card-flat mb-2">
      <div class="text-xs muted" style="font-weight:700;letter-spacing:.06em;text-transform:uppercase">Questão de origem</div>
      <div class="text-sm mt-1">${escapeHtml(questao.enunciado.slice(0,220))}${questao.enunciado.length>220?"…":""}</div>
      <div class="text-xs muted mt-1">${escapeHtml(questao.banca)} · ${questao.ano} · gabarito ${escapeHtml(questao.gabarito)}</div>
    </div>` : ""}
    <p class="text-sm muted">Cartão bom é curto e cobra UMA coisa. Se a frente precisa de dois parágrafos, provavelmente são dois cartões — ou é caso de questão, não de flashcard.</p>
    ${!daEquipe ? `<div class="card-flat mt-2 text-xs">${iconeSvg("user")} Este cartão fica <strong>só no seu baralho</strong>. Ninguém mais vê, e ele entra nas suas revisões junto com os cartões da equipe.</div>` : ""}
    <div class="field mt-2"><label class="label">Assunto</label>
      <select class="select" id="fcAssunto">
        ${db.taxonomia.areas.map(area=>`<optgroup label="${escapeHtml(area.nome)}">${
          db.taxonomia.especialidades.filter(e=>e.areaId===area.id).map(e=>
            db.taxonomia.assuntos.filter(a=>a.especialidadeId===e.id).map(a=>
              `<option value="${a.id}" ${assuntoEscolhido===a.id?"selected":""}>${escapeHtml(e.nome)} › ${escapeHtml(a.nome)}</option>`).join("")).join("")
        }</optgroup>`).join("")}
      </select>
      ${questao ? `<div class="hint mt-1">Já veio marcado com o assunto da questão (${escapeHtml(nomeAssunto(questao.assuntoId))}). Troque se o seu cartão for sobre outra coisa.</div>` : ""}
    </div>
    <div class="field"><label class="label">Frente (a pergunta)</label><textarea class="textarea" id="fcFrente" style="min-height:80px" placeholder="${questao?"Ex.: o conceito que faltou para você acertar esta questão, virado em pergunta curta.":"Ex.: Qual é o tempo-alvo para angioplastia primária no IAM com supra?"}">${escapeHtml(c?c.frente:"")}</textarea></div>
    <div class="field"><label class="label">Verso (a resposta)</label><textarea class="textarea" id="fcVerso" style="min-height:120px" placeholder="Resposta direta, em uma ou duas frases, com a justificativa essencial.">${escapeHtml(c?c.verso:"")}</textarea></div>
    ${questao && !c ? `<button class="link-btn mb-2" onclick="preencherCartaoComGabarito('${questao.id}')">Preencher o verso com o gabarito comentado</button>` : ""}
    <div class="field">
      <label class="label">Imagem (opcional — ECG, fundo de olho, lesão de pele...)</label>
      <div id="fcImagemPreview" class="mb-1">${state.filtroRota.imagemFlashcard ? `<img src="${escapeHtml(state.filtroRota.imagemFlashcard)}" style="max-height:180px;max-width:100%;border:1px solid var(--border);border-radius:var(--radius-sm)" alt="">` : '<span class="text-xs muted">Nenhuma imagem anexada.</span>'}</div>
      <div class="flex gap-1" style="flex-wrap:wrap">
        <label class="btn btn-secondary btn-sm" style="cursor:pointer">${iconeSvg("upload")} Enviar arquivo<input type="file" accept="image/*" style="display:none" onchange="carregarImagemFlashcard(this)"></label>
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
  const texto = (alt ? q.gabarito+") "+alt.texto : "Gabarito: "+q.gabarito) + (q.explicacaoGeral ? "\n\n"+q.explicacaoGeral : "");
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
function sugerirFlashcardParaEquipe(id){
  const u = usuarioAtual();
  const c = (db.flashcards||[]).find(x=>x.id===id);
  if(!c || c.usuarioId!==u.id){ toast("Cartão não encontrado.", "err"); return; }
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
  abrirModal(`<div class="modal-header"><h3>Arquivar cartão</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
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

/* ==========================================================================
   13. SIMULADOS (lista, execução cronometrada, resultado)
   ========================================================================== */
/* ---------- uma tela só para prova cronometrada -----------------------------
   Simulados e Provas Antigas eram duas entradas de menu que levavam ao mesmo
   lugar mental — "fazer uma prova inteira, no relógio" — e a pessoa tinha de
   lembrar em qual delas estava o que queria. Agora são duas abas de uma tela
   só, e a diferença continua explícita, porque ela é real:

   - PROVA ANTIGA é a prova de verdade de uma instituição num ano, do jeito
     que caiu. Serve para medir onde você está contra a banca.
   - SIMULADO é um recorte montado pela equipe (ou por você), com tempo e
     tamanho escolhidos. Serve para treinar um bloco ou um assunto.

   O histórico de notas é o mesmo para os dois, então fica embaixo das duas
   abas em vez de duplicado. */
function abaProvas(){
  const f = state.filtroRota;
  if(f.abaProvas !== "simulados" && f.abaProvas !== "antigas") f.abaProvas = "antigas";
  return f.abaProvas;
}
function mudarAbaProvas(aba){ state.filtroRota.abaProvas = aba; render(); }
function renderProvasESimulados(){
  const u = usuarioAtual();
  const aba = abaProvas();
  const bloco = getBlocoAtual();
  const recomendados = db.simulados.filter(s=>s.recomendadoParaBlocos && s.recomendadoParaBlocos.includes(bloco.id));
  const outros = db.simulados.filter(s=>!recomendados.includes(s));
  const meusResultados = db.resultadosSimulados.filter(r=>r.usuarioId===u.id).sort((a,b)=>b.data.localeCompare(a.data));
  const pagResultados = paginar(meusResultados, "provas-resultados", {porPagina:10});
  return `
  <div class="page-header"><h2>Provas e Simulados</h2><p>Prova inteira, no relógio. Na primeira aba, as provas antigas como caíram; na segunda, os simulados montados pela equipe para um bloco ou assunto.</p></div>
  <div class="flex gap-1 mb-2" style="flex-wrap:wrap">
    <button class="pill ${aba==="antigas"?"active":""}" onclick="mudarAbaProvas('antigas')">${iconeSvg("archive")} Provas antigas</button>
    <button class="pill ${aba==="simulados"?"active":""}" onclick="mudarAbaProvas('simulados')">${iconeSvg("clipboard")} Simulados da equipe (${db.simulados.length})</button>
  </div>
  ${aba==="antigas" ? renderAbaProvasAntigas(u) : `
    <p class="text-sm muted mb-2">Montados por professores, com tempo e tamanho definidos por eles. Os recomendados são os do seu bloco atual (${escapeHtml(bloco.nome)}).</p>
    ${recomendados.length ? `<div class="card-title mb-1">Recomendados para o seu bloco atual</div>${recomendados.map(renderSimuladoCard).join("")}` : ""}
    ${outros.length ? `<div class="card-title mt-3 mb-1">Outros simulados disponíveis</div>${outros.map(renderSimuladoCard).join("")}` : ""}
    ${!db.simulados.length ? '<div class="empty-state">Nenhum simulado disponível ainda. Peça a um professor para criar e recomendar um simulado para o seu bloco — ou faça uma prova antiga inteira, na aba ao lado.</div>' : ""}
  `}
  ${meusResultados.length ? `<div class="card mt-3">
    <div class="card-title mb-1">Suas notas (provas antigas e simulados)</div>
    <div class="table-wrap"><table><thead><tr><th>Prova</th><th>Nota</th><th>Data</th><th></th></tr></thead><tbody>
      ${pagResultados.itens.map(r=>`<tr><td class="text-sm">${escapeHtml(r.titulo||"—")}</td><td><span class="badge ${r.nota>=70?"badge-accent":r.nota>=50?"badge-amber":"badge-danger"}">${r.nota}%</span></td><td class="text-sm">${formatDataBR(r.data)}</td><td>${r.itens?`<button class="link-btn" onclick="verDetalheResultadoSimulado('${r.id}')">ver detalhes</button>`:""}</td></tr>`).join("")}
    </tbody></table></div>
    ${controlesPaginacao(pagResultados, "resultado(s)")}
  </div>` : ""}
  `;
}
// as duas rotas antigas continuam respondendo e levam à mesma tela
function renderSimulados(){ return renderProvasESimulados(); }
/* histórico do próprio usuário naquele simulado, para ele saber, na hora de
   escolher, se já fez e como foi */
function desempenhoPrevioSimulado(simuladoId, titulo){
  const u = usuarioAtual();
  const tentativas = db.resultadosSimulados
    .filter(r=>r.usuarioId===u.id && (simuladoId ? r.simuladoId===simuladoId : r.titulo===titulo))
    .sort((a,b)=>a.data.localeCompare(b.data));
  if(!tentativas.length) return null;
  const notas = tentativas.map(t=>t.nota);
  const ultima = tentativas[tentativas.length-1];
  return {
    n: tentativas.length, ultima, melhor: Math.max(...notas),
    variacao: tentativas.length>1 ? ultima.nota - tentativas[tentativas.length-2].nota : null,
  };
}
function renderSimuladoCard(s){
  const previo = desempenhoPrevioSimulado(s.id, s.titulo);
  return `<div class="card mb-1">
    <div class="flex justify-between items-center gap-2" style="flex-wrap:wrap">
      <div>
        <div style="font-weight:700">${escapeHtml(s.titulo)}</div>
        <div class="text-sm muted">${s.questoes.length} questões · ${s.duracaoMin} min</div>
        ${previo ? `<div class="qcard-meta mt-1">
            <span class="badge ${previo.ultima.nota>=70?"badge-accent":previo.ultima.nota>=50?"badge-amber":"badge-danger"}">já feito · última nota ${previo.ultima.nota}%</span>
            <span class="badge badge-muted">melhor: ${previo.melhor}%</span>
            <span class="badge badge-muted">${previo.n} tentativa(s) · ${formatDataBR(previo.ultima.data)}</span>
            ${previo.variacao!==null ? `<span class="badge ${previo.variacao>=0?"badge-accent":"badge-danger"}">${previo.variacao>=0?"+":""}${previo.variacao} pts vs. anterior</span>` : ""}
          </div>` : '<div class="qcard-meta mt-1"><span class="badge badge-muted">ainda não realizado</span></div>'}
      </div>
      <div class="flex gap-1" style="flex-wrap:wrap">
        ${previo && previo.ultima.itens ? `<button class="btn btn-secondary btn-sm" onclick="verDetalheResultadoSimulado('${previo.ultima.id}')">Ver resultado anterior</button>` : ""}
        <button class="btn btn-primary btn-sm" onclick="iniciarSimulado('${s.id}')">${previo?"Refazer":"Começar"}</button>
      </div>
    </div>
  </div>`;
}
function iniciarSimulado(simuladoId){
  const s = db.simulados.find(x=>x.id===simuladoId); if(!s) return;
  state.sessaoAtual = { id:uid("simsessao"), tipo:"simulado", simuladoId, titulo:s.titulo, itens:s.questoes.map(qid=>({questaoId:qid, motivo:"Simulado: "+s.titulo})), indiceAtual:0, respostasSimulado:{}, duracaoMin:s.duracaoMin, finalizado:false, modoAprendizado:false, inicioMs:Date.now(), tsQuestao:Date.now(), tempos:{} };
  navigate("simulado-ativo");
}

/* ---------- cronômetro do simulado e tempo por questão ----------
   O relógio corre num intervalo próprio e só escreve no elemento da tela,
   sem redesenhar a página inteira a cada segundo. O tempo gasto em cada
   questão é acumulado toda vez que o aluno troca de questão ou finaliza —
   é esse número que depois mostra onde ele trava. */
let intervaloCronometro = null;
function acumularTempoQuestaoSimulado(){
  const s = state.sessaoAtual;
  if(!s || s.tipo!=="simulado" || !s.tsQuestao) return;
  const item = s.itens[s.indiceAtual]; if(!item) return;
  const delta = (Date.now() - s.tsQuestao)/1000;
  if(delta>0 && delta<7200) s.tempos[item.questaoId] = (s.tempos[item.questaoId]||0) + delta;
  s.tsQuestao = Date.now();
}
function tempoDecorridoSimulado(){
  const s = state.sessaoAtual;
  if(!s || !s.inicioMs) return 0;
  return Math.floor(((s.fimMs||Date.now()) - s.inicioMs)/1000);
}
function pararCronometro(){
  if(intervaloCronometro && typeof clearInterval==="function"){ clearInterval(intervaloCronometro); }
  intervaloCronometro = null;
}
function atualizarCronometro(){
  const s = state.sessaoAtual;
  // o relógio se desliga sozinho quando não há simulado em andamento
  if(!s || s.tipo!=="simulado" || s.finalizado || !s.inicioMs){ pararCronometro(); return; }
  const el = (typeof document!=="undefined") ? document.getElementById("cronometroSimulado") : null;
  if(!el) return;
  const decorrido = tempoDecorridoSimulado();
  const limite = (s.duracaoMin||0)*60;
  if(!limite){ el.textContent = formatarDuracao(decorrido)+" decorridos"; return; }
  const restante = limite - decorrido;
  if(restante<=0){
    el.textContent = "tempo esgotado";
    toast("Tempo esgotado. O simulado foi finalizado automaticamente — suas respostas estão salvas.", "err");
    finalizarSimulado();
    return;
  }
  el.textContent = formatarDuracao(restante)+" restantes";
  el.className = "badge " + (restante<300 ? "badge-danger" : restante<600 ? "badge-amber" : "badge-muted");
}
function garantirCronometro(){
  if(intervaloCronometro || typeof setInterval!=="function") return;
  intervaloCronometro = setInterval(atualizarCronometro, 1000);
}
function selecionarAlternativaSimulado(altId){
  const sessao = state.sessaoAtual; if(!sessao) return;
  desriscarSeNecessario(altId);
  sessao.respostasSimulado[sessao.itens[sessao.indiceAtual].questaoId] = altId;
  render();
}
function irQuestaoSimulado(delta){ const s=state.sessaoAtual; acumularTempoQuestaoSimulado(); s.indiceAtual=Math.max(0,Math.min(s.itens.length-1,s.indiceAtual+delta)); render(); }
function irQuestaoSimuladoIndice(i){ acumularTempoQuestaoSimulado(); state.sessaoAtual.indiceAtual=i; render(); }
function confirmarSairSimulado(){
  abrirModal(`<div class="modal-header"><h3>Sair sem salvar?</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div><p>Se sair agora, suas respostas deste simulado não serão registradas.</p><div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="fecharModal();state.sessaoAtual=null;navigate('simulados')">Sair mesmo assim</button><button class="btn btn-secondary" onclick="fecharModal()">Continuar simulado</button></div>`);
}
function finalizarSimulado(){
  const sessao = state.sessaoAtual; const u = usuarioAtual();
  if(sessao.finalizado) return;
  acumularTempoQuestaoSimulado();
  sessao.fimMs = Date.now();
  const tempoTotalSeg = sessao.inicioMs ? tempoDecorridoSimulado() : null;
  let acertos = 0;
  sessao.itens.forEach(it=>{
    const q = getQuestao(it.questaoId);
    const resp = sessao.respostasSimulado[it.questaoId];
    if(resp===q.gabarito) acertos++;
    if(resp) registrarResposta(u.id, it.questaoId, resp, "duvida", sessao.tempos ? sessao.tempos[it.questaoId] : null);
  });
  const nota = pct(acertos, sessao.itens.length);
  db.resultadosSimulados.push({id:uid("res"), usuarioId:u.id, simuladoId:sessao.simuladoId, titulo:sessao.titulo, nota, acertos, total:sessao.itens.length, data:hojeISO(), itens:copiaProfunda(sessao.itens), respostas:{...sessao.respostasSimulado}, tempoTotalSeg, tempos:{...(sessao.tempos||{})}});
  nuvemRegistrar({resultadoSimulado: db.resultadosSimulados[db.resultadosSimulados.length-1]});
  saveState();
  sessao.finalizado = true;
  pararCronometro();
  render();
}
function verDetalheResultadoSimulado(resultadoId){
  const r = db.resultadosSimulados.find(x=>x.id===resultadoId);
  if(!r || !r.itens){ toast("Este resultado é de antes desta função existir e não tem detalhe salvo.", "err"); return; }
  state.sessaoAtual = { id:uid("simsessao"), tipo:"simulado", simuladoId:r.simuladoId, titulo:r.titulo, itens:r.itens, indiceAtual:0, respostasSimulado:{...r.respostas}, finalizado:true, modoAprendizado:false, tempos:{...(r.tempos||{})}, tempoTotalSeg:r.tempoTotalSeg||null };
  navigate("simulado-ativo");
}
function renderSimuladoAtivo(){
  const sessao = state.sessaoAtual;
  if(!sessao || sessao.tipo!=="simulado") return `<div class="empty-state">Nenhum simulado em andamento.<br><button class="btn btn-primary mt-2" onclick="navigate('simulados')">Ver simulados</button></div>`;
  if(sessao.finalizado) return renderResultadoSimulado();
  const item = sessao.itens[sessao.indiceAtual];
  const q = getQuestao(item.questaoId);
  const respostaAtual = sessao.respostasSimulado[q.id];
  // conta sobre a lista da prova (e não sobre as chaves do objeto de
  // respostas), para o número continuar certo mesmo que a mesma questão
  // apareça duas vezes numa lista montada por filtro
  const respondidasCount = sessao.itens.filter(it=>sessao.respostasSimulado[it.questaoId]!==undefined).length;
  const emBranco = sessao.itens.length - respondidasCount;
  const emModoAprendizado = !!sessao.modoAprendizado;
  const jaRespondeuEssa = respostaAtual !== undefined;
  garantirCronometro();
  return `
  <div class="flex justify-between items-center mb-2" style="flex-wrap:wrap;gap:.5rem">
    <div class="text-sm muted flex items-center gap-1" style="flex-wrap:wrap">
      <span>Questão ${sessao.indiceAtual+1} de ${sessao.itens.length} · ${respondidasCount} respondida(s) · ${emBranco} em branco</span>
      ${iconeSvg("clock")}<span class="badge badge-muted" id="cronometroSimulado">${sessao.duracaoMin?formatarDuracao(Math.max(0,sessao.duracaoMin*60 - tempoDecorridoSimulado()))+" restantes":formatarDuracao(tempoDecorridoSimulado())+" decorridos"}</span>
    </div>
    <div class="flex gap-1">
      <button class="btn ${emModoAprendizado?"btn-primary":"btn-secondary"} btn-sm" onclick="alternarModoAprendizadoSimulado()" title="Mostra a explicação assim que você responder, sem esperar o fim do simulado">${emModoAprendizado?iconeSvg("check")+" Modo aprendizado ativado":"Ativar modo aprendizado"}</button>
      <button class="btn btn-ghost btn-sm" onclick="confirmarSairSimulado()">Sair sem salvar</button>
    </div>
  </div>
  <div class="text-xs muted mb-1">Mapa de questões — clique num número pra ir direto, ou use as teclas A (anterior) / D (próxima). Ele mostra só o que já foi respondido; se a resposta está certa ou errada você fica sabendo no resultado, quando o simulado acabar.</div>
  <div class="mapa-questoes mb-1">
    ${sessao.itens.map((it,i)=>{
      // o número da questão fica sempre visível: é por ele que a pessoa se
      // localiza na prova e no caderno de rascunho
      const respondida = sessao.respostasSimulado[it.questaoId] !== undefined;
      const atual = i===sessao.indiceAtual;
      return `<button class="pill pill-mapa ${respondida?"respondida":"em-branco"}${atual?" atual":""}" onclick="irQuestaoSimuladoIndice(${i})" title="Questão ${i+1} — ${respondida?"respondida":"em branco"}${atual?" (você está nesta)":""}" aria-label="Questão ${i+1}, ${respondida?"respondida":"em branco"}"${atual?' aria-current="true"':""}>${respondida?'<span class="ponto-resp"></span>':""}${i+1}</button>`;
    }).join("")}
  </div>
  <div class="mapa-legenda text-xs muted mb-2">
    <span class="amostra"><span class="quadro"></span>respondida (${respondidasCount})</span>
    <span class="amostra"><span class="quadro vazio"></span>em branco (${emBranco})</span>
  </div>
  <div class="area-gesto" id="areaGestoQuestao">
    ${renderQuestionCard(q, emModoAprendizado ? {selecionada:respostaAtual, modoSimulado:true, respondida:jaRespondeuEssa} : {selecionada:respostaAtual, modoSimulado:true, respondida:false})}
  </div>
  <div class="dica-arrastar">${iconeSvg("swipe")}<span>arraste para o lado para trocar de questão</span></div>
  <div class="flex justify-between mt-2">
    <button class="btn btn-secondary" onclick="irQuestaoSimulado(-1)" ${sessao.indiceAtual===0?"disabled":""}>Anterior</button>
    ${sessao.indiceAtual < sessao.itens.length-1 ? `<button class="btn btn-secondary" onclick="irQuestaoSimulado(1)">Próxima</button>` : `<button class="btn btn-primary" onclick="finalizarSimulado()">Finalizar simulado</button>`}
  </div>`;
}
/* Quanto tempo cada questão consumiu e onde o aluno travou. "Travar" aqui é
   passar de 1,6 vez o tempo mediano dele mesmo — comparação com o próprio
   ritmo, não com um padrão externo. */
function analiseTempoSimulado(sessao, linhas){
  const tempos = sessao.tempos || {};
  const comTempo = linhas.map(l=>({i:l.i, qid:l.q.id, correta:l.correta, seg: Math.round(tempos[l.q.id]||0)})).filter(x=>x.seg>0);
  if(comTempo.length < 2) return null;
  const ordenados = comTempo.map(x=>x.seg).sort((a,b)=>a-b);
  const meio = Math.floor(ordenados.length/2);
  const mediana = ordenados.length%2 ? ordenados[meio] : Math.round((ordenados[meio-1]+ordenados[meio])/2);
  const soma = ordenados.reduce((a,b)=>a+b,0);
  const total = sessao.tempoTotalSeg || soma;
  return {
    total, media: Math.round(soma/comTempo.length), mediana,
    lentas: comTempo.filter(x=>x.seg > mediana*1.6).sort((a,b)=>b.seg-a.seg).slice(0,5),
  };
}
function irParaRevisaoQuestaoSimulado(i){
  const alvo = document.getElementById("res-q-"+i);
  if(alvo) alvo.scrollIntoView({behavior:"smooth", block:"start"});
}
function revisarErrosDoSimulado(){
  const sessao = state.sessaoAtual; if(!sessao) return;
  const errados = sessao.itens.filter(it=>{
    const q = getQuestao(it.questaoId);
    return q && sessao.respostasSimulado[it.questaoId] !== q.gabarito && !questaoOculta(usuarioAtual().id, it.questaoId);
  }).map(it=>({questaoId:it.questaoId, motivo:"Erro no simulado: "+(sessao.titulo||"")}));
  if(!errados.length){ toast("Você não errou nenhuma questão deste simulado."); return; }
  state.sessaoAtual = null;
  iniciarSessaoComLista(errados, "pratica");
}
function alternarModoAprendizadoSimulado(){
  const sessao = state.sessaoAtual; if(!sessao) return;
  sessao.modoAprendizado = !sessao.modoAprendizado;
  toast(sessao.modoAprendizado ? "Modo aprendizado ativado: a partir de agora você vê a explicação assim que responder." : "Modo aprendizado desativado — voltando ao formato de prova.");
  render();
}
function renderResultadoSimulado(){
  const sessao = state.sessaoAtual;
  const total = sessao.itens.length;
  let acertos = 0;
  const linhas = sessao.itens.map((it,i)=>{
    const q = getQuestao(it.questaoId);
    const resp = sessao.respostasSimulado[it.questaoId];
    const correta = resp===q.gabarito; if(correta) acertos++;
    return {i,q,resp,correta};
  });
  const nota = pct(acertos,total);
  const analiseTempo = analiseTempoSimulado(sessao, linhas);
  const chaveRanking = sessao.simuladoId || sessao.titulo;
  const ranking = estatisticasRankingSimulado(chaveRanking, nota);
  return `
  <div class="card" style="max-width:480px">
    <h2>Resultado do simulado</h2>
    <div class="stat-tile mt-2"><div class="stat-value">${nota}%</div><div class="stat-label">${acertos} de ${total} corretas</div></div>
    <button class="btn btn-primary mt-2" onclick="state.sessaoAtual=null;navigate('simulados')">Voltar aos simulados</button>
  </div>
  ${ranking ? `
  <div class="card mt-2" style="max-width:520px">
    <div class="card-title">Como você se saiu, de forma anônima</div>
    <p class="text-sm muted">${ranking.origem==="turma"
      ? `Comparado às ${ranking.n} tentativas deste simulado feitas pela turma, em qualquer aparelho (sem identificar ninguém).`
      : `Comparado às ${ranking.n} tentativas deste simulado registradas neste navegador (sem identificar ninguém).${nuvemLigada() && !nuvemConectado() ? " Entrando com a sua conta da nuvem, a comparação passa a ser com a turma inteira." : ""}`}</p>
    <div class="grid grid-2 mt-2">
      <div class="stat-tile"><div class="stat-value">Percentil ${ranking.percentil}</div><div class="stat-label">você superou ${ranking.percentil}% das tentativas</div></div>
      <div class="stat-tile"><div class="stat-value">${ranking.mediana}%</div><div class="stat-label">nota mediana (percentil 50)</div></div>
    </div>
    <div class="mt-2">${graficoHistogramaSvg(ranking.buckets, ranking.bucketAtual, ["0-20","21-40","41-60","61-80","81-100"])}</div>
  </div>` : `<div class="card-flat mt-2 text-sm muted" style="max-width:520px">Ainda não há tentativas suficientes deste simulado ${nuvemConectado() ? "na turma" : "neste navegador"} para calcular um percentil (é preciso pelo menos 3).</div>`}
  ${analiseTempo ? `<div class="card mt-2" style="max-width:620px">
    <div class="card-title">Tempo</div>
    <div class="grid grid-3 mt-2">
      <div class="stat-tile"><div class="stat-value">${formatarDuracao(analiseTempo.total)}</div><div class="stat-label">tempo total${sessao.duracaoMin?" (limite de "+sessao.duracaoMin+" min)":""}</div></div>
      <div class="stat-tile"><div class="stat-value">${formatarDuracao(analiseTempo.media)}</div><div class="stat-label">média por questão</div></div>
      <div class="stat-tile"><div class="stat-value">${formatarDuracao(analiseTempo.mediana)}</div><div class="stat-label">tempo mediano por questão</div></div>
    </div>
    ${analiseTempo.lentas.length ? `<div class="mt-2">
      <div class="text-sm" style="font-weight:600">Onde você travou</div>
      <p class="text-xs muted mb-1">Questões que consumiram bem mais tempo que a sua mediana. Travar numa questão que você acertou também conta: numa prova cronometrada, esse tempo sai de outra questão.</p>
      ${analiseTempo.lentas.map(l=>`<div class="flex justify-between items-center card-flat mb-1">
        <span class="text-sm">Questão ${l.i+1} · ${escapeHtml(nomeAssunto(getQuestao(l.qid).assuntoId))} <span class="badge ${l.correta?"badge-accent":"badge-danger"}">${l.correta?"acertou":"errou"}</span></span>
        <span class="flex items-center gap-1"><span class="badge badge-amber">${formatarDuracao(l.seg)}</span><button class="link-btn" onclick="irParaRevisaoQuestaoSimulado(${l.i})">ver</button></span>
      </div>`).join("")}
    </div>` : '<p class="text-xs muted mt-2">Seu ritmo foi parelho: nenhuma questão destoou muito da mediana.</p>'}
  </div>` : ""}
  <div class="card mt-2">
    <div class="card-title mb-1">Mapa de acertos e erros</div>
    <p class="text-sm muted mb-2">Verde = acertou, vermelho = errou, cinza = deixou em branco. Clique num número para pular direto para a revisão daquela questão.</p>
    <div class="flex gap-1" style="flex-wrap:wrap">
      ${linhas.map(l=>`<button class="pill" style="min-width:38px;justify-content:center;${l.resp===undefined?"":l.correta?"background:var(--accent);border-color:var(--accent);color:#fff":"background:var(--danger);border-color:var(--danger);color:#fff"}" onclick="irParaRevisaoQuestaoSimulado(${l.i})" title="${l.resp===undefined?"em branco":(l.correta?"acertou":"errou")}">${l.i+1}</button>`).join("")}
    </div>
    <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
      <button class="btn btn-secondary btn-sm" onclick="revisarErrosDoSimulado()">${iconeSvg("refresh")} Praticar agora só as que errei</button>
      <button class="btn btn-ghost btn-sm" onclick="state.sessaoAtual=null;navigate('historico')">Ver histórico de atividade</button>
    </div>
  </div>
  <div class="mt-3"><div class="card-title mb-1">Revisão questão a questão</div>
  ${linhas.map(l=>`<div class="mb-2" id="res-q-${l.i}"><span class="badge ${l.resp===undefined?"badge-muted":l.correta?"badge-accent":"badge-danger"}">Questão ${l.i+1}: ${l.resp===undefined?"em branco":l.correta?"correta":"incorreta"}</span>${renderQuestionCard(l.q,{selecionada:l.resp, respondida:true})}</div>`).join("")}
  </div>`;
}

/* ==========================================================================
   14. PROVAS ANTIGAS — a aba de provas reais da tela "Provas e Simulados"
   (organizadas por instituição e ano, com filtros)
   ========================================================================== */
function filtrosProvas(){
  if(!state.filtroRota.provas) state.filtroRota.provas = {banca:"", ano:"", areaId:"", ultimos5:false};
  return state.filtroRota.provas;
}
function mudarFiltroProvas(campo, valor){
  const f = filtrosProvas();
  if(campo==="ultimos5"){ f.ultimos5 = !!valor; if(f.ultimos5) f.ano = ""; }
  else f[campo] = valor;
  render();
}
function limparFiltrosProvas(){ state.filtroRota.provas = {banca:"", ano:"", areaId:"", ultimos5:false}; render(); }
function renderProvasAntigas(){ return renderProvasESimulados(); }
function renderAbaProvasAntigas(u){
  const f = filtrosProvas();
  const grupoUsuario = (u.papel==="aluno"||state.modoAluno) ? getGrupoDoUsuario(u).id : true;
  /* Só questão REAL forma prova: a prova antiga é "a prova de verdade, do
     jeito que caiu". As questões autorais (banco didático, demonstração)
     continuam em Estudar > Monte sua própria lista. */
  const todas = questoesAtivas(grupoUsuario).filter(q=>q.real);
  const bancas = [...new Set(todas.map(q=>q.banca))].sort();
  const anosDisponiveis = [...new Set(todas.map(q=>q.ano))].sort((a,b)=>b-a);
  const anoMaisRecente = anosDisponiveis.length ? anosDisponiveis[0] : new Date().getFullYear();

  let pool = todas;
  if(f.banca) pool = pool.filter(q=>q.banca===f.banca);
  if(f.ano) pool = pool.filter(q=>q.ano===parseInt(f.ano));
  if(f.areaId) pool = pool.filter(q=>q.areaId===f.areaId);
  if(f.ultimos5) pool = pool.filter(q=>q.ano > anoMaisRecente-5);

  // agrupa por instituição + ano (uma "prova" é a combinação das duas coisas),
  // na ordem da prova original quando a questão sabe o próprio número
  const mapa = {};
  pool.forEach(q=>{ const chave = q.banca+" ||| "+q.ano; (mapa[chave] = mapa[chave] || {banca:q.banca, ano:q.ano, ids:[], anuladas:[]}).ids.push(q.id); });
  const ordemNaProva = id => { const q = getQuestao(id); return (q && q.numeroNaProva) || 9999; };
  Object.values(mapa).forEach(g => g.ids.sort((a,b)=> ordemNaProva(a)-ordemNaProva(b)));
  /* AS ANULADAS NÃO SOMEM EM SILÊNCIO. Questão anulada não tem gabarito, então
     não entra na prova feita aqui (não teria como ser corrigida) — mas uma
     prova de 100 questões aparecendo com 93, sem explicação, parece prova
     incompleta. O cartão diz quantas são, quais são, e deixa abrir cada uma. */
  db.questoes.forEach(q=>{
    if(q.status!=="anulada" || !q.real) return;
    const g = mapa[q.banca+" ||| "+q.ano]; if(!g) return;
    if(f.areaId && q.areaId!==f.areaId) return;
    g.anuladas.push(q.id);
  });
  Object.values(mapa).forEach(g => g.anuladas.sort((a,b)=> ordemNaProva(a)-ordemNaProva(b)));
  const grupos = Object.values(mapa).sort((a,b)=> b.ano-a.ano || a.banca.localeCompare(b.banca));
  state.filtroRota.provasGrupos = grupos;

  return `
  <p class="text-sm muted mb-2">A prova de verdade de cada instituição, do jeito que caiu. Faça inteira no relógio, para medir onde você está contra a banca, ou sem cronômetro, para estudar com calma.</p>
  <div class="card mb-2">
    <div class="grid grid-4">
      <div class="field" style="margin-bottom:0">
        <label class="label">Instituição</label>
        <select class="select" onchange="mudarFiltroProvas('banca', this.value)">
          <option value="">Todas (${bancas.length})</option>
          ${bancas.map(b=>`<option value="${escapeHtml(b)}" ${f.banca===b?"selected":""}>${escapeHtml(b)}</option>`).join("")}
        </select>
      </div>
      <div class="field" style="margin-bottom:0">
        <label class="label">Ano</label>
        <select class="select" onchange="mudarFiltroProvas('ano', this.value)" ${f.ultimos5?"disabled":""}>
          <option value="">Todos os anos</option>
          ${anosDisponiveis.map(a=>`<option value="${a}" ${String(f.ano)===String(a)?"selected":""}>${a}</option>`).join("")}
        </select>
      </div>
      <div class="field" style="margin-bottom:0">
        <label class="label">Grande área</label>
        <select class="select" onchange="mudarFiltroProvas('areaId', this.value)">
          <option value="">Todas as áreas</option>
          ${db.taxonomia.areas.map(a=>`<option value="${a.id}" ${f.areaId===a.id?"selected":""}>${escapeHtml(a.nome)}</option>`).join("")}
        </select>
      </div>
      <div class="field" style="margin-bottom:0">
        <label class="label">Atalhos</label>
        <label class="checkbox-row mb-1"><input type="checkbox" ${f.ultimos5?"checked":""} onchange="mudarFiltroProvas('ultimos5', this.checked)"> Só os últimos 5 anos (${Math.max(anoMaisRecente-4,0)}–${anoMaisRecente})</label>
        <button class="link-btn text-xs" onclick="limparFiltrosProvas()">limpar filtros</button>
      </div>
    </div>
  </div>
  <p class="text-sm muted mb-2">${grupos.length} prova(s) encontrada(s) · ${pool.length} questão(ões) no total com os filtros atuais.</p>
  <div class="grid grid-3">
    ${grupos.map((g,i)=>{
      const previo = desempenhoPrevioSimulado(null, "Prova "+g.banca+" "+g.ano+" (simulado)");
      const respondidas = g.ids.filter(id=>jaFoiRespondida(u.id, id)).length;
      return `<div class="card prova-card">
        <div class="prova-ano">${g.ano}</div>
        <div class="text-sm prova-banca">${escapeHtml(g.banca)}</div>
        <div class="text-sm muted mb-1">${g.ids.length} questão(ões) · ${respondidas} já respondida(s) por você</div>
        ${g.anuladas.length ? `<div class="text-xs muted mb-1" title="Questões anuladas pela banca não têm gabarito e ficam fora da prova feita aqui">+ ${g.anuladas.length} anulada(s) pela banca, fora da nota: ${g.anuladas.map(id=>{ const q = getQuestao(id); return `<button class="link-btn text-xs" onclick="abrirQuestaoCompleta('${id}')">${q && q.numeroNaProva ? "nº "+q.numeroNaProva : "ver"}</button>`; }).join(", ")}</div>` : ""}
        ${previo ? `<div class="qcard-meta mb-1"><span class="badge ${previo.ultima.nota>=70?"badge-accent":previo.ultima.nota>=50?"badge-amber":"badge-danger"}">já fez como simulado · ${previo.ultima.nota}%</span></div>` : ""}
        <div class="flex gap-1 prova-acoes" style="flex-wrap:wrap">
          <button class="btn btn-primary btn-sm" onclick="fazerProvaComoSimulado(${i})">Fazer como simulado</button>
          <button class="btn btn-secondary btn-sm" onclick="praticarProva(${i})">Praticar sem cronômetro</button>
        </div>
      </div>`;
    }).join("") || '<div class="empty-state">Nenhuma prova encontrada com esses filtros.</div>'}
  </div>`;
}
function grupoDeProva(indice){
  const grupos = state.filtroRota.provasGrupos || [];
  return grupos[indice] || null;
}
function fazerProvaComoSimulado(indice){
  const g = grupoDeProva(indice); if(!g) return;
  const titulo = "Prova "+g.banca+" "+g.ano+" (simulado)";
  state.sessaoAtual = { id:uid("simsessao"), tipo:"simulado", simuladoId:null, titulo,
    itens: g.ids.map(id=>({questaoId:id, motivo:"Prova "+g.banca+" "+g.ano})), indiceAtual:0, respostasSimulado:{},
    duracaoMin: g.ids.length*2, finalizado:false, modoAprendizado:false,
    inicioMs:Date.now(), tsQuestao:Date.now(), tempos:{} };
  navigate("simulado-ativo");
}
function praticarProva(indice){
  const g = grupoDeProva(indice); if(!g) return;
  iniciarSessaoComLista(g.ids.map(id=>({questaoId:id, motivo:"Prática — prova "+g.banca+" "+g.ano})), "pratica");
}
