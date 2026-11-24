/* resumos/vigilancia-sanitaria/resumo.js — resumo adaptativo de vigilância sanitária e notificação
   (ass-vigilanciasanitaria): componentes da vigilância em saúde, Anvisa e SNVS (poder de polícia,
   produtos, serviços, farmácias, receituários, resíduos), notificação compulsória (lista, imediata e
   semanal, negativa, SINAN), declaração de óbito, precauções de isolamento; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- vigilancia-sanitaria */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "vigilancia-sanitaria",
  titulo: "Vigilância sanitária, notificação compulsória e declaração de óbito",
  assunto: "ass-vigilanciasanitaria",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "lei-8080-9782", texto: "Lei 8.080/1990 (art. 6.º, vigilância sanitária e epidemiológica) e Lei 9.782/1999 (Sistema Nacional de Vigilância Sanitária e Anvisa)", lidoEm: null },
    { id: "lista-notificacao", texto: "Ministério da Saúde — Portaria de Consolidação GM/MS n.º 4/2017, Anexo 1 do Anexo V (Lista Nacional de Notificação Compulsória), com as atualizações de 2020–2024", lidoEm: null },
    { id: "ms-do", texto: "Ministério da Saúde — Declaração de Óbito: manual de instruções para preenchimento (2022) e Resolução CFM 1.779/2005", lidoEm: null },
    { id: "anvisa-rdc", texto: "Anvisa — RDC 222/2018 (resíduos de serviços de saúde, que substituiu a RDC 306/2004), Portaria SVS/MS 344/1998 (controle especial) e RDC 786/2023 (exames em farmácias)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "vigilancias", titulo: "As vigilâncias e a Anvisa",
      introducao: `[[A vigilância em saúde tem braços com funções diferentes: a **epidemiológica** conhece e controla doenças (notificação, investigação, bloqueio); a **sanitária** age sobre riscos em produtos, serviços e ambiente, e é a única com **poder de polícia** — inspeciona, interdita, apreende, multa; a **ambiental** e a **do trabalhador** completam. Saber qual braço age em cada situação é o que a prova pergunta.|q-uspsp1-116,q-unifesp2024-073,q-unicampdis2023-054]]

Veja também: **Sistemas de informação em saúde**, **Epidemiologia descritiva** (incidência, prevalência, letalidade), **Imunizações**, **Saúde do trabalhador** e **Violência** quando houver resumo.`,
      fragmentos: [
        { id: "vig-sanitaria", titulo: "Vigilância sanitária e poder de polícia", conferir: true, diretrizes: ["lei-8080-9782"],
          figuras: [{ arquivo: "figuras/vigilancias.svg", legenda: "Esquema autoral: os braços da vigilância em saúde, o que cada um faz e o prazo da notificação." }],
          questoes: ["q-uspsp1-116","q-unifesp2024-073","q-unicampdis2023-054","q-famema2023-019","q-didepm-055","q-usp2023-065","q-uspsp4-086"],
          prosa: `[[A vigilância sanitária é o conjunto de ações para **eliminar, diminuir ou prevenir riscos** do meio ambiente, da produção e circulação de bens e da prestação de serviços de interesse da saúde. Por isso fiscaliza salão de manicure com surto de onicomicose, interrompe jogo por violação sanitária e investiga o fornecedor numa intoxicação alimentar coletiva.|q-uspsp1-116,q-unifesp2024-073,q-unicampdis2023-054,q-famema2023-019]] [[O Sistema Nacional de Vigilância Sanitária é coordenado pela **Anvisa**, que regula o que tem alcance nacional: recolhimento de lote de medicamento em todo o país, avaliação toxicológica de agrotóxicos (o dossiê toxicológico), regras para exames em farmácias (só o farmacêutico habilitado os executa). Estados e municípios fiscalizam no território.|q-didepm-055,q-usp2023-065,q-uspsp4-086]]`,
          texto: `- Sanitária: **riscos de produtos e serviços**, **poder de polícia**. {q-uspsp1-116,q-unifesp2024-073,q-unicampdis2023-054,q-famema2023-019}
- **Anvisa**: recolhimento nacional, agrotóxico, farmácias. {q-didepm-055,q-usp2023-065,q-uspsp4-086}` },
        { id: "vig-normas", titulo: "Receituários, resíduos e precauções", conferir: true, diretrizes: ["anvisa-rdc"],
          questoes: ["q-fmabc2026-090","q-fmabc2025-089","q-einstein2021-048","q-einstein2022-001"],
          prosa: `[[Medicamentos de controle especial têm receituário próprio: **entorpecentes como a morfina, notificação tipo A** (amarela); psicotrópicos (benzodiazepínicos), tipo B (azul); retinoides e imunossupressores especiais, outros tipos.|q-fmabc2026-090]] [[Resíduos de saúde: grupo A infectante, B químico, C radioativo, **D comum** (sem contaminação, como lixo doméstico), E perfurocortante.|q-fmabc2025-089]] [[Precauções seguem o modo de transmissão: gotículas e contato para a maioria dos vírus respiratórios; **aerossol (N95/PFF2)** para sarampo, varicela, tuberculose e, na covid-19, durante procedimentos geradores de aerossol.|q-einstein2021-048,q-einstein2022-001]]`,
          texto: `- Morfina: **receituário A**. {q-fmabc2026-090}
- Resíduo comum: **grupo D**. {q-fmabc2025-089}
- N95 em **procedimento gerador de aerossol**. {q-einstein2021-048,q-einstein2022-001}` },
      ],
    },
    {
      id: "notificacao", titulo: "Notificação compulsória",
      introducao: `[[Notificar é avisar a autoridade de saúde da **suspeita**: o objetivo é agir enquanto o evento ainda é pequeno — vacinar contatos, bloquear transmissão, recolher um alimento. Por isso não se espera confirmação, e a obrigação é de todo profissional de saúde, de serviços públicos e privados. A lista é nacional, e estados e municípios podem ampliá-la.|q-adap24-085,q-adap25-044,q-scmsp2022-092]]`,
      fragmentos: [
        { id: "not-regras", titulo: "Lista, prazos e SINAN", conferir: true, diretrizes: ["lista-notificacao"],
          questoes: ["q-adap24-085","q-adap25-044","q-scmsp2022-092","q-unifesp2024-078","q-fmabc2022-096","q-unicampdis2024-117","q-famema2022-014","q-unicampdis2024-055","q-unicampdis2024-056","q-uspsp2-098","q-sirio2023-099"],
          prosa: `[[Notificação **imediata** é em **até 24 horas**, pelo meio mais rápido; a **semanal**, até 7 dias. Os dados entram no **SINAN** (Sistema de Informação de Agravos de Notificação). Quando nada aconteceu na semana, o estabelecimento faz a **notificação negativa** — prova de que a vigilância está ativa.|q-fmabc2022-096,q-unifesp2024-078,q-scmsp2022-092,q-unicampdis2024-117]] [[Intoxicação por agrotóxico vai ao SINAN; se foi tentativa de suicídio, também na **ficha de violência interpessoal e autoprovocada**.|q-famema2022-014,q-unicampdis2024-117]] [[Uma doença entra na lista pela **magnitude** (incidência, prevalência), **gravidade** (mortalidade, letalidade), potencial de disseminação e vulnerabilidade a medidas de controle. Alguns itens da lista servem para monitorar políticas, como a esterilização cirúrgica voluntária no planejamento familiar.|q-unicampdis2024-055,q-unicampdis2024-056,q-uspsp2-098,q-adap24-085,q-sirio2023-099]]`,
          texto: `- **Imediata = 24 h**; semanal = 7 dias; **SINAN**. {q-fmabc2022-096,q-unifesp2024-078,q-unicampdis2024-117}
- **Notificação negativa** semanal. {q-scmsp2022-092}
- Suspeita basta; lista ampliável. {q-adap24-085,q-adap25-044}
- Entra na lista por **incidência e letalidade**. {q-unicampdis2024-055,q-unicampdis2024-056,q-uspsp2-098}` },
        { id: "not-quais", titulo: "Quais são imediatas e quais semanais", conferir: true, diretrizes: ["lista-notificacao"],
          questoes: ["q-adap25-044","q-unifesp2025-044","q-amrigs2023-084","q-amrigs2024-088","q-amrigs2025-089","q-iamspe2021-067","q-fmabc2025-088","q-fmabc2023-091","q-famerp2022-016","q-famerp2023-018","q-sessp2023-084","q-adap25-048","q-fmabc2023-092","q-unifesp2025-048","q-sessp2024-100","q-unicamp2022-080","q-amrigs2022-095","q-iamspe2021-068","q-famema2021-078"],
          prosa: `[[**Imediatas** são as que pedem ação no mesmo dia: doenças evitáveis por vacina com potencial de surto (**sarampo**, rubéola, **paralisia flácida aguda**/pólio, difteria), **febre amarela**, **botulismo**, **raiva humana**, síndrome da rubéola congênita, **óbito por dengue ou arbovirose**, zika em gestante, evento adverso grave pós-vacinação, doença emergente (mpox suspeita, SIM-P/SIM-A da covid).|q-adap25-044,q-unifesp2025-044,q-amrigs2023-084,q-amrigs2024-088,q-amrigs2025-089,q-iamspe2021-067,q-fmabc2025-088,q-fmabc2023-091,q-famerp2022-016,q-famerp2023-018,q-sessp2023-084]] [[**Semanais** são as que se acompanham ao longo do tempo: **sífilis em gestante** (qualquer estágio, com ou sem tratamento), **HIV em gestante** (logo no diagnóstico, qualquer trimestre), **acidente com material biológico**, violência interpessoal (que a equipe notifica além de acolher e construir um plano).|q-adap25-048,q-fmabc2023-092,q-unifesp2025-048,q-sessp2024-100,q-unicamp2022-080]] [[A lista inclui meningites, leishmaniose visceral, acidente por escorpião e, desde 2020, a **doença de Chagas crônica**; não inclui bartonelose.|q-amrigs2022-095,q-iamspe2021-068,q-famema2021-078]]`,
          texto: `- Imediatas: **sarampo, PFA, febre amarela, botulismo, raiva, óbito por dengue, zika em gestante**. {q-adap25-044,q-unifesp2025-044,q-amrigs2023-084,q-amrigs2024-088,q-amrigs2025-089,q-iamspe2021-067,q-fmabc2025-088,q-fmabc2023-091}
- Semanais: **sífilis e HIV em gestante, material biológico, violência**. {q-adap25-048,q-fmabc2023-092,q-unifesp2025-048,q-sessp2024-100,q-unicamp2022-080}
- **Chagas crônica** entrou; bartonelose não. {q-amrigs2022-095,q-iamspe2021-068,q-famema2021-078}` },
      ],
    },
    {
      id: "obito", titulo: "Declaração de óbito",
      introducao: `[[A declaração de óbito alimenta o SIM, e a estatística de mortalidade usa a **causa básica**: a doença ou lesão que iniciou a cadeia de eventos, ou a circunstância do acidente ou violência que produziu a lesão fatal. Por isso a cadeia se escreve de cima para baixo, da causa terminal à básica, na última linha preenchida da Parte I.|q-tp20212-119,q-tp20222-118]]`,
      fragmentos: [
        { id: "obi-preenchimento", titulo: "Parte I, Parte II e quem preenche", conferir: true, diretrizes: ["ms-do"],
          questoes: ["q-tp20212-119","q-tp20222-118","q-tp20202-118","q-unesp2021-093"],
          prosa: `[[Parte I: a) causa terminal (insuficiência respiratória), b) e c) as que a provocaram (tuberculose, que é complicação da AIDS: a AIDS fica embaixo, como causa básica). Parte II: condições que contribuíram sem estar na cadeia, como a gestação.|q-tp20212-119]] [[Em morte por causa externa, a causa básica é a **circunstância** (queda da escada), não a lesão (traumatismo craniano).|q-tp20222-118]] [[Feto que nasce sem nenhum sinal de vida tem **óbito fetal**; a causa no feto (hipóxia intrauterina) vem acima da condição materna (descolamento de placenta).|q-tp20202-118]] [[Toda morte não natural (violenta) tem a declaração emitida pelo **médico legista** do IML, qualquer que seja o tempo entre o evento e a morte.|q-unesp2021-093]]`,
          texto: `- Cadeia de cima para baixo; **causa básica na última linha**. {q-tp20212-119}
- Causa externa: a **circunstância**. {q-tp20222-118}
- Sem sinal de vida: **óbito fetal**. {q-tp20202-118}
- Morte violenta: **legista**. {q-unesp2021-093}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["lista-notificacao","anvisa-rdc"],
          questoes: ["q-einstein2022-001","q-einstein2021-048","q-fmabc2025-089","q-sessp2023-084","q-famerp2022-016"],
          prosa: `[[**Isolamento na covid-19**: a regra é gotícula e contato, com N95 em procedimentos geradores de aerossol; a einstein2022-001 respondeu isolamento **semelhante ao de sarampo e varicela** (aerossol).|q-einstein2022-001,q-einstein2021-048]] [[**Norma dos resíduos**: a RDC 306/2004 foi substituída pela **RDC 222/2018**; a fmabc2025-089 ainda citou a 306, e a classe do resíduo comum (D) não mudou.|q-fmabc2025-089]] [[**Atualizações da lista**: a sessp2023-084 aceitou como certo apenas a inclusão de SIM-P e SIM-A com notificação imediata; a lista muda com frequência e a resposta depende do ano da prova.|q-sessp2023-084]] [[**EAPV da covid**: a famerp2022-016 definiu evento adverso como qualquer ocorrência em **até 30 dias**, usando o sistema estadual de São Paulo.|q-famerp2022-016]]`,
          texto: `- Covid: a prova usou **aerossol como sarampo**. {q-einstein2022-001}
- Resíduos: a prova citou a **RDC 306**. {q-fmabc2025-089}
- Lista: depende do **ano**. {q-sessp2023-084}
- EAPV: **30 dias**. {q-famerp2022-016}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: quem age e em quanto tempo",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-vigilancias", titulo: "Vigilâncias e prazos", conferir: true,
          questoes: ["q-unicampdis2023-054","q-didepm-055","q-adap25-044","q-adap25-048","q-tp20222-118"],
          prosa: `[[Cada situação tem um responsável e um prazo.|q-unicampdis2023-054,q-didepm-055,q-adap25-044,q-adap25-048,q-tp20222-118]]

| Situação | Quem age | Como |
|---|---|---|
| Estabelecimento com risco (salão, restaurante) | vigilância sanitária municipal | inspeção, interdição |
| Lote de medicamento contaminado no país | Anvisa | recolhimento nacional |
| Suspeita de sarampo, PFA, raiva, botulismo | vigilância epidemiológica | notificação imediata (24 h) |
| Sífilis ou HIV em gestante, material biológico | vigilância epidemiológica | notificação semanal |
| Morte por causa externa | IML | DO pelo legista; causa básica = circunstância |`,
          texto: `- Estabelecimento: **sanitária**. {q-unicampdis2023-054}
- Lote nacional: **Anvisa**. {q-didepm-055}
- Sarampo: **24 h**. {q-adap25-044}
- Sífilis em gestante: **semanal**. {q-adap25-048}
- Causa externa: **circunstância**. {q-tp20222-118}` },
      ],
    },
  ],
});
