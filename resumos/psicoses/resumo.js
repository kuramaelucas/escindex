/* resumos/psicoses/resumo.js — resumo adaptativo de psicoses e esquizofrenia: psicopatologia (delírio,
   alucinação, sintomas negativos), diagnóstico, tratamento com antipsicóticos (primeiro episódio,
   refratária e clozapina), efeitos adversos (acatisia, hiperprolactinemia, síndrome neuroléptica
   maligna) e internação involuntária. Assunto: ass-psiq-psicoses.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- psicoses */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "psicoses",
  titulo: "Psicoses e esquizofrenia",
  assunto: "ass-psiq-psicoses",
  criadoEm: "2026-11-25",
  fontes: [
    { id: "apa-esquizofrenia", texto: "APA 2020 — Practice guideline for the treatment of patients with schizophrenia; NICE CG178", lidoEm: null },
    { id: "lei-10216", texto: "Lei 10.216/2001 — proteção e direitos das pessoas com transtornos mentais (internação voluntária, involuntária e compulsória)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "diagnostico", titulo: "Reconhecer a psicose",
      introducao: `[[Psicose é a perda do contato com a realidade. Os **sintomas positivos** são o que aparece a mais — **delírio** (crença falsa e inabalável: perseguição, **referência**, ser controlado), **alucinação** (sobretudo **auditiva**: vozes que comentam ou mandam), discurso e comportamento **desorganizados**; ligam-se ao excesso de **dopamina na via mesolímbica**. Os **negativos** são o que falta — **abulia, alogia, anedonia, embotamento afetivo** e retração social — e pesam mais na incapacidade crônica.|q-iamspe2026-095,q-tp20212-023,q-unifesp2022-099]]

Veja também: **Humor** (bipolar com sintomas psicóticos), **Uso de substâncias** (psicose por drogas), **Demência e delirium** e **Neurologia** (parkinsonismo por antipsicótico).`,
      fragmentos: [
        { id: "dx-esquizofrenia", titulo: "Esquizofrenia e psicopatologia", conferir: true, diretrizes: ["apa-esquizofrenia"],
          questoes: ["q-unifesp2022-099","q-tp20232-013","q-tp20261-044","q-tp20212-023","q-iamspe2026-095","q-iamspe2026-091","q-iamspe2026-092"],
          prosa: `[[**Esquizofrenia**: adulto jovem que, ao longo de meses (**pelo menos 6 meses** de doença, com 1 mês de sintomas ativos), se **isola**, abandona estudo e trabalho, ri sem motivo, conversa com vozes e desenvolve delírio persecutório — sem causa orgânica nem droga que explique. A desorganização também atinge a vivência do **tempo**, que se fragmenta.|q-unifesp2022-099,q-tp20232-013,q-tp20261-044,q-tp20212-023,q-iamspe2026-092]] [[Na **pseudoalucinação**, a pessoa vive a experiência como estranha e mantém **crítica** sobre ela; na alucinação verdadeira, não.|q-iamspe2026-091]]`,
          texto: `- Jovem com isolamento por meses, delírio e alucinação: **esquizofrenia**. {q-unifesp2022-099,q-tp20232-013,q-tp20261-044,q-tp20212-023}
- Negativos: **abulia, alogia, anedonia, embotamento**. {q-iamspe2026-095}
- Com crítica preservada: **pseudoalucinação**; tempo fragmentado no surto. {q-iamspe2026-091,q-iamspe2026-092}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento e efeitos adversos",
      introducao: `[[Todo antipsicótico **bloqueia o receptor D2**: na via mesolímbica, trata os positivos; na **nigroestriatal**, dá efeitos extrapiramidais (distonia, **acatisia**, parkinsonismo); na **tuberoinfundibular**, sobe a **prolactina**. Os atípicos bloqueiam também 5-HT2A e dão menos extrapiramidal, com mais efeito metabólico. A **sedação** vem do bloqueio histaminérgico H1 (e alfa-1): menor afinidade por H1, menos sono.|q-tp20212-001,q-amrigs2024-056]]`,
      fragmentos: [
        { id: "tra-escolha", titulo: "Primeiro episódio, refratária e internação", conferir: true, diretrizes: ["apa-esquizofrenia","lei-10216"],
          questoes: ["q-adap22-099","q-usprp2021-013","q-adap21-013","q-amrigs2020-098","q-tp20212-001","q-tp20241-014"],
          prosa: `[[**Primeiro episódio**: antipsicótico em **dose baixa a moderada** (risperidona, haloperidol em dose baixa), com benzodiazepínico se há agitação ou insônia, **psicoeducação** e reavaliação em 2 a 4 semanas; mantém-se por pelo menos 1 a 2 anos. **Refratária** (falha de dois antipsicóticos em dose e tempo adequados): **clozapina**, a única com eficácia superior nesse grupo, com **hemograma semanal** no início pelo risco de **agranulocitose**; o paciente grave e crônico segue no **CAPS**.|q-adap22-099,q-usprp2021-013,q-adap21-013,q-amrigs2020-098,q-tp20212-001]] [[**Internação involuntária** (Lei 10.216): **a pedido de terceiro** (familiar), **com laudo médico** que a justifique, quando há **risco para si ou para outros**, comunicada ao Ministério Público em 72 horas.|q-tp20241-014]]`,
          texto: `- Primeiro episódio: **atípico em dose baixa** + psicoeducação; agitação: + benzodiazepínico. {q-adap22-099,q-usprp2021-013}
- Refratária: **clozapina** com hemograma. {q-adap21-013,q-amrigs2020-098}
- Menos sedativo: **menor afinidade por H1**. {q-tp20212-001}
- Involuntária: **familiar pede + médico indica + risco**. {q-tp20241-014}` },
        { id: "tra-adversos", titulo: "Acatisia, prolactina e síndrome neuroléptica maligna", conferir: true, diretrizes: ["apa-esquizofrenia"],
          questoes: ["q-usp2025-081","q-amrigs2024-019","q-uspsp1-051","q-amrigs2024-056","q-didepm-016","q-tp20232-013","q-tp20261-044"],
          prosa: `[[**Acatisia**: inquietação interna, necessidade de se mexer, andar de um lado a outro, dias depois de iniciar ou aumentar o antipsicótico (haloperidol, risperidona em dose alta) — confundida com piora psicótica. Tratar com **reduzir a dose ou trocar** (olanzapina, quetiapina), **propranolol** ou **benzodiazepínico**. **Hiperprolactinemia** (galactorreia, amenorreia, queda da libido): a **risperidona** é a que mais eleva.|q-usp2025-081,q-amrigs2024-019,q-uspsp1-051,q-amrigs2024-056]] [[**Síndrome neuroléptica maligna**: depois de dose alta ou aumento rápido de antipsicótico, **rigidez "em cano de chumbo"**, **hipertermia**, confusão, instabilidade autonômica e **CPK muito alta** — **suspender o antipsicótico**, UTI, hidratação, resfriamento e **dantroleno ou bromocriptina**.|q-didepm-016]] [[Agitação grave com risco a terceiros num surto: além da contenção e da medicação, a **internação psiquiátrica** protege o paciente e a família.|q-tp20232-013,q-tp20261-044]]`,
          texto: `- Inquietação após aumentar o antipsicótico: **acatisia** → propranolol/benzodiazepínico ou troca. {q-usp2025-081,q-amrigs2024-019,q-uspsp1-051}
- Galactorreia com antipsicótico: **risperidona**. {q-amrigs2024-056}
- Rigidez + febre + confusão: **síndrome neuroléptica maligna** → suspender, UTI, dantroleno. {q-didepm-016}
- Esquizofrenia com agressividade incontrolável: **internação**. {q-tp20232-013,q-tp20261-044}` },
      ],
    },
  ],
});
