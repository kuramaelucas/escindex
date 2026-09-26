/* Esc — codigo/02-persistencia.js  (parte 2 de 13)
   Os apelidos SEED_* do conteúdo da pasta dados/, a conferência dos arquivos de conteúdo e a persistência (localStorage, migrações, rede de segurança do banco).
   Os arquivos de codigo/ são carregados em ordem pelo index.html (lista
   ESC_ARQUIVOS.codigo) e dividem o mesmo espaço: uma função escrita num
   arquivo é usada nos outros sem import. */

/* ---------------------------- SEED_TAXONOMIA ------------------------------
   As 5 grandes áreas cobradas em provas de residência médica no Brasil, cada
   uma com especialidades e, dentro delas, assuntos específicos. A árvore em
   si mora em dados/taxonomia.js; aqui fica só o apelido que o resto do
   código usa. Para acrescentar um assunto, o caminho normal é a tela
   Conteúdo > Especialidades e Assuntos — mexer no arquivo só é preciso para
   mudanças grandes.
   O objeto vazio do fim é a rede de proteção: sem o arquivo, a plataforma
   abre e avisa (avisarSeFaltarConteudo) em vez de quebrar na primeira tela. */
const SEED_TAXONOMIA = (window.EscDados && window.EscDados.taxonomia) || { areas:[], especialidades:[], assuntos:[] };

/* ---------------------------- SEED_BLOCOS --------------------------------
   O calendário de blocos de estudo. Cada bloco tem uma janela de datas e as
   especialidades trabalhadas naquele período. O "bloco atual" é detectado
   automaticamente pela data de hoje (mas o Admin pode fixar manualmente em
   Admin > Blocos).

   COMO O RODÍZIO FUNCIONA (leia antes de mexer)
   --------------------------------------------------------------------------
   A sequência de blocos pertence ao ANO DA FACULDADE, não ao grupo. Todas as
   turmas do mesmo ano passam pelos mesmos blocos, na mesma ordem — o que muda
   entre elas é ONDE CADA UMA COMEÇA. É assim que funciona o rodízio de
   verdade: enquanto a turma A está em Obstetrícia, a turma B está em
   Pediatria, e daqui a um bloco elas trocam.

   Por isso um grupo guarda só duas coisas: de que ano ele é e qual o seu
   DESLOCAMENTO (quantos blocos à frente ele começa). As janelas de data são
   sempre as mesmas — o que gira é o conteúdo dentro delas.

   O DESLOCAMENTO TEM NOME. Ninguém sabe de cor o próprio deslocamento; todo
   mundo sabe que está "no grupo B". A ponte entre as duas coisas é o campo
   `grupoRodizio` do bloco: a letra escrita no bloco de índice i da sequência
   é a da turma que COMEÇA ali — a de deslocamento i. É um dado editável, e
   não uma conta a partir do índice, porque no calendário real do 3º ano as
   letras não seguem a ordem alfabética (A, D, C, B). Sem letra preenchida,
   vale a ordem alfabética. Ver opcoesRodizio() e rotuloRodizio().

   Anos diferentes têm sequências diferentes, porque a matéria é outra: o 3º
   ano está começando a clínica e o 6º está no internato. "Formado(a)" não
   tem sequência: quem já se formou não cursa calendário de faculdade nenhum
   (CONFIG.anosSemCalendario). Ele continua entrando em turmas e acompanha o
   calendário do ano delas — ver anoDeReferencia().

   As datas, os nomes e as letras do rodízio moram em dados/calendario.js —
   a regra do rodízio, que é sistema, fica aqui. SEED_BLOCOS é o calendário
   de referência e SEED_SEQUENCIAS_ANO é a sequência de cada ano. */
const SEED_BLOCOS = (window.EscDados && window.EscDados.blocos) || [];
/* Nota sobre granularidade dos blocos: um bloco pode juntar quantas
   especialidades você quiser — "Cirurgia Geral" acima junta as 4
   especialidades cirúrgicas num bloco só, do jeito que costuma ser dividido
   de verdade no internato/graduação. Se quiser blocos ainda mais amplos
   (por exemplo, uma "grande área" inteira num bloco só) ou mais estreitos,
   é só editar especialidadeIds — tanto em dados/calendario.js quanto pela
   tela Admin > Blocos de Estudo ou Meu Grupo, sem mexer em mais nada. */

/* ---------------------------- SEED_SEQUENCIAS_ANO ------------------------
   Uma sequência de blocos por ano da faculdade. A do 6º ano é o internato
   completo (SEED_BLOCOS, acima); os outros anos têm menos blocos e mais
   tempo em cada um, que é como a matéria costuma ser distribuída antes do
   internato. A do 3º ano é o calendário real da faculdade, com quatro blocos
   girando entre os grupos A, B, C e D.

   Cada ano pode ter quantos blocos quiser: o rodízio entre as turmas funciona
   com qualquer quantidade, porque ele só gira a lista contra as mesmas
   janelas de data.

   As datas são de um ano letivo específico. Na virada do ano, quem usa a
   plataforma não reescreve este arquivo: Admin > Blocos de Estudo > "Virada
   de ano letivo" pede só a data em que o primeiro bloco começa e desloca a
   sequência inteira, preservando a duração de cada bloco e os intervalos
   entre eles (ver aplicarViradaDeAno). */
const SEED_SEQUENCIAS_ANO = (window.EscDados && window.EscDados.sequenciasAno) || {};

/* ---------------------------- SEED_USUARIOS -------------------------------
   Quatro contas prontas, uma por papel, para testar como cada um enxerga as
   telas: uma de administrador (máster), professor, residente e aluno. Use
   estes logins na tela de entrada; o atalho "ver como...", que entra sem
   senha, existe só para o de ALUNO — os outros três papéis mexem em conteúdo
   e em cadastros de gente de verdade e não podem ficar abertos a quem abrir
   o endereço.
   As contas moram em dados/demonstracao.js, junto do resto do que existe só
   para a tela não nascer vazia — é o arquivo para esvaziar quando a turma
   real entrar.
   ATENÇÃO: login/senha ali são só para a demonstração local, e ficam à vista
   de quem abrir o arquivo. Conta de verdade é a da nuvem (seção 2-C), com a
   senha guardada no servidor. */
