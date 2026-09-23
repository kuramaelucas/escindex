/* ==========================================================================
   CALENDÁRIO DE BLOCOS — a ordem em que a matéria é estudada
   ==========================================================================
   `blocos` é o calendário de referência (o do 6º ano) e `sequenciasAno` é a
   sequência de cada ano da faculdade, do 3º ao 6º. A regra do rodízio entre
   turmas está explicada no index.html, junto de SEED_BLOCOS; aqui ficam só
   as datas, os nomes e a letra da turma que começa em cada bloco
   (`grupoRodizio` — ver o 3º ano abaixo). A coordenação também edita isto
   pela plataforma, em Admin > Blocos de Estudo, inclusive a virada de ano.

   "Formado(a)" não tem sequência própria de propósito: quem já se formou não
   segue calendário de faculdade nenhum. Continua podendo entrar num grupo, e
   aí acompanha o calendário do ano daquela turma.

   Este arquivo é CONTEÚDO, não código: ele só entrega dados para a
   plataforma. Quem carrega é a linha <script src="dados/calendario.js"></script>
   do index.html, que roda antes do código. Ver dados/LEIA-ME.md.
   ========================================================================== */
/* A lista do 6º ano aparece em dois lugares — é o calendário de referência
   E a sequência daquele ano —, então ela ganha um nome aqui e é usada nos
   dois, para não haver duas cópias que possam divergir. O embrulho
   (function(){ ... })() existe só para esse nome não escapar para o resto
   da plataforma; pode ignorá-lo ao editar as datas. */
