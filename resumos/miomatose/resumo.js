/* resumos/miomatose/resumo.js — resumo adaptativo de miomatose uterina (ass-miomatose): biologia e
   sintomas, classificação FIGO e STEP-W, diagnóstico, quando observar, tratamento clínico, histeroscopia,
   miomectomia, embolização e histerectomia, sarcoma e morcelamento, degeneração na gestação,
   adenomiose, complicação da histeroscopia, armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- miomatose */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "miomatose",
  titulo: "Miomatose uterina e adenomiose",
  assunto: "ass-miomatose",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "figo-palm-coein", texto: "Munro et al. — FIGO classification system (PALM-COEIN) for causes of abnormal uterine bleeding, revisão 2018 (Int J Gynecol Obstet 2018)", lidoEm: null },
    { id: "acog-mioma", texto: "ACOG Practice Bulletin 228 — Management of symptomatic uterine leiomyomas (2021) e Febrasgo — Miomatose uterina (protocolo)", lidoEm: null },
    { id: "lasmar-stepw", texto: "Lasmar et al. — Submucous myomas: a new presurgical classification (STEP-W) (Fertil Steril 2005)", lidoEm: null },
    { id: "ms-mec-oms", texto: "OMS — Medical eligibility criteria for contraceptive use (5.ª ed., 2015)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "biologia", titulo: "O que é o mioma e onde ele está",
      introducao: `[[O leiomioma é um tumor benigno do músculo liso uterino, clonal, que cresce sob estrogênio e progesterona: aparece na menacme, cresce na gestação e regride na menopausa. É o tumor pélvico mais comum da mulher e, na maioria, não dá sintoma. O que manda nos sintomas é a **posição**: o submucoso, que deforma a cavidade, sangra e atrapalha a gestação mesmo pequeno; o intramural grande aumenta o útero e o fluxo; o subseroso comprime bexiga e reto.|q-famema2023-042,q-sirio2021-061,q-uspsp1-073]]

Veja também: **Sangramento uterino anormal**, **Endometriose**, **Infertilidade**, **Anticoncepção** e **Câncer de endométrio** quando houver resumo.`,
      fragmentos: [
        { id: "bio-figo", titulo: "Classificação FIGO", conferir: true, diretrizes: ["figo-palm-coein"],
          figuras: [{ arquivo: "figuras/figo-mioma.svg", legenda: "Esquema autoral: os tipos FIGO do mioma pela relação com a cavidade e com a serosa." }],
          casos: ["q-einstein2021-034","q-uspsp1-073"],
          questoes: ["q-sessp2025-069","q-scmsp2021-067","q-scmsp2026-069","q-einstein2021-034","q-sirio2021-061","q-famema2023-042","q-uspsp1-073"],
          prosa: `[[**0** pediculado, inteiro dentro da cavidade; **1** submucoso com menos de 50% no miométrio; **2** submucoso com 50% ou mais no miométrio; **3** encosta no endométrio sem entrar na cavidade (manto interno de 0 cm); **4** intramural puro; **5** subseroso com 50% ou mais intramural; **6** subseroso com menos de 50% intramural; **7** subseroso pediculado; **8** fora do corpo (cervical, ligamento largo, parasitário).|q-sessp2025-069,q-scmsp2021-067,q-scmsp2026-069,q-einstein2021-034]] [[Os tipos 0 a 2 causam sangramento e dismenorreia; os subserosos raramente sangram e dão sintomas de massa; o tipo 8 parasitário, preso a outro órgão, pode causar dispareunia. Útero aumentado, endurecido, de superfície bocelada, sugere mioma; a cirurgia é decidida pelo volume e pela anemia, não pelo simples achado.|q-sirio2021-061,q-famema2023-042,q-uspsp1-073]]`,
          texto: `- **0–2** submucosos; **3** toca o endométrio; **4** intramural; **5–7** subserosos; **8** outro lugar. {q-sessp2025-069,q-scmsp2021-067,q-scmsp2026-069,q-einstein2021-034}
- Submucoso: **sangramento**; cirurgia por volume e anemia. {q-sirio2021-061,q-famema2023-042,q-uspsp1-073}` },
        { id: "bio-diagnostico", titulo: "Como investigar", conferir: true, diretrizes: ["figo-palm-coein"],
          casos: ["q-famerp2023-045"],
          questoes: ["q-sirio2024-078","q-tp20241-090","q-famerp2023-045","q-tp20261-120"],
          prosa: `[[Sangramento uterino aumentado com útero grande começa pela **ultrassonografia transvaginal**; a ressonância fica para mapear antes de cirurgia conservadora ou separar mioma de adenomiose.|q-sirio2024-078]] [[Quando a ultrassonografia sugere lesão da cavidade, **histerossonografia** ou **histeroscopia** confirmam o submucoso e medem quanto dele está dentro do músculo.|q-tp20241-090,q-famerp2023-045,q-tp20261-120]]`,
          texto: `- Primeiro: **ultrassonografia transvaginal**. {q-sirio2024-078}
- Cavidade: **histerossonografia/histeroscopia**. {q-tp20241-090,q-famerp2023-045,q-tp20261-120}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento",
      introducao: `[[O mioma é tratado pelo sintoma, não pela existência. A escolha cruza três perguntas: há sintoma? onde está o mioma? a mulher quer preservar a fertilidade ou o útero?|q-adap22-028,q-usp2024-097,q-einstein2024-056]]`,
      fragmentos: [
        { id: "tra-observar", titulo: "Assintomático: observar", conferir: true, diretrizes: ["acog-mioma"],
          questoes: ["q-adap22-028","q-usp2024-097","q-einstein2024-056","q-tp20212-100","q-scmsp2025-077","q-unesp2024-034"],
          prosa: `[[Mioma sem sintoma, mesmo de 4 cm, intramural ou subseroso, pede **acompanhamento clínico**: não cresce para câncer e tende a regredir na menopausa.|q-adap22-028,q-einstein2024-056,q-tp20212-100]] [[Com desejo de gestação, intramural ou subseroso que **não deforma a cavidade** não precisa ser retirado: orientação pré-gestacional e observação. Cólica leve se trata com AINE e a mulher está liberada para engravidar.|q-usp2024-097,q-scmsp2025-077,q-unesp2024-034]]`,
          texto: `- Assintomático: **observar**. {q-adap22-028,q-einstein2024-056,q-tp20212-100}
- Quer engravidar, cavidade normal: **observar**. {q-usp2024-097,q-scmsp2025-077,q-unesp2024-034}` },
        { id: "tra-clinico", titulo: "Tratamento clínico", conferir: true, diretrizes: ["acog-mioma","ms-mec-oms"],
          questoes: ["q-adap25-070","q-usp2026-119","q-fmabc2026-071","q-unesp2021-033","q-unifesp2025-070","q-usprp2026-062"],
          prosa: `[[O sangramento do mioma vem do endométrio que o recobre. O **DIU de levonorgestrel** atrofia o endométrio e reduz o fluxo, com contracepção junto — desde que a cavidade não esteja deformada.|q-adap25-070,q-usp2026-119,q-fmabc2026-071]] [[AINE e ácido tranexâmico na menstruação são o primeiro degrau; com hipertensão, obesidade e tabagismo após os 35, o estrogênio sai, e o AINE é a opção inicial.|q-unesp2021-033]] [[Cavidade distorcida contraindica o DIU (expulsão, falha): o contraceptivo hormonal sistêmico, como o **injetável mensal**, controla o fluxo.|q-unifesp2025-070]] [[O **análogo de GnRH** reduz o mioma e para o sangramento, mas causa hipoestrogenismo (fogachos, perda óssea): serve como ponte até a cirurgia ou a menopausa, por poucos meses. Ao suspender, troca-se por **progestagênio isolado** se o estrogênio for evitado.|q-usprp2026-062]]`,
          texto: `- **DIU-LNG**: atrofia endometrial; cavidade normal. {q-adap25-070,q-usp2026-119,q-fmabc2026-071}
- AINE primeiro; sem estrogênio no risco cardiovascular. {q-unesp2021-033}
- Cavidade distorcida: **sem DIU**. {q-unifesp2025-070}
- GnRH: ponte; depois **progestagênio**. {q-usprp2026-062}` },
        { id: "tra-histeroscopia", titulo: "Submucoso: histeroscopia", conferir: true, diretrizes: ["acog-mioma","lasmar-stepw"],
          casos: ["q-usprp2024-082","q-uspsp2-026"],
          questoes: ["q-adap23-041","q-scmsp2023-070","q-iamspe2021-056","q-iamspe2023-055","q-tp20251-094","q-tp20261-120","q-usprp2024-082","q-uspsp2-026","q-famerp2023-045","q-famerp2026-021","q-unicampdis2024-040","q-iamspe2025-041","q-iamspe2026-043","q-scmsp2022-041"],
          prosa: `[[Submucoso sintomático, sobretudo com desejo de gestação: **miomectomia histeroscópica**, que tira a causa do sangramento e da infertilidade e preserva o útero. Os tipos 0 e 1 saem bem por histeroscopia; dos outros nódulos, só se trata o que causa o problema.|q-adap23-041,q-scmsp2023-070,q-iamspe2021-056,q-iamspe2023-055,q-tp20251-094,q-tp20261-120,q-usprp2024-082,q-uspsp2-026,q-famerp2023-045,q-famerp2026-021,q-unicampdis2024-040]] [[A classificação **STEP-W de Lasmar** pontua tamanho, topografia, extensão da base, penetração no miométrio e parede lateral: até 4 pontos, histeroscopia em tempo único; 5–6, cirurgia complexa (preparo com GnRH ou dois tempos); acima de 6, outra via. Um tipo 2 de 6 cm com manto externo de 3 mm, que não reduziu com GnRH, vai para **videolaparoscopia**.|q-iamspe2025-041,q-iamspe2026-043,q-scmsp2022-041]]`,
          texto: `- Submucoso sintomático: **miomectomia histeroscópica**. {q-adap23-041,q-scmsp2023-070,q-iamspe2021-056,q-iamspe2023-055,q-tp20251-094,q-tp20261-120,q-usprp2024-082,q-uspsp2-026,q-famerp2023-045,q-famerp2026-021,q-unicampdis2024-040}
- STEP-W ≤ 4: tempo único; 5–6: complexa; > 6: outra via. {q-iamspe2025-041,q-iamspe2026-043,q-scmsp2022-041}` },
        { id: "tra-cirurgia", titulo: "Miomectomia, embolização e histerectomia", conferir: true, diretrizes: ["acog-mioma"],
          casos: ["q-uspsp3-063"],
          questoes: ["q-unifesp2022-028","q-scmsp2023-064","q-einstein2027-058","q-sirio2023-069","q-scmsp2022-042","q-adap22-029","q-uspsp3-063","q-einstein2023-051","q-unifesp2024-044","q-unicampdis2025-088","q-einstein2026-058"],
          prosa: `[[Intramural ou subseroso sintomático em quem quer gestar: **miomectomia laparoscópica** (ou aberta, ou robótica, conforme tamanho e número); com um submucoso e um intramural, cada um pela sua via — histeroscopia para o de cavidade, laparoscopia para o de parede. Vasopressina e clampeamento temporário das uterinas reduzem o sangramento e ampliam o que se consegue tirar.|q-unifesp2022-028,q-scmsp2023-064,q-einstein2027-058,q-sirio2023-069,q-scmsp2022-042]] [[Quem quer preservar o útero e não a fertilidade, depois de falha clínica, pode fazer **embolização das artérias uterinas**.|q-adap22-029]] [[Prole completa, falha clínica, útero grande ou múltiplos miomas: **histerectomia** — por via vaginal ou laparoscópica quando possível, abdominal quando o útero é grande demais. Contra o uso de hormônio (câncer de mama receptor positivo), é a saída definitiva.|q-uspsp3-063,q-einstein2023-051,q-unifesp2024-044,q-unicampdis2025-088]] [[A peça vai inteira, sem morcelamento livre na cavidade, porque um **sarcoma** uterino suposto mioma seria disseminado e o prognóstico pioraria.|q-einstein2026-058]]`,
          texto: `- Quer gestar, não submucoso: **miomectomia laparoscópica**. {q-unifesp2022-028,q-scmsp2023-064,q-einstein2027-058,q-sirio2023-069,q-scmsp2022-042}
- Preservar útero sem gestar: **embolização**. {q-adap22-029}
- Prole completa e falha: **histerectomia**. {q-uspsp3-063,q-einstein2023-051,q-unifesp2024-044,q-unicampdis2025-088}
- Sem morcelamento livre: **sarcoma**. {q-einstein2026-058}` },
        { id: "tra-gestacao", titulo: "Mioma na gestação e complicação da histeroscopia", conferir: true, diretrizes: ["acog-mioma"],
          questoes: ["q-didepm-078","q-unifesp2022-029"],
          prosa: `[[Dor localizada sobre o mioma no segundo trimestre, febre baixa e leucocitose discreta, com feto bem: **degeneração rubra** (o mioma cresce mais que o seu suprimento e infarta). Tratamento conservador: repouso, hidratação, analgesia, AINE por curto período; não se opera.|q-didepm-078]] [[Perfuração do útero na histeroscopia diagnóstica com instrumento fino e sem energia: **observação por algumas horas** e alta se estável, com sinais de alarme.|q-unifesp2022-029]]`,
          texto: `- Dor sobre o mioma na gestação: **degeneração rubra**, conservador. {q-didepm-078}
- Perfuração na histeroscopia diagnóstica: **observar**. {q-unifesp2022-029}` },
      ],
    },
    {
      id: "adenomiose", titulo: "Adenomiose",
      introducao: `[[Adenomiose é endométrio dentro do miométrio: glândulas e estroma que invadem a zona juncional (ou nascem de restos müllerianos), sangram a cada ciclo e provocam hipertrofia do músculo em volta. O útero fica globoso, amolecido e doloroso; o quadro típico é a multípara acima dos 40 com dismenorreia progressiva e fluxo aumentado.|q-sirio2024-071,q-unifesp2023-041,q-sessp2023-043]]`,
      fragmentos: [
        { id: "ade-diagnostico", titulo: "Diagnóstico e tratamento", conferir: true, diretrizes: ["figo-palm-coein"],
          questoes: ["q-sirio2024-071","q-sessp2023-043","q-unifesp2023-041"],
          prosa: `[[A ultrassonografia faz a hipótese: miométrio assimétrico, **zona juncional irregular**, pequenos cistos e estrias; a ressonância confirma. Pode vir de invaginação do endométrio ou de **metaplasia de resquícios müllerianos**.|q-sirio2024-071,q-sessp2023-043]] [[O tratamento clínico (DIU-LNG, progestagênio, AINE) vem primeiro; com prole completa e sintoma que limita a vida, a **histerectomia** é o tratamento definitivo.|q-unifesp2023-041]]`,
          texto: `- Zona juncional irregular, cistos miometriais: **adenomiose**. {q-sirio2024-071,q-sessp2023-043}
- Definitivo: **histerectomia**. {q-unifesp2023-041}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["acog-mioma","ms-mec-oms"],
          questoes: ["q-adap25-070","q-unifesp2025-070","q-unifesp2023-041","q-uspsp3-063","q-fmabc2026-071"],
          prosa: `[[**DIU-LNG e cavidade**: indicado quando a cavidade é normal (adap25-070); com nódulo que distorce o eco endometrial, a unifesp2025-070 escolheu o **injetável mensal combinado**.|q-adap25-070,q-unifesp2025-070]] [[**Adenomiose**: a regra começa pelo tratamento clínico; a unifesp2023-041, com 44 anos, prole completa e dispareunia, foi direto à **histerectomia subtotal**.|q-unifesp2023-041]] [[**Histeroscopia com miomas pequenos**: endométrio distorcido por vários intramurais num útero de 540 cm³ não se resolve por cavidade; a uspsp3-063 escolheu **histerectomia** e não miomectomia histeroscópica.|q-uspsp3-063]] [[**Intramural sintomático**: a fmabc2026-071 pediu tratamento **medicamentoso** antes de qualquer cirurgia.|q-fmabc2026-071]]`,
          texto: `- Cavidade distorcida: **injetável**, não DIU. {q-adap25-070,q-unifesp2025-070}
- Adenomiose: a prova foi à **histerectomia subtotal**. {q-unifesp2023-041}
- Útero muito grande: **histerectomia**. {q-uspsp3-063}
- Intramural: **clínico** primeiro. {q-fmabc2026-071}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: conduta pelo tipo e pelo desejo",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-conduta", titulo: "Tipo, desejo e via", conferir: true,
          questoes: ["q-adap22-028","q-adap23-041","q-einstein2027-058","q-adap22-029","q-einstein2023-051"],
          prosa: `[[A conduta nasce do cruzamento entre sintoma, tipo e desejo reprodutivo.|q-adap22-028,q-adap23-041,q-einstein2027-058,q-adap22-029,q-einstein2023-051]]

| | Assintomático | Submucoso (0–2) | Intramural/subseroso sintomático | Prole completa, falha clínica |
| Quer gestar | observar | histeroscopia | miomectomia laparoscópica | — |
| Não quer gestar | observar | histeroscopia ou DIU-LNG se cavidade permite | clínico; embolização se quer manter útero | histerectomia |
| Primeiro passo | nenhum | histerossonografia/histeroscopia | AINE, DIU-LNG, hormônio | — |`,
          texto: `- Assintomático: **observar**. {q-adap22-028}
- Submucoso: **histeroscopia**. {q-adap23-041}
- Intramural com desejo: **laparoscopia**. {q-einstein2027-058}
- Manter útero: **embolização**. {q-adap22-029}
- Prole completa: **histerectomia**. {q-einstein2023-051}` },
      ],
    },
  ],
});
