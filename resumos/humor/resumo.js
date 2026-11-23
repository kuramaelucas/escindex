/* resumos/humor/resumo.js — resumo adaptativo de transtornos do humor (ass-psiq-humor): episódio
   depressivo (critérios, gravidade, PHQ-9, depressão em criança, idoso e doença clínica), tratamento
   (ISRS, escolha, latência, duração, efeitos), perinatal, risco de suicídio, transtorno bipolar
   (mania, virada com antidepressivo, lítio e interações, depressão bipolar), ciclotimia, agitação;
   armadilhas e tabela.  Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- humor */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "humor",
  titulo: "Transtornos do humor: depressão, bipolar e suicídio",
  assunto: "ass-psiq-humor",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "dsm5tr", texto: "American Psychiatric Association — DSM-5-TR (2022), transtornos depressivos e bipolares; CID-11 (OMS)", lidoEm: null },
    { id: "canmat-depressao", texto: "CANMAT 2023 — Update on clinical guidelines for management of major depressive disorder in adults (Can J Psychiatry 2024) e NICE NG222 (Depression in adults, 2022)", lidoEm: null },
    { id: "canmat-bipolar", texto: "CANMAT/ISBD 2018 — Guidelines for the management of patients with bipolar disorder (Bipolar Disord 2018)", lidoEm: null },
    { id: "ms-suicidio", texto: "OMS — LIVE LIFE (2021) e Ministério da Saúde/ABP — prevenção do suicídio: manual para profissionais", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-amrigs2022-019"] },
  ],
  doencas: [
    {
      id: "depressao", titulo: "Episódio depressivo",
      introducao: `[[Depressão é uma síndrome, não tristeza: por pelo menos **2 semanas**, quase todos os dias, **humor deprimido ou anedonia** (um dos dois é obrigatório), mais sintomas que chegam a cinco no total — sono, apetite e peso, energia, lentificação ou agitação, culpa ou inutilidade, concentração, ideias de morte —, com prejuízo. A biologia envolve circuitos de recompensa e estresse (eixo hipotálamo-hipófise-adrenal, monoaminas, neuroplasticidade); a vida e as condições sociais carregam o gatilho.|q-famema2025-082,q-einstein2022-066,q-unesp2021-040]]

Veja também: **Demência e delirium** (pseudodemência no idoso), **Transtornos de ansiedade**, **Dependência química** e **Psicofarmacologia** quando houver resumo.`,
      fragmentos: [
        { id: "dep-diagnostico", titulo: "Diagnóstico, gravidade e recorrência", conferir: true, diretrizes: ["dsm5tr"],
          figuras: [{ arquivo: "figuras/curso-do-humor.svg", legenda: "Esquema autoral: o curso do humor no tempo na depressão recorrente, no bipolar tipo I e II e na ciclotimia." }],
          questoes: ["q-famema2025-082","q-einstein2022-066","q-unesp2021-040","q-tp20241-013","q-amrigs2024-079","q-iamspe2025-090","q-tp20222-038","q-amrigs2025-099"],
          prosa: `[[O quadro típico tem piora pela manhã, lentificação, insônia terminal, perda de apetite e peso; o atípico tem hipersonia, aumento de apetite, peso e reatividade do humor. Episódios repetidos com remissão completa entre eles são **transtorno depressivo recorrente**.|q-einstein2022-066,q-unesp2021-040,q-tp20241-013,q-amrigs2025-099]] [[Na depressão leve ou moderada o afeto ainda é **reativo**: a pessoa se anima por momentos e pode esconder os sintomas — por isso se pergunta ativamente.|q-amrigs2024-079]] [[O **PHQ-9** gradua: 5–9 leve, **10–14 moderada**, 15–19 moderadamente grave, ≥ 20 grave. Sintomas psicóticos congruentes com o humor (ideias deliroides de culpa e ruína) marcam gravidade.|q-iamspe2025-090,q-tp20222-038]]`,
          texto: `- **2 semanas**, humor deprimido **ou anedonia** + sintomas até 5. {q-famema2025-082,q-einstein2022-066,q-unesp2021-040}
- Episódios repetidos: **recorrente**. {q-tp20241-013}
- Afeto reativo na leve. {q-amrigs2024-079}
- PHQ-9 **10–14 moderada**; delírio de ruína = grave. {q-iamspe2025-090,q-tp20222-038}` },
        { id: "dep-contextos", titulo: "Criança, idoso, doença clínica e sociedade", conferir: true, diretrizes: ["dsm5tr"],
          questoes: ["q-sessp2024-059","q-amrigs2020-061","q-usp2026-067","q-amrigs2023-100","q-fmabc2025-093","q-iamspe2025-099","q-famema2025-088"],
          prosa: `[[Na criança e no adolescente, a depressão aparece como irritabilidade, queda no rendimento, sono desregulado (sonolência, insônia, despertar precoce), apatia e queixas somáticas; uma criança internada, apática, que deixou de brincar e comer, merece **avaliação psiquiátrica**, não apenas a explicação de "ajustamento".|q-sessp2024-059,q-amrigs2020-061,q-usp2026-067]] [[Doença clínica e depressão andam juntas: hipotireoidismo imita depressão, dor crônica e Parkinson (até metade) a acompanham. No idoso com luto prolongado, tristeza persistente após anos é transtorno a tratar.|q-amrigs2023-100,q-fmabc2025-093]] [[Pobreza, desemprego e baixa escolaridade são **fatores de risco**; a prevenção primária fortalece as redes sociais da comunidade e a atividade física.|q-iamspe2025-099,q-famema2025-088]]`,
          texto: `- Criança: irritabilidade, sono, queda escolar; internada apática: **psiquiatria**. {q-sessp2024-059,q-amrigs2020-061,q-usp2026-067}
- Comorbidade clínica é a regra. {q-amrigs2023-100,q-fmabc2025-093}
- Condições sociais = **risco**; prevenção comunitária. {q-iamspe2025-099,q-famema2025-088}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento da depressão",
      introducao: `[[O ISRS bloqueia a recaptação de serotonina e aumenta sua disponibilidade na sinapse em horas, mas a melhora leva **2 a 4 semanas**: o efeito clínico vem da adaptação dos receptores e da neuroplasticidade, não do pico de serotonina. Por isso se avisa da latência e não se troca o remédio cedo demais.|q-iamspe2025-014,q-sirio2027-087]]`,
      fragmentos: [
        { id: "tra-escolha", titulo: "Quando medicar e qual remédio", conferir: true, diretrizes: ["canmat-depressao"],
          questoes: ["q-iamspe2025-014","q-sirio2027-087","q-usp2026-090","q-scmsp2026-100","q-amrigs2021-020","q-amrigs2020-017","q-usprp2021-018","q-fmabc2026-008","q-tp20251-027","q-fmabc2025-093"],
          prosa: `[[Leve: psicoeducação, **atividade física**, psicoterapia, retorno em 4–6 semanas — sobretudo para quem recusa remédio. Moderada a grave, ou episódio anterior que respondeu a antidepressivo: **antidepressivo**, com seguimento na atenção primária e psicoterapia.|q-usp2026-090,q-scmsp2026-100,q-amrigs2021-020]] [[O primeiro passo é um **ISRS** — sertralina, escitalopram, fluoxetina —, por segurança em overdose e tolerância; o tricíclico (amitriptilina) é perigoso em dose alta e anticolinérgico. No idoso e no cardiopata, **sertralina** (poucas interações, meia-vida curta); a fluoxetina tem meia-vida longa e muitas interações. No obeso, a **fluoxetina** tende a não aumentar o peso; a mirtazapina e a paroxetina engordam.|q-amrigs2020-017,q-usprp2021-018,q-fmabc2026-008,q-tp20251-027,q-fmabc2025-093]] [[Benzodiazepínico não trata depressão: inicia-se o ISRS e, estável o humor, **desmama-se** o clonazepam.|q-sirio2027-087]]`,
          texto: `- Leve: **atividade física**, psicoterapia. {q-usp2026-090,q-scmsp2026-100}
- Moderada/grave: **ISRS**. {q-amrigs2021-020,q-amrigs2020-017,q-usprp2021-018}
- Idoso: **sertralina**; obeso: fluoxetina. {q-fmabc2026-008,q-tp20251-027,q-fmabc2025-093}
- Benzodiazepínico: **desmamar**. {q-sirio2027-087}` },
        { id: "tra-manejo", titulo: "Duração e efeitos adversos", conferir: true, diretrizes: ["canmat-depressao"],
          questoes: ["q-scmsp2023-087","q-usp2026-010","q-amrigs2022-096"],
          prosa: `[[Remissão em 4 meses é esperada; o antidepressivo se mantém por **6 a 12 meses depois da remissão** e se retira aos poucos — parar cedo dobra a recaída.|q-scmsp2023-087]] [[A fluoxetina é ativadora: tomada à noite causa **insônia**; orienta-se tomá-la **pela manhã** antes de pensar em hipnótico.|q-usp2026-010]] [[A disfunção sexual (menos libido, anorgasmia, ejaculação retardada) chega a metade dos usuários e deve ser perguntada e manejada, porque leva ao abandono.|q-amrigs2022-096]]`,
          texto: `- Manter **6–12 meses após a remissão**. {q-scmsp2023-087}
- Insônia com fluoxetina: tomar **de manhã**. {q-usp2026-010}
- Disfunção sexual comum: **manejar**. {q-amrigs2022-096}` },
      ],
    },
    {
      id: "perinatal", titulo: "Gestação e puerpério",
      introducao: `[[A queda brusca de estrogênio e progesterona após o parto, a privação de sono e a vulnerabilidade prévia explicam por que o puerpério é o período de maior risco de transtorno do humor na vida da mulher.|q-amrigs2024-057,q-amrigs2025-059]]`,
      fragmentos: [
        { id: "per-puerperio", titulo: "Depressão pós-parto e psicose puerperal", conferir: true, diretrizes: ["canmat-depressao","canmat-bipolar"],
          questoes: ["q-amrigs2024-057","q-amrigs2025-059","q-uspsp5-037","q-amrigs2021-059","q-usp2023-059"],
          prosa: `[[Tristeza puerperal (blues) é transitória, nos primeiros dias; a **depressão pós-parto** dura mais de 2 semanas e deve ser rastreada (escala de Edimburgo), porque a detecção espontânea falha. **Sertralina e paroxetina** são seguras na amamentação.|q-amrigs2024-057]] [[Confusão, alucinações, delírios sobre o bebê, agitação e insônia grave nas primeiras 2 semanas: **psicose puerperal**, emergência, com forte ligação ao **transtorno bipolar**.|q-amrigs2025-059,q-uspsp5-037]] [[Mulher que planeja engravidar deve trocar os estabilizadores teratogênicos: **carbamazepina** e valproato (defeitos do tubo neural) saem primeiro.|q-amrigs2021-059]] [[Depressão pós-parto longa, irritabilidade e história familiar de suicídio e álcool levantam a hipótese de **bipolaridade**.|q-usp2023-059]]`,
          texto: `- Pós-parto: rastrear; **sertralina** na amamentação. {q-amrigs2024-057}
- Psicose puerperal: **bipolar**. {q-amrigs2025-059,q-uspsp5-037}
- Gestação: tirar **carbamazepina/valproato**. {q-amrigs2021-059}
- História sugestiva: pensar **bipolar**. {q-usp2023-059}` },
      ],
    },
    {
      id: "suicidio", titulo: "Risco de suicídio",
      introducao: `[[Perguntar sobre suicídio não induz o ato; protege. O risco cresce com **desesperança**, tentativa prévia, plano e meio definidos, história familiar de suicídio, transtorno grave, abuso de substâncias e isolamento.|q-tp20202-036,q-tp20222-038]]`,
      fragmentos: [
        { id: "sui-conduta", titulo: "Avaliar e proteger", conferir: true, diretrizes: ["ms-suicidio"],
          questoes: ["q-tp20202-036","q-tp20222-038","q-usprp2025-025","q-didepm-091","q-usp2026-047"],
          prosa: `[[Desesperança e suicídio na família são fatores de risco centrais.|q-tp20202-036,q-tp20222-038]] [[Ideação com **plano, meio e data**, tentativa prévia e recusa de ajuda é **risco iminente**: encaminhar à urgência acompanhado, internar se preciso **contra a vontade**, e retirar os meios — a autonomia cede diante do risco de morte.|q-usprp2025-025,q-didepm-091]] [[Lesão autoprovocada (soda cáustica) que o paciente minimiza não permite alta: avaliar com a família a circunstância e garantir a continuidade do cuidado, sem enganar o paciente sobre a avaliação.|q-usp2026-047]]`,
          texto: `- Risco: **desesperança**, família, tentativa. {q-tp20202-036,q-tp20222-038}
- Plano e meio: **urgência/internação**, mesmo involuntária. {q-usprp2025-025,q-didepm-091}
- Tentativa minimizada: **não dar alta**. {q-usp2026-047}` },
      ],
    },
    {
      id: "bipolar", titulo: "Transtorno bipolar",
      introducao: `[[Basta um episódio de **mania** (humor elevado ou irritável, energia aumentada, ≥ 1 semana ou com internação) para o **bipolar tipo I**; menos sono sem cansaço, grandiosidade, fuga de ideias, gastos e sexo de risco são o retrato. O tipo II tem hipomania (menor, sem prejuízo grave) e depressões. Muitas vezes a primeira consulta é por depressão — por isso se pergunta sempre por euforia passada antes de dar antidepressivo.|q-unifesp2026-065,q-uspsp2-023,q-usp2022-015]]`,
      fragmentos: [
        { id: "bip-diagnostico", titulo: "Mania e virada com antidepressivo", conferir: true, diretrizes: ["canmat-bipolar","dsm5tr"],
          questoes: ["q-unifesp2026-065","q-uspsp2-023","q-usp2022-015","q-amrigs2020-100","q-adap21-018","q-amrigs2022-060","q-tp20202-030","q-uspsp4-002"],
          prosa: `[[Mania com delírios (de grandeza, de ser roubado) é **mania com sintomas psicóticos**, ainda bipolar I.|q-unifesp2026-065,q-uspsp2-023,q-usp2022-015]] [[Oscilações crônicas, por pelo menos 2 anos, entre sintomas hipomaníacos e depressivos que não fecham episódio: **ciclotimia**.|q-amrigs2020-100]] [[Antidepressivo sozinho num bipolar pode **virar** o quadro para mania: **suspender o antidepressivo** e iniciar **estabilizador** (lítio, valproato), com antipsicótico atípico na mania aguda.|q-adap21-018,q-amrigs2022-060,q-tp20202-030]] [[Agitação com risco no pronto-socorro: contenção verbal e, se falhar, **haloperidol com prometazina** intramuscular.|q-uspsp4-002]]`,
          texto: `- Mania psicótica: **bipolar I**. {q-unifesp2026-065,q-uspsp2-023,q-usp2022-015}
- Oscilação crônica leve: **ciclotimia**. {q-amrigs2020-100}
- Virada: **tira antidepressivo**, põe estabilizador. {q-adap21-018,q-amrigs2022-060,q-tp20202-030}
- Agitação: **haloperidol + prometazina**. {q-uspsp4-002}` },
        { id: "bip-tratamento", titulo: "Lítio e depressão bipolar", conferir: true, diretrizes: ["canmat-bipolar"],
          questoes: ["q-amrigs2023-019","q-amrigs2024-100","q-adap26-065"],
          prosa: `[[A farmacoterapia é a base do tratamento; antes do lítio pedem-se **creatinina, TSH**, cálcio, prolactina e beta-hCG, porque o lítio é excretado pelo rim e causa hipotireoidismo.|q-amrigs2023-019]] [[O lítio tem janela estreita e segue o sódio no túbulo: tudo que faz o rim reter sódio eleva o lítio — **tiazídicos, IECA/BRA, AINE**, desidratação. O **propranolol não** eleva.|q-amrigs2024-100]] [[Depressão bipolar em uso de lítio: associar **quetiapina ou lurasidona**, sem antidepressivo isolado.|q-adap26-065]]`,
          texto: `- Antes do lítio: **creatinina e TSH**. {q-amrigs2023-019}
- Elevam o lítio: **tiazídico, IECA, AINE**; propranolol não. {q-amrigs2024-100}
- Depressão bipolar: **quetiapina/lurasidona**. {q-adap26-065}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["canmat-depressao"],
          questoes: ["q-amrigs2020-061","q-usp2026-090","q-tp20251-027","q-iamspe2025-090"],
          prosa: `[[**Aprendizado após a depressão infantil**: a recuperação escolar costuma ser lenta; a amrigs2020-061 marcou certo que os problemas de aprendizagem **se corrigem com rapidez** após o episódio.|q-amrigs2020-061]] [[**Depressão com 4 meses de prejuízo**: com sintomas que já afastam do convívio, muitos guias ofereceriam psicoterapia ou ISRS; a usp2026-090, com paciente que recusa ambos, escolheu **atividade física** como conduta imediata.|q-usp2026-090]] [[**ISRS no obeso**: os ISRS são parecidos no peso a longo prazo; a tp20251-027 escolheu **fluoxetina** pelo perfil anorexígeno inicial.|q-tp20251-027]] [[**PHQ-9 de 12**: moderada; a iamspe2025-090 associou já **antidepressivo e psicoterapia**, enquanto guias admitem começar por uma das duas.|q-iamspe2025-090]]`,
          texto: `- Aprendizagem se corrige **rápido**: a prova marcou certo. {q-amrigs2020-061}
- Recusa de tudo: **atividade física**. {q-usp2026-090}
- Obeso: **fluoxetina**. {q-tp20251-027}
- PHQ-9 12: **remédio + psicoterapia**. {q-iamspe2025-090}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: depressão, bipolar e ciclotimia",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-humor", titulo: "Como separar e tratar", conferir: true,
          questoes: ["q-tp20241-013","q-uspsp2-023","q-amrigs2020-100","q-adap21-018","q-amrigs2020-017"],
          prosa: `[[O polo de cima decide o diagnóstico e o remédio.|q-tp20241-013,q-uspsp2-023,q-amrigs2020-100,q-adap21-018,q-amrigs2020-017]]

| | Depressão recorrente | Bipolar I | Bipolar II | Ciclotimia |
| Polo de cima | nenhum | mania (≥ 1 semana ou internação) | hipomania | hipomanias leves |
| Polo de baixo | episódios depressivos | comum, não obrigatório | depressões maiores | depressivos leves, ≥ 2 anos |
| Tratamento | ISRS | estabilizador ± antipsicótico; sem antidepressivo isolado | estabilizador, quetiapina | estabilizador, psicoterapia |`,
          texto: `- Só depressões: **recorrente** → ISRS. {q-tp20241-013,q-amrigs2020-017}
- Mania: **bipolar I** → estabilizador. {q-uspsp2-023,q-adap21-018}
- Oscilação leve crônica: **ciclotimia**. {q-amrigs2020-100}` },
      ],
    },
  ],
});
