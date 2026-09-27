/* Esc — codigo/13-tutorial.js  (parte 13 de 14)
   O tutorial de uso: um tour rápido que abre ao entrar e um guia completo,
   os dois também em Perfil > Ajuda e tutorial.
   Os arquivos de codigo/ são carregados em ordem pelo index.html (lista
   ESC_ARQUIVOS.codigo) e dividem o mesmo espaço: uma função escrita num
   arquivo é usada nos outros sem import. */

/* ==========================================================================
   26-C. TUTORIAL DE USO
   ==========================================================================
   Dois níveis, pensados para quem nunca abriu a plataforma e para quem já usa
   mas quer achar uma função:

   - TUTORIAL RÁPIDO: meia dúzia de passos, um por tela, com o essencial do
     papel da pessoa (aluno, residente, professor, administrador). Abre
     sozinho quando ela entra e chega ao Início — uma vez por sessão do
     navegador —, até ela marcar "não mostrar de novo". Dá para rever a
     qualquer hora pelo menu (Tutorial) ou em Perfil > Ajuda e tutorial.

   - GUIA COMPLETO: todas as funções, organizadas por tela, em seções que
     abrem e fecham. Abre pelo último passo do tour ou pelo Perfil.

   A escolha de não ver o tour ao entrar fica no cadastro da pessoa
   (`tutorialOcultoAoEntrar`), e o Perfil desfaz. Navegador controlado por
   automação (os testes) não recebe o tour automático, para não cobrir as
   telas que os testes clicam; o teste do próprio tutorial o abre direto. */

/* O papel que decide o conteúdo: quem está em "modo aluno" vê o tour de aluno. */
function papelDoTutorial(u){
  u = u || usuarioAtual();
  if(!u) return "aluno";
  if(state.modoAluno) return "aluno";
  return ["aluno", "residente", "professor", "admin"].includes(u.papel) ? u.papel : "aluno";
}

