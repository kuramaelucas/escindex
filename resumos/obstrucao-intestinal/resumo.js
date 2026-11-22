/* resumos/obstrucao-intestinal/resumo.js — resumo adaptativo de obstrução intestinal: tipos de abdome agudo e classificação
   da obstrução, delgado (bridas, hérnia interna, íleo biliar), cólon (neoplasia, volvo de sigmoide, megacólon chagásico,
   pseudo-obstrução) e obstrução na criança (invaginação, estenose do piloro, malrotação, Meckel).
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- obstrucao-intestinal */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "obstrucao-intestinal",
  titulo: "Obstrução intestinal e abdome agudo obstrutivo",
  assunto: "ass-obstrucao",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "wses-bridas", texto: "WSES — diretriz de obstrução de delgado por aderências (2017 e atualização)", lidoEm: null },
    { id: "obstrucao-maligna", texto: "ESGE/ASCRS — stent colônico e obstrução maligna do cólon", lidoEm: null },
    { id: "ogilvie", texto: "ACG/ASGE — pseudo-obstrução colônica aguda (síndrome de Ogilvie): neostigmina e descompressão", lidoEm: null },
    { id: "cirurgia-pediatrica", texto: "Tratados de cirurgia pediátrica — invaginação intestinal, estenose hipertrófica do piloro, malrotação e divertículo de Meckel", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anulada pela banca", questoes: ["q-amrigs2021-040"] },
  ],
  doencas: [
    {
      id: "classificacao", titulo: "Abdome agudo e classificação da obstrução",
      introducao: `[[O abdome agudo se divide em **inflamatório, hemorrágico, isquêmico (vascular), obstrutivo e perfurativo**, e cada tipo tem uma dor que se reconhece: a do perfurativo é **súbita e intensa, com defesa difusa**; a do vascular é **desproporcional ao exame**; a do obstrutivo é em **cólica, com distensão, vômitos e parada de eliminação de gases e fezes**.|q-amrigs2023-027,q-famema2021-019,q-sessp2022-022,q-fmabc2025-013]]

**Obstruir** é impedir a progressão do conteúdo. O intestino proximal ao ponto se dilata, enche-se de líquido e gás e cria cólica, vômitos e distensão, e o cólon colabado a jusante não recebe fezes nem gases. A pergunta que decide a conduta em toda obstrução é a mesma: **há sofrimento da alça?** Sem ele, o tratamento é conservador; com ele (peritonite, instabilidade, lactato alto, sinais tomográficos de isquemia), é cirúrgico.

Veja também: **Hérnias da parede abdominal** (hérnia encarcerada como causa de obstrução), **Abdome agudo e malformações digestivas do recém-nascido** (atresias e malrotação do neonato, que têm o resumo completo lá), **Trauma abdominal**, **Complicações cirúrgicas** e, quando escritos, **Apendicite** e **Cuidados perioperatórios**.`,
      fragmentos: [
        { id: "abd-tipos", titulo: "Tipos de abdome agudo e como reconhecer", conferir: true,
          casos: ["q-unesp2021-077"],
          questoes: ["q-amrigs2023-027","q-famema2021-019","q-sessp2022-022","q-fmabc2025-013","q-sirio2023-032","q-iamspe2025-027","q-unesp2021-077"],
          prosa: `[[No **perfurativo**, o conteúdo que extravasa irrita o peritônio, e a dor é súbita e intensa, com defesa difusa (abdome em tábua); na radiografia, o ar livre aparece como **faixa radiotransparente sob a cúpula diafragmática**, o **pneumoperitônio**, e a conduta é **laparotomia ou laparoscopia de urgência**.|q-famema2021-019,q-unesp2021-077,q-iamspe2025-027]] [[No **vascular** (isquemia mesentérica), a dor é **desproporcional** ao exame físico, porque a isquemia precede a inflamação do peritônio; o idoso com aterosclerose e dor difusa súbita, sem peritonite, é o quadro típico; na **trombose venosa mesentérica**, sem irritação peritoneal, a urgência é **anticoagulação** imediata.|q-sessp2022-022,q-fmabc2025-013,q-sirio2023-032]]

Nem toda dor abdominal é cirúrgica. [[**Hiponatremia e uremia** são causas clínicas de dor abdominal, não cirúrgicas, e a causa benigna mais comum de abdome agudo obstrutivo são as **bridas**, seguidas das hérnias.|q-amrigs2023-027]]`,
          texto: `- Cinco tipos: **inflamatório, hemorrágico, isquêmico, obstrutivo e perfurativo**. {q-amrigs2023-027}
- Perfurativo: dor **súbita e intensa** com defesa difusa. {q-famema2021-019}
- Dor epigástrica súbita, descompressão brusca positiva e radiografia de abdome agudo: **perfuração**, cirurgia de urgência. {q-iamspe2025-027}
- Faixa radiotransparente sob a cúpula direita: **pneumoperitônio**, perfuração de víscera oca. {q-unesp2021-077}
- Idoso aterosclerótico com dor difusa súbita sem peritonite: **abdome agudo vascular**. {q-sessp2022-022}
- Achado mais típico de isquemia intestinal aguda: **dor desproporcional ao exame**. {q-fmabc2025-013}
- Trombose venosa mesentérica sem peritonite: **enoxaparina** (anticoagulação). {q-sirio2023-032}
- Hiponatremia e uremia são causas **clínicas**; a causa benigna mais comum de obstrução são as **bridas**. {q-amrigs2023-027}` },
        { id: "obs-classificacao", titulo: "Mecânica × funcional, alta × baixa e alça fechada", conferir: true,
          questoes: ["q-sessp2023-017","q-sessp2022-023","q-sessp2025-024","q-amrigs2020-037","q-famema2021-002","q-tp20202-080"],
          prosa: `A obstrução é **mecânica** quando há obstáculo (brida, hérnia, tumor, volvo, cálculo) e **funcional** (pseudo-obstrução) quando o intestino para sem obstáculo. [[**Íleo funcional, síndrome de Ogilvie e íleo espástico por porfiria** são pseudo-obstruções; o **íleo biliar** não é: é obstrução mecânica do delgado por um cálculo.|q-amrigs2020-037]] [[O **vômito fecaloide** tardio, com dor e distensão, sem peritonite nem leucocitose, descreve obstrução **mecânica, baixa e não complicada**.|q-sessp2022-023]]

[[A **alça fechada** tem **dois pontos de obstrução** (volvo de sigmoide, hérnia interna, hérnia inguinal encarcerada) e é **emergência cirúrgica**, porque o segmento fechado se distende e perde a irrigação; o íleo biliar e o tumor de cólon esquerdo com válvula ileocecal incompetente não formam alça fechada.|q-sessp2025-024,q-sessp2023-017]] Volvo e bridas são causas extrínsecas; neoplasia gástrica e estenose antropilórica também obstruem (saída gástrica), e a neoplasia de cólon pode ter como primeira manifestação o quadro obstrutivo.

[[Entre volvo de ceco, íleo biliar, bridas de cirurgia aberta recente e hérnia inguinal encarcerada, só as **bridas** têm boa chance de responder ao tratamento não cirúrgico.|q-famema2021-002]] [[Cicatriz mediana, cólica, vômitos, distensão, ruídos aumentados e níveis na radiografia, sem defesa, são **obstrução intestinal**.|q-tp20202-080]]`,
          texto: `- Pseudo-obstrução: **íleo funcional, Ogilvie, íleo espástico por porfiria**; íleo biliar é **mecânico**. {q-amrigs2020-037}
- Vômito fecaloide, dor e distensão sem peritonite nem leucocitose: obstrução **mecânica, baixa e não complicada**. {q-sessp2022-023}
- **Alça fechada** (dois pontos de obstrução) é **emergência cirúrgica**. {q-sessp2023-017}
- Alça fechada: **volvo de sigmoide, hérnia interna, hérnia inguinal encarcerada**. {q-sessp2025-024}
- Neoplasia gástrica e estenose antropilórica **causam** obstrução; a neoplasia de cólon pode se manifestar assim. {q-sessp2023-017}
- Obstrução do delgado vinte dias após cirurgia aberta (bridas): a que mais responde ao tratamento **não cirúrgico**. {q-famema2021-002}
- Cicatriz mediana, cólica, vômitos, níveis hidroaéreos: **obstrução intestinal**. {q-tp20202-080}` },
        { id: "obs-exames", titulo: "Radiografia e tomografia na obstrução", conferir: true,
          questoes: ["q-iamspe2021-017","q-iamspe2021-021","q-usp2026-033"],
          prosa: `[[A **radiografia simples** de abdome continua sendo o exame inicial na suspeita de abdome agudo obstrutivo: mostra distensão e níveis hidroaéreos, é rápida e barata; mas ela não dá a causa nem o sofrimento da alça, e por isso, no idoso com quadro de obstrução, **a tomografia será feita**, e a ultrassonografia não é o primeiro exame.|q-iamspe2021-021,q-iamspe2021-017]] No idoso obstipado sem cirurgia prévia, a hérnia interna não pode ser descartada, e o volvo ou a neoplasia dependem do exame. [[Na obstrução por bridas, a tomografia esperada mostra **alças de delgado dilatadas** com ponto de transição, em paciente com laparotomia prévia.|q-usp2026-033]]`,
          texto: `- A **radiografia simples** é o exame inicial no abdome agudo obstrutivo. {q-iamspe2021-021}
- Idoso com suspeita de obstrução: pode começar pela radiografia, mas a **tomografia** será feita; a ultrassonografia não é o primeiro exame. {q-iamspe2021-017}
- Bridas: tomografia com **alças de delgado dilatadas** e ponto de transição. {q-usp2026-033}` },
      ],
    },
    {
      id: "delgado", titulo: "Obstrução do intestino delgado",
      introducao: `[[As **bridas** (aderências de cirurgia prévia) são a principal causa de obstrução do delgado em adultos operados: a banda fibrosa angula ou comprime a alça. Sem sinais de sofrimento, a maioria (cerca de 70 a 80 %) se resolve **sem operar**, com jejum, sonda nasogástrica aberta, hidratação e correção de eletrólitos; com sofrimento, é cirurgia.|q-adap26-003,q-scmsp2023-040,q-scmsp2025-033]] Sem cirurgia prévia, as causas são hérnia, tumor, volvo, doença de Crohn e, no idoso, o íleo biliar.`,
      fragmentos: [
        { id: "bri-conservador", titulo: "Bridas: tratamento não operatório", conferir: true, diretrizes: ["wses-bridas"],
          figuras: [{ arquivo: "figuras/bridas-conduta.svg", legenda: "Esquema autoral: obstrução do delgado por bridas, tratar ou operar." }],
          questoes: ["q-adap26-003","q-scmsp2023-040","q-scmsp2025-033","q-sirio2025-022","q-uspsp2-083","q-sirio2021-032","q-famerp2022-074","q-einstein2022-019","q-iamspe2026-026"],
          prosa: `[[O paciente **estável, sem peritonite**, com lactato normal, tomografia sem sinais de isquemia e cirurgia abdominal prévia (histerectomia, apendicectomia, retossigmoidectomia, trauma) é tratado com **jejum, sonda nasogástrica aberta, hidratação e correção de eletrólitos**, com reavaliação a cada poucas horas.|q-adap26-003,q-scmsp2023-040,q-scmsp2025-033,q-sirio2021-032,q-uspsp2-083]] [[O **contraste hidrossolúvel** tem valor diagnóstico e terapêutico (contraste que chega ao cólon em até 24 horas prevê resolução); o **bário** não se usa, pela impactação, perfuração e peritonite por bário; e os **procinéticos** e o **enema** devem ser evitados, porque aumentam o peristaltismo contra o ponto obstruído e não resolvem a obstrução mecânica.|q-adap26-003,q-einstein2022-019,q-famerp2022-074]]

A obstrução alta em quem tem **colostomia** segue a mesma regra: [[jejum e sonda nasogástrica, e não a lise de bridas por vídeo, a colonoscopia ou o antibiótico.|q-sirio2025-022]] [[Sem cirurgia prévia, o paciente com vômitos incoercíveis recebe **cristaloide balanceado**, e a sonda nasogástrica serve para controle de sintomas e como indicador da resposta.|q-iamspe2026-026]] O tratamento clínico é tentado por cerca de 48 a 72 horas; antibiótico não é obrigatório e a leucocitose isolada, sem peritonite, não obriga operar.`,
          texto: `- Bridas, estável, lactato normal, sem peritonite: **tratamento não operatório** (sonda, hidratação, contraste hidrossolúvel, reavaliação). {q-adap26-003}
- Histerectomia antiga, delgado obstruído sem complicação: **sonda nasogástrica, hidratação e observação**. {q-scmsp2023-040}
- Múltiplas cirurgias, vômitos fecaloides, sem hérnia externa: **sonda nasogástrica e observação**. {q-scmsp2025-033}
- Obstrução alta em colostomizado: **jejum e sonda nasogástrica**. {q-sirio2025-022}
- Histerectomia há 6 dias, vômitos biliosos, delgado dilatado: **jejum e sonda**. {q-uspsp2-083}
- Laparotomia por trauma, 37 °C, sem peritonite: **jejum, hidratação, sonda aberta e observação**. {q-sirio2021-032}
- Conduta a **evitar** na suboclusão por bridas: **enema e procinéticos**. {q-famerp2022-074}
- Em obstrução por brida estável, o **bário** é a conduta de maior risco (usa-se hidrossolúvel). {q-einstein2022-019}
- Vômitos incoercíveis sem cirurgia prévia: **cristaloide balanceado e sonda** para sintomas e resposta. {q-iamspe2026-026}` },
        { id: "bri-cirurgia", titulo: "Bridas: quando operar e por qual via", conferir: true, diretrizes: ["wses-bridas"],
          questoes: ["q-amrigs2025-034","q-fmabc2022-024","q-sirio2023-033","q-famerp2026-067","q-iamspe2021-018"],
          prosa: `A indicação de cirurgia vem do **sofrimento** da alça, não do tempo de história. [[Na tomografia, a **alça fechada** com dilatação entre dois estreitamentos, parede espessada e **redução do realce** é isquemia, e a conduta é cirurgia, assim como a **peritonite com hipotensão, febre e leucocitose**; a tomografia também antecipa a indicação cirúrgica ao mostrar redemoinho, líquido livre e baixo realce.|q-amrigs2025-034,q-fmabc2022-024,q-iamspe2021-018]] [[O paciente que **não melhora** com sonda e hidratação, com laparotomia prévia por obstrução, ruídos diminuídos e PCR alta, vai à **cirurgia imediata** (laparotomia ou laparoscopia).|q-sirio2023-033]]

[[A **adesiólise laparoscópica** é possível em casos selecionados (banda única, distensão limitada, equipe com experiência) e tem menor morbidade, ao custo de maior risco de lesão inadvertida da alça; o tratamento não operatório é tentado até cerca de 72 horas.|q-famerp2026-067]]`,
          texto: `- Alça fechada, parede de 4 mm e redução do realce: **abordagem cirúrgica**. {q-amrigs2025-034}
- Brida com peritonite difusa, hipotensão, febre e leucocitose: **laparotomia exploradora**. {q-fmabc2022-024}
- Persistência após sonda e hidratação, PCR 53, ruídos diminuídos: **cirurgia imediata**. {q-sirio2023-033}
- Adesiólise por **laparoscopia** em selecionados: menor morbidade, mais risco de lesão intestinal. {q-famerp2026-067}
- A **tomografia** antecipa a indicação cirúrgica; antibiótico não é obrigatório nem o tempo de história decide. {q-iamspe2021-018}` },
        { id: "bri-causas", titulo: "Delgado sem brida: hérnia interna, tumor, abscesso, Crohn e outras causas", conferir: true, diretrizes: ["wses-bridas"],
          questoes: ["q-usp2022-062","q-einstein2024-019","q-sirio2025-040","q-sessp2026-027","q-amrigs2024-039","q-einstein2024-023","q-einstein2024-024"],
          prosa: `Sem cirurgia prévia, a obstrução não é por brida: [[o homem de 62 anos com meses de cólica, vômitos e quatro dias sem eliminar fezes e gases tem obstrução mecânica do delgado por **causa intrínseca** (tumor ou hérnia), e o jovem de 32 anos com sete dias de quadro e **transição abrupta** na tomografia vai à laparoscopia ou laparotomia, porque o tratamento conservador não resolve lesão fixa.|q-usp2022-062,q-einstein2024-019]]

[[Depois de **bypass gástrico em Y de Roux** ou gastrectomia com Y de Roux, a obstrução do delgado pode ser **hérnia interna** por falha mesentérica, com risco de estrangulamento: tomografia com alças dilatadas e mudança de calibre, sem melhora em 48 horas, indica cirurgia.|q-sirio2025-040,q-sessp2026-027]] [[A obstrução por **abscesso intra-abdominal** pode ser resolvida pela **drenagem percutânea**; a obstrução por Crohn agudizado ou por enterite actínica é tratada primeiro de forma clínica.|q-amrigs2024-039]] [[A hérnia irredutível com obstrução mecânica pode estar complicada, e a tomografia mostra a transição no nível da hérnia; não se reduz a hérnia sob sedação.|q-einstein2024-023,q-einstein2024-024]]`,
          texto: `- Sem cirurgia prévia, cólica há meses e obstrução do delgado: causa **intrínseca**, tumor ou hérnia. {q-usp2022-062}
- Jovem sem cirurgia prévia, obstrução de 7 dias com transição abrupta: **laparoscopia ou laparotomia**. {q-einstein2024-019}
- Gastrectomia com Y de Roux, alças dilatadas e mudança de calibre: **hérnia interna**, cirurgia. {q-sirio2025-040}
- Bypass gástrico com delgado dilatado: a prova cobrou **suporte clínico** (ver Armadilhas). {q-sessp2026-027}
- Obstrução por **abscesso**: drenagem percutânea; Crohn agudizado e enterite actínica: tratamento clínico primeiro. {q-amrigs2024-039}
- Hérnia irredutível com obstrução e creatinina alta: **obstrução mecânica, podendo estar complicada**. {q-einstein2024-023}
- Tomografia da mesma paciente: **sinais de obstrução intestinal**, com transição na hérnia. {q-einstein2024-024}` },
        { id: "ileo-biliar", titulo: "Íleo biliar", conferir: true,
          questoes: ["q-adap23-094","q-unifesp2025-002","q-einstein2023-024"],
          prosa: `Um **cálculo grande** (acima de 2,5 cm) erode a parede da vesícula inflamada e forma uma **fístula colecistoentérica**, em geral com o duodeno; o cálculo migra e obstrui a luz do delgado, em geral no íleo terminal, a parte mais estreita. [[A **tríade de Rigler** é obstrução do delgado, **ar nas vias biliares** (aerobilia, pneumocolangiograma) e cálculo ectópico; o quadro típico é a idosa com crises prévias de dor epigástrica e febre, sem cicatriz cirúrgica.|q-adap23-094,q-unifesp2025-002,q-einstein2023-024]] [[O tratamento é **laparotomia com enterolitotomia**; na idosa de alto risco, não se trata a fístula no mesmo tempo, porque a colecistectomia associada tem mortalidade maior; a CPRE não desobstrui o intestino.|q-adap23-094]]`,
          texto: `- Idosa com colelitíase, delgado obstruído, aerobilia e cálculo ectópico: **íleo biliar**; **enterolitotomia** sem tratar a fístula no mesmo tempo. {q-adap23-094}
- Obstrução com **pneumocolangiograma** em idosa: **íleo biliar**. {q-unifesp2025-002}
- Crises de dor epigástrica e febre, sem cicatriz, alças dilatadas e pneumobilia: **íleo biliar**. {q-einstein2023-024}` },
      ],
    },
    {
      id: "colon", titulo: "Obstrução do cólon",
      introducao: `[[No cólon, a **válvula ileocecal continente** faz do segmento obstruído uma **alça fechada**: o conteúdo não reflui para o delgado, o ceco se distende e, acima de cerca de **12 cm**, o risco de perfuração cresce.|q-adap21-089,q-udisc20262-061,q-tp20212-072]] A obstrução colônica dá menos vômitos e mais distensão, e as causas são o **câncer**, o **volvo de sigmoide**, o **fecaloma** e a pseudo-obstrução de Ogilvie.`,
      fragmentos: [
        { id: "col-neoplasia", titulo: "Neoplasia obstrutiva do cólon", conferir: true, diretrizes: ["obstrucao-maligna"],
          figuras: [{ arquivo: "figuras/colon-obstrucao.svg", legenda: "Esquema autoral: cólon muito dilatado, volvo de sigmoide, neoplasia estenosante e pseudo-obstrução." }],
          questoes: ["q-adap21-089","q-tp20212-072","q-tp20231-070","q-tp20222-065","q-udisc20262-061","q-uspsp1-025","q-amrigs2022-032"],
          prosa: `O quadro do câncer obstrutivo é o de **alteração do hábito, fezes afiladas, perda de peso, anemia** e, por fim, parada de eliminação. [[A radiografia mostra **distensão colônica com válvula ileocecal competente**, sem ar na ampola retal, e o diagnóstico é obstrução intestinal **baixa**; a distensão do ceco ao cólon descendente, sem pregas coniventes, localiza o obstáculo no sigmoide.|q-tp20212-072,q-tp20231-070,q-udisc20262-061]]

[[A conduta é **ressuscitar** (jejum, sonda, hidratação) e **operar**: a operação de **Hartmann** (ressecção e colostomia terminal) evita anastomose em cólon distendido, e o **stent colônico** serve de ponte para a ressecção eletiva em quem tem risco alto; a colectomia esquerda trata a lesão estenosante do ângulo esplênico; não é caso de esperar regressão nem de quimioterapia antes de descomprimir.|q-adap21-089,q-uspsp1-025,q-tp20222-065]] [[O idoso com dor há cinco dias, distensão e timpanismo tem como hipótese **neoplasia de cólon perfurada**.|q-amrigs2022-032]]`,
          texto: `- Fezes afiladas, perda de peso e massa estenosante do sigmoide sem complicação: **Hartmann** ou **stent como ponte** e ressecção eletiva. {q-adap21-089}
- Emagrecimento, constipação e massa hipogástrica: obstrução **baixa**, distensão colônica, **válvula ileocecal competente**. {q-tp20212-072,q-tp20231-070}
- Alteração do hábito, anemia e distensão acentuada: **jejum, hidratação, sonda** e possível cirurgia de urgência. {q-tp20222-065}
- Distensão do ceco ao descendente, sem ar no reto: **câncer obstrutivo de sigmoide** com válvula continente. {q-udisc20262-061}
- Hematoquezia e obstrução com espessamento no ângulo esplênico: **colectomia esquerda**. {q-uspsp1-025}
- Idoso com dor há 5 dias, distensão e timpanismo: **neoplasia de cólon perfurada**. {q-amrigs2022-032}` },
        { id: "col-volvo", titulo: "Volvo de sigmoide, megacólon chagásico e fecaloma", conferir: true, diretrizes: ["obstrucao-maligna"],
          casos: ["q-uspsp5-067"],
          questoes: ["q-adap25-002","q-uspsp5-067","q-fmabc2026-039","q-usp2024-026","q-scmsp2022-016","q-sessp2024-031","q-scmsp2026-028"],
          prosa: `No **volvo de sigmoide**, a alça redundante gira sobre o mesentério e forma uma alça fechada; o idoso institucionalizado, constipado ou em uso de antipsicótico, e o **chagásico** são os típicos. [[A radiografia mostra a alça única muito dilatada em **grão de café** ou U invertido, que sai da pelve para o hipocôndrio direito.|q-fmabc2026-039,q-uspsp5-067,q-adap25-002]] [[Sem peritonite, isquemia ou perfuração, a conduta é a **destorção** por retossigmoidoscopia ou colonoscopia, com sonda retal; como a recorrência é alta, indica-se a **sigmoidectomia eletiva**; a espera isolada e a sigmoidopexia isolada não são a primeira medida.|q-adap25-002,q-uspsp5-067,q-usp2024-026]]

No **megacólon chagásico**, [[a cirurgia eletiva é indicada após **volvo tratado endoscopicamente**, em **fecaloma de repetição** e na **constipação refratária** ao tratamento clínico; nem todo megacólon opera, e o laxante diário não é requisito.|q-scmsp2022-016]] [[O **fecaloma** no idoso acamado dá massa hipogástrica que **mantém a depressão à compressão (sinal de Gersuny)**, e o exame inicial é a radiografia simples; se a impactação com espessamento do sigmoide persiste após **cinco dias de tratamento clínico**, indica-se cirurgia, antes da colite estercoral e da perfuração.|q-sessp2024-031,q-scmsp2026-028]]`,
          texto: `- Idoso institucionalizado, constipado, antipsicótico, alça única em **grão de café**: **retossigmoidoscopia para destorção** e sigmoidectomia eletiva. {q-adap25-002}
- Idoso de 80 anos, grão de café, sem peritonite ou isquemia: **descompressão por colonoscopia**. {q-uspsp5-067}
- **Grão de café** na radiografia: sinal do **volvo de sigmoide**, não de delgado. {q-fmabc2026-039}
- Chagásica com sigmoide dilatado e sem sofrimento de alça: **colonoscopia**. {q-usp2024-026}
- Megacólon chagásico: cirurgia eletiva após **volvo tratado, fecaloma de repetição, constipação refratária**. {q-scmsp2022-016}
- Idosa acamada com massa hipogástrica e **sinal de Gersuny**: **fecaloma**, radiografia simples. {q-sessp2024-031}
- Impactação fecal com espessamento do sigmoide, sem melhora em 5 dias: **intervenção cirúrgica**. {q-scmsp2026-028}` },
        { id: "col-ogilvie", titulo: "Pseudo-obstrução colônica aguda (síndrome de Ogilvie)", conferir: true, diretrizes: ["ogilvie"],
          questoes: ["q-usp2026-026","q-usprp2023-098","q-usprp2025-099","q-sirio2021-027","q-fmabc2021-004"],
          prosa: `[[A **síndrome de Ogilvie** é a dilatação do cólon, sobretudo do ceco e do cólon direito, **sem obstáculo mecânico**, por desequilíbrio autonômico: aparece no pós-operatório (cirurgia cardíaca, ortopédica), no acamado, no queimado grave e no doente de UTI, com distúrbio eletrolítico.|q-usp2026-026,q-usprp2023-098,q-usprp2025-099]] A tomografia mostra o cólon dilatado sem ponto de obstrução, e o risco é isquemia e perfuração do ceco acima de 12 cm.

[[O **suporte** vem primeiro: sonda, jejum, hidratação, correção de **potássio** e demais eletrólitos e suspensão de opioides e anticolinérgicos; o preparo do cólon com manitol e o corticoide estão errados.|q-usprp2025-099,q-usp2026-026]] [[Persistindo, ou com o ceco muito dilatado e PCR em ascensão, descomprime-se: a **colonoscopia descompressiva** é a conduta nas provas, em lugar da neostigmina, que tem contraindicações cardíacas e causa bradicardia.|q-usprp2023-098,q-sirio2021-027,q-fmabc2021-004]]`,
          texto: `- Idosa no 6º pós-operatório de troca valvar, distensão sem peritonite, K 3,1: **Ogilvie**, corrigir eletrólitos e descomprimir se persistir. {q-usp2026-026}
- Idoso de 90 anos acamado, dilatação gasosa de todo o cólon: **pseudo-obstrução**, **descompressão endoscópica**. {q-usprp2023-098}
- Queimado grave em CTI, distensão sem ponto obstrutivo: **sonda nasogástrica e correção dos eletrólitos**. {q-usprp2025-099}
- Covid grave, PCR em ascensão, cólon muito dilatado: **colonoscopia descompressiva**. {q-sirio2021-027}
- Idosa em UTI, droga vasoativa, cólon muito dilatado: **colonoscopia descompressiva**, não neostigmina. {q-fmabc2021-004}` },
      ],
    },
    {
      id: "pediatrica", titulo: "Obstrução na criança",
      introducao: `[[O lactente com **cólica intermitente**, intervalos de calma, vômitos e **fezes em geleia de framboesa** tem **invaginação intestinal** até prova em contrário: um segmento penetra no seguinte, a veia e a linfa são comprimidas, a parede edemacia e a mucosa isquêmica sangra.|q-adap25-086,q-unifesp2022-013,q-usprp2023-096]] O vômito bilioso do recém-nascido é outro quadro, o da malrotação com volvo.`,
      fragmentos: [
        { id: "ped-invaginacao", titulo: "Invaginação intestinal", conferir: true, diretrizes: ["cirurgia-pediatrica"],
          casos: ["q-usprp2021-089"],
          questoes: ["q-adap24-063","q-adap25-086","q-unifesp2022-013","q-unifesp2024-017","q-unifesp2026-003","q-usp2022-049","q-usprp2021-089","q-usprp2023-096","q-usprp2024-040","q-unifesp2023-094"],
          prosa: `[[O pico é entre 4 e 12 meses; o exame é a **ultrassonografia** (imagem em **alvo**), e o sangue na fralda ou no toque retal, com a **massa em salsicha** palpável e o **sinal de Dance**, completa o quadro; a colonoscopia, a tomografia e a laparotomia não são o primeiro passo.|q-adap24-063,q-unifesp2026-003,q-usp2022-049,q-usprp2023-096]] [[A conduta definitiva, no lactente estável, sem peritonite nem pneumoperitônio, é a **redução não operatória** por **enema de ar ou de líquido**, guiado por ultrassonografia ou radioscopia, com cirurgião pediátrico disponível; o enema é diagnóstico e terapêutico.|q-adap24-063,q-adap25-086,q-unifesp2022-013,q-usprp2021-089,q-usprp2023-096,q-usprp2024-040]]

Antes da redução vem a **ressuscitação**: [[a criança que vomitou por horas está desidratada e com distúrbio hidroeletrolítico, e a **correção hidroeletrolítica** é a conduta imediata, mesmo com o diagnóstico feito pela ultrassonografia.|q-unifesp2024-017]] A cirurgia fica para **peritonite, pneumoperitônio, choque** ou falha da redução.`,
          texto: `- Lactente de 10 meses, geleia de morango e sinal do alvo, estável: **redução por enema** (hidrostático ou pneumático). {q-adap24-063}
- Lactente de 8 meses com massa em salsicha, sem peritonite: **enema de ar ou líquido** guiado. {q-adap25-086}
- Lactente de 9 meses, cólica, vômitos e muco sanguinolento: a **ultrassonografia** diagnostica e trata. {q-unifesp2022-013}
- Menino de 6 anos, sinal do alvo, vômitos há 12 horas: **correção hidroeletrolítica** primeiro. {q-unifesp2024-017}
- Um ano, cólica, vômitos, distensão e sangue no toque: **ultrassonografia**. {q-unifesp2026-003}
- Lactente de 2 meses com fezes sanguinolentas após toque e choro inconsolável: **ultrassonografia** confirma. {q-usp2022-049}
- Lactente de 6 meses, cólica com calma, sinal de Dance, fezes com muco e sangue: **enema opaco**, diagnóstico e redução. {q-usprp2021-089}
- Resultado esperado do enema opaco na invaginação: **redução hidrostática** do intussuscepto. {q-usprp2023-096}
- Lactente de 6 meses com cólica, prostração e fezes com muco e sangue: **enema opaco**, não cirurgia. {q-usprp2024-040}
- Lactente de 9 meses desidratado com obstrução: a prova cobrou **hidratação e antibiótico** (ver Armadilhas). {q-unifesp2023-094}` },
        { id: "ped-outras", titulo: "Estenose do piloro, malrotação, Meckel e áscaris", conferir: true, diretrizes: ["cirurgia-pediatrica"],
          casos: ["q-usprp2026-005"],
          questoes: ["q-adap22-013","q-adap23-087","q-usprp2026-005","q-unifesp2023-087","q-amrigs2022-025","q-unifesp2025-086"],
          prosa: `[[Na **estenose hipertrófica do piloro**, o lactente de 5 semanas vomita em jato, sem bile, e fica faminto; a perda de ácido clorídrico gera **alcalose metabólica hipoclorêmica e hipopotassêmica**, e o tratamento é **corrigir a alcalose e a desidratação** (salina, glicose e potássio) e **só então** a piloromiotomia, pois a anestesia sobre alcalose é arriscada.|q-adap22-013]] [[O recém-nascido com **vômitos biliosos súbitos** e pouco gás distal tem **malrotação com volvo do intestino médio**: o diagnóstico é a seriografia esofagogastroduodenal ou o ultrassom com Doppler, e a conduta é a **cirurgia de Ladd** de urgência; a tomografia com mesentério e vasos em **redemoinho** mostra o volvo com comprometimento vascular em criança maior.|q-adap23-087,q-usprp2026-005]]

[[O **divertículo de Meckel** é resquício do ducto onfalomesentérico, na **borda antimesentérica** do íleo distal; a maioria é assintomática, e o **sangramento indolor** do lactente, por mucosa gástrica ectópica que ulcera o íleo vizinho, se localiza pela **cintilografia com Tc-99m**.|q-unifesp2023-087,q-amrigs2022-025]] [[A criança que elimina vermes e para de evacuar, com vômitos, distensão e pouca diurese, tem **suboclusão por bolo de áscaris** com desidratação, e vai à urgência.|q-unifesp2025-086]]`,
          texto: `- Vômitos em jato, alcalose hipoclorêmica e hipopotassêmica: **corrigir** e depois **piloromiotomia**. {q-adap22-013}
- RN de 5 dias com vômitos biliosos súbitos e pouco gás distal: **malrotação com volvo**, seriografia ou Doppler e **Ladd** de urgência. {q-adap23-087}
- Tomografia com mesentério e vasos em **redemoinho**: **volvo de delgado** com comprometimento vascular. {q-usprp2026-005}
- Enterorragia súbita no lactente: **Meckel**, exame é a **cintilografia com Tc-99m**. {q-unifesp2023-087}
- Meckel: maioria **assintomática**, achado acidental; fica na borda antimesentérica. {q-amrigs2022-025}
- Vermes nas fezes, parada de evacuar e vômitos: **suboclusão por áscaris**, urgência. {q-unifesp2025-086}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-unifesp2023-094","q-unifesp2024-017","q-sessp2026-027","q-fmabc2021-004","q-sirio2021-027","q-usprp2025-099","q-einstein2022-019","q-famerp2022-074"],
          prosa: `[[Na invaginação, a redução por enema vem depois da ressuscitação; a UNIFESP 2023 cobrou como tratamento inicial **hidratação e antibiótico**, e a UNIFESP 2024 cobrou a **correção hidroeletrolítica** antes da redução.|q-unifesp2023-094,q-unifesp2024-017]] [[Após bypass gástrico, a hérnia interna é a causa mais temida e exige cirurgia; a SES-SP 2026 cobrou o **suporte clínico** como suficiente na maioria dos casos, e o gabarito é discutível.|q-sessp2026-027]] [[No Ogilvie, a colonoscopia é a conduta cobrada na FMABC 2021 e na Sírio 2021, mesmo com a neostigmina como primeira linha na maioria das diretrizes; a USP-RP 2025 cobrou apenas **sonda e correção dos eletrólitos**, por ser o início.|q-fmabc2021-004,q-sirio2021-027,q-usprp2025-099]]`,
          texto: `- Regra: ressuscitar e depois reduzir a invaginação; a prova (UNIFESP 2023) cobrou **hidratação e antibiótico** e a (UNIFESP 2024), a **correção hidroeletrolítica**. {q-unifesp2023-094,q-unifesp2024-017}
- Regra: após bypass gástrico, pensar em hérnia interna; a prova (SES-SP 2026) cobrou **suporte clínico**. {q-sessp2026-027}
- Regra: Ogilvie com neostigmina ou colonoscopia após o suporte; a prova (FMABC 2021 e Sírio 2021) cobrou **colonoscopia descompressiva**, e a (USP-RP 2025), **sonda e eletrólitos**. {q-fmabc2021-004,q-sirio2021-027,q-usprp2025-099}
- Regra: pergunta que pede a conduta **de maior risco** ou **a evitar**: a prova (Einstein 2022) cobrou o **bário** e a (FAMERP 2022), o **enema e os procinéticos**. {q-einstein2022-019,q-famerp2022-074}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `A tabela resume as causas de obstrução que a banca faz diferenciar pela imagem e pela conduta, sem dado novo.`,
      fragmentos: [
        { id: "comp-obstrucao", titulo: "Bridas × íleo biliar × volvo × neoplasia × Ogilvie × invaginação",
          conferir: true,
          questoes: ["q-adap26-003","q-adap23-094","q-adap25-002","q-adap21-089","q-usp2026-026","q-adap25-086"],
          prosa: `| | Bridas | Íleo biliar | Volvo de sigmoide | Neoplasia do cólon | Ogilvie | Invaginação |
|---|---|---|---|---|---|---|
| Quem | cirurgia prévia | idosa com litíase | idoso constipado, chagásico | idoso, emagrecimento | grave, pós-operatório | lactente |
| Imagem | delgado dilatado | **aerobilia**, cálculo | **grão de café** | cólon, válvula continente | cólon dilatado sem obstáculo | **alvo** na US |
| Conduta inicial | **sonda e hidratação** | enterolitotomia | **destorção endoscópica** | Hartmann ou stent | eletrólitos, descompressão | **enema** de ar ou líquido |
| Cirurgia | sofrimento da alça | sempre | eletiva depois | sempre | isquemia ou perfuração | peritonite ou falha |`,
          texto: `- Bridas estáveis: **tratamento não operatório**; íleo biliar: **enterolitotomia**. {q-adap26-003,q-adap23-094}
- Volvo de sigmoide: **destorção endoscópica**; neoplasia: **Hartmann ou stent**. {q-adap25-002,q-adap21-089}
- Ogilvie: **eletrólitos e descompressão**; invaginação: **enema**. {q-usp2026-026,q-adap25-086}` },
      ],
    },
  ],
});
