/* resumos/violencia-sexual/resumo.js — resumo adaptativo de violência sexual e aborto legal
   (ass-violenciasexual): acolhimento, notificação e cadeia de custódia, contracepção de emergência,
   profilaxia de ISTs bacterianas, profilaxia do HIV (prazo, exposição crônica), hepatite B e HPV,
   aborto legal (hipóteses, documentos, idade gestacional compatível, adolescente, vulnerável);
   armadilhas e tabela das profilaxias. Dono do atendimento à violência sexual da adulta e do aborto legal.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- violencia-sexual */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "violencia-sexual",
  titulo: "Violência sexual e aborto legal",
  assunto: "ass-violenciasexual",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "ms-violencia-sexual", texto: "Ministério da Saúde — Norma técnica Prevenção e tratamento dos agravos resultantes da violência sexual (2012) e Atenção às pessoas em situação de violência sexual (2024/2025); Norma técnica Atenção humanizada ao abortamento", lidoEm: null },
    { id: "pcdt-pep", texto: "Ministério da Saúde — PCDT de Profilaxia Pós-Exposição de risco ao HIV, IST e hepatites virais (2021/2024)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada; a reposição q-unesp2021-026-ia está no resumo.", questoes: ["q-unesp2021-026"] },
  ],
  doencas: [
    {
      id: "atendimento", titulo: "O atendimento à pessoa em situação de violência sexual",
      introducao: `[[O atendimento é de **urgência** e o tempo conta: cada proteção (contra gravidez, HIV, hepatite B) tem uma janela que se fecha em horas ou dias. A pessoa é atendida pelo que relata, **sem precisar de boletim de ocorrência** nem de autorização; o médico acolhe, trata, **notifica** e orienta sobre a rede de proteção, deixando a ela a decisão de ir à polícia.|q-sessp2024-070,q-simepm89-037,q-udisc20262-096]]

Veja também: **Maus-tratos** (criança e adolescente), **IST**, **HIV** e **Contracepção**.`,
      fragmentos: [
        { id: "ate-acolhimento", titulo: "Acolher, examinar e notificar", conferir: true, diretrizes: ["ms-violencia-sexual"],
          questoes: ["q-sessp2024-070","q-amrigs2020-059","q-simepm89-037","q-udisc20262-096","q-famerp2025-045"],
          prosa: `[[O atendimento começa pela **avaliação de trauma extragenital**, depois anamnese detalhada, exame físico e ginecológico, **coleta de vestígios** (com registro da **cadeia de custódia**, que documenta o caminho da prova até o tribunal), profilaxias e encaminhamento.|q-sessp2024-070,q-simepm89-037]] [[A suspeita de violência por parceiro se pesquisa **perguntando diretamente**, com a pessoa **sozinha**, e avaliando a segurança antes de ela sair; não perguntar por constrangimento é o erro.|q-amrigs2020-059]] [[A **notificação é compulsória**, independentemente da vontade da vítima, e a de violência sexual é **imediata (em 24 horas)** ao município; encaminha-se à UBS, à rede de atendimento à mulher e orienta-se sobre o boletim de ocorrência.|q-udisc20262-096,q-famerp2025-045,q-simepm89-037]]`,
          texto: `- Trauma extragenital, anamnese, exame, **vestígios com cadeia de custódia**. {q-sessp2024-070,q-simepm89-037}
- Violência por parceiro: **perguntar diretamente**, a sós. {q-amrigs2020-059}
- Notificação **obrigatória e imediata**, sem depender da vítima. {q-udisc20262-096,q-famerp2025-045,q-simepm89-037}` },
        { id: "ate-contracepcao", titulo: "Contracepção de emergência e ISTs bacterianas", conferir: true, diretrizes: ["ms-violencia-sexual","pcdt-pep"],
          figuras: [{ arquivo: "figuras/janelas-profilaxia.svg", legenda: "Esquema autoral: até quando cada profilaxia funciona depois da violência sexual." }],
          questoes: ["q-unicamp2022-059","q-unesp2021-026-ia","q-einstein2027-055","q-sirio2026-056"],
          prosa: `[[A **contracepção de emergência** (levonorgestrel 1,5 mg em dose única) é oferecida a **toda pessoa com útero** exposta, inclusive **homem trans** e adolescente, até **5 dias**, quanto antes melhor; o **DIU de cobre** também serve até 5 dias.|q-unicamp2022-059,q-unesp2021-026-ia,q-einstein2027-055]] [[Faz-se **profilaxia das ISTs bacterianas** (sífilis, gonorreia, clamídia, tricomoníase e cancro mole) já no atendimento, sem esperar exames.|q-sirio2026-056,q-unesp2021-026-ia]]`,
          texto: `- **Levonorgestrel até 5 dias** a toda pessoa com útero (homem trans também). {q-unicamp2022-059,q-unesp2021-026-ia,q-einstein2027-055}
- **Profilaxia de ISTs bacterianas** no atendimento. {q-sirio2026-056,q-unesp2021-026-ia}` },
        { id: "ate-hiv", titulo: "Profilaxia do HIV", conferir: true, diretrizes: ["pcdt-pep"],
          questoes: ["q-usp2026-109","q-einstein2024-062","q-sessp2023-042"],
          prosa: `[[A **profilaxia do HIV** começa o quanto antes, **até 72 horas**, por **28 dias**, depois de **teste rápido negativo**. Com 80 horas, a janela passou: não se inicia.|q-usp2026-109,q-einstein2024-062]] [[Não se indica em **violência crônica** pelo mesmo agressor quando houve **preservativo em todo o ato**: o risco de transmissão não justifica.|q-sessp2023-042]]`,
          texto: `- PEP **até 72 h**, por 28 dias, com teste rápido negativo. {q-usp2026-109,q-einstein2024-062}
- Abuso crônico **com preservativo**: sem PEP. {q-sessp2023-042}` },
        { id: "ate-vacinas", titulo: "Hepatite B e HPV", conferir: true, diretrizes: ["pcdt-pep"],
          questoes: ["q-sirio2025-075","q-einstein2027-055","q-unesp2021-026-ia","q-unicampdis2025-037"],
          prosa: `[[Sem vacina contra hepatite B: **vacina e imunoglobulina** (esta até 14 dias). Com esquema completo e **resposta conhecida**, não se precisa de imunoglobulina; com esquema completo mas **resposta desconhecida**, faz-se uma dose de reforço.|q-sirio2025-075,q-einstein2027-055,q-unesp2021-026-ia]] [[A **vacina contra HPV** também é oferecida à vítima de violência sexual, em **três doses** (0, 2 e 6 meses).|q-unicampdis2025-037]]`,
          texto: `- Não vacinada: **vacina + imunoglobulina** (até 14 dias); vacinada com resposta: sem imunoglobulina. {q-sirio2025-075,q-einstein2027-055,q-unesp2021-026-ia}
- **HPV em três doses**. {q-unicampdis2025-037}` },
      ],
    },
    {
      id: "aborto", titulo: "Aborto legal",
      introducao: `[[O aborto é permitido no Brasil em três situações: **gravidez resultante de estupro**, **risco de vida para a gestante** e **anencefalia** (decisão do STF). Na gravidez por estupro, a palavra da mulher basta: a lei presume a boa-fé de quem relata.|q-famema2021-042,q-fmabc2021-057,q-unicamp2022-064]]`,
      fragmentos: [
        { id: "abo-requisitos", titulo: "O que é preciso", conferir: true, diretrizes: ["ms-violencia-sexual"],
          questoes: ["q-tp20212-096","q-famerp2024-045","q-fmabc2021-057","q-unicamp2022-064","q-usp2026-103"],
          prosa: `[[Para interromper a gravidez por estupro basta o **relato circunstanciado** e o **termo de consentimento** assinado pela mulher (na adolescente, **com o representante legal**). **Não** se exige boletim de ocorrência, laudo do IML, autorização judicial nem concordância do companheiro.|q-tp20212-096,q-famerp2024-045,q-fmabc2021-057,q-unicamp2022-064]] [[A equipe confere se a **idade gestacional é compatível** com a data relatada; se for, a interrupção é feita.|q-usp2026-103]]`,
          texto: `- **Relato + consentimento** (adolescente com responsável); sem BO, juiz ou companheiro. {q-tp20212-096,q-famerp2024-045,q-fmabc2021-057,q-unicamp2022-064}
- Idade gestacional **compatível** com o relato. {q-usp2026-103}` },
        { id: "abo-hipoteses", titulo: "As hipóteses e seus limites", conferir: true, diretrizes: ["ms-violencia-sexual"],
          questoes: ["q-famema2021-042","q-unicampdis2025-038","q-usp2023-071"],
          prosa: `[[No **risco de vida materno**, recomenda-se a avaliação por dois médicos, um deles obstetra; não há limite de 22 semanas ou de 500 g nessa hipótese.|q-famema2021-042]] [[Quando a idade gestacional **não é compatível** com a data do estupro (gestação começou antes), a gravidez **não resulta** dele e o aborto legal por estupro **não se aplica**.|q-unicampdis2025-038]] [[Relação sexual com quem **não podia consentir** (alcoolizada a ponto de não resistir) é **estupro de vulnerável**, mesmo com o namorado: a adolescente deve ser informada da possibilidade de aborto legal, e o caso é notificado, decidindo-se com ela como seguir.|q-usp2023-071]]`,
          texto: `- Risco de vida: **dois médicos**, sem limite de 22 semanas. {q-famema2021-042}
- Idade gestacional **incompatível**: não é gravidez do estupro. {q-unicampdis2025-038}
- Sem condição de consentir: **estupro de vulnerável** → informar aborto legal, notificar. {q-usp2023-071}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["pcdt-pep"],
          questoes: ["q-sirio2025-075","q-einstein2027-055","q-sessp2023-042","q-simepm89-037"],
          prosa: `[[**Hepatite B na vacinada**: com resposta vacinal conhecida, nada (einstein2027-055); com esquema completo e **resposta desconhecida**, a sirio2025-075 cobrou **uma dose de vacina**.|q-sirio2025-075,q-einstein2027-055]] [[**PEP não é para todos os casos**: a sessp2023-042 marcou como certo não fazer na violência crônica com preservativo.|q-sessp2023-042]] [[**Boletim, juiz e permissão da vítima para notificar** são exigências falsas; só cadeia de custódia e contracepção de emergência eram verdadeiras na simepm89-037.|q-simepm89-037]]`,
          texto: `- Vacinada sem anti-HBs conhecido: a prova cobrou **uma dose**. {q-sirio2025-075,q-einstein2027-055}
- Crônica com preservativo: **sem PEP**. {q-sessp2023-042}
- **Não** se exige BO, juiz ou permissão para notificar. {q-simepm89-037}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: as profilaxias",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-profilaxias", titulo: "O quê, até quando e para quem", conferir: true,
          questoes: ["q-usp2026-109","q-unicamp2022-059","q-sirio2026-056","q-unesp2021-026-ia"],
          prosa: `[[Cada profilaxia tem a sua janela.|q-usp2026-109,q-unicamp2022-059,q-sirio2026-056,q-unesp2021-026-ia]]

| Proteção | Até quando | Para quem | Observação |
|---|---|---|---|
| Contracepção de emergência | 5 dias | toda pessoa com útero | levonorgestrel ou DIU de cobre |
| Profilaxia do HIV | 72 horas | exposição de risco, teste rápido negativo | 28 dias |
| ISTs bacterianas | no atendimento | penetração | sífilis, gonorreia, clamídia, tricomoníase |
| Hepatite B | imunoglobulina até 14 dias | não vacinada ou sem resposta | vacina sempre que incompleta |
| HPV | quando possível | vítima de violência sexual | três doses |`,
          texto: `- HIV: **72 h**. {q-usp2026-109}
- Contracepção: **5 dias**. {q-unicamp2022-059}
- ISTs: **no atendimento**. {q-sirio2026-056}
- Hepatite B: **14 dias**. {q-unesp2021-026-ia}` },
      ],
    },
  ],
});
