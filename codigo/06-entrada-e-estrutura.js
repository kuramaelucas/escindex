/* Esc — codigo/06-entrada-e-estrutura.js  (parte 6 de 13)
   Autenticação local, roteador e a estrutura visual (menu lateral e topo).
   Os arquivos de codigo/ são carregados em ordem pelo index.html (lista
   ESC_ARQUIVOS.codigo) e dividem o mesmo espaço: uma função escrita num
   arquivo é usada nos outros sem import. */

/* ==========================================================================
   5. AUTENTICAÇÃO (versão de demonstração local)
   ==========================================================================
   Login/senha e aprovação de cadastro funcionam de verdade dentro deste
   navegador. Numa versão publicada num site de verdade, a autenticação
   real (com senha criptografada, recuperação de senha etc.) deve ficar por
   conta de um back-end — ver observações no resumo enviado no chat. */
function fazerLogin(identificador, senha){
  const id = (identificador||"").trim().toLowerCase();
  const usuario = db.usuarios.find(u => (u.email.toLowerCase()===id || u.matricula.toLowerCase()===id) && u.senha===senha);
  if(!usuario){ toast("Login ou senha incorretos.", "err"); return; }
  if(contaDemoDaEquipeBloqueada(usuario)){
    toast("As contas de demonstração da equipe ficam desligadas quando a plataforma está na nuvem — a senha delas é pública. Entre com a sua conta da nuvem.", "err");
    return;
  }
  if(usuario.status==="pendente"){ toast("Seu cadastro ainda está aguardando aprovação de um administrador.", "err"); return; }
  if(usuario.status==="rejeitado"){ toast("Seu cadastro foi recusado. Fale com a coordenação.", "err"); return; }
  if(usuario.status==="inativo"){ toast("Sua conta está inativa. Fale com a coordenação.", "err"); return; }
  state.usuarioAtualId = usuario.id;
  // Com a nuvem ligada, esta é uma conta só deste navegador — e é preciso
  // dizer isso na hora. Sem o aviso, a pessoa estuda o dia inteiro achando
  // que está sincronizando e só descobre depois que nada subiu.
  toast(nuvemLigada()
    ? ("Você entrou em \"" + usuario.nome + "\", uma conta só deste navegador: nada daqui sobe para a nuvem. Para sincronizar, saia e entre com o e-mail e a senha da sua conta da nuvem.")
    : ("Bem-vindo(a), " + usuario.nome.split(" ")[0] + "!"));
  navigate("inicio");
}
/* Uma conta de demonstração de professor, residente ou administrador, com a
   nuvem ligada? Fica de fora (ver CONFIG.contasDemoDaEquipeComNuvem). É
   demonstração quem veio do arquivo dados/demonstracao.js — a conta local
   que alguém criou neste navegador não é tocada. */
function contaDemoDaEquipeBloqueada(usuario){
  if(!usuario || usuario.papel === "aluno") return false;
  if(!nuvemLigada() || CONFIG.contasDemoDaEquipeComNuvem) return false;
  return SEED_USUARIOS.some(x => x.id === usuario.id) || /@esc\.demo$/i.test(usuario.email || "");
}
/* Acesso rápido sem senha. Hoje a tela só oferece o de ALUNO — os outros
   papéis mexem em conteúdo e em cadastros de gente de verdade, e não podem
   ficar abertos a quem abrir o endereço. O mapa continua com os quatro
   porque as contas existem (entram por e-mail e senha); o que saiu foi o
   botão. */
