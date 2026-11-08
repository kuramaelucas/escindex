# Prioridade de assuntos para o calendário de Formados

> Gerado por `npm run prioridade-formados` — **não editar à mão**. A ordem sai de `ferramentas/prerequisitos-formados.json` (quem precisa de quem) + a demanda das provas reais.

## Como a ordem foi feita

1. **Demanda** = questões reais ativas de cada assunto (8700 no total, 237 assuntos), cada uma pesando 0.85^(anos desde a prova mais recente do banco, 2027): prova recente conta mais.
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
| 7 | Infecções Sexualmente Transmissíveis (`ass-ist`) | Infectologia | 178 | 108.6 | 17 | Ciclo Menstrual e Distúrbios |
| 8 | Hipertensão Arterial Sistêmica (`ass-has`) | Cardiologia | 93 | 54.7 | 16 | — |
| 9 | Princípios e Diretrizes do SUS (`ass-principiossus`) | SUS e Políticas de Saúde | 98 | 59.3 | 17 | — |
| 10 | Níveis e Estratégias de Prevenção (`ass-prevencao`) | Epidemiologia | 79 | 47.7 | 17 | Medidas de Frequência e Associação |
| 11 | Trabalho de Parto (`ass-trabalhoparto`) | Obstetrícia | 170 | 103.5 | 17 | Assistência Pré-natal |
| 12 | Diabetes Mellitus (`ass-dm`) | Endocrinologia | 123 | 75.5 | 16 | — |
| 13 | Vigilância Epidemiológica (`ass-vigilancia`) | Epidemiologia | 125 | 73.0 | 16 | Medidas de Frequência e Associação |
| 14 | Desenhos de Estudo Epidemiológico (`ass-desenhosestudo`) | Epidemiologia | 148 | 91.5 | 17 | Medidas de Frequência e Associação |
| 15 | Reanimação Neonatal (`ass-reanimacao`) | Neonatologia | 48 | 30.0 | 16 | — |
| 16 | ECG, Arritmias e Síncope (`ass-arritmias`) | Cardiologia | 65 | 39.2 | 17 | — |
| 17 | Calendário Vacinal (`ass-calendariovacinal`) | Crescimento e Desenvolvimento | 80 | 50.5 | 16 | Puericultura |
| 18 | Cuidados Perioperatórios (`ass-cuidadosperi`) | Pré e Pós-operatório | 65 | 39.0 | 15 | — |
| 19 | Níveis de Atenção à Saúde (`ass-niveisatencao`) | SUS e Políticas de Saúde | 48 | 27.9 | 16 | Princípios e Diretrizes do SUS |
| 20 | Estratégia Saúde da Família (`ass-esf`) | Saúde da Família | 160 | 98.7 | 17 | Níveis de Atenção à Saúde |
| 21 | Pneumonia Adquirida na Comunidade (`ass-pneumonia`) | Pneumologia | 38 | 23.3 | 14 | — |
| 22 | Climatério (`ass-climaterio`) | Ginecologia Geral | 65 | 40.2 | 17 | Ciclo Menstrual e Distúrbios |
| 23 | Asma e Rinite Alérgica (`ass-asma`) | Pneumologia | 67 | 40.7 | 15 | — |
| 24 | Anemias (`ass-hemato-anemias`) | Hematologia | 68 | 42.4 | 16 | — |
| 25 | Métodos Contraceptivos (`ass-contracepcao`) | Planejamento Familiar | 92 | 56.8 | 17 | Ciclo Menstrual e Distúrbios |
| 26 | Exame Físico do Recém-Nascido e Tocotraumatismos (`ass-neo-exame`) | Neonatologia | 19 | 9.9 | 9 | Reanimação Neonatal |
| 27 | Colecistite Aguda (`ass-colecistite`) | Abdome Agudo | 56 | 33.5 | 16 | — |
| 28 | Câncer de Mama (`ass-camama`) | Oncologia Ginecológica | 81 | 50.0 | 16 | Níveis e Estratégias de Prevenção |
| 29 | Bioestatística e Testes de Hipótese (`ass-bioestatistica`) | Epidemiologia | 93 | 52.9 | 15 | Medidas de Frequência e Associação |
| 30 | Câncer de Colo do Útero (`ass-cacolo`) | Oncologia Ginecológica | 87 | 51.4 | 17 | Infecções Sexualmente Transmissíveis; Níveis e Estratégias de Prevenção |

