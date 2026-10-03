/* codigo/11d-painel-da-turma.js — Painel da Turma (seção 24-C).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   24-C. PAINEL DA TURMA — como a turma está usando a plataforma
   ==========================================================================
   Só professor e administrador (coordenação e máster — ver a permissão
   "turma" em PERMISSOES_ADMIN). É a aba "Painel de uso" da tela Turma, que
   também reúne os pedidos de acesso e os usuários (11b, seção 24). Separado por ano da faculdade, porque é
   assim que a coordenação pensa: o 3º ano está usando? o 5º está caindo?

   A TAXA DE ACERTO NÃO É DE NINGUÉM. O acerto de uma pessoa é dela (Meu
   Desempenho) e não aparece aqui — nem para a coordenação, nem na planilha,
   nem em alerta ou ordenação. Por pessoa, o painel mostra USO: quantas
   questões, quantos dias, quantos cartões, quando foi a última vez. O acerto
   só existe SOMADO, por ano e por turma, e só quando há
   CONFIG.minAlunosParaMedia alunos com resposta no grupo: média de um ou dois
   alunos é o acerto deles. Isso vale já no banco (acerto_por_turma no
   esquema.sql), para o número nem chegar ao navegador.

   A EQUIPE também aparece, na aba "Equipe": professores, residentes e
   administradores usam a plataforma como alunos, e a coordenação quer saber
   quanto. É uso, como o dos alunos — sem acerto.

   De onde vêm os números:
     - nuvem ligada: das funções painel_turma(), acerto_por_turma() e
       atividade_por_semana() do esquema.sql, que somam no próprio banco —
       números, nunca respostas, anotações ou cartões pessoais. O banco
       confere o papel de quem pede: para qualquer outra pessoa, devolvem
       nada;
     - nuvem desligada: das contas deste navegador (demonstração), com a
       mesma conta — a tela é a mesma, e diz de onde veio.

   A coluna se chama "Condição", não "Atenção": ela descreve a situação de
   cada aluno — em dia, parado (7 dias ou mais sem questão nem cartão) ou sem
   nunca ter começado — em vez de apontar quem "precisa de atenção", que é um
   julgamento. Todo aluno tem uma condição; a lista não é ordenada por ela: o
   critério é o ÚLTIMO USO, que é um fato. */
function podeVerPainelTurma(u){
  u = u || usuarioAtual();
  if(!u || state.modoAluno) return false;
  return u.papel === "professor" || podeAdmin("turma", u);
}
function filtrosPainelTurma(){
  if(!state.filtroRota.painel) state.filtroRota.painel = { ano: "todos", ordem: "ultimo", busca: "" };
  return state.filtroRota.painel;
}
function mudarFiltroPainelTurma(campo, valor){ filtrosPainelTurma()[campo] = valor; render(); }
/* "Por turma" e a lista de pessoas abrem e fecham: o painel é longo e quase
   sempre se quer só os números do topo. Ficam fechadas até a pessoa abrir; o
   estado vai no filtro (e não no HTML) para sobreviver a cada redesenho, como
   o da página da lista. */
function secaoAbertaPainel(chave){ return !!(filtrosPainelTurma().secoes || {})[chave]; }
function guardarSecaoPainel(chave, aberta){
  const f = filtrosPainelTurma();
  f.secoes = Object.assign({}, f.secoes, { [chave]: !!aberta });
}
const ANO_EQUIPE_PAINEL = "equipe"; // valor do filtro da aba "Equipe" (nenhum ano da faculdade se chama assim)

/* Os dados de todas as pessoas, do mesmo jeito venham da nuvem ou daqui.
   `papel` ausente (esquema antigo, sem a coluna) é aluno, como sempre foi. */
function normalizarPessoaDaNuvem(l){
  return {
    id: l.usuario_id, nome: l.nome || "(sem nome)", email: l.email || "", papel: l.papel || "aluno",
    ano: l.ano_faculdade || "(sem ano)", grupoId: l.grupo_id || null, status: l.status, criadoEm: (l.criado_em || "").slice(0,10),
    respostas: +l.respostas || 0, r7: +l.respostas_7d || 0, r30: +l.respostas_30d || 0,
    dias30: +l.dias_ativos_30d || 0, ultimaResposta: l.ultima_resposta || null,
    cartoes: +l.cartoes_total || 0, cartoes30: +l.cartoes_30d || 0, ultimoCartao: l.ultimo_cartao || null,
    simulados: +l.simulados || 0,
  };
}
/* Uma linha de acerto somado. `ano` nulo = todos os anos; `grupoId` nulo =
   o ano inteiro, "" = alunos sem turma. */
