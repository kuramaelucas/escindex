/* resumos/anafilaxia/resumo.js — resumo adaptativo de anafilaxia, urticária e angioedema
   (ass-alergia-anafilaxia): mecanismo IgE/mastócito, critérios de anafilaxia, adrenalina IM (dose,
   via, diluição), medidas associadas, betabloqueado e glucagon, observação, triptase, alta com
   autoinjetor, causas (alimentos, himenópteros, látex, fármacos, perioperatória), urticária aguda,
   angioedema (AINE, hereditário/C1-inibidor); armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- anafilaxia */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "anafilaxia",
  titulo: "Anafilaxia, urticária e angioedema",
  assunto: "ass-alergia-anafilaxia",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "wao-2020", texto: "World Allergy Organization — Anaphylaxis guidance 2020 (World Allergy Organ J 2020) e EAACI 2021", lidoEm: null },
    { id: "eaaci-urticaria", texto: "EAACI/GA²LEN/EuroGuiDerm/APAAACI — guideline for urticaria (Allergy 2022)", lidoEm: null },
    { id: "angioedema", texto: "WAO/EAACI — guideline for the management of hereditary angioedema (2021)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "anafilaxia", titulo: "Anafilaxia",
      introducao: `[[Na anafilaxia, o alérgeno faz **ligação cruzada de IgE** na superfície de mastócitos e basófilos, que degranulam de uma vez: histamina, triptase e leucotrienos dilatam vasos, abrem capilares e contraem brônquios. Em minutos aparecem pele (urticária, angioedema), respiração (estridor, sibilos), circulação (hipotensão, síncope) e intestino (vômitos, cólica). O que reduz a mortalidade é **adrenalina precoce**.|q-tp20202-014,q-tp20251-031,q-simepm89-044,q-unifesp2022-092,q-unesp2022-006]]

Veja também: **Asma**, **Choque**, **Alergia alimentar** e **Acidentes por animais peçonhentos** quando houver resumo.`,
      fragmentos: [
        { id: "ana-diagnostico", titulo: "Reconhecer", conferir: true, diretrizes: ["wao-2020"],
          figuras: [{ arquivo: "figuras/anafilaxia.svg", legenda: "Esquema autoral: os sistemas atingidos na degranulação do mastócito e a conduta na ordem certa." }],
          casos: ["q-usp2023-081","q-unesp2023-008"],
          questoes: ["q-tp20202-014","q-tp20251-031","q-simepm89-044","q-tp20231-053","q-unicampdis2024-026","q-fmabc2021-032","q-fmabc2026-044","q-usprp2026-049","q-sirio2021-050","q-usp2023-081","q-unesp2023-008"],
          prosa: `[[É anafilaxia quando, minutos a horas depois de exposição provável, há **pele/mucosa** com comprometimento **respiratório, circulatório ou gastrointestinal grave** — ou hipotensão ou broncoespasmo isolados após alérgeno conhecido. Não precisa haver choque: edema de lábios com vômitos e cólica após crustáceo já é anafilaxia.|q-tp20231-053,q-fmabc2021-032,q-fmabc2026-044,q-usprp2026-049,q-sirio2021-050]] [[Choque com pele pouco alterada também é anafilaxia (**choque anafilático**, distributivo), como na criança alérgica ao látex que chega sonolenta e hipotensa.|q-unicampdis2024-026,q-usp2023-081,q-unesp2023-008]]`,
          texto: `- Pele + **respiratório, circulatório ou GI** = anafilaxia; IgE e mastócito. {q-tp20202-014,q-tp20251-031,q-simepm89-044,q-tp20231-053,q-fmabc2021-032,q-fmabc2026-044,q-usprp2026-049,q-sirio2021-050}
- Choque anafilático = distributivo. {q-unicampdis2024-026,q-usp2023-081,q-unesp2023-008}` },
        { id: "ana-tratamento", titulo: "Tratar", conferir: true, diretrizes: ["wao-2020"],
          questoes: ["q-adap26-097","q-famema2025-099","q-unicampdis2024-009","q-scmsp2023-057","q-tp20251-042","q-tp20261-117","q-sessp2022-050","q-einstein2021-022","q-scmsp2022-065","q-scmsp2023-058","q-unifesp2022-092","q-unesp2022-006"],
          prosa: `[[**Adrenalina intramuscular** na face anterolateral da coxa, **1 mg/mL (1:1.000)**, **0,01 mg/kg** (máximo **0,5 mg** no adulto, 0,3 mg na criança), repetida a cada 5–15 minutos se preciso. Ela contrai vasos, abre brônquios e estabiliza o mastócito; anti-histamínico e corticoide não substituem.|q-adap26-097,q-famema2025-099,q-unicampdis2024-009,q-scmsp2023-057,q-sessp2022-050,q-einstein2021-022,q-unifesp2022-092,q-unesp2022-006]] [[Junto: **decúbito com pernas elevadas**, oxigênio, acesso e **expansão volêmica**. Adrenalina venosa fica para choque refratário, em ambiente monitorizado (anestesistas na anafilaxia perioperatória).|q-tp20251-042,q-tp20261-117,q-scmsp2022-065]] [[Quem usa **betabloqueador** pode não responder à adrenalina: **glucagon**, que aumenta o AMPc sem passar pelo receptor beta.|q-scmsp2023-058]]`,
          texto: `- **Adrenalina IM 1:1.000, 0,01 mg/kg (máx. 0,5)**, coxa, repetir. {q-adap26-097,q-famema2025-099,q-unicampdis2024-009,q-scmsp2023-057,q-sessp2022-050,q-einstein2021-022}
- **Pernas elevadas, O2, volume**; IV só refratário. {q-tp20251-042,q-tp20261-117,q-scmsp2022-065}
- Betabloqueado: **glucagon**. {q-scmsp2023-058}` },
        { id: "ana-depois", titulo: "Depois da crise e causas especiais", conferir: true, diretrizes: ["wao-2020"],
          questoes: ["q-uspsp4-114","q-uspsp3-045","q-unifesp2026-097","q-adap22-092","q-adap23-065","q-unifesp2023-065"],
          prosa: `[[Observar por **pelo menos 6 horas** (reação bifásica) e encaminhar ao **alergista/imunologista**.|q-uspsp4-114,q-uspsp3-045,q-unifesp2026-097]] [[Alta com **adrenalina autoinjetável**, treino de uso, **plano de ação escrito**, evitar o alérgeno e acompanhamento especializado.|q-adap22-092]] [[Na reação perioperatória, a **triptase** colhida 1–2 horas após o início, comparada com a basal, confirma degranulação; o alergista faz os testes depois. Criança com **mielomeningocele** operada várias vezes: **látex**.|q-adap23-065,q-unifesp2023-065]]`,
          texto: `- **Observar ≥ 6 h**; alergista. {q-uspsp4-114,q-uspsp3-045,q-unifesp2026-097}
- **Autoinjetor + plano escrito**. {q-adap22-092}
- **Triptase em 1–2 h**; mielomeningocele: **látex**. {q-adap23-065,q-unifesp2023-065}` },
      ],
    },
    {
      id: "urticaria", titulo: "Urticária e angioedema",
      introducao: `[[A urtica é edema da derme por histamina: pápula ou placa pruriginosa, com centro edemaciado, que **some em menos de 24 horas sem deixar marca**. O angioedema é o mesmo processo na derme profunda e no subcutâneo, mais doloroso que pruriginoso. Sem sinal sistêmico, não é anafilaxia.|q-unesp2025-013,q-tp20222-050,q-sessp2025-043]]`,
      fragmentos: [
        { id: "urt-quadro", titulo: "Urticária aguda e angioedema", conferir: true, diretrizes: ["eaaci-urticaria","angioedema"],
          casos: ["q-tp20222-050","q-unesp2022-017"],
          questoes: ["q-unesp2025-013","q-tp20222-050","q-sessp2025-043","q-unesp2022-017","q-fmabc2025-058","q-usp2026-015","q-einstein2027-006","q-amrigs2024-018"],
          prosa: `[[**Urticária aguda** (< 6 semanas), na criança quase sempre **infecciosa**; também por alimentos e fármacos. Tratamento: **anti-histamínico de segunda geração** oral (fexofenadina, loratadina) e retirar o gatilho — por exemplo, suspender a amoxicilina.|q-unesp2025-013,q-tp20222-050,q-sessp2025-043,q-unesp2022-017,q-fmabc2025-058]] [[Edema de lábios após **AINE** sem sinais de gravidade (sem dispneia, voz e saturação normais): reação de hipersensibilidade a AINE — **anti-histamínico e observação**; episódios repetidos ligados a analgésicos não são anafilaxia.|q-usp2026-015,q-einstein2027-006]] [[Angioedema sem urtica, recorrente, que não responde a anti-histamínico: pensar em **angioedema hereditário** (bradicinina) — dosar **C4 e C1-inibidor**.|q-amrigs2024-018]]`,
          texto: `- Urtica some em < 24 h; aguda infecciosa → **anti-histamínico 2.ª geração**. {q-unesp2025-013,q-tp20222-050,q-sessp2025-043,q-unesp2022-017,q-fmabc2025-058}
- Angioedema por AINE sem gravidade: **anti-histamínico**. {q-usp2026-015,q-einstein2027-006}
- Hereditário: **C1-inibidor**. {q-amrigs2024-018}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["wao-2020"],
          questoes: ["q-unesp2023-008","q-unifesp2026-097","q-usp2026-015","q-uspsp4-114"],
          prosa: `[[**Diluição da adrenalina IM**: é 1 mg/mL (1:1.000); a unesp2023-008 escreveu **1:10.000** 0,3 mg IM.|q-unesp2023-008]] [[**Corticoide após anafilaxia**: não previne reação bifásica de forma comprovada; a unifesp2026-097 prescreveu **corticoide oral** com observação de 6 horas.|q-unifesp2026-097]] [[**Diagnóstico pelo tempo**: angioedema recorrente há 8 meses ligado a AINE seria crônico ou induzido; a usp2026-015 chamou de **urticária aguda**.|q-usp2026-015]] [[**Tempo de observação**: diretrizes aceitam de 4 a 6 horas conforme a gravidade; as provas pedem **6 horas**.|q-uspsp4-114]]`,
          texto: `- A prova escreveu **1:10.000**. {q-unesp2023-008}
- **Corticoide** na alta. {q-unifesp2026-097}
- AINE recorrente = **urticária aguda** na prova. {q-usp2026-015}
- **6 horas**. {q-uspsp4-114}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: urticária, angioedema e anafilaxia",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-reacoes", titulo: "Como separar e tratar", conferir: true,
          questoes: ["q-tp20222-050","q-einstein2027-006","q-amrigs2024-018","q-adap26-097"],
          prosa: `[[O que define a conduta é haver outro sistema atingido.|q-tp20222-050,q-einstein2027-006,q-amrigs2024-018,q-adap26-097]]

| | Urticária | Angioedema histaminérgico | Angioedema hereditário | Anafilaxia |
| Mediador | histamina | histamina | bradicinina | histamina e outros |
| Pele | urticas < 24 h | edema profundo | edema sem urtica | urtica, angioedema |
| Outros sistemas | não | não | laringe, intestino | respiratório, circulatório, GI |
| Tratamento | anti-histamínico | anti-histamínico | concentrado de C1-inibidor, icatibanto | adrenalina IM |`,
          texto: `- Só pele: **anti-histamínico**. {q-tp20222-050,q-einstein2027-006}
- Bradicinina: **C1-inibidor**. {q-amrigs2024-018}
- Sistêmica: **adrenalina**. {q-adap26-097}` },
      ],
    },
  ],
});
