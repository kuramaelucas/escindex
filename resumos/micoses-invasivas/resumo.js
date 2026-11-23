/* resumos/micoses-invasivas/resumo.js — resumo adaptativo de micoses sistêmicas e oportunistas (ass-micosesinvasivas):
   paracoccidioidomicose, histoplasmose, criptococose, candidíase invasiva e esofágica, aspergilose (invasiva e
   aspergiloma), mucormicose, antifúngicos e esporotricose, armadilhas e tabela dos fungos.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- micoses-invasivas */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "micoses-invasivas",
  titulo: "Micoses sistêmicas e oportunistas",
  assunto: "ass-micosesinvasivas",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "consenso-pcm", texto: "II Consenso Brasileiro de Paracoccidioidomicose (Shikanai-Yasuda et al., Epidemiol Serv Saúde 2018;27:e0500001)", lidoEm: null },
    { id: "idsa-candida", texto: "IDSA — Clinical practice guideline for the management of candidiasis: 2016 update (Pappas et al., Clin Infect Dis 2016)", lidoEm: null },
    { id: "idsa-aspergilose", texto: "IDSA — Practice guidelines for the diagnosis and management of aspergillosis: 2016 update (Patterson et al., Clin Infect Dis 2016)", lidoEm: null },
    { id: "oms-criptococo", texto: "OMS — Guidelines for diagnosing, preventing and managing cryptococcal disease among adults, adolescents and children living with HIV (2022)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-gdmicoses-022"] },
  ],
  doencas: [
    {
      id: "pcm", titulo: "Paracoccidioidomicose",
      introducao: `[[O *Paracoccidioides* vive no solo de áreas rurais úmidas e quentes do Sul, Sudeste e Centro-Oeste. Como todo fungo dimórfico, no ambiente é bolor (micélio, com conídios) e no corpo, a 37 °C, vira levedura. Entra por inalação, faz um foco pulmonar com gânglio hilar (complexo primário) que quase sempre cura sozinho, mas o fungo pode ficar latente e reativar décadas depois, até em quem mudou de país. Não passa de pessoa a pessoa.|q-gdmicoses-015,q-gdmicoses-028,q-gdmicoses-036,q-gdmicoses-070,q-gdmicoses-072]] [[É a micose sistêmica mais prevalente no Brasil e predomina em homens adultos lavradores, tabagistas e etilistas; o estrógeno inibe a passagem do conídio para levedura, por isso a mulher adulta adoece pouco.|q-gdmicoses-036,q-gdmicoses-004]] [[Quem controla o fungo é a imunidade celular (Th1, granuloma). Por isso a doença é um espectro: com boa resposta celular, a forma crônica do adulto, lenta e localizada; com resposta fraca (criança, adolescente, HIV), a forma aguda ou juvenil, que invade o sistema fagocítico mononuclear.|q-gdmicoses-007,q-gdmicoses-070,q-gdmicoses-002,q-gdmicoses-028]]

Veja também: **Infecções e infestações da pele** (micoses superficiais e esporotricose completa), **HIV** (criptococose, histoplasmose e pneumocistose na AIDS), **Neutropenia febril** (aspergilose no neutropênico), **Tuberculose** (o principal diferencial) e **Diabetes** (cetoacidose e mucormicose).`,
      fragmentos: [
        { id: "pcm-clinica", titulo: "Formas clínicas e diagnóstico", conferir: true, diretrizes: ["consenso-pcm"],
          questoes: ["q-einstein2023-015","q-gdmicoses-004","q-gdmicoses-007","q-gdmicoses-010","q-gdmicoses-021","q-gdmicoses-025","q-gdmicoses-031","q-gdmicoses-032","q-gdmicoses-046","q-gdmicoses-052","q-gdmicoses-054","q-gdmicoses-057","q-gdmicoses-060","q-gdmicoses-062","q-gdmicoses-063","q-gdmicoses-067","q-gdmicoses-073","q-gdmicoses-002"],
          prosa: `[[A forma crônica do adulto junta pulmão e mucosa: tosse e emagrecimento por meses, infiltrado pulmonar bilateral e simétrico nos campos médios (asa de borboleta) com pouca ausculta, e úlceras de boca, gengiva, lábio e laringe com fundo granuloso e pontilhado hemorrágico (estomatite moriforme), rouquidão e linfonodos cervicais. Imita tuberculose e câncer, e por isso o lavrador tabagista com úlcera oral pede biópsia e radiografia de tórax.|q-einstein2023-015,q-gdmicoses-004,q-gdmicoses-010,q-gdmicoses-025,q-gdmicoses-031,q-gdmicoses-032,q-gdmicoses-052,q-gdmicoses-067,q-gdmicoses-073]] [[A forma aguda ou juvenil é linfática: gânglios grandes que podem fistulizar, baço e fígado aumentados, febre, quase sem pulmão sintomático.|q-gdmicoses-007,q-gdmicoses-062,q-gdmicoses-057]] [[A suprarrenal é alvo frequente: vômitos, dor abdominal, hipotensão e desidratação num paciente com a doença são insuficiência adrenal aguda, tratada com hidrocortisona.|q-gdmicoses-063]] [[O diagnóstico é ver o fungo: no exame direto com KOH (escarro, raspado, gânglio) ou na biópsia corada pela prata, uma levedura grande com vários brotos em volta, como roda de leme. A sorologia (imunodifusão) apoia e serve para acompanhar o tratamento, mas não dá a certeza.|q-gdmicoses-046,q-gdmicoses-054,q-gdmicoses-057,q-gdmicoses-021,q-gdmicoses-060]] [[Na coinfecção com HIV o paciente é mais jovem e urbano, e a doença é mais aguda e disseminada.|q-gdmicoses-002]]`,
          texto: `- Tosse há 5 meses em mineiro do interior: **paracoccidioidomicose**. {q-einstein2023-015,q-gdmicoses-004,q-gdmicoses-010,q-gdmicoses-073}
- Forma aguda: **sistema fagocítico mononuclear**. {q-gdmicoses-007}
- Infiltrado em lavrador e levedura no gânglio: **paracoccidioidomicose**. {q-gdmicoses-021}
- Lesões orais e cutâneas com pontilhado hemorrágico: **paracoccidioidomicose**. {q-gdmicoses-025,q-gdmicoses-031}
- Tosse, odinofagia e lesão oral: **biópsia da lesão oral**. {q-gdmicoses-032,q-gdmicoses-052}
- Lesão de bochecha e palato: **pesquisa direta com KOH**. {q-gdmicoses-046}
- Prata metenamina com brotamentos: **paracoccidioidomicose**. {q-gdmicoses-054}
- Forma juvenil: **KOH com roda de leme no gânglio**. {q-gdmicoses-057}
- Falso: sorologia é o **melhor** exame. {q-gdmicoses-060}
- Jovem rural com gânglio inflamado e baço: **paracoccidioidomicose**. {q-gdmicoses-062}
- Vômitos e hipotensão: **insuficiência adrenal; hidrocortisona**. {q-gdmicoses-063}
- Emagrecimento e feridas: **radiografia de tórax**. {q-gdmicoses-067}
- HIV: pacientes **mais jovens e urbanos**. {q-gdmicoses-002}` },
        { id: "pcm-patogenia", titulo: "Transmissão e imunidade", conferir: true,
          questoes: ["q-gdmicoses-015","q-gdmicoses-028","q-gdmicoses-036","q-gdmicoses-070","q-gdmicoses-072"],
          prosa: `[[A infecção é inalatória e não contagiosa; a doença pode aparecer anos depois, por reativação do foco latente, e a gravidade acompanha a resposta celular do hospedeiro.|q-gdmicoses-015,q-gdmicoses-070,q-gdmicoses-072,q-gdmicoses-028]]`,
          texto: `- Contaminação **inalatória**. {q-gdmicoses-015}
- Imunopatogenia: **inalação, imunidade inata e celular**. {q-gdmicoses-028}
- Sul e Sudeste, **homens**, atividade rural. {q-gdmicoses-036}
- Falso: transmissão **inter-humana**. {q-gdmicoses-070}
- Doença em país não endêmico: **reinfecção endógena**. {q-gdmicoses-072}` },
        { id: "pcm-tratamento", titulo: "Tratamento", conferir: true, diretrizes: ["consenso-pcm"],
          questoes: ["q-gdmicoses-003","q-gdmicoses-017","q-gdmicoses-039","q-gdmicoses-053","q-gdmicoses-068","q-gdmicoses-051"],
          prosa: `[[O itraconazol é a primeira escolha nas formas leves e moderadas (cerca de 6 a 12 meses); o sulfametoxazol-trimetoprima é a alternativa barata e a opção quando o itraconazol não pode ser usado, por mais tempo. A anfotericina B fica para as formas graves, disseminadas, do sistema nervoso ou no imunodeprimido grave, até a melhora.|q-gdmicoses-068,q-gdmicoses-039,q-gdmicoses-053,q-gdmicoses-003,q-gdmicoses-051,q-gdmicoses-017]]`,
          texto: `- Lavrador tabagista com lesões e infiltrado (a prova): **sulfametoxazol-trimetoprima**. {q-gdmicoses-003}
- Anfotericina B inicial: **imunocomprometimento grave, doença fatal ou SNC**. {q-gdmicoses-017}
- Levedura com brotamento no escarro: **itraconazol por 6 meses**. {q-gdmicoses-039,q-gdmicoses-053}
- Primeira opção no consenso: **itraconazol**. {q-gdmicoses-068}
- Sulfametoxazol-trimetoprima 800/160 mg 2×/dia: **opção adequada**. {q-gdmicoses-051}` },
      ],
    },
    {
      id: "histo-cripto", titulo: "Histoplasmose e criptococose",
      introducao: `[[O *Histoplasma* cresce no solo enriquecido por fezes de morcego e de aves: cavernas, galinheiros, forros e demolições. Quem inala muitos esporos de uma vez tem uma pneumonia aguda com micronódulos difusos que costuma curar sem remédio; no imunodeprimido (AIDS com CD4 baixo) a levedura, que vive dentro do macrófago, se espalha para fígado, baço, medula e pele.|q-gdmicoses-009,q-gdmicoses-041,q-gdmicoses-047,q-gdmicoses-019,q-gdmicoses-042]] [[O *Cryptococcus neoformans* vem das fezes de pombo; tem cápsula de polissacarídeo que o protege do macrófago e é neurotrópico: na AIDS é a principal infecção fúngica grave e a causa mais comum de meningite fúngica. O *C. gattii* vem de árvores e atinge mais imunocompetentes, com massas (criptococomas) no pulmão e no cérebro.|q-gdmicoses-014,q-gdmicoses-012,q-gdmicoses-016,q-gdmicoses-018]]`,
      fragmentos: [
        { id: "hc-histoplasmose", titulo: "Histoplasmose", conferir: true,
          questoes: ["q-gdmicoses-009","q-gdmicoses-041","q-gdmicoses-047","q-gdmicoses-019","q-gdmicoses-006","q-gdmicoses-014"],
          prosa: `[[Febre, tosse e sibilos depois de limpar demolição, ou micronódulos difusos que melhoram sem tratamento, sugerem histoplasmose aguda; o agente vive no solo superficial, e a doença não é zoonose transmitida pelo animal. A lesão cutânea primária é rara (a pele aparece na forma disseminada).|q-gdmicoses-041,q-gdmicoses-047,q-gdmicoses-009,q-gdmicoses-006]] [[Como parasita o macrófago, a forma disseminada aumenta fígado e baço.|q-gdmicoses-019]]`,
          texto: `- Caverna no Brasil: **leptospirose, histoplasmose e hantavirose**. {q-gdmicoses-009}
- Limpeza de demolição com febre e sibilos: **histoplasmose**. {q-gdmicoses-041}
- Micronódulos que curam sozinhos: agente nas **camadas superficiais do solo**. {q-gdmicoses-047}
- Hepatomegalia infecciosa: **histoplasmose** (e doença granulomatosa crônica). {q-gdmicoses-019}
- Falso: lesão cutânea primária **comum** na histoplasmose. {q-gdmicoses-006}
- Pombos: **histoplasmose e criptococose**. {q-gdmicoses-014}` },
        { id: "hc-criptococose", titulo: "Criptococose", conferir: true, diretrizes: ["oms-criptococo"],
          questoes: ["q-gdmicoses-012","q-gdmicoses-016","q-gdmicoses-018","q-gdmicoses-042","q-gdmicoses-071"],
          prosa: `[[A meningite criptocócica é subaguda, com cefaleia e pressão do líquor alta; a tinta nanquim mostra a levedura com halo (cápsula) e o antígeno criptocócico confirma. O tratamento tem indução com anfotericina B e flucitosina (o fluconazol isolado não basta na indução), seguida de consolidação e manutenção com fluconazol, e punções de alívio da pressão.|q-gdmicoses-071,q-gdmicoses-042,q-gdmicoses-016]] [[No paciente com AIDS, adenomegalia, infiltrado intersticial e meningite juntos apontam para criptococose disseminada, a infecção fúngica invasiva grave mais comum na AIDS.|q-gdmicoses-018,q-gdmicoses-012]]`,
          texto: `- Infecção fúngica invasiva mais comum na AIDS: **criptococose disseminada**. {q-gdmicoses-012}
- *C. gattii* × *C. neoformans*: **afirmativas 2, 3 e 4**. {q-gdmicoses-016}
- AIDS com adenomegalia, pulmão e meningite: ***Cryptococcus neoformans***. {q-gdmicoses-018}
- Falso: fluconazol **isolado** na indução da meningite. {q-gdmicoses-042}
- Disseminada: **anfotericina B com flucitosina**. {q-gdmicoses-071}` },
      ],
    },
    {
      id: "candida", titulo: "Candidíase",
      introducao: `[[A *Candida* é da flora da boca, do intestino e da pele; vira doença quando a barreira ou a imunidade falham. Na mucosa (boca, esôfago) o que falta é a imunidade celular: AIDS, corticoide inalado, diabetes. No sangue a porta é o cateter e o intestino, depois de muitos antibióticos, nutrição parenteral, cirurgia abdominal e internação longa em UTI.|q-gdmicoses-023,q-gdmicoses-043,q-gdmicoses-055,q-gdmicoses-040]]`,
      fragmentos: [
        { id: "can-esofago", titulo: "Esofagite", conferir: true,
          questoes: ["q-gdmicoses-023","q-gdmicoses-027","q-gdmicoses-029","q-gdmicoses-043","q-gdmicoses-045"],
          prosa: `[[A esofagite por *Candida* é a esofagite infecciosa mais comum: odinofagia e disfagia, placas brancas na endoscopia. Em quem usa corticoide inalado ou tem AIDS, trata-se com fluconazol oral, e na AIDS o fluconazol empírico é aceito antes da endoscopia; se não melhora, procura-se citomegalovírus (úlceras grandes e profundas, inclusões em olho de coruja) e herpes.|q-gdmicoses-023,q-gdmicoses-027,q-gdmicoses-029,q-gdmicoses-043,q-gdmicoses-045]]`,
          texto: `- DPOC com corticoide inalado e odinofagia: **esofagite por *Candida***. {q-gdmicoses-023}
- Agente mais comum da esofagite fúngica: ***Candida***. {q-gdmicoses-027}
- Asmática com esofagite por *Candida*: **fluconazol**. {q-gdmicoses-029}
- AIDS com odinofagia sem endoscopia: **fluconazol empírico**. {q-gdmicoses-043}
- Placas → **pseudo-hifas de *Candida***; úlceras distais → **inclusões de citomegalovírus**. {q-gdmicoses-045}` },
        { id: "can-invasiva", titulo: "Candidemia e candidíase invasiva", conferir: true, diretrizes: ["idsa-candida"],
          questoes: ["q-gdmicoses-020","q-gdmicoses-026","q-gdmicoses-040","q-gdmicoses-044","q-gdmicoses-055","q-gdmicoses-001"],
          prosa: `[[Candida no sangue nunca é contaminação: trata-se sempre, tira-se o cateter (a levedura forma biofilme nele) e faz-se fundo de olho e controle de hemoculturas. A equinocandina (caspofungina, micafungina) é a escolha inicial no paciente grave, instável ou com uso prévio de azol, e para a *C. glabrata* e a *C. krusei*, menos sensíveis ou resistentes ao fluconazol; o fluconazol serve para o paciente estável com espécie sensível. Prótese infectada por *Candida* geralmente tem de ser retirada.|q-gdmicoses-020,q-gdmicoses-026,q-gdmicoses-040,q-gdmicoses-044,q-gdmicoses-055]] [[Nos transplantados, os fungos oportunistas mais comuns são *Candida* e *Aspergillus*.|q-gdmicoses-001]]`,
          texto: `- *C. glabrata* no sangue: **caspofungina**. {q-gdmicoses-020}
- Levedura no sangue de lúpica estável com cateter (a prova): **fluconazol**. {q-gdmicoses-026}
- *C. albicans* com cateter (a prova): **retirar o cateter e fluconazol venoso**. {q-gdmicoses-040}
- Prótese infectada por *Candida*: **retirar**. {q-gdmicoses-044}
- UTI longa, antibióticos e nutrição parenteral: **caspofungina**. {q-gdmicoses-055}
- Transplantados: ***Candida* e *Aspergillus***. {q-gdmicoses-001}` },
      ],
    },
    {
      id: "fungos-filamentosos", titulo: "Aspergilose e mucormicose",
      introducao: `[[O *Aspergillus* é bolor do ar: todo mundo inala, e o macrófago e o neutrófilo o limpam. Sem neutrófilos por muito tempo (leucemia, transplante de medula, corticoide em dose alta), a hifa invade a parede dos vasos do pulmão, trombosa e infarta: nódulo com halo de vidro fosco (hemorragia em volta) e, na recuperação dos neutrófilos, o crescente aéreo. Num pulmão com cavidade antiga (tuberculose tratada), o fungo cresce sem invadir e forma uma bola, o aspergiloma, que se move dentro da cavidade e sangra.|q-gdmicoses-008,q-gdmicoses-058,q-gdmicoses-059,q-gdmicoses-061,q-gdmicoses-065]] [[Os mucorales (*Rhizopus*, *Mucor*) adoram glicose e ferro e crescem em meio ácido: a cetoacidose diabética é o terreno clássico. A hifa larga invade vasos e necrosa tecido em dias, a partir do nariz e dos seios da face para a órbita e o cérebro.|q-gdmicoses-030,q-gdmicoses-034,q-gdmicoses-035]]`,
      fragmentos: [
        { id: "fil-aspergilose", titulo: "Aspergilose invasiva e aspergiloma", conferir: true, diretrizes: ["idsa-aspergilose"],
          questoes: ["q-einstein2022-067","q-einstein2022-068","q-gdmicoses-008","q-gdmicoses-011","q-gdmicoses-013","q-gdmicoses-033","q-gdmicoses-038","q-gdmicoses-048","q-gdmicoses-050","q-gdmicoses-058","q-gdmicoses-059","q-gdmicoses-024","q-gdmicoses-037","q-gdmicoses-061","q-gdmicoses-065","q-gdmicoses-066"],
          prosa: `[[No transplantado de medula ou no neutropênico com febre, tosse, dor pleurítica e hemoptise, a aspergilose invasiva é a hipótese: tomografia de tórax e galactomanana (antígeno da parede do *Aspergillus*) no sangue ou no lavado broncoalveolar. O fluconazol da profilaxia não cobre fungo filamentoso; o tratamento é voriconazol.|q-einstein2022-067,q-einstein2022-068,q-gdmicoses-008,q-gdmicoses-038,q-gdmicoses-048,q-gdmicoses-058,q-gdmicoses-059]] [[No imunocomprometido, a aspergilose é a infecção pulmonar fúngica oportunista mais lembrada nas provas.|q-gdmicoses-011,q-gdmicoses-033,q-gdmicoses-050,q-gdmicoses-013]] [[O aspergiloma dá hemoptise recorrente em quem teve tuberculose; a radiografia mostra a massa arredondada dentro da cavidade, que muda de lugar com a posição. O antifúngico não chega dentro da bola; a hemoptise importante resolve-se com ressecção, e a embolização brônquica é ponte. Tuberculose, câncer, estenose mitral e aspergilose podem dar hemoptise maciça; a estenose pulmonar não.|q-gdmicoses-024,q-gdmicoses-037,q-gdmicoses-061,q-gdmicoses-065,q-gdmicoses-066]]`,
          texto: `- Transplantado de medula com hemoptise: **aspergilose**. {q-einstein2022-067}
- Investigação: **broncoscopia com galactomanana**. {q-einstein2022-068}
- Nódulos com halo e galactomanana: ***Aspergillus***. {q-gdmicoses-008,q-gdmicoses-058}
- Infecção pulmonar oportunista mais frequente: **aspergilose**. {q-gdmicoses-011,q-gdmicoses-033,q-gdmicoses-050}
- "Fungemia" no neutropênico (a prova): **aspergilose**. {q-gdmicoses-013}
- Neutropênico com fluconazol profilático e dor pleurítica: **aspergilose invasiva**. {q-gdmicoses-038}
- Transplante alogênico com febre e hipóxia: **galactomanana**. {q-gdmicoses-048}
- Fungo filamentoso da neutropenia grave: ***A. fumigatus***. {q-gdmicoses-059}
- Hemoptise com bola fúngica: **ressecção**. {q-gdmicoses-024}
- Tuberculose antiga com hemoptoicos: **infecção fúngica**. {q-gdmicoses-037}
- Hemoptise após tuberculose tratada: **aspergiloma**. {q-gdmicoses-061,q-gdmicoses-065}
- Não causa hemoptise maciça: **estenose pulmonar**. {q-gdmicoses-066}` },
        { id: "fil-mucormicose", titulo: "Mucormicose", conferir: true,
          questoes: ["q-gdmicoses-030","q-gdmicoses-034","q-gdmicoses-035","q-gdmicoses-056","q-gdmicoses-064"],
          prosa: `[[Diabético em cetoacidose com dor facial, oftalmoplegia, rebaixamento e escara negra no palato ou no nariz tem mucormicose rino-órbito-cerebral, a forma mais frequente. O tratamento é urgente: corrigir a cetoacidose, desbridar todo o tecido necrótico e anfotericina B lipossomal (o voriconazol não age nos mucorales).|q-gdmicoses-030,q-gdmicoses-056,q-gdmicoses-064,q-gdmicoses-034,q-gdmicoses-035]]`,
          texto: `- Cetoacidose, paralisia ocular e necrose no palato: **mucormicose**. {q-gdmicoses-030,q-gdmicoses-064}
- Falso: mucormicose com **bom controle metabólico**. {q-gdmicoses-034}
- Agentes: ***Rhizopus* e *Rhizomucor***. {q-gdmicoses-035}
- Diabética em cetoacidose que piora após sinusite: **rino-órbito-cerebral**. {q-gdmicoses-056}` },
      ],
    },
    {
      id: "antifungicos", titulo: "Antifúngicos e esporotricose",
      introducao: `[[Os antifúngicos atacam o ergosterol, o esterol da membrana do fungo: a anfotericina B se liga a ele e abre poros (mata, mas também se liga ao colesterol do túbulo renal, daí a nefrotoxicidade e a perda de potássio e magnésio); os azóis bloqueiam a síntese do ergosterol pela via do citocromo P450; as equinocandinas inibem a síntese da parede (glucana).|q-gdmicoses-005,q-gdmicoses-049,q-gdmicoses-069]]`,
      fragmentos: [
        { id: "afu-drogas", titulo: "Toxicidade e absorção", conferir: true,
          questoes: ["q-gdmicoses-005","q-gdmicoses-049","q-gdmicoses-069","q-fmabc2026-005"],
          prosa: `[[O itraconazol em cápsula precisa de ácido no estômago e de comida para ser absorvido (refrigerante de cola ajuda; antiácido e inibidor de bomba atrapalham); o anticoncepcional não muda a absorção dele. O cetoconazol, mais tóxico, inibe a síntese de testosterona e causa ginecomastia.|q-gdmicoses-049,q-gdmicoses-069]] [[A esporotricose entra pela pele (arranhão ou mordida de gato, espinho) e sobe pelos linfáticos em nódulos enfileirados; trata-se com itraconazol. A versão completa está em **Infecções e infestações da pele**.|q-fmabc2026-005]]`,
          texto: `- Anfotericina B: **rins**. {q-gdmicoses-005}
- Não altera a biodisponibilidade do itraconazol: **anticoncepcional oral**. {q-gdmicoses-049}
- Ginecomastia: **cetoconazol**. {q-gdmicoses-069}
- Nódulos no braço após mordida de gato: **itraconazol**. {q-fmabc2026-005}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["consenso-pcm","idsa-candida"],
          questoes: ["q-gdmicoses-013","q-gdmicoses-003","q-gdmicoses-026","q-gdmicoses-040","q-gdmicoses-011","q-gdmicoses-060"],
          prosa: `[[**"Fungemia" no neutropênico**: no sangue, a mais comum é a *Candida*; o *Aspergillus* raramente cresce na hemocultura e é a infecção invasiva do tecido. A prova (013) deu aspergilose.|q-gdmicoses-013]] [[**Paracoccidioidomicose**: o consenso põe o itraconazol como primeira escolha; a 003 marcou o sulfametoxazol-trimetoprima (alternativa válida) como resposta.|q-gdmicoses-003]] [[**Candidemia**: a IDSA prefere equinocandina como tratamento inicial, deixando o fluconazol para o paciente estável com espécie sensível ou como passo seguinte; as provas (026 e 040) deram fluconazol, a 040 num paciente instável.|q-gdmicoses-026,q-gdmicoses-040]] [[**"Infecção pulmonar oportunista mais comum"**: depende do grupo; na neutropenia e no transplante de medula é a aspergilose, na AIDS é a pneumocistose. As provas (011, 033, 050) generalizaram para aspergilose.|q-gdmicoses-011]] [[**Sorologia na paracoccidioidomicose**: ajuda e acompanha, mas o diagnóstico é o fungo visto; a afirmação que chama imunodifusão e fixação de complemento de "melhores exames" é a errada (060).|q-gdmicoses-060]]`,
          texto: `- "Fungemia": no sangue a regra é *Candida*; a prova deu **aspergilose**. {q-gdmicoses-013}
- Regra: itraconazol primeiro; a prova deu **sulfametoxazol-trimetoprima**. {q-gdmicoses-003}
- Regra IDSA: equinocandina inicial; as provas deram **fluconazol**. {q-gdmicoses-026,q-gdmicoses-040}
- Oportunista pulmonar mais comum: **depende do imunodeprimido**; a prova generalizou. {q-gdmicoses-011}
- Sorologia **não** é o melhor exame da paracoccidioidomicose. {q-gdmicoses-060}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: os fungos invasivos",
      introducao: `Resumo dos capítulos, para separar os fungos que as provas põem lado a lado.`,
      fragmentos: [
        { id: "cmp-fungos", titulo: "Terreno, quadro, diagnóstico e droga", conferir: true,
          figuras: [{ arquivo: "figuras/morfologia.svg", legenda: "Esquema autoral: como cada fungo aparece no exame direto ou na biópsia." }],
          questoes: ["q-gdmicoses-014","q-gdmicoses-012","q-gdmicoses-059","q-gdmicoses-030","q-gdmicoses-068","q-gdmicoses-020"],
          prosa: `[[Cada fungo tem seu terreno, sua imagem no microscópio e sua droga.|q-gdmicoses-014,q-gdmicoses-012,q-gdmicoses-059,q-gdmicoses-030,q-gdmicoses-068,q-gdmicoses-020]]

| Fungo | Terreno | Quadro | No microscópio | Droga |
| *Paracoccidioides* | lavrador, solo rural | pulmão e úlcera oral; juvenil linfática | levedura em roda de leme | itraconazol; sulfametoxazol-trimetoprima |
| *Histoplasma* | caverna, morcego, ave; AIDS | pneumonia aguda; disseminada com fígado e baço | levedura pequena dentro do macrófago | itraconazol; anfotericina na grave |
| *Cryptococcus* | pombo; AIDS | meningite subaguda | levedura com cápsula (nanquim) | anfotericina + flucitosina, depois fluconazol |
| *Candida* | cateter, UTI, antibiótico; mucosa na AIDS | candidemia; esofagite | pseudo-hifas e leveduras | equinocandina; fluconazol |
| *Aspergillus* | neutropenia, transplante; cavidade antiga | nódulo com halo; aspergiloma | hifa septada, ramos em ângulo agudo | voriconazol; ressecção do aspergiloma |
| Mucorales | cetoacidose diabética | necrose rino-órbito-cerebral | hifa larga sem septo, em ângulo reto | anfotericina lipossomal e desbridamento |`,
          texto: `- Pombos: **histoplasmose e criptococose**. {q-gdmicoses-014}
- AIDS: **criptococose**. {q-gdmicoses-012}
- Neutropenia grave: ***A. fumigatus***. {q-gdmicoses-059}
- Cetoacidose: **mucormicose**. {q-gdmicoses-030}
- Paracoccidioidomicose: **itraconazol**. {q-gdmicoses-068}
- *C. glabrata*: **equinocandina**. {q-gdmicoses-020}` },
      ],
    },
  ],
});
