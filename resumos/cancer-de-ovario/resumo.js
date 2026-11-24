/* resumos/cancer-de-ovario/resumo.js — resumo adaptativo de câncer de ovário (ass-caovario):
   fatores de risco e proteção, BRCA e teste genético, ausência de rastreamento, carcinoma da tuba,
   massa anexial suspeita, tumores benignos (cistoadenomas, teratoma, pseudomixoma), carcinoma
   epitelial (quadro, estadiamento, citorredução, laparoscopia de avaliação, quimioterapia), tumor de
   Krukenberg, tumores germinativos (marcadores, cirurgia conservadora); armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- cancer-de-ovario */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "cancer-de-ovario",
  titulo: "Câncer de ovário e massas anexiais",
  assunto: "ass-caovario",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "esmo-esgo-ovario", texto: "ESMO–ESGO — Consensus conference recommendations on ovarian cancer (2019/2024); FIGO 2014 (estadiamento)", lidoEm: null },
    { id: "iota", texto: "IOTA — Simple Rules e modelo ADNEX; O-RADS US (ACR, 2020)", lidoEm: null },
    { id: "nccn", texto: "NCCN — Ovarian Cancer (versões 2026)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição.", questoes: ["q-unifesp2026-100"] },
  ],
  doencas: [
    {
      id: "risco", titulo: "Fatores de risco, genética e rastreamento",
      introducao: `[[A maioria dos carcinomas serosos de alto grau do "ovário" nasce, na verdade, na **fímbria da tuba**, a partir de células que se renovam a cada ovulação. Por isso o risco **sobe com o número de ovulações** (nuliparidade, menarca precoce, menopausa tardia) e **cai com o que as suprime**: gestação, amamentação e **anticoncepcional hormonal**.|q-famema2022-056,q-sessp2023-041,q-adap24-029]]

Veja também: **Câncer de mama**, **Câncer de endométrio**, **Endometriose** e **Climatério**.`,
      fragmentos: [
        { id: "ris-fatores", titulo: "Ovulação, BRCA e teste genético", conferir: true, diretrizes: ["nccn"],
          questoes: ["q-famema2022-056","q-sessp2023-041","q-usprp2026-069"],
          prosa: `[[O **anticoncepcional hormonal** é protetor bem definido; **menarca precoce e menopausa tardia** aumentam o risco (não a menarca tardia). Cerca de 15 a 20% dos casos são hereditários, sobretudo por **BRCA1/BRCA2**.|q-famema2022-056,q-sessp2023-041]] [[Mulher com mãe que teve câncer de ovário e irmã com câncer de mama antes dos 50: **investigação de mutações germinativas** (aconselhamento genético). Só com a mutação confirmada se discute salpingo-ooforectomia redutora de risco.|q-usprp2026-069]]`,
          texto: `- **Anticoncepcional protege**; menarca precoce e menopausa tardia aumentam. {q-famema2022-056,q-sessp2023-041}
- História familiar de ovário/mama: **teste genético** primeiro. {q-usprp2026-069}` },
        { id: "ris-rastreio", titulo: "Não há rastreamento", conferir: true,
          questoes: ["q-sessp2023-041","q-usprp2026-069"],
          prosa: `[[Em mulheres sem sintomas, nem o toque bimanual, nem a **ultrassonografia transvaginal**, nem o **CA-125** reduzem a mortalidade: **não se rastreia** câncer de ovário, nem em quem tem história familiar (nesse caso, teste genético).|q-sessp2023-041,q-usprp2026-069]]`,
          texto: `- **Sem rastreamento** com US ou CA-125. {q-sessp2023-041,q-usprp2026-069}` },
        { id: "ris-tuba", titulo: "Carcinoma da tuba", conferir: true,
          questoes: ["q-adap24-029"],
          prosa: `[[Na mulher com **BRCA1**, **corrimento aquoso intermitente** que alivia uma cólica pélvica (a tuba dilatada se esvazia), com **tubas alongadas** com projeções papilares e CA-125 alto, é **carcinoma da tuba**; a infecção sobreposta dá endometrite.|q-adap24-029]]`,
          texto: `- Corrimento aquoso que alivia a cólica + tubas dilatadas: **câncer de tuba**. {q-adap24-029}` },
      ],
    },
    {
      id: "massa", titulo: "Massa anexial",
      introducao: `[[A maior parte das massas anexiais na mulher em idade fértil é **benigna** (cisto funcional, endometrioma, teratoma); na pós-menopausa, a proporção de câncer sobe. O ultrassom transvaginal com Doppler separa o que pode ser observado do que precisa ir para a cirurgia.|q-usprp2021-066,q-einstein2024-049,q-amrigs2023-040]]`,
      fragmentos: [
        { id: "mas-suspeita", titulo: "O que torna a massa suspeita", conferir: true, diretrizes: ["iota"],
          figuras: [{ arquivo: "figuras/massa-anexial.svg", legenda: "Esquema autoral: sinais ultrassonográficos de benignidade e de malignidade da massa anexial." }],
          casos: ["q-usprp2021-066"],
          questoes: ["q-usprp2021-066","q-einstein2024-049","q-amrigs2023-040"],
          prosa: `[[Tranquilizam: cisto **unilocular de parede fina**, conteúdo homogêneo sem vegetação, **sombra acústica** (teratoma), **sem fluxo**, na menacme com CA-125 normal. Preocupam: **componente sólido irregular**, **septo grosso e vegetações**, **fluxo intenso**, lesão **bilateral**, **ascite e implantes**, pós-menopausa e CA-125 alto.|q-usprp2021-066,q-einstein2024-049]] [[Massa suspeita **não se punciona** (espalharia células no peritônio): vai **inteira para a cirurgia**, retirada em bolsa, com **congelação**. Na jovem, a cirurgia é conservadora (ooforectomia, não histerectomia).|q-einstein2024-049,q-usprp2021-066]] [[O diferencial inclui corpo lúteo hemorrágico, endometrioma, gravidez ectópica (que nem sempre se opera: há tratamento com metotrexato) e metástases.|q-amrigs2023-040]]`,
          texto: `- Septo grosso, vegetação, fluxo, ascite, pós-menopausa: **suspeita**. {q-usprp2021-066,q-einstein2024-049}
- Suspeita: **cirurgia com congelação**, sem punção. {q-einstein2024-049,q-usprp2021-066}
- Ectópica **nem sempre** é cirúrgica. {q-amrigs2023-040}` },
        { id: "mas-benignos", titulo: "Cistoadenomas, teratoma e pseudomixoma", conferir: true,
          questoes: ["q-unesp2026-040","q-famerp2022-036","q-sirio2022-067","q-tp20241-040","q-unesp2024-031"],
          prosa: `[[O **cistoadenoma seroso** costuma ser **unilocular, de septos finos**; o **mucinoso** é multiloculado, cresce muito e quase sempre é **unilateral**.|q-unesp2026-040]] [[A ruptura do tumor **mucinoso** espalha mucina que continua sendo produzida no peritônio: **pseudomixoma peritoneal**, com distensão e dor meses depois.|q-famerp2022-036,q-sirio2022-067]] [[O **teratoma maduro** (cisto dermoide) é o tumor germinativo benigno mais comum: cisto com gordura, cabelo e calcificação (sombra acústica) na jovem.|q-tp20241-040,q-unesp2024-031]]`,
          texto: `- Seroso: **unilocular, septo fino**; mucinoso: unilateral, grande. {q-unesp2026-040}
- Mucinoso roto: **pseudomixoma peritoneal**. {q-famerp2022-036,q-sirio2022-067}
- Benigno germinativo mais comum: **teratoma maduro**. {q-tp20241-040,q-unesp2024-031}` },
      ],
    },
    {
      id: "epitelial", titulo: "Carcinoma epitelial",
      introducao: `[[O carcinoma epitelial, quase sempre **seroso de alto grau**, espalha-se cedo pela superfície do peritônio: células soltas na cavidade implantam no omento, no diafragma e nas alças. Por isso é descoberto tarde, com **ascite, distensão, saciedade precoce e perda de peso**, sintomas que parecem digestivos.|q-unifesp2022-024,q-tp20202-088,q-tp20232-098]]`,
      fragmentos: [
        { id: "epi-quadro", titulo: "Quadro clínico", conferir: true,
          casos: ["q-unesp2024-040"],
          questoes: ["q-unifesp2022-024","q-tp20202-088","q-unesp2024-040","q-adap21-066"],
          prosa: `[[Mulher na pós-menopausa com "dispepsia" que não melhora, **ascite**, **massas anexiais bilaterais sólido-císticas**, omento espessado e **CA-125 alto**: **adenocarcinoma seroso de ovário**.|q-unifesp2022-024,q-tp20202-088,q-unesp2024-040,q-adap21-066]]`,
          texto: `- Pós-menopausa, ascite, massas bilaterais, CA-125 alto: **carcinoma seroso**. {q-unifesp2022-024,q-tp20202-088,q-unesp2024-040,q-adap21-066}` },
        { id: "epi-estadio", titulo: "Estadiamento", conferir: true, diretrizes: ["esmo-esgo-ovario"],
          questoes: ["q-scmsp2021-066","q-usp2024-104"],
          prosa: `[[O estadiamento FIGO é **cirúrgico**: **I** limitado aos ovários (**IA** um ovário, **IB** os dois, cápsula intacta, lavado negativo; IC com ruptura ou lavado positivo); **II** pelve; **III** **implantes peritoneais** fora da pelve ou linfonodos retroperitoneais; **IV** metástase à distância (derrame pleural com células, fígado). O **implante peritoneal** é o que piora o prognóstico, mais que o volume da ascite.|q-scmsp2021-066,q-usp2024-104]]`,
          texto: `- Dois ovários, cápsula intacta, lavado negativo: **IB**. {q-scmsp2021-066}
- Pior prognóstico: **implante peritoneal** (estádio III). {q-usp2024-104}` },
        { id: "epi-cirurgia", titulo: "Citorredução e quimioterapia", conferir: true, diretrizes: ["esmo-esgo-ovario","nccn"],
          questoes: ["q-tp20232-098","q-tp20261-097","q-unesp2023-033","q-iamspe2025-047","q-adap21-066","q-unifesp2022-024"],
          prosa: `[[O que mais muda a sobrevida é a **cirurgia citorredutora** que não deixa **nenhuma doença residual**, seguida de **carboplatina e paclitaxel**. Massa anexial suspeita com ascite vai para **cirurgia com estadiamento e congelação**; biópsia por agulha não é o caminho.|q-tp20232-098,q-tp20261-097,q-adap21-066,q-unifesp2022-024]] [[Quando a doença parece **irressecável** (fígado, muitas alças, mesentério), a **laparoscopia** confirma o diagnóstico com biópsia e avalia se dá para ressecar tudo; se não dá, faz-se **quimioterapia neoadjuvante** e cirurgia de intervalo.|q-unesp2023-033,q-iamspe2025-047]]`,
          texto: `- **Citorredução sem doença residual + carboplatina/paclitaxel**. {q-tp20232-098,q-tp20261-097,q-adap21-066,q-unifesp2022-024}
- Parece irressecável: **laparoscopia com biópsia** → neoadjuvante. {q-unesp2023-033,q-iamspe2025-047}` },
        { id: "epi-krukenberg", titulo: "Tumor de Krukenberg", conferir: true,
          questoes: ["q-unicampdis2022-042"],
          prosa: `[[Massas ovarianas **bilaterais sólidas** com células em anel de sinete são **metástase** de tumor do trato digestivo, sobretudo do **estômago** (tumor de **Krukenberg**); a investigação procura o primário com endoscopia.|q-unicampdis2022-042]]`,
          texto: `- Ovários sólidos bilaterais, anel de sinete: **Krukenberg** (estômago). {q-unicampdis2022-042}` },
      ],
    },
    {
      id: "germinativos", titulo: "Tumores germinativos",
      introducao: `[[Na **criança, adolescente e jovem**, massa ovariana **sólida e grande** é tumor de **células germinativas**. Eles crescem rápido mas são muito sensíveis à quimioterapia, e produzem **marcadores** que denunciam o tipo.|q-usprp2022-054,q-unesp2022-037,q-usprp2027-017]]`,
      fragmentos: [
        { id: "ger-diagnostico", titulo: "Marcadores e tipos", conferir: true,
          questoes: ["q-usprp2022-054","q-unesp2022-037","q-usprp2027-017"],
          prosa: `[[Massa sólida na jovem pede **beta-hCG, alfafetoproteína e LDH**. **Alfafetoproteína** alta: tumor do **seio endodérmico** (saco vitelino); **LDH** alta com AFP e hCG normais: **disgerminoma**, o germinativo maligno mais comum; hCG: coriocarcinoma.|q-usprp2022-054,q-unesp2022-037,q-usprp2027-017]]`,
          texto: `- Jovem com massa sólida: **AFP, beta-hCG, LDH**. {q-usprp2022-054,q-unesp2022-037}
- **LDH alta** com AFP/hCG normais: **disgerminoma**. {q-usprp2027-017}` },
        { id: "ger-tratamento", titulo: "Cirurgia que preserva a fertilidade", conferir: true, diretrizes: ["esmo-esgo-ovario"],
          questoes: ["q-adap22-024","q-adap26-100","q-scmsp2026-068"],
          prosa: `[[Como o tumor germinativo responde muito bem à quimioterapia (BEP), a cirurgia **preserva o útero e o ovário contralateral**: **salpingo-ooforectomia unilateral com estadiamento**, e quimioterapia se o estádio pedir.|q-adap22-024,q-adap26-100]] [[A preservação da fertilidade também é possível no tumor **borderline**, mesmo em estádios mais avançados, e no carcinoma epitelial inicial selecionado.|q-scmsp2026-068]]`,
          texto: `- Germinativo: **salpingo-ooforectomia unilateral + estadiamento**. {q-adap22-024,q-adap26-100}
- Borderline: **fertilidade preservável**. {q-scmsp2026-068}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["esmo-esgo-ovario"],
          questoes: ["q-scmsp2021-066","q-tp20232-098","q-unesp2023-033","q-scmsp2026-068"],
          prosa: `[[**IB sem quimioterapia**: só os tumores de **baixo grau** em estádio IA/IB dispensam adjuvância; o seroso de alto grau recebe quimioterapia. A scmsp2021-066 cobrou cirurgia e **conduta expectante**.|q-scmsp2021-066]] [[**Laparotomia ou laparoscopia?** Com doença ressecável, laparotomia com citorredução (tp20232-098); com doença extensa no andar superior, **laparoscopia** para biópsia e avaliar ressecabilidade (unesp2023-033).|q-tp20232-098,q-unesp2023-033]] [[**Preservar fertilidade**: a scmsp2026-068 aceitou o borderline nos estádios I a III; no carcinoma epitelial, só em estádio I inicial selecionado.|q-scmsp2026-068]]`,
          texto: `- IB: a prova cobrou **expectante**; alto grau recebe quimio. {q-scmsp2021-066}
- Ressecável: **laparotomia**; extenso: **laparoscopia**. {q-tp20232-098,q-unesp2023-033}
- Borderline I–III: fertilidade. {q-scmsp2026-068}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: tumores do ovário",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-tumores", titulo: "Idade, aspecto, marcador e conduta", conferir: true,
          questoes: ["q-tp20202-088","q-usprp2022-054","q-tp20241-040","q-unesp2022-037"],
          prosa: `[[Idade e aspecto da massa apontam o tipo.|q-tp20202-088,q-usprp2022-054,q-tp20241-040,q-unesp2022-037]]

| Tumor | Idade | Aspecto | Marcador | Conduta |
|---|---|---|---|---|
| Carcinoma seroso | pós-menopausa | sólido-cístico bilateral, ascite, implantes | CA-125 | citorredução + carboplatina/paclitaxel |
| Germinativo maligno | criança e jovem | sólido, grande | AFP, hCG, LDH | ooforectomia unilateral + BEP |
| Teratoma maduro | jovem | cisto com gordura e calcificação | — | cistectomia |
| Cistoadenoma mucinoso | adulta | multiloculado, unilateral, enorme | — | ooforectomia sem romper |`,
          texto: `- Seroso: **CA-125, citorredução**. {q-tp20202-088}
- Germinativo: **AFP/hCG/LDH**. {q-usprp2022-054,q-unesp2022-037}
- Teratoma: **benigno, jovem**. {q-tp20241-040}` },
      ],
    },
  ],
});