const SEED_USUARIOS = (window.EscDados && window.EscDados.usuarios) || [];
/* ---------------------------- SEED_QUESTOES -------------------------------
   O BANCO DE QUESTÕES NÃO MORA MAIS AQUI. Ele vem dos arquivos da pasta
   "dados/", carregados pelas linhas <script src="dados/..."> que ficam logo
   antes deste código (procure por CONTEÚDO: A PASTA neste arquivo).
   SEED_QUESTOES é só o apelido que o resto do código usa para a lista já
   montada, na ordem em que os arquivos entraram:

     dados/banco-didatico.js       135 questões autorais de demonstração e
                                       de construção de conhecimento
     dados/prova-unifesp-2022.js   100 questões reais da UNIFESP-EPM
     dados/prova-unifesp-2023.js   100 questões reais da UNIFESP-EPM
     dados/prova-unifesp-2024.js   100 questões reais da UNIFESP-EPM
     dados/prova-unifesp-2025.js   100 questões reais da UNIFESP-EPM
     dados/prova-unifesp-2026.js   100 questões reais da UNIFESP-EPM
     dados/prova-santacasa-2021.js 100 questões reais da Santa Casa-SP
     dados/prova-santacasa-2022.js 100 questões reais da Santa Casa-SP
     dados/prova-santacasa-2023.js 100 questões reais da Santa Casa-SP
     dados/prova-santacasa-2025.js 100 questões reais da Santa Casa-SP
     dados/prova-santacasa-2026.js 100 questões reais da Santa Casa-SP
     dados/prova-usp-2022.js       100 questões reais da USP-SP (FMUSP)
     dados/prova-usp-2023.js       120 questões reais da USP-SP (FMUSP)
     dados/prova-usp-2024.js       120 questões reais da USP-SP (FMUSP)
     dados/prova-usp-2025.js       120 questões reais da USP-SP (FMUSP)
     dados/prova-usp-2026.js       120 questões reais da USP-SP (FMUSP)
                                   ---
                                  1715 questões

   PARA ACRESCENTAR QUESTÕES há três caminhos, do mais fácil ao mais
   trabalhoso: (1) a tela "Importar Questões" dentro do app, que não exige
   mexer em arquivo nenhum; (2) acrescentar itens a um arquivo que já existe
   na pasta "dados/"; (3) criar um arquivo novo lá e registrá-lo com mais
   uma linha <script src="..."> no index.html — é assim que entra uma prova
   inteira de uma banca nova. O molde de uma questão e o passo a passo estão
   em dados/LEIA-ME.md.

   POLÍTICA SOBRE QUESTÕES REAIS (leia antes de carregar provas de verdade):
   Prova de residência médica pública (USP-SP/FMUSP, USP-RP/FMRP, UNIFESP-EPM,
   Santa Casa de São Paulo, IAMSPE, UNESP etc.) é ato de instituição pública:
   o ENUNCIADO, as ALTERNATIVAS e o GABARITO OFICIAL divulgados pela própria
   banca são de DOMÍNIO PÚBLICO e podem ser transcritos e usados integralmente,
   sem restrição — não é preciso reescrever a pergunta com outras palavras.
   O que NUNCA pode ser copiado, resumido ou parafraseado é a RESOLUÇÃO/
   COMENTÁRIO de terceiros (cursinhos como Medway, Estratégia MED, sites de
   questões comerciais etc.): esse texto é propriedade intelectual deles, e é
   também a parte mais sujeita a erro e desatualização quando copiada sem
   checar. A explicação de cada questão real tem de ser ESCRITA PELA EQUIPE,
   com base em fontes primárias e oficiais (diretrizes, PCDT, artigos), do
   mesmo jeito que já é feito para as questões autorais.
   Questão real marca `real: true` e instituição/ano corretos; questão
   autoral de demonstração mantém `real: false`. */
const SEED_QUESTOES = (window.EscDados && window.EscDados.questoes) || [];

/* ---------------------------- SEED_LIVRO_OURO -----------------------------
   O "Livro de Ouro" registra quem sustenta e quem ajuda a construir a
   plataforma: doações (financeiras ou materiais) e colaborações (questões,
   revisões, dúvidas respondidas, organização). Os registros de exemplo estão
   em dados/demonstracao.js — apague-os de lá e cadastre os reais pela própria
   tela (Livro de Ouro > Registrar agradecimento), com um administrador de
   nível máster ou coordenação. */
const SEED_LIVRO_OURO = (window.EscDados && window.EscDados.livroOuro) || [];

/* ---------------------------- SEED_COMENTARIOS -----------------------------
   Exemplos de dúvidas/comentários em questões, em dados/demonstracao.js. Os
   com respostaOficial=true simulam uma resposta de residente/professor (a
   "fila de dúvidas" do papel Residente mostra os que ainda não têm resposta
   oficial). */
const SEED_COMENTARIOS = (window.EscDados && window.EscDados.comentarios) || [];

/* ---------------------------- SEED_FLASHCARDS ------------------------------
   Cartões de conceito: frente = pergunta curta, verso = resposta direta.
   Servem para a REVISÃO RÁPIDA — o aluno não escolhe alternativa, ele tenta
   lembrar, vira o cartão e diz honestamente se sabia. É o formato certo para
   o que a plataforma chama de "falsa segurança": assunto que a pessoa jura
   que sabe e erra na prova. Um cartão leva segundos; uma questão leva
   minutos. Por isso os dois convivem: flashcard para fixar o conceito,
   questão para treinar o raciocínio clínico em cima dele.

   Além destes, a plataforma GERA cartões automaticamente a partir das
   questões já respondidas (frente = enunciado, verso = gabarito comentado),
   priorizando as que o aluno errou com certeza ou acertou no chute.

   Os 501 cartões da equipe também saíram deste arquivo, pelo mesmo motivo
   das questões: estão em dados/flashcards-equipe.js, e todos são autorais,
   escritos para esta plataforma. SEED_FLASHCARDS é o apelido da lista que
   aquele arquivo entrega. Os cartões PESSOAIS de cada aluno não ficam em
   arquivo nenhum: nascem no uso e vivem no navegador de quem os escreveu. */
const SEED_FLASHCARDS = (window.EscDados && window.EscDados.flashcards) || [];

/* ------------------- CONFERÊNCIA DOS ARQUIVOS DE CONTEÚDO -----------------
   Se a pasta "dados/" não vier junto — alguém salvou só o index.html, ou o
   site foi publicado sem ela —, a plataforma abriria vazia, sem explicação,
   e pareceria quebrada. Em vez disso ela mostra uma tarja no alto da tela
   dizendo o que falta e como resolver. Quem já usava não perde nada: as
   respostas, os cartões e as questões dele continuam salvos no navegador,
   e é por isso que o aviso não impede o uso — só avisa. */
function resumoArquivosDeConteudo(){
  const d = window.EscDados || {};
  const t = d.taxonomia || {};
  return {
    arquivos: d.arquivos || [],
    taxonomia: (t.assuntos || []).length,
    blocos: (d.blocos || []).length,
    questoes: (d.questoes || []).length,
    flashcards: (d.flashcards || []).length,
    simulados: (d.simulados || []).length,
    usuarios: (d.usuarios || []).length,
  };
}
/* A tarja diz QUAL arquivo faltou, não só que algo faltou: com sete arquivos
   na pasta, "não carregou" sozinho não diz onde procurar. A taxonomia vem
   primeiro na lista de propósito — sem ela nada se classifica, e é a falta
   que mais estraga a tela. */
