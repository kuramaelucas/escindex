/* resumos/lupus/resumo.js — resumo adaptativo de lúpus e colagenoses (ass-reumato-les): mecanismo da
   autoimunidade, FAN e anticorpos, manifestações do LES (pele, articulação, sangue, rim, serosas),
   nefrite lúpica (classes, biópsia, indução), lúpus induzido por droga, gestação (anti-Ro, bloqueio,
   SAF), LES juvenil, esclerose sistêmica (Raynaud, crise renal, hipertensão pulmonar), dermatomiosite,
   Sjögren; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- lupus */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "lupus",
  titulo: "Lúpus e colagenoses",
  assunto: "ass-reumato-les",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "eular-acr-2019", texto: "EULAR/ACR 2019 — classification criteria for systemic lupus erythematosus; EULAR 2023 — recommendations for the management of SLE", lidoEm: null },
    { id: "kdigo-lupus", texto: "KDIGO 2024 Clinical Practice Guideline for the Management of Lupus Nephritis; EULAR/ERA-EDTA 2019", lidoEm: null },
    { id: "es-miosite", texto: "ACR/EULAR 2013 — classification criteria for systemic sclerosis; EULAR 2023 (tratamento); EULAR/ACR 2017 (miopatias inflamatórias)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-iamspe2021-006"] },
  ],
  doencas: [
    {
      id: "les", titulo: "Lúpus eritematoso sistêmico",
      introducao: `[[No lúpus, a tolerância falha: linfócitos B e T autorreativos escapam, células que morrem expõem núcleo (DNA, nucleossomos), e os autoanticorpos formam **imunocomplexos** que se depositam e **consomem complemento** — por isso C3 e C4 caem quando a doença está ativa. A luz ultravioleta aumenta a apoptose da pele, e o estrogênio favorece a autoimunidade: é doença de mulher jovem que piora com sol.|q-tp20252-100,q-usprp2027-037,q-tp20251-017]]

Veja também: **Glomerulopatias**, **Vasculites**, **Artrites**, **Síndrome antifosfolípide e gestação** e **Anemias hemolíticas** quando houver resumo.`,
      fragmentos: [
        { id: "les-quadro", titulo: "Quadro e anticorpos", conferir: true, diretrizes: ["eular-acr-2019"],
          figuras: [{ arquivo: "figuras/anticorpos.svg", legenda: "Esquema autoral: o FAN como triagem e o anticorpo específico de cada doença e manifestação." }],
          casos: ["q-usprp2022-073","q-tp20251-017"],
          questoes: ["q-tp20252-100","q-usprp2027-037","q-tp20251-017","q-usprp2022-073","q-unifesp2026-086","q-tp20241-048","q-einstein2023-040","q-unesp2023-043","q-tp20202-033","q-amrigs2023-002","q-sirio2027-020","q-adap24-015"],
          prosa: `[[Mulher jovem com **rash malar fotossensível**, **lesões discoides** (bordas hipercrômicas, centro atrófico), **úlceras orais**, **artrite** não erosiva de punhos e MCF, serosite, citopenias (**linfopenia**, leucopenia, plaquetopenia, **anemia hemolítica Coombs positivo**) e urina espumosa com **hematúria dismórfica**.|q-tp20251-017,q-usprp2022-073,q-unifesp2026-086,q-tp20241-048,q-einstein2023-040]] [[O **FAN** é triagem (sensível); título alto (≥ 1:640) com sintomas pesa mais. Confirmam: **anti-DNA** (atividade e nefrite), **anti-Sm** (o mais específico), C3 e C4 baixos; com plaquetopenia e sangramento, pedir também antifosfolípides. Anti-C1q acompanha a nefrite proliferativa.|q-unesp2023-043,q-tp20202-033,q-amrigs2023-002,q-sirio2027-020]] [[Bolhas tensas com neutrófilos e IgG na membrana basal num lúpus: **lúpus bolhoso**.|q-adap24-015]] [[Adolescente com sangramento vaginal intenso, rash e citopenias graves: o fator de risco cobrado foi a **estrogenemia** da puberdade.|q-usprp2027-037]]`,
          texto: `- Rash, discoide, úlcera oral, artrite, **citopenias**, urina. {q-tp20251-017,q-usprp2022-073,q-unifesp2026-086,q-tp20241-048,q-einstein2023-040}
- FAN triagem; **anti-Sm** específico; **anti-DNA** e complemento = atividade. {q-unesp2023-043,q-tp20202-033,q-amrigs2023-002,q-sirio2027-020}
- Lúpus bolhoso; estrogênio. {q-adap24-015,q-usprp2027-037,q-tp20252-100}` },
        { id: "les-rim", titulo: "Nefrite lúpica", conferir: true, diretrizes: ["kdigo-lupus"],
          questoes: ["q-adap26-086","q-iamspe2026-012","q-tp20231-020","q-tp20261-118","q-famerp2025-011","q-sirio2026-007","q-sirio2026-015","q-sirio2024-016","q-famerp2024-080","q-sessp2025-015"],
          prosa: `[[Proteinúria ≥ 0,5 g/dia, hematúria dismórfica ou cilindros num lúpus pedem **biópsia renal**, porque a classe decide o tratamento. A **classe IV (proliferativa difusa**, > 50% dos glomérulos) é a mais grave e mais frequente; a **V (membranosa)** dá síndrome nefrótica com pouca hematúria. O anticorpo associado é o **anti-DNA**.|q-adap26-086,q-iamspe2026-012,q-tp20231-020,q-tp20261-118,q-famerp2025-011,q-sirio2026-007]] [[Tratamento: **hidroxicloroquina** para todos, **corticoide** (pulso de metilprednisolona nas formas graves) e indução com **micofenolato ou ciclofosfamida**. Antes do pulso em área endêmica, **antiparasitário** (estrongiloidíase).|q-sirio2026-015,q-sirio2024-016,q-famerp2024-080]] [[Lúpus com infecção, desidratação e creatinina subindo: hidratar e acompanhar com C3, C4, anti-DNA e proteinúria antes de concluir nefrite.|q-sessp2025-015]]`,
          texto: `- Proteinúria/hematúria: **biópsia**; **classe IV** a mais grave; anti-DNA. {q-adap26-086,q-iamspe2026-012,q-tp20231-020,q-tp20261-118,q-famerp2025-011,q-sirio2026-007}
- **Hidroxicloroquina + corticoide + micofenolato/ciclofosfamida**; antiparasitário antes do pulso. {q-sirio2026-015,q-sirio2024-016,q-famerp2024-080}
- Desidratação: hidratar e reavaliar. {q-sessp2025-015}` },
        { id: "les-especiais", titulo: "Droga, gestação, criança e SAF", conferir: true, diretrizes: ["eular-acr-2019"],
          casos: ["q-tp20251-008","q-uspsp1-069"],
          questoes: ["q-tp20251-008","q-iamspe2021-004","q-uspsp1-069","q-didepm-086","q-tp20231-021","q-tp20231-046"],
          prosa: `[[Lesões fotossensíveis num idoso com FAN e uso prolongado de **hidroclorotiazida**: **lúpus cutâneo subagudo induzido por droga** — suspender o diurético e fotoproteger.|q-tp20251-008]] [[**Anti-Ro** atravessa a placenta e lesa o sistema de condução fetal: **bloqueio atrioventricular congênito** — **ecocardiografia fetal** seriada entre 16 e 26 semanas; hidroxicloroquina reduz o risco. Na gestante lúpica, trocar **micofenolato** (teratogênico) por **azatioprina** e manter a hidroxicloroquina.|q-iamspe2021-004,q-uspsp1-069,q-didepm-086]] [[Trombose, perdas fetais e **livedo reticular**: **síndrome antifosfolípide**.|q-tp20231-021]] [[Menina pequena com oligoartrite crônica: AIJ; FAN não confirma nem exclui, mas **uveíte anterior** corrobora.|q-tp20231-046]]`,
          texto: `- Hidroclorotiazida + fotossensibilidade: **lúpus induzido**. {q-tp20251-008}
- Anti-Ro: **eco fetal 16–26 semanas**; micofenolato → **azatioprina**. {q-iamspe2021-004,q-uspsp1-069,q-didepm-086}
- Trombose + perdas + livedo: **SAF**. {q-tp20231-021}
- AIJ: uveíte corrobora. {q-tp20231-046}` },
      ],
    },
    {
      id: "outras", titulo: "Esclerose sistêmica, dermatomiosite e Sjögren",
      introducao: `[[As outras colagenoses têm um alvo dominante: na **esclerose sistêmica**, o pequeno vaso e o fibroblasto (Raynaud, pele espessa, fibrose); na **dermatomiosite**, o capilar do músculo e da pele; no **Sjögren**, as glândulas exócrinas com linfócitos que podem virar linfoma.|q-unifesp2024-025,q-usp2024-058,q-tp20252-073]]`,
      fragmentos: [
        { id: "out-es", titulo: "Esclerose sistêmica", conferir: true, diretrizes: ["es-miosite"],
          casos: ["q-tp20251-018","q-usprp2023-080"],
          questoes: ["q-unifesp2024-025","q-tp20251-018","q-tp20261-079","q-usprp2023-080","q-usprp2023-078","q-amrigs2025-008"],
          prosa: `[[**Raynaud** com úlceras digitais, pele endurecida das mãos e **FAN centromérico** (anticentrômero, forma limitada): **esclerose sistêmica**. O Raynaud se trata com **bloqueador de canal de cálcio** (nifedipino).|q-unifesp2024-025,q-tp20251-018,q-tp20261-079,q-usprp2023-080]] [[Dispneia progressiva, B2 hiperfonética, estase jugular e edema: **hipertensão pulmonar**, que causa **síncope** ao esforço; estertores em velcro indicam doença intersticial.|q-usprp2023-078,q-usprp2023-080]] [[**Crise renal esclerodérmica** (hipertensão maligna e lesão renal): **IECA** é a droga de escolha, mesmo com creatinina subindo.|q-amrigs2025-008]]`,
          texto: `- Raynaud + **anticentrômero**: ES; **nifedipino**. {q-unifesp2024-025,q-tp20251-018,q-tp20261-079,q-usprp2023-080}
- Hipertensão pulmonar: **síncope**. {q-usprp2023-078}
- Crise renal: **IECA**. {q-amrigs2025-008}` },
        { id: "out-miosite", titulo: "Dermatomiosite e Sjögren", conferir: true, diretrizes: ["es-miosite"],
          casos: ["q-usp2024-058","q-usprp2022-089"],
          questoes: ["q-usp2024-058","q-usprp2022-089","q-tp20252-073"],
          prosa: `[[Heliótropo (eritema violáceo das pálpebras), pápulas de Gottron e **fraqueza proximal** (subir escadas, levantar os braços): **dermatomiosite**, também na criança. No adulto, procurar câncer associado.|q-usp2024-058,q-usprp2022-089]] [[Sjögren com aumento persistente de parótidas, púrpura e linfonodos com infiltrado monoclonal: **evolução para linfoma MALT**.|q-tp20252-073]]`,
          texto: `- Heliótropo + **fraqueza proximal**: dermatomiosite. {q-usp2024-058,q-usprp2022-089}
- Sjögren com parótidas e monoclonal: **linfoma MALT**. {q-tp20252-073}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["eular-acr-2019","kdigo-lupus"],
          questoes: ["q-usprp2027-037","q-famerp2025-011","q-famerp2024-080","q-iamspe2021-004"],
          prosa: `[[**Gatilho no LES juvenil**: sol, vírus e hormônios contam; a usprp2027-037 escolheu **estrogenemia** como o fator mais relevante.|q-usprp2027-037]] [[**Critério de classificação**: pela EULAR/ACR 2019, FAN ≥ 1:80 com nefrite classe III ou IV já classifica; a famerp2025-011 aceitou isso como **suficiente para o diagnóstico**.|q-famerp2025-011]] [[**Ciclofosfamida em dose baixa**: o esquema Euro-Lupus é 500 mg a cada 15 dias por 3 meses; a famerp2024-080 o adotou após o pulso e antiparasitário, antes de confirmar.|q-famerp2024-080]] [[**Quando fazer eco fetal**: as diretrizes pedem seriado de 16 a 26 semanas; a iamspe2021-004, com 20 semanas, pediu **eco fetal imediatamente**.|q-iamspe2021-004]]`,
          texto: `- A prova: **estrogenemia**. {q-usprp2027-037}
- FAN + classe IV **basta**. {q-famerp2025-011}
- Euro-Lupus. {q-famerp2024-080}
- Eco fetal **já**. {q-iamspe2021-004}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: colagenoses e anticorpos",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-colagenoses", titulo: "Anticorpo e órgão-alvo", conferir: true,
          questoes: ["q-tp20202-033","q-tp20251-018","q-usp2024-058","q-uspsp1-069","q-tp20231-021"],
          prosa: `[[Cada anticorpo aponta uma doença ou um risco.|q-tp20202-033,q-tp20251-018,q-usp2024-058,q-uspsp1-069,q-tp20231-021]]

| Anticorpo | Doença | O que indica |
|---|---|---|
| anti-Sm | LES | o mais específico |
| anti-DNA | LES | atividade, nefrite |
| anti-Ro | LES, Sjögren | bloqueio cardíaco fetal, lúpus subagudo |
| anticentrômero | esclerose sistêmica limitada | hipertensão pulmonar |
| anti-Scl-70 | esclerose sistêmica difusa | doença intersticial |
| anti-Jo-1 | miosites | pulmão intersticial |
| antifosfolípides | SAF | trombose e perdas |`,
          texto: `- **anti-Sm**: LES. {q-tp20202-033}
- **Anticentrômero**: ES. {q-tp20251-018}
- Fraqueza proximal: miosite. {q-usp2024-058}
- **Anti-Ro**: eco fetal. {q-uspsp1-069}
- Antifosfolípide: **SAF**. {q-tp20231-021}` },
      ],
    },
  ],
});
