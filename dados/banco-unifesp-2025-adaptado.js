/* ==========================================================================
   BANCO UNIFESP 2025 ADAPTADO — 30 questões autorais
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
  alternativas:[{id:"A",texto:"Anestesia venosa total com propofol, com dexametasona na indução e ondansetron ao final da cirurgia."},{id:"B",texto:"Anestesia com sevoflurano e óxido nitroso, associada apenas ao ondansetron, medida considerada suficiente."},{id:"C",texto:"Anestesia balanceada com sevoflurano, sem antiemético, tratando só a náusea que surgir no recobro."},{id:"D",texto:"Anestesia venosa total com propofol isolada, pois a técnica equivale a uma associação de antieméticos."}],
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
  alternativas:[{id:"A",texto:"Vigilância com ultrassonografia a cada 6 meses, até que o diâmetro atinja 5,5 cm no seguimento."},{id:"B",texto:"Reparo eletivo, endovascular ou aberto, porque na mulher o limiar é de 5,0 cm."},{id:"C",texto:"Controle do tabagismo e da pressão arterial, com nova ultrassonografia de controle em 3 anos."},{id:"D",texto:"Reparo somente se surgirem dor abdominal ou crescimento rápido do diâmetro no seguimento."}],
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
  alternativas:[{id:"A",texto:"Toracocentese de alívio diária, até a cultura do líquido definir o tratamento."},{id:"B",texto:"Antibioticoterapia por 6 semanas, com nova toracocentese apenas se houver piora clínica."},{id:"C",texto:"Decorticação por toracotomia imediata, indicada sempre que o pH for menor que 7,2."},{id:"D",texto:"Drenagem torácica fechada, com dreno tubular em selo d'água, e controle por imagem."}],
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
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: adenocarcinoma de **3,5 cm** (T2), **linfonodo 4R de 12 mm** (acima de 10 mm) com **captação ao PET-CT (SUVmax de 6,3)** e sem metástases à distância. O PET-CT tem especificidade limitada nos linfonodos do mediastino (inflamação e granulomas captam), e o achado de N2 muda o tratamento, que deixa de ser cirurgia isolada. Por isso, o linfonodo com captação deve ser confirmado por amostra histológica, de preferência pelo método menos invasivo, a punção por ultrassonografia endobrônquica (EBUS-TBNA); se o resultado for negativo e a suspeita persistir, completa-se com mediastinoscopia. A está errada porque operar sem confirmar o linfonodo expõe uma doença N2 a cirurgia isolada e a pacientes com N0 a ficarem sem a ressecção. C está errada porque a captação, sozinha, não estabelece o estádio e o tratamento sistêmico depende da prova histológica. D está errada porque esperar 3 meses atrasa o tratamento de um câncer potencialmente curável sem resolver a dúvida.",
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
  enunciado:"Mulher, 61 anos, hipertensa e dislipidêmica, é atendida em hospital sem serviço de hemodinâmica, 90 minutos depois do início de dor torácica intensa, em aperto, com sudorese. O eletrocardiograma mostra supradesnivelamento do segmento ST de 3 mm de V1 a V5. PA 138/84 mmHg e FC 92 bpm, sem sinais de insuficiência cardíaca. Não há contraindicação à fibrinólise. O serviço de hemodinâmica mais próximo só poderá realizar a angioplastia cerca de 150 minutos após o primeiro contato médico. Qual é a conduta de reperfusão mais adequada?",
  alternativas:[{id:"A",texto:"Transferência para angioplastia primária, sem trombolítico, pois a angioplastia sempre é preferível."},{id:"B",texto:"Fibrinólise imediata, seguida de transferência para angiografia coronária nas primeiras 24 horas."},{id:"C",texto:"Espera da dosagem seriada de troponina para confirmar o infarto antes de indicar qualquer reperfusão."},{id:"D",texto:"Anticoagulação plena e dupla antiagregação, reservando a reperfusão para a persistência da dor."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **dor típica há 90 minutos** (menos de 12 horas), **supradesnivelamento de ST de 3 mm de V1 a V5** (infarto anterior extenso, sem necessidade de esperar marcador), **sem contraindicação à fibrinólise** e **angioplastia só em 150 minutos**, acima do limite de **120 minutos** do primeiro contato médico até a passagem do fio-guia. Quando a angioplastia primária não pode ser feita nesse prazo, a fibrinólise deve ser aplicada logo, e o paciente é transferido para angiografia (estratégia farmacoinvasiva), em geral entre 2 e 24 horas, ou antes, se a reperfusão falhar. A está errada porque a preferência pela angioplastia só vale quando ela é possível dentro de 120 minutos; esperar 150 minutos perde o benefício. C está errada porque, no STEMI, a decisão de reperfundir é clínica e eletrocardiográfica e não aguarda troponina. D está errada porque anticoagulação e antiagregação são complementares e não substituem a reperfusão no infarto com supradesnível de ST.",
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
  enunciado:"Homem, 60 anos, apresenta fibrilação ventricular presenciada na unidade de terapia intensiva e recupera a circulação espontânea após 2 choques e 9 minutos de reanimação. Permanece intubado, em ventilação mecânica, sem abrir os olhos nem obedecer a comandos. PA 102/62 mmHg (pressão arterial média de 75 mmHg), FC 96 bpm, temperatura de 36,4 °C e SpO2 de 100% com FiO2 de 100%. O eletrocardiograma não mostra supradesnivelamento do segmento ST. Qual é a conduta mais adequada nas primeiras horas?",
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
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **bacteremia por E. coli produtora de ESBL**, **resistente à ceftriaxona**, com sinais de sepse (**lactato de 3,1 mmol/L**, taquicardia, febre de 39,2 °C) e foco urinário complicado. Para infecções graves por enterobactérias produtoras de ESBL fora do trato urinário baixo, o carbapenêmico (meropenem) é o tratamento de escolha. A está errada porque, no estudo MERINO, a piperacilina-tazobactam não foi não inferior ao meropenem em bacteremia por E. coli e Klebsiella resistentes à ceftriaxona (mortalidade em 30 dias de 12,3% contra 3,7%), mesmo com sensibilidade in vitro. C está errada porque a cefepima também não é recomendada para ESBL: a hidrólise pela enzima e o efeito do inóculo falham em infecção grave. D está errada porque a ESBL hidrolisa a ceftriaxona, e o aumento da dose não vence a resistência; o aminoglicosídeo por 48 horas não fecha o tratamento da bacteremia.",
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
  enunciado:"Mulher, 72 anos, com pneumonia comunitária grave, evolui com choque séptico: depois da infusão de 30 mL/kg de cristaloide balanceado, mantém PA de 78/42 mmHg (pressão arterial média de 54 mmHg), lactato de 4,6 mmol/L e oligúria. O eletrocardiograma mostra fibrilação atrial de início recente, com frequência ventricular de 138 bpm. O antibiótico já foi administrado. Qual vasopressor deve ser a primeira escolha?",
  alternativas:[{id:"A",texto:"Dopamina em dose intermediária, por aumentar a pressão e o débito cardíaco."},{id:"B",texto:"Adrenalina em infusão contínua, por seu efeito vasopressor e inotrópico potente."},{id:"C",texto:"Noradrenalina em infusão contínua, com monitorização da pressão arterial."},{id:"D",texto:"Fenilefrina em infusão contínua, por não ter efeito sobre a frequência cardíaca."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **choque séptico** (PAM de 54 mmHg e **lactato de 4,6 mmol/L** persistentes após **30 mL/kg** de cristaloide), com **fibrilação atrial de 138 bpm**. A noradrenalina é o vasopressor de primeira linha no choque séptico, e a campanha de sobrevivência à sepse a recomenda sobre dopamina e adrenalina; na presença de taquiarritmia, é a que menos a agrava. A está errada porque a dopamina causa mais taquiarritmia, inclusive fibrilação atrial, e está associada a maior mortalidade que a noradrenalina. B está errada porque a adrenalina é droga de segunda ou terceira linha, adicionada quando a noradrenalina e a vasopressina não bastam, e pode piorar a taquicardia e o lactato. D está errada porque a fenilefrina é vasoconstritor puro, reduz o débito cardíaco e não é recomendada como primeira escolha no choque séptico. A vasopressina é acrescentada à noradrenalina quando a dose dela sobe.",
  explicacoesAlternativas:{},
  referencias:"Surviving Sepsis Campaign: international guidelines for management of sepsis and septic shock 2026. Intensive Care Med 2026 (doi 10.1007/s00134-026-08361-1; recomendações conferidas em resumos); Evans L et al. Surviving Sepsis Campaign 2021. Crit Care Med 2021;49:e1063-e1143.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-15"
}
]);
