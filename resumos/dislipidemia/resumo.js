/* resumos/dislipidemia/resumo.js — resumo adaptativo de dislipidemia e risco cardiovascular
   (ass-dislipidemia): lipoproteínas e hipertrigliceridemia por falta de insulina, HDL, arco corneano,
   jejum e rastreamento, estratificação de risco, metas de LDL, estatinas (potência, horário, miosite),
   síndrome metabólica (adulto e criança), hipercolesterolemia familiar e dislipidemia da obesidade
   na infância; armadilhas e tabela das categorias de risco.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- dislipidemia */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "dislipidemia",
  titulo: "Dislipidemia e risco cardiovascular",
  assunto: "ass-dislipidemia",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "sbc-dislipidemia", texto: "Sociedade Brasileira de Cardiologia — Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose (2017 e atualização de 2025)", lidoEm: null },
    { id: "ms-cab-rcv", texto: "Ministério da Saúde — Cadernos de Atenção Básica: rastreamento (nº 29) e estratificação de risco cardiovascular", lidoEm: null },
    { id: "idf-sm", texto: "NCEP-ATP III / IDF — critérios de síndrome metabólica; SBP — dislipidemia na infância", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "lipides", titulo: "Lipoproteínas e o exame",
      introducao: `[[O colesterol e os triglicérides viajam no sangue dentro de lipoproteínas. O **LDL** leva colesterol aos tecidos e, retido na parede da artéria e oxidado, forma a placa: é a fração **causal** da aterosclerose e o alvo do tratamento. O **HDL** faz o caminho de volta. Os triglicérides andam nos quilomícrons e no VLDL e são retirados pela **lipase lipoproteica**, uma enzima que depende de **insulina**.|q-scmsp2022-062,q-amrigs2024-003]]

Veja também: **Doença coronariana**, **Diabetes**, **Hipertensão** e **Prevenção**.`,
      fragmentos: [
        { id: "lip-metabolismo", titulo: "Triglicérides, HDL e o que o exame físico mostra", conferir: true,
          casos: ["q-usprp2023-070"],
          questoes: ["q-scmsp2022-062","q-amrigs2024-003","q-usprp2023-070"],
          prosa: `[[Sem insulina (cetoacidose do diabetes tipo 1) a **lipase lipoproteica** quase para e a lipólise do tecido adiposo dispara: os triglicérides passam de milhares e o soro fica **leitoso**. Corrigida a insulina, cai.|q-scmsp2022-062]] [[HDL alto costuma acompanhar menor risco, mas não protege sempre: em algumas doenças genéticas o HDL muito alto não reduz eventos.|q-amrigs2024-003]] [[O **arco corneano** (faixa branca na borda da córnea) no idoso é achado da idade e **não pede investigação**; no jovem, sugere hipercolesterolemia familiar.|q-usprp2023-070]]`,
          texto: `- Sem insulina: **lipase lipoproteica para**, TG > 1.000 e soro leitoso. {q-scmsp2022-062}
- HDL alto geralmente protege, **nem sempre**. {q-amrigs2024-003}
- Arco corneano no idoso: **não investigar**. {q-usprp2023-070}` },
        { id: "lip-exame", titulo: "Jejum e rastreamento", conferir: true, diretrizes: ["sbc-dislipidemia","ms-cab-rcv"],
          questoes: ["q-sirio2021-100","q-sessp2023-064"],
          prosa: `[[O perfil lipídico pode ser colhido **sem jejum**: só os triglicérides sobem depois de comer. Se vierem acima de **440 mg/dL**, repete-se **com jejum de 12 horas**.|q-sirio2021-100]] [[O caderno de rastreamento do Ministério da Saúde recomenda dosar lipídios em **homens a partir dos 35 anos** e em mulheres a partir dos 45, e antes disso em quem tem outros fatores de risco.|q-sessp2023-064]]`,
          texto: `- Sem jejum vale; TG > 440: **repetir em jejum**. {q-sirio2021-100}
- Rastrear **homens ≥ 35 anos** (MS). {q-sessp2023-064}` },
      ],
    },
    {
      id: "risco", titulo: "Risco cardiovascular e metas",
      introducao: `[[A estatina não se indica pelo número do colesterol, e sim pelo **risco** do paciente: quem já teve infarto tem risco tão alto que a estatina entra com qualquer LDL. A meta de LDL fica mais baixa quanto maior o risco, porque cada redução de LDL reduz eventos proporcionalmente.|q-card-30,q-tp20251-001,q-usprp2024-015]]`,
      fragmentos: [
        { id: "ris-estratificacao", titulo: "Estratificar o risco", conferir: true, diretrizes: ["sbc-dislipidemia","ms-cab-rcv"],
          questoes: ["q-scmsp2025-097","q-sirio2023-087","q-uspsp4-089","q-tp20212-104","q-tp20231-116","q-einstein2024-070"],
          prosa: `[[Doença aterosclerótica já manifesta (infarto, AVC isquêmico, doença arterial periférica, aneurisma de aorta, placa significativa) põe o paciente direto no **risco mais alto**; não se calcula escore. É o caso do paciente com infarto prévio.|q-tp20212-104,q-tp20231-116,q-scmsp2025-097]] [[O **diabetes** não é automaticamente alto risco. Pela diretriz brasileira de 2017, é **alto** com **idade** (homem ≥ 48, mulher ≥ 54 anos), diabetes há mais de 10 anos ou um **estratificador** (doença renal com TFG < 60, albuminúria, retinopatia, tabagismo, hipertensão...); sem isso, é **intermediário**.|q-sirio2023-087,q-scmsp2025-097,q-uspsp4-089,q-einstein2024-070]]`,
          texto: `- Infarto, AVC, doença arterial: **risco mais alto**, sem escore. {q-tp20212-104,q-tp20231-116,q-scmsp2025-097}
- Diabetes **com idade ou estratificador**: alto; diabetes recente na mulher de 52: intermediário. {q-sirio2023-087,q-scmsp2025-097,q-uspsp4-089,q-einstein2024-070}` },
        { id: "ris-metas", titulo: "Metas de LDL", conferir: true, diretrizes: ["sbc-dislipidemia"],
          figuras: [{ arquivo: "figuras/metas-ldl.svg", legenda: "Esquema autoral: metas de LDL por categoria de risco e o tratamento correspondente." }],
          questoes: ["q-tp20251-001","q-tp20261-004","q-famema2022-025","q-usprp2024-015","q-card-30","q-sessp2026-090","q-scmsp2026-092"],
          prosa: `[[Após síndrome coronariana aguda ou com doença aterosclerótica (**muito alto risco**): **LDL < 50 mg/dL**, com estatina de alta potência independentemente do LDL inicial.|q-tp20251-001,q-tp20261-004,q-famema2022-025,q-card-30]] [[**Alto risco** (diabetes com estratificadores, hipertenso com vários fatores): **LDL < 70 mg/dL**; LDL de 118 ou 121 nesse paciente está **fora da meta** e a estatina se intensifica.|q-usprp2024-015,q-sessp2026-090,q-scmsp2026-092]] Intermediário: LDL < 100. Fora da meta com estatina na dose máxima, associa-se **ezetimiba**.`,
          texto: `- Muito alto (pós-SCA): **LDL < 50**. {q-tp20251-001,q-tp20261-004,q-famema2022-025,q-card-30}
- Alto: **LDL < 70**; acima disso, intensificar. {q-usprp2024-015,q-sessp2026-090,q-scmsp2026-092}` },
        { id: "ris-estilo", titulo: "Risco baixo e estilo de vida", conferir: true,
          questoes: ["q-unicampdis2024-002","q-unicamp2023-005"],
          prosa: `[[Risco baixo em 10 anos (2,4%), mesmo com triglicérides altos e obesidade: **mudança do estilo de vida**, sem remédio; triglicérides moderados respondem a peso, álcool e açúcar.|q-unicampdis2024-002]] [[Fatores psicossociais também contam: **isolamento social** e solidão aumentam o risco de infarto e AVC e, neste paciente, pesam mais que uma lata de cerveja ou carne vermelha duas vezes por semana.|q-unicamp2023-005]]`,
          texto: `- Risco baixo: **mudança de estilo de vida**, sem remédio. {q-unicampdis2024-002}
- **Isolamento social** é fator de risco cardiovascular. {q-unicamp2023-005}` },
      ],
    },
    {
      id: "tratamento", titulo: "Estatinas",
      introducao: `[[A estatina inibe a HMG-CoA redutase, a enzima que fabrica colesterol no fígado; o hepatócito com pouco colesterol aumenta os receptores de LDL e tira LDL do sangue. É o remédio com mais evidência de reduzir infarto e morte.|q-uspsp3-080,q-einstein2024-070,q-scmsp2022-073]]`,
      fragmentos: [
        { id: "tra-potencia", titulo: "Potência e horário", conferir: true, diretrizes: ["sbc-dislipidemia"],
          questoes: ["q-uspsp3-080","q-einstein2024-070","q-scmsp2022-073","q-card-30"],
          prosa: `[[**Alta potência** (reduz LDL ≥ 50%): **atorvastatina 40–80 mg** ou **rosuvastatina 20–40 mg**. Sinvastatina 10–20 mg é baixa potência e não serve depois de infarto; troca-se por rosuvastatina ou atorvastatina em dose alta. Fibrato não é para reduzir LDL.|q-uspsp3-080,q-einstein2024-070,q-card-30]] [[A **sinvastatina** tem meia-vida curta e a síntese de colesterol é maior à noite: toma-se **à noite**. Atorvastatina e rosuvastatina, de meia-vida longa, podem ser tomadas a qualquer hora.|q-scmsp2022-073]]`,
          texto: `- Pós-infarto: **rosuvastatina 20–40 ou atorvastatina 40–80**. {q-uspsp3-080,q-einstein2024-070,q-card-30}
- Sinvastatina **à noite**. {q-scmsp2022-073}` },
        { id: "tra-miosite", titulo: "Efeito adverso: dor muscular", conferir: true,
          questoes: ["q-einstein2022-023"],
          prosa: `[[A estatina pode lesar o músculo: **dor e fraqueza simétricas** nas pernas logo após começar, com CK às vezes elevada (**miosite**). Distingue-se da claudicação, que aparece só ao andar e passa em repouso. Suspende-se, dosa-se CK e reintroduz-se outra estatina ou dose menor.|q-einstein2022-023]]`,
          texto: `- Dor muscular dias após iniciar: **miosite por estatina**. {q-einstein2022-023}` },
      ],
    },
    {
      id: "metabolica", titulo: "Síndrome metabólica",
      introducao: `[[A gordura visceral resiste à insulina e despeja ácidos graxos no fígado: sobem triglicérides, glicemia e pressão, cai o HDL. A **síndrome metabólica** é esse conjunto, e o critério mais usado exige **3 de 5** componentes.|q-iamspe2023-003,q-tp20241-007,q-einstein2021-001]]`,
      fragmentos: [
        { id: "sm-criterios", titulo: "Os cinco critérios", conferir: true, diretrizes: ["idf-sm"],
          questoes: ["q-iamspe2023-003","q-tp20232-009","q-tp20261-106","q-tp20241-007","q-einstein2021-001","q-einstein2023-005"],
          prosa: `[[Os cinco: **circunferência abdominal** aumentada, **triglicérides ≥ 150**, **HDL baixo** (< 40 no homem, < 50 na mulher), **pressão ≥ 130/85** (ou tratamento) e **glicemia de jejum alterada** (≥ 100, em critérios antigos 110). **LDL, colesterol total, IMC e HbA1c não entram.**|q-iamspe2023-003,q-tp20232-009,q-tp20261-106,q-tp20241-007,q-einstein2021-001]] [[Homem com cintura de 106 cm, glicemia 112–118, TG 220 e HDL 30 tem síndrome metabólica (e pré-diabetes, não diabetes).|q-einstein2023-005]]`,
          texto: `- Cintura, **TG ≥ 150, HDL baixo, PA ≥ 130/85, glicemia**; LDL **não** entra. {q-iamspe2023-003,q-tp20232-009,q-tp20261-106,q-tp20241-007,q-einstein2021-001}
- 3 critérios: **síndrome metabólica**. {q-einstein2023-005}` },
      ],
    },
    {
      id: "infancia", titulo: "Dislipidemia na infância",
      introducao: `[[Na criança, colesterol alto tem duas origens bem diferentes: a **genética** (hipercolesterolemia familiar, LDL muito alto desde cedo, com pais que infartaram jovens) e a da **obesidade** (triglicérides altos e HDL baixo, com LDL quase normal).|q-adap24-051,q-usprp2025-012,q-udisc20262-041]]`,
      fragmentos: [
        { id: "inf-familiar", titulo: "Hipercolesterolemia familiar", conferir: true, diretrizes: ["idf-sm"],
          casos: ["q-usprp2025-012"],
          questoes: ["q-adap24-051","q-usprp2025-012"],
          prosa: `[[A **hipercolesterolemia familiar** é autossômica dominante (receptor de LDL defeituoso): LDL muito alto desde a infância, **xantomas tendíneos** e infarto precoce nos pais. Criança com xantomas e pais assim: **perfil lipídico**.|q-adap24-051]] [[LDL que continua muito alto depois de meses de dieta e atividade física, a partir dos 8–10 anos, recebe **estatina**.|q-usprp2025-012]]`,
          texto: `- Xantomas + pais com infarto precoce: **perfil lipídico** (HF). {q-adap24-051}
- LDL alto após mudança de vida, ≥ 8–10 anos: **estatina**. {q-usprp2025-012}` },
        { id: "inf-obesidade", titulo: "Dislipidemia da obesidade e síndrome metabólica na criança", conferir: true, diretrizes: ["idf-sm"],
          questoes: ["q-udisc20262-041","q-unesp2026-007"],
          prosa: `[[Criança obesa com **triglicérides altos e HDL baixo** e LDL pouco alterado tem **dislipidemia da obesidade**, que melhora com perda de peso.|q-udisc20262-041]] [[Com cintura e pressão acima do percentil 95, acantose nigricans e lipídios alterados já há critérios de **síndrome metabólica** antes da puberdade completa: mudança de estilo de vida e avaliação metabólica.|q-unesp2026-007]]`,
          texto: `- Obesa com TG alto e HDL baixo: **dislipidemia da obesidade**. {q-udisc20262-041}
- Criança pode ter **síndrome metabólica**. {q-unesp2026-007}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["sbc-dislipidemia","ms-cab-rcv"],
          questoes: ["q-tp20212-104","q-tp20231-116","q-card-30","q-tp20251-001","q-scmsp2026-092"],
          prosa: `[[**Infarto prévio**: a diretriz de dislipidemia o chama de **muito alto risco**; o caderno do Ministério da Saúde, com três categorias, chama de **alto**, e foi isso que as tp20212-104 e tp20231-116 cobraram.|q-tp20212-104,q-tp20231-116]] [[**Meta pós-infarto**: a meta brasileira é **< 50 mg/dL** (tp20251-001); a card-30, autoral, escreveu "bem abaixo de 70".|q-card-30,q-tp20251-001]] [[**"LDL < 130 é meta de alto risco"** é falso: 130 nunca foi meta de alto risco.|q-scmsp2026-092]]`,
          texto: `- Infarto prévio: **muito alto** (SBC) × **alto** (MS). {q-tp20212-104,q-tp20231-116}
- Meta pós-infarto **< 50**. {q-card-30,q-tp20251-001}
- LDL < 130 **não** é meta de alto risco. {q-scmsp2026-092}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: categorias de risco",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-risco", titulo: "Quem está em cada categoria e a meta", conferir: true,
          questoes: ["q-tp20251-001","q-usprp2024-015","q-scmsp2025-097","q-unicampdis2024-002"],
          prosa: `[[A categoria de risco decide a meta.|q-tp20251-001,q-usprp2024-015,q-scmsp2025-097,q-unicampdis2024-002]]

| Categoria | Exemplos | LDL-alvo (mg/dL) | Conduta |
| Muito alto | infarto, AVC isquêmico, doença arterial periférica | < 50 | estatina de alta potência; ezetimiba se preciso |
| Alto | diabetes com idade ou estratificador, DRC | < 70 | estatina |
| Intermediário | diabetes recente sem estratificador, escore intermediário | < 100 | estatina conforme o caso |
| Baixo | escore baixo | — | estilo de vida |`,
          texto: `- Muito alto: **< 50**. {q-tp20251-001}
- Alto: **< 70**. {q-usprp2024-015}
- Diabetes recente sem estratificador: **intermediário**. {q-scmsp2025-097}
- Baixo: **estilo de vida**. {q-unicampdis2024-002}` },
      ],
    },
  ],
});
