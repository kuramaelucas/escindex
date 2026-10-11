/* codigo/03a-nuvem-conexao.js — Nuvem (seção 2-C), parte 1: o ritmo da sincronização, nuvemChamar (a conversa com o Supabase), a sessão, entrar/cadastrar/sair, a volta dos links de e-mail e o perfil.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

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
    erro.textoDoServidor = texto;
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
/* O e-mail do cadastro sai na APROVAÇÃO, não no pedido: antes de a
   coordenação decidir, a pessoa não tem nada a fazer com um e-mail, e o link
   de confirmação chegava para quem ainda não podia entrar. Com "Confirm
   email" desligado no Supabase, o cadastro não manda nada; quando a
   coordenação aprova, este link de acesso (o modelo "Magic Link" do
   Supabase) funciona ao mesmo tempo como aviso de aprovação e como
   confirmação do e-mail — tocar nele prova que o endereço é da pessoa e já
   a traz para dentro. `create_user:false` impede de criar conta por aqui. */
async function nuvemAvisarAprovacao(email){
  await nuvemChamar(nuvemComRetorno("/auth/v1/otp"), { method: "POST", semToken: true,
    body: JSON.stringify({ email, create_user: false }) });
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
  // Com a confirmação de e-mail desligada (o recomendado: o e-mail só sai
  // quando a coordenação aprova — ver nuvemAvisarAprovacao), o cadastro já
  // devolve a sessão. Se o painel ainda a tiver ligada, o e-mail de
  // confirmação sai agora e a pessoa precisa tocar nele — os dois casos
  // continuam tratados.
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
  delete u.senha; delete u.senhaHash; delete u.senhaSal;   // a senha vive no servidor, com hash — nunca aqui
  if(p.nivel_admin) u.nivelAdmin = p.nivel_admin; else delete u.nivelAdmin;
  if(p.ano_faculdade) u.anoFaculdade = p.ano_faculdade;
  if(p.bloco_atual_id) u.blocoAtualId = p.bloco_atual_id;
  if(p.grupo_id) u.grupoId = p.grupo_id;
  // nunca se limpa por aqui: o perfil que desce pode ser anterior ao que acabei de escolher, e
  // quem saiu do grupo já perde o lugar pelo status em grupo_membros (getGrupoQuestoesDoUsuario confere)
  if(p.grupo_questoes_id && !u.grupoQuestoesId) u.grupoQuestoesId = p.grupo_questoes_id;
  if(p.meta_questoes_dia) u.metaQuestoesDia = p.meta_questoes_dia;
  if(p.meta_cartoes_dia) u.metaCartoesDia = p.meta_cartoes_dia;
  if(p.boas_vindas_em) u.boasVindasEm = p.boas_vindas_em;
  // a coluna pode nem existir neste banco (esquema.sql ainda não rodado de novo): só quem a traz decide
  if("prova_alvo_data" in p){ if(p.prova_alvo_data) u.provaAlvoData = p.prova_alvo_data; else delete u.provaAlvoData; }
  // {} (reordenei de volta ao padrão) vale: é assim que "voltar à ordem da turma" chega ao outro aparelho
  if(p.ordem_estagios && typeof p.ordem_estagios === "object") u.ordemEstagios = p.ordem_estagios;
  // avisos já lidos: a união dos dois lados, porque ler num aparelho nunca desfaz a leitura no outro
  if(Array.isArray(p.avisos_lidos)) u.avisosLidos = [...new Set([...(u.avisosLidos || []), ...p.avisos_lidos])];
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
    grupo_questoes_id: usuario.grupoQuestoesId || null,
    meta_questoes_dia: usuario.metaQuestoesDia || null,
    meta_cartoes_dia: usuario.metaCartoesDia || null,
    lembrete_meta_ativo: !!usuario.lembreteMetaAtivo,
    lembrete_meta_horario: usuario.lembreteMetaHorario || null,
    boas_vindas_em: usuario.boasVindasEm || null,
    prova_alvo_data: usuario.provaAlvoData || null,
    ordem_estagios: usuario.ordemEstagios || {},
    avisos_lidos: usuario.avisosLidos || [],
  };
  const assinatura = JSON.stringify(linha);
  if(db.nuvem.perfilEnviado === assinatura) return;
  nuvemEnfileirar("perfis", linha);
  db.nuvem.perfilEnviado = assinatura;
}