/* ---------- o tour rápido, passo a passo, por papel ---------- */
const PASSOS_COMUNS_FIM = [
  { icone:"settings", titulo:"Ajuda sempre à mão",
    texto:"Este tour e um guia completo, função por função, ficam em <strong>Perfil › Ajuda e tutorial</strong> e no item <strong>Tutorial</strong> do menu. Lá você também escolhe se quer ver este tour quando entrar." },
];
const TUTORIAL_RAPIDO = {
  aluno: [
    { icone:"home", titulo:"Bem-vindo(a) ao Esc",
      texto:"Um tour de um minuto pelo essencial. O Esc organiza o seu estudo pelo calendário da sua turma e decide, a cada dia, o que vale a pena você fazer." },
    { icone:"play", titulo:"Comece pelo Início",
      texto:"A <strong>sessão recomendada</strong> do dia mistura o seu bloco atual, revisão dos blocos que já passaram e uma prévia do próximo, no tamanho da sua meta. Quer escolher o assunto? Use <strong>Estudar › Monte sua própria lista</strong>." },
    { icone:"target", titulo:"Responda dizendo quanto sabe",
      texto:"Escolha a alternativa e marque <strong>Certeza</strong>, <strong>Na dúvida</strong> ou <strong>Chute</strong>: é isso que decide quando a questão volta para você. O <strong>×</strong> ao lado de cada alternativa risca o que você já descartou." },
    { icone:"refresh", titulo:"Revise na hora certa",
      texto:"<strong>Revisão</strong> traz de volta as questões no momento de não esquecer — os erros e os chutes primeiro. <strong>Revisão Rápida</strong> são os flashcards: os da equipe e os que você cria a partir de uma questão." },
    { icone:"clipboard", titulo:"Treine como na prova",
      texto:"Em <strong>Provas e Simulados</strong> estão as provas antigas de verdade, inteiras, para fazer no cronômetro ou sem pressa, e os simulados montados pela equipe." },
    { icone:"chart", titulo:"Acompanhe a sua evolução",
      texto:"<strong>Meu Desempenho</strong> mostra o acerto por área e assunto, o que mais cai na prova e a sua nota estimada. Em cada questão você pode favoritar com uma anotação, virar flashcard, sinalizar um erro ou pedir para não vê-la mais." },
    ...PASSOS_COMUNS_FIM,
  ],
  residente: [
    { icone:"home", titulo:"Bem-vindo(a), residente",
      texto:"Um tour de um minuto pelo que é seu no Esc: responder às dúvidas da turma e cuidar da qualidade das questões." },
    { icone:"message", titulo:"Fila de Dúvidas",
      texto:"As dúvidas que os alunos deixam nas questões chegam aqui. Responda com as suas palavras e uma fonte — a resposta aparece para quem perguntou e para quem cair na mesma questão." },
    { icone:"alert", titulo:"Questões Difíceis",
      texto:"As questões que a turma mais erra. Vale conferir se o gabarito e a explicação estão certos e claros — às vezes o problema é a questão, e não o aluno." },
    { icone:"upload", titulo:"Enviar provas e questões",
      texto:"Em <strong>Enviar Provas e Questões</strong> e na <strong>Central de Provas</strong> você cola uma prova inteira (em lotes) e acompanha a transcrição até a publicação." },
    { icone:"edit", titulo:"Revisar Formatação",
      texto:"Questões importadas às vezes chegam com texto quebrado. Aqui você corrige a formatação antes de elas irem para os alunos." },
    ...PASSOS_COMUNS_FIM,
  ],
  professor: [
    { icone:"home", titulo:"Bem-vindo(a), professor(a)",
      texto:"Um tour de um minuto pelas ferramentas da equipe: o banco de questões, as provas, os simulados e o acompanhamento da turma." },
    { icone:"database", titulo:"Banco de Questões",
      texto:"Todas as questões, com filtros por instituição, ano, área e status. Em <strong>Status › Aguardando imagem</strong> ficam as que dependem de uma figura da prova ainda não anexada — elas não aparecem para os alunos até a imagem chegar." },
    { icone:"archive", titulo:"Importar e Central de Provas",
      texto:"Traga questões em lote ou uma prova inteira. A Central acompanha cada prova até a publicação, e a conferência aponta gabarito faltando, questão repetida e assunto inexistente." },
    { icone:"plus", titulo:"Simulados e material",
      texto:"<strong>Criar Simulado</strong> monta uma prova para a turma; <strong>Material em PDF</strong> gera listas para imprimir; <strong>Flashcards</strong> cuida do baralho da equipe." },
    { icone:"chart", titulo:"Painel da Turma",
      texto:"Como a turma está indo: acerto por área, quem está parado e os assuntos mais errados. <strong>Questões Difíceis</strong> mostra onde a turma trava." },
    { icone:"user", titulo:"Veja pelo olhar do aluno",
      texto:"O <strong>modo aluno</strong> mostra a plataforma como o aluno a vê — e as respostas dadas nele contam para o seu próprio progresso." },
    ...PASSOS_COMUNS_FIM,
  ],
  admin: [
    { icone:"home", titulo:"Bem-vindo(a), administrador(a)",
      texto:"Um tour de um minuto pelo que só a administração faz, além das ferramentas de conteúdo da equipe. O que aparece no seu menu depende do seu nível de acesso." },
    { icone:"check", titulo:"Cadastros e usuários",
      texto:"<strong>Aprovar Cadastros</strong> libera quem pediu acesso; <strong>Usuários</strong> muda papel, nível de administrador e situação de cada conta." },
    { icone:"calendar", titulo:"Blocos de Estudo",
      texto:"O calendário de cada ano da faculdade e das turmas do rodízio. É ele que decide o bloco atual e, portanto, a sessão do dia dos alunos." },
    { icone:"database", titulo:"Conteúdo",
      texto:"Banco de Questões, Importar, Central de Provas, Simulados e Flashcards, como para os professores. As questões em <strong>Aguardando imagem</strong> ficam fora do estudo dos alunos até a figura chegar." },
    { icone:"settings", titulo:"Configurações e segurança",
      texto:"Metas, pesos do algoritmo e a banca de referência ficam em <strong>Configurações</strong>. O administrador máster cuida do backup — exporte uma cópia com frequência." },
    ...PASSOS_COMUNS_FIM,
  ],
};

