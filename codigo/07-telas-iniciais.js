/* Esc — codigo/07-telas-iniciais.js  (parte 7 de 13)
   Telas públicas (landing, entrar, cadastro), primeiro acesso, painel inicial, tela Estudar e a questão na íntegra.
   Os arquivos de codigo/ são carregados em ordem pelo index.html (lista
   ESC_ARQUIVOS.codigo) e dividem o mesmo espaço: uma função escrita num
   arquivo é usada nos outros sem import. */

/* ==========================================================================
   8. TELAS PÚBLICAS — landing / login / cadastro
   ========================================================================== */
/* A página de quem chega. Ela diz primeiro o que o Esc É — um projeto sem
   fins lucrativos, de alunos e ex-alunos da Escola Paulista de Medicina,
   para os alunos de lá — e só depois o que ele faz. Os números do resumo
   vêm do conteúdo carregado, não de texto fixo: acrescentar uma prova muda
   a página sozinho. */
function renderLanding(){
  const ativas = questoesAtivas(true);
  const reais = ativas.filter(q=>q.real).length;
  const anosReais = [...new Set(ativas.filter(q=>q.real).map(q=>q.ano))].sort();
  const cartoes = (db.flashcards||[]).filter(c=>!c.usuarioId && c.status!=="arquivado").length;
  const especialidades = (db.taxonomia.especialidades||[]).length;
  const numero = n => n.toLocaleString("pt-BR");
  const capacidades = [
    ["book", numero(ativas.length)+" questões", reais ? numero(reais)+" delas das provas reais da "+CONFIG.bancaFoco+(anosReais.length?" ("+anosReais[0]+"–"+anosReais[anosReais.length-1]+")":"")+", com explicação escrita pela equipe." : "Organizadas por área, especialidade e assunto."],
    ["calendar","No ritmo dos seus blocos","A sessão do dia segue o calendário da sua turma, do 3º ao 6º ano: o bloco atual, revisão do que já passou e uma prévia do próximo."],
    ["refresh","Revisão no momento certo","Cada questão volta quando você está para esquecê-la — e as que você errou voltam antes."],
    ["cards", numero(cartoes)+" flashcards","Para fixar conceito em poucos segundos, com intervalo próprio de revisão."],
    ["clipboard","Provas e simulados","Provas antigas inteiras e simulados cronometrados, com a nota guardada para comparar."],
    ["chart","Seu desempenho, sem mistério","Acerto por área e por "+numero(especialidades)+" especialidades, onde a sua confiança engana e o que revisar hoje."],
  ];
  return `
  <div class="container">
    <nav class="public-nav">
      <div class="brand"><span class="mark">E</span>${CONFIG.nomePlataforma}</div>
      <div class="flex gap-1">
        <button class="icon-btn" onclick="alternarTema()" title="Alternar tema claro/escuro">${iconeSvg("theme")}</button>
        <button class="btn btn-ghost" onclick="navigate('login')">Entrar</button>
        <button class="btn btn-primary" onclick="navigate('cadastro')">Solicitar cadastro</button>
      </div>
    </nav>
    <div class="hero">
      <div>
        <span class="badge badge-accent">Projeto sem fins lucrativos</span>
        <h1 class="mt-2">Feito por quem passou pela EPM, para quem está passando.</h1>
        <p class="mt-2" style="font-size:1.05rem;color:var(--ink-2);max-width:48ch;line-height:1.55">O ${CONFIG.nomePlataforma} é uma plataforma de estudos gratuita para os alunos de medicina da Escola Paulista de Medicina (UNIFESP), administrada por alunos e ex-alunos — do primeiro bloco do curso até a prova de residência.</p>
        <div class="flex gap-1 mt-3" style="flex-wrap:wrap">
          <button class="btn btn-primary" onclick="navigate('cadastro')">Solicitar cadastro</button>
          <button class="btn btn-secondary" onclick="navigate('login')">Já tenho conta</button>
        </div>
        <p class="text-xs muted mt-2">O acesso é liberado depois que alguém da equipe confere o cadastro.</p>
      </div>
      <div class="hero-card">
        <div class="card-title" style="margin-bottom:.6rem">Seja bem-vindo(a)</div>
        <p class="text-sm" style="line-height:1.65">Montamos o ${CONFIG.nomePlataforma} com o material que gostaríamos de ter tido: as provas da nossa escola, organizadas no ritmo dos nossos blocos, com explicação de verdade. <strong>Espero que isso os ajude.</strong></p>
        <p class="text-sm mt-2" style="line-height:1.65">Isto aqui é uma <strong>comunidade</strong>, não um produto. Ninguém é pago e nada é vendido — e a sobrevivência do ${CONFIG.nomePlataforma} depende da ajuda de quem usa: enviar uma questão, corrigir um erro, responder a dúvida de um colega, contribuir com os custos do site.</p>
        <p class="text-xs muted mt-2">— Alunos e ex-alunos da EPM que mantêm o ${CONFIG.nomePlataforma}</p>
      </div>
    </div>
    <div class="card-title">O que você encontra aqui</div>
    <div class="grid grid-3 mt-1">
      ${capacidades.map(([icon,titulo,desc])=>`
        <div class="card-flat">
          <div class="flex items-center gap-1" style="font-weight:700">${iconeSvg(icon)} ${escapeHtml(titulo)}</div>
          <div class="text-sm muted mt-1">${escapeHtml(desc)}</div>
        </div>`).join("")}
    </div>
    <div class="card mt-3">
      <div class="card-title">${iconeSvg("users")} Como ajudar a comunidade</div>
      <div class="grid grid-2 mt-1 text-sm">
        <div>${iconeSvg("upload")} <strong>Envie questões</strong> — de prova, de aula, de lista. Dentro da plataforma, em "Enviar Questões".</div>
        <div>${iconeSvg("flag")} <strong>Sinalize o que está errado</strong> — um gabarito desatualizado ou um erro de digitação, na própria questão.</div>
        <div>${iconeSvg("message")} <strong>Responda dúvidas</strong> — residentes e alunos dos anos acima respondem a fila de dúvidas dos mais novos.</div>
        <div>${iconeSvg("star")} <strong>Apoie os custos</strong> — quem contribui entra no Livro de Ouro, na tela inicial de todo mundo.</div>
      </div>
    </div>
    <div class="card-flat mt-3">
      <div class="text-sm" style="font-weight:600;margin-bottom:.5rem">Quer ver antes de se cadastrar?</div>
      <div class="flex gap-1" style="flex-wrap:wrap">
        <button class="pill" onclick="fazerLoginDemo('aluno')">${iconeSvg("user")} Ver como aluno</button>
      </div>
      <div class="text-xs muted mt-2">Uma conta de demonstração, só neste navegador: nada do que você fizer nela vale para a sua conta de verdade.</div>
    </div>
    <footer class="site-footer">${CONFIG.nomePlataforma} — projeto sem fins lucrativos, mantido por alunos e ex-alunos da Escola Paulista de Medicina (UNIFESP).</footer>
  </div>`;
}

/* ==========================================================================
   PRIMEIRO ACESSO — boas-vindas, grupo e meta
   ==========================================================================
   Aparece uma vez, para o ALUNO que entra pela primeira vez: antes dela, o
   recém-chegado caía num painel que supunha que ele já tinha turma e meta.
   Aqui ele confirma o ano, diz qual é o seu grupo do rodízio e quantas
   questões quer fazer por dia — as três coisas que mudam a sessão do dia.
   "Pular" também conta como visto: a tela não volta a aparecer, e tudo se
   ajusta depois em Meu Grupo e em Estudar. A data sobe no perfil da nuvem
   (boas_vindas_em), para a tela não reaparecer em outro aparelho. */
