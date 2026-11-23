/* resumos/financiamento/resumo.js — resumo adaptativo de financiamento do SUS e saúde suplementar
   (ass-financiamento): gasto público × privado no Brasil, LC 141/2012 (percentuais, exigências,
   RDQA), emendas, financiamento da APS (PAB, Previne Brasil, cofinanciamento 2024), participação
   privada (complementar, capital estrangeiro), saúde suplementar (ANS, rol, ressarcimento, rescisão,
   verticalização), modelos de remuneração; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- financiamento */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "financiamento",
  titulo: "Financiamento do SUS e saúde suplementar",
  assunto: "ass-financiamento",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "lc141", texto: "Lei Complementar 141/2012; Constituição Federal arts. 198–199; EC 86/2015 e EC 95/2016; Lei 8.080/1990 e Lei 8.142/1990", lidoEm: null },
    { id: "previne", texto: "Portaria GM/MS 2.979/2019 (Previne Brasil) e Portaria GM/MS 3.493/2024 (nova metodologia de cofinanciamento da APS)", lidoEm: null },
    { id: "ans", texto: "Lei 9.656/1998, Lei 9.961/2000 (ANS), Lei 14.454/2022 (rol exemplificativo), Lei 13.097/2015 (capital estrangeiro)", lidoEm: null },
    { id: "ibge-conta", texto: "IBGE — Conta-Satélite de Saúde (2010–2021) e POF 2017–2018", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-sirio2025-090"] },
  ],
  doencas: [
    {
      id: "publico", titulo: "Quem paga a saúde no Brasil",
      introducao: `[[O SUS é um **sistema público de acesso universal** com prestação pública e privada; mas o Brasil gasta mais **privado** que **público** em saúde — situação rara entre países com sistema universal. Mais da metade do gasto total vai para serviços privados, e a família gasta do próprio bolso sobretudo com **medicamentos**, peso maior nos mais pobres.|q-sessp2024-093,q-usp2023-064,q-usp2025-098,q-usp2026-094]]

Veja também: **Princípios e organização do SUS**, **Políticas nacionais**, **Atenção primária** e **Controle social** quando houver resumo.`,
      fragmentos: [
        { id: "pub-lc141", titulo: "Lei Complementar 141 e controle", conferir: true, diretrizes: ["lc141"],
          figuras: [{ arquivo: "figuras/financiamento.svg", legenda: "Esquema autoral: quanto cada esfera aplica, o que o município precisa ter e para onde vai o dinheiro." }],
          casos: ["q-usprp2024-019"],
          questoes: ["q-sessp2024-093","q-usp2023-064","q-usp2025-098","q-usp2026-094","q-fmabc2023-094","q-usprp2024-019","q-udisc20262-040","q-adap21-002","q-uspsp1-117","q-usp2024-076","q-usprp2022-005"],
          prosa: `[[A LC 141/2012 fixa o mínimo de receita própria em ações e serviços públicos de saúde: **municípios 15%**, **estados 12%**; a União segue regra própria (o valor do ano anterior corrigido, alterada por emendas constitucionais).|q-fmabc2023-094,q-usprp2024-019]] [[Para receber recursos, o município precisa de **fundo de saúde, conselho de saúde, plano de saúde e relatório de gestão**. A prestação de contas é quadrimestral: o **Relatório Detalhado do Quadrimestre Anterior** vai a audiência pública no Legislativo e ao conselho.|q-udisc20262-040,q-adap21-002]] [[Metade das emendas individuais dos parlamentares ao orçamento vai obrigatoriamente para a saúde.|q-uspsp1-117]] [[Os dados do gasto e da cobertura (IBGE, PNAD) servem para analisar a abrangência do SUS; a atenção especializada foi cobrada como majoritariamente federal.|q-usp2024-076,q-usprp2022-005]]`,
          texto: `- Brasil: **gasto privado > público**; bolso = **medicamentos**. {q-sessp2024-093,q-usp2023-064,q-usp2025-098,q-usp2026-094}
- **Município 15%, estado 12%**. {q-fmabc2023-094,q-usprp2024-019}
- Fundo, **conselho, plano, relatório**; **RDQA**. {q-udisc20262-040,q-adap21-002}
- Emendas: metade para a saúde. {q-uspsp1-117,q-usp2024-076,q-usprp2022-005}` },
        { id: "pub-aps", titulo: "Financiamento da atenção primária", conferir: true, diretrizes: ["previne"],
          questoes: ["q-famema2021-077","q-fmabc2026-082","q-tp20222-105","q-iamspe2023-067","q-usprp2021-002","q-usprp2023-051","q-amrigs2025-090","q-tp20252-035","q-usprp2027-096"],
          prosa: `[[O **Piso da Atenção Básica** (1998) passou a pagar por população (parte fixa) e por ações e programas (parte variável), e a Saúde da Família tirou o financiamento da lógica de produção.|q-famema2021-077,q-fmabc2026-082]] [[O **Previne Brasil** (2019) trocou o PAB por **captação ponderada** (pessoas cadastradas, pesando vulnerabilidade), **pagamento por desempenho** (indicadores como pressão aferida no hipertenso, citopatológico em mulheres de 25–64 anos, consultas odontológicas na gestante) e **incentivo para ações estratégicas** (residência, saúde bucal, programas). Para ganhar a captação, o gestor **cadastra a população**.|q-tp20222-105,q-iamspe2023-067,q-usprp2021-002,q-usprp2023-051,q-amrigs2025-090,q-usprp2027-096]] [[A metodologia de 2024 tem componentes fixo, de **vínculo e acompanhamento territorial** (cadastro qualificado, satisfação), de qualidade e de implantação de ações.|q-tp20252-035]]`,
          texto: `- PAB fixo e variável. {q-famema2021-077,q-fmabc2026-082}
- **Previne**: captação ponderada, desempenho, ações estratégicas. {q-tp20222-105,q-iamspe2023-067,q-usprp2021-002,q-usprp2023-051,q-amrigs2025-090,q-usprp2027-096}
- 2024: **vínculo e acompanhamento territorial**. {q-tp20252-035}` },
      ],
    },
    {
      id: "privado", titulo: "Setor privado e saúde suplementar",
      introducao: `[[O privado entra no SUS de forma **complementar** (contrato ou convênio, preferência às filantrópicas, sem subvenção a quem tem fins lucrativos) e existe por fora como **saúde suplementar** (planos), regulada pela ANS.|q-unesp2025-088,q-tp20202-106]]`,
      fragmentos: [
        { id: "pri-complementar", titulo: "Participação complementar e capital estrangeiro", conferir: true, diretrizes: ["lc141","ans"],
          questoes: ["q-unesp2025-088","q-tp20202-106","q-uspsp3-009","q-uspsp4-087","q-famerp2025-034"],
          prosa: `[[É **vedado destinar recursos públicos** a auxílios ou subvenções para instituições privadas **com fins lucrativos**.|q-unesp2025-088]] [[Desde 2015, **hospitais e clínicas privados** podem ter capital estrangeiro, além de filantrópicos e serviços mantidos por empresas para seus empregados.|q-uspsp3-009,q-uspsp4-087]] [[Medicina de grupo, cooperativa, autogestão e seguradora são modalidades de **operadora** de plano. **Verticalização** é a operadora comprar hospitais, laboratórios e clínicas.|q-tp20202-106,q-famerp2025-034]]`,
          texto: `- **Sem subvenção** a quem tem lucro. {q-unesp2025-088}
- Capital estrangeiro em **hospitais privados** desde 2015. {q-uspsp3-009,q-uspsp4-087}
- Operadoras; **verticalização**. {q-tp20202-106,q-famerp2025-034}` },
        { id: "pri-ans", titulo: "ANS, rol e ressarcimento", conferir: true, diretrizes: ["ans"],
          casos: ["q-iamspe2022-072"],
          questoes: ["q-sirio2027-097","q-usp2024-080","q-usp2025-097","q-usp2022-036","q-usp2023-066","q-usprp2026-034","q-iamspe2022-072","q-unesp2021-091","q-famerp2023-009","q-famerp2022-003","q-fmabc2025-090"],
          prosa: `[[A **ANS** regula, define o **rol** de cobertura mínima obrigatória e fiscaliza. Desde 2022 o rol é exemplificativo: fora dele, cobre-se se houver evidência e **recomendação da Conitec** ou de agência internacional de renome.|q-sirio2027-097,q-usp2024-080]] [[A **rescisão unilateral imotivada** é permitida nos contratos **coletivos**, proibida nos individuais.|q-usp2025-097]] [[Beneficiário de plano atendido no SUS gera **ressarcimento**, nos limites do contrato, identificado pelo **Aviso de Beneficiário Identificado**.|q-usp2022-036,q-usp2023-066,q-usprp2026-034]] [[O número de beneficiários acompanha o **emprego formal** (planos coletivos empresariais). Cooperativas podem ter hospitais próprios. O mercado tende à **concentração e verticalização**, com médicos cada vez mais assalariados ou como pessoa jurídica.|q-iamspe2022-072,q-unesp2021-091,q-famerp2023-009,q-famerp2022-003]] [[Modelos de remuneração: por procedimento, por pacote, capitação, por diária — esta paga a instituição pelo dia internado, não o médico por paciente.|q-fmabc2025-090]]`,
          texto: `- ANS: **rol**; fora dele com Conitec. {q-sirio2027-097,q-usp2024-080}
- Rescisão imotivada: só **coletivos**. {q-usp2025-097}
- **Ressarcimento** ao SUS (ABI). {q-usp2022-036,q-usp2023-066,q-usprp2026-034}
- Beneficiários seguem o **emprego**; verticalização. {q-iamspe2022-072,q-unesp2021-091,q-famerp2023-009,q-famerp2022-003}
- Diária paga a **instituição**. {q-fmabc2025-090}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["lc141","previne"],
          questoes: ["q-usp2024-076","q-fmabc2023-094","q-famerp2025-034","q-udisc20262-040"],
          prosa: `[[**Quem paga a média complexidade**: União, estados e municípios dividem; a usp2024-076 afirmou que a atenção especializada é **majoritariamente federal**, com participação equivalente de estados e municípios.|q-usp2024-076]] [[**Regra da União**: a LC 141 previa o valor do ano anterior mais a variação do PIB; emendas constitucionais mudaram a base depois. A fmabc2023-094 descreveu a regra original.|q-fmabc2023-094]] [[**Contrato com o privado**: a participação complementar é por contrato de direito público ou convênio; a famerp2025-034 juntou verticalização e **contratos de direito público** numa mesma alternativa.|q-famerp2025-034]] [[**Exigências da Lei 8.142**: fundo, conselho, plano, relatório, contrapartida e plano de carreira; a udisc20262-040 pediu três — **plano, conselho e relatório**.|q-udisc20262-040]]`,
          texto: `- Especializada **federal** na prova. {q-usp2024-076}
- Regra original da União. {q-fmabc2023-094}
- **Direito público**. {q-famerp2025-034}
- Plano, conselho, relatório. {q-udisc20262-040}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: público × suplementar",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-setores", titulo: "Quem regula, quem paga", conferir: true,
          questoes: ["q-fmabc2023-094","q-tp20222-105","q-sirio2027-097","q-usp2023-066"],
          prosa: `[[Os dois sistemas têm regras e fontes diferentes.|q-fmabc2023-094,q-tp20222-105,q-sirio2027-097,q-usp2023-066]]

| | SUS | Saúde suplementar |
| Fonte | impostos das três esferas (município 15%, estado 12%) | mensalidades de pessoas e empresas |
| Regulação | Ministério, conselhos de saúde | ANS (Lei 9.656) |
| Cobertura | universal e integral | rol da ANS e contrato |
| Ponte | contratos com o privado complementar | ressarcimento ao SUS |`,
          texto: `- SUS: **15% / 12%**. {q-fmabc2023-094}
- APS: **Previne/cofinanciamento**. {q-tp20222-105}
- Suplementar: **ANS e rol**. {q-sirio2027-097}
- **Ressarcimento**. {q-usp2023-066}` },
      ],
    },
  ],
});
