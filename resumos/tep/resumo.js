/* resumos/tep/resumo.js — resumo adaptativo de tromboembolismo pulmonar e hipertensão pulmonar
   (ass-tep): fatores de risco, quadro e ECG, probabilidade clínica, D-dímero e angiotomografia, gestante,
   estratificação de risco (sPESI, ventrículo direito, troponina), TEP de alto risco e trombólise,
   anticoagulantes e doses, tempo de tratamento, hipertensão pulmonar e TEP crônico; armadilhas e
   tabela da estratificação.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- tep */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "tep",
  titulo: "Tromboembolismo pulmonar",
  assunto: "ass-tep",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "esc-tep", texto: "ESC/ERS — Guidelines for the diagnosis and management of acute pulmonary embolism (2019)", lidoEm: null },
    { id: "chest-tev", texto: "CHEST — Antithrombotic Therapy for VTE Disease, 2ª atualização (2021)", lidoEm: null },
    { id: "esc-hp", texto: "ESC/ERS — Guidelines for pulmonary hypertension (2022)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição.", questoes: ["q-einstein2025-011"] },
    { motivo: "Derrame pleural por insuficiência cardíaca (NT-proBNP no líquido), classificado neste assunto por engano; o tema está em `pleura`.", questoes: ["q-sirio2026-004"] },
  ],
  doencas: [
    {
      id: "diagnostico", titulo: "Suspeita e diagnóstico",
      introducao: `[[O êmbolo vem quase sempre de uma TVP dos membros inferiores. Ao ocluir artérias pulmonares, ele cria **espaço morto** (pulmão ventilado e não perfundido) e desvia sangue para áreas mal ventiladas: daí a **hipoxemia** com pulmão "limpo" à ausculta e na radiografia. O ventrículo direito, de parede fina, dilata contra a pressão súbita; quando falha, vem o **choque**.|q-tp20251-058,q-unicamp2022-012,q-usprp2023-077]]

Veja também: **Doença venosa: TVP e varizes**, **Insuficiência cardíaca**, **Ventilação mecânica** e **Hemostasia**.`,
      fragmentos: [
        { id: "dx-fatores", titulo: "Fatores de risco", conferir: true, diretrizes: ["esc-tep"],
          questoes: ["q-famema2025-004","q-usp2023-046","q-tp20251-058","q-unifesp2025-036","q-sessp2022-003"],
          prosa: `[[São **fatores fortes**: fratura de membro inferior e cirurgia ortopédica (prótese, fêmur), **internação recente por insuficiência cardíaca ou fibrilação atrial**, trauma grave e **TVP ou TEP prévios**. Gestação, anticoncepcional, varizes, obesidade e idade são moderados ou fracos.|q-famema2025-004,q-usp2023-046,q-tp20251-058]] [[Eles se somam: **estrogênio** (inclusive na terapia hormonal da mulher trans) mais **cirurgia recente**; história familiar de "doença no sangue" sugere **trombofilia**.|q-unifesp2025-036,q-sessp2022-003]]`,
          texto: `- Fortes: **cirurgia ortopédica, internação por IC/FA, TEV prévio**. {q-famema2025-004,q-usp2023-046,q-tp20251-058}
- Estrogênio + cirurgia; família com trombose: **trombofilia**. {q-unifesp2025-036,q-sessp2022-003}` },
        { id: "dx-clinica", titulo: "Quadro clínico e eletrocardiograma", conferir: true,
          casos: ["q-uspsp1-063","q-amrigs2023-004"],
          questoes: ["q-iamspe2026-099","q-amrigs2023-004","q-uspsp1-063","q-tp20222-069","q-unicamp2022-012"],
          prosa: `[[Dispneia súbita, **dor pleurítica**, taquicardia, às vezes hemoptise e síncope, em paciente com câncer, cirurgia ou imobilização. Hipoxemia que **não melhora com oxigênio** e pulmão sem consolidação (como na covid com TEP) pede **angiotomografia**.|q-tp20222-069,q-unicamp2022-012]] [[O ECG mais comum é só **taquicardia sinusal**; sinais de **sobrecarga do VD** (S1Q3T3, bloqueio de ramo direito, inversão de T de V1 a V4) aparecem numa minoria (S1Q3T3 em cerca de 10 a 15%) e não são específicos, mas no contexto certo levam a **anticoagular**, não a antiagregar como numa síndrome coronariana.|q-iamspe2026-099,q-amrigs2023-004,q-uspsp1-063]]`,
          texto: `- Hipoxemia refratária com pulmão limpo: **angiotomografia**. {q-tp20222-069,q-unicamp2022-012}
- ECG: taquicardia; **S1Q3T3 em ~10–15%**; sobrecarga de VD → **anticoagular**. {q-iamspe2026-099,q-amrigs2023-004,q-uspsp1-063}` },
        { id: "dx-probabilidade", titulo: "Probabilidade clínica, D-dímero e angiotomografia", conferir: true, diretrizes: ["esc-tep"],
          questoes: ["q-didepm-026","q-einstein2026-008","q-unesp2022-043","q-famerp2022-057","q-tp20222-069"],
          prosa: `[[O primeiro passo é a **probabilidade clínica** (Wells ou Genebra). Na probabilidade **baixa ou intermediária**, dosa-se o **D-dímero**: normal, **exclui** TEP sem tomografia (na baixa, os critérios PERC podem dispensar até o D-dímero). Na probabilidade **alta**, vai-se direto à **angiotomografia**, porque D-dímero normal não basta para excluir.|q-didepm-026,q-einstein2026-008,q-famerp2022-057]] [[Com probabilidade intermediária ou alta e exame que vai demorar, **anticoagula-se enquanto se investiga**. Angiotomografia negativa com suspeita ainda forte: **mantém-se o anticoagulante** e procura-se a TVP com **Doppler de membros inferiores**.|q-einstein2026-008,q-unesp2022-043,q-tp20222-069]]`,
          texto: `- Baixa/intermediária: **D-dímero normal exclui**; alta: **angiotomografia**. {q-didepm-026,q-einstein2026-008,q-famerp2022-057}
- Suspeita forte: **anticoagular durante a investigação**; TC negativa → Doppler. {q-einstein2026-008,q-unesp2022-043,q-tp20222-069}` },
        { id: "dx-gestante", titulo: "Gestante com suspeita de TEP", conferir: true, diretrizes: ["esc-tep"],
          questoes: ["q-unifesp2023-020","q-usp2023-103"],
          prosa: `[[Na gestante, a investigação começa pelo exame **sem radiação**: se há sintomas de TVP (ou mesmo sem eles), **ultrassonografia (POCUS) dos membros inferiores**; trombose confirmada já autoriza tratar. O D-dímero sobe na gestação e perde valor.|q-usp2023-103]] [[Sem trombose na perna e suspeita alta, a **angiotomografia não é contraindicada** (a dose fetal é baixa): **heparina de baixo peso em dose plena** (1 mg/kg de 12/12 h) e tomografia.|q-unifesp2023-020]]`,
          texto: `- Gestante: **POCUS de membros inferiores** primeiro. {q-usp2023-103}
- Suspeita alta: **enoxaparina 1 mg/kg + angiotomografia** (permitida). {q-unifesp2023-020}` },
      ],
    },
    {
      id: "tratamento", titulo: "Estratificação e tratamento",
      introducao: `[[O que mata no TEP é o **ventrículo direito** que falha. Por isso, confirmado o diagnóstico, estratifica-se pelo que o VD está sofrendo: pressão arterial, escore clínico (sPESI), dilatação do VD no eco ou na tomografia e **troponina** e BNP. Daí sai quem trombolisa, quem interna monitorado e quem vai para casa.|q-famerp2022-057,q-einstein2022-013,q-adap25-036]]`,
      fragmentos: [
        { id: "tra-estratificacao", titulo: "Estratificar: sPESI, VD e troponina", conferir: true, diretrizes: ["esc-tep"],
          figuras: [{ arquivo: "figuras/tep-risco.svg", legenda: "Esquema autoral: estratificação do TEP pela pressão arterial, escore, ventrículo direito e troponina." }],
          questoes: ["q-einstein2022-013","q-famerp2022-057","q-adap25-036","q-scmsp2023-004"],
          prosa: `[[O **sPESI** soma um ponto para idade > 80, câncer, doença cardiopulmonar crônica, **FC ≥ 110**, **PAS < 100** e **SatO2 < 90%**; o PESI completo ainda inclui **temperatura < 36 °C**, sexo masculino, FR ≥ 30 e alteração mental.|q-einstein2022-013]] [[Paciente estável com **VD dilatado e troponina alta** é de **risco intermediário-alto**: **anticoagulação plena com internação monitorada**, deixando a trombólise para se ele instabilizar.|q-adap25-036,q-famerp2022-057]] [[Com PESI baixo e VD normal, é **baixo risco**: anticoagulante oral e alta precoce.|q-scmsp2023-004]]`,
          texto: `- PESI/sPESI: **FC ≥ 110, PAS < 100, T < 36**, SatO2 baixa, câncer, idade. {q-einstein2022-013}
- Estável com VD e troponina alterados: **anticoagular, internar monitorado**. {q-adap25-036,q-famerp2022-057}
- Baixo risco: **oral e alta precoce**. {q-scmsp2023-004}` },
        { id: "tra-instavel", titulo: "TEP de alto risco: trombólise", conferir: true, diretrizes: ["esc-tep"],
          casos: ["q-usprp2023-077"],
          questoes: ["q-usprp2023-077","q-sirio2024-004","q-fmabc2022-010","q-unifesp2025-036","q-sessp2024-001"],
          prosa: `[[**Choque ou hipotensão** (PAS < 90 mmHg) com TEP é **alto risco**: **trombólise com alteplase** (100 mg em 2 horas), que desfaz o trombo e alivia o VD em horas. Sem tomografia possível, um **ecocardiograma à beira-leito** com VD dilatado basta para decidir. Na **parada em atividade elétrica sem pulso** por TEP provável, trombolisa-se durante a reanimação. Quem estava estável e **entra em choque** durante a anticoagulação também recebe trombólise; com contraindicação a ela, **embolectomia**.|q-usprp2023-077,q-sirio2024-004,q-fmabc2022-010,q-unifesp2025-036]] [[Mas choque em paciente com TEP pode ter outra causa: febre, **VD normal e veia cava colabável** com infecção ativa é **choque séptico**; mantém-se a anticoagulação e trata-se a sepse.|q-sessp2024-001]]`,
          texto: `- TEP com **choque**: **alteplase**; eco à beira-leito basta. {q-usprp2023-077,q-sirio2024-004,q-unifesp2025-036}
- PCR em AESP por TEP: **trombolisar**. {q-fmabc2022-010}
- Choque com **VD normal**: outra causa (sepse). {q-sessp2024-001}` },
        { id: "tra-anticoagulante", titulo: "Qual anticoagulante e em que dose", conferir: true, diretrizes: ["chest-tev","esc-tep"],
          questoes: ["q-usprp2026-003","q-sessp2022-003","q-scmsp2023-004","q-tp20222-069","q-uspsp1-063"],
          prosa: `[[**Rivaroxabana** começa com dose de ataque, **15 mg de 12/12 h por 21 dias**, depois 20 mg/dia, sem heparina antes; **enoxaparina** em dose plena é **1 mg/kg de 12/12 h** (60 mg para 60 kg). Dabigatrana e edoxabana precisam de heparina nos primeiros dias.|q-usprp2026-003,q-sessp2022-003]] [[Na **doença renal**, entre os anticoagulantes orais diretos o de **menor excreção renal é a apixabana** (cerca de 27%); a dabigatrana é a mais dependente do rim. No paciente com **câncer**, heparina de baixo peso ou anticoagulante oral direto.|q-scmsp2023-004,q-tp20222-069,q-uspsp1-063]]`,
          texto: `- Rivaroxabana **15 mg 12/12 h por 21 dias**; enoxaparina **1 mg/kg 12/12 h**. {q-usprp2026-003,q-sessp2022-003}
- Doença renal: **apixabana**; câncer: HBPM ou oral direto. {q-scmsp2023-004,q-tp20222-069,q-uspsp1-063}` },
        { id: "tra-duracao", titulo: "Por quanto tempo", conferir: true, diretrizes: ["chest-tev"],
          questoes: ["q-adap23-020","q-unesp2021-052","q-sessp2023-070"],
          prosa: `[[O tempo depende do risco de voltar. TEP **provocado por fator transitório forte** (cirurgia recente): **3 meses** e parar, porque o risco de recorrência ao suspender é baixo. Sem fator (idiopático) ou com **câncer**, o risco de recorrência é maior e pondera-se **tratamento estendido**.|q-adap23-020,q-unesp2021-052,q-sessp2023-070]]`,
          texto: `- Provocado por cirurgia: **3 meses**; idiopático ou câncer: considerar estendido. {q-adap23-020,q-unesp2021-052,q-sessp2023-070}` },
      ],
    },
    {
      id: "hipertensao-pulmonar", titulo: "Hipertensão pulmonar",
      introducao: `[[Hipertensão pulmonar é pressão média da artéria pulmonar acima de 20 mmHg no cateterismo. Tem causas diferentes: doença do coração esquerdo, do pulmão, tromboembólica crônica e a **hipertensão arterial pulmonar**, em que a própria arteríola fecha.|q-iamspe2025-010,q-tp20252-113,q-sirio2024-005]]`,
      fragmentos: [
        { id: "hp-mecanismo", titulo: "Mecanismo e investigação", conferir: true, diretrizes: ["esc-hp"],
          casos: ["q-tp20252-113"],
          questoes: ["q-iamspe2025-010","q-tp20252-113","q-sirio2024-005"],
          prosa: `[[Na **hipertensão arterial pulmonar idiopática** o mecanismo é **vasoconstrição e remodelamento** da parede das pequenas artérias pulmonares (endotelina alta, óxido nítrico e prostaciclina baixos); não há êmbolo nem doença do coração esquerdo.|q-iamspe2025-010]] [[Dispneia progressiva com **segunda bulha pulmonar hiperfonética** e espirometria normal começa pelo **ecocardiograma** (pressão sistólica estimada); o cateterismo direito confirma depois.|q-tp20252-113]] [[Pressão pulmonar alta **3 meses** após um TEP pode ser resíduo ou começo de doença tromboembólica crônica: **manter a anticoagulação** e reavaliar (cintilografia); vasodilatador pulmonar não é o próximo passo.|q-sirio2024-005]]`,
          texto: `- HAP idiopática: **vasoconstrição e remodelamento**. {q-iamspe2025-010}
- Suspeita de HP: **ecocardiograma** primeiro. {q-tp20252-113}
- HP após TEP: **manter anticoagulação** e investigar crônica. {q-sirio2024-005}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["esc-tep"],
          questoes: ["q-adap25-036","q-einstein2026-008","q-sessp2024-001","q-iamspe2026-099"],
          prosa: `[[**VD dilatado e troponina alta não indicam trombólise** no paciente estável: o risco de sangramento supera o benefício; anticoagula-se e monitoriza-se.|q-adap25-036]] [[**Anticoagular antes do D-dímero**: a einstein2026-008 indicou enoxaparina já na probabilidade **intermediária** enquanto se dosa o D-dímero; na baixa, só o exame.|q-einstein2026-008]] [[**Choque não é sinônimo de TEP maciço**: com VD normal e febre, a sessp2024-001 tratou a sepse.|q-sessp2024-001]] [[**S1Q3T3** é pouco sensível; a alternativa que o dá em 60–70% dos casos está errada.|q-iamspe2026-099]]`,
          texto: `- Estável com VD alterado: **sem trombólise**. {q-adap25-036}
- Probabilidade intermediária: a prova anticoagulou **antes** do D-dímero. {q-einstein2026-008}
- Choque com VD normal: **não trombolisar**. {q-sessp2024-001}
- S1Q3T3: **10–15%**. {q-iamspe2026-099}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: estratificação do TEP",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-risco", titulo: "Risco, achados e conduta", conferir: true,
          questoes: ["q-sirio2024-004","q-adap25-036","q-scmsp2023-004","q-einstein2022-013"],
          prosa: `[[A pressão e o VD decidem a conduta.|q-sirio2024-004,q-adap25-036,q-scmsp2023-004,q-einstein2022-013]]

| Risco | Achados | Conduta |
|---|---|---|
| Alto | choque ou PAS < 90 | trombólise (alteplase) |
| Intermediário-alto | estável, VD dilatado e troponina alta | anticoagular, internar monitorado |
| Intermediário-baixo | estável, sPESI ≥ 1, VD ou troponina alterado (um ou nenhum) | anticoagular, internar |
| Baixo | sPESI 0, VD normal | anticoagulante oral, alta precoce |`,
          texto: `- Choque: **trombólise**. {q-sirio2024-004}
- VD + troponina: **monitorar**. {q-adap25-036}
- sPESI 0: **alta precoce**. {q-scmsp2023-004,q-einstein2022-013}` },
      ],
    },
  ],
});