/* ---------- o guia completo, por tela ---------- */
const GUIA_ALUNO = [
  { titulo:"Início e sessão do dia", itens:[
    "A <strong>sessão recomendada</strong> junta questões do seu bloco atual, revisão dos blocos que já passaram e uma prévia do próximo. O tamanho segue a sua meta diária.",
    "A <strong>meta de hoje</strong> mostra quantas questões e cartões faltam.",
    "Se você sair no meio de uma sessão, ela fica guardada: o Início oferece <strong>Continuar</strong> de onde parou.",
  ]},
  { titulo:"Estudar: escolher o que fazer", itens:[
    "<strong>Monte sua própria lista</strong> filtra por área, especialidade, assunto, instituição, ano, só erros, só favoritas ou só as que você nunca respondeu.",
    "A meta diária é ajustada em Estudar; o ano da faculdade e a turma, em Perfil e em Meu Grupo.",
  ]},
  { titulo:"Respondendo uma questão", itens:[
    "Escolha a alternativa e marque <strong>Certeza</strong>, <strong>Na dúvida</strong> ou <strong>Chute</strong>. A confiança entra na revisão espaçada: chute e erro voltam antes.",
    "O <strong>×</strong> ao lado de cada alternativa risca o que você já descartou (clique de novo para trazer de volta).",
    "Depois de responder, aparecem o gabarito, a explicação e as referências. No computador, as teclas <strong>A</strong> e <strong>D</strong> passam para a questão anterior e a próxima; no celular, arraste para o lado.",
    "Na questão: <strong>Favoritar</strong> (com uma anotação sua), <strong>Virar flashcard</strong>, <strong>Não mostrar mais</strong>, <strong>Sinalizar desatualizada</strong> e <strong>Tirar dúvida com IA</strong>.",
  ]},
  { titulo:"Revisão e Revisão Rápida", itens:[
    "<strong>Revisão</strong> traz as questões cujo prazo de revisão venceu, com o motivo de cada uma (erro recente ou tempo sem ver).",
    "<strong>Revisão Rápida</strong> são os flashcards: os cartões da equipe, os seus e os gerados das questões que você errou com certeza ou acertou no chute. Você também pode sugerir um cartão seu para o baralho da equipe.",
  ]},
  { titulo:"Provas e Simulados", itens:[
    "As <strong>provas antigas</strong> são as provas reais, do jeito que caíram, filtráveis por instituição, ano e área. Faça <strong>como simulado</strong> (no cronômetro, com nota no fim) ou <strong>pratique sem cronômetro</strong>.",
    "O cartão de cada prova diz quantas questões foram anuladas pela banca e quantas esperam a figura da prova — essas ficam de fora por enquanto.",
    "Os <strong>simulados da equipe</strong> aparecem na mesma tela, com o resultado da última vez que você fez.",
  ]},
  { titulo:"Meu Desempenho", itens:[
    "Acerto por grande área, especialidade e assunto, e a evolução no tempo.",
    "<strong>O que mais cai</strong>: os assuntos que a banca cobra mais, cruzados com o seu acerto — onde vale a pena investir.",
    "<strong>Nota estimada</strong>: uma projeção da sua nota na prova, com a faixa de incerteza.",
  ]},
  { titulo:"Turma, favoritos e histórico", itens:[
    "<strong>Meu Grupo</strong>: escolha a sua turma do rodízio (é ela que decide o bloco atual) ou crie um grupo de estudo com colegas.",
    "<strong>Favoritos</strong> guarda as questões e os cartões salvos, com as suas anotações.",
    "<strong>Histórico de Atividade</strong> lista as sessões e os simulados que você fez.",
    "<strong>Enviar Questões</strong>: mande uma questão ou uma prova inteira, só para o seu grupo ou como sugestão para o banco geral.",
  ]},
  { titulo:"Perfil, aplicativo e dados", itens:[
    "Em <strong>Perfil</strong>: ano da faculdade, lembrete diário de meta, senha, instalar o Esc como aplicativo, conta na nuvem e baixar uma cópia do seu estudo.",
    "Com a nuvem ligada, o estudo sincroniza entre aparelhos. Sem ela, tudo fica salvo neste navegador.",
  ]},
];
const GUIA_EQUIPE = [
  { titulo:"Banco de Questões", itens:[
    "Filtros por instituição, ano, área, status e busca por texto. Cada questão abre na íntegra, pode ser editada ou excluída.",
    "<strong>Status › Aguardando imagem</strong>: questões que dependem de uma figura da prova ainda não anexada. Elas <strong>não aparecem para os alunos</strong> — nem no estudo, nem na revisão, nem nas provas antigas ou nos simulados.",
    "Para liberar: salve a figura em <code>dados/imagens/</code> com o nome indicado e apague a linha <code>imagemPendente</code> da questão no arquivo de dados — ou, na tela de edição, envie a imagem ou marque que ela já foi salva.",
  ]},
  { titulo:"Importar, Central de Provas e Revisar Formatação", itens:[
    "<strong>Importar Questões</strong>: uma questão por vez, em lote, ou uma prova inteira colada de uma vez (instituição e ano informados uma vez só).",
    "<strong>Central de Provas</strong>: acompanha cada prova em lotes até a publicação; a conferência aponta gabarito faltando, questão repetida e assunto inexistente.",
    "<strong>Revisar Formatação</strong>: corrige o texto de questões importadas antes de chegarem aos alunos.",
    "A explicação de toda questão é escrita pela equipe, a partir de fontes primárias — nunca copiada de cursinho ou site de questões.",
  ]},
  { titulo:"Qualidade e dúvidas", itens:[
    "<strong>Questões Difíceis</strong>: as de menor acerto da turma, para conferir gabarito e explicação.",
    "<strong>Fila de Dúvidas</strong>: as dúvidas deixadas pelos alunos nas questões, para a equipe responder.",
    "Questões sinalizadas como desatualizadas chegam à equipe para revisão.",
  ]},
  { titulo:"Simulados, PDF e flashcards", itens:[
    "<strong>Criar Simulado</strong> monta uma prova com filtros e duração; os alunos a veem em Provas e Simulados.",
    "<strong>Material em PDF</strong> gera listas de questões e de cartões para imprimir.",
    "<strong>Flashcards</strong>: o baralho da equipe, os cartões sugeridos por alunos para aprovar e os cartões em lote.",
  ]},
  { titulo:"Painel da Turma e modo aluno", itens:[
    "<strong>Painel da Turma</strong>: engajamento, acerto por área e assuntos mais errados da turma (precisa da nuvem ligada).",
    "O <strong>modo aluno</strong> mostra a plataforma como o aluno a vê; as respostas dadas nele contam para o seu próprio progresso.",
  ]},
];
const GUIA_ADMIN = [
  { titulo:"Administração", itens:[
    "<strong>Aprovar Cadastros</strong> e <strong>Usuários</strong>: liberar acessos, mudar papel, nível de administrador e situação das contas.",
    "<strong>Blocos de Estudo</strong>: o calendário de cada ano da faculdade e das turmas do rodízio, que decide o bloco atual dos alunos.",
    "<strong>Configurações</strong>: metas mínima e recomendada, mistura da sessão, pesos da dificuldade, banca de referência e outras regras do algoritmo.",
    "<strong>Feedback dos Usuários</strong>: comentários, sugestões e reclamações enviados pela plataforma.",
    "O administrador máster exporta e restaura o backup (Perfil › Backup). Faça cópias com frequência — cadastros não se recriam sozinhos.",
  ]},
];
const GUIA_RESIDENTE = [
  { titulo:"O que é do residente", itens:[
    "<strong>Fila de Dúvidas</strong>: responda às dúvidas da turma com as suas palavras e uma fonte.",
    "<strong>Questões Difíceis</strong>: confira gabarito e explicação das questões que a turma mais erra.",
    "<strong>Enviar Provas e Questões</strong>, <strong>Central de Provas</strong> e <strong>Revisar Formatação</strong>: ajude a trazer provas novas e a deixá-las prontas.",
    "<strong>Provas e Simulados</strong>: as mesmas provas antigas e simulados que os alunos veem.",
  ]},
];
function secoesDoGuia(papel){
  if(papel === "aluno") return GUIA_ALUNO;
  if(papel === "residente") return [...GUIA_RESIDENTE, ...GUIA_EQUIPE.filter(s => /Importar|Qualidade/.test(s.titulo))];
  if(papel === "admin") return [...GUIA_ADMIN, ...GUIA_EQUIPE, ...GUIA_ALUNO];
  return [...GUIA_EQUIPE, ...GUIA_ALUNO];
}

