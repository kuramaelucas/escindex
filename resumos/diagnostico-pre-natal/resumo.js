/* resumos/diagnostico-pre-natal/resumo.js — resumo adaptativo de diagnóstico pré-natal e rastreamento
   de aneuploidias (ass-diagnosticoprenatal): idade materna e não disjunção, translucência nucal e
   marcadores do primeiro trimestre, DNA fetal livre (NIPT), morfológico do segundo trimestre e
   malformações associadas, ecocardiograma fetal, procedimentos invasivos (vilo corial, amniocentese,
   anti-D, infecção congênita), anemia fetal e hidropsia, centralização, cirurgia fetal e aspectos
   legais; armadilhas e tabela dos exames.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- diagnostico-pre-natal */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "diagnostico-pre-natal",
  titulo: "Diagnóstico pré-natal e rastreamento de aneuploidias",
  assunto: "ass-diagnosticoprenatal",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "fmf-1tri", texto: "Fetal Medicine Foundation — exame de 11 a 13+6 semanas; ISUOG 2013/2023 (ultrassonografia do primeiro trimestre)", lidoEm: null },
    { id: "acog-aneuploidia", texto: "ACOG Practice Bulletins 226 (rastreamento de aneuploidias, 2020) e 162 (testes diagnósticos pré-natais, 2016)", lidoEm: null },
    { id: "smfm-anemia", texto: "SMFM — Fetal anemia: diagnosis and management (2015) e Clinical Guideline on nonimmune hydrops (2015)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "rastreamento", titulo: "Rastreamento de aneuploidias",
      introducao: `[[As trissomias vêm da **não disjunção** dos cromossomos na meiose do ovócito, mais frequente quanto **mais velha a mãe**. O rastreamento junta o risco da idade a marcadores do feto e do sangue materno para separar quem precisa de exame diagnóstico invasivo, que tem risco.|q-tp20231-049,q-usp2023-034,q-iamspe2023-057]]

Veja também: **Síndromes genéticas e teratógenos**, **Pré-natal**, **Infecções congênitas** e **Vitalidade fetal**.`,
      fragmentos: [
        { id: "ras-tn", titulo: "Translucência nucal", conferir: true, diretrizes: ["fmf-1tri"],
          casos: ["q-tp20241-099"],
          questoes: ["q-usp2023-034","q-tp20241-099","q-sirio2021-070","q-sessp2022-078","q-tp20231-049"],
          prosa: `[[A **translucência nucal** é o líquido sob a pele da nuca do feto entre **11 e 14 semanas** (comprimento cabeça-nádegas de **45 a 84 mm**). Ela aumenta quando a matriz extracelular é anormal, o coração falha ou a drenagem linfática atrasa, por isso se associa a **trissomias**, cardiopatias e síndromes genéticas.|q-sessp2022-078,q-tp20241-099]] [[O risco cresce com a medida: TN de **8 mm** é **alto risco** de anomalia cromossômica; mesmo uma TN de 2,5 mm numa mulher de **41 anos** dá risco maior de trissomia que o basal, pela idade. Cariótipo normal com TN aumentada ainda pede **morfológico e ecocardiograma**.|q-usp2023-034,q-sirio2021-070,q-sessp2022-078,q-tp20231-049]]`,
          texto: `- TN entre 11 e 14 semanas (CCN 45–84 mm); aumento por **matriz extracelular**, coração, linfa. {q-sessp2022-078,q-tp20241-099}
- TN muito aumentada: **alto risco**; risco da idade soma-se. {q-usp2023-034,q-sirio2021-070,q-tp20231-049}` },
        { id: "ras-marcadores", titulo: "Outros marcadores do primeiro trimestre", conferir: true, diretrizes: ["fmf-1tri"],
          figuras: [{ arquivo: "figuras/linha-do-tempo.svg", legenda: "Esquema autoral: as janelas dos exames de diagnóstico pré-natal." }],
          casos: ["q-sirio2023-080"],
          questoes: ["q-sessp2024-073","q-sirio2023-080","q-sirio2026-078","q-iamspe2026-056","q-sessp2026-063"],
          prosa: `[[Junto da TN avaliam-se o **osso nasal** (ausente ou hipoplásico aumenta o risco), o **ducto venoso** (onda A **negativa** é alterada) e a **regurgitação tricúspide**, além do ângulo frontomaxilar. Dilatação do trato urinário não é marcador do primeiro trimestre.|q-sessp2024-073,q-sirio2023-080,q-sirio2026-078,q-iamspe2026-056]] [[O mesmo exame mede o **Doppler das artérias uterinas**, que entra no cálculo de risco de **pré-eclâmpsia**.|q-sessp2026-063]]`,
          texto: `- Osso nasal, **ducto venoso (onda A negativa)**, tricúspide. {q-sessp2024-073,q-sirio2023-080,q-sirio2026-078,q-iamspe2026-056}
- **Doppler de uterinas**: risco de pré-eclâmpsia. {q-sessp2026-063}` },
        { id: "ras-nipt", titulo: "DNA fetal livre (NIPT)", conferir: true, diretrizes: ["acog-aneuploidia"],
          questoes: ["q-iamspe2023-057"],
          prosa: `[[O **NIPT** analisa o **DNA fetal livre** (da placenta) no sangue materno a partir de 10 semanas; é o rastreamento mais sensível para trissomia 21, e a versão ampliada vê também microdeleções. Continua sendo **rastreamento**: resultado alterado se confirma com exame invasivo.|q-iamspe2023-057]]`,
          texto: `- NIPT: **DNA fetal livre** no sangue materno; é rastreio, não diagnóstico. {q-iamspe2023-057}` },
      ],
    },
    {
      id: "morfologico", titulo: "Ultrassom morfológico e malformações",
      introducao: `[[O morfológico do segundo trimestre (20 a 24 semanas) examina a anatomia inteira e detecta muitas malformações (acrania, espinha bífida, cardiopatias). Algumas malformações apontam para uma trissomia específica e mudam a conduta.|q-scmsp2023-080,q-sessp2022-077,q-sirio2022-075]]`,
      fragmentos: [
        { id: "mor-associacoes", titulo: "Malformações e cromossomos", conferir: true, diretrizes: ["acog-aneuploidia"],
          casos: ["q-sessp2023-056"],
          questoes: ["q-scmsp2023-080","q-sessp2022-077","q-sirio2022-075","q-sessp2023-056","q-unifesp2026-059"],
          prosa: `[[**Defeito do septo atrioventricular** (coxim endocárdico) é típico da **trissomia 21**; **holoprosencefalia**, da 13; **onfalocele**, da 18 e da 13; **higroma cístico**, de Turner. Gastrosquise não se associa a aneuploidia. Marcadores menores da 21 no segundo trimestre incluem **ventriculomegalia** e **intestino hiperecogênico**.|q-scmsp2023-080,q-sessp2022-077,q-sirio2022-075]] [[**Onfalocele** no primeiro trimestre pede estudo cromossômico, mesmo com TN normal: **biópsia de vilo corial**.|q-unifesp2026-059]] [[Massas que comprimem o pescoço (teratoma cervical) impedem a deglutição: **bolha gástrica pequena ou ausente** e polidrâmnio.|q-sessp2023-056]]`,
          texto: `- **Defeito do septo AV → T21**; holoprosencefalia → T13; onfalocele → T18/13; higroma → Turner. {q-scmsp2023-080,q-sessp2022-077,q-sirio2022-075}
- Onfalocele: **vilo corial**. {q-unifesp2026-059}
- Teratoma cervical: **sem bolha gástrica**, polidrâmnio. {q-sessp2023-056}` },
        { id: "mor-eco", titulo: "Ecocardiograma fetal", conferir: true,
          questoes: ["q-usp2024-118"],
          prosa: `[[O **ecocardiograma fetal** entre **24 e 28 semanas** é indicado nas gestações de risco para cardiopatia: idade materna avançada com fertilização assistida, diabetes, marcadores alterados, história familiar.|q-usp2024-118]]`,
          texto: `- Gestação de risco, 24–28 semanas: **ecocardiograma fetal**. {q-usp2024-118}` },
      ],
    },
    {
      id: "invasivos", titulo: "Exames invasivos",
      introducao: `[[O diagnóstico definitivo de uma cromossomopatia exige células do feto: as da placenta (**vilo corial**) ou as do líquido amniótico (**amniocentese**). Cada procedimento tem sua janela e um risco pequeno de perda e de sensibilização Rh.|q-didepm-093,q-sessp2023-053,q-unifesp2026-059]]`,
      fragmentos: [
        { id: "inv-procedimentos", titulo: "Vilo corial e amniocentese", conferir: true, diretrizes: ["acog-aneuploidia"],
          questoes: ["q-didepm-093","q-unifesp2026-059","q-sessp2023-053","q-scmsp2025-071"],
          prosa: `[[Com rastreio muito alterado no **primeiro trimestre** (TN 4,2 mm, osso nasal ausente), o exame é a **biópsia de vilo corial** (11 a 14 semanas), com cariótipo ou microarray; a **amniocentese** só a partir de **15 semanas**. O NIPT não substitui o diagnóstico.|q-didepm-093,q-unifesp2026-059]] [[Depois de qualquer procedimento invasivo, a gestante **Rh negativo** recebe **imunoglobulina anti-D**.|q-sessp2023-053]] [[Para infecção fetal (rubéola, citomegalovírus), a **PCR no líquido amniótico** só é confiável depois de **18 a 20 semanas** e de algumas semanas da infecção materna.|q-scmsp2025-071]]`,
          texto: `- 1º trimestre: **vilo corial**; amniocentese **≥ 15 semanas**. {q-didepm-093,q-unifesp2026-059}
- Rh negativo: **anti-D** após procedimento. {q-sessp2023-053}
- Infecção: **PCR no líquido após 18–20 semanas**. {q-scmsp2025-071}` },
      ],
    },
    {
      id: "doppler", titulo: "Anemia fetal, hidropsia e centralização",
      introducao: `[[O feto anêmico tem sangue mais fluido e coração acelerado: o sangue corre **mais rápido** na artéria cerebral média, o que o Doppler mede sem agulha. No feto que recebe pouco oxigênio, a resistência da placenta sobe e o fluxo se desvia para o cérebro.|q-adap26-059,q-iamspe2025-055]]`,
      fragmentos: [
        { id: "dop-anemia", titulo: "Isoimunização e hidropsia", conferir: true, diretrizes: ["smfm-anemia"],
          questoes: ["q-adap26-059","q-einstein2024-053"],
          prosa: `[[Gestante Rh negativo **sensibilizada** (Coombs indireto com título ≥ 1:16) é acompanhada com **pico de velocidade sistólica da artéria cerebral média**, **semanal**; se passar de 1,5 múltiplo da mediana, cordocentese e transfusão intrauterina. Amniocentese com curva de Liley ficou para trás.|q-adap26-059]] [[**Hidropsia** (ascite e edema do feto) **não imune** tem como causa infecciosa clássica o **parvovírus B19**, que para a produção de hemácias: sorologia materna e PCR no líquido amniótico.|q-einstein2024-053]]`,
          texto: `- Rh sensibilizada: **Doppler da cerebral média semanal**. {q-adap26-059}
- Hidropsia não imune: **parvovírus B19** (sorologia, PCR). {q-einstein2024-053}` },
        { id: "dop-centralizacao", titulo: "Centralização fetal", conferir: true,
          questoes: ["q-iamspe2025-055"],
          prosa: `[[Na insuficiência placentária, a resistência da **artéria umbilical sobe** (relação sístole/diástole aumentada) e o cérebro se defende **dilatando a cerebral média** (relação **diminuída**): o sangue se concentra no cérebro, coração e adrenais. Isso é a **centralização**.|q-iamspe2025-055]]`,
          texto: `- Centralização: **umbilical sobe, cerebral média cai**. {q-iamspe2025-055}` },
      ],
    },
    {
      id: "conduta", titulo: "Cirurgia fetal e o que a lei permite",
      introducao: `[[Diagnosticar cedo abre duas portas: tratar dentro do útero algumas malformações e preparar o parto e a família. No Brasil, a interrupção da gestação por anomalia fetal é permitida só na **anencefalia**.|q-iamspe2026-051,q-einstein2024-048]]`,
      fragmentos: [
        { id: "con-cirurgia", titulo: "Cirurgia fetal da mielomeningocele", conferir: true,
          questoes: ["q-iamspe2026-051"],
          prosa: `[[A correção da **mielomeningocele** antes do nascimento (até cerca de 26 semanas) reduz a hidrocefalia que precisa de derivação e melhora a marcha. É possível também em **gemelares**; os riscos principais são **parto prematuro** e rotura de membranas.|q-iamspe2026-051]]`,
          texto: `- Cirurgia fetal da mielomeningocele: possível em **gemelares**; risco de **prematuridade**. {q-iamspe2026-051}` },
        { id: "con-lei", titulo: "Interrupção e anomalia fetal", conferir: true,
          questoes: ["q-einstein2024-048"],
          prosa: `[[A lei permite o aborto em caso de **estupro**, **risco de vida materno** e, por decisão do STF (ADPF 54), **anencefalia**. **Trissomias não estão contempladas**; outras malformações graves dependem de autorização judicial.|q-einstein2024-048]]`,
          texto: `- Trissomia: **não é causa legal** de interrupção; anencefalia é. {q-einstein2024-048}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["fmf-1tri"],
          questoes: ["q-sessp2022-078","q-sessp2024-073","q-usp2023-034","q-iamspe2026-051"],
          prosa: `[[**Ponto de corte da TN**: o risco é calculado pela TN conforme o comprimento cabeça-nádegas; "normal abaixo de 2,5 mm" é uma simplificação. A sessp2024-073 usou 2,5 mm como normal; a sessp2022-078 não aceitou isso como a melhor resposta.|q-sessp2022-078,q-sessp2024-073]] [[**TN de 2,5 mm aos 41 anos**: a medida em si é limítrofe, mas o risco final de trissomia é maior que o basal pela idade, como cobrou a usp2023-034.|q-usp2023-034]] [[**Rotura uterina** não é a principal complicação da cirurgia fetal; é o parto prematuro.|q-iamspe2026-051]]`,
          texto: `- TN 2,5 mm como "normal": simplificação; uma prova aceitou, a outra não. {q-sessp2022-078,q-sessp2024-073}
- Idade avançada **soma** risco. {q-usp2023-034}
- Cirurgia fetal: complicação principal é **prematuridade**. {q-iamspe2026-051}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: exames de diagnóstico pré-natal",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-exames", titulo: "Quando, o que mede e se diagnostica", conferir: true,
          questoes: ["q-sirio2021-070","q-iamspe2023-057","q-didepm-093","q-adap26-059"],
          prosa: `[[Rastreio indica risco; só o invasivo diagnostica.|q-sirio2021-070,q-iamspe2023-057,q-didepm-093,q-adap26-059]]

| Exame | Quando | O que vê | Diagnóstico? |
|---|---|---|---|
| Morfológico do 1º trimestre | 11–14 semanas | TN, osso nasal, ducto venoso, tricúspide | não (rastreio) |
| NIPT (DNA fetal livre) | a partir de 10 semanas | trissomias no sangue materno | não (rastreio) |
| Vilo corial | 11–14 semanas | cariótipo/microarray da placenta | sim |
| Amniocentese | a partir de 15 semanas | cariótipo, PCR de infecção (após 18 semanas) | sim |
| Doppler da cerebral média | após 18 semanas, na isoimunização | anemia fetal | indica cordocentese |`,
          texto: `- TN: **rastreio**. {q-sirio2021-070}
- NIPT: **rastreio**. {q-iamspe2023-057}
- Vilo: **diagnóstico**. {q-didepm-093}
- Cerebral média: **anemia**. {q-adap26-059}` },
      ],
    },
  ],
});
