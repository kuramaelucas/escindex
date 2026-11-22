/* resumos/uroginecologia/resumo.js — resumo adaptativo de uroginecologia: anatomia e fisiologia da micção,
   incontinência de esforço (diagnóstico, fisioterapia, sling), bexiga hiperativa e outras queixas urinárias,
   prolapso genital (POP-Q e tratamento) e fístulas urogenitais. Molde e regras: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- uroginecologia */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "uroginecologia",
  titulo: "Incontinência urinária e prolapso genital",
  assunto: "ass-uroginecologia",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "nice-ng123", texto: "NICE — Urinary incontinence and pelvic organ prolapse in women: management (NG123, 2019, atualizada), nice.org.uk", lidoEm: "2026-11-19" },
    { id: "ics-iuga", texto: "IUGA/ICS — Joint report on the terminology for female pelvic floor dysfunction e sistema POP-Q", lidoEm: null },
    { id: "febrasgo-uro", texto: "FEBRASGO — Protocolos de incontinência urinária e prolapso genital", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "fisiologia", titulo: "Assoalho pélvico e micção",
      introducao: `[[A continência depende de a uretra ficar fechada quando a pressão abdominal sobe: o levantador do ânus (pubococcígeo, iliococcígeo, puborretal) e o coccígeo formam o diafragma pélvico, e a fáscia sob a uretra serve de anteparo contra o qual ela é comprimida.|q-unesp2021-034,q-usp2022-083]] [[Esvaziar a bexiga exige contração do detrusor, mediada por acetilcolina (receptor muscarínico), e relaxamento do assoalho e do colo vesical; o simpático (beta-3) relaxa o detrusor no enchimento.|q-sirio2023-068]]

Por isso a perda aos esforços vem de suporte fraco (hipermobilidade) ou de esfíncter fraco, e a urgência vem de detrusor hiperativo — mecanismos diferentes, tratamentos diferentes.

Veja também: **Climatério** (síndrome geniturinária e estrogênio vaginal), **Pré-natal** e **Puerpério** (incontinência após o parto).`,
      fragmentos: [
        { id: "fis-anatomia", titulo: "Anatomia e fisiologia",
          questoes: ["q-usp2022-083","q-unesp2021-034","q-sirio2023-068","q-amrigs2023-057","q-usp2022-084"],
          casos: ["q-amrigs2023-057"],
          prosa: `[[Ao fechar a cúpula na histerectomia, os ligamentos uterossacros se fixam a ela para prevenir o prolapso de cúpula.|q-usp2022-084]] [[No toque bimanual, o útero que aponta para a frente sobre a bexiga é antevertido.|q-amrigs2023-057]]`,
          texto: `- Exercício de Kegel: **pubococcígeo**. {q-usp2022-083}
- Diafragma pélvico: **levantador do ânus e coccígeo**. {q-unesp2021-034}
- Esvaziar: **detrusor colinérgico e assoalho relaxado**. {q-sirio2023-068}
- Útero da figura: **antevertido**. {q-amrigs2023-057}
- Após fechar a cúpula: **fixar os uterossacros**. {q-usp2022-084}` },
      ],
    },
    {
      id: "esforco", titulo: "Incontinência urinária de esforço",
      introducao: `[[A incontinência de esforço é a perda ao tossir, espirrar ou se exercitar, sem urgência; o fator de risco central é a lesão do assoalho por parto vaginal, somada a obesidade, idade e tosse crônica.|q-sirio2021-067,q-fmabc2025-061]] [[Perda aos mínimos esforços, ou pressão de perda baixa no urodinâmico (abaixo de 60 cmH2O) sem hipermobilidade, aponta deficiência esfincteriana intrínseca.|q-unesp2022-033,q-sirio2027-078]]

[[O diagnóstico é clínico (história e teste de esforço); o estudo urodinâmico não muda a conduta na incontinência de esforço pura antes de tratar, e fica para o quadro misto, dúvida ou falha.|q-scmsp2022-047,q-einstein2026-060]] [[A primeira linha é a fisioterapia do assoalho pélvico supervisionada por pelo menos 3 meses (com perda de peso e estrogênio vaginal na atrofia); se falhar, o sling de uretra média recria o apoio suburetral, e a uretra se fecha contra ele no esforço.|q-unifesp2022-026,q-unifesp2023-047,q-uspsp4-031,q-adap26-048,q-usp2025-023,q-famerp2025-029]]`,
      fragmentos: [
        { id: "esf-diagnostico", titulo: "Diagnóstico e tipos", conferir: false, diretrizes: ["nice-ng123"],
          questoes: ["q-unesp2022-033","q-sirio2027-078","q-sirio2021-067","q-tp20241-096","q-tp20261-087","q-scmsp2022-047","q-einstein2026-060","q-fmabc2025-061"],
          texto: `- Perda ao tossir e espirrar: **incontinência de esforço**. {q-sirio2021-067}
- Perda aos pequenos esforços: **deficiência esfincteriana intrínseca**. {q-unesp2022-033}
- Pressão de perda 40 cmH2O sem hipermobilidade: **deficiência esfincteriana**. {q-sirio2027-078}
- Fatores de risco: **obesidade e multiparidade**. {q-fmabc2025-061}
- Idosas: atenção à **incontinência mista**. {q-einstein2026-060}
- Urgência com esforço positivo: banca, **urodinâmica, fisioterapia e antimuscarínico**. {q-scmsp2022-047}
- Jovem obesa multípara com esforço: banca, **exame urodinâmico**. {q-tp20241-096,q-tp20261-087}` },
        { id: "esf-tratamento", titulo: "Fisioterapia e sling", conferir: false, diretrizes: ["nice-ng123"],
          figuras: [{ arquivo: "figuras/incontinencia.svg", legenda: "Esquema autoral: esforço × urgência, o mecanismo e o tratamento de cada uma." }],
          questoes: ["q-unifesp2022-026","q-unifesp2023-047","q-unifesp2024-046","q-unifesp2025-066","q-unifesp2026-048","q-scmsp2026-067","q-sessp2024-064","q-tp20222-098","q-tp20232-097","q-uspsp4-031","q-unicampdis2024-046","q-usprp2026-066","q-adap26-048","q-adap24-032","q-usp2025-023","q-famerp2025-029","q-usprp2025-054"],
          casos: ["q-usp2025-023"],
          texto: `- Primeira linha: **fisioterapia do assoalho pélvico**. {q-unifesp2022-026,q-unifesp2024-046,q-unifesp2025-066,q-unifesp2026-048,q-uspsp4-031,q-sessp2024-064}
- Puérpera com incontinência: **fisioterapia**. {q-unifesp2023-047,q-tp20232-097}
- Avaliação funcional baixa: **medidas comportamentais e fisioterapia**. {q-scmsp2026-067}
- Atrofia com cistocele grau I: **estrogênio vaginal e fisioterapia**. {q-tp20222-098}
- Valsalva negativa: **fisioterapia** como conduta inicial. {q-unicampdis2024-046}
- Obesa com urgência e esforço: **perda de peso e fisioterapia**. {q-usprp2026-066}
- Falhou o conservador: **sling de uretra média**. {q-adap26-048,q-usprp2025-054}
- Recusa tela, com cistocele III: **sling autólogo e correção da cistocele**. {q-adap24-032}
- Mecanismo do sling: **sustentação da uretra** (apoio suburetral). {q-usp2025-023,q-famerp2025-029}` },
      ],
    },
    {
      id: "urgencia", titulo: "Bexiga hiperativa e outras queixas urinárias",
      introducao: `[[A bexiga hiperativa é urgência, com ou sem perda, frequência e noctúria, sem infecção ou outra causa; o detrusor contrai fora de hora (teoria neurogênica e miogênica).|q-simepm89-031,q-uspsp3-072,q-fmabc2021-030,q-amrigs2020-058]] Antes, se excluem infecção, diabetes, insuficiência cardíaca e diuréticos.

[[O tratamento começa por treino vesical e menos cafeína; depois vêm antimuscarínicos (oxibutinina, tolterodina, solifenacina, trospium), que bloqueiam o receptor do detrusor, ou a mirabegrona (agonista beta-3), que o relaxa sem efeito anticolinérgico — preferida na idosa, porque o antimuscarínico piora memória e causa delirium.|q-adap25-066,q-adap21-067,q-sirio2025-024,q-usprp2024-083,q-einstein2023-053,q-uspsp5-029]] Com atrofia, o estrogênio vaginal ajuda os sintomas e previne cistite de repetição.`,
      fragmentos: [
        { id: "urg-tratamento", titulo: "Diagnóstico e tratamento da urgência", conferir: false, diretrizes: ["nice-ng123"],
          questoes: ["q-adap25-066","q-adap21-067","q-amrigs2020-058","q-sessp2022-067","q-usp2026-117","q-usprp2021-067","q-usprp2024-083","q-unicamp2023-059","q-unicampdis2025-034","q-uspsp5-029","q-uspsp3-072","q-simepm89-031","q-sirio2025-024","q-fmabc2021-030","q-fmabc2022-066","q-einstein2023-053","q-tp20251-115","q-tp20261-054","q-scmsp2023-063","q-iamspe2026-050","q-didepm-098","q-usp2024-107"],
          prosa: `[[Úlceras de Hunner na cistoscopia caracterizam a síndrome da bexiga dolorosa (cistite intersticial).|q-iamspe2026-050]] [[Massa pélvica que comprime a uretra causa retenção com perda por transbordamento: primeiro, sondar.|q-usp2024-107]] [[Na idosa que não chega a tempo por limitação de mobilidade, treino vesical e do assoalho são a base.|q-tp20251-115,q-tp20261-054]]`,
          texto: `- Primeiro: **treino vesical e menos cafeína**. {q-adap25-066}
- Pesquisar **diabetes, insuficiência cardíaca, hipotireoidismo**. {q-amrigs2020-058}
- Urgência sem perda aos esforços: **bexiga hiperativa**. {q-uspsp3-072,q-fmabc2021-030}
- Fisiopatologia: modelo **neurogênico** (e miogênico). {q-simepm89-031}
- Primeira linha farmacológica: **antimuscarínico**. {q-sirio2025-024,q-uspsp5-029,q-fmabc2022-066,q-scmsp2023-063}
- Contração involuntária do detrusor: **tolterodina**. {q-sessp2022-067}
- Urodinâmica confirma: **anticolinérgico**. {q-usp2026-117,q-unicampdis2025-034}
- Idosa com Alzheimer: **mirabegrona**. {q-adap21-067}
- 80 anos: **trospium ou mirabegrona**. {q-einstein2023-053}
- Além de fisioterapia: **mirabegrona**. {q-usprp2024-083}
- Banca: **eletroestimulação e oxibutinina**. {q-usprp2021-067}
- Perda no orgasmo: **bexiga hiperativa**, oxibutinina. {q-unicamp2023-059}
- Idosa sem mobilidade: **treino vesical e do assoalho**. {q-tp20251-115,q-tp20261-054}
- Úlceras de Hunner: **bexiga dolorosa**. {q-iamspe2026-050}
- Cistite de repetição na atrofia: **estrogênio vaginal**. {q-didepm-098}
- Massa pélvica e perda: **sondagem vesical**. {q-usp2024-107}` },
      ],
    },
    {
      id: "prolapso", titulo: "Prolapso genital",
      introducao: `[[O prolapso é a descida da parede vaginal anterior (bexiga), do ápice (útero ou cúpula) ou da parede posterior (reto) quando o levantador e as fáscias cedem; parto vaginal, multiparidade, obesidade, constipação e tosse crônica (DPOC) aumentam a pressão ou lesam o suporte.|q-iamspe2021-049,q-fmabc2025-061,q-sirio2023-065]]

[[O POP-Q mede pontos em relação ao hímen (zero): Aa e Ba na parede anterior, C no colo ou cúpula, D no fundo de saco posterior, Ap e Bp na posterior. O estádio é dado pelo ponto mais baixo: I até 1 cm acima do hímen; II entre 1 cm acima e 1 cm abaixo; III mais de 1 cm abaixo, sem eversão total; IV eversão completa.|q-unesp2026-036,q-uspsp2-027,q-fmabc2024-067,q-sirio2022-078,q-usprp2023-037]]

[[Só se trata o prolapso que incomoda: pessário para quem não quer ou não pode operar; cirurgia que corrige o compartimento que caiu (colporrafia anterior ou posterior, histerectomia vaginal, fixação do ápice ao sacro ou ao sacroespinhal); colpocleise para a idosa sem vida sexual e com alto risco.|q-sirio2024-064,q-adap22-026,q-einstein2022-054,q-sessp2023-049,q-amrigs2024-051]]`,
      fragmentos: [
        { id: "pro-popq", titulo: "Classificar pelo POP-Q", conferir: true, diretrizes: ["ics-iuga"],
          figuras: [{ arquivo: "figuras/popq.svg", legenda: "Esquema autoral: os estádios do POP-Q pela posição do ponto mais baixo em relação ao hímen." }],
          questoes: ["q-usprp2023-037","q-tp20252-084","q-unesp2026-036","q-uspsp2-027","q-sirio2022-078","q-fmabc2024-067","q-amrigs2024-051","q-sirio2023-065","q-iamspe2021-049"],
          casos: ["q-tp20252-084","q-amrigs2024-051"],
          texto: `- Fatores de risco: **constipação, multiparidade e DPOC**. {q-iamspe2021-049}
- Esvaziamento difícil e urgência após parto: **prolapso de parede anterior**. {q-sirio2023-065}
- Bp em +2 e C em +1: **estádio III**. {q-uspsp2-027,q-unesp2026-036}
- C = +8 com CVT 8 sem colo: **prolapso de cúpula**. {q-sirio2022-078}
- Ap +3 e Bp +5: **parede posterior**. {q-fmabc2024-067}
- Anotações do POP-Q: **posterior, rotura perineal, histerectomia**. {q-usprp2023-037}
- Figura: **uterino grau 3**. {q-tp20252-084}
- Cistocele: tratar **se sintomática**. {q-amrigs2024-051}` },
        { id: "pro-tratamento", titulo: "Pessário e cirurgia", conferir: false, diretrizes: ["nice-ng123"],
          questoes: ["q-adap22-026","q-scmsp2021-070","q-scmsp2025-066","q-usp2023-026","q-usp2026-098","q-usprp2022-060","q-sessp2023-049","q-tp20212-099","q-uspsp5-033","q-uspsp3-067","q-simepm89-033","q-sirio2024-064","q-fmabc2022-064","q-fmabc2023-075","q-einstein2022-054","q-einstein2024-057"],
          casos: ["q-usprp2022-060"],
          prosa: `[[Colo alongado com desejo de gestar: cirurgia de Manchester (amputação do colo e fixação dos paramétrios).|q-uspsp5-033,q-fmabc2023-075]] [[Corrigir um prolapso anterior grande pode desmascarar incontinência de esforço, que a paciente deve conhecer antes.|q-scmsp2025-066]]`,
          texto: `- Idosa que prefere não operar: **pessário** com estrogênio tópico. {q-adap22-026,q-usprp2022-060,q-einstein2022-054}
- Idosa cadeirante sem vida sexual: **colpocleise**. {q-sessp2023-049}
- Sem queixa: **expectante**. {q-sirio2024-064}
- Cistocele sintomática: **colporrafia anterior**. {q-scmsp2021-070}
- Retocele: **colporrafia da fáscia retovaginal**. {q-usp2023-026}
- Prolapso uterino com colo além do hímen: **histerectomia vaginal e perineocolporrafia**. {q-usp2026-098,q-simepm89-033,q-fmabc2022-064}
- Prolapso total aos 75: histerectomia vaginal e colporrafias, avisando da **incontinência oculta**. {q-scmsp2025-066}
- Sexualmente ativa, preserva útero: **histeropexia sacral**. {q-tp20212-099}
- Prolapso de cúpula: **suspensão ao promontório** com tela. {q-uspsp3-067}
- Apical grande com urgência aos 76: **colpossacrofixação e mirabegrona**. {q-einstein2024-057}
- Colo alongado querendo filhos: **Manchester**. {q-uspsp5-033,q-fmabc2023-075}` },
      ],
    },
    {
      id: "fistula", titulo: "Fístulas urogenitais",
      introducao: `[[Perda contínua de urina pela vagina dias a semanas após histerectomia é fístula: vesicovaginal (lesão da bexiga) ou ureterovaginal (lesão do ureter). Azul de metileno na bexiga que tinge o tampão vaginal é vesicovaginal; tampão molhado de urina amarela, ou tingido só com corante venoso, é ureterovaginal.|q-adap23-047,q-famerp2026-018,q-einstein2022-047]]`,
      fragmentos: [
        { id: "fis-diagnostico", titulo: "Vesicovaginal × ureterovaginal",
          questoes: ["q-adap23-047","q-famerp2026-018","q-einstein2022-047"],
          texto: `- Diferenciar: **azul de metileno na bexiga e índigo carmim venoso**. {q-adap23-047}
- Perda contínua após histerectomia: **azul de metileno intravesical**. {q-famerp2026-018}
- Azul não sai, urina amarela na vagina: **fístula ureterovaginal**. {q-einstein2022-047}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-tp20241-096","q-usprp2021-067","q-scmsp2022-047"],
          texto: `- O NICE não pede urodinâmica na incontinência de esforço pura com teste positivo; a prova pediu **exame urodinâmico** antes de tratar. {q-tp20241-096}
- O NICE não usa eletroestimulação de rotina com a fisioterapia; a banca respondeu **eletroestimulação e oxibutinina**. {q-usprp2021-067}
- No quadro misto, o tratamento conservador começa antes de qualquer exame; a banca incluiu o **urodinâmico** na conduta. {q-scmsp2022-047}` },
      ],
    },
  ],
});
