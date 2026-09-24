/* Esc — codigo/01-config.js  (parte 1 de 13)
   Guia de manutenção, CONFIG (metas, algoritmos, nuvem), estado global e tema claro/escuro.
   Os arquivos de codigo/ são carregados em ordem pelo index.html (lista
   ESC_ARQUIVOS.codigo) e dividem o mesmo espaço: uma função escrita num
   arquivo é usada nos outros sem import. */

/* ==========================================================================
   ESC — PLATAFORMA DE ESTUDOS PARA RESIDÊNCIA MÉDICA
   ==========================================================================
   GUIA RÁPIDO DE MANUTENÇÃO (para quem não é programador)
   ------------------------------------------------------------------------
   Esta é uma plataforma de arquivo aberto: o index.html (a moldura) mais
   duas pastas ao lado dele — "codigo/" (todo o código, em treze arquivos)
   e "dados/" (todo o conteúdo). Não precisa de instalação, servidor,
   "build" ou internet para funcionar (exceto para carregar as fontes, que
   são opcionais, e para a nuvem) — basta manter os três juntos: abrir o
   index.html com dois cliques continua bastando.
   Para editar qualquer coisa:

   1. Abra o arquivo da pasta codigo/ que tem a tela ou a regra (cada um
      começa dizendo o que tem dentro) com o bloco de notas, VS Code, ou
      mande-o para uma IA (ChatGPT/Claude) pedindo para "editar a seção X".
   2. Use Ctrl+F para achar as seções pelos títulos em CAIXA ALTA:
        CONFIG              -> (este arquivo) nome da plataforma, metas
                                padrão, pesos de dificuldade, intervalos de
                                revisão, endereço da nuvem
        SEED_TAXONOMIA      -> (02-persistencia) onde a taxonomia entra
        SEED_QUESTOES       -> (02-persistencia) onde as questões entram
                                (o conteúdo em si fica na pasta "dados/")
        NUVEM               -> 03-nuvem
        MEU DESEMPENHO      -> 10-telas-do-aluno
        INICIALIZAÇÃO       -> 13-admin-e-inicializacao (sempre o último)

   ONDE FICA CADA COISA
   ------------------------------------------------------------------------
   - index.html: só a moldura — cabeçalho, ícones, a VERSÃO e a lista
     ESC_ARQUIVOS com os arquivos a carregar, na ordem.
   - codigo/: o CÓDIGO, e só: telas, regras, algoritmos, configuração e o
     visual (estilo.css). Nenhuma questão, nenhum cartão, nenhuma conta.
     A divisão segue as seções numeradas de sempre (1 a 28), então o que
     estava na seção 17 continua sendo "a seção 17", agora dentro de
     10-telas-do-aluno.js.
   - dados/: TODO o conteúdo — taxonomia, calendário, questões (uma prova
     por arquivo), flashcards, simulados e os dados de demonstração.
   - Os SEED_* são só APELIDOS: `const SEED_QUESTOES =
     window.EscDados.questoes`. Quem enche o EscDados são os arquivos de
     dados/, carregados antes do código. Mexer num SEED_* não muda
     conteúdo nenhum — o conteúdo está lá.
   - Para acrescentar ou corrigir conteúdo: dados/LEIA-ME.md.
   - Para conferir se nada quebrou: testes/ (npm test) — roda sozinho no
     GitHub a cada envio.
   - Se faltar um arquivo, a plataforma abre e avisa numa tarja no alto da
     tela, DIZENDO QUAL faltou (avisarSeFaltarConteudo), em vez de parecer
     quebrada; Configurações > Arquivos de conteúdo mostra o que entrou.

   NOVIDADES DESTA VERSÃO (o que mudou e onde mexer)
   ------------------------------------------------------------------------
   - A plataforma passou a se chamar "Esc" (mude em CONFIG.nomePlataforma).
   - A aba "Assuntos" saiu do menu: a navegação por especialidade e assunto
     agora fica em Estudar > Monte sua própria lista, junto com filtros de
     instituição, ano, "últimos 5 anos" e "todas as grandes áreas".
   - "Histórico de Atividade" (menu do aluno) guarda cada conjunto de
     questões concluído e permite reabrir a página de feedback.
   - "Enviar / Importar Questões" está aberta para aluno e residente, com
     prompt de prova inteira (instituição e ano informados uma vez só).
   - Qualquer lista de questões tem "ver na íntegra", que abre o enunciado
     completo, alternativas, gabarito e explicação numa janela.
   - A área de Aulas foi removida da plataforma (telas, menus e dados).
   - Questões aceitam IMAGEM (ECG, radiografia, fundo de olho, foto de lesão),
     por link ou arquivo enviado — o arquivo é reduzido e comprimido antes de
     ser guardado, e o Perfil mostra quanto espaço o banco já ocupa.
   - Detecção de questões duplicadas: ao salvar uma questão nova, ao importar
     um lote (contra o banco e contra o próprio lote) e numa aba "Duplicadas"
     dentro do Controle de Qualidade.
   - Simulado com cronômetro, encerramento automático no fim do tempo e
     registro do tempo gasto em cada questão — o resultado mostra onde a
     pessoa travou, e Meu Desempenho mostra o ritmo geral.
   - A calibração da confiança virou ação: filas separadas por tipo de erro
     (errou com certeza, acertou no chute, errou na dúvida) e lista de
     assuntos em que a pessoa responde com certeza e erra.
   - O prompt de importação exige explicação autoral, com REFERENCIAS de
     diretrizes/protocolos/artigos, e proíbe copiar resolução de sites de
     questões ou de cursinhos.
   - Administradores agora têm NÍVEIS (CONFIG.niveisAdmin + PERMISSOES_ADMIN):
     máster, coordenação e moderador de conteúdo. O menu e as rotas se ajustam
     sozinhos ao nível de cada um; só o máster altera papéis e níveis.
   - "Livro de Ouro": página aberta a todos com doações, colaborações e apoios,
     mantida pela coordenação (SEED_LIVRO_OURO traz exemplos para apagar), mais
     um reconhecimento calculado automaticamente pelo que cada pessoa fez aqui.
   - "Especialidades e Assuntos" (menu de conteúdo): renomear, mover, mesclar e
     excluir especialidades/assuntos, com verificação de consistência e correção
     automática — inclusive das questões classificadas de forma incoerente.
   - Revisão no começo do ano: se houver matéria de anos anteriores, ela alimenta
     a revisão desde o 1º bloco; se não houver, a carga entra devagar
     (0%, 10% e 20% nos três primeiros blocos — ajustável em Configurações,
     campo CONFIG.rampaRevisaoInicio).
   - Foram acrescentadas 105 questões autorais de construção de conhecimento,
     de nível fácil a moderado, marcadas com a instituição
     "Esc — Banco Didático" (use esse filtro para estudar só elas):
       30 de Técnica Operatória (nova especialidade dentro de Cirurgia Geral),
       30 de Cardiologia, 30 de Infectologia e 15 de Oftalmologia (nova
       especialidade dentro de Clínica Médica).
     Quem já usava a plataforma recebe esse conteúdo automaticamente: a
     função sincronizarConteudoNovo() acrescenta ao banco salvo no navegador
     apenas o que falta, sem apagar respostas, favoritos ou questões próprias.

   O QUE MUDOU NESTA VERSÃO
   ------------------------------------------------------------------------
   - MEU DESEMPENHO ganhou um SELETOR DE PERÍODO com quatro recortes: últimos
     14 dias, últimos 30 dias, últimos 12 meses e o ano corrente mês a mês.
     Funções: desempenhoPorDia(), desempenhoPorMes() e resumoJanela() no motor
     de estudos; dadosDoPeriodo() e PERIODOS_DESEMPENHO na própria tela.
   - GRÁFICO DE BARRAS VERTICAIS (graficoBarrasVerticaisSvg): cada barra é
     100% das questões do dia/mês/área — verde claro embaixo é o acerto,
     cinza claro em cima é o erro. As cores estão em --barra-acerto e
     --barra-erro, nos dois temas. Dia sem estudo vira um traço na base, de
     propósito, para a rotina real aparecer.
   - DESEMPENHO POR ÁREA agora para nas 5 GRANDES ÁREAS: a antiga árvore
     assunto a assunto saiu da tela (virava lista que ninguém lia até o fim).
     A tabela mostra acertos, erros, taxa e o assunto mais fraco de cada área,
     com botão de praticar; o detalhe fino ficou na tela de Revisão.
   - METAS DE ESTUDO saiu do menu e virou o primeiro cartão de ESTUDAR, com o
     progresso do dia à vista e o ajuste do número numa janela
     (abrirModalMeta). A rota "metas" continua respondendo e leva a Estudar.
   - ALUNO CRIA FLASHCARD durante as questões: botão "Virar flashcard" nas
     ações da questão, no modal de questão na íntegra e na lista do fim da
     sessão. O assunto já vem marcado com o da questão, e há atalho para
     jogar o gabarito comentado no verso.
     Cartão agora tem DONO: `usuarioId` preenchido = cartão pessoal, que só
     o autor enxerga (flashcardsAtivos(usuarioId)); `usuarioId: null` =
     material da equipe, visível a todos (flashcardsDaEquipe()). O PDF e a
     tela de manutenção usam só o material da equipe.
   - REVISÃO RÁPIDA (FLASHCARDS): cartão de conceito com frente e verso, sem
     alternativa para eliminar. O baralho se monta sozinho, priorizando os
     assuntos de falsa segurança, e inclui cartões gerados a partir das
     questões que o aluno errou com certeza ou acertou no chute. Cada cartão
     tem repetição espaçada própria, separada da das questões.
     Onde mexer: SEED_FLASHCARDS (cartões de exemplo), seção "12-B" (telas) e
     "montarBaralhoFlashcards" no motor de estudos. Professores cadastram
     cartões novos pela própria tela, sem tocar no código.
   - MATERIAL EM PDF (professores, coordenação e moderadores): prova para
     aplicar com cartão-resposta, lista de exercícios comentada, baralho de
     flashcards para recortar e relatório de desempenho da turma. Não usa
     nenhuma biblioteca: monta o material na div #areaImpressao e chama a
     impressão do navegador, onde existe "Salvar como PDF". Seção "20-B".
   - MENU REORDENADO por probabilidade de uso. Os quatro primeiros itens do
     aluno são Início, Estudar, Meu Desempenho e Meu Grupo — no celular, os
     únicos que aparecem sem rolar. Ver navItemsParaPapel().
   - LIVRO DE OURO saiu do menu lateral: agora fica no rodapé da tela inicial
     (renderCardLivroOuroInicio) e em Configurações. A página continua no ar,
     só não ocupa mais uma linha do menu de quem vai estudar.
   - BACKUP restrito ao administrador máster (exportar, importar e reiniciar).
     A checagem está em podeMexerEmBackup(), na própria função, não só no
     botão. A caixa aparece em Perfil e em Configurações: renderCardBackup().
   - ARRASTAR PARA O LADO no celular troca de questão, de cartão e de questão
     do simulado. Ver ativarGestoDeArrastar(), chamada ao fim de cada render.
   - CLICAR NO ENUNCIADO abre a questão na íntegra em qualquer lista, e também
     na questão já respondida. A classe CSS é .enunciado-clicavel.
   - ANO DA FACULDADE: entraram 3º e 4º ano; "Internato" saiu (virou 5º/6º
     ano, que é o que a coordenação usa para montar turmas). Lista central em
     CONFIG.anosFaculdade; quem estava como "Internato" foi migrado para 6º
     ano automaticamente, e o aluno pode corrigir o próprio ano no Perfil.
   3. Prefira sempre usar as telas do próprio app (Admin > Banco de Questões,
      Admin > Importar Questões, Admin > Blocos) em vez de editar o código.
      Este arquivo só precisa ser editado para mudanças estruturais.
   4. Os dados dos usuários reais (respostas, cadastros etc.) ficam salvos no
      navegador (localStorage), não neste arquivo. Use "Configurações >
      Exportar backup" para não perder nada.

   ATUALIZAÇÃO DA NOITE DE 19/09 (resumo — detalhe completo na seção 13 do
   resumo enviado no chat):
   - Política de conteúdo: enunciado/gabarito de prova PÚBLICA pode ser usado
     integralmente (domínio público); só a explicação é sempre autoral —
     nunca copiada de cursinho. Ver comentário acima de SEED_QUESTOES.
   - SEED_FLASHCARDS: de 24 para 501 cartões, cobrindo os 91 assuntos.
   - Lembrete de meta diária via Notification do navegador (ativarLembreteMetaDiaria,
     checarLembreteMetaDiaria) — configurável no Perfil do aluno.
   - Flashcards ganharam imagem (imagemUrl/imagemLegenda), igual às questões.
   - Cartão pessoal pode ser sugerido para o baralho da equipe, com aprovação
     em Controle de Qualidade > aba "Flashcards Sugeridos" (sugerirFlashcardParaEquipe,
     aprovarFlashcardSugerido, recusarFlashcardSugerido).
   - Dois gargalos de desempenho corrigidos (banco testado com >6.000
     questões via automação de navegador): respostasDaQuestao() e
     questoesDuplicadasDe() varriam o banco inteiro a cada chamada; agora
     usam índices cacheados por _geracaoDb (indiceRespostasDoUsuario,
     indiceAssinaturasQuestoes).
   - Nova estatística de qualidade: q.estatisticas.eliminacoesAoErrar conta,
     por alternativa, quantas vezes ela estava riscada quando o aluno errou —
     visível em Controle de Qualidade > Questões Difíceis.

   ATUALIZAÇÃO DE 21/09 — O CONTEÚDO SAIU DO CÓDIGO E A NUVEM ENTROU
   ------------------------------------------------------------------------
   - PASTA "dados/": as 635 questões e os 501 cartões saíram deste arquivo e
     viraram sete arquivos ao lado dele (ver CONTEÚDO: A PASTA, mais acima).
     No site nada muda; o que muda é que dá para ler, revisar ou mandar para
     uma IA só o código, ou só uma prova. Passo a passo: dados/LEIA-ME.md.
   - NUVEM (seção 2-C, funções "nuvem*"): conta de verdade com e-mail e
     senha e estudo sincronizado entre aparelhos, por cima do Supabase.
     Ligada por CONFIG.nuvem; vazia, a plataforma funciona como sempre
     funcionou, só com este navegador. O banco, as regras de segurança e o
     passo a passo estão em nuvem/esquema.sql e nuvem/LEIA-ME.md.
     O CONTEÚDO não sobe: questões e cartões da equipe são iguais para todos
     e continuam vindo da pasta "dados/". Questão criada pela Central de
     Provas ou por Importar Questões continua só no navegador de quem a
     publicou até alguém levá-la para "dados/".
   - MAPA DA SESSÃO (renderMapaSessao): durante a prática, a fila de questões
     vira uma tira de números clicáveis, com acerto e erro à vista. Não
     confundir com o mapa do SIMULADO (.pill-mapa/.mapa-legenda), que durante
     a prova diz só respondida/em branco, nunca certo ou errado.
   - SEPARAÇÃO COMPLETA (21/09, segunda parte): saíram também a taxonomia,
     o calendário, os simulados e os dados de demonstração — antes só as
     questões e os cartões estavam fora. Agora o index.html não tem
     conteúdo nenhum. Arquivos novos: dados/taxonomia.js, dados/calendario.js,
     dados/simulados-equipe.js e dados/demonstracao.js (este último é o que
     se esvazia quando a turma real entra). A ponte window.EscDados ganhou
     registrarSimulados, registrarTaxonomia, registrarCalendario e
     registrarDemonstracao, e as listas agora se SOMAM entre arquivos.
   - CENTRAL DE PROVAS (renderCentralProvas e funções de "carga"/"lote"):
     subir uma prova inteira pela plataforma, em lotes, com duas ou mais
     pessoas ao mesmo tempo, conferindo cada lote contra a faixa pedida antes
     de publicar. Fica em Admin > Central de Provas.
   ========================================================================== */

