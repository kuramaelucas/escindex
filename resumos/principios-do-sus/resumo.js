/* resumos/principios-do-sus/resumo.js — resumo adaptativo de princípios e organização do SUS: história e Reforma
   Sanitária, princípios doutrinários (universalidade, equidade, integralidade), diretrizes organizativas
   (descentralização, regionalização, hierarquização, participação), controle social e financiamento.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- principios-do-sus */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "principios-do-sus",
  titulo: "Princípios e organização do SUS",
  assunto: "ass-principiossus",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "cf88", texto: "Constituição da República Federativa do Brasil de 1988, arts. 196 a 200 (saúde) e art. 198 (diretrizes e financiamento)", lidoEm: null },
    { id: "lei-8080", texto: "Lei nº 8.080/1990 (Lei Orgânica da Saúde), com a Lei nº 10.424/2002 (atendimento e internação domiciliares)", lidoEm: null },
    { id: "lei-8142", texto: "Lei nº 8.142/1990 (participação da comunidade e transferências intergovernamentais) e Resolução CNS nº 453/2012 (conselhos de saúde)", lidoEm: null },
    { id: "decreto-7508", texto: "Decreto nº 7.508/2011 (organização do SUS, região de saúde, Rede de Atenção, planejamento e contrato organizativo)", lidoEm: null },
    { id: "lc-141", texto: "Lei Complementar nº 141/2012 (percentuais mínimos de aplicação em saúde: 12% estados e 15% municípios) e Emenda Constitucional nº 95/2016", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição.", questoes: ["q-sessp2024-081"] },
  ],
  doencas: [
    {
      id: "historia", titulo: "História, Reforma Sanitária e a ideia de sistema",
      introducao: `[[Até 1988, a assistência à saúde era um **benefício do trabalhador formal**: o INPS (1966) e depois o INAMPS prestavam assistência médico-hospitalar a quem tinha carteira assinada, e quem não tinha dependia da caridade ou do serviço privado. O SUS nasce para quebrar essa lógica.|q-tp20202-101,q-unesp2026-081,q-usp2025-100]]

[[A **Reforma Sanitária** foi um movimento de profissionais, universidades e movimentos sociais, que consolidou na **8ª Conferência Nacional de Saúde (1986)** a ideia de saúde como direito de todos e dever do Estado; o relatório final subsidiou o **art. 196 da Constituição de 1988**.|q-famema2022-001,q-fmabc2026-099,q-famema2025-076]] A Saúde Coletiva inspirou a reforma: parte da **saúde e da vida** da população e dos determinantes sociais, enquanto a saúde pública clássica partia da doença e da morte.

Veja também: **Estratégia Saúde da Família** (a atenção primária no SUS, PNAB e atributos), **Vigilância em saúde** (competências da União, estados e municípios), **Prevenção** (níveis de prevenção) e **Saúde do trabalhador** (política nacional).`,
      fragmentos: [
        { id: "sus-historia", titulo: "Do INAMPS ao SUS: Reforma Sanitária e marcos legais", conferir: true, diretrizes: ["cf88","lei-8080"],
          questoes: ["q-tp20202-101","q-unesp2026-081","q-usp2025-100","q-famema2022-001","q-famema2025-076","q-fmabc2026-099","q-fmabc2022-084","q-iamspe2025-096","q-iamspe2026-085","q-unesp2022-096","q-unesp2026-082","q-sirio2026-081"],
          prosa: `A saúde passou a ser **direito de todos e dever do Estado**, garantido por **políticas sociais e econômicas** que reduzam o risco de doença, e não apenas por serviços médicos. [[Essa ideia está na Constituição (art. 196) e na Lei Orgânica da Saúde (Lei nº 8.080/1990), que afirma que a saúde tem como **determinantes e condicionantes** a alimentação, a moradia, o saneamento, o meio ambiente, o trabalho, a renda, a educação, o transporte, o lazer e o acesso a bens e serviços essenciais; e que o dever do Estado **não exclui** o das pessoas, da família, das empresas e da sociedade.|q-unesp2022-096,q-unesp2026-082,q-fmabc2022-081,q-famema2022-001]]

[[A **Declaração de Alma-Ata (1978)** definiu a atenção primária como estratégia para "saúde para todos"; a 8ª Conferência (1986), e não Alma-Ata, ocorreu no Brasil e preparou a Constituição.|q-sirio2026-081,q-fmabc2026-099]] No período de 1974 a 1979, a criação do **INAMPS** ampliou a assistência previdenciária; em 1904, a **Revolta da Vacina** no Rio de Janeiro foi a reação à vacinação obrigatória contra a varíola. Os teóricos da Saúde Coletiva (Bourdieu, Schraiber, Paim, Nunes, Almeida Filho) ampliaram a compreensão do processo saúde-doença.`,
          texto: `- Até 1988: assistência ao **trabalhador formal** (INPS 1966, INAMPS): benefício previdenciário. {q-tp20202-101,q-unesp2026-081}
- A criação do SUS responde à crise previdenciária, à mobilização de movimentos sociais e à ampliação do acesso. {q-usp2025-100}
- **8ª Conferência Nacional de Saúde (1986)**: o relatório final subsidiou o **art. 196** da Constituição; não ocorreu em Alma-Ata. {q-fmabc2026-099}
- Os princípios da **Reforma Sanitária** estão presentes na Constituição (saúde como resultado de políticas sociais e econômicas). {q-famema2022-001,q-famema2025-076}
- Os **determinantes e condicionantes** (alimentação, moradia, saneamento, renda, educação...) estão na **Lei nº 8.080/1990**. {q-unesp2022-096}
- O **dever do Estado** de formular políticas econômicas e sociais para reduzir riscos está na Lei Orgânica da Saúde; não exclui o das pessoas e da sociedade. {q-unesp2026-082}
- **Saúde Coletiva**: parte da saúde e da vida; **Saúde Pública** clássica: da doença e da morte. {q-iamspe2026-085}
- **Declaração de Alma-Ata (1978)**: atenção primária para populações vulneráveis. {q-sirio2026-081}
- Revolta da Vacina (1904): reação à vacinação obrigatória contra a varíola. {q-fmabc2022-084}
- Autores associados a abordagens do processo saúde-doença: Bourdieu, Schraiber e Paim. {q-iamspe2025-096}` },
        { id: "sus-modelos-financiamento", titulo: "Modelos de sistema, financiamento e o gasto mínimo", conferir: true, diretrizes: ["lc-141"],
          questoes: ["q-adap23-023","q-unifesp2023-023","q-scmsp2021-081","q-unicamp2023-075","q-unicampdis2024-112"],
          prosa: `[[Os sistemas de saúde seguem duas lógicas. O modelo **bismarckiano (seguro social)** financia por **contribuições prévias de trabalhadores e empregadores**, com benefício proporcional à contribuição; o **beveridgiano (seguridade social)** financia por **impostos gerais** e dá acesso universal. O SUS é **beveridgiano**, de seguridade social, mesmo com a previdência contributiva ao lado.|q-scmsp2021-081,q-unicamp2023-075,q-unicampdis2024-112]]

[[O gasto mínimo em ações e serviços públicos de saúde é vinculado à receita: **15%** da receita de impostos e transferências para os **municípios**, **12%** para os **estados**. Um município que aplica 11% está abaixo do mínimo; no âmbito federal, a **Emenda Constitucional nº 95/2016** congelou o piso da União em termos reais, o que reduz per capita o orçamento ao longo dos anos.|q-adap23-023,q-unifesp2023-023]]`,
          texto: `- **Bismarckiano**: seguro social financiado por contribuição prévia; **beveridgiano**: seguridade social por impostos, acesso universal. {q-scmsp2021-081}
- O sistema brasileiro é do tipo **seguridade social** (beveridgiano). {q-unicamp2023-075,q-unicampdis2024-112}
- Gasto mínimo em saúde: **15%** (municípios) e **12%** (estados) da receita de impostos e transferências; 11% é insuficiente. {q-adap23-023}
- A queda de recursos federais per capita decorre da **Emenda Constitucional nº 95**, que limitou o orçamento da União. {q-unifesp2023-023}` },
      ],
    },
    {
      id: "doutrinarios", titulo: "Princípios doutrinários: universalidade, equidade e integralidade",
      introducao: `[[Os três princípios doutrinários respondem a três perguntas: **quem** tem direito (universalidade: todos), **como se distribui** (equidade: segundo a necessidade) e **o que se oferece** (integralidade: o conjunto de ações da promoção à reabilitação).|q-026,q-scmsp2026-081,q-fmabc2022-083]] Quase toda questão descreve uma cena e pede o princípio; o que decide é qual das três perguntas a cena responde.

[[A prova costuma confundir os três: a recepção que nega atendimento a quem não tem documento fere a universalidade; a fila que prioriza o paciente com câncer sobre o procedimento eletivo é equidade; o paciente com diabetes que é referido ao cardiologista e à reabilitação mostra integralidade.|q-sirio2027-083,q-iamspe2022-076,q-tp20202-102]]`,
      fragmentos: [
        { id: "princ-esquema", titulo: "Os princípios num relance", conferir: true, diretrizes: ["lei-8080"],
          figuras: [{ arquivo: "figuras/principios-sus.svg", legenda: "Esquema autoral: princípios doutrinários e organizativos do SUS, com a pergunta que cada um responde." }],
          questoes: ["q-026","q-scmsp2026-081","q-fmabc2022-083"],
          prosa: `Quem sabe a pergunta de cada princípio resolve a cena: universalidade (quem), equidade (como se distribui) e integralidade (o que se oferece); descentralização (quem decide), regionalização (onde), hierarquização (em que nível) e participação (com quem). O esquema abaixo reúne os oito princípios.`,
          texto: `- Os princípios doutrinários (Lei 8.080) são **universalidade, equidade e integralidade**; hierarquização e descentralização são diretrizes de **organização**. {q-026,q-scmsp2026-081}
- **Integralidade**: o conjunto articulado e contínuo de ações preventivas e curativas, individuais e coletivas. {q-fmabc2022-083}` },
        { id: "princ-universalidade", titulo: "Universalidade: acesso para todos, sem condição", conferir: true, diretrizes: ["lei-8080"],
          questoes: ["q-scmsp2025-086","q-sirio2024-083","q-sirio2027-083","q-tp20241-101","q-sessp2023-082","q-fmabc2021-064","q-unifesp2022-057","q-tp20231-101","q-einstein2025-074","q-amrigs2021-092"],
          prosa: `A **universalidade** garante o acesso a **todas as pessoas**, sem exigir vínculo de emprego, plano de saúde, documento ou residência fixa; [[quem perde o plano de saúde, o desempregado que chega de outro estado, o visitante que passa mal na casa dos netos em outra cidade e a comunidade rural que reivindica uma equipe de Saúde da Família têm direito de acesso ao SUS por esse princípio. A recepção que hesita por falta de vínculo formal viola a universalidade.|q-scmsp2025-086,q-sirio2024-083,q-sirio2027-083,q-sessp2023-082,q-tp20241-101]]

[[O paciente que fez diagnóstico e indicação de quimioterapia no convênio pode receber a quimioterapia no SUS, desde que acompanhado por UBS ou serviço ambulatorial especializado do SUS; a política da população privada de liberdade também aplica a universalidade.|q-unifesp2022-057,q-fmabc2021-064]] A universalidade tem limite prático nos **trabalhadores informais**, que muitas vezes dependem dos serviços públicos por não ter plano, e nos **serviços de acesso aberto** (atendimento a quem, por agravo ou situação laboral, precisa de atenção especial).`,
          texto: `- **Universalidade**: acesso de todos, sem exigir vínculo, plano ou documento. {q-sirio2027-083,q-tp20241-101}
- Perda do plano de saúde: o paciente continua o tratamento no SUS (**universalidade e equidade**). {q-scmsp2025-086,q-sirio2024-083}
- Dor abdominal de visitante em outra cidade: atendimento garantido pela **universalidade**. {q-sessp2023-082}
- Comunidade rural que reivindica uma equipe de Saúde da Família: **universalidade**. {q-tp20241-101}
- Quimioterapia indicada no convênio: direito de recebê-la no SUS, com acompanhamento em UBS ou ambulatório especializado do SUS. {q-unifesp2022-057}
- Política de saúde da população privada de liberdade: **universalidade**. {q-fmabc2021-064}
- Pronto atendimento de quem chega em mal-estar súbito: **universalidade e integralidade** (atendimento e exames). {q-tp20231-101}
- Informais enfrentam dificuldades para acessar serviços privados, o que reforça o papel do SUS. {q-einstein2025-074}
- **Serviços especiais de acesso aberto**: atendem quem, por agravo ou situação laboral, precisa de atenção especial. {q-amrigs2021-092}` },
        { id: "princ-equidade", titulo: "Equidade: tratar desigualmente os desiguais", conferir: true, diretrizes: ["lei-8080"],
          questoes: ["q-scmsp2021-098","q-usprp2021-004","q-usp2023-063","q-unifesp2024-064","q-unifesp2026-070","q-iamspe2022-076","q-udisc20262-039","q-famerp2022-010","q-famema2021-061","q-famerp2023-015","q-einstein2026-068","q-unicampdis2022-057","q-unicampdis2023-059","q-unicampdis2025-045","q-scmsp2023-093","q-tp20232-101","q-tp20261-108","q-uspsp5-093","q-usprp2024-009","q-fmabc2026-083","q-didepm-100","q-unesp2023-087"],
          prosa: `A **equidade** reconhece que pessoas diferentes têm necessidades diferentes e **distribui** recursos e prioridade **conforme a necessidade**, e não de forma igual. [[Por isso priorizar a paciente com neoplasia de mama frente à que quer mamoplastia redutora, o homem com câncer de pênis frente à prótese eletiva e a paciente com nódulo e gânglio axilar numa fila de regulação são exemplos de equidade; destinar mais equipes e agentes aos bairros mais vulneráveis também.|q-udisc20262-039,q-iamspe2022-076,q-unifesp2026-070,q-didepm-100]]

[[A **equidade vertical** trata desigualmente os desiguais; a horizontal trata igualmente os iguais. O entregador de aplicativo que chega pelo SAMU a hospital de ponta, a celebridade que fura a fila do transplante em hospital privado, o idoso em situação de rua que espera por ordem de chegada sem classificação de risco, a população trans que sofre desrespeito ao nome social e o casal imigrante sem documentos que precisa de pré-natal com particularidades são todos cenas de equidade, no sentido da **ausência** dela ou de sua aplicação.|q-usp2023-063,q-unifesp2024-064,q-tp20232-101,q-tp20261-108,q-unicampdis2025-045,q-fmabc2026-083]]

[[A **lei dos cuidados inversos** (Tudor Hart) descreve o paradoxo: **quem mais precisa de cuidado menos o recebe**. Bairros afluentes, com muitos serviços, procuram mais exames preventivos; no Brasil, 3,8% relataram necessidades não atendidas em 2019, apesar do sistema público universal.|q-usprp2024-009,q-uspsp5-093]] A vacinação mundial de 70% da população, com cobertura de 3% nos países pobres, expõe a **inequidade** global; o programa Bolsa Família (condicionalidades de saúde) e o boletim sobre populações vulneráveis aplicam a equidade; as questões da saúde indígena apontam desafios de **equidade**.`,
          texto: `- **Equidade**: atender conforme a **necessidade**; tratar desigualmente os desiguais. {q-didepm-100,q-iamspe2022-076,q-udisc20262-039}
- Prioridade ao câncer sobre procedimento eletivo (mama, pênis): **equidade**. {q-udisc20262-039,q-iamspe2022-076,q-unifesp2026-070}
- Mais equipes e agentes para bairros vulneráveis: **equidade**. {q-didepm-100}
- Celebridade que passa à frente num transplante privado em uma semana: **equidade** (violada). {q-unifesp2024-064}
- Entregador de aplicativo socorrido pelo SAMU e atendido em grande hospital: **equidade**. {q-usp2023-063}
- Idoso em situação de rua sem documentos esperando por ordem de chegada: faltou **classificação de risco**, violando a equidade. {q-tp20232-101,q-tp20261-108}
- População trans com desrespeito ao nome social: **equidade** não respeitada. {q-unicampdis2025-045,q-scmsp2023-093}
- Migrantes sem documentos: **equidade** exige pré-natal adaptado a suas particularidades. {q-fmabc2026-083}
- Beneficiária do Bolsa Família orientada a levar as filhas à USF: **equidade**. {q-usprp2021-004}
- Acamada de 83 anos sem acesso à unidade: a visita domiciliar garante **equidade**. {q-famerp2022-010}
- Saúde indígena e meta vacinal global: **equidade**. {q-famema2021-061,q-famerp2023-015}
- Mulher de 66 anos, assídua, com diabetes e dislipidemia que busca renovar a sinvastatina: o princípio cobrado foi a **equidade**. {q-unicampdis2022-057}
- Complexo médico-industrial e acesso desigual à biotecnologia: **equidade**. {q-unicampdis2023-059}
- Atenção Básica reconhecendo as diferenças nas condições de vida: **equidade**. {q-unesp2023-087}
- Boletim sobre população vulnerável: princípio da **equidade**. {q-einstein2026-068}
- **Lei dos cuidados inversos**: quem mais precisa menos recebe; bairros afluentes com mais exames preventivos. {q-uspsp5-093,q-usprp2024-009}` },
        { id: "princ-integralidade", titulo: "Integralidade: do promover ao reabilitar, em todos os níveis", conferir: true, diretrizes: ["lei-8080"],
          questoes: ["q-026","q-adap26-070","q-scmsp2026-081","q-usp2023-080","q-uspsp3-007","q-tp20202-102","q-tp20222-101","q-tp20251-101","q-amrigs2025-085","q-iamspe2022-066","q-unesp2023-086","q-fmabc2022-083","q-sessp2022-091","q-einstein2027-068","q-amrigs2024-083"],
          prosa: `A **integralidade** é o conjunto **articulado e contínuo** de ações e serviços **preventivos e curativos, individuais e coletivos**, exigidos para cada caso, em todos os níveis de complexidade. [[Inclui promoção, prevenção, tratamento e reabilitação e vê a pessoa como um todo (necessidades físicas e psíquicas). A mesma pessoa com diabetes que recebe vacina, grupo de caminhada, consulta, exames, encaminhamento ao cardiologista e reabilitação é integralidade em ação.|q-026,q-adap26-070,q-fmabc2022-083,q-iamspe2022-066]]

[[A integralidade **se rompe** quando o fluxo é fragmentado: a média complexidade (ambulatório especializado) como gargalo; o paciente com hipertensão resistente que precisa de encaminhamento e não consegue; a ressonância pedida que o serviço não consegue realizar; a paciente que muda de UBS e perde o seguimento; as falhas do encaminhamento no câncer colorretal, desde a atenção básica.|q-uspsp3-007,q-tp20222-101,q-tp20251-101,q-amrigs2025-085,q-usp2023-080]]

[[Como o SUS garante **toda a assistência**, inclusive a de alto custo, é por esse princípio que se explica a maior parte da **judicialização**: o paciente pede na justiça o que o sistema não oferece.|q-sessp2022-091]] A Rede de Atenção à Saúde, no Decreto nº 7.508/2011, é o conjunto de ações e serviços de saúde articulados em níveis de complexidade crescente para garantir a **integralidade**.`,
          texto: `- **Integralidade**: ações de promoção, prevenção, tratamento e reabilitação, com a pessoa como um todo. {q-026,q-scmsp2026-081,q-iamspe2022-066}
- Conjunto articulado e contínuo de ações preventivas e curativas, individuais e coletivas, em todos os níveis. {q-fmabc2022-083,q-amrigs2024-083}
- Hipertenso e diabético com vacina, grupo de caminhada, exames, cardiologia e reabilitação: **integralidade**. {q-adap26-070}
- Diabetes de difícil controle encaminhada ao especialista: **integralidade**. {q-tp20202-102}
- Hipertensão resistente com encaminhamento ao especialista: **integralidade do cuidado**. {q-tp20222-101}
- A média complexidade (ambulatório especializado) como gargalo fere a **integralidade**. {q-uspsp3-007}
- Joelho com suspeita de lesão do LCA e ressonância indisponível: falha de **integralidade**. {q-tp20251-101}
- Câncer colorretal com falhas de encaminhamento desde a atenção básica: **integralidade**. {q-usp2023-080}
- Mudança de UBS que fragmenta o fluxo contínuo e articulado: ferida a **integralidade**. {q-amrigs2025-085}
- Rede de Atenção à Saúde (Decreto 7.508/2011): ações e serviços articulados para garantir a **integralidade**. {q-unesp2023-086}
- **Judicialização** de medicamentos e procedimentos: decorre da **integralidade**. {q-sessp2022-091}
- Pesquisa sobre o Bolsa Família e a desnutrição infantil: efeitos de uma política de proteção social que complementa a **integralidade**. {q-einstein2027-068}` },
      ],
    },
    {
      id: "organizacao", titulo: "Diretrizes organizativas: descentralização, regionalização, hierarquização, regulação e planejamento",
      introducao: `[[Os princípios organizativos respondem à pergunta de **como o sistema se arranja** para cumprir os doutrinários: **descentralização** (quem decide: direção única em cada esfera, com poder para o município), **regionalização** (onde: área geográfica e população definidas), **hierarquização** (em que nível: complexidade crescente) e **participação** (com quem: a comunidade).|q-unesp2023-084,q-adap22-057,q-amrigs2023-081]]

[[A tensão que as questões exploram é entre o município pequeno, que não tem serviço de alta complexidade, e a necessidade de oferecê-lo: a solução é a **região de saúde**, com pactuação entre municípios, e não a oferta de tudo em cada um.|q-adap24-044,q-unicampdis2024-054,q-einstein2027-067]]`,
      fragmentos: [
        { id: "org-rede", titulo: "Regionalização, hierarquização e descentralização", conferir: true, diretrizes: ["lei-8080","decreto-7508"],
          questoes: ["q-adap24-044","q-adap22-057","q-unicampdis2024-054","q-usprp2023-057","q-einstein2027-067","q-amrigs2023-085","q-amrigs2021-100","q-simepm89-068","q-sessp2022-092","q-unesp2023-084","q-amrigs2023-081","q-iamspe2026-090"],
          prosa: `A **regionalização** organiza os serviços **numa região geográfica de população definida**, de modo que um município pequeno encaminhe quem precisa de transplante ou de tratamento do câncer de bexiga a um serviço de referência na região; a **hierarquização** organiza os serviços em **níveis de complexidade crescente**, com **referência e contrarreferência**. [[O impasse entre gestores sobre o fluxo na Rede de Atenção é de **hierarquização**; o paciente encaminhado pela central de regulação a hospital de referência da região, de **regionalização**.|q-usprp2023-057,q-adap24-044,q-unicampdis2024-054,q-adap22-057]]

A **descentralização político-administrativa** repassa competências e decisões para as esferas **mais próximas da população**, com **direção única em cada esfera** de governo; [[é por ela que o município assume responsabilidades, como oferecer por decisão própria o implante subdérmico de etonogestrel incorporado pela Conitec. A **NOAS-SUS 01/2002** amplia as responsabilidades dos municípios na atenção básica e estabelece o processo de regionalização; a descentralização esbarra em dificuldades institucionais e de financiamento.|q-sessp2022-092,q-amrigs2023-085,q-simepm89-068,q-amrigs2021-100]]

[[A **Lei nº 8.080/1990** (art. 7º) lista os princípios, entre eles a **utilização da epidemiologia** para o estabelecimento de prioridades, a alocação de recursos e a orientação programática; a **participação da comunidade** e a **conjugação dos recursos** financeiros, tecnológicos, materiais e humanos dos entes federados.|q-iamspe2026-090,q-unesp2023-084,q-amrigs2023-081]] A região de saúde (Decreto 7.508/2011) é o espaço contínuo de municípios limítrofes: o conceito de que a população brasileira é distribuída por 5.571 municípios de portes muito diferentes fundamenta a **regionalização**.`,
          texto: `- **Regionalização**: serviços organizados em região geográfica com população definida; município sem serviço encaminha à região (transplante, câncer de bexiga). {q-adap24-044,q-unicampdis2024-054,q-einstein2027-067}
- **Hierarquização**: níveis de complexidade crescente com referência e contrarreferência. {q-adap22-057,q-usprp2023-057}
- Descentralização **não** é "níveis de complexidade crescente" (isso é hierarquização). {q-amrigs2023-081}
- **Descentralização político-administrativa** com **direção única** em cada esfera de governo. {q-unesp2023-084}
- Repassar competências a esferas mais próximas da população: descentralização; esbarra em limites institucionais e de financiamento. {q-amrigs2021-100,q-simepm89-068}
- Município que oferece um contraceptivo incorporado pela Conitec por decisão própria: descentralização dos serviços para os municípios. {q-sessp2022-092}
- **NOAS-SUS 01/2002**: amplia a atenção básica dos municípios e estabelece a regionalização. {q-amrigs2023-085}
- Art. 7º da Lei 8.080: epidemiologia para estabelecer prioridades, alocar recursos e orientar programas. {q-iamspe2026-090}` },
        { id: "org-gestao", titulo: "Comissões intergestores, planejamento, regulação e União", conferir: true, diretrizes: ["lei-8080","decreto-7508"],
          questoes: ["q-famema2023-003","q-famema2022-020","q-famema2025-071","q-unifesp2025-049","q-uspsp2-113","q-famema2022-004","q-fmabc2024-090","q-unesp2024-091","q-unesp2025-090","q-fmabc2023-081","q-sirio2026-087","q-fmabc2022-081"],
          prosa: `As **comissões intergestores** (tripartite no âmbito federal, bipartite no estadual, regional na região) são os espaços em que os gestores **pactuam** a organização e o funcionamento das ações e serviços integrados em redes de atenção; [[a pactuação não substitui os conselhos, que deliberam com a participação social.|q-famema2023-003,q-iamspe2023-066]]

[[O **planejamento da saúde** é **ascendente e integrado**, do nível local ao federal, ouvidos os conselhos de saúde, e é **obrigatório** para os entes públicos, **indutor** para a iniciativa privada: compatibiliza as necessidades das políticas de saúde com os recursos nos **planos de saúde**. O **Plano Municipal de Saúde** é o instrumento central, e o **Conselho Municipal de Saúde** o aprova.|q-famema2022-020,q-famema2025-071,q-unifesp2025-049]]

[[A **União** executa ações de vigilância epidemiológica e sanitária de forma **suplementar** em agravos inusitados que possam escapar do controle estadual ou representar risco de disseminação nacional. A **regulação** (política nacional) abrange ações-meio como a avaliação das condições sanitárias dos estabelecimentos e a contratualização.|q-uspsp2-113,q-fmabc2024-090]]

[[A **iniciativa privada participa em caráter complementar**: hospitais, clínicas e profissionais privados são acionados pelo SUS quando os recursos públicos são insuficientes. O **atendimento e a internação domiciliares** só se fazem por indicação médica, com concordância do paciente e da família; o acesso à **assistência farmacêutica** exige medicamento incluído na **RENAME**; o campo de atuação do SUS inclui a colaboração na proteção do meio ambiente, nele compreendido o do trabalho.|q-sirio2026-087,q-unesp2024-091,q-unesp2025-090,q-fmabc2023-081]] A **Política Nacional de Educação Permanente** vê a transformação dos serviços como trabalho articulado entre sistema de saúde e instituições formadoras.`,
          texto: `- **Comissões intergestores** pactuam a organização e o funcionamento das ações e serviços integrados em redes. {q-famema2023-003}
- **Planejamento** ascendente e integrado, obrigatório para entes públicos e indutor para a iniciativa privada; ouve os conselhos. {q-famema2022-020,q-famema2025-071}
- O **Plano Municipal de Saúde** é aprovado pelo **Conselho Municipal de Saúde**. {q-unifesp2025-049}
- A **União** atua de forma suplementar na vigilância em agravos inusitados com risco de disseminação nacional. {q-uspsp2-113}
- **Regulação**: avaliação das condições sanitárias, contratualização, controle. {q-fmabc2024-090}
- **Iniciativa privada**: participa em caráter **complementar**, quando os recursos públicos são insuficientes. {q-sirio2026-087,q-fmabc2022-081}
- **Atendimento domiciliar**: indicação médica e concordância do paciente e da família (Lei 10.424/2002). {q-unesp2024-091}
- **Assistência farmacêutica**: medicamento incluído na **RENAME**. {q-unesp2025-090}
- Campo de atuação do SUS: colaboração na proteção do meio ambiente, nele compreendido o do trabalho. {q-fmabc2023-081}
- **PNEPS**: transformação dos serviços como trabalho articulado entre o sistema e as instituições formadoras. {q-famema2022-004}` },
      ],
    },
    {
      id: "controle-social", titulo: "Participação e controle social: conselhos e conferências",
      introducao: `[[A participação da comunidade é diretriz constitucional e se exerce em duas instâncias previstas na **Lei nº 8.142/1990**: a **conferência de saúde**, que reúne os segmentos a cada quatro anos para avaliar a situação e propor diretrizes, e o **conselho de saúde**, de caráter **permanente e deliberativo**, que atua na formulação de estratégias e no controle da execução da política, inclusive nos aspectos econômicos e financeiros.|q-fmabc2025-084,q-fmabc2026-093,q-udisc20262-015]] A lógica é que o usuário, que sofre as consequências, tenha poder de decisão sobre o que o governo faz.`,
      fragmentos: [
        { id: "cs-conselhos", titulo: "Composição, papel e homologação dos conselhos e conferências", conferir: true, diretrizes: ["lei-8142"],
          questoes: ["q-adap25-049","q-adap21-004","q-usp2022-037","q-amrigs2024-089","q-amrigs2025-084","q-amrigs2020-089","q-iamspe2023-066","q-unesp2023-085","q-unesp2021-090","q-unesp2026-083","q-udisc20262-015","q-uspsp3-008","q-sirio2024-082","q-fmabc2025-084","q-fmabc2021-063","q-fmabc2023-082","q-fmabc2026-093","q-famerp2022-011","q-famerp2024-001","q-sirio2026-086","q-sirio2027-084"],
          prosa: `O conselho de saúde tem **composição paritária**: **50% de usuários** e **50% dos demais segmentos** (25% de trabalhadores da saúde e 25% de gestores e prestadores de serviço). [[A paridade quer dizer que os usuários, sozinhos, valem tanto quanto todos os outros somados, o que evita que os que executam a política dominem a que deveria fiscalizá-los. Representantes dos três outros segmentos e de entidades de usuários (indígenas, portadores de patologias, religiosas) participam; **a Câmara Municipal não faz parte**.|q-adap25-049,q-fmabc2021-063,q-sirio2024-082,q-udisc20262-015]]

[[As **decisões do conselho são homologadas pelo chefe do poder legalmente constituído** em cada esfera (prefeito, governador, presidente), e não pelo secretário de saúde, pelo legislativo ou pelo Ministério Público; o conselho é permanente e **deliberativo**, não apenas consultivo.|q-unesp2023-085,q-unesp2021-090,q-unesp2026-083]] O **Conselho Nacional de Saúde** é instância colegiada, deliberativa e permanente, integrante da estrutura do Ministério da Saúde.

[[Na prática, cada demanda tem seu foro: a falta de quimioterápicos e o acompanhamento da execução orçamentária da saúde municipal vão ao **Conselho Municipal de Saúde**; a interrupção do fornecimento de medicamentos e o transporte para uma UBS distante, ao **Conselho Local**, que leva ao conselho municipal; o conselho local da equipe de saúde da família é exemplo de controle social.|q-sirio2026-086,q-sirio2027-084,q-famerp2024-001,q-adap21-004]]

As **conferências** reúnem usuários, trabalhadores e gestores, **todos com voz e voto**; as instâncias de pactuação (comissões intergestores) e os conselhos são os espaços de gestão compartilhada.`,
          texto: `- **Conselho de saúde**: permanente e **deliberativo**, nas três esferas; composição **50% usuários, 25% trabalhadores, 25% gestores e prestadores**. {q-fmabc2021-063,q-adap25-049,q-famerp2022-011}
- **Paridade**: usuários equivalem aos demais segmentos somados. {q-sirio2024-082,q-amrigs2025-084}
- Decisões **homologadas pelo chefe do poder** legalmente constituído em cada esfera. {q-unesp2023-085,q-unesp2021-090,q-unesp2026-083}
- A **Câmara Municipal** não participa do conselho; entidades indígenas, de portadores de patologias e religiosas participam. {q-udisc20262-015}
- **CNS**: instância colegiada, deliberativa e permanente do SUS. {q-amrigs2024-089}
- **Conferências**: usuários, trabalhadores e gestores com voz e voto. {q-uspsp3-008}
- A **Lei 8.142/1990** trata da participação da comunidade e das transferências intergovernamentais (a 8.080 é a Orgânica). {q-fmabc2025-084}
- Os conselhos de saúde atuam na formulação de estratégias e no controle da execução da política, inclusive aspectos econômicos. {q-fmabc2026-093,q-fmabc2023-082}
- Conselhos com normativo legal: grande avanço da participação nas decisões. {q-amrigs2020-089}
- Instâncias de participação social e gestão compartilhada: conferências, conselhos e comissões intergestores. {q-iamspe2023-066}
- Prestadores privados conveniados podem fazer parte dos conselhos e conferências. {q-usp2022-037}
- Falta de quimioterápicos: **Conselho Municipal de Saúde**; acompanhar o orçamento: **Conselho de Saúde**. {q-sirio2026-086,q-sirio2027-084}
- Transporte para UBS distante: **Conselho Local de Saúde**; reivindicação de medicamentos pela comunidade: **participação social**. {q-famerp2024-001}
- Conselho local de moradores, ACS e profissionais discutindo horário e prioridades: **participação da comunidade**. {q-adap21-004}` },
        { id: "cs-participacao-pratica", titulo: "Participação na prática: escuta, ouvidoria e planejamento local", conferir: true,
          questoes: ["q-famema2023-001","q-tp20222-106","q-famerp2025-047","q-uspsp3-021","q-sessp2022-091"],
          prosa: `[[A participação não é apenas um órgão: é um **modo de trabalhar**. Uma página virtual de reclamações criada pela gerente sem diálogo cria descontentamento; ela poderia ser válida se fosse **fruto de diálogo** que valorize usuários, trabalhadores e gestores.|q-famema2023-001]] [[Diante da falta de um medicamento de uso contínuo, o caminho é **envolver o Conselho Local de Saúde**, pelo princípio da participação social, e não procurar o deputado federal ou o ministro.|q-tp20222-106]]

[[O cuidado domiciliar de idosa acamada se organiza com visita do ACS, reunião diária da equipe e visita da enfermeira e do médico: a equipe responde ao que o território traz; a descoberta de que pacientes com diabetes não conseguem seguir a dieta por causa do preço dos alimentos é **orientação para a comunidade**, e não para a pessoa.|q-famerp2025-047,q-uspsp3-021]]`,
          texto: `- Ouvidoria só funciona se for **fruto de diálogo** com usuários, trabalhadores e gestores. {q-famema2023-001}
- Falta de medicamento de uso contínuo: levar ao **Conselho Local de Saúde** (participação social). {q-tp20222-106}
- Idosa acamada: visita do ACS, reunião diária da equipe, visita de enfermagem e médica. {q-famerp2025-047}
- Dificuldade comum a muitos pacientes por causa do território: **orientação para a comunidade**. {q-uspsp3-021}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-usp2022-037","q-sessp2022-092","q-scmsp2023-093","q-tp20231-101"],
          prosa: `[[Os conselhos de saúde reservam metade das vagas aos usuários e o restante aos demais segmentos; a prova de 2022 da USP deu como correta a participação de prestadores privados conveniados, que integram o segmento de prestadores.|q-usp2022-037]] [[A oferta de um método incorporado pela Conitec por decisão do município é **descentralização** (SES-SP 2022).|q-sessp2022-092]] [[Em cenas com mais de um princípio (população trans que exige reunião com a coordenação; paciente com mal-estar súbito atendido e investigado), as bancas cobram pares, como participação popular e competência cultural, ou universalidade e integralidade.|q-scmsp2023-093,q-tp20231-101]]`,
          texto: `- Regra: o segmento de prestadores tem lugar nos conselhos; a prova (USP 2022) cobrou que prestadores conveniados podem participar. {q-usp2022-037}
- Regra: descentralização repassa competências aos municípios; a prova (SES-SP 2022) cobrou **descentralização** no implante ofertado pelo município. {q-sessp2022-092}
- Regra: um princípio por cena; a prova (SCMSP 2023) cobrou **participação popular e competência cultural** e a (TP 2023) **universalidade e integralidade**. {q-scmsp2023-093,q-tp20231-101}` },
      ],
    },
  ],
});
