/* codigo/03d-nuvem-telas.js — Nuvem (seção 2-C), parte 4: trazer o estudo deste navegador, entrar/sair pela tela, percentil, Painel da Turma, cadastros e usuários da nuvem, diagnóstico, senha, o cartão da nuvem no Perfil e os gatilhos de sincronização.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ---------------------------- primeira entrada ---------------------------
   Quem já usava a plataforma neste navegador tem estudo guardado no nome de
   um usuário local (ex.: "u-aluno1"). Isto passa esse histórico para a conta
   da nuvem, mantendo os mesmos ids — assim nada vira duplicata depois. */
function nuvemUsuariosLocaisComDados(){
  const meuId = nuvemConectado() ? nuvemSessao.usuarioId : null;
  return db.usuarios
    .filter(u => u.id !== meuId && !u.daNuvem)
    .map(u => ({
      usuario: u,
      respostas: db.respostas.filter(r => r.usuarioId === u.id).length,
      cartoes: db.flashcards.filter(c => c.usuarioId === u.id).length,
    }))
    .filter(x => x.respostas > 0 || x.cartoes > 0)
    .sort((a, b) => b.respostas - a.respostas);
}

function nuvemAdotarDadosLocais(idLocal){
  if(!nuvemConectado()) return 0;
  const meuId = nuvemSessao.usuarioId;
  let movidos = 0;

  db.respostas.forEach(r => { if(r.usuarioId === idLocal){ r.usuarioId = meuId; movidos++; nuvemRegistrar({resposta:r}); } });

  const revs = db.revisoes[idLocal] || {};
  Object.keys(revs).forEach(qid => {
    if(!db.revisoes[meuId]) db.revisoes[meuId] = {};
    if(!db.revisoes[meuId][qid]){ db.revisoes[meuId][qid] = revs[qid]; movidos++; }
    nuvemRegistrar({usuarioId:meuId, questaoId:qid, revisao:db.revisoes[meuId][qid]});
  });
  delete db.revisoes[idLocal];

  const revsC = (db.revisoesFlashcards || {})[idLocal] || {};
  Object.keys(revsC).forEach(cid => {
    if(!db.revisoesFlashcards[meuId]) db.revisoesFlashcards[meuId] = {};
    if(!db.revisoesFlashcards[meuId][cid]){ db.revisoesFlashcards[meuId][cid] = revsC[cid]; movidos++; }
    nuvemRegistrar({usuarioId:meuId, cartaoId:cid, revisaoCartao:db.revisoesFlashcards[meuId][cid]});
  });
  if(db.revisoesFlashcards) delete db.revisoesFlashcards[idLocal];

  const dias = (db.diasCartoes || {})[idLocal] || [];
  if(dias.length){
    if(!db.diasCartoes[meuId]) db.diasCartoes[meuId] = [];
    dias.forEach(d => {
      if(!db.diasCartoes[meuId].includes(d)){ db.diasCartoes[meuId].push(d); movidos++; }
      nuvemRegistrar({usuarioId:meuId, diaCartao:d});
    });
    db.diasCartoes[meuId].sort();
    delete db.diasCartoes[idLocal];
  }

  const porDia = (db.cartoesPorDia || {})[idLocal] || {};
  Object.keys(porDia).forEach(dia => {
    if(!db.cartoesPorDia[meuId]) db.cartoesPorDia[meuId] = {};
    const soma = (db.cartoesPorDia[meuId][dia] || 0) + porDia[dia];
    db.cartoesPorDia[meuId][dia] = soma;
    nuvemRegistrar({usuarioId:meuId, diaCartao:dia, quantidadeCartoesDoDia:soma});
  });
  if(db.cartoesPorDia) delete db.cartoesPorDia[idLocal];

  db.favoritos.forEach(f => { if(f.usuarioId === idLocal){ f.usuarioId = meuId; movidos++; nuvemRegistrar({favorito:f}); } });
  (db.favoritosCartoes||[]).forEach(f => { if(f.usuarioId === idLocal){ f.usuarioId = meuId; movidos++; nuvemRegistrar({favoritoCartao:f}); } });
  (db.questoesOcultas||[]).forEach(o => { if(o.usuarioId === idLocal){ o.usuarioId = meuId; movidos++; nuvemRegistrar({questaoOculta:o}); } });
  (db.destaques||[]).forEach(d => { if(d.usuarioId === idLocal){ d.usuarioId = meuId; movidos++; nuvemRegistrar({destaque:d}); } });
  db.flashcards.forEach(c => { if(c.usuarioId === idLocal){ c.usuarioId = meuId; c.criadoPor = meuId; movidos++; nuvemRegistrar({cartaoPessoal:c}); } });
  db.sessoes.forEach(s => { if(s.usuarioId === idLocal){ s.usuarioId = meuId; movidos++; nuvemRegistrar({sessaoConcluida:s}); } });
  db.resultadosSimulados.forEach(r => { if(r.usuarioId === idLocal){ r.usuarioId = meuId; movidos++; nuvemRegistrar({resultadoSimulado:r}); } });

  const fila = (db.sessoesEmAndamento || {})[idLocal];
  if(fila && !db.sessoesEmAndamento[meuId]){
    db.sessoesEmAndamento[meuId] = fila;
    delete db.sessoesEmAndamento[idLocal];
    nuvemRegistrar({usuarioId:meuId, sessaoEmAndamento:fila});
    movidos++;
  }

  saveState();
  return movidos;
}

/* ---------------------------- entrada e saída pela tela ------------------- */
/* Devolve {ok:true} quando entrou, ou {ok:false, local:true} quando a nuvem
   recusou de um jeito que uma conta local ainda pode resolver (credenciais
   que não existem lá, ou nuvem fora do ar). Com "quieto", esses dois casos
   não mostram aviso: quem chama tenta a conta local em seguida. */