## Onda 2 — Núcleo clínico, cirúrgico, GO e pediátrico (assuntos 31–60 · cobertura acumulada 52%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 31 | Artrite Reumatoide e Espondiloartrites (`ass-reumato-artrites`) | Reumatologia | 35 | 22.0 | 12 | — |
| 32 | Tuberculose (`ass-tuberculose`) | Infectologia | 65 | 39.0 | 17 | Pneumonia Adquirida na Comunidade |
| 33 | Insuficiência Respiratória e PCR em Pediatria (`ass-emergped-respiratoria`) | Emergências Pediátricas | 59 | 35.1 | 17 | Puericultura |
| 34 | Doença Diarreica Aguda e Desidratação (`ass-dda`) | Infectologia Pediátrica | 54 | 33.7 | 15 | Distúrbios Hidroeletrolíticos |
| 35 | Obstrução Intestinal (`ass-obstrucao`) | Abdome Agudo | 67 | 38.7 | 15 | Distúrbios Hidroeletrolíticos |
| 36 | DRGE e Distúrbios Motores do Esôfago (`ass-drge`) | Gastroenterologia | 51 | 29.6 | 16 | — |
| 37 | Complicações Cirúrgicas (`ass-complicacoescir`) | Pré e Pós-operatório | 67 | 39.9 | 13 | Cuidados Perioperatórios |
| 38 | Tireoidopatias (`ass-tireoide`) | Endocrinologia | 71 | 42.2 | 17 | — |
| 39 | Trauma Abdominal (`ass-traumaabd`) | Trauma | 81 | 46.7 | 15 | Atendimento Inicial ao Trauma |
| 40 | Transtornos do Humor (`ass-psiq-humor`) | Psiquiatria | 44 | 26.8 | 14 | — |
| 41 | Dislipidemia e Risco Cardiovascular (`ass-dislipidemia`) | Cardiologia | 30 | 18.3 | 13 | Hipertensão Arterial Sistêmica |
| 42 | Doença Coronariana (`ass-sca`) | Cardiologia | 58 | 34.2 | 16 | Hipertensão Arterial Sistêmica; Dislipidemia e Risco Cardiovascular; ECG, Arritmias e Síncope |
| 43 | Insuficiência Cardíaca (`ass-ic`) | Cardiologia | 74 | 46.4 | 15 | Hipertensão Arterial Sistêmica; Doença Coronariana |
| 44 | Distúrbios do Crescimento e Puberdade (`ass-crescimentopuberdade`) | Crescimento e Desenvolvimento | 58 | 36.4 | 16 | Puericultura |
| 45 | Incontinência Urinária e Prolapso Genital (`ass-uroginecologia`) | Ginecologia Geral | 71 | 43.4 | 16 | Climatério |
| 46 | Acidente Vascular Cerebral (`ass-neuro-avc`) | Neurologia | 51 | 28.6 | 16 | — |
| 47 | Síndromes Hipertensivas da Gestação (`ass-dheg`) | Obstetrícia | 72 | 43.2 | 17 | Assistência Pré-natal; Hipertensão Arterial Sistêmica |
| 48 | Distúrbios da Hemostasia (`ass-hemato-hemostasia`) | Hematologia | 48 | 28.8 | 16 | — |
| 49 | Infecções Respiratórias Baixas na Infância (`ass-infectoped-pneumonia`) | Infectologia Pediátrica | 67 | 41.1 | 16 | Insuficiência Respiratória e PCR em Pediatria |
| 50 | Pancreatite Aguda (`ass-pancreatite`) | Abdome Agudo | 61 | 38.1 | 16 | Colecistite Aguda |
| 51 | Sangramentos na Gestação (`ass-sangramentos`) | Obstetrícia | 70 | 40.7 | 16 | Assistência Pré-natal |
| 52 | Diabetes Mellitus Gestacional (`ass-dmg`) | Obstetrícia | 67 | 40.6 | 17 | Diabetes Mellitus; Assistência Pré-natal |
| 53 | Endometriose (`ass-endometriose`) | Ginecologia Geral | 48 | 29.2 | 16 | Ciclo Menstrual e Distúrbios |
| 54 | Neoplasias Hematológicas (`ass-hemato-neoplasias`) | Hematologia | 56 | 35.5 | 14 | Anemias; Distúrbios da Hemostasia |
| 55 | Infecções e Infestações de Pele (`ass-derm-infeccoes`) | Dermatologia | 52 | 31.3 | 15 | — |
| 56 | Doença Péptica (`ass-doencapeptica`) | Gastroenterologia | 53 | 32.5 | 16 | DRGE e Distúrbios Motores do Esôfago |
| 57 | Princípios Bioéticos (`ass-principiosbioetica`) | Bioética | 43 | 23.8 | 14 | — |
| 58 | Apendicite Aguda (`ass-apendicite`) | Abdome Agudo | 53 | 30.1 | 17 | — |
| 59 | Anatomia Cirúrgica (`ass-anatomiacirurgica`) | Técnica Operatória e Cirurgia Experimental | 22 | 13.3 | 9 | — |
| 60 | Hérnias da Parede Abdominal (`ass-hernias`) | Abdome Agudo | 82 | 49.7 | 16 | Anatomia Cirúrgica |

