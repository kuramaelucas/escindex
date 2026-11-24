/* resumos/cirurgia-bariatrica/resumo.js — resumo adaptativo de cirurgia bariátrica e complicações
   (ass-cirbariatrica): indicações e contraindicações, escolha da técnica (sleeve × bypass) e hormônios
   intestinais, pós-operatório imediato (atelectasia, dieta, azul de metileno), fístula e sangramento,
   TEP, rabdomiólise, hérnia interna, estenose e úlcera marginal, hipoglicemia pós-bypass, alça
   aferente, deficiências nutricionais e Wernicke; armadilhas e tabela sleeve × bypass.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- cirurgia-bariatrica */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "cirurgia-bariatrica",
  titulo: "Cirurgia bariátrica e complicações",
  assunto: "ass-cirbariatrica",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "cfm-bariatrica", texto: "CFM — Resoluções 2.131/2015 (cirurgia bariátrica) e 2.172/2017 (cirurgia metabólica no diabetes); ASMBS/IFSO 2022 (indicações)", lidoEm: null },
    { id: "asmbs-nutricao", texto: "ASMBS — Integrated health nutritional guidelines (2016/2019) e diretrizes de cuidado perioperatório (2019)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "indicacao", titulo: "Indicação e técnica",
      introducao: `[[A obesidade grave aumenta o risco de diabetes, hipertensão, doença renal, esteatose e vários cânceres. A cirurgia funciona não só por diminuir o estômago, mas por mudar os **hormônios intestinais**: o alimento que chega rápido ao íleo libera **GLP-1** e PYY (saciedade, mais insulina, esvaziamento gástrico mais lento) e cai a grelina.|q-amrigs2025-035,q-amrigs2024-038,q-famema2021-012]]

Veja também: **Diabetes**, **Dislipidemia**, **Obstrução intestinal** e **Doença péptica**.`,
      fragmentos: [
        { id: "ind-criterios", titulo: "Quem tem indicação", conferir: true, diretrizes: ["cfm-bariatrica"],
          questoes: ["q-tp20231-065","q-fmabc2021-009","q-amrigs2025-035"],
          prosa: `[[Indica-se a cirurgia com **IMC ≥ 40**, ou **IMC ≥ 35 com comorbidade** (diabetes, hipertensão, esteatose, refluxo, artropatia, apneia), depois de tratamento clínico sem sucesso; com **IMC 30–35 e diabetes tipo 2** de difícil controle, a cirurgia metabólica também é aceita.|q-tp20231-065,q-fmabc2021-009]] [[São contraindicações **uso de drogas ou álcool não controlado**, doença psiquiátrica grave descompensada e incapacidade de seguir o acompanhamento.|q-fmabc2021-009]] [[A obesidade grave associa-se a doença renal terminal e a cânceres, inclusive de próstata, e a perda de peso reduz esse risco.|q-amrigs2025-035]]`,
          texto: `- **IMC ≥ 40** ou **≥ 35 com comorbidade** após falha clínica. {q-tp20231-065,q-fmabc2021-009}
- Contraindica: **drogas não controladas**. {q-fmabc2021-009}
- Obesidade grave: rim, câncer. {q-amrigs2025-035}` },
        { id: "ind-tecnica", titulo: "Sleeve ou bypass", conferir: true, diretrizes: ["cfm-bariatrica"],
          casos: ["q-uspsp1-047"],
          questoes: ["q-iamspe2026-034","q-sirio2024-023","q-uspsp1-047","q-famema2021-012"],
          prosa: `[[A **gastrectomia vertical (sleeve)** retira a grande curvatura e deixa um tubo gástrico: a peça é um estômago longo e estreito. Por aumentar a pressão no tubo, **piora o refluxo**.|q-uspsp1-047,q-iamspe2026-034]] [[O **bypass gástrico em Y de Roux** desvia o alimento do estômago e do duodeno: **trata o refluxo** (esofagite grau C é indicação de bypass) e controla melhor o diabetes e a compulsão por doces, que causa dumping.|q-iamspe2026-034,q-sirio2024-023]] [[No diabetes, os resultados iniciais do sleeve e do bypass são **semelhantes**.|q-famema2021-012]]`,
          texto: `- Refluxo importante: **bypass**; sleeve piora o refluxo. {q-iamspe2026-034,q-sirio2024-023}
- Peça longa da grande curvatura: **sleeve**. {q-uspsp1-047}
- Diabetes: sleeve ≈ bypass no início. {q-famema2021-012}` },
        { id: "ind-hormonios", titulo: "Hormônios intestinais", conferir: true,
          questoes: ["q-amrigs2024-038","q-famema2021-012"],
          prosa: `[[O **GLP-1** **retarda o esvaziamento gástrico** e aumenta a insulina; o PYY **aumenta** depois do bypass; a grelina é produzida pelas células do fundo gástrico (não pelas parietais) e estimula o NPY no hipotálamo.|q-amrigs2024-038]] [[Os sais biliares circulantes **sobem** depois do bypass e do sleeve, o que também melhora a glicemia.|q-famema2021-012]]`,
          texto: `- **GLP-1 retarda o esvaziamento gástrico**; PYY sobe após o bypass. {q-amrigs2024-038}
- Sais biliares **sobem** após a cirurgia. {q-famema2021-012}` },
      ],
    },
    {
      id: "precoces", titulo: "Pós-operatório e complicações precoces",
      introducao: `[[O obeso compensa mal: tem pouca reserva respiratória e o abdome não mostra peritonite. Por isso a **taquicardia** que não se explica é o principal sinal de complicação grave (fístula, sangramento, TEP), e a febre leve com pulmão de bases diminuídas no primeiro dia costuma ser só atelectasia.|q-usp2025-039,q-unifesp2024-011,q-usp2026-028]]`,
      fragmentos: [
        { id: "pre-rotina", titulo: "Primeiro dia: atelectasia, dieta e azul de metileno", conferir: true, diretrizes: ["asmbs-nutricao"],
          questoes: ["q-fmabc2022-034","q-usp2025-039","q-sirio2024-034","q-sirio2023-038"],
          prosa: `[[No **primeiro dia**, febre baixa, tosse e bases diminuídas no paciente deitado são **atelectasia**: **analgesia e fisioterapia respiratória e motora**, sem antibiótico nem tomografia.|q-fmabc2022-034,q-usp2025-039]] [[A **dieta líquida** começa **no mesmo dia ou no seguinte**, sem esperar eliminação de gases. O azul de metileno dado por boca para testar vazamento é absorvido e sai na urina: **urina esverdeada é normal**, e com o paciente bem segue-se a dieta.|q-sirio2024-034,q-sirio2023-038]]`,
          texto: `- 1º dia com febre leve: **atelectasia → analgesia e fisioterapia**. {q-fmabc2022-034,q-usp2025-039}
- **Dieta líquida no mesmo dia/dia seguinte**; urina azul-esverdeada é esperada. {q-sirio2024-034,q-sirio2023-038}` },
        { id: "pre-fistula", titulo: "Fístula e sangramento", conferir: true,
          questoes: ["q-unifesp2024-011","q-uspsp5-071","q-usp2026-028"],
          prosa: `[[Entre o 3º e o 7º dia, **taquicardia, dor, desidratação e piora geral** são **fístula** até prova em contrário (do pouch gástrico ou da gastrojejunostomia). Saída de **líquido bilioso** pela ferida aponta para a anastomose que recebe bile: a **jejunojejunal**.|q-unifesp2024-011,q-uspsp5-071]] [[Já no **primeiro dia**, palidez, **taquicardia de 130** e pressão no limite, com abdome flácido, indicam **sangramento** (da linha de grampos ou da anastomose).|q-usp2026-028]]`,
          texto: `- 3º–7º dia, taquicardia e piora: **fístula**; bile pela ferida: **jejunojejunal**. {q-unifesp2024-011,q-uspsp5-071}
- 1º dia, pálido e FC 130: **sangramento**. {q-usp2026-028}` },
        { id: "pre-tep", titulo: "Tromboembolismo pulmonar", conferir: true,
          questoes: ["q-adap24-008","q-udisc20262-063"],
          prosa: `[[O obeso operado e pouco deambulante tem risco alto de trombose: o **TEP** é a principal causa de morte precoce depois da bariátrica. Dispneia súbita com dor pleurítica e taquicardia no 5º dia é TEP até prova em contrário; por isso profilaxia farmacológica e deambulação precoce.|q-adap24-008,q-udisc20262-063]]`,
          texto: `- Principal causa de morte precoce: **TEP**. {q-adap24-008,q-udisc20262-063}` },
        { id: "pre-rabdomiolise", titulo: "Rabdomiólise", conferir: true,
          questoes: ["q-usprp2025-098"],
          prosa: `[[Superobeso (IMC muito alto) em cirurgia **longa** comprime os glúteos e as costas contra a mesa: o músculo isquemia e libera mioglobina, que lesa o rim. Dor glútea, urina escura e creatinina subindo pedem **CPK**, **hidratação vigorosa** e alcalinização.|q-usprp2025-098]]`,
          texto: `- Superobeso, cirurgia longa, urina escura: **CPK, hidratação**. {q-usprp2025-098}` },
      ],
    },
    {
      id: "tardias", titulo: "Complicações tardias",
      introducao: `[[O bypass cria alças e espaços novos no abdome. Quando o paciente perde muita gordura do mesentério, esses espaços se abrem e o intestino pode se encarcerar; e a anastomose gastrojejunal, sem a proteção alcalina do duodeno, pode estreitar ou ulcerar.|q-uspsp5-068,q-usp2022-075,q-didepm-047]]`,
      fragmentos: [
        { id: "tar-hernia", titulo: "Hérnia interna", conferir: true,
          casos: ["q-uspsp5-068","q-usp2023-015"],
          questoes: ["q-usp2023-015","q-uspsp1-038","q-uspsp5-068"],
          prosa: `[[Meses ou anos depois do bypass, com grande perda de peso, **dor abdominal em cólica**, intermitente, desproporcional ao exame, é **hérnia interna** (o espaço de **Petersen** atrás da alça alimentar é o clássico); a tomografia mostra o redemoinho do mesentério. O tratamento é **cirúrgico** (laparoscopia), mesmo com exame pobre, porque a alça pode necrosar. Cálculo biliar também é frequente nessa fase de perda rápida de peso, mas não explica a obstrução.|q-usp2023-015,q-uspsp1-038,q-uspsp5-068]]`,
          texto: `- Dor em cólica após perder peso: **hérnia interna (Petersen) → cirurgia**. {q-usp2023-015,q-uspsp1-038,q-uspsp5-068}` },
        { id: "tar-anastomose", titulo: "Estenose e úlcera marginal", conferir: true,
          questoes: ["q-usp2022-075","q-didepm-047"],
          prosa: `[[Semanas a meses depois, **disfagia e regurgitação de sólidos** progressivas sugerem **estenose da gastrojejunostomia**, que se trata com dilatação endoscópica.|q-usp2022-075]] [[Dor em queimação e sangramento em quem **fuma** ou usa **anti-inflamatório** é **úlcera marginal**: suspender o AINE e o cigarro, **inibidor de bomba e sucralfato**, pesquisar *H. pylori*.|q-didepm-047]]`,
          texto: `- Disfagia a sólidos: **estenose da gastrojejunostomia**. {q-usp2022-075}
- Tabaco/AINE: **úlcera marginal → suspender, IBP + sucralfato**. {q-didepm-047}` },
        { id: "tar-hipoglicemia", titulo: "Dumping e hipoglicemia pós-bypass", conferir: true,
          questoes: ["q-adap26-026"],
          prosa: `[[O açúcar chega rápido ao jejuno, a glicemia sobe muito e o pâncreas, estimulado também pelo GLP-1, solta insulina demais: **1 a 3 horas** depois vem **hipoglicemia** (tremor, sudorese, confusão). O tratamento começa pela **dieta**: refeições fracionadas, pouco carboidrato de alto índice glicêmico, proteína e fibra.|q-adap26-026]]`,
          texto: `- Hipoglicemia 1–3 h após doces: **dieta fracionada, sem açúcar rápido**. {q-adap26-026}` },
        { id: "tar-alca", titulo: "Síndrome da alça aferente", conferir: true,
          questoes: ["q-sirio2027-031"],
          prosa: `[[Na gastrectomia com reconstrução a **Billroth II**, a alça que traz bile e suco pancreático pode se obstruir: ela enche, dói em cólica e se esvazia de repente com **vômito bilioso em jato** que alivia a dor (**síndrome da alça aferente**).|q-sirio2027-031]]`,
          texto: `- Billroth II, dor que alivia com vômito bilioso em jato: **alça aferente**. {q-sirio2027-031}` },
      ],
    },
    {
      id: "nutricao", titulo: "Deficiências nutricionais",
      introducao: `[[O bypass tira o alimento do caminho onde ele seria absorvido. O **ferro** e o cálcio são absorvidos no duodeno, que fica fora do trânsito; a **vitamina B12** precisa do fator intrínseco do estômago e de ácido. Por isso todo operado precisa de **reposição e acompanhamento de vitaminas para sempre**, qualquer que seja a técnica.|q-fmabc2025-033,q-amrigs2020-028,q-udisc20262-072]]`,
      fragmentos: [
        { id: "nut-deficiencias", titulo: "Ferro, B12 e as outras", conferir: true, diretrizes: ["asmbs-nutricao"],
          questoes: ["q-fmabc2025-033","q-udisc20262-072","q-amrigs2020-028"],
          prosa: `[[As deficiências mais comuns depois do bypass são de **ferro e vitamina B12** (anemia). A **tiamina (B1)** em falta causa neuropatia periférica e **Wernicke-Korsakoff**; a vitamina A, xeroftalmia; o zinco, alopecia e dermatite.|q-fmabc2025-033,q-udisc20262-072]] [[Todos os pacientes, de **qualquer técnica**, precisam de controle e reposição de vitaminas; hérnia interna é das técnicas com alças (não do sleeve), e a gestação é possível, adiada até o peso estabilizar.|q-amrigs2020-028]]`,
          texto: `- Bypass: **ferro e B12**; B1 → neuropatia e Wernicke. {q-fmabc2025-033,q-udisc20262-072}
- **Reposição vitamínica para todos**. {q-amrigs2020-028}` },
        { id: "nut-wernicke", titulo: "Encefalopatia de Wernicke", conferir: true,
          questoes: ["q-unifesp2026-026","q-amrigs2025-037","q-usprp2025-100"],
          prosa: `[[O estoque de tiamina dura poucas semanas. **Vômitos repetidos** nos primeiros meses depois da cirurgia esgotam a vitamina B1, e surge **confusão, ataxia e alteração dos movimentos oculares** (nistagmo, visão dupla): **encefalopatia de Wernicke**. O mecanismo é o vômito e a ingestão pobre, não a técnica.|q-unifesp2026-026,q-amrigs2025-037,q-usprp2025-100]] [[O tratamento é **tiamina venosa antes de glicose**, porque a glicose consome a tiamina que resta e piora o quadro.|q-usprp2025-100,q-amrigs2025-037]]`,
          texto: `- Vômitos + confusão + ataxia + nistagmo: **Wernicke (B1)**. {q-unifesp2026-026,q-amrigs2025-037,q-usprp2025-100}
- **Tiamina antes da glicose**. {q-usprp2025-100,q-amrigs2025-037}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-adap24-008","q-unifesp2024-011","q-usp2025-039","q-usp2026-028"],
          prosa: `[[**A mesma paciente, dois diagnósticos**: no 5º dia de bypass, dor epigástrica, desidratação e rebaixamento são **fístula** (unifesp2024-011); dispneia súbita com dor pleurítica é **TEP** (adap24-008). A pista está no sintoma, não no dia.|q-adap24-008,q-unifesp2024-011]] [[**Taquicardia no primeiro dia**: com FC 113, bases diminuídas e dreno quase limpo, a usp2025-039 tratou **atelectasia**; com FC 130, palidez e pressão convergente, a usp2026-028 cobrou **sangramento**.|q-usp2025-039,q-usp2026-028]]`,
          texto: `- Dor e desidratação: **fístula**; dispneia súbita: **TEP**. {q-adap24-008,q-unifesp2024-011}
- FC 113 com bases baixas: **atelectasia**; FC 130 pálido: **sangramento**. {q-usp2025-039,q-usp2026-028}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: sleeve × bypass",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-tecnicas", titulo: "O que cada técnica faz", conferir: true,
          figuras: [{ arquivo: "figuras/complicacoes-no-tempo.svg", legenda: "Esquema autoral: complicações do bypass gástrico conforme o tempo depois da cirurgia." }],
          questoes: ["q-iamspe2026-034","q-uspsp1-047","q-fmabc2025-033","q-uspsp5-068"],
          prosa: `[[As duas técnicas mais usadas diferem no refluxo e nas alças.|q-iamspe2026-034,q-uspsp1-047,q-fmabc2025-033,q-uspsp5-068]]

| | Gastrectomia vertical (sleeve) | Bypass em Y de Roux |
|---|---|---|
| O que faz | tubo gástrico, retira a grande curvatura | pouch pequeno ligado ao jejuno, desvia estômago e duodeno |
| Refluxo | pode piorar | melhora |
| Alças e hérnia interna | não | sim (Petersen) |
| Deficiências | menos | ferro, B12, cálcio |
| Dumping e hipoglicemia | raros | sim |`,
          texto: `- Refluxo: **bypass**. {q-iamspe2026-034}
- Sleeve: **tubo gástrico**. {q-uspsp1-047}
- Bypass: **ferro e B12**, hérnia interna. {q-fmabc2025-033,q-uspsp5-068}` },
      ],
    },
  ],
});
