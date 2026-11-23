/* resumos/niveis-atencao/resumo.js — resumo adaptativo de níveis de atenção e redes (ass-niveisatencao):
   níveis e densidade tecnológica, atributos da APS (Starfield), Redes de Atenção à Saúde e linhas de cuidado,
   regiões de saúde e Decreto 7.508, referência, contrarreferência e matriciamento, urgência (RUE, classificação
   de risco, UPA), atenção domiciliar, ICSAP, armadilhas e tabela dos atributos.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- niveis-atencao */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "niveis-atencao",
  titulo: "Níveis de atenção e Redes de Atenção à Saúde",
  assunto: "ass-niveisatencao",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "decreto-7508", texto: "Decreto 7.508/2011 (regulamenta a Lei 8.080/1990: regiões de saúde, portas de entrada, COAP, CIR)", lidoEm: null },
    { id: "portaria-4279", texto: "Ministério da Saúde — Portaria 4.279/2010 (diretrizes da Rede de Atenção à Saúde) e Mendes, As redes de atenção à saúde (OPAS, 2011)", lidoEm: null },
    { id: "pnab", texto: "Ministério da Saúde — Política Nacional de Atenção Básica (Portaria 2.436/2017)", lidoEm: null },
    { id: "rue", texto: "Ministério da Saúde — Portaria 1.600/2011 (Rede de Atenção às Urgências) e Política Nacional de Humanização (acolhimento com classificação de risco)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-sirio2025-087"] },
  ],
  doencas: [
    {
      id: "aps", titulo: "Atenção primária e níveis de atenção",
      introducao: `[[Os níveis se distinguem pela densidade tecnológica, não pela importância. A atenção primária usa pouca tecnologia dura (equipamentos) e muita tecnologia leve (vínculo, escuta, acolhimento) e resolve, perto de casa, a maior parte das necessidades; a secundária reúne especialistas e equipamentos para necessidades específicas; a terciária, hospitais de alta complexidade. Atenção primária não é atendimento simplificado para pobres nem triagem: é o cuidado de primeiro contato, contínuo, integral e coordenador.|q-usprp2022-009,q-fmabc2023-093,q-famema2022-003,q-amrigs2020-083,q-amrigs2021-081]] [[A ideia nasceu no Relatório Dawson (1920, Inglaterra) e virou base do NHS; Barbara Starfield mostrou que sistemas orientados pela atenção primária têm menos mortes e menor custo.|q-fmabc2025-082,q-sessp2022-085]]

Veja também: **Princípios do SUS** (Lei 8.080, regionalização, controle social), **Estratégia Saúde da Família** (equipes, NASF, ACS), **Saúde de populações específicas** (competência cultural) e **Vigilância em saúde**.`,
      fragmentos: [
        { id: "aps-atributos", titulo: "Os atributos de Starfield", conferir: true, diretrizes: ["pnab"],
          figuras: [{ arquivo: "figuras/atributos.svg", legenda: "Esquema autoral: atributos essenciais e derivados da atenção primária, com um exemplo de cada." }],
          questoes: ["q-adap26-077","q-tp20212-111","q-tp20251-110","q-amrigs2020-083","q-amrigs2021-081","q-famema2022-003","q-sessp2022-085","q-fmabc2025-082","q-uspsp1-112","q-unesp2022-089","q-usprp2022-009","q-fmabc2023-093","q-fmabc2021-061","q-tp20252-029"],
          prosa: `[[Os essenciais são quatro: acesso de primeiro contato (porta de entrada preferencial), longitudinalidade (a mesma equipe acompanha a pessoa ao longo da vida, como a jovem atendida desde bebê), integralidade (resolver ou providenciar tudo de que a pessoa precisa, sem distinção de doença ou órgão) e coordenação do cuidado (integrar o que os vários serviços fazem: agendar o especialista, receber o relatório, ajustar o plano). Os derivados são a orientação familiar, a orientação comunitária e a competência cultural.|q-adap26-077,q-tp20212-111,q-tp20251-110,q-amrigs2020-083,q-amrigs2021-081,q-uspsp1-112]] [[Fortalecer a atenção primária é conhecer o território adscrito, organizar o acesso e resolver; ela é porta de entrada preferencial, não única. O nível de atenção é o do serviço, não da doença: o homem com AVC levado à UBS está sendo atendido na atenção primária. Ferramentas digitais de apoio à decisão ajudam, mas perdem efetividade se não refletem o contexto local.|q-unesp2022-089,q-fmabc2021-061,q-tp20252-029,q-famema2022-003]]`,
          texto: `- Agendar, acompanhar exames e integrar o relatório: **coordenação do cuidado**. {q-adap26-077,q-tp20212-111}
- Atendida desde o primeiro ano de vida: **longitudinalidade**. {q-tp20251-110}
- Não é APS: **atendimento focal**. {q-amrigs2020-083}
- APS: **sem distinção de gênero, doença ou órgão**. {q-amrigs2021-081}
- Concebida para **resolver perto de casa a maioria das necessidades**. {q-famema2022-003}
- Starfield: **menos morbimortalidade e custo**. {q-sessp2022-085}
- Origem: **Relatório Dawson, 1920**. {q-fmabc2025-082}
- Mais resolutiva: **ordenada pelos atributos**. {q-uspsp1-112}
- Fortalecer: **conhecer o território e organizar o acesso**. {q-unesp2022-089}
- APS: **baixa densidade tecnológica, muita tecnologia leve**. {q-usprp2022-009}
- Secundário: **especialistas e equipamentos para necessidades específicas**. {q-fmabc2023-093}
- AVC atendido na UBS: **atenção primária**. {q-fmabc2021-061}
- Suporte digital: **perde efetividade fora do contexto local**. {q-tp20252-029}` },
        { id: "aps-icsap", titulo: "Internações sensíveis e cuidado centrado na doença", conferir: true,
          questoes: ["q-unesp2024-095","q-unicamp2023-076","q-tp20202-104","q-tp20202-103"],
          prosa: `[[Internações por condições sensíveis à atenção primária (pneumonia, asma, diabetes, hipertensão descompensada, gastroenterite) medem a resolubilidade e a qualidade da atenção primária: o acesso a diagnóstico e remédios nela as reduz. Serviço organizado só para o curativo aumenta a demanda por consultas médicas e não diminui as internações evitáveis. Criança que só vai ao pronto atendimento em crise de asma precisa ser acompanhada na UBS, onde se faz o cuidado longitudinal.|q-unesp2024-095,q-unicamp2023-076,q-tp20202-104,q-tp20202-103]]`,
          texto: `- ICSAP: **acesso a remédios e diagnóstico na APS as reduz**. {q-unesp2024-095}
- O indicador avalia: **resolubilidade e qualidade da APS**. {q-unicamp2023-076}
- Só curativo: **mais demanda por consultas médicas**. {q-tp20202-104}
- Asma só no pronto atendimento: **acompanhamento na UBS**. {q-tp20202-103}` },
      ],
    },
    {
      id: "redes", titulo: "Redes de Atenção à Saúde e regiões",
      introducao: `[[Sistemas organizados em pirâmide, fragmentados e voltados para eventos agudos não dão conta da tripla carga de doenças (crônicas, causas externas e infecciosas). A Rede de Atenção à Saúde (Portaria 4.279/2010) é um arranjo de serviços de diferentes densidades tecnológicas, integrados por sistemas de apoio técnico, logístico e de gestão, para garantir a integralidade; a atenção primária é o centro de comunicação, coordena o cuidado e ordena a rede.|q-tp20202-110,q-famerp2023-016,q-tp20231-102,q-tp20232-102,q-scmsp2022-091]]`,
      fragmentos: [
        { id: "red-conceito", titulo: "Conceito, elementos e linhas de cuidado", conferir: true, diretrizes: ["portaria-4279"],
          casos: ["q-sessp2024-086"],
          questoes: ["q-tp20202-110","q-famerp2023-016","q-tp20231-102","q-tp20232-102","q-scmsp2022-091","q-usprp2023-056","q-unesp2026-094","q-einstein2025-075","q-uspsp1-109","q-sessp2024-086"],
          prosa: `[[Os elementos da rede são a população (gestão de base populacional), a estrutura operacional (atenção primária, pontos secundários e terciários, sistemas de apoio, logísticos e de governança) e o modelo de atenção. Falta de agentes comunitários para cadastrar a população é problema de gestão de base populacional; fila de exames, de sistemas de apoio.|q-usprp2023-056,q-scmsp2022-091]] [[Linhas de cuidado são os fluxos e protocolos que guiam o percurso do usuário dentro da rede para uma condição (diabetes, por exemplo), coordenados pela atenção primária. A rede das doenças crônicas prioriza hipertensão, diabetes, obesidade, saúde mental e reabilitação; a rede psicossocial tem o CAPS como ponto estratégico.|q-unesp2026-094,q-einstein2025-075,q-uspsp1-109,q-sessp2024-086]]`,
          texto: `- Doenças crônicas com sistema para agudos: **tripla carga; RAS**. {q-tp20202-110}
- RAS: **arranjos de diferentes densidades tecnológicas integrados**. {q-famerp2023-016}
- Finalidade: **integralidade**. {q-tp20231-102}
- Base: **APS, coordenadora e ordenadora**. {q-tp20232-102}
- Conjunto **com funções e perfis diferentes, articulado no território**. {q-scmsp2022-091}
- ACS e fila de exames: **gestão de base populacional e sistemas de apoio**. {q-usprp2023-056}
- RAS e linhas de cuidado: **arranjos × percurso do usuário**. {q-unesp2026-094}
- Diabético no pronto-socorro: **linha de cuidado coordenada**. {q-einstein2025-075}
- Rede de crônicas: **hipertensão, diabetes, saúde mental, reabilitação, obesidade**. {q-uspsp1-109}
- Imagem: **rede de atenção psicossocial**. {q-sessp2024-086}` },
        { id: "red-regiao", titulo: "Região de saúde e Decreto 7.508", conferir: true, diretrizes: ["decreto-7508"],
          questoes: ["q-adap25-051","q-unifesp2023-024","q-unifesp2025-051","q-uspsp1-114","q-adap23-024","q-unifesp2026-077","q-unesp2025-089","q-fmabc2023-090","q-iamspe2021-077"],
          prosa: `[[A região de saúde é um agrupamento de municípios vizinhos que, para ser instituída, precisa ter no mínimo atenção primária, urgência e emergência, atenção psicossocial, atenção ambulatorial especializada e hospitalar e vigilância em saúde. Os gestores municipais e estaduais pactuam na Comissão Intergestores Regional (CIR) quem oferece o quê e os fluxos de referência; o planejamento regional integrado parte das necessidades de saúde da população. Pelo decreto, o acesso é ordenado pela atenção primária.|q-adap25-051,q-unifesp2023-024,q-unifesp2025-051,q-uspsp1-114,q-adap23-024,q-unifesp2026-077,q-unesp2025-089]] [[Quem faz hemodiálise no município vizinho por convênio entre eles vive a regionalização. A formação de recursos humanos para a atenção básica é atribuição da esfera federal.|q-fmabc2023-090,q-iamspe2021-077]]`,
          texto: `- Mínimo da região: **APS, urgência, psicossocial, especializada ambulatorial e hospitalar, vigilância**. {q-adap25-051,q-uspsp1-114}
- Exigido (entre as opções): **urgência e emergência**. {q-unifesp2023-024}
- Exigido (entre as opções): **UBS**. {q-unifesp2025-051}
- Pactuação regional: **CIR**. {q-adap23-024}
- PRI: **necessidades de saúde da população**. {q-unifesp2026-077}
- Acesso ordenado: **pela APS**. {q-unesp2025-089}
- Hemodiálise no município vizinho: **regionalização**. {q-fmabc2023-090}
- Formação de RH na atenção básica: **federal**. {q-iamspe2021-077}` },
      ],
    },
    {
      id: "fluxos", titulo: "Referência, contrarreferência e urgência",
      introducao: `[[Encaminhar não é passar o paciente adiante: a atenção primária continua responsável, o especialista orienta, e a informação precisa ir e voltar (referência e contrarreferência). Quando o paciente encaminhado não volta e fica preso no especialista sem necessidade, fala-se em efeito velcro.|q-usprp2025-021,q-scmsp2026-096,q-sirio2027-094]]`,
      fragmentos: [
        { id: "flu-referencia", titulo: "Compartilhar o cuidado com o especialista", conferir: true, diretrizes: ["pnab"],
          questoes: ["q-usprp2025-021","q-scmsp2026-096","q-sirio2027-094","q-sirio2027-096","q-scmsp2022-098","q-unicamp2023-078","q-unicamp2022-075","q-tp20252-103"],
          prosa: `[[A paciente com doença renal encaminhada ao nefrologista continua coordenada pela UBS, com apoio da especialidade; a do reumatologista volta à UBS, que assume o monitoramento pedido; a puérpera que passou pela maternidade é acompanhada pela atenção primária. O matriciamento é o especialista apoiando a equipe (discussão de casos, consulta conjunta), com o cuidado sob coordenação da atenção primária.|q-scmsp2026-096,q-sirio2027-094,q-sirio2027-096,q-scmsp2022-098]] [[Na alta hospitalar, o que mais evita reinternação é falar diretamente com o médico da atenção primária. O pronto atendimento que recebe muitos crônicos descontrolados cria um fluxo de informação com as UBS. Paciente acamado que precisa de visitas frequentes da equipe é atenção domiciliar tipo 2 (AD2); o tipo 1 fica com a equipe da UBS e o tipo 3 exige equipamento.|q-unicamp2023-078,q-unicamp2022-075,q-tp20252-103]]`,
          texto: `- Encaminhado que não volta: **efeito velcro**. {q-usprp2025-021}
- Doença renal 3b: **coordenada pela APS com apoio da especialidade**. {q-scmsp2026-096}
- Relatório do reumatologista: **assumir o acompanhamento longitudinal**. {q-sirio2027-094}
- Puérpera após pré-eclâmpsia: **APS coordena**. {q-sirio2027-096}
- Matriciamento: **cuidado colaborativo coordenado pela APS**. {q-scmsp2022-098}
- Alta de idoso com IC: **comunicação direta com a APS**. {q-unicamp2023-078}
- Crônicos no pronto atendimento: **fluxo de informações com as UBS**. {q-unicamp2022-075}
- Idosa acamada com Parkinson: **AD2**. {q-tp20252-103}` },
        { id: "flu-urgencia", titulo: "Rede de urgência e classificação de risco", conferir: true, diretrizes: ["rue"],
          casos: ["q-usp2024-087"],
          questoes: ["q-usp2024-087","q-famema2025-079","q-famerp2023-014","q-uspsp5-078","q-didepm-040","q-usp2022-031","q-einstein2023-069"],
          prosa: `[[A Rede de Atenção às Urgências prioriza as linhas de cuidado cardiovascular, cerebrovascular e do trauma; o SAMU 192 é o componente pré-hospitalar móvel e a UPA 24 horas, o fixo. Na UPA, o setor estratégico é o acolhimento com classificação de risco, que ordena o atendimento pela necessidade (gravidade), não pela hora de chegada, e não serve para mandar gente embora.|q-uspsp5-078,q-didepm-040,q-usp2024-087,q-famema2025-079,q-famerp2023-014]] [[O que a urgência estabiliza volta para a atenção primária (a abstinência alcoólica que melhorou é encaminhada à equipe de Saúde da Família). Crise de agitação com risco na UBS pede SAMU para o pronto-socorro.|q-usp2022-031,q-einstein2023-069]]`,
          texto: `- Setor estratégico da UPA: **acolhimento com classificação de risco**. {q-usp2024-087}
- Critério da classificação: **necessidade do usuário**. {q-famema2025-079}
- Classificação de risco: **intervenção potencialmente decisiva** na organização. {q-famerp2023-014}
- Linhas da RUE: **cardiovascular, cerebrovascular e trauma**. {q-uspsp5-078}
- Pré-hospitalar: **SAMU móvel, UPA fixo**. {q-didepm-040}
- Abstinência que melhorou: **encaminhar à ESF**. {q-usp2022-031}
- Agitação intensa na UBS: **SAMU ao pronto-socorro**. {q-einstein2023-069}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["decreto-7508"],
          questoes: ["q-unifesp2023-024","q-unifesp2025-051","q-fmabc2021-061","q-famema2022-003"],
          prosa: `[[**Conteúdo mínimo da região**: o decreto exige cinco conjuntos de serviços; as provas perguntaram um de cada vez (urgência na unifesp2023-024, unidade básica na unifesp2025-051) e o resto das alternativas trazia serviços de alta complexidade, que não são exigência.|q-unifesp2023-024,q-unifesp2025-051]] [[**Nível de atenção**: depende de onde a pessoa é atendida, não da gravidade; o AVC na UBS é atenção primária (fmabc2021-061).|q-fmabc2021-061]] [[**Porta de entrada**: preferencial, não única; o SUS também tem portas de urgência, psicossocial e especiais (famema2022-003).|q-famema2022-003]]`,
          texto: `- Região: **cinco conjuntos**; as provas pediram um. {q-unifesp2023-024,q-unifesp2025-051}
- Nível = **onde se atende**. {q-fmabc2021-061}
- APS: porta **preferencial**, não única. {q-famema2022-003}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: os atributos da atenção primária",
      introducao: `Resumo do capítulo de atenção primária.`,
      fragmentos: [
        { id: "cmp-atributos", titulo: "Atributo e como aparece no caso", conferir: true,
          questoes: ["q-tp20251-110","q-adap26-077","q-amrigs2021-081","q-uspsp1-112"],
          prosa: `[[A prova descreve a cena e pede o atributo.|q-tp20251-110,q-adap26-077,q-amrigs2021-081,q-uspsp1-112]]

| Atributo | O que é | Cena típica |
| Acesso de primeiro contato | porta de entrada preferencial | o paciente procura a UBS antes de tudo |
| Longitudinalidade | vínculo da mesma equipe ao longo do tempo | atendida desde bebê, agora no pré-natal |
| Integralidade | resolver ou providenciar todas as necessidades | promoção, prevenção, cura e reabilitação |
| Coordenação do cuidado | integrar os vários pontos da rede | agenda o especialista e incorpora o relatório |
| Orientação familiar e comunitária | contexto da família e do território | genograma, diagnóstico do bairro |
| Competência cultural | respeitar crenças e saberes | chás e plantas da comunidade |`,
          texto: `- Desde bebê: **longitudinalidade**. {q-tp20251-110}
- Integrar a rede: **coordenação**. {q-adap26-077}
- Sem distinção de doença: **integralidade**. {q-amrigs2021-081}
- Resolutividade vem dos **atributos**. {q-uspsp1-112}` },
      ],
    },
  ],
});