## Onda 3 — Aprofundamento e complicações (assuntos 61–90 · cobertura acumulada 69%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 61 | Síndromes Glomerulares (`ass-nefro-glomerulopatias`) | Nefrologia | 67 | 38.2 | 16 | Distúrbios Hidroeletrolíticos |
| 62 | Infecção do Trato Urinário (`ass-itu`) | Infectologia | 51 | 30.7 | 16 | — |
| 63 | Antibioticoterapia e Resistência (`ass-atb`) | Infectologia | 19 | 12.3 | 10 | — |
| 64 | Traumatismo Cranioencefálico (`ass-neurocir-tce`) | Neurocirurgia | 52 | 32.4 | 15 | Atendimento Inicial ao Trauma |
| 65 | DPOC (`ass-dpoc`) | Pneumologia | 38 | 22.2 | 14 | Asma e Rinite Alérgica |
| 66 | Saúde do Trabalhador (`ass-saudetrabalhador`) | Saúde da Família | 59 | 36.8 | 12 | Vigilância Epidemiológica |
| 67 | Hepatites Virais e Autoimunes (`ass-hepatites`) | Gastroenterologia | 32 | 19.9 | 12 | — |
| 68 | Cirrose e Complicações (`ass-cirrose`) | Gastroenterologia | 74 | 44.4 | 17 | Hepatites Virais e Autoimunes |
| 69 | Lúpus e Outras Conectivopatias (`ass-reumato-les`) | Reumatologia | 33 | 21.4 | 12 | Artrite Reumatoide e Espondiloartrites |
| 70 | Comunicação e Relação Médico-Paciente (`ass-comunicacaoclinica`) | Bioética | 49 | 30.5 | 13 | Princípios Bioéticos |
| 71 | Arboviroses (`ass-arboviroses`) | Infectologia | 50 | 31.8 | 15 | — |
| 72 | Infecções Perinatais (`ass-neo-infeccoescongenitas`) | Neonatologia | 53 | 33.1 | 15 | Assistência Pré-natal; Tuberculose; Exame Físico do Recém-Nascido e Tocotraumatismos |
| 73 | Puerpério e suas Complicações (`ass-puerperio`) | Obstetrícia | 53 | 33.9 | 15 | Trabalho de Parto |
| 74 | Doenças Infecciosas Imunopreveníveis da Infância (`ass-exantematicas`) | Infectologia Pediátrica | 54 | 33.4 | 14 | Calendário Vacinal |
| 75 | Intoxicações Exógenas e Síndromes Toxicológicas (`ass-emerg-intoxicacoes`) | Medicina de Emergência | 52 | 33.3 | 15 | Atendimento Inicial ao Trauma |
| 76 | Infecções de Vias Aéreas Superiores (`ass-ivas`) | Infectologia Pediátrica | 45 | 27.6 | 14 | — |
| 77 | Isquemia Arterial Aguda e Crônica (`ass-cirvasc-arterial`) | Cirurgia Vascular | 45 | 26.9 | 16 | Hipertensão Arterial Sistêmica |
| 78 | Câncer Colorretal (`ass-cacolorretal`) | Cirurgia Oncológica | 49 | 32.6 | 14 | Níveis e Estratégias de Prevenção; Obstrução Intestinal |
| 79 | Demência e Delirium (`ass-geriatria-demencia`) | Geriatria | 47 | 27.5 | 14 | Acidente Vascular Cerebral |
| 80 | Câncer de Endométrio (`ass-caendometrio`) | Oncologia Ginecológica | 46 | 27.5 | 16 | Climatério |
| 81 | Trauma Torácico (`ass-traumatorax`) | Trauma | 53 | 31.2 | 16 | Atendimento Inicial ao Trauma |
| 82 | Imunização do Adulto (`ass-imunizacao`) | Infectologia | 51 | 31.2 | 13 | Calendário Vacinal |
| 83 | Abortamento (`ass-abortamento`) | Obstetrícia | 40 | 25.9 | 15 | Assistência Pré-natal |
| 84 | Fios, Suturas e Cicatrização (`ass-toce-fios`) | Técnica Operatória e Cirurgia Experimental | 49 | 29.2 | 15 | — |
| 85 | Saúde de Populações Específicas (`ass-saudepopulacoes`) | Saúde da Família | 47 | 29.4 | 14 | Estratégia Saúde da Família |
| 86 | Vitalidade Fetal, Líquido Amniótico e Indução do Parto (`ass-vitalidadefetal`) | Obstetrícia | 40 | 25.1 | 12 | Assistência Pré-natal |
| 87 | Distúrbios Adrenais (`ass-adrenal`) | Endocrinologia | 39 | 23.3 | 16 | Hipertensão Arterial Sistêmica; Distúrbios Hidroeletrolíticos |
| 88 | Trabalho de Parto Pré-termo, Prematuridade e Rotura de Membranas (`ass-partopretermo`) | Obstetrícia | 48 | 27.8 | 12 | Assistência Pré-natal |
| 89 | Sepse (`ass-sepse`) | Infectologia | 44 | 27.1 | 13 | Antibioticoterapia e Resistência |
| 90 | Financiamento do SUS e Saúde Suplementar (`ass-financiamento`) | SUS e Políticas de Saúde | 34 | 20.9 | 13 | Princípios e Diretrizes do SUS |