async function nuvemEntrarPelaTela(email, senha, opcoes = {}){
  try{
    await nuvemEntrar(email, senha);
    const perfil = await nuvemBuscarPerfil();
    if(!perfil){
      nuvemSair();
      toast("Conta sem perfil na nuvem. Peça à coordenação para verificar o cadastro.", "err");
      return { ok:false, local:false };
    }
    const u = nuvemAplicarPerfilLocal(perfil);
    if(u.status === "pendente"){ nuvemSair(); toast("Seu cadastro ainda está aguardando aprovação da coordenação.", "err"); saveState(); return { ok:false, local:false }; }
    if(u.status === "rejeitado"){ nuvemSair(); toast("Seu cadastro foi recusado. Fale com a coordenação.", "err"); saveState(); return { ok:false, local:false }; }
    if(u.status === "inativo"){ nuvemSair(); toast("Sua conta está inativa. Fale com a coordenação.", "err"); saveState(); return { ok:false, local:false }; }
    state.usuarioAtualId = u.id;
    db.nuvem.contaId = u.id;
    saveState();
    toast("Bem-vindo(a), " + u.nome.split(" ")[0] + "! Sincronizando seu estudo…");
    navigate("inicio");
    // entrar é um dos momentos "na hora": a fila que ficou deste aparelho sobe
    // e o que foi feito nos outros desce antes de a pessoa começar a estudar
    await nuvemSincronizarAgora({forcarRedesenho:true});
    const locais = nuvemUsuariosLocaisComDados();
    if(locais.length) abrirModalTrazerDadosLocais();
    return { ok:true };
  }catch(e){
    // "esta conta não existe na nuvem" e "a nuvem não respondeu" são os dois
    // casos em que uma conta local (demonstração, ou de antes da nuvem) ainda
    // pode ser a certa.
    const podeSerLocal = !!e.semRede || /incorretos/i.test(e.message || "");
    if(/confirme o e-mail/i.test(e.message || "")){ abrirReenviarConfirmacao(email); return { ok:false, local:false }; }
    if(!(opcoes.quieto && podeSerLocal)) toast(e.message || "Não foi possível entrar.", "err");
    return { ok:false, local: podeSerLocal };
  }
}

async function nuvemCadastrarPelaTela(dados){
  try{
    const r = await nuvemCriarConta(dados);
    nuvemSair();
    if(r.entrouDireto){
      toast("Conta criada! Ela precisa ser aprovada pela coordenação antes do primeiro acesso.");
      navigate("login");
    }else{
      // a confirmação de e-mail está ligada: a tela diz o que fazer agora,
      // em vez de um aviso que some em cinco segundos
      state.retornoEmail = { tipo: "enviado", email: dados.email };
      navigate("retorno-email");
    }
    return true;
  }catch(e){
    toast(e.message || "Não foi possível criar a conta.", "err");
    return false;
  }
}

/* Sair da conta é o último momento em que este aparelho pode subir o que
   fez — depois disso a fila fica esperando a próxima entrada. Por isso a
   saída não pergunta nada quando dá para resolver sozinha: sobe na hora e
   só então sai. A pergunta volta a existir no único caso em que ela tem
   resposta possível — o envio não passou (sem internet, servidor fora) e a
   pessoa precisa decidir se espera ou se sai assim mesmo. */
function nuvemSairDaConta(){
  const seguir = () => {
    nuvemSair();
    limparEstadoDasTelas();
    state.usuarioAtualId = null;
    navigate("landing");
    toast("Você saiu da conta. Este navegador continua com os dados guardados.");
  };
  if(nuvemPendentes() === 0){ seguir(); return; }
  toast("Subindo o que faltava antes de sair…");
  nuvemSincronizarAgora({semRedesenhar:true}).then(() => {
    const restaram = nuvemPendentes();
    if(restaram === 0){ seguir(); return; }
    abrirModalTitulado("Sair com envios pendentes", `
      <p class="text-sm">Não deu para subir tudo agora: ainda há <strong>${restaram}</strong> ${restaram===1?"alteração":"alterações"} esperando. Se você sair assim mesmo, elas ficam guardadas neste navegador e sobem quando você entrar de novo, deste mesmo aparelho.</p>
      ${nuvemEstado.ultimoErro ? `<p class="text-xs muted mt-1">${escapeHtml(nuvemEstado.ultimoErro)}</p>` : ""}
      <div class="flex gap-1 mt-3">
        <button class="btn btn-primary" onclick="fecharModal(); nuvemSairDaConta()">Tentar de novo e sair</button>
        <button class="btn btn-secondary" onclick="fecharModal(); nuvemSairForcado()">Sair mesmo assim</button>
      </div>`);
  });
}
function nuvemSairForcado(){
  nuvemSair();
  limparEstadoDasTelas();
  state.usuarioAtualId = null;
  navigate("landing");
}

/* Sessão vencida: sai da conta mas deixa a fila intacta e leva direto para a
   tela de entrada, que é o que a pessoa precisa fazer. */
function nuvemEntrarDeNovo(){
  nuvemSair();
  limparEstadoDasTelas();
  state.usuarioAtualId = null;
  navigate("login");
  toast("Entre de novo com e-mail e senha. O que estava na fila continua guardado.");
}

function abrirModalTrazerDadosLocais(){
  const locais = nuvemUsuariosLocaisComDados();
  if(!locais.length) return;
  abrirModalTitulado("Trazer para a conta o que já foi estudado aqui", `
    <p class="text-sm">Este navegador tem estudo guardado fora da conta — de antes de a nuvem existir, ou do acesso de demonstração. Dá para trazer tudo para a sua conta agora: as respostas, a repetição espaçada, os favoritos e os cartões pessoais passam a ser seus e sobem para a nuvem.</p>
    <p class="text-xs muted mt-1">Isto não apaga nada e não duplica: cada registro mantém o mesmo identificador que já tinha.</p>
    <div class="mt-2">
      ${locais.map(x => `
        <div class="card-flat mb-1 flex justify-between items-center">
          <div>
            <div style="font-weight:600">${escapeHtml(x.usuario.nome)}</div>
            <div class="text-xs muted">${x.respostas} ${x.respostas===1?"resposta":"respostas"} · ${x.cartoes} ${x.cartoes===1?"cartão":"cartões"}</div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="confirmarTrazerDadosLocais('${x.usuario.id}')">Trazer para minha conta</button>
        </div>`).join("")}
    </div>
    <button class="btn btn-secondary mt-2" onclick="fecharModal()">Agora não</button>`, "lg");
}

function confirmarTrazerDadosLocais(idLocal){
  const movidos = nuvemAdotarDadosLocais(idLocal);
  fecharModal();
  toast(movidos ? (movidos + " registros passaram a ser da sua conta. Subindo para a nuvem…") : "Nada a trazer.");
  nuvemSincronizarAgora({forcarRedesenho:true});
  render();
}

/* ---------------------------- percentil de simulado ----------------------
   As notas da turma inteira num simulado, sem ninguém nelas (a função
   notas_do_simulado do esquema.sql devolve só o id aleatório da tentativa e
   a nota). Vêm uma vez por simulado a cada 5 minutos; quando chegam, a tela
   de resultado se redesenha com o percentil da turma no lugar do percentil
   "deste navegador". */
