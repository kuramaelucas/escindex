/* ==========================================================================
   REPOSIÇÕES — epidemiologia e bioestatística
   ==========================================================================
   Versão corrigida de cinco questões anuladas: FMABC 2023 nº 86 (mortalidade
   infantil), Einstein 2024 nº 72 e 73 (mortalidade proporcional, letalidade e
   risco relativo), AMRIGS 2025 nº 96 e AMRIGS 2020 nº 87 (sensibilidade e
   especificidade). As originais continuam anuladas e sem gabarito; estas são as
   REPOSIÇÕES (`reposicaoDe`). Conteúdo, não código.
   ========================================================================== */
window.EscDados.registrarQuestoes("reposicoes-epidemiologia-1", [
 {
  "id": "q-fmabc2023-086-ia",
  "banca": "FMABC",
  "real": false,
  "ano": 2023,
  "reposicaoDe": "q-fmabc2023-086",
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-medidasepi",
  "enunciado": "Sobre o “coeficiente de mortalidade infantil”, assinale a alternativa que descreve corretamente como deve ser calculado.",
  "alternativas": [
   {
    "id": "A",
    "texto": "(Número de óbitos de menores de 28 dias em certa área durante o ano / Total de nascidos vivos nessa área durante o ano) X 1 000"
   },
   {
    "id": "B",
    "texto": "(Número de óbitos de menores de 12 anos em certa área durante o ano / Total de nascidos vivos nessa área durante os últimos 12 anos) X 1 000"
   },
   {
    "id": "C",
    "texto": "(Total de óbito de menores de 18 anos em certa área durante o ano / Total de nascidos vivos nessa área durante os últimos 12 anos) X 1 000"
   },
   {
    "id": "D",
    "texto": "(Total de perdas fetais de 22 semanas de gestação ou mais durante o ano / Total de nascidos vivos nessa área durante os últimos 12 anos) X 1 000"
   },
   {
    "id": "E",
    "texto": "(Número de óbitos de menores de 1 ano em certa área durante o ano / Total de nascidos vivos nessa área durante o ano) X 1 000"
   }
  ],
  "gabarito": "E",
  "explicacaoGeral": "A alternativa E está correta. Dicas do enunciado: pede o **cálculo** do coeficiente de mortalidade infantil. Dados objetivos: pela RIPSA, o método direto é **número de óbitos de residentes com menos de um ano ÷ número de nascidos vivos de mães residentes × 1.000**, no mesmo local e período; a mortalidade infantil se divide em neonatal precoce (0 a 6 dias), neonatal tardia (7 a 27 dias) e pós-neonatal (28 a 364 dias). Mecanismo: o indicador mede o risco de morrer antes de completar um ano, e reflete condições de vida, saneamento, educação materna e acesso à saúde. Epidemiologia: a taxa no Brasil caiu de 45,2 por mil em 1991 para 22,6 por mil em 2004 (dados da RIPSA), com valores maiores no Nordeste. A está errada porque usa só os menores de 28 dias, o que é a mortalidade neonatal. B e C estão erradas porque usam 12 anos e 18 anos. D está errada porque usa perdas fetais, o que é a mortalidade fetal. As alternativas B, C, D comparam ainda os óbitos de um ano com nascidos de vários anos, o que não é o cálculo.",
  "referencias": "Rede Interagencial de Informação para a Saúde (RIPSA). Indicadores básicos para a saúde no Brasil: conceitos e aplicações, 2ª ed., Brasília: OPAS, 2008 (taxa de mortalidade infantil, C.1; mortalidade proporcional por grupos de causas, C.4; métodos de cálculo): texto lido em 03/11/2026 em bvsms.saude.gov.br. Letalidade e risco relativo seguem as definições clássicas, que não constam desse documento. Conferido em 03/11/2026.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
   "respostas": 0,
   "acertos": 0,
   "distribuicaoAlternativas": {}
  },
  "criadoPor": "seed",
  "criadoEm": "2026-11-03"
 },
 {
  "id": "q-einstein2024-072-ia",
  "banca": "Einstein (HIAE)",
  "real": false,
  "ano": 2024,
  "reposicaoDe": "q-einstein2024-072",
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-medidasepi",
  "enunciado": "Atenção: Considere o caso abaixo para responder às questões de números 72 e 73. No ano de 2020, em um município no interior de São Paulo, com 100.000 habitantes, foram notificados 2.000 óbitos. Dentre estes, 50 foram por infarto agudo do miocárdio (IAM) e 30 por acidente vascular encefálico (AVE). No mesmo ano, foram notificados 500 casos de IAM e 300 de AVE. Entre os casos notificados de IAM, 200 eram hipertensos e destes 30 evoluíram para óbito. Entre os casos de AVE, 150 eram hipertensos e 20 evoluíram para óbito. Os casos de óbito neste município apresentaram",
  "alternativas": [
   {
    "id": "A",
    "texto": "a mortalidade proporcional por AVE foi de 1,5%."
   },
   {
    "id": "B",
    "texto": "mortalidade proporcional por IAM foi de 10%."
   },
   {
    "id": "C",
    "texto": "letalidade por AVE foi de 0,02."
   },
   {
    "id": "D",
    "texto": "letalidade por IAM foi de 0,25."
   }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **2.000 óbitos no município**, dos quais **50 por IAM e 30 por AVE**, e **500 casos de IAM e 300 de AVE**. Dados objetivos: pela RIPSA, a **mortalidade proporcional** por grupo de causas é o número de óbitos pela causa dividido pelo total de óbitos × 100: **AVE 30 ÷ 2.000 = 1,5%**, **IAM 50 ÷ 2.000 = 2,5%**. A **letalidade** é o número de óbitos pela doença dividido pelo número de casos da doença: **IAM 50 ÷ 500 = 0,10**, **AVE 30 ÷ 300 = 0,10**. Mecanismo: a mortalidade proporcional mostra o peso da causa entre todas as mortes, e a letalidade, a gravidade da doença entre os doentes. Epidemiologia: doenças cardiovasculares estão entre as principais causas de óbito, mas as duas medidas respondem a perguntas diferentes. B está errada porque o IAM responde por 2,5%, não 10%, dos óbitos. C está errada porque a letalidade do AVE é 0,10, não 0,02. D está errada porque a letalidade do IAM é 0,10, não 0,25.",
  "referencias": "Rede Interagencial de Informação para a Saúde (RIPSA). Indicadores básicos para a saúde no Brasil: conceitos e aplicações, 2ª ed., Brasília: OPAS, 2008 (taxa de mortalidade infantil, C.1; mortalidade proporcional por grupos de causas, C.4; métodos de cálculo): texto lido em 03/11/2026 em bvsms.saude.gov.br. Letalidade e risco relativo seguem as definições clássicas, que não constam desse documento. Conferido em 03/11/2026.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
   "respostas": 0,
   "acertos": 0,
   "distribuicaoAlternativas": {}
  },
  "criadoPor": "seed",
  "criadoEm": "2026-11-03"
 },
 {
  "id": "q-einstein2024-073-ia",
  "banca": "Einstein (HIAE)",
  "real": false,
  "ano": 2024,
  "reposicaoDe": "q-einstein2024-073",
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-medidasepi",
  "enunciado": "Atenção: Considere o caso abaixo para responder às questões de números 72 e 73. No ano de 2020, em um município no interior de São Paulo, com 100.000 habitantes, foram notificados 2.000 óbitos. Dentre estes, 50 foram por infarto agudo do miocárdio (IAM) e 30 por acidente vascular encefálico (AVE). No mesmo ano, foram notificados 500 casos de IAM e 300 de AVE. Entre os casos notificados de IAM, 200 eram hipertensos e destes 30 evoluíram para óbito. Entre os casos de AVE, 150 eram hipertensos e 20 evoluíram para óbito. Em relação aos casos notificados em hipertensos deste município é correto afirmar:",
  "alternativas": [
   {
    "id": "A",
    "texto": "entre os casos de IAM, os hipertensos apresentam risco relativo de 2,25 para óbito em relação aos não hipertensos."
   },
   {
    "id": "B",
    "texto": "entre os hipertensos com IAM, a letalidade foi de 0,30."
   },
   {
    "id": "C",
    "texto": "entre os casos de AVE, os hipertensos apresentam risco relativo de 2,30 para óbito em relação aos não hipertensos."
   },
   {
    "id": "D",
    "texto": "a letalidade por AVE foi de 0,06."
   }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **500 casos de IAM, 200 em hipertensos, com 30 óbitos entre eles e 50 óbitos no total**; **300 casos de AVE, 150 em hipertensos, com 20 óbitos entre eles e 30 no total**. Dados objetivos: no IAM, o risco de óbito nos hipertensos é **30 ÷ 200 = 15%**, e nos não hipertensos **(50 − 30) ÷ (500 − 200) = 20 ÷ 300 ≈ 6,7%**, com **risco relativo de 15 ÷ 6,67 = 2,25**. No AVE, o risco nos hipertensos é **20 ÷ 150 ≈ 13,3%**, e nos não hipertensos **(30 − 20) ÷ (300 − 150) = 10 ÷ 150 ≈ 6,7%**, com **risco relativo de 2,0**. A letalidade geral do AVE é **30 ÷ 300 = 0,10**. Mecanismo: a hipertensão aumenta a carga sobre o coração e as artérias e piora o prognóstico dos eventos agudos. Epidemiologia: o risco relativo compara a incidência do desfecho entre expostos e não expostos, aqui a letalidade em hipertensos e não hipertensos. B está errada porque a letalidade nos hipertensos com IAM é 0,15, não 0,30. C está errada porque o risco relativo para AVE é 2,0, não 2,30. D está errada porque a letalidade do AVE é 0,10.",
  "referencias": "Rede Interagencial de Informação para a Saúde (RIPSA). Indicadores básicos para a saúde no Brasil: conceitos e aplicações, 2ª ed., Brasília: OPAS, 2008 (taxa de mortalidade infantil, C.1; mortalidade proporcional por grupos de causas, C.4; métodos de cálculo): texto lido em 03/11/2026 em bvsms.saude.gov.br. Letalidade e risco relativo seguem as definições clássicas, que não constam desse documento. Conferido em 03/11/2026.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
   "respostas": 0,
   "acertos": 0,
   "distribuicaoAlternativas": {}
  },
  "criadoPor": "seed",
  "criadoEm": "2026-11-03"
 },
 {
  "id": "q-amrigs2025-096-ia",
  "banca": "AMRIGS",
  "real": false,
  "ano": 2025,
  "reposicaoDe": "q-amrigs2025-096",
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-bioestatistica",
  "enunciado": "Um teste rápido para triagem de infecção pelo HIV foi avaliado em uma população com suspeita clínica moderada, em contexto ambulatorial. O exame apresenta sensibilidade de 100% e especificidade de 98%. Considerando esses parâmetros e o papel do teste no raciocínio clínico e epidemiológico, assinale a alternativa correta.",
  "alternativas": [
   {
    "id": "A",
    "texto": "Todos os positivos têm HIV."
   },
   {
    "id": "B",
    "texto": "Nenhum paciente com HIV terá resultado negativo."
   },
   {
    "id": "C",
    "texto": "2% dos doentes terão falso-negativo."
   },
   {
    "id": "D",
    "texto": "Os negativos têm 2% de chance de ter a doença."
   }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **teste rápido com sensibilidade de 100% e especificidade de 98%**. Dados objetivos: a **sensibilidade** é a proporção de resultados positivos entre os que realmente têm a doença; com 100%, **não há falso-negativo**. A **especificidade** é a proporção de resultados negativos entre os que realmente não têm a doença; com 98%, **2% de quem não tem HIV recebe resultado positivo (falso-positivo)**. Os valores preditivos variam com a prevalência, ao contrário da sensibilidade e da especificidade, que são características do teste. Mecanismo: um teste de triagem muito sensível é usado para não perder casos, e os positivos são confirmados por outro exame. Epidemiologia: a probabilidade de um positivo ter HIV depende da prevalência na população testada. A está errada porque 2% dos sem HIV dão falso-positivo, então nem todo positivo tem a doença. C está errada porque a taxa de falso-negativo em quem tem HIV é 0%. D está errada porque, com sensibilidade de 100%, o valor preditivo negativo é de 100%, e nenhum negativo tem a doença.",
  "referencias": "Foundational Statistical Principles in Medical Research: Sensitivity, Specificity, Positive Predictive Value, and Negative Predictive Value (PMC8156826): definições de sensibilidade, especificidade e valores preditivos, texto lido em 03/11/2026 em ncbi.nlm.nih.gov/pmc. Conferido em 03/11/2026.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
   "respostas": 0,
   "acertos": 0,
   "distribuicaoAlternativas": {}
  },
  "criadoPor": "seed",
  "criadoEm": "2026-11-03"
 },
 {
  "id": "q-amrigs2020-087-ia",
  "banca": "AMRIGS",
  "real": false,
  "ano": 2020,
  "reposicaoDe": "q-amrigs2020-087",
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-bioestatistica",
  "enunciado": "Um dos kits de teste rápido (2019-nCOV IgG/IgM) apresenta especificidade relativa para IgG: 287/289 = 99,31% (IC 95%: 97,52% -99,92%). Sobre esses achados, analise as assertivas abaixo: I. A especificidade de 99,31% significa que 99,31% dos resultados positivos do teste correspondem a pessoas com a doença. A alta especificidade pode recomendar o uso do teste nas situações indicadas. III. Foram positivos 2 (falsos-positivos) resultados em comparação ao exame padrão (RT-PCR). Quais estão corretas?",
  "alternativas": [
   {
    "id": "A",
    "texto": "Apenas I e II."
   },
   {
    "id": "B",
    "texto": "Apenas I e III."
   },
   {
    "id": "C",
    "texto": "Apenas II e III."
   },
   {
    "id": "D",
    "texto": "I, II e III."
   }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **especificidade de 287/289 = 99,31% (IC 95%: 97,52% a 99,92%)**. Dados objetivos: a **especificidade** é a proporção de resultados negativos entre os que realmente não têm a doença: aqui, **287 verdadeiros-negativos entre 289 sem a doença**, o que deixa **2 falsos-positivos** (afirmativa III, correta). Uma **alta especificidade** torna o resultado positivo mais confiável, o que recomenda o teste em situações em que se quer confirmar (afirmativa II, correta). A afirmativa I confunde especificidade com **valor preditivo positivo**: a especificidade é medida entre os sem doença, e a proporção de positivos que têm a doença depende da prevalência (afirmativa I, falsa). Mecanismo: o teste de anticorpos IgG detecta a resposta imune, e reações cruzadas geram falsos-positivos. Epidemiologia: os valores preditivos mudam com a prevalência, e a especificidade, não. A, B e D estão erradas porque incluem a afirmativa I.",
  "referencias": "Foundational Statistical Principles in Medical Research: Sensitivity, Specificity, Positive Predictive Value, and Negative Predictive Value (PMC8156826): definições de sensibilidade, especificidade e valores preditivos, texto lido em 03/11/2026 em ncbi.nlm.nih.gov/pmc. Conferido em 03/11/2026.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
   "respostas": 0,
   "acertos": 0,
   "distribuicaoAlternativas": {}
  },
  "criadoPor": "seed",
  "criadoEm": "2026-11-03"
 }
]);