## Onda 4 — Especialidades de apoio (assuntos 91–120 · cobertura acumulada 80%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 91 | Injúria Renal Aguda (`ass-ira`) | Nefrologia | 34 | 18.9 | 11 | Distúrbios Hidroeletrolíticos |
| 92 | Pneumotórax e Doenças Pleurais (`ass-cirtorax-pleura`) | Cirurgia Torácica | 41 | 26.3 | 14 | Pneumonia Adquirida na Comunidade |
| 93 | Icterícia Neonatal (`ass-ictericia`) | Neonatologia | 42 | 26.2 | 16 | Exame Físico do Recém-Nascido e Tocotraumatismos |
| 94 | Miomatose Uterina (`ass-miomatose`) | Ginecologia Geral | 43 | 26.2 | 14 | Ciclo Menstrual e Distúrbios |
| 95 | Triagem Neonatal (`ass-neo-triagemneonatal`) | Neonatologia | 41 | 24.7 | 17 | Exame Físico do Recém-Nascido e Tocotraumatismos |
| 96 | Desconforto Respiratório do Recém-Nascido (`ass-neo-descrresp`) | Neonatologia | 21 | 14.7 | 9 | Reanimação Neonatal |
| 97 | Doença Renal Crônica (`ass-drc`) | Nefrologia | 40 | 25.1 | 13 | Injúria Renal Aguda; Hipertensão Arterial Sistêmica; Diabetes Mellitus |
| 98 | Próstata (`ass-uro-prostata`) | Urologia | 26 | 16.6 | 12 | Níveis e Estratégias de Prevenção |
| 99 | Políticas Nacionais de Saúde (`ass-politicasnacionais`) | SUS e Políticas de Saúde | 40 | 23.5 | 7 | Princípios e Diretrizes do SUS |
| 100 | Choque e Ultrassom à Beira do Leito (`ass-emerg-choque`) | Medicina de Emergência | 18 | 13.0 | 10 | Distúrbios Hidroeletrolíticos; Atendimento Inicial ao Trauma |
| 101 | Anafilaxia e Reações Alérgicas Graves (`ass-alergia-anafilaxia`) | Alergia e Imunologia | 31 | 18.7 | 14 | Choque e Ultrassom à Beira do Leito |
| 102 | Doença Diverticular (`ass-diverticulite`) | Abdome Agudo | 39 | 23.3 | 12 | Apendicite Aguda |
| 103 | Vasculites e Outras Conectivopatias (`ass-reumato-vasculites`) | Reumatologia | 38 | 23.3 | 15 | Lúpus e Outras Conectivopatias |
| 104 | Meningites (`ass-meningites`) | Infectologia | 41 | 23.1 | 12 | Antibioticoterapia e Resistência |
| 105 | Doença Inflamatória Intestinal (`ass-dii`) | Gastroenterologia | 25 | 15.5 | 12 | Doença Diarreica Aguda e Desidratação |
| 106 | Infertilidade Conjugal (`ass-infertilidade`) | Ginecologia Geral | 39 | 22.9 | 14 | Ciclo Menstrual e Distúrbios; Endometriose |
| 107 | Doenças Orificiais (`ass-coloprocto-orificiais`) | Coloproctologia | 31 | 20.3 | 12 | Anatomia Cirúrgica |
| 108 | HIV/Aids (`ass-hiv`) | Infectologia | 32 | 19.1 | 15 | Infecções Sexualmente Transmissíveis |
| 109 | Vigilância Sanitária e Notificação Compulsória (`ass-vigilanciasanitaria`) | Epidemiologia | 36 | 19.4 | 15 | Vigilância Epidemiológica |
| 110 | Valvopatias (`ass-valvopatias`) | Cardiologia | 29 | 18.1 | 12 | ECG, Arritmias e Síncope |
| 111 | Síndromes Genéticas e Teratógenos (`ass-genetica-sindromes`) | Genética Médica | 32 | 19.2 | 11 | Exame Físico do Recém-Nascido e Tocotraumatismos; Assistência Pré-natal |
| 112 | Câncer de Esôfago e Estômago (`ass-cagastrico`) | Cirurgia Oncológica | 35 | 21.0 | 13 | Doença Péptica; DRGE e Distúrbios Motores do Esôfago |
| 113 | Colangite Aguda e Vias Biliares (`ass-colangite`) | Abdome Agudo | 33 | 20.9 | 14 | Colecistite Aguda |
| 114 | Complicações da Prematuridade e Distúrbios Metabólicos do RN (`ass-neo-prematuridade`) | Neonatologia | 23 | 13.6 | 12 | Desconforto Respiratório do Recém-Nascido; Exame Físico do Recém-Nascido e Tocotraumatismos |
| 115 | Abdome Agudo e Distensão Abdominal do RN (`ass-neo-malformacoesdigestivas`) | Neonatologia | 38 | 23.0 | 11 | Complicações da Prematuridade e Distúrbios Metabólicos do RN; Exame Físico do Recém-Nascido e Tocotraumatismos |
| 116 | Psiquiatria da Infância (`ass-psiq-infantil`) | Psiquiatria | 33 | 20.4 | 12 | Puericultura; Transtornos do Humor |
| 117 | Doenças Neuromusculares, Desmielinizantes e Medulares (`ass-neuro-neuromuscular`) | Neurologia | 33 | 20.1 | 15 | — |
| 118 | Dermatoses Inflamatórias e Autoimunes (`ass-derm-autoimunes`) | Dermatologia | 27 | 17.2 | 12 | Lúpus e Outras Conectivopatias |
| 119 | Convulsão Febril (`ass-convulsaofebril`) | Emergências Pediátricas | 27 | 17.7 | 13 | — |
| 120 | Fraturas e Luxações (`ass-orto-fraturas`) | Ortopedia e Traumatologia | 22 | 13.6 | 8 | Atendimento Inicial ao Trauma |

