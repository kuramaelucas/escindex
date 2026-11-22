/* resumos/comunicacao-clinica/resumo.js — resumo adaptativo de comunicação clínica: método clínico centrado na
   pessoa, habilidades de entrevista (perguntas abertas, empatia, demanda aditiva, entrevista motivacional),
   comunicação de más notícias (SPIKES), sigilo, ética e direitos na relação médico-paciente.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- comunicacao-clinica */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "comunicacao-clinica",
  titulo: "Comunicação clínica e relação médico-paciente",
  assunto: "ass-comunicacaoclinica",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "stewart-mccp", texto: "Stewart M et al. — Patient-Centered Medicine: Transforming the Clinical Method (versões de seis componentes e a atualizada, de quatro); Medicina centrada na pessoa: transformando o método clínico", lidoEm: null },
    { id: "spikes", texto: "Baile WF et al. — SPIKES: a six-step protocol for delivering bad news (The Oncologist, 2000)", lidoEm: null },
    { id: "cem", texto: "Conselho Federal de Medicina — Código de Ética Médica (Resolução CFM nº 2.217/2018): sigilo, adolescentes, notificação compulsória; Lei nº 10.216/2001 (direitos das pessoas com transtorno mental); lei do acompanhante na consulta (Lei nº 14.737/2023)", lidoEm: null },
    { id: "prochaska", texto: "Prochaska e DiClemente — Modelo transteórico (estágios de mudança) e Miller e Rollnick — Entrevista motivacional", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição.", questoes: ["q-iamspe2023-072"] },
  ],
  doencas: [
    {
      id: "mccp", titulo: "Método clínico centrado na pessoa (MCCP)",
      introducao: `[[O **método clínico centrado na pessoa** (Stewart e colaboradores) parte de uma ideia simples: a pessoa tem uma **doença** (o que o médico diagnostica) e uma **experiência da doença** (o que ela sente, pensa e teme), e a consulta precisa tratar das duas.|q-usp2022-035,q-scmsp2023-084,q-sessp2023-100]] Isso muda o resultado, porque o paciente que não foi ouvido não adere, e o médico que só vê a doença perde a causa do problema.

Veja também: **Estratégia Saúde da Família** (clínica ampliada, PTS, genograma, SOAP e o método na APS, que é o dono dessas ferramentas), **Prevenção** (prevenção quaternária) e **Princípios do SUS** (equidade e vínculo).`,
      fragmentos: [
        { id: "mccp-componentes", titulo: "Os componentes do método e como reconhecê-los na cena", conferir: true, diretrizes: ["stewart-mccp"],
          figuras: [{ arquivo: "figuras/mccp-spikes.svg", legenda: "Esquema autoral: os quatro componentes do MCCP e os seis passos do SPIKES." }],
          casos: ["q-usprp2026-021"],
          questoes: ["q-usp2022-035","q-scmsp2023-084","q-scmsp2025-081","q-usprp2026-021","q-amrigs2025-086","q-amrigs2020-085","q-sessp2023-100","q-uspsp4-078","q-uspsp5-087","q-einstein2027-064","q-famerp2026-016","q-fmabc2025-094","q-fmabc2026-081","q-sirio2027-086","q-unicamp2022-076","q-unicamp2022-078","q-fmabc2025-092","q-scmsp2021-100"],
          prosa: `A versão atual tem **quatro componentes integrativos**: (1) **explorar a saúde, a doença e a experiência da doença**; (2) **entender a pessoa como um todo**; (3) **elaborar um plano conjunto de manejo**; (4) **fortalecer a relação entre a pessoa e o médico**. [[A versão anterior tinha seis, com **incorporar prevenção e promoção da saúde** e **ser realista** (tempo e recursos); a prova pode cobrar qualquer das duas, e deve-se ver o que a pergunta diz ("em sua versão mais atualizada").|q-scmsp2023-084,q-einstein2027-064]]

[[**Explorar a experiência da doença** é investigar quatro coisas, o **SIFE**: **S**entimentos (medos), **I**deias (o que acha que causa), **F**uncionamento (efeito na vida) e **E**xpectativas (o que espera da consulta). Perguntas como "O que você acha que está causando essa dor?" e "Como isso afeta o trabalho?" são esse componente; o paciente com diabetes que teme a insulina precisa ter o medo explorado e os equívocos desfeitos antes de qualquer explicação.|q-einstein2027-064,q-sessp2023-100,q-famerp2026-016,q-fmabc2026-081]]

[[**Entender a pessoa como um todo** é ver o contexto: a pessoa, a família, o trabalho, o bairro, a cultura. A médica que percebe a inquietação, pergunta como estão as coisas em casa e marca genograma e ecomapa exerce esse componente; a figura de círculos concêntricos (contexto próximo, amplo e macro) o representa.|q-scmsp2025-081,q-usprp2026-021]]

[[**Elaborar um plano conjunto** é buscar um **terreno comum**: definir problemas, metas e papéis **em negociação** com a pessoa, e não prescrever. Em vez de mandar parar de fumar e fazer 150 minutos de exercício, o médico propõe que o paciente **escolha uma pequena mudança** que ache viável; e o homem que teme "ficar dependente" de remédio para a pressão decide, junto, o primeiro passo.|q-uspsp4-078,q-uspsp5-087,q-sirio2027-086]] **Fortalecer a relação** é a base: confiança e continuidade permitem os demais.

A essência do método é **responder às pistas** do paciente, permitir e encorajar sua expressão, e o fracasso em entender as pistas dadas é a falha clássica; [[o MCCP **não** é só da atenção primária, **não** é a atitude ética do profissional e é uma forma de organizar a consulta considerando a expectativa de médicos e pessoas.|q-usp2022-035,q-sessp2023-100]] A **clínica ampliada**, a medicina centrada na pessoa e a **medicina narrativa** têm em comum a valorização da **autonomia e do autoconhecimento** do paciente.`,
          texto: `- **MCCP atual**: **quatro** componentes: explorar saúde, doença e experiência; entender a pessoa como um todo; plano conjunto; fortalecer a relação. {q-scmsp2023-084,q-uspsp5-087}
- A versão anterior tem **seis**, incluindo **prevenção e promoção** e **ser realista**; o que não está na versão atual é "incorporar prevenção e promoção". {q-scmsp2023-084,q-einstein2027-064}
- Itens do MCCP: fortalecer a relação, conhecer o contexto e construir entendimento comum (1 + 2 + 3 = 6); focar só nos aspectos objetivos da doença é o método **tradicional**. {q-amrigs2025-086}
- **Experiência da doença**: sentimentos, ideias, funcionamento e expectativas (**SIFE**). {q-sessp2023-100,q-einstein2027-064}
- Diabético que teme a insulina: **explorar a experiência da doença** e desfazer equívocos. {q-famerp2026-016,q-uspsp4-078}
- Epigastralgia na semana de provas: o MCCP compreende a experiência (sentimentos, ideias, funcionamento e expectativas). {q-fmabc2026-081}
- **Entender a pessoa como um todo**: contexto e rede (genograma e ecomapa); a figura de círculos concêntricos. {q-scmsp2025-081,q-usprp2026-021}
- **Plano conjunto**: negociar problemas, metas e papéis; propor **uma pequena mudança viável**. {q-uspsp4-078,q-uspsp5-087,q-sirio2027-086}
- A essência: **responder às pistas** do paciente, permitir e encorajar a expressão. {q-amrigs2020-085}
- O MCCP **não** é exclusivo da APS e é um modo de organizar a consulta. {q-usp2022-035,q-sessp2023-100}
- **Clínica ampliada, MCCP e medicina narrativa**: valorizam a **autonomia e o autoconhecimento**. {q-unicamp2022-076}
- Oliver Sacks: a doença é uma **construção teórica** e instrumento de trabalho do médico, enquanto o doente vive a experiência. {q-unicamp2022-078}
- Os diagnósticos em saúde mental carregam parâmetros sociais; a resposta empática reconhece o sofrimento antes de qualquer rótulo. {q-fmabc2025-092}
- Paciente de 52 anos que teve infarto e revascularização: a prova cobrou o **processo saúde-doença** (o adoecer na vida da pessoa). {q-scmsp2021-100}` },
        { id: "mccp-vinculo-narrativa", titulo: "Vínculo, empatia, escuta e acolhimento da emoção", conferir: true,
          questoes: ["q-sirio2026-099","q-tp20252-109","q-fmabc2022-089","q-unifesp2022-067","q-famema2022-009","q-uspsp4-079","q-unifesp2023-022"],
          prosa: `[[**Empatia** é a habilidade de **se colocar no lugar do outro** e perceber sua experiência; é pressuposto do **vínculo**, que é uma aprendizagem possível, e fundamental com populações marginalizadas, como pessoas em situação de rua, junto com despojamento, respeito e compreender sem julgar. O cuidado em saúde implica **responsabilização, vínculo e reconhecimento do outro como sujeito**, e não só protocolos.|q-fmabc2022-089,q-tp20252-109]]

[[Diante da **raiva** de uma mãe, o médico **legitima e valida a emoção**, sem interromper a conversa nem pedir que "se acalme"; com a mãe exausta que se sente "invisível" durante a internação do lactente, o caminho é **ouvir ativamente, validar os sentimentos** e, com o consentimento dela, compartilhar essas percepções com a equipe.|q-unifesp2022-067,q-sirio2026-099]]

[[A comunicação envolve também os **sinais não verbais** (expressão, postura, distância, toque, silêncio). Com o idoso, a linguagem se adapta à **capacidade cognitiva**, aos déficits sensoriais e à orientação; com a paciente tímida, **inicia-se com perguntas abertas**, aceitando o silêncio, sem preencher a pausa.|q-famema2022-009,q-uspsp4-079]] O médico também sofre: a **idealização da profissão** gera frustração, com repercussão sobre a saúde do médico (sintomas psiquiátricos, fadiga e ideação suicida).|q-unifesp2023-022]]`,
          texto: `- **Empatia**: colocar-se no lugar do outro; pressuposto do **vínculo**. {q-fmabc2022-089}
- O cuidado implica **responsabilização, vínculo e reconhecimento do outro como sujeito**. {q-tp20252-109}
- Mãe com raiva e palavras ofensivas: **legitimar e validar a emoção**. {q-unifesp2022-067}
- Mãe exausta "invisível": **ouvir ativamente, validar** e, com consentimento, compartilhar com a equipe. {q-sirio2026-099}
- **Sinais não verbais** fazem parte da comunicação; com o idoso, adaptar a linguagem à capacidade cognitiva e sensorial. {q-famema2022-009}
- Paciente tímida: **perguntas abertas** e silêncio acolhedor. {q-uspsp4-079}
- A **idealização** da profissão gera frustração com repercussão na saúde do médico. {q-unifesp2023-022}` },
      ],
    },
    {
      id: "entrevista", titulo: "Habilidades de entrevista: abrir a consulta, demandas e mudança de comportamento",
      introducao: `[[A entrevista clínica começa **aberta**: uma pergunta ampla ("como tem passado?"), sem interromper, com encorajamento ("hum", "conte mais") e reflexão em espelho, para que a pessoa diga o que a trouxe. Só depois vêm as perguntas fechadas.|q-usp2023-072,q-uspsp4-079]] O mecanismo é a **primeira fala**: quem é interrompido nos primeiros segundos deixa o motivo real para o fim ("a mão na maçaneta").`,
      fragmentos: [
        { id: "ent-habilidades", titulo: "Perguntas abertas, demanda aditiva, registro e transmissão do cuidado", conferir: true,
          questoes: ["q-usp2023-072","q-uspsp3-015","q-scmsp2022-100","q-scmsp2023-089","q-amrigs2022-058","q-sirio2025-013"],
          prosa: `[[A **demanda aditiva** é um segundo (ou terceiro) motivo que aparece **no fim** da consulta; previne-se logo no início com a pergunta "**há algo mais** que você gostaria de tratar hoje?", construindo a pauta com a pessoa, em vez de deixá-la surgir na saída.|q-uspsp3-015]]

[[O **registro** tem lógica própria. O **SOAP** separa o **S** (subjetivo, o que a pessoa traz, dividido em S1, S2...), o **O** (objetivo), o **A** (lista de problemas, que **não** é a lista de todos os diagnósticos levantados) e o **P** (plano). Tanto no registro orientado por problemas como no tradicional, o cuidado é com a **coleta adequada**, fugindo dos extremos (coletar demais ou de menos).|q-scmsp2023-089,q-scmsp2022-100]]

[[A **passagem de plantão** é um ato de comunicação: uma frase sem gravidade, pendências e plano, com saída antes das perguntas do colega, é comportamento de **pré-confiabilidade** (nas atividades profissionais confiáveis, EPAs). A **visita interprofissional** de beira de leito ao idoso complexo tem por objetivo **otimizar os recursos** e o plano de cuidado.|q-amrigs2022-058,q-sirio2025-013]]`,
          texto: `- Consulta aberta: **pergunta aberta**, sem interromper, com **encorajamento** e reflexão. {q-usp2023-072}
- **Demanda aditiva**: prevenir no início com "há algo mais que você gostaria de tratar hoje?". {q-uspsp3-015}
- **SOAP**: S (subjetivo, pode ter S1, S2...), O, A (lista de problemas) e P. {q-scmsp2023-089}
- Nos registros orientado por problemas e tradicional: **coleta adequada**, sem extremos. {q-scmsp2022-100}
- **Passagem de plantão** apressada e sem plano: comportamento de **pré-confiabilidade**. {q-amrigs2022-058}
- **Visita interprofissional** ao idoso complexo: **otimizar os recursos**. {q-sirio2025-013}` },
        { id: "ent-mudanca", titulo: "Mudança de comportamento: estágios, entrevista motivacional e decisão compartilhada", conferir: true, diretrizes: ["prochaska"],
          questoes: ["q-scmsp2021-090","q-didepm-080","q-uspsp1-100","q-uspsp3-013","q-tp20252-105"],
          prosa: `[[No **modelo transteórico**, a pessoa passa por pré-contemplação, **contemplação** (sabe que precisa mudar, mas está **ambivalente**), preparação, ação e manutenção. O fumante que diz "sei que preciso parar, mas o cigarro me ajuda a relaxar" está na **contemplação**, e a conduta é **explorar a ambivalência** e discutir prós e contras, **sem confrontar** nem prescrever de imediato.|q-didepm-080]]

[[A **entrevista motivacional** é o estilo de conversa para quem não consegue mudar ("não consegui parar de fumar, não comecei a fazer exercício"): escuta, reflexão e resumo, deixando a **própria pessoa** dizer por que e como mudaria. Por isso o plano de cuidados melhor não lista ordens ("você precisa abandonar o cigarro"), e sim pergunta: "que tal escolher **uma pequena mudança** que você ache que pode começar agora?".|q-scmsp2021-090,q-uspsp1-100,q-uspsp3-013]]

[[Diante da mãe que **recusa a vacina** por causa de uma informação da internet, o médico **acolhe, explica a importância das vacinas, discute as informações trazidas e esclarece riscos e benefícios**; não a rotula nem aciona o Conselho Tutelar de imediato.|q-tp20252-105]]`,
          texto: `- **Contemplação**: sabe que precisa mudar, mas está ambivalente; **explorar a ambivalência**, prós e contras. {q-didepm-080}
- **Entrevista motivacional**: para quem não consegue mudar hábitos; a pessoa verbaliza a mudança. {q-scmsp2021-090}
- Plano que respeita o paciente: **escolher uma pequena mudança viável**, não impor metas. {q-uspsp1-100,q-uspsp3-013}
- Recusa de vacina por informação da internet: **acolher, explicar e discutir as informações**. {q-tp20252-105}` },
      ],
    },
    {
      id: "malas-noticias", titulo: "Comunicação de más notícias: o protocolo SPIKES",
      introducao: `[[O **SPIKES** organiza a conversa difícil em seis passos: **S** (*Setting up*: preparar o ambiente e o contexto), **P** (*Perception*: perceber o que a pessoa já sabe), **I** (*Invitation*: convidar, perguntando quanto e como quer saber), **K** (*Knowledge*: dar a informação, em trechos pequenos e sem jargão), **E** (*Emotions*: responder à emoção com empatia) e **S** (*Strategy and Summary*: resumir e combinar o plano).|q-adap22-067,q-scmsp2023-100,q-unifesp2025-095]] A lógica é que a informação só é ouvida depois que a emoção é acolhida.`,
      fragmentos: [
        { id: "spikes-passos", titulo: "Os seis passos, a emoção do outro e a vontade de saber", conferir: true, diretrizes: ["spikes"],
          questoes: ["q-adap25-095","q-adap22-067","q-unifesp2025-095","q-scmsp2023-016","q-scmsp2023-100","q-adap23-022","q-usp2023-042"],
          prosa: `A **primeira etapa** é **preparar o ambiente**: privacidade, tempo, sentar-se, desligar interrupções. [[Antes de dar a notícia, **investigue o conhecimento e as angústias** dos pais (percepção) e **identifique o que desejam saber** (convite); só então compartilhe a informação, em linguagem clara.|q-unifesp2025-095,q-usp2023-042]] A paciente com neoplasia avançada que perdeu a resposta ao tratamento é abordada primeiro com a pergunta sobre suas **expectativas e percepção** da doença, para alinhar o entendimento, e não com o adiamento ou a informação seca.

[[Quando os pais reagem com choro, silêncio ou negação, **reconhece-se a emoção, demonstra-se compreensão e faz-se uma pausa em silêncio** antes de continuar; não se segue com o protocolo de tratamento, não se tranquiliza com "a doença é curável" nem se medica o choro.|q-adap25-095]]

[[Na etapa do **sumário**, **checa-se o entendimento** da paciente e de familiares depois da notícia e combina-se a estratégia de cuidado; a consulta termina assim. O SPIKES prevê que as emoções sejam **exploradas e acolhidas**, e a etapa do convite pede ao paciente que diga o quanto quer saber.|q-scmsp2023-016,q-scmsp2023-100]]

[[Quando a filha pede "não conte a verdade ao meu pai", o médico **pergunta ao próprio paciente quanto e como deseja saber**, respeita a preferência dele e comunica **sem mentir**; omitir, revelar de imediato ou encaminhar ao psiquiatra não são o caminho.|q-adap23-022]]`,
          texto: `- **SPIKES**: preparar (Setting up), percepção, convite, conhecimento, emoções, estratégia e sumário. {q-adap22-067,q-scmsp2023-100}
- **Primeiro passo**: preparar o ambiente e o contexto (privacidade, tempo, sentar-se). {q-adap22-067}
- Comunicar a leucemia: investigar o conhecimento e as angústias, identificar o que desejam saber, compartilhar de forma clara. {q-unifesp2025-095}
- Diante do choro e do silêncio: **reconhecer a emoção, demonstrar compreensão e fazer uma pausa**. {q-adap25-095}
- **Sumário**: checar o entendimento de paciente e familiares e combinar a estratégia de cuidado. {q-scmsp2023-016,q-scmsp2023-100}
- Progressão de doença sem resposta: **perguntar as expectativas e a percepção** do paciente. {q-usp2023-042}
- A família pede para omitir o diagnóstico: **perguntar ao paciente quanto e como quer saber**, sem mentir. {q-adap23-022}` },
      ],
    },
    {
      id: "etica", titulo: "Ética e direitos: sigilo, adolescentes, acompanhante e decisão",
      introducao: `[[O **sigilo** é a base da confiança: sem a certeza de que o que diz não vai sair da consulta, o paciente esconde o que importa, e o diagnóstico é tardio. Por isso o Código de Ética Médica o protege, com **exceções** previstas: dever legal (**notificação compulsória**), justa causa e risco grave.|q-sessp2025-086,q-sessp2025-090,q-sirio2021-030]]`,
      fragmentos: [
        { id: "eti-sigilo-direitos", titulo: "Sigilo, adolescente, acompanhante, direitos e violência obstétrica", conferir: true, diretrizes: ["cem"],
          questoes: ["q-sessp2025-086","q-sessp2025-090","q-sessp2023-091","q-sirio2021-030","q-sirio2026-088","q-famema2021-069","q-sessp2022-076"],
          prosa: `[[Para o **adolescente** que pede que os pais não saibam, o sigilo vale **somente se o problema não representa risco grave** à sua saúde ou à de terceiros; a jovem de 17 anos que vem sozinha e está sem menstruar recebe o **teste de gravidez** e, se positivo, combina com ela a melhor forma e o melhor momento de envolver a família, sem convocar de imediato os responsáveis nem o Conselho Tutelar.|q-sessp2025-086,q-sessp2023-091]]

[[Diante de doença infectocontagiosa que o paciente se recusa a informar a quem convive, o médico **notifica as autoridades de saúde pública** (dever legal), e não avisa diretamente a pessoa em risco nem apenas mantém o segredo. Em contrapartida, os detalhes de um evento constrangedor (objeto retido no reto durante prática sexual) são **sigilosos**, inclusive com a esposa e os filhos.|q-sessp2025-090,q-sirio2021-030]]

[[A **acompanhante** da paciente, como a esposa, tem **direito de permanecer** na consulta, garantido por lei, independentemente da relação; o médico não pode impor a saída. A **Lei nº 10.216/2001** garante direitos às pessoas com transtorno mental (livre acesso aos meios de comunicação, tratamento em ambiente terapêutico, entre outros), e a **violência obstétrica** liga-se ao trabalho de profissionais **e** a falhas estruturais do sistema.|q-sirio2026-088,q-famema2021-069,q-sessp2022-076]]`,
          texto: `- **Adolescente** pede sigilo: respeitar **salvo risco grave** à sua saúde ou à de terceiros. {q-sessp2025-086}
- Jovem de 17 anos sem menstruar: **teste de gravidez** e combinar com ela como e quando envolver a família. {q-sessp2023-091}
- Doença infectocontagiosa e paciente que se recusa a avisar: **notificar as autoridades de saúde pública**. {q-sessp2025-090}
- Evento constrangedor (objeto retido no reto): manter o **sigilo**, inclusive diante da esposa e do filho. {q-sirio2021-030}
- **Acompanhante** (esposa): **direito garantido por lei** de permanecer na consulta. {q-sirio2026-088}
- **Lei 10.216/2001**: direitos das pessoas com transtorno mental (livre acesso à comunicação, entre outros). {q-famema2021-069}
- **Violência obstétrica**: relacionada a profissionais e a falhas estruturais. {q-sessp2022-076}` },
        { id: "eti-decisao-quaternaria", titulo: "Decisão compartilhada, expectativas do paciente e prevenção quaternária na conversa", conferir: true,
          questoes: ["q-sirio2024-087","q-sirio2025-088","q-sirio2026-098","q-sirio2027-081"],
          prosa: `[[Quando o paciente chega pedindo **check-up completo** por medo de câncer (um colega adoeceu) ou com uma lista de exames da internet, a atitude é **reconhecer a preocupação, explicar com clareza a ausência de indicação clínica** e discutir os **riscos do rastreamento sem indicação** (falso-positivos, sobrediagnóstico e sobretratamento), restringindo o pedido aos exames recomendados.|q-sirio2026-098,q-sirio2027-081]]

[[A **decisão compartilhada** vale também para o tratamento: na mulher de 55 anos com risco cardiovascular em 10 anos abaixo de 5% e LDL de 70 mg/dL, que questiona a estatina, prioriza-se a intervenção **não farmacológica** (dieta e atividade física), pesando o benefício absoluto mínimo contra o risco de medicalização. E evitar a internação desnecessária da idosa de 83 anos com demência, dor e abdome endurecido há 2 dias é **prevenção quaternária**.|q-sirio2025-088,q-sirio2024-087]]`,
          texto: `- Check-up pedido por medo: **explicar a ausência de indicação** e os **riscos do rastreamento** sem indicação. {q-sirio2026-098,q-sirio2027-081}
- Mulher de 55 anos, risco baixo, questiona estatina: **intervenções não farmacológicas** (decisão compartilhada). {q-sirio2025-088}
- Idosa de 83 anos com demência e abdome endurecido: proteger de internação desnecessária = **prevenção quaternária**. {q-sirio2024-087}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-scmsp2023-084","q-einstein2027-064","q-scmsp2021-100","q-sessp2025-090"],
          prosa: `[[A regra é que o MCCP atual tem **quatro** componentes e a versão anterior, **seis**; a Santa Casa de 2023 cobrou os quatro atuais, e o Einstein de 2027 listou como componentes a prevenção e promoção e o ser realista, da versão de seis.|q-scmsp2023-084,q-einstein2027-064]] [[Para a doença infectocontagiosa, a regra é o dever legal de notificar; a SES-SP 2025 deu "notificar as autoridades" mesmo havendo risco para quem convive, sem pedir a quebra direta do sigilo.|q-sessp2025-090]] [[A paciente que teve infarto e revascularização e chega à consulta com sofrimento: a Santa Casa de 2021 cobrou o **processo saúde-doença**, e não a decisão compartilhada nem a entrevista motivacional.|q-scmsp2021-100]]`,
          texto: `- Regra: MCCP atual tem 4 componentes e a versão anterior, 6; a prova (Einstein 2027) listou como componentes os da versão de **seis**. {q-einstein2027-064}
- Regra: a versão mais atualizada tem 4; a prova (SCMSP 2023) cobrou a ausência de "incorporar prevenção e promoção". {q-scmsp2023-084}
- Regra: notificar a doença de notificação compulsória; a prova (SES-SP 2025) cobrou **notificar as autoridades**. {q-sessp2025-090}
- Regra: o contexto do adoecer faz parte da consulta; a prova (SCMSP 2021) cobrou **processo saúde-doença**. {q-scmsp2021-100}` },
      ],
    },
  ],
});
