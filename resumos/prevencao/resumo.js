/* resumos/prevencao/resumo.js — resumo adaptativo de prevenção: história natural e níveis de prevenção (Leavell e
   Clark), estratégia populacional × alto risco (Rose), promoção da saúde, rastreamento (critérios, vieses,
   sobrediagnóstico, recomendações por idade e risco) e prevenção quaternária. Molde e regras: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- prevencao */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "prevencao",
  titulo: "Prevenção, rastreamento e prevenção quaternária",
  assunto: "ass-prevencao",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "uspstf", texto: "USPSTF — recomendações de rastreamento (câncer de pulmão com tomografia de baixa dose, aneurisma de aorta abdominal, osteoporose, próstata e outros)", lidoEm: null },
    { id: "inca-rastreio", texto: "INCA/Ministério da Saúde — Diretrizes para o rastreamento do câncer de mama (mamografia bienal) e do câncer colorretal (sangue oculto nas fezes) e Nota técnica sobre rastreamento de próstata", lidoEm: null },
    { id: "rastreio-colo", texto: "Rastreamento do câncer do colo do útero (MS): citologia de 25 a 64 anos e teste de DNA-HPV (Portaria SAES/SECTICS 13/2025)", lidoEm: null },
    { id: "pnps", texto: "Ministério da Saúde — Política Nacional de Promoção da Saúde (Portaria nº 2.446/2014), Guia Alimentar para a População Brasileira (2014) e OMS — Diretrizes de atividade física e comportamento sedentário (2020)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas, sem reposição.", questoes: ["q-unifesp2025-060", "q-amrigs2022-092"] },
  ],
  doencas: [
    {
      id: "niveis", titulo: "História natural da doença e níveis de prevenção",
      introducao: `[[A **história natural da doença** é o curso que ela segue sem intervenção médica: do período **pré-patogênico** (fatores de risco, sem doença) ao **patogênico** (lesão, sintomas, complicações, cura, sequela ou morte). Cada nível de prevenção atua num ponto dessa linha.|q-iamspe2021-074,q-iamspe2021-073,q-unicamp2023-079]]

[[No modelo de **Leavell e Clark**, a **prevenção primária** age antes da doença (promoção da saúde e proteção específica, como vacina e saneamento), a **secundária** detecta e trata cedo (diagnóstico precoce, rastreamento), a **terciária** limita sequelas e reabilita; a **quaternária**, acrescentada pela medicina de família, protege o paciente do **excesso de intervenção**.|q-iamspe2025-084,q-scmsp2025-085,q-sirio2021-082]]

Veja também: **Desenhos de estudo** e **Medidas epidemiológicas** (viés de antecipação, valor preditivo), **Imunização** (proteção específica), **Estratégia Saúde da Família** (prevenção quaternária na APS) e **Vigilância em saúde**.`,
      fragmentos: [
        { id: "prev-niveis", titulo: "Primária, secundária, terciária e a ligação com o nível de atenção", conferir: true,
          figuras: [{ arquivo: "figuras/niveis-prevencao.svg", legenda: "Esquema autoral: linha da história natural da doença e o nível de prevenção que atua em cada ponto." }],
          questoes: ["q-iamspe2021-073","q-iamspe2021-074","q-iamspe2025-084","q-scmsp2025-085","q-unicamp2023-079","q-sirio2021-082","q-usp2023-075","q-scmsp2023-090","q-usp2025-106","q-sirio2022-095","q-fmabc2021-065","q-sirio2024-088","q-adap22-051","q-unicampdis2025-094","q-unicampdis2024-053","q-sirio2025-062","q-famema2021-063","q-fmabc2022-086","q-sessp2023-089","q-famerp2022-004","q-sessp2026-092"],
          prosa: `**Primária** = evitar que a doença **apareça**: [[promoção da saúde (coleta de resíduos sólidos, educação alimentar, saneamento) e **proteção específica** (vacina contra HPV, sarampo, raiva, influenza). Toda vacina é prevenção **primária**, mesmo aplicada a quem tem outra doença.|q-scmsp2025-085,q-sirio2021-082,q-sirio2025-062,q-usp2025-106]] **Secundária** = **diagnosticar e tratar cedo**, ainda no estágio em que o tratamento muda o curso: rastreamento, busca ativa de hipertensos assintomáticos e início do tratamento, mamografia, hemoglobina... [[A criança que recebe vacina e solução de reidratação oral tem prevenção primária (vacina) e secundária (tratamento precoce da diarreia); a mulher com HIV, candidíase oral e disfagia que recebe cotrimoxazol (contra a pneumocistose) e isoniazida (infecção latente da tuberculose) está em prevenção **primária**, porque as duas medidas evitam o aparecimento de outras doenças.|q-usp2025-106,q-sirio2022-095,q-fmabc2021-065,q-adap22-051,q-unicampdis2025-094]]

**Terciária** = **limitar a incapacidade** e reabilitar quem já tem a doença: ambulatório de síndrome pós-covid, seguimento e orientação a quem já adoeceu, grupo de integração comunitária de criança com transtorno global do desenvolvimento no CAPS-IJ. [[Os níveis **não** coincidem com os níveis de **atenção** (primária, secundária, terciária): uma ação de prevenção terciária pode acontecer na atenção secundária (CAPS).|q-usp2023-075,q-famema2021-063]]

A **prevenção quinquenária** é a proposta de cuidado com a saúde do **próprio profissional** (esgotamento do médico que atende todo o tipo de demanda numa unidade); a medida que diagnostica o residente com burnout já sintomático é **secundária** (detecção precoce com instrumento validado). A definição de saúde pública de Winslow (1920) menciona evitar doenças, prolongar a vida e desenvolver a saúde, e a **organização de serviços** para diagnóstico precoce e tratamento preventivo (secundária).`,
          texto: `- **História natural da doença**: o curso da doença sem intervenção médica. {q-iamspe2021-074,q-unicamp2023-079}
- **Período pré-patogênico**: promoção da saúde e **proteção específica**. {q-iamspe2021-073}
- **Prevenção secundária**: detecção precoce e medidas para limitar a progressão. {q-iamspe2025-084,q-unicamp2023-079}
- **Primária**: promoção (coleta de resíduos sólidos) e proteção específica (vacina HPV, sarampo, influenza). {q-scmsp2025-085,q-sirio2021-082,q-sirio2025-062}
- Vacina + SRO + orientação alimentar numa criança com diarreia: **primária e secundária**. {q-usp2025-106}
- Busca ativa de hipertensos assintomáticos e início precoce do tratamento: **secundária**. {q-unicampdis2025-094,q-adap22-051}
- Meta 90-90-90 (diagnosticar 90% dos infectados pelo HIV): **prevenção secundária**. {q-fmabc2021-065}
- HIV com candidíase e disfagia, com cotrimoxazol e isoniazida: **prevenção primária** (evita pneumocistose e tuberculose). {q-sirio2022-095}
- **Terciária**: fisioterapia motora na hemiplegia e reabilitação (mesmo na atenção secundária, como o CAPS); pedir **PSA a todos os homens** acima de 50 anos **não** é terciária, e sim rastreamento. {q-usp2023-075,q-sirio2021-082}
- Ambulatório de síndrome pós-covid: **terciária**; vacinação e distanciamento: primária. {q-famema2021-063}
- Mulher de 42 anos com tabagismo, anticoncepcional combinado e trombose prévia: a ação cobrada foi de **prevenção primária**. {q-unicampdis2024-053}
- Registro do plano de uma idosa (vacina, ajuste do antidiabético, tranquilizar sem tomografia): primária, terciária e quaternária. {q-scmsp2023-090}
- Atenção da família (agenda no horário de folga e planejar a doença crônica da mãe): **secundária**. {q-sirio2024-088}
- **Quinquenária**: cuidado com a saúde do próprio profissional que atende todo tipo de demanda. {q-sessp2023-089}
- Burnout nos residentes: o instrumento validado que detecta quem já tem sintomas é **secundária**. {q-sessp2026-092}
- Mamografia de rastreamento é **secundária** (e a decisão de não rastrear sem indicação, quaternária). {q-famerp2022-004}
- Winslow (1920): saúde pública = evitar doenças, prolongar a vida e desenvolver a saúde, o que inclui a **prevenção secundária**. {q-fmabc2022-086}` },
        { id: "prev-promocao", titulo: "Promoção da saúde, estratégia populacional e vulnerabilidade", conferir: true, diretrizes: ["pnps"],
          questoes: ["q-usp2023-076","q-usp2024-074","q-sessp2025-087","q-sessp2025-088","q-sirio2026-084","q-sessp2025-097","q-sessp2025-089","q-fmabc2023-083","q-tp20222-112","q-usp2022-040","q-einstein2022-071","q-einstein2022-072","q-fmabc2026-092","q-iamspe2025-086","q-unifesp2022-051","q-udisc20262-012","q-simepm89-078"],
          prosa: `A **promoção da saúde** age sobre os **determinantes** (moradia, saneamento, renda, ambiente, alimentação, transporte), e não só sobre a doença: [[a Política Nacional de Promoção da Saúde dá como exemplos a redução da poluição urbana, a orientação para atividade física e as políticas que garantem diversidade; num bairro com doença respiratória, oficinas sobre umidade e ventilação nas casas são promoção; em surto de dengue, a eliminação dos criadouros e a vedação de caixas d'água; em comunidade ribeirinha, ferver a água; em cidade com hipertensão e diabetes, grupos de caminhada em parques.|q-usp2023-076,q-sessp2025-087,q-sirio2026-084,q-sessp2025-097,q-sessp2025-088]]

[[A ação precisa **chegar a quem não chega**: vacinar em domicílio idosos com comorbidades e mobilidade reduzida aumenta a adesão mais que panfletos ou palestras.|q-sessp2025-089]] As atividades educativas do pré-natal de baixo risco na atenção primária são ações de promoção.

[[**Geoffrey Rose** distinguiu duas estratégias: a **populacional**, que reduz a exposição da **população inteira** e desloca toda a curva de distribuição do risco (efeito grande no total, risco pequeno por pessoa; o distanciamento social é populacional, temporário e "busca a raiz"), e a de **alto risco**, que identifica e trata quem está no extremo.|q-iamspe2025-086,q-unifesp2022-051]] [[Os modelos de **determinação social** (Dahlgren e Whitehead) organizam os determinantes em camadas: individuais, redes comunitárias, condições de vida e de trabalho, macroambiente. A **vulnerabilidade** tem três dimensões: **individual** (conhecimento, comportamento), **social** (acesso à informação, escolaridade, renda) e **programática** (qualidade do serviço): a estudante de 16 anos e a bióloga com DIP têm vulnerabilidades diferentes.|q-fmabc2023-083,q-tp20222-112,q-usp2022-040]]

[[A OMS (2020) recomenda a adultos **150 a 300 minutos por semana** de atividade aeróbica moderada, e a crianças e adolescentes, em média **60 minutos por dia**; os **adolescentes** são o grupo com maior inatividade (cerca de 81%). O **Guia Alimentar** classifica os alimentos em in natura, minimamente processados, processados e ultraprocessados, e orienta preferir os dois primeiros.|q-einstein2022-071,q-einstein2022-072,q-fmabc2026-092]] [[A intervenção que mais aumenta a expectativa de vida da população-alvo é convencer um **fumante de 35 anos a parar** de fumar, mais que rastreamentos.|q-udisc20262-012]]`,
          texto: `- **Promoção** (PNPS): reduzir a poluição urbana, estimular atividade física, garantir diversidade. {q-usp2023-076}
- Bairro com doenças respiratórias: **oficinas sobre umidade e ventilação**. {q-sessp2025-087}
- Dengue: **eliminação de criadouros**, vedação de caixas d'água. {q-sirio2026-084}
- Comunidade ribeirinha com diarreia: **ferver a água**. {q-sessp2025-097}
- Hipertensão e diabetes na cidade: **grupos de caminhada** e atividade física. {q-sessp2025-088}
- Idosos com comorbidades que não vão à campanha: **vacinação em domicílio**. {q-sessp2025-089}
- Atividades educativas no pré-natal de baixo risco: **promoção da saúde** na APS. {q-usp2024-074}
- **Rose**: estratégia **populacional** desloca a curva de toda a população; **alto risco** trata quem está no extremo. {q-iamspe2025-086}
- **Distanciamento social**: estratégia populacional, temporária e paliativa. {q-unifesp2022-051}
- Estudos citados por Starfield: médicos atendem melhor pacientes mais jovens, bem vestidos e instruídos: **iniquidade** no processo de cuidado. {q-simepm89-078}
- **Dahlgren e Whitehead**: camadas de determinantes; os distais (políticas, condições de trabalho) pesam. {q-fmabc2023-083}
- Vulnerabilidade: **individual**, **social** e **programática**. {q-tp20222-112,q-usp2022-040}
- OMS: adultos **150 a 300 min/semana**; adolescentes, 60 min/dia em média, e são os mais inativos (81%). {q-einstein2022-071,q-einstein2022-072}
- **Guia Alimentar**: in natura, minimamente processados, processados, ultraprocessados. {q-fmabc2026-092}
- Maior ganho de expectativa de vida: **parar de fumar** aos 35 anos. {q-udisc20262-012}` },
      ],
    },
    {
      id: "rastreamento", titulo: "Rastreamento: critérios, vieses e recomendações",
      introducao: `[[**Rastreamento** é aplicar um teste a pessoas **assintomáticas** para encontrar doença em fase pré-clínica. Seu objetivo é **reduzir a morbimortalidade** da doença rastreada, e não simplesmente diagnosticar mais cedo.|q-unesp2026-095,q-adap26-081,q-simepm89-067]] Rastrear é uma intervenção com custos e danos (falso-positivos, sobrediagnóstico, ansiedade, cascata de exames), portanto só se justifica quando o benefício para a população supera esses danos.`,
      fragmentos: [
        { id: "rast-criterios-vieses", titulo: "Critérios para rastrear, desfechos válidos e vieses", conferir: true,
          questoes: ["q-adap26-081","q-uspsp5-083","q-unesp2026-095","q-amrigs2021-084","q-simepm89-067","q-fmabc2024-086","q-unifesp2025-052","q-adap25-052","q-amrigs2024-098","q-uspsp3-020","q-scmsp2025-090","q-uspsp4-085","q-unifesp2026-081","q-usp2023-073","q-iamspe2023-071","q-scmsp2021-083","q-famema2021-071","q-sirio2022-094","q-sirio2021-093","q-sirio2022-093","q-sirio2023-093"],
          prosa: `Para valer a pena, a doença precisa ser **importante** e ter **história natural conhecida** com **fase pré-clínica detectável**; um **tratamento** que, iniciado nessa fase, melhore o prognóstico; um **teste** aceitável, seguro e com bom desempenho; e **custo** proporcional. [[Uma doença com prevalência de 1 caso em 10.000 e **sem tratamento aceitável** para quem é descoberto é a falha que invalida o programa, mesmo com o teste disponível. E um teste muito sensível, mas com baixa especificidade, gera mais falso-positivos que benefícios.|q-adap26-081,q-uspsp5-083]]

[[O desfecho que prova o benefício é a **mortalidade** pela doença rastreada (ou geral), medida em **ensaio randomizado**; a **sobrevida em 5 anos** e a **taxa de detecção** enganam: o diagnóstico antecipado em 3 anos faz a sobrevida subir de 40% para 70% **sem** mudar a morte, o que é o **viés de antecipação** (lead time); o rastreamento detecta mais os tumores de crescimento lento (viés de duração) e há viés de seleção quando quem se rastreia é mais saudável.|q-unifesp2025-052,q-adap25-052,q-amrigs2024-098,q-uspsp3-020]] A mamografia anual não faz as mulheres "viverem muito mais" por esse motivo.

[[O **sobrediagnóstico** é o diagnóstico correto de uma condição que **nunca causaria sintomas ou morte**: o câncer de tireoide, cuja incidência aumentou muito com a mortalidade estável, é o exemplo; ele é um dos principais problemas dos programas de rastreamento, e é um dos motivos da prevenção quaternária.|q-usp2023-073,q-iamspe2023-071,q-unifesp2026-081,q-amrigs2021-084]]

[[Numa metanálise de ganho de dias de vida, apenas a **sigmoidoscopia flexível** teve intervalo de confiança sem o zero (cerca de 110 dias), e o rastreamento do colorretal por colonoscopia, a mamografia e outros não aumentaram a sobrevida de modo significativo: muitas intervenções não conseguem mostrar efeito sobre a mortalidade, apesar da alta sensibilidade.|q-uspsp4-085,q-fmabc2024-086]] A estratégia de rastreamento em dois tempos (teste A em maiores de 40 anos e complementação com C se positivo) é a mais eficiente quando a prevalência é maior numa faixa etária.`,
          texto: `- **Rastreamento**: teste em **assintomáticos** para reduzir a **morbimortalidade** da doença rastreada. {q-unesp2026-095,q-amrigs2021-084}
- O objetivo principal **não** é só diagnosticar mais cedo; "diagnóstico precoce" sem benefício não basta. {q-simepm89-067}
- Requisitos: doença com **fase pré-clínica detectável** e **tratamento** que melhore o prognóstico quando iniciado nela. {q-adap26-081}
- Sem **tratamento aceitável** para a doença descoberta, o rastreamento não se justifica. {q-uspsp5-083}
- Desfecho para provar que prolonga vidas: **mortalidade** (geral ou específica), não sobrevida em 5 anos. {q-unifesp2025-052}
- **Viés de antecipação**: sobrevida sobe de 40% para 70% sem mudar a mortalidade. {q-adap25-052,q-amrigs2024-098}
- Mamografia anual "faz viver muito mais": **viés de tempo de antecipação**. {q-uspsp3-020}
- **Sobrediagnóstico**: correto, mas sem sintoma nem morte (câncer de tireoide, com mortalidade estável). {q-usp2023-073,q-iamspe2023-071}
- O sobrediagnóstico é um dos principais problemas do rastreamento; a prevenção quaternária se impõe diante do excesso. {q-amrigs2021-084,q-unifesp2026-081}
- Muitas intervenções de rastreio **não reduzem a mortalidade** apesar da alta sensibilidade. {q-fmabc2024-086}
- Metanálise de dias de vida ganhos: só a **sigmoidoscopia flexível** teve IC sem o zero. {q-uspsp4-085}
- Doença mais prevalente acima dos 40 anos: rastrear nessa faixa com o exame A e complementar com C se positivo. {q-scmsp2025-090}
- A crítica das campanhas de prevenção de benefício duvidoso faz parte da prevenção; exames em excesso custam à sociedade. {q-scmsp2021-083}
- **Disease mongering** (promoção de doença): a indústria cria doença para vender exame. {q-famema2021-071}
- Só se rastreia doença cuja **história natural muda com a intervenção precoce**. {q-sirio2022-094}
- Benefício do programa = queda da **mortalidade**, não da incidência (o rastreio aumenta a incidência ao achar mais casos). {q-sirio2021-093}
- **Falsos-positivos** pesam na escolha do teste; num programa organizado para câncer frequente, a prova pediu **alto valor preditivo positivo**. {q-sirio2022-093,q-sirio2023-093}` },
        { id: "rast-recomendacoes", titulo: "Quem rastrear, para quê e com que intervalo", conferir: true, diretrizes: ["uspstf","inca-rastreio","rastreio-colo"],
          questoes: ["q-adap25-060","q-scmsp2021-096","q-scmsp2023-088","q-tp20231-117","q-sessp2026-082","q-usprp2023-041","q-uspsp3-016","q-sessp2023-087","q-iamspe2022-008","q-einstein2021-043","q-einstein2026-067","q-famerp2026-013","q-amrigs2022-093","q-iamspe2023-069","q-tp20202-108","q-unicampdis2024-057","q-uspsp1-108","q-iamspe2026-088","q-tp20222-116","q-unicampdis2022-024","q-fmabc2024-089","q-sessp2025-026"],
          prosa: `A pergunta típica descreve uma pessoa assintomática e pede **o que oferecer**; a resposta vem da **idade, do sexo e do risco**. [[Mulher de 50 a 69 anos (ou até 74 nas atualizações): **mamografia a cada dois anos**; de 25 a 64 anos: **citologia** (ou teste de DNA-HPV na norma recente); de 50 a 75 anos: **pesquisa de sangue oculto nas fezes** a cada dois anos para o câncer colorretal. A mulher de 58 anos recebe mamografia, colpocitologia e sangue oculto; a de 53 anos com histerectomia total por miomatose recebe mama e colorretal mais lipídios, mas **não** colo do útero.|q-iamspe2022-008,q-scmsp2023-088,q-tp20231-117]]

[[O rastreamento do câncer de **pulmão** com **tomografia de baixa dose anual** é para **adultos de 50 a 80 anos com 20 ou mais maços-ano** que fumam ou pararam há menos de 15 anos; o **ultrassom de aorta abdominal em exame único** é para **homens de 65 a 75 anos que já fumaram**. Por isso o ex-tabagista de 30 maços-ano que parou há 10 anos recebe os dois, o de 71 anos que fuma há quarenta anos também, e o que parou há 30 anos (15 maços-ano) recebe só o ultrassom abdominal.|q-adap25-060,q-scmsp2021-096,q-sessp2026-082]]

[[O paciente que pede "check-up" e **não tem indicação** deve ser informado, e não examinado: o homem de 46, 52 ou 80 anos que pede PSA tem **baixa probabilidade e benefício incerto**, e a decisão exige avaliar a **expectativa de vida (> 10 anos)** e o desejo informado; a radiografia de tórax em tabagista dá "falsa segurança"; a mamografia em mulher de 35 anos tem VPP baixo. O que se oferece a assintomáticos são aferição de PA, perfil lipídico e glicemia conforme o risco, **rastreamento de tabagismo** (e sua cessação, que é a medida mais eficaz), **sorologias de IST** no jovem sexualmente ativo, citologia a partir dos 25 anos e vacinas.|q-iamspe2023-069,q-iamspe2026-088,q-einstein2026-067,q-sessp2023-087,q-usprp2023-041,q-uspsp3-016,q-famerp2026-013,q-uspsp1-108]]

Sobre **osteoporose**, a USPSTF recomenda rastrear mulheres com 65 anos ou mais e as mais jovens de risco; para homens, a evidência é insuficiente. Em prevenção cardiovascular, anti-hipertensivos reduzem eventos, e a estatina em prevenção primária e a aspirina exigem ponderar risco e benefício.`,
          texto: `- **Mamografia** a cada dois anos (50 a 69; atualizações até 74); **colpocitologia** 25 a 64 anos; **sangue oculto nas fezes** de 50 a 75 anos. {q-iamspe2022-008,q-scmsp2023-088,q-tp20231-117}
- Mulher de 53 anos com histerectomia total por miomatose: mama, cólon e reto, dislipidemia (sem colo do útero). {q-tp20231-117}
- Mulher de 58 anos: mamografia, colpocitologia e sangue oculto. {q-scmsp2023-088}
- **TC de tórax de baixa dose anual**: tabagista de 50 a 80 anos, 20 maços-ano, fuma ou parou há < 15 anos. {q-adap25-060,q-scmsp2021-096}
- **Ultrassom de aorta abdominal** uma vez, em homens de 65 a 75 anos que já fumaram. {q-adap25-060,q-sessp2026-082,q-scmsp2021-096}
- Ex-tabagista de 15 maços-ano que parou há 30 anos, com HAS, DM e dislipidemia: só o **ultrassom abdominal**. {q-sessp2026-082}
- Mulher de 35 anos e baixa prevalência: **dispensar mamografia**. {q-sessp2023-087}
- Mulher de 34 anos que pede check-up: citologia, PA, perfil lipídico, glicemia e sorologias de IST. {q-famerp2026-013}
- Mulher de 39 anos sem queixas: **rastreamento de tabagismo**. {q-usprp2023-041}
- Homem de 19 anos: **sorologias de IST**. {q-uspsp3-016}
- Jovem de 18 anos: só as **sorologias** (a colpocitologia e a USTV geram cascata). {q-uspsp1-108}
- PSA em homem de 80 anos ativo: avaliar **expectativa de vida**, comorbidades e antecedentes antes de ofertar. {q-einstein2026-067}
- Radiografia de tórax em tabagista de 65 anos: **não solicitar** (falsa segurança); TCBD só se houver indicação. {q-iamspe2023-069}
- Mulher saudável de 33 anos que quer exames "para garantir": **esclarecer a não necessidade** e manter seguimento na UBS. {q-tp20202-108}
- Homem de 71 anos em boa saúde com exames de rotina em excesso: **prevenção quaternária**. {q-unicampdis2024-057}
- **Osteoporose** (USPSTF): para homens, a evidência é **insuficiente**. {q-einstein2021-043}
- Anti-hipertensivos reduzem eventos cardiovasculares; a estatina em prevenção primária exige ponderar. {q-amrigs2022-093}
- PSA em homem de 52 anos sem sintomas: analisar o **sobrediagnóstico** e o sobretratamento. {q-iamspe2026-088}
- Próstata (INCA/MS): **não rastrear** homem assintomático. {q-tp20222-116}
- Parente de 1º grau com câncer colorretal antes dos 60: **colonoscopia aos 40 anos ou 10 anos antes da idade do caso índice, o que vier primeiro** (mãe aos 49 → filhos aos 39). {q-unicampdis2022-024}
- Pulmão: **TC de baixa dose anual** de 50 a 80 anos, **20 maços-ano**, fumante ou que parou há menos de 15 anos. {q-fmabc2024-089}
- Mais frequentes no Brasil (sem pele): homem **próstata, colorretal, pulmão**; mulher **mama, colorretal, colo do útero**. {q-sessp2025-026}` },
        { id: "rast-marcadores", titulo: "Marcadores tumorais: seguimento, não rastreamento", conferir: true,
          questoes: ["q-famema2023-033","q-fmabc2023-015","q-fmabc2022-011"],
          prosa: `[[Marcador tumoral sérico é substância que o tumor libera, mas também tecidos normais inflamados ou em regeneração; por isso **não serve para rastrear** a população (baixo valor preditivo positivo) e sim para **acompanhar resposta e recidiva** de um câncer já diagnosticado. Pares cobrados: **CEA – colorretal**, **CA-125 – ovário**, **CA 19-9 – pâncreas e vias biliares**, **PSA – próstata**, **alfafetoproteína – hepatocarcinoma e tumor de células germinativas**, **beta-hCG – coriocarcinoma e testículo**, **BTA stat – bexiga** (na urina).|q-famema2023-033,q-fmabc2023-015]] [[A **alfafetoproteína sobe na hepatite crônica e na cirrose** (o fígado regenera), o que limita seu uso para hepatocarcinoma justamente em quem tem mais risco dele.|q-fmabc2022-011]]`,
          texto: `- CEA–colorretal, BTA stat–bexiga, AFP–fígado e germinativo. {q-famema2023-033,q-fmabc2023-015}
- AFP perde especificidade na **hepatite crônica**. {q-fmabc2022-011}` },
      ],
    },
    {
      id: "quaternaria", titulo: "Prevenção quaternária",
      introducao: `[[A **prevenção quaternária (P4)** foi proposta por **Marc Jamoulle** na WONCA, em 1995: é o conjunto de ações que identifica o paciente em **risco de excesso de medicalização** e o protege de intervenções invasivas ou desnecessárias, sugerindo procedimentos eticamente aceitáveis. O ganho está em **não fazer**.|q-iamspe2022-071,q-famerp2023-008]]

[[No diagrama de Jamoulle (eixos: com ou sem doença, e com ou sem sintomas), a P4 corresponde ao quadrante em que o paciente tem **sintomas ou queixa sem doença** (**illness sem disease**), que é onde há mais risco de exames e tratamentos excessivos; as outras três (primária, secundária, terciária) completam o quadro.|q-iamspe2022-071]] O mecanismo é o da **cascata**: um exame sem indicação traz um achado incidental, que pede outro exame, que causa um procedimento, e o dano cresce.`,
      fragmentos: [
        { id: "prev-quaternaria", titulo: "Reconhecer a prevenção quaternária: o que fazer e o que não fazer", conferir: true,
          questoes: ["q-scmsp2025-091","q-scmsp2026-094","q-fmabc2025-097","q-fmabc2026-088","q-iamspe2022-071","q-iamspe2023-074","q-uspsp2-104","q-famerp2023-008","q-unicamp2022-069","q-unicampdis2023-057","q-fmabc2021-071","q-usp2024-092","q-fmabc2025-083","q-didepm-075","q-famerp2024-006","q-unicampdis2024-057"],
          prosa: `[[**Desprescrição** de benzodiazepínicos em idosos, retirar o medicamento de uso frequente de uma idosa que não precisa mais (labirintite crônica), **reduzir a dose de benzodiazepínico** de quem busca a UBS para renovar receitas e corrigir o uso inadequado de uma combinação de medicamentos que causa tontura são todos P4.|q-scmsp2025-091,q-iamspe2023-074,q-unicamp2022-069,q-uspsp2-104]]

[[**Não pedir exame sem indicação** também é P4: o PSA a pedido do filho em homem de 83 anos com insuficiência cardíaca; os exames de check-up em homem de 71 anos em boa saúde; a tomografia de crânio na cefaleia tensional típica, porque achados incidentais podem fazer mais mal que bem; o teste ergométrico em mulher de 28 anos com dor torácica atípica e baixa probabilidade (o VPP é baixo); a endoscopia e a tomografia em idosa de 90 anos com demência avançada e um vômito.|q-scmsp2026-094,q-unicampdis2024-057,q-usp2024-092,q-fmabc2021-071,q-unicampdis2023-057]]

[[**Discutir riscos e benefícios** do rastreamento e **ponderar** o rastreio de próstata em pessoa hígida e sem risco é P4, assim como não aceitar a **medicalização social** (o esporte tratado como doença) e o *disease mongering* promovido pelo complexo médico-industrial. Prescrever hipoglicemiante em baixo risco cardiovascular ou aspirina em prevenção primária sem ponderar riscos é falha de P4, e a mamografia de rastreamento é secundária.|q-fmabc2025-097,q-fmabc2026-088,q-fmabc2025-083,q-famerp2023-008,q-famerp2024-006,q-didepm-075]]`,
          texto: `- **P4**: proteger o paciente de excesso de intervenção (Jamoulle, WONCA 1995). {q-iamspe2022-071,q-famerp2023-008}
- **Desprescrever** benzodiazepínicos em idosos: P4. {q-scmsp2025-091}
- Retirar o medicamento de uso frequente (labirintite) de idosa pós-AVC: **quaternária**. {q-iamspe2023-074}
- Reduzir a dose de benzodiazepínico de paciente que pede troca de receitas: P4. {q-unicamp2022-069}
- Combinação inadequada de medicamentos em idoso com tontura: P4. {q-uspsp2-104}
- PSA pedido pela família em idoso de 83 anos: **P4**. {q-scmsp2026-094}
- Exames de check-up em homem saudável de 71 anos: **P4**. {q-unicampdis2024-057}
- Cefaleia tensional típica: **não solicitar tomografia**; achados incidentais podem causar mais mal. {q-usp2024-092}
- Dor torácica atípica em mulher de 28 anos: **não pedir** teste ergométrico (VPP baixo). {q-fmabc2021-071}
- Idosa com demência avançada e exames em cascata: **P4**. {q-unicampdis2023-057}
- Ponderar riscos e benefícios do rastreio de próstata em hígido sem risco: **P4**. {q-fmabc2025-097}
- Discutir riscos e benefícios dos exames de rastreio populacional: P4. {q-fmabc2026-088}
- PSA solicitado em homem de 46 anos por campanha publicitária: **P4**. {q-didepm-075}
- **Medicalização social** do esporte: conceito que explica a transformação de práticas em objeto médico. {q-fmabc2025-083}
- Hipoglicemiante em baixo risco e aspirina sem ponderar: falha de **prevenção quaternária e secundária**. {q-famerp2024-006}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-famerp2022-004","q-tp20231-117","q-sessp2023-089","q-scmsp2023-090"],
          prosa: `[[A faixa de **mamografia** mudou: a prova de 2022 (FAMERP) cita 50 a 69 anos bienal, e as de 2023 em diante citam 50 a 74; vale a regra vigente na data da prova: 50 a 69 é a faixa do INCA, e a extensão até 74 veio de atualizações posteriores (o emissor e a data estão em conferência).|q-famerp2022-004,q-tp20231-117]] [[**Prevenção quinquenária** não é nível oficial do modelo de Leavell e Clark; a SES-SP 2023 cobrou-a como cuidado com o profissional.|q-sessp2023-089]] [[Para o plano de uma paciente com vacinas, ajuste do antidiabético e orientação, a Santa Casa de 2023 deu a combinação **primária, terciária e quaternária**; a regra é classificar cada ação isoladamente.|q-scmsp2023-090]]`,
          texto: `- Regra: mamografia a cada dois anos de 50 a 69 anos (INCA) e, nas atualizações, até 74; a FAMERP 2022 cobrou 50 a 69 e o TP 2023, 50 a 74. {q-famerp2022-004,q-tp20231-117}
- Regra: os níveis de Leavell e Clark são primária, secundária, terciária (e P4); a prova (SES-SP 2023) cobrou a **quinquenária** (cuidado do profissional). {q-sessp2023-089}
- Regra: classificar cada ação isoladamente; a prova (SCMSP 2023) cobrou o conjunto **primária, terciária e quaternária** para o plano de uma paciente. {q-scmsp2023-090}` },
      ],
    },
  ],
});