function avisarSeFaltarConteudo(){
  const r = resumoArquivosDeConteudo();
  const faltando = [];
  if(!r.taxonomia)  faltando.push("a taxonomia (<code>dados/taxonomia.js</code>)");
  if(!r.blocos)     faltando.push("o calendário de blocos (<code>dados/calendario.js</code>)");
  if(!r.questoes)   faltando.push("as questões (<code>dados/banco-didatico.js</code> e as provas)");
  if(!r.flashcards) faltando.push("os flashcards (<code>dados/flashcards-equipe.js</code>)");
  if(!r.usuarios)   faltando.push("as contas de demonstração (<code>dados/demonstracao.js</code>)");
  if(!faltando.length) return;                      // veio tudo: nada a avisar
  const tudo = r.arquivos.length === 0;
  const tarja = document.createElement("div");
  tarja.className = "aviso-dados";
  tarja.innerHTML = tudo
    ? `<strong>A pasta <code>dados/</code> não foi carregada.</strong>
       Todo o conteúdo da plataforma — taxonomia, calendário, questões, flashcards e
       simulados — mora nela, que precisa estar ao lado do arquivo index.html e ser
       publicada junto com ele, quando o site está no ar. A plataforma continua
       funcionando com o que já estiver salvo neste navegador, mas nada de novo entra
       enquanto a pasta não voltar.`
    : `<strong>Falta parte do conteúdo:</strong> não ${faltando.length===1?"carregou":"carregaram"}
       ${faltando.join(", ")}. Confira se ${faltando.length===1?"o arquivo está":"os arquivos estão"}
       na pasta <code>dados/</code> e se não há erro de digitação dentro ${faltando.length===1?"dele":"deles"}
       — um arquivo com erro de JavaScript deixa de carregar inteiro.
       Configurações &gt; Arquivos de conteúdo mostra o que entrou.`;
  document.body.insertBefore(tarja, document.body.firstChild);
}
/* ==========================================================================
   2. PERSISTÊNCIA DE DADOS (localStorage)
   ==========================================================================
   Tudo que os usuários fazem de verdade (respostas, cadastros, favoritos,
   comentários novos etc.) fica salvo no navegador, em localStorage, sob a
   chave "medbloco_db". Isso significa que os dados são LOCAIS a este
   navegador/computador — é o suficiente para testar e validar a plataforma
   sozinho ou em demonstrações, mas para uso real com vários alunos e
   professores em aparelhos diferentes, esses dados precisam morar num
   banco de dados de verdade (ver observações no resumo enviado no chat). */
const CHAVE_STORAGE = "medbloco_db_v1";
/* Onde fica a cópia do banco salvo tal como estava, guardada antes de
   qualquer caminho que possa substituí-lo (ver guardarCopiaDeResgate). */
const CHAVE_RESGATE = "medbloco_db_v1_resgate";

function copiaProfunda(obj){ return JSON.parse(JSON.stringify(obj)); }

function dbPadrao(){
  const grupoOficialId = "grupo-oficial";
  return {
    taxonomia: copiaProfunda(SEED_TAXONOMIA),
    // sequência de blocos por ano da faculdade (ver SEED_SEQUENCIAS_ANO)
    sequenciasAno: copiaProfunda(SEED_SEQUENCIAS_ANO),
    grupos: [
      // o grupo oficial não tem ano fixo: atende todos, e cada aluno vê a
      // sequência do ano dele. Turmas criadas por alunos fixam um ano.
      { id: grupoOficialId, nome: "Calendário Oficial da Coordenação", criadoPor: "u-admin", oficial: true, publico: true, criadoEm: "2026-01-05", anoFaculdade: null, deslocamento: 0, blocoAtualIdManual: null },
    ],
    grupoOficialId,
    usuarios: copiaProfunda(SEED_USUARIOS),
    questoes: copiaProfunda(SEED_QUESTOES),
    comentarios: copiaProfunda(SEED_COMENTARIOS),
    flashcards: copiaProfunda(SEED_FLASHCARDS),   // cartões de conceito (frente/verso)
    revisoesFlashcards: {},  // revisoesFlashcards[usuarioId][cartaoId] = {repeticoes,fator,intervalo,proximaRevisao}
    diasCartoes: {},     // diasCartoes[usuarioId] = [AAAA-MM-DD] — os dias em que houve cartão (sustenta a sequência)
    cartoesPorDia: {},   // cartoesPorDia[usuarioId][AAAA-MM-DD] = quantos cartões naquele dia
    livroOuro: copiaProfunda(SEED_LIVRO_OURO), // doações e agradecimentos
    respostas: [],       // log de respostas dos usuários (retrieval practice)
    favoritos: [],        // {usuarioId, questaoId, data, nota} — nota é a anotação pessoal da questão salva
    favoritosCartoes: [], // {usuarioId, cartaoId, data} — os flashcards salvos, do mesmo jeito
    questoesOcultas: [],  // {usuarioId, questaoId, data} — "não mostrar mais esta questão para mim"
    revisoes: {},          // revisoes[usuarioId][questaoId] = {repeticoes,fator,intervalo,proximaRevisao,ultimaConfianca}
    simulados: copiaProfunda(SEED_SIMULADOS), // provas antigas / simulados criados por professores
    resultadosSimulados: [],
    sessoes: [],            // histórico de conjuntos de questões concluídos (feedback questão a questão)
    sessoesEmAndamento: {}, // sessoesEmAndamento[usuarioId] = fila de questões não terminada, para retomar depois
    feedbacks: [],          // comentários, sugestões e reclamações gerais sobre a plataforma
    cargasProvas: [],       // provas sendo transcritas em lotes (ver Central de Provas)
    configGeral: {
      metaMinimaQuestoesDia: CONFIG.metaMinimaQuestoesDia,
      metaRecomendadaQuestoesDia: CONFIG.metaRecomendadaQuestoesDia,
      metaCartoesDia: CONFIG.metaCartoesDia,
      misturaBlocos: {...CONFIG.misturaBlocos},
      rampaRevisaoInicio: [...CONFIG.rampaRevisaoInicio],
    },
    // nuvem (seção 2-C): a fila do que ainda não subiu e até onde já baixamos
    filaNuvem: [],
    nuvem: { contaId:null, ultimaSyncEm:null, marcas:{}, recusados:[], calendarioPendente:[] },
    versao: 2,
  };
}

