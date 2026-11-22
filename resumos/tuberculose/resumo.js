/* resumos/tuberculose/resumo.js — resumo adaptativo de tuberculose: transmissão e controle, diagnóstico,
   tratamento e efeitos adversos, infecção latente e contatos, coinfecção com HIV, criança e BCG, formas
   extrapulmonares e tabela comparativa no fim. Cada questão, inclusive as 191 autorais, foi lida e ligada à seção do seu conceito.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- tuberculose */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "tuberculose",
  titulo: "Tuberculose",
  assunto: "ass-tuberculose",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "ms-tb", texto: "Ministério da Saúde — Manual de Recomendações para o Controle da Tuberculose no Brasil (2ª ed. atualizada, 2019, gov.br) e folheto do esquema 3HP para ILTB", lidoEm: "2026-11-19" },
    { id: "oms-tb", texto: "OMS — Consolidated guidelines on tuberculosis (módulos de tratamento e prevenção, 2022–2025)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anuladas, sem reposição", questoes: ["q-gdtuberculose-004", "q-gdtuberculose-024", "q-gdtuberculose-043", "q-gdtuberculose-062", "q-gdtuberculose-067", "q-gdtuberculose-098", "q-gdtuberculose-101", "q-gdtuberculose-104", "q-gdtuberculose-164"] },
  ],
  doencas: [
    {
      id: "fisiopatologia", titulo: "Transmiss\u00e3o, patogenia e controle",
      introducao: `[[O *Mycobacterium tuberculosis* se transmite por aerossol do doente com tuberculose pulmonar ou laríngea bacilífera; o bacilo chega ao alvéolo, é fagocitado e, quando o macrófago não o destrói, forma-se o granuloma com necrose caseosa.|q-unesp2023-097,q-unicampdis2023-003]] [[Na maioria das pessoas o granuloma contém o bacilo para sempre (infecção latente); a primária progressiva aparece na criança e no imunodeprimido, e a pós-primária, por reativação, escava os ápices pulmonares.|q-gdtuberculose-002,q-gdtuberculose-130,q-gdtuberculose-111]]

[[O controle depende de achar e curar o bacilífero: busca do sintomático respiratório, tratamento diretamente observado, investigação de contatos e notificação; o abandono é o indicador de qualidade que mais pesa.|q-amrigs2023-090,q-usp2026-092,q-tp20222-119,q-tp20251-105]]

Veja também: **Infecções congênitas** (recém-nascido exposto: isoniazida ou rifampicina, pela Nota Informativa 4/2024) e **Infecções sexualmente transmissíveis** (rastreio de HIV).`,
      fragmentos: [
        { id: "fis-pontos", titulo: "Patogenia, formas primária e pós-primária e epidemiologia", conferir: false, diretrizes: ["ms-tb"],
          questoes: ["q-unesp2023-097", "q-unicampdis2023-003", "q-usp2026-092", "q-tp20222-119", "q-tp20251-105", "q-gdtuberculose-030", "q-gdtuberculose-084", "q-gdtuberculose-095", "q-gdtuberculose-123", "q-gdtuberculose-034", "q-gdtuberculose-068", "q-gdtuberculose-111", "q-gdtuberculose-130", "q-gdtuberculose-031", "q-gdtuberculose-032", "q-gdtuberculose-035", "q-gdtuberculose-036", "q-gdtuberculose-040", "q-gdtuberculose-054", "q-gdtuberculose-138", "q-gdtuberculose-140", "q-gdtuberculose-158", "q-gdtuberculose-173", "q-gdtuberculose-009"],
          prosa: `Na primeira infecção o bacilo vai ao pulmão e ao linfonodo hilar (complexo de Ghon); na maioria, a imunidade celular o contém, e o que fica é uma cicatriz calcificada. A forma primária progressiva é a da criança e do imunodeprimido: febre, consolidação que imita pneumonia e linfonodo hilar. A pós-primária é a reativação no adulto, nos ápices, onde há mais oxigênio: o granuloma necrosa, escava e se abre no brônquio, e é essa caverna que torna o doente bacilífero.`,
          texto: `- Necrose do granuloma: **caseosa**. {q-unesp2023-097}
- Destruição progressiva do ápice para a base: **pós-primária**. {q-unicampdis2023-003}
- Nódulo calcificado com linfonodo hilar (Ghon): **primária no passado**. {q-gdtuberculose-068,q-gdtuberculose-111,q-gdtuberculose-130}
- Primária: mais em criança; **febre** é o sintoma mais comum; tosse nem sempre; pode imitar pneumonia. {q-gdtuberculose-030,q-gdtuberculose-084,q-gdtuberculose-095,q-gdtuberculose-123}
- Fonte principal: **o bacilífero**. {q-gdtuberculose-140}
- Abandono: **indicador de qualidade**; notificação semanal; avaliar contatos. {q-usp2026-092,q-tp20222-119,q-tp20251-105}` },
        { id: "fis-biosseg", titulo: "Transmiss\u00e3o, isolamento e biosseguran\u00e7a", conferir: false, diretrizes: ["ms-tb"],
          questoes: ["q-gdtuberculose-007", "q-gdtuberculose-014", "q-gdtuberculose-044", "q-gdtuberculose-075", "q-gdtuberculose-103", "q-gdtuberculose-125"],
          prosa: `O bacilo sai em aerossol quando o bacilífero tosse e fica suspenso no ar de ambientes fechados; ventilação, luz e máscara reduzem a transmissão. Com o tratamento, a carga bacilar cai rápido, e em cerca de 15 dias a transmissão fica insignificante. A forma extrapulmonar, sem lesão aberta para a via aérea, não transmite.`,
          texto: `- Transmissão insignificante **cerca de 15 dias** após iniciar o tratamento. {q-gdtuberculose-125}
- Internado bacilífero: **quarto de isolamento** e profissional com **máscara N95**. {q-gdtuberculose-103}
- Profissional de laboratório também usa **N95** (a afirmativa que dispensa está errada). {q-gdtuberculose-075}
- Tuberculose pleural: **sem isolamento** respiratório. {q-gdtuberculose-044}
- Ambiente ventilado e iluminado reduz a transmissão. {q-gdtuberculose-007,q-gdtuberculose-014}` },
        { id: "fis-tdo", titulo: "Tratamento diretamente observado e ades\u00e3o", conferir: false, diretrizes: ["ms-tb"],
          questoes: ["q-tp20212-101", "q-simepm89-055", "q-amrigs2023-090", "q-gdtuberculose-053", "q-gdtuberculose-080", "q-gdtuberculose-135", "q-gdtuberculose-079"],
          prosa: `O tratamento dura meses e o doente melhora em semanas: é aí que abandona, e o bacilo que sobra volta resistente. Por isso a tomada observada por um profissional é recomendada para todos, e a equipe constrói vínculo e procura quem falta.`,
          texto: `- TDO: **para todos os casos**. {q-gdtuberculose-135}
- Mínimo de **24 tomadas observadas** na fase intensiva. {q-simepm89-055}
- Pessoa em situação de rua: TDO pelo **consultório na rua**. {q-tp20212-101}
- Vínculo e retirada na farmácia ajudam a medir a adesão. {q-amrigs2023-090,q-gdtuberculose-053}` },
      ],
    },
    {
      id: "diagnostico", titulo: "Diagn\u00f3stico da tuberculose pulmonar",
      introducao: `[[Sintomático respiratório é quem tosse há 3 semanas ou mais (na população vulnerável, qualquer tempo de tosse): investiga-se com teste rápido molecular (TRM-TB), que também detecta resistência à rifampicina, ou baciloscopia, e cultura com teste de sensibilidade.|q-sirio2022-097,q-adap24-018,q-famerp2025-048,q-iamspe2025-093,q-uspsp2-011]] [[A prova tuberculínica não confirma doença ativa; a radiografia sugere (cavidade em ápice), mas nenhuma imagem é patognomônica.|q-amrigs2022-091,q-sessp2023-073,q-gdtuberculose-078]]`,
      fragmentos: [
        { id: "dia-pontos", titulo: "Diagn\u00f3stico da tuberculose pulmonar", conferir: false, diretrizes: ["ms-tb"],
          casos: ["q-uspsp2-011"],
          questoes: ["q-adap24-018", "q-usprp2023-045", "q-iamspe2025-093", "q-sessp2023-073", "q-famerp2025-048", "q-uspsp2-011", "q-sirio2022-097", "q-famerp2024-069", "q-tp20202-112", "q-scmsp2025-100", "q-gdtuberculose-003", "q-gdtuberculose-018", "q-gdtuberculose-029", "q-gdtuberculose-087", "q-gdtuberculose-092", "q-gdtuberculose-096", "q-gdtuberculose-115", "q-gdtuberculose-159", "q-gdtuberculose-161"],
          texto: `- Sintomático respiratório: tosse **≥ 3 semanas**. {q-sirio2022-097,q-gdtuberculose-115}
- Exame de escolha: **TRM-TB** (ou baciloscopia). {q-adap24-018,q-famerp2025-048,q-iamspe2025-093}
- Cavitação: **BAAR no escarro**. {q-sessp2023-073,q-uspsp2-011}` },
        { id: "dia-exames", titulo: "Teste molecular, cultura e imagem", conferir: false, diretrizes: ["ms-tb"],
          questoes: ["q-amrigs2022-091", "q-einstein2023-010", "q-usp2025-074", "q-unesp2024-097", "q-gdtuberculose-012", "q-gdtuberculose-037", "q-gdtuberculose-049", "q-gdtuberculose-060", "q-gdtuberculose-061", "q-gdtuberculose-070", "q-gdtuberculose-076", "q-gdtuberculose-078", "q-gdtuberculose-107", "q-gdtuberculose-141", "q-gdtuberculose-143", "q-gdtuberculose-174", "q-gdtuberculose-178", "q-gdtuberculose-025", "q-gdtuberculose-136"],
          prosa: `O teste rápido molecular amplifica o DNA do bacilo: é mais sensível que a baciloscopia e mostra a resistência à rifampicina em horas, mas detecta também bacilo morto, por isso não serve para controlar a cura (o controle é a baciloscopia mensal). A cultura é a mais sensível e permite o teste de sensibilidade, mas leva semanas; entra quando o escarro é negativo e a suspeita persiste. A radiografia sugere e localiza, mas nenhuma imagem confirma: até a pneumonia que não responde a antibiótico pode ser tuberculose.`,
          texto: `- TRM-TB: casos novos de forma **pulmonar e laríngea**, em cerca de 2 horas. {q-gdtuberculose-012}
- Confirmam doença ativa: **TRM e cultura**, não a PT. {q-amrigs2022-091}
- Nenhuma imagem é **patognomônica**. {q-gdtuberculose-078}
- TRM **não** serve para acompanhar o tratamento (detecta bacilo morto). {q-gdtuberculose-061}
- Escarro negativo com suspeita clínica e radiológica: **cultura** (e broncoscopia se preciso). {q-gdtuberculose-070,q-gdtuberculose-143}
- Pneumonia que não melhora com antibiótico: pensar em **tuberculose**. {q-einstein2023-010,q-gdtuberculose-178}` },
        { id: "dia-resistencia", titulo: "Resist\u00eancia, retratamento e cultura", conferir: false, diretrizes: ["ms-tb"],
          questoes: ["q-usp2024-081", "q-gdantibioticos-115", "q-gdtuberculose-020", "q-gdtuberculose-039", "q-gdtuberculose-112", "q-gdtuberculose-121", "q-gdtuberculose-160", "q-gdtuberculose-168", "q-gdtuberculose-169", "q-gdtuberculose-170", "q-gdtuberculose-172"],
          prosa: `O bacilo fica resistente por mutação, selecionada quando recebe uma droga só ou tratamento irregular. O teste rápido molecular já mostra a resistência à rifampicina; a cultura com teste de sensibilidade define o esquema. Tuberculose multirresistente é a resistente a rifampicina e isoniazida ao mesmo tempo e se trata em unidade de referência, com esquemas que incluem quinolona.`,
          texto: `- TRM com **resistência à rifampicina**: repetir TRM, **cultura e TS** e encaminhar à referência. {q-usp2024-081}
- Cultura com TS: **todo retratamento** (recidiva, retorno após abandono), entre outras situações. {q-gdtuberculose-020}
- Baciloscopia positiva no fim do 2º mês: **cultura e TS**. {q-gdtuberculose-121}
- **Multirresistente**: rifampicina + isoniazida; esquema próprio em **referência**. {q-gdtuberculose-169,q-gdtuberculose-170}
- Quinolonas fazem parte do esquema da multirresistente; por isso **não** se usam empiricamente em pneumonia com suspeita de tuberculose. {q-gdantibioticos-115,q-gdtuberculose-039}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento e efeitos adversos",
      introducao: `[[O esquema básico é 2 meses de rifampicina, isoniazida, pirazinamida e etambutol (RHZE) e 4 meses de rifampicina e isoniazida (RH), em comprimidos de dose fixa: várias drogas juntas evitam selecionar mutantes resistentes.|q-inf-14,q-gdtuberculose-100,q-gdtuberculose-010,q-gdtuberculose-047,q-einstein2021-007]] [[Os efeitos seguem a droga: isoniazida — neuropatia periférica (prevenida com piridoxina) e convulsão; pirazinamida — hiperuricemia e artralgia; etambutol — neurite óptica; rifampicina — urina avermelhada e interações; e as três primeiras, hepatite.|q-inf-15,q-scmsp2022-079,q-fmabc2026-007,q-gdtuberculose-148,q-gdtuberculose-171]]

[[Hepatotoxicidade com transaminases acima de 3 vezes com sintomas ou icterícia, ou acima de 5 vezes sem sintomas, obriga a suspender o esquema e reintroduzir as drogas uma a uma depois da normalização.|q-adap25-082,q-usprp2021-103,q-gdtuberculose-093,q-gdtuberculose-180]]`,
      fragmentos: [
        { id: "tra-pontos", titulo: "Esquema básico", conferir: false, diretrizes: ["ms-tb"],
          questoes: ["q-inf-14", "q-einstein2021-007", "q-didepm-081", "q-gdtuberculose-010", "q-gdtuberculose-021", "q-gdtuberculose-022", "q-gdtuberculose-055", "q-gdtuberculose-082", "q-gdtuberculose-088", "q-gdtuberculose-100", "q-gdtuberculose-116", "q-gdtuberculose-137", "q-gdtuberculose-142", "q-gdtuberculose-015"],
          prosa: `Há três populações de bacilos: os que se multiplicam rápido na caverna (mortos pela isoniazida), os lentos no cáseo ácido (pirazinamida) e os intermitentes (rifampicina). Usar várias drogas mata todos e impede que um mutante resistente a uma delas sobreviva.`,
          texto: `- Básico: **2RHZE + 4RH**. {q-inf-14,q-gdtuberculose-100,q-gdtuberculose-142,q-einstein2021-007}
- Várias drogas: para **evitar resistência**. {q-gdtuberculose-010}
- Gestante com tuberculose: **RHZE de imediato**. {q-didepm-081}` },
        { id: "tra-adversos", titulo: "Efeitos adversos e hepatotoxicidade", conferir: false, diretrizes: ["ms-tb"],
          questoes: ["q-inf-15", "q-scmsp2022-079", "q-fmabc2026-007", "q-adap25-082", "q-usprp2021-103", "q-gdtuberculose-028", "q-gdtuberculose-083", "q-gdtuberculose-093", "q-gdtuberculose-106", "q-gdtuberculose-117", "q-gdtuberculose-118", "q-gdtuberculose-124", "q-gdtuberculose-126", "q-gdtuberculose-127", "q-gdtuberculose-144", "q-gdtuberculose-148", "q-gdtuberculose-153", "q-gdtuberculose-154", "q-gdtuberculose-162", "q-gdtuberculose-163", "q-gdtuberculose-171", "q-gdtuberculose-176", "q-gdtuberculose-180", "q-gdtuberculose-181", "q-gdtuberculose-182"],
          prosa: `Cada droga tem seu efeito típico: isoniazida no nervo (neuropatia, prevenida com piridoxina, e sintomas do sistema nervoso central), pirazinamida no ácido úrico, etambutol no nervo óptico, rifampicina nas secreções avermelhadas e nas interações. Isoniazida, rifampicina e pirazinamida lesam o fígado, a pirazinamida mais. Os efeitos menores (náusea, epigastralgia) se manejam sem parar o esquema.`,
          texto: `- Visão turva e cores: **etambutol**. {q-inf-15,q-gdtuberculose-127,q-gdtuberculose-176}
- Neuropatia: **isoniazida**, prevenir com **vitamina B6** (também antídoto da intoxicação). {q-scmsp2022-079,q-gdtuberculose-028,q-gdtuberculose-083,q-gdtuberculose-144}
- Isoniazida no SNC: cefaleia, euforia, insônia, **convulsão**. {q-fmabc2026-007,q-gdtuberculose-117,q-gdtuberculose-118}
- Rifampicina: **urina avermelhada**; pirazinamida: **hiperuricemia e artralgia**. {q-gdtuberculose-148,q-gdtuberculose-171,q-gdtuberculose-182}
- Mais hepatotóxica: **pirazinamida**. {q-gdtuberculose-126}
- Suspender se **> 3× com sintomas ou icterícia**, **> 5× sem sintomas**; reintroduzir uma a uma. {q-adap25-082,q-usprp2021-103,q-gdtuberculose-093,q-gdtuberculose-180}
- Náusea e epigastralgia sem icterícia: **mudar o horário**, sintomáticos. {q-gdtuberculose-162}` },
      ],
    },
    {
      id: "iltb", titulo: "Infec\u00e7\u00e3o latente e contatos",
      introducao: `[[Na infecção latente não há doença nem transmissão, mas o bacilo vivo pode reativar; trata-se quem tem prova tuberculínica ≥ 5 mm ou IGRA positivo e risco de adoecer (contatos, HIV, imunossupressão, anti-TNF), sempre depois de excluir tuberculose ativa com clínica e radiografia.|q-inf-16,q-fmabc2021-035,q-unicamp2022-001,q-unifesp2026-036]] [[O IGRA não sofre interferência da BCG; os esquemas são isoniazida por 6 a 9 meses, rifampicina por 4 meses ou isoniazida com rifapentina por 3 meses.|q-sirio2024-055,q-gdtuberculose-156,q-gdtuberculose-042]] [[Contato com PT negativa repete a prova em 8 semanas, para pegar a conversão.|q-gdtuberculose-119,q-einstein2027-041]]`,
      fragmentos: [
        { id: "ilt-pontos", titulo: "Infec\u00e7\u00e3o latente e contatos", conferir: false, diretrizes: ["ms-tb"],
          figuras: [{ arquivo: "figuras/contato.svg", legenda: "Esquema autoral: a investigação do contato de tuberculose pulmonar." }],
          questoes: ["q-inf-16", "q-unifesp2026-036", "q-fmabc2021-035", "q-unicamp2022-001", "q-fmabc2022-056", "q-sirio2024-055", "q-einstein2026-070", "q-gdtuberculose-002", "q-gdtuberculose-005", "q-gdtuberculose-019", "q-gdtuberculose-056", "q-gdtuberculose-057", "q-gdtuberculose-094", "q-gdtuberculose-102"],
          texto: `- Contato com **PT ≥ 5 mm** ou IGRA +: infecção latente. {q-inf-16,q-einstein2026-070}
- PT 10–22 mm com radiografia normal: **isoniazida** (ou rifampicina 4 meses). {q-fmabc2021-035,q-unicamp2022-001}
- Antes de imunossupressor: **PT ou IGRA**. {q-unifesp2026-036}
- IGRA: **sem interferência da BCG**. {q-sirio2024-055}` },
        { id: "ilt-quem", titulo: "Quem tratar e como", conferir: false, diretrizes: ["ms-tb"],
          questoes: ["q-scmsp2023-008", "q-gdtuberculose-120", "q-gdtuberculose-097", "q-gdtuberculose-099", "q-gdtuberculose-042", "q-gdtuberculose-156", "q-gdtuberculose-139", "q-gdtuberculose-155", "q-gdtuberculose-064", "q-gdtuberculose-133", "q-gdtuberculose-146", "q-gdtuberculose-151", "q-gdtuberculose-152"],
          prosa: `A infecção latente é tratada em quem tem mais risco de adoecer: contatos recentes, pessoas com HIV, quem vai usar imunossupressor (anti-TNF, corticoide em dose alta), transplantados e profissionais de saúde que convertem a prova. Quimioprofilaxia primária é dar isoniazida a quem ainda não se infectou (o recém-nascido de mãe bacilífera); secundária é tratar quem já está infectado.`,
          texto: `- Antes de anti-TNF: **PT ou IGRA**; positivo, **isoniazida (+ B6)** por 6 meses, começando antes. {q-scmsp2023-008,q-gdtuberculose-120}
- Primária = não infectado (RN); secundária = já infectado. {q-gdtuberculose-097,q-gdtuberculose-099}
- Rifampicina por **4 meses** é alternativa. {q-gdtuberculose-042,q-gdtuberculose-156}
- Falso-negativo da PT: técnica, **imunossupressão**, gestação. {q-gdtuberculose-139,q-gdtuberculose-155}` },
      ],
    },
    {
      id: "hiv", titulo: "Tuberculose e HIV",
      introducao: `[[A tuberculose é a principal causa de morte na pessoa com HIV: todo doente com tuberculose faz teste de HIV, e toda pessoa com HIV sem doença ativa e com PT ≥ 5 mm (ou CD4 ≤ 350, ou contato) trata a infecção latente.|q-gdtuberculose-017,q-usprp2023-048,q-uspsp4-074,q-tp20251-010,q-tp20252-088]] [[Com tuberculose ativa, o antirretroviral começa em até 2 semanas se o CD4 está abaixo de 50, e em torno de 8 semanas nos demais (na meníngea, adiado); a rifampicina interage com inibidores de protease, e o dolutegravir é dobrado.|q-adap26-036,q-sessp2023-074,q-gdtuberculose-041,q-gdtuberculose-048]]`,
      fragmentos: [
        { id: "hiv-pontos", titulo: "Tuberculose e HIV", conferir: false, diretrizes: ["ms-tb"],
          questoes: ["q-adap26-036", "q-sessp2023-074", "q-usprp2023-048", "q-uspsp4-074", "q-tp20251-010", "q-tp20252-088", "q-tp20261-059", "q-gdtuberculose-008", "q-gdtuberculose-016", "q-gdtuberculose-017", "q-gdtuberculose-041", "q-gdtuberculose-046", "q-gdtuberculose-047", "q-gdtuberculose-048", "q-gdtuberculose-052", "q-gdtuberculose-077", "q-gdtuberculose-081", "q-gdtuberculose-090", "q-gdtuberculose-131", "q-gdtuberculose-134", "q-gdtuberculose-147"],
          texto: `- Todo caso de TB: **teste de HIV**. {q-gdtuberculose-017}
- HIV com PT ≥ 5 mm e radiografia normal: **isoniazida** (ou 3HP). {q-usprp2023-048,q-uspsp4-074,q-tp20251-010,q-tp20252-088}
- CD4 < 50: TARV **em até 2 semanas**. {q-adap26-036}
- CD4 maior: RHZE já e **TARV após cerca de 8 semanas**. {q-sessp2023-074}
- Interação: **rifampicina e atazanavir**. {q-gdtuberculose-041}
- Com HIV o esquema e a **duração são os mesmos** (6 meses). {q-gdtuberculose-016}
- Rifampicina interage com **inibidores de protease** (citocromo P450); a rifabutina a substitui. {q-gdtuberculose-131,q-gdtuberculose-041}
- Questões mais antigas dão TARV **30 dias** após o início do tratamento; hoje é até 2 semanas com CD4 < 50 e em torno de 8 semanas nos demais. {q-gdtuberculose-134,q-gdtuberculose-147}` },
      ],
    },
    {
      id: "crianca", titulo: "Tuberculose na crian\u00e7a e BCG",
      introducao: `[[A criança raramente é bacilífera e quase nunca escarra: o diagnóstico usa o escore do Ministério da Saúde (clínica, radiografia, contato, PT e estado nutricional), e com 40 pontos ou mais trata-se; abaixo de 10 anos o esquema é RHZ, sem etambutol.|q-unesp2022-013,q-fmabc2021-083,q-einstein2023-065,q-sirio2022-042,q-gdtuberculose-006]] [[No lactente, o material é o lavado gástrico, que recolhe o escarro engolido.|q-unicamp2022-044,q-uspsp1-009]]

[[A criança contato de bacilífero faz PT e radiografia; com PT ≥ 5 mm e sem doença, trata infecção latente. O recém-nascido de mãe bacilífera não recebe BCG: faz isoniazida (ou rifampicina) por 3 meses, PT, e só então BCG se negativa; a mãe amamenta de máscara.|q-adap21-103,q-einstein2022-033,q-einstein2023-042,q-famema2021-085,q-gdtuberculose-045,q-gdtuberculose-065]]`,
      fragmentos: [
        { id: "cri-pontos", titulo: "Diagnóstico e tratamento na criança", conferir: false, diretrizes: ["ms-tb"],
          questoes: ["q-unesp2022-013", "q-fmabc2021-083", "q-einstein2023-065", "q-sirio2022-042", "q-iamspe2025-077", "q-unicamp2022-044", "q-uspsp1-009", "q-unesp2025-015", "q-tp20232-042", "q-tp20261-111", "q-famerp2026-042", "q-unesp2025-081", "q-gdtuberculose-006", "q-gdtuberculose-033", "q-gdtuberculose-051", "q-gdtuberculose-069", "q-gdtuberculose-071", "q-gdtuberculose-073", "q-gdtuberculose-074", "q-gdtuberculose-110", "q-gdtuberculose-122", "q-gdtuberculose-157", "q-gdtuberculose-165", "q-gdtuberculose-166"],
          texto: `- Escore **≥ 40**: tuberculose muito provável, tratar. {q-fmabc2021-083,q-gdtuberculose-006}
- Estado nutricional entra no escore. {q-unesp2022-013}
- < 10 anos: **RHZ 2 meses + RH 4 meses**. {q-einstein2023-065,q-sirio2022-042}
- Lactente: **lavado gástrico**. {q-unicamp2022-044,q-uspsp1-009}` },
        { id: "cri-contato", titulo: "Crian\u00e7a contato, rec\u00e9m-nascido e BCG", conferir: false, diretrizes: ["ms-tb"],
          questoes: ["q-adap21-103", "q-unifesp2025-082", "q-usp2024-082", "q-famema2021-085", "q-sessp2026-048", "q-uspsp2-112", "q-einstein2022-033", "q-einstein2023-042", "q-einstein2027-041", "q-einstein2022-035", "q-usprp2024-012", "q-gdtuberculose-001", "q-gdtuberculose-011", "q-gdtuberculose-013", "q-gdtuberculose-027", "q-gdtuberculose-045", "q-gdtuberculose-050", "q-gdtuberculose-063", "q-gdtuberculose-065", "q-gdtuberculose-066", "q-gdtuberculose-072", "q-gdtuberculose-091", "q-gdtuberculose-105", "q-gdtuberculose-108", "q-gdtuberculose-109", "q-gdtuberculose-113", "q-gdtuberculose-114", "q-gdtuberculose-119", "q-gdtuberculose-129"],
          prosa: `O recém-nascido de mãe bacilífera não recebe BCG: o bacilo vacinal seria inútil diante da exposição, e ele faz isoniazida (quimioprofilaxia primária); se a prova depois for negativa, vacina-se. A criança contato faz radiografia e prova tuberculínica; com PT de 5 mm ou mais e sem doença, trata a infecção latente.`,
          texto: `- Contato: **PT e radiografia**; PT ≥ 5 mm sem doença: **tratar ILTB**. {q-einstein2022-033,q-einstein2023-042,q-adap21-103,q-famema2021-085,q-gdtuberculose-011,q-gdtuberculose-113,q-gdtuberculose-114}
- PT < 5 mm: **repetir em 8 semanas**. {q-einstein2027-041,q-gdtuberculose-119}
- RN de mãe bacilífera: **isoniazida 10 mg/kg (ou rifampicina) por 3 meses**, sem BCG; amamenta com máscara (Nota Informativa 4/2024). {q-gdtuberculose-045,q-gdtuberculose-065,q-gdtuberculose-091}
- PT do RN aos 3 meses ≥ 5 mm: **completar 6 meses** e vacinar depois. {q-gdtuberculose-066}
- Mãe em tratamento com escarro negativo: **amamentação sem restrição**. {q-gdtuberculose-050}
- BCG: a partir de **2 kg**; protege das formas graves. {q-gdtuberculose-072,q-gdtuberculose-108}
- Lesão local da BCG: **isoniazida** até resolver. {q-einstein2022-035}` },
      ],
    },
    {
      id: "extra", titulo: "Formas extrapulmonares",
      introducao: `[[A forma extrapulmonar mais comum no adulto HIV negativo é a pleural: derrame unilateral, exsudato linfocítico com ADA alta (acima de 40), bacilo raro no líquido; a biópsia pleural com cultura é o padrão-ouro, mas ADA alta em área endêmica já autoriza tratar.|q-tp20212-075,q-famerp2022-054,q-einstein2027-011,q-gdtuberculose-128]] [[A meningoencefálica pede fase de manutenção longa com corticoide; a ganglionar, forma extrapulmonar mais comum na criança e frequente no HIV, atinge linfonodos cervicais e supraclaviculares; a miliar espalha micronódulos difusos; a peritoneal dá ascite linfocítica com ADA alta.|q-gdtuberculose-177,q-gdtuberculose-026,q-fmabc2024-087,q-usp2025-075,q-gdtuberculose-175]]`,
      fragmentos: [
        { id: "ext-pontos", titulo: "Tuberculose pleural", conferir: false, diretrizes: ["ms-tb"],
          casos: ["q-famerp2022-054"],
          questoes: ["q-tp20212-075", "q-famerp2022-054", "q-einstein2027-011", "q-unicampdis2024-065", "q-gdtuberculose-023", "q-gdtuberculose-058", "q-gdtuberculose-179"],
          texto: `- Pleural: **exsudato linfocítico, ADA alta**; tratar com RHZE. {q-tp20212-075,q-famerp2022-054}
- Padrão-ouro: **biópsia pleural com cultura**. {q-einstein2027-011}` },
        { id: "ext-outras", titulo: "Men\u00edngea, miliar, ganglionar, \u00f3ssea, renal, abdominal e peric\u00e1rdica", conferir: false, diretrizes: ["ms-tb"],
          questoes: ["q-famerp2024-057", "q-fmabc2024-087", "q-usp2025-075", "q-scmsp2026-027", "q-gdtuberculose-026", "q-gdtuberculose-038", "q-gdtuberculose-059", "q-gdtuberculose-085", "q-gdtuberculose-086", "q-gdtuberculose-089", "q-gdtuberculose-128", "q-gdtuberculose-132", "q-gdtuberculose-145", "q-gdtuberculose-149", "q-gdtuberculose-150", "q-gdtuberculose-167", "q-gdtuberculose-175", "q-gdtuberculose-177"],
          prosa: `A disseminação pelo sangue na primoinfecção semeia bacilos em vários órgãos, que reativam anos depois. O líquido de qualquer serosa (pleura, peritônio, pericárdio) tem o mesmo padrão: exsudato linfocítico com ADA alta. Na meníngea e na osteoarticular a manutenção é prolongada, e o corticoide reduz sequelas da meníngea e da pericárdica.`,
          texto: `- Meníngea: **2RHZE + RH prolongado e corticoide** (o manual de 2019 dá 10 meses de RH; questões antigas dão 7). {q-gdtuberculose-175,q-gdtuberculose-177,q-gdtuberculose-132}
- Extrapulmonar mais comum na criança: **ganglionar**. {q-gdtuberculose-026}
- Osso: **coluna vertebral** (Pott). {q-gdtuberculose-038}
- Rim: **piúria com cultura comum negativa**; cultura de urina para BK. {q-gdtuberculose-089,q-gdtuberculose-150}
- Intestino: **delgado (íleo)**; transplantado com lesão intestinal. {q-scmsp2026-027,q-gdtuberculose-149}
- Pericárdio: **ADA alta** no exsudato; causa frequente de **pericardite constritiva**. {q-gdtuberculose-059,q-gdtuberculose-128}
- Ascite linfocítica: **ADA**. {q-usp2025-075}
- Micronódulos difusos: **miliar**. {q-fmabc2024-087}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `A tabela resume o capítulo de tratamento.`,
      fragmentos: [
        { id: "comp-drogas", titulo: "As quatro drogas do esquema básico", conferir: true,
          questoes: ["q-inf-15","q-fmabc2026-007","q-gdtuberculose-148","q-gdtuberculose-171"],
          prosa: `| Droga | Efeito adverso típico | Detalhe |
|---|---|---|
| Rifampicina | **urina e lágrima avermelhadas**, hepatite, interações | indutor enzimático (ARV, anticoncepcional) |
| Isoniazida | **neuropatia periférica**, hepatite, convulsão | prevenir com piridoxina (B6) |
| Pirazinamida | **hiperuricemia, artralgia**, hepatite | — |
| Etambutol | **neurite óptica** | fora do esquema abaixo de 10 anos |`,
          texto: `- Visão: **etambutol**. {q-inf-15}
- Convulsão: **isoniazida**. {q-fmabc2026-007}
- Hiperuricemia: **pirazinamida**. {q-gdtuberculose-148}
- Urina avermelhada: **rifampicina**. {q-gdtuberculose-171}` },
      ],
    },
  ],
});
