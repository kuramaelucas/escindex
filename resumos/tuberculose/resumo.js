/* resumos/tuberculose/resumo.js — resumo adaptativo de tuberculose: transmissão e controle, diagnóstico,
   tratamento e efeitos adversos, infecção latente e contatos, coinfecção com HIV, criança e BCG, formas
   extrapulmonares e tabela comparativa no fim. As 191 questões autorais foram ligadas por capítulo.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- tuberculose */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "tuberculose",
  titulo: "Tuberculose",
  assunto: "ass-tuberculose",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "ms-tb", texto: "Ministério da Saúde — Manual de Recomendações para o Controle da Tuberculose no Brasil (2ª ed., 2019, e notas técnicas posteriores sobre ILTB e esquemas)", lidoEm: null },
    { id: "oms-tb", texto: "OMS — Consolidated guidelines on tuberculosis (módulos de tratamento e prevenção, 2022–2025)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anuladas, sem reposição", questoes: ["q-gdtuberculose-004", "q-gdtuberculose-024", "q-gdtuberculose-043", "q-gdtuberculose-062", "q-gdtuberculose-067", "q-gdtuberculose-098", "q-gdtuberculose-101", "q-gdtuberculose-104", "q-gdtuberculose-164"] },
  ],
  doencas: [
    {
      id: "fisiopatologia", titulo: "Transmiss\u00e3o, patogenia e controle",
      introducao: `[[O *Mycobacterium tuberculosis* se transmite por aerossol do doente com tuberculose pulmonar ou laríngea bacilífera; o bacilo chega ao alvéolo, é fagocitado e, quando o macrófago não o destrói, forma-se o granuloma com necrose caseosa.|q-unesp2023-097,q-unicampdis2023-003]] [[Na maioria das pessoas o granuloma contém o bacilo para sempre (infecção latente); a primária progressiva aparece na criança e no imunodeprimido, e a pós-primária, por reativação, escava os ápices pulmonares.|q-gdtuberculose-002,q-gdtuberculose-130,q-gdtuberculose-111]]

[[O controle depende de achar e curar o bacilífero: busca do sintomático respiratório, tratamento diretamente observado, investigação de contatos e notificação; o abandono é o indicador de qualidade que mais pesa.|q-amrigs2023-090,q-usp2026-092,q-tp20222-119,q-tp20251-105]]`,
      fragmentos: [
        { id: "fis-pontos", titulo: "Transmiss\u00e3o, patogenia e controle", conferir: true, diretrizes: ["ms-tb"],
          questoes: ["q-amrigs2023-090", "q-unicampdis2023-003", "q-gdtuberculose-025", "q-gdtuberculose-032", "q-gdtuberculose-035", "q-gdtuberculose-059", "q-gdtuberculose-068", "q-gdtuberculose-075", "q-gdtuberculose-107", "q-gdtuberculose-130", "q-gdtuberculose-002", "q-gdtuberculose-111", "q-tp20222-119", "q-tp20251-105", "q-unesp2023-097", "q-usp2026-092"],
          texto: `- Necrose do granuloma: **caseosa**. {q-unesp2023-097}
- Abandono do tratamento: **indicador de qualidade da assistência**. {q-usp2026-092}
- Caso confirmado: **notificação semanal** compulsória. {q-tp20222-119}
- Equipe: **avaliar contatos** sintomáticos e assintomáticos. {q-tp20251-105}
- Controle na APS: busca ativa, TDO, adesão. {q-amrigs2023-090}` },
      ],
    },
    {
      id: "diagnostico", titulo: "Diagn\u00f3stico da tuberculose pulmonar",
      introducao: `[[Sintomático respiratório é quem tosse há 3 semanas ou mais (na população vulnerável, qualquer tempo de tosse): investiga-se com teste rápido molecular (TRM-TB), que também detecta resistência à rifampicina, ou baciloscopia, e cultura com teste de sensibilidade.|q-sirio2022-097,q-adap24-018,q-famerp2025-048,q-iamspe2025-093,q-uspsp2-011]] [[A prova tuberculínica não confirma doença ativa; a radiografia sugere (cavidade em ápice), mas nenhuma imagem é patognomônica.|q-amrigs2022-091,q-sessp2023-073,q-gdtuberculose-078]]`,
      fragmentos: [
        { id: "dia-pontos", titulo: "Diagn\u00f3stico da tuberculose pulmonar", conferir: true, diretrizes: ["ms-tb"],
          casos: ["q-uspsp2-011"],
          questoes: ["q-adap24-018", "q-sessp2023-073", "q-famerp2025-048", "q-uspsp2-011", "q-sirio2022-097", "q-gdtuberculose-020", "q-gdtuberculose-039", "q-gdtuberculose-076", "q-gdtuberculose-078", "q-gdtuberculose-092", "q-gdtuberculose-115", "q-gdtuberculose-136", "q-gdtuberculose-138", "q-gdtuberculose-158", "q-gdtuberculose-167", "q-gdtuberculose-174", "q-amrigs2022-091", "q-gdtuberculose-012", "q-iamspe2025-093"],
          texto: `- Sintomático respiratório: tosse **≥ 3 semanas**. {q-sirio2022-097,q-gdtuberculose-115}
- Exame de escolha: **TRM-TB** (ou baciloscopia). {q-adap24-018,q-famerp2025-048,q-iamspe2025-093}
- TRM-TB: casos novos de forma **pulmonar e laríngea**, em cerca de 2 horas. {q-gdtuberculose-012}
- Confirmam doença ativa: **TRM e cultura**, não a PT. {q-amrigs2022-091}
- Cavitação: **BAAR no escarro**. {q-sessp2023-073,q-uspsp2-011}
- Nenhuma imagem é **patognomônica**. {q-gdtuberculose-078}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento e efeitos adversos",
      introducao: `[[O esquema básico é 2 meses de rifampicina, isoniazida, pirazinamida e etambutol (RHZE) e 4 meses de rifampicina e isoniazida (RH), em comprimidos de dose fixa: várias drogas juntas evitam selecionar mutantes resistentes.|q-inf-14,q-gdtuberculose-100,q-gdtuberculose-010,q-gdtuberculose-047,q-einstein2021-007]] [[Os efeitos seguem a droga: isoniazida — neuropatia periférica (prevenida com piridoxina) e convulsão; pirazinamida — hiperuricemia e artralgia; etambutol — neurite óptica; rifampicina — urina avermelhada e interações; e as três primeiras, hepatite.|q-inf-15,q-scmsp2022-079,q-fmabc2026-007,q-gdtuberculose-148,q-gdtuberculose-171]]

[[Hepatotoxicidade com transaminases acima de 3 vezes com sintomas ou icterícia, ou acima de 5 vezes sem sintomas, obriga a suspender o esquema e reintroduzir as drogas uma a uma depois da normalização.|q-adap25-082,q-usprp2021-103,q-gdtuberculose-093,q-gdtuberculose-180]]`,
      fragmentos: [
        { id: "tra-pontos", titulo: "Tratamento e efeitos adversos", conferir: true, diretrizes: ["ms-tb"],
          questoes: ["q-inf-14", "q-inf-15", "q-adap25-082", "q-usp2025-074", "q-tp20212-101", "q-fmabc2026-007", "q-einstein2021-007", "q-gdtuberculose-021", "q-gdtuberculose-022", "q-gdtuberculose-028", "q-gdtuberculose-031", "q-gdtuberculose-036", "q-gdtuberculose-047", "q-gdtuberculose-053", "q-gdtuberculose-054", "q-gdtuberculose-061", "q-gdtuberculose-079", "q-gdtuberculose-080", "q-gdtuberculose-083", "q-gdtuberculose-087", "q-gdtuberculose-093", "q-gdtuberculose-096", "q-gdtuberculose-100", "q-gdtuberculose-106", "q-gdtuberculose-112", "q-gdtuberculose-117", "q-gdtuberculose-118", "q-gdtuberculose-121", "q-gdtuberculose-124", "q-gdtuberculose-125", "q-gdtuberculose-126", "q-gdtuberculose-127", "q-gdtuberculose-132", "q-gdtuberculose-137", "q-gdtuberculose-142", "q-gdtuberculose-144", "q-gdtuberculose-148", "q-gdtuberculose-153", "q-gdtuberculose-154", "q-gdtuberculose-157", "q-gdtuberculose-162", "q-gdtuberculose-172", "q-gdtuberculose-176", "q-gdtuberculose-178", "q-gdtuberculose-180", "q-gdtuberculose-181", "q-gdtuberculose-182", "q-gdantibioticos-115", "q-gdtuberculose-010", "q-gdtuberculose-171", "q-scmsp2022-079", "q-usprp2021-103"],
          texto: `- Básico: **2RHZE + 4RH**. {q-inf-14,q-gdtuberculose-100,q-einstein2021-007}
- Piora visual: **etambutol**. {q-inf-15,q-gdtuberculose-176}
- Neuropatia: **isoniazida**, prevenir com **vitamina B6**. {q-scmsp2022-079,q-gdtuberculose-028,q-gdtuberculose-144}
- Convulsão em uso de RHZE: suspender **isoniazida**. {q-fmabc2026-007}
- Pirazinamida: **hiperuricemia**. {q-gdtuberculose-148,q-gdtuberculose-182}
- Rifampicina: **urina avermelhada**. {q-gdtuberculose-171}
- Icterícia ou dor em hipocôndrio: **suspender RHZE e dosar transaminases**. {q-usprp2021-103,q-adap25-082}
- Suspender se **> 3× com sintomas** ou icterícia, **> 5× sem sintomas**. {q-gdtuberculose-093,q-gdtuberculose-180}
- Morador de rua: **TDO** pelo consultório na rua. {q-tp20212-101}` },
      ],
    },
    {
      id: "iltb", titulo: "Infec\u00e7\u00e3o latente e contatos",
      introducao: `[[Na infecção latente não há doença nem transmissão, mas o bacilo vivo pode reativar; trata-se quem tem prova tuberculínica ≥ 5 mm ou IGRA positivo e risco de adoecer (contatos, HIV, imunossupressão, anti-TNF), sempre depois de excluir tuberculose ativa com clínica e radiografia.|q-inf-16,q-fmabc2021-035,q-unicamp2022-001,q-unifesp2026-036]] [[O IGRA não sofre interferência da BCG; os esquemas são isoniazida por 6 a 9 meses, rifampicina por 4 meses ou isoniazida com rifapentina por 3 meses.|q-sirio2024-055,q-gdtuberculose-156,q-gdtuberculose-042]] [[Contato com PT negativa repete a prova em 8 semanas, para pegar a conversão.|q-gdtuberculose-119,q-einstein2027-041]]`,
      fragmentos: [
        { id: "ilt-pontos", titulo: "Infec\u00e7\u00e3o latente e contatos", conferir: true, diretrizes: ["ms-tb"],
          figuras: [{ arquivo: "figuras/contato.svg", legenda: "Esquema autoral: a investigação do contato de tuberculose pulmonar." }],
          questoes: ["q-inf-16", "q-unifesp2026-036", "q-scmsp2025-100", "q-usprp2023-048", "q-amrigs2022-091", "q-iamspe2025-093", "q-tp20222-119", "q-tp20251-105", "q-tp20252-088", "q-unicamp2022-001", "q-uspsp2-112", "q-uspsp4-074", "q-fmabc2021-035", "q-einstein2026-070", "q-gdtuberculose-005", "q-gdtuberculose-008", "q-gdtuberculose-010", "q-gdtuberculose-015", "q-gdtuberculose-018", "q-gdtuberculose-034", "q-gdtuberculose-040", "q-gdtuberculose-042", "q-gdtuberculose-056", "q-gdtuberculose-060", "q-gdtuberculose-070", "q-gdtuberculose-081", "q-gdtuberculose-119", "q-gdtuberculose-120", "q-gdtuberculose-152", "q-gdtuberculose-155", "q-gdtuberculose-156", "q-gdtuberculose-159", "q-gdtuberculose-161", "q-einstein2027-041", "q-sirio2024-055"],
          texto: `- Contato com **PT ≥ 5 mm** ou IGRA +: infecção latente. {q-inf-16,q-einstein2026-070}
- PT 10–22 mm com radiografia normal: **isoniazida** (ou rifampicina 4 meses). {q-fmabc2021-035,q-unicamp2022-001,q-gdtuberculose-156}
- Antes de imunossupressor: **PT ou IGRA**. {q-unifesp2026-036}
- IGRA: **sem interferência da BCG**. {q-sirio2024-055}
- PT negativa no contato: **repetir em 8 semanas**. {q-gdtuberculose-119,q-einstein2027-041}` },
      ],
    },
    {
      id: "hiv", titulo: "Tuberculose e HIV",
      introducao: `[[A tuberculose é a principal causa de morte na pessoa com HIV: todo doente com tuberculose faz teste de HIV, e toda pessoa com HIV sem doença ativa e com PT ≥ 5 mm (ou CD4 ≤ 350, ou contato) trata a infecção latente.|q-gdtuberculose-017,q-usprp2023-048,q-uspsp4-074,q-tp20251-010,q-tp20252-088]] [[Com tuberculose ativa, o antirretroviral começa em até 2 semanas se o CD4 está abaixo de 50, e em torno de 8 semanas nos demais (na meníngea, adiado); a rifampicina interage com inibidores de protease, e o dolutegravir é dobrado.|q-adap26-036,q-sessp2023-074,q-gdtuberculose-041,q-gdtuberculose-048]]`,
      fragmentos: [
        { id: "hiv-pontos", titulo: "Tuberculose e HIV", conferir: true, diretrizes: ["ms-tb"],
          questoes: ["q-adap26-036", "q-scmsp2022-079", "q-usp2024-081", "q-usp2025-075", "q-usprp2021-103", "q-sessp2023-074", "q-tp20202-112", "q-unesp2024-097", "q-famerp2024-069", "q-fmabc2024-087", "q-didepm-081", "q-gdtuberculose-029", "q-gdtuberculose-041", "q-gdtuberculose-048", "q-gdtuberculose-052", "q-gdtuberculose-077", "q-gdtuberculose-088", "q-gdtuberculose-090", "q-gdtuberculose-103", "q-gdtuberculose-131", "q-gdtuberculose-134", "q-gdtuberculose-147", "q-gdtuberculose-168", "q-gdtuberculose-169", "q-gdtuberculose-170", "q-gdtuberculose-177", "q-gdtuberculose-017", "q-tp20251-010", "q-tp20252-088", "q-usprp2023-048", "q-uspsp4-074"],
          texto: `- Todo caso de TB: **teste de HIV**. {q-gdtuberculose-017}
- HIV com PT ≥ 5 mm e radiografia normal: **isoniazida** (ou 3HP). {q-usprp2023-048,q-uspsp4-074,q-tp20251-010,q-tp20252-088}
- CD4 < 50: TARV **em até 2 semanas**. {q-adap26-036}
- CD4 maior: RHZE já e **TARV após cerca de 8 semanas**. {q-sessp2023-074}
- Interação: **rifampicina e atazanavir**. {q-gdtuberculose-041}
- Resistência à rifampicina no TRM: **novo TRM, cultura, referência**. {q-usp2024-081}` },
      ],
    },
    {
      id: "crianca", titulo: "Tuberculose na crian\u00e7a e BCG",
      introducao: `[[A criança raramente é bacilífera e quase nunca escarra: o diagnóstico usa o escore do Ministério da Saúde (clínica, radiografia, contato, PT e estado nutricional), e com 40 pontos ou mais trata-se; abaixo de 10 anos o esquema é RHZ, sem etambutol.|q-unesp2022-013,q-fmabc2021-083,q-einstein2023-065,q-sirio2022-042,q-gdtuberculose-006]] [[No lactente, o material é o lavado gástrico, que recolhe o escarro engolido.|q-unicamp2022-044,q-uspsp1-009]]

[[A criança contato de bacilífero faz PT e radiografia; com PT ≥ 5 mm e sem doença, trata infecção latente. O recém-nascido de mãe bacilífera não recebe BCG: faz isoniazida (ou rifampicina) por 3 meses, PT, e só então BCG se negativa; a mãe amamenta de máscara.|q-adap21-103,q-einstein2022-033,q-einstein2023-042,q-famema2021-085,q-gdtuberculose-045,q-gdtuberculose-065]]`,
      fragmentos: [
        { id: "cri-pontos", titulo: "Tuberculose na crian\u00e7a e BCG", conferir: true, diretrizes: ["ms-tb"],
          questoes: ["q-adap21-103", "q-unifesp2025-082", "q-usp2024-082", "q-usprp2023-045", "q-usprp2024-012", "q-famema2021-085", "q-sessp2026-048", "q-tp20251-010", "q-tp20261-059", "q-unesp2022-013", "q-unesp2025-015", "q-famerp2024-057", "q-unicamp2022-044", "q-uspsp1-009", "q-sirio2024-055", "q-sirio2022-042", "q-fmabc2021-083", "q-einstein2022-035", "q-einstein2023-042", "q-einstein2023-065", "q-einstein2027-041", "q-gdtuberculose-001", "q-gdtuberculose-002", "q-gdtuberculose-006", "q-gdtuberculose-009", "q-gdtuberculose-011", "q-gdtuberculose-013", "q-gdtuberculose-016", "q-gdtuberculose-019", "q-gdtuberculose-027", "q-gdtuberculose-030", "q-gdtuberculose-033", "q-gdtuberculose-037", "q-gdtuberculose-045", "q-gdtuberculose-050", "q-gdtuberculose-051", "q-gdtuberculose-055", "q-gdtuberculose-057", "q-gdtuberculose-063", "q-gdtuberculose-064", "q-gdtuberculose-065", "q-gdtuberculose-066", "q-gdtuberculose-071", "q-gdtuberculose-072", "q-gdtuberculose-073", "q-gdtuberculose-074", "q-gdtuberculose-082", "q-gdtuberculose-091", "q-gdtuberculose-097", "q-gdtuberculose-099", "q-gdtuberculose-102", "q-gdtuberculose-105", "q-gdtuberculose-108", "q-gdtuberculose-109", "q-gdtuberculose-113", "q-gdtuberculose-114", "q-gdtuberculose-129", "q-gdtuberculose-139", "q-gdtuberculose-140", "q-gdtuberculose-151", "q-gdtuberculose-166", "q-gdtuberculose-173", "q-einstein2022-033"],
          texto: `- Escore **≥ 40**: tuberculose muito provável, tratar. {q-fmabc2021-083,q-gdtuberculose-006}
- Estado nutricional entra no escore. {q-unesp2022-013}
- < 10 anos: **RHZ 2 meses + RH 4 meses**. {q-einstein2023-065,q-sirio2022-042}
- Lactente: **lavado gástrico**. {q-unicamp2022-044,q-uspsp1-009}
- Contato: **PT e radiografia**; PT ≥ 5 mm sem doença: ILTB. {q-einstein2022-033,q-einstein2023-042,q-adap21-103,q-famema2021-085}
- Neurotuberculose na criança: RHZE com corticoide. {q-famerp2024-057}
- Lesão local da BCG: **isoniazida** até resolver. {q-einstein2022-035}
- RN de mãe bacilífera: **isoniazida 3 meses**, amamentar com máscara. {q-gdtuberculose-045,q-gdtuberculose-065}` },
      ],
    },
    {
      id: "extra", titulo: "Formas extrapulmonares",
      introducao: `[[A forma extrapulmonar mais comum no adulto HIV negativo é a pleural: derrame unilateral, exsudato linfocítico com ADA alta (acima de 40), bacilo raro no líquido; a biópsia pleural com cultura é o padrão-ouro, mas ADA alta em área endêmica já autoriza tratar.|q-tp20212-075,q-famerp2022-054,q-einstein2027-011,q-gdtuberculose-128]] [[A meningoencefálica pede fase de manutenção longa com corticoide; a ganglionar, forma extrapulmonar mais comum na criança e frequente no HIV, atinge linfonodos cervicais e supraclaviculares; a miliar espalha micronódulos difusos; a peritoneal dá ascite linfocítica com ADA alta.|q-gdtuberculose-177,q-gdtuberculose-026,q-fmabc2024-087,q-usp2025-075,q-gdtuberculose-175]]`,
      fragmentos: [
        { id: "ext-pontos", titulo: "Formas extrapulmonares", conferir: true, diretrizes: ["ms-tb"],
          casos: ["q-famerp2022-054"],
          questoes: ["q-scmsp2023-008", "q-scmsp2026-027", "q-usp2026-092", "q-iamspe2025-077", "q-unesp2023-097", "q-tp20212-075", "q-tp20232-042", "q-tp20261-111", "q-unesp2025-081", "q-famerp2026-042", "q-famerp2022-054", "q-unicampdis2024-065", "q-simepm89-055", "q-fmabc2022-056", "q-einstein2022-033", "q-einstein2023-010", "q-einstein2027-011", "q-gdtuberculose-003", "q-gdtuberculose-007", "q-gdtuberculose-012", "q-gdtuberculose-014", "q-gdtuberculose-017", "q-gdtuberculose-023", "q-gdtuberculose-026", "q-gdtuberculose-038", "q-gdtuberculose-044", "q-gdtuberculose-046", "q-gdtuberculose-049", "q-gdtuberculose-058", "q-gdtuberculose-069", "q-gdtuberculose-084", "q-gdtuberculose-085", "q-gdtuberculose-086", "q-gdtuberculose-089", "q-gdtuberculose-094", "q-gdtuberculose-095", "q-gdtuberculose-110", "q-gdtuberculose-111", "q-gdtuberculose-116", "q-gdtuberculose-122", "q-gdtuberculose-123", "q-gdtuberculose-128", "q-gdtuberculose-133", "q-gdtuberculose-135", "q-gdtuberculose-141", "q-gdtuberculose-143", "q-gdtuberculose-145", "q-gdtuberculose-146", "q-gdtuberculose-149", "q-gdtuberculose-150", "q-gdtuberculose-160", "q-gdtuberculose-163", "q-gdtuberculose-165", "q-gdtuberculose-171", "q-gdtuberculose-175", "q-gdtuberculose-179", "q-fmabc2024-087", "q-gdtuberculose-177", "q-usp2025-075"],
          texto: `- Pleural: **exsudato linfocítico, ADA alta**; tratar com RHZE. {q-tp20212-075,q-famerp2022-054,q-gdtuberculose-128}
- Padrão-ouro: **biópsia pleural com cultura**. {q-einstein2027-011}
- Meníngea: **2RHZE + RH prolongado e corticoide** — o manual de 2019 dá **10 meses** de RH; questões mais antigas dão 7. {q-gdtuberculose-177,q-gdtuberculose-175}
- Extrapulmonar mais comum na criança: **ganglionar**. {q-gdtuberculose-026}
- Micronódulos difusos: **miliar**. {q-fmabc2024-087}
- Ascite linfocítica: **ADA** no líquido. {q-usp2025-075}
- Transplantado com lesão intestinal: **tuberculose intestinal**. {q-scmsp2026-027}` },
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
