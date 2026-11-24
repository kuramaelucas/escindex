/* resumos/valvopatias/resumo.js — resumo adaptativo de valvopatias (ass-valvopatias): semiologia dos
   sopros e pulsos, estenose aórtica (sintomas, gravidade, troca cirúrgica ou TAVI, valve-in-valve),
   insuficiência aórtica, estenose mitral (reumática, valvuloplastia), insuficiência mitral (primária,
   funcional, prolapso), tricúspide e pulso venoso, prótese e anticoagulação na gestação, cardiopatia
   na gestante, edema agudo de pulmão valvar, outras (CMH, mixoma); armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- valvopatias */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "valvopatias",
  titulo: "Valvopatias",
  assunto: "ass-valvopatias",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "sbc-valvopatias", texto: "Sociedade Brasileira de Cardiologia — Atualização das Diretrizes Brasileiras de Valvopatias (Arq Bras Cardiol 2020)", lidoEm: null },
    { id: "acc-aha-2020", texto: "ACC/AHA 2020 Guideline for the Management of Patients With Valvular Heart Disease e ESC/EACTS 2021", lidoEm: null },
    { id: "sbc-gestacao", texto: "SBC — Posicionamento sobre gravidez na mulher portadora de cardiopatia (2020)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada; entra a reposição q-usp2026-120-ia", questoes: ["q-usp2026-120"] },
  ],
  doencas: [
    {
      id: "aorticas", titulo: "Valva aórtica",
      introducao: `[[A valva aórtica separa um ventrículo forte de uma artéria de alta pressão. Quando **estreita**, o ventrículo empurra contra resistência e hipertrofia concentricamente; quando **vaza**, recebe o volume de volta na diástole e dilata excentricamente. Os sopros, os pulsos e os sintomas são consequências diretas disso.|q-card-25,q-usprp2026-087,q-sessp2024-017]]

Veja também: **Endocardite**, **Insuficiência cardíaca**, **Febre reumática**, **Cardiopatias congênitas** e **Gestação de alto risco** quando houver resumo.`,
      fragmentos: [
        { id: "aor-estenose", titulo: "Estenose aórtica", conferir: true, diretrizes: ["sbc-valvopatias","acc-aha-2020"],
          figuras: [{ arquivo: "figuras/sopros.svg", legenda: "Esquema autoral: em que parte do ciclo cada sopro acontece e por quê." }],
          casos: ["q-usprp2027-066"],
          questoes: ["q-card-25","q-unifesp2023-002","q-unicamp2022-008","q-usprp2022-061","q-tp20222-022","q-tp20252-036","q-unesp2021-041","q-tp20232-001","q-tp20261-015","q-adap26-023","q-famema2022-021","q-usprp2027-066","q-sessp2026-046"],
          prosa: `[[Sopro **sistólico ejetivo** (crescendo-decrescendo) em foco aórtico, rude, **irradiado para as carótidas**, com frêmito, B2 hipofonética ou desdobramento paradoxal, B4 e **pulso parvus et tardus** (pequeno e lento). No idoso, calcificação degenerativa; no adulto jovem, **valva bicúspide**; o sopro pode aparecer "piante" no ápice (fenômeno de Gallavardin).|q-card-25,q-unifesp2023-002,q-unicamp2022-008,q-usprp2022-061,q-tp20222-022,q-tp20252-036]] [[Os sintomas marcam o fim da fase silenciosa: **angina, síncope e dispneia** — a partir deles a sobrevida cai muito sem tratamento. A gravidade se confirma no **ecocardiograma**: velocidade ≥ 4 m/s, gradiente médio ≥ 40 mmHg, área ≤ 1 cm².|q-unesp2021-041,q-tp20232-001,q-tp20261-015]] [[Grave e sintomática (ou com FE < 50%): **troca valvar**, cirúrgica ou **transcateter (TAVI)** conforme idade e risco; prótese biológica degenerada em idosa frágil: **valve-in-valve** por cateter.|q-adap26-023,q-famema2022-021,q-tp20222-022,q-usprp2027-066]] [[Criança com síncope ao esforço e sopro aórtico irradiado ao pescoço: estenose aórtica.|q-sessp2026-046]]`,
          texto: `- Ejetivo aórtico → carótidas, **parvus et tardus**. {q-card-25,q-unifesp2023-002,q-unicamp2022-008,q-usprp2022-061,q-tp20222-022,q-tp20252-036}
- **Angina, síncope, dispneia**; confirmar no eco. {q-unesp2021-041,q-tp20232-001,q-tp20261-015}
- Grave sintomática: **troca ou TAVI**. {q-adap26-023,q-famema2022-021,q-usprp2027-066}` },
        { id: "aor-insuficiencia", titulo: "Insuficiência aórtica", conferir: true, diretrizes: ["sbc-valvopatias"],
          casos: ["q-usprp2024-042"],
          questoes: ["q-sessp2024-017","q-usprp2026-044","q-usprp2024-042","q-usprp2026-087","q-adap21-097"],
          prosa: `[[O sangue volta na diástole: a pressão diastólica despenca e a sistólica sobe (**PA divergente**), o pulso sobe e cai de golpe (**martelo d'água**, Corrigan), há pulsação capilar (Quincke). Sopro **diastólico aspirativo decrescente** logo após B2, na borda esternal esquerda. O ventrículo recebe volume extra: **hipertrofia excêntrica** e volume de ejeção aumentado.|q-sessp2024-017,q-usprp2026-044,q-usprp2024-042,q-usprp2026-087]] [[Insuficiência aórtica **aguda** (endocardite por S. aureus) não tem tempo de dilatar o ventrículo: edema pulmonar — antibiótico, vasodilatador e **cirurgia urgente**; betabloqueador e balão intra-aórtico pioram a regurgitação.|q-adap21-097]]`,
          texto: `- **PA divergente, martelo d'água**, diastólico após B2. {q-sessp2024-017,q-usprp2026-044,q-usprp2024-042}
- **Hipertrofia excêntrica**. {q-usprp2026-087}
- Aguda: **cirurgia**, sem betabloqueador nem balão. {q-adap21-097}` },
      ],
    },
    {
      id: "mitral", titulo: "Valva mitral e tricúspide",
      introducao: `[[A mitral separa um átrio fino de um ventrículo forte. Estreita, o átrio esquerdo dilata e a pressão sobe para o pulmão (congestão, hemoptise, fibrilação atrial); vazando, o ventrículo bombeia parte para trás, e o volume volta a dilatar átrio e ventrículo.|q-card-27,q-card-26]]`,
      fragmentos: [
        { id: "mit-estenose", titulo: "Estenose mitral", conferir: true, diretrizes: ["sbc-valvopatias"],
          casos: ["q-usprp2021-097"],
          questoes: ["q-card-27","q-usprp2021-097","q-iamspe2023-010","q-adap23-002","q-unesp2024-071"],
          prosa: `[[Quase sempre **reumática**: mulher jovem com dispneia, hemoptise, fibrilação atrial; **B1 hiperfonética, estalido de abertura e ruflar diastólico** no ápice, com **reforço pré-sistólico** (some na fibrilação atrial).|q-card-27,q-usprp2021-097,q-iamspe2023-010]] [[Importante (área ≤ 1,5 cm²) e sintomática, com valva móvel (escore de **Wilkins ≤ 8**), sem trombo atrial e sem insuficiência mitral importante: **valvuloplastia percutânea por balão**; senão, cirurgia.|q-adap23-002,q-unesp2024-071]]`,
          texto: `- Reumática: **estalido + ruflar + reforço pré-sistólico**. {q-card-27,q-usprp2021-097,q-iamspe2023-010}
- Wilkins ≤ 8, sem trombo: **valvuloplastia por balão**. {q-adap23-002}` },
        { id: "mit-insuficiencia", titulo: "Insuficiência mitral e tricúspide", conferir: true, diretrizes: ["sbc-valvopatias"],
          casos: ["q-tp20251-003","q-amrigs2023-010"],
          questoes: ["q-card-26","q-tp20241-043","q-unifesp2026-023","q-tp20251-003","q-unesp2024-071","q-sessp2024-098","q-tp20222-011","q-amrigs2023-010"],
          prosa: `[[Sopro **holossistólico** em foco mitral irradiado para a **axila**. Pode ser **primária** (reumática na criança e no jovem, prolapso, endocardite, ruptura de cordoalha na isquemia) ou **funcional**: o ventrículo dilatado (cardiomiopatia, com B3 e ictus desviado) afasta os folhetos.|q-card-26,q-tp20241-043,q-unifesp2026-023,q-unesp2024-071]] [[**Prolapso mitral**: **clique mesossistólico** seguido de sopro telessistólico.|q-tp20251-003]] [[Sopro sistólico leve sem outros achados na gestante é **fisiológico** (hiperfluxo).|q-sessp2024-098]] [[Tricúspide: ruflar diastólico com reforço pré-sistólico, aumento do átrio direito e congestão sistêmica = **estenose tricúspide** (reumática); no pulso venoso, onda **v gigante** na insuficiência tricúspide, **onda a** grande na estenose, **y proeminente** na constrição e **y ausente** no tamponamento.|q-tp20222-011,q-amrigs2023-010]]`,
          texto: `- **Holossistólico → axila**; funcional na cardiomiopatia. {q-card-26,q-tp20241-043,q-unifesp2026-023,q-unesp2024-071}
- Prolapso: **clique**. {q-tp20251-003}
- Gestante: sopro leve **fisiológico**. {q-sessp2024-098}
- Tricúspide e pulso venoso: **v gigante na IT, y ausente no tamponamento**. {q-tp20222-011,q-amrigs2023-010}` },
      ],
    },
    {
      id: "especiais", titulo: "Gestação, próteses e outras",
      introducao: `[[A gestação aumenta o débito em 40–50% e a frequência cardíaca: a estenose mitral, que depende de tempo de diástole, é a valvopatia que mais descompensa. Próteses mecânicas obrigam a anticoagular uma mulher num período de alto risco de trombose e de efeito do anticoagulante sobre o feto.|q-usp2025-016,q-usp2023-032]]`,
      fragmentos: [
        { id: "esp-gestacao", titulo: "Gestante cardiopata e anticoagulação", conferir: true, diretrizes: ["sbc-gestacao","sbc-valvopatias"],
          casos: ["q-usp2025-017","q-uspsp5-006"],
          questoes: ["q-usp2025-016","q-usp2025-017","q-usp2023-032","q-unicampdis2024-080","q-usp2026-120-ia","q-uspsp5-006"],
          prosa: `[[Gestante com congestão pulmonar (provável estenose mitral) em trabalho de parto: **furosemida** e controle da frequência; depois, **analgesia peridural** precoce, que reduz taquicardia e pré-carga.|q-usp2025-016,q-usp2025-017]] [[Prótese mecânica na gestação: **heparina de baixo peso** no 1.º trimestre (a varfarina é teratogênica entre 6 e 12 semanas), **varfarina no 2.º e no 3.º** até cerca de 36 semanas, e heparina de novo perto do parto. A **prótese biológica** dispensa anticoagulação na gravidez — por isso é preferida em mulher jovem que quer engravidar.|q-usp2023-032,q-unicampdis2024-080]] [[Parto vaginal não complicado **não tem indicação de profilaxia de endocardite**.|q-usp2026-120-ia]] [[Edema agudo de pulmão com sopro mitral novo: vasodilatador, diurético, VNI, e investigar a complicação valvar que descompensou.|q-uspsp5-006]]`,
          texto: `- Gestante congesta: **furosemida**, depois **peridural**. {q-usp2025-016,q-usp2025-017}
- Prótese mecânica: **HBPM 1.º tri → varfarina → HBPM ~36 sem**; biológica não anticoagula. {q-usp2023-032,q-unicampdis2024-080}
- Parto: **sem profilaxia** de endocardite. {q-usp2026-120-ia}
- EAP valvar: tratar e investigar. {q-uspsp5-006}` },
        { id: "esp-outras", titulo: "Pós-operatório, CMH e mixoma", conferir: true, diretrizes: ["sbc-valvopatias"],
          casos: ["q-scmsp2026-010","q-unicampdis2024-073"],
          questoes: ["q-unesp2025-072","q-scmsp2026-010","q-unicampdis2024-073"],
          prosa: `[[Pós-operatório de troca valvar com anticoagulante, estase jugular, hipotensão e bulhas abafadas: **tamponamento** — drenar o derrame.|q-unesp2025-072]] [[Jovem com síncope, sopro sistólico discreto e ECG com sobrecarga e ondas Q profundas: **cardiomiopatia hipertrófica**.|q-scmsp2026-010]] [[Massa pedunculada e móvel no átrio esquerdo, presa ao septo, que prolapsa pela mitral: **mixoma**.|q-unicampdis2024-073]]`,
          texto: `- Pós-op com bulhas abafadas: **tamponamento**. {q-unesp2025-072}
- Síncope em jovem: **CMH**. {q-scmsp2026-010}
- Massa no átrio esquerdo: **mixoma**. {q-unicampdis2024-073}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["sbc-valvopatias","sbc-gestacao"],
          questoes: ["q-sessp2026-046","q-tp20232-001","q-usp2023-032","q-unifesp2023-002"],
          prosa: `[[**Remédio na estenose aórtica**: não há droga que mude a história; a sessp2026-046 aceitou **propranolol** para a criança até a avaliação do cardiologista.|q-sessp2026-046]] [[**Clínica de gravidade sem eco**: sopro 4+/6 com parvus et tardus já sugere gravidade, mas a tp20232-001 mandou **confirmar no ecocardiograma** antes da troca.|q-tp20232-001]] [[**Varfarina no fim da gestação**: diretrizes variam entre trocar por heparina em 34–36 semanas; a usp2023-032 trocou **após 36 semanas**.|q-usp2023-032]] [[**Onde se ouve a estenose aórtica**: o foco clássico é o 2.º espaço à direita, mas a unifesp2023-002 descreveu o sopro na **borda esternal superior esquerda**, com o paciente inclinado para frente.|q-unifesp2023-002]]`,
          texto: `- EAo na criança: a prova deu **propranolol**. {q-sessp2026-046}
- **Confirmar no eco**. {q-tp20232-001}
- Varfarina até **36 semanas**. {q-usp2023-032}
- Sopro na borda esquerda. {q-unifesp2023-002}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: os quatro sopros clássicos",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-sopros", titulo: "Sopro, foco e sinais", conferir: true,
          questoes: ["q-card-25","q-sessp2024-017","q-card-27","q-card-26"],
          prosa: `[[Momento do ciclo e irradiação identificam a lesão.|q-card-25,q-sessp2024-017,q-card-27,q-card-26]]

| | Estenose aórtica | Insuficiência aórtica | Estenose mitral | Insuficiência mitral |
|---|---|---|---|---|
| Momento | sistólico ejetivo | diastólico precoce | diastólico (ruflar) | holossistólico |
| Irradiação | carótidas | borda esternal esquerda | ápice, localizado | axila |
| Sinais | parvus et tardus, B4 | PA divergente, martelo d'água | estalido, B1 alta, FA | B3, ictus desviado |
| Tratamento | troca ou TAVI | troca valvar | valvuloplastia por balão | plástica ou troca |`,
          texto: `- Sistólico → carótidas: **EAo**. {q-card-25}
- Diastólico + martelo d'água: **IAo**. {q-sessp2024-017}
- Ruflar + estalido: **EM**. {q-card-27}
- Holossistólico → axila: **IM**. {q-card-26}` },
      ],
    },
  ],
});
