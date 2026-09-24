/* Esc — codigo/03-nuvem.js  (parte 3 de 13)
   A nuvem (Supabase): entrar, cadastrar, sair, o mapa das tabelas, a fila de envio e a sincronização.
   Os arquivos de codigo/ são carregados em ordem pelo index.html (lista
   ESC_ARQUIVOS.codigo) e dividem o mesmo espaço: uma função escrita num
   arquivo é usada nos outros sem import. */

/* ==========================================================================
   2-C. NUVEM — conta de verdade e sincronização entre aparelhos
   ==========================================================================
   COMO ISTO FUNCIONA, EM LINGUAGEM SIMPLES

   Até aqui, tudo o que o aluno fazia ficava só no navegador daquele
   computador. Esta seção acrescenta uma segunda cópia, na nuvem, para que a
   mesma pessoa abra a plataforma no celular e continue de onde parou.

   A regra é "primeiro o navegador, depois a nuvem": o app continua salvando
   localmente na hora, como sempre fez, e por isso continua funcionando sem
   internet. Cada coisa que o aluno gera entra também numa FILA DE ENVIO
   (db.filaNuvem). Quando há conexão, a fila sobe e as novidades dos outros
   aparelhos descem. Se a internet cair no meio, a fila espera — nada se
   perde, nada trava.

   O QUE SOBE: só o que é DO ALUNO — respostas, repetição espaçada, cartões
   pessoais, favoritos, metas, histórico e a fila de questões inacabada.
   O QUE NÃO SOBE: as questões, a taxonomia e os cartões da equipe. Isso é
   conteúdo, é igual para todo mundo e continua vindo da pasta "dados/" —
   não faz sentido guardar uma cópia por aluno no banco.

   CONFLITO (a mesma pessoa em dois aparelhos ao mesmo tempo):
   - Respostas, sessões e notas de simulado são REGISTROS: nunca se
     sobrescrevem, apenas se juntam. Responder no celular e no computador
     resulta nas duas respostas, como tem de ser. (O conjunto concluído é a
     exceção: é registro, mas ATUALIZÁVEL, porque a pessoa pode voltar do
     resumo e responder uma questão que tinha ficado em branco.)
   - Repetição espaçada, favoritos, metas e cartões pessoais são ESTADO: vale
     a versão mais recente. No pior caso, uma revisão feita nos mesmos
     segundos nos dois aparelhos fica com o resultado de um só — e é por
     isso que o estado é guardado questão a questão, e não num bloco único.

   LIGAR OU NÃO LIGAR: se CONFIG.nuvem estiver vazio (é como o arquivo vem),
   nada disto roda e a plataforma se comporta exatamente como antes, só com
   o navegador. O passo a passo para ligar está em nuvem/LEIA-ME.md.
   ========================================================================== */

const CHAVE_SESSAO_NUVEM = "esc_nuvem_sessao";

/* A sessão da nuvem (quem está logado e os tokens) NÃO fica no db: é do
   navegador, não da conta, e some quando a pessoa sai. */
let nuvemSessao = null;
let nuvemEstado = { sincronizando:false, ultimoErro:null, ultimaSyncEm:null, sessaoExpirada:false };
let _nuvemTimer = null;
let _nuvemDentroDaSync = false;

/* ---------------------------- o ritmo da sincronização --------------------
   Subir uma chamada de rede por clique seria desperdício (e, num celular no
   corredor do hospital, bateria); subir de minuto em minuto faria a pessoa
   trocar de aparelho e não encontrar o que acabou de fazer. O acordo é este:

   | quando                          | quando sobe            |
   |---------------------------------|------------------------|
   | acabou de mexer em alguma coisa | 2 s depois             |
   | mexeu várias vezes seguidas     | tudo junto, num envio  |
   | aba aberta e parada             | a cada 45 s            |
   | voltou para a aba               | na hora                |
   | a internet voltou               | na hora                |
   | entrou na conta                 | na hora                |
   | saiu da conta                   | na hora                |
   | a fila ficou grande             | na hora                |

   AGRUPAR é o coração disso: cada gravação adia o envio em 2 s, para que
   responder três questões seguidas vire UM envio e não três. O teto existe
   para o caso de quem não para de mexer: passados 5 s da primeira alteração
   que ainda está esperando, o lote sobe do mesmo jeito — sem ele, uma pessoa
   mexendo sem parar ficaria indefinidamente com a fila no navegador. */
const NUVEM_RITMO = {
  agrupar: 2000,       // espera depois de cada alteração, para juntar as seguintes
  tetoAgrupar: 5000,   // nunca segura uma alteração mais do que isto
  ocioso: 45000,       // aba aberta e sem atividade: confere a nuvem de tempos em tempos
  filaGrande: 25,      // fila deste tamanho não espera: sobe na hora
};
let _nuvemTimerOcioso = null;
let _nuvemEsperandoDesde = 0;  // quando entrou a primeira alteração do lote que está esperando

function nuvemLigada(){ return !!(CONFIG.nuvem && CONFIG.nuvem.url && CONFIG.nuvem.chaveAnon); }
function nuvemConectado(){ return nuvemLigada() && !!(nuvemSessao && nuvemSessao.usuarioId); }
function nuvemPendentes(){
  const fila = (db && db.filaNuvem) ? db.filaNuvem.length : 0;
  const cal = (db && db.nuvem && db.nuvem.calendarioPendente) ? db.nuvem.calendarioPendente.length : 0;
  const glob = (db && db.nuvem && db.nuvem.globaisPendentes) ? db.nuvem.globaisPendentes.length : 0;
  return fila + cal + glob;
}

function nuvemCarregarSessaoSalva(){
  try{ nuvemSessao = JSON.parse(localStorage.getItem(CHAVE_SESSAO_NUVEM) || "null"); }
  catch(e){ nuvemSessao = null; }
}
function nuvemGuardarSessao(sessao){
  nuvemSessao = sessao;
  try{
    if(sessao) localStorage.setItem(CHAVE_SESSAO_NUVEM, JSON.stringify(sessao));
    else localStorage.removeItem(CHAVE_SESSAO_NUVEM);
  }catch(e){ /* navegador sem armazenamento: a sessão vale só enquanto a aba estiver aberta */ }
}

/* ---------------------------- a conversa com o servidor ------------------
   Uma função só para todas as chamadas: põe a chave pública e o token da
   pessoa, e, se o token tiver vencido, renova uma vez e tenta de novo. */
async function nuvemChamar(caminho, opcoes = {}){
  if(!nuvemLigada()) throw new Error("A nuvem não está configurada neste arquivo.");
  const cabecalhos = Object.assign({
    "apikey": CONFIG.nuvem.chaveAnon,
    "Content-Type": "application/json",
  }, opcoes.headers || {});
  if(nuvemSessao && nuvemSessao.token && !opcoes.semToken){
    cabecalhos["Authorization"] = "Bearer " + nuvemSessao.token;
  }
  let resposta;
  try{
    resposta = await fetch(CONFIG.nuvem.url.replace(/\/+$/,"") + caminho,
      { method: opcoes.method || "GET", headers: cabecalhos, body: opcoes.body });
  }catch(e){
    const erro = new Error("Sem conexão com o servidor.");
    erro.semRede = true;
    throw erro;
  }
  // 401 só quer dizer "token vencido" quando a chamada levou um token. As
  // chamadas sem token (o teste da nuvem, o próprio refresh) recebem 401 de
  // propósito — o banco está protegido — e não devem derrubar a sessão.
  if(resposta.status === 401 && !opcoes.semToken && nuvemSessao && nuvemSessao.refresh && !opcoes.jaRenovou){
    const renovou = await nuvemRenovarSessao();
    if(renovou) return nuvemChamar(caminho, Object.assign({}, opcoes, {jaRenovou:true}));
    // O token venceu e o refresh não valeu mais (acontece depois de muitos
    // dias fora, ou quando outra aba renovou primeiro). Sem avisar, todas as
    // chamadas seguintes falhariam com "sem permissão" para sempre e a fila
    // nunca desceria. A fila fica guardada: basta entrar de novo.
    nuvemEstado.sessaoExpirada = true;
    const expirou = new Error("Sua sessão na nuvem expirou. Entre de novo com e-mail e senha — nada do que você fez foi perdido.");
    expirou.status = 401;
    expirou.sessaoExpirada = true;
    throw expirou;
  }
  if(resposta.status === 401 && !opcoes.semToken && nuvemSessao && nuvemSessao.token && !nuvemSessao.refresh){
    nuvemEstado.sessaoExpirada = true;
  }
  const texto = await resposta.text();
  if(!resposta.ok){
    const erro = new Error(nuvemMensagemDeErro(resposta.status, texto, caminho, opcoes.method || "GET"));
    erro.status = resposta.status;
    erro.tabela = nuvemNomeDaTabela(caminho);
    throw erro;
  }
  return texto ? JSON.parse(texto) : null;
}

