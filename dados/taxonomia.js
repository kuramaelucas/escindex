/* ==========================================================================
   TAXONOMIA — as 5 grandes áreas, 39 especialidades e 216 assuntos
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
  ],
  assuntos: [
    { id: "ass-sca", especialidadeId: "esp-cardio", nome: "Síndrome Coronariana Aguda" },
    { id: "ass-ic", especialidadeId: "esp-cardio", nome: "Insuficiência Cardíaca" },
    { id: "ass-arritmias", especialidadeId: "esp-cardio", nome: "Arritmias Cardíacas" },
    { id: "ass-has", especialidadeId: "esp-cardio", nome: "Hipertensão Arterial Sistêmica" },
    { id: "ass-ecgbasico", especialidadeId: "esp-cardio", nome: "Eletrocardiograma Básico" },
    { id: "ass-valvopatias", especialidadeId: "esp-cardio", nome: "Valvopatias" },
    { id: "ass-pericardio", especialidadeId: "esp-cardio", nome: "Doenças do Pericárdio" },
    { id: "ass-pcr", especialidadeId: "esp-cardio", nome: "Parada Cardiorrespiratória e RCP" },
    { id: "ass-dac-cronica", especialidadeId: "esp-cardio", nome: "Doença Coronariana Crônica" },
    { id: "ass-dislipidemia", especialidadeId: "esp-cardio", nome: "Dislipidemia e Risco Cardiovascular" },

    { id: "ass-dpoc", especialidadeId: "esp-pneumo", nome: "DPOC" },
    { id: "ass-asma", especialidadeId: "esp-pneumo", nome: "Asma" },
    { id: "ass-pneumonia", especialidadeId: "esp-pneumo", nome: "Pneumonia Adquirida na Comunidade" },
    { id: "ass-tep", especialidadeId: "esp-pneumo", nome: "Tromboembolismo Pulmonar" },

    { id: "ass-drge", especialidadeId: "esp-gastro", nome: "Doença do Refluxo Gastroesofágico" },
    { id: "ass-doencapeptica", especialidadeId: "esp-gastro", nome: "Doença Péptica" },
    { id: "ass-hepatites", especialidadeId: "esp-gastro", nome: "Hepatites Virais" },
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
    { id: "ass-ist", especialidadeId: "esp-infecto", nome: "Infecções Sexualmente Transmissíveis (sífilis e úlceras)" },
    { id: "ass-leptospirose", especialidadeId: "esp-infecto", nome: "Leptospirose" },
    { id: "ass-malaria", especialidadeId: "esp-infecto", nome: "Malária" },
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

    { id: "ass-cagastrico", especialidadeId: "esp-cirurgiaonco", nome: "Câncer Gástrico" },
    { id: "ass-cacolorretal", especialidadeId: "esp-cirurgiaonco", nome: "Câncer Colorretal" },

    { id: "ass-ictericia", especialidadeId: "esp-neonato", nome: "Icterícia Neonatal" },
    { id: "ass-sepseneonatal", especialidadeId: "esp-neonato", nome: "Sepse Neonatal" },
    { id: "ass-reanimacao", especialidadeId: "esp-neonato", nome: "Reanimação Neonatal" },

    { id: "ass-puericultura", especialidadeId: "esp-crescdesenv", nome: "Puericultura" },
    { id: "ass-calendariovacinal", especialidadeId: "esp-crescdesenv", nome: "Calendário Vacinal" },

    { id: "ass-exantematicas", especialidadeId: "esp-infectoped", nome: "Doenças Exantemáticas" },
    { id: "ass-ivas", especialidadeId: "esp-infectoped", nome: "Infecções de Vias Aéreas Superiores" },
    { id: "ass-dda", especialidadeId: "esp-infectoped", nome: "Doença Diarreica Aguda" },

    { id: "ass-desidratacao", especialidadeId: "esp-emergped", nome: "Desidratação na Infância" },
    { id: "ass-convulsaofebril", especialidadeId: "esp-emergped", nome: "Convulsão Febril" },

    { id: "ass-dheg", especialidadeId: "esp-obstetricia", nome: "Síndromes Hipertensivas da Gestação" },
    { id: "ass-dmg", especialidadeId: "esp-obstetricia", nome: "Diabetes Mellitus Gestacional" },
    { id: "ass-sangramentos", especialidadeId: "esp-obstetricia", nome: "Sangramentos na Gestação" },
    { id: "ass-trabalhoparto", especialidadeId: "esp-obstetricia", nome: "Trabalho de Parto" },

    { id: "ass-ciclomenstrual", especialidadeId: "esp-ginecologia", nome: "Ciclo Menstrual e Distúrbios" },
    { id: "ass-ists", especialidadeId: "esp-ginecologia", nome: "Infecções Sexualmente Transmissíveis" },
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
    { id: "ass-toce-instrumental", especialidadeId: "esp-toce", nome: "Instrumental Cirúrgico" },
    { id: "ass-toce-fios", especialidadeId: "esp-toce", nome: "Fios e Suturas" },
    { id: "ass-toce-antissepsia", especialidadeId: "esp-toce", nome: "Antissepsia, Paramentação e Profilaxia" },
    { id: "ass-toce-incisoes", especialidadeId: "esp-toce", nome: "Incisões e Vias de Acesso" },
    { id: "ass-toce-hemostasia", especialidadeId: "esp-toce", nome: "Hemostasia e Eletrocirurgia" },
    { id: "ass-toce-drenos", especialidadeId: "esp-toce", nome: "Drenos e Curativos" },
    { id: "ass-toce-cicatrizacao", especialidadeId: "esp-toce", nome: "Cicatrização e Manejo de Feridas" },
    { id: "ass-toce-video", especialidadeId: "esp-toce", nome: "Princípios de Videolaparoscopia" },
    { id: "ass-toce-posicionamento", especialidadeId: "esp-toce", nome: "Posicionamento Cirúrgico e Biossegurança" },

    /* Oftalmologia */
    { id: "ass-oft-olhovermelho", especialidadeId: "esp-oftalmo", nome: "Olho Vermelho e Conjuntivites" },
    { id: "ass-oft-glaucoma", especialidadeId: "esp-oftalmo", nome: "Glaucoma" },
    { id: "ass-oft-catarata", especialidadeId: "esp-oftalmo", nome: "Catarata e Leucocoria" },
    { id: "ass-oft-retina", especialidadeId: "esp-oftalmo", nome: "Retina e Perda Visual" },
    { id: "ass-oft-trauma", especialidadeId: "esp-oftalmo", nome: "Trauma e Urgências Oculares" },
    { id: "ass-oft-refracao", especialidadeId: "esp-oftalmo", nome: "Ametropias e Refração" },

    /* Especialidades novas de 19/09 — abertas para receber as questões reais
       da UNIFESP (2022-2026), cujo "Acesso Direto" cobre toda a medicina. */
    { id: "ass-neuro-avc", especialidadeId: "esp-neuro", nome: "Acidente Vascular Cerebral" },
    { id: "ass-neuro-cefaleias", especialidadeId: "esp-neuro", nome: "Cefaleias" },
    { id: "ass-neuro-epilepsia", especialidadeId: "esp-neuro", nome: "Epilepsia e Crises Convulsivas" },
    { id: "ass-neuro-neuromuscular", especialidadeId: "esp-neuro", nome: "Doenças Neuromusculares e Desmielinizantes" },
    { id: "ass-neuro-movimento", especialidadeId: "esp-neuro", nome: "Distúrbios do Movimento" },
    { id: "ass-neuro-vertigem", especialidadeId: "esp-neuro", nome: "Tontura e Vertigem" },

    { id: "ass-psiq-humor", especialidadeId: "esp-psiquiatria", nome: "Transtornos do Humor" },
    { id: "ass-psiq-psicoses", especialidadeId: "esp-psiquiatria", nome: "Psicoses e Esquizofrenia" },
    { id: "ass-psiq-substancias", especialidadeId: "esp-psiquiatria", nome: "Transtornos por Uso de Substâncias" },
    { id: "ass-psiq-infantil", especialidadeId: "esp-psiquiatria", nome: "Psiquiatria da Infância (TDAH e Transtornos do Neurodesenvolvimento)" },

    { id: "ass-derm-tumores", especialidadeId: "esp-dermato", nome: "Tumores Cutâneos" },
    { id: "ass-derm-farmacodermias", especialidadeId: "esp-dermato", nome: "Farmacodermias" },
    { id: "ass-derm-infeccoes", especialidadeId: "esp-dermato", nome: "Infecções e Infestações de Pele" },
    { id: "ass-derm-autoimunes", especialidadeId: "esp-dermato", nome: "Dermatoses Inflamatórias e Autoimunes" },

    { id: "ass-reumato-artrites", especialidadeId: "esp-reumato", nome: "Artrite Reumatoide e Espondiloartrites" },
    { id: "ass-reumato-les", especialidadeId: "esp-reumato", nome: "Lúpus Eritematoso Sistêmico" },
    { id: "ass-reumato-cristais", especialidadeId: "esp-reumato", nome: "Artrites por Cristais (Gota e Pseudogota)" },
    { id: "ass-reumato-vasculites", especialidadeId: "esp-reumato", nome: "Vasculites e Outras Conectivopatias" },

    { id: "ass-hemato-anemias", especialidadeId: "esp-hemato", nome: "Anemias" },
    { id: "ass-hemato-neoplasias", especialidadeId: "esp-hemato", nome: "Neoplasias Hematológicas" },
    { id: "ass-hemato-hemostasia", especialidadeId: "esp-hemato", nome: "Distúrbios da Hemostasia" },

    { id: "ass-geriatria-quedas", especialidadeId: "esp-geriatria", nome: "Quedas e Fragilidade" },
    { id: "ass-geriatria-demencia", especialidadeId: "esp-geriatria", nome: "Demência e Delirium" },
    { id: "ass-geriatria-polifarmacia", especialidadeId: "esp-geriatria", nome: "Polifarmácia no Idoso" },

    { id: "ass-genetica-heranca", especialidadeId: "esp-genetica", nome: "Padrões de Herança Genética" },
    { id: "ass-genetica-sindromes", especialidadeId: "esp-genetica", nome: "Síndromes Genéticas" },

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
    { id: "ass-uro-escroto", especialidadeId: "esp-urologia", nome: "Bolsa Escrotal e Genitália Masculina" },

    { id: "ass-neurocir-tce", especialidadeId: "esp-neurocirurgia", nome: "Traumatismo Cranioencefálico" },
    { id: "ass-neurocir-tumores", especialidadeId: "esp-neurocirurgia", nome: "Tumores do Sistema Nervoso Central" },

    { id: "ass-orl-fratura", especialidadeId: "esp-orl", nome: "Trauma Nasal e Facial" },
    { id: "ass-orl-vertigem", especialidadeId: "esp-orl", nome: "Vertigem Periférica" },
    { id: "ass-orl-viasaereas", especialidadeId: "esp-orl", nome: "Vias Aéreas Superiores e Sono" },

    { id: "ass-alergia-anafilaxia", especialidadeId: "esp-alergiaimuno", nome: "Anafilaxia e Reações Alérgicas Graves" },

    /* Assuntos avulsos acrescentados durante a classificação das questões
       reais da UNIFESP (19/09) — cobrem lacunas pontuais das especialidades
       já existentes, identificadas questão a questão. */
    { id: "ass-diverticulite", especialidadeId: "esp-abdagudo", nome: "Doença Diverticular" },
    { id: "ass-hernias", especialidadeId: "esp-abdagudo", nome: "Hérnias da Parede Abdominal" },
    { id: "ass-neo-ecn", especialidadeId: "esp-neonato", nome: "Enterocolite Necrosante" },
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
    { id: "ass-infecto-covid", especialidadeId: "esp-infecto", nome: "Covid-19" },

    /* Segunda leva de assuntos avulsos, identificados classificando a prova
       de 2023. */
    { id: "ass-saudepopulacoes", especialidadeId: "esp-saudefamilia", nome: "Saúde de Populações Específicas (indígena, negra, situação de rua)" },
    { id: "ass-farmacovigilancia", especialidadeId: "esp-sus", nome: "Controle de Medicamentos e Notificação de Receita" },
    { id: "ass-saudetrabalhador", especialidadeId: "esp-saudefamilia", nome: "Saúde do Trabalhador" },
    { id: "ass-ginecoinfantil", especialidadeId: "esp-ginecologia", nome: "Ginecologia da Infância e Adolescência" },
    { id: "ass-caendometrio", especialidadeId: "esp-oncogineco", nome: "Câncer de Endométrio" },
    { id: "ass-neo-prematuridade", especialidadeId: "esp-neonato", nome: "Complicações da Prematuridade" },
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
    { id: "ass-neo-infeccoescongenitas", especialidadeId: "esp-neonato", nome: "Infecções Congênitas (TORCH, Sífilis Congênita)" },
    { id: "ass-neo-triagemneonatal", especialidadeId: "esp-neonato", nome: "Triagem Neonatal (Teste do Pezinho)" },
    { id: "ass-neo-descrresp", especialidadeId: "esp-neonato", nome: "Desconforto Respiratório do Recém-Nascido" },
    { id: "ass-neo-exposicaotb", especialidadeId: "esp-neonato", nome: "Recém-Nascido Exposto à Tuberculose Materna" },
    { id: "ass-infectoped-pneumonia", especialidadeId: "esp-infectoped", nome: "Pneumonia Bacteriana na Infância" },
    { id: "ass-uro-disfuncaoeretil", especialidadeId: "esp-urologia", nome: "Disfunção Erétil" },
    { id: "ass-orto-artrose", especialidadeId: "esp-ortopedia", nome: "Osteoartrite e Artroplastias" },
    { id: "ass-geriatria-maustratos", especialidadeId: "esp-geriatria", nome: "Violência e Maus-tratos contra o Idoso" },
    { id: "ass-hepatopatiasautoimunes", especialidadeId: "esp-gastro", nome: "Hepatopatias Colestáticas e Autoimunes (CBP, CEP, Hepatite Autoimune)" },
    { id: "ass-dii", especialidadeId: "esp-gastro", nome: "Doença Inflamatória Intestinal" },
    { id: "ass-reumato-conectivopatias", especialidadeId: "esp-reumato", nome: "Esclerose Sistêmica e Outras Conectivopatias" },
    { id: "ass-tabagismo", especialidadeId: "esp-saudefamilia", nome: "Cessação do Tabagismo" },
    { id: "ass-oft-tumores", especialidadeId: "esp-oftalmo", nome: "Tumores Intraoculares (Melanoma de Coroide)" },
    { id: "ass-vm", especialidadeId: "esp-pneumo", nome: "Ventilação Mecânica Invasiva" },
    { id: "ass-neuro-desmielinizante", especialidadeId: "esp-neuro", nome: "Doenças Desmielinizantes (Esclerose Múltipla, Neurite Óptica)" },
    { id: "ass-crescimentopuberdade", especialidadeId: "esp-crescdesenv", nome: "Distúrbios do Crescimento e Puberdade" },
    { id: "ass-hemato-hemoglobinopatias", especialidadeId: "esp-hemato", nome: "Doença Falciforme e Hemoglobinopatias" },

    /* Quarta leva de assuntos avulsos, identificados classificando a prova
       de 2025. */
    { id: "ass-cirvasc-disseccao", especialidadeId: "esp-cirvascular", nome: "Dissecção de Aorta" },
    { id: "ass-neo-malformacoesdigestivas", especialidadeId: "esp-neonato", nome: "Malformações Digestivas Congênitas (Atresias, Má-rotação, VACTERL)" },
    { id: "ass-cirtorax-viaaerea", especialidadeId: "esp-cirtoracica", nome: "Estenose Traqueal e Vias Aéreas Centrais" },
    { id: "ass-acessovenoso", especialidadeId: "esp-perioperatorio", nome: "Acesso Vascular Central e Complicações" },
    { id: "ass-orto-ligamentos", especialidadeId: "esp-ortopedia", nome: "Lesões Ligamentares do Joelho" },
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
    { id: "ass-orto-ombro", especialidadeId: "esp-ortopedia", nome: "Patologias do Ombro (Manguito Rotador, Luxações)" },
    { id: "ass-deficvitaminica", especialidadeId: "esp-gastro", nome: "Deficiências Nutricionais e Vitamínicas" },
    { id: "ass-endometriose", especialidadeId: "esp-ginecologia", nome: "Endometriose" },
    { id: "ass-cavulva", especialidadeId: "esp-oncogineco", nome: "Câncer de Vulva" },
    { id: "ass-diagnosticoprenatal", especialidadeId: "esp-obstetricia", nome: "Diagnóstico Pré-natal Invasivo e Rastreamento de Aneuploidias" },
    { id: "ass-orto-coluna", especialidadeId: "esp-ortopedia", nome: "Doenças Degenerativas e Infecciosas da Coluna Vertebral" },
    { id: "ass-transmissaoverticalhiv", especialidadeId: "esp-neonato", nome: "Transmissão Vertical do HIV e Diagnóstico Neonatal" },
    { id: "ass-bronquiolite", especialidadeId: "esp-infectoped", nome: "Bronquiolite Viral Aguda" },
    { id: "ass-intolerancialactose", especialidadeId: "esp-gastro", nome: "Intolerância à Lactose" },
  ],
});
