/* resumos/hidroeletrolitico/resumo.js — resumo adaptativo de distúrbios hidroeletrolíticos e ácido-base: água e
   sódio (hiponatremia, hipernatremia, soros), potássio, magnésio, cálcio e fósforo, gasometria (acidoses, alcaloses
   e distúrbios mistos), armadilhas e tabela das hiponatremias. Molde: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- hidroeletrolitico */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "hidroeletrolitico",
  titulo: "Distúrbios hidroeletrolíticos e ácido-base",
  assunto: "ass-hidroeletrolitico",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "europeia-hiponatremia", texto: "ESE/ESICM/ERBP — Clinical practice guideline on diagnosis and treatment of hyponatraemia (2014)", lidoEm: null },
    { id: "kdigo-potassio", texto: "KDIGO — Controversies Conference on potassium management in CKD (2020) e UK Kidney Association, Treatment of acute hyperkalaemia in adults (2023)", lidoEm: null },
    { id: "aap-fluidos", texto: "AAP — Maintenance intravenous fluids in children (2018)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anuladas, sem reposição", questoes: ["q-amrigs2020-019","q-sirio2027-034"] },
  ],
  doencas: [
    {
      id: "sodio", titulo: "Água e sódio",
      introducao: `[[O sódio sérico mede a proporção entre sódio e água, não o estoque de sódio: quem regula a concentração é a água, pelo ADH, que abre aquaporinas no ducto coletor.|q-famerp2026-044,q-scmsp2025-001,q-amrigs2023-005]] Por isso a hiponatremia é, quase sempre, excesso de água em relação ao sódio, e a hipernatremia, falta de água. [[Potássio, magnésio e fosfato predominam dentro da célula; sódio e cloro, fora: a Na-K-ATPase mantém essa diferença.|q-amrigs2023-005]]

[[Quando a osmolalidade do plasma cai, a água entra nas células, e o neurônio, preso no crânio, incha: daí cefaleia, vômitos, confusão e convulsão. Se a queda é lenta (mais de 48 horas), o cérebro elimina osmóis e se adapta, e a correção rápida retira água dos neurônios e causa desmielinização osmótica.|q-adap25-033,q-adap26-029,q-famerp2026-049,q-sirio2023-002]]

Veja também: **Insuficiência cardíaca do adulto** e **Cirrose** (hiponatremia hipervolêmica), **Diabetes** (cetoacidose e estado hiperosmolar), **Diarreia aguda e desidratação** (soros na criança), **ECG, arritmias e síncope** (o ECG da hipercalemia) e **Intoxicações exógenas** (salicilato e álcoois tóxicos).`,
      fragmentos: [
        { id: "na-causas", titulo: "Hiponatremia: classificar pela volemia e pela urina", conferir: true, diretrizes: ["europeia-hiponatremia"],
          questoes: ["q-scmsp2025-001","q-scmsp2025-031","q-famerp2026-044","q-sirio2024-012","q-unicamp2022-004","q-sirio2026-008","q-usp2025-073","q-unesp2021-044","q-sessp2026-007","q-tp20231-007","q-usp2026-002","q-amrigs2023-003"],
          prosa: `[[Primeiro se confirma que a osmolalidade é baixa; depois se olha a urina: osmolalidade urinária > 100 mOsm/kg significa ADH agindo. Hipovolêmico (vômitos, diarreia, diurético) tem ADH alto por estímulo de volume, e a aldosterona alta retém sódio, com sódio urinário baixo.|q-usp2026-002,q-scmsp2025-001]] [[Na SIADH o ADH é liberado sem estímulo: paciente euvolêmico, osmolalidade urinária inapropriadamente alta, sódio urinário > 30 mEq/L e ácido úrico baixo; causas típicas são carcinoma de pequenas células, doença pulmonar e do SNC e drogas como os inibidores da recaptação de serotonina.|q-scmsp2025-031,q-famerp2026-044,q-sirio2024-012,q-unicamp2022-004,q-sirio2026-008,q-usp2025-073]] [[O tiazídico age no túbulo distal, fora da alça que gera o interstício concentrado, e causa hiponatremia sobretudo em idosas; antes de chamar de SIADH, suspende-se o diurético e dosam-se ureia, creatinina, ácido úrico e osmolalidade e sódio urinários.|q-unesp2021-044]] [[Na insuficiência cardíaca, o débito baixo é lido pelos barorreceptores como hipovolemia: o ADH sobe e retém água mesmo com edema, e a hiponatremia marca gravidade; não se repõe sódio.|q-sessp2026-007,q-tp20231-007]]`,
          texto: `- Osm urinária alta com euvolemia, **Na urinário > 30** e **ácido úrico baixo**: **SIADH**. {q-scmsp2025-001,q-famerp2026-044,q-sirio2024-012,q-unicamp2022-004}
- SIADH: **pequenas células**, SNC, **ISRS** (sertralina, fluoxetina). {q-scmsp2025-031,q-sirio2026-008,q-usp2025-073}
- Idosa com tiazídico: **suspender** e investigar. {q-unesp2021-044}
- Diarreia com hiponatremia: **ADH e aldosterona** sobem pela hipovolemia. {q-usp2026-002}
- IC com hiponatremia: **ADH por baixo débito**, não repor sódio. {q-sessp2026-007,q-tp20231-007}
- SIADH é causa de **hiponatremia**, nunca de hipernatremia. {q-amrigs2023-003}` },
        { id: "na-tratamento", titulo: "Corrigir a hiponatremia sem lesar o cérebro", conferir: true, diretrizes: ["europeia-hiponatremia"],
          questoes: ["q-adap25-033","q-adap26-029","q-famerp2023-072","q-famerp2026-049","q-sirio2023-002"],
          prosa: `[[Sintoma grave (convulsão, coma, vômitos com confusão) pede salina a 3% em bolus de 100 a 150 mL (ou cerca de 2 mL/kg) em 10–20 minutos, repetido até subir 4–6 mEq/L: esse pouco já desincha o cérebro.|q-adap25-033,q-adap26-029,q-famerp2023-072]] [[Depois o limite é não passar de 8 a 10 mEq/L nas primeiras 24 horas (8 em quem tem risco: etilista, desnutrido, hipocalêmico), para evitar a desmielinização osmótica.|q-famerp2026-049]] [[A hipercapnia dilata os vasos cerebrais: hiponatremia grave com pCO2 alto faz o edema cerebral mais intenso.|q-sirio2023-002]] O soro a 0,9% não corrige a SIADH, porque o rim retém a água e excreta o sódio.`,
          texto: `- Sintoma grave: **NaCl 3% 100–150 mL em bolus**, repetir. {q-adap25-033,q-adap26-029,q-famerp2023-072}
- Limite: **8–10 mEq/L em 24 h**. {q-famerp2026-049}
- Na 113 com **pCO2 67**: o pior edema cerebral. {q-sirio2023-002}` },
        { id: "na-hipernatremia", titulo: "Hipernatremia e diabetes insípido", conferir: true,
          questoes: ["q-unicampdis2024-017","q-unicampdis2025-076","q-sirio2023-059"],
          prosa: `[[Hipernatremia é falta de água livre: a água sai das células para o plasma, e o compartimento que mais contrai é o intracelular.|q-unicampdis2025-076]] [[Poliúria de urina diluída com sódio alto depois de neurocirurgia ou trauma de crânio é diabetes insípido central, por falta de ADH; trata-se com desmopressina e reposição de água livre.|q-unicampdis2024-017,q-sirio2023-059]]`,
          texto: `- Na 156 com poliúria: perde mais o **intracelular**. {q-unicampdis2025-076}
- Poliúria pós-neurocirurgia, Na 167: **diabetes insípido central**. {q-unicampdis2024-017}
- Tratamento: **desmopressina**. {q-sirio2023-059}` },
        { id: "na-fluidos", titulo: "Volume, renina e soro de manutenção", conferir: true, diretrizes: ["aap-fluidos"],
          questoes: ["q-usp2025-065","q-tp20212-013","q-amrigs2023-005"],
          prosa: `[[Na hipovolemia, as células justaglomerulares percebem a queda de perfusão da arteríola aferente e liberam renina, que gera angiotensina II e aldosterona.|q-tp20212-013]] [[A manutenção em criança hospitalizada é isotônica (sódio perto de 140 mEq/L), porque o ADH não osmótico da doença aguda faz o soro hipotônico gerar hiponatremia; quem perde bicarbonato pela ileostomia recebe parte do sódio como bicarbonato.|q-usp2025-065,q-famerp2026-044]]`,
          texto: `- Hipovolemia: justaglomerulares liberam **renina**. {q-tp20212-013}
- Criança internada: soro de manutenção **isotônico**. {q-usp2025-065}
- Dentro da célula: **potássio e magnésio**; fora: **sódio**. {q-amrigs2023-005}` },
      ],
    },
    {
      id: "potassio", titulo: "Potássio",
      introducao: `[[O potássio fica 98% dentro da célula, e a relação entre o de dentro e o de fora define o potencial de repouso: por isso o coração e o músculo sentem qualquer desvio.|q-fmabc2025-027,q-amrigs2021-018,q-famema2025-013]] [[Na hipercalemia, o potencial de repouso fica menos negativo e os canais de sódio se inativam: T apiculada, depois PR longo, P achatada, QRS largo, sinusoide e parada.|q-amrigs2021-018,q-usp2022-019,q-fmabc2022-001,q-sirio2027-002]] [[Na hipocalemia, a repolarização se alonga (T achatada, onda U) e o músculo enfraquece, das pernas para cima.|q-famema2025-013,q-famerp2022-062,q-didepm-071]]`,
      fragmentos: [
        { id: "k-hiper", titulo: "Hipercalemia: estabilizar, deslocar, remover", conferir: true, diretrizes: ["kdigo-potassio"],
          figuras: [{ arquivo: "figuras/hipercalemia.svg", legenda: "Esquema autoral: as três etapas do tratamento da hipercalemia com alteração no ECG." }],
          casos: ["q-usp2022-019","q-sirio2027-002"],
          questoes: ["q-usp2022-019","q-usp2026-021","q-usprp2024-076","q-usprp2026-082","q-amrigs2021-012","q-amrigs2021-018","q-famema2025-096","q-sessp2026-006","q-tp20231-029","q-unicampdis2022-001","q-sirio2025-004","q-sirio2027-002","q-fmabc2025-027","q-fmabc2022-001","q-einstein2027-002"],
          prosa: `[[Com alteração no ECG, o primeiro passo é o gluconato de cálcio EV: ele não baixa o potássio, mas eleva o limiar de disparo e protege o miocárdio em minutos.|q-usp2022-019,q-usprp2024-076,q-usprp2026-082,q-unicampdis2022-001,q-sessp2026-006,q-tp20231-029,q-sirio2027-002,q-fmabc2022-001]] [[Em seguida desloca-se o potássio para dentro da célula com insulina e glicose (10 UI de insulina regular com 50 g de glicose, ou 1 UI para 5 g) e beta-2 inalatório; o bicarbonato só ajuda quando há acidose.|q-famema2025-096,q-einstein2027-002,q-fmabc2025-027]] [[Por fim se remove: diurético de alça se há diurese e congestão, resinas ou ciclossilicato, e diálise quando a função renal não responde.|q-einstein2027-002,q-usp2026-021]] [[As causas são excreção renal baixa (DRC, a mais comum), drogas que bloqueiam o eixo renina-aldosterona (IECA, BRA, espironolactona, trimetoprim, AINE), acidose tubular tipo 4 e insuficiência adrenal; a ATR tipo 2 (proximal) perde potássio.|q-amrigs2021-012,q-fmabc2025-027,q-usprp2026-082]] [[Hipercalemia leve, sem alteração no ECG e em paciente estável, trata-se no ambulatório: rever as drogas (espironolactona) e acrescentar diurético e bicarbonato se há acidose.|q-sirio2025-004]]`,
          texto: `- ECG alterado: **gluconato de cálcio EV** primeiro. {q-usp2022-019,q-usprp2024-076,q-usprp2026-082,q-unicampdis2022-001,q-sessp2026-006,q-tp20231-029,q-sirio2027-002,q-fmabc2022-001}
- Hipercalemia: **T apiculada** e **QRS largo**. {q-amrigs2021-018}
- Polarizante: **1 UI de insulina para 5 g de glicose**. {q-famema2025-096}
- Depois: **insulina-glicose** e bicarbonato se acidose, e remover. {q-einstein2027-002}
- Com congestão e diurese: **furosemida**. {q-usp2026-021}
- Causa mais comum: **insuficiência renal**. {q-fmabc2025-027}
- **ATR tipo 2** não causa hipercalemia. {q-amrigs2021-012}
- Ambulatorial sem ECG grave: **suspender espironolactona**, furosemida e bicarbonato. {q-sirio2025-004}` },
        { id: "k-hipo", titulo: "Hipocalemia e acidose tubular", conferir: true, diretrizes: ["kdigo-potassio"],
          questoes: ["q-usp2026-002","q-famema2025-013","q-famerp2023-078","q-famerp2025-006","q-famerp2026-050","q-famerp2022-062","q-fmabc2021-024","q-didepm-071","q-uspsp4-070"],
          prosa: `[[A reposição venosa periférica fica em até 10 mEq/h, porque acima disso dói, causa flebite e arrisca arritmia; com magnésio baixo o potássio não se corrige, porque o rim continua a perdê-lo.|q-famema2025-013,q-didepm-071]] [[A furosemida bloqueia o cotransportador Na-K-2Cl da alça e leva sódio ao túbulo distal, onde ele é trocado por potássio: hipocalemia com alcalose.|q-famerp2022-062]] [[Hipocalemia com acidose hiperclorêmica (ânion gap normal) aponta para perda de bicarbonato, pelo intestino (diarreia, fístula de delgado) ou pelo rim na acidose tubular distal (tipo 1), que tem urina com pH > 5,5 e é típica da síndrome de Sjögren.|q-famerp2023-078,q-famerp2025-006,q-famerp2026-050,q-uspsp4-070]] [[Aminoglicosídeos lesam o túbulo e fazem perder potássio e magnésio mesmo com a creatinina alta.|q-fmabc2021-024]]`,
          texto: `- Veia periférica: **até 10 mEq/h**; acima, dor e flebite. {q-famema2025-013,q-didepm-071}
- Corrigir o **magnésio** junto. {q-famema2025-013}
- Furosemida: bloqueia **Na-K-2Cl**. {q-famerp2022-062}
- HipoK + acidose hiperclorêmica + urina alcalina: **ATR distal (Sjögren)**. {q-famerp2023-078,q-famerp2025-006,q-famerp2026-050}
- Fístula de delgado: **hipocalemia e acidose metabólica**. {q-uspsp4-070}
- Gentamicina: **hipocalemia** com lesão renal. {q-fmabc2021-024}
- Diarreia: **aldosterona** sobe. {q-usp2026-002}` },
      ],
    },
    {
      id: "mg-ca-p", titulo: "Magnésio, cálcio e fósforo",
      introducao: `[[O magnésio é cofator da Na-K-ATPase e da liberação de PTH: sem ele o rim perde potássio e a paratireoide não responde, por isso a hipomagnesemia do etilista vem com hipocalemia, hipocalcemia e convulsão.|q-famerp2025-001,q-sirio2026-003]] [[O excesso de magnésio, quase sempre em renal crônico que toma suplemento ou antiácido, deprime reflexos, condução e pressão; o cálcio EV antagoniza o efeito e a diálise remove.|q-unifesp2026-029]]

[[Quando o desnutrido volta a receber glicose, a insulina leva fosfato, potássio e magnésio para dentro da célula: é a síndrome de realimentação, com hipofosfatemia, fraqueza e insuficiência respiratória.|q-uspsp2-078,q-amrigs2023-003]] [[Tumor volumoso e muito sensível à quimioterapia libera potássio, fosfato e ácido úrico ao morrer (lise tumoral), com hipocalcemia secundária e lesão renal.|q-unesp2022-054]]`,
      fragmentos: [
        { id: "mg-condutas", titulo: "Condutas nos distúrbios de Mg, Ca e P", conferir: true,
          questoes: ["q-famerp2025-001","q-sirio2026-003","q-unifesp2026-029","q-uspsp2-078","q-unesp2022-054"],
          prosa: `[[Na realimentação, reduz-se a velocidade da nutrição e repõem-se fósforo, potássio e magnésio.|q-uspsp2-078]] [[Na suspeita de lise tumoral, hidratar e dosar potássio, fosfato, cálcio, ácido úrico e creatinina antes de tudo.|q-unesp2022-054]]`,
          texto: `- Etilista com Mg baixo: **hipocalcemia**, hipocalemia e convulsão. {q-famerp2025-001,q-sirio2026-003}
- Hipermagnesemia na DRC: **gluconato de cálcio e diálise**. {q-unifesp2026-029}
- Realimentação: **reduzir a NPT e repor P, K e Mg**. {q-uspsp2-078}
- Quimioterapia de tumor volumoso: **hidratar e dosar eletrólitos** (lise tumoral). {q-unesp2022-054}` },
      ],
    },
    {
      id: "acido-base", titulo: "Equilíbrio ácido-base",
      introducao: `[[A gasometria se lê em passos: o pH diz acidemia ou alcalemia; o pCO2 e o bicarbonato dizem se o primário é respiratório ou metabólico; a compensação esperada diz se há outro distúrbio junto. Na acidose metabólica, o pCO2 esperado é 1,5 × HCO3 + 8 (± 2) (fórmula de Winter); pCO2 acima disso é acidose respiratória associada, abaixo é alcalose respiratória associada.|q-unifesp2025-033,q-scmsp2023-013,q-usp2024-065,q-unesp2024-054,q-simepm89-056,q-uspsp5-019]] [[O ânion gap (Na − Cl − HCO3, normal 8–12) separa a acidose por ácido acrescentado (lactato, cetoácidos, uremia, salicilato, álcoois tóxicos), com gap alto, da perda de bicarbonato, hiperclorêmica e com gap normal.|q-usprp2023-009,q-famerp2025-010,q-udisc20262-033,q-fmabc2021-038,q-usp2024-065]]`,
      fragmentos: [
        { id: "ab-acidose", titulo: "Acidose metabólica e distúrbios mistos", conferir: true,
          questoes: ["q-unifesp2025-033","q-scmsp2023-013","q-scmsp2023-014","q-usp2024-065","q-usprp2023-009","q-unesp2024-054","q-famerp2025-010","q-udisc20262-033","q-uspsp5-019","q-simepm89-056","q-fmabc2021-038","q-tp20231-056"],
          prosa: `[[O salicilato estimula o centro respiratório e acrescenta ácido: alcalose respiratória com acidose metabólica de gap alto é a assinatura dele.|q-scmsp2023-013,q-scmsp2023-014]] [[Gap osmolar alto (osmolalidade medida menos a calculada > 10) com acidose de gap alto sugere metanol ou etilenoglicol.|q-usp2024-065]] [[Na sepse e no choque, o lactato faz acidose de gap alto; depois de crise convulsiva, o lactato e a hipoventilação somam acidose metabólica e respiratória.|q-unifesp2025-033,q-usprp2023-009,q-unesp2024-054]] [[A cetoacidose com vômitos pode juntar três distúrbios: acidose de gap alto, alcalose metabólica pela perda de ácido gástrico e alcalose respiratória pela pneumonia.|q-uspsp5-019]] [[O diabético renal crônico com hipercalemia e acidose hiperclorêmica tem acidose tubular tipo 4 (hipoaldosteronismo hiporreninêmico); a diarreia dá acidose hiperclorêmica por perda de bicarbonato.|q-udisc20262-033,q-famerp2025-010,q-fmabc2021-038]] [[Na acidose respiratória, o bicarbonato sobe 1 para cada 10 de pCO2 na aguda e 3,5 na crônica; pH baixo com pCO2 alto e bicarbonato pouco elevado é acidose respiratória parcialmente compensada.|q-tp20231-056,q-simepm89-056]]`,
          texto: `- Winter: pCO2 esperado = **1,5 × HCO3 + 8 ± 2**. {q-simepm89-056,q-unifesp2025-033}
- pCO2 acima do esperado: **acidose respiratória associada**. {q-usp2024-065,q-unesp2024-054}
- Alcalose respiratória + acidose de gap alto: **salicilato**. {q-scmsp2023-013,q-scmsp2023-014}
- Gap osmolar alto: **álcool tóxico**. {q-usp2024-065}
- Sepse: acidose de **gap aumentado**. {q-usprp2023-009}
- Vômitos na cetoacidose com pneumonia: **três distúrbios**. {q-uspsp5-019}
- Diarreia ou ATR: acidose **hiperclorêmica**. {q-famerp2025-010,q-udisc20262-033,q-fmabc2021-038}
- pH baixo, pCO2 alto: **acidose respiratória parcialmente compensada**. {q-tp20231-056}` },
        { id: "ab-alcalose", titulo: "Alcalose metabólica e distúrbios respiratórios", conferir: true,
          questoes: ["q-scmsp2025-002","q-usprp2023-064","q-tp20212-016","q-tp20222-002","q-simepm89-090","q-sirio2025-037","q-sirio2021-045"],
          prosa: `[[Vômito e sonda gástrica perdem ácido clorídrico: o bicarbonato fica, a hipovolemia e o cloro baixo impedem o rim de eliminá-lo, e a aldosterona troca sódio por potássio e H+, mantendo alcalose metabólica hipoclorêmica e hipocalêmica.|q-sirio2021-045,q-sirio2025-037]] [[Excesso de álcali na correção de acidose também gera alcalose metabólica.|q-simepm89-090]] [[Tiazídico causa alcalose metabólica; somada à hiperventilação da pneumonia, dá distúrbio misto alcalótico.|q-tp20212-016]] [[Ansiedade e ventilação mecânica excessiva fazem alcalose respiratória; o obeso hipoventilador retém CO2 e o rim compensa com bicarbonato alto.|q-scmsp2025-002,q-tp20222-002,q-usprp2023-064]]`,
          texto: `- Vômitos: **alcalose metabólica hipoclorêmica e hipocalêmica**. {q-sirio2021-045,q-sirio2025-037}
- pH 7,60 após bicarbonato: **correção exagerada com álcali**. {q-simepm89-090}
- Tiazídico + pneumonia: **alcalose metabólica e respiratória**. {q-tp20212-016}
- pCO2 baixo com HCO3 normal: **alcalose respiratória não compensada** (ansiedade, ventilador). {q-scmsp2025-002,q-tp20222-002}
- Obesidade-hipoventilação: **HCO3 alto** compensatório. {q-usprp2023-064}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `As armadilhas deste tema estão na ordem das condutas e no uso da palavra "imediata".`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-usp2026-021","q-sirio2025-004","q-famerp2023-072"],
          prosa: `[[A regra é cálcio quando o ECG mostra efeito da hipercalemia; com potássio de 5,8 e congestão sem alteração grave no ECG, a prova quis o diurético como conduta imediata.|q-usp2026-021]] [[Hipercalemia moderada em ambulatório com ECG pouco alterado: a prova preferiu ajustar a medicação e tratar fora da emergência.|q-sirio2025-004]] [[O bolus de salina hipertônica pode vir escrito como NaCl 20% diluído em soro: 10 mL a 20% (2 g) em 90 mL de soro fisiológico (mais 0,8 g) dá 100 mL a cerca de 2,8%, perto da salina a 3%.|q-famerp2023-072]]`,
          texto: `- K 5,8 com congestão e ECG pouco alterado: a prova quis **furosemida**, não cálcio. {q-usp2026-021}
- Hipercalemia moderada ambulatorial: **ajustar drogas**, sem emergência. {q-sirio2025-004}
- **NaCl 20% 10 mL + SF 90 mL** equivale ao bolus hipertônico. {q-famerp2023-072}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `As hiponatremias que a prova manda separar, resumidas pelo capítulo de água e sódio.`,
      fragmentos: [
        { id: "comp-hiponatremia", titulo: "Hiponatremia pela volemia", conferir: true,
          questoes: ["q-sessp2026-007","q-tp20231-007","q-unesp2021-044","q-sirio2026-008","q-usp2026-002"],
          prosa: `| Volemia | Exemplos | Na urinário | Conduta |
| --- | --- | --- | --- |
| Hipovolêmica | diarreia, vômitos | < 30 (diurético: > 30) | soro a 0,9% |
| Euvolêmica | SIADH, tiazídico em idosa | > 30 | restrição hídrica, tratar a causa |
| Hipervolêmica | insuficiência cardíaca, cirrose | baixo (se sem diurético) | restrição hídrica e diurético, não repor sódio |

[[A volemia e o sódio urinário apontam o mecanismo, e o mecanismo dita se a conduta é dar soro, restringir água ou tratar a doença de base.|q-sessp2026-007,q-tp20231-007,q-unesp2021-044,q-sirio2026-008,q-usp2026-002]]`,
          texto: `- Edema e IC: **hipervolêmica**, não repor sódio. {q-sessp2026-007,q-tp20231-007}
- Euvolêmica com tiazídico ou ISRS: **droga ou SIADH**. {q-unesp2021-044,q-sirio2026-008}
- Diarreia: **hipovolêmica**. {q-usp2026-002}` },
      ],
    },
  ],
});
