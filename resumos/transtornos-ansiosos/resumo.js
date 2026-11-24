/* resumos/transtornos-ansiosos/resumo.js — resumo adaptativo de transtornos de ansiedade e TOC
   (ass-psiq-ansiedade): ataque e transtorno de pânico, diagnóstico diferencial, agorafobia,
   tratamento (ISRS, IRSN, benzodiazepínico na crise), ansiedade generalizada, ansiedade social e
   de desempenho, fobia específica, ansiedade na infância, TOC e síndrome serotoninérgica,
   reação ao trauma, sintomas somáticos e dissociação, insônia; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- transtornos-ansiosos */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "transtornos-ansiosos",
  titulo: "Transtornos de ansiedade e TOC",
  assunto: "ass-psiq-ansiedade",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "dsm5tr-ansiedade", texto: "DSM-5-TR (2022): transtornos de ansiedade, obsessivo-compulsivo, relacionados a trauma, sintomas somáticos e dissociativos", lidoEm: null },
    { id: "nice-ansiedade", texto: "NICE CG113 (ansiedade generalizada e pânico, atualização 2020) e CG159 (ansiedade social); OMS mhGAP 2.0 (2016)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas, sem reposição.", questoes: ["q-amrigs2023-098","q-amrigs2020-020"] },
  ],
  doencas: [
    {
      id: "panico", titulo: "Pânico e agorafobia",
      introducao: `[[A ansiedade é o alarme do corpo: o sistema simpático acelera o coração, a respiração e prepara os músculos. No **ataque de pânico** esse alarme dispara sem perigo real; a pessoa sente o coração e o ar faltarem, **interpreta como morte iminente**, e o medo solta mais adrenalina, num ciclo que atinge o pico em cerca de **10 minutos** e depois passa.|q-famema2025-081,q-usp2022-007,q-uspsp5-001]]

Veja também: **Humor** (depressão), **Uso de substâncias**, **Psiquiatria infantil** e **Arritmias**.`,
      fragmentos: [
        { id: "pan-quadro", titulo: "Ataque e transtorno de pânico", conferir: true, diretrizes: ["dsm5tr-ansiedade"],
          figuras: [{ arquivo: "figuras/ciclo-panico.svg", legenda: "Esquema autoral: o ciclo entre sensação corporal, interpretação catastrófica e adrenalina no ataque de pânico." }],
          questoes: ["q-famema2025-081","q-usp2022-007","q-famema2022-029","q-amrigs2020-018"],
          prosa: `[[O **ataque de pânico** traz, de repente, palpitação, sudorese, tremor, falta de ar, dor no peito, tontura, formigamento e **medo de morrer ou enlouquecer**, que passam em minutos. Ataque isolado não é transtorno.|q-famema2025-081]] [[O **transtorno de pânico** são ataques **recorrentes e inesperados** com **medo de ter outro** e mudança de comportamento; a pessoa passa por várias emergências com exames normais.|q-usp2022-007,q-famema2022-029]] [[Antes, afastam-se causas orgânicas que imitam o ataque: hipoglicemia (insulinoma), hipertireoidismo e hiperparatireoidismo, arritmias, prolapso mitral, feocromocitoma, drogas. Doença de Parkinson não é diferencial habitual.|q-amrigs2020-018]]`,
          texto: `- Crises súbitas com medo de morrer, que passam em minutos: **ataque de pânico**. {q-famema2025-081}
- Recorrentes, inesperadas, com medo de nova crise: **transtorno de pânico**. {q-usp2022-007,q-famema2022-029}
- Diferenciais: hipoglicemia, tireoide, arritmia, prolapso mitral; **não Parkinson**. {q-amrigs2020-018}` },
        { id: "pan-agorafobia", titulo: "Agorafobia", conferir: true, diretrizes: ["dsm5tr-ansiedade"],
          questoes: ["q-usp2026-008","q-amrigs2020-097"],
          prosa: `[[Depois de algumas crises, a pessoa passa a **evitar lugares de onde seria difícil sair ou pedir ajuda** se a crise viesse: transporte, filas, multidões, lugares abertos ou fechados, sair sozinha. É a **agorafobia**, que muitas vezes acompanha o pânico.|q-usp2026-008,q-amrigs2020-097]]`,
          texto: `- Evitar lugares sem saída fácil pelo medo de crise: **agorafobia**. {q-usp2026-008,q-amrigs2020-097}` },
        { id: "pan-tratamento", titulo: "Tratamento", conferir: true, diretrizes: ["nice-ansiedade"],
          questoes: ["q-usp2022-007","q-famema2022-029","q-amrigs2020-097","q-uspsp5-001"],
          prosa: `[[O tratamento de longo prazo é **antidepressivo serotoninérgico** (**ISRS**, ou venlafaxina) com **terapia cognitivo-comportamental**. Começa-se em **dose baixa** (fluoxetina 10 mg, venlafaxina 37,5 mg), porque no início a pessoa sente mais ansiedade, e reavalia-se em **4 a 6 semanas**.|q-usp2022-007,q-famema2022-029,q-amrigs2020-097]] [[Na **crise** do pronto-socorro, descartada a causa cardíaca, um **benzodiazepínico** (lorazepam, diazepam) alivia; ele não é o tratamento contínuo.|q-uspsp5-001]]`,
          texto: `- Longo prazo: **ISRS/venlafaxina em dose baixa** + TCC; reavaliar em 4–6 semanas. {q-usp2022-007,q-famema2022-029,q-amrigs2020-097}
- Crise no PS: **benzodiazepínico**. {q-uspsp5-001}` },
      ],
    },
    {
      id: "outros", titulo: "Ansiedade generalizada, social e fobias",
      introducao: `[[Os transtornos de ansiedade se separam pelo **objeto do medo**: tudo e todo dia (ansiedade generalizada), o **olhar dos outros** (ansiedade social), um objeto ou situação específica (fobia), ou a separação das figuras de apego (na criança).|q-tp20232-014,q-unesp2022-060,q-iamspe2026-093]]`,
      fragmentos: [
        { id: "out-tag", titulo: "Ansiedade generalizada", conferir: true, diretrizes: ["nice-ansiedade"],
          questoes: ["q-tp20232-014","q-usp2026-091"],
          prosa: `[[Preocupação **excessiva e difícil de controlar** com vários assuntos, na maioria dos dias por **6 meses ou mais**, com tensão, irritabilidade, cansaço, dificuldade de concentração e insônia: **ansiedade generalizada**. Trata-se com **ISRS** (sertralina) e psicoterapia.|q-tp20232-014]] [[Um tricíclico como a nortriptilina dá **boca seca e intestino preso** (efeito anticolinérgico); com ansiedade persistente, trocar por **ISRS** (fluoxetina) é melhor que acrescentar benzodiazepínico.|q-usp2026-091]]`,
          texto: `- Preocupação excessiva com tudo por 6 meses: **TAG → sertralina + psicoterapia**. {q-tp20232-014}
- Tricíclico com efeitos anticolinérgicos: **trocar por ISRS**. {q-usp2026-091}` },
        { id: "out-social", titulo: "Ansiedade social e de desempenho", conferir: true, diretrizes: ["nice-ansiedade"],
          questoes: ["q-unesp2022-060","q-uspsp4-117","q-amrigs2022-099"],
          prosa: `[[Medo intenso de **ser avaliado negativamente** em situações de exposição (falar em público, festas, comer na frente dos outros), com sudorese, tremor e taquicardia, levando a **evitá-las**: **transtorno de ansiedade social** (fobia social), comum na adolescência.|q-unesp2022-060,q-uspsp4-117]] [[Para a ansiedade de **desempenho** pontual, ajudam **respiração diafragmática e relaxamento muscular**; afastar-se das situações piora, e benzodiazepínico de rotina não é indicado.|q-amrigs2022-099]]`,
          texto: `- Medo de avaliação em público, com evitação: **ansiedade social**. {q-unesp2022-060,q-uspsp4-117}
- Desempenho: **respiração diafragmática e relaxamento**. {q-amrigs2022-099}` },
        { id: "out-fobia", titulo: "Fobia específica", conferir: true,
          questoes: ["q-iamspe2026-093"],
          prosa: `[[Na **fobia específica** o medo é **intenso, persistente e desproporcional** a um objeto ou situação (agulha, sangue, animais, altura); a pessoa **reconhece** que é exagerado e evita o estímulo. O tratamento é a **exposição gradual**.|q-iamspe2026-093]]`,
          texto: `- Medo desproporcional de um objeto, reconhecido como exagerado: **fobia específica**. {q-iamspe2026-093}` },
        { id: "out-infancia", titulo: "Ansiedade na infância", conferir: true,
          questoes: ["q-amrigs2022-079"],
          prosa: `[[Os transtornos de ansiedade são **comuns** na infância e muitas vezes passam despercebidos. **Ansiedade de separação** e **fobias específicas** costumam começar cedo; a ansiedade social, na adolescência.|q-amrigs2022-079]]`,
          texto: `- Infância: **separação e fobias**; são comuns e pouco reconhecidos. {q-amrigs2022-079}` },
      ],
    },
    {
      id: "toc", titulo: "Transtorno obsessivo-compulsivo",
      introducao: `[[No TOC, a pessoa tem **obsessões**, pensamentos intrusivos e repetitivos que ela reconhece como seus e excessivos (contaminação, dúvida, simetria), e **compulsões**, atos repetidos (lavar, checar, arrumar) para aliviar a ansiedade que elas provocam. O alívio é momentâneo e reforça o ciclo.|q-tp20251-025,q-tp20261-025]]`,
      fragmentos: [
        { id: "toc-diagnostico", titulo: "Obsessões, compulsões e tratamento", conferir: true, diretrizes: ["dsm5tr-ansiedade"],
          questoes: ["q-tp20251-025","q-tp20261-025","q-uspsp5-002"],
          prosa: `[[O que define o TOC é a **presença de pensamentos intrusivos recorrentes e comportamentos repetitivos** (checar, limpar, arrumar) que consomem tempo e causam sofrimento; o medo de germes ou a esquiva são só o conteúdo e a consequência. No **transtorno de personalidade obsessivo-compulsiva**, ao contrário, há rigidez e perfeccionismo sem obsessões intrusivas.|q-tp20251-025,q-tp20261-025]] [[O tratamento é **ISRS em dose alta** (fluoxetina) e terapia de exposição com prevenção de resposta. Somar **erva-de-são-joão**, que também aumenta a serotonina, ao ISRS pode causar **síndrome serotoninérgica** (agitação, tremor, febre, mioclonia).|q-uspsp5-002]]`,
          texto: `- Pensamentos intrusivos + **comportamentos repetitivos**: **TOC**. {q-tp20251-025,q-tp20261-025}
- ISRS + erva-de-são-joão: **síndrome serotoninérgica** (fluoxetina). {q-uspsp5-002}` },
      ],
    },
    {
      id: "trauma-somaticos", titulo: "Trauma, sintomas somáticos e sono",
      introducao: `[[Nem todo sofrimento cabe em "ansiedade": depois de um trauma, a reação aguda é esperada e costuma passar; e muitas pessoas na atenção primária apresentam o sofrimento pelo corpo, com sintomas físicos sem explicação médica completa.|q-uspsp4-001,q-amrigs2022-100,q-tp20251-026]]`,
      fragmentos: [
        { id: "som-trauma", titulo: "Depois do trauma", conferir: true, diretrizes: ["nice-ansiedade"],
          questoes: ["q-uspsp4-001","q-amrigs2024-099"],
          prosa: `[[Nos primeiros dias após um assalto ou acidente, insônia, pensamentos intrusivos e pesadelos são reação esperada. A conduta é **acolher**, dar segurança e informação e **reavaliar**, **sem medicação** e **sem forçar o relato** detalhado (o debriefing pode piorar).|q-uspsp4-001,q-amrigs2024-099]] [[**Benzodiazepínico de rotina** não previne o estresse pós-traumático e pode atrapalhar a recuperação.|q-amrigs2024-099]]`,
          texto: `- Trauma recente: **acolher e reavaliar**, sem remédio nem debriefing. {q-uspsp4-001,q-amrigs2024-099}
- Benzodiazepínico **não** previne TEPT. {q-amrigs2024-099}` },
        { id: "som-somaticos", titulo: "Sintomas somáticos e dissociação", conferir: true, diretrizes: ["dsm5tr-ansiedade"],
          questoes: ["q-tp20251-026","q-amrigs2022-100","q-iamspe2026-094"],
          prosa: `[[No **transtorno de sintomas somáticos** há sintomas físicos reais e angustiantes (dor difusa, cansaço) com **pensamentos, preocupação e tempo desproporcionais** dedicados a eles, e muitas consultas sem diagnóstico. Na atenção primária, cerca de **um terço** dos sintomas fica sem explicação médica; não se exige esgotar a investigação orgânica antes de cuidar do sofrimento, nem encaminhar de pronto.|q-tp20251-026,q-amrigs2022-100]] [[No **transtorno dissociativo de identidade**, há **ruptura da identidade** com dois ou mais estados de personalidade que assumem o controle, com amnésia entre eles.|q-iamspe2026-094]]`,
          texto: `- Sintomas físicos + preocupação desproporcional: **sintomas somáticos**; 1/3 sem explicação na APS. {q-tp20251-026,q-amrigs2022-100}
- Dois estados de personalidade com amnésia: **dissociativo de identidade**. {q-iamspe2026-094}` },
        { id: "som-insonia", titulo: "Insônia", conferir: true,
          questoes: ["q-usprp2026-026"],
          prosa: `[[Dificuldade para iniciar o sono há poucas semanas, sem sinais de outra doença: o primeiro passo é **higiene do sono** (horário regular, sem telas e cafeína à noite, cama só para dormir); hipnótico e polissonografia não vêm primeiro.|q-usprp2026-026]]`,
          texto: `- Insônia recente: **higiene do sono** primeiro. {q-usprp2026-026}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["nice-ansiedade"],
          questoes: ["q-amrigs2020-097","q-famema2022-029","q-uspsp4-117","q-tp20261-025"],
          prosa: `[[**Dose inicial no pânico**: começa-se baixo; a amrigs2020-097 deu como **errado** iniciar fluoxetina em 20 mg, e a famema2022-029 iniciou venlafaxina em 37,5 mg.|q-amrigs2020-097,q-famema2022-029]] [[**Fobia social × personalidade esquiva**: na adolescência com evitação de 6 meses e sintomas físicos ao falar em público, o diagnóstico é **ansiedade social**; personalidade se diagnostica com padrão duradouro, desde cedo e em todas as áreas.|q-uspsp4-117]] [[**O que define o TOC** não é o conteúdo (germes) nem a esquiva, mas obsessões e compulsões; e o insight costuma estar **preservado**.|q-tp20261-025]]`,
          texto: `- Pânico: dose inicial **baixa**. {q-amrigs2020-097,q-famema2022-029}
- Adolescente que evita falar em público: **ansiedade social**. {q-uspsp4-117}
- TOC: **obsessões + compulsões**, insight preservado. {q-tp20261-025}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: transtornos ansiosos",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-ansiosos", titulo: "Objeto do medo, duração e tratamento", conferir: true,
          questoes: ["q-usp2022-007","q-tp20232-014","q-unesp2022-060","q-tp20251-025"],
          prosa: `[[O objeto do medo separa os transtornos.|q-usp2022-007,q-tp20232-014,q-unesp2022-060,q-tp20251-025]]

| Transtorno | O que provoca | Como é | Tratamento |
| Pânico | nada (inesperado) | crises de minutos, medo de nova crise | ISRS + TCC; benzodiazepínico só na crise |
| Ansiedade generalizada | tudo, todo dia | preocupação constante por 6 meses | ISRS + psicoterapia |
| Ansiedade social | ser avaliado pelos outros | evita falar e se expor | ISRS + TCC |
| Fobia específica | um objeto ou situação | medo desproporcional, evitação | exposição gradual |
| TOC | pensamentos intrusivos | rituais repetidos | ISRS em dose alta + exposição |`,
          texto: `- Pânico: **inesperado**. {q-usp2022-007}
- TAG: **tudo, 6 meses**. {q-tp20232-014}
- Social: **avaliação**. {q-unesp2022-060}
- TOC: **rituais**. {q-tp20251-025}` },
      ],
    },
  ],
});