function fazerLoginDemo(papel){
  const mapa = {admin:"u-admin", professor:"u-prof", residente:"u-res", aluno:"u-aluno1"};
  if(papel !== "aluno"){ toast("Este papel entra por e-mail e senha — o acesso rápido é só o de aluno.", "err"); return; }
  const alvo = getUsuario(mapa[papel]);
  if(!alvo){ toast("A conta de teste de aluno não está mais neste banco.", "err"); return; }
  state.usuarioAtualId = alvo.id;
  navigate("inicio");
  // com a nuvem ligada, é fácil entrar por aqui sem perceber e depois
  // estranhar que nada sincroniza — estes acessos são só deste navegador
  if(nuvemLigada()) toast("Acesso de demonstração: o que você fizer aqui fica só neste navegador e não sobe para a nuvem.");
}
/* Sair limpa também o estado temporário das telas (filtros, páginas, texto
   colado ainda não importado). Sem isso, o rascunho de uma prova que uma
   pessoa colou e não publicou continuaria na tela do próximo que entrasse
   neste mesmo navegador. Vale para os dois caminhos de saída — o local e o
   da nuvem —, por isso virou função à parte. */
function limparEstadoDasTelas(){
  state.filtroRota = {}; state.sessaoAtual = null; state.sessaoFlash = null; state.modoAluno = false;
}
function fazerLogout(){
  // com a nuvem ligada, sair é sair da conta (e a fila pendente é avisada)
  if(nuvemConectado()){ nuvemSairDaConta(); return; }
  limparEstadoDasTelas();
  state.usuarioAtualId = null;
  navigate("landing");
}
function alternarModoAluno(){
  state.modoAluno = !state.modoAluno;
  toast(state.modoAluno ? "Modo aluno ativado — suas respostas aqui contam pro seu próprio progresso." : "Voltando ao seu papel normal.");
  navigate("inicio");
}

function atualizarCamposTipoAcesso(){
  const tipo = document.getElementById("cadTipoAcesso").value;
  document.getElementById("camposAluno").style.display = tipo==="aluno" ? "block" : "none";
  document.getElementById("camposEquipe").style.display = tipo==="aluno" ? "none" : "block";
}
function solicitarCadastro(){
  const nome = document.getElementById("cadNome").value.trim();
  const email = document.getElementById("cadEmail").value.trim();
  const matricula = document.getElementById("cadMatricula").value.trim();
  const senha = document.getElementById("cadSenha").value;
  const tipoAcesso = document.getElementById("cadTipoAcesso").value;
  if(!nome || !email || !matricula || !senha){ toast("Preencha todos os campos.", "err"); return; }
  if(senha.length<4){ toast("Use uma senha com pelo menos 4 caracteres.", "err"); return; }
  // Com a nuvem ligada, a conta nasce no servidor (senha com hash, e-mail
  // único garantido lá) e fica pendente até a coordenação aprovar.
  if(nuvemLigada()){
    if(senha.length < 6){ toast("Com conta na nuvem, a senha precisa ter pelo menos 6 caracteres.", "err"); return; }
    const anoCampo = document.getElementById("cadAno");
    nuvemCadastrarPelaTela({
      email, senha, nome, matricula,
      anoFaculdade: (tipoAcesso === "aluno" && anoCampo) ? anoCampo.value : "",
    });
    return;
  }
  if(db.usuarios.some(u=>u.email.toLowerCase()===email.toLowerCase())){ toast("Já existe um cadastro com este e-mail.", "err"); return; }
  if(db.usuarios.some(u=>u.matricula===matricula)){ toast("Já existe um cadastro com esta matrícula.", "err"); return; }
  const novoUsuarioId = uid("u");
  const novo = {id:novoUsuarioId, nome, email, matricula, senha, papel:tipoAcesso, status:"pendente", criadoEm:hojeISO()};
  if(tipoAcesso==="aluno"){
    // O cadastro pergunta só o ano. A turma é escolhida depois, em Meu Grupo
    // (ver "UMA TURMA POR PESSOA"): quem acabou de chegar não tem como saber
    // qual grupo é o dele antes de ver a lista, e cada tentativa no cadastro
    // criava uma turma solta que ninguém mais usava.
    novo.anoFaculdade = document.getElementById("cadAno").value;
    novo.grupoId = db.grupoOficialId;
  } else {
    const areasAtuacao = [...document.querySelectorAll(".cadAreaAtuacao:checked")].map(el=>el.value);
    if(!areasAtuacao.length){ toast("Selecione pelo menos uma grande área de atuação.", "err"); return; }
    novo.areasAtuacao = areasAtuacao;
    novo.assuntosAjuda = [...document.querySelectorAll(".cadAssuntoAjuda:checked")].map(el=>el.value);
  }
  db.usuarios.push(novo);
  if(!saveState()){
    // não gravou: desfaz na memória para a tela não mostrar um cadastro que
    // não existe, e deixa a pessoa na mesma tela com o que digitou
    db.usuarios = db.usuarios.filter(x => x.id !== novoUsuarioId);
    return;
  }
  toast("Cadastro enviado! Assim que um administrador aprovar, você poderá entrar.");
  navigate("login");
}
function aprovarUsuario(id){ getUsuario(id).status="aprovado"; saveState(); toast("Cadastro aprovado — a pessoa sai desta lista e passa a aparecer em Usuários."); render(); }
function rejeitarUsuario(id){ getUsuario(id).status="rejeitado"; saveState(); toast("Cadastro recusado."); render(); }
function desativarUsuario(id){ getUsuario(id).status="inativo"; saveState(); toast("Conta inativada: a pessoa deixa de conseguir entrar, mas o estudo dela fica guardado."); render(); }
function reativarUsuario(id){ getUsuario(id).status="aprovado"; saveState(); toast("Usuário reativado."); render(); }
function alterarPapelUsuario(id, papel){
  if(!podeAdmin("usuarios")){ toast("Só um administrador máster pode alterar papéis.", "err"); return; }
  const alvo = getUsuario(id);
  alvo.papel = papel;
  if(papel==="admin" && !alvo.nivelAdmin) alvo.nivelAdmin = "moderador";
  saveState(); toast("Papel atualizado."); render();
}