const _notasDaTurma = {};
function notasDaTurmaDoSimulado(chave){
  if(!nuvemConectado() || !chave || _nuvemTabelasAusentes.has("notas_do_simulado()")) return null;
  const c = _notasDaTurma[chave];
  if(c && (c.carregando || Date.now() - c.em < 5*60*1000)) return c.notas || null;
  _notasDaTurma[chave] = { carregando: true, notas: c ? c.notas : null, em: Date.now() };
  nuvemChamar("/rest/v1/rpc/notas_do_simulado", { method: "POST", body: JSON.stringify({ p_chave: chave }) })
    .then(linhas => {
      _notasDaTurma[chave] = { notas: (linhas || []).map(l => ({ id: l.id, nota: Number(l.nota) })), em: Date.now() };
      if(state.route === "simulado-ativo" || state.route === "simulados") render();
    })
    .catch(e => {
      if(e && e.status === 404) _nuvemTabelasAusentes.add("notas_do_simulado()");   // o banco ainda não tem a função
      _notasDaTurma[chave] = { notas: null, em: Date.now() };
    });
  return c ? c.notas : null;
}

/* ---------------------------- painel da turma -----------------------------
   Números somados no próprio banco (painel_turma, acerto_por_turma e
   atividade_por_semana, no esquema.sql). Só professor e administrador
   recebem linhas — para qualquer outra pessoa o banco devolve nada. O acerto
   só chega somado por ano e por turma: o de cada pessoa não sai do banco.
   Banco que ainda não tem acerto_por_turma (esquema.sql antigo) não derruba
   o painel: as médias somem e a tela diz que faltam. */
async function nuvemPainelTurma(){
  const medias = nuvemChamar("/rest/v1/rpc/acerto_por_turma", { method: "POST", body: "{}" })
    .catch(e => { if(e && e.status === 404) return null; throw e; });
  const [pessoas, semanas, mediasLinhas] = await Promise.all([
    nuvemChamar("/rest/v1/rpc/painel_turma", { method: "POST", body: "{}" }),
    nuvemChamar("/rest/v1/rpc/atividade_por_semana", { method: "POST", body: JSON.stringify({ p_semanas: 12 }) }),
    medias,
  ]);
  return { alunos: pessoas || [], semanas: semanas || [], medias: mediasLinhas === null ? null : (mediasLinhas || []) };
}

/* ---------------------------- aprovar cadastros da turma -----------------
   A regra no banco (ver esquema.sql) deixa professor e administrador lerem e
   atualizarem qualquer perfil; o aluno, só o próprio. Por isso a mesma tela
   de sempre — Aprovar Cadastros — consegue trabalhar direto na nuvem, sem
   ninguém precisar abrir o painel do Supabase para liberar cada aluno. */
let nuvemCadastrosPendentes = null;   // null = ainda não buscamos

async function nuvemBuscarCadastrosPendentes(){
  if(!nuvemConectado()) return [];
  try{
    nuvemCadastrosPendentes = await nuvemChamar("/rest/v1/perfis?status=eq.pendente&order=criado_em.asc&select=*") || [];
  }catch(e){
    nuvemCadastrosPendentes = [];
    toast(e.message || "Não foi possível buscar os cadastros pendentes.", "err");
  }
  render();
  return nuvemCadastrosPendentes;
}

async function nuvemDecidirCadastro(idPerfil, status){
  if(!nuvemConectado()) return;
  try{
    await nuvemChamar("/rest/v1/perfis?id=eq." + encodeURIComponent(idPerfil), {
      method: "PATCH",
      headers: { "Prefer": "return=minimal" },
      body: JSON.stringify({ status }),
    });
    nuvemCadastrosPendentes = (nuvemCadastrosPendentes || []).filter(p => p.id !== idPerfil);
    // dizer PARA ONDE a pessoa foi: sair desta lista sem reaparecer em lugar
    // nenhum era exatamente o que parecia exclusão
    toast(status === "aprovado"
      ? "Cadastro aprovado — a pessoa já pode entrar e agora aparece em Usuários, junto com o resto da turma."
      : "Cadastro recusado. Ele continua listado em Usuários, como recusado.");
    if(nuvemUsuarios !== null) nuvemBuscarUsuarios();
    render();
  }catch(e){
    toast(e.message || "Não foi possível salvar a decisão.", "err");
  }
}

/* ---------------------------- aviso de pedido de acesso -------------------
   Todo cadastro novo nasce pendente e só entra depois que a coordenação
   aprova — mas ninguém ficava sabendo que havia alguém esperando: só quem
   abrisse Aprovar Cadastros por acaso, e a pessoa ficava dias sem conseguir
   entrar. Agora, para quem pode aprovar (permissão "cadastros"), a
   plataforma olha a fila a cada dois minutos e, quando chega um pedido que
   essa pessoa ainda não viu, avisa: um aviso na tela, o número no menu e no
   Início e, se ela tiver deixado (Aprovar Cadastros > Avisos), uma
   notificação do sistema quando o Esc está aberto em outra aba ou janela.

   "Já avisado" é guardado por pessoa (u.cadastrosAvisados, os ids ainda
   pendentes), para o mesmo pedido não tocar de novo a cada F5. Sem nuvem,
   vale o mesmo para os cadastros feitos neste navegador. */
const PEDIDOS_DE_ACESSO_INTERVALO_MS = 2 * 60 * 1000;
let _pedidosDeAcesso = { usuarioId: null, em: 0 };

function podeAprovarCadastros(u){ return podeAdmin("cadastros", u); }
// os da nuvem (quando já buscados) e os deste navegador, sem repetir ninguém
function pedidosDeAcessoPendentes(){
  const vistos = new Set();
  const daNuvem = (nuvemCadastrosPendentes || []).map(p => ({ id: p.id, nome: p.nome || "(sem nome)", ano: p.ano_faculdade || "" }));
  const locais = db.usuarios.filter(x => x.status === "pendente").map(x => ({ id: x.id, nome: x.nome || "(sem nome)", ano: x.anoFaculdade || "" }));
  return [...daNuvem, ...locais].filter(p => !vistos.has(p.id) && vistos.add(p.id));
}
function quantosPedidosDeAcesso(){ return pedidosDeAcessoPendentes().length; }

