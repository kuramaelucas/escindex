/* codigo/11d-painel-da-turma.js — Painel da Turma (seção 24-C).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   24-C. PAINEL DA TURMA — como os alunos estão indo e usando a plataforma
   ==========================================================================
   Só professor e administrador (coordenação e máster — ver a permissão
   "turma" em PERMISSOES_ADMIN). Separado por ano da faculdade, porque é
   assim que a coordenação pensa: o 3º ano está usando? o 5º está caindo?

   De onde vêm os números:
     - nuvem ligada: das funções painel_turma() e atividade_por_semana() do
       esquema.sql, que somam no próprio banco e devolvem uma linha por
       aluno — números, nunca respostas, anotações ou cartões pessoais. O
       banco confere o papel de quem pede: para qualquer outra pessoa, as
       duas devolvem nada;
     - nuvem desligada: das contas deste navegador (demonstração), com a
       mesma conta — a tela é a mesma, e diz de onde veio.

   Os ALERTAS são o motivo de a tela existir: quem parou de estudar (7 dias
   ou mais sem questão nem cartão), quem nunca começou, e quem caiu 10
   pontos ou mais de um mês para o outro (com pelo menos 20 questões nos
   dois meses, para não alarmar por acaso). */
function podeVerPainelTurma(u){
  u = u || usuarioAtual();
  if(!u || state.modoAluno) return false;
  return u.papel === "professor" || podeAdmin("turma", u);
}
function filtrosPainelTurma(){
  if(!state.filtroRota.painel) state.filtroRota.painel = { ano: "todos", ordem: "alerta", busca: "" };
  return state.filtroRota.painel;
}
function mudarFiltroPainelTurma(campo, valor){ filtrosPainelTurma()[campo] = valor; render(); }