/* ---------------------------- rede de segurança do banco -----------------
   CADASTRO NÃO SE PERDE. Tudo o que a turma faz — cadastros, respostas,
   favoritos, questões enviadas — vive neste banco, e o resto (questões,
   cartões, calendário) o código sabe recriar sozinho a partir da pasta
   "dados/". Essas duas coisas têm valor MUITO diferente: recriar o conteúdo
   custa um F5, recriar os cadastros da turma é impossível.

   Por isso nada aqui volta ao "ponto de partida" por causa de um defeito.
   Diante de um banco salvo estranho, a regra é sempre consertar o que está
   quebrado e ficar com o resto — nunca trocar o banco inteiro por um novo.

   `garantirEstruturaDb()` é esse conserto: percorre as coleções que o código
   espera e devolve ao tipo certo (lista, objeto, texto) só as que estiverem
   erradas. Uma coleção de conteúdo estragada volta vazia e é repovoada por
   sincronizarConteudoNovo(); uma de gente é preservada item a item, jogando
   fora só o que não é um registro com id. */
function garantirEstruturaDb(alvo){
  const reparos = [];
  const lista = (chave, padrao) => {
    if(Array.isArray(alvo[chave])) return;
    reparos.push(chave);
    alvo[chave] = padrao === undefined ? [] : copiaProfunda(padrao);
  };
  const objeto = (chave) => {
    if(alvo[chave] && typeof alvo[chave] === "object" && !Array.isArray(alvo[chave])) return;
    reparos.push(chave);
    alvo[chave] = {};
  };
  // o que a turma produziu: preservado sempre que for uma lista
  lista("usuarios"); lista("respostas"); lista("favoritos"); lista("favoritosCartoes"); lista("questoesOcultas"); lista("sessoes");
  lista("resultadosSimulados"); lista("feedbacks"); lista("comentarios");
  lista("cargasProvas"); lista("filaNuvem"); lista("grupos");
  // conteúdo: se vier estragado, volta vazio e é repovoado pela pasta "dados/"
  lista("questoes"); lista("flashcards"); lista("simulados"); lista("livroOuro");
  objeto("revisoes"); objeto("revisoesFlashcards"); objeto("diasCartoes"); objeto("cartoesPorDia");
  objeto("sessoesEmAndamento"); objeto("sequenciasAno"); objeto("configGeral");
  if(!alvo.taxonomia || typeof alvo.taxonomia !== "object"){ reparos.push("taxonomia"); alvo.taxonomia = {areas:[],especialidades:[],assuntos:[]}; }
  ["areas","especialidades","assuntos"].forEach(k=>{
    if(!Array.isArray(alvo.taxonomia[k])){ reparos.push("taxonomia."+k); alvo.taxonomia[k] = []; }
  });
  // um "usuário" sem id não é cadastro de ninguém e quebraria todas as telas
  const antes = alvo.usuarios.length;
  alvo.usuarios = alvo.usuarios.filter(u => u && typeof u === "object" && u.id);
  if(alvo.usuarios.length !== antes) reparos.push("usuarios (" + (antes - alvo.usuarios.length) + " sem id)");
  // uma entrada nula no meio das turmas derrubava as migrações, que
  // desreferenciam cada grupo
  const gruposAntes = alvo.grupos.length;
  alvo.grupos = alvo.grupos.filter(g => g && typeof g === "object" && g.id);
  if(alvo.grupos.length !== gruposAntes) reparos.push("grupos (" + (gruposAntes - alvo.grupos.length) + " inválido(s))");
  // o grupo oficial é o calendário de quem não escolheu turma: sem ele, toda
  // tela de aluno fica sem bloco atual
  if(!alvo.grupoOficialId) alvo.grupoOficialId = "grupo-oficial";
  if(!alvo.grupos.some(g => g && g.id === alvo.grupoOficialId)){
    reparos.push("grupo oficial");
    alvo.grupos.push({ id: alvo.grupoOficialId, nome:"Calendário Oficial da Coordenação", criadoPor:"u-admin", oficial:true, publico:true, criadoEm: hojeISO(), anoFaculdade:null, deslocamento:0, blocoAtualIdManual:null });
  }
  if(!alvo.nuvem || typeof alvo.nuvem !== "object") alvo.nuvem = { contaId:null, ultimaSyncEm:null, marcas:{}, recusados:[], calendarioPendente:[] };
  if(!alvo.nuvem.marcas || typeof alvo.nuvem.marcas !== "object") alvo.nuvem.marcas = {};
  if(!Array.isArray(alvo.nuvem.recusados)) alvo.nuvem.recusados = [];
  if(!Array.isArray(alvo.nuvem.calendarioPendente)) alvo.nuvem.calendarioPendente = [];
  if(!Array.isArray(alvo.nuvem.globaisPendentes)) alvo.nuvem.globaisPendentes = [];
  if(!alvo.formatacaoAprovada || typeof alvo.formatacaoAprovada !== "object" || Array.isArray(alvo.formatacaoAprovada)) alvo.formatacaoAprovada = {};
  /* Os parâmetros do algoritmo têm valor padrão no CONFIG, então um campo
     torto aqui não precisa quebrar tela nenhuma — e quebrava: um
     `misturaBlocos` nulo derrubava Configurações Gerais inteira, e daí a
     coordenação não conseguia nem chegar ao botão de backup. */
  const cg = alvo.configGeral;
  const numero = (chave, padrao) => { if(typeof cg[chave] !== "number" || !isFinite(cg[chave])){ reparos.push("configGeral."+chave); cg[chave] = padrao; } };
  numero("metaMinimaQuestoesDia", CONFIG.metaMinimaQuestoesDia);
  numero("metaRecomendadaQuestoesDia", CONFIG.metaRecomendadaQuestoesDia);
  numero("metaCartoesDia", CONFIG.metaCartoesDia);
  if(!cg.misturaBlocos || typeof cg.misturaBlocos !== "object"){ reparos.push("configGeral.misturaBlocos"); cg.misturaBlocos = {...CONFIG.misturaBlocos}; }
  ["atual","revisaoPassados","previaFuturos"].forEach(k=>{
    if(typeof cg.misturaBlocos[k] !== "number") cg.misturaBlocos[k] = CONFIG.misturaBlocos[k];
  });
  if(!cg.pesosDificuldade || typeof cg.pesosDificuldade !== "object"){ reparos.push("configGeral.pesosDificuldade"); cg.pesosDificuldade = {...CONFIG.pesosDificuldade}; }
  ["taxaAcerto","especificidade","prevalencia"].forEach(k=>{
    if(typeof cg.pesosDificuldade[k] !== "number") cg.pesosDificuldade[k] = CONFIG.pesosDificuldade[k];
  });
  if(!Array.isArray(cg.rampaRevisaoInicio) || cg.rampaRevisaoInicio.length < 3){ reparos.push("configGeral.rampaRevisaoInicio"); cg.rampaRevisaoInicio = [...CONFIG.rampaRevisaoInicio]; }
  return reparos;
}

/* Guarda o banco salvo como estava, sob outra chave, antes de qualquer
   caminho que possa substituí-lo. É a última rede: mesmo que tudo o mais
   falhe, o texto original continua no navegador e dá para recuperar. */
