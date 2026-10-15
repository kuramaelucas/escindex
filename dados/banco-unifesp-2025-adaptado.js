/* ==========================================================================
   BANCO UNIFESP 2025 ADAPTADO — 100 questões autorais
   ==========================================================================
   Cada questão parte do ASSUNTO e da posição de uma questão da prova da
   UNIFESP-EPM 2025, mas é escrita do zero: caso clínico, dados e alternativas
   próprios, e a resposta correta é a alternativa SEGUINTE à da prova real
   (A→B, B→C, C→D, D→A; as 7 questões anuladas de 2025 receberam a letra que
   fecha o equilíbrio das quatro). Não são questões reais: marcam `real: false`
   e instituição "Esc — Banco Didático" (nunca "UNIFESP-EPM 2025"), para não se
   misturarem à prova de 2025 em Provas Antigas. A explicação segue o padrão de
   justificativa e cada questão cita a diretriz de base com edição e ano; o que
   não pôde ser conferido no texto oficial está dito na referência da questão
   e em docs/auditoria-simulado-epm-2027.md.
   ========================================================================== */
window.EscDados.registrarQuestoes("banco-unifesp-2025-adaptado", [
// adaptada da estrutura da Q1 da UNIFESP 2025
{
  id:"q-adap25-001", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-anestesio", assuntoId:"ass-anestesio-complicacoes",
  enunciado:"Mulher, 36 anos, não fumante, será submetida a histerectomia por videolaparoscopia sob anestesia geral. Na avaliação pré-anestésica, relata que sempre passa mal em viagens de ônibus. O plano analgésico do pós-operatório inclui morfina por via endovenosa. Considerando o escore de Apfel e o consenso internacional sobre náusea e vômito pós-operatórios, qual é a profilaxia mais adequada?",
  alternativas:[{id:"A",texto:"Anestesia venosa total com propofol, com dexametasona na indução e ondansetron ao final da cirurgia."},{id:"B",texto:"Anestesia com sevoflurano e óxido nitroso, com ondansetron como único antiemético, considerado suficiente."},{id:"C",texto:"Anestesia balanceada com sevoflurano, sem antiemético, tratando só a náusea que surgir no recobro."},{id:"D",texto:"Anestesia venosa total com propofol isolada, pois a técnica equivale a uma associação de antieméticos."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: sexo feminino, **não fumante**, **cinetose** e **opioide no pós-operatório** somam **4 fatores do escore de Apfel**, que corresponde a risco de PONV de cerca de **80%** (0 a 4 fatores: 10%, 20%, 40%, 60% e 80%). Nesse risco, o consenso recomenda reduzir o risco basal (preferir o propofol e evitar halogenados e óxido nitroso) e usar profilaxia com **no mínimo duas intervenções** de mecanismos diferentes; propofol em TIVA, dexametasona (4 a 8 mg, na indução) e ondansetron (4 mg, ao final da cirurgia) cumprem a regra. B está errada porque o sevoflurano e o óxido nitroso são justamente gatilhos de náusea, e o ondansetron sozinho é uma única intervenção, pouco para um risco de 80%. C está errada porque deixa sem profilaxia uma paciente de risco alto: o escore existe para prevenir, não para esperar o sintoma. D está errada porque a TIVA com propofol reduz o risco basal, mas isolada ainda é uma só intervenção e não equivale a uma associação de antieméticos. Observação: o escore de Apfel pontua sexo feminino, não tabagismo, antecedente de PONV ou cinetose e opioide no pós-operatório.",
  explicacoesAlternativas:{},
  referencias:"Gan TJ et al. Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesth Analg 2020;131:411-48; Fifth Consensus Guidelines for the Management of PONV, sumário executivo (Anesth Analg, 2025); Apfel CC et al. Anesthesiology 1999;91:693-700.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q2 da UNIFESP 2025
{
  id:"q-adap25-002", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-abdagudo", assuntoId:"ass-obstrucao",
  enunciado:"Homem, 79 anos, residente em instituição de longa permanência, com constipação crônica e uso regular de antipsicótico, chega ao pronto-socorro com 2 dias de distensão abdominal progressiva, dor em cólica e parada de eliminação de gases e fezes. Exame físico: PA 128/76 mmHg, FC 92 bpm, T 36,8 °C; abdome muito distendido e timpânico, doloroso à palpação profunda, sem sinais de irritação peritoneal; ampola retal vazia ao toque. Exames: lactato 1,4 mmol/L e leucócitos 9.800/mm³. A radiografia simples de abdome mostra uma única alça muito dilatada, em forma de «grão de café», cuja convexidade se projeta para o hipocôndrio direito. Qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Jejum, sonda nasogástrica e hidratação venosa por 72 horas, aguardando a destorção espontânea."},{id:"B",texto:"Sigmoidopexia por videolaparoscopia de urgência, que trata a torção e evita a recorrência."},{id:"C",texto:"Laparotomia imediata com sigmoidectomia e colostomia, sem tentativa prévia de destorção."},{id:"D",texto:"Retossigmoidoscopia para destorção e descompressão, seguida de sigmoidectomia eletiva."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **idoso institucionalizado, com constipação crônica e antipsicótico** (fatores de risco para volvo de sigmoide), obstrução completa (parada de gases e fezes) com **alça única em «grão de café»** na radiografia, e **ausência de sofrimento da alça**: sem peritonismo, **lactato de 1,4 mmol/L** (normal, abaixo de 2 mmol/L) e **leucócitos de 9.800/mm³**. No volvo de sigmoide sem isquemia nem perfuração, o tratamento inicial é a destorção por retossigmoidoscopia, com sonda retal para manter a descompressão; como a recorrência após a destorção isolada é muito frequente, indica-se a sigmoidectomia eletiva na mesma internação ou logo depois. A está errada porque o volvo não se resolve de forma espontânea e a espera expõe a alça à isquemia. B está errada porque a sigmoidopexia isolada tem recorrência alta e não é a primeira medida; antes dela vem a destorção endoscópica. C está errada porque a laparotomia com ressecção de urgência é reservada a peritonite, gangrena, perfuração ou falha da destorção, nada disso presente no caso.",
  explicacoesAlternativas:{},
  referencias:"Vogel JD et al. Clinical Practice Guideline for the Management of Colonic Volvulus and Acute Colonic Pseudo-Obstruction (ASCRS). Dis Colon Rectum 2016;59:589-600.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q3 da UNIFESP 2025
{
  id:"q-adap25-003", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-trauma", assuntoId:"ass-atls",
  enunciado:"Homem, 31 anos, vítima de acidente de motocicleta com impacto do períneo contra o tanque, chega ao pronto-socorro consciente, com via aérea pérvia, PA 124/78 mmHg e FC 96 bpm. Queixa-se de dor suprapúbica e de não ter conseguido urinar desde o acidente. Exame físico: equimose perineal em «asa de borboleta», sangue no meato uretral e globo vesical palpável. A radiografia de pelve mostra fratura bilateral dos ramos isquiopúbicos. Qual é a conduta mais adequada para o esvaziamento da bexiga?",
  alternativas:[{id:"A",texto:"Passagem imediata de sonda vesical de demora, com o cateter de menor calibre disponível."},{id:"B",texto:"Uretrografia retrógrada antes de qualquer sonda e, havendo lesão da uretra, cistostomia suprapúbica."},{id:"C",texto:"Cistografia retrógrada pela sonda vesical, pois o exame define a lesão e já esvazia a bexiga."},{id:"D",texto:"Tomografia de abdome e pelve com contraste, que dispensa outros exames da via urinária."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **sangue no meato uretral**, **equimose perineal em «asa de borboleta»**, **retenção urinária com globo vesical** e **fratura dos ramos isquiopúbicos** formam o quadro de lesão uretral (trauma contra o períneo e pelve instável). No homem com suspeita de lesão uretral, a uretrografia retrógrada vem **antes de qualquer cateterização**; se confirmar lesão, a bexiga é derivada por cistostomia suprapúbica e a reconstrução fica para depois. A está errada porque passar a sonda às cegas pode transformar uma lesão parcial em completa e contaminar o hematoma. C está errada porque a cistografia retrógrada pressupõe a sonda já passada, justamente o que se quer evitar antes de conhecer a uretra. D está errada porque a tomografia com contraste endovenoso não avalia bem a uretra e não substitui a uretrografia retrógrada.",
  explicacoesAlternativas:{},
  referencias:"American College of Surgeons. ATLS – Advanced Trauma Life Support, 10ª ed., 2018 (a 11ª ed., de 2025, não foi conferida); EAU Guidelines on Urological Trauma, 2024.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q4 da UNIFESP 2025
{
  id:"q-adap25-004", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-cirvascular", assuntoId:"ass-cirvasc-disseccao",
  enunciado:"Homem, 58 anos, hipertenso e com controle irregular, procura o pronto-socorro com dor torácica súbita, lancinante, irradiada para o dorso, iniciada há 4 horas. PA 172/98 mmHg nos dois braços, FC 98 bpm, pulsos simétricos, sem sopros e sem déficit neurológico; diurese preservada e creatinina de 1,0 mg/dL. A angiotomografia mostra dissecção que se origina logo após a artéria subclávia esquerda e se estende até a aorta abdominal infrarrenal, sem ruptura, sem hematoma periaórtico, sem má perfusão de ramos viscerais ou de membros e com diâmetro máximo da aorta de 38 mm. A dor cedeu com analgesia. Qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Cirurgia aberta de emergência, com substituição da aorta torácica descendente por um enxerto sintético."},{id:"B",texto:"Terapia intensiva com betabloqueador endovenoso e vasodilatador se a pressão ainda persistir elevada."},{id:"C",texto:"Correção endovascular imediata, com endoprótese torácica, para impedir a progressão da dissecção."},{id:"D",texto:"Nitroprussiato de sódio endovenoso isolado, em doses crescentes até normalizar a pressão arterial."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: a dissecção começa **após a subclávia esquerda** (Stanford **tipo B**) e é **não complicada**: **sem ruptura, sem má perfusão** de vísceras ou membros, **dor controlada**, **creatinina de 1,0 mg/dL** e diâmetro de **38 mm**. O tratamento inicial é clínico, em terapia intensiva, com controle da impulsão: betabloqueador endovenoso primeiro (esmolol, labetalol ou metoprolol), para **frequência cardíaca de 60 a 80 bpm**, e vasodilatador acrescentado se a **pressão sistólica** continuar acima de **120 mmHg**. A está errada porque a cirurgia aberta de emergência é o tratamento da dissecção tipo A, e não do tipo B não complicada. C está errada porque a correção endovascular é reservada ao tipo B complicado (ruptura, má perfusão, dor ou hipertensão refratárias, crescimento rápido), nenhum deles presente. D está errada porque o vasodilatador sozinho provoca taquicardia reflexa e aumenta a força de ejeção do ventrículo, o que piora o estresse sobre a parede da aorta; o betabloqueador deve vir antes.",
  explicacoesAlternativas:{},
  referencias:"Isselbacher EM et al. 2022 ACC/AHA Guideline for the Diagnosis and Management of Aortic Disease. Circulation 2022;146:e334-e482; Erbel R et al. 2014 ESC Guidelines on aortic diseases.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q5 da UNIFESP 2025
{
  id:"q-adap25-005", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-abdagudo", assuntoId:"ass-pancreatite",
  enunciado:"Mulher, 49 anos, com colelitíase assintomática conhecida, é internada com dor epigástrica em barra, vômitos e lipase sérica 5 vezes acima do limite superior da normalidade. Bilirrubina total de 1,1 mg/dL, sem febre, sem dilatação das vias biliares ao ultrassom e sem insuficiência orgânica. Com reposição volêmica, analgesia e dieta oral precoce, evolui em 72 horas sem dor e sem coleções peripancreáticas na tomografia. Qual é a conduta mais adequada em relação à litíase biliar?",
  alternativas:[{id:"A",texto:"Colecistectomia eletiva após 6 semanas, para aguardar a resolução completa da inflamação."},{id:"B",texto:"Colangiopancreatografia retrógrada endoscópica com papilotomia antes da alta, para prevenir recidiva."},{id:"C",texto:"Colecistectomia videolaparoscópica ainda nesta internação, depois da melhora clínica da paciente."},{id:"D",texto:"Acompanhamento ambulatorial com ácido ursodesoxicólico, reservando a cirurgia para um novo episódio."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **colelitíase**, **lipase 5 vezes** o limite superior (diagnóstico de pancreatite por dor típica mais lipase acima de 3 vezes), **sem insuficiência orgânica e sem coleções** (forma leve pela classificação de Atlanta revisada), **bilirrubina de 1,1 mg/dL** e vias biliares sem dilatação (sem colangite nem obstrução persistente). Na pancreatite biliar leve, a colecistectomia deve ser feita na **mesma internação**, depois da melhora clínica, porque o intervalo aumenta o risco de recorrência da pancreatite e de outras complicações da litíase. A está errada porque esperar 6 semanas era conduta antiga e expõe a paciente a novo episódio nesse intervalo. B está errada porque a CPRE com papilotomia não é feita de rotina na pancreatite biliar leve sem colangite nem obstrução biliar persistente. D está errada porque o ácido ursodesoxicólico não substitui a cirurgia nem evita a recorrência com eficácia comparável.",
  explicacoesAlternativas:{},
  referencias:"Tenner S et al. American College of Gastroenterology Guideline: Management of Acute Pancreatitis. Am J Gastroenterol 2024;119:419-437; Crockett SD et al. AGA Institute Guideline on Initial Management of Acute Pancreatitis. Gastroenterology 2018;154:1096-1101.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q6 da UNIFESP 2025
{
  id:"q-adap25-006", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-neo-malformacoesdigestivas",
  enunciado:"Recém-nascido a termo, 20 horas de vida, filho de gestante cujo pré-natal evidenciou polidrâmnio. Apresenta vômitos biliosos desde as primeiras mamadas. Exame físico: fendas palpebrais oblíquas para cima, prega palmar única e sopro sistólico no precórdio; abdome escavado nos andares inferiores e discretamente distendido no epigástrio. A radiografia de abdome mostra dois níveis hidroaéreos, um no estômago e outro no duodeno, sem gás nas alças distais. Qual é o diagnóstico mais provável?",
  alternativas:[{id:"A",texto:"Íleo meconial por fibrose cística, com obstrução do íleo terminal e do cólon."},{id:"B",texto:"Doença de Hirschsprung de segmento longo, por ausência de gânglios no cólon e no íleo."},{id:"C",texto:"Atresia duodenal, com obstrução completa da luz duodenal abaixo da papila de Vater."},{id:"D",texto:"Estenose hipertrófica do piloro, por hipertrofia da musculatura pilórica."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **polidrâmnio** (o feto obstruído não absorve o líquido amniótico), **vômitos biliosos desde as primeiras mamadas**, **abdome escavado** abaixo do epigástrio, **estigmas de síndrome de Down** (fendas palpebrais oblíquas, prega palmar única, sopro sugestivo de cardiopatia) e **dois níveis hidroaéreos sem gás distal**, a «dupla bolha» da obstrução completa do duodeno; a atresia duodenal costuma acompanhar a trissomia do 21 e outras malformações. A está errada porque no íleo meconial a obstrução é distal, com distensão abdominal difusa e muitas alças dilatadas, e não com gás só no estômago e no duodeno. B está errada porque a doença de Hirschsprung causa distensão difusa e atraso na eliminação do mecônio, com alças dilatadas até o cólon, e não escavação abdominal. D está errada porque a estenose hipertrófica do piloro causa vômitos não biliosos, em jato, a partir da 2ª a 6ª semana de vida.",
  explicacoesAlternativas:{},
  referencias:"Sociedade Brasileira de Pediatria. Tratado de Pediatria, 5ª ed., capítulo de malformações do trato digestório; Holcomb GW, Murphy JP, St Peter SD. Holcomb and Ashcraft's Pediatric Surgery, 7ª ed., 2020.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q7 da UNIFESP 2025
{
  id:"q-adap25-007", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-neo-malformacoesdigestivas",
  enunciado:"Recém-nascido a termo, 3 horas de vida, filho de gestante com polidrâmnio. Apresenta sialorreia abundante e espumosa, tosse e cianose transitória durante a aspiração das vias aéreas. Uma sonda orogástrica de 10 Fr encontra resistência após 10 cm. A radiografia de tórax e abdome, feita com a sonda em posição, mostra a sonda enrolada no mediastino superior e gás no estômago e nas alças intestinais. Qual é a conduta inicial mais adequada antes da correção cirúrgica?",
  alternativas:[{id:"A",texto:"Jejum, cabeceira elevada e aspiração contínua da bolsa proximal do esôfago, com sonda de duplo lúmen."},{id:"B",texto:"Dieta por sonda orogástrica em pequenas frações, com aspiração gástrica antes de cada oferta."},{id:"C",texto:"Ventilação com pressão positiva por máscara facial, para reduzir a cianose antes de aspirar."},{id:"D",texto:"Esofagograma com bário para delimitar a bolsa superior, mantendo a dieta suspensa até o resultado do exame."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **polidrâmnio**, **sialorreia espumosa** com tosse e cianose, **sonda que para a 10 cm** e radiografia com a sonda enrolada no mediastino e **gás no estômago e nas alças**, o que indica atresia de esôfago com fístula traqueoesofágica distal (o gás chega ao estômago por ela). O manejo inicial é o jejum absoluto, a cabeceira elevada e a aspiração contínua da bolsa proximal com sonda de duplo lúmen, para evitar aspiração de saliva, enquanto se avalia a presença de outras malformações (associação VACTERL, com ecocardiograma) e se programa a cirurgia. B está errada porque qualquer dieta enteral é contraindicada: o leite passaria à via aérea, e o refluxo gástrico alcançaria os pulmões pela fístula. C está errada porque a pressão positiva pela máscara insufla o estômago através da fístula, distende o abdome e piora a ventilação. D está errada porque o contraste baritado oferece risco de aspiração e não é necessário, já que a radiografia com a sonda enrolada confirma o diagnóstico.",
  explicacoesAlternativas:{},
  referencias:"Krishnan U et al. ESPGHAN-NASPGHAN Guidelines for the Evaluation and Treatment of Gastrointestinal and Nutritional Complications in Children With Esophageal Atresia-Tracheoesophageal Fistula. J Pediatr Gastroenterol Nutr 2016;63:550-570; Holcomb GW et al. Holcomb and Ashcraft's Pediatric Surgery, 7ª ed., 2020.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q8 da UNIFESP 2025
{
  id:"q-adap25-008", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-toce", assuntoId:"ass-toce-cicatrizacao",
  enunciado:"Homem, 41 anos, vítima de acidente de moto há 9 dias, com fratura exposta de tíbia no terço médio tratada com fixação externa e desbridamentos seriados. O defeito de partes moles na face anteromedial da perna mede 7 x 5 cm, tem leito limpo e bordas bem vascularizadas, mas expõe 4 cm de superfície óssea sem periósteo. Qual é a melhor opção de cobertura?",
  alternativas:[{id:"A",texto:"Enxerto de pele total retirado da região inguinal, fixado com pontos de chuleio."},{id:"B",texto:"Enxerto de pele parcial aplicado diretamente sobre o osso, com curativo compressivo."},{id:"C",texto:"Retalho muscular local, com enxerto de pele parcial sobre o músculo."},{id:"D",texto:"Terapia por pressão negativa isolada, até o fechamento por segunda intenção."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: a ferida tem **leito limpo** e boa vascularização das bordas (pós-desbridamento), mas **expõe 4 cm de osso sem periósteo**, em fratura exposta de tíbia. Osso sem periósteo não oferece leito vascular para um enxerto de pele; é preciso levar tecido bem vascularizado até ele, no caso um **retalho muscular local** (por exemplo, o gastrocnêmio medial no terço proximal e médio da perna), coberto por enxerto de pele parcial. A cobertura precoce da fratura exposta reduz a infecção e a osteomielite. A está errada porque o enxerto de pele total também depende de leito vascularizado e não pega sobre osso sem periósteo. B está errada pelo mesmo motivo: o enxerto de pele parcial diretamente sobre o osso desprovido de periósteo não integra. D está errada porque a pressão negativa isolada pode servir de ponte, mas não cobre osso exposto de 4 cm e a espera por segunda intenção aumenta o risco de infecção óssea.",
  explicacoesAlternativas:{},
  referencias:"British Orthopaedic Association/BAPRAS. Standards for the Management of Open Fractures of the Lower Limb (BOAST), 2017; Gustilo RB, Anderson JT. J Bone Joint Surg Am 1976;58:453-8; Thorne CH et al. Grabb and Smith's Plastic Surgery, 8ª ed., 2019.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q9 da UNIFESP 2025
{
  id:"q-adap25-009", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-cirvascular", assuntoId:"ass-cirvasc-aneurisma",
  enunciado:"Mulher, 67 anos, tabagista de longa data e hipertensa, assintomática, realiza ultrassonografia de abdome por outra indicação, que mostra aneurisma de aorta abdominal infrarrenal. A angiotomografia confirma diâmetro máximo de 5,3 cm, colo proximal de 28 mm de extensão e anatomia favorável à correção endovascular. O risco cirúrgico é baixo e a expectativa de vida é superior a 5 anos. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Vigilância com ultrassonografia a cada 6 meses, até que o diâmetro atinja 5,5 cm no seguimento."},{id:"B",texto:"Reparo eletivo, endovascular ou aberto, porque na mulher o limiar é de 5,0 cm."},{id:"C",texto:"Controle do tabagismo e da pressão arterial, com nova ultrassonografia de controle em 3 anos."},{id:"D",texto:"Aguardar o aparecimento de dor abdominal ou de crescimento rápido do diâmetro para indicar o reparo."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **mulher**, aneurisma infrarrenal **assintomático** de **5,3 cm**, com **anatomia favorável**, **risco cirúrgico baixo** e **expectativa de vida acima de 5 anos**. O limiar de reparo eletivo é de **5,5 cm no homem e de 5,0 cm na mulher**, porque as mulheres têm aortas menores e rompem com diâmetros menores; com 5,3 cm, o reparo está indicado, por técnica endovascular (anatomia favorável) ou aberta. A está errada porque aplica o limiar masculino de 5,5 cm a uma mulher; a vigilância semestral não é a conduta com o limiar já ultrapassado. C está errada porque o intervalo de 3 anos serve a aneurismas pequenos (cerca de 3,0 a 3,9 cm), e controlar o tabagismo e a pressão é necessário, mas não basta aqui. D está errada porque dor e crescimento rápido são indicações adicionais de reparo, e não condições para esperar quando o diâmetro já passa do limiar.",
  explicacoesAlternativas:{},
  referencias:"Wanhainen A et al. European Society for Vascular Surgery (ESVS) 2024 Clinical Practice Guidelines on the Management of Abdominal Aorto-Iliac Artery Aneurysms. Eur J Vasc Endovasc Surg 2024;67:192-331; Chaikof EL et al. SVS Practice Guidelines on AAA. J Vasc Surg 2018;67:2-77.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q10 da UNIFESP 2025
{
  id:"q-adap25-010", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-desenhosestudo",
  enunciado:"Em um ensaio clínico randomizado sobre um novo anticoagulante, a sequência de alocação foi gerada por computador e guardada em envelopes opacos, selados e numerados em ordem, abertos pelo pesquisador somente depois da inclusão do participante no estudo. Qual é a principal finalidade desse procedimento?",
  alternativas:[{id:"A",texto:"Evitar o viés de aferição, ao impedir que os avaliadores saibam qual grupo recebeu o novo anticoagulante."},{id:"B",texto:"Evitar o viés de desempenho, porque a equipe passa a cuidar igualmente dos participantes dos dois grupos."},{id:"C",texto:"Evitar o viés de seleção, porque quem recruta não consegue prever nem influenciar o grupo do próximo participante."},{id:"D",texto:"Evitar o viés de atrito, porque garante o seguimento de todos os participantes até o fim do estudo."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: a sequência foi **gerada por computador** (geração da sequência aleatória) e **guardada em envelopes opacos, selados e numerados, abertos só após a inclusão** do participante: esse é o mecanismo de **ocultação da alocação** (allocation concealment), que impede quem recruta de conhecer ou prever o próximo grupo e, com isso, de escolher quem entra em cada braço, ou seja, o **viés de seleção**. Não se confunde com o cegamento, que ocorre depois da randomização. A está errada porque o viés de aferição é evitado pelo cegamento dos avaliadores de desfecho, e os envelopes não escondem o grupo depois da alocação. B está errada porque o viés de desempenho é evitado pelo cegamento de participantes e equipe; aqui o tratamento, depois de aberto o envelope, é conhecido. D está errada porque o viés de atrito decorre das perdas de seguimento e se trata com a análise por intenção de tratar e com o seguimento ativo, não com envelopes.",
  explicacoesAlternativas:{},
  referencias:"Higgins JPT et al. (ed.). Cochrane Handbook for Systematic Reviews of Interventions, versão 6.4, 2023 (ferramenta RoB 2); Schulz KF et al. CONSORT 2010 Statement. BMJ 2010;340:c332.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q11 da UNIFESP 2025
{
  id:"q-adap25-011", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-abdagudo", assuntoId:"ass-diverticulite",
  enunciado:"Mulher, 63 anos, com doença diverticular conhecida, procura o pronto-socorro com dor em fossa ilíaca esquerda há 4 dias, febre de 38,3 °C e inapetência. Exame físico: PA 126/78 mmHg, FC 94 bpm, dor à palpação da fossa ilíaca esquerda, sem sinais de peritonite; tolera líquidos por via oral. Leucócitos de 14.800/mm³. A tomografia de abdome mostra espessamento da parede do sigmoide, densificação da gordura adjacente e coleção pericólica de 2 cm, sem ar nem líquido livre na cavidade. Qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Antibioticoterapia com cobertura de gram-negativos e anaeróbios, sem drenagem, com reavaliação seriada."},{id:"B",texto:"Drenagem percutânea do abscesso guiada por tomografia, associada a antibióticos por via endovenosa."},{id:"C",texto:"Sigmoidectomia de urgência com anastomose primária, para evitar a progressão para peritonite."},{id:"D",texto:"Colonoscopia imediata para excluir neoplasia e definir a extensão da doença diverticular."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **diverticulite complicada com abscesso pericólico de 2 cm** (Hinchey I/II), **sem ar livre**, **sem peritonite** e **paciente estável**, com PA de 126/78 mmHg, **FC de 94 bpm** e boa tolerância oral. Abscessos pequenos, **menores que 3 cm**, respondem ao tratamento clínico com antibióticos e acompanhamento, sem drenagem. B está errada porque a drenagem percutânea é indicada a abscessos maiores, em geral a partir de **3 cm** (algumas diretrizes usam 4 a 5 cm), e uma coleção de 2 cm nem oferece janela segura para a punção. C está errada porque a cirurgia de urgência fica para peritonite purulenta ou fecal, instabilidade ou falha do tratamento clínico, nada disso presente. D está errada porque a colonoscopia na fase aguda de uma diverticulite complicada aumenta o risco de perfuração; ela é feita depois de cerca de 6 a 8 semanas, para excluir neoplasia.",
  explicacoesAlternativas:{},
  referencias:"Hall J et al. ASCRS Clinical Practice Guidelines for the Management of Left-Sided Colonic Diverticulitis. Dis Colon Rectum 2020;63:728-747; Sartelli M et al. 2020 update of the WSES guidelines for acute colonic diverticulitis in the emergency setting. World J Emerg Surg 2020;15:32.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q12 da UNIFESP 2025
{
  id:"q-adap25-012", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-cirtoracica", assuntoId:"ass-cirtorax-pleura",
  enunciado:"Homem, 54 anos, etilista, tratado há 8 dias de pneumonia comunitária à direita, mantém febre de 38,6 °C e dor pleurítica, apesar de antibioticoterapia endovenosa adequada. A radiografia de tórax mostra derrame pleural que ocupa cerca de um terço do hemitórax direito. A toracocentese obtém líquido turvo, com pH de 6,9, glicose de 28 mg/dL e desidrogenase lática de 2.400 U/L; o Gram mostra cocos Gram-positivos em cadeias. Qual é a conduta mais adequada, além de manter o antibiótico?",
  alternativas:[{id:"A",texto:"Toracocentese de alívio diária, até a cultura do líquido definir o tratamento."},{id:"B",texto:"Antibioticoterapia por 6 semanas, com nova toracocentese se houver piora clínica."},{id:"C",texto:"Decorticação por toracotomia imediata, indicada quando o pH do líquido é menor que 7,2."},{id:"D",texto:"Drenagem torácica fechada, com dreno tubular em selo d'água, e controle por imagem."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: pneumonia seguida de **derrame que persiste com febre** após 8 dias de antibiótico, líquido **turvo**, **pH de 6,9** (abaixo de 7,2), **glicose de 28 mg/dL** (abaixo de 40 mg/dL), **desidrogenase lática de 2.400 U/L** (acima de 1.000 U/L) e **Gram positivo**: derrame parapneumônico complicado, que evolui como empiema. Esses achados indicam a drenagem pleural com dreno tubular em selo d'água, associada ao antibiótico; a falha da drenagem leva a fibrinolítico intrapleural ou a videotoracoscopia. A está errada porque a toracocentese repetida não drena de modo contínuo um líquido espesso e infectado. B está errada porque só o antibiótico não esteriliza o espaço pleural infectado, e esperar a piora aumenta a espessura do exsudato e a necessidade de cirurgia. C está errada porque a decorticação é uma cirurgia de fase tardia (encarceramento pulmonar), e o pH baixo indica drenagem, não toracotomia.",
  explicacoesAlternativas:{},
  referencias:"Roberts ME et al. BTS Guideline for Pleural Disease. Thorax 2023;78(Suppl 3):s1-s42; Bedawi EO et al. ERS/ESTS statement on the management of pleural infection in adults. Eur Respir J 2023;61:2201062.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q13 da UNIFESP 2025
{
  id:"q-adap25-013", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-cirtoracica", assuntoId:"ass-cirtorax-neoplasia",
  enunciado:"Homem, 64 anos, tabagista, apresenta tumor de 3,5 cm no lobo superior direito, com biópsia transtorácica de adenocarcinoma. A tomografia de tórax mostra linfonodo paratraqueal direito (estação 4R) de 12 mm no menor eixo. O PET-CT evidencia captação intensa no tumor (SUVmax de 9,1) e no linfonodo 4R (SUVmax de 6,3), sem outras lesões à distância; a ressonância de crânio é normal. A função pulmonar e a avaliação cardíaca são compatíveis com lobectomia. Qual é a conduta mais adequada antes de definir o tratamento?",
  alternativas:[{id:"A",texto:"Lobectomia superior direita com linfadenectomia mediastinal, pois o PET-CT indica doença ressecável."},{id:"B",texto:"Confirmação histológica do linfonodo 4R por punção guiada por ultrassom endobrônquico (EBUS)."},{id:"C",texto:"Quimioterapia sistêmica de imediato, pois a captação do linfonodo ao PET-CT estabelece o estádio N2."},{id:"D",texto:"Repetição do PET-CT em 3 meses, para diferenciar linfonodo inflamatório de metastático."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: adenocarcinoma de **3,5 cm** (T2), **linfonodo 4R de 12 mm** (acima de 10 mm) com **captação ao PET-CT (SUVmax de 6,3)** e sem metástases à distância. O PET-CT tem especificidade limitada nos linfonodos do mediastino (inflamação e granulomas captam), e o achado de N2 muda o tratamento, que deixa de ser cirurgia isolada. Por isso, o linfonodo com captação deve ser confirmado por amostra histológica, de preferência pelo método menos invasivo, a punção por ultrassonografia endobrônquica (EBUS-TBNA); se o resultado for negativo e a suspeita persistir, completa-se com mediastinoscopia. A está errada porque o PET-CT não basta para definir o estádio ganglionar: operar sem confirmar o linfonodo expõe uma doença N2 a cirurgia isolada, e, se a captação for falso-positiva, o planejamento do tratamento fica sem base. C está errada porque a captação, sozinha, não estabelece o estádio e o tratamento sistêmico depende da prova histológica. D está errada porque esperar 3 meses atrasa o tratamento de um câncer potencialmente curável sem resolver a dúvida.",
  explicacoesAlternativas:{},
  referencias:"Silvestri GA et al. Methods for Staging Non-small Cell Lung Cancer: Diagnosis and Management of Lung Cancer, 3ª ed., ACCP Guidelines. Chest 2013;143(5 Suppl):e211S-e250S; De Leyn P et al. ESTS guidelines for preoperative lymph node staging for non-small cell lung cancer. Eur J Cardiothorac Surg 2014;45:787-798.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q14 da UNIFESP 2025
{
  id:"q-adap25-014", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-cirtoracica", assuntoId:"ass-cirtorax-viaaerea",
  enunciado:"Mulher, 29 anos, relata dispneia aos esforços e estridor há 4 meses, depois de 3 semanas de intubação orotraqueal em unidade de terapia intensiva por pneumonia grave. A broncoscopia rígida mostra estenose traqueal cicatricial, circunferencial, de 1,5 cm de extensão, situada a 3 cm abaixo das cordas vocais, com mucosa sem inflamação ativa. A tomografia confirma segmento estenosado único. A paciente está em bom estado clínico. Qual é o tratamento definitivo mais adequado?",
  alternativas:[{id:"A",texto:"Dilatações broncoscópicas seriadas, mantidas a cada 3 meses como tratamento definitivo."},{id:"B",texto:"Prótese traqueal metálica autoexpansível, que dispensa uma nova abordagem cirúrgica."},{id:"C",texto:"Ressecção cirúrgica do segmento estenosado, com anastomose término-terminal."},{id:"D",texto:"Corticoterapia sistêmica prolongada e traqueostomia abaixo da estenose."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **intubação por 3 semanas** (principal causa de estenose traqueal adquirida), sintomas há **4 meses**, estenose **cicatricial e circunferencial**, **curta (1,5 cm)**, **única** e **sem inflamação ativa**, em paciente com bom estado clínico. Estenose cicatricial curta e madura tem tratamento definitivo cirúrgico, a ressecção do segmento (que pode chegar a cerca de 4 cm) com anastomose término-terminal, com boa taxa de sucesso. A está errada porque a dilatação isolada tem alta taxa de recorrência na estenose cicatricial circunferencial; serve de ponte ou a quem não opera. B está errada porque a prótese metálica autoexpansível é desaconselhada na doença benigna, já que se incorpora à mucosa, é difícil de retirar e agrava a estenose. D está errada porque o corticoide não desfaz a fibrose madura, e a traqueostomia abaixo da estenose não trata a obstrução.",
  explicacoesAlternativas:{},
  referencias:"Grillo HC. Surgery of the Trachea and Bronchi. Hamilton: BC Decker, 2004; FDA Public Health Notification: Complications from Metallic Tracheal Stents in Patients with Benign Airway Disorders, 2005.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q15 da UNIFESP 2025
{
  id:"q-adap25-015", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-urologia", assuntoId:"ass-uro-oncologia",
  enunciado:"Homem, 67 anos, tabagista, apresenta hematúria macroscópica indolor. A cistoscopia mostra três lesões papilares de até 2 cm, e a ressecção transuretral foi completa. A anatomia patológica revela carcinoma urotelial papilar de alto grau, restrito à mucosa (pTa), com músculo detrusor presente na amostra e sem carcinoma in situ associado. A urotomografia não mostra lesão em vias urinárias altas nem linfonodomegalias. Qual é o tratamento complementar mais adequado?",
  alternativas:[{id:"A",texto:"Cistectomia radical com linfadenectomia pélvica imediata, por se tratar de tumor de alto grau da bexiga."},{id:"B",texto:"Instilação única de mitomicina no pós-operatório imediato, sem outro tratamento adjuvante."},{id:"C",texto:"Imunoterapia intravesical com BCG, em esquema de indução semanal seguido de manutenção prolongada."},{id:"D",texto:"Quimioterapia sistêmica com cisplatina e gencitabina, seguida de nova ressecção transuretral."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: tumor **papilar, de alto grau e restrito à mucosa (pTa)**, **múltiplo (3 lesões)**, com **músculo na amostra** (sem invasão da muscular própria) e **sem carcinoma in situ**: câncer de bexiga não músculo-invasivo de **risco alto**. A BCG intravesical, com indução semanal de 6 semanas e manutenção por 1 a 3 anos, é o tratamento complementar padrão, porque reduz a recorrência e a progressão. A está errada porque a cistectomia imediata é reservada a tumores de risco muito alto (por exemplo, T1 de alto grau com fatores agravantes) ou à falha da BCG. B está errada porque a dose única de quimioterapia intravesical é suficiente apenas para tumores de risco baixo, solitários e de baixo grau. D está errada porque a quimioterapia sistêmica com cisplatina é tratamento do tumor músculo-invasivo, e não da doença restrita à mucosa.",
  explicacoesAlternativas:{},
  referencias:"Babjuk M et al. EAU Guidelines on Non-muscle-invasive Bladder Cancer (TaT1 and CIS), edição 2024; Holzbeierlein JM et al. Diagnosis and Treatment of Non-Muscle Invasive Bladder Cancer: AUA/SUO Guideline, 2024 (J Urol 2024;211:533-538).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q16 da UNIFESP 2025
{
  id:"q-adap25-016", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-urologia", assuntoId:"ass-uro-prostata",
  enunciado:"Homem, 66 anos, queixa-se há 2 anos de jato urinário fraco, noctúria 3 vezes por noite e sensação de esvaziamento incompleto, com pontuação de 21 no escore internacional de sintomas prostáticos (IPSS). Não teve retenção urinária, hematúria nem infecção. Já reduziu a ingestão de líquidos à noite, sem melhora. Exames: creatinina de 1,0 mg/dL; urina tipo 1 normal; PSA de 3,8 ng/mL; ultrassonografia com próstata de 62 g e resíduo pós-miccional de 80 mL. Qual é o tratamento medicamentoso inicial mais adequado?",
  alternativas:[{id:"A",texto:"Anticolinérgico em monoterapia, para tratar a noctúria e a sensação de esvaziamento incompleto."},{id:"B",texto:"Alfabloqueador em monoterapia, que reduz o volume da próstata e o risco de retenção a longo prazo."},{id:"C",texto:"Alfabloqueador associado a inibidor da 5-alfarredutase, pela próstata aumentada e pelo risco de progressão."},{id:"D",texto:"Ressecção transuretral da próstata como primeira escolha, por IPSS acima de 20 pontos."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: sintomas obstrutivos e de enchimento com **IPSS de 21** (grave), **próstata de 62 g** (acima de 30 g), **PSA de 3,8 ng/mL** (acima de 1,5 ng/mL) e resíduo de 80 mL: hiperplasia prostática benigna com **aumento do volume**, que traz risco de progressão, retenção urinária e cirurgia. Nesse perfil, o alfabloqueador alivia os sintomas rápido e o inibidor da 5-alfarredutase (finasterida ou dutasterida) reduz o volume e previne a progressão; a associação é o tratamento recomendado. A está errada porque o anticolinérgico isolado, num homem com obstrução e resíduo, pode piorar o esvaziamento e precipitar retenção. B está errada porque o alfabloqueador alivia sintomas, mas não reduz o volume prostático nem previne a retenção e a cirurgia. D está errada porque a cirurgia fica para falha do tratamento clínico ou complicações (retenção, infecção de repetição, litíase, insuficiência renal), e não para a gravidade do escore isoladamente.",
  explicacoesAlternativas:{},
  referencias:"Lerner LB et al. Management of Lower Urinary Tract Symptoms Attributed to Benign Prostatic Hyperplasia: AUA Guideline. J Urol 2021;206:806-817 (emenda de 2023); Sociedade Brasileira de Urologia, consensos de HPB.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q17 da UNIFESP 2025
{
  id:"q-adap25-017", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-perioperatorio", assuntoId:"ass-acessovenoso",
  enunciado:"Homem, 58 anos, em choque séptico, recebe cateter venoso central pela veia jugular interna direita, sob orientação ultrassonográfica. Depois da dilatação do trajeto e da inserção do introdutor de 8,5 Fr, observa-se saída de sangue vermelho vivo e pulsátil pelo introdutor, e a ultrassonografia mostra o dispositivo no interior da artéria carótida comum, sem hematoma cervical em expansão. A pressão arterial é 92/58 mmHg. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Retirar o introdutor de imediato e fazer compressão manual local por pelo menos 10 minutos."},{id:"B",texto:"Introduzir um fio-guia e trocar o introdutor por um cateter venoso, aproveitando o trajeto dilatado."},{id:"C",texto:"Manter o introdutor, sem usá-lo, e chamar a cirurgia vascular para a retirada planejada."},{id:"D",texto:"Retirar o introdutor e puncionar a mesma veia, agora com uma agulha de calibre menor que a anterior."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **introdutor de 8,5 Fr** (grande calibre), dentro da **artéria carótida comum** (sangue vermelho vivo e pulsátil, confirmado à ultrassonografia), **sem hematoma em expansão** por enquanto. Quando um dispositivo calibroso (6 Fr ou mais) é colocado por engano numa artéria, ele deve ser **mantido no local, sem uso**, e a retirada deve ser planejada com a cirurgia vascular ou a radiologia intervencionista, com correção do orifício por sutura ou técnica endovascular. A está errada porque a compressão manual não consegue fechar um orifício arterial de 8,5 Fr no pescoço, e a retirada sem preparo pode causar hematoma cervical com compressão da via aérea, pseudoaneurisma ou acidente vascular cerebral. B está errada porque a troca pelo fio-guia manteria um cateter no interior da artéria e perpetuaria a lesão. D está errada porque, depois de retirar o introdutor, a nova punção só repete o risco e deixa o orifício arterial grande sem tratamento.",
  explicacoesAlternativas:{},
  referencias:"Bodenham A et al. Association of Anaesthetists of Great Britain and Ireland: Safe vascular access 2016. Anaesthesia 2016;71:573-585; Practice Guidelines for Central Venous Access 2020, ASA Task Force (Anesthesiology 2020;132:8-43; a recomendação sobre punção arterial inadvertida não pôde ser conferida no texto).",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q18 da UNIFESP 2025
{
  id:"q-adap25-018", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-gastro", assuntoId:"ass-doencapeptica",
  enunciado:"Homem, 49 anos, com dor epigástrica há 3 meses, realiza endoscopia digestiva alta que mostra úlcera duodenal de 7 mm, com fundo limpo e sem sinais de sangramento recente. O teste da urease na biópsia gástrica é positivo. Tem história de anafilaxia com amoxicilina, nunca foi tratado para Helicobacter pylori e não usa anti-inflamatórios. Qual é o esquema de erradicação de primeira linha mais adequado?",
  alternativas:[{id:"A",texto:"Inibidor de bomba de prótons, claritromicina e amoxicilina, durante 14 dias."},{id:"B",texto:"Inibidor de bomba de prótons, bismuto, tetraciclina e metronidazol, durante 14 dias."},{id:"C",texto:"Inibidor de bomba de prótons, claritromicina e metronidazol, durante 7 dias."},{id:"D",texto:"Inibidor de bomba de prótons por 8 semanas, testando a erradicação só se houver recidiva."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **úlcera duodenal com H. pylori positivo**, que deve ser erradicado para cicatrizar a úlcera e evitar a recidiva; **anafilaxia a amoxicilina** exclui os esquemas com penicilina; **paciente sem tratamento prévio**, com sensibilidade aos antibióticos desconhecida. O esquema quádruplo com bismuto (inibidor de bomba de prótons, subcitrato de bismuto, tetraciclina e metronidazol), por **14 dias**, não usa penicilina nem claritromicina e é recomendado como primeira linha nesse cenário, com taxa de erradicação alta mesmo sem teste de sensibilidade. A está errada porque contém amoxicilina, contraindicada pela anafilaxia. C está errada porque a combinação com claritromicina e metronidazol por apenas 7 dias é curta e depende da sensibilidade à claritromicina, hoje frequentemente reduzida; as diretrizes recomendam 14 dias. D está errada porque tratar apenas com inibidor de bomba de prótons cicatriza a úlcera, mas a infecção persiste e a recidiva é frequente; a erradicação deve ser feita junto, e não deixada para a recidiva.",
  explicacoesAlternativas:{},
  referencias:"Chey WD et al. ACG Clinical Guideline: Treatment of Helicobacter pylori Infection. Am J Gastroenterol 2024;119:1730-1753; Coelho LGV et al. IV Brazilian Consensus Conference on Helicobacter pylori infection. Arq Gastroenterol 2018;55:97-121.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q19 da UNIFESP 2025
{
  id:"q-adap25-019", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-orl", assuntoId:"ass-orl-vertigem",
  enunciado:"Homem, 63 anos, hipertenso, diabético e tabagista, procura o pronto-socorro com vertigem intensa e contínua, de início súbito há 5 horas, com vômitos e incapacidade de ficar de pé sem apoio. Nega perda auditiva, zumbido ou cefaleia. Exame físico: PA 168/94 mmHg; nistagmo horizontal que muda de direção conforme o olhar (para a direita no olhar à direita e para a esquerda no olhar à esquerda); teste do impulso cefálico sem sacada corretiva dos dois lados; desvio vertical dos olhos ao teste de cobertura alternada. Qual é o diagnóstico mais provável?",
  alternativas:[{id:"A",texto:"Acidente vascular cerebral isquêmico da circulação posterior."},{id:"B",texto:"Neurite vestibular, com perda aguda e unilateral da função do labirinto."},{id:"C",texto:"Doença de Ménière, em crise, com hidropsia endolinfática do labirinto."},{id:"D",texto:"Vertigem posicional paroxística benigna, por canalitíase do canal posterior."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **síndrome vestibular aguda** (vertigem contínua, vômitos, instabilidade) em paciente com **fatores de risco vasculares** e três achados do exame HINTS que indicam causa **central**: **nistagmo que muda de direção** com o olhar, **teste do impulso cefálico normal** (sem sacada corretiva) e **desvio vertical dos olhos (skew)**; basta um deles. Em quem tem nistagmo, o conjunto HINTS feito por examinador treinado é mais sensível que a tomografia e, em fase precoce, que a ressonância, para identificar o AVC de fossa posterior, e o resultado central leva à ressonância de crânio e ao tratamento como AVC. B está errada porque na neurite vestibular o impulso cefálico é anormal, o nistagmo é unidirecional e não há desvio vertical. C está errada porque a doença de Ménière traz crises recorrentes com perda auditiva flutuante, zumbido e plenitude, ausentes no caso. D está errada porque a VPPB dura segundos, é desencadeada pela mudança de posição da cabeça e não causa vertigem contínua.",
  explicacoesAlternativas:{},
  referencias:"Kattah JC et al. HINTS to diagnose stroke in the acute vestibular syndrome. Stroke 2009;40:3504-3510; Edlow JA et al. Guidelines for Reasonable and Appropriate Care in the Emergency Department 3 (GRACE-3): Acute dizziness and vertigo in the emergency department. Acad Emerg Med 2023.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q20 da UNIFESP 2025
{
  id:"q-adap25-020", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-ortopedia", assuntoId:"ass-orto-ligamentos",
  enunciado:"Homem, 24 anos, jogador amador de futebol, sofreu torção do joelho direito ao mudar de direção, sem contato com outro jogador, com estalido audível e impossibilidade de continuar a partida. Evoluiu com edema importante do joelho em poucas horas. Atendido 5 dias depois, apresenta derrame articular moderado, flexão limitada a cerca de 70° pela dor e sensação de falseio. As radiografias não mostram fraturas. Qual manobra tem a maior sensibilidade para confirmar a principal hipótese diagnóstica nessa fase?",
  alternativas:[{id:"A",texto:"Teste da gaveta anterior, com o joelho fletido a 90° e a tíbia tracionada para a frente."},{id:"B",texto:"Teste de Lachman, com o joelho fletido a cerca de 20° a 30° e translação anterior da tíbia."},{id:"C",texto:"Teste do pivot shift, com rotação interna e valgo durante a flexão do joelho."},{id:"D",texto:"Teste de McMurray, com rotação da tíbia durante a flexão e a extensão do joelho."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **torção sem contato**, **estalido**, **hemartrose** em poucas horas (edema importante) e **sensação de falseio**: lesão do **ligamento cruzado anterior**. Na fase aguda, com dor e derrame, o teste de Lachman, feito a **20° a 30° de flexão** (compatível com a flexão limitada a 70°), tem a maior sensibilidade (cerca de 85%, com especificidade de cerca de 94% na metanálise de Benjaminse et al.). A está errada porque a gaveta anterior a 90° exige flexão que o joelho não atinge, e o espasmo dos isquiotibiais e o derrame reduzem a sensibilidade nas lesões agudas. C está errada porque o pivot shift é muito específico (cerca de 98%), mas pouco sensível no joelho doloroso e sem relaxamento do paciente. D está errada porque o McMurray avalia lesão meniscal, e não o ligamento cruzado anterior.",
  explicacoesAlternativas:{},
  referencias:"Benjaminse A, Gokeler A, van der Schans CP. Clinical diagnosis of an anterior cruciate ligament rupture: a meta-analysis. J Orthop Sports Phys Ther 2006;36:267-288.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q21 da UNIFESP 2025
{
  id:"q-adap25-021", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-cardio", assuntoId:"ass-sca",
  imagemUrl:"dados/imagens/q-adap25-021.png", imagemLegenda:"Eletrocardiograma de 12 derivações da paciente (ilustração esquemática).",
  enunciado:"Mulher, 61 anos, hipertensa e dislipidêmica, é atendida em hospital sem serviço de hemodinâmica, 90 minutos depois do início de dor torácica intensa, em aperto, com sudorese. O eletrocardiograma de 12 derivações é mostrado na figura. PA 138/84 mmHg e FC 92 bpm, sem sinais de insuficiência cardíaca. Não há contraindicação à fibrinólise. O serviço de hemodinâmica mais próximo só poderá realizar a angioplastia cerca de 150 minutos após o primeiro contato médico. Qual é a conduta de reperfusão mais adequada?",
  alternativas:[{id:"A",texto:"Transferência para angioplastia primária, sem trombolítico, pois a angioplastia é o método preferível."},{id:"B",texto:"Fibrinólise imediata, seguida de transferência para angiografia coronária nas primeiras 24 horas."},{id:"C",texto:"Espera da dosagem seriada de troponina para confirmar o infarto antes de indicar a reperfusão coronária."},{id:"D",texto:"Anticoagulação plena e dupla antiagregação, reservando a reperfusão para a persistência da dor."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado e da figura: **dor típica há 90 minutos** (menos de 12 horas) e **supradesnivelamento convexo do segmento ST de V1 a V6**, com máximo em V2 e V3 (cerca de 4 mm), estendido a I e aVL e com infradesnivelamento recíproco em DIII e aVF (infarto anterior extenso, sem necessidade de esperar marcador), **sem contraindicação à fibrinólise** e **angioplastia só em 150 minutos**, acima do limite de **120 minutos** do primeiro contato médico até a passagem do fio-guia. Quando a angioplastia primária não pode ser feita nesse prazo, a fibrinólise deve ser aplicada logo, e o paciente é transferido para angiografia (estratégia farmacoinvasiva), em geral entre 2 e 24 horas, ou antes, se a reperfusão falhar. A está errada porque a preferência pela angioplastia só vale quando ela é possível dentro de 120 minutos; esperar 150 minutos perde o benefício. C está errada porque, no STEMI, a decisão de reperfundir é clínica e eletrocardiográfica e não aguarda troponina. D está errada porque anticoagulação e antiagregação são complementares e não substituem a reperfusão no infarto com supradesnível de ST.",
  explicacoesAlternativas:{},
  referencias:"Byrne RA et al. 2023 ESC Guidelines for the management of acute coronary syndromes. Eur Heart J 2023;44:3720-3826; Rao SV et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute Coronary Syndromes. Circulation 2025;151:e771-e862 (tempos e classes conferidos apenas em resumos).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q22 da UNIFESP 2025
{
  id:"q-adap25-022", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-endocrino", assuntoId:"ass-paratireoide",
  enunciado:"Mulher, 62 anos, assintomática, tem diagnóstico de hiperparatireoidismo primário feito em exames de rotina: cálcio total de 10,9 mg/dL (VR 8,6 a 10,3), PTH de 88 pg/mL (VR 15 a 65), 25-hidroxivitamina D de 34 ng/mL e creatinina de 0,8 mg/dL (taxa de filtração glomerular estimada de 82 mL/min/1,73 m²). Não tem litíase renal. A densitometria óssea mostra T-score de -1,2 na coluna lombar, de -1,6 no colo do fêmur e de -2,7 no terço distal do rádio. Qual dos achados abaixo, isoladamente, indica a paratireoidectomia?",
  alternativas:[{id:"A",texto:"Cálcio sérico de 10,9 mg/dL, que ultrapassa o limite superior da normalidade."},{id:"B",texto:"Idade de 62 anos, pois a cirurgia é indicada a todos os pacientes a partir dos 60 anos."},{id:"C",texto:"PTH de 88 pg/mL, que ultrapassa o limite superior da normalidade para o método."},{id:"D",texto:"T-score de -2,7 no terço distal do rádio, que caracteriza osteoporose pela densitometria."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: hiperparatireoidismo primário **assintomático**, com cálcio **0,6 mg/dL acima** do limite superior (10,9 contra 10,3 mg/dL), **idade de 62 anos**, **taxa de filtração glomerular de 82 mL/min/1,73 m²** (acima de 60), **sem litíase** e densitometria com **T-score de -2,7 no rádio distal**. Os critérios para operar o paciente assintomático são: cálcio mais de **1,0 mg/dL acima** do limite superior, **idade abaixo de 50 anos**, **T-score de -2,5 ou menos em qualquer sítio** (inclusive o terço distal do rádio, o mais afetado pelo excesso de PTH) ou fratura de fragilidade, filtração glomerular **abaixo de 60 mL/min/1,73 m²** e litíase ou hipercalciúria. A osteoporose do rádio é o único critério presente. A está errada porque a elevação de 0,6 mg/dL não atinge o limite de 1,0 mg/dL acima do normal. B está errada porque o critério de idade é ter menos de 50 anos, e não mais de 60. C está errada porque o valor do PTH, por si só, não define a indicação cirúrgica.",
  explicacoesAlternativas:{},
  referencias:"Bilezikian JP et al. Evaluation and Management of Primary Hyperparathyroidism: Summary Statement and Guidelines from the Fifth International Workshop. J Bone Miner Res 2022;37:2293-2314 (critérios conferidos na 4ª edição, J Clin Endocrinol Metab 2014;99:3561-3569; o texto da 5ª não pôde ser aberto).",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q23 da UNIFESP 2025
{
  id:"q-adap25-023", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-cardio", assuntoId:"ass-pcr",
  enunciado:"Homem, 60 anos, apresenta fibrilação ventricular presenciada na unidade de terapia intensiva e recupera a circulação espontânea após 2 choques e 9 minutos de reanimação. Permanece intubado, em ventilação mecânica, sem abrir os olhos nem obedecer a comandos. PA 102/62 mmHg (pressão arterial média de 75 mmHg), FC 96 bpm, temperatura de 36,4 °C e SpO2 de 100% com FiO2 de 100%. O eletrocardiograma não mostra supradesnivelamento do segmento ST. Qual é a conduta mais adequada nas primeiras horas, segundo as diretrizes da AHA de 2025 para os cuidados pós-parada?",
  alternativas:[{id:"A",texto:"Manter a FiO2 em 100% por 24 horas, para proteger o encéfalo contra nova hipóxia grave."},{id:"B",texto:"Aceitar pressão arterial média de 50 a 60 mmHg, para poupar o consumo de oxigênio do coração."},{id:"C",texto:"Hiperventilar até PaCO2 de 25 a 30 mmHg, para reduzir a pressão intracraniana."},{id:"D",texto:"Controle da temperatura com alvo constante entre 32 e 37,5 °C, prevenindo a febre."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: retorno da circulação espontânea após **11 minutos de parada em fibrilação ventricular** e paciente que **continua em coma** (não obedece a comandos), com **PAM de 75 mmHg**, **temperatura de 36,4 °C** e **SpO2 de 100% com FiO2 de 100%**. Nos adultos que permanecem em coma após o retorno da circulação, o cuidado pós-parada inclui o controle da temperatura com alvo constante dentro da faixa de 32 a 37,5 °C (por no mínimo 36 horas, na AHA 2025), evitando a febre, que piora a lesão cerebral. A está errada porque a hiperóxia prolongada é lesiva; a FiO2 deve ser reduzida assim que a saturação for medida de forma confiável (SpO2 entre 90% e 98% na AHA 2025). B está errada porque a hipotensão agrava a lesão cerebral e miocárdica pós-parada; a PAM deve ficar em 65 mmHg ou mais. C está errada porque a hiperventilação causa vasoconstrição cerebral e reduz o fluxo sanguíneo; a PaCO2 deve ficar em faixa normal (35 a 45 mmHg).",
  explicacoesAlternativas:{},
  referencias:"Part 11: Post-Cardiac Arrest Care. 2025 American Heart Association Guidelines for CPR and Emergency Cardiovascular Care. Circulation 2025;152 (valores conferidos em resumos da AHA, não no texto integral); Sociedade Brasileira de Cardiologia. Diretriz de Ressuscitação Cardiopulmonar e Cuidados Cardiovasculares de Emergência, 2019.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q24 da UNIFESP 2025
{
  id:"q-adap25-024", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-endocrino", assuntoId:"ass-hipofise",
  enunciado:"Homem, 44 anos, queixa-se há 3 anos de aumento do número do calçado e do tamanho das mãos, sudorese excessiva, artralgias, roncos e cefaleia. Tem hipertensão arterial e diabetes mellitus tipo 2 recentes. Exame físico: proeminência frontal e mandibular, espaçamento dos dentes e macroglossia. A dosagem de IGF-1 é 2,8 vezes o limite superior para a idade. Qual é o próximo exame para confirmar a principal hipótese diagnóstica?",
  alternativas:[{id:"A",texto:"Ressonância magnética de sela túrcica, que confirma o diagnóstico ao evidenciar o adenoma."},{id:"B",texto:"Dosagem de GH em amostra aleatória, com valor acima de 1 ng/mL confirmando a doença."},{id:"C",texto:"Teste de estímulo do GH com hipoglicemia insulínica, para avaliar a secreção hormonal."},{id:"D",texto:"Dosagem do GH após sobrecarga oral de 75 g de glicose, em que o hormônio não é suprimido."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **alterações acrais** (calçado, mãos, mandíbula, macroglossia), **sudorese**, **apneia (roncos)**, **hipertensão e diabetes** e **IGF-1 2,8 vezes acima do limite superior**: acromegalia. Com o IGF-1 elevado e o quadro clínico, a confirmação bioquímica é feita pela dosagem de GH após a **sobrecarga de 75 g de glicose**: na doença, o GH não suprime (nadir acima de 1 ng/mL; de 0,4 ng/mL em ensaios ultrassensíveis, adotado por parte dos consensos). A ressonância vem depois, para localizar o adenoma. A está errada porque a imagem só se pede depois da confirmação bioquímica, já que incidentalomas hipofisários são comuns. B está errada porque o GH é pulsátil e a dosagem aleatória não confirma nem afasta a doença. C está errada porque o teste de estímulo com hipoglicemia insulínica serve para diagnosticar a deficiência de GH, e não o excesso.",
  explicacoesAlternativas:{},
  referencias:"Katznelson L et al. Acromegaly: An Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab 2014;99:3933-3951.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q25 da UNIFESP 2025
{
  id:"q-adap25-025", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-cardio", assuntoId:"ass-ic",
  enunciado:"Homem, 58 anos, com cardiopatia isquêmica crônica e insuficiência cardíaca com fração de ejeção do ventrículo esquerdo de 30%, está em classe funcional II da NYHA e euvolêmico. Usa enalapril 20 mg duas vezes ao dia, carvedilol 25 mg duas vezes ao dia e furosemida 20 mg ao dia. PA 118/72 mmHg, FC 62 bpm em ritmo sinusal, potássio de 4,4 mEq/L e taxa de filtração glomerular estimada de 62 mL/min/1,73 m². Qual é a conduta mais adequada para otimizar o tratamento e reduzir a mortalidade?",
  alternativas:[{id:"A",texto:"Acrescentar ivabradina, para diminuir ainda mais a frequência cardíaca de repouso do paciente."},{id:"B",texto:"Associar espironolactona e um inibidor de SGLT2, como a dapagliflozina, ao tratamento."},{id:"C",texto:"Acrescentar digoxina em dose baixa, que reduz a mortalidade na disfunção sistólica grave."},{id:"D",texto:"Trocar o enalapril por hidralazina com dinitrato de isossorbida, superiores aos inibidores da ECA."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: insuficiência cardíaca com **fração de ejeção reduzida (30%)** já em uso de **inibidor da ECA e betabloqueador em doses-alvo**, **sem hipercalemia (K 4,4 mEq/L)**, **filtração glomerular de 62 mL/min/1,73 m²** (acima de 30) e **pressão de 118/72 mmHg**. O tratamento que reduz mortalidade se apoia em quatro classes: inibidor do sistema renina-angiotensina (ou sacubitril/valsartana), betabloqueador, antagonista mineralocorticoide e inibidor de SGLT2; faltam os dois últimos, que são associados. A está errada porque a ivabradina é indicada com FC de repouso de 70 bpm ou mais, em ritmo sinusal, apesar do betabloqueador em dose máxima, e aqui a FC é de 62 bpm. C está errada porque a digoxina alivia sintomas e reduz internações, mas não reduz mortalidade. D está errada porque a combinação de hidralazina com nitrato é alternativa para quem não tolera o inibidor da ECA ou reforço em pacientes negros sintomáticos, e não é superior a ele.",
  explicacoesAlternativas:{},
  referencias:"Rohde LEP et al. Diretriz Brasileira de Insuficiência Cardíaca Crônica e Aguda. Arq Bras Cardiol 2018;111:436-539, e atualização de 2021 (Arq Bras Cardiol 2021;116:1174-1212); McDonagh TA et al. 2021 ESC Guidelines for heart failure (Eur Heart J 2021;42:3599-3726) e atualização de 2023; Heidenreich PA et al. 2022 AHA/ACC/HFSA Guideline (Circulation 2022;145:e895-e1032).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q26 da UNIFESP 2025
{
  id:"q-adap25-026", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-geriatria", assuntoId:"ass-geriatria-demencia",
  enunciado:"Homem, 76 anos, é levado à consulta pela filha porque, há 2 anos, apresenta esquecimento flutuante, com dias de lucidez alternados com dias de confusão, e vê crianças dentro de casa, que descreve com detalhes. Dorme mal, grita e se debate durante o sono. Há 6 meses tem lentidão dos movimentos e rigidez leve nos membros. A tomografia de crânio mostra atrofia cortical discreta, e os exames laboratoriais são normais. Qual é o tratamento medicamentoso mais adequado para os sintomas cognitivos e psicóticos?",
  alternativas:[{id:"A",texto:"Haloperidol em baixa dose, associado ao biperideno para prevenir a rigidez muscular."},{id:"B",texto:"Memantina em monoterapia, que é a droga de escolha para as alucinações visuais."},{id:"C",texto:"Clonazepam em dose noturna, para controlar o sono e as alucinações."},{id:"D",texto:"Rivastigmina, inibidor da colinesterase que melhora cognição e alucinações."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **flutuação cognitiva**, **alucinações visuais bem formadas**, **transtorno comportamental do sono REM** (grita e se debate dormindo) e **parkinsonismo** surgido depois da alteração cognitiva: demência com corpos de Lewy, em que o déficit colinérgico é intenso. Os inibidores da colinesterase (rivastigmina ou donepezila) melhoram a cognição, as alucinações e a flutuação, e são a primeira escolha. A está errada porque os antipsicóticos típicos como o haloperidol provocam sensibilidade neuroléptica grave, com piora do parkinsonismo e da cognição; o biperideno (anticolinérgico) piora a confusão. B está errada porque a memantina tem benefício menor e não é a droga de escolha para alucinações. C está errada porque o clonazepam pode tratar o transtorno do sono REM, mas não as alucinações, e piora a cognição e o risco de quedas.",
  explicacoesAlternativas:{},
  referencias:"McKeith IG et al. Diagnosis and management of dementia with Lewy bodies: Fourth consensus report of the DLB Consortium. Neurology 2017;89:88-100.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q27 da UNIFESP 2025
{
  id:"q-adap25-027", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-infecto", assuntoId:"ass-atb",
  enunciado:"Homem, 71 anos, diabético, internado por pielonefrite complicada por obstrução ureteral por cálculo, evolui com febre de 39,2 °C, PA 104/62 mmHg, FC 112 bpm e lactato de 3,1 mmol/L. A hemocultura de duas amostras cresce Escherichia coli, e o antibiograma mostra produção de betalactamase de espectro estendido (ESBL), com resistência à ceftriaxona. Não há alergia a antibióticos, e a função renal é normal. Qual é o antibiótico mais adequado para a bacteremia?",
  alternativas:[{id:"A",texto:"Piperacilina-tazobactam, pois a cepa é sensível a ela no antibiograma realizado."},{id:"B",texto:"Meropenem, carbapenêmico de escolha para infecção grave por enterobactéria produtora de ESBL."},{id:"C",texto:"Cefepima em dose alta, que tem boa atividade contra bacilos gram-negativos resistentes."},{id:"D",texto:"Ceftriaxona em dose dobrada, associada a gentamicina nas primeiras 48 horas de tratamento."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **bacteremia por E. coli produtora de ESBL**, **resistente à ceftriaxona**, com sinais de sepse (**lactato de 3,1 mmol/L**, taquicardia, febre de 39,2 °C) e foco urinário complicado. Na bacteremia grave por enterobactéria produtora de ESBL, o carbapenêmico (meropenem) é o tratamento inicial de escolha; a troca para um fármaco oral ativo, como sulfametoxazol-trimetoprima ou uma quinolona, só vem depois, com a melhora clínica e a sensibilidade confirmada. A está errada porque, no estudo MERINO, a piperacilina-tazobactam não foi não inferior ao meropenem em bacteremia por E. coli e Klebsiella resistentes à ceftriaxona (mortalidade em 30 dias de 12,3% contra 3,7%), mesmo com sensibilidade in vitro. C está errada porque a cefepima também não é recomendada para ESBL: a hidrólise pela enzima e o efeito do inóculo falham em infecção grave. D está errada porque a ESBL hidrolisa a ceftriaxona, e o aumento da dose não vence a resistência; o aminoglicosídeo por 48 horas não fecha o tratamento da bacteremia.",
  explicacoesAlternativas:{},
  referencias:"Tamma PD et al. IDSA 2024 Guidance on the Treatment of Antimicrobial-Resistant Gram-Negative Infections. Clin Infect Dis 2024 (ciae403); Harris PNA et al. Effect of piperacillin-tazobactam vs meropenem on 30-day mortality (MERINO). JAMA 2018;320:984-994.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q28 da UNIFESP 2025
{
  id:"q-adap25-028", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-nefro", assuntoId:"ass-ira",
  enunciado:"Homem, 34 anos, foi encontrado caído em casa após uso de cocaína e permaneceu cerca de 14 horas imobilizado no chão. Na admissão, está consciente, com dor e edema na coxa direita, PA 104/62 mmHg, FC 108 bpm e urina cor de coca-cola. Exames: creatinina de 2,1 mg/dL (basal de 0,9), ureia de 78 mg/dL, potássio de 5,4 mEq/L e CK de 42.000 U/L; urina tipo 1 com pesquisa de hemoglobina positiva e sem hemácias. Qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Furosemida endovenosa em dose alta, para aumentar a diurese e eliminar a mioglobina do plasma."},{id:"B",texto:"Diálise de urgência imediata, pela creatinina acima de duas vezes o valor basal."},{id:"C",texto:"Reposição precoce e vigorosa de cristaloide isotônico, monitorando diurese e potássio."},{id:"D",texto:"Restrição hídrica, por se tratar de lesão renal aguda oligúrica com hiperpotassemia associada."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **14 horas de imobilização**, **urina cor de coca-cola com teste de hemoglobina positivo e sem hemácias** (mioglobinúria), **CK de 42.000 U/L** (acima de 5.000 U/L, risco de lesão renal), **creatinina de 2,1 mg/dL com basal de 0,9** e **potássio de 5,4 mEq/L**: rabdomiólise com lesão renal aguda, em paciente **hipovolêmico (PA 104/62 mmHg, FC 108 bpm)** pelo sequestro de líquido no músculo lesado. O pilar do tratamento é a reposição precoce e intensa de volume com cristaloide isotônico, para manter diurese alta, monitorando a diurese, o potássio e o cálcio. A está errada porque o diurético sem volume piora a hipovolemia e a lesão tubular; seu uso fica para sobrecarga depois da reposição. B está errada porque a creatinina de 2,1 mg/dL, sem acidose grave, hipercalemia refratária, sobrecarga ou uremia, não indica diálise imediata. D está errada porque a restrição de líquidos agrava a hipovolemia e a obstrução tubular por mioglobina.",
  explicacoesAlternativas:{},
  referencias:"Bosch X, Poch E, Grau JM. Rhabdomyolysis and acute kidney injury. N Engl J Med 2009;361:62-72; KDIGO Clinical Practice Guideline for Acute Kidney Injury. Kidney Int Suppl 2012;2:1-138.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q29 da UNIFESP 2025
{
  id:"q-adap25-029", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-saudefamilia", assuntoId:"ass-assistenciasocial",
  enunciado:"Homem, 34 anos, tem paraplegia permanente por lesão medular, decorrente de acidente de trânsito há 3 anos, e depende de cadeira de rodas. Antes do acidente, trabalhava sem registro em carteira e nunca contribuiu para a Previdência Social. Mora com a mãe, que é diarista, e a renda mensal da família é inferior a um quarto do salário mínimo por pessoa. Na unidade básica de saúde, a assistente social orienta a solicitar um benefício. A qual benefício ele tem direito?",
  alternativas:[{id:"A",texto:"Auxílio por incapacidade temporária, pago enquanto durar o tratamento da lesão medular."},{id:"B",texto:"Aposentadoria por incapacidade permanente, concedida em razão da paraplegia irreversível."},{id:"C",texto:"Benefício de Prestação Continuada de um salário mínimo, por ser pessoa com deficiência e baixa renda."},{id:"D",texto:"Auxílio-acidente, pago como indenização pelas sequelas definitivas do acidente de trânsito que sofreu."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **deficiência permanente** (paraplegia, impedimento de longo prazo), **nunca contribuiu para a Previdência** e **renda familiar per capita inferior a um quarto do salário mínimo**. O Benefício de Prestação Continuada (BPC/LOAS), de um salário mínimo mensal, é um benefício da assistência social, não exige contribuição e é devido à pessoa com deficiência, ou ao idoso com 65 anos ou mais, cuja renda familiar per capita seja inferior a um quarto do salário mínimo. A, B e D são benefícios previdenciários, que dependem da qualidade de segurado, isto é, de contribuição: A é o auxílio por incapacidade temporária, B a aposentadoria por incapacidade permanente e D o auxílio-acidente, pago como indenização ao segurado com sequela; o paciente não é segurado.",
  explicacoesAlternativas:{},
  referencias:"Constituição Federal de 1988, art. 203, V; Lei nº 8.742/1993 (LOAS), art. 20, com redação da Lei nº 14.176/2021; Lei nº 8.213/1991 (benefícios da Previdência Social).",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q30 da UNIFESP 2025
{
  id:"q-adap25-030", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-infecto", assuntoId:"ass-sepse",
  imagemUrl:"dados/imagens/q-adap25-030.png", imagemLegenda:"Traçado do monitor na derivação DII (ilustração esquemática).",
  enunciado:"Mulher, 72 anos, com pneumonia comunitária grave, evolui com choque séptico: depois da infusão de 30 mL/kg de cristaloide balanceado, mantém PA de 78/42 mmHg (pressão arterial média de 54 mmHg), lactato de 4,6 mmol/L e oligúria. O ritmo, de início recente, é mostrado no traçado do monitor (derivação DII) da figura. O antibiótico já foi administrado. Qual vasopressor deve ser a primeira escolha?",
  alternativas:[{id:"A",texto:"Dopamina em dose intermediária, por aumentar a pressão e o débito cardíaco."},{id:"B",texto:"Adrenalina em infusão contínua, por seu efeito vasopressor e inotrópico potente."},{id:"C",texto:"Noradrenalina em infusão contínua, com monitorização da pressão arterial."},{id:"D",texto:"Fenilefrina em infusão contínua, por não ter efeito sobre a frequência cardíaca."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado e da figura: **choque séptico** (PAM de 54 mmHg e **lactato de 4,6 mmol/L** persistentes após **30 mL/kg** de cristaloide), com **fibrilação atrial de resposta ventricular rápida** no traçado (intervalos RR irregulares, ausência de onda P e cerca de **140 bpm**). A noradrenalina é o vasopressor de primeira linha no choque séptico, e a campanha de sobrevivência à sepse a recomenda sobre dopamina e adrenalina; na presença de taquiarritmia, é a que menos a agrava. A está errada porque a dopamina causa mais taquiarritmia, inclusive fibrilação atrial, e está associada a maior mortalidade que a noradrenalina. B está errada porque a adrenalina é droga de segunda ou terceira linha, adicionada quando a noradrenalina e a vasopressina não bastam, e pode piorar a taquicardia e o lactato. D está errada porque a fenilefrina é vasoconstritor puro, reduz o débito cardíaco e não é recomendada como primeira escolha no choque séptico. A vasopressina é acrescentada à noradrenalina quando a dose dela sobe.",
  explicacoesAlternativas:{},
  referencias:"Surviving Sepsis Campaign: international guidelines for management of sepsis and septic shock 2026. Intensive Care Med 2026 (doi 10.1007/s00134-026-08361-1; recomendações conferidas em resumos); Evans L et al. Surviving Sepsis Campaign 2021. Crit Care Med 2021;49:e1063-e1143.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q31 da UNIFESP 2025
{
  id:"q-adap25-031", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-nefro", assuntoId:"ass-drc",
  enunciado:"Homem, 61 anos, com doença renal diabética, taxa de filtração glomerular estimada de 26 mL/min/1,73 m² e proteinúria de 2,1 g/24 h, tem PA de 156/92 mmHg e inicia enalapril 10 mg ao dia. Dez dias depois, a creatinina passa de 2,0 para 2,4 mg/dL e o potássio é 5,0 mEq/L; a PA é 138/82 mmHg, e o paciente está assintomático, com peso estável e sem edema. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Suspender o enalapril, pois o aumento da creatinina indica lesão renal pelo medicamento."},{id:"B",texto:"Manter o enalapril, com nova dosagem de creatinina e de potássio em uma a duas semanas."},{id:"C",texto:"Reduzir o enalapril à metade e associar espironolactona para controlar o potássio."},{id:"D",texto:"Trocar o enalapril por anlodipino, que protege o rim sem alterar a creatinina."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: doença renal diabética com **proteinúria de 2,1 g/24 h** (indicação de bloqueio do sistema renina-angiotensina), **aumento da creatinina de 2,0 para 2,4 mg/dL (20%)** em 10 dias, **potássio de 5,0 mEq/L** (abaixo de 5,5 mEq/L) e paciente **sem hipovolemia**. A queda da pressão intraglomerular com o inibidor da ECA eleva a creatinina de forma esperada; aceita-se aumento de até **30%** nas primeiras semanas, e o medicamento deve ser mantido, com nova dosagem de creatinina e potássio em 1 a 2 semanas. A está errada porque suspender por um aumento de 20% retira o principal tratamento antiproteinúrico; só se suspende se o aumento passar de 30%, se o potássio ficar em 5,5 mEq/L ou mais de forma persistente ou se houver hipovolemia. C está errada porque a espironolactona aumenta o potássio, e não o controla. D está errada porque o anlodipino controla a pressão, mas não reduz a proteinúria nem tem o mesmo efeito de proteção renal na doença diabética.",
  explicacoesAlternativas:{},
  referencias:"KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int 2024;105(4S):S117-S314; KDIGO 2021 Clinical Practice Guideline for the Management of Blood Pressure in CKD. Kidney Int 2021;99(3S):S1-S87.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q32 da UNIFESP 2025
{
  id:"q-adap25-032", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-cardio", assuntoId:"ass-ic",
  enunciado:"Homem, 72 anos, com insuficiência cardíaca de fração de ejeção de 28% e uso crônico de furosemida 40 mg por via oral ao dia, procura o pronto-socorro com ganho de 7 kg em duas semanas, ortopneia, edema de membros inferiores até as coxas e estertores até os ápices pulmonares. PA 138/82 mmHg, FC 96 bpm, SpO2 de 91% em ar ambiente, extremidades quentes e bem perfundidas, creatinina de 1,2 mg/dL. Qual é a estratégia diurética inicial mais adequada?",
  alternativas:[{id:"A",texto:"Dobrar a furosemida oral e reavaliar em uma semana, no ambulatório de insuficiência cardíaca."},{id:"B",texto:"Furosemida endovenosa em bolus de 20 mg, dose menor que a oral para evitar piora da função renal."},{id:"C",texto:"Dobutamina em infusão contínua, para melhorar a diurese pelo aumento do débito cardíaco."},{id:"D",texto:"Furosemida endovenosa em bolus, em dose não inferior à oral, com reavaliação em 2 horas."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **congestão importante** (7 kg em 2 semanas, ortopneia, edema até as coxas, estertores e SpO2 de 91%) em paciente com **perfusão preservada** (extremidades quentes, PA de 138/82 mmHg): perfil quente e congesto. Quem já usa diurético de alça por via oral recebe furosemida endovenosa em bolus, com dose **no mínimo igual à dose oral diária** (aqui, pelo menos 40 mg), e a resposta é avaliada cedo, com diurese e natriurese em cerca de 2 horas; se for insuficiente, dobra-se a dose. A está errada porque o paciente tem congestão com hipoxemia e precisa de internação e diurético endovenoso, pois a absorção intestinal está reduzida pelo edema da parede. B está errada porque 20 mg por via endovenosa é dose menor que a oral habitual, o que costuma ser ineficaz em quem já usa diurético. C está errada porque a dobutamina é reservada ao baixo débito com hipoperfusão, ausente neste caso, e pode causar arritmias.",
  explicacoesAlternativas:{},
  referencias:"McDonagh TA et al. 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure. Eur Heart J 2021;42:3599-3726; Felker GM et al. Diuretic strategies in patients with acute decompensated heart failure (DOSE). N Engl J Med 2011;364:797-805; Rohde LEP et al. Diretriz Brasileira de Insuficiência Cardíaca Crônica e Aguda. Arq Bras Cardiol 2018;111:436-539.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q33 da UNIFESP 2025
{
  id:"q-adap25-033", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-nefro", assuntoId:"ass-hidroeletrolitico",
  enunciado:"Homem, 58 anos, etilista e desnutrido, é trazido ao pronto-socorro após uma crise convulsiva tônico-clônica generalizada. A esposa relata vômitos há 5 dias e ingestão de grande volume de água. Está sonolento, hipovolêmico clinicamente, com PA 100/60 mmHg. Exames: sódio de 108 mEq/L, potássio de 2,8 mEq/L, glicemia de 96 mg/dL e osmolaridade plasmática de 224 mOsm/kg. A convulsão cessou espontaneamente. Qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Restrição hídrica e nova dosagem de sódio em 24 horas, como na hiponatremia crônica assintomática."},{id:"B",texto:"Soro fisiológico a 0,9%, 1.000 mL em 1 hora, para repor o volume e corrigir o sódio com rapidez."},{id:"C",texto:"Tolvaptana por via oral, para corrigir o sódio de forma rápida e segura nos pacientes graves."},{id:"D",texto:"Bolus de solução salina a 3% (100 a 150 mL), repetido se necessário, para elevar o sódio em 4 a 6 mEq/L."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **sódio de 108 mEq/L** (hiponatremia grave) com **convulsão** e sonolência, isto é, hiponatremia **sintomática grave**, com risco de edema cerebral. O tratamento inicial é o bolus de solução salina hipertônica a 3% (100 a 150 mL), repetido se preciso, para elevar o sódio em **4 a 6 mEq/L** nas primeiras horas, o suficiente para reverter os sintomas. Etilismo, desnutrição e **hipopotassemia (2,8 mEq/L)** são fatores de risco para **desmielinização osmótica**; por isso, o limite de correção é de **8 mEq/L em 24 horas**, com dosagem frequente do sódio e reposição de potássio, que também eleva o sódio. A está errada porque a restrição hídrica serve a quadros crônicos e assintomáticos, não à convulsão. B está errada porque o soro fisiológico em volume alto, em paciente hipovolêmico com diurese hipotônica diluída, pode elevar o sódio com rapidez excessiva depois que o estímulo à vasopressina cessa. C está errada porque a tolvaptana não é indicada na hiponatremia aguda sintomática e tem risco de correção excessiva.",
  explicacoesAlternativas:{},
  referencias:"Spasovski G et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia. Eur J Endocrinol 2014;170:G1-G47; Verbalis JG et al. Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations. Am J Med 2013;126(10 Suppl 1):S1-S42.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q34 da UNIFESP 2025
{
  id:"q-adap25-034", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-reumato", assuntoId:"ass-reumato-artrites",
  enunciado:"Mulher, 45 anos, com artrite simétrica de mãos, punhos e pés há 4 meses, rigidez matinal de 90 minutos, 12 articulações dolorosas e 8 edemadas, índice de atividade DAS28 de 5,8, fator reumatoide e anti-CCP em títulos altos e erosões nas radiografias de mãos. Nunca usou medicamentos modificadores de doença. Função hepática e renal normais, sorologias para hepatites e radiografia de tórax sem alterações. Qual é a conduta medicamentosa inicial mais adequada?",
  alternativas:[{id:"A",texto:"Anti-TNF em monoterapia desde o início, porque o prognóstico é ruim e a doença está muito ativa."},{id:"B",texto:"Prednisona em dose alta contínua como único tratamento, até o controle completo da doença."},{id:"C",texto:"Hidroxicloroquina em monoterapia, por ser o modificador de doença de menor toxicidade."},{id:"D",texto:"Metotrexato com ácido fólico, em dose escalonada, associado a prednisona em baixa dose por pouco tempo."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **artrite reumatoide recente (4 meses)**, **DAS28 de 5,8** (alta atividade, acima de 5,1), **fator reumatoide e anti-CCP em títulos altos** e **erosões** (fatores de mau prognóstico), sem tratamento prévio e sem contraindicação ao metotrexato. O tratamento começa o mais cedo possível com um DMARD sintético convencional, o **metotrexato** (com ácido fólico), em dose escalonada, e pode-se associar glicocorticoide em dose baixa por curto período (ponte) até o efeito do metotrexato, com o objetivo de remissão ou baixa atividade (tratar até o alvo). A está errada porque o biológico não é a primeira etapa, e o DMARD biológico entra se o alvo não for atingido em 3 a 6 meses com o convencional. B está errada porque o glicocorticoide em dose alta e contínua isolado não modifica a evolução da doença e acumula eventos adversos. C está errada porque a hidroxicloroquina tem eficácia insuficiente em doença de alta atividade e com fatores de mau prognóstico.",
  explicacoesAlternativas:{},
  referencias:"Smolen JS et al. EULAR recommendations for the management of rheumatoid arthritis with synthetic and biological DMARDs: 2022 update. Ann Rheum Dis 2023;82:3-18; Fraenkel L et al. 2021 ACR Guideline for the Treatment of Rheumatoid Arthritis. Arthritis Rheumatol 2021;73:1108-1123.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q35 da UNIFESP 2025
{
  id:"q-adap25-035", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-infecto", assuntoId:"ass-hanseniase",
  enunciado:"Mulher, 41 anos, em tratamento de hanseníase dimorfa com poliquimioterapia multibacilar há 3 meses, queixa-se de que as lesões antigas ficaram mais vermelhas, inchadas e dolorosas e surgiram placas novas. Há 5 dias tem dor no trajeto do nervo ulnar direito, com formigamento e dificuldade para abrir os dedos. Exame físico: placas eritematoedematosas sobre as lesões prévias, nervo ulnar direito espessado e doloroso, perda de força na abdução do 5º dedo; afebril, sem nódulos dolorosos e sem edema de mãos e pés. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Manter a poliquimioterapia e iniciar prednisona 1 mg/kg/dia, com avaliação neurológica."},{id:"B",texto:"Suspender a poliquimioterapia e iniciar talidomida, por se tratar de reação tipo 2."},{id:"C",texto:"Suspender a poliquimioterapia até o fim da reação e tratar com analgésicos simples e repouso."},{id:"D",texto:"Manter a poliquimioterapia e usar anti-inflamatório não hormonal, com imobilização do braço."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: lesões antigas **inflamadas** (eritema e edema sobre as placas prévias), **placas novas**, **neurite do ulnar** com perda de força, **sem febre e sem nódulos eritematosos dolorosos** (que seriam do eritema nodoso hansênico): **reação tipo 1 (reação reversa)**, com neurite, no tratamento da forma dimorfa. A reação não é motivo para parar a poliquimioterapia, e a neurite exige corticoide para evitar lesão nervosa permanente: prednisona 1 mg/kg/dia, com reduções graduais e avaliação neurológica seriada. B está errada porque a talidomida é usada na reação tipo 2 e seria contraindicada em mulher em idade fértil; a poliquimioterapia também não se suspende. C está errada porque suspender o tratamento deixa a infecção ativa e a analgesia simples não trata a neurite. D está errada porque o anti-inflamatório não hormonal e a imobilização não bastam diante de perda de função do nervo; a neurite com déficit é indicação de corticoide.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas da Hanseníase, 2022; Brasil. Ministério da Saúde. Diretrizes para vigilância, atenção e eliminação da hanseníase como problema de saúde pública: manual técnico-operacional, 2016.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q36 da UNIFESP 2025
{
  id:"q-adap25-036", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-pneumo", assuntoId:"ass-tep",
  enunciado:"Homem, 68 anos, 5 dias depois de artroplastia total de joelho, apresenta dispneia súbita e dor torácica pleurítica. PA 128/76 mmHg, FC 104 bpm, FR 24 irpm, SpO2 de 90% em ar ambiente. A angiotomografia de tórax mostra embolia pulmonar bilateral em artérias lobares e segmentares, com relação entre os diâmetros do ventrículo direito e esquerdo de 1,2. A troponina está elevada. Não há sangramento ativo nem contraindicação à anticoagulação. Qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Anticoagulação plena em internação monitorada, reservando a trombólise para a instabilidade hemodinâmica."},{id:"B",texto:"Trombólise sistêmica imediata com alteplase, pela disfunção do ventrículo direito e pela troponina elevada."},{id:"C",texto:"Colocação de filtro de veia cava inferior e anticoagulação oral após a alta imediata."},{id:"D",texto:"Anticoagulação oral e alta hospitalar no mesmo dia, pois a pressão arterial é normal."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: embolia pulmonar com **PA de 128/76 mmHg** (hemodinamicamente estável), **disfunção do ventrículo direito** (relação VD/VE de 1,2) e **troponina elevada**: risco **intermediário-alto** pela ESC (risco de descompensação nos primeiros dias). A conduta é anticoagulação plena (heparina de baixo peso molecular ou não fracionada) em ambiente monitorado, com trombólise de resgate se houver instabilidade hemodinâmica. B está errada porque a trombólise sistêmica de rotina no risco intermediário-alto reduziu a descompensação, mas aumentou o sangramento maior e o acidente vascular cerebral hemorrágico, sem reduzir a mortalidade (estudo PEITHO). C está errada porque o filtro de veia cava é reservado a quem tem contraindicação absoluta à anticoagulação ou recorrência apesar dela. D está errada porque a disfunção do ventrículo direito e a troponina elevada afastam o tratamento ambulatorial, reservado ao risco baixo.",
  explicacoesAlternativas:{},
  referencias:"Konstantinides SV et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism. Eur Heart J 2020;41:543-603 (não foi encontrada edição mais nova); Meyer G et al. Fibrinolysis for patients with intermediate-risk pulmonary embolism (PEITHO). N Engl J Med 2014;370:1402-1411.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q37 da UNIFESP 2025
{
  id:"q-adap25-037", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-infecto", assuntoId:"ass-sepse",
  enunciado:"Homem, 66 anos, com infecção urinária, chega ao pronto-socorro com febre, PA de 82/44 mmHg, FC de 118 bpm, lactato de 5,2 mmol/L e oligúria. Pesa 80 kg. A hemocultura e a urocultura já foram coletadas, e o antibiótico foi iniciado na primeira hora. Qual é a melhor conduta para a ressuscitação volêmica inicial?",
  alternativas:[{id:"A",texto:"Hidroxietilamido a 6%, expansor que mantém o volume por mais tempo no espaço intravascular."},{id:"B",texto:"Albumina a 5% associada ao cristaloide desde o início, para elevar a pressão oncótica do plasma."},{id:"C",texto:"Cristaloide balanceado, como o Ringer lactato, ao menos 30 mL/kg nas primeiras 3 horas, com reavaliação."},{id:"D",texto:"Solução glicosada a 5% em volume alto, para evitar o excesso de sódio e de cloro."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **choque séptico** (PA de 82/44 mmHg, **lactato de 5,2 mmol/L**, oligúria) em homem de **80 kg**, com cultura colhida e antibiótico já iniciado. A ressuscitação inicial se faz com cristaloide, de preferência **balanceado** (Ringer lactato ou solução similar) e em pelo menos **30 mL/kg** (aqui, 2.400 mL) nas primeiras 3 horas, com reavaliação frequente da resposta (pressão, perfusão, diurese, lactato) para evitar tanto a falta quanto o excesso de volume. A está errada porque os amidos (hidroxietilamido) aumentam a lesão renal e a necessidade de diálise, e as diretrizes recomendam não os usar. B está errada porque a albumina associada desde o início não é recomendada; sugere-se cristaloide isolado. D está errada porque a solução glicosada a 5% é hipotônica e quase toda sai do espaço intravascular, não expandindo o volume.",
  explicacoesAlternativas:{},
  referencias:"Surviving Sepsis Campaign: international guidelines for management of sepsis and septic shock 2026. Intensive Care Med 2026 (doi 10.1007/s00134-026-08361-1; conferida em resumos); Evans L et al. Surviving Sepsis Campaign 2021. Crit Care Med 2021;49:e1063-e1143; Semler MW et al. SMART. N Engl J Med 2018;378:829-839.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q38 da UNIFESP 2025
{
  id:"q-adap25-038", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-pneumo", assuntoId:"ass-pneumonia",
  enunciado:"Homem, 68 anos, portador de doença pulmonar obstrutiva crônica, procura o pronto-socorro com febre, tosse com secreção purulenta e confusão mental recente. FR 32 irpm, PA 112/68 mmHg, FC 118 bpm, SpO2 de 88% em ar ambiente, sem necessidade de ventilação mecânica ou vasopressor. A radiografia mostra infiltrado em dois lobos do pulmão direito. Exames: ureia 72 mg/dL, leucócitos 3.200/mm³, plaquetas 180.000/mm³ e relação PaO2/FiO2 de 140. Qual é a classificação da gravidade e o local de tratamento mais adequado?",
  alternativas:[{id:"A",texto:"Pneumonia não grave, porque não há critério maior; tratamento em enfermaria geral."},{id:"B",texto:"Pneumonia não grave, porque a pressão arterial é normal; tratamento ambulatorial."},{id:"C",texto:"Pneumonia grave por critério maior, porque a relação PaO2/FiO2 está muito baixa; tratamento em UTI."},{id:"D",texto:"Pneumonia grave por três ou mais critérios menores; tratamento em unidade de terapia intensiva."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **sem critério maior** (sem ventilação mecânica nem vasopressor), mas com vários critérios menores: **FR de 32 irpm** (30 ou mais), **PaO2/FiO2 de 140** (250 ou menos), **infiltrado multilobar**, **confusão mental**, **ureia de 72 mg/dL** (nitrogênio ureico de cerca de 34 mg/dL, acima de 20) e **leucopenia de 3.200/mm³** (abaixo de 4.000). Três ou mais critérios menores caracterizam pneumonia grave, com indicação de unidade de terapia intensiva. A está errada porque a ausência de critério maior não basta: três critérios menores equivalem a um maior. B está errada porque a pressão arterial normal não afasta a gravidade, que aqui está na insuficiência respiratória, no estado mental e na uremia. C está errada porque a hipoxemia grave é critério menor; os critérios maiores são ventilação mecânica invasiva e choque séptico com vasopressor.",
  explicacoesAlternativas:{},
  referencias:"Metlay JP et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia: ATS/IDSA Guideline. Am J Respir Crit Care Med 2019;200:e45-e67 (atualização da ATS de 2025 sobre imagem, antibiótico, duração e corticoide, sem mudar a classificação de gravidade); Corrêa RA et al. Diretrizes brasileiras para pneumonia adquirida na comunidade em adultos imunocompetentes, 2018. J Bras Pneumol 2018;44:405-423.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q39 da UNIFESP 2025
{
  id:"q-adap25-039", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-infecto", assuntoId:"ass-arboviroses",
  enunciado:"Mulher, 28 anos, com febre havia 4 dias, apresenta defervescência e, no dia seguinte, dor abdominal intensa e contínua, vômitos persistentes e sangramento gengival. PA 110/70 mmHg sem hipotensão postural, FC 96 bpm, enchimento capilar de 2 segundos, sem derrame pleural ou ascite. Exames: hematócrito de 48% (basal de 40%), plaquetas de 40.000/mm³ e transaminases três vezes o normal. A sorologia de dengue está pendente. Qual é a conduta mais adequada, segundo o manual de manejo clínico da dengue do Ministério da Saúde (2024)?",
  alternativas:[{id:"A",texto:"Alta com hidratação oral e retorno em 24 horas, pois a pressão arterial está normal."},{id:"B",texto:"Internação e soro fisiológico a 0,9%, 10 mL/kg na primeira hora, com reavaliação."},{id:"C",texto:"Reposição imediata de 20 mL/kg de soro fisiológico em 20 minutos, como no choque da dengue."},{id:"D",texto:"Transfusão de plaquetas, pois a contagem está abaixo de 50.000/mm³ e há sangramento."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: dengue na **fase crítica** (defervescência no 4º-5º dia) com **sinais de alarme**: **dor abdominal intensa e contínua**, **vômitos persistentes**, **sangramento de mucosa** e **hemoconcentração (hematócrito de 48% contra 40%)**, plaquetas de 40.000/mm³; **sem choque** (PA normal, enchimento capilar de 2 segundos). É o **grupo C** do Ministério da Saúde: internação (leito de observação por pelo menos 4 horas ou até o hematócrito) e reposição imediata de soro fisiológico a 0,9%, **10 mL/kg na primeira hora**, com reavaliação clínica e do hematócrito. A está errada porque os sinais de alarme impedem a alta e a hidratação oral (grupos A e B). C está errada porque a reposição rápida de 20 mL/kg em 20 minutos é o esquema do grupo D (dengue grave com choque), ausente neste caso. D está errada porque a transfusão de plaquetas não é feita só pela contagem; fica para sangramento grave ou plaquetopenia muito baixa e hemorragia, e a paciente sangra apenas pelas gengivas.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Dengue: diagnóstico e manejo clínico: adulto e criança, 6ª ed., Brasília, 2024 (o texto oficial não pôde ser aberto; o esquema do grupo C foi conferido em fluxos estaduais e municipais que o reproduzem, e o do grupo D, de 20 mL/kg, não foi conferido).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q40 da UNIFESP 2025
{
  id:"q-adap25-040", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-dermato", assuntoId:"ass-derm-farmacodermias",
  enunciado:"Mulher, 52 anos, iniciou alopurinol há 4 semanas por hiperuricemia, e há 5 dias apresenta febre de 38,9 °C, erupção cutânea eritematosa generalizada e edema facial. Exame físico: exantema maculopapular pruriginoso em tronco e membros, edema de face, linfonodos cervicais palpáveis e sem lesões em mucosas. Exames: leucócitos 14.000/mm³ com eosinófilos de 2.800/mm³, TGO 240 U/L e TGP 310 U/L, creatinina normal. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Manter o alopurinol e associar anti-histamínico, pois o exantema é benigno e autolimitado."},{id:"B",texto:"Suspender o alopurinol e observar, pois a retirada do medicamento basta nas reações cutâneas."},{id:"C",texto:"Suspender o alopurinol e iniciar corticoide sistêmico, com seguimento prolongado e retirada gradual."},{id:"D",texto:"Substituir o alopurinol por febuxostate e iniciar antibiótico, por suspeita de infecção bacteriana."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: início **4 semanas depois** de um fármaco de alto risco (alopurinol), **febre**, **exantema generalizado com edema facial**, **linfonodomegalia**, **eosinofilia de 2.800/mm³** e **transaminases elevadas** (hepatite): reação a fármaco com eosinofilia e sintomas sistêmicos (DRESS). A conduta é suspender o fármaco e, havendo comprometimento de órgão (fígado), iniciar corticoide sistêmico (prednisona 0,5 a 1 mg/kg/dia) com retirada lenta, ao longo de semanas, porque a doença recai com redução rápida. A está errada porque manter o agente desencadeante agrava a reação, que tem mortalidade de cerca de 10%. B está errada porque a suspensão isolada pode bastar nos casos leves, sem lesão de órgão, mas não com hepatite e febre. D está errada porque o febuxostate não é alternativa segura sem avaliação, e o quadro não tem sinais de infecção bacteriana.",
  explicacoesAlternativas:{},
  referencias:"Kardaun SH et al. Drug reaction with eosinophilia and systemic symptoms (DRESS): an original multisystem adverse drug reaction (RegiSCAR). Br J Dermatol 2013;169:1071-1080; Husain Z et al. J Am Acad Dermatol 2013;68:693.e1-693.e14.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q41 da UNIFESP 2025
{
  id:"q-adap25-041", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-neuro", assuntoId:"ass-neuro-avc",
  enunciado:"Homem, 66 anos, hipertenso, é levado ao pronto-socorro 90 minutos depois do início súbito de fraqueza no hemicorpo direito e dificuldade de falar. Exame: NIHSS de 14; PA de 192/108 mmHg, confirmada em nova medida; glicemia capilar de 128 mg/dL. A tomografia de crânio sem contraste não mostra hemorragia. Não há uso de anticoagulante, cirurgia recente nem outra contraindicação à trombólise. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Administrar o trombolítico de imediato, sem tratar a pressão, porque a janela terapêutica é curta."},{id:"B",texto:"Contraindicar a trombólise porque a pressão está acima de 185/110 mmHg e manter o tratamento conservador do paciente."},{id:"C",texto:"Reduzir a pressão com anti-hipertensivo endovenoso para menos de 185/110 mmHg e administrar o trombolítico."},{id:"D",texto:"Normalizar a pressão para cerca de 120/80 mmHg em uma hora, antes de outro tratamento."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: acidente vascular cerebral isquêmico com **90 minutos de evolução** (dentro da janela de 4,5 horas), **NIHSS de 14**, tomografia **sem hemorragia**, sem contraindicação e **PA de 192/108 mmHg**, acima do limite para trombólise. A hipertensão acima de **185/110 mmHg** não contraindica a trombólise se puder ser reduzida: usa-se anti-hipertensivo endovenoso (labetalol ou nicardipina) até ficar abaixo desse limite, administra-se o trombolítico (alteplase 0,9 mg/kg ou tenecteplase 0,25 mg/kg) e mantém-se a pressão abaixo de **180/105 mmHg** nas 24 horas seguintes. A está errada porque a pressão não controlada aumenta o risco de transformação hemorrágica. B está errada porque a PA acima do limite só impede a trombólise se não for possível reduzi-la. D está errada porque queda abrupta até valores normais pode reduzir a perfusão da penumbra isquêmica e piorar o déficit, além de atrasar o tratamento.",
  explicacoesAlternativas:{},
  referencias:"Prabhakaran S et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke. Stroke 2026 (doi 10.1161/STR.0000000000000513; o limite de 185/110 mmHg foi conferido em resumos); Powers WJ et al. 2019 AHA/ASA Guidelines for the Early Management of Patients With Acute Ischemic Stroke. Stroke 2019;50:e344-e418.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q42 da UNIFESP 2025
{
  id:"q-adap25-042", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-dermato", assuntoId:"ass-derm-farmacodermias",
  enunciado:"Mulher, 30 anos, iniciou lamotrigina há 3 semanas, com aumento rápido de dose, e apresenta há 4 dias febre de 39 °C, dor ao engolir, erosões dolorosas em boca, olhos e genitais, e lesões em alvo atípicas que se tornaram bolhas, com descolamento da pele em cerca de 40% da superfície corporal e sinal de Nikolsky positivo. PA de 100/60 mmHg e FC de 112 bpm. Qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Suspender a lamotrigina de imediato e internar em UTI ou em centro de queimados, com cuidados de suporte."},{id:"B",texto:"Reduzir a dose da lamotrigina pela metade e acompanhar em ambulatório com anti-histamínico."},{id:"C",texto:"Manter a lamotrigina e iniciar pulsoterapia com metilprednisolona como tratamento de primeira linha."},{id:"D",texto:"Tratar em regime ambulatorial com corticoide tópico e anti-histamínico, orientando retorno em 48 horas."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: fármaco de risco (**lamotrigina, com aumento rápido de dose**) iniciado **3 semanas antes**, **febre**, lesões em alvo atípicas e bolhas, **erosões em três mucosas** (boca, olhos e genitais), **sinal de Nikolsky** positivo e **descolamento de cerca de 40%** da superfície corporal (acima de 30%): necrólise epidérmica tóxica. O primeiro passo é suspender o fármaco suspeito e internar em unidade de terapia intensiva ou de queimados, com reposição de volume, controle térmico, cuidado das feridas e das mucosas, analgesia e avaliação oftalmológica. B está errada porque a redução de dose não interrompe a reação, que exige a retirada total do fármaco. C está errada porque o corticoide sistêmico não é tratamento de primeira linha: as evidências são fracas e há risco de infecção, e o suporte é a base. D está errada porque o quadro é grave e com risco de vida (acometimento extenso, sepse e perda de líquidos), sem possibilidade de tratamento ambulatorial.",
  explicacoesAlternativas:{},
  referencias:"Seminario-Vidal L et al. Society of Dermatology Hospitalists supportive care guidelines for the management of Stevens-Johnson syndrome/toxic epidermal necrolysis in adults. J Am Acad Dermatol 2020;82:1553-1567; Creamer D et al. UK guidelines for the management of Stevens-Johnson syndrome/toxic epidermal necrolysis in adults 2016. Br J Dermatol 2016;174:1194-1227.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q43 da UNIFESP 2025
{
  id:"q-adap25-043", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-bioestatistica",
  enunciado:"Um ensaio clínico randomizado comparou um novo anti-hipertensivo com o tratamento padrão quanto ao desfecho composto de morte cardiovascular, infarto ou acidente vascular cerebral. O resultado foi risco relativo de 0,80 (intervalo de confiança de 95% de 0,62 a 1,04; p = 0,09). Com base nesse resultado, qual é a interpretação correta?",
  alternativas:[{id:"A",texto:"O estudo demonstrou que o novo medicamento não tem efeito sobre o desfecho composto."},{id:"B",texto:"A diferença não é significativa a 5%, mas o intervalo não exclui um benefício importante."},{id:"C",texto:"O novo medicamento reduziu o risco do desfecho em 20%, com significância estatística a 5%."},{id:"D",texto:"O valor de p mostra que há 9% de probabilidade de a hipótese nula ser verdadeira, refutando-a."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **risco relativo de 0,80** (redução relativa estimada de 20%), **IC 95% de 0,62 a 1,04** (inclui o valor 1, que indica ausência de efeito) e **p = 0,09** (acima de 0,05). Ou seja, o resultado não é estatisticamente significativo a 5%, mas o intervalo vai de uma redução de 38% a um aumento de 4%, e portanto não exclui um benefício clinicamente importante: o estudo é inconclusivo, e não negativo. A está errada porque ausência de significância não é prova de ausência de efeito (o estudo pode ter faltado poder). C está errada porque, com o IC incluindo 1, o resultado não é significativo a 5%. D está errada porque o valor de p é a probabilidade de se obter um resultado tão extremo se a hipótese nula fosse verdadeira, e não a probabilidade de a hipótese nula ser verdadeira.",
  explicacoesAlternativas:{},
  referencias:"Wasserstein RL, Lazar NA. The ASA statement on p-values: context, process, and purpose. Am Stat 2016;70:129-133; Altman DG, Bland JM. Absence of evidence is not evidence of absence. BMJ 1995;311:485.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q44 da UNIFESP 2025
{
  id:"q-adap25-044", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-vigilanciasanitaria",
  enunciado:"Menino, 6 anos, não vacinado por recusa da família, é atendido com febre de 39,5 °C há 4 dias, tosse, coriza, conjuntivite e exantema maculopapular que começou atrás das orelhas e desceu para o tronco e os membros. À inspeção da boca, há manchas esbranquiçadas na mucosa jugal. Uma irmã de 2 anos, também não vacinada, começou a ter sintomas semelhantes. Em relação à vigilância epidemiológica e à Lista Nacional de Notificação Compulsória, qual é a conduta adequada?",
  alternativas:[{id:"A",texto:"Notificar semanalmente, junto com as demais doenças exantemáticas, depois que a sorologia confirmar o caso."},{id:"B",texto:"Aguardar o resultado do IgM para só então notificar, a fim de evitar notificações falsas."},{id:"C",texto:"Notificar se houver casos confirmados entre os contatos, na ficha de investigação de surto da região."},{id:"D",texto:"Notificar de imediato, em até 24 horas, e colher amostras para exames, sem aguardar confirmação."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **febre, tosse, coriza e conjuntivite** seguidas de **exantema cefalocaudal** e **manchas de Koplik** na mucosa jugal, em criança **não vacinada**, com **segundo caso suspeito na família**: sarampo. O caso suspeito de sarampo é de notificação compulsória e imediata, em até 24 horas, para a vigilância municipal ou estadual, sem esperar a confirmação laboratorial; as amostras (soro para IgM e IgG, e swab de nasofaringe ou urina para a detecção do vírus) são colhidas no primeiro contato, e as medidas de controle, como o bloqueio vacinal dos contatos, começam logo. A está errada porque a notificação semanal vale para agravos de menor urgência, e a espera pela sorologia atrasa o bloqueio. B está errada porque a notificação é do caso suspeito, e não do confirmado. C está errada porque um único caso suspeito já aciona a investigação, sem esperar contatos confirmados.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Guia de Vigilância em Saúde, 6ª ed., 2023; Portaria de Consolidação GM/MS nº 4/2017, anexo da Lista Nacional de Notificação Compulsória, com as atualizações posteriores (a edição vigente da lista não foi conferida no texto oficial; o sarampo consta como de notificação imediata em todas as edições conhecidas).",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q45 da UNIFESP 2025
{
  id:"q-adap25-045", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-saudefamilia", assuntoId:"ass-saudepopulacoes",
  enunciado:"Homem, 45 anos, em situação de rua há 3 anos, procura uma unidade básica de saúde por tosse há 6 semanas, emagrecimento e sudorese noturna. Na recepção, o funcionário informa que só pode atendê-lo com comprovante de residência e documento com foto, que o paciente não tem. Qual é a conduta correta da equipe?",
  alternativas:[{id:"A",texto:"Acolher, atender e cadastrar, sem exigir comprovante de residência ou documento."},{id:"B",texto:"Encaminhar ao pronto-socorro, o único serviço que atende pessoas sem comprovante de endereço."},{id:"C",texto:"Orientar a buscar a unidade do bairro onde morou por último, onde estaria cadastrado."},{id:"D",texto:"Atender nesta consulta e exigir os documentos antes de novos retornos e de exames."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **pessoa em situação de rua**, com **sintomas respiratórios por mais de 3 semanas** (sintomático respiratório, a ser investigado para tuberculose) e **impedimento por falta de comprovante de residência e de documento**. O SUS é universal (a saúde é direito de todos e dever do Estado), e a falta de endereço ou de documento não pode ser motivo para recusar ou condicionar o atendimento; a equipe deve acolher, cadastrar e investigar o caso (baciloscopia ou teste rápido molecular), contando, quando houver, com o Consultório na Rua. B está errada porque a atenção primária atende a pessoa sem endereço, e o pronto-socorro não é o único serviço. C está errada porque não há obrigação de cadastro prévio por endereço, e a orientação cria uma barreira. D está errada porque condicionar retornos e exames aos documentos mantém a barreira de acesso e interrompe a investigação de uma doença de notificação e de transmissão respiratória.",
  explicacoesAlternativas:{},
  referencias:"Constituição Federal de 1988, art. 196; Lei nº 8.080/1990 (universalidade); Decreto nº 7.053/2009 (Política Nacional para a População em Situação de Rua); Portaria GM/MS nº 2.436/2017 (PNAB). A norma específica de cadastro sem comprovante de residência não foi conferida no texto.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q46 da UNIFESP 2025
{
  id:"q-adap25-046", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-medidasepi",
  enunciado:"Em um ensaio clínico randomizado com 800 pacientes, divididos igualmente em dois grupos, avaliou-se um novo antiplaquetário para a prevenção de infarto em um ano. Ocorreram 60 infartos no grupo placebo e 40 no grupo tratado. Qual é o número necessário para tratar (NNT) para evitar um infarto?",
  alternativas:[{id:"A",texto:"3 pacientes, o inverso da redução relativa do risco (33%)."},{id:"B",texto:"5 pacientes, a redução absoluta do risco em pontos percentuais."},{id:"C",texto:"20 pacientes, o inverso da redução absoluta do risco."},{id:"D",texto:"10 pacientes, o inverso do risco no grupo tratado."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **400 pacientes por grupo** (800 divididos igualmente), **60 infartos no placebo (15%)** e **40 no grupo tratado (10%)**. A redução absoluta do risco (RAR) é 15% − 10% = **5 pontos percentuais (0,05)**, e o NNT é o inverso dela: 1 ÷ 0,05 = **20**, ou seja, tratar 20 pacientes por um ano evita um infarto. A está errada porque a redução relativa do risco é 5% ÷ 15% = 33%, e seu inverso (cerca de 3) não é o NNT, que depende do risco absoluto. B está errada porque 5 é a RAR expressa em pontos percentuais; o NNT é o inverso dela expressa em fração. D está errada porque o inverso do risco do grupo tratado (1 ÷ 0,10 = 10) não mede o benefício, que é uma diferença entre os grupos.",
  explicacoesAlternativas:{},
  referencias:"Fletcher RH, Fletcher SW, Fletcher GS. Epidemiologia Clínica: Elementos Essenciais, 5ª ed., Artmed, 2014; Laupacis A, Sackett DL, Roberts RS. An assessment of clinically useful measures of the consequences of treatment. N Engl J Med 1988;318:1728-1733.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q47 da UNIFESP 2025
{
  id:"q-adap25-047", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-sus", assuntoId:"ass-gestaosaude",
  enunciado:"A secretaria municipal de saúde de uma cidade precisa comprovar, ao Conselho de Saúde, que atingiu o percentual mínimo de aplicação de receitas próprias em ações e serviços públicos de saúde. Segundo a Lei Complementar nº 141/2012, qual das despesas abaixo pode ser contabilizada nesse percentual?",
  alternativas:[{id:"A",texto:"Pagamento de aposentadorias e pensões dos servidores que atuaram na área da saúde municipal."},{id:"B",texto:"Compra de medicamentos do componente básico da assistência farmacêutica para as unidades do município."},{id:"C",texto:"Merenda escolar e outros programas de alimentação, ainda que executados em unidades de saúde."},{id:"D",texto:"Assistência à saúde dos servidores municipais, por meio de plano exclusivo com acesso restrito."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: a pergunta é sobre despesa que conta no **mínimo constitucional** de aplicação em ações e serviços públicos de saúde (15% da receita de impostos nos municípios, 12% nos estados). Contam as despesas com ações de **acesso universal, igualitário e gratuito**, voltadas às diretrizes do SUS, e a compra de medicamentos do componente básico para a rede é uma delas. A está errada porque o pagamento de aposentadorias e pensões, inclusive de servidores da saúde, é vedado nesse cômputo. C está errada porque a merenda escolar e os programas de alimentação, ainda que executados em unidades de saúde, não contam nesse cômputo. D está errada porque a assistência a clientela fechada, sem acesso universal, não é ação e serviço público de saúde para esse fim.",
  explicacoesAlternativas:{},
  referencias:"Lei Complementar nº 141, de 13 de janeiro de 2012, arts. 2º a 4º; Constituição Federal de 1988, art. 198, §2º, e ADCT, art. 77.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q48 da UNIFESP 2025
{
  id:"q-adap25-048", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-vigilanciasanitaria",
  enunciado:"Gestante de 24 anos, com 20 semanas, realiza o teste rápido treponêmico no pré-natal com resultado reagente, e o VDRL é reagente na titulação de 1:8. Ela nega tratamento anterior para sífilis. Em relação à vigilância epidemiológica e à Lista Nacional de Notificação Compulsória, qual é a conduta adequada?",
  alternativas:[{id:"A",texto:"Notificar no momento do parto, junto com a notificação da sífilis congênita do recém-nascido."},{id:"B",texto:"Notificar se a titulação do VDRL for igual ou superior a 1:16, que indica doença ativa."},{id:"C",texto:"Notificar como sífilis em gestante, qualquer que seja o estágio ou o tratamento."},{id:"D",texto:"Notificar após a conclusão do tratamento, com a confirmação da cura sorológica da gestante."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **gestante** com **teste treponêmico reagente e VDRL 1:8 reagente**, sem tratamento prévio: caso de sífilis na gestação. A sífilis em gestante é de notificação compulsória no Sistema de Informação de Agravos de Notificação (SINAN), assim que o caso é identificado, independentemente do estágio clínico, da titulação do VDRL ou do tratamento; a notificação orienta as ações de prevenção da sífilis congênita. A está errada porque aguardar o parto perde o tempo de tratamento e de vigilância do pré-natal. B está errada porque não existe título mínimo de VDRL para notificar; títulos baixos também são casos. D está errada porque a notificação não depende da conclusão do tratamento nem da cura sorológica.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (IST), 2022; Portaria de Consolidação GM/MS nº 4/2017, anexo da Lista Nacional de Notificação Compulsória, com atualizações posteriores (edição vigente não conferida no texto oficial).",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q49 da UNIFESP 2025
{
  id:"q-adap25-049", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-sus", assuntoId:"ass-principiossus",
  enunciado:"Em um município, o prefeito pretende reformular o Conselho Municipal de Saúde. Pelas normas que regem o controle social no SUS, qual deve ser a composição do conselho?",
  alternativas:[{id:"A",texto:"Metade de gestores e prestadores de serviço, um quarto de usuários e um quarto de profissionais de saúde."},{id:"B",texto:"Metade de profissionais de saúde, um quarto de usuários e um quarto de gestores e prestadores de serviço."},{id:"C",texto:"Metade de usuários, um quarto de trabalhadores da saúde e um quarto de gestores e prestadores de serviços."},{id:"D",texto:"Um terço de usuários, um terço de profissionais de saúde e um terço de gestores e prestadores de serviço."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: a pergunta é sobre a **composição do Conselho de Saúde**, instância colegiada, permanente e deliberativa do controle social no SUS. A representação dos usuários é **paritária em relação ao conjunto dos demais segmentos**: **50% de usuários**, **25% de trabalhadores da saúde** e **25% de gestores e prestadores de serviço**. A está errada porque dá a maioria ao governo e aos prestadores, invertendo a lógica do controle social. B está errada porque a maioria cabe aos usuários, e não aos profissionais. D está errada porque a divisão em três partes iguais não respeita a paridade do conselho, em que os usuários ocupam metade das vagas.",
  explicacoesAlternativas:{},
  referencias:"Lei nº 8.142, de 28 de dezembro de 1990, art. 1º, §4º; Conselho Nacional de Saúde. Resolução nº 453, de 10 de maio de 2012.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q50 da UNIFESP 2025
{
  id:"q-adap25-050", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-saudefamilia", assuntoId:"ass-esf",
  enunciado:"Em uma unidade básica de saúde, a equipe de Saúde da Família atende uma idosa com dor crônica, depressão e dificuldade de mobilidade, cujo cuidado está parado há meses. A equipe combina uma reunião com o fisioterapeuta e o psicólogo da equipe multiprofissional (eMulti) do território, em que os profissionais discutem o caso juntos, definem um plano de cuidado compartilhado e combinam atendimentos conjuntos, sem que a paciente seja transferida para outro serviço. Que arranjo de cuidado é esse?",
  alternativas:[{id:"A",texto:"Referência e contrarreferência, com encaminhamento da paciente e retorno posterior."},{id:"B",texto:"Interconsulta formal, em que o especialista responde por escrito a uma pergunta da equipe."},{id:"C",texto:"Triagem de risco, em que a eMulti classifica a prioridade da paciente na fila de espera."},{id:"D",texto:"Apoio matricial, com corresponsabilização entre a equipe e os especialistas."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: a **equipe de Saúde da Família** (equipe de referência) discute o caso com profissionais da **eMulti** (fisioterapeuta e psicólogo), definem **plano de cuidado compartilhado** e **atendimentos conjuntos**, **sem transferir** a paciente. Esse é o **apoio matricial**, que oferece retaguarda assistencial e técnico-pedagógica à equipe de referência, com corresponsabilização, e é uma das principais ações das equipes multiprofissionais da atenção primária (eMulti, que sucederam o NASF). A está errada porque, na referência e contrarreferência, a paciente é encaminhada e o cuidado muda de serviço. B está errada porque a interconsulta formal é uma pergunta pontual, sem plano compartilhado nem corresponsabilização. C está errada porque a classificação de prioridade não é o que a equipe descreve.",
  explicacoesAlternativas:{},
  referencias:"Campos GWS, Domitti AC. Apoio matricial e equipe de referência: uma metodologia para gestão do trabalho interdisciplinar em saúde. Cad Saúde Pública 2007;23:399-407; Brasil. Ministério da Saúde. Portaria GM/MS nº 635, de 22 de maio de 2023 (eMulti).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q51 da UNIFESP 2025
{
  id:"q-adap25-051", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-sus", assuntoId:"ass-niveisatencao",
  enunciado:"Um grupo de municípios vizinhos quer ser reconhecido como Região de Saúde, para organizar a rede e pactuar recursos de forma conjunta. Segundo o decreto que regulamenta a organização do SUS, quais ações e serviços a região precisa conter, no mínimo?",
  alternativas:[{id:"A",texto:"Atenção primária, urgência e emergência, atenção psicossocial, atenção especializada ambulatorial e hospitalar e vigilância em saúde."},{id:"B",texto:"Atenção primária, urgência e emergência, atenção hospitalar de alta complexidade e reabilitação, sem exigência de vigilância em saúde."},{id:"C",texto:"Atenção primária, maternidade de alto risco, terapia renal substitutiva e serviço de oncologia de alta complexidade."},{id:"D",texto:"Unidades básicas de saúde e hospital geral, com urgência e emergência, referenciando o restante a outras regiões."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: a pergunta é sobre os **serviços mínimos** que o decreto exige para **instituir uma Região de Saúde**. O Decreto nº 7.508/2011 determina que a região contenha, no mínimo, ações e serviços de **atenção primária**, **urgência e emergência**, **atenção psicossocial**, **atenção ambulatorial especializada e hospitalar** e **vigilância em saúde**; os serviços de maior complexidade podem ser pactuados entre regiões. B está errada porque a vigilância em saúde faz parte do conjunto mínimo, e a atenção hospitalar de alta complexidade não é exigida. C está errada porque maternidade de alto risco, terapia renal substitutiva e oncologia de alta complexidade são serviços que, em geral, se organizam em escala macrorregional, e não são exigidos em toda região. D está errada porque omite a atenção psicossocial, a atenção ambulatorial especializada e a vigilância em saúde.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Decreto nº 7.508, de 28 de junho de 2011, art. 5º; Lei nº 8.080/1990, art. 7º.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q52 da UNIFESP 2025
{
  id:"q-adap25-052", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-prevencao",
  enunciado:"Um programa de rastreamento de câncer de cólon passou a diagnosticar os tumores, em média, 3 anos antes do aparecimento dos sintomas. Depois da implantação do programa, a sobrevida em 5 anos após o diagnóstico passou de 40% para 70%, mas a mortalidade por câncer de cólon na população permaneceu a mesma. Qual é a melhor explicação para o aumento da sobrevida sem redução da mortalidade?",
  alternativas:[{id:"A",texto:"Viés de seleção, pois quem aceita o rastreamento é mais saudável que quem o recusa."},{id:"B",texto:"Viés de antecipação diagnóstica, pois a sobrevida é contada desde um diagnóstico mais precoce."},{id:"C",texto:"Viés de aferição, pois os médicos dos pacientes rastreados registram a morte com maior frequência."},{id:"D",texto:"Viés de confusão, pois a idade dos pacientes rastreados é maior que a dos não rastreados."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: o rastreamento antecipa o diagnóstico em **3 anos**, a **sobrevida em 5 anos sobe de 40% para 70%** e a **mortalidade da população não muda**. A sobrevida é contada a partir do diagnóstico; se o diagnóstico vem 3 anos antes e a morte ocorre na mesma data, o paciente «sobrevive» 3 anos a mais sem viver um dia a mais: é o viés de antecipação diagnóstica (lead-time bias). Por isso, a eficácia de um rastreamento se prova pela **redução da mortalidade** (específica e, idealmente, geral), e não pelo aumento da sobrevida. A está errada porque o viés de seleção (efeito do voluntário saudável) existe, mas não explica por si só a mudança da sobrevida com mortalidade populacional inalterada. C está errada porque o registro dos óbitos não difere entre os grupos no cenário descrito. D está errada porque diferença de idade seria confusão que alteraria a mortalidade, e não é o que o enunciado descreve.",
  explicacoesAlternativas:{},
  referencias:"Fletcher RH, Fletcher SW, Fletcher GS. Epidemiologia Clínica, 5ª ed., Artmed, 2014 (capítulo sobre prevenção); Gordis L. Epidemiologia, 5ª ed., 2017.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q53 da UNIFESP 2025
{
  id:"q-adap25-053", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-bioestatistica",
  imagemUrl:"dados/imagens/q-adap25-053.png", imagemLegenda:"Curva ROC de um teste diagnóstico (ilustração esquemática; dados fictícios).",
  enunciado:"Um lote de testes rápidos de gravidez tem um defeito de fabricação: qualquer que seja a concentração de hCG na urina, a fita nunca desenvolve a linha de resultado positivo. Esses testes são usados para identificar gestantes, tendo a ultrassonografia como padrão de referência. Qual ponto da curva ROC mostrada na figura representa a sensibilidade e a especificidade desse teste?",
  alternativas:[{id:"A",texto:"Ponto 1."},{id:"B",texto:"Ponto 2."},{id:"C",texto:"Ponto 3."},{id:"D",texto:"Ponto 4."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado e da figura: a fita **nunca fica positiva**, isto é, classifica **todas as mulheres como negativas**. Assim, não acerta nenhuma gestante (**sensibilidade de 0%**) e acerta todos os não doentes (**especificidade de 100%**, ou seja, **1 − especificidade = 0**). Na curva ROC, o eixo vertical é a sensibilidade e o eixo horizontal é 1 − especificidade; o par (0; 0) é o canto inferior esquerdo, o **ponto 3**. A (ponto 1) está errada porque ele fica no canto superior direito, (1; 1): é o teste que classifica todos como positivos, com sensibilidade de 100% e especificidade de 0%. B (ponto 2) está errada porque está perto do canto superior esquerdo, o de um teste bom, com sensibilidade alta e poucos falsos-positivos. D (ponto 4) está errada porque está sobre a diagonal, (0,5; 0,5), que representa um teste sem poder discriminatório (equivalente ao acaso).",
  explicacoesAlternativas:{},
  referencias:"Fletcher RH, Fletcher SW, Fletcher GS. Epidemiologia Clínica, 5ª ed., Artmed, 2014 (capítulo sobre diagnóstico); Hanley JA, McNeil BJ. Radiology 1982;143:29-36.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q54 da UNIFESP 2025
{
  id:"q-adap25-054", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-medidasepi",
  enunciado:"Em um estudo caso-controle sobre câncer de pulmão, foram incluídos 300 casos e 600 controles, e a exposição residencial ao radônio foi investigada nos dois grupos. A razão de chances (odds ratio) encontrada foi de 3,0, com intervalo de confiança de 95% de 2,2 a 4,1. Qual é a interpretação correta desse resultado?",
  alternativas:[{id:"A",texto:"A chance de exposição ao radônio foi 3 vezes maior nos casos do que nos controles."},{id:"B",texto:"O risco de câncer de pulmão nos expostos foi exatamente 3 vezes o dos não expostos."},{id:"C",texto:"A incidência de câncer de pulmão foi 3 vezes maior na população exposta ao radônio."},{id:"D",texto:"Em 300 pessoas expostas, 3 desenvolverão câncer de pulmão para cada pessoa não exposta."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **estudo caso-controle** (casos e controles selecionados pelo desfecho, exposição investigada depois), **razão de chances de 3,0** e **IC 95% de 2,2 a 4,1** (não inclui 1, associação estatisticamente significativa). Em estudo caso-controle, parte-se do desfecho e a medida natural é a razão de chances de exposição: a chance de ter sido exposto ao radônio é 3 vezes maior entre os casos que entre os controles. Ela estima o risco relativo apenas quando a doença é rara na população. B está errada porque o risco (incidência) não pode ser calculado diretamente em estudo caso-controle, já que a proporção de casos é definida pelo pesquisador. C está errada porque a incidência é medida em coortes ou ensaios, em que se segue a população. D está errada porque mistura números sem relação com a medida e atribui à razão de chances uma interpretação de incidência.",
  explicacoesAlternativas:{},
  referencias:"Gordis L. Epidemiologia, 5ª ed., 2017 (capítulos sobre estudos caso-controle e medidas de associação); Fletcher RH, Fletcher SW, Fletcher GS. Epidemiologia Clínica, 5ª ed., 2014.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q55 da UNIFESP 2025
{
  id:"q-adap25-055", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-nefro", assuntoId:"ass-drc",
  enunciado:"Mulher, 63 anos, com diabetes mellitus tipo 2 há 12 anos e hipertensão arterial, tem doença renal crônica com taxa de filtração glomerular estimada de 38 mL/min/1,73 m² e relação albumina/creatinina urinária de 520 mg/g. Usa losartana 100 mg ao dia, metformina 500 mg duas vezes ao dia e hidroclorotiazida 25 mg ao dia. PA 126/74 mmHg, potássio de 4,6 mEq/L e hemoglobina glicada de 7,6%. Qual medicamento deve ser acrescentado para reduzir a progressão da doença renal e os eventos cardiovasculares?",
  alternativas:[{id:"A",texto:"Anlodipino em substituição à losartana, pois protege o rim de forma equivalente a ela."},{id:"B",texto:"Inibidor de SGLT2, como a empagliflozina, independentemente do controle glicêmico."},{id:"C",texto:"Enalapril, em associação à losartana, para bloqueio duplo do sistema renina-angiotensina."},{id:"D",texto:"Sitagliptina, pois reduz a albuminúria e a progressão da doença renal."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: diabetes tipo 2 com doença renal crônica **G3b** (TFGe de 38 mL/min/1,73 m²) e albuminúria **A3** (520 mg/g), já em **dose máxima de bloqueador do receptor da angiotensina**, **potássio normal** e controle pressórico adequado. Os inibidores de SGLT2 (dapagliflozina, empagliflozina) são recomendados no diabetes tipo 2 com doença renal crônica e TFGe de 20 mL/min/1,73 m² ou mais, pois reduzem a progressão da doença renal, a insuficiência cardíaca e os eventos cardiovasculares, com efeito independente do controle glicêmico. A está errada porque o anlodipino controla a pressão, mas não reduz a albuminúria e não substitui o bloqueio do sistema renina-angiotensina. C está errada porque a associação de inibidor da ECA e bloqueador do receptor aumenta hiperpotassemia e lesão renal aguda, sem benefício adicional. D está errada porque a sitagliptina é neutra para os desfechos renais e cardiovasculares.",
  explicacoesAlternativas:{},
  referencias:"KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int 2024;105(4S):S117-S314; ADA. Standards of Care in Diabetes - 2025, section 11 (Chronic Kidney Disease and Risk Management). Diabetes Care 2025;48(Suppl 1).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q56 da UNIFESP 2025
{
  id:"q-adap25-056", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-endocrino", assuntoId:"ass-dm",
  enunciado:"Homem, 60 anos, com diabetes mellitus tipo 2, usa metformina 1.000 mg duas vezes ao dia e empagliflozina 25 mg ao dia, com hemoglobina glicada de 7,2% e função renal normal. Foi indicada colecistectomia eletiva sob anestesia geral, com jejum de 8 horas, agendada para daqui a 7 dias. Qual é a orientação mais adequada em relação à empagliflozina?",
  alternativas:[{id:"A",texto:"Manter a dose habitual até a manhã da cirurgia, por ter baixo risco de hipoglicemia."},{id:"B",texto:"Suspender na véspera, porque o efeito diurético termina em 24 horas."},{id:"C",texto:"Suspender 3 dias antes da cirurgia, pelo risco de cetoacidose euglicêmica."},{id:"D",texto:"Suspender se a glicemia de jejum no dia da cirurgia for superior a 250 mg/dL."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: diabetes tipo 2 em uso de **inibidor de SGLT2 (empagliflozina)**, **cirurgia eletiva sob anestesia geral** com **jejum de 8 horas** e controle glicêmico adequado (**hemoglobina glicada de 7,2%**). Os inibidores de SGLT2 aumentam o risco de **cetoacidose euglicêmica** no perioperatório (jejum, estresse cirúrgico e menor ingestão), com glicemia normal ou pouco elevada, e por isso devem ser suspensos **pelo menos 3 dias antes** da cirurgia (4 dias para a ertugliflozina), com retomada quando houver ingestão normal. A está errada porque manter a dose até a cirurgia expõe ao risco de cetoacidose; o risco de hipoglicemia não é o problema dessa classe. B está errada porque os efeitos metabólicos do fármaco (cetogênese) persistem por mais de 24 horas após a última dose. D está errada porque a cetoacidose euglicêmica ocorre justamente com glicemias normais, e a suspensão não pode depender da glicemia do dia.",
  explicacoesAlternativas:{},
  referencias:"American Diabetes Association. Standards of Care in Diabetes - 2025, section 16 (Diabetes Care in the Hospital). Diabetes Care 2025;48(Suppl 1); FDA Drug Safety Communication on SGLT2 inhibitors and ketoacidosis, 2020.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q57 da UNIFESP 2025
{
  id:"q-adap25-057", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-medidasepi",
  enunciado:"Um teste rápido para detecção de uma doença tem sensibilidade de 95% e especificidade de 90%. Ele será aplicado em 1.000 pessoas de uma comunidade em que a prevalência da doença é de 2%. Entre as pessoas com resultado positivo, qual é, aproximadamente, a proporção que realmente tem a doença (valor preditivo positivo)?",
  alternativas:[{id:"A",texto:"95%, pois é a probabilidade de o teste ser positivo em quem tem a doença."},{id:"B",texto:"90%, pois é a probabilidade de o teste ser negativo em quem não tem a doença."},{id:"C",texto:"2%, pois o teste não altera a probabilidade de doença que a prevalência já indica."},{id:"D",texto:"16%, pois a maior parte dos resultados positivos é de pessoas sem a doença."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **1.000 pessoas**, **prevalência de 2%** (20 doentes e 980 não doentes), **sensibilidade de 95%** e **especificidade de 90%**. Entre os 20 doentes, o teste detecta **19** (verdadeiros-positivos); entre os 980 sem a doença, **98** têm resultado falso-positivo (10% de 980). O total de positivos é 19 + 98 = 117, e o **valor preditivo positivo é 19 ÷ 117 = 16%**. A baixa prevalência faz a maioria dos positivos ser de falsos-positivos, mesmo com bom desempenho do teste. A está errada porque 95% é a sensibilidade, e não o valor preditivo. B está errada porque 90% é a especificidade. C está errada porque o teste altera, sim, a probabilidade: o valor preditivo positivo (16%) é 8 vezes a prevalência (2%); a prevalência é a probabilidade antes do teste, e não a probabilidade entre os positivos.",
  explicacoesAlternativas:{},
  referencias:"Fletcher RH, Fletcher SW, Fletcher GS. Epidemiologia Clínica, 5ª ed., Artmed, 2014 (capítulo sobre diagnóstico); Gordis L. Epidemiologia, 5ª ed., 2017.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q58 da UNIFESP 2025
{
  id:"q-adap25-058", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-sus", assuntoId:"ass-farmacovigilancia",
  enunciado:"Mulher, 8 anos, sem história prévia de alergia a medicamentos, apresenta urticária generalizada, edema de glote e hipotensão 20 minutos depois da primeira dose de amoxicilina por via oral. A reação foi tratada com adrenalina e evoluiu bem. Pela classificação de Rawlins e Thompson das reações adversas a medicamentos, como essa reação deve ser classificada?",
  alternativas:[{id:"A",texto:"Tipo B (bizarra), imprevisível, não relacionada à dose e de mecanismo imunológico (alérgico)."},{id:"B",texto:"Tipo A (aumentada), previsível, relacionada à dose e ao efeito farmacológico do fármaco."},{id:"C",texto:"Tipo C (crônica), relacionada ao uso prolongado e à dose cumulativa do medicamento."},{id:"D",texto:"Tipo D (tardia), que surge muito tempo depois, às vezes após o fim da exposição."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: reação **na primeira dose**, **minutos depois** do uso, com **urticária, edema de glote e hipotensão** (anafilaxia), sem história prévia de alergia: é uma reação **imprevisível**, que não depende da dose nem do efeito farmacológico da amoxicilina e tem **mecanismo imunológico**, isto é, **tipo B (bizarra)**. A está de acordo com as características desse tipo: ocorre em minoria dos pacientes, sem relação com a dose. B está errada porque as reações do tipo A (aumentadas) são previsíveis, frequentes e dose-dependentes (por exemplo, sangramento com varfarina ou hipoglicemia com insulina). C está errada porque o tipo C (crônica) decorre do uso prolongado, como a osteoporose por corticoide. D está errada porque o tipo D (tardia) surge meses ou anos depois, como a carcinogênese, e não minutos depois da primeira dose.",
  explicacoesAlternativas:{},
  referencias:"Rawlins MD, Thompson JW. Pathogenesis of adverse drug reactions. In: Davies DM (ed.). Textbook of Adverse Drug Reactions. Oxford University Press, 1977; Edwards IR, Aronson JK. Adverse drug reactions: definitions, diagnosis, and management. Lancet 2000;356:1255-1259.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q59 da UNIFESP 2025
{
  id:"q-adap25-059", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-ortopedia", assuntoId:"ass-orto-fraturas",
  enunciado:"Homem, 35 anos, é vítima de queda de motocicleta e chega ao pronto-socorro 2 horas depois, com dor intensa no quadril esquerdo, encurtamento e rotação externa do membro inferior. Está hemodinamicamente estável, sem outras lesões ao exame inicial e sem déficit neurovascular. A radiografia mostra fratura transcervical do colo do fêmur esquerdo, com desvio acentuado (Garden IV). Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Redução anatômica e osteossíntese com parafusos canulados, em caráter de urgência."},{id:"B",texto:"Artroplastia total do quadril, por ser o tratamento padrão das fraturas do colo do fêmur com desvio."},{id:"C",texto:"Tração cutânea e fixação eletiva da fratura depois de 2 semanas, para esperar a melhora do edema."},{id:"D",texto:"Tratamento conservador com repouso no leito e carga parcial até a consolidação."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **adulto jovem (35 anos)**, **trauma de alta energia**, **fratura transcervical com desvio (Garden IV)** e quadril sem outras lesões. No paciente jovem com fratura do colo do fêmur, o objetivo é **preservar a articulação**: faz-se a redução anatômica e a fixação interna (parafusos canulados ou outro método estável) em urgência, nas primeiras 24 horas, para reduzir o risco de necrose avascular da cabeça femoral. B está errada porque a artroplastia é o tratamento do idoso com fratura desviada, e não do adulto jovem com osso bom. C está errada porque o atraso na redução e na fixação aumenta a necrose avascular. D está errada porque a fratura do colo femoral desviada não consolida com tratamento conservador e a imobilização prolongada traz complicações.",
  explicacoesAlternativas:{},
  referencias:"Court-Brown CM et al. Rockwood and Green's Fractures in Adults, 9ª ed., 2019 (capítulo sobre fraturas do colo do fêmur); Slobogean GP et al. Management of young femoral neck fractures: is there a consensus? Injury 2015;46:435-440.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q60 da UNIFESP 2025
{
  id:"q-adap25-060", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-prevencao",
  enunciado:"Mulher, 55 anos, assintomática, sem história pessoal ou familiar de câncer, hipertensa em tratamento, procura a unidade básica de saúde para exames periódicos. De acordo com as recomendações do Serviço de Prevenção dos Estados Unidos (USPSTF), qual rastreamento NÃO deve ser oferecido de rotina?",
  alternativas:[{id:"A",texto:"Ultrassonografia transvaginal e CA-125 para o rastreamento do câncer de ovário."},{id:"B",texto:"Mamografia a cada 2 anos para o rastreamento do câncer de mama."},{id:"C",texto:"Teste de papilomavírus humano ou citologia cervical para o rastreamento do câncer do colo do útero."},{id:"D",texto:"Pesquisa de sangue oculto nas fezes ou colonoscopia para o rastreamento do câncer colorretal."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: mulher de **55 anos**, **assintomática** e de **risco habitual** (sem história pessoal ou familiar de câncer). O rastreamento do câncer de ovário com ultrassonografia transvaginal e CA-125 **não reduz a mortalidade** e causa muitos falsos-positivos, com cirurgias desnecessárias; o USPSTF o desaconselha (recomendação D). B está errada porque a mamografia bienal é recomendada pelo USPSTF de 40 a 74 anos. C está errada porque o rastreamento do câncer do colo do útero é recomendado até os 65 anos, por citologia a cada 3 anos ou teste de HPV a cada 5 anos. D está errada porque o rastreamento do câncer colorretal é recomendado de 45 a 75 anos, por exames de fezes ou colonoscopia.",
  explicacoesAlternativas:{},
  referencias:"US Preventive Services Task Force. Screening for ovarian cancer. JAMA 2018;319:588-594; USPSTF. Screening for breast cancer. JAMA 2024;331:1918-1930; USPSTF. Screening for cervical cancer. JAMA 2018;320:674-686; USPSTF. Screening for colorectal cancer. JAMA 2021;325:1965-1977.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q61 da UNIFESP 2025
{
  id:"q-adap25-061", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-desenhosestudo",
  enunciado:"Pesquisadores compararam, entre os 27 estados brasileiros, o consumo médio de sal por habitante, obtido em inquéritos de orçamento familiar, com a taxa de mortalidade por acidente vascular cerebral de cada estado, obtida no sistema de informações sobre mortalidade. Não havia informação sobre o consumo de sal das pessoas que morreram. Qual é o desenho desse estudo?",
  alternativas:[{id:"A",texto:"Estudo de coorte retrospectivo, com seguimento de indivíduos expostos e não expostos ao sal."},{id:"B",texto:"Estudo de caso-controle, com comparação entre as pessoas que morreram e as que não morreram por AVC."},{id:"C",texto:"Estudo transversal analítico, com medida simultânea da exposição e do desfecho em indivíduos."},{id:"D",texto:"Estudo ecológico, em que a unidade de análise é o estado e não o indivíduo, com dados agregados."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: a **unidade de análise é o estado** (27 estados), a exposição (**consumo médio de sal**) e o desfecho (**taxa de mortalidade**) são **agregados** de populações, e **não há dado individual** sobre o consumo de sal de quem morreu. Esse é o **estudo ecológico**, que compara grupos e não permite concluir sobre o risco do indivíduo (falácia ecológica). A está errada porque a coorte segue indivíduos expostos e não expostos no tempo, com dado individual. B está errada porque o caso-controle parte de indivíduos com e sem o desfecho e investiga a exposição de cada um. C está errada porque o estudo transversal mede exposição e desfecho no mesmo indivíduo, em um só momento.",
  explicacoesAlternativas:{},
  referencias:"Gordis L. Epidemiologia, 5ª ed., 2017 (capítulo sobre desenhos de estudo); Fletcher RH, Fletcher SW, Fletcher GS. Epidemiologia Clínica, 5ª ed., Artmed, 2014; von Elm E et al. STROBE statement. BMJ 2007;335:806-808.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q62 da UNIFESP 2025
{
  id:"q-adap25-062", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-neuro", assuntoId:"ass-neuro-neuromuscular",
  enunciado:"Mulher, 34 anos, com miastenia gravis generalizada em tratamento com piridostigmina e prednisona, procura o pronto-socorro com 4 dias de infecção respiratória, piora da fraqueza, voz anasalada, disfagia, ptose bilateral e dispneia, com fala entrecortada. Peso de 60 kg. Exames: capacidade vital forçada de 700 mL, pressão inspiratória máxima de -18 cmH2O, SpO2 de 94% em ar ambiente e PaCO2 de 52 mmHg. Qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Oxigênio por máscara e aumento da dose de piridostigmina, com reavaliação em 24 horas."},{id:"B",texto:"Pulsoterapia com metilprednisolona isolada, por ser o tratamento mais rápido da crise."},{id:"C",texto:"Observação em enfermaria, com oximetria contínua e nova medida da capacidade vital em 24 horas."},{id:"D",texto:"Intubação orotraqueal com ventilação mecânica e início de imunoglobulina endovenosa ou de plasmaférese."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: miastenia com **infecção como desencadeante**, **disfagia, voz anasalada e dispneia**, **capacidade vital de 700 mL (cerca de 12 mL/kg, abaixo de 20 mL/kg)**, **pressão inspiratória máxima de -18 cmH2O** (menos negativa que -30 cmH2O) e **PaCO2 de 52 mmHg** (retenção): crise miastênica com falência respiratória iminente. Indica-se a proteção da via aérea e a ventilação mecânica, e inicia-se imunoterapia de resgate (imunoglobulina endovenosa ou plasmaférese), com tratamento da infecção. A está errada porque o oxigênio não corrige a hipoventilação, e mais piridostigmina aumenta secreções e não resolve a crise. B está errada porque a pulsoterapia isolada pode causar piora transitória da fraqueza e não age no tempo necessário. C está errada porque a capacidade vital e a PaCO2 mostram que a observação é insegura.",
  explicacoesAlternativas:{},
  referencias:"Narayanaswami P et al. International consensus guidance for management of myasthenia gravis: 2020 update. Neurology 2021;96:114-122; Wendell LC, Levine JM. Myasthenic crisis. Neurohospitalist 2011;1:16-22.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q63 da UNIFESP 2025
{
  id:"q-adap25-063", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-genetica", assuntoId:"ass-genetica-sindromes",
  imagemUrl:"dados/imagens/q-adap25-063.png", imagemLegenda:"Heredograma de uma família com miopatia de início na infância (ilustração esquemática; símbolos cheios indicam os afetados).",
  enunciado:"A figura mostra o heredograma de uma família com uma miopatia de início na infância. Considerando o padrão de transmissão observado, qual é o tipo de herança mais provável?",
  alternativas:[{id:"A",texto:"Herança autossômica dominante, de penetrância completa."},{id:"B",texto:"Herança autossômica recessiva, em genitores consanguíneos."},{id:"C",texto:"Herança recessiva ligada ao cromossomo X."},{id:"D",texto:"Herança mitocondrial, de transmissão materna."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas da figura: **só homens afetados** (II-2, III-1 e III-7); a doença **passa por mulheres não afetadas** (a filha II-1 e a filha II-4, que têm filhos afetados, são portadoras assintomáticas); o homem afetado II-2 tem **filhos homens sem a doença** (**sem transmissão de pai para filho**) e filhas portadoras. Esse é o padrão da herança recessiva ligada ao X. A está errada porque na herança dominante o genitor afetado estaria presente em cada geração, e aqui os genitores de II-2 não são afetados. B está errada porque na herança autossômica recessiva homens e mulheres seriam afetados com a mesma frequência, e os casamentos com cônjuges sem relação de parentesco tornariam improvável que todos os afetados fossem homens. D está errada porque na herança mitocondrial a mãe transmite a todos os filhos, de ambos os sexos, o que não ocorre nesse heredograma.",
  explicacoesAlternativas:{},
  referencias:"Nussbaum RL, McInnes RR, Willard HF. Thompson & Thompson Genética Médica, 8ª ed., 2016 (capítulo sobre padrões de herança monogênica); Bennett RL et al. Recommendations for standardized human pedigree nomenclature. J Genet Couns 2008;17:424-433.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q64 da UNIFESP 2025
{
  id:"q-adap25-064", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-neuro", assuntoId:"ass-neuro-avc",
  enunciado:"Mulher, 52 anos, hipertensa, chega ao pronto-socorro 3 horas depois de cefaleia súbita e intensa, a pior de sua vida, seguida de vômitos. Exame: Glasgow 15, rigidez de nuca, sem déficit focal. A tomografia de crânio sem contraste mostra hiperdensidade nas cisternas basais, e a angiotomografia, aneurisma de 6 mm da artéria comunicante anterior. O tratamento do aneurisma foi programado para as próximas horas. Além do tratamento do aneurisma, qual medida reduz o risco de isquemia cerebral tardia e de mau prognóstico?",
  alternativas:[{id:"A",texto:"Ácido tranexâmico por 3 meses, para evitar o ressangramento até a cicatrização do aneurisma."},{id:"B",texto:"Fenitoína profilática por 3 semanas, para prevenir crises convulsivas e a isquemia."},{id:"C",texto:"Nimodipina por via oral, 60 mg a cada 4 horas, durante 21 dias, monitorando a pressão."},{id:"D",texto:"Hipertensão induzida por rotina, com vasopressor, para prevenir o vasoespasmo."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **cefaleia súbita («a pior da vida»)**, **rigidez de nuca**, **hiperdensidade nas cisternas basais** e **aneurisma da comunicante anterior**: hemorragia subaracnóidea aneurismática, com risco de **vasoespasmo e isquemia cerebral tardia** entre o 4º e o 14º dia. A nimodipina (60 mg por via oral a cada 4 horas, por 21 dias) melhora o prognóstico funcional, sem necessariamente reduzir o vasoespasmo angiográfico, e é a medida recomendada, com atenção à hipotensão (pode-se fracionar a dose para 30 mg a cada 2 horas). A está errada porque o antifibrinolítico prolongado não melhorou os desfechos clínicos em estudos randomizados e aumenta eventos tromboembólicos; o tratamento precoce do aneurisma é que evita o ressangramento. B está errada porque a profilaxia anticonvulsivante prolongada não é recomendada e a fenitoína se associou a pior desfecho. D está errada porque a hipertensão induzida não é preventiva de rotina, e a pressão arterial deve ser mantida em faixas seguras até o aneurisma ser tratado.",
  explicacoesAlternativas:{},
  referencias:"Hoh BL et al. 2023 Guideline for the Management of Patients With Aneurysmal Subarachnoid Hemorrhage. Stroke 2023;54:e314-e370; Post R et al. Short-term tranexamic acid treatment in aneurysmal subarachnoid haemorrhage (ULTRA). Lancet 2021;397:112-118.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q65 da UNIFESP 2025
{
  id:"q-adap25-065", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-oncogineco", assuntoId:"ass-caendometrio",
  enunciado:"Mulher, 57 anos, foi submetida a histerectomia total com salpingo-ooforectomia bilateral e biópsia do linfonodo sentinela por carcinoma endometrioide de alto grau (grau 3), com invasão de 60% do miométrio e invasão linfovascular, sem comprometimento do colo, dos anexos ou dos linfonodos. A análise molecular mostrou mutação patogênica do domínio exonuclease do gene POLE, p53 selvagem e proteínas de reparo de pareamento (MMR) preservadas. Qual é o tratamento adjuvante mais adequado?",
  alternativas:[{id:"A",texto:"Observação, sem tratamento adjuvante, pelo ótimo prognóstico desse subtipo molecular."},{id:"B",texto:"Quimioterapia com carboplatina e paclitaxel e radioterapia, pelo grau 3 e pela invasão linfovascular."},{id:"C",texto:"Braquiterapia vaginal isolada, por ser tumor de risco intermediário-alto pelos critérios clínicos."},{id:"D",texto:"Radioterapia pélvica externa isolada, pela profundidade da invasão do miométrio no útero."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: carcinoma endometrioide **grau 3**, com **invasão de 60% do miométrio** e **invasão linfovascular** (fatores que, isolados, levariam a tratamento adjuvante), porém **confinado ao útero (estádio I)**, com **mutação de POLE (exonuclease)**, p53 selvagem e MMR preservado. Na classificação molecular, o subtipo **POLE mutado** tem prognóstico excelente, e, nos estádios I e II, a recomendação é **não fazer tratamento adjuvante**, mesmo com características patológicas desfavoráveis. B está errada porque a quimioterapia com radioterapia é o tratamento do subtipo p53 anormal (alto risco) e de estádios avançados, e aqui seria excesso de tratamento. C está errada porque a braquiterapia isolada seria a opção para o risco intermediário-alto no subtipo de perfil molecular não específico. D está errada porque a radioterapia pélvica externa isolada só se indicaria por outros critérios (estádio mais avançado, por exemplo), e a profundidade de invasão perde o peso diante do subtipo POLE.",
  explicacoesAlternativas:{},
  referencias:"Concin N et al. ESGO/ESTRO/ESP guidelines for the management of patients with endometrial carcinoma. Int J Gynecol Cancer 2021;31:12-39 (atualização de 2025 não conferida); Berek JS et al. FIGO staging of endometrial cancer: 2023. Int J Gynaecol Obstet 2023;162:383-394.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q66 da UNIFESP 2025
{
  id:"q-adap25-066", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-ginecologia", assuntoId:"ass-uroginecologia",
  enunciado:"Mulher, 62 anos, queixa-se há 3 meses de urgência miccional intensa, com perda de urina antes de chegar ao banheiro, 12 micções por dia e 3 noctúrias. Não tem disúria, hematúria nem perda urinária aos esforços. Bebe cerca de 5 xícaras de café por dia. Exame físico sem prolapso, urina tipo 1 normal e resíduo pós-miccional de 30 mL. Qual é a abordagem inicial mais adequada?",
  alternativas:[{id:"A",texto:"Injeção de toxina botulínica na bexiga, como primeira medida terapêutica."},{id:"B",texto:"Terapia comportamental, com treino vesical e redução da cafeína."},{id:"C",texto:"Neuromodulação sacral, com implante de eletrodo, por ser a mais eficaz."},{id:"D",texto:"Cirurgia de sling suburetral, para corrigir a perda de urina da paciente."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **urgência com perda antes de chegar ao banheiro**, **12 micções por dia e noctúria**, **sem perda aos esforços**, **urina tipo 1 normal** (sem infecção ou hematúria) e **resíduo de 30 mL** (sem retenção): bexiga hiperativa, com **ingestão alta de cafeína**. A abordagem inicial é a menos invasiva: terapia comportamental (treino vesical, ajuste de líquidos e redução de cafeína, exercícios do assoalho pélvico), com tratamento medicamentoso (agonista beta-3 ou antimuscarínico) acrescentado conforme o caso e a decisão compartilhada. A está errada porque a toxina botulínica intradetrusora é reservada à doença refratária, e exige disposição para cateterismo se houver retenção. C está errada porque a neuromodulação sacral também é um procedimento para casos refratários. D está errada porque o sling trata a incontinência de esforço, que a paciente não tem.",
  explicacoesAlternativas:{},
  referencias:"Cameron AP et al. The AUA/SUFU Guideline on the Diagnosis and Treatment of Idiopathic Overactive Bladder. J Urol 2024;212:11-20 (as opções foram conferidas em resumos, não no texto); Sociedade Brasileira de Urologia e FEBRASGO, consensos de bexiga hiperativa.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q67 da UNIFESP 2025
{
  id:"q-adap25-067", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-oncogineco", assuntoId:"ass-cacolo",
  enunciado:"Mulher, 34 anos, assintomática, vacinada contra HPV aos 14 anos, procura a unidade básica de saúde porque nunca realizou exame preventivo do colo do útero. Não tem imunossupressão nem história de lesão cervical. Segundo as diretrizes brasileiras de 2025 para o rastreamento do câncer do colo do útero (Portaria Conjunta SAES/SECTICS nº 13/2025), qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Teste de DNA-HPV oncogênico, repetido a cada 5 anos se o resultado for negativo."},{id:"B",texto:"Citologia anual por 2 anos seguidos e, depois, a cada 3 anos, pela vacinação prévia."},{id:"C",texto:"Citologia a cada 3 anos desde o início, sem o teste de HPV."},{id:"D",texto:"Colposcopia anual, porque nunca se rastreou e a vacinação não dispensa o exame."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: mulher de **34 anos** (dentro da faixa de 25 a 64 anos), **sem imunossupressão** nem lesão prévia (população geral) e **vacinada contra HPV**, mas **nunca rastreada**. As diretrizes brasileiras de 2025 adotam o **teste de DNA-HPV oncogênico** como rastreamento primário em mulheres de 25 a 64 anos, a cada **5 anos** se negativo; a vacinação **não dispensa** o rastreamento. B está errada porque o esquema de duas citologias anuais seguidas de citologia trienal era o das diretrizes de 2016, substituídas, e a vacinação não muda o intervalo. C está errada porque a citologia trienal exclusiva é o esquema anterior; hoje a citologia é usada como exame de triagem (reflexo) dos testes positivos. D está errada porque a colposcopia é exame de investigação das alterações do rastreamento, e não de rastreamento em mulher assintomática.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Portaria Conjunta SAES/SECTICS nº 13, de 29 de julho de 2025, que aprova a Parte I das Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero (conferida em resumos; o texto oficial não pôde ser aberto); Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, 2ª ed., INCA, 2016 (substituída).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q68 da UNIFESP 2025
{
  id:"q-adap25-068", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-oncogineco", assuntoId:"ass-camama",
  enunciado:"Mulher, 58 anos, queixa-se há 4 meses de lesão eczematosa, descamativa e pruriginosa no mamilo e na aréola da mama esquerda, com erosões e secreção serosa, que não melhorou depois de 6 semanas de corticoide tópico de média potência. A lesão é unilateral e não há lesões semelhantes em outras partes do corpo. À palpação, não há nódulo nas mamas nem linfonodos axilares aumentados. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Prolongar o corticoide tópico por mais 4 semanas e reavaliar, por se tratar de eczema de contato."},{id:"B",texto:"Iniciar antifúngico tópico por 2 semanas, pela suspeita de candidíase do complexo areolopapilar."},{id:"C",texto:"Colher cultura da secreção e tratar com antibiótico conforme o resultado, pela suspeita de infecção."},{id:"D",texto:"Biópsia da lesão do mamilo e avaliação das mamas por mamografia e ultrassonografia."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **lesão eczematosa, descamativa e erosada do mamilo e da aréola**, **unilateral**, de **4 meses**, **sem resposta a 6 semanas de corticoide tópico** e sem nódulo palpável: doença de Paget da mama até prova em contrário. O eczema do mamilo que não cura com tratamento tópico em poucas semanas exige **biópsia da lesão** (punch ou cunha), porque mais de 90% dos casos se associam a carcinoma ductal in situ ou invasivo subjacente, mesmo sem nódulo palpável; a **mamografia e a ultrassonografia** das mamas completam a avaliação. A está errada porque prolongar o corticoide atrasa o diagnóstico de um câncer, e o eczema de contato costuma ser bilateral e responde ao corticoide. B está errada porque o antifúngico trata candidíase, que é rara no mamilo da mulher fora da lactação e responde rápido. C está errada porque a cultura e o antibiótico tratam infecção bacteriana, que não explica a lesão crônica, sem sinais inflamatórios agudos.",
  explicacoesAlternativas:{},
  referencias:"Sandoval-Leon AC et al. Paget's disease of the nipple. Breast Cancer Res Treat 2013;141:1-12; Brasil. Ministério da Saúde/INCA. Diretrizes para a detecção precoce do câncer de mama no Brasil, 2015.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q69 da UNIFESP 2025
{
  id:"q-adap25-069", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-ginecologia", assuntoId:"ass-ciclomenstrual",
  enunciado:"Mulher, 24 anos, queixa-se de ciclos menstruais a cada 45 a 60 dias desde a menarca, acne e crescimento excessivo de pelos no rosto, no abdome e no peito, com escore de Ferriman-Gallwey modificado de 14. Índice de massa corporal de 29 kg/m². O teste de gravidez é negativo. Não tem galactorreia, estrias violáceas nem sinais de virilização. Qual é o próximo passo para confirmar o diagnóstico de síndrome dos ovários policísticos?",
  alternativas:[{id:"A",texto:"Ultrassonografia transvaginal obrigatória, para contar os folículos antrais em cada ovário."},{id:"B",texto:"Laparoscopia com biópsia de ovário, para documentar o aumento do estroma ovariano."},{id:"C",texto:"Dosagem do hormônio antimülleriano, necessária para confirmar o diagnóstico em todos os casos."},{id:"D",texto:"Excluir outras causas, com TSH, prolactina e 17-OH-progesterona, sem imagem."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **oligomenorreia desde a menarca** (disfunção ovulatória) e **hiperandrogenismo clínico (acne e hirsutismo, com Ferriman-Gallwey de 14, acima do ponto de corte para hirsutismo)**, **sem sinais de virilização, galactorreia ou hipercortisolismo**. Na mulher adulta, o diagnóstico de síndrome dos ovários policísticos exige dois de três critérios (hiperandrogenismo, disfunção ovulatória e ovários policísticos, avaliados por ultrassonografia ou hormônio antimülleriano), depois de afastadas outras causas; quando há **hiperandrogenismo e disfunção ovulatória juntos**, a imagem ou o antimülleriano **não são necessários**, e o passo seguinte é excluir outros diagnósticos (hipotireoidismo, hiperprolactinemia, hiperplasia adrenal não clássica por 17-hidroxiprogesterona). A está errada porque, com dois critérios clínicos presentes, a ultrassonografia não é obrigatória. B está errada porque a biópsia de ovário não faz parte do diagnóstico. C está errada porque o antimülleriano pode substituir a ultrassonografia como o terceiro critério, mas não é necessário aqui.",
  explicacoesAlternativas:{},
  referencias:"Teede HJ et al. Recommendations from the 2023 international evidence-based guideline for the assessment and management of polycystic ovary syndrome. J Clin Endocrinol Metab 2023;108:2447-2469 (conferido em resumos); Rotterdam ESHRE/ASRM Consensus. Hum Reprod 2004;19:41-47.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q70 da UNIFESP 2025
{
  id:"q-adap25-070", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-ginecologia", assuntoId:"ass-miomatose",
  enunciado:"Mulher, 34 anos, nuligesta, refere sangramento menstrual muito intenso, com coágulos, há 8 anos, com ciclos regulares. Deseja um método contraceptivo e não pretende engravidar nos próximos 5 anos. Hemoglobina de 11,2 g/dL e ferritina de 14 ng/mL. A ultrassonografia pélvica mostra útero de 120 mL com mioma intramural de 25 mm, sem distorção da cavidade endometrial, e endométrio de 8 mm. Qual é o tratamento mais adequado?",
  alternativas:[{id:"A",texto:"Embolização das artérias uterinas, como tratamento inicial do sangramento da paciente."},{id:"B",texto:"DIU de levonorgestrel, que trata o sangramento e também contracepciona."},{id:"C",texto:"Análogo do GnRH em uso contínuo por 12 meses, para reduzir o volume do mioma e o fluxo."},{id:"D",texto:"Ácido tranexâmico nos dias de fluxo, que trata o sangramento e dispensa outro método."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **sangramento menstrual intenso com ciclos regulares** e **anemia ferropriva (hemoglobina de 11,2 g/dL e ferritina de 14 ng/mL)**, **mioma intramural de 25 mm sem distorção da cavidade** (a cavidade normal permite o dispositivo), paciente **sem desejo de gestação por 5 anos** e que **quer contracepção**. O sistema intrauterino de levonorgestrel reduz o sangramento em cerca de 70% a 90% e é contraceptivo, sendo tratamento clínico de primeira linha. A está errada porque a embolização é para mulheres com sintomas volumosos ou refratários, e em geral reduz a fertilidade. C está errada porque o análogo do GnRH contínuo é de curto prazo (3 a 6 meses, antes de cirurgia ou para corrigir anemia), com efeitos de hipoestrogenismo. D está errada porque o ácido tranexâmico reduz o fluxo, mas não é contraceptivo e a paciente quer um método.",
  explicacoesAlternativas:{},
  referencias:"National Institute for Health and Care Excellence. Heavy menstrual bleeding: assessment and management (NG88), 2018 (atualizada em 2021); Munro MG et al. FIGO classification system (PALM-COEIN) for causes of abnormal uterine bleeding. Int J Gynaecol Obstet 2018;143:393-408.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q71 da UNIFESP 2025
{
  id:"q-adap25-071", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-ginecologia", assuntoId:"ass-climaterio",
  enunciado:"Mulher, 52 anos, com menopausa aos 50 anos, histerectomizada por mioma há 3 anos, com ovários preservados, queixa-se há 1 ano de fogachos intensos, sudorese noturna e insônia. Não tem história de câncer de mama, tromboembolismo ou doença cardiovascular. PA de 118/76 mmHg, IMC de 24 kg/m² e mamografia normal. Deseja tratamento medicamentoso. Qual é a terapia hormonal mais adequada?",
  alternativas:[{id:"A",texto:"Estrogênio associado a progestogênio contínuo, para proteger o endométrio."},{id:"B",texto:"Progestogênio isolado em dose alta, que controla os fogachos de modo equivalente."},{id:"C",texto:"Estrogênio isolado, sem progestogênio, pela ausência de útero."},{id:"D",texto:"Tibolona associada a estrogênio, para ampliar o efeito sobre os sintomas."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **sintomas vasomotores intensos** (fogachos, sudorese e insônia), **52 anos e menopausa há 2 anos** (menos de 60 anos e menos de 10 anos de menopausa: janela favorável), **sem contraindicações** (sem câncer de mama, tromboembolismo ou doença cardiovascular) e **sem útero** (histerectomia). O estrogênio isolado trata os sintomas e dispensa o progestogênio, cuja função é proteger o endométrio contra a hiperplasia causada pelo estrogênio, e ele traz riscos próprios (mama, tromboembolismo). A está errada porque o progestogênio é desnecessário sem útero e acrescenta risco. B está errada porque o progestogênio isolado não é equivalente ao estrogênio no controle dos sintomas vasomotores. D está errada porque a tibolona é uma alternativa isolada ao esquema estroprogestativo, e não se associa ao estrogênio.",
  explicacoesAlternativas:{},
  referencias:"The 2022 Hormone Therapy Position Statement of The North American Menopause Society. Menopause 2022;29:767-794; Sociedade Brasileira de Climatério. Consenso Brasileiro de Terapêutica Hormonal da Menopausa, 2018 (edição mais nova não conferida).",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q72 da UNIFESP 2025
{
  id:"q-adap25-072", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-dmg",
  enunciado:"Gestante, 30 semanas, com diabetes mellitus gestacional diagnosticado com 26 semanas, mantém, depois de 2 semanas de orientação nutricional e atividade física, a seguinte automonitorização glicêmica: glicemias de jejum de 98, 101, 96, 99, 102 e 97 mg/dL e, 1 hora depois das refeições, entre 118 e 136 mg/dL. Não houve hipoglicemia. A ultrassonografia mostra crescimento fetal no percentil 55. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Iniciar insulina, porque as glicemias de jejum seguem acima da meta apesar da dieta e do exercício."},{id:"B",texto:"Manter a dieta e a atividade física, pois as glicemias pós-prandiais estão dentro da meta."},{id:"C",texto:"Iniciar glibenclamida, por ser a droga oral de escolha e de menor custo na gestação."},{id:"D",texto:"Repetir o teste oral de tolerância à glicose, para confirmar a necessidade de medicamento."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: diabetes gestacional que, depois de **2 semanas de dieta e atividade física**, mantém **todas as glicemias de jejum acima de 95 mg/dL** (98, 101, 96, 99, 102 e 97), embora as de **1 hora pós-prandial estejam na meta (abaixo de 140 mg/dL)**. As metas na gestação diabética são **jejum abaixo de 95 mg/dL**, **1 hora pós-prandial abaixo de 140 mg/dL** (ou 2 horas abaixo de 120 mg/dL); quando uma parte relevante dos valores fica acima da meta depois de 1 a 2 semanas de medidas de estilo de vida, indica-se o medicamento, e a **insulina** é a primeira escolha, por não atravessar a placenta de forma significativa. B está errada porque a meta de jejum não foi atingida, e uma só meta pós-prandial não basta. C está errada porque a glibenclamida atravessa a placenta e se associou a mais macrossomia e hipoglicemia neonatal, e não é a droga de escolha. D está errada porque o diagnóstico já foi feito, e repetir o teste oral de tolerância não ajuda a decidir o tratamento.",
  explicacoesAlternativas:{},
  referencias:"American Diabetes Association. Standards of Care in Diabetes - 2025, section 15 (Management of Diabetes in Pregnancy). Diabetes Care 2025;48(Suppl 1); American College of Obstetricians and Gynecologists. Practice Bulletin nº 190: Gestational diabetes mellitus. Obstet Gynecol 2018;131:e49-e64.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q73 da UNIFESP 2025
{
  id:"q-adap25-073", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-ginecologia", assuntoId:"ass-infertilidade",
  enunciado:"Casal formado por uma mulher de 37 anos, nuligesta, com ciclos regulares, e um homem de 39 anos, sem filhos e saudável, tenta engravidar há 8 meses, com relações sexuais sem proteção duas a três vezes por semana, sem sucesso. Procuram atendimento por ansiedade. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Orientar a manter as tentativas por mais 4 meses, completando 12 meses, antes de iniciar exames."},{id:"B",texto:"Orientar a manter as tentativas por 24 meses, porque a maioria dos casais engravida nesse prazo de tempo."},{id:"C",texto:"Encaminhar diretamente à fertilização in vitro, sem investigação prévia, pela idade da mulher."},{id:"D",texto:"Iniciar a investigação do casal, pois, com mulher de 35 anos ou mais, o prazo para investigar é de 6 meses."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: mulher de **37 anos** (35 anos ou mais) e **8 meses** de tentativas, com relações regulares, sem queixas. A infertilidade se define por 12 meses de relações sem proteção na mulher com menos de 35 anos, e **6 meses na mulher com 35 anos ou mais**, porque a reserva ovariana cai com a idade e o atraso diminui as chances; por isso a investigação do casal (avaliação da ovulação, das tubas, do útero e do espermograma) deve começar já. A está errada porque aplica o prazo de 12 meses a uma mulher com 35 anos ou mais. B está errada porque 24 meses é prazo longo demais, e a espera reduz a chance de gestação. C está errada porque a fertilização in vitro só se indica depois da investigação, de acordo com a causa.",
  explicacoesAlternativas:{},
  referencias:"Practice Committee of the American Society for Reproductive Medicine. Definitions of infertility and recurrent pregnancy loss: a committee opinion. Fertil Steril 2020;113:533-535; ESHRE Guideline: unexplained infertility. Hum Reprod Open 2023;2023:hoad048.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q74 da UNIFESP 2025
{
  id:"q-adap25-074", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-aloimunizacaorh",
  enunciado:"Mulher de 29 anos, do grupo sanguíneo O com fator Rh ausente, está na primeira gestação, com 28 semanas. O pai do feto é Rh positivo. A pesquisa de anticorpos contra hemácias (Coombs indireto) colhida hoje não detecta anticorpos. Qual medida deve ser tomada para evitar a aloimunização?",
  alternativas:[{id:"A",texto:"Repetir o Coombs indireto a cada 4 semanas e aplicar a imunoglobulina anti-D após o parto do bebê."},{id:"B",texto:"Imunoglobulina anti-D agora e nova dose em até 72 horas após o parto, se o bebê for Rh positivo."},{id:"C",texto:"Nenhuma medida, porque o Coombs indireto negativo afasta o risco de sensibilização."},{id:"D",texto:"Dopplervelocimetria da artéria cerebral média toda semana, para detectar precocemente a anemia fetal."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: mulher **Rh negativo**, na **primeira gestação**, com **Coombs indireto negativo** (ainda **não sensibilizada**) e pai do feto Rh positivo (o feto pode ser Rh positivo), na **28ª semana**. A profilaxia da aloimunização se faz com imunoglobulina anti-D (300 mcg, por via intramuscular) por volta da 28ª semana e nova dose em até 72 horas depois do parto, se o recém-nascido for Rh positivo; também se aplica depois de eventos sensibilizantes (aborto, sangramento, procedimentos invasivos). A está errada porque deixar a profilaxia só para o pós-parto perde a proteção das sensibilizações silenciosas do fim da gestação. C está errada porque o Coombs negativo mostra apenas que ela ainda não se sensibilizou, e é justamente por isso que a profilaxia funciona. D está errada porque a dopplervelocimetria da artéria cerebral média serve à gestante já sensibilizada, com título significativo.",
  explicacoesAlternativas:{},
  referencias:"American College of Obstetricians and Gynecologists. Practice Bulletin nº 181: Prevention of Rh D alloimmunization. Obstet Gynecol 2017;130:e57-e70; Brasil. Ministério da Saúde. Manual de Gestação de Alto Risco, 2022.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q75 da UNIFESP 2025
{
  id:"q-adap25-075", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-oncogineco", assuntoId:"ass-doencatrofoblastica",
  enunciado:"Mulher, 28 anos, G1P0, foi submetida a esvaziamento uterino por vácuo-aspiração por mola hidatiforme completa, confirmada à histologia, com hCG de 180.000 mUI/mL antes do procedimento. Está assintomática e sem sangramento, e a ultrassonografia pélvica depois do esvaziamento mostra cavidade uterina vazia. Qual é a conduta de seguimento mais adequada?",
  alternativas:[{id:"A",texto:"Dosagem semanal do hCG até negativar, com contracepção eficaz durante o seguimento."},{id:"B",texto:"Dosagem mensal do hCG por 2 anos, liberando uma nova gestação após 6 meses de seguimento."},{id:"C",texto:"Seguimento só clínico e ultrassonográfico, sem hCG, por se tratar de uma mola benigna."},{id:"D",texto:"Segunda curetagem sistemática em 15 dias, para confirmar o esvaziamento completo do útero."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **mola hidatiforme completa** com **hCG inicial de 180.000 mUI/mL**, tratada por **vácuo-aspiração** e hoje assintomática. A mola completa pode evoluir para neoplasia trofoblástica gestacional (cerca de 15% a 20% dos casos), e o seguimento se faz com **dosagem semanal do hCG até a negativação** e depois com dosagens periódicas por alguns meses, com **contracepção eficaz** para que uma gestação não confunda a interpretação do hCG; a curva de queda é o que detecta a persistência. B está errada porque o seguimento semanal inicial é indispensável e o seguimento mensal por 2 anos não é o preconizado. C está errada porque, sem o hCG, não há como detectar a neoplasia; a ultrassonografia não substitui o marcador. D está errada porque a segunda curetagem não é rotina, e é reservada a casos selecionados com tecido retido e sangramento.",
  explicacoesAlternativas:{},
  referencias:"Ngan HYS et al. Update on the diagnosis and management of gestational trophoblastic disease (FIGO Cancer Report 2018). Int J Gynaecol Obstet 2018;143(Suppl 2):79-85; American College of Obstetricians and Gynecologists. Practice Bulletin nº 53: Diagnosis and treatment of gestational trophoblastic disease, 2004 (reafirmado).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q76 da UNIFESP 2025
{
  id:"q-adap25-076", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-prenatal",
  enunciado:"Gestante de 31 anos, com 30 semanas, sem intercorrências, recebeu 3 doses de vacina contra o tétano há 3 anos, 3 doses de vacina contra hepatite B e refere esquema vacinal completo na infância. Segundo o calendário do Programa Nacional de Imunizações, qual vacina deve ser administrada nesta gestação, independentemente do esquema anterior?",
  alternativas:[{id:"A",texto:"dT (dupla adulto), como reforço único, porque o esquema anterior contra o tétano está completo."},{id:"B",texto:"Nenhuma vacina, porque o esquema completo contra tétano e hepatite B dispensa doses na gestação."},{id:"C",texto:"Vacina dTpa, uma dose a cada gestação, a partir da 20ª semana, para proteger o recém-nascido da coqueluche."},{id:"D",texto:"dTpa apenas se o esquema contra o tétano estiver incompleto, pois a coqueluche não é alvo da vacina."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: gestante de **30 semanas** com **3 doses de vacina contra o tétano há 3 anos** (esquema anterior completo) e hepatite B completa. Mesmo assim, a **vacina dTpa** (difteria, tétano e coqueluche acelular) é indicada **a cada gestação**, a partir da **20ª semana**, porque o objetivo é **proteger o recém-nascido contra a coqueluche**, por meio dos anticorpos transferidos pela placenta, antes de ele poder ser vacinado; essa indicação independe do esquema anterior contra o tétano. A está errada porque a dT não contém o componente da coqueluche, e o reforço contra o tétano não cumpre o objetivo da vacinação na gestação. B está errada porque o esquema completo de tétano e de hepatite B não dispensa a dTpa da gestação, que protege o recém-nascido e não a mãe. D está errada porque a indicação da dTpa não depende do esquema contra o tétano: a coqueluche é justamente o alvo da vacina.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Calendário Nacional de Vacinação e Nota Técnica sobre vacinação da gestante (dTpa a partir da 20ª semana; texto oficial vigente não conferido); Sociedade Brasileira de Imunizações. Calendário de vacinação da gestante, 2025.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q77 da UNIFESP 2025
{
  id:"q-adap25-077", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-dmg",
  enunciado:"Gestante de 31 anos, secundigesta, com 38 semanas, tem diagnóstico de diabetes gestacional feito com 26 semanas e controlado apenas com dieta e atividade física, com 90% das glicemias de jejum e pós-prandiais dentro da meta. IMC pré-gestacional de 28 kg/m². A ultrassonografia mostra peso fetal estimado de 3.200 g (percentil 60) e líquido amniótico normal, e a vitalidade fetal é normal. Qual é a conduta mais adequada em relação ao momento e à via de parto?",
  alternativas:[{id:"A",texto:"Cesárea eletiva nesta semana, por causa do diagnóstico de diabetes gestacional da paciente."},{id:"B",texto:"Indução do parto entre 36 e 37 semanas, para evitar a macrossomia fetal."},{id:"C",texto:"Aguardar o trabalho de parto espontâneo até 40 semanas e 6 dias, com vigilância fetal."},{id:"D",texto:"Cesárea eletiva com 39 semanas, pelo risco de macrossomia e de distocia de ombro no parto."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: diabetes gestacional **controlado só com dieta (classe A1)**, **90% das glicemias na meta**, **peso fetal de 3.200 g** (abaixo de 4.500 g) e **vitalidade fetal normal**. Nesse perfil de baixo risco, o parto não deve ser antecipado antes de 39 semanas sem outra indicação; a gestante pode aguardar o trabalho de parto espontâneo até **40 semanas e 6 dias**, com vigilância fetal, e a indução se oferece se passar disso. A via de parto é obstétrica. A está errada porque o diabetes gestacional bem controlado não é indicação de cesárea. B está errada porque a indução antes de 39 semanas, sem indicação fetal ou materna, aumenta a morbidade respiratória neonatal. D está errada porque a cesárea por macrossomia só se considera com peso fetal estimado de 4.500 g ou mais na gestante diabética.",
  explicacoesAlternativas:{},
  referencias:"American College of Obstetricians and Gynecologists. Practice Bulletin nº 190: Gestational diabetes mellitus. Obstet Gynecol 2018;131:e49-e64; ACOG Committee Opinion nº 831: Medically indicated late-preterm and early-term deliveries. Obstet Gynecol 2021;138:e35-e39.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q78 da UNIFESP 2025
{
  id:"q-adap25-078", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-abortamento",
  enunciado:"Mulher, 33 anos, IIIG, IIIA (três abortamentos consecutivos antes de 10 semanas, sem partos), com o mesmo parceiro. Cariótipo do casal normal, útero normal à histerossonografia e TSH normal. O anticoagulante lúpico é positivo em duas ocasiões separadas por 12 semanas, e a anticardiolipina IgG é de 62 GPL (acima do percentil 99), confirmada em 12 semanas. Nunca teve trombose. Chega ao pré-natal com 6 semanas de gestação e embrião com batimentos cardíacos. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Ácido acetilsalicílico em dose baixa isolado, porque a heparina é reservada às pacientes com trombose prévia."},{id:"B",texto:"Ácido acetilsalicílico em dose baixa associado a heparina de baixo peso molecular em dose profilática."},{id:"C",texto:"Heparina de baixo peso molecular em dose terapêutica plena durante toda a gestação."},{id:"D",texto:"Prednisona e imunoglobulina endovenosa, para suprimir a produção dos anticorpos antifosfolípide."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **três abortamentos consecutivos antes de 10 semanas**, causas genéticas e anatômicas afastadas (**cariótipo normal**, útero normal), **anticoagulante lúpico positivo e anticardiolipina IgG em título médio ou alto, confirmados em 12 semanas** e **sem trombose prévia**: síndrome antifosfolípide obstétrica. O tratamento recomendado na gestação é o **ácido acetilsalicílico em dose baixa associado à heparina de baixo peso molecular em dose profilática**, o que aumenta a chance de nascido vivo. A está errada porque a associação à heparina profilática é a recomendada na forma obstétrica, e o ácido acetilsalicílico isolado tem resultado inferior. C está errada porque a dose terapêutica plena é indicada na síndrome com trombose, e não na forma apenas obstétrica. D está errada porque o corticoide e a imunoglobulina não melhoram o desfecho gestacional e expõem a paciente a efeitos adversos.",
  explicacoesAlternativas:{},
  referencias:"Tektonidou MG et al. EULAR recommendations for the management of antiphospholipid syndrome in adults. Ann Rheum Dis 2019;78:1296-1304; ESHRE Guideline Group on RPL. ESHRE guideline: recurrent pregnancy loss: an update in 2022. Hum Reprod Open 2023;2023:hoad002.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q79 da UNIFESP 2025
{
  id:"q-adap25-079", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-gestacaomultipla",
  enunciado:"Gestante de 33 anos, primigesta, com 37 semanas e 4 dias de gestação gemelar dicoriônica e diamniótica sem complicações, está em trabalho de parto espontâneo, com 5 cm de dilatação. O primeiro gemelar está em apresentação cefálica e o segundo, em apresentação pélvica. Os pesos fetais estimados são de 2.750 g e 2.900 g, e a vitalidade fetal é normal. Qual é a conduta mais adequada em relação à via de parto?",
  alternativas:[{id:"A",texto:"Cesárea, porque o segundo gemelar está em apresentação pélvica e não pode nascer por via vaginal."},{id:"B",texto:"Parto vaginal, pois o primeiro é cefálico, com o segundo gemelar manejado por equipe treinada em parto pélvico."},{id:"C",texto:"Cesárea, porque toda gestação gemelar, independentemente da apresentação, tem indicação de parto cesáreo."},{id:"D",texto:"Cesárea, porque o segundo gemelar é maior que o primeiro e o parto vaginal seria mais difícil."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: gestação **dicoriônica e diamniótica**, a **termo (37 semanas e 4 dias)**, **trabalho de parto espontâneo**, **primeiro gemelar cefálico** e pesos fetais **próximos (2.750 g e 2.900 g, diferença de cerca de 5%)**. Quando o primeiro gemelar é cefálico, o parto vaginal planejado é seguro, qualquer que seja a apresentação do segundo, e o ensaio clínico randomizado de parto planejado em gemelares não mostrou vantagem da cesárea; o segundo gemelar é conduzido por equipe com treinamento em manobras de parto pélvico e versão interna. A está errada porque a apresentação do segundo gemelar não é indicação de cesárea. C está errada porque a gestação gemelar, por si só, não é indicação de cesárea. D está errada porque o segundo gemelar apenas um pouco maior (cerca de 5%) não é indicação; a discordância de peso só pesa quando for grande.",
  explicacoesAlternativas:{},
  referencias:"American College of Obstetricians and Gynecologists. Practice Bulletin nº 231: Multifetal gestations: twin, triplet, and higher-order multifetal pregnancies. Obstet Gynecol 2021;137:e145-e162; Barrett JFR et al. A randomized trial of planned cesarean or vaginal delivery for twin pregnancy. N Engl J Med 2013;369:1295-1305.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q80 da UNIFESP 2025
{
  id:"q-adap25-080", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-trabalhoparto",
  imagemUrl:"dados/imagens/q-adap25-080.png", imagemLegenda:"Cardiotocografia dos últimos 10 minutos (ilustração esquemática): frequência cardíaca fetal e atividade uterina.",
  enunciado:"Primigesta, 26 anos, com 39 semanas, em trabalho de parto espontâneo, com 5 cm de dilatação, bolsa rota há 3 horas com líquido claro, recebendo ocitocina em infusão contínua para correção da dinâmica uterina. Está em decúbito dorsal, com PA de 118/74 mmHg e sem febre. A cardiotocografia dos últimos 30 minutos mantém o padrão mostrado na figura. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Manter a conduta expectante e a ocitocina, porque as desacelerações são benignas durante o trabalho de parto."},{id:"B",texto:"Aumentar a dose de ocitocina para acelerar o parto antes que o estado fetal se deteriore."},{id:"C",texto:"Cesárea imediata, sem outras medidas prévias, por se tratar de traçado de categoria III."},{id:"D",texto:"Ressuscitação intrauterina (decúbito lateral, hidratação, suspender ocitocina) e preparar o parto operatório."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas da figura e do enunciado: **linha de base de cerca de 150 bpm** (normal), **variabilidade mínima (5 bpm ou menos)** e **desacelerações tardias recorrentes** (início depois do pico da contração, com retorno depois do seu fim, até cerca de 110 bpm) em **todas as contrações**, em paciente **em decúbito dorsal** e **com ocitocina**. É um traçado de **categoria II (indeterminado)**, que exige avaliação e reanimação intrauterina: mudar para decúbito lateral, hidratar, **suspender a ocitocina** (a hiperatividade uterina reduz a perfusão placentária) e tratar causas como a hipotensão; se o padrão persistir ou se agravar para categoria III, indica-se o parto, em geral operatório, e por isso o centro cirúrgico deve estar pronto. A está errada porque as desacelerações tardias refletem insuficiência placentária e não são benignas. B está errada porque aumentar a ocitocina agrava a hipoperfusão placentária. C está errada porque a categoria III exige ausência de variabilidade com desacelerações recorrentes ou bradicardia, o que a figura não mostra; a primeira medida é a reanimação intrauterina.",
  explicacoesAlternativas:{},
  referencias:"Macones GA et al. The 2008 National Institute of Child Health and Human Development workshop report on electronic fetal monitoring. Obstet Gynecol 2008;112:661-666; American College of Obstetricians and Gynecologists. Practice Bulletin nº 106: Intrapartum fetal heart rate monitoring, 2009 (reafirmado); Brasil. Ministério da Saúde. Diretrizes Nacionais de Assistência ao Parto Normal, 2017.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q81 da UNIFESP 2025
{
  id:"q-adap25-081", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-oncogineco", assuntoId:"ass-cacolo",
  enunciado:"Mulher, 41 anos, apresenta sangramento pós-coito há 3 meses. O exame especular mostra lesão exofítica de 4,2 cm no colo uterino, e a biópsia revela carcinoma escamoso invasor. O toque retal e a ressonância de pelve mostram invasão do paramétrio direito, sem extensão à parede pélvica, sem acometimento da vagina inferior e sem hidronefrose; o PET-CT não mostra linfonodos suspeitos nem metástases. Segundo o estadiamento da FIGO 2018, qual é o tratamento mais adequado?",
  alternativas:[{id:"A",texto:"Histerectomia radical com linfadenectomia pélvica, seguida de radioterapia adjuvante, conforme a patologia."},{id:"B",texto:"Traquelectomia radical com linfadenectomia pélvica, para preservar o útero e a fertilidade da paciente."},{id:"C",texto:"Conização com margens livres e seguimento citológico semestral, por se tratar de lesão exofítica."},{id:"D",texto:"Radioterapia pélvica externa com cisplatina semanal concomitante, complementada por braquiterapia."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: carcinoma escamoso de **4,2 cm** com **invasão do paramétrio** (sem atingir a parede pélvica), sem acometimento da vagina inferior, sem hidronefrose e **sem linfonodos suspeitos** ao PET-CT: estádio **IIB da FIGO 2018** (doença localmente avançada). O tratamento padrão é a quimiorradioterapia definitiva, com **radioterapia externa e cisplatina semanal** seguidas de **braquiterapia**. A está errada porque a cirurgia radical não é tratamento primário do paramétrio acometido: seria seguida de radioterapia, somando morbidade sem ganho. B está errada porque a traquelectomia radical é só para tumores iniciais, pequenos (até 2 cm), sem invasão do paramétrio, em mulheres que querem preservar a fertilidade. C está errada porque a conização trata lesões pré-invasivas ou de estádio muito inicial, e não um tumor de 4,2 cm com invasão parametrial.",
  explicacoesAlternativas:{},
  referencias:"Bhatla N et al. Revised FIGO staging for carcinoma of the cervix uteri. Int J Gynaecol Obstet 2019;145:129-135; Cibula D et al. ESGO/ESTRO/ESP guidelines for the management of patients with cervical cancer: update 2023. Int J Gynecol Cancer 2023;33:649-666.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q82 da UNIFESP 2025
{
  id:"q-adap25-082", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-infecto", assuntoId:"ass-tuberculose",
  enunciado:"Homem, 38 anos, em tratamento de tuberculose pulmonar com o esquema básico (rifampicina, isoniazida, pirazinamida e etambutol) há 3 semanas, procura o pronto-socorro com náuseas, vômitos, dor abdominal e icterícia. Exames: TGO de 410 U/L e TGP de 480 U/L (referência até 40 U/L), bilirrubina total de 3,2 mg/dL (direta de 2,5 mg/dL) e INR de 1,2. As sorologias para hepatites virais são negativas, e ele nega o uso de álcool. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Suspender o esquema, acompanhar até a normalização das enzimas e reintroduzir os fármacos de forma sequencial."},{id:"B",texto:"Manter o esquema e repetir as enzimas em uma semana, pois a elevação é esperada nas primeiras semanas."},{id:"C",texto:"Suspender a rifampicina e manter os demais, pois ela é a principal causa de hepatite."},{id:"D",texto:"Reduzir à metade a dose de todos os fármacos, até que as enzimas caiam abaixo de 100 U/L."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **3 semanas de rifampicina, isoniazida, pirazinamida e etambutol**, **sintomas de hepatite** (náuseas, vômitos, dor abdominal e icterícia), **TGO de 410 e TGP de 480 U/L** (cerca de 10 vezes o limite superior, acima de 3 vezes na vigência de sintomas), **bilirrubina direta elevada** e **sem outras causas** (sorologias negativas, sem álcool): hepatotoxicidade do tratamento. Quando há sintomas e as transaminases passam de **3 vezes** o limite superior (ou de **5 vezes**, sem sintomas), **suspende-se o esquema**, acompanha-se até a normalização das enzimas e **reintroduzem-se os fármacos um de cada vez**, observando as enzimas; no intervalo, usam-se fármacos menos hepatotóxicos, se a doença exigir. B está errada porque a hepatite sintomática com transaminases acima de 3 vezes é indicação de suspender, e não é esperada. C está errada porque qualquer dos três fármacos (isoniazida, rifampicina e pirazinamida) pode ser o causador, e retirar só um deixa os outros em uso. D está errada porque reduzir as doses não interrompe a lesão hepática e deixa o paciente subtratado.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Manual de Recomendações para o Controle da Tuberculose no Brasil, 2ª ed., 2019 (o texto vigente de manejo de reações adversas não pôde ser aberto); Nahid P et al. Official ATS/CDC/ERS/IDSA clinical practice guidelines: treatment of drug-susceptible tuberculosis. Clin Infect Dis 2016;63:e147-e195.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q83 da UNIFESP 2025
{
  id:"q-adap25-083", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-ped", especialidadeId:"esp-crescdesenv", assuntoId:"ass-calendariovacinal",
  enunciado:"Lactente de 4 meses e 10 dias, nascido a termo e saudável, é levado à unidade básica de saúde pela primeira vez depois da maternidade. A caderneta mostra apenas BCG e a primeira dose da vacina contra hepatite B, ao nascer. Segundo o Programa Nacional de Imunizações, qual das vacinas abaixo não pode mais ser iniciada por ter ultrapassado a idade máxima para a primeira dose?",
  alternativas:[{id:"A",texto:"Pentavalente (DTP, Hib e hepatite B), que não tem idade máxima para a primeira dose."},{id:"B",texto:"Rotavírus humano, pois a primeira dose só pode ser administrada até os 3 meses e 15 dias de idade."},{id:"C",texto:"Poliomielite inativada, que pode ser iniciada em qualquer idade durante a infância da criança."},{id:"D",texto:"Pneumocócica 10-valente, que pode ser iniciada até os 4 anos, 11 meses e 29 dias de idade."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: lactente de **4 meses e 10 dias** (já ultrapassou 3 meses e 15 dias), com esquema atrasado (só **BCG e hepatite B ao nascer**). A vacina contra o rotavírus tem **idade-limite**: a primeira dose pode ser dada de **1 mês e 15 dias a 3 meses e 15 dias**, e a segunda, até 7 meses e 29 dias, por causa do risco de invaginação intestinal com doses tardias; por isso, ela não pode mais ser iniciada. A está errada porque a pentavalente pode ser iniciada em atraso, mesmo depois dos 4 meses. C está errada porque a vacina inativada contra a poliomielite pode ser iniciada em qualquer idade. D está errada porque a pneumocócica 10-valente pode ser aplicada, em esquema reduzido, até os 4 anos, 11 meses e 29 dias, sem limite de 3 meses e 15 dias.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Manual de Normas e Procedimentos para Vacinação, 2014; Brasil. Ministério da Saúde. Calendário Nacional de Vacinação da Criança (a edição vigente não pôde ser aberta; a idade-limite do rotavírus se mantém nas edições conhecidas).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q84 da UNIFESP 2025
{
  id:"q-adap25-084", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-alergiaimuno", assuntoId:"ass-alergia-alimentar",
  enunciado:"Lactente de 5 meses, em aleitamento misto, recebe pela primeira vez mamadeira de fórmula infantil à base de leite de vaca. Dez minutos depois, apresenta urticária generalizada, vômitos, palidez, hipotonia e sibilância. FC de 180 bpm, FR de 52 irpm, SpO2 de 90% e enchimento capilar de 4 segundos. Qual é a conduta imediata mais adequada?",
  alternativas:[{id:"A",texto:"Anti-histamínico por via oral e observação por 4 horas na unidade, com reavaliação clínica."},{id:"B",texto:"Corticoide por via endovenosa em dose alta, que é o tratamento de primeira escolha na anafilaxia."},{id:"C",texto:"Adrenalina por via intramuscular na face lateral da coxa, 0,01 mg/kg, repetida em minutos se preciso."},{id:"D",texto:"Adrenalina por via subcutânea, com absorção equivalente à intramuscular e menor risco de efeitos."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **primeira exposição ao leite de vaca**, **sintomas minutos depois**, **urticária generalizada**, **vômitos**, **hipotonia**, **sibilância** e sinais de choque (**FC de 180 bpm, SpO2 de 90%, enchimento capilar de 4 segundos**): anafilaxia por alergia à proteína do leite de vaca. O tratamento imediato e de primeira linha é a **adrenalina intramuscular** na face lateral da coxa (0,01 mg/kg da solução 1:1.000, repetida em 5 a 15 minutos se preciso), com oxigênio, acesso venoso e reposição de volume. A está errada porque o anti-histamínico isolado trata só a urticária e não reverte o choque nem o broncoespasmo. B está errada porque o corticoide tem início de ação lento e não é tratamento de primeira linha da anafilaxia. D está errada porque a via subcutânea tem absorção mais lenta e menos previsível, e a via intramuscular é a recomendada.",
  explicacoesAlternativas:{},
  referencias:"Cardona V et al. World Allergy Organization Anaphylaxis Guidance 2020. World Allergy Organ J 2020;13:100472; Associação Brasileira de Alergia e Imunologia. Guia prático para o manejo da anafilaxia, 2022.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q85 da UNIFESP 2025
{
  id:"q-adap25-085", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-alergiaimuno", assuntoId:"ass-alergia-alimentar",
  enunciado:"Lactente de 3 meses, em aleitamento materno exclusivo, apresenta há 3 semanas fezes com raios de sangue em todas as evacuações. Ganha peso de forma adequada, não tem outros sintomas e o exame físico é normal. A mãe consome leite e derivados diariamente. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Manter o aleitamento, excluir o leite de vaca e derivados da dieta materna por 2 a 4 semanas e reintroduzir."},{id:"B",texto:"Suspender o aleitamento materno e iniciar fórmula à base de soja, até o fim do primeiro ano de vida."},{id:"C",texto:"Substituir o aleitamento por fórmula de aminoácidos e dosar a IgE específica para o leite de vaca."},{id:"D",texto:"Dosar a IgE específica para o leite de vaca e excluir o leite da dieta materna se o exame for positivo para ele."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: lactente de **3 meses** em **aleitamento materno exclusivo**, com **fezes com raios de sangue**, **bom ganho de peso** e **exame normal**: proctocolite alérgica induzida por proteína (alergia à proteína do leite de vaca não mediada por IgE). O leite materno deve ser mantido; a mãe exclui leite de vaca e derivados da dieta por **2 a 4 semanas**, e a melhora confirma a hipótese, seguindo-se a **reintrodução** para confirmar o diagnóstico (o desaparecimento do sintoma e o retorno com a reintrodução). B está errada porque não se suspende o aleitamento materno, e a fórmula de soja não é a indicada como primeira escolha no lactente. C está errada porque a fórmula de aminoácidos é reservada a quadros graves ou sem melhora com outras medidas, e a IgE não faz parte da investigação dos quadros não mediados por IgE. D está errada porque a IgE específica não é útil nesse tipo de alergia, e o diagnóstico se faz pela dieta de exclusão e reintrodução.",
  explicacoesAlternativas:{},
  referencias:"Solé D et al. Consenso Brasileiro sobre Alergia Alimentar: 2018. Arq Asma Alerg Imunol 2018;2:7-38; Koletzko S et al. Diagnostic approach and management of cow's-milk protein allergy in infants and children: ESPGHAN GI Committee practical guidelines. J Pediatr Gastroenterol Nutr 2012;55:221-229.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q86 da UNIFESP 2025
{
  id:"q-adap25-086", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cg", especialidadeId:"esp-abdagudo", assuntoId:"ass-obstrucao",
  enunciado:"Lactente de 8 meses, previamente saudável, apresenta há 10 horas episódios de choro intenso, com flexão das pernas sobre o abdome, que se repetem a cada 15 a 20 minutos, com palidez e prostração entre as crises. Teve 3 vômitos e eliminou fezes com muco e sangue, de aspecto gelatinoso. Exame: FC de 140 bpm, PA 90/55 mmHg, enchimento capilar de 2 segundos, massa alongada palpável no hipocôndrio direito, sem distensão abdominal acentuada e sem sinais de peritonite. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Laparotomia imediata, pois o quadro é de abdome cirúrgico em lactente com crises de dor e vômitos."},{id:"B",texto:"Redução não cirúrgica por enema de ar ou de líquido, guiada por radioscopia ou ultrassonografia."},{id:"C",texto:"Jejum, antibiótico e observação clínica por 24 horas, para reavaliar a necessidade de exames."},{id:"D",texto:"Enema com bário em alta pressão, para fazer o diagnóstico e a redução da lesão ao mesmo tempo."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **lactente de 8 meses**, com **crises de choro em cólica intermitentes**, **palidez e prostração entre as crises**, **vômitos**, **fezes em geleia de framboesa (muco e sangue)** e **massa palpável em salsicha**: invaginação intestinal, sem **peritonite**, sem choque (**FC de 140 bpm, enchimento capilar de 2 segundos**) e sem distensão. No paciente estável e sem sinais de perfuração, o tratamento inicial é a **redução não cirúrgica** por enema de ar (pneumático) ou de líquido, guiado por imagem, com alta taxa de sucesso, e equipe cirúrgica de sobreaviso. A está errada porque a cirurgia é reservada a peritonite, perfuração, choque ou falha da redução. C está errada porque a espera expõe o intestino à isquemia, e a invaginação não resolve com jejum e antibiótico. D está errada porque o enema com bário em alta pressão aumenta o risco de perfuração e de peritonite por bário e foi substituído pelo ar ou pelo soro.",
  explicacoesAlternativas:{},
  referencias:"Kelley-Quon LI et al. Management of intussusception in children: a systematic review. J Pediatr Surg 2021;56:587-596; Sociedade Brasileira de Pediatria. Tratado de Pediatria, 5ª ed.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q87 da UNIFESP 2025
{
  id:"q-adap25-087", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-pneumo", assuntoId:"ass-asma",
  enunciado:"Adolescente de 15 anos, com asma leve, relata sintomas de tosse e chiado cerca de duas vezes por mês, sem despertares noturnos, e usa salbutamol inalatório apenas quando tem sintomas. Há 3 semanas, após uma infecção respiratória, teve uma crise que exigiu atendimento de urgência com corticoide oral. A função pulmonar é normal entre as crises. Segundo a iniciativa global para a asma (GINA, edição de 2024), qual é o tratamento mais adequado?",
  alternativas:[{id:"A",texto:"Manter o salbutamol isolado quando necessário, por se tratar de asma leve e sintomas intermitentes."},{id:"B",texto:"Corticoide inalatório em dose alta, de uso diário, para prevenir novas crises."},{id:"C",texto:"Antileucotrieno de uso diário em monoterapia, como alternativa ao corticoide inalatório."},{id:"D",texto:"Budesonida-formoterol em dose baixa, usada conforme a necessidade para aliviar os sintomas."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **asma leve** (sintomas duas vezes por mês), porém com **crise grave recente** que exigiu corticoide oral, mostrando que o risco de exacerbação existe mesmo com poucos sintomas; **adolescente de 15 anos** (12 anos ou mais). A GINA não recomenda mais o broncodilatador de curta duração isolado, porque ele não trata a inflamação das vias aéreas e os pacientes com asma leve têm crises graves; o tratamento preferido é o **corticoide inalatório com formoterol em dose baixa, usado apenas quando necessário** (aliviador e controlador). A está errada porque o tratamento só com salbutamol deixa a inflamação sem controle e aumenta o risco de exacerbações graves. B está errada porque a dose alta diária é excessiva para a asma leve. C está errada porque o antileucotrieno em monoterapia é menos eficaz que o corticoide inalatório e fica como alternativa.",
  explicacoesAlternativas:{},
  referencias:"Global Initiative for Asthma. Global Strategy for Asthma Management and Prevention, 2024 update (a atualização de 2025 não foi conferida no texto); Sociedade Brasileira de Pneumologia e Tisiologia. Diretrizes da SBPT para o manejo da asma, 2020.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q88 da UNIFESP 2025
{
  id:"q-adap25-088", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-gastro", assuntoId:"ass-gastro-constipacao",
  enunciado:"Menino, 5 anos, tem há 1 ano evacuações a cada 5 ou 6 dias, com fezes ressecadas e volumosas, dor abdominal e manchas de fezes na roupa íntima, que a mãe interpreta como diarreia. Não tem vômitos, sangue nas fezes, febre, nem alterações neurológicas, e o crescimento é adequado. Exame físico: abdome com massa fecal palpável em hipogástrio e fossa ilíaca esquerda, ânus normal e ampola retal com fezes endurecidas ao toque. Qual é o tratamento inicial mais adequado?",
  alternativas:[{id:"A",texto:"Desimpactação com polietilenoglicol em dose elevada por alguns dias, seguida de manutenção por meses."},{id:"B",texto:"Óleo mineral por via oral em dose alta, por ser eficaz e de baixo custo, associado à dieta rica em fibras."},{id:"C",texto:"Enemas fosfatados diários, mantidos por 2 meses, para manter o intestino vazio e evitar a retenção fecal."},{id:"D",texto:"Aumento de fibras e de água, sem medicamentos, pois a causa é funcional e comportamental."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **fezes ressecadas e volumosas a cada 5 ou 6 dias**, **dor abdominal**, **escape fecal** (as manchas na roupa íntima, que a mãe chama de diarreia, são o transbordamento por retenção), **massa fecal palpável** e **ampola retal com fezes endurecidas**: constipação funcional com **impactação fecal**, sem sinais de alarme (sem sangue, vômitos, febre ou alteração neurológica e com crescimento normal). O tratamento é a **desimpactação**, com polietilenoglicol (macrogol) em dose alta por alguns dias, seguida de **manutenção** em dose menor por meses, com orientações de toalete e dieta. B está errada porque o óleo mineral em dose alta tem risco de aspiração e pneumonite lipoídica, e não é a primeira escolha. C está errada porque enemas fosfatados em uso diário e prolongado causam distúrbios hidroeletrolíticos e trauma psicológico, e são reservados ao resgate. D está errada porque a dieta isolada não desfaz uma impactação.",
  explicacoesAlternativas:{},
  referencias:"Tabbers MM et al. Evidence-based guidelines for the evaluation and treatment of functional constipation in infants and children: ESPGHAN/NASPGHAN. J Pediatr Gastroenterol Nutr 2014;58:258-274; Hyams JS et al. Functional disorders: children and adolescents (Rome IV). Gastroenterology 2016;150:1456-1468.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q89 da UNIFESP 2025
{
  id:"q-adap25-089", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-reanimacao",
  enunciado:"Recém-nascido a termo, nascido de parto vaginal, está hipotônico e em apneia ao nascimento. Após os passos iniciais, a ventilação com pressão positiva por máscara facial foi iniciada com ar ambiente, e o movimento do tórax foi confirmado. Depois de 30 segundos de ventilação efetiva, o monitor de saturação mostra FC de 45 bpm, e o recém-nascido continua apneico. Qual é o próximo passo da reanimação?",
  alternativas:[{id:"A",texto:"Manter a ventilação com máscara por mais 30 segundos e reavaliar a FC, sem outras medidas adicionais."},{id:"B",texto:"Intubar, aumentar a FiO2 para 100% e iniciar a massagem cardíaca coordenada com a ventilação."},{id:"C",texto:"Administrar adrenalina endovenosa e só depois iniciar a massagem cardíaca torácica do recém-nascido."},{id:"D",texto:"Iniciar a massagem cardíaca com a máscara facial, mantendo o ar ambiente a 21%."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **apneia e hipotonia**, ventilação com pressão positiva **efetiva** (movimento do tórax confirmado) por **30 segundos**, com **FC de 45 bpm (abaixo de 60 bpm)**: está indicada a massagem cardíaca. Como a ventilação por máscara não reverteu a bradicardia, o passo seguinte é assegurar a via aérea com **intubação traqueal** (ou máscara laríngea), **aumentar a FiO2 para 100%** e iniciar a **massagem cardíaca** coordenada com a ventilação, na proporção de 3 compressões para 1 ventilação. A está errada porque repetir a ventilação sem mudar a estratégia, com FC abaixo de 60 bpm após 30 segundos de ventilação efetiva, atrasa a massagem. C está errada porque a adrenalina vem depois de massagem e ventilação bem feitas, quando a FC continua abaixo de 60 bpm. D está errada porque a massagem deve ser feita com FiO2 de 100%, e a ventilação com via aérea segura é preferível.",
  explicacoesAlternativas:{},
  referencias:"Sociedade Brasileira de Pediatria. Diretrizes para Reanimação do Recém-Nascido ≥34 semanas em sala de parto, 2022; Aziz K et al. Part 5: Neonatal Resuscitation. 2020 AHA Guidelines for CPR and ECC. Circulation 2020;142(Suppl 2):S524-S550 (a edição de 2025 da AHA não foi conferida).",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q90 da UNIFESP 2025
{
  id:"q-adap25-090", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-neo-triagemneonatal",
  enunciado:"Recém-nascido de 12 dias, a termo e assintomático, é levado à consulta porque o teste do pezinho (papel-filtro, coletado no 4º dia de vida) mostrou TSH elevado, de 45 mUI/L, e a unidade de triagem o convocou. O exame físico é normal, com peso adequado e fontanelas normais. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Repetir o teste do pezinho em papel-filtro em 15 dias e decidir conforme o novo resultado."},{id:"B",texto:"Coletar de imediato TSH e T4 livre séricos, para confirmar o diagnóstico e tratar."},{id:"C",texto:"Aguardar até 30 dias de vida e repetir a triagem, pois o TSH é elevado no período neonatal."},{id:"D",texto:"Iniciar a levotiroxina por 2 semanas, sem confirmação, e suspender o tratamento aos 3 anos."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **TSH elevado no papel-filtro (45 mUI/L)** em recém-nascido de **12 dias**, assintomático (os sinais do hipotireoidismo congênito aparecem tardiamente): triagem positiva para hipotireoidismo congênito. A conduta é a **confirmação imediata** com **TSH e T4 livre séricos**, e, se confirmado, a levotiroxina deve ser iniciada o mais cedo possível, de preferência antes dos 14 dias de vida, para proteger o desenvolvimento neurológico. A está errada porque repetir o teste de triagem atrasa o tratamento, e a confirmação deve ser sérica. C está errada porque aguardar 30 dias expõe o cérebro a hormônio insuficiente na fase crítica. D está errada porque o tratamento só se inicia depois da confirmação, e a reavaliação da necessidade de reposição, em casos sem causa definida, ocorre depois dos 3 anos, e não com 2 semanas.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Manual Técnico da Triagem Neonatal Biológica, 2016; Léger J et al. European Society for Paediatric Endocrinology consensus guidelines on screening, diagnosis, and management of congenital hypothyroidism. J Clin Endocrinol Metab 2014;99:363-384.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q91 da UNIFESP 2025
{
  id:"q-adap25-091", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-neo-triagemneonatal",
  enunciado:"Recém-nascido de 21 dias, a termo e assintomático, é convocado para consulta porque a triagem neonatal para fibrose cística mostrou tripsinogênio imunorreativo (IRT) elevado na primeira amostra, colhida no 4º dia de vida, e novamente elevado na segunda amostra, colhida aos 20 dias. Ganha peso bem, não tem tosse e evacua normalmente. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Realizar o teste do suor com dosagem de cloreto e encaminhar ao centro de referência."},{id:"B",texto:"Excluir a doença, porque o recém-nascido é assintomático e tem bom ganho de peso."},{id:"C",texto:"Repetir o tripsinogênio imunorreativo aos 6 meses de vida, para confirmar o resultado alterado."},{id:"D",texto:"Iniciar enzimas pancreáticas e antibiótico profilático, sem confirmação, pelo resultado alterado."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **tripsinogênio imunorreativo elevado em duas amostras** (4º dia e 20 dias de vida), isto é, **triagem positiva**, em recém-nascido **assintomático, com bom ganho de peso**: o lactente com fibrose cística costuma ser assintomático nas primeiras semanas, e a triagem existe para detectá-lo antes disso. A triagem positiva exige a confirmação pelo **teste do suor** (dosagem de cloreto no suor, com valor de 60 mmol/L ou mais confirmando a doença, e de 30 a 59 mmol/L sendo intermediário), com encaminhamento ao centro de referência, de preferência até o 30º dia de vida. B está errada porque a ausência de sintomas não exclui a doença nessa idade. C está errada porque esperar 6 meses atrasa o tratamento precoce, que melhora o estado nutricional e a função pulmonar. D está errada porque o tratamento só se inicia depois da confirmação diagnóstica.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas da Fibrose Cística (edição vigente não aberta); Farrell PM et al. Diagnosis of cystic fibrosis: consensus guidelines from the Cystic Fibrosis Foundation. J Pediatr 2017;181S:S4-S15.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q92 da UNIFESP 2025
{
  id:"q-adap25-092", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-cm", especialidadeId:"esp-reumato", assuntoId:"ass-reumato-febrereumatica",
  enunciado:"Menina, 10 anos, teve há 8 meses um surto de febre reumática com cardite e coreia, tratado com penicilina benzatina e anti-inflamatórios. O ecocardiograma de controle mostra insuficiência mitral leve persistente, com espessamento valvar, e a paciente está em uso de penicilina benzatina a cada 21 dias. A mãe pergunta por quanto tempo a profilaxia deverá ser mantida. Qual é a orientação correta?",
  alternativas:[{id:"A",texto:"Por 10 anos depois do último surto ou até os 40 anos de idade, prevalecendo o período mais longo."},{id:"B",texto:"Por 5 anos depois do último surto ou até os 21 anos de idade, prevalecendo o prazo que for mais longo."},{id:"C",texto:"Por 1 ano depois do último surto, pois a coreia isolada não exige profilaxia prolongada."},{id:"D",texto:"Até completar 18 anos de idade, independentemente da evolução do dano valvar."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **surto de febre reumática com cardite** e **lesão valvar residual** (insuficiência mitral leve persistente, com espessamento valvar), em criança de 10 anos, em profilaxia secundária. A duração da profilaxia depende do comprometimento cardíaco: na febre reumática com **cardite e doença valvar residual**, mantém-se por **10 anos depois do último surto ou até os 40 anos, o que for mais longo** (e, em alguns casos, por toda a vida). B está errada porque 5 anos ou até os 21 anos é o prazo da febre reumática sem cardite. C está errada porque a profilaxia curta não protege contra recorrências, que agravam a lesão valvar. D está errada porque a idade, por si só, não determina a duração: o dano valvar residual prolonga a profilaxia além dos 18 anos.",
  explicacoesAlternativas:{},
  referencias:"Barbosa PJB et al. Diretrizes Brasileiras para o diagnóstico, tratamento e prevenção da febre reumática. Arq Bras Cardiol 2009;93(3 Supl 4):1-18; Gerber MA et al. Prevention of rheumatic fever and diagnosis and treatment of acute Streptococcal pharyngitis. Circulation 2009;119:1541-1551; Gewitz MH et al. Revision of the Jones Criteria. Circulation 2015;131:1806-1818 (atualização brasileira posterior não conferida).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q93 da UNIFESP 2025
{
  id:"q-adap25-093", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-neo-descrresp",
  enunciado:"Gestante de 28 anos, com 30 semanas, apresenta trabalho de parto prematuro com 4 cm de dilatação e bolsas íntegras, sem sinais de infecção. A tocólise foi iniciada para tentar adiar o parto por 48 horas. Qual medida deve ser tomada para reduzir a síndrome do desconforto respiratório do recém-nascido?",
  alternativas:[{id:"A",texto:"Betametasona 12 mg intramuscular em dose única, pois a segunda dose não traz benefício."},{id:"B",texto:"Hidrocortisona 100 mg por via endovenosa a cada 8 horas, durante 24 horas, antes do parto."},{id:"C",texto:"Betametasona 12 mg intramuscular a cada 24 horas, durante 5 dias seguidos, antes do parto."},{id:"D",texto:"Betametasona 12 mg por via intramuscular, 2 doses com 24 horas de intervalo, o mais cedo possível."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **gestação de 30 semanas** (entre 24 e 34 semanas, faixa em que o corticoide antenatal é indicado), **trabalho de parto prematuro** com **risco de parto nos próximos 7 dias** (dilatação de 4 cm, bolsas íntegras). O corticoide antenatal acelera a maturação pulmonar e reduz a síndrome do desconforto respiratório, a hemorragia intraventricular e a mortalidade neonatal. O esquema de escolha é a **betametasona 12 mg por via intramuscular, 2 doses com 24 horas de intervalo**, e o benefício é maior quando o parto ocorre de 24 horas a 7 dias depois da primeira dose. A está errada porque a dose única é incompleta, e o esquema validado são duas doses. B está errada porque a hidrocortisona atravessa pouco a placenta e não é usada para maturação pulmonar fetal. C está errada porque um curso de 5 dias é excessivo e não estudado, e doses repetidas aumentam o risco de efeitos adversos no feto.",
  explicacoesAlternativas:{},
  referencias:"World Health Organization. WHO recommendations on antenatal corticosteroids for improving preterm birth outcomes, 2022; McGoldrick E et al. Antenatal corticosteroids for accelerating fetal lung maturation for women at risk of preterm birth. Cochrane Database Syst Rev 2020;12:CD004454; ACOG Committee Opinion nº 713. Obstet Gynecol 2017;130:e102-e109.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q94 da UNIFESP 2025
{
  id:"q-adap25-094", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-ictericia",
  enunciado:"Lactente de 38 dias, nascido a termo, em aleitamento materno exclusivo, com icterícia desde o nascimento, que persiste e se acentuou, é levado à consulta. A mãe relata fezes de cor clara, quase brancas, e urina escura há 1 semana. Bom estado geral e ganho de peso razoável. Exame físico: icterícia de zona IV, fígado palpável a 3 cm do rebordo costal direito, de consistência firme. Exames: bilirrubina total de 6,4 mg/dL e direta de 4,8 mg/dL. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Encaminhar já para investigar atresia biliar, pois a cirurgia deve ser feita antes de 60 dias."},{id:"B",texto:"Suspender o leite materno por 48 horas, para confirmar o diagnóstico de icterícia do leite materno."},{id:"C",texto:"Iniciar fototerapia domiciliar e reavaliar a bilirrubina em 1 semana, pelo valor da bilirrubina total."},{id:"D",texto:"Orientar a manter o aleitamento e aguardar a resolução espontânea, que costuma ocorrer até os 3 meses."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **icterícia persistente após 14 dias de vida**, **fezes acólicas (brancas)**, **colúria**, **hepatomegalia firme** e **bilirrubina direta de 4,8 mg/dL (75% da total)**, acima de 1 mg/dL: colestase, com suspeita de **atresia de vias biliares**. A cirurgia de Kasai deve ser feita idealmente **antes de 60 dias de vida**, pois a chance de sucesso cai com o atraso, e por isso o lactente deve ser encaminhado de imediato ao serviço especializado, para ultrassonografia e confirmação. B está errada porque a icterícia do leite materno é de predomínio indireto e não causa fezes acólicas, colúria nem hepatomegalia. C está errada porque a fototerapia trata hiperbilirrubinemia indireta, e não resolve a colestase. D está errada porque a icterícia com bilirrubina direta elevada nunca é fisiológica e não se resolve espontaneamente.",
  explicacoesAlternativas:{},
  referencias:"Fawaz R et al. Guideline for the evaluation of cholestatic jaundice in infants: NASPGHAN and ESPGHAN. J Pediatr Gastroenterol Nutr 2017;64:154-168; Sociedade Brasileira de Pediatria. Documento científico: colestase neonatal e atresia de vias biliares.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q95 da UNIFESP 2025
{
  id:"q-adap25-095", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-mps", especialidadeId:"esp-bioetica", assuntoId:"ass-comunicacaoclinica",
  enunciado:"Em uma consulta ambulatorial, o pediatra comunica aos pais de uma menina de 6 anos que o exame confirmou o diagnóstico de leucemia linfoblástica aguda. A mãe começa a chorar, o pai fica em silêncio com o olhar fixo, e logo diz: «Isso não pode ser verdade, deve haver um engano». Qual é a atitude de comunicação mais adequada nesse momento?",
  alternativas:[{id:"A",texto:"Continuar a explicar o protocolo de tratamento, para reduzir a ansiedade com informações."},{id:"B",texto:"Reconhecer a emoção, demonstrar compreensão e fazer uma pausa em silêncio antes de continuar a conversa."},{id:"C",texto:"Tranquilizar os pais, dizendo que a doença tem cura quase certa e que não há motivo para tanta preocupação."},{id:"D",texto:"Sugerir um calmante à mãe e adiar a conversa para outro dia, para que a notícia seja assimilada."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **choro da mãe**, **silêncio e olhar fixo do pai** e a frase de **negação** («não pode ser verdade»): reações emocionais esperadas diante da má notícia. No protocolo SPIKES, depois de dar a informação, vem a etapa de **responder às emoções com empatia**: reconhecer e nomear a emoção, mostrar compreensão e **fazer uma pausa em silêncio**, deixando os pais reagirem antes de retomar as informações; só então se passa ao plano de cuidado. A está errada porque seguir com informações técnicas enquanto os pais estão emocionalmente sobrecarregados não é assimilado e rompe o vínculo. C está errada porque a tranquilização precoce e exagerada (falso conforto) invalida a emoção e pode contradizer o prognóstico real. D está errada porque medicar a mãe e adiar a conversa evita o problema sem acolhê-lo, e interrompe o plano que os pais precisam conhecer.",
  explicacoesAlternativas:{},
  referencias:"Baile WF et al. SPIKES: a six-step protocol for delivering bad news. Oncologist 2000;5:302-311; Back A, Arnold R, Tulsky J. Mastering Communication with Seriously Ill Patients. Cambridge University Press, 2009 (respostas empáticas, mnemônico NURSE).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q96 da UNIFESP 2025
{
  id:"q-adap25-096", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-ped", especialidadeId:"esp-crescdesenv", assuntoId:"ass-crescimentopuberdade",
  enunciado:"Menino, 6 anos e 10 meses, é levado à consulta por parar de crescer: a estatura era de 104 cm aos 4 anos e 5 meses e é de 110 cm hoje, com velocidade de crescimento de 2,5 cm/ano (esperado de 5 a 7 cm/ano). O peso passou do percentil 50 ao 85 no período, e o IMC está elevado. Os pais referem cansaço, sono excessivo e constipação, e o exame físico mostra pele seca e fácies pouco expressiva, sem dismorfismos nem desproporção corporal. Estaturas dos pais de 172 cm (pai) e 160 cm (mãe). A idade óssea é de 4 anos. Qual é a investigação inicial mais adequada?",
  alternativas:[{id:"A",texto:"Dosagem de TSH e T4 livre, com anticorpo antitireoperoxidase se o TSH estiver alterado ou elevado."},{id:"B",texto:"Dosagem de IGF-1 e IGFBP-3, e teste de estímulo do GH, antes de outros exames."},{id:"C",texto:"Cariótipo com contagem de 30 células, para pesquisar síndrome de Turner e mosaicismos."},{id:"D",texto:"Cortisol urinário de 24 horas e cortisol salivar noturno, para investigar síndrome de Cushing."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **desaceleração do crescimento** (velocidade de 2,5 cm/ano), **peso que sobe de percentil** enquanto a estatura cai, **IMC elevado**, **idade óssea atrasada (4 anos para 6 anos e 10 meses)**, **cansaço, sono excessivo, constipação e pele seca** e **proporções normais**: hipotireoidismo adquirido (tireoidite de Hashimoto, em geral). A investigação inicial é a dosagem de **TSH e T4 livre**, simples e de baixo custo, com anticorpo antitireoperoxidase para confirmar a etiologia autoimune. B está errada porque a deficiência de GH é investigada depois de excluídas causas mais comuns e simples, como o hipotireoidismo; além disso, o hipotireoidismo baixa o IGF-1 e invalida o teste de estímulo. C está errada porque o cariótipo é para meninas com baixa estatura inexplicada, em que se suspeita de Turner. D está errada porque a síndrome de Cushing causa baixa estatura com ganho de peso, mas o quadro clínico, com constipação e sono excessivo, aponta para hipotireoidismo, e o rastreamento de Cushing não é inicial.",
  explicacoesAlternativas:{},
  referencias:"Sociedade Brasileira de Pediatria. Tratado de Pediatria, 5ª ed., 2021 (capítulos de crescimento e de doenças da tireoide); Sperling MA (ed.). Sperling Pediatric Endocrinology, 5ª ed., Elsevier, 2021.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q97 da UNIFESP 2025
{
  id:"q-adap25-097", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-ped", especialidadeId:"esp-emergped", assuntoId:"ass-emergped-maustratos",
  enunciado:"Menina de 5 anos é levada ao pronto-socorro pela mãe, que diz que a filha caiu da bicicleta há 2 dias. Na consulta, a criança está quieta e evita contato visual. Exame físico: equimoses de 2 a 3 cm na face interna das coxas e hiperemia perineal. Ao ser questionada, diz que não quer voltar para casa «por causa do tio». O padrasto aguarda na recepção. O médico suspeita de violência sexual. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Aguardar a confirmação da violência por perícia, antes de notificar o Conselho Tutelar."},{id:"B",texto:"Obter a autorização da mãe para notificar, para preservar o vínculo da criança com a família."},{id:"C",texto:"Interrogar a criança com detalhes sobre os fatos e registrar o relato completo em prontuário."},{id:"D",texto:"Notificar o Conselho Tutelar e o SINAN, sem esperar confirmação nem autorização."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **explicação incompatível com o mecanismo** (queda de bicicleta e equimoses na **face interna das coxas** e **hiperemia perineal**), **criança retraída** que **não quer voltar para casa «por causa do tio»** e agressor em potencial no convívio: suspeita fundamentada de violência sexual. A **suspeita** já obriga a notificação ao **Conselho Tutelar** (e a notificação compulsória no SINAN), **sem aguardar confirmação** nem autorização da família, cabendo ao serviço garantir a proteção da criança (internação protetiva, se necessário) e acionar a rede, inclusive o atendimento especializado, com profilaxias quando indicadas. A está errada porque a lei exige comunicação da suspeita, e a espera expõe a criança a novo abuso. B está errada porque a notificação não depende da autorização dos responsáveis, que podem ser os próprios agressores ou encobridores. C está errada porque o interrogatório detalhado revitimiza a criança; a escuta deve ser especializada, feita por profissional treinado, na forma da lei.",
  explicacoesAlternativas:{},
  referencias:"Lei nº 8.069/1990 (Estatuto da Criança e do Adolescente), art. 13; Lei nº 13.431/2017 (escuta especializada e depoimento especial); Lei nº 14.344/2022 (Lei Henry Borel); Brasil. Ministério da Saúde. Linha de cuidado para a atenção integral à saúde de crianças, adolescentes e suas famílias em situação de violências, 2010.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q98 da UNIFESP 2025
{
  id:"q-adap25-098", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-prenatal",
  enunciado:"Mulher, 27 anos, que planeja engravidar nos próximos meses, procura consulta pré-concepcional. Tem antecedente de uma gestação anterior, há 2 anos, com feto com mielomeningocele. É hígida, não faz uso de medicamentos antiepilépticos nem tem diabetes. Qual é a conduta mais adequada em relação ao ácido fólico?",
  alternativas:[{id:"A",texto:"0,4 mg por dia, a dose habitual de toda gestante, que basta mesmo com antecedente de defeito do tubo neural."},{id:"B",texto:"1 mg por dia, a partir do início do 2º trimestre da gestação e mantido até o parto."},{id:"C",texto:"4 mg por dia, iniciada ao se confirmar a gravidez por exame de sangue e mantida até a 12ª semana da gestação."},{id:"D",texto:"4 mg por dia, iniciada pelo menos 1 mês antes da concepção e mantida até a 12ª semana de gestação."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **antecedente de feto com mielomeningocele** (defeito do tubo neural), **planejamento da gestação** e **ausência de outros fatores** (sem antiepilépticos nem diabetes). O risco de recorrência do defeito do tubo neural é de cerca de 2% a 5%, e a suplementação com **dose alta (4 mg por dia)**, iniciada **pelo menos 1 mês antes da concepção** e mantida **até a 12ª semana**, reduz esse risco em cerca de 70% (o fechamento do tubo neural ocorre na 4ª semana, antes de muitas mulheres saberem que estão grávidas). A está errada porque 0,4 mg é a dose para o risco habitual, e o antecedente exige dose maior. B está errada porque o início no 2º trimestre perde a janela de formação do tubo neural. C está errada porque a dose é correta, mas começar só com o diagnóstico da gravidez perde o período crítico.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Manual de Gestação de Alto Risco, 2022; American College of Obstetricians and Gynecologists. Practice Bulletin nº 187: Neural tube defects. Obstet Gynecol 2017;130:e279-e290; US Preventive Services Task Force. Folic acid supplementation to prevent neural tube defects. JAMA 2023;330:454-459.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q99 da UNIFESP 2025
{
  id:"q-adap25-099", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-neo-infeccoescongenitas",
  enunciado:"Recém-nascido a termo, com 6 dias de vida, é filho de mulher que teve soroconversão para toxoplasmose no 2º trimestre, tratada com espiramicina, sem acompanhamento posterior. O exame físico mostra hepatoesplenomegalia leve e icterícia. O fundo de olho revela coriorretinite periférica, e a ultrassonografia transfontanelar, calcificações intracranianas difusas. A sorologia do recém-nascido tem IgG e IgM positivos para toxoplasmose, e o IgA também é positivo. Qual é o tratamento indicado?",
  alternativas:[{id:"A",texto:"Espiramicina por 12 meses, droga de escolha para o recém-nascido infectado."},{id:"B",texto:"Clindamicina por via oral, em monoterapia, por 6 semanas."},{id:"C",texto:"Observação e acompanhamento mensal sem tratamento, pois a mãe já foi tratada na gestação."},{id:"D",texto:"Pirimetamina, sulfadiazina e ácido folínico por 12 meses, com controle do hemograma."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **soroconversão materna** na gestação com tratamento incompleto e sem seguimento, e um recém-nascido com **coriorretinite**, **calcificações intracranianas difusas**, **hepatoesplenomegalia** e **IgM e IgA positivos**: toxoplasmose congênita sintomática. O tratamento é a **associação de pirimetamina, sulfadiazina e ácido folínico por 12 meses**, com controle semanal ou quinzenal do hemograma (a pirimetamina causa neutropenia), e corticoide se houver coriorretinite ativa ou proteinorraquia alta. A está errada porque a espiramicina é usada na gestante para reduzir a transmissão vertical e não trata a criança já infectada. B está errada porque a clindamicina isolada não substitui o esquema com antifolínicos. C está errada porque o tratamento materno não cura o recém-nascido infectado, e a doença é ativa.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Protocolo de notificação e investigação: toxoplasmose gestacional e congênita, 2018; Maldonado YA, Read JS. Diagnosis, treatment, and prevention of congenital toxoplasmosis in the United States. Pediatrics 2017;139:e20163860.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
},
// adaptada da estrutura da Q100 da UNIFESP 2025
{
  id:"q-adap25-100", banca:"Esc — Banco Didático", real:false, ano:2027,
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-neo-infeccoescongenitas",
  enunciado:"Recém-nascido de 10 dias, a termo, com microcefalia, hepatoesplenomegalia, petéquias e icterícia colestática. A tomografia de crânio mostra calcificações periventriculares e dilatação ventricular, e a emissão otoacústica está ausente nos dois ouvidos. A reação em cadeia da polimerase da urina, colhida nas primeiras duas semanas de vida, é positiva para citomegalovírus. Qual é o tratamento mais adequado?",
  alternativas:[{id:"A",texto:"Valganciclovir por via oral por 6 meses, com controle de neutrófilos."},{id:"B",texto:"Ganciclovir por via endovenosa por 6 semanas, seguido de observação clínica."},{id:"C",texto:"Aciclovir por via endovenosa por 21 dias, em dose alta, pela doença do sistema nervoso central."},{id:"D",texto:"Imunoglobulina hiperimune contra citomegalovírus, em dose única, e acompanhamento ambulatorial."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **microcefalia**, **calcificações periventriculares**, **ventriculomegalia**, **hepatoesplenomegalia**, **petéquias**, **icterícia colestática**, **perda auditiva** e **PCR positiva para citomegalovírus na urina nas primeiras 3 semanas de vida** (o que confirma a infecção congênita): doença congênita sintomática com comprometimento do sistema nervoso central. O tratamento antiviral indicado é o **valganciclovir oral (16 mg/kg a cada 12 horas) por 6 meses**, iniciado no primeiro mês de vida, que melhora a evolução auditiva e do neurodesenvolvimento, com controle de neutrófilos e transaminases. B está errada porque o esquema de 6 semanas de ganciclovir endovenoso é o esquema antigo, de menor benefício e maior toxicidade. C está errada porque o aciclovir trata o herpes simples e não é ativo contra o citomegalovírus. D está errada porque a imunoglobulina hiperimune não tem eficácia comprovada no recém-nascido infectado.",
  explicacoesAlternativas:{},
  referencias:"Kimberlin DW et al. Valganciclovir for symptomatic congenital cytomegalovirus disease. N Engl J Med 2015;372:933-943; Rawlinson WD et al. Congenital cytomegalovirus infection in pregnancy and the neonate: consensus recommendations for prevention, diagnosis, and therapy. Lancet Infect Dis 2017;17:e177-e188.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
}
]);
