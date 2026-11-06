# Prioridade de assuntos para o calendário de Formados

> Gerado por `npm run prioridade-formados` — **não editar à mão**. A ordem sai de `ferramentas/prerequisitos-formados.json` (quem precisa de quem) + a demanda das provas reais.

## Como a ordem foi feita

1. **Demanda** = questões reais ativas de cada assunto (8700 no total, 277 assuntos), cada uma pesando 0.85^(anos desde a prova mais recente do banco, 2027): prova recente conta mais.
2. **Construção**: cada assunto lista o que precisa vir antes (ex.: ciclo menstrual → pré-natal → trabalho de parto → puerpério; HAS → dislipidemia → DAC crônica → SCA → IC).
3. **Valor de desbloqueio** = demanda + 30% da demanda de tudo que depende dele. Alicerce que abre muito conteúdo cobrado sobe.
4. **Ordem**: a cada passo entra, entre os assuntos com pré-requisitos já cumpridos, o de maior valor. Nenhum assunto vem antes do que ele exige.
5. Ondas de 30 assuntos servem para fatiar o calendário (uma onda ≈ um bloco de semanas). **Cobertura acumulada** = % das questões reais do banco que aquelas ondas já cobrem.

## Onda 1 — Alicerces e alto retorno (assuntos 1–30 · cobertura acumulada 32%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 1 | Ciclo Menstrual e Distúrbios (`ass-ciclomenstrual`) | Ginecologia Geral | 101 | 59.6 | 16 | — |
| 2 | Medidas de Frequência e Associação (`ass-medidasepi`) | Epidemiologia | 130 | 76.8 | 17 | — |
| 3 | Assistência Pré-natal (`ass-prenatal`) | Obstetrícia | 144 | 86.8 | 17 | Ciclo Menstrual e Distúrbios |
| 4 | Puericultura (`ass-puericultura`) | Crescimento e Desenvolvimento | 142 | 81.3 | 17 | — |
| 5 | Distúrbios Hidroeletrolíticos (`ass-hidroeletrolitico`) | Nefrologia | 63 | 40.1 | 15 | — |
| 6 | Atendimento Inicial ao Trauma (`ass-atls`) | Trauma | 95 | 58.3 | 16 | — |
| 7 | Hipertensão Arterial Sistêmica (`ass-has`) | Cardiologia | 93 | 54.7 | 16 | — |
| 8 | Princípios e Diretrizes do SUS (`ass-principiossus`) | SUS e Políticas de Saúde | 98 | 59.3 | 17 | — |
| 9 | Níveis e Estratégias de Prevenção (`ass-prevencao`) | Epidemiologia | 79 | 47.7 | 17 | Medidas de Frequência e Associação |
| 10 | Trabalho de Parto (`ass-trabalhoparto`) | Obstetrícia | 170 | 103.5 | 17 | Assistência Pré-natal |
| 11 | Infecções Sexualmente Transmissíveis (`ass-ists`) | Ginecologia Geral | 108 | 68.3 | 16 | Ciclo Menstrual e Distúrbios |
| 12 | Diabetes Mellitus (`ass-dm`) | Endocrinologia | 123 | 75.5 | 16 | — |
| 13 | Vigilância Epidemiológica (`ass-vigilancia`) | Epidemiologia | 125 | 73.0 | 16 | Medidas de Frequência e Associação |
| 14 | Desenhos de Estudo Epidemiológico (`ass-desenhosestudo`) | Epidemiologia | 148 | 91.5 | 17 | Medidas de Frequência e Associação |
| 15 | Reanimação Neonatal (`ass-reanimacao`) | Neonatologia | 48 | 30.0 | 16 | — |
| 16 | Calendário Vacinal (`ass-calendariovacinal`) | Crescimento e Desenvolvimento | 80 | 50.5 | 16 | Puericultura |
| 17 | Cuidados Perioperatórios (`ass-cuidadosperi`) | Pré e Pós-operatório | 65 | 39.0 | 15 | — |
| 18 | Níveis de Atenção à Saúde (`ass-niveisatencao`) | SUS e Políticas de Saúde | 48 | 27.9 | 16 | Princípios e Diretrizes do SUS |
| 19 | Estratégia Saúde da Família (`ass-esf`) | Saúde da Família | 160 | 98.7 | 17 | Níveis de Atenção à Saúde |
| 20 | Climatério (`ass-climaterio`) | Ginecologia Geral | 65 | 40.2 | 17 | Ciclo Menstrual e Distúrbios |
| 21 | Anemias (`ass-hemato-anemias`) | Hematologia | 68 | 42.4 | 16 | — |
| 22 | Métodos Contraceptivos (`ass-contracepcao`) | Planejamento Familiar | 92 | 56.8 | 17 | Ciclo Menstrual e Distúrbios |
| 23 | Asma (`ass-asma`) | Pneumologia | 64 | 39.2 | 15 | — |
| 24 | Pneumonia Adquirida na Comunidade (`ass-pneumonia`) | Pneumologia | 38 | 23.3 | 14 | — |
| 25 | Colecistite Aguda (`ass-colecistite`) | Abdome Agudo | 56 | 33.5 | 16 | — |
| 26 | Câncer de Mama (`ass-camama`) | Oncologia Ginecológica | 81 | 50.0 | 16 | Níveis e Estratégias de Prevenção |
| 27 | Bioestatística e Testes de Hipótese (`ass-bioestatistica`) | Epidemiologia | 93 | 52.9 | 15 | Medidas de Frequência e Associação |
| 28 | Câncer de Colo do Útero (`ass-cacolo`) | Oncologia Ginecológica | 87 | 51.4 | 17 | Infecções Sexualmente Transmissíveis; Níveis e Estratégias de Prevenção |
| 29 | Artrite Reumatoide e Espondiloartrites (`ass-reumato-artrites`) | Reumatologia | 35 | 22.0 | 12 | — |
| 30 | Insuficiência Respiratória e PCR em Pediatria (`ass-emergped-respiratoria`) | Emergências Pediátricas | 59 | 35.1 | 17 | Puericultura |

