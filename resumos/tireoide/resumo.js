/* resumos/tireoide/resumo.js — resumo adaptativo de tireoidopatias: fisiologia e exames, hipotireoidismo
   (clínico, subclínico, gestação, idoso, levotiroxina), tireotoxicose (Graves, bócio tóxico, tireoidites,
   amiodarona, crise tireotóxica, antitireoidianos), nódulo tireoidiano (TI-RADS, PAAF) e câncer
   (papilífero, medular, pós-operatório), e tabela comparativa no fim. Molde: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- tireoide */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "tireoide",
  titulo: "Tireoidopatias",
  assunto: "ass-tireoide",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "ata-dtc", texto: "ATA — Management Guidelines for Adult Patients with Differentiated Thyroid Cancer (2025)", lidoEm: null },
    { id: "ata-hiper", texto: "ATA — Guidelines for the Diagnosis and Management of Hyperthyroidism and Other Causes of Thyrotoxicosis (2016)", lidoEm: null },
    { id: "ata-hipo", texto: "ATA — Guidelines for the Treatment of Hypothyroidism (2014) e ATA tireoide na gestação (2017)", lidoEm: null },
    { id: "acr-tirads", texto: "ACR TI-RADS — White paper (2017)", lidoEm: null },
    { id: "sbem-tireoide", texto: "SBEM — Consensos brasileiros de hipotireoidismo subclínico e tireoide na gestação", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anuladas, sem reposição", questoes: ["q-iamspe2022-006","q-sessp2024-024"] },
  ],
  doencas: [
    {
      id: "fisiologia", titulo: "Fisiologia e exames",
      introducao: `[[O T4 e o T3 se formam na tireoglobulina, guardada no coloide do folículo: a tireoperoxidase oxida o iodo e o liga à tirosina, e o T4 vira T3 (a forma ativa) nos tecidos.|q-fmabc2025-007]] [[O TSH responde em log ao hormônio livre: pequena mudança do T4 move muito o TSH, e por isso o TSH é o primeiro exame — alto no hipotireoidismo primário, suprimido na tireotoxicose primária.|q-usprp2022-013,q-unicamp2022-006,q-famema2022-037,q-tp20231-023]] [[Remédios mudam a função: a amiodarona, rica em iodo, causa hipo ou hipertireoidismo; anticonvulsivantes indutores (carbamazepina) aceleram o metabolismo da levotiroxina.|q-sirio2022-007,q-famema2022-030,q-fmabc2024-016]]

Veja também: **Triagem neonatal** (hipotireoidismo congênito) e **Crescimento e puberdade** (hipotireoidismo e baixa estatura).`,
      fragmentos: [
        { id: "fis-exames", titulo: "TSH primeiro e interferências", conferir: true,
          questoes: ["q-fmabc2025-007","q-usprp2022-013","q-unicamp2022-006","q-famema2022-037","q-usprp2026-054","q-sirio2022-007","q-famema2022-030","q-unifesp2022-084"],
          texto: `- Síntese: **tireoglobulina**, armazenada no **coloide**. {q-fmabc2025-007}
- Suspeita de disfunção: **TSH (e T4 livre)**. {q-usprp2022-013,q-unicamp2022-006}
- FA com emagrecimento no idoso: **TSH, T4 livre**, controlar FC e anticoagular. {q-famema2022-037}
- Adolescente com taquiarritmia: **função tireoidiana**, hemograma e fígado. {q-usprp2026-054}
- Amiodarona: pode **suprimir o TSH** (tireotoxicose). {q-sirio2022-007}
- Carbamazepina: **aumenta o clearance** da levotiroxina. {q-famema2022-030}
- Amenorreia com prolactina alta e TSH alto: **hipotireoidismo primário** (o TRH estimula prolactina). {q-unifesp2022-084}` },
      ],
    },
    {
      id: "hipo", titulo: "Hipotireoidismo",
      introducao: `[[A causa mais comum onde há iodo suficiente é a tireoidite de Hashimoto, autoimune (anti-TPO positivo, linfócitos T e anticorpos destroem o folículo); no mundo, a falta de iodo.|q-iamspe2021-015,q-unifesp2024-036,q-tp20231-051,q-tp20212-049]] [[Sem hormônio, o metabolismo desacelera: fadiga, ganho de peso, constipação, pele seca, frio, bradicardia, reflexos lentos, hiponatremia, colesterol e homocisteína altos, e mixedema por acúmulo de glicosaminoglicanos.|q-sirio2023-001,q-tp20222-030,q-iamspe2023-009,q-amrigs2020-008]]

[[No subclínico (TSH alto, T4 livre normal), primeiro se repete o TSH em 2 a 3 meses, porque metade normaliza; trata-se com TSH acima de 10, e entre 4,5 e 10 pesa-se idade, anti-TPO, sintomas e risco cardiovascular — no idoso, TSH levemente alto pode ser normal.|q-unifesp2023-003,q-famerp2022-058,q-unesp2025-055,q-famerp2026-059]]`,
      fragmentos: [
        { id: "hipo-diagnostico", titulo: "Diagnóstico e subclínico", conferir: true, diretrizes: ["ata-hipo","sbem-tireoide"],
          questoes: ["q-iamspe2021-015","q-unifesp2024-036","q-tp20231-051","q-tp20212-049","q-sirio2023-001","q-tp20222-030","q-iamspe2023-009","q-amrigs2020-008","q-unifesp2023-003","q-famerp2022-058","q-unesp2025-055","q-famerp2026-059","q-iamspe2023-033","q-tp20232-049"],
          texto: `- Causas: **deficiência de iodo e tireoidite autoimune**. {q-iamspe2021-015}
- Constipação e fadiga: esperar **anti-TPO positivo**. {q-unifesp2024-036}
- Mediadores: **anticorpos e linfócitos T**. {q-tp20231-051}
- Hashimoto na adolescente: **T4 livre baixo e TSH alto**. {q-tp20212-049}
- Achados: **homocisteína alta, sódio baixo**; anasarca. {q-sirio2023-001,q-iamspe2023-009}
- TSH 64 com sintomas: **levotiroxina**. {q-tp20222-030}
- Afirmativa incorreta: média de idade ao diagnóstico **não** é 40 anos (é mais tarde). {q-amrigs2020-008}
- Subclínico leve: **repetir TSH em 2–3 meses**. {q-unifesp2023-003,q-famerp2022-058}
- TSH entre 4,5 e 10 com anti-TPO negativo: decidir pelo **risco cardiovascular**. {q-unesp2025-055}
- Idoso de 81 anos com TSH pouco alto: **expectante**. {q-famerp2026-059}
- Adolescente com TSH alto: **repetir com anticorpos**. {q-iamspe2023-033}
- Criança obesa com TSH 6,5: **seguimento** (a obesidade eleva o TSH). {q-tp20232-049}` },
        { id: "hipo-tratamento", titulo: "Levotiroxina, idoso e gestação", conferir: true, diretrizes: ["ata-hipo","sbem-tireoide"],
          questoes: ["q-uspsp5-089","q-scmsp2022-080","q-amrigs2024-010","q-adap21-106","q-unicamp2023-014","q-tp20251-014","q-usprp2022-049","q-uspsp5-046","q-sessp2024-078"],
          prosa: `[[A dose plena é cerca de 1,6 mcg/kg/dia, em jejum, com água, 30 a 60 minutos antes do café; no idoso e no coronariopata começa com 25 a 50 mcg e sobe a cada 4 a 6 semanas, para não precipitar angina; o TSH se reavalia em 6 a 8 semanas.|q-uspsp5-089,q-scmsp2022-080,q-adap21-106,q-unicamp2023-014]] [[Na gestação, o hormônio materno forma o cérebro do feto no primeiro trimestre: o TSH acima do limite da gestação, sobretudo com anti-TPO positivo, é tratado.|q-usprp2022-049,q-uspsp5-046,q-sessp2024-078]]`,
          texto: `- Dose: **1,6 mcg/kg/dia**, TSH em 6–8 semanas. {q-uspsp5-089}
- Tomar **em jejum, com água, 30 min antes** do café. {q-scmsp2022-080}
- Pode começar dose plena no jovem; indutores enzimáticos pedem ajuste. {q-amrigs2024-010}
- Coronariopata ou idoso: **25–50 mcg** e aumentar devagar. {q-adap21-106,q-unicamp2023-014}
- TSH suprimido em uso de levotiroxina: **reduzir a dose**. {q-tp20251-014}
- Gestante com TSH alto e anti-TPO +: **levotiroxina**. {q-usprp2022-049,q-uspsp5-046}
- Rastreio na gestação: **TSH no início do pré-natal** onde há recurso. {q-sessp2024-078}` },
      ],
    },
    {
      id: "hiper", titulo: "Tireotoxicose",
      introducao: `[[Na doença de Graves, anticorpos estimulam o receptor do TSH (TRAb): bócio difuso com sopro, captação alta, e manifestações próprias — oftalmopatia e dermopatia (mixedema pré-tibial) — pela reação contra fibroblastos da órbita e da pele.|q-adap24-068,q-usprp2021-106,q-tp20212-033,q-udisc20262-032,q-unifesp2026-030,q-unesp2026-045]] [[Na tireoidite subaguda (de Quervain), depois de uma virose, o folículo inflama e solta hormônio pronto: dor cervical, VHS alto, captação baixa; segue as fases tireotoxicose, eutireoidismo, hipotireoidismo e cura, e se trata com betabloqueador e anti-inflamatório, sem antitireoidiano.|q-adap23-003,q-unesp2022-046]]

[[O metimazol bloqueia a tireoperoxidase; antes de usar, pedem-se hemograma e enzimas hepáticas, porque o efeito grave é a agranulocitose — febre e dor de garganta exigem hemograma e, com neutrófilos abaixo de 500, suspensão e antibiótico.|q-sirio2025-008,q-uspsp4-023,q-einstein2023-006]] [[A crise tireotóxica (escore de Burch-Wartofsky) é tratada com antitireoidiano, betabloqueador, iodo depois do antitireoidiano e corticoide.|q-scmsp2022-067,q-tp20252-023]]`,
      fragmentos: [
        { id: "hiper-causas", titulo: "Graves, bócio tóxico e tireoidites", conferir: true, diretrizes: ["ata-hiper"],
          casos: ["q-usprp2021-106"],
          questoes: ["q-adap24-068","q-usprp2021-106","q-tp20212-033","q-udisc20262-032","q-unifesp2026-030","q-unesp2026-045","q-tp20231-023","q-amrigs2020-009","q-sirio2025-007","q-adap23-003","q-unesp2022-046","q-fmabc2024-016","q-einstein2027-004","q-usp2022-092"],
          texto: `- Mais específico do Graves: **TRAb**. {q-adap24-068,q-usprp2021-106}
- Jovem com bócio difuso, T4 e T3 altos: **Graves**. {q-tp20212-033,q-udisc20262-032,q-unesp2026-045}
- Emagrecimento com olhos vermelhos: **hipertireoidismo autoimune** (oftalmopatia). {q-unifesp2026-030}
- TSH suprimido com T4 livre alto: **hipertireoidismo primário**. {q-tp20231-023}
- Sinais de tireotoxicose; **edema pré-tibial** é do Graves. {q-amrigs2020-009}
- Nódulos com captação: **bócio multinodular tóxico**. {q-sirio2025-007}
- Dor cervical, captação 2%: **subaguda**, betabloqueador e AINE. {q-adap23-003}
- Subaguda: **quatro fases**. {q-unesp2022-046}
- Tireotoxicose por amiodarona: **metimazol e/ou corticoide**. {q-fmabc2024-016}
- Idosa com TSH 0,04 e T4 normal (subclínico), anticorpos negativos: **metimazol**. {q-einstein2027-004}
- Gestante com vômitos e TSH baixo: **repetir o TSH** (o hCG suprime). {q-usp2022-092}` },
        { id: "hiper-tratamento", titulo: "Antitireoidianos, betabloqueador e crise", conferir: true, diretrizes: ["ata-hiper"],
          casos: ["q-tp20252-023"],
          questoes: ["q-sirio2025-008","q-uspsp4-023","q-einstein2023-006","q-scmsp2022-067","q-tp20252-023","q-usprp2026-086"],
          texto: `- Antes do metimazol: **leucograma, transaminases e bilirrubina**. {q-sirio2025-008}
- Febre com neutrófilos 400: **agranulocitose** — suspender, internar, antibiótico. {q-uspsp4-023}
- Graves com arritmia: **metimazol + propranolol**. {q-einstein2023-006}
- Escore da crise: **Burch-Wartofsky**. {q-scmsp2022-067}
- Agitação, vômitos e T4 muito alto: **antitireoidiano + propranolol**. {q-tp20252-023}
- FA com tireotoxicose: **propranolol oral** para a FC. {q-usprp2026-086}` },
      ],
    },
    {
      id: "nodulo", titulo: "Nódulo tireoidiano e câncer",
      introducao: `[[O nódulo começa pelo TSH: se baixo, a cintilografia procura nódulo quente, que quase nunca é câncer e não se punciona; se normal ou alto, o ultrassom classifica o risco (TI-RADS) e a punção depende do risco e do tamanho.|q-amrigs2022-007,q-unesp2021-043,q-tp20202-076,q-unesp2024-073,q-sirio2026-019]] [[Sugerem malignidade: sólido, hipoecoico, mais alto que largo, margens irregulares e microcalcificações; o espongiforme é benigno.|q-sirio2023-006,q-unesp2025-074,q-einstein2025-019,q-sirio2027-007]]

[[O papilífero é o câncer mais comum, espalha-se por linfonodos cervicais e tem ótimo prognóstico; o medular vem das células C (calcitonina, que serve de marcador), pode ser hereditário (NEM 2, gene RET) e então exige excluir feocromocitoma antes da cirurgia.|q-unesp2024-073,q-usp2024-046,q-usprp2026-013,q-adap23-096]]`,
      fragmentos: [
        { id: "nod-investigar", titulo: "TSH, ultrassom e punção", conferir: true, diretrizes: ["acr-tirads","ata-dtc"],
          figuras: [{ arquivo: "figuras/nodulo.svg", legenda: "Esquema autoral: do nódulo palpável ou incidental à punção." }],
          questoes: ["q-amrigs2022-007","q-unesp2021-043","q-sirio2026-019","q-tp20202-076","q-unesp2024-073","q-scmsp2025-039","q-usp2025-034","q-tp20212-080","q-tp20231-059","q-famerp2023-060","q-uspsp2-003","q-adap26-030","q-amrigs2024-032","q-scmsp2021-028","q-unifesp2023-096","q-unicampdis2022-014"],
          prosa: `No ACR TI-RADS, **TR5** punciona a partir de 1 cm e **TR4** a partir de 1,5 cm; abaixo disso, acompanha-se com ultrassom. Gabaritos que mandam cintilografia em nódulo TI-RADS 4 supõem TSH baixo.`,
          texto: `- TSH baixo: **cintilografia** (nódulo quente). {q-amrigs2022-007,q-unesp2021-043,q-sirio2026-019}
- Sequência: **TSH e T4, ultrassom, PAAF** se suspeito. {q-tp20202-076,q-unesp2024-073}
- Nódulo suspeito com TSH normal: **PAAF guiada por ultrassom**. {q-scmsp2025-039,q-usp2025-034,q-tp20212-080,q-tp20231-059,q-famerp2023-060,q-uspsp2-003,q-adap26-030,q-amrigs2024-032}
- Jovem com nódulo único endurecido e linfonodo: **pensar em neoplasia maligna**. {q-scmsp2021-028}
- Alargamento do mediastino anterior na idosa: **bócio intratorácico**. {q-unifesp2023-096,q-unicampdis2022-014}` },
        { id: "nod-tirads", titulo: "Ultrassom: o que \u00e9 suspeito e quando puncionar", conferir: true, diretrizes: ["acr-tirads", "ata-dtc"],
          questoes: ["q-sirio2023-006", "q-unesp2025-074", "q-einstein2025-019", "q-sirio2027-007", "q-unesp2026-066", "q-einstein2027-020", "q-simepm89-016", "q-famerp2026-056"],
          prosa: `O ultrassom não diz se o nódulo é câncer: ele estima o risco pelos traços que o câncer costuma ter (sólido, hipoecoico, mais alto que largo, margens irregulares, microcalcificações). Quanto maior o risco, menor o tamanho a partir do qual vale puncionar; nódulo de risco baixo e pequeno só se acompanha, porque o câncer papilífero pequeno cresce devagar.`,
          texto: `- Suspeitos: **hipoecoico e mais alto que largo**; espongiforme não. {q-sirio2023-006,q-unesp2025-074,q-einstein2025-019,q-sirio2027-007}
- TI-RADS 5 de 2 cm: **PAAF**. {q-unesp2026-066}
- Suspeita intermediária ≥ 1 cm: **PAAF**; muito baixa: acompanhar. {q-einstein2027-020}
- TI-RADS 4: **PAAF**. {q-simepm89-016}
- TI-RADS 5 pequeno: **ultrassom anual**. {q-famerp2026-056}` },
        { id: "nod-cancer", titulo: "Câncer: papilífero, medular e pós-operatório", conferir: true, diretrizes: ["ata-dtc"],
          questoes: ["q-adap22-084","q-usp2024-046","q-usprp2026-013","q-adap23-096","q-fmabc2026-032"],
          texto: `- Papilífero de 1,8 cm sem linfonodo: **tireoidectomia** (lobectomia ou total), **sem iodo** inicial. {q-adap22-084}
- Linfonodos globosos e heterogêneos após tireoidectomia: **metástase** do papilífero. {q-usp2024-046}
- Medular operado: seguir com **calcitonina**. {q-usprp2026-013}
- Medular com hipertensão: **metanefrinas**, cálcio, PTH e **RET** antes da cirurgia. {q-adap23-096}
- Lesão do **laríngeo recorrente** unilateral: rouquidão. {q-fmabc2026-032}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `A tabela resume as causas de tireotoxicose.`,
      fragmentos: [
        { id: "comp-tireotoxicose", titulo: "Causas de tireotoxicose", conferir: true,
          questoes: ["q-tp20212-033","q-sirio2025-007","q-adap23-003"],
          prosa: `| | Graves | Bócio multinodular tóxico | Tireoidite subaguda |
|---|---|---|---|
| Mecanismo | TRAb estimula o receptor | nódulos autônomos | folículo inflamado solta hormônio |
| Tireoide | difusa, com sopro | nodular | dolorosa |
| Captação | **alta, difusa** | alta nos nódulos | **muito baixa** |
| Próprio | oftalmopatia, dermopatia | idoso | VHS alto, pós-virose |
| Tratamento | metimazol, iodo radioativo, cirurgia | iodo radioativo ou cirurgia | **betabloqueador e AINE** |`,
          texto: `- Bócio difuso na jovem: **Graves**. {q-tp20212-033}
- Nódulos com captação: **bócio multinodular tóxico**. {q-sirio2025-007}
- Dor e captação baixa: **subaguda**. {q-adap23-003}` },
      ],
    },
  ],
});
