/* resumos/ortopedia-pediatrica/resumo.js — resumo adaptativo de ortopedia pediátrica
   (ass-orto-pediatrica): displasia do desenvolvimento do quadril (Ortolani, Barlow, fatores de risco,
   ultrassom, Pavlik, necrose), sinovite transitória, Legg-Calvé-Perthes, epifisiólise, escoliose,
   dor lombar noturna, torcicolo congênito, dor do crescimento, pé plano e geno valgo fisiológicos,
   pronação dolorosa, contratura de Volkmann e osteogênese imperfeita; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- ortopedia-pediatrica */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "ortopedia-pediatrica",
  titulo: "Ortopedia pediátrica",
  assunto: "ass-orto-pediatrica",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "aap-ddq", texto: "AAP — Evaluation and Referral for Developmental Dysplasia of the Hip in Infants (2016); SBP/SBOP — displasia do quadril", lidoEm: null },
    { id: "srs-escoliose", texto: "SRS/SOSORT — escoliose idiopática do adolescente (2016)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "ddq", titulo: "Displasia do desenvolvimento do quadril",
      introducao: `[[O acetábulo só se aprofunda se a cabeça do fêmur estiver dentro dele. Quando, no útero, o quadril fica comprimido em flexão e adução (**apresentação pélvica**, primeira gestação, oligodrâmnio) ou quando os ligamentos estão frouxos (hormônios maternos, mais no **sexo feminino**), a cabeça escapa e o acetábulo fica raso: **displasia do desenvolvimento do quadril**.|q-einstein2024-032,q-tp20241-042,q-adap21-093]]

Veja também: **Fraturas e luxações**, **Artrites**, **Puericultura** e **Crescimento e puberdade**.`,
      fragmentos: [
        { id: "ddq-exame", titulo: "Ortolani, Barlow e ultrassom", conferir: true, diretrizes: ["aap-ddq"],
          questoes: ["q-unesp2024-017","q-einstein2024-032","q-tp20241-042","q-tp20232-036"],
          prosa: `[[No recém-nascido, o **Barlow** (adução e pressão posterior) **luxa** um quadril instável; o **Ortolani** (abdução) **reduz** o quadril luxado com um "clunk".|q-unesp2024-017]] [[Fatores de risco: **pélvica**, **sexo feminino**, **história familiar**, primeira gestação, oligodrâmnio e deformidades de compressão (**pé metatarso aduto**, torcicolo). **Polidrâmnio não** é fator.|q-einstein2024-032,q-tp20241-042]] [[Depois do primeiro mês, as manobras perdem valor; aparecem **limitação da abdução**, assimetria de pregas e **Galeazzi** positivo (joelho mais baixo). Até 4 a 6 meses, o exame de imagem é o **ultrassom do quadril** (a cabeça ainda é cartilagem); depois, radiografia.|q-tp20241-042,q-tp20232-036]]`,
          texto: `- **Barlow luxa, Ortolani reduz**. {q-unesp2024-017}
- Risco: pélvica, menina, família, metatarso aduto; **não** polidrâmnio. {q-einstein2024-032,q-tp20241-042}
- Até 4–6 meses: **ultrassom**; abdução limitada, Galeazzi. {q-tp20241-042,q-tp20232-036}` },
        { id: "ddq-tratamento", titulo: "Pavlik e necrose", conferir: true, diretrizes: ["aap-ddq"],
          questoes: ["q-adap21-093","q-tp20232-036"],
          prosa: `[[Ortolani positivo no recém-nascido: **suspensório de Pavlik** em tempo integral, que mantém o quadril fletido e abduzido, a cabeça dentro do acetábulo, com controle por ultrassom. Quanto mais cedo, melhor; gesso e cirurgia ficam para falha ou diagnóstico tardio.|q-adap21-093]] [[A complicação mais temida (da doença e do tratamento com abdução forçada) é a **necrose avascular da cabeça do fêmur**.|q-tp20232-036]]`,
          texto: `- RN com Ortolani +: **Pavlik** e ultrassom. {q-adap21-093}
- Complicação: **necrose avascular**. {q-tp20232-036}` },
      ],
    },
    {
      id: "claudicacao", titulo: "A criança que manca",
      introducao: `[[Criança que manca com dor no quadril (ou no joelho, para onde a dor do quadril se irradia pelo nervo obturador) tem diagnósticos diferentes conforme a idade: **sinovite transitória** no pré-escolar após uma virose, **Perthes** no menino de 4 a 8 anos com claudicação de meses, **epifisiólise** no adolescente. Febre, mal-estar e dor intensa apontam para **artrite séptica**, que é urgência.|q-einstein2025-041,q-tp20212-042,q-scmsp2021-057]]`,
      fragmentos: [
        { id: "cla-sinovite", titulo: "Sinovite transitória", conferir: true,
          questoes: ["q-scmsp2023-060","q-einstein2022-032","q-einstein2025-041","q-unicampdis2023-036"],
          prosa: `[[Entre **3 e 8 anos** (pico aos 6), uma ou duas semanas depois de uma **infecção de vias aéreas**, a criança manca ou recusa andar, **sem febre** e em bom estado. É a causa mais comum de quadril doloroso na infância; é diagnóstico de exclusão da artrite séptica.|q-scmsp2023-060,q-unicampdis2023-036,q-einstein2025-041]] [[O **ultrassom** mostra **derrame** (espaço articular alargado). O tratamento é **repouso e sintomáticos**; melhora em dias.|q-einstein2022-032,q-einstein2025-041]]`,
          texto: `- 3–8 anos, após virose, sem febre: **sinovite transitória**. {q-scmsp2023-060,q-unicampdis2023-036,q-einstein2025-041}
- US com derrame; **sintomáticos**. {q-einstein2022-032,q-einstein2025-041}` },
        { id: "cla-perthes", titulo: "Legg-Calvé-Perthes", conferir: true,
          figuras: [{ arquivo: "figuras/quadril-por-idade.svg", legenda: "Esquema autoral: doenças do quadril da criança conforme a idade." }],
          casos: ["q-tp20202-050"],
          questoes: ["q-usprp2022-040","q-tp20202-050","q-tp20212-042"],
          prosa: `[[Na doença de **Legg-Calvé-Perthes**, a irrigação da cabeça do fêmur falha e ela **necrosa**, colapsa e depois se refaz. Menino de **4 a 8 anos** com **claudicação há semanas ou meses**, dor na virilha, na coxa ou no **joelho** que piora com a atividade, **limitação da abdução e da rotação interna** e hipotrofia da coxa, sem febre.|q-usprp2022-040,q-tp20202-050,q-tp20212-042]]`,
          texto: `- Menino 4–8 anos, claudicação de meses, abdução limitada: **Perthes** (necrose da cabeça). {q-usprp2022-040,q-tp20202-050,q-tp20212-042}` },
        { id: "cla-epifisiolise", titulo: "Epifisiólise do fêmur proximal", conferir: true,
          questoes: ["q-scmsp2021-057","q-unicampdis2024-094"],
          prosa: `[[No **adolescente** (10 a 15 anos), sobretudo **obeso**, a fise do fêmur cede ao peso no estirão e a cabeça **escorrega** para trás. Dor na virilha, na coxa ou **no joelho**, claudicação, e ao fletir o quadril ele **gira para fora**. Trata-se com **fixação cirúrgica** sem tentar reduzir.|q-scmsp2021-057,q-unicampdis2024-094]] [[Fora dessa faixa de idade (abaixo de 10 anos ou com baixa estatura) procura-se **doença endócrina** (hipotireoidismo, falta de GH, insuficiência renal).|q-scmsp2021-057]]`,
          texto: `- Adolescente obeso, dor no joelho, rotação externa ao fletir: **epifisiólise** → fixação. {q-scmsp2021-057,q-unicampdis2024-094}
- Idade atípica: **procurar doença endócrina**. {q-scmsp2021-057}` },
      ],
    },
    {
      id: "coluna", titulo: "Coluna e pescoço",
      introducao: `[[A escoliose idiopática é uma rotação das vértebras que piora enquanto a criança cresce; o risco de progressão depende do **tamanho da curva** (ângulo de Cobb) e de **quanto falta crescer** (sinal de Risser, menarca). Dor forte, noturna, não faz parte dela e pede investigação.|q-scmsp2022-029,q-unesp2021-069,q-uspsp3-101]]`,
      fragmentos: [
        { id: "col-escoliose", titulo: "Escoliose idiopática", conferir: true, diretrizes: ["srs-escoliose"],
          questoes: ["q-scmsp2022-029","q-unesp2021-069"],
          prosa: `[[O **teste de Adams** (inclinar o tronco para frente) mostra a **gibosidade**; há assimetria do triângulo do talhe e dos ombros, e a bacia desnivelada dá impressão de perna mais longa.|q-unesp2021-069,q-scmsp2022-029]] [[Até 20–25°: observar. Entre **25 e 40–45°** com crescimento restante (Risser baixo, antes da menarca): **colete**. Acima de 45–50°: cirurgia.|q-scmsp2022-029]]`,
          texto: `- **Adams positivo**, triângulo do talhe assimétrico: escoliose. {q-unesp2021-069,q-scmsp2022-029}
- Cobb 25–40° com crescimento: **colete**. {q-scmsp2022-029}` },
        { id: "col-noturna", titulo: "Dor lombar noturna que melhora com anti-inflamatório", conferir: true,
          questoes: ["q-uspsp3-101"],
          prosa: `[[Adolescente com dor na coluna **à noite**, que **melhora com anti-inflamatório** e não tem relação com esforço, sugere **osteoma osteoide** (tumor ósseo benigno que produz prostaglandina); pode causar escoliose dolorosa. Investiga-se com **tomografia**, que mostra o nicho.|q-uspsp3-101]]`,
          texto: `- Dor noturna que **cede com AINE**: osteoma osteoide → **tomografia**. {q-uspsp3-101}` },
        { id: "col-torcicolo", titulo: "Torcicolo congênito", conferir: true,
          casos: ["q-unesp2026-071"],
          questoes: ["q-unesp2026-071"],
          prosa: `[[O **esternocleidomastoideo** encurtado (às vezes com um nódulo fibroso) inclina a cabeça para o mesmo lado e roda o queixo para o lado oposto: **torcicolo congênito**. O tratamento é **fisioterapia e alongamento**; procura-se displasia do quadril associada.|q-unesp2026-071]]`,
          texto: `- ECM encurtado, cabeça inclinada: **torcicolo congênito → alongamento**. {q-unesp2026-071}` },
      ],
    },
    {
      id: "membros", titulo: "Membros: o normal e o que preocupa",
      introducao: `[[Boa parte das queixas ortopédicas da infância é **variação normal** do crescimento, e o papel do médico é tranquilizar: as pernas passam de arqueadas (até 2 anos) a em X (3 a 5 anos) e depois retas; o arco do pé se forma até os 6 anos; e a dor noturna dos membros, sem sinais, é benigna.|q-fmabc2023-047,q-usprp2021-093,q-unesp2023-020]]`,
      fragmentos: [
        { id: "mem-crescimento", titulo: "Dor do crescimento", conferir: true,
          questoes: ["q-usprp2024-062","q-unesp2023-020","q-unesp2021-012"],
          prosa: `[[A **dor do crescimento** é **bilateral**, nas pernas (panturrilha, frente da tíbia), **no fim do dia ou à noite**, às vezes acorda a criança, melhora com massagem, e o exame é normal. Dor **unilateral** sempre põe o diagnóstico em dúvida (tumor, infecção).|q-usprp2024-062]] [[Trata-se com **calor local, massagem e analgésico** simples.|q-unesp2023-020,q-unesp2021-012]]`,
          texto: `- Dor **unilateral** derruba o diagnóstico de dor do crescimento. {q-usprp2024-062}
- **Calor, massagem, analgésico**. {q-unesp2023-020,q-unesp2021-012}` },
        { id: "mem-variantes", titulo: "Pé plano e joelho valgo", conferir: true,
          questoes: ["q-usprp2021-093","q-fmabc2023-047"],
          prosa: `[[**Pé plano flexível** (o arco aparece na ponta dos pés), sem dor, numa criança de 2 anos é normal: tende a melhorar sozinho; **sem palmilha nem bota**, reavaliação após os 6 anos.|q-usprp2021-093]] [[**Joelhos juntos** (geno valgo) aos 4 anos, simétrico e sem dor, é **desenvolvimento normal**: orientar e observar.|q-fmabc2023-047]]`,
          texto: `- Pé plano flexível: **sem palmilha**, reavaliar após 6 anos. {q-usprp2021-093}
- Geno valgo aos 4 anos: **normal**. {q-fmabc2023-047}` },
        { id: "mem-pronacao", titulo: "Pronação dolorosa", conferir: true,
          casos: ["q-unesp2025-077"],
          questoes: ["q-unesp2025-077","q-unicampdis2025-027"],
          prosa: `[[Criança de **1 a 4 anos puxada pelo braço** chora e para de usar o membro, que fica junto ao corpo, cotovelo semifletido e antebraço em pronação: o ligamento anular escorregou sobre a cabeça do rádio (**pronação dolorosa**). Reduz-se com **supinação e flexão** (ou hiperpronação); não precisa de radiografia.|q-unesp2025-077,q-unicampdis2025-027]]`,
          texto: `- Puxão no braço, criança pequena não usa o membro: **pronação dolorosa**. {q-unesp2025-077,q-unicampdis2025-027}` },
        { id: "mem-volkmann", titulo: "Contratura isquêmica de Volkmann", conferir: true,
          questoes: ["q-unicamp2023-034"],
          prosa: `[[A fratura supracondiliana pode comprimir a artéria braquial ou causar síndrome compartimental no antebraço; sem tratamento, os músculos flexores necrosam e fibrosam: **contratura isquêmica de Volkmann** (mão em garra, punho fletido).|q-unicamp2023-034]]`,
          texto: `- Compartimental do antebraço não tratada: **contratura de Volkmann**. {q-unicamp2023-034}` },
        { id: "mem-oi", titulo: "Osteogênese imperfeita", conferir: true,
          questoes: ["q-tp20231-079"],
          prosa: `[[Defeito do **colágeno tipo I**: ossos frágeis com **fraturas repetidas** por traumas mínimos, **escleras azuladas** (a esclera fina deixa ver a coroide) e, às vezes, surdez e dentes frágeis. É o principal diferencial de maus-tratos.|q-tp20231-079]]`,
          texto: `- Fraturas de repetição + **esclera azul**: **osteogênese imperfeita**. {q-tp20231-079}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-scmsp2021-057","q-usprp2024-062","q-einstein2024-032","q-tp20232-036"],
          prosa: `[[**Epifisiólise e doença endócrina**: na idade típica (11 a 15 anos) a maioria é **idiopática**, ligada à obesidade; a scmsp2021-057 marcou como certa a associação com **doenças endocrinometabólicas** nessa faixa.|q-scmsp2021-057]] [[**Dor do crescimento** pode acordar a criança e ser intensa; o que não combina é ser **unilateral**.|q-usprp2024-062]] [[**Polidrâmnio** dá espaço ao feto e **não** é fator de risco de displasia; oligodrâmnio é.|q-einstein2024-032]] [[**Necrose avascular** é complicação tanto da displasia quanto do tratamento com abdução forçada.|q-tp20232-036]]`,
          texto: `- A prova ligou epifisiólise típica a **doença endócrina**. {q-scmsp2021-057}
- Dor do crescimento: **unilateral** é que preocupa. {q-usprp2024-062}
- **Oligo**, não poli, é fator de DDQ. {q-einstein2024-032}
- **Necrose avascular**. {q-tp20232-036}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: quadril doloroso na criança",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-quadril", titulo: "Idade, quadro, exame e conduta", conferir: true,
          questoes: ["q-einstein2025-041","q-tp20212-042","q-unicampdis2024-094","q-tp20241-042"],
          prosa: `[[A idade é a primeira pista.|q-einstein2025-041,q-tp20212-042,q-unicampdis2024-094,q-tp20241-042]]

| Doença | Idade | Quadro | Exame | Conduta |
| Displasia do quadril | recém-nascido e lactente | assimetria, abdução limitada | ultrassom (até 4–6 meses) | Pavlik |
| Sinovite transitória | 3–8 anos | manca após virose, sem febre | ultrassom com derrame | sintomáticos |
| Perthes | 4–8 anos, menino | claudicação de meses | radiografia: cabeça achatada | ortopedia |
| Epifisiólise | 10–15 anos, obeso | dor no joelho/coxa, rotação externa | radiografia em rã | fixação |`,
          texto: `- Sinovite: **após virose**. {q-einstein2025-041}
- Perthes: **meses de claudicação**. {q-tp20212-042}
- Epifisiólise: **adolescente**. {q-unicampdis2024-094}
- DDQ: **ultrassom**. {q-tp20241-042}` },
      ],
    },
  ],
});