## Onda 2 — Núcleo clínico, cirúrgico, GO e pediátrico (assuntos 31–60 · cobertura acumulada 50%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 31 | Infecções Sexualmente Transmissíveis (`ass-ist`) | Infectologia | 70 | 40.3 | 16 | Infecções Sexualmente Transmissíveis |
| 32 | Obstrução Intestinal (`ass-obstrucao`) | Abdome Agudo | 67 | 38.7 | 15 | Distúrbios Hidroeletrolíticos |
| 33 | Tireoidopatias (`ass-tireoide`) | Endocrinologia | 71 | 42.2 | 17 | — |
| 34 | Trauma Abdominal (`ass-traumaabd`) | Trauma | 81 | 46.7 | 15 | Atendimento Inicial ao Trauma |
| 35 | Complicações Cirúrgicas (`ass-complicacoescir`) | Pré e Pós-operatório | 67 | 39.9 | 13 | Cuidados Perioperatórios |
| 36 | Transtornos do Humor (`ass-psiq-humor`) | Psiquiatria | 44 | 26.8 | 14 | — |
| 37 | Distúrbios do Crescimento e Puberdade (`ass-crescimentopuberdade`) | Crescimento e Desenvolvimento | 58 | 36.4 | 16 | Puericultura |
| 38 | Incontinência Urinária e Prolapso Genital (`ass-uroginecologia`) | Ginecologia Geral | 71 | 43.4 | 16 | Climatério |
| 39 | Síndromes Hipertensivas da Gestação (`ass-dheg`) | Obstetrícia | 72 | 43.2 | 17 | Assistência Pré-natal; Hipertensão Arterial Sistêmica |
| 40 | Distúrbios da Hemostasia (`ass-hemato-hemostasia`) | Hematologia | 48 | 28.8 | 16 | — |
| 41 | Dislipidemia e Risco Cardiovascular (`ass-dislipidemia`) | Cardiologia | 30 | 18.3 | 13 | Hipertensão Arterial Sistêmica |
| 42 | Exame Físico do Recém-Nascido e Tocotraumatismos (`ass-neo-exame`) | Neonatologia | 19 | 9.9 | 9 | Reanimação Neonatal |
| 43 | Pancreatite Aguda (`ass-pancreatite`) | Abdome Agudo | 61 | 38.1 | 16 | Colecistite Aguda |
| 44 | Sangramentos na Gestação (`ass-sangramentos`) | Obstetrícia | 70 | 40.7 | 16 | Assistência Pré-natal |
| 45 | Diabetes Mellitus Gestacional (`ass-dmg`) | Obstetrícia | 67 | 40.6 | 17 | Diabetes Mellitus; Assistência Pré-natal |
| 46 | Tuberculose (`ass-tuberculose`) | Infectologia | 65 | 39.0 | 17 | Pneumonia Adquirida na Comunidade |
| 47 | Acidente Vascular Cerebral (`ass-neuro-avc`) | Neurologia | 51 | 28.6 | 16 | — |
| 48 | Doença do Refluxo Gastroesofágico (`ass-drge`) | Gastroenterologia | 33 | 18.5 | 13 | — |
| 49 | Endometriose (`ass-endometriose`) | Ginecologia Geral | 48 | 29.2 | 16 | Ciclo Menstrual e Distúrbios |
| 50 | Neoplasias Hematológicas (`ass-hemato-neoplasias`) | Hematologia | 56 | 35.5 | 14 | Anemias; Distúrbios da Hemostasia |
| 51 | Infecções e Infestações de Pele (`ass-derm-infeccoes`) | Dermatologia | 52 | 31.3 | 15 | — |
| 52 | Doença Diarreica Aguda (`ass-dda`) | Infectologia Pediátrica | 31 | 19.7 | 12 | Distúrbios Hidroeletrolíticos |
| 53 | Princípios Bioéticos (`ass-principiosbioetica`) | Bioética | 43 | 23.8 | 14 | — |
| 54 | Síndromes Glomerulares (`ass-nefro-glomerulopatias`) | Nefrologia | 67 | 38.2 | 16 | Distúrbios Hidroeletrolíticos |
| 55 | Eletrocardiograma Básico (`ass-ecgbasico`) | Cardiologia | 10 | 5.8 | 8 | — |
| 56 | Antibioticoterapia e Resistência (`ass-atb`) | Infectologia | 19 | 12.3 | 10 | — |
| 57 | Doença Péptica (`ass-doencapeptica`) | Gastroenterologia | 53 | 32.5 | 16 | Doença do Refluxo Gastroesofágico |
| 58 | Traumatismo Cranioencefálico (`ass-neurocir-tce`) | Neurocirurgia | 52 | 32.4 | 15 | Atendimento Inicial ao Trauma |
| 59 | Apendicite Aguda (`ass-apendicite`) | Abdome Agudo | 53 | 30.1 | 17 | — |
| 60 | Anatomia Cirúrgica (`ass-anatomiacirurgica`) | Técnica Operatória e Cirurgia Experimental | 22 | 13.3 | 9 | — |

