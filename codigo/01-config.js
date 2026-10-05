/* codigo/01-config.js — CONFIG (metas, algoritmos, nuvem, tipos de prova), estado global e tema claro/escuro (seção 1).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   ESC — PLATAFORMA DE ESTUDOS PARA RESIDÊNCIA MÉDICA
   ==========================================================================
   Arquivo aberto: o index.html (a moldura) e, ao lado dele, codigo/ (todo o
   código) e dados/ (todo o conteúdo). Sem instalação, servidor ou build —
   abrir o index.html com dois cliques basta; publicar é subir os três.

   Onde mexer:
   - uma tela ou regra: o arquivo de codigo/ que a tem (mapa no CLAUDE.md;
     `npm run mapa` lista seções e funções com a linha de cada uma);
   - metas, pesos do algoritmo, endereço da nuvem: CONFIG, logo abaixo —
     a maior parte também se ajusta pela tela Configurações, sem código;
   - conteúdo (questões, cartões, calendário): dados/LEIA-ME.md;
   - o porquê de cada decisão: RESUMO-PROJETO-ESC.md; a história de cada
     mudança: docs/HISTORICO.md.
   O estudo e os cadastros vivem no navegador (e na nuvem, se ligada), não
   em arquivo: o backup é em Configurações. Conferir se nada quebrou:
   npm test (roda sozinho no GitHub a cada envio).
   ========================================================================== */