## Onda 5 — Cauda longa e refinamento (assuntos 121–150 · cobertura acumulada 88%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 121 | Cardiopatias Congênitas (`ass-cardiopatiascongenitas`) | Cardiologia | 33 | 18.6 | 9 | Reanimação Neonatal |
| 122 | Queimaduras (`ass-queimaduras`) | Trauma | 31 | 18.5 | 14 | Atendimento Inicial ao Trauma |
| 123 | Cirurgia Bariátrica e Complicações (`ass-cirbariatrica`) | Abdome Agudo | 28 | 18.5 | 10 | Complicações Cirúrgicas; Diabetes Mellitus |
| 124 | Cuidados Paliativos e Fim de Vida (`ass-cuidadospaliativos`) | Bioética | 31 | 18.4 | 14 | Comunicação e Relação Médico-Paciente |
| 125 | Ventilação Mecânica Invasiva (`ass-vm`) | Pneumologia | 27 | 17.7 | 13 | DPOC; Pneumonia Adquirida na Comunidade |
| 126 | Via Aérea e Indução Anestésica (`ass-anestesio-viaaerea`) | Anestesiologia | 19 | 11.5 | 11 | Cuidados Perioperatórios |
| 127 | Doença Falciforme e Hemoglobinopatias (`ass-hemato-hemoglobinopatias`) | Hematologia | 30 | 18.0 | 13 | Anemias |
| 128 | Litíase Urinária (`ass-uro-litiase`) | Urologia | 29 | 17.9 | 13 | Distúrbios Hidroeletrolíticos |
| 129 | Ginecologia da Infância e Adolescência (`ass-ginecoinfantil`) | Ginecologia Geral | 24 | 15.3 | 13 | Distúrbios do Crescimento e Puberdade |
| 130 | Doença Venosa (`ass-cirvasc-venosa`) | Cirurgia Vascular | 30 | 17.8 | 14 | — |
| 131 | Tromboembolismo Pulmonar e Hipertensão Pulmonar (`ass-tep`) | Pneumologia | 28 | 16.7 | 16 | DPOC |
| 132 | Distúrbios do Cálcio e Paratireoide (`ass-paratireoide`) | Endocrinologia | 19 | 12.9 | 10 | Distúrbios Hidroeletrolíticos |
| 133 | Doença Celíaca, Má Absorção e Intolerância à Lactose (`ass-gastro-malabsorcao`) | Gastroenterologia | 20 | 12.3 | 10 | Doença Inflamatória Intestinal |
| 134 | Transtornos de Ansiedade e TOC (`ass-psiq-ansiedade`) | Psiquiatria | 23 | 14.6 | 8 | Transtornos do Humor |
| 135 | Suspeita de Maus-tratos Infantis (`ass-emergped-maustratos`) | Emergências Pediátricas | 26 | 15.9 | 14 | Puericultura |
| 136 | Polifarmácia no Idoso (`ass-geriatria-polifarmacia`) | Geriatria | 20 | 12.1 | 9 | — |
| 137 | Transtornos por Uso de Substâncias (`ass-psiq-substancias`) | Psiquiatria | 26 | 15.5 | 11 | Transtornos do Humor |
| 138 | Infecções Relacionadas à Assistência (`ass-iras`) | Infectologia | 22 | 14.9 | 11 | Antibioticoterapia e Resistência |
| 139 | Tumores Cutâneos (`ass-derm-tumores`) | Dermatologia | 21 | 12.6 | 9 | — |
| 140 | Malformações do Trato Urinário (`ass-uro-malformacoes`) | Urologia | 17 | 10.6 | 8 | Infecção do Trato Urinário |
| 141 | Hanseníase e Reações Hansênicas (`ass-hanseniase`) | Infectologia | 26 | 14.7 | 10 | Infecções e Infestações de Pele |
| 142 | Neoplasia Pulmonar Cirúrgica (`ass-cirtorax-neoplasia`) | Cirurgia Torácica | 24 | 14.6 | 11 | Níveis e Estratégias de Prevenção |
| 143 | Síndromes Gripais: Influenza, SRAG e Covid-19 (`ass-infecto-covid`) | Infectologia | 30 | 14.2 | 13 | Infecções de Vias Aéreas Superiores; Pneumonia Adquirida na Comunidade |
| 144 | Diagnóstico Pré-natal Invasivo e Rastreamento de Aneuploidias (`ass-diagnosticoprenatal`) | Obstetrícia | 23 | 14.1 | 8 | Assistência Pré-natal |
| 145 | Anestesia Regional e Analgesia (`ass-anestesio-analgesia`) | Anestesiologia | 18 | 10.7 | 10 | Via Aérea e Indução Anestésica |
| 146 | Aneurisma de Aorta (`ass-cirvasc-aneurisma`) | Cirurgia Vascular | 19 | 11.5 | 11 | Isquemia Arterial Aguda e Crônica |
| 147 | Emergências Ambientais (`ass-emerg-ambientais`) | Medicina de Emergência | 25 | 14.0 | 10 | Atendimento Inicial ao Trauma |
| 148 | Genitália Masculina e Disfunção Sexual (`ass-uro-escroto`) | Urologia | 25 | 13.8 | 9 | Malformações do Trato Urinário; Próstata |
| 149 | Parasitoses Intestinais e Esquistossomose (`ass-parasitoses`) | Infectologia | 21 | 12.1 | 11 | — |
| 150 | Câncer de Ovário (`ass-caovario`) | Oncologia Ginecológica | 23 | 13.0 | 13 | Câncer de Endométrio |

## Onda 6 — Raridades e subespecialidades (assuntos 151–180 · cobertura acumulada 94%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 151 | Deficiências Nutricionais e Vitamínicas (`ass-deficvitaminica`) | Gastroenterologia | 21 | 12.8 | 10 | Doença Celíaca, Má Absorção e Intolerância à Lactose |
| 152 | Doenças Osteometabólicas e Displasias (`ass-orto-osteometabolicas`) | Ortopedia e Traumatologia | 20 | 12.5 | 11 | Distúrbios do Cálcio e Paratireoide |
| 153 | Endocardite Infecciosa (`ass-endocardite`) | Infectologia | 19 | 12.3 | 11 | Valvopatias; Antibioticoterapia e Resistência |
| 154 | Vias Aéreas Superiores e Sono (`ass-orl-viasaereas`) | Otorrinolaringologia | 17 | 9.3 | 9 | — |
| 155 | Cessação do Tabagismo (`ass-tabagismo`) | Saúde da Família | 19 | 12.2 | 14 | Níveis e Estratégias de Prevenção |
| 156 | Epilepsia e Crises Convulsivas (`ass-neuro-epilepsia`) | Neurologia | 21 | 12.2 | 9 | — |
| 157 | Ortopedia Pediátrica (`ass-orto-pediatrica`) | Ortopedia e Traumatologia | 23 | 12.1 | 8 | Fraturas e Luxações |
| 158 | Aloimunização Rh e Doença Hemolítica Perinatal (`ass-aloimunizacaorh`) | Obstetrícia | 18 | 11.9 | 11 | Assistência Pré-natal |
| 159 | Olho Vermelho, Conjuntivites e Celulite Orbitária (`ass-oft-olhovermelho`) | Oftalmologia | 15 | 9.4 | 7 | — |
| 160 | Doenças Benignas da Mama (`ass-mamabenigna`) | Ginecologia Geral | 19 | 11.6 | 9 | Câncer de Mama |
| 161 | Fragilidade, Quedas e Perda de Peso (`ass-geriatria-quedas`) | Geriatria | 19 | 11.6 | 10 | Polifarmácia no Idoso; Demência e Delirium |
| 162 | Osteoartrite e Artroplastias (`ass-orto-artrose`) | Ortopedia e Traumatologia | 14 | 8.6 | 9 | Artrite Reumatoide e Espondiloartrites |
| 163 | Complicações Anestésicas (`ass-anestesio-complicacoes`) | Anestesiologia | 19 | 11.2 | 8 | Anestesia Regional e Analgesia |
| 164 | Tumores do Sistema Nervoso Central (`ass-neurocir-tumores`) | Neurocirurgia | 18 | 11.1 | 7 | Traumatismo Cranioencefálico |
| 165 | Nódulos Hepáticos (`ass-hepato-nodulos`) | Gastroenterologia | 17 | 11.0 | 8 | Cirrose e Complicações |
| 166 | Doenças da Hipófise (`ass-hipofise`) | Endocrinologia | 16 | 9.3 | 9 | Tireoidopatias; Distúrbios Adrenais |
| 167 | Violência Sexual e Aborto Legal (`ass-violenciasexual`) | Ginecologia Geral | 18 | 10.9 | 12 | Métodos Contraceptivos |
| 168 | Alergia Alimentar (`ass-alergia-alimentar`) | Alergia e Imunologia | 12 | 8.7 | 9 | Anafilaxia e Reações Alérgicas Graves |
| 169 | Modelos de Gestão em Saúde (`ass-gestaosaude`) | SUS e Políticas de Saúde | 17 | 10.6 | 10 | Financiamento do SUS e Saúde Suplementar |
| 170 | Infecções de Pele e Partes Moles (`ass-peleparte`) | Infectologia | 18 | 10.6 | 10 | Infecções e Infestações de Pele |
| 171 | Tumores Sólidos da Infância (`ass-oncopediatrica`) | Cirurgia Oncológica | 17 | 10.6 | 10 | Neoplasias Hematológicas |
| 172 | Corpo Estranho em Vias Aéreas e Digestivas (`ass-emergped-corpoestranho`) | Emergências Pediátricas | 16 | 10.6 | 11 | Insuficiência Respiratória e PCR em Pediatria |
| 173 | Artrites por Cristais (`ass-reumato-cristais`) | Reumatologia | 18 | 10.3 | 13 | Artrite Reumatoide e Espondiloartrites |
| 174 | Cefaleias (`ass-neuro-cefaleias`) | Neurologia | 17 | 10.2 | 11 | — |
| 175 | Restrição de Crescimento Fetal (`ass-restricaocrescimento`) | Obstetrícia | 16 | 10.2 | 8 | Vitalidade Fetal, Líquido Amniótico e Indução do Parto |
| 176 | Dor Pélvica Aguda e Massas Pélvicas (`ass-dorpelvica`) | Ginecologia Geral | 16 | 9.9 | 9 | Endometriose; Abortamento |
| 177 | Neoplasias Urológicas (`ass-uro-oncologia`) | Urologia | 16 | 9.6 | 9 | Próstata |
| 178 | Câncer de Pâncreas e Tumores Periampulares (`ass-capancreas`) | Cirurgia Oncológica | 16 | 9.4 | 11 | Pancreatite Aguda |
| 179 | Política de Medicamentos e Tecnologias (`ass-farmacovigilancia`) | SUS e Políticas de Saúde | 15 | 9.3 | 9 | Financiamento do SUS e Saúde Suplementar; Vigilância Sanitária e Notificação Compulsória |
| 180 | Doenças do Pericárdio (`ass-pericardio`) | Cardiologia | 16 | 9.3 | 10 | ECG, Arritmias e Síncope |

