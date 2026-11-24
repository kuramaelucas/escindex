/* resumos/cancer-gastrico/resumo.js — resumo adaptativo de câncer gástrico e tumores do estômago e
   esôfago (ass-cagastrico): carcinogênese (H. pylori/CagA, fatores de risco, CDH1), Lauren, precoce ×
   avançado, estadiamento (laparoscopia), tratamento (endoscópico, gastrectomia D2, perioperatório,
   HER2), complicações (obstrução, perfuração, fístula de coto, dumping, carcinomatose), GIST, linfoma,
   pólipos, câncer de esôfago; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- cancer-gastrico */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "cancer-gastrico",
  titulo: "Câncer gástrico e tumores do estômago e do esôfago",
  assunto: "ass-cagastrico",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "nccn-gastrico", texto: "NCCN Guidelines — Gastric Cancer e Esophageal and Esophagogastric Junction Cancers (versões vigentes); JGCA 2021 (diretriz japonesa)", lidoEm: null },
    { id: "esmo-gist", texto: "ESMO–EURACAN–GENTURIS — Gastrointestinal stromal tumours: clinical practice guidelines (2022)", lidoEm: null },
    { id: "maastricht", texto: "Maastricht VI/Florence consensus report on Helicobacter pylori (Gut 2022)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "biologia", titulo: "Como nasce o câncer gástrico",
      introducao: `[[O **H. pylori** injeta a proteína **CagA** na célula gástrica, que altera a sinalização, estimula proliferação e gera instabilidade genômica. A inflamação crônica segue a cascata de Correa: gastrite, atrofia, metaplasia intestinal, displasia, **adenocarcinoma do tipo intestinal**. Sal, defumados, nitratos, tabaco e baixo nível socioeconômico somam; o tipo **difuso** tem forte componente genético (**CDH1**, E-caderina).|q-tp20251-034,q-tp20261-012,q-einstein2023-075,q-amrigs2023-023,q-famema2022-070]]

Veja também: **Doença péptica**, **DRGE e esôfago**, **Hemorragia digestiva** e **Marcadores tumorais** quando houver resumo.`,
      fragmentos: [
        { id: "bio-risco", titulo: "Fatores de risco e tipos de Lauren", conferir: true, diretrizes: ["maastricht","nccn-gastrico"],
          figuras: [{ arquivo: "figuras/correa-lauren.svg", legenda: "Esquema autoral: a cascata de Correa até o tipo intestinal e o tipo difuso, com as diferenças entre eles." }],
          questoes: ["q-tp20251-034","q-tp20261-012","q-einstein2023-075","q-amrigs2023-023","q-famema2022-070","q-fmabc2023-030","q-fmabc2023-031","q-unesp2021-064","q-iamspe2022-024","q-iamspe2022-025"],
          prosa: `[[O fator de risco mais importante é a **infecção pelo H. pylori**; o diabetes **não** é fator de risco.|q-einstein2023-075,q-amrigs2023-023,q-tp20251-034,q-tp20261-012]] [[**Lauren**: o **intestinal** forma glândulas, vem da cascata, é mais distal e de homens mais velhos; o **difuso** tem **células em anel de sinete** isoladas que infiltram a parede (linite plástica), atinge jovens e mulheres, é mais agressivo, e o hereditário vem do **CDH1**.|q-fmabc2023-031,q-famema2022-070]] [[**Câncer precoce** é o que não passa da **submucosa**, independentemente dos linfonodos. Os marcadores CEA, CA 19-9 e CA 72-4 servem ao seguimento, não ao diagnóstico.|q-unesp2021-064,q-iamspe2022-024,q-iamspe2022-025]] [[Fatores de dieta: sal e alimentos conservados; a prova aceitou "baixo consumo de gorduras ou proteínas" como fator.|q-fmabc2023-030]]`,
          texto: `- **H. pylori/CagA** → cascata de Correa → intestinal. {q-tp20251-034,q-tp20261-012,q-einstein2023-075,q-amrigs2023-023}
- Difuso: **anel de sinete**, jovem, **CDH1**. {q-fmabc2023-031,q-famema2022-070}
- Precoce: até a **submucosa**. {q-unesp2021-064}
- Marcadores: seguimento. {q-iamspe2022-024,q-iamspe2022-025}` },
      ],
    },
    {
      id: "manejo", titulo: "Diagnóstico, estadiamento e tratamento",
      introducao: `[[Dispepsia com sinal de alarme (perda de peso, anemia, vômitos, idade) vai para **endoscopia com biópsia**. Depois: tomografia de tórax, abdome e pelve; nos localmente avançados, **laparoscopia com lavado** procura metástase peritoneal que a tomografia não vê.|q-scmsp2023-038,q-uspsp2-093,q-uspsp5-066]]`,
      fragmentos: [
        { id: "man-estadio", titulo: "Estadiar e tratar", conferir: true, diretrizes: ["nccn-gastrico"],
          casos: ["q-uspsp5-066","q-sirio2024-032"],
          questoes: ["q-scmsp2023-038","q-uspsp2-093","q-uspsp5-066","q-adap23-082","q-fmabc2021-008","q-uspsp1-045","q-didepm-022","q-sirio2024-032","q-famema2023-064","q-unicampdis2024-018"],
          prosa: `[[Tumor T3 ou com linfonodos: **laparoscopia diagnóstica com lavado citológico** antes de operar.|q-uspsp2-093,q-uspsp5-066]] [[Adenocarcinoma intestinal bem diferenciado **restrito à mucosa**, sem linfonodo: **dissecção endoscópica da submucosa**.|q-adap23-082]] [[Distal sem linfonodos ou metástase: **gastrectomia subtotal com linfadenectomia D2**. Localmente avançado (T2 ou mais, ou linfonodo suspeito): **quimioterapia perioperatória (FLOT) e gastrectomia D2** — total quando o tumor é proximal ou difuso. Os linfonodos 4sa são os dos vasos gástricos curtos.|q-fmabc2021-008,q-uspsp1-045,q-didepm-022,q-famema2023-064]] [[No avançado, pesquisar **HER2**, que indica trastuzumabe. **Nódulo umbilical** (irmã Maria José) é carcinomatose peritoneal.|q-sirio2024-032,q-unicampdis2024-018]]`,
          texto: `- Endoscopia com biópsia; avançado: **laparoscopia com lavado**. {q-scmsp2023-038,q-uspsp2-093,q-uspsp5-066}
- Só mucosa: **dissecção endoscópica**. {q-adap23-082}
- **D2**; avançado: **quimio perioperatória**. {q-fmabc2021-008,q-uspsp1-045,q-didepm-022,q-famema2023-064}
- **HER2**; nódulo umbilical = carcinomatose. {q-sirio2024-032,q-unicampdis2024-018}` },
        { id: "man-complicacoes", titulo: "Obstrução, perfuração e pós-operatório", conferir: true, diretrizes: ["nccn-gastrico"],
          casos: ["q-sirio2022-032","q-sirio2024-035","q-usp2023-117"],
          questoes: ["q-unifesp2023-082","q-sirio2022-032","q-usp2023-117","q-sirio2024-035","q-unesp2022-075","q-iamspe2026-024","q-sirio2021-040"],
          prosa: `[[Tumor de antro que fecha o piloro: **síndrome de mau esvaziamento**, vômitos, massa e peristaltismo visível; perder suco gástrico causa **alcalose metabólica hipoclorêmica com hipocalemia**. Nutrir com sonda posicionada **além da estenose**.|q-unifesp2023-082,q-sirio2022-032,q-usp2023-117]] [[O tumor pode perfurar e se apresentar como abdome agudo com anemia.|q-sirio2024-035]] [[Fístula do coto duodenal drenada, paciente estável: **conservador com dieta enteral** além da fístula.|q-unesp2022-075]] [[**Dumping precoce**: alimento hiperosmolar no delgado puxa água — náusea, distensão e sintomas vasomotores logo após comer. **Tardio**: a glicose absorvida de golpe provoca pico de insulina e **hipoglicemia** horas depois.|q-iamspe2026-024]] [[Obstrução por carcinomatose sem indicação cirúrgica: antieméticos, **corticoide**, escopolamina, haloperidol.|q-sirio2021-040]]`,
          texto: `- Mau esvaziamento: **alcalose hipoclorêmica, hipocalemia**; sonda além da estenose. {q-unifesp2023-082,q-sirio2022-032,q-usp2023-117}
- Perfuração. {q-sirio2024-035}
- Fístula do coto drenada: **conservador**. {q-unesp2022-075}
- Dumping tardio: **hipoglicemia**. {q-iamspe2026-024}
- Carcinomatose: **corticoide**, antieméticos. {q-sirio2021-040}` },
      ],
    },
    {
      id: "outros", titulo: "GIST, linfoma, pólipos e esôfago",
      introducao: `[[Nem toda massa gástrica é adenocarcinoma. Lesão **subepitelial** (coberta por mucosa normal) vem da parede: GIST, leiomioma, linfoma. E o esôfago tem dois cânceres com causas diferentes.|q-einstein2025-027,q-famerp2025-072]]`,
      fragmentos: [
        { id: "out-gist", titulo: "GIST, linfoma e pólipos", conferir: true, diretrizes: ["esmo-gist"],
          casos: ["q-usp2023-011","q-uspsp5-065"],
          questoes: ["q-usp2023-011","q-einstein2025-027","q-famerp2025-072","q-uspsp5-065","q-famema2023-073","q-uspsp2-094"],
          prosa: `[[**GIST**: tumor das células de Cajal, submucoso, com **úlcera umbilicada** que sangra; a biópsia superficial pode ser falso-negativa. Fusocelular, **CD117 (c-KIT) positivo**. Tratamento: **ressecção** com margem (sem linfadenectomia, porque não dá metástase linfática), imatinibe nos de alto risco.|q-usp2023-011,q-einstein2025-027,q-famerp2025-072,q-uspsp5-065]] [[O linfoma gástrico mais comum é o **difuso de grandes células B** (o MALT é o ligado ao H. pylori).|q-famema2023-073]] [[**Pólipos de glândulas fúndicas** múltiplos e pequenos em usuário de IBP: biopsiar um representativo e vigiar.|q-uspsp2-094]]`,
          texto: `- GIST: **CD117**, subepitelial, **ressecar** sem linfadenectomia. {q-usp2023-011,q-einstein2025-027,q-famerp2025-072,q-uspsp5-065}
- Linfoma: **difuso de grandes células B**. {q-famema2023-073}
- Pólipos fúndicos com IBP: biopsiar e vigiar. {q-uspsp2-094}` },
        { id: "out-esofago", titulo: "Câncer de esôfago", conferir: true, diretrizes: ["nccn-gastrico"],
          casos: ["q-tp20252-026","q-tp20261-081"],
          questoes: ["q-uspsp2-085","q-uspsp4-065","q-tp20252-026","q-tp20261-081","q-famema2025-026","q-unicampdis2022-022"],
          prosa: `[[Terço médio, homem tabagista e etilista: **carcinoma escamoso**. Terço distal e transição esofagogástrica, com refluxo e Barrett: **adenocarcinoma**, estadiado com tomografia de pescoço a pelve.|q-uspsp2-085,q-uspsp4-065]] [[Disfagia progressiva com perda de peso e falha de enchimento no contraste: **endoscopia com biópsia**. O principal fator prognóstico é a **profundidade de invasão** (T).|q-tp20252-026,q-tp20261-081,q-famema2025-026]] [[Tosse ao beber e com a saliva num tumor do esôfago médio: **fístula traqueoesofágica**.|q-unicampdis2022-022]]`,
          texto: `- Médio, fumo e álcool: **escamoso**; distal, Barrett: **adenocarcinoma**. {q-uspsp2-085,q-uspsp4-065}
- Disfagia: **biópsia**; prognóstico pela **profundidade**. {q-tp20252-026,q-tp20261-081,q-famema2025-026}
- Tosse ao beber: **fístula traqueoesofágica**. {q-unicampdis2022-022}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["nccn-gastrico"],
          questoes: ["q-fmabc2023-030","q-iamspe2022-025","q-sirio2024-032","q-fmabc2021-008"],
          prosa: `[[**Dieta e câncer gástrico**: o risco vem do sal, dos defumados e da falta de frutas e vegetais; a fmabc2023-030 marcou como fator de risco o **baixo consumo de gorduras ou proteínas**.|q-fmabc2023-030]] [[**Marcadores do fígado**: o do hepatocarcinoma é a alfafetoproteína; a iamspe2022-025 associou o fígado a **CEA e alfafetoproteína**.|q-iamspe2022-025]] [[**HER2 no diagnóstico**: o HER2 orienta a terapia da doença avançada; a sirio2024-032 pediu **pesquisar HER2** como o procedimento mais adequado.|q-sirio2024-032]] [[**Antro T sem linfonodo**: a regra atual dá quimioterapia perioperatória a partir de T2; a fmabc2021-008, sem estadiamento T, respondeu **gastrectomia subtotal D2**.|q-fmabc2021-008]]`,
          texto: `- A prova: **pouca gordura/proteína** como risco. {q-fmabc2023-030}
- Fígado: **CEA e AFP** na prova. {q-iamspe2022-025}
- **HER2**. {q-sirio2024-032}
- **Subtotal D2** direto. {q-fmabc2021-008}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: tumores do estômago",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-tumores", titulo: "Adenocarcinoma, GIST e linfoma", conferir: true,
          questoes: ["q-fmabc2023-031","q-uspsp5-065","q-famema2023-073","q-didepm-022"],
          prosa: `[[A origem do tumor muda o tratamento.|q-fmabc2023-031,q-uspsp5-065,q-famema2023-073,q-didepm-022]]

| | Adenocarcinoma | GIST | Linfoma |
|---|---|---|---|
| Origem | epitélio | células de Cajal | tecido linfoide |
| Endoscopia | úlcera ou massa mucosa | submucoso, umbilicado | infiltrativo, úlceras |
| Marcador | Lauren, HER2 | CD117 (c-KIT) | CD20; H. pylori no MALT |
| Tratamento | gastrectomia D2 ± quimio perioperatória | ressecção sem linfadenectomia; imatinibe | quimio (DGCB); erradicar H. pylori (MALT) |`,
          texto: `- Adenocarcinoma: **D2 ± quimio**. {q-fmabc2023-031,q-didepm-022}
- GIST: **CD117**. {q-uspsp5-065}
- Linfoma: **DGCB**. {q-famema2023-073}` },
      ],
    },
  ],
});