/* ---------- abrir, navegar e fechar o tour ---------- */
function abrirTutorialRapido(){
  state.tutorial = { passo: 0, papel: papelDoTutorial() };
  desenharPassoTutorial();
}
function desenharPassoTutorial(){
  const t = state.tutorial; if(!t) return;
  const passos = TUTORIAL_RAPIDO[t.papel] || TUTORIAL_RAPIDO.aluno;
  const i = Math.max(0, Math.min(t.passo, passos.length - 1));
  const p = passos[i];
  const ultimo = i === passos.length - 1;
  const u = usuarioAtual();
  const oculto = !!(u && u.tutorialOcultoAoEntrar);
  abrirModal(`<div class="modal-header"><h3>Tutorial rápido</h3><button class="icon-btn" title="Fechar" onclick="fecharTutorial()">${iconeSvg("x")}</button></div>
    <div class="tutorial-passo" data-passo="${i}">
      <div class="tutorial-icone">${iconeSvg(p.icone)}</div>
      <div class="tutorial-contador">Passo ${i + 1} de ${passos.length}</div>
      <h3 class="tutorial-titulo">${escapeHtml(p.titulo)}</h3>
      <p class="tutorial-texto">${p.texto}</p>
      <div class="tutorial-pontos" aria-hidden="true">${passos.map((_, k) => `<span class="${k === i ? "ativo" : ""}"></span>`).join("")}</div>
    </div>
    <label class="checkbox-row mt-2"><input type="checkbox" id="tutorialNaoMostrar" ${oculto ? "checked" : ""} onchange="definirTutorialAoEntrar(!this.checked)"> Não mostrar este tutorial quando eu entrar</label>
    <div class="tutorial-acoes mt-2">
      ${i > 0 ? `<button class="btn btn-secondary btn-sm" onclick="passoTutorial(-1)">Voltar</button>` : `<button class="btn btn-ghost btn-sm" onclick="fecharTutorial()">Pular</button>`}
      <span class="flex gap-1" style="flex-wrap:wrap">
        ${ultimo ? `<button class="btn btn-secondary btn-sm" onclick="abrirGuiaCompleto()">${iconeSvg("book")} Ver guia completo</button>
          <button class="btn btn-primary btn-sm" onclick="fecharTutorial()">Começar</button>`
          : `<button class="btn btn-primary btn-sm" onclick="passoTutorial(1)">Próximo</button>`}
      </span>
    </div>`);
}
function passoTutorial(delta){
  if(!state.tutorial) return;
  state.tutorial.passo += delta;
  desenharPassoTutorial();
}
function fecharTutorial(){
  state.tutorial = null;
  fecharModal();
}