/* ---------------------------- 1. CONFIG ---------------------------------- */
const CONFIG = {
  nomePlataforma: "Esc",
  subtitulo: "Preparação para Residência Médica",
  bancaFoco: "UNIFESP-EPM",
  /* "O que mais cai" e "Se a prova fosse hoje" (seção 4, O QUE MAIS CAI NA
     PROVA). Tudo calculado a partir das provas reais da bancaFoco que
     estão no banco. */
  incidencia: {
    respostasDePeso: 4,        // o acerto de um assunto com poucas respostas é puxado para o acerto geral, como se houvesse 4 respostas a mais nele
    acertoPresumido: 0.6,      // acerto usado para quem ainda não respondeu nada
    pesoNaSessao: 3,           // na sessão recomendada, o assunto de maior prioridade vem até 4× mais cedo (0 desliga)
    topParaDestacar: 15,       // os 15 assuntos de maior prioridade ganham o selo "cai muito" no motivo da questão
    minRespostasParaNota: 30,  // a estimativa de nota só aparece a partir de 30 respostas
  },
  hoje: () => new Date(), // usado no lugar de "new Date()" direto, fácil de simular outra data no futuro

  // metas de estudo
  metaMinimaQuestoesDia: 15,
  metaRecomendadaQuestoesDia: 30,
  // meta diária de flashcards, para quem prefere (ou só consegue, naquele dia)
  // estudar por cartão. Número mais alto que o de questões de propósito: um
  // cartão leva segundos, uma questão de prova leva minutos.
  metaCartoesDia: 40,

  // como uma sessão "recomendada" mistura o bloco atual, blocos passados
  // (revisão) e blocos futuros (pré-estudo). A soma deve dar 1.0
  misturaBlocos: { atual: 0.60, revisaoPassados: 0.25, previaFuturos: 0.15 },
  // quem não segue calendário nenhum (formado sem grupo): fatia da sessão que é revisão; o resto é questão ainda não vista
  revisaoSemCalendario: 0.4,

  // Começo de ano: nos primeiros blocos ainda não há matéria do ano corrente
  // para revisar. Se o aluno tiver conteúdo de anos anteriores (blocos de
  // calendários passados ou questões que ele já respondeu em outro ano), a
  // revisão roda normalmente desde o primeiro bloco, usando esse material.
  // Se não houver nada anterior, a carga de revisão entra devagar: estes são
  // os tetos de revisão dos três primeiros blocos/meses.
  rampaRevisaoInicio: [0, 0.10, 0.20],

  // peso de cada fator na "dificuldade progressiva" (a soma deve dar 1.0)
  // taxaAcerto: quanto menor a taxa de acerto geral, mais difícil
  // especificidade: fundamental < intermediário < avançado
  // prevalencia: assuntos mais cobrados nas provas aparecem antes (são tratados como "mais fáceis/prioritários")
  pesosDificuldade: { taxaAcerto: 0.5, especificidade: 0.25, prevalencia: 0.25 },

  /* Nenhuma questão volta antes disto (dias), seja por erro, por chute ou por
     acerto: voltar em 1 ou 2 dias é reler, não recuperar da memória. Vale
     também para o prazo de assunto e para a lista "Revisar erros". */
  intervaloMinimoRevisao: 7,
  // escada de intervalos (dias) usada como ponto de partida da repetição
  // espaçada: o primeiro degrau é a volta depois de um erro
  intervalosBase: [7, 14, 21, 35, 75, 120],
  /* Depois de um ACERTO com segurança (certeza ou dúvida, não chute) a questão
     só volta bem mais tarde: 1º acerto seguido, 30 dias; 2º, 60. No 3º ela
     está dominada e sai da revisão espaçada (acertosParaDominarQuestao). Errar
     zera a contagem. Num assunto em que a pessoa vai bem (taxa das últimas
     respostas), o intervalo cresce ainda mais — bonusAssuntoForte. */
  intervalosAposAcerto: [30, 60],
  acertosParaDominarQuestao: 3,
  bonusAssuntoForte: [{ taxa: 0.85, fator: 2 }, { taxa: 0.7, fator: 1.5 }],
  minRespostasAssuntoForte: 8,

  // a partir de quantas respostas uma questão passa a ser candidata à fila
  // de "questões difíceis" (evita marcar como difícil algo com poucos dados)
  minRespostasParaAvaliarDificuldade: 8,
  // Acerto médio de um ano ou de uma turma (Painel da Turma) só aparece com
  // pelo menos este número de alunos respondendo: média de um ou dois alunos
  // é o acerto deles, e a taxa de acerto de uma pessoa é só dela. O banco
  // aplica a mesma regra (acerto_por_turma no esquema.sql, "tot.alunos >= 3").
  minAlunosParaMedia: 3,
  // "Não mostrar mais esta questão" só é oferecido depois deste número de
  // erros NA MESMA questão: errar uma vez é o começo da lição, não motivo
  // para tirar a questão da frente
  errosParaEsconderQuestao: 2,
  limiarTaxaAcertoDificil: 0.45,

  papeis: ["admin", "professor", "residente", "aluno"],

  // QUANTAS GRANDES ÁREAS UM PROFESSOR OU RESIDENTE PODE COBRIR
  // A regra é de qualidade, não de burocracia: quem responde dúvida de aluno
  // e revisa questão precisa estar em dia com a área, e ninguém está em dia
  // com as cinco ao mesmo tempo. Daí o teto de duas — com uma exceção:
  // Medicina Preventiva e Social é transversal (epidemiologia, bioética e SUS
  // caem dentro de prova de qualquer especialidade), então pode ser somada a
  // uma área clínica sem dobrar a carga. Na prática: no máximo 2 áreas e, se
  // forem 2, uma delas é a Preventiva — nunca duas áreas clínicas.
  maxAreasAtuacao: 2,
  areaTransversalId: "area-mps",

  // Anos da faculdade oferecidos no cadastro e no perfil do aluno.
  // "Internato" saiu da lista: na prática ele corresponde ao 5º e 6º ano, e
  // ter as duas coisas no mesmo campo fazia duas pessoas do mesmo semestre
  // aparecerem em turmas diferentes. Terceiro e quarto ano entraram porque a
  // preparação para a residência começa bem antes do último ano.
  anosFaculdade: ["3º ano", "4º ano", "5º ano", "6º ano", "Formado(a)"],
  // ano usado quando o aluno ainda não informou o dele (e para o calendário
  // oficial, que atende todos os anos)
  anoFaculdadePadrao: "6º ano",
  /* PROVA-ALVO: a prova para a qual a pessoa estuda. Só existe para quem está
     no 6º ano e para Formado(a) (`anos`): do 3º ao 5º a data seria um palpite
     de anos, e a plataforma prefere não ter prova-alvo a ter uma que não é da
     pessoa. Sem data marcada, vale o 1º de dezembro (as provas de residência
     começam aí) — o próximo que ainda não passou; quem quiser põe a data exata
     da primeira prova importante. */
  provaAlvo: { mes: 12, dia: 1, anos: ["6º ano", "Formado(a)"] },
  /* CRONOGRAMA DO 6º ANO. No dia, as primeiras `questoesNoSistema` questões
     seguem a sessão recomendada de sempre (bloco atual, revisão, prévia); da
     seguinte em diante só entra questão de prova real de residência, nos
     assuntos que mais caem no banco e em que a pessoa mais erra
     (prioridadesDeEstudo, olhando todas as provas do banco, não só a banca
     de foco). `pesoExtras` é o quanto o assunto prioritário passa na frente
     no sorteio. É a reta final: depois de cumprido o cronograma da faculdade,
     o treino é com a prova de verdade, e sem desperdiçar tempo no que já se
     sabe. */
  cronogramaDoSextoAno: { anos: ["6º ano"], questoesNoSistema: 30, pesoExtras: 10, sessaoMinimaDeProva: 10 },
  /* Com a prova-alvo por perto, a revisão espaçada não pode empurrar uma
     questão ou cartão para depois da prova: o intervalo agendado passa a ser
     no máximo esta fração do tempo que falta (o intervalo ótimo entre revisões
     é uma fração do prazo até o teste — Cepeda et al., 2008 —, e perto da
     prova ela é de 20% a 40%). Só encurta, nunca alonga, e só no agendamento
     de agora: o que já estava agendado não muda. `ligado: false` desliga. */
  revisaoPelaProva: { ligado: true, fracaoDoPrazo: 0.25 },
  /* Quantas revisões de cartão (o registro de cada vez que um cartão foi
     avaliado) ficam neste navegador. O arquivo completo mora na nuvem; aqui é
     só uma janela recente, porque o localStorage tem uns 5 MB e esse registro
     cresce a cada cartão (40 por dia, ~14 mil por ano). O que ainda não subiu
     não depende deste limite: espera na fila de envio. */
  limiteLogCartoesLocal: 4000,
  // Anos que NÃO têm calendário de blocos próprio. "Formado(a)" está aqui
  // porque quem já se formou não segue calendário de faculdade nenhum: não
  // aparece na tela de Blocos de Estudo e não ganha sequência própria. Ele
  // continua podendo entrar num grupo — e aí acompanha o calendário do ano
  // daquela turma, que é o que faz sentido para quem estuda junto com ela.
  anosSemCalendario: ["Formado(a)"],

  // Níveis de administrador. Um administrador máster pode tudo; os demais
  // recebem apenas as permissões listadas em PERMISSOES_ADMIN (mais abaixo),
  // o que permite dar acesso à coordenação e a moderadores de conteúdo sem
  // entregar o controle total da plataforma.
  niveisAdmin: [
    { id:"master",      nome:"Administrador máster",     descricao:"Acesso total: usuários, papéis, configurações, calendário, conteúdo e livro de ouro." },
    { id:"coordenacao", nome:"Coordenação",              descricao:"Conteúdo, aprovação de cadastros, Painel da Turma, calendário de blocos e livro de ouro. Não altera papéis nem configurações do algoritmo." },
    { id:"moderador",   nome:"Moderador de conteúdo",    descricao:"Somente banco de questões, importação, controle de qualidade e simulados." },
  ],

  // Bancas de referência sugeridas nos campos de instituição (Importar
  // Questões, Banco de Questões, filtros). É só uma lista de sugestão para
  // preencher mais rápido — qualquer instituição pode ser digitada, sugerida
  // ou não. Enunciado e gabarito oficiais de provas públicas são domínio
  // público e podem ser usados integralmente; ver a nota de política de
  // conteúdo logo acima de SEED_QUESTOES.
  instituicoesReferencia: ["UNIFESP-EPM", "USP-SP (FMUSP)", "USP-RP (FMRP)", "Santa Casa de São Paulo (FCMSCSP)", "IAMSPE", "UNESP (FMB)", "AMRIGS", "FAMEMA"],
  // o mesmo, para as provas da graduação
  instituicoesGraduacao: ["Teste de Progresso"],

  /* TIPO DE PROVA. Prova de residência (o acesso ao R1) e prova da
     graduação (as provas da faculdade e o Teste de Progresso) medem coisas
     diferentes: a primeira seleciona para a especialização, a segunda
     confere se o conhecimento do ano ficou. Toda questão real é de um dos
     dois tipos (campo `tipoProva`); sem o campo, vale o padrão — residência,
     que é o que o banco tem desde o começo —, exceto quando a instituição
     é o Teste de Progresso (ver tipoProvaDe, seção 4). */
  tiposProva: [
    { id:"residencia", nome:"Residência", nomeLongo:"Provas de residência", descricao:"Acesso direto ao R1 (USP, UNIFESP, Santa Casa, AMRIGS...)" },
    { id:"graduacao",  nome:"Graduação",  nomeLongo:"Provas da graduação",  descricao:"Provas da faculdade e Teste de Progresso" },
  ],
  tipoProvaPadrao: "residencia",
  /* PROGRESSÃO DO ESTUDO ATÉ A PROVA DE RESIDÊNCIA. Quanto mais longe da
     prova, mais a sessão recomendada pede CONSOLIDAÇÃO de conhecimento (as
     questões didáticas do Esc e as provas da graduação, que conferem o que
     ficou do ano); quanto mais perto, mais ela vira prova real de
     residência. Cada número é a fração da sessão que é consolidação; o
     resto são questões reais de provas de residência (ver ehConsolidacao e
     selecionarComProgressao, seção 4):
       3º ano 70/30 · 4º ano 60/40 · 5º ano 25/75 · 6º ano 0/100.
     Ano fora da lista (Formado(a)) é 0: só prova de residência. Nada sai do
     estudo — Estudar, filtros e Provas Antigas continuam mostrando tudo;
     a proporção vale para a sessão recomendada. (db.configGeral.
     progressaoConsolidacao, se existir, vale no lugar desta lista.) */
  progressaoConsolidacao: { "3º ano": 0.70, "4º ano": 0.60, "5º ano": 0.25, "6º ano": 0 },

  // NUVEM — conta de verdade e estudo em vários aparelhos.
  // Vazio = a plataforma funciona exatamente como sempre funcionou, só com o
  // navegador deste computador. Para ligar, crie o projeto no Supabase e cole
  // aqui os dois valores; o passo a passo está em nuvem/LEIA-ME.md.
  // A chave anônima é pública de propósito: quem protege os dados é a regra
  // no banco (Row Level Security), não o segredo da chave.
  /* CONTAS DE DEMONSTRAÇÃO DA EQUIPE COM A NUVEM LIGADA. As contas
     admin@esc.demo, professor@esc.demo e residente@esc.demo têm senha
     escrita na documentação — servem para conhecer a plataforma, não para
     um site no ar. Com a nuvem ligada (site de verdade, turma de verdade),
     elas ficam DESLIGADAS: num computador compartilhado, qualquer um que
     soubesse a senha abriria as telas de administração e o backup daquele
     navegador. A de aluno continua (acesso rápido), porque não mexe em nada
     de ninguém. Mude para true só se precisar testar a equipe no site. */
  contasDemoDaEquipeComNuvem: false,

  nuvem: {
    /* Endereço público do site, para onde os links dos e-mails (confirmar
       o cadastro, trocar a senha) devolvem a pessoa. Vazio = o endereço
       desta própria página, que é o certo quase sempre. Preencha só se o
       site tiver mais de um endereço e os e-mails devam levar a um só. */
    enderecoDoSite: "",
    url: "https://jznocvgmcgiovgcwhrvi.supabase.co",
    /* Chave PÚBLICA do aviso por push (par VAPID; a privada fica só nos
       segredos da função do Supabase — nuvem/LEIA-ME.md). Vazia = sem
       push com o app fechado; o aviso na tela e o do navegador aberto
       continuam. */
    vapidPublica: "",
    chaveAnon: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6bm9jdmdtY2dpb3ZnY3docnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MzQ4OTksImV4cCI6MjEwNTUxMDg5OX0.CyZ-46-2j3IO5JIUmwTqTuHyCDc6fkGE6Lbvpq22bbU",
  },
};