async function checarPedidosDeAcesso(){
  const u = usuarioAtual();
  if(!u || !podeAprovarCadastros(u)) return;
  if(nuvemConectado()){
    try{
      nuvemCadastrosPendentes = await nuvemChamar("/rest/v1/perfis?status=eq.pendente&order=criado_em.asc&select=*") || [];
    }catch(e){ return; }                 // sem internet: tenta no próximo ciclo, sem incomodar
  }
  if(usuarioAtual() !== u) return;       // trocou de conta enquanto a resposta vinha
  const pendentes = pedidosDeAcessoPendentes();
  const jaAvisados = new Set(u.cadastrosAvisados || []);
  const novos = pendentes.filter(p => !jaAvisados.has(p.id));
  // guarda só quem ainda está pendente: a lista não cresce para sempre
  const agora = pendentes.map(p => p.id);
  if(JSON.stringify(agora) !== JSON.stringify(u.cadastrosAvisados || [])){ u.cadastrosAvisados = agora; saveState(); }
  atualizarMenuLateral();
  if(!novos.length) return;
  if(state.route === "aprovar-cadastros" || state.route === "inicio") render();
  const texto = novos.length === 1
    ? "Novo pedido de acesso: " + novos[0].nome + (novos[0].ano ? " (" + novos[0].ano + ")" : "") + "."
    : novos.length + " novos pedidos de acesso aguardando aprovação.";
  toast(texto + " Veja em Aprovar Cadastros.");
  if(document.hidden && !u.avisoCadastrosDesligado && notificacaoDisponivel() && Notification.permission === "granted"){
    mostrarNotificacao(CONFIG.nomePlataforma + " — pedido de acesso", texto, "aprovar-cadastros", "pedido-de-acesso");
  }
}
/* Chamada a cada 20 s e quando a aba volta: checa na hora quando a conta
   mudou (acabou de entrar) e, fora isso, a cada PEDIDOS_DE_ACESSO_INTERVALO_MS. */
function vigiarPedidosDeAcesso(){
  const u = usuarioAtual();
  if(!u || !podeAprovarCadastros(u)){ _pedidosDeAcesso = { usuarioId: null, em: 0 }; return; }
  const agora = Date.now();
  if(_pedidosDeAcesso.usuarioId === u.id && agora - _pedidosDeAcesso.em < PEDIDOS_DE_ACESSO_INTERVALO_MS) return;
  _pedidosDeAcesso = { usuarioId: u.id, em: agora };
  checarPedidosDeAcesso();
}
function ativarNotificacaoPedidosDeAcesso(){
  if(!notificacaoDisponivel()){ toast("Este navegador não mostra notificações do sistema. O aviso continua na tela e no menu.", "err"); return; }
  Notification.requestPermission().then(perm => {
    const u = usuarioAtual();
    if(perm === "granted"){
      delete u.avisoCadastrosDesligado; saveState();
      toast("Pronto: com o Esc aberto em outra aba ou janela, um pedido de acesso novo também aparece como notificação.");
    }else{
      toast("O navegador não deu permissão para notificações. O aviso continua na tela e no menu.", "err");
    }
    render();
  });
}
function desativarNotificacaoPedidosDeAcesso(){
  const u = usuarioAtual();
  u.avisoCadastrosDesligado = true; saveState();
  toast("Notificação do sistema desligada. O aviso na tela e o número no menu continuam.");
  render();
}
function renderCardAvisoPedidosDeAcesso(){
  const u = usuarioAtual();
  const permitido = notificacaoDisponivel() && Notification.permission === "granted";
  const ligado = permitido && !u.avisoCadastrosDesligado;
  return `<div class="card mb-2">
    <div class="card-title">${iconeSvg("alert")} Avisos de novos pedidos</div>
    <p class="text-sm muted">Sempre que alguém pede acesso, o Esc avisa na tela e mostra o número no menu, ao lado de Aprovar Cadastros — a fila é conferida a cada dois minutos enquanto o Esc está aberto.</p>
    ${!notificacaoDisponivel() ? `<p class="text-xs muted mt-1">Este navegador não mostra notificações do sistema.</p>`
      : ligado ? `<p class="text-sm mt-1">${iconeSvg("check")} Notificação do sistema <strong>ligada</strong>: com o Esc aberto em outra aba ou janela, o pedido novo também aparece como notificação.</p>
        <button class="btn btn-ghost btn-sm mt-1" onclick="desativarNotificacaoPedidosDeAcesso()">Desligar a notificação do sistema</button>`
      : `<button class="btn btn-secondary btn-sm mt-1" onclick="ativarNotificacaoPedidosDeAcesso()">${iconeSvg("alert")} Receber também como notificação do sistema</button>`}
  </div>`;
}

/* ---------------------------- a turma inteira, da nuvem -------------------
   ONDE FOI PARAR QUEM EU APROVEI. Esta é a pergunta que faltava responder.
   A tela de Aprovar Cadastros só consulta `status=eq.pendente`: aprovar
   alguém tira a pessoa dali — correto, ela deixou de estar pendente — mas
   até agora ela não reaparecia em lugar nenhum, porque Admin > Usuários lia
   `db.usuarios`, que é o banco DESTE navegador. E o único perfil da nuvem
   espelhado ali é o de quem está logado (o RLS não deixa o aluno ler os
   outros). Resultado: a coordenação aprovava quatro pessoas e concluía que
   elas tinham sido excluídas.

   Ninguém era excluído — faltava a tela. A política `perfis_ler` do
   esquema.sql já permite a professor e administrador ler TODOS os perfis;
   bastava perguntar. É o que esta função faz. */
let nuvemUsuarios = null;             // null = ainda não buscamos
let nuvemUsuariosErro = null;

async function nuvemBuscarUsuarios(){
  if(!nuvemConectado()) return [];
  try{
    nuvemUsuarios = await nuvemChamar("/rest/v1/perfis?select=*&order=criado_em.asc") || [];
    nuvemUsuariosErro = null;
  }catch(e){
    nuvemUsuarios = [];
    nuvemUsuariosErro = e.message || "Não foi possível buscar os cadastros na nuvem.";
  }
  render();
  return nuvemUsuarios;
}

/* Muda papel, nível ou status de alguém na nuvem. O banco só aceita de
   professor/administrador (gatilho proteger_papel_e_status), então uma
   recusa aqui é informação: quem clicou não tem o nível que pensa ter. */
