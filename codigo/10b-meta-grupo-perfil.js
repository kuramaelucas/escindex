/* codigo/10b-meta-grupo-perfil.js — Meta de estudo (18), Meu Grupo (18-B) e integrantes e grupos de estudo (18-C); Perfil e configurações (19) está em 10c.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

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
    ${cabecalhoJanela("Meta diária de questões")}
    <p class="text-sm muted">Quantas questões você quer responder por dia. Vale mais uma meta modesta que você cumpre todo dia do que uma ambiciosa que você abandona na terceira semana.</p>
    <div class="field mt-2"><label class="label">Questões por dia</label><input class="input" type="number" id="metaInput" value="${meta}" min="1" max="500"></div>
    <div class="flex gap-1 mb-2 quebra">
      <button class="pill" onclick="document.getElementById('metaInput').value=${db.configGeral.metaMinimaQuestoesDia}">mínimo (${db.configGeral.metaMinimaQuestoesDia})</button>
      <button class="pill" onclick="document.getElementById('metaInput').value=${db.configGeral.metaRecomendadaQuestoesDia}">ideal (${db.configGeral.metaRecomendadaQuestoesDia})</button>
    </div>
    <p class="text-xs muted">Recomendação da coordenação: mínimo de ${db.configGeral.metaMinimaQuestoesDia}/dia, ideal de ${db.configGeral.metaRecomendadaQuestoesDia}/dia. Hoje você já respondeu ${feitasHoje}.</p>
    <div class="flex gap-1 mt-3 quebra"><button class="btn btn-primary" onclick="salvarMeta()">Salvar meta</button><button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button>${u.metaQuestoesDia?`<button class="btn btn-ghost" onclick="restaurarMetaPadrao('questoes')" title="Volta para a meta recomendada pela coordenação">Restaurar padrão (${db.configGeral.metaRecomendadaQuestoesDia})</button>`:""}</div>`);
}
/* "Resetar" a meta é APAGAR a escolha pessoal, e não gravar o número padrão:
   assim a meta volta a acompanhar a recomendação da coordenação, inclusive
   quando ela mudar. */