function normalizarMediaDaNuvem(l){
  return {
    ano: l.ano_faculdade === undefined ? null : l.ano_faculdade, grupoId: l.grupo_id === undefined ? null : l.grupo_id,
    alunos: +l.alunos || 0, respostas: +l.respostas || 0, acertos: +l.acertos || 0, r30: +l.respostas_30d || 0, a30: +l.acertos_30d || 0,
    porArea: l.por_area || {},
  };
}
function painelTurmaLocal(){
  const hoje = hojeISO();
  const d7 = somarDias(hoje, -7), d30 = somarDias(hoje, -30);
  const pessoas = db.usuarios.map(u => {
    const rs = db.respostas.filter(r => r.usuarioId === u.id);
    const dias = (db.cartoesPorDia && db.cartoesPorDia[u.id]) || {};
    return {
      id: u.id, nome: u.nome, email: u.email || "", papel: u.papel, ano: u.anoFaculdade || "(sem ano)", grupoId: u.grupoId || null,
      status: u.status, criadoEm: u.criadoEm || "",
      respostas: rs.length, r7: rs.filter(r => r.data > d7).length, r30: rs.filter(r => r.data > d30).length,
      dias30: new Set(rs.filter(r => r.data > d30).map(r => r.data)).size,
      ultimaResposta: rs.length ? rs.map(r => r.data).sort().pop() : null,
      cartoes: Object.values(dias).reduce((s, n) => s + (+n || 0), 0),
      cartoes30: Object.entries(dias).filter(([d]) => d > d30).reduce((s, [, n]) => s + (+n || 0), 0),
      ultimoCartao: Object.keys(dias).sort().pop() || null,
      simulados: db.resultadosSimulados.filter(r => r.usuarioId === u.id).length,
    };
  });
  // o acerto, só dos alunos aprovados e somado: (ano, turma), ano e todos os anos
  const grupos = {};
  const junta = (chave, ano, grupoId, aluno, r) => {
    const g = grupos[chave] = grupos[chave] || { ano, grupoId, alunos: new Set(), respostas: 0, acertos: 0, r30: 0, a30: 0, porArea: {} };
    g.alunos.add(aluno); g.respostas++; if(r.correta) g.acertos++;
    if(r.data > d30){ g.r30++; if(r.correta) g.a30++; }
    const area = r.areaId || "?"; g.porArea[area] = g.porArea[area] || [0, 0]; g.porArea[area][0]++; if(r.correta) g.porArea[area][1]++;
  };
  db.respostas.forEach(r => {
    const u = getUsuario(r.usuarioId); if(!u || u.papel !== "aluno" || u.status !== "aprovado") return;
    const ano = u.anoFaculdade || "(sem ano)", turma = u.grupoId || "";
    junta("ano|" + ano + "|" + turma, ano, turma, u.id, r); junta("ano|" + ano, ano, null, u.id, r); junta("todos", null, null, u.id, r);
  });
  const medias = Object.values(grupos).filter(g => g.alunos.size >= CONFIG.minAlunosParaMedia)
    .map(g => Object.assign({}, g, { alunos: g.alunos.size }));
  const semanas = {};
  db.respostas.forEach(r => {
    const u = getUsuario(r.usuarioId); if(!u || u.papel !== "aluno" || !r.data || r.data <= somarDias(hoje, -84)) return;
    const d = new Date(r.data + "T00:00:00"); const seg = somarDias(r.data, -((d.getDay() + 6) % 7));
    const k = (u.anoFaculdade || "(sem ano)") + "|" + seg;
    const s = semanas[k] = semanas[k] || { ano: u.anoFaculdade || "(sem ano)", semana: seg, alunos: new Set(), respostas: 0, acertos: 0 };
    s.alunos.add(u.id); s.respostas++; if(r.correta) s.acertos++;
  });
  return { pessoas, medias, semanas: Object.values(semanas).map(s => ({ ano: s.ano, semana: s.semana, alunos: s.alunos.size, respostas: s.respostas,
    acertos: s.alunos.size >= CONFIG.minAlunosParaMedia ? s.acertos : null })) };
}
function carregarPainelTurma(forcar){
  const cache = state.filtroRota.painelDados;
  if(!nuvemConectado()){
    state.filtroRota.painelDados = { origem: "local", dados: painelTurmaLocal(), em: Date.now() };
    return;
  }
  if(cache && cache.origem === "nuvem" && !forcar && (cache.carregando || cache.dados || cache.erro)) return;
  state.filtroRota.painelDados = { origem: "nuvem", carregando: true, dados: cache && cache.dados };
  nuvemPainelTurma().then(r => {
    state.filtroRota.painelDados = { origem: "nuvem", em: Date.now(), dados: {
      pessoas: r.alunos.map(normalizarPessoaDaNuvem),
      medias: r.medias === null ? null : r.medias.map(normalizarMediaDaNuvem).filter(m => m.alunos >= CONFIG.minAlunosParaMedia),
      semanas: r.semanas.map(s => ({ ano: s.ano_faculdade, semana: s.semana, alunos: +s.alunos_ativos, respostas: +s.respostas,
        acertos: s.acertos === null || s.acertos === undefined ? null : +s.acertos })),
    }};
    if(state.route === "painel-turma") render();
  }).catch(e => {
    state.filtroRota.painelDados = { origem: "nuvem", erro: e.status === 404
      ? "O banco ainda não tem as funções do painel. Rode o nuvem/esquema.sql inteiro no Supabase (SQL Editor > Run) — ele cria painel_turma(), acerto_por_turma() e atividade_por_semana() sem mexer no resto."
      : (e.message || "Não foi possível carregar o painel.") };
    if(state.route === "painel-turma") render();
  });
}
function diasDesde(iso){ return iso ? diasEntre(iso, hojeISO()) : null; }
/* Só de uso: em dia, parou de estudar ou nunca começou. Acerto não vira
   condição — ver o comentário do topo. `lista` guarda só o que foge do "em
   dia" (é o que conta os parados); `condicao` é o que a coluna mostra. */