/* ==========================================================================
   6. ROTEADOR
   ========================================================================== */
const ROUTE_TITLES = { inicio:"Início", estudar:"Estudar", sessao:"Sessão de estudo", revisao:"Revisão", flashcards:"Revisão Rápida", historico:"Histórico de Atividade",
  simulados:"Provas e Simulados", "simulado-ativo":"Simulado", "provas-antigas":"Provas e Simulados",
  favoritos:"Favoritos", "livro-ouro":"Livro de Ouro", desempenho:"Meu Desempenho", metas:"Estudar", perfil:"Perfil", "meu-grupo":"Meu Grupo",
  "criar-simulado":"Criar Simulado", "material-pdf":"Material em PDF", "revisao-dificeis":"Questões Difíceis", "fila-duvidas":"Fila de Dúvidas", "revisao-formatacao":"Revisar Formatação", "aprovar-cadastros":"Aprovar Cadastros",
  usuarios:"Usuários", taxonomia:"Especialidades e Assuntos", "banco-questoes":"Banco de Questões", "importar-questoes":"Enviar / Importar Questões",
  "central-provas":"Central de Provas",
  blocos:"Blocos de Estudo", "config-geral":"Configurações", "feedback-usuarios":"Feedback dos Usuários" };
function tituloDaRota(r){ return ROUTE_TITLES[r] || CONFIG.nomePlataforma; }

function navigate(route, params){
  state.route = route; state.routeParams = params || {};
  if(location.hash !== "#/"+route) location.hash = "#/"+route;
  render();
  window.scrollTo(0,0);
  fecharMenuMobile();
}
window.addEventListener("hashchange", function(){
  const r = (location.hash||"").replace("#/","") || "landing";
  if(r !== state.route){ state.route = r; render(); }
});

/* Atalhos de teclado: A/D para navegar entre questões. Só funcionam fora de
   campos de texto (pra não atrapalhar quem está digitando um comentário) e
   só quando faz sentido no contexto (simulado em andamento, ou depois de já
   ter respondido uma questão na sessão de prática). */