/* A escolha de ver (ou não) o tour ao entrar fica no cadastro da pessoa. */
function definirTutorialAoEntrar(mostrar){
  const u = usuarioAtual(); if(!u) return;
  if(mostrar) delete u.tutorialOcultoAoEntrar;
  else u.tutorialOcultoAoEntrar = true;
  saveState();
  toast(mostrar ? "O tutorial rápido vai aparecer quando você entrar." : "Pronto: o tutorial não vai mais aparecer quando você entrar. Ele continua em Perfil › Ajuda e tutorial.");
}

/* ---------- o guia completo ---------- */
function abrirGuiaCompleto(){
  state.tutorial = null;
  const papel = papelDoTutorial();
  const secoes = secoesDoGuia(papel);
  const tituloAluno = papel !== "aluno" && papel !== "residente";
  abrirModal(`<div class="modal-header"><h3>Guia completo</h3><button class="icon-btn" title="Fechar" onclick="fecharModal()">${iconeSvg("x")}</button></div>
    <p class="text-sm muted mb-2">Toque em um tema para abrir. ${tituloAluno ? "As seções do fim descrevem a plataforma vista pelo aluno." : ""}</p>
    <div class="guia-secoes">
      ${secoes.map((s, k) => `<details class="guia-secao"${k === 0 ? " open" : ""}>
        <summary>${escapeHtml(s.titulo)}</summary>
        <ul>${s.itens.map(it => `<li>${it}</li>`).join("")}</ul>
      </details>`).join("")}
    </div>
    <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
      <button class="btn btn-secondary btn-sm" onclick="abrirTutorialRapido()">${iconeSvg("play")} Rever o tutorial rápido</button>
      <button class="btn btn-primary btn-sm" onclick="fecharModal()">Fechar</button>
    </div>`, "lg");
}

