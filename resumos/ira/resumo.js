/* resumos/ira/resumo.js — resumo adaptativo de lesão renal aguda (ass-ira): definição e estadiamento
   KDIGO, pré-renal × NTA × pós-renal (FeNa, FeUreia, densidade, sedimento), causas (sepse, contraste,
   nefrotóxicos, rabdomiólise, lise tumoral, SHU, isquemia cirúrgica, IECA), DRA e DRC sobreposta,
   tratamento e indicações de diálise, hipercalemia; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- ira */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "ira",
  titulo: "Lesão renal aguda",
  assunto: "ass-ira",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "kdigo-lra", texto: "KDIGO Clinical Practice Guideline for Acute Kidney Injury (Kidney Int Suppl 2012) e ADQI/KDIGO sobre doença renal aguda (2017)", lidoEm: null },
    { id: "acr-contraste", texto: "ACR–NKF Consensus — Use of Intravenous Iodinated Contrast Media in Patients With Kidney Disease (Radiology 2020)", lidoEm: null },
    { id: "rabdo-lise", texto: "Bosch et al. — Rhabdomyolysis and acute kidney injury (N Engl J Med 2009); Cairo-Bishop e diretrizes de síndrome de lise tumoral (Br J Haematol 2015)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-iamspe2022-007"] },
  ],
  doencas: [
    {
      id: "definicao", titulo: "Definição e classificação",
      introducao: `[[Lesão renal aguda é a queda da filtração em horas a dias. A creatinina demora a subir porque é gerada em ritmo constante e precisa se acumular; a diurese cai antes. Por isso o KDIGO usa os dois: **creatinina sobe ≥ 0,3 mg/dL em 48 h ou ≥ 1,5 vez o basal em 7 dias**, ou **diurese < 0,5 mL/kg/h por 6 horas**.|q-famema2025-007,q-scmsp2025-010]]

Veja também: **Doença renal crônica**, **Sepse**, **Hiperpotassemia e distúrbios ácido-base**, **Rabdomiólise** e **Síndrome hemolítico-urêmica** quando houver resumo.`,
      fragmentos: [
        { id: "def-kdigo", titulo: "Estágios KDIGO e o tempo", conferir: true, diretrizes: ["kdigo-lra"],
          figuras: [{ arquivo: "figuras/pre-renal-nta.svg", legenda: "Esquema autoral: onde a lesão está (antes, dentro ou depois do rim) e o que a urina mostra em cada caso." }],
          casos: ["q-unesp2025-046"],
          questoes: ["q-famema2025-007","q-scmsp2025-010","q-tp20222-025","q-famerp2022-061","q-unesp2024-053","q-unesp2026-055","q-unesp2025-046","q-sirio2024-044"],
          prosa: `[[**Estágio 1**: creatinina 1,5–1,9 × basal ou +0,3; diurese < 0,5 mL/kg/h por 6–12 h. **Estágio 2**: 2,0–2,9 ×; < 0,5 por ≥ 12 h. **Estágio 3**: ≥ 3 × ou creatinina ≥ 4, diálise, diurese < 0,3 por 24 h ou anúria por 12 h.|q-famema2025-007,q-scmsp2025-010,q-tp20222-025,q-famerp2022-061,q-unesp2024-053,q-unesp2026-055]] [[Alteração que dura de 7 a 90 dias é **doença renal aguda**; além de 90 dias, crônica. Cada uma pode se sobrepor à outra, e o basal define a situação.|q-unesp2025-046]] [[O risco é maior em sepse, glomerulonefrite, nefrotóxicos e hipovolemia; uma comunicação interatrial isolada no prematuro pesa pouco.|q-sirio2024-044]]`,
          texto: `- **+0,3 em 48 h, ×1,5 em 7 dias, ou < 0,5 mL/kg/h por 6 h**. {q-famema2025-007,q-scmsp2025-010}
- Estágio 2: **2–2,9×**; estágio 3: **≥ 3×**, diálise. {q-tp20222-025,q-famerp2022-061,q-unesp2024-053,q-unesp2026-055}
- 7–90 dias: **DRA**. {q-unesp2025-046}` },
      ],
    },
    {
      id: "causas", titulo: "Pré-renal, renal e pós-renal",
      introducao: `[[A pergunta é onde está o problema. **Pré-renal**: o rim é bom, mas recebe pouco sangue e segura sódio e água (é a causa mais comum, 40–80%). **Renal**: o túbulo morreu (necrose tubular aguda) e perdeu a capacidade de concentrar. **Pós-renal**: a urina não sai.|q-amrigs2020-011,q-famema2023-031]]`,
      fragmentos: [
        { id: "cau-urina", titulo: "O que a urina conta", conferir: true, diretrizes: ["kdigo-lra"],
          casos: ["q-tp20232-031","q-tp20241-032","q-tp20202-020"],
          questoes: ["q-amrigs2020-011","q-famema2023-031","q-sirio2022-006","q-unifesp2022-094","q-unifesp2025-028","q-scmsp2021-003","q-tp20231-006","q-tp20232-031","q-tp20241-032","q-tp20202-020","q-sessp2023-006"],
          prosa: `[[**Pré-renal**: túbulo íntegro, aldosterona e ADH altos — **FeNa < 1%, FeUreia < 35%**, urina concentrada (densidade alta, osmolalidade > 500), relação ureia/creatinina > 40, sedimento inativo com cilindros hialinos. Com diurético a FeNa engana; a FeUreia não. Trata-se com **volume**.|q-famema2023-031,q-sirio2022-006,q-unifesp2022-094,q-unifesp2025-028,q-scmsp2021-003]] [[**Necrose tubular aguda** (sepse, isquemia, nefrotóxico): FeNa > 2%, urina isostenúrica (~300 mOsm), **cilindros granulosos** e células tubulares; a lesão é do **túbulo**, com necrose celular e membrana basal preservada — por isso o epitélio regenera.|q-tp20231-006,q-tp20232-031,q-tp20241-032,q-tp20202-020]] [[No pós-operatório com oligúria, antes de qualquer droga, conferir sonda, volemia e hemoglobina; vasopressor não é o primeiro passo.|q-sessp2023-006]]`,
          texto: `- Pré-renal: **FeNa < 1%, FeUreia < 35%**, densidade alta → **volume**. {q-famema2023-031,q-sirio2022-006,q-unifesp2022-094,q-unifesp2025-028,q-scmsp2021-003}
- NTA: **cilindros granulosos**, isostenúria, túbulo. {q-tp20231-006,q-tp20232-031,q-tp20241-032,q-tp20202-020}
- Oligúria pós-operatória: sonda e volume antes de amina. {q-sessp2023-006}` },
        { id: "cau-pos", titulo: "Obstrução", conferir: true, diretrizes: ["kdigo-lra"],
          questoes: ["q-scmsp2023-020","q-sessp2024-010","q-tp20252-012"],
          prosa: `[[Homem com hiperplasia prostática, dor suprapúbica e anúria ou oligúria: **pós-renal** — sondagem vesical e ultrassonografia de rins e vias; a creatinina cai quando a urina sai.|q-scmsp2023-020,q-sessp2024-010,q-tp20252-012]]`,
          texto: `- Bexigoma, próstata: **sondagem vesical** + USG. {q-scmsp2023-020,q-sessp2024-010,q-tp20252-012}` },
        { id: "cau-especificas", titulo: "Causas que a prova gosta", conferir: true, diretrizes: ["acr-contraste","rabdo-lise"],
          questoes: ["q-adap22-094","q-unicampdis2022-003","q-adap25-028","q-udisc20262-025","q-unicampdis2024-011","q-unicampdis2022-006","q-tp20212-039","q-sessp2022-007","q-usprp2024-052","q-famerp2022-027","q-einstein2023-031","q-usprp2022-084","q-sirio2026-034"],
          prosa: `[[**Contraste** em quem tem TFG < 30: hidratar com salina isotônica, **suspender AINE** e usar o mínimo de contraste. IECA em quem tem estenose de artéria renal pode derrubar a filtração (captopril).|q-adap22-094,q-unicampdis2022-003]] [[**Rabdomiólise** (esforço, calor, estatina com fibrato): músculo libera mioglobina, que entope e lesa o túbulo; urina escura com **hemoglobina positiva sem hemácias** (mioglobinúria), CK muito alta. **Hidratação vigorosa e precoce** com cristaloide isotônico, vigiando potássio; suspender a estatina.|q-adap25-028,q-udisc20262-025,q-unicampdis2024-011,q-unicampdis2022-006,q-tp20212-039]] [[**Lise tumoral** (Burkitt, linfoma em quimioterapia): potássio, **fósforo e ácido úrico** altos com **cálcio baixo** — cristais nos túbulos.|q-sessp2022-007,q-usprp2024-052]] [[**Síndrome hemolítico-urêmica** após diarreia com sangue: anemia hemolítica microangiopática, **plaquetopenia, Coombs negativo** e lesão renal, com hipertensão; transfusão se anemia grave.|q-famerp2022-027,q-einstein2023-031,q-usprp2022-084]] [[Clampeamento da aorta causa **isquemia-reperfusão** do rim: menos tempo de clampeamento e perfusão renal.|q-sirio2026-034]]`,
          texto: `- Contraste: **salina, sem AINE, pouco contraste**. {q-adap22-094}
- Rabdomiólise: **heme + sem hemácias**, CK alta → **cristaloide**. {q-adap25-028,q-udisc20262-025,q-unicampdis2024-011,q-unicampdis2022-006,q-tp20212-039}
- Lise tumoral: **K, P, ácido úrico altos; Ca baixo**. {q-sessp2022-007,q-usprp2024-052}
- SHU: hemólise, **plaquetas baixas, Coombs negativo**. {q-famerp2022-027,q-einstein2023-031,q-usprp2022-084}
- Aorta: isquemia-reperfusão. {q-sirio2026-034}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento e diálise",
      introducao: `[[Não há remédio que cure o túbulo: o tratamento é tirar a causa, acertar volume e corrigir o que mata enquanto o rim se recupera — potássio, ácido e água.|q-sirio2021-007,q-adap23-017]]`,
      fragmentos: [
        { id: "tra-urgencias", titulo: "Hipercalemia e indicações de diálise", conferir: true, diretrizes: ["kdigo-lra"],
          casos: ["q-unesp2021-054"],
          questoes: ["q-adap23-017","q-unesp2021-054","q-sessp2025-004","q-sirio2021-007","q-unifesp2023-017"],
          prosa: `[[Hipercalemia com alteração de ECG: **gluconato de cálcio** IV primeiro (estabiliza a membrana, não baixa o potássio), depois desviar para dentro da célula (**insulina com glicose**, beta-2, bicarbonato se acidose) e tirar do corpo (diurético se há volume, diálise). Na lesão renal a insulina dura mais e a **hipoglicemia** é mais frequente.|q-adap23-017,q-unesp2021-054,q-sessp2025-004]] [[Diálise de urgência (AEIOU): **acidose** grave refratária, eletrólitos (**hipercalemia refratária**), intoxicação dialisável, **hipervolemia** refratária com edema pulmonar, uremia (pericardite, encefalopatia).|q-sirio2021-007,q-unifesp2023-017]]`,
          texto: `- K alto com ECG: **cálcio**, insulina + glicose, remover. {q-adap23-017,q-unesp2021-054,q-sessp2025-004}
- Diálise: **acidose, K, intoxicação, volume, uremia** refratários. {q-sirio2021-007,q-unifesp2023-017}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["kdigo-lra","rabdo-lise"],
          questoes: ["q-tp20212-039","q-unesp2021-054","q-tp20222-025","q-scmsp2021-003"],
          prosa: `[[**Alcalinizar a urina na rabdomiólise**: não melhora desfecho e pode baixar o cálcio; a tp20212-039 incluiu **alcalinização** com salina e solução polarizante.|q-tp20212-039]] [[**Furosemida na hipercalemia**: só tem papel se o paciente tem volume e urina; a unesp2021-054 a incluiu **se o estado volêmico permitir**, junto de cálcio, glicoinsulina e bicarbonato.|q-unesp2021-054]] [[**Estágio pela creatinina**: 0,9 → 2,6 é 2,9 vezes, ainda **estágio 2** (tp20222-025).|q-tp20222-025]] [[**Hemácias no sedimento com FeNa < 1%**: a scmsp2021-003 tratou como pré-renal por preparo de colonoscopia, mesmo com hemácias.|q-scmsp2021-003]]`,
          texto: `- Rabdo: a prova incluiu **alcalinizar**. {q-tp20212-039}
- Furosemida **se volume permitir**. {q-unesp2021-054}
- 2,9× = **estágio 2**. {q-tp20222-025}
- Hemácias e FeNa < 1%: **pré-renal**. {q-scmsp2021-003}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: pré-renal, NTA e pós-renal",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-tipos", titulo: "Como separar", conferir: true,
          questoes: ["q-unifesp2025-028","q-tp20231-006","q-tp20252-012","q-famema2023-031"],
          prosa: `[[A urina e a história separam os três.|q-unifesp2025-028,q-tp20231-006,q-tp20252-012,q-famema2023-031]]

| | Pré-renal | NTA | Pós-renal |
| FeNa | < 1% | > 2% | variável |
| FeUreia | < 35% | > 50% | — |
| Densidade / osmolalidade | > 1.020 / > 500 | ~1.010 / ~300 | variável |
| Sedimento | hialinos | granulosos, células tubulares | pode ter hematúria |
| Tratamento | volume | tirar a causa, suporte | desobstruir |`,
          texto: `- Pré-renal: **volume**. {q-unifesp2025-028,q-famema2023-031}
- NTA: **granulosos**. {q-tp20231-006}
- Pós-renal: **sonda**. {q-tp20252-012}` },
      ],
    },
  ],
});