window.addEventListener("keydown", function(e){
  const alvo = document.activeElement;
  if(alvo && (alvo.tagName==="INPUT" || alvo.tagName==="TEXTAREA" || alvo.isContentEditable)) return;
  const tecla = e.key.toLowerCase();
  if(tecla!=="a" && tecla!=="d") return;
  if(state.route==="simulado-ativo" && state.sessaoAtual && !state.sessaoAtual.finalizado){
    if(tecla==="a") irQuestaoSimulado(-1);
    if(tecla==="d") irQuestaoSimulado(1);
  } else if(state.route==="sessao" && state.sessaoAtual && !state.sessaoAtual.finalizada){
    const s = state.sessaoAtual;
    if(tecla==="a" && s.indiceAtual>0) voltarQuestaoSessao();
    // passar sem responder é permitido: a questão fica em branco e volta depois
    if(tecla==="d" && s.indiceAtual < s.itens.length-1) proximaQuestaoSessao();
  }
});

/* Qual tela está desenhada agora. Serve para o render() saber se precisa
   montar a estrutura inteira ou só trocar o miolo (ver o fim da função). */
let _telaDesenhada = null;

function render(){
  const app = document.getElementById("app");
  const rotasPublicas = ["landing","login","cadastro"];
  if(!usuarioAtual() && !rotasPublicas.includes(state.route)) state.route = "landing";
  if(usuarioAtual() && rotasPublicas.includes(state.route)) state.route = "inicio";

  if(state.route==="landing"){ _telaDesenhada = null; app.innerHTML = renderLanding(); return; }
  if(state.route==="login"){ _telaDesenhada = null; app.innerHTML = renderLogin(); return; }
  if(state.route==="cadastro"){ _telaDesenhada = null; app.innerHTML = renderCadastro(); return; }
  // primeiro acesso: quem acabou de entrar pela primeira vez vê as boas-vindas
  // antes do painel — só no caminho para o início, para nunca prender ninguém
  if(state.route==="boas-vindas" || (state.route==="inicio" && precisaDasBoasVindas(usuarioAtual()))){
    state.route = "boas-vindas"; _telaDesenhada = null; app.innerHTML = renderBoasVindas(); return;
  }

  // um administrador só entra nas rotas permitidas pelo seu nível
  const permissaoNecessaria = PERMISSAO_DA_ROTA[state.route];
  if(permissaoNecessaria && usuarioAtual().papel==="admin" && !podeAdmin(permissaoNecessaria)){
    desenharTela(renderSemPermissao(permissaoNecessaria));
    return;
  }

  let conteudo = "";
  switch(state.route){
    case "inicio": conteudo = renderInicio(); break;
    case "estudar": conteudo = renderEstudar(); break;
    case "historico": conteudo = renderHistorico(); break;
    case "livro-ouro": conteudo = renderLivroOuro(); break;
    // abrir /sessao sem sessão na memória (link salvo, F5, voltar do celular)
    // retoma a fila guardada em vez de mostrar tela vazia
    case "sessao":
      if(!state.sessaoAtual) carregarSessaoEmAndamento();
      conteudo = renderSessao();
      break;
    case "revisao": conteudo = renderRevisao(); break;
    case "flashcards": conteudo = renderFlashcards(); break;
    case "material-pdf": conteudo = renderMaterialPDF(); break;
    case "simulados": conteudo = renderSimulados(); break;
    case "simulado-ativo": conteudo = renderSimuladoAtivo(); break;
    case "provas-antigas": conteudo = renderProvasAntigas(); break;
    case "favoritos": conteudo = renderFavoritos(); break;
    case "desempenho": conteudo = renderDesempenho(); break;
    // a tela de metas virou um cartão dentro de Estudar; a rota antiga
    // continua respondendo para não quebrar link salvo por ninguém
    case "metas": state.route = "estudar"; conteudo = renderEstudar(); break;
    case "meu-grupo": conteudo = renderMeuGrupo(); break;
    case "perfil": conteudo = renderPerfil(); break;
    case "criar-simulado": conteudo = renderCriarSimulado(); break;
    case "revisao-dificeis": conteudo = renderRevisaoDificeis(); break;
    case "fila-duvidas": conteudo = renderFilaDuvidas(); break;
    case "revisao-formatacao": conteudo = renderRevisaoFormatacao(); break;
    case "aprovar-cadastros": conteudo = renderAprovarCadastros(); break;
    case "usuarios": conteudo = renderUsuarios(); break;
    case "taxonomia": conteudo = renderTaxonomia(); break;
    case "banco-questoes": conteudo = renderBancoQuestoes(); break;
    case "importar-questoes": conteudo = renderImportarQuestoes(); break;
    case "central-provas": conteudo = renderCentralProvas(); break;
    case "blocos": conteudo = renderBlocosConfig(); break;
    case "config-geral": conteudo = renderConfigGeral(); break;
    case "feedback-usuarios": conteudo = renderFeedbackUsuarios(); break;
    default: conteudo = renderInicio();
  }
  desenharTela(conteudo);
}

