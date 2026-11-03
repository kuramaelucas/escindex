/* ==========================================================================
   REPOSIÇÕES — gonorreia (PCDT de IST 2022), doença de Crohn e intervalo de confiança
   ==========================================================================
   Versão atualizada de quatro questões desatualizadas ou com duas respostas
   defensáveis: Sírio-Libanês 2021 nº 65 (esquema da gonorreia), Teste de
   Progresso 2021.2 nº 35 (doença de Crohn) e nº 19 (intervalo de confiança) e
   Teste de Progresso 2023.1 nº 87 (corticoide antenatal). As originais continuam desatualizadas em suas provas;
   estas são as REPOSIÇÕES (`reposicaoDe`). Conteúdo, não código.
   ========================================================================== */
window.EscDados.registrarQuestoes("reposicoes-clinicas-1", [
 {
  "id": "q-sirio2021-065-ia",
  "banca": "Sírio-Libanês (SP)",
  "real": false,
  "ano": 2021,
  "reposicaoDe": "q-sirio2021-065",
  "areaId": "area-go",
  "especialidadeId": "esp-ginecologia",
  "assuntoId": "ass-ists",
  "enunciado": "Durante o exame especular de uma mulher de 28 anos, assintomática, observa-se a presença de cervicite, com sangramento endocervical durante a coleta de citologia cervicovaginal. O esfregaço obtido corado pelo Gram mostra diplococos Gram-negativos no citoplasma de polimorfonucleares neutrófilos. A conduta é:",
  "alternativas": [
   {
    "id": "A",
    "texto": "Prescrever azitromicina por 3 dias para o casal."
   },
   {
    "id": "B",
    "texto": "Prescrever ceftriaxona 500 mg IM e azitromicina 1 g VO, ambas em dose única, para a paciente e avaliar a parceria sexual."
   },
   {
    "id": "C",
    "texto": "Cauterizar o local da cervicite com energia ou ácido."
   },
   {
    "id": "D",
    "texto": "Enviar o material para cultura em meio de Thayer-Martin."
   },
   {
    "id": "E",
    "texto": "Pesquisar clamídia por meio de RT-PCR."
   }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **cervicite com sangramento endocervical e diplococos Gram-negativos intracelulares em neutrófilos**: **infecção gonocócica** do colo do útero. Dados objetivos: o PCDT de IST 2022 (Quadro 31) trata a infecção gonocócica não complicada do colo do útero com **ceftriaxona 500 mg IM em dose única mais azitromicina 500 mg, 2 comprimidos (1 g), VO, dose única**; as parcerias sexuais devem ser identificadas e avaliadas (as sintomáticas recebem o mesmo esquema, e todas são testadas para sífilis, HIV e hepatites B e C). Mecanismo: o gonococo acumulou resistência às quinolonas, por isso o esquema com ciprofloxacina deixou de ser indicado e o protocolo usa a cefalosporina de terceira geração junto da azitromicina, que cobre também a clamídia, comum na coinfecção. Epidemiologia: as cervicites por gonococo e clamídia são assintomáticas em cerca de 70% a 80% dos casos, o que mantém a cadeia de transmissão e justifica tratar e avaliar a rede sexual. A está errada porque a azitromicina isolada não é o esquema da gonorreia. C está errada porque a cauterização não trata a infecção. D está errada porque o Gram já firmou o diagnóstico e a cultura não deve atrasar o tratamento. E está errada porque a pesquisa de clamídia complementa o diagnóstico, mas não substitui o tratamento.",
  "referencias": "Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (IST), 2022 (Quadro 31 e capítulo de parcerias sexuais): texto lido em 03/11/2026 em gov.br/aids. Conferido em 03/11/2026.",
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
  "id": "q-tp20212-035-ia",
  "banca": "Teste de Progresso NIEPAEM",
  "real": false,
  "ano": 2021,
  "semestre": 2,
  "tipoProva": "graduacao",
  "reposicaoDe": "q-tp20212-035",
  "areaId": "area-cm",
  "especialidadeId": "esp-gastro",
  "assuntoId": "ass-dii",
  "enunciado": "Homem, 39 anos, há 8 semanas apresentando diarreia líquida com cólica abdominal e dores articulares. Procurou a emergência com queixa de dor predominante em quadrante inferior direito do abdome, que ameniza com a evacuação. Exame físico: febril, pálido, emagrecido. Massa palpável e dolorosa em fossa ilíaca direita. Leucocitose no hemograma. Mencionou ter sido operado de fístula anorretal há 1 ano. O diagnóstico e a opção terapêutica são:",
  "alternativas": [
   {
    "id": "A",
    "texto": "retocolite ulcerativa/hidrocortisona."
   },
   {
    "id": "B",
    "texto": "doença de Crohn/prednisona, após exame de imagem que afaste abscesso."
   },
   {
    "id": "C",
    "texto": "apendicite aguda complicada/cirurgia."
   },
   {
    "id": "D",
    "texto": "colite por Clostridium difficile /metronidazol."
   }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **homem de 39 anos com 8 semanas de diarreia, cólica, artralgia, dor em fossa ilíaca direita que melhora ao evacuar, febre, palidez, emagrecimento, massa palpável dolorosa, leucocitose e fístula anorretal operada há 1 ano**: **doença de Crohn ileocólica**, que o PCDT descreve com febre, palidez, caquexia, massas abdominais e fístulas perianais. Dados objetivos: na atividade **moderada a grave** o PCDT recomenda tratar com **prednisona ou metilprednisolona** até resolver os sintomas, depois manutenção com azatioprina; a sulfassalazina fica para a doença colônica leve (IHB < 5); e pacientes com **infecção ou abscesso** recebem antibioticoterapia apropriada, com drenagem se necessário, por isso a massa dolorosa com febre pede imagem antes de iniciar o corticoide. Mecanismo: inflamação transmural e descontínua, que forma massas, estenoses e fístulas; o corticoide controla a inflamação, mas piora uma coleção não drenada. Epidemiologia: acomete adultos jovens e costuma ser confundida com apendicite pela dor em fossa ilíaca direita. A está errada porque a retocolite é contínua a partir do reto e não forma fístula perianal nem massa. C está errada porque não explica 8 semanas de diarreia, artralgia e fístula prévia. D está errada porque a colite por *C. difficile* é aguda e ligada a antibiótico.",
  "referencias": "Ministério da Saúde. PCDT da Doença de Crohn (Portaria Conjunta SAS/SCTIE/MS nº 14/2017, no texto publicado pela Conitec no gov.br): texto lido em 03/11/2026; a página do Ministério indica que o anexo foi alterado em 18/06/2025, e essa edição mais nova não foi lida. Conferido em 03/11/2026.",
  "dificuldadeManual": "avancado",
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
  "id": "q-tp20212-019-ia",
  "banca": "Teste de Progresso NIEPAEM",
  "real": false,
  "ano": 2021,
  "semestre": 2,
  "tipoProva": "graduacao",
  "reposicaoDe": "q-tp20212-019",
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-bioestatistica",
  "enunciado": "Um estudo epidemiológico realizado com pacientes infectados pelo HIV mostrou que o intervalo de confiança de 95% da contagem de linfócitos TCD4 ao diagnóstico situava-se entre 254 a 429 células/mm³. Considerando que os valores encontrados foram amostrados de forma independente e aleatória a partir de uma população com distribuição normal com média e variância, podemos afirmar corretamente que:",
  "alternativas": [
   {
    "id": "A",
    "texto": "O desvio padrão da contagem de linfócitos TCD4 nesta amostra pode ser calculado pela diferença entre 429 e 254 células/mm³."
   },
   {
    "id": "B",
    "texto": "Há 95% de confiança de que a média verdadeira da contagem de linfócitos TCD4 desta população esteja entre 254 e 429 células/mm³."
   },
   {
    "id": "C",
    "texto": "O maior valor encontrado para a contagem de linfócitos TCD4 na amostra é de 429 células/mm³ e o menor valor encontrado foi de 254 células/mm³."
   },
   {
    "id": "D",
    "texto": "A média da contagem de linfócitos TCD4 na amostra é igual à diferença entre 429 e 254 células/mm³ dividida por dois."
   }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **intervalo de confiança de 95% da média de TCD4 entre 254 e 429 células/mm³**, amostra aleatória e independente de população normal. Dados objetivos: o intervalo expressa a incerteza sobre o **parâmetro populacional (a média verdadeira)**; por construção, 95% dos intervalos calculados desse modo contêm a média verdadeira, e a leitura correta é de **95% de confiança** de que a média da população está entre os limites (o parâmetro é fixo; o aleatório é o intervalo). A média amostral de um IC simétrico é o **ponto médio** dos limites, (254 + 429) ÷ 2 = **341,5 células/mm³**. Mecanismo: a amplitude do intervalo depende do desvio padrão, do tamanho da amostra e do nível de confiança, pelo erro padrão (desvio ÷ raiz de n). Epidemiologia: o IC de 95% é a medida de precisão usada para resumir contagens como a de TCD4 em estudos de coorte. A está errada porque a amplitude do IC não é o desvio padrão. C está errada porque os limites do IC não são o mínimo e o máximo observados. D está errada porque a diferença dividida por dois é a metade da amplitude (87,5), não a média; a média é a soma dividida por dois.",
  "referencias": "Conferência matemática (ponto médio do intervalo, 341,5 células/mm³; metade da amplitude, 87,5) feita em 03/11/2026. Conceito clássico de intervalo de confiança; o livro-texto da questão original (Vieira, Introdução à Bioestatística, 2015) não foi relido. Conferido em 03/11/2026.",
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
  "id": "q-tp20231-087-ia",
  "banca": "Teste de Progresso NIEPAEM",
  "real": false,
  "ano": 2023,
  "semestre": 1,
  "tipoProva": "graduacao",
  "reposicaoDe": "q-tp20231-087",
  "areaId": "area-go",
  "especialidadeId": "esp-obstetricia",
  "assuntoId": "ass-partopretermo",
  "enunciado": "Tercigesta, na 29ª semana de gravidez, procura a maternidade referindo dor em baixo ventre há oito horas. Sem febre e sem sinais clínicos de infecção. Exame especular: bolsa amniótica exteriorizando pelo colo. Toque vaginal: colo centrado, amolecido, dilatado 3cm, apresentação cefálica, BCF = 140bpm com aceleração transitória. Dinâmica uterina ausente. A conduta é:",
  "alternativas": [
   {
    "id": "A",
    "texto": "Cerclagem e antibioticoterapia."
   },
   {
    "id": "B",
    "texto": "Corticoterapia e indução do parto após 48h."
   },
   {
    "id": "C",
    "texto": "Progesterona e repouso absoluto no leito."
   },
   {
    "id": "D",
    "texto": "Corticoterapia antenatal e acompanhamento, aguardando o trabalho de parto."
   }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **29 semanas, bolsa exteriorizando-se pelo colo, dilatação de 3 cm, sem dinâmica uterina, vitalidade fetal preservada e sem sinais de infecção**: parto prematuro **iminente** (alta probabilidade de nascer nos próximos 7 dias). Dados objetivos: a OMS (2022) recomenda **corticoide antenatal de 24 a 34 semanas** quando há alta probabilidade de parto prematuro em até 7 dias, idade gestacional bem estabelecida, **ausência de sinais clínicos de infecção materna** e assistência adequada ao parto e ao recém-nascido; o esquema de escolha é **dexametasona ou betametasona IM, 24 mg no total em doses divididas**, e vale iniciá-lo mesmo que o esquema completo possa não ser concluído; o corticoide não é indicado se há corioamnionite. Mecanismo: o corticoide acelera a maturação do pulmão fetal (surfactante), reduzindo síndrome do desconforto respiratório e mortalidade neonatal. Epidemiologia: a prematuridade é causa importante de morte neonatal, e a maturação pulmonar é a intervenção de maior impacto nessa faixa de idade gestacional. A está errada porque a cerclagem não se faz com membranas exteriorizadas e dilatação avançada (ponto clássico, não relido nesta conferência). B está errada porque induzir o parto não é conduta aqui; a ideia é ganhar o tempo do corticoide, e não apressar o nascimento. C está errada porque repouso absoluto e progesterona não substituem a maturação pulmonar nesse quadro (ponto também clássico, não relido; o documento da OMS lido trata do corticoide, e não do repouso).",
  "referencias": "Organização Mundial da Saúde. WHO recommendations on antenatal corticosteroids for improving preterm birth outcomes, 2022 (Tabela 1, recomendações 1.0, 1.1, 1.4 e 1.9): texto lido em 03/11/2026 em iris.who.int. Cerclagem, repouso e progesterona: conteúdo da questão original (Williams, Obstetrícia, 2015), não relido. Conferido em 03/11/2026.",
  "dificuldadeManual": "avancado",
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
