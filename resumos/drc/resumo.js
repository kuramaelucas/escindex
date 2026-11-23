/* resumos/drc/resumo.js — resumo adaptativo de doença renal crônica (ass-drc): definição, TFG e
   albuminúria, estadiamento KDIGO, etiologias (diabetes, hipertensão, CAKUT), nefroproteção (IECA/BRA,
   iSGLT2, finerenona, proteína, bicarbonato), complicações (anemia, distúrbio mineral-ósseo, acidose,
   metabolismo da insulina), terapia renal substitutiva e acesso, transplante, armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- drc */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "drc",
  titulo: "Doença renal crônica",
  assunto: "ass-drc",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "kdigo-drc-2024", texto: "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease (Kidney Int 2024)", lidoEm: null },
    { id: "kdigo-dm-2022", texto: "KDIGO 2022 Clinical Practice Guideline for Diabetes Management in Chronic Kidney Disease", lidoEm: null },
    { id: "kdigo-dmo-2017", texto: "KDIGO 2017 Clinical Practice Guideline Update for CKD–Mineral and Bone Disorder (CKD-MBD)", lidoEm: null },
    { id: "kdigo-anemia", texto: "KDIGO Clinical Practice Guideline for Anemia in CKD (2012; atualização em consulta pública 2024–2025)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-amrigs2024-005"] },
  ],
  doencas: [
    {
      id: "definicao", titulo: "Definição, medida da função e estadiamento",
      introducao: `[[Doença renal crônica é a alteração de estrutura ou função do rim por mais de 3 meses com repercussão na saúde: TFG abaixo de 60 mL/min/1,73 m² ou marcador de lesão (albuminúria ≥ 30 mg/g, sedimento alterado, alteração de imagem ou de biópsia). O prazo de 3 meses separa a doença crônica da lesão renal aguda. O estadiamento usa duas réguas independentes — a TFG (G1 a G5) e a albuminúria (A1 a A3) — porque cada uma prediz risco por um caminho: a TFG mede quanto néfron sobrou; a albuminúria mede quanto o glomérulo que sobrou está sofrendo.|q-006,q-adap22-076,q-unicampdis2025-059,q-tp20202-025]]

Veja também: **Diabetes** (antidiabéticos na DRC), **Hipertensão arterial**, **Lesão renal aguda**, **Hidroeletrolítico e ácido-base** (hipercalemia, acidose) e **Glomerulopatias** quando houver resumo.`,
      fragmentos: [
        { id: "def-medida", titulo: "Como medir a função renal", conferir: true, diretrizes: ["kdigo-drc-2024"],
          questoes: ["q-adap24-067","q-unifesp2024-031","q-iamspe2023-008","q-usprp2022-078","q-iamspe2022-015","q-usprp2021-118","q-fmabc2025-009","q-unicampdis2025-059"],
          prosa: `[[A creatinina sérica isolada engana: ela só sobe acima do normal depois que se perde cerca de metade da filtração, e depende de massa muscular, idade e sexo. Uma creatinina de 1,8 numa mulher idosa já pode significar TFG abaixo de 30. Por isso a avaliação de rotina é a **TFG estimada pela CKD-EPI** (a de 2021, sem coeficiente racial), sempre junto da **relação albumina/creatinina em amostra isolada de urina**.|q-adap24-067,q-unifesp2024-031,q-usprp2022-078,q-iamspe2022-015]] [[O clearance de creatinina em urina de 24 horas superestima a filtração, porque o túbulo secreta creatinina, e depende de coleta correta; não é o melhor marcador, mas segue útil em extremos de massa muscular, gestação e dieta atípica, quando a equação falha.|q-iamspe2023-008,q-unicampdis2025-059]] [[No diabético, a manifestação mais precoce da lesão renal é a **albuminúria moderadamente aumentada** (a antiga microalbuminúria, 30–300 mg/g), que aparece antes da queda da TFG; por isso é rastreada anualmente desde o diagnóstico do tipo 2, sobretudo com história familiar de doença renal.|q-fmabc2025-009,q-usprp2021-118]]`,
          texto: `- Rotina: **CKD-EPI + relação albumina/creatinina** em amostra isolada. {q-adap24-067,q-unifesp2024-031,q-usprp2022-078,q-iamspe2022-015}
- Clearance de 24 h: superestima (secreção tubular), útil em exceções. {q-iamspe2023-008,q-unicampdis2025-059}
- Diabetes: **albuminúria** é o sinal mais precoce. {q-fmabc2025-009,q-usprp2021-118}` },
        { id: "def-estadio", titulo: "Estadiamento G e A e risco", conferir: true, diretrizes: ["kdigo-drc-2024"],
          figuras: [{ arquivo: "figuras/kdigo-risco.svg", legenda: "Esquema autoral: as duas réguas do estadiamento (TFG nas linhas, albuminúria nas colunas) e o risco que cresce na diagonal." }],
          questoes: ["q-006","q-adap22-076","q-unicampdis2025-059","q-unesp2024-055","q-tp20202-025","q-usprp2027-034"],
          prosa: `[[G1 ≥ 90; G2 60–89; G3a 45–59; G3b 30–44; G4 15–29; G5 < 15 mL/min/1,73 m². A1 < 30; A2 30–300; A3 > 300 mg/g. O risco de progressão e de morte cardiovascular cresce nas duas direções; G3b com A3 já é risco muito alto e pede nefrologista, controle da pressão e redução da albuminúria.|q-006,q-adap22-076,q-unicampdis2025-059,q-unesp2024-055]] [[Os sinais de cronicidade ajudam a separar DRC de lesão aguda num paciente que chega com ureia alta: anemia normocítica, hiperfosfatemia com PTH alto e, na ultrassonografia, rins pequenos com **córtex afinado** e ecogenicidade aumentada. O afinamento cortical traduz a perda de néfrons; o comprimento pode estar preservado no diabetes e na doença policística.|q-tp20202-025,q-usprp2027-034]]`,
          texto: `- G3a 45–59, **G3b 30–44**, G4 15–29, G5 < 15. {q-006,q-adap22-076,q-unicampdis2025-059}
- A2 30–300, **A3 > 300** mg/g. {q-unesp2024-055}
- Cronicidade: anemia, PTH alto, **córtex fino**. {q-tp20202-025,q-usprp2027-034}` },
      ],
    },
    {
      id: "etiologia", titulo: "Causas e quando investigar além",
      introducao: `[[Diabetes e hipertensão respondem pela maioria dos casos no adulto. Na doença renal do diabetes, a hiperglicemia dilata a arteríola aferente e a angiotensina II contrai a eferente: a pressão dentro do glomérulo sobe, há hiperfiltração, espessamento da membrana basal, expansão mesangial e, por fim, esclerose. Na hipertensão, o dano principal é vascular — arterioloesclerose, isquemia e esclerose do glomérulo (nefroesclerose).|q-unesp2023-042,q-iamspe2023-007]]`,
      fragmentos: [
        { id: "eti-adulto", titulo: "Diabetes, hipertensão e o que foge do padrão", conferir: true, diretrizes: ["kdigo-drc-2024","kdigo-dm-2022"],
          questoes: ["q-unesp2023-042","q-iamspe2023-007","q-fmabc2024-014","q-scmsp2022-076","q-unesp2024-055"],
          prosa: `[[O tratamento da doença renal do diabetes mira justamente a pressão intraglomerular: bloqueio do sistema renina-angiotensina-aldosterona, controle da glicemia e da pressão, e redução do risco cardiovascular.|q-unesp2023-042]] [[Na hipertensão, o mecanismo que a prova aceitou foi a **isquemia** do parênquima pela doença das pequenas artérias.|q-iamspe2023-007]] [[Diabetes com retinopatia e albuminúria progressiva cabe na doença renal do diabetes sem biópsia. O que manda biopsiar é o quadro que foge do padrão: albuminúria importante sem diabetes, perda rápida de função, sedimento ativo, ausência de retinopatia num diabético. A complicação mais comum da biópsia percutânea é a **hematúria macroscópica**, quase sempre autolimitada.|q-unesp2024-055,q-fmabc2024-014,q-scmsp2022-076]]`,
          texto: `- Diabetes: **hipertensão intraglomerular** → bloqueio do SRAA. {q-unesp2023-042}
- Hipertensão: nefroesclerose, **isquemia**. {q-iamspe2023-007}
- Quadro atípico: **biópsia**; complicação mais comum, hematúria. {q-fmabc2024-014,q-scmsp2022-076}` },
        { id: "eti-pediatria", titulo: "DRC na criança", conferir: true, diretrizes: ["kdigo-drc-2024"],
          questoes: ["q-unesp2025-012","q-unifesp2022-076","q-unifesp2023-064"],
          prosa: `[[Na criança, a causa principal são as **anomalias congênitas do rim e do trato urinário** (hipodisplasia, refluxo com cicatrizes, válvula de uretra posterior); infecções urinárias febris de repetição no lactente com refluxo corrigido, palidez e baixo rendimento apontam para DRC já avançada.|q-unesp2025-012]] [[Hipertensão com albuminúria na criança com DRC pede **IECA**, pelo mesmo motivo do adulto: baixar a pressão no glomérulo.|q-unifesp2022-076]] [[A falha de crescimento é multifatorial (acidose, distúrbio mineral, anemia, desnutrição); com bicarbonato, vitamina D e PTH controlados, o primeiro passo é **otimizar o aporte proteico e calórico** antes de pensar em hormônio de crescimento.|q-unifesp2023-064]]`,
          texto: `- Causa na criança: **CAKUT**. {q-unesp2025-012}
- Hipertensão com albuminúria: **IECA**. {q-unifesp2022-076}
- Baixa estatura com exames controlados: **nutrição** primeiro. {q-unifesp2023-064}` },
      ],
    },
    {
      id: "nefroprotecao", titulo: "Nefroproteção",
      introducao: `[[Tudo o que freia a DRC reduz a pressão ou a inflamação dentro do glomérulo. IECA ou BRA dilatam a eferente; iSGLT2 restauram o sinal de sódio na mácula densa e contraem a aferente; a finerenona bloqueia o receptor mineralocorticoide e a fibrose; a restrição de proteína reduz a hiperfiltração.|q-unesp2023-042,q-unifesp2025-031,q-adap25-055]]`,
      fragmentos: [
        { id: "nef-sraa", titulo: "IECA/BRA e a queda esperada da TFG", conferir: true, diretrizes: ["kdigo-drc-2024"],
          questoes: ["q-unifesp2025-031","q-adap25-031","q-006","q-adap25-055","q-unifesp2026-034"],
          prosa: `[[Com albuminúria, IECA **ou** BRA na dose máxima tolerada, mesmo com TFG baixa: a TFG reduzida não contraindica o bloqueio, e a meta pressórica é cerca de 120–130 de sistólica.|q-unifesp2025-031,q-006]] [[Ao iniciar o bloqueio, a creatinina sobe porque a pressão no glomérulo cai: é o efeito desejado. Aumento de até 30% com potássio aceitável manda **manter** e repetir creatinina e potássio em 1–2 semanas; acima disso, procurar estenose de artéria renal ou hipovolemia. O mesmo vale para a pequena queda da TFG após iSGLT2.|q-adap25-031,q-unifesp2026-034]] [[O bloqueio duplo (IECA + BRA) é contraindicado: mais hipercalemia e lesão aguda, sem benefício renal.|q-adap25-055]]`,
          texto: `- Albuminúria: **IECA ou BRA**, mesmo com TFG baixa. {q-unifesp2025-031,q-006}
- Creatinina sobe até 30%: **manter** e repetir. {q-adap25-031,q-unifesp2026-034}
- **Nunca** IECA + BRA. {q-adap25-055}` },
        { id: "nef-novos", titulo: "iSGLT2, finerenona e o diabético", conferir: true, diretrizes: ["kdigo-drc-2024","kdigo-dm-2022"],
          casos: ["q-uspsp3-079","q-sirio2025-005"],
          questoes: ["q-adap25-055","q-sirio2027-001","q-unifesp2025-055","q-uspsp5-015","q-uspsp3-079","q-sirio2025-005","q-unifesp2026-034","q-sirio2024-017"],
          prosa: `[[O **iSGLT2** (empagliflozina, dapagliflozina) entra para todo diabético tipo 2 com TFG ≥ 20, e também para DRC com albuminúria sem diabetes, **independentemente da glicemia**: o benefício renal e cardiovascular não depende de baixar a glicose.|q-adap25-055,q-sirio2027-001,q-unifesp2025-055,q-sirio2024-017]] [[Se a albuminúria persiste acima de 30 mg/g com IECA/BRA e iSGLT2 em dose plena, com potássio normal, associa-se a **finerenona**.|q-uspsp3-079,q-uspsp5-015]] [[A metformina se ajusta pela TFG: reduz a dose abaixo de 45 e suspende abaixo de 30; com TFG de 44–50 e boa tolerância, nada precisa mudar.|q-uspsp5-015,q-unifesp2026-034]] [[No hipertenso com DRC, prefere-se o que protege: bloqueio do SRAA e iSGLT2; o bloqueador de canal de cálcio que causa edema pode sair; o AAS em prevenção primária sem doença aterosclerótica, também. Quando falta anti-hipertensivo e o potássio limita, a clonidina é uma opção.|q-unifesp2025-055,q-sirio2025-005]]`,
          texto: `- **iSGLT2** com TFG ≥ 20, independente da glicemia. {q-adap25-055,q-sirio2027-001,q-unifesp2025-055,q-sirio2024-017}
- Albuminúria persistente: **finerenona**. {q-uspsp3-079,q-uspsp5-015}
- Metformina: reduz < 45, **suspende < 30**. {q-uspsp5-015,q-unifesp2026-034}` },
        { id: "nef-dieta", titulo: "Proteína, bicarbonato e volume", conferir: true, diretrizes: ["kdigo-drc-2024"],
          questoes: ["q-einstein2026-014","q-sirio2024-017","q-usp2026-022"],
          prosa: `[[Na DRC G3–G5 fora de diálise, a ingestão proteica recomendada é cerca de **0,8 g/kg/dia**, de preferência vegetal: excesso de proteína aumenta a hiperfiltração, a carga ácida e o fósforo. Uma dieta de 1,6 g/kg deve ser reduzida à metade.|q-einstein2026-014]] [[Bicarbonato abaixo de 22 mEq/L pede **bicarbonato de sódio**: a acidose acelera a progressão e consome músculo e osso.|q-sirio2024-017]] [[No paciente em diálise, a hipertensão é sobretudo de volume; antes de trocar remédio, **pesar** e comparar com o peso seco.|q-usp2026-022]]`,
          texto: `- Proteína **0,8 g/kg/dia**, vegetal. {q-einstein2026-014}
- HCO3 < 22: **bicarbonato**. {q-sirio2024-017}
- Hipertensão na diálise: **peso**. {q-usp2026-022}` },
      ],
    },
    {
      id: "complicacoes", titulo: "Complicações",
      introducao: `[[O rim também é glândula e regulador: produz eritropoetina e calcitriol, excreta fósforo, ácido e potássio, e degrada insulina. Cada função perdida gera uma complicação previsível.|q-iamspe2025-019,q-tp20241-003,q-tp20261-027,q-scmsp2026-015]]`,
      fragmentos: [
        { id: "comp-anemia", titulo: "Anemia", conferir: true, diretrizes: ["kdigo-anemia"],
          questoes: ["q-iamspe2025-019","q-adap26-034","q-tp20202-025","q-uspsp5-015"],
          prosa: `[[A anemia da DRC é normocítica e hipoproliferativa, causada principalmente pela **menor produção de eritropoetina**.|q-iamspe2025-019,q-tp20202-025]] [[Antes do agente estimulador da eritropoese, corrigir o ferro: na DRC, ferritina abaixo de 500 e saturação da transferrina abaixo de 30% indicam reposição (oral ou venosa); só depois, com hemoglobina abaixo de 10, entra a eritropoetina, mirando não ultrapassar 11,5.|q-adap26-034,q-uspsp5-015]]`,
          texto: `- Causa: **eritropoetina** baixa. {q-iamspe2025-019,q-tp20202-025}
- **Ferro primeiro** (sat < 30%), depois eritropoetina. {q-adap26-034,q-uspsp5-015}` },
        { id: "comp-dmo", titulo: "Distúrbio mineral e ósseo", conferir: true, diretrizes: ["kdigo-dmo-2017"],
          figuras: [{ arquivo: "figuras/dmo-drc.svg", legenda: "Esquema autoral: do néfron perdido ao hiperparatireoidismo secundário." }],
          questoes: ["q-tp20241-003","q-tp20261-027","q-tp20212-003","q-usprp2024-048","q-tp20232-008","q-unesp2024-055","q-adap23-064","q-famema2022-026","q-simepm89-050"],
          prosa: `[[Com menos néfrons, o fósforo se acumula; o FGF23 sobe para excretá-lo e inibe a 1-alfa-hidroxilase; o rim doente também hidroxila menos a vitamina D. Resultado: **hiperfosfatemia, hipocalcemia, calcitriol baixo e PTH alto** — o hiperparatireoidismo secundário.|q-tp20241-003,q-tp20261-027,q-tp20212-003,q-usprp2024-048,q-tp20232-008]] [[Na DRC estágio 3–5, PTH, cálcio, fósforo e 25-OH-vitamina D são dosados periodicamente, mesmo com cálcio e fósforo normais.|q-simepm89-050]] [[Tratamento em degraus: restrição dietética de fósforo e **quelante às refeições** (sevelamer, sem cálcio nem alumínio), correção da 25-OH-vitamina D baixa, e calcitriol ou calcimimético só no hiperparatireoidismo progressivo; paratireoidectomia é para o refratário.|q-adap23-064,q-famema2022-026,q-unesp2024-055]]`,
          texto: `- DRC: **↑P, ↓Ca, ↓calcitriol, ↑PTH**. {q-tp20241-003,q-tp20261-027,q-tp20212-003,q-usprp2024-048,q-tp20232-008}
- Dosar PTH no G3–G5. {q-simepm89-050}
- **Quelante** (sevelamer) + dieta + vitamina D. {q-adap23-064,q-famema2022-026,q-unesp2024-055}` },
        { id: "comp-metabolico", titulo: "Acidose e metabolismo da insulina", conferir: true, diretrizes: ["kdigo-drc-2024"],
          questoes: ["q-scmsp2025-008","q-scmsp2026-015","q-scmsp2026-018","q-unesp2024-055"],
          prosa: `[[O rim doente não excreta ácidos fixos (sulfato, fosfato, urato): surge acidose metabólica, compensada por hiperventilação, com pCO2 baixa. Nos estágios intermediários ela costuma ser hiperclorêmica (ânion gap normal), porque o primeiro defeito é a menor produção de amônia; com TFG muito baixa (abaixo de 15–20), os ânions retidos fazem o **ânion gap aumentado**.|q-scmsp2025-008,q-unesp2024-055]] [[A uremia causa **resistência à insulina**, mas o rim também degrada insulina; com a queda da TFG, a insulina dura mais e o diabético passa a ter hipoglicemias e precisar de menos dose. A pista é a **creatinina**.|q-scmsp2026-015,q-scmsp2026-018]]`,
          texto: `- Acidose: hiperclorêmica no início, **ânion gap alto** na DRC avançada; pCO2 baixa. {q-scmsp2025-008,q-unesp2024-055}
- Resistência à insulina; hipoglicemia por **menor depuração da insulina**. {q-scmsp2026-015,q-scmsp2026-018}` },
      ],
    },
    {
      id: "trs", titulo: "Terapia renal substitutiva e transplante",
      introducao: `[[A diálise não começa por um número de TFG, e sim por sintomas e complicações que não se controlam de outro modo — em geral com TFG entre 5 e 10. O preparo começa bem antes, no G4.|q-tp20252-107,q-adap21-118]]`,
      fragmentos: [
        { id: "trs-indicacao", titulo: "Quando dialisar e por qual acesso", conferir: true, diretrizes: ["kdigo-drc-2024"],
          questoes: ["q-tp20252-107","q-famema2021-023","q-didepm-006","q-adap21-118","q-usp2024-048"],
          prosa: `[[Indicações: síndrome urêmica (náuseas, inapetência, sonolência, asterixe), **pericardite urêmica**, encefalopatia, sangramento urêmico, hipercalemia ou acidose refratárias, hipervolemia refratária. A pericardite urêmica é indicação absoluta: o tratamento é a diálise, não AINE nem pericardiocentese sem tamponamento.|q-tp20252-107,q-famema2021-023,q-didepm-006]] [[Quem vai para hemodiálise eletiva deve ter **fístula arteriovenosa** pronta: no G4, preservar as veias do antebraço não dominante (sem punção, sem PICC) e encaminhar cedo, porque a fístula leva semanas a meses para amadurecer.|q-adap21-118]] [[Se a diálise é necessária nos próximos dias e não há acesso, o melhor é o **cateter semi-implantável (tunelizado) de alto fluxo**: a fístula não daria tempo.|q-usp2024-048]]`,
          texto: `- Uremia, **pericardite**, refratários: dialisar. {q-tp20252-107,q-famema2021-023,q-didepm-006}
- Eletivo: **fístula** no G4, poupar veias. {q-adap21-118}
- Urgente sem acesso: **cateter tunelizado**. {q-usp2024-048}` },
        { id: "trs-transplante", titulo: "Transplante", conferir: true, diretrizes: ["kdigo-drc-2024"],
          questoes: ["q-tp20212-011"],
          prosa: `[[Perda lenta e progressiva da função do enxerto meses depois do transplante, com proteinúria e biópsia mostrando fibrose intersticial e lesão vascular, é **rejeição crônica**; a hiperaguda ocorre em minutos por anticorpos pré-formados, e a aguda, em dias a semanas, com infiltrado inflamatório.|q-tp20212-011]]`,
          texto: `- Meses, fibrose e vasos: **rejeição crônica**. {q-tp20212-011}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["kdigo-drc-2024","kdigo-dmo-2017"],
          questoes: ["q-unesp2024-055","q-tp20232-008","q-iamspe2023-007","q-usprp2027-034","q-usprp2022-078","q-sirio2024-017"],
          prosa: `[[**Causa do PTH alto**: na DRC G4, a regra é chamar de hiperparatireoidismo secundário à DRC, com a falta de vitamina D como fator a corrigir; a unesp2024-055 chamou de secundário **à deficiência de vitamina D** (25-OH de 12), e a tp20232-008, de secundário **à DRC**.|q-unesp2024-055,q-tp20232-008]] [[**Mecanismo da nefroesclerose**: hipertensão glomerular e isquemia coexistem; a iamspe2023-007 aceitou **isquemia** como principal.|q-iamspe2023-007]] [[**Ultrassom da cronicidade**: rins pequenos são o achado clássico (usprp2022-078), mas a usprp2027-034, num diabético, cobrou a **redução da espessura cortical** como mais específica, porque no diabetes o tamanho pode estar preservado.|q-usprp2027-034,q-usprp2022-078]] [[**Glicemia controlada e iSGLT2**: a regra o indica pela proteção renal, não pela glicose; a sirio2024-017, com HbA1c 7,2%, associou empagliflozina ao bicarbonato.|q-sirio2024-017]]`,
          texto: `- PTH alto: a prova dividiu entre **DRC** e **deficiência de vitamina D**. {q-unesp2024-055,q-tp20232-008}
- Nefroesclerose: **isquemia**. {q-iamspe2023-007}
- Diabético: **córtex fino** mais que rim pequeno. {q-usprp2027-034,q-usprp2022-078}
- iSGLT2 **mesmo com glicemia boa**. {q-sirio2024-017}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: o que fazer em cada estágio",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-estagios", titulo: "Estágio e conduta", conferir: true,
          questoes: ["q-006","q-adap22-076","q-adap23-064","q-adap21-118","q-tp20252-107"],
          prosa: `[[A conduta acumula conforme a TFG cai.|q-006,q-adap22-076,q-adap23-064,q-adap21-118,q-tp20252-107]]

| | G1–G2 | G3a–G3b | G4 | G5 |
|---|---|---|---|---|
| TFG | ≥ 60 com lesão | 30–59 | 15–29 | < 15 |
| Nefroproteção | IECA/BRA se albuminúria; iSGLT2 | + finerenona se albuminúria persiste | iSGLT2 até TFG 20 (mantido depois) | — |
| Complicações | — | anemia, PTH, acidose: rastrear | quelante, ferro, bicarbonato | uremia |
| Metformina | dose plena | reduzir < 45 | suspender < 30 | suspensa |
| Preparo | — | nefrologista se A3 ou G3b | fístula, escolha da TRS | diálise ou transplante por sintomas |`,
          texto: `- G3b com A3: **nefrologista**. {q-006,q-adap22-076}
- G4: **quelante** e **fístula**. {q-adap23-064,q-adap21-118}
- G5 com uremia: **diálise**. {q-tp20252-107}` },
      ],
    },
  ],
});