/* ---------- por que isto não é um `app.innerHTML = ...` e pronto ----------
   Recriar a página inteira a cada clique fazia a tela PISCAR dentro de um
   conjunto de questões: marcar uma alternativa, riscar outra ou responder
   jogava fora todo o HTML e montava outro do zero, com a animação de entrada
   tocando de novo a cada vez — como se a pessoa tivesse trocado de tela.

   Agora a estrutura (menu e topo) só é montada quando não existe ainda. Na
   mesma tela, o que muda é o miolo, e o menu e o topo são reescritos no
   lugar (são pequenos e precisam acompanhar: o selo de cadastros pendentes,
   o estado da nuvem, o nome do tema). A animação de entrada só toca quando
   a tela realmente troca — que é o que ela existe para sinalizar. */
function desenharTela(conteudoHtml){
  const app = document.getElementById("app");
  const pagina = document.getElementById("conteudoPagina");
  const menu = document.getElementById("sidebarMenu");
  const topo = document.getElementById("topoBarra");
  const u = usuarioAtual();
  const chave = (u ? u.id : "") + "|" + (state.modoAluno ? "aluno" : "papel");
  if(pagina && menu && topo && _telaDesenhada && _telaDesenhada.chave === chave){
    const trocouDeTela = _telaDesenhada.rota !== state.route;
    menu.innerHTML = htmlMenuLateral(u);
    topo.innerHTML = htmlTopo(u);
    pagina.innerHTML = conteudoHtml;
    if(trocouDeTela) animarEntradaDaPagina(pagina);
  }else{
    app.innerHTML = renderShell(conteudoHtml);
  }
  _telaDesenhada = { rota: state.route, chave };
  ativarGestoDeArrastar();
}
/* Reinicia a animação de entrada: sem tirar e repor a classe (com um toque no
   layout no meio), o navegador entende que nada mudou e não toca nada. */
function animarEntradaDaPagina(el){
  el.classList.remove("entrando");
  void el.offsetWidth;
  el.classList.add("entrando");
}

/* --------------------------------------------------------------------------
   GESTO DE ARRASTAR PARA O LADO (celular)
   --------------------------------------------------------------------------
   No celular, tocar num botão "Próxima" pequeno no fim de uma questão longa
   é trabalhoso: o polegar já está no meio da tela. Aqui a própria questão
   (ou o flashcard) responde ao arrasto lateral, como as fotos do telefone.

   Regras que o gesto respeita, para não virar armadilha:
   - o movimento precisa ser claramente horizontal (o dobro do vertical),
     senão é rolagem de página e a gente não interfere;
   - só vale a partir de 70px de deslocamento, para não trocar de questão
     quando o dedo escorrega ao tocar numa alternativa;
   - as mesmas travas dos botões valem aqui: não dá para passar do fim do
     baralho, nem passar de um flashcard antes de virá-lo (na prática, pular
     uma questão sem responder é permitido — ela fica em branco);
   - o cartão acompanha o dedo e volta sozinho se o arrasto não for suficiente,
     para que fique claro que houve ou não houve troca. */
