/* codigo/10b-meta-grupo-perfil.js — Meta de estudo (18), Meu Grupo (18-B) e Perfil e configurações, com "Seus dados" (19).
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
    ${cabecalhoJanela("Meta diária de cartões")}
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
  const souDono = meuGrupo.criadoPor === u.id && !meuGrupo.oficial;
  const semTurma = !!meuGrupo.oficial;
  const proprio = grupoComCalendarioProprio(meuGrupo);
  const anoDaMinhaTurma = anoDoGrupo(meuGrupo, u);
  const formado = !temCalendarioProprio(u.anoFaculdade);
  const anoParaCriar = formado ? CONFIG.anoFaculdadePadrao : u.anoFaculdade;
  const outrosGrupos = db.grupos.filter(g=>g.id!==meuGrupo.id && !g.oficial);
  const solicitacoesPendentes = souDono ? (meuGrupo.solicitacoesPendentes||[]) : [];
  const nBlocos = blocosDoGrupo(meuGrupo, u).length;
  const detalheCalendario = semTurma ? ""
    : proprio ? `${nBlocos ? nBlocos+" bloco(s) no calendário próprio" : "Sem calendário: o grupo serve para dividir questões"}`
    : `${nBlocos} bloco(s) na sequência de ${escapeHtml(anoDeReferencia(anoDaMinhaTurma))}`;
  return `
  <div class="page-header"><h2>Meu Grupo</h2><p>Um grupo é uma turma de colegas. Ele pode seguir o <strong>rodízio do seu ano</strong> — todas as turmas passam pelos mesmos blocos, e o que muda é por qual bloco cada uma começa —, ter um <strong>calendário próprio</strong>, montado pelo grupo, ou existir só para <strong>dividir questões</strong> entre os membros.</p></div>

  ${semTurma ? `<div class="card mb-2" style="border-color:var(--accent)">
    <div class="card-title">${iconeSvg("users")} ${formado ? "Entre num grupo ou crie o seu" : "Escolha a sua turma"}</div>
    ${formado
      ? `<p class="text-sm">Você está como <strong>${escapeHtml(u.anoFaculdade||"Formado(a)")}</strong>, e quem já se formou não segue um calendário de faculdade. Por isso não há bloco atual para você: a sessão recomendada mistura revisão com questões que você ainda não viu. Num grupo você pode <strong>dividir questões</strong> com os colegas e, se quiserem, <strong>montar um calendário próprio</strong> — é só criar o grupo abaixo, ou entrar num que já exista.</p>`
      : `<p class="text-sm">Você ainda está no <strong>calendário oficial da coordenação</strong>. Ele funciona, mas segue o primeiro grupo do rodízio: se a sua turma é outra, o bloco atual aparece trocado. Escolha abaixo a turma em que você está — ou crie a sua, se ela ainda não existir aqui.</p>
    <div class="flex gap-1 items-end mt-2" style="flex-wrap:wrap">
      <div class="field" style="margin-bottom:0;min-width:240px"><label class="label">O jeito rápido: qual é o seu grupo?</label>
        <select class="select" id="rodizioRapido">${opcoesRodizioPorLetra(u.anoFaculdade).map(o=>`<option value="${o.deslocamento}">${escapeHtml(tituloOpcaoRodizio(o))}</option>`).join("")}</select>
      </div>
      <button class="btn btn-primary" onclick="entrarNaTurmaDoRodizio(document.getElementById('rodizioRapido').value)">Entrar no meu grupo</button>
    </div>`}
    <p class="text-xs muted mt-1">Dá para trocar depois quantas vezes precisar. Você fica em um grupo de cada vez.</p>
  </div>` : ""}

  <div class="card mb-2">
    <div class="qcard-meta mb-1">${meuGrupo.oficial ? '<span class="badge badge-muted">Calendário oficial — nenhuma turma escolhida</span>' : `<span class="badge badge-accent">${escapeHtml(rotuloDoGrupo(meuGrupo, u))}</span>` + (meuGrupo.doRodizio ? '<span class="badge badge-muted">Turma do rodízio, aberta</span>' : souDono ? '<span class="badge badge-muted">Criado por você</span>' : '<span class="badge badge-muted">Criado por outro aluno</span>')}</div>
    <div class="flex justify-between items-center" style="gap:.5rem;flex-wrap:wrap">
      <div style="font-weight:700;font-size:1.1rem">${escapeHtml(meuGrupo.nome)}</div>
      ${podeRenomearGrupo(meuGrupo, u) ? `<button class="btn btn-secondary btn-sm" onclick="abrirRenomearGrupo('${meuGrupo.id}')">${iconeSvg("edit")} Mudar o nome do grupo</button>` : ""}
    </div>
    <div class="text-sm muted mt-1">${detalheCalendario}${!meuGrupo.oficial?" · "+((meuGrupo.membrosAprovados||[]).length)+" membro(s)":""}.</div>
    ${formado && !proprio ? `<div class="text-xs muted mt-1">Você está marcado como <strong>${escapeHtml(u.anoFaculdade||"Formado(a)")}</strong>: ${meuGrupo.oficial ? "não há calendário de formado, então não existe bloco atual para você." : "o calendário que você acompanha é o do ano desta turma."}</div>` : ""}
    ${!semTurma ? `<button class="btn btn-ghost btn-sm mt-2" onclick="sairDoMeuGrupo()">Sair deste grupo${formado ? "" : " e voltar ao calendário oficial"}</button>` : ""}
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

  ${!meuGrupo.oficial ? renderQuestoesDoGrupo(meuGrupo) : ""}

  <div class="card mb-2">
    <div class="card-title">${semTurma ? "Criar o meu grupo" : "Criar outro grupo"}</div>
    <p class="text-sm muted">Escolha como o grupo funciona. Quem pedir para entrar precisa da sua aprovação, e criar um grupo faz você sair do atual: cada pessoa fica em um só.</p>
    <div class="field mt-1" style="max-width:520px"><label class="label">Tipo de grupo</label>
      <select class="select" id="novoGrupoTipo" onchange="alternarTipoNovoGrupo()">
        ${formado ? "" : `<option value="rodizio">Segue o rodízio de ${escapeHtml(anoParaCriar)} — entra por um bloco da sequência</option>`}
        <option value="proprio">Calendário próprio — eu monto os blocos (ou deixo sem, só para dividir questões)</option>
      </select>
    </div>
    <div class="flex gap-1 items-end mt-1" style="flex-wrap:wrap">
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
      const jaSolicitei = (g.solicitacoesPendentes||[]).includes(u.id);
      const proprioG = grupoComCalendarioProprio(g);
      const anoG = anoDoGrupo(g, u);
      const atualG = blocoAtualDoGrupo(g, u);
      const criador = g.doRodizio ? "turma do rodízio, aberta a todos" : "criada por "+escapeHtml(getUsuario(g.criadoPor)?getUsuario(g.criadoPor).nome:"—");
      // o bloco por onde o grupo do rodízio começa: é o que o identifica
      // quando o nome é só a letra (ou nem letra tem)
      const inicio = proprioG ? null : blocosDoGrupo(g, u)[0];
      return `
      <div class="flex justify-between items-center mb-1 card-flat" style="gap:.5rem;flex-wrap:wrap">
        <div>
          <div style="font-weight:600">${escapeHtml(g.nome)} <span class="badge badge-accent">${escapeHtml(rotuloDoGrupo(g, u))}</span></div>
          <div class="text-xs muted">${proprioG ? "calendário próprio · "+g.blocosProprios.length+" bloco(s)" : escapeHtml(anoG)+(inicio ? " · começa em "+escapeHtml(inicio.nome) : "")} · hoje em ${escapeHtml(atualG?atualG.nome:"—")} · ${criador}</div>
        </div>
        ${souMembro ? `<button class="btn btn-secondary btn-sm" onclick="usarGrupo('${g.id}')">Entrar neste grupo</button>` :
          jaSolicitei ? `<button class="btn btn-secondary btn-sm" disabled>Solicitação enviada</button>` :
          `<button class="btn btn-secondary btn-sm" onclick="solicitarAcessoGrupo('${g.id}')">Pedir para entrar</button>`}
      </div>`;
    }).join("") : '<p class="text-sm muted">Nenhum grupo criado ainda. Crie o seu acima.</p>'}
  </div>
  <div class="card-flat mt-2 text-xs muted">Com a nuvem ligada, o estudo de cada pessoa viaja entre aparelhos, mas os grupos ainda são deste navegador: um grupo criado aqui só aparece para quem abrir a plataforma neste mesmo computador. Ver <code>nuvem/LEIA-ME.md</code>.</div>
  `;
}
/* No formulário de criação, o campo do rodízio só faz sentido para o grupo que
   segue o rodízio; o nome é opcional só nele (o grupo sem nome é identificado
   pelo bloco de início, e o de calendário próprio não tem bloco de início). */