async function nuvemAtualizarPerfil(idPerfil, campos, mensagem){
  if(!nuvemConectado()) return false;
  try{
    await nuvemChamar("/rest/v1/perfis?id=eq." + encodeURIComponent(idPerfil), {
      method: "PATCH",
      headers: { "Prefer": "return=minimal" },
      body: JSON.stringify(campos),
    });
    const linha = (nuvemUsuarios || []).find(p => p.id === idPerfil);
    if(linha) Object.assign(linha, campos);
    // se for o próprio perfil, o db local acompanha na hora
    const local = db.usuarios.find(u => u.id === idPerfil);
    if(local){
      if(campos.status) local.status = campos.status;
      if(campos.papel) local.papel = campos.papel;
      if(campos.nivel_admin !== undefined){ if(campos.nivel_admin) local.nivelAdmin = campos.nivel_admin; else delete local.nivelAdmin; }
      saveState();
    }
    if(mensagem) toast(mensagem);
    render();
    return true;
  }catch(e){
    toast(e.message || "Não foi possível salvar a alteração na nuvem.", "err");
    return false;
  }
}

/* Excluir de verdade um cadastro da nuvem. Apagar a linha de `perfis` é o
   que corta o acesso: sem perfil, nuvemEntrarPelaTela() recusa a entrada
   mesmo com e-mail e senha certos (a conta de autenticação em si só o painel
   do Supabase remove, com a chave service_role, que não existe neste site).

   A política de exclusão é nova no esquema.sql: um banco criado antes dela
   recusa o DELETE, e aí a mensagem diz exatamente o que rodar. */
async function nuvemExcluirPerfil(idPerfil){
  if(!nuvemConectado()) return false;
  try{
    await nuvemChamar("/rest/v1/perfis?id=eq." + encodeURIComponent(idPerfil), {
      method: "DELETE",
      headers: { "Prefer": "return=minimal" },
    });
    // o servidor pode aceitar a chamada e não apagar nada, quando falta a
    // política: conferimos em vez de confiar no 200
    const conferencia = await nuvemChamar("/rest/v1/perfis?id=eq." + encodeURIComponent(idPerfil) + "&select=id");
    if(conferencia && conferencia.length){
      toast("A nuvem não permitiu excluir este cadastro. Falta a política de exclusão no banco: rode de novo o nuvem/esquema.sql no Supabase (a parte 'perfis_excluir') e tente outra vez. Enquanto isso, 'Inativar' já bloqueia a entrada.", "err");
      return false;
    }
    nuvemUsuarios = (nuvemUsuarios || []).filter(p => p.id !== idPerfil);
    nuvemCadastrosPendentes = (nuvemCadastrosPendentes || []).filter(p => p.id !== idPerfil);
    return true;
  }catch(e){
    toast(e.message || "Não foi possível excluir este cadastro na nuvem.", "err");
    return false;
  }
}

function renderCadastrosPendentesDaNuvem(){
  if(!nuvemConectado()) return "";
  if(nuvemCadastrosPendentes === null){
    nuvemBuscarCadastrosPendentes();
    return `<div class="card mb-2"><p class="text-sm muted">Buscando cadastros na nuvem…</p></div>`;
  }
  return `<div class="card mb-2">
    <div class="card-title">${iconeSvg("database")} Cadastros na nuvem</div>
    <p class="text-sm muted">Contas criadas pelo site, aguardando liberação. Enquanto o cadastro está pendente, a pessoa não consegue entrar.</p>
    ${nuvemCadastrosPendentes.length ? `
      <div class="table-wrap mt-2"><table>
        <thead><tr><th>Nome</th><th>E-mail</th><th>Matrícula</th><th>Ano</th><th></th></tr></thead>
        <tbody>${nuvemCadastrosPendentes.map(p => `<tr>
          <td>${escapeHtml(p.nome || "(sem nome)")}</td>
          <td>${escapeHtml(p.email || "")}</td>
          <td>${escapeHtml(p.matricula || "")}</td>
          <td class="text-sm">${escapeHtml(p.ano_faculdade || "—")}</td>
          <td class="flex gap-1">
            <button class="btn btn-primary btn-sm" onclick="nuvemDecidirCadastro('${p.id}','aprovado')">Aprovar</button>
            <button class="btn btn-danger btn-sm" onclick="nuvemDecidirCadastro('${p.id}','rejeitado')">Recusar</button>
          </td></tr>`).join("")}</tbody>
      </table></div>`
      : `<p class="text-sm mt-2">Nenhum cadastro pendente na nuvem.</p>`}
    <button class="btn btn-secondary btn-sm mt-2" onclick="nuvemBuscarCadastrosPendentes()">${iconeSvg("refresh")} Atualizar lista</button>
  </div>`;
}

/* ---------------------------- o que a pessoa vê --------------------------- */

/* Os registros que a nuvem recusou de vez. Aparecem com o motivo: sem isso, a
   fila simplesmente não baixava e ninguém sabia por quê. */
function nuvemRecusadosHtml(){
  const lista = (db.nuvem && db.nuvem.recusados) || [];
  if(!lista.length) return "";
  return `<div class="card-flat mt-2">
    <div class="text-sm" style="font-weight:600;color:var(--amber)">${lista.length} ${lista.length===1?"registro recusado":"registros recusados"} pela nuvem</div>
    <p class="text-xs muted">O resto do seu estudo subiu normalmente. Mostre esta lista à coordenação: quase sempre é o <code>esquema.sql</code> desatualizado no Supabase.</p>
    ${lista.slice(0,5).map(r => `<div class="text-xs muted mt-1">${escapeHtml(r.tabela)} · ${escapeHtml(r.motivo)}</div>`).join("")}
    ${lista.length > 5 ? `<div class="text-xs muted mt-1">…e mais ${lista.length-5}.</div>` : ""}
    <button class="btn btn-secondary btn-sm mt-2" onclick="nuvemLimparRecusados()">Limpar esta lista</button>
  </div>`;
}

function nuvemLimparRecusados(){
  db.nuvem.recusados = [];
  saveState();
  toast("Lista limpa.");
  render();
}

/* ---------------------------- testar a nuvem -----------------------------
   "Não consigo sincronizar" tem várias causas bem diferentes — projeto do
   Supabase pausado por inatividade, esquema.sql não rodado, endereço errado,
   sessão vencida, internet caída — e todas apareciam como a mesma frase no
   cartão. Este teste separa uma da outra, na ordem em que elas acontecem, e
   diz o que fazer em cada caso (é a tabela do nuvem/LEIA-ME.md, aqui dentro
   da plataforma). */