## Onda 3 — Aprofundamento e complicações (assuntos 61–90 · cobertura acumulada 66%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 61 | Hérnias da Parede Abdominal (`ass-hernias`) | Abdome Agudo | 82 | 49.7 | 16 | Anatomia Cirúrgica |
| 62 | Infecção do Trato Urinário (`ass-itu`) | Infectologia | 51 | 30.7 | 16 | — |
| 63 | Saúde do Trabalhador (`ass-saudetrabalhador`) | Saúde da Família | 59 | 36.8 | 12 | Vigilância Epidemiológica |
| 64 | Comunicação e Relação Médico-Paciente (`ass-comunicacaoclinica`) | Bioética | 49 | 30.5 | 13 | Princípios Bioéticos |
| 65 | Arboviroses (`ass-arboviroses`) | Infectologia | 50 | 31.8 | 15 | — |
| 66 | Hepatites Virais (`ass-hepatites`) | Gastroenterologia | 28 | 16.7 | 11 | — |
| 67 | Cirrose e Complicações (`ass-cirrose`) | Gastroenterologia | 74 | 44.4 | 17 | Hepatites Virais |
| 68 | Puerpério e suas Complicações (`ass-puerperio`) | Obstetrícia | 53 | 33.9 | 15 | Trabalho de Parto |
| 69 | Intoxicações Exógenas e Síndromes Toxicológicas (`ass-emerg-intoxicacoes`) | Medicina de Emergência | 52 | 33.3 | 15 | Atendimento Inicial ao Trauma |
| 70 | Arritmias Cardíacas (`ass-arritmias`) | Cardiologia | 50 | 30.3 | 16 | Eletrocardiograma Básico |
| 71 | DPOC (`ass-dpoc`) | Pneumologia | 38 | 22.2 | 14 | Asma |
| 72 | Isquemia Arterial Aguda e Crônica (`ass-cirvasc-arterial`) | Cirurgia Vascular | 45 | 26.9 | 16 | Hipertensão Arterial Sistêmica |
| 73 | Câncer Colorretal (`ass-cacolorretal`) | Cirurgia Oncológica | 49 | 32.6 | 14 | Níveis e Estratégias de Prevenção; Obstrução Intestinal |
| 74 | Câncer de Endométrio (`ass-caendometrio`) | Oncologia Ginecológica | 46 | 27.5 | 16 | Climatério |
| 75 | Trauma Torácico (`ass-traumatorax`) | Trauma | 53 | 31.2 | 16 | Atendimento Inicial ao Trauma |
| 76 | Imunização do Adulto (`ass-imunizacao`) | Infectologia | 51 | 31.2 | 13 | Calendário Vacinal |
| 77 | Infecções Congênitas (`ass-neo-infeccoescongenitas`) | Neonatologia | 46 | 28.6 | 14 | Assistência Pré-natal |
| 78 | Lúpus Eritematoso Sistêmico (`ass-reumato-les`) | Reumatologia | 22 | 14.7 | 11 | Artrite Reumatoide e Espondiloartrites |
| 79 | Doenças Exantemáticas (`ass-exantematicas`) | Infectologia Pediátrica | 50 | 30.6 | 14 | Calendário Vacinal |
| 80 | Abortamento (`ass-abortamento`) | Obstetrícia | 40 | 25.9 | 15 | Assistência Pré-natal |
| 81 | Saúde de Populações Específicas (`ass-saudepopulacoes`) | Saúde da Família | 47 | 29.4 | 14 | Estratégia Saúde da Família |
| 82 | Infecções de Vias Aéreas Superiores (`ass-ivas`) | Infectologia Pediátrica | 45 | 27.6 | 14 | — |
| 83 | Demência e Delirium (`ass-geriatria-demencia`) | Geriatria | 47 | 27.5 | 14 | Acidente Vascular Cerebral |
| 84 | Vitalidade Fetal, Líquido Amniótico e Indução do Parto (`ass-vitalidadefetal`) | Obstetrícia | 40 | 25.1 | 12 | Assistência Pré-natal |
| 85 | Doença Coronariana Crônica (`ass-dac-cronica`) | Cardiologia | 9 | 5.5 | 6 | Hipertensão Arterial Sistêmica; Dislipidemia e Risco Cardiovascular |
| 86 | Insuficiência Cardíaca (`ass-ic`) | Cardiologia | 74 | 46.4 | 15 | Hipertensão Arterial Sistêmica; Doença Coronariana Crônica |
| 87 | Síndrome Coronariana Aguda (`ass-sca`) | Cardiologia | 49 | 28.7 | 15 | Doença Coronariana Crônica; Eletrocardiograma Básico |
| 88 | Distúrbios Adrenais (`ass-adrenal`) | Endocrinologia | 39 | 23.3 | 16 | Hipertensão Arterial Sistêmica; Distúrbios Hidroeletrolíticos |
| 89 | Trabalho de Parto Pré-termo, Prematuridade e Rotura de Membranas (`ass-partopretermo`) | Obstetrícia | 48 | 27.8 | 12 | Assistência Pré-natal |
| 90 | Pneumonia Bacteriana na Infância (`ass-infectoped-pneumonia`) | Infectologia Pediátrica | 46 | 27.3 | 15 | Insuficiência Respiratória e PCR em Pediatria |

## Onda 4 — Especialidades de apoio (assuntos 91–120 · cobertura acumulada 78%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 91 | Sepse (`ass-sepse`) | Infectologia | 44 | 27.1 | 13 | Antibioticoterapia e Resistência |
| 92 | Injúria Renal Aguda (`ass-ira`) | Nefrologia | 34 | 18.9 | 11 | Distúrbios Hidroeletrolíticos |
| 93 | Pneumotórax e Doenças Pleurais (`ass-cirtorax-pleura`) | Cirurgia Torácica | 41 | 26.3 | 14 | Pneumonia Adquirida na Comunidade |
| 94 | Icterícia Neonatal (`ass-ictericia`) | Neonatologia | 42 | 26.2 | 16 | Exame Físico do Recém-Nascido e Tocotraumatismos |
| 95 | Miomatose Uterina (`ass-miomatose`) | Ginecologia Geral | 43 | 26.2 | 14 | Ciclo Menstrual e Distúrbios |
| 96 | Triagem Neonatal (`ass-neo-triagemneonatal`) | Neonatologia | 41 | 24.7 | 17 | Exame Físico do Recém-Nascido e Tocotraumatismos |
| 97 | Financiamento do SUS e Saúde Suplementar (`ass-financiamento`) | SUS e Políticas de Saúde | 34 | 20.9 | 13 | Princípios e Diretrizes do SUS |
| 98 | Doença Renal Crônica (`ass-drc`) | Nefrologia | 40 | 25.1 | 13 | Injúria Renal Aguda; Hipertensão Arterial Sistêmica; Diabetes Mellitus |
| 99 | Políticas Nacionais de Saúde (`ass-politicasnacionais`) | SUS e Políticas de Saúde | 40 | 23.5 | 7 | Princípios e Diretrizes do SUS |
| 100 | Choque e Ultrassom à Beira do Leito (`ass-emerg-choque`) | Medicina de Emergência | 18 | 13.0 | 10 | Distúrbios Hidroeletrolíticos; Atendimento Inicial ao Trauma |
| 101 | Anafilaxia e Reações Alérgicas Graves (`ass-alergia-anafilaxia`) | Alergia e Imunologia | 31 | 18.7 | 14 | Choque e Ultrassom à Beira do Leito |
| 102 | Doença Diverticular (`ass-diverticulite`) | Abdome Agudo | 39 | 23.3 | 12 | Apendicite Aguda |
| 103 | Vasculites e Outras Conectivopatias (`ass-reumato-vasculites`) | Reumatologia | 38 | 23.3 | 15 | Lúpus Eritematoso Sistêmico |
| 104 | Cicatrização e Manejo de Feridas (`ass-toce-cicatrizacao`) | Técnica Operatória e Cirurgia Experimental | 34 | 20.5 | 14 | — |
| 105 | Meningites (`ass-meningites`) | Infectologia | 41 | 23.1 | 12 | Antibioticoterapia e Resistência |
| 106 | Doença Inflamatória Intestinal (`ass-dii`) | Gastroenterologia | 25 | 15.5 | 12 | Doença Diarreica Aguda |
| 107 | Infertilidade Conjugal (`ass-infertilidade`) | Ginecologia Geral | 39 | 22.9 | 14 | Ciclo Menstrual e Distúrbios; Endometriose |
| 108 | Doenças Orificiais (`ass-coloprocto-orificiais`) | Coloproctologia | 31 | 20.3 | 12 | Anatomia Cirúrgica |
| 109 | HIV/Aids (`ass-hiv`) | Infectologia | 32 | 19.1 | 15 | Infecções Sexualmente Transmissíveis |
| 110 | Malformações Digestivas Congênitas (`ass-neo-malformacoesdigestivas`) | Neonatologia | 36 | 22.0 | 11 | Exame Físico do Recém-Nascido e Tocotraumatismos |
| 111 | Valvopatias (`ass-valvopatias`) | Cardiologia | 29 | 18.1 | 12 | Eletrocardiograma Básico |
| 112 | Colangite Aguda e Vias Biliares (`ass-colangite`) | Abdome Agudo | 33 | 20.9 | 14 | Colecistite Aguda |
| 113 | Vigilância Sanitária e Notificação Compulsória (`ass-vigilanciasanitaria`) | Epidemiologia | 36 | 19.4 | 15 | Vigilância Epidemiológica |
| 114 | Próstata (`ass-uro-prostata`) | Urologia | 26 | 16.6 | 12 | Níveis e Estratégias de Prevenção |
| 115 | Psiquiatria da Infância (`ass-psiq-infantil`) | Psiquiatria | 33 | 20.4 | 12 | Puericultura; Transtornos do Humor |
| 116 | Convulsão Febril (`ass-convulsaofebril`) | Emergências Pediátricas | 27 | 17.7 | 13 | — |
| 117 | Fraturas e Luxações (`ass-orto-fraturas`) | Ortopedia e Traumatologia | 22 | 13.6 | 8 | Atendimento Inicial ao Trauma |
| 118 | Cardiopatias Congênitas (`ass-cardiopatiascongenitas`) | Cardiologia | 33 | 18.6 | 9 | Reanimação Neonatal |
| 119 | Queimaduras (`ass-queimaduras`) | Trauma | 31 | 18.5 | 14 | Atendimento Inicial ao Trauma |
| 120 | Cirurgia Bariátrica e Complicações (`ass-cirbariatrica`) | Abdome Agudo | 28 | 18.5 | 10 | Complicações Cirúrgicas; Diabetes Mellitus |

