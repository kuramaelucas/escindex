/* ==========================================================================
   BANCO UNIFESP 2024 ADAPTADO — 100 questões autorais
   ==========================================================================
   Cada questão parte do tema e das alternativas de uma questão da prova da
   UNIFESP-EPM 2024, mas o ENUNCIADO foi reescrito (caso clínico, dados
   epidemiológicos e diretrizes) para que a resposta correta passe a ser a
   alternativa seguinte (A→B, B→C, C→D, D→A). Nas questões 001 a 057 as alternativas ficaram intactas; nas 058 a 100, que não admitiam a troca só pelo enunciado, as alternativas também foram reescritas; as três últimas (098 a 100) partem de questões ANULADAS da prova original e foram corrigidas para terem uma única resposta correta.
   Não são questões reais: marcam `real: false` e instituição
   "Esc — Banco Didático" (nunca "UNIFESP-EPM 2024"), para não se misturarem
   à prova de 2024 em Provas Antigas. A justificativa de cada uma cita a
   diretriz de base; revisar a edição vigente antes de uso comercial.
   ========================================================================== */
window.EscDados.registrarQuestoes("banco-unifesp-2024-adaptado", [
// adaptada da estrutura da Q2 da UNIFESP 2024
{
  "id": "q-adap24-001",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-anestesio",
  "assuntoId": "ass-anestesio-complicacoes",
  "enunciado": "Mulher, 27 anos, asmática em uso de broncodilatador, submetida à colecistectomia por via laparoscópica sob anestesia geral e ventilação mecânica controlada, com pneumoperitônio a 12 mmHg. Cerca de 30 minutos após a indução, o anestesiologista observa a alteração da curva de capnografia mostrada na figura. A pressão de pico nas vias aéreas subiu de 18 para 38 cmH2O, há sibilos difusos à ausculta, a pressão arterial está estável (110/70 mmHg) e a pressão do pneumoperitônio não foi alterada. Qual é o diagnóstico mais provável?",
  "imagemUrl": "dados/imagens/q-adap24-001.png",
  "imagemLegenda": "Capnograma da paciente (ilustração esquemática).",
  "alternativas": [
    {
      "id": "A",
      "texto": "Insuflação excessiva do pneumoperitônio."
    },
    {
      "id": "B",
      "texto": "Diminuição da pressão arterial."
    },
    {
      "id": "C",
      "texto": "Aumento de resistência em vias aéreas."
    },
    {
      "id": "D",
      "texto": "Recuperação do bloqueio neuromuscular."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado e da figura: **platô inclinado em «barbatana de tubarão»** no capnograma, **pressão de pico de 18 para 38 cmH2O**, **sibilos difusos** e **história de asma** indicam obstrução ao fluxo expiratório, isto é, **aumento da resistência das vias aéreas** (broncoespasmo; outras causas seriam dobra do tubo ou secreção). O esvaziamento desigual dos alvéolos, com constantes de tempo diferentes, inclina a fase III do capnograma. A (insuflação excessiva do pneumoperitônio) aumenta o CO2 expirado por absorção peritoneal e reduz o retorno venoso, mas a curva mantém o formato normal e não há sibilos nem aumento isolado da pressão de pico com platô oblíquo. B (diminuição da pressão arterial) reduz o débito cardíaco e faz o CO2 expirado cair de forma progressiva, com curva de formato preservado; aqui a PA está estável. D (recuperação do bloqueio neuromuscular) produz esforços respiratórios espontâneos, que deformam o platô com uma depressão («fenda de curare») e não com inclinação oblíqua acompanhada de sibilos.",
  "explicacoesAlternativas": {},
  "referencias": "Miller, Anestesia (capnografia e complicações respiratórias intraoperatórias); ASA Standards for Basic Anesthetic Monitoring; Sociedade Brasileira de Anestesiologia, monitorização.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q3 da UNIFESP 2024
{
  "id": "q-adap24-002",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-anestesio",
  "assuntoId": "ass-anestesio-viaaerea",
  "enunciado": "Mulher, 32 anos, asmática grave, é levada ao pronto-socorro em crise há 36 horas, sem resposta a broncodilatadores e corticoide sistêmico. Está exausta, com fala entrecortada, tórax quase silencioso, FR = 36 irpm, SatO2 = 86% com máscara com reservatório, FC = 128 bpm, PA = 88/50 mmHg e desidratação. Indicada a intubação orotraqueal. Qual é o hipnótico mais adequado para a indução?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Propofol."
    },
    {
      "id": "B",
      "texto": "Midazolam."
    },
    {
      "id": "C",
      "texto": "Etomidato."
    },
    {
      "id": "D",
      "texto": "Cetamina."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **mal asmático refratário** (tórax quase silencioso, exaustão, SatO2 86%) e **PA = 88/50 mmHg com desidratação e FC = 128 bpm** (hipovolemia e auto-PEEP): o hipnótico ideal deve **broncodilatar** e **preservar a pressão arterial**. A cetamina cumpre os dois: estimula o sistema simpático, relaxa a musculatura brônquica e mantém a hemodinâmica, sendo a droga de escolha na indução do estado de mal asmático. A (propofol) também broncodilata, mas causa vasodilatação e depressão miocárdica, com risco de colapso hemodinâmico em paciente hipovolêmica e com hiperinsuflação. B (midazolam) tem início lento, efeito broncodilatador pouco confiável e provoca hipotensão nas doses de indução. C (etomidato) mantém a estabilidade hemodinâmica, mas não relaxa a musculatura brônquica e suprime a adrenal, sem vantagem sobre a cetamina neste cenário. Após a intubação, ventilar com frequência baixa e tempo expiratório longo para evitar hiperinsuflação dinâmica.",
  "explicacoesAlternativas": {},
  "referencias": "Miller, Anestesia (indução em paciente asmático e instável); GINA, manejo da exacerbação grave; Diretrizes Brasileiras de Ventilação Mecânica (AMIB/SBPT).",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q6 da UNIFESP 2024
{
  "id": "q-adap24-003",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-cardio",
  "assuntoId": "ass-dac-cronica",
  "enunciado": "Homem, 61 anos, hipertenso e diabético tipo 2, asmático grave com broncoespasmo recorrente em uso diário de broncodilatador, foi submetido à cirurgia de revascularização miocárdica com três enxertos, 8 dias após infarto agudo do miocárdio sem supradesnivelamento do ST. Evoluiu sem intercorrências, com ecocardiograma mostrando função ventricular normal e discreto derrame pleural à radiografia de tórax. Quais medicações devem ser continuadas após a alta hospitalar?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Betabloqueador, estatina, AAS e diurético."
    },
    {
      "id": "B",
      "texto": "Clopidogrel, AAS, inibidor da enzima de conversão da angiotensina e diurético."
    },
    {
      "id": "C",
      "texto": "Betabloqueador, inibidor da enzima de conversão da angiotensina, estatina e AAS."
    },
    {
      "id": "D",
      "texto": "Estatina, inibidor de enzima de conversão da angiotensina, AAS e clopidogrel."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **revascularização 8 dias após infarto sem supra de ST** (a cirurgia ocorreu no contexto de síndrome coronariana aguda, o que mantém indicada a **dupla antiagregação, AAS + clopidogrel, por até 12 meses**), **hipertensão e diabetes** (indicam **inibidor da ECA**), **estatina** para todo paciente coronariano e **asma grave com broncoespasmo recorrente** (**contraindica o betabloqueador**, que seria rotina após infarto). O derrame discreto e a função ventricular normal dispensam diurético. A (betabloqueador, estatina, AAS e diurético) inclui betabloqueador em asmático grave, omite o inibidor da ECA e o clopidogrel e acrescenta diurético sem indicação. B (clopidogrel, AAS, IECA e diurético) esquece a estatina, pilar da prevenção secundária, e mantém diurético desnecessário. C (betabloqueador, IECA, estatina e AAS) seria o esquema habitual após revascularização eletiva em paciente sem contraindicação, mas aqui há broncoespasmo e falta o inibidor de P2Y12 indicado após síndrome coronariana aguda.",
  "explicacoesAlternativas": {},
  "referencias": "Diretriz Brasileira de Doença Coronariana Crônica (SBC); 2021 ACC/AHA/SCAI Guideline for Coronary Artery Revascularization; Diretriz da SBC sobre síndrome coronariana aguda sem supra de ST.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q7 da UNIFESP 2024
{
  "id": "q-adap24-004",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-abdagudo",
  "assuntoId": "ass-colangite",
  "enunciado": "Mulher, 52 anos, obesa (IMC 31 kg/m2), apresenta dor abdominal há 3 dias, de intensidade progressiva, no hipocôndrio direito, irradiada para a região interescapular, com náuseas, vômitos, febre e colúria. Exame físico: REG, sonolenta, FC = 112 bpm, PA = 130/80 mmHg, T = 39 ºC, icterícia 2+/4+, dor à palpação do hipocôndrio direito, sem sinais de irritação peritoneal. Exames: creatinina = 2,6 mg/dL, bilirrubina total = 4,8 mg/dL (direta = 3,9), leucócitos = 18.300/mm3 e plaquetas = 82.000/mm3. Ultrassonografia: vesícula com cálculos móveis, colédoco com 1,0 cm de diâmetro e imagem hiperecogênica com sombra acústica no colédoco distal. Pelos critérios de Tokyo 2018 esta paciente apresenta:",
  "alternativas": [
    {
      "id": "A",
      "texto": "Colangite aguda grau I."
    },
    {
      "id": "B",
      "texto": "Colangite aguda grau IV."
    },
    {
      "id": "C",
      "texto": "Colangite aguda grau II."
    },
    {
      "id": "D",
      "texto": "Colangite aguda grau III."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: o diagnóstico é de colangite aguda definitiva (**febre 39 ºC e leucocitose 18.300** = inflamação sistêmica; **bilirrubina total 4,8 e icterícia** = colestase; **colédoco dilatado com cálculo** = imagem). A gravidade, nos critérios de Tokyo 2018, é **grau III (grave)** quando há disfunção de pelo menos um órgão: **creatinina > 2,0 mg/dL** (renal), **plaquetas < 100.000/mm3** (hematológica) e **alteração do nível de consciência** (neurológica). Aqui há três disfunções. A (grau I) é a colangite que não preenche critério de grau II nem de grau III. C (grau II) exige dois critérios entre leucocitose ou leucopenia, febre ≥ 39 ºC, idade ≥ 75 anos, bilirrubina total ≥ 5 mg/dL e hipoalbuminemia, sem disfunção orgânica; seria a classificação se a função de órgãos estivesse preservada. B (grau IV) não existe, pois a classificação de Tokyo vai do grau I ao III. No grau III o tratamento é suporte intensivo, antibiótico e drenagem biliar urgente.",
  "explicacoesAlternativas": {},
  "referencias": "Kiriyama S et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholangitis. J Hepatobiliary Pancreat Sci, 2018.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q8 da UNIFESP 2024
{
  "id": "q-adap24-005",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-trauma",
  "assuntoId": "ass-atls",
  "enunciado": "Homem, 25 anos, motociclista, vítima de colisão com automóvel, dá entrada no PS com politraumatismo. Exame físico: via aérea pérvia, fala frases curtas; FR = 28 irpm, murmúrio vesicular simétrico bilateral, traqueia centrada, sem turgência jugular; PA = 70/40 mmHg, FC = 140 bpm, pele fria e pegajosa, enchimento capilar > 3 segundos; abdome distendido, com FAST positivo em espaço hepatorrenal e esplenorrenal e sem líquido pericárdico; pelve instável à compressão; fratura exposta de fêmur direito com sangramento ativo. Escala de coma de Glasgow 13. Baseado no diagnóstico com risco iminente à vida do paciente, qual é a primeira conduta?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Punção pericárdica."
    },
    {
      "id": "B",
      "texto": "Intubação oro traqueal."
    },
    {
      "id": "C",
      "texto": "Drenagem pleural à direita."
    },
    {
      "id": "D",
      "texto": "Protocolo de transfusão maciça."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **PA = 70/40, FC = 140, pele fria e enchimento capilar > 3 s**, com **FAST positivo, pelve instável e fratura de fêmur com sangramento ativo**, configuram **choque hemorrágico classe IV**, principal causa de morte evitável no trauma. Pelo ATLS, a prioridade é conter o sangramento e repor volume com hemocomponentes: **ativar o protocolo de transfusão maciça** (hemácias, plasma e plaquetas em proporção próxima de 1:1:1, com ácido tranexâmico), evitando cristaloide em excesso, junto do controle dos focos (cinta pélvica, compressão do sangramento do fêmur e laparotomia). A (punção pericárdica) trata tamponamento, afastado pela ausência de turgência jugular e de líquido pericárdico no FAST. B (intubação orotraqueal) não é a primeira medida: a via aérea está pérvia, o Glasgow é 13 e induzir anestesia em paciente hipovolêmico pode precipitar parada. C (drenagem pleural) trata pneumotórax ou hemotórax, mas o murmúrio vesicular é simétrico, a traqueia está centrada e não há sinais de coleção pleural.",
  "explicacoesAlternativas": {},
  "referencias": "American College of Surgeons. ATLS: Advanced Trauma Life Support, 10th ed.; Diretrizes de ressuscitação hemostática no trauma (European guideline on management of major bleeding and coagulopathy following trauma).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q9 da UNIFESP 2024
{
  "id": "q-adap24-006",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-urologia",
  "assuntoId": "ass-uro-prostata",
  "enunciado": "Homem, 66 anos, refere há 1 ano diminuição do jato urinário, noctúria 3 x, esforço miccional e sensação de esvaziamento vesical incompleto (IPSS = 22). Toque retal já realizado: próstata aumentada, fibroelástica, lisa, sem nódulos. PSA = 1,9 ng/mL, creatinina = 1,9 mg/dL (era 1,0 mg/dL há um ano), urina tipo 1 sem hematúria ou infecção, sem globo vesical palpável. Qual é a propedêutica complementar e a terapêutica iniciais para o diagnóstico mais provável?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Ultrassonografia; betanecol."
    },
    {
      "id": "B",
      "texto": "Toque retal; betanecol."
    },
    {
      "id": "C",
      "texto": "Toque retal; alfa bloqueador."
    },
    {
      "id": "D",
      "texto": "Ultrassonografia; alfa bloqueador."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: homem de **66 anos** (a hiperplasia prostática benigna acomete cerca de metade dos homens aos 60 anos e a grande maioria aos 80), com **sintomas obstrutivos e de armazenamento (IPSS = 22, grave)**, **próstata lisa e fibroelástica** e **PSA baixo**: **HPB**. O toque retal e o PSA já foram feitos; o dado que muda a propedêutica é a **creatinina de 1,9 mg/dL (dobrou em um ano)**: as diretrizes indicam **ultrassonografia de rins e vias urinárias com resíduo pós-miccional** quando há insuficiência renal, hematúria, infecção ou retenção, para procurar hidronefrose e medir o esvaziamento; se houver hidronefrose ou insuficiência renal por obstrução, a indicação passa a ser cirúrgica (desobstrução prostática, com derivação vesical se necessário). O tratamento inicial é o **alfabloqueador** (tansulosina, doxazosina), que relaxa colo vesical e próstata. A (ultrassonografia; betanecol) e B (toque retal; betanecol): o betanecol é colinérgico usado na bexiga hipocontrátil e piora a obstrução, sendo inadequado na HPB; em B, o toque retal também já foi realizado. C (toque retal; alfabloqueador) acerta o fármaco, mas repete um exame já feito e não investiga a repercussão renal.",
  "explicacoesAlternativas": {},
  "referencias": "EAU Guidelines on Management of Non-neurogenic Male LUTS; AUA Guideline on Management of BPH/LUTS; Sociedade Brasileira de Urologia, diretrizes de HPB.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q10 da UNIFESP 2024
{
  "id": "q-adap24-007",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-infecto",
  "assuntoId": "ass-itu",
  "enunciado": "Mulher, 28 anos, vida sexual ativa, previamente saudável, procura o Pronto Socorro com febre de 38,6 ºC e dor lombar à direita há 24 horas, precedidas de disúria. Bom estado geral, hidratada, tolera líquidos e comprimidos, sem náuseas ou vômitos; PA = 118/76 mmHg, FC = 96 bpm; sinal de Giordano positivo à direita. Teste de gravidez negativo. Exame de urina: leucocitúria e nitrito positivo. Ultrassonografia de vias urinárias sem hidronefrose ou cálculos. Não usou antibiótico nos últimos 3 meses. Qual é a conduta baseada no diagnóstico mais provável?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Ureterolitotripsia."
    },
    {
      "id": "B",
      "texto": "Passagem de cateter duplo J."
    },
    {
      "id": "C",
      "texto": "Antibioticoterapia endovenoso com cobertura para gram(-)."
    },
    {
      "id": "D",
      "texto": "Antibioticoterapia oral com cobertura para gram(-)."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **febre, dor lombar com Giordano positivo e leucocitúria com nitrito** em mulher jovem e sexualmente ativa = **pielonefrite aguda não complicada**, cujo agente é Escherichia coli em cerca de 80% dos casos. A paciente tem **bom estado geral, tolera via oral, não está grávida, não tem comorbidades e a ultrassonografia não mostra obstrução**: critérios para **tratamento ambulatorial com antibiótico por via oral** e cobertura para gram-negativos (cefalosporina oral ou fluoroquinolona, conforme a resistência local, por 7 a 14 dias), com urocultura antes do início e reavaliação em 48 a 72 horas. C (antibioticoterapia endovenosa) fica reservada para vômitos, sepse, gestação, imunossupressão, obstrução ou falha da via oral. A (ureterolitotripsia) e B (cateter duplo J) tratam litíase obstrutiva ou pielonefrite obstrutiva, afastadas pela ausência de cólica renal e de hidronefrose.",
  "explicacoesAlternativas": {},
  "referencias": "IDSA/ESCMID. International clinical practice guidelines for acute uncomplicated cystitis and pyelonephritis in women; EAU Guidelines on Urological Infections; Sociedade Brasileira de Infectologia.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q11 da UNIFESP 2024
{
  "id": "q-adap24-008",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-abdagudo",
  "assuntoId": "ass-cirbariatrica",
  "enunciado": "Mulher, 43 anos, IMC pré-operatório de 46 kg/m2, diabética e hipertensa, no quinto dia de pós-operatório de bypass gástrico em Y de Roux por via laparoscópica, com pouca deambulação. Refere dispneia de início súbito e dor torácica ventilatório-dependente. Exame físico: REG, FC = 128 bpm, PA = 105/65 mmHg, FR = 30 irpm, SpO2 = 86% em ar ambiente, afebril; panturrilha esquerda edemaciada e dolorosa; ausculta pulmonar sem ruídos adventícios; abdome flácido, indolor à palpação e sem sinais de peritonismo; ferida operatória sem secreção. Qual é o diagnóstico mais provável?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Deiscência do pouch gástrico."
    },
    {
      "id": "B",
      "texto": "Tromboembolismo pulmonar."
    },
    {
      "id": "C",
      "texto": "Colecistite aguda alitiásica."
    },
    {
      "id": "D",
      "texto": "Colite pseudomembranosa."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **dispneia súbita, dor pleurítica, FC = 128, FR = 30 e SpO2 = 86%** com **panturrilha edemaciada e dolorosa** (trombose venosa profunda) e **abdome indolor**, em paciente com **fatores de risco**: obesidade grau III, cirurgia recente, diabetes e imobilidade. O tromboembolismo pulmonar é, junto com a fístula anastomótica, uma das principais causas de morte após cirurgia bariátrica. A (deiscência do pouch gástrico) causa taquicardia persistente, febre, dor abdominal e peritonismo; aqui o abdome é benigno e os achados apontam para o pulmão. C (colecistite aguda alitiásica) cursa com dor no hipocôndrio direito, Murphy e febre. D (colite pseudomembranosa) exige diarreia após uso de antibiótico, distensão abdominal e leucocitose, ausentes. A conduta é anticoagulação imediata, após confirmação por angiotomografia de tórax (ou ecocardiograma à beira do leito, se instável).",
  "explicacoesAlternativas": {},
  "referencias": "ESC Guidelines for the diagnosis and management of acute pulmonary embolism, 2019; ASMBS, profilaxia de tromboembolismo venoso em cirurgia bariátrica; Sociedade Brasileira de Cirurgia Bariátrica e Metabólica.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q12 da UNIFESP 2024
{
  "id": "q-adap24-009",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-abdagudo",
  "assuntoId": "ass-diverticulite",
  "enunciado": "Mulher, 72 anos, hipertensa e obesa (IMC 35 kg/m2), com dieta pobre em fibras, refere há 6 meses episódios recorrentes de dor em cólica em fossa ilíaca esquerda, que alivia após evacuar, com alternância entre constipação e fezes amolecidas, sem muco ou sangue visíveis, sem febre e sem perda de peso. Exame físico: corada, afebril, abdome globoso, flácido, doloroso à palpação profunda em fossa ilíaca esquerda, sem sinais de peritonite; toque retal sem alterações. Exames: Hb = 13,4 g/dL, VCM = 90 fL, leucócitos = 7.800/mm3, PCR normal. Colonoscopia: múltiplos óstios diverticulares no cólon sigmoide, sem lesões vegetantes ou ulceradas. Qual é o diagnóstico mais provável?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Doença de Crohn de íleo terminal."
    },
    {
      "id": "B",
      "texto": "Adenocarcinoma do cólon direito."
    },
    {
      "id": "C",
      "texto": "Doença diverticular do cólon."
    },
    {
      "id": "D",
      "texto": "Tumor neuroendócrino de apêndice."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **mulher de 72 anos, obesa, com dieta pobre em fibras** (a prevalência de divertículos ultrapassa 60% após os 70 anos), **dor em cólica em fossa ilíaca esquerda** (topografia do sigmoide), **alteração do hábito intestinal**, **colonoscopia com múltiplos óstios diverticulares no sigmoide e sem lesões vegetantes** e **Hb = 13,4, VCM = 90, sem perda de peso e sem sinais inflamatórios**: doença diverticular sintomática não complicada. A (doença de Crohn de íleo terminal) é mais comum em jovens, com diarreia, dor em fossa ilíaca direita, anemia e emagrecimento. B (adenocarcinoma do cólon direito) causa anemia ferropriva, perda de peso e massa em fossa ilíaca direita, e foi afastado pelo hemograma normal e pela colonoscopia. D (tumor neuroendócrino de apêndice) costuma ser achado incidental de apendicectomia e só raramente causa síndrome carcinoide.",
  "explicacoesAlternativas": {},
  "referencias": "ASCRS Clinical Practice Guidelines for the Management of Left-Sided Colonic Diverticulitis, 2020; World Gastroenterology Organisation, Diverticular disease; Sociedade Brasileira de Coloproctologia.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q13 da UNIFESP 2024
{
  "id": "q-adap24-010",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-cirtoracica",
  "assuntoId": "ass-cirtorax-neoplasia",
  "enunciado": "Homem, 67 anos, tabagista de 50 anos-maço, portador de DPOC grave (VEF1 = 0,9 L, 32% do previsto; DLCO = 30% do previsto), assintomático do ponto de vista oncológico, tem na tomografia de tórax um nódulo sólido e espiculado de 15 mm, periférico, no lobo superior direito, a 2 cm da pleura. Biópsia transtorácica: adenocarcinoma invasivo, primário de pulmão. PET-CT: captação no nódulo (SUV = 12,4) e sem captação nos linfonodos mediastinais (SUV = 1,8), sem metástases à distância; ressonância de crânio normal. A equipe considera o paciente funcionalmente inoperável. Entre as opções, qual é a conduta mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Quimioterapia e radioterapia."
    },
    {
      "id": "B",
      "texto": "Pneumonectomia para ressecção oncológica completa."
    },
    {
      "id": "C",
      "texto": "Biópsia dos linfonodos mediastinais."
    },
    {
      "id": "D",
      "texto": "Ablação da lesão pulmonar por radiofrequência."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: adenocarcinoma de **15 mm, periférico (cT1b)**, com **linfonodos mediastinais sem captação no PET (SUV = 1,8)** e sem metástases: **estádio I (cT1bN0M0)**. O tratamento padrão é a lobectomia, mas o paciente é **inoperável** (**VEF1 32% e DLCO 30%**). Nesses casos a conduta é o tratamento local não cirúrgico: a radioterapia estereotáxica (SBRT) é a primeira escolha quando disponível, e a **ablação percutânea por radiofrequência ou micro-ondas é alternativa aceita para tumores periféricos de até 3 cm**, como este, afastados do hilo e de estruturas críticas. A (quimioterapia e radioterapia) é o tratamento do estádio III irressecável. B (pneumonectomia) é uma ressecção excessiva para tumor de 15 mm e inviável pela reserva pulmonar; mesmo em operáveis o padrão é a lobectomia. C (biópsia dos linfonodos mediastinais) é indicada quando há captação nodal no PET, tumor central ou linfonodos aumentados, o que não ocorre aqui.",
  "explicacoesAlternativas": {},
  "referencias": "NCCN Guidelines, Non-Small Cell Lung Cancer; ACCP Lung Cancer Guidelines (Chest, 3rd ed.); ESTS guidelines for preoperative lymph node staging for non-small cell lung cancer.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q15 da UNIFESP 2024
{
  "id": "q-adap24-011",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-trauma",
  "assuntoId": "ass-traumaabd",
  "enunciado": "Homem, 45 anos, vítima de queda de telhado (6 metros) há 1 hora, dá entrada na sala de emergência de um hospital especializado em trauma. Na chegada, PA = 80/50 mmHg e índice de choque de 1,5, que se mantém acima de 1,3 após infusão de 2.000 mL de cristaloide e 2 concentrados de hemácias. Abdome distendido e doloroso, com FAST positivo em quatro quadrantes. Levado ao centro cirúrgico, a laparotomia mostra hemoperitônio volumoso e avulsão do hilo esplênico (lesão grau V), com sangramento ativo. Qual é a conduta mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Arteriografia com embolização."
    },
    {
      "id": "B",
      "texto": "Observação em UTI."
    },
    {
      "id": "C",
      "texto": "Esplenectomia total."
    },
    {
      "id": "D",
      "texto": "Esplenectomia parcial."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **PA = 80/50 e índice de choque de 1,5, sem resposta após 2.000 mL de cristaloide e 2 concentrados de hemácias** = **instabilidade hemodinâmica (não respondedor)**; **FAST positivo** e **abdome distendido**; na laparotomia, **avulsão do hilo esplênico (grau V) com sangramento ativo**. Paciente instável com lesão esplênica não tem indicação de tratamento não operatório: a conduta é cirúrgica e, com lesão hilar que desvasculariza o órgão, é a **esplenectomia total**, rápida e definitiva (seguida de vacinação contra pneumococo, meningococo e Haemophilus influenzae tipo b). A (arteriografia com embolização) é opção em paciente estável com extravasamento de contraste (blush) na tomografia. B (observação em UTI) é o tratamento não operatório de pacientes estáveis com lesões de menor grau. D (esplenectomia parcial) exige parênquima viável e vascularização preservada em paciente estável, o que a lesão hilar com sangramento ativo e choque não permite.",
  "explicacoesAlternativas": {},
  "referencias": "Coccolini F et al. WSES classification and guidelines for adult and pediatric splenic injuries, 2017; American College of Surgeons, ATLS 10th ed.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q18 da UNIFESP 2024
{
  "id": "q-adap24-012",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-neurocirurgia",
  "assuntoId": "ass-neurocir-plexobraquial",
  "enunciado": "Homem, 24 anos, motociclista, sofre queda com o membro superior direito preso ao guidão em hiperabdução, com tração violenta do braço. Apresenta avulsão traumática das raízes de C8 e T1 à direita (lesão do plexo braquial inferior). Qual é a localização do déficit sensitivo e motor?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Face medial do antebraço e extensores do punho."
    },
    {
      "id": "B",
      "texto": "Face lateral do antebraço e flexores do punho."
    },
    {
      "id": "C",
      "texto": "Face lateral do antebraço e extensores do punho."
    },
    {
      "id": "D",
      "texto": "Face medial do antebraço e flexores do punho."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **avulsão das raízes C8 e T1** (plexo inferior, paralisia de Klumpke) por **tração com o braço em hiperabdução**, mecanismo típico de acidentes de moto, que são a causa mais comum de lesão do plexo braquial no Brasil, atingindo sobretudo homens jovens. O território sensitivo de C8-T1 é a **face medial (ulnar) do antebraço e da mão**, e o déficit motor é dos **flexores do punho e dos dedos** (flexor ulnar do carpo, flexores profundos) e dos músculos intrínsecos da mão, que produzem a «mão em garra». Entre as opções, só D combina território medial com flexores. A (face medial do antebraço e extensores do punho) mistura o território sensitivo inferior com a motricidade das raízes C6-C7. B (face lateral do antebraço e flexores do punho) mistura o território de C6 com os flexores. C (face lateral do antebraço e extensores do punho) é o padrão da lesão de C6 (tronco superior), em que o antebraço lateral é inervado pelo nervo musculocutâneo e os extensores do punho por C6-C7.",
  "explicacoesAlternativas": {},
  "referencias": "Moore KL, Anatomia Orientada para a Clínica (plexo braquial); Rowland LP, Merritt Tratado de Neurologia; Campbell's Operative Orthopaedics, lesões do plexo braquial.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q22 da UNIFESP 2024
{
  "id": "q-adap24-013",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-infecto",
  "assuntoId": "ass-parasitoses",
  "enunciado": "Homem, 26 anos, lavrador, natural e residente em área rural do interior de Pernambuco, com história de banhos em açudes desde a infância, é levado ao pronto atendimento com hematêmese de grande volume há 2 dias. Nega etilismo e uso de drogas. Exame físico: corado após reposição, anictérico, sem ascite, sem estigmas de hepatopatia crônica; fígado de borda firme no lobo esquerdo e baço palpável a 8 cm do rebordo costal esquerdo. Exames: transaminases, bilirrubinas, albumina (3,9 g/dL) e INR normais; plaquetas = 68.000/mm3; sorologias para hepatites B e C negativas. Ultrassonografia: fibrose periportal em «tronco de árvore», veia porta dilatada e esplenomegalia. Endoscopia: varizes esofágicas de grosso calibre. Qual é o diagnóstico mais provável?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Colangite biliar primária."
    },
    {
      "id": "B",
      "texto": "Esquistossomose hepato esplênica."
    },
    {
      "id": "C",
      "texto": "Esteato hepatite."
    },
    {
      "id": "D",
      "texto": "Colecistite crônica calculosa."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **adulto jovem, lavrador do interior de Pernambuco, com contato com água de açude** (o Nordeste e Minas Gerais concentram as áreas endêmicas de Schistosoma mansoni no Brasil), **hematêmese por varizes** com **esplenomegalia volumosa e plaquetopenia** (hiperesplenismo), **função hepática preservada** (albumina, INR e bilirrubinas normais), **fibrose periportal em «tronco de árvore»** e **sorologias virais negativas**: hipertensão portal pré-sinusoidal da **esquistossomose hepatoesplênica**. A (colangite biliar primária) acomete mulheres de meia-idade, com prurido, fosfatase alcalina elevada e anticorpo antimitocondrial. C (esteato-hepatite) ocorre em pessoas com síndrome metabólica e, quando chega à hipertensão portal, já há cirrose com insuficiência hepática. D (colecistite crônica calculosa) causa cólica biliar, sem hipertensão portal. A confirmação é o exame parasitológico de fezes (Kato-Katz), e o tratamento da parasitose é o praziquantel.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde. Vigilância da Esquistossomose Mansoni: diretrizes técnicas, 4ª ed., 2014; Sociedade Brasileira de Hepatologia; Sociedade Brasileira de Infectologia.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q23 da UNIFESP 2024
{
  "id": "q-adap24-014",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-infecto",
  "assuntoId": "ass-parasitoses",
  "enunciado": "Menino, 6 anos, filho de família de baixa renda, residente em área rural sem saneamento básico e que brinca descalço no quintal, apresenta há 8 meses diarreia crônica com muco e raias de sangue, tenesmo e dor abdominal, com piora do ganho de peso. A mãe notou que a «tripa saiu pelo ânus» durante uma evacuação. Exame físico: emagrecido, descorado ++/4+; prolapso retal redutível; sem fístulas ou lesões perianais. Hemograma: Hb = 8,5 g/dL, VCM = 68 fL e eosinofilia de 12%. Exame parasitológico de fezes: ovos em forma de barril com tampões polares nas extremidades. Qual é o diagnóstico mais provável?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Retocolite ulcerativa."
    },
    {
      "id": "B",
      "texto": "Câncer colorretal."
    },
    {
      "id": "C",
      "texto": "Doença de Crohn."
    },
    {
      "id": "D",
      "texto": "Tricuríase."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **criança de 6 anos em área rural sem saneamento, que anda descalça** (a tricuríase é uma geo-helmintíase de transmissão fecal-oral, comum em crianças e em regiões tropicais úmidas), **diarreia crônica com muco e sangue e tenesmo**, **prolapso retal**, **anemia ferropriva com eosinofilia** e **ovos em forma de barril com tampões polares**, característicos de Trichuris trichiura. Nas cargas parasitárias elevadas, a colite, a perda sanguínea e o prolapso retal explicam o quadro. A (retocolite ulcerativa) causa diarreia sanguinolenta contínua, mas sem ovos nas fezes e sem eosinofilia. B (câncer colorretal) é raro nessa idade. C (doença de Crohn) cursa com fístulas, doença perianal e inflamação transmural, sem parasitas. O tratamento é com albendazol ou mebendazol, associado a medidas de saneamento.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde. Guia de Vigilância em Saúde (geo-helmintíases); Bethony J et al. Soil-transmitted helminth infections: ascariasis, trichuriasis, and hookworm. Lancet, 2006.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q24 da UNIFESP 2024
{
  "id": "q-adap24-015",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-reumato",
  "assuntoId": "ass-reumato-les",
  "enunciado": "Mulher, 30 anos, com diagnóstico de lúpus eritematoso sistêmico há 3 anos (nefrite lúpica, anti-dsDNA positivo e complemento baixo), em uso irregular de hidroxicloroquina, apresenta há 5 dias erupção de vesículas tensas e bolhas, pouco pruriginosas, no rosto, no «V» do decote, nos antebraços e no dorso das mãos, com extensão para o tronco, após exposição solar prolongada em viagem à praia. Exame dermatológico: vesículas e bolhas tensas de conteúdo claro sobre base eritematosa, sem sinal de Nikolsky. Biópsia: bolha subepidérmica com abundantes neutrófilos na derme papilar; imunofluorescência direta com depósito linear e granular de IgG, IgM, IgA e C3 na zona da membrana basal. Qual é o diagnóstico mais provável?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Lúpus bolhoso."
    },
    {
      "id": "B",
      "texto": "Dermatite atópica."
    },
    {
      "id": "C",
      "texto": "Herpes Zoster."
    },
    {
      "id": "D",
      "texto": "Eczema de contato fototóxico."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **mulher jovem com lúpus ativo** (nefrite, anti-dsDNA e complemento baixo), **vesículas e bolhas tensas em áreas fotoexpostas**, **bolha subepidérmica com infiltrado de neutrófilos na derme papilar** e **imunofluorescência com depósito linear e granular de imunoglobulinas e C3 na membrana basal** (anticorpos contra o colágeno VII): **lúpus bolhoso**, manifestação rara associada à atividade da doença, mais comum em mulheres em idade fértil. B (dermatite atópica) cursa com eczema crônico em flexuras e prurido intenso, sem bolhas tensas nem depósito na membrana basal. C (herpes zóster) é unilateral e dermatomal, com vesículas agrupadas e dor neuropática. D (eczema de contato fototóxico) é uma reação semelhante à queimadura solar exagerada por substância fotossensibilizante, com ardor, sem doença sistêmica, histologia inflamatória inespecífica e imunofluorescência negativa. O tratamento do lúpus bolhoso é feito com dapsona, além do controle da doença de base.",
  "explicacoesAlternativas": {},
  "referencias": "Bolognia JL et al. Dermatology, 4th ed. (lúpus eritematoso cutâneo e doenças bolhosas autoimunes); Sociedade Brasileira de Reumatologia, consenso de lúpus eritematoso sistêmico.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q25 da UNIFESP 2024
{
  "id": "q-adap24-016",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-reumato",
  "assuntoId": "ass-reumato-vasculites",
  "enunciado": "Mulher, 54 anos, apresenta há 3 semanas febre baixa, emagrecimento de 5 kg e mialgias, seguidos de púrpura palpável nos membros inferiores, hematúria e queda do pé direito. Exames: creatinina = 3,2 mg/dL (era 0,9 mg/dL há 2 meses), urina com hemácias dismórficas e proteinúria, FAN negativo, complemento normal, p-ANCA com anti-mieloperoxidase (anti-MPO) positivo; sorologias para hepatites B e C e HIV negativas, crioglobulinas ausentes. Qual é o diagnóstico mais provável?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Lúpus eritematoso sistêmico."
    },
    {
      "id": "B",
      "texto": "Dermatomiosite."
    },
    {
      "id": "C",
      "texto": "Esclerose sistêmica."
    },
    {
      "id": "D",
      "texto": "Vasculite de pequenos vasos."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **mulher de 54 anos** (as vasculites associadas ao ANCA predominam após os 50 anos), **púrpura palpável, glomerulonefrite rapidamente progressiva (creatinina de 0,9 para 3,2 mg/dL, hemácias dismórficas)** e **mononeurite múltipla (queda do pé)**, com **p-ANCA anti-MPO positivo**, **FAN negativo, complemento normal** e causas secundárias excluídas (hepatites, HIV, crioglobulinas): **vasculite de pequenos vasos associada ao ANCA (poliangiite microscópica)**. A (lúpus eritematoso sistêmico) teria FAN positivo, anti-dsDNA e complemento baixo. B (dermatomiosite) cursa com fraqueza muscular proximal, heliotropo, pápulas de Gottron e CPK elevada. C (esclerose sistêmica) apresenta fenômeno de Raynaud, espessamento cutâneo e anticorpos anticentrômero ou anti-Scl-70; a crise renal esclerodérmica é hipertensiva e sem hematúria dismórfica ou púrpura. O tratamento é corticoide associado a rituximabe ou ciclofosfamida.",
  "explicacoesAlternativas": {},
  "referencias": "Jennette JC et al. 2012 Revised International Chapel Hill Consensus Conference Nomenclature of Vasculitides; 2022 ACR/EULAR classification criteria for microscopic polyangiitis; Sociedade Brasileira de Reumatologia.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q26 da UNIFESP 2024
{
  "id": "q-adap24-017",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-dermato",
  "assuntoId": "ass-derm-infeccoes",
  "enunciado": "Homem, 44 anos, auxiliar de necropsia em serviço de verificação de óbitos de hospital de referência em tuberculose, feriu a mão direita com bisturi há 3 semanas durante a necropsia de paciente com tuberculose pulmonar cavitária. Exame físico: lesão papulonodular ulcerada, pouco dolorosa, no dorso da mão direita, com eritema ao redor e linfadenopatia axilar direita. Cultura do aspirado: bacilos álcool-ácido resistentes, retos e finos, não filamentosos, com crescimento em meio de Löwenstein-Jensen após 5 semanas; teste molecular rápido detecta complexo Mycobacterium tuberculosis, sem resistência à rifampicina. Qual é o agente etiológico mais provável?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Erysipelothrix rhusiopathiae."
    },
    {
      "id": "B",
      "texto": "Nocardia brasiliensis."
    },
    {
      "id": "C",
      "texto": "Mycobacterium tuberculosis."
    },
    {
      "id": "D",
      "texto": "Raoultella terrígena."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **auxiliar de necropsia ferido ao manipular cadáver com tuberculose cavitária** (a inoculação cutânea é risco ocupacional descrito, no cancro tuberculoso e na tuberculose verrucosa), **lesão ulcerada com linfadenopatia regional**, **bacilos álcool-ácido resistentes retos e não filamentosos**, **crescimento lento (5 semanas) em Löwenstein-Jensen** e **teste molecular positivo para o complexo M. tuberculosis**. A (Erysipelothrix rhusiopathiae) causa o erisipeloide em manipuladores de carne e peixe, com bacilo gram-positivo que não é álcool-ácido resistente. B (Nocardia brasiliensis) causa forma esporotricoide em lavradores após trauma com vegetais, mas é filamentosa, parcialmente álcool-ácido resistente e cresce em dias. D (Raoultella terrigena) é bacilo gram-negativo, causador raro de infecção oportunista. O tratamento é o esquema básico para tuberculose, e a doença é de notificação compulsória e, neste caso, relacionada ao trabalho.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde. Manual de Recomendações para o Controle da Tuberculose no Brasil, 2019; Bolognia JL et al. Dermatology, 4th ed. (tuberculose cutânea).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q27 da UNIFESP 2024
{
  "id": "q-adap24-018",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-infecto",
  "assuntoId": "ass-tuberculose",
  "enunciado": "Mulher, 27 anos, auxiliar de limpeza em hospital, com queixa de tosse seca há 6 semanas, febre vespertina, sudorese noturna e perda de 6 kg. Mora com a mãe, que está em tratamento para tuberculose pulmonar. Tem rinossinusite alérgica e faz uso regular de beclometasona nasal; refere também regurgitação e pirose ocasionais. Nunca fumou. Exame físico sem alterações dignas de nota. Não consegue expectorar. Radiografia de tórax: opacidades nodulares no ápice do pulmão direito. Considerando a hipótese diagnóstica mais provável, qual é a conduta mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Teste molecular para Mycobacterium tuberculosis no escarro induzido."
    },
    {
      "id": "B",
      "texto": "Tomografia de tórax de alta resolução."
    },
    {
      "id": "C",
      "texto": "Nasofibroscopia."
    },
    {
      "id": "D",
      "texto": "Teste terapêutico com inibidor de bomba de prótons e orientações dietético-posturais."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **tosse há 6 semanas** (mais de 3 semanas define o sintomático respiratório), **febre vespertina, sudorese noturna e perda de 6 kg**, **contato domiciliar com tuberculose pulmonar**, **profissional de limpeza hospitalar** (exposição ocupacional) e **opacidades apicais na radiografia**: **tuberculose pulmonar**, que no Brasil tem incidência próxima de 35 a 40 casos por 100 mil habitantes e deve ser a primeira hipótese diante desse quadro. Como a paciente **não consegue expectorar**, indica-se o **escarro induzido** e o diagnóstico pelo **teste rápido molecular (TRM-TB)**, que detecta o bacilo e a resistência à rifampicina em poucas horas, associado à cultura. B (tomografia de tórax de alta resolução) não é o exame inicial. C (nasofibroscopia) investigaria síndrome da tosse das vias aéreas superiores. D (teste terapêutico com inibidor de bomba de prótons) trataria refluxo, causa de tosse crônica seca sem sintomas constitucionais. A rinite e a pirose são distratores: causam tosse, mas não explicam emagrecimento, febre e lesão apical.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde. Manual de Recomendações para o Controle da Tuberculose no Brasil, 2019; Sociedade Brasileira de Pneumologia e Tisiologia, recomendações para diagnóstico e tratamento da tuberculose.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q28 da UNIFESP 2024
{
  "id": "q-adap24-019",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-infecto",
  "assuntoId": "ass-hiv",
  "enunciado": "Em 2022, a levedura Cryptococcus neoformans foi incluída pela Organização Mundial de Saúde no grupo de prioridade crítica entre os patógenos fúngicos, demandando ações preventivas por parte de gestores de saúde de diferentes países. Trata-se de levedura encapsulada, de distribuição ambiental ampla (solo contaminado por excretas de aves, como pombos), que raramente causa doença invasiva em pessoas imunocompetentes. A característica deste agente que justifica seu impacto na saúde humana é o seu alto potencial de:",
  "alternativas": [
    {
      "id": "A",
      "texto": "Causar surtos de pneumonia em pessoas imunocompetentes, por transmissão respiratória de pessoa para pessoa."
    },
    {
      "id": "B",
      "texto": "Colonizar pacientes em ambiente hospitalar por tempo prolongado, de desenvolver resistência a antifúngicos e causar surtos em hospitais."
    },
    {
      "id": "C",
      "texto": "Desenvolver quadros de infecção de sistema nervoso central em pacientes com doenças associadas a imunodepressão."
    },
    {
      "id": "D",
      "texto": "Causar doenças crônicas de pele, altamente contagiosas pela presença de secreção e potencialmente resistentes a múltiplos antifúngicos."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **Cryptococcus neoformans**, **inalado a partir de ambiente contaminado por fezes de pombos**, **raramente causa doença em imunocompetentes** e entra no grupo de prioridade crítica da OMS (2022) porque, em quem tem **imunossupressão** (aids com CD4 < 100 células/mm3, transplantados, uso de corticoide), **dissemina para o sistema nervoso central** e causa meningoencefalite grave, com mortalidade elevada, sendo causa importante de morte em pessoas vivendo com HIV. A (surtos de pneumonia em imunocompetentes por transmissão de pessoa para pessoa) está incorreta: a infecção é adquirida do ambiente por inalação, não há transmissão interpessoal e a doença invasiva é rara em imunocompetentes. B (colonização hospitalar prolongada, resistência e surtos) descreve Candida auris, não o Cryptococcus, que não se dissemina por transmissão entre pacientes. D (doenças crônicas de pele contagiosas e multirresistentes) não corresponde ao Cryptococcus, cuja forma cutânea é secundária à disseminação e não é contagiosa. O tratamento de indução usa anfotericina B associada à flucitosina.",
  "explicacoesAlternativas": {},
  "referencias": "WHO fungal priority pathogens list to guide research, development and public health action, 2022; WHO Guidelines for diagnosing, preventing and managing cryptococcal disease, 2022; Ministério da Saúde, PCDT para manejo da infecção pelo HIV em adultos.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q29 da UNIFESP 2024
{
  "id": "q-adap24-020",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-cardio",
  "assuntoId": "ass-has",
  "enunciado": "Homem, 46 anos, motorista de caminhão, tabagista, sedentário e obeso (IMC 33 kg/m2), sem doenças prévias e sem uso de medicações, comparece para consulta de rotina. Em duas consultas, as medidas da pressão arterial no consultório foram de 132/84 e 136/86 mmHg, com exame físico sem outras alterações. Realizou Monitorização Ambulatorial de Pressão Arterial (MAPA), cujo resultado está na figura. Qual é o diagnóstico mais adequado?",
  "imagemUrl": "dados/imagens/q-adap24-020.png",
  "imagemLegenda": "MAPA de 24 horas (ilustração esquemática).",
  "alternativas": [
    {
      "id": "A",
      "texto": "Hipertensão do avental branco."
    },
    {
      "id": "B",
      "texto": "Hipertensão mascarada."
    },
    {
      "id": "C",
      "texto": "Hipertensão sustentada com efeito do avental branco."
    },
    {
      "id": "D",
      "texto": "Hipertensão sustentada."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado e da figura: **PA de consultório < 140/90 mmHg em duas consultas (132/84 e 136/86)** com **MAPA alterada: média de 24 horas de 134/84 (corte ≥ 130/80), vigília 138/88 (corte ≥ 135/85) e sono 124/74 (corte ≥ 120/70)**: pressão normal no consultório e elevada fora dele define a **hipertensão mascarada**. É mais frequente em homens, tabagistas, obesos, sedentários e diabéticos, e leva ao mesmo risco cardiovascular da hipertensão sustentada, por isso deve ser tratada. A (hipertensão do avental branco) é o inverso: PA elevada no consultório e normal na MAPA (< 130/80 mmHg em 24 horas). C (hipertensão sustentada com efeito do avental branco) pressupõe PA de consultório elevada e ainda mais alta que a ambulatorial, o que não ocorre. D (hipertensão sustentada) exige PA elevada no consultório e na MAPA.",
  "explicacoesAlternativas": {},
  "referencias": "Diretrizes Brasileiras de Hipertensão Arterial, 2020 (SBC/SBH/SBN); Diretrizes de Monitorização Ambulatorial da Pressão Arterial (MAPA) e MRPA.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q30 da UNIFESP 2024
{
  "id": "q-adap24-021",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-cardio",
  "assuntoId": "ass-ic",
  "enunciado": "Homem, 56 anos, natural do interior de Minas Gerais, morou na infância em casa de pau a pique e tem sorologia positiva para doença de Chagas, apresenta dispneia aos pequenos esforços (classe funcional III) e edema de membros inferiores. Exame físico: PA = 100/68 mmHg, FC = 78 bpm; estase jugular, estertores bibasais e edema 2+/4+. Holter: o traçado da figura foi registrado durante um dos episódios sintomáticos. Exames: creatinina = 2,1 mg/dL (TFG ≈ 34 mL/min/1,73 m2); K = 5,8 mEq/L. Ecocardiograma: dilatação ventricular esquerda e fração de ejeção de 30%. Qual é o tratamento mais adequado neste momento, entre as opções?",
  "imagemUrl": "dados/imagens/q-adap24-021.png",
  "imagemLegenda": "Registro do Holter durante o episódio sintomático (ilustração esquemática).",
  "alternativas": [
    {
      "id": "A",
      "texto": "Bisoprolol, enalapril, dapagliflozina e espironolactona."
    },
    {
      "id": "B",
      "texto": "Carvedilol, furosemida, amiodarona e dapagliflozina."
    },
    {
      "id": "C",
      "texto": "Metoprolol, digoxina, hidroclorotiazida e enalapril."
    },
    {
      "id": "D",
      "texto": "Atenolol, enalapril, furosemida e anlodipino."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado e da figura: **cardiopatia chagásica** (origem em área endêmica, moradia de pau a pique, sorologia positiva) com **insuficiência cardíaca de fração de ejeção reduzida (FE = 30%) e congestão**, **taquicardia ventricular não sustentada sintomática** (na figura: complexos QRS largos, sem onda P, a cerca de 180 bpm) e **K = 5,8 mEq/L com TFG ≈ 34**. O esquema deve ter betabloqueador baseado em evidência (**carvedilol**), **inibidor de SGLT2 (dapagliflozina**, que pode ser usada com TFG ≥ 25 e reduz hospitalizações), **diurético de alça (furosemida)** para a congestão e o **antiarrítmico de escolha na doença de Chagas, a amiodarona**; inibidor da ECA, BRA ou ARNI e espironolactona ficam suspensos até o controle da hiperpotassemia e da função renal, para depois serem reintroduzidos. A (bisoprolol, enalapril, dapagliflozina e espironolactona) combina inibidor da ECA e antagonista da aldosterona com K = 5,8 e TFG ≈ 34, com risco de hiperpotassemia grave. C (metoprolol, digoxina, hidroclorotiazida e enalapril) mantém digoxina e tiazídico em paciente com TFG ≈ 34 (toxicidade da digoxina e perda de eficácia do tiazídico) e enalapril com potássio elevado. D (atenolol, enalapril, furosemida e anlodipino) usa atenolol, sem benefício demonstrado na IC, e anlodipino, sem papel no tratamento, além do enalapril com hiperpotassemia.",
  "explicacoesAlternativas": {},
  "referencias": "Diretriz Brasileira de Insuficiência Cardíaca Crônica e Aguda (SBC, 2018 e atualização 2021); Diretriz da SBC sobre Miocardiopatia de Chagas, 2023; 2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q32 da UNIFESP 2024
{
  "id": "q-adap24-022",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-mps",
  "especialidadeId": "esp-saudefamilia",
  "assuntoId": "ass-tabagismo",
  "enunciado": "Mulher, 30 anos, refere vontade de parar de fumar. Fuma 20 cigarros por dia, sendo o primeiro 5 minutos após acordar, acha difícil não fumar em lugares proibidos e fuma mesmo quando está doente. O cigarro que traz mais satisfação é o primeiro da manhã e fuma mais frequentemente neste período. Nega etilismo, uso de outras drogas, antecedentes de convulsão, transtorno alimentar ou uso de outros medicamentos. Para cessação do tabagismo, além da terapia cognitivo comportamental, qual é o tratamento medicamentoso mais indicado para o início da terapia, nos três primeiros dias?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Iniciar bupropiona 150 mg/dia e adesivo de nicotina 21 mg/dia."
    },
    {
      "id": "B",
      "texto": "Iniciar bupropiona 300 mg/dia e adesivo de nicotina 21 mg/dia."
    },
    {
      "id": "C",
      "texto": "Iniciar adesivo de nicotina 21 mg/dia."
    },
    {
      "id": "D",
      "texto": "Iniciar nortriptilina 25mg/dia, podendo chegar até a dose de 150 mg/dia, e adesivo de nicotina 21 mg/dia."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **primeiro cigarro em até 5 minutos, 20 cigarros por dia e fuma doente** = **dependência elevada à nicotina** (teste de Fagerström com 8 pontos: 3 pelo primeiro cigarro em 5 minutos, mais 1 para cada um dos itens dificuldade em locais proibidos, primeiro cigarro como o mais satisfatório, 11 a 20 cigarros por dia, fumar mais pela manhã e fumar doente). Na dependência elevada, o protocolo do Ministério da Saúde recomenda **terapia combinada: adesivo de nicotina 21 mg/dia (para mais de 10 cigarros por dia) e bupropiona**, esta iniciada com **150 mg/dia nos três primeiros dias, passando depois a 150 mg duas vezes ao dia**. Como a paciente **nega convulsão, transtorno alimentar e uso de álcool**, não há contraindicação à bupropiona, que reduz o limiar convulsivo. B (bupropiona 300 mg/dia desde o início) é a dose de manutenção; iniciá-la diretamente aumenta o risco de efeitos adversos, inclusive convulsão. C (adesivo de nicotina isolado) trata, mas na dependência elevada a combinação tem melhor resultado. D (nortriptilina 25 mg/dia, até 150 mg/dia, com adesivo) é segunda linha, reservada para contraindicação à bupropiona ou falha das outras opções.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas do Tabagismo, 2020; INCA, Abordagem e tratamento do fumante: consenso 2001 e atualizações.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q33 da UNIFESP 2024
{
  "id": "q-adap24-023",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-hemato",
  "assuntoId": "ass-hemato-anemias",
  "enunciado": "Homem, 39 anos, usuário crônico de diclofenaco por lombalgia, está internado há 7 dias por hemorragia digestiva alta por úlcera duodenal (tratada por via endoscópica, com 2 concentrados de hemácias transfundidos) e agora está estável, sem novo sangramento. Hemograma de controle: Hb = 8 g/dL, VCM = 90 fL, HCM = 30 pg, leucócitos = 8.000/mm3, plaquetas = 480.000/mm3. Reticulócitos = 10% (corrigidos para o hematócrito de 24%: 5,3%). Qual é o padrão de anemia mais provável neste caso?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Hipercrômica e macrocítica, hiperregenerativa com contagem de reticulócitos altos."
    },
    {
      "id": "B",
      "texto": "Hipocrômica e microcítica, hiporregenerativa com contagem de reticulócitos baixos"
    },
    {
      "id": "C",
      "texto": "Normocrômica e normocítica, hiporregenerativa com contagem de reticulócitos baixos."
    },
    {
      "id": "D",
      "texto": "Normocrômica e normocítica, hiperregenerativa com contagem de reticulócitos altos."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **hemorragia digestiva aguda há 7 dias** (a úlcera péptica por anti-inflamatório e Helicobacter pylori é a principal causa de hemorragia digestiva alta no Brasil, mais frequente em homens de meia-idade), **VCM = 90 fL e HCM = 30 pg** (normocítica e normocrômica, pois a perda de sangue total não altera o tamanho nem a hemoglobinização das hemácias), **reticulócitos = 10% (corrigidos: 5,3%, bem acima do limite de 2 a 3%)** e **plaquetas de 480.000/mm3** (resposta medular): a medula, intacta, responde à perda com **reticulocitose** a partir de 3 a 5 dias, anemia **hiperregenerativa**. A (hipercrômica e macrocítica, hiperregenerativa) descreve anemia com macrocitose acentuada, como na hemólise intensa com muitos reticulócitos, e não a perda sanguínea com VCM normal. B (hipocrômica e microcítica, hiporregenerativa) é a anemia ferropriva crônica, que só aparece com perda sustentada por semanas. C (normocrômica e normocítica, hiporregenerativa) é a anemia da doença crônica, da insuficiência renal ou da aplasia, em que os reticulócitos estão baixos.",
  "explicacoesAlternativas": {},
  "referencias": "Hoffbrand AV, Fundamentos em Hematologia; Wintrobe's Clinical Hematology (classificação das anemias pelo índice de produção reticulocitária).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q34 da UNIFESP 2024
{
  "id": "q-adap24-024",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-oftalmo",
  "assuntoId": "ass-oft-tumores",
  "enunciado": "Homem, 62 anos, tabagista (45 anos-maço), com emagrecimento recente e tosse persistente, queixa-se de embaçamento visual no olho esquerdo há 3 semanas. Fundo de olho: lesão elevada, amelanótica, amarelo-esbranquiçada, subretiniana, com descolamento seroso de retina adjacente. Ultrassonografia ocular: lesão com espessura de 3 mm e alta refletividade interna. Não há história de neoplasia prévia. Baseado na principal hipótese diagnóstica, a investigação para localizar o tumor primário deve ser iniciada por qual órgão?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Pulmão."
    },
    {
      "id": "B",
      "texto": "Cérebro."
    },
    {
      "id": "C",
      "texto": "Rim."
    },
    {
      "id": "D",
      "texto": "Fígado."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **lesão coroidal amelanótica, amarelo-esbranquiçada, com descolamento seroso e alta refletividade interna** (o melanoma de coroide é pigmentado e de baixa refletividade), em **paciente tabagista de 62 anos com tosse e emagrecimento**: **metástase coroidal**, o tumor intraocular maligno mais comum em adultos. O sítio primário mais frequente nos homens é o **pulmão** (nas mulheres, a mama), e a metástase ocular pode ser a primeira manifestação da neoplasia, por isso a investigação começa pela tomografia de tórax. B (cérebro) é sítio de metástase e não origem usual de lesão coroidal. C (rim) é primário possível, porém muito menos frequente que o pulmão. D (fígado) é o órgão de disseminação do melanoma uveal, hipótese que o aspecto da lesão não sustenta.",
  "explicacoesAlternativas": {},
  "referencias": "Shields JA, Shields CL. Intraocular Tumors: An Atlas and Textbook; American Academy of Ophthalmology, Basic and Clinical Science Course (Ocular Oncology); Conselho Brasileiro de Oftalmologia.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q35 da UNIFESP 2024
{
  "id": "q-adap24-025",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-urologia",
  "assuntoId": "ass-uro-litiase",
  "enunciado": "Mulher, 36 anos, com xeroftalmia e xerostomia há 4 anos (síndrome de Sjögren, anti-Ro positivo), apresenta litíase renal de repetição, com 3 episódios em 5 anos, e fraqueza muscular intermitente. Exame físico: peso = 62 kg, PA = 108/70 mmHg. Exames: creatinina = 0,8 mg/dL, potássio = 2,8 mEq/L, cloro = 112 mEq/L, bicarbonato = 15 mEq/L, cálcio total = 9,4 mg/dL, fósforo = 3,4 mg/dL; pH urinário de 6,9 em amostra matinal. Urina de 24 horas: cálcio = 250 mg, citrato = 40 mg. Tomografia: cálculos de fosfato de cálcio e nefrocalcinose medular bilateral. Qual é a etiologia mais provável para a litíase de repetição neste caso?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Hipercalciúria idiopática."
    },
    {
      "id": "B",
      "texto": "Hipocitratúria primária."
    },
    {
      "id": "C",
      "texto": "Hiperparatireoidismo primário."
    },
    {
      "id": "D",
      "texto": "Acidose tubular renal."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **mulher com síndrome de Sjögren** (causa frequente de acidose tubular renal distal em adultos, em doença autoimune mais comum em mulheres), **acidose metabólica hiperclorêmica (bicarbonato 15, cloro 112) com hipopotassemia (2,8) e fraqueza**, **pH urinário de 6,9 mesmo com acidemia** (incapacidade de acidificar a urina; pH urinário persistente acima de 5,5), **citrato urinário de 40 mg/24 h (hipocitratúria intensa)**, **nefrocalcinose medular e cálculos de fosfato de cálcio**: **acidose tubular renal distal (tipo 1)**. A (hipercalciúria idiopática) cursa com cálcio urinário elevado, mas com bicarbonato, potássio e pH urinário normais; aqui o cálcio urinário é limítrofe. B (hipocitratúria primária) é isolada, sem acidose sistêmica e sem hipopotassemia. C (hiperparatireoidismo primário) cursa com hipercalcemia e hipofosfatemia, que aqui estão normais. O tratamento é a reposição de álcali (citrato de potássio).",
  "explicacoesAlternativas": {},
  "referencias": "Diretrizes da Sociedade Brasileira de Urologia, litíase urinária; AUA Guideline, Medical Management of Kidney Stones, 2014; Harrison, Medicina Interna (acidoses tubulares renais).",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q39 da UNIFESP 2024
{
  "id": "q-adap24-026",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-pneumo",
  "assuntoId": "ass-vm",
  "enunciado": "Homem, 24 anos, 1,96 m de altura (peso predito de 90 kg), é encontrado inconsciente em casa após uso de álcool e benzodiazepínico. Na chegada: Glasgow 6, respiração superficial com FR = 6 irpm, SpO2 = 91% em ar ambiente, PA = 110/70 mmHg, FC = 70 bpm. Radiografia de tórax normal e sem doença pulmonar prévia. Indicada intubação orotraqueal para proteção de via aérea e ventilação. Qual é o melhor ajuste inicial da ventilação mecânica?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Ventilação controlada a volume, volume corrente = 420 ml, PEEP = 5 cmH2O, FR = 30 irpm, relação I:E = 1:2, sensibilidade = 2 L/min, FiO2 = 100%."
    },
    {
      "id": "B",
      "texto": "Ventilação controlada a volume, volume corrente = 630 ml, PEEP = 5 cmH2O, FR = 12 irpm, relação I:E = 1:2, sensibilidade = 2 L/min, FiO2 = 40%."
    },
    {
      "id": "C",
      "texto": "Ventilação por pressão de suporte, pressão de suporte = 8 cm H2O, PEEP = 5 cm H2O, sensibilidade = 2 L/min, FiO2 = 100%."
    },
    {
      "id": "D",
      "texto": "Ventilação por pressão de suporte, pressão de suporte = 12 cm H2O, PEEP = 5 cm H2O, relação I:E = 1:2, sensibilidade = 2 L/min, FiO2 = 40%."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **intubação por rebaixamento do nível de consciência (Glasgow 6, FR = 6 irpm)** em paciente com **pulmões normais** (radiografia normal; a SpO2 de 91% se explica pela hipoventilação), em que a meta é a ventilação protetora fisiológica e não a de síndrome do desconforto respiratório agudo. O volume corrente deve ser calculado pelo **peso predito (altura de 1,96 m, cerca de 90 kg)**: 6 a 8 mL/kg correspondem a 540 a 720 mL, e **630 mL = 7 mL/kg**. Como não há drive respiratório, usa-se **modo controlado (VCV)**, com **FR de 12 irpm**, **PEEP de 5 cmH2O** e **FiO2 de 40%**, titulada depois para SpO2 de 94 a 98% (evitar hiperóxia). A (volume de 420 mL, FR de 30 e FiO2 de 100%) subestima o volume (cerca de 4,7 mL/kg do peso predito), causa hiperventilação com alcalose respiratória e auto-PEEP e expõe à hiperóxia sem necessidade. C (pressão de suporte de 8 com FiO2 de 100%) e D (pressão de suporte de 12) usam modo espontâneo, que exige drive respiratório preservado; com Glasgow 6 e FR de 6 irpm o paciente ficaria em hipoventilação ou apneia, e C ainda mantém FiO2 de 100% sem indicação.",
  "explicacoesAlternativas": {},
  "referencias": "Diretrizes Brasileiras de Ventilação Mecânica (AMIB/SBPT, 2013); ARDS Network (volume corrente pelo peso predito); Miller, Anestesia (ventilação mecânica intraoperatória).",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q40 da UNIFESP 2024
{
  "id": "q-adap24-027",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-ortopedia",
  "assuntoId": "ass-orto-infeccoes",
  "enunciado": "Mulher, 22 anos, estudante, com múltiplos parceiros sexuais sem uso de preservativo, procura o pronto-socorro com febre de 38,8 ºC, poliartralgia migratória há 5 dias e, desde ontem, dor e edema no joelho esquerdo. Exame físico: lesões pustulosas isoladas nas extremidades e no tronco, tenossinovite no punho direito e sinal da tecla positivo no joelho esquerdo, com limitação importante do movimento. Exames: leucócitos = 15.000/mm3 e proteína C reativa = 12 mg/dL. Líquido sinovial do joelho: turvo, 52.000 leucócitos/mm3 com 90% de polimorfonucleares, ausência de cristais e coloração de Gram com diplococos gram-negativos intracelulares. Considerando o diagnóstico mais provável, qual é a conduta mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Iniciar ceftriaxone e realizar lavagem articular"
    },
    {
      "id": "B",
      "texto": "Iniciar alopurinol."
    },
    {
      "id": "C",
      "texto": "Iniciar anti-inflamatório não hormonal."
    },
    {
      "id": "D",
      "texto": "Iniciar colchicina, por artrite gotosa."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **mulher jovem, sexualmente ativa, com múltiplos parceiros sem preservativo** (a infecção gonocócica disseminada é a causa mais comum de artrite séptica em adultos jovens sexualmente ativos), **tríade de febre, tenossinovite e lesões cutâneas pustulosas**, **poliartralgia migratória evoluindo para monoartrite do joelho**, **líquido sinovial inflamatório (52.000 leucócitos, 90% de polimorfonucleares) sem cristais** e **diplococos gram-negativos intracelulares**: **artrite gonocócica**. O tratamento é **ceftriaxone** (1 g por via endovenosa a cada 24 horas) e **drenagem da articulação** (punções de repetição ou lavagem artroscópica), com cobertura para clamídia, tratamento dos parceiros e testagem para HIV e sífilis. B (alopurinol) e C (anti-inflamatório não hormonal) são condutas da gota, que cursa com cristais de urato e não com diplococos. D (colchicina) trata a crise de gota, o que não se aplica à paciente: não há cristais no líquido sinovial e há diplococos gram-negativos.",
  "explicacoesAlternativas": {},
  "referencias": "CDC. Sexually Transmitted Infections Treatment Guidelines, 2021 (infecção gonocócica disseminada); Ministério da Saúde. PCDT para Atenção Integral às Pessoas com IST, 2022; Sociedade Brasileira de Reumatologia.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q42 da UNIFESP 2024
{
  "id": "q-adap24-028",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-neurocirurgia",
  "assuntoId": "ass-neurocir-tce",
  "enunciado": "Homem, 27 anos, vítima de acidente motociclístico, é admitido na UTI com traumatismo cranioencefálico grave (Glasgow 5 na cena), intubado, em monitorização contínua da pressão intracraniana (PIC) por cateter intraparenquimatoso. A tomografia mostra edema cerebral difuso sem lesão com indicação cirúrgica. A PIC está entre 32 e 38 mmHg há mais de 1 hora, apesar de cabeceira a 30º, normocapnia, sedação plena com propofol e fentanil, bloqueio neuromuscular, solução salina hipertônica e drenagem liquórica. PAM = 90 mmHg, sem vasopressor. Qual é a melhor conduta para sedação e analgesia no momento?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Tiopental e fentanil."
    },
    {
      "id": "B",
      "texto": "Midazolan e morfina."
    },
    {
      "id": "C",
      "texto": "Tiopental e morfina."
    },
    {
      "id": "D",
      "texto": "Propofol e fentanil."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **TCE grave em jovem motociclista** (acidentes de moto são causa frequente de TCE grave em adultos jovens no Brasil), **PIC de 32 a 38 mmHg por mais de 1 hora** (meta abaixo de 22 mmHg) **refratária** a cabeceira elevada, normocapnia, sedação plena, bloqueio neuromuscular, hipertônica e drenagem liquórica, com **hemodinâmica estável (PAM = 90 mmHg sem vasopressor)**. Na hipertensão intracraniana refratária às medidas de primeira e segunda linha, a diretriz da Brain Trauma Foundation recomenda **barbitúricos em altas doses** (tiopental ou pentobarbital), que reduzem o metabolismo e o fluxo sanguíneo cerebrais e a PIC, desde que a pressão arterial seja mantida e sob monitorização (EEG). Mantém-se o **fentanil** para analgesia, com boa estabilidade hemodinâmica. B (midazolam e morfina) acumula-se (principalmente a morfina, com metabólitos ativos na disfunção renal), causa hipotensão e não controla a PIC refratária. C (tiopental e morfina) acerta o barbitúrico, mas a morfina libera histamina e provoca hipotensão e vasodilatação, comprometendo a pressão de perfusão cerebral. D (propofol e fentanil) é a combinação de escolha para a sedação inicial e já está em uso sem controle da PIC; doses ainda maiores de propofol não substituem o coma barbitúrico e expõem à síndrome da infusão do propofol.",
  "explicacoesAlternativas": {},
  "referencias": "Carney N et al. Guidelines for the Management of Severe Traumatic Brain Injury, 4th ed. (Brain Trauma Foundation, Neurosurgery 2017); Diretrizes brasileiras de manejo do TCE grave (AMB/CFM).",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q43 da UNIFESP 2024
{
  "id": "q-adap24-029",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-oncogineco",
  "assuntoId": "ass-caovario",
  "enunciado": "Mulher, 63 anos, nulípara, portadora de mutação em BRCA1, refere há 4 meses episódios de corrimento vaginal aquoso, citrino e intermitente, precedidos por cólica pélvica que melhora após a saída do líquido. Há 3 dias evoluiu com febre, dor pélvica intensa e corrimento purulento e fétido, e deu entrada no PS em sepse. Exame ginecológico: colo amolecido, útero doloroso à palpação e massas anexiais alongadas bilaterais palpáveis. Ultrassonografia pélvica: cavidade endometrial com pequena quantidade de líquido e gás de permeio, plano de clivagem com o miométrio preservado, eco endometrial regular de 4 mm; tubas dilatadas bilateralmente, de aspecto alongado, com conteúdo sólido-cístico e projeções papilares vascularizadas ao Doppler; ovários atróficos. CA-125 = 480 U/mL. Qual é o diagnóstico mais provável?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Neoplasia maligna das tubas uterinas e endometrite."
    },
    {
      "id": "B",
      "texto": "Abscesso tubo-ovariano e piometra."
    },
    {
      "id": "C",
      "texto": "Mioma submucoso e endometrite."
    },
    {
      "id": "D",
      "texto": "Neoplasia maligna do endométrio e piometra."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **mulher na pós-menopausa, nulípara e portadora de mutação em BRCA1** (fatores de risco para carcinoma de tuba uterina, tumor seroso de alto grau do espectro do câncer de ovário), **corrimento aquoso citrino intermitente com cólica que alivia após a saída do líquido** (hydrops tubae profluens, parte da tríade de Latzko), **tubas dilatadas alongadas com projeções papilares vascularizadas** e **CA-125 de 480 U/mL**: **neoplasia maligna da tuba uterina**. O quadro agudo de **febre, corrimento purulento fétido, útero doloroso, gás na cavidade e sepse** indica **endometrite** associada. B (abscesso tubo-ovariano e piometra) teria massa complexa envolvendo o ovário, que aqui está atrófico, e cavidade endometrial distendida por pus, o que não se vê (eco de 4 mm). C (mioma submucoso e endometrite) exigiria nódulo miometrial ou intracavitário bem delimitado. D (neoplasia maligna do endométrio e piometra) exigiria eco endometrial espessado e irregular na pós-menopausa e perda do plano de clivagem com o miométrio, achados ausentes.",
  "explicacoesAlternativas": {},
  "referencias": "FIGO Cancer Report, Cancer of the fallopian tube; Berek & Novak, Tratado de Ginecologia; NCCN Guidelines, Ovarian Cancer including Fallopian Tube Cancer and Primary Peritoneal Cancer.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q44 da UNIFESP 2024
{
  "id": "q-adap24-030",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-oncogineco",
  "assuntoId": "ass-cacolo",
  "enunciado": "Mulher, 29 anos, nuligesta, deseja engravidar, com início sexual aos 14 anos, múltiplos parceiros, tabagismo e sem rastreamento citológico prévio. Procurou atendimento por sinusorragia. Citologia: lesão intraepitelial de alto grau. Biópsia dirigida pela colposcopia: carcinoma epidermoide invasor do colo do útero. Ressonância de pelve: tumor de 1,6 cm restrito ao colo, com invasão estromal de 8 mm, sem acometimento dos paramétrios, distando mais de 1 cm do orifício interno; PET-CT sem linfonodos suspeitos (estádio IB1). Qual é a conduta mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Traquelectomia."
    },
    {
      "id": "B",
      "texto": "Curetagem uterina."
    },
    {
      "id": "C",
      "texto": "Miomectomias laparoscópica."
    },
    {
      "id": "D",
      "texto": "Histerectomia vaginal."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **mulher de 29 anos com desejo de gestar**, **carcinoma epidermoide do colo (câncer associado ao HPV, um dos mais frequentes entre as mulheres no Brasil, com alta incidência em quem nunca foi rastreada)**, **tumor de 1,6 cm (< 2 cm), restrito ao colo, sem invasão de paramétrios e a mais de 1 cm do orifício interno**, **PET-CT sem linfonodos suspeitos**: **estádio IB1 (FIGO 2018)**. Para tumores de até 2 cm, com baixo risco de invasão linfovascular e fertilidade desejada, a conduta que preserva o útero é a **traquelectomia radical** com linfadenectomia pélvica (ou pesquisa de linfonodo sentinela). B (curetagem uterina) não trata neoplasia do colo. C (miomectomia laparoscópica) é cirurgia para leiomioma. D (histerectomia vaginal) é definitiva, não preserva a fertilidade e não inclui a ressecção do paramétrio nem a avaliação linfonodal exigidas no tratamento oncológico.",
  "explicacoesAlternativas": {},
  "referencias": "NCCN Guidelines, Cervical Cancer; ESGO/ESTRO/ESP Guidelines for the management of patients with cervical cancer, 2018 (atualização 2023); INCA, Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q45 da UNIFESP 2024
{
  "id": "q-adap24-031",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-ginecologia",
  "assuntoId": "ass-infertilidade",
  "enunciado": "Mulher, 33 anos, casada há 5 anos, com infertilidade conjugal há 3 anos. O marido é saudável, tem 36 anos e o espermograma é normal. Refere ciclos regulares, porém com fluxo muito diminuído (hipomenorreia), e nega dismenorreia e dispareunia. Aos 17 anos, submeteu-se à curetagem uterina por abortamento infectado, realizado em condições inseguras, com febre e internação prolongada. A histerossalpingografia mostra cavidade uterina de contornos irregulares, com múltiplas falhas de enchimento lineares e angulares (aspecto «em favo de mel»), e as duas trompas pérvias, com difusão livre do contraste para a cavidade peritoneal. Qual é a provável etiologia da infertilidade?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Fator uterino por sequela de aborto infectado."
    },
    {
      "id": "B",
      "texto": "Fator uterino por mioma uterino submucoso."
    },
    {
      "id": "C",
      "texto": "Fator tubário por endometriose peritoneal."
    },
    {
      "id": "D",
      "texto": "Fator tubário por doença inflamatória pélvica."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **abortamento infectado aos 17 anos tratado com curetagem** (o abortamento inseguro e a curetagem do endométrio gravídico são as principais causas de lesão endometrial), **hipomenorreia** (o endométrio funcional foi substituído por fibrose), **histerossalpingografia com falhas de enchimento lineares e angulares em cavidade irregular** (aspecto de aderências intrauterinas) e **trompas pérvias com difusão peritoneal livre**: **fator uterino por sinéquias (síndrome de Asherman)**, confirmada e tratada por histeroscopia. B (mioma submucoso) produziria uma falha de enchimento única, arredondada e de contornos nítidos, geralmente com sangramento aumentado e não diminuído. C (fator tubário por endometriose peritoneal) cursaria com dismenorreia, dispareunia e dor pélvica, ausentes, e não explicaria a cavidade irregular. D (fator tubário por doença inflamatória pélvica) mostraria obstrução tubária, hidrossalpinge ou ausência de difusão peritoneal, mas as trompas estão pérvias.",
  "explicacoesAlternativas": {},
  "referencias": "AAGL Practice Report, Guidelines for the diagnosis and treatment of intrauterine adhesions; ASRM Practice Committee, Evaluation of the infertile female; FEBRASGO, Tratado de Ginecologia.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q46 da UNIFESP 2024
{
  "id": "q-adap24-032",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-ginecologia",
  "assuntoId": "ass-uroginecologia",
  "enunciado": "Mulher, 56 anos, G2P2 (partos vaginais), obesa (IMC 32 kg/m2), refere há 2 anos perda urinária aos esforços (tosse, exercícios) e sensação de «bola» na vagina. Nega outras comorbidades e usa estrogênio vaginal. Realizou 6 meses de fisioterapia do assoalho pélvico sem melhora. A urodinâmica confirmou incontinência urinária de esforço, sem hiperatividade do detrusor. Exame físico (POP-Q): Aa = +1, Ba = +2, C = -7, Ap = -3, Bp = -3 (cistocele estágio III, ápice sem prolapso). A paciente não aceita o uso de tela sintética. Qual é a conduta mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Colpofixação retropúbica e perineoplastia."
    },
    {
      "id": "B",
      "texto": "Fisioterapia do assoalho pélvico."
    },
    {
      "id": "C",
      "texto": "Sling autólogo e correção da cistocele."
    },
    {
      "id": "D",
      "texto": "Sling com tela de polipropileno e correção de enterocele."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **incontinência urinária de esforço confirmada na urodinâmica**, **falha de 6 meses de fisioterapia** (indica tratamento cirúrgico), **cistocele estágio III com abaulamento sintomático (Ba = +2)**, **ápice sustentado (C = -7) e parede posterior normal (Bp = -3)** e **recusa de tela sintética**: o tratamento é a correção simultânea da incontinência com **sling autólogo (fáscia)**, que dispensa material sintético, e da **cistocele (colporrafia anterior)**. A (colpofixação retropúbica e perineoplastia) trata a incontinência pela técnica de Burch, mas a perineoplastia corrige o períneo e não a cistocele. B (fisioterapia do assoalho pélvico) é a primeira linha, já tentada sem sucesso, e não corrige cistocele de grau III. D (sling com tela de polipropileno e correção de enterocele) contraria a recusa da paciente e trata um defeito inexistente: ápice e parede posterior (C = -7, Bp = -3) estão normais, sem enterocele.",
  "explicacoesAlternativas": {},
  "referencias": "AUA/SUFU Guideline, Surgical Treatment of Female Stress Urinary Incontinence, 2017; IUGA/ICS, terminologia do POP-Q; FEBRASGO, Tratado de Ginecologia (uroginecologia).",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q48 da UNIFESP 2024
{
  "id": "q-adap24-033",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-oncogineco",
  "assuntoId": "ass-cacolo",
  "enunciado": "Mulher, 32 anos, tabagista, com início da vida sexual aos 14 anos, múltiplos parceiros e sem rastreamento citológico prévio, procura a unidade básica de saúde para avaliar o resultado do exame citopatológico cérvico-vaginal, que mostra lesão intraepitelial de alto grau (HSIL). Segundo as diretrizes nacionais de rastreamento, a conduta mais adequada é:",
  "alternativas": [
    {
      "id": "A",
      "texto": "Repetir a citologia em 6 meses."
    },
    {
      "id": "B",
      "texto": "Repetir a citologia aos 25 anos de idade."
    },
    {
      "id": "C",
      "texto": "Repetir a citologia em 3 anos."
    },
    {
      "id": "D",
      "texto": "Encaminhar para colposcopia com biópsia."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **citologia com lesão intraepitelial de alto grau (HSIL)** em **mulher de 32 anos com fatores de risco para infecção persistente por HPV** (tabagismo, início sexual precoce e múltiplos parceiros, sem rastreamento prévio). Nas Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, **HSIL exige encaminhamento à colposcopia com biópsia**, pelo risco de neoplasia intraepitelial de grau 2 ou 3 e de câncer. A (repetir a citologia em 6 meses) é a conduta para ASC-US e lesão de baixo grau em mulheres de 25 anos ou mais. B (repetir aos 25 anos de idade) é a conduta para lesão de baixo grau em mulheres abaixo dessa idade, que não é a faixa da paciente. C (repetir em 3 anos) é o intervalo da rotina, após dois exames anuais normais, e não se aplica a uma lesão de alto grau.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde / INCA. Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, 2ª ed., 2016.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q49 da UNIFESP 2024
{
  "id": "q-adap24-034",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-ginecologia",
  "assuntoId": "ass-ciclomenstrual",
  "enunciado": "Mulher, 27 anos, nuligesta, tenta engravidar há 18 meses sem sucesso. Refere menarca aos 12 anos e ciclos com intervalos de 45 a 90 dias desde então, além de acne e aumento de pelos no queixo e no abdome (escore de Ferriman-Gallwey de 14). IMC = 31 kg/m2. Exames: TSH, prolactina, FSH e 17-hidroxiprogesterona normais; testosterona total elevada. Ultrassonografia transvaginal: ambos os ovários com 14 a 16 folículos de 2 a 9 mm e volume de 12 mL. Histerossalpingografia com trompas pérvias; espermograma do companheiro normal. Considerando o diagnóstico mais provável, qual é a conduta mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Contraceptivo hormonal combinado."
    },
    {
      "id": "B",
      "texto": "Metformina e atividade física."
    },
    {
      "id": "C",
      "texto": "Terapia de reposição hormonal."
    },
    {
      "id": "D",
      "texto": "Inibidor de aromatase."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **ciclos de 45 a 90 dias desde a menarca (oligoanovulação)**, **hiperandrogenismo clínico e laboratorial (Ferriman-Gallwey = 14, testosterona elevada, acne)**, **ovários policísticos à ultrassonografia (14 a 16 folículos por ovário e volume de 12 mL)** e **exclusão de outras causas (TSH, prolactina, FSH e 17-OHP normais)**: **síndrome dos ovários policísticos**, que afeta cerca de 8 a 13% das mulheres em idade reprodutiva e é a causa mais comum de infertilidade anovulatória. Como **a paciente deseja engravidar, com trompas pérvias e espermograma normal**, o tratamento é a **indução da ovulação com letrozol, um inibidor de aromatase**, primeira linha segundo a diretriz internacional de 2023, associada à mudança de estilo de vida. A (contraceptivo hormonal combinado) é o tratamento da síndrome em quem não deseja gestar e inibe a ovulação. B (metformina e atividade física) tem papel metabólico, mas a metformina isolada é menos eficaz que o letrozol para induzir ovulação e para nascidos vivos. C (terapia de reposição hormonal) é indicada na insuficiência ovariana prematura, com FSH elevado e hipoestrogenismo, o que não ocorre aqui.",
  "explicacoesAlternativas": {},
  "referencias": "Teede HJ et al. Recommendations from the 2023 International Evidence-based Guideline for the Assessment and Management of Polycystic Ovary Syndrome; FEBRASGO, Manual de Síndrome dos Ovários Policísticos.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q50 da UNIFESP 2024
{
  "id": "q-adap24-035",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-planfamiliar",
  "assuntoId": "ass-contracepcao",
  "enunciado": "Adolescente, 16 anos, vai à UBS para orientação anticoncepcional. Refere ter tido 5 parceiros sexuais e não deseja usar métodos hormonais, pelos efeitos adversos que presenciou em amigas. Tem ciclos regulares, com fluxo normal de 4 dias e sem cólicas, e a última menstruação iniciou há 5 dias. O teste rápido de gravidez é negativo; não há corrimento, dor pélvica ou cervicite ao exame, e as testagens para infecções sexualmente transmissíveis foram solicitadas. Na Unidade encontram-se disponíveis os seguintes métodos: pílulas combinadas, implante subcutâneo, injetável mensal e DIU de cobre. Além da recomendação do uso de preservativos, qual é a orientação mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Inserção imediata de DIU de cobre."
    },
    {
      "id": "B",
      "texto": "Início da pílula combinada no próximo ciclo."
    },
    {
      "id": "C",
      "texto": "Início do injetável mensal no próximo ciclo."
    },
    {
      "id": "D",
      "texto": "Inserção imediata de implante subcutâneo."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **adolescente de 16 anos** (no Brasil, cerca de 14% dos nascimentos ocorrem em mães com menos de 20 anos, e os métodos reversíveis de longa duração são a primeira escolha por não dependerem de adesão diária), que **não deseja método hormonal** (preferência da paciente, que deve ser respeitada), com **ciclos regulares, fluxo normal e sem cólicas** (o DIU de cobre pode aumentar o fluxo e a cólica, e a ausência deles o favorece), **DUM há 5 dias e teste de gravidez negativo** (o DIU pode ser inserido a qualquer momento em que se descarte gravidez) e **sem cervicite ou dor pélvica** (o risco aumentado de IST não contraindica a inserção em adolescente assintomática; a testagem não precisa atrasar o procedimento). O único método não hormonal de longa duração disponível é o **DIU de cobre**, associado ao **preservativo** para prevenção de IST. B (pílula combinada), C (injetável mensal) e D (implante) são métodos hormonais, que a paciente recusa; a pílula e o injetável, além disso, dependem de uso regular e têm falha típica maior entre adolescentes.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde. Critérios Médicos de Elegibilidade para Métodos Anticoncepcionais e Manual Técnico para Profissionais de Saúde: DIU com Cobre T Cu 380 A; OMS, Medical Eligibility Criteria for Contraceptive Use; CDC, US MEC 2024.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q51 da UNIFESP 2024
{
  "id": "q-adap24-036",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-perioperatorio",
  "assuntoId": "ass-cuidadosperi",
  "enunciado": "Mulher, 25 anos, vítima de acidente de trânsito, admitida na UTI após laparotomia por trauma abdominal com lesão de delgado e ressecção intestinal extensa, evoluindo com íleo paralítico, distensão abdominal importante e vômitos com resíduo gástrico elevado, refratários ao uso de procinético. Antes do trauma, já apresentava desnutrição grave por baixa ingestão alimentar (IMC = 14,5 kg/m2, perda de 15% do peso em 3 meses; NRS-2002 = 5). O quadro hemodinâmico é estável e há perspectiva de mantê-la sedada e em ventilação mecânica por 7 a 10 dias. A nutrição enteral é inviável nos próximos dias. Qual é a conduta mais adequada em relação à terapia nutricional?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Iniciar uma oferta energética de 15 a 20 kcal/kg/dia, por via enteral."
    },
    {
      "id": "B",
      "texto": "Iniciar nutrição parenteral exclusiva o mais precocemente possível."
    },
    {
      "id": "C",
      "texto": "Usar fórmula enteral com ômega 3, óleos de borragem e antioxidantes."
    },
    {
      "id": "D",
      "texto": "Manter soro de manutenção por 48 a 72 horas e depois iniciar nutrição oral."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **desnutrição grave prévia (IMC = 14,5 kg/m2, perda de 15% do peso em 3 meses, NRS-2002 = 5)**, ou seja, **alto risco nutricional**; **ressecção intestinal extensa com íleo paralítico, vômitos e resíduo gástrico elevado refratários**, **contraindicação à nutrição enteral**; ventilação prevista por 7 a 10 dias. As diretrizes (ESPEN e BRASPEN) recomendam, nos pacientes de alto risco com nutrição enteral contraindicada, **iniciar a nutrição parenteral o mais precocemente possível**, com baixa oferta calórica inicial e progressão lenta, tiamina e monitorização de fósforo, potássio e magnésio para evitar a síndrome de realimentação. A (15 a 20 kcal/kg/dia por via enteral) é a conduta do paciente crítico estável com trato gastrointestinal funcionante, o que não é o caso. C (fórmula enteral com ômega 3, óleo de borragem e antioxidantes) também depende da via enteral, e a evidência atual não recomenda seu uso rotineiro. D (soro de manutenção por 48 a 72 horas e depois nutrição oral) mantém o jejum em paciente gravemente desnutrida, com risco de piores desfechos, e a via oral é inviável sob ventilação mecânica.",
  "explicacoesAlternativas": {},
  "referencias": "Singer P et al. ESPEN guideline on clinical nutrition in the intensive care unit, 2019; BRASPEN, Diretriz de terapia nutricional no paciente grave, 2018; ASPEN/SCCM Guidelines for nutrition support in critically ill adults, 2016.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q53 da UNIFESP 2024
{
  "id": "q-adap24-037",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-obstetricia",
  "assuntoId": "ass-dheg",
  "enunciado": "Secundigesta de 35 semanas, 40 anos de idade, parto cesáreo há 8 anos, vem encaminhada ao pronto atendimento por pressão arterial de 140 x 95 mmHg, assintomática. Níveis pressóricos sempre normais durante a gestação atual. Exame físico: AU: 33 cm; BCF: 148 bpm; DU ausente. Toque vaginal: colo grosso, posterior, fechado, cefálico. Extremidades: edema +/4+ em membros inferiores. Exames laboratoriais: Hb = 11,6 g/dL, Htc = 33,7%; leucograma = 11.700 glóbulos brancos; plaquetas = 224.000/mm3; TGO/TGP = 14/12 U/L; creatinina = 0,6 mg/dL. Urina I = proteína +. Qual é a conduta mais indicada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Parto cesáreo imediato, por suspeita de pré-eclâmpsia."
    },
    {
      "id": "B",
      "texto": "Indução imediata do parto, por suspeita de pré-eclâmpsia."
    },
    {
      "id": "C",
      "texto": "Internação para observação e repetição dos exames laboratoriais."
    },
    {
      "id": "D",
      "texto": "Prescrição de hipotensores e seguimento ambulatorial semanal."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **primeira medida de PA de 140 x 95 mmHg após 20 semanas** em gestante com PA sempre normal antes, **idade materna de 40 anos** (fator de risco) e **proteinúria +** na fita: **síndrome hipertensiva da gestação (hipertensão gestacional ou pré-eclâmpsia) ainda sem sinais de gravidade** (assintomática, plaquetas de 224.000, TGO/TGP de 14/12, creatinina de 0,6 e PA < 160/110), com **35 semanas**, portanto **antes do termo**. A conduta é a **internação para observação clínica e repetição dos exames laboratoriais** (proteinúria de 24 horas ou relação proteína/creatinina, PA seriada, avaliação da vitalidade fetal), com parto programado a partir de 37 semanas se mantida sem gravidade. A (parto cesáreo imediato) e B (indução imediata do parto) são condutas para gravidade (pré-eclâmpsia com sinais de gravidade, HELLP, eclâmpsia, comprometimento fetal) ou para idade gestacional a partir de 37 semanas. D (hipotensores e seguimento ambulatorial) é inadequado antes de excluir pré-eclâmpsia, e o anti-hipertensivo é habitualmente reservado para PA ≥ 150/100 mmHg.",
  "explicacoesAlternativas": {},
  "referencias": "ACOG Practice Bulletin 222, Gestational Hypertension and Preeclampsia, 2020; FEBRASGO, Manual de Pré-eclâmpsia; Ministério da Saúde, Manual de Gestação de Alto Risco.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q54 da UNIFESP 2024
{
  "id": "q-adap24-038",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-ginecologia",
  "assuntoId": "ass-climaterio",
  "enunciado": "Mulher, 52 anos, histerectomizada por miomatose aos 44 anos (com conservação dos ovários), hipertensa em uso de losartana, com pressão controlada, e IMC = 31 kg/m2. Menopausa aos 50 anos, confirmada por FSH elevado. Há 2 anos apresenta ondas de calor intensas, mais de 8 por dia, com despertares noturnos, irritabilidade e queda de rendimento no trabalho. Sem antecedentes de câncer de mama, tromboembolismo venoso, doença coronariana ou AVC; exame físico, mamografia e perfil lipídico normais. Qual é a conduta mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Estrogenioterapia transdérmica."
    },
    {
      "id": "B",
      "texto": "Estrogenioterapia vaginal."
    },
    {
      "id": "C",
      "texto": "Ablação endometrial."
    },
    {
      "id": "D",
      "texto": "Observação clínica."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **mulher de 52 anos, 2 anos após a menopausa** (dentro da «janela de oportunidade»: menos de 60 anos e menos de 10 anos de menopausa), **sintomas vasomotores intensos (mais de 8 ondas de calor por dia, com distúrbio do sono e prejuízo funcional)**, **sem contraindicações** (sem câncer de mama, tromboembolismo ou doença cardiovascular; mamografia normal) e **histerectomizada**, o que dispensa o progestagênio e permite **estrogênio isolado**. A via **transdérmica** é preferível na paciente **obesa e hipertensa**, por não aumentar o risco de tromboembolismo e ter menor efeito sobre a pressão e os triglicerídeos que a via oral. B (estrogenioterapia vaginal) trata a síndrome geniturinária da menopausa, com absorção sistêmica mínima, e não controla as ondas de calor. C (ablação endometrial) não tem relação com o quadro, pois a paciente não tem útero e não sangra. D (observação clínica) é inadequada diante de sintomas vasomotores que prejudicam a qualidade de vida e para os quais há tratamento eficaz e seguro.",
  "explicacoesAlternativas": {},
  "referencias": "The 2022 Hormone Therapy Position Statement of The North American Menopause Society; FEBRASGO / SOBRAC, Consenso Brasileiro de Terapêutica Hormonal da Menopausa.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q56 da UNIFESP 2024
{
  "id": "q-adap24-039",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-obstetricia",
  "assuntoId": "ass-puerperio",
  "enunciado": "Mulher, 38 anos, obesa (IMC 36 kg/m2), no 2º dia pós-cesariana (indicação por desproporção cefalopélvica), apresenta dispneia súbita, dor torácica que piora à inspiração e palpitações. Exame físico: REG, corada, taquipneica (FR = 30 irpm), pulso de 118 bpm, PA = 110/70 mmHg, SpO2 = 88% em ar ambiente, afebril. Abdome: útero contraído, 2 cm abaixo da cicatriz umbilical, indolor; ferida operatória sem secreção. Loquiação fisiológica. Extremidades: panturrilha direita edemaciada e dolorosa. Qual é o diagnóstico mais provável?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Tromboembolismo pulmonar."
    },
    {
      "id": "B",
      "texto": "Endometrite puerperal."
    },
    {
      "id": "C",
      "texto": "Restos placentários."
    },
    {
      "id": "D",
      "texto": "Anemia pós-parto."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **puérpera de 38 anos, obesa, no 2º dia pós-cesariana** (o Brasil tem uma das maiores taxas de cesariana do mundo, e o tromboembolismo venoso, importante causa de morte materna evitável, tem risco aumentado após cesárea, na obesidade e acima de 35 anos), **dispneia súbita, dor pleurítica, taquicardia, taquipneia e SpO2 = 88%** e **panturrilha direita edemaciada e dolorosa** (trombose venosa profunda). Útero contraído e indolor, loquiação normal, ausência de febre e **mucosas coradas** afastam as causas obstétricas. B (endometrite puerperal) cursa com febre, útero amolecido e doloroso e lóquios fétidos. C (restos placentários) provoca sangramento persistente ou tardio, subinvolução uterina e anemia. D (anemia pós-parto) causa dispneia e taquicardia, mas com palidez intensa; não explica a dor pleurítica, a hipoxemia nem o edema assimétrico de panturrilha, e a paciente está corada. Conduta: anticoagulação imediata e confirmação por angiotomografia de tórax.",
  "explicacoesAlternativas": {},
  "referencias": "ACOG Practice Bulletin 196, Thromboembolism in Pregnancy, 2018; RCOG Green-top Guideline 37a, Reducing the Risk of Venous Thromboembolism during Pregnancy and the Puerperium; ESC Guidelines on Acute Pulmonary Embolism, 2019.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q57 da UNIFESP 2024
{
  "id": "q-adap24-040",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-anestesio",
  "assuntoId": "ass-anestesio-analgesia",
  "enunciado": "Secundigesta, 36 semanas de gestação, portadora de trombofilia hereditária, em uso de enoxaparina sódica 40 mg/dia durante toda a gestação, com última aplicação às 8 horas da manhã. Foi internada às 18 horas em trabalho de parto prematuro com 5 cm de dilatação cervical e recebeu analgesia de parto com peridural contínua, com cateter inserido às 21 horas e funcionante. Às 22 horas, no período expulsivo, há indicação de cesárea por desacelerações tardias recorrentes. Qual é a técnica anestésica mais indicada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Peridural."
    },
    {
      "id": "B",
      "texto": "Anestesia geral."
    },
    {
      "id": "C",
      "texto": "Duplo bloqueio (raquianestesia + peridural)."
    },
    {
      "id": "D",
      "texto": "Raquianestesia."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **enoxaparina profilática (40 mg/dia) com última dose às 8 horas** (as diretrizes da ASRA exigem intervalo mínimo de **12 horas** entre a dose profilática de heparina de baixo peso molecular e a punção neuraxial; o cateter foi inserido às 21 horas, **13 horas** após), **cateter de peridural contínua já instalado e funcionante** e **cesárea urgente (desacelerações tardias recorrentes)**. A melhor opção é **ampliar a analgesia pelo cateter peridural**, que permite anestesia cirúrgica rápida (lidocaína com adrenalina e bicarbonato, ou cloroprocaína) e evita nova punção em paciente de risco hemorrágico e a anestesia geral, mais arriscada na gestante pela via aérea difícil e pelo risco de aspiração. B (anestesia geral) fica para falha da técnica neuraxial ou emergência extrema. C (duplo bloqueio) e D (raquianestesia) exigiriam nova punção, desnecessária com o cateter funcionante e evitável em paciente anticoagulada; a raquianestesia também causa hipotensão de instalação mais súbita. A próxima dose de enoxaparina deve respeitar pelo menos 12 horas após a punção e 4 horas após a retirada do cateter.",
  "explicacoesAlternativas": {},
  "referencias": "Horlocker TT et al. Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy: ASRA Evidence-Based Guidelines, 4th ed., 2018; SOAP, Consensus Statement on neuraxial procedures in obstetric patients receiving thromboprophylaxis; Sociedade Brasileira de Anestesiologia.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q60 da UNIFESP 2024
{
  "id": "q-adap24-041",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-infecto",
  "assuntoId": "ass-ist",
  "enunciado": "Secundigesta, 28 anos, parto anterior no termo. Primeira consulta em UBS com diagnóstico de gravidez tópica de 8 semanas, assintomática. Há 14 meses tratou sífilis, conforme cartão de pré-natal da gestação anterior, com penicilina benzatina 7.200.000 UI (3 doses semanais), e o VDRL de controle, há 6 meses, foi de 1:2. Refere novo parceiro há 3 meses, sem uso de preservativo, que não realizou testagem. Realizado teste rápido para sífilis, com resultado reagente, e VDRL atual de 1:16. Sem lesões genitais ou sintomas neurológicos ou oftalmológicos. Qual é a conduta mais indicada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Solicitar VDRL."
    },
    {
      "id": "B",
      "texto": "Tratar com penicilina benzatina 2.400.000 UI."
    },
    {
      "id": "C",
      "texto": "Tratar com penicilina benzatina 7.200.000 UI."
    },
    {
      "id": "D",
      "texto": "Solicitar FTA-Abs."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **sífilis tratada adequadamente há 14 meses (7.200.000 UI)**, **VDRL de 1:2 há 6 meses e agora de 1:16**, isto é, **aumento de 3 diluições (oito vezes), acima do critério de quatro vezes (2 diluições)**, com **novo parceiro não tratado e sem preservativo há 3 meses**: **reinfecção**, situação em que o teste treponêmico permanece reagente por toda a vida e apenas o não treponêmico indica atividade. Como a elevação ocorreu em menos de um ano, trata-se de **sífilis recente (primária, secundária ou latente recente)**, tratada pelo Ministério da Saúde com **penicilina benzatina 2,4 milhões UI por via intramuscular, dose única**, associada à convocação e ao tratamento do parceiro, ao uso de preservativo e ao monitoramento mensal do VDRL na gestação, em um país em que a sífilis gestacional e a congênita seguem em alta. A (solicitar VDRL) já foi feito e mostrou a elevação. C (7,2 milhões UI, em 3 doses) é o esquema da sífilis latente tardia ou de duração ignorada. D (solicitar FTA-Abs) é teste treponêmico, que permanece reagente após o tratamento e não serve para monitorar a resposta nem para diferenciar reinfecção.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (IST), 2022 (conferir a edição vigente).",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q62 da UNIFESP 2024
{
  "id": "q-adap24-042",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-neuro",
  "assuntoId": "ass-neuro-movimento",
  "enunciado": "Homem, 67 anos, apresenta há 1 ano lentidão progressiva para realizar atividades cotidianas, redução do olfato, constipação e tremor de repouso na mão direita, que diminui com o movimento voluntário. Exame neurológico: bradicinesia assimétrica, rigidez em roda denteada à direita e marcha com redução do balanço do braço direito, sem fraqueza, atrofia ou fasciculações; reflexos normais e simétricos. Eletroneuromiografia normal. Qual é o diagnóstico mais provável?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Síndrome de Guillain-Barré."
    },
    {
      "id": "B",
      "texto": "Esclerose múltipla."
    },
    {
      "id": "C",
      "texto": "Esclerose lateral amiotrófica (ELA)."
    },
    {
      "id": "D",
      "texto": "Doença de Parkinson."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **homem de 67 anos** (a incidência da doença de Parkinson cresce com a idade, atingindo cerca de 1% das pessoas acima de 65 anos), **bradicinesia assimétrica, tremor de repouso e rigidez em roda denteada** (síndrome parkinsoniana), **redução do olfato e constipação** (sintomas não motores precoces) e **eletroneuromiografia e reflexos normais, sem fraqueza ou atrofia**: **doença de Parkinson**, de diagnóstico clínico (critérios da Movement Disorder Society). A (síndrome de Guillain-Barré) é paralisia flácida ascendente com arreflexia, de instalação em dias a semanas. B (esclerose múltipla) acomete adultos jovens, principalmente mulheres, com surtos de déficits focais, neurite óptica e alterações na ressonância. C (esclerose lateral amiotrófica) combina sinais de primeiro e segundo neurônio motor, com fraqueza, atrofia, fasciculações e eletroneuromiografia com desnervação, sem tremor de repouso nem bradicinesia.",
  "explicacoesAlternativas": {},
  "referencias": "Postuma RB et al. MDS clinical diagnostic criteria for Parkinson's disease. Mov Disord, 2015; Ministério da Saúde. PCDT da Doença de Parkinson.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q63 da UNIFESP 2024
{
  "id": "q-adap24-043",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-neuro",
  "assuntoId": "ass-neuro-neuromuscular",
  "enunciado": "Mulher, 23 anos, previamente hígida, apresenta há 10 dias insônia, agitação psicomotora e delírios persecutórios, tratados em serviço psiquiátrico como surto psicótico. Há 3 dias evoluiu com crises convulsivas tônico-clônicas, movimentos involuntários orofaciais e dos membros, rebaixamento do nível de consciência e instabilidade autonômica, sem febre alta. Líquor: 45 células/mm3 (95% de linfócitos), proteína de 55 mg/dL e glicose normal; ressonância de crânio normal; eletroencefalograma conforme a figura. Considerando o diagnóstico mais provável, quais exames complementares devem ser solicitados?",
  "imagemUrl": "dados/imagens/q-adap24-043.png",
  "imagemLegenda": "EEG da paciente (ilustração esquemática).",
  "alternativas": [
    {
      "id": "A",
      "texto": "Ressonância magnética de crânio e pesquisa do anticorpo anti-glicoproteina."
    },
    {
      "id": "B",
      "texto": "Tomografia de tórax e pesquisa de anticorpo anti-receptor de acetilcolina."
    },
    {
      "id": "C",
      "texto": "Ressonância de pelve e pesquisa do anticorpo anti-NMDAR."
    },
    {
      "id": "D",
      "texto": "Biópsia muscular e pesquisa do anticorpo anti-MUSK."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado e da figura: **mulher jovem, previamente hígida, com início psiquiátrico (insônia, agitação, delírios)** seguido de **crises convulsivas, discinesias orofaciais, rebaixamento da consciência e instabilidade autonômica**, **líquor com pleocitose linfocítica**, **RM de crânio normal** e **EEG com padrão «delta brush»**: **encefalite autoimune por anticorpo anti-receptor de NMDA**, a encefalite autoimune mais comum, que predomina em mulheres jovens. Como **cerca de metade das mulheres adultas com a doença tem teratoma de ovário associado**, solicita-se **imagem da pelve (ressonância ou ultrassonografia) para procurar o tumor**, junto com a **pesquisa do anticorpo anti-NMDAR no líquor (e no soro)**; a ressecção do teratoma e a imunoterapia mudam o prognóstico. A (RM de crânio e anticorpo anti-glicoproteína) corresponde à pesquisa do anticorpo anti-MOG, associado a neurite óptica e mielite, e a RM de crânio já foi normal. B (tomografia de tórax e anticorpo anti-receptor de acetilcolina) investiga miastenia e timoma, que causam fraqueza flutuante e não encefalite. D (biópsia muscular e anticorpo anti-MuSK) investiga miastenia com anticorpo anti-MuSK ou miopatia, também sem relação com o quadro.",
  "explicacoesAlternativas": {},
  "referencias": "Graus F et al. A clinical approach to diagnosis of autoimmune encephalitis. Lancet Neurol, 2016; Titulaer MJ et al. Treatment and prognostic factors for long-term outcome in patients with anti-NMDA receptor encephalitis. Lancet Neurol, 2013.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q64 da UNIFESP 2024
{
  "id": "q-adap24-044",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-mps",
  "especialidadeId": "esp-sus",
  "assuntoId": "ass-principiossus",
  "enunciado": "Homem, 52 anos, residente em município de pequeno porte, sem serviço de transplante, com insuficiência cardíaca refratária e indicação formal de transplante, foi encaminhado por uma central de regulação a um hospital de referência da região, que reúne a alta complexidade de transplante cardíaco para vários municípios, com recursos pactuados entre os gestores na Comissão Intergestores Regional. O paciente foi transplantado quando surgiu um órgão compatível em cidade próxima. Qual diretriz organizativa do SUS se relaciona mais especificamente com esta forma de organização dos serviços?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Humanização."
    },
    {
      "id": "B",
      "texto": "Equidade."
    },
    {
      "id": "C",
      "texto": "Regionalização."
    },
    {
      "id": "D",
      "texto": "Integralidade."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **município pequeno sem serviço de transplante**, **encaminhamento por central de regulação a hospital de referência da região**, que concentra a **alta complexidade para vários municípios**, e **pactuação entre gestores na Comissão Intergestores Regional**: é a organização dos serviços em **regiões de saúde, com concentração de serviços de maior complexidade em polos, para ganho de escala e qualidade e garantia de acesso**, ou seja, a **regionalização** (junto com a hierarquização), prevista na Lei 8.080/1990 e no Decreto 7.508/2011. A (humanização) refere-se ao acolhimento e ao cuidado centrado na pessoa, não à organização territorial da rede. B (equidade) é o princípio de tratar de forma desigual os desiguais, que fundamenta a priorização por gravidade na fila de transplante, mas não a organização regional dos serviços descrita. D (integralidade) é a garantia de acesso a ações e serviços em todos os níveis, da promoção à reabilitação, e decorre da organização em rede, não é a forma de organizá-la.",
  "explicacoesAlternativas": {},
  "referencias": "Brasil. Lei 8.080/1990; Decreto 7.508/2011 (regiões de saúde e rede de atenção); Portaria de Consolidação GM/MS 4/2017 (Sistema Nacional de Transplantes).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q65 da UNIFESP 2024
{
  "id": "q-adap24-045",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-geriatria",
  "assuntoId": "ass-geriatria-polifarmacia",
  "enunciado": "Mulher, 82 anos, mora com a filha, é independente nas atividades básicas de vida diária, caminha com bengala e tem diagnóstico de diabetes, hipertensão arterial, hipotireoidismo e artrose de joelhos. A filha refere lapsos de memória eventuais, sem prejuízo funcional (MEEM = 27/30). Faz uso de levotiroxina (75 mcg/dia), losartana (100 mg/dia), hidroclorotiazida (25 mg/dia), gliclazida (60 mg/dia) e insulina NPH (12 UI pela manhã e 8 UI ao deitar). Peso estável desde a última consulta e sem episódios de hipoglicemia. Trouxe controles domiciliares de PA nos limites da normalidade (média de 128/74 mmHg). Exames laboratoriais: TSH = 5,4 µUI/mL, glicemia de jejum = 132 mg/dL e HbA1c = 7,6%. Qual é a conduta mais apropriada e sua justificativa?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Manter conduta, pois os exames revelam controle terapêutico adequado."
    },
    {
      "id": "B",
      "texto": "Aumentar a dose da levotiroxina por TSH aumentado e ganho de peso."
    },
    {
      "id": "C",
      "texto": "Aumentar a dose da levotiroxina para reavaliar declínio cognitivo."
    },
    {
      "id": "D",
      "texto": "Diminuir medicações de diabetes por risco de hipoglicemia."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **idosa de 82 anos, independente nas AVD, com múltiplas comorbidades**, **HbA1c = 7,6% e glicemia de jejum de 132 mg/dL sem hipoglicemias** (a meta de HbA1c em idosos com comorbidades e funcionalidade preservada é individualizada, em geral abaixo de 8,0%, evitando tanto o descontrole quanto o tratamento excessivo), **PA domiciliar média de 128/74 mmHg** (adequada) e **TSH = 5,4 µUI/mL** (acima dos 70 a 80 anos, TSH até cerca de 7 a 10 µUI/mL é aceitável, e o excesso de levotiroxina aumenta o risco de fibrilação atrial e perda óssea), com **peso estável**. Os exames mostram **controle terapêutico adequado e não há razão para mudar a prescrição**. B (aumentar a levotiroxina por TSH aumentado e ganho de peso) não se sustenta: o TSH é aceitável para a idade e não há ganho de peso. C (aumentar a levotiroxina para reavaliar declínio cognitivo) atribui os lapsos de memória a uma alteração tireoidiana leve, sem relação causal, e eles merecem avaliação cognitiva própria. D (diminuir medicações do diabetes por risco de hipoglicemia) seria correta se houvesse hipoglicemia ou HbA1c abaixo da meta (por exemplo, 5,9%), mas aqui a HbA1c é de 7,6%.",
  "explicacoesAlternativas": {},
  "referencias": "Diretriz da Sociedade Brasileira de Diabetes, metas glicêmicas no idoso; ADA Standards of Care in Diabetes, Older Adults; Sociedade Brasileira de Geriatria e Gerontologia, polifarmácia e tireoide no idoso.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q67 da UNIFESP 2024
{
  "id": "q-adap24-046",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-endocrino",
  "assuntoId": "ass-dm",
  "enunciado": "Homem, 72 anos, diabético tipo 2 há 25 anos, com doença renal crônica (TFG ≈ 28 mL/min/1,73 m2), refere episódios de sudorese fria, tremores, palpitações, fome intensa e confusão mental, principalmente de madrugada e antes do almoço, que melhoram após ingerir açúcar. Mora sozinho e emagreceu 4 kg por redução do apetite. Faz uso de losartana, glibenclamida, insulina NPH, sinvastatina e omeprazol. A glicemia capilar durante um dos episódios foi de 46 mg/dL. Qual é a hipótese diagnóstica mais provável?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Hipotiroidismo."
    },
    {
      "id": "B",
      "texto": "Deficiência de vitamina B12."
    },
    {
      "id": "C",
      "texto": "Episódios de hipoglicemia."
    },
    {
      "id": "D",
      "texto": "Depressão."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **idoso diabético há 25 anos, com doença renal crônica (TFG ≈ 28) e que mora sozinho com apetite reduzido** (fatores de risco clássicos de hipoglicemia: idade, insuficiência renal, ingestão irregular e polifarmácia), **uso de glibenclamida e insulina NPH** (a sulfonilureia de meia-vida longa acumula-se na doença renal e é uma das principais causas de hipoglicemia grave em idosos), **sintomas adrenérgicos (sudorese, tremor, palpitações, fome) e neuroglicopênicos (confusão)**, **que melhoram com açúcar**, e **glicemia capilar de 46 mg/dL** durante o episódio (tríade de Whipple): **episódios de hipoglicemia**. A (hipotireoidismo) causa lentificação, intolerância ao frio e constipação, sem crises de sudorese e tremor que melhoram com açúcar. B (deficiência de vitamina B12) causa neuropatia e declínio cognitivo de instalação lenta, sem episódios paroxísticos reversíveis com glicose. D (depressão) não explica sintomas adrenérgicos reversíveis com glicose nem a glicemia baixa documentada.",
  "explicacoesAlternativas": {},
  "referencias": "Diretriz da Sociedade Brasileira de Diabetes, hipoglicemia; ADA Standards of Care in Diabetes, Glycemic Goals and Hypoglycemia; Sociedade Brasileira de Geriatria e Gerontologia.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q73 da UNIFESP 2024
{
  "id": "q-adap24-047",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-vigilancia",
  "enunciado": "Em 2019, durante investigação de um surto de sarampo na região amazônica, com casos entre migrantes e indígenas, a equipe de saúde realizou busca ativa de casos, coleta de amostras, análise dos casos por tempo, lugar e pessoa e bloqueio vacinal. Qual é a área da Vigilância em Saúde brasileira, cujo objetivo é detectar mudanças nos fatores determinantes e condicionantes da saúde individual e coletiva e adotar medidas de prevenção e controle de doenças e agravos, que atuou naquele momento?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Epidemiológica."
    },
    {
      "id": "B",
      "texto": "Saúde do Trabalhador."
    },
    {
      "id": "C",
      "texto": "Ambiental."
    },
    {
      "id": "D",
      "texto": "Sanitária."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **investigação de surto de sarampo**, com **busca ativa de casos, coleta de amostras, análise por tempo, lugar e pessoa e bloqueio vacinal**: são as ações da **vigilância epidemiológica**, definida pela Lei 8.080/1990 como o conjunto de ações que proporciona o conhecimento, a detecção e a prevenção de mudanças nos fatores determinantes e condicionantes da saúde individual e coletiva, com recomendação e adoção de medidas de prevenção e controle (a reintrodução do sarampo no Brasil em 2018 e os surtos no Norte do país em 2018 e 2019 são exemplos da atuação dessa vigilância). B (saúde do trabalhador) trata dos agravos relacionados ao trabalho. C (ambiental) acompanha fatores ambientais de risco, como qualidade da água, do ar e do solo. D (sanitária) atua com poder de polícia, fiscalizando serviços, produtos e ambientes com risco sanitário, como em portos, aeroportos e fronteiras; a investigação de surto e a vacinação de bloqueio não são seu papel principal.",
  "explicacoesAlternativas": {},
  "referencias": "Brasil. Lei 8.080/1990, art. 6º, § 2º; Ministério da Saúde. Guia de Vigilância em Saúde.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q76 da UNIFESP 2024
{
  "id": "q-adap24-048",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-medidasepi",
  "enunciado": "Um teste de triagem para infecção, com 99% de sensibilidade e 99% de especificidade, é aplicado em uma população de alta prevalência da doença (50%), como em um surto em população fechada. Qual é a probabilidade de um teste positivo representar um indivíduo realmente doente?",
  "alternativas": [
    {
      "id": "A",
      "texto": "99%"
    },
    {
      "id": "B",
      "texto": "50%"
    },
    {
      "id": "C",
      "texto": "92%"
    },
    {
      "id": "D",
      "texto": "33%"
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: a pergunta é pelo **valor preditivo positivo (VPP)**, que depende da **sensibilidade (99%), da especificidade (99%) e da prevalência (50%)**. Em uma população de 10.000 pessoas há **5.000 doentes**, dos quais 99% testam positivo (**verdadeiros-positivos = 4.950**), e **5.000 não doentes**, dos quais 1% testa positivo (**falsos-positivos = 50**). **VPP = 4.950 / (4.950 + 50) = 99%**. O VPP aumenta com a prevalência: em população de alta prevalência, quase todo positivo é verdadeiro. B (50%) seria o VPP de um teste sem poder discriminatório nesta população: o positivo não mudaria a chance de doença, que já é a prevalência. C (92%) é o VPP do mesmo teste (99% e 99%) numa população com prevalência de 10%, e não de 50%. D (33%) é o VPP do mesmo teste numa população de prevalência muito baixa, de 0,5%: a prevalência, e não só a qualidade do teste, define o VPP.",
  "explicacoesAlternativas": {},
  "referencias": "Gordis L. Epidemiologia; Medronho RA et al. Epidemiologia (validade de testes diagnósticos e valor preditivo).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q79 da UNIFESP 2024
{
  "id": "q-adap24-049",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-bioestatistica",
  "enunciado": "Homem, 70 anos, tem história prévia de infarto agudo do miocárdio e foi hospitalizado em uma UTI com monitoramento contínuo da pressão arterial. Os valores a seguir representam medidas consecutivas da pressão arterial sistólica (PAS) deste paciente: 90, 110, 105, 115, 110 e 125 mmHg. Qual dos seguintes valores representa a mediana da PAS deste paciente?",
  "alternativas": [
    {
      "id": "A",
      "texto": "109 mmHg."
    },
    {
      "id": "B",
      "texto": "115 mmHg."
    },
    {
      "id": "C",
      "texto": "105 mmHg."
    },
    {
      "id": "D",
      "texto": "110 mmHg."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: a **mediana** é o valor central dos dados **ordenados**. Ordenando os seis valores: **90, 105, 110, 110, 115, 125**. Como o número de observações é **par (n = 6)**, a mediana é a **média dos dois valores centrais** (3º e 4º): (110 + 110) / 2 = **110 mmHg**. A (109 mmHg) é a média aritmética (655 ÷ 6 ≈ 109,2), e não a mediana. B (115 mmHg) é o 4º valor na ordem da coleta, e a mediana exige ordenar os dados antes. C (105 mmHg) é o 3º valor na ordem da coleta, sem ordenar nem calcular a média dos dois valores centrais. Para comparação, a moda é 110 mmHg; a mediana é a medida de tendência central menos sensível a valores extremos, útil em dados assimétricos.",
  "explicacoesAlternativas": {},
  "referencias": "Triola MF. Introdução à Estatística; Medronho RA et al. Epidemiologia (medidas de tendência central).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q82 da UNIFESP 2024
{
  "id": "q-adap24-050",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-dermato",
  "assuntoId": "ass-derm-infeccoes",
  "enunciado": "Mulher, 58 anos, imunocompetente, apresenta otalgia intensa à esquerda há 2 dias e, desde ontem, erupção de vesículas agrupadas sobre base eritematosa na concha auricular e no conduto auditivo externo esquerdos. Há 12 horas notou desvio da rima labial e dificuldade para fechar o olho esquerdo, com zumbido e vertigem. Exame físico: paralisia facial periférica completa à esquerda (House-Brackmann V), sem outras alterações neurológicas. A terapia com aciclovir é iniciada. Qual dos seguintes passos é o mais apropriado?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Solicitar sorologia para HIV."
    },
    {
      "id": "B",
      "texto": "Associar corticoide oral."
    },
    {
      "id": "C",
      "texto": "Realizar biópsia de pele."
    },
    {
      "id": "D",
      "texto": "Solicitar teste de Tzanck."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **otalgia intensa, vesículas na concha e no conduto auditivo externo e paralisia facial periférica completa ipsilateral, com zumbido e vertigem**, em **adulta de 58 anos** (a incidência de herpes zóster cresce a partir dos 50 anos, pela queda da imunidade celular): **síndrome de Ramsay Hunt (zóster do gânglio geniculado)**. De pior prognóstico que a paralisia de Bell, o tratamento recomendado combina **antiviral (aciclovir ou valaciclovir) e corticoide oral**, como a prednisona 1 mg/kg/dia por cerca de 7 dias com redução gradual, pois o edema do nervo facial dentro do canal contribui para a lesão; a evidência é limitada, mas a associação é a prática padrão. A (sorologia para HIV) é recomendada no zóster em pacientes jovens ou com sinais de imunossupressão; aqui a paciente tem 58 anos e é imunocompetente, e a conduta que muda o desfecho é o corticoide. C (biópsia de pele) não é necessária: o diagnóstico é clínico. D (teste de Tzanck) tem baixa sensibilidade, não distingue herpes simples de varicela-zóster e não altera a conduta.",
  "explicacoesAlternativas": {},
  "referencias": "Baugh RF et al. Clinical Practice Guideline: Bell's Palsy (AAO-HNS), 2013; Gagyor I et al. Antiviral treatment for Bell's palsy and Ramsay Hunt syndrome. Cochrane, 2019; Sociedade Brasileira de Dermatologia.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q86 da UNIFESP 2024
{
  "id": "q-adap24-051",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-cardio",
  "assuntoId": "ass-dislipidemia",
  "enunciado": "Menino, 8 anos, filho de pais com colesterol elevado e doença coronariana precoce (o pai teve infarto aos 38 anos e a mãe fez angioplastia aos 41), apresenta desde os 5 anos nódulos amarelados na região posterior dos tornozelos, nos cotovelos e nos dorsos das mãos e dos dedos (xantomas tendíneos e planos). Está assintomático, com crescimento e desenvolvimento adequados, e o exame físico é normal, exceto pelos xantomas. Que exame laboratorial é o marcador para a principal hipótese diagnóstica?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Perfil lipídico."
    },
    {
      "id": "B",
      "texto": "Amônia sérica."
    },
    {
      "id": "C",
      "texto": "CPK."
    },
    {
      "id": "D",
      "texto": "Lactato sérico."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **xantomas tendíneos (Aquiles e extensores das mãos) e planos desde os 5 anos**, **ambos os pais com doença coronariana precoce e hipercolesterolemia** (herança autossômica semidominante; a hipercolesterolemia familiar heterozigótica ocorre em cerca de 1 a cada 250 pessoas, e o quadro grave e precoce sugere a forma homozigótica): **hipercolesterolemia familiar**, causada por defeito no receptor de LDL. O marcador é o **perfil lipídico, com LDL-colesterol muito elevado** (na forma homozigótica, em geral acima de 400 a 500 mg/dL), complementado por história familiar e teste genético. B (amônia sérica) investiga defeitos do ciclo da ureia, com encefalopatia e vômitos. C (CPK) investiga distrofias musculares e miopatias, com fraqueza e dor muscular. D (lactato sérico) é marcador das doenças mitocondriais, com intolerância ao exercício e acidose láctica, sem xantomas.",
  "explicacoesAlternativas": {},
  "referencias": "Atualização da Diretriz Brasileira de Dislipidemias e Prevenção da Aterosclerose (SBC, 2017); Sociedade Brasileira de Pediatria, Departamento de Cardiologia, dislipidemias na infância; EAS Consensus on familial hypercholesterolaemia.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q87 da UNIFESP 2024
{
  "id": "q-adap24-052",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-ped",
  "especialidadeId": "esp-infectoped",
  "assuntoId": "ass-infectoped-pneumonia",
  "enunciado": "Lactente de 4 meses, filha de mulher com HIV sem seguimento pré-natal e sem profilaxia na gestação, em aleitamento artificial, é levada ao PS com tosse seca e taquipneia progressiva há 2 semanas, sem febre alta, e piora importante do esforço respiratório nos últimos 3 dias. Exame físico: regular estado geral, baixo ganho de peso e candidíase oral; FR = 72 irpm, FC = 150 bpm e SpO2 = 84% em ar ambiente; tiragens intercostal e subdiafragmática intensas, com poucos estertores à ausculta (desproporcionais ao desconforto). LDH elevada. De acordo com o diagnóstico mais provável, quais as características esperadas na imagem radiológica?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Opacidade densa, homogênea e localizada."
    },
    {
      "id": "B",
      "texto": "Opacidade que permite visualização dos vasos."
    },
    {
      "id": "C",
      "texto": "Densidades lineares e irregulares."
    },
    {
      "id": "D",
      "texto": "Padrão peribrônquico."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **lactente de 4 meses exposta ao HIV sem profilaxia perinatal** (a transmissão vertical ainda é causa de aids pediátrica no Brasil, e o pico de pneumonia por Pneumocystis jirovecii ocorre entre 3 e 6 meses), **tosse seca, taquipneia progressiva e hipoxemia importante (SpO2 = 84%) com ausculta pobre** (discordância clínico-radiológica), **candidíase oral, baixo ganho de peso e LDH elevada**: **pneumonia por Pneumocystis jirovecii**. A radiografia mostra **opacidades difusas, bilaterais e perihilares em vidro fosco, que permitem ver os vasos pulmonares**. A (opacidade densa, homogênea e localizada) é o padrão da consolidação lobar da pneumonia bacteriana, com febre alta e estertores localizados. C (densidades lineares e irregulares) sugere atelectasia ou fibrose. D (padrão peribrônquico) é típico da infecção viral das vias aéreas inferiores, como a bronquiolite, com sibilos.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde. PCDT para Manejo da Infecção pelo HIV em Crianças e Adolescentes; Sociedade Brasileira de Pediatria, Departamento de Infectologia e Pneumologia; Nelson, Tratado de Pediatria.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q89 da UNIFESP 2024
{
  "id": "q-adap24-053",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-hemato",
  "assuntoId": "ass-hemato-anemias",
  "enunciado": "Menino, 5 anos, previamente saudável, tem história familiar de um tio materno com episódios de anemia hemolítica após o uso de medicamentos. Há 2 dias iniciou sulfametoxazol-trimetoprim para infecção urinária e, desde ontem, apresenta palidez, icterícia, urina escura (cor de «coca-cola») e fadiga. Exame físico: descorado ++/4+, ictérico ++/4+, baço palpável a 1 cm do rebordo costal esquerdo. Exames laboratoriais: Hb = 6,8 g/dL; VCM = 88 fL; HCM = 31 pg; reticulócitos = 12%; bilirrubina indireta = 4,0 mg/dL; LDH = 1.200 U/L; haptoglobina baixa; teste de Coombs direto negativo. Esfregaço: hemácias «mordidas» (bite cells), e corpúsculos de Heinz à coloração supravital. Qual é o diagnóstico mais provável?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Anemia Ferropriva."
    },
    {
      "id": "B",
      "texto": "Aplasia pura da série vermelha."
    },
    {
      "id": "C",
      "texto": "Talassemia minor."
    },
    {
      "id": "D",
      "texto": "Deficiência de G6PD."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **menino com tio materno com hemólise por medicamentos** (herança ligada ao X, que acomete principalmente meninos; a deficiência de G6PD é a enzimopatia eritrocitária mais frequente do mundo e comum no Brasil), **crise hemolítica 2 dias após sulfametoxazol-trimetoprim** (agente oxidante), **icterícia, colúria, Hb = 6,8, reticulócitos = 12%, LDH alta, haptoglobina baixa e Coombs negativo** (hemólise não imune) e **bite cells e corpúsculos de Heinz** (hemoglobina oxidada): **deficiência de glicose-6-fosfato desidrogenase (G6PD)**. A (anemia ferropriva) é microcítica, hipocrômica e de instalação lenta, sem hemólise. B (aplasia pura da série vermelha) cursa com reticulócitos baixos, o oposto do achado. C (talassemia minor) causa microcitose e hipocromia leves e crônicas, sem crise hemolítica aguda desencadeada por droga. O tratamento é suspender o agente oxidante e dar suporte, com transfusão se a anemia for grave.",
  "explicacoesAlternativas": {},
  "referencias": "Luzzatto L, Ally M, Notaro R. Glucose-6-phosphate dehydrogenase deficiency. Blood, 2020; Nelson, Tratado de Pediatria (anemias hemolíticas); Hoffbrand AV, Fundamentos em Hematologia.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q91 da UNIFESP 2024
{
  "id": "q-adap24-054",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-ped",
  "especialidadeId": "esp-neonato",
  "assuntoId": "ass-neo-descrresp",
  "enunciado": "Recém-nascido masculino, nascido de parto cesáreo eletivo sem trabalho de parto, com 30 semanas de idade gestacional (mãe com pré-eclâmpsia grave, sem corticoide antenatal), líquido amniótico claro, Apgar 6 e 8 nos primeiro e quinto minutos. Aos 40 minutos de vida inicia gemência, taquipneia (FR = 78 irpm), retração intercostal e batimento de asa de nariz, com boletim de Silverman-Andersen = 6, piorando nas horas seguintes. A radiografia de tórax mostra infiltrado reticulogranular difuso, broncogramas aéreos e baixo volume pulmonar. Considerando o diagnóstico mais provável, qual é o mecanismo fisiopatológico primário envolvido?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Atraso na reabsorção do líquido intersticial pulmonar."
    },
    {
      "id": "B",
      "texto": "Deficiência de surfactante."
    },
    {
      "id": "C",
      "texto": "Aspiração e obstrução de pequenas vias aéreas."
    },
    {
      "id": "D",
      "texto": "Persistência da circulação fetal."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **prematuridade de 30 semanas** (a imaturidade pulmonar é o principal determinante, e a incidência da doença da membrana hialina é inversamente proporcional à idade gestacional), **ausência de corticoide antenatal**, **cesárea eletiva sem trabalho de parto** (sem a descarga adrenérgica que estimula a síntese e a secreção de surfactante), **desconforto respiratório precoce e progressivo, com gemência (Silverman = 6)** e **radiografia com infiltrado reticulogranular difuso, broncogramas aéreos e baixo volume pulmonar**: **doença da membrana hialina**, causada por **deficiência de surfactante**, com aumento da tensão superficial, atelectasia e baixa complacência. A (atraso na reabsorção do líquido pulmonar) é a taquipneia transitória do recém-nascido, típica de RN de termo ou prematuro tardio nascido de cesárea, com melhora em 24 a 72 horas. C (aspiração e obstrução de pequenas vias aéreas) é a síndrome de aspiração de mecônio, em RN de termo ou pós-termo com líquido meconial. D (persistência da circulação fetal) cursa com hipoxemia refratária e diferença de saturação pré e pós-ductal, e costuma ser secundária a outra doença.",
  "explicacoesAlternativas": {},
  "referencias": "Sweet DG et al. European Consensus Guidelines on the Management of Respiratory Distress Syndrome, 2022 update; Sociedade Brasileira de Pediatria, Programa de Reanimação Neonatal e diretrizes de desconforto respiratório do RN.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q96 da UNIFESP 2024
{
  "id": "q-adap24-055",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-urologia",
  "assuntoId": "ass-uro-malformacoes",
  "enunciado": "Menina, 5 meses de idade, com febre de 39 ºC há 2 dias e irritabilidade, sem outro foco. A urocultura (coleta por cateterismo vesical) mostra crescimento de Escherichia coli > 100.000 UFC/mL, e a paciente é tratada por 10 dias, com boa resposta clínica. Trata-se do primeiro episódio de infecção do trato urinário, sem história familiar de refluxo vesicoureteral. Qual é o exame de imagem indicado inicialmente?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Cintilografia renal com DMSA."
    },
    {
      "id": "B",
      "texto": "Ultrassonografia de rins e vias urinárias."
    },
    {
      "id": "C",
      "texto": "Cintilografia renal com diurético."
    },
    {
      "id": "D",
      "texto": "Uretrocistografia miccional."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **lactente de 5 meses, do sexo feminino** (grupo de maior incidência de ITU na infância), **primeiro episódio de ITU febril**, **urocultura positiva com E. coli** e **boa resposta clínica**: o exame de imagem inicial recomendado pela Sociedade Brasileira de Pediatria e pela Academia Americana de Pediatria é a **ultrassonografia de rins e vias urinárias**, não invasiva, para detectar hidronefrose, dilatação ureteral, alterações do parênquima, litíase e malformações. A (cintilografia renal com DMSA) detecta cicatriz renal e deve ser feita cerca de 6 meses depois da infecção, ou na ITU recorrente ou atípica, não sendo o exame inicial. C (cintilografia com diurético) avalia obstrução da junção pieloureteral e é indicada se a ultrassonografia mostrar hidronefrose. D (uretrocistografia miccional) pesquisa refluxo vesicoureteral e fica reservada para ultrassonografia alterada, ITU recorrente ou atípica.",
  "explicacoesAlternativas": {},
  "referencias": "Sociedade Brasileira de Pediatria. Infecção do trato urinário: diagnóstico e tratamento, orientações para o pediatra, 2016; American Academy of Pediatrics. Urinary tract infection: clinical practice guideline for febrile infants and children 2 to 24 months, 2011.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q97 da UNIFESP 2024
{
  "id": "q-adap24-056",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-ped",
  "especialidadeId": "esp-neonato",
  "assuntoId": "ass-neo-infeccoescongenitas",
  "enunciado": "Recém-nascido, 10 dias de vida, assintomático, mãe primigesta, parto normal a termo, sem intercorrências na gestação ou no parto. Mãe com sorologias para toxoplasmose realizadas no início de cada trimestre gestacional com IgM e IgG não reagentes. A criança apresentou teste do pezinho positivo para toxoplasmose (IgM). Foram repetidas as sorologias (IgG e IgM) da mãe e do RN, ambas não reagentes, e o exame de fundo de olho, a ultrassonografia transfontanela e o hemograma do RN são normais. Como conduzir este caso?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Repetir sorologia para toxoplasmose da mãe e do RN; se ambas positivas, tratar o RN com sulfadiazina, pirimetamina e ácido folínico por 1 ano."
    },
    {
      "id": "B",
      "texto": "Considerar o teste do pezinho falso positivo, pois as sorologias materna durante a gestação foram negativas; não tratar a criança."
    },
    {
      "id": "C",
      "texto": "Tratar o RN com sulfadiazina, pirimetamina e ácido folínico por 42 dias, sem necessidade de repetir sorologias."
    },
    {
      "id": "D",
      "texto": "Repetir o teste do pezinho e, se positivo para toxoplasmose, tratar o RN com espiramicina por 1 ano."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **mãe com IgM e IgG não reagentes nos três trimestres** (suscetível, sem infecção na gestação), **triagem neonatal com IgM positiva em papel-filtro**, mas **sorologias confirmatórias da mãe e do RN (IgG e IgM) não reagentes** e **RN assintomático, com fundo de olho, ultrassonografia transfontanela e hemograma normais**: a triagem em papel-filtro tem **valor preditivo positivo baixo**, pois a toxoplasmose congênita é rara e há resultados falso-positivos; sem confirmação sorológica nem alterações clínicas, trata-se de **falso-positivo**, sem necessidade de tratar (mantendo-se orientação à família e seguimento clínico). A toxoplasmose congênita é um problema relevante no Brasil, e a triagem neonatal busca a detecção precoce, mas o diagnóstico exige confirmação. A (repetir sorologias e tratar por 1 ano se positivas) é a conduta quando a confirmação é positiva; aqui as sorologias já foram repetidas e estão negativas. C (tratar por 42 dias com sulfadiazina, pirimetamina e ácido folínico) não corresponde a nenhum esquema: o tratamento da forma congênita dura 12 meses e só se confirmada. D (repetir o teste do pezinho e tratar com espiramicina por 1 ano) usa um fármaco de profilaxia materna e não de tratamento do recém-nascido.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde. Protocolo de Notificação e Investigação: Toxoplasmose gestacional e congênita, 2018; Ministério da Saúde. Diretrizes do Programa Nacional de Triagem Neonatal; Sociedade Brasileira de Pediatria.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q99 da UNIFESP 2024
{
  "id": "q-adap24-057",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-ped",
  "especialidadeId": "esp-infectoped",
  "assuntoId": "ass-infectoped-pneumonia",
  "enunciado": "Lactente, 4 meses de idade, com pneumonia bacteriana, apresenta FR = 70 irpm, retração intercostal e subdiafragmática, batimento de asa de nariz e gemido expiratório. Qual dos achados clínicos representa um mecanismo compensatório para reduzir a resistência ao fluxo aéreo nas vias aéreas superiores?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Gemido expiratório."
    },
    {
      "id": "B",
      "texto": "Batimento de asa de nariz."
    },
    {
      "id": "C",
      "texto": "Taquipneia."
    },
    {
      "id": "D",
      "texto": "Retração subdiafragmática."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: o lactente de 4 meses é **respirador nasal obrigatório**, e as narinas respondem por grande parte da resistência total ao fluxo de ar, que aumenta com o edema e as secreções (as infecções respiratórias são muito frequentes nessa idade). O **batimento de asa de nariz** é a dilatação ativa das narinas durante a inspiração, que **reduz a resistência das vias aéreas superiores** e o trabalho respiratório. A (gemido expiratório) é o fechamento parcial da glote ao final da expiração, que gera pressão positiva (PEEP fisiológica) e mantém a capacidade residual funcional, evitando o colapso alveolar. C (taquipneia) é o mecanismo para manter a ventilação-minuto quando o volume corrente é reduzido pela baixa complacência. D (retração subdiafragmática) é sinal de aumento do trabalho respiratório, por tórax muito complacente e diafragma tracionando as costelas inferiores, e não um mecanismo que reduza a resistência das vias aéreas superiores.",
  "explicacoesAlternativas": {},
  "referencias": "West JB. Fisiologia Respiratória; Sociedade Brasileira de Pediatria, Departamento de Pneumologia, diretrizes de pneumonia na infância; Nelson, Tratado de Pediatria.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q1 da UNIFESP 2024
{
  "id": "q-adap24-058",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-cirvascular",
  "assuntoId": "ass-cirvasc-aneurisma",
  "enunciado": "Homem, 68 anos de idade, ex-fumante de 40 maços-ano, hipertenso, foi submetido a ultrassonografia abdominal de rotina. O exame mostra aneurisma fusiforme infrarrenal de 5,8 cm de diâmetro máximo. Angiotomografia: colo proximal com 28 mm de comprimento e angulação de 40°, artérias ilíacas com calibre adequado para acesso. Assintomático, risco cirúrgico baixo (ASA II). Qual é a conduta mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Seguimento com ultrassonografia a cada 3 anos, pois o paciente é assintomático."
    },
    {
      "id": "B",
      "texto": "Seguimento com ultrassonografia anual e reavaliação cirúrgica apenas quando o diâmetro atingir 6,5 cm."
    },
    {
      "id": "C",
      "texto": "Embolização do saco aneurismático com molas por via percutânea, mantendo antiagregação plaquetária."
    },
    {
      "id": "D",
      "texto": "Correção eletiva do aneurisma, preferencialmente por via endovascular, associada a cessação do tabagismo e estatina."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **homem, 68 anos, ex-tabagista** (principal grupo de risco e de rastreamento) e **diâmetro de 5,8 cm** (acima do limiar de 5,5 cm em homens) indicam correção eletiva mesmo em assintomático, pois o risco anual de ruptura cresce de forma exponencial com o diâmetro. **Colo com 28 mm e angulação de 40°, acessos ilíacos adequados e risco cirúrgico baixo** tornam a anatomia favorável ao reparo endovascular (EVAR), que reduz a mortalidade perioperatória em relação à cirurgia aberta; a cirurgia aberta permanece opção. Controle de fatores de risco (tabagismo, estatina, pressão arterial) complementa a conduta. A (vigilância a cada 3 anos) vale apenas para aneurismas de 3,0 a 3,9 cm. B (vigilância anual) é a conduta para aneurismas de 4,0 a 4,9 cm; esperar 6,5 cm expõe o paciente a risco de ruptura desnecessário, já que a indicação é 5,5 cm. C (embolização do saco) não é tratamento aceito para aneurisma de aorta, pois não exclui a pressão sistêmica da parede e mantém o risco de ruptura.",
  "explicacoesAlternativas": {},
  "referencias": "Society for Vascular Surgery. Clinical practice guidelines on abdominal aortic aneurysm, 2018; ESVS Guidelines on AAA, 2024; USPSTF, rastreamento de aneurisma de aorta abdominal, 2019.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q4 da UNIFESP 2024
{
  "id": "q-adap24-059",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-trauma",
  "assuntoId": "ass-queimaduras",
  "enunciado": "Menino, 3 anos de idade, é levado ao pronto-socorro 20 minutos após derramar sobre si uma panela de água fervente na cozinha de casa. Apresenta queimadura de segundo grau, com bolhas, hiperemia e dor intensa, em todo o antebraço e na mão direitos (cerca de 4% da superfície corporal). Hemodinamicamente estável. Qual é a conduta inicial mais adequada para a lesão?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Aplicar gelo diretamente sobre a lesão e mantê-lo até o alívio completo da dor, para limitar o edema e a progressão da queimadura em profundidade."
    },
    {
      "id": "B",
      "texto": "Romper as bolhas, aplicar pomada anestésica e cobrir com gaze seca, para reduzir a dor nas trocas de curativo e proteger o leito."
    },
    {
      "id": "C",
      "texto": "Resfriar a área com água corrente em temperatura ambiente por cerca de 20 minutos, retirando roupas e adornos e mantendo a criança aquecida."
    },
    {
      "id": "D",
      "texto": "Aplicar sulfadiazina de prata em camada espessa e ocluir imediatamente, sem resfriamento prévio, para prevenir infecção e facilitar o curativo."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **20 minutos após o acidente** (dentro da janela de até 3 horas em que o resfriamento ainda reduz a profundidade da lesão e a dor) e **queimadura escaldante de segundo grau em criança de 3 anos** apontam para o resfriamento imediato com água corrente em temperatura ambiente (cerca de 15 a 25 °C) por 20 minutos, retirando roupas e adornos antes que edema impeça a retirada. Em criança pequena, resfria-se apenas a área queimada e mantém-se o restante do corpo aquecido, pelo risco de hipotermia. A (gelo direto) causa vasoconstrição e lesão adicional por frio, aprofundando a queimadura. B (romper bolhas e usar pomada anestésica) aumenta o risco de infecção e de absorção sistêmica de anestésico em criança; bolhas íntegras são mantidas. D (sulfadiazina de prata espessa sem resfriamento) perde a janela de benefício do resfriamento, a sulfadiazina de prata não é a primeira medida, não substitui o resfriamento e, em camada espessa, dificulta a avaliação da profundidade da lesão.",
  "explicacoesAlternativas": {},
  "referencias": "American Burn Association. Advanced Burn Life Support (ABLS); ATLS 10ª ed., 2018 (queimaduras); International Society for Burn Injuries, Practice Guidelines, 2016; Ministério da Saúde, Cartilha para tratamento de emergência das queimaduras.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q5 da UNIFESP 2024
{
  "id": "q-adap24-060",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-toce",
  "assuntoId": "ass-toce-incisoes",
  "enunciado": "Agricultor, 63 anos de idade, fototipo II, natural do interior de Mato Grosso do Sul e exposto ao sol por décadas, apresenta lesão nodular perolada de 7 mm na região centro-lateral da fronte, com diagnóstico histológico de carcinoma basocelular. Planeja-se ressecção com margem de segurança de 4 mm por incisão fusiforme e fechamento primário. Seguindo as linhas de tensão da pele (linhas de Langer / linhas de expressão), qual é a melhor orientação da incisão?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Vertical, paralela ao eixo do corpo, para reduzir a tensão sobre a ferida."
    },
    {
      "id": "B",
      "texto": "Horizontal, acompanhando as rugas de expressão da fronte."
    },
    {
      "id": "C",
      "texto": "Oblíqua a 45º em relação às rugas, para quebrar a linha da cicatriz."
    },
    {
      "id": "D",
      "texto": "Circular, sem orientação específica, pois o fechamento independe das linhas de tensão."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **lesão centro-lateral da fronte** e menção às **linhas de Langer** indicam que a incisão deve seguir as linhas de tensão cutânea relaxada, que na fronte são **horizontais**, paralelas às rugas de expressão do músculo frontal. Incisões paralelas a essas linhas cicatrizam com menor tensão, cicatriz mais fina e melhor resultado estético. A excisão fusiforme deve ter razão comprimento:largura de cerca de 3:1 e ângulos de ~30º. O carcinoma basocelular nodular de baixo risco e menor que 2 cm, nessa localização, admite margem de 4 mm. A (vertical) cruza as linhas de expressão, aumenta a tensão e produz cicatriz alargada e visível. C (oblíqua) também cruza as linhas de tensão e gera cicatriz assimétrica e mais evidente. D (circular, sem orientação) ignora o princípio das linhas de tensão e dificulta o fechamento primário sem distorção, formando orelhas de cão.",
  "explicacoesAlternativas": {},
  "referencias": "NCCN Guidelines: Basal Cell Skin Cancer (versão vigente); Diretrizes da Sociedade Brasileira de Dermatologia para carcinoma basocelular; INCA, Estimativa de incidência de câncer no Brasil; Townsend, Sabiston Tratado de Cirurgia (princípios de incisões e linhas de tensão).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q14 da UNIFESP 2024
{
  "id": "q-adap24-061",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-cirtoracica",
  "assuntoId": "ass-cirtorax-neoplasia",
  "enunciado": "Homem, 28 anos de idade, não tabagista, apresenta edema cervicofacial matinal, cefaleia e tontura há 10 dias, com piora ao se curvar. Exame físico: PA = 120/70 mmHg, eupneico, sem estridor, circulação venosa colateral e telangiectasias na parede torácica anterior, murmúrio vesicular simétrico. Fundo de olho: edema de papila. Exame neurológico normal. Tomografia de tórax: massa de mediastino anterior com 9 cm, comprimindo a veia cava superior; sem derrame pericárdico. Não há comprometimento de via aérea. Qual é o diagnóstico sindrômico, a causa mais provável e a conduta inicial?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Síndrome de hipertensão intracraniana; glioma de alto grau; craniotomia descompressiva de urgência, com corticoide e manitol."
    },
    {
      "id": "B",
      "texto": "Síndrome da veia cava superior; carcinoma broncogênico; lobectomia de urgência, antes de qualquer biópsia."
    },
    {
      "id": "C",
      "texto": "Síndrome da veia cava superior; linfoma mediastinal; biópsia da massa para diagnóstico histológico antes do tratamento específico."
    },
    {
      "id": "D",
      "texto": "Pericardite constritiva; tuberculose; pericardiectomia imediata, associada a esquema antituberculoso."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **edema cervicofacial matinal com piora ao se curvar, circulação colateral torácica e edema de papila** caracterizam a síndrome da veia cava superior. **Idade de 28 anos, não tabagista e massa de mediastino anterior volumosa** tornam o linfoma (Hodgkin, linfoma B primário do mediastino ou linfoblástico T) a causa mais provável nessa faixa etária, diferentemente do adulto idoso tabagista, em que predomina o câncer de pulmão. Como **não há estridor nem comprometimento de via aérea ou do sistema nervoso central**, o paciente é estável e o tratamento não deve ser iniciado às cegas: obtém-se diagnóstico histológico primeiro (biópsia por agulha grossa guiada por imagem ou mediastinoscopia), porque corticoide, radioterapia ou quimioterapia prévios podem inviabilizar a histologia, e o tratamento depende do tipo tumoral. A (hipertensão intracraniana) é consequência venosa e não diagnóstico primário; craniotomia não tem papel. B (carcinoma broncogênico com lobectomia) é improvável no perfil e a cirurgia de urgência não é conduta de síndrome da veia cava superior. D (pericardite constritiva) não explica massa mediastinal nem circulação colateral cervicofacial.",
  "explicacoesAlternativas": {},
  "referencias": "Wilson LD, Detterbeck FC, Yahalom J. Superior vena cava syndrome with malignant causes. N Engl J Med 2007; NCCN Guidelines: Hodgkin Lymphoma e B-Cell Lymphomas; ESMO Clinical Practice Guidelines (oncologic emergencies).",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q16 da UNIFESP 2024
{
  "id": "q-adap24-062",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-urologia",
  "assuntoId": "ass-uro-disfuncaoeretil",
  "enunciado": "Homem, 58 anos de idade, diabético tipo 2 há 12 anos, hipertenso e ex-tabagista, queixa-se há 1 ano de dificuldade para obter e manter ereção suficiente para o ato sexual, com libido preservada. Exame físico sem alterações, testosterona total normal, em uso de metformina, enalapril e sinvastatina; não usa nitratos e não tem angina. Qual é o tratamento inicial mais indicado?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Alfabloqueador, pela ação relaxante sobre a musculatura lisa do corpo cavernoso e do colo vesical."
    },
    {
      "id": "B",
      "texto": "Inibidor da 5-alfarredutase, para melhorar o fluxo sanguíneo peniano e a resposta à estimulação."
    },
    {
      "id": "C",
      "texto": "Reposição de testosterona por via intramuscular, pois a causa é hormonal na maioria dos diabéticos, independentemente do nível sérico basal."
    },
    {
      "id": "D",
      "texto": "Inibidor da fosfodiesterase tipo 5, após avaliação do risco cardiovascular e confirmação de que não usa nitratos."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **disfunção erétil de causa orgânica provável (diabetes, hipertensão e tabagismo)** com **libido preservada e testosterona normal** indicam tratamento de primeira linha com inibidor de fosfodiesterase tipo 5 (sildenafila, tadalafila, vardenafila), que potencializa a via do óxido nítrico-GMPc. **Não usa nitratos e não tem angina** é a informação que autoriza o uso, pois a associação com nitrato é contraindicada pelo risco de hipotensão grave; antes de prescrever, avalia-se o risco cardiovascular, pois disfunção erétil em diabético pode anteceder doença coronariana. A (alfabloqueador) trata sintomas urinários da hiperplasia prostática e não é tratamento da disfunção erétil. B (inibidor da 5-alfarredutase) trata hiperplasia prostática e pode até reduzir a libido e a função erétil. C (testosterona) só é indicada em hipogonadismo confirmado; aqui a testosterona é normal e o uso sem indicação não corrige a causa vascular e neuropática.",
  "explicacoesAlternativas": {},
  "referencias": "European Association of Urology. Guidelines on Sexual and Reproductive Health, 2023; American Urological Association. Erectile Dysfunction Guideline, 2018; Sociedade Brasileira de Urologia, Diretrizes de disfunção erétil.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q17 da UNIFESP 2024
{
  "id": "q-adap24-063",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-abdagudo",
  "assuntoId": "ass-obstrucao",
  "enunciado": "Menino, 10 meses de idade, previamente hígido, é levado ao pronto-socorro com crises de choro em cólica intermitentes e vômitos há 14 horas; há 3 horas evacuou fezes com muco e sangue (‘geleia de morango’). Ultrassonografia: imagem em ‘alvo’ na fossa ilíaca direita, sem líquido livre. Recebeu hidratação venosa e correção dos distúrbios hidroeletrolíticos, está hemodinamicamente estável, sem peritonite nem pneumoperitônio na radiografia. Qual é a conduta terapêutica definitiva mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Laparotomia imediata com ressecção do segmento acometido, por causa do sangramento nas fezes e do sinal do alvo."
    },
    {
      "id": "B",
      "texto": "Redução não operatória por enema (hidrostático guiado por ultrassonografia ou pneumático), com cirurgião pediátrico disponível."
    },
    {
      "id": "C",
      "texto": "Tomografia computadorizada de abdome com contraste antes de qualquer decisão terapêutica, para confirmar o diagnóstico."
    },
    {
      "id": "D",
      "texto": "Manter jejum e observação por 24 horas, pois a maioria das invaginações se reduz espontaneamente sem intervenção."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **lactente de 10 meses, cólica intermitente, vômitos, fezes em geleia de morango e sinal do alvo na ultrassonografia** caracterizam invaginação intestinal ileocólica, mais frequente entre 4 e 12 meses. **Já hidratado, estável, sem peritonite nem pneumoperitônio** significa que a ressuscitação foi feita e não há contraindicação à redução não operatória, tratamento de escolha, com taxa de sucesso elevada pelo enema hidrostático guiado por ultrassonografia ou pelo pneumático sob fluoroscopia, sempre com equipe cirúrgica de sobreaviso por risco de perfuração. A (laparotomia imediata) é reservada a peritonite, perfuração, instabilidade ou falha da redução. C (tomografia) é desnecessária, expõe à radiação e atrasa o tratamento, pois o diagnóstico está firmado pela ultrassonografia. D (observação) não é segura: embora haja redução espontânea em casos pequenos e curtos, a invaginação sintomática com sangramento e vômitos pode evoluir para isquemia e necrose.",
  "explicacoesAlternativas": {},
  "referencias": "Recomendações da European Society of Paediatric Radiology (ESPR) sobre invaginação intestinal; American Pediatric Surgical Association; Ministério da Saúde, Manual de urgência e emergência em pediatria.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q19 da UNIFESP 2024
{
  "id": "q-adap24-064",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-ped",
  "especialidadeId": "esp-neonato",
  "assuntoId": "ass-neo-ecn",
  "enunciado": "Recém-nascido a termo, 3.350 g, Apgar 9 e 10, em aleitamento materno, sem intercorrências, recebe alta com 36 horas de vida e retorna ao 3º dia com vômitos biliosos. No pronto-socorro, o abdome estava flácido e indolor; de repente, apresenta palidez, taquicardia, choque e distensão abdominal dolorosa, com sangue nas fezes, necessitando de intubação e drogas vasoativas. Qual é o diagnóstico mais provável e a conduta imediata?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Atresia duodenal; descompressão gástrica, correção eletiva da malformação e nutrição parenteral."
    },
    {
      "id": "B",
      "texto": "Enterocolite necrosante; antibioticoterapia, jejum e tratamento clínico por 7 a 10 dias, com descompressão gástrica."
    },
    {
      "id": "C",
      "texto": "Volvo de intestino médio por má rotação; ressuscitação e laparotomia de urgência (procedimento de Ladd)."
    },
    {
      "id": "D",
      "texto": "Doença de Hirschsprung; enema opaco e biópsia retal em regime ambulatorial, com irrigações intestinais."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **recém-nascido a termo, sem fatores de risco, em aleitamento materno** afasta a enterocolite necrosante, que acomete principalmente prematuros e de muito baixo peso. **Vômito bilioso nos primeiros dias com abdome inicialmente flácido e deterioração súbita com choque, distensão dolorosa e sangue nas fezes** é a apresentação clássica do volvo de intestino médio sobre o pedículo mesentérico estreito da má rotação, que causa isquemia intestinal e é emergência cirúrgica. A conduta é ressuscitação e laparotomia imediata, com desvolvulação e procedimento de Ladd; o atraso resulta em perda extensa de intestino e síndrome do intestino curto. A (atresia duodenal) causa vômito bilioso ou não biliar precoce com sinal da dupla bolha, mas sem deterioração súbita com isquemia e sem sangramento. B (enterocolite necrosante) tem manejo clínico, mas não se aplica ao perfil, e o tratamento clínico atrasaria a cirurgia. D (Hirschsprung) cursa com atraso na eliminação de mecônio e distensão, não com colapso hemodinâmico súbito, e não se investiga ambulatorialmente em quadro agudo.",
  "explicacoesAlternativas": {},
  "referencias": "Sociedade Brasileira de Cirurgia Pediátrica (CIPE), consensos de abdome agudo neonatal; American Academy of Pediatrics, Neonatal bilious vomiting; Kliegman, Nelson Textbook of Pediatrics (má rotação e volvo).",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q20 da UNIFESP 2024
{
  "id": "q-adap24-065",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cg",
  "especialidadeId": "esp-ortopedia",
  "assuntoId": "ass-orto-artrose",
  "enunciado": "Homem, 70 anos de idade, obeso (IMC 33 kg/m²), pedreiro aposentado, apresenta dor na região inguinal direita há 4 anos, sem trauma, com piora progressiva. Atualmente tem dificuldade para calçar meias e sapatos, dor noturna e em repouso. A radiografia da bacia mostra redução assimétrica do espaço articular do quadril direito, esclerose subcondral e osteófitos marginais, com cabeça femoral de contorno esférico preservado. Há mais de 6 meses faz fisioterapia, perde peso supervisionado, usa paracetamol, anti-inflamatórios e opioide, sem alívio. Qual é o diagnóstico mais provável e a conduta mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Osteoartrite do quadril; artroplastia total do quadril."
    },
    {
      "id": "B",
      "texto": "Osteonecrose da cabeça femoral; descompressão do núcleo e enxerto ósseo."
    },
    {
      "id": "C",
      "texto": "Osteoporose; reposição de vitamina D e cálcio e bisfosfonato."
    },
    {
      "id": "D",
      "texto": "Artrite séptica crônica do quadril; drenagem cirúrgica e antibioticoterapia prolongada."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **idade de 70 anos, obesidade, ocupação de carga, dor inguinal insidiosa com limitação para calçar meias e dor noturna** e **radiografia com redução do espaço articular, esclerose subcondral e osteófitos marginais** são típicos de osteoartrite do quadril. **Mais de 6 meses de tratamento clínico otimizado (fisioterapia, perda de peso, analgésicos, anti-inflamatórios, opioide) sem resposta, com dor em repouso e limitação funcional** indica artroplastia total do quadril, tratamento de escolha em doença avançada refratária, com excelentes resultados em dor e função. B (osteonecrose) mostra esclerose, colapso subcondral e perda do contorno esférico da cabeça, comum em corticoide e etilismo; a cabeça preservada afasta o diagnóstico e a descompressão só vale em fase inicial. C (osteoporose) não causa estreitamento articular nem osteófitos e é tratada por prevenção de fraturas, não explicando a dor inguinal articular. D (artrite séptica crônica) cursaria com febre, elevação de marcadores inflamatórios e destruição articular, não com evolução de 4 anos e osteófitos.",
  "explicacoesAlternativas": {},
  "referencias": "ACR/Arthritis Foundation Guideline for OA of the hand, hip and knee, 2019; OARSI Guidelines, 2019; NICE NG226 (2022); Sociedade Brasileira de Ortopedia e Traumatologia, Diretrizes de osteoartrite.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q21 da UNIFESP 2024
{
  "id": "q-adap24-066",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-geriatria",
  "assuntoId": "ass-geriatria-maustratos",
  "enunciado": "Mulher, 88 anos de idade, com demência moderada, episódios de delírio e agitação, vem à consulta na UBS acompanhada do filho, seu único cuidador, que apresenta sinais de esgotamento. Durante a consulta, em desentendimento com a mãe, ele grita que vai ‘internar a velha’ e diz que ‘ela não presta para mais nada’. Diante da suspeita de violência psicológica, assinale a alternativa correta.",
  "alternativas": [
    {
      "id": "A",
      "texto": "A notificação é desnecessária enquanto a violência for apenas suspeita, devendo-se aguardar a confirmação pela perícia e pelo serviço social."
    },
    {
      "id": "B",
      "texto": "A notificação só é obrigatória quando a pessoa idosa for capaz de relatar o episódio e consentir com o registro, por respeito à autonomia."
    },
    {
      "id": "C",
      "texto": "A comunicação só é devida se houver lesão física, pois a violência psicológica não é de notificação obrigatória nem de comunicação aos órgãos."
    },
    {
      "id": "D",
      "texto": "A suspeita já obriga a notificação compulsória no Sinan e a comunicação aos órgãos de proteção, sem exigir confirmação nem consentimento da vítima."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **suspeita de violência psicológica contra pessoa idosa com demência** por um cuidador familiar sobrecarregado configura situação em que a legislação brasileira exige notificação. Pelo Estatuto da Pessoa Idosa (Lei 10.741/2003), a **suspeita ou confirmação** de violência deve ser obrigatoriamente comunicada pelos profissionais de saúde às autoridades (Ministério Público, conselhos do idoso, delegacia), e a violência interpessoal contra pessoa idosa é de notificação compulsória no Sinan, independentemente de confirmação, do tipo de violência ou do consentimento da vítima. A **sobrecarga do cuidador** é fator de risco conhecido e orienta a intervenção: apoio ao cuidador, rede de cuidados e reavaliação, sem retirar a obrigação de notificar. A (aguardar confirmação) contraria a lei, que se aplica à suspeita. B (depender de consentimento ou capacidade) é incorreto, e a demência não retira o direito de proteção. C (só lesão física) é incorreto: a violência psicológica é uma das formas de violência notificáveis.",
  "explicacoesAlternativas": {},
  "referencias": "Lei 10.741/2003 (Estatuto da Pessoa Idosa), art. 19; Portaria de Consolidação GM/MS nº 4/2017, Anexo V (Lista Nacional de Notificação Compulsória, atualizada por portarias posteriores; consultar a versão vigente); Ministério da Saúde, Linha de cuidado para a atenção integral à saúde da pessoa idosa e Violência intrafamiliar: orientações para prática em serviço.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q31 da UNIFESP 2024
{
  "id": "q-adap24-067",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-nefro",
  "assuntoId": "ass-drc",
  "enunciado": "Mulher, 62 anos de idade, com diabetes mellitus tipo 2 e hipertensão arterial há 15 anos, em acompanhamento na Unidade Básica de Saúde. Os exames atuais mostram creatinina sérica de 1,8 mg/dL. Não há sintomas urinários nem edema. Qual é a maneira recomendada para a avaliação da função renal desta paciente na prática clínica?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Considerar a função renal próxima do normal, pois a creatinina é inferior a 2,0 mg/dL e não há sintomas."
    },
    {
      "id": "B",
      "texto": "Estimar a taxa de filtração glomerular pela CKD-EPI e associar a relação albumina/creatinina em urina isolada."
    },
    {
      "id": "C",
      "texto": "Solicitar rotineiramente a depuração de creatinina em urina de 24 horas em todos os pacientes."
    },
    {
      "id": "D",
      "texto": "Estimar a taxa de filtração glomerular pela equação de Cockcroft-Gault, que é a recomendada para estadiar a doença renal crônica."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **diabetes e hipertensão de longa data** colocam a paciente em grupo de risco para doença renal crônica, que deve ser avaliada por **taxa de filtração glomerular estimada (TFGe) com a equação CKD-EPI** (preferencialmente a versão de 2021 sem coeficiente racial) e por **albuminúria**, avaliada pela relação albumina/creatinina em amostra isolada; o estadiamento KDIGO combina as duas medidas. A creatinina de 1,8 mg/dL em mulher de 62 anos corresponde a TFGe bastante reduzida (cerca de 30 mL/min/1,73 m²). A (creatinina abaixo de 2,0 é ‘quase normal’) é erro frequente, pois a creatinina só se eleva após perda importante da filtração. C (urina de 24 horas rotineira) é sujeita a erros de coleta e não é superior à estimativa; é reservada a situações específicas. D (Cockcroft-Gault) é usada em ajuste de doses de alguns fármacos, e não como equação recomendada para estadiar a doença renal crônica.",
  "explicacoesAlternativas": {},
  "referencias": "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of CKD; Sociedade Brasileira de Nefrologia, Diretrizes de DRC; Ministério da Saúde, Diretrizes clínicas para o cuidado ao paciente com doença renal crônica no SUS (2014).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q36 da UNIFESP 2024
{
  "id": "q-adap24-068",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-endocrino",
  "assuntoId": "ass-tireoide",
  "enunciado": "Mulher, 41 anos de idade, com diabetes mellitus tipo 1 desde os 20 anos, queixa-se de constipação há 3 semanas e fadiga há 2 semanas. Há 3 meses teve palpitações e diarreia por algumas semanas, com melhora espontânea. Exame físico: afebril, FC = 48 bpm, PA = 124/88 mmHg, IMC = 22 kg/m², tireoide indolor, de volume normal; pele fria e seca, cabelos ralos, edema não depressível +/4+ nos membros inferiores. Considerando a hipótese diagnóstica mais provável, qual é a alteração de exame a ser encontrada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "TSH suprimido, com T4 livre elevado."
    },
    {
      "id": "B",
      "texto": "Captação difusa e aumentada de iodo radioativo na cintilografia."
    },
    {
      "id": "C",
      "texto": "Anticorpo contra o receptor de TSH (TRAb) em títulos elevados."
    },
    {
      "id": "D",
      "texto": "Anticorpos antitireoperoxidase (anti-TPO) positivos."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **diabetes tipo 1 (autoimunidade associada)**, episódio transitório de **tireotoxicose (palpitações e diarreia) seguido por hipotireoidismo (constipação, fadiga, bradicardia, pele seca, cabelos ralos, edema não depressível)** com **tireoide indolor** indicam tireoidite autoimune, com fase hipertireoidiana transitória (hashitoxicose) e evolução para hipotireoidismo. O marcador é a presença de **anticorpos anti-TPO positivos**, encontrados em mais de 90% dos casos de tireoidite de Hashimoto. A (TSH suprimido) ocorreria na fase tireotóxica ou no hipertireoidismo, e não no hipotireoidismo atual, em que o TSH está elevado. B (captação difusa e aumentada) é típica da doença de Graves; na tireoidite a captação está baixa na fase tireotóxica. C (TRAb) marca a doença de Graves, que não explica o quadro atual de hipotireoidismo.",
  "explicacoesAlternativas": {},
  "referencias": "American Thyroid Association. Guidelines for the Treatment of Hypothyroidism, 2014; ADA Standards of Care in Diabetes (rastreamento de doença tireoidiana no diabetes tipo 1); Sociedade Brasileira de Endocrinologia e Metabologia, Diretrizes de tireoidopatias.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q37 da UNIFESP 2024
{
  "id": "q-adap24-069",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-endocrino",
  "assuntoId": "ass-dm",
  "enunciado": "Mulher, 62 anos de idade, com diabetes mellitus tipo 2 há 12 anos, faz uso de metformina há 8 anos e acrescentou há 3 meses um inibidor de SGLT2 (dapagliflozina) por doença renal crônica leve. Quais efeitos adversos podem ocorrer com o uso dessas medicações, respectivamente (metformina e inibidor de SGLT2)?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Cetoacidose euglicêmica e deficiência de vitamina B12, respectivamente, por efeito de cada fármaco."
    },
    {
      "id": "B",
      "texto": "Deficiência de vitamina B12 e cetoacidose euglicêmica, além de infecções genitais fúngicas."
    },
    {
      "id": "C",
      "texto": "Hipoglicemia grave e esteatose hepática, com elevação importante das transaminases."
    },
    {
      "id": "D",
      "texto": "Ganho de peso e retenção hídrica com insuficiência cardíaca, além de fraturas ósseas."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **uso prolongado de metformina (8 anos)** associa-se a redução dos níveis de vitamina B12 (por má absorção ileal), que deve ser dosada periodicamente, sobretudo diante de neuropatia ou anemia; o **inibidor de SGLT2 recém-iniciado** pode causar cetoacidose diabética euglicêmica (situações de jejum, doença aguda ou cirurgia, baixa reserva insulínica) e infecções genitais fúngicas e do trato urinário por glicosúria. A ordem ‘respectivamente’ importa. A (cetoacidose euglicêmica e deficiência de B12) inverte as drogas: cetoacidose euglicêmica é do iSGLT2 e a deficiência de B12 é da metformina. C (hipoglicemia grave e esteatose hepática) não corresponde: nenhuma das duas drogas causa hipoglicemia isolada relevante, e iSGLT2 reduz esteatose. D (ganho de peso e retenção hídrica/insuficiência cardíaca) descreve pioglitazona e insulina; metformina é neutra ou reduz peso e iSGLT2 reduz internações por insuficiência cardíaca.",
  "explicacoesAlternativas": {},
  "referencias": "American Diabetes Association. Standards of Care in Diabetes, 2024 (farmacoterapia e efeitos adversos); Diretriz da Sociedade Brasileira de Diabetes, 2023-2024; Pesquisa Nacional de Saúde 2019 (IBGE).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q38 da UNIFESP 2024
{
  "id": "q-adap24-070",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-endocrino",
  "assuntoId": "ass-dm",
  "enunciado": "Homem, 64 anos de idade, diabético tipo 2 há 10 anos, hipertenso, com insuficiência cardíaca com fração de ejeção reduzida (FE = 30%) em classe funcional NYHA III, de etiologia isquêmica; creatinina sérica estável, com taxa de filtração glomerular estimada de 55 mL/min/1,73 m². Para otimizar o controle glicêmico, qual das medicações abaixo é contraindicada neste paciente?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Pioglitazona."
    },
    {
      "id": "B",
      "texto": "Dapagliflozina."
    },
    {
      "id": "C",
      "texto": "Metformina."
    },
    {
      "id": "D",
      "texto": "Insulina NPH."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **insuficiência cardíaca com FE de 30% em NYHA III** contraindica as tiazolidinedionas (pioglitazona), que causam retenção de sódio e água e aumentam o risco de descompensação e internação por insuficiência cardíaca; a bula e as diretrizes de diabetes e de insuficiência cardíaca as contraindicam em NYHA III e IV. B (dapagliflozina) é recomendada: inibidores de SGLT2 reduzem mortalidade cardiovascular e internações por insuficiência cardíaca com FE reduzida, com ou sem diabetes. C (metformina) pode ser mantida na insuficiência cardíaca estável com TFGe acima de 30 mL/min/1,73 m², suspendendo-se em descompensação grave com hipoperfusão. D (insulina NPH) pode ser usada quando necessária, com atenção à hipoglicemia e à retenção hídrica leve; não é contraindicada.",
  "explicacoesAlternativas": {},
  "referencias": "ADA Standards of Care in Diabetes 2024; Diretriz Brasileira de Insuficiência Cardíaca Crônica e Aguda, SBC (2018/2021); Diretriz da Sociedade Brasileira de Diabetes 2023-2024.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q41 da UNIFESP 2024
{
  "id": "q-adap24-071",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-neuro",
  "assuntoId": "ass-neuro-desmielinizante",
  "enunciado": "Mulher, 29 anos de idade, queixa-se há 5 dias de dor à movimentação do olho esquerdo e embaçamento central da visão desse olho. Exame: acuidade visual de 20/80 no olho esquerdo, discromatopsia e defeito pupilar aferente relativo, sem edema de papila. Sem febre, vacinação ou infecção recentes. Qual é a conduta mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Prednisona oral em dose habitual de 1 mg/kg/dia, com tomografia de crânio sem contraste para afastar lesão expansiva."
    },
    {
      "id": "B",
      "texto": "Tratamento conservador, com orientação de melhora espontânea, sem exames adicionais."
    },
    {
      "id": "C",
      "texto": "Metilprednisolona endovenosa em pulsoterapia, com ressonância magnética de crânio e órbitas com contraste."
    },
    {
      "id": "D",
      "texto": "Tratamento conservador, com coleta de VHS e PCR e biópsia de artéria temporal para afastar arterite de células gigantes."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **mulher jovem, dor à movimentação ocular, perda visual central subaguda, discromatopsia e defeito pupilar aferente relativo sem edema de papila** definem neurite óptica retrobulbar, a apresentação mais frequente de doença desmielinizante em adultos jovens. O tratamento é **metilprednisolona endovenosa em pulsoterapia (1 g/dia por 3 a 5 dias)**, que acelera a recuperação visual, e a **ressonância magnética de crânio e órbitas com contraste** estratifica o risco de esclerose múltipla pelas lesões desmielinizantes e orienta o tratamento de longo prazo; na investigação, considera-se também pesquisa de anticorpos anti-AQP4 e anti-MOG (espectro da neuromielite óptica). A (prednisona oral em dose habitual) está associada a maior número de recidivas de neurite óptica no ensaio ONTT e não é a conduta; a tomografia tem baixa sensibilidade para lesões desmielinizantes. B (conduta conservadora) deixa de tratar e de investigar um quadro com risco de sequela visual e de conversão para esclerose múltipla. D (VHS, PCR e biópsia de artéria temporal) refere-se à arterite de células gigantes, de pacientes acima de 50 anos, com neuropatia óptica isquêmica e papila edemaciada.",
  "explicacoesAlternativas": {},
  "referencias": "Optic Neuritis Treatment Trial (ONTT); AAN/ECTRIMS, diretrizes para neurite óptica e esclerose múltipla; Diretrizes Brasileiras para o tratamento de esclerose múltipla (PCDT do Ministério da Saúde).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q52 da UNIFESP 2024
{
  "id": "q-adap24-072",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-obstetricia",
  "assuntoId": "ass-prenatal",
  "enunciado": "Tercigesta de 24 semanas, hígida, com dois partos anteriores a termo, o último há 1 ano e 3 meses, comparece à consulta de pré-natal na UBS. Afirma ter recebido a vacina tríplice bacteriana acelular do adulto (dTpa) nas gestações anteriores. De acordo com o Calendário Nacional de Vacinação, qual é a orientação mais adequada em relação à dTpa nesta gestação?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Receber a vacina somente a partir da 32ª semana, com intervalo mínimo de 5 anos da dose anterior."
    },
    {
      "id": "B",
      "texto": "Não receber a vacina, pois a imunidade conferida nas gestações anteriores protege o recém-nascido."
    },
    {
      "id": "C",
      "texto": "Receber uma dose de dTpa em cada gestação, a partir da 20ª semana, portanto agora."
    },
    {
      "id": "D",
      "texto": "Receber apenas a vacina dupla adulto (dT), pois a dTpa é contraindicada na gestação."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **24 semanas** e **vacinação em gestações anteriores** são os dados-chave: o Programa Nacional de Imunizações recomenda **uma dose de dTpa a cada gestação, a partir da 20ª semana**, independentemente de doses anteriores, porque os anticorpos maternos IgG atravessam a placenta e protegem o lactente nos primeiros meses, até que possa receber o esquema primário (a partir de 2 meses), e esses anticorpos declinam rapidamente após cada gestação. Como a paciente tem 24 semanas, a vacina deve ser aplicada agora. A (somente após a 32ª semana, com intervalo de 5 anos) está incorreta: não há intervalo mínimo entre gestações e a vacinação não precisa ser adiada, pois iniciar a partir da 20ª semana amplia a janela de vacinação e protege também em caso de parto prematuro. B (já está imune) é incorreta porque a imunidade não é suficiente para o novo feto. D (apenas dT) está errada: a dTpa é segura e recomendada na gestação, enquanto a dT apenas protege contra tétano e difteria.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde. Calendário Nacional de Vacinação e Manual de Normas e Procedimentos para Vacinação; SBIm. Calendário de vacinação da gestante; ACIP/CDC (Tdap em cada gestação).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q55 da UNIFESP 2024
{
  "id": "q-adap24-073",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-obstetricia",
  "assuntoId": "ass-sangramentos",
  "enunciado": "Puérpera, com parto vaginal a termo de recém-nascido de 4.200 g, apresentou sangramento vaginal intenso logo após a dequitação. A monitorização mostrou pulso de 120 bpm e pressão arterial de 85 x 55 mmHg, com pele fria e sudoreica. Houve redução do sangramento 8 minutos após ocitocina endovenosa e ergometrina intramuscular. O peso líquido das compressas ao final do atendimento foi de 400 g. A enfermeira acionou corretamente o código de hemorragia pós-parto, porque:",
  "alternativas": [
    {
      "id": "A",
      "texto": "O peso líquido das compressas superou 500 g, limite que define hemorragia pós-parto e obriga a acionar o código."
    },
    {
      "id": "B",
      "texto": "O recém-nascido era macrossômico (4.200 g), fator de risco para atonia que por si só determina o acionamento do código de hemorragia."
    },
    {
      "id": "C",
      "texto": "Os sinais de choque associados ao sangramento são critério de gravidade, que aciona o protocolo mesmo com perda abaixo de 500 mL."
    },
    {
      "id": "D",
      "texto": "O sangramento só foi controlado após o quinto minuto da administração do uterotônico, indicando refratariedade."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **pulso de 120 bpm, pressão de 85 x 55 mmHg, pele fria e sudoreica** indicam repercussão hemodinâmica (choque). Nos protocolos de hemorragia pós-parto, a presença de **instabilidade hemodinâmica ou de sinais de hipovolemia** associada ao sangramento é critério de gravidade e aciona o código, mesmo quando a perda estimada ainda não atingiu o limite numérico, porque a estimativa visual e o peso das compressas subestimam a perda real. O peso líquido de **400 g** (cerca de 400 mL) está abaixo do limite de 500 mL. A (peso acima de 500 g) é falsa pelo enunciado. B (macrossomia) é fator de risco para atonia uterina, mas não é critério de acionamento do código. D (controle após o quinto minuto) não é critério de código; a resposta lenta ao uterotônico indica refratariedade e já exigiria escalonar as medidas, mas não é o critério de acionamento.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde / Organização Pan-Americana da Saúde, Zero Morte Materna por Hemorragia; FEBRASGO, Manual de hemorragia pós-parto; WHO recommendations for the prevention and treatment of postpartum haemorrhage, 2023; ACOG Practice Bulletin 183.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q58 da UNIFESP 2024
{
  "id": "q-adap24-074",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-obstetricia",
  "assuntoId": "ass-trabalhoparto",
  "enunciado": "De acordo com a Diretriz Nacional de Assistência ao Parto Normal do Ministério da Saúde (CONITEC, 2017), qual das alternativas é correta quanto ao manejo do primeiro período do parto em parturientes saudáveis e de risco habitual?",
  "alternativas": [
    {
      "id": "A",
      "texto": "A amniotomia, com ou sem ocitocina, é indicada na falha de progressão do primeiro período, após informar a mulher sobre benefícios e riscos."
    },
    {
      "id": "B",
      "texto": "O uso de ocitocina é recomendado de rotina para prevenir atraso do trabalho de parto em mulheres sob analgesia peridural, desde a admissão."
    },
    {
      "id": "C",
      "texto": "O exame pélvico digital deve ser realizado a cada 2 horas para avaliação da progressão do trabalho de parto, registrando-se o resultado no partograma."
    },
    {
      "id": "D",
      "texto": "A cardiotocografia deve ser oferecida de rotina na admissão para avaliar o bem-estar fetal, mesmo em gestação de risco habitual."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **diretriz nacional de assistência ao parto normal, parturiente saudável de risco habitual** remetem à recomendação de **não realizar amniotomia de rotina**, mas oferecê-la, com ocitocina ou não, quando há **falha de progressão** do primeiro período, depois de explicar benefícios e riscos. B (ocitocina de rotina com peridural) contraria a diretriz, que recomenda não usar ocitocina para prevenção de atraso em mulheres com peridural, reservando-a para tratamento de atraso. C (toque vaginal a cada 2 horas) está incorreto: o intervalo recomendado é de 4 horas, evitando toques excessivos que aumentam desconforto e risco de infecção. D (cardiotocografia de rotina na admissão) contraria a diretriz: em gestantes de risco habitual, a ausculta intermitente com sonar Doppler ou Pinard é suficiente, e a cardiotocografia de admissão aumenta intervenções sem melhora de desfechos.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde / CONITEC. Diretriz Nacional de Assistência ao Parto Normal, 2017; WHO recommendations: intrapartum care for a positive childbirth experience, 2018; NICE NG235 (2023).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q59 da UNIFESP 2024
{
  "id": "q-adap24-075",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-obstetricia",
  "assuntoId": "ass-trabalhoparto",
  "enunciado": "Primigesta de 15 anos de idade, estatura de 1,48 m, com gestação de 40 semanas e feto estimado em 3.900 g. Está em período expulsivo há 3 horas, sem progressão do polo cefálico. Ao toque vaginal, o obstetra nota bossa serossanguínea volumosa e cavalgamento das suturas dos ossos do crânio fetal. Esses achados são mais frequentemente encontrados em qual situação?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Cranioestenose."
    },
    {
      "id": "B",
      "texto": "Desproporção cefalopélvica."
    },
    {
      "id": "C",
      "texto": "Apresentação cefálica defletida de 2º grau (face)."
    },
    {
      "id": "D",
      "texto": "Assinclitismo posterior sem desproporção."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **primigesta adolescente de baixa estatura, feto de 3.900 g, expulsivo prolongado sem progressão** com **bossa serossanguínea volumosa e cavalgamento das suturas** caracterizam desproporção cefalopélvica: a pressão prolongada do polo cefálico contra a pelve estreita gera edema do couro cabeludo (bossa) e a moldagem exagerada dos ossos do crânio (cavalgamento). Esses sinais, associados à parada de progressão, indicam avaliação para cesariana. A (cranioestenose) é fusão precoce das suturas, de modo que não há cavalgamento, e sim ausência de mobilidade. C (cefálica defletida de 2º grau, ou face) tem como achado ao toque a palpação de mento, boca e nariz, com bossa de face, e não cavalgamento. D (assinclitismo posterior sem desproporção) pode ocorrer em partos normais, e a correção do polo cefálico é esperada sem moldagem exagerada nem bossa volumosa.",
  "explicacoesAlternativas": {},
  "referencias": "FEBRASGO, Tratado de Obstetrícia; Ministério da Saúde, Diretriz Nacional de Assistência ao Parto Normal, 2017; Cunningham FG et al., Williams Obstetrics (distocia e desproporção cefalopélvica).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q61 da UNIFESP 2024
{
  "id": "q-adap24-076",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-obstetricia",
  "assuntoId": "ass-prenatal",
  "enunciado": "Gestante de 34 semanas apresenta sorologia colhida há 2 semanas com IgM e IgG positivos para citomegalovírus, com teste de avidez de IgG de alta avidez. Referia quadro gripal há cerca de 1 mês, com febre baixa, mialgia e cefaleia. A sorologia no início do pré-natal, realizada no 2º trimestre, mostrava IgG positivo e IgM negativo. O ultrassom obstétrico atual é normal. Qual é a conduta mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Amniocentese para pesquisa do DNA viral no líquido amniótico, para confirmar a infecção fetal e definir o prognóstico antes do parto."
    },
    {
      "id": "B",
      "texto": "Prescrição de valaciclovir em altas doses, para reduzir a transmissão vertical e as sequelas fetais."
    },
    {
      "id": "C",
      "texto": "Conduta expectante, com ultrassonografia de rotina e acompanhamento do recém-nascido, sem investigação invasiva nem antiviral."
    },
    {
      "id": "D",
      "texto": "Ressonância magnética fetal para pesquisa de calcificações cerebrais e de alterações do desenvolvimento cortical."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **IgG positivo e IgM negativo no 2º trimestre** mostram que a gestante já era imune antes da gravidez; o IgM positivo atual, com **IgG de alta avidez**, é compatível com reativação ou reinfecção (infecção não primária) ou IgM persistente, e não com soroconversão recente. Nesses casos o risco de transmissão e de sequelas é baixo, e **ultrassonografia sem alterações** reforça o bom prognóstico. A conduta é expectante, com ultrassonografia de rotina e comunicação à equipe pediátrica para avaliação do recém-nascido se houver indicação. A (amniocentese) é indicada em infecção primária confirmada ou alterações ultrassonográficas, idealmente após 21 semanas e 6 a 8 semanas da infecção, o que não é o caso. B (valaciclovir) é tratamento experimental, restrito a protocolos em infecção primária com feto infectado, e não é recomendado na infecção não primária. D (ressonância magnética fetal) é exame complementar para casos com alteração ultrassonográfica e não é indicado na ausência de achados.",
  "explicacoesAlternativas": {},
  "referencias": "ACOG Practice Bulletin 151, Cytomegalovirus, Parvovirus B19, Varicella Zoster, and Toxoplasmosis in Pregnancy; SMFM Consult Series 2020; SOGC Guideline 2017 sobre infecção por CMV; FEBRASGO, Infecções na gestação.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q66 da UNIFESP 2024
{
  "id": "q-adap24-077",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-obstetricia",
  "assuntoId": "ass-abortamento",
  "enunciado": "Mulher adulta, com 9 semanas de gestação, relata ter engravidado em decorrência de violência sexual e solicita a interrupção da gestação, mas ainda não registrou boletim de ocorrência. Segundo a legislação e as normas técnicas do Ministério da Saúde, para que o abortamento seja realizado no serviço de saúde, o que é exigido da mulher?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Boletim de ocorrência e laudo do Instituto Médico Legal, para comprovar a violência antes do procedimento."
    },
    {
      "id": "B",
      "texto": "Termo de consentimento da mulher, sem exigência de boletim de ocorrência, laudo pericial ou autorização judicial."
    },
    {
      "id": "C",
      "texto": "Autorização judicial prévia, pois o médico não pode decidir sem ordem do juiz nem presumir a veracidade do relato."
    },
    {
      "id": "D",
      "texto": "Boletim de ocorrência e termo de consentimento, com autorização do Ministério Público, por se tratar de aborto previsto em lei."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **gravidez resultante de estupro** enquadra-se no art. 128, II do Código Penal, que **não exige** boletim de ocorrência, laudo do IML nem autorização judicial; a lei exige apenas o **consentimento da gestante** (ou de seu representante legal, se incapaz). A palavra da mulher goza de presunção de veracidade, e o profissional que realiza o procedimento não incorre em crime nem precisa provar o estupro. O atendimento deve ser acolhedor, com consentimento livre e esclarecido por escrito, sem a exigência de registro prévio da ocorrência, que a vítima pode fazer se desejar. A (boletim de ocorrência e laudo do IML) cria exigência não prevista em lei e atrasa o procedimento. C (autorização judicial) não é exigida pela lei nem pelas normas do Ministério da Saúde. D (boletim de ocorrência e autorização do Ministério Público) também cria exigências sem previsão legal.",
  "explicacoesAlternativas": {},
  "referencias": "Código Penal, art. 128, II e art. 213; Ministério da Saúde, Atenção humanizada ao abortamento: norma técnica e Prevenção e tratamento dos agravos resultantes da violência sexual contra mulheres e adolescentes: norma técnica; Anuário Brasileiro de Segurança Pública.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q69 da UNIFESP 2024
{
  "id": "q-adap24-078",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-desenhosestudo",
  "enunciado": "Considere os três estudos fictícios abaixo (I, II e III), realizados em adultos com o mesmo risco cardiovascular (os resultados de cada um estão na figura): I. Estudo transversal, em que o consumo de alimentos ricos em betacaroteno associou-se de forma inversa à ocorrência de evento cardiovascular. II. Estudo de coorte, com 20 mil pessoas acompanhadas por 15 anos, em que o consumo de alimentos ricos em betacaroteno teve associação inversa com a incidência de evento cardiovascular. III. Com base nesses estudos, realizou-se ensaio clínico randomizado em que os participantes receberam extrato de betacaroteno ou placebo, evidenciando maior incidência de eventos cardiovasculares no grupo que recebeu betacaroteno em comparação ao placebo. Com relação à recomendação do uso de betacaroteno como medida preventiva para evento cardiovascular, qual é a alternativa correta?",
  "imagemUrl": "dados/imagens/q-adap24-078.png",
  "imagemLegenda": "Resultado dos três estudos (dados fictícios).",
  "alternativas": [
    {
      "id": "A",
      "texto": "Como os estudos I e II mostram associação inversa consistente, a recomendação de suplementar betacaroteno deve se basear neles."
    },
    {
      "id": "B",
      "texto": "O ensaio clínico randomizado (III) tem maior validade interna e demonstra dano; o betacaroteno não deve ser recomendado na prevenção."
    },
    {
      "id": "C",
      "texto": "Nenhum dos estudos apresentou estimativa estatisticamente significativa, de modo que a hipótese nula deve ser mantida nos três."
    },
    {
      "id": "D",
      "texto": "A divergência entre os estudos impede qualquer recomendação, devendo-se aguardar nova meta-análise antes de decidir."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado e da figura: **o estudo III é um ensaio clínico randomizado** com placebo, delineamento que, ao distribuir aleatoriamente os participantes, controla variáveis de confusão conhecidas e desconhecidas e oferece maior validade interna para inferir causalidade; ele mostrou **risco aumentado de eventos (RR = 1,58; IC95% 1,10-3,45, que não inclui 1)**. Os estudos I e II são observacionais e a associação inversa pode refletir o efeito de dieta rica em frutas e vegetais ou estilo de vida saudável (confusão residual), e não do betacaroteno isolado, e o transversal ainda não estabelece temporalidade. Esse achado é coerente com ensaios reais (ATBC e CARET), em que suplementação com betacaroteno aumentou câncer de pulmão em tabagistas. A (basear-se nos estudos observacionais) ignora o ensaio, de maior nível de evidência. C (nenhum significativo) é falsa: os três intervalos de confiança excluem a unidade. D (impede recomendação) é incorreta: a divergência é explicada pelo delineamento e a evidência de maior qualidade é clara.",
  "explicacoesAlternativas": {},
  "referencias": "Fletcher RH, Epidemiologia Clínica (hierarquia de evidências); Oxford CEBM Levels of Evidence; ATBC Cancer Prevention Study Group, N Engl J Med 1994; Omenn GS et al. (CARET), N Engl J Med 1996; USPSTF, suplementos vitamínicos para prevenção de doença cardiovascular.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q70 da UNIFESP 2024
{
  "id": "q-adap24-079",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-medidasepi",
  "enunciado": "Doença crônica, sem cura, tem prevalência estimada de 10% na população brasileira adulta. O Sistema Único de Saúde incorpora uma nova terapia com eficácia de 70% na redução da mortalidade por essa doença, sem efeito sobre a ocorrência de novos casos nem sobre a cura. Considerando os indicadores de ocorrência da doença na população, assinale a alternativa correta sobre o primeiro impacto esperado com a introdução da nova terapia.",
  "alternativas": [
    {
      "id": "A",
      "texto": "A prevalência deve diminuir, pois menos pessoas morrerão pela doença e o total de doentes cairá."
    },
    {
      "id": "B",
      "texto": "A incidência deve diminuir, pois a terapia reduz o número de doentes."
    },
    {
      "id": "C",
      "texto": "A prevalência deve aumentar, pois os pacientes passam a viver mais tempo com a doença."
    },
    {
      "id": "D",
      "texto": "A incidência deve aumentar, pois a maior sobrevida produz mais casos novos da doença na população."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **doença crônica sem cura** e **terapia que reduz mortalidade, mas não previne nem cura** indicam aumento da duração média da doença. A prevalência é aproximadamente o produto da incidência pela duração média (P ≈ I × D); como a incidência não é alterada e a duração aumenta, a **prevalência tende a aumentar** (mais pessoas vivas com a doença). Esse é o chamado paradoxo da melhora do tratamento: indicadores de ocorrência aumentam mesmo com benefício clínico. A (prevalência diminuiria) ocorreria se a terapia curasse ou aumentasse a mortalidade. B (incidência diminuiria) exigiria medida preventiva, que não é o caso. D (incidência aumentaria) é incorreto: a incidência mede casos novos e não depende de sobrevida.",
  "explicacoesAlternativas": {},
  "referencias": "Rothman KJ, Epidemiologia Moderna; Medronho RA, Epidemiologia; Gordis L, Epidemiology (relação entre incidência, prevalência e duração).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q71 da UNIFESP 2024
{
  "id": "q-adap24-080",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-desenhosestudo",
  "enunciado": "Um programa de rastreamento populacional de câncer (por exemplo, o rastreamento mamográfico bienal de mulheres de 50 a 69 anos, recomendado pelo Ministério da Saúde) pode parecer muito eficaz, mas esse achado pode ser apenas produto de vieses que afetam a validade das conclusões. Sabendo disso, qual é a alternativa correta?",
  "alternativas": [
    {
      "id": "A",
      "texto": "A taxa de mortalidade específica pelo câncer, por faixa etária, é uma maneira enviesada de avaliar a efetividade do rastreamento, por sofrer viés de tempo de antecipação."
    },
    {
      "id": "B",
      "texto": "Comparar a sobrevida após o diagnóstico em rastreados e não rastreados é a melhor maneira de demonstrar a utilidade do rastreamento em saúde pública."
    },
    {
      "id": "C",
      "texto": "A maior taxa de incidência do câncer na população rastreada, em relação à não rastreada, prova a validade e a eficácia do teste de rastreamento."
    },
    {
      "id": "D",
      "texto": "Os cânceres detectados no rastreamento podem ser de crescimento mais lento que os detectados por sintomas, o que superestima o benefício (viés de duração)."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **vieses que afetam a validade das conclusões em rastreamento** remetem aos vieses de antecipação, de duração e de sobrediagnóstico. Tumores de crescimento lento têm maior probabilidade de ser captados pelo teste, pois permanecem mais tempo na fase pré-clínica detectável, e costumam ter melhor prognóstico, o que faz o rastreamento parecer mais eficaz do que é (viés de duração, ou length-time bias). A (mortalidade específica enviesada) é incorreta: a mortalidade pela doença é o desfecho menos sujeito a vieses de antecipação e de duração e é a medida preferida; o viés de tempo de antecipação afeta a sobrevida, não a mortalidade. B (sobrevida) é incorreta: a sobrevida após o diagnóstico é inflada pelo diagnóstico antecipado, mesmo sem alterar a data da morte. C (maior incidência) é incorreta: a incidência maior em rastreados reflete detecção de casos que, em parte, nunca causariam sintomas (sobrediagnóstico), e não eficácia.",
  "explicacoesAlternativas": {},
  "referencias": "Gordis L, Epidemiology (viés de antecipação e de duração); Medronho RA, Epidemiologia; INCA, Diretrizes para a detecção precoce do câncer de mama no Brasil, 2015.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q72 da UNIFESP 2024
{
  "id": "q-adap24-081",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-bioestatistica",
  "enunciado": "Para verificar a correlação entre a TMI e o percentual de unidades de saúde com bom desempenho na avaliação do Programa Nacional de Melhoria do Acesso e da Qualidade da Atenção Básica (%PMAQ) nos estados brasileiros, calculou-se o coeficiente de correlação de Pearson, que resultou em −0,534 (p-valor = 0,005). Com base nessas informações, qual é a afirmativa correta?",
  "imagemUrl": "dados/imagens/q-adap24-081.png",
  "imagemLegenda": "Diagrama de dispersão com os 27 estados (dados fictícios).",
  "alternativas": [
    {
      "id": "A",
      "texto": "Estados com TMI mais altas tendem a ter %PMAQ menores, ao nível de confiança de 5%, segundo o coeficiente."
    },
    {
      "id": "B",
      "texto": "Estados com TMI mais altas tendem a ter %PMAQ maiores, ao nível de significância de 5%, pois o coeficiente é significativo."
    },
    {
      "id": "C",
      "texto": "Estados com TMI mais altas tendem a ter %PMAQ menores, ao nível de significância de 5%."
    },
    {
      "id": "D",
      "texto": "O desempenho no PMAQ causa a redução da TMI, ao nível de significância de 5%, pois a correlação é forte."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **coeficiente de Pearson de −0,534** indica correlação **negativa** de intensidade moderada (sentidos opostos: quanto maior a TMI, menor o %PMAQ), e **p = 0,005** é menor que 0,05, portanto estatisticamente significante **ao nível de significância de 5%** (alfa). A (nível de confiança de 5%) usa o termo errado: o nível de confiança é complementar (95%); 5% é o nível de significância (alfa). B (%PMAQ maiores) inverte o sinal: um r negativo significa que as variáveis variam em sentidos opostos. D (relação causal) é incorreta, pois correlação, especialmente em dados ecológicos agregados por estado, não demonstra causalidade e está sujeita à falácia ecológica e a fatores de confusão, como renda e saneamento.",
  "explicacoesAlternativas": {},
  "referencias": "Vieira S, Introdução à Bioestatística; Medronho RA, Epidemiologia (correlação e estudos ecológicos); Ministério da Saúde, PMAQ-AB.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q74 da UNIFESP 2024
{
  "id": "q-adap24-082",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-bioestatistica",
  "enunciado": "Uma revisão sistemática investigou a associação entre o consumo diário de mais de duas porções de bebida adoçada e mortalidade, evidenciando risco relativo de 1,31 e intervalo de confiança de 95% de 1,15 a 1,50, em comparação com o grupo de referência. Com base nesse resultado, qual é a alternativa correta?",
  "alternativas": [
    {
      "id": "A",
      "texto": "O risco de morte aumentou 31% a cada porção adicional consumida, de forma linear e dose-dependente."
    },
    {
      "id": "B",
      "texto": "O risco de morte foi 31% maior entre quem consumiu mais de duas porções diárias, e a associação é estatisticamente significante."
    },
    {
      "id": "C",
      "texto": "O risco de morte aumentou em 50% entre aqueles que consumiram mais de duas porções diárias, conforme o limite superior do intervalo."
    },
    {
      "id": "D",
      "texto": "O risco de morte não foi associado ao consumo de bebida adoçada, pois o intervalo de confiança é amplo, o que impede qualquer conclusão."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **RR = 1,31** significa risco 31% maior (1,31 − 1 = 0,31) no grupo exposto em relação ao grupo de referência, e **IC95% de 1,15 a 1,50 não inclui o valor 1**, o que indica associação estatisticamente significante ao nível de 5%. A (a cada porção, de forma linear) extrapola: o RR refere-se à categoria ‘mais de duas porções’, e a relação dose-resposta não foi informada. C (aumento de 50%) confunde o limite superior do intervalo de confiança com a estimativa pontual; 1,50 é apenas o limite superior plausível. D (sem associação) é incorreto: o intervalo, embora tenha amplitude, não contém o valor nulo (1). Associação não prova causalidade, e fatores de confusão devem ser considerados.",
  "explicacoesAlternativas": {},
  "referencias": "Fletcher RH, Epidemiologia Clínica (interpretação de risco relativo e intervalo de confiança); Medronho RA, Epidemiologia; IBGE, Pesquisa Nacional de Saúde.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q75 da UNIFESP 2024
{
  "id": "q-adap24-083",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-medidasepi",
  "enunciado": "Em um determinado município, no ano de 2021, a população estimada era de 100.000 homens e 100.000 mulheres. Nesse ano, ocorreram 1.000 óbitos entre os homens (310 por doenças do aparelho circulatório, DAC) e 700 óbitos entre as mulheres (260 por DAC). A partir desses dados, qual é a alternativa correta?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Os homens têm maior risco de morrer por DAC, pois o coeficiente de mortalidade específico por DAC é maior neles (310 contra 260 por 100.000)."
    },
    {
      "id": "B",
      "texto": "As mulheres têm maior risco de morrer por DAC, pois a mortalidade proporcional por DAC é maior entre elas (37% contra 31%), embora tenham menos óbitos."
    },
    {
      "id": "C",
      "texto": "Os homens têm menor risco de morrer por DAC, pois a mortalidade proporcional por DAC é menor entre eles."
    },
    {
      "id": "D",
      "texto": "O risco de morrer por DAC é igual nos dois sexos, pois os números absolutos de óbitos são semelhantes."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **populações do mesmo tamanho (100.000 em cada sexo)** permitem comparar diretamente o risco: o coeficiente de mortalidade específico por DAC é 310/100.000 nos homens e 260/100.000 nas mulheres, maior entre os homens. A **mortalidade proporcional** (310/1.000 = 31% nos homens e 260/700 = 37% nas mulheres) mede a participação das DAC nos óbitos, e não o risco de morrer pela doença: é maior nas mulheres porque o total de óbitos delas é menor (denominador menor). B e C usam a mortalidade proporcional como medida de risco, o que é erro conceitual: a proporção depende do número de óbitos por outras causas. D (risco igual) é incorreta: números absolutos diferentes (310 e 260) com populações iguais indicam coeficientes diferentes.",
  "explicacoesAlternativas": {},
  "referencias": "Medronho RA, Epidemiologia (coeficientes de mortalidade e mortalidade proporcional); Rouquayrol, Epidemiologia e Saúde; Ministério da Saúde, SIM/DataSUS.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q77 da UNIFESP 2024
{
  "id": "q-adap24-084",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-desenhosestudo",
  "enunciado": "Um gestor de uma rede de atenção primária quer conhecer o nível de satisfação dos usuários com os serviços prestados. Sabe que precisa entrevistar pelo menos 250 usuários para estimar, com margem de erro de 3%, a proporção de insatisfeitos, e dispõe do cadastro nominal de todos os usuários da rede. Qual dos seguintes planos de amostragem permite generalizar os resultados da pesquisa para todos os usuários?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Organizar um evento de promoção de saúde, convidar todos os usuários e selecionar 250 entre os que comparecerem, por ordem de chegada."
    },
    {
      "id": "B",
      "texto": "Enviar questionário por aplicativo de mensagem a todos os usuários e considerar os primeiros 250 que responderem."
    },
    {
      "id": "C",
      "texto": "Entrevistar os primeiros 250 usuários que comparecerem à unidade em um dia sorteado."
    },
    {
      "id": "D",
      "texto": "Sortear aleatoriamente 250 usuários do cadastro, enviar o questionário e fazer busca ativa dos que não responderem."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **existência de cadastro nominal (cadastro amostral)** e desejo de **generalizar** resultados indicam amostragem probabilística: o sorteio aleatório a partir do cadastro dá a cada usuário probabilidade conhecida de seleção, e a **busca ativa dos não respondentes** reduz o viés de não resposta. A (convidar e sortear entre os presentes) é amostra de conveniência: quem comparece a um evento de saúde difere dos demais (viés de seleção). B (primeiros 250 que responderem) é autosseleção: respondem os mais motivados ou com acesso ao aplicativo. C (primeiros 250 que comparecem em um dia) sorteia o dia, mas não os usuários, e inclui sobretudo os que mais frequentam o serviço, que tendem a ser os mais doentes ou mais satisfeitos.",
  "explicacoesAlternativas": {},
  "referencias": "Medronho RA, Epidemiologia (amostragem e vieses de seleção); Vieira S, Introdução à Bioestatística; Gordis L, Epidemiology.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q78 da UNIFESP 2024
{
  "id": "q-adap24-085",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-mps",
  "especialidadeId": "esp-epidemio",
  "assuntoId": "ass-vigilanciasanitaria",
  "enunciado": "A notificação compulsória é um dos pilares da vigilância epidemiológica no Brasil e alimenta os sistemas de informação que orientam a resposta a surtos e epidemias, como a dengue, a sífilis e a tuberculose. Em relação à notificação compulsória de doenças, agravos e eventos de saúde pública, assinale a alternativa correta.",
  "alternativas": [
    {
      "id": "A",
      "texto": "É ato privativo do médico, que deve emiti-lo apenas após a confirmação laboratorial do diagnóstico clínico ou epidemiológico."
    },
    {
      "id": "B",
      "texto": "Baseia-se em uma lista nacional, que estados e municípios podem ampliar conforme o perfil epidemiológico local."
    },
    {
      "id": "C",
      "texto": "A obrigatoriedade aplica-se a cidadãos brasileiros, sendo facultativa no caso de pacientes estrangeiros ou em trânsito pelo país."
    },
    {
      "id": "D",
      "texto": "A notificação deve aguardar o resultado de exame laboratorial confirmatório, para evitar registros de casos que não sejam verdadeiros."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **vigilância epidemiológica e perfil local** remetem à regra da Lista Nacional de Notificação Compulsória (Portaria de Consolidação GM/MS nº 4/2017, Anexo V, atualizada por portarias posteriores): estados e municípios podem **incluir outras doenças e agravos** conforme seu perfil epidemiológico, de forma complementar à lista nacional. A (privativo do médico, só após confirmação) é incorreta: a obrigação é de médicos e de outros profissionais de saúde, além de responsáveis por serviços de saúde, e a notificação é feita diante da suspeita, sem aguardar confirmação. C (só cidadãos brasileiros) é incorreta: a obrigação se aplica a qualquer pessoa atendida em território nacional, inclusive estrangeiros. D (aguardar confirmação) contraria a oportunidade da vigilância, que exige notificação na suspeita, pois o atraso retarda o controle de surtos; o caso é depois confirmado ou descartado no Sinan.",
  "explicacoesAlternativas": {},
  "referencias": "Lei 6.259/1975; Portaria de Consolidação GM/MS nº 4/2017, Anexo V (Lista Nacional de Notificação Compulsória, atualizada por portarias posteriores; consultar a versão vigente); Ministério da Saúde, Guia de Vigilância em Saúde.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q80 da UNIFESP 2024
{
  "id": "q-adap24-086",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-planfamiliar",
  "assuntoId": "ass-contracepcao",
  "enunciado": "Mulher, 23 anos de idade, casada, sem filhos, procura a UBS em busca de método contraceptivo. Depois de ser informada sobre todos os métodos possíveis, inclusive os reversíveis de longa duração, opta de forma firme pela laqueadura tubária. Segundo a Lei nº 14.443, de 2 de setembro de 2022, que alterou a Lei nº 9.263/1996 sobre planejamento familiar, qual é a alternativa correta?",
  "alternativas": [
    {
      "id": "A",
      "texto": "O procedimento pode ser realizado, pois a paciente tem 23 anos, sem autorização do cônjuge e respeitado o prazo de 60 dias após a manifestação da vontade."
    },
    {
      "id": "B",
      "texto": "O procedimento só pode ser realizado com autorização escrita do cônjuge, que deve assinar o termo de consentimento."
    },
    {
      "id": "C",
      "texto": "O procedimento só poderia ser realizado se a paciente tivesse ao menos um filho vivo, independentemente da idade."
    },
    {
      "id": "D",
      "texto": "O procedimento só poderia ser realizado se a paciente tivesse ao menos dois filhos vivos, independentemente da idade, e com aval do cônjuge."
    }
  ],
  "gabarito": "A",
  "explicacaoGeral": "A alternativa A está correta. Dicas do enunciado: **idade de 23 anos, casada, sem filhos, opção firme após aconselhamento** são o cenário contemplado pela Lei nº 14.443/2022: a esterilização voluntária é permitida a **homens e mulheres com capacidade civil plena e maiores de 21 anos, ou com pelo menos dois filhos vivos**, observado o **prazo mínimo de 60 dias** entre a manifestação da vontade e o ato cirúrgico, período em que há acesso a serviço de regulação da fecundidade; **a lei suprimiu a exigência de consentimento do cônjuge**. B (autorização do cônjuge) era exigida pela redação anterior e foi revogada. C e D (número mínimo de filhos) são incorretas: o critério de pelo menos dois filhos é alternativo à idade de 21 anos, não cumulativo, de modo que a paciente de 23 anos pode ser esterilizada mesmo sem filhos.",
  "explicacoesAlternativas": {},
  "referencias": "Lei nº 14.443/2022, que altera a Lei nº 9.263/1996 (planejamento familiar); Ministério da Saúde, Planejamento familiar: manual para o gestor e Cadernos de Atenção Básica; FEBRASGO, Manual de anticoncepção.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q81 da UNIFESP 2024
{
  "id": "q-adap24-087",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-neuro",
  "assuntoId": "ass-neuro-movimento",
  "enunciado": "Homem, 68 anos de idade, com história familiar de tremor (o pai tinha ‘mão tremida’), queixa-se de piora de tremor de longa data nas mãos, atualmente com impacto social: deixou de frequentar a padaria para tomar café por comentários jocosos de que estaria de ressaca. Observa que o tremor melhora após ingerir álcool. O tremor ocorre ao segurar a xícara e ao escrever, e não em repouso; não há bradicinesia, rigidez nem outras alterações neurológicas. Qual é o diagnóstico mais provável e a investigação e conduta mais adequadas?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Tremor fisiológico exacerbado; investigar função tireoidiana e uso de fármacos; evitar cafeína e privação de sono."
    },
    {
      "id": "B",
      "texto": "Doença de Parkinson; eletroneuromiografia para confirmar o diagnóstico; levodopa com reavaliação em 3 meses."
    },
    {
      "id": "C",
      "texto": "Tremor essencial; investigação complementar desnecessária, pois o diagnóstico é clínico; propranolol."
    },
    {
      "id": "D",
      "texto": "Esclerose múltipla; ressonância magnética de crânio; terapêutica conforme resultado e avaliação do neurologista."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **tremor postural e de ação (ao segurar a xícara e escrever), bilateral, de longa data, com história familiar e melhora com álcool**, sem sinais parkinsonianos, caracterizam o tremor essencial, cujo diagnóstico é clínico e, na ausência de sinais atípicos, dispensa exames. O tratamento de primeira linha é o **propranolol** (ou primidona), com resposta em cerca de metade dos casos. A (tremor fisiológico exacerbado) ocorre em estados como hipertireoidismo, ansiedade e cafeína, mas não explica o tremor antigo, familiar e com melhora pelo álcool. B (Parkinson) cursa com tremor de repouso, bradicinesia e rigidez, e a eletroneuromiografia não faz parte do diagnóstico; levodopa não é indicada ao tremor essencial. D (esclerose múltipla) é improvável em homem de 68 anos com tremor de longa data sem outros déficits, e a ressonância não é necessária.",
  "explicacoesAlternativas": {},
  "referencias": "Consensus Statement of the Movement Disorder Society on Tremor, 2018; AAN, Practice parameter: therapies for essential tremor, 2011; Sociedade Brasileira de Neurologia, Diretrizes de distúrbios do movimento.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q83 da UNIFESP 2024
{
  "id": "q-adap24-088",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-ped",
  "especialidadeId": "esp-neonato",
  "assuntoId": "ass-neo-infeccoescongenitas",
  "enunciado": "Recém-nascido a termo, no primeiro dia de vida, filho de mãe com sífilis que iniciou tratamento com penicilina benzatina há duas semanas. Exame físico sem alterações. VDRL materno e do recém-nascido, colhidos no parto, ambos com título 1:4. Radiografia de ossos longos e hemograma normais. Não foi possível coletar líquor. Considerando que a criança poderá ser acompanhada de forma adequada, que tratamento deve ser instituído?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Penicilina G benzatina, em dose única intramuscular."
    },
    {
      "id": "B",
      "texto": "Penicilina G cristalina, por 10 dias, endovenosa."
    },
    {
      "id": "C",
      "texto": "Ceftriaxona endovenosa, por 10 dias, no lugar da penicilina."
    },
    {
      "id": "D",
      "texto": "Nenhum tratamento, apenas seguimento com VDRL."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **tratamento materno iniciado há apenas duas semanas** (menos de 30 dias antes do parto) é considerado inadequado, e **VDRL reagente no recém-nascido** configura caso de sífilis congênita. Como **não foi possível colher o líquor**, não se pode excluir neurossífilis, e o tratamento recomendado pelo Ministério da Saúde é a **penicilina G cristalina por 10 dias**, que atinge níveis treponemicidas no líquor. A (benzatina em dose única) é reservada a recém-nascido de mãe adequadamente tratada, ou a casos com exames normais, inclusive líquor; não alcança concentrações adequadas no sistema nervoso central. C (ceftriaxona) não é terapia padrão e fica restrita à falta de penicilina. D (sem tratamento) é incorreto, pois a mãe foi tratada de forma inadequada e a criança tem VDRL reagente.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com IST, 2022 (sífilis congênita); Ministério da Saúde, Boletim Epidemiológico de Sífilis; SBP, Diagnóstico e tratamento da sífilis congênita.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q84 da UNIFESP 2024
{
  "id": "q-adap24-089",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-ped",
  "especialidadeId": "esp-crescdesenv",
  "assuntoId": "ass-calendariovacinal",
  "enunciado": "Em qual das situações abaixo a vacina contra rotavírus é contraindicada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "História familiar de invaginação intestinal."
    },
    {
      "id": "B",
      "texto": "Prematuridade extrema, com lactente clinicamente estável."
    },
    {
      "id": "C",
      "texto": "História pessoal de invaginação intestinal."
    },
    {
      "id": "D",
      "texto": "Mãe gestante convivendo no mesmo domicílio."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: a **vacina de vírus vivo atenuado** relaciona-se a pequeno aumento do risco de invaginação intestinal, razão pela qual há contraindicação em lactentes com **história pessoal de invaginação intestinal**, malformação congênita não corrigida do trato digestivo e imunodeficiência combinada grave. A (história familiar de invaginação) não contraindica a vacina. B (prematuridade extrema) não contraindica; prematuros clinicamente estáveis devem ser vacinados dentro dos limites de idade, de acordo com a idade cronológica. D (convívio com gestante) não contraindica: o vírus vacinal excretado nas fezes não oferece risco relevante e a gestante convivente não deve ser motivo de adiamento. Os limites de idade para a primeira dose (1 mês e 15 dias a 3 meses e 15 dias) e para a segunda (3 meses e 15 dias a 7 meses e 29 dias) devem ser respeitados.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde, Manual de Normas e Procedimentos para Vacinação e Calendário Nacional de Vacinação; SBIm, Calendário de vacinação da criança; Sociedade Brasileira de Pediatria.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q85 da UNIFESP 2024
{
  "id": "q-adap24-090",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-ped",
  "especialidadeId": "esp-emergped",
  "assuntoId": "ass-emergped-maustratos",
  "enunciado": "Menino, 2 anos de idade, é levado ao pronto-socorro pela mãe após ‘acidente doméstico com água fervente’. No exame físico, qual dos achados sugere abuso físico?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Marcas de respingos distribuídas em diferentes pontos do corpo."
    },
    {
      "id": "B",
      "texto": "Lesão de profundidade não uniforme, mais profunda em alguns pontos."
    },
    {
      "id": "C",
      "texto": "Bordas bem demarcadas, em padrão de ‘luva’ ou ‘meia’, com poupança das dobras de flexão."
    },
    {
      "id": "D",
      "texto": "Lesão na face e no tronco anterior, com escorrimento em direção aos pés e ao chão."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **criança de 2 anos com queimadura atribuída a ‘acidente’** exige avaliar se o padrão da lesão é compatível com o mecanismo relatado. **Bordas bem demarcadas, em padrão de luva ou meia, de profundidade uniforme e poupando as dobras de flexão** sugerem imersão forçada em líquido quente, pois a criança em retração flexiona a articulação e protege a dobra, o que não ocorre quando o membro é mantido imerso. A (marcas de respingos) e B (profundidade não uniforme) são compatíveis com derramamento acidental, em que o líquido escorre e esfria. D (face e tronco anterior com escorrimento) também é típico de derramamento acidental, quando a criança puxa um recipiente sobre si. Diante da suspeita, notifica-se ao Conselho Tutelar e ao Sinan.",
  "explicacoesAlternativas": {},
  "referencias": "Sociedade Brasileira de Pediatria, Guia prático de atendimento a maus-tratos; Ministério da Saúde, Linha de cuidado para a atenção integral à saúde de crianças, adolescentes e suas famílias em situação de violências; Estatuto da Criança e do Adolescente, art. 13.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q88 da UNIFESP 2024
{
  "id": "q-adap24-091",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-ped",
  "especialidadeId": "esp-neonato",
  "assuntoId": "ass-neo-triagemneonatal",
  "enunciado": "Lactente, 2 meses de idade, assintomático, nascido a termo, pequeno para a idade gestacional, sem intercorrências, Apgar 9 e 10, em aleitamento artificial desde o nascimento. A mãe é portadora de fenilcetonúria clássica, diagnosticada na infância, que abandonou a dieta restritiva e não fez acompanhamento na gestação. A criança teve resultado positivo para fenilcetonúria na triagem neonatal, coletada no quarto dia de vida, que não se confirmou em duas amostras posteriores. Qual é o fator que justifica a discordância entre os resultados?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Aleitamento artificial, que eleva de forma transitória a fenilalanina sérica."
    },
    {
      "id": "B",
      "texto": "Restrição de crescimento intrauterino, que causa elevação transitória de fenilalanina por catabolismo proteico e imaturidade enzimática."
    },
    {
      "id": "C",
      "texto": "Imaturidade hepática por prematuridade, com atraso da conversão de fenilalanina em tirosina nas primeiras semanas de vida."
    },
    {
      "id": "D",
      "texto": "Hiperfenilalaninemia materna, com passagem transplacentária de fenilalanina e queda progressiva após o nascimento."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **mãe com fenilcetonúria clássica sem dieta e sem acompanhamento** e **primeira amostra positiva com normalização em duas amostras posteriores** apontam para hiperfenilalaninemia materna: o excesso de fenilalanina materno atravessa a placenta e eleva os níveis fetais e do recém-nascido, que, não sendo portador da doença (heterozigoto obrigatório), metaboliza a fenilalanina após o nascimento e normaliza os níveis, gerando resultado falso-positivo transitório. A (aleitamento artificial) fornece mais proteína, o que tende a manter a fenilalanina elevada apenas em quem tem a doença, não normalizando-a, e explicaria falso-negativo na coleta precoce, não falso-positivo transitório. B (restrição do crescimento) não eleva a fenilalanina de forma a justificar o achado. C (prematuridade) é descartada: o lactente nasceu a termo. Em todos os casos, o rastreio da mulher fenilcetonúrica deve ser lembrado, pois a síndrome da fenilcetonúria materna (microcefalia, cardiopatia, atraso) é evitável com dieta antes e durante a gestação.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde, Protocolo Clínico e Diretrizes Terapêuticas da Fenilcetonúria (Portaria SAS/MS nº 1.307/2013); Manual de Normas Técnicas e Rotinas Operacionais do Programa Nacional de Triagem Neonatal; American College of Medical Genetics, PKU diagnosis and management guideline, 2014.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q90 da UNIFESP 2024
{
  "id": "q-adap24-092",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-reumato",
  "assuntoId": "ass-reumato-febrereumatica",
  "enunciado": "Menino, 9 anos de idade, apresentou há 1 ano quadro de febre, poliartrite migratória e cardite, com velocidade de hemossedimentação (VHS) de 65 mm na primeira hora e elevação de antiestreptolisina O (ASLO), evidenciando infecção prévia por estreptococo do grupo A. Para evitar novos surtos, mantém profilaxia secundária com penicilina benzatina a cada 21 dias. Qual dos fatores abaixo define o tempo de duração da profilaxia secundária?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Extensão do comprometimento articular no primeiro surto (artrite migratória de grandes articulações)."
    },
    {
      "id": "B",
      "texto": "Presença e gravidade do comprometimento cardíaco (cardite e sequela valvar)."
    },
    {
      "id": "C",
      "texto": "Nível sérico da ASLO persistentemente elevado no seguimento clínico do paciente em profilaxia."
    },
    {
      "id": "D",
      "texto": "Valor do VHS durante o primeiro surto de febre reumática e a velocidade de normalização."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **primeiro surto com cardite** e profilaxia secundária com penicilina benzatina cada 21 dias. A duração é definida pela **presença e gravidade da cardite e da lesão valvar residual**, de acordo com a Diretriz Brasileira: sem cardite prévia, até 21 anos de idade ou 5 anos após o último surto (prevalece o que durar mais); com cardite leve e sem sequela, até 25 anos ou 10 anos após o último surto; com cardite moderada a grave, lesão valvar residual ou cirurgia valvar, até os 40 anos ou por toda a vida. A (comprometimento articular) não influencia o tempo de profilaxia, pois a artrite não deixa sequela. C (ASLO) e D (VHS) são marcadores de atividade e de infecção prévia no surto, que se normalizam, e não definem duração de profilaxia nem medem risco de recorrência.",
  "explicacoesAlternativas": {},
  "referencias": "Sociedade Brasileira de Cardiologia. Diretrizes Brasileiras para o diagnóstico, tratamento e prevenção da febre reumática, 2009; Diretriz Brasileira de Doença Valvar, 2020; AHA, Prevention of Rheumatic Fever, 2009.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q92 da UNIFESP 2024
{
  "id": "q-adap24-093",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-ped",
  "especialidadeId": "esp-neonato",
  "assuntoId": "ass-neo-triagemneonatal",
  "enunciado": "Menino, 10 dias de vida, nascido a termo sem intercorrências, em aleitamento materno exclusivo, vem à primeira consulta de puericultura. A mãe traz o resultado da triagem neonatal coletada no terceiro dia de vida (em estado cuja triagem inclui a galactosemia). A única alteração é a dosagem de galactose total de 12 mg/dL (valor de referência ≤ 9 mg/dL). Exame físico: bom estado geral, sem icterícia, sem vômitos, ganho de peso adequado, hepatomegalia ausente. Qual é a conduta mais adequada neste momento?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Suspender de imediato o leite materno e iniciar fórmula sem lactose, pois a galactosemia clássica é uma emergência neonatal."
    },
    {
      "id": "B",
      "texto": "Retirar o leite de vaca e derivados da dieta materna e manter o aleitamento, reavaliando em 30 dias."
    },
    {
      "id": "C",
      "texto": "Não solicitar novos exames, pois o recém-nascido está assintomático e o valor está próximo da referência."
    },
    {
      "id": "D",
      "texto": "Repetir a dosagem de galactose total em papel-filtro, mantendo o aleitamento e reavaliando o lactente."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **galactose total discretamente elevada (12 mg/dL), recém-nascido assintomático, sem icterícia, vômitos, hepatomegalia ou baixo ganho de peso** sugerem resultado limítrofe, que pode corresponder a falso-positivo ou a variantes leves (como a variante Duarte), e não a galactosemia clássica, em que a elevação costuma ser mais acentuada e o lactente se torna sintomático na primeira semana (recusa alimentar, vômitos, icterícia, hepatomegalia, sepse por Escherichia coli). A conduta é **repetir a dosagem em papel-filtro**, manter o aleitamento e reavaliar, com dosagem da atividade da enzima GALT se o resultado se confirmar. A (suspender o leite materno imediatamente) é a conduta se houver suspeita forte de galactosemia clássica, com sintomas ou elevação acentuada, o que não ocorre. B (retirar leite de vaca da dieta materna) não tem efeito: a galactose do leite materno vem da síntese de lactose pela mama, e não da dieta. C (nenhum exame) ignora um teste de triagem alterado, que exige confirmação. Se surgirem sintomas ou se a repetição vier muito elevada, suspende-se o leite materno de imediato e substitui-se por fórmula sem lactose enquanto se confirma o diagnóstico (dosagem da atividade da GALT).",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde, Manual de Normas Técnicas e Rotinas Operacionais do Programa Nacional de Triagem Neonatal; American College of Medical Genetics, ACT sheet para elevação de galactose total, 2014; Sociedade Brasileira de Triagem Neonatal.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q93 da UNIFESP 2024
{
  "id": "q-adap24-094",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-ped",
  "especialidadeId": "esp-crescdesenv",
  "assuntoId": "ass-puericultura",
  "enunciado": "Menina, 1 ano e 4 meses de idade, acompanhada na UBS desde o nascimento. Mãe de 28 anos, G1P1A0. Nasceu de parto normal, com 35 semanas e 2 dias e peso de 2.400 g; sem intercorrências; recebeu alta no 3º dia. Nega internações. Teve resfriados após iniciar a creche aos 9 meses. A mãe está preocupada porque acha que a criança fala poucas palavras, comparando-a com a sobrinha da mesma idade. A criança fala cerca de 20 palavras e se comunica apontando objetos, entende alguns comandos, usa a colher, tira o sapato com ajuda, não engatinhou e anda sem apoio há 1 mês. Assiste a desenhos no celular quase todos os dias, por uma hora ou mais. Qual é a avaliação do desenvolvimento e quais são as orientações à mãe?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Desenvolvimento normal; reduzir o tempo de tela para meia hora por dia, com conteúdo educativo e acompanhado pelos pais."
    },
    {
      "id": "B",
      "texto": "Desenvolvimento normal; estimular brincadeiras, leitura de histórias e convivência com outras crianças, sem telas."
    },
    {
      "id": "C",
      "texto": "Desenvolvimento de linguagem atrasado; encaminhar para fonoaudiologia e manter o celular com tempo de tela controlado e supervisionado."
    },
    {
      "id": "D",
      "texto": "Desenvolvimento motor e de linguagem atrasados; solicitar exame audiológico, avaliação neurológica e de neuropsicomotricidade."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **idade corrigida de cerca de 1 ano e 3 meses** (prematuridade de 35 semanas), **marcha independente há 1 mês, vocabulário de cerca de 20 palavras, compreensão de comandos, uso de colher e comunicação por gestos** são marcos esperados ou adiantados; o fato de não ter engatinhado é variação normal. Portanto, **desenvolvimento normal**. A orientação é estimular a linguagem (conversar, ler, cantar), brincar e conviver com outras crianças e **evitar telas antes dos 2 anos**, conforme a Sociedade Brasileira de Pediatria e a Organização Mundial da Saúde, pois o uso precoce se associa a atraso de linguagem e prejuízo de sono e atenção. A (reduzir para meia hora) mantém a exposição, contrariando a recomendação de zero tela. C (atraso de linguagem) e D (atrasos motor e de linguagem) não procedem: não há atraso, e os encaminhamentos seriam desnecessários e geradores de ansiedade.",
  "explicacoesAlternativas": {},
  "referencias": "Sociedade Brasileira de Pediatria, Manual de Orientação: Saúde de crianças e adolescentes na era digital (2019, atualizado 2024); Ministério da Saúde, Caderneta da Criança; Guia alimentar e atividade física para menores de 2 anos; OMS, Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age (2019).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q94 da UNIFESP 2024
{
  "id": "q-adap24-095",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-ped",
  "especialidadeId": "esp-neonato",
  "assuntoId": "ass-neo-exposicaotb",
  "enunciado": "Recém-nascido a termo, assintomático, filho de mãe com tuberculose pulmonar bacilífera (baciloscopia de escarro positiva), com tratamento iniciado 10 dias antes do parto. Qual é a conduta mais adequada para a criança, segundo o Ministério da Saúde?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Vacinar com BCG ao nascer e iniciar isoniazida por 3 meses, sem prova tuberculínica, mantendo o aleitamento."
    },
    {
      "id": "B",
      "texto": "Não vacinar, realizar prova tuberculínica na primeira semana e, se não reatora, aplicar BCG, sem quimioprofilaxia, apenas com seguimento clínico."
    },
    {
      "id": "C",
      "texto": "Vacinar com BCG e acompanhar mensalmente até o 6º mês, com prova tuberculínica apenas se surgirem sintomas."
    },
    {
      "id": "D",
      "texto": "Adiar a BCG; iniciar isoniazida por 3 meses e fazer prova tuberculínica: se menor que 5 mm, suspender a isoniazida e vacinar; se 5 mm ou mais, manter por 6 meses."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **mãe bacilífera com tratamento iniciado há apenas 10 dias do parto** significa que o recém-nascido tem exposição intensa e contato com caso bacilífero ainda transmissor. O Ministério da Saúde recomenda **adiar a BCG** (a isoniazida, que inativa o bacilo vacinal, é incompatível com a vacinação), iniciar **isoniazida por 3 meses** e, ao final, fazer a **prova tuberculínica**: se for **menor que 5 mm**, suspende-se a isoniazida e aplica-se a BCG; se **5 mm ou mais**, a infecção latente é tratada com manutenção da isoniazida por 6 meses no total, excluída doença ativa. A (BCG ao nascer com isoniazida) é incorreta pela inativação do bacilo vacinal e pela omissão da prova após a profilaxia. B (sem quimioprofilaxia) deixa o recém-nascido exposto sem proteção, e a prova na primeira semana é pouco confiável pela imaturidade da resposta. C (BCG e acompanhamento) desconsidera o risco de doença disseminada em lactente exposto.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde. Manual de Recomendações para o Controle da Tuberculose no Brasil (2019); Ministério da Saúde, Protocolo de vigilância da infecção latente pelo Mycobacterium tuberculosis; Sociedade Brasileira de Pediatria, Tuberculose em crianças e adolescentes.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q95 da UNIFESP 2024
{
  "id": "q-adap24-096",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-ped",
  "especialidadeId": "esp-infectoped",
  "assuntoId": "ass-dda",
  "enunciado": "Menino, 1 ano e 6 meses de idade, com esquema vacinal completo, há 2 dias iniciou vômitos e febre baixa (que cessaram) e evoluiu com diarreia, com fezes líquidas, sem sangue nem muco, cerca de 4 vezes ao dia. Exame físico: bem nutrido, bom estado geral, sem sinais de desidratação. Além de orientar a oferta de soro de reidratação oral após cada evacuação e os sinais de alerta para retorno, qual conduta é recomendada pelo Ministério da Saúde?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Oferecer dieta hipogordurosa e prescrever probiótico por 5 dias, mantendo o soro de reidratação oral."
    },
    {
      "id": "B",
      "texto": "Retirar a lactose da dieta por duas semanas e prescrever zinco oral em dose de 10 mg ao dia."
    },
    {
      "id": "C",
      "texto": "Manter a alimentação habitual e prescrever zinco oral, 20 mg/dia, por 10 dias."
    },
    {
      "id": "D",
      "texto": "Manter a alimentação habitual e prescrever racecadotrila, por 3 dias, até cessar a diarreia."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **diarreia aguda aquosa sem sangue, sem sinais de desidratação (Plano A de tratamento)** em criança de 1 ano e 6 meses. O Ministério da Saúde recomenda **aumentar a oferta de líquidos e soro de reidratação oral, manter a alimentação habitual** (inclusive o aleitamento) e **suplementar zinco**: 20 mg/dia por 10 dias em maiores de 6 meses (10 mg/dia abaixo de 6 meses), o que reduz a duração e a gravidade do episódio e o risco de nova diarreia nos meses seguintes. A (dieta hipogordurosa e probiótico) não tem respaldo: as restrições alimentares não são recomendadas e os probióticos não integram o protocolo do Ministério da Saúde. B (retirar a lactose) é indicada somente em casos selecionados de intolerância secundária persistente, e não de rotina. D (racecadotrila) é antissecretor e não faz parte do protocolo; antidiarreicos e antieméticos de rotina não são recomendados em crianças.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde. Manual de Manejo Clínico da Doença Diarreica Aguda e Plano A, B e C; OMS/UNICEF, Clinical management of acute diarrhoea; Sociedade Brasileira de Pediatria, Diarreia aguda: diagnóstico e tratamento.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q98 da UNIFESP 2024
{
  "id": "q-adap24-097",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-ped",
  "especialidadeId": "esp-crescdesenv",
  "assuntoId": "ass-crescimentopuberdade",
  "enunciado": "Menino, 13 anos de idade, nascido com peso e comprimento adequados, sem doença crônica, sem sintomas gastrintestinais e sem uso de medicação, é encaminhado ao ambulatório por déficit de crescimento. Estatura entre −1,0 e −2,0 DP, estatura-alvo entre −1,0 e 0,0 DP e idade óssea de 11 anos. Estágio puberal de Tanner P1 G1, com volume testicular de 3 mL. Cresceu 4,5 cm no último ano, e o pai relata que teve o ‘estirão’ tardio, aos 16 anos. Qual é o diagnóstico e a conduta mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Baixa estatura familiar; seguimento clínico."
    },
    {
      "id": "B",
      "texto": "Deficiência de hormônio do crescimento; reposição de hormônio do crescimento."
    },
    {
      "id": "C",
      "texto": "Baixa estatura idiopática; hormônio do crescimento."
    },
    {
      "id": "D",
      "texto": "Atraso constitucional do crescimento e da puberdade; seguimento clínico."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **idade óssea (11 anos) atrasada em 2 anos em relação à idade cronológica**, **puberdade ainda não iniciada (P1 G1, testículos de 3 mL) aos 13 anos**, **velocidade de crescimento normal pré-puberal (4,5 cm/ano)**, **estatura-alvo normal** e **história paterna de estirão tardio** caracterizam atraso constitucional do crescimento e da puberdade, variante normal em que a criança atingirá estatura adulta compatível com o alvo familiar. A conduta é seguimento clínico e tranquilização; em casos selecionados com grande sofrimento psicossocial, pode-se considerar testosterona em dose baixa por tempo curto, mas não é rotina. A (baixa estatura familiar) cursa com idade óssea compatível com a cronológica, estatura-alvo baixa e puberdade no tempo. B (deficiência de GH) cursa com velocidade de crescimento reduzida (abaixo de 4 cm/ano) e estatura muito baixa. C (baixa estatura idiopática com GH) exige descartar causas e idade óssea compatível; o hormônio de crescimento aqui não é indicado.",
  "explicacoesAlternativas": {},
  "referencias": "Sociedade Brasileira de Endocrinologia e Metabologia e Sociedade Brasileira de Pediatria, Consenso de baixa estatura; Pediatric Endocrine Society, Guidelines on delayed puberty; Kliegman, Nelson Textbook of Pediatrics (atraso constitucional).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q47 da UNIFESP 2024
{
  "id": "q-adap24-098",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-go",
  "especialidadeId": "esp-oncogineco",
  "assuntoId": "ass-camama",
  "enunciado": "Mulher, 42 anos de idade, assintomática, sem antecedentes pessoais ou familiares e com exame mamário normal, realizou mamografia de rastreamento anual por orientação do seu ginecologista. A mamografia mostrou nódulo de 8 mm, oval, de margens circunscritas, densidade igual à do parênquima, sem microcalcificações e sem distorção arquitetural, na mama direita; a incidência com compressão localizada (complemento mamográfico) confirmou os mesmos achados. A ultrassonografia mostrou nódulo sólido oval, paralelo à pele, hipoecoico e homogêneo, de margens circunscritas, sem sombra acústica posterior e sem sinais ao Doppler de vascularização atípica. A mama contralateral e as axilas estão normais. Qual é a conduta mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Biópsia do nódulo com agulha grossa."
    },
    {
      "id": "B",
      "texto": "Controle anual apenas com mamografia."
    },
    {
      "id": "C",
      "texto": "Controle ultrassonográfico em 6 meses."
    },
    {
      "id": "D",
      "texto": "Solicitar ressonância magnética das mamas."
    }
  ],
  "gabarito": "C",
  "explicacaoGeral": "A alternativa C está correta. Dicas do enunciado: **nódulo sólido oval, de margens circunscritas, paralelo à pele, hipoecoico homogêneo, sem calcificações, sem distorção e sem sombra acústica**, em mulher assintomática sem fatores de risco, são achados de **BI-RADS 3 (provavelmente benigno)**, cuja probabilidade de malignidade é inferior a 2%. A conduta do Colégio Americano de Radiologia é o **controle de curto intervalo**: nova avaliação (mamografia unilateral e ultrassonografia) em 6 meses, depois em 12 e 24 meses, com biópsia se houver crescimento ou mudança de características. A (biópsia) é indicada em BI-RADS 4 ou 5, o que exige achado suspeito (margens irregulares ou espiculadas, forma irregular, sombra posterior, microcalcificações pleomórficas). B (controle anual) é a conduta de BI-RADS 1 e 2 e não cumpre o seguimento de curto intervalo exigido para BI-RADS 3. D (ressonância) não tem papel aqui: é reservada a alto risco, dúvida persistente após os métodos convencionais, estadiamento ou avaliação de prótese, e não se destina a nódulo provavelmente benigno.",
  "explicacoesAlternativas": {},
  "referencias": "ACR BI-RADS Atlas, 5ª ed. (2013); Colégio Brasileiro de Radiologia, Sociedade Brasileira de Mastologia e FEBRASGO, Recomendações para rastreamento do câncer de mama; INCA / Ministério da Saúde, Diretrizes para a detecção precoce do câncer de mama no Brasil (2015).",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q68 da UNIFESP 2024
{
  "id": "q-adap24-099",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-mps",
  "especialidadeId": "esp-saudefamilia",
  "assuntoId": "ass-saudetrabalhador",
  "enunciado": "Sobre a Política Nacional de Saúde do Trabalhador e da Trabalhadora (PNSTT), instituída pela Portaria GM/MS nº 1.823/2012, é correto afirmar que:",
  "alternativas": [
    {
      "id": "A",
      "texto": "Tem como objetivo fortalecer a Vigilância em Saúde do Trabalhador (VISAT), com ações independentes e unilaterais, sem integração com os demais componentes da vigilância em saúde."
    },
    {
      "id": "B",
      "texto": "Restringe-se aos trabalhadores formais, com carteira assinada, vinculados ao Regime Geral de Previdência Social e ao seguro por acidente de trabalho."
    },
    {
      "id": "C",
      "texto": "Prevê a constituição de uma rede de serviços paralela ao SUS, exclusiva para atender aos trabalhadores em processo de adoecimento e em afastamento do trabalho."
    },
    {
      "id": "D",
      "texto": "É um conjunto de ações do SUS, transversal aos níveis de atenção, que vê o trabalho como determinante do processo saúde-doença e alcança todos os trabalhadores, qualquer que seja o vínculo."
    }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: a **PNSTT (Portaria GM/MS nº 1.823/2012)** é política do SUS, de **caráter universal e transversal**: contempla todos os trabalhadores, urbanos e rurais, formais e informais, com ênfase naqueles em situação de maior vulnerabilidade, e considera o **trabalho um dos determinantes do processo saúde-doença**. Sua operacionalização se dá pela articulação da Rede Nacional de Atenção Integral à Saúde do Trabalhador (RENAST) com a Atenção Primária, a média e a alta complexidade, e a vigilância em saúde. A (VISAT independente e unilateral) está incorreta: a VISAT deve ser **integrada** às vigilâncias epidemiológica, sanitária e ambiental, e à atenção à saúde. B (somente trabalhadores formais) contraria o princípio da universalidade, pois a política alcança inclusive trabalhadores informais, autônomos e domésticos. C (rede paralela ao SUS) é incorreta: a atenção à saúde do trabalhador se dá na própria rede do SUS.",
  "explicacoesAlternativas": {},
  "referencias": "Portaria GM/MS nº 1.823, de 23 de agosto de 2012 (PNSTT); Portaria de Consolidação nº 2/2017, Anexo XV; Ministério da Saúde, Vigilância em Saúde do Trabalhador e Manual de Gestão e Gerenciamento da RENAST; IBGE, PNAD Contínua (informalidade).",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
},
// adaptada da estrutura da Q100 da UNIFESP 2024
{
  "id": "q-adap24-100",
  "banca": "Esc — Banco Didático",
  "real": false,
  "ano": 2026,
  "areaId": "area-cm",
  "especialidadeId": "esp-hemato",
  "assuntoId": "ass-hemato-hemoglobinopatias",
  "enunciado": "Menino, 3 anos de idade, com doença falciforme (SS), em uso regular de penicilina profilática, há dois dias apresenta dor abdominal, medicado em casa com dipirona, sem melhora, evoluindo para dor de intensidade 9 em escala de 0 a 10, com necessidade de morfina na emergência. Exame físico: temperatura de 39 °C, taquipneia e tiragem subcostal, saturação de oxigênio de 88% em ar ambiente. A radiografia de tórax mostra infiltrado novo em lobo inferior direito. Hb = 9,8 g/dL (valor basal de 9,5 g/dL), leucocitose com desvio à esquerda. Já foram iniciados oxigênio suplementar (saturação de 95%), analgesia e hidratação venosa em volume de manutenção. Qual é a próxima conduta mais adequada?",
  "alternativas": [
    {
      "id": "A",
      "texto": "Transfusão de concentrado de hemácias para elevar a hemoglobina basal."
    },
    {
      "id": "B",
      "texto": "Antibioticoterapia de amplo espectro, com cefalosporina de terceira geração e macrolídeo."
    },
    {
      "id": "C",
      "texto": "Aumentar a hidratação endovenosa para 1,5 vezes a necessidade de manutenção."
    },
    {
      "id": "D",
      "texto": "Corticoide inalatório em altas doses associado a broncodilatador."
    }
  ],
  "gabarito": "B",
  "explicacaoGeral": "A alternativa B está correta. Dicas do enunciado: **criança com doença falciforme, dor, febre, taquipneia, hipoxemia e infiltrado novo na radiografia** configuram síndrome torácica aguda, principal causa de internação em UTI e de morte em doença falciforme. Como o tratamento já inclui **oxigênio, analgesia e hidratação de manutenção**, a medida seguinte, que não pode ser retardada, é **antibioticoterapia empírica com cefalosporina de terceira geração e macrolídeo**, para cobrir pneumococo e germes atípicos, pois infecção é causa ou complicação frequente do quadro. A (transfusão) é reservada a queda da hemoglobina de 1 g/dL ou mais em relação ao basal, hipoxemia persistente apesar do oxigênio ou piora clínica; aqui a Hb está no nível basal e a saturação respondeu ao oxigênio. C (aumentar a hidratação) é prejudicial: o excesso de volume causa edema pulmonar e piora a síndrome torácica, devendo-se manter hidratação de manutenção. D (corticoide inalatório em altas doses) não trata a síndrome torácica; corticoide sistêmico se associa a rebote de dor e reinternação, e o broncodilatador é reservado a sibilância.",
  "explicacoesAlternativas": {},
  "referencias": "Ministério da Saúde. Doença falciforme: condutas básicas para tratamento (2012) e PCDT da doença falciforme; NHLBI. Evidence-Based Management of Sickle Cell Disease, 2014; ASH Guidelines for Sickle Cell Disease, 2019-2020.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
    "respostas": 0,
    "acertos": 0,
    "distribuicaoAlternativas": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0
    }
  },
  "criadoPor": "seed",
  "criadoEm": "2026-10-15"
}
]);
