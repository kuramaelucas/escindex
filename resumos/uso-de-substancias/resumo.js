/* resumos/uso-de-substancias/resumo.js — resumo adaptativo de transtornos por uso de substâncias
   (ass-psiq-substancias): abstinência alcoólica (quadro, tempo, convulsão, delirium tremens,
   benzodiazepínico, onde tratar), tiamina e Wernicke-Korsakoff, rastreio na atenção primária (AUDIT,
   ASSIST), intervenção breve e níveis de prevenção, fatores de risco, redução de danos e CAPS AD,
   estimulantes (cocaína) e opioides (naloxona); armadilhas e tabela de intoxicações e abstinência.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- uso-de-substancias */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "uso-de-substancias",
  titulo: "Transtornos por uso de substâncias",
  assunto: "ass-psiq-substancias",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "dsm5tr-substancias", texto: "DSM-5-TR (2022): transtornos relacionados a substâncias", lidoEm: null },
    { id: "ms-alcool", texto: "Ministério da Saúde — Cadernos de Atenção Básica nº 34 (Saúde Mental) e Abordagens terapêuticas a usuários de álcool e outras drogas; OMS — AUDIT e ASSIST", lidoEm: null },
    { id: "asam-abstinencia", texto: "ASAM — Clinical Practice Guideline on Alcohol Withdrawal Management (2020)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "abstinencia", titulo: "Abstinência alcoólica",
      introducao: `[[O álcool potencializa o GABA (inibidor) e bloqueia o glutamato (excitatório). Com o uso diário, o cérebro se adapta: menos receptores GABA, mais receptores de glutamato. Quando o álcool para de repente, sobra **excitação sem freio**: tremor, sudorese, taquicardia, hipertensão, convulsão e, no extremo, **delirium tremens**. O tratamento repõe o freio com uma droga de ação no mesmo receptor: o **benzodiazepínico**.|q-sirio2021-016,q-fmabc2023-018,q-amrigs2021-096]]

Veja também: **Intoxicações**, **Demência e delirium**, **Cirrose** e **Saúde mental** (políticas nacionais).`,
      fragmentos: [
        { id: "abs-quadro", titulo: "Quadro e tempo", conferir: true, diretrizes: ["dsm5tr-substancias"],
          figuras: [{ arquivo: "figuras/abstinencia-alcool.svg", legenda: "Esquema autoral: manifestações da abstinência alcoólica conforme as horas desde a última dose." }],
          questoes: ["q-sirio2021-016","q-amrigs2021-096","q-amrigs2021-097","q-adap22-100"],
          prosa: `[[A síndrome de abstinência é um quadro **específico da substância**, surge com a **interrupção ou redução** de um uso intenso e prolongado e causa sofrimento ou prejuízo, sem outra doença que explique.|q-amrigs2021-096]] [[No álcool: **tremor**, sudorese, ansiedade, taquicardia e **hipertensão** a partir de 6 horas; **alucinações** (visuais, táteis, auditivas) com consciência preservada; **convulsões** tônico-clônicas entre 12 e 48 horas. Hipotensão e sonolência não fazem parte.|q-sirio2021-016,q-adap22-100]] [[Quem convulsionou na abstinência está a caminho do **delirium tremens**: vigiar e tratar com benzodiazepínico; não se prescreve hipnótico para dormir nem anticonvulsivante de rotina.|q-amrigs2021-097]] A gravidade se mede pela escala **CIWA-Ar**.`,
          texto: `- **Tremor, hipertensão, alucinações, convulsão**; não hipotensão. {q-sirio2021-016,q-adap22-100}
- Abstinência = quadro específico após parar uso intenso. {q-amrigs2021-096}
- Convulsão: **vigiar delirium tremens**. {q-amrigs2021-097}` },
        { id: "abs-delirium", titulo: "Delirium tremens", conferir: true, diretrizes: ["asam-abstinencia"],
          questoes: ["q-unifesp2026-064","q-scmsp2025-011","q-uspsp1-050","q-unifesp2022-100","q-unesp2021-097","q-uspsp5-021"],
          prosa: `[[Entre **48 e 96 horas** depois da última dose (no internado por fratura, pneumonia ou insuficiência cardíaca, no 2º ou 3º dia): **agitação, confusão e desorientação**, **alucinações visuais** de bichos pequenos (zoopsias), tremor grosseiro, sudorese, taquicardia, hipertensão e febre. É o **delirium tremens**, com mortalidade real.|q-unifesp2026-064,q-scmsp2025-011,q-uspsp1-050,q-uspsp5-021]] [[O tratamento é **benzodiazepínico** (diazepam), em doses repetidas até sedação leve, com **hidratação e tiamina**; a contenção física mantém-se só enquanto necessária. É quadro de **internação**, não de alta para o CAPS.|q-unifesp2022-100,q-unesp2021-097,q-uspsp1-050]]`,
          texto: `- 48–96 h, confusão + zoopsias + hiperatividade autonômica: **delirium tremens**. {q-unifesp2026-064,q-scmsp2025-011,q-uspsp1-050,q-uspsp5-021}
- **Diazepam + hidratação + tiamina**, internado. {q-unifesp2022-100,q-unesp2021-097,q-uspsp1-050}` },
        { id: "abs-tratamento", titulo: "Benzodiazepínico, e não antipsicótico", conferir: true, diretrizes: ["asam-abstinencia","ms-alcool"],
          questoes: ["q-fmabc2023-018","q-amrigs2021-094","q-adap22-100","q-usprp2027-089","q-einstein2025-068"],
          prosa: `[[O **benzodiazepínico** é a classe principal: trata os sintomas e **previne convulsão e delirium**, guiado pela escala de sintomas. Antipsicótico **isolado** baixa o limiar convulsivo; a **clozapina**, que mais o baixa, é a que não se deve usar. Betabloqueador só mascara a taquicardia.|q-fmabc2023-018,q-amrigs2021-094,q-adap22-100]] [[Abstinência **leve** (CIWA baixo, sem convulsão prévia nem doença grave, com rede de apoio) pode ser tratada **fora do hospital**: diazepam oral de horário, tiamina e ácido fólico, com reavaliação próxima na USF ou no CAPS.|q-usprp2027-089,q-einstein2025-068]]`,
          texto: `- **Benzodiazepínico**; evitar antipsicótico isolado, sobretudo **clozapina**. {q-fmabc2023-018,q-amrigs2021-094,q-adap22-100}
- Leve: **ambulatorial** com diazepam oral, tiamina, folato. {q-usprp2027-089,q-einstein2025-068}` },
        { id: "abs-tiamina", titulo: "Tiamina, Wernicke e Korsakoff", conferir: true,
          questoes: ["q-tp20231-010","q-unicampdis2024-063","q-scmsp2022-063","q-adap22-100"],
          prosa: `[[O etilista come pouco e absorve mal a **tiamina** (B1). Sem ela, o cérebro não usa a glicose: **Wernicke** (confusão, ataxia, alteração da movimentação ocular) e, se não tratado, **Korsakoff** (amnésia com **confabulação**: inventa histórias para preencher o que esqueceu).|q-tp20231-010,q-unicampdis2024-063]] [[A glicose consome a pouca tiamina que resta; por isso, em todo etilista, **tiamina antes (ou junto) da glicose**.|q-scmsp2022-063,q-adap22-100]]`,
          texto: `- Confabulação e amnésia no etilista: **Korsakoff (tiamina)**. {q-tp20231-010,q-unicampdis2024-063}
- **Tiamina antes da glicose**. {q-scmsp2022-063,q-adap22-100}` },
      ],
    },
    {
      id: "aps", titulo: "Rastreio, prevenção e rede de cuidado",
      introducao: `[[A maior parte das pessoas com uso de risco de álcool nunca chega a um serviço especializado; é na atenção primária que o problema aparece, quase sempre por outra queixa. Por isso as estratégias mais custo-efetivas são **rastrear** e fazer **intervenção breve** no próprio atendimento.|q-tp20241-114,q-sirio2027-085,q-usprp2025-028]]`,
      fragmentos: [
        { id: "aps-instrumentos", titulo: "AUDIT e ASSIST", conferir: true, diretrizes: ["ms-alcool"],
          questoes: ["q-usprp2025-028","q-sirio2027-085"],
          prosa: `[[O **AUDIT** (10 perguntas) é o instrumento recomendado para o **álcool** na atenção primária: identifica consumo de risco, uso nocivo e provável dependência. O CAGE só sugere dependência e não mede quantidade.|q-sirio2027-085]] [[Para **várias substâncias** (álcool, tabaco, maconha, cocaína, outras) usa-se o **ASSIST**, da OMS.|q-usprp2025-028]]`,
          texto: `- Álcool na APS: **AUDIT**. {q-sirio2027-085}
- Várias substâncias: **ASSIST**. {q-usprp2025-028}` },
        { id: "aps-intervencao", titulo: "Intervenção breve, prevenção e fatores de risco", conferir: true, diretrizes: ["ms-alcool"],
          questoes: ["q-tp20241-114","q-tp20232-113","q-tp20232-115"],
          prosa: `[[A **identificação e intervenção breve** nos serviços de saúde (alguns minutos de conversa estruturada sobre o consumo) é a política de **melhor custo-efetividade** contra o uso nocivo de álcool.|q-tp20241-114]] [[Orientar quem **já bebe acima do recomendado** antes de haver dano é **prevenção secundária** (detecção e intervenção precoce do problema já presente).|q-tp20232-113]] [[Filhos de pais dependentes têm risco cerca de **quatro vezes** maior (genética e ambiente); o monitoramento próximo dos pais protege.|q-tp20232-115]]`,
          texto: `- **Intervenção breve** na APS: melhor custo-efetividade. {q-tp20241-114}
- Orientar quem já bebe demais: **prevenção secundária**. {q-tp20232-113}
- Pais dependentes: **4× mais risco**. {q-tp20232-115}` },
        { id: "aps-rede", titulo: "Redução de danos e CAPS AD", conferir: true, diretrizes: ["ms-alcool"],
          questoes: ["q-fmabc2026-084","q-uspsp3-088","q-unesp2024-100","q-einstein2025-068"],
          prosa: `[[A **redução de danos** não repudia a abstinência: o plano de cuidado é **construído junto** com a pessoa, com metas realistas, incluindo a família e o território.|q-fmabc2026-084]] [[O **CAPS AD** é o serviço de referência para o uso problemático: acolhimento, cuidado intensivo e ressocialização, inclusive de quem vive na rua; internação é para risco grave e por pouco tempo.|q-uspsp3-088,q-unesp2024-100,q-einstein2025-068]]`,
          texto: `- Redução de danos: **plano compartilhado**, metas realistas. {q-fmabc2026-084}
- Referência: **CAPS AD**. {q-uspsp3-088,q-unesp2024-100,q-einstein2025-068}` },
      ],
    },
    {
      id: "outras", titulo: "Estimulantes e opioides",
      introducao: `[[As substâncias se agrupam pelo que fazem no sistema nervoso: **depressoras** (álcool, benzodiazepínicos, opioides), **estimulantes** (cocaína, crack, anfetaminas) e **perturbadoras** (LSD, psilocibina). A intoxicação por um estimulante lembra a abstinência de um depressor, porque ambas aceleram o sistema simpático.|q-famema2025-085,q-amrigs2021-095,q-adap26-064]]`,
      fragmentos: [
        { id: "out-estimulantes", titulo: "Cocaína e crack", conferir: true,
          questoes: ["q-amrigs2025-020","q-amrigs2021-095","q-famema2025-085","q-unesp2024-100"],
          prosa: `[[**Cocaína, crack e metanfetamina** são estimulantes: bloqueiam a recaptação de dopamina e noradrenalina. Intoxicação: **taquicardia, hipertensão, midríase**, sudorese, agitação e paranoia.|q-amrigs2021-095,q-famema2025-085]] [[O tratamento da agitação e da hipertensão é o **benzodiazepínico** (ação GABAérgica); **betabloqueador** puro é evitado, porque deixa o alfa sem oposição e piora a hipertensão.|q-amrigs2025-020]] [[Delírio persecutório e alucinações em usuário pesado, que melhoram com a abstinência, são **psicose induzida por cocaína**, acompanhada no **CAPS AD**.|q-unesp2024-100]]`,
          texto: `- Taquicardia + hipertensão + midríase: **estimulante**. {q-amrigs2021-095,q-famema2025-085}
- Agitação por cocaína: **benzodiazepínico**; evitar betabloqueador. {q-amrigs2025-020}
- Psicose no usuário de cocaína: **induzida**, CAPS AD. {q-unesp2024-100}` },
        { id: "out-opioides", titulo: "Opioides", conferir: true,
          questoes: ["q-adap26-064","q-scmsp2023-012"],
          prosa: `[[Intoxicação por opioide: **rebaixamento, bradipneia e pupilas puntiformes**. O tratamento é **naloxona** venosa ou intramuscular em doses pequenas repetidas, guiadas pela ventilação, com suporte ventilatório.|q-adap26-064]] [[O opioide pode causar **edema pulmonar não cardiogênico** (capilar que vaza), também revertido com **naloxona** e suporte.|q-scmsp2023-012]]`,
          texto: `- Miose + bradipneia: **naloxona** fracionada. {q-adap26-064}
- Edema pulmonar no intoxicado por opioide: **não cardiogênico, naloxona**. {q-scmsp2023-012}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["asam-abstinencia"],
          questoes: ["q-scmsp2022-063","q-uspsp5-021","q-amrigs2025-020","q-einstein2025-068"],
          prosa: `[[**Tiamina e glicose**: a regra é tiamina **antes** da glicose; a scmsp2022-063 deu como certo o uso **concomitante** das duas.|q-scmsp2022-063]] [[**Idoso internado agitado**: o idoso etilista com insuficiência cardíaca pode ter delirium por outra causa (hiponatremia, infecção), mas a uspsp5-021 cobrou **diazepam de horário** pela abstinência; em idoso e hepatopata prefere-se benzodiazepínico de meia-vida curta (lorazepam).|q-uspsp5-021]] [[**Diazepam intramuscular** absorve mal; na agitação por cocaína, a via é venosa ou oral.|q-amrigs2025-020]] [[**Abstinência leve no CAPS**: a einstein2025-068 manteve a paciente no CAPS com diazepam oral e observação; não precisa de encaminhamento a hospital.|q-einstein2025-068]]`,
          texto: `- A prova cobrou tiamina **junto** com glicose; regra: **antes**. {q-scmsp2022-063}
- Idoso etilista agitado: a prova cobrou **diazepam**. {q-uspsp5-021}
- Diazepam **não** IM. {q-amrigs2025-020}
- Abstinência leve: **CAPS**, não hospital. {q-einstein2025-068}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: intoxicação e abstinência",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-quadros", titulo: "Pupila, sinais e tratamento", conferir: true,
          questoes: ["q-amrigs2021-095","q-adap26-064","q-unifesp2026-064","q-amrigs2025-020"],
          prosa: `[[Pupila e sinais vitais separam os quadros.|q-amrigs2021-095,q-adap26-064,q-unifesp2026-064,q-amrigs2025-020]]

| Quadro | Pupila | Sinais | Tratamento |
|---|---|---|---|
| Intoxicação por estimulante | midríase | taquicardia, hipertensão, agitação | benzodiazepínico |
| Intoxicação por opioide | miose puntiforme | bradipneia, rebaixamento | naloxona |
| Abstinência alcoólica / delirium tremens | midríase | tremor, taquicardia, hipertensão, confusão | benzodiazepínico + tiamina |
| Intoxicação alcoólica | normal ou miose | sonolência, ataxia | suporte, tiamina |`,
          texto: `- Estimulante: **midríase, benzodiazepínico**. {q-amrigs2021-095,q-amrigs2025-020}
- Opioide: **miose, naloxona**. {q-adap26-064}
- Delirium tremens: **benzodiazepínico + tiamina**. {q-unifesp2026-064}` },
      ],
    },
  ],
});