## Onda 5 — Cauda longa e refinamento (assuntos 121–150 · cobertura acumulada 86%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 121 | Síndromes Genéticas (`ass-genetica-sindromes`) | Genética Médica | 27 | 16.3 | 11 | Exame Físico do Recém-Nascido e Tocotraumatismos |
| 122 | Cuidados Paliativos e Fim de Vida (`ass-cuidadospaliativos`) | Bioética | 31 | 18.4 | 14 | Comunicação e Relação Médico-Paciente |
| 123 | Ventilação Mecânica Invasiva (`ass-vm`) | Pneumologia | 27 | 17.7 | 13 | DPOC; Pneumonia Adquirida na Comunidade |
| 124 | Dermatoses Inflamatórias e Autoimunes (`ass-derm-autoimunes`) | Dermatologia | 25 | 15.7 | 12 | Lúpus Eritematoso Sistêmico |
| 125 | Via Aérea e Indução Anestésica (`ass-anestesio-viaaerea`) | Anestesiologia | 19 | 11.5 | 11 | Cuidados Perioperatórios |
| 126 | Doença Falciforme e Hemoglobinopatias (`ass-hemato-hemoglobinopatias`) | Hematologia | 30 | 18.0 | 13 | Anemias |
| 127 | Desconforto Respiratório do Recém-Nascido (`ass-neo-descrresp`) | Neonatologia | 21 | 14.7 | 9 | Reanimação Neonatal |
| 128 | Litíase Urinária (`ass-uro-litiase`) | Urologia | 29 | 17.9 | 13 | Distúrbios Hidroeletrolíticos |
| 129 | Ginecologia da Infância e Adolescência (`ass-ginecoinfantil`) | Ginecologia Geral | 24 | 15.3 | 13 | Distúrbios do Crescimento e Puberdade |
| 130 | Doença Venosa (`ass-cirvasc-venosa`) | Cirurgia Vascular | 30 | 17.8 | 14 | — |
| 131 | Câncer Gástrico (`ass-cagastrico`) | Cirurgia Oncológica | 30 | 17.3 | 13 | Doença Péptica |
| 132 | Distúrbios do Cálcio e Paratireoide (`ass-paratireoide`) | Endocrinologia | 19 | 12.9 | 10 | Distúrbios Hidroeletrolíticos |
| 133 | Suspeita de Maus-tratos Infantis (`ass-emergped-maustratos`) | Emergências Pediátricas | 26 | 15.9 | 14 | Puericultura |
| 134 | Tromboembolismo Pulmonar (`ass-tep`) | Pneumologia | 26 | 15.1 | 16 | — |
| 135 | Transtornos por Uso de Substâncias (`ass-psiq-substancias`) | Psiquiatria | 26 | 15.5 | 11 | Transtornos do Humor |
| 136 | Polifarmácia no Idoso (`ass-geriatria-polifarmacia`) | Geriatria | 20 | 12.1 | 9 | — |
| 137 | Infecções Relacionadas à Assistência (`ass-iras`) | Infectologia | 22 | 14.9 | 11 | Antibioticoterapia e Resistência |
| 138 | Tumores Cutâneos (`ass-derm-tumores`) | Dermatologia | 21 | 12.6 | 9 | — |
| 139 | Desidratação na Infância (`ass-desidratacao`) | Emergências Pediátricas | 23 | 14.0 | 12 | Distúrbios Hidroeletrolíticos; Doença Diarreica Aguda |
| 140 | Hanseníase e Reações Hansênicas (`ass-hanseniase`) | Infectologia | 26 | 14.7 | 10 | Infecções e Infestações de Pele |
| 141 | Neoplasia Pulmonar Cirúrgica (`ass-cirtorax-neoplasia`) | Cirurgia Torácica | 24 | 14.6 | 11 | Níveis e Estratégias de Prevenção |
| 142 | Transtornos de Ansiedade (`ass-psiq-ansiedade`) | Psiquiatria | 20 | 12.3 | 8 | Transtornos do Humor |
| 143 | Doença Celíaca e Síndromes de Má Absorção (`ass-gastro-malabsorcao`) | Gastroenterologia | 17 | 9.7 | 9 | Doença Inflamatória Intestinal |
| 144 | Diagnóstico Pré-natal Invasivo e Rastreamento de Aneuploidias (`ass-diagnosticoprenatal`) | Obstetrícia | 23 | 14.1 | 8 | Assistência Pré-natal |
| 145 | Anestesia Regional e Analgesia (`ass-anestesio-analgesia`) | Anestesiologia | 18 | 10.7 | 10 | Via Aérea e Indução Anestésica |
| 146 | Aneurisma de Aorta (`ass-cirvasc-aneurisma`) | Cirurgia Vascular | 19 | 11.5 | 11 | Isquemia Arterial Aguda e Crônica |
| 147 | Emergências Ambientais (`ass-emerg-ambientais`) | Medicina de Emergência | 25 | 14.0 | 10 | Atendimento Inicial ao Trauma |
| 148 | Malformações do Trato Urinário (`ass-uro-malformacoes`) | Urologia | 17 | 10.6 | 8 | Infecção do Trato Urinário |
| 149 | Bronquiolite Viral Aguda (`ass-bronquiolite`) | Infectologia Pediátrica | 21 | 13.8 | 13 | Insuficiência Respiratória e PCR em Pediatria |
| 150 | Covid-19 (`ass-infecto-covid`) | Infectologia | 29 | 13.7 | 13 | Pneumonia Adquirida na Comunidade |

