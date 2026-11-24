/* resumos/hiv/resumo.js — resumo adaptativo de HIV/aids: história natural e diagnóstico, cuidado contínuo, terapia antirretroviral,
   infecções oportunistas (pneumocistose, neurotoxoplasmose, criptococose, outras), tuberculose, profilaxias, PEP e PrEP,
   gestante e recém-nascido exposto.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- hiv */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "hiv",
  titulo: "HIV/aids",
  assunto: "ass-hiv",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "pcdt-hiv-adultos", texto: "Ministério da Saúde — PCDT para Manejo da Infecção pelo HIV em Adultos (2017/2018 e atualizações): início imediato da terapia, esquema inicial, genotipagem, falha virológica, profilaxias", lidoEm: null },
    { id: "pcdt-tv", texto: "Ministério da Saúde — PCDT para Prevenção da Transmissão Vertical de HIV, Sífilis e Hepatites Virais (2020; 2ª ed. revisada 2022): terapia na gestante, via de parto, profilaxia e seguimento do recém-nascido", lidoEm: null },
    { id: "pcdt-pep-prep", texto: "Ministério da Saúde — PCDT de Profilaxia Pós-Exposição (PEP) e de Profilaxia Pré-Exposição (PrEP) ao HIV", lidoEm: null },
    { id: "pcdt-hiv-criancas", texto: "Ministério da Saúde — PCDT para Manejo da Infecção pelo HIV em Crianças e Adolescentes (2017) e fluxograma de testes rápidos (Manual Técnico de Diagnóstico do HIV)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anuladas pela banca (gabarito do material de origem em desacordo com a literatura ou mais de uma alternativa correta)", questoes: ["q-gdhiv-085","q-gdhiv-092","q-gdhiv-115","q-gdhiv-132","q-gdhiv-168","q-gdhiv-184","q-gdhiv-208","q-gdhiv-214","q-gdhiv-218"] },
  ],
  doencas: [
    {
      id: "diagnostico", titulo: "História natural, diagnóstico e cuidado contínuo",
      introducao: `O HIV é um retrovírus da subfamília dos lentivírus: infecta e destrói os **linfócitos T CD4**, e a imunidade celular cai de forma progressiva. [[Sem tratamento, a aids aparece em média **8 a 10 anos** depois da infecção; a **linfocitopenia adquirida** é a marca do vírus; e a perda do CD4 explica por que as infecções oportunistas seguem faixas de CD4 previsíveis.|q-gdhiv-202,q-gdhiv-182,q-gdhiv-013]] A **aids** é definida por CD4 abaixo de 200 células/µL **ou** por uma doença definidora (pneumocistose, neurotoxoplasmose, sarcoma de Kaposi, câncer invasivo de colo uterino, isosporíase crônica, histoplasmose extrapulmonar); e o tratamento, hoje, é **para todos, qualquer que seja o CD4**.

Veja também: **Infecções sexualmente transmissíveis** (sífilis, herpes, HPV e o risco de HIV), **Tuberculose** (coinfecção e profilaxia), **Pré-natal** e **Infecções congênitas e perinatais** (transmissão vertical), **Calendário vacinal** e **Imunização** (vacinas na pessoa com HIV).`,
      fragmentos: [
        { id: "def-hist", titulo: "História natural, definição de aids e quando pensar em HIV", conferir: true, diretrizes: ["pcdt-hiv-adultos"],
          questoes: ["q-unesp2023-059","q-sirio2021-012","q-gdhiv-013","q-gdhiv-049","q-gdhiv-053","q-gdhiv-080","q-gdhiv-126","q-gdhiv-154","q-gdhiv-182","q-gdhiv-188","q-gdhiv-202","q-gdhiv-073","q-gdhiv-123","q-gdhiv-197","q-tp20202-018","q-fmabc2024-006","q-gdhiv-183"],
          prosa: `Na história natural há quatro fases: **contágio, infecção aguda, latência clínica e aids**. [[Na latência, alguns pacientes têm **linfadenopatia generalizada persistente, flutuante e indolor**; a **janela imunológica** é o período de 4 a 6 semanas em que os anticorpos ainda não aparecem; e a inflamação crônica e a ativação imune persistente explicam o **envelhecimento precoce**; as principais causas de morte são as infecções oportunistas e o câncer; e a artralgia do HIV raramente evolui para artrite grave.|q-gdhiv-049,q-gdhiv-202,q-gdhiv-073,q-gdhiv-123,q-gdhiv-197]]

[[São **doenças definidoras de aids** o sarcoma de Kaposi, o carcinoma invasivo de colo uterino, a pneumocistose, a neurotoxoplasmose, a isosporíase crônica e a histoplasmose extrapulmonar; a pneumonia, em geral, **não** é definidora (só a bacteriana recorrente); e a aids se define por **CD4 abaixo de 200** ou por doença definidora; os sinais de **imunodeficiência moderada** (que mandam testar) não incluem a neurotoxoplasmose, que é de imunodeficiência grave.|q-gdhiv-053,q-gdhiv-080,q-gdhiv-154,q-gdhiv-188,q-gdhiv-126,q-sirio2021-012]] [[Pensar em HIV: febre, tosse, sudorese e candidíase oral com CD4 de 60 (aids com possível tuberculose); **psoríase e artrite que pioram de forma abrupta** em paciente antes controlado (pedir teste de HIV); e a criança adotada com pneumonias graves, otites e candidíase recorrentes e diarreia crônica (**investigar HIV**).|q-tp20202-018,q-fmabc2024-006,q-gdhiv-183]]`,
          texto: `- Melhor momento para tratar na história natural: **o mais cedo possível**, já na infecção (fase 1). {q-unesp2023-059}
- Aids sem tratamento: em média **8 a 10 anos** após a infecção; janela imunológica de **4 a 6 semanas**. {q-gdhiv-202}
- Latência: pode haver **linfadenopatia generalizada persistente, flutuante e indolor**. {q-gdhiv-049}
- Causa de **linfocitopenia adquirida**: a aids. {q-gdhiv-182}
- O HIV é um **lentivírus** da família dos retrovírus, com RNA e transcriptase reversa. {q-gdhiv-013}
- Doenças definidoras: **Kaposi, câncer invasivo de colo, pneumocistose**; também isosporíase crônica e histoplasmose extrapulmonar. {q-gdhiv-053,q-gdhiv-080}
- Pneumonia em geral **não** define aids; **CD4 abaixo de 200** define. {q-gdhiv-154,q-gdhiv-188}
- Neurotoxoplasmose é de imunodeficiência **grave**, não moderada. {q-gdhiv-126}
- Oportunistas com CD4 abaixo de 200: **Kaposi, LEMP e histoplasmose** (a prova). {q-sirio2021-012}
- Inflamação crônica e ativação imune: **envelhecimento precoce**. {q-gdhiv-073}
- Principais causas de morte: **infecções oportunistas e câncer**. {q-gdhiv-123}
- A artralgia do HIV raramente vira artrite grave. {q-gdhiv-197}
- Febre, tosse, sudorese noturna, candidíase oral e CD4 de 60: **aids com possível tuberculose**. {q-tp20202-018}
- Psoríase e artrite que pioram de forma abrupta em quem estava controlado: **pedir teste de HIV**. {q-fmabc2024-006}
- Criança com pneumonias graves, otites, candidíase e diarreia crônica: **investigar HIV**. {q-gdhiv-183}` },
        { id: "dx-lab", titulo: "Diagnóstico laboratorial: testes rápidos, janela e monitoramento", conferir: true, diretrizes: ["pcdt-hiv-criancas"],
          questoes: ["q-einstein2022-005","q-simepm89-062","q-gdhiv-017","q-gdhiv-020","q-gdhiv-041","q-gdhiv-137","q-gdhiv-158","q-gdhiv-215","q-gdhiv-148"],
          prosa: `[[O diagnóstico pelo fluxograma brasileiro exige **dois testes rápidos reagentes de fabricantes diferentes** (ou um imunoensaio de 4ª geração e um teste confirmatório); o **primeiro teste reagente** pede um segundo teste, e só então se confirma o diagnóstico e se inicia a terapia; dois testes rápidos reagentes **em paralelo** fecham o diagnóstico sem outro exame.|q-einstein2022-005,q-gdhiv-020,q-gdhiv-215]] [[Antes da 4ª semana (janela imunológica), o melhor exame é a **quantificação do RNA viral (carga viral por PCR)**; a reatividade cruzada em doenças autoimunes pode dar **falso-reagente**, e o resultado deve ser discutido com o tempo provável de soropositividade, e não vedado.|q-gdhiv-137,q-gdhiv-158,q-gdhiv-017,q-simepm89-062,q-gdhiv-041]] [[A evolução imunológica se acompanha com a **contagem de linfócitos T-CD4+** e a **carga viral**.|q-gdhiv-148]]`,
          texto: `- Primeiro teste rápido reagente em assintomático: **novo teste rápido** e, se reagente, iniciar a terapia. {q-einstein2022-005}
- Teste rápido de fluido oral reagente: basta **mais um teste rápido reagente** (de sangue) para confirmar. {q-gdhiv-020}
- Dois testes rápidos reagentes em paralelo: **resultado positivo**, sem outro teste. {q-gdhiv-215}
- Antes da 4ª semana: **carga viral por PCR**. {q-gdhiv-137,q-gdhiv-158}
- Doenças autoimunes podem dar resultado **falso-reagente** por reatividade cruzada. {q-gdhiv-017,q-simepm89-062}
- Discutir o tempo provável de soropositividade **é importante** (não vedado). {q-gdhiv-041}
- Controle evolutivo: **CD4 e carga viral**. {q-gdhiv-148}` },
        { id: "cuidado-continuo", titulo: "Cuidado contínuo, prevenção combinada e epidemiologia", conferir: true, diretrizes: ["pcdt-hiv-adultos"],
          questoes: ["q-usp2023-061","q-usp2024-088","q-usp2024-096","q-unesp2021-100","q-sessp2023-081","q-gdhiv-003","q-gdhiv-004","q-gdhiv-005","q-gdhiv-007","q-gdhiv-015","q-gdhiv-016","q-gdhiv-032","q-gdhiv-040","q-gdhiv-068","q-gdhiv-086","q-gdhiv-112","q-gdhiv-121","q-gdhiv-131"],
          prosa: `[[O **cuidado contínuo** é a cascata de degraus **diagnóstico, vinculação, retenção, TARV e supressão viral**; a **vinculação** é o acolhimento, a orientação e o encaminhamento da pessoa recém-diagnosticada ao serviço; o ponto mais difícil é a **adesão** ao acompanhamento e à terapia; e a pessoa pode ser acompanhada na **atenção básica**, com apoio do serviço especializado.|q-gdhiv-032,q-gdhiv-086,q-unesp2021-100,q-gdhiv-112]] [[Na abordagem inicial, avalia-se a adesão e **os motivos das falhas**, em relação de confiança; a **adesão subótima** mantém carga viral detectável, prejudica o paciente e aumenta a transmissão.|q-gdhiv-040,q-gdhiv-016]] [[**Indetectável = intransmissível**: o casal sorodiscordante com carga viral indetectável persistente tem transmissão sexual improvável; as **outras IST** (sobretudo as ulcerativas) aumentam o risco de contrair HIV.|q-gdhiv-003,q-gdhiv-131,q-gdhiv-121]]

A **prevenção combinada** (mandala) reúne intervenções **biomédicas, comportamentais e estruturais**: PEP, PrEP, prevenção da transmissão vertical, tratamento para todos, testagem, vacinas contra hepatite B e HPV, preservativo e **redução de danos** (seringas e agulhas descartáveis para quem usa drogas injetáveis). [[A meta é 90-90-90: o terceiro 90 (carga viral indetectável em quem está em TARV) depende de qualificar a atenção básica; na última década a detecção de aids **aumentou nos homens e diminuiu nas mulheres de 20 a 24 anos**; e a falha de acesso e de seguimento na usuária de drogas injetáveis, diagnosticada no parto, é vulnerabilidade **programática**.|q-gdhiv-004,q-gdhiv-068,q-gdhiv-015,q-usp2024-088]]`,
          texto: `- **Vinculação**: acolhimento, orientação e encaminhamento da pessoa recém-diagnosticada ao serviço. {q-gdhiv-032,q-gdhiv-086}
- O aspecto mais difícil do cuidado é a **adesão**. {q-unesp2021-100}
- Pode ser acompanhado na **atenção básica**; avaliar adesão e **motivos das falhas**. {q-gdhiv-112,q-gdhiv-040}
- Adesão subótima: **carga viral detectável** e mais transmissão. {q-gdhiv-016}
- Casal sorodiscordante com carga viral indetectável há anos: transmissão sexual **improvável**. {q-gdhiv-003}
- Parceria sorodiscordante: baixa transmissibilidade com TARV por mais de 6 meses. {q-gdhiv-131}
- Outras IST **aumentam o risco** de contrair HIV. {q-gdhiv-121}
- A mandala é a **prevenção combinada**; **prevenir a transmissão vertical** faz parte dela. {q-gdhiv-005,q-gdhiv-007}
- Seringas e agulhas descartáveis para usuários de drogas injetáveis: **prevenção combinada** na atenção básica. {q-sessp2023-081}
- Meta do terceiro 90: **qualificar a atenção básica** para o tratamento e o seguimento. {q-gdhiv-004}
- Detecção de aids de 2006 a 2016: **subiu nos homens e caiu nas mulheres** de 20 a 24 anos. {q-gdhiv-068,q-gdhiv-015}
- Usuária de drogas com diagnóstico no parto, alta sem seguimento: vulnerabilidade **programática**. {q-usp2024-088}
- Serviços com mais pacientes alcançam maior supressão viral: **experiência e volume**. {q-usp2024-096}
- Cascata do cuidado: a barra é **percentual dos vinculados** em cada faixa etária. {q-usp2023-061}` },
      ],
    },
    {
      id: "tarv", titulo: "Terapia antirretroviral",
      introducao: `[[A terapia antirretroviral (TARV) é indicada a **todas as pessoas com HIV, assintomáticas ou não, com qualquer CD4 e qualquer carga viral**, **assim que a infecção for confirmada**: ela preserva a imunidade, reduz a mortalidade e a transmissibilidade, e o esquema inicial preferencial é **tenofovir + lamivudina + dolutegravir**, em **três drogas** (dois inibidores da transcriptase reversa análogos de nucleosídeo/nucleotídeo e um inibidor de integrase).|q-gdhiv-165,q-gdhiv-164,q-gdhiv-070,q-gdhiv-095]]`,
      fragmentos: [
        { id: "tarv-quando", titulo: "Quando iniciar e qual esquema", conferir: true, diretrizes: ["pcdt-hiv-adultos"],
          questoes: ["q-inf-17","q-sessp2026-018","q-gdhiv-036","q-gdhiv-039","q-gdhiv-070","q-gdhiv-084","q-gdhiv-088","q-gdhiv-091","q-gdhiv-095","q-gdhiv-110","q-gdhiv-120","q-gdhiv-157","q-gdhiv-164","q-gdhiv-165","q-uspsp1-071"],
          prosa: `[[O paciente com dois testes confirmatórios, assintomático, com CD4 de 685 ou 422 e carga viral qualquer, **inicia a TARV imediatamente**, sem esperar carga viral, CD4 nem sintomas; a ideia de tratar **apenas os sintomáticos** está errada, e a mulher recém-diagnosticada com diarreia crônica e grande perda de peso **começa a TARV e a profilaxia com SMX-TMP sem aguardar exames**, assim como iniciar só com CD4 abaixo de 200 ou só na infecção oportunista.|q-gdhiv-088,q-gdhiv-164,q-gdhiv-165,q-gdhiv-120,q-inf-17]] [[O **tenofovir e a lamivudina** têm atividade contra o HIV e contra o vírus da hepatite B, e o dolutegravir é o inibidor de integrase do esquema; a **estavudina** não é opção inicial (lipodistrofia, neuropatia, acidose lática).|q-gdhiv-039,q-gdhiv-091,q-gdhiv-036]] [[Quatro semanas depois de iniciar a TARV, a **reativação de herpes simples** com carga viral indetectável e CD4 acima de 350 é recorrência isolada: **mantém-se a TARV**, sem outra medida.|q-sessp2026-018]]`,
          texto: `- Recém-diagnosticada com diarreia crônica e perda de 17 % do peso, sem exames: **iniciar a TARV já e o SMX-TMP profilático**, sem esperar o sangue. {q-uspsp1-071}
- TARV para **todas as pessoas diagnosticadas**, independentemente do CD4, o mais cedo possível. {q-inf-17}
- Esquema inicial preferencial: **tenofovir + lamivudina + dolutegravir**. {q-gdhiv-095,q-gdhiv-070}
- Primeira linha: tenofovir 300 + lamivudina 300 em comprimido único e **um inibidor de integrase**. {q-gdhiv-036}
- Duas sorologias positivas (4ª geração e imunoblot): **iniciar a TARV imediatamente**, com tenofovir, lamivudina e dolutegravir. {q-gdhiv-088}
- Paciente assintomático com CD4 de 685 e carga viral de 8.500: **terapia com três drogas**. {q-gdhiv-164}
- Doador encaminhado por sorologia positiva: TARV **independentemente de carga viral e CD4**. {q-gdhiv-165}
- Recomendação para a grande maioria: iniciar **quando a infecção for confirmada**. {q-gdhiv-110,q-gdhiv-157}
- Em qualquer contagem de CD4. {q-gdhiv-084}
- Tratar só os sintomáticos: **errado**. {q-gdhiv-120}
- **Tenofovir e lamivudina** agem também contra o vírus da hepatite B. {q-gdhiv-039}
- **Estavudina** não é opção inicial. {q-gdhiv-091}
- Herpes simples reativado 4 semanas após a TARV, CD4 acima de 350: **manter os antirretrovirais**. {q-sessp2026-018}` },
        { id: "tarv-drogas", titulo: "Drogas, efeitos adversos e interações", conferir: true, diretrizes: ["pcdt-hiv-adultos"],
          questoes: ["q-amrigs2023-017","q-gdhiv-019","q-gdhiv-023","q-gdhiv-074","q-gdhiv-099","q-gdhiv-102","q-gdhiv-210","q-gdhiv-093"],
          prosa: `[[O **abacavir** causa **reação de hipersensibilidade** grave na reexposição (febre, exantema); o **efavirenz** causa **efeitos neuropsiquiátricos** (sonhos vívidos, disforia, tontura, depressão e alucinações); o **raltegravir** tem boa tolerabilidade, poucas interações e segurança na coinfecção por hepatite, mas exige duas tomadas por dia; a **zidovudina** é inibidor da transcriptase reversa (não da protease); e o **ezetimibe** é seguro na dislipidemia de quem usa TARV.|q-amrigs2023-017,q-gdhiv-099,q-gdhiv-102,q-gdhiv-023,q-gdhiv-074,q-gdhiv-019]] [[Na coinfecção com hepatite B, o esquema deve conter **tenofovir e lamivudina**, e a TARV da gestante **continua depois do parto**, porque é indicada a todas as pessoas com HIV.|q-gdhiv-210,q-gdhiv-093]]`,
          texto: `- Febre ou exantema e reação grave na reexposição: **abacavir**. {q-amrigs2023-017}
- Erupção, disforia, sonolência, depressão e sonhos vívidos: **efavirenz**. {q-gdhiv-102,q-gdhiv-099}
- **Raltegravir**: duas tomadas ao dia, boa tolerabilidade e poucas interações. {q-gdhiv-023}
- **Zidovudina** é inibidor da transcriptase reversa, não da protease. {q-gdhiv-074}
- Hipercolesterolemia em quem usa TARV: o **ezetimibe** é seguro. {q-gdhiv-019}
- Coinfecção HIV-hepatite B: **tenofovir e lamivudina**. {q-gdhiv-210}
- Gestante com HIV: **continuar a TARV após o parto**. {q-gdhiv-093}` },
        { id: "tarv-falha", titulo: "Falha virológica, genotipagem e resgate", conferir: true, diretrizes: ["pcdt-hiv-adultos"],
          questoes: ["q-gdhiv-064","q-gdhiv-065","q-gdhiv-066","q-gdhiv-067","q-gdhiv-076","q-gdhiv-022","q-gdhiv-133","q-gdhiv-075"],
          prosa: `[[A **viremia baixa esporádica** (menor que 200 cópias/mL) é, em geral, replicação de vírus selvagem a partir de células latentes, não falha; **confirmada a falha virológica**, pede-se a **genotipagem**, que ajuda a montar o resgate e **previne a toxicidade de medicamentos inativos**; falha prolongada, falhas múltiplas, resistência ampla, carga viral alta e CD4 baixo se associam a pior resposta; e o resgate combina drogas de **alta barreira genética** de classes distintas, buscando supressão máxima e sustentada.|q-gdhiv-066,q-gdhiv-067,q-gdhiv-064,q-gdhiv-065]] [[A genotipagem **pré-tratamento** está indicada a **todas as gestantes** com HIV, mas **não** aos casais soroiguais; o paciente com carga viral sempre positiva, trocas por efeitos colaterais e cepas selvagens ao genótipo tem **baixa adesão**, e o abandono por intolerância ao lopinavir/ritonavir se resolve com **esquema de melhor adesão**, tratando a sífilis, investigando tuberculose e dando profilaxia das oportunistas.|q-gdhiv-076,q-gdhiv-022,q-gdhiv-133,q-gdhiv-075]]`,
          texto: `- Viremia baixa esporádica (menor que 200): vírus selvagem de **células latentes**, não falha. {q-gdhiv-066}
- A genotipagem **previne a toxicidade** de medicamentos inativos. {q-gdhiv-067}
- Resgate: **alta barreira genética** e classes distintas; falha prolongada e resistência ampla pioram a resposta. {q-gdhiv-064,q-gdhiv-065}
- Genotipagem pré-tratamento: **todas as gestantes**; **não** casais soroiguais. {q-gdhiv-076,q-gdhiv-022}
- Carga viral sempre positiva com cepas selvagens: **baixa adesão**; profilaxia das oportunistas. {q-gdhiv-133}
- Abandono por diarreia com lopinavir/ritonavir, CD4 de 80 e sífilis: **retomar a TARV em esquema com adesão**, tratar sífilis e investigar tuberculose. {q-gdhiv-075}` },
      ],
    },
    {
      id: "oportunistas", titulo: "Infecções oportunistas",
      introducao: `[[A **faixa de CD4** orienta o diagnóstico e as profilaxias: com **CD4 acima de 200** predominam as infecções comuns (pneumonia bacteriana, tuberculose) e não se faz profilaxia das oportunistas; abaixo de **200**, a pneumocistose; abaixo de **100**, a neurotoxoplasmose e a criptococose; abaixo de **50**, o CMV e o *Mycobacterium avium*.|q-gdhiv-072,q-gdhiv-152,q-gdhiv-031,q-gdhiv-045]] A TARV é a base da prevenção de todas.`,
      fragmentos: [
        { id: "pneumocistose", titulo: "Pneumocistose e outras pneumonias do paciente com HIV", conferir: true, diretrizes: ["pcdt-hiv-adultos"],
          figuras: [{ arquivo: "figuras/cd4-oportunistas.svg", legenda: "Esquema autoral: o CD4 indica a oportunista provável e a profilaxia." }],
          questoes: ["q-usprp2024-051","q-gdhiv-011","q-gdhiv-012","q-gdhiv-033","q-gdhiv-034","q-gdhiv-037","q-gdhiv-038","q-gdhiv-050","q-gdhiv-055","q-gdhiv-101","q-gdhiv-108","q-gdhiv-117","q-gdhiv-118","q-gdhiv-119","q-gdhiv-134","q-gdhiv-138","q-gdhiv-156","q-gdhiv-163","q-gdhiv-172","q-gdhiv-180","q-gdhiv-185","q-gdhiv-186","q-gdhiv-192","q-gdhiv-194","q-gdhiv-195","q-gdhiv-072","q-gdhiv-161","q-gdhiv-094"],
          prosa: `A pneumocistose é a micose oportunista (*Pneumocystis jirovecii*; a pneumocistose é o fungo da lista, diferente de micobactérias, vírus e protozoários) que preenche os alvéolos e causa **hipoxemia desproporcional ao exame**. [[O quadro é **tosse seca, dispneia progressiva, febre subaguda, hipoxemia (inclusive com alcalose respiratória), ausculta normal ou estertores finos, LDH elevada, linfopenia** e radiografia com **infiltrado intersticial difuso e bilateral** (vidro fosco), em quem tem **CD4 abaixo de 200** e candidíase oral; o **derrame pleural volumoso não é de pneumocistose** (pensa-se em tuberculose, linfoma); o pneumotórax e as pneumatoceles são complicações possíveis.|q-gdhiv-033,q-gdhiv-195,q-gdhiv-108,q-gdhiv-011,q-gdhiv-163,q-gdhiv-194,q-gdhiv-117,q-gdhiv-118]] [[O **diagnóstico** é pela identificação do fungo (azul de toluidina, Grocott, Giemsa, imunofluorescência) em **escarro induzido ou lavado broncoalveolar**, o de maior sensibilidade; no paciente intubado, o **lavado broncoalveolar** ou o aspirado traqueal profundo; o PCR positivo isolado não confirma doença.|q-gdhiv-038,q-gdhiv-180,q-gdhiv-192,q-gdhiv-138]]

[[O tratamento é **sulfametoxazol-trimetoprim** (15 a 20 mg/kg/dia de trimetoprima, por via venosa nos casos moderados a graves, com PaO2 abaixo de 70 mmHg) por **21 dias**, **mais corticoide** quando há hipoxemia grave; a TARV se inicia **nas primeiras duas semanas** do tratamento, e não se espera meses.|q-gdhiv-050,q-gdhiv-034,q-gdhiv-037,q-gdhiv-186,q-gdhiv-134,q-gdhiv-185,q-gdhiv-055,q-gdhiv-101,q-gdhiv-012]] [[A **pneumonia bacteriana** (tosse produtiva com escarro amarelado, febre de 3 dias, infiltrado lobar) acontece em qualquer CD4, inclusive 600 ou menos de 100, e se trata como pneumonia bacteriana (levofloxacino).|q-gdhiv-072,q-gdhiv-161]]`,
          texto: `- Tosse seca, febre, dispneia, hipoxemia, HIV e falta de resposta à amoxicilina-clavulanato: **sulfametoxazol-trimetoprim**. {q-usprp2024-051}
- Aids com dor pleurítica, dispneia e **pneumotórax**: pneumocistose. {q-gdhiv-011}
- Pneumocistose com CD4 de 77: **TARV durante a internação** (nas primeiras duas semanas). {q-gdhiv-012}
- Exame físico: taquipneia, ausculta normal ou estertores finos; **erro**: infiltrado periférico assimétrico (o típico é **difuso bilateral**). {q-gdhiv-033}
- Tratamento moderado a grave: SMX-TMP **venoso**; tempo de **21 dias**, não 10. {q-gdhiv-034,q-gdhiv-037}
- Escarro direto é pouco sensível; definitivo: **colorações em espécime respiratório**. {q-gdhiv-038}
- **SMX-TMP** é a droga de escolha, por 21 dias. {q-gdhiv-050,q-gdhiv-186}
- Tosse seca, infiltrado intersticial e hipoxemia: **sulfametoxazol-trimetoprim e prednisona**. {q-gdhiv-055,q-gdhiv-101}
- Paciente com hipoxemia (SaO2 60 %) e DHL alta: **pneumocistose** com SMX-TMP. {q-gdhiv-156}
- Candidíase oral, LDH 1.200 e hipoxemia: **sulfametoxazol-trimetoprim**. {q-gdhiv-119}
- HIV recente com alcalose respiratória e infiltrado intersticial: **sulfametoxazol-trimetoprim**. {q-gdhiv-163}
- **Derrame pleural volumoso** não sugere pneumocistose. {q-gdhiv-108,q-gdhiv-195,q-gdhiv-118}
- Maior sensibilidade diagnóstica: **lavado broncoalveolar** com Giemsa. {q-gdhiv-180}
- Paciente intubado com SMX-TMP: coletar o **lavado broncoalveolar**. {q-gdhiv-192}
- **Corticoide venoso** com PaO2 abaixo de 70 mmHg. {q-gdhiv-185}
- Tratamento da pneumocistose: **14 a 21 dias** (21 pelo protocolo atual). {q-gdhiv-134}
- Hipoxemia, infiltrado bilateral, LDH alta e CD4 de 22: iniciar tratamento sem esperar o PCR; o PCR positivo isolado não confirma. {q-gdhiv-138}
- Aids, pneumocistose e monilíase oroesofágica no mesmo paciente. {q-gdhiv-172}
- A pneumocistose é a oportunista da lista causada por **fungo** (não micobactéria, LEMP ou criptosporídio). {q-gdhiv-094}
- Imunodeprimido com tosse produtiva e escarro amarelado há 3 dias: **bacteriana**, **levofloxacino**. {q-gdhiv-161}
- CD4 de 600 com infiltrado lobar agudo: **pneumonia bacteriana**. {q-gdhiv-072}
- Pneumatoceles e pneumocistose em paciente com 4 semanas de sintomas: o derrame pleural é raro. {q-gdhiv-117}` },
        { id: "toxo-focal", titulo: "Lesões focais do sistema nervoso: neurotoxoplasmose, linfoma e outras", conferir: true, diretrizes: ["pcdt-hiv-adultos"],
          questoes: ["q-tp20202-027","q-tp20212-037","q-gdhiv-001","q-gdhiv-021","q-gdhiv-030","q-gdhiv-045","q-gdhiv-046","q-gdhiv-062","q-gdhiv-063","q-gdhiv-077","q-gdhiv-079","q-gdhiv-090","q-gdhiv-167","q-gdhiv-191","q-gdhiv-193","q-gdhiv-200","q-gdhiv-204","q-gdhiv-206","q-gdhiv-213","q-gdhiv-048"],
          prosa: `A **neurotoxoplasmose** é a reativação do *Toxoplasma* latente com **CD4 em geral abaixo de 100**: **febre, cefaleia, crise convulsiva, déficit focal (hemiparesia com liberação piramidal, paralisia facial central) e rebaixamento**, com **lesões múltiplas, hipodensas, com edema, efeito de massa e realce em anel**, nos gânglios da base e na junção corticomedular, na tomografia. [[A **prova terapêutica** com **sulfadiazina + pirimetamina + ácido folínico** é a conduta inicial (e não aguardar biópsia); a **clindamicina** (600 mg a cada 6 horas) substitui a sulfadiazina; a resposta em duas semanas confirma o diagnóstico, e a **sorologia IgG** é a que importa (IgM não confirma reativação); a **coriorretinite** pode ser achado do diagnóstico ou reativação tardia.|q-gdhiv-001,q-gdhiv-062,q-gdhiv-077,q-gdhiv-204,q-gdhiv-213,q-gdhiv-045,q-gdhiv-048]]

[[Os **diagnósticos diferenciais** da lesão com realce anelar em quem tem HIV são **neurotoxoplasmose, linfoma primário do sistema nervoso central e tuberculose**; o **linfoma primário** forma lesão **única** com realce que **não responde à prova terapêutica**, com sorologia negativa e PCR para EBV positivo no líquor; e a **doença não expansiva** do HIV inclui a neurossífilis, a leucoencefalopatia multifocal e a neurocriptococose.|q-gdhiv-191,q-gdhiv-090,q-gdhiv-206,q-gdhiv-021]]`,
          texto: `- HIV abandonado, CD4 80, febre, cefaleia, hemiparesia, crises e lesão em anel: **prova terapêutica** para toxoplasmose. {q-gdhiv-001}
- Crise convulsiva, déficit à direita e lesão em anel com edema: **neurotoxoplasmose**. {q-tp20202-027}
- Hemofílico com HIV há 10 anos, hemiparesia braquiocrural e monilíase: **neurotoxoplasmose**. {q-tp20212-037}
- Lesões hipodensas bilaterais em gânglios da base e junção corticomedular: **neurotoxoplasmose**. {q-gdhiv-030}
- A neurotoxoplasmose ocorre com **CD4 abaixo de 100**. {q-gdhiv-045}
- Hemiparesia esquerda com paralisia facial central e lesões em anel: **sulfadiazina, pirimetamina e ácido folínico**. {q-gdhiv-046}
- Febre, papiledema e hemiparesia após abandono: **sulfadiazina + pirimetamina + ácido fólico**. {q-gdhiv-062}
- Substituto da sulfadiazina: **clindamicina**. {q-gdhiv-077}
- Aids com rebaixamento e hemiplegia: **toxoplasmose cerebral**. {q-gdhiv-079}
- Adulto emagrecido, lesões de pele e lesão de 2 cm em gânglios da base: **toxoplasmose** e sulfadiazina com pirimetamina. {q-gdhiv-167}
- Hemiparesia súbita e lesões múltiplas com anel: diferenciais **neurotoxoplasmose, linfoma primário e LEMP**. {q-gdhiv-191}
- Lesão de 3 cm com realce em quem tem HIV e primeira crise: **linfoma primário**. {q-gdhiv-090}
- Lesão única, sem resposta à toxoplasmose, PCR positivo: **linfoma primário do SNC**. {q-gdhiv-206}
- Doenças **não expansivas**: neurossífilis, LEMP e neurocriptococose. {q-gdhiv-021}
- Sorologia, punção e prova terapêutica com sulfadiazina em adulto jovem com lesões em duplo alvo: **iniciar o tratamento**. {q-gdhiv-193}
- Abandono do tratamento, febre e déficit à direita: **neurotoxoplasmose**, tratar com clindamicina + pirimetamina + ácido folínico (a prova). {q-gdhiv-204}
- Abandonou a TARV, déficit focal, crise e lesões em anel com IgG alta e IgM negativa: **sulfadiazina + pirimetamina**. {q-gdhiv-213}
- Toxoplasmose: **coriorretinite** pode ser achado do diagnóstico ou reativação anos depois; no imunocomprometido o SNC dá meningoencefalite **com** déficit focal frequente (afirmação III falsa). {q-gdhiv-048}
- Hipótese de neurotoxoplasmose com lesão expansiva em hemiparesia: diagnóstico **da prova terapêutica**. {q-gdhiv-200}
- Neurotoxoplasmose e citomegalovírus como hipóteses principais de lesão com anel: a prova considerou **incorreta** essa lista. {q-gdhiv-063}` },
        { id: "cripto-neuro", titulo: "Criptococose e outras doenças do sistema nervoso", conferir: true, diretrizes: ["pcdt-hiv-adultos"],
          questoes: ["q-adap24-019","q-uspsp4-005","q-sirio2025-010","q-sirio2025-011","q-gdhiv-010","q-gdhiv-028","q-gdhiv-078","q-gdhiv-103","q-gdhiv-162","q-gdhiv-203","q-gdhiv-212","q-gdhiv-029","q-gdhiv-082","q-gdhiv-113"],
          prosa: `[[A **criptococose** (*Cryptococcus neoformans*, levedura encapsulada inalada de fezes de pombos) é a **micose invasiva mais comum e de maior risco de óbito** na aids, e dá **meningite subaguda**: cefaleia intensa e progressiva, febre baixa, vômitos, alteração de comportamento, rigidez de nuca **discreta ou ausente**, diplopia (VI par) e papiledema, com **tomografia sem lesões**, em quem tem CD4 muito baixo; no líquor, **tinta nanquim e antígeno criptocócico**.|q-adap24-019,q-gdhiv-078,q-gdhiv-010,q-gdhiv-203,q-gdhiv-212,q-sirio2025-010]] [[O tratamento é a **indução com anfotericina B** (lipossomal) **associada à flucitosina**, **punções lombares de alívio** diárias se há hipertensão intracraniana, e a **TARV adiada por 4 a 6 semanas**; a derivação ventricular externa não é a primeira conduta.|q-sirio2025-011,q-uspsp4-005,q-gdhiv-028,q-gdhiv-162]]

[[A **leucoencefalopatia multifocal progressiva (LEMP)**, pelo **vírus JC**, com CD4 abaixo de 200, causa declínio neurológico subagudo (fraqueza, disfagia, alteração da marcha e da fala) com lesões hipodensas confluentes na substância branca, **sem captação de contraste nem efeito de massa**; e a **encefalopatia pelo HIV** (demência) tem evolução **crônica e insidiosa**, não aguda com febre.|q-gdhiv-029,q-gdhiv-082,q-gdhiv-113]] [[A criptococose também compromete o pulmão e os linfonodos hilares (aids com pneumonia e meningite: *Cryptococcus*).|q-gdhiv-103]]`,
          texto: `- A **criptococose** causa infecção do SNC em imunodeprimidos. {q-adap24-019}
- Meningite criptocócica: **análise de líquor** (tinta nanquim, antígeno). {q-gdhiv-010}
- CD4 de 38, cefaleia, vômitos e tinta nanquim positiva: **anfotericina B**. {q-gdhiv-203}
- CD4 de 40 e crise convulsiva com tomografia normal: **tinta nanquim e antígeno criptocócico**. {q-gdhiv-212}
- Cefaleia há 2 semanas, rigidez de nuca e leveduras no líquor: **criptococose**; **anfotericina B lipossomal**. {q-sirio2025-010,q-sirio2025-011}
- CD4 de 48, diplopia e papiledema: **anfotericina B + flucitosina**, punções de alívio e **TARV adiada por 4 a 6 semanas**. {q-uspsp4-005}
- Neurocriptococose com hipertensão intracraniana: **punção lombar seriada** é a conduta (a prova deu como incorreta a derivação ventricular externa como inicial). {q-gdhiv-028}
- Diabético sem HIV com meningite subaguda e tinta nanquim: **anfotericina B**. {q-gdhiv-162}
- Micose invasiva mais comum e de maior risco de óbito: **criptococose disseminada**. {q-gdhiv-078}
- Aids com acometimento pulmonar e meningite: ***Cryptococcus***. {q-gdhiv-103}
- **LEMP** é causada pelo **vírus JC**. {q-gdhiv-029}
- CD4 de 92 com fraqueza, disfagia e fala em declínio subagudo: **LEMP**. {q-gdhiv-082}
- Encefalopatia pelo HIV: evolução **crônica**, não aguda. {q-gdhiv-113}` },
        { id: "outras-oportunistas", titulo: "Candidíase, CMV, diarreia crônica e outras", conferir: true, diretrizes: ["pcdt-hiv-adultos"],
          questoes: ["q-gdhiv-071","q-gdhiv-174","q-gdhiv-178","q-gdhiv-179","q-gdhiv-205","q-gdhiv-189","q-gdhiv-190","q-gdhiv-211","q-gdhiv-217","q-simepm89-052","q-scmsp2026-005"],
          prosa: `[[A causa mais comum de **disfagia e odinofagia** na aids é a **esofagite por *Candida***, tratada de início com **fluconazol** empírico; quando **não há resposta** ao antifúngico, com **úlceras serpiginosas ou profundas** e biópsia com **inclusões intranucleares** (olho de coruja), é **CMV**, e o tratamento é **ganciclovir**; a **queilite angular** (fissuras e crostas nas comissuras) é por *Candida albicans*.|q-gdhiv-174,q-gdhiv-071,q-gdhiv-205,q-simepm89-052]] [[Na **diarreia crônica** do paciente com aids as causas são CMV, *Isospora*, *Cryptosporidium* e ameba; a **colite por CMV** se diagnostica por **colonoscopia com biópsia**; a **isosporíase** responde ao sulfametoxazol-trimetoprim, e a criptosporidiose não tem antimicrobiano eficaz; a diarreia **aquosa aguda** com CD4 de 380 é bacteriana comum.|q-gdhiv-211,q-gdhiv-190,q-gdhiv-189,q-gdhiv-217]] [[O homem com odinofagia e disfagia por três meses, perda de peso e placas esbranquiçadas no esôfago deve ser investigado para HIV com imunodeficiência avançada; e no HIV com **febre e hepatoesplenomegalia** de área endêmica, a sorologia é **pouco sensível** para a leishmaniose visceral.|q-gdhiv-178,q-gdhiv-179,q-scmsp2026-005]]`,
          texto: `- Aids com disfagia e odinofagia sem lesão oral: tratar **empiricamente com fluconazol**. {q-gdhiv-174}
- CD4 de 35, úlceras esofágicas sem vesículas e inclusões intranucleares: **ganciclovir**. {q-gdhiv-071,q-gdhiv-205}
- Candidíase oral e esofágica com perda de peso e doença de 3 meses: suspeitar de **imunodeficiência avançada (aids)**. {q-gdhiv-178,q-gdhiv-179}
- Fissuras e crostas nas comissuras: **Candida albicans**. {q-simepm89-052}
- Diarreia crônica na aids: **CMV, *Isospora*, *Cryptosporidium* e ameba**. {q-gdhiv-211}
- **Colite por CMV**: colonoscopia com biópsia. {q-gdhiv-190}
- *Isospora* responde ao SMX-TMP; ***Cryptosporidium*** não. {q-gdhiv-189}
- Febre e diarreia aquosa aguda com CD4 de 380: **metronidazol** (a prova). {q-gdhiv-217}
- Febre, hepatoesplenomegalia e área endêmica de leishmaniose: a **sorologia não é o melhor método**. {q-scmsp2026-005}` },
        { id: "tb-profilaxias", titulo: "Tuberculose e profilaxias primária e secundária", conferir: true, diretrizes: ["pcdt-hiv-adultos"],
          questoes: ["q-gdhiv-009","q-gdhiv-051","q-gdhiv-052","q-gdhiv-087","q-inf-18","q-gdhiv-031","q-gdhiv-152","q-gdhiv-155","q-gdhiv-198","q-gdhiv-216","q-gdhiv-116"],
          prosa: `[[A pessoa com HIV tem **maior risco de tuberculose**, que é a condição de **maior impacto na mortalidade** por aids; **todo paciente com tuberculose deve receber oferta do teste de HIV**, e o **rastreio de tuberculose** vai a quem tem HIV e tosse, febre e sudorese (CD4 de 50); o jovem com HIV recém-diagnosticado e baciloscopia positiva recebe **RHZE** e a orientação sobre a coinfecção.|q-gdhiv-009,q-gdhiv-052,q-gdhiv-051]] [[A **TARV na coinfecção** se inicia **entre a 2ª e a 8ª semana** do tratamento da tuberculose: **na 2ª semana** se o CD4 é menor que 200 ou há sinais de imunodeficiência avançada, e a prova considerou **inadequado** esperar até a 5ª semana nesses pacientes.|q-gdhiv-087]]

[[A **profilaxia primária** depende do CD4: com **CD4 de 120**, **sulfametoxazol-trimetoprim** (pneumocistose); com **CD4 de 422 não há** profilaxia das oportunistas, e a que se aplica é a **vacina pneumocócica**, indicada a todos; a **isoniazida** vai a quem tem **contato intradomiciliar** com tuberculose ativa e a quem tem prova tuberculínica de 5 mm ou mais, e é desnecessária em quem não tem contato e a prova é menor que 5 mm; a *Candida* não tem profilaxia primária.|q-inf-18,q-gdhiv-152,q-gdhiv-155,q-gdhiv-198,q-gdhiv-216]] [[A **profilaxia secundária** da pneumocistose pode ser suspensa com **CD4 acima de 200** por pelo menos três meses sob TARV; a doença disseminada por *Mycobacterium avium* ocorre com **CD4 abaixo de 50**; o corticoide **não** é contraindicado na pneumocistose grave; e a vacina antipneumocócica é indicada a toda pessoa com HIV.|q-gdhiv-031,q-gdhiv-116]]`,
          texto: `- A tuberculose em PVHA é a condição de **maior impacto na mortalidade**; ofertar o **teste de HIV a todo caso**. {q-gdhiv-009}
- Jovem com baciloscopia positiva e candidíase: **RHZE** e orientação sobre a coinfecção. {q-gdhiv-051}
- HIV com CD4 de 50, tosse, febre e sudorese há 3 semanas: **rastrear tuberculose**. {q-gdhiv-052}
- TARV na tuberculose: **2ª a 8ª semana**; com CD4 abaixo de 200, na **2ª semana** (não na 5ª). {q-gdhiv-087}
- **CD4 de 120**: profilaxia primária com **sulfametoxazol-trimetoprim**. {q-inf-18}
- **CD4 de 422**: sem profilaxia das oportunistas; a vacina é a **pneumocócica**. {q-gdhiv-152}
- CD4 de 22, prova tuberculínica menor que 5 mm e sem contato: **isoniazida desnecessária**. {q-gdhiv-155}
- Contato intradomiciliar de tuberculose: **isoniazida** é indicada, mesmo com prova menor que 5 mm (a prova deu como incorreto não indicar). {q-gdhiv-198}
- Profilaxia primária **não** cobre *Candida albicans*. {q-gdhiv-216}
- Profilaxia secundária da pneumocistose: suspender com **CD4 acima de 200** sustentado; MAC com CD4 abaixo de 50. {q-gdhiv-031}
- Vacinação contra o pneumococo é recomendada em quem tem HIV. {q-gdhiv-116}` },
      ],
    },
    {
      id: "prevencao", titulo: "Prevenção: PEP e PrEP",
      introducao: `[[A **profilaxia pós-exposição (PEP)** é **urgência médica**: inicia-se **o mais rápido possível** (idealmente nas primeiras **2 horas**) e **no máximo até 72 horas** da exposição, com **tenofovir + lamivudina + dolutegravir por 28 dias**; a **profilaxia pré-exposição (PrEP)** é a combinação **tenofovir + entricitabina** em comprimido diário para quem tem exposição frequente.|q-famema2023-036,q-uspsp5-086,q-gdhiv-069,q-gdhiv-054]]`,
      fragmentos: [
        { id: "pep", titulo: "Profilaxia pós-exposição: quem, quando e com o quê", conferir: true, diretrizes: ["pcdt-pep-prep"],
          questoes: ["q-inf-19","q-famema2023-036","q-uspsp5-086","q-usprp2025-041","q-gdhiv-006","q-gdhiv-014","q-gdhiv-035","q-gdhiv-042","q-gdhiv-043","q-gdhiv-069","q-gdhiv-083","q-gdhiv-096","q-gdhiv-122","q-gdhiv-127","q-gdhiv-128","q-gdhiv-130","q-gdhiv-135","q-gdhiv-146","q-gdhiv-159","q-gdhiv-160"],
          prosa: `A PEP impede o estabelecimento da infecção, por isso o **prazo é fixo**. [[A exposição de risco é a **perfurocortante com material infectante** (sangue, sêmen, secreções genitais, líquidos de cavidade), a **relação anal ou vaginal desprotegida** e a **violência sexual**; **saliva, suor, lágrimas, urina, fezes, vômitos e secreções nasais sem sangue** não indicam PEP; a PEP **se inicia em até 72 horas** (mantida 28 dias) com esquema preferencial de **tenofovir + lamivudina + dolutegravir**; o esquema de 7 dias está errado; e o acesso à PEP deve ser **ampliado**, e não restringido.|q-gdhiv-128,q-gdhiv-160,q-gdhiv-043,q-gdhiv-069,q-gdhiv-122,q-gdhiv-130]] [[O homem com relação anal receptiva desprotegida há cerca de 24 horas repete o **teste rápido** e, se não reagente, inicia a PEP; a gestante com ruptura de preservativo há 26 horas e parceiro com HIV sem tratamento, com teste negativo, faz **profilaxia com lamivudina, tenofovir e dolutegravir**; o médico que perfura o dedo com paciente-fonte de alto risco (pneumocistose) inicia a PEP sem esperar o teste do paciente.|q-uspsp5-086,q-usprp2025-041,q-gdhiv-042]] [[No acidente com material biológico: **notificar** o acidente de trabalho, **verificar a vacinação**, dar suporte emocional e **coletar sorologias** de base; na criança com acidente de perfurocortante, a PEP é **zidovudina + lamivudina + raltegravir**, em até 72 horas, por 28 dias, com sorologia basal e seriada aos 30 e 90 dias.|q-gdhiv-035,q-gdhiv-014]]`,
          texto: `- Acidente com agulha usada em paciente com HIV e carga viral detectável: PEP **o mais rápido possível, até 72 horas, por 28 dias**. {q-inf-19}
- A PEP deve ser introduzida em até **72 horas**. {q-famema2023-036,q-gdhiv-043,q-gdhiv-096,q-gdhiv-135,q-gdhiv-146}
- Relação anal desprotegida há 24 horas, teste rápido: **novo teste e PEP com tenofovir + lamivudina + dolutegravir por 28 dias**. {q-uspsp5-086}
- Gestante com ruptura de preservativo e parceiro sem tratamento: **PEP com lamivudina, tenofovir e dolutegravir**. {q-usprp2025-041}
- PEP = antirretrovirais por tempo limitado depois de uma exposição de risco. {q-gdhiv-006}
- Esquema preferencial: **dolutegravir + lamivudina + tenofovir**. {q-gdhiv-069}
- Violência sexual: PEP **em até 72 horas**; esquema de 7 dias com AZT/3TC é **errado**. {q-gdhiv-083,q-gdhiv-122}
- Criança com acidente perfurocortante: **zidovudina + lamivudina + raltegravir**, 28 dias. {q-gdhiv-014}
- Acidente com material biológico: **notificar, ver vacinas, suporte emocional e coleta**. {q-gdhiv-035}
- Fonte de alto risco (pneumocistose): **iniciar a PEP já**, sem esperar o resultado. {q-gdhiv-042}
- **Secreções nasais**, vômitos e outros líquidos sem sangue **não** são infectantes. {q-gdhiv-128,q-gdhiv-160}
- O PCDT busca atenção integral a IST, HIV e hepatites; é preciso **ampliar** o acesso. {q-gdhiv-127,q-gdhiv-130}
- Primeiro atendimento é **urgência médica**; iniciar de preferência em até 2 horas. {q-gdhiv-159}` },
        { id: "prep", titulo: "Profilaxia pré-exposição", conferir: true, diretrizes: ["pcdt-pep-prep"],
          questoes: ["q-unifesp2026-058","q-einstein2025-066","q-usprp2027-042","q-gdhiv-054","q-gdhiv-057","q-gdhiv-106","q-gdhiv-114"],
          prosa: `[[A PrEP é **tenofovir + entricitabina** em um comprimido diário e se indica pela **exposição frequente**, avaliada pelas práticas sexuais e pelos parceiros, e **não por pertencer a um "grupo de risco"**; a adolescente de mais de 15 anos e mais de 35 kg, sexualmente ativo, é elegível; o adolescente cisgênero heterossexual com relações esporádicas e dificuldade com o preservativo pode usar a PrEP **sob demanda**; a gestante com parceiro soropositivo que não usa preservativo e teste negativo recebe **PrEP contínua**.|q-gdhiv-054,q-gdhiv-057,q-einstein2025-066,q-usprp2027-042,q-unifesp2026-058]] [[A PrEP protege **após 7 dias de uso na relação anal e 20 dias na vaginal**, e a OMS recomenda a PrEP oral com tenofovir e emtricitabina.|q-gdhiv-106,q-gdhiv-114]]`,
          texto: `- A PrEP usa **tenofovir + entricitabina**. {q-gdhiv-054}
- Pertencer a um grupo de risco **não basta**; é preciso avaliar a exposição frequente. {q-gdhiv-057}
- Adolescente de 16 anos homoafetivo e sexualmente ativo: **PrEP** (acima de 15 anos e 35 kg). {q-einstein2025-066}
- Adolescente heterossexual de 16 anos com 3 a 4 relações por mês e dificuldade com preservativo: **PrEP sob demanda**. {q-usprp2027-042}
- Gestante de 12 semanas, parceiro em privação de liberdade que recusa preservativo: **PrEP contínua**. {q-unifesp2026-058}
- Efeito protetor: **7 dias** (anal) e **20 dias** (vaginal). {q-gdhiv-106}
- A PrEP oral com tenofovir e emtricitabina é recomendada pela OMS. {q-gdhiv-114}` },
      ],
    },
    {
      id: "transmissao-vertical", titulo: "Gestante e recém-nascido exposto",
      introducao: `[[A **carga viral materna** é o principal fator de risco da transmissão vertical, que ocorre na gestação (sobretudo no fim), no **parto** e na **amamentação**; o parto vaginal, **por si só**, não reduz o risco, e o que o reduz é a **supressão viral** pela TARV.|q-gdhiv-145,q-gdhiv-143,q-gdhiv-153]]`,
      fragmentos: [
        { id: "gestante", titulo: "Gestante com HIV: terapia, genotipagem e via de parto", conferir: true, diretrizes: ["pcdt-tv"],
          questoes: ["q-adap22-060","q-adap26-058","q-tp20202-113","q-tp20212-090","q-unicamp2023-063","q-einstein2026-048","q-gdhiv-008","q-gdhiv-059","q-gdhiv-060","q-gdhiv-061","q-gdhiv-104","q-gdhiv-140","q-gdhiv-142","q-gdhiv-145","q-gdhiv-153","q-gdhiv-136","q-gdhiv-143","q-gdhiv-129"],
          prosa: `[[A gestante com HIV inicia a **TARV imediatamente** (tenofovir, lamivudina e dolutegravir), **sem esperar** carga viral, CD4 ou genotipagem, mesmo com 32 semanas, e mantém o esquema durante toda a gestação; o teste anti-HIV é oferecido na primeira consulta e **repetido com 30 semanas** se negativo.|q-adap22-060,q-adap26-058,q-gdhiv-142]] [[A **via de parto** depende da carga viral do fim da gestação: com carga viral **abaixo de 1.000 cópias/mL após a 34ª semana**, a via é de **indicação obstétrica**, podendo ser vaginal, com **manutenção da TARV habitual**; a **zidovudina venosa** só é dispensada com carga **indetectável (menor que 50)**, e entre 50 e 1.000 ela é recomendada no parto; com carga viral **acima de 1.000** ou desconhecida, indica-se a **cesárea eletiva a partir da 38ª semana**, com zidovudina venosa; e a gestante sem carga viral do 3º trimestre em trabalho de parto (bolsa rota há menos de 4 horas) tem a cesárea como via mais indicada.|q-unicamp2023-063,q-gdhiv-008,q-gdhiv-060,q-gdhiv-061,q-tp20202-113,q-gdhiv-140]] [[O **parto empelicado** é recomendado quando a cesárea é indicada; a criança fica em **alojamento conjunto**, e **o aleitamento materno é contraindicado**, mesmo com profilaxia correta; a **vacina Hib** não deve ser evitada na mulher com HIV.|q-gdhiv-104,q-gdhiv-136,q-einstein2026-048]]`,
          texto: `- Gestante de 32 semanas com HIV: **iniciar TDF + 3TC + DTG de imediato**, sem esperar exames. {q-adap22-060}
- Gestante de 10 semanas com CV de 38.000: **tenofovir + lamivudina + dolutegravir** durante toda a gestação. {q-adap26-058}
- Teste anti-HIV na primeira consulta e **repetido com 30 semanas**. {q-gdhiv-142}
- Carga viral maior que 1.000 com 35 semanas: **cesárea eletiva a partir da 38ª semana**. {q-tp20202-113}
- Carga viral indetectável após a 34ª semana: **via obstétrica**, pode ser vaginal; **manter a TARV oral** habitual. {q-gdhiv-008,q-gdhiv-060}
- Com carga viral abaixo de 1.000 na 35ª semana e AZT venoso no parto: **parto vaginal** (a prova). {q-tp20212-090}
- TARV regular e carga viral indetectável às 18 e 35 semanas: **parto vaginal**, evitar episiotomia, sem AZT venoso. {q-unicamp2023-063}
- Carga viral acima de 1.000 (ou desconhecida) depois da 34ª semana: **cesárea eletiva**. {q-gdhiv-061}
- Sem carga viral do 3º trimestre em trabalho de parto: **cesariana**. {q-gdhiv-140}
- Principal fator de risco: **a carga viral materna**; o parto vaginal por si só não reduz o risco. {q-gdhiv-145,q-gdhiv-153}
- A transmissão ocorre na **gestação, no parto e na amamentação**. {q-gdhiv-143,q-gdhiv-129}
- **Alojamento conjunto**; aleitamento **contraindicado**. {q-gdhiv-104,q-gdhiv-136}
- Adolescente de 16 anos com TARV desde o 1º trimestre: o RN de menos de 1.500 g também recebe zidovudina. {q-gdhiv-059}
- A vacina contra *Haemophilus* **não** deve ser evitada na mulher com HIV (menor de 19 anos). {q-einstein2026-048}` },
        { id: "rn-profilaxia", titulo: "Recém-nascido exposto: cuidados imediatos e profilaxia", conferir: true, diretrizes: ["pcdt-tv"],
          figuras: [{ arquivo: "figuras/rn-exposto.svg", legenda: "Esquema autoral: recém-nascido exposto ao HIV, da sala de parto ao seguimento." }],
          questoes: ["q-unifesp2022-060","q-gdhiv-018","q-gdhiv-024","q-gdhiv-025","q-gdhiv-026","q-gdhiv-027","q-gdhiv-056","q-gdhiv-089","q-gdhiv-098","q-gdhiv-100","q-gdhiv-107","q-gdhiv-109","q-gdhiv-125","q-gdhiv-139","q-gdhiv-141","q-gdhiv-147","q-gdhiv-149","q-gdhiv-150","q-gdhiv-151","q-gdhiv-166","q-gdhiv-170","q-gdhiv-177","q-gdhiv-181","q-gdhiv-187","q-gdhiv-196","q-gdhiv-199","q-gdhiv-209"],
          prosa: `[[Todo recém-nascido de mãe com HIV (mesmo bem tratada) recebe **zidovudina oral** (4 mg/kg a cada 12 horas) **nas primeiras 2 horas de vida (no máximo 4)** e **limpeza do sangue e das secreções com compressas, seguida de banho em água corrente**; **não se evita o contato com a mãe**, mas **não se amamenta** (fórmula infantil); e a zidovudina **não** se inicia depois de 48 horas.|q-gdhiv-187,q-gdhiv-166,q-gdhiv-209,q-gdhiv-107,q-gdhiv-170,q-gdhiv-018,q-gdhiv-141,q-gdhiv-025]] [[Quando a profilaxia materna **não foi completa** (diagnóstico no parto, sem pré-natal, início tardio da TARV, sem carga viral), acrescentam-se **três doses de nevirapina** (nas primeiras 48 horas, 48 horas depois e 96 horas depois da segunda), à zidovudina; o prematuro de 28 semanas recebe zidovudina; e o de 30 a 35 semanas que não pode usar a via oral recebe **zidovudina venosa** (1,5 mg/kg a cada 12 horas nos primeiros 14 dias).|q-gdhiv-139,q-gdhiv-147,q-gdhiv-150,q-gdhiv-100,q-gdhiv-089,q-gdhiv-149,q-gdhiv-181,q-unifesp2022-060,q-gdhiv-199]] O principal efeito adverso da zidovudina no recém-nascido é a **anemia**; a duração do esquema é de **4 semanas** nas orientações atuais, e provas anteriores deram **6 semanas** (ver Armadilhas).`,
          texto: `- RN de 28 semanas, mãe com HIV diagnosticado no parto: **zidovudina** (a prova: 28 dias). {q-unifesp2022-060}
- Mãe com HIV no parto e RN a termo: **banho precoce em água corrente**, AZT oral e nevirapina; **não faz parte** a sorologia por Elisa. {q-gdhiv-018}
- Efeito adverso da zidovudina no RN: **anemia**. {q-gdhiv-024}
- RN de mãe com HIV, parto cesáreo, sem pré-natal: **não amamentar**, fórmula, **AZT oral nas 2 primeiras horas**. {q-gdhiv-025}
- Duração da zidovudina: **4 semanas**. {q-gdhiv-026}
- Parto empelicado quando a cesárea é indicada. {q-gdhiv-027}
- Independentemente da carga viral materna: **banho imediato e AZT nas primeiras 4 horas**. {q-gdhiv-056}
- RN pré-termo de mãe com teste rápido positivo: **nevirapina em 3 doses** (nascimento, 48 e 96 horas depois). {q-gdhiv-089}
- Não há benefício de iniciar a profilaxia depois de 48 horas de vida. {q-gdhiv-098}
- Profilaxia materna incompleta: **somar a nevirapina** ao esquema do RN. {q-gdhiv-100}
- Limpar o RN com compressas e **banho com água corrente**. {q-gdhiv-107}
- Zidovudina **preferencialmente nas primeiras 8 horas** (referência antiga) e AZT 4 mg/kg a cada 12 horas. {q-gdhiv-109,q-gdhiv-209}
- Mãe com VDRL 1/16: **VDRL do RN** e, se positivo, penicilina cristalina, além de AZT. {q-gdhiv-125}
- Nevirapina em 3 doses se **a mãe não usou antirretroviral** na gestação. {q-gdhiv-139}
- Evitar contato da mãe nas primeiras 24 horas é **errado**. {q-gdhiv-141}
- Diagnóstico materno no trabalho de parto: **AZT 4 mg/kg 12/12 h por 4 semanas e NVP em 3 doses**. {q-gdhiv-147,q-gdhiv-150}
- Mãe sem tratamento na gestação: **nevirapina e AZT** orais nas primeiras horas. {q-gdhiv-149,q-gdhiv-181}
- A droga é a **zidovudina**; **todo RN** de mãe com HIV a recebe. {q-gdhiv-151,q-gdhiv-166,q-gdhiv-187}
- Primeira dose de AZT **após 48 horas** é conduta incorreta. {q-gdhiv-170}
- Diagnóstico tardio: a prova deu **AZT por 6 semanas** (ver Armadilhas). {q-gdhiv-177,q-gdhiv-196}
- Prematuro de 34 semanas sem via oral: **AZT venoso 1,5 mg/kg 12/12 h** por 14 dias. {q-gdhiv-199}` },
        { id: "rn-seguimento", titulo: "Diagnóstico e seguimento da criança exposta ou infectada", conferir: true, diretrizes: ["pcdt-hiv-criancas"],
          questoes: ["q-gdhiv-002","q-gdhiv-044","q-gdhiv-047","q-gdhiv-058","q-gdhiv-081","q-gdhiv-097","q-gdhiv-105","q-gdhiv-111","q-gdhiv-124","q-gdhiv-144","q-gdhiv-169","q-gdhiv-171","q-gdhiv-173","q-gdhiv-175","q-gdhiv-176","q-gdhiv-201","q-gdhiv-207","q-gdhiv-129"],
          prosa: `[[**Abaixo de 18 meses o teste rápido não confirma infecção**, porque os anticorpos maternos atravessam a placenta; o diagnóstico é por **carga viral** (RNA ou DNA): **duas cargas virais detectáveis** (a primeira pelo menos duas semanas depois da profilaxia) indicam infecção em mais de 95 % dos casos, e carga viral abaixo de 5.000 cópias/mL deve ser **repetida**; com dois resultados baixos consecutivos, avalia-se o contexto, o DNA pró-viral e o CD4; e três cargas indetectáveis (a última depois dos 4 meses) excluem a infecção.|q-gdhiv-058,q-gdhiv-044,q-gdhiv-176,q-gdhiv-169,q-gdhiv-124,q-gdhiv-173]] [[O **sulfametoxazol-trimetoprim** é **universal** para a criança exposta a partir de **4 a 6 semanas**, até a exclusão da infecção; antes da alta não se colhe exame adicional (a carga viral vem em 4 a 6 semanas); a criança infectada recebe TARV **independentemente de CD4, sintomas e carga viral**, e na faixa de 1 a 5 anos o CD4 abaixo de 500 indica imunodepressão grave.|q-gdhiv-175,q-gdhiv-201,q-gdhiv-047,q-gdhiv-097,q-gdhiv-207]] [[A criança exposta **não infectada** tem mais infecções bacterianas e quadros mais graves; a maioria é infectada por transmissão materno-infantil; a pneumonia intersticial linfocítica dá tosse crônica, hipoxemia e baqueteamento; e o tratamento visa preservar ou reconstituir a imunidade.|q-gdhiv-002,q-gdhiv-105,q-gdhiv-081,q-gdhiv-111]]`,
          texto: `- RN de 15 dias com teste rápido positivo: **exposição vertical**, manter AZT e depois **carga viral**; o anticorpo materno explica o teste. {q-gdhiv-058}
- Duas cargas virais acima de 5.000 cópias/mL (a primeira 2 semanas depois do AZT): **confirmam a infecção**. {q-gdhiv-044}
- Duas cargas virais detectáveis em momentos distintos: infecção em mais de 95 %. {q-gdhiv-176}
- Carga viral detectável abaixo de 5.000 em menor de 18 meses: **repetir**. {q-gdhiv-169}
- Dois resultados baixos consecutivos: avaliar o contexto, DNA pró-viral e CD4. {q-gdhiv-124}
- Primeira carga detectável e depois duas indetectáveis (a última após 4 meses): **não infectada**. {q-gdhiv-173}
- Lactente com cargas de 5.500 e 550.000: **iniciar a TARV e manter o SMX-TMP**. {q-gdhiv-047}
- **SMX-TMP universal** a partir de 4 a 6 semanas em exposto. {q-gdhiv-175}
- RN com profilaxia adequada, antes da alta: **nenhum exame** adicional. {q-gdhiv-201}
- TARV para **toda** criança infectada. {q-gdhiv-097}
- Aos 2 anos, CD4 abaixo de 500: **imunodepressão grave**. {q-gdhiv-207}
- A TARV visa **preservar ou reconstituir a imunidade**. {q-gdhiv-111}
- Exposta e não infectada: **mais infecções bacterianas**. {q-gdhiv-002,q-gdhiv-105}
- Tosse crônica, hipoxemia e baqueteamento na criança: **pneumonia intersticial linfocítica**. {q-gdhiv-081}
- A maioria das crianças se infecta por **transmissão materno-infantil**. {q-gdhiv-129}
- Com carga viral materna abaixo de 1.000 no fim da gestação, a via de parto é **obstétrica**. {q-gdhiv-171}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual (muitas provas citam protocolos de 2010, 2017 e 2018). Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-gdhiv-026","q-gdhiv-177","q-gdhiv-196","q-gdhiv-109","q-unifesp2022-060","q-tp20212-090","q-gdhiv-028","q-uspsp4-005","q-gdhiv-217","q-gdhiv-075","q-gdhiv-198"],
          prosa: `[[A **zidovudina do recém-nascido** dura **4 semanas** no protocolo atual; as provas deram **6 semanas** (gdhiv-177 e gdhiv-196, de protocolos anteriores), **28 dias** em prematuro (UNIFESP 2022) e disseram que se inicia "preferencialmente nas primeiras 8 horas", quando o certo é **nas primeiras 2 horas**.|q-gdhiv-026,q-gdhiv-177,q-gdhiv-196,q-unifesp2022-060,q-gdhiv-109]] [[Na criptococose com hipertensão intracraniana, a **punção lombar de alívio seriada** é a conduta (a derivação ventricular só em falha), e a **TARV é adiada por 4 a 6 semanas**.|q-gdhiv-028,q-uspsp4-005]] [[Com carga viral abaixo de 1.000 às 35 semanas, a prova (Teste de Progresso 2021) cobrou **aguardar o parto vaginal**, ao passo que a regra mais recente fixa o corte em **50 cópias/mL** para dispensar a zidovudina venosa; a coinfecção de TB deve começar a TARV na **2ª semana** se o CD4 é menor que 200.|q-tp20212-090,q-gdhiv-087]]`,
          texto: `- Regra: AZT do RN por **4 semanas**; a prova deu **6 semanas** (gdhiv-177 e gdhiv-196) e **28 dias** em prematuro (UNIFESP 2022). {q-gdhiv-026,q-gdhiv-177,q-gdhiv-196,q-unifesp2022-060}
- Regra: AZT **nas primeiras 2 horas**; a prova deu "preferencialmente nas primeiras 8 horas". {q-gdhiv-109}
- Regra: criptococose com hipertensão intracraniana: **punção de alívio**; derivação só em falha. {q-gdhiv-028,q-uspsp4-005}
- Regra: carga viral indetectável dispensa AZT venoso; a prova (TP 2021) cobrou **parto vaginal** com carga viral menor que 1.000. {q-tp20212-090}
- Regra: diarreia aquosa aguda com CD4 de 380 é bacteriana comum; a prova deu **metronidazol**. {q-gdhiv-217}
- Regra: isoniazida no contato intradomiciliar; a prova deu como **incorreto** não indicar. {q-gdhiv-198}` },
      ],
    },
  ],
});
