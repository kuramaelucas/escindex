/* resumos/politicas-nacionais/resumo.js — resumo adaptativo de políticas nacionais de saúde
   (ass-politicasnacionais): humanização (acolhimento, ambiência, clínica ampliada, equipe de referência),
   políticas por ciclo de vida e população (mulher, criança, homem, idoso, pessoa com deficiência,
   população negra, LGBT), violência, saúde mental e CAPS, alimentação (PNAN, Guia Alimentar),
   DCNT, câncer, atenção especializada, PSE, intersetorialidade, telemedicina, transplantes e
   acompanhante no parto; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- politicas-nacionais */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "politicas-nacionais",
  titulo: "Políticas nacionais de saúde",
  assunto: "ass-politicasnacionais",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "pnh", texto: "Ministério da Saúde — Política Nacional de Humanização (HumanizaSUS, 2003; cartilhas 2010–2013)", lidoEm: null },
    { id: "politicas-populacoes", texto: "Ministério da Saúde — PNAISM (2004), PNAISC (Portaria 1.130/2015), PNAISH (2009), Política Nacional de Saúde da Pessoa Idosa (Portaria 2.528/2006), Política Nacional de Saúde Integral da População Negra (2009), Política Nacional de Enfrentamento à Violência contra as Mulheres (2011)", lidoEm: null },
    { id: "pnan-guia", texto: "Política Nacional de Alimentação e Nutrição (2011) e Guia Alimentar para a População Brasileira (2.ª ed., 2014)", lidoEm: null },
    { id: "dcnt-2030", texto: "Ministério da Saúde — Plano de Ações Estratégicas para o Enfrentamento das DCNT no Brasil 2021–2030", lidoEm: null },
    { id: "leis-diversas", texto: "Lei 10.216/2001 (saúde mental), Lei 11.108/2005 (acompanhante), Lei 9.434/1997 (transplantes), Lei 14.510/2022 e Resolução CFM 2.314/2022 (telessaúde), Portaria GM/MS 1.604/2023 (PNAES)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "humanizacao", titulo: "Política Nacional de Humanização",
      introducao: `[[A PNH (HumanizaSUS) não é um programa à parte: é um modo de fazer o SUS que reconhece usuário, trabalhador e gestor como sujeitos. Suas diretrizes viram prática concreta — **acolhimento** (escutar e responsabilizar-se pela demanda), **ambiência** (espaço que acolhe), **clínica ampliada** (o caso visto além da doença), **cogestão**, valorização do trabalhador e defesa dos direitos do usuário.|q-tp20202-119,q-tp20222-120,q-fmabc2022-085]]

Veja também: **Princípios e organização do SUS**, **Atenção primária e Saúde da Família**, **Vigilância sanitária e notificação**, **Bioética** e **Violência** quando houver resumo.`,
      fragmentos: [
        { id: "hum-diretrizes", titulo: "Acolhimento, clínica ampliada e equipe de referência", conferir: true, diretrizes: ["pnh"],
          figuras: [{ arquivo: "figuras/politicas-mapa.svg", legenda: "Esquema autoral: as políticas por eixo — modo de cuidar, populações, condições e intersetorialidade." }],
          questoes: ["q-tp20202-119","q-tp20222-120","q-fmabc2022-085","q-tp20212-106","q-unicampdis2022-056","q-unesp2021-092"],
          prosa: `[[Grupo de mulheres no centro de convivência, com escuta e espaço acolhedor: **acolhimento, ambiência e clínica ampliada**. Entregar uma dieta impressa sem considerar a vida da paciente nega a **clínica ampliada**, que integra a equipe e cria vínculo para cuidar de cada caso.|q-tp20202-119,q-tp20222-120,q-fmabc2022-085]] [[O **acolhimento** é o mecanismo prioritário para superar a vulnerabilidade de quem não consegue defender seus interesses (criança, idoso, pessoa com transtorno mental, doente terminal).|q-tp20212-106]] [[Organizar as equipes por paciente, e não por profissão, é a **equipe de referência** (com apoio matricial). Na urgência, a PNH pede protocolos que eliminem intervenções desnecessárias e respeitem as diferenças.|q-unicampdis2022-056,q-unesp2021-092]]`,
          texto: `- **Acolhimento, ambiência, clínica ampliada**. {q-tp20202-119,q-tp20222-120,q-fmabc2022-085}
- Vulnerável: **acolhimento**. {q-tp20212-106}
- Equipes por paciente: **equipe de referência**. {q-unicampdis2022-056}
- Urgência: protocolos sem intervenção desnecessária. {q-unesp2021-092}` },
      ],
    },
    {
      id: "populacoes", titulo: "Políticas por população",
      introducao: `[[Cada população tem uma política porque tem um jeito próprio de adoecer e de não chegar ao serviço: o homem procura pouco, a mulher tem necessidades além da gestação, a criança depende de proteção, o idoso precisa de autonomia, a população negra sofre racismo institucional. A política nomeia a barreira e diz como removê-la.|q-famema2025-072,q-tp20202-116,q-sirio2027-093]]`,
      fragmentos: [
        { id: "pop-mulher", titulo: "Mulher, gestação e violência", conferir: true, diretrizes: ["politicas-populacoes","leis-diversas"],
          questoes: ["q-famema2025-072","q-sessp2023-099","q-famema2022-010","q-tp20222-113","q-unesp2022-097","q-sirio2024-096","q-sirio2027-093","q-famema2022-005","q-unesp2026-096","q-tp20261-067"],
          prosa: `[[A **PNAISM** parte de que as necessidades da mulher **extrapolam a gestação e o parto** e cobrem todos os ciclos de vida; as mulheres em idade reprodutiva são a maior parte da população feminina. O aborto inseguro está entre as principais causas de morte materna e de violência institucional.|q-famema2025-072,q-sessp2023-099,q-famema2022-010]] [[A morte materna no Brasil é sobretudo por **causa obstétrica direta**: doença hipertensiva, hemorragia e infecção puerperal. A Lei 11.108 garante **acompanhante** no trabalho de parto, parto e pós-parto imediato. A gravidez na adolescência pesa nos óbitos fetais.|q-tp20222-113,q-unesp2022-097,q-sirio2024-096]] [[A política da **população negra** usa a **razão de mortalidade materna** e reconhece o **racismo institucional** como determinante, buscando equidade.|q-sirio2027-093]] [[O enfrentamento da violência contra a mulher é **intersetorial**: aplicar a Lei Maria da Penha, garantir segurança e acesso à Justiça; ECA e Código de Trânsito também são leis de prevenção de violência.|q-famema2022-005,q-unesp2026-096,q-tp20261-067]]`,
          texto: `- PNAISM: **além da gestação**, todos os ciclos. {q-famema2025-072,q-sessp2023-099,q-famema2022-010}
- Morte materna: **hipertensão, hemorragia, infecção**; acompanhante no parto. {q-tp20222-113,q-unesp2022-097,q-sirio2024-096}
- População negra: **racismo institucional**, RMM. {q-sirio2027-093}
- Violência: **intersetorial**, Maria da Penha. {q-famema2022-005,q-unesp2026-096,q-tp20261-067}` },
        { id: "pop-ciclos", titulo: "Criança, homem, idoso, pessoa com deficiência e LGBT", conferir: true, diretrizes: ["politicas-populacoes"],
          questoes: ["q-famema2023-016","q-fmabc2026-095","q-tp20202-116","q-tp20252-015","q-famema2022-006","q-famema2023-009","q-fmabc2023-084","q-famema2022-007","q-uspsp4-081"],
          prosa: `[[A **PNAISC** tem 7 eixos, entre eles a atenção ao parto e ao recém-nascido e a atenção à criança em situação de violência com cultura de paz. O **Programa Saúde na Escola** junta saúde e educação para enfrentar vulnerabilidades.|q-famema2023-016,q-fmabc2026-095]] [[A **PNAISH** reconhece que o homem chega tarde ao serviço por horário de trabalho e por masculinidade ("quem se cuida é fraco"): **horário estendido** e ações educativas nos espaços dos homens.|q-tp20202-116,q-tp20252-015]] [[A política do **idoso** promove envelhecimento ativo desde o pré-natal, proíbe discriminação no trabalho e prevê recursos e controle social. Para a **pessoa com deficiência**, envolver a família é essencial.|q-famema2022-006,q-famema2023-009,q-fmabc2023-084,q-famema2022-007]] [[A hormonização de pessoa trans adulta pode ser feita na **atenção primária**: acolher, explicar efeitos, exames basais e termo de consentimento, sem exigir laudo.|q-uspsp4-081]]`,
          texto: `- PNAISC: **7 eixos**; PSE = saúde + educação. {q-famema2023-016,q-fmabc2026-095}
- Homem: **horário estendido**, ir aonde ele está. {q-tp20202-116,q-tp20252-015}
- Idoso: **envelhecimento ativo**, sem discriminação. {q-famema2022-006,q-famema2023-009,q-fmabc2023-084}
- Deficiência: família; trans: hormonização na **APS**. {q-famema2022-007,q-uspsp4-081}` },
      ],
    },
    {
      id: "condicoes", titulo: "Políticas por condição e intersetorialidade",
      introducao: `[[Algumas políticas se organizam por condição — saúde mental, alimentação, doenças crônicas, câncer — e quase todas dependem de setores fora da saúde. **Intersetorialidade** é a saúde trabalhando junto com educação, agricultura, assistência social para agir nos determinantes.|q-sessp2025-093,q-famema2025-073]]`,
      fragmentos: [
        { id: "con-mental", titulo: "Saúde mental", conferir: true, diretrizes: ["leis-diversas"],
          questoes: ["q-famema2025-090","q-sirio2026-093","q-famema2022-011","q-fmabc2022-095"],
          prosa: `[[A reforma psiquiátrica (Lei 10.216) troca o manicômio pela rede comunitária: o **CAPS** oferece terapia, atividades e suporte social, e constrói com a equipe um **projeto terapêutico singular**. As demandas se discutem em conjunto com usuários e famílias.|q-famema2025-090,q-sirio2026-093,q-famema2022-011]] [[Internação **voluntária** termina por pedido escrito do paciente ou decisão do médico assistente.|q-fmabc2022-095]]`,
          texto: `- **CAPS** e projeto terapêutico singular. {q-famema2025-090,q-sirio2026-093,q-famema2022-011}
- Voluntária: termina por **pedido escrito** ou médico. {q-fmabc2022-095}` },
        { id: "con-alimentacao", titulo: "Alimentação, DCNT e câncer", conferir: true, diretrizes: ["pnan-guia","dcnt-2030"],
          questoes: ["q-unesp2022-090","q-fmabc2025-086","q-famema2022-019","q-famema2023-020","q-famema2025-073","q-sessp2025-093","q-fmabc2024-084","q-fmabc2024-088","q-tp20251-102","q-sirio2025-093"],
          prosa: `[[A regra de ouro do **Guia Alimentar** (2014) é **preferir alimentos in natura ou minimamente processados e preparações culinárias** aos ultraprocessados; o guia não faz recomendação dietética para doenças específicas. Os **adolescentes** têm a pior dieta. A PNAN se implementa pelos gestores das três esferas com parcerias.|q-unesp2022-090,q-fmabc2025-086,q-famema2022-019,q-famema2023-020]] [[Apoiar feira de orgânicos capacitando a equipe da UBS, ou educação nutricional com a secretaria de educação, são exemplos de **intersetorialidade**.|q-famema2025-073,q-sessp2025-093]] [[O plano de DCNT 2021–2030 quer **reduzir em 1/3 a mortalidade prematura (30–69 anos)**; atividade física é mais comum entre jovens, homens, mais escolarizados e brancos — a desigualdade é parte do problema.|q-fmabc2024-084,q-fmabc2024-088]] [[Em município pequeno, a política do câncer cabe à atenção básica: **promoção, prevenção, detecção precoce e cuidados paliativos**. Doenças negligenciadas pedem cooperação internacional.|q-tp20251-102,q-sirio2025-093]]`,
          texto: `- Guia: **in natura > ultraprocessado**. {q-unesp2022-090,q-fmabc2025-086,q-famema2022-019,q-famema2023-020}
- Intersetorialidade: saúde + educação/agricultura. {q-famema2025-073,q-sessp2025-093}
- DCNT: **−1/3 da mortalidade prematura** até 2030. {q-fmabc2024-084,q-fmabc2024-088}
- Câncer na APS: promoção a paliativo. {q-tp20251-102,q-sirio2025-093}` },
        { id: "con-outras", titulo: "Atenção especializada, telessaúde e transplantes", conferir: true, diretrizes: ["leis-diversas"],
          questoes: ["q-usprp2027-083","q-uspsp4-083","q-uspsp5-080"],
          prosa: `[[A **PNAES** (2023) organiza a atenção especializada a partir do **fortalecimento da atenção primária** e da segurança do paciente.|q-usprp2027-083]] [[A lei da telessaúde permite a **primeira consulta por telemedicina** quando o médico julga seguro, com a mesma qualidade e registro em prontuário.|q-uspsp4-083]] [[Transplante: lista única estadual controlada pelo Sistema Nacional de Transplantes; doação entre vivos não parentes exige autorização judicial; a retirada de órgãos de falecido depende da **autorização da família**, mesmo com desejo registrado em vida.|q-uspsp5-080]]`,
          texto: `- PNAES: **fortalece a APS**. {q-usprp2027-083}
- Telemedicina: **primeira consulta** permitida. {q-uspsp4-083}
- Doação de falecido: **família autoriza**. {q-uspsp5-080}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["pnan-guia","politicas-populacoes"],
          questoes: ["q-fmabc2025-086","q-famema2025-073","q-sirio2024-096","q-tp20202-116"],
          prosa: `[[**Integral para diabético**: o Guia Alimentar não prescreve dieta para doenças, e integral não tem muito menos carboidrato; a fmabc2025-086 marcou essa afirmação como **a incorreta**.|q-fmabc2025-086]] [[**Intersetorialidade na feira de orgânicos**: a famema2025-073 escolheu **capacitar a equipe da UBS** sobre orgânicos como a ação da saúde, e não ações fora do setor.|q-famema2025-073]] [[**Dado numérico como resposta**: a sirio2024-096 pediu a afirmação certa sobre gravidez na adolescência e a resposta foi um **número do SIM** (14,3% dos óbitos fetais em mães de 10–19 anos).|q-sirio2024-096]] [[**Acesso do homem**: a PNAISH tem vários eixos; a tp20202-116 escolheu **flexibilizar o horário** como a medida mais adequada.|q-tp20202-116]]`,
          texto: `- Integral para diabético: **afirmação incorreta**. {q-fmabc2025-086}
- Feira: **capacitar a UBS**. {q-famema2025-073}
- Adolescência: resposta = **dado do SIM**. {q-sirio2024-096}
- Homem: **horário**. {q-tp20202-116}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: política, foco e palavra-chave",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-politicas", titulo: "O que cada política pede", conferir: true,
          questoes: ["q-tp20222-120","q-famema2025-072","q-tp20202-116","q-famema2022-006","q-sirio2026-093","q-unesp2022-090"],
          prosa: `[[Cada política tem uma ideia-chave que a prova cobra.|q-tp20222-120,q-famema2025-072,q-tp20202-116,q-famema2022-006,q-sirio2026-093,q-unesp2022-090]]

| Política | Ideia-chave |
|---|---|
| Humanização (PNH) | acolhimento, ambiência, clínica ampliada, equipe de referência |
| Mulher (PNAISM) | necessidades além da gestação; morte materna obstétrica direta |
| Homem (PNAISH) | chega tarde: horário estendido, ir aos espaços dos homens |
| Idoso | envelhecimento ativo, sem discriminação |
| Saúde mental | CAPS, projeto terapêutico singular, rede comunitária |
| Alimentação | in natura antes de ultraprocessado |`,
          texto: `- PNH: **clínica ampliada**. {q-tp20222-120}
- Mulher: **além da gestação**. {q-famema2025-072}
- Homem: **horário**. {q-tp20202-116}
- Idoso: **envelhecimento ativo**. {q-famema2022-006}
- Mental: **CAPS**. {q-sirio2026-093}
- Guia: **in natura**. {q-unesp2022-090}` },
      ],
    },
  ],
});