/* Traduz o erro técnico do servidor para uma frase que a pessoa entenda. */
function nuvemNomeDaTabela(caminho){
  const m = /^\/rest\/v1\/([A-Za-z0-9_]+)/.exec(caminho || "");
  return m ? m[1] : "";
}

function nuvemMensagemDeErro(status, texto, caminho, metodo){
  let detalhe = "";
  try{ const j = JSON.parse(texto); detalhe = j.msg || j.message || j.error_description || j.error || j.hint || ""; }
  catch(e){ detalhe = (texto||"").slice(0,180); }
  const d = (detalhe||"").toLowerCase();
  if(d.includes("invalid login credentials")) return "E-mail ou senha incorretos.";
  if(d.includes("already registered") || d.includes("already been registered")) return "Já existe uma conta com este e-mail.";
  if(d.includes("email not confirmed")) return "Confirme o e-mail antes de entrar (veja a caixa de entrada).";
  if(d.includes("password") && d.includes("6")) return "A senha precisa ter pelo menos 6 caracteres.";
  if(status === 401 || status === 403){
    // Dizer só "sem permissão" deixava a pessoa sem saber onde mexer. O que
    // resolve é saber QUAL tabela recusou: é nela que falta a política de
    // RLS ou a permissão de tabela que o esquema.sql cria.
    const tabela = nuvemNomeDaTabela(caminho);
    const acao = (metodo && metodo !== "GET") ? "gravar em" : "ler";
    if(tabela) return "Sem permissão para " + acao + " \"" + tabela + "\" na nuvem. Rode o nuvem/esquema.sql inteiro no Supabase — é ele que cria as regras dessa tabela.";
    return "Sem permissão para esta operação na nuvem.";
  }
  if(status === 404){
    // 404 numa tabela é quase sempre uma tabela que o esquema.sql novo cria e
    // este banco ainda não tem — dizer isso é mais útil do que mandar conferir
    // um endereço que, se estivesse errado, teria falhado em todas as chamadas
    const tabela404 = nuvemNomeDaTabela(caminho);
    if(tabela404) return 'A tabela "' + tabela404 + '" ainda não existe neste banco. Rode o nuvem/esquema.sql inteiro no Supabase — ele cria as tabelas novas sem mexer nas antigas.';
    return "Endereço da nuvem não encontrado — confira CONFIG.nuvem.url.";
  }
  if(status >= 500) return "O servidor da nuvem falhou. Tente de novo em instantes.";
  return detalhe || ("Falha na nuvem (código " + status + ").");
}

async function nuvemRenovarSessao(){
  try{
    const r = await nuvemChamar("/auth/v1/token?grant_type=refresh_token", {
      method:"POST", semToken:true,
      body: JSON.stringify({ refresh_token: nuvemSessao.refresh }),
    });
    if(!r || !r.access_token) return false;
    nuvemGuardarSessao(Object.assign({}, nuvemSessao, {
      token: r.access_token, refresh: r.refresh_token || nuvemSessao.refresh,
    }));
    return true;
  }catch(e){ return false; }
}

/* ---------------------------- entrar, cadastrar, sair --------------------- */
/* ---------- a volta do e-mail para o próprio site -------------------------
   O Supabase manda dois tipos de e-mail com link: CONFIRMAR O E-MAIL (no
   cadastro) e TROCAR A SENHA ("esqueci a senha"). O link passa pelo
   Supabase e depois devolve a pessoa a um endereço — e esse endereço tem de
   ser o do Esc, senão ela cai numa página do Supabase (ou no localhost de
   exemplo) e não sabe o que fazer. Cada pedido leva redirect_to com o
   endereço desta página; o painel do Supabase precisa aceitá-lo em
   Authentication > URL Configuration (passo a passo: nuvem/LEIA-ME.md).

   Na volta, o Supabase escreve no endereço (depois do #) o resultado:
   access_token + type=signup (confirmou), type=recovery (vai trocar a
   senha) ou error_code (o link expirou ou já foi usado). nuvemTratarRetornoDoEmail
   lê isso ANTES do roteador, apaga do endereço na hora (um token não pode
   ficar no histórico nem aparecer num print) e mostra a tela certa. */
function nuvemEnderecoDeRetorno(){
  if(CONFIG.nuvem.enderecoDoSite) return CONFIG.nuvem.enderecoDoSite;
  if(/^https?:$/.test(location.protocol)) return location.origin + location.pathname;
  return "";   // aberto com dois cliques: vale o "Site URL" do painel do Supabase
}
function nuvemComRetorno(caminho){
  const r = nuvemEnderecoDeRetorno();
  return r ? caminho + (caminho.includes("?") ? "&" : "?") + "redirect_to=" + encodeURIComponent(r) : caminho;
}
async function nuvemReenviarConfirmacao(email){
  await nuvemChamar(nuvemComRetorno("/auth/v1/resend"), { method: "POST", semToken: true,
    body: JSON.stringify({ type: "signup", email }) });
}
async function nuvemPedirNovaSenha(email){
  await nuvemChamar(nuvemComRetorno("/auth/v1/recover"), { method: "POST", semToken: true,
    body: JSON.stringify({ email }) });
}
/* O que vai dentro do token (quem é a pessoa), sem biblioteca: é um JSON em
   base64 no meio das três partes do JWT. */