function alternarTipoNovoGrupo(){
  const proprio = document.getElementById("novoGrupoTipo").value === "proprio";
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
  const proprio = formado || (campoTipo && campoTipo.value === "proprio");
  const nomeDigitado = document.getElementById("novoGrupoNome").value.trim();
  if(proprio && !nomeDigitado){ toast("Dê um nome para o grupo.", "err"); return; }
  const base = { id:uid("grupo"), criadoPor:u.id, oficial:false, publico:true, criadoEm:hojeISO(),
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
  entrarNoGrupo(u, novo.id);
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
    <div class="flex gap-1 mt-2"><button class="btn btn-primary" onclick="salvarNomeDoGrupo('${g.id}')">Salvar</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
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
function usarGrupo(grupoId){
  const g = getGrupo(grupoId); if(!g) return;
  const u = usuarioAtual();
  if(!g.oficial && !g.doRodizio && g.criadoPor!==u.id && !(g.membrosAprovados||[]).includes(u.id)){
    toast("Você ainda não faz parte deste grupo — peça para entrar.", "err"); return;
  }
  entrarNoGrupo(u, grupoId);
  saveState();
  toast('Agora você está em "'+g.nome+'" ('+rotuloDoGrupo(g, u)+').');
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
  ${podeEditar ? `<div class="flex gap-1 mb-2" style="flex-wrap:wrap"><button class="btn btn-primary btn-sm" onclick="abrirFormularioBlocoProprio('${grupo.id}', null)">${iconeSvg("plus")} Adicionar bloco</button></div>` : ""}
  ${blocos.map(b=>`
    <div class="card mb-1" ${atual&&b.id===atual.id?'style="border-color:var(--accent)"':""}>
      <div class="flex justify-between items-start">
        <div>
          ${atual&&b.id===atual.id?'<span class="badge badge-accent mb-1">Bloco atual</span>':""}
          <div style="font-weight:700">${b.ordem}. ${escapeHtml(b.nome)}</div>
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
    <div class="flex gap-1 mt-1"><button class="btn btn-primary" onclick="salvarBlocoProprio('${g.id}','${blocoId||""}')">Salvar</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>
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
    <div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="excluirBlocoProprioConfirmado('${grupoId}','${blocoId}')">Excluir mesmo assim</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
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
        <div class="flex justify-between items-center" style="flex-wrap:wrap;gap:.5rem">
          <div style="font-weight:700">${escapeHtml(b.nome)} <span class="text-sm muted" style="font-weight:400">${formatDataBR(b.dataInicio)} – ${formatDataBR(b.dataFim)}</span></div>
          ${proprio ? `<button class="btn btn-ghost btn-sm" onclick="restaurarOrdemDosEstagios(${ref})">Voltar à ordem da turma</button>` : '<span class="badge badge-muted">ordem da turma</span>'}
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
function entrarNaTurmaDoRodizio(deslocamento){
  const u = usuarioAtual();
  const ano = temCalendarioProprio(u.anoFaculdade) ? u.anoFaculdade : CONFIG.anoFaculdadePadrao;
  const turma = turmaDoRodizio(ano, deslocamento);
  if(!turma){ toast("Não encontrei esse grupo no calendário de "+ano+".", "err"); return; }
  entrarNoGrupo(u, turma.id);
  saveState();
  toast("Agora você está em: " + nomeRodizio(ano, turma.deslocamento) + " (" + ano + ").");
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
/* DIVIDIR AS QUESTÕES DO GRUPO. Um grupo estuda junto, mas ninguém precisa
   fazer tudo: o dono divide as questões entre os membros — a mesma
   quantidade para cada um, misturando os assuntos — e cada pessoa pratica só
   a sua parte ("Minha parte"). Guardado no próprio grupo (`divisao`: id da
   questão → id de quem fica com ela). Questão que entra depois fica sem
   responsável até uma nova divisão. */
function membrosDoGrupo(grupo){
  const ids = [...new Set([grupo.criadoPor, ...(grupo.membrosAprovados||[])].filter(Boolean))];
  return ids.map(getUsuario).filter(Boolean).sort((a,b)=>a.nome.localeCompare(b.nome, "pt-BR"));
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
function dividirQuestoesDoGrupo(grupoId){
  const g = getGrupo(grupoId);
  if(!g || !podeDividirQuestoesDoGrupo(g, usuarioAtual())) return;
  const membros = membrosDoGrupo(g);
  const questoes = questoesDoGrupo(g);
  if(membros.length < 2){ toast("Precisa de pelo menos dois membros para dividir as questões.", "err"); return; }
  if(!questoes.length){ toast("O grupo ainda não tem questões para dividir.", "err"); return; }
  // ordenadas por assunto e distribuídas em rodízio: cada pessoa recebe uma
  // amostra de todos os assuntos, e não um assunto inteiro só para ela
  const ordenadas = questoes.slice().sort((a,b)=>(a.assuntoId||"").localeCompare(b.assuntoId||"") || a.id.localeCompare(b.id));
  g.divisao = {};
  ordenadas.forEach((q,i)=>{ g.divisao[q.id] = membros[i % membros.length].id; });
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
    <div class="flex justify-between items-center mb-1" style="flex-wrap:wrap;gap:.5rem">
      <div class="card-title" style="margin-bottom:0">Questões deste grupo (${questoes.length})</div>
      <div class="flex gap-1" style="flex-wrap:wrap">
        <button class="btn btn-secondary btn-sm" onclick="navigate('importar-questoes')">${iconeSvg("upload")} Colar prova inteira / importar em lote</button>
        <button class="btn btn-primary btn-sm" onclick="abrirFormularioQuestao(null)">${iconeSvg("plus")} Adicionar questão</button>
      </div>
    </div>
    <p class="text-sm muted">Qualquer pessoa do grupo pode contribuir. Essas questões ficam disponíveis só pra quem está neste grupo — em "Estudar &gt; Monte sua lista", marque "incluir questões do meu grupo" pra praticá-las.</p>
    <div class="card-flat mt-2 text-sm">
      <strong>Dividir as questões entre os membros:</strong> cada pessoa fica com uma parte do mesmo tamanho, misturando os assuntos, e pratica só a sua.
      ${dividida ? `<div class="mt-1">${minhas.length ? `Você ficou com <strong>${minhas.length}</strong> questão(ões).` : "Você não ficou com nenhuma questão nesta divisão."}</div>` : `<div class="mt-1 muted">Ainda não foi dividido.</div>`}
      <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
        ${minhas.length ? `<button class="btn btn-primary btn-sm" onclick="praticarMinhaParteDoGrupo('${grupo.id}')">${iconeSvg("book")} Praticar minha parte (${minhas.length})</button>` : ""}
        ${podeDividir ? `<button class="btn btn-secondary btn-sm" onclick="dividirQuestoesDoGrupo('${grupo.id}')" ${membros.length<2||!questoes.length?"disabled":""}>${iconeSvg("users")} ${dividida ? "Dividir de novo" : "Dividir entre os "+membros.length+" membros"}</button>` : ""}
        ${podeDividir && dividida ? `<button class="btn btn-ghost btn-sm" onclick="desfazerDivisaoDoGrupo('${grupo.id}')">Desfazer a divisão</button>` : ""}
      </div>
      ${membros.length<2 ? `<div class="text-xs muted mt-1">Com um membro só não há o que dividir — convide os colegas para o grupo.</div>` : ""}
    </div>
    <div class="card-flat mt-2 text-sm">
      <strong>Prova inteira de uma vez:</strong> em "Enviar Questões" você informa a instituição e o ano uma única vez, copia o prompt pronto, cola numa IA junto com o PDF da prova e traz o resultado de volta. Escolha o destino <em>"Questões do meu grupo"</em> para elas caírem direto aqui.
      <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
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
  <div class="page-header"><h2>Perfil e configurações</h2><p>Seus dados, a ajuda e o tutorial, a senha, o aplicativo e a conta na nuvem.</p></div>
  <div class="card" style="max-width:460px">
    <div class="field"><label class="label">Nome</label><div>${escapeHtml(u.nome)}</div></div>
    <div class="field"><label class="label">E-mail</label><div>${escapeHtml(u.email)}</div></div>
    <div class="field"><label class="label">Matrícula</label><div>${escapeHtml(u.matricula)}</div></div>
    ${u.papel==="aluno" ? (() => { const g = getGrupoDoUsuario(u); return `<div class="field"><label class="label">Turma / Grupo</label><div>${escapeHtml(g.nome)}${g.oficial ? ' <span class="badge badge-muted">calendário oficial</span>' : ' <span class="badge badge-accent">'+escapeHtml(rotuloDoGrupo(g, u))+'</span>'} <button class="link-btn" onclick="navigate('meu-grupo')">gerenciar</button></div>${g.oficial?`<div class="hint mt-1">${temCalendarioProprio(u.anoFaculdade) ? "Você ainda não escolheu a sua turma do rodízio — em Meu Grupo." : "Você não segue um grupo — em Meu Grupo dá para entrar num ou criar o seu."}</div>`:""}</div>`; })() : ""}
    ${u.papel==="aluno" ? `<div class="field"><label class="label">Ano da faculdade</label>
      <select class="select" id="perfilAno" onchange="salvarAnoFaculdade()">
        ${CONFIG.anosFaculdade.map(a=>`<option value="${escapeHtml(a)}" ${u.anoFaculdade===a?"selected":""}>${escapeHtml(a)}</option>`).join("")}
      </select>
      <div class="hint mt-1">Atualize quando virar o ano letivo. Quem está no internato marca o ano em que está — 5º ou 6º. Quem já se formou marca "Formado(a)": não há calendário de formado — o calendário vem de um grupo de que você participe, ou de um que você mesmo monta em Meu Grupo.</div>
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
  ${renderCardAjuda()}
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
    destaques: doUsuario(db.destaques),
    cartoesPessoais: (db.flashcards || []).filter(c => c.usuarioId === id),
    sessoes: doUsuario(db.sessoes),
    simulados: doUsuario(db.resultadosSimulados),
    comentarios: comentariosAtivos().filter(c => c.usuarioId === id),
  };
}
function baixarMeusDados(){
  const u = usuarioAtual(); if(!u) return;
  const primeiroNome = (u.nome || "esc").split(" ")[0].toLowerCase().normalize("NFD").replace(/[^a-z0-9]/g, "");
  baixarArquivo("meu-estudo-" + primeiroNome + "-" + hojeISO() + ".json", JSON.stringify(dadosDoUsuario(u.id), null, 2), "application/json");
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
