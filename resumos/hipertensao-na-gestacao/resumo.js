/* resumos/hipertensao-na-gestacao/resumo.js — resumo adaptativo das síndromes hipertensivas da gestação:
   fisiopatologia e classificação, critérios de gravidade, prevenção (AAS, cálcio, rastreio do 1º trimestre),
   hipertensão crônica e anti-hipertensivos, pré-eclâmpsia grave e eclâmpsia (sulfato de magnésio), HELLP e
   momento do parto. Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- hipertensao-na-gestacao */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "hipertensao-na-gestacao",
  titulo: "Síndromes hipertensivas da gestação",
  assunto: "ass-dheg",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "isshp-2021", texto: "ISSHP — The 2021 International Society for the Study of Hypertension in Pregnancy classification, diagnosis & management recommendations (Pregnancy Hypertens 2022;27:148-169)", lidoEm: null },
    { id: "febrasgo-pe", texto: "FEBRASGO/RBEHG — Protocolo de pré-eclâmpsia (2023)", lidoEm: null },
    { id: "ms-alto-risco", texto: "Ministério da Saúde — Manual de Gestação de Alto Risco (2022)", lidoEm: null },
    { id: "ms-calcio", texto: "Ministério da Saúde — Nota Técnica Conjunta nº 251/2024 (cálcio e AAS na prevenção da pré-eclâmpsia)", lidoEm: null },
    { id: "figo-pe-2019", texto: "FIGO — The International Federation of Gynecology and Obstetrics initiative on pre-eclampsia: a pragmatic guide for first-trimester screening and prevention (2019)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas (entram pelas reposições) e desatualizada sem reposição", questoes: ["q-unifesp2026-055","q-einstein2026-049","q-sessp2023-057"] },
  ],
  doencas: [
    {
      id: "classificacao", titulo: "Fisiopatologia, classificação e gravidade",
      introducao: `[[A pré-eclâmpsia começa na placenta: o trofoblasto não remodela as artérias espiraladas, a placenta fica isquêmica e libera fatores antiangiogênicos (sFlt-1) que lesam o endotélio de todo o corpo — daí hipertensão, proteinúria, edema, plaquetas consumidas, fígado e cérebro afetados.|q-sessp2026-070,q-scmsp2021-079]]

[[A classificação se faz pelo momento: hipertensão antes de 20 semanas é crônica; depois de 20 semanas, sem proteinúria nem lesão de órgão, é gestacional; com proteinúria (300 mg em 24 horas ou relação proteína/creatinina ≥ 0,3) ou com sinais de lesão de órgão, mesmo sem proteinúria, é pré-eclâmpsia; e a crônica que ganha esses sinais vira pré-eclâmpsia sobreposta.|q-sirio2023-066,q-sirio2026-069,q-usprp2022-043,q-fmabc2023-064,q-iamspe2023-064,q-usprp2024-099,q-unicamp2023-056]]

[[A gravidade aparece em pressão ≥ 160/110, sintomas cerebrais ou visuais (cefaleia, escotomas), dor epigástrica, plaquetas abaixo de 100 mil, transaminases no dobro, creatinina acima de 1,1, edema pulmonar ou sofrimento fetal.|q-amrigs2023-052,q-einstein2021-039,q-tp20202-094,q-unesp2022-026,q-famema2023-055]]

Veja também: **Pré-natal** (AAS e rastreio de risco), **Puerpério** (hipertensão no pós-parto), **Hipertensão arterial** (clínica médica: o tratamento fora da gestação), **Sangramentos na gestação** (descolamento de placenta).`,
      fragmentos: [
        { id: "cla-diagnostico", titulo: "Diagnóstico e critérios de gravidade", conferir: true, diretrizes: ["isshp-2021","febrasgo-pe"],
          figuras: [{ arquivo: "figuras/classificacao.svg", legenda: "Esquema autoral: a classificação das síndromes hipertensivas pela idade gestacional e pelos sinais de lesão de órgão." }],
          questoes: ["q-019","q-amrigs2023-052","q-einstein2021-039","q-iamspe2023-064","q-sessp2026-070","q-fmabc2023-064","q-famema2023-055","q-sirio2023-066","q-sirio2026-069","q-usprp2022-043","q-usprp2024-099","q-unicamp2023-056","q-tp20202-094","q-unesp2022-026","q-uspsp2-037","q-amrigs2023-059","q-scmsp2025-065","q-einstein2022-050"],
          prosa: `[[Diante de pressão alta na gestante, o próximo passo é procurar os sinais de gravidade: hemograma, creatinina, transaminases e proteinúria, e avaliar o feto.|q-019,q-famema2023-055,q-uspsp2-037,q-unicamp2023-056]] [[O modelo fullPIERS estima o risco individual de complicação da gestante com pré-eclâmpsia.|q-amrigs2023-059]] [[Na pré-eclâmpsia sem gravidade antes de 37 semanas, a conduta é expectante com vigilância, e o parto se programa para 37.|q-scmsp2025-065,q-einstein2022-050]]`,
          texto: `- Pressão alta com proteinúria após 20 semanas: **pré-eclâmpsia**; pedir exames de gravidade. {q-019}
- Proteinúria por **relação proteína/creatinina ≥ 0,3**. {q-iamspe2023-064,q-sessp2026-070}
- Sem proteinúria, com lesão de órgão: **pré-eclâmpsia**. {q-fmabc2023-064,q-unesp2022-026}
- Gravidade: **creatinina > 1,1**, transaminases **2×**, plaquetas **< 100 mil**. A proteinúria (> 300 mg) **diagnostica** a pré-eclâmpsia, mas não mede gravidade, nem quando é muito alta. {q-amrigs2023-052,q-einstein2021-039}
- Plaquetas 90 mil e transaminases altas: **pré-eclâmpsia grave**. {q-tp20202-094}
- PA 150 × 110 em normotensa: **procurar gravidade**. {q-famema2023-055}
- Hipertensão antes de 20 semanas: **crônica**. {q-sirio2023-066,q-sirio2026-069}
- Hipertensão nova, sem proteinúria nem lesão: **gestacional**. {q-usprp2022-043}
- Crônica com Doppler alterado e proteinúria: **sobreposta**. {q-usprp2024-099,q-unicamp2023-056}
- Ganho de peso e edema com PA alta no baixo risco: **proteinúria e alto risco**. {q-uspsp2-037}
- fullPIERS: **risco individual** de complicação. {q-amrigs2023-059}
- Pré-eclâmpsia controlada com 35 sem: **controlar e resolver com 37**. {q-scmsp2025-065}
- 36 semanas, sem gravidade: **acompanhar a PA** de perto. {q-einstein2022-050}` },
      ],
    },
    {
      id: "prevencao", titulo: "Prevenção",
      introducao: `[[O ácido acetilsalicílico em baixa dose, começado entre 12 e 16 semanas (até 20) e tomado à noite, reduz a pré-eclâmpsia pré-termo nas gestantes de alto risco, porque melhora a placentação e o equilíbrio prostaciclina/tromboxano.|q-einstein2024-059,q-unesp2026-024,q-unifesp2023-051,q-usprp2023-024]] São de alto risco: pré-eclâmpsia anterior, hipertensão crônica, diabetes, doença renal ou autoimune, gemelar e reprodução assistida.

[[O cálcio (1 g/dia ou mais a partir de 12 semanas) reduz a pré-eclâmpsia onde a ingestão é baixa, como no Brasil, e o Ministério da Saúde o oferece a todas as gestantes, separado do ferro por 2 horas.|q-usprp2026-031,q-tp20252-033,q-unesp2026-024]] [[O rastreio combinado do primeiro trimestre (fatores maternos, pressão arterial média, Doppler das uterinas e PlGF) calcula o risco; acima de 1:100, AAS 150 mg.|q-iamspe2021-063,q-iamspe2026-060,q-einstein2026-049-ia]]`,
      fragmentos: [
        { id: "pre-aas-calcio", titulo: "AAS, cálcio e rastreio do primeiro trimestre", conferir: true, diretrizes: ["ms-calcio","figo-pe-2019"],
          questoes: ["q-unifesp2023-051","q-scmsp2026-064","q-usprp2023-024","q-usprp2026-031","q-einstein2026-049-ia","q-iamspe2021-063","q-iamspe2026-060","q-tp20252-033","q-unesp2026-024","q-einstein2024-059"],
          texto: `- Pré-eclâmpsia anterior: **AAS 150 mg**. {q-einstein2024-059}
- Pré-eclâmpsia e prematuro anteriores: **AAS, progesterona e ferro**. {q-unifesp2023-051}
- Risco alto isolado: **reprodução assistida**. {q-scmsp2026-064}
- Hipertensa com 15 semanas: **AAS e cálcio**. {q-usprp2023-024}
- Negra de 38 anos: **atividade física, AAS 100 mg e cálcio 1 g**. {q-unesp2026-024}
- Nota técnica 251/2024: **carbonato de cálcio** à noite, longe do ferro. {q-usprp2026-031}
- Profilaxia para todas: **cálcio a partir de 12 sem**. {q-tp20252-033}
- Rastreio combinado: fatores maternos, **PAM, uterinas e PlGF**. {q-iamspe2021-063,q-einstein2026-049-ia}
- Risco **> 1:100**: alto risco, AAS. {q-iamspe2026-060}` },
      ],
    },
    {
      id: "cronica", titulo: "Hipertensão crônica e anti-hipertensivos",
      introducao: `[[IECA e bloqueador do receptor de angiotensina causam lesão renal fetal e oligodrâmnio no segundo e terceiro trimestres: saem antes da gestação ou assim que ela é descoberta.|q-amrigs2021-047,q-sirio2027-070,q-unesp2021-027,q-didepm-023]] [[Na gestação, os anti-hipertensivos de manutenção são metildopa, nifedipino de liberação lenta e labetalol; a meta é pressão abaixo de 140/90 (diastólica perto de 85), porque tratar a hipertensão leve a moderada reduz a progressão para hipertensão grave.|q-sirio2024-072,q-einstein2022-062,q-tp20251-085,q-usp2024-117]]`,
      fragmentos: [
        { id: "cro-tratamento", titulo: "Tratamento e seguimento da hipertensa", conferir: true, diretrizes: ["isshp-2021","ms-alto-risco"],
          questoes: ["q-usp2024-116","q-usp2024-117","q-amrigs2021-047","q-sirio2024-072","q-sirio2027-070","q-unesp2021-027","q-didepm-023","q-einstein2022-062","q-einstein2023-060","q-tp20251-085","q-usprp2021-051","q-uspsp5-038"],
          prosa: `[[A hipertensa crônica bem controlada nasce com 37 a 39 semanas; pressão que sobe e não cede, mesmo sem sintomas, pede internação para ajustar e investigar sobreposição.|q-usp2024-116,q-usprp2021-051,q-uspsp5-038]]`,
          texto: `- Não usar: **IECA** (enalapril). {q-amrigs2021-047,q-sirio2027-070}
- Quer engravidar com IECA: **trocar por metildopa**. {q-unesp2021-027}
- Grávida em uso de enalapril e tiazídico: **trocar por metildopa ou nifedipino**. {q-didepm-023}
- FEBRASGO, gravidez e aleitamento: **nifedipino e metildopa**. {q-sirio2024-072}
- PA 156 × 102 com 30 semanas: **nifedipino**. {q-einstein2022-062}
- Hipertensão gestacional sem gravidade: **metildopa**, exames e ultrassom. {q-tp20251-085,q-einstein2023-060}
- Meta: **normalizar a PA** desde o 1º trimestre. {q-usp2024-117}
- Hipertensa crônica sem intercorrência: parto com **37 semanas** (banca). {q-usp2024-116,q-usprp2021-051}
- 165 × 98 mesmo sedada: **internar** e investigar. {q-uspsp5-038}` },
      ],
    },
    {
      id: "grave", titulo: "Pré-eclâmpsia grave e eclâmpsia",
      introducao: `[[Na crise (≥ 160/110) ou com sintomas de iminência de eclâmpsia (cefaleia, escotomas, epigastralgia, hiper-reflexia), a conduta é a mesma: sulfato de magnésio para prevenir a convulsão, anti-hipertensivo de ação rápida (hidralazina ou nifedipino) para proteger o cérebro de AVC, e interromper a gestação depois de estabilizar a mãe.|q-adap26-055,q-scmsp2023-077,q-unesp2023-023,q-famema2021-058,q-fmabc2025-080,q-fmabc2024-077,q-fmabc2021-059,q-udisc20262-084,q-einstein2025-049]] [[O magnésio bloqueia receptores NMDA e o cálcio, relaxa a musculatura dos vasos cerebrais e eleva o limiar convulsivo; não é anti-hipertensivo.|q-unicampdis2022-037,q-unicampdis2025-082,q-usprp2024-090]]

[[O magnésio se elimina pelo rim: a toxicidade aparece primeiro como perda do reflexo patelar, depois depressão respiratória e parada; com oligúria, a dose cai, e na intoxicação se suspende a infusão e se dá gluconato de cálcio.|q-adap23-051,q-amrigs2022-046,q-iamspe2026-020]]`,
      fragmentos: [
        { id: "gra-conduta", titulo: "Crise hipertensiva, iminência de eclâmpsia e resolução", conferir: true, diretrizes: ["isshp-2021","febrasgo-pe"],
          questoes: ["q-adap26-055","q-scmsp2023-077","q-unesp2023-023","q-famema2021-058","q-tp20222-085","q-tp20231-085","q-tp20241-083","q-fmabc2025-080","q-fmabc2024-077","q-fmabc2021-059","q-fmabc2022-072","q-fmabc2023-063","q-einstein2025-049","q-udisc20262-084","q-unicampdis2022-037","q-unicampdis2025-082","q-usprp2024-090","q-unifesp2026-055-ia","q-scmsp2021-078"],
          prosa: `[[Antes de 34 semanas, quando a mãe permite esperar 48 horas, dá-se corticoide para o pulmão fetal; acima disso, ou com deterioração, nasce.|q-unifesp2026-055-ia,q-tp20241-083]] [[A bradicardia fetal na eclâmpsia costuma ser transitória: estabiliza-se a mãe com magnésio antes de decidir o parto.|q-scmsp2021-078]] [[A hidralazina se dá em bolus de 5 mg, repetidos a cada 20 minutos até controlar.|q-scmsp2023-077]]`,
          texto: `- Cefaleia, plaquetas 98 mil, 35 sem: **magnésio, anti-hipertensivo rápido e parto** após estabilizar. {q-adap26-055,q-udisc20262-084}
- Iminência de eclâmpsia: **sulfato de magnésio e hidralazina 5 mg EV**. {q-scmsp2023-077,q-unesp2023-023,q-famema2021-058,q-fmabc2025-080}
- Iminência com hiper-reflexia: diagnóstico de **iminência de eclâmpsia**. {q-fmabc2021-059,q-fmabc2024-077}
- Crônica com 170 × 110 e 35 sem: **magnésio, hidralazina e resolução**. {q-tp20222-085,q-einstein2025-049}
- Escotomas, plaquetas 80 mil, 34 sem: **magnésio e indução**. {q-tp20231-085}
- 33 semanas com escotomas e 160 × 120: **sulfatar, hidralazina, preparar o parto**. {q-fmabc2022-072,q-fmabc2023-063}
- Cefaleia e reflexos exaltados: **sulfato de magnésio**. {q-unicampdis2022-037,q-unicampdis2025-082,q-usprp2024-090}
- Pré-eclâmpsia piorando com 33 sem: **magnésio e betametasona** antes do parto. {q-unifesp2026-055-ia}
- 31 semanas com PA alta assintomática e exames limítrofes: **magnésio e hidralazina**. {q-tp20241-083}
- Eclâmpsia com bradicardia fetal: **magnésio 4 g e manutenção 1 g/h**, estabilizar. {q-scmsp2021-078}` },
        { id: "gra-sulfato", titulo: "Sulfato de magnésio: doses, toxicidade e eclâmpsia", conferir: true, diretrizes: ["febrasgo-pe","ms-alto-risco"],
          questoes: ["q-adap23-051","q-amrigs2022-046","q-iamspe2026-020","q-unesp2025-027","q-simepm89-022","q-fmabc2022-080","q-famerp2025-018","q-tp20232-085","q-tp20261-114"],
          prosa: `[[O esquema de Pritchard (4 g IV mais 10 g IM) serve para transferir, porque não precisa de bomba; o de Zuspan é 4 g IV e 1 a 2 g/h.|q-unesp2025-027]] [[Nova convulsão durante o magnésio recebe mais 2 g IV.|q-simepm89-022]] [[O magnésio continua por 24 horas após o parto (ou após a última convulsão), e a pressão alta se trata à parte.|q-fmabc2022-080,q-famerp2025-018]] [[Convulsão em gestante sem outra causa é eclâmpsia até prova em contrário, mesmo com PA pouco alta.|q-tp20232-085,q-tp20261-114]]`,
          texto: `- Reflexo abolido e FR 10: **suspender, gluconato de cálcio, dosar magnésio**. {q-adap23-051}
- Cuidado: **reflexo patelar presente**, diurese, respiração. {q-amrigs2022-046}
- Monitorar **sinais vitais, ECG, reflexos e função renal**. {q-iamspe2026-020}
- Transferência: **4 g IV + 10 g IM**. {q-unesp2025-027}
- Convulsão de novo: **mais 2 g IV**. {q-simepm89-022}
- Mantém-se **24 h** após a resolução. {q-fmabc2022-080}
- Puérpera com 160 × 110 em magnésio: **mantê-lo e hidralazina**. {q-famerp2025-018}
- Convulsão com PA 140 × 70 em diabética: **eclâmpsia**, magnésio e resolução. {q-tp20232-085,q-tp20261-114}` },
      ],
    },
    {
      id: "hellp", titulo: "HELLP e momento do parto",
      introducao: `[[A HELLP é a microangiopatia da pré-eclâmpsia: o endotélio lesado ativa plaquetas, que se consomem; as hemácias se fragmentam nos vasos (hemólise: DHL alta, bilirrubina indireta, esquizócitos); o fígado sofre isquemia (transaminases altas, dor no hipocôndrio direito) e pode romper.|q-scmsp2021-079,q-tp20212-094,q-tp20252-091,q-unicampdis2024-042,q-scmsp2025-036]] [[A conduta é magnésio, controle da pressão e parto; antes de 34 semanas, com mãe estável, pode-se esperar 24 a 48 horas pelo corticoide.|q-adap21-051,q-usprp2026-076,q-famema2023-060,q-fmabc2026-064]]

[[Na pré-eclâmpsia, o parto a partir de 37 semanas reduz complicação materna sem piorar o recém-nascido; antes disso, a gravidade materna ou fetal (restrição com diástole zero) decide.|q-adap24-037,q-unifesp2024-053,q-unesp2024-021,q-usp2026-104]]`,
      fragmentos: [
        { id: "hel-conduta", titulo: "Síndrome HELLP", conferir: true, diretrizes: ["isshp-2021"],
          questoes: ["q-adap21-051","q-scmsp2021-079","q-scmsp2025-036","q-usprp2026-076","q-tp20212-094","q-tp20252-091","q-unicampdis2024-042","q-famema2023-060","q-fmabc2026-064","q-usprp2023-022"],
          prosa: `[[Antes da cesárea, o hemograma com plaquetas decide a anestesia: abaixo de cerca de 70–80 mil, nada de bloqueio no neuroeixo.|q-usprp2023-022]]`,
          texto: `- Plaquetas baixas, transaminases e DHL altos: **HELLP**. {q-tp20212-094,q-tp20252-091,q-unicampdis2024-042}
- Mecanismo: **lesão endotelial ativa e consome plaquetas**. {q-scmsp2021-079}
- Dor no ombro, choque e hemoperitônio: **ruptura hepática**. {q-scmsp2025-036}
- 32 semanas: **magnésio, anti-hipertensivo e corticoide**, parto em 24–48 h. {q-adap21-051}
- 30 semanas estável: **betametasona, magnésio** e vigilância até 48 h. {q-usprp2026-076}
- HELLP: resolver **na viabilidade**, com magnésio. {q-famema2023-060}
- 37 semanas com HELLP e BCF 100: **magnésio, anti-hipertensivo e parto**. {q-fmabc2026-064}
- Antes da cesárea: **hemograma** (plaquetas). {q-usprp2023-022}` },
        { id: "hel-parto", titulo: "Quando nascer", conferir: true, diretrizes: ["isshp-2021"],
          questoes: ["q-adap24-037","q-unifesp2024-053","q-usp2026-104","q-unesp2024-021"],
          casos: ["q-usp2026-104"],
          texto: `- Pré-eclâmpsia sem gravidade com 38 sem: **induzir**. {q-adap24-037}
- 37 semanas com proteinúria: **indução imediata**. {q-unifesp2024-053}
- Diástole zero com 26+ semanas: **resolver a gestação**. {q-unesp2024-021}
- Edema importante e avaliação fetal alterada: **cesárea**. {q-usp2026-104}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-einstein2023-060","q-amrigs2022-046","q-usp2024-116"],
          texto: `- Pressão de 140 × 90 que normaliza com repouso e exames normais não fecha hipertensão; a banca já **prescreveu metildopa**. {q-einstein2023-060}
- Creatinina alta **reduz a dose** de magnésio (a decisão é pela diurese e pelos reflexos); a afirmação de interromper com creatinina > 1 foi considerada falsa. {q-amrigs2022-046}
- Hipertensa crônica sem remédio nasce com **38–39 semanas**; com remédio, 37–39; a prova cravou **37**. {q-usp2024-116}` },
      ],
    },
  ],
});