function precisaDasBoasVindas(u){
  if(!u || u.papel !== "aluno" || state.modoAluno || u.boasVindasEm) return false;
  // contas de demonstração não passam por aqui: quem quer só olhar, olha
  if(SEED_USUARIOS.some(x => x.id === u.id)) return false;
  // quem já estudou ou já escolheu turma não é um recém-chegado — acontece
  // com quem usava a plataforma antes desta tela existir
  if(!getGrupoDoUsuario(u).oficial) return false;
  return !(db.respostas || []).some(r => r.usuarioId === u.id);
}
function renderBoasVindas(){
  const u = usuarioAtual();
  const anoEscolhido = state.filtroRota.boasVindasAno || u.anoFaculdade || CONFIG.anoFaculdadePadrao;
  const comCalendario = temCalendarioProprio(anoEscolhido);
  const minima = (db.configGeral && db.configGeral.metaMinimaQuestoesDia) || 10;
  const ideal = (db.configGeral && db.configGeral.metaRecomendadaQuestoesDia) || CONFIG.metaRecomendadaQuestoesDia;
  const meta = state.filtroRota.boasVindasMeta || metaDoUsuario(u);
  return `
  <div class="container"><nav class="public-nav">
    <div class="brand"><span class="mark">E</span>${CONFIG.nomePlataforma}</div>
    <button class="btn btn-ghost" onclick="concluirBoasVindas(true)">Pular por agora</button>
  </nav></div>
  <div class="auth-wrap">
    <div class="auth-card" style="max-width:560px">
      <h2>Bem-vindo(a), ${escapeHtml((u.nome||"").split(" ")[0])}!</h2>
      <p class="text-sm mt-2" style="line-height:1.6">O ${CONFIG.nomePlataforma} é um projeto sem fins lucrativos, feito por alunos e ex-alunos da Escola Paulista de Medicina para quem está no curso. Esperamos que ele te ajude — e, quando puder, ajude de volta: uma questão enviada, um erro sinalizado ou uma dúvida respondida mantêm a comunidade viva.</p>
      <p class="text-sm muted mt-2">Três perguntas rápidas, para a sua sessão do dia já nascer certa:</p>

      <div class="field mt-2"><label class="label">1. Em que ano do curso você está?</label>
        <select class="select" id="bvAno" onchange="state.filtroRota.boasVindasAno=this.value;state.filtroRota.boasVindasMeta=document.getElementById('bvMeta').value;render()">
          ${CONFIG.anosFaculdade.map(a=>`<option value="${escapeHtml(a)}" ${a===anoEscolhido?"selected":""}>${escapeHtml(a)}</option>`).join("")}
        </select>
      </div>

      <div class="field"><label class="label">2. Qual é o seu grupo do rodízio?</label>
        ${comCalendario ? `<select class="select" id="bvGrupo">
          <option value="">Ainda não sei — escolho depois</option>
          ${opcoesRodizioPorLetra(anoEscolhido).map(o=>`<option value="${o.deslocamento}">Grupo ${escapeHtml(o.rotulo)} — começa em ${escapeHtml(o.bloco.nome)}</option>`).join("")}
        </select>
        <div class="hint mt-1">É a letra do calendário impresso da faculdade. Ela decide qual bloco é o seu agora — e, portanto, a matéria da sua sessão do dia.</div>`
        : `<div class="hint">Quem já se formou não segue calendário de faculdade. Se quiser acompanhar uma turma, entre nela depois em Meu Grupo.</div>`}
      </div>

      <div class="field"><label class="label">3. Quantas questões você quer fazer por dia?</label>
        <input class="input" type="number" id="bvMeta" value="${meta}" min="1" max="300" style="max-width:140px">
        <div class="flex gap-1 mt-1" style="flex-wrap:wrap">
          <button class="pill" onclick="document.getElementById('bvMeta').value=${minima}">dia corrido (${minima})</button>
          <button class="pill" onclick="document.getElementById('bvMeta').value=${ideal}">recomendada (${ideal})</button>
          <button class="pill" onclick="document.getElementById('bvMeta').value=${ideal*2}">reta final (${ideal*2})</button>
        </div>
        <div class="hint mt-1">Dá para mudar quando quiser, em Estudar. Constância vale mais que volume.</div>
      </div>

      <button class="btn btn-primary btn-block mt-2" onclick="concluirBoasVindas(false)">Começar a estudar</button>
    </div>
  </div>`;
}
function concluirBoasVindas(pulou){
  const u = usuarioAtual(); if(!u) return;
  if(!pulou){
    const ano = (document.getElementById("bvAno")||{}).value;
    const grupo = (document.getElementById("bvGrupo")||{}).value;
    const meta = parseInt((document.getElementById("bvMeta")||{}).value);
    if(!meta || meta < 1){ toast("Informe quantas questões por dia (pelo menos 1).", "err"); return; }
    if(ano) u.anoFaculdade = ano;
    u.metaQuestoesDia = meta;
    if(grupo !== "" && grupo !== undefined && temCalendarioProprio(u.anoFaculdade)){
      const turma = turmaDoRodizio(u.anoFaculdade, grupo);
      if(turma) entrarNoGrupo(u, turma.id);
    }
  }
  u.boasVindasEm = hojeISO();
  delete state.filtroRota.boasVindasAno; delete state.filtroRota.boasVindasMeta;
  saveState();
  if(!pulou){
    const g = getGrupoDoUsuario(u);
    toast(g.oficial
      ? "Tudo pronto! Meta de "+u.metaQuestoesDia+" questões por dia. Quando souber o seu grupo, escolha em Meu Grupo."
      : "Tudo pronto: "+g.nome+", meta de "+u.metaQuestoesDia+" questões por dia. Bons estudos!");
  }
  navigate("inicio");
}

function renderLogin(){
  return `
  <div class="container"><nav class="public-nav">
    <div class="brand" style="cursor:pointer" onclick="navigate('landing')"><span class="mark">E</span>${CONFIG.nomePlataforma}</div>
    <button class="btn btn-ghost" onclick="navigate('cadastro')">Solicitar cadastro</button>
  </nav></div>
  <div class="auth-wrap">
    <div class="auth-card">
      <h2>Entrar</h2>
      <p class="text-sm muted mt-1">${nuvemLigada()
        ? "Use o e-mail e a senha da sua conta. O seu estudo acompanha a conta em qualquer aparelho."
        : "Use seu e-mail ou matrícula cadastrados."}</p>
      <div class="field mt-3"><label class="label">E-mail ou matrícula</label><input class="input" id="loginId" placeholder="voce@email.com ou 2026001234"></div>
      <div class="field"><label class="label">Senha</label><input class="input" type="password" id="loginSenha" placeholder="••••••••" onkeydown="if(event.key==='Enter') tentarLogin()"></div>
      <button class="btn btn-primary btn-block" onclick="tentarLogin()">Entrar</button>
      <p class="text-sm mt-2">Ainda não tem conta? <a href="javascript:void(0)" onclick="navigate('cadastro')">Solicitar cadastro</a></p>
      <p class="text-sm mt-1">${nuvemLigada() ? `<a href="javascript:void(0)" onclick="abrirEsqueciSenha()">Esqueci a senha</a> · ` : ""}<a href="javascript:void(0)" onclick="abrirAjudaAcesso()">Problemas para entrar?</a></p>
      <div class="card-flat mt-3">
        <div class="text-xs muted mb-1">${nuvemLigada()
          ? "Conhecer a plataforma sem criar conta — fica só neste navegador e não sincroniza:"
          : "Conhecer a plataforma sem criar conta (não pede senha):"}</div>
        <div class="flex gap-1" style="flex-wrap:wrap">
          <button class="pill" onclick="fazerLoginDemo('aluno')">Entrar como aluno de teste</button>
        </div>
        <div class="text-xs muted mt-1">aluno@esc.demo / aluno123 — é a única conta de teste aberta. Professor, residente e coordenação usam as contas de verdade, acima.</div>
      </div>
    </div>
  </div>`;
}
/* ---------- a volta do e-mail (ver nuvemTratarRetornoDoEmail, seção 2-C) ----
   Uma tela pública só, com quatro casos: o link de confirmação acabou de ser
   enviado; o e-mail foi confirmado (e a aprovação da coordenação ainda
   falta); o link é de troca de senha; ou o link expirou/já foi usado. */
