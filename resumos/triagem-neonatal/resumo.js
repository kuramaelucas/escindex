/* resumos/triagem-neonatal/resumo.js — resumo adaptativo de triagem neonatal: teste do pezinho
   (coleta, doenças, hipotireoidismo, fenilcetonúria, fibrose cística, hiperplasia adrenal, galactosemia,
   hemoglobinopatias, G6PD) e as triagens à beira do leito (coraçãozinho, orelhinha, olhinho).
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- triagem-neonatal */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "triagem-neonatal",
  titulo: "Triagem neonatal",
  assunto: "ass-neo-triagemneonatal",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "ms-triagem", texto: "Ministério da Saúde — Manual Técnico de Triagem Neonatal Biológica (2016) e Lei 14.154/2021 (ampliação do teste do pezinho)", lidoEm: null },
    { id: "pcdt-hipotireoidismo", texto: "Ministério da Saúde — PCDT do Hipotireoidismo Congênito (2021)", lidoEm: null },
    { id: "sbp-coracaozinho", texto: "Sociedade Brasileira de Pediatria — Triagem neonatal da cardiopatia congênita crítica (teste do coraçãozinho)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "pezinho", titulo: "O teste do pezinho",
      introducao: `[[A triagem procura doenças graves, tratáveis e silenciosas ao nascer: quando os sintomas aparecem, o dano (cerebral, no hipotireoidismo e na fenilcetonúria) já começou.|q-scmsp2023-044,q-sessp2024-058]] [[A coleta é feita entre o 3º e o 5º dia porque o bebê precisa ter mamado o suficiente para que a fenilalanina suba, e o pico fisiológico de TSH das primeiras horas já tenha passado.|q-usp2023-091,q-scmsp2022-027]]

O SUS rastreia hoje fenilcetonúria, hipotireoidismo congênito, doença falciforme e outras hemoglobinopatias, fibrose cística, hiperplasia adrenal congênita e deficiência de biotinidase; [[a lei de 2021 amplia o teste em etapas, e a primeira doença acrescentada é a toxoplasmose congênita.|q-iamspe2023-047,q-scmsp2022-027]]

Veja também: **Tireoidopatias** (hipotireoidismo no adulto e na criança maior).`,
      fragmentos: [
        { id: "pez-geral", titulo: "Coleta, doenças rastreadas e o que não se rastreia", conferir: true, diretrizes: ["ms-triagem"],
          questoes: ["q-scmsp2023-044","q-sessp2024-058","q-usp2023-091","q-scmsp2022-027","q-iamspe2023-047","q-unesp2025-006","q-sessp2025-049","q-fmabc2021-092","q-uspsp5-109","q-scmsp2021-046"],
          texto: `- Coleta **entre o 3º e o 5º dia** (após 48 h de alimentação). {q-usp2023-091,q-sessp2024-058,q-scmsp2022-027}
- Doenças do SUS: **fenilcetonúria, hipotireoidismo, falciforme e hemoglobinopatias, fibrose cística, hiperplasia adrenal e biotinidase**. {q-sessp2024-058,q-unesp2025-006,q-scmsp2022-027}
- Ampliação por lei: primeira inclusão, **toxoplasmose congênita**. {q-iamspe2023-047}
- **Não** está no teste básico: **agamaglobulinemia**. {q-sessp2025-049}
- Teste normal **não exclui β-talassemia minor**. {q-fmabc2021-092}
- Alívio da dor na punção: **leite materno ou glicose 25% VO** 2 minutos antes. {q-uspsp5-109}
- Pneumonias de repetição, baixo ganho e esteatorreia: **ver o teste do pezinho** (fibrose cística). {q-scmsp2021-046}` },
      ],
    },
    {
      id: "doencas", titulo: "As doenças do teste do pezinho",
      introducao: `[[No hipotireoidismo congênito, faltando hormônio tireoidiano nas primeiras semanas, o cérebro em formação sofre dano irreversível: por isso TSH alto no papel-filtro pede TSH e T4 livre séricos já e levotiroxina sem esperar sintomas.|q-adap25-090,q-adap26-083,q-unicamp2023-047]] [[Na fenilcetonúria falta a enzima que transforma fenilalanina em tirosina; a fenilalanina acumulada é tóxica ao cérebro, e o tratamento é tirar a fenilalanina da dieta.|q-usprp2026-057,q-adap24-091]]

[[O tripsinogênio imunorreativo sobe porque, na fibrose cística, o pâncreas lesado deixa a enzima vazar para o sangue; dois resultados altos pedem o teste do suor.|q-adap25-091,q-uspsp2-066,q-famema2022-083]] [[Na hiperplasia adrenal congênita por deficiência de 21-hidroxilase, falta cortisol e aldosterona: a criança perde sal (sódio baixo, potássio alto) e a menina nasce virilizada.|q-usp2026-061,q-einstein2024-042,q-sirio2025-050]]`,
      fragmentos: [
        { id: "doe-tireoide", titulo: "Hipotireoidismo congênito", conferir: true, diretrizes: ["pcdt-hipotireoidismo"],
          questoes: ["q-adap25-090","q-adap26-083","q-unicamp2023-047","q-simepm89-085","q-unesp2023-011","q-unifesp2025-091","q-scmsp2023-044"],
          texto: `- TSH alto no pezinho: **TSH e T4 livre séricos já**; confirmado, **levotiroxina** sem esperar sintomas. {q-adap25-090,q-adap26-083,q-unicamp2023-047}
- É **emergência**: o dano neurológico começa nas primeiras semanas. {q-scmsp2023-044}
- Rastreio pelo **TSH entre 2 e 5 dias**. {q-simepm89-085}
- Prematuro extremo ou muito baixo peso: **nova coleta com 1 mês** (TSH pode subir tarde). {q-unesp2023-011}
- Tireoide tópica normal, em tratamento: **manter a reposição até os 2 anos** e só então testar a suspensão. {q-unifesp2025-091}` },
        { id: "doe-pku-fc", titulo: "Fenilcetonúria e fibrose cística", conferir: true, diretrizes: ["ms-triagem"],
          questoes: ["q-usprp2026-057","q-adap24-091","q-tp20232-055","q-unifesp2024-088","q-adap25-091","q-uspsp2-066","q-unicampdis2022-030","q-famema2022-083","q-unifesp2026-083"],
          texto: `- Fenilalanina muito alta: **fórmula isenta de fenilalanina**. {q-usprp2026-057}
- Fenilcetonúria clássica no lactente: **aleitamento parcial** com fórmula sem fenilalanina e dosagens frequentes. {q-adap24-091}
- Valor pouco acima do corte: **coletar nova amostra**. {q-tp20232-055}
- Alterado na coleta com 24 h e normal depois: **hiperfenilalaninemia materna**. {q-unifesp2024-088}
- **IRT alto duas vezes** (3º dia e 3ª semana): **teste do suor** (cloreto). {q-adap25-091,q-uspsp2-066,q-unicampdis2022-030}
- Fibrose cística no pezinho: **IRT elevado**. {q-famema2022-083}
- IRT alto na 1ª amostra e normal na 2ª: **rotina**. {q-unifesp2026-083}` },
        { id: "doe-hac-galacto", titulo: "Hiperplasia adrenal, galactosemia e G6PD", conferir: true, diretrizes: ["ms-triagem"],
          questoes: ["q-usp2026-061","q-einstein2024-042","q-sirio2025-050","q-unicampdis2024-087","q-scmsp2021-053","q-adap24-093","q-usprp2021-026","q-unifesp2024-092","q-unifesp2025-090","q-uspsp5-105"],
          texto: `- RN com vômitos, desidratação, **sódio baixo e potássio alto**: **hiperplasia adrenal** (deficiência de **21-hidroxilase**, **17-OH-progesterona** alta). {q-usp2026-061,q-einstein2024-042,q-sirio2025-050,q-unicampdis2024-087}
- Na crise: hidrocortisona, soro e glicose; **não** repor bicarbonato. {q-scmsp2021-053}
- Icterícia, colestase, sepse por **E. coli** e galactose alta: **galactosemia**; **suspender o leite** e dar fórmula sem lactose. {q-usprp2021-026,q-adap24-093}
- Galactose alta em bebê bem: **repetir a dosagem**. {q-unifesp2024-092}
- G6PD alterada: **nova coleta** e afastar desencadeantes de hemólise. {q-unifesp2025-090,q-uspsp5-105}` },
      ],
    },
    {
      id: "beira-leito", titulo: "Coraçãozinho, orelhinha e olhinho",
      introducao: `[[O teste do coraçãozinho compara a saturação da mão direita, que recebe sangue antes do canal arterial, com a de um pé, que recebe sangue depois dele: na cardiopatia que depende do canal, o sangue pouco oxigenado que passa por ele baixa a saturação do pé.|q-usp2025-069,q-famerp2024-055]] Faz-se entre 24 e 48 horas de vida, antes da alta.

[[A triagem auditiva por emissões otoacústicas é para todos; o bebê com fator de risco faz o potencial evocado (BERA), porque a perda neural escapa ao primeiro exame.|q-usp2023-089,q-uspsp1-023]] [[O teste do olhinho procura o reflexo vermelho: pupila branca (leucocoria) pode ser catarata ou retinoblastoma e vai ao oftalmologista com urgência.|q-didepm-049]]`,
      fragmentos: [
        { id: "bei-coracao", titulo: "Teste do coraçãozinho", conferir: true, diretrizes: ["sbp-coracaozinho"],
          figuras: [{ arquivo: "figuras/coracaozinho.svg", legenda: "Esquema autoral: como ler o teste do coraçãozinho, nas regras nova e antiga." }],
          questoes: ["q-usp2025-069","q-usp2025-070","q-adap21-026","q-amrigs2020-069","q-iamspe2022-035","q-iamspe2023-037","q-famerp2024-055","q-famerp2025-063","q-unicamp2022-038","q-uspsp4-104","q-sirio2023-046","q-famerp2023-034"],
          casos: ["q-usp2025-070"],
          texto: `- Mão direita é **pré-ductal**; pé é **pós-ductal**. {q-usp2025-069}
- Abaixo de 95% em alguma medida, ou diferença maior que 3 pontos: **repetir após 1 hora**; mantido, **ecocardiograma antes da alta**. {q-adap21-026,q-amrigs2020-069,q-iamspe2023-037,q-famerp2024-055,q-unicamp2022-038,q-sirio2023-046}
- 99% e 95% (diferença de 4): **impede a alta** até repetir. {q-iamspe2022-035}
- SBP: **90 a 94%** é duvidoso, repete-se **até 2 vezes**; persistindo, positivo. {q-famerp2025-063,q-uspsp4-104}
- Teste positivo: **ecocardiograma transtorácico**. {q-usp2025-070}` },
        { id: "bei-orelha-olho", titulo: "Triagem auditiva e reflexo vermelho", conferir: true,
          questoes: ["q-usp2023-089","q-uspsp1-023","q-didepm-049"],
          texto: `- Sem indicador de risco: **emissões otoacústicas até 30 dias**. {q-usp2023-089,q-uspsp1-023}
- Icterícia sem exsanguineotransfusão **não** é indicador de risco auditivo. {q-usp2023-089}
- **Leucocoria** no teste do olhinho: **oftalmologista pediátrico com urgência**. {q-didepm-049}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-famerp2023-034"],
          texto: `- Qualquer medida **abaixo de 90%** já é teste positivo (ecocardiograma); uma questão dá "negativo" com um pé a 89%, e a equipe marcou esse gabarito como duvidoso. {q-famerp2023-034}` },
      ],
    },
  ],
});