function guardarCopiaDeResgate(bruto){
  if(!bruto) return;
  try{ localStorage.setItem(CHAVE_RESGATE, bruto); }
  catch(e){ /* sem espaço para a cópia: o banco em si continua intacto */ }
}

/* As sequências de exemplo com que cada ano nasceu, antes de o calendário
   real da faculdade chegar: quantos blocos tinham e o formato dos ids. É o
   que permite reconhecer "isto ainda é o exemplo" sem confundir com um ano
   que a coordenação editou — qualquer id diferente, ou outro número de
   blocos, e a sequência é tratada como trabalho de alguém.
     3º ano: b3-1 … b3-4 (virou o quadro de quatro turmas)
     4º ano: b4-1 … b4-5 (virou o quadro de dez turmas, A a J)
     5º ano: b5-1 … b5-4 (virou o quadro de doze estágios) */
const SEQUENCIAS_DE_EXEMPLO = {
  "3º ano": { blocos: 4, id: /^b3-[1-4]$/ },
  "4º ano": { blocos: 5, id: /^b4-[1-5]$/ },
  "5º ano": { blocos: 4, id: /^b5-[1-4]$/ },
};
function ehSequenciaDeExemplo(ano, seq){
  const ex = SEQUENCIAS_DE_EXEMPLO[ano];
  return !!(ex && Array.isArray(seq) && seq.length === ex.blocos && seq.every(b => ex.id.test((b && b.id) || "")));
}
/* Troca a sequência de exemplo de um ano pela real, se for o caso. Roda ao
   abrir a página e também depois de a nuvem descer o calendário: se alguém
   da coordenação salvou o exemplo lá antes desta versão, ele desceria de
   novo por cima do real. Turma com bloco fixado à mão num bloco de exemplo
   volta para a detecção por data — aquele id deixou de existir. Devolve se
   trocou. */
function trocarSequenciaDeExemplo(ano){
  if(!db.sequenciasAno || !SEED_SEQUENCIAS_ANO[ano]) return false;
  const atual = db.sequenciasAno[ano];
  if(!ehSequenciaDeExemplo(ano, atual)) return false;
  const idsAntigos = new Set(atual.map(b => b.id));
  db.sequenciasAno[ano] = copiaProfunda(SEED_SEQUENCIAS_ANO[ano]);
  (db.grupos || []).forEach(g => { if(g.blocoAtualIdManual && idsAntigos.has(g.blocoAtualIdManual)) g.blocoAtualIdManual = null; });
  return true;
}