function ativarGestoDeArrastar(){
  const area = document.getElementById("areaGestoQuestao");
  if(!area) return;
  let x0 = 0, y0 = 0, dx = 0, arrastando = false, decidido = false;

  area.addEventListener("touchstart", function(e){
    if(e.touches.length !== 1) return;
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    dx = 0; arrastando = true; decidido = false;
    area.classList.remove("soltando");
  }, {passive:true});

  area.addEventListener("touchmove", function(e){
    if(!arrastando || e.touches.length !== 1) return;
    const cx = e.touches[0].clientX - x0;
    const cy = e.touches[0].clientY - y0;
    if(!decidido){
      // ainda não sabemos se é rolagem vertical ou arrasto lateral
      if(Math.abs(cx) < 12 && Math.abs(cy) < 12) return;
      decidido = true;
      if(Math.abs(cx) < Math.abs(cy)*2){ arrastando = false; return; } // é rolagem: solta o gesto
      area.classList.add("arrastando");
    }
    dx = cx;
    // resistência nas bordas: o cartão anda menos que o dedo, sinalizando limite
    area.style.transform = "translateX("+(dx*0.55)+"px)";
  }, {passive:true});

  const soltar = function(){
    if(!arrastando){ area.style.transform = ""; return; }
    arrastando = false;
    area.classList.remove("arrastando");
    area.classList.add("soltando");
    area.style.transform = "";
    // o flashcard vira ao ser tocado; se houve arrasto, o toque não conta,
    // senão o cartão viraria junto com a troca e o aluno veria a resposta
    // do cartão seguinte sem ter tentado lembrar
    if(Math.abs(dx) > 12){
      const bloquear = function(ev){ ev.stopPropagation(); ev.preventDefault(); };
      area.addEventListener("click", bloquear, true);
      setTimeout(()=>area.removeEventListener("click", bloquear, true), 350);
    }
    if(Math.abs(dx) < 70) return;             // movimento curto: nada acontece
    if(dx < 0) avancarPorGesto(); else voltarPorGesto();
  };
  area.addEventListener("touchend", soltar, {passive:true});
  area.addEventListener("touchcancel", soltar, {passive:true});
}
/* Arrastar para a ESQUERDA = avançar (o conteúdo novo vem da direita). */
function avancarPorGesto(){
  if(state.route==="flashcards" && state.sessaoFlash && !state.sessaoFlash.finalizada){
    const s = state.sessaoFlash;
    if(!s.virado){ toast("Vire o cartão e diga se lembrava antes de passar."); return; }
    pularFlashcard(1); return;
  }
  const s = state.sessaoAtual; if(!s) return;
  if(state.route==="simulado-ativo" && !s.finalizado){ irQuestaoSimulado(1); return; }
  if(state.route==="sessao" && !s.finalizada){
    // sem trava: arrastar para o lado numa questão não respondida a deixa em
    // branco, igual ao botão "Deixar para depois"
    if(s.indiceAtual < s.itens.length-1) proximaQuestaoSessao();
  }
}
/* Arrastar para a DIREITA = voltar. */
function voltarPorGesto(){
  if(state.route==="flashcards" && state.sessaoFlash && !state.sessaoFlash.finalizada){ pularFlashcard(-1); return; }
  const s = state.sessaoAtual; if(!s) return;
  if(state.route==="simulado-ativo" && !s.finalizado){ irQuestaoSimulado(-1); return; }
  if(state.route==="sessao" && !s.finalizada && s.indiceAtual>0) voltarQuestaoSessao();
}

/* ==========================================================================
   7. ESTRUTURA VISUAL (menu lateral + topo) PARA QUEM ESTÁ LOGADO
   ========================================================================== */
/* A ordem dos itens abaixo NÃO é alfabética nem temática: é a ordem de
   probabilidade de uso. Os quatro primeiros do aluno (Início, Estudar, Meu
   Desempenho e Meu Grupo) são os que ele abre quase todo dia, e no celular
   são os únicos que aparecem sem rolar o menu. O que se usa uma vez por
   semana (simulados, histórico, favoritos) desce; o que se usa uma vez por
   semestre (enviar questões) fica no fim.

   O Livro de Ouro saiu do menu de propósito: ele é uma página de leitura,
   não uma ferramenta de estudo. Agora fica no rodapé da tela inicial, que é
   onde ele é de fato lido, e em Configurações, para quem o mantém. */
