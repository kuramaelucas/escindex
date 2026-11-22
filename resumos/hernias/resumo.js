/* resumos/hernias/resumo.js — resumo adaptativo de hérnias da parede abdominal: anatomia e tipos da virilha, hérnia
   inguinal do adulto (indicação, técnica, nervos), femoral, encarceramento e estrangulamento, hérnia na criança,
   hérnias ventrais (umbilical, epigástrica, incisional) e tipos raros.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- hernias */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "hernias",
  titulo: "Hérnias da parede abdominal",
  assunto: "ass-hernias",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "herniasurge", texto: "HerniaSurge Group — diretriz internacional de hérnia da virilha (2018; atualização de 2023, BJS Open)", edicao: "2023", lidoEm: null },
    { id: "wses-hernias", texto: "WSES — reparo de urgência das hérnias complicadas da parede abdominal (2017)", lidoEm: null },
    { id: "ehs-ventrais", texto: "EHS/AHS — hérnias umbilicais e epigástricas (2020); EHS — hérnias incisionais (2014); classificação EHS da hérnia inguinal (2007)", lidoEm: null },
    { id: "cirurgia-pediatrica", texto: "Tratados de cirurgia pediátrica — hérnia inguinal encarcerada do lactente e hérnia umbilical da criança", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anulada pela banca", questoes: ["q-scmsp2022-018"] },
  ],
  doencas: [
    {
      id: "anatomia", titulo: "Anatomia da virilha e tipos de hérnia",
      introducao: `Hérnia é a saída de uma víscera ou de gordura por um defeito da parede que a contém. Na parede abdominal anterior, de fora para dentro, as camadas são **pele, tecido subcutâneo, fáscia superficial, músculo oblíquo externo, oblíquo interno, transverso do abdome, fáscia transversalis, gordura pré-peritoneal e peritônio**. [[As hérnias da virilha se distinguem pela posição em relação a duas referências: o **ligamento inguinal** (acima dele, inguinal; abaixo, femoral) e os **vasos epigástricos inferiores** (lateral a eles, indireta; medial, direta).|q-iamspe2022-029,q-famerp2026-066,q-sirio2024-022]] Quem domina essas duas referências resolve a maior parte das questões de diagnóstico, de técnica e de complicação.

O resumo segue a ordem em que a prova cobra: anatomia e tipos; hérnia inguinal do adulto; hérnia femoral; encarceramento e estrangulamento; hérnia na criança; hérnias ventrais; tipos raros; armadilhas e uma tabela comparativa.

Veja também: **Trauma abdominal** (hérnia diafragmática e parede abdominal no trauma), **Abdome agudo e malformações digestivas do recém-nascido**, **Puericultura** (umbigo do recém-nascido) e, quando escritos, **Obstrução intestinal** (a hérnia encarcerada é causa de obstrução), **Apendicite** (apêndice no saco herniário) e **Cuidados perioperatórios**.`,
      fragmentos: [
        { id: "anat-parede", titulo: "Camadas da parede, triângulo de Hesselbach e nervos do canal", conferir: true,
          questoes: ["q-amrigs2024-040","q-amrigs2025-021","q-famema2021-016","q-sirio2024-022"],
          prosa: `O **triângulo de Hesselbach** é o ponto da parede posterior do canal inguinal que não tem músculo na frente: [[é limitado **inferiormente pelo ligamento inguinal**, **medialmente pela borda lateral do músculo reto abdominal** e **superolateralmente pelos vasos epigástricos inferiores**.|q-famema2021-016,q-amrigs2025-021]] Por ser coberto só pela fáscia transversalis, é a zona de maior fraqueza, e a hérnia que sai nele, medial aos vasos epigástricos, é a **direta**.

[[O **ramo genital do nervo genitofemoral** acompanha o funículo espermático pelo anel inguinal profundo e pode ser lesado nas hernioplastias; o **tendão conjunto** é formado pelo oblíquo interno e pelo transverso; e a hérnia **indireta** fica lateral aos vasos epigástricos e entra pelo anel inguinal profundo, não por defeito adquirido da parede posterior.|q-amrigs2025-021]] [[Na operação, a lesão que se forma **medialmente aos vasos epigástricos inferiores** ocupa o triângulo de Hesselbach e é uma hérnia **direta**.|q-sirio2024-022]]`,
          texto: `- Camadas da parede, de fora para dentro: pele, subcutâneo, fáscia superficial, **oblíquo externo, oblíquo interno, transverso**, fáscia transversalis, gordura pré-peritoneal e peritônio. {q-amrigs2024-040}
- **Triângulo de Hesselbach**: ligamento inguinal (embaixo), borda lateral do reto abdominal (medial), vasos epigástricos inferiores (superolateral). {q-famema2021-016,q-amrigs2025-021}
- Ramo genital do genitofemoral acompanha o cordão; tendão conjunto = oblíquo interno + transverso. {q-amrigs2025-021}
- Hérnia **medial** aos vasos epigástricos inferiores, no triângulo de Hesselbach, é **direta**. {q-sirio2024-022}` },
        { id: "anat-tipos", titulo: "Indireta, direta e femoral: de onde sai e como distinguir", conferir: true, diretrizes: ["herniasurge"],
          figuras: [{ arquivo: "figuras/hernias-virilha.svg", legenda: "Esquema autoral: as hérnias da virilha direita em relação ao ligamento inguinal e aos vasos epigástricos inferiores." }],
          questoes: ["q-iamspe2022-029","q-tp20222-064","q-sirio2026-035","q-famerp2026-066"],
          prosa: `A **indireta** (oblíqua externa) é a mais comum, em homens e em mulheres: [[sai pelo anel inguinal profundo, **lateral** aos vasos epigástricos, percorre o canal ao lado do cordão e, nos jovens, nasce da **persistência do conduto peritônio-vaginal**.|q-iamspe2022-029,q-tp20222-064]] A **direta** nasce de fraqueza adquirida da parede posterior e empurra a parede, sem acompanhar o cordão. A **femoral** sai **abaixo** do ligamento inguinal, pelo anel femoral (estreito e rígido), medial à veia femoral; os vasos femorais, de lateral para medial nervo, artéria e veia, passam abaixo do ligamento e a hérnia não sai por eles. A direta fica no triângulo de Hesselbach, lateral ao reto abdominal. [[A estrutura que separa a hérnia inguinal da femoral é o **ligamento inguinal**: a inguinal emerge acima dele, a femoral, abaixo, pelo canal femoral.|q-famerp2026-066]]

No exame, o dedo do examinador no canal inguinal durante a manobra de Valsalva mostra a diferença. [[A protrusão que toca a **ponta do dedo** e aparece em pé, desaparecendo deitado, é a **indireta**; a direta empurra a face palmar.|q-sirio2026-035,q-tp20222-064]]`,
          texto: `- A definição anatômica de indireta e direta se baseia nos **vasos epigástricos inferiores** (indireta lateral, direta medial). {q-iamspe2022-029}
- A hérnia mais comum nas mulheres é a **inguinal**, e a direta não é a mais comum em crianças. {q-iamspe2022-029}
- Jovem de 18 anos, protrusão que toca a **ponta do dedo** em pé e some deitado: **indireta**. {q-tp20222-064}
- Massa que aumenta ao esforço e a protrusão sentida na **ponta do dedo** no canal inguinal durante o Valsalva: **indireta**. {q-sirio2026-035}
- O **ligamento inguinal** é a estrutura que distingue a hérnia inguinal (acima) da femoral (abaixo). {q-famerp2026-066}` },
        { id: "anat-classificacao", titulo: "Classificações EHS e Nyhus e hérnia por deslizamento", conferir: true, diretrizes: ["ehs-ventrais"],
          questoes: ["q-scmsp2022-009","q-famerp2022-080"],
          prosa: `A classificação da **European Hernia Society (EHS)** usa uma letra para o tipo e um número para o tamanho do defeito. [[**L** é lateral (indireta), **M** é medial (direta) e **F** é femoral; o número é o diâmetro do anel em polpas digitais: **1** até um dedo, **2** até dois (cerca de 3 cm), **3** mais que isso.|q-scmsp2022-009]] O anel externo com duas polpas digitais em hérnia indireta é, portanto, **L2**. A classificação de **Nyhus** agrupa por tipo e por integridade da parede posterior: o **tipo II** é indireta com anel interno alargado e parede posterior preservada, o **tipo III** tem defeito da parede posterior (**IIIA** direta, **IIIB** indireta grande e **IIIC** femoral) e o **IV** é a recidivada.

Na **hérnia por deslizamento**, [[a parede de uma víscera (bexiga, ceco à direita, sigmoide à esquerda) forma parte do saco herniário, e o risco é lesá-la ao abrir ou ligar o saco.|q-famerp2022-080]]`,
          texto: `- Hérnia inguinal indireta com anel externo de duas polpas digitais: **EHS L2, Nyhus II**; **M** (medial) é direta e **IIIA** é direta. {q-scmsp2022-009}
- Saco herniário formado em parte pela **parede da bexiga**: hérnia **por deslizamento**. {q-famerp2022-080}` },
      ],
    },
    {
      id: "inguinal", titulo: "Hérnia inguinal do adulto",
      introducao: `[[A hérnia inguinal é a mais comum da parede abdominal, o diagnóstico é **clínico** e a indicação de operar depende do sexo, dos sintomas e do risco do paciente: a observação vigilante é segura em homem com hérnia assintomática ou pouco sintomática, e a cirurgia está indicada no homem sintomático e na mulher (pelo risco de a hérnia ser femoral).|q-sessp2022-031,q-sessp2023-003,q-scmsp2025-023]] A operação é feita com tela, por via aberta (Lichtenstein) ou laparoscópica (TAPP e TEP), e a lesão de nervos é a complicação crônica que mais pesa.`,
      fragmentos: [
        { id: "ing-diagnostico", titulo: "Diagnóstico, imagem e epidemiologia", conferir: true, diretrizes: ["herniasurge"],
          questoes: ["q-scmsp2021-021","q-scmsp2023-021","q-sessp2023-003","q-sessp2025-039","q-fmabc2026-037"],
          prosa: `[[O diagnóstico é feito pelo **exame clínico**; o exame de imagem só entra quando a história é de hérnia e o exame físico é vago, e o primeiro é a **ultrassonografia** (dinâmica); persistindo a dúvida, a tomografia é melhor que a ressonância.|q-scmsp2021-021,q-scmsp2023-021,q-sessp2025-039]] O exame físico e a imagem, apesar de sensíveis e específicos para hérnia, **não distinguem de forma confiável** a hérnia inguinal da crural, e é por isso que o cirurgião deve olhar o orifício femoral na operação.

[[Os diagnósticos diferenciais da massa inguinal incluem **linfonodomegalia, hérnia incisional, hidrocele e pubeíte**.|q-sessp2023-003,q-sessp2025-039]] [[Na mulher, a hérnia **femoral** é proporcionalmente mais comum que no homem, mas a **inguinal** continua sendo a mais frequente também nas mulheres; a femoral é cerca de 2 a 4 % das hérnias da virilha.|q-fmabc2026-037,q-scmsp2023-021]]

O que define o **momento** da cirurgia no homem com hérnia pequena e redutível não é o risco de encarceramento, e sim o **prejuízo à qualidade de vida**, e a melhor anestesia para a inguinotomia, desde que o cirurgião domine a técnica, é a **local**.`,
          texto: `- Diagnóstico **clínico**; imagem só em dúvida, e a **ultrassonografia** é o primeiro exame, não a tomografia. {q-scmsp2021-021,q-sessp2025-039}
- Persistindo a dúvida, a **tomografia** é melhor que a ressonância. {q-scmsp2023-021}
- Exame físico e imagem **não distinguem** com segurança inguinal de crural. {q-scmsp2023-021}
- Diferenciais: **linfonodomegalia, hérnia incisional, hidrocele, pubeíte**. {q-sessp2023-003}
- O momento da cirurgia é definido pela **qualidade de vida**, e a **anestesia local** é a melhor para a inguinotomia. {q-sessp2025-039}
- Na mulher, a inguinal continua mais comum que a femoral. {q-fmabc2026-037}` },
        { id: "ing-indicacao", titulo: "Quando operar e quando observar", conferir: true, diretrizes: ["herniasurge"],
          questoes: ["q-sessp2022-031","q-sirio2021-034","q-scmsp2025-023","q-unifesp2023-085","q-sirio2027-028","q-sessp2023-003"],
          prosa: `Em **homem** com hérnia inguinal assintomática ou minimamente sintomática, a hérnia raramente complica (o risco de encarceramento é de cerca de 0,2 % ao ano), então [[**observar** é seguro, e a hérnia achada na tomografia sem queixa não precisa ser operada; no idoso com muitas comorbidades, a observação vale também para as pequenas hérnias umbilical e inguinal redutíveis.|q-sessp2022-031,q-sirio2021-034]] [[Quando há **sintoma** (dor ao esforço, desconforto), a indicação é **reparo eletivo**, sem pedir imagem se o exame é típico.|q-scmsp2025-023,q-sessp2023-003]]

[[Na **mulher**, opera-se mesmo sem sintomas, porque a hérnia pode ser femoral, de risco alto, e a via **laparoscópica** é a preferida porque expõe todo o orifício miopectíneo e trata a femoral oculta.|q-unifesp2023-085,q-sessp2023-003]] [[A hérnia **volumosa, crônica e irredutível** sem sinais de obstrução não é emergência: pede avaliação pré-operatória e de risco para herniorrafia eletiva.|q-sirio2027-028]]`,
          texto: `- Homem de 50 anos com hérnia inguinal **assintomática** achada em tomografia: **observação** é segura. {q-sessp2022-031}
- Idoso de 82 anos, comorbidades graves, hérnias inguinal e umbilical pequenas, redutíveis e assintomáticas: **observação**. {q-sirio2021-034}
- Homem com massa redutível que aumenta ao esforço e desconforto ocasional: **reparo cirúrgico eletivo**, sem imagem. {q-scmsp2025-023}
- Homem sintomático: operar; **mulher** não gestante: operar, sintomática ou não. {q-sessp2023-003}
- Mulher de 54 anos com hérnia inguinal sintomática: **videolaparoscopia** (trata também a femoral oculta). {q-unifesp2023-085}
- Hérnia volumosa, irredutível há anos, sem obstrução: **avaliação de risco e herniorrafia eletiva**. {q-sirio2027-028}` },
        { id: "ing-tecnica", titulo: "Técnicas: Lichtenstein, McVay, Wantz, TAPP e TEP", conferir: true, diretrizes: ["herniasurge"],
          questoes: ["q-amrigs2020-029","q-iamspe2025-034","q-iamspe2023-029","q-unesp2023-068","q-fmabc2021-005","q-fmabc2022-028","q-uspsp1-026","q-iamspe2022-021","q-famema2025-019","q-sirio2026-038"],
          prosa: `A recidiva da hérnia inguinal vem da **tensão** nos tecidos suturados. [[A técnica de **Lichtenstein** coloca tela de polipropileno **sem tensão** pela via anterior; sem tela, o reparo é de Shouldice ou de Bassini, com recidiva maior.|q-amrigs2020-029]] [[A técnica de **McVay** aproxima o tendão do transverso ao ligamento pectíneo (de Cooper) e fecha o anel femoral; a de **Wantz** é um reparo pré-peritoneal aberto com tela grande, a versão unilateral da técnica de Stoppa, usada nas **recidivas** inguinais.|q-iamspe2025-034,q-iamspe2023-029]]

[[As técnicas laparoscópicas **TAPP** (transabdominal pré-peritoneal) e **TEP** (totalmente extraperitoneal) são reforços pré-peritoneais e **exigem tela**; a TAPP tem recidiva semelhante à de Lichtenstein e recuperação mais rápida, com menos dor; o dreno de rotina não é indicado; e a laparoscopia é preferida nas hérnias **bilaterais**.|q-unesp2023-068,q-fmabc2021-005,q-fmabc2022-028,q-amrigs2020-029]] [[Três incisões, uma umbilical e duas laterais simétricas na altura do umbigo, mostram uma hernioplastia inguinal laparoscópica.|q-iamspe2022-021]] [[Em paciente com **prostatectomia radical prévia**, o espaço pré-peritoneal tem fibrose e aderências, e a hérnia inguinal bilateral é operada por duas **inguinotomias com tela**.|q-uspsp1-026]]

[[Um reparo durável exige **tratar o fator agravante** (tosse crônica, obstrução prostática, tumor de cólon, ascite) e reconstruir **sem tensão**; ao encontrar uma hérnia direta, explora-se o cordão à procura de uma indireta associada.|q-famema2025-019]] Na laparoscopia, [[a artéria **corona mortis**, ramo aberrante da obturatória que cruza lateralmente o ligamento de Cooper, é a origem do sangramento arterial na dissecção do espaço de Retzius.|q-sirio2026-038]]`,
          texto: `- **Lichtenstein** é reparo **com tela**; sem tela seria Shouldice ou Bassini. {q-amrigs2020-029}
- **McVay**: sutura do tendão do transverso ao ligamento pectíneo (Cooper). {q-iamspe2025-034}
- **Wantz**: reparo pré-peritoneal aberto com tela grande, nas **recidivas** inguinais. {q-iamspe2023-029}
- **TAPP e TEP**: tela obrigatória; **dreno de rotina** não é indicado. {q-unesp2023-068,q-fmabc2022-028}
- TAPP × Lichtenstein: **recidiva semelhante** e recuperação mais rápida na laparoscopia. {q-fmabc2021-005}
- **Bilateral**: laparoscopia preferida; alta em 24 horas é segura. {q-amrigs2020-029}
- Três incisões (umbilical e duas laterais): **hernioplastia laparoscópica**. {q-iamspe2022-021}
- Bilateral com **prostatectomia radical prévia**: duas **inguinotomias com tela**. {q-uspsp1-026}
- Reparo durável: **tratar tosse, prostatismo, tumor de cólon, ascite**, e reconstruir **sem tensão**. {q-famema2025-019}
- Sangramento arterial ao lado do ligamento de Cooper no TAPP: **corona mortis**. {q-sirio2026-038}` },
        { id: "ing-nervos", titulo: "Nervos da região inguinal e dor crônica (inguinodinia)", conferir: true, diretrizes: ["herniasurge"],
          questoes: ["q-iamspe2022-028","q-iamspe2025-022","q-famerp2023-057","q-uspsp5-055","q-famerp2025-066","q-einstein2025-024"],
          prosa: `Na via anterior o cirurgião abre a aponeurose do oblíquo externo, e três nervos ficam no campo. [[Os mais lesados são o **ilioinguinal** e o **ílio-hipogástrico**, e o terceiro é o **ramo genital do genitofemoral**; os três devem ser identificados e preservados para evitar a dor crônica (inguinodinia).|q-iamspe2022-028,q-famerp2023-057]] O ilioinguinal cruza o oblíquo interno, corre ao lado do cordão e termina no anel externo, com sensibilidade da raiz do pênis, do escroto e dos grandes lábios; o ílio-hipogástrico dá a sensibilidade suprapúbica. [[A dor em **queimação** que irradia para a região inguinal e o escroto semanas após Lichtenstein vem do **ilioinguinal**, e a conduta inicial é **analgesia**.|q-iamspe2025-022,q-uspsp5-055]]

[[A dor e a parestesia **precoces**, com ferida cicatrizada e sem sinais de recidiva ou infecção, são neuropraxia por tração ou compressão e melhoram com **analgésicos simples ou anti-inflamatórios** e observação, sem reoperar.|q-famerp2025-066]] [[Depois da **TAPP**, a dor inguinal com irradiação para a face medial da coxa que persiste por seis semanas vem de **grampos** fixados lateralmente aos vasos epigástricos e abaixo do trato iliopúbico (o "triângulo da dor"), que comprimem o ramo genital do genitofemoral ou o cutâneo femoral lateral, e o tratamento inicial é medicamentoso, com **gabapentina**.|q-einstein2025-024]]`,
          texto: `- Nervos mais lesados na hernioplastia aberta: **ilioinguinal** e **ílio-hipogástrico**. {q-iamspe2022-028}
- Para evitar inguinodinia, preservar **ilioinguinal, ílio-hipogástrico e ramo genital do genitofemoral**. {q-famerp2023-057}
- Nervo que cruza o oblíquo interno, corre com o cordão e inerva raiz do pênis e escroto: **ilioinguinal**. {q-iamspe2025-022}
- Queimação para região inguinal e escroto no 20º dia de Lichtenstein: **ilioinguinal**, **analgesia**. {q-uspsp5-055}
- Parestesia no 12º dia, ferida sem sinais de problema: **analgésicos ou anti-inflamatórios** e observação. {q-famerp2025-066}
- Dor persistente na face medial da coxa após TAPP: **grampos** no triângulo da dor (nervo comprimido), **gabapentina**. {q-einstein2025-024}` },
        { id: "ing-posop", titulo: "Pós-operatório: hematoma e orientações", conferir: true,
          questoes: ["q-sirio2022-039","q-einstein2023-028"],
          prosa: `[[O abaulamento acentuado da região operada com sangramento em porejamento no pós-operatório imediato é **hematoma expansivo**: a coleção sob tensão comprime os tecidos e infecta, e a conduta é **reexplorar em centro cirúrgico**, evacuar e controlar o sangramento.|q-sirio2022-039]] O reparo depende da cicatrização para ganhar resistência, e por isso [[a orientação de esforço no pós-operatório é **não levantar mais de 10 kg nos primeiros 30 dias**.|q-einstein2023-028]]`,
          texto: `- Abaulamento acentuado e sangramento no pós-operatório imediato de Lichtenstein: **reexploração** em centro cirúrgico. {q-sirio2022-039}
- Pós-operatório de hérnia volumosa: **não levantar mais de 10 kg** nos primeiros 30 dias. {q-einstein2023-028}` },
      ],
    },
    {
      id: "femoral", titulo: "Hérnia femoral",
      introducao: `[[A hérnia femoral sai pelo **anel femoral**, abaixo do ligamento inguinal e **medial à veia femoral**; o anel é **estreito e rígido**, e o que passa por ele sofre compressão com facilidade, por isso a femoral é a hérnia da virilha que **mais encarcera e estrangula**, é mais comum em mulheres idosas e, quando operada de urgência, tem mortalidade elevada.|q-famema2021-017,q-uspsp3-103,q-adap26-015]]`,
      fragmentos: [
        { id: "fem-anatomia", titulo: "Anatomia e quadro clínico da hérnia femoral", conferir: true,
          casos: ["q-uspsp3-103"],
          questoes: ["q-famema2021-017","q-famema2022-072","q-uspsp3-103","q-famerp2024-018"],
          prosa: `[[No anel crural a ordem de lateral para medial é nervo, artéria e veia, e **medialmente à veia** fica o canal femoral, por onde sai a hérnia: o saco está **medial aos vasos femorais**.|q-famema2021-017]] [[O **linfonodo de Cloquet** fica no canal femoral e entra no diagnóstico diferencial da hérnia femoral.|q-famema2022-072]] A linha preta sobre o ligamento inguinal na figura mostra o abaulamento **abaixo** dele: [[o abaulamento crural que aparece ao Valsalva e reduz em repouso, em mulher, é a hérnia femoral, e a urgência tem **mortalidade elevada**.|q-uspsp3-103]]

[[O idoso com obstrução de delgado e uma massa endurecida cujo saco está **abaixo do ligamento inguinal e medial à veia femoral** tem hérnia femoral **encarcerada**; a alça hiperemiada, sem necrose, indica encarceramento sem estrangulamento.|q-famerp2024-018]]`,
          texto: `- O saco da femoral fica **medial aos vasos femorais** no anel crural. {q-famema2021-017}
- **Linfonodo de Cloquet** (canal femoral): diagnóstico diferencial da hérnia femoral. {q-famema2022-072}
- Mulher de 54 anos, abaulamento **abaixo** do ligamento inguinal: **femoral**, com mortalidade elevada na urgência. {q-uspsp3-103}
- Obstrução com saco abaixo do ligamento e medial à veia femoral, alça hiperemiada sem necrose: **femoral encarcerada**. {q-famerp2024-018}` },
        { id: "fem-conduta", titulo: "Conduta: operar sempre e a via de reparo", conferir: true, diretrizes: ["herniasurge"],
          questoes: ["q-adap26-015","q-usp2024-028","q-famema2023-061"],
          prosa: `Pelo mecanismo do anel rígido, [[a hérnia femoral deve ser **operada de forma eletiva, mesmo sem sintomas**, porque esperar a complicação é esperar uma cirurgia de urgência mais perigosa; a conduta expectante vale só para a inguinal pouco sintomática do homem, e a cinta herniária não protege.|q-adap26-015,q-usp2024-028]] O achado incidental de hérnia femoral com gordura pré-peritoneal na tomografia, em paciente de 65 anos sem sintomas, tem a mesma indicação. [[Entre os reparos da femoral, o **Trabucco** é pré-peritoneal (posterior), e o McVay, o Lichtenstein e o Bassini-Kirschner são anteriores.|q-famema2023-061]]`,
          texto: `- Mulher com hérnia femoral (colo estreito), mesmo pouco sintomática: **hernioplastia eletiva**, sem esperar complicação. {q-adap26-015}
- Hérnia femoral **achada em exame** de imagem: **operar independente de sintomas**. {q-usp2024-028}
- **Trabucco**: reparo pré-peritoneal (posterior) da femoral. {q-famema2023-061}` },
      ],
    },
    {
      id: "complicadas", titulo: "Encarceramento e estrangulamento",
      introducao: `A hérnia **encarcerada** é a que não reduz; a **estrangulada** é a encarcerada com **isquemia** da alça. [[Os sinais de estrangulamento são dor intensa, **hiperemia da pele**, febre, leucocitose, lactato elevado, obstrução com vômitos e, por fim, peritonite; o encarceramento sozinho é a impossibilidade de reduzir, sem isquemia.|q-adap23-085,q-fmabc2021-005,q-sirio2024-040]] A pergunta que decide a conduta é a mesma em qualquer hérnia: **há sofrimento da alça?**`,
      fragmentos: [
        { id: "enc-conduta", titulo: "Conduta na hérnia inguinal encarcerada", conferir: true, diretrizes: ["herniasurge","wses-hernias"],
          figuras: [{ arquivo: "figuras/encarceramento-conduta.svg", legenda: "Esquema autoral: a conduta na hérnia encarcerada depende de haver ou não sinais de estrangulamento." }],
          questoes: ["q-adap23-085","q-famerp2022-077","q-uspsp4-056","q-tp20252-108","q-unifesp2026-015"],
          prosa: `[[Sem sinais de estrangulamento (afebril, sem hiperemia, sem peritonite, leucócitos e lactato normais), admite-se a **redução manual gentil** sob analgesia, com o paciente deitado, e, se reduzir, opera-se na **mesma internação**; se não reduzir, a cirurgia é imediata.|q-adap23-085]] A redução só é segura se a alça é viável: reduzir às cegas uma alça isquêmica joga o segmento necrótico para dentro da cavidade. Com estrangulamento ou suspeita, a cirurgia de urgência pela inguinotomia avalia a alça, ressecando-a se houver necrose, e repara o defeito. Na criança a regra é a mesma, com cirurgia em 24 a 48 horas após a redução (capítulo da criança).

[[Com **dor intensa, hiperemia, leucocitose e PCR elevados**, e ultrassonografia com alça e líquido no saco, a hérnia está estrangulada e a conduta é **cirurgia de urgência**, não antibiótico, redução ou analgesia com cirurgia eletiva.|q-tp20252-108]] [[A hérnia que doeu, aumentou de volume e **reduziu sozinha** durante o exame, sem peritonite, deve ser **corrigida**, porque o encarceramento pode se repetir; laparotomia seria excessiva.|q-unifesp2026-015]] As provas reais também cobraram a cirurgia direta nos casos sem sinais claros de sofrimento (ver Armadilhas): [[a hérnia inguinal encarcerada há oito horas, com estado geral bom, e a antes redutível que se tornou fixa há 12 horas.|q-famerp2022-077,q-uspsp4-056]]`,
          texto: `- Encarcerada **sem sinais de estrangulamento**: **redução manual gentil** sob analgesia e cirurgia na mesma internação; se falhar, cirurgia imediata. {q-adap23-085}
- Hiperemia, dor intensa, leucocitose, PCR alta e líquido no saco: **cirurgia de urgência**. {q-tp20252-108}
- Hérnia que doeu e **reduziu sozinha** ao exame, sem peritonite: **corrigir** (a via cobrada foi a laparoscópica). {q-unifesp2026-015}
- Encarcerada há 8 horas em jovem, bom estado geral: a prova cobrou **inguinotomia**. {q-famerp2022-077}
- Antes redutível, irredutível há 12 horas, sem obstrução: a prova cobrou **hernioplastia de urgência**. {q-uspsp4-056}` },
        { id: "enc-estrangulada", titulo: "Estrangulamento: via de acesso, enterectomia e tela", conferir: true, diretrizes: ["herniasurge","wses-hernias"],
          casos: ["q-sirio2023-031"],
          questoes: ["q-usp2025-028","q-sirio2024-040","q-uspsp3-116","q-uspsp3-100","q-sirio2023-031","q-einstein2023-029","q-amrigs2025-025","q-einstein2022-016"],
          prosa: `[[Na hérnia inguinal encarcerada com suspeita de estrangulamento (abaulamento endurecido e doloroso, vômitos, distensão, desidratação), a via é a **inguinotomia de urgência**: ela permite examinar a alça, ressecar o segmento inviável e reparar o defeito, e, no paciente com DPOC, ainda dá para operar sob anestesia regional, sem pneumoperitônio.|q-usp2025-028,q-sirio2024-040]] A recidivada, com sinais de sofrimento, segue a mesma via, e [[a cirurgia anterior da hérnia na adolescência não obriga a laparotomia.|q-uspsp3-116]]

Se a alça rompe, [[com **contaminação controlada** do campo, a conduta é a **enterectomia com anastomose primária** pela própria inguinotomia e o reparo com **tela** de Lichtenstein.|q-uspsp3-100]] Fora da inguinal, [[a hérnia **incisional** encarcerada com sinais de obstrução, sem peritonite, é operada de urgência, e a prova cobrou **tela de polipropileno**; já na umbilical estrangulada, a redução manual é contraindicada e a tela é controversa.|q-einstein2023-029,q-amrigs2025-025]]

[[No idoso com **hérnia umbilical encarcerada** sem sinais de estrangulamento, a tomografia serve para **excluir outra doença intra-abdominal**.|q-einstein2022-016]] [[A hérnia da virilha é causa de obstrução intestinal: no idoso com constipação prolongada e cólica, a tomografia que mostra alça em saco herniário com dilatação a montante identifica a **hérnia inguinal** como causa, e a ausência de líquido no saco não exclui o sofrimento da alça.|q-sirio2023-031]]`,
          texto: `- Encarcerada com suspeita de estrangulamento e DPOC grave: **inguinotomia** (permite anestesia regional). {q-usp2025-028}
- Hérnia inguinoescrotal com hiperemia, vômitos e distensão: **inguinotomia de urgência**, não redução nem tomografia. {q-sirio2024-040}
- Recidivada, encarcerada, com hiperemia: **inguinotomia**; a cirurgia prévia não obriga a laparotomia. {q-uspsp3-116}
- Alça rompida com contaminação controlada: **enterectomia com anastomose primária** e **Lichtenstein**. {q-uspsp3-100}
- Incisional encarcerada com obstrução: **cirurgia de urgência com tela de polipropileno**. {q-einstein2023-029}
- Umbilical estrangulada: **redução manual contraindicada**; só o item de estrangulamento é verdadeiro. {q-amrigs2025-025}
- Umbilical encarcerada sem estrangulamento: **tomografia** para excluir outra doença abdominal. {q-einstein2022-016}
- Idoso com constipação de 12 dias e alça em saco inguinal: **hérnia inguinal** causa a obstrução. {q-sirio2023-031}` },
      ],
    },
    {
      id: "pediatrica", titulo: "Hérnias na criança",
      introducao: `[[A hérnia inguinal da criança é **indireta**, por **persistência do conduto peritônio-vaginal**, que deveria se fechar no fim da gestação; é mais comum em meninos e em prematuros, e o risco de encarceramento é maior nos primeiros meses de vida.|q-tp20231-062,q-unesp2026-073]] Como não se fecha sozinha, **opera-se** quando se faz o diagnóstico; já a hérnia **umbilical** da criança, ao contrário, se fecha com o tempo.`,
      fragmentos: [
        { id: "ped-inguinal", titulo: "Hérnia inguinal da criança: fisiopatologia e indicação", conferir: true, diretrizes: ["cirurgia-pediatrica"],
          casos: ["q-unesp2026-073"],
          questoes: ["q-tp20231-062","q-unesp2026-073","q-usprp2024-030","q-unicamp2022-029"],
          prosa: `[[O menino de dois anos com abaulamento inguinal **bilateral** que aparece com a tosse e é redutível tem a hérnia explicada pela **persistência do conduto peritônio-vaginal**; no recém-nascido com testículos tópicos e aumento escrotal, a origem é a mesma.|q-tp20231-062,q-unesp2026-073]] [[No lactente cujo abaulamento aparece **ao choro** e some, com exame normal na consulta, o diagnóstico vem da **história** e a conduta é **herniorrafia eletiva**, sem pedir ultrassonografia e sem apenas observar.|q-usprp2024-030]] [[Na **menina** com abaulamento inguinal irredutível, o conteúdo mais provável é o **ovário**.|q-unicamp2022-029]]`,
          texto: `- Abaulamento inguinal bilateral à tosse em menino de 2 anos: **persistência do conduto peritônio-vaginal**. {q-tp20231-062}
- Recém-nascido com testículos tópicos e aumento escrotal: **persistência do conduto peritônio-vaginal**. {q-unesp2026-073}
- Lactente com abaulamento ao choro e exame normal: **herniorrafia inguinal eletiva**. {q-usprp2024-030}
- Menina de 3 meses com abaulamento irredutível bilateral: conteúdo mais provável, o **ovário**. {q-unicamp2022-029}` },
        { id: "ped-encarcerada", titulo: "Hérnia inguinal encarcerada na criança", conferir: true, diretrizes: ["cirurgia-pediatrica"],
          casos: ["q-unesp2022-061"],
          questoes: ["q-unesp2022-061","q-uspsp2-080","q-uspsp5-070","q-tp20202-064","q-usp2025-068"],
          prosa: `[[Na criança sem sinais de estrangulamento (sem vômitos, febre, distensão, eritema ou peritonite), a conduta é a **redução manual** com sedação e analgesia, seguida de **herniorrafia eletiva em 24 a 48 horas**, na mesma internação, quando o edema da parede regride; não se dá alta e não se espera por meses.|q-unesp2022-061,q-uspsp2-080,q-uspsp5-070]] A mesma regra vale para o recém-nascido grave: [[no prematuro em ventilação mecânica com hérnia encarcerada, **reduz-se** e opera-se assim que a criança tiver condição clínica, sem operar de imediato só porque já está intubada.|q-tp20202-064]]

[[O lactente de um mês com vômitos biliosos, distensão, parada de eliminações, febre, prostração e a região inguinal **hiperemiada e dolorosa** tem hérnia **estrangulada**, e a conduta é **cirurgia de emergência**, sem redução manual.|q-usp2025-068]]`,
          texto: `- Lactente com abaulamento fixo, choro, sem sinais de sofrimento: **tentar redução manual**. {q-unesp2022-061}
- Lactente de 3 meses, encarcerada sem toxicidade: **redução cuidadosa** e cirurgia eletiva em **24-48 horas**. {q-uspsp2-080}
- Criança de 8 meses, hérnia reduzida após sedação: **cirurgia eletiva na mesma internação**, em 24 a 48 horas. {q-uspsp5-070}
- Recém-nascido em UTI com hérnia encarcerada: **reduzir** e operar quando houver condição clínica. {q-tp20202-064}
- Lactente com vômitos biliosos, febre e hiperemia inguinal: **estrangulada**, **cirurgia de emergência**. {q-usp2025-068}` },
        { id: "ped-umbilical", titulo: "Hérnia umbilical da criança", conferir: true, diretrizes: ["cirurgia-pediatrica"],
          casos: ["q-usp2026-064"],
          questoes: ["q-usp2026-064","q-tp20252-067"],
          prosa: `[[A hérnia umbilical da infância **se fecha espontaneamente na maioria dos casos**, em geral até os 4 a 5 anos, e o encarceramento é raro: a conduta é **expectante**, com orientação de limpeza e sem técnicas compressivas (faixa, moeda).|q-usp2026-064,q-tp20252-067]] O lactente de 18 meses, bem, com anel de cerca de 2 cm, segue em **acompanhamento ambulatorial**, sem ultrassonografia e sem encaminhar para cirurgia.`,
          texto: `- Recém-nascido de 3 dias com abaulamento umbilical coberto por pele: **conduta expectante**, sem técnicas compressivas. {q-usp2026-064}
- Lactente de 18 meses, hérnia umbilical redutível de 2 cm: **seguimento ambulatorial**, resolução espontânea provável. {q-tp20252-067}` },
      ],
    },
    {
      id: "ventral", titulo: "Hérnias ventrais: umbilical, epigástrica e incisional",
      introducao: `As hérnias da linha média são de dois tipos: as de **linha alba** (umbilical e epigástrica), que nascem de defeito da própria aponeurose, e a **incisional**, que nasce de uma cicatriz. [[A incisional é a que mais depende de tela: a sutura simples tem recidiva de 30 a 50 %, e a tela reduz para menos de 10 %, sobretudo nos defeitos maiores.|q-tp20241-061,q-tp20232-061]]`,
      fragmentos: [
        { id: "ven-umbilical-epigastrica", titulo: "Hérnia umbilical e epigástrica do adulto", conferir: true, diretrizes: ["ehs-ventrais"],
          questoes: ["q-iamspe2025-033","q-iamspe2026-033"],
          prosa: `A **epigástrica** fica na linha média, entre o umbigo e o apêndice xifoide, e nasce de defeito da linha alba, e não de cicatriz. [[A tumefação dolorosa e irredutível entre a cicatriz umbilical e o apêndice xifoide, sem sinais de sofrimento, é hérnia epigástrica **encarcerada**, e a conduta é herniorrafia de urgência.|q-iamspe2025-033]] [[A hérnia epigástrica **sintomática** (a de 1,5 cm, em mulher de 36 anos) tem **indicação cirúrgica** pelo risco de encarceramento; a tela está indicada a partir de cerca de 1 cm e não é contraindicada.|q-iamspe2026-033]]`,
          texto: `- Tumefação irredutível entre cicatriz umbilical e xifoide: **epigástrica encarcerada**, **herniorrafia de urgência**. {q-iamspe2025-033}
- Epigástrica sintomática de 1,5 cm: **cirurgia** indicada; não é secundária a incisão e a **tela** não é contraindicada. {q-iamspe2026-033}` },
        { id: "inc-indicacao", titulo: "Incisional: indicação e tela", conferir: true, diretrizes: ["ehs-ventrais"],
          questoes: ["q-tp20232-061","q-tp20241-061","q-didepm-027","q-amrigs2023-035"],
          prosa: `A hérnia incisional **não regride**, cresce e tem risco de encarceramento, e a cinta só é opção para quem não opera. [[O abaulamento sob a cicatriz de laparotomia, redutível e crescente, tem indicação de **cirurgia com tela**; o defeito de 8 cm em mulher obesa, sem perda de domínio, é reparado com tela em plano **retromuscular** (sublay) e fechamento da linha média.|q-tp20232-061,q-tp20241-061,q-didepm-027]]

A tela é um corpo estranho, e a sua integração depende do campo. [[A rejeição de tela inabsorvível é influenciada pelo **tabagismo**, pelos **antissépticos** do sítio e pelo **contato da tela com a pele**; já a frase "fio absorvível de polipropileno" é a errada, porque o polipropileno é fio **inabsorvível**.|q-amrigs2023-035]]`,
          texto: `- Abaulamento sob cicatriz de laparotomia, redutível, crescente: **cirurgia com tela**. {q-tp20232-061}
- Incisional redutível de 8 cm: **herniorrafia com tela**, não sutura primária. {q-tp20241-061}
- Defeito único de 8 cm, sem perda de domínio: **tela retromuscular (sublay)** com fechamento da linha média. {q-didepm-027}
- Rejeição de tela: **tabagismo, antissépticos e contato com a pele** influenciam; **polipropileno é inabsorvível**. {q-amrigs2023-035}` },
        { id: "inc-planos", titulo: "Planos da tela: onlay, retromuscular e complicações", conferir: true, diretrizes: ["ehs-ventrais"],
          casos: ["q-usp2022-067"],
          questoes: ["q-usp2022-067","q-usp2023-007","q-uspsp5-056","q-famema2022-068"],
          prosa: `[[Na técnica **onlay** a tela fica **sobre a aponeurose**, o que exige amplo descolamento do subcutâneo; esse descolamento compromete a vascularização dos retalhos, e a complicação mais frequente além do seroma é a **necrose de pele e subcutâneo**.|q-usp2022-067,q-uspsp5-056]] [[O **seroma** sem dor, sem febre e sem sinais inflamatórios, uma semana depois de retirar o dreno, trata-se com **cinta abdominal**; antibiótico, novo dreno ou abrir a incisão são exagero.|q-usp2023-007]] [[Na técnica de **Rives-Stoppa** a tela fica no plano **retromuscular**, fora da cavidade peritoneal, bem vascularizada e sustentada pela pressão abdominal.|q-famema2022-068]]`,
          texto: `- Tela **onlay** (sobre a aponeurose) com amplo descolamento: complicação mais frequente além do seroma, **necrose de pele e subcutâneo**. {q-usp2022-067}
- Imagem da tela sobre a aponeurose, sob retalho de pele: posição **onlay**. {q-uspsp5-056}
- **Seroma** indolor pós-onlay, sem sinais inflamatórios: **cinta abdominal**. {q-usp2023-007}
- **Rives-Stoppa**: tela no plano **retromuscular**, fora da cavidade. {q-famema2022-068}` },
        { id: "inc-componentes", titulo: "Defeitos grandes: separação de componentes e perda de domínio", conferir: true, diretrizes: ["ehs-ventrais"],
          questoes: ["q-iamspe2023-022","q-famema2022-073","q-scmsp2026-024"],
          prosa: `Quando a linha média não fecha sem tensão, o cirurgião libera os músculos laterais para que deslizem. [[A separação **anterior** de componentes é a técnica de **Ramirez** (1990): secciona-se a aponeurose do oblíquo externo cerca de 1 a 2 cm **lateral** à linha semilunar; a separação **posterior** (TAR) secciona o músculo **transverso** no espaço retromuscular.|q-iamspe2023-022,q-famema2022-073]] [[Na hérnia paracolostômica gigante com **perda de domínio** (saco de cerca de metade do volume da cavidade), o conteúdo não volta sem preparo, pois causaria hipertensão abdominal e insuficiência respiratória; o preparo é o **pneumoperitônio progressivo pré-operatório**, com a correção da hérnia e a reconstrução do trânsito no mesmo tempo.|q-scmsp2026-024]]`,
          texto: `- Separação anterior de componentes: técnica de **Ramirez**; secção do oblíquo externo **lateral** à linha semilunar. {q-iamspe2023-022}
- Separação posterior (TAR): secciona o músculo **transverso**. {q-famema2022-073}
- Hérnia paracolostômica com perda de domínio (saco de 4.250 cc em cavidade de 8.200 cc): **pneumoperitônio progressivo** e correção com reconstrução do trânsito. {q-scmsp2026-024}` },
      ],
    },
    {
      id: "raras", titulo: "Tipos raros de hérnia",
      introducao: `Os nomes próprios das hérnias raras são cobrados como definição: o importante é saber **o que está no saco** ou **onde ela sai**.`,
      fragmentos: [
        { id: "raras-tipos", titulo: "Spiegel, Littré, Garengeot, Amyand, Richter e Petit", conferir: true,
          questoes: ["q-uspsp4-057","q-fmabc2024-037","q-fmabc2026-038"],
          prosa: `[[**Spiegel** sai pela linha semilunar; **Littré** tem divertículo de Meckel no saco; **Garengeot** tem apêndice em saco crural; **Amyand** tem apêndice em saco inguinal.|q-uspsp4-057]] [[Na hérnia de **Richter**, só parte da circunferência (a borda antimesentérica) da alça fica presa no defeito: o trânsito se mantém, **não há obstrução**, a redução pode ser espontânea e a parte com gangrena pode passar despercebida na cirurgia, o que atrasa o diagnóstico.|q-fmabc2024-037]] [[A hérnia de **Petit** é a do trígono lombar inferior, limitado pela **crista ilíaca** (base), pelo **latíssimo do dorso** (medial) e pelo **oblíquo externo** (lateral).|q-fmabc2026-038]]`,
          texto: `- Spiegel = **linha semilunar**; Littré = **Meckel**; Garengeot = apêndice em saco **crural**; Amyand = apêndice em saco **inguinal**. {q-uspsp4-057}
- Richter: **parte da circunferência** da alça presa; sem obstrução, gangrena pode passar despercebida. {q-fmabc2024-037}
- Hérnia de Petit: trígono lombar inferior (**crista ilíaca, latíssimo do dorso, oblíquo externo**). {q-fmabc2026-038}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-famerp2022-077","q-uspsp4-056","q-einstein2023-029","q-uspsp3-100","q-amrigs2025-025","q-sirio2026-035","q-famema2022-068","q-unifesp2026-015"],
          prosa: `[[Encarcerada **sem sinais de sofrimento**: a redução gentil é admitida (a questão autoral cobrou); a FAMERP 2022 e o Simulado USP-SP 2025 cobraram **cirurgia de urgência direta**, e o segundo tem gabarito discutível.|q-famerp2022-077,q-uspsp4-056]] [[A **tela em campo contaminado** é controversa: a simulado USP-SP 2025 aceitou o Lichtenstein após enterectomia com contaminação controlada e o Einstein 2023, a tela de polipropileno em incisional estrangulada, mas a AMRIGS 2025 considerou a tela controversa na umbilical estrangulada.|q-uspsp3-100,q-einstein2023-029,q-amrigs2025-025]]`,
          texto: `- Regra: encarcerada sem sofrimento admite redução gentil; a prova (FAMERP 2022) cobrou **inguinotomia direta** e a (Simulado USP-SP 2025), **hernioplastia de urgência**, com gabarito discutível. {q-famerp2022-077,q-uspsp4-056}
- Regra: tela em campo contaminado é controversa; a prova (Simulado USP-SP 2025) cobrou **enterectomia e Lichtenstein**, a (Einstein 2023), **polipropileno** na incisional encarcerada, e a (AMRIGS 2025), que a tela é **controversa** na umbilical estrangulada. {q-uspsp3-100,q-einstein2023-029,q-amrigs2025-025}
- Regra: a hérnia direta fica **medial** aos vasos epigástricos; a prova (Sírio 2026) descreveu abaulamento "superior e medial ao ligamento" e cobrou **indireta**, pelo toque na ponta do dedo. {q-sirio2026-035}
- Regra: Rives-Stoppa é plano **retromuscular**; a prova (FAMEMA 2022) cobrou o espaço de **Retzius**, pré-peritoneal. {q-famema2022-068}
- Regra: hérnia que reduz espontaneamente e já encarcerou deve ser corrigida; a prova (UNIFESP 2026) cobriu a via **laparoscópica**, enquanto a aberta também trata. {q-unifesp2026-015}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `A tabela resume os três tipos de hérnia da virilha, sem dado novo.`,
      fragmentos: [
        { id: "comp-virilha", titulo: "Indireta × direta × femoral", conferir: true,
          questoes: ["q-iamspe2022-029","q-tp20222-064","q-sirio2026-035","q-famerp2024-018","q-uspsp3-103","q-famerp2026-066"],
          prosa: `| | Indireta | Direta | Femoral |
|---|---|---|---|
| Em relação ao ligamento inguinal | **acima** | **acima** | **abaixo** |
| Em relação aos vasos | lateral aos **epigástricos** | medial aos **epigástricos** (Hesselbach) | medial à **veia femoral** |
| Origem | **conduto peritônio-vaginal** (congênita) | fraqueza adquirida da parede | anel femoral |
| Exame | **ponta do dedo** | face palmar do dedo | abaixo do ligamento |
| Perfil | jovens, homens (mais comum) | idosos | **mulheres**, idosas |
| Risco | encarceramento | menor | **estrangulamento alto** |
| Conduta | reparo eletivo | reparo eletivo | **operar sempre** |`,
          texto: `- A indireta e a direta saem **acima** do ligamento inguinal, a femoral **abaixo**. {q-iamspe2022-029,q-famerp2026-066}
- Jovem, em pé, ponta do dedo: **indireta**. {q-tp20222-064,q-sirio2026-035}
- Saco abaixo do ligamento e medial à veia femoral: **femoral**. {q-famerp2024-018,q-uspsp3-103}` },
      ],
    },
  ],
});
