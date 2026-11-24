/* resumos/cancer-de-mama/resumo.js — resumo adaptativo de câncer de mama: risco, genética e prevenção,
   rastreamento (Ministério da Saúde × FEBRASGO/SBM) e métodos de imagem, BI-RADS e investigação (nódulo
   palpável, calcificações, biópsia), patologia, subtipos e tratamento. Molde e regras: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- cancer-de-mama */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "cancer-de-mama",
  titulo: "Câncer de mama",
  assunto: "ass-camama",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "inca-mama", texto: "INCA/Ministério da Saúde — Diretrizes para a Detecção Precoce do Câncer de Mama no Brasil (2015) e atualizações do rastreamento no SUS", lidoEm: null },
    { id: "febrasgo-mama", texto: "CBR/SBM/FEBRASGO — Recomendações para o rastreamento do câncer de mama (2023)", lidoEm: null },
    { id: "acr-birads", texto: "American College of Radiology — BI-RADS Atlas, 5ª edição", lidoEm: null },
    { id: "nccn", texto: "NCCN Guidelines — Breast Cancer (versão vigente; exige login)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas ou desatualizada sem reposição", questoes: ["q-unifesp2024-047","q-amrigs2020-055","q-tp20202-081"] },
    { motivo: "Afirmação sobre câncer de endométrio: fica no resumo de câncer de endométrio", questoes: ["q-sirio2021-076"] },
  ],
  doencas: [
    {
      id: "risco", titulo: "Risco, genética e exame das mamas",
      introducao: `[[O câncer de mama da maioria das mulheres é hormônio-dependente: quanto mais tempo o epitélio fica exposto a estrogênio sem a pausa de uma gestação, maior o risco — menarca precoce, menopausa tardia, nuliparidade, primeira gestação tardia, obesidade na pós-menopausa e terapia hormonal com estrogênio e progestagênio.|q-famema2025-051,q-fmabc2022-061,q-sessp2024-067]] Atividade física, peso saudável, menos álcool e amamentar são a prevenção primária.

[[Cerca de 5 a 10% vêm de mutação herdada; BRCA1 e BRCA2 são autossômicos dominantes de alta penetrância e levam também a câncer de ovário, por isso câncer de ovário em parente de primeiro grau pesa tanto.|q-sirio2022-066,q-fmabc2024-070,q-unesp2026-035]] [[Na portadora, o rastreio começa aos 25–30 anos com ressonância e mamografia anuais, e se discute mastectomia e salpingo-ooforectomia redutoras de risco.|q-adap21-010,q-fmabc2021-043,q-einstein2027-046]]

Veja também: **Climatério** (terapia hormonal e risco), **Câncer de endométrio** (tamoxifeno), **Ciclo menstrual**.`,
      fragmentos: [
        { id: "ris-fatores", titulo: "Fatores de risco, alto risco e exame clínico", conferir: true, diretrizes: ["febrasgo-mama"],
          questoes: ["q-famema2025-051","q-sessp2024-067","q-fmabc2024-070","q-fmabc2022-061","q-sirio2022-066","q-unesp2026-035","q-fmabc2021-043","q-adap21-010","q-tp20212-093","q-einstein2027-046","q-sirio2024-079","q-usp2024-113","q-adap21-062"],
          prosa: `[[A palpação se faz com a mulher deitada e o braço acima da cabeça, que espalha o tecido sobre o tórax.|q-usp2024-113]] [[Os ductos levam o leite dos alvéolos ao seio lactífero.|q-sirio2024-079]] [[Mastalgia cíclica, bilateral, com exame normal é hormonal e benigna: tranquilizar, sutiã firme e analgésico.|q-adap21-062]]`,
          texto: `- Fator comprovado: **terapia hormonal estroprogestativa**. {q-famema2025-051}
- Mais ligado ao câncer na anamnese: **nuliparidade**. {q-fmabc2022-061}
- Prevenção primária: **atividade física e peso saudável**. {q-sessp2024-067}
- Fator mais forte acima de 40: **câncer de ovário em parente de 1º grau**. {q-fmabc2024-070}
- BRCA1: **autossômico dominante**, alta penetrância. {q-sirio2022-066}
- Mãe aos 45 e tia aos 50: **teste genético**. {q-unesp2026-035}
- Portadora aos 32: **ressonância e mamografia anuais** a partir dos 30. {q-adap21-010}
- Alto risco aos 36: **mamografia e ressonância anuais** já. {q-einstein2027-046}
- BRCA1 aos 45 com prole: **mastectomia e ooforectomia** bilaterais. {q-fmabc2021-043}
- Pai com câncer aos 40: **mamografia já** e anual. {q-tp20212-093}
- Ductos ligam **alvéolos ao seio lactífero**. {q-sirio2024-079}
- Palpação: **decúbito dorsal com braço elevado**. {q-usp2024-113}
- Mastalgia cíclica com exame normal: **tranquilizar**. {q-adap21-062}` },
      ],
    },
    {
      id: "rastreio", titulo: "Rastreamento",
      introducao: `[[O rastreamento quer reduzir a mortalidade achando o câncer antes de palpável; mas todo rastreio traz falso-positivos, biópsias e sobrediagnóstico, e o ganho depende da idade: entre 50 e 69 anos o benefício é maior que o dano.|q-iamspe2022-070,q-tp20261-006,q-amrigs2022-050]]

[[O Ministério da Saúde rastreia a mulher de risco habitual com mamografia a cada 2 anos dos 50 aos 69 anos; entre 40 e 49 a mamografia é decisão compartilhada, garantida pelo SUS quando indicada. A FEBRASGO, a SBM e o CBR recomendam mamografia anual dos 40 aos 74 anos.|q-sirio2026-068,q-sirio2021-096,q-iamspe2025-046,q-iamspe2026-046,q-usprp2021-010,q-scmsp2021-062,q-iamspe2022-055,q-famema2023-049]] São duas recomendações válidas, e a prova diz de qual fala.`,
      fragmentos: [
        { id: "ras-quem", titulo: "Quem e quando rastrear", conferir: true, diretrizes: ["inca-mama","febrasgo-mama"],
          questoes: ["q-scmsp2021-062","q-iamspe2022-055","q-famema2023-049","q-iamspe2025-046","q-iamspe2026-046","q-sirio2026-068","q-sirio2021-096","q-usprp2021-010","q-amrigs2022-050","q-iamspe2022-070","q-tp20261-006","q-usp2026-085","q-uspsp2-118","q-sessp2026-093","q-scmsp2026-086","q-unicampdis2024-100","q-unicampdis2022-044"],
          casos: ["q-unicampdis2024-100"],
          prosa: `[[Ultrassom não é método de rastreio na mulher assintomática.|q-uspsp2-118]] [[Homem trans que não fez mastectomia segue o rastreio da mulher.|q-sessp2026-093]] [[Depois de tratar um câncer, a mamografia passa a ser anual.|q-unicampdis2022-044]]`,
          texto: `- MS: **50 a 69 anos, a cada 2 anos**. {q-sirio2026-068,q-sirio2021-096,q-iamspe2025-046}
- MS, 40–49: mamografia **mediante avaliação e decisão**. {q-iamspe2026-046,q-amrigs2022-050}
- 43 anos sem risco, pelo SUS: **não indicado** de rotina. {q-usprp2021-010}
- FEBRASGO/SBM: **anual a partir dos 40**. {q-scmsp2021-062,q-iamspe2022-055,q-famema2023-049}
- Benefício e dano: **nenhuma intervenção tem risco zero**. {q-iamspe2022-070}
- Meta da linha de cuidado: **reduzir mortalidade**. {q-tp20261-006}
- 67 anos com exames de colo normais: **só mamografia**. {q-usp2026-085}
- BI-RADS 1 aos 55: **manter a rotina**. {q-scmsp2026-086}
- Mamografia normal aos 58: **repetir em 2 anos**. {q-unicampdis2024-100}
- 38 anos assintomática: **sem ultrassom** de rastreio. {q-uspsp2-118}
- Homem trans de 51 anos: **mamografia**. {q-sessp2026-093}
- Após câncer tratado: mamografia **anual**. {q-unicampdis2022-044}` },
        { id: "ras-metodos", titulo: "Mamografia, ultrassom e ressonância",
          questoes: ["q-iamspe2023-051","q-sessp2023-050","q-sirio2023-081","q-fmabc2023-076","q-einstein2022-069"],
          prosa: `[[A mamografia é a única que reduz mortalidade no rastreio e a melhor para microcalcificações; a mama densa esconde lesões, e o ultrassom complementa. A ressonância é a mais sensível e fica para o alto risco.|q-iamspe2023-051,q-sessp2023-050,q-sirio2023-081,q-fmabc2023-076]] [[Linfonodo axilar ipsilateral à vacina recente pode ser reacional, mas a investigação de suspeita segue.|q-einstein2022-069]]`,
          texto: `- Microcalcificações: **mamografia** melhor que ressonância. {q-iamspe2023-051}
- Mama densa: **ultrassom complementar**. {q-sessp2023-050}
- Mamografia depende da **densidade**. {q-sirio2023-081}
- Maior sensibilidade: **ressonância**. {q-fmabc2023-076}
- Linfonodo após vacina: pode ser reacional, mas **investigar**. {q-einstein2022-069}` },
      ],
    },
    {
      id: "investigacao", titulo: "BI-RADS e investigação",
      introducao: `[[O BI-RADS traduz o laudo em conduta: 0 é inconclusivo (precisa de imagem adicional: compressão, ampliação, ultrassom); 1 e 2 são negativo e benigno (rotina); 3 é provavelmente benigno, com menos de 2% de malignidade (controle em 6 meses); 4 é suspeito e 5 é altamente suspeito, com 95% ou mais (biópsia); 6 é câncer já comprovado.|q-adap22-027,q-sessp2025-066,q-famerp2024-043,q-adap24-098]]

[[Microcalcificações finas, pleomórficas, agrupadas ou segmentares são o sinal do carcinoma ductal in situ: amplia-se na mamografia e se biopsia a vácuo (mamotomia) guiada por estereotaxia, porque o ultrassom não as vê.|q-unifesp2023-046,q-unifesp2025-068,q-adap23-046,q-unifesp2022-027,q-uspsp2-030,q-uspsp3-068,q-einstein2026-046]] [[Nódulo suspeito se biopsia por agulha grossa (core) guiada por ultrassom: dá histologia e receptores.|q-uspsp1-080,q-unesp2023-036,q-scmsp2023-065]]`,
      fragmentos: [
        { id: "inv-birads", titulo: "Categorias e imagem adicional", conferir: true, diretrizes: ["acr-birads"],
          figuras: [{ arquivo: "figuras/birads.svg", legenda: "Esquema autoral: categorias BI-RADS e a conduta de cada uma." }],
          questoes: ["q-adap22-027","q-unifesp2023-046","q-unifesp2025-068","q-usprp2024-089","q-usprp2025-051","q-sessp2025-066","q-usprp2021-062","q-adap24-098","q-sessp2026-080","q-famerp2024-043","q-sirio2025-065"],
          casos: ["q-usprp2024-089","q-usprp2021-062"],
          prosa: `[[Calcificação grosseira "em pipoca" é fibroadenoma calcificado, benigno.|q-sessp2026-080]]`,
          texto: `- BI-RADS 0 por assimetria: **incidências complementares e ultrassom**. {q-adap22-027,q-usprp2024-089}
- BI-RADS 0 por microcalcificações: **ampliação**. {q-unifesp2023-046,q-unifesp2025-068}
- BI-RADS 0 sem exames antigos: **compressão localizada e ultrassom**. {q-usprp2025-051}
- BI-RADS 0 com história familiar: **outro exame** antes de falar em risco. {q-sirio2025-065}
- BI-RADS 3: **controle em 6 meses**. {q-sessp2025-066,q-usprp2021-062,q-adap24-098}
- Calcificação em pipoca: **rotina**. {q-sessp2026-080}
- BI-RADS 5: **≥ 95%** de malignidade. {q-famerp2024-043}` },
        { id: "inv-biopsia", titulo: "Calcificações e biópsia", conferir: true, diretrizes: ["acr-birads"],
          questoes: ["q-adap23-046","q-unifesp2022-027","q-amrigs2024-043","q-uspsp2-030","q-uspsp3-068","q-einstein2026-046","q-fmabc2025-068","q-tp20241-093","q-uspsp1-080","q-famema2023-048","q-tp20251-096","q-tp20252-117","q-usprp2024-088"],
          casos: ["q-uspsp3-068","q-einstein2026-046"],
          texto: `- Calcificações pleomórficas: **mamotomia guiada por mamografia**. {q-unifesp2022-027,q-uspsp2-030,q-uspsp3-068}
- BI-RADS 4C segmentar: **vácuo por estereotaxia** e marcação. {q-adap23-046}
- Calcificações: provável **carcinoma ductal in situ**. {q-einstein2026-046}
- Calcificações novas: **centro de referência para biópsia**. {q-amrigs2024-043,q-fmabc2025-068,q-tp20241-093}
- Nódulo BI-RADS 4: **core biopsy**. {q-uspsp1-080}
- BI-RADS 5 ou nódulo espiculado: **biópsia percutânea**. {q-tp20251-096,q-tp20252-117}
- Melhor amostra de tecido: **incisional** (banca). {q-famema2023-048}
- **Hiperplasia ductal atípica** na biópsia a vácuo: **excisão cirúrgica** da área, mesmo com as calcificações retiradas (subestima carcinoma em 10 a 30%). {q-usprp2024-088}` },
        { id: "inv-nodulo", titulo: "Nódulo palpável, Paget e gestante", conferir: true, diretrizes: ["inca-mama"],
          questoes: ["q-scmsp2023-065","q-unesp2023-036","q-tp20222-081","q-tp20231-081","q-tp20232-081","q-tp20241-081","q-einstein2022-057","q-unicamp2023-061","q-usprp2026-029","q-fmabc2026-077","q-tp20261-063","q-adap25-068","q-usp2026-101"],
          prosa: `[[O exame de imagem do nódulo palpável depende da idade: abaixo de 30–35 anos, ultrassom primeiro (mama densa); acima, mamografia; o nódulo suspeito vai à biópsia mesmo com imagem tranquila.|q-tp20232-081,q-tp20241-081,q-tp20222-081,q-tp20231-081,q-einstein2022-057,q-unicamp2023-061,q-fmabc2026-077]] [[Fibroadenoma típico na adolescente (oval, regular, homogêneo) se acompanha.|q-tp20241-081]] [[Nódulo duro, irregular, com retração de pele é carcinoma ductal invasivo até prova em contrário.|q-tp20261-063,q-usprp2026-029]] [[Eczema do mamilo que não cede é doença de Paget: biópsia e imagem das mamas, porque costuma esconder um carcinoma.|q-adap25-068]] [[Na gestante, o ultrassom é o primeiro exame do nódulo (a mama da gravidez é densa), mas a mamografia com proteção abdominal é segura e a investigação nunca se adia: o câncer na gestação é achado tarde porque o nódulo é atribuído às mudanças da mama.|q-usp2026-101]]`,
          texto: `- 30 anos, nódulo fibroelástico móvel: **ultrassom**. {q-tp20232-081}
- 17 anos com fibroadenoma típico: **seguimento**. {q-tp20241-081}
- 40 anos, nódulo endurecido irregular: **mamografia**. {q-tp20222-081,q-tp20231-081}
- Punção sem líquido: **mamografia bilateral**. {q-einstein2022-057}
- Nódulo com linfonodo palpável: **mamografia** para orientar. {q-unicamp2023-061}
- Nódulo e linfonodo suspeitos aos 46: **mastologista com prioridade**. {q-usprp2026-029}
- Sólido com sombra acústica aos 34: **core biopsy**. {q-scmsp2023-065}
- Nódulo de difícil delimitação: **biópsia guiada por ultrassom**. {q-unesp2023-036}
- BI-RADS 4 aos 32: **biópsia**. {q-fmabc2026-077}
- Nódulo duro com retração: **carcinoma ductal invasivo**. {q-tp20261-063}
- Eczema do mamilo: **biópsia** e mamografia com ultrassom. {q-adap25-068}
- Gestante de 39 anos com nódulo suspeito: **prosseguir com mamografia** (proteção abdominal), sem adiar. {q-usp2026-101}` },
      ],
    },
    {
      id: "tratamento", titulo: "Patologia, subtipos e tratamento",
      introducao: `[[O carcinoma in situ fica dentro do ducto; a ruptura da membrana basal define a invasão, que abre caminho aos vasos.|q-tp20232-100,q-tp20261-078,q-iamspe2021-054]] [[Os subtipos moleculares guiam o tratamento: luminal A (receptores hormonais altos, Ki-67 baixo) responde a hormônio; luminal B tem Ki-67 alto; o HER2 positivo recebe anti-HER2; o triplo negativo, só quimioterapia, e tem o pior prognóstico.|q-unesp2025-033,q-sessp2022-068,q-uspsp5-035,q-einstein2025-056]]

[[O tratamento local é cirurgia conservadora com radioterapia (equivalente à mastectomia) e avaliação da axila pelo linfonodo sentinela quando a axila é clinicamente negativa; tumor localmente avançado, triplo negativo ou HER2 positivo começam pela quimioterapia neoadjuvante.|q-didepm-033,q-unesp2026-037,q-sirio2025-033,q-einstein2021-036,q-usp2022-085,q-einstein2024-052]] [[A hormonioterapia muda com a menopausa: tamoxifeno na pré-menopausa (o ovário ainda produz estrogênio) e inibidor de aromatase na pós-menopausa.|q-unesp2022-030,q-adap21-069]]`,
      fragmentos: [
        { id: "tra-patologia", titulo: "In situ, invasão, subtipos e prognóstico",
          questoes: ["q-iamspe2021-054","q-tp20232-100","q-tp20261-078","q-tp20241-100","q-unesp2025-033","q-sessp2022-068","q-uspsp5-035"],
          casos: ["q-tp20232-100"],
          texto: `- Malignidade na peça: **ruptura da membrana basal**. {q-tp20232-100,q-tp20261-078}
- Na biópsia: **mitoses frequentes**. {q-tp20241-100}
- CDIS grau 3: **maior chance** de evoluir a invasivo. {q-iamspe2021-054}
- Luminal A: **receptores altos e Ki-67 baixo**. {q-unesp2025-033}
- Alto risco de recidiva: **Ki-67 elevado**. {q-sessp2022-068}
- Pior prognóstico: **triplo negativo**. {q-uspsp5-035}` },
        { id: "tra-conduta", titulo: "Cirurgia, axila e terapia sistêmica", conferir: true, diretrizes: ["nccn"],
          questoes: ["q-scmsp2026-080","q-didepm-033","q-unesp2026-037","q-sirio2025-033","q-einstein2021-036","q-usprp2021-069","q-adap21-069","q-unesp2022-030","q-einstein2024-052","q-einstein2025-056","q-usp2022-085","q-scmsp2025-074","q-usp2025-007","q-unicampdis2024-047"],
          casos: ["q-usp2022-085"],
          prosa: `[[Na gestante, a quimioterapia é possível no segundo e terceiro trimestres, mas perto do termo se antecipa o parto e se trata no puerpério.|q-scmsp2025-074]] [[Fogachos com inibidor de aromatase se tratam sem hormônio: gabapentina ou antidepressivo.|q-usp2025-007]] [[Derrame pleural anos depois é metástase até prova em contrário.|q-unicampdis2024-047]]`,
          texto: `- CDIS de 1 cm: **cirurgia conservadora e radioterapia**. {q-scmsp2026-080}
- Tumor inicial, axila negativa: **conservadora, sentinela e radioterapia**. {q-didepm-033}
- Setorectomia T2N0: **radioterapia** adjuvante. {q-unesp2026-037}
- Invasivo com axila clínica negativa: **linfonodo sentinela**. {q-sirio2025-033,q-einstein2021-036}
- Novo tumor na outra mama aos 68: **setorectomia, sentinela e radioterapia**. {q-usprp2021-069}
- Luminal de baixo risco na pós-menopausa: **inibidor de aromatase**. {q-adap21-069}
- 44 anos com receptores positivos: **tamoxifeno**. {q-unesp2022-030}
- Triplo negativo aos 30: **quimioterapia neoadjuvante**. {q-einstein2024-052}
- HER2 3+: cirurgia, quimio e **anti-HER2** (banca). {q-einstein2025-056}
- Axila e supraclavicular comprometidas: **quimioterapia primária**. {q-usp2022-085}
- Mastectomia com 34 semanas: quimio **no pós-parto**, antecipando o parto. {q-scmsp2025-074}
- Fogachos com inibidor de aromatase: **gabapentina**. {q-usp2025-007}
- Derrame pleural anos depois: **metástase**. {q-unicampdis2024-047}` },
      ],
    },
    {
      id: "benignas", titulo: "Doenças benignas: dor, nódulo, secreção e mastite",
      introducao: `[[A maior parte das queixas mamárias da mulher jovem é benigna, e o trabalho do médico é **separar o que precisa de investigação sem medicalizar o resto**. A mama responde aos hormônios do ciclo: na fase lútea o estroma retém água e os ductos proliferam, por isso a dor e o "nódulo" que pioram antes da menstruação e somem depois.|q-usp2023-021,q-unesp2021-032]] Antes dos 30–35 anos, o exame de imagem do nódulo é a **ultrassonografia** (a mama densa esconde lesões na mamografia); a mamografia de rastreamento segue a idade, não a queixa benigna.`,
      fragmentos: [
        { id: "ben-mastalgia", titulo: "Mastalgia", conferir: true,
          questoes: ["q-usp2023-021","q-unesp2021-032","q-usprp2023-033","q-usp2025-024"],
          prosa: `[[A **mastalgia cíclica** (bilateral, difusa, pior na fase lútea) com exame normal pede **orientação, tranquilização e sutiã adequado**; câncer quase nunca se apresenta como dor. Se incomoda, **anti-inflamatório tópico ou oral**. Mesmo a dor localizada com história familiar, exame normal e padrão cíclico se conduz assim.|q-usp2023-021,q-unesp2021-032,q-usprp2023-033]] [[Só a mastalgia **grave e refratária** recebe droga hormonal: **tamoxifeno em dose baixa** é a de maior eficácia (danazol e bromocriptina têm mais efeitos adversos).|q-usp2025-024]]`,
          texto: `- Mastalgia cíclica, exame normal: **tranquilizar**, sutiã, AINE tópico. {q-unesp2021-032,q-usprp2023-033}
- Nodularidade pré-menstrual: **seguimento clínico**. {q-usp2023-021}
- Grave e refratária: **tamoxifeno em dose baixa**. {q-usp2025-024}` },
        { id: "ben-nodulo", titulo: "Fibroadenoma, cisto e galactocele", conferir: true,
          questoes: ["q-amrigs2025-041","q-tp20252-071","q-tp20261-099","q-uspsp1-078","q-sirio2021-062","q-fmabc2023-078","q-unicampdis2023-046","q-sirio2026-074"],
          prosa: `[[O **fibroadenoma** é o nódulo da jovem: **móvel, fibroelástico, indolor, de limites regulares**; no ultrassom, **oval, paralelo à pele, circunscrito, com até 3 lobulações** e ecotextura homogênea (BI-RADS 3). Abaixo dos 35 anos, com clínica e imagem concordantes, **seguimento clínico e ultrassonográfico** (semestral no primeiro ano); biópsia se crescer, se a imagem for discordante ou se a mulher quiser retirar.|q-amrigs2025-041,q-tp20261-099,q-uspsp1-078,q-sirio2021-062]] [[A jovem com nódulo e uma tia com câncer de mama: **ultrassonografia e acompanhamento na atenção básica**; caso isolado de segundo grau aos 52 anos não a torna de alto risco.|q-tp20252-071]] [[O **cisto simples** é **anecoico, de parede fina e com reforço acústico posterior** (BI-RADS 2): não precisa de punção, salvo se doer. Na puérpera, nódulo **amolecido, indolor, cístico**, sem sinais inflamatórios, é **galactocele**: **controle clínico**.|q-fmabc2023-078,q-unicampdis2023-046,q-sirio2026-074]]`,
          texto: `- Fibroadenoma: móvel, fibroelástico, oval, **até 3 lobulações** → **seguimento**. {q-amrigs2025-041,q-tp20261-099,q-uspsp1-078,q-sirio2021-062}
- Jovem com nódulo: **ultrassom** e seguimento na UBS. {q-tp20252-071}
- Anecoico, parede fina, reforço posterior: **cisto simples**. {q-fmabc2023-078,q-unicampdis2023-046}
- Puérpera com nódulo cístico indolor: **galactocele**, controle clínico. {q-sirio2026-074}` },
        { id: "ben-descarga", titulo: "Descarga papilar", conferir: true,
          questoes: ["q-unesp2026-038","q-unicampdis2025-033","q-usprp2022-059"],
          prosa: `[[A descarga que preocupa é **espontânea, unilateral, de um ducto, serosa ou sanguinolenta**: a causa mais comum é o **papiloma intraductal**, que se vê no ultrassom como lesão dentro de ducto dilatado e se trata com **exérese do ducto** (o carcinoma é a exceção que a exérese afasta).|q-unesp2026-038,q-unicampdis2025-033]] [[Secreção **bilateral, multiductal, escura ou esverdeada** na mulher na peri ou pós-menopausa é **ectasia ductal**: ductos dilatados com secreção espessa, benigna.|q-usprp2022-059]]`,
          texto: `- Unilateral, uniductal, sanguinolenta: **papiloma intraductal**. {q-unesp2026-038,q-unicampdis2025-033}
- Bilateral, multiductal, escura: **ectasia ductal**. {q-usprp2022-059}` },
        { id: "ben-mastite", titulo: "Mastites: periductal e da lactação", conferir: true,
          questoes: ["q-usprp2025-053","q-tp20222-095","q-famerp2023-047","q-usprp2027-015","q-unicampdis2025-086","q-tp20231-096","q-tp20241-041"],
          prosa: `[[Fora da lactação, inflamação **periareolar** com abscesso ou drenagem na **tabagista** é **mastite periductal**: o fumo lesa os ductos subareolares (metaplasia escamosa, obstrução, infecção por **anaeróbios e estafilococo**). Trata-se com **amoxicilina-clavulanato** por 7 a 14 dias e drenagem do abscesso; a **recidiva com fístula (doença de Zuska)** só se resolve com **parar de fumar e ressecar os ductos terminais**.|q-usprp2025-053,q-tp20222-095,q-famerp2023-047,q-usprp2027-015,q-unicampdis2025-086]] [[Na lactação, dor ao amamentar quase sempre é **pega errada**: **corrigir a técnica**. Prurido, ardor e descamação da aréola com dor em pontada é **candidíase**: antifúngico **na mãe e no bebê**.|q-tp20241-041,q-tp20231-096]]`,
          texto: `- Tabagista, periareolar, drenagem: **mastite periductal**. {q-usprp2025-053,q-tp20222-095}
- Antibiótico **5 a 7 dias, até 10 a 14** (amoxicilina-clavulanato). {q-famerp2023-047,q-usprp2027-015}
- Recidiva com fístula: **parar de fumar** e ressecar os ductos. {q-unicampdis2025-086}
- Dor ao amamentar: **técnica**; prurido e descamação: **candidíase**, tratar mãe e bebê. {q-tp20241-041,q-tp20231-096}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-famema2023-048","q-einstein2025-056","q-usprp2021-010"],
          texto: `- Para nódulo, a biópsia por agulha grossa é a primeira escolha; a banca disse que a **incisional** dá a melhor amostra. {q-famema2023-048}
- Tumor HER2 positivo de 2 cm ou mais costuma começar pela **neoadjuvância**; a prova operou primeiro. {q-einstein2025-056}
- Para o Ministério da Saúde, 40–49 anos é decisão compartilhada; a prova de 2021 respondeu **"não indicado"**, e a FEBRASGO indicaria. {q-usprp2021-010}` },
      ],
    },
  ],
});