## Onda 6 — Raridades e subespecialidades (assuntos 151–180 · cobertura acumulada 92%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 151 | Câncer de Ovário (`ass-caovario`) | Oncologia Ginecológica | 23 | 13.0 | 13 | Câncer de Endométrio |
| 152 | Parasitoses Intestinais e Esquistossomose (`ass-parasitoses`) | Infectologia | 21 | 12.1 | 11 | — |
| 153 | Deficiências Nutricionais e Vitamínicas (`ass-deficvitaminica`) | Gastroenterologia | 21 | 12.8 | 10 | Doença Celíaca e Síndromes de Má Absorção |
| 154 | Doenças Osteometabólicas e Displasias (`ass-orto-osteometabolicas`) | Ortopedia e Traumatologia | 20 | 12.5 | 11 | Distúrbios do Cálcio e Paratireoide |
| 155 | Endocardite Infecciosa (`ass-endocardite`) | Infectologia | 19 | 12.3 | 11 | Valvopatias; Antibioticoterapia e Resistência |
| 156 | Vias Aéreas Superiores e Sono (`ass-orl-viasaereas`) | Otorrinolaringologia | 17 | 9.3 | 9 | — |
| 157 | Cessação do Tabagismo (`ass-tabagismo`) | Saúde da Família | 19 | 12.2 | 14 | Níveis e Estratégias de Prevenção |
| 158 | Epilepsia e Crises Convulsivas (`ass-neuro-epilepsia`) | Neurologia | 21 | 12.2 | 9 | — |
| 159 | Ortopedia Pediátrica (`ass-orto-pediatrica`) | Ortopedia e Traumatologia | 23 | 12.1 | 8 | Fraturas e Luxações |
| 160 | Aloimunização Rh e Doença Hemolítica Perinatal (`ass-aloimunizacaorh`) | Obstetrícia | 18 | 11.9 | 11 | Assistência Pré-natal |
| 161 | Doenças Benignas da Mama (`ass-mamabenigna`) | Ginecologia Geral | 19 | 11.6 | 9 | Câncer de Mama |
| 162 | Osteoartrite e Artroplastias (`ass-orto-artrose`) | Ortopedia e Traumatologia | 14 | 8.6 | 9 | Artrite Reumatoide e Espondiloartrites |
| 163 | Complicações Anestésicas (`ass-anestesio-complicacoes`) | Anestesiologia | 19 | 11.2 | 8 | Anestesia Regional e Analgesia |
| 164 | Acalasia e Distúrbios Motores do Esôfago (`ass-gastro-esofago`) | Gastroenterologia | 18 | 11.1 | 10 | Doença do Refluxo Gastroesofágico |
| 165 | Tumores do Sistema Nervoso Central (`ass-neurocir-tumores`) | Neurocirurgia | 18 | 11.1 | 7 | Traumatismo Cranioencefálico |
| 166 | Nódulos Hepáticos (`ass-hepato-nodulos`) | Gastroenterologia | 17 | 11.0 | 8 | Cirrose e Complicações |
| 167 | Doenças da Hipófise (`ass-hipofise`) | Endocrinologia | 16 | 9.3 | 9 | Tireoidopatias; Distúrbios Adrenais |
| 168 | Violência Sexual e Aborto Legal (`ass-violenciasexual`) | Ginecologia Geral | 18 | 10.9 | 12 | Métodos Contraceptivos |
| 169 | Alergia Alimentar (`ass-alergia-alimentar`) | Alergia e Imunologia | 12 | 8.7 | 9 | Anafilaxia e Reações Alérgicas Graves |
| 170 | Bolsa Escrotal e Genitália Masculina (`ass-uro-escroto`) | Urologia | 20 | 10.9 | 8 | Malformações do Trato Urinário |
| 171 | Modelos de Gestão em Saúde (`ass-gestaosaude`) | SUS e Políticas de Saúde | 17 | 10.6 | 10 | Financiamento do SUS e Saúde Suplementar |
| 172 | Infecções de Pele e Partes Moles (`ass-peleparte`) | Infectologia | 18 | 10.6 | 10 | Infecções e Infestações de Pele |
| 173 | Tumores Sólidos da Infância (`ass-oncopediatrica`) | Cirurgia Oncológica | 17 | 10.6 | 10 | Neoplasias Hematológicas |
| 174 | Corpo Estranho em Vias Aéreas e Digestivas (`ass-emergped-corpoestranho`) | Emergências Pediátricas | 16 | 10.6 | 11 | Insuficiência Respiratória e PCR em Pediatria |
| 175 | Quedas e Fragilidade (`ass-geriatria-quedas`) | Geriatria | 17 | 10.4 | 10 | Polifarmácia no Idoso |
| 176 | Artrites por Cristais (`ass-reumato-cristais`) | Reumatologia | 18 | 10.3 | 13 | Artrite Reumatoide e Espondiloartrites |
| 177 | Cefaleias (`ass-neuro-cefaleias`) | Neurologia | 17 | 10.2 | 11 | — |
| 178 | Restrição de Crescimento Fetal (`ass-restricaocrescimento`) | Obstetrícia | 16 | 10.2 | 8 | Vitalidade Fetal, Líquido Amniótico e Indução do Parto |
| 179 | Complicações da Prematuridade (`ass-neo-prematuridade`) | Neonatologia | 16 | 9.6 | 10 | Desconforto Respiratório do Recém-Nascido |
| 180 | Dor Pélvica Aguda e Massas Pélvicas (`ass-dorpelvica`) | Ginecologia Geral | 16 | 9.9 | 9 | Endometriose; Abortamento |

