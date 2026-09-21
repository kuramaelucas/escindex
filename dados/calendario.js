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
    "4º ano": [
      { id:"b4-1", ordem:1, nome:"Clínica Médica I: Cardiologia, Pneumologia & Nefrologia", dataInicio:"2026-02-02", dataFim:"2026-04-05", especialidadeIds:["esp-cardio","esp-pneumo","esp-nefro"] },
      { id:"b4-2", ordem:2, nome:"Clínica Médica II: Gastro, Endócrino & Infecto", dataInicio:"2026-04-06", dataFim:"2026-06-07", especialidadeIds:["esp-gastro","esp-endocrino","esp-infecto"] },
      { id:"b4-3", ordem:3, nome:"Fundamentos de Cirurgia e Técnica Operatória", dataInicio:"2026-06-08", dataFim:"2026-08-09", especialidadeIds:["esp-toce","esp-perioperatorio","esp-abdagudo"] },
      { id:"b4-4", ordem:4, nome:"Saúde da Mulher", dataInicio:"2026-08-10", dataFim:"2026-10-11", especialidadeIds:["esp-ginecologia","esp-planfamiliar","esp-obstetricia"] },
      { id:"b4-5", ordem:5, nome:"Medicina Preventiva e Social", dataInicio:"2026-10-12", dataFim:"2026-12-20", especialidadeIds:["esp-epidemio","esp-sus","esp-bioetica","esp-saudefamilia"] },
    ],
    "5º ano": [
      { id:"b5-1", ordem:1, nome:"Clínica Médica", dataInicio:"2026-02-02", dataFim:"2026-04-19", especialidadeIds:["esp-cardio","esp-pneumo","esp-gastro","esp-endocrino","esp-nefro","esp-infecto","esp-oftalmo"] },
      { id:"b5-2", ordem:2, nome:"Cirurgia Geral e Trauma", dataInicio:"2026-04-20", dataFim:"2026-07-05", especialidadeIds:["esp-abdagudo","esp-trauma","esp-perioperatorio","esp-cirurgiaonco","esp-toce"] },
      { id:"b5-3", ordem:3, nome:"Pediatria", dataInicio:"2026-07-06", dataFim:"2026-09-20", especialidadeIds:["esp-neonato","esp-crescdesenv","esp-infectoped","esp-emergped"] },
      { id:"b5-4", ordem:4, nome:"Ginecologia e Obstetrícia", dataInicio:"2026-09-21", dataFim:"2026-12-20", especialidadeIds:["esp-obstetricia","esp-ginecologia","esp-planfamiliar","esp-oncogineco"] },
    ],
    "6º ano": BLOCOS_6_ANO,
  },
});
})();
