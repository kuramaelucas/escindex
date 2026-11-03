/* ==========================================================================
   REPOSIÇÕES — questões anuladas (asma e sífilis)
   ==========================================================================
   Versão corrigida de duas questões anuladas pela banca em que nenhuma
   alternativa estava correta: IAMSPE 2023 nº 43 (GINA) e Santa Casa de São
   Paulo 2023 nº 86 (sífilis). As originais continuam anuladas e sem gabarito
   em suas provas; estas são as REPOSIÇÕES (`reposicaoDe`). Conteúdo, não código.
   ========================================================================== */
window.EscDados.registrarQuestoes("reposicoes-clinicas-2", [
 {
  "id": "q-iamspe2023-043-ia",
  "banca": "IAMSPE",
  "real": false,
  "ano": 2023,
  "reposicaoDe": "q-iamspe2023-043",
  "areaId": "area-cm",
  "especialidadeId": "esp-pneumo",
  "assuntoId": "ass-asma",
  "enunciado": "Em relação ao relatório da GINA (Global Initiative for Asthma, edição 2026) sobre o tratamento da asma, assinale a alternativa correta.",
  "alternativas": [
   {
    "id": "A",
    "texto": "Devem ser sempre associados dois B2 agonistas de longa duração no tratamento da asma leve."
   },
   {
    "id": "B",
    "texto": "Adolescentes e adultos com asma leve não devem ser tratados apenas com SABA, porque mesmo com sintomas infrequentes têm risco de exacerbação grave, e esse risco cai com o corticoide inalatório."
   },
   {
    "id": "C",
    "texto": "Na avaliação de gravidade, a asma leve não tem indicação de tratamento medicamentoso profilático."
   },
   {
    "id": "D",
    "texto": "O uso de corticoide inalatório (ICS) se restringe apenas à asma moderada e grave."
   },
   {
    "id": "E",
    "texto": "Hemograma com eosinofilia está presente em todos os casos de asma grave."
   }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: pergunta sobre o **relatório da GINA**, que desde 2019 abandonou o tratamento com SABA isolado. Dados objetivos: o relatório de 2026 explica que pacientes com asma infrequente ou leve **podem ter exacerbações graves ou fatais** se tratados só com SABA, e que esse risco **cai pela metade a dois terços** com ICS em dose baixa ou com ICS-formoterol conforme a necessidade; a **Trilha 1** (ICS-formoterol como aliviador anti-inflamatório) segue como abordagem **preferida** para adultos e adolescentes, com um só medicamento e um só dispositivo nos passos 1 a 4. Mecanismo: a asma é doença inflamatória crônica das vias aéreas, e o SABA só alivia o broncoespasmo, sem tratar a inflamação que causa as exacerbações; o ICS atua nessa inflamação. Epidemiologia: a classificação antiga de asma \"intermitente\" partia da suposição, não testada, de que sintomas até 2 dias por semana não ofereciam risco; hoje se sabe que oferecem. A está errada porque não se associam dois beta-2 de longa duração. C e D estão erradas porque a asma leve tem indicação de ICS e ele não se restringe aos casos moderados e graves. E está errada porque há asma grave não eosinofílica.",
  "referencias": "Global Initiative for Asthma (GINA). Global Strategy for Asthma Management and Prevention, relatório de 2026 (ginasthma.org, PDF de maio de 2026): texto lido em 03/11/2026, trechos sobre SABA isolado, Trilha 1 e classificação de gravidade. Conferido em 03/11/2026.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
   "respostas": 0,
   "acertos": 0,
   "distribuicaoAlternativas": {}
  },
  "criadoPor": "seed",
  "criadoEm": "2026-11-03"
 },
 {
  "id": "q-scmsp2023-086-ia",
  "banca": "Santa Casa de São Paulo (FCMSCSP)",
  "real": false,
  "ano": 2023,
  "reposicaoDe": "q-scmsp2023-086",
  "areaId": "area-cm",
  "especialidadeId": "esp-infecto",
  "assuntoId": "ass-ist",
  "enunciado": "Marcelo, assintomático, compareceu à unidade básica de saúde (UBS) de referência para fazer exames diagnósticos de infecções sexualmente transmissíveis (ISTs). Foram-lhe oferecidos testes rápidos, e o resultado para sífilis foi positivo. Marcelo nunca havia tido esse diagnóstico anteriormente, logo nunca recebera qualquer tratamento para essa doença. Acerca da situação hipotética acima e de assuntos a ela relacionados, assinale a alternativa correta.",
  "alternativas": [
   {
    "id": "A",
    "texto": "É preciso confirmar o diagnóstico de Marcelo com teste não treponêmico (VDRL) e, se confirmado, como não há como estabelecer a duração, tratá-lo como sífilis latente de duração ignorada, com penicilina benzatina 2.400.000 UI IM em três doses semanais (total de 7.200.000 UI)."
   },
   {
    "id": "B",
    "texto": "Devido ao controle epidemiológico satisfatório, a sífilis deixou de ser uma doença de notificação compulsória no Brasil."
   },
   {
    "id": "C",
    "texto": "Como é o primeiro diagnóstico de sífilis de Marcelo, o caso deve ser tratado como sífilis primária, administrando-se uma dose de penicilina benzatina de 1.200.000 UI em cada glúteo."
   },
   {
    "id": "D",
    "texto": "O teste rápido para sífilis é um teste não treponêmico, e o VDRL, um teste treponêmico."
   },
   {
    "id": "E",
    "texto": "Os testes rápidos para ISTs têm sido desencorajados, pela sua baixa sensibilidade. O VDRL é mais sensível e específico, por ser um teste treponêmico."
   }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **homem assintomático, teste rápido de sífilis reagente, sem tratamento prévio**. Dados objetivos: pelo PCDT de IST 2022, o teste rápido (treponêmico) reagente leva à investigação com o **teste não treponêmico** no laboratório; confirmada a infecção sem como datar o início, o caso é **latente de duração ignorada**, tratada como sífilis tardia: **benzilpenicilina benzatina 2,4 milhões UI IM por semana, por 3 semanas (dose total de 7,2 milhões UI)**, com controle por teste não treponêmico trimestral. Mecanismo: o treponêma persiste em estágio latente sem sintomas, e a duração da exposição define o esquema: infecção recente (até 1 ano) usa dose única, e a de duração desconhecida usa três doses para garantir níveis tratantes prolongados. Epidemiologia: a infecção é muitas vezes assintomática e só aparece em testagem, razão pela qual os testes rápidos na atenção básica são estratégicos. B está errada porque a sífilis continua com notificação compulsória (o protocolo traz os critérios de caso de sífilis adquirida). C está errada porque o diagnóstico de primeira vez não é critério para chamar o caso de primário, e a dose única de 1,2 milhão UI em cada glúteo é o esquema da sífilis recente. D e E estão erradas porque o teste rápido é treponêmico e o VDRL é não treponêmico, e os dois enunciados invertem isso.",
  "referencias": "Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (IST), 2022 (diagnóstico após teste rápido reagente, quadro de tratamento da sífilis adquirida e critérios de notificação): texto lido em 03/11/2026 em gov.br/aids. Conferido em 03/11/2026.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
   "respostas": 0,
   "acertos": 0,
   "distribuicaoAlternativas": {}
  },
  "criadoPor": "seed",
  "criadoEm": "2026-11-03"
 }
]);
