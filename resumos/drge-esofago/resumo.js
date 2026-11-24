/* resumos/drge-esofago/resumo.js — resumo adaptativo de DRGE e distúrbios motores do esôfago (ass-drge):
   mecanismo do refluxo, diagnóstico (prova terapêutica, alarme, endoscopia, pHmetria, manometria), tratamento
   clínico e cirúrgico, Barrett, hérnia de hiato, refluxo no lactente e esofagite eosinofílica, disfagia,
   acalasia e megaesôfago chagásico, espasmo e Mallory-Weiss, armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- drge-esofago */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "drge-esofago",
  titulo: "DRGE e distúrbios motores do esôfago",
  assunto: "ass-drge",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "acg-drge", texto: "ACG — Clinical guideline for the diagnosis and management of gastroesophageal reflux disease (Katz et al., Am J Gastroenterol 2022) e Consenso de Lyon 2.0 (2023)", lidoEm: null },
    { id: "acg-barrett", texto: "ACG — Diagnosis and management of Barrett's esophagus: an updated guideline (Shaheen et al., 2022)", lidoEm: null },
    { id: "acg-acalasia", texto: "ACG — Clinical guidelines: diagnosis and management of achalasia (Vaezi et al., 2020) e classificação de Chicago 4.0 (2021)", lidoEm: null },
    { id: "naspghan-rge", texto: "NASPGHAN/ESPGHAN — Pediatric gastroesophageal reflux clinical practice guidelines (Rosen et al., 2018)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "drge", titulo: "Doença do refluxo gastroesofágico",
      introducao: `[[O refluxo acontece sobretudo quando o esfíncter inferior do esôfago relaxa fora da deglutição (relaxamentos transitórios), o que piora com refeição volumosa, gordura, álcool, cigarro e obesidade (a pressão do abdome empurra o estômago). A hérnia de hiato tira o esfíncter do abraço do diafragma e deixa um bolsão de ácido acima dele.|q-usprp2021-105,q-sessp2022-034,q-amrigs2024-028]] [[Pirose e regurgitação típicas, sem alarme, bastam para tratar: o inibidor de bomba por 4 a 8 semanas é teste e tratamento ao mesmo tempo. Tosse crônica, rouquidão e despertar com engasgo podem ser refluxo (manifestações atípicas).|q-003,q-amrigs2020-016,q-unifesp2024-027,q-tp20232-026]]

Veja também: **Doença péptica** (dispepsia e *H. pylori*), **Malária, leishmanioses e doença de Chagas** (megaesôfago chagásico), **Micoses sistêmicas e oportunistas** (esofagite por *Candida*) e **Obesidade** (cirurgia bariátrica) quando houver resumo.`,
      fragmentos: [
        { id: "drge-diagnostico", titulo: "Quando tratar direto e quando investigar", conferir: true, diretrizes: ["acg-drge"],
          casos: ["q-tp20202-031"],
          questoes: ["q-usprp2021-105","q-003","q-amrigs2020-016","q-unifesp2024-027","q-tp20232-026","q-tp20202-031","q-adap23-004","q-uspsp4-020","q-tp20241-023","q-uspsp2-084","q-unesp2022-048","q-fmabc2021-007","q-amrigs2024-029","q-unesp2025-061","q-usp2025-029","q-unesp2021-061"],
          prosa: `[[Sinal de alarme (disfagia, odinofagia, perda de peso, anemia, sangramento, vômitos, idade acima de 50 a 60 anos com sintoma novo) ou falha do tratamento pedem endoscopia antes de qualquer prova terapêutica: o que se procura é câncer, estenose e esofagite grave.|q-adap23-004,q-uspsp4-020,q-tp20241-023,q-uspsp2-084]] [[A endoscopia confirma a doença quando mostra esofagite Los Angeles B, C ou D (Consenso de Lyon 2.0, 2023; a versão de 2018 aceitava só C e D), Barrett longo ou estenose péptica; esofagite A é inconclusiva. Endoscopia normal com sintoma que não cede ao inibidor de bomba pede pHmetria (o padrão de exposição ácida), e a manometria localiza o esfíncter para o cateter e afasta distúrbio motor antes da cirurgia.|q-unesp2022-048,q-fmabc2021-007,q-amrigs2024-029,q-unesp2025-061,q-usp2025-029,q-unesp2021-061]]`,
          texto: `- Mecanismo: **relaxamento transitório do esfíncter**. {q-usprp2021-105}
- Pirose sem alarme: **IBP por 4–8 semanas e medidas comportamentais**. {q-003,q-amrigs2020-016}
- Tosse crônica com pirose: **teste terapêutico com IBP**. {q-unifesp2024-027}
- Engasgo noturno, regurgitação e tosse: **DRGE com esofagite**. {q-tp20232-026}
- Hérnia no esofagograma: **pirose e desconforto retroesternal**. {q-tp20202-031}
- Disfagia e perda de peso: **endoscopia com biópsias primeiro**. {q-adap23-004,q-uspsp4-020}
- Sem melhora com medidas: **endoscopia**. {q-tp20241-023}
- Refratário com tosse e rouquidão: **endoscopia com biópsias**. {q-uspsp2-084}
- Conclusivo: **esofagite Los Angeles C**. {q-unesp2022-048,q-fmabc2021-007}
- Padrão-ouro: **pHmetria de 24 h**. {q-amrigs2024-029}
- Endoscopias normais e falha do omeprazol: **pHmetria**. {q-unesp2025-061}
- Sintoma persistente com esofagite A: **manometria e pHmetria**. {q-usp2025-029}
- Antes da cirurgia: **eletromanometria**. {q-unesp2021-061}` },
        { id: "drge-tratamento", titulo: "Tratamento clínico e cirúrgico", conferir: true, diretrizes: ["acg-drge"],
          casos: ["q-uspsp1-044"],
          questoes: ["q-sessp2022-034","q-fmabc2025-011","q-sirio2022-034","q-adap21-105","q-uspsp1-044","q-uspsp1-036","q-iamspe2023-027","q-scmsp2026-007"],
          prosa: `[[O tratamento começa por perder peso, evitar refeição grande e deitar logo depois, elevar a cabeceira, parar de fumar, e inibidor de bomba de prótons em jejum antes do café; a hérnia pequena por deslizamento não muda isso. O inibidor de bomba usado por anos favorece supercrescimento bacteriano do intestino delgado, assim como drogas que lentificam o trânsito (semaglutida).|q-sessp2022-034,q-fmabc2025-011,q-sirio2022-034,q-scmsp2026-007]] [[A cirurgia antirrefluxo (hiatoplastia com fundoplicatura) serve a quem responde ao remédio mas não quer usá-lo para sempre, a quem continua regurgitando (o remédio tira o ácido, não o refluxo) e a quem tem esofagite grave ou hérnia grande. Na fundoplicatura de Nissen curta e frouxa, a válvula envolve o esôfago e a sutura fica na frente dele. No obeso com IMC alto, o bypass gástrico trata a obesidade e o refluxo; o sleeve piora o refluxo.|q-adap21-105,q-uspsp1-044,q-uspsp1-036,q-iamspe2023-027]]`,
          texto: `- Obeso com hérnia pequena e esofagite leve: **IBP, perda de peso e dieta**. {q-sessp2022-034,q-fmabc2025-011}
- Jovem obeso tabagista com esofagite: **tratamento clínico inicial**. {q-sirio2022-034}
- Regurgitação persistente com esofagite e hérnia: **fundoplicatura laparoscópica**. {q-adap21-105}
- Hérnia e esofagite importante no esofagograma: **candidato à cirurgia**. {q-uspsp1-044}
- Obesa com esofagite C refratária: **bypass gástrico**. {q-uspsp1-036}
- Nissen *short floppy*: **sutura anterior ao esôfago**. {q-iamspe2023-027}
- Supercrescimento bacteriano: **IBP e semaglutida**. {q-scmsp2026-007}` },
        { id: "drge-barrett", titulo: "Esôfago de Barrett", conferir: true, diretrizes: ["acg-barrett"],
          casos: ["q-tp20222-012"],
          questoes: ["q-tp20222-012","q-einstein2022-030","q-unifesp2023-004","q-amrigs2024-034","q-amrigs2025-028"],
          prosa: `[[A agressão crônica pelo refluxo troca o epitélio escamoso do esôfago distal por colunar com células caliciformes (metaplasia intestinal): mucosa cor de salmão subindo acima da junção. É precursor do adenocarcinoma, mas o risco absoluto por ano é baixo. Classifica-se em curto (menos de 3 cm) e longo (3 cm ou mais).|q-tp20222-012,q-amrigs2025-028,q-amrigs2024-034]] [[Sem displasia: inibidor de bomba e nova endoscopia com biópsias em 3 a 5 anos (o Barrett sozinho não é indicação de cirurgia). Com displasia de alto grau ou câncer intramucoso: tratamento endoscópico (ressecção e ablação por radiofrequência).|q-einstein2022-030,q-unifesp2023-004,q-amrigs2024-034,q-amrigs2025-028]]`,
          texto: `- Biópsia: **metaplasia epitelial colunar**. {q-tp20222-012}
- Barrett sem displasia: **omeprazol**. {q-einstein2022-030}
- Próxima endoscopia: **3 a 5 anos**. {q-unifesp2023-004}
- Ablação por radiofrequência: **erradica displasia de alto grau**. {q-amrigs2024-034}
- Barrett **curto < 3 cm, longo ≥ 3 cm**; aparece também com refluxo não ácido, e não é indicação absoluta de cirurgia. {q-amrigs2025-028}` },
        { id: "drge-hernia", titulo: "Hérnia de hiato", conferir: true,
          questoes: ["q-amrigs2024-028","q-amrigs2024-036","q-usp2026-046"],
          prosa: `[[O abdome tem pressão positiva e o tórax, negativa: é essa diferença que puxa o estômago para cima pelo hiato. Tipo I, por deslizamento (a junção sobe), é a comum e ligada ao refluxo; tipo II, paraesofágica (o fundo sobe ao lado do esôfago, a junção fica no lugar); III, mista; IV, com outras vísceras. As paraesofágicas dão saciedade precoce, disfagia e dor torácica e podem torcer (volvo); a assintomática ou pouco sintomática pode ser seguida.|q-amrigs2024-028,q-amrigs2024-036,q-usp2026-046]]`,
          texto: `- Errada: a pressão **positiva no tórax** facilita a migração. {q-amrigs2024-028}
- Paraesofágica: **saciedade precoce, disfagia e dor torácica**. {q-amrigs2024-036}
- Hérnia tipo III pouco sintomática que melhorou: **seguimento**. {q-usp2026-046}` },
      ],
    },
    {
      id: "pediatria", titulo: "Refluxo no lactente e esofagite eosinofílica",
      introducao: `[[O lactente tem estômago pequeno, dieta líquida, esfíncter imaturo e fica deitado: regurgitar é normal e passa até 12 a 18 meses. O lactente feliz que regurgita e cresce bem tem refluxo fisiológico e não precisa de exame nem remédio.|q-amrigs2023-074,q-tp20212-046,q-fmabc2021-100]]`,
      fragmentos: [
        { id: "ped-refluxo", titulo: "Refluxo fisiológico, doença e sinais de alerta", conferir: true, diretrizes: ["naspghan-rge"],
          questoes: ["q-amrigs2023-074","q-tp20212-046","q-fmabc2021-100","q-usprp2024-027","q-unicamp2023-037","q-fmabc2026-047"],
          prosa: `[[Tranquiliza-se a mãe e mantém-se o aleitamento; inibidor de bomba, antagonista H2 e pHmetria não estão indicados no refluxo fisiológico. No prematuro, regurgitação que aumenta é refluxo, não estenose de piloro (que dá vômito em jato, sem bile, por volta da 3ª semana).|q-amrigs2023-074,q-tp20212-046,q-fmabc2021-100,q-usprp2024-027]] [[Vômitos que pioram, irritabilidade e falha da dieta e do remédio pedem investigar causa anatômica com radiografia contrastada de esôfago, estômago e duodeno (má rotação, estenose).|q-unicamp2023-037]] [[Criança com disfagia, comida que trava e seletividade alimentar, sobretudo atópica, pode ter esofagite eosinofílica: endoscopia com biópsias de vários níveis do esôfago.|q-fmabc2026-047]]`,
          texto: `- Lactente bem que regurgita: **tranquilizar e manter o aleitamento**. {q-amrigs2023-074,q-tp20212-046,q-fmabc2021-100}
- Prematura com regurgitações: **refluxo gastroesofágico**. {q-usprp2024-027}
- Vômitos progressivos apesar de tudo: **radiografia contrastada**. {q-unicamp2023-037}
- Comida parada e seletividade: **esofagite eosinofílica; biópsias**. {q-fmabc2026-047}` },
      ],
    },
    {
      id: "motilidade", titulo: "Disfagia e distúrbios motores",
      introducao: `[[Disfagia para sólidos que progride para líquidos em semanas a meses, com perda de peso, em fumante e etilista, é câncer até prova em contrário: o primeiro exame é a endoscopia com biópsia. Disfagia para sólidos e líquidos desde o começo, lenta, por anos, com regurgitação e necessidade de água para empurrar, sugere distúrbio motor (acalasia).|q-tp20232-062,q-tp20241-062,q-einstein2026-019]] [[Na acalasia os neurônios inibitórios do plexo mioentérico se perdem (idiopática ou pela doença de Chagas, que destrói o plexo): o esfíncter inferior não relaxa e o corpo do esôfago perde a peristalse. O alimento para em cima, o esôfago dilata e a imagem é de "bico de pássaro" no fim.|q-scmsp2021-025,q-uspsp1-046,q-iamspe2022-023]]`,
      fragmentos: [
        { id: "mot-alarme", titulo: "Disfagia com sinal de alarme", conferir: true,
          questoes: ["q-tp20232-062","q-tp20241-062","q-einstein2026-019"],
          prosa: `[[Mesmo em quem veio de área de Chagas, se a disfagia é recente e progressiva no idoso fumante, a endoscopia vem primeiro para afastar obstrução mecânica (câncer), que também imita acalasia (pseudoacalasia).|q-tp20232-062,q-tp20241-062,q-einstein2026-019]]`,
          texto: `- Disfagia com emagrecimento em fumante: **endoscopia**. {q-tp20232-062,q-tp20241-062}
- Baiano fumante com disfagia de 4 meses: **endoscopia para afastar obstrução mecânica**. {q-einstein2026-019}` },
        { id: "mot-acalasia", titulo: "Acalasia e megaesôfago", conferir: true, diretrizes: ["acg-acalasia"],
          figuras: [{ arquivo: "figuras/megaesofago.svg", legenda: "Esquema autoral: graus do megaesôfago no esofagograma e o tratamento de cada um." }],
          casos: ["q-uspsp4-064","q-usp2022-076","q-iamspe2022-023"],
          questoes: ["q-scmsp2021-025","q-usp2022-076","q-famema2022-063","q-tp20202-065","q-unesp2025-062","q-famerp2023-058","q-unicampdis2023-017","q-uspsp1-046","q-uspsp5-063","q-uspsp4-064","q-fmabc2024-038","q-iamspe2022-023"],
          prosa: `[[A investigação junta endoscopia (afasta câncer; mostra resíduo e às vezes candidíase), esofagograma baritado (dilatação, bico de pássaro, grau do megaesôfago) e manometria, que confirma: esfíncter que não relaxa e aperistalse (a de alta resolução classifica nos tipos de Chicago). A pHmetria não entra.|q-scmsp2021-025,q-unesp2025-062,q-famerp2023-058,q-unicampdis2023-017,q-uspsp1-046,q-iamspe2022-023]] [[O esofagograma gradua o megaesôfago: I (calibre normal, retenção), II (pequena dilatação, ondas terciárias), III (grande dilatação, pouca atividade, bico de pássaro), IV (dolicomegaesôfago, alongado e dobrado sobre o diafragma).|q-famema2022-063]] [[O tratamento abre o esfíncter: cardiomiotomia de Heller com fundoplicatura parcial (para não causar refluxo) alivia cerca de 90%; a dilatação pneumática com balão é alternativa, com risco de perfuração, por isso começa com balão de 30 mm e progride. Toxina botulínica é para quem não opera. No megaesôfago avançado (IV), esofagectomia.|q-usp2022-076,q-tp20202-065,q-uspsp4-064,q-uspsp5-063,q-fmabc2024-038]]`,
          texto: `- Chagásico com disfagia: **endoscopia, esofagograma e manometria**. {q-scmsp2021-025}
- Dor e regurgitação que melhoram com líquido: **cardiomiotomia e fundoplicatura parcial**. {q-usp2022-076,q-tp20202-065}
- Dilatação, ondas terciárias e bico: **grau III**. {q-famema2022-063}
- Disfagia de 4 anos com candidíase: **acalasia; manometria de alta resolução**. {q-unesp2025-062}
- Endoscopia inespecífica em idoso do interior: **exame contrastado para megaesôfago**. {q-famerp2023-058}
- Exame inicial na disfagia de anos: **esofagograma**. {q-unicampdis2023-017}
- Imagem de bico de pássaro: **acalasia**. {q-uspsp1-046}
- Dilatação pneumática: **perfuração; começar com 30 mm**. {q-uspsp5-063}
- Manometria confirmou acalasia: **cardiomiotomia + fundoplicatura**. {q-uspsp4-064}
- Heller com fundoplicatura: **alívio em cerca de 90%**. {q-fmabc2024-038}
- Sintoma mais provável: **disfagia**. {q-iamspe2022-023}` },
        { id: "mot-outros", titulo: "Espasmo esofagiano e Mallory-Weiss", conferir: true,
          questoes: ["q-famerp2025-071","q-sessp2026-026"],
          prosa: `[[No espasmo esofagiano difuso, contrações prematuras e simultâneas dão disfagia intermitente e dor torácica que imita angina; o esofagograma pode mostrar esôfago em saca-rolhas. A síndrome de Mallory-Weiss é uma laceração longitudinal da mucosa na transição esofagogástrica por vômitos repetidos: sangra e para sozinha em 72 horas na maioria.|q-famerp2025-071,q-sessp2026-026]]`,
          texto: `- Idoso com entalo e dor torácica: **espasmo esofagiano difuso**. {q-famerp2025-071}
- Hematêmese após vômitos, laceração na transição: **autolimitada em 72 h**. {q-sessp2026-026}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["acg-drge"],
          questoes: ["q-amrigs2024-029","q-amrigs2024-036","q-usp2026-046","q-unesp2021-061","q-amrigs2025-028"],
          prosa: `[[**Padrão-ouro**: a pHmetria (sem inibidor de bomba) é o exame de referência para exposição ácida, mas o Consenso de Lyon aceita a endoscopia com esofagite B, C ou D como prova (só C e D na versão de 2018); a amrigs2024-029 cobrou a pHmetria.|q-amrigs2024-029]] [[**Hérnia paraesofágica**: antes se operava toda paraesofágica pelo risco de volvo; hoje a assintomática pode ser seguida e a decisão pesa sintomas e risco cirúrgico. A amrigs2024-036 deu como errada a frase "decisão baseada nos sintomas", e a usp2026-046 indicou seguimento.|q-amrigs2024-036,q-usp2026-046]] [[**Antes da fundoplicatura**: a manometria afasta distúrbio motor grave (acalasia); a pHmetria também é pedida quando a endoscopia não confirma a doença (esofagite A). A unesp2021-061 cobrou só a manometria.|q-unesp2021-061]] [[**Barrett e cirurgia**: a cirurgia antirrefluxo não regride nem previne o Barrett melhor que o remédio; não é indicação absoluta (amrigs2025-028).|q-amrigs2025-028]]`,
          texto: `- pHmetria é referência, mas **Los Angeles B, C ou D já confirma** (Lyon 2.0). {q-amrigs2024-029}
- Paraesofágica assintomática: **pode ser seguida**. {q-amrigs2024-036,q-usp2026-046}
- Pré-operatório: **manometria** (e pHmetria se a endoscopia não confirma). {q-unesp2021-061}
- Barrett **não** é indicação absoluta de cirurgia. {q-amrigs2025-028}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: DRGE × acalasia × câncer",
      introducao: `Resumo dos capítulos para separar as três causas que as provas comparam.`,
      fragmentos: [
        { id: "cmp-esofago", titulo: "Quadro e exame decisivo", conferir: true,
          questoes: ["q-003","q-uspsp1-046","q-tp20241-062","q-unesp2025-062"],
          prosa: `[[O ritmo da disfagia e o sintoma dominante separam as três.|q-003,q-uspsp1-046,q-tp20241-062,q-unesp2025-062]]

| | DRGE | Acalasia | Câncer de esôfago |
|---|---|---|---|
| Sintoma | pirose, regurgitação ácida | disfagia a sólidos e líquidos, regurgitação de alimento | disfagia progressiva sólidos → líquidos |
| Tempo | meses a anos | anos | semanas a meses |
| Peso | estável | cai devagar | cai rápido |
| Exame decisivo | prova com IBP; endoscopia se alarme; pHmetria | manometria (e esofagograma) | endoscopia com biópsia |
| Tratamento | IBP, medidas; fundoplicatura | cardiomiotomia com fundoplicatura parcial; dilatação | oncológico |`,
          texto: `- Pirose típica: **IBP**. {q-003}
- Bico de pássaro: **acalasia**. {q-uspsp1-046}
- Disfagia rápida com perda de peso: **endoscopia**. {q-tp20241-062}
- Confirmar acalasia: **manometria**. {q-unesp2025-062}` },
      ],
    },
  ],
});