async function nuvemDiagnosticar(){
  if(!nuvemLigada()){
    abrirModalTitulado("Testar a nuvem", `<p class="text-sm">A nuvem não está configurada neste arquivo: <code>CONFIG.nuvem.url</code> e <code>CONFIG.nuvem.chaveAnon</code> estão vazios. O passo a passo está em <code>nuvem/LEIA-ME.md</code>.</p>
      <button class="btn btn-secondary mt-2" onclick="fecharModal()">Fechar</button>`);
    return;
  }
  const linhas = [];
  const anotar = (ok, texto, conselho) => linhas.push({ok, texto, conselho});

  // 1. este aparelho tem internet?
  const online = !(typeof navigator !== "undefined" && navigator.onLine === false);
  anotar(online, online ? "Este aparelho está conectado à internet." : "Este aparelho está sem internet.",
      online ? "" : "A fila sobe sozinha quando a conexão voltar — pode continuar estudando.");

  // 2. o projeto do Supabase responde e as tabelas existem?
  let projetoOk = false;
  if(online){
    try{
      await nuvemChamar("/rest/v1/perfis?select=id&limit=1", {semToken:true});
      projetoOk = true;
      anotar(true, "O projeto da nuvem respondeu e a tabela perfis existe.", "");
    }catch(e){
      if(e.status === 401 || e.status === 403){
        projetoOk = true;
        anotar(true, "O projeto da nuvem respondeu e as tabelas estão protegidas (é o esperado).", "");
      }else if(e.status === 404){
        anotar(false, "O projeto respondeu, mas a tabela perfis não existe.",
            "Falta rodar o nuvem/esquema.sql no SQL Editor do Supabase (copie o arquivo inteiro).");
      }else if(e.semRede){
        anotar(false, "Não houve resposta do endereço da nuvem.",
            "Projeto do Supabase pausado por inatividade (o plano gratuito pausa depois de uma semana — basta reativar no painel), endereço errado em CONFIG.nuvem.url, ou a internet deste aparelho.");
      }else{
        anotar(false, "O projeto respondeu com erro: " + e.message, "");
      }
    }
  }

  // 3. a sessão desta pessoa ainda vale?
  if(projetoOk){
    if(!nuvemConectado()){
      const atual = db.usuarios.find(u => u.id === state.usuarioAtualId);
      const quem = atual ? ("Você está em \"" + (atual.nome || atual.id) + "\", que é uma conta só deste navegador (demonstração ou de antes da nuvem).")
                         : "Você não está em nenhuma conta.";
      anotar(false, quem + " Nada daqui sobe para a nuvem.",
          "Saia e entre com o e-mail e a senha da sua conta da nuvem — é o único login que sincroniza. Se ainda não tem uma, use Criar conta; o cadastro precisa ser aprovado pela coordenação antes do primeiro acesso.");
    }else if(nuvemEstado.sessaoExpirada){
      anotar(false, "Sua sessão expirou.", "Entre de novo com e-mail e senha. A fila continua guardada.");
    }else{
      try{
        const perfil = await nuvemBuscarPerfil();
        if(perfil && perfil.status === "aprovado"){
          anotar(true, "Sua conta está aprovada e a nuvem devolveu o seu perfil.", "");
        }else if(perfil){
          anotar(false, "Seu cadastro está como \"" + perfil.status + "\".",
              "Só cadastro aprovado sincroniza — peça à coordenação em Aprovar Cadastros.");
        }else{
          anotar(false, "Sua conta existe, mas não tem perfil na nuvem.",
              "O esquema.sql foi rodado depois de a conta ser criada. Rode-o e crie a conta de novo, ou insira o perfil à mão.");
        }
      }catch(e){
        anotar(false, "A nuvem recusou a leitura do seu perfil: " + e.message,
            e.status === 401 || e.status === 403
              ? "Sessão vencida ou alguma tabela sem política de RLS — entre de novo e, se persistir, rode o esquema.sql por inteiro."
              : "");
      }
    }
  }

  // 4. quais tabelas recusam — é o que a mensagem "sem permissão" não dizia
  if(projetoOk && nuvemConectado() && !nuvemEstado.sessaoExpirada){
    const negadas = [];
    let testadas = 0;
    for(const tabela of Object.keys(NUVEM_TABELAS)){
      const coluna = tabela === "perfis" ? "id" : "usuario_id";
      try{
        await nuvemChamar("/rest/v1/" + tabela + "?" + coluna + "=eq." +
          encodeURIComponent(nuvemSessao.usuarioId) + "&select=" + coluna + "&limit=1");
        testadas++;
      }catch(e){
        if(e.status === 401 || e.status === 403) negadas.push(tabela + " (sem permissão)");
        else if(e.status === 404) negadas.push(tabela + " (não existe)");
        else if(e.semRede) break;
        else negadas.push(tabela + " (" + (e.message || "falhou") + ")");
      }
    }
    if(negadas.length){
      anotar(false, "Estas tabelas recusam o seu acesso: " + negadas.join(", ") + ".",
          "É o que causa \"sem permissão\" na sincronização. Rode o nuvem/esquema.sql INTEIRO no SQL Editor do Supabase (ele pode ser rodado de novo sem estragar nada) e teste outra vez.");
    }else if(testadas){
      anotar(true, "As " + testadas + " tabelas do seu estudo aceitam leitura.", "");
    }
  }

  // 5. o que está esperando para subir
  const p = nuvemPendentes();
  const rec = ((db.nuvem && db.nuvem.recusados) || []).length;
  anotar(p === 0, p === 0 ? "Não há nada esperando na fila." : p + (p===1 ? " alteração esperando para subir." : " alterações esperando para subir."),
      p === 0 ? "" : "Clique em Sincronizar agora; se o número não baixar, o motivo é um dos itens acima.");
  if(rec) anotar(false, rec + (rec===1 ? " registro recusado de vez pela nuvem." : " registros recusados de vez pela nuvem."),
               "Veja os motivos no cartão de sincronização, aqui no Perfil.");

  abrirModalTitulado("Testar a nuvem", `
    <p class="text-xs muted">Endereço: <code>${escapeHtml(CONFIG.nuvem.url)}</code></p>
    <div class="mt-2">
      ${linhas.map(l => `
        <div class="card-flat mb-1">
          <div class="text-sm" style="color:${l.ok ? "var(--accent)" : "var(--amber)"};font-weight:600">${l.ok ? "✓" : "!"} ${escapeHtml(l.texto)}</div>
          ${l.conselho ? `<div class="text-xs muted mt-1">${escapeHtml(l.conselho)}</div>` : ""}
        </div>`).join("")}
    </div>
    <p class="text-xs muted">A tabela completa de "quando algo não funciona" está em <code>nuvem/LEIA-ME.md</code>.</p>
    <button class="btn btn-secondary mt-2" onclick="fecharModal()">Fechar</button>`, "lg");
}