/* ---------------------------- ESTADO GLOBAL ------------------------------ */
// "db" é todo o banco de dados da demonstração — fica salvo no localStorage
// do navegador. state guarda também coisas temporárias de navegação (não
// salvas), como a sessão de questões em andamento.
let db = null;
let state = {
  route: "landing",
  routeParams: {},
  usuarioAtualId: null,
  sessaoAtual: null,     // fila de questões em andamento (prática ou simulado)
  sessaoFlash: null,      // baralho de flashcards em andamento (revisão rápida)
  filtroRota: {},         // filtros temporários usados por algumas telas
  modoFoco: false,        // menu e topo escondidos durante a sessão de questões
  menuGruposFechados: {}, // grupos do menu da equipe que a pessoa recolheu (só nesta sessão)
  mapaSessaoExpandido: false, // a barra de questões (sessão e simulado) está expandida? nasce fina, numa linha
  modoAluno: false,        // permite que admin/professor/residente também usem a plataforma como aluno
};

/* ---------------------------- TEMA CLARO/ESCURO ---------------------------
   Preferência salva à parte do banco de dados (é do navegador, não da conta)
   e aplicada assim que o script carrega, antes do primeiro render, pra não
   piscar o tema errado na tela. */
const CHAVE_TEMA = "medbloco_tema";
function aplicarTemaSalvo(){
  const salvo = localStorage.getItem(CHAVE_TEMA);
  document.documentElement.setAttribute("data-theme", salvo==="dark" ? "dark" : "light");
}
function alternarTema(){
  const atual = document.documentElement.getAttribute("data-theme");
  const novo = atual==="dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", novo);
  localStorage.setItem(CHAVE_TEMA, novo);
  render();
}
aplicarTemaSalvo();
