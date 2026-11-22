/* resumos/colecistite-e-coledocolitiase/resumo.js — resumo adaptativo de colelitíase, colecistite aguda e coledocolitíase:
   diagnóstico, litíase assintomática e pólipos, gravidade de Tóquio 2018, colecistectomia precoce, paciente de alto risco
   e colecistostomia, gestação, colangite, anatomia e visão crítica de segurança, complicações da vesícula.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- colecistite-e-coledocolitiase */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "colecistite-e-coledocolitiase",
  titulo: "Colelitíase, colecistite e via biliar",
  assunto: "ass-colecistite",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "tokyo-2018", texto: "Tokyo Guidelines 2018 (TG18) — diagnóstico, gravidade e tratamento da colecistite e da colangite agudas", edicao: "2018", lidoEm: null },
    { id: "wses-colecistite", texto: "WSES — diretriz de colecistite aguda calculosa (2020)", lidoEm: null },
    { id: "asge-coledocolitiase", texto: "ASGE — manejo da coledocolitíase suspeita (probabilidade e CPRE)", lidoEm: null },
    { id: "sages-gestacao", texto: "SAGES — uso da laparoscopia na gestação (2024)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anulada pela banca (a reposição, q-fmabc2022-035-ia, entra no resumo)", questoes: ["q-fmabc2022-035"] },
  ],
  doencas: [
    {
      id: "diagnostico", titulo: "Cólica biliar, colecistite e litíase assintomática",
      introducao: `[[O **cálculo que obstrui o ducto cístico** (ou o infundíbulo, a bolsa de Hartmann) é o ponto de partida de tudo: a vesícula, sem escoar, se distende, a parede inflama e isquemia; se a obstrução cede em poucas horas é **cólica biliar**; se persiste, é **colecistite aguda**.|q-unicampdis2023-022,q-sirio2022-024]] O diagnóstico é clínico (dor em hipocôndrio direito, sinal de Murphy, febre, leucocitose) e **ultrassonográfico** (cálculo, parede espessada, líquido perivesicular).

Veja também: **Pancreatite aguda** (a pancreatite biliar e a colecistectomia na mesma internação), **Obstrução intestinal** (íleo biliar), **Cuidados perioperatórios** (risco, antibiótico e nutrição) e **Complicações cirúrgicas**.`,
      fragmentos: [
        { id: "dx-colecistite", titulo: "Quadro clínico e ultrassonografia", conferir: true, diretrizes: ["tokyo-2018"],
          questoes: ["q-sessp2024-004","q-fmabc2021-003","q-famerp2024-019","q-sirio2022-024","q-unesp2023-012","q-unesp2025-065","q-tp20202-066","q-unifesp2026-060","q-unicampdis2023-022","q-famema2021-018","q-einstein2025-025"],
          prosa: `[[A colecistite aguda aparece como dor em hipocôndrio direito (ou epigástrica irradiada) após refeição gordurosa, com antecedente de episódios autolimitados (cólicas biliares) e agora **dor contínua**, náuseas, vômitos e febre; o sinal de **Murphy** é a **interrupção da inspiração, por dor, à compressão do ponto cístico**.|q-sessp2024-004,q-fmabc2021-003,q-sirio2022-024]] [[O exame inicial é a **ultrassonografia do abdome superior** (a tomografia não é o primeiro exame): o **cálculo** é uma imagem **hiperecogênica com sombra acústica posterior**, e a colecistite mostra parede espessada (mais de 3 a 4 mm) e líquido perivesicular; a amilase e a lipase normais afastam a pancreatite, e a ultrassonografia é mais sensível que a tomografia para o cálculo.|q-famerp2024-019,q-unesp2023-012,q-unesp2025-065,q-tp20202-066,q-unifesp2026-060]]

[[A **dor no ombro direito** é dor referida da irritação do hemidiafragma direito (fígado, vesícula); na criança e no adolescente, a litíase pigmentar tem como principal associação a **anemia falciforme**, pela hemólise crônica.|q-famema2021-018,q-einstein2025-025]]`,
          texto: `- Dor no hipocôndrio direito após refeição, com episódios prévios e agora dor persistente, febre e vômito: **colecistite aguda**. {q-sirio2022-024}
- **Murphy**: interrupção da inspiração por dor à compressão do ponto cístico. {q-sessp2024-004}
- Dor em hipocôndrio direito há 3 dias, febre e Murphy positivo: **ultrassonografia do abdome superior**. {q-fmabc2021-003}
- Dor após refeição copiosa, febre baixa e defesa no rebordo: **colecistite**, **ultrassonografia do abdome superior**. {q-famerp2024-019}
- Obesa de 11 anos com dor após refeição, parede espessada e sombra: **colecistite aguda**. {q-unesp2023-012}
- O **ultrassom** é o exame de escolha, mais sensível que a tomografia para cálculo; dor à inspiração do Murphy. {q-unesp2025-065}
- Cólica há 60 dias, intolerância a gordura, obesa e sem febre: **ultrassonografia abdominal**. {q-tp20202-066}
- Imagem hiperecogênica com **sombra acústica posterior**: **cálculo**. {q-unifesp2026-060}
- Obstrução da litíase no **ducto cístico**. {q-unicampdis2023-022}
- **Dor no ombro direito**: irritação do hemidiafragma direito. {q-famema2021-018}
- Adolescente com cálculos e cólicas: **anemia falciforme**. {q-einstein2025-025}` },
        { id: "litiase-assintomatica", titulo: "Litíase assintomática, microcálculos, pólipo e risco operatório", conferir: true, diretrizes: ["tokyo-2018"],
          questoes: ["q-usp2025-033","q-sessp2022-032","q-sessp2023-004","q-amrigs2024-027","q-sessp2024-035","q-famema2021-009"],
          prosa: `A litíase **assintomática** tem risco baixo de complicação, e a regra é **observar**; a exceção é o cálculo que, pela sua natureza, ameaça o pâncreas ou a própria vesícula. [[Os **microcálculos** (até 3 a 5 mm) passam pelo cístico e causam **pancreatite biliar** e coledocolitíase: justificam a **colecistectomia mesmo sem sintomas**; o **pólipo vesicular** com mais de 8 a 10 mm (a prova cobrou **acima de 8 mm**) tem indicação cirúrgica, porque o tamanho é o principal preditor de malignidade.|q-usp2025-033,q-sessp2023-004,q-amrigs2024-027]] [[No homem de 62 anos com **alteração do hábito intestinal, empachamento e sangue nas fezes**, o cálculo de 2 cm não explica o quadro: antes da colecistectomia, investiga-se com **endoscopia digestiva alta e colonoscopia** e trata-se a hemorroida grau 1 clinicamente.|q-sessp2024-035]]

[[Entre os fatores isolados que mais elevam a morbimortalidade operatória, a **cirrose Child-Pugh C** pesa mais que idade acima de 72 anos, diabetes e insuficiência renal crônica.|q-famema2021-009]]`,
          texto: `- Microcálculos em mulher de 37 anos assintomática: **colecistectomia** (risco de pancreatite). {q-usp2025-033}
- Microcálculos menores que 0,5 cm em assintomática: **colecistectomia**, pelo risco de pancreatite aguda. {q-sessp2023-004}
- Diabética obesa de 45 anos com cálculo de 1 cm assintomática: a prova cobrou **colecistectomia** (ver Armadilhas). {q-sessp2022-032}
- **Pólipo de vesícula acima de 8 mm**: indicação cirúrgica (tamanho é o preditor). {q-amrigs2024-027}
- Cálculo de 2 cm com sangramento nas fezes e mudança do hábito aos 62 anos: **endoscopia e colonoscopia** antes. {q-sessp2024-035}
- O que mais eleva o risco operatório: **cirrose Child-Pugh C**. {q-famema2021-009}` },
      ],
    },
    {
      id: "colecistite", titulo: "Colecistite aguda: gravidade e tratamento",
      introducao: `[[A colecistite aguda tem um tratamento definitivo, a **colecistectomia videolaparoscópica**, e a pergunta é **quando e se o paciente aguenta**: no paciente estável, é **precoce** (de preferência nas primeiras 72 horas dos sintomas, na mesma internação); no paciente crítico ou de alto risco, **drena-se a vesícula** e opera-se depois, se houver condição.|q-adap26-060,q-uspsp2-096,q-usprp2026-015]]`,
      fragmentos: [
        { id: "tokyo", titulo: "Graus de gravidade (Tóquio 2018)", conferir: true, diretrizes: ["tokyo-2018"],
          figuras: [{ arquivo: "figuras/tokyo-2018.svg", legenda: "Esquema autoral: gravidade da colecistite aguda pelos critérios de Tóquio 2018 e conduta." }],
          questoes: ["q-famerp2022-076","q-iamspe2025-035","q-iamspe2021-025"],
          prosa: `O diagnóstico exige **um sinal local** (Murphy, dor ou massa no hipocôndrio direito), **um sinal sistêmico** (febre, leucocitose, PCR) e **imagem compatível**. A gravidade se divide em três graus. O **grau I (leve)** não tem os critérios dos outros dois. [[O **grau II (moderada)** tem **leucocitose acima de 18.000/mm³**, massa palpável no hipocôndrio direito, mais de 72 horas de sintomas ou inflamação local acentuada; o **grau III (grave)** tem **disfunção de órgão**: cardiovascular (vasopressor), neurológica, respiratória, renal (creatinina acima de 2,0 mg/dL), hepática ou hematológica (**plaquetas abaixo de 100.000/mm³**).|q-famerp2022-076,q-iamspe2025-035]] [[No grau III, a **meta principal é remover o foco infeccioso** (suporte, antibiótico e **drenagem da vesícula**), independentemente do tratamento da litíase, e não a ressecção da vesícula a qualquer custo; leucocitose acima de 18 mil define o grau II, e PCR alta ou idade não são critérios de gravidade.|q-iamspe2021-025,q-iamspe2025-035]]`,
          texto: `- Murphy, parede espessada e líquido perivesicular com **leucócitos de 19.000**: colecistite **moderada, grau II**. {q-famerp2022-076}
- Idosa com **plaquetas de 95 mil**, cálculo impactado e 21 mil leucócitos: **grau III** (disfunção hematológica); **colecistostomia por punção**. {q-iamspe2025-035}
- A meta no **grau III** é **remover o foco infeccioso**, não tratar a litíase. {q-iamspe2021-025}` },
        { id: "colecistectomia-precoce", titulo: "Colecistectomia videolaparoscópica precoce", conferir: true, diretrizes: ["tokyo-2018","wses-colecistite"],
          casos: ["q-uspsp4-059"],
          questoes: ["q-009","q-adap26-060","q-scmsp2023-036","q-scmsp2025-022","q-sessp2026-036","q-tp20251-062","q-uspsp2-096","q-usprp2021-082","q-tp20231-068","q-einstein2023-018","q-einstein2024-022","q-famerp2025-067","q-scmsp2022-004"],
          prosa: `A cirurgia precoce não é mais perigosa que a tardia e evita a recorrência e a segunda internação; a **antibioticoterapia isolada**, a espera de 6 a 8 semanas para a colecistectomia eletiva, a **CPRE** de rotina, a **colecistostomia** como definitivo e a conduta expectante estão errados no paciente estável. [[O paciente com colecistite **leve a moderada** (dor, febre, Murphy, leucocitose, parede de 4 a 5 mm, líquido perivesicular, cálculo impactado), mesmo diabético, obeso ou com cirurgia bariátrica prévia, faz **colecistectomia videolaparoscópica precoce**, de preferência nas **primeiras 48 a 72 horas** dos sintomas, com antibiótico e suporte.|q-009,q-adap26-060,q-scmsp2023-036,q-scmsp2025-022,q-sessp2026-036,q-tp20251-062,q-uspsp2-096,q-usprp2021-082,q-tp20231-068,q-einstein2023-018,q-einstein2024-022]]

[[Na colecistite com inflamação local acentuada (grau II) em paciente com diabetes tipo 1 e puerpério, a conduta é a videolaparoscopia com piperacilina-tazobactam por 1 a 7 dias; e se a laparoscopia não está disponível, ou há dificuldade técnica, a **via aberta é aceitável**, porque o importante é remover a vesícula.|q-famerp2025-067,q-scmsp2022-004]] [[Um colédoco normal e sem icterícia dispensa a colangiorressonância e a CPRE.|q-famerp2025-067,q-uspsp2-096]]`,
          texto: `- Murphy positivo, parede de 5 mm e cálculo impactado: **colecistectomia videolaparoscópica nas primeiras 72 horas**. {q-009}
- Dor há 48 horas, Murphy, leucocitose e parede de 5 mm: **colecistectomia precoce**. {q-adap26-060}
- Defesa no hipocôndrio direito e cálculo de 2 cm impactado, sem sepse: **colecistectomia videolaparoscópica**. {q-scmsp2023-036}
- Diabética com cálculos, espessamento e febre: **colecistectomia laparoscópica de urgência** (precoce). {q-scmsp2025-022}
- Dor há 12 horas, febre alta e vesícula distendida com líquido perivesicular: **colecistectomia videolaparoscópica precoce**. {q-sessp2026-036}
- Febre 38 °C, Murphy, PCR 20 e US com líquido pericolecístico: **colecistectomia videolaparoscópica**. {q-tp20251-062}
- Murphy, 36 horas, parede de 5 mm: **videolaparoscopia dentro das primeiras 72 horas**. {q-uspsp2-096}
- Colelitíase sintomática e dor contínua há 16 horas com defesa: **colecistite branda**, videolaparoscopia. {q-usprp2021-082}
- Bariátrica há 8 meses, Murphy e plastrão: **ultrassonografia, antibiótico e VLP em 48 a 72 horas**. {q-tp20231-068}
- Diabético com Murphy, parede de 4 mm e cálculo impactado: **cirurgia de urgência** (precoce). {q-einstein2023-018}
- Colecistite grau II com APACHE II de 7: **colecistectomia por vídeo**. {q-einstein2024-022}
- Diabética tipo 1 e puérpera, cálculo de 20 mm e colédoco de 5 mm: **VLP e piperacilina-tazobactam**. {q-famerp2025-067}
- Cálculo impactado e leucócitos de 16.530 em 12 horas: **colecistectomia**, mesmo por via aberta (a prova). {q-scmsp2022-004}` },
        { id: "pos-antibiotico", titulo: "Antibiótico, germes e pós-operatório", conferir: true, diretrizes: ["tokyo-2018","wses-colecistite"],
          questoes: ["q-usp2022-065","q-usp2024-039","q-usp2026-042","q-iamspe2022-017"],
          prosa: `[[Com o foco **removido** pela colecistectomia e sem necrose, perfuração ou coleção (grau I), o antibiótico terapêutico **não continua** depois da operação ou se suspende em até **24 horas**; a prescrição do pós-operatório é **dieta leve, hidratação de manutenção, analgesia e antiemético**.|q-usp2022-065,q-usp2024-039]] [[Os vômitos de repetição no 1º pós-operatório, com a paciente estável, sem peritonite e com bilirrubina e enzimas canaliculares normais, tratam-se **suspendendo o tramadol** (opioide emetizante) e dando **ondansetrona**, sem tomografia nem colangiorressonância.|q-usp2026-042]] [[Na infecção biliar, o germe gram-positivo mais provável é o **Enterococcus** (os outros da lista são gram-negativos).|q-iamspe2022-017]]`,
          texto: `- Colecistectomia com foco controlado: antibiótico **até 24 horas**. {q-usp2022-065}
- Colecistite sem necrose, operada sem intercorrências: **sem antibiótico**, dieta leve. {q-usp2024-039}
- Vômitos no 1º pós-operatório: **suspender tramadol** e **ondansetrona**. {q-usp2026-042}
- Germe gram-positivo na colecistite: **Enterococcus**. {q-iamspe2022-017}` },
        { id: "alto-risco", titulo: "Paciente crítico: colecistostomia e colecistite alitiásica", conferir: true, diretrizes: ["tokyo-2018","wses-colecistite"],
          questoes: ["q-scmsp2021-033","q-usp2022-063","q-usprp2026-015","q-uspsp2-081","q-sirio2023-035","q-uspsp4-059","q-usp2024-040","q-iamspe2021-028","q-sessp2022-039"],
          prosa: `[[No paciente de **UTI em choque**, com ventilação, diálise ou vasopressor, e naquele de **alto risco** (infarto recente em dupla antiagregação, DPOC avançada), a colecistite se trata com **antibiótico e drenagem percutânea da vesícula** (colecistostomia), que controla o foco sem anestesia geral; a colecistectomia pode ser feita depois, se houver condição.|q-scmsp2021-033,q-usp2022-063,q-usprp2026-015,q-uspsp2-081,q-sirio2023-035]] [[A **colecistite alitiásica** (5 a 10 % das colecistites) acomete o doente grave (UTI, pós-transplante, trauma, queimado), com **curso mais fulminante** e maior tendência a gangrena, empiema e perfuração: a tomografia mostra vesícula distendida de parede espessada, com densificação da gordura e sem cálculos, e a conduta no paciente instável é a **colecistostomia percutânea**.|q-usp2024-040,q-iamspe2021-028,q-uspsp4-059]] [[Nem toda vesícula de parede espessa é colecistite: no idoso com insuficiência cardíaca grave, hepatomegalia, Murphy negativo, sem leucocitose e sem cálculos, o espessamento é **congestão hepática**, e o paciente **não fecha critérios** de colecistite.|q-sessp2022-039]]`,
          texto: `- Idosa com colecistite que piora sob antibiótico, com falência renal e respiratória e vasopressor: **colecistostomia**. {q-scmsp2021-033}
- UTI com choque e noradrenalina, APACHE II 19: **drenagem percutânea transepática da vesícula**. {q-usp2022-063}
- Idoso com IAM há 6 meses, DPOC avançada e colecistite moderada: **antibiótico e drenagem percutânea**. {q-usprp2026-015}
- UTI com sepse pulmonar, vasopressor e icterícia leve: **drenagem percutânea da vesícula**. {q-uspsp2-081}
- Choque séptico, ventilação e diálise com vesícula distendida: **colecistostomia guiada por ultrassom**. {q-sirio2023-035}
- UTI, meningite, diálise, choque e vesícula distendida sem cálculo: **colecistostomia percutânea**. {q-uspsp4-059}
- Pós-transplante pulmonar em UTI, vesícula inflamada: **colecistite aguda alitiásica**. {q-usp2024-040}
- Colecistite alitiásica: **5 a 10 %** das colecistites, curso mais fulminante. {q-iamspe2021-028}
- Chagásico com ICC grave e vesícula espessa sem cálculos, Murphy negativo: **não é colecistite**. {q-sessp2022-039}` },
        { id: "gestante", titulo: "Colelitíase e colecistite na gestação", conferir: true, diretrizes: ["sages-gestacao"],
          questoes: ["q-fmabc2022-035-ia","q-uspsp5-058","q-sirio2021-025","q-udisc20262-068","q-simepm89-011"],
          prosa: `Na gestação, o estrogênio e a progesterona reduzem a contratilidade da vesícula e aumentam o colesterol da bile, o que favorece o cálculo e a colecistite; a segunda urgência cirúrgica não obstétrica mais comum é a colecistite (depois da apendicite). [[A **colecistite aguda** na gestante (13, 20 ou 33 semanas) se trata com **colecistectomia videolaparoscópica**, em qualquer trimestre, durante a internação, com suporte e antibiótico; o tratamento clínico isolado tem recidiva alta (até 70 %), com risco de perda fetal e prematuridade; a laparotomia não é preferível e a ressonância não é necessária.|q-fmabc2022-035-ia,q-uspsp5-058,q-sirio2021-025]] [[Já a **cólica biliar não complicada** e a litíase achada ao acaso no 2º trimestre **não se operam**: faz-se conduta expectante e colecistectomia depois do parto; a **cólica de repetição** ou a pancreatite aguda indicam a laparoscopia.|q-udisc20262-068,q-simepm89-011]]`,
          texto: `- Gestante de 33 semanas com colecistite pelo ultrassom: **colecistectomia videolaparoscópica nesta internação**. {q-fmabc2022-035-ia}
- Gestante de 13 semanas com colecistite: **colecistectomia**. {q-uspsp5-058}
- Gestante de 20 semanas com colecistite: **videolaparoscopia**. {q-sirio2021-025}
- Gestante de 2º trimestre, primeiro episódio de cólica biliar: **conduta expectante e cirurgia após a gravidez**. {q-udisc20262-068}
- Litíase no 2º trimestre: **laparoscopia se cólica de repetição ou pancreatite**. {q-simepm89-011}` },
      ],
    },
    {
      id: "via-biliar", titulo: "Via biliar: colangite, coledocolitíase, anatomia e complicações da vesícula",
      introducao: `[[O cálculo que sai da vesícula pode parar em quatro pontos: no **cístico** (colecistite), comprimindo o **hepático comum** (síndrome de Mirizzi), no **colédoco** (coledocolitíase, colangite, pancreatite) ou no **intestino**, depois de uma fístula (íleo biliar).|q-fmabc2025-031,q-adap21-082,q-sessp2024-036]]`,
      fragmentos: [
        { id: "colangite-coledoco", titulo: "Colangite aguda e coledocolitíase", conferir: true, diretrizes: ["tokyo-2018","asge-coledocolitiase"],
          figuras: [{ arquivo: "figuras/onde-o-calculo-para.svg", legenda: "Esquema autoral: onde o cálculo biliar para e o que ele causa." }],
          questoes: ["q-adap21-082","q-iamspe2025-021"],
          prosa: `[[A **colangite aguda** é a infecção da via biliar obstruída: **febre com calafrios, icterícia e dor** (tríade de Charcot) e, se grave, **hipotensão e confusão** (pêntade de Reynolds), com leucocitose, hiperbilirrubinemia direta e colédoco dilatado com cálculo; a conduta é **ressuscitação, antibiótico venoso e drenagem biliar urgente por CPRE com esfincterotomia**, e não a colecistectomia de urgência, o antibiótico oral nem a coledocotomia com dreno em T.|q-adap21-082]] [[O padrão de **colestase** (GGT e fosfatase alcalina altas, ALT elevada) com colédoco dilatado e **falha de enchimento distal** na colangiografia intraoperatória é **coledocolitíase**.|q-iamspe2025-021]]`,
          texto: `- Idoso com febre, calafrios, icterícia, hipotensão, confusão e colédoco dilatado com cálculo: **colangite grave**; **ressuscitação, antibiótico e CPRE urgente**. {q-adap21-082}
- Colangiografia intraoperatória com colédoco dilatado e falha de enchimento distal, com GGT 748: **coledocolitíase**. {q-iamspe2025-021}` },
        { id: "anat-cvs", titulo: "Anatomia da via biliar e visão crítica de segurança", conferir: true, diretrizes: ["tokyo-2018"],
          casos: ["q-usp2026-041"],
          questoes: ["q-amrigs2022-033","q-fmabc2022-036","q-usp2026-041"],
          prosa: `[[O **triângulo hepatocístico** é limitado pelo ducto cístico, pelo ducto hepático comum e pelo fígado; a **artéria cística** é ramo da hepática direita e o **linfonodo de Mascagni** é o marco para encontrá-la; na colecistectomia, a **visão crítica de segurança** exige dissecar o triângulo, separar o terço inferior da vesícula do leito hepático e **ver só duas estruturas entrando na vesícula: o ducto cístico e a artéria cística**, antes de clipar, para não lesar a via biliar principal.|q-amrigs2022-033,q-fmabc2022-036]] [[Na **colangiografia intraoperatória**, o cateter entra no **ducto cístico**, depois de clipado junto à vesícula.|q-usp2026-041]]`,
          texto: `- O **linfonodo de Mascagni** é marco para a artéria cística; a artéria cística costuma ser ramo da hepática **direita**. {q-amrigs2022-033}
- Na **visão crítica de segurança**, visualizar o **ducto cístico e a artéria cística**. {q-fmabc2022-036}
- A colangiografia intraoperatória introduz o cateter no **ducto cístico**. {q-usp2026-041}` },
        { id: "vesicula-complicacoes", titulo: "Mirizzi, íleo biliar, hidropsia, adenomiomatose e xantogranulomatosa", conferir: true,
          questoes: ["q-einstein2026-027","q-fmabc2024-009","q-scmsp2026-039","q-fmabc2025-031","q-sessp2024-036"],
          prosa: `[[A **síndrome de Mirizzi** é a compressão extrínseca do **ducto hepático comum ou do colédoco** por cálculo impactado no infundíbulo ou no cístico, com estase biliar e icterícia; o **íleo biliar** é a **impactação de um cálculo no trato gastrointestinal** depois de passar por fístula bilioentérica; e a **hidropsia (mucocele)**, vesícula muito distendida com líquido claro e sem bile, é consequência do **cálculo impactado no infundíbulo ou no cístico**.|q-fmabc2025-031,q-sessp2024-036,q-einstein2026-027]] [[A **adenomiomatose** é a hiperplasia benigna da parede muscular com seios de Rokitansky-Aschoff dilatados; a **colecistite xantogranulomatosa**, rara, com nódulos hipoatenuantes na parede à tomografia em diabética com leucocitose, trata-se com colecistectomia.|q-fmabc2024-009,q-scmsp2026-039]]`,
          texto: `- **Mirizzi**: compressão do hepático comum ou do colédoco por cálculo. {q-fmabc2025-031}
- **Íleo biliar**: cálculo impactado no trato gastrointestinal após fístula bilioentérica. {q-sessp2024-036}
- Vesícula distendida com líquido claro sem bile: **hidropsia**, cálculo impactado no infundíbulo ou cístico. {q-einstein2026-027}
- Parede espessa com glândulas prolapsadas (Rokitansky-Aschoff): **adenomiomatose**. {q-fmabc2024-009}
- Parede com nódulos hipoatenuantes em diabética com leucocitose: **colecistite xantogranulomatosa**, colecistectomia. {q-scmsp2026-039}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-sessp2022-032","q-amrigs2024-027","q-scmsp2022-004","q-sessp2023-004","q-famerp2025-067"],
          prosa: `[[Na litíase **assintomática**, a regra é observar; a SES-SP 2022 cobrou a **colecistectomia** na diabética obesa de 45 anos com cálculo de 1 cm, e a regra do pólipo é o limite de **10 mm** em muitas diretrizes, enquanto a AMRIGS 2024 cobrou **acima de 8 mm**.|q-sessp2022-032,q-amrigs2024-027]] [[Na colecistite leve a regra é a videolaparoscopia, e a Santa Casa 2022 cobrou que a colecistectomia está indicada **mesmo por via aberta** no hospital secundário.|q-scmsp2022-004]] [[A SES-SP 2023 cobrou a colecistectomia para o microcálculo assintomático, com a justificativa da pancreatite biliar, que é a exceção à regra de observar.|q-sessp2023-004]]`,
          texto: `- Regra: litíase assintomática se observa; a prova (SES-SP 2022) cobrou **colecistectomia** na diabética com cálculo de 1 cm. {q-sessp2022-032}
- Regra: pólipo operado a partir de 10 mm em diretrizes; a prova (AMRIGS 2024) cobrou **acima de 8 mm**. {q-amrigs2024-027}
- Regra: colecistite leve opera por videolaparoscopia; a prova (Santa Casa 2022) cobrou a colecistectomia, **mesmo por via aberta**. {q-scmsp2022-004}
- Regra: microcálculo assintomático é a exceção que se opera; a prova (SES-SP 2023) cobrou isso pelo risco de **pancreatite**. {q-sessp2023-004}
- Regra: colecistite grau II com inflamação local acentuada pode ir à videolaparoscopia; a prova (FAMERP 2025) cobrou **piperacilina-tazobactam por 1 a 7 dias**. {q-famerp2025-067}` },
      ],
    },
  ],
});
