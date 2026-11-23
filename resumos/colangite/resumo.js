/* resumos/colangite/resumo.js — resumo adaptativo de colangite e doenças da via biliar principal
   (ass-colangite): icterícia obstrutiva, coledocolitíase (risco, exames, CPRE, colangiografia
   intraoperatória, Y de Roux, gestante), colangite (Charcot, Reynolds, Tóquio 2018, drenagem), tumores
   (Klatskin, periampular, Courvoisier, vesícula), cisto de colédoco, complicações (CPRE, dreno de Kehr,
   coleperitônio, íleo biliar), anatomia; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- colangite */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "colangite",
  titulo: "Colangite, coledocolitíase e icterícia obstrutiva",
  assunto: "ass-colangite",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "tokyo-2018", texto: "Tokyo Guidelines 2018 — diagnostic criteria and severity grading of acute cholangitis; flowchart for management (J Hepatobiliary Pancreat Sci 2018)", lidoEm: null },
    { id: "asge-2019", texto: "ASGE guideline on the role of endoscopy in the evaluation and management of choledocholithiasis (Gastrointest Endosc 2019)", lidoEm: null },
    { id: "nccn-biliar", texto: "NCCN Guidelines — Biliary Tract Cancers (versão vigente)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-sirio2027-023"] },
  ],
  doencas: [
    {
      id: "obstrucao", titulo: "Icterícia obstrutiva e coledocolitíase",
      introducao: `[[Quando a bile não desce, a bilirrubina já conjugada volta ao sangue: **icterícia com colúria, acolia e prurido**, com fosfatase alcalina e GGT altas (as enzimas do canalículo). É falha da **excreção da fração conjugada**. A pergunta seguinte é onde e por quê: o ultrassom mostra se a via está dilatada e até onde.|q-usprp2022-079,q-amrigs2020-033,q-unicampdis2024-023]]

Veja também: **Colelitíase e colecistite**, **Pancreatite aguda**, **Câncer de pâncreas** e **Sepse** quando houver resumo.`,
      fragmentos: [
        { id: "obs-diagnostico", titulo: "Investigar a via biliar", conferir: true, diretrizes: ["asge-2019"],
          figuras: [{ arquivo: "figuras/via-biliar.svg", legenda: "Esquema autoral: onde a obstrução está, o que o ultrassom mostra e qual exame ou procedimento usar." }],
          casos: ["q-iamspe2022-020","q-unesp2024-063","q-uspsp1-048","q-sirio2022-028"],
          questoes: ["q-usprp2022-079","q-amrigs2020-033","q-unicampdis2024-023","q-scmsp2025-037","q-usp2026-043","q-iamspe2025-024","q-didepm-042","q-usp2025-025","q-iamspe2022-020","q-unesp2024-063","q-amrigs2022-028","q-uspsp1-048","q-sirio2022-028","q-sirio2027-035","q-einstein2023-026"],
          prosa: `[[Primeiro exame: **ultrassonografia de abdome** — cálculos na vesícula e colédoco dilatado (> 6 mm) sem fator obstrutivo visível falam de coledocolitíase. Cólica com icterícia, transaminases e canaliculares altas, sem febre: **coledocolitíase** sem colangite.|q-unicampdis2024-023,q-scmsp2025-037,q-usp2026-043]] [[Risco **intermediário** (colédoco dilatado ou exames alterados, sem cálculo visto): **colangiorressonância ou ecoendoscopia**, que confirmam sem o risco da CPRE. Risco **alto** (cálculo visto, colangite, bilirrubina alta com colédoco dilatado): direto à **CPRE**, que diagnostica e trata.|q-iamspe2025-024,q-didepm-042,q-usp2025-025,q-amrigs2020-033,q-iamspe2022-020]] [[Durante a colecistectomia, enzimas alteradas ou anatomia difícil pedem **colangiografia intraoperatória**; ela mostra falha de enchimento (cálculo) ou um exame normal com contraste passando ao duodeno. Linfonodos do hilo são o grupo 12.|q-sirio2027-035,q-einstein2023-026,q-uspsp1-048,q-sirio2022-028,q-unesp2024-063,q-amrigs2022-028]]`,
          texto: `- Colúria, acolia, prurido: **excreção da conjugada**; USG primeiro. {q-usprp2022-079,q-unicampdis2024-023,q-scmsp2025-037,q-usp2026-043}
- Risco intermediário: **colangiorressonância/eco**; alto: **CPRE**. {q-iamspe2025-024,q-didepm-042,q-usp2025-025,q-amrigs2020-033,q-iamspe2022-020}
- Intraoperatório: **colangiografia**. {q-sirio2027-035,q-einstein2023-026,q-uspsp1-048,q-sirio2022-028}` },
        { id: "obs-situacoes", titulo: "Situações especiais e complicações", conferir: true, diretrizes: ["asge-2019"],
          casos: ["q-uspsp4-060","q-sirio2025-039","q-scmsp2026-023"],
          questoes: ["q-usp2026-036","q-sirio2022-030","q-uspsp4-060","q-sirio2023-039","q-sirio2025-039","q-scmsp2026-023","q-fmabc2023-037"],
          prosa: `[[Depois de **Y de Roux** a papila não é alcançada pelo endoscópio comum: **colecistectomia com exploração cirúrgica do colédoco**. Gestante com CPRE que falhou: depois do parto, colecistectomia com exploração da via biliar por laparoscopia.|q-usp2026-036,q-sirio2022-030]] [[A CPRE pode causar pancreatite, sangramento e **perfuração duodenal** (ar no retroperitônio após papilotomia ampla). Dreno de Kehr com débito de 300 mL/dia no 2.º pós-operatório, paciente bem: **observar**. Dor e bilirrubina altas após colecistectomia com líquido livre: **coleperitônio**, laparoscopia.|q-uspsp4-060,q-sirio2023-039,q-sirio2025-039]] [[Idosa com colelitíase e obstrução intestinal, com ar na via biliar e cálculo no intestino: **íleo biliar** (fístula colecistoentérica). Cólica biliar com bilirrubina normal e pancreatites repetidas: **disfunção do esfíncter de Oddi**.|q-scmsp2026-023,q-fmabc2023-037]]`,
          texto: `- Y de Roux: **exploração cirúrgica** do colédoco. {q-usp2026-036,q-sirio2022-030}
- Após CPRE: **perfuração duodenal**; Kehr 300 mL: observar; coleperitônio. {q-uspsp4-060,q-sirio2023-039,q-sirio2025-039}
- **Íleo biliar**; disfunção do Oddi. {q-scmsp2026-023,q-fmabc2023-037}` },
      ],
    },
    {
      id: "colangite", titulo: "Colangite aguda",
      introducao: `[[Bile parada se infecta (bactérias do intestino sobem), e a pressão alta dentro da via biliar empurra bactérias e toxinas para o sangue: por isso a colangite vira sepse rápido, e por isso o tratamento é **drenar**, não só dar antibiótico.|q-sessp2023-011,q-sessp2023-012,q-tp20212-067]]`,
      fragmentos: [
        { id: "col-tokyo", titulo: "Charcot, Reynolds e Tóquio 2018", conferir: true, diretrizes: ["tokyo-2018"],
          casos: ["q-tp20212-067","q-uspsp1-027"],
          questoes: ["q-sessp2023-011","q-unicampdis2022-016","q-sessp2023-012","q-tp20212-067","q-adap24-004","q-unifesp2024-007","q-famerp2024-017","q-einstein2027-030","q-uspsp1-027"],
          prosa: `[[**Tríade de Charcot**: febre, icterícia e dor no hipocôndrio direito. **Pêntade de Reynolds**: mais hipotensão e confusão — colangite supurativa.|q-sessp2023-011,q-unicampdis2022-016,q-sessp2023-012,q-tp20212-067]] [[Tóquio 2018 gradua: **III (grave)** = disfunção de algum órgão (hipotensão com vasopressor, confusão, PaO2/FiO2 < 300, creatinina > 2, INR > 1,5, **plaquetas < 100 mil**); **II (moderada)** = dois de leucócitos > 12 mil ou < 4 mil, febre ≥ 39 °C, idade ≥ 75, bilirrubina ≥ 5, albumina baixa; **I** = o restante.|q-adap24-004,q-unifesp2024-007,q-famerp2024-017,q-einstein2027-030]] [[Antibiótico para todos; drenagem **urgente no grau III** após estabilizar, **precoce no II** (até 72 h), e eletiva no I se não melhora. A via é a **CPRE**; quando não é possível ou a obstrução é alta, **drenagem percutânea trans-hepática**.|q-tp20212-067,q-einstein2027-030,q-famerp2024-017,q-uspsp1-027]]`,
          texto: `- **Charcot**: febre, icterícia, dor; **Reynolds**: + choque e confusão. {q-sessp2023-011,q-unicampdis2022-016,q-sessp2023-012,q-tp20212-067}
- Tóquio III: **disfunção orgânica** (plaquetas < 100 mil, confusão). {q-adap24-004}
- Tóquio II: leucócitos, febre ≥ 39, idade, bilirrubina. {q-unifesp2024-007,q-famerp2024-017,q-einstein2027-030}
- **Drenar**: CPRE; percutânea se não dá. {q-tp20212-067,q-uspsp1-027}` },
      ],
    },
    {
      id: "tumores", titulo: "Tumores e cisto de colédoco",
      introducao: `[[Icterícia **indolor e progressiva** num idoso, com emagrecimento, é tumor até prova em contrário. O nível da obstrução dá o nome: no hilo, Klatskin (vesícula murcha, só vias intra-hepáticas dilatadas); na região periampular, a vesícula distende e fica palpável.|q-scmsp2026-040,q-einstein2025-026,q-amrigs2023-028,q-usp2024-027]]`,
      fragmentos: [
        { id: "tum-nivel", titulo: "Klatskin, periampular e vesícula", conferir: true, diretrizes: ["nccn-biliar"],
          casos: ["q-scmsp2026-040"],
          questoes: ["q-scmsp2026-040","q-einstein2025-026","q-uspsp3-109","q-amrigs2023-028","q-usp2024-027","q-gdhepatoesplenomegalias-001","q-gdhepatoesplenomegalias-041","q-uspsp2-090","q-fmabc2025-025"],
          prosa: `[[Vias **intra-hepáticas dilatadas com vesícula murcha e colédoco normal**: obstrução no hilo — **tumor de Klatskin** (colangiocarcinoma hilar); massa no hilo com icterícia é drenada por via **trans-hepática**.|q-scmsp2026-040,q-einstein2025-026,q-uspsp3-109]] [[**Sinal de Courvoisier**: vesícula palpável e indolor num ictérico sugere tumor **periampular** (cabeça do pâncreas, papila, colédoco distal): a obstrução é lenta e baixa, e a vesícula sem inflamação crônica distende.|q-amrigs2023-028,q-usp2024-027]] [[Fatores de risco do colangiocarcinoma: colangite esclerosante, cisto de colédoco, litíase intra-hepática, parasitas hepáticos; o portador de Salmonella typhi associa-se ao câncer de **vesícula**. O câncer de vesícula tem prognóstico ruim, e o achado incidental é minoria.|q-gdhepatoesplenomegalias-001,q-gdhepatoesplenomegalias-041]] [[O **cisto de colédoco** (Todani I fusiforme, II divertículo, III coledococele intraduodenal, IV múltiplos, V Caroli) se reseca porque **degenera em colangiocarcinoma**.|q-uspsp2-090,q-fmabc2025-025]]`,
          texto: `- Intra-hepáticas dilatadas, vesícula murcha: **Klatskin**. {q-scmsp2026-040,q-einstein2025-026,q-uspsp3-109}
- **Courvoisier**: periampular. {q-amrigs2023-028,q-usp2024-027}
- Cisto de colédoco → **colangiocarcinoma**. {q-uspsp2-090,q-fmabc2025-025}
- Fatores de risco e vesícula. {q-gdhepatoesplenomegalias-001,q-gdhepatoesplenomegalias-041}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["tokyo-2018"],
          questoes: ["q-uspsp1-027","q-fmabc2025-025","q-gdhepatoesplenomegalias-001","q-usp2025-025"],
          prosa: `[[**Drenagem na colangite grave**: a CPRE é a primeira escolha; a uspsp1-027, com imagem e paciente grave, respondeu **drenagem trans-hepática interno-externa**.|q-uspsp1-027]] [[**Todani III**: é a coledococele, dilatação do colédoco distal **dentro do duodeno**; a fmabc2025-025 descreveu como dilatação da parte intrapancreática.|q-fmabc2025-025]] [[**Salmonella typhi**: risco de câncer de vesícula; a prova marcou como **incorreto** listá-lo para colangiocarcinoma.|q-gdhepatoesplenomegalias-001]] [[**Colédoco de 1,1 cm sem cálculo visível**: a usp2025-025 foi direto à **CPRE** (risco alto pela dilatação e exames).|q-usp2025-025]]`,
          texto: `- Grave: a prova deu **trans-hepática**. {q-uspsp1-027}
- Todani III: redação da prova. {q-fmabc2025-025}
- S. typhi = **vesícula**. {q-gdhepatoesplenomegalias-001}
- Colédoco 1,1 cm: **CPRE**. {q-usp2025-025}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: nível da obstrução",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-nivel", titulo: "Onde está e o que fazer", conferir: true,
          questoes: ["q-usp2026-043","q-tp20212-067","q-einstein2025-026","q-usp2024-027"],
          prosa: `[[O ultrassom e o quadro definem o nível.|q-usp2026-043,q-tp20212-067,q-einstein2025-026,q-usp2024-027]]

| | Coledocolitíase | Colangite | Klatskin | Periampular |
| Dor | cólica | sim + febre | indolor | indolor |
| USG | colédoco dilatado, cálculo | idem | intra-hepáticas dilatadas, vesícula murcha | tudo dilatado, vesícula distendida |
| Sinal | icterícia flutuante | Charcot / Reynolds | perda de peso | Courvoisier |
| Conduta | CPRE ou colangiorressonância | antibiótico + drenagem | drenagem trans-hepática, ressecção | estadiar, Whipple |`,
          texto: `- Cálculo: **CPRE**. {q-usp2026-043}
- Colangite: **drenar**. {q-tp20212-067}
- Hilo: **Klatskin**. {q-einstein2025-026}
- Vesícula palpável: **periampular**. {q-usp2024-027}` },
      ],
    },
  ],
});
