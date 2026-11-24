/* resumos/deficiencias-nutricionais/resumo.js — resumo adaptativo de deficiências nutricionais e
   vitamínicas (ass-deficvitaminica): tiamina (Wernicke-Korsakoff), niacina (pelagra), vitamina B12
   (anemia e neurologia, bypass, íleo), vitamina C (escorbuto), vitamina D (raquitismo, deficiência por
   anticonvulsivante, intoxicação), vitamina A, remédios que esgotam nutrientes, desnutrição
   (classificação, idoso, câncer), síndrome de realimentação, ferropenia e ferritina; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- deficiencias-nutricionais */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "deficiencias-nutricionais",
  titulo: "Deficiências nutricionais e vitamínicas",
  assunto: "ass-deficvitaminica",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "sbp-vitamina-d", texto: "SBP — Hipovitaminose D em pediatria (2016) e Global Consensus on Nutritional Rickets (2016)", lidoEm: null },
    { id: "aspen-realimentacao", texto: "ASPEN — Consensus recommendations for refeeding syndrome (2020); critérios GLIM de desnutrição (2019)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "hidrossoluveis", titulo: "Vitaminas do complexo B e vitamina C",
      introducao: `[[As vitaminas hidrossolúveis têm **estoque pequeno** (exceto a B12, que dura anos): faltam em semanas quando a pessoa come mal, bebe muito ou vomita. O **etilista e o morador de rua** reúnem os três riscos e podem ter várias deficiências ao mesmo tempo. Cada vitamina é cofator de uma reação, e a falta dela aparece nos tecidos que mais gastam essa reação.|q-adap21-110,q-usprp2021-110,q-adap26-022]]

Veja também: **Anemias**, **Uso de substâncias** (Wernicke), **Cirurgia bariátrica** e **Doença celíaca e má absorção**.`,
      fragmentos: [
        { id: "hid-b1", titulo: "Tiamina: Wernicke-Korsakoff", conferir: true,
          figuras: [{ arquivo: "figuras/vitaminas.svg", legenda: "Esquema autoral: as principais deficiências vitamínicas, quem tem risco e como aparecem." }],
          questoes: ["q-usprp2021-110","q-scmsp2023-018"],
          prosa: `[[A **tiamina** é cofator do metabolismo da glicose; o neurônio sem ela falha. No etilista: **confusão, ataxia e nistagmo** (encefalopatia de **Wernicke**) e, se não tratada, perda de memória com confabulação (Korsakoff), **sem** alteração da sensibilidade periférica. Repõe-se **tiamina** venosa antes da glicose.|q-usprp2021-110,q-scmsp2023-018]]`,
          texto: `- Etilista com ataxia, nistagmo, confusão: **tiamina** (Wernicke). {q-usprp2021-110,q-scmsp2023-018}` },
        { id: "hid-b3", titulo: "Niacina: pelagra", conferir: true,
          questoes: ["q-adap21-110","q-unifesp2026-022","q-udisc20262-037"],
          prosa: `[[A **niacina** (B3) forma o NAD; a falta lesa a pele exposta ao sol, o intestino e o cérebro: **dermatite fotossensível** (dorso das mãos, colar no pescoço), **diarreia** e **demência/confusão**. É a **pelagra**, do etilista e do desnutrido, tratada com **nicotinamida** e dieta.|q-adap21-110,q-unifesp2026-022,q-udisc20262-037]]`,
          texto: `- Dermatite em área de sol + diarreia + confusão: **pelagra (niacina)**. {q-adap21-110,q-unifesp2026-022,q-udisc20262-037}` },
        { id: "hid-b12", titulo: "Vitamina B12", conferir: true,
          questoes: ["q-famema2021-096","q-tp20212-009","q-einstein2023-003","q-amrigs2022-015","q-unicamp2022-030"],
          prosa: `[[A **B12** é necessária para a síntese de DNA e para a **mielina**: falta dá **anemia macrocítica** (megaloblástica, neutrófilos hipersegmentados) e **lesão neurológica** (parestesias, degeneração dos cordões posteriores com marcha talonante, declínio cognitivo), às vezes sem anemia.|q-famema2021-096,q-tp20212-009]] [[Dar **ácido fólico** a quem tem falta de B12 corrige a anemia, mas a lesão neurológica segue: **demência e marcha talonante** meses depois.|q-einstein2023-003]] [[A absorção depende do **fator intrínseco** do estômago e do **íleo terminal**: falta após **bypass gástrico** e após **ressecção do íleo** (e da válvula ileocecal).|q-amrigs2022-015,q-unicamp2022-030]]`,
          texto: `- B12: **anemia macrocítica + lesão neurológica**. {q-famema2021-096,q-tp20212-009}
- Ácido fólico sem B12: **neurológico piora**. {q-einstein2023-003}
- **Bypass** e **ressecção ileal**: falta de B12. {q-amrigs2022-015,q-unicamp2022-030}` },
        { id: "hid-c", titulo: "Vitamina C: escorbuto", conferir: true,
          questoes: ["q-adap26-022"],
          prosa: `[[Sem **vitamina C** o colágeno não é hidroxilado e fica fraco: **gengiva que sangra**, dentes que caem, petéquias em volta dos pelos, dor nas pernas por hemorragia subperiosteal. É o **escorbuto** do idoso que vive de pão e enlatados, sem frutas e verduras.|q-adap26-022]]`,
          texto: `- Gengiva sangrando + dente caindo, sem frutas: **escorbuto (vitamina C)**. {q-adap26-022}` },
      ],
    },
    {
      id: "lipossoluveis", titulo: "Vitaminas D e A",
      introducao: `[[As vitaminas lipossolúveis precisam de **gordura e bile** para ser absorvidas e se acumulam no corpo: faltam na **má absorção de gordura** (pancreatite crônica, bypass, colestase) e podem **intoxicar** quando dadas em excesso.|q-usprp2025-069,q-usprp2024-053,q-scmsp2026-047]]`,
      fragmentos: [
        { id: "lip-d", titulo: "Vitamina D", conferir: true, diretrizes: ["sbp-vitamina-d"],
          questoes: ["q-adap21-048","q-amrigs2021-005","q-scmsp2026-047","q-unesp2025-008"],
          prosa: `[[A vitamina D (lipossolúvel, feita na pele pelo sol) aumenta a absorção de cálcio; a falta impede a mineralização: **raquitismo** na criança (craniotabes, alargamento de punhos, rosário costal, pernas arqueadas, atraso para andar) e **osteomalácia** no adulto. Trata-se com **vitamina D em dose terapêutica** por 8 a 12 semanas, cálcio e sol.|q-adap21-048,q-amrigs2021-005]] [[Anticonvulsivantes como o **valproato** aceleram sua degradação: com 25-OH-D de 20 ng/mL, **suplementa-se**.|q-unesp2025-008]] [[O **excesso** causa **hipercalcemia**: náusea, vômitos, poliúria, cálculo renal e arritmia.|q-scmsp2026-047,q-amrigs2021-005]]`,
          texto: `- Falta: **raquitismo**/osteomalácia → **vitamina D 8–12 semanas** + cálcio. {q-adap21-048,q-amrigs2021-005}
- Valproato: **suplementar vitamina D**. {q-unesp2025-008}
- Excesso: **hipercalcemia** (vômito, poliúria). {q-scmsp2026-047,q-amrigs2021-005}` },
        { id: "lip-a", titulo: "Vitamina A", conferir: true,
          questoes: ["q-usprp2024-053","q-usprp2025-069"],
          prosa: `[[A vitamina A forma o pigmento da retina e mantém os epitélios: a falta dá **cegueira noturna**, **olho seco** (xeroftalmia) e **infecções** de repetição. Aparece em quem não absorve gordura: **pancreatite crônica** com esteatorreia e **pós-bariátrica**.|q-usprp2024-053,q-usprp2025-069]]`,
          texto: `- Esteatorreia ou bariátrica + olho seco, infecções: **vitamina A**. {q-usprp2024-053,q-usprp2025-069}` },
        { id: "lip-remedios", titulo: "Remédios que esgotam nutrientes", conferir: true,
          questoes: ["q-amrigs2025-011"],
          prosa: `[[Alguns remédios roubam nutrientes: **colestiramina** prende a bile e reduz a **vitamina D** (e outras lipossolúveis); **omeprazol** tira o ácido e reduz a **B12**; **isoniazida** esgota a **piridoxina** (neuropatia); **penicilamina** quela o **zinco**.|q-amrigs2025-011]]`,
          texto: `- Colestiramina → **D**; omeprazol → **B12**; isoniazida → **B6**; penicilamina → **zinco**. {q-amrigs2025-011}` },
      ],
    },
    {
      id: "desnutricao", titulo: "Desnutrição e realimentação",
      introducao: `[[Quando falta energia e proteína, o corpo consome primeiro a gordura e depois o músculo. Na criança isso aparece no peso e na altura; no adulto doente, na perda de peso recente; e quem passou fome tem o corpo adaptado à escassez, que pode descompensar quando a comida volta de repente.|q-usprp2021-048,q-unesp2025-053,q-sirio2026-021]]`,
      fragmentos: [
        { id: "des-classificacao", titulo: "Classificar e tratar", conferir: true, diretrizes: ["aspen-realimentacao"],
          questoes: ["q-usprp2021-048","q-unesp2025-053","q-usprp2025-075"],
          prosa: `[[Lactente que recebe chá e pouca papa depois do desmame, com **subcutâneo escasso e músculo atrofiado, sem edema**, tem **marasmo** (falta de energia), **primário** (por falta de comida) e **crônico** (altura também afetada); peso a 70% do esperado é segundo grau. Edema seria kwashiorkor.|q-usprp2021-048]] [[No adulto, a **perda de peso** recente vale mais que o IMC: quem perdeu muito peso por disfagia tem **desnutrição grave** mesmo com IMC ainda alto.|q-unesp2025-053]] [[Idoso com DPOC, saciedade precoce e perda de peso: **refeições fracionadas, mais proteína e calorias**, antes de sonda.|q-usprp2025-075]]`,
          texto: `- Sem edema, músculo e gordura consumidos: **marasmo**; edema: kwashiorkor. {q-usprp2021-048}
- Perda de peso recente define **desnutrição grave**, mesmo com IMC alto. {q-unesp2025-053}
- Idoso com saciedade precoce: **fracionar e enriquecer**. {q-usprp2025-075}` },
        { id: "des-realimentacao", titulo: "Síndrome de realimentação", conferir: true, diretrizes: ["aspen-realimentacao"],
          questoes: ["q-sirio2026-021"],
          prosa: `[[Em quem estava desnutrido, a glicose da nutrição faz a insulina subir e jogar **fósforo, potássio e magnésio** para dentro das células, que caem no sangue: arritmia, fraqueza, insuficiência respiratória e edema, e a tiamina se esgota. A conduta é **parar ou reduzir** a nutrição, **repor fósforo, potássio e magnésio**, dar **tiamina** e recomeçar com **10 kcal/kg/dia**, subindo devagar.|q-sirio2026-021]]`,
          texto: `- Desnutrido com P, K, Mg caindo após NPT: **realimentação** → reduzir, repor, tiamina, 10 kcal/kg. {q-sirio2026-021}` },
      ],
    },
    {
      id: "ferro", titulo: "Ferro: falta e ferritina alta",
      introducao: `[[No adulto, o corpo perde ferro quase só por **sangramento**: anemia ferropriva no homem ou na mulher depois da menopausa é sangramento digestivo até prova em contrário. Já a **ferritina** alta nem sempre é excesso de ferro, porque ela sobe com a inflamação.|q-famema2021-026,q-sirio2027-011]]`,
      fragmentos: [
        { id: "fer-adulto", titulo: "Ferropriva no adulto e ferritina na inflamação", conferir: true,
          questoes: ["q-famema2021-026","q-sirio2027-011"],
          prosa: `[[Homem de 55 anos com **anemia ferropriva** sem perda visível: **endoscopia alta e colonoscopia** antes de repor ferro, para não atrasar o diagnóstico de câncer.|q-famema2021-026]] [[Na síndrome metabólica com esteatose, a **ferritina** sobe como **reagente de fase aguda** da inflamação crônica, com saturação de transferrina normal; não é hemocromatose e não pede biópsia nem dieta sem ferro.|q-sirio2027-011]]`,
          texto: `- Ferropriva no homem: **endoscopias** antes do ferro. {q-famema2021-026}
- Ferritina alta com síndrome metabólica: **fase aguda**, não sobrecarga. {q-sirio2027-011}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-amrigs2021-005","q-usprp2021-110","q-adap21-110","q-unesp2025-008"],
          prosa: `[[**Vitamina D é lipossolúvel**, não hidrossolúvel; a afirmativa que dizia o contrário estava errada na amrigs2021-005.|q-amrigs2021-005]] [[**Wernicke × B12**: ataxia com nistagmo e sem alteração de sensibilidade é tiamina; com neuropatia sensitiva e marcha talonante, B12.|q-usprp2021-110]] [[**Pelagra × escorbuto**: dermatite em área de sol, diarreia e confusão é niacina; gengiva que sangra é vitamina C.|q-adap21-110]] [[**Dose de vitamina D**: com 20 ng/mL na criança em anticonvulsivante, a unesp2025-008 cobrou **1.000 UI/dia por 3 meses**.|q-unesp2025-008]]`,
          texto: `- Vitamina D é **lipossolúvel**. {q-amrigs2021-005}
- Ataxia sem neuropatia: **B1**; com neuropatia: B12. {q-usprp2021-110}
- Pele ao sol + diarreia: **niacina**. {q-adap21-110}
- Valproato: a prova cobrou **1.000 UI/dia**. {q-unesp2025-008}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: as deficiências",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-vitaminas", titulo: "Vitamina, quem tem, quadro", conferir: true,
          questoes: ["q-usprp2021-110","q-udisc20262-037","q-famema2021-096","q-adap26-022"],
          prosa: `[[Quem está em risco aponta a vitamina.|q-usprp2021-110,q-udisc20262-037,q-famema2021-096,q-adap26-022]]

| Vitamina | Quem | Quadro | Tratamento |
|---|---|---|---|
| B1 (tiamina) | etilista, vômitos, bariátrica | Wernicke, Korsakoff, beribéri | tiamina antes da glicose |
| B3 (niacina) | etilista, desnutrido | dermatite em área de sol, diarreia, demência | nicotinamida |
| B12 | bypass, íleo, gastrite atrófica | anemia macrocítica, lesão medular e cognitiva | B12 intramuscular |
| C | dieta sem frutas | gengiva sangrando, petéquias | ácido ascórbico |
| D | pouco sol, anticonvulsivante | raquitismo, osteomalácia | vitamina D + cálcio |
| A | má absorção de gordura | cegueira noturna, xeroftalmia | retinol |`,
          texto: `- B1: **Wernicke**. {q-usprp2021-110}
- B3: **pelagra**. {q-udisc20262-037}
- B12: **anemia + nervo**. {q-famema2021-096}
- C: **escorbuto**. {q-adap26-022}` },
      ],
    },
  ],
});
