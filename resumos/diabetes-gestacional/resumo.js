/* resumos/diabetes-gestacional/resumo.js — resumo adaptativo de hiperglicemia na gestação: fisiopatologia,
   rastreio e diagnóstico (glicemia de jejum no 1º trimestre, TOTG 75 g, diabetes diagnosticado na gestação),
   metas e tratamento (dieta, insulina, metformina), diabetes pré-gestacional e malformações, parto,
   recém-nascido e reclassificação no pós-parto. Molde e regras: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- diabetes-gestacional */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "diabetes-gestacional",
  titulo: "Diabetes na gestação",
  assunto: "ass-dmg",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "opas-dmg-2017", texto: "OPAS/Ministério da Saúde/FEBRASGO/SBD — Rastreamento e diagnóstico de diabetes mellitus gestacional no Brasil (2017), iris.paho.org", lidoEm: "2026-11-19" },
    { id: "febrasgo-dmg", texto: "OPAS/MS/FEBRASGO/SBD — Tratamento do diabetes mellitus gestacional no Brasil (2019)", lidoEm: null },
    { id: "acog-dmg", texto: "ACOG — Gestational diabetes mellitus (Practice Bulletin 190, atualização clínica de julho/2024)", lidoEm: null },
    { id: "sbd-2025", texto: "SBD — Diretriz da Sociedade Brasileira de Diabetes, capítulo de diabetes na gestação (2025)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas (entram pelas reposições)", questoes: ["q-scmsp2023-079","q-unesp2021-024"] },
  ],
  doencas: [
    {
      id: "diagnostico", titulo: "Fisiopatologia e diagnóstico",
      introducao: `[[A placenta produz hormônios contrainsulínicos (lactogênio placentário, progesterona, cortisol) que crescem a partir do segundo trimestre, para desviar glicose ao feto; quem não consegue aumentar a insulina na mesma medida fica hiperglicêmica — é o diabetes gestacional, que some quando a placenta sai e marca o risco de diabetes tipo 2 no futuro.|q-famema2021-057,q-iamspe2025-060]] [[A glicose atravessa a placenta e a insulina não: o feto responde com hiperinsulinismo, que é hormônio de crescimento — macrossomia, polidrâmnio, e hipoglicemia ao nascer quando a glicose materna para de chegar.|q-fmabc2021-060,q-uspsp4-041,q-unicampdis2025-035]]

[[No Brasil, toda gestante faz glicemia de jejum na primeira consulta (antes de 20 semanas): 92 a 125 mg/dL já é diabetes gestacional; 126 ou mais (ou glicada ≥ 6,5%, ou glicemia ao acaso ≥ 200 com sintomas) é diabetes diagnosticado na gestação (overt), que já existia antes; abaixo de 92, faz o TOTG de 75 g entre 24 e 28 semanas.|q-scmsp2023-079-ia,q-sessp2026-067,q-sirio2027-063,q-unesp2023-021,q-fmabc2022-071,q-sirio2022-070]] [[No TOTG, um valor basta: jejum ≥ 92, 1 hora ≥ 180 ou 2 horas ≥ 153 é diabetes gestacional; jejum ≥ 126 ou 2 horas ≥ 200 é overt.|q-020,q-adap22-033,q-einstein2027-071,q-iamspe2026-055,q-sirio2025-076]]

Veja também: **Diabetes** (clínica médica: tipos 1 e 2, insulinas), **Prematuridade** (pediatria: hipoglicemia do filho de mãe diabética), **Pré-natal**.`,
      fragmentos: [
        { id: "dia-jejum", titulo: "Glicemia de jejum no início do pré-natal", conferir: false, diretrizes: ["opas-dmg-2017"],
          figuras: [{ arquivo: "figuras/diagnostico.svg", legenda: "Esquema autoral: o rastreio em duas etapas e os pontos de corte." }],
          questoes: ["q-unifesp2023-056","q-unifesp2025-072","q-scmsp2021-074","q-scmsp2022-058","q-scmsp2023-079-ia","q-unesp2021-024-ia","q-amrigs2020-041","q-iamspe2025-060","q-unesp2023-021","q-famema2023-054","q-sessp2026-067","q-tp20222-086","q-unesp2025-024","q-unesp2026-023","q-famerp2023-038","q-uspsp4-047","q-simepm89-021","q-sirio2027-063","q-sirio2022-070","q-fmabc2022-071","q-usprp2024-097"],
          texto: `- Jejum < 92 no 1º trimestre: **TOTG 75 g com 24–28 semanas**. {q-scmsp2023-079-ia,q-unifesp2025-072,q-unesp2023-021,q-famerp2023-038}
- Jejum < 92: **sem exames adicionais** agora. {q-unifesp2023-056}
- Jejum **92 a 125**: **diabetes gestacional**, dieta e atividade. {q-sessp2026-067,q-sirio2027-063,q-scmsp2021-074,q-simepm89-021,q-amrigs2020-041,q-famema2023-054}
- Jejum 112 com 12 semanas: **diabetes gestacional**, tratamento comportamental. {q-scmsp2022-058}
- Jejum 94 com macrossomia anterior: **estilo de vida e glicemias**. {q-unesp2025-024,q-uspsp4-047,q-unesp2026-023}
- Diagnosticada: **glicemias de jejum e pós-prandiais** já. {q-usprp2024-097}
- Glicada 6,8% com jejum 90: **diabética** (dieta e atividade). {q-tp20222-086}
- Jejum ≥ 126: **diabetes, não gestacional**. {q-fmabc2022-071}
- Jejum 116 e 108 com glicada 6,8%: **diabetes pré-gestacional**, tratar. {q-unesp2021-024-ia}
- Glicemia ao acaso 210: **diabetes diagnosticado na gravidez**. {q-sirio2022-070}
- Overt: hiperglicemia na gestação com **critério de diabetes fora dela**. {q-iamspe2025-060}` },
        { id: "dia-totg", titulo: "TOTG de 75 g", conferir: false, diretrizes: ["opas-dmg-2017"],
          questoes: ["q-020","q-adap22-033","q-iamspe2021-060","q-iamspe2026-055","q-famema2021-057","q-sessp2026-086","q-unicamp2023-051","q-uspsp3-052","q-sirio2025-076","q-fmabc2026-062","q-einstein2023-058","q-einstein2027-071","q-tp20212-084","q-unicampdis2025-035"],
          prosa: `[[Feto no percentil 97 com polidrâmnio pede o TOTG, mesmo fora da janela.|q-unicampdis2025-035]] [[O TOTG feito antes de 24 semanas não substitui o da janela; a glicemia de jejum da primeira consulta é que vale nessa fase.|q-uspsp3-052,q-einstein2023-058]]`,
          texto: `- Um valor alterado basta: **diabetes gestacional**. {q-020,q-adap22-033,q-einstein2027-071,q-unicamp2023-051,q-fmabc2026-062,q-tp20212-084}
- Glicemia 95 com 27 semanas: **diabetes gestacional**, risco de DM2 depois. {q-famema2021-057}
- Diagnóstico estabelecido: **dieta e atividade** já. {q-sessp2026-086}
- Com viabilidade, toda gestante faz **jejum e TOTG**. {q-iamspe2021-060}
- Errado: jejum **≥ 126** "deve fazer TOTG". {q-iamspe2026-055}
- Jejum 95, 1 h 215, 2 h 200: **overt**. {q-sirio2025-076}
- TOTG com 21 semanas: a **glicemia de jejum** do início é que estava certa. {q-uspsp3-052,q-einstein2023-058}
- Feto P97 e polidrâmnio: **TOTG**. {q-unicampdis2025-035}` },
      ],
    },
    {
      id: "tratamento", titulo: "Metas e tratamento",
      introducao: `[[As metas são jejum abaixo de 95 mg/dL, 1 hora após as refeições abaixo de 140 e 2 horas abaixo de 120; elas existem para tirar o feto do hiperinsulinismo.|q-sirio2021-077,q-didepm-008]] [[Dieta e atividade física controlam a maioria; se mais de 30% das medidas ficam fora da meta em 1 a 2 semanas, ou se o feto já cresce demais (circunferência abdominal ≥ percentil 75), entra a insulina, que não atravessa a placenta.|q-adap25-072,q-unifesp2022-038,q-tp20231-086,q-tp20241-084,q-uspsp5-040,q-scmsp2025-064]] [[A insulina se ajusta pelo horário que falha: jejum alto, aumenta a NPH da noite; pós-prandial alto, a regular (ou rápida) da refeição anterior.|q-udisc20262-081,q-usprp2026-074]]

[[Hipoglicemias e queda da necessidade de insulina no fim da gestação sugerem que a placenta está falhando (menos hormônio contrainsulínico).|q-unifesp2022-033,q-unicampdis2024-038]]`,
      fragmentos: [
        { id: "tra-insulina", titulo: "Quando e como usar insulina", conferir: true, diretrizes: ["febrasgo-dmg","acog-dmg"],
          questoes: ["q-adap25-072","q-unifesp2022-038","q-scmsp2025-064","q-usp2025-013","q-usprp2023-030","q-usprp2026-074","q-iamspe2022-061","q-tp20202-095","q-tp20231-086","q-tp20232-086","q-tp20241-084","q-tp20261-047","q-unesp2022-022","q-unesp2022-023","q-unicamp2022-053","q-udisc20262-081","q-uspsp5-040","q-sirio2021-077","q-didepm-008"],
          casos: ["q-tp20232-086","q-scmsp2025-064"],
          prosa: `[[A metformina atravessa a placenta e é alternativa quando a insulina não é possível.|q-usprp2023-030]] [[Glicemias muito altas com infecção pedem internação para iniciar insulina.|q-unicamp2022-053]]`,
          texto: `- Metas: jejum **< 95**, 1 h **< 140**, 2 h **< 120**. {q-sirio2021-077,q-didepm-008}
- Jejum acima da meta com dieta: **insulina**. {q-adap25-072}
- Muitos valores fora da meta: **insulina**. {q-unifesp2022-038,q-tp20202-095,q-tp20231-086,q-tp20232-086,q-tp20261-047,q-usp2025-013}
- 42,8% alterados: **internar, insulina e vitalidade**. {q-scmsp2025-064}
- Médias altas e feto P97: **insulina**. {q-tp20241-084}
- Controle bom mas feto P90: **insulina**. {q-uspsp5-040}
- Perfil dentro da meta: **manter dieta e atividade**. {q-iamspe2022-061}
- Controle inadequado e líquido aumentado: **insulina e parto a partir de 37 sem**. {q-unesp2022-022,q-unesp2022-023}
- Jejum 110 com pós-prandiais bons: **aumentar a NPH da noite**. {q-udisc20262-081}
- Ajuste por horário: **NPH noturna**, regular conforme a refeição. {q-usprp2026-074}
- Alternativa farmacológica: **metformina**. {q-usprp2023-030}
- Glicemias de 220 com síndrome gripal: **internar para insulina**. {q-unicamp2022-053}` },
        { id: "tra-placenta", titulo: "Hipoglicemia no fim da gestação",
          questoes: ["q-unifesp2022-033","q-unicampdis2024-038"],
          texto: `- Hipoglicemias a partir de 35 semanas: **insuficiência placentária**. {q-unifesp2022-033,q-unicampdis2024-038}` },
      ],
    },
    {
      id: "pregestacional", titulo: "Diabetes pré-gestacional",
      introducao: `[[No diabetes que já existia, o perigo começa na organogênese: a glicose alta nas primeiras 8 semanas causa malformações (cardiopatia, defeito de tubo neural, regressão caudal), proporcionais à glicada; por isso a gestação se planeja com glicada abaixo de 6,5%.|q-fmabc2023-065,q-sessp2024-080,q-einstein2025-048]] [[Na gestação, morfológico detalhado e ecocardiograma fetal entre 20 e 28 semanas, AAS para prevenir pré-eclâmpsia, e rastreio de retinopatia e nefropatia.|q-adap23-056,q-tp20252-004,q-sirio2024-073,q-amrigs2021-041]]`,
      fragmentos: [
        { id: "pre-malformacoes", titulo: "Malformações e cuidados", conferir: true, diretrizes: ["sbd-2025"],
          questoes: ["q-adap23-056","q-amrigs2021-041","q-sessp2024-080","q-tp20252-004","q-sirio2024-073","q-fmabc2023-065","q-einstein2025-048","q-usprp2025-044"],
          prosa: `[[O controle ruim no fim da gestação, com feto grande, antecipa o parto.|q-usprp2025-044]]`,
          texto: `- Organogênese descontrolada: **cardiopatia congênita**. {q-sessp2024-080}
- Glicada 9,6%: **CIV e regressão caudal**. {q-einstein2025-048}
- Glicada alta: malformação muito elevada, **adiar a gestação**. {q-fmabc2023-065}
- DM1 com 12 semanas: **morfológico e ecocardiograma fetal**. {q-adap23-056}
- Glicemia alterada com 20 semanas: eco fetal **24–28 sem**. {q-tp20252-004}
- DM1 na 1ª consulta: **AAS**. {q-sirio2024-073}
- Pré-gestacional: rastrear órgãos-alvo e ultrassom seriado (banca: a cada 2 semanas **não**). {q-amrigs2021-041}
- DM1 descompensado com 36 sem: **resolver já**. {q-usprp2025-044}` },
      ],
    },
    {
      id: "parto", titulo: "Parto, recém-nascido e pós-parto",
      introducao: `[[Diabetes gestacional controlado só com dieta e feto adequado pode esperar o trabalho de parto até 40 semanas e 6 dias; com insulina e bom controle, parto entre 39 0/7 e 39 6/7; com mau controle ou macrossomia, antes. Feto estimado acima de 4.500 g em diabética indica cesárea pelo risco de distocia de ombro.|q-adap25-077,q-unifesp2025-077,q-unifesp2026-057,q-adap21-053,q-usprp2021-053]] [[No dia da indução, com dieta oferecida, reduz-se a NPH e se usa regular conforme a glicemia; logo após o parto, a necessidade de insulina cai — no diabetes gestacional, suspende-se; no pré-gestacional, volta-se à dose de antes ou metade.|q-usp2026-099,q-adap26-057,q-unicampdis2024-099]]

[[No recém-nascido, a hipoglicemia vem do hiperinsulinismo que continua depois de cortado o cordão; também policitemia, icterícia, hipocalcemia e desconforto respiratório.|q-amrigs2022-061,q-unesp2023-004]] [[A mãe com diabetes gestacional repete o TOTG de 75 g entre 6 e 12 semanas após o parto (ou glicemia de jejum) e depois todo ano, porque metade terá diabetes tipo 2 em 10 anos.|q-adap22-038,q-tp20251-086,q-unesp2024-029,q-unesp2025-023,q-einstein2024-060]]`,
      fragmentos: [
        { id: "par-momento", titulo: "Momento e via de parto", conferir: true, diretrizes: ["acog-dmg"],
          questoes: ["q-adap25-077","q-adap21-053","q-unifesp2025-077","q-unifesp2026-057","q-usp2026-099","q-usprp2021-053","q-tp20251-092"],
          prosa: `[[Com uma cesárea anterior e colo desfavorável, o preparo é com sonda de Foley.|q-tp20251-092]]`,
          texto: `- Só dieta, feto P60: **aguardar até 40 sem e 6 dias**. {q-adap25-077}
- Insulina, feto adequado: **indução entre 39 0/7 e 39 6/7**. {q-unifesp2025-077}
- Insulina, circunferência abdominal P95: **indução imediata** com 37 sem. {q-unifesp2026-057}
- Mau controle com 35 sem: **resolver** e controlar a glicemia no parto. {q-usprp2021-053}
- Feto > 4.500 g: **cesárea eletiva**. {q-adap21-053}
- Indução com dieta: **NPH reduzida** e regular conforme glicemia. {q-usp2026-099}
- Cesárea anterior, 40 sem: **sonda de Foley**. {q-tp20251-092}` },
        { id: "par-puerperio", titulo: "Recém-nascido e pós-parto", conferir: true, diretrizes: ["opas-dmg-2017"],
          questoes: ["q-adap22-038","q-adap26-057","q-tp20251-086","q-unesp2024-029","q-unesp2025-023","q-unicampdis2024-099","q-einstein2024-060","q-amrigs2022-061","q-unesp2023-004","q-fmabc2021-060","q-uspsp4-041"],
          texto: `- Maior risco fetal: **macrossomia**. {q-fmabc2021-060}
- Altura uterina grande: **polidrâmnio ou feto grande**. {q-uspsp4-041}
- RN assintomático com glicemia baixa: **gel de dextrose** e nova glicemia em 30 min. {q-amrigs2022-061}
- Não é do filho de diabética: **hipermagnesemia**. {q-unesp2023-004}
- DMG com insulina: **suspender** no pós-parto. {q-adap26-057}
- Pré-gestacional com 40 UI de NPH: **reduzir à metade**. {q-unicampdis2024-099}
- Reclassificar: **TOTG entre 6 e 12 semanas**, depois anual. {q-adap22-038,q-tp20251-086}
- Jejum 99 e 2 h 142–155: **intolerância à glicose**, estilo de vida. {q-unesp2024-029,q-unesp2025-023,q-einstein2024-060}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-usprp2023-030","q-tp20222-086","q-unicamp2022-053"],
          texto: `- A insulina é a primeira escolha; a metformina, alternativa. A banca escolheu **metformina** como terapia farmacológica. {q-usprp2023-030}
- Glicada de 6,8% no início é **diabetes diagnosticado na gestação**; a prova tratou só com dieta e atividade. {q-tp20222-086}
- Hiperglicemia com síndrome gripal: a internação é pela glicemia; a prova juntou **RT-PCR e isolamento** à conduta. {q-unicamp2022-053}` },
      ],
    },
  ],
});
