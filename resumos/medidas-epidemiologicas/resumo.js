/* resumos/medidas-epidemiologicas/resumo.js — resumo adaptativo de medidas epidemiológicas: incidência e prevalência,
   ataque, letalidade e mortalidade, indicadores de mortalidade infantil e materna, padronização e níveis de saúde,
   risco relativo, razão de chances, risco atribuível, NNT, e testes diagnósticos (sensibilidade, especificidade,
   valores preditivos). Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- medidas-epidemiologicas */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "medidas-epidemiologicas",
  titulo: "Medidas epidemiológicas e indicadores de saúde",
  assunto: "ass-medidasepi",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "ripsa", texto: "RIPSA/Ministério da Saúde — Indicadores básicos para a saúde no Brasil: conceitos e aplicações (2ª ed., 2008) e fichas de qualificação dos indicadores", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas com reposição no resumo (as reposições -ia entram).", questoes: ["q-einstein2024-072", "q-einstein2024-073", "q-fmabc2023-086"] },
  ],
  doencas: [
    {
      id: "frequencia", titulo: "Medidas de frequência: incidência, prevalência, ataque, letalidade e mortalidade",
      introducao: `[[Toda medida de frequência é uma fração: o numerador conta eventos (casos, óbitos) e o denominador diz quem poderia tê-los. Errar a questão quase sempre é trocar o denominador.|q-025,q-fmabc2022-099,q-fmabc2022-100]] Quem lê o numerador e o denominador antes do nome acerta o cálculo e a palavra.

[[A **incidência** conta **casos novos** em quem estava livre da doença; a **prevalência** conta **casos existentes** (novos e antigos) numa população.|q-025,q-adap22-043,q-amrigs2020-090]] A incidência mede o risco de adoecer; a prevalência mede o peso da doença no serviço de saúde e depende de quanto ela dura.

Veja também: **Desenhos de estudo** (qual desenho produz qual medida), **Bioestatística** (intervalo de confiança), **Vigilância em saúde** (surto, investigação e notificação) e **Prevenção** (rastreamento e valor preditivo).`,
      fragmentos: [
        { id: "freq-incidencia-prevalencia", titulo: "Incidência, prevalência e a relação entre elas", conferir: true,
          figuras: [{ arquivo: "figuras/frequencias.svg", legenda: "Esquema autoral: numerador e denominador de cada medida de frequência." }],
          casos: ["q-unesp2023-082","q-sirio2024-092","q-uspsp1-119"],
          questoes: ["q-025","q-adap22-043","q-adap26-076","q-amrigs2020-090","q-adap24-079","q-unifesp2024-070","q-sirio2022-083","q-fmabc2021-069","q-fmabc2026-087","q-usp2025-102","q-unesp2023-082","q-sirio2024-092","q-unesp2023-092","q-tp20231-109","q-unicampdis2023-051","q-unicampdis2023-053","q-uspsp1-119","q-uspsp3-023","q-unicampdis2022-051","q-unicampdis2024-109"],
          prosa: `A **incidência acumulada** (risco) é o número de casos novos num período dividido pela população **em risco no início**: 300 casos em 1.200 livres de hipertensão em 10 anos é **25%**. [[Quando as pessoas entram e saem do acompanhamento em tempos diferentes, a medida correta é a **densidade de incidência**, que divide os casos pelas **pessoas-tempo** acompanhadas (casos por 1.000 pessoas-ano): 10 pacientes seguidos por até 40 anos, com tempos diferentes, dão 20,83 por 1.000 pessoas-ano; um grupo com 40 casos em 1.000 pessoas-ano dá 40 por 1.000.|q-uspsp1-119,q-uspsp3-023,q-fmabc2026-087]]

A **prevalência** é o número de casos existentes (pontual, num instante; ou de período, em um intervalo) dividido pela população total. [[Em população estável e com incidência constante, **prevalência ≈ incidência × duração média**: incidência de 5 por 1.000 ao ano e duração de 4 anos dão 20 por 1.000.|q-adap26-076]]

[[Daí o paradoxo do tratamento que só reduz a mortalidade: os doentes vivem mais, a duração aumenta e a **prevalência aumenta** sem que a incidência mude. Ao contrário, um programa de prevenção mede seu sucesso pela **queda da incidência**.|q-adap24-079,q-unifesp2024-070,q-tp20231-109]] O tabagismo ilustra: a prevalência resulta da iniciação (novos fumantes) menos a cessação e a morte.

[[Na figura de casos de gastroenterite em uma creche, a **incidência** conta quem adoeceu na semana (casos novos) e a **prevalência de um dia** conta quem estava doente naquele dia, e por isso é menor que a soma.|q-sirio2024-092,q-unesp2023-082]] Em um inquérito transversal, a medida é prevalência; num estudo de seguimento, incidência. O esquema abaixo reúne os denominadores.`,
          texto: `- **Incidência**: casos **novos** em população em risco; **prevalência**: casos **existentes** (novos e antigos). {q-025,q-adap22-043,q-usp2025-102,q-fmabc2021-069}
- 40 casos novos em 100.000: incidência; 250 casos totais: prevalência. {q-025}
- 400 casos existentes + 150 novos − 50 óbitos: incidência 3,0/1.000 e prevalência 10/1.000 (os dados mudam o numerador, não o denominador). {q-adap22-043}
- Risco cumulativo em coorte: 300 em 1.200 em 10 anos = **25%**. {q-fmabc2026-087}
- **Densidade de incidência**: casos por pessoas-tempo (casos por 1.000 pessoas-ano). {q-uspsp1-119,q-uspsp3-023}
- **Prevalência ≈ incidência × duração** (população estável, incidência constante). {q-adap26-076}
- Terapia que só reduz mortalidade em doença crônica: **prevalência aumenta**. {q-adap24-079,q-unifesp2024-070}
- A **prevalência** do tabagismo resulta da iniciação e da cessação ou morte. {q-amrigs2020-090}
- Programa de prevenção de HAS e DM se avalia pela **queda da incidência**, e não pela da prevalência. {q-tp20231-109}
- Para saber a velocidade de espalhamento de uma epidemia, a medida é a **incidência** (taxa de ataque). {q-unicampdis2023-051}
- Acidentes fatais ao longo de um ano num município: **incidência**. {q-unesp2023-092}
- Gastroenterite em creche: contar casos novos na semana (incidência) e doentes em um dia (prevalência pontual). {q-sirio2024-092,q-unesp2023-082}
- Tuberculose: 100 em tratamento no início, 60 altas, 50 novos: prevalência de 90 por 100.000 no fim do ano. {q-unicampdis2023-053}
- Prevalência de 25 por 1.000 num inquérito de 600 homens com 15 casos: 15/600. {q-unicampdis2022-051}
- Frequência de adoecer entre trabalhadores de hortas (15 em 54): 278 por 1.000. {q-unicampdis2024-109}
- Prevalência com incidência dada: confira os números do enunciado antes de aceitar a resposta (ver armadilhas). {q-sirio2022-083}` },
        { id: "freq-ataque-letalidade", titulo: "Taxa de ataque, letalidade, mortalidade e transmissibilidade", conferir: true,
          questoes: ["q-tp20212-108","q-unesp2021-084","q-unesp2022-081","q-unesp2022-082","q-unesp2025-094","q-unesp2026-097","q-fmabc2022-099","q-fmabc2022-100","q-famerp2023-013","q-udisc20262-017","q-einstein2024-072-ia","q-einstein2024-073-ia","q-usprp2023-052","q-unesp2026-089","q-tp20231-106"],
          prosa: `A **taxa de ataque** é a incidência em surto: casos ÷ expostos. [[No surto de intoxicação alimentar estafilocócica de um curso com 200 participantes, 50 casos iniciais dão taxa de ataque de 0,25 e 120 casos no total, 0,6; a taxa nunca passa de 1.|q-famerp2023-013,q-tp20212-108]]

A **letalidade** é a proporção de **óbitos entre os doentes** (óbitos pela doença ÷ casos × 100) e mede a **gravidade**: 4 óbitos em 80 casos de câncer de mama = 5%. A **mortalidade** divide os óbitos pela **população**, mede o risco de morrer na comunidade e **não** depende de a pessoa ter adoecido. [[Em 10 casos de câncer de colo com 2 óbitos numa população de 100.000, a letalidade é 20% e a mortalidade, 2 por 100.000: o numerador é o mesmo, o denominador diferente.|q-fmabc2022-100,q-fmabc2022-099,q-unesp2026-097]] A **mortalidade proporcional** divide os óbitos por uma causa pelo total de óbitos (50 IAM em 2.000 óbitos = 2,5%).

[[O **R0** é o número médio de pessoas que um caso infecta numa população totalmente suscetível e sem medida preventiva: com R0 = 2, cada geração dobra (2, 4, 8, 16, 32) e, a partir de um caso, a quinta geração tem **32** casos. A **infectividade** é a capacidade de o agente se alojar e multiplicar no hospedeiro; a **virulência**, a de produzir doença grave.|q-usprp2023-052,q-unesp2026-089]] Para o COVID, em 24 de maio de 2020 (363.211 casos, 22.666 óbitos), a letalidade foi de 6,24%.`,
          texto: `- **Taxa de ataque** = casos ÷ expostos (surto): 50/200 = 0,25 e 120/200 = 0,6. {q-famerp2023-013}
- Febre amarela: 20 casos em 500 e 5 óbitos: ataque 4%, mortalidade 1%, letalidade 25%. {q-tp20212-108}
- **Letalidade** = óbitos pela doença ÷ casos × 100 (gravidade): 4/80 = 5%; 363.211 casos e 22.666 óbitos = 6,24%. {q-unesp2026-097,q-unesp2021-084,q-fmabc2022-100}
- **Mortalidade** = óbitos ÷ população; **mortalidade proporcional** = óbitos por causa ÷ total de óbitos. {q-fmabc2022-099,q-einstein2024-072-ia}
- Com 2.000 óbitos e 50 por IAM: mortalidade proporcional de 2,5%; mais letalidade e risco relativo de 2,25 entre hipertensos com IAM. {q-einstein2024-072-ia,q-einstein2024-073-ia}
- Incidência e letalidade de dengue hemorrágica em duas cidades: duas medidas distintas, incidência e letalidade. {q-udisc20262-017}
- Casos e óbitos acumulados de covid em 44,4 milhões de habitantes: o coeficiente usa a **população** como denominador (por 100.000). {q-unesp2025-094}
- Casos de covid no município e no estado: coeficiente de incidência e coeficiente de mortalidade. {q-unesp2022-081,q-unesp2022-082}
- Série histórica de febre amarela: letalidade média alta, com muitos óbitos entre os casos. {q-tp20231-106}
- **R0**: média de infectados por um caso em população suscetível; R0 = 2 após cinco gerações: **32** casos. {q-usprp2023-052}
- **Infectividade** (alojar-se e multiplicar) e **virulência** (gravidade) são propriedades do agente. {q-unesp2026-089}` },
        { id: "freq-series-temporais", titulo: "Curvas, séries temporais e sazonalidade", conferir: true,
          casos: ["q-unesp2021-094","q-iamspe2022-067"],
          questoes: ["q-iamspe2022-067","q-unesp2021-094","q-sirio2023-091","q-unesp2022-083","q-unesp2025-093","q-tp20232-103","q-famerp2022-013","q-uspsp1-118","q-fmabc2026-096","q-uspsp4-093"],
          prosa: `[[Uma série temporal mostra como a medida muda no tempo: o gráfico de casos novos por semana é **incidência**, e a variação cíclica anual (gráfico polar das fraturas em Ribeirão Preto) é **sazonalidade**; o diagrama de controle compara a semana atual com a faixa esperada.|q-unesp2022-083,q-unesp2025-093,q-sirio2023-091]]

[[A **transição epidemiológica** brasileira é a queda relativa da mortalidade por doenças infecciosas e o aumento proporcional das crônicas não transmissíveis; por isso as curvas de mortalidade por doença cardiovascular, câncer e doença cerebrovascular mudam de posição nas séries históricas.|q-fmabc2026-096,q-iamspe2022-067,q-uspsp4-093]] [[Ao ler a série de aids, a queda da mortalidade com aumento do número de pessoas vivendo com a doença mostra **aumento da prevalência**: tratamento prolonga a vida.|q-famerp2022-013]]

Para ler qualquer gráfico, pergunte: o eixo vertical conta casos novos, casos existentes ou óbitos, e em que denominador? [[A epidemia de sarampo de 1986 mostra isso: o grupo mais atingido na epidemia e o de maior risco dez anos depois podem ser diferentes, porque o risco é a taxa específica por idade, e não o número de casos.|q-uspsp1-118,q-unesp2021-094]]`,
          texto: `- Casos novos por semana ou mês em série: **incidência**; ciclos regulares anuais: **sazonalidade**. {q-unesp2022-083,q-unesp2025-093,q-sirio2023-091}
- Gráfico de casos de SRAG no tempo: com óbitos, a medida disponível é a **taxa de letalidade**. {q-tp20232-103}
- Aids: queda da mortalidade e aumento de pessoas vivendo com a doença = aumento da **prevalência**. {q-famerp2022-013}
- **Transição epidemiológica**: menos infecciosas, mais crônicas não transmissíveis. {q-fmabc2026-096,q-uspsp4-093}
- Curvas de DCV, DIC, DCbV e câncer em 1996 a 2017: identificar cada curva pela tendência. {q-iamspe2022-067}
- Óbitos diários de covid em barras: o gráfico em ondas, com pico e queda. {q-unesp2021-094}
- Sarampo em 1986 (97,7 por 100.000): o **grupo mais atingido** (maior número de casos) pode não ser o de **maior risco** (maior taxa específica). {q-uspsp1-118}` },
      ],
    },
    {
      id: "indicadores", titulo: "Indicadores de saúde: mortalidade infantil e materna, padronização e nível de saúde",
      introducao: `[[Indicador de saúde é uma medida que resume uma característica da população num lugar e período (mortalidade, natalidade, esperança de vida); precisa ser **mensurável**, **confiável**, **válido** e comparável.|q-famema2022-017,q-amrigs2021-099,q-iamspe2021-069]] Cada indicador responde a uma pergunta diferente, por isso o que importa é decorar o denominador pela pergunta: nascidos vivos para infantil e materna; população para a mortalidade geral; mulheres de 15 a 49 anos para a fecundidade.`,
      fragmentos: [
        { id: "ind-infantil-materna", titulo: "Mortalidade infantil, materna, natalidade e fecundidade", conferir: true, diretrizes: ["ripsa"],
          questoes: ["q-unesp2023-081","q-unesp2024-085","q-unesp2024-086","q-unesp2025-095","q-tp20202-109","q-scmsp2025-046","q-scmsp2026-042","q-scmsp2026-085","q-fmabc2023-086-ia","q-fmabc2026-097","q-unesp2024-094","q-famema2023-017","q-tp20212-115","q-tp20231-103","q-iamspe2023-078","q-fmabc2023-051","q-unicamp2022-065","q-unicamp2022-066"],
          prosa: `O **coeficiente de mortalidade infantil** é o número de óbitos em **menores de 1 ano** dividido pelos **nascidos vivos** do mesmo lugar e ano, vezes 1.000. [[O denominador é o nascido vivo, e não a população: o que se mede é o risco de uma criança que nasceu viva morrer antes de completar um ano. No Brasil de 2023, o valor fica entre 12 e 13 por 1.000, bem acima dos menos de 3 do Japão.|q-fmabc2026-097,q-unesp2024-094,q-scmsp2026-042,q-scmsp2025-046]]

Ele se divide por **idade do óbito**: **neonatal precoce** (0 a 6 dias), **neonatal tardia** (7 a 27 dias), **pós-neonatal** (28 dias a 11 meses). [[Os fatores socioeconômicos e as ações de saúde pública pesam mais no **pós-neonatal**: por isso a vacinação do PNI aparece na queda dessa fase (infecções, diarreia, pneumonia), enquanto o componente neonatal depende mais da assistência ao parto e ao recém-nascido.|q-iamspe2023-078,q-tp20212-115,q-tp20231-103]] O **baixo peso ao nascer** é o principal fator de risco isolado, e 25% dos óbitos do primeiro ano ocorrem na primeira semana.

[[A **razão de mortalidade materna** tem como denominador os **nascidos vivos** (aproximação do número de gestantes), e não a população feminina, multiplicada por 100.000: óbitos de mulheres por causas maternas ÷ nascidos vivos.|q-unesp2024-086,q-unesp2025-095,q-tp20202-109]]

[[A **natalidade** divide os nascidos vivos pela população total (por 1.000); a **fecundidade**, pelas mulheres em idade fértil (15 a 49 anos).|q-unesp2024-085,q-unesp2023-081]] A **mortalidade infantil proporcional** é a fração dos óbitos totais que ocorrem em menores de 1 ano, e pode ser maior numa cidade mesmo com coeficiente menor.`,
          texto: `- **Mortalidade infantil** = óbitos em < 1 ano ÷ nascidos vivos × 1.000. {q-scmsp2026-085,q-fmabc2026-097,q-fmabc2023-086-ia,q-scmsp2026-042}
- Estima a probabilidade (risco) de a criança nascida viva não completar o primeiro ano. {q-unesp2024-094}
- Brasil em 2023: **12 a 13 por 1.000**. {q-scmsp2026-042,q-scmsp2025-046}
- Componentes: neonatal precoce (0 a 6 dias), tardia (7 a 27 dias) e pós-neonatal (28 dias a 11 meses). {q-famema2023-017}
- O impacto da vacinação e dos fatores socioeconômicos aparece no componente **pós-neonatal**. {q-tp20212-115,q-tp20231-103,q-iamspe2023-078}
- **Baixo peso ao nascer** é o fator de risco isolado mais importante. {q-fmabc2023-051}
- **Razão de mortalidade materna**: óbitos maternos ÷ **nascidos vivos** × 100.000. {q-tp20202-109,q-unesp2024-086,q-unesp2025-095}
- **Natalidade**: nascidos vivos ÷ população × 1.000; **fecundidade**: nascidos vivos ÷ mulheres de 15 a 49 anos × 1.000. {q-unesp2024-085,q-unesp2023-081}
- 254 óbitos infantis indígenas: neonatal tardio (29) = **11,42%**; afecções perinatais (69) = **27,16%**; fora do hospital (117) = **46,06%** (denominador: todos os óbitos). {q-unicamp2022-065}
- Cidade A (150 de 1.500 óbitos) × B (100 de 2.000): a mortalidade infantil **proporcional** é maior em A (10% × 5%); o coeficiente usa nascidos vivos como denominador e é outra medida. {q-unicamp2022-066}` },
        { id: "ind-padronizacao", titulo: "Padronização por idade e comparação de populações", conferir: true,
          questoes: ["q-unifesp2022-043","q-usp2025-099","q-usp2026-073","q-usp2026-076","q-unicampdis2024-059","q-unicampdis2024-060","q-didepm-050","q-unifesp2024-075","q-adap24-083"],
          prosa: `A **taxa bruta de mortalidade** depende da estrutura etária: uma cidade com muitos idosos tem taxa bruta maior sem que o risco de morrer seja maior. [[A **padronização** (método direto) aplica as taxas específicas por faixa etária de cada população a uma **população-padrão** e elimina o efeito das diferenças etárias, permitindo comparar populações com estruturas diferentes. Por isso a mortalidade ajustada por idade muda a ordem entre grupos com proporção diferente de idosos.|q-unifesp2022-043,q-didepm-050,q-usp2026-076,q-usp2025-099]]

[[Para comparar o **risco** de morrer por uma causa entre homens e mulheres, usa-se o **coeficiente específico** (óbitos pela causa ÷ população do sexo), e não o número de óbitos nem a proporção entre os óbitos: com 310 óbitos por doença do aparelho circulatório em 100.000 homens e 260 em 100.000 mulheres, o risco é maior nos homens.|q-unifesp2024-075,q-adap24-083,q-usp2026-073]] O **coeficiente padronizado** de Manaus usa óbitos esperados ÷ população × 100.000; o observado usa os óbitos reais.`,
          texto: `- **Padronização** elimina o efeito das diferenças etárias para **comparar** mortalidades. {q-unifesp2022-043,q-didepm-050}
- Método direto: aplicar as taxas específicas por faixa etária a uma **população-padrão**. {q-didepm-050}
- Mortalidade ajustada: grupo com mais idosos pode parecer pior na taxa bruta. {q-usp2026-076}
- Para comparar entre estados usam-se as **taxas específicas por faixa etária** como base. {q-usp2025-099}
- Risco de morrer por causa específica entre sexos: **coeficiente de mortalidade específico**. {q-unifesp2024-075,q-adap24-083}
- Tabela com duas populações: a de **maior taxa de mortalidade** tem maior risco de morte, não a de maior número de óbitos. {q-usp2026-073}
- Taxa observada de Manaus: óbitos observados ÷ população × 100.000; padronizada: óbitos esperados ÷ população × 100.000. {q-unicampdis2024-059,q-unicampdis2024-060}` },
        { id: "ind-nivel-saude", titulo: "Nível de saúde: Nelson de Moraes, Swaroop-Uemura, esperança de vida, DALY e excesso de óbitos", conferir: true, diretrizes: ["ripsa"],
          casos: ["q-iamspe2023-077"],
          questoes: ["q-iamspe2023-077","q-sessp2023-093","q-unesp2021-096","q-unesp2024-087","q-fmabc2022-092","q-iamspe2021-071","q-sirio2026-092","q-iamspe2025-100","q-famema2021-070","q-sirio2022-084","q-unicamp2022-068","q-sirio2021-083","q-sirio2022-082","q-unicampdis2025-041","q-unicampdis2025-042","q-usp2024-078"],
          prosa: `A **curva de Nelson de Moraes** representa a **mortalidade proporcional por faixa etária** (óbitos de cada idade ÷ total de óbitos) e expressa o nível de saúde pelo formato: [[em populações de nível **muito baixo**, a curva é em "L" (a maior parte dos óbitos nos menores de 1 ano); com a melhora, o pico migra para os mais velhos até a curva em "J" invertido, de nível **elevado**, em que os óbitos se concentram nos idosos.|q-iamspe2023-077,q-unesp2021-096,q-unesp2024-087]] O **índice de Swaroop-Uemura** é a proporção de óbitos de pessoas com **50 anos ou mais**: quanto maior, melhor o nível de saúde. As duas medidas dividem os óbitos por **grupo etário**.

[[A **esperança de vida ao nascer** sintetiza o efeito da mortalidade em **todas as idades**: é o número médio de anos que um recém-nascido viveria se fosse submetido às taxas de mortalidade por idade de hoje.|q-iamspe2021-071,q-sirio2026-092]]

[[O **DALY** (anos de vida perdidos ajustados por incapacidade) soma anos perdidos por morte prematura e por incapacidade: mede **carga de doença** com mortalidade e morbidade juntas, e permite priorizar grupos para reduzir incapacidades. Os **anos potenciais de vida perdidos (APVP)** comparam causas que matam jovens e idosos.|q-iamspe2025-100,q-famema2021-070,q-sirio2022-084,q-unicamp2022-068]] [[O **excesso de óbitos** é a diferença entre o observado e o esperado (média dos anos anteriores): em março a julho, 40.000 contra 25.000 mostram o impacto da pandemia.|q-sirio2021-083,q-sirio2022-082]]

A **razão de dependência** (idosos ÷ jovens) e a **mortalidade proporcional** por causa descrevem o perfil da população: 1.410 pessoas acima de 65 anos para 3.950 menores de 15 dá 0,356.`,
          texto: `- **Nelson de Moraes**: curvas de mortalidade proporcional por idade; o formato indica o nível de saúde (muito baixo a elevado). {q-iamspe2023-077,q-sessp2023-093,q-unesp2021-096,q-unesp2024-087}
- **Swaroop-Uemura**: óbitos de 50 anos ou mais ÷ total; ambas usam o **grupo etário**. {q-fmabc2022-092,q-sessp2023-093}
- **Esperança de vida ao nascer** sintetiza a mortalidade em **todas as idades**. {q-iamspe2021-071,q-sirio2026-092}
- **DALY**: mortalidade e morbidade (incapacidade) numa só medida: carga de doença. {q-iamspe2025-100,q-famema2021-070,q-sirio2022-084}
- **APVP**: compara o impacto de causas que matam em idades jovens (covid × DCV). {q-unicamp2022-068}
- **Excesso de óbitos**: observado menos esperado em período de pandemia. {q-sirio2021-083,q-sirio2022-082}
- Proporção de idosos ÷ menores de 15 (razão de dependência): 1.410/3.950 = 0,356. {q-unicampdis2025-041}
- Mortalidade proporcional por doença isquêmica = 12/120 = 10%. {q-unicampdis2025-042}
- Os indicadores se classificam em seis dimensões (demográficos, socioeconômicos, mortalidade, morbidade, recursos e cobertura). {q-usp2024-078}` },
        { id: "ind-servicos", titulo: "Indicadores de serviço, de cuidado e critérios de um bom indicador", conferir: true, diretrizes: ["ripsa"],
          questoes: ["q-usp2025-115","q-usp2024-073","q-usp2024-075","q-fmabc2021-068","q-amrigs2021-099","q-famema2022-017","q-iamspe2021-069"],
          prosa: `[[Um bom indicador é **mensurável** (usa dado disponível), **confiável** (reproduz o mesmo valor), **válido** e **relevante**; indicador de saúde mede uma característica da população em lugar e período definidos.|q-amrigs2021-099,q-famema2022-017]] A epidemiologia, na visão de Rouquayrol, descreve o problema de saúde-doença em nível **coletivo**.

[[Para acompanhar o cuidado de pessoas com hipertensão na UBS, indicadores de **processo e resultado** usam como denominador quem deveria ser atendido: a proporção de pessoas acima de 40 anos sem hipertensão conhecida **sem medida de pressão** no ano é um indicador de **rastreamento**; a prevalência registrada mede alcance.|q-usp2025-115]]

[[Para avaliar o desempenho de **serviços ambulatoriais** que tratam doença crônica infecciosa, a medida é a **taxa de perda de seguimento do tratamento da tuberculose**; comparar dois serviços exige **ajustar** pelas características dos pacientes, já que casos mais graves têm mais abandono.|q-usp2024-073,q-usp2024-075]] Na Pactuação Interfederativa, o indicador de cobertura de vacinação se refere à população geral.`,
          texto: `- Critérios de um indicador: **mensurabilidade**, **confiabilidade**, **validade** e **relevância**. {q-amrigs2021-099}
- Indicador de saúde **mede uma característica** de saúde numa população definida. {q-famema2022-017}
- Descrever um problema de saúde na visão epidemiológica é indicá-lo em **nível coletivo**. {q-iamspe2021-069}
- Rastreamento de HAS: proporção de adultos > 40 anos **sem hipertensão conhecida sem medida de PA**. {q-usp2025-115}
- Desempenho do serviço de TB: **taxa de perda de seguimento do tratamento**. {q-usp2024-073}
- Comparar serviços com taxas de abandono diferentes exige **ajuste pelas características** dos pacientes. {q-usp2024-075}
- Pactuação interfederativa 2017–2021: o denominador de um indicador de saúde é a **população geral** (e não só doentes). {q-fmabc2021-068}` },
      ],
    },
    {
      id: "associacao-e-impacto", titulo: "Associação e impacto: risco relativo, razão de chances, risco atribuível e NNT",
      introducao: `[[As medidas de associação comparam dois grupos: o **risco relativo (RR)** é a razão de riscos; a **razão de chances (OR)** é a razão de chances; o **risco atribuível** é a diferença de riscos; o **NNT** é o inverso dessa diferença.|q-adap25-054,q-adap25-046,q-fmabc2025-085]] RR e OR só se aproximam quando o desfecho é raro; quando é comum, o OR exagera o efeito.

[[A leitura também importa: **RR = 2** significa risco duas vezes maior no exposto; **OR = 3** significa que a **chance** de exposição foi três vezes maior nos casos, e não que o risco seja o triplo.|q-adap25-054,q-unicamp2023-071]]`,
      fragmentos: [
        { id: "assoc-rr-or", titulo: "Calcular e interpretar RR e OR (e o IC)", conferir: true,
          casos: ["q-usp2023-079"],
          questoes: ["q-adap25-054","q-adap26-063","q-unifesp2025-054","q-usp2023-079","q-usp2022-038","q-unesp2026-099","q-uspsp1-120","q-sirio2024-100","q-amrigs2022-083","q-amrigs2023-094","q-usp2024-083","q-unicamp2023-071","q-usp2026-087","q-tp20231-107","q-fmabc2022-090","q-fmabc2022-091","q-simepm89-079","q-einstein2023-071","q-famerp2022-005","q-sessp2026-091","q-unifesp2026-074","q-adap26-074"],
          prosa: `Numa tabela 2×2 (a = expostos doentes, b = expostos sãos, c = não expostos doentes, d = não expostos sãos): **RR = [a/(a+b)] ÷ [c/(c+d)]**, **OR = (a × d) ÷ (b × c)**. [[Em coorte, 10 de 15 expostos e 5 de 15 não expostos adoecem: riscos 0,67 e 0,33, RR = 2. Em caso-controle de 30 pessoas, com 10 de 15 doentes e 5 de 15 não doentes expostos, OR = (10 × 10)/(5 × 5) = 4; em 100 casos e 100 controles com 40 e 20 expostos, OR = (40 × 80)/(60 × 20) = 2,7.|q-fmabc2022-090,q-fmabc2022-091,q-adap26-063]] No transversal ou de coorte com tabela, o RR é o RR; no caso-controle, **não se calcula risco**, só OR.

[[O **intervalo de confiança** mostra a precisão: se incluir 1, a associação não é significativa; o RR de 2,3 a 2,7 em estudo de gestantes indica efeito preciso. O IC do OR de 1,8 (1,2 a 2,7) exclui 1 e portanto indica associação; o de 2,5 (0,9 a 4,1) inclui e não indica.|q-amrigs2022-083,q-usp2022-038,q-uspsp1-120,q-sirio2024-100]]

[[**Confundimento** e **modificação de efeito** não são a mesma coisa: no confundimento o RR bruto difere do RR dentro dos estratos, que são iguais entre si (o tabagismo no café e câncer de pulmão); na modificação de efeito os RRs dentro dos estratos **diferem entre si** (idade e sexo na fratura de fêmur).|q-adap26-074,q-unifesp2026-074]]`,
          texto: `- **RR** = risco nos expostos ÷ risco nos não expostos; **OR** = (a×d)/(b×c). {q-fmabc2022-090,q-fmabc2022-091,q-usp2024-083}
- Coorte com 15 expostos (2/3 doentes) e 15 controles (5 doentes): **RR = 2**. {q-fmabc2022-090}
- Caso-controle com 30 pessoas, 10 de 15 casos e 5 de 15 controles expostos: **OR = 4**. {q-fmabc2022-091}
- 100 casos (40 expostos) e 100 controles (20): **OR ≈ 2,7**. {q-adap26-063}
- OR de 3,0 para radônio: a **chance de exposição** foi 3 vezes maior nos casos. {q-adap25-054}
- Caso-controle de bullying e transtorno alimentar: aumento da chance só nos tipos cujo IC exclui 1. {q-usp2023-079}
- Metanálise com OR 0,83: a **chance** de depressão entre ativos é 0,83 vezes a dos inativos (não a probabilidade). {q-unicamp2023-071}
- OR de 2,96 para readmissão com internação prévia: chance 2,96 vezes maior; o valor **não** é o risco. {q-unesp2026-099}
- Sedentarismo e IAM: o resultado compatível com associação positiva é OR de 1,8 com IC **sem o 1** (1,2–2,7). {q-amrigs2022-083}
- O tabagismo, que associa café e câncer de pulmão, é **confundidor**; quando os RR dos estratos diferem entre si, há **modificação de efeito**. {q-adap26-074,q-unifesp2026-074}
- COVID grave em ≥ 80 anos: RR de 1,3 e confundimento. {q-famerp2022-005}
- Coorte de fumantes e AVC: **2,8 vezes o risco**; p isolado não substitui a estimativa. {q-unifesp2025-054}
- RR bruto de exposição ocupacional: solventes com risco 20 vezes o dos não expostos. {q-sirio2024-100}
- Leptospirose e inundações: incidência de 3,3 contra 0,5 por 100.000 na referência (0 a 0,1% de residências atingidas) dá **RR = 6,6**. {q-usp2026-087}
- Fatores de risco para quedas: dependência nas atividades cotidianas e doença mental (RR > 1 com IC sem 1). {q-tp20231-107}
- Escolaridade materna e epilepsia: usa o RR da coorte. {q-uspsp1-120}
- Estudo de coortes com vaginose e parto prematuro apresentado em figura: leia o RR e o IC de cada estudo (os estudos A a E). {q-sessp2026-091}
- Covid-19 e alteração cognitiva: 75/925 (8,1%) contra 12/1.075 (1,1%) dá **RR = 7,26**, isto é, 7,26 vezes mais probabilidade. {q-einstein2023-071}
- Violência por parceiro íntimo e depressão pós-parto: com a exposição nas colunas da tabela, o RR é (a/(a+c)) ÷ (b/(b+d)). {q-usp2024-083}
- Sedentarismo e condições de saúde: só a depressão tem IC sem o 1 em homens (1,04 a 1,28) e em mulheres (1,01 a 1,19). {q-amrigs2023-094}
- Vacinação contra influenza e demência (coorte de 123.747): a vacinação repetida **reduziu o risco** (RR < 1 com IC sem 1). {q-usp2022-038}
- Gradiente de leptospirose e chance de exposição: veja a categoria de referência. {q-usp2026-087}` },
        { id: "assoc-impacto-nnt", titulo: "Redução de risco, eficácia da vacina e NNT", conferir: true,
          questoes: ["q-adap25-046","q-unifesp2025-046","q-unifesp2026-076","q-scmsp2021-094","q-usp2022-033","q-usp2026-082","q-amrigs2024-090","q-amrigs2025-094","q-tp20252-022","q-tp20261-103","q-fmabc2025-085","q-sessp2025-081","q-unicampdis2023-049","q-unicampdis2023-050","q-einstein2023-072","q-famerp2023-011","q-didepm-090","q-famema2021-075","q-sirio2021-087"],
          prosa: `A **redução absoluta de risco (RAR)** é a diferença entre os riscos (risco do controle − risco do tratado), e o **NNT = 1 ÷ RAR**. [[Em 400 pacientes por grupo com 60 infartos no placebo e 40 no tratado, os riscos são 15% e 10%, a RAR é 5 pontos percentuais e o NNT é **20**; vacina que leva a infecção de 20% para 10% dá NNT de **10**.|q-adap25-046,q-tp20252-022,q-tp20261-103,q-famerp2023-011]]

A **redução relativa do risco (RRR)** é 1 − RR; a **eficácia** (ou efetividade) da vacina é a RRR: [[vacina com 50 doentes em 5.000 contra 120 em 5.000 no placebo dá RR = 0,42 e eficácia de **58%**, com NNT de 71; em 30.000 voluntários (20.000 vacinados, 10.000 placebo) com 20 casos entre os vacinados e 80 no placebo, a eficácia é 87,5%.|q-unicampdis2023-049,q-unicampdis2023-050,q-scmsp2021-094,q-einstein2023-072]] A afirmação "a vacina reduziu a incidência em 80%" é a **redução relativa do risco**, e não o risco relativo.

[[O **NNT** é a medida mais útil para o impacto clínico em populações com riscos individuais diferentes, porque depende do risco basal: com o mesmo RR, quem tem risco alto precisa de menos pacientes tratados para evitar um evento. **NNT 12** significa que 12 pacientes precisam ser tratados para prevenir um evento em um deles; e um evento adverso com risco de 10% contra 5% tem **número necessário para causar dano (NNH) de 20**.|q-fmabc2025-085,q-amrigs2024-090,q-amrigs2025-094]]

A **fração atribuível** responde "que parte dos casos seria evitada sem a exposição": **80% dos cânceres de pulmão devidos ao tabagismo** é risco atribuível. [[Na coorte em que metade é exposta (risco 10%) e metade não (5%), o risco total é 7,5% e a fração atribuível populacional é (7,5 − 5)/7,5 = **1/3**; com incidência de 30 e 10 por 1.000, a fração atribuível entre os expostos é 20/30 ≈ **67%**.|q-unifesp2026-076,q-didepm-090,q-sirio2021-087]]`,
          texto: `- **RAR** = risco do controle − risco do tratado; **NNT = 1/RAR**. {q-adap25-046,q-famerp2023-011,q-usp2022-033}
- 60 e 40 infartos em 400: NNT = **20**; infecção de 20% para 10%: NNT = **10**. {q-adap25-046,q-tp20252-022,q-tp20261-103}
- Trombólise (13,1% × 10% de mortalidade): NNT ≈ **33**. {q-famerp2023-011}
- NNT de 12 para AVC: 12 tratados para prevenir **um** AVC; não significa 12% de redução. {q-amrigs2024-090}
- Eventos adversos gastrointestinais de 10% contra 5%: o inverso da diferença é **20**. {q-amrigs2025-094}
- NNT mede o **impacto clínico** em população de riscos individuais diferentes. {q-fmabc2025-085}
- Sotatercept (84 contra 86): NNT de **15** para evitar uma morte. {q-usp2026-082}
- **Eficácia da vacina** = 1 − RR: 50/5.000 contra 120/5.000 = 58%; NNT ≈ 71. {q-unicampdis2023-049,q-unicampdis2023-050}
- 20 casos entre 20.000 vacinados e 80 entre 10.000 do placebo: eficácia de **87,5%**. {q-scmsp2021-094}
- Vacina que **reduziu a incidência em 80%** é a **redução de risco relativo**. {q-sessp2025-081}
- Nova vacina contra covid em tabela de resultados: eficácia de **62,5%** a partir da segunda dose. {q-einstein2023-072}
- 100 doentes entre 500 tratados (20%) e 250 entre 500 do placebo (50%): eficácia = redução relativa do risco = **60%**. {q-unifesp2025-046}
- Impacto de rastreamento se expressa em **quantos precisam ser rastreados** para salvar um (o inverso da redução absoluta de mortalidade). {q-famema2021-075}
- **Fração atribuível**: 80% dos cânceres de pulmão são devidos ao tabagismo. {q-sirio2021-087}
- Fração atribuível populacional na coorte com metade exposta (10% e 5%): **1/3**; incidência de 30 e 10 por 1.000: **67%** entre expostos. {q-unifesp2026-076,q-didepm-090}` },
      ],
    },
    {
      id: "testes-diagnosticos", titulo: "Testes diagnósticos: sensibilidade, especificidade e valores preditivos",
      introducao: `[[Sensibilidade e especificidade são propriedades do teste: a primeira é a proporção de doentes que o teste acerta, e a segunda, a de sadios que ele acerta. Os **valores preditivos** respondem à pergunta do paciente (se positivo, qual a chance de estar doente?) e **dependem da prevalência**.|q-einstein2021-046,q-uspsp2-109,q-unifesp2025-057]]

[[O mecanismo é o do denominador: com prevalência baixa, os sadios são tantos que até 5% a 10% de falsos positivos superam os verdadeiros positivos; por isso o mesmo teste tem VPP alto em surto e baixo em triagem.|q-adap24-048,q-adap25-057,q-unifesp2024-076]]`,
      fragmentos: [
        { id: "teste-sens-esp-vp", titulo: "Sensibilidade, especificidade, VPP e VPN, e o que muda com a prevalência", conferir: true,
          figuras: [{ arquivo: "figuras/teste-diagnostico.svg", legenda: "Esquema autoral: tabela 2×2 do teste diagnóstico e as fórmulas das medidas." }],
          questoes: ["q-adap24-048","q-adap25-057","q-unifesp2024-076","q-unifesp2025-057","q-unifesp2026-063","q-udisc20262-011","q-famerp2022-007","q-famerp2024-008","q-famerp2025-038","q-uspsp2-109","q-uspsp2-117","q-uspsp2-119","q-sirio2024-093","q-fmabc2021-066","q-fmabc2022-088","q-einstein2021-046","q-sessp2022-095","q-sessp2022-096","q-simepm89-063","q-simepm89-066"],
          prosa: `Na tabela 2×2 (teste positivo ou negativo × doença presente ou ausente): **sensibilidade = VP/(VP + FN)**, **especificidade = VN/(VN + FP)**, **VPP = VP/(VP + FP)**, **VPN = VN/(VN + FN)**. [[Para **rastrear** ou **não perder** uma doença grave e tratável, quer-se alta **sensibilidade** (poucos falsos negativos); para **confirmar**, quer-se alta **especificidade** (poucos falsos positivos).|q-fmabc2021-066,q-fmabc2022-088,q-uspsp2-117]] Um teste muito sensível, com resultado negativo, descarta; um muito específico, com resultado positivo, confirma.

[[Exemplo: sensibilidade 90%, especificidade 80% e prevalência de 10% em 1.000 pessoas: 100 doentes, 90 verdadeiros positivos; 900 sadios, 180 falsos positivos; **VPP = 90/270 = 33%**. Em população com prevalência de 2% (sens. 95%, esp. 90%), o VPP cai para **16%**; em surto com prevalência de 50% e sensibilidade e especificidade de 99%, sobe para **99%**.|q-udisc20262-011,q-unifesp2024-076,q-adap25-057,q-adap24-048,q-uspsp2-119]]

[[Por isso reduzir a idade de início da mamografia para 40 anos, onde a prevalência é menor, **reduz o VPP**, sem alterar sensibilidade nem especificidade; o PSA de 7 ng/dl com sens. 72%, esp. 46% e prevalência de 10% dá VPP de apenas 13%.|q-unifesp2025-057,q-famerp2024-008,q-famerp2025-038]] Se a incidência observada (24%) vem de teste com especificidade de 80%, a verdadeira é de 5%, porque os falsos positivos contam como casos.

A **razão de verossimilhança** (RV+ = sens./(1 − esp.)) não depende da prevalência e permite calcular a probabilidade pós-teste. [[Na consulta, a probabilidade **pré-teste** é a prevalência no contexto (APS, faixa etária, sexo); numa jovem com dor torácica no ambulatório, ela é baixa e o VPP também; e um achado de exame normal faz a rinossinusite bacteriana menos provável.|q-sessp2022-095,q-sessp2022-096,q-simepm89-066]]`,
          texto: `- **Sensibilidade** = VP/(VP+FN); **especificidade** = VN/(VN+FP); **VPP** = VP/(VP+FP); **VPN** = VN/(VN+FN). {q-einstein2021-046,q-uspsp2-109}
- **Prevalência** altera VPP e VPN, mas não a sensibilidade nem a especificidade. {q-uspsp2-109,q-unifesp2025-057}
- Rastreamento de doença grave e tratável: **alta sensibilidade** (poucos falsos negativos). {q-fmabc2021-066,q-fmabc2022-088}
- Teste rápido de sífilis para a atenção básica: o que se espera de um confirmatório é **especificidade e VPP altos**. {q-uspsp2-117}
- Sens. 90%, esp. 80%, prevalência 10%: **VPP = 33%** (90 VP e 180 FP em 1.000). {q-unifesp2024-076,q-udisc20262-011,q-uspsp2-119}
- Sens. 95%, esp. 90%, prevalência 2%: VPP ≈ **16%**. {q-adap25-057}
- Sens. e esp. 99% com prevalência de 50%: VPP ≈ **99%**. {q-adap24-048}
- PSA ≥ 4 (sens. 72%, esp. 46%, prevalência 10%): VPP ≈ **13%**. {q-famerp2024-008}
- Prevalência menor (rastreio a partir dos 40 anos): **VPP menor**. {q-unifesp2025-057}
- Toque retal (sens. 50%, esp. 90%, prevalência 9%): VPP ≈ 33%; o INCA **não recomenda** rastreamento populacional indiscriminado de câncer de próstata. {q-famerp2025-038}
- Sens. 100% e esp. 80% com 24% observados: verdadeira incidência **5%**. {q-unifesp2026-063}
- Critérios com sens. 60% e esp. 90%: a afirmação do psiquiatra só se sustenta se o **VPN** no estudo for alto. {q-simepm89-063}
- Novo teste × RT-PCR: sensibilidade 150/200 = 0,75 e especificidade 50/200 = 0,25 dão **RV+ = 0,75/0,75 = 1,0**: o teste não muda a probabilidade (inútil). {q-famerp2022-007}
- Teste de anemia (sens. 80%, esp. 85%): em prevalência de 15% em vez de 10%, o **VPP aumenta**; sensibilidade e especificidade não mudam. {q-sirio2024-093}
- O VPP depende do **contexto** de atendimento e da faixa etária (jovem com dor torácica na APS). {q-sessp2022-095}
- Um achado normal ajudou a **afastar** a rinossinusite bacteriana. {q-sessp2022-096}
- Probabilidade de o exame diagnosticar corretamente uma condição: sensibilidade e especificidade, ao contrário do VPP. {q-simepm89-066}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-sirio2022-083","q-fmabc2022-099","q-sirio2021-083","q-unifesp2025-054"],
          prosa: `[[Prevalência é casos existentes ÷ população: 1.000 casos em 2 milhões de habitantes dão 0,05%, e a banca (Sírio 2022) deu como gabarito **10%**, que não decorre dos números do enunciado.|q-sirio2022-083]] [[A mortalidade do câncer de colo é 2 óbitos ÷ 100.000 = 2 por 100.000, mas a FMABC 2022 deu "impossível de ser calculado com os dados fornecidos".|q-fmabc2022-099]] [["Excesso de óbitos" é a diferença entre os óbitos observados e os esperados; a pergunta da Sírio 2021 compara apenas dois períodos de março a julho e também aceita essa leitura.|q-sirio2021-083]]`,
          texto: `- Regra: prevalência = casos existentes ÷ população; a prova (Sírio 2022) cobrou **10%** com 1.000 casos em 2 milhões. {q-sirio2022-083}
- Regra: mortalidade = óbitos ÷ população (2 por 100.000 no exemplo); a prova (FMABC 2022) cobrou **"impossível de calcular"**. {q-fmabc2022-099}
- Regra: o excesso de óbitos compara o observado com o esperado; a prova (Sírio 2021) cobrou **excesso de óbitos** ao comparar dois períodos. {q-sirio2021-083}
- Regra: RR de 2,8 indica 2,8 vezes o risco; a prova (UNIFESP 2025) acrescenta um item que pede "cálculo do p" como armadilha. {q-unifesp2025-054}` },
      ],
    },
  ],
});