function loadState(){
  let bruto = null;
  try{
    bruto = localStorage.getItem(CHAVE_STORAGE);
    if(!bruto){ db = dbPadrao(); saveState(); return; }
    const parsed = JSON.parse(bruto);
    /* Antes, um banco sem `usuarios` ou sem `questoes` era trocado pelo banco
       de demonstração. Mas "sem questões" é um banco que perdeu CONTEÚDO — o
       código repõe isso da pasta "dados/" — e trocá-lo levava junto os
       cadastros, que ninguém repõe. Agora só o que não dá para ler como
       objeto recomeça do zero, e mesmo assim com cópia de resgate. */
    if(!parsed || typeof parsed !== "object" || Array.isArray(parsed)){
      guardarCopiaDeResgate(bruto);
      db = dbPadrao(); saveState(); return;
    }
    db = parsed;
    garantirEstruturaDb(db);
    // migração leve: versões antigas (v1) tinham um único calendário global em
    // db.blocos. Se encontrarmos isso sem a coleção de grupos, embrulhamos
    // automaticamente num "grupo oficial" pra não perder o que já existia.
    if(!db.grupos && db.blocos){
      const grupoOficialId = "grupo-oficial";
      db.grupos = [{ id:grupoOficialId, nome:"Calendário Oficial da Coordenação", criadoPor:"u-admin", oficial:true, publico:true, criadoEm:hojeISO(), blocos: db.blocos, blocoAtualIdManual: db.blocoAtualIdManual||null }];
      db.grupoOficialId = grupoOficialId;
      delete db.blocos; delete db.blocoAtualIdManual;
      db.versao = 2;
      saveState();
    }
    // preenche campos novos que dados salvos mais antigos podem não ter,
    // sem precisar reiniciar tudo
    if(!db.feedbacks) db.feedbacks = [];
    if(!db.sessoes) db.sessoes = [];
    // Central de Provas entrou depois: quem já usava começa sem prova nenhuma
    // em andamento (as questões que já importou continuam no banco, intactas)
    if(!db.cargasProvas) db.cargasProvas = [];
    // sessão retomável entrou depois: quem já usava começa sem nenhuma guardada
    if(!db.sessoesEmAndamento) db.sessoesEmAndamento = {};
    /* Blocos deixaram de pertencer ao grupo e passaram a pertencer ao ANO da
       faculdade, com cada turma entrando na sequência por um bloco diferente.
       A migração não joga calendário nenhum fora: o calendário que cada grupo
       tinha vira a sequência do ano dele, se aquele ano ainda não tiver uma.
       Grupos que só copiavam o oficial (o caso normal) simplesmente passam a
       apontar para a sequência do ano, com deslocamento zero. */
    if(!db.sequenciasAno){
      db.sequenciasAno = copiaProfunda(SEED_SEQUENCIAS_ANO);
      const oficial = (db.grupos||[]).find(g=>g.oficial);
      // o calendário oficial salvo (se estiver customizado) continua valendo
      // como a sequência do ano padrão, para ninguém perder o que montou
      if(oficial && oficial.blocos && oficial.blocos.length){
        db.sequenciasAno[CONFIG.anoFaculdadePadrao] = copiaProfunda(oficial.blocos);
      }
      (db.grupos||[]).forEach(g=>{
        if(g.oficial){ g.anoFaculdade = g.anoFaculdade || null; }
        else if(!g.anoFaculdade){
          // a turma passa a ser do ano de quem a criou (ou do padrão)
          const dono = (db.usuarios||[]).find(u=>u.id===g.criadoPor);
          g.anoFaculdade = (dono && dono.anoFaculdade) || CONFIG.anoFaculdadePadrao;
          // calendário próprio e diferente do oficial vira a sequência daquele
          // ano, se ninguém ocupou o lugar ainda
          if(g.blocos && g.blocos.length && !SEED_SEQUENCIAS_ANO[g.anoFaculdade]){
            db.sequenciasAno[g.anoFaculdade] = copiaProfunda(g.blocos);
          }
        }
        if(g.deslocamento===undefined) g.deslocamento = 0;
        // a lista de blocos agora é derivada do ano, não guardada no grupo.
        // O calendário que o grupo tinha fica arquivado em vez de ser apagado:
        // se alguém tiver montado um calendário próprio, ele continua no banco
        // (e no backup) para a coordenação consultar antes de descartar.
        if(g.blocos && g.blocos.length) g.blocosArquivados = g.blocos;
        delete g.blocos;
      });
      saveState();
    }
    (db.grupos||[]).forEach(g=>{ if(g.deslocamento===undefined) g.deslocamento = 0; });
    /* Anos sem calendário próprio (hoje "Formado(a)"): a sequência que
       existia para eles sai de circulação, mas não é jogada fora — fica em
       db.sequenciasArquivadas, onde continua no banco e no backup, caso a
       coordenação queira consultar antes de descartar. Quem estava marcado
       como formado não perde nada: passa a acompanhar o calendário do ano da
       turma em que estiver (ver anoDeReferencia). */
    (CONFIG.anosSemCalendario||[]).forEach(ano=>{
      if(db.sequenciasAno && db.sequenciasAno[ano]){
        if(!db.sequenciasArquivadas) db.sequenciasArquivadas = {};
        db.sequenciasArquivadas[ano] = db.sequenciasAno[ano];
        delete db.sequenciasAno[ano];
      }
    });
    /* 3º, 4º e 5º ano nasceram com sequências de exemplo, antes de o
       calendário real da faculdade existir. Quem ainda tem o exemplo salvo
       recebe o de verdade; quem já editou aquele ano fica com o que montou
       (ver trocarSequenciaDeExemplo). */
    Object.keys(SEQUENCIAS_DE_EXEMPLO).forEach(trocarSequenciaDeExemplo);
    // meta diária de flashcards: quem já usava recebe a recomendação padrão, e
    // o diário de dias com cartão é semeado com o que dá para saber do que já
    // existe (a última data de cada cartão) — a sequência começa a valer daí
    if(db.configGeral && !db.configGeral.metaCartoesDia) db.configGeral.metaCartoesDia = CONFIG.metaCartoesDia;
    if(!db.diasCartoes){
      db.diasCartoes = {};
      Object.keys(db.revisoesFlashcards || {}).forEach(uid=>{
        const dias = new Set(Object.values(db.revisoesFlashcards[uid]).map(r=>r.ultimaData).filter(Boolean));
        if(dias.size) db.diasCartoes[uid] = [...dias].sort();
      });
    }
    // flashcards entraram depois: quem já usava a plataforma recebe as
    // coleções vazias aqui e os cartões de semente logo abaixo, em
    // sincronizarConteudoNovo(), sem perder nada do que já tinha
    if(!db.flashcards) db.flashcards = [];
    if(!db.revisoesFlashcards) db.revisoesFlashcards = {};
    // favoritar cartão veio depois de favoritar questão: a coleção nasce vazia
    if(!Array.isArray(db.favoritosCartoes)) db.favoritosCartoes = [];
    // esconder questão veio depois: ninguém tem nenhuma escondida ainda
    if(!Array.isArray(db.questoesOcultas)) db.questoesOcultas = [];
    if(!db.cartoesPorDia) db.cartoesPorDia = {};
    // Cartão agora tem dono: os que têm usuarioId são pessoais (caderno do
    // aluno) e os sem dono são material da equipe. Todo cartão salvo antes
    // desta versão foi escrito por professor ou admin, então continua sem
    // dono — que é exatamente o comportamento certo. A linha abaixo só
    // normaliza o campo, para não haver "undefined" espalhado no banco.
    db.flashcards.forEach(c=>{ if(c.usuarioId===undefined) c.usuarioId = null; });
    // "Internato" deixou de ser uma opção de ano da faculdade (virou 5º/6º
    // ano). Quem já estava cadastrado assim é movido para 6º ano, que é onde
    // está a maior parte de quem se declarava "internato" perto da prova.
    db.usuarios.forEach(x=>{ if(x.anoFaculdade==="Internato") x.anoFaculdade = "6º ano"; });
    if(db.aulas) delete db.aulas; // a área de aulas foi removida da plataforma
    if(db.configGeral && !db.configGeral.rampaRevisaoInicio) db.configGeral.rampaRevisaoInicio = [...CONFIG.rampaRevisaoInicio];
    // realinha área/especialidade das questões ao assunto de cada uma (o
    // desalinhamento surgia quando um assunto era criado ou movido depois)
    corrigirTaxonomiaAutomaticamente();
    sincronizarConteudoNovo();
    // níveis de administrador: bancos antigos não tinham esse campo
    db.usuarios.forEach(x=>{ if(x.papel==="admin" && !x.nivelAdmin) x.nivelAdmin = (x.id==="u-admin" ? "master" : "coordenacao"); });
    // a plataforma passou a se chamar "Esc": atualiza os e-mails das contas
    // de demonstração já salvas, pra continuarem batendo com a tela de entrada
    db.usuarios.forEach(x=>{ if(x.email && x.email.indexOf("@medbloco.demo")>=0) x.email = x.email.replace("@medbloco.demo","@esc.demo"); });
    // nuvem: a fila de envio e as marcas de "até onde já baixei" nascem
    // vazias em quem ainda não tinha conta (ver seção 2-C)
    if(!Array.isArray(db.filaNuvem)) db.filaNuvem = [];
    if(!db.nuvem) db.nuvem = { contaId:null, ultimaSyncEm:null, marcas:{}, recusados:[], calendarioPendente:[] };
    if(!db.nuvem.marcas) db.nuvem.marcas = {};
    if(!Array.isArray(db.nuvem.recusados)) db.nuvem.recusados = [];
    if(!Array.isArray(db.nuvem.calendarioPendente)) db.nuvem.calendarioPendente = [];
    // Livro de Ouro e formatação aprovada passaram a subir (seção 2-C)
    if(!Array.isArray(db.nuvem.globaisPendentes)) db.nuvem.globaisPendentes = [];
    if(!db.formatacaoAprovada || typeof db.formatacaoAprovada !== "object") db.formatacaoAprovada = {};
  }catch(e){
    /* Uma migração que tropeça NÃO é motivo para apagar a turma. Antes, um
       único campo inesperado no banco salvo trocava tudo pelo banco de
       demonstração, em silêncio — e cadastros, respostas e questões enviadas
       iam junto, sem volta. Agora o banco lido é mantido, consertado no que
       dá e usado assim mesmo; o conteúdo que faltar volta pela pasta
       "dados/", em sincronizarConteudoNovo(). Só se nem isso for possível é
       que se recomeça, e sempre com cópia de resgate. */
    console.error("Falha no meio da leitura dos dados salvos — o que já foi lido está sendo preservado.", e);
    guardarCopiaDeResgate(bruto);
    recuperarBanco(bruto, e);
  }
}

/* A recuperação depois de um tropeço. A regra que organiza tudo aqui é uma
   só: CADA PASSO PODE FALHAR SOZINHO, e falhar não pode custar as pessoas.
   Por isso os passos que mexem em conteúdo (taxonomia, reposição a partir da
   pasta "dados/") rodam cada um no seu próprio try — se um deles estourar, o
   que se perde é conteúdo, que a pasta repõe na próxima abertura, e não o
   cadastro de ninguém.

   Recomeçar do zero ficou reservado ao único caso em que não há nada a
   salvar: nenhum usuário legível no banco. */