function alertasDoAluno(a){
  const ultima = [a.ultimaResposta, a.ultimoCartao].filter(Boolean).sort().pop() || null;
  const parado = diasDesde(ultima);
  const lista = [];
  if(ultima === null) lista.push({ tipo: "nunca", texto: "nunca estudou", peso: 2 });
  else if(parado >= 7) lista.push({ tipo: "parado", texto: `parado há ${parado} dias`, peso: 3 + Math.min(parado, 60)/60 });
  const condicao = lista.length ? lista[0] : { tipo: "em-dia", texto: "em dia" };
  return { lista, condicao, ultima, parado, peso: lista.reduce((s, x) => Math.max(s, x.peso), 0) };
}
function badgeCondicao(c){
  const classe = c.tipo === "em-dia" ? "badge-accent" : c.tipo === "nunca" ? "badge-muted" : "badge-amber";
  return `<span class="badge ${classe}">${escapeHtml(c.texto)}</span>`;
}
function badgeTaxa(t, n){
  if(!n) return '<span class="text-xs muted">—</span>';
  const v = pct(t, n);
  return `<span class="badge ${v<50?"badge-danger":v<70?"badge-amber":"badge-accent"}">${v}%</span>`;
}
function nomeDoGrupoPainel(id){ const g = id ? getGrupo(id) : null; return g ? g.nome : ""; }
function rotuloPapelPainel(papel){ return ({ admin: "Administrador", professor: "Professor", residente: "Residente", aluno: "Aluno" })[papel] || papel; }
// acerto somado do grupo (ano/turma) ou null: `ano` null = todos os anos; `grupoId` null = o ano inteiro
function mediaDoPainel(medias, ano, grupoId){
  return (medias || []).find(m => m.ano === ano && m.grupoId === grupoId) || null;
}

/* A TELA "TURMA": duas abas sobre as mesmas pessoas. "Painel" é o uso da
   turma (professor e administrador); "Cadastros e usuários" reúne os pedidos
   de acesso e a lista de contas (11b, seção 24) e só aparece para quem
   aprova cadastros ou administra usuários. Quem só tem uma das duas vê a
   tela sem abas. O número de pedidos aguardando aparece na aba e, no Painel,
   numa faixa com o atalho — é o que espera decisão. */
