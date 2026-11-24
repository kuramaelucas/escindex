/* resumos/cuidados-paliativos/resumo.js — resumo adaptativo de cuidados paliativos
   (ass-cuidadospaliativos): o que são e quando indicar, comunicação e diretivas antecipadas,
   conceitos (distanásia, ortotanásia, eutanásia), dor (tipos, escada, morfina, laxante), dispneia,
   caquexia e alimentação no fim de vida, obstrução maligna, fase final, luto, declaração de óbito;
   armadilhas e tabela.  Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- cuidados-paliativos */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "cuidados-paliativos",
  titulo: "Cuidados paliativos",
  assunto: "ass-cuidadospaliativos",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "ancp", texto: "Academia Nacional de Cuidados Paliativos — Manual de Cuidados Paliativos (2.ª ed., 2012) e OMS (definição 2002/2018)", lidoEm: null },
    { id: "cfm", texto: "CFM — Resolução 1.995/2012 (diretivas antecipadas de vontade), Resolução 1.805/2006 (ortotanásia) e Código de Ética Médica (2018)", lidoEm: null },
    { id: "esmo-sintomas", texto: "ESMO — guidelines on management of cancer pain (2018), dyspnoea (2020) e cachexia (2021); ASCO cancer cachexia (2020/2023)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-sessp2024-012"] },
  ],
  doencas: [
    {
      id: "principios", titulo: "Princípios, indicação e decisões",
      introducao: `[[Cuidado paliativo é cuidar do sofrimento físico, psíquico, social e espiritual de quem tem **doença que ameaça a vida**, junto com a família — e começa no diagnóstico, **ao lado do tratamento modificador**, não só quando "não há mais nada a fazer". A intensidade cresce conforme a doença avança e o tratamento curativo deixa de trazer benefício.|q-iamspe2022-004,q-unicamp2023-073,q-unifesp2022-055]]

Veja também: **Bioética**, **Dor e analgesia**, **Demência**, **Oncologia** e **Declaração de óbito** quando houver resumo.`,
      fragmentos: [
        { id: "pri-indicacao", titulo: "Quem é elegível e em que fase", conferir: true, diretrizes: ["ancp"],
          figuras: [{ arquivo: "figuras/curva-paliativo.svg", legenda: "Esquema autoral: o cuidado paliativo cresce ao longo da doença enquanto o tratamento modificador diminui, e continua no luto." }],
          questoes: ["q-iamspe2022-004","q-unicamp2023-073","q-unifesp2022-055","q-usp2024-006","q-usp2025-111","q-famerp2024-076","q-famerp2024-077","q-famerp2024-078","q-uspsp1-060"],
          prosa: `[[Doença crônica progressiva e incurável é indicação, mesmo com boa funcionalidade: o objetivo inicial é acolhimento, informação sobre a evolução e **diretivas antecipadas**. Internações repetidas, perda de funcionalidade e idas frequentes ao pronto-socorro marcam a progressão e intensificam o cuidado.|q-usp2024-006,q-usp2025-111,q-famerp2024-076,q-famerp2024-077,q-famerp2024-078]] [[**PPS ≤ 30%** e ECOG 4, sem tratamento modificador possível: **fase final de vida** — foco total em conforto.|q-uspsp1-060]] [[Alívio de dor e de sintomas, respostas empáticas e conforto para paciente e família são o cerne da conduta.|q-unicamp2023-073,q-unifesp2022-055]]`,
          texto: `- Doença que ameaça a vida, **junto do tratamento**; DAV cedo. {q-iamspe2022-004,q-usp2024-006,q-usp2025-111,q-famerp2024-076,q-famerp2024-077,q-famerp2024-078}
- PPS ≤ 30%: **fim de vida**. {q-uspsp1-060}
- Conforto e empatia. {q-unicamp2023-073,q-unifesp2022-055}` },
        { id: "pri-decisoes", titulo: "Comunicação, diretivas e limites", conferir: true, diretrizes: ["cfm"],
          questoes: ["q-usprp2027-030","q-didepm-015","q-tp20241-020","q-tp20232-018","q-tp20222-037","q-sessp2022-017","q-unifesp2026-094","q-uspsp1-059","q-sessp2025-020","q-einstein2027-075","q-udisc20262-071","q-iamspe2023-006","q-unicampdis2022-058"],
          prosa: `[[**Diretivas antecipadas de vontade** são feitas pelo paciente capaz e **prevalecem sobre o desejo dos familiares**: se a paciente não quer intubação nem reanimação, registra-se no prontuário e mantém-se o controle de sintomas; DAV conhecida, mesmo verbal pelo familiar, orienta manter em casa. Na dispneia terminal com recusa de intubação, **sedação paliativa**.|q-usprp2027-030,q-didepm-015,q-tp20241-020,q-tp20232-018,q-tp20222-037]] [[O paciente tem direito de saber o diagnóstico se quiser, **mesmo contra a vontade da família**; na criança, avaliar o que ela entende e quer saber e construir a comunicação com os pais.|q-sessp2022-017,q-unifesp2026-094]] [[Sem DAV e sem capacidade, decide-se com a família, a partir dos **valores do paciente**, e as medidas devem ser **proporcionais**; suporte que só prolonga sofrimento pode ser limitado, com registro. Sem tempo de conversa e sem diretiva, no pronto-socorro, a prova manteve **intubação**.|q-uspsp1-059,q-sessp2025-020,q-einstein2027-075,q-udisc20262-071]] [[**Distanásia**: prolongar a vida artificialmente sem benefício (obstinação terapêutica). **Ortotanásia**: permitir a morte no tempo natural com conforto — permitida. **Eutanásia**: provocar a morte — proibida no Brasil.|q-iamspe2023-006,q-unicampdis2022-058]]`,
          texto: `- **DAV prevalece** sobre a família. {q-usprp2027-030,q-didepm-015,q-tp20241-020,q-tp20232-018,q-tp20222-037}
- Diagnóstico ao paciente que quer saber. {q-sessp2022-017,q-unifesp2026-094}
- Sem DAV: valores do paciente, **proporcionalidade**. {q-uspsp1-059,q-sessp2025-020,q-einstein2027-075,q-udisc20262-071}
- **Distanásia** × ortotanásia × eutanásia. {q-iamspe2023-006,q-unicampdis2022-058}` },
      ],
    },
    {
      id: "sintomas", titulo: "Controle de sintomas",
      introducao: `[[Sintoma é o que o paciente sente: a dose certa é a que alivia. Opioides não "aceleram a morte" quando titulados; o medo de usá-los é a principal causa de dor e falta de ar mal controladas.|q-adap22-055,q-adap26-094]]`,
      fragmentos: [
        { id: "sin-dor", titulo: "Dor", conferir: true, diretrizes: ["esmo-sintomas"],
          questoes: ["q-adap22-055","q-amrigs2020-082","q-unesp2024-049","q-unesp2021-058"],
          prosa: `[[Dor oncológica intensa apesar de dipirona e tramadol: subir ao **opioide forte** — **morfina oral titulada**, com dose de resgate, e **laxante desde o início** (a constipação não cria tolerância); corticoide e radioterapia para metástase óssea.|q-adap22-055,q-amrigs2020-082]] [[Dor em queimação com alteração de sensibilidade num território: **neuropática** — tricíclico ou anticonvulsivante (gabapentina), com ou sem opioide. Dor difusa sem lesão e exames normais: **nociplástica**.|q-unesp2024-049,q-unesp2021-058]]`,
          texto: `- **Morfina titulada + laxante desde o início**. {q-adap22-055,q-amrigs2020-082}
- Neuropática: **tricíclico/anticonvulsivante**; nociplástica. {q-unesp2024-049,q-unesp2021-058}` },
        { id: "sin-dispneia", titulo: "Dispneia e outros", conferir: true, diretrizes: ["esmo-sintomas"],
          questoes: ["q-adap26-094","q-sessp2024-097","q-sirio2027-090","q-unesp2021-037","q-scmsp2022-068","q-einstein2024-030","q-usprp2027-040"],
          prosa: `[[Dispneia refratária (causas tratadas, ventilador no rosto, posição, oxigênio se hipoxêmico): **morfina** em baixa dose, oral ou subcutânea, regular com resgates — reduz a percepção da falta de ar sem deprimir a respiração em dose titulada; no fim de vida, em infusão contínua.|q-adap26-094,q-sessp2024-097,q-sirio2027-090,q-unesp2021-037,q-scmsp2022-068]] [[**Obstrução intestinal maligna**: sonda, hidratação, analgesia e **corticoide** (reduz edema), com antissecretores.|q-einstein2024-030]] [[Caquexia com perda de apetite apesar de suporte nutricional: **olanzapina em baixa dose** (ou progestágeno/corticoide por pouco tempo).|q-usprp2027-040]]`,
          texto: `- Dispneia refratária: **morfina** baixa dose. {q-adap26-094,q-sessp2024-097,q-sirio2027-090,q-unesp2021-037,q-scmsp2022-068}
- Obstrução maligna: **corticoide**. {q-einstein2024-030}
- Anorexia: **olanzapina**. {q-usprp2027-040}` },
        { id: "sin-alimentacao", titulo: "Comer e beber no fim da vida", conferir: true, diretrizes: ["ancp"],
          questoes: ["q-usp2022-006","q-unesp2026-043","q-einstein2027-036","q-sirio2022-026"],
          prosa: `[[Na demência avançada e no fim de vida, a disfagia faz parte da doença: **sonda ou gastrostomia não prolongam a vida nem evitam aspiração**, e o corpo que está morrendo não sente fome como a família teme. A alimentação de conforto e a suspensão da nutrição artificial que causa desconforto são aceitáveis; no paciente que não contactua e está morrendo, a prova escolheu **jejum e sem soro**.|q-usp2022-006,q-unesp2026-043,q-einstein2027-036]] [[Quando o quadro ainda é reversível, a decisão é outra: a sirio2022-026 mandou **tentar de novo a sonda enteral**.|q-sirio2022-026]]`,
          texto: `- Demência avançada: gastrostomia **potencialmente inapropriada**. {q-unesp2026-043}
- Fim de vida: jejum, suspender nutrição que incomoda. {q-usp2022-006,q-einstein2027-036}
- Reversível: **tentar a sonda**. {q-sirio2022-026}` },
      ],
    },
    {
      id: "depois", titulo: "Óbito e luto",
      introducao: `[[O cuidado não termina com a morte: a família recebe a declaração sem passar por serviço que não conhecia o paciente, e o luto é acompanhado.|q-fmabc2026-100,q-scmsp2022-097]]`,
      fragmentos: [
        { id: "dep-luto", titulo: "Declaração de óbito e luto", conferir: true, diretrizes: ["cfm"],
          questoes: ["q-fmabc2026-100","q-scmsp2022-097"],
          prosa: `[[Morte natural em casa de paciente acompanhado: o **médico da equipe que o acompanhava** emite a declaração de óbito.|q-fmabc2026-100]] [[O luto tem duração variável: **não há critério de tempo rígido** para chamá-lo de complicado; o que pesa é o sofrimento e o prejuízo.|q-scmsp2022-097]]`,
          texto: `- DO: **médico que acompanhava**. {q-fmabc2026-100}
- Luto: **sem tempo rígido**. {q-scmsp2022-097}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["ancp","cfm"],
          questoes: ["q-udisc20262-071","q-usp2022-006","q-sirio2022-026","q-amrigs2020-082"],
          prosa: `[[**Doença avançada sem DAV no pronto-socorro**: o ideal é conversar antes; sem tempo nem família consultada, a udisc20262-071 escolheu **intubar**.|q-udisc20262-071]] [[**Hidratação no fim de vida**: há quem dê pequeno volume subcutâneo por conforto; a usp2022-006 respondeu **jejum e sem soro**.|q-usp2022-006]] [[**Sonda após PCR na passagem**: num paciente demenciado com megaesôfago, a sirio2022-026 escolheu **tentar de novo a sonda**, não gastrostomia nem medidas apenas proporcionais.|q-sirio2022-026]] [[**Laxante com opioide**: a regra é desde o início; a amrigs2020-082 pedia a alternativa **incorreta**, que era usar laxante só se houver constipação.|q-amrigs2020-082]]`,
          texto: `- Sem DAV: a prova deu **intubação**. {q-udisc20262-071}
- **Jejum e sem soro**. {q-usp2022-006}
- **Tentar sonda** de novo. {q-sirio2022-026}
- Laxante **desde o início**. {q-amrigs2020-082}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: sintoma e conduta",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-sintomas", titulo: "O que usar", conferir: true,
          questoes: ["q-adap22-055","q-unesp2024-049","q-adap26-094","q-einstein2024-030","q-usprp2027-040"],
          prosa: `[[Cada sintoma tem um tratamento de primeira linha.|q-adap22-055,q-unesp2024-049,q-adap26-094,q-einstein2024-030,q-usprp2027-040]]

| Sintoma | Primeira linha | Lembrete |
|---|---|---|
| Dor nociceptiva intensa | morfina titulada + resgate | laxante desde o início |
| Dor neuropática | tricíclico, gabapentinoide | ± opioide |
| Dispneia refratária | morfina em baixa dose | ventilador no rosto, posição |
| Obstrução intestinal maligna | corticoide, antissecretor, sonda | sem cirurgia se fim de vida |
| Anorexia e caquexia | olanzapina baixa dose | nutrição não reverte caquexia |`,
          texto: `- Dor: **morfina**. {q-adap22-055}
- Neuropática: **tricíclico**. {q-unesp2024-049}
- Dispneia: **morfina**. {q-adap26-094}
- Obstrução: **corticoide**. {q-einstein2024-030}
- Anorexia: **olanzapina**. {q-usprp2027-040}` },
      ],
    },
  ],
});