function recuperarBanco(bruto, erroOriginal){
  if(!db || typeof db !== "object" || Array.isArray(db)){
    try{ db = JSON.parse(bruto); }catch(e){ db = null; }
  }
  if(!db || typeof db !== "object" || Array.isArray(db)){
    db = dbPadrao();
    tentar(saveState);
    avisarSobreBancoIlegivel();
    return;
  }
  const reparos = tentar(()=>garantirEstruturaDb(db)) || [];
  const pessoas = Array.isArray(db.usuarios) ? db.usuarios.length : 0;
  if(!pessoas){
    // nem um cadastro legível: aí sim não há o que preservar
    db = dbPadrao();
    tentar(saveState);
    avisarSobreBancoIlegivel();
    return;
  }
  tentar(corrigirTaxonomiaAutomaticamente);
  tentar(sincronizarConteudoNovo);
  tentar(saveState);
  avisarSobreReparoDoBanco(reparos, erroOriginal);
}
/* Roda uma etapa da recuperação sem deixar que ela derrube as outras. */
function tentar(fn){
  try{ return fn(); }
  catch(e){ console.error("Etapa da recuperação falhou (seguindo adiante):", e); return null; }
}

/* O conserto não pode ser silencioso: quem cuida da plataforma precisa saber
   que algo veio torto, para conferir e tirar um backup antes de continuar. */
function avisarSobreReparoDoBanco(reparos, erro){
  if(typeof window === "undefined") return;
  setTimeout(()=>{
    const quantos = (db.usuarios||[]).length;
    toast("Os dados salvos vieram com um defeito e foram consertados — nenhum cadastro foi apagado ("
      + quantos + " no banco). Vale exportar um backup. Detalhe técnico no console: " + (erro && erro.message ? erro.message : ""), "err");
    if(reparos && reparos.length) console.warn("Coleções reparadas:", reparos.join(", "));
  }, 1200);
}
function avisarSobreBancoIlegivel(){
  if(typeof window === "undefined") return;
  setTimeout(()=>{
    toast("Não foi possível ler os dados salvos neste navegador. Uma cópia do arquivo original ficou guardada — chame quem cuida da plataforma antes de cadastrar de novo.", "err");
  }, 1200);
}

/* Recuperação manual da cópia de resgate, para quem cuida da plataforma
   chamar pelo console (ou pelo botão em Configurações). Não roda sozinho:
   restaurar por conta própria um banco que acabou de dar problema pode
   sobrescrever algo que ainda estava bom. */
function bancoDeResgateDisponivel(){
  try{ return !!localStorage.getItem(CHAVE_RESGATE); }catch(e){ return false; }
}
function resumoDoResgate(){
  try{
    const d = JSON.parse(localStorage.getItem(CHAVE_RESGATE) || "null");
    if(!d) return null;
    return {
      usuarios: (d.usuarios||[]).length,
      respostas: (d.respostas||[]).length,
      questoes: (d.questoes||[]).length,
    };
  }catch(e){ return null; }
}
function restaurarBancoDeResgate(){
  if(!podeMexerEmBackup()) return;
  const bruto = localStorage.getItem(CHAVE_RESGATE);
  if(!bruto){ toast("Não há cópia de resgate neste navegador.", "err"); return; }
  const r = resumoDoResgate();
  abrirModal(`<div class="modal-header"><h3>Restaurar a cópia de resgate</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg("x")}</button></div>
    <p class="text-sm">Esta é a cópia do banco como ele estava antes de a plataforma precisar consertá-lo${r?`: <strong>${r.usuarios} cadastro(s)</strong>, ${r.respostas} resposta(s) e ${r.questoes} questão(ões)`:""}. Restaurar substitui os dados atuais deste navegador por ela.</p>
    <p class="text-sm muted mt-1">Exporte um backup do estado atual antes, se ainda não exportou — a restauração não pode ser desfeita.</p>
    <div class="flex gap-1 mt-2"><button class="btn btn-danger" onclick="restaurarResgateConfirmado()">Restaurar a cópia</button><button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button></div>`);
}
function restaurarResgateConfirmado(){
  const bruto = localStorage.getItem(CHAVE_RESGATE);
  // sem esta checagem, gravar um "null" por cima do banco bom trocaria os
  // dados de todo mundo por nada — exatamente o que esta tela existe para
  // impedir
  if(!bruto){ toast("Não há cópia de resgate neste navegador.", "err"); return; }
  try{
    localStorage.setItem(CHAVE_STORAGE, bruto);
    fecharModal();
    location.reload();
  }catch(e){ toast("Não foi possível restaurar a cópia de resgate.", "err"); }
}

/* Quando novas áreas, especialidades, assuntos ou questões são acrescentadas
   ao código (como o pacote de Técnica Operatória, Cardiologia, Infectologia e
   Oftalmologia), quem já usava a plataforma tem um banco salvo no navegador
   que não conhece esse conteúdo. Esta função acrescenta ao banco salvo apenas
   o que falta, comparando pelo id — sem apagar nem sobrescrever nada do que o
   usuário já produziu (respostas, favoritos, questões próprias, edições). */
