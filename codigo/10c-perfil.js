/* codigo/10c-perfil.js — Perfil e configurações, com "Seus dados" (seção 19).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

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
  <div class="cartoes-colunas">
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
    ${u.papel==="aluno" ? renderCampoProvaAlvo(u) : ""}
    <div class="field"><label class="label">Papel</label><div>${badgePapel(u.papel, u)}</div></div>
    ${(u.papel==="professor"||u.papel==="residente") ? `<div class="field"><label class="label">Grandes áreas de atuação</label>
      <div>${u.areasAtuacao&&u.areasAtuacao.length ? u.areasAtuacao.map(a=>`<span class="badge badge-muted">${escapeHtml(nomeArea(a))}</span>`).join(" ") : '<span class="text-sm muted">Nenhuma definida — você enxerga o conteúdo de todas as áreas.</span>'}</div>
      <div class="hint mt-1">Cada professor ou residente cobre no máximo ${CONFIG.maxAreasAtuacao} grandes áreas: uma clínica e, opcionalmente, ${escapeHtml(nomeArea(CONFIG.areaTransversalId))}, que é transversal. É o que define quais dúvidas de aluno chegam até você. Para mudar, fale com a coordenação.</div>
    </div>` : ""}
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
    <div class="flex gap-1 mt-2 quebra">
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
  </div>`}
  </div>`;
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
    historicoDeCartoes: doUsuario(db.logCartoes),
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
  // a prova-alvo só existe no 6º ano e para Formado(a); do 3º ao 5º a data exata não vale
  if(!temProvaAlvo(u)) delete u.provaAlvoData;
  saveState();
  toast("Ano da faculdade atualizado.");
  render();
}
/* O campo "Prova-alvo" do Perfil. No 6º ano e para Formado(a) a pessoa pode pôr
   a data exata da primeira prova importante (sem ela vale 1º de dezembro). Do
   3º ao 5º ano não há prova-alvo — só um aviso de quando ela passa a existir. */
function renderCampoProvaAlvo(u){
  if(!u.anoFaculdade) return "";
  if(!temProvaAlvo(u)){
    return `<div class="field"><label class="label">Prova-alvo</label>
      <div class="hint">Ela passa a existir quando você chegar ao 6º ano: o padrão é o 1º de dezembro, e você poderá marcar a data exata da sua primeira prova importante. Até lá, as revisões seguem o ritmo normal.</div>
    </div>`;
  }
  const alvo = provaAlvoDoUsuario(u);
  const ate = somarDias(hojeISO(), 400);
  return `<div class="field"><label class="label" for="perfilProvaAlvo">Data da primeira prova importante</label>
    <div class="flex gap-1 items-center quebra">
      <input class="input" type="date" id="perfilProvaAlvo" min="${hojeISO()}" max="${ate}" value="${alvo.exata ? alvo.data : ""}" style="max-width:11rem">
      <button class="btn btn-secondary btn-sm" onclick="salvarProvaAlvo()">Salvar a data</button>
      ${alvo.exata ? `<button class="btn btn-ghost btn-sm" onclick="limparProvaAlvo()">Voltar ao padrão</button>` : ""}
    </div>
    <div class="hint mt-1">Hoje a prova-alvo é <strong>${formatDataBR(alvo.data)}</strong> (${alvo.exata ? "a data que você marcou" : "o padrão: 1º de dezembro"}; ${escapeHtml(tempoParaProvaAlvo(alvo.dias))}). Com a prova se aproximando, as revisões espaçadas passam a voltar em no máximo ${Math.round(CONFIG.revisaoPelaProva.fracaoDoPrazo*100)}% do tempo que falta, para nada ficar para depois dela.</div>
  </div>`;
}
function salvarProvaAlvo(){
  const u = usuarioAtual(); if(!u || !temProvaAlvo(u)) return;
  const v = (document.getElementById("perfilProvaAlvo") || {}).value;
  if(!dataISOValida(v)){ toast("Escolha uma data válida.", "err"); return; }
  if(v < hojeISO()){ toast("A data já passou — escolha a da próxima prova.", "err"); return; }
  if(v > somarDias(hojeISO(), 400)){ toast("A prova importante tem de estar a menos de 400 dias — para provas mais distantes vale o padrão (início de dezembro).", "err"); return; }
  u.provaAlvoData = v;
  saveState();
  toast("Data da prova-alvo salva: " + formatDataBR(v) + ".");
  render();
}
function limparProvaAlvo(){
  const u = usuarioAtual(); if(!u) return;
  delete u.provaAlvoData;
  saveState();
  toast("Voltou ao padrão: início de dezembro.");
  render();
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
    <div class="flex gap-1 mt-2 quebra">
      <button class="btn btn-secondary btn-sm" onclick="exportarBackup()">${iconeSvg("archive")} Exportar backup</button>
      <button class="btn btn-secondary btn-sm" onclick="baixarMeusDados()">${iconeSvg("download")} Só o meu estudo</button>
      <label class="btn btn-secondary btn-sm clicavel">${iconeSvg("upload")} Importar backup<input type="file" accept=".json" style="display:none" onchange="importarBackupArquivo(this)"></label>
      <button class="btn btn-danger btn-sm" onclick="confirmarReiniciarDemo()">${iconeSvg("trash")} Reiniciar dados</button>
    </div>
    <p class="text-xs muted mt-2">Importar substitui os dados atuais pelos do arquivo — inclusive respostas e cadastros de todos os usuários. Reiniciar apaga tudo e volta ao ponto de partida.</p>
    ${bancoDeResgateDisponivel() ? (() => { const r = resumoDoResgate(); return `<div class="card-flat mt-2 borda-alerta">
      <div class="text-sm" style="font-weight:600;color:var(--amber)">${iconeSvg("archive")} Existe uma cópia de resgate neste navegador</div>
      <p class="text-sm muted mt-1">A plataforma encontrou um defeito nos dados salvos em algum momento e guardou o banco como ele estava antes de consertá-lo${r?`: <strong>${r.usuarios} cadastro(s)</strong>, ${r.respostas} resposta(s), ${r.questoes} questão(ões)`:""}. Se algo tiver se perdido, é daqui que se recupera.</p>
      <button class="btn btn-secondary btn-sm mt-1" onclick="restaurarBancoDeResgate()">Ver e restaurar a cópia de resgate</button>
    </div>`; })() : ""}
  </div>`;
}