function nuvemLerToken(token){
  try{
    const meio = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(escape(atob(meio + "===".slice((meio.length + 3) % 4)))));
  }catch(e){ return {}; }
}
function nuvemTratarRetornoDoEmail(){
  const hash = location.hash || "";
  if(!/access_token=|error_code=|error_description=/.test(hash)) return false;
  const p = new URLSearchParams(hash.replace(/^#\/?/, ""));
  try{ history.replaceState(null, "", location.pathname + "#/retorno-email"); }catch(e){ location.hash = "#/retorno-email"; }
  state.route = "retorno-email";
  if(p.get("error") || p.get("error_code")){
    const texto = (p.get("error_code") || "") + " " + (p.get("error_description") || "");
    state.retornoEmail = { tipo: "erro", expirou: /expired|invalid|otp/i.test(texto), detalhe: p.get("error_description") || "" };
    return true;
  }
  const tipo = p.get("type") || "signup";
  const token = p.get("access_token"), refresh = p.get("refresh_token");
  if(!nuvemLigada() || !token){ state.retornoEmail = { tipo: "erro", expirou: false, detalhe: "" }; return true; }
  if(tipo === "recovery"){ state.retornoEmail = { tipo: "recovery", token, email: nuvemLerToken(token).email || "" }; return true; }
  state.retornoEmail = { tipo: "confirmado", carregando: true };
  nuvemConcluirConfirmacao(token, refresh);
  return true;
}
/* E-mail confirmado. Se a coordenação já aprovou o cadastro, a pessoa entra
   direto; senão, a tela diz que falta a aprovação — que é o normal. */
async function nuvemConcluirConfirmacao(token, refresh){
  const dados = nuvemLerToken(token);
  try{
    nuvemGuardarSessao({ token, refresh, usuarioId: dados.sub, email: dados.email || "" });
    const perfil = await nuvemBuscarPerfil();
    if(perfil && perfil.status === "aprovado"){
      const u = nuvemAplicarPerfilLocal(perfil);
      state.usuarioAtualId = u.id; db.nuvem.contaId = u.id; saveState();
      toast("E-mail confirmado. Bem-vindo(a), " + (u.nome || "").split(" ")[0] + "!");
      navigate("inicio");
      nuvemSincronizarAgora({ forcarRedesenho: true });
      return;
    }
    nuvemSair();
    state.retornoEmail = { tipo: "confirmado", status: perfil ? perfil.status : "pendente", email: dados.email || "" };
  }catch(e){
    nuvemSair();
    state.retornoEmail = { tipo: "confirmado", status: "pendente", email: dados.email || "" };
  }
  if(state.route === "retorno-email") render();
}
async function nuvemDefinirNovaSenha(token, senha){
  await nuvemChamar("/auth/v1/user", { method: "PUT", semToken: true,
    headers: { "Authorization": "Bearer " + token }, body: JSON.stringify({ password: senha }) });
}

async function nuvemCriarConta(dados){
  const r = await nuvemChamar(nuvemComRetorno("/auth/v1/signup"), {
    method:"POST", semToken:true,
    body: JSON.stringify({
      email: dados.email, password: dados.senha,
      data: { nome: dados.nome, matricula: dados.matricula || "", ano_faculdade: dados.anoFaculdade || "" },
    }),
  });
  // Quando a confirmação de e-mail está desligada, o cadastro já devolve a
  // sessão e a pessoa entra direto. Quando está ligada, ela precisa clicar
  // no link do e-mail antes — por isso os dois casos são tratados.
  return { entrouDireto: !!(r && r.access_token), resposta: r };
}

async function nuvemEntrar(email, senha){
  const r = await nuvemChamar("/auth/v1/token?grant_type=password", {
    method:"POST", semToken:true,
    body: JSON.stringify({ email: email, password: senha }),
  });
  if(!r || !r.access_token) throw new Error("O servidor não devolveu uma sessão válida.");
  nuvemEstado.sessaoExpirada = false;
  nuvemEstado.ultimoErro = null;
  nuvemGuardarSessao({
    token: r.access_token,
    refresh: r.refresh_token,
    usuarioId: r.user && r.user.id,
    email: (r.user && r.user.email) || email,
  });
  return nuvemSessao;
}

function nuvemSair(){
  nuvemGuardarSessao(null);
  nuvemEstado.ultimoErro = null;
  nuvemEstado.sessaoExpirada = false;
}

/* O perfil é o cadastro da pessoa (nome, papel, status) — mora na nuvem e é
   espelhado no db local, para o resto do app continuar lendo de db.usuarios
   como sempre leu. */
async function nuvemBuscarPerfil(){
  const linhas = await nuvemChamar("/rest/v1/perfis?id=eq." + nuvemSessao.usuarioId + "&select=*");
  return (linhas && linhas[0]) || null;
}

function nuvemAplicarPerfilLocal(p){
  let u = db.usuarios.find(x => x.id === p.id);
  if(!u){ u = { id: p.id }; db.usuarios.push(u); }
  u.nome = p.nome || u.nome || "(sem nome)";
  u.email = p.email || (nuvemSessao && nuvemSessao.email) || "";
  u.matricula = p.matricula || "";
  u.papel = p.papel || "aluno";
  u.status = p.status || "pendente";
  u.daNuvem = true;
  delete u.senha;                       // a senha vive no servidor, com hash — nunca aqui
  if(p.nivel_admin) u.nivelAdmin = p.nivel_admin; else delete u.nivelAdmin;
  if(p.ano_faculdade) u.anoFaculdade = p.ano_faculdade;
  if(p.bloco_atual_id) u.blocoAtualId = p.bloco_atual_id;
  if(p.grupo_id) u.grupoId = p.grupo_id;
  if(p.meta_questoes_dia) u.metaQuestoesDia = p.meta_questoes_dia;
  if(p.meta_cartoes_dia) u.metaCartoesDia = p.meta_cartoes_dia;
  if(p.boas_vindas_em) u.boasVindasEm = p.boas_vindas_em;
  u.lembreteMetaAtivo = !!p.lembrete_meta_ativo;
  if(p.lembrete_meta_horario) u.lembreteMetaHorario = p.lembrete_meta_horario;
  if(!u.criadoEm) u.criadoEm = (p.criado_em || "").slice(0,10) || hojeISO();
  return u;
}

/* Manda para a nuvem o que mudou no perfil (metas, ano, turma, lembrete).
   Em vez de chamar isto em cada tela que mexe no cadastro — e esquecer uma —,
   a sincronização compara o perfil de agora com o último que subiu e só
   enfileira quando há diferença. Assim, qualquer tela nova já entra junto.
   Papel e status não entram de propósito: quem promove alguém é a
   coordenação, e o banco recusa a mudança vinda do aluno (ver esquema.sql). */
function nuvemConferirPerfil(){
  if(!nuvemConectado()) return;
  const usuario = db.usuarios.find(u => u.id === nuvemSessao.usuarioId);
  if(!usuario) return;
  const linha = {
    id: usuario.id,
    nome: usuario.nome || "",
    matricula: usuario.matricula || "",
    ano_faculdade: usuario.anoFaculdade || null,
    bloco_atual_id: usuario.blocoAtualId || null,
    grupo_id: usuario.grupoId || null,
    meta_questoes_dia: usuario.metaQuestoesDia || null,
    meta_cartoes_dia: usuario.metaCartoesDia || null,
    lembrete_meta_ativo: !!usuario.lembreteMetaAtivo,
    lembrete_meta_horario: usuario.lembreteMetaHorario || null,
    boas_vindas_em: usuario.boasVindasEm || null,
  };
  const assinatura = JSON.stringify(linha);
  if(db.nuvem.perfilEnviado === assinatura) return;
  nuvemEnfileirar("perfis", linha);
  db.nuvem.perfilEnviado = assinatura;
}

/* ---------------------------- o mapa das tabelas -------------------------
   Para cada tabela da nuvem: como um registro local vira linha do banco,
   como uma linha do banco volta para o db local, e se ela é REGISTRO (só
   junta, nunca sobrescreve) ou ESTADO (vale o mais recente). */
const NUVEM_TABELAS = {
  perfis: {
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.id,
    aplicar: linha => { nuvemAplicarPerfilLocal(linha); },
  },
  respostas: {
    tipo: "registro", tempo: "criado_em",
    chave: r => r.id,
    aplicar: linha => {
      if(db.respostas.some(r => r.id === linha.id)) return;
      db.respostas.push({
        id: linha.id, usuarioId: linha.usuario_id, questaoId: linha.questao_id,
        areaId: linha.area_id, especialidadeId: linha.especialidade_id, assuntoId: linha.assunto_id,
        alternativaEscolhida: linha.alternativa_escolhida, correta: linha.correta,
        confianca: linha.confianca, data: linha.data, tempoSeg: linha.tempo_seg,
        sessaoId: linha.sessao_id,
      });
    },
  },
  revisoes: {
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.usuario_id + "|" + r.questao_id,
    aplicar: linha => {
      if(!db.revisoes[linha.usuario_id]) db.revisoes[linha.usuario_id] = {};
      db.revisoes[linha.usuario_id][linha.questao_id] = {
        repeticoes: linha.repeticoes, fator: linha.fator, intervalo: linha.intervalo,
        proximaRevisao: linha.proxima_revisao, ultimaData: linha.ultima_data,
        ultimaCorreta: linha.ultima_correta, ultimaConfianca: linha.ultima_confianca,
      };
    },
  },
  revisoes_flashcards: {
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.usuario_id + "|" + r.cartao_id,
    aplicar: linha => {
      if(!db.revisoesFlashcards) db.revisoesFlashcards = {};
      if(!db.revisoesFlashcards[linha.usuario_id]) db.revisoesFlashcards[linha.usuario_id] = {};
      db.revisoesFlashcards[linha.usuario_id][linha.cartao_id] = {
        repeticoes: linha.repeticoes, fator: linha.fator, intervalo: linha.intervalo,
        vistas: linha.vistas, proximaRevisao: linha.proxima_revisao,
        ultimaData: linha.ultima_data, ultimaNota: linha.ultima_nota,
      };
    },
  },
  dias_cartoes: {
    // registro (um dia é um dia) mas ATUALIZÁVEL: a quantidade de cartões
    // daquele dia cresce ao longo do dia, e o outro aparelho precisa da
    // contagem nova, não da primeira que subiu
    tipo: "registro", atualizavel: true, tempo: "criado_em",
    chave: r => r.usuario_id + "|" + r.dia,
    aplicar: linha => {
      if(!db.diasCartoes) db.diasCartoes = {};
      const lista = db.diasCartoes[linha.usuario_id] = db.diasCartoes[linha.usuario_id] || [];
      if(!lista.includes(linha.dia)){ lista.push(linha.dia); lista.sort(); }
      if(typeof linha.quantidade === "number"){
        if(!db.cartoesPorDia) db.cartoesPorDia = {};
        if(!db.cartoesPorDia[linha.usuario_id]) db.cartoesPorDia[linha.usuario_id] = {};
        const daqui = db.cartoesPorDia[linha.usuario_id][linha.dia] || 0;
        // dois aparelhos no mesmo dia: vale o maior, porque cada um conta só
        // o que passou por ele e a soma real nunca é menor que qualquer um
        db.cartoesPorDia[linha.usuario_id][linha.dia] = Math.max(daqui, linha.quantidade);
      }
    },
  },
  favoritos: {
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.usuario_id + "|" + r.questao_id,
    aplicar: linha => {
      const i = db.favoritos.findIndex(f => f.usuarioId === linha.usuario_id && f.questaoId === linha.questao_id);
      if(linha.removido){ if(i >= 0) db.favoritos.splice(i, 1); return; }
      const fav = { usuarioId: linha.usuario_id, questaoId: linha.questao_id, data: linha.data, nota: linha.nota || "" };
      if(i >= 0) db.favoritos[i] = fav; else db.favoritos.push(fav);
    },
  },
  favoritos_cartoes: {
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.usuario_id + "|" + r.cartao_id,
    aplicar: linha => {
      if(!Array.isArray(db.favoritosCartoes)) db.favoritosCartoes = [];
      const i = db.favoritosCartoes.findIndex(f => f.usuarioId === linha.usuario_id && f.cartaoId === linha.cartao_id);
      if(linha.removido){ if(i >= 0) db.favoritosCartoes.splice(i, 1); return; }
      const fav = { usuarioId: linha.usuario_id, cartaoId: linha.cartao_id, data: linha.data };
      if(i >= 0) db.favoritosCartoes[i] = fav; else db.favoritosCartoes.push(fav);
    },
  },
  questoes_ocultas: {
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.usuario_id + "|" + r.questao_id,
    aplicar: linha => {
      if(!Array.isArray(db.questoesOcultas)) db.questoesOcultas = [];
      const i = db.questoesOcultas.findIndex(o => o.usuarioId === linha.usuario_id && o.questaoId === linha.questao_id);
      if(linha.removido){ if(i >= 0) db.questoesOcultas.splice(i, 1); return; }
      const reg = { usuarioId: linha.usuario_id, questaoId: linha.questao_id, data: linha.data };
      if(i >= 0) db.questoesOcultas[i] = reg; else db.questoesOcultas.push(reg);
    },
  },
  flashcards_pessoais: {
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.id,
    aplicar: linha => {
      const i = db.flashcards.findIndex(c => c.id === linha.id);
      if(linha.removido){ if(i >= 0) db.flashcards.splice(i, 1); return; }
      const cartao = {
        id: linha.id, usuarioId: linha.usuario_id, assuntoId: linha.assunto_id,
        frente: linha.frente, verso: linha.verso,
        imagemUrl: linha.imagem_url || "", imagemLegenda: linha.imagem_legenda || "",
        questaoOrigemId: linha.questao_origem_id || null,
        origem: linha.origem || "aluno", status: linha.status || "ativo",
        criadoPor: linha.usuario_id, criadoEm: linha.criado_em || hojeISO(),
      };
      if(i >= 0) db.flashcards[i] = cartao; else db.flashcards.push(cartao);
    },
  },
  sessoes: {
    // é registro (um conjunto concluído nunca vira outro), mas ATUALIZÁVEL:
    // depois de ver o resumo dá para voltar e responder uma questão que
    // ficou em branco, e aí a linha daquele conjunto tem de mudar em vez de
    // conviver com uma cópia velha. A chave é a id do conjunto.
    tipo: "registro", atualizavel: true, tempo: "criado_em",
    chave: r => r.id,
    aplicar: linha => {
      const registro = {
        id: linha.id, usuarioId: linha.usuario_id, tipo: linha.tipo, data: linha.data,
        total: linha.total, acertos: linha.acertos, itens: linha.itens || [],
      };
      const i = db.sessoes.findIndex(s => s.id === linha.id);
      if(i >= 0) db.sessoes[i] = registro; else db.sessoes.push(registro);
    },
  },
  resultados_simulados: {
    tipo: "registro", tempo: "criado_em",
    chave: r => r.id,
    aplicar: linha => {
      if(db.resultadosSimulados.some(r => r.id === linha.id)) return;
      db.resultadosSimulados.push({
        id: linha.id, usuarioId: linha.usuario_id, simuladoId: linha.simulado_id,
        titulo: linha.titulo, nota: linha.nota, acertos: linha.acertos, total: linha.total,
        data: linha.data, itens: linha.itens || [], respostas: linha.respostas || {},
        tempos: linha.tempos || {}, tempoTotalSeg: linha.tempo_total_seg,
      });
    },
  },
  sessao_em_andamento: {
    tipo: "estado", tempo: "atualizado_em",
    chave: r => r.usuario_id,
    aplicar: linha => {
      if(!db.sessoesEmAndamento) db.sessoesEmAndamento = {};
      if(linha.dados) db.sessoesEmAndamento[linha.usuario_id] = linha.dados;
      else delete db.sessoesEmAndamento[linha.usuario_id];
    },
  },
};

/* ---------------------------- a fila de envio ----------------------------
   Guardada dentro do db (e portanto no localStorage), para sobreviver a
   fechar o navegador no meio de uma sessão de estudo sem internet. */
function nuvemEnfileirar(tabela, registro){
  if(!nuvemConectado()) return;
  if(!db.filaNuvem) db.filaNuvem = [];
  const desc = NUVEM_TABELAS[tabela];
  if(!desc) return;
  const chave = desc.chave(registro);
  if(desc.tipo === "estado" || desc.atualizavel){
    // estado não se acumula: a versão nova substitui a que ainda não subiu
    const i = db.filaNuvem.findIndex(op => op.tabela === tabela && op.chave === chave);
    if(i >= 0){ db.filaNuvem[i].registro = registro; return; }
  } else if(db.filaNuvem.some(op => op.tabela === tabela && op.chave === chave)){
    return; // registro já enfileirado
  }
  db.filaNuvem.push({ tabela, chave, registro });
}

/* Atalho usado pelas funções do app: monta a linha a partir do que acabou de
   acontecer e põe na fila. Fica tudo num lugar só para o resto do código não
   precisar saber os nomes das colunas do banco. */
function nuvemRegistrar(o){
  if(!nuvemConectado()) return;
  const meuId = nuvemSessao.usuarioId;
  if(o.resposta && o.resposta.usuarioId === meuId){
    const r = o.resposta;
    nuvemEnfileirar("respostas", {
      id: r.id, usuario_id: r.usuarioId, questao_id: r.questaoId,
      area_id: r.areaId || null, especialidade_id: r.especialidadeId || null,
      assunto_id: r.assuntoId || null, alternativa_escolhida: r.alternativaEscolhida,
      correta: !!r.correta, confianca: r.confianca || null, tempo_seg: r.tempoSeg || null,
      sessao_id: r.sessaoId || null, data: r.data,
    });
  }
  if(o.revisao && o.usuarioId === meuId){
    const e = o.revisao;
    nuvemEnfileirar("revisoes", {
      usuario_id: o.usuarioId, questao_id: o.questaoId,
      repeticoes: e.repeticoes, fator: e.fator, intervalo: e.intervalo,
      proxima_revisao: e.proximaRevisao || null, ultima_data: e.ultimaData || null,
      ultima_correta: typeof e.ultimaCorreta === "boolean" ? e.ultimaCorreta : null,
      ultima_confianca: e.ultimaConfianca || null,
    });
  }
  if(o.revisaoCartao && o.usuarioId === meuId){
    const e = o.revisaoCartao;
    nuvemEnfileirar("revisoes_flashcards", {
      usuario_id: o.usuarioId, cartao_id: o.cartaoId,
      repeticoes: e.repeticoes, fator: e.fator, intervalo: e.intervalo, vistas: e.vistas || 0,
      proxima_revisao: e.proximaRevisao || null, ultima_data: e.ultimaData || null,
      ultima_nota: e.ultimaNota || null,
    });
  }
  if(o.diaCartao && o.usuarioId === meuId){
    nuvemEnfileirar("dias_cartoes", {
      usuario_id: o.usuarioId, dia: o.diaCartao,
      quantidade: typeof o.quantidadeCartoesDoDia === "number" ? o.quantidadeCartoesDoDia : 0,
    });
  }
  if(o.favorito && o.favorito.usuarioId === meuId){
    nuvemEnfileirar("favoritos", {
      usuario_id: o.favorito.usuarioId, questao_id: o.favorito.questaoId,
      data: o.favorito.data || hojeISO(), nota: o.favorito.nota || "",
      removido: !!o.favorito.removido,
    });
  }
  if(o.favoritoCartao && o.favoritoCartao.usuarioId === meuId){
    nuvemEnfileirar("favoritos_cartoes", {
      usuario_id: o.favoritoCartao.usuarioId, cartao_id: o.favoritoCartao.cartaoId,
      data: o.favoritoCartao.data || hojeISO(), removido: !!o.favoritoCartao.removido,
    });
  }
  if(o.questaoOculta && o.questaoOculta.usuarioId === meuId){
    nuvemEnfileirar("questoes_ocultas", {
      usuario_id: o.questaoOculta.usuarioId, questao_id: o.questaoOculta.questaoId,
      data: o.questaoOculta.data || hojeISO(), removido: !!o.questaoOculta.removido,
    });
  }
  if(o.cartaoPessoal && o.cartaoPessoal.usuarioId === meuId){
    const c = o.cartaoPessoal;
    nuvemEnfileirar("flashcards_pessoais", {
      id: c.id, usuario_id: c.usuarioId, assunto_id: c.assuntoId || null,
      frente: c.frente, verso: c.verso, imagem_url: c.imagemUrl || null,
      imagem_legenda: c.imagemLegenda || null, questao_origem_id: c.questaoOrigemId || null,
      origem: c.origem || "aluno", status: c.status || "ativo",
      removido: !!o.removido, criado_em: c.criadoEm || hojeISO(),
    });
  }
  if(o.sessaoConcluida && o.sessaoConcluida.usuarioId === meuId){
    const s = o.sessaoConcluida;
    nuvemEnfileirar("sessoes", {
      id: s.id, usuario_id: s.usuarioId, tipo: s.tipo, data: s.data,
      total: s.total, acertos: s.acertos, itens: s.itens || [],
    });
  }
  if(o.resultadoSimulado && o.resultadoSimulado.usuarioId === meuId){
    const r = o.resultadoSimulado;
    nuvemEnfileirar("resultados_simulados", {
      id: r.id, usuario_id: r.usuarioId, simulado_id: r.simuladoId || null,
      titulo: r.titulo || null, nota: r.nota, acertos: r.acertos, total: r.total,
      data: r.data, itens: r.itens || [], respostas: r.respostas || {},
      tempos: r.tempos || {}, tempo_total_seg: r.tempoTotalSeg || null,
    });
  }
  if(o.sessaoEmAndamento && o.usuarioId === meuId){
    nuvemEnfileirar("sessao_em_andamento", {
      usuario_id: o.usuarioId,
      dados: o.sessaoEmAndamento === "apagar" ? null : o.sessaoEmAndamento,
    });
  }
}

/* ---------------------------- sincronizar --------------------------------- */
async function nuvemSincronizar(opcoes = {}){
  if(!nuvemConectado() || nuvemEstado.sincronizando) return false;
  // sessão vencida: insistir só geraria erro atrás de erro. A fila fica
  // guardada e sobe quando a pessoa entrar de novo.
  if(nuvemEstado.sessaoExpirada){
    nuvemEstado.ultimoErro = "Sua sessão expirou. Entre de novo para sincronizar — nada foi perdido.";
    return false;
  }
  if(typeof navigator !== "undefined" && navigator.onLine === false){
    nuvemEstado.ultimoErro = "Sem conexão — a fila sobe assim que a internet voltar.";
    return false;
  }
  nuvemEstado.sincronizando = true;
  _nuvemDentroDaSync = true;
  const erroAntes = nuvemEstado.ultimoErro;
  nuvemEstado.ultimoErro = null;
  try{
    nuvemConferirPerfil();
    let recusados = await nuvemEnviarFila();
    await nuvemReceberMudancas();
    await nuvemBaixarCalendario();
    recusados += await nuvemEnviarCalendarioPendente();
    recusados += await nuvemEnviarGlobaisPendentes();
    await nuvemBaixarGlobais();
    if(recusados){
      nuvemEstado.ultimoErro = recusados + (recusados === 1
        ? " registro foi recusado pela nuvem (veja o motivo abaixo). O resto subiu."
        : " registros foram recusados pela nuvem (veja os motivos abaixo). O resto subiu.");
    }
    nuvemEstado.ultimaSyncEm = new Date().toISOString();
    db.nuvem.ultimaSyncEm = nuvemEstado.ultimaSyncEm;
    saveState();
    return true;
  }catch(e){
    nuvemEstado.ultimoErro = e.semRede
      ? "Sem conexão — a fila sobe assim que a internet voltar."
      : (e.message || "Falha ao sincronizar.");
    saveState();
    if(!opcoes.silencioso && !e.semRede) toast(nuvemEstado.ultimoErro, "err");
    return false;
  }finally{
    nuvemEstado.sincronizando = false;
    _nuvemDentroDaSync = false;
    if(!opcoes.semRedesenhar && (opcoes.forcarRedesenho || erroAntes !== nuvemEstado.ultimoErro || nuvemPendentes() === 0)){
      if(typeof render === "function" && state.usuarioAtualId) render();
    }
  }
}

/* Um erro de rede, de sessão ou do servidor é passageiro: a fila espera e
   tenta de novo. Um erro de conteúdo (o servidor entendeu e recusou) não
   melhora com o tempo — insistir nele travaria a fila para sempre. */
function nuvemErroPassageiro(e){
  if(e.semRede) return true;                 // sem internet
  if(e.sessaoExpirada) return true;          // precisa entrar de novo
  if(e.status === 401 || e.status === 403) return true;  // token ou permissão
  if(e.status === 429) return true;          // servidor pedindo calma
  if(e.status >= 500) return true;           // servidor com problema
  return false;
}

/* Colunas que chegaram depois do primeiro esquema.sql. Quem criou o banco
   antes delas ainda não as tem, e o servidor recusaria o lote INTEIRO — a
   pessoa perderia a sincronização daquela tabela por causa de um campo que
   ela nem usa. Então: na primeira recusa por causa da coluna, o envio é
   refeito sem ela, e assim segue até a página ser recarregada (depois de
   rodar o nuvem/esquema.sql, um F5 volta a mandar tudo). O dado em si nunca
   se perde: ele vive no navegador como todo o resto. */
const NUVEM_CAMPOS_NOVOS = {
  perfis: ["boas_vindas_em"],     // quando a pessoa passou pela tela de primeiro acesso
  favoritos: ["nota"],            // a anotação pessoal da questão salva
  dias_cartoes: ["quantidade"],   // quantos cartões naquele dia
};
const _nuvemCamposAusentes = {};  // tabela -> lista de colunas que este banco não tem
function nuvemCampoQueFalta(tabela, e){
  const candidatos = NUVEM_CAMPOS_NOVOS[tabela] || [];
  const jaSabidos = _nuvemCamposAusentes[tabela] || [];
  const msg = e && e.message ? e.message : "";
  return candidatos.find(c => jaSabidos.indexOf(c) < 0 && new RegExp("'?" + c + "'?", "i").test(msg)) || null;
}
function nuvemSemOsCamposQueFaltam(tabela, registros){
  const fora = _nuvemCamposAusentes[tabela];
  if(!fora || !fora.length) return registros;
  return registros.map(r => {
    const copia = Object.assign({}, r);
    fora.forEach(c => delete copia[c]);
    return copia;
  });
}

/* Tabela nova que o banco de quem já usava a nuvem ainda não tem (enquanto o
   nuvem/esquema.sql não for rodado de novo). Sem isto, a DESCIDA quebraria
   inteira no primeiro 404 — uma tabela nova derrubaria a sincronização de
   todas as outras, que é o oposto do que uma novidade deve fazer. Aqui ela é
   anotada e pulada até a página ser recarregada; o que é dela fica guardado
   no navegador, como tudo mais. */
const _nuvemTabelasAusentes = new Set();
function nuvemTabelaNaoExiste(e){
  if(!e) return false;
  // tabela que falta responde 404 com o nome dela no caminho; coluna que
  // falta responde 400 e é tratada em NUVEM_CAMPOS_NOVOS, não aqui
  return e.status === 404 && !!e.tabela;
}
async function nuvemPostarLote(tabela, desc, registros){
  const juntar = (desc.tipo === "registro" && !desc.atualizavel) ? "resolution=ignore-duplicates" : "resolution=merge-duplicates";
  try{
    await nuvemChamar("/rest/v1/" + tabela, {
      method: "POST",
      headers: { "Prefer": juntar + ",return=minimal" },
      body: JSON.stringify(nuvemSemOsCamposQueFaltam(tabela, registros)),
    });
  }catch(e){
    const campo = nuvemCampoQueFalta(tabela, e);
    if(!campo) throw e;
    if(!_nuvemCamposAusentes[tabela]) _nuvemCamposAusentes[tabela] = [];
    _nuvemCamposAusentes[tabela].push(campo);
    await nuvemPostarLote(tabela, desc, registros);   // de novo, agora sem a coluna
  }
}

function nuvemTirarDaFila(ops){
  const fora = new Set(ops);
  db.filaNuvem = db.filaNuvem.filter(op => !fora.has(op));
}

/* Registro que a nuvem recusou de vez. Fica guardado (no máximo 50, os mais
   recentes) para a pessoa e a coordenação verem o motivo em Perfil, em vez
   de a fila só ficar parada sem explicação. */
function nuvemGuardarRecusado(tabela, op, motivo){
  if(!Array.isArray(db.nuvem.recusados)) db.nuvem.recusados = [];
  db.nuvem.recusados.unshift({
    tabela, chave: op.chave, motivo: motivo || "recusado pela nuvem",
    em: new Date().toISOString(),
  });
  db.nuvem.recusados = db.nuvem.recusados.slice(0, 50);
}

/* ---------------------------- calendário (compartilhado) -----------------
   O calendário de blocos não é estudo de uma pessoa: é o mesmo para todo
   mundo do ano, e só professor/administrador grava (a regra fica no banco,
   em calendario_alterar). Por isso ele não entra no mapa NUVEM_TABELAS (que
   é todo pensado em "linhas de um usuário só") — tem sua própria descida e
   subida, mais simples: a tabela inteira baixa para quem está conectado, e
   sobe só quando alguém com permissão de editar salva um ano. */
async function nuvemBaixarCalendario(){
  if(!db.nuvem.marcas) db.nuvem.marcas = {};
  if(!db.nuvem.calendarioPendente) db.nuvem.calendarioPendente = [];
  const desde = db.nuvem.marcas.calendario || "1970-01-01T00:00:00Z";
  const linhas = await nuvemChamar("/rest/v1/calendario?atualizado_em=gt." +
    encodeURIComponent(desde) + "&order=atualizado_em.asc&select=*");
  if(!linhas || !linhas.length) return;
  if(!db.sequenciasAno) db.sequenciasAno = {};
  let maior = desde;
  linhas.forEach(l => {
    // um ano que está na fila para subir daqui é mais novo que o que
    // acabou de descer: não sobrescreve o que ainda não foi enviado
    if(db.nuvem.calendarioPendente.includes(l.ano)) return;
    db.sequenciasAno[l.ano] = l.sequencia || [];
    // o exemplo antigo guardado na nuvem não pode desfazer o calendário real;
    // quem é da equipe já sobe o real no lugar, para ninguém mais receber
    if(trocarSequenciaDeExemplo(l.ano) && podeEditarCalendarioNaNuvem()) nuvemMarcarCalendarioPendente(l.ano);
    if(l.atualizado_em > maior) maior = l.atualizado_em;
  });
  if(maior !== desde) db.nuvem.marcas.calendario = maior;
}

/* Sobe os anos marcados como pendentes. Devolve quantos foram recusados de
   vez (ex.: quem salvou não é professor/admin, ou a política do banco ainda
   não foi criada) — o mesmo padrão de nuvemEnviarFila, reaproveitando
   nuvemGuardarRecusado para aparecer no mesmo lugar da tela. */
async function nuvemEnviarCalendarioPendente(){
  if(!db.nuvem.calendarioPendente || !db.nuvem.calendarioPendente.length) return 0;
  const pendentes = db.nuvem.calendarioPendente.slice();
  let recusados = 0;
  for(const ano of pendentes){
    try{
      await nuvemChamar("/rest/v1/calendario", {
        method: "POST",
        headers: { "Prefer": "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify([{ ano, sequencia: db.sequenciasAno[ano] || [], atualizado_por: nuvemSessao.usuarioId }]),
      });
      db.nuvem.calendarioPendente = db.nuvem.calendarioPendente.filter(a => a !== ano);
    }catch(e){
      if(nuvemErroPassageiro(e)) throw e;   // fica pendente, tenta de novo depois
      nuvemGuardarRecusado("calendario", { chave: ano }, e.message);
      db.nuvem.calendarioPendente = db.nuvem.calendarioPendente.filter(a => a !== ano);
      recusados++;
    }
  }
  return recusados;
}

/* Mesma regra do banco (e_equipe(), em nuvem/esquema.sql): só professor ou
   administrador aprovado grava o calendário. Conferir antes evita pôr na
   fila um envio que a nuvem certamente recusaria. */
function podeEditarCalendarioNaNuvem(){
  const eu = nuvemSessao && db.usuarios.find(x => x.id === nuvemSessao.usuarioId);
  return !!(eu && eu.status === "aprovado" && (eu.papel === "professor" || eu.papel === "admin"));
}

/* Quem entra em Revisar Formatação: a equipe e os residentes — a mesma
   regra de e_revisor(), em nuvem/esquema.sql. */
function podeRevisarNaNuvem(){
  const eu = nuvemSessao && db.usuarios.find(x => x.id === nuvemSessao.usuarioId);
  return !!(eu && eu.status === "aprovado" && ["professor","admin","residente"].includes(eu.papel));
}

/* ---------------------------- outras tabelas compartilhadas --------------
   Como o calendário, estas são de TODO MUNDO, não de uma pessoa: o Livro de
   Ouro (os agradecimentos que aparecem na tela inicial) e as questões cuja
   formatação já foi aprovada em Revisar Formatação (para a questão sair da
   fila dos outros revisores). Todos leem; grava quem tem o papel certo, e
   quem salvar por último vence aquele registro.

   Cada tabela diz como transformar a linha da nuvem em dado local
   (aplicar) e como montar a linha a partir do dado local (linha). A fila é
   de CHAVES, não de linhas: a linha é montada na hora de subir, então duas
   edições seguidas do mesmo registro sobem uma vez, já com a última
   versão — e uma remoção sobe como remoção. */
const NUVEM_GLOBAIS = {
  livro_ouro: {
    chave: l => l.id,
    podeGravar: () => podeEditarCalendarioNaNuvem(),
    aplicar: l => {
      if(!Array.isArray(db.livroOuro)) db.livroOuro = [];
      const i = db.livroOuro.findIndex(x => x.id === l.id);
      if(l.removido){ if(i >= 0) db.livroOuro.splice(i, 1); return; }
      const reg = Object.assign({}, l.dados || {}, { id: l.id });
      if(i >= 0) db.livroOuro[i] = reg; else db.livroOuro.push(reg);
    },
    linha: id => {
      const r = (db.livroOuro || []).find(x => x.id === id);
      if(!r) return { id, dados: {}, removido: true };
      const dados = Object.assign({}, r); delete dados.id;
      return { id, dados, removido: false };
    },
  },
  formatacao_aprovada: {
    chave: l => l.questao_id,
    podeGravar: () => podeRevisarNaNuvem(),
    aplicar: l => {
      if(!db.formatacaoAprovada) db.formatacaoAprovada = {};
      if(l.aprovada) db.formatacaoAprovada[l.questao_id] = { porNome: l.por_nome || "", em: (l.atualizado_em || "").slice(0,10) || hojeISO() };
      else delete db.formatacaoAprovada[l.questao_id];
    },
    linha: qid => {
      const a = (db.formatacaoAprovada || {})[qid];
      return { questao_id: qid, aprovada: !!a, por_nome: a ? (a.porNome || "") : "" };
    },
  },
};
/* COMENTÁRIOS E DÚVIDAS nas questões. São de todos (a dúvida do aluno
   precisa chegar ao residente), mas cada linha tem dono: o banco só aceita
   o comentário de quem está escrevendo, e "resposta oficial" só de quem
   revisa (ver comentarios no esquema.sql). Remover um comentário marca
   `removido` — assim a remoção também desce para os outros aparelhos. */
NUVEM_GLOBAIS.comentarios = {
  chave: l => l.id,
  podeGravar: () => true,
  aplicar: l => {
    if(!Array.isArray(db.comentarios)) db.comentarios = [];
    const i = db.comentarios.findIndex(x => x.id === l.id);
    const reg = {
      id: l.id, questaoId: l.questao_id, usuarioId: l.usuario_id, autorNome: l.autor_nome || "",
      papelAutor: l.papel_autor || "aluno", texto: l.texto || "", data: l.data || (l.atualizado_em || "").slice(0,10),
      respostaOficial: !!l.resposta_oficial, removido: !!l.removido,
    };
    if(i >= 0) db.comentarios[i] = Object.assign(db.comentarios[i], reg); else db.comentarios.push(reg);
  },
  linha: id => {
    const c = (db.comentarios || []).find(x => x.id === id);
    if(!c) return null;
    return {
      id: c.id, questao_id: c.questaoId, usuario_id: c.usuarioId, autor_nome: c.autorNome || "",
      papel_autor: c.papelAutor || null, texto: c.texto || "", data: c.data || null,
      resposta_oficial: !!c.respostaOficial, removido: !!c.removido,
    };
  },
};

function nuvemMarcarGlobalPendente(tabela, chave){
  if(!nuvemConectado() || !NUVEM_GLOBAIS[tabela] || !NUVEM_GLOBAIS[tabela].podeGravar()) return;
  if(!Array.isArray(db.nuvem.globaisPendentes)) db.nuvem.globaisPendentes = [];
  if(!db.nuvem.globaisPendentes.some(p => p.tabela === tabela && p.chave === chave)) db.nuvem.globaisPendentes.push({ tabela, chave });
}
async function nuvemBaixarGlobais(){
  if(!db.nuvem.marcas) db.nuvem.marcas = {};
  const pendentes = db.nuvem.globaisPendentes || [];
  for(const [tabela, desc] of Object.entries(NUVEM_GLOBAIS)){
    if(_nuvemTabelasAusentes.has(tabela)) continue;
    const desde = db.nuvem.marcas[tabela] || "1970-01-01T00:00:00Z";
    let linhas;
    try{
      linhas = await nuvemChamar("/rest/v1/" + tabela + "?atualizado_em=gt." +
        encodeURIComponent(desde) + "&order=atualizado_em.asc&limit=1000&select=*");
    }catch(e){
      // tabela que o esquema.sql desta versão cria e o banco ainda não tem
      if(!nuvemTabelaNaoExiste(e)) throw e;
      _nuvemTabelasAusentes.add(tabela);
      continue;
    }
    let maior = desde;
    (linhas || []).forEach(l => {
      const chave = desc.chave(l);
      // o que ainda vai subir daqui é mais novo que o que desceu
      if(!pendentes.some(p => p.tabela === tabela && p.chave === chave)){
        try{ desc.aplicar(l); }catch(e){ console.error("Linha da nuvem ignorada em " + tabela, e); }
      }
      if(l.atualizado_em > maior) maior = l.atualizado_em;
    });
    if(maior !== desde) db.nuvem.marcas[tabela] = maior;
  }
}
async function nuvemEnviarGlobaisPendentes(){
  const fila = (db.nuvem.globaisPendentes || []).slice();
  let recusados = 0;
  for(const p of fila){
    const desc = NUVEM_GLOBAIS[p.tabela];
    const tirar = () => { db.nuvem.globaisPendentes = db.nuvem.globaisPendentes.filter(x => !(x.tabela === p.tabela && x.chave === p.chave)); };
    if(!desc){ tirar(); continue; }
    if(_nuvemTabelasAusentes.has(p.tabela)) continue;   // sobe quando a tabela existir
    const linha = desc.linha(p.chave);
    if(!linha){ tirar(); continue; }                     // o registro não existe mais aqui: nada a subir
    try{
      await nuvemChamar("/rest/v1/" + p.tabela, {
        method: "POST",
        headers: { "Prefer": "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify([Object.assign(linha, { atualizado_por: nuvemSessao.usuarioId })]),
      });
      tirar();
    }catch(e){
      if(nuvemTabelaNaoExiste(e)){ _nuvemTabelasAusentes.add(p.tabela); continue; }
      if(nuvemErroPassageiro(e)) throw e;
      nuvemGuardarRecusado(p.tabela, { chave: p.chave }, e.message);
      tirar();
      recusados++;
    }
  }
  return recusados;
}

/* Marca um ano para subir na próxima sincronização — chamado depois de
   qualquer edição na sequência de blocos daquele ano. */
function nuvemMarcarCalendarioPendente(ano){
  if(!nuvemConectado()) return;
  if(!db.nuvem.calendarioPendente) db.nuvem.calendarioPendente = [];
  if(!db.nuvem.calendarioPendente.includes(ano)) db.nuvem.calendarioPendente.push(ano);
}

/* Sobe a fila. Devolve quantos registros a nuvem recusou de vez.
   Um registro ruim (uma coluna que o banco não conhece, um id repetido de
   outra pessoa) não pode impedir todo o resto de subir nem o download de
   acontecer: por isso, quando um lote é recusado, ele é tentado de novo um a
   um e só o registro culpado sai da fila, com o motivo guardado. */
async function nuvemEnviarFila(){
  if(!db.filaNuvem || !db.filaNuvem.length) return 0;
  // uma chamada por tabela, em lotes, mantendo a ordem em que aconteceram
  const tabelas = [];
  db.filaNuvem.forEach(op => { if(!tabelas.includes(op.tabela)) tabelas.push(op.tabela); });
  let recusados = 0;
  for(const tabela of tabelas){
    const desc = NUVEM_TABELAS[tabela];
    if(!desc){ nuvemTirarDaFila(db.filaNuvem.filter(op => op.tabela === tabela)); continue; }
    if(_nuvemTabelasAusentes.has(tabela)) continue;  // sobe quando a tabela existir
    const ops = db.filaNuvem.filter(op => op.tabela === tabela);
    for(let i = 0; i < ops.length; i += 200){
      const lote = ops.slice(i, i + 200);
      try{
        await nuvemPostarLote(tabela, desc, lote.map(op => op.registro));
        nuvemTirarDaFila(lote);              // só sai da fila o que o servidor confirmou
      }catch(e){
        if(nuvemTabelaNaoExiste(e)){
          // a tabela é nova e este banco ainda não a tem: o que é dela espera
          // guardado, e as outras tabelas seguem sincronizando normalmente
          _nuvemTabelasAusentes.add(tabela);
          break;
        }
        if(nuvemErroPassageiro(e)) throw e;  // a fila inteira espera a próxima vez
        for(const op of lote){
          try{
            await nuvemPostarLote(tabela, desc, [op.registro]);
            nuvemTirarDaFila([op]);
          }catch(e2){
            if(nuvemErroPassageiro(e2)) throw e2;
            nuvemGuardarRecusado(tabela, op, e2.message);
            nuvemTirarDaFila([op]);
            recusados++;
          }
        }
      }
    }
  }
  return recusados;
}

async function nuvemReceberMudancas(){
  const meuId = nuvemSessao.usuarioId;
  if(!db.nuvem.marcas) db.nuvem.marcas = {};
  for(const [tabela, desc] of Object.entries(NUVEM_TABELAS)){
    if(_nuvemTabelasAusentes.has(tabela)) continue;
    const coluna = tabela === "perfis" ? "id" : "usuario_id";
    const desde = db.nuvem.marcas[tabela] || "1970-01-01T00:00:00Z";
    let maior = desde, pagina = 0;
    while(true){
      let linhas;
      try{
        linhas = await nuvemChamar(
          "/rest/v1/" + tabela +
          "?" + coluna + "=eq." + encodeURIComponent(meuId) +
          "&" + desc.tempo + "=gt." + encodeURIComponent(desde) +
          "&order=" + desc.tempo + ".asc&limit=500&offset=" + (pagina * 500));
      }catch(e){
        // tabela nova que este banco ainda não tem: pula e segue com o resto,
        // em vez de derrubar a descida inteira por causa dela
        if(!nuvemTabelaNaoExiste(e)) throw e;
        _nuvemTabelasAusentes.add(tabela);
        break;
      }
      if(!linhas || !linhas.length) break;
      linhas.forEach(linha => {
        // o que ainda está na fila é mais novo que o servidor: não sobrescreve
        const chave = desc.chave(linha);
        if(db.filaNuvem.some(op => op.tabela === tabela && op.chave === chave)) return;
        try{ desc.aplicar(linha); }
        catch(e){ console.error("Linha da nuvem ignorada em " + tabela, e); }
        const t = linha[desc.tempo];
        if(t && t > maior) maior = t;
      });
      if(linhas.length < 500) break;
      pagina++;
    }
    // a marca d'água usa o relógio DO SERVIDOR (o horário que veio na linha),
    // nunca o do computador — relógio adiantado no celular pularia registros
    if(maior !== desde) db.nuvem.marcas[tabela] = maior;
  }
}

/* Chamada depois de cada gravação: junta as mudanças e sobe em bloco poucos
   segundos depois, em vez de uma chamada de rede por clique. Ver NUVEM_RITMO,
   no alto desta seção, para a tabela completa de "quando sobe o quê". */
function nuvemAgendarSync(){
  if(!nuvemConectado() || _nuvemDentroDaSync) return;
  // fila grande não espera: quanto mais coisa parada no navegador, mais se
  // perde se o aparelho for fechado antes do próximo envio
  if(nuvemPendentes() >= NUVEM_RITMO.filaGrande){ nuvemSincronizarAgora(); return; }
  const agora = Date.now();
  if(!_nuvemEsperandoDesde) _nuvemEsperandoDesde = agora;
  const restaDoTeto = NUVEM_RITMO.tetoAgrupar - (agora - _nuvemEsperandoDesde);
  const espera = Math.max(0, Math.min(NUVEM_RITMO.agrupar, restaDoTeto));
  if(_nuvemTimer) clearTimeout(_nuvemTimer);
  _nuvemTimer = setTimeout(() => { _nuvemTimer = null; nuvemSincronizarAgora(); }, espera);
}

/* Sobe agora, sem esperar o agrupamento: é o caminho de quem voltou para a
   aba, recuperou a internet, entrou ou saiu da conta, e também o fim da
   espera acima. Devolve a promessa da sincronização, para quem precisa
   esperar o fim dela (sair da conta, por exemplo). */
function nuvemSincronizarAgora(opcoes = {}){
  if(_nuvemTimer){ clearTimeout(_nuvemTimer); _nuvemTimer = null; }
  if(_nuvemTimerOcioso){ clearTimeout(_nuvemTimerOcioso); _nuvemTimerOcioso = null; }
  _nuvemEsperandoDesde = 0;
  const promessa = nuvemSincronizar(Object.assign({silencioso:true}, opcoes));
  const depois = (subiu) => {
    // sobrou fila porque algo entrou nela durante o envio: novo lote, mesma
    // regra de agrupamento. Se a sincronização falhou, quem tenta de novo é o
    // ciclo da aba aberta (ou a volta da internet) — insistir aqui viraria um
    // laço de tentativas a cada dois segundos com a internet caída.
    if(subiu && nuvemPendentes() > 0){ nuvemAgendarSync(); return; }
    nuvemCicloOcioso();
  };
  promessa.then(depois, () => depois(false));
  return promessa;
}

/* Aba aberta e sem ninguém mexendo: de 45 em 45 s a plataforma confere se há
   novidade vinda de outro aparelho. Com a aba escondida o ciclo para — não
   adianta gastar rede numa tela que ninguém está vendo, e voltar para a aba
   já sincroniza na hora (ver nuvemLigarGatilhos). */
function nuvemCicloOcioso(){
  if(_nuvemTimerOcioso){ clearTimeout(_nuvemTimerOcioso); _nuvemTimerOcioso = null; }
  if(!nuvemConectado() || typeof window === "undefined") return;
  if(typeof document !== "undefined" && document.hidden) return;
  _nuvemTimerOcioso = setTimeout(() => {
    _nuvemTimerOcioso = null;
    if(typeof document !== "undefined" && document.hidden) return;
    nuvemSincronizarAgora();
  }, NUVEM_RITMO.ocioso);
}

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
   Números de cada aluno, somados no próprio banco (painel_turma e
   atividade_por_semana, no esquema.sql). Só professor e administrador
   recebem linhas — para qualquer outra pessoa o banco devolve nada. */
async function nuvemPainelTurma(){
  const [alunos, semanas] = await Promise.all([
    nuvemChamar("/rest/v1/rpc/painel_turma", { method: "POST", body: "{}" }),
    nuvemChamar("/rest/v1/rpc/atividade_por_semana", { method: "POST", body: JSON.stringify({ p_semanas: 12 }) }),
  ]);
  return { alunos: alunos || [], semanas: semanas || [] };
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

   São dois caminhos, porque são dois lugares onde a senha mora:
   - conta da NUVEM: quem guarda é o servidor, com hash. A sessão em curso já
     prova quem é a pessoa, então o Supabase não pede a senha antiga; pedimos
     a nova duas vezes, que é o erro que de fato acontece (digitar torto).
   - conta LOCAL (as de teste e as de antes da nuvem): a senha está no banco
     deste navegador, em texto claro. Aí a senha atual É a prova de que é a
     pessoa, e é exigida. */
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
    ${naNuvem ? "" : `<div class="field mt-2"><label class="label">Senha atual</label><input class="input" type="password" id="senhaAtual" placeholder="••••••••"></div>`}
    <div class="field"><label class="label">Nova senha</label><input class="input" type="password" id="senhaNova" placeholder="pelo menos ${minimo} caracteres"></div>
    <div class="field"><label class="label">Repita a nova senha</label><input class="input" type="password" id="senhaNova2" placeholder="••••••••" onkeydown="if(event.key==='Enter') trocarMinhaSenha()"></div>
    <button class="btn btn-primary btn-sm" onclick="trocarMinhaSenha()">Salvar nova senha</button>
  </div>`;
}
function trocarMinhaSenha(){
  const u = usuarioAtual(); if(!u) return;
  const naNuvem = nuvemConectado() && nuvemSessao.usuarioId === u.id;
  const minimo = naNuvem ? 6 : 4;
  const nova = document.getElementById("senhaNova").value;
  const nova2 = document.getElementById("senhaNova2").value;
  if(!nova || nova.length < minimo){ toast("A nova senha precisa ter pelo menos " + minimo + " caracteres.", "err"); return; }
  if(nova !== nova2){ toast("As duas senhas novas não são iguais.", "err"); return; }
  if(naNuvem){ nuvemTrocarSenha(nova); return; }
  const atual = document.getElementById("senhaAtual").value;
  if(u.senha !== atual){ toast("A senha atual está incorreta.", "err"); return; }
  if(nova === atual){ toast("A nova senha é igual à atual.", "err"); return; }
  u.senha = nova;
  saveState();
  toast("Senha alterada neste navegador.");
  render();
}
async function nuvemTrocarSenha(nova){
  try{
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