function abasDaTurma(u){
  const abas = [];
  if(podeVerPainelTurma(u)) abas.push("painel");
  if(u && u.papel === "admin" && (podeAprovarCadastros(u) || podeAdmin("usuarios", u))) abas.push("pessoas");
  return abas;
}
function mudarAbaTurma(aba){ filtrosPainelTurma().aba = aba; render(); }
function renderPainelTurma(){
  const u = usuarioAtual();
  const abas = abasDaTurma(u);
  if(!abas.length) return renderSemPermissao("turma");
  const f = filtrosPainelTurma();
  if(!abas.includes(f.aba)) f.aba = abas[0];
  const pedidos = podeAprovarCadastros(u) ? quantosPedidosDeAcesso() : 0;
  const rotulos = { painel: "Painel de uso", pessoas: "Cadastros e usuários" + (pedidos ? ` <span class="badge badge-amber">${pedidos}</span>` : "") };
  const aba = f.aba;
  return `<div class="page-header"><h2>Turma</h2><p>${aba === "pessoas"
    ? "Quem pediu acesso e quem já tem conta: aprovar, mudar papel e nível, inativar ou excluir. Com a nuvem ligada, a turma de verdade está na nuvem — as contas deste navegador são só as de teste e as de antes dela."
    : "Como a turma está usando a plataforma, separado por ano da faculdade — e a equipe, à parte. A taxa de acerto de cada pessoa não aparece: só a média de cada ano e de cada turma."}</p></div>
  ${abas.length > 1 ? `<div class="tabs">${abas.map(a=>`<div class="tab ${aba===a?"active":""}" onclick="mudarAbaTurma('${a}')">${rotulos[a]}</div>`).join("")}</div>` : ""}
  ${aba === "pessoas" ? renderTurmaPessoas(u) : `${pedidos && abas.includes("pessoas") ? `<div class="card-flat mb-2 flex justify-between items-center gap-2" style="flex-wrap:wrap;border-color:var(--amber)">
    <span class="text-sm">${iconeSvg("check")} <strong>${pedidos}</strong> ${pedidos===1?"pedido de acesso aguardando":"pedidos de acesso aguardando"} aprovação.</span>
    <button class="btn btn-primary btn-sm" onclick="mudarAbaTurma('pessoas')">Ver pedidos</button></div>` : ""}${renderPainelDaTurma()}`}`;
}
function renderPainelDaTurma(){
  carregarPainelTurma(false);
  const f = filtrosPainelTurma();
  const pd = state.filtroRota.painelDados || {};
  if(pd.erro) return `<div class="card borda-perigo"><div class="card-title">${iconeSvg("alert")} Não deu para carregar</div><p class="text-sm">${escapeHtml(pd.erro)}</p><button class="btn btn-secondary btn-sm mt-2" onclick="carregarPainelTurma(true); render()">Tentar de novo</button></div>`;
  if(!pd.dados) return `<div class="card"><p class="text-sm muted">Carregando os números da turma…</p></div>`;

  const dados = pd.dados;
  const semFuncaoMedias = dados.medias === null;
  const todasAsPessoas = dados.pessoas;
  const equipe = todasAsPessoas.filter(a => a.papel !== "aluno");
  const todos = todasAsPessoas.filter(a => a.papel === "aluno");
  const anos = [...new Set(todos.map(a => a.ano))].sort((a, b) => {
    const ia = CONFIG.anosFaculdade.indexOf(a), ib = CONFIG.anosFaculdade.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
  });
  const naEquipe = f.ano === ANO_EQUIPE_PAINEL;
  if(f.ano !== "todos" && !naEquipe && !anos.includes(f.ano)) f.ano = "todos";
  const recorte = naEquipe ? equipe : (f.ano === "todos" ? todos : todos.filter(a => a.ano === f.ano));
  const aprovados = recorte.filter(a => a.status !== "rejeitado" && a.status !== "inativo");
  const soma = (lista, k) => lista.reduce((s, a) => s + (a[k] || 0), 0);
  const ativos7 = aprovados.filter(a => a.r7 > 0 || (a.ultimoCartao && diasDesde(a.ultimoCartao) < 7)).length;
  const parados = naEquipe ? 0 : aprovados.filter(a => { const al = alertasDoAluno(a); return al.lista.some(x => x.tipo === "parado" || x.tipo === "nunca"); }).length;
  const quem = naEquipe ? "pessoa(s) da equipe" : "aluno(s)";

  // o acerto somado do recorte: o ano escolhido, ou todos os anos
  const mediaDoRecorte = naEquipe ? null : mediaDoPainel(dados.medias, f.ano === "todos" ? null : f.ano, null);
  const motivoSemMedia = semFuncaoMedias ? "o banco ainda não tem acerto_por_turma() — rode o esquema.sql"
    : "menos de " + CONFIG.minAlunosParaMedia + " alunos com resposta";

  // por ano (só na visão "todos")
  const linhasAnos = anos.map(ano => {
    const l = todos.filter(a => a.ano === ano && a.status !== "rejeitado" && a.status !== "inativo");
    return { ano, n: l.length, ativos: l.filter(a => a.r7 > 0).length, r30: soma(l, "r30"),
             cartoes30: soma(l, "cartoes30"), sims: soma(l, "simulados"), media: mediaDoPainel(dados.medias, ano, null) };
  });
  // por turma dentro do recorte
  const chavesTurma = {};
  aprovados.forEach(a => { if(naEquipe) return; const k = a.ano + "|" + (a.grupoId || ""); (chavesTurma[k] = chavesTurma[k] || { ano: a.ano, grupoId: a.grupoId || "", lista: [] }).lista.push(a); });
  const linhasTurmas = Object.values(chavesTurma).map(t => ({
    ano: t.ano, grupoId: t.grupoId, n: t.lista.length, ativos: t.lista.filter(a => a.r7 > 0).length, r30: soma(t.lista, "r30"),
    cartoes30: soma(t.lista, "cartoes30"), media: mediaDoPainel(dados.medias, t.ano, t.grupoId),
  })).sort((x, y) => {
    const ia = CONFIG.anosFaculdade.indexOf(x.ano), ib = CONFIG.anosFaculdade.indexOf(y.ano);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || (nomeDoGrupoPainel(x.grupoId) || "zzz").localeCompare(nomeDoGrupoPainel(y.grupoId) || "zzz", "pt-BR");
  });
  // grandes áreas do recorte (somadas)
  const areas = mediaDoRecorte ? db.taxonomia.areas.map(area => {
    const v = mediaDoRecorte.porArea[area.id];
    return { nome: area.nome, t: v ? +v[0] : 0, a: v ? +v[1] : 0 };
  }) : [];
  // semana a semana do recorte
  const semanasMapa = {};
  dados.semanas.filter(s => f.ano === "todos" || s.ano === f.ano).forEach(s => {
    const k = s.semana; const x = semanasMapa[k] = semanasMapa[k] || { alunos: 0, respostas: 0, acertos: 0, semAcerto: false };
    x.alunos += s.alunos; x.respostas += s.respostas;
    if(s.acertos === null) x.semAcerto = true; else x.acertos += s.acertos;
  });
  const semanasOrdenadas = Object.keys(semanasMapa).sort().slice(-12);
  const grafSemanas = graficoBarrasVerticaisSvg(semanasOrdenadas.map(k => ({
    label: formatDataBR(k).slice(0,5), taxa: semanasMapa[k].respostas && !semanasMapa[k].semAcerto ? pct(semanasMapa[k].acertos, semanasMapa[k].respostas) : null,
    total: semanasMapa[k].respostas, acertos: semanasMapa[k].acertos,
  })), { altura: 110, larguraMax: 26 });

  // pessoas
  const busca = (f.busca || "").trim().toLowerCase();
  let lista = recorte.map(a => Object.assign({}, a, { _al: alertasDoAluno(a) }));
  if(busca) lista = lista.filter(a => (a.nome + " " + a.email).toLowerCase().includes(busca));
  // "nunca usou" (ultima nula) fica sempre no fim, nas duas direções do último uso
  const ultimoUso = a => a._al.ultima || "";
  const ordens = {
    ultimo: (x, y) => !!ultimoUso(y) - !!ultimoUso(x) || ultimoUso(y).localeCompare(ultimoUso(x)) || x.nome.localeCompare(y.nome),
    parado: (x, y) => !!ultimoUso(y) - !!ultimoUso(x) || ultimoUso(x).localeCompare(ultimoUso(y)) || x.nome.localeCompare(y.nome),
    nome: (x, y) => x.nome.localeCompare(y.nome),
    ativos: (x, y) => y.r30 - x.r30 || x.nome.localeCompare(y.nome),
  };
  lista.sort(ordens[f.ordem] || ordens.ultimo);
  const p = paginar(lista, "painel-turma", { assinatura: JSON.stringify(f) });

  const origem = pd.origem === "nuvem"
    ? `Dados da nuvem — todos os cadastrados, de qualquer aparelho. Atualizado ${pd.em ? "às " + new Date(pd.em).toLocaleTimeString("pt-BR", {hour:"2-digit", minute:"2-digit"}) : ""}. <button class="link-btn" onclick="carregarPainelTurma(true); render()">atualizar</button>`
    : (nuvemLigada() ? "Você não está numa conta da nuvem: estes são só as pessoas com conta NESTE navegador. Entre com a sua conta da nuvem para ver a turma inteira."
                     : "Nuvem desligada: estas são as pessoas com conta neste navegador.");

  return `
  <p class="text-xs muted mb-2">${origem}</p>
  <div class="tabs">
    <div class="tab ${f.ano==="todos"?"active":""}" onclick="mudarFiltroPainelTurma('ano','todos')">Todos os anos (${todos.length})</div>
    ${anos.map(ano => `<div class="tab ${f.ano===ano?"active":""}" onclick="mudarFiltroPainelTurma('ano', ${escapeHtml(JSON.stringify(ano))})">${escapeHtml(ano)} (${todos.filter(a=>a.ano===ano).length})</div>`).join("")}
    <div class="tab ${naEquipe?"active":""}" onclick="mudarFiltroPainelTurma('ano', '${ANO_EQUIPE_PAINEL}')">Equipe (${equipe.length})</div>
  </div>

  <div class="grid grid-4 compacto mb-2">
    <div class="stat-tile"><div class="stat-value">${aprovados.length}</div><div class="stat-label">${quem}${recorte.length!==aprovados.length?` (+${recorte.length-aprovados.length} inativo/recusado)`:""}</div></div>
    <div class="stat-tile"><div class="stat-value">${ativos7}</div><div class="stat-label">usaram nos últimos 7 dias${aprovados.length?` (${pct(ativos7, aprovados.length)}%)`:""}</div></div>
    <div class="stat-tile"><div class="stat-value">${aprovados.length ? Math.round(soma(aprovados,"r30")/aprovados.length) : 0}</div><div class="stat-label">questões por pessoa nos últimos 30 dias (${soma(aprovados,"r30")} no total)</div></div>
    ${naEquipe
      ? `<div class="stat-tile"><div class="stat-value">${soma(aprovados,"cartoes30")}</div><div class="stat-label">cartões revisados nos últimos 30 dias</div></div>`
      : `<div class="stat-tile"><div class="stat-value">${mediaDoRecorte && mediaDoRecorte.r30 ? pct(mediaDoRecorte.a30, mediaDoRecorte.r30)+"%" : "—"}</div><div class="stat-label">${mediaDoRecorte ? "acerto médio da turma nos últimos 30 dias" : "acerto médio da turma: "+escapeHtml(motivoSemMedia)}${parados?` · <strong>${parados} parado(s)</strong>`:""}</div></div>`}
  </div>

  ${f.ano==="todos" && linhasAnos.length > 1 ? `<div class="card mb-2">
    <div class="card-title">Ano a ano</div>
    <div class="table-wrap"><table>
      <thead><tr><th>Ano</th><th>Alunos</th><th>Ativos (7 dias)</th><th>Questões/aluno (30 dias)</th><th>Acerto médio (30 dias)</th><th>Acerto médio geral</th><th>Cartões (30 dias)</th><th>Simulados feitos</th></tr></thead>
      <tbody>${linhasAnos.map(l => `<tr class="clicavel" onclick="mudarFiltroPainelTurma('ano', ${escapeHtml(JSON.stringify(l.ano))})">
        <td class="text-sm peso-600">${escapeHtml(l.ano)}</td><td class="text-sm">${l.n}</td>
        <td class="text-sm">${l.ativos} <span class="text-xs muted">${l.n?pct(l.ativos,l.n)+"%":""}</span></td>
        <td class="text-sm">${l.n?Math.round(l.r30/l.n):0}</td>
        <td>${l.media ? badgeTaxa(l.media.a30, l.media.r30) : '<span class="text-xs muted" title="'+escapeHtml(motivoSemMedia)+'">—</span>'}</td>
        <td>${l.media ? badgeTaxa(l.media.acertos, l.media.respostas) : '<span class="text-xs muted" title="'+escapeHtml(motivoSemMedia)+'">—</span>'}</td>
        <td class="text-sm">${l.cartoes30}</td><td class="text-sm">${l.sims}</td></tr>`).join("")}</tbody>
    </table></div>
  </div>` : ""}

  ${!naEquipe && linhasTurmas.length ? `<details class="secao-expansivel" ${secaoAbertaPainel("turmas")?"open":""} ontoggle="guardarSecaoPainel('turmas', this.open)">
    <summary><span class="card-title sem-m">Por turma</span><span class="text-xs muted">${linhasTurmas.length} turma(s)</span></summary>
    <div class="secao-corpo">
    <p class="text-xs muted">Cada turma do rodízio ("Grupo A", "Grupo B"…) e quem ainda não escolheu turma. O acerto médio só aparece com ${CONFIG.minAlunosParaMedia} alunos ou mais respondendo: com menos, seria o acerto de uma pessoa.</p>
    <div class="table-wrap mt-1"><table>
      <thead><tr><th>Turma</th><th>Alunos</th><th>Ativos (7 dias)</th><th>Questões/aluno (30 dias)</th><th>Acerto médio (30 dias)</th><th>Cartões (30 dias)</th></tr></thead>
      <tbody>${linhasTurmas.map(l => `<tr>
        <td class="text-sm"><strong>${escapeHtml(nomeDoGrupoPainel(l.grupoId) || "Sem turma escolhida")}</strong>${f.ano==="todos" ? `<div class="text-xs muted">${escapeHtml(l.ano)}</div>` : ""}</td>
        <td class="text-sm">${l.n}</td>
        <td class="text-sm">${l.ativos} <span class="text-xs muted">${l.n?pct(l.ativos,l.n)+"%":""}</span></td>
        <td class="text-sm">${l.n?Math.round(l.r30/l.n):0}</td>
        <td>${l.media ? badgeTaxa(l.media.a30, l.media.r30) : '<span class="text-xs muted">—</span>'}</td>
        <td class="text-sm">${l.cartoes30}</td></tr>`).join("")}</tbody>
    </table></div>
    </div>
  </details>` : ""}

  ${naEquipe ? "" : `<div class="grid grid-2 mb-2">
    <div class="card">
      <div class="card-title">Semana a semana</div>
      <p class="text-xs muted">Acerto médio de cada semana (barra) e quantos alunos estudaram nela. Semana com menos de ${CONFIG.minAlunosParaMedia} alunos ativos não mostra acerto.</p>
      <div class="mt-2">${semanasOrdenadas.length ? grafSemanas : '<div class="text-sm muted">Ninguém deste recorte respondeu questões nas últimas 12 semanas.</div>'}</div>
      ${semanasOrdenadas.length ? `<div class="text-xs muted mt-1">Alunos ativos por semana: ${semanasOrdenadas.map(k=>`<span class="nowrap">${formatDataBR(k).slice(0,5)}: <strong>${semanasMapa[k].alunos}</strong></span>`).join(" · ")}</div>` : ""}
    </div>
    <div class="card">
      <div class="card-title">Grandes áreas</div>
      <p class="text-xs muted">Todas as respostas do recorte, somadas.</p>
      ${mediaDoRecorte ? `<div class="table-wrap mt-1"><table>
        <thead><tr><th>Grande área</th><th>Questões</th><th>Acerto médio</th></tr></thead>
        <tbody>${areas.map(a=>`<tr><td class="text-sm">${escapeHtml(a.nome)}</td><td class="text-sm">${a.t}</td><td>${badgeTaxa(a.a, a.t)}</td></tr>`).join("")}</tbody>
      </table></div>` : `<p class="text-sm muted mt-1">Sem média para mostrar: ${escapeHtml(motivoSemMedia)}.</p>`}
    </div>
  </div>`}

  <details class="secao-expansivel" ${secaoAbertaPainel("pessoas")?"open":""} ontoggle="guardarSecaoPainel('pessoas', this.open)">
    <summary><span class="card-title sem-m">${naEquipe ? "Equipe" : "Alunos "+(f.ano==="todos"?"":"do "+escapeHtml(f.ano))}</span><span class="text-xs muted">${lista.length} ${naEquipe ? "pessoa(s)" : "aluno(s)"}${parados?` · ${parados} parado(s)`:""}</span></summary>
    <div class="secao-corpo">
    <div class="flex justify-between items-center quebra-gap">
      <div class="flex gap-1 items-center quebra">
        <input class="input" style="max-width:220px" placeholder="Buscar por nome ou e-mail" value="${escapeHtml(f.busca||"")}" onchange="mudarFiltroPainelTurma('busca', this.value)">
        <select class="select" style="max-width:220px" onchange="mudarFiltroPainelTurma('ordem', this.value)">
          <option value="ultimo" ${!ordens[f.ordem]||f.ordem==="ultimo"?"selected":""}>Último uso: mais recente primeiro</option>
          <option value="parado" ${f.ordem==="parado"?"selected":""}>Último uso: mais antigo primeiro</option>
          <option value="ativos" ${f.ordem==="ativos"?"selected":""}>Mais ativos (30 dias)</option>
          <option value="nome" ${f.ordem==="nome"?"selected":""}>Nome</option>
        </select>
        <button class="btn btn-secondary btn-sm" onclick="exportarPainelTurmaCsv()">${iconeSvg("download")} Baixar planilha (CSV)</button>
      </div>
    </div>
    <div class="table-wrap mt-2"><table>
      <thead><tr><th>${naEquipe ? "Pessoa" : "Aluno"}</th><th>${naEquipe ? "Papel" : "Ano / turma"}</th><th>Último uso</th><th>Dias ativos (30)</th><th>Questões (30 dias)</th><th>Questões (total)</th><th>Cartões (30 dias)</th><th>Simulados</th>${naEquipe ? "" : "<th>Condição</th>"}</tr></thead>
      <tbody>${p.itens.map(a => {
        const al = a._al;
        return `<tr>
          <td class="text-sm"><strong>${escapeHtml(a.nome)}</strong><div class="text-xs muted">${escapeHtml(a.email)}${a.status && a.status!=="aprovado" ? " · "+escapeHtml(a.status) : ""}</div></td>
          <td class="text-sm">${naEquipe ? escapeHtml(rotuloPapelPainel(a.papel)) : escapeHtml(a.ano)+(nomeDoGrupoPainel(a.grupoId)?`<div class="text-xs muted">${escapeHtml(nomeDoGrupoPainel(a.grupoId))}</div>`:"")}</td>
          <td class="text-sm">${al.ultima ? (al.parado===0 ? "hoje" : al.parado===1 ? "ontem" : "há "+al.parado+" dias") : '<span class="muted">nunca</span>'}</td>
          <td class="text-sm">${a.dias30}</td>
          <td class="text-sm">${a.r30}</td>
          <td class="text-sm">${a.respostas}</td>
          <td class="text-sm">${a.cartoes30}</td>
          <td class="text-sm">${a.simulados || "—"}</td>
          ${naEquipe ? "" : `<td>${badgeCondicao(al.condicao)}</td>`}
        </tr>`;
      }).join("") || `<tr><td colspan="9" class="text-sm muted">${naEquipe ? "Ninguém da equipe neste navegador." : "Nenhum aluno neste recorte."}</td></tr>`}</tbody>
    </table></div>
    ${controlesPaginacao(p, naEquipe ? "pessoa(s)" : "aluno(s)")}
    <p class="text-xs muted mt-2">"Condição": <em>em dia</em> (usou nos últimos 7 dias), <em>parado</em> (7 dias ou mais sem responder questão nem revisar cartão) ou <em>nunca estudou</em>. ${naEquipe ? "A equipe não tem condição: o painel só mostra o quanto usa." : ""} O painel mostra uso; a taxa de acerto de cada pessoa é só dela, em Meu Desempenho.</p>
    </div>
  </details>`;
}
function exportarPainelTurmaCsv(){
  const pd = state.filtroRota.painelDados; if(!pd || !pd.dados) return;
  const f = filtrosPainelTurma();
  const naEquipe = f.ano === ANO_EQUIPE_PAINEL;
  const lista = pd.dados.pessoas.filter(a => naEquipe ? a.papel !== "aluno" : (a.papel === "aluno" && (f.ano === "todos" || a.ano === f.ano)));
  const campo = v => { const t = v === null || v === undefined ? "" : String(v); return /[";\n]/.test(t) ? '"' + t.replace(/"/g, '""') + '"' : t; };
  // só uso: o acerto de cada pessoa não sai nem na planilha
  const cab = ["nome","email","papel","ano","turma","status","ultima_atividade","dias_ativos_30d","questoes_30d","questoes_total","cartoes_30d","simulados","condicao"];
  const linhas = lista.map(a => { const al = a.papel === "aluno" ? alertasDoAluno(a) : { ultima: [a.ultimaResposta, a.ultimoCartao].filter(Boolean).sort().pop() || "", condicao: null };
    return [a.nome, a.email, a.papel, a.ano, nomeDoGrupoPainel(a.grupoId), a.status, al.ultima || "", a.dias30, a.r30, a.respostas, a.cartoes30, a.simulados,
      al.condicao ? al.condicao.texto : ""].map(campo).join(";"); });
  // ";" e BOM: é o que o Excel em português abre sem assistente de importação
  baixarArquivo("painel-turma-" + (f.ano === "todos" ? "todos" : f.ano.replace(/[^0-9a-z]+/gi, "-")) + "-" + hojeISO() + ".csv",
    "﻿" + cab.join(";") + "\n" + linhas.join("\n"), "text/csv;charset=utf-8");
}