## Onda 7 — Cauda longa (pouca demanda) (assuntos 181–210 · cobertura acumulada 99%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 181 | Psicoses e Esquizofrenia (`ass-psiq-psicoses`) | Psiquiatria | 15 | 9.1 | 7 | Transtornos do Humor |
| 182 | Doenças Degenerativas e Infecciosas da Coluna Vertebral (`ass-orto-coluna`) | Ortopedia e Traumatologia | 14 | 8.9 | 10 | Osteoartrite e Artroplastias |
| 183 | Farmacodermias (`ass-derm-farmacodermias`) | Dermatologia | 13 | 8.8 | 7 | Dermatoses Inflamatórias e Autoimunes |
| 184 | Tontura e Vertigem (`ass-neuro-vertigem`) | Neurologia | 13 | 8.7 | 10 | Vias Aéreas Superiores e Sono |
| 185 | Transmissão Vertical do HIV e Diagnóstico Neonatal (`ass-transmissaoverticalhiv`) | Neonatologia | 13 | 8.6 | 7 | HIV/Aids; Assistência Pré-natal |
| 186 | Desordens do Desenvolvimento Sexual e Malformações Müllerianas (`ass-ddsmalformacoes`) | Ginecologia Geral | 16 | 8.4 | 8 | Ginecologia da Infância e Adolescência |
| 187 | Dissecção de Aorta (`ass-cirvasc-disseccao`) | Cirurgia Vascular | 13 | 8.3 | 8 | Aneurisma de Aorta; Hipertensão Arterial Sistêmica |
| 188 | Tumores de Cabeça e Pescoço (`ass-cabecapescoco`) | Cirurgia Oncológica | 12 | 8.2 | 8 | Níveis e Estratégias de Prevenção |
| 189 | Sepse Neonatal (`ass-sepseneonatal`) | Neonatologia | 15 | 8.2 | 11 | Infecções Perinatais |
| 190 | Coma, Reflexos de Tronco e Morte Encefálica (`ass-neuro-coma`) | Neurologia | 14 | 8.1 | 9 | Acidente Vascular Cerebral |
| 191 | Constipação Intestinal (`ass-gastro-constipacao`) | Gastroenterologia | 15 | 7.7 | 11 | Doenças Orificiais |
| 192 | Perfuração Esofágica (`ass-cirtorax-esofago`) | Cirurgia Torácica | 13 | 7.6 | 7 | DRGE e Distúrbios Motores do Esôfago |
| 193 | Gestação Múltipla (`ass-gestacaomultipla`) | Obstetrícia | 13 | 7.6 | 8 | Assistência Pré-natal |
| 194 | Melanoma Cutâneo (`ass-cironco-melanoma`) | Cirurgia Oncológica | 12 | 7.5 | 6 | Tumores Cutâneos |
| 195 | Imunodeficiências Primárias (`ass-imunodeficiencias`) | Alergia e Imunologia | 13 | 7.3 | 8 | Alergia Alimentar |
| 196 | Doenças Pulmonares Intersticiais e Pneumonites (`ass-pneumo-intersticiais`) | Pneumologia | 12 | 7.3 | 6 | DPOC |
| 197 | Infecções Osteoarticulares (`ass-orto-infeccoes`) | Ortopedia e Traumatologia | 13 | 7.1 | 9 | Antibioticoterapia e Resistência |
| 198 | Marcadores Tumorais e Rastreamento do Câncer (`ass-marcadorestumorais`) | Cirurgia Oncológica | 12 | 6.1 | 6 | Níveis e Estratégias de Prevenção |
| 199 | Febre sem Foco no Lactente (`ass-febrelactente`) | Emergências Pediátricas | 10 | 6.7 | 6 | Convulsão Febril |
| 200 | Bronquiectasias (`ass-pneumo-bronquiectasias`) | Pneumologia | 10 | 6.6 | 8 | DPOC |
| 201 | Hidrocefalia (`ass-neurocir-hidrocefalia`) | Neurocirurgia | 12 | 6.6 | 6 | Traumatismo Cranioencefálico |
| 202 | Febre Entérica e Toxinfecções Alimentares (`ass-toxinfeccao`) | Infectologia | 10 | 6.3 | 6 | Doença Diarreica Aguda e Desidratação |
| 203 | Antissepsia, Paramentação, Posicionamento e Biossegurança (`ass-toce-antissepsia`) | Técnica Operatória e Cirurgia Experimental | 6 | 3.5 | 6 | — |
| 204 | Parada Cardiorrespiratória e RCP (`ass-pcr`) | Cardiologia | 11 | 6.0 | 9 | ECG, Arritmias e Síncope |
| 205 | Glaucoma (`ass-oft-glaucoma`) | Oftalmologia | 10 | 5.8 | 5 | Olho Vermelho, Conjuntivites e Celulite Orbitária |
| 206 | Tumores Neuroendócrinos e Síndromes Hormonais (`ass-neuroendocrinos`) | Endocrinologia | 10 | 5.8 | 5 | Distúrbios Adrenais; Doenças da Hipófise |
| 207 | Distúrbios do Movimento (`ass-neuro-movimento`) | Neurologia | 10 | 5.7 | 7 | — |
| 208 | Protozooses (`ass-leishmaniose`) | Infectologia | 10 | 5.5 | 6 | Arboviroses; Insuficiência Cardíaca; ECG, Arritmias e Síncope; Parasitoses Intestinais e Esquistossomose |
| 209 | Doença Trofoblástica Gestacional (`ass-doencatrofoblastica`) | Oncologia Ginecológica | 9 | 5.4 | 7 | Abortamento |
| 210 | Febre Reumática (`ass-reumato-febrereumatica`) | Reumatologia | 8 | 4.6 | 5 | Infecções de Vias Aéreas Superiores |

