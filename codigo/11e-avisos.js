/* codigo/11e-avisos.js — Avisos da coordenação (seção 24-D): o painel Enviar Avisos, do administrador, e o card de avisos na tela inicial de quem os recebe.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   24-D. AVISOS — a coordenação escreve, cada pessoa lê na tela inicial
   ==========================================================================
   Até aqui a plataforma só avisava o que ela mesma calculava (meta do dia,
   revisão vencida). Faltava o recado humano: "sábado o site fica fora do
   ar", "o simulado do 6º ano abre segunda". O administrador escreve em
   Enviar Avisos, escolhe para quem vai (papéis e anos da faculdade; em
   branco é todo mundo), e o aviso aparece no Início de cada pessoa até ela
   dispensar. Com a nuvem, sobe para a tabela `avisos` e chega a todos os
   aparelhos; sem nuvem, vale só neste navegador — e a tela diz isso.

   Quem já leu (dispensou) fica em `usuario.avisosLidos` — no perfil, que
   sobe para a nuvem —, para o aviso não voltar em outro aparelho. */
const ROTAS_DE_AVISO = [
  ["", "Nenhuma — só o texto"], ["estudar", "Estudar"], ["revisao", "Revisão"], ["flashcards", "Revisão Rápida"],
  ["simulados", "Provas e Simulados"], ["favoritos", "Favoritos"], ["meu-grupo", "Meu Grupo"],
  ["livro-ouro", "Livro de Ouro"], ["perfil", "Perfil e configurações"],
];
const PAPEIS_DE_AVISO = [["aluno", "Alunos"], ["residente", "Residentes"], ["professor", "Professores"], ["admin", "Administradores"]];

function podeEnviarAvisos(usuario){ return podeAdmin("avisos", usuario); }

/* O aviso chega a esta pessoa? Retirado ou vencido, não. `papeis` e `anos`
   vazios significam todos; com `anos`, só quem tem um desses anos (professor
   e residente não têm ano de faculdade). */
function avisoChegaAo(aviso, usuario){
  if(!aviso || !usuario || aviso.removido) return false;
  if(aviso.expiraEm && aviso.expiraEm < hojeISO()) return false;
  if((aviso.papeis||[]).length && !aviso.papeis.includes(usuario.papel)) return false;
  if((aviso.anos||[]).length && !aviso.anos.includes(usuario.anoFaculdade)) return false;
  return true;
}
function avisosNaoLidos(usuario){
  const lidos = new Set((usuario && usuario.avisosLidos) || []);
  return (db.avisos||[]).filter(a => avisoChegaAo(a, usuario) && !lidos.has(a.id))
    .sort((a,b) => (b.data||"").localeCompare(a.data||""));
}
function dispensarAviso(id){
  const u = usuarioAtual(); if(!u) return;
  if(!Array.isArray(u.avisosLidos)) u.avisosLidos = [];
  if(!u.avisosLidos.includes(id)) u.avisosLidos.push(id);
  saveState();
  render();
}
function dispensarTodosOsAvisos(){
  const u = usuarioAtual(); if(!u) return;
  avisosNaoLidos(u).forEach(a => { if(!(u.avisosLidos||[]).includes(a.id)){ if(!u.avisosLidos) u.avisosLidos = []; u.avisosLidos.push(a.id); } });
  saveState();
  render();
}
function abrirAviso(id){
  const a = (db.avisos||[]).find(x => x.id === id); if(!a) return;
  const rota = a.rota;
  dispensarAviso(id);
  if(rota) navigate(rota);
}
/* O card da tela inicial. Fica acima das notificações calculadas: o recado da
   coordenação é a coisa mais específica que a pessoa vai ler ali. */
function renderAvisosCard(usuario){
  const avisos = avisosNaoLidos(usuario);
  if(!avisos.length) return "";
  return `<div class="card mb-2 borda-alerta">
    <div class="flex justify-between items-center" style="margin-bottom:.5rem;gap:.5rem;flex-wrap:wrap">
      <div class="card-title sem-mb">${iconeSvg("message")} Avisos da coordenação${avisos.length>1 ? ` (${avisos.length})` : ""}</div>
      ${avisos.length>1 ? `<button class="link-btn" onclick="dispensarTodosOsAvisos()">dispensar todos</button>` : ""}
    </div>
    ${avisos.map(a => `<div class="card-flat mb-1">
      <div class="flex justify-between items-start" style="gap:.5rem">
        <div>
          <div class="peso-700">${escapeHtml(a.titulo)}</div>
          <div class="text-sm mt-1 quebra-linhas">${escapeHtml(a.texto)}</div>
          <div class="text-xs muted mt-1">${escapeHtml(a.autorNome || "Coordenação")} · ${formatDataBR(a.data)}${a.expiraEm ? " · vale até "+formatDataBR(a.expiraEm) : ""}</div>
        </div>
        <button class="icon-btn" title="Dispensar este aviso" onclick="dispensarAviso('${a.id}')">${iconeSvg("x")}</button>
      </div>
      ${a.rota ? `<button class="btn btn-secondary btn-sm mt-1" onclick="abrirAviso('${a.id}')">Abrir ${escapeHtml(tituloDaRota(a.rota))}</button>` : ""}
    </div>`).join("")}
  </div>`;
}
/* Aviso novo que chega pela nuvem enquanto a pessoa usa a plataforma: além do
   card, vai também para o aviso do sistema, se ela já deu essa permissão (o
   lembrete de meta pede). O que tem mais de dois dias é histórico de um
   aparelho novo, não novidade, e não apita. */
