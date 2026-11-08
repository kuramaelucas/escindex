/* ==========================================================================
   TAXONOMIA — as 5 grandes áreas, 41 especialidades e 237 assuntos
   ==========================================================================
   A árvore que classifica tudo na plataforma: área > especialidade > assunto.
   Toda questão e todo flashcard apontam para um `assuntoId` daqui, então este
   é o arquivo mais estruturante da pasta — sem ele, nada se classifica.
   Dá para editar pela própria plataforma, em Conteúdo > Especialidades e
   Assuntos; mexer aqui só é preciso para mudanças grandes.

   Este arquivo é CONTEÚDO, não código: ele só entrega dados para a
   plataforma. Quem carrega é a linha <script src="dados/taxonomia.js"></script>
   do index.html, que roda antes do código. Ver dados/LEIA-ME.md.
   ========================================================================== */
window.EscDados.registrarTaxonomia("taxonomia", {
  areas: [
    { id: "area-cm", nome: "Clínica Médica" },
    { id: "area-cg", nome: "Cirurgia Geral" },
    { id: "area-ped", nome: "Pediatria" },
    { id: "area-go", nome: "Ginecologia e Obstetrícia" },
    { id: "area-mps", nome: "Medicina Preventiva e Social" },
  ],
  especialidades: [
    { id: "esp-cardio", areaId: "area-cm", nome: "Cardiologia" },
    { id: "esp-pneumo", areaId: "area-cm", nome: "Pneumologia" },
    { id: "esp-gastro", areaId: "area-cm", nome: "Gastroenterologia" },
    { id: "esp-endocrino", areaId: "area-cm", nome: "Endocrinologia" },
    { id: "esp-infecto", areaId: "area-cm", nome: "Infectologia" },
    { id: "esp-nefro", areaId: "area-cm", nome: "Nefrologia" },
    { id: "esp-oftalmo", areaId: "area-cm", nome: "Oftalmologia" },
    /* especialidades acrescentadas em 19/09 para dar lugar às questões reais
       da UNIFESP (2022-2026) — a prova real de "Acesso Direto" cobre toda a
       medicina, não só as especialidades que já estavam aqui. */
    { id: "esp-neuro", areaId: "area-cm", nome: "Neurologia" },
    { id: "esp-psiquiatria", areaId: "area-cm", nome: "Psiquiatria" },
    { id: "esp-dermato", areaId: "area-cm", nome: "Dermatologia" },
    { id: "esp-reumato", areaId: "area-cm", nome: "Reumatologia" },
    { id: "esp-hemato", areaId: "area-cm", nome: "Hematologia" },
    { id: "esp-geriatria", areaId: "area-cm", nome: "Geriatria" },
    { id: "esp-genetica", areaId: "area-cm", nome: "Genética Médica" },
    { id: "esp-alergiaimuno", areaId: "area-cm", nome: "Alergia e Imunologia" },

    { id: "esp-abdagudo", areaId: "area-cg", nome: "Abdome Agudo" },
    { id: "esp-trauma", areaId: "area-cg", nome: "Trauma" },
    { id: "esp-perioperatorio", areaId: "area-cg", nome: "Pré e Pós-operatório" },
    { id: "esp-cirurgiaonco", areaId: "area-cg", nome: "Cirurgia Oncológica" },
    { id: "esp-toce", areaId: "area-cg", nome: "Técnica Operatória e Cirurgia Experimental" },
    { id: "esp-anestesio", areaId: "area-cg", nome: "Anestesiologia" },
    { id: "esp-cirvascular", areaId: "area-cg", nome: "Cirurgia Vascular" },
    { id: "esp-cirtoracica", areaId: "area-cg", nome: "Cirurgia Torácica" },
    { id: "esp-ortopedia", areaId: "area-cg", nome: "Ortopedia e Traumatologia" },
    { id: "esp-urologia", areaId: "area-cg", nome: "Urologia" },
    { id: "esp-neurocirurgia", areaId: "area-cg", nome: "Neurocirurgia" },
    { id: "esp-orl", areaId: "area-cg", nome: "Otorrinolaringologia" },

    { id: "esp-neonato", areaId: "area-ped", nome: "Neonatologia" },
    { id: "esp-crescdesenv", areaId: "area-ped", nome: "Crescimento e Desenvolvimento" },
    { id: "esp-infectoped", areaId: "area-ped", nome: "Infectologia Pediátrica" },
    { id: "esp-emergped", areaId: "area-ped", nome: "Emergências Pediátricas" },

    { id: "esp-obstetricia", areaId: "area-go", nome: "Obstetrícia" },
    { id: "esp-ginecologia", areaId: "area-go", nome: "Ginecologia Geral" },
    { id: "esp-planfamiliar", areaId: "area-go", nome: "Planejamento Familiar" },
    { id: "esp-oncogineco", areaId: "area-go", nome: "Oncologia Ginecológica" },

    { id: "esp-epidemio", areaId: "area-mps", nome: "Epidemiologia" },
    { id: "esp-sus", areaId: "area-mps", nome: "SUS e Políticas de Saúde" },
    { id: "esp-bioetica", areaId: "area-mps", nome: "Bioética" },
    { id: "esp-saudefamilia", areaId: "area-mps", nome: "Saúde da Família" },
    /* especialidades acrescentadas em 26/09 para classificar as provas da
       USP-SP (FMUSP) 2022-2026. */
    { id: "esp-emergencia", areaId: "area-cm", nome: "Medicina de Emergência" },
    { id: "esp-coloprocto", areaId: "area-cg", nome: "Coloproctologia" },
  ],
  assuntos: [
    { id: "ass-sca", especialidadeId: "esp-cardio", nome: "Doença Coronariana (Síndrome Coronariana Aguda e DAC Crônica)" },
    { id: "ass-ic", especialidadeId: "esp-cardio", nome: "Insuficiência Cardíaca" },
    { id: "ass-arritmias", especialidadeId: "esp-cardio", nome: "ECG, Arritmias e Síncope" },
    { id: "ass-has", especialidadeId: "esp-cardio", nome: "Hipertensão Arterial Sistêmica" },
    { id: "ass-valvopatias", especialidadeId: "esp-cardio", nome: "Valvopatias" },
    { id: "ass-pericardio", especialidadeId: "esp-cardio", nome: "Doenças do Pericárdio" },
    { id: "ass-pcr", especialidadeId: "esp-cardio", nome: "Parada Cardiorrespiratória e RCP" },
    { id: "ass-dislipidemia", especialidadeId: "esp-cardio", nome: "Dislipidemia e Risco Cardiovascular" },

    { id: "ass-dpoc", especialidadeId: "esp-pneumo", nome: "DPOC" },
    { id: "ass-asma", especialidadeId: "esp-pneumo", nome: "Asma e Rinite Alérgica" },
    { id: "ass-pneumonia", especialidadeId: "esp-pneumo", nome: "Pneumonia Adquirida na Comunidade" },
    { id: "ass-tep", especialidadeId: "esp-pneumo", nome: "Tromboembolismo Pulmonar e Hipertensão Pulmonar" },

    { id: "ass-drge", especialidadeId: "esp-gastro", nome: "DRGE e Distúrbios Motores do Esôfago (Acalasia)" },
    { id: "ass-doencapeptica", especialidadeId: "esp-gastro", nome: "Doença Péptica" },
    { id: "ass-hepatites", especialidadeId: "esp-gastro", nome: "Hepatites Virais e Autoimunes (inclui CBP e CEP)" },
    { id: "ass-cirrose", especialidadeId: "esp-gastro", nome: "Cirrose e Complicações" },

    { id: "ass-dm", especialidadeId: "esp-endocrino", nome: "Diabetes Mellitus" },
    { id: "ass-tireoide", especialidadeId: "esp-endocrino", nome: "Tireoidopatias" },
    { id: "ass-adrenal", especialidadeId: "esp-endocrino", nome: "Distúrbios Adrenais" },

    { id: "ass-hiv", especialidadeId: "esp-infecto", nome: "HIV/Aids" },
    { id: "ass-sepse", especialidadeId: "esp-infecto", nome: "Sepse" },
    { id: "ass-tuberculose", especialidadeId: "esp-infecto", nome: "Tuberculose" },
    { id: "ass-arboviroses", especialidadeId: "esp-infecto", nome: "Arboviroses" },
    { id: "ass-atb", especialidadeId: "esp-infecto", nome: "Antibioticoterapia e Resistência" },
    { id: "ass-itu", especialidadeId: "esp-infecto", nome: "Infecção do Trato Urinário" },
    { id: "ass-peleparte", especialidadeId: "esp-infecto", nome: "Infecções de Pele e Partes Moles" },
    { id: "ass-meningites", especialidadeId: "esp-infecto", nome: "Meningites" },
    { id: "ass-ist", especialidadeId: "esp-infecto", nome: "Infecções Sexualmente Transmissíveis (úlceras, corrimentos, sífilis)" },
    { id: "ass-leptospirose", especialidadeId: "esp-infecto", nome: "Leptospirose" },
    { id: "ass-neutropeniafebril", especialidadeId: "esp-infecto", nome: "Neutropenia Febril e Febre de Origem Indeterminada" },
    { id: "ass-micosesinvasivas", especialidadeId: "esp-infecto", nome: "Micoses Sistêmicas e Oportunistas (paracoccidioidomicose, candidíase, criptococose, aspergilose, histoplasmose, mucormicose)" },
    { id: "ass-endocardite", especialidadeId: "esp-infecto", nome: "Endocardite Infecciosa" },
    { id: "ass-imunizacao", especialidadeId: "esp-infecto", nome: "Imunização do Adulto" },
    { id: "ass-iras", especialidadeId: "esp-infecto", nome: "Infecções Relacionadas à Assistência (IRAS)" },

    { id: "ass-ira", especialidadeId: "esp-nefro", nome: "Injúria Renal Aguda" },
    { id: "ass-drc", especialidadeId: "esp-nefro", nome: "Doença Renal Crônica" },
    { id: "ass-hidroeletrolitico", especialidadeId: "esp-nefro", nome: "Distúrbios Hidroeletrolíticos" },

    { id: "ass-apendicite", especialidadeId: "esp-abdagudo", nome: "Apendicite Aguda" },
    { id: "ass-colecistite", especialidadeId: "esp-abdagudo", nome: "Colecistite Aguda" },
    { id: "ass-obstrucao", especialidadeId: "esp-abdagudo", nome: "Obstrução Intestinal" },
    { id: "ass-pancreatite", especialidadeId: "esp-abdagudo", nome: "Pancreatite Aguda" },

    { id: "ass-atls", especialidadeId: "esp-trauma", nome: "Atendimento Inicial ao Trauma (ATLS)" },
    { id: "ass-traumaabd", especialidadeId: "esp-trauma", nome: "Trauma Abdominal" },
    { id: "ass-queimaduras", especialidadeId: "esp-trauma", nome: "Queimaduras" },

    { id: "ass-cuidadosperi", especialidadeId: "esp-perioperatorio", nome: "Cuidados Perioperatórios" },
    { id: "ass-complicacoescir", especialidadeId: "esp-perioperatorio", nome: "Complicações Cirúrgicas" },

    { id: "ass-cagastrico", especialidadeId: "esp-cirurgiaonco", nome: "Câncer de Esôfago e Estômago" },
    { id: "ass-cacolorretal", especialidadeId: "esp-cirurgiaonco", nome: "Câncer Colorretal" },

    { id: "ass-ictericia", especialidadeId: "esp-neonato", nome: "Icterícia Neonatal" },
    { id: "ass-sepseneonatal", especialidadeId: "esp-neonato", nome: "Sepse Neonatal" },
    { id: "ass-reanimacao", especialidadeId: "esp-neonato", nome: "Reanimação Neonatal" },

    { id: "ass-puericultura", especialidadeId: "esp-crescdesenv", nome: "Puericultura" },
    { id: "ass-calendariovacinal", especialidadeId: "esp-crescdesenv", nome: "Calendário Vacinal" },

    { id: "ass-exantematicas", especialidadeId: "esp-infectoped", nome: "Doenças Infecciosas Imunopreveníveis da Infância (Exantemáticas, Coqueluche)" },
    { id: "ass-ivas", especialidadeId: "esp-infectoped", nome: "Infecções de Vias Aéreas Superiores" },
    { id: "ass-dda", especialidadeId: "esp-infectoped", nome: "Doença Diarreica Aguda e Desidratação" },

    { id: "ass-convulsaofebril", especialidadeId: "esp-emergped", nome: "Convulsão Febril" },

    { id: "ass-dheg", especialidadeId: "esp-obstetricia", nome: "Síndromes Hipertensivas da Gestação" },
    { id: "ass-dmg", especialidadeId: "esp-obstetricia", nome: "Diabetes Mellitus Gestacional" },
    { id: "ass-sangramentos", especialidadeId: "esp-obstetricia", nome: "Sangramentos na Gestação" },
    { id: "ass-trabalhoparto", especialidadeId: "esp-obstetricia", nome: "Trabalho de Parto" },

    { id: "ass-ciclomenstrual", especialidadeId: "esp-ginecologia", nome: "Ciclo Menstrual e Distúrbios" },
    { id: "ass-climaterio", especialidadeId: "esp-ginecologia", nome: "Climatério" },

    { id: "ass-contracepcao", especialidadeId: "esp-planfamiliar", nome: "Métodos Contraceptivos" },

    { id: "ass-cacolo", especialidadeId: "esp-oncogineco", nome: "Câncer de Colo do Útero" },
    { id: "ass-camama", especialidadeId: "esp-oncogineco", nome: "Câncer de Mama" },

    { id: "ass-medidasepi", especialidadeId: "esp-epidemio", nome: "Medidas de Frequência e Associação" },
    { id: "ass-desenhosestudo", especialidadeId: "esp-epidemio", nome: "Desenhos de Estudo Epidemiológico" },
    { id: "ass-vigilancia", especialidadeId: "esp-epidemio", nome: "Vigilância Epidemiológica" },

    { id: "ass-principiossus", especialidadeId: "esp-sus", nome: "Princípios e Diretrizes do SUS" },
    { id: "ass-niveisatencao", especialidadeId: "esp-sus", nome: "Níveis de Atenção à Saúde" },

    { id: "ass-principiosbioetica", especialidadeId: "esp-bioetica", nome: "Princípios Bioéticos" },

    { id: "ass-esf", especialidadeId: "esp-saudefamilia", nome: "Estratégia Saúde da Família" },

    /* Técnica Operatória — base de construção de conhecimento cirúrgico */
    { id: "ass-toce-instrumental", especialidadeId: "esp-toce", nome: "Instrumental, Hemostasia e Eletrocirurgia" },
    { id: "ass-toce-fios", especialidadeId: "esp-toce", nome: "Fios, Suturas e Cicatrização" },
    { id: "ass-toce-antissepsia", especialidadeId: "esp-toce", nome: "Antissepsia, Paramentação, Posicionamento e Biossegurança" },
    { id: "ass-toce-incisoes", especialidadeId: "esp-toce", nome: "Incisões, Vias de Acesso, Drenos e Curativos" },
    { id: "ass-toce-video", especialidadeId: "esp-toce", nome: "Princípios de Videolaparoscopia" },

    /* Oftalmologia */
    { id: "ass-oft-olhovermelho", especialidadeId: "esp-oftalmo", nome: "Olho Vermelho, Conjuntivites e Celulite Orbitária" },
    { id: "ass-oft-glaucoma", especialidadeId: "esp-oftalmo", nome: "Glaucoma" },
    { id: "ass-oft-catarata", especialidadeId: "esp-oftalmo", nome: "Catarata, Leucocoria e Tumores Intraoculares" },
    { id: "ass-oft-retina", especialidadeId: "esp-oftalmo", nome: "Retina e Perda Visual" },
    { id: "ass-oft-trauma", especialidadeId: "esp-oftalmo", nome: "Trauma e Urgências Oculares" },
    { id: "ass-oft-refracao", especialidadeId: "esp-oftalmo", nome: "Ametropias e Refração" },

    /* Especialidades novas de 19/09 — abertas para receber as questões reais
       da UNIFESP (2022-2026), cujo "Acesso Direto" cobre toda a medicina. */
    { id: "ass-neuro-avc", especialidadeId: "esp-neuro", nome: "Acidente Vascular Cerebral" },
    { id: "ass-neuro-cefaleias", especialidadeId: "esp-neuro", nome: "Cefaleias" },
    { id: "ass-neuro-epilepsia", especialidadeId: "esp-neuro", nome: "Epilepsia e Crises Convulsivas" },
    { id: "ass-neuro-neuromuscular", especialidadeId: "esp-neuro", nome: "Doenças Neuromusculares, Desmielinizantes e Medulares" },
    { id: "ass-neuro-movimento", especialidadeId: "esp-neuro", nome: "Distúrbios do Movimento" },
    { id: "ass-neuro-vertigem", especialidadeId: "esp-neuro", nome: "Tontura e Vertigem (periférica e central)" },

    { id: "ass-psiq-humor", especialidadeId: "esp-psiquiatria", nome: "Transtornos do Humor" },
    { id: "ass-psiq-psicoses", especialidadeId: "esp-psiquiatria", nome: "Psicoses e Esquizofrenia" },
    { id: "ass-psiq-substancias", especialidadeId: "esp-psiquiatria", nome: "Transtornos por Uso de Substâncias" },
    { id: "ass-psiq-infantil", especialidadeId: "esp-psiquiatria", nome: "Psiquiatria da Infância (TDAH e Transtornos do Neurodesenvolvimento)" },

    { id: "ass-derm-tumores", especialidadeId: "esp-dermato", nome: "Tumores Cutâneos" },
    { id: "ass-derm-farmacodermias", especialidadeId: "esp-dermato", nome: "Farmacodermias" },
    { id: "ass-derm-infeccoes", especialidadeId: "esp-dermato", nome: "Infecções e Infestações de Pele" },
    { id: "ass-derm-autoimunes", especialidadeId: "esp-dermato", nome: "Dermatoses Inflamatórias e Autoimunes (inclui Acne)" },

    { id: "ass-reumato-artrites", especialidadeId: "esp-reumato", nome: "Artrite Reumatoide e Espondiloartrites" },
    { id: "ass-reumato-les", especialidadeId: "esp-reumato", nome: "Lúpus e Outras Conectivopatias (inclui Esclerose Sistêmica)" },
    { id: "ass-reumato-cristais", especialidadeId: "esp-reumato", nome: "Artrites por Cristais (Gota e Pseudogota)" },
    { id: "ass-reumato-vasculites", especialidadeId: "esp-reumato", nome: "Vasculites e Outras Conectivopatias" },

    { id: "ass-hemato-anemias", especialidadeId: "esp-hemato", nome: "Anemias" },
    { id: "ass-hemato-neoplasias", especialidadeId: "esp-hemato", nome: "Neoplasias Hematológicas" },
    { id: "ass-hemato-hemostasia", especialidadeId: "esp-hemato", nome: "Distúrbios da Hemostasia" },

    { id: "ass-geriatria-quedas", especialidadeId: "esp-geriatria", nome: "Fragilidade, Quedas e Perda de Peso" },
    { id: "ass-geriatria-demencia", especialidadeId: "esp-geriatria", nome: "Demência e Delirium" },
    { id: "ass-geriatria-polifarmacia", especialidadeId: "esp-geriatria", nome: "Polifarmácia no Idoso" },

    { id: "ass-genetica-heranca", especialidadeId: "esp-genetica", nome: "Padrões de Herança Genética" },
    { id: "ass-genetica-sindromes", especialidadeId: "esp-genetica", nome: "Síndromes Genéticas e Teratógenos" },

    { id: "ass-anestesio-viaaerea", especialidadeId: "esp-anestesio", nome: "Via Aérea e Indução Anestésica" },
    { id: "ass-anestesio-complicacoes", especialidadeId: "esp-anestesio", nome: "Complicações Anestésicas" },
    { id: "ass-anestesio-analgesia", especialidadeId: "esp-anestesio", nome: "Anestesia Regional e Analgesia" },

    { id: "ass-cirvasc-aneurisma", especialidadeId: "esp-cirvascular", nome: "Aneurisma de Aorta" },
    { id: "ass-cirvasc-arterial", especialidadeId: "esp-cirvascular", nome: "Isquemia Arterial Aguda e Crônica" },
    { id: "ass-cirvasc-venosa", especialidadeId: "esp-cirvascular", nome: "Doença Venosa (TVP e Varizes)" },

    { id: "ass-cirtorax-pleura", especialidadeId: "esp-cirtoracica", nome: "Pneumotórax e Doenças Pleurais" },
    { id: "ass-cirtorax-neoplasia", especialidadeId: "esp-cirtoracica", nome: "Neoplasia Pulmonar Cirúrgica" },

    { id: "ass-orto-fraturas", especialidadeId: "esp-ortopedia", nome: "Fraturas e Luxações" },
    { id: "ass-orto-osteometabolicas", especialidadeId: "esp-ortopedia", nome: "Doenças Osteometabólicas e Displasias" },
    { id: "ass-orto-pediatrica", especialidadeId: "esp-ortopedia", nome: "Ortopedia Pediátrica" },

    { id: "ass-uro-litiase", especialidadeId: "esp-urologia", nome: "Litíase Urinária" },
    { id: "ass-uro-prostata", especialidadeId: "esp-urologia", nome: "Próstata (HPB e Câncer)" },
    { id: "ass-uro-escroto", especialidadeId: "esp-urologia", nome: "Genitália Masculina e Disfunção Sexual" },

    { id: "ass-neurocir-tce", especialidadeId: "esp-neurocirurgia", nome: "Traumatismo Cranioencefálico" },
    { id: "ass-neurocir-tumores", especialidadeId: "esp-neurocirurgia", nome: "Tumores do Sistema Nervoso Central" },

    { id: "ass-orl-fratura", especialidadeId: "esp-orl", nome: "Trauma Nasal e Facial" },
    { id: "ass-orl-viasaereas", especialidadeId: "esp-orl", nome: "Vias Aéreas Superiores e Sono" },

    { id: "ass-alergia-anafilaxia", especialidadeId: "esp-alergiaimuno", nome: "Anafilaxia e Reações Alérgicas Graves" },

    /* Assuntos avulsos acrescentados durante a classificação das questões
       reais da UNIFESP (19/09) — cobrem lacunas pontuais das especialidades
       já existentes, identificadas questão a questão. */
    { id: "ass-diverticulite", especialidadeId: "esp-abdagudo", nome: "Doença Diverticular" },
    { id: "ass-hernias", especialidadeId: "esp-abdagudo", nome: "Hérnias da Parede Abdominal" },
    { id: "ass-uro-malformacoes", especialidadeId: "esp-urologia", nome: "Malformações do Trato Urinário" },
    { id: "ass-pneumo-bronquiectasias", especialidadeId: "esp-pneumo", nome: "Bronquiectasias" },
    { id: "ass-caovario", especialidadeId: "esp-oncogineco", nome: "Câncer de Ovário" },
    { id: "ass-uroginecologia", especialidadeId: "esp-ginecologia", nome: "Incontinência Urinária e Prolapso Genital" },
    { id: "ass-miomatose", especialidadeId: "esp-ginecologia", nome: "Miomatose Uterina" },
    { id: "ass-prenatal", especialidadeId: "esp-obstetricia", nome: "Assistência Pré-natal" },
    { id: "ass-abortamento", especialidadeId: "esp-obstetricia", nome: "Abortamento" },
    { id: "ass-prevencao", especialidadeId: "esp-epidemio", nome: "Níveis e Estratégias de Prevenção" },
    { id: "ass-bioestatistica", especialidadeId: "esp-epidemio", nome: "Bioestatística e Testes de Hipótese" },
    { id: "ass-cuidadospaliativos", especialidadeId: "esp-bioetica", nome: "Cuidados Paliativos e Fim de Vida" },
    { id: "ass-comunicacaoclinica", especialidadeId: "esp-bioetica", nome: "Comunicação e Relação Médico-Paciente" },
    { id: "ass-orto-infeccoes", especialidadeId: "esp-ortopedia", nome: "Infecções Osteoarticulares" },
    { id: "ass-reumato-febrereumatica", especialidadeId: "esp-reumato", nome: "Febre Reumática" },
    { id: "ass-emergped-maustratos", especialidadeId: "esp-emergped", nome: "Suspeita de Maus-tratos Infantis" },
    { id: "ass-oncopediatrica", especialidadeId: "esp-cirurgiaonco", nome: "Tumores Sólidos da Infância" },
    { id: "ass-emergped-respiratoria", especialidadeId: "esp-emergped", nome: "Insuficiência Respiratória e PCR em Pediatria" },
    { id: "ass-gastro-constipacao", especialidadeId: "esp-gastro", nome: "Constipação Intestinal" },
    { id: "ass-nefro-glomerulopatias", especialidadeId: "esp-nefro", nome: "Síndromes Glomerulares" },
    { id: "ass-infecto-covid", especialidadeId: "esp-infecto", nome: "Síndromes Gripais: Influenza, SRAG e Covid-19" },

    /* Segunda leva de assuntos avulsos, identificados classificando a prova
       de 2023. */
    { id: "ass-saudepopulacoes", especialidadeId: "esp-saudefamilia", nome: "Saúde de Populações Específicas (indígena, negra, situação de rua)" },
    { id: "ass-farmacovigilancia", especialidadeId: "esp-sus", nome: "Política de Medicamentos e Tecnologias (CONITEC, Notificação de Receita)" },
    { id: "ass-saudetrabalhador", especialidadeId: "esp-saudefamilia", nome: "Saúde do Trabalhador" },
    { id: "ass-ginecoinfantil", especialidadeId: "esp-ginecologia", nome: "Ginecologia da Infância e Adolescência" },
    { id: "ass-caendometrio", especialidadeId: "esp-oncogineco", nome: "Câncer de Endométrio" },
    { id: "ass-neo-prematuridade", especialidadeId: "esp-neonato", nome: "Complicações da Prematuridade e Distúrbios Metabólicos do RN" },
    { id: "ass-imunodeficiencias", especialidadeId: "esp-alergiaimuno", nome: "Imunodeficiências Primárias" },
    { id: "ass-uro-oncologia", especialidadeId: "esp-urologia", nome: "Neoplasias Urológicas" },
    { id: "ass-cironco-melanoma", especialidadeId: "esp-cirurgiaonco", nome: "Melanoma Cutâneo" },
    { id: "ass-neurocir-hidrocefalia", especialidadeId: "esp-neurocirurgia", nome: "Hidrocefalia" },

    /* Terceira leva de assuntos avulsos, identificados classificando a prova
       de 2024. */
    { id: "ass-colangite", especialidadeId: "esp-abdagudo", nome: "Colangite Aguda e Vias Biliares" },
    { id: "ass-cirbariatrica", especialidadeId: "esp-abdagudo", nome: "Cirurgia Bariátrica e Complicações" },
    { id: "ass-neurocir-plexobraquial", especialidadeId: "esp-neurocirurgia", nome: "Lesões do Plexo Braquial" },
    { id: "ass-vigilanciasanitaria", especialidadeId: "esp-epidemio", nome: "Vigilância Sanitária e Notificação Compulsória" },
    { id: "ass-infertilidade", especialidadeId: "esp-ginecologia", nome: "Infertilidade Conjugal" },
    { id: "ass-neo-infeccoescongenitas", especialidadeId: "esp-neonato", nome: "Infecções Perinatais (TORCHS, Sífilis Congênita, RN Exposto à Tuberculose)" },
    { id: "ass-neo-triagemneonatal", especialidadeId: "esp-neonato", nome: "Triagem Neonatal (Teste do Pezinho)" },
    { id: "ass-neo-descrresp", especialidadeId: "esp-neonato", nome: "Desconforto Respiratório do Recém-Nascido" },
    { id: "ass-infectoped-pneumonia", especialidadeId: "esp-infectoped", nome: "Infecções Respiratórias Baixas na Infância (Pneumonia, Bronquiolite)" },
    { id: "ass-orto-artrose", especialidadeId: "esp-ortopedia", nome: "Osteoartrite e Artroplastias" },
    { id: "ass-geriatria-maustratos", especialidadeId: "esp-geriatria", nome: "Violência e Maus-tratos contra o Idoso" },
    { id: "ass-dii", especialidadeId: "esp-gastro", nome: "Doença Inflamatória Intestinal" },
    { id: "ass-tabagismo", especialidadeId: "esp-saudefamilia", nome: "Cessação do Tabagismo" },
    { id: "ass-vm", especialidadeId: "esp-pneumo", nome: "Ventilação Mecânica Invasiva" },
    { id: "ass-crescimentopuberdade", especialidadeId: "esp-crescdesenv", nome: "Distúrbios do Crescimento e Puberdade" },
    { id: "ass-hemato-hemoglobinopatias", especialidadeId: "esp-hemato", nome: "Doença Falciforme e Hemoglobinopatias" },

    /* Quarta leva de assuntos avulsos, identificados classificando a prova
       de 2025. */
    { id: "ass-cirvasc-disseccao", especialidadeId: "esp-cirvascular", nome: "Dissecção de Aorta" },
    { id: "ass-neo-malformacoesdigestivas", especialidadeId: "esp-neonato", nome: "Abdome Agudo e Distensão Abdominal do RN (ECN, Atresias, Má-rotação, VACTERL)" },
    { id: "ass-cirtorax-viaaerea", especialidadeId: "esp-cirtoracica", nome: "Estenose Traqueal e Vias Aéreas Centrais" },
    { id: "ass-acessovenoso", especialidadeId: "esp-perioperatorio", nome: "Acesso Vascular Central e Complicações" },
    { id: "ass-paratireoide", especialidadeId: "esp-endocrino", nome: "Distúrbios do Cálcio e Paratireoide" },
    { id: "ass-hipofise", especialidadeId: "esp-endocrino", nome: "Doenças da Hipófise (Adenomas, Hipopituitarismo)" },
    { id: "ass-assistenciasocial", especialidadeId: "esp-saudefamilia", nome: "Benefícios Sociais e Previdenciários (BPC, Auxílio-doença)" },
    { id: "ass-hanseniase", especialidadeId: "esp-infecto", nome: "Hanseníase e Reações Hansênicas" },
    { id: "ass-gestaosaude", especialidadeId: "esp-sus", nome: "Modelos de Gestão em Saúde (OSS, Contratos de Gestão)" },
    { id: "ass-aloimunizacaorh", especialidadeId: "esp-obstetricia", nome: "Aloimunização Rh e Doença Hemolítica Perinatal" },
    { id: "ass-doencatrofoblastica", especialidadeId: "esp-oncogineco", nome: "Doença Trofoblástica Gestacional" },
    { id: "ass-gestacaomultipla", especialidadeId: "esp-obstetricia", nome: "Gestação Múltipla" },
    { id: "ass-alergia-alimentar", especialidadeId: "esp-alergiaimuno", nome: "Alergia Alimentar (APLV e Esofagite Eosinofílica)" },

    /* Quinta leva de assuntos avulsos, identificados classificando a prova
       de 2026. */
    { id: "ass-traumatorax", especialidadeId: "esp-trauma", nome: "Trauma Torácico (Lesões de Aorta, Hilo Pulmonar)" },
    { id: "ass-cirtorax-esofago", especialidadeId: "esp-cirtoracica", nome: "Perfuração Esofágica (Síndrome de Boerhaave)" },
    { id: "ass-orto-ombro", especialidadeId: "esp-ortopedia", nome: "Lesões Articulares e Ligamentares (Ombro e Joelho)" },
    { id: "ass-deficvitaminica", especialidadeId: "esp-gastro", nome: "Deficiências Nutricionais e Vitamínicas" },
    { id: "ass-endometriose", especialidadeId: "esp-ginecologia", nome: "Endometriose" },
    { id: "ass-cavulva", especialidadeId: "esp-oncogineco", nome: "Câncer de Vulva" },
    { id: "ass-diagnosticoprenatal", especialidadeId: "esp-obstetricia", nome: "Diagnóstico Pré-natal Invasivo e Rastreamento de Aneuploidias" },
    { id: "ass-orto-coluna", especialidadeId: "esp-ortopedia", nome: "Doenças Degenerativas e Infecciosas da Coluna Vertebral" },
    { id: "ass-transmissaoverticalhiv", especialidadeId: "esp-neonato", nome: "Transmissão Vertical do HIV e Diagnóstico Neonatal" },
    /* Sexta leva, identificada classificando as provas da USP-SP (FMUSP)
       2022-2026. */
    { id: "ass-psiq-ansiedade", especialidadeId: "esp-psiquiatria", nome: "Transtornos de Ansiedade e TOC" },
    { id: "ass-parasitoses", especialidadeId: "esp-infecto", nome: "Parasitoses Intestinais e Esquistossomose" },
    { id: "ass-neo-exame", especialidadeId: "esp-neonato", nome: "Exame Físico do Recém-Nascido e Tocotraumatismos" },
    { id: "ass-gastro-malabsorcao", especialidadeId: "esp-gastro", nome: "Doença Celíaca, Má Absorção e Intolerância à Lactose" },
    { id: "ass-hepato-nodulos", especialidadeId: "esp-gastro", nome: "Nódulos Hepáticos (Adenoma, Hiperplasia Nodular Focal, Hepatocarcinoma)" },
    { id: "ass-pneumo-intersticiais", especialidadeId: "esp-pneumo", nome: "Doenças Pulmonares Intersticiais e Pneumonites" },
    { id: "ass-emerg-intoxicacoes", especialidadeId: "esp-emergencia", nome: "Intoxicações Exógenas e Síndromes Toxicológicas" },
    { id: "ass-emerg-choque", especialidadeId: "esp-emergencia", nome: "Choque e Ultrassom à Beira do Leito" },
    { id: "ass-neuro-coma", especialidadeId: "esp-neuro", nome: "Coma, Reflexos de Tronco e Morte Encefálica" },
    { id: "ass-coloprocto-orificiais", especialidadeId: "esp-coloprocto", nome: "Doenças Orificiais (Hemorroidas, Abscessos, Fístulas e Doença Pilonidal)" },
    { id: "ass-cabecapescoco", especialidadeId: "esp-cirurgiaonco", nome: "Tumores de Cabeça e Pescoço" },
    { id: "ass-cironco-sarcomas", especialidadeId: "esp-cirurgiaonco", nome: "Sarcomas de Partes Moles" },
    { id: "ass-emergped-corpoestranho", especialidadeId: "esp-emergped", nome: "Corpo Estranho em Vias Aéreas e Digestivas" },
    { id: "ass-puerperio", especialidadeId: "esp-obstetricia", nome: "Puerpério e suas Complicações (Infecção, Transtornos Mentais)" },
    { id: "ass-mamabenigna", especialidadeId: "esp-ginecologia", nome: "Doenças Benignas da Mama (Mastalgia, Cistos, Fibroadenoma)" },
    { id: "ass-violenciasexual", especialidadeId: "esp-ginecologia", nome: "Violência Sexual e Aborto Legal" },
    { id: "ass-financiamento", especialidadeId: "esp-sus", nome: "Financiamento do SUS e Saúde Suplementar" },
    { id: "ass-cardiopatiascongenitas", especialidadeId: "esp-cardio", nome: "Cardiopatias Congênitas (Shunts, Fallot, Coarctação, Eisenmenger)" },
    { id: "ass-capancreas", especialidadeId: "esp-cirurgiaonco", nome: "Câncer de Pâncreas e Tumores Periampulares" },
    { id: "ass-febremaculosa", especialidadeId: "esp-infecto", nome: "Zoonoses por Vetores e Febres Hemorrágicas (Riquetsioses, Lyme, Hantavirose, Ebola)" },
    /* Sétima leva, aberta pela classificação das provas da FAMEMA 2022,
       2023 e 2025. */
    { id: "ass-politicasnacionais", especialidadeId: "esp-sus", nome: "Políticas Nacionais de Saúde (Mulher, Idoso, Pessoa com Deficiência, Alimentação, Educação Permanente)" },
    { id: "ass-leishmaniose", especialidadeId: "esp-infecto", nome: "Protozooses (Malária, Leishmaniose, Chagas)" },
    { id: "ass-restricaocrescimento", especialidadeId: "esp-obstetricia", nome: "Restrição de Crescimento Fetal" },
    { id: "ass-partopretermo", especialidadeId: "esp-obstetricia", nome: "Trabalho de Parto Pré-termo, Prematuridade e Rotura de Membranas" },
    { id: "ass-vitalidadefetal", especialidadeId: "esp-obstetricia", nome: "Vitalidade Fetal, Líquido Amniótico e Indução do Parto" },
    { id: "ass-ddsmalformacoes", especialidadeId: "esp-ginecologia", nome: "Desordens do Desenvolvimento Sexual e Malformações Müllerianas" },
    { id: "ass-dorpelvica", especialidadeId: "esp-ginecologia", nome: "Dor Pélvica Aguda e Massas Pélvicas" },
    { id: "ass-neuroendocrinos", especialidadeId: "esp-endocrino", nome: "Tumores Neuroendócrinos e Síndromes Hormonais (Insulinoma, VIPoma, Gastrinoma, NEM)" },
    { id: "ass-intussuscepcao", especialidadeId: "esp-emergped", nome: "Abdome Agudo e Sangramento Digestivo na Infância (Intussuscepção, Meckel)" },
    { id: "ass-emerg-ambientais", especialidadeId: "esp-emergencia", nome: "Emergências Ambientais (Afogamento, Animais Peçonhentos, Hipotermia)" },
    { id: "ass-marcadorestumorais", especialidadeId: "esp-cirurgiaonco", nome: "Marcadores Tumorais e Rastreamento do Câncer" },
    { id: "ass-toxinfeccao", especialidadeId: "esp-infecto", nome: "Febre Entérica e Toxinfecções Alimentares" },
    { id: "ass-anatomiacirurgica", especialidadeId: "esp-toce", nome: "Anatomia Cirúrgica" },
    { id: "ass-febrelactente", especialidadeId: "esp-emergped", nome: "Febre sem Foco no Lactente" },
    { id: "ass-orl-glandulas", especialidadeId: "esp-orl", nome: "Glândulas Salivares e Massas Cervicais" },
    { id: "ass-psiq-alimentar", especialidadeId: "esp-psiquiatria", nome: "Transtornos Alimentares (Anorexia, Bulimia, Compulsão)" },
    /* Oitava leva, aberta pelo Teste de Progresso NIEPAEM (2º semestre de 2025 e 1º de 2026). */
    { id: "ass-psiq-personalidade", especialidadeId: "esp-psiquiatria", nome: "Transtornos de Personalidade (Borderline)" },
    { id: "ass-saudeplanetaria", especialidadeId: "esp-saudefamilia", nome: "Saúde Planetária e Mudanças Climáticas" },
    /* Oitava leva (continuação): assuntos abertos pela prova de 2026/1. */
    { id: "ass-genetica-erros-inatos", especialidadeId: "esp-genetica", nome: "Erros Inatos do Metabolismo" },
  ],
  // assuntos fundidos em outro (id que sumiu: id que ficou). O navegador de quem já
  // estudava reescreve o histórico com este mapa (aplicarFusoesDeAssuntos, 02).
  fusoes: {
    "ass-ists": "ass-ist",
    "ass-orl-vertigem": "ass-neuro-vertigem",
    "ass-neuro-desmielinizante": "ass-neuro-neuromuscular",
    "ass-neuro-medula": "ass-neuro-neuromuscular",
    "ass-neo-ecn": "ass-neo-malformacoesdigestivas",
    "ass-dac-cronica": "ass-sca",
    "ass-pneumo-hp": "ass-tep",
    "ass-alergia-rinite": "ass-asma",
    "ass-derm-acne": "ass-derm-autoimunes",
    "ass-geriatria-perdapeso": "ass-geriatria-quedas",
    "ass-desidratacao": "ass-dda",
    "ass-incorporacao": "ass-farmacovigilancia",
    "ass-caesofago": "ass-cagastrico",
    "ass-lyme": "ass-febremaculosa",
    "ass-febrehemorragica": "ass-febremaculosa",
    "ass-malaria": "ass-leishmaniose",
    "ass-chagas": "ass-leishmaniose",
    "ass-febretifoide": "ass-toxinfeccao",
    "ass-influenza": "ass-infecto-covid",
    "ass-neo-exposicaotb": "ass-neo-infeccoescongenitas",
    "ass-genetica-teratogenese": "ass-genetica-sindromes",
    "ass-hipoglicemianeo": "ass-neo-prematuridade",
    "ass-divertmeckel": "ass-intussuscepcao",
    "ass-gastro-esofago": "ass-drge",
    "ass-intolerancialactose": "ass-gastro-malabsorcao",
    "ass-hepatopatiasautoimunes": "ass-hepatites",
    "ass-psiq-toc": "ass-psiq-ansiedade",
    "ass-oft-tumores": "ass-oft-catarata",
    "ass-oft-orbita": "ass-oft-olhovermelho",
    "ass-ecgbasico": "ass-arritmias",
    "ass-sincope": "ass-arritmias",
    "ass-reumato-conectivopatias": "ass-reumato-les",
    "ass-orto-ligamentos": "ass-orto-ombro",
    "ass-uro-disfuncaoeretil": "ass-uro-escroto",
    "ass-infectoped-coqueluche": "ass-exantematicas",
    "ass-bronquiolite": "ass-infectoped-pneumonia",
    "ass-toce-posicionamento": "ass-toce-antissepsia",
    "ass-toce-hemostasia": "ass-toce-instrumental",
    "ass-toce-drenos": "ass-toce-incisoes",
    "ass-toce-cicatrizacao": "ass-toce-fios",
  },
});