/* Os dados de todos os alunos, do mesmo jeito venham da nuvem ou daqui. */
function normalizarAlunoDaNuvem(l){
  return {
    id: l.usuario_id, nome: l.nome || "(sem nome)", email: l.email || "", ano: l.ano_faculdade || "(sem ano)",
    grupoId: l.grupo_id || null, status: l.status, criadoEm: (l.criado_em || "").slice(0,10),
    respostas: +l.respostas || 0, acertos: +l.acertos || 0, r7: +l.respostas_7d || 0, a7: +l.acertos_7d || 0,
    r30: +l.respostas_30d || 0, a30: +l.acertos_30d || 0, r60: +l.respostas_30a60d || 0, a60: +l.acertos_30a60d || 0,
    dias30: +l.dias_ativos_30d || 0, ultimaResposta: l.ultima_resposta || null,
    cartoes: +l.cartoes_total || 0, cartoes30: +l.cartoes_30d || 0, ultimoCartao: l.ultimo_cartao || null,
    simulados: +l.simulados || 0, mediaSimulados: l.media_simulados !== null && l.media_simulados !== undefined ? Math.round(+l.media_simulados) : null,
    porArea: l.por_area || {},
  };
}
function painelTurmaLocal(){
  const hoje = hojeISO();
  const d7 = somarDias(hoje, -7), d30 = somarDias(hoje, -30), d60 = somarDias(hoje, -60);
  const alunos = db.usuarios.filter(u => u.papel === "aluno").map(u => {
    const rs = db.respostas.filter(r => r.usuarioId === u.id);
    const conta = (lista) => ({ t: lista.length, a: lista.filter(r => r.correta).length });
    const tudo = conta(rs), s7 = conta(rs.filter(r => r.data > d7)), s30 = conta(rs.filter(r => r.data > d30)),
          s60 = conta(rs.filter(r => r.data <= d30 && r.data > d60));
    const porArea = {};
    rs.forEach(r => { const k = r.areaId || "?"; porArea[k] = porArea[k] || [0,0]; porArea[k][0]++; if(r.correta) porArea[k][1]++; });
    const dias = (db.cartoesPorDia && db.cartoesPorDia[u.id]) || {};
    const sims = db.resultadosSimulados.filter(r => r.usuarioId === u.id);
    return {
      id: u.id, nome: u.nome, email: u.email || "", ano: u.anoFaculdade || "(sem ano)", grupoId: u.grupoId || null,
      status: u.status, criadoEm: u.criadoEm || "",
      respostas: tudo.t, acertos: tudo.a, r7: s7.t, a7: s7.a, r30: s30.t, a30: s30.a, r60: s60.t, a60: s60.a,
      dias30: new Set(rs.filter(r => r.data > d30).map(r => r.data)).size,
      ultimaResposta: rs.length ? rs.map(r => r.data).sort().pop() : null,
      cartoes: Object.values(dias).reduce((s, n) => s + (+n || 0), 0),
      cartoes30: Object.entries(dias).filter(([d]) => d > d30).reduce((s, [, n]) => s + (+n || 0), 0),
      ultimoCartao: Object.keys(dias).sort().pop() || null,
      simulados: sims.length, mediaSimulados: sims.length ? Math.round(sims.reduce((s, r) => s + r.nota, 0) / sims.length) : null,
      porArea,
    };
  });
  const semanas = {};
  db.respostas.forEach(r => {
    const u = getUsuario(r.usuarioId); if(!u || u.papel !== "aluno" || !r.data || r.data <= somarDias(hoje, -84)) return;
    const d = new Date(r.data + "T00:00:00"); const seg = somarDias(r.data, -((d.getDay() + 6) % 7));
    const k = (u.anoFaculdade || "(sem ano)") + "|" + seg;
    const s = semanas[k] = semanas[k] || { ano: u.anoFaculdade || "(sem ano)", semana: seg, alunos: new Set(), respostas: 0, acertos: 0 };
    s.alunos.add(u.id); s.respostas++; if(r.correta) s.acertos++;
  });
  return { alunos, semanas: Object.values(semanas).map(s => ({ ano: s.ano, semana: s.semana, alunos: s.alunos.size, respostas: s.respostas, acertos: s.acertos })) };
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
      alunos: r.alunos.map(normalizarAlunoDaNuvem),
      semanas: r.semanas.map(s => ({ ano: s.ano_faculdade, semana: s.semana, alunos: +s.alunos_ativos, respostas: +s.respostas, acertos: +s.acertos })),
    }};
    if(state.route === "painel-turma") render();
  }).catch(e => {
    state.filtroRota.painelDados = { origem: "nuvem", erro: e.status === 404
      ? "O banco ainda não tem as funções do painel. Rode o nuvem/esquema.sql inteiro no Supabase (SQL Editor > Run) — ele cria painel_turma() e atividade_por_semana() sem mexer no resto."
      : (e.message || "Não foi possível carregar o painel.") };
    if(state.route === "painel-turma") render();
  });
}
function diasDesde(iso){ return iso ? diasEntre(iso, hojeISO()) : null; }
function alertasDoAluno(a){
  const ultima = [a.ultimaResposta, a.ultimoCartao].filter(Boolean).sort().pop() || null;
  const parado = diasDesde(ultima);
  const lista = [];
  if(ultima === null) lista.push({ tipo: "nunca", texto: "nunca estudou", peso: 2 });
  else if(parado >= 7) lista.push({ tipo: "parado", texto: `parado há ${parado} dias`, peso: 3 + Math.min(parado, 60)/60 });
  if(a.r30 >= 20 && a.r60 >= 20){
    const queda = pct(a.a60, a.r60) - pct(a.a30, a.r30);
    if(queda >= 10) lista.push({ tipo: "queda", texto: `acerto caiu ${queda} p.p.`, peso: 2 + queda/100 });
  }
  return { lista, ultima, parado, peso: lista.reduce((s, x) => Math.max(s, x.peso), 0) };
}
function badgeTaxa(t, n){
  if(!n) return '<span class="text-xs muted">—</span>';
  const v = pct(t, n);
  return `<span class="badge ${v<50?"badge-danger":v<70?"badge-amber":"badge-accent"}">${v}%</span>`;
}
function nomeDoGrupoPainel(id){ const g = id ? getGrupo(id) : null; return g ? g.nome : ""; }

