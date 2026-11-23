/* resumos/populacoes-especificas/resumo.js — resumo adaptativo de saúde de populações específicas
   (ass-saudepopulacoes): determinantes sociais (modelos, Dahlgren-Whitehead), vulnerabilidade, população negra e
   racismo institucional, população em situação de rua e migrantes, saúde indígena (SasiSUS), população LGBTQIA+,
   pessoas privadas de liberdade, pessoas com deficiência e violência contra a mulher, armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- populacoes-especificas */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "populacoes-especificas",
  titulo: "Saúde de populações específicas e determinantes sociais",
  assunto: "ass-saudepopulacoes",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "pnsipn", texto: "Ministério da Saúde — Política Nacional de Saúde Integral da População Negra (3ª ed., 2017)", lidoEm: null },
    { id: "pnaspi", texto: "Ministério da Saúde — Política Nacional de Atenção à Saúde dos Povos Indígenas (2002) e Lei 9.836/1999 (Lei Arouca)", lidoEm: null },
    { id: "pop-rua", texto: "Ministério da Saúde — Manual sobre o cuidado à saúde junto à população em situação de rua (2012) e Política Nacional para a População em Situação de Rua (Decreto 7.053/2009)", lidoEm: null },
    { id: "lgbt", texto: "Ministério da Saúde — Política Nacional de Saúde Integral LGBT (2011) e Portaria 2.803/2013 (processo transexualizador)", lidoEm: null },
    { id: "pnaisp", texto: "Ministério da Saúde — Política Nacional de Atenção Integral à Saúde das Pessoas Privadas de Liberdade no Sistema Prisional (PNAISP, 2014)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "determinantes", titulo: "Determinantes sociais e vulnerabilidade",
      introducao: `[[Adoecer depende muito menos do médico do que das condições em que se nasce, mora, trabalha e envelhece. McKeown mostrou que a mortalidade na Inglaterra caiu sobretudo por melhor nutrição, moradia e trabalho, antes dos antibióticos. O modelo de Dahlgren e Whitehead organiza os determinantes em camadas: no centro, idade, sexo e genética; depois o estilo de vida; as redes sociais e comunitárias; as condições de vida e trabalho (alimentação, moradia, saneamento, educação, serviços de saúde); e, por fora, as condições socioeconômicas, culturais e ambientais gerais.|q-iamspe2025-082,q-sirio2021-089,q-unicampdis2025-046,q-sessp2025-095]] [[Por isso o que a equipe enxerga numa comunidade (doença respiratória em casa sem ventilação perto do lixão, pneumonias de repetição em casa de um cômodo com mofo e fogão a lenha) se explica pelo modelo ecológico, e as respostas são intersetoriais.|q-scmsp2026-088,q-sirio2026-082,q-tp20212-112]]

Veja também: **Princípios do SUS** (equidade, universalidade, integralidade), **Estratégia Saúde da Família** (Consultório na Rua, atributos da APS), **Vigilância em saúde** (notificação de violência), **Tuberculose** e **HIV**.`,
      fragmentos: [
        { id: "dss-modelos", titulo: "Modelos e exemplos", conferir: true,
          figuras: [{ arquivo: "figuras/dahlgren.svg", legenda: "Esquema autoral: as camadas de determinantes sociais de Dahlgren e Whitehead." }],
          questoes: ["q-iamspe2025-082","q-iamspe2025-083","q-iamspe2025-081","q-iamspe2025-085","q-sirio2021-089","q-sessp2025-095","q-unicampdis2025-046","q-sirio2026-082","q-scmsp2026-088","q-einstein2021-050","q-usp2024-086","q-tp20212-112","q-unesp2023-094","q-tp20232-105","q-einstein2026-071"],
          prosa: `[[Fortalecer redes de apoio e a organização da comunidade é agir na terceira camada (redes sociais e comunitárias). A distância até o serviço é um determinante que pesa na adesão. Rosling insistiu que educação e informação reduzem desigualdade; Maslow lembra que alimento e abrigo vêm antes de qualquer outra meta; no modelo de crenças em saúde, a percepção de suscetibilidade move a pessoa a se prevenir. O Atlas da Vulnerabilidade Social mede o acesso a três grandes conjuntos de ativos (infraestrutura urbana, capital humano, renda e trabalho).|q-sirio2021-089,q-sessp2025-095,q-iamspe2025-083,q-iamspe2025-081,q-iamspe2025-085,q-einstein2021-050]] [[Epidemias também são sociais: a covid seguiu as desigualdades e a circulação de pessoas. Mortes de adolescentes do sexo masculino nas cidades vêm de violência e drogas, que só ações intersetoriais reduzem. O clima extremo desorganiza a produção de alimentos e a poluição do ar (material particulado, ozônio, NO2, SO2) causa doença cardíaca e pulmonar. Diante de insegurança alimentar, a conduta combina mudança gradual e articulação com programas sociais.|q-usp2024-086,q-tp20212-112,q-unesp2023-094,q-tp20232-105,q-einstein2026-071,q-iamspe2025-082,q-unicampdis2025-046,q-sirio2026-082,q-scmsp2026-088]]`,
          texto: `- McKeown: **fatores socioeconômicos causam a saúde**. {q-iamspe2025-082}
- Rosling: **educação e informação**. {q-iamspe2025-083}
- Maslow: **necessidades fisiológicas primeiro**. {q-iamspe2025-081}
- Crenças em saúde (a prova): **percepção de suscetibilidade**. {q-iamspe2025-085}
- Redes de apoio e participação: **terceira camada**. {q-sirio2021-089}
- Determinante que afeta a adesão: **distância até o serviço**. {q-sessp2025-095}
- Obesidade, asma e depressão pelas condições do bairro: **determinantes sociais**. {q-unicampdis2025-046}
- Casa sem janela com mofo e fogão a lenha: **modelo ecológico**. {q-sirio2026-082}
- Doença respiratória perto do lixão: **I, II e IV**. {q-scmsp2026-088}
- Atlas: **três conjuntos de ativos**. {q-einstein2021-050}
- Covid: **articulada às desigualdades**. {q-usp2024-086}
- Mortes de adolescentes: **ações intersetoriais contra drogas e violência**. {q-tp20212-112}
- Clima: **sistemas alimentares perturbados**. {q-unesp2023-094}
- Poluentes: **doenças cardíacas e pulmonares**. {q-tp20232-105}
- Insegurança alimentar: **mudança gradual e programas sociais**. {q-einstein2026-071}` },
        { id: "dss-vulnerabilidade", titulo: "Vulnerabilidade individual, social e programática", conferir: true,
          questoes: ["q-scmsp2023-085","q-usp2025-117","q-einstein2024-071","q-unifesp2023-026","q-amrigs2023-089"],
          prosa: `[[A vulnerabilidade tem três dimensões: individual (conhecimento, comportamento, corpo), social (renda, trabalho, gênero, raça, moradia, violência) e programática (como os serviços e as políticas respondem, ou falham). Serviço que nega a profilaxia pós-exposição e manda a pessoa a outro lugar cria vulnerabilidade programática; a mulher que vive na rua e trabalha com sexo tem vulnerabilidade social.|q-scmsp2023-085,q-usp2025-117,q-einstein2024-071]] [[Entender os determinantes serve para construir projetos de cuidado individuais e ações coletivas no território, não só para mandar mudar hábitos. Racismo, LGBTfobia e violência de gênero aumentam o sofrimento psíquico, e a queixa somática vaga ou a falta às consultas podem ser o sinal.|q-unifesp2023-026,q-amrigs2023-089]]`,
          texto: `- PEP negada no serviço: **social e programática**. {q-scmsp2023-085}
- Mulher em situação de rua que trabalha na rua: **vulnerabilidade social**. {q-usp2025-117}
- Catadora negra com cinco filhos e hipertensão: **programática** (a prova). {q-einstein2024-071}
- Insegurança alimentar no território: **projetos de cuidado e ações coletivas**. {q-unifesp2023-026}
- Sofrimento psíquico: **I e III**. {q-amrigs2023-089}` },
      ],
    },
    {
      id: "negra", titulo: "População negra e racismo",
      introducao: `[[O racismo institucional é a falha do serviço em atender as pessoas de forma adequada por causa da cor, mesmo sem ninguém se declarar preconceituoso: aparece nos dados (menos analgesia, mais espera, menos consultas). A Política Nacional de Saúde Integral da População Negra reconhece o racismo e as desigualdades étnico-raciais como determinantes da saúde e parte de estudos que mostraram essas desigualdades no acesso e nos desfechos.|q-adap23-027,q-unifesp2023-027,q-famema2022-012,q-sirio2027-082]]`,
      fragmentos: [
        { id: "neg-politica", titulo: "Política e equidade", conferir: true, diretrizes: ["pnsipn"],
          questoes: ["q-adap23-027","q-unifesp2023-027","q-famema2022-012","q-fmabc2021-074","q-uspsp1-104","q-sirio2027-082","q-unicampdis2025-049","q-usp2024-094","q-usp2025-101"],
          prosa: `[[O enfrentamento é institucional: educação permanente, registro de raça/cor, monitorar indicadores por raça, ouvir os usuários. A resposta às desigualdades é a equidade (tratar desigualmente os desiguais, oferecendo mais a quem mais precisa), como no acesso das pessoas com doença falciforme. Hipertensão mais frequente e mortes maiores por AVC na população negra não se explicam só pela genética: somam-se acesso, renda, discriminação.|q-adap23-027,q-uspsp1-104,q-sirio2027-082,q-unicampdis2025-049,q-fmabc2021-074]] [[O sofrimento de um jovem pardo cobrado a ter alto desempenho, que pede remédio para "atenção", pode mostrar racismo, desigualdade econômica e medicalização da vida; o idoso negro com deficiência pode sofrer racismo e capacitismo ao mesmo tempo.|q-usp2024-094,q-usp2025-101]]`,
          texto: `- Menos analgesia e mais espera para negros: **racismo institucional**. {q-adap23-027}
- PNSIPN partiu de **estudos que demonstraram desigualdades**. {q-unifesp2023-027}
- PNSIPN: **reconhece o racismo como determinante**. {q-famema2022-012}
- Menos consultas entre negros (a prova): **universalidade** em risco. {q-fmabc2021-074}
- Doença falciforme: **equidade no acesso**. {q-uspsp1-104}
- Hipertensão e discriminação: **racismo institucional e determinantes sociais**. {q-sirio2027-082}
- Mortalidade 30% maior nos bairros negros: **AVC**. {q-unicampdis2025-049}
- Jovem pardo pedindo "ritalina": **racismo, desigualdade econômica, medicalização da vida**. {q-usp2024-094}
- Idoso negro após AVC: **racismo e capacitismo**. {q-usp2025-101}` },
      ],
    },
    {
      id: "rua", titulo: "População em situação de rua e migrantes",
      introducao: `[[A população em situação de rua adoece mais (tuberculose cerca de 50 vezes mais que a população geral, HIV, uso de álcool e drogas, violência) e chega menos aos serviços. O SUS é universal: ninguém pode ser recusado por falta de documento, endereço ou situação migratória, e a falta de comprovante não impede cadastro nem atendimento.|q-fmabc2025-081,q-adap25-045,q-usp2025-116,q-sirio2026-085,q-usprp2027-097]]`,
      fragmentos: [
        { id: "rua-cuidado", titulo: "Consultório na Rua, tuberculose e migrantes", conferir: true, diretrizes: ["pop-rua"],
          questoes: ["q-adap25-045","q-adap23-026","q-tp20251-109","q-fmabc2025-081","q-usp2025-116","q-sirio2026-085","q-usprp2027-097"],
          prosa: `[[As equipes de Consultório na Rua são multiprofissionais e trabalham de forma itinerante, onde as pessoas estão, articuladas à atenção básica. Toda pessoa em situação de rua com tosse, de qualquer duração, colhe escarro para tuberculose; o tratamento é diretamente observado no lugar onde a pessoa está, com apoio (alimentação, abrigo), porque o abandono é o grande risco.|q-tp20251-109,q-fmabc2025-081,q-adap23-026,q-usp2025-116]] [[O imigrante, regular ou não, tem direito ao atendimento integral, ao cadastro e às vacinas, sem exigência de documento.|q-sirio2026-085,q-usprp2027-097,q-adap25-045]]`,
          texto: `- Sem documento: **acolher, atender e cadastrar**. {q-adap25-045}
- Tuberculose em situação de rua: **tratamento diretamente observado com apoio**. {q-adap23-026}
- Consultório na Rua: **itinerante**, em unidade móvel ou instalações. {q-tp20251-109}
- Tuberculose: risco **~54 vezes maior**; tosse de qualquer duração investiga. {q-fmabc2025-081}
- Sem residência, com tosse e febre: **acolher e avaliar já**. {q-usp2025-116}
- Criança imigrante irregular: **atendimento integral no SUS**. {q-sirio2026-085}
- Venezuelano sem cadastro: **cadastrar e atender integralmente**. {q-usprp2027-097}` },
      ],
    },
    {
      id: "indigena", titulo: "Saúde indígena",
      introducao: `[[O Subsistema de Atenção à Saúde Indígena (SasiSUS), criado pela Lei Arouca (1999), faz parte do SUS com os mesmos princípios, gerido pela Secretaria de Saúde Indígena (SESAI) do Ministério da Saúde e organizado em Distritos Sanitários Especiais Indígenas (DSEI) com equipes multidisciplinares nas aldeias; a média e a alta complexidade ficam na rede do SUS, para onde a equipe remove e acompanha o paciente.|q-unifesp2025-045,q-adap23-025,q-unifesp2023-025]]`,
      fragmentos: [
        { id: "ind-subsistema", titulo: "SasiSUS e competência cultural", conferir: true, diretrizes: ["pnaspi"],
          casos: ["q-unesp2024-093"],
          questoes: ["q-adap23-025","q-unifesp2023-025","q-unifesp2025-045","q-famema2021-062","q-scmsp2022-083","q-unesp2024-093"],
          prosa: `[[O modelo trabalha com as especificidades regionais e culturais e articula os saberes tradicionais com a biomedicina: a competência cultural, atributo da atenção primária, é reconhecer e respeitar as crenças do paciente e da comunidade (como o uso de chás e plantas) e cuidar a partir delas. Os indicadores de saúde dos povos indígenas seguem piores que os da população geral.|q-unifesp2023-025,q-famema2021-062,q-scmsp2022-083,q-unesp2024-093]]`,
          texto: `- Gestante indígena com PA 160/110 longe da maternidade: **equipe atende, remove e acompanha**. {q-adap23-025}
- SasiSUS: **especificidades regionais e culturais**. {q-unifesp2023-025}
- Gestão: **SESAI, em DSEIs**. {q-unifesp2025-045}
- Articulação de saberes: **competência cultural**. {q-famema2021-062,q-scmsp2022-083}
- Gráfico: indígenas com **piores indicadores**. {q-unesp2024-093}` },
      ],
    },
    {
      id: "lgbt", titulo: "População LGBTQIA+",
      introducao: `[[Três ideias separadas: identidade de gênero é como a pessoa se reconhece (homem, mulher, não binária), autodeclarada; é cisgênero quem se identifica com o sexo atribuído ao nascer e transgênero quem não; orientação sexual é por quem a pessoa sente atração; expressão de gênero é como ela se apresenta. Um homem trans que deseja mulheres é homem, transgênero e heterossexual.|q-usp2022-026,q-usprp2025-029]]`,
      fragmentos: [
        { id: "lgbt-cuidado", titulo: "Conceitos e cuidado na atenção primária", conferir: true, diretrizes: ["lgbt"],
          questoes: ["q-usp2022-026","q-usprp2025-029","q-scmsp2021-082","q-scmsp2025-084","q-sessp2022-088"],
          prosa: `[[A atenção primária deve acompanhar e prescrever a hormonização de pessoas trans, sem exigir avaliação prévia de especialista, e usar o nome social. Organizar o acesso ao ambulatório especializado e manter o vínculo é coordenação do cuidado. O rastreamento segue os órgãos que a pessoa tem: o homem trans com colo do útero faz citologia oncótica.|q-scmsp2021-082,q-scmsp2025-084,q-sessp2022-088]]`,
          texto: `- Identidade de gênero: **autodeclarada**. {q-usp2022-026}
- Nasceu mulher, é homem e deseja mulheres: **homem, transgênero, heterossexual**. {q-usprp2025-029}
- Hormonização: **a APS acompanha e prescreve**. {q-scmsp2021-082}
- Mulher trans entre UBS e ambulatório: **coordenação do cuidado**. {q-scmsp2025-084}
- Homem trans de 40 anos (a prova): **somente colpocitologia**. {q-sessp2022-088}` },
      ],
    },
    {
      id: "outros", titulo: "Pessoas privadas de liberdade, com deficiência e em situação de violência",
      introducao: `[[O sistema prisional concentra tuberculose, HIV, sífilis e sofrimento mental; a política (PNAISP) leva atenção básica para dentro das unidades. A pessoa com deficiência enfrenta barreiras arquitetônicas, de comunicação e de atitude (capacitismo). A violência contra a mulher aparece como dor crônica, insônia, ansiedade e idas repetidas à urgência.|q-famema2023-015,q-tp20251-118,q-scmsp2025-095,q-sirio2024-089]]`,
      fragmentos: [
        { id: "out-direitos", titulo: "Direitos e condutas", conferir: true, diretrizes: ["pnaisp"],
          questoes: ["q-usprp2022-012","q-famema2023-015","q-tp20251-118","q-sirio2027-091","q-scmsp2025-095","q-sirio2024-089","q-einstein2025-063"],
          prosa: `[[A gestante presa termina o pré-natal na unidade prisional, tem parto hospitalar e direito de amamentar o filho em berçário da unidade; no presídio são prioridade a saúde bucal, da mulher, as IST e a saúde mental.|q-usprp2022-012,q-famema2023-015]] [[Acessibilidade é responsabilidade do município (alvará e fiscalização das edificações); diante de barreira, a equipe assegura atendimento prioritário e acessível e comunica a gestão.|q-tp20251-118,q-sirio2027-091]] [[Na violência contra a mulher, o médico acolhe, explica as formas de violência (física, psicológica, sexual, patrimonial, moral), notifica, orienta a rede de apoio e ajuda a construir um plano de segurança, respeitando a decisão dela: a denúncia não exige boletim de ocorrência, e não se força a separação.|q-scmsp2025-095,q-sirio2024-089,q-einstein2025-063]]`,
          texto: `- Gestante presa: **pré-natal na unidade e amamentação em berçário**. {q-usprp2022-012}
- Prisional: **prioridade à atenção básica** (bucal, mulher, IST, saúde mental). {q-famema2023-015}
- Escada sem rampa: **acessibilidade; prefeitura**. {q-tp20251-118}
- Cadeirante sem acesso: **atendimento prioritário e acessível e comunicar à gestão**. {q-sirio2027-091}
- Hematomas pelo marido: **denúncia sem necessidade de boletim de ocorrência**. {q-scmsp2025-095}
- Violência doméstica: **rede de apoio e plano de segurança**. {q-sirio2024-089}
- Marido controla o salário: **violência patrimonial; orientar**. {q-einstein2025-063}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-sessp2022-088","q-fmabc2021-074","q-einstein2024-071","q-iamspe2025-085"],
          prosa: `[[**Rastreamento do homem trans**: segue os órgãos presentes; com mamas não retiradas, a mamografia também entra na idade indicada. A sessp2022-088, com homem de 40 anos, ficou só com a citologia (a mamografia de rastreio no SUS começa aos 50).|q-sessp2022-088]] [[**Equidade × universalidade**: desigualdade de acesso entre grupos se corrige com equidade; a fmabc2021-074 marcou universalidade (o acesso de todos estaria ameaçado).|q-fmabc2021-074]] [[**Qual vulnerabilidade**: a mesma pessoa costuma ter as três; a einstein2024-071 pediu a programática (o serviço que não respondeu às necessidades dela).|q-einstein2024-071]] [[**Modelo de crenças em saúde**: soma suscetibilidade, gravidade, benefícios e barreiras percebidos; a iamspe2025-085 destacou a suscetibilidade como "principal fator".|q-iamspe2025-085]]`,
          texto: `- Homem trans: rastrear pelos órgãos; a prova deu **só citologia** aos 40. {q-sessp2022-088}
- Desigualdade de acesso: a prova marcou **universalidade**. {q-fmabc2021-074}
- Três vulnerabilidades; a prova pediu a **programática**. {q-einstein2024-071}
- Crenças em saúde: a prova destacou a **suscetibilidade**. {q-iamspe2025-085}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: políticas para populações específicas",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-politicas", titulo: "Política, estrutura e ideia central", conferir: true,
          questoes: ["q-famema2022-012","q-unifesp2025-045","q-tp20251-109","q-scmsp2021-082","q-famema2023-015"],
          prosa: `[[Cada população tem uma política própria dentro do SUS.|q-famema2022-012,q-unifesp2025-045,q-tp20251-109,q-scmsp2021-082,q-famema2023-015]]

| População | Política | Estrutura | Ideia central |
| Negra | PNSIPN | toda a rede | reconhecer o racismo institucional; equidade |
| Indígena | PNASPI, SasiSUS | SESAI, DSEIs, equipes nas aldeias | competência cultural; referência no SUS |
| Situação de rua | Política Nacional (Decreto 7.053) | Consultório na Rua | atendimento sem documento; tratamento observado |
| LGBTQIA+ | Política Nacional LGBT | APS e processo transexualizador | nome social; hormonização na APS |
| Privada de liberdade | PNAISP | equipes de atenção básica prisional | atenção básica dentro da unidade |`,
          texto: `- Negra: **racismo como determinante**. {q-famema2022-012}
- Indígena: **SESAI e DSEI**. {q-unifesp2025-045}
- Rua: **Consultório na Rua itinerante**. {q-tp20251-109}
- Trans: **hormonização na APS**. {q-scmsp2021-082}
- Prisional: **atenção básica na unidade**. {q-famema2023-015}` },
      ],
    },
  ],
});
