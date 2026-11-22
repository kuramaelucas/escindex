/* resumos/desenhos-de-estudo/resumo.js — resumo adaptativo de desenhos de estudo epidemiológico: coorte,
   caso-controle, transversal, ecológico, ensaio clínico, vieses e confusão, causalidade (Bradford Hill),
   revisão sistemática e metanálise, hierarquia da evidência, amostragem e a medida que cada desenho produz.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- desenhos-de-estudo */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "desenhos-de-estudo",
  titulo: "Desenhos de estudo epidemiológico",
  assunto: "ass-desenhosestudo",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "consort", texto: "Schulz KF et al. — CONSORT 2010 Statement: updated guidelines for reporting parallel group randomised trials (BMJ 2010;340:c332; PMC2844940)", edicao: "2010", lidoEm: "2026-11-22" },
    { id: "prisma", texto: "Page MJ et al. — The PRISMA 2020 statement: an updated guideline for reporting systematic reviews (BMJ 2021;372:n71; PMC8005924)", edicao: "2020", lidoEm: "2026-11-22" },
    { id: "cebm", texto: "Oxford Centre for Evidence-Based Medicine — Levels of Evidence (2009 e 2011); classes de recomendação ACC/AHA (I, IIa, IIb, III)", lidoEm: null },
    { id: "strobe", texto: "von Elm E et al. — STROBE Statement: relato de estudos observacionais (coorte, caso-controle e transversal)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas, sem reposição.", questoes: ["q-unifesp2022-052", "q-scmsp2021-085", "q-einstein2023-070"] },
  ],
  doencas: [
    {
      id: "observacionais", titulo: "Estudos observacionais: coorte, caso-controle, transversal e ecológico",
      introducao: `[[Todo desenho responde a uma pergunta de partida: de onde o pesquisador parte (da exposição, do desfecho, de um único momento ou de uma população inteira) e se ele intervém ou apenas observa.|q-uspsp1-101,q-iamspe2025-088,q-unesp2026-091]] Quem decide o desenho pela pergunta, e não pelo nome, acerta quase todas as questões de classificação.

[[Observacional significa que o investigador apenas observa e compara; experimental significa que ele atribui a exposição, em geral por sorteio.|q-famema2021-074,q-einstein2021-049]] No **observacional** há quatro desenhos clássicos: **coorte** (parte da exposição e acompanha até o desfecho), **caso-controle** (parte do desfecho e olha para trás, à procura da exposição), **transversal** (mede exposição e desfecho no mesmo momento) e **ecológico** (a unidade de análise é o grupo, e não a pessoa).

[[A regra de escolha é a frequência do desfecho: doença rara pede caso-controle; exposição rara pede coorte; prevalência pede transversal; dado agregado pede ecológico.|q-027,q-uspsp4-092,q-simepm89-077,q-uspsp2-101]]

Veja também: **Medidas epidemiológicas** (cálculo de risco, razão de chances e prevalência), **Bioestatística** (amostra, intervalo de confiança), **Prevenção** (rastreamento) e **Vigilância em saúde** (investigação de surto).`,
      fragmentos: [
        { id: "des-coorte", titulo: "Coorte", conferir: true, diretrizes: ["strobe"],
          casos: ["q-einstein2022-074"],
          questoes: ["q-adap26-068","q-scmsp2021-091","q-amrigs2025-098","q-amrigs2021-082","q-amrigs2022-086","q-amrigs2024-095","q-unesp2023-090","q-unesp2022-088","q-unesp2024-081","q-unesp2026-091","q-famema2022-018","q-usprp2025-035","q-unicampdis2023-058","q-unicampdis2024-113","q-uspsp1-101","q-uspsp2-114","q-uspsp4-092","q-tp20212-109","q-sirio2021-094","q-sirio2025-082","q-fmabc2021-080","q-fmabc2023-098","q-einstein2022-074","q-einstein2025-071","q-scmsp2022-084"],
          prosa: `Na **coorte**, o grupo é definido pela **exposição** e acompanhado no tempo até o desfecho. [[Como se vê o desfecho aparecer depois da exposição, mede-se a **incidência** em expostos e não expostos, e a medida de associação é o **risco relativo**. Por isso a coorte é o desenho observacional mais forte para falar de causa, e é o recomendado quando o experimento é antiético.|q-uspsp1-101,q-unesp2026-091,q-fmabc2023-098]]

[[A coorte pode ser **prospectiva** (a exposição é medida hoje e o desfecho aparece depois) ou **retrospectiva ou histórica** (a exposição e o desfecho já aconteceram e estão em registros; o que a faz coorte é o sentido do raciocínio, da exposição ao desfecho).|q-scmsp2021-091,q-einstein2025-071,q-amrigs2022-086,q-amrigs2024-095]] Em um estudo de vários anos em que se mede o tabagismo em 1985 e o câncer de pulmão entre 2010 e 2015, a coorte é o desenho.

A coorte é boa para **exposição rara** (seleciona-se quem a tem) e para vários desfechos de uma exposição; é ruim para doença rara (seria preciso acompanhar milhares por muito tempo), cara e sujeita a **perda de seguimento**. [[A doença rara com exposição comum exige tamanho enorme: nesse caso o caso-controle é mais eficiente; a exposição rara a um agente químico em 5.000 trabalhadores favorece a coorte.|q-uspsp4-092,q-famema2022-018]]`,
          texto: `- **Coorte**: parte da exposição, acompanha no tempo e mede a **incidência** do desfecho; medida: **risco relativo**. {q-unesp2026-091,q-amrigs2021-082,q-uspsp1-101}
- Framingham, trabalhadores expostos × não expostos a solvente, dieta mediterrânea e AVC, apneia e diabetes: **coorte**. {q-fmabc2021-080,q-unicampdis2023-058,q-adap26-068,q-unesp2023-090,q-unesp2024-081}
- Coorte **retrospectiva (histórica)**: usa registros em que exposição e desfecho já ocorreram; o que a define é a direção exposição → desfecho. {q-scmsp2021-091,q-einstein2025-071,q-amrigs2022-086,q-amrigs2024-095}
- Boa para **exposição rara**; para estudar a associação exposição-desfecho quando o experimento é antiético, a coorte é a opção. {q-uspsp4-092,q-fmabc2023-098}
- Característica: é possível ter **variabilidade na composição** das coortes e ela mede incidência. {q-famema2022-018}
- Estudar a associação entre IMC e sobrevida a partir de registros, ou depressão antenatal e pós-parto, é coorte. {q-tp20212-109,q-amrigs2025-098}
- Fatores de vulnerabilidade como risco de complicação de uma doença comum: coorte. {q-scmsp2022-084}
- Acompanhar 50 hipertensos por um período e verificar desfecho: coorte. {q-unicampdis2024-113}
- Estudo com lavradores e risco de intoxicação ao longo do tempo (curva de incidência acumulada): coorte. {q-einstein2022-074}
- Meios de transporte e mortalidade em quase 400 mil pessoas, e micro e nanoplásticos em placas de ateroma com acompanhamento de 34 meses: coortes prospectivas. {q-usprp2025-035,q-uspsp2-114,q-sirio2021-094,q-sirio2025-082}
- Desenho de coorte para avaliar a incidência em vacinados e não vacinados mede **risco relativo**. {q-uspsp2-114}` },
        { id: "des-casocontrole", titulo: "Caso-controle", conferir: true, diretrizes: ["strobe"],
          casos: ["q-usprp2021-015"],
          questoes: ["q-027","q-adap22-052","q-unifesp2025-061","q-unifesp2026-078","q-unifesp2026-079","q-usprp2021-015","q-amrigs2024-093","q-unesp2024-084","q-unesp2025-085","q-unesp2026-098","q-tp20202-111","q-tp20251-107","q-unicamp2022-067","q-unicampdis2023-052","q-uspsp2-101","q-simepm89-077","q-sirio2026-090","q-fmabc2024-081","q-uspsp3-024","q-uspsp5-075","q-usp2026-077","q-famerp2025-037"],
          prosa: `No **caso-controle**, o ponto de partida é o **desfecho**: reúnem-se pessoas com a doença (casos) e sem ela (controles) e pergunta-se, olhando para trás, quem esteve exposto. [[Como o pesquisador fixa quantos casos e quantos controles incluir, ele não conhece a incidência nem o risco: a medida de associação é a **razão de chances (odds ratio)**.|q-adap22-052,q-sirio2026-090,q-uspsp3-024]]

[[É o desenho ideal para **doença rara** ou de longa latência: encontrar 100 casos de sarcoma raro num registro e compará-los com controles é rápido e barato, enquanto uma coorte precisaria de milhares de pessoas por décadas.|q-027,q-fmabc2024-081,q-simepm89-077,q-uspsp2-101]] Também permite investigar vários fatores de risco ao mesmo tempo e surtos (síndrome serotoninérgica, microcefalia por Zika).

O ponto frágil é **escolher bem os controles**: [[eles devem representar a população que deu origem aos casos, ou haverá viés de seleção; e a exposição é lembrada (viés de memória) de modo diferente por quem adoeceu.|q-amrigs2024-093,q-adap26-079]] Usar casos **prevalentes** em vez de incidentes é mais rápido, mas mistura fatores de risco com fatores de sobrevida.`,
          texto: `- **Caso-controle**: parte do **desfecho** e busca a exposição no passado; medida de associação: **razão de chances**. {q-adap22-052,q-sirio2026-090,q-uspsp3-024}
- Indicado para **doença rara** ou estudo de surto com tempo e recursos limitados. {q-027,q-uspsp2-101,q-simepm89-077,q-fmabc2024-081,q-unicampdis2023-052}
- Microcefalia e Zika (neonatos com e sem microcefalia), câncer de pulmão e tabagismo, periodontite e câncer bucal, paralisia de Bell, sífilis em maternidades: **caso-controle**. {q-unifesp2025-061,q-usprp2021-015,q-tp20251-107,q-adap22-052,q-unesp2025-085,q-unesp2024-084,q-unicamp2022-067}
- Pesquisa sobre mortalidade fetal e cafeína (382 casos e 792 controles): medida é **OR**, **não** risco relativo. {q-uspsp5-075}
- Baixo peso ao nascer e água contaminada, pareado por sexo e data: **caso-controle**, OR ≈ 2,5. {q-famerp2025-037}
- O maior desafio contra o viés de seleção: controles **representativos da população-fonte dos casos**. {q-amrigs2024-093}
- Usar casos **prevalentes** acelera o recrutamento (vantagem prática). {q-unifesp2026-079}
- Os objetivos mais prováveis de um caso-controle incluem avaliar a **efetividade de uma vacina**. {q-unifesp2026-078}
- Fatores de risco de readmissão de idosos (casos readmitidos × controles) e o viés que pode afetar a lembrança do uso do medicamento: **memória**. {q-unesp2026-098}
- Diabetes e leite de vaca na infância com 128 indivíduos amostrados por desfecho: **caso-controle**. {q-tp20202-111}
- Estudo com três aspectos: frequência (**transversal**), relação com fator (**caso-controle**), evolução (**coorte**). {q-usp2026-077}` },
        { id: "des-transversal", titulo: "Transversal (seccional)", conferir: true, diretrizes: ["strobe"],
          questoes: ["q-scmsp2021-084","q-amrigs2021-085","q-amrigs2025-092","q-iamspe2025-088","q-uspsp2-116","q-uspsp4-073","q-sirio2021-088","q-sirio2022-090","q-sirio2026-089","q-unicampdis2022-050","q-unicampdis2024-050","q-didepm-025","q-famema2021-074","q-usprp2026-038"],
          prosa: `O **transversal** (seccional) mede **exposição e desfecho no mesmo momento**, como uma fotografia. [[Ele estima a **prevalência** e permite comparar prevalências (razão de prevalências), mas, como não se sabe quem veio primeiro, não prova causa: a depressão pode ter levado ao sedentarismo, e não o contrário. Essa limitação (causalidade reversa) é a que a prova cobra.|q-didepm-025,q-amrigs2025-092,q-scmsp2021-084]]

[[É o desenho do inquérito: prevalência de diabetes por glicemia de jejum na área, anticorpos em profissionais de saúde, sintomas respiratórios no bairro, diarreia em dois conjuntos habitacionais com água diferente.|q-uspsp4-073,q-sirio2022-090,q-unicampdis2024-050,q-sirio2021-088]] É rápido e barato, mas **ruim para doença rara**, porque numa amostra aleatória quase ninguém a tem; por isso a afirmativa de que o transversal é indicado para doença rara é a errada.`,
          texto: `- **Transversal**: exposição e desfecho medidos **simultaneamente**; mede **prevalência**; não permite afirmar causa. {q-iamspe2025-088,q-uspsp2-116,q-amrigs2025-092,q-scmsp2021-084}
- Limitação central: **não define a sequência temporal** (causalidade reversa). {q-didepm-025}
- Inquéritos de prevalência (glicemia na população da área, anticorpos em profissionais de saúde, sintomas respiratórios, diarreia por fonte de água): **transversal**. {q-uspsp4-073,q-sirio2022-090,q-unicampdis2024-050,q-sirio2021-088,q-unicampdis2022-050}
- Aumento de hipertensão em adultos de um município, para compreender o fenômeno: inquérito **transversal**. {q-sirio2026-089}
- **Não** é indicado para doença rara; nele, as informações de exposição e desfecho são obtidas ao mesmo tempo. {q-amrigs2021-085}
- Série de dados de cobertura vacinal ao longo de anos: **levantamento epidemiológico** (descritivo). {q-usprp2026-038}
- Estudos de um mesmo tema em hipóteses diferentes (nitazoxanida × placebo: ensaio; estudo do tipo transversal: observacional, rápido e econômico). {q-famema2021-074}` },
        { id: "des-ecologico", titulo: "Ecológico e falácia ecológica", conferir: true, diretrizes: ["strobe"],
          casos: ["q-usp2023-040"],
          figuras: [{ arquivo: "figuras/desenhos-pergunta.svg", legenda: "Esquema autoral: de onde cada desenho parte e que medida produz." }],
          questoes: ["q-adap25-061","q-usp2022-030","q-usp2023-040","q-usp2025-112","q-usprp2024-010","q-usprp2024-011","q-usprp2025-030","q-usprp2025-036","q-usprp2026-037","q-unesp2021-082","q-unesp2023-088","q-unesp2024-083","q-unesp2025-086","q-iamspe2025-098","q-unicampdis2024-049","q-uspsp2-115","q-uspsp3-003","q-uspsp5-081","q-sirio2027-100"],
          prosa: `No **ecológico**, a unidade de análise é o **grupo** (município, estado, país) e os dados são agregados: consumo médio de sal por estado × mortalidade por AVC, cobertura de um programa de transferência de renda × hanseníase, temperatura × óbitos em 652 cidades. [[Como não se sabe quem, dentro do grupo, tem a exposição e quem tem o desfecho, não se pode atribuir ao indivíduo o que vale para o grupo: esse erro de interpretação é a **falácia ecológica**.|q-unesp2021-082,q-unesp2025-086,q-uspsp5-081]]

[[Ele é barato, usa dados já coletados (censo, sistemas de informação) e é bom para levantar hipóteses sobre políticas e contextos; seu limite é a confusão e a falta de dado individual.|q-adap25-061,q-usp2022-030,q-usp2025-112,q-uspsp2-115]] [[Os estudos ecológicos de clima e poluição leem-se no gráfico: o que a figura mostra é associação populacional (ponto em que o risco sobe), sem inferência para o indivíduo.|q-usprp2024-010,q-usprp2024-011,q-usprp2025-036,q-usprp2026-037]]

O esquema abaixo resume de onde cada desenho parte.`,
          texto: `- **Ecológico**: unidade de análise é o **grupo**; dados **agregados**. {q-adap25-061,q-usprp2025-030,q-unesp2024-083}
- **Falácia ecológica**: atribuir ao indivíduo o que se observa no grupo. {q-unesp2021-082,q-unesp2025-086,q-uspsp5-081}
- Exemplos: Mais Médicos × resultados em saúde, transferência de renda × hanseníase, estrutura das UBS × mortalidade infantil, eleição × mortalidade por covid, antibióticos × pandemia: **ecológico**. {q-usp2022-030,q-usp2025-112,q-uspsp3-003,q-unesp2023-088,q-unesp2024-083}
- Dados de censos e inquéritos de décadas para ver tendências: **ecológico**. {q-uspsp2-115}
- Poluição (PM2.5 e PM10), temperatura e mortalidade/IRA em muitas cidades: ecológicos; leia a figura como associação populacional. {q-usprp2024-010,q-usprp2024-011,q-usprp2025-036,q-usprp2026-037}
- Correlação de taxa de cesárea e mortalidade materna em 193 países: associação entre países (gráfico). {q-usp2023-040}
- Aumento de internações respiratórias numa série de anos num município: **ecológico**. {q-unicampdis2024-049}
- Análise multinível com efeito contextual (cross-level) é possível em estudo ecológico. {q-iamspe2025-098}
- O dengue por bairro: a comparação entre bairros como unidades de análise é ecológica; a descrição por tempo, lugar e pessoa é epidemiologia **descritiva**. {q-sirio2027-100}` },
      ],
    },
    {
      id: "experimentais", titulo: "Ensaio clínico randomizado",
      introducao: `[[O ensaio clínico é o único desenho em que o pesquisador **atribui a intervenção**. A **randomização** (sorteio) distribui, em média, os fatores conhecidos e desconhecidos entre os grupos, de modo que a diferença observada se deve à intervenção e não a confundidores.|q-unesp2021-081,q-unesp2023-089,q-uspsp1-113]] Por isso ele é o desenho menos sujeito a vieses para avaliar tratamentos.

[[O que a randomização não faz sozinha é garantir um ensaio bom: a sequência precisa ficar **oculta** de quem recruta (ocultação de alocação), os participantes e avaliadores precisam estar mascarados (cegamento) e a análise precisa respeitar o sorteio (intenção de tratar).|q-adap25-010,q-unifesp2025-010,q-adap21-015,q-amrigs2025-097]]`,
      fragmentos: [
        { id: "ens-desenho", titulo: "Randomização, ocultação, cegamento e análise por intenção de tratar", conferir: false, diretrizes: ["consort"],
          casos: ["q-sirio2023-096"],
          questoes: ["q-adap25-010","q-adap26-078","q-adap21-015","q-unifesp2025-010","q-usp2024-084","q-scmsp2025-082","q-tp20232-108","q-tp20261-022","q-tp20241-105","q-einstein2021-049","q-sirio2023-096","q-unesp2021-081","q-unesp2023-089","q-uspsp1-113","q-amrigs2025-097","q-sessp2024-091","q-einstein2025-069","q-einstein2025-072","q-einstein2026-073","q-fmabc2024-099"],
          prosa: `A **randomização** garante grupos **comparáveis nas características iniciais**; o **controle** do confundimento é o objetivo dela, não do cegamento, e a representatividade é outra coisa (validade externa). [[A **ocultação da alocação** (envelopes opacos, selados e numerados, ou central de sorteio) impede que quem recruta preveja o grupo do próximo participante, o que evitaria viés de seleção; é um item da declaração CONSORT, que também pede o fluxograma e a descrição do mecanismo de ocultação.|q-adap25-010,q-einstein2025-069]]

[[**Duplo-cego** significa que participantes, equipe e avaliadores do desfecho estão mascarados; o cegamento controla o viés de aferição e o efeito placebo.|q-unifesp2025-010]]

[[Na **análise por intenção de tratar**, cada paciente é analisado no grupo para o qual foi sorteado, mesmo que tenha interrompido ou trocado de braço. Retirar os que interromperam por efeito adverso reintroduz o viés, porque quem sai não é igual a quem fica; a análise por protocolo ou pelo tratamento recebido perde a randomização.|q-adap21-015,q-amrigs2025-097,q-usp2024-084]]

No **cruzado (crossover)**, cada participante recebe os dois tratamentos em sequências diferentes; [[o planejamento precisa prever o **efeito residual** (carryover) do primeiro tratamento, com período de lavagem; o delineamento paralelo, mais simples, forma dois grupos que recebem tratamentos distintos.|q-sessp2024-091,q-einstein2025-072,q-famerp2025-035]]

[[Quando se seleciona só quem tem pressão alta e se mede de novo, os valores melhoram sozinhos: a **regressão à média** explica parte do "efeito" do betabloqueador sem grupo controle.|q-fmabc2024-099]]`,
          texto: `- **Randomização**: grupos **comparáveis nas características iniciais**; controla o **confundimento** (conhecido e desconhecido). {q-unesp2021-081,q-unesp2023-089,q-uspsp1-113}
- Ocultação da alocação (envelopes opacos, selados e numerados): evita **viés de seleção**. {q-adap25-010}
- Ensaio bem conduzido: grupos de comparação **semelhantes na linha de base**. {q-einstein2025-069}
- **Duplo-cego**: participantes, equipe e avaliadores do desfecho mascarados. {q-unifesp2025-010}
- **Intenção de tratar**: cada um é analisado no grupo sorteado, independentemente da adesão. {q-adap21-015,q-usp2024-084}
- Pacientes do controle que passam a usar a estatina por conta própria e permanecem no grupo original: **compatível** com a intenção de tratar. {q-amrigs2025-097}
- Grupos controle e intervenção em duas instituições, grupos por sorteio com seguimento: **ensaio clínico randomizado**. {q-tp20232-108,q-tp20261-022,q-tp20241-105,q-einstein2021-049,q-scmsp2025-082,q-adap26-078}
- Desenho de um novo medicamento para alívio de cefaleia, com sorteio e dois braços: **ensaio clínico randomizado**. {q-sirio2023-096}
- **Cruzado**: cada participante passa por ambos os tratamentos; é preciso considerar o **efeito residual** da primeira intervenção; não elimina a randomização. {q-sessp2024-091,q-einstein2025-072}
- Se o desfecho não melhora com a intervenção, a **não adesão** pode ser a razão do resultado nulo. {q-einstein2026-073}
- **Regressão à média**: valores extremos selecionados voltam à média sem tratamento. {q-fmabc2024-099}` },
        { id: "ens-interpretacao", titulo: "Eficácia, efetividade, estudos pivotais e o que o ensaio permite concluir", conferir: true,
          questoes: ["q-scmsp2021-095","q-scmsp2022-093","q-sessp2023-092","q-sirio2024-097","q-usp2022-032","q-usprp2022-010","q-sessp2022-099","q-sessp2022-098","q-einstein2027-073","q-famerp2025-035"],
          prosa: `**Eficácia** é o efeito em condições ideais de ensaio; **efetividade** é o efeito na vida real, com adesão e população heterogêneas; **eficiência** é a relação entre o efeito e o custo. [[Por isso a pergunta que o médico faz ("serve para meu paciente?") depende de eficácia e efetividade e, depois, de eficiência (custo).|q-scmsp2021-095]]

[[Na **vacina**, a eficácia vem do ensaio de fase 3; a efetividade, dos estudos em população. Efetividade de 63,7% significa que a incidência foi 63,7% menor nos vacinados que nos não vacinados (1 − risco relativo), e não que 63,7% dos vacinados foram protegidos.|q-usprp2022-010,q-sessp2022-099,q-usp2022-032]]

[[Para decisões de rastreamento (mamografia, PSA), o dado mais forte vem de **ensaios clínicos controlados randomizados**, que medem mortalidade pela doença; coortes e caso-controle são enviesados pelo tempo de antecipação do diagnóstico.|q-sirio2024-097,q-scmsp2022-093,q-sessp2023-092]] A **análise interina** abre os resultados antes do fim para avaliar futilidade, benefício ou dano. Em ensaio **aberto**, a diferença observada é uma tendência, e não prova. Estudo de braço único e exploratório gera hipóteses sobre segurança.`,
          texto: `- **Eficácia, efetividade e eficiência**: a ordem em que o médico verifica o efeito ideal, o efeito real e o custo. {q-scmsp2021-095}
- Efetividade de 63,7% (CoronaVac, Chile): a incidência foi **63,7% menor** nos vacinados. {q-usprp2022-010}
- Eficácia da vacina em ensaio de fase 3 (50,39%): é do ensaio, não é a proporção de protegidos; a **análise interina** serve para avaliar futilidade, benefício ou dano. {q-sessp2022-099,q-usp2022-032}
- Decisão de rastreamento: dados de **ensaio clínico controlado e randomizado**. {q-sirio2024-097}
- Triagem populacional com mamografia ou PSA comparando dois grupos alocados: **ensaio clínico**; a leitura é a do efeito sobre a mortalidade. {q-scmsp2022-093,q-sessp2023-092}
- Ensaio **aberto** (Hygia): a diferença entre os grupos é uma **tendência**, com risco de viés. {q-sessp2022-098}
- Novo anticoagulante: RAR 0,5% e NNT 200 (ensaio paralelo). {q-famerp2025-035}
- Estudo exploratório de braço único em 8 pacientes: dá **evidência preliminar** sobre segurança e hipóteses, e não permite concluir eficácia. {q-einstein2027-073}` },
      ],
    },
    {
      id: "vieses", titulo: "Vieses, confundimento e validade",
      introducao: `[[**Viés** é erro sistemático: a estimativa se afasta do valor verdadeiro sempre na mesma direção, por mais que a amostra aumente. Os três grandes grupos são **seleção** (quem entra), **informação** (como se mede) e **confusão** (quem mais afeta o resultado).|q-amrigs2021-083,q-unifesp2023-021]]

[[A **validade interna** pergunta se o resultado é verdadeiro para quem foi estudado; a **externa**, se vale para o paciente do consultório. A externa só existe se a interna existir.|q-amrigs2022-081,q-sessp2025-083]]`,
      fragmentos: [
        { id: "vies-selecao-informacao", titulo: "Viés de seleção e de informação", conferir: true,
          questoes: ["q-amrigs2021-083","q-unifesp2023-021","q-usp2025-103","q-uspsp4-088","q-adap26-079","q-amrigs2024-093","q-adap24-080","q-unifesp2024-071","q-unesp2026-100","q-usp2026-078","q-iamspe2022-074","q-sessp2025-098","q-usp2026-075","q-sessp2025-083","q-amrigs2022-081"],
          prosa: `O **viés de seleção** surge quando os grupos comparados não são semelhantes porque a entrada no estudo dependeu do desfecho ou da exposição: questionário virtual com link compartilhado (quem responde não representa a população), examinar só crianças perto das estradas, excluir o que não respondeu. [[Quando os que saem do estudo são mais doentes (perda de seguimento), a estimativa **subestima** a associação; se as perdidas tivessem retornado, o risco relativo aumentaria.|q-unifesp2023-021,q-uspsp4-088,q-usp2025-103,q-usp2026-075]]

O **viés de informação** é o erro de medida. [[O **viés de memória (recordação)** aparece no caso-controle: mães de crianças com malformação lembram melhor o que usaram na gestação do que as mães de crianças saudáveis, e isso **superestima** o OR. Se os controles subestimam o hábito (resposta socialmente desejável), o OR também é superestimado.|q-adap26-079,q-usp2026-078,q-unesp2026-100]]

[[No rastreamento, dois vieses fazem o programa parecer melhor do que é: o **tempo de antecipação** (diagnosticar antes aumenta a sobrevida sem mudar a morte) e o **viés de duração** (o que é detectado no rastreamento cresce mais devagar). Por isso se compara a **mortalidade específica**, e não a sobrevida após o diagnóstico.|q-adap24-080,q-unifesp2024-071]]

O **efeito Hawthorne** é a mudança de comportamento de quem sabe que está sendo observado (hospitais que se preparam para a inspeção).`,
          texto: `- **Viés de seleção**: grupos de comparação não semelhantes; **informação**: erro de diagnóstico ou de medida. {q-amrigs2021-083}
- Questionário virtual com link compartilhado: viés de **seleção e de informação**. {q-unifesp2023-021}
- Estudo transversal que só entrevista os moradores que aceitaram, ou só as crianças perto das estradas: **seleção**. {q-usp2025-103,q-uspsp4-088}
- Controles precisam representar a população-fonte dos casos. {q-amrigs2024-093}
- **Viés de memória** no caso-controle: quem tem a doença lembra melhor da exposição (superestima o OR). {q-adap26-079,q-unesp2026-100}
- Controles que subestimam o tabagismo (desejabilidade social): **OR superestimado**. {q-usp2026-078}
- Rastreamento: sobrevida maior pode ser **antecipação do diagnóstico** e cânceres mais lentos; compare **mortalidade específica**. {q-adap24-080,q-unifesp2024-071}
- Perda de seguimento diferencial em coorte (mais deprimidas, menos escolarizadas): a estimativa seria **maior** se fossem incluídas. {q-usp2026-075}
- **Efeito Hawthorne**: quem sabe que está sob observação muda o comportamento (hospitais e inspeções surpresa). {q-iamspe2022-074}
- **Viés de publicação**: revisão que incluiu só estudos em inglês e com resultado positivo. {q-sessp2025-098}
- **Validade externa**: o clínico só pode aplicar o resultado ao seu paciente se ele a tiver; amostra pequena e não randomizada limita a generalização. {q-amrigs2022-081,q-sessp2025-083}` },
        { id: "vies-confusao", titulo: "Confundimento", conferir: true,
          questoes: ["q-usp2023-062","q-adap23-021","q-sirio2023-097","q-sessp2026-085","q-fmabc2025-087","q-fmabc2026-086","q-amrigs2025-092","q-sirio2022-091"],
          prosa: `**Confundidor** é um terceiro fator que distorce a associação porque cumpre **três** critérios: está associado ao **desfecho**, está associado à **exposição** e **não está no caminho causal** entre eles. [[O café e o câncer de pulmão são o exemplo clássico: o tabagismo se associa ao café e ao câncer, e sem o ajuste a associação parece causal quando não é. Corrige-se por **estratificação** ou por **ajuste em modelo multivariado** (na análise) e, no desenho, por **randomização**, restrição ou pareamento.|q-usp2023-062,q-adap23-021,q-fmabc2025-087]]

[[O diabetes que leva a mais adoçante e a mais declínio cognitivo confunde o estudo observacional de adoçantes; a renda familiar confunde a associação entre ESF e vacinação; o tipo de tratamento num caso-controle retrospectivo de um centro único é confundido pela indicação.|q-fmabc2026-086,q-sirio2023-097,q-sessp2026-085]] Por isso estudo observacional sozinho não é definitivo.`,
          texto: `- Confundidor: associado ao **desfecho**, associado à **exposição** e **fora do caminho causal**. {q-usp2023-062}
- Café e câncer de pulmão: **tabagismo** confunde; corrige-se por estratificação ou ajuste. {q-adap23-021}
- O resveratrol e o vinho: viés de **confusão** em estudos antigos. {q-fmabc2025-087}
- Adoçantes e declínio cognitivo: **diabetes** confunde; o estudo observacional não é definitivo. {q-fmabc2026-086}
- ESF e vacinação: **renda familiar** pode confundir. {q-sirio2023-097}
- Estudo retrospectivo de caso-controle em centro único com tratamento novo: **confusão**. {q-sessp2026-085}
- Correlação positiva entre vitamina D e testosterona em estudo transversal: o delineamento **não permite afirmar causa**; o valor de p não confirma causalidade. {q-amrigs2025-092}
- Obesidade e mortalidade por covid com OR de 1,36: avalia-se a **força da associação**. {q-sirio2022-091}` },
      ],
    },
    {
      id: "causalidade-evidencia", titulo: "Causalidade, evidência e síntese",
      introducao: `[[Associação não é causa. Os critérios de **Bradford Hill** organizam o raciocínio: temporalidade (a causa precede o efeito, o único critério indispensável), força, relação dose-resposta, consistência, especificidade, plausibilidade biológica, coerência, evidência experimental e analogia.|q-sessp2026-087,q-uspsp2-120]]

[[A evidência se hierarquiza pela proteção contra viés: do mais forte ao mais fraco, revisão sistemática de ensaios, ensaio randomizado, coorte, caso-controle, transversal e ecológico, série e relato de caso e opinião de especialista.|q-sessp2024-090,q-adap24-078]]`,
      fragmentos: [
        { id: "causalidade", titulo: "Critérios de causalidade (Bradford Hill)", conferir: true,
          questoes: ["q-unesp2021-083","q-uspsp2-120","q-uspsp5-073","q-uspsp4-090","q-sirio2021-090","q-sirio2021-091","q-sirio2022-091","q-sessp2026-087","q-fmabc2023-097","q-unifesp2026-068"],
          prosa: `[[A **temporalidade** é o critério sem o qual não há causa: a exposição tem de preceder o efeito, e é o único considerado indispensável. Os demais se somam: **força** (RR alto, como OR de 1,36 avaliado pela magnitude), **gradiente biológico** (dose-resposta), **consistência** (replicação por estudos diferentes), **especificidade** (uma causa leva a um único efeito, o mais fraco, como o H. pylori que aparece também em assintomáticos), **plausibilidade biológica** (mecanismo, como a integração do DNA do HPV), **coerência**, **evidência experimental** e **analogia**.|q-sessp2026-087,q-sirio2021-091,q-uspsp4-090,q-sirio2022-091]]

[[Uma coorte que encontra relação dose-resposta entre carne bovina e câncer de boca mostra **gradiente biológico e temporalidade**.|q-unesp2021-083]] [[Uma **associação reversível** é a que desaparece quando se retira o fator de risco: a incidência cai quando a exposição diminui, o que reforça a causa.|q-fmabc2023-097]] O valor preditivo positivo **não** é critério de causalidade: é medida de teste diagnóstico.`,
          texto: `- **Temporalidade**: a causa precede o efeito; é o critério considerado indispensável. {q-sessp2026-087,q-sirio2021-090}
- **Gradiente biológico (dose-resposta)** e temporalidade numa coorte de carne e câncer de boca. {q-unesp2021-083}
- **Especificidade**: uma causa leva a um único efeito; a H. pylori em 90 a 100% das úlceras duodenais e também em assintomáticos mostra falta dela. {q-sirio2021-091,q-uspsp2-120}
- **Plausibilidade biológica**: mecanismo (integração do DNA do HPV) torna a relação crível. {q-uspsp4-090}
- **Força da associação**: OR de 1,36 com IC 1,09 a 1,69 na obesidade e mortalidade por covid. {q-sirio2022-091}
- **Temporalidade e consistência** em revisão sobre poluição e atividade física. {q-uspsp5-073}
- Associações **reversíveis**: reduzir a exposição reduz o evento. {q-fmabc2023-097}
- **Valor preditivo positivo não** é critério de inferência causal. {q-sirio2021-090}
- Snow (1854): casas vizinhas e semelhantes recebiam água de companhias diferentes, como se a exposição tivesse sido sorteada: **experimento natural** (ver armadilhas). {q-unifesp2026-068}` },
        { id: "sintese-evidencia", titulo: "Revisão sistemática, metanálise, forest plot e hierarquia da evidência", conferir: true, diretrizes: ["prisma","cebm"],
          casos: ["q-amrigs2022-085"],
          questoes: ["q-uspsp2-106","q-uspsp5-076","q-amrigs2022-085","q-amrigs2024-092","q-einstein2025-070","q-fmabc2024-100","q-sessp2024-090","q-sessp2024-094","q-sessp2024-020","q-sessp2022-100","q-einstein2021-047","q-einstein2022-073","q-adap24-078","q-unifesp2024-069","q-sessp2025-083"],
          prosa: `A **revisão sistemática** reúne e avalia, com método explícito e reprodutível, todos os estudos sobre uma pergunta; a **metanálise** combina estatisticamente os resultados. [[Ao combinar muitos estudos, a metanálise **aumenta o poder estatístico** e a precisão da estimativa; ela não elimina a heterogeneidade nem substitui a necessidade de novos estudos. O resumo final é uma média **ponderada**: o estudo com mais eventos e intervalo estreito pesa mais.|q-uspsp2-106,q-einstein2025-070]] A declaração **PRISMA 2020** orienta o relato, com fluxograma das etapas de busca e seleção e a descrição de como se avaliou a heterogeneidade.

No **forest plot**, cada estudo é um quadrado (tamanho proporcional ao peso) com uma linha de intervalo de confiança; [[quadrado pequeno e intervalo amplo indicam amostra pequena e baixa precisão; o diamante final é o resumo. Se o IC cruza a linha de nenhum efeito (RR = 1), não há associação significativa; o I² mede a heterogeneidade.|q-amrigs2024-092,q-uspsp5-076,q-amrigs2022-085]]

[[A confiança numa revisão depende dos estudos incluídos e da busca: restringir ao idioma inglês e a resultados positivos produz **viés de publicação**.|q-sessp2024-090]] A **meta-análise em rede** compara, indiretamente, vários tratamentos, e é a melhor evidência para escolher entre antidepressivos. [[Na hierarquia, a revisão sistemática com metanálise de ensaios tem o **menor risco de viés**; o ensaio é mais forte que a coorte; entre três estudos conflitantes, vale o de **maior validade interna** (o ensaio).|q-sessp2024-094,q-adap24-078,q-unifesp2024-069]]

A **medicina baseada em evidências** integra evidência, experiência clínica e **valores do paciente**: ela não impõe a estatina "porque reduz eventos", e sim discute com a pessoa. [[A graduação de recomendação (classe I: evidência conclusiva de que é seguro, útil e eficaz; IIa e IIb: evidência a favor, de menor peso; III: não útil ou prejudicial) é usada nas diretrizes.|q-sessp2022-100,q-einstein2021-047]] A quantidade e a qualidade de estudos com desfecho clínico favorável pesam mais que mecanismos bioquímicos.`,
          texto: `- **Metanálise** combina resultados de ensaios para **aumentar o poder estatístico**. {q-uspsp2-106}
- A estimativa sumária é **ponderada** pela precisão de cada estudo; heterogeneidade não impede a metanálise. {q-einstein2025-070}
- Forest plot: quadrado pequeno com IC amplo = **amostra pequena e baixa precisão**. {q-amrigs2024-092}
- Forest plot do corticosteroide antenatal: a conclusão correta é o **benefício** para o recém-nascido prematuro, lida pelo resumo (diamante) e pelo intervalo de confiança. {q-amrigs2022-085}
- RR de 1,39 para baixo peso por depressão antenatal: aumento aproximado de **39% do risco**; I² mede heterogeneidade. {q-uspsp5-076}
- Cinco coortes de vaginose e parto prematuro apresentadas em figura: leia o RR e o IC de cada estudo. {q-fmabc2024-100}
- Menor risco de viés e maior qualidade: **revisão sistemática com metanálise de ensaios**. {q-sessp2024-090}
- Escolher entre vários antidepressivos: **meta-análise em rede**. {q-sessp2024-094}
- Três estudos divergentes (transversal, coorte, ensaio): vale o de maior **validade interna**. {q-adap24-078,q-unifesp2024-069}
- Maior quantidade e qualidade de estudos com desfecho clínico favorável pesa mais que mecanismos fisiopatológicos. {q-sessp2024-020}
- Prática baseada em evidência considera **valores e preferências** do paciente. {q-sessp2022-100}
- Classe de recomendação **I**: evidência conclusiva de que o procedimento é seguro, útil e eficaz. {q-einstein2021-047}
- Variação inexplicada entre cidades na mesma cirurgia: **pesquisa quantitativa e qualitativa** integradas explicam o fenômeno. {q-einstein2022-073}
- Amostra pequena e não randomizada limita o que se pode **generalizar**. {q-sessp2025-083}` },
      ],
    },
    {
      id: "medidas-e-amostra", titulo: "Qual medida cada desenho produz e como se escolhe a amostra",
      introducao: `[[A medida de associação é consequência do desenho: coorte e ensaio, que medem incidência, dão **risco relativo**, **risco atribuível** (diferença) e **NNT**; caso-controle dá **razão de chances**; transversal dá **razão de prevalências** (ou OR de prevalência).|q-uspsp2-114,q-uspsp3-024,q-uspsp3-004]] Os cálculos em si estão no resumo de **medidas epidemiológicas**; aqui a pergunta é qual medida cabe a qual desenho.

[[A **amostragem** decide o quanto se pode generalizar: a amostra aleatória do cadastro, com busca ativa dos que faltaram, preserva a validade; voluntário, conveniência ou os que vêm ao serviço a comprometem.|q-adap24-084,q-unifesp2024-077]]`,
      fragmentos: [
        { id: "medidas-por-desenho", titulo: "A medida de cada desenho (e como ler um 2×2)", conferir: true,
          questoes: ["q-uspsp3-001","q-uspsp3-002","q-uspsp3-004","q-uspsp3-006","q-uspsp4-091","q-uspsp4-095","q-uspsp5-074","q-uspsp5-075","q-uspsp3-024","q-uspsp2-114","q-sirio2026-090","q-usprp2023-050","q-famerp2025-035","q-usprp2022-010"],
          prosa: `Em **tabela 2×2** (expostos × não expostos nas linhas, doentes × não doentes nas colunas), a lógica é única. [[Na **coorte** ou no **ensaio**: risco nos expostos = a/(a+b), risco nos não expostos = c/(c+d), **RR = razão entre eles**, **RAR ou risco atribuível = diferença**, **NNT = 1/RAR**. Exemplo: álcool e AVC, 80/2.000 contra 20/1.000: RR = 2,0; idosos dependentes, 14/70 contra 35/350: RR 2,0 e risco atribuível 0,10.|q-uspsp3-002,q-uspsp3-006,q-uspsp5-074,q-uspsp4-095]]

[[No **caso-controle**, **OR = (a × d)/(b × c)**: a razão de chances de exposição entre casos e controles; é o que se calcula com 382 casos e 792 controles de cafeína (OR ≈ 2,1). No **transversal**, a medida é a **razão de prevalências**: dor de cabeça em 65,8% contra 34,0% dos adolescentes dá RP ≈ 1,9.|q-uspsp5-075,q-uspsp3-004,q-uspsp4-091]]

[[O OR de 0,67 na violência por parceiro íntimo (40-59 anos × 25-39 anos) é **proteção** (menos chance); OR e RR coincidem quando o desfecho é raro, e o OR **superestima** o RR quando o desfecho é comum.|q-uspsp4-091]] Leia sempre se o intervalo de confiança inclui 1.`,
          texto: `- **Coorte e ensaio**: risco, **RR**, risco atribuível (diferença de risco), **NNT = 1/RAR**. {q-uspsp3-002,q-uspsp3-006,q-uspsp5-074,q-uspsp4-095,q-famerp2025-035}
- Álcool e AVC: RR **2,0**; idosos dependentes e quedas: RR **2,0** e risco atribuível **0,1**. {q-uspsp3-002,q-uspsp3-006}
- Metformina 18% × placebo 30%: **RR 0,6**, redução relativa de 40%, NNT ≈ 8. {q-uspsp5-074}
- Filtro contra poluição (50% × 56,8%): RR 0,88, redução relativa de cerca de 11% a 12%. {q-uspsp4-095}
- **Caso-controle**: **OR** = (a×d)/(b×c); cafeína e mortalidade fetal: OR ≈ 2,1. {q-uspsp5-075,q-uspsp3-024,q-sirio2026-090}
- **Transversal**: **razão de prevalências**; insônia e dor de cabeça. {q-uspsp3-004}
- OR de 0,67 em violência por parceiro íntimo: chance **menor** (proteção). {q-uspsp4-091}
- Estudo de coorte com vacinados × não vacinados: **risco relativo**. {q-uspsp2-114}
- Risco relativo e risco atribuível no ensaio de anticoagulante: RAR 0,5% e NNT 200. {q-famerp2025-035}
- Anemia infantil em tabela de RR: **fatores de risco** têm RR > 1 e IC sem 1; os protetores têm RR < 1. {q-uspsp3-001}
- Efetividade vacinal = 1 − RR. {q-usprp2022-010}
- Na coorte de transporte e mortalidade, a comparação é o grupo que dirige carro e o que usa bicicleta, com menor mortalidade por câncer e doenças cardiovasculares. {q-usprp2023-050}` },
        { id: "amostragem", titulo: "Amostragem e representatividade", conferir: true,
          questoes: ["q-adap24-084","q-unifesp2024-077","q-amrigs2023-097","q-sirio2023-094","q-scmsp2022-085"],
          prosa: `O **tamanho da amostra** para estimar uma proporção depende da margem de erro e da frequência esperada: [[prevalência de doença **comum** exige amostra **menor** do que a de doença rara, porque, para ter número suficiente de casos, a rara precisa de mais gente.|q-amrigs2023-097]] O número calculado (385 adultos, 250 clientes) vale **se a amostra for probabilística**: sorteio aleatório do cadastro com busca ativa dos sorteados que não comparecerem; a campanha de rádio ou o evento atraem voluntários, que são diferentes.

[[A **amostragem por conglomerados** sorteia grupos inteiros (comunidades escolares), e não os indivíduos; a **estratificada** divide por características antes do sorteio. Para populações de difícil acesso (sem endereço), usam-se métodos como **RDS (respondent-driven sampling)**, em que os participantes recrutam seus pares com incentivo.|q-sirio2023-094,q-scmsp2022-085]]`,
          texto: `- Amostra para **doença comum** é **menor** que para doença rara. {q-amrigs2023-097}
- Estimar prevalência de hipertensão no cadastro: **sortear aleatoriamente** e fazer busca ativa de quem faltou. {q-adap24-084}
- Estimar insatisfação (margem de 3%): questionário a **clientes sorteados**, com acompanhamento dos que não respondem. {q-unifesp2024-077}
- **Conglomerados**: sorteiam-se comunidades inteiras, não indivíduos. {q-sirio2023-094}
- População de difícil localização: **RDS** (cadeia de recrutamento), com incentivo. {q-scmsp2022-085}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-unifesp2026-068","q-famerp2025-037","q-iamspe2021-078","q-sessp2022-098","q-adap21-015"],
          prosa: `[[Quando a exposição é atribuída por sorteio, é experimento; quando é atribuída por circunstâncias que lembram o sorteio, é um **experimento natural**, mas continua observacional. A prova de 2026 (John Snow) cobrou **experimental**.|q-unifesp2026-068]] [[A regra para estudos com dados agregados é que não se generaliza para o indivíduo; a prova do IAMSPE (2021) deu como correta a ideia de que as conclusões são generalizáveis com maior facilidade que no estudo individual.|q-iamspe2021-078]] [[A regra é que o caso-controle parte do desfecho; a FAMERP 2025 usou um rótulo misto, "coorte retrospectivo (caso-controle)", com OR de 2,5.|q-famerp2025-037]]`,
          texto: `- Regra: exposição atribuída por circunstância é **experimento natural** (observacional); a prova cobrou **experimental** para o estudo de Snow. {q-unifesp2026-068}
- Regra: não se transfere ao indivíduo o que vale para o grupo; a prova cobrou a ideia de conclusões **generalizáveis** no estudo ecológico. {q-iamspe2021-078}
- Regra: caso-controle é o que parte do desfecho; a prova cobrou o rótulo **"coorte retrospectivo (caso-controle)"** com OR de 2,5. {q-famerp2025-037}
- Regra: o ensaio **aberto** não permite concluir superioridade; a prova cobrou a **tendência** de menos eventos no grupo da noite. {q-sessp2022-098}
- Regra: **intenção de tratar** inclui quem interrompeu ou trocou de braço; a análise por protocolo exclui. {q-adap21-015}` },
      ],
    },
  ],
});
