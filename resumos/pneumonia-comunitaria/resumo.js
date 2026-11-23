/* resumos/pneumonia-comunitaria/resumo.js — resumo adaptativo de pneumonia no adulto: diagnóstico e gravidade da PAC (CURB-65, ATS/IDSA),
   etiologia (pneumococo, atípicas, Legionella, S. aureus pós-influenza), tratamento ambulatorial, de enfermaria e de UTI,
   derrame parapneumônico e empiema, aspiração e abscesso, pneumonia hospitalar e associada à ventilação.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- pneumonia-comunitaria */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "pneumonia-comunitaria",
  titulo: "Pneumonia no adulto",
  assunto: "ass-pneumonia",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "dir-sbpt-pac", texto: "Sociedade Brasileira de Pneumologia e Tisiologia — Diretrizes Brasileiras para Pneumonia Adquirida na Comunidade em Adultos Imunocompetentes (2009; atualização de 2018)", lidoEm: null },
    { id: "ats-idsa-pac", texto: "ATS/IDSA — Diagnosis and Treatment of Adults with Community-acquired Pneumonia (2019)", lidoEm: null },
    { id: "idsa-ats-pah", texto: "IDSA/ATS — Management of Adults with Hospital-acquired and Ventilator-associated Pneumonia (2016) e diretriz brasileira de pneumonia hospitalar e associada à ventilação", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anuladas pela banca (o escore ou o gabarito do material de origem não fecha com o caso, ou há duas respostas defensáveis)", questoes: ["q-gdpneumonias-004","q-gdpneumonias-007","q-gdpneumonias-017","q-gdpneumonias-033","q-gdpneumonias-067","q-gdpneumonias-095","q-gdpneumonias-118","q-gdantibioticos-075","q-gdantibioticos-114"] },
  ],
  doencas: [
    {
      id: "diagnostico-gravidade", titulo: "Diagnóstico e gravidade da PAC",
      introducao: `A **pneumonia adquirida na comunidade (PAC)** é a infecção do parênquima pulmonar que começa **fora do hospital ou até 48 horas depois da admissão**. [[O alvéolo cheio de exsudato dá **febre, tosse com secreção, dor pleurítica, estertores crepitantes e opacidade na radiografia**; e a **gravidade** (e não só o agente) decide **onde tratar e com que antibiótico**, pelo **CURB-65** ou pelos critérios da **ATS/IDSA**.|q-gdpneumonias-003,q-gdpneumonias-014,q-gdpneumonias-023]]

Veja também: **Meningites e encefalites** (pneumococo), **HIV/aids** (pneumocistose), **Pneumonia, bronquiolite e coqueluche na criança**, **Sepse**, **Imunização** (vacina pneumocócica) e **Tuberculose**.`,
      fragmentos: [
        { id: "pac-dx", titulo: "Definição, diagnóstico por imagem e exames", conferir: true, diretrizes: ["dir-sbpt-pac"],
          casos: ["q-usp2025-087","q-tp20231-027","q-uspsp2-004"],
          questoes: ["q-iamspe2026-008","q-gdpneumonias-003","q-gdpneumonias-114","q-gdpneumonias-015","q-gdpneumonias-029","q-gdpneumonias-124","q-gdpneumonias-051","q-gdpneumonias-125","q-gdpneumonias-023","q-gdpneumonias-019","q-gdpneumonias-025","q-gdpneumonias-073","q-usp2025-087","q-tp20231-027","q-uspsp2-004","q-gdpneumonias-128","q-gdpneumonias-078","q-gdpneumonias-132"],
          prosa: `[[A **PAC** é a que ocorre **fora do hospital ou em até 48 horas da admissão**, e **não aparece no 5º dia de internação** (isso é pneumonia hospitalar); o diagnóstico começa na **história e no exame** (febre, tosse produtiva, dor pleurítica, **síndrome de condensação**: macicez, frêmito aumentado, estertores e pectorilóquia) **com a radiografia de tórax**, que é o exame inicial; o padrão radiológico **não distingue com segurança o agente**.|q-iamspe2026-008,q-gdpneumonias-003,q-gdpneumonias-114,q-gdpneumonias-029,q-tp20231-027,q-usp2025-087]] [[A **tomografia** é mais sensível que a radiografia, e pode **não confirmar** a pneumonia em quem tinha opacidade na radiografia; no **paciente ambulatorial** a radiografia é **o único exame necessário**, e a **hemocultura** fica para a **PAC grave** e para o internado que **não responde**; no **idoso** o quadro é **atípico** (delirium, queda, ausência de febre) e a **taquipneia** é o sinal mais sensível.|q-gdpneumonias-015,q-gdpneumonias-124,q-gdpneumonias-051,q-gdpneumonias-125,q-gdpneumonias-023,q-uspsp2-004]] [[A **imagem melhora mais devagar que o quadro clínico** (semanas): a radiografia residual de quem está assintomático é só **observada**; a **radiografia de controle** se faz **4 a 6 semanas depois da alta**, sobretudo em **fumantes com mais de 50 anos**, porque a persistência além de 6 semanas pede **investigação** (neoplasia obstrutiva); e entre os agentes recentes de PAC estão os **vírus** (hantavírus, metapneumovírus, coronavírus), com cuidado quando a radiografia mostra **multilobar, derrame, cavitação** (complicações).|q-gdpneumonias-019,q-gdpneumonias-025,q-gdpneumonias-073,q-gdpneumonias-029,q-gdpneumonias-128,q-gdpneumonias-078,q-gdpneumonias-132]]`,
          texto: `- Adulto hígido com febre, calafrios, tosse, dispneia, dor torácica e opacidade focal: **considerar PAC e confirmar com radiografia**. {q-iamspe2026-008}
- **PAC** é a que ocorre fora do hospital ou em até 48 horas da admissão; a nosocomial, depois. {q-gdpneumonias-003}
- A PAC **não** se manifesta até o quinto dia de internação (item errado). {q-gdpneumonias-114}
- **TC** detecta mais pneumonia, mas pode **não confirmar** a doença em quem tinha opacidade na radiografia. {q-gdpneumonias-015}
- Radiografia é o **método inicial**; o padrão **não** define o agente; alterações persistem até 6 semanas; fumante com mais de 50 anos repete a imagem. {q-gdpneumonias-029}
- Paciente ambulatorial: **radiografia** como único exame subsidiário. {q-gdpneumonias-124}
- **Hemocultura** para PAC grave e internado que não responde. {q-gdpneumonias-051}
- No idoso: delirium, queda e sem febre; **taquipneia** é o sinal mais sensível. {q-gdpneumonias-125}
- Avaliação inicial: **exame clínico** (consciência, taquipneia, hipotensão) e **condições socioeconômicas**. {q-gdpneumonias-023}
- Imagem residual com paciente assintomático após 2 semanas: **observar**. {q-gdpneumonias-019}
- Resolução radiológica é **mais lenta** que a clínica; repetir em ~6 semanas em fumantes acima de 50 anos. {q-gdpneumonias-025}
- Radiografia de controle: **4 a 6 semanas após a alta**. {q-gdpneumonias-073}
- Persistência de alteração após 6 semanas exige investigação; ureia acima de 65 indica gravidade; PCR que não cai 50 % em 3 a 4 dias sugere falha. {q-gdpneumonias-128}
- Agentes recentes de PAC: **hantavírus, metapneumovírus e coronavírus**. {q-gdpneumonias-078}
- Complicações a procurar na radiografia: multilobar, derrame, cavitação. {q-gdpneumonias-132}
- Pneumonia do lobo inferior esquerdo: no **perfil** perde-se a transparência da coluna sobre a consolidação. {q-usp2025-087}
- Jovem com dor pleurítica e condensação direita: **percussão maciça, frêmito aumentado, estertores e pectorilóquia**. {q-tp20231-027}
- Tosse seca, febre e consolidação em mulher hígida em bom estado: **sem exames específicos, tratamento empírico**. {q-uspsp2-004}` },
        { id: "pac-escores", titulo: "CURB-65, CRB-65 e critérios da ATS/IDSA", conferir: true, diretrizes: ["dir-sbpt-pac","ats-idsa-pac"],
          figuras: [{ arquivo: "figuras/gravidade-e-conduta.svg", legenda: "Esquema autoral: onde tratar e com que antibiótico segundo a gravidade." }],
          questoes: ["q-adap25-038","q-adap26-038","q-unifesp2025-038","q-fmabc2022-020","q-sessp2024-019","q-gdpneumonias-014","q-gdpneumonias-052","q-gdpneumonias-053","q-gdpneumonias-056","q-gdpneumonias-107","q-gdpneumonias-136","q-gdpneumonias-117","q-gdpneumonias-134","q-gdpneumonias-035"],
          prosa: `[[O **CURB-65** soma 1 ponto para **confusão, ureia acima de 43 mg/dL, frequência respiratória de 30 ou mais, pressão baixa (sistólica abaixo de 90 ou diastólica de 60 ou menos) e idade de 65 anos ou mais**; **febre alta e frequência cardíaca não entram**; ele estima a **mortalidade e o local de tratamento** (0 a 1, ambulatório; 2, enfermaria; 3 ou mais, UTI), e o **CRB-65** (sem ureia) serve à atenção primária.|q-gdpneumonias-014,q-gdpneumonias-053,q-gdpneumonias-107,q-gdpneumonias-052,q-gdpneumonias-056,q-gdpneumonias-035,q-gdpneumonias-117,q-gdpneumonias-134,q-unifesp2025-038,q-fmabc2022-020]] [[A **ATS/IDSA** define **pneumonia grave** por **1 critério maior** (ventilação mecânica invasiva ou choque com vasopressor) **ou 3 ou mais critérios menores** (frequência respiratória de 30 ou mais, **PaO2/FiO2 de 250 ou menos**, infiltrado multilobar, confusão, ureia alta, leucopenia, plaquetopenia, hipotermia e hipotensão); a **cianose** só aparece com pelo menos 5 g/dL de hemoglobina reduzida, e por isso, **em quem tem anemia**, a cianose discreta já indica hipoxemia intensa.|q-adap25-038,q-adap26-038,q-gdpneumonias-136,q-sessp2024-019]]`,
          texto: `- DPOC de 68 anos com FR de 32, SpO2 de 88 % e confusão: **pneumonia grave por 3 ou mais critérios menores**, UTI. {q-adap25-038}
- Homem de 62 anos com PA 98x60, FR 34 e PaO2/FiO2 de 210: **ceftriaxona com azitromicina e UTI** (6 critérios menores). {q-adap26-038}
- Homem de 67 anos com ureia de 70, FR de 32 e PA de 110/70: **CURB-65 = 3, tratamento hospitalar**. {q-unifesp2025-038}
- Idoso de asilo, confuso, FR alta e função renal baixa: **UTI, com cerca de 22 % de mortalidade**. {q-fmabc2022-020}
- Paciente mais grave: **cianose discreta com hemoglobina de 8,1** (cianose exige hemoglobina reduzida). {q-sessp2024-019}
- O CURB-65 serve para a **mortalidade e o local de tratamento**. {q-gdpneumonias-014}
- Confusão, FR acima de 30 e hipotensão: **gravidade**. {q-gdpneumonias-052}
- **Frequência cardíaca** não faz parte do CURB-65. {q-gdpneumonias-053}
- Ambulatorial: acima de 65 anos com **FR baixa, estabilidade e sem confusão**. {q-gdpneumonias-056}
- **Hipertermia** acima de 40 °C não é critério de gravidade. {q-gdpneumonias-107}
- Critério menor da ATS/IDSA: **PaO2/FiO2 abaixo de 250**. {q-gdpneumonias-136}
- Homem de 69 anos com CURB-65 = 3: **UTI, hemocultura, hidratação e ceftriaxona**. {q-gdpneumonias-117}
- Idoso de 76 anos com confusão, ureia de 68 e plaquetas de 98.000: **internação em UTI**. {q-gdpneumonias-134}
- Idoso de asilo com FR de 32 (CURB-65 de 2): **antibiótico e internação em enfermaria**. {q-gdpneumonias-035}` },
      ],
    },
    {
      id: "etiologia", titulo: "Etiologia por situação",
      introducao: `[[O **pneumococo** é o agente mais frequente da pneumonia comunitária e da lobar do adulto jovem, e o resto da lista (**Haemophilus**, **atípicos**, **vírus**) depende do hospedeiro e da exposição.|q-gdpneumonias-106,q-gdpneumonias-085,q-gdpneumonias-030]]`,
      fragmentos: [
        { id: "pac-etiologia", titulo: "Pneumococo e os agentes mais frequentes", conferir: true, diretrizes: ["dir-sbpt-pac"],
          questoes: ["q-gdpneumonias-030","q-gdpneumonias-034","q-gdpneumonias-045","q-gdpneumonias-054","q-gdpneumonias-074","q-gdpneumonias-085","q-gdpneumonias-091","q-gdpneumonias-106","q-gdpneumonias-109","q-gdpneumonias-110","q-gdpneumonias-111","q-gdpneumonias-123","q-gdpneumonias-093","q-gdpneumonias-010","q-gdpneumonias-063","q-gdpneumonias-142","q-gdpneumonias-016","q-sessp2022-010","q-gdpneumonias-027","q-gdantibioticos-027"],
          prosa: `[[O **Streptococcus pneumoniae** é o agente mais frequente da PAC em adultos (jovem sem comorbidade, idoso da comunidade com início abrupto, diabético e DPOC sem antibiótico recente) e causa a **lobar** com dor pleurítica, calafrios e escarro ferruginoso; os **típicos** mais frequentes são **pneumococo e Haemophilus influenzae**, e os **atípicos** vêm em segundo lugar entre os internados, pelo **Mycoplasma**.|q-gdpneumonias-106,q-gdpneumonias-085,q-gdpneumonias-030,q-gdpneumonias-034,q-gdpneumonias-045,q-gdpneumonias-054,q-gdpneumonias-074,q-gdpneumonias-109,q-gdpneumonias-111,q-gdpneumonias-091,q-gdpneumonias-110,q-gdpneumonias-123,q-gdpneumonias-142,q-gdpneumonias-010,q-gdpneumonias-063]] [[O **jovem hígido em choque séptico** por pneumonia tem **pneumococo**, e a confirmação é pelo **antígeno urinário**; o **etilista ou morador de rua**, com pneumonia grave, tem **Legionella, pneumococo e Pseudomonas** entre os possíveis; e o antibiótico que cobre **só pneumococo e Haemophilus** (cefalosporina de terceira geração sem macrolídeo) deixa **atípicos** sem cobertura.|q-gdpneumonias-093,q-gdpneumonias-016,q-gdpneumonias-027,q-gdantibioticos-027,q-sessp2022-010]]`,
          texto: `- Agentes mais prováveis em imunocompetentes: **pneumococo, Mycoplasma, Chlamydia e Haemophilus**. {q-gdpneumonias-030}
- Adulto de 45 anos hígido, início agudo e dor pleurítica: **Streptococcus pneumoniae**. {q-gdpneumonias-034}
- Idoso diabético com consolidação lobar e broncograma: **pneumococo**. {q-gdpneumonias-045}
- Idoso da comunidade com início abrupto, calafrios e confusão: **pneumococo**. {q-gdpneumonias-054}
- Adulta de 42 anos sem comorbidade nem internação: **S. pneumoniae**. {q-gdpneumonias-074}
- Estudos de soroprevalência apontam o **pneumococo** como o mais associado. {q-gdpneumonias-085}
- Típicos mais frequentes: **pneumococo e Haemophilus influenzae**. {q-gdpneumonias-091,q-gdpneumonias-111}
- O agente mais frequente de pneumonia bacteriana no adulto: **pneumococo**. {q-gdpneumonias-106}
- Diabético com DPOC, vacina em atraso: **pneumococo**. {q-gdpneumonias-109}
- Agentes: pneumococo, Mycoplasma, Haemophilus e vírus (influenza, adenovírus). {q-gdpneumonias-110}
- Jovem com pneumonia e bacterioscopia: **pneumococo, escarro e hemoculturas**. {q-gdpneumonias-123}
- Idoso grave desorientado: **Streptococcus pneumoniae**. {q-gdpneumonias-142}
- Jovem em choque séptico: **pneumococo; antígeno urinário**. {q-gdpneumonias-093}
- Idosa grave: pneumococo e, em estudos brasileiros, **Mycoplasma como o segundo agente** isolado. {q-gdpneumonias-010}
- Agentes típicos: **S. pneumoniae e Klebsiella**. {q-gdpneumonias-063}
- Morador de rua etilista grave: **Legionella, pneumococo e Pseudomonas**. {q-gdpneumonias-016}
- Idoso com confusão e PA de 80x62: **pneumococo, ceftriaxona com claritromicina**. {q-sessp2022-010}
- Cefotaxima sem macrolídeo cobre **pneumococo e Haemophilus**. {q-gdpneumonias-027,q-gdantibioticos-027}` },
        { id: "atipicas", titulo: "Atípicas: Mycoplasma, Legionella e quem eles pedem", conferir: true, diretrizes: ["dir-sbpt-pac"],
          questoes: ["q-unifesp2022-072","q-gdpneumonias-002","q-gdpneumonias-021","q-gdpneumonias-022","q-gdpneumonias-037","q-gdpneumonias-041","q-gdpneumonias-046","q-gdpneumonias-068","q-gdpneumonias-086","q-gdpneumonias-090","q-gdpneumonias-103","q-gdpneumonias-083","q-gdpneumonias-119","q-gdpneumonias-122","q-gdpneumonias-048","q-fmabc2026-017","q-gdantibioticos-039","q-gdantibioticos-045","q-gdantibioticos-090"],
          prosa: `[[O ***Mycoplasma pneumoniae*** **não tem parede celular** e a ***Legionella*** e a ***Chlamydophila*** são **intracelulares**: por isso **betalactâmicos (amoxicilina-clavulanato, meropenem) não funcionam** e se usam **macrolídeo, quinolona ou tetraciclina**; o ***Mycoplasma*** dá **tosse seca em crises, bom estado geral, faringite e infiltrado reticulonodular**, em jovem, com evolução arrastada, e **anemia hemolítica** é a complicação hematológica típica, mas **não é a etiologia mais frequente de pneumonia no adolescente** (o pneumococo continua).|q-gdpneumonias-090,q-gdpneumonias-103,q-gdantibioticos-090,q-gdpneumonias-083,q-unifesp2022-072,q-gdpneumonias-119,q-gdpneumonias-068,q-gdpneumonias-041,q-gdpneumonias-021,q-gdpneumonias-022,q-gdantibioticos-039]] [[A ***Legionella*** vive em **água morna estagnada** (torres de resfriamento, **ar-condicionado**), por isso aparece em **surtos no mesmo ambiente**, com **tosse seca, febre alta, mialgia, diarreia ou dor abdominal, hiponatremia e confusão**, e se trata com **macrolídeo ou quinolona**; e a combinação de **cobertura de típicos e atípicos** é a razão de se usar **macrolídeo** (50S) no esquema da PAC.|q-gdpneumonias-046,q-gdantibioticos-045,q-gdpneumonias-086,q-gdpneumonias-037,q-gdpneumonias-002,q-fmabc2026-017,q-gdpneumonias-122]] [[Correlação agente × antibiótico: estreptococo do grupo B, **ampicilina**; ***Chlamydia trachomatis*** (lactente), **azitromicina ou clindamicina**; ***S. aureus*** sensível, **oxacilina**; ***Moraxella***, produtora de betalactamase, com **associação de inibidor**.|q-gdpneumonias-048]]`,
          texto: `- Mycoplasma na criança: **crises de tosse seca, bom estado geral e faringite**. {q-unifesp2022-072}
- Distúrbio mais presente na pneumonia por *Legionella*: **hiponatremia**. {q-gdpneumonias-002}
- Atípicos mais frequentes: **Mycoplasma e Chlamydophila**. {q-gdpneumonias-021}
- Infiltrado peribroncovascular em dois lobos: tratar **também atípicos**. {q-gdpneumonias-022}
- Fumante com mialgia, dor abdominal e diarreia, pneumonia grave: ***Legionella pneumophila***. {q-gdpneumonias-037}
- *Mycoplasma* **não** é a etiologia mais frequente de pneumonia no adolescente. {q-gdpneumonias-041}
- Água morna e ar-condicionado: ***Legionella***. {q-gdpneumonias-046,q-gdantibioticos-045}
- Complicação hematológica do micoplasma: **anemia hemolítica**. {q-gdpneumonias-068}
- Colegas com o mesmo quadro no escritório com ar-condicionado: ***Legionella***. {q-gdpneumonias-086}
- Mycoplasma: **azitromicina**. {q-gdpneumonias-090}
- **Meropenem** é inefetivo contra bactérias sem parede celular. {q-gdpneumonias-103,q-gdantibioticos-090}
- Amoxicilina-clavulanato **não** cobre atípicos. {q-gdpneumonias-083}
- Jovem com 10 dias de tosse seca, mialgia e infiltrado reticulonodular: **azitromicina**. {q-gdpneumonias-119}
- Escarro cor de tijolo, dor pleurítica: **macrolídeo** cobre típicas e atípicas. {q-gdpneumonias-122}
- Correlação: GBS-ampicilina, *Chlamydia*-azitromicina ou clindamicina, *S. aureus*-oxacilina, *Moraxella*-inibidor. {q-gdpneumonias-048}
- Mulher de 59 anos com diarreia aquosa antes da pneumonia e sódio de 131: ***Legionella pneumophila***. {q-fmabc2026-017}
- Asma grave no adolescente: bactérias atípicas **Mycoplasma e Chlamydophila**. {q-gdantibioticos-039}` },
        { id: "estafilo", titulo: "Staphylococcus aureus depois da gripe", conferir: true, diretrizes: ["dir-sbpt-pac"],
          questoes: ["q-usprp2026-097","q-amrigs2021-008","q-unesp2026-059","q-sirio2023-019","q-gdpneumonias-026","q-gdantibioticos-026","q-gdantibioticos-124","q-gdpneumonias-050"],
          prosa: `[[A **influenza** destrói o epitélio ciliado e abre a via para o ***S. aureus***: **melhora inicial e piora com febre alta**, de um adulto antes hígido, é pneumonia **pós-influenza por *S. aureus***, que pede **betalactâmico antiestafilocócico (oxacilina, se sensível)** e, se houver risco de MRSA, **vancomicina ou linezolida** (a **daptomicina não serve**, pois o surfactante a inativa); o **idoso institucionalizado** sem resposta à amoxicilina e com cocos Gram-positivos na hemocultura recebe **vancomicina** (parede celular).|q-usprp2026-097,q-unesp2026-059,q-sirio2023-019,q-amrigs2021-008,q-gdpneumonias-026,q-gdantibioticos-026,q-gdantibioticos-124]] [[O quadro gripal com piora e febre após melhora, em mulher hígida, com estertores localizados, é pneumonia bacteriana secundária, tratada com **claritromicina** e acompanhamento.|q-gdpneumonias-050]]`,
          texto: `- Quadro gripal com piora e febre persistente em idoso: ***Staphylococcus aureus***. {q-usprp2026-097}
- Pneumonia com levofloxacino sem melhora e cultura com MSSA: **oxacilina**. {q-amrigs2021-008}
- Homem de 28 anos com influenza, melhora e piora: **cobrir *S. aureus* pós-influenza** com betalactâmico. {q-unesp2026-059}
- *S. aureus* em adulto hígido: **infecção recente por influenza**. {q-sirio2023-019}
- Idoso institucionalizado sem resposta à amoxicilina, hemocultura com cocos Gram-positivos: **vancomicina (parede celular)**. {q-gdpneumonias-026,q-gdantibioticos-026}
- Pneumonia por MRSA: **evitar daptomicina** (inativada pelo surfactante). {q-gdantibioticos-124}
- Gripe há uma semana, febre e tosse produtiva, mulher hígida: **claritromicina**, sintomáticos e acompanhamento. {q-gdpneumonias-050}` },
        { id: "hospedeiros", titulo: "Hospedeiros especiais: DPOC, fibrose cística, HIV, gestante e outros", conferir: true, diretrizes: ["dir-sbpt-pac"],
          questoes: ["q-gdpneumonias-020","q-gdpneumonias-055","q-gdpneumonias-076","q-gdpneumonias-100","q-gdpneumonias-064","q-gdpneumonias-043","q-gdpneumonias-057","q-gdpneumonias-061","q-gdantibioticos-078","q-gdpneumonias-138","q-unicampdis2024-001"],
          prosa: `[[No **DPOC**, os agentes são **pneumococo, Haemophilus e Gram-negativos**; na **fibrose cística e na bronquiectasia**, o muco espesso e o biofilme selecionam ***Pseudomonas aeruginosa* e *S. aureus***, e o antibiótico deve cobrir *Pseudomonas*; o **imunossuprimido por corticoide** com bronquiectasia e antibiótico de largo espectro por mais de 10 dias tem **Pseudomonas**; e o **HIV com CD4 de 600** tem pneumonia **bacteriana**, com **pneumococo** como a causa de lobar.|q-gdpneumonias-020,q-gdpneumonias-055,q-gdpneumonias-100,q-gdpneumonias-076,q-gdpneumonias-064,q-gdpneumonias-043,q-gdpneumonias-057]] [[A **gestante** usa **betalactâmicos (penicilinas, amoxicilina, ceftriaxona) e macrolídeos (azitromicina)**, (entre quinolona, sulfa e tetraciclina, a prova deu a azitromicina como a opção segura e útil); e a **vacina antipneumocócica** é indicada aos de risco (**cirrótico, asplênico, diabético, tabagista, etilista**), não contraindicada; no **falciforme** com síndrome torácica prévia, o agente é **pneumococo**.|q-gdpneumonias-061,q-gdantibioticos-078,q-gdpneumonias-138,q-unicampdis2024-001]]`,
          texto: `- DPOC com PAC: **pneumococo, Haemophilus, Gram-negativos** (nessa ordem). {q-gdpneumonias-020}
- Fibrose cística internada na UTI: ***Pseudomonas aeruginosa***. {q-gdpneumonias-055}
- Adulto com fibrose cística: **levofloxacino** (o único antipseudomonas entre as opções). {q-gdpneumonias-076}
- Fibrose cística e bronquiectasia: **Pseudomonas e *S. aureus***. {q-gdpneumonias-100}
- Idosa com corticoide, bronquiectasia e antibiótico prolongado: ***Pseudomonas aeruginosa***. {q-gdpneumonias-064}
- HIV com CD4 de 600 e infiltrado: **pneumonia bacteriana**. {q-gdpneumonias-043}
- Causa mais comum de lobar na aids: **S. pneumoniae**. {q-gdpneumonias-057}
- Gestante com PAC: **azitromicina** (betalactâmicos também). {q-gdpneumonias-061}
- Pneumonia grave na gestante: **penicilinas** (menos lesivas ao feto). {q-gdantibioticos-078}
- A vacina antipneumocócica **não** é contraindicada no cirrótico. {q-gdpneumonias-138}
- Anemia falciforme com síndrome torácica prévia, estertores no terço médio: ***Streptococcus pneumoniae***. {q-unicampdis2024-001}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento da PAC",
      introducao: `[[O tratamento sai da **gravidade** e do **risco de resistência**: o **hígido sem antibiótico recente** trata em casa com **amoxicilina ou macrolídeo**; quem tem **comorbidade ou usou antibiótico nos últimos 3 meses** recebe **outra classe** (quinolona respiratória), porque a exposição prévia seleciona **pneumococo com proteínas ligadoras alteradas**; e o **internado** recebe betalactâmico mais macrolídeo ou quinolona respiratória.|q-gdpneumonias-062,q-gdpneumonias-071,q-gdpneumonias-077]]`,
      fragmentos: [
        { id: "amb-higido", titulo: "Ambulatorial no hígido: amoxicilina ou macrolídeo", conferir: true, diretrizes: ["dir-sbpt-pac"],
          questoes: ["q-adap22-072","q-famema2025-015","q-sessp2023-067","q-gdpneumonias-008","q-gdpneumonias-012","q-gdpneumonias-018","q-gdpneumonias-038","q-gdpneumonias-049","q-gdpneumonias-071","q-gdpneumonias-115","q-gdpneumonias-116","q-gdpneumonias-130","q-gdpneumonias-131","q-gdpneumonias-133","q-gdpneumonias-087","q-gdpneumonias-092","q-gdpneumonias-082","q-gdpneumonias-129","q-gdpneumonias-104"],
          prosa: `[[O **jovem hígido, sem antibiótico nos últimos 3 meses, com CURB-65 ou CRB-65 de 0** (orientado, FR abaixo de 30, PA normal, idade abaixo de 65) trata **em casa**, com **amoxicilina (em dose alta) ou macrolídeo** por 5 a 7 dias, e retorno em 48 a 72 horas; o **macrolídeo** cobre pneumococo e atípicos, e a **amoxicilina em monoterapia é uma opção indicada**, não contraindicada; a criança de 3 anos com taquipneia leve também fica em casa com **amoxicilina** (50 a 90 mg/kg/dia).|q-famema2025-015,q-sessp2023-067,q-gdpneumonias-008,q-gdpneumonias-012,q-gdpneumonias-018,q-gdpneumonias-038,q-gdpneumonias-049,q-gdpneumonias-071,q-gdpneumonias-115,q-gdpneumonias-116,q-gdpneumonias-131,q-gdpneumonias-133,q-adap22-072]] [[O **idoso** com CURB-65 de 1 (só a idade), sem comorbidade nem confusão, também trata em ambulatório, com **azitromicina** ou **quinolona respiratória em monoterapia** quando cobre típicos e atípicos; e o **ciprofloxacino não serve**, porque tem **atividade fraca contra o pneumococo**.|q-gdpneumonias-130,q-gdpneumonias-104,q-gdpneumonias-082,q-gdpneumonias-129,q-gdpneumonias-087,q-gdpneumonias-092]]`,
          texto: `- Criança de 3 anos com FR de 44 e SpO2 de 96 %: **amoxicilina em casa**, retorno em 48 horas. {q-adap22-072}
- Paciente de 22 anos sem comorbidade: **azitromicina em ambulatório**. {q-famema2025-015}
- Adulto de 28 anos, sem dispneia: **monoterapia com betalactâmico ou macrolídeo**. {q-sessp2023-067}
- CRB-65 = 0: **macrolídeo por via oral por 7 dias**. {q-gdpneumonias-008}
- Jovem de 19 anos, CURB-65 = 0: **macrolídeo ou amoxicilina (ou com clavulanato)**, controle em 48 a 72 horas. {q-gdpneumonias-012}
- Jovem hígido com estado geral preservado: **azitromicina por 5 a 7 dias**. {q-gdpneumonias-018}
- Jovem de 18 anos, estertores e sem uso recente de antibiótico: **amoxicilina (ou com clavulanato) por 7 dias**. {q-gdpneumonias-038}
- Jovem de 20 anos, CRB-65 = 0: **macrolídeo por 10 dias** (a prova; hoje 5 a 7). {q-gdpneumonias-049}
- Em hígido sem antibiótico por 3 meses, amoxicilina em monoterapia **é uma opção** (afirmar que não é, é errado). {q-gdpneumonias-071}
- Jovem com tosse seca e cefaleia: **azitromicina por 5 dias**. {q-gdpneumonias-115}
- Jovem de 24 anos com início súbito e dor pleurítica: **azitromicina oral**. {q-gdpneumonias-116}
- Idosa de 66 anos com CURB-65 = 1 e FR de 22: **azitromicina ambulatorial**. {q-gdpneumonias-130}
- Jovem de 20 anos com início súbito: **amoxicilina 500 mg a cada 8 horas ou macrolídeo por 5 a 7 dias**. {q-gdpneumonias-131}
- Mesma jovem: **não precisa de internação** (CURB-65 = 0). {q-gdpneumonias-133}
- **Ciprofloxacino** deve ser evitado na PAC sem gravidade. {q-gdpneumonias-087}
- Jovem com herpes labial e condensação lobar: o **ciprofloxacino** é o que não se recomenda isolado. {q-gdpneumonias-092}
- Idoso de 76 anos, consolidação em base esquerda, sem comorbidade: **levofloxacino**. {q-gdpneumonias-082}
- Idoso sem comorbidades, a monoterapia que cobre típicos e atípicos: **levofloxacino**. {q-gdpneumonias-129}
- Idoso de 68 anos normotenso com FR de 28: **azitromicina**. {q-gdpneumonias-104}` },
        { id: "amb-risco", titulo: "Ambulatorial com comorbidade, antibiótico recente ou alergia", conferir: true, diretrizes: ["dir-sbpt-pac"],
          questoes: ["q-unifesp2022-091","q-sessp2024-005","q-gdpneumonias-006","q-gdpneumonias-042","q-gdpneumonias-058","q-gdpneumonias-112","q-gdpneumonias-120","q-gdpneumonias-096","q-gdpneumonias-062","q-gdpneumonias-113","q-tp20222-035","q-einstein2024-012","q-gdpneumonias-137"],
          prosa: `[[O **uso de antibiótico nos últimos 3 meses** é fator de risco para pneumococo resistente, e **repetir a mesma classe** é erro: o idoso diabético que usou amoxicilina há 2 meses, o etilista que usou azitromicina há 45 dias e o hígido que usou amoxicilina na semana anterior recebem **quinolona respiratória (levofloxacino ou moxifloxacino)**; o **alérgico a betalactâmico** com PAC leve também recebe **levofloxacino oral**.|q-gdpneumonias-062,q-gdpneumonias-058,q-gdpneumonias-112,q-gdpneumonias-120,q-gdpneumonias-042,q-unifesp2022-091]] [[Com **comorbidade importante** (insuficiência cardíaca, diabetes em uso de insulina) mas sem gravidade, a escolha é **betalactâmico (amoxicilina, com ou sem clavulanato) mais macrolídeo**; no **DPOC**, o agente inclui **Haemophilus**, e a **quinolona antipneumocócica** é a preferência; e o paciente com CRB-65 de 0 mas **vômitos que impedem a via oral e condições socioeconômicas ruins** é internado para antibiótico venoso.|q-sessp2024-005,q-gdpneumonias-006,q-gdpneumonias-096,q-tp20222-035,q-einstein2024-012,q-gdpneumonias-113,q-gdpneumonias-137]]`,
          texto: `- Tosse produtiva e alergia a sulfa e amoxicilina na infância: **quinolona respiratória oral**. {q-unifesp2022-091}
- Diabético de 57 anos em uso de insulina: **amoxicilina-clavulanato com azitromicina**. {q-sessp2024-005}
- Insuficiência cardíaca, CURB-65 = 0: **amoxicilina com azitromicina**. {q-gdpneumonias-006}
- Alergia a betalactâmicos e azitromicina há 20 dias, CURB-65 = 0: **levofloxacino oral**, retorno se piorar. {q-gdpneumonias-042}
- Idoso de 72 anos diabético com amoxicilina há 2 meses: **levofloxacino**. {q-gdpneumonias-058}
- Idoso de 70 anos diabético e etilista com azitromicina há 45 dias: **moxifloxacino**. {q-gdpneumonias-112}
- Hígido que usou amoxicilina na última semana: **moxifloxacino**. {q-gdpneumonias-120}
- Paciente com **uso de antibiótico nos últimos 3 meses**: risco de germe resistente. {q-gdpneumonias-062}
- DPOC com pneumonia: **quinolona antipneumocócica**. {q-gdpneumonias-096}
- CRB-65 = 0 mas vômitos e condição social: **internação para antibiótico venoso**. {q-gdpneumonias-113}
- DPOC de 79 anos com FC 110: **PAC, tratamento hospitalar com quinolona respiratória**. {q-tp20222-035}
- DPOC de 75 anos, internado há pouco com antibiótico: **levofloxacino**. {q-einstein2024-012}
- Acamada com sequela de AVC, sem internação recente: **ceftriaxona com azitromicina ou quinolona**; o **ciprofloxacino** é o menos indicado. {q-gdpneumonias-137}` },
        { id: "enfermaria", titulo: "Internação em enfermaria", conferir: true, diretrizes: ["dir-sbpt-pac","ats-idsa-pac"],
          questoes: ["q-famema2021-033","q-tp20212-026","q-famema2023-025","q-unesp2025-048","q-gdpneumonias-031","q-gdpneumonias-040","q-gdpneumonias-044","q-gdpneumonias-075","q-gdpneumonias-077","q-gdpneumonias-088","q-gdpneumonias-089","q-gdpneumonias-121","q-gdpneumonias-127","q-gdpneumonias-135"],
          prosa: `[[O paciente com **CURB-65 de 2** (idoso, FR de 32, PA de 100x50 ou 94x58, ureia alta, desorientação) é **internado em enfermaria**, com **betalactâmico (ceftriaxona) mais macrolídeo (azitromicina ou claritromicina)** por via venosa, ou **quinolona respiratória em monoterapia**; a **quinolona** tem biodisponibilidade oral próxima de 100 %, e por isso pode seguir por via oral no paciente selecionado.|q-famema2021-033,q-tp20212-026,q-famema2023-025,q-gdpneumonias-031,q-gdpneumonias-040,q-gdpneumonias-075,q-gdpneumonias-077,q-gdpneumonias-089,q-gdpneumonias-121]] [[**Ampicilina-sulbactam com azitromicina** serve ao DPOC internado; **amoxicilina-clavulanato com azitromicina** ao idoso desorientado; **a ceftriaxona com clindamicina** cobre **anaeróbios** quando o risco é de **aspiração**, e o **grave de ambulatório** que pede **bacilos Gram-negativos e cocos Gram-positivos** por via venosa se internou.|q-gdpneumonias-044,q-unesp2025-048,q-gdpneumonias-127,q-gdpneumonias-135,q-gdpneumonias-088]]`,
          texto: `- Diabética de 68 anos, SpO2 de 88 %, FR de 32, PA de 94x58 e ureia de 66: **ceftriaxona com azitromicina em internação**. {q-famema2021-033}
- Idosa de 71 anos, FR de 32, PA de 100x65 e desorientada: **betalactâmico e macrolídeo, internação**. {q-tp20212-026}
- Idoso de 88 anos de asilo com derrame pequeno: **ceftriaxona com azitromicina**. {q-famema2023-025}
- Mulher de 68 anos desorientada, crepitações: **amoxicilina-clavulanato com azitromicina em internação**. {q-unesp2025-048}
- Idoso de 82 anos diabético com FR de 32: **ceftriaxona com claritromicina**. {q-gdpneumonias-031}
- Idoso de 67 anos com confusão, FR de 28 e PA de 94x62: **pneumococo; ceftriaxona com claritromicina**. {q-gdpneumonias-040}
- DPOC de 75 anos com FR de 32 e PA de 100x50: **ampicilina-sulbactam com azitromicina**. {q-gdpneumonias-044}
- Idosa de 67 anos com FR de 32, ureia de 80: **ceftriaxona com azitromicina venosos**. {q-gdpneumonias-075}
- Internado em enfermaria: **fluoroquinolona em monoterapia** (referência) ou betalactâmico com macrolídeo. {q-gdpneumonias-077}
- Idoso de 70 anos com crepitantes estável e internado: **antibiótico venoso para Gram-negativos e Gram-positivos**. {q-gdpneumonias-088}
- Fluoroquinolonas têm boa absorção, o tratamento pode ser **oral mesmo em internado selecionado**. {q-gdpneumonias-089}
- Quinolonas respiratórias: **moxifloxacino e levofloxacino**, boa penetração e cobertura de pneumococo e atípicos. {q-gdpneumonias-121}
- Puérpera de 5º dia, FR de 32: **hemocultura, ceftriaxona e claritromicina por 7 a 10 dias**. {q-gdpneumonias-127}
- Idoso etilista de 76 anos com confusão: **ceftriaxona e clindamicina**. {q-gdpneumonias-135}` },
        { id: "grave", titulo: "PAC grave e UTI", conferir: true, diretrizes: ["ats-idsa-pac"],
          questoes: ["q-gdpneumonias-065","q-gdpneumonias-066","q-gdpneumonias-084","q-gdpneumonias-101","q-gdpneumonias-102","q-gdpneumonias-105","q-gdpneumonias-028","q-gdsepse-033","q-gdpneumonias-059","q-gdantibioticos-074","q-gdpneumonias-001"],
          prosa: `[[A **PAC grave** recebe, **na primeira hora**, **betalactâmico (ceftriaxona) mais macrolídeo (azitromicina)** ou **betalactâmico mais quinolona respiratória**, na UTI, com **hemocultura, cultura e exames de gravidade**; se há **choque** (PA de 80x30, enchimento capilar de 4 a 6 segundos), entram **cristaloide 20 mL/kg e antibiótico em até 1 hora**; e o paciente com fator de risco de **Pseudomonas** (DPOC, demência, antibiótico há 45 dias, hospitalização) recebe **piperacilina-tazobactam com azitromicina**.|q-gdpneumonias-065,q-gdpneumonias-066,q-gdpneumonias-084,q-gdpneumonias-101,q-gdpneumonias-102,q-gdpneumonias-105,q-gdpneumonias-028,q-gdsepse-033,q-gdpneumonias-059,q-gdantibioticos-074]] [[A **pneumonia que evolui com infiltrado bilateral, sem causa cardíaca**, é **SDRA** (PaO2/FiO2 entre 100 e 200 é moderada) e se ventila com **volume corrente de 4 a 8 mL/kg (alvo 6) e platô abaixo de 30**.|q-gdpneumonias-001]]`,
          texto: `- Choque com PA de 80x30, TEC de 4 s e sonolência: **ceftriaxona com claritromicina**, UTI. {q-gdpneumonias-065}
- Idosa de 76 anos com PA de 80x40 e FR de 32: **UTI e ceftriaxona com azitromicina precoces**. {q-gdpneumonias-066}
- Idoso de 67 anos com FR de 32, PA 85x50, SpO2 de 88 % e ureia de 65: **UTI, culturas e betalactâmico com quinolona (ou macrolídeo)**. {q-gdpneumonias-084}
- Jovem de 35 anos com confusão e PA de 80x60: **betalactâmico com fluoroquinolona**. {q-gdpneumonias-101}
- PAC grave de idoso com comorbidades: **betalactâmico com macrolídeo**. {q-gdpneumonias-102}
- Pneumonia grave com indicação de UTI: **ceftriaxona com azitromicina**. {q-gdpneumonias-105}
- Tabagista de 70 anos sonolento, PA de 90x40, TEC de 6 s e SpO2 85 %: **piperacilina-tazobactam com azitromicina** (DPOC e risco de Pseudomonas). {q-gdpneumonias-028}
- Mesmo caso: **cristaloide 20 mL/kg e antibiótico em 1 hora**. {q-gdsepse-033}
- Demência e DPOC, antibiótico há 45 dias, torpor e PA de 90x60: **piperacilina-tazobactam com azitromicina**. {q-gdpneumonias-059}
- PAC grave: uma das opções é **quinolona respiratória (moxifloxacino)** associada. {q-gdantibioticos-074}
- Pneumonia com infiltrado bilateral e PaO2/FiO2 de 150 sem causa cardíaca: **SDRA moderada**; ventilar com 6 mL/kg. {q-gdpneumonias-001}` },
        { id: "duracao-resposta", titulo: "Duração, resposta ao tratamento e evolução", conferir: true, diretrizes: ["dir-sbpt-pac"],
          questoes: ["q-adap22-091","q-gdpneumonias-009","q-gdantibioticos-006","q-gdpneumonias-094","q-famerp2023-075"],
          prosa: `[[A **duração curta (5 a 7 dias)** é a mais apropriada e traz benefícios, e o que ela **não** faz é **aumentar a resistência** dos microrganismos; o antibiótico pode parar quando há **estabilidade clínica por 48 a 72 horas** (afebril, FC abaixo de 100, FR e pressão normais), **mesmo sem melhora radiológica**; e a **melhora clínica com perda de volume na radiografia** (atelectasia) pede **fisioterapia respiratória**, e não troca de antibiótico.|q-gdpneumonias-009,q-gdantibioticos-006,q-adap22-091,q-gdpneumonias-094,q-famerp2023-075]]`,
          texto: `- Afebril há mais de 48 horas, FC de 88, FR de 18, no 3º dia: **completar 5 dias no total**. {q-adap22-091}
- Antibioticoterapia curta **não** aumenta a resistência (esse é o benefício que não existe). {q-gdpneumonias-009,q-gdantibioticos-006}
- Jovem afebril há 72 horas, estável, sem melhora na imagem no 5º dia: **considerar o tratamento concluído**. {q-gdpneumonias-094}
- PAC grave no 6º dia com um pico febril, murmúrio diminuído e perda de volume: **intensificar a fisioterapia respiratória** (atelectasia). {q-famerp2023-075}` },
      ],
    },
    {
      id: "complicacoes", titulo: "Complicações: pleura, aspiração e abscesso",
      introducao: `A pneumonia que evolui com **febre persistente e piora** depois do tratamento deve levantar **derrame parapneumônico, empiema ou abscesso**.`,
      fragmentos: [
        { id: "pleura", titulo: "Derrame parapneumônico e empiema", conferir: true, diretrizes: ["dir-sbpt-pac"],
          casos: ["q-usp2025-088","q-usp2026-014","q-uspsp4-018"],
          questoes: ["q-usp2024-063","q-usp2025-088","q-sirio2024-001","q-famerp2025-005","q-uspsp4-006","q-uspsp4-018","q-gdpneumonias-005","q-usp2026-014"],
          prosa: `[[O **derrame parapneumônico** surge quando a inflamação pleural aumenta a permeabilidade e acumula líquido; ele fica **complicado** quando **pH abaixo de 7,2, DHL acima de 1.000 U/L ou líquido turvo e purulento** (empiema), e a conduta é **drenagem torácica**; a **febre persistente, a taquicardia e a abolição do murmúrio** depois do tratamento levantam essa hipótese, e no ultrassom o derrame mostra **coleção com septações** e **ausência do sinal da cortina**.|q-famerp2025-005,q-uspsp4-006,q-usp2025-088,q-sirio2024-001,q-gdpneumonias-005]] [[O **imunossuprimido febril** (lúpus com azatioprina) com derrame e choque quente recebe **hemoculturas e antibiótico de amplo espectro**, e a **pneumonia com derrame sem complicação** (tabagista, dispneia por 7 dias e dor pleurítica) trata-se com **antibiótico**; já a **opacificação completa de um hemitórax** em intubado se explica por **atelectasia por intubação seletiva** ou pneumonia extensa.|q-uspsp4-018,q-usp2024-063,q-usp2026-014]]`,
          texto: `- Tabagista com dispneia por 7 dias, dor pleurítica e POCUS com derrame: **antibioticoterapia**. {q-usp2024-063}
- Febre persistente, FC de 121 e abolição do murmúrio depois de tratar pneumonia: **empiema (coleção com septações no ultrassom)**. {q-usp2025-088}
- Pneumonia tratada em casa, febre diária e murmúrio abolido: **ausência do sinal da "cortina"**. {q-sirio2024-001}
- Derrame com pH de 6,9, DHL de 1.250 e neutrófilos de 88 %: **drenagem torácica**. {q-famerp2025-005}
- Pneumonia sem resposta ao tratamento oral e líquido turvo: **ceftriaxona com claritromicina e drenagem fechada**. {q-uspsp4-006}
- Lúpus imunossuprimido com derrame e perfusão em flush: **hemoculturas e antibiótico de amplo espectro**. {q-uspsp4-018}
- Idoso com FR de 40, torpor e complicação pleural: **drenagem de tórax em selo d'água**. {q-gdpneumonias-005}
- Intubada, murmúrio reduzido à esquerda: **opacificação do hemitórax esquerdo** (atelectasia ou pneumonia extensa). {q-usp2026-014}` },
        { id: "aspiracao-abscesso", titulo: "Aspiração, abscesso e cavidades", conferir: true, diretrizes: ["dir-sbpt-pac"],
          casos: ["q-sirio2023-015","q-usprp2021-099","q-unesp2022-068","q-tp20241-067"],
          questoes: ["q-adap21-099","q-unifesp2026-038","q-usprp2021-099","q-unesp2022-068","q-sirio2023-015","q-einstein2025-009","q-gdpneumonias-024","q-gdpneumonias-036","q-gdpneumonias-039","q-gdpneumonias-047","q-gdpneumonias-060","q-gdpneumonias-079","q-gdpneumonias-108","q-gdpneumonias-139","q-gdpneumonias-141","q-gdpneumonias-135","q-tp20241-067"],
          prosa: `[[A **aspiração** de secreção da orofaringe (alcoolismo, convulsão, rebaixamento, **disfagia pós-AVC**, vômito durante a anestesia) inocula **flora mista de anaeróbios e Gram-negativos**, e o **abscesso pulmonar** de evolução **subaguda** (semanas), com **escarro fétido, perda de peso, cavitação com nível hidroaéreo** e **dentição precária**, é causado por **anaeróbios** (peptostreptococos); o **diabetes não** é fator de risco para aspiração, e a aspiração é a **causa mais comum** do abscesso **primário**.|q-adap21-099,q-unifesp2026-038,q-usprp2021-099,q-sirio2023-015,q-gdpneumonias-036,q-gdpneumonias-039,q-gdpneumonias-047,q-gdpneumonias-060,q-gdpneumonias-108,q-gdpneumonias-141]] [[O tratamento é **clindamicina ou amoxicilina-clavulanato por 3 a 6 semanas, até a resolução radiológica**, com **drenagem postural, fisioterapia** e **tratamento dentário**, e **10 dias não bastam**; a **pneumonia aspirativa** do internado leva **ceftriaxona com clindamicina** ou, na comunidade, **ceftriaxona com azitromicina**, e quando surge no pós-operatório depois de vômito na indução, **amoxicilina-clavulanato**; e o **lavrador diabético e tabagista** com cavidade apical e **hemoptise** tem **aspergiloma**, e não pneumonia bacteriana.|q-gdpneumonias-139,q-unesp2022-068,q-gdpneumonias-079,q-einstein2025-009,q-gdpneumonias-024,q-gdpneumonias-135,q-tp20241-067,q-usprp2021-099]]`,
          texto: `- Etilista, má higiene dental, aspiração, 3 semanas de escarro fétido: **clindamicina ou amoxicilina-clavulanato por 3 a 6 semanas**, drenagem postural e tratamento dentário. {q-adap21-099}
- Crise convulsiva e depois escarro abundante: **abscesso pulmonar primário**, radiografia em PA e perfil. {q-unifesp2026-038}
- Etilista com 18 dias de tosse e vômica pútrida: **abscesso pulmonar** (cavidade com nível hidroaéreo). {q-usprp2021-099}
- Etilista e tabagista com cavidade de paredes espessas e nível hidroaéreo: **antibiótico e fisioterapia respiratória**. {q-unesp2022-068}
- Alcoolismo grave, dentes em mau estado e subagudo: **anaeróbios**. {q-sirio2023-015}
- Idosa com disfagia e tosse ao se alimentar: **PAC aspirativa, ceftriaxona e azitromicina**, oxigênio e culturas. {q-einstein2025-009}
- Vômito na indução anestésica e febre no 2º dia: **amoxicilina-clavulanato**. {q-gdpneumonias-024}
- Quadro subagudo com escarro pútrido e cavitação: **abscesso inespecífico por anaeróbios**. {q-gdpneumonias-036}
- **A aspiração é a causa mais comum do abscesso primário** (a afirmação sobre o secundário é a incorreta). {q-gdpneumonias-039}
- **Diabetes** não é fator de risco para aspiração. {q-gdpneumonias-047}
- Dentição precária, hálito fétido e cavitação: ***Peptostreptococcus***. {q-gdpneumonias-060}
- Idoso com sequela de AVC e disfagia: **ceftriaxona com clindamicina**, internação. {q-gdpneumonias-079}
- Etilista de 80 anos com falha da amoxicilina: **anaeróbios, foco gengival, abscesso**. {q-gdpneumonias-108}
- O abscesso exige **tratamento prolongado**; 10 dias é errado. {q-gdpneumonias-139}
- Etilista com escarro piossanguinolento pútrido e dentes ruins: **abscesso pulmonar** (item certo). {q-gdpneumonias-141}
- Idoso etilista e tabagista com confusão e ureia de 68: **ceftriaxona e clindamicina**. {q-gdpneumonias-135}
- Lavrador diabético com hemoptise e cavidade com conteúdo: **aspergilose pulmonar**. {q-tp20241-067}` },
      ],
    },
    {
      id: "hospitalar", titulo: "Pneumonia hospitalar e associada à ventilação",
      introducao: `[[A **pneumonia hospitalar** começa **depois de 48 horas de internação** (em média de 5 a 7 dias), e a **associada à ventilação (PAV)**, depois de 48 horas de intubação; a flora do hospital e do uso de antibiótico traz **Gram-negativos resistentes, *Pseudomonas* e MRSA**, e por isso o tratamento é outro.|q-gdpneumonias-013,q-gdpneumonias-011,q-gdpneumonias-097]]`,
      fragmentos: [
        { id: "pah-pav", titulo: "Precoce e tardia, multirresistentes e duração", conferir: true, diretrizes: ["idsa-ats-pah"],
          questoes: ["q-gdpneumonias-011","q-gdpneumonias-013","q-gdpneumonias-032","q-gdantibioticos-035","q-gdpneumonias-069","q-gdpneumonias-070","q-gdpneumonias-072","q-gdpneumonias-080","q-gdpneumonias-081","q-gdpneumonias-097","q-gdpneumonias-098","q-gdantibioticos-088","q-gdpneumonias-099","q-gdpneumonias-126","q-gdpneumonias-140","q-gdantibioticos-005","q-gdantibioticos-030"],
          prosa: `[[A pneumonia **tardia** (**depois do 5º dia de internação**) é de **germes hospitalares multirresistentes** (*Pseudomonas*, enterobactérias, MRSA): usa-se **betalactâmico antipseudomonas** (cefepima, **piperacilina-tazobactam**, meropenem, **ceftazidima**) **com vancomicina** quando há risco de MRSA; o **uso de antibiótico nos 90 dias anteriores, choque séptico, SDRA antes da PAV, 5 ou mais dias de internação antes da PAV e diálise** são fatores de risco para multirresistente (o corte é de **5 dias, não de 2**).|q-gdpneumonias-013,q-gdpneumonias-097,q-gdpneumonias-080,q-gdantibioticos-030,q-gdpneumonias-081,q-gdantibioticos-005]] [[A **Klebsiella produtora de ESBL** pede **meropenem**; o ***Acinetobacter* resistente a carbapenêmicos** pede **polimixina B**; a **PAV por MRSA** usa vancomicina (não daptomicina); a **PAV** dura **7 dias** e a **procalcitonina** é o biomarcador de melhor evidência para guiar o início; e **transfusão de hemoderivados** é fator de risco para PAV, enquanto **nutrição enteral e higiene oral com clorexidina** a previnem.|q-gdpneumonias-140,q-gdpneumonias-098,q-gdantibioticos-088,q-gdpneumonias-032,q-gdantibioticos-035,q-gdpneumonias-070,q-gdpneumonias-069,q-gdpneumonias-072,q-gdpneumonias-126]] [[A **pneumonia que surge no 12º dia, com intubação desde o 9º**, é **PAV**; e o **critério de gravidade** da nosocomial inclui câncer, FR acima de 30 e acidose, mas **não** leucograma acima de 20.000.|q-gdpneumonias-011,q-gdpneumonias-099]]`,
          texto: `- Internada há 12 dias e intubada desde o 9º: **PAV**, uma pneumonia nosocomial. {q-gdpneumonias-011}
- PAH ocorre **após 48 horas de internação** (em média 5 a 7 dias). {q-gdpneumonias-013}
- PAV tardia por *Acinetobacter* resistente a carbapenêmicos: **polimixina B**. {q-gdpneumonias-032,q-gdantibioticos-035}
- **Procalcitonina**: o biomarcador de melhor evidência para iniciar antibiótico. {q-gdpneumonias-069}
- Tempo habitual do tratamento da PAV: **7 dias**. {q-gdpneumonias-070}
- **Transfusão sanguínea** é fator de risco para PAV. {q-gdpneumonias-072}
- Pneumonia no 10º dia após AVC: **nosocomial tardia; piperacilina-tazobactam e vancomicina**. {q-gdpneumonias-080}
- Fatores de risco para multirresistente: antibiótico em 90 dias, choque, SDRA prévia; **dois dias de hospitalização não** (são 5 ou mais). {q-gdpneumonias-081}
- Pneumonia no 7º dia em diabética: **nosocomial tardia; cefepima**. {q-gdpneumonias-097}
- Klebsiella sensível apenas a carbapenêmico (ESBL) na PAV: **meropenem**. {q-gdpneumonias-098,q-gdantibioticos-088,q-gdpneumonias-140}
- Critério de gravidade da nosocomial: câncer, FR acima de 30, acidose; **leucograma acima de 20.000 não**. {q-gdpneumonias-099}
- Ventilado há 12 horas com plaquetas de 100.000: **nutrição enteral e higiene oral com clorexidina** (sem profilaxia de úlcera). {q-gdpneumonias-126}
- Pneumonia hospitalar com choque e reação grave à cefepima: **meropenem**. {q-gdantibioticos-005}
- Pneumonia por *Pseudomonas*: **ceftazidima**. {q-gdantibioticos-030}` },
      ],
    },
    {
      id: "sepse-e-pneumonia", titulo: "Pneumonia grave com sepse",
      introducao: `A pneumonia é o **foco mais comum de sepse**, e a **pneumonia com hipotensão, torpor ou lactato alto** é tratada como **sepse grave**: ressuscitação e antibiótico na **primeira hora**.`,
      fragmentos: [
        { id: "sepse-pneumonia", titulo: "Ressuscitação e antibiótico na primeira hora", conferir: true, diretrizes: ["ats-idsa-pac"],
          questoes: ["q-gdsepse-038","q-gdsepse-059","q-gdsepse-079","q-gdsepse-081","q-gdsepse-083"],
          prosa: `[[A pneumonia com **PA de 74x42 a 80x35, torpor, lactato elevado** é **sepse grave**: na primeira hora se dão **cristaloide, hemocultura e lactato, e antibiótico (ceftriaxona com azitromicina)**; a **UTI** e a **ventilação mecânica** entram quando há hipoxemia grave.|q-gdsepse-038,q-gdsepse-059,q-gdsepse-079,q-gdsepse-081,q-gdsepse-083]]`,
          texto: `- Pneumonia com PA de 80/35 e Glasgow 14: **cristaloide, ceftriaxona e azitromicina**. {q-gdsepse-038}
- Pneumonia com PA de 80x60, FR de 38 e PaO2 de 54: **UTI, ressuscitação volêmica, antibiótico e considerar ventilação mecânica**. {q-gdsepse-059}
- Condensação com PA de 78x46 e torpor: **sepse grave; lactato, culturas, antibiótico e volume**. {q-gdsepse-079}
- Pneumonia com PA de 74x42 e lactato de 45 mg/dL: **sepse grave**. {q-gdsepse-081}
- Pneumonia com sonolência, icterícia e PA de 90x60: **sepse grave; expansão volêmica e antibiótico precoce**. {q-gdsepse-083}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual (referências antigas, textos que se contradizem). Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-gdpneumonias-049","q-gdpneumonias-077","q-gdpneumonias-111","q-gdpneumonias-106","q-gdpneumonias-056","q-gdpneumonias-107","q-gdpneumonias-071","q-gdpneumonias-087","q-gdpneumonias-092","q-gdpneumonias-137","q-gdpneumonias-001"],
          prosa: `[[**Duração**: a regra atual é de **5 a 7 dias**, com estabilidade; a prova cobrou **macrolídeo por 10 dias** (gdpneumonias-049, escrita no esquema antigo de 7 a 10 dias).|q-gdpneumonias-049]] [[**Primeira escolha na enfermaria**: a regra é **betalactâmico com macrolídeo ou quinolona respiratória**; a prova (gdpneumonias-077) deu a **fluoroquinolona** como "primeira indicação".|q-gdpneumonias-077]] [[**Agente mais frequente**: a regra é o **pneumococo** (gdpneumonias-106); a prova deu "**Haemophilus e pneumococo**" entre os típicos (gdpneumonias-111), sem dizer a ordem.|q-gdpneumonias-106,q-gdpneumonias-111]] [[**Ambulatório com 65 anos ou mais**: a regra pede avaliar a gravidade; a prova (gdpneumonias-056) aceita ambulatório acima de 65 anos com **FR baixa e estabilidade**; e a **ureia** do corte varia (**40** em gdpneumonias-107, **43** no CURB-65).|q-gdpneumonias-056,q-gdpneumonias-107]] [[**Quinolona e ciprofloxacino**: a quinolona **respiratória** é boa, mas o **ciprofloxacino não serve sozinho** (gdpneumonias-087, 092 e 137); e a **amoxicilina em monoterapia** é **opção** no hígido (gdpneumonias-071).|q-gdpneumonias-087,q-gdpneumonias-092,q-gdpneumonias-137,q-gdpneumonias-071]] [[**SDRA**: a pneumonia com PaO2/FiO2 de 150 é **moderada**, e não grave (gdpneumonias-001).|q-gdpneumonias-001]]`,
          texto: `- Regra: 5 a 7 dias; a prova deu **10 dias** com macrolídeo. {q-gdpneumonias-049}
- Regra: betalactâmico com macrolídeo ou quinolona; a prova deu **fluoroquinolona** como primeira indicação. {q-gdpneumonias-077}
- Regra: pneumococo é o mais frequente; a prova listou **Haemophilus e pneumococo**. {q-gdpneumonias-106,q-gdpneumonias-111}
- Regra: avaliar gravidade; a prova aceitou ambulatório acima de 65 anos com FR baixa; ureia de 40 ou 43. {q-gdpneumonias-056,q-gdpneumonias-107}
- Regra: ciprofloxacino não é monoterapia; amoxicilina sozinha é opção no hígido. {q-gdpneumonias-087,q-gdpneumonias-092,q-gdpneumonias-137,q-gdpneumonias-071}
- Regra: PaO2/FiO2 de 100 a 200 é SDRA moderada. {q-gdpneumonias-001}` },
      ],
    },
  ],
});
