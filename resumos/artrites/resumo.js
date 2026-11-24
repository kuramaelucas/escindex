/* resumos/artrites/resumo.js — resumo adaptativo de artrites (ass-reumato-artrites): padrão articular
   como raciocínio, artrite reumatoide (diagnóstico, anti-CCP, tratamento), espondiloartrites
   (espondilite anquilosante, psoriásica, entesite, uveíte), artrites infecciosas (séptica, gonocócica),
   gota, artrite idiopática juvenil e Still, fibromialgia, partes moles; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- artrites */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "artrites",
  titulo: "Artrites e reumatismos de partes moles",
  assunto: "ass-reumato-artrites",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "acr-eular-ar", texto: "ACR/EULAR 2010 — classification criteria for rheumatoid arthritis; EULAR 2022 — recommendations for the management of RA; SBR 2020 (diretrizes de AR)", lidoEm: null },
    { id: "asas-espa", texto: "ASAS 2009 — classification criteria for axial spondyloarthritis; ASAS-EULAR 2022 — management of axSpA; GRAPPA 2021 (psoriásica)", lidoEm: null },
    { id: "acr-gota", texto: "ACR 2020 Guideline for the Management of Gout", lidoEm: null },
    { id: "acr-fibro", texto: "ACR 2016 — diagnostic criteria for fibromyalgia; EULAR 2017 — management", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "raciocinio", titulo: "O padrão articular",
      introducao: `[[O diagnóstico de artrite nasce do padrão: quantas articulações (mono, oligo, poli), quais (pequenas das mãos, grandes de carga, coluna e enteses), se são simétricas, há quanto tempo (aguda < 6 semanas, crônica depois) e se há **rigidez matinal longa** (> 1 hora, inflamatória) ou dor que piora com o uso (mecânica). Monoartrite aguda é infecção ou cristal até prova em contrário.|q-iamspe2026-011,q-unesp2024-052,q-adap21-113]]

Veja também: **Lúpus e colagenoses**, **Vasculites**, **Febre reumática**, **Osteoartrite** e **IST (gonococo)** quando houver resumo.`,
      fragmentos: [
        { id: "rac-agudas", titulo: "Monoartrite aguda: infecção e cristal", conferir: true, diretrizes: ["acr-gota"],
          casos: ["q-uspsp5-007"],
          questoes: ["q-adap21-113","q-scmsp2026-013","q-uspsp5-007","q-adap23-075"],
          prosa: `[[Joelho quente com derrame volumoso, dor a qualquer movimento, febre e leucocitose: **artrite séptica** — **artrocentese** com Gram e cultura antes do antibiótico, antibiótico venoso empírico e **drenagem** da articulação; a cartilagem se destrói em dias.|q-adap21-113]] [[Jovem sexualmente ativo com **poliartralgia migratória, tenossinovite e pústulas** na pele: **gonococo disseminado**; o líquido tem poucas bactérias visíveis. Tratamento: **ceftriaxona**.|q-scmsp2026-013,q-uspsp5-007]] [[**Gota**: cristais de urato no hálux (podagra). Depois de crises repetidas, tratar para baixar o ácido úrico: **alopurinol** em dose baixa, começado fora da crise e titulado até **< 6 mg/dL**, com **colchicina profilática** nos primeiros meses (a queda do urato mobiliza cristais).|q-adap23-075]]`,
          texto: `- Séptica: **puncionar**, cultura, antibiótico, **drenar**. {q-adap21-113}
- Tenossinovite + pústulas: **gonococo** → ceftriaxona. {q-scmsp2026-013,q-uspsp5-007}
- Gota recorrente: **alopurinol até urato < 6** + colchicina. {q-adap23-075}` },
      ],
    },
    {
      id: "gota", titulo: "Gota e pseudogota",
      introducao: `[[O ácido úrico é o fim do metabolismo das purinas; o ser humano não tem uricase e o elimina sobretudo pelo rim. Na **maioria dos gotosos o problema é a excreção renal reduzida**, não a produção aumentada. Acima de cerca de **6,8 mg/dL** o urato satura e precipita como **cristais em agulha**, que ficam quietos por anos; a crise acontece quando os cristais se soltam e são fagocitados por neutrófilos, que ativam o inflamassomo (IL-1β). Por isso **hiperuricemia não é gota** (muitos nunca têm crise) e **a crise pode vir com urato normal** (ele cai durante a inflamação).|q-amrigs2022-098,q-tp20231-034]]

[[A crise típica é homem de meia-idade (mulher só depois da menopausa, quando o estrogênio deixa de ser uricosúrico), com dor **súbita, de madrugada**, na **primeira metatarsofalângica (podagra)**, depois tornozelo e joelho, que melhora sozinha em 3 a 7 dias. Gatilhos: álcool (cerveja), carne e frutos do mar, frutose, desidratação, diuréticos. Anos de crises sem tratamento levam à **gota tofácea crônica**: **depósitos subcutâneos de urato (tofos)** na orelha, cotovelo e dedos, e artropatia poliarticular deformante.|q-iamspe2023-011,q-tp20212-025,q-usprp2022-077,q-adap26-035]]

[[Na **pseudogota** os cristais são de **pirofosfato de cálcio (CPPD)**: idoso, **joelho ou punho**, radiografia com **condrocalcinose** (calcificação linear da cartilagem e do menisco). Procure doença associada no paciente mais jovem: hiperparatireoidismo, hemocromatose, hipomagnesemia.|q-famerp2025-004,q-didepm-056]]`,
      fragmentos: [
        { id: "gota-diagnostico", titulo: "Diagnóstico: puncionar e ver o cristal", conferir: true, diretrizes: ["acr-gota"],
          questoes: ["q-tp20212-025","q-uspsp2-005","q-simepm89-046","q-einstein2026-002","q-unifesp2022-082","q-fmabc2023-010","q-iamspe2023-011","q-usprp2022-077","q-amrigs2022-098","q-unicampdis2024-061"],
          prosa: `[[O diagnóstico definitivo é o **cristal no líquido sinovial**, na microscopia de luz polarizada: urato = **agulha, birrefringência negativa forte**, dentro do neutrófilo. Mesmo a podagra típica **não basta** sozinha: a artrocentese é o exame que diferencia gota, pseudogota e infecção.|q-tp20212-025,q-uspsp2-005,q-einstein2026-002,q-iamspe2023-011]] [[Em toda monoartrite aguda, **puncionar e mandar o líquido para cristais, Gram, cultura e celularidade**. Febre não diferencia (a crise de gota pode dar febre e leucocitose), e **gota e artrite séptica podem coexistir**: no gotoso com febre e joelho quente, a suspeita de infecção manda a punção antes de tudo.|q-simepm89-046,q-unifesp2022-082,q-fmabc2023-010,q-unicampdis2024-061]] [[O urato sérico na crise pode estar normal; ele serve para seguir o tratamento, não para diagnosticar a crise. O **tofo** é depósito subcutâneo de urato, sinal de doença de longa data.|q-amrigs2022-098,q-usprp2022-077]]`,
          texto: `- **Artrocentese**: cristais, Gram, cultura, celularidade. {q-tp20212-025,q-simepm89-046,q-unicampdis2024-061}
- Urato: **agulha, birrefringência negativa**. {q-uspsp2-005,q-einstein2026-002}
- Podagra sozinha **não** fecha o diagnóstico. {q-einstein2026-002,q-iamspe2023-011}
- Gotoso com febre: **afastar séptica** (podem coexistir). {q-unifesp2022-082,q-fmabc2023-010}
- Excreção renal reduzida na maioria; crise com urato normal. {q-amrigs2022-098}
- **Tofo** = depósito subcutâneo. {q-usprp2022-077}` },
        { id: "gota-crise", titulo: "Tratar a crise", conferir: true, diretrizes: ["acr-gota"],
          questoes: ["q-famema2022-034","q-iamspe2025-015","q-amrigs2021-011","q-sirio2023-018"],
          prosa: `[[A crise se trata com anti-inflamatório, o mais cedo possível: **AINE** em dose plena (naproxeno, indometacina), **colchicina** em dose baixa nas primeiras 36 horas (ela bloqueia a migração dos neutrófilos e o inflamassomo) ou **corticoide** (oral ou intra-articular). A escolha é pela comorbidade: na doença renal, úlcera ou anticoagulação, o AINE sai e entra o corticoide.|q-famema2022-034,q-iamspe2025-015]] [[A **colchicina não baixa o ácido úrico**: é anti-inflamatória. Quem baixa o urato são o **alopurinol e o febuxostate** (inibem a xantina oxidase) e os uricosúricos (probenecida, benzbromarona).|q-sirio2023-018]] [[A regra clássica das provas: **não iniciar o alopurinol no meio da crise** (a variação do urato pode prolongá-la) e **não suspender** em quem já usa. A diretriz do ACR de 2020 aceita começar durante a crise desde que haja anti-inflamatório cobrindo; na prova, se a alternativa diz "evitar alopurinol na crise", ela segue a regra clássica.|q-amrigs2021-011]]`,
          texto: `- Crise: **AINE**, **colchicina** ou **corticoide**, conforme a comorbidade. {q-famema2022-034,q-iamspe2025-015}
- Colchicina **não** reduz o urato. {q-sirio2023-018}
- Alopurinol: não começar na crise (regra clássica), não suspender se já usa. {q-amrigs2021-011}` },
        { id: "gota-diureticos", titulo: "Diurético e outros remédios que sobem o urato", conferir: true, diretrizes: ["acr-gota"],
          questoes: ["q-unifesp2024-040","q-unifesp2026-035","q-scmsp2021-005","q-tp20231-034"],
          prosa: `[[**Tiazídicos e diuréticos de alça** aumentam a reabsorção tubular de urato (competem pelo mesmo transportador e contraem o volume): são causa clássica de crise no hipertenso. Outras: AAS em dose baixa, ciclosporina, pirazinamida e etambutol. No gotoso hipertenso, **trocar o tiazídico pela losartana**, o único anti-hipertensivo com efeito **uricosúrico** (bloqueador de canal de cálcio também é neutro ou favorável).|q-unifesp2024-040,q-unifesp2026-035,q-scmsp2021-005,q-tp20231-034]]`,
          texto: `- Crise no hipertenso: **culpa do tiazídico**. {q-scmsp2021-005,q-tp20231-034}
- Conduta: tratar a crise e **trocar tiazídico por losartana**. {q-unifesp2024-040,q-unifesp2026-035}` },
        { id: "gota-longo-prazo", titulo: "Baixar o urato: quando e até onde", conferir: true, diretrizes: ["acr-gota"],
          questoes: ["q-adap22-082","q-adap26-035"],
          prosa: `[[Indicação de hipouricemiante: **tofo**, **duas ou mais crises por ano**, dano articular na imagem (e, para muitos, nefrolitíase ou doença renal). O de primeira linha é o **alopurinol em dose baixa** (100 mg/dia, menos na doença renal avançada), **subindo a cada 2 a 5 semanas até o urato < 6 mg/dL** (< 5 com tofos), e não a dose fixa. Nos primeiros **3 a 6 meses**, **colchicina profilática**: a queda do urato dissolve cristais e provoca crises.|q-adap22-082,q-adap26-035]]`,
          texto: `- Indicação: tofo, ≥ 2 crises/ano, dano na imagem. {q-adap26-035}
- **Alopurinol** dose baixa, titular até **urato < 6**; colchicina 3 a 6 meses. {q-adap22-082,q-adap26-035}` },
        { id: "pseudogota", titulo: "Pseudogota (pirofosfato de cálcio)", conferir: true, diretrizes: ["acr-gota"],
          questoes: ["q-famerp2025-004","q-didepm-056","q-unicampdis2025-052"],
          prosa: `[[Cristais de pirofosfato: **romboides, birrefringência positiva fraca**; radiografia com **condrocalcinose**. Afetam o idoso, no **joelho e no punho**, como crise aguda ou como artropatia crônica que imita osteoartrite ou artrite reumatoide (fator reumatoide negativo).|q-famerp2025-004,q-didepm-056,q-unicampdis2025-052]] [[O tratamento da crise é o mesmo da gota, com uma vantagem: sendo mono ou oligoarticular, a **infiltração de corticoide** depois de afastada a infecção resolve sem os riscos do AINE no idoso com doença renal. Não há hipouricemiante, porque o problema não é o urato.|q-didepm-056]]`,
          texto: `- Pirofosfato: **birrefringência positiva**, **condrocalcinose**, idoso, joelho/punho. {q-famerp2025-004,q-didepm-056,q-unicampdis2025-052}
- Crise no idoso com DRC: **corticoide intra-articular** após excluir infecção. {q-didepm-056}` },
      ],
    },
    {
      id: "ar", titulo: "Artrite reumatoide",
      introducao: `[[A AR é inflamação crônica da sinóvia, que vira um tecido invasivo (pannus) e corrói cartilagem e osso na margem da articulação. Por isso o quadro é **poliartrite simétrica e aditiva de pequenas articulações** (punhos, metacarpofalângicas, interfalângicas proximais), com rigidez matinal longa, **poupando as interfalângicas distais**; sem tratamento, vêm as **erosões** e as deformidades.|q-iamspe2026-011,q-amrigs2021-015,q-scmsp2026-020,q-usprp2022-076]]`,
      fragmentos: [
        { id: "ar-diagnostico", titulo: "Diagnóstico", conferir: true, diretrizes: ["acr-eular-ar"],
          figuras: [{ arquivo: "figuras/padrao-articular.svg", legenda: "Esquema autoral: as articulações da mão que cada artrite prefere e o que fica fora dela." }],
          questoes: ["q-iamspe2026-011","q-amrigs2021-015","q-scmsp2026-020","q-usprp2022-076","q-unesp2024-052","q-unifesp2025-034","q-tp20251-019","q-tp20261-073","q-usprp2024-057","q-tp20231-022","q-usp2022-014","q-scmsp2026-012"],
          prosa: `[[Poliartrite simétrica de punhos, MCF e IFP com **teste do aperto (squeeze) positivo**, por mais de 6 semanas: pedir **fator reumatoide, anti-CCP, VHS e PCR**. O **anti-CCP** tem o melhor valor preditivo positivo e prediz erosões; FR e anti-CCP **negativos não excluem** (AR soronegativa).|q-unesp2024-052,q-unifesp2025-034,q-tp20251-019,q-tp20261-073,q-usprp2024-057,q-tp20231-022]] [[Antes de chamar de AR uma dor nas pequenas articulações sem sinovite, afastar **hipotireoidismo** (TSH). A inflamação crônica dá **anemia de doença crônica**: ferritina alta e capacidade de ligação do ferro baixa.|q-usp2022-014,q-scmsp2026-012]] [[A radiografia da AR estabelecida mostra **erosões justa-articulares**, osteopenia periarticular e redução simétrica do espaço; clinicamente, desvio ulnar e pescoço de cisne.|q-usprp2022-076]]`,
          texto: `- Simétrica, punhos, MCF, IFP, **poupa IFD**. {q-iamspe2026-011,q-amrigs2021-015,q-scmsp2026-020}
- **Anti-CCP** (melhor VPP), FR, VHS, PCR; soronegativa existe. {q-unesp2024-052,q-unifesp2025-034,q-tp20251-019,q-tp20261-073,q-usprp2024-057,q-tp20231-022}
- TSH; anemia de doença crônica. {q-usp2022-014,q-scmsp2026-012}
- **Erosões justa-articulares**. {q-usprp2022-076}` },
        { id: "ar-tratamento", titulo: "Tratamento", conferir: true, diretrizes: ["acr-eular-ar"],
          questoes: ["q-adap25-034","q-amrigs2021-010"],
          prosa: `[[O tratamento é precoce, para chegar antes das erosões: **metotrexato** (com ácido fólico) é o DMARD de escolha, com **prednisona em dose baixa por pouco tempo** como ponte; hidroxicloroquina pode ser associada (exige vigilância oftalmológica). Sem controle, biológicos (anti-TNF e outros), que **freiam a progressão radiográfica**.|q-adap25-034,q-amrigs2021-010]]`,
          texto: `- **Metotrexato** + ácido fólico, prednisona curta; biológico se falha. {q-adap25-034,q-amrigs2021-010}` },
      ],
    },
    {
      id: "espa", titulo: "Espondiloartrites",
      introducao: `[[As espondiloartrites inflamam a **êntese** (onde tendão e ligamento se prendem ao osso), e daí vêm a sacroileíte, a dor no calcanhar e o dedo em salsicha. Associam-se ao **HLA-B27**, poupam o fator reumatoide (soronegativas) e dividem manifestações fora da articulação: **uveíte anterior**, psoríase, doença inflamatória intestinal e uretrite.|q-iamspe2023-013,q-udisc20262-030,q-unifesp2023-075]]`,
      fragmentos: [
        { id: "esp-axial", titulo: "Espondilite anquilosante e axial", conferir: true, diretrizes: ["asas-espa"],
          questoes: ["q-iamspe2023-013","q-udisc20262-030","q-sessp2026-005","q-amrigs2022-016","q-usprp2021-113","q-uspsp4-012","q-adap21-035","q-unesp2026-049","q-unifesp2023-075"],
          prosa: `[[Homem jovem com **lombalgia inflamatória** (melhora com movimento, piora no repouso, acorda de madrugada), rigidez matinal, Schober e expansão torácica reduzidos, entesite (tendão calcâneo, fáscia plantar): o exame que se espera positivo é o **HLA-B27**. Na radiografia avançada, a **coluna em bambu**; na ressonância precoce, edema das sacroilíacas.|q-iamspe2023-013,q-sessp2026-005,q-amrigs2022-016,q-unesp2026-049]] [[A uveíte típica é **anterior, aguda, unilateral e não granulomatosa**. Na criança, entesite em membros inferiores com dor lombar matinal sugere espondiloartrite juvenil.|q-usprp2021-113,q-uspsp4-012,q-unifesp2023-075]] [[Tratamento: **AINE em dose plena contínua** (trocar se falhar), exercício; sem resposta, **anti-TNF ou anti-IL-17** — o metotrexato não age na coluna.|q-adap21-035,q-udisc20262-030]]`,
          texto: `- Lombalgia inflamatória, entesite: **HLA-B27**; bambu. {q-iamspe2023-013,q-sessp2026-005,q-amrigs2022-016,q-unesp2026-049}
- Uveíte **anterior, não granulomatosa**. {q-usprp2021-113,q-uspsp4-012,q-unifesp2023-075}
- **AINE pleno**, depois anti-TNF/anti-IL-17. {q-adap21-035,q-udisc20262-030}` },
        { id: "esp-psoriasica", titulo: "Artrite psoriásica", conferir: true, diretrizes: ["asas-espa"],
          casos: ["q-usprp2023-079","q-usprp2025-080","q-unicampdis2024-005"],
          questoes: ["q-usprp2023-079","q-usprp2025-080","q-unicampdis2024-005"],
          prosa: `[[Artrite das **interfalângicas distais**, dactilite, entesite do calcanhar, com psoríase de pele e **unhas** (onicólise, mancha de óleo, pitting): **artrite psoriásica**. A forma periférica responde ao **metotrexato**, que trata também a pele.|q-usprp2023-079,q-usprp2025-080,q-unicampdis2024-005]]`,
          texto: `- **IFD + unhas + psoríase**: psoriásica → metotrexato. {q-usprp2023-079,q-usprp2025-080,q-unicampdis2024-005}` },
      ],
    },
    {
      id: "outras", titulo: "Criança, Still e dor sem inflamação",
      introducao: `[[Em criança, artrite por mais de 6 semanas sem outra causa é **artrite idiopática juvenil**; em adulto com febre alta e rash, Still. E muita dor difusa sem sinal de inflamação é, quase sempre, um problema de processamento da dor.|q-usprp2021-035,q-udisc20262-054,q-tp20232-016]]`,
      fragmentos: [
        { id: "out-aij", titulo: "Artrite idiopática juvenil e Still", conferir: true, diretrizes: ["acr-eular-ar"],
          questoes: ["q-usprp2021-035","q-tp20251-044","q-fmabc2022-044","q-fmabc2023-056","q-udisc20262-054"],
          prosa: `[[Menina pequena com **oligoartrite** de joelho e tornozelo por mais de 6 semanas e **FAN positivo**: AIJ oligoarticular, de alto risco para **uveíte anterior crônica silenciosa** — encaminhar ao **oftalmologista** com exames periódicos com lâmpada de fenda. ASLO alto isolado não transforma isso em febre reumática.|q-usprp2021-035,q-tp20251-044,q-fmabc2022-044,q-fmabc2023-056]] [[Febre alta diária com **rash macular evanescente** que some quando a febre cai, artrite e leucocitose: **doença de Still** (AIJ sistêmica na criança).|q-udisc20262-054]]`,
          texto: `- Oligoartrite + **FAN+**: AIJ → **oftalmologista**. {q-usprp2021-035,q-tp20251-044,q-fmabc2022-044,q-fmabc2023-056}
- Febre + rash evanescente: **Still**. {q-udisc20262-054}` },
        { id: "out-fibro", titulo: "Fibromialgia e partes moles", conferir: true, diretrizes: ["acr-fibro"],
          casos: ["q-usp2023-056"],
          questoes: ["q-amrigs2024-008","q-tp20232-016","q-tp20241-006","q-famerp2024-071","q-usp2023-056"],
          prosa: `[[Dor difusa crônica, fadiga, sono não reparador e queixas cognitivas, sem inflamação e com exames normais: **fibromialgia**, mais em mulheres. O mecanismo é **sensibilização central** — o sistema nervoso amplifica o estímulo doloroso. Tratamento: **educação, atividade física regular**, psicoterapia e, para dor e sono, **antidepressivo tricíclico** (amitriptilina) ou duloxetina; AINE e opioide não ajudam.|q-amrigs2024-008,q-tp20232-016,q-tp20241-006,q-famerp2024-071]] [[Edema flutuante na frente da patela depois de ajoelhar muito: **bursite pré-patelar**, não artrite.|q-usp2023-056]]`,
          texto: `- Fibromialgia: **sensibilização central** → exercício, educação, tricíclico. {q-amrigs2024-008,q-tp20232-016,q-tp20241-006,q-famerp2024-071}
- Ajoelhar: **bursite pré-patelar**. {q-usp2023-056}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["acr-eular-ar","acr-fibro"],
          questoes: ["q-amrigs2021-010","q-usprp2021-035","q-iamspe2026-011","q-famerp2024-071"],
          prosa: `[[**Biológicos e radiografia**: os biológicos reduzem a progressão radiográfica; a amrigs2021-010 marcou como **falsa** a afirmação de que só reduzem sintomas.|q-amrigs2021-010]] [[**FAN e ASLO na criança**: ASLO alto é exposição ao estreptococo, não diagnóstico; a usprp2021-035 ficou com **AIJ**.|q-usprp2021-035]] [[**Padrão da AR**: punhos e pequenas articulações das mãos; a iamspe2026-011 descreveu a poliartrite simétrica aditiva acometendo "preferencialmente **punhos e joelhos**".|q-iamspe2026-011]] [[**Remédio na fibromialgia**: o exercício é a base e o remédio é adjuvante; a famerp2024-071 juntou educação, exercício, psicoterapia **e tricíclico** já na conduta inicial.|q-famerp2024-071]]`,
          texto: `- Biológico **freia** a radiografia. {q-amrigs2021-010}
- ASLO não muda: **AIJ**. {q-usprp2021-035}
- A prova citou **punhos e joelhos**. {q-iamspe2026-011}
- Fibromialgia: tricíclico já no início. {q-famerp2024-071}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: AR, espondiloartrite, gota e séptica",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-artrites", titulo: "Padrão e tratamento", conferir: true,
          questoes: ["q-unesp2024-052","q-sessp2026-005","q-usprp2023-079","q-adap23-075","q-adap21-113"],
          prosa: `[[O padrão articular aponta a doença.|q-unesp2024-052,q-sessp2026-005,q-usprp2023-079,q-adap23-075,q-adap21-113]]

| | AR | Espondilite | Psoriásica | Gota | Séptica |
|---|---|---|---|---|---|
| Padrão | poli simétrica, mãos | coluna, sacroilíacas, enteses | IFD, dactilite, assimétrica | mono, hálux | mono, joelho |
| Marcador | anti-CCP, FR | HLA-B27 | psoríase, unhas | urato, cristais | Gram, cultura |
| Tratamento | metotrexato | AINE, anti-TNF | metotrexato, biológico | colchicina; alopurinol | drenagem + antibiótico |`,
          texto: `- Mãos simétricas: **AR**. {q-unesp2024-052}
- Coluna: **espondilite**. {q-sessp2026-005}
- IFD + unhas: **psoriásica**. {q-usprp2023-079}
- Hálux: **gota**. {q-adap23-075}
- Joelho febril: **séptica**. {q-adap21-113}` },
      ],
    },
  ],
});