## Onda 7 — Cauda longa (pouca demanda) (assuntos 181–210 · cobertura acumulada 97%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 181 | Neoplasias Urológicas (`ass-uro-oncologia`) | Urologia | 16 | 9.6 | 9 | Próstata |
| 182 | Olho Vermelho e Conjuntivites (`ass-oft-olhovermelho`) | Oftalmologia | 10 | 5.9 | 5 | — |
| 183 | Câncer de Pâncreas e Tumores Periampulares (`ass-capancreas`) | Cirurgia Oncológica | 16 | 9.4 | 11 | Pancreatite Aguda |
| 184 | Doenças do Pericárdio (`ass-pericardio`) | Cardiologia | 16 | 9.3 | 10 | Eletrocardiograma Básico |
| 185 | Psicoses e Esquizofrenia (`ass-psiq-psicoses`) | Psiquiatria | 15 | 9.1 | 7 | Transtornos do Humor |
| 186 | Doenças Degenerativas e Infecciosas da Coluna Vertebral (`ass-orto-coluna`) | Ortopedia e Traumatologia | 14 | 8.9 | 10 | Osteoartrite e Artroplastias |
| 187 | Farmacodermias (`ass-derm-farmacodermias`) | Dermatologia | 13 | 8.8 | 7 | Dermatoses Inflamatórias e Autoimunes |
| 188 | Fios e Suturas (`ass-toce-fios`) | Técnica Operatória e Cirurgia Experimental | 15 | 8.7 | 8 | Cicatrização e Manejo de Feridas |
| 189 | Transmissão Vertical do HIV e Diagnóstico Neonatal (`ass-transmissaoverticalhiv`) | Neonatologia | 13 | 8.6 | 7 | HIV/Aids; Assistência Pré-natal |
| 190 | Desordens do Desenvolvimento Sexual e Malformações Müllerianas (`ass-ddsmalformacoes`) | Ginecologia Geral | 16 | 8.4 | 8 | Ginecologia da Infância e Adolescência |
| 191 | Dissecção de Aorta (`ass-cirvasc-disseccao`) | Cirurgia Vascular | 13 | 8.3 | 8 | Aneurisma de Aorta; Hipertensão Arterial Sistêmica |
| 192 | Tumores de Cabeça e Pescoço (`ass-cabecapescoco`) | Cirurgia Oncológica | 12 | 8.2 | 8 | Níveis e Estratégias de Prevenção |
| 193 | Sepse Neonatal (`ass-sepseneonatal`) | Neonatologia | 15 | 8.2 | 11 | Infecções Congênitas |
| 194 | Coma, Reflexos de Tronco e Morte Encefálica (`ass-neuro-coma`) | Neurologia | 14 | 8.1 | 9 | Acidente Vascular Cerebral |
| 195 | Síndromes Medulares (`ass-neuro-medula`) | Neurologia | 4 | 2.5 | 4 | — |
| 196 | Doenças Neuromusculares e Desmielinizantes (`ass-neuro-neuromuscular`) | Neurologia | 23 | 14.0 | 12 | Síndromes Medulares |
| 197 | Constipação Intestinal (`ass-gastro-constipacao`) | Gastroenterologia | 15 | 7.7 | 11 | Doenças Orificiais |
| 198 | Perfuração Esofágica (`ass-cirtorax-esofago`) | Cirurgia Torácica | 13 | 7.6 | 7 | Doença do Refluxo Gastroesofágico |
| 199 | Gestação Múltipla (`ass-gestacaomultipla`) | Obstetrícia | 13 | 7.6 | 8 | Assistência Pré-natal |
| 200 | Melanoma Cutâneo (`ass-cironco-melanoma`) | Cirurgia Oncológica | 12 | 7.5 | 6 | Tumores Cutâneos |
| 201 | Imunodeficiências Primárias (`ass-imunodeficiencias`) | Alergia e Imunologia | 13 | 7.3 | 8 | Alergia Alimentar |
| 202 | Doenças Pulmonares Intersticiais e Pneumonites (`ass-pneumo-intersticiais`) | Pneumologia | 12 | 7.3 | 6 | DPOC |
| 203 | Infecções Osteoarticulares (`ass-orto-infeccoes`) | Ortopedia e Traumatologia | 13 | 7.1 | 9 | Antibioticoterapia e Resistência |
| 204 | Marcadores Tumorais e Rastreamento do Câncer (`ass-marcadorestumorais`) | Cirurgia Oncológica | 12 | 6.1 | 6 | Níveis e Estratégias de Prevenção |
| 205 | Esclerose Sistêmica e Outras Conectivopatias (`ass-reumato-conectivopatias`) | Reumatologia | 11 | 6.8 | 5 | Lúpus Eritematoso Sistêmico |
| 206 | Febre sem Foco no Lactente (`ass-febrelactente`) | Emergências Pediátricas | 10 | 6.7 | 6 | Convulsão Febril |
| 207 | Bronquiectasias (`ass-pneumo-bronquiectasias`) | Pneumologia | 10 | 6.6 | 8 | DPOC |
| 208 | Hidrocefalia (`ass-neurocir-hidrocefalia`) | Neurocirurgia | 12 | 6.6 | 6 | Traumatismo Cranioencefálico |
| 209 | Toxinfecções Alimentares e Surtos (`ass-toxinfeccao`) | Infectologia | 10 | 6.3 | 6 | Doença Diarreica Aguda |
| 210 | Parada Cardiorrespiratória e RCP (`ass-pcr`) | Cardiologia | 11 | 6.0 | 9 | Arritmias Cardíacas |