/* ---------- o tour que abre sozinho ao entrar ----------
   Chamado pelo render() quando a tela é o Início. Abre uma vez por sessão do
   navegador (a marca fica no sessionStorage, por pessoa) e nunca por cima de
   outra janela aberta. Devolve true se abriu. */
function chaveTutorialDaSessao(u){ return "esc_tutorial_visto_" + u.id; }
function tutorialJaVistoNestaSessao(u){
  try{ return sessionStorage.getItem(chaveTutorialDaSessao(u)) === "1"; }catch(e){ return !!state.tutorialVistoNaMemoria; }
}
function marcarTutorialVistoNestaSessao(u){
  try{ sessionStorage.setItem(chaveTutorialDaSessao(u), "1"); }catch(e){ state.tutorialVistoNaMemoria = true; }
}
function mostrarTutorialAoEntrar(opts){
  opts = opts || {};
  const u = usuarioAtual(); if(!u) return false;
  if(!opts.mesmoComAutomacao && typeof navigator !== "undefined" && navigator.webdriver) return false;
  if(u.tutorialOcultoAoEntrar) return false;
  if(tutorialJaVistoNestaSessao(u)) return false;
  if(document.getElementById("modalOverlayAtivo")) return false;
  marcarTutorialVistoNestaSessao(u);
  abrirTutorialRapido();
  return true;
}
function agendarTutorialAoEntrar(){
  // espera a tela do Início terminar de desenhar
  setTimeout(() => { if(state.route === "inicio") mostrarTutorialAoEntrar(); }, 300);
}

/* ---------- o cartão do Perfil ---------- */
function renderCardAjuda(){
  const u = usuarioAtual();
  const mostrar = !(u && u.tutorialOcultoAoEntrar);
  return `<div class="card mt-2" style="max-width:460px">
    <div class="card-title">Ajuda e tutorial</div>
    <p class="text-sm muted">O tutorial rápido passa pelo essencial em um minuto; o guia completo explica cada função, tela por tela.</p>
    <div class="flex gap-1 mt-2" style="flex-wrap:wrap">
      <button class="btn btn-primary btn-sm" onclick="abrirTutorialRapido()">${iconeSvg("play")} Tutorial rápido</button>
      <button class="btn btn-secondary btn-sm" onclick="abrirGuiaCompleto()">${iconeSvg("book")} Guia completo</button>
    </div>
    <label class="checkbox-row mt-2"><input type="checkbox" ${mostrar ? "checked" : ""} onchange="definirTutorialAoEntrar(this.checked)"> Mostrar o tutorial rápido quando eu entrar</label>
  </div>`;
}