const CAMPOS_QUE_O_CONTEUDO_COMPLETA = ["numeroNaProva", "imagemUrl", "imagemLegenda", "imagemPendente", "referencias"];
function sincronizarConteudoNovo(){
  let novos = 0;
  if(!db.taxonomia) return;
  (SEED_TAXONOMIA.areas||[]).forEach(a=>{ if(!db.taxonomia.areas.some(x=>x.id===a.id)){ db.taxonomia.areas.push(copiaProfunda(a)); novos++; } });
  (SEED_TAXONOMIA.especialidades||[]).forEach(e=>{ if(!db.taxonomia.especialidades.some(x=>x.id===e.id)){ db.taxonomia.especialidades.push(copiaProfunda(e)); novos++; } });
  (SEED_TAXONOMIA.assuntos||[]).forEach(a=>{ if(!db.taxonomia.assuntos.some(x=>x.id===a.id)){ db.taxonomia.assuntos.push(copiaProfunda(a)); novos++; } });
  SEED_QUESTOES.forEach(q=>{ if(!db.questoes.some(x=>x.id===q.id)){ db.questoes.push(copiaProfunda(q)); novos++; } });
  // Campos que o conteúdo ganhou DEPOIS de a questão já estar salva no
  // navegador — o número dela na prova, a imagem que falta. Só se preenche o
  // que está vazio: uma questão que a equipe editou aqui fica como está.
  const porId = new Map(db.questoes.map(x=>[x.id, x]));
  // A instituição das questões-semente AUTORAIS segue o arquivo: até 24/09,
  // trinta delas diziam "UNIFESP-EPM" e se misturavam à prova real daquele
  // ano. Só vale para questão da semente que não é real — nada que a equipe
  // publicou é tocado.
  SEED_QUESTOES.forEach(q=>{
    const salva = porId.get(q.id);
    if(salva && !q.real && !salva.real && salva.criadoPor==="seed" && salva.banca!==q.banca){ salva.banca = q.banca; novos++; }
  });
  SEED_QUESTOES.forEach(q=>{
    const salva = porId.get(q.id); if(!salva) return;
    CAMPOS_QUE_O_CONTEUDO_COMPLETA.forEach(c=>{
      if(q[c] !== undefined && q[c] !== "" && (salva[c] === undefined || salva[c] === null || salva[c] === "")){ salva[c] = copiaProfunda(q[c]); novos++; }
    });
  });
  SEED_USUARIOS.forEach(u=>{ if(!db.usuarios.some(x=>x.id===u.id)){ db.usuarios.push(copiaProfunda(u)); novos++; } });
  if(!db.flashcards) db.flashcards = [];
  SEED_FLASHCARDS.forEach(c=>{ if(!db.flashcards.some(x=>x.id===c.id)){ db.flashcards.push(copiaProfunda(c)); novos++; } });
  if(!db.livroOuro) { db.livroOuro = copiaProfunda(SEED_LIVRO_OURO); novos++; }
  // um ano da faculdade que ganhou calendário no código e ainda não existe no
  // banco salvo entra aqui — sem tocar nos anos que a coordenação já editou
  if(db.sequenciasAno){
    Object.keys(SEED_SEQUENCIAS_ANO||{}).forEach(ano=>{
      if(!temCalendarioProprio(ano)) return;
      if(!db.sequenciasAno[ano] || !db.sequenciasAno[ano].length){
        db.sequenciasAno[ano] = copiaProfunda(SEED_SEQUENCIAS_ANO[ano]); novos++;
      }
    });
  }
  if(novos) saveState();
}

/* Tamanho aproximado do banco no navegador. Passou a importar de verdade
   quando as questões ganharam imagens embutidas: o limite do localStorage
   costuma ficar entre 5 e 10 MB. */
function tamanhoBancoKb(){
  try{ return Math.round(JSON.stringify(db).length/1024); }catch(e){ return 0; }
}
let _geracaoDb = 0; // incrementado a cada saveState(); invalida caches derivados de db (ver mapaPrevalenciasAssuntos)
/* Devolve `true` se gravou mesmo. Quem cria um cadastro PRECISA olhar esse
   retorno: antes, o armazenamento cheio fazia a tela dizer "cadastro
   enviado", a pessoa ir embora e o cadastro não existir no recarregamento —
   um dado perdido que ninguém sabia que tinha perdido. */
function saveState(){
  _geracaoDb++;
  let gravou = true;
  try{
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(db));
  }catch(e){
    gravou = false;
    console.error("Falha ao salvar dados", e);
    // um toast some sozinho e some junto com o aviso; isto aqui é perda de
    // dado, e precisa parar a pessoa
    if(typeof abrirModal === "function"){
      abrirModal(`<div class="modal-header"><h3>${iconeSvg("alert")} Não foi possível salvar</h3></div>
        <p class="text-sm">O armazenamento deste navegador está cheio ou bloqueado, e <strong>o que você acabou de fazer não foi gravado</strong>. Ao recarregar a página, isso se perde.</p>
        <p class="text-sm muted mt-1">O banco ocupa ${tamanhoBancoKb()} KB. O que mais pesa são imagens embutidas em questões. Caminhos: exportar um backup agora (se você for administrador máster), liberar espaço do navegador, ou abrir a plataforma numa janela normal — janelas anônimas costumam bloquear o armazenamento.</p>
        <div class="flex gap-1 mt-2">${podeAdmin("backup") ? '<button class="btn btn-primary" onclick="exportarBackup()">Exportar backup agora</button>' : ""}<button class="btn btn-secondary" onclick="fecharModal()">Entendi</button></div>`);
    }else{
      toast("Não foi possível salvar os dados neste navegador (armazenamento cheio ou bloqueado).", "err");
    }
  }
  // com a nuvem ligada, o que acabou de ser salvo aqui sobe alguns segundos
  // depois, em bloco (ver nuvemAgendarSync, na seção 2-C). Sem nuvem, esta
  // linha não faz nada.
  if(typeof nuvemAgendarSync === "function") nuvemAgendarSync();
  return gravou;
}

function confirmarReiniciarDemo(){
  if(!podeMexerEmBackup()) return;
  abrirModal(`
    <div class="modal-header"><h3>Reiniciar dados de demonstração</h3><button class="icon-btn" onclick="fecharModal()">${iconeSvg('x')}</button></div>
    <p>Isso vai apagar tudo o que foi feito neste navegador (respostas, cadastros, favoritos, questões adicionadas) e voltar ao ponto de partida da demonstração. Essa ação não pode ser desfeita.</p>
    <div class="flex gap-1 mt-3">
      <button class="btn btn-danger" onclick="reiniciarDemoConfirmado()">Sim, reiniciar tudo</button>
      <button class="btn btn-secondary" onclick="fecharModal()">Cancelar</button>
    </div>`);
}
function reiniciarDemoConfirmado(){
  localStorage.removeItem(CHAVE_STORAGE);
  location.reload();
}

/* As três operações de backup mexem nos dados de TODOS os usuários deste
   navegador, por isso são restritas ao administrador máster — a checagem
   fica aqui na função, e não só no botão, para valer mesmo se alguém chamar
   pelo console. */
function podeMexerEmBackup(){
  if(podeAdmin("backup")) return true;
  toast("Backup, importação e reinício de dados são exclusivos do administrador máster.", "err");
  return false;
}
function exportarBackup(){
  if(!podeMexerEmBackup()) return;
  db.ultimoBackupEm = hojeISO();
  const blob = new Blob([JSON.stringify(db, null, 2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "esc-backup-"+hojeISO()+".json";
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  saveState();
  toast("Backup baixado.");
}

function importarBackupArquivo(inputEl){
  if(!podeMexerEmBackup()) return;
  const arquivo = inputEl.files && inputEl.files[0];
  if(!arquivo) return;
  const leitor = new FileReader();
  leitor.onload = function(e){
    try{
      const parsed = JSON.parse(e.target.result);
      if(!parsed.usuarios || !parsed.questoes){ toast("Arquivo não parece ser um backup válido do Esc.", "err"); return; }
      db = parsed; saveState();
      toast("Backup importado com sucesso.");
      setTimeout(()=>location.reload(), 900);
    }catch(err){ toast("Não foi possível ler este arquivo como backup.", "err"); }
  };
  leitor.readAsText(arquivo);
}