function navItemsParaPapel(papel){
  const aluno = [
    {id:"inicio", label:"Início", icon:"home"},
    {id:"estudar", label:"Estudar", icon:"book"},
    {id:"desempenho", label:"Meu Desempenho", icon:"chart"},
    {id:"meu-grupo", label:"Meu Grupo", icon:"users"},
    {id:"revisao", label:"Revisão", icon:"refresh"},
    {id:"flashcards", label:"Revisão Rápida", icon:"cards"},
    {id:"simulados", label:"Provas e Simulados", icon:"clipboard"},
    {id:"historico", label:"Histórico de Atividade", icon:"clock"},
    {id:"favoritos", label:"Favoritos", icon:"star"},
    {id:"importar-questoes", label:"Enviar Questões", icon:"upload"},
  ];
  if(state.modoAluno && papel!=="aluno") return aluno;
  if(papel==="residente") return [
    {id:"inicio", label:"Início", icon:"home"},
    {id:"fila-duvidas", label:"Fila de Dúvidas", icon:"message"},
    {id:"revisao-dificeis", label:"Questões Difíceis", icon:"alert"},
    {id:"importar-questoes", label:"Enviar Provas e Questões", icon:"upload"},
    {id:"central-provas", label:"Central de Provas", icon:"archive"},
    {id:"revisao-formatacao", label:"Revisar Formatação", icon:"edit"},
    {id:"simulados", label:"Provas e Simulados", icon:"clipboard"},
  ];
  const conteudo = [
    {id:"inicio", label:"Início", icon:"home"},
    {id:"banco-questoes", label:"Banco de Questões", icon:"database"},
    {id:"importar-questoes", label:"Importar Questões", icon:"upload"},
    {id:"central-provas", label:"Central de Provas", icon:"archive"},
    {id:"revisao-dificeis", label:"Questões Difíceis", icon:"alert"},
    {id:"criar-simulado", label:"Criar Simulado", icon:"plus"},
    {id:"material-pdf", label:"Material em PDF", icon:"printer"},
    {id:"flashcards", label:"Flashcards", icon:"cards"},
    {id:"simulados", label:"Provas e Simulados", icon:"clipboard"},
    {id:"revisao-formatacao", label:"Revisar Formatação", icon:"edit"},
    {id:"taxonomia", label:"Especialidades e Assuntos", icon:"filter"},
  ];
  if(papel==="professor") return conteudo;
  if(papel==="admin"){
    const u = usuarioAtual();
    const itens = [...conteudo,
      {id:"aprovar-cadastros", label:"Aprovar Cadastros", icon:"check", permissao:"cadastros"},
      {id:"usuarios", label:"Usuários", icon:"users", permissao:"usuarios"},
      {id:"blocos", label:"Blocos de Estudo", icon:"calendar", permissao:"blocos"},
      {id:"feedback-usuarios", label:"Feedback dos Usuários", icon:"message", permissao:"cadastros"},
      {id:"config-geral", label:"Configurações", icon:"settings", permissao:"config"},
    ];
    return itens.filter(item=>!item.permissao || podeAdmin(item.permissao, u));
  }
  return aluno;
}
function rotuloPapel(papel){
  if(papel==="admin"){ const u = usuarioAtual(); return u ? rotuloNivelAdmin(nivelAdminDe(u)) : "Administração"; }
  return {professor:"Área do Professor", residente:"Área do Residente", aluno:"Menu do Aluno"}[papel] || "";
}
function badgePapel(papel, usuario){
  const cores = {admin:"badge-amber", professor:"badge-accent", residente:"badge-accent", aluno:"badge-muted"};
  const nomes = {admin:"Administrador", professor:"Professor", residente:"Residente", aluno:"Aluno"};
  let nome = nomes[papel] || papel;
  if(papel==="admin" && usuario) nome = rotuloNivelAdmin(nivelAdminDe(usuario));
  return '<span class="badge '+(cores[papel]||"badge-muted")+'">'+escapeHtml(nome)+'</span>';
}

