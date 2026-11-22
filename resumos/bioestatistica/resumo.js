/* resumos/bioestatistica/resumo.js — resumo adaptativo de bioestatística: estatística descritiva, intervalo de
   confiança, valor de p, erros tipo I e II e poder, escolha do teste, testes diagnósticos (sensibilidade,
   especificidade, valores preditivos, ROC, razão de verossimilhança) e leitura de medidas de efeito e de evidência.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- bioestatistica */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "bioestatistica",
  titulo: "Bioestatística e testes diagnósticos",
  assunto: "ass-bioestatistica",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "grade", texto: "GRADE Working Group — Grading of Recommendations Assessment, Development and Evaluation (certeza da evidência: alta, moderada, baixa, muito baixa)", lidoEm: null },
    { id: "uspstf", texto: "USPSTF — graus de recomendação (A, B, C, D e I) para rastreamento e prevenção", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas com reposição `-ia` no resumo (a reposição entra).", questoes: ["q-scmsp2023-099", "q-amrigs2025-096", "q-amrigs2020-087", "q-tp20212-019"] },
    { motivo: "Anuladas ou desatualizadas sem reposição.", questoes: ["q-unifesp2023-038", "q-unifesp2025-043", "q-scmsp2021-092", "q-scmsp2023-082", "q-usprp2021-120", "q-tp20222-117"] },
  ],
  doencas: [
    {
      id: "descritiva", titulo: "Estatística descritiva: tipos de variável, média, mediana e dispersão",
      introducao: `[[Antes de escolher uma estatística, classifica-se a variável: **discreta** (contagem, como número de filhos), **contínua** (medida, como peso e idade), categórica nominal ou ordinal.|q-iamspe2021-070]] A classificação decide a medida de resumo e o teste.

[[A **média** soma os valores e usa todos, por isso é puxada por valores extremos; a **mediana** é o valor central dos dados ordenados e quase não muda com um extremo; a **moda** é o valor mais frequente. Numa distribuição simétrica as três coincidem; numa assimétrica com cauda longa, a média se afasta da mediana e a **mediana** descreve o valor típico.|q-didepm-060,q-unicampdis2025-095,q-tp20232-120]]

Veja também: **Medidas epidemiológicas** (incidência, risco, NNT), **Desenhos de estudo** (qual desenho gera qual medida) e **Prevenção** (rastreamento e valor preditivo).`,
      fragmentos: [
        { id: "bio-descritiva", titulo: "Média, mediana, desvio-padrão, erro-padrão e a distribuição normal", conferir: true,
          figuras: [{ arquivo: "figuras/distribuicao-normal.svg", legenda: "Esquema autoral: distribuição normal e as faixas de 1, 2 e 3 desvios-padrão em torno da média." }],
          questoes: ["q-iamspe2021-070","q-adap24-049","q-tp20232-120","q-tp20241-120","q-didepm-060","q-unicampdis2025-095","q-unifesp2024-079","q-amrigs2022-082","q-sirio2024-091","q-amrigs2023-096","q-unifesp2026-075","q-unicamp2023-067"],
          prosa: `A **mediana** de um número ímpar de valores ordenados é o do meio (15, 20, 25, 35, 40, 60, 120: **35 minutos**); com número **par**, é a média dos dois centrais (75, 75, 80, 90, 110, 110: (80 + 90) ÷ 2 = **85 mmHg**). [[Quando há um valor extremo (internação de 45 dias entre valores de 3 a 6 dias, ou pressão média de 119 com mediana de 105), a **mediana** é a medida típica; ela é também a escolhida para estaturas de crianças ou rendas com cauda longa.|q-didepm-060,q-unicampdis2025-095,q-tp20232-120,q-amrigs2022-082]] Numa tabela de frequências (30 pessoas com 80 mg/dL, 20 com 90...), usa-se a média ponderada pelos números de pessoas.

O **desvio-padrão** mede a dispersão dos valores em torno da média e **quanto menor, mais precisa** a medida: média de 3.200 g com DP de 100 g é mais precisa que as demais. [[Na distribuição normal, cerca de **68%** dos valores ficam em média ± 1 DP, **95%** em ± 2 DP e **99,7%** em ± 3 DP: idade de 26 ± 5 anos significa que aproximadamente 95% tinham entre 16 e 36.|q-unifesp2026-075,q-amrigs2023-096,q-sirio2024-091]] Curvas com a mesma média e dispersões diferentes diferem em precisão; curvas com a mesma dispersão e médias diferentes diferem em posição.

O **erro-padrão** é o desvio-padrão da **média amostral** (DP ÷ √n); ele mede a incerteza sobre a média, e não a dispersão dos indivíduos. [[A média de 21 com erro-padrão de 0,5 dá, com 95% de confiança, um intervalo de cerca de 21 ± 2 × 0,5, de 20,02 a 21,98.|q-unicamp2023-067]]`,
          texto: `- **Discreta** (contagem), **contínua** (medida). {q-iamspe2021-070}
- Mediana de 15, 20, 25, 35, 40, 60 e 120: **35 minutos** (ordenar e pegar o central). {q-adap24-049}
- Mediana de 6 medidas (75, 75, 80, 90, 110, 110): média dos dois centrais = **85 mmHg**. {q-unifesp2024-079}
- **Valor extremo**: use a **mediana** (internações de 3 a 6 dias e um de 45; PA com média 119 e mediana 105). {q-didepm-060,q-unicampdis2025-095}
- Estatura de crianças para adequar o mobiliário: **mediana**. {q-tp20232-120}
- Glicemias em tabela de frequências: média ponderada, mediana e moda (80; 117; 95). {q-tp20241-120}
- Renda familiar em figura assimétrica: as linhas indicam **mediana e média**. {q-amrigs2022-082}
- **Menor DP** com média parecida = maior **precisão** (3.200 g com 100 g). {q-amrigs2023-096}
- 26 ± 5 anos: cerca de **95%** entre 16 e 36 anos (média ± 2 DP). {q-unifesp2026-075}
- Mesma média com dispersão diferente (precisão) e médias diferentes com mesma dispersão (posição). {q-sirio2024-091}
- **Erro-padrão** (DP ÷ √n): IMC médio de 21 com EP de 0,5 dá IC de **20,02 a 21,98**. {q-unicamp2023-067}` },
      ],
    },
    {
      id: "inferencia", titulo: "Inferência: intervalo de confiança, valor de p, erros e poder",
      introducao: `[[A amostra é só uma entre muitas possíveis, e por isso toda estimativa tem **incerteza**. O **intervalo de confiança** quantifica essa incerteza, e o **valor de p** mede a compatibilidade dos dados com a hipótese nula. Nenhum dos dois diz se a diferença é importante.|q-unifesp2022-054,q-amrigs2024-091]]`,
      fragmentos: [
        { id: "bio-ic", titulo: "Intervalo de confiança e leitura de resultados", conferir: true,
          casos: ["q-usp2023-077"],
          questoes: ["q-adap24-082","q-unifesp2024-074","q-adap25-043","q-adap22-042","q-scmsp2022-096","q-simepm89-080","q-unesp2025-087","q-tp20212-019-ia","q-unifesp2026-080","q-usp2024-085","q-usp2024-093","q-usp2025-114","q-usp2026-081","q-usp2023-077","q-usp2023-078","q-simepm89-069","q-tp20251-120","q-tp20252-064","q-tp20261-115","q-adap23-038","q-usp2026-079","q-amrigs2023-048"],
          prosa: `O **intervalo de confiança de 95%** é a faixa de valores que, se o estudo fosse repetido muitas vezes, conteria o valor verdadeiro em 95% delas; [[na prática, lê-se como a faixa de valores **compatíveis** com os dados. A média de CD4 em 254 a 429 células/mm³ significa que há 95% de confiança de que a média **verdadeira da população** esteja nesse intervalo; **não** é a faixa em que ficam 95% dos pacientes, nem a probabilidade do valor verdadeiro.|q-tp20212-019-ia,q-unifesp2026-080]]

[[A regra de ouro: para RR ou OR, o resultado é **significativo** se o IC **não inclui 1**; para uma **diferença** de médias, se **não inclui 0**. RR = 1,31 (1,15 a 1,50) indica risco 31% maior e significativo; RR = 0,80 (0,68 a 0,94), risco 20% menor e significativo; RR = 1,5 (0,95 a 2,10) ou 1,8 (0,9 a 3,4) **não é significativo**, mas os intervalos admitem aumento importante, e o poder pode ter sido pequeno.|q-unifesp2024-074,q-adap24-082,q-unesp2025-087,q-adap22-042]]

[[**Ausência de significância não é ausência de efeito**: um RR de 0,80 com IC de 0,6 a 1,05 não demonstra benefício, mas também não o exclui; a conclusão é "inconclusivo", não "ineficaz". O fator de risco com RR de 6,65 (2,47 a 17,9) é significativo; o do álcool com RR 4,25 (0,74 a ...) não demonstrou associação, sem descartá-la.|q-adap25-043,q-scmsp2022-096,q-simepm89-080]] [[A **amplitude do IC** mostra a precisão: IC estreito significa amostra grande e estimativa precisa; IC largo, amostra pequena.|q-tp20252-064,q-tp20261-115]]

Num **forest plot**, cada estudo tem um quadrado e uma linha de IC; o diamante é o efeito combinado. [[A **heterogeneidade** (variação além do acaso entre estudos, medida pelo I²) pede cautela na leitura do resumo e investigação das fontes de diferença; ela não invalida a metanálise.|q-adap23-038]] Estudo **de não inferioridade** concluiu que a primaquina por 7 dias tem eficácia semelhante à de 14.`,
          texto: `- **IC95%**: faixa de valores compatíveis com os dados; **95% de confiança** de que a média verdadeira esteja no intervalo. {q-tp20212-019-ia,q-unifesp2026-080}
- RR ou OR: significativo se o IC **não inclui 1**; diferença de médias: se **não inclui 0**. {q-simepm89-080,q-tp20251-120}
- RR = 1,31 (1,15–1,50): risco **31% maior**, significativo. {q-unifesp2024-074}
- RR = 0,80 (0,68–0,94): risco **20% menor**, significativo. {q-adap24-082}
- RR = 1,5 (0,95–2,10) e RR = 1,8 (0,9–3,4; p = 0,09): **não significativo**, mas o IC admite aumento importante. {q-unesp2025-087,q-adap22-042}
- RR = 0,80 com IC que inclui 1: **inconclusivo**, não exclui benefício importante. {q-adap25-043}
- Fator com IC que inclui 1 (álcool, RR 4,25: 0,74–...): **não demonstrou** associação, sem descartá-la. {q-scmsp2022-096}
- RR = 4,0 (0,9–5,8) e RR = 8,6 (0,5–10,3) **não** comprovam fator de risco; IC que inclui 1 não comprova. {q-simepm89-080}
- Metformina na covid: IC incluindo 1 em todos os desfechos: **hipótese nula não rejeitada**. {q-usp2026-079}
- Metanálise de VZV e demência: IC sem 1 mostra associação, não prova causa. {q-usp2024-093}
- Depressão e câncer, metanálise de 18 coortes: só a associação com IC sem 1 vale (pulmão). {q-usp2024-085}
- Cannabis na gestação (aRR com IC abaixo de 1): **proteção** para diabetes gestacional. {q-usp2025-114}
- Estudo de variantes genéticas: só TGFBR1 e KRAS aumentam o risco de câncer de mama total. {q-usp2023-077}
- Ivermectina na covid: IC incluindo 1 em todos os desfechos: **sem eficácia demonstrada**. {q-usp2023-078}
- Exposição solar e câncer de mama: leia a categoria cujo IC exclui 1 (proteção). {q-usp2026-081}
- IC para diferença de PA entre usuárias de contraceptivo e não usuárias: o que inclui **zero** não é significativo. {q-tp20251-120}
- Forest plot com RR total 0,65 (0,52–0,80): **redução significativa** da mortalidade. {q-tp20252-064}
- Dapagliflozina e HbA1c: o estudo de maior diferença pode ter IC sem significância; compare os ICs. {q-tp20261-115}
- **Heterogeneidade** importante entre estudos: ler o resumo com cautela e investigar as fontes. {q-adap23-038}
- Não inferioridade: primaquina 7 dias com eficácia semelhante à de 14. {q-simepm89-069}
- Correlação entre idade e estadiamento da endometriose sem significância: **não foi possível demonstrar**. {q-amrigs2023-048}` },
        { id: "bio-p-erros", titulo: "Valor de p, erro tipo I, erro tipo II e poder", conferir: true,
          questoes: ["q-adap26-075","q-unifesp2022-054","q-fmabc2024-091","q-amrigs2024-091","q-adap26-080","q-amrigs2022-087","q-fmabc2024-096","q-adap22-054"],
          prosa: `O **valor de p** é a probabilidade de observar uma diferença **igual ou maior** que a encontrada **se a hipótese nula fosse verdadeira**. [[Um p de 0,03 significa que, se não houvesse diferença real, esse resultado ou um mais extremo apareceria em 3% das vezes; **não** é a probabilidade de a hipótese nula ser verdadeira, **nem** a de a hipótese do pesquisador estar certa, **nem** mede o tamanho ou a relevância clínica do efeito. Num estudo em que a mãe escolheu o tipo de leite, p < 0,001 não prova causa: há confusão.|q-adap26-075,q-unifesp2022-054,q-amrigs2024-091,q-fmabc2024-091]] Quem acha que p pequeno implica relevância clínica, que p mede a magnitude ou que p dá a probabilidade da hipótese erra nas três.

[[O **erro tipo I (α)** é rejeitar a hipótese nula verdadeira (falso positivo); o **erro tipo II (β)** é **não** rejeitar uma hipótese nula falsa (falso negativo, perder um efeito que existe); o **poder** é 1 − β.|q-amrigs2022-087,q-fmabc2024-096]] A causa mais comum do erro tipo II é a **amostra pequena**: 20 pacientes por grupo e p = 0,18 não excluem o efeito de 8 mmHg descrito antes; evita-se **calculando o tamanho amostral previamente**. [[Quando a amostra planejada é menor que a necessária para detectar a diferença com poder de 80% e α de 5%, a solução é **aumentar o tamanho da amostra**, que reduz o erro-padrão; reduzir α ou escolher desfecho mais variável pioraria o poder.|q-adap26-080,q-adap22-054]] O erro tipo I é uma probabilidade condicional (a de rejeitar H0 dado que H0 é verdadeira).`,
          texto: `- **p** = probabilidade de dado igual ou mais extremo **se H0 for verdadeira**; p = 0,03 → 3%. {q-adap26-075,q-unifesp2022-054}
- p **não** é a probabilidade de H0 ser verdadeira, **nem** mede magnitude ou relevância clínica. {q-amrigs2024-091,q-fmabc2024-091}
- p < 0,001 ajuda a avaliar se o resultado é provavelmente devido ao **acaso**; não prova causa em estudo com escolha da mãe. {q-fmabc2024-091,q-unifesp2022-054}
- **Erro tipo I (α)**: rejeitar H0 verdadeira; é uma probabilidade **condicional**. {q-fmabc2024-096}
- **Erro tipo II (β)**: perder efeito que existe (medicamento que funciona sem efeito no estudo). {q-amrigs2022-087}
- Poucos pacientes e p = 0,18 com efeito esperado de 8 mmHg: **erro tipo II**; evita-se com cálculo prévio da amostra. {q-adap26-080}
- Amostra menor que a calculada para poder de 80% e α de 5%: **aumentar a amostra**. {q-adap22-054}` },
        { id: "bio-testes-hipotese", titulo: "Escolha do teste: t, ANOVA, qui-quadrado, Fisher, Wilcoxon, correlação e sobrevida", conferir: true,
          questoes: ["q-adap22-053","q-adap26-069","q-adap23-030","q-adap22-046","q-unifesp2022-053","q-unifesp2023-030","q-unifesp2026-069","q-amrigs2020-088","q-sessp2026-089","q-didepm-095","q-adap24-081","q-unifesp2024-072","q-didepm-010","q-unifesp2022-046","q-adap21-022","q-einstein2026-074","q-sirio2022-088"],
          prosa: `A escolha do teste decorre de três perguntas: qual o **tipo da variável**, **quantos grupos** e se são **independentes ou pareados**. [[Para comparar a média de uma variável quantitativa entre **dois grupos independentes** (hemoglobina glicada de 40 pacientes com o medicamento e 40 com placebo, IMC entre consumo baixo e alto de gordura), usa-se o **teste t de Student para amostras independentes**; antes e depois no **mesmo** paciente, o **t pareado**.|q-didepm-095,q-unifesp2026-069,q-sessp2026-089,q-amrigs2020-088,q-unifesp2023-030]]

[[Para **três ou mais grupos** (três dietas, três braços de ensaio), a **ANOVA** de um fator, com comparações múltiplas se significativa; usar vários testes t aumenta o erro tipo I.|q-adap22-053,q-adap26-069]] [[Quando a distribuição **não é normal** e a amostra é pequena (12 pacientes, diferenças de dor assimétricas), o equivalente não paramétrico do t pareado é o **Wilcoxon dos postos sinalizados**; para grupos independentes, o Mann-Whitney.|q-adap23-030]]

Para **proporções** em tabela 2×2, o **qui-quadrado**; com frequências esperadas pequenas (menos de 5 em casela), o **teste exato de Fisher**. [[O valor **esperado** de cada casela sob independência é (total da linha × total da coluna) ÷ total geral: com 130 doentes em 5.000 pessoas e 1.000 expostos, o esperado é 26 (expostos doentes) e 104 (não expostos doentes).|q-adap22-046,q-unifesp2022-046]]

A **correlação de Pearson** mede a associação linear entre duas variáveis quantitativas (de −1 a +1): [[r = −0,80 (p < 0,001) é correlação **forte e inversa**, mas **correlação não é causalidade**; o r² (0,64) é a fração da variância explicada. Municípios com maior cobertura vacinal tendem a ter menor incidência de sarampo, ao nível de significância de 5%; estados com TMI mais alta tendem a %PMAQ menor.|q-didepm-010,q-adap24-081,q-unifesp2024-072,q-unifesp2022-053]]

[[A **razão de risco (hazard ratio)** é a razão das taxas instantâneas do evento: HR de 0,70 é taxa cerca de 30% menor; vem de análise de sobrevida (Kaplan-Meier, Cox), que acomoda os **censurados**. A **sobrevida relativa** é a razão entre a observada e a esperada.|q-adap21-022,q-einstein2026-074,q-sirio2022-088]]`,
          texto: `- **t de Student independente**: média de variável quantitativa em **dois** grupos independentes (HbA1c de 40 e 40; IMC por consumo de gordura; dor em grupos não pareados). {q-didepm-095,q-unifesp2026-069,q-sessp2026-089,q-unifesp2023-030}
- No ensaio com dois grupos independentes e variável quantitativa, o teste poderoso é o **t**. {q-amrigs2020-088}
- **ANOVA**: três ou mais grupos (três dietas; placebo, orientação e exercício). {q-adap22-053,q-adap26-069}
- **Wilcoxon (postos sinalizados)**: dados pareados sem distribuição normal, n pequeno. {q-adap23-030}
- **Qui-quadrado**: proporções; **Fisher**: frequências esperadas pequenas (2×2). {q-adap22-046}
- Esperado sob independência = total da linha × total da coluna ÷ total geral: **26** e **104**. {q-unifesp2022-046}
- **Correlação de Pearson**: relação entre duas variáveis quantitativas (VO2 máx e idade). {q-unifesp2022-053}
- r = −0,80: forte e inversa; **não prova causalidade**. {q-didepm-010}
- Correlação −0,72 (p < 0,001) entre cobertura de tríplice viral e sarampo: municípios com maior cobertura tendem a ter menor incidência. {q-adap24-081}
- TMI × %PMAQ nos estados: correlação inversa, significativa a 5%. {q-unifesp2024-072}
- **Hazard ratio** de 0,70: taxa instantânea cerca de **30% menor**. {q-adap21-022}
- Sobrevida global em curva de Kaplan-Meier: compare as curvas e as censuras. {q-einstein2026-074}
- **Sobrevida relativa** = sobrevida observada ÷ esperada. {q-sirio2022-088}` },
      ],
    },
    {
      id: "testes-diagnosticos", titulo: "Testes diagnósticos",
      introducao: `[[Um teste diagnóstico é avaliado contra um **padrão-ouro** (teste de referência, não necessariamente perfeito): **sensibilidade** é a proporção de doentes com teste positivo, **especificidade** é a de sadios com teste negativo.|q-amrigs2024-097,q-iamspe2021-079]] As duas são propriedades do teste. [[O que o médico e o paciente querem saber é outra coisa: dado um resultado, qual a chance de doença: o **valor preditivo positivo** (entre os positivos, quantos estão doentes) e o **valor preditivo negativo**. Esses dependem da **prevalência**.|q-amrigs2025-095,q-unesp2022-087,q-iamspe2023-075]]

Veja também: **Medidas epidemiológicas** (tabela 2×2 e esquema do teste) e **Prevenção** (rastreamento e critérios de Wilson e Jungner).`,
      fragmentos: [
        { id: "diag-calcular", titulo: "Calcular sensibilidade, especificidade e valores preditivos", conferir: true,
          questoes: ["q-adap22-048","q-unifesp2022-045","q-tp20212-120","q-tp20231-119","q-unicampdis2025-091","q-sirio2021-084","q-sirio2021-085","q-sirio2021-086","q-sirio2022-086","q-sirio2022-087","q-usprp2025-024","q-iamspe2021-080","q-fmabc2021-067","q-unifesp2023-028","q-usprp2026-030","q-unicamp2023-065"],
          prosa: `Monte sempre a tabela 2×2 pelas **colunas da doença** (presente e ausente) e as **linhas do teste**. [[Com 342 doentes (254 testes positivos) e 328 sadios (30 positivos): **sensibilidade 254/342 = 74,2%**, **especificidade 298/328 = 90,8%**, **VPP 254/284 = 89,4%** e **VPN 298/386 = 77,2%**. Com 2.500 doentes (1.800 positivos) e 5.000 sadios (800 positivos), a sensibilidade é 72%, a especificidade 84%, o VPP 69% e o VPN 85,7%.|q-tp20212-120,q-tp20231-119,q-sirio2021-084,q-sirio2021-085,q-sirio2021-086,q-sirio2022-086,q-sirio2022-087]]

[[Com prevalência, sensibilidade e especificidade dadas, calcula-se numa população imaginária de 1.000: prevalência 20%, sensibilidade 80%, especificidade 70% dão VPP de 40% e VPN de 93%; prevalência de 0,5%, sensibilidade 100% e especificidade 80% dão, em 1.000, 5 doentes e 199 falsos positivos.|q-iamspe2021-080,q-fmabc2021-067]] [[Sensibilidade de 90% e especificidade de 90% com prevalência de 20% dão VPP de 69,2%, e na prevalência de 2% o VPP é de apenas 15,5%.|q-usprp2025-024]]

A **acurácia** é (VP + VN) ÷ total. [[A razão de verossimilhança positiva é sens./(1 − esp.): teste com 90 positivos entre 100 doentes e 30 entre 200 sadios dá 0,9/0,15 = **6**, e o positivo é seis vezes mais frequente em quem tem a doença.|q-adap22-048,q-unicampdis2025-091]] Para interpretar as bulas: sensibilidade de 99,1% significa 0,9% de **falso-negativos** entre os doentes; 88% de sensibilidade é 88% de verdadeiros-positivos entre os doentes.

[[Se o questionário que detecta a exposição é imperfeito (sensibilidade e especificidade conhecidas), os números observados mudam e é preciso **corrigi-los**: no exemplo de 56 e 40 expostos em 100 casos e 100 controles, o OR corrigido é 2,3.|q-unifesp2022-045]]`,
          texto: `- **Sensibilidade** = VP/(VP+FN); **especificidade** = VN/(VN+FP); **VPP** = VP/(VP+FP); **VPN** = VN/(VN+FN). {q-tp20212-120,q-tp20231-119}
- 254/342 doentes positivos e 30/328 sadios positivos: sens. **74,2%**, esp. **90,8%**, VPP **89,4%**, VPN **77,2%**. {q-tp20212-120,q-tp20231-119}
- Toque retal: 1.800/2.500 casos e 800/5.000 controles positivos: sens. **72%**, esp. **84%**, VPP **69%**, VPN **85,7%**. {q-sirio2021-084,q-sirio2021-085,q-sirio2021-086,q-sirio2022-086,q-sirio2022-087}
- Prevalência 20%, sens. 80%, esp. 70%: VPP **40%**, VPN **93%**. {q-iamspe2021-080}
- Prevalência 0,5%, sens. 100%, esp. 80% em 1.000: **5 doentes e 199 falsos positivos**. {q-fmabc2021-067}
- Sens. e esp. 90%: VPP **69,2%** com prevalência de 20% e **15,5%** com prevalência de 2%. {q-usprp2025-024}
- Teste com 90/100 e 30/200: **RV+ = 6**. {q-adap22-048}
- Sensibilidade de 99,1% = **0,9% de falso-negativos**; de 88% = 88% de verdadeiros-positivos. {q-unifesp2023-028}
- **Acurácia** = (VP + VN) ÷ total; novo teste para autismo com cerca de 87%. {q-unicampdis2025-091}
- LF-LAM em HIV: VPP baixo (51,9%) = considerável número de **falso-positivos**. {q-usprp2026-030}
- **Sinal de Koplik** presente em 60% dos incubando sarampo: a sensibilidade é 60% e a **especificidade é elevada** (patognomônico). {q-unicamp2023-065}
- Caso-controle com 56 e 40 expostos e questionário imperfeito: OR corrigido **2,3**. {q-unifesp2022-045}` },
        { id: "diag-uso-clinico", titulo: "Prevalência, valor preditivo e escolha do teste na prática", conferir: true,
          questoes: ["q-unesp2022-087","q-iamspe2023-075","q-amrigs2025-095","q-usprp2024-013","q-usprp2021-022","q-iamspe2021-079","q-iamspe2023-073","q-tp20231-108","q-unicamp2023-070","q-fmabc2021-070","q-fmabc2026-085","q-scmsp2021-093","q-scmsp2023-099-ia","q-amrigs2024-097","q-amrigs2023-092","q-amrigs2023-093","q-amrigs2025-096-ia","q-amrigs2020-087-ia","q-amrigs2024-096"],
          prosa: `[[**Quanto maior a prevalência, maior o VPP e menor o VPN**: o nódulo pulmonar em tabagista idoso tem mais chance de ser câncer que em jovem de 22 anos, porque a prevalência é maior; o mesmo teste sorológico de hepatite B tem VPP de 40% em campanha aberta e muito maior em grupo de risco. Numa população sem circulação do vírus da rubéola, o exame sorológico (IgM reagente) em gestantes tem VPP praticamente zero.|q-iamspe2023-075,q-amrigs2025-095,q-usprp2024-013,q-unesp2022-087]] Sensibilidade e especificidade **não** mudam com a prevalência.

[[O teste de **alta sensibilidade** serve para **descartar** (um resultado negativo exclui a doença: "SnNout"); o de **alta especificidade** serve para **confirmar** (um positivo a confirma: "SpPin"). Quando a doença é grave e tratável, como o infarto, quer-se sensibilidade próxima de 100%, para não deixar passar casos; o D-dímero de sensibilidade alta e especificidade baixa **exclui** embolia pulmonar quando a probabilidade pré-teste é baixa.|q-unicamp2023-070,q-scmsp2023-099-ia,q-fmabc2026-085,q-iamspe2021-079]] Para **identificar a prevalência** de diabetes no município, quer-se um teste de **alta sensibilidade e baixo custo**.

[[Se o médico pede muitos exames a quem tem probabilidade pré-teste alta de angina, o VPP é alto; pedir exame a quem tem baixa probabilidade gera muitos falsos positivos.|q-fmabc2021-070,q-scmsp2021-093]] [[Os testes **em série** (positivos nos dois) melhoram a **especificidade**; os **em paralelo** (positivo em qualquer um) melhoram a **sensibilidade**: com um positivo e um negativo em paralelo, o paciente é considerado **positivo**.|q-iamspe2023-073,q-amrigs2024-096]]

[[Um aparelho defeituoso mostra sempre abaixo de 100 bpm: a **sensibilidade é zero** e a **especificidade, 100%**. Um teste de HIV com sensibilidade de 100% e especificidade de 98% garante que nenhum doente tem resultado negativo, mas 2% dos sadios terão falso-positivo; **especificidade** de 99,31% significa que 99,31% dos que não têm a doença testam negativo.|q-amrigs2023-092,q-amrigs2025-096-ia,q-amrigs2020-087-ia]] A pergunta clássica de Gigerenzer (prevalência de 1%, sensibilidade de 90%, falso-positivo de 5%) tem como resposta VPP em torno de **15%**, e não 90%.`,
          texto: `- **Maior prevalência** → maior **VPP** e menor VPN; sens. e esp. não mudam. {q-iamspe2023-075,q-unesp2022-087,q-amrigs2025-095}
- Nódulo pulmonar em tabagista idoso: maior probabilidade pelo **VPP maior** (maior prevalência). {q-iamspe2023-075}
- Rubéola em gestantes com IgM reagente sem circulação do vírus: VPP praticamente **zero**. {q-usprp2024-013}
- RT-PCR de sensibilidade baixa para rastrear a população: a conduta tende a ser **inefetiva**, com muitos falso-negativos. {q-usprp2021-022}
- Testes **específicos** dão poucos falso-positivos; **sensíveis** são úteis para descartar. {q-iamspe2021-079}
- Diagnóstico de IAM: **sensibilidade próxima a 100%** para não deixar de diagnosticar. {q-unicamp2023-070}
- **D-dímero**: sensibilidade alta e especificidade baixa; negativo exclui EP quando a probabilidade é baixa. {q-scmsp2023-099-ia}
- **VPN alto** em exames de exclusão (D-dímero). {q-fmabc2026-085}
- Prevalência do diabetes no município: **alta sensibilidade e baixo custo**. {q-tp20231-108}
- Série melhora a **especificidade**; paralelo: um positivo basta para considerar **positivo**. {q-iamspe2023-073,q-amrigs2024-096}
- **Padrão-ouro**: teste usado como referência. {q-amrigs2024-097}
- Aparelho que sempre marca < 100 bpm: **sensibilidade zero**, especificidade 100%. {q-amrigs2023-092}
- HIV com sens. 100% e esp. 98%: **nenhum doente** terá resultado negativo. {q-amrigs2025-096-ia}
- Especificidade de 99,31%: 99,31% dos sem doença testam negativo. {q-amrigs2020-087-ia}
- Probabilidade pré-teste alta (angina típica) torna o VPP alto; pedir tudo a quem tem baixa gera falso-positivos. {q-fmabc2021-070,q-scmsp2021-093}
- Gigerenzer: prevalência 1%, sens. 90%, falso-positivo 5%: VPP **entre 10 e 20%**. {q-amrigs2023-093}` },
        { id: "diag-roc-rv", titulo: "Curva ROC, ponto de corte e razão de verossimilhança", conferir: true,
          figuras: [{ arquivo: "figuras/roc.svg", legenda: "Esquema autoral: curva ROC, os dois testes defeituosos nos cantos e o efeito de mover o ponto de corte." }],
          questoes: ["q-usprp2023-053","q-sessp2024-082","q-unicamp2023-068","q-unifesp2025-053","q-adap25-053","q-adap21-120","q-amrigs2023-095","q-amrigs2024-094","q-amrigs2025-093","q-sirio2024-095"],
          prosa: `A **curva ROC** coloca no eixo vertical a **sensibilidade** e no horizontal **1 − especificidade**, para cada ponto de corte. [[O melhor ponto de corte é o que **mais se aproxima do canto superior esquerdo** (sensibilidade alta e poucos falso-positivos); a **diagonal** representa o acaso (50%), e o método com **maior área sob a curva** é o melhor.|q-usprp2023-053,q-sessp2024-082,q-unicamp2023-068]]

[[Mover o ponto de corte troca uma coisa pela outra: baixando de 20 para 12 unidades, **aumenta a sensibilidade** (menos falso-negativos) e **diminui a especificidade** (mais falso-positivos).|q-adap21-120]] [[Os dois testes defeituosos da prova ficam nos cantos: o que **nunca fica positivo** tem sensibilidade 0 e especificidade 100% (canto inferior esquerdo, 1 − esp. = 0); o que **sempre marca positivo** tem sensibilidade 100% e especificidade 0 (canto superior direito).|q-adap25-053,q-unifesp2025-053]]

A **razão de verossimilhança** diz quantas vezes um resultado é mais provável em doentes que em sadios e **multiplica as chances pré-teste** (não depende da prevalência): **RV+ = sens./(1 − esp.)** e **RV− = (1 − sens.)/esp.**. [[RV+ = 1 significa que o teste **não altera** a probabilidade pré-teste (é inútil para confirmar), e sensibilidade e especificidade somam 1. RV+ alta (35 para o antígeno urinário de pneumococo) aumenta muito a probabilidade pós-teste quando positivo; RV− baixa (próxima de 0) reduz muito quando negativo e permite descartar meningite bacteriana.|q-amrigs2023-095,q-amrigs2024-094,q-sirio2024-095,q-amrigs2025-093]]`,
          texto: `- **ROC**: sensibilidade × (1 − especificidade); melhor ponto = o mais próximo do **canto superior esquerdo**. {q-usprp2023-053}
- A **diagonal** é o acaso (sem poder discriminatório). {q-sessp2024-082}
- **Maior área sob a curva** = método melhor. {q-unicamp2023-068}
- Reduzir o ponto de corte: **sensibilidade ↑** e **especificidade ↓**. {q-adap21-120}
- Teste que nunca fica positivo: **sens. 0** e esp. 100% (canto inferior esquerdo). {q-adap25-053}
- Aparelho que sempre marca hipertensão: **sens. 100%**, esp. 0 (canto superior direito). {q-unifesp2025-053}
- **Razão de verossimilhança**: quantas vezes mais provável o resultado em doentes que em sadios; altera a probabilidade pós-teste. {q-amrigs2023-095}
- **RV+ = 1**: o teste não altera a probabilidade pré-teste e é inútil para confirmar. {q-amrigs2024-094}
- **RV−** muito baixa com teste negativo: **descartar** meningite bacteriana. {q-amrigs2025-093}
- RV+ de 35: o resultado positivo **aumenta muito** a probabilidade pós-teste. {q-sirio2024-095}` },
      ],
    },
    {
      id: "efeito-e-evidencia", titulo: "Medidas de efeito e medicina baseada em evidências",
      introducao: `[[Quem lê um estudo precisa distinguir o **efeito relativo** (RR, redução relativa do risco), que impressiona, do **efeito absoluto** (redução absoluta do risco, NNT), que informa o benefício real; a primeira não depende do risco basal, e o segundo sim.|q-fmabc2023-099,q-uspsp1-110,q-fmabc2021-073]]`,
      fragmentos: [
        { id: "efeito-medidas", titulo: "RR, RRR, RRA, NNT, densidade de incidência e medidas de efeito", conferir: true,
          questoes: ["q-adap22-045","q-adap23-028","q-unifesp2022-048","q-uspsp1-110","q-fmabc2021-072","q-fmabc2021-073","q-fmabc2023-099","q-unicampdis2025-047","q-unicampdis2024-051","q-sirio2021-092","q-sirio2022-092","q-unifesp2022-042"],
          prosa: `Os cálculos de RR, OR, RAR e NNT estão no resumo de **medidas epidemiológicas**; aqui ficam a leitura e as definições. [[**RR** = risco nos expostos ÷ risco nos não expostos: 40/200 contra 30/300 dá risco relativo de **2,0** e diferença de risco de **10 pontos percentuais**; mortalidade infantil 21 vezes maior em filhos de mães sem escolaridade é um **risco relativo**.|q-adap22-045,q-unicampdis2025-047]]

[[**RRR** (redução relativa do risco), **RRA** (absoluta) e **NNT** são as medidas de avaliação de tratamento: a clorpromazina reduziu de 33% para 9% a proporção com sintomas, **RRA = 24%** e NNT ≈ 4; "1 em cada 4 tratados" tem **poder real de evitar** sintomas. O **NNT é o inverso da redução absoluta de risco**, e 1 caso a menos para cada 50 tratados é NNT = 50.|q-fmabc2021-072,q-fmabc2021-073,q-fmabc2023-099,q-uspsp1-110,q-unifesp2022-048]]

[[Em coorte em que os participantes ficam tempos diferentes em observação (18 casos em 400 pessoas, 1.500 pessoas-ano), a medida correta é a **densidade de incidência**: 12 por 1.000 pessoas-ano, e não incidência acumulada de 4,5%.|q-adap23-028]] Num inquérito de adolescentes, medidas de prevalência e razão de prevalências, não incidência, descrevem o que foi medido em um único momento; num gradiente de risco por proximidade de rodovias, a maior prevalência próximo às rodovias é o **gradiente biológico (dose-resposta)**.

**Eficácia** é o benefício em condições ideais (ensaio); **efetividade** é o benefício na prática: uma vacina que evitou 50% das internações em coorte de grupos de risco expressa **efetividade**.`,
          texto: `- Coorte de 200 expostos (40) e 300 não expostos (30): **RR 2,0** e diferença de risco **10 pontos**. {q-adap22-045}
- Risco de morrer 21 vezes maior em filhos de mães sem escolaridade: **risco relativo**. {q-unicampdis2025-047}
- Clorpromazina: 33% × 9% = **RRA de 24%**; 1 em 4 tratados é beneficiado. {q-fmabc2021-072,q-fmabc2021-073}
- RRR, RRA e NNT são as medidas de avaliação do tratamento. {q-fmabc2023-099}
- **NNT = 1/RRA**; 1 caso a menos para cada 50 tratados é **NNT 50**. {q-uspsp1-110,q-unifesp2022-048}
- 18 casos e 1.500 pessoas-ano: **12 por 1.000 pessoas-ano** (densidade de incidência). {q-adap23-028}
- Adolescentes em inquérito: **prevalência** e razão de prevalências. {q-unifesp2022-042}
- Maior prevalência próximo às rodovias: **gradiente biológico** (dose-resposta). {q-unicampdis2024-051}
- **Eficácia** = benefício esperado (condições ideais). {q-sirio2021-092}
- Vacina de gripe que evitou 50% das internações em coorte de grupos de risco: **efetividade**. {q-sirio2022-092}` },
        { id: "mbe-grade", titulo: "Medicina baseada em evidências, GRADE e graus de recomendação", conferir: true, diretrizes: ["grade","uspstf"],
          questoes: ["q-scmsp2025-089","q-scmsp2026-097","q-amrigs2021-098","q-fmabc2023-100","q-sirio2023-098","q-sirio2021-095","q-einstein2027-074","q-sirio2025-097"],
          prosa: `A **MBE** integra a **melhor evidência**, a **experiência clínica** e os **valores do paciente**; [[ela não descarta a experiência do médico, e quem diz que "descarta" está dando a alternativa incorreta. Seus paradigmas incluem informações de estudos sistemáticos, reprodutíveis e sem tendenciosidade.|q-amrigs2021-098,q-fmabc2023-100]] Na atenção primária, aplica-se com a **probabilidade pré-teste** (estimativa da chance de doença antes de pedir o exame), que muda o valor do teste.

[[O sistema **GRADE** classifica a **certeza da evidência** (alta, moderada, baixa, muito baixa): estudos **randomizados** partem de alta e **observacionais** de baixa, mas podem subir (efeito grande, dose-resposta) ou descer (risco de viés, imprecisão, inconsistência). Por isso estudos observacionais podem chegar a certeza alta. Com certeza **baixa**, a estimativa sugere benefício, mas a confiança é limitada e estudos futuros podem mudá-la, mesmo com p significativo.|q-scmsp2025-089,q-einstein2027-074]]

[[Nos graus de recomendação do USPSTF, o **grau B** significa grande certeza de que o benefício líquido é **moderado** (rastreamento lipídico em adultos de risco aumentado); o nível de evidência **A** nas diretrizes cardiológicas vem de **múltiplos ensaios randomizados** de bom porte e concordantes, ou de metanálise robusta.|q-sirio2023-098,q-sirio2021-095]] O viés de gênero no atendimento (maior tempo porta-balão em mulheres, mesmo após ajuste) é exemplo de limitação que a análise estatística evidencia.`,
          texto: `- **MBE** = melhor evidência + experiência clínica + valores do paciente; **não descarta** a experiência. {q-amrigs2021-098,q-fmabc2023-100}
- Aplicação na APS: **probabilidade pré-teste** antes de pedir o exame. {q-scmsp2026-097}
- **GRADE**: estudos observacionais podem ter certeza **alta** (apesar das limitações). {q-scmsp2025-089}
- GRADE **baixa** com RR significativo (0,78; p = 0,03): estimativa sugere benefício, **confiança limitada**. {q-einstein2027-074}
- USPSTF **grau B**: grande certeza de benefício líquido **moderado**. {q-sirio2023-098}
- Nível de evidência **A**: múltiplos ensaios randomizados concordantes e/ou metanálise robusta. {q-sirio2021-095}
- Maior tempo porta-balão em mulheres após ajuste multivariado: possível **viés de gênero** no atendimento. {q-sirio2025-097}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-tp20212-019-ia","q-usp2025-114","q-scmsp2025-089"],
          prosa: `[[O IC de 95% de uma média **não** é a probabilidade de o valor verdadeiro estar nele, e sim a confiança no método; a versão desatualizada da questão dos linfócitos CD4 (TP 2021/2) cobrou a "probabilidade"; a reposição corrige para "95% de confiança".|q-tp20212-019-ia]] [[A regra de leitura do aRR é proteção quando o IC inteiro está abaixo de 1; a USP 2025 cobrou proteção para diabetes gestacional na coorte de Cannabis.|q-usp2025-114]] [[Estudos observacionais partem de certeza baixa no GRADE; a SCMSP 2025 cobrou que **podem** chegar a nível alto.|q-scmsp2025-089]]`,
          texto: `- Regra: IC95% = **95% de confiança** de que a média verdadeira esteja no intervalo; a versão desatualizada cobrava "probabilidade" (substituída pela reposição). {q-tp20212-019-ia}
- Regra: aRR com IC todo < 1 = **proteção**; a prova (USP 2025) cobrou proteção para diabetes gestacional. {q-usp2025-114}
- Regra: observacional parte de certeza baixa no GRADE; a prova (SCMSP 2025) cobrou que **pode** ser alta. {q-scmsp2025-089}` },
      ],
    },
  ],
});