function renderRetornoEmail(){
  const r = state.retornoEmail || { tipo: "erro", expirou: false };
  const moldura = (corpo) => `
  <div class="container"><nav class="public-nav">
    <div class="brand" style="cursor:pointer" onclick="navigate('landing')"><span class="mark">E</span>${CONFIG.nomePlataforma}</div>
    <button class="btn btn-ghost" onclick="navigate('login')">Entrar</button>
  </nav></div>
  <div class="auth-wrap"><div class="auth-card">${corpo}</div></div>`;
  const campoEmail = (id, valor) => `<div class="field mt-2"><label class="label">E-mail</label><input class="input" id="${id}" type="email" value="${escapeHtml(valor||"")}" placeholder="voce@email.com"></div>`;
  if(r.tipo === "enviado") return moldura(`
    <h2>${iconeSvg("check")} Confira o seu e-mail</h2>
    <p class="text-sm mt-2">Enviamos um link de confirmação para <strong>${escapeHtml(r.email||"o seu e-mail")}</strong>. Abra o e-mail e toque no link — ele confirma o endereço e traz você de volta para cá.</p>
    <p class="text-sm muted mt-1">Depois disso, a coordenação aprova o seu acesso. Não chegou em alguns minutos? Veja a caixa de spam ou peça outro:</p>
    ${campoEmail("reenvioEmail", r.email)}
    <button class="btn btn-secondary btn-block" onclick="reenviarConfirmacaoDaTela('reenvioEmail')">Reenviar o e-mail de confirmação</button>`);
  if(r.tipo === "confirmado"){
    if(r.carregando) return moldura(`<h2>Confirmando o e-mail…</h2><p class="text-sm muted mt-2">Só um instante.</p>`);
    const msg = {
      pendente: "Agora falta a coordenação aprovar o seu cadastro. Assim que ela aprovar, é só entrar com o seu e-mail e a sua senha.",
      rejeitado: "O e-mail foi confirmado, mas o cadastro foi recusado pela coordenação. Fale com ela se achar que é um engano.",
      inativo: "O e-mail foi confirmado, mas a conta está inativa. Fale com a coordenação.",
    }[r.status] || "Agora falta a coordenação aprovar o seu cadastro.";
    return moldura(`<h2>${iconeSvg("check")} E-mail confirmado</h2><p class="text-sm mt-2">${msg}</p>
      <button class="btn btn-primary btn-block mt-3" onclick="navigate('login')">Ir para a entrada</button>`);
  }
  if(r.tipo === "recovery") return moldura(`
    <h2>Escolha uma senha nova</h2>
    <p class="text-sm muted mt-1">${r.email ? "Para a conta <strong>"+escapeHtml(r.email)+"</strong>. " : ""}Pelo menos 6 caracteres.</p>
    <div class="field mt-2"><label class="label">Senha nova</label><input class="input" type="password" id="novaSenha1" autocomplete="new-password"></div>
    <div class="field"><label class="label">Repita a senha nova</label><input class="input" type="password" id="novaSenha2" autocomplete="new-password" onkeydown="if(event.key==='Enter') salvarNovaSenhaDoEmail()"></div>
    <button class="btn btn-primary btn-block" onclick="salvarNovaSenhaDoEmail()">Salvar a senha nova</button>`);
  return moldura(`
    <h2>Este link não vale mais</h2>
    <p class="text-sm mt-2">${r.expirou ? "O link do e-mail expirou ou já foi usado — cada link vale uma vez só, por tempo limitado." : "Não foi possível concluir pelo link do e-mail."} Peça outro:</p>
    ${campoEmail("reenvioEmail", "")}
    <div class="flex gap-1" style="flex-wrap:wrap">
      <button class="btn btn-secondary" onclick="reenviarConfirmacaoDaTela('reenvioEmail')">Reenviar a confirmação do cadastro</button>
      <button class="btn btn-secondary" onclick="pedirNovaSenhaDaTela('reenvioEmail')">Mandar um link para trocar a senha</button>
    </div>
    ${r.detalhe ? `<p class="text-xs muted mt-2">Detalhe do servidor: ${escapeHtml(r.detalhe)}</p>` : ""}`);
}
function lerEmailDoCampo(id){
  const el = document.getElementById(id); const email = el ? el.value.trim() : "";
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ toast("Escreva o seu e-mail.", "err"); return ""; }
  return email;
}
function reenviarConfirmacaoDaTela(idCampo){
  const email = lerEmailDoCampo(idCampo); if(!email) return;
  nuvemReenviarConfirmacao(email).then(() => toast("Enviamos um link novo para " + email + ". Ele traz você de volta para cá."))
    .catch(e => toast(e.message || "Não foi possível reenviar agora.", "err"));
}
function pedirNovaSenhaDaTela(idCampo){
  const email = lerEmailDoCampo(idCampo); if(!email) return;
  // a resposta é a mesma exista a conta ou não — é de propósito (do Supabase):
  // assim ninguém descobre quais e-mails têm conta aqui
  nuvemPedirNovaSenha(email).then(() => { fecharModal(); toast("Se houver uma conta com " + email + ", chega nele um link para trocar a senha."); })
    .catch(e => toast(e.message || "Não foi possível enviar agora.", "err"));
}
function abrirEsqueciSenha(){
  const digitado = (document.getElementById("loginId") || {}).value || "";
  abrirModalTitulado("Esqueci a senha", `
    <p class="text-sm">Mandamos um link para o seu e-mail. Ele traz você de volta para cá, numa tela para escolher a senha nova.</p>
    <div class="field mt-2"><label class="label">E-mail da conta</label><input class="input" id="esqueciEmail" type="email" value="${escapeHtml(digitado.includes("@") ? digitado : "")}"></div>
    <div class="flex gap-1"><button class="btn btn-primary" onclick="pedirNovaSenhaDaTela('esqueciEmail')">Enviar o link</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
}
function abrirReenviarConfirmacao(email){
  abrirModalTitulado("Falta confirmar o e-mail", `
    <p class="text-sm">Antes do primeiro acesso, é preciso tocar no link que enviamos para <strong>${escapeHtml(email)}</strong> quando você se cadastrou. Não achou? Veja o spam ou peça outro:</p>
    <div class="field mt-2"><label class="label">E-mail</label><input class="input" id="reenvioModalEmail" type="email" value="${escapeHtml(email)}"></div>
    <div class="flex gap-1"><button class="btn btn-primary" onclick="reenviarConfirmacaoDaTela('reenvioModalEmail'); fecharModal()">Reenviar o link</button><button class="btn btn-secondary" onclick="fecharModal()">Fechar</button></div>`);
}
function salvarNovaSenhaDoEmail(){
  const r = state.retornoEmail || {};
  const s1 = (document.getElementById("novaSenha1") || {}).value || "", s2 = (document.getElementById("novaSenha2") || {}).value || "";
  if(s1.length < 6){ toast("A senha precisa ter pelo menos 6 caracteres.", "err"); return; }
  if(s1 !== s2){ toast("As duas senhas não são iguais.", "err"); return; }
  nuvemDefinirNovaSenha(r.token, s1).then(() => {
    state.retornoEmail = null;
    toast("Senha trocada. Entre com a senha nova.");
    navigate("login");
  }).catch(e => toast(/expired|expirou|401|403/i.test(String(e.status)+" "+(e.message||"")) ? "O link expirou. Peça outro em \"Esqueci a senha\"." : (e.message || "Não foi possível trocar a senha."), "err"));
}
function tentarLogin(){
  const identificador = document.getElementById("loginId").value;
  const senha = document.getElementById("loginSenha").value;
  // Com a nuvem ligada, quem confere a senha é o servidor (ela nem existe
  // neste arquivo). Sem nuvem, continua a conferência local de sempre.
  //
  // A NUVEM VEM PRIMEIRO. Se a pessoa tem conta lá, é nela que ela precisa
  // entrar — inclusive quando existe, neste mesmo navegador, uma conta local
  // antiga com o mesmo e-mail e a mesma senha. Tentar a local antes fazia o
  // login cair na conta local sem avisar, e a plataforma passava a dizer
  // "você não está em uma conta da nuvem" com tudo o mais funcionando.
  //
  // As contas de demonstração (admin@esc.demo e companhia) e as locais de
  // antes da nuvem continuam entrando: elas não existem na nuvem, a nuvem
  // recusa, e a conferência local acontece logo em seguida, sem aviso
  // intermediário. O mesmo vale se a nuvem não responder.
  const id = (identificador||"").trim().toLowerCase();
  const contaLocal = db.usuarios.find(u => !u.daNuvem && u.senha === senha &&
    ((u.email||"").toLowerCase() === id || (u.matricula||"").toLowerCase() === id));
  if(nuvemLigada() && identificador.includes("@")){
    const botao = document.querySelector("#loginSenha") && document.querySelector(".auth-card .btn-primary");
    if(botao){ botao.disabled = true; botao.textContent = "Entrando…"; }
    nuvemEntrarPelaTela(identificador.trim(), senha, {quieto: !!contaLocal}).then(r => {
      if(r && r.ok) return;
      if(botao){ botao.disabled = false; botao.textContent = "Entrar"; }
      if(contaLocal && r && r.local) fazerLogin(identificador, senha);
    });
    return;
  }
  fazerLogin(identificador, senha);
}

function renderCadastro(){
  return `
  <div class="container"><nav class="public-nav">
    <div class="brand" style="cursor:pointer" onclick="navigate('landing')"><span class="mark">E</span>${CONFIG.nomePlataforma}</div>
    <button class="btn btn-ghost" onclick="navigate('login')">Já tenho conta</button>
  </nav></div>
  <div class="auth-wrap">
    <div class="auth-card">
      <h2>Solicitar cadastro</h2>
      <p class="text-sm muted mt-1">Seu acesso é liberado depois que um administrador da coordenação analisar sua solicitação.</p>
      <div class="field mt-3"><label class="label">Nome completo</label><input class="input" id="cadNome" placeholder="Seu nome completo"></div>
      <div class="field"><label class="label">E-mail</label><input class="input" id="cadEmail" type="email" placeholder="voce@email.com"></div>
      <div class="field"><label class="label">Matrícula</label><input class="input" id="cadMatricula" placeholder="Número de matrícula"></div>
      <div class="field"><label class="label">Tipo de acesso solicitado</label>
        <select class="select" id="cadTipoAcesso" onchange="atualizarCamposTipoAcesso()">
          <option value="aluno">Aluno</option>
          <option value="professor">Professor</option>
          <option value="residente">Residente (para responder dúvidas)</option>
        </select>
      </div>
      <div id="camposAluno">
        <div class="field"><label class="label">Ano da faculdade</label><select class="select" id="cadAno">
          ${CONFIG.anosFaculdade.map(a=>`<option value="${escapeHtml(a)}" ${a==="5º ano"?"selected":""}>${escapeHtml(a)}</option>`).join("")}
        </select>
        <div class="hint mt-1">É a única coisa que precisamos saber agora. O internato deixou de ser uma opção à parte: quem está no internato marca o ano em que está (5º ou 6º). Quem já se formou marca "Formado(a)".</div></div>
        <div class="card-flat text-xs muted" style="margin-bottom:.8rem">A turma (Grupo A, B, C ou D) você escolhe depois de entrar, em <strong>Meu Grupo</strong> — assim dá para conferir quais turmas já existem e em qual bloco cada uma está, em vez de adivinhar no cadastro. Até lá você acompanha o calendário oficial da coordenação.</div>
      </div>
      <div id="camposEquipe" style="display:none">
        <div class="field"><label class="label">Grandes áreas de atuação</label>
          ${db.taxonomia.areas.map(a=>`<label class="checkbox-row mb-1"><input type="checkbox" class="cadAreaAtuacao" value="${a.id}"> ${escapeHtml(a.nome)}</label>`).join("")}
        </div>
        <div class="field"><label class="label">Especialidades específicas que você topa ajudar a responder dúvidas (opcional)</label>
          <div class="grid grid-2">
            ${db.taxonomia.areas.map(area=>`<div><div class="text-xs muted" style="font-weight:700;margin:.3rem 0 .2rem">${escapeHtml(area.nome)}</div>${db.taxonomia.especialidades.filter(e=>e.areaId===area.id).map(e=>`<label class="checkbox-row mb-1"><input type="checkbox" class="cadAssuntoAjuda" value="${e.id}"> ${escapeHtml(e.nome)}</label>`).join("")}</div>`).join("")}
          </div>
        </div>
      </div>
      <div class="field"><label class="label">Senha</label><input class="input" id="cadSenha" type="password" placeholder="Crie uma senha"></div>
      <button class="btn btn-primary btn-block" onclick="solicitarCadastro()">Enviar solicitação</button>
      <p class="text-sm mt-2">Já tem conta aprovada? <a href="javascript:void(0)" onclick="navigate('login')">Entrar</a></p>
    </div>
  </div>`;
}
/* ==========================================================================
   9. PAINEL INICIAL (muda conforme o papel do usuário)
   ========================================================================== */
function renderInicio(){
  const u = usuarioAtual();
  let conteudo;
  if(u.papel==="aluno" || state.modoAluno) conteudo = renderInicioAluno(u);
  else if(u.papel==="residente") conteudo = renderInicioResidente(u);
  else conteudo = renderInicioStaff(u);
  return conteudo + renderCardLivroOuroInicio() + renderCardFeedbackGeral();
}
/* O Livro de Ouro saiu do menu lateral e passou a morar aqui, no rodapé da
   tela inicial. Motivo: ele não é ferramenta de estudo, é reconhecimento —
   ninguém abre um menu para ler agradecimentos, mas todo mundo passa pela
   tela inicial todo dia. Quem mantém a lista chega nele também por
   Configurações. */
function renderCardLivroOuroInicio(){
  const registros = (db.livroOuro||[]).slice().sort((a,b)=>(b.destaque?1:0)-(a.destaque?1:0) || (b.data||"").localeCompare(a.data||""));
  const destaque = registros[0];
  const podeEditar = podeAdmin("livro-ouro");
  return `<div class="card mt-2" style="border-color:var(--amber)">
    <div class="flex justify-between items-center gap-2" style="flex-wrap:wrap">
      <div style="min-width:240px;flex:1">
        <div class="card-title">${iconeSvg("star")} Livro de Ouro</div>
        <p class="text-sm muted">${registros.length} pessoa(s), turma(s) e instituição(ões) que doaram dinheiro, tempo ou conhecimento para esta plataforma existir.</p>
        ${destaque ? `<p class="text-sm mt-1"><strong>${escapeHtml(destaque.nome)}</strong> — ${escapeHtml((destaque.descricao||"").slice(0,120))}${(destaque.descricao||"").length>120?"…":""}</p>` : ""}
      </div>
      <div class="flex gap-1" style="flex-wrap:wrap">
        <button class="btn btn-secondary btn-sm" onclick="navigate('livro-ouro')">Abrir</button>
        <button class="btn btn-ghost btn-sm" onclick="abrirModalContribuir()">${iconeSvg("message")} Quero contribuir</button>
        ${podeEditar ? `<button class="btn btn-primary btn-sm" onclick="abrirFormularioLivroOuro(null)">${iconeSvg("plus")} Registrar</button>` : ""}
      </div>
    </div>
  </div>`;
}
function renderCardFeedbackGeral(){
  return `<div class="card-flat mt-2 flex justify-between items-center" style="flex-wrap:wrap;gap:.5rem">
    <span class="text-sm">Tem um comentário, sugestão ou reclamação sobre a plataforma?</span>
    <button class="btn btn-secondary btn-sm" onclick="abrirModalFeedback()">${iconeSvg("message")} Enviar feedback</button>
  </div>`;
}
function abrirModalFeedback(){
  abrirModal(`
    <div class="modal-header"><h3>Comentário, sugestão ou reclamação</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
    <p class="text-sm muted">Isso vai direto pra coordenação. Pode ser sobre qualquer coisa da plataforma.</p>
    <div class="field"><label class="label">Tipo</label><select class="select" id="fbTipo"><option value="comentario">Comentário</option><option value="sugestao">Sugestão</option><option value="reclamacao">Reclamação</option></select></div>
    <div class="field"><label class="label">Mensagem</label><textarea class="textarea" id="fbTexto" style="min-height:110px" placeholder="Escreva à vontade..."></textarea></div>
    <button class="btn btn-primary" onclick="enviarFeedbackGeral()">Enviar</button>
  `);
}
function enviarFeedbackGeral(){
  const tipo = document.getElementById("fbTipo").value;
  const texto = document.getElementById("fbTexto").value.trim();
  if(!texto){ toast("Escreva algo antes de enviar.", "err"); return; }
  const u = usuarioAtual();
  db.feedbacks.push({id:uid("fb"), usuarioId:u.id, papel:u.papel, tipo, texto, data:hojeISO(), lido:false});
  saveState();
  fecharModal();
  toast("Enviado! Obrigado pelo retorno.");
}
function renderInicioAluno(u){
  const bloco = getBlocoAtual();
  const respondidasHoje = questoesRespondidasHoje(u.id);
  const meta = metaDoUsuario(u);
  const seq = sequenciaDiasEstudo(u.id);
  const totalRespostas = db.respostas.filter(r=>r.usuarioId===u.id).length;
  const totalAcertos = db.respostas.filter(r=>r.usuarioId===u.id && r.correta).length;
  const revisarHoje = assuntosParaRevisarHoje(u.id);
  const sugestoes = sugestoesDeMelhoria(u.id, 4);
  const calibracao = calibracaoConfianca(u.id);
  const flashVencidos = resumoFlashcards(u.id).vencidos;
  return `
  <div class="page-header"><h2>Olá, ${escapeHtml(u.nome.split(" ")[0])}.</h2><p>Bloco atual: ${escapeHtml(bloco.nome)} (${formatDataBR(bloco.dataInicio)} – ${formatDataBR(bloco.dataFim)})</p></div>
  ${renderNotificacoesCard(u)}
  <div class="grid grid-4">
    <div class="stat-tile"><div class="stat-value">${respondidasHoje}/${meta}</div><div class="stat-label">questões hoje</div><div class="progress-track mt-1"><div class="progress-fill" style="width:${Math.min(100,pct(respondidasHoje,meta))}%"></div></div></div>
    <div class="stat-tile"><div class="stat-value">${seq}</div><div class="stat-label">dia(s) seguidos estudando</div></div>
    <div class="stat-tile"><div class="stat-value">${totalRespostas?pct(totalAcertos,totalRespostas)+"%":"—"}</div><div class="stat-label">acerto geral (${totalRespostas} questões)</div></div>
    <div class="stat-tile"><div class="stat-value">${revisarHoje.length}</div><div class="stat-label">assunto(s) para revisar hoje</div></div>
  </div>
  <div class="card mt-2">
    <div class="flex justify-between items-center">
      <div><div class="card-title">Pronto para estudar?</div><div class="text-sm muted">Sessão recomendada, misturando bloco atual, revisão de blocos passados e prévia do próximo bloco.</div></div>
      <button class="btn btn-primary" onclick="iniciarSessaoRecomendada()">Começar agora</button>
    </div>
  </div>
  ${calibracao.alertaExcessoConfianca ? `<div class="card mt-2" style="border-color:var(--amber)">
    <strong>${iconeSvg("alert")} Atenção ao excesso de confiança:</strong> nas questões em que você marcou "certeza", sua taxa de acerto é de ${calibracao.certeza.taxa}%. Vale desacelerar antes de confirmar a resposta — e revisar justamente o que você acha que já sabe.
    <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
      <button class="btn btn-primary btn-sm" onclick="praticarFilaDeConfianca('certeza')">Praticar o que errei com certeza</button>
      <button class="btn btn-secondary btn-sm" onclick="navigate('desempenho')">Ver onde a confiança engana</button>
    </div>
  </div>` : ""}
  <div class="grid grid-2 mt-2">
    <div class="card">
      <div class="card-title">Sugestões de assuntos para melhorar</div>
      ${sugestoes.length ? sugestoes.map(s=>`<div class="flex justify-between items-center mt-1"><span class="text-sm">${escapeHtml(nomeAssunto(s.assuntoId))}</span><span class="badge badge-danger">${s.taxa}% de acerto</span></div>`).join("") : '<div class="text-sm muted mt-1">Ainda não há dados suficientes — responda mais questões para receber sugestões.</div>'}
      <button class="link-btn mt-2" onclick="navigate('desempenho')">Ver desempenho completo</button>
    </div>
    <div class="card">
      <div class="card-title">Revisão pendente</div>
      ${revisarHoje.length ? `<p class="text-sm muted mt-1">${revisarHoje.length} assunto(s) já estudado(s) estão no momento certo de revisar, segundo seu histórico.</p>` : '<p class="text-sm muted mt-1">Nada vencido para revisar hoje. Continue estudando o bloco atual.</p>'}
      ${flashVencidos ? `<p class="text-sm mt-1">${flashVencidos} cartão(ões) de revisão rápida também venceram — dá pra limpar essa fila em poucos minutos.</p>` : ""}
      <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
        ${revisarHoje.length ? `<button class="btn btn-secondary btn-sm" onclick="navigate('revisao')">Ir para revisão</button>` : ""}
        <button class="btn ${!revisarHoje.length && flashVencidos ? "btn-primary" : "btn-secondary"} btn-sm" onclick="iniciarSessaoFlashcards({})">${iconeSvg("cards")} Revisão rápida</button>
      </div>
    </div>
  </div>`;
}
function renderInicioResidente(u){
  return `
  <div class="page-header"><h2>Olá, ${escapeHtml(u.nome.split(" ")[0])}.</h2><p>Obrigado por ajudar a tirar dúvidas dos alunos.</p></div>
  ${renderNotificacoesCard(u)}
  <div class="grid grid-2">
    <div class="stat-tile"><div class="stat-value">${duvidasPendentes(u).length}</div><div class="stat-label">dúvida(s) aguardando resposta${u.areasAtuacao&&u.areasAtuacao.length?" na sua área":""}</div></div>
    <div class="stat-tile"><div class="stat-value">${comentariosAtivos().filter(c=>c.respostaOficial && c.usuarioId===u.id).length}</div><div class="stat-label">respostas que você já deu</div></div>
  </div>
  <div class="card mt-2"><div class="card-title">Fila de dúvidas</div><p class="text-sm muted">Veja as perguntas dos alunos que ainda não têm resposta oficial — agora com a questão completa à vista.</p><button class="btn btn-primary mt-2" onclick="navigate('fila-duvidas')">Abrir fila de dúvidas</button></div>
  <div class="grid grid-2 mt-2">
    <div class="card"><div class="card-title">Questões difíceis</div><p class="text-sm muted">Questões com baixa taxa de acerto ou sinalizadas pelos alunos. Você pode editar a questão direto de lá.</p><button class="btn btn-secondary mt-2" onclick="navigate('revisao-dificeis')">Abrir controle de qualidade</button></div>
    <div class="card"><div class="card-title">Enviar provas e questões</div><p class="text-sm muted">Cole uma prova inteira (com instituição e ano definidos uma vez só) ou questões avulsas para o banco.</p><button class="btn btn-secondary mt-2" onclick="navigate('importar-questoes')">Enviar questões</button></div>
  </div>`;
}
/* Painel da equipe. Os números eram quatro caixas grandes, uma por linha
   no celular; viraram fichas pequenas lado a lado, que cabem numa linha só
   e levam à tela correspondente. As ações ficam numa fileira de botões. */
function renderInicioStaff(u){
  const pendCadastros = db.usuarios.filter(x=>x.status==="pendente").length;
  const dificeis = questoesDificeis().length;
  const ativas = questoesAtivas(true);
  const totalAlunos = db.usuarios.filter(x=>x.papel==="aluno" && x.status==="aprovado").length;
  const duvidas = comentariosAtivos().filter(c=>!c.respostaOficial).length;
  const aRevisar = ativas.filter(q=>!formatacaoAprovadaDe(q.id)).length;
  const ficha = (valor, rotulo, rota) => rota
    ? `<button class="stat-mini" onclick="navigate('${rota}')"><span class="stat-value">${valor}</span><span class="stat-label">${rotulo}</span></button>`
    : `<div class="stat-mini"><span class="stat-value">${valor}</span><span class="stat-label">${rotulo}</span></div>`;
  const temRota = r => navItemsParaPapel(u.papel).some(i=>i.id===r);
  return `
  <div class="page-header"><h2>Olá, ${escapeHtml(u.nome.split(" ")[0])}.</h2><p>${rotuloPapel(u.papel)}</p></div>
  ${renderNotificacoesCard(u)}
  <div class="stat-mini-row">
    ${ficha(ativas.length, "questões ativas", temRota("banco-questoes") ? "banco-questoes" : null)}
    ${ficha(totalAlunos, "alunos aprovados", temRota("usuarios") ? "usuarios" : null)}
    ${ficha(dificeis, "na fila de difíceis", "revisao-dificeis")}
    ${ficha(duvidas, "dúvidas de alunos", temRota("fila-duvidas") ? "fila-duvidas" : null)}
    ${ficha(aRevisar, "formatação a revisar", "revisao-formatacao")}
    ${u.papel==="admin" && temRota("aprovar-cadastros") ? ficha(pendCadastros, pendCadastros===1?"cadastro pendente":"cadastros pendentes", "aprovar-cadastros") : ""}
  </div>
  <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
    <button class="btn btn-secondary btn-sm" onclick="navigate('criar-simulado')">${iconeSvg("plus")} Criar simulado</button>
    <button class="btn btn-secondary btn-sm" onclick="navigate('importar-questoes')">${iconeSvg("upload")} Importar questões</button>
  </div>`;
}

/* ==========================================================================
   10. TELA "ESTUDAR" — ponto de partida para praticar
   ========================================================================== */
/* As três maiores prioridades pela prova (O QUE MAIS CAI NA PROVA, seção 4),
   com o atalho para praticá-las. O quadro completo fica em Meu Desempenho. */
function htmlCardPrioridadesEstudar(u){
  const top = prioridadesDeEstudo(u.id).slice(0,3);
  if(!top.length) return "";
  return `<div class="card mt-2">
    <div class="card-title">${iconeSvg("star")} O que mais cai na ${escapeHtml(bancaDeReferencia())} e você ainda erra</div>
    <p class="text-sm muted">${top.map(p=>`<strong>${escapeHtml(nomeAssunto(p.assuntoId))}</strong> (${p.questoesNaProva} questões nas provas${p.taxa!==null?", você acerta "+p.taxa+"%":", nunca respondeu"})`).join(" · ")}</p>
    <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
      <button class="btn btn-secondary" onclick="praticarPrioridadesDaProva()">${iconeSvg("play")} Praticar as prioridades</button>
      <button class="btn btn-ghost" onclick="navigate('desempenho')">Ver o quadro completo</button>
    </div>
  </div>`;
}
function renderEstudar(){
  const u = usuarioAtual();
  const bloco = getBlocoAtual();
  const mistura = misturaEfetiva(u);
  const errosPendentes = questoesErroOrdenadasPorAntiguidade(u.id).length;
  const meuGrupo = getGrupoDoUsuario(u);
  const qtdQuestoesGrupo = db.questoes.filter(q=>q.grupoId===meuGrupo.id && q.status==="ativa").length;
  const todas = questoesAtivas(meuGrupo.id);
  const anos = [...new Set(todas.map(q=>q.ano))].sort((a,b)=>b-a);
  const bancas = [...new Set(todas.map(q=>q.banca))].sort();
  const meta = metaDoUsuario(u);
  const feitasHoje = questoesRespondidasHoje(u.id);
  const seq = sequenciaDiasEstudo(u.id);
  const faltam = Math.max(0, meta - feitasHoje);
  const emAndamento = sessaoEmAndamentoDe(u);
  const deHoje = sessaoDeHoje(u);
  return `
  <div class="page-header"><h2>Estudar</h2><p>Escolha como quer praticar agora.</p></div>

  ${emAndamento ? `
  <div class="card mb-2" style="border-color:var(--accent)">
    <div class="flex justify-between items-center gap-2" style="flex-wrap:wrap">
      <div style="min-width:220px;flex:1">
        <div class="card-title" style="margin-bottom:.2rem">${iconeSvg("refresh")} ${deHoje ? "Sessão de hoje" : "Sessão em andamento"}</div>
        <div class="text-sm muted">${respostasFeitas(emAndamento).length} de ${emAndamento.itens.length} questão(ões) respondida(s)${emAndamento.salvaEm && emAndamento.salvaEm!==hojeISO() ? ", começada em "+formatDataBR(emAndamento.salvaEm) : ""}. Continuar mantém a mesma fila, na mesma ordem, com as marcações e os riscos como você deixou — você não recomeça do zero.</div>
      </div>
      <div class="flex gap-1" style="flex-wrap:wrap">
        <button class="btn btn-primary" onclick="retomarSessaoEmAndamento()">Continuar de onde parei</button>
        <button class="btn btn-ghost btn-sm" onclick="descartarSessaoEmAndamento()">Descartar</button>
      </div>
    </div>
  </div>` : ""}

  <div class="card mb-2" ${feitasHoje>=meta?'style="border-color:var(--accent)"':""}>
    <div class="flex justify-between items-center gap-2" style="flex-wrap:wrap">
      <div style="min-width:220px;flex:1">
        <div class="card-title" style="margin-bottom:.2rem">Meta de hoje</div>
        <div class="text-sm muted">${feitasHoje>=meta
          ? "Meta batida. O que vier agora é lucro — e se estiver cansado, parar aqui também é uma decisão boa."
          : `Faltam <strong>${faltam}</strong> questão(ões) para fechar o dia.`}</div>
      </div>
      <div class="flex items-center gap-2" style="flex-wrap:wrap">
        <div style="text-align:right">
          <div class="stat-value" style="font-size:1.5rem">${feitasHoje}/${meta}</div>
          <div class="stat-label">questões hoje${seq?" · "+seq+" dia(s) seguidos":""}</div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="abrirModalMeta()">${iconeSvg("target")} Ajustar meta</button>
      </div>
    </div>
    <div class="progress-track mt-2"><div class="progress-fill" style="width:${Math.min(100,pct(feitasHoje,meta))}%"></div></div>
    <p class="text-xs muted mt-1">Recomendação da coordenação: mínimo de ${db.configGeral.metaMinimaQuestoesDia} e ideal de ${db.configGeral.metaRecomendadaQuestoesDia} questões por dia. A meta é sua e pode ser mudada a qualquer momento.</p>
  </div>

  <div class="grid grid-2">
    <div class="card">
      <div class="card-title">Sessão recomendada</div>
      <p class="text-sm muted">Mistura automática: ${Math.round(mistura.atual*100)}% do bloco atual (${escapeHtml(bloco.nome)}), ${Math.round(mistura.revisaoPassados*100)}% revisão (blocos passados e matéria de anos anteriores), ${Math.round(mistura.previaFuturos*100)}% prévia do próximo bloco.${CONFIG.incidencia.pesoNaSessao && incidenciaNaBanca().total ? ` Dentro do bloco atual, os assuntos que mais caem na ${escapeHtml(bancaDeReferencia())} e em que você mais erra vêm primeiro.` : ""}</p>
      ${mistura.explicacao ? `<div class="card-flat mt-2 text-xs">${iconeSvg("alert")} ${escapeHtml(mistura.explicacao)}</div>` : ""}
      <button class="btn btn-primary mt-2" onclick="iniciarSessaoRecomendada()">${deHoje ? `Continuar a sessão de hoje (${respostasFeitas(deHoje).length} de ${deHoje.itens.length})` : "Começar sessão recomendada"}</button>
      <p class="text-xs muted mt-1">${deHoje
        ? "O conjunto é o mesmo o dia inteiro: sair e voltar continua de onde você parou. Amanhã ele se renova sozinho, com a matéria e as revisões vencidas de amanhã."
        : "Uma vez começado, o conjunto vale o dia inteiro: sair e voltar continua de onde você parou, sem re-sortear as questões."}</p>
    </div>
    <div class="card">
      <div class="card-title">Revisar erros e chutes antigos</div>
      <p class="text-sm muted">${errosPendentes} questão(ões) que você errou ou acertou no chute, começando pelas mais antigas.</p>
      <button class="btn btn-secondary mt-2" onclick="iniciarRevisaoErros()" ${errosPendentes===0?"disabled":""}>Revisar agora</button>
    </div>
  </div>
  ${htmlCardPrioridadesEstudar(u)}
  <div class="card mt-2">
    <div class="card-title">Monte sua própria lista</div>
    <p class="text-sm muted mb-2">Filtre por grande área, especialidade, assunto, instituição, ano ou situação (erros, favoritas, ainda não respondidas). Deixar um filtro em branco significa "todos".</p>
    <div class="grid grid-3" onchange="atualizarContagemFiltro()">
      <div>
        <div class="flex justify-between items-center mb-1">
          <div class="label">Grandes áreas</div>
          <div class="flex gap-1">
            <button class="link-btn text-xs" onclick="marcarTodasAreas(true)">todas</button>
            <button class="link-btn text-xs" onclick="marcarTodasAreas(false)">limpar</button>
          </div>
        </div>
        ${db.taxonomia.areas.map(a=>`<label class="checkbox-row mb-1"><input type="checkbox" class="filtroArea" value="${a.id}" onchange="atualizarEspecialidadesFiltro()"> ${escapeHtml(a.nome)}</label>`).join("")}
        <div class="text-xs muted mt-1">"Todas" marca CM, CG, PED, GO e Preventiva de uma vez.</div>
      </div>
      <div>
        <div class="label mb-1">Especialidade (opcional)</div>
        <select class="select" id="filtroEspecialidade" multiple size="6" onchange="atualizarAssuntosFiltro()">
          ${db.taxonomia.areas.map(area=>`<optgroup label="${escapeHtml(area.nome)}">${db.taxonomia.especialidades.filter(e=>e.areaId===area.id).map(e=>`<option value="${e.id}">${escapeHtml(e.nome)}</option>`).join("")}</optgroup>`).join("")}
        </select>
        <div class="label mb-1 mt-2">Assunto (opcional)</div>
        <select class="select" id="filtroAssunto" multiple size="5">
          ${db.taxonomia.assuntos.map(a=>`<option value="${a.id}">${escapeHtml(a.nome)}</option>`).join("")}
        </select>
        <div class="text-xs muted mt-1">Segure Ctrl (ou Cmd) para escolher mais de um.</div>
      </div>
      <div>
        <div class="label mb-1">Instituição</div>
        <select class="select" id="filtroBanca">
          <option value="">Todas as instituições</option>
          ${bancas.map(b=>`<option value="${escapeHtml(b)}">${escapeHtml(b)}</option>`).join("")}
        </select>
        <div class="flex justify-between items-center mb-1 mt-2">
          <div class="label">Ano da prova</div>
          <div class="flex gap-1">
            <button class="link-btn text-xs" onclick="marcarUltimos5Anos()">últimos 5 anos</button>
            <button class="link-btn text-xs" onclick="marcarTodosAnos(false)">limpar</button>
          </div>
        </div>
        <div style="max-height:120px;overflow-y:auto">
          ${anos.map(ano=>`<label class="checkbox-row mb-1"><input type="checkbox" class="filtroAno" value="${ano}"> ${ano}</label>`).join("")}
        </div>
        <div class="label mb-1 mt-2">Situação</div>
        <label class="checkbox-row mb-1"><input type="checkbox" id="filtroApenasErros"> Só erros/chutes</label>
        <label class="checkbox-row mb-1"><input type="checkbox" id="filtroApenasFavoritas"> Só favoritas</label>
        <label class="checkbox-row mb-1"><input type="checkbox" id="filtroApenasNaoRespondidas"> Ainda não respondidas</label>
        ${!meuGrupo.oficial ? `<label class="checkbox-row mb-1"><input type="checkbox" id="filtroIncluirGrupo"> Incluir questões do meu grupo (${qtdQuestoesGrupo})</label>` : ""}
      </div>
    </div>
    <div class="flex items-end gap-2 mt-2" style="flex-wrap:wrap">
      <div class="field" style="margin-bottom:0;max-width:140px"><label class="label">Nº de questões</label><input class="input" id="filtroTamanho" type="number" value="15" min="1" max="100"></div>
      <button class="btn btn-primary" onclick="gerarListaPersonalizada()">Gerar lista</button>
      <button class="btn btn-secondary" onclick="gerarListaPersonalizada(true)">Fazer como simulado</button>
    </div>
    <div class="text-sm mt-2" id="contagemFiltro" aria-live="polite">${textoContagemFiltro(buscarQuestoesPorFiltro(u.id, {}).length)}</div>
  </div>`;
}
/* Os filtros da lista personalizada, lidos da tela. Uma função só, para a
   contagem ao vivo e o "Gerar lista" nunca discordarem do que está marcado. */
function lerFiltrosPersonalizados(){
  const u = usuarioAtual();
  const valor = id => { const el = document.getElementById(id); return el ? el.value : ""; };
  const marcado = id => { const el = document.getElementById(id); return !!(el && el.checked); };
  const escolhidos = id => { const el = document.getElementById(id); return el ? [...(el.selectedOptions||[])].map(o=>o.value) : []; };
  const banca = valor("filtroBanca");
  return {
    areaIds: [...document.querySelectorAll(".filtroArea:checked")].map(el=>el.value),
    anos: [...document.querySelectorAll(".filtroAno:checked")].map(el=>parseInt(el.value)),
    especialidadeIds: escolhidos("filtroEspecialidade"),
    assuntoIds: escolhidos("filtroAssunto"),
    bancas: banca ? [banca] : [],
    apenasErros: marcado("filtroApenasErros"),
    apenasFavoritas: marcado("filtroApenasFavoritas"),
    apenasNaoRespondidas: marcado("filtroApenasNaoRespondidas"),
    incluirGrupoId: marcado("filtroIncluirGrupo") ? getGrupoDoUsuario(u).id : undefined,
  };
}
function textoContagemFiltro(n){
  return n
    ? `${iconeSvg("database")} <strong>${n.toLocaleString("pt-BR")}</strong> ${n===1?"questão":"questões"} no banco com esses filtros.`
    : `${iconeSvg("alert")} <strong>Nenhuma questão</strong> no banco com esses filtros — tire algum para ampliar.`;
}
// quantas questões os filtros marcados agora dão, antes de gerar a lista
function atualizarContagemFiltro(){
  const alvo = document.getElementById("contagemFiltro"); if(!alvo) return;
  alvo.innerHTML = textoContagemFiltro(buscarQuestoesPorFiltro(usuarioAtual().id, lerFiltrosPersonalizados()).length);
}
function marcarTodasAreas(marcar){
  document.querySelectorAll(".filtroArea").forEach(el=>{ el.checked = !!marcar; });
  atualizarEspecialidadesFiltro();
}
function marcarTodosAnos(marcar){ document.querySelectorAll(".filtroAno").forEach(el=>{ el.checked = !!marcar; }); atualizarContagemFiltro(); }
function marcarUltimos5Anos(){
  const caixas = [...document.querySelectorAll(".filtroAno")];
  const anos = caixas.map(el=>parseInt(el.value)).sort((a,b)=>b-a);
  const ultimos = anos.slice(0,5);
  caixas.forEach(el=>{ el.checked = ultimos.includes(parseInt(el.value)); });
  atualizarContagemFiltro();
  toast(ultimos.length ? "Selecionados os últimos 5 anos disponíveis: "+ultimos.join(", ") : "Nenhum ano disponível.");
}
// quando o usuário marca grandes áreas, a lista de especialidades passa a
// mostrar só as daquelas áreas (e o mesmo vale para assuntos)
function atualizarEspecialidadesFiltro(){
  const areaIds = [...document.querySelectorAll(".filtroArea:checked")].map(el=>el.value);
  const sel = document.getElementById("filtroEspecialidade"); if(!sel) return;
  const areas = areaIds.length ? db.taxonomia.areas.filter(a=>areaIds.includes(a.id)) : db.taxonomia.areas;
  sel.innerHTML = areas.map(area=>`<optgroup label="${escapeHtml(area.nome)}">${db.taxonomia.especialidades.filter(e=>e.areaId===area.id).map(e=>`<option value="${e.id}">${escapeHtml(e.nome)}</option>`).join("")}</optgroup>`).join("");
  atualizarAssuntosFiltro();
}
function atualizarAssuntosFiltro(){
  const selEsp = document.getElementById("filtroEspecialidade");
  const sel = document.getElementById("filtroAssunto"); if(!sel || !selEsp) return;
  const espIds = [...selEsp.selectedOptions].map(o=>o.value);
  const areaIds = [...document.querySelectorAll(".filtroArea:checked")].map(el=>el.value);
  let assuntos = db.taxonomia.assuntos;
  if(espIds.length) assuntos = assuntos.filter(a=>espIds.includes(a.especialidadeId));
  else if(areaIds.length){
    const espDasAreas = db.taxonomia.especialidades.filter(e=>areaIds.includes(e.areaId)).map(e=>e.id);
    assuntos = assuntos.filter(a=>espDasAreas.includes(a.especialidadeId));
  }
  sel.innerHTML = assuntos.map(a=>`<option value="${a.id}">${escapeHtml(a.nome)}</option>`).join("");
  atualizarContagemFiltro();   // trocar as opções desmarca os assuntos
}
function gerarListaPersonalizada(comoSimulado){
  const u = usuarioAtual();
  const tamanho = parseInt(document.getElementById("filtroTamanho").value)||15;
  const pool = buscarQuestoesPorFiltro(u.id, lerFiltrosPersonalizados());
  if(!pool.length){ toast("Nenhuma questão encontrada com esses filtros.", "err"); return; }
  const escolhidas = embaralhar(pool).slice(0,tamanho);
  if(comoSimulado===true){
    state.sessaoAtual = { id:uid("simsessao"), tipo:"simulado", simuladoId:null, titulo:"Simulado personalizado ("+escolhidas.length+" questões)",
      itens: escolhidas.map(q=>({questaoId:q.id, motivo:"Simulado personalizado"})), indiceAtual:0, respostasSimulado:{},
      duracaoMin: escolhidas.length*2, finalizado:false, modoAprendizado:false,
      // sem estes três campos o cronômetro não liga e o tempo por questão
      // não é medido — a análise de "onde você travou" vinha vazia aqui
      inicioMs:Date.now(), tsQuestao:Date.now(), tempos:{} };
    navigate("simulado-ativo");
    return;
  }
  iniciarSessaoComLista(escolhidas.map(q=>({questaoId:q.id, motivo:"Lista personalizada (seus filtros)"})), "pratica");
}

/* ==========================================================================
   10-B. QUESTÃO NA ÍNTEGRA — janela reutilizável
   ==========================================================================
   Mostra o enunciado completo, todas as alternativas, o gabarito e a
   explicação de qualquer questão. É usada por todas as telas que mostram
   apenas um trecho da questão (favoritos, banco, fila de dúvidas, questões
   difíceis, histórico de atividade, questões do grupo...), para que nunca
   seja preciso "adivinhar" a questão a partir das primeiras linhas.
   A antiga aba "Assuntos" foi removida do menu: a navegação por
   especialidade/assunto agora fica dentro de Estudar > Monte sua lista. */
function abrirQuestaoCompleta(qid, opts){
  opts = opts || {};
  const q = getQuestao(qid);
  if(!q){ toast("Questão não encontrada.", "err"); return; }
  const u = usuarioAtual();
  const ehStaff = u && (u.papel==="admin" || u.papel==="professor" || u.papel==="residente");
  const ehDoMeuGrupo = u && u.papel==="aluno" && q.grupoId && getGrupoDoUsuario(u).id===q.grupoId;
  const podeEditar = opts.permitirEdicao !== false && (ehStaff || ehDoMeuGrupo);
  const esp = getEspecialidade(q.especialidadeId), area = getArea(q.areaId);
  const ultima = u ? ultimaResposta(u.id, q.id) : null;
  const fav = u ? isFavorita(u.id, q.id) : false;
  const minhaNota = u ? notaDaFavorita(u.id, q.id) : "";
  abrirModal(`
    <div class="modal-header"><h3>Questão na íntegra</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
    <div class="qcard-meta mb-2">
      <span class="badge badge-accent">${escapeHtml(area?area.nome:"—")}</span>
      <span class="badge badge-muted">${escapeHtml(esp?esp.nome:"—")}</span>
      <span class="badge badge-muted">${escapeHtml(nomeAssunto(q.assuntoId))}</span>
      <span class="badge badge-muted">${escapeHtml(q.banca)} · ${q.ano}</span>
      ${badgeStatusQuestao(q.status)}
      ${q.grupoId?`<span class="badge badge-muted">grupo: ${escapeHtml(getGrupo(q.grupoId)?getGrupo(q.grupoId).nome:"—")}</span>`:""}
    </div>
    ${renderImagemQuestao(q)}
    <div class="qcard-enunciado" style="font-size:1.02rem;margin-bottom:1rem">${escapeHtml(q.enunciado)}</div>
    <div class="qcard-alts">
      ${q.alternativas.map(alt=>`<div class="qcard-alt disabled ${alt.id===q.gabarito?"correct":""}"><span class="alt-letter">${alt.id}</span><span class="alt-text">${escapeHtml(alt.texto)}</span></div>`).join("")}
    </div>
    <div class="feedback-box ok mt-2"><strong>Gabarito: ${escapeHtml(q.gabarito)}.</strong>${q.explicacaoGeral?"<br>"+escapeHtml(q.explicacaoGeral):" (sem explicação cadastrada ainda)"}</div>
    ${renderReferenciasQuestao(q)}
    ${(q.explicacoesAlternativas && Object.keys(q.explicacoesAlternativas).length) ? `<div class="card-flat mt-2 text-sm">${Object.entries(q.explicacoesAlternativas).map(([letra,texto])=>`<div class="mb-1"><strong>${escapeHtml(letra)}:</strong> ${escapeHtml(texto)}</div>`).join("")}</div>` : ""}
    ${ultima ? `<div class="card-flat mt-2 text-xs muted">${iconeSvg("clock")} Sua última resposta: marcou ${escapeHtml(ultima.alternativaEscolhida)} (${ultima.correta?"correta":"incorreta"}, ${escapeHtml(rotuloConfianca(ultima.confianca))}) em ${formatDataBR(ultima.data)}.</div>` : ""}
    ${minhaNota ? `<div class="nota-pessoal mt-2"><div class="nota-pessoal-titulo">${iconeSvg("message")} Minha anotação</div><div class="text-sm">${escapeHtml(minhaNota)}</div></div>` : ""}
    <div class="flex gap-1 mt-3" style="flex-wrap:wrap">
      ${q.status==="ativa" ? `<button class="btn btn-primary btn-sm" onclick="praticarSoEstaQuestao('${q.id}')">${iconeSvg("book")} Praticar esta questão</button>` : ""}
      ${u ? `<button class="btn btn-secondary btn-sm" onclick="fecharModal();toggleFavoritoUI('${q.id}')">${iconeSvg("star")} ${fav?"Remover dos favoritos":"Favoritar"}</button>` : ""}
      ${u ? `<button class="btn btn-secondary btn-sm" onclick="fecharModal();abrirNotaFavorita('${q.id}')">${iconeSvg("message")} ${minhaNota?"Editar minha anotação":"Anotar uma dúvida"}</button>` : ""}
      ${u ? `<button class="btn btn-secondary btn-sm" onclick="abrirFormularioFlashcard(null,{questaoId:'${q.id}'})">${iconeSvg("cards")} Virar flashcard</button>` : ""}
      ${podeEditar ? `<button class="btn btn-secondary btn-sm" onclick="abrirFormularioQuestao('${q.id}')">${iconeSvg("edit")} Editar questão</button>` : ""}
      <button class="btn btn-ghost btn-sm" onclick="fecharModal()">Fechar</button>
    </div>
  `, "lg");
}
function praticarSoEstaQuestao(qid){
  fecharModal();
  iniciarSessaoComLista([{questaoId:qid, motivo:"Questão aberta na íntegra"}], "pratica");
}
function rotuloConfianca(c){ return {certeza:"tinha certeza", duvida:"estava na dúvida", chute:"chutou"}[c] || "—"; }
function botaoVerNaIntegra(qid, texto){
  return `<button class="btn btn-secondary btn-sm" onclick="abrirQuestaoCompleta('${qid}')">${iconeSvg("search")} ${texto||"Ver questão na íntegra"}</button>`;
}

function toggleTreeArea(areaId){
  document.getElementById("treebody-"+areaId).classList.toggle("open");
}
