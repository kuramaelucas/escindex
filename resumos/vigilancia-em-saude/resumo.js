/* resumos/vigilancia-em-saude/resumo.js — resumo adaptativo de vigilância em saúde: conceito e política, vigilância
   ambiental e saúde única, notificação compulsória e sistemas de informação, investigação de surto, conceitos de
   epidemia, vigilância de doenças específicas (dengue, sarampo, raiva, imunopreveníveis) e declaração de óbito.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- vigilancia-em-saude */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "vigilancia-em-saude",
  titulo: "Vigilância em saúde, notificação e declaração de óbito",
  assunto: "ass-vigilancia",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "notificacao", texto: "Ministério da Saúde — Lista Nacional de Notificação Compulsória (Portaria de Consolidação nº 4/2017, Anexo V, atualizada pela portaria de 2025, que incluiu a esporotricose)", lidoEm: null },
    { id: "pnvs", texto: "Conselho Nacional de Saúde — Política Nacional de Vigilância em Saúde, Resolução nº 588/2018", lidoEm: null },
    { id: "guia-vigilancia", texto: "Ministério da Saúde — Guia de Vigilância em Saúde (6ª ed. 2023 e atualizações): investigação de surto, sarampo, dengue, coqueluche, paralisia flácida aguda e varicela", lidoEm: null },
    { id: "raiva-2022", texto: "Ministério da Saúde — Protocolo de profilaxia da raiva humana (esquema de quatro doses, 0, 3, 7 e 14, desde 2022)", lidoEm: null },
    { id: "do-manual", texto: "Ministério da Saúde — Manual de instruções para o preenchimento da Declaração de Óbito e Resolução CFM nº 1.779/2005", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição.", questoes: ["q-sirio2025-081"] },
  ],
  doencas: [
    {
      id: "conceitos", titulo: "Vigilância em saúde: conceito, componentes e áreas",
      introducao: `[[Vigilância é o processo contínuo e sistemático de coletar, consolidar, analisar e divulgar dados sobre eventos de saúde para decidir e agir: conhecer, detectar ou prever mudanças nos determinantes e condicionantes da saúde individual e coletiva, para recomendar medidas de prevenção e controle.|q-unesp2024-096,q-unesp2025-091,q-fmabc2023-088]] O que a separa de um simples registro é a **ação**: o dado só vale se virar resposta.

[[A **vigilância em saúde** é o guarda-chuva (política nacional de 2018) que reúne a vigilância epidemiológica, a **ambiental**, a **sanitária** e a **saúde do trabalhador**; a regulamentação e a coordenação do sistema de vigilância epidemiológica cabem diretamente ao Ministério da Saúde.|q-fmabc2023-088,q-iamspe2021-066,q-adap24-047]] Na atenção básica, ela é **territorializada**: usa dados clínicos, sociais e ambientais do território para organizar ações contínuas, e não só para notificar.

Veja também: **Medidas epidemiológicas** (incidência, letalidade, curva de óbitos), **Princípios do SUS** (competências de cada ente), **Saúde do trabalhador** (agravos notificáveis do trabalho), **Imunização** e **Desenhos de estudo** (investigação de surto).`,
      fragmentos: [
        { id: "vig-conceito", titulo: "Conceito, tipos de vigilância e Política Nacional", conferir: true, diretrizes: ["pnvs"],
          questoes: ["q-unesp2024-096","q-unesp2025-091","q-iamspe2021-066","q-fmabc2023-088","q-fmabc2023-089","q-unesp2024-082","q-simepm89-075","q-adap24-047","q-fmabc2021-077","q-sirio2024-098","q-sirio2025-094","q-sessp2025-100","q-fmabc2023-085"],
          prosa: `A **vigilância epidemiológica** responde "quem, onde e quando": [[a epidemiologia descritiva organiza qualquer agravo por **tempo** (incubação, variações sazonais e climáticas), **lugar** (espaço geográfico, bairro, território) e **pessoa** (idade, sexo, raça/cor), e é o primeiro passo diante de um problema.|q-fmabc2023-085,q-fmabc2021-077,q-adap24-047]] A caracterização por tempo, lugar e pessoa é epidemiologia descritiva; comparar bairros com e sem exposição já é analítica.

[[A vigilância pode ser **passiva** (o serviço espera a notificação obrigatória e periódica dos casos) ou **ativa** (procura intencionalmente os casos, como a busca em um surto).|q-unesp2024-082,q-adap24-047]] A **Política Nacional de Vigilância em Saúde** (Resolução CNS nº 588/2018) tem como princípio o **direito do cidadão à informação** gerada pela vigilância, respeitada a confidencialidade; é uma política transversal a todos os níveis.

[[Diante de viroses emergentes e reemergentes, a resposta global começa pela **vigilância**: sistemas que detectem e investiguem novos patógenos, e só depois laboratório, tratamento e desenvolvimento de vacinas. Na prática local, o que muda a ação é o dado do território: nível de poluição, não só a taxa de doença respiratória, é o indicador que explica o que a equipe vê.|q-sirio2025-094,q-sessp2025-100,q-simepm89-075]]`,
          texto: `- **Vigilância**: coleta, análise e disseminação contínuas de dados para **orientar ação**; detecta mudanças nos determinantes e condicionantes. {q-unesp2024-096,q-unesp2025-091,q-fmabc2023-088}
- A vigilância **em saúde** engloba epidemiológica, ambiental, sanitária e saúde do trabalhador; o conceito mais amplo é "Vigilância em Saúde". {q-unesp2025-091,q-adap24-047,q-fmabc2021-077}
- A regulamentação e coordenação do sistema de vigilância epidemiológica são **diretamente do Ministério da Saúde**. {q-iamspe2021-066}
- **Tempo, lugar e pessoa**: tempo (incubação, sazonalidade), lugar (espaço geográfico), pessoa (raça/cor, idade, sexo). {q-fmabc2023-085,q-fmabc2021-077}
- Vigilância **passiva**: notificação obrigatória e periódica; **ativa**: busca intencional de casos. {q-unesp2024-082}
- Investigação de surto de sarampo em migrantes e indígenas (busca ativa, amostras, tempo-lugar-pessoa, bloqueio vacinal): vigilância **epidemiológica**. {q-adap24-047}
- A PNVS (CNS 588/2018) garante o **direito à informação** como um dos princípios da política. {q-fmabc2023-089}
- Resposta global a patógenos emergentes: **sistemas de vigilância** primeiro, depois laboratório e resposta. {q-sirio2025-094}
- Vigilância na atenção básica é **territorializada**, com dados clínicos, sociais e ambientais. {q-simepm89-075}
- Alta de doenças respiratórias: o indicador de **poluição do ar** explica o problema. {q-sessp2025-100}
- Dengue: após quase dois anos com poucas notificações na pandemia, os casos voltaram a crescer a partir de 2022; a vigilância é eixo para eliminar ou reduzir doenças. {q-sirio2024-098}` },
        { id: "vig-ambiental", titulo: "Vigilância ambiental, desastres e Saúde Única", conferir: true,
          questoes: ["q-unifesp2022-049","q-unifesp2023-037","q-adap22-049","q-famema2023-002","q-sirio2026-083","q-iamspe2026-081","q-iamspe2026-082","q-iamspe2026-083","q-iamspe2026-084","q-iamspe2026-086","q-usprp2022-004","q-usprp2025-037"],
          prosa: `A **vigilância ambiental** acompanha os fatores do ambiente que afetam a saúde (água, solo, ar, desastres) e **não presta assistência nem opera o tratamento da água**: ela **monitora e avisa**. [[Numa enchente, cabe a ela informar os serviços de assistência sobre a possível chegada de leptospirose e outros agravos; no passivo ambiental de indústrias químicas, identificar a população exposta e, com a atenção básica, estruturar protocolo de atenção.|q-unifesp2022-049,q-unifesp2023-037]] [[Na água para consumo, sua função é **coletar amostras** na rede e nos reservatórios e analisar cloro residual, turbidez e coliformes conforme a norma; não é operar a estação.|q-adap22-049]]

[[Quando 4 pessoas adoecem após comer peixes mortos que boiavam no rio, a investigação da mortandade de peixes deve ser **imediata** e a população orientada a não consumi-los; e diarreia em crianças ribeirinhas pede, como medida provisória, **ferver a água** por 5 a 10 minutos até a cloração.|q-famema2023-002,q-sirio2026-083]]

A **Saúde Única (One Health)** parte da tríade **humanos, animais e ecossistemas**. [[A resistência antimicrobiana e as zoonoses emergentes são problemas integrados: o crescimento das populações humanas e animais, a modificação dos ecossistemas e as mudanças climáticas facilitam o "salto" de patógenos entre espécies; a falta de estudos que integrem a tríade é uma lacuna.|q-iamspe2026-082,q-iamspe2026-086,q-iamspe2026-083]] Os termos de zoonose cobram a lógica do ciclo: **anfixenose** (o agente circula igualmente em homens e animais, como o estafilococo na pele e no gado) e **metazoonose** (precisa de um vetor invertebrado, como na leishmaniose visceral).

[[O aquecimento global e as queimadas ligam clima e saúde: reduzir as queimadas da Amazônia, reserva de carbono, é a medida de maior efeito para as emissões do Brasil.|q-usprp2022-004,q-usprp2025-037]]`,
          texto: `- **Enchente**: a vigilância em saúde avisa os serviços de assistência sobre leptospirose e outros agravos prováveis. {q-unifesp2022-049}
- **Passivo ambiental** industrial: identificar a população exposta e montar protocolo de atenção com a atenção básica. {q-unifesp2023-037}
- Vigilância da **água**: coletar amostras e analisar cloro residual, turbidez e coliformes. {q-adap22-049}
- Mortandade de peixes com casos de gastroenterite: investigação imediata e orientar a **não consumir**. {q-famema2023-002}
- Diarreia em crianças próximas ao rio: **ferver a água** (5 a 10 minutos) como medida provisória. {q-sirio2026-083}
- **Anfixenose**: agente circula em humanos e animais sem preferência (estafilococo e mastite do gado). {q-iamspe2026-081}
- **Metazoonose**: ciclo com vetor invertebrado (leishmaniose visceral). {q-iamspe2026-084}
- **Saúde Única**: integra humanos, animais e ecossistemas; lacuna é a falta de estudos integrados. {q-iamspe2026-082,q-iamspe2026-083}
- Fatores de emergência de zoonoses: crescimento populacional, mudança dos ecossistemas e clima. {q-iamspe2026-086}
- A maior fatia das emissões brasileiras vem das **queimadas da Amazônia**; reduzi-las é a medida de maior efeito. {q-usprp2022-004,q-usprp2025-037}` },
        { id: "vig-dcnt-perfil", titulo: "Vigilância de DCNT, alimentação e o perfil epidemiológico brasileiro", conferir: true,
          questoes: ["q-unifesp2022-050","q-adap22-050","q-famema2022-008","q-sirio2023-092","q-iamspe2023-080","q-udisc20262-016","q-simepm89-070","q-unesp2021-086","q-amrigs2021-093"],
          prosa: `[[O **VIGITEL** é o inquérito telefônico, implantado em 2006, que monitora a frequência e a distribuição de fatores de risco e proteção para doenças crônicas; o **SISVAN** usa o formulário de **marcador de consumo alimentar** do dia anterior e as medidas de peso e estatura. Ambos são vigilância de **fatores de risco**, não de casos.|q-famema2022-008,q-unifesp2022-050]] Na prática clínica, o Guia Alimentar orienta preferir alimentos **in natura ou minimamente processados** e evitar os ultraprocessados.

[[O Brasil vive **transição epidemiológica com sobreposição de perfis**: queda das infecciosas e aumento das crônicas, mas ainda com doenças transmissíveis presentes; em 2019, as DCNT respondiam por mais da metade das mortes, lideradas por doenças cardiovasculares (27%), neoplasias (17%), respiratórias crônicas (12%) e diabetes (5%).|q-simepm89-070,q-sirio2023-092,q-iamspe2023-080]] Em 1990 a 2020 aumentaram a expectativa de vida e diminuíram a mortalidade infantil, com controle da paralisia infantil; diarreias, imunopreveníveis e pneumonia na infância não tiveram redução de igual intensidade, e o suicídio aumenta com a idade.`,
          texto: `- **VIGITEL** (desde 2006): inquérito telefônico sobre fatores de risco e proteção para DCNT. {q-famema2022-008}
- **SISVAN**: marcador de consumo alimentar do dia anterior e medidas antropométricas. {q-unifesp2022-050}
- Orientação alimentar na APS: **in natura** ou minimamente processados; evitar ultraprocessados. {q-adap22-050}
- Em 2019, DCNT eram mais da metade das mortes: DCV 27%, neoplasias 17%, respiratórias 12%, diabetes 5%. {q-sirio2023-092,q-iamspe2023-080}
- **Transição epidemiológica brasileira**: sobreposição de perfis (infecciosas e crônicas). {q-simepm89-070}
- Entre 1990 e 2020: mais expectativa de vida, menos mortalidade infantil, polio controlada. {q-unesp2021-086}
- Diarreias, imunopreveníveis e pneumonia em crianças: sem queda de mesma magnitude (alternativa incorreta sobre o sucesso de HIV, hepatites e outras). {q-amrigs2021-093}
- Suicídio: as taxas aumentam com a idade e são mais altas nos mais idosos, para os dois sexos. {q-udisc20262-016}` },
      ],
    },
    {
      id: "notificacao-e-sistemas", titulo: "Notificação compulsória e sistemas de informação",
      introducao: `[[A **notificação compulsória** é a comunicação obrigatória à autoridade de saúde de doenças, agravos e eventos de saúde pública da lista nacional. Ela é dever de médicos e demais profissionais de saúde e dos responsáveis por serviços públicos e privados, mas **qualquer cidadão** pode comunicar.|q-unifesp2022-044,q-iamspe2025-094]] O mecanismo é o do alerta: quanto mais grave e transmissível o evento, mais rápida a notificação.

[[Os agravos de notificação **imediata** (em até 24 horas, por telefone ou meio rápido) são os que exigem bloqueio e investigação rápidos: sarampo, febre amarela, malária fora da região endêmica, raiva humana, poliomielite e outros; a maior parte é **semanal**.|q-fmabc2026-091,q-030,q-unifesp2022-044]] O caso **suspeito** já se notifica: não se espera a confirmação laboratorial.`,
      fragmentos: [
        { id: "not-compulsoria", titulo: "O que e quando notificar", conferir: true, diretrizes: ["notificacao"],
          questoes: ["q-030","q-unifesp2022-044","q-iamspe2025-094","q-usp2026-089","q-fmabc2026-091","q-usp2024-077","q-usp2025-108","q-unicampdis2025-050","q-tp20232-106","q-adap21-016","q-famerp2022-012","q-tp20212-102","q-famema2025-068"],
          prosa: `A **lista nacional** é atualizada por critérios: [[magnitude (frequência), potencial de disseminação, transcendência (gravidade, relevância social), vulnerabilidade (existência de medidas eficazes) e compromisso internacional. Foi por casos em crescimento, risco de disseminação, populações vulneráveis e possibilidade de intervenção que a esporotricose entrou em março de 2025.|q-usp2026-089]]

[[**Sarampo suspeito** (febre, exantema, tosse, coriza ou conjuntivite, qualquer idade ou situação vacinal) é de **notificação imediata** e conduta imediata: coleta de sangue (IgM) e de secreção (RT-PCR) e **bloqueio vacinal** dos contatos; não se espera o exame para agir. O mesmo vale para **toda paralisia flácida aguda em menor de 15 anos**, qualquer que seja a hipótese (inclusive Guillain-Barré), com investigação em até 48 horas e fezes até 14 dias do início do déficit.|q-030,q-adap21-016,q-tp20212-102,q-famerp2022-012]]

[[A **violência** é de notificação compulsória e **independe da vontade do paciente**: o sigilo é mantido, e a ficha tem campo para a motivação (homofobia, por exemplo); a notificação serve ao perfil epidemiológico e ao cuidado em rede.|q-usp2025-108,q-unicampdis2025-050,q-usp2024-077]] A **hepatite B** é de notificação semanal, e o que a vigilância faz diante de um caso é a **investigação dos comunicantes** (testar e vacinar). Febre amarela com macaco morto a 800 m: enviar o corpo para exame e notificar no SINAN em até 24 horas.`,
          texto: `- **Notificação compulsória**: obrigação legal de comunicar doenças e agravos à autoridade; **qualquer cidadão** pode comunicar. {q-unifesp2022-044,q-iamspe2025-094}
- **Notificação imediata** em até **24 horas**; não se espera confirmação laboratorial no caso suspeito. {q-unifesp2022-044,q-030}
- Imediatos: sarampo, febre amarela, **malária fora de área endêmica**, raiva humana e outros. {q-fmabc2026-091}
- Sarampo suspeito: notificar de imediato, coletar **IgM e RT-PCR**, **bloquear** contatos com vacina. {q-adap21-016,q-030}
- Definição de caso de sarampo: febre e exantema com tosse, coriza ou conjuntivite; rubéola é o quadro discreto (casos A e B). {q-tp20212-102}
- **PFA** em < 15 anos: notificação imediata, investigação em **48 horas**, fezes em até **14 dias**. {q-famerp2022-012}
- **Violência** (inclusive por motivação LGBTfóbica): notificar, **independentemente da vontade** do paciente. {q-usp2025-108,q-unicampdis2025-050,q-usp2024-077}
- **Esporotricose** entrou na lista pelos critérios de crescimento, disseminação, vulnerabilidade e intervenção possível. {q-usp2026-089}
- Hepatite B identificada no banco de sangue: **investigar comunicantes**; a notificação é semanal. {q-tp20232-106}
- Macaco morto em município com febre amarela: **enviar o corpo para exame** e notificar no SINAN em até 24 horas. {q-famema2025-068}` },
        { id: "sistemas-informacao", titulo: "Sistemas de informação: SINAN, SIM, SINASC, SIH e inquéritos", conferir: true,
          questoes: ["q-iamspe2022-077","q-unesp2022-094","q-famema2023-018","q-fmabc2021-075","q-fmabc2021-076","q-unicampdis2025-048","q-fmabc2022-087","q-einstein2021-041"],
          prosa: `Cada sistema responde a uma pergunta. [[O **SINAN** reúne os dados de **agravos de notificação** (investigação de fonte de infecção, mecanismo de transmissão, incidência e letalidade do Mpox, por exemplo); o **SIM** consolida as **Declarações de Óbito**; o **SINASC** consolida as **Declarações de Nascido Vivo**, documento padrão obrigatório; o **SIH-SUS** registra internações; o **SISVAN** monitora o estado nutricional e o consumo alimentar.|q-iamspe2022-077,q-unesp2022-094,q-famema2023-018,q-unicampdis2025-048]]

[[A mortalidade materna aparece no **SIM**: a melhora do registro das mortes maternas notificadas vem do trabalho de investigação dos óbitos de mulheres em idade fértil. Já violência sexual, gestantes com sífilis e outros agravos vêm do SINAN.|q-fmabc2021-075,q-fmabc2021-076]]

[[Para medir a **prevalência** da covid num município e a evolução da epidemia, o instrumento é o **inquérito populacional** com sorologia (IgG indica infecção pregressa e IgM, recente); o RT-PCR identifica casos agudos, não prevalência acumulada.|q-fmabc2022-087]] Os boletins epidemiológicos do Ministério da Saúde trazem a situação do Brasil e do mundo.`,
          texto: `- **SINAN**: agravos de notificação; **SIM**: óbitos; **SINASC**: nascidos vivos (a DNV é o documento padrão); **SIH-SUS**: internações. {q-iamspe2022-077,q-unesp2022-094,q-famema2023-018}
- Mecanismos de transmissão, fonte, incidência e letalidade do Mpox: **SINAN**. {q-unicampdis2025-048}
- Mortes maternas: **SIM**. {q-fmabc2021-075}
- Violência sexual contra mulheres e outros agravos de notificação: dados do **SINAN**. {q-fmabc2021-076}
- Prevalência de covid num município: **inquéritos sorológicos populacionais** (IgM recente, IgG pregressa). {q-fmabc2022-087}
- Boletins especiais da covid trazem a situação no mundo e no Brasil. {q-einstein2021-041}` },
      ],
    },
    {
      id: "surtos", titulo: "Investigação de surto, epidemia e conceitos",
      introducao: `[[Diante de um aumento de casos, a primeira pergunta é se há **mesmo um excesso**: compara-se a incidência atual com a de anos anteriores (série histórica) para o mesmo lugar e período, e confirma-se o diagnóstico; só depois se investigam fonte e transmissão.|q-adap22-044,q-usp2022-034,q-sessp2026-083]] Quem corre para controlar antes de comparar pode agir sobre ruído.`,
      fragmentos: [
        { id: "surto-investigacao", titulo: "Passos da investigação, fonte comum e período de exposição", conferir: true, diretrizes: ["guia-vigilancia"],
          figuras: [{ arquivo: "figuras/investigacao-surto.svg", legenda: "Esquema autoral: passos da investigação de um surto, do alerta às medidas de controle." }],
          questoes: ["q-adap22-044","q-usp2022-034","q-usp2023-111","q-usp2023-112","q-sessp2026-083","q-sessp2025-082","q-sessp2025-085","q-sessp2025-099","q-uspsp2-097","q-uspsp2-110","q-tp20212-110","q-usprp2023-054","q-sessp2025-092","q-tp20231-104"],
          prosa: `Os passos clássicos são: **confirmar o diagnóstico**, **confirmar a existência do surto** (comparar com o esperado), **definir caso** e fazer **busca ativa**, descrever os casos por **tempo, lugar e pessoa**, **levantar hipóteses**, coletar amostras, **medidas de controle** e divulgar. [[Antes de qualquer teste analítico ou medida de controle em larga escala, compara-se o número de casos com a série histórica; é o que mostra se 25 pacientes com gastroenterite em 36 horas são excesso ou rotina.|q-sessp2026-083,q-usp2023-111,q-sessp2025-082]] Para decidir se há surto, o vínculo epidemiológico entre os casos também conta, mesmo com poucos casos (agregado de casos de meningite em um campus).

[[Quando os casos aparecem de forma explosiva e em poucas horas após uma refeição comum, trata-se de **epidemia por fonte comum pontual**: todos os suscetíveis tiveram acesso a uma única fonte (maionese de batatas, 2 a 4 horas depois, vômitos e diarreia sugerem toxina estafilocócica).|q-tp20212-110,q-adap22-044]] As amostras (de casos, não casos e alimentos) servem para **identificar o agente, a fonte e o veículo**, não para confirmar a existência da epidemia. Em surto de diarreia numa creche, recolhem-se amostras de água e alimentos e verifica-se a qualidade sanitária.

[[O **período provável de exposição** se obtém voltando do início dos sintomas: do primeiro caso subtrai-se o **maior** período de incubação, do último caso, o **menor**. Na doença de Chagas aguda oral (incubação de 3 a 22 dias), com casos de 15 a 25 de janeiro, a exposição foi de 24 de dezembro a 22 de janeiro.|q-uspsp2-097]]

[[Na contenção, o **isolamento** separa o doente durante a transmissibilidade (no sarampo, de 4 dias antes a 4 dias depois do exantema) e a **quarentena** restringe o exposto pelo período máximo de incubação (7 a 18 dias). Em surto de sarampo a prioridade é **ampliar a vacinação**, inclusive a dose zero de 6 a 12 meses; na varicela, vacinar os suscetíveis maiores de 9 meses em até 120 horas, dar imunoglobulina a quem não pode ser vacinado (gestante, imunodeprimido, menor de 9 meses) e afastar os doentes até a fase de crosta.|q-usprp2023-054,q-sessp2025-092,q-tp20231-104]] O esquema abaixo resume os passos.`,
          texto: `- Primeiro passo diante do aumento de casos: **comparar com a série histórica** e confirmar diagnóstico. {q-adap22-044,q-usp2022-034,q-sessp2026-083,q-usp2023-111}
- **Agregado de casos com vínculo epidemiológico** caracteriza surto mesmo com poucos casos. {q-usp2023-112}
- Aumento de dengue numa área: primeiro **investigar** a extensão do problema. {q-sessp2025-082}
- Surto de diarreia numa creche: **amostras de água e alimentos** e verificação sanitária. {q-sessp2025-085}
- Doença de notificação com aumento recente: **reforçar a notificação e fazer busca ativa**. {q-sessp2025-099}
- Coletar amostras de casos, não casos e alimentos: **identificar agente, fonte e veículo**. {q-uspsp2-110}
- **Fonte comum pontual**: início explosivo, após evento comum (maionese de batatas). {q-tp20212-110}
- Período de exposição: do 1º caso subtrai-se a incubação **máxima**; do último, a **mínima** (Chagas oral, 3 a 22 dias). {q-uspsp2-097}
- Sarampo: **isolamento** do doente (4 dias após o exantema) e **quarentena** do exposto (até 18 dias). {q-usprp2023-054}
- Surto de sarampo: **vacinação ampliada** (6 a 12 meses, dose zero). {q-sessp2025-092}
- Varicela: vacina para suscetíveis > 9 meses, imunoglobulina para gestante e < 9 meses, afastar até a crosta. {q-tp20231-104}` },
        { id: "epidemia-conceitos", titulo: "Endemia, epidemia, pandemia, caso autóctone, eliminação e propriedades do agente", conferir: true,
          questoes: ["q-famema2022-013","q-sirio2022-081","q-unesp2026-090","q-famema2023-005","q-famema2023-014","q-famema2025-066","q-sessp2023-086","q-unicamp2023-069","q-tp20222-111","q-tp20212-113","q-usp2023-067","q-amrigs2025-003"],
          prosa: `**Endemia** é a presença habitual da doença numa área, com incidência constante e flutuações; **epidemia** é o aumento acima do esperado; **pandemia** é a epidemia em vários continentes. [[Caso **autóctone** é o adquirido no local de residência; caso **alóctone** é o importado, como o primeiro caso de covid no Brasil, de brasileiro que voltou da Itália.|q-famema2022-013,q-sirio2022-081,q-unesp2026-090]]

[[Para o **agente**: a **infectividade** é a capacidade de penetrar e se multiplicar no hospedeiro; a **patogenicidade**, a de provocar doença; a **virulência**, a de provocar formas graves; a **letalidade** expressa a **gravidade**.|q-famema2023-014,q-famema2025-066,q-sessp2023-086]] O **R0** é o número de casos gerados por um infectado numa população totalmente suscetível, sem medidas.

[[A hipótese do **esgotamento de suscetíveis** (a epidemia declina quando quase todos tiveram a doença) não se confirmou na covid, porque o vírus sofreu mutações que escapam da imunidade da infecção prévia.|q-tp20222-111]] [[Os níveis de interrupção são **controle** (incidência reduzida a nível aceitável), **eliminação** (cessação da transmissão em extensa área, com risco de reintrodução) e **erradicação** (desaparecimento do agente e do risco).|q-tp20212-113]] O vírus da influenza A tem alto risco pandêmico por seu genoma segmentado e plástico e seu vasto reservatório em mamíferos e aves; a última pandemia antes da covid foi a do H1N1.`,
          texto: `- **Endemia**: presença habitual, incidência constante com flutuações; doença endêmica está habitualmente presente. {q-unesp2026-090,q-sirio2022-081}
- Caso **alóctone**: adquirido fora (o 1º caso de covid, vindo da Itália); **autóctone**: adquirido no local. {q-famema2022-013}
- **Infectividade**: penetrar e se multiplicar no hospedeiro; **letalidade**: gravidade. {q-famema2023-014,q-famema2025-066}
- Emergência do Mpox em 2022: a banca cobrou **virulência** (ver armadilhas). {q-sessp2023-086}
- **R0**: infectados por um caso em população totalmente suscetível, sem medidas. {q-unicamp2023-069}
- **Esgotamento de suscetíveis** não ocorreu na covid por mutações que escapam da imunidade. {q-tp20222-111}
- **Eliminação**: cessação da transmissão em extensa área com **risco de reintrodução**. {q-tp20212-113}
- Mpox: a rápida disseminação em regiões não endêmicas sugere circulação não detectada por tempo. {q-usp2023-067}
- Influenza A: genoma segmentado e plástico e reservatório em mamíferos e aves potencializam o risco pandêmico; a última pandemia antes da covid foi a do H1N1. {q-amrigs2025-003,q-famema2023-005}` },
      ],
    },
    {
      id: "doencas", titulo: "Vigilância de doenças específicas",
      introducao: `[[Cada doença tem uma estratégia de vigilância que decorre de como se transmite e do que se pode fazer: as imunopreveníveis exigem bloqueio vacinal e cobertura; as arboviroses, o controle do vetor e o monitoramento por diagrama de controle; as zoonoses (raiva), a observação do animal e a profilaxia do exposto.|q-sessp2025-092,q-tp20241-106,q-famerp2022-015]]`,
      fragmentos: [
        { id: "vig-dengue", titulo: "Dengue e arboviroses: LIRAa, diagrama de controle e plano de contingência", conferir: true, diretrizes: ["guia-vigilancia"],
          questoes: ["q-adap23-037","q-tp20231-105","q-tp20241-106","q-tp20232-109","q-famema2021-073"],
          prosa: `O **LIRAa** (levantamento rápido de índices do *Aedes aegypti*) mede o índice de infestação predial: [[abaixo de 1% é satisfatório; de 1 a 3,9%, alerta; a partir de **4%**, risco de surto; os bairros acima de 4% são priorizados para eliminação de criadouros, e não tratados com nebulização.|q-adap23-037]]

O **diagrama de controle** compara a incidência semanal com a faixa esperada. [[Transmissão acima do **limite superior** é sinal de epidemia; associada a **óbitos confirmados**, configura o cenário de **alto risco**, que ativa as medidas mais intensas (centro de operações, hidratação em unidades, leitos).|q-tp20231-105,q-tp20241-106]] Fora da epidemia, a rede de atenção primária se prepara: **busca ativa, fluxo de informação com a vigilância e integração dos agentes comunitários e de endemias**. Em um território com caso confirmado, faz-se busca ativa de suspeitos e rastreamento dos comunicantes.`,
          texto: `- **LIRAa** acima de **4%** = risco de surto: priorizar bairros na eliminação de criadouros. {q-adap23-037}
- **Diagrama de controle**: incidência acima do limite superior indica risco de ativar medidas de contenção. {q-tp20231-105}
- Quatro semanas acima do limite superior **com três óbitos**: cenário de **alto risco**. {q-tp20241-106}
- Na APS, em período não epidêmico: busca ativa, fluxo de informação e integração ACS-ACE. {q-tp20232-109}
- Com caso confirmado no território: **busca ativa de suspeitos** e rastreamento dos comunicantes. {q-famema2021-073}` },
        { id: "vig-imunopreveniveis", titulo: "Sarampo, coqueluche, paralisia flácida, hepatites e SRAG", conferir: true, diretrizes: ["guia-vigilancia"],
          questoes: ["q-usp2022-022","q-usprp2025-031","q-tp20252-043","q-usprp2021-016","q-tp20251-103","q-tp20241-107","q-tp20252-081","q-usp2025-110","q-sirio2025-098","q-sirio2022-096"],
          prosa: `[[A **coqueluche** voltou a crescer apesar da cobertura vacinal: concentram-se casos em menores de 1 ano antes do reforço e a baixa cobertura da pandemia explica o aumento de 2024. A **quimioprofilaxia** (azitromicina) é indicada aos **comunicantes íntimos (domiciliares)**: três familiares da adolescente com tosse paroxística.|q-usp2022-022,q-tp20252-043,q-usprp2025-031]] [[O tétano acidental caiu com a manutenção de altas coberturas vacinais.|q-usprp2021-016]]

[[As **SRAG** (síndrome respiratória aguda grave) mostram padrão por faixa etária: o VSR predomina na incidência em menores de 2 anos e o SARS-CoV-2 na mortalidade em maiores de 65; o caso de lactente com gemência e tiragem reflete esse perfil e **deve ser notificado**.|q-tp20241-107,q-tp20252-081]] Na influenza, as coberturas caíram depois da pandemia nos grupos de crianças, gestantes e puérperas.

[[Na **cascata do cuidado do HIV**, cada barra é a proporção das pessoas que chegam a cada etapa (diagnóstico, vinculação, retenção, supressão viral). Na vigilância da sífilis em gestantes, um indicador de resultado é **gestantes curadas** entre as infectadas.|q-usp2025-110]] A tuberculose, na modelagem do Brasil entre 2001 e 2023, teve incidência com tendência de aumento projetada acima dos níveis anteriores.`,
          texto: `- **Coqueluche**: casos em < 1 ano antes do reforço; aumento de 2024 pela queda de cobertura na pandemia. {q-usp2022-022,q-tp20252-043}
- **Quimioprofilaxia** da coqueluche para **comunicantes íntimos** (domiciliares). {q-usprp2025-031}
- **Tétano acidental**: queda com altas coberturas vacinais. {q-usprp2021-016}
- **SRAG**: VSR predomina em menores de 2 anos; SARS-CoV-2 na mortalidade em maiores de 65. {q-tp20241-107,q-tp20252-081}
- Cobertura vacinal de influenza caiu em crianças, gestantes e puérperas após a pandemia. {q-tp20251-103}
- **Cascata do HIV**: proporção estimada de pessoas em cada etapa do cuidado; sífilis em gestantes tem indicador de cura. {q-usp2025-110}
- Tuberculose: tendência projetada de aumento da incidência. {q-sirio2025-098}
- Boletim de HIV de 2020: avaliar a alternativa incorreta sobre razão de sexos e faixa etária. {q-sirio2022-096}` },
        { id: "vig-raiva", titulo: "Profilaxia da raiva humana", conferir: true, diretrizes: ["raiva-2022"],
          questoes: ["q-famerp2026-010","q-famerp2022-015","q-fmabc2022-018","q-fmabc2023-002","q-didepm-005"],
          prosa: `A raiva é **fatal em quase 100%** depois dos sintomas; por isso a conduta se decide pelo **risco do animal** e pela **gravidade da lesão**. [[Lavar a ferida com água corrente abundante e sabão é sempre o primeiro passo. Se o agressor é **cão ou gato doméstico, sadio e observável**, **observa-se o animal por 10 dias** sem iniciar a profilaxia, **qualquer que seja a lesão**: o vírus só está na saliva poucos dias antes dos sintomas, e o animal que segue sadio por 10 dias não transmitia. Se adoecer, morrer ou desaparecer, inicia-se o esquema.|q-famerp2022-015,q-didepm-005]]

[[Se o animal **não pode ser observado** (desconhecido, fugiu) ou é **mamífero silvestre** (morcego, macaco, raposa), a lesão decide: **leve**, só vacina; **grave** (cabeça, face, pescoço, mãos, polpas digitais, mucosa, ferida profunda ou múltipla), **soro ou imunoglobulina humana** infiltrados na lesão **mais vacina**; no silvestre, sempre soro e vacina. O esquema vigente desde 2022 é de **4 doses (dias 0, 3, 7 e 14)**; era de 5 doses.|q-famerp2026-010,q-fmabc2023-002,q-fmabc2022-018]]`,
          texto: `- Sempre **lavar** com água e sabão antes de tudo. {q-famerp2022-015,q-didepm-005}
- Cão ou gato **sadio, conhecido e observável**: lesão profunda e única em criança sem vacina: não iniciar a profilaxia e **observar 10 dias**. {q-didepm-005,q-famerp2022-015}
- Animal **desaparecido** e lesão grave: **soro + vacina** imediatos. {q-fmabc2022-018}
- **Mamífero silvestre**: soro ou imunoglobulina e vacina nos dias 0, 3, 7 e 14. {q-fmabc2023-002}
- Mordedura de gato desconhecido que fugiu, mãos e polpas digitais, raiva felina confirmada: **vacina em 4 doses (0, 3, 7, 14) e imunoglobulina**. {q-famerp2026-010}` },
      ],
    },
    {
      id: "obitos", titulo: "Declaração de óbito, nascido vivo e mortalidade",
      introducao: `[[A **Declaração de Óbito (DO)** é o documento da estatística de mortalidade e o instrumento que fecha o ciclo do SIM. Ela só faz sentido se registra a **cadeia de causas** do início ao fim: o que levou ao óbito e o que o matou.|q-iamspe2023-065,q-unesp2023-095,q-fmabc2022-094]] Quem a preenche e como vem de duas perguntas: a morte foi **natural** ou **por causa externa**, e havia **médico assistente**?`,
      fragmentos: [
        { id: "do-preenchimento", titulo: "Como preencher: causa básica, intermediárias, imediata e condições contribuintes", conferir: true, diretrizes: ["do-manual"],
          questoes: ["q-iamspe2023-065","q-unesp2023-095","q-unesp2022-086","q-unesp2024-089","q-unesp2025-092","q-unesp2026-087","q-famerp2023-010","q-famerp2023-022","q-famerp2025-036","q-famerp2026-012","q-famerp2022-001","q-usprp2021-014","q-tp20231-115","q-unicampdis2024-052","q-fmabc2022-094","q-sirio2022-085","q-iamspe2021-075"],
          prosa: `A **Parte I** da DO é uma sequência causal: **a** é a **causa imediata** (a que matou), as linhas intermediárias são as complicações, e a **última linha preenchida** é a **causa básica** (a que desencadeou a cadeia). [[Na febre tifoide que evolui com perfuração intestinal e peritonite, a imediata é a peritonite, a intermediária a perfuração e a básica a febre tifoide; no sangramento de varizes gástricas do cirrótico, choque hipovolêmico (a) ← hemorragia digestiva (b) ← cirrose (c) ← alcoolismo (d).|q-fmabc2022-094,q-famerp2022-001,q-unesp2023-095]]

[[A **Parte II** recebe as **condições contribuintes**, que não fazem parte da cadeia: no infarto agudo com fibrilação ventricular, a Parte I é FV ← IAM ← aterosclerose coronariana, e dislipidemia, hipertensão e tabagismo vão na Parte II. O estado de **hipertensão** de longa data em quem morre de cardiopatia hipertensiva é a causa básica, se está na cadeia.|q-famerp2026-012,q-iamspe2023-065,q-usprp2021-014]]

[[Se a morte tem **causa externa** (acidente, violência), a causa básica é o **evento externo**, mesmo que haja complicações clínicas: o disparo acidental de arma, a ação contundente (queda de andaime) que levou à fratura, à infecção hospitalar e à broncopneumonia. A covid em quem foi atingido por bala perdida não entra como básica.|q-iamspe2021-075,q-sirio2022-085,q-unesp2022-086,q-unesp2024-089,q-unesp2025-092]] [[O câncer de esôfago tratado e que levou à caquexia é a causa básica, e não a insuficiência respiratória; a dengue com choque é a básica, e o choque a imediata, com notificação imediata. A insuficiência respiratória, como causa terminal da morte por covid, entra na **linha A**.|q-tp20231-115,q-famerp2025-036,q-unicampdis2024-052]]`,
          texto: `- **Parte I**: linha **a** = causa imediata; a **última linha** = causa **básica**. {q-fmabc2022-094,q-unesp2023-095}
- Febre tifoide → perfuração intestinal → peritonite: **básica** = febre tifoide; **imediata** = peritonite. {q-fmabc2022-094}
- Varizes gástricas no alcoolista: choque ← hemorragia digestiva ← cirrose ← alcoolismo. {q-famerp2022-001,q-unesp2023-095}
- **Parte II**: condições contribuintes (dislipidemia, hipertensão, tabagismo no IAM). {q-famerp2026-012,q-iamspe2023-065}
- Parte I com insuficiência cardíaca ← estenose mitral ← febre reumática; tabagismo na Parte II. {q-iamspe2023-065}
- Cardiopatia hipertensiva: a hipertensão de longa data é a causa **básica**. {q-usprp2021-014}
- **Causa externa**: a básica é o evento (queda de andaime, tiro acidental), apesar das complicações. {q-iamspe2021-075,q-sirio2022-085,q-unesp2022-086}
- Laceração hepática por queda de 12 m: choque ← laceração ← trauma. {q-unesp2025-092}
- Facada na gestação: choque ← laceração de artéria ← ferimento por faca. {q-unesp2024-089}
- Câncer de esôfago com caquexia e pneumonia: básica = **neoplasia do esôfago**. {q-tp20231-115}
- Dengue grave com choque: **imediata** = choque, **básica** = dengue; notificação imediata. {q-famerp2025-036}
- Cirurgia bariátrica complicada por fístula e peritonite: peritonite ← fístula ← cirurgia ← obesidade grau III (Parte I); hipercolesterolemia vai à Parte II. {q-famerp2023-022}
- Descolamento prematuro de placenta com choque: imediata = choque hipovolêmico; básica = descolamento (óbito materno). {q-famerp2023-010}
- Insuficiência respiratória como causa terminal da morte por covid: **linha A** da Parte I. {q-unicampdis2024-052}
- Preenchimento correto da DO de um homem que morreu súbito em domicílio sem causa aparente: ver a figura. {q-unesp2026-087}` },
        { id: "do-quem-emite", titulo: "Quem emite a DO: médico assistente, SVO e IML", conferir: true, diretrizes: ["do-manual"],
          questoes: ["q-iamspe2021-013","q-famema2021-080","q-sessp2023-097","q-unesp2026-085","q-unesp2026-086","q-famerp2023-021","q-famerp2025-046","q-famerp2022-008","q-unicampdis2022-019","q-fmabc2021-078","q-famerp2024-002"],
          prosa: `A regra decorre da natureza da morte. [[**Morte natural com médico assistente**: o próprio médico emite a DO, inclusive o médico da ESF ou da internação domiciliar que acompanhava o paciente (câncer terminal em casa). **Morte natural sem assistência ou de causa indeterminada**: o **Serviço de Verificação de Óbito (SVO)**. **Causa externa** (acidente, violência, suicídio), **ou suspeita**: o **IML**.|q-famerp2023-021,q-famema2021-080,q-famerp2025-046]]

[[A causa externa vale **mesmo se a morte demora**: idoso que quebrou o fêmur numa queda e morreu semanas depois de complicações, TCE de briga que evolui com pneumonia e sepse no 11º dia, queda de obra com óbito em 25 dias, covid em paciente atropelado: a DO é do **IML**.|q-iamspe2021-013,q-sessp2023-097,q-unesp2026-085,q-unicampdis2022-019,q-fmabc2021-078]]

[[O encaminhamento da **justiça** é exceção: em município sem IML, o médico da localidade nomeado como perito aceita o encargo, constata o óbito e descreve as lesões e agentes, sem concluir a natureza (suicídio ou homicídio).|q-famerp2022-008]] [[Os formulários de DO **não podem ser distribuídos a empresas funerárias**; a distribuição é feita pela Secretaria de Saúde. Em criança nascida em casa, que chorou e logo morreu, o médico de família que acompanhava o pré-natal verifica o recém-nascido e emite a DO.|q-unesp2026-086,q-famerp2024-002]]`,
          texto: `- **Morte natural com assistência**: o **médico assistente** emite a DO (inclusive na internação domiciliar e na ESF). {q-famerp2023-021}
- **Morte natural sem assistência**: **SVO**; **causa externa ou suspeita**: **IML**. {q-famerp2025-046,q-famema2021-080}
- Causa básica externa, mesmo tardia (fratura de fêmur, TCE com sepse, queda de obra): **IML**. {q-iamspe2021-013,q-sessp2023-097,q-unesp2026-085,q-fmabc2021-078}
- Atropelamento com TCE e covid concomitante: a DO é do **IML**. {q-unicampdis2022-019}
- Município pequeno sem IML: o médico nomeado assina a notificação, constata o óbito e descreve as lesões. {q-famerp2022-008}
- Os formulários de DO **não** vão para **empresas funerárias**. {q-unesp2026-086}
- RN nascido em casa que respirou e morreu: o médico da família **verifica** e emite a DO, com a DNV. {q-famerp2024-002}` },
        { id: "nascido-vivo-obito-fetal", titulo: "Nascido vivo, óbito fetal e mortalidade materna", conferir: true, diretrizes: ["do-manual"],
          questoes: ["q-unesp2024-088","q-iamspe2022-078","q-unesp2022-085","q-fmabc2024-082","q-usprp2024-091","q-usprp2026-022","q-famerp2024-007","q-tp20222-109","q-adap21-014"],
          prosa: `O que separa o **nascido vivo** do **óbito fetal** é o **sinal de vida ao nascer** (respiração, batimento, movimento), **independentemente da duração da gestação**; [[o recém-nascido de 1.550 g que morre 20 minutos depois nasceu vivo: é **óbito não fetal** (neonatal precoce), com Declaração de Nascido Vivo **e** Declaração de Óbito; o natimorto tem só a DO fetal.|q-unesp2022-085,q-unesp2024-088,q-iamspe2022-078]] [[Se a gestante morre **sem expulsão do feto**, emite-se **uma única DO**, a da mulher; não há óbito fetal a registrar.|q-fmabc2024-082]] Sem batimentos fetais com 34 semanas, com anóxia por circular de cordão, o óbito é **fetal tardio**.

[[A **morte materna** é a de mulher durante a gestação ou até 42 dias depois, por causa ligada à gestação; a morte por **ferimento por arma branca** é **não obstétrica**, e não conta como materna. Para reduzir a razão abaixo de 70 por 100.000 nascidos vivos, o comitê atua sobre protocolos, transporte e acesso; na mortalidade neonatal evitável, a menor redução foi no **acesso e qualidade do pré-natal**.|q-usprp2024-091,q-usprp2026-022,q-tp20222-109]] Dos 28 óbitos infantis em 2.000 nascidos vivos, o coeficiente é 14 por 1.000, com predomínio do componente neonatal (16 de 28).`,
          texto: `- **Nascido vivo**: sinal de vida, independentemente da duração da gestação; exige DNV e, se morre, DO. {q-unesp2022-085,q-unesp2024-088,q-iamspe2022-078}
- RN de 1.550 g que morre aos 20 minutos: **óbito não fetal** (neonatal precoce). {q-iamspe2022-078}
- Gestante que morre sem expulsão do feto: **uma DO** (a da mulher). {q-fmabc2024-082}
- Sem BCF com 34 semanas, anóxia por circular de cordão: **óbito fetal tardio**. {q-famerp2024-007}
- Morte por arma branca em gestante: **morte materna não obstétrica**. {q-usprp2024-091}
- Meta de menos de 70 mortes maternas por 100.000 nascidos vivos: ação do comitê sobre protocolo, transporte e acesso. {q-usprp2026-022}
- Menor redução de mortes neonatais evitáveis: **acesso e qualidade do pré-natal**. {q-tp20222-109}
- 28 óbitos em 2.000 nascidos vivos: **14 por 1.000**; neonatal 16 dos 28. {q-adap21-014}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-fmabc2022-018","q-fmabc2023-002","q-famerp2026-010","q-sessp2023-086"],
          prosa: `[[A regra atual da raiva é de **4 doses (0, 3, 7 e 14)** desde 2022; a FMABC 2022 cobrou o esquema de **5 doses**, vigente até 2021, e as provas de 2023 e 2026 cobram 4.|q-fmabc2022-018,q-fmabc2023-002,q-famerp2026-010]] [[**Virulência** é a capacidade de causar doença grave; o Mpox como emergência global se deveu a transmissibilidade, mas a SES-SP 2023 cobrou "virulência".|q-sessp2023-086]]`,
          texto: `- Regra: profilaxia da raiva em **4 doses** (2022); a prova (FMABC 2022) cobrou **5 doses**. {q-fmabc2022-018}
- Regra: virulência é gravidade; a prova (SES-SP 2023) cobrou **virulência** para o aumento da transmissibilidade do Mpox. {q-sessp2023-086}
- Regra: as provas de 2023 e 2026 usam o esquema de **4 doses**, o mesmo da regra atual. {q-fmabc2023-002,q-famerp2026-010}` },
      ],
    },
  ],
});