function renderPainelTurma(){
  const u = usuarioAtual();
  if(!podeVerPainelTurma(u)) return renderSemPermissao("turma");
  carregarPainelTurma(false);
  const f = filtrosPainelTurma();
  const pd = state.filtroRota.painelDados || {};
  const cabecalho = `<div class="page-header"><h2>Painel da Turma</h2><p>Como os alunos estão indo e como estão usando a plataforma, separado por ano da faculdade. Visível só para professores e para a coordenação.</p></div>`;
  if(pd.erro) return cabecalho + `<div class="card" style="border-color:var(--danger)"><div class="card-title">${iconeSvg("alert")} Não deu para carregar</div><p class="text-sm">${escapeHtml(pd.erro)}</p><button class="btn btn-secondary btn-sm mt-2" onclick="carregarPainelTurma(true); render()">Tentar de novo</button></div>`;
  if(!pd.dados) return cabecalho + `<div class="card"><p class="text-sm muted">Carregando os números da turma…</p></div>`;

  const todos = pd.dados.alunos;
  const anos = [...new Set(todos.map(a => a.ano))].sort((a, b) => {
    const ia = CONFIG.anosFaculdade.indexOf(a), ib = CONFIG.anosFaculdade.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
  });
  if(f.ano !== "todos" && !anos.includes(f.ano)) f.ano = "todos";
  let recorte = f.ano === "todos" ? todos : todos.filter(a => a.ano === f.ano);
  const aprovados = recorte.filter(a => a.status !== "rejeitado" && a.status !== "inativo");
  const soma = (lista, k) => lista.reduce((s, a) => s + (a[k] || 0), 0);
  const ativos7 = aprovados.filter(a => a.r7 > 0 || (a.ultimoCartao && diasDesde(a.ultimoCartao) < 7)).length;
  const parados = aprovados.filter(a => { const al = alertasDoAluno(a); return al.lista.some(x => x.tipo === "parado" || x.tipo === "nunca"); }).length;

  // por ano (só na visão "todos")
  const linhasAnos = anos.map(ano => {
    const l = todos.filter(a => a.ano === ano && a.status !== "rejeitado" && a.status !== "inativo");
    const at = l.filter(a => a.r7 > 0).length;
    return { ano, n: l.length, ativos: at, r30: soma(l, "r30"), a30: soma(l, "a30"), resp: soma(l, "respostas"), ac: soma(l, "acertos"),
             cartoes30: soma(l, "cartoes30"), sims: soma(l, "simulados") };
  });
  // grandes áreas do recorte
  const areas = db.taxonomia.areas.map(area => {
    let t = 0, a = 0;
    aprovados.forEach(al => { const v = al.porArea[area.id]; if(v){ t += +v[0]; a += +v[1]; } });
    return { nome: area.nome, t, a };
  });
  // semana a semana do recorte
  const semanasMapa = {};
  pd.dados.semanas.filter(s => f.ano === "todos" || s.ano === f.ano).forEach(s => {
    const k = s.semana; const x = semanasMapa[k] = semanasMapa[k] || { alunos: 0, respostas: 0, acertos: 0 };
    x.alunos += s.alunos; x.respostas += s.respostas; x.acertos += s.acertos;
  });
  const semanasOrdenadas = Object.keys(semanasMapa).sort().slice(-12);
  const grafSemanas = graficoBarrasVerticaisSvg(semanasOrdenadas.map(k => ({
    label: formatDataBR(k).slice(0,5), taxa: semanasMapa[k].respostas ? pct(semanasMapa[k].acertos, semanasMapa[k].respostas) : null,
    total: semanasMapa[k].respostas, acertos: semanasMapa[k].acertos,
  })), { altura: 120, larguraMax: 34 });

  // alunos
  const busca = (f.busca || "").trim().toLowerCase();
  let lista = recorte.map(a => Object.assign({}, a, { _al: alertasDoAluno(a) }));
  if(busca) lista = lista.filter(a => (a.nome + " " + a.email).toLowerCase().includes(busca));
  const ordens = {
    alerta: (x, y) => y._al.peso - x._al.peso || x.nome.localeCompare(y.nome),
    nome: (x, y) => x.nome.localeCompare(y.nome),
    ativos: (x, y) => y.r30 - x.r30 || x.nome.localeCompare(y.nome),
    acerto: (x, y) => (x.r30 ? x.a30/x.r30 : 2) - (y.r30 ? y.a30/y.r30 : 2),
  };
  lista.sort(ordens[f.ordem] || ordens.alerta);
  const p = paginar(lista, "painel-turma", { assinatura: JSON.stringify(f) });

  const origem = pd.origem === "nuvem"
    ? `Dados da nuvem — todos os alunos cadastrados, de qualquer aparelho. Atualizado ${pd.em ? "às " + new Date(pd.em).toLocaleTimeString("pt-BR", {hour:"2-digit", minute:"2-digit"}) : ""}. <button class="link-btn" onclick="carregarPainelTurma(true); render()">atualizar</button>`
    : (nuvemLigada() ? "Você não está numa conta da nuvem: estes são só os alunos com conta NESTE navegador. Entre com a sua conta da nuvem para ver a turma inteira."
                     : "Nuvem desligada: estes são os alunos com conta neste navegador.");

  return cabecalho + `
  <p class="text-xs muted mb-2">${origem}</p>
  <div class="tabs">
    <div class="tab ${f.ano==="todos"?"active":""}" onclick="mudarFiltroPainelTurma('ano','todos')">Todos os anos (${todos.length})</div>
    ${anos.map(ano => `<div class="tab ${f.ano===ano?"active":""}" onclick="mudarFiltroPainelTurma('ano', ${escapeHtml(JSON.stringify(ano))})">${escapeHtml(ano)} (${todos.filter(a=>a.ano===ano).length})</div>`).join("")}
  </div>

  <div class="grid grid-4 mb-2">
    <div class="stat-tile"><div class="stat-value">${aprovados.length}</div><div class="stat-label">aluno(s)${recorte.length!==aprovados.length?` (+${recorte.length-aprovados.length} inativo/recusado)`:""}</div></div>
    <div class="stat-tile"><div class="stat-value">${ativos7}</div><div class="stat-label">estudaram nos últimos 7 dias${aprovados.length?` (${pct(ativos7, aprovados.length)}%)`:""}</div></div>
    <div class="stat-tile"><div class="stat-value">${aprovados.length ? Math.round(soma(aprovados,"r30")/aprovados.length) : 0}</div><div class="stat-label">questões por aluno nos últimos 30 dias (${soma(aprovados,"r30")} no total)</div></div>
    <div class="stat-tile"><div class="stat-value">${soma(aprovados,"r30") ? pct(soma(aprovados,"a30"), soma(aprovados,"r30"))+"%" : "—"}</div><div class="stat-label">acerto da turma nos últimos 30 dias${parados?` · <strong style="color:var(--danger)">${parados} parado(s)</strong>`:""}</div></div>
  </div>

  ${f.ano==="todos" && linhasAnos.length > 1 ? `<div class="card mb-2">
    <div class="card-title">Ano a ano</div>
    <div class="table-wrap"><table>
      <thead><tr><th>Ano</th><th>Alunos</th><th>Ativos (7 dias)</th><th>Questões/aluno (30 dias)</th><th>Acerto (30 dias)</th><th>Acerto geral</th><th>Cartões (30 dias)</th><th>Simulados feitos</th></tr></thead>
      <tbody>${linhasAnos.map(l => `<tr style="cursor:pointer" onclick="mudarFiltroPainelTurma('ano', ${escapeHtml(JSON.stringify(l.ano))})">
        <td class="text-sm" style="font-weight:600">${escapeHtml(l.ano)}</td><td class="text-sm">${l.n}</td>
        <td class="text-sm">${l.ativos} <span class="text-xs muted">${l.n?pct(l.ativos,l.n)+"%":""}</span></td>
        <td class="text-sm">${l.n?Math.round(l.r30/l.n):0}</td><td>${badgeTaxa(l.a30, l.r30)}</td><td>${badgeTaxa(l.ac, l.resp)}</td>
        <td class="text-sm">${l.cartoes30}</td><td class="text-sm">${l.sims}</td></tr>`).join("")}</tbody>
    </table></div>
  </div>` : ""}

  <div class="grid grid-2 mb-2">
    <div class="card">
      <div class="card-title">Semana a semana</div>
      <p class="text-xs muted">Acerto de cada semana (barra) e quantos alunos estudaram nela.</p>
      <div class="mt-2">${semanasOrdenadas.length ? grafSemanas : '<div class="text-sm muted">Ninguém deste recorte respondeu questões nas últimas 12 semanas.</div>'}</div>
      ${semanasOrdenadas.length ? `<div class="text-xs muted mt-1">Alunos ativos por semana: ${semanasOrdenadas.map(k=>`<span class="nowrap">${formatDataBR(k).slice(0,5)}: <strong>${semanasMapa[k].alunos}</strong></span>`).join(" · ")}</div>` : ""}
    </div>
    <div class="card">
      <div class="card-title">Grandes áreas</div>
      <p class="text-xs muted">Todas as respostas do recorte, somadas.</p>
      <div class="table-wrap mt-1"><table>
        <thead><tr><th>Grande área</th><th>Questões</th><th>Acerto</th></tr></thead>
        <tbody>${areas.map(a=>`<tr><td class="text-sm">${escapeHtml(a.nome)}</td><td class="text-sm">${a.t}</td><td>${badgeTaxa(a.a, a.t)}</td></tr>`).join("")}</tbody>
      </table></div>
    </div>
  </div>

  <div class="card">
    <div class="flex justify-between items-center" style="flex-wrap:wrap;gap:.5rem">
      <div class="card-title" style="margin:0">Alunos ${f.ano==="todos"?"":"do "+escapeHtml(f.ano)}</div>
      <div class="flex gap-1 items-center" style="flex-wrap:wrap">
        <input class="input" style="max-width:220px" placeholder="Buscar por nome ou e-mail" value="${escapeHtml(f.busca||"")}" onchange="mudarFiltroPainelTurma('busca', this.value)">
        <select class="select" style="max-width:220px" onchange="mudarFiltroPainelTurma('ordem', this.value)">
          <option value="alerta" ${f.ordem==="alerta"?"selected":""}>Quem precisa de atenção primeiro</option>
          <option value="ativos" ${f.ordem==="ativos"?"selected":""}>Mais ativos (30 dias)</option>
          <option value="acerto" ${f.ordem==="acerto"?"selected":""}>Menor acerto (30 dias)</option>
          <option value="nome" ${f.ordem==="nome"?"selected":""}>Nome</option>
        </select>
        <button class="btn btn-secondary btn-sm" onclick="exportarPainelTurmaCsv()">${iconeSvg("download")} Baixar planilha (CSV)</button>
      </div>
    </div>
    <div class="table-wrap mt-2"><table>
      <thead><tr><th>Aluno</th><th>Ano / turma</th><th>Última atividade</th><th>Dias ativos (30)</th><th>Questões (30 dias)</th><th>Acerto (30 dias)</th><th>Acerto geral</th><th>Cartões (30 dias)</th><th>Simulados</th><th>Atenção</th></tr></thead>
      <tbody>${p.itens.map(a => {
        const al = a._al;
        const tendencia = (a.r30 >= 20 && a.r60 >= 20) ? (pct(a.a30,a.r30) - pct(a.a60,a.r60)) : null;
        return `<tr>
          <td class="text-sm"><strong>${escapeHtml(a.nome)}</strong><div class="text-xs muted">${escapeHtml(a.email)}${a.status && a.status!=="aprovado" ? " · "+escapeHtml(a.status) : ""}</div></td>
          <td class="text-sm">${escapeHtml(a.ano)}${nomeDoGrupoPainel(a.grupoId)?`<div class="text-xs muted">${escapeHtml(nomeDoGrupoPainel(a.grupoId))}</div>`:""}</td>
          <td class="text-sm">${al.ultima ? (al.parado===0 ? "hoje" : al.parado===1 ? "ontem" : "há "+al.parado+" dias") : '<span class="muted">nunca</span>'}</td>
          <td class="text-sm">${a.dias30}</td>
          <td class="text-sm">${a.r30}</td>
          <td class="text-sm">${badgeTaxa(a.a30, a.r30)}${tendencia!==null && Math.abs(tendencia)>=5 ? ` <span class="text-xs" style="color:${tendencia>0?"var(--accent)":"var(--danger)"}">${tendencia>0?"▲":"▼"}${Math.abs(tendencia)}</span>` : ""}</td>
          <td class="text-sm">${badgeTaxa(a.acertos, a.respostas)} <span class="text-xs muted">${a.respostas}</span></td>
          <td class="text-sm">${a.cartoes30}</td>
          <td class="text-sm">${a.simulados ? a.simulados+` <span class="text-xs muted">média ${a.mediaSimulados}%</span>` : "—"}</td>
          <td>${al.lista.map(x=>`<span class="badge ${x.tipo==="queda"?"badge-amber":"badge-danger"}">${escapeHtml(x.texto)}</span>`).join(" ")}</td>
        </tr>`;
      }).join("") || `<tr><td colspan="10" class="text-sm muted">Nenhum aluno neste recorte.</td></tr>`}</tbody>
    </table></div>
    ${controlesPaginacao(p, "aluno(s)")}
    <p class="text-xs muted mt-2">"Parado" = 7 dias ou mais sem responder questão nem revisar cartão. "Acerto caiu" = queda de 10 pontos ou mais entre os últimos 30 dias e os 30 anteriores, com pelo menos 20 questões em cada. As setas comparam os mesmos dois meses.</p>
  </div>`;
}
function exportarPainelTurmaCsv(){
  const pd = state.filtroRota.painelDados; if(!pd || !pd.dados) return;
  const f = filtrosPainelTurma();
  const lista = pd.dados.alunos.filter(a => f.ano === "todos" || a.ano === f.ano);
  const campo = v => { const t = v === null || v === undefined ? "" : String(v); return /[";\n]/.test(t) ? '"' + t.replace(/"/g, '""') + '"' : t; };
  const cab = ["nome","email","ano","turma","status","ultima_atividade","dias_ativos_30d","questoes_30d","acerto_30d_%","questoes_total","acerto_geral_%","cartoes_30d","simulados","media_simulados_%","alertas"];
  const linhas = lista.map(a => { const al = alertasDoAluno(a); return [a.nome, a.email, a.ano, nomeDoGrupoPainel(a.grupoId), a.status, al.ultima || "", a.dias30, a.r30,
    a.r30 ? pct(a.a30, a.r30) : "", a.respostas, a.respostas ? pct(a.acertos, a.respostas) : "", a.cartoes30, a.simulados, a.mediaSimulados ?? "", al.lista.map(x=>x.texto).join(" / ")].map(campo).join(";"); });
  // ";" e BOM: é o que o Excel em português abre sem assistente de importação
  baixarArquivo("painel-turma-" + (f.ano === "todos" ? "todos" : f.ano.replace(/[^0-9a-z]+/gi, "-")) + "-" + hojeISO() + ".csv",
    "﻿" + cab.join(";") + "\n" + linhas.join("\n"), "text/csv;charset=utf-8");
}