function nuvemResumoStatus(){
  if(!nuvemLigada()) return { rotulo:"Só neste navegador", detalhe:"A nuvem não está configurada.", cor:"muted", icone:"database" };
  if(nuvemEstado.sessaoExpirada) return { rotulo:"Sessão expirada", detalhe:"Entre de novo com e-mail e senha. A fila está guardada — nada foi perdido.", cor:"amber", icone:"alert" };
  if(!nuvemConectado()) return { rotulo:"Fora da conta", detalhe:"Entre para sincronizar entre aparelhos.", cor:"muted", icone:"database" };
  if(nuvemEstado.sincronizando) return { rotulo:"Sincronizando…", detalhe:"Enviando e recebendo as novidades.", cor:"accent", icone:"refresh" };
  if(nuvemEstado.ultimoErro) return { rotulo:"Pendente", detalhe:nuvemEstado.ultimoErro, cor:"amber", icone:"alert" };
  const p = nuvemPendentes();
  if(p > 0) return { rotulo: p + (p===1?" item na fila":" itens na fila"), detalhe:"Sobem em segundos, sozinhos.", cor:"amber", icone:"upload" };
  const q = db.nuvem && db.nuvem.ultimaSyncEm;
  return { rotulo:"Tudo sincronizado", detalhe: q ? ("Última vez às " + new Date(q).toLocaleTimeString("pt-BR", {hour:"2-digit", minute:"2-digit"})) : "Conta ligada.", cor:"accent", icone:"check" };
}

function renderChipNuvem(){
  if(!nuvemLigada()) return "";
  const s = nuvemResumoStatus();
  const corTexto = s.cor === "amber" ? "var(--amber)" : s.cor === "accent" ? "var(--accent)" : "var(--muted)";
  return `<button class="icon-btn" title="${escapeHtml(s.rotulo + " — " + s.detalhe)}" style="color:${corTexto}" onclick="navigate('perfil')">${iconeSvg(s.icone)}</button>`;
}

/* ---------------------------- trocar a senha ------------------------------
   Faltava para todo mundo, mas incomodava principalmente fora do papel de
   aluno: professor, residente e coordenação recebem a conta pronta de quem
   cadastrou e ficavam com a senha que lhes foi entregue, sem caminho para
   trocá-la sem pedir para alguém mexer no arquivo.

   São dois caminhos, porque são dois lugares onde a senha mora — e nos dois
   a SENHA ATUAL é exigida. Uma sessão aberta num computador compartilhado
   (ou um celular desbloqueado na mão de outra pessoa) não pode bastar para
   tomar a conta trocando a senha:
   - conta da NUVEM: quem guarda é o servidor, com hash. O Supabase aceitaria
     a troca só com a sessão, então a senha atual é conferida antes, entrando
     de novo com ela (nuvemConferirSenhaAtual); errada, nada muda.
   - conta LOCAL (as de teste e as de antes da nuvem): a senha está no banco
     deste navegador, em texto claro, e é comparada ali mesmo.
   O "esqueci a senha" continua sendo o caminho de quem não lembra a atual. */
function renderCardSenha(){
  const u = usuarioAtual();
  if(!u) return "";
  const naNuvem = nuvemConectado() && nuvemSessao.usuarioId === u.id;
  const minimo = naNuvem ? 6 : 4;
  return `<div class="card mt-2" style="max-width:460px">
    <div class="card-title">${iconeSvg("user")} Mudar a senha</div>
    <p class="text-sm muted">${naNuvem
      ? "Sua senha fica no servidor, com hash — nem este arquivo nem este navegador têm cópia dela. Trocar aqui vale para todos os aparelhos em que você entrar."
      : "Esta é uma conta deste navegador: a senha nova vale só aqui. Se você também tem conta na nuvem, troque a senha dela entrando com ela."}</p>
    <div class="field mt-2"><label class="label">Senha atual</label><input class="input" type="password" id="senhaAtual" placeholder="••••••••" autocomplete="current-password"></div>
    <div class="field"><label class="label">Nova senha</label><input class="input" type="password" id="senhaNova" placeholder="pelo menos ${minimo} caracteres" autocomplete="new-password"></div>
    <div class="field"><label class="label">Repita a nova senha</label><input class="input" type="password" id="senhaNova2" placeholder="••••••••" autocomplete="new-password" onkeydown="if(event.key==='Enter') trocarMinhaSenha()"></div>
    <button class="btn btn-primary btn-sm" onclick="trocarMinhaSenha()">Salvar nova senha</button>
    ${naNuvem ? `<div class="hint mt-1">Não lembra a senha atual? Saia e use "Esqueci a senha" na tela de entrada.</div>` : ""}
  </div>`;
}
function trocarMinhaSenha(){
  const u = usuarioAtual(); if(!u) return;
  const naNuvem = nuvemConectado() && nuvemSessao.usuarioId === u.id;
  const minimo = naNuvem ? 6 : 4;
  const atual = (document.getElementById("senhaAtual") || {}).value || "";
  const nova = document.getElementById("senhaNova").value;
  const nova2 = document.getElementById("senhaNova2").value;
  if(!atual){ toast("Digite a sua senha atual.", "err"); return; }
  if(!nova || nova.length < minimo){ toast("A nova senha precisa ter pelo menos " + minimo + " caracteres.", "err"); return; }
  if(nova !== nova2){ toast("As duas senhas novas não são iguais.", "err"); return; }
  if(nova === atual){ toast("A nova senha é igual à atual.", "err"); return; }
  if(naNuvem){ nuvemTrocarSenha(atual, nova); return; }
  if(u.senha !== atual){ toast("A senha atual está incorreta.", "err"); return; }
  u.senha = nova;
  saveState();
  toast("Senha alterada neste navegador.");
  render();
}
/* Confere a senha atual entrando de novo com ela (grant_type=password). A
   sessão que volta é da mesma pessoa e já é a mais nova, então passa a ser a
   deste aparelho — é com ela que a troca é feita. */