/* ---------------------------- 1. CONFIG ---------------------------------- */
const CONFIG = {
  nomePlataforma: "Esc",
  subtitulo: "Preparação para Residência Médica",
  bancaFoco: "UNIFESP-EPM",
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

  // escada de intervalos (dias) usada como ponto de partida da repetição espaçada
  intervalosBase: [1, 3, 7, 16, 35, 75],

  // a partir de quantas respostas uma questão passa a ser candidata à fila
  // de "questões difíceis" (evita marcar como difícil algo com poucos dados)
  minRespostasParaAvaliarDificuldade: 8,
  limiarTaxaAcertoDificil: 0.45,

  papeis: ["admin", "professor", "residente", "aluno"],

  // Anos da faculdade oferecidos no cadastro e no perfil do aluno.
  // "Internato" saiu da lista: na prática ele corresponde ao 5º e 6º ano, e
  // ter as duas coisas no mesmo campo fazia duas pessoas do mesmo semestre
  // aparecerem em turmas diferentes. Terceiro e quarto ano entraram porque a
  // preparação para a residência começa bem antes do último ano.
  anosFaculdade: ["3º ano", "4º ano", "5º ano", "6º ano", "Formado(a)"],
  // ano usado quando o aluno ainda não informou o dele (e para o calendário
  // oficial, que atende todos os anos)
  anoFaculdadePadrao: "6º ano",
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
    { id:"coordenacao", nome:"Coordenação",              descricao:"Conteúdo, aprovação de cadastros, calendário de blocos e livro de ouro. Não altera papéis nem configurações do algoritmo." },
    { id:"moderador",   nome:"Moderador de conteúdo",    descricao:"Somente banco de questões, importação, controle de qualidade e simulados." },
  ],

  // Bancas de referência sugeridas nos campos de instituição (Importar
  // Questões, Banco de Questões, filtros). É só uma lista de sugestão para
  // preencher mais rápido — qualquer instituição pode ser digitada, sugerida
  // ou não. Enunciado e gabarito oficiais de provas públicas são domínio
  // público e podem ser usados integralmente; ver a nota de política de
  // conteúdo logo acima de SEED_QUESTOES.
  instituicoesReferencia: ["UNIFESP-EPM", "USP-SP (FMUSP)", "USP-RP (FMRP)", "Santa Casa de São Paulo (FCMSCSP)", "IAMSPE", "UNESP (Famema/Botucatu)"],

  // NUVEM — conta de verdade e estudo em vários aparelhos.
  // Vazio = a plataforma funciona exatamente como sempre funcionou, só com o
  // navegador deste computador. Para ligar, crie o projeto no Supabase e cole
  // aqui os dois valores; o passo a passo está em nuvem/LEIA-ME.md.
  // A chave anônima é pública de propósito: quem protege os dados é a regra
  // no banco (Row Level Security), não o segredo da chave.
  nuvem: {
    url: "https://jznocvgmcgiovgcwhrvi.supabase.co",
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
  mapaSessaoAberto: true,  // o mapa de progresso da sessão está aberto?
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
