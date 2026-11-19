/* resumos/climaterio/resumo.js — resumo adaptativo de climatério: transição e diagnóstico, insuficiência
   ovariana prematura (o essencial; dono: ciclo-menstrual), terapia hormonal (indicação, janela, contraindicações,
   esquema e via), tratamento não hormonal, síndrome geniturinária, sangramento pós-menopausa e osteoporose.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- climaterio */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "climaterio",
  titulo: "Climatério e menopausa",
  assunto: "ass-climaterio",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "nams-2022", texto: "The Menopause Society (NAMS) — The 2022 hormone therapy position statement (Menopause 2022;29:767-794)", lidoEm: null },
    { id: "nams-nao-hormonal", texto: "The Menopause Society — The 2023 nonhormone therapy position statement (Menopause 2023;30:573-590)", lidoEm: null },
    { id: "febrasgo-climaterio", texto: "FEBRASGO — Manual/Protocolo de climatério e terapia hormonal", lidoEm: null },
    { id: "ms-climaterio", texto: "Ministério da Saúde — Protocolos da Atenção Básica: Saúde das Mulheres (2016), climatério", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas (duas entram pelas reposições)", questoes: ["q-unifesp2023-048","q-famerp2025-026","q-sirio2025-064","q-sirio2027-075"] },
  ],
  doencas: [
    {
      id: "transicao", titulo: "Transição menopausal e diagnóstico",
      introducao: `[[Com a queda do número de folículos, a inibina B cai e o FSH sobe: primeiro os ciclos encurtam (fase folicular mais rápida), depois vêm atrasos de 60 dias ou mais, até a amenorreia.|q-sirio2026-064,q-sirio2026-067,q-amrigs2022-059,q-fmabc2024-063]] [[A menopausa é a última menstruação, reconhecida após 12 meses de amenorreia depois dos 45 anos; o diagnóstico é clínico e não precisa de dosagem hormonal. O FSH só ajuda abaixo dos 45 anos ou sem útero.|q-tp20222-097,q-tp20232-096,q-tp20251-098,q-tp20241-095,q-scmsp2022-050,q-famema2023-047]]

[[O hipoestrogenismo explica os sintomas: o centro termorregulador do hipotálamo estreita sua faixa e dispara vasodilatação e suor (fogacho); o epitélio vaginal e uretral, dependente de estrogênio, atrofia; humor e sono pioram.|q-iamspe2022-049,q-amrigs2021-055,q-fmabc2022-079]] [[Na obesa, o tecido adiposo converte androgênios em estrona, e os sintomas podem ser menores.|q-sirio2022-062]]

Veja também: **Ciclo menstrual** (insuficiência ovariana prematura em detalhe), **Câncer de mama** (fogachos na sobrevivente), **Câncer de endométrio** (sangramento pós-menopausa com endométrio espesso), **Uroginecologia** (incontinência).`,
      fragmentos: [
        { id: "tra-diagnostico", titulo: "Transição, sintomas e diagnóstico", conferir: true, diretrizes: ["ms-climaterio"],
          questoes: ["q-scmsp2022-050","q-amrigs2022-059","q-amrigs2020-056","q-amrigs2021-055","q-iamspe2022-049","q-famema2023-047","q-famema2025-049","q-tp20222-097","q-tp20232-096","q-tp20241-095","q-tp20251-098","q-sirio2026-064","q-sirio2026-067","q-sirio2022-062","q-fmabc2024-063","q-fmabc2022-079","q-usp2026-083","q-einstein2027-056"],
          prosa: `[[Antes de tratar, investiga-se a intensidade dos sintomas e se orienta o estilo de vida; sangramento irregular e volumoso na transição pede ultrassom transvaginal.|q-usp2026-083,q-famema2025-049,q-einstein2027-056]] [[Ovários resistentes às gonadotrofinas causam amenorreia primária ou secundária com FSH alto.|q-amrigs2020-056]]`,
          texto: `- Primeiro sinal da transição: **ciclos mais curtos**. {q-sirio2026-064}
- Atrasos de 60 dias aos 44 anos: **FSH e LH altos, estradiol baixo**. {q-sirio2026-067}
- Final da transição: amenorreia > 60 dias, **FSH > 25**, AMH e inibina B baixos. {q-amrigs2022-059}
- Estradiol < 20 e estrona 30–60: **climatério/pós-menopausa**. {q-fmabc2024-063}
- Pós-menopausa: **> 45 anos e > 12 meses de amenorreia**. {q-tp20222-097}
- Diagnóstico **clínico**, sem exame. {q-tp20232-096,q-tp20251-098}
- Antes da TH, **não** se pede FSH. {q-tp20241-095}
- Se precisar de hormônio para o diagnóstico: **FSH**. {q-scmsp2022-050,q-famema2023-047}
- Fogacho: **hipoestrogenismo**. {q-iamspe2022-049}
- Ligados ao hipoestrogenismo: **humor, cognição, fogachos** (ganho de peso não). {q-amrigs2021-055}
- Mais ligado à depressão: **fogachos**. {q-fmabc2022-079}
- Obesa sem sintomas: **estrona** do tecido adiposo. {q-sirio2022-062}
- Abordagem inicial: **intensidade dos sintomas e estilo de vida**. {q-usp2026-083}
- Sangramento irregular na transição: **ultrassom transvaginal**. {q-famema2025-049}
- Ovário resistente a gonadotrofinas: amenorreia **primária ou secundária**. {q-amrigs2020-056}
- Com medo da TH e história familiar: banca, **investigar antes** (gestação, tireoide, trombofilia). {q-einstein2027-056}` },
        { id: "tra-iop", titulo: "Menopausa antes dos 40 anos",
          questoes: ["q-unifesp2024-049","q-unifesp2025-071","q-simepm89-038"],
          prosa: `[[Antes dos 40, FSH alto repetido com estradiol baixo é insuficiência ovariana prematura: a terapia hormonal vai até a idade natural da menopausa, para proteger osso e coração, e não para tratar sintoma.|q-unifesp2024-049,q-unifesp2025-071,q-simepm89-038]] O detalhe está em **Ciclo menstrual**.`,
          texto: `- 33 anos, amenorreia de 6 meses: **terapia de reposição**. {q-unifesp2024-049}
- FSH 87 e 61 aos 41: **estradiol e progesterona**. {q-unifesp2025-071}
- Confirmar: **FSH, LH, estradiol, cariótipo, PRL, TSH**, repetir FSH em 4 sem. {q-simepm89-038}` },
      ],
    },
    {
      id: "terapia", titulo: "Terapia hormonal",
      introducao: `[[A terapia hormonal é o tratamento mais eficaz do fogacho e da atrofia, e previne osteoporose; o balanço é favorável quando começa antes dos 60 anos ou nos primeiros 10 anos da menopausa (janela de oportunidade), e desfavorável depois, quando a placa já existe e o estrogênio pode desestabilizá-la.|q-022,q-scmsp2023-061,q-famema2022-060,q-sirio2021-075,q-sirio2022-077,q-fmabc2023-072]]

[[Quem tem útero precisa de progestagênio junto, porque o estrogênio sozinho faz o endométrio proliferar e dá hiperplasia e câncer; sem útero, estrogênio isolado.|q-adap25-071,q-adap24-038,q-sessp2025-065,q-unesp2024-032,q-famerp2022-033,q-unicampdis2022-046]] [[A via transdérmica não passa pelo fígado: não aumenta fatores de coagulação, triglicérides nem PCR; por isso é a escolha com obesidade, hipertensão, tabagismo, hipertrigliceridemia, diabetes ou enxaqueca.|q-usp2024-105,q-fmabc2025-063,q-sessp2022-064,q-tp20252-045,q-tp20261-039,q-tp20231-098]]

[[Contraindicam a terapia sistêmica: câncer de mama ou de endométrio, sangramento sem causa, trombose venosa ou arterial prévia, doença hepática grave e porfiria.|q-unesp2025-030,q-uspsp2-036]]`,
      fragmentos: [
        { id: "ter-indicacao", titulo: "Quando indicar e quando não", conferir: true, diretrizes: ["nams-2022","febrasgo-climaterio"],
          figuras: [{ arquivo: "figuras/terapia-hormonal.svg", legenda: "Esquema autoral: a decisão da terapia hormonal — janela, útero e via." }],
          questoes: ["q-022","q-scmsp2023-061","q-famema2022-060","q-famema2025-050","q-sirio2021-075","q-sirio2022-077","q-fmabc2023-072","q-unicamp2023-058","q-unesp2025-030","q-uspsp3-069","q-tp20212-098","q-unesp2026-034","q-tp20231-098"],
          prosa: `[[Antes de começar, mamografia em dia; no seguimento, perfil lipídico, glicemia e mamografia anual.|q-unicamp2023-058,q-unesp2026-034,q-famema2025-050]]`,
          texto: `- Fogachos com 52 anos sem contraindicação: **terapia hormonal** na menor dose eficaz. {q-022,q-tp20212-098,q-uspsp3-069}
- Abaixo de 60 anos: TH é **primeira linha** para prevenir osteoporose. {q-scmsp2023-061}
- Iniciada antes de 10 anos da menopausa: pode **reduzir doença cardiovascular**. {q-famema2022-060,q-sirio2021-075}
- Respeitar a **janela de oportunidade**. {q-fmabc2023-072}
- Com 65 anos e mais de 10 de menopausa: **não iniciar TH sistêmica**. {q-sirio2022-077}
- Exames normais: **estroprogestativa** após explicar riscos. {q-famema2025-050}
- Antes de prescrever: **mamografia**. {q-unesp2026-034}
- Seguimento: **lipídios, glicemia e mamografia**. {q-unicamp2023-058}
- Trombose prévia: **contraindicada**. {q-unesp2025-030}
- Obesa, exames da figura: combinada, **só transdérmica**. {q-tp20231-098}` },
        { id: "ter-esquema", titulo: "Estrogênio isolado ou combinado, e a via", conferir: true, diretrizes: ["nams-2022"],
          questoes: ["q-adap24-038","q-adap25-071","q-adap22-023","q-adap26-042","q-sirio2027-075-ia","q-usp2024-105","q-sessp2022-064","q-sessp2025-065","q-sessp2026-076","q-tp20202-087","q-tp20252-045","q-tp20261-039","q-unesp2021-029","q-unesp2024-032","q-famerp2022-033","q-unicampdis2022-046","q-unicampdis2024-037","q-udisc20262-091","q-uspsp4-034","q-sirio2024-063","q-fmabc2025-063","q-einstein2023-054","q-einstein2024-055"],
          prosa: `[[A progesterona micronizada e a didrogesterona protegem o endométrio com menos efeito na mama; a tibolona é alternativa.|q-adap22-023,q-adap26-042,q-unicampdis2024-037]] [[Depois de câncer de ovário epitelial operado, a terapia hormonal é permitida (estrogênio isolado se o útero saiu).|q-unicampdis2022-046,q-sirio2024-063]] [[Desejo sexual hipoativo na pós-menopausa, já com estrogênio, pode receber testosterona transdérmica em dose baixa.|q-einstein2024-055]]`,
          texto: `- Histerectomizada: **estrogênio isolado**. {q-adap24-038,q-adap25-071,q-famerp2022-033,q-sirio2027-075-ia}
- Histerectomia **subtotal** ou vagina em fundo cego: estrogênio isolado. {q-sessp2025-065,q-unesp2024-032}
- Com útero: **estradiol transdérmico + progesterona micronizada**. {q-adap22-023,q-adap26-042}
- Obesa com FSH 80: **transdérmico + progesterona**. {q-sessp2026-076}
- Tabagista hipertensa: **estroprogestativa não oral**. {q-tp20252-045,q-tp20261-039}
- Transdérmica: **menos trombose**. {q-usp2024-105,q-fmabc2025-063}
- Triglicérides altos: **transdérmica**. {q-sessp2022-064}
- IMC 31 com hipotrofia: TH, **transdérmica primeiro**. {q-unesp2021-029,q-tp20202-087}
- Útero presente aos 51: **combinada** (ou tibolona). {q-unicampdis2024-037}
- 45 anos sem contraindicação: **estradiol + noretisterona**. {q-udisc20262-091}
- 5 meses de amenorreia aos 53: **estradiol e noretisterona transdérmicos**. {q-uspsp4-034}
- Após cirurgia por câncer de ovário: **estrogênio** (transdérmico). {q-unicampdis2022-046,q-sirio2024-063}
- Fogachos com 8 episódios/dia: **combinada transdérmica**. {q-einstein2023-054}
- Libido baixa com TH: **testosterona transdérmica** em dose baixa. {q-einstein2024-055}` },
        { id: "ter-nao-hormonal", titulo: "Tratamento não hormonal", conferir: true, diretrizes: ["nams-nao-hormonal"],
          questoes: ["q-scmsp2026-070","q-usp2026-113","q-usprp2024-086","q-amrigs2024-044","q-amrigs2025-047","q-unicampdis2025-087","q-uspsp2-036","q-didepm-058"],
          prosa: `[[Sem poder ou sem querer hormônio, ISRS e IRSN (paroxetina, venlafaxina, desvenlafaxina), gabapentina, fezolinetanto e terapia cognitivo-comportamental reduzem os fogachos.|q-usprp2024-086,q-amrigs2024-044,q-amrigs2025-047,q-unicampdis2025-087,q-uspsp2-036]] [[Com tamoxifeno, evitam-se paroxetina e fluoxetina, que inibem a enzima que ativa o tamoxifeno.|q-didepm-058]]`,
          texto: `- Não hormonal mais efetivo entre as opções: **paroxetina**. {q-usprp2024-086}
- Opções: estilo de vida, **TH**, **ISRS e IRSN**. {q-amrigs2024-044}
- **Terapia cognitivo-comportamental** reduz fogachos. {q-amrigs2025-047}
- TVP prévia: **ISRS**. {q-uspsp2-036}
- 62 anos, longe da janela: **não hormonal** (ISRS, IRSN, gabapentina). {q-unicampdis2025-087}
- Insônia e apetite: **sertralina**. {q-usp2026-113}
- Sobrevivente de mama com anastrozol: **desvenlafaxina e promestrieno vaginal**. {q-scmsp2026-070}
- Com tamoxifeno: **venlafaxina ou gabapentina**. {q-didepm-058}` },
      ],
    },
    {
      id: "genitourinaria", titulo: "Síndrome geniturinária da menopausa",
      introducao: `[[Sem estrogênio, o epitélio vaginal afina e perde glicogênio; os lactobacilos somem, o pH sobe acima de 5 e aparecem células parabasais: secura, ardor, dispareunia, urgência e infecção urinária.|q-usp2024-102,q-usprp2026-067,q-einstein2026-056]] [[O estrogênio vaginal em dose baixa trata a causa sem efeito sistêmico relevante: não precisa de progestagênio nem de vigilância do endométrio, e é seguro mesmo em idosas.|q-amrigs2022-054,q-einstein2026-056,q-uspsp5-028,q-fmabc2026-074]]`,
      fragmentos: [
        { id: "gen-tratamento", titulo: "Estrogênio vaginal e alternativas", conferir: true, diretrizes: ["nams-2022"],
          questoes: ["q-unifesp2026-042","q-usp2024-102","q-usprp2026-067","q-amrigs2022-054","q-unifesp2023-048-ia","q-unesp2023-039","q-uspsp5-028","q-fmabc2026-074","q-einstein2026-056"],
          prosa: `[[Após câncer de mama, começa-se por hidratante e lubrificante; o estrogênio vaginal em dose baixa fica para quem não melhora, combinado com o oncologista.|q-unifesp2023-048-ia]] [[Mesmo com contraindicação à terapia sistêmica (tabagismo, hipertensão, mãe com câncer de mama), o estrogênio vaginal pode ser usado.|q-unesp2023-039]]`,
          texto: `- pH 5, células parabasais, ardor: **estradiol vaginal**. {q-usp2024-102}
- Secura intensa aos 63: **estriol vaginal**. {q-unifesp2026-042,q-usprp2026-067}
- Dispareunia aos 53: **creme vaginal**. {q-fmabc2026-074}
- 74 anos com osteoporose: **estrogênio vaginal em baixa dose**. {q-uspsp5-028}
- Estrogênio vaginal **sem progestina**; sangramento se investiga. {q-amrigs2022-054}
- Uso prolongado: **sem vigilância endometrial** de rotina. {q-einstein2026-056}
- Após carcinoma in situ: **hidratante e lubrificante** primeiro. {q-unifesp2023-048-ia}
- Tabagista hipertensa com sintomas vaginais: **TH vaginal**. {q-unesp2023-039}` },
      ],
    },
    {
      id: "pos-menopausa", titulo: "Sangramento pós-menopausa e osteoporose",
      introducao: `[[Sangramento depois da menopausa é câncer de endométrio até prova em contrário, embora a causa mais comum seja a atrofia: o ultrassom transvaginal separa os dois pelo eco endometrial — até 4 mm, a chance de câncer é muito baixa; acima, biópsia.|q-adap23-044,q-unifesp2023-044,q-unicampdis2022-043,q-unifesp2022-023,q-famerp2024-044]]

[[A queda do estrogênio acelera a reabsorção óssea; na osteoporose da pós-menopausa, bisfosfonato com cálcio, vitamina D, exercício com carga e prevenção de quedas.|q-adap23-048]] O detalhe do sangramento com endométrio espesso está em **Câncer de endométrio**.`,
      fragmentos: [
        { id: "pos-sangramento", titulo: "Sangramento pós-menopausa",
          questoes: ["q-adap23-044","q-unifesp2022-023","q-unifesp2023-044","q-famerp2024-044","q-unicampdis2022-043"],
          texto: `- Eco de 3 mm após sangramento único: **observar**. {q-adap23-044}
- Causa mais comum: **atrofia endometrial**. {q-unicampdis2022-043}
- Eco de 15 mm: **biópsia** (cureta de Novak). {q-unifesp2023-044}
- Tamoxifeno e eco de 9 mm: **histeroscopia com biópsia**. {q-unifesp2022-023}
- Assintomática com 4 mm: **seguimento de rotina**. {q-famerp2024-044}` },
        { id: "pos-osso", titulo: "Osteoporose",
          questoes: ["q-adap23-048"],
          texto: `- Densitometria com osteoporose aos 58: **alendronato, cálcio e vitamina D**, exercício. {q-adap23-048}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-einstein2027-056","q-sirio2022-077","q-tp20231-098"],
          texto: `- Não se pesquisa trombofilia antes da TH sem história pessoal; a banca incluiu **trombofilias** na investigação. {q-einstein2027-056}
- Depois dos 60 anos ou de 10 anos de menopausa, a TH sistêmica **não se inicia** em geral, mas a decisão é individual; a banca tratou como regra fixa. {q-sirio2022-077}
- Obesidade **favorece** a via transdérmica, mas não a obriga; a prova pediu **"desde que transdérmica"**. {q-tp20231-098}` },
      ],
    },
  ],
});