## Onda 8 — Cauda longa (pouca demanda) (assuntos 211–240 · cobertura acumulada 99%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 211 | Glaucoma (`ass-oft-glaucoma`) | Oftalmologia | 10 | 5.8 | 5 | Olho Vermelho e Conjuntivites |
| 212 | Tumores Neuroendócrinos e Síndromes Hormonais (`ass-neuroendocrinos`) | Endocrinologia | 10 | 5.8 | 5 | Distúrbios Adrenais; Doenças da Hipófise |
| 213 | Distúrbios do Movimento (`ass-neuro-movimento`) | Neurologia | 10 | 5.7 | 7 | — |
| 214 | Antissepsia, Paramentação e Profilaxia (`ass-toce-antissepsia`) | Técnica Operatória e Cirurgia Experimental | 6 | 3.5 | 6 | — |
| 215 | Doença Trofoblástica Gestacional (`ass-doencatrofoblastica`) | Oncologia Ginecológica | 9 | 5.4 | 7 | Abortamento |
| 216 | Incorporação de Tecnologias no SUS (`ass-incorporacao`) | SUS e Políticas de Saúde | 8 | 5.1 | 6 | Financiamento do SUS e Saúde Suplementar |
| 217 | Vertigem Periférica (`ass-orl-vertigem`) | Otorrinolaringologia | 5 | 3.3 | 4 | Vias Aéreas Superiores e Sono |
| 218 | Tontura e Vertigem (`ass-neuro-vertigem`) | Neurologia | 8 | 5.4 | 7 | Vertigem Periférica |
| 219 | Febre Reumática (`ass-reumato-febrereumatica`) | Reumatologia | 8 | 4.6 | 5 | Infecções de Vias Aéreas Superiores |
| 220 | Recém-Nascido Exposto à Tuberculose Materna (`ass-neo-exposicaotb`) | Neonatologia | 7 | 4.5 | 6 | Tuberculose; Exame Físico do Recém-Nascido e Tocotraumatismos |
| 221 | Padrões de Herança Genética (`ass-genetica-heranca`) | Genética Médica | 6 | 3.3 | 2 | Síndromes Genéticas |
| 222 | Controle de Medicamentos e Notificação de Receita (`ass-farmacovigilancia`) | SUS e Políticas de Saúde | 7 | 4.2 | 4 | Vigilância Sanitária e Notificação Compulsória |
| 223 | Hipoglicemia Neonatal (`ass-hipoglicemianeo`) | Neonatologia | 7 | 4.0 | 5 | Exame Físico do Recém-Nascido e Tocotraumatismos |
| 224 | Erros Inatos do Metabolismo (`ass-genetica-erros-inatos`) | Genética Médica | 7 | 3.9 | 2 | Padrões de Herança Genética; Triagem Neonatal |
| 225 | Câncer de Esôfago (`ass-caesofago`) | Cirurgia Oncológica | 5 | 3.7 | 3 | Doença do Refluxo Gastroesofágico |
| 226 | Doenças Desmielinizantes (`ass-neuro-desmielinizante`) | Neurologia | 6 | 3.6 | 6 | Síndromes Medulares |
| 227 | Acesso Vascular Central e Complicações (`ass-acessovenoso`) | Pré e Pós-operatório | 7 | 3.5 | 5 | Cuidados Perioperatórios |
| 228 | Celulite Periorbital e Orbitária (`ass-oft-orbita`) | Oftalmologia | 5 | 3.4 | 3 | Olho Vermelho e Conjuntivites |
| 229 | Hepatopatias Colestáticas e Autoimunes (`ass-hepatopatiasautoimunes`) | Gastroenterologia | 4 | 3.2 | 4 | Hepatites Virais |
| 230 | Leptospirose (`ass-leptospirose`) | Infectologia | 5 | 3.1 | 5 | Arboviroses |
| 231 | Instrumental Cirúrgico (`ass-toce-instrumental`) | Técnica Operatória e Cirurgia Experimental | 5 | 3.1 | 4 | Antissepsia, Paramentação e Profilaxia |
| 232 | Síncope (`ass-sincope`) | Cardiologia | 5 | 3.1 | 4 | Arritmias Cardíacas |
| 233 | Câncer de Vulva (`ass-cavulva`) | Oncologia Ginecológica | 5 | 3.1 | 5 | Câncer de Colo do Útero |
| 234 | Teratógenos e Defeitos Congênitos (`ass-genetica-teratogenese`) | Genética Médica | 5 | 3.0 | 1 | Assistência Pré-natal |
| 235 | Febre Maculosa e Outras Riquetsioses (`ass-febremaculosa`) | Infectologia | 5 | 2.9 | 5 | Arboviroses |
| 236 | Disfunção Erétil (`ass-uro-disfuncaoeretil`) | Urologia | 5 | 2.9 | 4 | Próstata |
| 237 | Malária (`ass-malaria`) | Infectologia | 5 | 2.9 | 4 | Arboviroses |
| 238 | Ametropias e Refração (`ass-oft-refracao`) | Oftalmologia | 3 | 1.9 | 2 | — |
| 239 | Catarata e Leucocoria (`ass-oft-catarata`) | Oftalmologia | 5 | 3.0 | 2 | Ametropias e Refração |
| 240 | Coqueluche (`ass-infectoped-coqueluche`) | Infectologia Pediátrica | 4 | 2.8 | 4 | Calendário Vacinal |

## Onda 9 — Cauda longa (pouca demanda) (assuntos 241–270 · cobertura acumulada 100%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 241 | Retina e Perda Visual (`ass-oft-retina`) | Oftalmologia | 4 | 2.4 | 4 | Diabetes Mellitus |
| 242 | Drenos e Curativos (`ass-toce-drenos`) | Técnica Operatória e Cirurgia Experimental | 5 | 2.7 | 5 | Complicações Cirúrgicas |
| 243 | Leishmaniose e Outras Protozooses (`ass-leishmaniose`) | Infectologia | 5 | 2.6 | 3 | Parasitoses Intestinais e Esquistossomose |
| 244 | Intolerância à Lactose (`ass-intolerancialactose`) | Gastroenterologia | 3 | 2.5 | 2 | Doença Celíaca e Síndromes de Má Absorção |
| 245 | Intussuscepção e Abdome Agudo na Infância (`ass-intussuscepcao`) | Emergências Pediátricas | 5 | 2.5 | 4 | Desidratação na Infância |
| 246 | Trauma Nasal e Facial (`ass-orl-fratura`) | Otorrinolaringologia | 4 | 2.5 | 3 | Atendimento Inicial ao Trauma |
| 247 | Transtornos de Personalidade (`ass-psiq-personalidade`) | Psiquiatria | 4 | 2.5 | 3 | Transtornos de Ansiedade |
| 248 | Trauma e Urgências Oculares (`ass-oft-trauma`) | Oftalmologia | 5 | 2.4 | 3 | Olho Vermelho e Conjuntivites |
| 249 | Sarcomas de Partes Moles (`ass-cironco-sarcomas`) | Cirurgia Oncológica | 4 | 2.4 | 3 | Marcadores Tumorais e Rastreamento do Câncer |
| 250 | Estenose Traqueal e Vias Aéreas Centrais (`ass-cirtorax-viaaerea`) | Cirurgia Torácica | 4 | 2.3 | 2 | Ventilação Mecânica Invasiva |
| 251 | Transtorno Obsessivo-Compulsivo (`ass-psiq-toc`) | Psiquiatria | 3 | 2.3 | 2 | Transtornos de Ansiedade |
| 252 | Transtornos Alimentares (`ass-psiq-alimentar`) | Psiquiatria | 4 | 2.3 | 4 | Transtornos de Ansiedade |
| 253 | Micoses Sistêmicas e Oportunistas (`ass-micosesinvasivas`) | Infectologia | 4 | 2.3 | 2 | HIV/Aids |
| 254 | Lesões Ligamentares do Joelho (`ass-orto-ligamentos`) | Ortopedia e Traumatologia | 4 | 2.1 | 4 | Fraturas e Luxações |
| 255 | Saúde Planetária e Mudanças Climáticas (`ass-saudeplanetaria`) | Saúde da Família | 3 | 2.0 | 1 | Vigilância Epidemiológica |
| 256 | Patologias do Ombro (`ass-orto-ombro`) | Ortopedia e Traumatologia | 4 | 2.0 | 3 | Fraturas e Luxações |
| 257 | Violência e Maus-tratos contra o Idoso (`ass-geriatria-maustratos`) | Geriatria | 3 | 2.0 | 3 | Demência e Delirium |
| 258 | Benefícios Sociais e Previdenciários (`ass-assistenciasocial`) | Saúde da Família | 3 | 1.9 | 3 | Estratégia Saúde da Família |
| 259 | Divertículo de Meckel (`ass-divertmeckel`) | Abdome Agudo | 4 | 1.7 | 4 | Apendicite Aguda |
| 260 | Incisões e Vias de Acesso (`ass-toce-incisoes`) | Técnica Operatória e Cirurgia Experimental | 2 | 1.0 | 2 | Antissepsia, Paramentação e Profilaxia; Anatomia Cirúrgica |
| 261 | Princípios de Videolaparoscopia (`ass-toce-video`) | Técnica Operatória e Cirurgia Experimental | 4 | 2.1 | 3 | Incisões e Vias de Acesso |
| 262 | Acne (`ass-derm-acne`) | Dermatologia | 2 | 1.6 | 2 | — |
| 263 | Hipertensão Pulmonar (`ass-pneumo-hp`) | Pneumologia | 2 | 1.6 | 2 | Tromboembolismo Pulmonar; DPOC |
| 264 | Rinite Alérgica (`ass-alergia-rinite`) | Alergia e Imunologia | 3 | 1.5 | 2 | Asma |
| 265 | Lesões do Plexo Braquial (`ass-neurocir-plexobraquial`) | Neurocirurgia | 2 | 1.2 | 2 | Fraturas e Luxações |
| 266 | Glândulas Salivares e Massas Cervicais (`ass-orl-glandulas`) | Otorrinolaringologia | 2 | 1.2 | 2 | Vias Aéreas Superiores e Sono |
| 267 | Perda de Peso Involuntária no Idoso (`ass-geriatria-perdapeso`) | Geriatria | 2 | 1.2 | 2 | Demência e Delirium |
| 268 | Enterocolite Necrosante (`ass-neo-ecn`) | Neonatologia | 2 | 1.1 | 1 | Complicações da Prematuridade |
| 269 | Tumores Intraoculares (`ass-oft-tumores`) | Oftalmologia | 2 | 1.1 | 2 | Retina e Perda Visual |
| 270 | Hantavirose, Ebola e Outras Febres Hemorrágicas Virais (`ass-febrehemorragica`) | Infectologia | 1 | 1.0 | 1 | Arboviroses |