## Onda 8 — Cauda longa (pouca demanda) (assuntos 211–237 · cobertura acumulada 100%)

| # | Assunto | Especialidade | Questões reais | Demanda | Bancas | Depois de |
|---:|---|---|---:|---:|---:|---|
| 211 | Padrões de Herança Genética (`ass-genetica-heranca`) | Genética Médica | 6 | 3.3 | 2 | Síndromes Genéticas e Teratógenos |
| 212 | Zoonoses por Vetores e Febres Hemorrágicas (`ass-febremaculosa`) | Infectologia | 7 | 4.3 | 6 | Arboviroses |
| 213 | Incisões, Vias de Acesso, Drenos e Curativos (`ass-toce-incisoes`) | Técnica Operatória e Cirurgia Experimental | 7 | 3.7 | 6 | Antissepsia, Paramentação, Posicionamento e Biossegurança; Anatomia Cirúrgica; Complicações Cirúrgicas |
| 214 | Abdome Agudo e Sangramento Digestivo na Infância (`ass-intussuscepcao`) | Emergências Pediátricas | 9 | 4.3 | 7 | Apendicite Aguda; Doença Diarreica Aguda e Desidratação |
| 215 | Lesões Articulares e Ligamentares (`ass-orto-ombro`) | Ortopedia e Traumatologia | 8 | 4.1 | 5 | Fraturas e Luxações |
| 216 | Erros Inatos do Metabolismo (`ass-genetica-erros-inatos`) | Genética Médica | 7 | 3.9 | 2 | Padrões de Herança Genética; Triagem Neonatal |
| 217 | Retina e Perda Visual (`ass-oft-retina`) | Oftalmologia | 4 | 2.4 | 4 | Diabetes Mellitus |
| 218 | Acesso Vascular Central e Complicações (`ass-acessovenoso`) | Pré e Pós-operatório | 7 | 3.5 | 5 | Cuidados Perioperatórios |
| 219 | Leptospirose (`ass-leptospirose`) | Infectologia | 5 | 3.1 | 5 | Arboviroses |
| 220 | Instrumental, Hemostasia e Eletrocirurgia (`ass-toce-instrumental`) | Técnica Operatória e Cirurgia Experimental | 5 | 3.1 | 4 | Fios, Suturas e Cicatrização; Antissepsia, Paramentação, Posicionamento e Biossegurança |
| 221 | Ametropias e Refração (`ass-oft-refracao`) | Oftalmologia | 3 | 1.9 | 2 | — |
| 222 | Catarata, Leucocoria e Tumores Intraoculares (`ass-oft-catarata`) | Oftalmologia | 7 | 4.1 | 4 | Ametropias e Refração; Retina e Perda Visual |
| 223 | Câncer de Vulva (`ass-cavulva`) | Oncologia Ginecológica | 5 | 3.1 | 5 | Câncer de Colo do Útero |
| 224 | Trauma Nasal e Facial (`ass-orl-fratura`) | Otorrinolaringologia | 4 | 2.5 | 3 | Atendimento Inicial ao Trauma |
| 225 | Transtornos de Personalidade (`ass-psiq-personalidade`) | Psiquiatria | 4 | 2.5 | 3 | Transtornos de Ansiedade e TOC |
| 226 | Trauma e Urgências Oculares (`ass-oft-trauma`) | Oftalmologia | 5 | 2.4 | 3 | Olho Vermelho, Conjuntivites e Celulite Orbitária |
| 227 | Sarcomas de Partes Moles (`ass-cironco-sarcomas`) | Cirurgia Oncológica | 4 | 2.4 | 3 | Marcadores Tumorais e Rastreamento do Câncer |
| 228 | Estenose Traqueal e Vias Aéreas Centrais (`ass-cirtorax-viaaerea`) | Cirurgia Torácica | 4 | 2.3 | 2 | Ventilação Mecânica Invasiva |
| 229 | Transtornos Alimentares (`ass-psiq-alimentar`) | Psiquiatria | 4 | 2.3 | 4 | Transtornos de Ansiedade e TOC |
| 230 | Micoses Sistêmicas e Oportunistas (`ass-micosesinvasivas`) | Infectologia | 4 | 2.3 | 2 | HIV/Aids |
| 231 | Princípios de Videolaparoscopia (`ass-toce-video`) | Técnica Operatória e Cirurgia Experimental | 4 | 2.1 | 3 | Incisões, Vias de Acesso, Drenos e Curativos |
| 232 | Saúde Planetária e Mudanças Climáticas (`ass-saudeplanetaria`) | Saúde da Família | 3 | 2.0 | 1 | Vigilância Epidemiológica |
| 233 | Violência e Maus-tratos contra o Idoso (`ass-geriatria-maustratos`) | Geriatria | 3 | 2.0 | 3 | Demência e Delirium |
| 234 | Benefícios Sociais e Previdenciários (`ass-assistenciasocial`) | Saúde da Família | 3 | 1.9 | 3 | Estratégia Saúde da Família |
| 235 | Lesões do Plexo Braquial (`ass-neurocir-plexobraquial`) | Neurocirurgia | 2 | 1.2 | 2 | Fraturas e Luxações |
| 236 | Glândulas Salivares e Massas Cervicais (`ass-orl-glandulas`) | Otorrinolaringologia | 2 | 1.2 | 2 | Vias Aéreas Superiores e Sono |
| 237 | Neutropenia Febril e Febre de Origem Indeterminada (`ass-neutropeniafebril`) | Infectologia | 2 | 0.8 | 1 | Neoplasias Hematológicas; Antibioticoterapia e Resistência |

