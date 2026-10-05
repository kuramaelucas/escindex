/* codigo/13-tutorial.js — tutorial rápido e guia completo, por papel (seção 26-C); ficam em Perfil e configurações › Ajuda e tutorial.
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   26-C. TUTORIAL DE USO
   ==========================================================================
   Dois níveis, pensados para quem nunca abriu a plataforma e para quem já usa
   mas quer achar uma função:

   - TUTORIAL RÁPIDO: meia dúzia de passos, um por tela, com o essencial do
     papel da pessoa (aluno, residente, professor, administrador). Abre
     sozinho quando ela entra e chega ao Início — uma vez por sessão do
     navegador —, até ela marcar "não mostrar de novo". Dá para rever a
     qualquer hora em Perfil e configurações > Ajuda e tutorial — e só lá:
     o item "Tutorial" saiu do menu lateral (28/09), que é para o que se usa
     todo dia.

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
    texto:"Este tour e um guia completo, função por função, ficam em <strong>Perfil e configurações › Ajuda e tutorial</strong>, no fim do menu. Lá você também escolhe se quer ver este tour quando entrar." },
];
const TUTORIAL_RAPIDO = {
  aluno: [
    { icone:"home", titulo:"Bem-vindo(a) ao Esc",
      texto:"Um tour de um minuto pelo essencial. O Esc organiza o seu estudo pelo calendário da sua turma e decide, a cada dia, o que vale a pena você fazer." },
    { icone:"play", titulo:"Comece pelo Início",
      texto:"A <strong>sessão recomendada</strong> do dia mistura o seu bloco atual, revisão dos blocos que já passaram e uma prévia do próximo, no tamanho da sua meta. Quer escolher o assunto? Use <strong>Estudar › Monte sua própria lista</strong> (botão <strong>Criar minha lista</strong>)." },
    { icone:"target", titulo:"Responda dizendo quanto sabe",
      texto:"Escolha a alternativa e marque <strong>Certeza</strong>, <strong>Na dúvida</strong> ou <strong>Chute</strong>: é isso que decide quando a questão volta para você. O <strong>×</strong> ao lado de cada alternativa risca o que você já descartou." },
    { icone:"refresh", titulo:"Revise na hora certa",
      texto:"<strong>Revisão</strong> traz de volta as questões no momento de não esquecer — os erros e os chutes primeiro. <strong>Revisão Rápida</strong> são os flashcards: os da equipe e os que você cria a partir de uma questão." },
    { icone:"clipboard", titulo:"Treine como na prova",
      texto:"Em <strong>Provas e Simulados</strong> estão as provas antigas de verdade, inteiras, para fazer no cronômetro ou sem pressa, e os simulados montados pela equipe." },
    { icone:"upload", titulo:"Envie questões e compartilhe com o grupo",
      texto:"Tem uma lista de exercícios ou uma prova em PDF? Em <strong>Enviar Questões</strong>: 1) diga a instituição e o ano; 2) copie o pedido pronto e cole numa IA junto com o PDF; 3) cole a resposta de volta, confira e envie para <strong>Questões do meu grupo</strong>. <strong>Dica:</strong> suba as listas que você recebe e compartilhe com os colegas — cada um ganha mais questões, e em <strong>Meu Grupo</strong> vocês ainda dividem o conjunto entre quem quiser." },
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
    { icone:"chart", titulo:"Turma",
      texto:"Como a turma está indo: acerto por área, quem está parado e os assuntos mais errados. <strong>Questões Difíceis</strong> mostra onde a turma trava." },
    { icone:"user", titulo:"Veja pelo olhar do aluno",
      texto:"O <strong>modo aluno</strong> mostra a plataforma como o aluno a vê — e as respostas dadas nele contam para o seu próprio progresso." },
    ...PASSOS_COMUNS_FIM,
  ],
  admin: [
    { icone:"home", titulo:"Bem-vindo(a), administrador(a)",
      texto:"Um tour de um minuto pelo que só a administração faz, além das ferramentas de conteúdo da equipe. O que aparece no seu menu depende do seu nível de acesso." },
    { icone:"check", titulo:"Cadastros e usuários",
      texto:"Em <strong>Turma › Cadastros e usuários</strong>: aprovar quem pediu acesso, mudar papel, nível de administrador e situação de cada conta — tudo na mesma tela do painel de uso." },
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
    "A sessão recomendada muda com o seu ano, do <strong>consolidar</strong> ao <strong>treinar a prova</strong>: <strong>3º ano 70% consolidação e 30% provas de residência; 4º ano 60/40; 5º ano 25/75; 6º ano 100% provas reais de residência</strong>. Consolidação são as questões didáticas do Esc e as provas da graduação. Cada questão da sessão diz de qual tipo é, e a tela Estudar explica a regra do seu ano.",
    "<strong>No 6º ano há um cronograma por dia:</strong> as primeiras 30 questões seguem a sessão recomendada; da 31ª em diante só entram questões de prova real de residência, nos assuntos que mais caem no banco e em que você mais erra. Cada questão extra diz o porquê.",
    "A <strong>meta de hoje</strong> mostra quantas questões e cartões faltam.",
    "Se você sair no meio de uma sessão, ela fica guardada: o Início oferece <strong>Continuar</strong> de onde parou.",
  ]},
  { titulo:"Estudar: escolher o que fazer", itens:[
    "<strong>Monte sua própria lista</strong> (clique em <strong>Criar minha lista</strong> para abrir as opções) filtra por área, especialidade, assunto, tipo de prova (residência ou graduação), instituição, ano, só erros, só favoritas ou só as que você nunca respondeu. Dá para marcar <strong>mais de uma instituição</strong> e <strong>mais de um tipo de prova</strong> no mesmo conjunto. Questão que você respondeu há pouco e ainda não venceu na revisão fica fora da lista; em letra pequena, abaixo da contagem, a tela diz quantas foram e deixa <strong>colocá-las de volta</strong>.",
    "Questão <strong>dissertativa</strong> não tem alternativas: você escreve a resposta, marca a confiança e só então vê a <strong>resposta esperada pela banca</strong> e a justificativa. Depois se avalia — <strong>acertei</strong> ou <strong>errei</strong> — e é essa avaliação que conta. O que você escreveu fica guardado, e quando a questão volta a tela mostra as tentativas anteriores para comparar.",
    "A meta diária é ajustada em Estudar (e, em <strong>Ajustar meta</strong>, o botão <strong>Restaurar padrão</strong> devolve a recomendação da coordenação); o ano da faculdade e a turma, em Perfil e em Meu Grupo.",
  ]},
  { titulo:"Respondendo uma questão", itens:[
    "Escolha a alternativa e marque <strong>Certeza</strong>, <strong>Na dúvida</strong> ou <strong>Chute</strong>. A confiança entra na revisão espaçada: chute e erro voltam antes.",
    "O <strong>×</strong> ao lado de cada alternativa risca o que você já descartou (clique de novo para trazer de volta).",
    "Assunto, especialidade e dificuldade só aparecem <strong>depois de responder</strong>, para não entregar o diagnóstico. Se a questão tem imagem, ela vem logo abaixo do enunciado, antes das alternativas.",
    "Depois de responder, aparecem o gabarito, a explicação e as referências. No computador, as teclas <strong>A</strong> e <strong>D</strong> passam para a questão anterior e a próxima; no celular, arraste para o lado.",
    "<strong>Destaque o que importa</strong>: selecione um trecho do enunciado, de uma alternativa, da explicação ou de um flashcard e toque em <strong>Destacar</strong>. O trecho fica marcado sempre que a questão voltar (e nos seus outros aparelhos); clique nele para remover. Os destaques são só seus.",
    "Na questão: <strong>Favoritar</strong> (com uma anotação sua), <strong>Virar flashcard</strong>, <strong>Não mostrar mais</strong> (só aparece depois de você errar a mesma questão pela segunda vez), <strong>Sinalizar desatualizada</strong> e <strong>Tirar dúvida com IA</strong>.",
  ]},
  { titulo:"Revisão e Revisão Rápida", itens:[
    "<strong>Revisão</strong> traz as questões da revisão espaçada, nesta ordem: primeiro as dos assuntos já estudados que você <strong>ainda não viu</strong>, depois as que você <strong>errou</strong> (ou acertou no chute) e, por último, as que acertou e já passou o prazo. Acerto seguro só volta depois de 1 mês (2 no segundo acerto seguido, e mais ainda em assunto em que você vai bem); com <strong>3 acertos seguidos</strong> a questão sai da revisão.",
    "<strong>Revisão Rápida</strong> são os flashcards: os cartões da equipe, os seus e os gerados das questões que você errou com certeza ou acertou no chute. Você também pode sugerir um cartão seu para o baralho da equipe. O botão <strong>Criar meu baralho</strong> abre as opções de montagem: área, especialidade ou assunto, só os vencidos, só os que você ainda não viu ou só os seus, e quantos cartões.",
    "<strong>Adicionar baralho</strong> (em Revisão Rápida) tem duas saídas: escrever um cartão ou <strong>trazer um baralho inteiro de uma IA</strong>. Você escolhe o assunto e a quantidade, copia o pedido pronto, cola numa IA (se tiver resumo ou PDF seu, anexe na conversa), traz a resposta de volta e <strong>confere</strong> antes de adicionar. Os cartões ficam só no seu baralho.",
    "<strong>Anotação rápida</strong> (em Revisão Rápida) cria um cartão seu <strong>sem assunto</strong>, para as suas anotações soltas — a <strong>miscelânea</strong>. Use <strong>Salvar e criar outro</strong> para anotar em sequência. Elas entram no baralho normal e, em <strong>Criar meu baralho &gt; Quais cartões</strong>, dá para revisar só elas.",
    "<strong>Criar em lista</strong> (em Revisão Rápida) abre uma tabela com Frente e Verso para criar vários cartões de uma vez. Dá para colar de uma planilha ou de um texto com Tab entre frente e verso. O assunto é opcional (vale para todos) e, se uma linha estiver pela metade, nada é criado e a mensagem diz qual.",
  ]},
  { titulo:"Provas e Simulados", itens:[
    "As <strong>provas antigas</strong> são as provas reais, do jeito que caíram, separadas em <strong>provas de residência</strong> e <strong>provas da graduação</strong> (o Teste de Progresso é graduação) e filtráveis por instituição, ano e área. No 3º e 4º ano, as da graduação aparecem primeiro. Faça <strong>como simulado</strong> (no cronômetro, com nota no fim) ou <strong>pratique sem cronômetro</strong>.",
    "O cartão de cada prova diz quantas questões foram anuladas pela banca e quantas esperam a figura da prova — essas ficam de fora por enquanto.",
    "Os <strong>simulados da equipe</strong> aparecem na mesma tela, com o resultado da última vez que você fez.",
  ]},
  { titulo:"Meu Desempenho", itens:[
    "Acerto por grande área, especialidade e assunto, e a evolução no tempo.",
    "<strong>O que mais cai</strong>: os assuntos que a banca cobra mais, cruzados com o seu acerto — onde vale a pena investir.",
    "<strong>Nota estimada</strong>: uma projeção da sua nota na prova, com a faixa de incerteza.",
  ]},
  { titulo:"Turma, favoritos e histórico", itens:[
    "<strong>Meu Grupo</strong>: escolha a sua turma do rodízio (é ela que decide o bloco atual; onde o calendário não dá nome às turmas, o grupo é identificado pelo bloco em que começa) ou crie um grupo com colegas — seguindo o rodízio do ano, com <strong>calendário próprio</strong> (você monta os blocos) ou só para <strong>dividir questões</strong>. Além do grupo do calendário, você pode estar em <strong>um segundo grupo só de questões</strong> (botão <em>Só questões</em>, ou <em>Passar este grupo para só questões</em> no grupo em que você já está; ao escolher a turma do rodízio, o Esc pergunta se você quer continuar no grupo antigo só para questões): ele compartilha e divide questões, mas não muda o seu calendário. Quem criou um grupo pode <strong>excluí-lo</strong> — e sair dele, para o dono, é excluir. Você vê quem são os <strong>integrantes</strong> do grupo — quem criou o grupo pode retirar alguém no <strong>×</strong> — e, quando alguém pede para entrar, o Esc avisa na tela, com o número ao lado de Meu Grupo no menu. O dono pode mudar o nome do grupo e dividir as questões do grupo entre os membros (cada um pratica a sua parte). Qualquer integrante pode criar um <strong>grupo de estudo</strong> dentro do grupo: escolhe quem participa e quais provas do grupo entram, e só essas pessoas dividem aquele conjunto — sem mudar calendário nem sair da turma; quem criou o grupo de estudo pode tirar um participante no <strong>×</strong>. Quem já se formou não tem calendário de faculdade: entra ou cria um grupo. No 6º ano, <strong>Meus estágios</strong> deixa você reordenar os estágios de cada período do seu jeito, sem sair do grupo.",
    "<strong>Favoritos</strong> guarda as questões e os cartões salvos, com as suas anotações, e — na aba <strong>Retiradas da revisão</strong> — as questões que você pediu para não ver mais, com o botão para trazê-las de volta.",
    "Os <strong>avisos da coordenação</strong> aparecem no Início; dispense o que já leu.",
    "<strong>Histórico de Atividade</strong> lista as sessões e os simulados que você fez.",
    "<strong>Enviar Questões — passo a passo</strong>: (1) identifique a prova (tipo, instituição e ano); (2) copie o pedido pronto e cole numa IA junto com o PDF ou o texto; (3) cole a resposta no campo, clique em <strong>Pré-visualizar</strong>, confira e confirme. <strong>Sugestão:</strong> envie também as <strong>listas de exercícios</strong> que você recebe e compartilhe com o grupo: elas ficam disponíveis para todos (em Estudar, marque \"incluir questões do meu grupo\") e dá para dividir o conjunto em Meu Grupo. Você pode mandar uma questão ou uma prova inteira, só para o seu grupo ou como sugestão para o banco geral. Escolha o tipo de prova (residência, o padrão, ou graduação) e, se a questão tiver imagem, anexe a figura na pré-visualização — cada questão tem o seu lugar para isso. Com a conta na nuvem, a questão sobe com a imagem e vai para a equipe aprovar; em <strong>Suas questões enviadas</strong> você acompanha se foi aprovada ou recusada (com o motivo).",
  ]},
  { titulo:"Perfil, aplicativo e dados", itens:[
    "Em <strong>Perfil e configurações</strong> (no fim do menu): ano da faculdade, lembrete diário de meta, este tutorial e o guia, senha (a troca pede a senha atual), instalar o Esc como aplicativo, conta na nuvem e baixar uma cópia do seu estudo.",
    "Com a nuvem ligada, o estudo sincroniza entre aparelhos. Sem ela, tudo fica salvo neste navegador.",
    "<strong>Prova-alvo:</strong> existe no 6º ano e para quem já se formou. Sem data marcada vale o 1º de dezembro, e o Início mostra quanto falta; em Perfil você pode marcar a data exata da sua primeira prova importante. Quando a prova se aproxima, as revisões espaçadas passam a voltar em no máximo 25% do tempo que falta — para o que você revisa não ficar para depois dela. Do 3º ao 5º ano não há prova-alvo.",
  ]},
];
const GUIA_EQUIPE = [
  { titulo:"Banco de Questões", itens:[
    "Filtros por instituição, ano, área, status e busca por texto. Cada questão abre na íntegra, pode ser editada ou excluída.",
    "<strong>Status › Aguardando imagem</strong>: questões que dependem de uma figura da prova ainda não anexada. Elas <strong>não aparecem para os alunos</strong> — nem no estudo, nem na revisão, nem nas provas antigas ou nos simulados.",
    "Para liberar: salve a figura em <code>dados/imagens/</code> com o nome indicado e apague a linha <code>imagemPendente</code> da questão no arquivo de dados — ou, na tela de edição, envie a imagem ou marque que ela já foi salva.",
  ]},
  { titulo:"Questões para Atualizar", itens:[
    "Uma lista só com o que precisa de conserto: <strong>figura que falta</strong>, <strong>texto cortado</strong> no material de origem, <strong>rascunho</strong>, <strong>desatualizada</strong> e <strong>sinalizada por aluno</strong>. Filtre por tipo e instituição.",
    "<strong>Consertar</strong> abre o formulário da questão; <strong>Enviar a figura</strong> anexa a imagem direto da lista. Vale na hora — e, com a nuvem, o conserto sobe (a figura vai junto) e chega a toda a turma: a questão volta ao estudo dos alunos.",
    "<strong>Baixar as atualizações</strong> gera um arquivo com <em>só</em> as questões consertadas. Na pasta do projeto, <code>npm run atualizar-dados -- arquivo.json</code> grava cada conserto no arquivo da prova e as figuras em <code>dados/imagens/</code>.",
    "<strong>Desfazer</strong> devolve a questão ao que a pasta <code>dados/</code> diz, em todos os aparelhos.",
  ]},
  { titulo:"Importar, Central de Provas e Revisar Formatação", itens:[
    "<strong>Importar Questões</strong>: uma questão por vez, em lote, ou uma prova inteira colada de uma vez (tipo de prova, instituição e ano informados uma vez só). O tipo é <strong>residência</strong> por padrão; prova da faculdade e Teste de Progresso são <strong>graduação</strong>.",
    "No Passo 3 dá para <strong>enviar o arquivo da prova</strong> em vez de colar: documento do Word (<code>.docx</code>), <code>.txt</code>, <code>.md</code> ou <code>.csv</code>, um ou vários de uma vez. O conteúdo precisa estar no formato do script do Passo 2 (o botão <strong>Baixar modelo</strong> traz um exemplo); o PDF ou o Word original da banca não serve, porque não traz gabarito marcado nem explicação.",
    "A figura de cada questão (ECG, radiografia, foto) se anexa na pré-visualização. Se a transcrição disser que há imagem e ela não for anexada, a questão entra como <strong>Aguardando imagem</strong>.",
    "<strong>Central de Provas</strong>: acompanha cada prova em lotes até a publicação; a conferência aponta gabarito faltando, questão repetida e assunto inexistente. As figuras anexadas num lote ficam guardadas com ele até a publicação.",
    "Com a nuvem, toda questão enviada pela plataforma sobe com a imagem. As da turma chegam a <strong>Controle de Qualidade › Enviadas pela Turma</strong>: aprove (ela entra no banco de todos) ou recuse com um motivo, que volta para quem enviou. Para guardar de vez na pasta <code>dados/</code>, use <strong>Banco de Questões › Exportar para a pasta dados/</strong>.",
    "<strong>Revisar Formatação</strong>: corrige o texto de questões importadas antes de chegarem aos alunos. A tela se divide em <strong>blocos de envio</strong> (uma prova ou uma leva por bloco, com data, instituição, ano e quem enviou): confira uma prova de cada vez.",
    "<strong>Professor e residente</strong> cobrem no máximo <strong>2 grandes áreas</strong>: uma clínica e, se quiser, Medicina Preventiva e Social, que é transversal. É o que define quais dúvidas de aluno chegam até a pessoa; o cadastro aplica a regra enquanto se marca.",
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
  { titulo:"Turma e modo aluno", itens:[
    "<strong>Turma › Painel de uso</strong>: engajamento, acerto por área e assuntos mais errados da turma (precisa da nuvem ligada). A lista de pessoas mostra o <strong>último uso</strong> de cada uma e ordena por ele (mais recente ou mais antigo primeiro), e a coluna <strong>Condição</strong> diz se cada aluno está em dia, parado (7 dias ou mais sem estudar) ou nunca estudou.",
    "O <strong>modo aluno</strong> mostra a plataforma como o aluno a vê; as respostas dadas nele contam para o seu próprio progresso.",
  ]},
];
const GUIA_ADMIN = [
  { titulo:"Administração", itens:[
    "<strong>Turma</strong> tem duas abas: o <strong>Painel de uso</strong> e <strong>Cadastros e usuários</strong> (liberar acessos, mudar papel, nível de administrador e situação das contas). Quando alguém pede acesso, o Esc avisa na tela e mostra o número ao lado de Turma no menu; na aba Cadastros e usuários dá para receber também como notificação do sistema.",
    "<strong>Blocos de Estudo</strong>: o calendário de cada ano da faculdade e das turmas do rodízio, que decide o bloco atual dos alunos.",
    "<strong>Configurações</strong>: metas mínima e recomendada, mistura da sessão, pesos da dificuldade, banca de referência e outras regras do algoritmo.",
    "<strong>Enviar Avisos</strong>: escreva um recado e escolha os papéis e os anos da faculdade que o recebem (em branco, todos). Ele aparece no Início de cada pessoa até ela dispensar; com a nuvem, chega a todos os aparelhos. Dá para levar a pessoa a uma tela e definir até quando o aviso vale.",
    "<strong>Feedback dos Usuários</strong>: comentários, sugestões e reclamações enviados pela plataforma. Com a nuvem, chegam de qualquer aparelho, com o número de não lidos no menu; marcar como lido vale para os outros administradores.",
    "O administrador máster exporta e restaura o backup (Perfil › Backup). Faça cópias com frequência — cadastros não se recriam sozinhos.",
  ]},
];
const GUIA_RESIDENTE = [
  { titulo:"O que é do residente", itens:[
    "<strong>Fila de Dúvidas</strong>: responda às dúvidas da turma com as suas palavras e uma fonte.",
    "<strong>Questões Difíceis</strong>: confira gabarito e explicação das questões que a turma mais erra.",
    "<strong>Enviar Provas e Questões</strong>, <strong>Central de Provas</strong> e <strong>Revisar Formatação</strong>: ajude a trazer provas novas e a deixá-las prontas.",
    "<strong>Questões para Atualizar</strong>: envie a figura que falta, complete o texto cortado, reveja o gabarito — o conserto chega a toda a turma pela nuvem.",
    "<strong>Provas e Simulados</strong>: as mesmas provas antigas e simulados que os alunos veem.",
  ]},
];
function secoesDoGuia(papel){
  if(papel === "aluno") return GUIA_ALUNO;
  if(papel === "residente") return [...GUIA_RESIDENTE, ...GUIA_EQUIPE.filter(s => /Importar|Qualidade|Atualizar/.test(s.titulo))];
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
      <span class="flex gap-1 quebra">
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
  toast(mostrar ? "O tutorial rápido vai aparecer quando você entrar." : "Pronto: o tutorial não vai mais aparecer quando você entrar. Ele continua em Perfil e configurações › Ajuda e tutorial.");
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
    <div class="flex gap-1 mt-2 quebra">
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
    <div class="flex gap-1 mt-2 quebra">
      <button class="btn btn-primary btn-sm" onclick="abrirTutorialRapido()">${iconeSvg("play")} Tutorial rápido</button>
      <button class="btn btn-secondary btn-sm" onclick="abrirGuiaCompleto()">${iconeSvg("book")} Guia completo</button>
    </div>
    <label class="checkbox-row mt-2"><input type="checkbox" ${mostrar ? "checked" : ""} onchange="definirTutorialAoEntrar(this.checked)"> Mostrar o tutorial rápido quando eu entrar</label>
  </div>`;
}