## Onda 10 — Cauda longa (pouca demanda) (assuntos 271–277 · cobertura acumulada 100%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 271 | Neutropenia Febril e Febre de Origem Indeterminada (`ass-neutropeniafebril`) | Infectologia | 2 | 0.8 | 1 | Neoplasias Hematológicas; Antibioticoterapia e Resistência |
| 272 | Influenza e Síndrome Respiratória Aguda Grave (`ass-influenza`) | Infectologia | 1 | 0.5 | 1 | Infecções de Vias Aéreas Superiores |
| 273 | Doença de Lyme (`ass-lyme`) | Infectologia | 1 | 0.4 | 1 | Arboviroses |
| 274 | Doença de Chagas (`ass-chagas`) | Infectologia | 0 | 0.0 | 0 | Insuficiência Cardíaca; Arritmias Cardíacas |
| 275 | Febre Tifoide (`ass-febretifoide`) | Infectologia | 0 | 0.0 | 0 | Doença Diarreica Aguda |
| 276 | Hemostasia e Eletrocirurgia (`ass-toce-hemostasia`) | Técnica Operatória e Cirurgia Experimental | 0 | 0.0 | 0 | Cicatrização e Manejo de Feridas |
| 277 | Posicionamento Cirúrgico e Biossegurança (`ass-toce-posicionamento`) | Técnica Operatória e Cirurgia Experimental | 0 | 0.0 | 0 | Antissepsia, Paramentação e Profilaxia |

## Peso de cada especialidade e onde ela se espalha na sequência

| Especialidade | % das questões | Assuntos | 1º assunto na posição | último na posição |
|---|---:|---:|---:|---:|
| Obstetrícia | 8.9% | 13 | 3 | 199 |
| Epidemiologia | 7.0% | 6 | 2 | 113 |
| Infectologia | 6.9% | 27 | 31 | 275 |
| Ginecologia Geral | 6.5% | 12 | 1 | 190 |
| Abdome Agudo | 4.9% | 9 | 25 | 259 |
| Cardiologia | 4.7% | 12 | 7 | 232 |
| Neonatologia | 3.6% | 13 | 15 | 268 |
| Gastroenterologia | 3.5% | 12 | 48 | 244 |
| Saúde da Família | 3.3% | 6 | 19 | 258 |
| Crescimento e Desenvolvimento | 3.2% | 3 | 4 | 37 |
| Endocrinologia | 3.2% | 6 | 12 | 212 |
| Trauma | 3.0% | 4 | 6 | 119 |
| SUS e Políticas de Saúde | 2.9% | 7 | 8 | 222 |
| Oncologia Ginecológica | 2.9% | 6 | 26 | 233 |
| Pneumologia | 2.5% | 8 | 23 | 263 |
| Nefrologia | 2.3% | 4 | 5 | 98 |
| Hematologia | 2.3% | 4 | 21 | 126 |
| Infectologia Pediátrica | 2.3% | 6 | 52 | 240 |
| Emergências Pediátricas | 1.9% | 7 | 30 | 245 |
| Cirurgia Oncológica | 1.8% | 9 | 73 | 249 |
| Neurologia | 1.8% | 9 | 47 | 226 |
| Psiquiatria | 1.7% | 8 | 36 | 252 |
| Pré e Pós-operatório | 1.6% | 3 | 17 | 227 |
| Reumatologia | 1.5% | 6 | 29 | 219 |
| Bioética | 1.4% | 3 | 53 | 122 |
| Ortopedia e Traumatologia | 1.3% | 8 | 117 | 256 |
| Dermatologia | 1.3% | 5 | 51 | 262 |
| Urologia | 1.3% | 6 | 114 | 236 |
| Cirurgia Vascular | 1.2% | 4 | 72 | 191 |
| Medicina de Emergência | 1.1% | 3 | 69 | 147 |
| Técnica Operatória e Cirurgia Experimental | 1.1% | 10 | 60 | 277 |
| Planejamento Familiar | 1.1% | 1 | 22 | 22 |
| Geriatria | 1.0% | 5 | 83 | 267 |
| Neurocirurgia | 1.0% | 4 | 58 | 265 |
| Cirurgia Torácica | 0.9% | 4 | 93 | 250 |
| Alergia e Imunologia | 0.7% | 4 | 101 | 264 |
| Anestesiologia | 0.6% | 3 | 125 | 163 |
| Genética Médica | 0.5% | 4 | 121 | 234 |
| Oftalmologia | 0.5% | 8 | 182 | 269 |
| Coloproctologia | 0.4% | 1 | 108 | 108 |
| Otorrinolaringologia | 0.3% | 4 | 156 | 266 |

## Lacunas que afetam o calendário

Assuntos com **menos de 3 questões reais** (ficam no fim, mas o aluno quase não tem o que praticar neles): `ass-toce-incisoes` (2), `ass-derm-acne` (2), `ass-pneumo-hp` (2), `ass-neurocir-plexobraquial` (2), `ass-orl-glandulas` (2), `ass-geriatria-perdapeso` (2), `ass-neo-ecn` (2), `ass-oft-tumores` (2), `ass-febrehemorragica` (1), `ass-neutropeniafebril` (2), `ass-influenza` (1), `ass-lyme` (1), `ass-chagas` (0), `ass-febretifoide` (0), `ass-toce-hemostasia` (0), `ass-toce-posicionamento` (0).
