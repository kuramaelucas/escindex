/* resumos/estrategia-saude-familia/resumo.js — resumo adaptativo de Estratégia Saúde da Família e atenção primária:
   atributos de Starfield, equipe e território (PNAB 2017, eMulti), ferramentas do cuidado (genograma, PTS, apoio
   matricial, visita, registro orientado por problemas, método centrado na pessoa), educação em saúde e telessaúde.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- estrategia-saude-familia */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "estrategia-saude-familia",
  titulo: "Estratégia Saúde da Família e atenção primária",
  assunto: "ass-esf",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "pnab-2017", texto: "Ministério da Saúde — Política Nacional de Atenção Básica, Portaria GM/MS nº 2.436/2017 (anexo XXII da Portaria de Consolidação nº 2/2017), com a equipe de Atenção Primária da Portaria nº 2.539/2019", lidoEm: null },
    { id: "starfield", texto: "Starfield B. — Atenção Primária: equilíbrio entre necessidades de saúde, serviços e tecnologia (UNESCO/Ministério da Saúde, 2002)", lidoEm: null },
    { id: "emulti-2023", texto: "Ministério da Saúde — Portaria GM/MS nº 635/2023 (equipes multiprofissionais na atenção primária, eMulti, que substituem o NASF-AB)", lidoEm: null },
    { id: "telessaude-2022", texto: "Lei nº 14.510/2022 (telessaúde, que revoga a Lei nº 13.989/2020) e Portaria sobre telessaúde no SUS", lidoEm: null },
    { id: "clinica-ampliada", texto: "Ministério da Saúde — Clínica ampliada e compartilhada; Cadernos de Atenção Básica nº 39 (apoio matricial e projeto terapêutico singular); Campos e Domitti (2007)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas, sem reposição.", questoes: ["q-sessp2022-094", "q-sirio2027-099"] },
  ],
  doencas: [
    {
      id: "aps", titulo: "Atenção primária: o que é e como se organiza",
      introducao: `[[A atenção primária à saúde (APS) é o primeiro nível do sistema e a ordenadora da rede: é onde a maior parte dos problemas se resolve e de onde a pessoa é encaminhada, sem perder o vínculo com a equipe.|q-iamspe2022-065,q-unesp2024-092,q-amrigs2025-081]] [[No Brasil, a Estratégia Saúde da Família (ESF) é o modelo escolhido para organizá-la: uma equipe multiprofissional responsável por um território e uma população definidos, com ênfase em promoção, prevenção e cuidado contínuo.|q-029,q-unesp2021-085,q-fmabc2022-093]]

[[O mecanismo que justifica esse desenho é simples: quem conhece a pessoa, a família e o lugar onde ela vive resolve mais com menos exame, encaminha melhor e evita o que não precisa ser feito.|q-amrigs2024-082,q-sirio2025-085]] A APS pode ser entendida de duas formas. A **seletiva** oferece um pacote restrito de intervenções baratas a populações pobres; a **integral** (a brasileira) amplia o espectro de problemas atendidos e reconhece a determinação social da doença. [[Como a ESF pretendeu evitar a APS seletiva, as ações vão além do curativo.|q-iamspe2022-065,q-usprp2021-005]]

Veja também: **Educação em saúde e promoção** (neste resumo), **Princípios do SUS** (organização da rede e financiamento), **Vigilância em saúde** (notificação e território) e **Prevenção** (níveis de prevenção e rastreamento).`,
      fragmentos: [
        { id: "aps-modelo", titulo: "APS integral, rede e porta de entrada", conferir: true, diretrizes: ["pnab-2017"],
          questoes: ["q-iamspe2022-065","q-usprp2021-005","q-unesp2024-092","q-unesp2021-085","q-sirio2025-085","q-sessp2022-081","q-amrigs2024-082","q-amrigs2025-081","q-amrigs2023-087","q-amrigs2022-088","q-fmabc2022-093","q-029","q-sirio2021-097","q-scmsp2025-083","q-unesp2022-091"],
          prosa: `A PNAB de 2017 define a atenção básica como o conjunto de ações individuais e coletivas, da promoção ao cuidado paliativo, e a coloca como **ordenadora das ações e serviços da Rede de Atenção à Saúde**. Isso quer dizer que a rede se organiza a partir dela: o especialista e o hospital atuam sobre problemas que a APS não resolve, e a pessoa volta ao seu cuidado. [[Esse arranjo explica por que a atenção primária é "continuada e longitudinal" e a secundária pode ser continuada sem ser longitudinal: só a primeira acompanha a pessoa em todos os problemas ao longo da vida.|q-sessp2022-081,q-amrigs2024-082]]

[[O Médico de Família e Comunidade responde ao território: conhece os problemas prevalentes do lugar e oferece o cuidado que a população precisa, sem depender de tecnologia pesada e sem limitar o escopo a uma faixa etária ou a um órgão.|q-scmsp2025-083,q-sirio2021-097]] O principal desafio da APS não é ter muitos profissionais, e sim **coordenar o cuidado**, integrando os pontos da rede.`,
          texto: `- A atenção básica é a **ordenadora da Rede de Atenção à Saúde**, ofertada a **todas as pessoas**, sem excluir segmentos. {q-unesp2024-092,q-amrigs2025-081,q-amrigs2023-087}
- A ESF é a estratégia prioritária para reorientar o modelo, com **vínculo entre equipe e indivíduo, família e comunidade, em base territorial**. {q-unesp2021-085,q-fmabc2022-093,q-029}
- APS **seletiva** (pacote restrito de intervenções custo-efetivas) × **integral** (amplo espectro e determinação social): a PNAB busca a integral. {q-usprp2021-005,q-iamspe2022-065}
- Para melhorar mortalidade materna e infantil e doenças crônicas, **fortalecer a atenção básica** com promoção, prevenção e assistência. {q-sirio2025-085}
- A APS é **continuada e longitudinal**; a atenção secundária pode ser continuada, mas não longitudinal. {q-sessp2022-081}
- O maior desafio da APS é a **coordenação do cuidado**, com integração entre os pontos da rede. {q-amrigs2024-082,q-amrigs2022-088,q-amrigs2023-087}
- A medicina de família **não depende** da disponibilidade de tecnologia; baseia-se na relação com a pessoa e na comunidade. {q-sirio2021-097,q-scmsp2025-083}
- O agente comunitário é o elo com a comunidade; sua ausência fragiliza o componente comunitário e a determinação social do adoecimento. {q-unesp2022-091}` },
      ],
    },
    {
      id: "atributos", titulo: "Atributos da APS (Starfield)",
      introducao: `[[Barbara Starfield descreveu quatro atributos essenciais, que definem se um serviço é de atenção primária de fato, e três derivados, que qualificam como ele atua.|q-unicamp2022-070,q-scmsp2026-083,q-sessp2023-094]] Os essenciais são **acesso de primeiro contato, longitudinalidade, integralidade e coordenação do cuidado**. Os derivados são **orientação familiar, orientação comunitária e competência cultural**.

[[A pergunta de prova quase sempre descreve uma cena e pede o atributo: o que decide é qual falha ou qual virtude a cena mostra.|q-amrigs2023-086,q-uspsp2-103,q-usp2026-084]] Quem entende o que cada atributo protege (a porta, o tempo, o conjunto de problemas, a rede e o contexto) identifica a resposta sem decorar frases.

[[O esquema abaixo reúne os sete atributos e o que cada um protege.|q-unicamp2022-070,q-scmsp2026-083]]`,
      fragmentos: [
        { id: "atr-esquema", titulo: "Os sete atributos num relance", conferir: true, diretrizes: ["starfield"],
          figuras: [{ arquivo: "figuras/atributos-aps.svg", legenda: "Esquema autoral: os quatro atributos essenciais e os três derivados da atenção primária, com o que cada um protege." }],
          questoes: ["q-unicamp2022-070","q-scmsp2026-083","q-sessp2023-094"],
          prosa: `[[Essenciais são os que, se faltarem, descaracterizam a atenção primária; derivados são os que a tornam mais efetiva e adequada ao contexto da pessoa.|q-unicamp2022-070,q-scmsp2026-083,q-sessp2023-094]] Por isso orientação familiar, orientação comunitária e competência cultural são chamadas de informações ou atributos **derivados**: dependem de conhecer a família, o território e a cultura, o que só acontece quando os essenciais funcionam.`,
          texto: `- Essenciais: **primeiro contato, longitudinalidade, integralidade, coordenação**. {q-unicamp2022-070}
- Derivados: **orientação familiar, orientação comunitária, competência cultural**. {q-scmsp2026-083,q-sessp2023-094}` },
        { id: "atr-acesso", titulo: "Acesso de primeiro contato e acolhimento", conferir: true,
          questoes: ["q-amrigs2023-086","q-uspsp1-106","q-uspsp3-019","q-uspsp5-096","q-sessp2022-084","q-adap22-058","q-simepm89-072","q-usprp2025-022","q-usprp2024-018","q-einstein2026-064","q-scmsp2023-081","q-famema2021-079","q-famema2021-066","q-scmsp2026-090","q-tp20252-116","q-sessp2022-087","q-uspsp2-108","q-simepm89-065"],
          prosa: `O acesso de primeiro contato é a unidade ser a **porta de entrada a cada novo problema**, e não só a primeira vez. [[A barreira costuma ser a organização, não a falta de médico: horário que coincide com o do trabalho do usuário (a dimensão de comodidade do acesso), agenda que só abre vaga para dias depois, consulta marcada que obriga a pessoa a madrugar.|q-amrigs2023-086,q-usprp2025-022,q-uspsp5-096]]

[[O **acesso avançado** reserva parte das consultas para o mesmo dia, de modo que quem procura é atendido sem esperar semanas: amplia o acesso sem sacrificar a longitudinalidade, porque as consultas continuam sendo da própria equipe.|q-uspsp1-106,q-uspsp3-019,q-sessp2022-084]]

O **acolhimento** é a escuta que decide o que fazer com a demanda do dia, e não a triagem que despacha. [[Toda queixa é acolhida; a equipe classifica o risco e define quem é visto agora, quem tem consulta de enfermagem, quem agenda. Dor torácica ou urgência é vista imediatamente, mesmo de quem não mora no território, porque a APS é uma das portas da rede de urgência.|q-scmsp2026-090,q-famema2021-066,q-tp20252-116]]`,
          texto: `- Acesso de primeiro contato: a unidade é a **porta de entrada a cada novo problema**, não só na primeira vez. {q-adap22-058,q-simepm89-072}
- **Horário de funcionamento** que impede o trabalhador de usar o serviço fere o acesso (dimensão **comodidade**). {q-amrigs2023-086,q-usprp2025-022,q-uspsp5-096}
- **Acesso avançado**: reservar percentual de consultas para o mesmo dia amplia o acesso. {q-uspsp1-106,q-uspsp3-019,q-sessp2022-084}
- Atendimento no acolhimento, mesmo sem consulta médica imediata, **respeita** o acesso de primeiro contato. {q-einstein2026-064}
- Dor torácica no acolhimento: **atendimento médico imediato**, também para quem é de outro território. {q-scmsp2026-090,q-famema2021-066}
- Estratificação de risco decide a ordem do atendimento no acolhimento (dor torácica típica primeiro). {q-tp20252-116}
- Acolhimento em roda: o caso leve pode ser acolhido por **consulta de enfermagem** com escuta qualificada e protocolo, sem fila para o médico. {q-famema2021-079,q-sessp2022-087}
- Aplicativo que facilita o contato com a unidade amplia o **primeiro contato**. {q-usprp2024-018}
- Paciente que não consegue marcar o retorno com a médica nem outra consulta na unidade sofre falha de **primeiro contato e longitudinalidade**. {q-scmsp2023-081}
- A demanda espontânea curativa sobrecarrega o serviço em parte pela **cultura sanitária** que entende o cuidado como consumo de consulta. {q-uspsp2-108}
- Acesso (pronto atendimento de uma pessoa estável) e integralidade se somam: a pessoa que passa por especialista e pronto-socorro sem integração perde ambos. {q-simepm89-065}` },
        { id: "atr-longitudinalidade", titulo: "Longitudinalidade", conferir: true, diretrizes: ["pnab-2017"],
          questoes: ["q-adap21-003","q-scmsp2026-084","q-iamspe2025-091","q-uspsp1-099","q-uspsp2-103","q-uspsp3-005","q-fmabc2021-062","q-fmabc2026-098","q-amrigs2025-082","q-tp20261-029","q-sessp2025-084","q-scmsp2022-087","q-unicamp2022-077"],
          prosa: `A longitudinalidade é a **continuidade da relação de cuidado ao longo do tempo**, com responsabilização mútua entre equipe e pessoa, **independentemente do problema** que a trouxe. [[Seu efeito é prático: a equipe conhece a história, a família e as decisões anteriores, evita repetir exames, reconhece mudança de padrão e constrói confiança, e por isso se diferencia do pronto-socorro, que atende o episódio.|q-scmsp2022-087,q-adap21-003,q-uspsp1-099]]

[[Ela não se confunde com coordenação (integrar a rede) nem com integralidade (o conjunto de problemas): a cena é sempre a de **a mesma equipe, por anos, com a mesma pessoa**, seja para diabetes tipo 1 desde a infância, hipertensão ou enfisema.|q-uspsp3-005,q-tp20261-029,q-amrigs2025-082]]`,
          texto: `- Longitudinalidade: **continuidade da relação de cuidado**, com responsabilização entre profissionais e usuários ao longo do tempo (PNAB 2017). {q-scmsp2026-084,q-iamspe2025-091,q-fmabc2021-062}
- Atendimento pela **mesma equipe por anos**, que conhece história e família, é longitudinalidade. {q-adap21-003,q-uspsp1-099,q-uspsp3-005,q-amrigs2025-082,q-tp20261-029}
- A mesma equipe acompanhar a pessoa e coordenar o cuidado após a primeira consulta mostra a longitudinalidade no seguimento. {q-sessp2025-084,q-fmabc2026-098}
- Diferença para o pronto-socorro: **vínculo e longitudinalidade**. {q-scmsp2022-087}
- Consultas frequentes por queixas vagas e exames normais: o que falha é um dos atributos (a equipe não está lendo o conjunto); a resposta é cuidado contínuo com a mesma pessoa. {q-unicamp2022-077}
- Resposta do atributo na prova: "**Longitudinalidade**" quando a cena fala de tempo e vínculo com a mesma equipe. {q-uspsp2-103}` },
        { id: "atr-integralidade-coordenacao", titulo: "Integralidade e coordenação do cuidado", conferir: true,
          questoes: ["q-scmsp2021-086","q-amrigs2022-089","q-usp2026-084","q-famerp2022-002","q-famerp2025-033","q-famerp2023-007","q-famerp2024-005","q-usprp2024-008","q-einstein2024-063","q-tp20222-102","q-famema2021-072"],
          prosa: `A **integralidade** é a capacidade de resolver, na própria APS, a gama de problemas da população (agudos, crônicos, de saúde mental, preventivos), olhando a pessoa inteira e não só a queixa. [[Por isso, na consulta com várias queixas, o princípio da integralidade pede que todas sejam reconhecidas e priorizadas, não que cada uma seja resolvida no mesmo dia.|q-scmsp2021-086]]

A **coordenação do cuidado** é a continuidade entre os pontos da rede: a APS sabe o que aconteceu no pronto-socorro, na internação e no especialista e integra tudo no plano do paciente. [[Mostra-se quando o médico de família recebe o idoso que teve alta do hospital e reorganiza medicamentos e retornos, quando acompanha o resultado do especialista e quando o agente comunitário visita o paciente depois da alta.|q-amrigs2022-089,q-usprp2024-008,q-einstein2024-063]]`,
          texto: `- **Integralidade**: o conjunto de problemas da pessoa é reconhecido e priorizado; a APS resolve a maior parte deles. {q-scmsp2021-086,q-famerp2023-007,q-famerp2024-005}
- **Coordenação do cuidado**: integrar as informações e os pontos da rede (alta hospitalar, especialista, exames). {q-amrigs2022-089,q-usp2026-084,q-famerp2022-002,q-famerp2025-033}
- **Transição do cuidado**: quando o hospital avisa a equipe da alta de um morador, a equipe se prepara para recebê-lo e acompanha-o em casa. {q-usprp2024-008,q-einstein2024-063}
- O cuidado do adolescente com obesidade e problema escolar é coordenado pela equipe da unidade, com projeto terapêutico, e não "empurrado" para um serviço isolado. {q-tp20222-102}
- A reflexão do médico sobre o que significa a doença para a pessoa (tuberculose) é sensibilidade ao contexto do cuidado. {q-famema2021-072}` },
        { id: "atr-derivados", titulo: "Orientação familiar, comunitária e competência cultural", conferir: true,
          questoes: ["q-scmsp2026-083","q-sessp2023-094","q-sirio2024-090","q-sessp2024-085","q-einstein2027-061","q-usprp2021-003","q-usprp2025-039","q-einstein2024-074","q-einstein2025-062","q-einstein2024-065","q-scmsp2026-089","q-tp20231-110"],
          prosa: `A **orientação familiar** reconhece que a família é o contexto de adoecer e de se tratar: quem cuida do marido doente, do pai idoso ou do filho adolescente também adoece, e o plano de cuidado precisa incluir esse contexto. [[A paciente hipertensa com insônia desde que cuida do marido acamado não precisa de mais um anti-hipertensivo, e sim de um plano que envolva a família.|q-scmsp2026-089,q-einstein2024-065]]

A **orientação comunitária** reconhece que a população tem necessidades coletivas, identificadas no território e trabalhadas com a comunidade: acidentes na avenida, trabalhadores migrantes em oficinas de costura, risco de dengue. [[Quando o profissional reconhece o problema coletivo e age sobre ele (conselho local, ação intersetorial), exerce orientação comunitária.|q-usprp2025-039,q-einstein2027-061,q-usprp2021-003]]

A **competência cultural** é reconhecer e respeitar as necessidades específicas de grupos sociais (etnia, raça, gênero, religião, linguagem, situação de rua) e adaptar a comunicação e o cuidado a elas. [[O paciente em situação de rua que descreve o uso de crack em gíria e o curandeirismo com ervas e rezas que o enfermeiro integra ao cuidado são cenas de competência cultural.|q-sessp2024-085,q-sirio2024-090,q-einstein2024-074]]`,
          texto: `- **Orientação familiar**: o plano considera a família e o cuidador sobrecarregado. {q-scmsp2026-089,q-einstein2024-065,q-tp20231-110}
- **Orientação comunitária**: reconhecer problemas coletivos do território (acidentes, migrantes, dengue) e agir com a comunidade. {q-usprp2025-039,q-einstein2027-061,q-usprp2021-003}
- **Competência cultural**: reconhecer necessidades de grupos étnicos, raciais, de gênero e de condição social e adaptar o cuidado. {q-sirio2024-090,q-sessp2024-085,q-einstein2024-074}
- Cuidar de gestante em situação de rua: cadastrar na UBS do território onde dorme, acionar a assistência social e buscar parcerias, sem exigir endereço fixo. {q-einstein2025-062}
- Os atributos **derivados** são orientação familiar, orientação comunitária e competência cultural. {q-scmsp2026-083,q-sessp2023-094}` },
      ],
    },
    {
      id: "equipe-territorio", titulo: "Equipe, eMulti e território",
      introducao: `[[A equipe de Saúde da Família é a unidade de trabalho: um conjunto mínimo de profissionais responsável por uma população adscrita, que cadastra, visita, acompanha e coordena o cuidado.|q-scmsp2022-090,q-scmsp2023-096,q-scmsp2026-082]] [[Ao lado dela, a eMulti (que substituiu o NASF) traz outros saberes por apoio matricial, sem substituir a equipe de referência.|q-usp2026-095,q-uspsp3-010,q-sessp2026-081]]

[[O território é o chão de tudo isso: não é apenas uma área no mapa, mas um espaço vivo, com história, condições de vida, equipamentos e problemas de saúde. Conhecê-lo é a primeira tarefa de uma equipe nova.|q-sirio2026-091,q-unesp2022-095,q-scmsp2021-099]]`,
      fragmentos: [
        { id: "eq-composicao", titulo: "Composição, carga e atribuições", conferir: true, diretrizes: ["pnab-2017"],
          questoes: ["q-scmsp2022-090","q-scmsp2023-096","q-scmsp2026-082","q-unesp2026-084","q-sessp2023-088","q-famema2022-016","q-amrigs2023-082","q-amrigs2023-083","q-amrigs2024-081","q-fmabc2022-098","q-sessp2022-083","q-amrigs2021-091","q-amrigs2025-087","q-unesp2025-096","q-uspsp1-105","q-tp20202-107","q-unicamp2022-071"],
          prosa: `A PNAB de 2017 fixa uma **composição mínima**: médico (preferencialmente de família e comunidade), enfermeiro (preferencialmente especialista em saúde da família), auxiliar ou técnico de enfermagem e agentes comunitários de saúde. [[Cirurgião-dentista e técnico ou auxiliar de saúde bucal formam a equipe de saúde bucal, que se pode agregar; agente de combate às endemias também é agregável; o fisioterapeuta e o terapeuta ocupacional não compõem a equipe, e sim a eMulti.|q-scmsp2023-096,q-unesp2026-084,q-scmsp2022-090]]

A população de referência é de **2.000 a 3.500 pessoas por equipe de Saúde da Família ou de atenção básica**. Cada agente comunitário cobre no máximo **750 pessoas** (a equipe deve ter ACS em número que cubra 100% da população cadastrada, até 12 por equipe). [[A Portaria nº 2.539/2019 criou a equipe de Atenção Primária (eAP), cuja composição mínima é médico e enfermeiro.|q-sessp2023-088]]

As atribuições comuns a todos incluem participar da **territorialização**, do cadastramento, do acolhimento e da estratificação de risco. [[Já o médico tem atribuições específicas: consultas clínicas, pequenos procedimentos, indicar internação mantendo o acompanhamento, e atividades em espaços comunitários; o enfermeiro pode consultar, solicitar exames e prescrever medicamentos conforme protocolos e normas do município; o ACS faz o elo com a comunidade, mobiliza redes de apoio e realiza ações educativas, mas não faz coleta de sangue nem consultas.|q-amrigs2024-081,q-fmabc2022-098,q-sessp2022-083,q-amrigs2021-091,q-amrigs2025-087]]`,
          texto: `- Composição **mínima** da eSF: **médico, enfermeiro, técnico ou auxiliar de enfermagem e ACS**. {q-scmsp2023-096,q-scmsp2022-090,q-unesp2026-084}
- Saúde bucal (dentista e técnico), ACE e outros profissionais podem ser agregados; o NASF/eMulti não é parte da equipe. {q-unesp2026-084,q-scmsp2022-090}
- População recomendada por eSF ou eAB: **2.000 a 3.500 pessoas**. {q-scmsp2026-082}
- ACS: no máximo **750 pessoas por agente**, cobrindo toda a população cadastrada. {q-famema2022-016}
- **eAP** (Portaria 2.539/2019): composição mínima **médico e enfermeiro**. {q-sessp2023-088}
- Atribuição **comum**: participar da territorialização e do mapeamento, identificando grupos, famílias e condições de risco. {q-amrigs2023-083,q-uspsp1-105}
- Atribuição **específica do médico**: consultas, pequenos procedimentos, indicar internação e manter a responsabilização pelo acompanhamento. {q-amrigs2024-081,q-fmabc2022-098}
- O enfermeiro que acolhe, escuta e organiza o cuidado da depressão leve atua dentro de suas competências. {q-amrigs2025-087}
- O ACS mobiliza redes de apoio do plano de cuidado e faz **educação popular**, não consultas nem coletas. {q-amrigs2021-091,q-sessp2022-083}
- A equipe da ESF no controle de tuberculose, hanseníase, hipertensão e saúde da mulher realiza busca ativa, acompanhamento e ações coletivas. {q-unesp2025-096}
- A **visita ao recém-nascido** na primeira semana reduz mortalidade: a equipe a planeja ao receber a notificação da maternidade. {q-unicamp2022-071}
- No cenário de pandemia, o médico da ESF continua o monitoramento dos casos e as ações de promoção e prevenção no território. {q-tp20202-107}` },
        { id: "eq-emulti", titulo: "eMulti e apoio às equipes", conferir: true, diretrizes: ["emulti-2023"],
          questoes: ["q-usp2026-095","q-uspsp3-010","q-unicampdis2022-053","q-unicampdis2025-099","q-sessp2026-081","q-adap22-047","q-adap25-050"],
          prosa: `A eMulti reúne profissionais de áreas diferentes que atuam **de forma complementar e integrada** às equipes da APS: psicólogo, fisioterapeuta, nutricionista, assistente social, farmacêutico e, em algumas modalidades, médicos especialistas. [[Ela é um arranjo substitutivo ao NASF-AB, com financiamento federal próprio, e **não é porta de entrada** nem assume os casos: o vínculo permanece com a equipe de referência.|q-uspsp3-010,q-adap22-047,q-usp2026-095]]

[[Seu modo de trabalhar é o **apoio matricial**, que combina suporte técnico-pedagógico e clínico à equipe de referência, e não referência e contrarreferência (que transferem o caso) nem interconsulta pontual.|q-adap25-050,q-adap22-047,q-sessp2026-081]]`,
          texto: `- **eMulti** substitui o **NASF-AB**, com equipes de profissionais de áreas diferentes atuando de forma complementar e integrada à APS. {q-uspsp3-010,q-unicampdis2022-053,q-unicampdis2025-099}
- Médicos especialistas (cardiologia, dermatologia, endocrinologia, psiquiatria etc.) podem compor a eMulti; o atendimento remoto é permitido. {q-usp2026-095}
- A eMulti **não é porta de entrada** e não assume os casos: dá **suporte técnico-pedagógico e clínico** à equipe de referência. {q-adap22-047,q-adap25-050}
- O apoio matricial das eMulti fortalece a integralidade ao ampliar a capacidade clínica da APS. {q-sessp2026-081}` },
        { id: "terr-territorializacao", titulo: "Território, territorialização e adscrição", conferir: true, diretrizes: ["pnab-2017"],
          questoes: ["q-scmsp2021-099","q-tp20212-107","q-adap21-005","q-unesp2021-087","q-unesp2022-095","q-sessp2023-096","q-sirio2026-091","q-udisc20262-014","q-uspsp3-012","q-scmsp2026-099","q-unesp2025-098","q-usp2025-107","q-amrigs2024-084"],
          prosa: `O território da ESF é um **espaço dinâmico**: além do limite geográfico, tem perfil histórico, demográfico, epidemiológico, social e cultural. [[A territorialização é o processo de conhecê-lo: percorrer as microáreas, registrar moradia, saneamento, equipamentos e famílias, levantar problemas e definir prioridades. A ferramenta típica é a **estimativa rápida participativa**, que ouve a comunidade.|q-scmsp2021-099,q-tp20212-107,q-adap21-005,q-unesp2021-087]]

A **adscrição** é o vínculo da população com a equipe: cada pessoa pertence à equipe do território onde mora. [[A longitudinalidade só se constrói se alguém é responsável por alguém; por isso o acompanhamento de condição crônica é feito na unidade da área de moradia. Mas quem mora fora da cobertura da ESF pode e deve ser atendido na UBS, e a dor aguda ou a urgência é atendida onde a pessoa chegar.|q-usp2025-107,q-uspsp3-012]]

[[O território também **explica o adoecer**: bairro sem comércio de alimentos frescos é um **deserto alimentar**.|q-unesp2025-098]] [[Diante de internações por condições sensíveis à APS, a equipe faz o diagnóstico situacional e **visita o território** para entender os entraves de acesso antes de propor estratégias.|q-scmsp2026-099]]`,
          texto: `- Território: **espaço dinâmico** de corresponsabilidade entre população e serviço, com dimensão geográfica, histórica, demográfica, epidemiológica, social e cultural. {q-sirio2026-091,q-unesp2022-095,q-amrigs2024-084}
- Territorialização: reconhecer o território, levantar os problemas e **definir as prioridades**; instrumento clássico é a **estimativa rápida participativa**. {q-adap21-005,q-unesp2021-087,q-scmsp2021-099}
- Território-**distrito**, **área**, **microárea** e **moradia** são níveis distintos de recorte. {q-sessp2023-096}
- Mapear **equipamentos** (igrejas, ONGs, escolas) é atribuição da equipe de saúde da família. {q-uspsp3-012}
- Nova equipe numa área de risco: percorrer, levantar recursos, barreiras e **cadastrar** = territorialização e adscrição da clientela. {q-tp20212-107}
- **Deserto alimentar**: bairro com pouca oferta de alimentos saudáveis; a causa é do território, não do indivíduo. {q-unesp2025-098}
- ICSAP elevadas no pré-natal e no parto pedem **visitas ao território** para entender entraves de acesso e vulnerabilidades. {q-scmsp2026-099}
- Mudar para modelo ESF é bem aceito quando a territorialização mostra fortalezas e fragilidades da comunidade. {q-udisc20262-014}
- Acompanhamento longitudinal (hipercolesterolemia) cabe à **UBS do território de moradia**. {q-usp2025-107}` },
      ],
    },
    {
      id: "ferramentas-do-cuidado", titulo: "Ferramentas do cuidado na APS",
      introducao: `[[A equipe da ESF trabalha com instrumentos próprios: para conhecer a família (genograma, ecomapa, PRACTICE), para planejar o cuidado de casos complexos (projeto terapêutico singular), para dividir o cuidado com outros saberes (apoio matricial), para chegar ao domicílio (visita), para registrar com lógica de problema (SOAP) e para escutar a pessoa (método clínico centrado na pessoa).|q-usp2025-113,q-iamspe2025-095,q-uspsp5-079]]

[[O que une todos eles é o mesmo mecanismo: o sofrimento e a doença vêm do contexto, e quem não o conhece trata o sintoma e perde o caso.|q-unifesp2025-050,q-tp20241-108]]`,
      fragmentos: [
        { id: "fam-genograma", titulo: "Genograma, ecomapa e avaliação da família", conferir: true,
          casos: ["q-usprp2025-023","q-famema2021-065","q-tp20222-103"],
          figuras: [{ arquivo: "figuras/genograma-ecomapa.svg", legenda: "Esquema autoral: símbolos básicos do genograma (estrutura da família ao longo das gerações) e do ecomapa (relações com a rede de apoio)." }],
          questoes: ["q-adap23-035","q-scmsp2022-089","q-scmsp2025-094","q-famema2021-065","q-iamspe2026-087","q-iamspe2025-092","q-usprp2022-015","q-usprp2025-023","q-tp20222-103","q-amrigs2020-091"],
          prosa: `O **genograma** é o desenho da família em pelo menos **três gerações**, com a estrutura, as doenças, as datas e a qualidade das relações. [[Por convenção, o homem fica à esquerda do casal heterossexual, os filhos se ordenam do mais velho para o mais novo, e é obrigatório indicar quem mora na casa. As relações usam linhas: paralelas (proximidade), em zigue-zague (conflito), tracejada (relação distante), cortada (rompimento).|q-scmsp2025-094,q-usprp2025-023,q-famema2021-065]]

O **ecomapa** mostra a **família e as ligações com o mundo ao redor** (trabalho, escola, igreja, serviços), com círculos e setas. A linha cheia indica vínculo e a tracejada, vínculo frágil. [[Escolhe-se o ecomapa quando o problema é a rede de apoio: o cuidador único, sobrecarregado, que precisa de ajuda; escolhe-se o genograma quando a pergunta é a estrutura e o padrão entre gerações.|q-iamspe2026-087,q-scmsp2022-089,q-adap23-035]]

Para classificar a **família** pelo ciclo de vida e pela composição (nuclear, extensa, composta, funcional), lê-se o caso: uma família sem vínculo biológico que funciona como unidade de cuidado é **funcional**. Os métodos de avaliação familiar organizam a entrevista: o **PRACTICE** cobre problema apresentado, papéis e estrutura, afeto, comunicação, tempo de vida, doença e coping com estresse, ecologia.`,
          texto: `- **Genograma**: estrutura da família em três ou mais gerações, doenças e relações. {q-adap23-035,q-scmsp2025-094,q-famema2021-065}
- Convenção: **homem à esquerda** no casal heterossexual; filhos do mais velho ao mais novo; indicar quem mora junto. {q-scmsp2025-094}
- Linhas do genograma: **paralelas** = proximidade; **zigue-zague** = conflito; combinadas = relação **conflituosa e de proximidade**. {q-usprp2025-023,q-famema2021-065}
- **Ecomapa**: relações da família com o ambiente e a rede de apoio, com círculos e setas. {q-scmsp2022-089,q-iamspe2026-087,q-tp20222-103}
- Cuidador único sobrecarregado: o ecomapa mostra a rede de apoio. {q-iamspe2026-087}
- **PRACTICE**: Problema apresentado, Papéis e estrutura, Afeto, Comunicação, Tempo de vida, Doença, Coping, Ecologia. {q-iamspe2025-092}
- Família **funcional**: pessoas sem vínculo de sangue que cumprem funções de família. {q-usprp2022-015}
- Na entrevista familiar, boa comunicação e respeito às regras da casa abrem o encontro com a família. {q-amrigs2020-091}` },
        { id: "pts-clinica-ampliada", titulo: "Clínica ampliada e projeto terapêutico singular", conferir: true, diretrizes: ["clinica-ampliada"],
          questoes: ["q-unifesp2022-047","q-scmsp2023-083","q-iamspe2025-095","q-tp20212-103","q-tp20241-108","q-tp20261-042","q-unicampdis2022-060","q-unicampdis2024-058","q-didepm-020","q-tp20202-114","q-unifesp2025-050","q-usp2025-113","q-tp20222-102"],
          prosa: `A **clínica ampliada** é a clínica que enxerga a pessoa inteira (a doença, o sujeito e o contexto), trabalha em **equipe multiprofissional** e age com outros setores. [[Quando cada profissional faz o recorte do seu núcleo e a equipe discute o caso complexo, faz clínica ampliada, em oposição ao modelo biomédico.|q-unifesp2025-050,q-tp20241-108,q-tp20261-042]]

O **projeto terapêutico singular (PTS)** é o instrumento dessa clínica: um conjunto de propostas de conduta, **construídas em discussão coletiva** (com o usuário, a família e, se preciso, apoio matricial), para um caso complexo, individual ou coletivo. [[Seus quatro momentos são: **diagnóstico** (as necessidades, vulnerabilidades e potencialidades), **definição de metas**, **divisão de responsabilidades** e **reavaliação**. Ele serve para o idoso acamado, sem cuidador, que não consegue tomar a insulina, e para o adolescente obeso com sofrimento: quem coordena é a equipe da unidade.|q-scmsp2023-083,q-tp20212-103,q-tp20202-114]]

Quando a equipe se reúne para construir o PTS, o ponto de partida são os **diagnósticos, problemas, prioridades ou necessidades do paciente**, e não a especialidade ou a hierarquia. [[O êxito do trabalho em equipe depende da **articulação e interação** entre os membros, e não da simples justaposição de saberes.|q-unicampdis2022-060,q-usp2025-113]]`,
          texto: `- **PTS**: ferramenta que apoia a decisão sobre um caso **individual ou coletivo**, construída pela equipe (e com o usuário). {q-unifesp2022-047,q-scmsp2023-083,q-didepm-020}
- Momentos do PTS: **diagnóstico, definição de metas, divisão de responsabilidades, reavaliação**. {q-scmsp2023-083}
- Componentes (visão da medicina de família): avaliação biopsicossocial, plano individualizado e rede de apoio. {q-iamspe2025-095}
- Após o diagnóstico, os elementos centrais do plano são **metas e responsabilidades**. {q-tp20212-103}
- Idoso acamado sem cuidador e com dificuldade com a insulina: **PTS** com a equipe, não internação em ILPI nem visita mensal. {q-tp20202-114}
- Adolescente obeso com problema comportamental: PTS coordenado **pela equipe da unidade**. {q-tp20222-102}
- Reunião de PTS: o início são os **diagnósticos, problemas e necessidades**; a **fase 3** é a definição de responsabilidades. {q-unicampdis2022-060,q-unicampdis2024-058}
- **Clínica ampliada**: conhecimento da realidade local, equipe multiprofissional e ação intersetorial; o instrumento é o PTS. {q-tp20241-108,q-tp20261-042,q-unifesp2025-050}
- Sucesso do trabalho interprofissional: **articulação e interação** entre os membros. {q-usp2025-113}` },
        { id: "matriciamento", titulo: "Apoio matricial e saúde mental na APS", conferir: true, diretrizes: ["clinica-ampliada"],
          questoes: ["q-unifesp2023-035","q-scmsp2022-099","q-famema2025-089","q-tp20251-112","q-uspsp5-079","q-uspsp3-018","q-tp20252-057","q-adap25-050","q-adap22-047","q-sessp2025-091","q-tp20261-026"],
          prosa: `O **apoio matricial** é o arranjo em que uma equipe especializada dá **suporte técnico-pedagógico** (troca de saberes, capacitação) e **clínico** (discussão de caso, atendimento conjunto) a uma equipe de referência, que **mantém o vínculo** com o paciente. [[A responsabilidade não é transferida, e sim compartilhada; o objetivo é aumentar a resolubilidade da atenção primária, e não elevar a demanda ao especialista.|q-famema2025-089,q-tp20251-112,q-uspsp5-079]]

[[No cuidado em saúde mental, o matriciamento ajuda a equipe a manejar depressão e ansiedade sem encaminhar tudo. O psiquiatra não é "o elo" que atende os casos psiquiátricos: ele apoia a equipe.|q-scmsp2022-099,q-uspsp3-018,q-tp20261-026]] Quando o paciente hipertenso apresenta crise por regime medicamentoso confuso e luto, o apoio matricial com o farmacêutico da equipe multiprofissional, mantendo o seguimento, resolve na própria unidade.`,
          texto: `- **Matriciamento**: construção compartilhada de proposta de intervenção entre duas ou mais equipes; a equipe de referência mantém o vínculo. {q-uspsp5-079,q-adap22-047}
- Objetivo: **capacitar e apoiar** os profissionais da APS para o manejo mais qualificado. {q-tp20251-112,q-famema2025-089}
- Atributo e instrumento do trabalho em equipe: **reflexividade** e **apoio matricial**. {q-unifesp2023-035}
- Na depressão em tratamento com adesão baixa, **solicitar apoio matricial** à equipe multiprofissional, em vez de aumentar a dose ou fazer interconsulta isolada. {q-uspsp3-018,q-adap25-050}
- Hipertenso com crise e luto: matriciar com o **farmacêutico**, otimizar o regime e manter o seguimento na unidade. {q-tp20252-057}
- O psiquiatra no matriciamento **apoia a equipe**; não atende todos os casos psiquiátricos. {q-scmsp2022-099}
- Sofrimento mental leve a moderado com queixas somáticas: **conduzir o caso na própria unidade**, com acompanhamento e apoio psicossocial, sem encaminhar de imediato. {q-tp20261-026,q-sessp2025-091}` },
        { id: "visita-domiciliar", titulo: "Visita e cuidado domiciliar", conferir: true,
          questoes: ["q-amrigs2022-090","q-amrigs2025-083","q-amrigs2021-091","q-tp20231-110","q-sirio2025-086","q-amrigs2020-091"],
          prosa: `A **visita domiciliar** não é exclusiva da unidade básica: qualquer equipe pode usá-la, e [[ela existe como **meio** (com objetivos específicos, como conhecer o domicílio, avaliar a família e acompanhar um caso) ou como **fim** (o cuidado em casa para quem tem limitação temporária ou permanente de mobilidade).|q-amrigs2022-090,q-amrigs2025-083]] Como o domicílio é o lugar onde a pessoa vive, a visita revela o que a consulta não mostra: se o paciente usa o remédio, quem cuida, o que dificulta a adesão.

[[Na visita ao idoso que vive só e vai à consulta apesar da dificuldade, o ponto não é denunciar nem encaminhar à saúde mental, e sim **construir redes de apoio**.|q-tp20231-110]] [[Na paciente com complicação por falta de adesão, a visita serve para **diagnosticar as concepções de saúde** da pessoa, suas preocupações e desinformações, e não para reforçar a obediência estrita.|q-sirio2025-086]]`,
          texto: `- A visita domiciliar **não é exclusiva da UBS**; pode ser meio (objetivos específicos) ou fim (cuidado em casa). {q-amrigs2022-090,q-amrigs2025-083}
- O ACS **identifica e mobiliza redes de apoio** do plano de cuidado pactuado com a família. {q-amrigs2021-091}
- Na entrevista com a família, manter boa comunicação e respeitar as regras do domicílio. {q-amrigs2020-091}
- Idoso que mora só, com dificuldade de locomoção: **construir redes de apoio**. {q-tp20231-110}
- Falta de adesão ao anti-hipertensivo: na visita, **diagnosticar as concepções de saúde** e as desinformações da paciente. {q-sirio2025-086}` },
        { id: "registro-problema", titulo: "Registro orientado por problemas (SOAP) e CIAP", conferir: true,
          questoes: ["q-usp2023-074","q-usp2024-090","q-usp2025-105","q-uspsp2-100","q-uspsp2-105","q-uspsp2-107","q-uspsp5-091","q-uspsp4-084"],
          prosa: `O prontuário orientado por problemas se organiza em **S** (subjetivo: o que a pessoa traz, sentimentos, ideias, expectativas), **O** (objetivo: exame e resultados), **A** (avaliação: o problema ou diagnóstico) e **P** (plano). [[O raciocínio é registrar a razão do contato antes do diagnóstico: o que levou a pessoa a procurar o serviço. Por isso o "motivo de contato" da Classificação Internacional de Atenção Primária é diferente de "queixa principal", "problema de saúde" ou "diagnóstico presuntivo".|q-uspsp2-105]]

[[No **A**, registra-se o problema no **maior grau de resolução** que a informação permite; hipóteses com interrogação ("HAS?", "apendicite?") não entram, porque ainda não são problemas confirmados: entra o sintoma ou o achado.|q-uspsp2-107,q-uspsp4-084]] [[Quando a pessoa traz sofrimento difuso (epigastralgia, palpitações, fadiga com exames normais), o registro mais fiel inclui o **sintoma e o contexto** (sobrecarga, problema financeiro, medo da doença) e o plano começa pela escuta.|q-usp2023-074,q-usp2024-090,q-uspsp5-091]]`,
          texto: `- SOAP: **Subjetivo, Objetivo, Avaliação, Plano**; no S entram sentimentos, ideias e expectativas. {q-uspsp2-100}
- **Motivos de contato** (CIAP) são as razões que levam a pessoa ao serviço, distintas de diagnóstico. {q-uspsp2-105}
- No **A**, usar o problema com o **maior grau de resolução** e **não** registrar hipótese diagnóstica com interrogação. {q-uspsp2-107,q-uspsp4-084}
- Paciente com várias queixas inespecíficas e exames normais: registrar **sintoma + contexto + medo** e começar pela escuta. {q-usp2023-074,q-usp2024-090}
- Dispepsia em jovem com medo de doença: registrar a **dor epigástrica e o medo** no A, e conversar sobre as causas no P. {q-uspsp5-091}
- Adolescente que pede sigilo na primeira consulta: A traz as queixas e riscos reais; P aborda contracepção e oferece PrEP quando indicada. {q-usp2025-105}` },
        { id: "mcp-pessoa", titulo: "Método clínico centrado na pessoa e prevenção quaternária", conferir: true,
          questoes: ["q-einstein2023-068","q-einstein2024-065","q-einstein2024-068","q-einstein2025-073","q-einstein2026-069","q-einstein2025-064","q-unicamp2022-077","q-usp2026-093","q-sessp2025-091","q-uspsp2-108","q-famerp2025-033","q-tp20261-026"],
          prosa: `No **método clínico centrado na pessoa**, a consulta explora **a doença e a experiência da doença**: o que a pessoa sente, o que teme, o que espera e como isso afeta a vida. [[Isso muda a conduta: na dor difusa e fadiga com exames normais, o primeiro passo é investigar como a pessoa vive os sintomas, e só depois decidir sobre medicamento ou encaminhamento; a explicação puramente biomédica ou a escalada de analgésicos não resolve.|q-einstein2025-073,q-einstein2026-069,q-einstein2023-068]]

[[A **prevenção quaternária** protege a pessoa do excesso de intervenção: não pedir exame sem indicação, não medicar o que é hábito alimentar, não rotular, revisar periodicamente doses de benzodiazepínico.|q-usp2026-093,q-einstein2024-068,q-famerp2025-033]] Os **transtornos de somatização** são frequentes, em especial em mulheres de áreas atendidas pela ESF, e justificam um vínculo longitudinal.`,
          texto: `- **Método centrado na pessoa**: explorar sentimentos, ideias, funcionamento e expectativas antes de decidir a conduta. {q-einstein2023-068,q-einstein2025-073,q-einstein2024-065}
- Dor crônica com exames normais: investigar a vivência, os medos e o impacto antes de medicar; reforçar o plano multiprofissional (exercício, psicoterapia, educação em saúde). {q-einstein2025-073,q-einstein2026-069}
- Insônia com ansiedade em quem usa diazepam ocasional: **revisar a necessidade e a dose** do medicamento. {q-einstein2024-068}
- Episódios compulsivos leves sem critérios de transtorno: orientar hábitos **sem exames nem medicamentos** (prevenção quaternária). {q-usp2026-093}
- Paciente que busca o serviço toda semana com queixas vagas: a **fragilidade de atributos** da APS dificulta; a resposta é cuidado contínuo. {q-unicamp2022-077,q-uspsp2-108}
- Somatização: frequente em **mulheres** nas populações atendidas pela APS. {q-einstein2025-064}
- Sofrimento leve a moderado: agendar acompanhamento e iniciar apoio psicossocial na UBS. {q-sessp2025-091,q-tp20261-026}
- Prevenção quaternária ao evitar o excesso em quem tem queixa torácica e emagrecimento: coordenar, não repetir. {q-famerp2025-033}` },
      ],
    },
    {
      id: "promocao-educacao", titulo: "Educação em saúde, promoção e telessaúde",
      introducao: `[[A educação em saúde na APS funciona quando parte da realidade das pessoas e as torna protagonistas: rodas de conversa, troca de experiências e problematização têm efeito maior do que palestra expositiva, cartaz ou folder.|q-tp20232-104,q-tp20241-102,q-tp20252-118]] O mecanismo é pedagógico: o adulto muda comportamento quando reconhece o problema em sua própria vida, e não quando recebe informação pronta.

[[A promoção da saúde é a ação sobre os determinantes: escola, alimentação, território, acesso a preservativo, e não a lista de orientações no consultório.|q-tp20251-104,q-tp20232-112,q-tp20252-046]]`,
      fragmentos: [
        { id: "educacao-saude", titulo: "Educação em saúde e educação permanente", conferir: true,
          questoes: ["q-scmsp2022-081","q-tp20232-104","q-tp20241-102","q-tp20261-002","q-tp20251-104","q-tp20252-118","q-sirio2027-092","q-sessp2025-094","q-tp20232-112","q-tp20252-046","q-unifesp2022-058"],
          prosa: `[[O grupo que melhor concorda com a **educação permanente** é aquele em que as pessoas escolhem os temas, compartilham experiências e o tema nasce da vida delas; o grupo em que a equipe explica e mede pressão, por mais útil que seja, é educação informativa.|q-scmsp2022-081]] A educação **horizontal** (dialógica) valoriza o saber popular, constrói conhecimento de modo compartilhado e promove autonomia.

[[Para uma comunidade com alta prevalência de hipertensão e diabetes, partir da **realidade de vida** das pessoas e do coletivo de troca de experiências é mais efetivo do que palestra na sala de espera ou cartaz. Com adolescentes, as **oficinas culinárias nas escolas** e as rodas de conversa funcionam melhor que palestra com especialista.|q-tp20232-104,q-tp20241-102,q-tp20251-104,q-tp20252-118]]

[[A **redução de danos** é uma política que **orienta práticas e distribui insumos** para reduzir as consequências adversas do uso de drogas, sem exigir abstinência imediata.|q-unifesp2022-058]] Na adolescência, **favorecer o acesso a preservativos e testes de gravidez**, sem exigir autorização, é a forma de a equipe participar da ação com a escola. O atraso de fala associado a infecções respiratórias numa creche mostra que o problema é do território e pede **ação intersetorial** (saúde, educação, assistência social).`,
          texto: `- **Educação permanente**: temas escolhidos pelas usuárias, experiências compartilhadas, tema que nasce da vida do grupo. {q-scmsp2022-081}
- Educação em saúde mais efetiva em comunidade com HAS e DM: **coletivo de troca de experiências, problematização e superação**, partindo da **realidade de vida**. {q-tp20232-104,q-tp20241-102,q-tp20261-002}
- Oficinas culinárias nas escolas previnem obesidade melhor que cartaz ou palestra. {q-tp20251-104}
- Cigarro eletrônico entre estudantes: **rodas de conversa** com diálogo horizontal. {q-tp20252-118,q-sirio2027-092}
- Baixa participação em prevenção de dengue: rodas de conversa que valorizam os saberes populares. {q-sirio2027-092}
- Dificuldade de adesão de crônicos: **grupos de apoio** com troca de experiências. {q-sessp2025-094}
- Educação sexual com a escola: **favorecer acesso** a preservativos e testes de gravidez. {q-tp20232-112}
- Problema que aparece em creche (fala e infecção respiratória): **ações intersetoriais** com educação e assistência social. {q-tp20252-046}
- **Redução de danos**: orientar práticas e distribuir insumos para reduzir danos. {q-unifesp2022-058}` },
        { id: "programas-e-vigilancia-na-aps", titulo: "Ações programáticas, vigilância e alimentação na APS", conferir: true,
          questoes: ["q-unesp2025-096","q-unesp2025-097","q-famema2023-012","q-sirio2025-089","q-famema2021-072","q-tp20202-107"],
          prosa: `A ESF executa as **ações programáticas** (tuberculose, hanseníase, hipertensão e diabetes, saúde da mulher) com busca ativa, diagnóstico clínico, tratamento e acompanhamento. [[A UBS também faz **vigilância em saúde**: para a dengue, monitora e supervisiona o tratamento dos casos leves, sem se limitar à assistência.|q-unesp2025-096,q-sirio2025-089]]

[[O **SISVAN** usa marcadores de consumo alimentar para monitorar o consumo e orientar a conduta dietética individual, e não só para registrar o estado nutricional.|q-unesp2025-097]] Para a mulher de 32 anos com sobrepeso, SOP e hipertensão, o rastreamento de **diabetes** é feito na própria UBS.`,
          texto: `- A ESF faz **busca ativa** de sintomático respiratório e acompanhamento no controle da tuberculose, da hanseníase e da hipertensão. {q-unesp2025-096}
- Dengue: a UBS faz **vigilância em saúde**, monitorando e supervisionando o tratamento dos casos leves. {q-sirio2025-089}
- **Marcadores de consumo alimentar** do SISVAN orientam a conduta dietética na APS. {q-unesp2025-097}
- Mulher com sobrepeso, SOP e hipertensão: **rastrear diabetes na UBS**. {q-famema2023-012}
- Médico da ESF na pandemia: atendimento e monitoramento de suspeitos, mais promoção e prevenção no território. {q-tp20202-107}
- TDO feito pelo médico no consultório, sem agente comunitário, perde o vínculo; a reflexão sobre o que a doença significa para o paciente é parte do cuidado. {q-famema2021-072}` },
        { id: "telessaude", titulo: "Telessaúde e teletriagem", conferir: true, diretrizes: ["telessaude-2022"],
          questoes: ["q-sessp2022-082","q-sessp2023-090","q-sessp2024-089"],
          prosa: `A telessaúde amplia o acesso onde o deslocamento é a barreira: consulta, monitoramento e interconsulta à distância facilitam a **coordenação do cuidado** e podem ser **síncronos** (em tempo real) ou **assíncronos**. [[A Lei nº 14.510/2022 autorizou a telessaúde de forma permanente, revogando a Lei nº 13.989/2020, criada para a pandemia, e assegura ao profissional a autonomia para decidir se o atendimento remoto é adequado.|q-sessp2022-082,q-sessp2023-090]]

[[Entre as modalidades, a **teletriagem** é a avaliação dos sintomas a distância por médico para regular o paciente e direcioná-lo ao tipo de atendimento adequado; **teleconsulta** é a consulta; **teleconsultoria** é a troca entre profissionais; **televigilância** monitora o paciente.|q-sessp2024-089]]`,
          texto: `- A telemedicina **facilita o acesso** e auxilia a coordenação do cuidado, em atendimentos síncronos e assíncronos. {q-sessp2022-082,q-sessp2023-090}
- Lei 14.510/2022: telessaúde permanente, revoga a Lei 13.989/2020; o profissional pode recusar o formato remoto quando inadequado. {q-sessp2023-090}
- **Teletriagem**: avaliação de sintomas à distância para regulação e direcionamento do paciente. {q-sessp2024-089}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-usprp2022-016","q-usp2025-107","q-sessp2022-081","q-simepm89-065","q-unesp2022-091"],
          prosa: `[[Cada atributo protege uma coisa diferente e a prova explora a vizinhança entre eles: o agente comunitário que falta enfraquece o contato com a comunidade (acesso e vínculo), e a banca nomeou o **primeiro contato**; a ausência dele também aparece como falha do componente comunitário, ligada à determinação social e à clínica ampliada.|q-usprp2022-016,q-unesp2022-091]]

A regra de **adscrição** é que o acompanhamento longitudinal se faz na unidade do território de moradia; [[a prova de 2025 considerou correta a orientação da recepção para quem queria acompanhar hipercolesterolemia na UBS da casa da mãe, mesmo com a universalidade do SUS: a pessoa não tem urgência e o vínculo longitudinal está em outra equipe.|q-usp2025-107]]`,
          texto: `- Regra: o ACS é o elo com a comunidade e seu número deve cobrir toda a população cadastrada; a prova (USP-RP 2022) cobrou o **primeiro contato** como atributo prejudicado quando metade dos ACS falta. {q-usprp2022-016}
- Regra: falta de ACS fragiliza o componente comunitário e a determinação social; a prova (UNESP 2022) cobrou a **concepção da determinação social e da clínica ampliada**. {q-unesp2022-091}
- Regra: condição crônica se acompanha na UBS do território de moradia; a prova (USP 2025) deu como **acerto** a recepção que orientou procurar a UBS da região de moradia. {q-usp2025-107}
- Regra: a atenção secundária pode ser continuada, mas só a primária é longitudinal; a prova (SES-SP 2022) cobrou exatamente essa distinção. {q-sessp2022-081}
- Regra: integralidade é conjunto de problemas; a prova (SIMEPM 89) cobrou **integralidade e acessibilidade** no caso da paciente que passou por vários serviços. {q-simepm89-065}` },
      ],
    },
  ],
});