function renderSemPermissao(permissao){
  const u = usuarioAtual();
  return `<div class="empty-state">
    <h3>Acesso restrito</h3>
    <p class="mt-2">Seu nível de acesso (${escapeHtml(rotuloNivelAdmin(nivelAdminDe(u)))}) não inclui esta área${permissao?" (permissão: "+escapeHtml(permissao)+")":""}.</p>
    <p class="text-sm mt-1">Peça a um administrador máster que altere seu nível em Usuários, se precisar desse acesso.</p>
    <button class="btn btn-primary mt-3" onclick="navigate('inicio')">Voltar ao início</button>
  </div>`;
}
/* O menu lateral e o topo são montados à parte do conteúdo de propósito:
   assim o render() consegue trocar SÓ o miolo da página quando a tela é a
   mesma (ver render()), sem recriar a estrutura inteira a cada clique. */
function htmlMenuLateral(u){
  const nav = navItemsParaPapel(u.papel);
  const pendCadastros = u.papel==="admin" ? db.usuarios.filter(x=>x.status==="pendente").length : 0;
  return `
      <div class="sidebar-brand"><span class="mark">E</span>${CONFIG.nomePlataforma}</div>
      ${(u.papel==="aluno"||state.modoAluno) ? `<div class="bloco-chip"><div class="bloco-chip-label">BLOCO ATUAL</div><div class="bloco-chip-name">${escapeHtml((getBlocoAtual()||{}).nome||"—")}</div></div>` : ""}
      <div class="nav-section-label">${rotuloPapel(u.papel)}</div>
      <ul class="nav-list">
        ${nav.map(item=>{
          let badge = "";
          if(item.id==="aprovar-cadastros" && pendCadastros>0) badge = ' <span class="badge badge-amber">'+pendCadastros+'</span>';
          return `<li class="nav-item ${state.route===item.id?"active":""}" onclick="navigate('${item.id}')">${iconeSvg(item.icon)}<span>${item.label}</span>${badge}</li>`;
        }).join("")}
      </ul>
      <div class="sidebar-footer">
        ${u.papel!=="aluno" ? `<div class="nav-item" onclick="alternarModoAluno()">${iconeSvg("book")}<span>${state.modoAluno?"Sair do modo aluno":"Entrar no modo aluno"}</span></div>` : ""}
        <div class="nav-item" onclick="alternarTema()">${iconeSvg("theme")}<span>${document.documentElement.getAttribute("data-theme")==="dark"?"Tema claro":"Tema escuro"}</span></div>
        <div class="nav-item" onclick="navigate('perfil')">${iconeSvg("user")}<span>Perfil</span></div>
        <div class="nav-item" onclick="fazerLogout()">${iconeSvg("logout")}<span>Sair</span></div>
      </div>`;
}
function htmlTopo(u){
  return `
        <div class="flex items-center gap-2">
          <button class="icon-btn hamburger" onclick="abrirMenuMobile()">${iconeSvg("menu")}</button>
          <div class="topbar-title">${tituloDaRota(state.route)}</div>
        </div>
        <div class="flex items-center gap-2">
          ${renderChipNuvem()}
          ${badgePapel(u.papel, u)}
          <span class="text-sm muted nowrap">${escapeHtml(u.nome)}</span>
        </div>`;
}
function renderShell(conteudoHtml){
  const u = usuarioAtual();
  return `
  <div class="backdrop" id="backdropMenu" onclick="fecharMenuMobile()"></div>
  <div class="shell">
    <aside class="sidebar" id="sidebarMenu">${htmlMenuLateral(u)}</aside>
    <div class="main">
      <div class="topbar" id="topoBarra">${htmlTopo(u)}</div>
      <div class="page entrando" id="conteudoPagina">${conteudoHtml}</div>
    </div>
  </div>`;
}
function abrirMenuMobile(){ document.getElementById("sidebarMenu").classList.add("open"); document.getElementById("backdropMenu").classList.add("open"); }
function fecharMenuMobile(){ const s=document.getElementById("sidebarMenu"), b=document.getElementById("backdropMenu"); if(s)s.classList.remove("open"); if(b)b.classList.remove("open"); }
