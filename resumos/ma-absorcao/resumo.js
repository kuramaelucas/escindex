/* resumos/ma-absorcao/resumo.js — resumo adaptativo de doença celíaca, má absorção e intolerância à
   lactose (ass-gastro-malabsorcao): doença celíaca (quadro clássico e não clássico, sorologia, biópsia,
   HLA, dieta), diarreia osmótica e intolerância à lactose (primária e secundária, hidrogênio
   expirado), enteropatia perdedora de proteínas e linfangiectasia, esteatorreia e vitamina K, doença de
   Whipple, síndrome carcinoide e diarreia crônica no adulto; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- ma-absorcao */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "ma-absorcao",
  titulo: "Doença celíaca, má absorção e intolerância à lactose",
  assunto: "ass-gastro-malabsorcao",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "acg-celiaca", texto: "ACG — Clinical Guidelines: Diagnosis and Management of Celiac Disease (2023); ESPGHAN 2020 (doença celíaca na criança); PCDT de doença celíaca (MS)", lidoEm: null },
    { id: "sbp-lactose", texto: "SBP — intolerância à lactose e diarreia persistente; AAP 2006 (lactose intolerance in infants, children and adolescents)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "celiaca", titulo: "Doença celíaca",
      introducao: `[[Na doença celíaca, quem tem os genes **HLA-DQ2 ou DQ8** reage contra a **gliadina** do glúten (trigo, centeio, cevada): a transglutaminase tecidual modifica a gliadina, os linfócitos T a atacam, e a mucosa do **duodeno e jejuno** inflama, com **linfócitos intraepiteliais**, hiperplasia de criptas e **atrofia das vilosidades**. Sem vilosidades, ferro, folato, cálcio, gordura e remédios deixam de ser absorvidos.|q-usp2026-009,q-iamspe2021-033,q-tp20202-051]]

Veja também: **Diarreia e desidratação**, **Anemias**, **Doença inflamatória intestinal** e **Tireoide**.`,
      fragmentos: [
        { id: "cel-quadro", titulo: "Formas clássica e não clássica", conferir: true, diretrizes: ["acg-celiaca"],
          questoes: ["q-tp20202-051","q-usprp2027-057","q-iamspe2022-045","q-usp2026-009","q-unicampdis2022-029"],
          prosa: `[[A forma **clássica** começa depois que o trigo entra na dieta (após os 6 meses): **diarreia crônica com fezes volumosas, pálidas e fétidas**, **distensão abdominal**, perda de peso, músculos glúteos atrofiados, irritabilidade e falta de apetite.|q-tp20202-051,q-usprp2027-057,q-unicampdis2022-029]] [[Muitos têm a forma **não clássica**: dor abdominal, constipação, anemia ferropriva, baixa estatura, aftas, ou **necessidade de dose muito alta de levotiroxina** (má absorção do remédio). A doença é comum e há formas subclínicas.|q-iamspe2022-045,q-usp2026-009]]`,
          texto: `- Clássica: **fezes volumosas e fétidas, distensão, perda de peso** após introduzir trigo. {q-tp20202-051,q-usprp2027-057,q-unicampdis2022-029}
- Não clássica: dor, constipação, anemia, **levotiroxina em dose alta**. {q-iamspe2022-045,q-usp2026-009}` },
        { id: "cel-diagnostico", titulo: "Sorologia, biópsia e HLA", conferir: true, diretrizes: ["acg-celiaca"],
          figuras: [{ arquivo: "figuras/celiaca-diagnostico.svg", legenda: "Esquema autoral: investigação da doença celíaca." }],
          questoes: ["q-famerp2026-058","q-iamspe2021-033","q-famerp2025-002","q-usp2026-009"],
          prosa: `[[O primeiro exame é o **anticorpo antitransglutaminase IgA com IgA total** (a deficiência de IgA, comum nos celíacos, dá falso negativo), **comendo glúten**. Positivo, faz-se **endoscopia com biópsias do duodeno**, que mostra o **infiltrado linfocítico** intraepitelial e a atrofia (classificação de Marsh).|q-famerp2026-058,q-usp2026-009]] [[Na criança, antitransglutaminase acima de **10 vezes** o normal com **antiendomísio positivo** em segunda amostra dispensa a biópsia.|q-iamspe2021-033]] [[O **HLA-DQ2/DQ8** serve para **excluir**: negativo afasta a doença; positivo não confirma (boa parte da população tem). Usa-se quando a biópsia é duvidosa (**Marsh 1**) ou a pessoa já tirou o glúten.|q-famerp2025-002,q-iamspe2021-033]]`,
          texto: `- Início: **antitransglutaminase IgA + IgA total**, comendo glúten; positivo → **biópsia duodenal**. {q-famerp2026-058,q-usp2026-009}
- Criança com título > 10× e antiendomísio +: **sem biópsia**. {q-iamspe2021-033}
- **HLA negativo exclui**; útil no Marsh 1. {q-famerp2025-002,q-iamspe2021-033}` },
        { id: "cel-dieta", titulo: "Dieta sem glúten", conferir: true, diretrizes: ["acg-celiaca"],
          questoes: ["q-usprp2022-083","q-unesp2026-012","q-famerp2022-017","q-unicampdis2022-029"],
          prosa: `[[O tratamento é a **dieta isenta de glúten por toda a vida**. Saem **trigo, centeio, cevada** (e a aveia comum, contaminada pelo trigo); ficam **arroz, milho (fubá, amido), mandioca (tapioca, polvilho)**, batata, feijão, carnes, ovos, frutas e verduras.|q-usprp2022-083,q-unesp2026-012,q-famerp2022-017,q-unicampdis2022-029]]`,
          texto: `- Proibidos: **trigo, centeio, cevada**; liberados: **arroz, milho, mandioca, feijão**. {q-usprp2022-083,q-unesp2026-012,q-famerp2022-017,q-unicampdis2022-029}` },
      ],
    },
    {
      id: "lactose", titulo: "Intolerância à lactose",
      introducao: `[[A **lactase** da borda em escova quebra a lactose em glicose e galactose. Sem ela, a lactose fica na luz: **puxa água por osmose** (diarreia que **melhora com jejum**) e chega ao cólon, onde as bactérias a fermentam em **gases** e ácidos (fezes **ácidas e explosivas**, assaduras, distensão, flatulência).|q-iamspe2026-068,q-adap26-099,q-didepm-096]]`,
      fragmentos: [
        { id: "lac-secundaria", titulo: "Secundária, depois da gastroenterite", conferir: true, diretrizes: ["sbp-lactose"],
          questoes: ["q-iamspe2026-068","q-adap26-099"],
          prosa: `[[A gastroenterite destrói a ponta das vilosidades, onde fica a lactase: semanas depois de uma diarreia viral, o lactente volta a ter **fezes líquidas, ácidas, com assadura**, que pioram com o leite. O mecanismo é **osmótico**. Usa-se **fórmula sem lactose temporariamente** e reintroduz-se o leite depois que a mucosa se recupera.|q-iamspe2026-068,q-adap26-099]]`,
          texto: `- Após gastroenterite, fezes ácidas: **intolerância secundária** (osmótica) → **sem lactose temporariamente**. {q-iamspe2026-068,q-adap26-099}` },
        { id: "lac-primaria", titulo: "Hipolactasia do adulto e diagnóstico", conferir: true, diretrizes: ["sbp-lactose"],
          questoes: ["q-unifesp2026-099","q-didepm-096","q-udisc20262-050","q-unicampdis2024-071"],
          prosa: `[[A maioria das pessoas perde a lactase depois da infância (**hipolactasia do tipo adulto**): sintomas com **leite**, mas não com **iogurte e queijos** (com menos lactose). Não é alergia, que é reação à **proteína** do leite.|q-unifesp2026-099,q-didepm-096]] [[O diagnóstico pode ser o **teste terapêutico** (dieta sem lactose e melhora) ou o **teste do hidrogênio expirado** após dose de lactose (aumento ≥ 20 ppm), mais útil que a curva glicêmica.|q-didepm-096,q-udisc20262-050,q-unicampdis2024-071]]`,
          texto: `- Leite dá sintoma, iogurte não: **hipolactasia do adulto** (não é alergia). {q-unifesp2026-099,q-didepm-096}
- **Hidrogênio expirado** ou **prova sem lactose**. {q-didepm-096,q-udisc20262-050,q-unicampdis2024-071}` },
      ],
    },
    {
      id: "outras", titulo: "Outras causas de má absorção e diarreia crônica",
      introducao: `[[Quando o intestino perde proteína, gordura ou não absorve vitaminas, os sinais aparecem fora dele: **edema** por albumina baixa, **sangramento** por falta de vitamina K, **anemia** e déficit de crescimento.|q-usprp2022-091,q-famema2022-036,q-unicamp2023-035]]`,
      fragmentos: [
        { id: "out-perdedora", titulo: "Enteropatia perdedora de proteínas", conferir: true,
          questoes: ["q-usprp2022-091","q-usprp2025-010","q-unicamp2023-035"],
          prosa: `[[Criança com **diarreia crônica, edema e albumina baixa** sem proteína na urina nem doença do fígado está perdendo proteína pelo intestino: **enteropatia perdedora de proteínas**, confirmada pela **alfa-1-antitripsina fecal** elevada.|q-usprp2025-010,q-unicamp2023-035]] [[Se há também **linfopenia, gamaglobulina baixa** e **esteatorreia**, com edema assimétrico de membro, os vasos linfáticos do intestino estão dilatados e vazam linfa: **linfangiectasia intestinal**.|q-usprp2022-091]]`,
          texto: `- Edema + albumina baixa + **alfa-1-antitripsina fecal** alta: **enteropatia perdedora**. {q-usprp2025-010,q-unicamp2023-035}
- Com linfopenia e hipogamaglobulinemia: **linfangiectasia**. {q-usprp2022-091}` },
        { id: "out-vitk", titulo: "Esteatorreia e vitamina K", conferir: true,
          questoes: ["q-famema2022-036"],
          prosa: `[[Fezes com **gordura** por anos significam que as vitaminas lipossolúveis (A, D, E, **K**) não são absorvidas. Sem vitamina K, os fatores II, VII, IX e X caem: **TP e TTPa alargados** e equimoses. A correção é **vitamina K**.|q-famema2022-036]]`,
          texto: `- Esteatorreia + equimoses + TP alargado: **vitamina K**. {q-famema2022-036}` },
        { id: "out-whipple", titulo: "Doença de Whipple e síndrome carcinoide", conferir: true,
          questoes: ["q-sirio2024-021","q-iamspe2023-032"],
          prosa: `[[Homem de meia-idade com **artrite**, diarreia, perda de peso, **hiperpigmentação**, linfonodos e serosite, e biópsia de delgado com macrófagos PAS positivos nas vilosidades: **doença de Whipple** (*Tropheryma whipplei*), tratada com antibiótico prolongado.|q-sirio2024-021]] [[No tumor neuroendócrino com metástase hepática, a serotonina chega à circulação: **síndrome carcinoide**, cujo sintoma mais frequente é a **diarreia**, com rubor e broncoespasmo.|q-iamspe2023-032]]`,
          texto: `- Artrite + diarreia + pigmentação + PAS positivo: **Whipple**. {q-sirio2024-021}
- Síndrome carcinoide: sintoma mais comum é **diarreia**. {q-iamspe2023-032}` },
        { id: "out-adulto", titulo: "Diarreia crônica no adulto: remédio ou cólon", conferir: true,
          questoes: ["q-tp20251-016","q-unesp2022-049"],
          prosa: `[[A **metformina** é causa frequente de diarreia crônica sem sinal de alarme: suspende-se e observa-se.|q-tp20251-016]] [[Mas diarreia nova acima dos 45–50 anos com **perda de peso** é sinal de alarme e pede **colonoscopia** para afastar câncer, antes de culpar o remédio.|q-unesp2022-049]]`,
          texto: `- Diarreia sem alarme em uso de metformina: **suspender metformina**. {q-tp20251-016}
- Com **perda de peso** após 50 anos: **colonoscopia**. {q-unesp2022-049}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["acg-celiaca"],
          questoes: ["q-tp20251-016","q-unesp2022-049","q-famerp2025-002","q-unifesp2026-099"],
          prosa: `[[**Metformina ou colonoscopia?** As duas provas têm diabético com diarreia crônica em uso de metformina: a tp20251-016 (sem perda de peso importante, sangue oculto negativo) **suspendeu a metformina**; a unesp2022-049 (perda de peso, 55 anos) pediu **colonoscopia**. A diferença é o sinal de alarme.|q-tp20251-016,q-unesp2022-049]] [[**Marsh 1 com sorologia positiva** não fecha o diagnóstico; a famerp2025-002 cobrou **HLA** para tentar excluir antes de tratar.|q-famerp2025-002]] [[**"Alergia à lactose"** não existe: lactose é açúcar; alergia é à proteína do leite.|q-unifesp2026-099]]`,
          texto: `- Sem alarme: **suspender metformina**; com perda de peso: **colonoscopia**. {q-tp20251-016,q-unesp2022-049}
- Marsh 1: a prova cobrou **HLA**. {q-famerp2025-002}
- Não existe alergia **à lactose**. {q-unifesp2026-099}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: celíaca, lactose e alergia ao leite",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-intolerancias", titulo: "O que reage, quadro, exame e tratamento", conferir: true,
          questoes: ["q-tp20202-051","q-unifesp2026-099","q-adap26-099","q-didepm-096"],
          prosa: `[[O que o corpo não tolera define a doença.|q-tp20202-051,q-unifesp2026-099,q-adap26-099,q-didepm-096]]

| Doença | O que provoca | Mecanismo | Exame | Tratamento |
|---|---|---|---|---|
| Doença celíaca | glúten | imune (HLA-DQ2/DQ8), atrofia de vilos | antitransglutaminase, biópsia | sem glúten para sempre |
| Intolerância à lactose | açúcar do leite | falta de lactase, diarreia osmótica | hidrogênio expirado, prova terapêutica | reduzir lactose |
| Alergia à proteína do leite | proteína do leite | imune (IgE ou não) | prova de exclusão e provocação | sem leite de vaca |`,
          texto: `- Celíaca: **glúten, biópsia**. {q-tp20202-051}
- Lactose: **osmótica, hidrogênio expirado**. {q-unifesp2026-099,q-didepm-096}
- Secundária: **temporária**. {q-adap26-099}` },
      ],
    },
  ],
});