async function nuvemConferirSenhaAtual(senha){
  const email = (nuvemSessao && nuvemSessao.email) || (euNaNuvem() || {}).email || "";
  if(!email) throw new Error("Não foi possível identificar o e-mail desta conta. Saia e entre de novo.");
  let r;
  try{
    r = await nuvemChamar("/auth/v1/token?grant_type=password", {
      method: "POST", semToken: true, body: JSON.stringify({ email, password: senha }),
    });
  }catch(e){
    if(e.status === 400 || /incorretos/i.test(e.message || "")){ const err = new Error("A senha atual está incorreta."); err.senhaErrada = true; throw err; }
    throw e;
  }
  if(!r || !r.access_token || (r.user && r.user.id && r.user.id !== nuvemSessao.usuarioId)) throw new Error("A senha atual está incorreta.");
  nuvemGuardarSessao(Object.assign({}, nuvemSessao, { token: r.access_token, refresh: r.refresh_token || nuvemSessao.refresh }));
}
async function nuvemTrocarSenha(atual, nova){
  try{
    await nuvemConferirSenhaAtual(atual);
    await nuvemChamar("/auth/v1/user", { method:"PUT", body: JSON.stringify({ password: nova }) });
    toast("Senha alterada. Use a nova da próxima vez que entrar, em qualquer aparelho.");
    render();
  }catch(e){
    toast(e.message || "Não foi possível alterar a senha agora.", "err");
  }
}

function renderCardNuvem(){
  if(!nuvemLigada()){
    return `<div class="card mt-2" style="max-width:560px">
      <div class="card-title">${iconeSvg("database")} Estudo em vários aparelhos</div>
      <p class="text-sm muted">Hoje seus dados ficam só neste navegador. Para abrir no celular e continuar de onde parou, é preciso ligar a nuvem — o passo a passo está no arquivo <code>nuvem/LEIA-ME.md</code>, e leva alguns minutos, uma vez só.</p>
    </div>`;
  }
  const s = nuvemResumoStatus();
  const corTexto = s.cor === "amber" ? "var(--amber)" : s.cor === "accent" ? "var(--accent)" : "var(--muted)";
  const locais = nuvemConectado() ? nuvemUsuariosLocaisComDados() : [];
  return `<div class="card mt-2" style="max-width:560px">
    <div class="card-title">${iconeSvg("database")} Conta e sincronização</div>
    ${nuvemConectado() ? `
      <p class="text-sm muted">Conectado como <strong>${escapeHtml((nuvemSessao && nuvemSessao.email) || "")}</strong>. Seu estudo sobe para a nuvem e desce em qualquer aparelho onde você entrar com esta conta.</p>
      <p class="text-sm mt-1" style="color:${corTexto};font-weight:600">${escapeHtml(s.rotulo)}</p>
      <p class="text-xs muted">${escapeHtml(s.detalhe)}</p>
      ${nuvemEstado.sessaoExpirada ? `
        <button class="btn btn-primary btn-sm mt-2" onclick="nuvemEntrarDeNovo()">${iconeSvg("logout")} Entrar de novo</button>
      ` : ""}
      ${db.nuvem && db.nuvem.avisoImagens ? `<div class="card-flat mt-2 text-xs"><strong>${iconeSvg("alert")} Imagens de questões.</strong> ${escapeHtml(db.nuvem.avisoImagens)}</div>` : ""}
      ${_nuvemTabelasAusentes.size ? `<div class="card-flat mt-2 text-xs"><strong>${iconeSvg("alert")} Falta rodar o nuvem/esquema.sql.</strong> Este banco ainda não tem ${[..._nuvemTabelasAusentes].map(t=>"<code>"+escapeHtml(t)+"</code>").join(", ")}. O resto sincroniza normalmente; o que é dessa(s) tabela(s) fica guardado neste navegador e sobe sozinho depois que o SQL for rodado e a página recarregada.</div>` : ""}
      ${nuvemRecusadosHtml()}
      <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
        <button class="btn btn-secondary btn-sm" onclick="nuvemSincronizar({forcarRedesenho:true})">${iconeSvg("refresh")} Sincronizar agora</button>
        <button class="btn btn-secondary btn-sm" onclick="nuvemDiagnosticar()">${iconeSvg("alert")} Testar a nuvem</button>
        ${locais.length ? `<button class="btn btn-secondary btn-sm" onclick="abrirModalTrazerDadosLocais()">${iconeSvg("upload")} Trazer estudo deste navegador</button>` : ""}
        <button class="btn btn-secondary btn-sm" onclick="nuvemSairDaConta()">${iconeSvg("logout")} Sair da conta</button>
      </div>
      <p class="text-xs muted mt-2">O que você faz sobe sozinho poucos segundos depois, tudo junto num envio só; com a aba aberta e parada, a plataforma confere a nuvem a cada 45 segundos, e ao voltar para a aba, ao recuperar a internet, ao entrar e ao sair da conta ela sincroniza na hora.</p>
      <p class="text-xs muted mt-1">Sem internet a plataforma continua funcionando: o que você fizer fica numa fila e sobe sozinho quando a conexão voltar.</p>
    ` : `
      <p class="text-sm muted">A nuvem está configurada, mas você entrou sem conta — o estudo fica só neste navegador. Saia e entre com e-mail e senha para sincronizar.</p>
      <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
        <button class="btn btn-secondary btn-sm" onclick="fazerLogout()">Ir para a tela de entrada</button>
        <button class="btn btn-secondary btn-sm" onclick="nuvemDiagnosticar()">${iconeSvg("alert")} Testar a nuvem</button>
      </div>
    `}
  </div>`;
}

/* Ligações automáticas: sincroniza ao voltar a internet, ao voltar para a aba
   e de tempos em tempos, para o celular receber o que foi feito no
   computador sem a pessoa pedir. Os três casos "na hora" da tabela de
   NUVEM_RITMO moram aqui; os outros dois (entrar e sair da conta) ficam em
   nuvemEntrarPelaTela e nuvemSairDaConta, junto do resto daquele caminho. */
function nuvemLigarGatilhos(){
  if(!nuvemLigada() || typeof window === "undefined") return;
  // a internet voltou: sobe na hora o que ficou esperando
  window.addEventListener("online", () => nuvemSincronizarAgora({forcarRedesenho:true}));
  document.addEventListener("visibilitychange", () => {
    // voltou para a aba: na hora, para a tela já mostrar o que foi feito no
    // outro aparelho. Saiu da aba: o ciclo de 45 s para até ela voltar.
    if(document.hidden){
      if(_nuvemTimerOcioso){ clearTimeout(_nuvemTimerOcioso); _nuvemTimerOcioso = null; }
    }else{
      nuvemSincronizarAgora();
    }
  });
  nuvemCicloOcioso();
}