## Peso de cada especialidade e onde ela se espalha na sequência

| Especialidade | % das questões | Assuntos | 1º assunto na posição | último na posição |
|---|---:|---:|---:|---:|
| Obstetrícia | 8.9% | 13 | 3 | 193 |
| Infectologia | 8.1% | 21 | 7 | 237 |
| Epidemiologia | 7.0% | 6 | 2 | 109 |
| Ginecologia Geral | 5.3% | 11 | 1 | 186 |
| Abdome Agudo | 4.8% | 8 | 27 | 123 |
| Cardiologia | 4.7% | 9 | 8 | 204 |
| Neonatologia | 3.6% | 10 | 15 | 189 |
| Gastroenterologia | 3.5% | 9 | 36 | 191 |
| Saúde da Família | 3.3% | 6 | 20 | 234 |
| Crescimento e Desenvolvimento | 3.2% | 3 | 4 | 44 |
| Endocrinologia | 3.2% | 6 | 12 | 206 |
| Trauma | 3.0% | 4 | 6 | 122 |
| SUS e Políticas de Saúde | 2.9% | 6 | 9 | 179 |
| Oncologia Ginecológica | 2.9% | 6 | 28 | 223 |
| Pneumologia | 2.5% | 7 | 21 | 200 |
| Infectologia Pediátrica | 2.5% | 4 | 34 | 76 |
| Nefrologia | 2.3% | 4 | 5 | 97 |
| Hematologia | 2.3% | 4 | 24 | 127 |
| Neurologia | 1.8% | 7 | 46 | 207 |
| Cirurgia Oncológica | 1.8% | 8 | 78 | 227 |
| Psiquiatria | 1.7% | 7 | 40 | 229 |
| Emergências Pediátricas | 1.7% | 6 | 33 | 214 |
| Pré e Pós-operatório | 1.6% | 3 | 18 | 218 |
| Reumatologia | 1.5% | 5 | 31 | 210 |
| Bioética | 1.4% | 3 | 57 | 124 |
| Ortopedia e Traumatologia | 1.3% | 7 | 120 | 215 |
| Dermatologia | 1.3% | 4 | 55 | 183 |
| Urologia | 1.3% | 5 | 98 | 177 |
| Cirurgia Vascular | 1.2% | 4 | 77 | 187 |
| Medicina de Emergência | 1.1% | 3 | 75 | 147 |
| Técnica Operatória e Cirurgia Experimental | 1.1% | 6 | 59 | 231 |
| Planejamento Familiar | 1.1% | 1 | 25 | 25 |
| Geriatria | 1.0% | 4 | 79 | 233 |
| Neurocirurgia | 1.0% | 4 | 64 | 235 |
| Cirurgia Torácica | 0.9% | 4 | 92 | 228 |
| Alergia e Imunologia | 0.6% | 3 | 101 | 195 |
| Anestesiologia | 0.6% | 3 | 126 | 163 |
| Genética Médica | 0.5% | 3 | 111 | 216 |
| Oftalmologia | 0.5% | 6 | 159 | 226 |
| Coloproctologia | 0.4% | 1 | 107 | 107 |
| Otorrinolaringologia | 0.3% | 3 | 154 | 236 |

## Lacunas que afetam o calendário

Assuntos com **menos de 3 questões reais** (ficam no fim, mas o aluno quase não tem o que praticar neles): `ass-neurocir-plexobraquial` (2), `ass-orl-glandulas` (2), `ass-neutropeniafebril` (2).