function avisarNoNavegador(aviso){
  const u = usuarioAtual();
  if(!u || !notificacaoDisponivel() || Notification.permission !== "granted") return;
  if(!avisoChegaAo(aviso, u) || (u.avisosLidos||[]).includes(aviso.id)) return;
  if((aviso.data||"") < somarDias(hojeISO(), -2)) return;
  mostrarNotificacao(aviso.titulo, aviso.texto.slice(0, 140), aviso.rota || "inicio", "aviso-" + aviso.id);
}

/* ---------- o painel do administrador ---------- */
function textoDestinoDoAviso(a){
  const papeis = (a.papeis||[]).map(p => (PAPEIS_DE_AVISO.find(x => x[0]===p)||[p,p])[1]);
  const partes = [];
  partes.push(papeis.length ? papeis.join(", ") : "Todos os papéis");
  partes.push((a.anos||[]).length ? a.anos.join(", ") : "todos os anos");
  return partes.join(" · ");
}
function renderEnviarAvisos(){
  const u = usuarioAtual();
  if(!podeEnviarAvisos(u)) return renderSemPermissao("avisos");
  const avisos = (db.avisos||[]).filter(a => !a.removido).sort((a,b) => (b.data||"").localeCompare(a.data||"") || b.id.localeCompare(a.id));
  const pag = paginar(avisos, "avisos", { porPagina: 10 });
  const semTabela = nuvemConectado() && _nuvemTabelasAusentes.has("avisos");
  return `
  <div class="page-header"><h2>Enviar Avisos</h2><p>Escreva um recado e escolha para quem ele vai. Ele aparece no Início de cada pessoa, até ela dispensar.</p></div>
  <div class="card-flat mb-2 text-sm">${nuvemConectado()
    ? `${iconeSvg("database")} Com a sua conta na nuvem, o aviso sobe e chega a cada pessoa na próxima sincronização — ao abrir a plataforma, ao voltar para a aba e a cada 45 segundos com ela aberta. Quem já deu permissão de notificação do navegador também recebe o aviso do sistema.`
    : `${iconeSvg("alert")} Sem conta na nuvem, o aviso vale <strong>só neste navegador</strong>: só quem abrir a plataforma neste computador o vê. Entre com a sua conta da nuvem para avisar toda a turma.`}</div>
  ${semTabela ? `<div class="card mb-2 borda-alerta"><strong>${iconeSvg("alert")} Falta rodar o nuvem/esquema.sql.</strong> <span class="text-sm">Este banco ainda não tem a tabela <code>avisos</code>. Até rodar o SQL (e recarregar a página), o aviso fica guardado neste navegador e não chega aos outros.</span></div>` : ""}

  <div class="card mb-2">
    <div class="card-title">Novo aviso</div>
    <div class="field"><label class="label">Título</label><input class="input" id="avTitulo" maxlength="80" placeholder="Ex.: Simulado do 6º ano abre segunda"></div>
    <div class="field"><label class="label">Mensagem</label><textarea class="input" id="avTexto" rows="4" maxlength="1000" placeholder="O que a pessoa precisa saber."></textarea></div>
    <div class="grid grid-2">
      <div class="field"><label class="label">Para quais papéis</label>
        ${PAPEIS_DE_AVISO.map(([id, nome]) => `<label class="checkbox-row mb-1"><input type="checkbox" class="avPapel" value="${id}"> ${nome}</label>`).join("")}
        <div class="hint mt-1">Nenhum marcado = todos os papéis.</div>
      </div>
      <div class="field"><label class="label">Para quais anos da faculdade</label>
        ${CONFIG.anosFaculdade.map(a => `<label class="checkbox-row mb-1"><input type="checkbox" class="avAno" value="${escapeHtml(a)}"> ${escapeHtml(a)}</label>`).join("")}
        <div class="hint mt-1">Nenhum marcado = todos os anos. Só quem tem ano no cadastro (os alunos) recebe um aviso com ano marcado.</div>
      </div>
    </div>
    <div class="grid grid-2">
      <div class="field"><label class="label">Levar a pessoa para (opcional)</label>
        <select class="select" id="avRota">${ROTAS_DE_AVISO.map(([id, nome]) => `<option value="${id}">${escapeHtml(nome)}</option>`).join("")}</select></div>
      <div class="field"><label class="label">Vale até (opcional)</label><input class="input" type="date" id="avExpira" min="${hojeISO()}">
        <div class="hint mt-1">Depois dessa data o aviso some sozinho. Em branco, fica até a pessoa dispensar.</div></div>
    </div>
    <button class="btn btn-primary" onclick="enviarAviso()">${iconeSvg("message")} Enviar aviso</button>
    <div class="text-xs muted mt-1">Você também recebe o seu aviso, se estiver entre os destinatários — já marcado como lido.</div>
  </div>

  <div class="card">
    <div class="card-title">Avisos enviados (${avisos.length})</div>
    ${avisos.length ? pag.itens.map(a => {
      const vencido = a.expiraEm && a.expiraEm < hojeISO();
      return `<div class="card-flat mb-1" style="${vencido?"opacity:.6":""}">
        <div class="flex justify-between items-start quebra-gap">
          <div>
            <div class="peso-700">${escapeHtml(a.titulo)} ${vencido ? '<span class="badge badge-muted">vencido</span>' : ""}</div>
            <div class="text-sm mt-1 quebra-linhas">${escapeHtml(a.texto)}</div>
            <div class="text-xs muted mt-1">Para: ${escapeHtml(textoDestinoDoAviso(a))}${a.rota ? " · leva a "+escapeHtml(tituloDaRota(a.rota)) : ""}</div>
            <div class="text-xs muted">${escapeHtml(a.autorNome || "—")} · ${formatDataBR(a.data)}${a.expiraEm ? " · vale até "+formatDataBR(a.expiraEm) : ""}${a.naNuvem ? " · na nuvem" : ""}</div>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="retirarAviso('${a.id}')">${iconeSvg("trash")} Retirar</button>
        </div>
      </div>`;
    }).join("") + controlesPaginacao(pag, "aviso(s)") : '<div class="empty-state">Nenhum aviso enviado ainda.</div>'}
  </div>`;
}
function enviarAviso(){
  const u = usuarioAtual();
  if(!podeEnviarAvisos(u)){ toast("Seu nível de acesso não inclui enviar avisos.", "err"); return; }
  const titulo = document.getElementById("avTitulo").value.trim();
  const texto = document.getElementById("avTexto").value.trim();
  if(!titulo || !texto){ toast("Escreva o título e a mensagem do aviso.", "err"); return; }
  const expiraEm = document.getElementById("avExpira").value;
  if(expiraEm && expiraEm < hojeISO()){ toast("A data em que o aviso vale até não pode ser passada.", "err"); return; }
  const aviso = {
    id: uid("aviso"), titulo, texto, rota: document.getElementById("avRota").value,
    papeis: [...document.querySelectorAll(".avPapel:checked")].map(el => el.value),
    anos: [...document.querySelectorAll(".avAno:checked")].map(el => el.value),
    data: hojeISO(), expiraEm: expiraEm || "", autorNome: u.nome, removido: false,
  };
  db.avisos.push(aviso);
  // quem escreve não precisa ler o próprio aviso
  if(!Array.isArray(u.avisosLidos)) u.avisosLidos = [];
  u.avisosLidos.push(aviso.id);
  const subiu = nuvemMarcarAviso(aviso.id);
  if(subiu) aviso.naNuvem = true;
  saveState();
  toast(subiu ? "Aviso enviado — chega a cada pessoa na próxima sincronização." : "Aviso guardado neste navegador (sem conta na nuvem, ele não chega a outros aparelhos).");
  render();
}
function retirarAviso(id){
  const a = (db.avisos||[]).find(x => x.id === id); if(!a) return;
  if(!podeEnviarAvisos(usuarioAtual())){ toast("Seu nível de acesso não inclui enviar avisos.", "err"); return; }
  abrirModalTitulado("Retirar aviso", `<p class="text-sm">O aviso <strong>${escapeHtml(a.titulo)}</strong> deixa de aparecer para todos. Quem já o leu não é afetado.</p>
    <div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="retirarAvisoConfirmado('${id}')">Retirar</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
}
function retirarAvisoConfirmado(id){
  const a = (db.avisos||[]).find(x => x.id === id); if(!a) return;
  a.removido = true;
  if(a.naNuvem || nuvemConectado()) nuvemMarcarAviso(id);
  saveState();
  fecharModal();
  toast("Aviso retirado.");
  render();
}