function restaurarMetaPadrao(qual){
  const u = usuarioAtual();
  if(qual === "cartoes") delete u.metaCartoesDia; else delete u.metaQuestoesDia;
  saveState();
  fecharModal();
  toast(qual === "cartoes" ? "Meta de cartões restaurada para o padrão." : "Meta de questões restaurada para o padrão.");
  render();
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
    ${cabecalhoJanela("Meta diária de cartões")}
    <p class="text-sm muted">Quantos flashcards você quer revisar por dia. Um cartão leva segundos, então a meta de cartões costuma ser bem maior que a de questões — e serve para segurar a rotina nos dias em que não dá para sentar e resolver prova.</p>
    <div class="field mt-2"><label class="label">Cartões por dia</label><input class="input" type="number" id="metaCartoesInput" value="${meta}" min="1" max="500"></div>
    <div class="flex gap-1 mb-2 quebra">
      <button class="pill" onclick="document.getElementById('metaCartoesInput').value=10">dia corrido (10)</button>
      <button class="pill" onclick="document.getElementById('metaCartoesInput').value=${recomendada}">recomendada (${recomendada})</button>
    </div>
    <p class="text-xs muted">Hoje você já revisou ${feitosHoje} cartão(ões). A meta de cartões não substitui a de questões: elas convivem, e bater qualquer uma das duas já mantém sua sequência daquele tipo de estudo.</p>
    <div class="flex gap-1 mt-3 quebra"><button class="btn btn-primary" onclick="salvarMetaCartoes()">Salvar meta</button><button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button>${u.metaCartoesDia?`<button class="btn btn-ghost" onclick="restaurarMetaPadrao('cartoes')" title="Volta para a meta recomendada">Restaurar padrão (${recomendada})</button>`:""}</div>`);
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
/* O que identifica o grupo, em poucas palavras: "Grupo B" (ou "Começa em
   Cardiologia", onde as letras não existem), "Calendário próprio" ou
   "Sem calendário". */
function rotuloDoGrupo(g, u){
  if(g.oficial) return "Calendário oficial";
  if(grupoComCalendarioProprio(g)) return g.blocosProprios.length ? "Calendário próprio" : "Sem calendário — só divide questões";
  return nomeRodizio(anoDoGrupo(g, u), g.deslocamento);
}
function podeRenomearGrupo(g, u){
  return !!g && !!u && !g.oficial && !g.doRodizio && (g.criadoPor===u.id || podeAdmin("blocos", u));
}
function podeEditarCalendarioDoGrupo(g, u){
  return !!g && !!u && grupoComCalendarioProprio(g) && (g.criadoPor===u.id || podeAdmin("blocos", u));
}
function renderMeuGrupo(){
  const u = usuarioAtual();
  const meuGrupo = getGrupoDoUsuario(u);
  const grupoQ = getGrupoQuestoesDoUsuario(u);
  const souDono = meuGrupo.criadoPor === u.id && !meuGrupo.oficial;
  const semTurma = !!meuGrupo.oficial;
  const proprio = grupoComCalendarioProprio(meuGrupo);
  const anoDaMinhaTurma = anoDoGrupo(meuGrupo, u);
  const formado = !temCalendarioProprio(u.anoFaculdade);
  const anoParaCriar = formado ? CONFIG.anoFaculdadePadrao : u.anoFaculdade;
  const outrosGrupos = db.grupos.filter(g=>g.id!==meuGrupo.id && !g.oficial);
  // os pedidos de TODOS os grupos que a pessoa criou — ela pode estar em outro
  // (criar um grupo tira a pessoa do atual, mas o antigo continua dela)
  const gruposComPedido = gruposQueCriei(u).filter(g=>(g.solicitacoesPendentes||[]).length);
  const totalPedidos = gruposComPedido.reduce((n,g)=>n+g.solicitacoesPendentes.length, 0);
  const nBlocos = blocosDoGrupo(meuGrupo, u).length;
  const detalheCalendario = semTurma ? ""
    : proprio ? `${nBlocos ? nBlocos+" bloco(s) no calendário próprio" : "Sem calendário: o grupo serve para dividir questões"}`
    : `${nBlocos} bloco(s) na sequência de ${escapeHtml(anoDeReferencia(anoDaMinhaTurma))}`;
  return `
  <div class="page-header"><h2>Meu Grupo</h2><p>Um grupo é uma turma de colegas. Ele pode seguir o <strong>rodízio do seu ano</strong> — todas as turmas passam pelos mesmos blocos, e o que muda é por qual bloco cada uma começa —, ter um <strong>calendário próprio</strong>, montado pelo grupo, ou existir só para <strong>dividir questões</strong> entre os membros. Além do grupo do calendário, você pode estar num <strong>segundo grupo, só para compartilhar questões</strong> (ele não muda o seu calendário).</p></div>

  ${semTurma ? `<div class="card mb-2 borda-destaque">
    <div class="card-title">${iconeSvg("users")} ${formado ? "Entre num grupo ou crie o seu" : "Escolha a sua turma"}</div>
    ${formado
      ? `<p class="text-sm">Você está como <strong>${escapeHtml(u.anoFaculdade||"Formado(a)")}</strong>, e quem já se formou não segue um calendário de faculdade. Por isso não há bloco atual para você: a sessão recomendada mistura revisão com questões que você ainda não viu. Num grupo você pode <strong>dividir questões</strong> com os colegas e, se quiserem, <strong>montar um calendário próprio</strong> — é só criar o grupo abaixo, ou entrar num que já exista.</p>`
      : `<p class="text-sm">Você ainda está no <strong>calendário oficial da coordenação</strong>. Ele funciona, mas segue o primeiro grupo do rodízio: se a sua turma é outra, o bloco atual aparece trocado. Escolha abaixo a turma em que você está — ou crie a sua, se ela ainda não existir aqui.</p>
    <div class="flex gap-1 items-end mt-2 quebra">
      <div class="field" style="margin-bottom:0;min-width:240px"><label class="label">O jeito rápido: qual é o seu grupo?</label>
        <select class="select" id="rodizioRapido">${opcoesRodizioPorLetra(u.anoFaculdade).map(o=>`<option value="${o.deslocamento}">${escapeHtml(tituloOpcaoRodizio(o))}</option>`).join("")}</select>
      </div>
      <button class="btn btn-primary" onclick="entrarNaTurmaDoRodizio(document.getElementById('rodizioRapido').value)">Entrar no meu grupo</button>
    </div>`}
    <p class="text-xs muted mt-1">Dá para trocar depois quantas vezes precisar. O grupo do calendário é um só; um segundo grupo, só de questões, você escolhe mais abaixo.</p>
  </div>` : ""}

  <div class="card mb-2">
    <div class="qcard-meta mb-1">${meuGrupo.oficial ? '<span class="badge badge-muted">Calendário oficial — nenhuma turma escolhida</span>' : `<span class="badge badge-accent">${escapeHtml(rotuloDoGrupo(meuGrupo, u))}</span>` + (meuGrupo.doRodizio ? '<span class="badge badge-muted">Turma do rodízio, aberta</span>' : souDono ? '<span class="badge badge-muted">Criado por você</span>' : '<span class="badge badge-muted">Criado por outro aluno</span>')}</div>
    <div class="flex justify-between items-center quebra-gap">
      <div style="font-weight:700;font-size:var(--fs-lg)">${escapeHtml(meuGrupo.nome)}</div>
      ${podeRenomearGrupo(meuGrupo, u) ? `<button class="btn btn-secondary btn-sm" onclick="abrirRenomearGrupo('${meuGrupo.id}')">${iconeSvg("edit")} Mudar o nome do grupo</button>` : ""}
    </div>
    <div class="text-sm muted mt-1">${detalheCalendario}${!meuGrupo.oficial?" · "+((meuGrupo.membrosAprovados||[]).length)+" membro(s)":""}.</div>
    ${formado && !proprio ? `<div class="text-xs muted mt-1">Você está marcado como <strong>${escapeHtml(u.anoFaculdade||"Formado(a)")}</strong>: ${meuGrupo.oficial ? "não há calendário de formado, então não existe bloco atual para você." : "o calendário que você acompanha é o do ano desta turma."}</div>` : ""}
    ${!semTurma ? `<div class="flex gap-1 mt-2 quebra"><button class="btn btn-ghost btn-sm" onclick="sairDoMeuGrupo()">Sair deste grupo${formado ? "" : " e voltar ao calendário oficial"}</button>
      ${!meuGrupo.doRodizio ? `<button class="btn btn-ghost btn-sm" onclick="passarGrupoParaSoQuestoes()" title="Libera o calendário para você escolher a turma do rodízio e continua neste grupo só para questões">Passar este grupo para só questões</button>` : ""}
      ${podeExcluirGrupo(meuGrupo, u) ? `<button class="btn btn-ghost btn-sm" onclick="excluirGrupo('${meuGrupo.id}')">${iconeSvg("trash")} Excluir grupo</button>` : ""}</div>` : ""}
  </div>

  ${grupoQ ? `<div class="card mb-2 borda-destaque">
    <div class="qcard-meta mb-1"><span class="badge badge-accent">Grupo só de questões</span>${grupoQ.criadoPor===u.id ? '<span class="badge badge-muted">Criado por você</span>' : ""}</div>
    <div style="font-weight:700;font-size:var(--fs-lg)">${escapeHtml(grupoQ.nome)}</div>
    <div class="text-sm muted mt-1">Este grupo só compartilha questões, divisão de questões e grupos de estudo: o seu calendário continua sendo o de <strong>${escapeHtml(meuGrupo.oficial ? "coordenação" : meuGrupo.nome)}</strong> · ${(grupoQ.membrosAprovados||[]).length} membro(s).</div>
    <div class="flex gap-1 mt-2 quebra">
      ${podeRenomearGrupo(grupoQ, u) ? `<button class="btn btn-secondary btn-sm" onclick="abrirRenomearGrupo('${grupoQ.id}')">${iconeSvg("edit")} Mudar o nome</button>` : ""}
      <button class="btn btn-ghost btn-sm" onclick="sairDoGrupoDeQuestoesPelaTela()">Sair deste grupo</button>
      ${podeExcluirGrupo(grupoQ, u) ? `<button class="btn btn-ghost btn-sm" onclick="excluirGrupo('${grupoQ.id}')">${iconeSvg("trash")} Excluir grupo</button>` : ""}
    </div>
  </div>` : ""}

  ${gruposComPedido.length ? `<div class="card mb-2 borda-alerta">
    <div class="card-title">${iconeSvg("users")} Pedidos para entrar no grupo (${totalPedidos})</div>
    <p class="text-sm muted">Essas pessoas pediram para entrar ${gruposComPedido.length>1?"nos seus grupos":"no seu grupo"}. Só entram depois que você aprovar.</p>
    ${gruposComPedido.map(g=>`${gruposComPedido.length>1 ? `<div class="text-xs muted mt-1 mb-1">${escapeHtml(g.nome)}</div>` : ""}${g.solicitacoesPendentes.map(uidSolicitante=>`<div class="flex justify-between items-center card-flat mb-1">
        <span class="text-sm">${escapeHtml(nomeDoMembro(g, uidSolicitante))}</span>
        <div class="flex gap-1"><button class="btn btn-primary btn-sm" onclick="aprovarAcessoGrupo('${g.id}','${uidSolicitante}')">Aprovar</button><button class="btn btn-ghost btn-sm" onclick="rejeitarAcessoGrupo('${g.id}','${uidSolicitante}')">Rejeitar</button></div>
      </div>`).join("")}`).join("")}
  </div>` : ""}
  ${gruposQueCriei(u).length ? renderCardAvisoPedidosDeGrupo() : ""}

  ${proprio ? `<div class="card mb-2">
    <div class="card-title">Calendário deste grupo</div>
    ${renderCalendarioProprio(meuGrupo, podeEditarCalendarioDoGrupo(meuGrupo, u))}
  </div>` : (semTurma && formado) ? "" : `<div class="card mb-2">
    <div class="card-title">Calendário desta turma</div>
    ${renderEditorCalendario(meuGrupo, {podeEditar: souDono, usuario: u, podeEditarSequencia: podeAdmin("blocos")})}
    ${!souDono && !semTurma ? '<p class="text-xs muted mt-1">Só quem criou a turma muda o grupo do rodízio. Se estiver errado, avise o dono da turma ou a coordenação.</p>' : ""}
    <p class="text-xs muted mt-1">A ordem dos blocos é a do seu ano e é definida pela coordenação — o que a turma escolhe é por qual deles entra.</p>
  </div>`}

  ${renderMeusEstagios(u, meuGrupo)}

  ${gruposDoUsuario(u).map(g=>`${gruposDoUsuario(u).length>1 ? `<h3 class="mt-2 mb-1">${escapeHtml(g.nome)} <span class="text-xs muted">${g.id===meuGrupo.id ? "grupo do calendário" : "grupo só de questões"}</span></h3>` : ""}
    ${renderIntegrantesDoGrupo(g)}
    ${renderQuestoesDoGrupo(g)}
    ${renderSubgruposDoGrupo(g)}`).join("")}

  <div class="card mb-2">
    <div class="card-title">${semTurma ? "Criar o meu grupo" : "Criar outro grupo"}</div>
    <p class="text-sm muted">Escolha como o grupo funciona. Quem pedir para entrar precisa da sua aprovação, e criar um grupo do calendário faz você sair do atual; um grupo só de questões não mexe no seu calendário.</p>
    <div class="field mt-1" style="max-width:520px"><label class="label">Tipo de grupo</label>
      <select class="select" id="novoGrupoTipo" onchange="alternarTipoNovoGrupo()">
        ${formado ? "" : `<option value="rodizio">Segue o rodízio de ${escapeHtml(anoParaCriar)} — entra por um bloco da sequência</option>`}
        <option value="proprio">Calendário próprio — eu monto os blocos (ou deixo sem, só para dividir questões)</option>
        ${semTurma && formado ? "" : `<option value="questoes">Só para compartilhar questões — não muda o meu calendário</option>`}
      </select>
    </div>
    <div class="flex gap-1 items-end mt-1 quebra">
      <div class="field" style="margin-bottom:0;min-width:240px"><label class="label" id="novoGrupoNomeRotulo">${formado ? "Nome do grupo" : "Nome do grupo (opcional)"}</label><input class="input" id="novoGrupoNome" placeholder="${formado ? "Ex.: Residência 2027 — R1" : "Deixe em branco para usar o bloco de início"}"></div>
      <div class="field" id="novoGrupoRodizioCampo" style="margin-bottom:0;min-width:200px;${formado ? "display:none" : ""}"><label class="label">Grupo do rodízio</label>
        <select class="select" id="novoGrupoRodizio">
          ${opcoesRodizioPorLetra(anoParaCriar).map(o=>`<option value="${o.deslocamento}">${escapeHtml(tituloOpcaoRodizio(o))}</option>`).join("")}
        </select>
      </div>
      <button class="btn btn-primary" onclick="criarMeuGrupo()">Criar grupo</button>
    </div>
    <p class="text-xs muted mt-1">No rodízio, o grupo segue a sequência de blocos de ${escapeHtml(anoParaCriar)} — é assim que duas turmas do mesmo ano estudam matérias diferentes na mesma semana. Sem nome, o grupo é identificado pelo bloco em que começa.</p>
  </div>

  <div class="card">
    <div class="card-title">Entrar em um grupo já existente</div>
    ${outrosGrupos.length ? outrosGrupos.map(g=>{
      const souMembro = g.doRodizio || g.criadoPor===u.id || (g.membrosAprovados||[]).includes(u.id);
      const ehMeuQuestoes = !!grupoQ && grupoQ.id===g.id;
      const aceitaSoQuestoes = !g.doRodizio && !ehMeuQuestoes;
      const jaSolicitei = (g.solicitacoesPendentes||[]).includes(u.id);
      const proprioG = grupoComCalendarioProprio(g);
      const anoG = anoDoGrupo(g, u);
      const atualG = blocoAtualDoGrupo(g, u);
      const criador = g.doRodizio ? "turma do rodízio, aberta a todos" : "criada por "+escapeHtml(nomeDoMembro(g, g.criadoPor));
      // o bloco por onde o grupo do rodízio começa: é o que o identifica
      // quando o nome é só a letra (ou nem letra tem)
      const inicio = proprioG ? null : blocosDoGrupo(g, u)[0];
      return `
      <div class="flex justify-between items-center mb-1 card-flat quebra-gap">
        <div>
          <div class="peso-600">${escapeHtml(g.nome)} <span class="badge badge-accent">${escapeHtml(rotuloDoGrupo(g, u))}</span></div>
          <div class="text-xs muted">${proprioG ? "calendário próprio · "+g.blocosProprios.length+" bloco(s)" : escapeHtml(anoG)+(inicio ? " · começa em "+escapeHtml(inicio.nome) : "")} · hoje em ${escapeHtml(atualG?atualG.nome:"—")} · ${criador}</div>
        </div>
        <div class="flex gap-1 quebra">
        ${souMembro ? `<button class="btn btn-secondary btn-sm" onclick="usarGrupo('${g.id}')" title="Calendário e questões do grupo">Entrar neste grupo</button>${aceitaSoQuestoes ? `<button class="btn btn-ghost btn-sm" onclick="usarGrupo('${g.id}', true)" title="Só compartilha questões; seu calendário não muda">Só questões</button>` : ""}` :
          jaSolicitei ? `<button class="btn btn-secondary btn-sm" disabled>Solicitação enviada</button>` :
          `<button class="btn btn-secondary btn-sm" onclick="solicitarAcessoGrupo('${g.id}')">Pedir para entrar</button><button class="btn btn-ghost btn-sm" onclick="solicitarAcessoGrupo('${g.id}', true)" title="Só compartilha questões; seu calendário não muda">Só questões</button>`}
        ${podeExcluirGrupo(g, u) ? `<button class="icon-btn" title="Excluir grupo" aria-label="Excluir grupo ${escapeHtml(g.nome)}" onclick="excluirGrupo('${g.id}')">${iconeSvg("trash")}</button>` : ""}
        </div>
      </div>`;
    }).join("") : '<p class="text-sm muted">Nenhum grupo criado ainda. Crie o seu acima.</p>'}
  </div>
  <div class="card-flat mt-2 text-xs muted">${nuvemConectado() ? "Com a sua conta na nuvem, o grupo, os pedidos de entrada, os grupos de estudo, as questões e os cartões compartilhados chegam aos colegas em qualquer aparelho." : "Sem conta na nuvem, os grupos ficam só neste navegador: um grupo criado aqui só aparece para quem abrir a plataforma neste mesmo computador. Entre com a sua conta (Perfil e configurações) para compartilhar com os colegas."}</div>
  `;
}
/* No formulário de criação, o campo do rodízio só faz sentido para o grupo que
   segue o rodízio; o nome é opcional só nele (o grupo sem nome é identificado
   pelo bloco de início, e o de calendário próprio não tem bloco de início). */
function alternarTipoNovoGrupo(){
  const proprio = document.getElementById("novoGrupoTipo").value !== "rodizio";
  const campo = document.getElementById("novoGrupoRodizioCampo");
  if(campo) campo.style.display = proprio ? "none" : "";
  const rotulo = document.getElementById("novoGrupoNomeRotulo");
  if(rotulo) rotulo.textContent = proprio ? "Nome do grupo" : "Nome do grupo (opcional)";
}
/* O nome que o grupo ganha quando ninguém dá um: o ano e o grupo do rodízio
   ("4º ano — Começa em Cardiologia"), que é justamente o que o distingue. */
function nomeAutomaticoDoGrupo(ano, deslocamento){
  return ano + " — " + nomeRodizio(ano, deslocamento);
}
function criarMeuGrupo(){
  const u = usuarioAtual();
  const formado = !temCalendarioProprio(u.anoFaculdade);
  const campoTipo = document.getElementById("novoGrupoTipo");
  const soQuestoes = !!campoTipo && campoTipo.value === "questoes";
  const proprio = soQuestoes || formado || (campoTipo && campoTipo.value === "proprio");
  const nomeDigitado = document.getElementById("novoGrupoNome").value.trim();
  if(proprio && !nomeDigitado){ toast("Dê um nome para o grupo.", "err"); return; }
  const base = { id:uid("grupo"), criadoPor:u.id, criadoPorNome:u.nome, oficial:false, publico:true, criadoEm:hojeISO(),
                 blocoAtualIdManual:null, membrosAprovados:[], solicitacoesPendentes:[] };
  let novo;
  if(proprio){
    // calendário próprio: começa sem blocos (serve para dividir questões) e o
    // dono acrescenta os blocos quando quiser
    novo = { ...base, nome:nomeDigitado, anoFaculdade:null, deslocamento:0, blocosProprios:[] };
  }else{
    // o grupo herda a sequência do ano de quem cria e escolhe só em qual grupo
    // do rodízio entra — o bloco por onde começa a sequência
    const ano = u.anoFaculdade;
    const campoRodizio = document.getElementById("novoGrupoRodizio");
    const deslocamento = campoRodizio ? (parseInt(campoRodizio.value)||0) : 0;
    novo = { ...base, nome: nomeDigitado || nomeAutomaticoDoGrupo(ano, deslocamento), nomeAutomatico: !nomeDigitado,
             anoFaculdade: ano, deslocamento };
  }
  db.grupos.push(novo);
  entrarNoGrupo(u, novo.id, { soQuestoes, manterAtual: !soQuestoes && oferecerManterGrupoAtualComoDeQuestoes(u, novo.id) });
  saveState();
  toast('Grupo criado — ' + rotuloDoGrupo(novo, u) + '.');
  render();
}
/* MUDAR O NOME. Só de grupo criado por alguém (as turmas do rodízio são
   recriadas pelo id em qualquer aparelho, com o nome de sempre) e só pelo
   dono ou pela coordenação. Nome em branco volta ao nome automático — o do
   bloco de início —, exceto no grupo de calendário próprio, que não tem
   bloco de início para servir de nome. */
function abrirRenomearGrupo(grupoId){
  const g = getGrupo(grupoId);
  if(!podeRenomearGrupo(g, usuarioAtual())){ toast("Só quem criou o grupo (ou a coordenação) muda o nome.", "err"); return; }
  const proprio = grupoComCalendarioProprio(g);
  abrirModal(`${cabecalhoJanela("Mudar o nome do grupo")}
    <div class="field"><label class="label">Nome do grupo</label><input class="input" id="renomearGrupoNome" value="${escapeHtml(g.nome)}" maxlength="80" onkeydown="if(event.key==='Enter')salvarNomeDoGrupo('${g.id}')">
      <div class="hint mt-1">${proprio ? "O nome aparece para todos os membros." : "Em branco, o grupo volta a se chamar pelo bloco em que começa."}</div></div>
    <div class="flex gap-1 mt-2"><button class="btn btn-primary" onclick="salvarNomeDoGrupo('${g.id}')">Salvar</button><button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button></div>`);
  setTimeout(()=>{ const c = document.getElementById("renomearGrupoNome"); if(c) c.focus(); }, 50);
}
function salvarNomeDoGrupo(grupoId){
  const g = getGrupo(grupoId);
  if(!podeRenomearGrupo(g, usuarioAtual())) return;
  const nome = document.getElementById("renomearGrupoNome").value.trim();
  if(!nome && grupoComCalendarioProprio(g)){ toast("Dê um nome para o grupo.", "err"); return; }
  g.nome = nome || nomeAutomaticoDoGrupo(anoDoGrupo(g), g.deslocamento);
  g.nomeAutomatico = !nome;
  saveState();
  fecharModal();
  toast('O grupo agora se chama "'+g.nome+'".');
  render();
}
function usarGrupo(grupoId, soQuestoes){
  const g = getGrupo(grupoId); if(!g) return;
  const u = usuarioAtual();
  if(!g.oficial && !g.doRodizio && g.criadoPor!==u.id && !(g.membrosAprovados||[]).includes(u.id)){
    toast("Você ainda não faz parte deste grupo — peça para entrar.", "err"); return;
  }
  entrarNoGrupo(u, grupoId, { soQuestoes, manterAtual: !soQuestoes && oferecerManterGrupoAtualComoDeQuestoes(u, grupoId) });
  saveState();
  toast(soQuestoes ? 'Você entrou em "'+g.nome+'" só para compartilhar questões — o calendário não mudou.' : 'Agora você está em "'+g.nome+'" ('+rotuloDoGrupo(g, u)+').');
  render();
}
/* ---------- calendário próprio do grupo ------------------------------------
   Os blocos de um grupo com calendário próprio são só dele: nome, datas e as
   especialidades trabalhadas — o que o "bloco atual" da pessoa precisa para
   a sessão recomendada saber o que estudar. Não passam pela sequência do ano
   nem pelo rodízio. Quem cria o grupo (ou a coordenação) edita. */
function renderCalendarioProprio(grupo, podeEditar){
  const blocos = blocosDoGrupo(grupo);
  const atual = blocoAtualDoGrupo(grupo);
  return `
  <div class="card-flat mb-2 text-sm">${iconeSvg("calendar")} <strong>Calendário próprio</strong> — ${blocos.length} bloco(s), montados por ${podeEditar ? "você" : "quem criou o grupo"}. Não segue o rodízio de nenhum ano: cada bloco tem as próprias datas e o conteúdo do bloco atual é o que a sessão recomendada traz.</div>
  ${podeEditar ? `<div class="flex gap-1 mb-2 quebra"><button class="btn btn-primary btn-sm" onclick="abrirFormularioBlocoProprio('${grupo.id}', null)">${iconeSvg("plus")} Adicionar bloco</button></div>` : ""}
  ${blocos.map(b=>`
    <div class="card mb-1" ${atual&&b.id===atual.id?'style="border-color:var(--accent)"':""}>
      <div class="flex justify-between items-start">
        <div>
          ${atual&&b.id===atual.id?'<span class="badge badge-accent mb-1">Bloco atual</span>':""}
          <div class="peso-700">${b.ordem}. ${escapeHtml(b.nome)}</div>
          <div class="text-sm muted mt-1">${formatDataBR(b.dataInicio)} – ${formatDataBR(b.dataFim)}</div>
          <div class="text-xs muted mt-1">${b.especialidadeIds.map(id=>escapeHtml(nomeEspecialidade(id))).join(", ")}</div>
        </div>
        ${podeEditar ? `<div class="flex gap-1">
          <button class="icon-btn" title="Editar" onclick="abrirFormularioBlocoProprio('${grupo.id}','${b.id}')">${iconeSvg("edit")}</button>
          <button class="icon-btn" title="Excluir" onclick="excluirBlocoProprio('${grupo.id}','${b.id}')">${iconeSvg("trash")}</button>
        </div>` : ""}
      </div>
    </div>`).join("") || `<p class="text-sm muted">Este grupo ainda não tem blocos. Sem blocos ele serve só para dividir questões${podeEditar ? " — adicione blocos para os membros terem um bloco atual e uma sessão recomendada por assunto" : ""}.</p>`}`;
}
function abrirFormularioBlocoProprio(grupoId, blocoId){
  const g = getGrupo(grupoId);
  if(!podeEditarCalendarioDoGrupo(g, usuarioAtual())){ toast("Só quem criou o grupo (ou a coordenação) muda o calendário.", "err"); return; }
  const b = blocoId ? g.blocosProprios.find(x=>x.id===blocoId) : null;
  abrirModal(`
    ${cabecalhoJanela(`${b?"Editar bloco":"Adicionar bloco"} — ${escapeHtml(g.nome)}`)}
    <p class="text-sm muted mb-2">Este bloco vale só para o grupo <strong>${escapeHtml(g.nome)}</strong>.</p>
    <div class="field"><label class="label">Nome do bloco</label><input class="input" id="fbpNome" value="${escapeHtml(b?b.nome:"")}" placeholder="Ex.: Cirurgia geral"></div>
    <div class="grid grid-2">
      <div class="field"><label class="label">Data de início</label><input class="input" type="date" id="fbpInicio" value="${b?b.dataInicio:""}"></div>
      <div class="field"><label class="label">Data de fim</label><input class="input" type="date" id="fbpFim" value="${b?b.dataFim:""}"></div>
    </div>
    <div class="field"><label class="label">Especialidades trabalhadas neste bloco</label>${htmlEscolhaEspecialidades(b?b.especialidadeIds:[], "fbpEsp")}</div>
    <div class="flex gap-1 mt-1"><button class="btn btn-primary" onclick="salvarBlocoProprio('${g.id}','${blocoId||""}')">Salvar</button><button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button></div>
  `, "lg");
}
function salvarBlocoProprio(grupoId, blocoId){
  const g = getGrupo(grupoId);
  if(!podeEditarCalendarioDoGrupo(g, usuarioAtual())) return;
  const nome = document.getElementById("fbpNome").value.trim();
  const dataInicio = document.getElementById("fbpInicio").value;
  const dataFim = document.getElementById("fbpFim").value;
  const especialidadeIds = [...document.querySelectorAll(".fbpEsp:checked")].map(el=>el.value);
  if(!nome || !dataInicio || !dataFim){ toast("Preencha nome, data de início e data de fim.", "err"); return; }
  if(dataFim < dataInicio){ toast("A data de fim não pode ser antes da data de início.", "err"); return; }
  if(!especialidadeIds.length){ toast("Selecione ao menos uma especialidade para este bloco.", "err"); return; }
  const alvo = blocoId ? g.blocosProprios.find(x=>x.id===blocoId) : null;
  if(alvo) Object.assign(alvo, {nome, dataInicio, dataFim, especialidadeIds});
  else g.blocosProprios.push({id:uid("blocop"), nome, dataInicio, dataFim, especialidadeIds});
  // o bloco fixado à mão pode ter deixado de existir; a detecção por data volta
  if(g.blocoAtualIdManual && !g.blocosProprios.some(x=>x.id===g.blocoAtualIdManual)) g.blocoAtualIdManual = null;
  saveState();
  fecharModal();
  toast(alvo ? "Bloco atualizado." : "Bloco adicionado ao calendário do grupo.");
  render();
}
function excluirBlocoProprio(grupoId, blocoId){
  const g = getGrupo(grupoId);
  if(!podeEditarCalendarioDoGrupo(g, usuarioAtual())) return;
  const b = g.blocosProprios.find(x=>x.id===blocoId); if(!b) return;
  abrirModalTitulado("Excluir bloco", `<p class="text-sm">Remove <strong>${escapeHtml(b.nome)}</strong> do calendário do grupo, para todos os membros. Não dá para desfazer.</p>
    <div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="excluirBlocoProprioConfirmado('${grupoId}','${blocoId}')">Excluir mesmo assim</button><button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button></div>`);
}
function excluirBlocoProprioConfirmado(grupoId, blocoId){
  const g = getGrupo(grupoId);
  if(!podeEditarCalendarioDoGrupo(g, usuarioAtual())) return;
  g.blocosProprios = g.blocosProprios.filter(x=>x.id!==blocoId);
  if(g.blocoAtualIdManual===blocoId) g.blocoAtualIdManual = null;
  saveState();
  fecharModal();
  toast("Bloco excluído do calendário do grupo.");
  render();
}
/* MEUS ESTÁGIOS. Nos períodos que se dividem em estágios (6º ano), a ordem
   dentro do período é da pessoa: ela reordena aqui sem sair do grupo do
   rodízio (ver ordemDosEstagios, seção 3). As datas de cada estágio andam
   junto, porque o tempo do período é repartido igualmente na ordem em que
   eles estão. */
function renderMeusEstagios(u, grupo){
  const blocos = blocosDoGrupo(grupo, u).filter(b => subdivisoesDoBloco(b).length > 1);
  if(!blocos.length) return "";
  return `<div class="card mb-2">
    <div class="card-title">${iconeSvg("calendar")} Meus estágios</div>
    <p class="text-sm muted">Dentro de cada período, você cumpre os estágios na ordem que for a sua. Reordene aqui e o resto da plataforma passa a mostrar o seu estágio de hoje. <strong>Você continua no mesmo grupo</strong>: a mudança é só sua e não altera a turma nem os colegas.</p>
    ${blocos.map(b => {
      const partes = subdivisoesComDatas(b);
      const proprio = !!(u.ordemEstagios && u.ordemEstagios[b.id]);
      const ref = JSON.stringify(b.id).replace(/"/g, "&quot;");
      return `<div class="card-flat mt-2">
        <div class="flex justify-between items-center quebra-gap">
          <div class="peso-700">${escapeHtml(b.nome)} <span class="text-sm muted peso-400">${formatDataBR(b.dataInicio)} – ${formatDataBR(b.dataFim)}</span></div>
          ${proprio ? `<button class="btn btn-ghost btn-sm" onclick="restaurarOrdemDosEstagios(${ref})">Voltar à ordem da turma</button>` : '<span class="badge badge-muted">ordem da turma</span>'}
        </div>
        <div class="flex items-center gap-1 mt-1 quebra">
          <label class="text-sm" for="comecar-${escapeHtml(b.id)}">Começar por:</label>
          <select class="select" id="comecar-${escapeHtml(b.id)}" style="max-width:340px" onchange="comecarEstagioPor(${ref}, this.value)">
            ${partes.map((pt, i) => `<option value="${escapeHtml(pt.nome)}" ${i===0?"selected":""}>${escapeHtml(pt.nome)}</option>`).join("")}
          </select>
        </div>
        ${partes.map((pt, i) => `<div class="flex justify-between items-center mt-1 gap-1">
          <span class="text-sm">${i+1}. ${escapeHtml(pt.nome)}${pt.dataInicio ? ` <span class="muted">(${formatDataBR(pt.dataInicio)} – ${formatDataBR(pt.dataFim)})</span>` : ""}</span>
          <span class="flex gap-1">
            <button class="icon-btn" title="Fazer este estágio antes" ${i===0?"disabled":""} onclick="moverEstagioPessoal(${ref}, ${i}, -1)">${iconeSvg("arrow-up")}</button>
            <button class="icon-btn" title="Fazer este estágio depois" ${i===partes.length-1?"disabled":""} onclick="moverEstagioPessoal(${ref}, ${i}, 1)">${iconeSvg("arrow-down")}</button>
          </span>
        </div>`).join("")}
      </div>`;
    }).join("")}
  </div>`;
}
function moverEstagioPessoal(blocoId, indice, delta){
  const u = usuarioAtual(); if(!u) return;
  const bloco = blocosDoGrupo(getGrupoDoUsuario(u), u).find(b => b.id === blocoId); if(!bloco) return;
  const nomes = subdivisoesDoBloco(bloco).slice();
  const destino = indice + delta;
  if(destino < 0 || destino >= nomes.length) return;
  [nomes[indice], nomes[destino]] = [nomes[destino], nomes[indice]];
  guardarOrdemDosEstagios(u, blocoId, nomes);
}
/* "Começar por" gira a lista: o estágio escolhido vai para o primeiro lugar e
   os outros seguem na ordem em que estavam, dando a volta (Neonatal primeiro:
   Neonatal, Emergências, Enfermaria). É o caso de quem só quer trocar por onde
   entra, sem reordenar um a um com as setas. */
function comecarEstagioPor(blocoId, nome){
  const u = usuarioAtual(); if(!u) return;
  const bloco = blocosDoGrupo(getGrupoDoUsuario(u), u).find(b => b.id === blocoId); if(!bloco) return;
  const nomes = subdivisoesDoBloco(bloco);
  const i = nomes.indexOf(nome);
  if(i < 0) return;
  if(i > 0) guardarOrdemDosEstagios(u, blocoId, nomes.slice(i).concat(nomes.slice(0, i)));
}
function restaurarOrdemDosEstagios(blocoId){
  const u = usuarioAtual(); if(!u) return;
  guardarOrdemDosEstagios(u, blocoId, null);
  toast("Os estágios voltaram à ordem da turma.");
}
/* Guardar a mesma ordem da coordenação é o mesmo que não ter ordem própria:
   a chave sai, para o perfil não carregar (e a nuvem não sincronizar) nada
   que não muda coisa alguma. */
function guardarOrdemDosEstagios(u, blocoId, nomes){
  const original = (sequenciaDoAno(anoDeReferencia(anoDoGrupo(getGrupoDoUsuario(u), u))).find(b => b.id === blocoId) || {}).subdivisoes || [];
  if(!u.ordemEstagios) u.ordemEstagios = {};
  if(!nomes || JSON.stringify(nomes) === JSON.stringify(original)) delete u.ordemEstagios[blocoId];
  else u.ordemEstagios[blocoId] = nomes;
  saveState();
  render();
}
/* TROCAR DE CALENDÁRIO SEM PERDER O GRUPO. O grupo do calendário ocupa a única
   vaga de calendário; ao escolher outro (a turma do rodízio, por exemplo), o
   anterior saía. Se ele não é uma turma do rodízio e a pessoa ainda não tem
   grupo de questões, pergunta se quer ficar nele só para questões — é assim
   que se participa de dois grupos: um com calendário e outro de questões. */
function oferecerManterGrupoAtualComoDeQuestoes(u, destinoId){
  const atual = getGrupoDoUsuario(u);
  if(atual.oficial || atual.doRodizio || atual.id === destinoId || getGrupoQuestoesDoUsuario(u)) return false;
  return confirm('Você está em "'+atual.nome+'". Quer continuar nele só para compartilhar questões? (OK = continuar como grupo de questões; Cancelar = sair dele.)');
}
function passarGrupoParaSoQuestoes(){
  const u = usuarioAtual();
  const g = getGrupoDoUsuario(u);
  if(g.oficial || g.doRodizio) return;
  const antigo = getGrupoQuestoesDoUsuario(u);
  if(antigo && !confirm('Seu grupo só de questões atual é "'+antigo.nome+'" e você sairia dele. Continuar?')) return;
  if(antigo) sairDoGrupoDeQuestoes(u);
  u.grupoQuestoesId = g.id;
  u.grupoId = db.grupoOficialId;
  saveState();
  toast('"'+g.nome+'" agora é o seu grupo só de questões. Escolha o grupo do calendário abaixo.');
  render();
}
function entrarNaTurmaDoRodizio(deslocamento){
  const u = usuarioAtual();
  const ano = temCalendarioProprio(u.anoFaculdade) ? u.anoFaculdade : CONFIG.anoFaculdadePadrao;
  const turma = turmaDoRodizio(ano, deslocamento);
  if(!turma){ toast("Não encontrei esse grupo no calendário de "+ano+".", "err"); return; }
  entrarNoGrupo(u, turma.id, { manterAtual: oferecerManterGrupoAtualComoDeQuestoes(u, turma.id) });
  saveState();
  toast("Agora você está em: " + nomeRodizio(ano, turma.deslocamento) + " (" + ano + ").");
  render();
}
/* Sair da turma é voltar ao calendário oficial — nunca ficar sem calendário
   nenhum, o que deixaria a tela Estudar sem bloco atual. */
function sairDoMeuGrupo(){
  const u = usuarioAtual();
  const atual = getGrupoDoUsuario(u);
  if(podeExcluirGrupo(atual, u) && atual.criadoPor===u.id){ excluirGrupo(atual.id, true); return; }
  entrarNoGrupo(u, db.grupoOficialId);
  saveState();
  toast("Você voltou ao calendário oficial da coordenação.");
  render();
}
function sairDoGrupoDeQuestoesPelaTela(){
  const u = usuarioAtual();
  const g = getGrupoQuestoesDoUsuario(u); if(!g) return;
  if(podeExcluirGrupo(g, u) && g.criadoPor===u.id){ excluirGrupo(g.id, true); return; }
  sairDoGrupoDeQuestoes(u);
  saveState();
  toast('Você saiu de "'+g.nome+'". O seu calendário não mudou.');
  render();
}
/* EXCLUIR UM GRUPO. Quem criou o grupo (ou a coordenação) pode apagá-lo; e
   quem criou NÃO consegue só "sair" dele: o grupo ficaria sem dono, com
   gente dentro que ninguém aprova nem retira. Sair, para o dono, é excluir —
   com o aviso de quantas pessoas ficam sem o grupo. A turma do rodízio não se
   exclui (ela é recriada pelo id em qualquer aparelho). Com a nuvem, a
   exclusão sobe como `removido` (nuvemConferirGrupos) e o grupo some dos
   outros aparelhos; as questões enviadas para ele continuam guardadas, mas
   deixam de aparecer para quem estudava com elas. */
function podeExcluirGrupo(g, u){ return podeGerirGrupo(g, u) && !g.doRodizio; }
function excluirGrupo(grupoId, aoSair){
  const g = getGrupo(grupoId), u = usuarioAtual();
  if(!podeExcluirGrupo(g, u)){ toast("Só quem criou o grupo (ou a coordenação) pode excluí-lo.", "err"); return; }
  const outros = membrosDoGrupo(g).filter(m=>m.id!==u.id).length;
  const nQ = questoesDoGrupo(g).length;
  if(!confirm((aoSair ? "Você criou o grupo \""+g.nome+"\", então sair dele é excluí-lo. " : "")+"Excluir o grupo \""+g.nome+"\"?"
    + (outros ? " "+outros+" "+(outros>1?"pessoas perdem":"pessoa perde")+" o acesso" : " Ninguém mais está nele")
    + (nQ ? ", e as "+nQ+" questão(ões) enviadas para ele deixam de aparecer" : "")
    + ". Isso não pode ser desfeito.")) return;
  if(grupoDeNuvem(g) && nuvemConectado()){
    if(!db.nuvem.gruposRemovidos) db.nuvem.gruposRemovidos = {};
    db.nuvem.gruposRemovidos[g.id] = { n: g.nome || "", c: g.criadoPor, cn: g.criadoPorNome || "" };
    nuvemMarcarNoInicio("grupos", g.id);
    nuvemAgendarSync();
  }
  removerGrupoDoNavegador(g.id);
  saveState();
  toast('Grupo "'+g.nome+'" excluído.');
  render();
}
/* Tira o grupo do navegador e solta quem estava nele (calendário oficial,
   sem grupo de questões). Serve tanto para quem exclui quanto para quem
   recebe a exclusão pela nuvem. */
function removerGrupoDoNavegador(grupoId){
  db.grupos = db.grupos.filter(x => x.id !== grupoId);
  db.subgrupos = (db.subgrupos || []).filter(s => s.grupoId !== grupoId);
  db.usuarios.forEach(x => {
    if(x.grupoId === grupoId) x.grupoId = db.grupoOficialId;
    if(x.grupoQuestoesId === grupoId) delete x.grupoQuestoesId;
  });
}
function solicitarAcessoGrupo(grupoId, soQuestoes){
  const g = getGrupo(grupoId); if(!g) return;
  const u = usuarioAtual();
  if(!u.pedidoSoQuestoes) u.pedidoSoQuestoes = {};
  if(soQuestoes) u.pedidoSoQuestoes[grupoId] = true; else delete u.pedidoSoQuestoes[grupoId];
  if(!g.solicitacoesPendentes) g.solicitacoesPendentes = [];
  if(!g.solicitacoesPendentes.includes(u.id)) g.solicitacoesPendentes.push(u.id);
  saveState();
  toast("Pedido enviado! Assim que "+(g.criadoPor ? nomeDoMembro(g, g.criadoPor) : "o dono da turma")+" aprovar, você entra nela.");
  render();
}
function aprovarAcessoGrupo(grupoId, usuarioId){
  const g = getGrupo(grupoId); if(!g) return;
  const solicitante = getUsuario(usuarioId);
  if(solicitante){
    const soQuestoes = !!(solicitante.pedidoSoQuestoes && solicitante.pedidoSoQuestoes[grupoId]);
    if(solicitante.pedidoSoQuestoes) delete solicitante.pedidoSoQuestoes[grupoId];
    entrarNoGrupo(solicitante, grupoId, { soQuestoes });
  }
  else{
    // com a nuvem, quem pediu é de outro navegador: entra na lista do grupo, e a nuvem avisa a pessoa
    g.solicitacoesPendentes = (g.solicitacoesPendentes||[]).filter(id=>id!==usuarioId);
    if(!g.membrosAprovados) g.membrosAprovados = [];
    if(!g.membrosAprovados.includes(usuarioId)) g.membrosAprovados.push(usuarioId);
  }
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
/* AVISO DE PEDIDO PARA ENTRAR NO GRUPO. O pedido existia, mas só aparecia
   para quem abrisse Meu Grupo por acaso — e o colega ficava esperando. Agora
   quem criou o grupo é avisado como a coordenação é avisada dos cadastros
   (seção 2-C): um aviso na tela, o número ao lado de Meu Grupo no menu, a
   notificação no Início e, se a pessoa deixar, a notificação do sistema com
   o Esc aberto em outra aba. Com a nuvem, o pedido chega junto com a
   sincronização; aqui só se confere o que já está no navegador.
   "Já avisado" fica por pessoa (u.pedidosGrupoAvisados, só os pedidos ainda
   abertos), para o mesmo pedido não avisar de novo a cada F5. */
function pedidosDeEntradaNoGrupo(u){
  return gruposQueCriei(u).flatMap(g=>(g.solicitacoesPendentes||[]).map(id=>({
    chave: g.id+"|"+id, grupoId: g.id, grupoNome: g.nome, usuarioId: id, nome: nomeDoMembro(g, id) })));
}
function quantosPedidosDeEntradaNoGrupo(u){ return u ? pedidosDeEntradaNoGrupo(u).length : 0; }
function checarPedidosDeEntradaNoGrupo(){
  const u = usuarioAtual(); if(!u) return;
  const pedidos = pedidosDeEntradaNoGrupo(u);
  const avisados = new Set(u.pedidosGrupoAvisados || []);
  const novos = pedidos.filter(p=>!avisados.has(p.chave));
  const agora = pedidos.map(p=>p.chave);
  if(JSON.stringify(agora) !== JSON.stringify(u.pedidosGrupoAvisados || [])){ u.pedidosGrupoAvisados = agora; saveState(); }
  atualizarMenuLateral();
  if(!novos.length) return;
  // não redesenha por cima de quem está digitando (o nome de um grupo novo, por exemplo)
  const tag = (document.activeElement||{}).tagName;
  if((state.route==="meu-grupo" || state.route==="inicio") && !["INPUT","TEXTAREA","SELECT"].includes(tag)) render();
  const texto = novos.length===1
    ? novos[0].nome+" pediu para entrar no grupo \""+novos[0].grupoNome+"\"."
    : novos.length+" pessoas pediram para entrar nos seus grupos.";
  toast(texto+" Veja em Meu Grupo.");
  if(document.hidden && !u.avisoPedidosGrupoDesligado && notificacaoDisponivel() && Notification.permission==="granted"){
    mostrarNotificacao(CONFIG.nomePlataforma+" — pedido para entrar no grupo", texto, "meu-grupo", "pedido-de-grupo");
  }
}
function ativarNotificacaoPedidosDeGrupo(){
  if(!notificacaoDisponivel()){ toast("Este navegador não mostra notificações do sistema. O aviso continua na tela e no menu.", "err"); return; }
  Notification.requestPermission().then(perm=>{
    const u = usuarioAtual();
    if(perm==="granted"){ delete u.avisoPedidosGrupoDesligado; saveState(); toast("Pronto: com o Esc aberto em outra aba ou janela, um pedido para entrar no grupo também aparece como notificação."); }
    else toast("O navegador não deu permissão para notificações. O aviso continua na tela e no menu.", "err");
    render();
  });
}
function desativarNotificacaoPedidosDeGrupo(){
  const u = usuarioAtual(); u.avisoPedidosGrupoDesligado = true; saveState();
  toast("Notificação do sistema desligada. O aviso na tela e o número no menu continuam.");
  render();
}
function renderCardAvisoPedidosDeGrupo(){
  const u = usuarioAtual();
  const ligado = notificacaoDisponivel() && Notification.permission==="granted" && !u.avisoPedidosGrupoDesligado;
  return `<div class="card-flat mb-2 text-sm">
    ${iconeSvg("alert")} Quando alguém pedir para entrar no seu grupo, o Esc avisa na tela e mostra o número ao lado de <strong>Meu Grupo</strong> no menu.
    ${!notificacaoDisponivel() ? "" : ligado
      ? `<div class="mt-1">${iconeSvg("check")} Notificação do sistema <strong>ligada</strong>. <button class="link-btn" onclick="desativarNotificacaoPedidosDeGrupo()">Desligar</button></div>`
      : `<div class="mt-1"><button class="btn btn-secondary btn-sm" onclick="ativarNotificacaoPedidosDeGrupo()">Receber também como notificação do sistema</button></div>`}
  </div>`;
}
/* DIVIDIR AS QUESTÕES DO GRUPO. Um grupo estuda junto, mas ninguém precisa
   fazer tudo: o dono divide as questões entre os membros — a mesma
   quantidade para cada um, misturando os assuntos — e cada pessoa pratica só
   a sua parte ("Minha parte"). Guardado no próprio grupo (`divisao`: id da
   questão → id de quem fica com ela). Questão que entra depois fica sem
   responsável até uma nova divisão. */
/* Com a nuvem, o navegador de cada pessoa só conhece o próprio cadastro: o
   nome dos colegas vem na linha de membro e fica em g.nomesMembros. */
function nomeDoMembro(grupo, id){
  const u = getUsuario(id);
  return (u && u.nome) || (grupo && grupo.nomesMembros && grupo.nomesMembros[id]) || (grupo && grupo.criadoPor === id && grupo.criadoPorNome) || "Colega";
}
function membrosDoGrupo(grupo){
  const ids = [...new Set([grupo.criadoPor, ...(grupo.membrosAprovados||[])].filter(Boolean))];
  return ids.map(id => getUsuario(id) || { id, nome: nomeDoMembro(grupo, id), papel: "aluno" }).sort((a,b)=>a.nome.localeCompare(b.nome, "pt-BR"));
}
// o responsável só vale enquanto ainda é membro: quem saiu deixa a questão sem dono
function responsavelDaQuestao(grupo, questaoId){
  const id = grupo.divisao && grupo.divisao[questaoId];
  return id ? membrosDoGrupo(grupo).find(m=>m.id===id) || null : null;
}
function questoesDoGrupo(grupo){ return db.questoes.filter(q=>q.grupoId===grupo.id); }
function minhaParteDoGrupo(grupo, usuarioId){
  return questoesDoGrupo(grupo).filter(q=>q.status==="ativa" && grupo.divisao && grupo.divisao[q.id]===usuarioId && responsavelDaQuestao(grupo, q.id));
}
function podeDividirQuestoesDoGrupo(grupo, u){
  return !!u && !grupo.oficial && (grupo.criadoPor===u.id || grupo.doRodizio || podeAdmin("blocos", u));
}
/* Ordenadas por assunto e distribuídas em rodízio: cada pessoa recebe uma
   amostra de todos os assuntos, e não um assunto inteiro só para ela. Serve à
   turma inteira e aos grupos de estudo (18-C). Devolve id da questão → id de quem fica com ela. */
function dividirEntreMembros(questoes, membros){
  const divisao = {};
  questoes.slice().sort((a,b)=>(a.assuntoId||"").localeCompare(b.assuntoId||"") || a.id.localeCompare(b.id))
    .forEach((q,i)=>{ divisao[q.id] = membros[i % membros.length].id; });
  return divisao;
}
function dividirQuestoesDoGrupo(grupoId){
  const g = getGrupo(grupoId);
  if(!g || !podeDividirQuestoesDoGrupo(g, usuarioAtual())) return;
  const membros = membrosDoGrupo(g);
  const questoes = questoesDoGrupo(g);
  if(membros.length < 2){ toast("Precisa de pelo menos dois membros para dividir as questões.", "err"); return; }
  if(!questoes.length){ toast("O grupo ainda não tem questões para dividir.", "err"); return; }
  g.divisao = dividirEntreMembros(questoes, membros);
  saveState();
  toast(questoes.length+" questão(ões) divididas entre "+membros.length+" membros.");
  render();
}
function desfazerDivisaoDoGrupo(grupoId){
  const g = getGrupo(grupoId);
  if(!g || !podeDividirQuestoesDoGrupo(g, usuarioAtual())) return;
  delete g.divisao;
  saveState();
  toast("Divisão desfeita: as questões ficam sem responsável.");
  render();
}
function praticarMinhaParteDoGrupo(grupoId){
  const g = getGrupo(grupoId); if(!g) return;
  const minhas = minhaParteDoGrupo(g, usuarioAtual().id);
  if(!minhas.length){ toast("Você não tem questões nesta divisão.", "err"); return; }
  iniciarSessaoComLista(minhas.map(q=>({questaoId:q.id, motivo:"Minha parte das questões do grupo"})), "pratica");
}
function renderQuestoesDoGrupo(grupo){
  const u = usuarioAtual();
  const questoes = questoesDoGrupo(grupo);
  const pagGrupo = paginar(questoes, "questoes-grupo", {porPagina:20});
  const dividida = !!grupo.divisao && Object.keys(grupo.divisao).length > 0;
  const minhas = minhaParteDoGrupo(grupo, u.id);
  const podeDividir = podeDividirQuestoesDoGrupo(grupo, u);
  const membros = membrosDoGrupo(grupo);
  return `<div class="card mb-2">
    <div class="flex justify-between items-center mb-1 quebra-gap">
      <div class="card-title sem-mb">Questões deste grupo (${questoes.length})</div>
      <div class="flex gap-1 quebra">
        <button class="btn btn-secondary btn-sm" onclick="navigate('importar-questoes')">${iconeSvg("upload")} Colar prova inteira / importar em lote</button>
        <button class="btn btn-primary btn-sm" onclick="abrirFormularioQuestao(null)">${iconeSvg("plus")} Adicionar questão</button>
      </div>
    </div>
    <p class="text-sm muted">Qualquer pessoa do grupo pode contribuir. Essas questões ficam disponíveis só pra quem está neste grupo — em "Estudar &gt; Monte sua lista", marque "incluir questões do meu grupo" pra praticá-las.</p>
    <div class="card-flat mt-2 text-sm">
      <strong>Dividir as questões entre os membros:</strong> cada pessoa fica com uma parte do mesmo tamanho, misturando os assuntos, e pratica só a sua.
      ${dividida ? `<div class="mt-1">${minhas.length ? `Você ficou com <strong>${minhas.length}</strong> questão(ões).` : "Você não ficou com nenhuma questão nesta divisão."}</div>` : `<div class="mt-1 muted">Ainda não foi dividido.</div>`}
      <div class="flex gap-1 mt-2 quebra">
        ${minhas.length ? `<button class="btn btn-primary btn-sm" onclick="praticarMinhaParteDoGrupo('${grupo.id}')">${iconeSvg("book")} Praticar minha parte (${minhas.length})</button>` : ""}
        ${podeDividir ? `<button class="btn btn-secondary btn-sm" onclick="dividirQuestoesDoGrupo('${grupo.id}')" ${membros.length<2||!questoes.length?"disabled":""}>${iconeSvg("users")} ${dividida ? "Dividir de novo" : "Dividir entre os "+membros.length+" membros"}</button>` : ""}
        ${podeDividir && dividida ? `<button class="btn btn-ghost btn-sm" onclick="desfazerDivisaoDoGrupo('${grupo.id}')">Desfazer a divisão</button>` : ""}
      </div>
      ${membros.length<2 ? `<div class="text-xs muted mt-1">Com um membro só não há o que dividir — convide os colegas para o grupo.</div>` : ""}
    </div>
    <div class="card-flat mt-2 text-sm">
      <strong>Prova inteira de uma vez:</strong> em "Enviar Questões" você informa a instituição e o ano uma única vez, copia o prompt pronto, cola numa IA junto com o PDF da prova e traz o resultado de volta. Escolha o destino <em>"Questões do meu grupo"</em> para elas caírem direto aqui.
      <div class="flex gap-1 mt-2 quebra">
        <button class="btn btn-secondary btn-sm" onclick="navigate('importar-questoes')">${iconeSvg("search")} Abrir tela com o prompt pronto</button>
        <button class="btn btn-ghost btn-sm" onclick="copiarTexto(gerarPromptImportacao(),'Prompt copiado! Cole numa IA junto com a prova.')">Copiar prompt agora</button>
      </div>
    </div>
    ${questoes.length ? `<div class="table-wrap mt-2"><table><thead><tr><th>Questão</th><th>Assunto</th>${dividida?"<th>Responsável</th>":""}<th></th></tr></thead><tbody>
      ${pagGrupo.itens.map(q=>{
        const resp = responsavelDaQuestao(grupo, q.id);
        return `<tr><td class="text-sm"><span class="enunciado-clicavel" onclick="abrirQuestaoCompleta('${q.id}')">${escapeHtml(q.enunciado.slice(0,90))}…</span></td><td class="text-sm">${escapeHtml(nomeAssunto(q.assuntoId))}</td>${dividida?`<td class="text-sm">${resp ? escapeHtml(resp.id===u.id ? "Você" : resp.nome) : '<span class="muted">sem responsável</span>'}</td>`:""}<td class="flex gap-1"><button class="icon-btn" title="Ver na íntegra" onclick="abrirQuestaoCompleta('${q.id}')">${iconeSvg("search")}</button><button class="icon-btn" title="Editar" onclick="abrirFormularioQuestao('${q.id}')">${iconeSvg("edit")}</button></td></tr>`;
      }).join("")}
    </tbody></table></div>
    ${controlesPaginacao(pagGrupo, "questão(ões) do grupo")}` : '<p class="text-sm muted mt-1">Nenhuma questão adicionada ainda.</p>'}
  </div>`;
}

/* ==========================================================================
   18-C. INTEGRANTES E GRUPOS DE ESTUDO (subgrupos)
   ==========================================================================
   O grupo (turma) é um só por pessoa e decide o calendário. Mas dividir um
   conjunto de questões nem sempre é com a turma inteira: dois colegas
   fazendo a lista que subiram, um trio para o simulado de sábado. Por isso,
   dentro do grupo, qualquer integrante cria GRUPOS DE ESTUDO: escolhe quem
   participa (só quem já é do grupo), quais questões do grupo entram — por
   prova (instituição e ano), já que é assim que elas chegam no envio em lote
   — e a plataforma divide entre os participantes, como na turma inteira.

   Um grupo de estudo não muda calendário nem tira ninguém da turma: é uma
   etiqueta sobre questões que já existem. Fica no navegador, como os grupos
   (ver o aviso no fim de Meu Grupo). Guardado em db.subgrupos:
   { id, grupoId, nome, criadoPor, membros, questaoIds, divisao }. */
function rotuloPapelNoGrupo(grupo, usuario){
  if(grupo.criadoPor === usuario.id) return "criou o grupo";
  return ({ professor: "Professor", admin: "Administrador", residente: "Residente" })[usuario.papel] || "";
}
function podeGerirGrupo(g, u){ return !!g && !!u && !g.oficial && (g.criadoPor===u.id || podeAdmin("blocos", u)); }
function gruposQueCriei(u){ return (db.grupos||[]).filter(g=>!g.oficial && g.criadoPor===u.id); }
function renderIntegrantesDoGrupo(grupo){
  const u = usuarioAtual();
  const membros = membrosDoGrupo(grupo);
  const gerente = podeGerirGrupo(grupo, u);
  return `<div class="card mb-2">
    <div class="card-title">${iconeSvg("users")} Integrantes do grupo (${membros.length})</div>
    <div class="flex gap-1 mt-1 quebra">
      ${membros.map(m=>`<span class="badge ${m.id===u.id?"badge-accent":"badge-muted"}" title="${escapeHtml(rotuloPapelNoGrupo(grupo, m))}">${escapeHtml(m.id===u.id ? m.nome+" (você)" : m.nome)}${grupo.criadoPor===m.id?" ★":""}${gerente && m.id!==u.id && m.id!==grupo.criadoPor ? ` <button class="link-btn" style="font-size:1em;line-height:1" title="Retirar ${escapeHtml(m.nome)} do grupo" aria-label="Retirar ${escapeHtml(m.nome)} do grupo" onclick="retirarDoGrupo('${grupo.id}','${m.id}')">×</button>` : ""}</span>`).join("") || '<span class="text-sm muted">Ninguém ainda.</span>'}
    </div>
    <p class="text-xs muted mt-1">★ = quem criou o grupo. ${gerente ? "Quem criou o grupo pode retirar um integrante no <strong>×</strong>: a pessoa volta ao calendário oficial e, para voltar, precisa pedir de novo. " : ""}${membros.length<2 ? "Convide os colegas: eles pedem para entrar em \"Entrar em um grupo já existente\" e o dono aprova." : "Com os integrantes à vista, dá para montar um grupo de estudo menor logo abaixo."}</p>
  </div>`;
}
/* RETIRAR ALGUÉM DO GRUPO. Só quem criou o grupo (ou a coordenação, que já
   administra os grupos); nunca o próprio dono. A pessoa volta ao calendário
   oficial, sai dos grupos de estudo daqui e as questões que eram dela nas
   divisões passam, em rodízio, para quem ficou — sem mexer na parte dos
   outros. Com a nuvem, a saída sobe como a recusa de um pedido
   (nuvemConferirGrupos) e o aparelho da pessoa se ajusta ao descer. */
function repassarQuestoesDe(divisao, usuarioId, restantes){
  if(!divisao) return;
  Object.keys(divisao).filter(q=>divisao[q]===usuarioId).forEach((q,i)=>{
    if(restantes.length) divisao[q] = restantes[i % restantes.length].id; else delete divisao[q];
  });
}
function retirarDoGrupo(grupoId, usuarioId){
  const g = getGrupo(grupoId), u = usuarioAtual();
  if(!podeGerirGrupo(g, u) || usuarioId===g.criadoPor || usuarioId===u.id) return;
  const nome = nomeDoMembro(g, usuarioId);
  if(!confirm("Retirar "+nome+" do grupo \""+g.nome+"\"? A pessoa volta ao calendário oficial e perde o acesso às questões e aos cartões do grupo; para voltar, precisa pedir de novo.")) return;
  g.membrosAprovados = (g.membrosAprovados||[]).filter(id=>id!==usuarioId);
  g.solicitacoesPendentes = (g.solicitacoesPendentes||[]).filter(id=>id!==usuarioId);
  const restantes = membrosDoGrupo(g);
  repassarQuestoesDe(g.divisao, usuarioId, restantes);
  subgruposDoGrupo(g).forEach(sg=>{
    sg.membros = (sg.membros||[]).filter(id=>id!==usuarioId);
    repassarQuestoesDe(sg.divisao, usuarioId, membrosDoSubgrupo(sg));
  });
  const local = getUsuario(usuarioId);
  if(local && local.grupoId===g.id) entrarNoGrupo(local, db.grupoOficialId);
  if(local && local.grupoQuestoesId===g.id) delete local.grupoQuestoesId;
  saveState();
  toast(nome+" foi retirado(a) do grupo.");
  render();
}
function subgruposDoGrupo(grupo){ return (db.subgrupos||[]).filter(s=>s.grupoId===grupo.id); }
function getSubgrupo(id){ return (db.subgrupos||[]).find(s=>s.id===id) || null; }
// só conta quem ainda é da turma: quem saiu dela sai do grupo de estudo sem ninguém precisar editar
function membrosDoSubgrupo(sg){
  const pai = getGrupo(sg.grupoId);
  const daTurma = new Map((pai ? membrosDoGrupo(pai) : []).map(m=>[m.id, m]));
  return (sg.membros||[]).filter(id=>daTurma.has(id)).map(id=>daTurma.get(id)).sort((a,b)=>a.nome.localeCompare(b.nome, "pt-BR"));
}
function questoesDoSubgrupo(sg){ const ids = new Set(sg.questaoIds||[]); return db.questoes.filter(q=>ids.has(q.id)); }
function minhaParteDoSubgrupo(sg, usuarioId){
  const sou = membrosDoSubgrupo(sg).some(m=>m.id===usuarioId);
  return sou ? questoesDoSubgrupo(sg).filter(q=>q.status==="ativa" && sg.divisao && sg.divisao[q.id]===usuarioId) : [];
}
function podeGerirSubgrupo(sg, u){ return !!u && (sg.criadoPor===u.id || podeAdmin("blocos", u)); }
/* As questões do grupo, agrupadas pela prova de onde vieram (instituição e
   ano): cada grupo de questões é uma opção marcável ao criar o grupo de estudo. */
function conjuntosDeQuestoesDoGrupo(grupo){
  const mapa = {};
  questoesDoGrupo(grupo).forEach(q=>{
    const chave = q.banca ? q.banca+" "+(q.ano ? anoDaProva(q) : "") : "Questões avulsas";
    (mapa[chave] = mapa[chave] || {chave, ids:[]}).ids.push(q.id);
  });
  return Object.values(mapa).sort((a,b)=>a.chave.localeCompare(b.chave, "pt-BR"));
}
function renderSubgruposDoGrupo(grupo){
  const u = usuarioAtual();
  const lista = subgruposDoGrupo(grupo);
  return `<div class="card mb-2">
    <div class="flex justify-between items-center mb-1 quebra-gap">
      <div class="card-title sem-mb">${iconeSvg("users")} Grupos de estudo dentro deste grupo (${lista.length})</div>
      <button class="btn btn-primary btn-sm" onclick="abrirFormularioSubgrupo(null, '${grupo.id}')">${iconeSvg("plus")} Criar grupo de estudo</button>
    </div>
    <p class="text-sm muted">Para dividir questões com só parte da turma — por exemplo, a lista que você enviou ou uma prova inteira. Você escolhe quem participa e quais questões entram, e cada pessoa pratica a sua parte. Não muda o seu calendário nem tira ninguém do grupo.</p>
    ${lista.map(sg=>{
      const membros = membrosDoSubgrupo(sg);
      const questoes = questoesDoSubgrupo(sg);
      const minhas = minhaParteDoSubgrupo(sg, u.id);
      const gerente = podeGerirSubgrupo(sg, u);
      const souMembro = membros.some(m=>m.id===u.id);
      const dividido = !!sg.divisao && Object.keys(sg.divisao).length > 0;
      return `<div class="card-flat mt-2">
        <div class="flex justify-between items-center quebra-gap">
          <div><div class="peso-700">${escapeHtml(sg.nome)}</div>
            <div class="text-xs muted">${questoes.length} questão(ões) · criado por ${escapeHtml(nomeDoMembro(grupo, sg.criadoPor))}</div></div>
          <div class="flex gap-1 quebra">
            ${minhas.length ? `<button class="btn btn-primary btn-sm" onclick="praticarMinhaParteDoSubgrupo('${sg.id}')">${iconeSvg("book")} Praticar minha parte (${minhas.length})</button>` : ""}
            ${gerente ? `<button class="btn btn-secondary btn-sm" onclick="abrirFormularioSubgrupo('${sg.id}', '${grupo.id}')">${iconeSvg("edit")} Editar</button>` : ""}
            ${souMembro && !gerente ? `<button class="btn btn-ghost btn-sm" onclick="sairDoSubgrupo('${sg.id}')">Sair</button>` : ""}
            ${gerente ? `<button class="btn btn-ghost btn-sm" onclick="excluirSubgrupo('${sg.id}')">${iconeSvg("trash")}</button>` : ""}
          </div>
        </div>
        <div class="flex gap-1 mt-1 quebra">${membros.map(m=>{
          const n = dividido ? questoes.filter(q=>sg.divisao[q.id]===m.id).length : 0;
          const retirar = gerente && m.id!==u.id ? ` <button class="link-btn" style="font-size:1em;line-height:1" title="Retirar ${escapeHtml(m.nome)} deste grupo de estudo" aria-label="Retirar ${escapeHtml(m.nome)} deste grupo de estudo" onclick="retirarDoSubgrupo('${sg.id}','${m.id}')">×</button>` : "";
          return `<span class="badge ${m.id===u.id?"badge-accent":"badge-muted"}">${escapeHtml(m.id===u.id?"Você":m.nome)}${dividido?" · "+n:""}${retirar}</span>`;
        }).join("")}</div>
        ${gerente && membros.length>1 ? `<div class="text-xs muted mt-1">Para tirar alguém deste grupo de estudo, use o <strong>×</strong> ao lado do nome — ela continua na turma.</div>` : ""}
        ${!souMembro ? `<div class="text-xs muted mt-1">Você não participa deste grupo de estudo.</div>` : dividido && !minhas.length ? `<div class="text-xs muted mt-1">Você não ficou com nenhuma questão nesta divisão.</div>` : ""}
      </div>`;
    }).join("") || '<p class="text-sm muted mt-2">Nenhum grupo de estudo ainda.</p>'}
  </div>`;
}
function abrirFormularioSubgrupo(id, grupoId){
  const u = usuarioAtual();
  const sg = id ? getSubgrupo(id) : null;
  const grupo = getGrupo(sg ? sg.grupoId : grupoId) || getGrupoDoUsuario(u);
  if(sg && !podeGerirSubgrupo(sg, u)){ toast("Só quem criou o grupo de estudo pode editá-lo.", "err"); return; }
  const membros = membrosDoGrupo(grupo);
  const conjuntos = conjuntosDeQuestoesDoGrupo(grupo);
  const marcadosM = new Set(sg ? sg.membros : [u.id]);
  const marcadosQ = new Set(sg ? sg.questaoIds : []);
  abrirModal(`
    ${cabecalhoJanela(sg ? "Editar grupo de estudo" : "Criar grupo de estudo")}
    <div class="field"><label class="label">Nome</label><input class="input" id="sgNome" value="${escapeHtml(sg?sg.nome:"")}" placeholder="Ex.: Lista de cardiologia — dupla A"></div>
    <div class="label mb-1">Quem participa <span class="muted">(da sua turma)</span></div>
    <div style="max-height:150px;overflow-y:auto">${membros.map(m=>`<label class="checkbox-row mb-1"><input type="checkbox" class="sgMembro" value="${m.id}" ${marcadosM.has(m.id)?"checked":""}> ${escapeHtml(m.nome)}${m.id===u.id?" (você)":""}</label>`).join("")}</div>
    <div class="label mb-1 mt-2">Quais questões entram <span class="muted">(do grupo, por prova)</span></div>
    ${conjuntos.length ? `<div style="max-height:170px;overflow-y:auto">${conjuntos.map(c=>`<label class="checkbox-row mb-1"><input type="checkbox" class="sgConjunto" value="${escapeHtml(c.chave)}" ${c.ids.every(i=>marcadosQ.has(i))?"checked":""}> ${escapeHtml(c.chave)} <span class="text-xs muted">(${c.ids.length})</span></label>`).join("")}</div>`
      : `<p class="text-sm muted">O grupo ainda não tem questões. Envie uma prova ou lista em <button class="link-btn" onclick="fecharModal(); navigate('importar-questoes')">Enviar Questões</button> (destino "Questões do meu grupo") e volte aqui.</p>`}
    <p class="text-xs muted mt-1">As questões são divididas entre quem participa, na mesma quantidade e misturando os assuntos. Ao salvar, a divisão é refeita.</p>
    <div class="flex gap-1 mt-2"><button class="btn btn-primary" onclick="salvarSubgrupo('${id||""}', '${grupo.id}')">Salvar</button><button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button></div>`);
}
function salvarSubgrupo(id, grupoId){
  const u = usuarioAtual();
  const grupo = getGrupo(grupoId) || getGrupoDoUsuario(u);
  const nome = (document.getElementById("sgNome").value||"").trim();
  const membrosIds = [...document.querySelectorAll(".sgMembro:checked")].map(el=>el.value);
  const chaves = new Set([...document.querySelectorAll(".sgConjunto:checked")].map(el=>el.value));
  const questaoIds = conjuntosDeQuestoesDoGrupo(grupo).filter(c=>chaves.has(c.chave)).flatMap(c=>c.ids);
  if(!nome){ toast("Dê um nome ao grupo de estudo.", "err"); return; }
  if(!membrosIds.length){ toast("Escolha quem participa.", "err"); return; }
  if(!questaoIds.length){ toast("Escolha ao menos uma prova do grupo.", "err"); return; }
  let sg = id ? getSubgrupo(id) : null;
  if(id && !sg) return;
  if(sg && !podeGerirSubgrupo(sg, u)) return;
  if(!sg){
    sg = { id: uid("sg"), grupoId: grupo.id, criadoPor: u.id, criadoEm: hojeISO() };
    db.subgrupos.push(sg);
  }
  Object.assign(sg, { nome, membros: membrosIds, questaoIds });
  const participantes = membrosDoSubgrupo(sg);
  sg.divisao = participantes.length ? dividirEntreMembros(questoesDoSubgrupo(sg).filter(q=>q.status==="ativa"), participantes) : {};
  saveState();
  fecharModal();
  toast(participantes.length>1 ? "Grupo de estudo salvo: "+questaoIds.length+" questão(ões) divididas entre "+participantes.length+"." : "Grupo de estudo salvo. Com uma pessoa só não há o que dividir — fique com todas as questões.");
  render();
}
function sairDoSubgrupo(id){
  const sg = getSubgrupo(id), u = usuarioAtual(); if(!sg) return;
  sg.membros = (sg.membros||[]).filter(x=>x!==u.id);
  if(sg.divisao) Object.keys(sg.divisao).forEach(q=>{ if(sg.divisao[q]===u.id) delete sg.divisao[q]; });
  saveState();
  toast("Você saiu do grupo de estudo. As questões que eram suas ficam sem responsável até o criador refazer a divisão.");
  render();
}
/* O criador tira um participante do grupo de estudo (ele continua na turma).
   As questões que eram da pessoa passam, em rodízio, para quem ficou — a
   parte dos outros não muda; refazer tudo é o "Editar". */
function retirarDoSubgrupo(id, usuarioId){
  const sg = getSubgrupo(id), u = usuarioAtual();
  if(!sg || !podeGerirSubgrupo(sg, u) || usuarioId===u.id) return;
  const grupo = getGrupo(sg.grupoId);
  const nome = nomeDoMembro(grupo, usuarioId);
  if(!confirm("Retirar "+nome+" do grupo de estudo \""+sg.nome+"\"? Ela continua na turma; as questões dela passam para quem ficou.")) return;
  sg.membros = (sg.membros||[]).filter(x=>x!==usuarioId);
  repassarQuestoesDe(sg.divisao, usuarioId, membrosDoSubgrupo(sg));
  saveState();
  toast(nome+" foi retirado(a) do grupo de estudo.");
  render();
}
function excluirSubgrupo(id){
  const sg = getSubgrupo(id); if(!sg || !podeGerirSubgrupo(sg, usuarioAtual())) return;
  if(!confirm("Excluir o grupo de estudo \""+sg.nome+"\"? As questões continuam no grupo; só some a divisão.")) return;
  db.subgrupos = db.subgrupos.filter(s=>s.id!==id);
  saveState();
  toast("Grupo de estudo excluído.");
  render();
}
function praticarMinhaParteDoSubgrupo(id){
  const sg = getSubgrupo(id); if(!sg) return;
  const minhas = minhaParteDoSubgrupo(sg, usuarioAtual().id);
  if(!minhas.length){ toast("Você não tem questões nesta divisão.", "err"); return; }
  iniciarSessaoComLista(minhas.map(q=>({questaoId:q.id, motivo:"Minha parte — "+sg.nome})), "pratica");
}