(function(){
const BLOCOS_6_ANO = [
    { id: "bloco-1", ordem: 1, nome: "Cardiologia & Pneumologia", dataInicio: "2026-02-02", dataFim: "2026-03-08", especialidadeIds: ["esp-cardio", "esp-pneumo"] },
    { id: "bloco-2", ordem: 2, nome: "Gastroenterologia & Nefrologia", dataInicio: "2026-03-09", dataFim: "2026-04-12", especialidadeIds: ["esp-gastro", "esp-nefro"] },
    { id: "bloco-3", ordem: 3, nome: "Endocrinologia & Infectologia", dataInicio: "2026-04-13", dataFim: "2026-05-17", especialidadeIds: ["esp-endocrino", "esp-infecto"] },
    { id: "bloco-4", ordem: 4, nome: "Cirurgia Geral", dataInicio: "2026-05-18", dataFim: "2026-06-28", especialidadeIds: ["esp-abdagudo", "esp-trauma", "esp-perioperatorio", "esp-cirurgiaonco"] },
    { id: "bloco-5", ordem: 5, nome: "Pediatria", dataInicio: "2026-06-29", dataFim: "2026-08-09", especialidadeIds: ["esp-neonato", "esp-crescdesenv", "esp-infectoped", "esp-emergped"] },
    { id: "bloco-6", ordem: 6, nome: "Obstetrícia", dataInicio: "2026-08-10", dataFim: "2026-09-20", especialidadeIds: ["esp-obstetricia"] },
    { id: "bloco-7", ordem: 7, nome: "Ginecologia, Planejamento Familiar & Oncologia Ginecológica", dataInicio: "2026-09-21", dataFim: "2026-10-25", especialidadeIds: ["esp-ginecologia", "esp-planfamiliar", "esp-oncogineco"] },
    { id: "bloco-8", ordem: 8, nome: "Medicina Preventiva e Social + Revisão Final", dataInicio: "2026-10-26", dataFim: "2026-12-20", especialidadeIds: ["esp-epidemio", "esp-sus", "esp-bioetica", "esp-saudefamilia"] },
];

window.EscDados.registrarCalendario("calendario", {
  blocos: BLOCOS_6_ANO,
  sequenciasAno: {
    /* 3º ANO — calendário real da faculdade (rodízio de quatro turmas).
       As quatro janelas de data abaixo são as do ano letivo de 2026; cada
       turma passa pelos mesmos quatro blocos, mudando só por qual deles
       entra. O campo `grupoRodizio` diz QUAL TURMA COMEÇA naquele bloco —
       é o que faz a plataforma oferecer "Grupo A/B/C/D" em vez de pedir um
       número de deslocamento:

         janela            Grupo A            Grupo B      Grupo C      Grupo D
         20/07 a 21/08     TOCE/Semio Mulher  Psiquiatria  Oftalmo      Cardio
         24/08 a 02/10     Cardio             TOCE         Psiquiatria  Oftalmo
         05/10 a 06/11     Oftalmo            Cardio       TOCE         Psiquiatria
         09/11 a 04/12     Psiquiatria        Oftalmo      Cardio       TOCE

       VIRADA DE ANO: em 2027 as datas não são estas. Não é preciso reescrever
       o arquivo — a coordenação abre Admin > Blocos de Estudo > "Virada de ano
       letivo", informa a data de início do primeiro bloco e todas as janelas
       andam juntas, preservando a duração de cada uma e os intervalos entre
       elas. Depois, se algum bloco precisar de ajuste fino, basta editá-lo. */
    "3º ano": [
      { id:"b3-toce",  ordem:1, nome:"TOCE & Semiologia da Mulher", grupoRodizio:"A", dataInicio:"2026-07-20", dataFim:"2026-08-21", especialidadeIds:["esp-toce","esp-ginecologia","esp-obstetricia"] },
      { id:"b3-cardio", ordem:2, nome:"Cardiocirculatório", grupoRodizio:"D", dataInicio:"2026-08-24", dataFim:"2026-10-02", especialidadeIds:["esp-cardio","esp-cirvascular"] },
      { id:"b3-oftalmo", ordem:3, nome:"Oftalmologia, Infectologia & Medicina Baseada em Evidências", grupoRodizio:"C", dataInicio:"2026-10-05", dataFim:"2026-11-06", especialidadeIds:["esp-oftalmo","esp-infecto","esp-epidemio"] },
      { id:"b3-psiq",  ordem:4, nome:"Psiquiatria & Vigilância em Saúde", grupoRodizio:"B", dataInicio:"2026-11-09", dataFim:"2026-12-04", especialidadeIds:["esp-psiquiatria","esp-sus","esp-saudefamilia"] },
    ],
    /* 4º ANO — calendário real da faculdade (rodízio de dez turmas).
       Transcrito do quadro "BLOCO / PERÍODO" do 4º ano: dez blocos, dez
       janelas e dez turmas (A a J). Aqui o rodízio É um ciclo, como no 3º
       ano: cada turma desce o quadro um bloco por janela e, no fim da
       lista, volta ao primeiro. Por isso basta `grupoRodizio` (a turma que
       começa em cada bloco) — sem `turmasPorJanela`. O quadro, célula a
       célula:

         bloco        26/01 26/02 27/03 24/04 22/05 19/06 31/08 02/10 06/11 04/12
         URI/ANEST      A     B     C     D     E     F     G     H     I     J
         TEG            J     A     B     C     D     E     F     G     H     I
         RESP           I     J     A     B     C     D     E     F     G     H
         NERV           H     I     J     A     B     C     D     E     F     G
         LOCOM          G     H     I     J     A     B     C     D     E     F
         DIGEST         F     G     H     I     J     A     B     C     D     E
         ORL CP         E     F     G     H     I     J     A     B     C     D
         ENDOC/MU       D     E     F     G     H     I     J     A     B     C
         CM HEMATO      C     D     E     F     G     H     I     J     A     B
         MULHER CCA     B     C     D     E     F     G     H     I     J     A

       AS DATAS. O quadro traz uma data por coluna, e ela é o FIM da janela:
       quase todas caem numa sexta-feira e a última (04/12) fecha o ano, como
       no 3º e no 5º ano. O início de cada janela é o dia útil seguinte ao fim
       da anterior. Duas pontas o quadro não diz, e ficaram assim até a
       coordenação confirmar (Admin > Blocos de Estudo edita):
         - a primeira janela começa em 05/01, junto com o 5º ano;
         - depois das férias de julho, a sétima janela começa em 20/07, junto
           com a volta do 3º ano.

       AS ESPECIALIDADES. Cada sigla foi traduzida para a taxonomia da
       plataforma. Onde a taxonomia não tem a matéria com esse nome (Cirurgia
       Plástica, Cirurgia de Cabeça e Pescoço, Medicina de Urgência, Clínica
       Médica geral), entrou a especialidade mais próxima — ver o comentário
       de cada bloco. */
    "4º ano": [
      { id:"b4-uri", ordem:1, nome:"URI/ANEST — Nefrologia, Urologia & Anestesiologia", grupoRodizio:"A", dataInicio:"2026-01-05", dataFim:"2026-01-26",
        especialidadeIds:["esp-nefro","esp-urologia","esp-anestesio"] },
      /* Cirurgia Plástica não é especialidade na taxonomia: queimadura mora
         em Trauma e cicatrização em TOCE, que já têm bloco próprio no 3º
         ano. Fica a Dermatologia inteira. */
      { id:"b4-teg", ordem:2, nome:"TEG — Dermatologia & Cirurgia Plástica", grupoRodizio:"J", dataInicio:"2026-01-27", dataFim:"2026-02-26",
        especialidadeIds:["esp-dermato"] },
      { id:"b4-resp", ordem:3, nome:"RESP — Pneumologia & Cirurgia Torácica", grupoRodizio:"I", dataInicio:"2026-02-27", dataFim:"2026-03-27",
        especialidadeIds:["esp-pneumo","esp-cirtoracica"] },
      { id:"b4-nerv", ordem:4, nome:"NERV — Neurologia & Neurocirurgia", grupoRodizio:"H", dataInicio:"2026-03-30", dataFim:"2026-04-24",
        especialidadeIds:["esp-neuro","esp-neurocirurgia"] },
      { id:"b4-locom", ordem:5, nome:"LOCOM — Reumatologia & Ortopedia", grupoRodizio:"G", dataInicio:"2026-04-27", dataFim:"2026-05-22",
        especialidadeIds:["esp-reumato","esp-ortopedia"] },
      /* gastrocirurgia = abdome agudo (vias biliares, hérnias, bariátrica…)
         + os tumores do aparelho digestivo, que estão em Cirurgia Oncológica */
      { id:"b4-digest", ordem:6, nome:"DIGEST — Gastroclínica & Gastrocirurgia", grupoRodizio:"F", dataInicio:"2026-05-25", dataFim:"2026-06-19",
        especialidadeIds:["esp-gastro","esp-abdagudo","esp-cirurgiaonco"] },
      /* Cirurgia de Cabeça e Pescoço não é especialidade na taxonomia; a
         Otorrino é a que tem as questões da região */
      { id:"b4-orl", ordem:7, nome:"ORL CP — Otorrinolaringologia & Cirurgia de Cabeça e Pescoço", grupoRodizio:"E", dataInicio:"2026-07-20", dataFim:"2026-08-31",
        especialidadeIds:["esp-orl"] },
      /* Medicina Baseada em Evidências = Epidemiologia (como no 3º ano);
         Medicina de Urgência não existe na taxonomia, e o que mais se
         aproxima é Trauma (ATLS, queimados, trauma torácico e abdominal) */
      { id:"b4-endoc", ordem:8, nome:"ENDOC/MU — Endocrinologia, Medicina Baseada em Evidências & Medicina de Urgência", grupoRodizio:"D", dataInicio:"2026-09-01", dataFim:"2026-10-02",
        especialidadeIds:["esp-endocrino","esp-epidemio","esp-trauma"] },
      /* Clínica Médica geral: as grandes frentes clínicas que nenhum outro
         bloco do 4º ano cobre (Cardio e Infecto), mais a Hematologia */
      { id:"b4-cmhemato", ordem:9, nome:"CM HEMATO — Clínica Médica & Hematologia", grupoRodizio:"C", dataInicio:"2026-10-05", dataFim:"2026-11-06",
        especialidadeIds:["esp-hemato","esp-cardio","esp-infecto"] },
      { id:"b4-mulher", ordem:10, nome:"MULHER CCA — Saúde da Mulher, da Criança & Medicina Preventiva", grupoRodizio:"B", dataInicio:"2026-11-09", dataFim:"2026-12-04",
        especialidadeIds:["esp-ginecologia","esp-obstetricia","esp-planfamiliar","esp-crescdesenv","esp-neonato","esp-saudefamilia","esp-sus"] },
    ],
    /* 5º ANO — calendário real da faculdade (rodízio de doze turmas).
       Transcrito do quadro "CURSO MÉDICO – 5ª SÉRIE – 2026": doze janelas de
       data, doze estágios e doze turmas (A a L). Cada turma passa pelos doze
       estágios ao longo do ano; no primeiro semestre as turmas A–F estão nos
       seis primeiros estágios e as G–L nos seis últimos, e no segundo
       semestre elas trocam de metade.

       POR QUE AQUI TEM `turmasPorJanela` E O 3º ANO NÃO. No 3º ano o rodízio
       é um ciclo: quem começa no segundo bloco segue para o terceiro, o
       quarto, e volta ao primeiro. No 5º ano NÃO é — o quadro da faculdade
       emparelha os estágios dois a dois (quem faz Clínica Cirúrgica 1 na
       primeira janela faz a 2 na segunda, e vice-versa), e nenhuma conta a
       partir do índice reproduz isso. Então cada estágio carrega a LINHA do
       quadro impresso: `turmasPorJanela[i]` é a turma que está neste estágio
       na janela i. É literalmente a linha do papel, na mesma ordem, para
       conferir célula a célula — e é o que a plataforma lê para dizer a cada
       aluno em que estágio ele está hoje.

       Janelas de 2026, na ordem: 05/01, 29/01, 02/03, 26/03, 27/04, 25/05,
       22/06, 20/07, 13/08, 14/09, 08/10 e 09/11. A virada de ano letivo
       (Admin > Blocos de Estudo) desloca todas de uma vez, preservando a
       duração de cada uma e os intervalos entre elas. */
    "5º ano": [
      { id:"b5-atencao-basica", ordem:1, nome:"O Cuidado na Atenção Básica", dataInicio:"2026-01-05", dataFim:"2026-01-28",
        turmasPorJanela:["A","B","E","F","C","D","G","H","K","L","I","J"],
        especialidadeIds:["esp-saudefamilia","esp-sus","esp-epidemio"] },
      { id:"b5-mfc", ordem:2, nome:"Medicina de Família e Comunidade", dataInicio:"2026-01-29", dataFim:"2026-03-01",
        turmasPorJanela:["B","A","F","E","D","C","H","G","L","K","J","I"],
        especialidadeIds:["esp-saudefamilia","esp-sus","esp-bioetica"] },
      { id:"b5-cirurgia-1", ordem:3, nome:"Clínica Cirúrgica 1", dataInicio:"2026-03-02", dataFim:"2026-03-25",
        turmasPorJanela:["C","D","A","B","E","F","I","J","G","H","K","L"],
        especialidadeIds:["esp-abdagudo","esp-perioperatorio","esp-toce","esp-cirurgiaonco"] },
      { id:"b5-cirurgia-2", ordem:4, nome:"Clínica Cirúrgica 2", dataInicio:"2026-03-26", dataFim:"2026-04-26",
        turmasPorJanela:["D","C","B","A","F","E","J","I","H","G","L","K"],
        especialidadeIds:["esp-trauma","esp-cirvascular","esp-cirtoracica","esp-urologia","esp-ortopedia"] },
      { id:"b5-crianca", ordem:5, nome:"Atenção Integral à Saúde da Criança e do Adolescente", dataInicio:"2026-04-27", dataFim:"2026-05-24",
        turmasPorJanela:["E","F","C","D","A","B","K","L","I","J","G","H"],
        especialidadeIds:["esp-neonato","esp-crescdesenv","esp-infectoped","esp-emergped"] },
      { id:"b5-livre", ordem:6, nome:"Livre Escolha", dataInicio:"2026-05-25", dataFim:"2026-06-21",
        turmasPorJanela:["F","E","D","C","B","A","L","K","J","I","H","G"],
        /* estágio eletivo: cada aluno escolhe o seu. Como a plataforma precisa
           de alguma matéria para montar a sessão, entram aqui as grandes
           frentes da prova — quem já sabe o que vai cursar ajusta o estágio em
           Admin > Blocos de Estudo, ou monta a própria lista em Estudar. */
        especialidadeIds:["esp-cardio","esp-pneumo","esp-gastro","esp-endocrino","esp-nefro","esp-infecto"] },
      { id:"b5-gineco-enf", ordem:7, nome:"Ginecologia — Enfermaria", dataInicio:"2026-06-22", dataFim:"2026-07-19",
        turmasPorJanela:["G","L","K","J","I","H","A","F","E","D","C","B"],
        especialidadeIds:["esp-ginecologia","esp-oncogineco"] },
      { id:"b5-gineco-obst", ordem:8, nome:"Ginecologia e Obstetrícia", dataInicio:"2026-07-20", dataFim:"2026-08-12",
        turmasPorJanela:["H","G","L","K","J","I","B","A","F","E","D","C"],
        especialidadeIds:["esp-obstetricia","esp-planfamiliar","esp-ginecologia"] },
      { id:"b5-psiq-oftalmo", ordem:9, nome:"Psiquiatria e Oftalmologia", dataInicio:"2026-08-13", dataFim:"2026-09-04",
        turmasPorJanela:["I","H","G","L","K","J","C","B","A","F","E","D"],
        especialidadeIds:["esp-psiquiatria","esp-oftalmo"] },
      { id:"b5-ambulatorio", ordem:10, nome:"Ambulatório Interdisciplinar", dataInicio:"2026-09-14", dataFim:"2026-10-07",
        turmasPorJanela:["J","I","H","G","L","K","D","C","B","A","F","E"],
        especialidadeIds:["esp-dermato","esp-reumato","esp-geriatria","esp-alergiaimuno","esp-neuro"] },
      { id:"b5-clinica-lab", ordem:11, nome:"Clínica Médica e Medicina Laboratorial", dataInicio:"2026-10-08", dataFim:"2026-11-08",
        turmasPorJanela:["K","J","I","H","G","L","E","D","C","B","A","F"],
        especialidadeIds:["esp-cardio","esp-pneumo","esp-gastro","esp-nefro","esp-endocrino","esp-hemato"] },
      { id:"b5-dipa", ordem:12, nome:"DIPA — Doenças Infecciosas e Parasitárias", dataInicio:"2026-11-09", dataFim:"2026-12-04",
        turmasPorJanela:["L","K","J","I","H","G","F","E","D","C","B","A"],
        especialidadeIds:["esp-infecto","esp-infectoped"] },
    ],
    "6º ano": BLOCOS_6_ANO,
  },
});
})();
