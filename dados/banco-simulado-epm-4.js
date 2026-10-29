/* ==========================================================================
   SIMULADO EPM 4 (base: prova-unifesp-2026) — 100 questões autorais
   ==========================================================================
   Cada questão parte do ASSUNTO e da posição de uma questão da prova prova-unifesp-2026, mas é
   escrita do zero: caso clínico, dados e alternativas próprios, e a resposta correta é a
   alternativa SEGUINTE à da prova real. Não são questões reais: marcam `real: false` e instituição
   "Esc — Banco Didático". A explicação segue o padrão de justificativa e cada questão cita a
   diretriz de base com edição e ano; o que não pôde ser conferido no texto oficial está dito
   na referência da questão e em docs/auditoria-simulado-epm-4.md.
   ========================================================================== */
window.EscDados.registrarQuestoes("banco-simulado-epm-4", [
// adaptada da estrutura da Q1 da prova-unifesp-2026
{
  id:"q-adap26-001", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-perioperatorio", assuntoId:"ass-cuidadosperi",
  enunciado:"Homem, 68 anos de idade, hipertenso e diabético em uso de insulina, com creatinina de 1,0 mg/dL, será submetido a colectomia direita eletiva por adenocarcinoma de cólon. Nega dor torácica, dispneia ou síncope e sobe dois lances de escada sem parar e sem sintomas. O eletrocardiograma de repouso mostra ritmo sinusal sem alterações isquêmicas. Qual é a conduta mais adequada quanto à avaliação cardiovascular pré-operatória?",
  alternativas:[{id:"A",texto:"Solicitar ecocardiograma transtorácico de repouso para avaliar a função ventricular antes de liberar o procedimento."},{id:"B",texto:"Prosseguir com a cirurgia sem testes adicionais, mantendo o tratamento clínico e o controle glicêmico no perioperatório."},{id:"C",texto:"Realizar teste ergométrico máximo para pesquisar isquemia miocárdica antes de liberar a operação do paciente."},{id:"D",texto:"Solicitar cintilografia de perfusão miocárdica com estresse farmacológico antes de liberar o procedimento."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: colectomia é cirurgia **intraperitoneal** (risco cirúrgico elevado), o paciente usa **insulina** e não tem sintomas cardíacos. Pelo índice de risco cardíaco revisado (RCRI), cada item vale 1 ponto: cirurgia de alto risco (intraperitoneal) = 1; diabetes em uso de insulina = 1; creatinina acima de 2 mg/dL = 0; doença coronariana = 0; insuficiência cardíaca = 0; doença cerebrovascular = 0. A soma é **2 pontos**, o que indica risco elevado de evento cardíaco maior e leva à avaliação da capacidade funcional. Subir dois lances de escada sem sintomas corresponde a **4 METs ou mais**: com capacidade funcional adequada, os testes de estresse não mudariam a conduta, e a cirurgia prossegue com o tratamento clínico mantido. A alternativa A está errada: o ecocardiograma de rotina não é indicado sem dispneia, sopro ou suspeita de insuficiência cardíaca. A alternativa C está errada: o teste ergométrico só se justifica quando a capacidade funcional é menor que 4 METs ou desconhecida e o resultado alteraria a conduta. A alternativa D está errada pelo mesmo motivo: o exame de estresse farmacológico fica para quem não consegue se exercitar e tem risco elevado.",
  explicacoesAlternativas:{},
  referencias:"2024 AHA/ACC Guideline for Perioperative Cardiovascular Management for Noncardiac Surgery (Circulation 2024); Lee TH et al., índice de risco cardíaco revisado (Circulation 1999). Nível de confirmação: memória. A busca pelo título da diretriz AHA/ACC de 2024 de manejo cardiovascular perioperatório retornou registros compatíveis no PubMed em 29/10/2026 (por exemplo, PMID 39556658), sem verificação individual; o texto não foi aberto.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q2 da prova-unifesp-2026
{
  id:"q-adap26-002", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-neo-malformacoesdigestivas",
  enunciado:"Recém-nascido a termo, em sala de parto, apresenta ao exame as alças intestinais exteriorizadas à direita da inserção do cordão umbilical, sem membrana recobrindo as alças, que estão edemaciadas e com aspecto espessado. O cordão está íntegro e normalmente inserido. Após o clampeamento do cordão, qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Cobrir as alças com compressas secas estéreis e encaminhar o recém-nascido para correção cirúrgica em até 48 horas de vida."},{id:"B",texto:"Reintroduzir manualmente as alças na cavidade abdominal e ocluir o defeito com bandagem compressiva firme e contínua."},{id:"C",texto:"Manter em decúbito dorsal, envolver as alças com gaze úmida e iniciar a dieta enteral precoce."},{id:"D",texto:"Sonda orogástrica aberta, alças e tronco envolvidos em filme plástico transparente, acesso venoso e reposição de volume."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **alças exteriorizadas à direita** de um cordão **íntegro e normalmente inserido**, **sem membrana** de revestimento: é o quadro de gastrosquise, defeito paraumbilical em que as alças ficam expostas ao líquido amniótico, o que explica o edema e o espessamento. Na onfalocele, ao contrário, o defeito é central, o cordão se insere no saco e há membrana. A conduta inicial visa evitar perda de calor, de líquidos e infecção: sonda orogástrica aberta para descompressão, filme plástico transparente envolvendo alças e tronco (sem compressas secas, que aderem e ressecam), acesso venoso, reposição de volume e posicionamento em decúbito lateral, para não tracionar o mesentério e comprometer a perfusão intestinal. A alternativa A está errada: compressas secas ressecam as alças e aderem à serosa, e o prazo cirúrgico é definido depois da estabilização, não por regra fixa. A alternativa B está errada: a redução forçada e a bandagem compressiva aumentam a pressão intra-abdominal e reduzem a perfusão intestinal. A alternativa C está errada: o decúbito dorsal tracionaria o mesentério, a gaze úmida perde calor e a dieta enteral é contraindicada no pré-operatório.",
  explicacoesAlternativas:{},
  referencias:"Brasil, Ministério da Saúde: Atenção à saúde do recém-nascido, guia para os profissionais de saúde (2011); Sociedade Brasileira de Pediatria, programa de reanimação neonatal. Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q3 da prova-unifesp-2026
{
  id:"q-adap26-003", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-abdagudo", assuntoId:"ass-obstrucao",
  enunciado:"Homem, 72 anos de idade, operado há dez anos de retossigmoidectomia por diverticulite, chega à emergência com cólicas, vômitos e ausência de flatos há 36 horas. Ao exame: PA 120 x 76 mmHg, FC 88 bpm, abdome distendido e timpânico, ruídos hidroaéreos aumentados, cicatriz mediana e ausência de defesa. A radiografia mostra alças de delgado dilatadas, níveis hidroaéreos e pouco gás colônico. Lactato normal. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Tratamento não operatório com sonda nasogástrica, hidratação, contraste hidrossolúvel e reavaliações seriadas."},{id:"B",texto:"Laparotomia exploradora imediata, pois a obstrução intestinal em paciente idoso tem alta chance de estrangulamento."},{id:"C",texto:"Colonoscopia descompressiva de urgência, com colocação de prótese autoexpansível no ponto de estreitamento."},{id:"D",texto:"Enema com bário para identificar o ponto da obstrução e indicar a ressecção do segmento acometido."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **cirurgia abdominal prévia**, dilatação de **delgado** com níveis hidroaéreos e pouco gás no cólon, ausência de **peritonite**, **FC 88 bpm** e **lactato normal**: obstrução de delgado por bridas, sem sinais de sofrimento isquêmico. Nesse cenário, a maioria dos casos (cerca de 70 a 80%) se resolve sem operação. Faz-se jejum, sonda nasogástrica, reposição de líquidos e eletrólitos e reavaliação clínica a cada poucas horas; o contraste hidrossolúvel tem valor diagnóstico (contraste no cólon em até 24 horas prevê resolução) e terapêutico. Indicam operação: peritonite, instabilidade, lactato elevado, sinais tomográficos de isquemia ou falha do tratamento clínico (em geral após 48 a 72 horas). A alternativa B está errada: a cirurgia imediata fica para quem tem sinais de estrangulamento, que o caso não apresenta. A alternativa C está errada: a colonoscopia com prótese trata obstrução colônica neoplásica, e aqui o cólon está com pouco gás. A alternativa D está errada: o bário é contraindicado se houver risco de perfuração, pois causa peritonite química, e não é o exame indicado na obstrução de delgado.",
  explicacoesAlternativas:{},
  referencias:"Ten Broek RPG et al. Bologna guidelines for diagnosis and management of adhesive small bowel obstruction, World J Emerg Surg 2018; WSES 2017. Nível de confirmação: memória. Não localizei edição da WSES para obstrução de delgado por bridas posterior à de 2017 até 29/10/2026; um estudo da BJS de 2025 mediu a adesão às recomendações de Bologna.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q4 da prova-unifesp-2026
{
  id:"q-adap26-004", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-dermato", assuntoId:"ass-derm-tumores",
  enunciado:"Mulher, 48 anos de idade, teve uma lesão pigmentada de 9 mm no dorso removida por biópsia excisional com margem estreita. O laudo mostra melanoma com espessura de Breslow de 1,4 mm, sem ulceração e com 2 mitoses por mm². O exame físico não mostra linfonodos palpáveis em nenhuma cadeia, e a tomografia de tórax, abdome e pelve não mostra doença à distância. Qual é a conduta cirúrgica mais adequada?",
  alternativas:[{id:"A",texto:"Ampliação da margem cirúrgica de 1 a 2 cm com pesquisa do linfonodo sentinela."},{id:"B",texto:"Ampliação da margem para 0,5 cm, sem estadiamento linfonodal, por se tratar de tumor sem ulceração."},{id:"C",texto:"Ampliação da margem para 3 cm associada a esvaziamento ganglionar axilar eletivo, por se tratar de tumor do dorso."},{id:"D",texto:"Observação e controle clínico trimestral, deixando a ampliação para o momento em que houver recidiva local."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: Breslow de **1,4 mm** (tumor T2a, pois está entre 1,01 e 2,0 mm e não há ulceração), sem linfonodos palpáveis e sem metástases em exames de imagem. A margem de ampliação depende da espessura: melanoma in situ 0,5 a 1 cm; até 1 mm, **1 cm**; de 1,01 a 2 mm, **1 a 2 cm**; acima de 2 mm, **2 cm**. A biópsia do linfonodo sentinela é oferecida quando o risco de comprometimento é de cerca de 10% ou mais, o que ocorre a partir de **1 mm** de espessura (e em tumores T1b), pois fornece o estadiamento e orienta o tratamento adjuvante. A alternativa B está errada: 0,5 cm é margem do melanoma in situ, insuficiente aqui, e omite o estadiamento linfonodal. A alternativa C está errada: 3 cm não é necessário e o esvaziamento eletivo não é feito sem sentinela positivo (e a cadeia de drenagem do dorso é definida por linfocintilografia). A alternativa D está errada: a conduta é a ampliação imediata, e esperar a recidiva piora o prognóstico.",
  explicacoesAlternativas:{},
  referencias:"Gershenwald JE et al. AJCC Cancer Staging Manual, 8ª ed. (CA Cancer J Clin 2017); NCCN Guidelines Melanoma: Cutaneous (versão 2025); Sociedade Brasileira de Dermatologia, diretrizes de melanoma. Nível de confirmação: memória. As diretrizes NCCN têm versões anuais ou mais frequentes e o texto não foi aberto; em 29/10/2026 só confirmei, por fonte secundária, a versão 1.2026 de câncer de pulmão não pequenas células alinhada ao TNM 9ª edição da AJCC, e que o estudo ATOMIC apoia imunoterapia mais cedo no câncer de cólon com instabilidade de microssatélites; as condutas desta questão devem ser conferidas na versão vigente.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q5 da prova-unifesp-2026
{
  id:"q-adap26-005", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-cirtoracica", assuntoId:"ass-cirtorax-pleura",
  enunciado:"Homem, 62 anos de idade, em tratamento sistêmico por adenocarcinoma de pulmão avançado, procura o pronto-socorro com dispneia progressiva. A radiografia mostra derrame pleural volumoso à direita, e a citologia do líquido é positiva para neoplasia. Uma toracocentese de alívio, há 12 dias, melhorou a falta de ar, que voltou em poucos dias. Após a retirada de 1.800 mL, a nova radiografia mostra reexpansão completa do pulmão. A expectativa de vida estimada é de alguns meses. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Toracocenteses de alívio repetidas sempre que houver dispneia, por serem o método de menor risco e custo."},{id:"B",texto:"Drenagem torácica com dreno tubular e antibioticoterapia de amplo espectro, como no derrame parapneumônico complicado."},{id:"C",texto:"Cateter pleural tunelizado de demora ou pleurodese com talco, para controlar a dispneia e a recorrência do derrame."},{id:"D",texto:"Pleurectomia com decorticação por toracotomia, tratamento padrão para todo derrame pleural neoplásico recorrente."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: derrame pleural **maligno** (citologia positiva), **sintomático**, com **recidiva em poucos dias** após a toracocentese e **reexpansão pulmonar completa** depois da drenagem (o pulmão não está encarcerado), em paciente com **sobrevida limitada** (meses). O objetivo é paliativo: controlar a dispneia com o menor número de procedimentos. As duas opções de primeira linha são o **cateter pleural tunelizado** (permite drenagem domiciliar, com pleurodese espontânea em parte dos casos e menor tempo de internação) e a **pleurodese com talco** (por dreno ou toracoscopia), que exige pulmão expansível. A escolha depende da preferência do paciente, do prognóstico e do apoio domiciliar. A alternativa A está errada: toracocenteses repetidas são aceitáveis só quando a sobrevida é muito curta, pois expõem a risco cumulativo de pneumotórax, infecção e perda de proteína e não resolvem a recorrência. A alternativa B está errada: o derrame não é infeccioso, e o antibiótico não o trata. A alternativa D está errada: a pleurectomia é muito mórbida e reservada a casos selecionados, com bom prognóstico e falha das outras medidas.",
  explicacoesAlternativas:{},
  referencias:"Feller-Kopman DJ et al. Management of Malignant Pleural Effusions: An Official ATS/STS/STR Clinical Practice Guideline (Am J Respir Crit Care Med 2018); Roberts ME et al. BTS Pleural Disease Guideline 2023 (Thorax 2023); Davies HE et al. Effect of an indwelling pleural catheter vs chest tube and talc pleurodesis (JAMA 2012). Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q6 da prova-unifesp-2026
{
  id:"q-adap26-006", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-cirtoracica", assuntoId:"ass-cirtorax-neoplasia",
  enunciado:"Paciente do sexo feminino, 64 anos, com carga tabágica de 40 anos-maço, apresenta nódulo periférico de 2,8 cm em lobo inferior direito. A punção guiada revelou adenocarcinoma. O mediastino não mostra linfonodos aumentados, a captação do PET-CT se restringe ao nódulo e a ressonância do encéfalo é normal. Provas funcionais: VEF1 de 88% e DLCO de 84% do previsto. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Quimioterapia neoadjuvante seguida de reavaliação, pois nódulos acima de 2 cm exigem tratamento sistêmico antes da cirurgia."},{id:"B",texto:"Radioterapia estereotáxica corporal, por ser equivalente à cirurgia mesmo em pacientes operáveis com boa reserva pulmonar."},{id:"C",texto:"Lobectomia com linfadenectomia mediastinal sistemática, por videotoracoscopia ou toracotomia."},{id:"D",texto:"Pneumonectomia direita, para garantir margens livres e reduzir o risco de recidiva local."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: nódulo de **2,8 cm** (acima de 2 e até 3 cm), sem linfonodos no PET-CT e sem doença à distância: estádio **IA3 (T1c N0 M0)** pela 9ª edição do TNM (vigente desde 2025; para este caso a classificação é a mesma da 8ª). A ressecção anatômica com linfadenectomia é o tratamento padrão do estádio inicial em pacientes operáveis. A reserva pulmonar é adequada: **VEF1 88%** e **DLCO 84%** estão acima de 80% e dispensam a estimativa da função pulmonar pós-operatória. A lobectomia é preferida à ressecção menor em nódulos acima de 2 cm. A alternativa A está errada: o tratamento neoadjuvante é indicado nos estádios IB a III selecionados, não no IA, que se trata só com cirurgia. A alternativa B está errada: a radioterapia estereotáxica é opção para quem recusa a cirurgia ou não tem condições clínicas de operar, e não é equivalente à cirurgia em paciente operável. A alternativa D está errada: a pneumonectomia é desnecessária em tumor periférico e aumenta a mortalidade perioperatória sem ganho oncológico.",
  explicacoesAlternativas:{},
  referencias:"Rami-Porta R et al. IASLC Staging Project, 9ª edição do TNM do pulmão (J Thorac Oncol 2024); NCCN Guidelines Non-Small Cell Lung Cancer (versão 2025); Diretrizes brasileiras de câncer de pulmão. Nível de confirmação: memória. A versão 1.2026 da NCCN para câncer de pulmão não pequenas células alinhou o estadiamento ao TNM 9ª edição da AJCC, segundo fonte secundária em 29/10/2026; o texto da NCCN e o da IASLC não foram abertos.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q7 da prova-unifesp-2026
{
  id:"q-adap26-007", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-orl", assuntoId:"ass-orl-fratura",
  enunciado:"Homem, 17 anos de idade, sofreu cotovelada na face durante uma partida de futebol há dois dias. Queixa de obstrução nasal total progressiva, dor e sensação de pressão no nariz. Exame físico: edema nasal discreto, desvio da pirâmide nasal e, à rinoscopia anterior, abaulamento azulado, flutuante e simétrico em ambos os lados do septo, que não diminui com vasoconstritor tópico. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Drenagem imediata do hematoma por incisão, com tampão nasal bilateral e antibioticoterapia profilática."},{id:"B",texto:"Aguardar a redução do edema por cinco a sete dias e então realizar redução fechada da fratura nasal."},{id:"C",texto:"Solicitar tomografia dos ossos da face e agendar a septoplastia para daqui a três meses."},{id:"D",texto:"Prescrever descongestionante tópico por cinco dias, analgesia e retorno ambulatorial em sete dias."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: trauma nasal com obstrução total e **abaulamento azulado, flutuante e bilateral do septo** que **não retrai com vasoconstritor** (o que distingue o hematoma da hipertrofia de mucosa): é o hematoma septal. É uma urgência, porque o sangue acumulado separa o pericôndrio da cartilagem, que depende dele para sua nutrição. A cartilagem pode necrosar em 24 a 72 horas, e a infecção causa abscesso septal, perda do suporte e deformidade em sela. A conduta é a drenagem imediata com incisão, tampão nasal bilateral (ou sutura de coaptação) para impedir novo acúmulo e antibiótico profilático. A alternativa B está errada: a redução da fratura pode aguardar o edema, mas o hematoma não, e a demora causa necrose da cartilagem. A alternativa C está errada: a tomografia não é necessária para o diagnóstico, que é clínico, e a septoplastia eletiva em três meses desconsidera a urgência. A alternativa D está errada: o descongestionante e o retorno em sete dias deixariam o hematoma sem tratamento.",
  explicacoesAlternativas:{},
  referencias:"Cummings Otolaryngology: Head and Neck Surgery, 7ª ed., capítulo de trauma nasal; Tratado de Otorrinolaringologia da ABORL-CCF, 3ª ed. Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q8 da prova-unifesp-2026
{
  id:"q-adap26-008", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-trauma", assuntoId:"ass-traumatorax",
  enunciado:"Homem, 28 anos de idade, vítima de ferimento por arma branca na região paraesternal esquerda, chega ao pronto-socorro com PA 70 x 40 mmHg, FC 132 bpm, FR 30 irpm, estase jugular e bulhas cardíacas hipofonéticas, mantendo-se hipotenso após 500 mL de cristaloide. O ultrassom à beira do leito (e-FAST) mostra líquido no espaço pericárdico e não mostra líquido livre no abdome. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Pericardiocentese com agulha, reposição de volume e observação em terapia intensiva."},{id:"B",texto:"Toracotomia ou esternotomia imediata em centro cirúrgico, com reparo da lesão cardíaca."},{id:"C",texto:"Drenagem torácica bilateral em selo d'água e nova avaliação com e-FAST em seis horas."},{id:"D",texto:"Tomografia computadorizada de tórax com contraste e, depois, decisão sobre abordagem cirúrgica."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **ferimento penetrante precordial**, hipotensão que não responde à reposição (**PA 70 x 40 mmHg**), **estase jugular**, **bulhas hipofonéticas** e líquido no pericárdio ao e-FAST: tamponamento cardíaco por lesão penetrante, com instabilidade hemodinâmica. A conduta é cirúrgica imediata (toracotomia anterolateral ou esternotomia) com abertura do pericárdio, controle do sangramento e reparo cardíaco. No trauma penetrante, a pericardiocentese não resolve, pois o sangue coagula e a lesão continua sangrando. A alternativa A está errada: a pericardiocentese é, no máximo, uma medida de transição para ganhar tempo, e observar em terapia intensiva um paciente instável é fatal. A alternativa C está errada: não há sinais de pneumotórax ou hemotórax que justifiquem a drenagem bilateral, e esperar seis horas é inaceitável. A alternativa D está errada: nenhum paciente hemodinamicamente instável deve ir para a tomografia, pois o atraso aumenta a mortalidade.",
  explicacoesAlternativas:{},
  referencias:"American College of Surgeons, ATLS 10ª ed. (2018; a 11ª edição, de 2025, existe e não teve o texto conferido; resumos de fontes secundárias em 29/10/2026 citam o controle da hemorragia exsanguinante antes da via aérea (xABCDE) e não a tabela de classes de hemorragia); Eastern Association for the Surgery of Trauma, diretriz de lesão cardíaca penetrante; Colégio Brasileiro de Cirurgiões, Atendimento ao politraumatizado (PHTLS/ATLS). Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q9 da prova-unifesp-2026
{
  id:"q-adap26-009", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-cirvascular", assuntoId:"ass-cirvasc-arterial",
  enunciado:"Homem, 70 anos de idade, diabético e tabagista, queixa-se de dor intensa no pé direito há 3 semanas, que o acorda à noite e melhora quando deixa a perna pendente fora da cama. Exame físico: pé frio e pálido, enchimento capilar lento, pulsos pedioso e tibial posterior ausentes, poplíteo diminuído e úlcera de 1,5 cm no hálux, sem sinais de infecção ou de necrose extensa. Índice tornozelo-braquial de 0,35 e pressão no hálux de 28 mmHg. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Tratamento clínico exclusivo, com cilostazol, exercício supervisionado e curativos, pois não há necrose extensa do pé."},{id:"B",texto:"Avaliação anatômica por imagem e revascularização do membro, endovascular ou aberta, associada ao tratamento clínico."},{id:"C",texto:"Amputação maior primária abaixo do joelho, pois a dor em repouso indica membro sem possibilidade de salvamento."},{id:"D",texto:"Simpatectomia lombar, que melhora a perfusão cutânea e alivia a dor isquêmica de repouso em pacientes diabéticos."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **dor isquêmica em repouso** (piora à noite e melhora com a perna pendente), **úlcera no hálux**, pulsos distais ausentes, **índice tornozelo-braquial de 0,35** (abaixo de 0,40) e **pressão no hálux de 28 mmHg** (abaixo de 30 mmHg): isquemia crônica ameaçadora do membro, com perda tecidual pequena (categoria 5 de Rutherford; a dor em repouso isolada seria a categoria 4 e a perda tecidual extensa, a 6). O membro é salvável, e o tratamento é a **revascularização**, endovascular ou cirúrgica, após angiotomografia ou angiografia para definir a anatomia, sempre com o melhor tratamento clínico (estatina, antiagregante, controle glicêmico, cessação do tabagismo) e cuidado da ferida. Sem revascularização, o risco de amputação em um ano é elevado. A alternativa A está errada: o cilostazol e o exercício servem à claudicação, e a isquemia crítica exige restaurar o fluxo. A alternativa C está errada: a amputação primária é para membro não salvável (necrose extensa, infecção sem controle ou paciente sem potencial funcional). A alternativa D está errada: a simpatectomia lombar não tem benefício comprovado nesse cenário.",
  explicacoesAlternativas:{},
  referencias:"Conte MS et al. Global Vascular Guidelines on the management of chronic limb-threatening ischemia (J Vasc Surg 2019); Gornik HL et al. 2024 ACC/AHA Guideline for the Management of Lower Extremity Peripheral Artery Disease (Circulation 2024); Rutherford RB et al. Recommended standards for reports dealing with lower extremity ischemia (J Vasc Surg 1997). Nível de confirmação: memória. A diretriz ACC/AHA de 2024 de doença arterial periférica de membros inferiores não apareceu na busca por título no PubMed em 29/10/2026; o texto não foi aberto.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q10 da prova-unifesp-2026
{
  id:"q-adap26-010", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-cirvascular", assuntoId:"ass-cirvasc-arterial",
  enunciado:"Homem, 71 anos de idade, tabagista, hipertenso, sem outros sintomas, realizou ultrassonografia de abdome para avaliar litíase biliar, que revelou aneurisma de aorta infrarrenal de 5,8 cm de diâmetro máximo. O exame físico mostra massa pulsátil no mesogástrio, indolor, sem sinais de instabilidade. Apresenta função renal normal e boa capacidade funcional. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Controle com ultrassonografia a cada seis meses e uso de betabloqueador, reservando a intervenção para o aparecimento de dor."},{id:"B",texto:"Controle anual com ultrassonografia, suspensão do tabagismo e controle da pressão arterial, sem indicação cirúrgica no momento."},{id:"C",texto:"Reparo eletivo do aneurisma, por técnica endovascular ou aberta, conforme a anatomia, após avaliação do risco cirúrgico."},{id:"D",texto:"Cirurgia de urgência no mesmo dia, pois o diâmetro acima de 5 cm indica ruptura iminente."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: aneurisma de aorta abdominal infrarrenal de **5,8 cm** em homem, assintomático e com boa capacidade funcional. O limite para indicar o reparo eletivo é diâmetro de **5,5 cm ou mais em homens** (**5,0 cm em mulheres**), pois o risco anual de ruptura passa a superar o risco operatório; também indicam reparo o crescimento acima de 1 cm por ano e os sintomas. A escolha entre a técnica endovascular (EVAR) e a aberta depende da anatomia do colo, dos vasos ilíacos e do risco cirúrgico do paciente. A alternativa A está errada: a vigilância semestral é para aneurismas menores que 5,5 cm, e esperar a dor significa esperar a ruptura. A alternativa B está errada: o seguimento sem cirurgia é feito para aneurismas menores que 5,5 cm; com 5,8 cm, o tamanho já exige o tratamento. A alternativa D está errada: o paciente está estável e assintomático, e a cirurgia eletiva planejada tem mortalidade menor do que a de urgência.",
  explicacoesAlternativas:{},
  referencias:"Wanhainen A et al. ESVS 2024 Clinical Practice Guidelines on the Management of Abdominal Aorto-iliac Artery Aneurysms (Eur J Vasc Endovasc Surg 2024); Chaikof EL et al. SVS 2018 Practice Guidelines on AAA (J Vasc Surg 2018). Nível de confirmação: citação da ESVS 2024 (Eur J Vasc Endovasc Surg 2024;67:192-331) confirmada no PubMed em 29/10/2026; limiares e intervalos de memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q11 da prova-unifesp-2026
{
  id:"q-adap26-011", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-abdagudo", assuntoId:"ass-apendicite",
  enunciado:"Homem, 35 anos de idade, apresenta dor em fossa ilíaca direita há 8 dias, febre diária e hiporexia. Exame físico: PA 118 x 74 mmHg, FC 96 bpm, T 38,4 °C, massa dolorosa e fixa em fossa ilíaca direita, sem sinais de peritonite generalizada. Laboratório: leucócitos 17.500/mm³ e PCR elevada. A tomografia de abdome mostra apêndice espessado com apendicolito e coleção periapendicular de 6 cm, bem delimitada, sem gás livre. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Drenagem percutânea da coleção guiada por imagem, associada a antibioticoterapia de amplo espectro por via intravenosa."},{id:"B",texto:"Apendicectomia aberta imediata com lavagem exaustiva da cavidade, por se tratar de apendicite com apendicolito."},{id:"C",texto:"Antibioticoterapia oral ambulatorial por sete dias, com retorno apenas se houver piora da dor."},{id:"D",texto:"Colonoscopia imediata para afastar neoplasia cecal e definir a abordagem de acordo com o achado."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **8 dias de evolução**, massa fixa e dolorosa, febre, leucocitose e **coleção periapendicular de 6 cm bem delimitada**, sem peritonite generalizada e sem instabilidade: apendicite complicada com abscesso. O tratamento inicial de abscesso apendicular acima de cerca de **3 a 4 cm** é a drenagem percutânea guiada por imagem com antibioticoterapia de amplo espectro, porque a operação precoce, em tecido inflamado e friável, tem mais complicações (lesão intestinal, fístula e ressecção ileocecal). A apendicectomia de intervalo, após 6 a 8 semanas, é discutida caso a caso, e a colonoscopia é recomendada em pacientes com mais de 40 a 50 anos, para excluir neoplasia. A alternativa B está errada: a operação imediata fica reservada a quem tem peritonite difusa, instabilidade ou falha da drenagem. A alternativa C está errada: coleção de 6 cm precisa de drenagem, e o antibiótico oral não é suficiente. A alternativa D está errada: a colonoscopia na fase aguda é arriscada e não trata a coleção.",
  explicacoesAlternativas:{},
  referencias:"Di Saverio S et al. WSES Jerusalem guidelines for diagnosis and treatment of acute appendicitis (World J Emerg Surg 2020); Colégio Brasileiro de Cirurgiões, apendicite aguda. Nível de confirmação: memória. A edição de 2025 da WSES Jerusalem para apendicite aguda existe (JAMA Surg, publicada online em 28/01/2026, doi 10.1001/jamasurg.2025.6218), segundo fonte secundária em 29/10/2026; a conduta no abscesso apendicular desta questão deve ser conferida nela.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q12 da prova-unifesp-2026
{
  id:"q-adap26-012", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-urologia", assuntoId:"ass-uro-prostata",
  enunciado:"Homem, 66 anos de idade, com sintomas urinários obstrutivos e noctúria quatro vezes por noite há cinco anos, mantém escore internacional de sintomas prostáticos de 24 pontos apesar de uso por dois anos de tamsulosina e finasterida. Apresentou dois episódios de retenção urinária aguda no último ano. Exames: PSA 2,2 ng/mL, creatinina 1,0 mg/dL, urofluxometria com fluxo máximo de 7 mL/s, ultrassonografia com próstata de 110 g e resíduo pós-miccional de 150 mL. Qual é o tratamento mais adequado?",
  alternativas:[{id:"A",texto:"Aumentar a dose de tamsulosina e associar anticolinérgico, por mais seis meses, para avaliar a resposta."},{id:"B",texto:"Ressecção transuretral da próstata, que é a técnica de escolha em qualquer volume prostático."},{id:"C",texto:"Prostatectomia radical, pelo risco de neoplasia oculta em próstata de grande volume e retenção."},{id:"D",texto:"Enucleação prostática com laser ou adenomectomia, pelo grande volume da próstata."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: hiperplasia prostática benigna **sintomática grave** (escore de **24 pontos**, entre 20 e 35), com **falha do tratamento clínico combinado** (alfabloqueador mais inibidor da 5-alfarredutase), **dois episódios de retenção urinária aguda**, fluxo máximo **7 mL/s** (abaixo de 10 mL/s sugere obstrução), resíduo de 150 mL e **volume de 110 g**. Há indicação cirúrgica absoluta (retenção recorrente, falha do tratamento clínico). Para próstatas maiores que **80 g**, as técnicas indicadas são a enucleação a laser (HoLEP ou ThuLEP) e a adenomectomia aberta ou robótica, pois a ressecção transuretral convencional leva a sangramento e maior tempo de operação nesses volumes. O PSA de 2,2 ng/mL não indica neoplasia. A alternativa A está errada: o tratamento clínico já falhou e a retenção recorrente é indicação de cirurgia. A alternativa B está errada: a ressecção transuretral é indicada para volumes de 30 a 80 g. A alternativa C está errada: não há suspeita de câncer, e a prostatectomia radical trata neoplasia, não hiperplasia.",
  explicacoesAlternativas:{},
  referencias:"EAU Guidelines on Non-neurogenic Male LUTS (2024); Sociedade Brasileira de Urologia, I Consenso Brasileiro de Hiperplasia Prostática Benigna. Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q13 da prova-unifesp-2026
{
  id:"q-adap26-013", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-cirurgiaonco", assuntoId:"ass-cacolorretal",
  enunciado:"Homem, 63 anos de idade, foi submetido a sigmoidectomia por adenocarcinoma moderadamente diferenciado, sem intercorrências. O laudo anatomopatológico mostra tumor que invade a subserosa sem atingir a serosa, 2 de 14 linfonodos regionais comprometidos, margens livres e sem invasão angiolinfática. A tomografia de tórax, abdome e pelve não mostra doença à distância, e o CEA pré-operatório era 8 ng/mL. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Seguimento clínico com CEA a cada três meses e colonoscopia em um ano, sem tratamento adjuvante."},{id:"B",texto:"Radioterapia pélvica adjuvante associada à capecitabina, por ser o tratamento do câncer de cólon sigmoide."},{id:"C",texto:"Quimioterapia adjuvante com esquema contendo oxaliplatina (FOLFOX ou CAPOX), por 3 a 6 meses."},{id:"D",texto:"Fluoropirimidina isolada por seis meses, pois a oxaliplatina só se justifica em doença metastática."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: tumor que invade a **subserosa** (pT3) e **2 linfonodos positivos de 14** (pN1b: dois a três linfonodos), sem metástases: estádio **IIIB** (T3 N1) pela 8ª edição do TNM (T1-2 com N1 é IIIA; T3 ou T4a com N1 é IIIB). Todo câncer de cólon estádio III tem indicação de quimioterapia adjuvante com **oxaliplatina** associada a fluoropirimidina: FOLFOX por 6 meses ou CAPOX por 3 a 6 meses (3 meses é suficiente em risco baixo, T1-3 N1). A alternativa A está errada: o seguimento sem tratamento é a conduta do estádio I e do estádio II sem fatores de risco, e aqui há linfonodos comprometidos. A alternativa B está errada: a radioterapia adjuvante é padrão do câncer de reto, não do cólon sigmoide intraperitoneal. A alternativa D está errada: a fluoropirimidina isolada fica reservada a quem não tolera oxaliplatina, pois o ganho de sobrevida do esquema combinado é demonstrado no estádio III.",
  explicacoesAlternativas:{},
  referencias:"NCCN Guidelines Colon Cancer (versão 2025); André T et al. Oxaliplatin, fluorouracil, and leucovorin as adjuvant treatment for colon cancer (N Engl J Med 2004); estudo IDEA (Grothey A et al., N Engl J Med 2018); AJCC 8ª ed. Nível de confirmação: memória. As diretrizes NCCN têm versões anuais ou mais frequentes e o texto não foi aberto; em 29/10/2026 só confirmei, por fonte secundária, a versão 1.2026 de câncer de pulmão não pequenas células alinhada ao TNM 9ª edição da AJCC, e que o estudo ATOMIC apoia imunoterapia mais cedo no câncer de cólon com instabilidade de microssatélites; as condutas desta questão devem ser conferidas na versão vigente.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q14 da prova-unifesp-2026
{
  id:"q-adap26-014", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-urologia", assuntoId:"ass-uro-litiase",
  enunciado:"Gestante, 24 anos de idade, com 22 semanas de gestação, G1P0, queixa-se de dor lombar à direita em cólica há 1 dia, com náuseas e sem febre. Exame físico: afebril, PA 110 x 70 mmHg, FC 88 bpm, dor à punho-percussão direita. A urina tipo 1 mostra hematúria sem leucocitúria. A ultrassonografia mostra hidronefrose moderada à direita e imagem hiperecogênica de 6 mm, com sombra acústica, no terço distal do ureter. A dor cedeu com analgésico, e a diurese é normal. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Ureterolitotripsia a laser imediata, pois cálculo ureteral com hidronefrose deve ser tratado na gestação."},{id:"B",texto:"Conduta conservadora com analgesia, hidratação e vigilância, reservando o duplo J para falha ou infecção."},{id:"C",texto:"Litotripsia extracorpórea por ondas de choque, que é segura em qualquer fase da gestação."},{id:"D",texto:"Tomografia de abdome sem contraste para confirmar o cálculo, pois o ultrassom é insuficiente para decidir."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: gestante com **22 semanas** e cólica renal, **cálculo de 6 mm** no ureter distal, **sem febre**, com **dor controlada** por analgésico e **diurese normal**. A hidronefrose leve a moderada é fisiológica na gestação (compressão pelo útero, mais à direita), e a maioria dos cálculos de ureter distal pequenos elimina-se espontaneamente (cerca de 70 a 80% nas gestantes). O tratamento inicial é conservador: analgesia (paracetamol e, se necessário, opioide por curto prazo; evitar anti-inflamatórios, sobretudo no terceiro trimestre), hidratação e vigilância com ultrassom, poupando o feto de radiação. Indicam descompressão (duplo J ou nefrostomia): infecção, dor refratária, rim único e piora da função renal. A ureteroscopia é opção de segunda linha. A alternativa A está errada: a intervenção imediata não é necessária sem complicação. A alternativa C está errada: a litotripsia extracorpórea é contraindicada na gestação. A alternativa D está errada: o ultrassom é o exame inicial, e a tomografia expõe o feto à radiação, sendo reservada a casos específicos.",
  explicacoesAlternativas:{},
  referencias:"EAU Guidelines on Urolithiasis (2024), seção de litíase na gestação; Semins MJ, Matlaga BR. Kidney stones during pregnancy (Nat Rev Urol 2014); Sociedade Brasileira de Urologia. Nível de confirmação: memória. A EAU publicou atualização limitada de urolitíase em 2025 e revisão completa em 2026 (cólica renal, terapia expulsiva, litotripsia e antitrombóticos), segundo o site da EAU em 29/10/2026; as condutas desta questão não foram conferidas nelas.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q15 da prova-unifesp-2026
{
  id:"q-adap26-015", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-abdagudo", assuntoId:"ass-hernias",
  enunciado:"Mulher, 66 anos de idade, queixa-se de abaulamento pequeno e levemente doloroso na região inguinal direita há 3 meses, que reduz com o decúbito. Exame físico: tumoração de 2 cm, redutível, abaixo e lateralmente ao tubérculo púbico, sem sinais inflamatórios. A ultrassonografia confirma hérnia com colo estreito. Não há outras comorbidades. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Conduta expectante, com orientação de sinais de alarme, como se faz na hérnia inguinal pouco sintomática do homem."},{id:"B",texto:"Uso de cinta herniária, pois o colo estreito torna improvável a complicação e a cirurgia pode ser evitada."},{id:"C",texto:"Hernioplastia eletiva, sem aguardar sintomas de complicação, pelo alto risco de encarceramento."},{id:"D",texto:"Reparo apenas se houver encarceramento, porque a cirurgia de urgência tem a mesma morbidade da eletiva."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: mulher, abaulamento **abaixo e lateral ao tubérculo púbico**, com **colo estreito**: hérnia femoral, e não inguinal. A hérnia femoral é a que tem maior risco de encarceramento e estrangulamento (boa parte dos casos se apresenta como urgência), pelo anel rígido e estreito, e a mortalidade da cirurgia de urgência é bem maior que a da eletiva. Por isso, mesmo assintomática, deve ser reparada de forma eletiva, com tela, por via aberta ou laparoscópica. A conduta expectante vale para hérnia inguinal do homem com poucos sintomas, e não para a femoral. A alternativa A está errada: aplicar a regra da hérnia inguinal masculina é o erro que o caso testa. A alternativa B está errada: a cinta não impede a complicação e não é recomendada. A alternativa D está errada: a morbidade da urgência é maior (necessidade de ressecção intestinal), e esperar a complicação eleva o risco.",
  explicacoesAlternativas:{},
  referencias:"HerniaSurge Group. International guidelines for groin hernia management (Hernia 2018); Colégio Brasileiro de Cirurgiões, hérnias da parede abdominal. Nível de confirmação: memória. O HerniaSurge atualizou a diretriz de hérnia inguinal em 2023 (BJS Open, PMC10588975; 39 novas afirmações e 32 recomendações, 16 fortes), substituindo a de 2018, segundo fonte secundária em 29/10/2026; o texto da atualização não foi conferido contra a conduta desta questão.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q16 da prova-unifesp-2026
{
  id:"q-adap26-016", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-cirtoracica", assuntoId:"ass-cirtorax-esofago",
  enunciado:"Mulher, 38 anos de idade, apresenta há 2 anos disfagia para sólidos e, mais recentemente, para líquidos, com regurgitação de alimento não digerido e perda de 8 kg. A endoscopia digestiva alta mostra esôfago dilatado com resíduo alimentar, sem lesões obstrutivas ou tumorais, e discreta resistência à passagem do aparelho pela cárdia. O esofagograma baritado mostra dilatação do esôfago com retenção do contraste. Qual é o exame que confirma o diagnóstico?",
  alternativas:[{id:"A",texto:"pHmetria esofágica de 24 horas com impedanciometria, para pesquisar refluxo gastroesofágico."},{id:"B",texto:"Tomografia computadorizada de tórax e abdome, para pesquisar massa extrínseca na transição esofagogástrica."},{id:"C",texto:"Manometria esofágica de alta resolução, que confirma o distúrbio motor e define o subtipo da doença."},{id:"D",texto:"Ultrassonografia endoscópica da parede esofágica, para avaliar a camada muscular e linfonodos regionais."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **disfagia para sólidos e líquidos** (apontando para distúrbio motor), regurgitação, **perda de 8 kg**, esôfago dilatado com resíduo e **resistência à passagem pela cárdia** sem lesão orgânica: suspeita de acalasia. O exame que confirma o diagnóstico e classifica o tipo pelos critérios de Chicago é a manometria de alta resolução, que mostra **pressão de relaxamento integrada do esfíncter inferior elevada** (acima de 15 mmHg) e ausência de peristalse. O tipo orienta o tratamento (dilatação pneumática, miotomia de Heller ou miotomia endoscópica peroral). A alternativa A está errada: a pHmetria avalia refluxo, que não é a hipótese, e é pedida na acalasia apenas para avaliar refluxo no pós-operatório. A alternativa B está errada: a tomografia não confirma o distúrbio motor; é usada quando se suspeita de pseudoacalasia por neoplasia, já afastada na endoscopia. A alternativa D está errada: a ultrassonografia endoscópica faz parte da investigação da pseudoacalasia, não confirma o diagnóstico de acalasia.",
  explicacoesAlternativas:{},
  referencias:"Yadlapati R et al. Esophageal motility disorders on high-resolution manometry: Chicago Classification v4.0 (Neurogastroenterol Motil 2021); Vaezi MF et al. ACG Clinical Guidelines: diagnosis and management of achalasia (Am J Gastroenterol 2020). Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q17 da prova-unifesp-2026
{
  id:"q-adap26-017", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-cirurgiaonco", assuntoId:"ass-cacolorretal",
  enunciado:"Homem, 58 anos de idade, apresenta adenocarcinoma de reto médio, a 6 cm da borda anal. A ressonância magnética da pelve mostra tumor que atravessa a muscular própria, com 3 linfonodos mesorretais suspeitos e fáscia mesorretal comprometida (distância do tumor à fáscia de 1 mm). A tomografia de tórax e abdome não mostra metástases. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Neoadjuvância com radioquimioterapia (ou terapia neoadjuvante total) seguida de excisão total do mesorreto."},{id:"B",texto:"Retossigmoidectomia com excisão total do mesorreto imediata, reservando a quimioterapia para depois da cirurgia."},{id:"C",texto:"Amputação abdominoperineal imediata, pois o tumor está a menos de 8 cm da borda anal."},{id:"D",texto:"Excisão local transanal do tumor, seguida de radioterapia adjuvante, para preservar o esfíncter."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: tumor de reto médio com invasão além da muscular própria (**cT3**), **3 linfonodos suspeitos** (cN1b: dois a três linfonodos) e **fáscia mesorretal comprometida (1 mm ou menos)**, o que define doença localmente avançada e alto risco de margem circunferencial positiva. A conduta é a neoadjuvância (radioquimioterapia ou radioterapia de curso curto, e hoje, de preferência, a terapia neoadjuvante total, que acrescenta quimioterapia antes da cirurgia), seguida de excisão total do mesorreto. Isso reduz a recidiva local e permite reduzir o estádio do tumor. A alternativa B está errada: operar primeiro, com a fáscia ameaçada, aumenta a chance de margem comprometida. A alternativa C está errada: a amputação é indicada quando o esfíncter está invadido, e não pela distância de 6 cm (a distância sozinha não a justifica). A alternativa D está errada: a excisão local serve só para tumores T1 selecionados, sem linfonodos suspeitos.",
  explicacoesAlternativas:{},
  referencias:"NCCN Guidelines Rectal Cancer (versão 2025); Bahadoer RR et al. Short-course radiotherapy followed by chemotherapy before TME (RAPIDO), Lancet Oncol 2021; Conroy T et al. PRODIGE 23, Lancet Oncol 2021; Sociedade Brasileira de Coloproctologia. Nível de confirmação: memória. As diretrizes NCCN têm versões anuais ou mais frequentes e o texto não foi aberto; em 29/10/2026 só confirmei, por fonte secundária, a versão 1.2026 de câncer de pulmão não pequenas células alinhada ao TNM 9ª edição da AJCC, e que o estudo ATOMIC apoia imunoterapia mais cedo no câncer de cólon com instabilidade de microssatélites; as condutas desta questão devem ser conferidas na versão vigente.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q18 da prova-unifesp-2026
{
  id:"q-adap26-018", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-cirvascular", assuntoId:"ass-cirvasc-disseccao",
  enunciado:"Homem, 58 anos de idade, hipertenso sem tratamento regular, chega ao pronto-socorro com dor torácica de início súbito, lancinante, irradiada para o dorso. Exame físico: PA 190 x 100 mmHg no braço direito e 150 x 80 mmHg no esquerdo, FC 108 bpm, sopro diastólico em foco aórtico. A angiotomografia mostra dissecção que se inicia na raiz da aorta e se estende até as artérias ilíacas, com pequeno derrame pericárdico. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Tratamento clínico em unidade de terapia intensiva, com controle da pressão arterial e analgesia, sem indicação de cirurgia."},{id:"B",texto:"Controle da frequência cardíaca e da pressão arterial com betabloqueador venoso, seguido de cirurgia de emergência."},{id:"C",texto:"Colocação de endoprótese na aorta torácica descendente por via endovascular, sem abertura do tórax."},{id:"D",texto:"Anticoagulação plena com heparina, para prevenir a propagação do trombo na falsa luz da aorta."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: dissecção que envolve a **raiz e a aorta ascendente** (Stanford tipo A, DeBakey I), **diferença de pressão entre os braços**, **sopro diastólico** (insuficiência aórtica) e **derrame pericárdico** (risco de tamponamento). A mortalidade sem operação chega a 1 a 2% por hora nas primeiras 48 horas, então a dissecção tipo A é emergência cirúrgica. Enquanto o paciente é levado ao centro cirúrgico, controla-se a dor, a **frequência cardíaca (meta abaixo de 60 bpm)** e a **pressão sistólica (100 a 120 mmHg)** com betabloqueador venoso (esmolol ou labetalol), associando vasodilatador apenas depois do betabloqueio. A alternativa A está errada: o tratamento clínico isolado é o da dissecção tipo B não complicada. A alternativa C está errada: a endoprótese descendente não trata a lesão da raiz e da aorta ascendente. A alternativa D está errada: a anticoagulação é contraindicada, pois aumenta o sangramento para o pericárdio e a falsa luz.",
  explicacoesAlternativas:{},
  referencias:"Isselbacher EM et al. 2022 ACC/AHA Guideline for the Diagnosis and Management of Aortic Disease (Circulation 2022); Erbel R et al. ESC Guidelines on aortic diseases (Eur Heart J 2014); Mazzolai L et al. 2024 ESC Guidelines for the management of peripheral arterial and aortic diseases (Eur Heart J 2024). Nível de confirmação: memória. A diretriz ESC 2024 de doença arterial periférica e aórtica está publicada (Eur Heart J 2024;45, doi 10.1093/eurheartj/ehae179), confirmada em resumos em 29/10/2026.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q19 da prova-unifesp-2026
{
  id:"q-adap26-019", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-ortopedia", assuntoId:"ass-orto-fraturas",
  enunciado:"Homem, 34 anos de idade, vítima de queda de motocicleta, chega ao pronto atendimento 1 hora depois do acidente com deformidade da perna esquerda e osso exposto em ferida de 12 cm na face anteromedial, contaminada com terra e com lesão extensa de partes moles. Está estável, a perfusão distal é normal e o pulso pedioso está presente. Radiografia: fratura cominutiva da diáfise da tíbia e da fíbula. Qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Antibioticoterapia venosa imediata, profilaxia antitetânica, desbridamento cirúrgico precoce e estabilização do foco da fratura."},{id:"B",texto:"Lavagem da ferida no pronto atendimento, fechamento primário da pele e imobilização gessada, com antibiótico por via oral."},{id:"C",texto:"Imobilização gessada, antibiótico oral e programação da cirurgia eletiva para fixação definitiva após a cicatrização."},{id:"D",texto:"Fixação definitiva com haste intramedular fresada após fechamento primário da ferida, sem desbridamento prévio."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: osso exposto, ferida de **12 cm** (acima de 10 cm) com **lesão extensa de partes moles** e contaminação: fratura exposta de **Gustilo-Anderson tipo III** (tipo I: ferida até 1 cm, limpa; tipo II: 1 a 10 cm, sem lesão extensa; tipo III: mais de 10 cm, lesão extensa ou contaminação grosseira; IIIA com cobertura óssea possível, IIIB com perda de cobertura e IIIC com lesão arterial que exige reparo). Fratura exposta é urgência: antibiótico venoso o mais cedo possível, em até **1 hora**, com cefalosporina de primeira geração associada a aminoglicosídeo no tipo III, profilaxia antitetânica, desbridamento e irrigação cirúrgicos e estabilização (fixador externo ou haste, conforme o caso). A alternativa B está errada: fechar primariamente uma ferida contaminada favorece infecção, e antibiótico oral é insuficiente. A alternativa C está errada: adiar a cirurgia e usar apenas gesso aumenta o risco de infecção e osteomielite. A alternativa D está errada: não se fixa definitivamente nem se fecha a ferida sem o desbridamento prévio.",
  explicacoesAlternativas:{},
  referencias:"Gustilo RB, Anderson JT. Prevention of infection in the treatment of 1025 open fractures (J Bone Joint Surg Am 1976); Gustilo RB et al., revisão da classificação (J Trauma 1984); ATLS 10ª ed. (2018; a 11ª edição, de 2025, existe e não teve o texto conferido; resumos de fontes secundárias em 29/10/2026 citam o controle da hemorragia exsanguinante antes da via aérea (xABCDE) e não a tabela de classes de hemorragia); Sociedade Brasileira de Ortopedia e Traumatologia. Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q20 da prova-unifesp-2026
{
  id:"q-adap26-020", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-ortopedia", assuntoId:"ass-orto-fraturas",
  enunciado:"Menino, 6 anos de idade, caiu de um escorregador com o braço direito em extensão e apresenta dor intensa e deformidade no cotovelo. Exame físico: edema importante, pulso radial presente, boa perfusão distal, sensibilidade e movimento dos dedos preservados. Radiografia do cotovelo: fratura supracondiliana do úmero com desvio total, sem contato entre os fragmentos, com a cortical posterior rompida. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Imobilização braquiopalmar com gesso, sem redução, por se tratar de fratura em criança com potencial de remodelação."},{id:"B",texto:"Tração cutânea por duas semanas e imobilização gessada por mais quatro, sem tentativa de redução."},{id:"C",texto:"Redução aberta com placa e parafusos, que é o método de escolha para fraturas supracondilianas em crianças."},{id:"D",texto:"Redução fechada sob anestesia com fixação percutânea por fios de Kirschner, em caráter de urgência."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: fratura **supracondiliana do úmero** em criança de 6 anos, causada por queda com o membro em extensão, com **desvio total e sem contato entre fragmentos**: Gartland tipo III (tipo I: sem desvio; tipo II: desvio com cortical posterior íntegra; tipo III: desvio total). O pulso e a perfusão estão preservados, sem lesão neurovascular. O tratamento do tipo III é cirúrgico: redução fechada sob anestesia e fixação percutânea com **fios de Kirschner**, em urgência (imediata se houver comprometimento vascular, e em geral dentro de 24 horas nos demais). Os tipos I e muitos tipos II estáveis podem ser tratados com gesso. A alternativa A está errada: o gesso sem redução é para o tipo I, e o desvio total consolidaria em má posição (varo em coronal, cúbito varo). A alternativa B está errada: a tração prolongada foi superada pela fixação percutânea. A alternativa C está errada: a redução aberta com osteossíntese rígida é reservada a casos irredutíveis ou com lesão vascular, e placas não são o método habitual nesta fratura.",
  explicacoesAlternativas:{},
  referencias:"Gartland JJ. Management of supracondylar fractures of the humerus in children (Surg Gynecol Obstet 1959); AAOS Clinical Practice Guideline: Management of pediatric supracondylar humerus fractures (2011); Sociedade Brasileira de Ortopedia Pediátrica. Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q21 da prova-unifesp-2026
{
  id:"q-adap26-021", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-ortopedia", assuntoId:"ass-orto-ombro",
  enunciado:"Homem, 24 anos de idade, jogador de handebol, sofreu queda sobre o braço em abdução e rotação externa e chegou ao pronto atendimento com o membro superior esquerdo apoiado pela mão contralateral, ombro com aspecto «quadrado» e incapacidade de rotação interna. A radiografia em incidência de perfil escapular confirma luxação anterior glenoumeral. Antes e depois da manobra de redução, qual nervo deve ser avaliado com prioridade e como?",
  alternativas:[{id:"A",texto:"Nervo radial, pela extensão ativa do punho e pela sensibilidade do dorso da mão."},{id:"B",texto:"Nervo musculocutâneo, pela flexão do cotovelo e pela sensibilidade do antebraço lateral."},{id:"C",texto:"Nervo mediano, pela oposição do polegar e pela sensibilidade da polpa do indicador."},{id:"D",texto:"Nervo axilar, pela contração do deltoide e pela sensibilidade da face lateral do ombro."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: trauma em **abdução e rotação externa**, ombro de aspecto **quadrado** e luxação **anterior** da cabeça umeral. É o mecanismo clássico de luxação anterior, que ocorre em mais de 95% das luxações do ombro. O nervo mais lesado nesse quadro é o **axilar**, que contorna o colo cirúrgico do úmero e é tracionado pela cabeça luxada; a lesão é, em geral, uma neuropraxia. Avalia-se a **sensibilidade da face lateral do ombro** (região do «regimental badge»), que é o dado mais confiável, porque a contração do deltoide pode estar prejudicada pela dor. A avaliação deve ser registrada antes e depois da redução, pois a manobra pode causar lesão e a documentação protege o paciente. A alternativa A está errada: o nervo radial é lesado nas fraturas da diáfise do úmero. A alternativa B está errada: o musculocutâneo é lesado com menor frequência, em luxações anteriores com grande deslocamento. A alternativa C está errada: o mediano é lesado em fraturas supracondilianas e traumas do punho, não na luxação do ombro.",
  explicacoesAlternativas:{},
  referencias:"Rockwood and Matsen's The Shoulder, 5ª ed.; Visser CP et al. Nerve lesions in proximal humeral fractures and shoulder dislocations (J Shoulder Elbow Surg 1999); Sociedade Brasileira de Cirurgia de Ombro e Cotovelo. Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q22 da prova-unifesp-2026
{
  id:"q-adap26-022", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-gastro", assuntoId:"ass-deficvitaminica",
  enunciado:"Homem, 71 anos de idade, viúvo, vive sozinho e se alimenta de pão, café e alimentos enlatados havia cerca de quatro meses, sem consumir frutas ou verduras. Queixa-se de fraqueza, dor nas pernas, sangramento gengival e queda de dois dentes. Exame físico: gengivas edemaciadas e sangrantes, petéquias ao redor de folículos pilosos nas pernas, pelos enrolados em forma de saca-rolhas e equimoses extensas. Plaquetas 280.000/mm³, TP e TTPa normais e hemoglobina de 9,6 g/dL. Qual é a deficiência mais provável?",
  alternativas:[{id:"A",texto:"Vitamina K, pela síntese insuficiente dos fatores de coagulação dependentes dessa vitamina."},{id:"B",texto:"Vitamina B12, pela síntese comprometida de DNA nos precursores das células sanguíneas."},{id:"C",texto:"Vitamina D, pela mineralização inadequada do osso e do tecido dentário."},{id:"D",texto:"Vitamina C, pela falha na hidroxilação do colágeno e a consequente fragilidade capilar."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: dieta sem frutas ou verduras por **meses**, sangramento e edema gengival, **petéquias perifoliculares**, **pelos em saca-rolhas**, equimoses e perda de dentes, com **plaquetas e coagulograma normais**: escorbuto. A vitamina C é cofator da prolil e da lisil hidroxilase na síntese de colágeno; sem ela, o colágeno é instável, os capilares ficam frágeis e há sangramento perifolicular e gengival, cicatrização ruim e anemia (por sangramento e prejuízo da absorção de ferro). As reservas corporais se esgotam em cerca de **1 a 3 meses** sem ingestão, e o quadro clínico surge com vitamina C plasmática muito baixa (abaixo de cerca de 0,2 mg/dL). O tratamento é a reposição de vitamina C e a correção da dieta. A alternativa A está errada: a deficiência de vitamina K prolonga o TP e causa sangramento sem petéquias perifoliculares. A alternativa B está errada: a deficiência de B12 causa anemia megaloblástica e neuropatia, não sangramento gengival. A alternativa C está errada: a deficiência de vitamina D causa osteomalácia, dor óssea e fraqueza proximal, sem os achados cutâneos e gengivais.",
  explicacoesAlternativas:{},
  referencias:"Hirschmann JV, Raugi GJ. Adult scurvy (J Am Acad Dermatol 1999); Harrison's Principles of Internal Medicine, 21ª ed., capítulo de deficiências vitamínicas; Institute of Medicine, Dietary Reference Intakes for Vitamin C (2000). Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q23 da prova-unifesp-2026
{
  id:"q-adap26-023", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-cardio", assuntoId:"ass-valvopatias",
  enunciado:"Homem, 78 anos de idade, relata há 8 meses dispneia aos esforços moderados, dois episódios de síncope ao subir ladeira e dor torácica ao caminhar rápido. Exame físico: pulso parvus et tardus, B2 hipofonética em foco aórtico e sopro sistólico ejetivo rude, em crescendo-decrescendo, irradiado para as carótidas. O ecocardiograma mostra velocidade máxima do jato aórtico de 4,6 m/s, gradiente médio de 48 mmHg, área valvar de 0,7 cm² e fração de ejeção de 58%. A coronariografia não mostra lesões. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Tratamento clínico com diurético e vasodilatador, reservando a intervenção para a queda da fração de ejeção."},{id:"B",texto:"Valvoplastia aórtica por balão como tratamento definitivo, pela calcificação difusa da valva do idoso."},{id:"C",texto:"Seguimento clínico com ecocardiograma anual, pois a fração de ejeção está preservada."},{id:"D",texto:"Troca valvar aórtica, por via cirúrgica ou transcateter, conforme o risco operatório."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **síncope**, **angina** e dispneia (tríade clássica da estenose aórtica sintomática), sopro ejetivo com irradiação para carótidas e pulso parvus et tardus, com **velocidade máxima de 4,6 m/s** (maior ou igual a 4 m/s), **gradiente médio de 48 mmHg** (maior ou igual a 40 mmHg) e **área valvar de 0,7 cm²** (menor ou igual a 1,0 cm²): estenose aórtica **grave** e **sintomática**. Em estenose aórtica grave sintomática há indicação de troca valvar, independentemente da fração de ejeção, pois a sobrevida sem intervenção, após o início dos sintomas, é de 2 a 3 anos. A escolha entre a cirurgia e o implante transcateter (TAVI) depende da idade, do risco (escores STS e EuroSCORE II) e da anatomia; a diretriz ESC/EACTS de 2025 recomenda o TAVI a partir dos 70 anos na estenose aórtica com valva tricúspide (antes o corte era 75 anos), desde que a anatomia e o acesso transfemoral sejam adequados. A alternativa A está errada: o tratamento clínico não muda a história natural e vasodilatadores podem causar hipotensão. A alternativa B está errada: a valvoplastia por balão tem reestenose precoce na estenose calcificada do idoso e serve apenas como ponte. A alternativa C está errada: o paciente tem sintomas, e esperar a queda da fração de ejeção piora o prognóstico.",
  explicacoesAlternativas:{},
  referencias:"Otto CM et al. 2020 ACC/AHA Guideline for the Management of Patients With Valvular Heart Disease (Circulation 2021); Praz F et al. 2025 ESC/EACTS Guidelines for the management of valvular heart disease (Eur Heart J 2025); Vahanian A et al. 2021 ESC/EACTS Guidelines (Eur Heart J 2022); Diretriz Brasileira de Valvopatias, SBC 2020. Nível de confirmação: memória. A diretriz ESC/EACTS 2025 (Praz F et al., Eur Heart J 2025, doi 10.1093/eurheartj/ehaf194) baixou o corte de idade do TAVI de 75 para 70 anos na estenose aórtica com valva tricúspide e via transfemoral viável, segundo fontes secundárias em 29/10/2026; o texto integral não foi aberto.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q24 da prova-unifesp-2026
{
  id:"q-adap26-024", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-cardio", assuntoId:"ass-ic",
  enunciado:"Homem, 60 anos de idade, com insuficiência cardíaca de etiologia isquêmica e fração de ejeção de 30%, em classe funcional II da NYHA, usa carvedilol, sacubitril-valsartana, espironolactona e furosemida em doses otimizadas. Não tem diabetes. Exame: PA 112 x 70 mmHg, FC 64 bpm em ritmo sinusal, sem congestão. Exames: potássio 4,6 mEq/L, creatinina 1,1 mg/dL e TFGe de 72 mL/min/1,73 m². Qual medicamento deve ser acrescentado para reduzir mortalidade e hospitalizações?",
  alternativas:[{id:"A",texto:"Digoxina, pois a fração de ejeção está reduzida mesmo com o uso das medicações de primeira linha."},{id:"B",texto:"Dapagliflozina ou empagliflozina, pois o benefício na insuficiência cardíaca independe do diabetes."},{id:"C",texto:"Ivabradina, para reduzir a frequência cardíaca e melhorar o prognóstico do paciente em ritmo sinusal."},{id:"D",texto:"Anlodipino, para reduzir a pós-carga e aumentar o débito cardíaco do paciente com pressão arterial limítrofe."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: insuficiência cardíaca com fração de ejeção reduzida (**30%**, abaixo de 40%) em uso de três dos quatro pilares do tratamento (betabloqueador, inibidor da neprilisina e do receptor da angiotensina, antagonista mineralocorticoide); falta o **inibidor do SGLT2**. A dapagliflozina (DAPA-HF) e a empagliflozina (EMPEROR-Reduced) reduziram em cerca de 25% o desfecho composto de morte cardiovascular e hospitalização por insuficiência cardíaca, **com ou sem diabetes**, e podem ser usadas com TFGe a partir de 20 a 25 mL/min/1,73 m². A alternativa A está errada: a digoxina reduz hospitalizações, mas não mortalidade, e fica para quem persiste sintomático com o tratamento otimizado. A alternativa C está errada: a ivabradina só se justifica com ritmo sinusal e frequência cardíaca de **70 bpm ou mais** na dose máxima tolerada de betabloqueador, e aqui a FC é 64 bpm. A alternativa D está errada: o anlodipino não tem benefício prognóstico na insuficiência cardíaca com fração reduzida, e os bloqueadores de canal de cálcio di-hidropiridínicos são neutros.",
  explicacoesAlternativas:{},
  referencias:"McDonagh TA et al. 2023 Focused Update of the 2021 ESC Guidelines for heart failure (Eur Heart J 2023); Heidenreich PA et al. 2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure (Circulation 2022); McMurray JJV et al. DAPA-HF (N Engl J Med 2019); Packer M et al. EMPEROR-Reduced (N Engl J Med 2020). Nível de confirmação: memória. A diretriz ESC de insuficiência cardíaca de 2026 existe (Eur Heart J, ESC Congress 2026) e, segundo resumos de fontes secundárias em 29/10/2026, passa a reconhecer só dois fenótipos, FEVE abaixo de 50% e a partir de 50%; a classificação e as metas desta explicação devem ser conferidas nela.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q25 da prova-unifesp-2026
{
  id:"q-adap26-025", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-endocrino", assuntoId:"ass-paratireoide",
  enunciado:"Mulher, 62 anos de idade, na pós-menopausa, assintomática, apresentou cálcio total de 10,8 mg/dL em exame de rotina. Exames complementares: PTH 98 pg/mL, fósforo 2,6 mg/dL, 25-hidroxivitamina D 34 ng/mL e TFGe de 82 mL/min/1,73 m². A ultrassonografia de rins e vias urinárias é normal. A densitometria óssea mostra escore T de -2,8 no terço distal do rádio e de -1,6 na coluna. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Paratireoidectomia, pela indicação cirúrgica do hiperparatireoidismo primário por comprometimento ósseo."},{id:"B",texto:"Alendronato de sódio e vigilância semestral, pois a hipercalcemia leve dispensa a cirurgia no momento."},{id:"C",texto:"Cinacalcete para normalizar o cálcio, com reavaliação anual, mantendo o tratamento clínico exclusivo."},{id:"D",texto:"Terapia de reposição hormonal, por reduzir o PTH e o cálcio ao mesmo tempo no hiperparatireoidismo."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **cálcio de 10,8 mg/dL** com **PTH elevado de 98 pg/mL** e vitamina D normal (hiperparatireoidismo primário), assintomática, com **escore T de -2,8 no rádio distal**. Pelos critérios do Quinto Workshop Internacional (2022), a paratireoidectomia é indicada, mesmo no hiperparatireoidismo assintomático, quando há: cálcio 1 mg/dL ou mais acima do limite superior, **escore T de -2,5 ou menor em qualquer sítio (coluna, quadril ou terço distal do rádio)** ou fratura por fragilidade, TFGe menor que 60 mL/min, nefrolitíase ou nefrocalcinose, ou idade menor que 50 anos. Aqui o cálcio está 0,6 mg/dL acima do limite, mas o comprometimento do **rádio** já define a indicação. A alternativa B está errada: o bisfosfonato protege o osso, mas não trata a doença, e deixa de lado a indicação cirúrgica. A alternativa C está errada: o cinacalcete normaliza o cálcio, mas não melhora a densidade óssea, e é reservado a quem não pode operar. A alternativa D está errada: a reposição hormonal não tem indicação aqui e não substitui o tratamento.",
  explicacoesAlternativas:{},
  referencias:"Bilezikian JP et al. Evaluation and management of primary hyperparathyroidism: summary statement and guidelines from the Fifth International Workshop (J Bone Miner Res 2022); Wilhelm SM et al. AAES Guidelines for definitive management of primary hyperparathyroidism (JAMA Surg 2016). Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q26 da prova-unifesp-2026
{
  id:"q-adap26-026", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-abdagudo", assuntoId:"ass-cirbariatrica",
  enunciado:"Mulher, 41 anos de idade, submetida há 2 anos a bypass gástrico em Y de Roux, com perda de 38 kg, queixa-se de episódios de tremor, sudorese fria, confusão e fraqueza que ocorrem de uma a três horas após as refeições, principalmente quando come massas e doces, e melhoram com a ingestão de açúcar. Em um desses episódios, a glicemia capilar era de 42 mg/dL. Não usa medicamentos. A glicemia de jejum e a hemoglobina glicada são normais. Qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Reversão do bypass gástrico, pois o quadro caracteriza uma complicação irreversível da técnica."},{id:"B",texto:"Octreotida de ação prolongada, por reduzir a secreção de insulina e a liberação de hormônios intestinais."},{id:"C",texto:"Diazóxido por via oral, para inibir a liberação de insulina pelas células beta pancreáticas."},{id:"D",texto:"Modificação alimentar com refeições fracionadas, pobres em carboidratos de alto índice glicêmico e com proteína."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: sintomas neuroglicopênicos e adrenérgicos **1 a 3 horas depois das refeições**, em paciente com bypass gástrico há **2 anos**, com **glicemia de 42 mg/dL** (abaixo de 54 mg/dL), que melhora com açúcar e com glicemia de jejum normal. Cumpre a tríade de Whipple. É a hipoglicemia pós-prandial tardia pós-bariátrica, pelo esvaziamento rápido do alimento e pelo excesso de GLP-1 e de insulina. Difere do dumping precoce, que ocorre até 30 minutos depois da refeição e causa sintomas gastrointestinais e vasomotores por distensão do intestino delgado. O tratamento começa com **dieta**: seis refeições pequenas, com baixa carga glicêmica, proteína e fibras, evitando líquidos junto das refeições. Se persistir, usa-se acarbose, depois diazóxido ou octreotida; a revisão cirúrgica é reservada para casos refratários. A alternativa A está errada: a reversão é o último recurso. A alternativa B está errada: a octreotida é de terceira linha e tem efeitos adversos. A alternativa C está errada: o diazóxido é usado após falha da dieta e da acarbose.",
  explicacoesAlternativas:{},
  referencias:"Salehi M et al. Hypoglycemia after gastric bypass surgery: current concepts and controversies (J Clin Endocrinol Metab 2018); Sociedade Brasileira de Cirurgia Bariátrica e Metabólica. Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q27 da prova-unifesp-2026
{
  id:"q-adap26-027", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-pneumo", assuntoId:"ass-vm",
  enunciado:"Homem, 62 anos de idade, em ventilação mecânica há 5 dias por pneumonia grave, apresenta melhora clínica. Está acordado, sem sedação, obedece comandos e tosse com força ao aspirar, com secreção em pequena quantidade. Parâmetros: PEEP 5 cmH2O, FiO2 0,35, SpO2 97%, PaO2/FiO2 de 280, PA 124 x 76 mmHg, FC 82 bpm, sem vasopressor e sem febre. Na pressão de suporte de 7 cmH2O, a FR é de 22 irpm e o volume corrente de 400 mL. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Extubação imediata sem teste de respiração espontânea, por preencher todos os critérios clínicos."},{id:"B",texto:"Teste de respiração espontânea de 30 a 120 minutos e extubação se for bem tolerado."},{id:"C",texto:"Redução progressiva da frequência respiratória em SIMV por 24 horas antes de qualquer teste."},{id:"D",texto:"Traqueostomia imediata, pelo tempo de ventilação superior a 72 horas desde a intubação."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: causa da falência respiratória em resolução, **PaO2/FiO2 de 280** (acima de 150 a 200) com **PEEP de 5 cmH2O** (até 8) e **FiO2 de 0,35** (até 0,5), estável sem vasopressor, acordado e com tosse eficaz: critérios de prontidão para o desmame preenchidos. O índice de respiração rápida superficial (FR dividida pelo volume corrente em litros) é 22 / 0,4 = **55 respirações/min/L**, abaixo de 105, o que prediz sucesso. O próximo passo é o **teste de respiração espontânea** (30 a 120 minutos, com tubo T ou pressão de suporte baixa, de 5 a 8 cmH2O), e a extubação é feita se não houver sinais de intolerância (FR acima de 35 irpm, SpO2 abaixo de 90%, FC acima de 140 bpm, PAS fora de 90 a 180 mmHg, agitação ou sudorese). A alternativa A está errada: extubar sem teste aumenta o risco de reintubação, pois os critérios só indicam prontidão. A alternativa C está errada: o desmame gradual em SIMV prolonga a ventilação e é inferior ao teste diário. A alternativa D está errada: a traqueostomia é considerada em previsão de ventilação prolongada, o que não é o caso.",
  explicacoesAlternativas:{},
  referencias:"Schmidt GA et al. Liberation from mechanical ventilation in critically ill adults: ATS/ACCP Clinical Practice Guideline (Am J Respir Crit Care Med 2017); Diretrizes Brasileiras de Ventilação Mecânica, AMIB/SBPT 2013; Yang KL, Tobin MJ. A prospective study of indexes predicting the outcome of trials of weaning (N Engl J Med 1991). Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q28 da prova-unifesp-2026
{
  id:"q-adap26-028", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-cardio", assuntoId:"ass-ic",
  enunciado:"Homem, 59 anos de idade, portador de miocardiopatia dilatada (fração de ejeção de 20%), dá entrada na emergência com cansaço crescente há 5 dias. Pressão de 82 x 58 mmHg, taquicardia (104 bpm), taquipneia, pele fria e úmida, enchimento capilar de 5 segundos, veias do pescoço distendidas, crepitações até o terço médio dos pulmões e edema nas pernas. Lactato de 3,8 mmol/L e creatinina de 2,1 mg/dL (habitual de 1,2). Qual é o tratamento mais adequado?",
  alternativas:[{id:"A",texto:"Dobutamina intravenosa associada a diurético de alça, com monitorização em terapia intensiva e reavaliação seriada."},{id:"B",texto:"Nitroprussiato de sódio intravenoso associado a furosemida, para reduzir a pós-carga e a congestão pulmonar."},{id:"C",texto:"Metoprolol intravenoso para reduzir a frequência cardíaca, associado à restrição hídrica e a oxigênio suplementar."},{id:"D",texto:"Furosemida intravenosa em dose alta como medida isolada e reavaliação da pressão arterial após a diurese."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: fração de ejeção de **20%**, **PA 82 x 58 mmHg**, extremidades frias com enchimento capilar lento, **lactato 3,8 mmol/L** (acima de 2) e **creatinina 2,1 mg/dL** (disfunção renal por hipoperfusão), associados a congestão (estase jugular, estertores e edema). É o perfil hemodinâmico **C (frio e congesto)**, com baixo débito: o paciente está em hipoperfusão e com pressão arterial baixa. Perfis: A (quente e seco), B (quente e congesto), C (frio e congesto) e L (frio e seco). O inotrópico (dobutamina) melhora o débito e a perfusão, e o diurético trata a congestão. Em hipotensão com choque, o vasopressor (noradrenalina) é associado se persistir a hipotensão. A alternativa B está errada: o nitroprussiato reduz a pós-carga em hipertensos, mas causa hipotensão grave com PAS de 82 mmHg. A alternativa C está errada: o betabloqueador venoso é contraindicado no baixo débito. A alternativa D está errada: o diurético isolado piora a perfusão renal e a hipotensão, pois o problema é o baixo débito.",
  explicacoesAlternativas:{},
  referencias:"Heidenreich PA et al. 2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure (Circulation 2022); Rohde LEP et al. Diretriz brasileira de insuficiência cardíaca crônica e aguda, SBC 2018; Nohria A et al. Clinical assessment identifies hemodynamic profiles (J Am Coll Cardiol 2003). Nível de confirmação: memória. A diretriz ESC de insuficiência cardíaca de 2026 existe (Eur Heart J, ESC Congress 2026) e, segundo resumos de fontes secundárias em 29/10/2026, passa a reconhecer só dois fenótipos, FEVE abaixo de 50% e a partir de 50%; a classificação e as metas desta explicação devem ser conferidas nela.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q29 da prova-unifesp-2026
{
  id:"q-adap26-029", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-nefro", assuntoId:"ass-hidroeletrolitico",
  enunciado:"Mulher, 74 anos de idade, em uso de hidroclorotiazida há 3 semanas, é levada ao pronto-socorro após crise convulsiva tônico-clônica generalizada, precedida por vômitos e confusão. Exame físico: sonolenta, PA 128 x 74 mmHg, mucosas úmidas, sem edema, sem ascite. Exames: sódio sérico de 111 mEq/L, potássio 3,1 mEq/L, glicemia 96 mg/dL, osmolalidade sérica de 232 mOsm/kg e creatinina 0,8 mg/dL. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Restrição hídrica a 800 mL por dia e suspensão da hidroclorotiazida, com reavaliação do sódio em 24 horas."},{id:"B",texto:"Solução salina hipertônica a 3%, em bolus de 100 a 150 mL, repetido até a melhora dos sintomas."},{id:"C",texto:"Solução salina isotônica a 0,9%, 1 litro em 1 hora, para correção rápida do sódio sérico."},{id:"D",texto:"Tolvaptana por via oral, por ser antagonista do receptor da vasopressina e corrigir o sódio de forma controlada."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: sódio de **111 mEq/L** com **convulsão** (sintoma grave), osmolalidade sérica baixa (**232 mOsm/kg**), uso recente de **tiazídico**, volume extracelular normal (mucosas úmidas, sem edema): hiponatremia hipotônica grave sintomática, provavelmente associada ao diurético. A conduta é a salina hipertônica a 3% em **bolus de 100 a 150 mL** (até 2 a 3 vezes, em 10 a 20 minutos), com meta de elevar o sódio em **4 a 6 mEq/L** nas primeiras horas, o suficiente para reduzir o edema cerebral e cessar as convulsões. O limite de correção é de **8 mEq/L em 24 horas** (6 a 8 mEq/L), para evitar a síndrome de desmielinização osmótica, e o sódio é medido a cada 2 horas. Atenção: corrigir o potássio (3,1 mEq/L) também eleva o sódio, e a suspensão do tiazídico pode causar diurese aquosa e correção rápida demais; por isso a medida frequente do sódio. A alternativa A está errada: a restrição hídrica serve para hiponatremia crônica leve, sem sintomas graves. A alternativa C está errada: o soro fisiológico pode piorar a hiponatremia se houver SIADH e não corrige com a velocidade necessária. A alternativa D está errada: a tolvaptana tem início lento e corrige em excesso, sem indicação na emergência.",
  explicacoesAlternativas:{},
  referencias:"Spasovski G et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia (Eur J Endocrinol 2014); Verbalis JG et al. Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations (Am J Med 2013); Sociedade Brasileira de Nefrologia. Nível de confirmação: memória. Não localizei atualização das diretrizes europeias de hiponatremia (2014) até 29/10/2026.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q30 da prova-unifesp-2026
{
  id:"q-adap26-030", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-endocrino", assuntoId:"ass-tireoide",
  enunciado:"Mulher, 45 anos de idade, assintomática, notou massa palpável no lado direito do pescoço. O TSH é de 1,8 mUI/L e o T4 livre é normal. O ultrassom cervical mostra nódulo de 1,7 cm, de composição sólida e ecogenicidade menor que a do parênquima tireoidiano normal, bordas irregulares, microcalcificações e diâmetro anteroposterior maior que o transverso. Não há linfonodos suspeitos, história familiar de câncer de tireoide nem irradiação prévia. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Cintilografia de tireoide com iodo radioativo para definir se o nódulo é funcionante."},{id:"B",texto:"Seguimento com ultrassonografia anual, pois a função tireoidiana é normal e a paciente não tem sintomas."},{id:"C",texto:"Punção aspirativa com agulha fina do nódulo, guiada por ultrassonografia."},{id:"D",texto:"Levotiroxina em dose supressiva por seis meses, com reavaliação ultrassonográfica após o período."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: nódulo sólido de **1,7 cm** (acima de 1 cm), **hipoecogênico**, com **margens irregulares**, **focos ecogênicos puntiformes** (microcalcificações) e **mais alto do que largo**, com TSH normal. São características de **alta suspeita de malignidade** (ATA: padrão de alta suspeita, com risco de câncer de cerca de 70 a 90%; ACR TI-RADS: sólido 2 pontos, hipoecogênico 2, margem irregular 2, focos puntiformes 3 e mais alto do que largo 3, total de 12 pontos, categoria TR5, que é a de 7 pontos ou mais). Pelo TI-RADS, o TR5 pede punção a partir de **1 cm**. A punção com agulha fina é o exame de escolha, e o resultado é classificado pelo sistema de Bethesda. A alternativa A está errada: a cintilografia é pedida quando o TSH está suprimido, para identificar nódulo autônomo; com TSH normal, não ajuda. A alternativa B está errada: o nódulo com padrão suspeito não deve ser apenas vigiado. A alternativa D está errada: a supressão com levotiroxina não é recomendada em nódulos, pois não reduz o tamanho de forma consistente e traz riscos cardíacos e ósseos.",
  explicacoesAlternativas:{},
  referencias:"Haugen BR et al. 2015 American Thyroid Association Management Guidelines for Adult Patients with Thyroid Nodules and Differentiated Thyroid Cancer (Thyroid 2016); Tessler FN et al. ACR Thyroid Imaging, Reporting and Data System (J Am Coll Radiol 2017); Ali SZ et al. The 2023 Bethesda System for Reporting Thyroid Cytopathology (Thyroid 2023). Nível de confirmação: memória. ATA 2025 para câncer diferenciado de tireoide existe (Thyroid 2025, doi 10.1177/10507256251363120), confirmada em resumos em 29/10/2026; a questão trata de nódulo e punção, assunto da diretriz de 2015, e a conduta não foi revisada no texto de 2025.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q31 da prova-unifesp-2026
{
  id:"q-adap26-031", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-dermato", assuntoId:"ass-derm-tumores",
  enunciado:"Homem, 62 anos de idade, agricultor, apresenta há 2 anos lesão em asa nasal esquerda que cresceu lentamente, com 1,5 cm, em placa endurecida, esbranquiçada, de aspecto cicatricial e bordas mal delimitadas, sem ulceração. A biópsia incisional mostra carcinoma basocelular com cordões finos de células infiltrando a derme profunda (padrão esclerodermiforme). Não há linfonodos palpáveis. Qual é o tratamento mais adequado?",
  alternativas:[{id:"A",texto:"Imiquimode tópico a 5% por seis semanas, pela boa resposta em lesões superficiais pequenas."},{id:"B",texto:"Curetagem e eletrodissecção em três ciclos, por ser técnica simples e de baixo custo."},{id:"C",texto:"Cirurgia micrográfica de Mohs, pela localização de alto risco e pelo subtipo infiltrativo."},{id:"D",texto:"Criocirurgia com nitrogênio líquido, pois evita a cicatriz e dispensa anestesia no procedimento."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: carcinoma basocelular em **asa nasal** (zona H da face, de alto risco de recidiva), com **bordas mal delimitadas**, aspecto cicatricial e subtipo **esclerodermiforme** (morfeiforme), que infiltra a derme profunda em cordões finos e se estende além do que se vê. Esses três fatores (localização, limites imprecisos e histologia agressiva) definem tumor de alto risco. Nesses casos, a cirurgia micrográfica de Mohs, com controle de 100% das margens, tem a menor taxa de recidiva (cerca de 1 a 2%, contra 10% ou mais da excisão convencional) e preserva o máximo de tecido. As técnicas destrutivas ficam para tumores de baixo risco: superficiais ou nodulares pequenos, em tronco e membros. A alternativa A está errada: o imiquimode serve ao tipo superficial, não penetra o tumor infiltrativo. A alternativa B está errada: a curetagem é indicada em lesões pequenas, bem delimitadas e de baixo risco, e a cicatriz impede ver a recidiva. A alternativa D está errada: a criocirurgia não controla as margens, não fornece histologia da peça e tem recidiva alta em tumor esclerodermiforme.",
  explicacoesAlternativas:{},
  referencias:"NCCN Guidelines Basal Cell Skin Cancer (versão 2025); Sociedade Brasileira de Dermatologia, Consenso brasileiro de carcinoma basocelular; Connolly SM et al. AAD/ACMS/ASDSA/ASMS 2012 Appropriate Use Criteria for Mohs micrographic surgery (J Am Acad Dermatol 2012). Nível de confirmação: memória. As diretrizes NCCN têm versões anuais ou mais frequentes e o texto não foi aberto; em 29/10/2026 só confirmei, por fonte secundária, a versão 1.2026 de câncer de pulmão não pequenas células alinhada ao TNM 9ª edição da AJCC, e que o estudo ATOMIC apoia imunoterapia mais cedo no câncer de cólon com instabilidade de microssatélites; as condutas desta questão devem ser conferidas na versão vigente.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q32 da prova-unifesp-2026
{
  id:"q-adap26-032", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-geriatria", assuntoId:"ass-geriatria-demencia",
  enunciado:"Homem, 74 anos de idade, é levado pela esposa à consulta por alterações que evoluem há 18 meses: oscilações marcantes da atenção e da lucidez ao longo do dia, alucinações visuais bem formadas («crianças brincando na sala»), movimentos de pernas e socos durante o sono com relatos de sonhos violentos e lentificação dos movimentos. Exame: rigidez leve em roda dentada e bradicinesia, sem tremor de repouso. A memória recente está relativamente preservada, mas há déficit de atenção e de função visuoespacial. A ressonância magnética mostra pouca atrofia hipocampal. Qual é o diagnóstico mais provável?",
  alternativas:[{id:"A",texto:"Doença de Alzheimer, pela evolução lenta e progressiva do declínio cognitivo no idoso."},{id:"B",texto:"Demência vascular, pelo comprometimento da atenção e pela lentificação psicomotora do paciente."},{id:"C",texto:"Demência frontotemporal, pela presença de alterações do comportamento e dos movimentos."},{id:"D",texto:"Demência com corpos de Lewy, pela flutuação cognitiva, pelas alucinações e pelo parkinsonismo."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **flutuação cognitiva** (variação da atenção e da lucidez), **alucinações visuais** bem formadas e recorrentes, **transtorno comportamental do sono REM** (age os sonhos) e **parkinsonismo** leve: são as quatro características clínicas centrais da demência com corpos de Lewy, segundo o consenso de 2017. Duas ou mais delas, com a demência, bastam para o diagnóstico provável. Os dados de apoio no caso são a **memória relativamente preservada** no início, o déficit de atenção e visuoespacial e a atrofia hipocampal discreta. O parkinsonismo aparece depois ou junto do declínio cognitivo (na demência da doença de Parkinson, a demência vem mais de um ano depois do parkinsonismo). Os antipsicóticos típicos devem ser evitados pela sensibilidade grave a neurolépticos. A alternativa A está errada: no Alzheimer o primeiro sintoma é a perda de memória recente e a atrofia hipocampal é marcante. A alternativa B está errada: a demência vascular tem relação temporal com eventos vasculares e lesões na imagem. A alternativa C está errada: na demência frontotemporal predominam as alterações de comportamento e de linguagem, com preservação da percepção visuoespacial.",
  explicacoesAlternativas:{},
  referencias:"McKeith IG et al. Diagnosis and management of dementia with Lewy bodies: Fourth consensus report of the DLB Consortium (Neurology 2017); Academia Brasileira de Neurologia, Diretrizes de demências. Nível de confirmação: memória. O quarto consenso do DLB Consortium (2017) segue como o mais recente localizado em 29/10/2026.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q33 da prova-unifesp-2026
{
  id:"q-adap26-033", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-infecto", assuntoId:"ass-atb",
  enunciado:"Mulher, 68 anos de idade, diabética, é internada com febre, calafrios, dor lombar à direita e hipotensão que responde parcialmente a 30 mL/kg de cristaloide. Urina: leucocitúria e nitrito positivo. Tomografia: pielonefrite sem obstrução. Em 48 horas, a urocultura e duas hemoculturas isolam Escherichia coli com o seguinte perfil de sensibilidade: ceftriaxona R, cefepima R, ciprofloxacino R, sulfametoxazol-trimetoprima R, piperacilina-tazobactam S, amicacina S, meropenem S e ertapenem S. A paciente recebeu ceftriaxona por 48 horas e persiste instável. Qual é a melhor conduta?",
  alternativas:[{id:"A",texto:"Manter a ceftriaxona em dose dobrada, pois a dose alta supera a resistência."},{id:"B",texto:"Trocar por piperacilina-tazobactam, porque o teste de sensibilidade mostra que é ativa e tem boa penetração renal."},{id:"C",texto:"Trocar por ciprofloxacino intravenoso, que tem excelente concentração no parênquima renal."},{id:"D",texto:"Trocar por meropenem, de escolha na bacteremia por E. coli produtora de betalactamase de espectro estendido."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: pielonefrite com **bacteremia** e instabilidade hemodinâmica, E. coli **resistente a ceftriaxona e a cefepima** (cefalosporinas de terceira e quarta gerações), com resistência associada a quinolona e sulfa e sensibilidade a carbapenêmicos: perfil de produtora de **betalactamase de espectro estendido (ESBL)**. No estudo MERINO, a piperacilina-tazobactam teve mortalidade em 30 dias maior (12,3% contra 3,7%) que o meropenem na bacteremia por E. coli ou Klebsiella resistentes à ceftriaxona; por isso, o carbapenêmico é o tratamento de escolha na doença grave com bacteremia, mesmo que o teste mostre sensibilidade à piperacilina-tazobactam (efeito de inóculo e variações na determinação da sensibilidade). O ertapenem é opção em quem está estável. A alternativa A está errada: aumentar a dose não supera a resistência mediada por ESBL, e o paciente já não responde. A alternativa B está errada: o resultado de sensibilidade enganou nos estudos, e a opção é inferior em bacteremia. A alternativa C está errada: a E. coli é resistente ao ciprofloxacino.",
  explicacoesAlternativas:{},
  referencias:"Harris PNA et al. Effect of piperacillin-tazobactam vs meropenem on 30-day mortality for patients with E coli or Klebsiella pneumoniae bloodstream infection and ceftriaxone resistance: the MERINO randomized clinical trial (JAMA 2018); Tamma PD et al. IDSA 2024 Guidance on the Treatment of Antimicrobial-Resistant Gram-Negative Infections (Clin Infect Dis 2024). Nível de confirmação: memória. A IDSA atualizou em 2026 a orientação sobre bactérias gram-negativas resistentes (Healio, 26/08/2026): a piperacilina-tazobactam deixou de ser desaconselhada nas infecções urinárias por produtores de ESBL e passou a alternativa, segundo fonte secundária em 29/10/2026; o carbapenêmico na bacteremia grave desta questão, apoiado no estudo MERINO, não foi conferido na versão de 2026.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q34 da prova-unifesp-2026
{
  id:"q-adap26-034", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-nefro", assuntoId:"ass-drc",
  enunciado:"Homem, 66 anos de idade, com doença renal crônica por nefropatia diabética (TFGe de 22 mL/min/1,73 m²), queixa-se de cansaço aos esforços. Não há sangramentos nem uso de anticoagulantes. Exames: hemoglobina 9,2 g/dL, VCM 84 fL, reticulócitos baixos, ferritina 280 ng/mL, saturação da transferrina 14%, vitamina B12 e ácido fólico normais, PTH 180 pg/mL. A pesquisa de sangue oculto nas fezes é negativa. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Iniciar de imediato agente estimulador da eritropoese, pois a hemoglobina está abaixo de 10 g/dL."},{id:"B",texto:"Corrigir a deficiência de ferro com reposição oral ou intravenosa e reavaliar a resposta antes da eritropoetina."},{id:"C",texto:"Transfundir concentrado de hemácias para elevar a hemoglobina acima de 10 g/dL com rapidez."},{id:"D",texto:"Reposição empírica de vitamina B12 intramuscular, pois a anemia da doença renal costuma ser macrocítica."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: anemia **normocítica** (VCM 84 fL) e hipoproliferativa (**reticulócitos baixos**) na doença renal crônica avançada, com **saturação da transferrina de 14%** (abaixo de 20%) e **ferritina de 280 ng/mL**. A inflamação da doença renal crônica eleva a ferritina e retém o ferro (deficiência funcional), e por isso os limiares são mais altos que na população geral. A diretriz KDIGO de 2026 revisou esses limiares: antes se definia deficiência por ferritina até 500 ng/mL e saturação até 30%; para doença renal crônica sem diálise, os valores relatados são ferritina abaixo de 100 ng/mL com saturação abaixo de 40%, ou ferritina de 100 a 300 ng/mL com saturação abaixo de 25%. O paciente (ferritina de 280 ng/mL e saturação de 14%) preenche as duas definições. A diretriz KDIGO recomenda a reposição de ferro (por via oral ou intravenosa; a intravenosa é preferida em hemodiálise) antes de iniciar o agente estimulador da eritropoese, e o agente estimulador é considerado depois, com hemoglobina abaixo de 10 g/dL, quando o ferro e as outras causas de anemia já foram corrigidos. A alternativa A está errada: o agente estimulador sem ferro adequado tem resposta ruim e mais riscos. A alternativa C está errada: a transfusão é reservada para anemia grave ou instável, e traz risco de sensibilização, importante para quem aguarda transplante. A alternativa D está errada: a deficiência de B12 e de folato foi afastada pelos exames.",
  explicacoesAlternativas:{},
  referencias:"KDIGO 2026 Clinical Practice Guideline for Anemia in Chronic Kidney Disease (Kidney Int 2026); KDIGO Clinical Practice Guideline for Anemia in CKD (Kidney Int Suppl 2012). Nível de confirmação: busca (resumo da diretriz de 2026; texto integral não aberto).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q35 da prova-unifesp-2026
{
  id:"q-adap26-035", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-reumato", assuntoId:"ass-reumato-cristais",
  enunciado:"Homem, 55 anos de idade, tem três crises de artrite aguda no primeiro artelho por ano nos últimos dois anos, tratadas com anti-inflamatórios, e apresenta um nódulo indolor, branco-amarelado, no pavilhão auricular e outro no cotovelo. Está sem crise há duas semanas. Exames: ácido úrico de 9,8 mg/dL, TFGe de 72 mL/min/1,73 m², sem litíase. Radiografia dos pés com erosões «em saca-bocado» na primeira articulação metatarsofalângica. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Iniciar alopurinol em dose baixa, com titulação até o alvo sérico de ácido úrico e profilaxia de crises."},{id:"B",texto:"Iniciar alopurinol 300 mg por dia de imediato, sem profilaxia, para atingir rapidamente o alvo sérico."},{id:"C",texto:"Manter apenas colchicina contínua por tempo indeterminado, que impede novas crises e reabsorve os tofos."},{id:"D",texto:"Orientar dieta e seguimento, reservando o hipouricemiante para quem tiver cinco ou mais crises por ano."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: gota com **três crises por ano** (duas ou mais ao ano), **tofos** (nódulos no pavilhão auricular e cotovelo), **erosões radiográficas** típicas e **ácido úrico de 9,8 mg/dL**. Segundo o ACR de 2020, o tratamento hipouricemiante é fortemente recomendado com **tofos, dano radiográfico ou duas ou mais crises por ano**. O alopurinol é o fármaco de primeira linha, iniciado em dose baixa (100 mg/dia ou menos) e titulado de forma progressiva até o alvo de **ácido úrico menor que 6 mg/dL** (menor que 5 mg/dL nos casos com tofos), o que dissolve os cristais. Inicia-se o tratamento fora da crise e associa-se profilaxia contra crises (colchicina, anti-inflamatório ou prednisona em dose baixa) por **3 a 6 meses**, porque a mobilização de cristais pode desencadear crises. A alternativa B está errada: dose inicial plena aumenta o risco de crises e de reações de hipersensibilidade. A alternativa C está errada: a colchicina previne crises, mas não reduz o ácido úrico nem dissolve tofos. A alternativa D está errada: a indicação já existe, e adiá-la permite dano articular.",
  explicacoesAlternativas:{},
  referencias:"FitzGerald JD et al. 2020 American College of Rheumatology Guideline for the Management of Gout (Arthritis Care Res 2020); Richette P et al. 2016 updated EULAR evidence-based recommendations for the management of gout (Ann Rheum Dis 2017); Sociedade Brasileira de Reumatologia, Diretrizes de gota. Nível de confirmação: memória. Não localizei em 29/10/2026 diretriz EULAR de gota posterior à de 2016 (atualizações de 2022 e 2023 citadas em materiais secundários não foram confirmadas) nem atualização da ACR de 2020, que mantém alopurinol em dose baixa, titulação para ácido úrico de 6 mg/dL e alopurinol como primeira linha.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q36 da prova-unifesp-2026
{
  id:"q-adap26-036", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-infecto", assuntoId:"ass-tuberculose",
  enunciado:"Homem, 38 anos de idade, com infecção pelo HIV diagnosticada há uma semana e sem uso prévio de antirretrovirais, apresenta tosse, febre e emagrecimento há 2 meses. A baciloscopia do escarro é positiva e o teste molecular rápido detecta Mycobacterium tuberculosis sem resistência à rifampicina. A contagem de linfócitos T CD4 é de 38 células/mm³. Foi iniciado hoje o esquema com rifampicina, isoniazida, pirazinamida e etambutol. Quando deve ser iniciada a terapia antirretroviral?",
  alternativas:[{id:"A",texto:"Em até duas semanas do início do tratamento da tuberculose, por causa do CD4 abaixo de 50 células/mm³."},{id:"B",texto:"Após oito semanas do início do tratamento da tuberculose, para reduzir o risco de síndrome inflamatória."},{id:"C",texto:"Somente ao final dos seis meses de tratamento, para evitar a interação medicamentosa com a rifampicina."},{id:"D",texto:"Apenas após a negativação da baciloscopia, o que costuma ocorrer ao final do segundo mês."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: coinfecção HIV e tuberculose pulmonar, em paciente sem antirretrovirais, com **CD4 de 38 células/mm³** (abaixo de 50). Nessa faixa a mortalidade é muito alta se a terapia antirretroviral é adiada, e a diretriz recomenda iniciá-la **em até 2 semanas** do começo do tratamento da tuberculose. Com CD4 igual ou maior que **50 células/mm³**, a terapia pode esperar até **8 semanas** (fase de manutenção). Exceção: na meningite tuberculosa, o início é adiado para reduzir eventos graves. Deve-se acompanhar a síndrome inflamatória de reconstituição imune e as interações (a rifampicina reduz os níveis de inibidores de protease e exige ajuste do dolutegravir para 50 mg a cada 12 horas). A alternativa B está errada: a espera de 8 semanas vale para CD4 de 50 ou mais. A alternativa C está errada: adiar por seis meses aumenta a mortalidade, e as interações são manejadas com ajuste de dose. A alternativa D está errada: não há relação entre a negativação do escarro e o momento certo de iniciar.",
  explicacoesAlternativas:{},
  referencias:"Ministério da Saúde, Manual de Recomendações para o Controle da Tuberculose no Brasil (2019, atualizações); Protocolo Clínico e Diretrizes Terapêuticas para Manejo da Infecção pelo HIV em Adultos (MS); WHO consolidated guidelines on tuberculosis, Module 4: treatment (2022). Nível de confirmação: memória; o corte de CD4 pode ter mudado no PCDT atual do Ministério da Saúde, que não foi aberto.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q37 da prova-unifesp-2026
{
  id:"q-adap26-037", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-reumato", assuntoId:"ass-reumato-vasculites",
  enunciado:"Mulher, 72 anos de idade, queixa-se há 3 semanas de cefaleia temporal direita nova, dor ao mastigar que melhora com o repouso e episódio de turvação visual transitória no olho direito. Exame: artéria temporal direita endurecida e dolorosa à palpação, pulsos reduzidos, fundo de olho sem alterações. Exames: VHS 98 mm na primeira hora, PCR de 8,4 mg/dL, hemoglobina 10,8 g/dL e plaquetas de 520.000/mm³. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Iniciar prednisona em dose alta imediatamente e solicitar biópsia da artéria temporal, sem aguardar o resultado para tratar."},{id:"B",texto:"Aguardar o resultado da biópsia da artéria temporal para só então iniciar o corticoide, evitando tratamento desnecessário."},{id:"C",texto:"Prescrever anti-inflamatório não hormonal e analgésico, reavaliando em duas semanas."},{id:"D",texto:"Iniciar tocilizumabe como medicamento único e dispensar a biópsia, pela elevação dos reagentes de fase aguda."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: idade acima de **50 anos** (72), cefaleia nova temporal, **claudicação da mandíbula**, **amaurose fugaz**, artéria temporal endurecida, **VHS de 98 mm** (acima de 50), PCR elevada, anemia e trombocitose: arterite de células gigantes, e a turvação visual indica risco iminente de **cegueira irreversível** (o outro olho costuma ser atingido em poucos dias se a doença não for tratada). O corticoide (prednisona de **40 a 60 mg/dia**, ou 1 mg/kg; pulso de metilprednisolona se houver perda visual) deve ser iniciado **imediatamente**, sem esperar a biópsia, que continua positiva por semanas depois do início do corticoide. Depois, avalia-se a associação de tocilizumabe, para poupar corticoide. A alternativa B está errada: esperar pela biópsia coloca em risco a visão. A alternativa C está errada: o anti-inflamatório não hormonal não trata a vasculite nem previne a cegueira. A alternativa D está errada: o tocilizumabe é adjuvante ao corticoide, e a biópsia (ou o ultrassom de artérias) ainda é necessária para confirmar o diagnóstico.",
  explicacoesAlternativas:{},
  referencias:"Maz M et al. 2021 American College of Rheumatology/Vasculitis Foundation Guideline for the Management of Giant Cell Arteritis and Takayasu Arteritis (Arthritis Rheumatol 2021); Hellmich B et al. 2018 update of the EULAR recommendations for the management of large vessel vasculitis (Ann Rheum Dis 2020); Stone JH et al. GiACTA (N Engl J Med 2017). Nível de confirmação: memória. Não localizei em 29/10/2026 atualização da diretriz ACR/Vasculitis Foundation de 2021; o upadacitinibe foi aprovado pela FDA para arterite de células gigantes em abril de 2025 (estudo SELECT-GCA), e uma recomendação turca de 2026 o sugere como alternativa ao tocilizumabe em baixo risco cardiovascular, segundo fontes secundárias.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q38 da prova-unifesp-2026
{
  id:"q-adap26-038", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-pneumo", assuntoId:"ass-pneumonia",
  enunciado:"Homem, 62 anos de idade, tabagista, hipertenso, sem hospitalização ou uso de antibiótico nos últimos 90 dias, chega ao pronto-socorro com febre, tosse e dispneia há 3 dias. Exame físico: confuso, PA 98 x 60 mmHg, FC 118 bpm, FR 34 irpm, T 38,9 °C, SpO2 88% em ar ambiente. Exames: ureia 68 mg/dL, leucócitos 3.200/mm³, relação PaO2/FiO2 de 210. Radiografia: opacidades em lobos inferior direito e médio. Qual é o esquema antimicrobiano empírico mais adequado?",
  alternativas:[{id:"A",texto:"Amoxicilina por via oral por cinco dias, com reavaliação ambulatorial em 48 a 72 horas."},{id:"B",texto:"Ceftriaxona intravenosa isolada, que cobre os agentes mais comuns da pneumonia da comunidade."},{id:"C",texto:"Levofloxacino por via oral em monoterapia, com internação em enfermaria."},{id:"D",texto:"Ceftriaxona associada a azitromicina por via intravenosa, com internação em terapia intensiva."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: pelos critérios da ATS/IDSA 2019, a pneumonia é **grave** com 1 critério maior (choque com vasopressor ou ventilação mecânica) ou **3 ou mais critérios menores**. Contagem dos critérios menores no caso: **frequência respiratória de 34 irpm** (30 ou mais) = 1; **PaO2/FiO2 de 210** (250 ou menos) = 1; **infiltrado multilobar** (lobos inferior e médio) = 1; **confusão** = 1; **ureia de 68 mg/dL** (nitrogênio ureico de cerca de 32 mg/dL, acima do limite de 20 mg/dL) = 1; **leucopenia** (3.200/mm³, abaixo de 4.000/mm³) = 1. São **seis** critérios menores: pneumonia grave, com internação em UTI. Sem fatores de risco para MRSA ou Pseudomonas (sem hospitalização nem antibiótico venoso recente), o tratamento é betalactâmico (ceftriaxona) mais macrolídeo (azitromicina), ou betalactâmico mais quinolona respiratória. A alternativa A está errada: é o esquema do paciente ambulatorial sem comorbidades. A alternativa B está errada: o betalactâmico isolado não cobre atípicos, e na pneumonia grave a cobertura combinada reduz a mortalidade. A alternativa C está errada: a quinolona em monoterapia não é indicada na pneumonia grave.",
  explicacoesAlternativas:{},
  referencias:"Metlay JP et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia: ATS/IDSA Clinical Practice Guideline (Am J Respir Crit Care Med 2019); Corrêa RA et al. Diretrizes brasileiras para pneumonia adquirida na comunidade em adultos imunocompetentes, SBPT 2018. Nível de confirmação: memória. A atualização da ATS de 2025 sobre pneumonia comunitária existe e a IDSA não a endossou, segundo fonte secundária em 29/10/2026; os critérios de gravidade ATS/IDSA de 2007 e 2019 usados nesta questão não foram conferidos nela.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q39 da prova-unifesp-2026
{
  id:"q-adap26-039", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-dermato", assuntoId:"ass-derm-farmacodermias",
  enunciado:"Homem, 45 anos de idade, iniciou alopurinol há quatro semanas para tratar gota. Há três dias, apresenta febre de 39 °C, ardor ocular e dor para engolir, seguidos de lesões cutâneas dolorosas no tronco e membros: máculas eritematovioláceas com centro escuro, algumas com bolhas, além de erosões na mucosa oral e hiperemia conjuntival. Ao exame, há descolamento da epiderme em cerca de 7% da superfície corporal e sinal de Nikolsky positivo. Qual é o diagnóstico mais provável?",
  alternativas:[{id:"A",texto:"Eritema multiforme maior, pelas lesões em alvo e pelo acometimento da mucosa oral."},{id:"B",texto:"Síndrome de Stevens-Johnson, pelo descolamento epidérmico inferior a 10% da superfície."},{id:"C",texto:"Necrólise epidérmica tóxica, pela febre alta e pelo acometimento da conjuntiva."},{id:"D",texto:"Reação com eosinofilia e sintomas sistêmicos (DRESS), pelo medicamento e pela febre."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: reação a medicamento de **início tardio** (4 semanas, intervalo habitual de 1 a 8 semanas) com **alopurinol**, febre, **acometimento de duas mucosas** (oral e ocular), máculas dolorosas com centro escuro e bolhas e **descolamento epidérmico em 7%** da superfície corporal, com sinal de Nikolsky positivo. A classificação é pela área descolada: **síndrome de Stevens-Johnson (menos de 10%)**; sobreposição (10 a 30%); **necrólise epidérmica tóxica (mais de 30%)**. A conduta é suspender o fármaco imediatamente, tratar em unidade de queimados ou de terapia intensiva e calcular o SCORTEN (idade acima de 40 anos, neoplasia, FC acima de 120 bpm, área descolada acima de 10%, nitrogênio ureico acima de 28 mg/dL, glicose acima de 252 mg/dL e bicarbonato abaixo de 20 mmol/L; um ponto cada). Aqui, a idade (45 anos) soma 1 ponto, e os demais itens dependem de exames não informados. A alternativa A está errada: no eritema multiforme maior as lesões são em alvo típicas, de distribuição acral, sem máculas disseminadas e com descolamento inferior a 10%, em geral de causa infecciosa. A alternativa C está errada: a área descolada não chega a 30%. A alternativa D está errada: no DRESS há eosinofilia, edema facial e acometimento de órgãos, sem descolamento da epiderme.",
  explicacoesAlternativas:{},
  referencias:"Bastuji-Garin S et al. Clinical classification of cases of toxic epidermal necrolysis, Stevens-Johnson syndrome, and erythema multiforme (Arch Dermatol 1993); Bastuji-Garin S et al. SCORTEN: a severity-of-illness score for toxic epidermal necrolysis (J Invest Dermatol 2000); Sociedade Brasileira de Dermatologia. Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q40 da prova-unifesp-2026
{
  id:"q-adap26-040", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-pneumo", assuntoId:"ass-dpoc",
  enunciado:"Homem, 70 anos de idade, ex-tabagista (60 anos-maço), com DPOC grave e dispneia aos pequenos esforços, está em uso de broncodilatadores de longa ação. Exame físico: cianose discreta, edema de membros inferiores e estase jugular. Em duas gasometrias arteriais colhidas com 3 semanas de intervalo, em repouso e em ar ambiente, na fase estável: pH 7,39, PaO2 52 mmHg, PaCO2 49 mmHg, saturação de 85% e hematócrito de 57%. O eletrocardiograma mostra sinais de sobrecarga de câmaras direitas. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Oxigenoterapia apenas durante o exercício, pois a hipoxemia de repouso é leve para o grau de dispneia."},{id:"B",texto:"Oxigenoterapia domiciliar contínua, por pelo menos 15 horas por dia, com meta de saturação de 90% ou mais."},{id:"C",texto:"Corticoide sistêmico em dose baixa e contínua, para reduzir a dispneia e a necessidade de oxigênio."},{id:"D",texto:"Ventilação mecânica invasiva domiciliar por traqueostomia, indicada pela hipercapnia persistente."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: em duas medidas na fase estável, **PaO2 de 52 mmHg** (menor ou igual a 55 mmHg) e **saturação de 85%** (menor ou igual a 88%) em repouso, ainda com sinais de **cor pulmonale** (edema, estase jugular, sobrecarga de câmaras direitas) e **policitemia** (hematócrito de 57%, acima de 55%). A oxigenoterapia domiciliar prolongada é indicada com PaO2 igual ou menor que 55 mmHg ou saturação igual ou menor que 88%, ou com PaO2 entre 56 e 59 mmHg associada a cor pulmonale ou policitemia. O benefício em sobrevida depende da duração: o estudo NOTT mostrou que o uso contínuo (cerca de 18 horas por dia) foi melhor que o noturno de 12 horas, e a meta é de **pelo menos 15 horas por dia**, ajustada para manter a PaO2 acima de 60 mmHg ou a saturação em 90% ou mais. A alternativa A está errada: o oxigênio apenas ao esforço não reduz a mortalidade nem trata a hipoxemia de repouso. A alternativa C está errada: o corticoide oral crônico não tem benefício e causa miopatia e osteoporose. A alternativa D está errada: a ventilação invasiva domiciliar não é o tratamento de rotina, e a PaCO2 de 49 mmHg com pH normal não a justifica.",
  explicacoesAlternativas:{},
  referencias:"Nocturnal Oxygen Therapy Trial Group (Ann Intern Med 1980); GOLD Global Strategy for the Diagnosis, Management, and Prevention of COPD (relatório 2025; a edição 2026 existe, com critérios de grupos A, B e E ajustados pela exacerbação única e nova seção de atividade da doença, segundo resumos de fontes secundárias em 29/10/2026; a indicação de oxigenoterapia domiciliar não foi conferida nela); Jardim JR et al. Diretrizes brasileiras de oxigenoterapia domiciliar prolongada, SBPT (J Bras Pneumol). Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q41 da prova-unifesp-2026
{
  id:"q-adap26-041", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-neurocirurgia", assuntoId:"ass-neurocir-tce",
  enunciado:"Homem, 19 anos de idade, sofreu golpe com um taco na região temporal direita durante uma briga. Após breve perda da consciência, ficou lúcido por cerca de uma hora e depois passou a apresentar cefaleia intensa, vômitos e sonolência. Na chegada ao pronto-socorro: Glasgow 10, pupila direita dilatada e pouco reativa, hemiparesia esquerda. A tomografia de crânio mostra coleção hiperdensa biconvexa, de limites nítidos, de 4,5 cm de espessura, com desvio da linha média de 9 mm. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Observação em unidade de terapia intensiva, com nova tomografia em 24 horas e manitol se houver piora clínica."},{id:"B",texto:"Craniotomia de urgência com evacuação do hematoma e hemostasia da fonte de sangramento."},{id:"C",texto:"Monitorização da pressão intracraniana e tratamento clínico da hipertensão, sem abordagem cirúrgica imediata."},{id:"D",texto:"Anticonvulsivante profilático e alta hospitalar com retorno se houver novo vômito."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: trauma temporal com **intervalo lúcido**, depois deterioração com **Glasgow 10**, **anisocoria** e hemiparesia contralateral, e tomografia com coleção **biconvexa** (em lente) de **4,5 cm** e **desvio da linha média de 9 mm**: hematoma extradural agudo, geralmente por lesão da artéria meníngea média, com sinais de herniação do uncus. Indicam cirurgia: volume acima de **30 cm³**, espessura acima de **15 mm**, desvio da linha média maior que **5 mm**, ou Glasgow menor que 9 com anisocoria, independentemente do volume. O paciente preenche os critérios de espessura (acima de 15 mm) e de desvio (acima de 5 mm) e tem anisocoria com déficit, e a evacuação por craniotomia deve ser imediata, pois o prognóstico depende do tempo até a descompressão. A alternativa A está errada: a observação só vale para hematomas pequenos (menos de 30 cm³, menos de 15 mm e sem desvio), com Glasgow acima de 8 e sem déficit. A alternativa C está errada: o tratamento clínico da hipertensão intracraniana é medida de ponte e não substitui a evacuação de uma lesão com efeito de massa. A alternativa D está errada: não trata o hematoma e deixa o paciente sob risco de morte.",
  explicacoesAlternativas:{},
  referencias:"Bullock MR et al. Surgical management of acute epidural hematomas (Neurosurgery 2006); Brain Trauma Foundation, Guidelines for the Surgical Management of TBI (2006); ATLS 10ª ed. (2018; a 11ª edição, de 2025, existe e não teve o texto conferido; resumos de fontes secundárias em 29/10/2026 citam o controle da hemorragia exsanguinante antes da via aérea (xABCDE) e não a tabela de classes de hemorragia). Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q42 da prova-unifesp-2026
{
  id:"q-adap26-042", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-ginecologia", assuntoId:"ass-climaterio",
  enunciado:"Mulher, 51 anos de idade, com útero, última menstruação há 14 meses, queixa-se de ondas de calor intensas, com 10 episódios diurnos e despertares noturnos por sudorese, que prejudicam o sono e o trabalho. Não fuma, tem IMC de 24 kg/m², pressão arterial de 118 x 76 mmHg e exames normais. Mamografia recente sem alterações. Sem antecedente pessoal ou familiar de câncer de mama, trombose ou doença cardiovascular. Qual é o tratamento mais adequado?",
  alternativas:[{id:"A",texto:"Estradiol isolado por via oral, em dose baixa, pois a paciente não apresenta fatores de risco para neoplasia."},{id:"B",texto:"Isoflavona de soja em dose elevada por 12 semanas, por ser alternativa natural de eficácia comprovada."},{id:"C",texto:"Estradiol por via transdérmica associado a progesterona micronizada, com reavaliação periódica."},{id:"D",texto:"Venlafaxina em dose baixa, indicada para todas as mulheres com sintomas vasomotores intensos."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: menopausa confirmada (**14 meses** de amenorreia), **sintomas vasomotores intensos** que prejudicam o sono, **51 anos** (menos de 60 anos e menos de 10 anos da menopausa, a «janela de oportunidade») e sem contraindicações. A terapia hormonal é o tratamento mais eficaz dos sintomas vasomotores. Com **útero íntegro**, o estrogênio precisa ser associado a **progestagênio** para proteger o endométrio contra hiperplasia e câncer; a via transdérmica evita a primeira passagem hepática e tem menor risco tromboembólico que a oral. A progesterona micronizada tem perfil metabólico favorável. A alternativa A está errada: o estrogênio isolado em mulher com útero aumenta o risco de hiperplasia e carcinoma de endométrio. A alternativa B está errada: as isoflavonas não superam o placebo em estudos controlados. A alternativa D está errada: a venlafaxina é opção para quem tem contraindicação ou não deseja a terapia hormonal, e não primeira linha em quem pode usá-la.",
  explicacoesAlternativas:{},
  referencias:"The 2022 Hormone Therapy Position Statement of The North American Menopause Society (Menopause 2022); Federação Brasileira das Associações de Ginecologia e Obstetrícia, Consenso brasileiro de terapêutica hormonal da menopausa (2018); Sociedade Brasileira de Climatério. Nível de confirmação: memória. Em novembro de 2025 a FDA anunciou a retirada do alerta de caixa preta de muitos produtos de terapia hormonal da menopausa, e a Menopause Society apoiou a retirada para estrogênio vaginal em baixa dose e manteve a avaliação individual do risco sistêmico, segundo fontes secundárias em 29/10/2026; não localizei atualização do position statement de 2022, e a conduta desta questão (janela de menos de 60 anos ou 10 anos de menopausa) segue coerente com as fontes.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q43 da prova-unifesp-2026
{
  id:"q-adap26-043", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-planfamiliar", assuntoId:"ass-contracepcao",
  enunciado:"Mulher, 29 anos de idade, G0, não fumante, IMC de 22 kg/m², solicita método contraceptivo oral. Refere crises de enxaqueca desde a adolescência, precedidas por escotomas cintilantes que duram cerca de 20 minutos, seguidas por cefaleia pulsátil. Exame físico normal, pressão arterial 110 x 70 mmHg. Qual é o método contraceptivo hormonal oral mais adequado?",
  alternativas:[{id:"A",texto:"Etinilestradiol associado a levonorgestrel em regime contínuo, para reduzir os episódios de enxaqueca."},{id:"B",texto:"Desogestrel 75 mcg isolado, de uso contínuo, pois o progestagênio sozinho não eleva o risco de AVC."},{id:"C",texto:"Valerato de estradiol associado a dienogeste, por conter estradiol natural e menor risco vascular."},{id:"D",texto:"Etinilestradiol com drospirenona em regime de 24 comprimidos ativos e 4 de placebo."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: enxaqueca **com aura** (escotomas cintilantes que precedem a cefaleia), jovem sem outros fatores de risco. A enxaqueca com aura dobra o risco de AVC isquêmico, e o estrogênio eleva ainda mais esse risco; pelos critérios de elegibilidade da OMS e do CDC, o contraceptivo hormonal combinado, seja oral, adesivo ou anel, é categoria **4** (risco inaceitável), em qualquer idade e sem importar a dose ou o tipo de estrogênio. Os métodos só com progestagênio são categoria 1 ou 2: **desogestrel 75 mcg** (inibe a ovulação), DIU de levonorgestrel, implante e injetável. A alternativa A está errada: o etinilestradiol é contraindicado, e o regime contínuo não elimina o risco vascular. A alternativa C está errada: o estradiol natural não afasta a contraindicação, pois também é estrogênio. A alternativa D está errada: a drospirenona não anula o risco do etinilestradiol, e o regime de 24/4 é apenas uma variação do esquema.",
  explicacoesAlternativas:{},
  referencias:"WHO Medical Eligibility Criteria for Contraceptive Use, 5ª ed. (2015; a 6ª ed., de 2025, existe e a categoria 4 dos combinados na enxaqueca com aura não foi conferida nela, 29/10/2026); CDC U.S. Medical Eligibility Criteria for Contraceptive Use (MMWR 2024); Ministério da Saúde, Critérios médicos de elegibilidade para uso de métodos contraceptivos, 5ª ed. Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q44 da prova-unifesp-2026
{
  id:"q-adap26-044", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-ginecologia", assuntoId:"ass-endometriose",
  enunciado:"Mulher, 27 anos de idade, nuligesta, queixa-se de dismenorreia intensa, dispareunia profunda e dor pélvica crônica há 3 anos, sem melhora com anti-inflamatórios. Não deseja engravidar no momento. O exame ginecológico é normal, e a ultrassonografia transvaginal com preparo intestinal mostra endometrioma de 3,2 cm no ovário esquerdo e espessamento do ligamento uterossacro à esquerda. Qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Videolaparoscopia diagnóstica com biópsia, pois somente o exame anatomopatológico confirma o diagnóstico."},{id:"B",texto:"Dosagem do CA-125 e indicação de ooforectomia esquerda, para evitar a progressão do endometrioma."},{id:"C",texto:"Cirurgia radical imediata com histerectomia e anexectomia bilateral, pela presença de doença profunda."},{id:"D",texto:"Tratamento hormonal contínuo com progestagênio (dienogeste) ou contraceptivo combinado em uso contínuo."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **dismenorreia**, **dispareunia profunda** e dor pélvica crônica, com **endometrioma ao ultrassom** (imagem diagnóstica) e envolvimento do ligamento uterossacro (doença profunda), em mulher que não deseja engravidar. O diagnóstico de endometriose pode ser firmado por história, exame físico e **imagem**, sem laparoscopia. O tratamento clínico inicial é hormonal e contínuo, com **dienogeste 2 mg** ou contraceptivo combinado contínuo (ou DIU de levonorgestrel, análogos do GnRH e antagonistas como segunda linha), com controle da dor e redução da progressão. A cirurgia é reservada para falha do tratamento clínico, obstrução de ureter ou intestino e desejo de gestação com infertilidade associada. A alternativa A está errada: a laparoscopia diagnóstica não é exigida quando a imagem é compatível. A alternativa B está errada: o CA-125 não tem valor diagnóstico na endometriose, e a ooforectomia reduz a reserva ovariana. A alternativa C está errada: a cirurgia radical é desproporcional em mulher jovem, com prole não definida.",
  explicacoesAlternativas:{},
  referencias:"ESHRE guideline: endometriosis (Becker CM et al., Hum Reprod Open 2022); Protocolo Clínico e Diretrizes Terapêuticas da Endometriose, Ministério da Saúde (2016); FEBRASGO, Manual de Endometriose. Nível de confirmação: memória. A diretriz ESHRE de endometriose é de fevereiro de 2022, com revisão prevista para 2025; não confirmei se foi publicada, segundo fontes secundárias em 29/10/2026.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q45 da prova-unifesp-2026
{
  id:"q-adap26-045", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-oncogineco", assuntoId:"ass-cavulva",
  enunciado:"Mulher, 68 anos de idade, apresenta lesão ulcerada de 1,2 cm no pequeno lábio esquerdo, sem acometimento de uretra, vagina ou ânus, com prurido há dois anos. A biópsia mostra carcinoma espinocelular invasivo, com profundidade de invasão estromal de 0,8 mm e sem invasão linfovascular. Os linfonodos inguinais são impalpáveis, e a ressonância de pelve e virilhas é normal. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Excisão local radical da lesão com margem de 1 cm em profundidade e lateral, sem avaliação linfonodal."},{id:"B",texto:"Vulvectomia radical com linfadenectomia inguinofemoral bilateral, como em todo carcinoma invasivo da vulva."},{id:"C",texto:"Hemivulvectomia associada à biópsia do linfonodo sentinela bilateral, por se tratar de lesão lateral."},{id:"D",texto:"Quimiorradioterapia primária, por ser tumor de pequeno volume e preservar a anatomia da vulva."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: lesão de **1,2 cm** (menor ou igual a 2 cm) e **invasão estromal de 0,8 mm** (menor ou igual a 1 mm), sem invasão linfovascular e sem linfonodos suspeitos: estádio **IA** pela classificação FIGO 2021 (IA: lesão até 2 cm com invasão até 1 mm; IB: lesão até 2 cm com invasão maior que 1 mm, ou lesão maior que 2 cm; II: extensão a uretra, vagina e ânus distais; III: linfonodos inguinofemorais). No IA o risco de comprometimento linfonodal é inferior a 1%, e a **excisão local radical** com margem de segurança de cerca de 1 cm (o limite de margem patológica varia entre as diretrizes, de cerca de 3 a 8 mm) é suficiente, **sem avaliação linfonodal**. A alternativa B está errada: a vulvectomia radical com linfadenectomia bilateral é uma conduta antiga e muito mórbida, hoje reservada a poucos casos. A alternativa C está errada: a biópsia do sentinela é indicada a partir do estádio IB, quando a invasão é maior que 1 mm, e em lesões unifocais com menos de 4 cm. A alternativa D está errada: o tratamento primário é cirúrgico, e a radioquimioterapia é reservada a doença avançada ou irressecável.",
  explicacoesAlternativas:{},
  referencias:"Olawaiye AB et al. FIGO staging for carcinoma of the vulva: 2021 revision (Int J Gynaecol Obstet 2021); Oonk MHM et al. European Society of Gynaecological Oncology Guidelines for the Management of Patients with Vulvar Cancer, update 2023 (Int J Gynecol Cancer 2023); NCCN Guidelines Vulvar Cancer. Nível de confirmação: memória; o texto da ESGO 2023 não foi aberto.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q46 da prova-unifesp-2026
{
  id:"q-adap26-046", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-geriatria", assuntoId:"ass-geriatria-quedas",
  enunciado:"Mulher, 78 anos de idade, viúva, mora sozinha e sofreu duas quedas nos últimos seis meses, sem fraturas, ao se levantar à noite para ir ao banheiro. Usa zolpidem 10 mg e amitriptilina 25 mg à noite, anlodipino e hidroclorotiazida. Exame: pressão arterial de 130 x 80 mmHg deitada e 104 x 66 mmHg em pé, marcha lenta com passos curtos e teste «levantar e andar» (TUG) em 18 segundos. Qual é a conduta preventiva mais adequada?",
  alternativas:[{id:"A",texto:"Orientar repouso relativo e acompanhante em tempo integral, para evitar nova queda até a próxima consulta."},{id:"B",texto:"Prescrever carbonato de cálcio e colecalciferol em dose alta, que protegem contra quedas e fraturas em idosos."},{id:"C",texto:"Avaliação multifatorial com revisão dos fármacos, tratamento da hipotensão postural e exercícios de equilíbrio e força."},{id:"D",texto:"Indicar internação para investigação de síncope, com ecocardiograma e Holter de 24 horas."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: idosa com **duas quedas em 6 meses** (indica risco), polifarmácia com **hipnótico-sedativo (zolpidem)**, **antidepressivo tricíclico (amitriptilina)** e dois anti-hipertensivos, **hipotensão ortostática** (queda de 26 mmHg na sistólica, acima de 20 mmHg) e **TUG de 18 segundos** (acima de 12 a 14 segundos indica risco). Pelas diretrizes de prevenção de quedas, a abordagem é a **avaliação multifatorial** com intervenção sobre cada fator: retirar ou reduzir psicotrópicos (critérios de Beers), ajustar anti-hipertensivos, corrigir a hipotensão postural e iniciar **exercícios multicomponentes** (equilíbrio, força e marcha), que são a intervenção isolada de maior evidência. A alternativa A está errada: o repouso causa fraqueza e piora o risco. A alternativa B está errada: a vitamina D só reduz quedas em quem tem deficiência, e a suplementação em dose alta pode aumentar o risco. A alternativa D está errada: não há síncope nem sinais cardiológicos, e as quedas têm causa identificável no exame.",
  explicacoesAlternativas:{},
  referencias:"World Falls Guidelines (Montero-Odasso M et al., Age Ageing 2022); Sociedade Brasileira de Geriatria e Gerontologia, Projeto Diretrizes: quedas em idosos; 2023 American Geriatrics Society Beers Criteria (J Am Geriatr Soc 2023). Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q47 da prova-unifesp-2026
{
  id:"q-adap26-047", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-ginecologia", assuntoId:"ass-ciclomenstrual",
  enunciado:"Adolescente, 16 anos de idade, é levada à consulta por ausência de menstruação. Exame físico: estatura de 168 cm, mamas em estádio 4 de Tanner, pelos pubianos e axilares ausentes, genitália externa feminina e vagina em fundo cego com 3 cm. A ultrassonografia pélvica não mostra útero e visualiza estruturas ovais nas regiões inguinais. Exames: FSH normal, LH discretamente elevado e testosterona total de 580 ng/dL. Qual é o diagnóstico mais provável?",
  alternativas:[{id:"A",texto:"Síndrome de Turner, pela amenorreia primária e pela ausência de pelos axilares e pubianos."},{id:"B",texto:"Síndrome de insensibilidade completa aos androgênios, pela testosterona em nível masculino."},{id:"C",texto:"Síndrome de Mayer-Rokitansky-Küster-Hauser, pela ausência de útero e pela vagina curta."},{id:"D",texto:"Disgenesia gonadal pura 46,XX, pela ausência de desenvolvimento mamário e uterino."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: amenorreia primária com **mamas desenvolvidas (Tanner 4)**, **ausência de pelos pubianos e axilares**, **vagina em fundo cego**, **ausência de útero** e **testosterona masculina (580 ng/dL)** com gônadas inguinais: cariótipo 46,XY com testículos que produzem testosterona, mas com receptor de androgênio não funcional (insensibilidade completa). A aromatização periférica da testosterona em estradiol explica as mamas; a ausência de útero decorre do hormônio antimülleriano produzido pelos testículos. Os testículos têm risco de neoplasia (gonadoblastoma) e são removidos após a puberdade, com reposição estrogênica. A alternativa A está errada: na síndrome de Turner há baixa estatura, mamas imaturas e FSH elevado, com útero presente. A alternativa C está errada: na síndrome de Mayer-Rokitansky-Küster-Hauser (46,XX) há pelos normais e testosterona feminina. A alternativa D está errada: na disgenesia 46,XX há útero presente, mamas imaturas e FSH elevado.",
  explicacoesAlternativas:{},
  referencias:"Practice Committee of the American Society for Reproductive Medicine. Current evaluation of amenorrhea (Fertil Steril 2008); Hughes IA et al. Androgen insensitivity syndrome (Lancet 2012); FEBRASGO, Tratado de Ginecologia, capítulo de amenorreia. Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q48 da prova-unifesp-2026
{
  id:"q-adap26-048", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-ginecologia", assuntoId:"ass-uroginecologia",
  enunciado:"Mulher, 54 anos de idade, G3P3 de partos vaginais, queixa-se de perda de urina aos esforços (tosse, espirro e corrida), cerca de 3 vezes por dia, há 3 anos, sem urgência nem noctúria. Há 6 meses faz exercícios do assoalho pélvico orientados por fisioterapeuta, sem melhora importante. Exame físico: perda de urina à manobra de Valsalva com a bexiga cheia, prolapso de parede vaginal anterior em estádio I (POP-Q) e exame de urina normal. O resíduo pós-miccional é de 20 mL. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Prescrição de anticolinérgico de longa ação, que aumenta a capacidade e a pressão de fechamento uretral."},{id:"B",texto:"Manter a fisioterapia por mais um ano, pois o resultado definitivo aparece somente depois de 18 meses."},{id:"C",texto:"Cirurgia de sling de uretra média, por via retropúbica ou transobturatória."},{id:"D",texto:"Injeção de toxina botulínica na parede da bexiga, indicada para incontinência de esforço refratária."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: perda urinária **aos esforços** (tosse, espirro e corrida), sem urgência, com **teste de esforço positivo**, sem prolapso significativo (estádio I) e **resíduo pós-miccional baixo (20 mL)**, depois de **6 meses de treinamento do assoalho pélvico sem melhora**: incontinência urinária de esforço, com falha do tratamento conservador. Nesse cenário, a cirurgia de **sling de uretra média** (retropúbico ou transobturatório) tem taxa de cura objetiva de cerca de 80 a 90% e é o procedimento de escolha. É preciso afastar infecção, avaliar o resíduo e orientar sobre complicações, como disfunção miccional e extrusão da tela. A urodinâmica não é exigida na incontinência de esforço pura e não complicada. A alternativa A está errada: o anticolinérgico trata bexiga hiperativa e não aumenta a pressão de fechamento uretral. A alternativa B está errada: manter por mais um ano o que não funcionou em seis meses atrasa o tratamento. A alternativa D está errada: a toxina botulínica é opção para bexiga hiperativa refratária, e não para incontinência de esforço.",
  explicacoesAlternativas:{},
  referencias:"Nambiar AK et al. EAU Guidelines on Assessment and Nonsurgical Management of Urinary Incontinence (Eur Urol 2022); Kobashi KC et al. Surgical Treatment of Female Stress Urinary Incontinence: AUA/SUFU Guideline (J Urol 2017); FEBRASGO, Incontinência urinária de esforço. Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q49 da prova-unifesp-2026
{
  id:"q-adap26-049", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-abortamento",
  enunciado:"Mulher, 22 anos de idade, chega ao pronto-socorro com febre de 39 °C, dor pélvica e sangramento vaginal com odor fétido há 2 dias, após tentar interromper a gestação com um objeto introduzido na vagina. Exame: PA 98 x 60 mmHg, FC 118 bpm, útero doloroso e amolecido, colo entreaberto com saída de secreção purulenta e restos ovulares, sem sinais de peritonite. A ultrassonografia mostra conteúdo heterogêneo na cavidade uterina, sem líquido livre. Leucócitos de 19.000/mm³. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Antibioticoterapia oral e alta hospitalar, com esvaziamento uterino eletivo após a resolução da febre, em sete dias."},{id:"B",texto:"Esvaziamento uterino imediato sem antibiótico, pois a retirada dos restos é suficiente para controlar a infecção."},{id:"C",texto:"Antibiótico venoso de amplo espectro, como clindamicina com gentamicina, e esvaziamento uterino precoce por aspiração."},{id:"D",texto:"Histerectomia total imediata, que é o tratamento padrão do abortamento infectado com sinais de sepse."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: manobra abortiva prévia, **febre de 39 °C**, dor pélvica, sangramento **fétido**, útero doloroso e amolecido, colo entreaberto com **secreção purulenta e restos ovulares**, **leucocitose de 19.000/mm³** e **PA de 98 x 60 mmHg**: abortamento infectado, com infecção ainda restrita ao útero e aos anexos (sem peritonite) e com sinais iniciais de sepse (pelo qSOFA, a pressão sistólica de 100 mmHg ou menos soma 1 ponto; FR e consciência não foram descritas). A conduta combina **antibiótico venoso de amplo espectro**, que cubra anaeróbios, Gram-negativos e Gram-positivos (esquema do Ministério da Saúde: clindamicina 900 mg a cada 8 horas com gentamicina 5 mg/kg uma vez ao dia, acrescentando ampicilina ou penicilina se necessário), e **esvaziamento uterino precoce**, em geral por aspiração, depois das primeiras doses do antibiótico, pois os restos ovulares mantêm o foco infeccioso. Além disso, reposição de volume, hemocultura e vigilância do choque séptico. A alternativa A está errada: o abortamento infectado com sinais sistêmicos exige internação e antibiótico venoso, e adiar o esvaziamento mantém o foco. A alternativa B está errada: operar sem cobertura antibiótica favorece a bacteremia durante a manipulação uterina. A alternativa D está errada: a histerectomia é reservada a perfuração com peritonite, gangrena ou abscesso, miometrite necrosante e falha do tratamento, e não à primeira abordagem.",
  explicacoesAlternativas:{},
  referencias:"Ministério da Saúde, Atenção humanizada ao abortamento: norma técnica, 2ª ed. (2011); WHO, Abortion care guideline (2022); FEBRASGO, Abortamento infectado. Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q50 da prova-unifesp-2026
{
  id:"q-adap26-050", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-sangramentos",
  enunciado:"Mulher, 28 anos de idade, G2P1, teve parto vaginal de recém-nascido a termo com manejo ativo do terceiro período, mas a placenta não foi expulsa após 40 minutos, e há sangramento vaginal ativo estimado em 700 mL. Exame: PA 106 x 64 mmHg, FC 104 bpm, útero contraído, na altura do umbigo, sem sinais de inversão. Já foi puncionada com dois acessos calibrosos e recebeu ocitocina. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Aguardar a dequitação espontânea por mais 60 minutos, mantendo a infusão de ocitocina e a observação."},{id:"B",texto:"Curetagem uterina com cureta cortante no centro cirúrgico, sem anestesia prévia, para esvaziar a cavidade."},{id:"C",texto:"Administração de misoprostol por via retal e observação por 30 minutos antes de qualquer manobra."},{id:"D",texto:"Remoção manual da placenta sob analgesia adequada, com antibiótico profilático e ocitocina para contrair o útero."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: placenta **retida por 40 minutos** (acima de 30 minutos define retenção placentária), **sangramento ativo de 700 mL** (hemorragia pós-parto: perda acima de 500 mL no parto vaginal, ou 1.000 mL em qualquer via) e útero **contraído**, o que afasta atonia como causa principal e sugere retenção do tecido. A conduta é a **remoção manual** da placenta, com analgesia ou anestesia, sob técnica asséptica, com dose única de antibiótico profilático (cefazolina ou ampicilina) e ocitocina após a retirada, para promover a contração. Em seguida, examina-se a placenta e a cavidade, para afastar restos e acretismo. A alternativa A está errada: esperar mais 60 minutos com sangramento ativo é perigoso. A alternativa B está errada: a curetagem cortante às cegas aumenta o risco de perfuração, e a remoção manual é o primeiro passo. A alternativa C está errada: o misoprostol é para atonia, e não resolve a retenção com hemorragia ativa.",
  explicacoesAlternativas:{},
  referencias:"WHO recommendations for the prevention and treatment of postpartum haemorrhage (2012, atualização 2017); ACOG Practice Bulletin 183: Postpartum hemorrhage (Obstet Gynecol 2017); FEBRASGO, Hemorragia pós-parto. Nível de confirmação: memória. Em outubro de 2025 saíram as recomendações consolidadas OMS/FIGO/ICM sobre hemorragia pós-parto (51 recomendações, 20 novas ou atualizadas), que mandam agir já com 300 mL de perda ou sinais vitais alterados e acionar o pacote MOTIVE logo após o diagnóstico, segundo fontes secundárias em 29/10/2026; doses e condutas específicas não foram conferidas no texto.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q51 da prova-unifesp-2026
{
  id:"q-adap26-051", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-ginecologia", assuntoId:"ass-infertilidade",
  enunciado:"Mulher, 27 anos de idade, tenta engravidar há 18 meses, com ciclos menstruais de 45 a 90 dias, hirsutismo moderado e IMC de 31 kg/m². A ultrassonografia mostra ovários com 14 folículos de 2 a 9 mm em cada um; a histerossalpingografia mostra trompas pérvias, e o espermograma do parceiro é normal. A progesterona na fase lútea presumida é de 0,8 ng/mL, e a prolactina e o TSH são normais. Qual é o tratamento de primeira linha para a indução da ovulação?",
  alternativas:[{id:"A",texto:"Metformina isolada, que restaura a ovulação na maioria das mulheres com resistência à insulina."},{id:"B",texto:"Letrozol associado a medidas para perda de peso e mudança do estilo de vida."},{id:"C",texto:"Fertilização in vitro imediata, pois o tempo de tentativa superou doze meses."},{id:"D",texto:"Gonadotrofinas exógenas desde o primeiro ciclo, em dose baixa e com monitorização folicular."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **ciclos de 45 a 90 dias** (oligo-ovulação), **hirsutismo**, ovários com **muitos folículos pequenos** e **progesterona de 0,8 ng/mL** (abaixo de 3 ng/mL na fase lútea indica anovulação), com trompas pérvias, espermograma normal e exclusão de hiperprolactinemia e de doença da tireoide: síndrome dos ovários policísticos (critérios de Rotterdam: dois de três entre oligo-anovulação, hiperandrogenismo e ovário policístico) com infertilidade anovulatória. A diretriz internacional de 2023 recomenda o **letrozol** como primeira linha para indução da ovulação (maior taxa de nascidos vivos que o clomifeno), associado a mudança do estilo de vida e perda de peso. O clomifeno é a alternativa; as gonadotrofinas e a cirurgia ovariana são segunda linha; a fertilização in vitro é terceira linha. A alternativa A está errada: a metformina isolada tem eficácia inferior para a ovulação e a gestação. A alternativa C está errada: a fertilização in vitro é reservada à falha das etapas anteriores. A alternativa D está errada: as gonadotrofinas têm risco maior de gestação múltipla e hiperestímulo.",
  explicacoesAlternativas:{},
  referencias:"Teede HJ et al. Recommendations from the 2023 international evidence-based guideline for the assessment and management of polycystic ovary syndrome (Hum Reprod 2023); Legro RS et al. Letrozole versus clomiphene for infertility in the polycystic ovary syndrome (N Engl J Med 2014). Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q52 da prova-unifesp-2026
{
  id:"q-adap26-052", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-planfamiliar", assuntoId:"ass-contracepcao",
  enunciado:"Mulher, 26 anos de idade, IMC de 34 kg/m², teve relação sexual sem proteção há 4 dias (cerca de 90 horas), durante o período fértil de seu ciclo regular. Está preocupada com a possibilidade de gravidez e procura o serviço de saúde. Não há contraindicação a nenhum método. Qual é a opção de maior eficácia para evitar a gravidez?",
  alternativas:[{id:"A",texto:"Inserção do dispositivo intrauterino de cobre em até cinco dias da relação sexual desprotegida."},{id:"B",texto:"Levonorgestrel 1,5 mg em dose única, que tem a mesma eficácia nas primeiras 120 horas."},{id:"C",texto:"Método de Yuzpe, com dose elevada de etinilestradiol e levonorgestrel em duas tomadas."},{id:"D",texto:"Anticoncepcional oral combinado diário a partir da próxima menstruação, associado a preservativo."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: relação desprotegida há **90 horas** (acima de 72 horas), em período fértil, e **IMC de 34 kg/m²** (obesidade). A eficácia do levonorgestrel cai com o tempo e é menor em mulheres com IMC igual ou maior que 30 kg/m²; o método de Yuzpe é menos eficaz e com mais efeitos adversos. O **DIU de cobre**, inserido em até **5 dias** da relação desprotegida (ou até 5 dias da ovulação estimada), tem eficácia superior a 99%, independe do peso e do tempo dentro dessa janela e oferece contracepção contínua depois. O acetato de ulipristal é alternativa oral que mantém a eficácia por 120 horas, porém inferior ao DIU. A alternativa B está errada: o levonorgestrel é ativo até 120 horas, mas a eficácia cai depois de 72 horas e na obesidade. A alternativa C está errada: o método de Yuzpe é a opção menos eficaz e é pouco usado. A alternativa D está errada: não é contracepção de emergência, e a paciente ficaria exposta ao risco de gravidez até a menstruação.",
  explicacoesAlternativas:{},
  referencias:"WHO. Selected practice recommendations for contraceptive use, 3ª ed. (2016); Glasier A et al. Can we identify women at risk of pregnancy despite using emergency contraception? (Contraception 2011); FEBRASGO, Manual de anticoncepção; Ministério da Saúde, Anticoncepção de emergência. Nível de confirmação: memória. A 4ª edição das Selected Practice Recommendations da OMS foi publicada em novembro de 2025 (ISBN 978-92-4-011560-6), segundo o catálogo da OMS em 29/10/2026; o conteúdo sobre ulipristal, levonorgestrel e IMC não foi conferido nela.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q53 da prova-unifesp-2026
{
  id:"q-adap26-053", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-oncogineco", assuntoId:"ass-cacolo",
  enunciado:"Mulher, 31 anos de idade, G2P2, com citologia cervical que mostrou lesão intraepitelial de alto grau. Foi encaminhada à colposcopia, que é satisfatória: a junção escamocolunar é totalmente visível, e há área acetobranca densa em lábio anterior, com mosaico grosseiro e punctuação, que ocupa dois quadrantes do colo, sem extensão para o canal. A biópsia dirigida mostra neoplasia intraepitelial cervical grau 3 (NIC 3), com margens não avaliadas. A paciente não deseja novas gestações imediatamente. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Histerectomia total, por ser o tratamento definitivo da neoplasia intraepitelial de alto grau."},{id:"B",texto:"Destruição da lesão com criocauterização, mantendo a citologia semestral nos dois anos seguintes."},{id:"C",texto:"Excisão da zona de transformação por cirurgia de alta frequência (tipo 1 ou 2), com análise histológica da peça."},{id:"D",texto:"Acompanhamento com citologia e colposcopia a cada seis meses, por tratar-se de lesão que costuma regredir."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: citologia de alto grau, colposcopia **satisfatória** (junção escamocolunar totalmente visível), lesão com achados de alto grau (**acetobranco denso, mosaico grosseiro, punctuação**) restrita ao ectocérvice, sem extensão para o canal, e biópsia com **NIC 3**. A conduta é a **excisão da zona de transformação** (exérese com alça de alta frequência), que remove a lesão e fornece a peça para estudo histológico, com avaliação das margens e exclusão de invasão. Quando a zona de transformação é do tipo 1 ou 2 (visível por inteiro), a excisão é do tipo 1 ou 2; a conização (tipo 3) é reservada à zona de transformação tipo 3, quando se suspeita de lesão glandular ou invasão. O método ver e tratar é aceitável nas lesões de alto grau. A alternativa A está errada: a histerectomia é desproporcional e não é tratamento inicial da NIC 3. A alternativa B está errada: os métodos destrutivos não fornecem material para histologia e não são indicados na lesão de alto grau com suspeita de invasão não excluída. A alternativa D está errada: o NIC 3 tem risco elevado de progressão, e a observação é para NIC 1 e NIC 2 em mulheres jovens selecionadas.",
  explicacoesAlternativas:{},
  referencias:"Ministério da Saúde/INCA, Diretrizes brasileiras para o rastreamento do câncer do colo do útero, 2ª ed. (2016) para o manejo das lesões; a atualização de 2025 (Portaria Conjunta SAES/SECTICS nº 13/2025) trata do rastreamento, e a parte de manejo está em revisão; Perkins RB et al. 2019 ASCCP risk-based management consensus guidelines (J Low Genit Tract Dis 2020). Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q54 da prova-unifesp-2026
{
  id:"q-adap26-054", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-trabalhoparto",
  enunciado:"Primigesta de 40 semanas, com bolsa rota há 8 horas, está em trabalho de parto com 4 contrações de 50 segundos em 10 minutos, de forte intensidade à palpação. Há 4 horas, o toque vaginal mostrava dilatação de 7 cm, apresentação cefálica no plano 0 de De Lee e colo fino. Agora, o toque mostra dilatação de 7 cm, o mesmo plano e importante bossa serossanguínea. A cardiotocografia é categoria I, e a pelve é clinicamente adequada. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Amniotomia, pois a bolsa íntegra é a causa mais frequente da parada de progressão no trabalho de parto."},{id:"B",texto:"Parto cesáreo, por parada secundária da dilatação com contrações adequadas e rotura das membranas."},{id:"C",texto:"Aplicação de fórceps de alívio, que corrige a desproporção e acelera o desprendimento do polo cefálico."},{id:"D",texto:"Conduta expectante por mais quatro horas, mantendo a analgesia e reavaliando a dilatação a cada duas horas."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: fase ativa (dilatação de **7 cm**, acima de 6 cm), **4 contrações de 50 segundos em 10 minutos** (dinâmica adequada, com mais de 200 unidades Montevidéu), **sem modificação cervical nem descida por 4 horas** e bolsa já rota: **parada secundária da dilatação**. Pelo consenso do ACOG/SMFM, o diagnóstico exige, a partir de 6 cm, membranas rotas e ausência de modificação cervical por **4 horas ou mais com contrações adequadas** (ou 6 horas ou mais com ocitocina e contrações inadequadas). A conduta é o parto cesáreo, porque a bolsa já está rota e a dinâmica está adequada, o que afasta a hipodinamia como causa. A bossa serossanguínea importante é sinal de desproporção cefalopélvica funcional. A alternativa A está errada: a bolsa já está rota. A alternativa C está errada: o fórceps exige dilatação completa e plano baixo. A alternativa D está errada: continuar esperando expõe a mãe e o feto a infecção e sofrimento sem razão.",
  explicacoesAlternativas:{},
  referencias:"ACOG/SMFM Obstetric Care Consensus No. 1: Safe prevention of the primary cesarean delivery (Obstet Gynecol 2014); ACOG Practice Bulletin 217: Prelabor rupture of membranes; Ministério da Saúde, Diretrizes Nacionais de Assistência ao Parto Normal (2017). Nível de confirmação: memória. Buscas na web em 29/10/2026 não localizaram revisão posterior do Practice Bulletin nº 217 (2020), dos corticoides antenatais (2017, reafirmados) nem do parecer sobre corioamnionite (2017); o texto oficial não foi aberto.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q55 da prova-unifesp-2026
{
  id:"q-adap26-055", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-dheg",
  enunciado:"Gestante de 35 anos, primigesta, com 35 semanas, chega à maternidade com cefaleia forte, dor no epigástrio e turvação visual há 6 horas. As medidas pressóricas foram de 168 x 112 mmHg, repetidas após 15 minutos, com reflexos tendinosos vivos, inchaço nas pernas, feto vivo e cardiotocografia categoria I. Laboratório: proteinúria de 2 g em 24 horas, plaquetas de 98.000/mm³, TGO de 118 U/L e creatinina de 1,1 mg/dL. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Anti-hipertensivo oral e alta com retorno semanal, aguardando o termo para a indução do parto."},{id:"B",texto:"Diazepam intravenoso para prevenção de convulsões e observação até que a pressão arterial se normalize."},{id:"C",texto:"Sulfato de magnésio, anti-hipertensivo rápido e interrupção da gestação após estabilizar a mãe."},{id:"D",texto:"Furosemida intravenosa para reduzir o edema e a pressão arterial, mantendo a gestação até 37 semanas."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **PA de 168 x 112 mmHg** (acima de 160 x 110 mmHg, grave), proteinúria, **cefaleia, epigastralgia e visão turva** (sintomas de iminência de eclâmpsia), **plaquetas de 98.000/mm³** (menor que 100.000/mm³) e **TGO de 118 U/L** (mais que o dobro do normal): pré-eclâmpsia **com sinais de gravidade**, com início de síndrome HELLP. O sulfato de magnésio é o fármaco de escolha para prevenir e tratar a eclâmpsia; a pressão grave persistente por mais de 15 minutos exige tratamento de urgência (hidralazina, nifedipino oral ou labetalol, meta de 140 a 150 x 90 a 100 mmHg); e, a partir de **34 semanas** com sinais de gravidade, a conduta é a interrupção da gestação, após estabilizar a mãe. A alternativa A está errada: sinais de gravidade exigem internação. A alternativa B está errada: o diazepam não é o fármaco de escolha e não previne convulsão tão bem quanto o magnésio. A alternativa D está errada: o diurético não trata a causa e reduz o volume plasmático, e não se deve aguardar o termo com sinais de gravidade.",
  explicacoesAlternativas:{},
  referencias:"ACOG Practice Bulletin 222: Gestational hypertension and preeclampsia (Obstet Gynecol 2020); WHO recommendations for prevention and treatment of pre-eclampsia and eclampsia (2011, 2018); FEBRASGO, Hipertensão na gestação. Nível de confirmação: memória. Não localizei substituição do ACOG Practice Bulletin nº 222 até 29/10/2026; uma revisão sistemática de 2026 no AJOG indica doses de aspirina de 75 a 162 mg/dia nas diretrizes internacionais, com início e critérios variáveis; o texto oficial não foi aberto.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q56 da prova-unifesp-2026
{
  id:"q-adap26-056", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-trabalhoparto",
  enunciado:"Gestante, 28 anos de idade, G2P1, com 38 semanas, em trabalho de parto com dilatação de 6 cm e bolsa rota há 19 horas, apresenta febre de 38,6 °C, calafrios e dor à palpação do fundo uterino. Exame: FC materna de 112 bpm e líquido amniótico com odor fétido ao toque. A cardiotocografia mostra linha de base fetal de 178 bpm, variabilidade moderada e ausência de desacelerações. Leucócitos de 17.800/mm³. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Cesariana imediata, pois a infecção intra-amniótica é indicação absoluta de via alta, sem esperar a evolução do trabalho de parto."},{id:"B",texto:"Antibiótico por via oral e conduta expectante até a dilatação completa, com antitérmicos e monitorização materna e fetal."},{id:"C",texto:"Ampicilina associada a gentamicina por via venosa e condução do parto, de preferência vaginal se a evolução permitir."},{id:"D",texto:"Antitérmico, hidratação e vigilância, deixando o antibiótico para depois do parto para não mascarar o diagnóstico no recém-nascido."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **febre materna de 38,6 °C** (de 38,0 a 38,9 °C, com um critério adicional), **leucocitose de 17.800/mm³** (acima de 15.000/mm³), **taquicardia fetal de 178 bpm** (acima de 160 bpm) e **líquido amniótico fétido**, com **bolsa rota há 19 horas** e dor uterina: infecção intra-amniótica (corioamnionite), diagnosticada pelo consenso «Triple I» (febre associada a um ou mais entre leucocitose materna, secreção cervical purulenta e taquicardia fetal). O tratamento é **antibiótico venoso imediato**, com ampicilina (2 g a cada 6 horas) associada a gentamicina (5 mg/kg uma vez ao dia), mantido no pós-parto conforme a evolução, e **condução do parto**: a infecção não é, por si, indicação de cesariana, que se reserva às indicações obstétricas habituais. O pediatra deve ser avisado, pois o recém-nascido tem risco de sepse. A alternativa A está errada: a cesariana não é obrigatória, e a via alta aumenta a morbidade materna. A alternativa B está errada: o antibiótico oral é insuficiente, e esperar a dilatação completa prolonga a exposição. A alternativa D está errada: o antibiótico intraparto reduz a sepse materna e neonatal, e adiar o tratamento é prejudicial.",
  explicacoesAlternativas:{},
  referencias:"Higgins RD et al. Evaluation and management of women and newborns with a maternal diagnosis of chorioamnionitis: summary of a workshop (Obstet Gynecol 2016); ACOG Committee Opinion 712: Intrapartum management of intraamniotic infection (Obstet Gynecol 2017); FEBRASGO, Corioamnionite. Nível de confirmação: memória. Buscas na web em 29/10/2026 não localizaram revisão posterior do Practice Bulletin nº 217 (2020), dos corticoides antenatais (2017, reafirmados) nem do parecer sobre corioamnionite (2017); o texto oficial não foi aberto.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q57 da prova-unifesp-2026
{
  id:"q-adap26-057", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-dmg",
  enunciado:"Mulher, 32 anos de idade, G2P1, no segundo dia após parto cesáreo a termo por indicação obstétrica, tem antecedente de diabetes gestacional diagnosticado com 26 semanas e tratado com insulina NPH desde a 30ª semana. Está estável, amamentando, com glicemias de jejum no puerpério de 82 e 88 mg/dL. Qual é a conduta mais adequada quanto ao diabetes?",
  alternativas:[{id:"A",texto:"Manter a insulina em metade da dose até a consulta de revisão do puerpério, por segurança."},{id:"B",texto:"Substituir a insulina por metformina em dose plena, que é compatível com a amamentação e deve ser mantida."},{id:"C",texto:"Suspender a insulina e repetir apenas a glicemia de jejum anual, pois o diabetes gestacional desaparece com o parto."},{id:"D",texto:"Suspender a insulina e realizar o teste oral de tolerância à glicose com 75 g entre 6 e 12 semanas do pós-parto."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: diabetes gestacional, sem diagnóstico prévio de diabetes, com **glicemias de jejum de 82 e 88 mg/dL** no puerpério (abaixo de 100 mg/dL). Após o parto, a resistência à insulina da gestação desaparece, e a insulina é **suspensa**, com acompanhamento da glicemia nos primeiros dias. A mulher com diabetes gestacional tem risco de persistência (diabetes tipo 2) ou de desenvolvimento futuro de 7 a 10 vezes maior, e deve fazer o **teste oral de tolerância à glicose com 75 g entre 6 e 12 semanas** após o parto (jejum e 2 horas), classificado pelos critérios habituais (jejum maior ou igual a 126 mg/dL ou 2 horas maior ou igual a 200 mg/dL é diabetes; 100 a 125 e 140 a 199 mg/dL é pré-diabetes). Depois, o rastreamento é repetido anualmente, e orientam-se dieta e atividade física. A alternativa A está errada: manter insulina com glicemias normais causa hipoglicemia. A alternativa B está errada: não há diagnóstico de diabetes a tratar nesse momento. A alternativa C está errada: sem seguimento, perde-se o diagnóstico da persistência do diabetes, e o rastreamento começa em 6 a 12 semanas, não no ano seguinte.",
  explicacoesAlternativas:{},
  referencias:"American Diabetes Association. Standards of Care in Diabetes 2025, seção 15: Management of diabetes in pregnancy (Diabetes Care 2025); Sociedade Brasileira de Diabetes, Diretriz 2023-2024; FEBRASGO/SBD, Rastreamento e diagnóstico de diabetes mellitus gestacional. Nível de confirmação: memória. As Standards of Care 2026 foram publicadas (Diabetes Care 2026;49 Suppl 1, dez/2025); a seção correspondente não foi conferida nelas (29/10/2026).",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q58 da prova-unifesp-2026
{
  id:"q-adap26-058", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-infecto", assuntoId:"ass-hiv",
  enunciado:"Gestante, 24 anos de idade, com 10 semanas, recebe o resultado de teste rápido para HIV positivo, confirmado por teste complementar. Assintomática, sem comorbidades. Exames: carga viral de 38.000 cópias/mL, linfócitos T CD4 de 520 células/mm³, creatinina normal e sorologias para hepatite B e C negativas. Qual é a conduta mais adequada quanto à terapia antirretroviral?",
  alternativas:[{id:"A",texto:"Iniciar tenofovir, lamivudina e dolutegravir imediatamente, mantendo o esquema durante toda a gestação."},{id:"B",texto:"Aguardar a 14ª semana para iniciar a terapia, evitando a exposição do embrião ao dolutegravir."},{id:"C",texto:"Iniciar a terapia somente se os linfócitos T CD4 caírem abaixo de 350 células/mm³ durante o pré-natal."},{id:"D",texto:"Prescrever zidovudina isolada a partir da 28ª semana, associada a zidovudina intravenosa durante o parto."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: HIV diagnosticado na gestação, **carga viral de 38.000 cópias/mL**, **CD4 de 520 células/mm³** (preservado) e sem comorbidades. Toda gestante com HIV deve iniciar a terapia antirretroviral **imediatamente**, independentemente do CD4 e da idade gestacional, porque o objetivo é suprimir a carga viral o mais rápido possível (carga viral indetectável no terceiro trimestre reduz a transmissão vertical a menos de 1%). O esquema preferencial no Brasil é **tenofovir + lamivudina + dolutegravir**, seguro em toda a gestação (os dados atuais não confirmam o risco de defeito do tubo neural inicialmente suspeito). A alternativa B está errada: atrasar o início aumenta a chance de transmissão, e o dolutegravir é seguro mesmo no primeiro trimestre. A alternativa C está errada: o limiar de CD4 foi abandonado. A alternativa D está errada: a monoterapia com zidovudina é esquema antigo e insuficiente; a zidovudina intravenosa no parto é reservada a carga viral maior que 1.000 cópias/mL ou desconhecida perto do parto.",
  explicacoesAlternativas:{},
  referencias:"Ministério da Saúde, Protocolo Clínico e Diretrizes Terapêuticas para Prevenção da Transmissão Vertical de HIV, Sífilis e Hepatites Virais (2022); DHHS Recommendations for the Use of Antiretroviral Drugs During Pregnancy and Interventions to Reduce Perinatal HIV Transmission in the United States (2024); Zash R et al., Tsepamo (N Engl J Med 2019). Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q59 da prova-unifesp-2026
{
  id:"q-adap26-059", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-diagnosticoprenatal",
  enunciado:"Gestante, 29 anos de idade, G3P2, tipo sanguíneo O negativo, com 24 semanas, teve dois partos anteriores sem imunoglobulina anti-D. O parceiro é Rh positivo. O Coombs indireto, antes negativo, está positivo com título de 1:32. A ultrassonografia não mostra hidropisia. Qual é a conduta mais adequada para avaliar a anemia fetal?",
  alternativas:[{id:"A",texto:"Amniocentese seriada para dosagem da bilirrubina no líquido amniótico, com análise pela curva de Liley."},{id:"B",texto:"Cordocentese imediata para dosagem de hemoglobina e hematócrito fetais e eventual transfusão intrauterina."},{id:"C",texto:"Doppler da velocidade de pico sistólico da artéria cerebral média do feto, repetido semanalmente."},{id:"D",texto:"Repetição do Coombs indireto a cada quatro semanas e indução do parto com 36 semanas."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: gestante **Rh negativo** com **dois partos prévios sem profilaxia**, parceiro Rh positivo e **Coombs indireto positivo com título de 1:32** (maior ou igual ao título crítico de 1:16): isoimunização com risco de anemia fetal. O padrão para detectar anemia fetal sem procedimento invasivo é o **Doppler da velocidade de pico sistólico da artéria cerebral média**, repetido a cada 1 a 2 semanas; valor acima de **1,5 múltiplo da mediana** indica anemia moderada a grave, com sensibilidade de cerca de 90%, e justifica a cordocentese com transfusão intrauterina. A análise do líquido amniótico por bilirrubina (curva de Liley) é um método invasivo que foi substituído pelo Doppler. A alternativa A está errada: a amniocentese é invasiva e pode aumentar a sensibilização. A alternativa B está errada: a cordocentese é reservada a casos com Doppler alterado, pelo risco de perda fetal. A alternativa D está errada: com título crítico não se aguarda quatro semanas, e a indução com 36 semanas não corresponde à conduta.",
  explicacoesAlternativas:{},
  referencias:"ACOG Practice Bulletin 192: Management of alloimmunization during pregnancy (Obstet Gynecol 2018); Mari G et al. Noninvasive diagnosis by Doppler ultrasonography of fetal anemia due to maternal red-cell alloimmunization (N Engl J Med 2000); FEBRASGO, Isoimunização Rh. Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q60 da prova-unifesp-2026
{
  id:"q-adap26-060", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-abdagudo", assuntoId:"ass-colecistite",
  enunciado:"Mulher, 55 anos de idade, procura o pronto-socorro com dor em hipocôndrio direito há 48 horas, febre de 38,2 °C e náuseas. Exame físico: estável hemodinamicamente, sinal de Murphy positivo, sem icterícia. Laboratório: leucócitos 14.800/mm³, PCR elevada, bilirrubina total de 1,0 mg/dL, creatinina normal. A ultrassonografia mostra cálculos na vesícula, parede espessada com 5 mm e líquido perivesicular, sem dilatação de vias biliares. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Antibioticoterapia oral, dieta leve e alta, com colecistectomia eletiva após seis semanas, sem internação."},{id:"B",texto:"Colecistectomia laparoscópica precoce, de preferência dentro dos primeiros dias do início dos sintomas."},{id:"C",texto:"Colecistostomia percutânea guiada por ultrassom, como tratamento definitivo para a paciente."},{id:"D",texto:"Colangiopancreatografia retrógrada endoscópica de urgência, para retirar eventuais cálculos no colédoco."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: dor no hipocôndrio direito há 48 horas, febre, **Murphy positivo**, leucocitose e ultrassonografia com cálculos, **parede espessada (acima de 4 mm)** e **líquido perivesicular**: colecistite aguda calculosa. Pelos critérios de Tóquio 2018, não há disfunção de órgão nem leucocitose acima de 18.000/mm³, massa palpável, duração acima de 72 horas ou inflamação local marcada, então é **grau I (leve)**. Em pacientes de baixo risco cirúrgico, o tratamento é a **colecistectomia laparoscópica precoce**, preferencialmente em até 72 horas e, no máximo, até 7 a 10 dias do início dos sintomas, com internação e antibiótico. A colecistectomia precoce reduz complicações e a internação total, em comparação com a tardia. A alternativa A está errada: o tratamento ambulatorial e a cirurgia tardia aumentam as reinternações. A alternativa C está errada: a colecistostomia é para pacientes de risco cirúrgico proibitivo ou com grau III. A alternativa D está errada: bilirrubina normal e vias biliares sem dilatação tornam a coledocolitíase improvável.",
  explicacoesAlternativas:{},
  referencias:"Yokoe M et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholecystitis (J Hepatobiliary Pancreat Sci 2018); Okamoto K et al. Tokyo Guidelines 2018: flowchart for the management of acute cholecystitis; Pisano M et al. 2020 World Society of Emergency Surgery updated guidelines for the diagnosis and treatment of acute calculus cholecystitis (World J Emerg Surg 2020). Nível de confirmação: memória. Não localizei atualização das Diretrizes de Tóquio posterior a 2018 até 29/10/2026.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q61 da prova-unifesp-2026
{
  id:"q-adap26-061", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-ortopedia", assuntoId:"ass-orto-coluna",
  enunciado:"Homem, 45 anos de idade, com lombalgia há 3 dias, procura o pronto-socorro porque desde ontem apresenta dormência na região das nádegas e da face interna das coxas, dificuldade para urinar com sensação de bexiga cheia e fraqueza em ambas as pernas. Exame físico: força de grau 3 em dorsiflexão dos pés bilateralmente, reflexos aquileus ausentes, hipoestesia perineal e tônus do esfíncter anal diminuído. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Repouso no leito, anti-inflamatório e analgésico, com reavaliação ambulatorial em sete dias."},{id:"B",texto:"Radiografia da coluna lombar e encaminhamento para fisioterapia motora, com orientação postural."},{id:"C",texto:"Infiltração epidural de corticoide guiada por imagem, como tratamento inicial da dor radicular."},{id:"D",texto:"Ressonância magnética de urgência e descompressão cirúrgica o mais cedo possível, em até 24 horas."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **anestesia em sela** (região glútea e face interna das coxas), **retenção urinária** com bexiga cheia, **fraqueza bilateral** dos membros inferiores, reflexos aquileus abolidos e **hipotonia do esfíncter anal**: síndrome da cauda equina, geralmente por hérnia discal central volumosa. É uma emergência cirúrgica, porque o prognóstico dos esfíncteres e da função motora depende da rapidez da descompressão. A ressonância magnética de urgência confirma o nível e a causa, e a descompressão deve ocorrer o mais cedo possível, idealmente em **até 24 horas** do início dos sintomas (48 horas é o limite superior); quando já há retenção urinária (síndrome completa, CES-R), o resultado funcional é pior, razão para não adiar. A alternativa A está errada: repouso e anti-inflamatório tratam a lombalgia comum e deixariam a compressão progredir, com risco de sequela permanente. A alternativa B está errada: a radiografia não mostra a compressão neural, e a fisioterapia não é tratamento da cauda equina. A alternativa C está errada: a infiltração epidural não descomprime a cauda equina e atrasa o tratamento cirúrgico.",
  explicacoesAlternativas:{},
  referencias:"Gardner A et al. Cauda equina syndrome: a review (Eur Spine J 2011); Todd NV. Cauda equina syndrome: the timing of surgery probably does influence outcome (Br J Neurosurg 2005); Sociedade Brasileira de Coluna, hérnia discal e síndrome da cauda equina. Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q62 da prova-unifesp-2026
{
  id:"q-adap26-062", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-genetica", assuntoId:"ass-genetica-heranca",
  enunciado:"Mulher, 26 anos de idade, saudável, está planejando a primeira gestação. O irmão dela tem hemofilia A (doença recessiva ligada ao X), e a mãe teve a variante causadora confirmada em teste molecular como portadora. A mulher ainda não fez o teste, e o marido é saudável, sem histórico familiar da doença. Qual é a probabilidade de o primeiro filho do casal, com sexo ainda desconhecido, ter hemofilia?",
  alternativas:[{id:"A",texto:"50%, pois a doença é transmitida pela mãe a metade dos seus descendentes."},{id:"B",texto:"25%, pois a mulher é portadora e um quarto dos seus filhos é afetado, de ambos os sexos."},{id:"C",texto:"6,25%, pois se multiplica ser portadora (1/2) por filho menino (1/2) e por herança (1/4)."},{id:"D",texto:"12,5%, pois a chance de ela ser portadora é de 1/2, e a de ter filho afetado é de 1/4."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: hemofilia A tem herança **recessiva ligada ao X**, e a **mãe é portadora confirmada**. A mulher recebeu da mãe um dos dois cromossomos X, e o pai não tem a doença; a chance de ela ser portadora é de **1/2**. Se for portadora, cada filho tem 1/2 de chance de herdar o X alterado: o filho homem fica afetado (1/2 de todas as crianças são meninos, então 1/2 x 1/2 = **1/4** de crianças afetadas) e a filha mulher fica portadora, geralmente sem doença. Probabilidade total de uma criança com hemofilia: 1/2 x 1/4 = **1/8, ou 12,5%**. Se o teste mostrar que ela é portadora, a probabilidade passa a 25% por criança; se não for portadora, a probabilidade é praticamente nula. O teste molecular muda a estimativa, e é por isso que se faz aconselhamento genético antes da gravidez. A alternativa A está errada: 50% é a chance de um filho homem de mãe portadora ser afetado, e não considera o sexo desconhecido nem a chance de a mulher ser portadora. A alternativa B está errada: 25% pressupõe que ela já seja portadora confirmada. A alternativa C está errada: 6,25% conta duas vezes a probabilidade de o filho ser menino.",
  explicacoesAlternativas:{},
  referencias:"Thompson & Thompson Genética Médica, 8ª ed.; Nussbaum RL et al., Genetics in Medicine; Sociedade Brasileira de Genética Médica. Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q63 da prova-unifesp-2026
{
  id:"q-adap26-063", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-medidasepi",
  enunciado:"Em um estudo de caso-controle sobre o uso de um fármaco no primeiro trimestre e malformação congênita, foram incluídos 100 casos e 100 controles. Entre os casos, 40 mães usaram o fármaco; entre os controles, 20 o usaram. Qual é a medida de associação adequada para esse delineamento e qual é o valor estimado?",
  alternativas:[{id:"A",texto:"Razão de chances de 2,0, calculada pela divisão entre a proporção de expostos nos casos e nos controles."},{id:"B",texto:"Razão de chances de 2,7, calculada pela razão entre os produtos cruzados da tabela dois por dois."},{id:"C",texto:"Risco relativo de 2,0, pois o estudo compara a incidência da malformação entre expostas e não expostas."},{id:"D",texto:"Diferença de risco de 20 pontos percentuais, que mede o excesso de casos atribuível à exposição."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: delineamento de **caso-controle**, com 100 casos e 100 controles escolhidos pelo desfecho, de modo que **não se conhece a incidência** da malformação entre expostas e não expostas. A medida de associação é a **razão de chances (odds ratio)**. Tabela dois por dois: casos expostos = 40, casos não expostos = 60, controles expostos = 20 e controles não expostos = 80. OR = (40 x 80) / (60 x 20) = 3.200 / 1.200 = **2,67**, ou seja, a chance de exposição ao fármaco é cerca de 2,7 vezes maior entre os casos. Quando a doença é rara, a razão de chances aproxima o risco relativo. Interpreta-se com o intervalo de confiança. A alternativa A está errada: 0,4 / 0,2 = 2,0 é a razão entre proporções de expostos, que não é a razão de chances (as chances são 0,67 e 0,25). A alternativa C está errada: o risco relativo exige a incidência nos dois grupos, que é calculada em coortes e ensaios, e não em caso-controle. A alternativa D está errada: a diferença de risco também exige incidências, e a proporção de casos é definida pelo investigador.",
  explicacoesAlternativas:{},
  referencias:"Gordis L. Epidemiology, 6ª ed.; Medronho RA et al. Epidemiologia, 2ª ed.; Szklo M, Nieto FJ. Epidemiology: Beyond the Basics, 3ª ed. Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q64 da prova-unifesp-2026
{
  id:"q-adap26-064", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-psiquiatria", assuntoId:"ass-psiq-substancias",
  enunciado:"Mulher, 35 anos de idade, é encontrada inconsciente no banheiro de casa, com seringa e garrote ao lado. Na chegada da ambulância: não responde a estímulos verbais, FR 6 irpm superficial, SpO2 82% em ar ambiente, FC 54 bpm, PA 96 x 58 mmHg, pupilas puntiformes e simétricas, marcas de punção venosa nos antebraços e glicemia capilar de 98 mg/dL. Qual é a conduta farmacológica mais adequada, além do suporte ventilatório?",
  alternativas:[{id:"A",texto:"Flumazenil intravenoso, para reverter o efeito de benzodiazepínicos como possível causa do quadro."},{id:"B",texto:"Fisostigmina intravenosa, que reverte a toxicidade anticolinérgica e a depressão respiratória."},{id:"C",texto:"Naloxona intravenosa ou intramuscular, em doses fracionadas, com reavaliação da ventilação a cada dose."},{id:"D",texto:"Carvão ativado por sonda nasogástrica, para reduzir a absorção do tóxico e evitar a parada respiratória."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **rebaixamento do nível de consciência**, **frequência respiratória de 6 irpm** (bradipneia), **pupilas puntiformes** e marcas de punção com seringa: tríade clássica da intoxicação por opioide (coma, miose e depressão respiratória), com glicemia normal que afasta hipoglicemia. A naloxona, antagonista competitivo dos receptores opioides, reverte a depressão respiratória em minutos. Dose inicial de 0,4 a 0,8 mg por via intravenosa, intramuscular ou intranasal (4 mg), repetida a cada 2 a 3 minutos; em usuário crônico, usam-se doses menores e fracionadas, para evitar abstinência aguda com agitação e edema pulmonar. A ventilação com bolsa-máscara é prioridade, e a observação deve ser prolongada, porque a meia-vida da naloxona (30 a 90 minutos) é menor que a de muitos opioides. A alternativa A está errada: o flumazenil reverte benzodiazepínicos e pode precipitar convulsões. A alternativa B está errada: a fisostigmina trata intoxicação anticolinérgica e não tem papel em opioides. A alternativa D está errada: o carvão ativado é inútil na via venosa e perigoso em paciente com via aérea desprotegida.",
  explicacoesAlternativas:{},
  referencias:"Boyer EW. Management of opioid analgesic overdose (N Engl J Med 2012); Ministério da Saúde, Protocolo clínico e diretrizes terapêuticas para manejo de intoxicações exógenas; WHO, Community management of opioid overdose (2014). Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q65 da prova-unifesp-2026
{
  id:"q-adap26-065", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-psiquiatria", assuntoId:"ass-psiq-humor",
  enunciado:"Homem, 34 anos de idade, com transtorno bipolar tipo I diagnosticado há 3 anos, em uso de lítio com litemia de 0,7 mEq/L, procura atendimento por quadro com 4 semanas de humor deprimido, anedonia, hipersonia, lentificação psicomotora, sentimento de culpa e ideação suicida passiva, sem ideação estruturada. Nega episódio maníaco nos últimos 12 meses e não tem sintomas psicóticos. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Manter o lítio e associar quetiapina ou lurasidona, que têm eficácia comprovada na depressão bipolar."},{id:"B",texto:"Substituir o lítio por fluoxetina em monoterapia, pois o paciente apresenta episódio depressivo maior."},{id:"C",texto:"Prescrever venlafaxina em dose alta, por apresentar maior eficácia na depressão grave com ideação suicida."},{id:"D",texto:"Indicar eletroconvulsoterapia de imediato, porque a ideação suicida é critério absoluto para o procedimento."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **transtorno bipolar tipo I** em uso de lítio com **litemia de 0,7 mEq/L** (na faixa terapêutica, de 0,6 a 1,2 mEq/L), agora em episódio depressivo de 4 semanas, com ideação suicida passiva e sem sintomas psicóticos. Na depressão bipolar, a primeira linha é otimizar o estabilizador e associar um fármaco com eficácia comprovada: **quetiapina** (300 mg/dia) ou **lurasidona**. Antidepressivo em monoterapia deve ser evitado, pois pode induzir virada maníaca ou ciclagem rápida; quando necessário, usa-se ISRS ou bupropiona sempre combinados a um estabilizador. Avaliam-se o risco de suicídio, a adesão e a função tireoidiana e renal. A alternativa B está errada: a monoterapia com antidepressivo e a retirada do lítio expõem o paciente ao risco de virada maníaca e de nova crise. A alternativa C está errada: a venlafaxina é o antidepressivo com maior risco de virada, e a monoterapia é contraindicada. A alternativa D está errada: a eletroconvulsoterapia é reservada para quadros graves, com risco iminente, catatonia ou resistência ao tratamento, e a ideação passiva não a indica de imediato.",
  explicacoesAlternativas:{},
  referencias:"Yatham LN et al. Canadian Network for Mood and Anxiety Treatments (CANMAT) and International Society for Bipolar Disorders (ISBD) 2018 guidelines for the management of patients with bipolar disorder (Bipolar Disord 2018); Associação Brasileira de Psiquiatria, Diretrizes de transtorno bipolar. Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q66 da prova-unifesp-2026
{
  id:"q-adap26-066", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-saudefamilia", assuntoId:"ass-saudetrabalhador",
  enunciado:"Trabalhador de 41 anos de idade, com carteira assinada em uma indústria de calçados, queixa-se de dor e formigamento nas mãos há 8 meses, que pioram com a atividade repetitiva de montagem e melhoram aos fins de semana. A eletroneuromiografia confirma síndrome do túnel do carpo bilateral, e o médico assistente conclui tratar-se de doença relacionada ao trabalho. A empresa recusa-se a emitir a Comunicação de Acidente de Trabalho (CAT). Qual é a conduta correta?",
  alternativas:[{id:"A",texto:"Aguardar a emissão da CAT pela empresa, pois só o empregador pode fazê-la, e orientar o trabalhador a procurar a Justiça."},{id:"B",texto:"O médico assistente, o trabalhador, os dependentes ou o sindicato podem emitir a CAT, e o caso deve ser notificado."},{id:"C",texto:"Registrar o diagnóstico apenas como doença comum, evitando conflito com o empregador e agilizando o afastamento pelo seguro."},{id:"D",texto:"Encaminhar o paciente à perícia do INSS, que emitirá a CAT automaticamente depois de avaliar o nexo causal."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: trabalhador **com carteira assinada**, síndrome do túnel do carpo bilateral **confirmada em exame**, sintomas que **pioram com o trabalho repetitivo e melhoram nos fins de semana** (nexo temporal): doença relacionada ao trabalho (distúrbio osteomuscular, LER/DORT). A empresa deve emitir a CAT até o primeiro dia útil seguinte ao diagnóstico, mas, **se houver omissão**, o art. 22 da Lei 8.213/1991 permite que a CAT seja emitida pelo próprio acidentado, seus dependentes, a entidade sindical, o médico assistente ou qualquer autoridade pública, sem prejuízo da multa ao empregador. Além disso, o agravo relacionado ao trabalho tem **notificação compulsória no Sinan**. A alternativa A está errada: o empregador não é o único que pode emitir a CAT. A alternativa C está errada: omitir o nexo é infração ética e prejudica o trabalhador. A alternativa D está errada: o INSS não emite a CAT automaticamente, e a perícia não dispensa a comunicação.",
  explicacoesAlternativas:{},
  referencias:"Lei 8.213/1991, art. 22, § 2º; Ministério da Saúde, Portaria de Consolidação GM/MS nº 4/2017 (lista de notificação compulsória, agravos relacionados ao trabalho); Ministério da Saúde, Protocolo de atenção à saúde dos trabalhadores expostos a LER/DORT. Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q67 da prova-unifesp-2026
{
  id:"q-adap26-067", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-bioetica", assuntoId:"ass-principiosbioetica",
  enunciado:"Adolescente de 15 anos de idade comparece sozinha a uma unidade básica de saúde e solicita ao médico um método contraceptivo. Relata vida sexual ativa há 6 meses com o namorado de 16 anos, em relação consensual. Diz que não deseja que os pais saibam e teme ser punida. Ela é capaz de compreender as informações, não há sinais de violência, e o médico já a orientou sobre preservativo e riscos. Qual é a conduta ética mais adequada?",
  alternativas:[{id:"A",texto:"Recusar a prescrição, pois menores de 18 anos só podem ser atendidos acompanhados dos responsáveis."},{id:"B",texto:"Comunicar os pais antes de prescrever, para que consintam, pois o médico deve informar sempre o responsável legal."},{id:"C",texto:"Atender, prescrever o método e manter o sigilo, por ser a paciente capaz de discernimento e não haver risco de dano."},{id:"D",texto:"Solicitar autorização judicial para a prescrição, já que a idade da paciente limita sua autonomia nas decisões."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: adolescente de **15 anos**, **capaz de compreender** as informações, com relação **consensual** com parceiro de 16 anos (sem violência nem desigualdade etária que caracterize estupro de vulnerável), que **pede sigilo**. O Código de Ética Médica (art. 74) veda revelar sigilo profissional relacionado a paciente menor de idade, inclusive a seus pais ou representantes legais, **desde que o menor tenha capacidade de discernimento**, salvo se a não revelação puder causar dano. O Estatuto da Criança e do Adolescente assegura o atendimento integral à saúde, e a lei de planejamento familiar garante o acesso à informação e aos métodos. O médico deve atender, orientar, prescrever e incentivar o diálogo com a família, sem obrigar. A alternativa A está errada: não se exige acompanhante para atender o adolescente, e a recusa fere o direito à saúde. A alternativa B está errada: informar os pais contra a vontade da paciente quebra o sigilo, sem justificativa. A alternativa D está errada: o atendimento não depende de autorização judicial.",
  explicacoesAlternativas:{},
  referencias:"Código de Ética Médica, Resolução CFM nº 2.217/2018, art. 74; Estatuto da Criança e do Adolescente (Lei 8.069/1990); Ministério da Saúde, Marco legal: saúde, um direito de adolescentes (2007); Lei 9.263/1996 (planejamento familiar). Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q68 da prova-unifesp-2026
{
  id:"q-adap26-068", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-desenhosestudo",
  enunciado:"Pesquisadores selecionaram 4.000 trabalhadores de uma indústria química, dos quais 2.000 eram expostos a um solvente e 2.000 não eram expostos, todos sem câncer de bexiga no início do estudo. Os participantes foram acompanhados por 15 anos, com registro dos novos casos da doença em cada grupo, e a incidência foi comparada entre eles. Qual é o delineamento desse estudo?",
  alternativas:[{id:"A",texto:"Estudo ecológico, pois compara grupos formados por trabalhadores de uma mesma indústria."},{id:"B",texto:"Estudo transversal, pois mede exposição e doença em um mesmo momento no tempo."},{id:"C",texto:"Estudo de caso-controle, pois compara o histórico de exposição de doentes e não doentes."},{id:"D",texto:"Estudo de coorte, com seleção por exposição e acompanhamento até o desfecho."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: população **sem a doença no início**, separada pela **exposição** (expostos e não expostos ao solvente), **acompanhada por 15 anos** até a ocorrência do desfecho (câncer de bexiga), com cálculo e comparação da **incidência** nos dois grupos: estudo de coorte. Permite medir diretamente a incidência, o risco relativo e o risco atribuível, e assegura a sequência temporal entre exposição e doença. Pode ser prospectivo (os casos ocorrem depois do início do estudo) ou retrospectivo (histórico, com dados já registrados), e suas limitações são o custo, a perda de seguimento e a ineficiência para doenças raras. A alternativa A está errada: no estudo ecológico, a unidade de análise é o grupo (por exemplo, municípios), com dados agregados, e não o indivíduo. A alternativa B está errada: o estudo transversal mede exposição e doença no mesmo momento e estima prevalência. A alternativa C está errada: no caso-controle, os participantes são selecionados pelo desfecho (doentes e não doentes), e não pela exposição.",
  explicacoesAlternativas:{},
  referencias:"Medronho RA et al. Epidemiologia, 2ª ed.; Gordis L. Epidemiology, 6ª ed.; Rothman KJ. Epidemiology: An Introduction, 2ª ed. Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q69 da prova-unifesp-2026
{
  id:"q-adap26-069", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-bioestatistica",
  enunciado:"Um ensaio clínico randomizou 90 adultos hipertensos em três grupos de 30 participantes (placebo, orientação alimentar e orientação alimentar associada a exercício físico supervisionado) e mediu a pressão arterial sistólica após 12 semanas. A variável tem distribuição aproximadamente normal e variâncias semelhantes nos grupos. Qual é o teste estatístico mais adequado para comparar as médias entre os três grupos?",
  alternativas:[{id:"A",texto:"Teste t de Student para amostras pareadas, usado na comparação antes e depois no mesmo participante."},{id:"B",texto:"Teste qui-quadrado de Pearson, usado para comparar proporções entre variáveis categóricas."},{id:"C",texto:"Coeficiente de correlação de Pearson, usado para medir a associação entre duas variáveis contínuas."},{id:"D",texto:"Análise de variância (ANOVA) de um fator, usada para comparar médias de três ou mais grupos."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: variável de desfecho **numérica contínua** (pressão arterial sistólica), com **distribuição normal** e variâncias homogêneas, comparada entre **três grupos independentes**. O teste adequado é a **análise de variância (ANOVA) de um fator**, que compara as médias de três ou mais grupos independentes ao mesmo tempo, e o resultado global é dado por uma estatística F. Fazer vários testes t entre pares inflaria o erro tipo I, que aumentaria de 5% para cerca de 14% com três comparações. Se a ANOVA for significativa, aplicam-se comparações múltiplas (Tukey, Bonferroni) para saber quais grupos diferem. Se a distribuição não fosse normal, a alternativa seria o teste de Kruskal-Wallis. A alternativa A está errada: o teste t pareado compara duas medidas no mesmo indivíduo, e aqui os grupos são independentes e são três. A alternativa B está errada: o qui-quadrado é para variáveis categóricas. A alternativa C está errada: a correlação mede associação entre duas variáveis, e não compara médias entre grupos.",
  explicacoesAlternativas:{},
  referencias:"Vieira S. Introdução à Bioestatística, 5ª ed.; Altman DG. Practical Statistics for Medical Research; Beaglehole R, Bonita R, Kjellstrom T. Epidemiologia Básica. Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q70 da prova-unifesp-2026
{
  id:"q-adap26-070", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-sus", assuntoId:"ass-principiossus",
  enunciado:"Uma unidade básica de saúde atende uma comunidade e oferece, a um mesmo usuário com hipertensão e diabetes, vacinação, grupo de caminhada, consultas de acompanhamento, exames laboratoriais, encaminhamento à cardiologia quando necessário e reabilitação após um evento cardiovascular, de forma articulada entre promoção, prevenção, cura e reabilitação. Qual princípio do Sistema Único de Saúde é contemplado por essa organização da atenção?",
  alternativas:[{id:"A",texto:"Universalidade, pelo acesso de todas as pessoas, sem discriminação, aos serviços."},{id:"B",texto:"Integralidade, pela articulação de ações de promoção, prevenção, cura e reabilitação."},{id:"C",texto:"Equidade, pela oferta desigual de recursos conforme a necessidade de cada grupo social."},{id:"D",texto:"Descentralização, pela transferência da gestão dos serviços para as instâncias municipais."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: o mesmo usuário recebe **promoção** (grupo de caminhada), **prevenção** (vacinação), **cura e controle** (consultas e exames), **referência** à atenção especializada e **reabilitação**, de forma articulada: é a definição de **integralidade** da atenção, prevista no art. 198 da Constituição e na Lei 8.080/1990, que implica o conjunto articulado e contínuo de ações e serviços preventivos e curativos, individuais e coletivos, em todos os níveis de complexidade. Também envolve olhar o indivíduo como um todo, e não a doença isolada. A alternativa A está errada: a universalidade trata do acesso de todos, sem barreiras de qualquer natureza. A alternativa C está errada: a equidade é tratar de forma desigual os desiguais, priorizando quem tem maior necessidade, o que não é o foco do enunciado. A alternativa D está errada: a descentralização é a diretriz que distribui o poder de decisão e a gestão entre as esferas de governo, e não descreve o cuidado a um usuário.",
  explicacoesAlternativas:{},
  referencias:"Constituição Federal de 1988, arts. 196 a 198; Lei 8.080/1990, art. 7º; Paim J et al. O sistema de saúde brasileiro: história, avanços e desafios (Lancet 2011). Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q71 da prova-unifesp-2026
{
  id:"q-adap26-071", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-abortamento",
  enunciado:"Mulher, 24 anos de idade, G1P0, com 16 semanas de gestação, realiza ultrassonografia morfológica que mostra ausência da calota craniana e dos hemisférios cerebrais, compatível com anencefalia. O laudo traz as imagens do perfil facial e do corte transversal do polo cefálico e é assinado por dois médicos. A gestante, esclarecida sobre o prognóstico, decide interromper a gestação. Com base na legislação e na jurisprudência brasileiras vigentes, qual é a orientação correta?",
  alternativas:[{id:"A",texto:"É vedada, pois o Código Penal só prevê excludente de ilicitude no risco à vida da gestante e na gravidez por estupro."},{id:"B",texto:"Depende de autorização judicial prévia em cada caso, solicitada pelo médico antes de realizar o procedimento."},{id:"C",texto:"É permitida por decisão da gestante, com diagnóstico de anencefalia por imagem, sem autorização judicial."},{id:"D",texto:"É permitida somente até 12 semanas de gestação, e depois desse prazo só se houver risco à vida da mãe."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: diagnóstico de **anencefalia** (ausência da calota craniana e dos hemisférios) por ultrassonografia, com **imagens do perfil facial e do corte transversal do polo cefálico** e laudo **assinado por dois médicos**, em gestante esclarecida que decide pela interrupção. O Código Penal (art. 128) prevê duas hipóteses de abortamento legal: **risco de vida da gestante** e gravidez **resultante de estupro**. Em 2012, na ADPF 54, o Supremo Tribunal Federal decidiu que a interrupção da gestação de feto anencéfalo **não é crime**, por ser atípica, e a Resolução CFM 1.989/2012 regula o procedimento: diagnóstico por ultrassonografia (a partir da 12ª semana), com fotografias do perfil fetal e do polo cefálico em corte transversal, e laudo assinado por dois médicos, e a gestante decide, **sem necessidade de autorização judicial**, em qualquer idade gestacional. A alternativa A está errada: ignora a decisão do STF, que acrescentou a hipótese de anencefalia. A alternativa B está errada: não é exigida autorização judicial. A alternativa D está errada: não há limite de idade gestacional na decisão do STF.",
  explicacoesAlternativas:{},
  referencias:"Brasil, Código Penal, art. 128; STF, ADPF 54 (2012); Conselho Federal de Medicina, Resolução CFM nº 1.989/2012. Nível de confirmação: memória; vigência não conferida em texto oficial.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q72 da prova-unifesp-2026
{
  id:"q-adap26-072", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-sus", assuntoId:"ass-farmacovigilancia",
  enunciado:"Um médico de uma unidade de pronto atendimento atende uma mulher de 52 anos que, dois dias após iniciar um novo anti-hipertensivo, apresentou edema de lábios e língua, sem dispneia. A suspeita é de angioedema por reação adversa ao medicamento, que é desconhecida pela bula do produto. O médico suspende o fármaco, trata o quadro e tem dúvida quanto ao nexo causal. Qual é a conduta mais adequada em relação à farmacovigilância?",
  alternativas:[{id:"A",texto:"Notificar apenas se a paciente evoluir para óbito ou internação prolongada, pois reações leves são esperadas."},{id:"B",texto:"Notificar a suspeita no VigiMed, o sistema de farmacovigilância da Anvisa, mesmo sem certeza do nexo causal."},{id:"C",texto:"Aguardar a confirmação do nexo por testes de provocação antes de qualquer notificação, para evitar dados incorretos."},{id:"D",texto:"Comunicar o caso apenas ao fabricante do medicamento, que é o responsável por notificar a autoridade sanitária."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: reação com **início 2 dias após o novo fármaco**, **desconhecida pela bula** (reação inesperada) e com nexo causal incerto. A farmacovigilância depende da **notificação espontânea de suspeitas** por profissionais de saúde e usuários: não é necessário ter certeza do nexo, e a notificação é recomendada para reações graves, inesperadas e ligadas a medicamentos novos. No Brasil, a notificação é feita pelo **VigiMed** (sistema de notificações da Anvisa, ligado à rede internacional da OMS), e a análise do nexo (algoritmo de Naranjo, por exemplo) cabe ao sistema e aos especialistas. Mesmo as reações já descritas em bula devem ser notificadas quando graves, e qualquer evento inesperado vale a notificação. A alternativa A está errada: a notificação não se limita a eventos fatais. A alternativa C está errada: o teste de provocação de um evento potencialmente grave é arriscado e não condiciona a notificação. A alternativa D está errada: o fabricante também tem a obrigação de notificar, mas isso não substitui a notificação do profissional.",
  explicacoesAlternativas:{},
  referencias:"Anvisa, VigiMed (RDC nº 406/2020, sobre as boas práticas de farmacovigilância para detentores de registro); Organização Mundial da Saúde, The importance of pharmacovigilance (2002); Naranjo CA et al. A method for estimating the probability of adverse drug reactions (Clin Pharmacol Ther 1981). Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q73 da prova-unifesp-2026
{
  id:"q-adap26-073", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-bioetica", assuntoId:"ass-principiosbioetica",
  enunciado:"Mulher, 42 anos de idade, testemunha de Jeová, lúcida e capaz, será submetida a histerectomia eletiva por miomatose. Em consulta pré-operatória, após ser informada dos riscos, assinou termo recusando transfusão de sangue e hemocomponentes, que consta no prontuário, e aceita outras medidas, como recuperação de sangue e agentes hemostáticos. Durante a cirurgia, ocorre sangramento volumoso e inesperado, com instabilidade hemodinâmica e risco de morte. A paciente está sob anestesia geral. Qual é a conduta ética e legal mais adequada?",
  alternativas:[{id:"A",texto:"Transfundir de imediato, pois o risco de morte prevalece sobre a autonomia da paciente em qualquer circunstância."},{id:"B",texto:"Solicitar ordem judicial para a transfusão, mesmo diante da urgência, para proteger legalmente a equipe médica."},{id:"C",texto:"Obter o consentimento do marido, que passa a decidir pela paciente enquanto ela estiver sob anestesia geral."},{id:"D",texto:"Respeitar a recusa registrada e usar todas as alternativas disponíveis sem hemocomponentes, documentando as medidas."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: paciente **adulta, lúcida e capaz**, que **manifestou previamente, por escrito, a recusa** de transfusão após ser informada dos riscos, com registro no prontuário; a situação de risco de morte surge **depois**, quando ela já não pode decidir. A autonomia é um princípio central da bioética e do Código de Ética Médica (art. 24 veda ao médico desrespeitar o direito do paciente de decidir livremente sobre sua pessoa ou seu bem-estar). A Resolução CFM 2.232/2019 reconhece o direito de recusa terapêutica do paciente capaz, inclusive em situações de risco de morte, desde que informada; a manifestação prévia é válida e deve ser cumprida (diretivas antecipadas). O art. 11 da resolução manda adotar as medidas necessárias em emergência com perigo iminente de morte, independentemente da recusa, mas esse dispositivo foi contestado, e a tese do STF no RE 1212272 (tema 1069, 2024, conhecida por resumos) é que a recusa livre, informada e inequívoca de paciente capaz, inclusive em diretiva antecipada, deve ser respeitada. Cabe empregar todas as alternativas: hemostasia cirúrgica, recuperação intraoperatória de sangue (se aceita), antifibrinolíticos, fatores sintéticos e cuidados intensivos. A alternativa A está errada: transfundir contra a vontade válida configura desrespeito à autonomia. A alternativa B está errada: a ordem judicial não é exigida se a paciente é capaz e se manifestou, e a urgência inviabilizaria o trâmite. A alternativa C está errada: o cônjuge não pode revogar a vontade de uma paciente capaz.",
  explicacoesAlternativas:{},
  referencias:"Código de Ética Médica, Resolução CFM nº 2.217/2018, arts. 22 e 24; Resolução CFM nº 2.232/2019 (recusa terapêutica); Resolução CFM nº 1.995/2012 (diretivas antecipadas de vontade). STF, RE 1212272 (tema 1069, 2024). Nível de confirmação: busca (resumos; o art. 11 e a tese do STF não foram lidos no texto oficial).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q74 da prova-unifesp-2026
{
  id:"q-adap26-074", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-medidasepi",
  enunciado:"Um estudo observacional encontrou risco relativo bruto de 2,1 para câncer de pulmão entre pessoas que consomem café em grande quantidade, em comparação com as que consomem pouco. Ao se estratificar pelo hábito de fumar, o risco relativo entre fumantes foi de 1,0 e entre não fumantes foi de 1,0. Sabe-se que fumar é mais frequente entre os que tomam muito café e causa câncer de pulmão. Em relação à associação entre café e câncer de pulmão, o tabagismo é uma variável:",
  alternativas:[{id:"A",texto:"modificadora de efeito, pois o risco relativo é diferente entre os estratos formados pelo hábito de fumar."},{id:"B",texto:"de confusão, pois distorce a associação observada entre o consumo de café e o câncer de pulmão."},{id:"C",texto:"de mediação, pois está no caminho causal entre o consumo de café e o câncer de pulmão."},{id:"D",texto:"indutora de viés de seleção, porque os participantes do estudo foram escolhidos pelo hábito de fumar."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: o risco bruto é **2,1**, mas, **depois da estratificação pelo tabagismo, o risco relativo cai para 1,0 em ambos os estratos**: a associação desaparece. Além disso, o tabagismo é **mais frequente entre os que tomam muito café** (associado à exposição), **causa câncer de pulmão** (associado ao desfecho) e **não é consequência do café** (não está na cadeia causal). Essas três condições definem uma **variável de confusão**. Ela distorce a medida de associação, que passa a ser espúria. Controla-se na análise (estratificação, ajuste multivariado) ou no delineamento (randomização, restrição, pareamento). Na modificação de efeito, as medidas dos estratos são diferentes entre si (e não se deve ajustá-las em uma só medida). A alternativa A está errada: os riscos relativos dos estratos são iguais (1,0 e 1,0), o que descarta modificação do efeito. A alternativa C está errada: a variável de mediação seria consequência do café e estaria no caminho até a doença. A alternativa D está errada: o viés de seleção decorre de como os participantes entram no estudo, e não da relação entre as variáveis.",
  explicacoesAlternativas:{},
  referencias:"Gordis L. Epidemiology, 6ª ed.; Medronho RA et al. Epidemiologia, 2ª ed.; Rothman KJ, Greenland S, Lash TL. Modern Epidemiology, 3ª ed. Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q75 da prova-unifesp-2026
{
  id:"q-adap26-075", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-bioestatistica",
  enunciado:"Em um ensaio clínico que comparou dois anti-hipertensivos, o resultado principal foi a diferença de pressão arterial sistólica entre os grupos, com valor de p igual a 0,03. Qual é a interpretação correta desse valor de p?",
  alternativas:[{id:"A",texto:"Se não houvesse diferença real, a probabilidade de observar uma diferença igual ou maior que a encontrada seria de 3%."},{id:"B",texto:"A probabilidade de a hipótese nula ser verdadeira, isto é, de não haver diferença entre os fármacos, é de 3%."},{id:"C",texto:"Existe 97% de chance de que um dos fármacos seja realmente superior ao outro, em qualquer paciente tratado."},{id:"D",texto:"A diferença encontrada é clinicamente relevante, pois o valor de p é menor do que o limiar de 0,05."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **p = 0,03**. O valor de p é a probabilidade de se obter um resultado **igual ou mais extremo** que o observado, **supondo que a hipótese nula seja verdadeira** (no caso, que não há diferença entre os fármacos). Com limiar de significância (alfa) de 0,05, p = 0,03 leva à rejeição da hipótese nula, ou seja, a diferença é estatisticamente significativa. O valor de p **não** mede a probabilidade de a hipótese nula ser verdadeira, nem a de o resultado ter ocorrido ao acaso, nem o tamanho ou a relevância clínica do efeito, que se avaliam pela magnitude da diferença e pelo intervalo de confiança. A alternativa B está errada: confunde a probabilidade dos dados dada a hipótese nula com a probabilidade da hipótese nula dados os dados. A alternativa C está errada: não existe tal interpretação, e o resultado vale para o grupo estudado, não para qualquer paciente. A alternativa D está errada: significância estatística não equivale à relevância clínica.",
  explicacoesAlternativas:{},
  referencias:"Wasserstein RL, Lazar NA. The ASA statement on p-values: context, process, and purpose (Am Stat 2016); Vieira S. Introdução à Bioestatística, 5ª ed.; Greenland S et al. Statistical tests, P values, confidence intervals, and power: a guide to misinterpretations (Eur J Epidemiol 2016). Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q76 da prova-unifesp-2026
{
  id:"q-adap26-076", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-medidasepi",
  enunciado:"Em uma população estável e numerosa, uma doença crônica tem incidência de 5 casos por 1.000 pessoas por ano. A duração média da doença, do diagnóstico à cura ou ao óbito, é de 4 anos, e o número de casos novos é constante ao longo do tempo. Qual é a prevalência aproximada da doença nessa população?",
  alternativas:[{id:"A",texto:"1,25 por 1.000, resultado da divisão da incidência pela duração média da doença."},{id:"B",texto:"9 por 1.000, resultado da soma entre a incidência e a duração média da doença."},{id:"C",texto:"20 por 1.000, resultado do produto da incidência pela duração média da doença."},{id:"D",texto:"0,8 por 1.000, resultado da divisão da duração média da doença pela incidência."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **população estável**, **incidência constante de 5 por 1.000 por ano** e **duração média de 4 anos**. Em situação de equilíbrio (incidência e duração constantes e população estável), a prevalência é aproximadamente o produto da incidência pela duração média: P = I x D = 5 por 1.000 por ano x 4 anos = **20 por 1.000** (2%). A relação mostra que a prevalência aumenta com a incidência e com a duração: um tratamento que prolonga a vida sem curar (como a terapia antirretroviral) aumenta a prevalência mesmo sem mudar a incidência, e uma doença muito letal ou de cura rápida tem prevalência baixa, ainda que a incidência seja alta. A fórmula vale em boa aproximação para prevalências pequenas (abaixo de cerca de 10%). A alternativa A está errada: dividir a incidência pela duração inverte a relação. A alternativa B está errada: somar grandezas com unidades diferentes não tem significado epidemiológico. A alternativa D está errada: dividir a duração pela incidência dá um número sem sentido, e a prevalência não pode ser maior que a soma dos casos novos acumulados durante o período de duração.",
  explicacoesAlternativas:{},
  referencias:"Medronho RA et al. Epidemiologia, 2ª ed.; Gordis L. Epidemiology, 6ª ed.; Rothman KJ. Epidemiology: An Introduction, 2ª ed. Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q77 da prova-unifesp-2026
{
  id:"q-adap26-077", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-sus", assuntoId:"ass-niveisatencao",
  enunciado:"Em uma Unidade Básica de Saúde, a equipe identifica que um usuário com insuficiência cardíaca foi atendido por três serviços diferentes no último mês. A equipe passa a agendar a consulta com o cardiologista, a acompanhar o resultado dos exames, a receber o relatório do especialista e a integrar essas informações ao plano de cuidado do paciente, mantendo o vínculo com ele. Qual atributo da atenção primária à saúde está sendo aplicado nesse conjunto de ações?",
  alternativas:[{id:"A",texto:"Longitudinalidade, pelo acompanhamento do paciente ao longo do tempo pela mesma equipe."},{id:"B",texto:"Acesso de primeiro contato, por ser a unidade o ponto de entrada preferencial no sistema."},{id:"C",texto:"Coordenação do cuidado, pela integração entre as informações e ações dos pontos da rede."},{id:"D",texto:"Orientação comunitária, pelo reconhecimento das necessidades da comunidade atendida."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: a equipe **agenda** o especialista, **acompanha** o resultado dos exames, **recebe a contrarreferência** e **integra** as informações ao plano de cuidado de um paciente atendido em vários serviços: é a **coordenação do cuidado**, atributo da atenção primária à saúde (Starfield) pelo qual a equipe organiza o fluxo e o contrafluxo do usuário entre os pontos da rede e garante a continuidade e a coerência das ações. Na Política Nacional de Atenção Básica (Portaria 2.436/2017), a APS é **ordenadora da rede e coordenadora do cuidado**. Os atributos essenciais são acesso de primeiro contato, longitudinalidade, integralidade e coordenação; os derivados são orientação familiar, orientação comunitária e competência cultural. A alternativa A está errada: a longitudinalidade é a relação contínua ao longo do tempo, com a mesma equipe; é parte do caso, mas não descreve a integração entre serviços. A alternativa B está errada: o acesso de primeiro contato é a porta de entrada. A alternativa D está errada: a orientação comunitária é um atributo derivado, que trata das necessidades da população do território.",
  explicacoesAlternativas:{},
  referencias:"Starfield B. Atenção primária: equilíbrio entre necessidades de saúde, serviços e tecnologia (UNESCO/Ministério da Saúde, 2002); Portaria GM/MS nº 2.436/2017 (Política Nacional de Atenção Básica); Mendes EV. As redes de atenção à saúde (OPAS, 2011). Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q78 da prova-unifesp-2026
{
  id:"q-adap26-078", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-desenhosestudo",
  enunciado:"Pesquisadores desejam avaliar se um novo anti-hipertensivo reduz a ocorrência de infarto agudo do miocárdio e de acidente vascular cerebral, em comparação com o tratamento convencional, em pacientes de alto risco cardiovascular. Querem minimizar a confusão e garantir que os grupos sejam comparáveis. Qual é o delineamento de estudo mais adequado?",
  alternativas:[{id:"A",texto:"Ensaio clínico randomizado, com alocação aleatória dos pacientes e acompanhamento até o desfecho."},{id:"B",texto:"Estudo de coorte prospectivo, com seleção dos pacientes conforme o medicamento que já utilizam."},{id:"C",texto:"Estudo de caso-controle, comparando o uso prévio do medicamento entre quem teve e quem não teve o evento."},{id:"D",texto:"Estudo ecológico, comparando a incidência de eventos entre cidades com maior e menor uso do fármaco."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: o objetivo é avaliar o **efeito de uma intervenção** (novo medicamento) sobre **desfechos clínicos** (infarto e AVC), e os pesquisadores querem **grupos comparáveis** e **minimizar a confusão**. O delineamento que testa intervenções com o menor risco de viés é o **ensaio clínico randomizado**: a alocação aleatória distribui entre os grupos, em média, tanto os fatores conhecidos quanto os desconhecidos, e o cegamento reduz o viés de aferição. Ocupa o topo da hierarquia de evidências para a eficácia de tratamentos. Suas limitações são o custo, o tempo e as restrições éticas. A alternativa B está errada: na coorte observacional, a escolha do medicamento depende de características do paciente e deixa confusão residual. A alternativa C está errada: o caso-controle é eficiente para doenças raras e tem viés de memória, e não é o padrão para avaliar eficácia. A alternativa D está errada: o estudo ecológico usa dados agregados e está sujeito à falácia ecológica.",
  explicacoesAlternativas:{},
  referencias:"Gordis L. Epidemiology, 6ª ed.; Medronho RA et al. Epidemiologia, 2ª ed.; Guyatt G et al. Users' Guides to the Medical Literature, 3ª ed.; Oxford Centre for Evidence-Based Medicine, Levels of evidence (2011). Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q79 da prova-unifesp-2026
{
  id:"q-adap26-079", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-desenhosestudo",
  enunciado:"Em um estudo de caso-controle sobre o uso de medicamentos no primeiro trimestre de gestação e malformações congênitas, as mães de crianças com malformação (casos) e as mães de crianças saudáveis (controles) foram entrevistadas sobre o que usaram durante a gravidez. Observou-se que as mães dos casos relatavam com mais detalhes e mais frequentemente o uso de medicamentos, mesmo de uso comum. Qual é o principal viés que pode explicar a diferença entre os grupos?",
  alternativas:[{id:"A",texto:"Viés de seleção, porque os controles foram escolhidos entre pessoas diferentes dos casos."},{id:"B",texto:"Viés de recordação, porque as mães de crianças com doença tendem a lembrar melhor das exposições."},{id:"C",texto:"Viés de confusão, porque o uso de medicamentos se associa à idade da mãe e à malformação."},{id:"D",texto:"Viés de aferição pelo entrevistador, que já conhece o diagnóstico e tem expectativa sobre a resposta."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: exposição obtida por **entrevista retrospectiva**, e os casos (mães de crianças com malformação) **relembram com mais detalhes** o uso de medicamentos do que os controles. É o **viés de recordação** (ou de memória), típico dos estudos de caso-controle: quem tem a doença procura causas e lembra-se melhor da exposição, o que superestima a associação. Atenua-se com o uso de registros objetivos (prontuários, dispensação em farmácia), questionários estruturados e controles com outra doença de mesma gravidade. A alternativa A está errada: o viés de seleção diz respeito à forma como casos e controles entram no estudo, e o enunciado descreve diferença na informação. A alternativa C está errada: a confusão é erro de interpretação causada por um terceiro fator, e não por diferença na qualidade do relato. A alternativa D está errada: o viés do entrevistador é possível, mas o enunciado aponta para a memória das entrevistadas, e não para a conduta de quem coleta o dado.",
  explicacoesAlternativas:{},
  referencias:"Gordis L. Epidemiology, 6ª ed.; Medronho RA et al. Epidemiologia, 2ª ed.; Sackett DL. Bias in analytic research (J Chronic Dis 1979). Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q80 da prova-unifesp-2026
{
  id:"q-adap26-080", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-bioestatistica",
  enunciado:"Um ensaio clínico com 20 pacientes por grupo não encontrou diferença estatisticamente significativa (p = 0,18) entre um novo fármaco e o placebo na redução da pressão arterial, embora estudos anteriores indiquem queda de cerca de 8 mmHg com o fármaco. Os autores concluíram que o fármaco «não funciona». Qual é o principal risco dessa conclusão e como evitá-lo?",
  alternativas:[{id:"A",texto:"Erro tipo I (alfa), pois o p acima de 0,05 indica falso-positivo; evita-se reduzindo o nível de significância."},{id:"B",texto:"Viés de seleção, pois a ausência de diferença decorre da randomização; evita-se com estudo observacional."},{id:"C",texto:"Viés de confusão, pois o placebo mascara o efeito do fármaco; evita-se pelo ajuste multivariado na análise."},{id:"D",texto:"Erro tipo II (beta), pois a amostra pequena reduz o poder; evita-se calculando o tamanho amostral previamente."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **20 pacientes por grupo** (amostra pequena), **p = 0,18** (não significativo) e um efeito esperado de **8 mmHg**, indicado por estudos anteriores: a ausência de significância pode refletir **baixo poder estatístico** e não a ausência de efeito. Esse é o **erro tipo II (beta)**: não rejeitar a hipótese nula quando ela é falsa. O poder do estudo é 1 - beta (em geral se busca 80% ou 90%) e depende do tamanho da amostra, da variabilidade, do efeito esperado e do nível de significância. Evita-se com o **cálculo do tamanho amostral antes do estudo**. O intervalo de confiança ajuda a interpretar: se incluir efeitos clinicamente importantes, o estudo é inconclusivo («ausência de evidência não é evidência de ausência»). A alternativa A está errada: o erro tipo I é rejeitar uma hipótese nula verdadeira (falso-positivo), o que não ocorreu aqui. A alternativa B está errada: a randomização reduz o viés de seleção. A alternativa C está errada: no ensaio randomizado, a confusão é controlada pela alocação aleatória, e o placebo é o controle.",
  explicacoesAlternativas:{},
  referencias:"Altman DG, Bland JM. Absence of evidence is not evidence of absence (BMJ 1995); Vieira S. Introdução à Bioestatística, 5ª ed.; Gordis L. Epidemiology, 6ª ed. Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q81 da prova-unifesp-2026
{
  id:"q-adap26-081", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-prevencao",
  enunciado:"O Ministério da Saúde estuda ampliar o rastreamento populacional para uma doença crônica. Uma equipe técnica é solicitada a indicar quais características da doença e do teste justificam a implantação de um programa organizado de rastreamento em pessoas assintomáticas. Considerando os critérios clássicos de Wilson e Jungner e as recomendações de prevenção secundária, qual das alternativas apresenta uma justificativa adequada?",
  alternativas:[{id:"A",texto:"Doença de alta incidência, mesmo sem tratamento eficaz, pois o diagnóstico precoce já traz benefício à população."},{id:"B",texto:"Teste muito sensível, ainda que com baixa especificidade, pois o excesso de falsos positivos não gera dano relevante."},{id:"C",texto:"Doença grave, ainda que o prognóstico seja igual quando tratada antes ou depois do aparecimento dos sintomas."},{id:"D",texto:"Doença com fase pré-clínica detectável e tratamento que, quando iniciado nessa fase, melhora o prognóstico."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: rastreamento é a **prevenção secundária** aplicada a pessoas **assintomáticas**, e só se justifica quando o benefício supera o dano. Entre os critérios de Wilson e Jungner (OMS, 1968): a doença deve ser um **problema importante de saúde**, com **fase pré-clínica reconhecível** (período em que o teste a detecta antes dos sintomas), **história natural conhecida**, **tratamento disponível e mais eficaz quando iniciado precocemente** que na fase sintomática, teste **aceitável, seguro e com desempenho adequado**, e custo-benefício favorável. Quando o prognóstico é o mesmo com tratamento precoce ou tardio, o rastreamento só antecipa o diagnóstico (viés de antecipação) e aumenta o tempo vivido com o rótulo da doença, sem benefício. A alternativa A está errada: sem tratamento eficaz, o diagnóstico precoce não muda o desfecho e causa dano. A alternativa B está errada: a baixa especificidade gera muitos falsos positivos, com ansiedade, exames invasivos e custos. A alternativa C está errada: a gravidade não basta; a mudança de prognóstico com a detecção precoce é o ponto central.",
  explicacoesAlternativas:{},
  referencias:"Wilson JMG, Jungner G. Principles and practice of screening for disease (OMS, 1968); Gordis L. Epidemiology, 6ª ed.; Medronho RA et al. Epidemiologia, 2ª ed.; Norman D, Tesser CD. Prevenção quaternária na atenção primária à saúde (Cad Saude Publica 2009). Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q82 da prova-unifesp-2026
{
  id:"q-adap26-082", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-infecto", assuntoId:"ass-imunizacao",
  enunciado:"Uma doença respiratória emergente tem número básico de reprodução (R0) estimado em 3. Há uma vacina com eficácia de 90% na proteção dos vacinados, distribuída de modo homogêneo na população. Para que a imunidade coletiva interrompa a transmissão sustentada, qual é a cobertura vacinal mínima aproximada necessária?",
  alternativas:[{id:"A",texto:"Aproximadamente 74%, pois o limiar de 67% deve ser dividido pela eficácia de 90%."},{id:"B",texto:"Aproximadamente 67%, pois a eficácia da vacina não altera o limiar de imunidade coletiva."},{id:"C",texto:"Aproximadamente 90%, igual à eficácia da vacina, que define a cobertura mínima necessária."},{id:"D",texto:"Aproximadamente 33%, valor do inverso do R0, que representa a fração de suscetíveis."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **R0 = 3** e **eficácia vacinal = 90%** (0,9). O limiar de imunidade coletiva é a fração da população que precisa estar imune: 1 - 1/R0 = 1 - 1/3 = **0,67 (67%)**. Como a vacina não protege 100% dos vacinados, a cobertura necessária é maior: cobertura = limiar / eficácia = 0,67 / 0,90 = **0,74 (cerca de 74%)**. Se a eficácia fosse de 100%, bastariam 67%. Quanto maior o R0, maior o limiar (R0 = 15 no sarampo exige cerca de 93 a 95%), e eficácia menor eleva a cobertura necessária, podendo torná-la inviável (acima de 100%) quando a eficácia é baixa. A alternativa B está errada: ignora a eficácia da vacina. A alternativa C está errada: igualar a cobertura à eficácia não tem fundamento. A alternativa D está errada: 1/R0 (33%) é a fração de suscetíveis que o limiar deixa na população imune, e não a fração que deve estar imune.",
  explicacoesAlternativas:{},
  referencias:"Fine P, Eames K, Heymann DL. «Herd immunity»: a rough guide (Clin Infect Dis 2011); Anderson RM, May RM. Infectious Diseases of Humans: Dynamics and Control; Medronho RA et al. Epidemiologia, 2ª ed. Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q83 da prova-unifesp-2026
{
  id:"q-adap26-083", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-neo-triagemneonatal",
  enunciado:"Recém-nascido de 8 dias de vida, a termo, é levado pela mãe à consulta porque o laboratório do Programa Nacional de Triagem Neonatal comunicou que o teste do pezinho apresentou TSH de 48 mUI/L em papel-filtro. O exame físico mostra pele seca e fria, fontanela posterior aberta e hipotonia discreta. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Repetir o teste do pezinho em 30 dias, pois resultados alterados na primeira coleta costumam normalizar sozinhos."},{id:"B",texto:"Coletar TSH e T4 livre séricos com urgência e iniciar levotiroxina ao confirmar, sem aguardar sinais mais evidentes."},{id:"C",texto:"Aguardar o surgimento de sintomas clássicos, como macroglossia e hérnia umbilical, antes de iniciar o tratamento."},{id:"D",texto:"Solicitar cintilografia da tireoide e ultrassonografia cervical, e só iniciar o tratamento após o resultado dos exames."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **TSH de 48 mUI/L no papel-filtro** (muito acima do corte de 10 mUI/L), recém-nascido de 8 dias com **pele seca e fria**, **fontanela posterior aberta** e **hipotonia**: suspeita de hipotireoidismo congênito, a causa mais comum de deficiência intelectual evitável. O tratamento deve começar **nas primeiras duas semanas de vida**, pois o atraso prejudica o neurodesenvolvimento. A conduta é convocar o bebê de imediato, coletar **TSH e T4 livre séricos** para confirmar, e iniciar **levotiroxina (10 a 15 mcg/kg/dia)** assim que confirmado, sem esperar exames de imagem ou sintomas; em TSH de triagem muito elevado, como aqui, não se retarda o início. A cintilografia ou o ultrassom definem a etiologia e podem ser feitos depois. A alternativa A está errada: repetir após 30 dias deixa o recém-nascido sem tratamento no período crítico. A alternativa C está errada: os sinais clássicos aparecem tardiamente, e o objetivo da triagem é tratar antes deles. A alternativa D está errada: os exames de imagem não devem retardar o início da levotiroxina.",
  explicacoesAlternativas:{},
  referencias:"Léger J et al. European Society for Paediatric Endocrinology consensus guidelines on screening, diagnosis, and management of congenital hypothyroidism (J Clin Endocrinol Metab 2014); Ministério da Saúde, Manual de normas técnicas e rotinas operacionais do Programa Nacional de Triagem Neonatal (2002); Sociedade Brasileira de Pediatria, Hipotireoidismo congênito. Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q84 da prova-unifesp-2026
{
  id:"q-adap26-084", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-transmissaoverticalhiv",
  enunciado:"Recém-nascido a termo, 3.250 g, filho de mulher com HIV que iniciou terapia antirretroviral na 8ª semana de gestação, com boa adesão e carga viral indetectável (abaixo de 50 cópias/mL) na 36ª semana. O parto foi vaginal, sem intercorrências, e a bolsa rota ocorreu 3 horas antes do nascimento. O recém-nascido está em ótimo estado geral. Qual é a profilaxia antirretroviral mais adequada para o recém-nascido?",
  alternativas:[{id:"A",texto:"Zidovudina, lamivudina e raltegravir por 4 semanas, esquema reservado a todos os recém-nascidos expostos."},{id:"B",texto:"Nevirapina isolada por 12 semanas, para cobrir o período de aleitamento e de maior risco de transmissão."},{id:"C",texto:"Zidovudina oral por 4 semanas, com início o mais precoce possível, nas primeiras horas de vida."},{id:"D",texto:"Nenhuma profilaxia, pois a carga viral materna indetectável elimina totalmente o risco de transmissão."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: mãe em terapia antirretroviral desde a **8ª semana** (mais de 12 semanas de uso antes do parto), com **carga viral indetectável no terceiro trimestre** e boa adesão, parto vaginal sem intercorrências: recém-nascido de **baixo risco** de transmissão vertical. Pelo Protocolo Clínico e Diretrizes Terapêuticas do Ministério da Saúde, o recém-nascido de baixo risco recebe **zidovudina oral por 4 semanas**, iniciada preferencialmente nas **primeiras 4 horas** de vida. O recém-nascido de **alto risco** (mãe sem terapia antirretroviral, com início tardio, carga viral acima de 1.000 cópias/mL ou desconhecida no final da gestação) recebe esquema com três fármacos (zidovudina, lamivudina e raltegravir ou nevirapina). A amamentação segue contraindicada no protocolo do Ministério da Saúde, com fornecimento de fórmula infantil pelo serviço (o texto do protocolo não foi aberto nesta revisão; nos Estados Unidos, desde 2023, admite-se a amamentação, após aconselhamento compartilhado, com carga viral sustentadamente indetectável). A alternativa A está errada: o esquema com três fármacos é para recém-nascidos de alto risco. A alternativa B está errada: a nevirapina isolada por 12 semanas não é esquema de profilaxia indicado. A alternativa D está errada: o risco é muito baixo, mas não nulo, e a profilaxia é recomendada a todos os expostos.",
  explicacoesAlternativas:{},
  referencias:"Ministério da Saúde, Protocolo Clínico e Diretrizes Terapêuticas para Prevenção da Transmissão Vertical de HIV, Sífilis e Hepatites Virais (2022); Sociedade Brasileira de Pediatria, Manual de HIV na infância. Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q85 da prova-unifesp-2026
{
  id:"q-adap26-085", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-neo-descrresp",
  enunciado:"Gestante, 28 anos de idade, G2P1, com 30 semanas e 4 dias, chega à maternidade com contrações regulares há 3 horas. Colo com 4 cm de dilatação e 80% de esvaecimento, bolsa íntegra, feto cefálico, cardiotocografia categoria I e sem sinais de infecção. Não recebeu nenhuma medicação. Além da profilaxia para o estreptococo do grupo B, qual é a medida que mais reduz a síndrome do desconforto respiratório e a mortalidade do recém-nascido?",
  alternativas:[{id:"A",texto:"Betametasona 12 mg por via intramuscular em duas doses, com 24 horas de intervalo, iniciada imediatamente."},{id:"B",texto:"Sulfato de magnésio em dose de ataque, que reduz a incidência da síndrome do desconforto respiratório neonatal."},{id:"C",texto:"Ampicilina intravenosa por sete dias, para prolongar a gestação e evitar a doença respiratória neonatal."},{id:"D",texto:"Repouso absoluto no leito com hidratação venosa, para interromper as contrações e adiar o nascimento."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **30 semanas e 4 dias** com **trabalho de parto prematuro em curso** (contrações regulares e colo com 4 cm), sem corticoide prévio. O **corticoide antenatal** (betametasona 12 mg por via intramuscular a cada 24 horas, 2 doses; ou dexametasona 6 mg a cada 12 horas, 4 doses) é indicado entre **24 e 34 semanas** com risco de parto em até 7 dias e reduz a síndrome do desconforto respiratório, a hemorragia intraventricular, a enterocolite necrosante e a mortalidade neonatal. O maior benefício vem quando o parto ocorre de 24 horas a 7 dias depois da primeira dose. A tocólise, se usada, serve para ganhar tempo para o corticoide ou para a transferência. O sulfato de magnésio, antes de 32 semanas, é dado para **neuroproteção fetal** (reduz paralisia cerebral), mas não reduz a doença respiratória. A alternativa B está errada: o magnésio protege o cérebro, e não o pulmão. A alternativa C está errada: com bolsa íntegra, o antibiótico não prolonga a gestação. A alternativa D está errada: o repouso e a hidratação não interrompem o trabalho de parto nem melhoram o desfecho.",
  explicacoesAlternativas:{},
  referencias:"ACOG Committee Opinion 713: Antenatal corticosteroid therapy for fetal maturation (Obstet Gynecol 2017); McGoldrick E et al. Antenatal corticosteroids for accelerating fetal lung maturation (Cochrane 2020); Ministério da Saúde, Diretrizes de atenção à gestante: prevenção do parto prematuro. Nível de confirmação: memória. Buscas na web em 29/10/2026 não localizaram revisão posterior do Practice Bulletin nº 217 (2020), dos corticoides antenatais (2017, reafirmados) nem do parecer sobre corioamnionite (2017); o texto oficial não foi aberto.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q86 da prova-unifesp-2026
{
  id:"q-adap26-086", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-reumato", assuntoId:"ass-reumato-les",
  enunciado:"Mulher, 25 anos de idade, com diagnóstico de lúpus eritematoso sistêmico há 1 ano (FAN 1:640, anti-DNA nativo positivo) em uso de hidroxicloroquina, apresenta edema de membros inferiores nas últimas semanas. Exame: PA 146 x 94 mmHg. Exames: creatinina 1,0 mg/dL, albumina 2,9 g/dL, C3 e C4 baixos, anti-DNA com título aumentado, urina com hematúria dismórfica e cilindros hemáticos e relação proteinúria/creatinúria de 2,4 g/g (confirmada em 2 amostras). Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Manter a hidroxicloroquina isolada e repetir o exame de urina em 3 meses, pois a creatinina está normal."},{id:"B",texto:"Realizar biópsia renal para definir a classe histológica e orientar o tratamento imunossupressor."},{id:"C",texto:"Iniciar pulso de ciclofosfamida e corticoide sem biópsia, pois os exames sorológicos já confirmam a nefrite lúpica."},{id:"D",texto:"Prescrever apenas inibidor da enzima conversora e restrição de sal, reservando a biópsia para a elevação da creatinina."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: lúpus com **proteinúria de 2,4 g/g** (relação proteinúria/creatinúria acima de 0,5 g/g, em duas amostras), **hematúria dismórfica com cilindros hemáticos**, hipoalbuminemia, **complemento baixo e anti-DNA elevado**: nefrite lúpica ativa, mesmo com creatinina normal. Pelas recomendações EULAR/ERA-EDTA e KDIGO, a **biópsia renal** é indicada quando a proteinúria persistente é igual ou maior que 0,5 g/24 h, com hematúria ou cilindros, pois a classe histológica (ISN/RPS: classes I a VI, e os índices de atividade e cronicidade) define o tratamento: as classes III e IV, proliferativas, exigem corticoide com micofenolato, ciclofosfamida ou terapia combinada (belimumabe, voclosporina); a classe V, membranosa, tem manejo próprio. A alternativa A está errada: a creatinina normal não exclui nefrite grave, e o atraso piora o desfecho renal. A alternativa C está errada: os exames sorológicos não definem a classe, e o tratamento depende da histologia. A alternativa D está errada: bloquear o sistema renina-angiotensina é medida adjuvante, e a biópsia não deve esperar a perda de função.",
  explicacoesAlternativas:{},
  referencias:"Fanouriakis A et al. EULAR recommendations for the management of systemic lupus erythematosus: 2023 update (Ann Rheum Dis 2024); KDIGO 2024 Clinical Practice Guideline for the Management of Lupus Nephritis (Kidney Int 2024); Weening JJ et al. ISN/RPS 2003 classification of lupus nephritis. Nível de confirmação: memória. A diretriz KDIGO 2024 de nefrite lúpica está publicada (jan/2024), confirmada em 29/10/2026; as recomendações EULAR de lúpus 2023 não foram conferidas.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q87 da prova-unifesp-2026
{
  id:"q-adap26-087", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-hemato", assuntoId:"ass-hemato-anemias",
  enunciado:"Menino, 1 ano e 8 meses de idade, é levado à unidade básica porque a mãe notou palidez há dois meses. Nascido a termo, mamou exclusivamente no peito até 8 meses e depois passou a receber leite de vaca integral em grande quantidade, com pouca carne e verduras. Exame físico: descorado ++/4+, irritadiço, sem organomegalias. Hemograma: hemoglobina 8,6 g/dL, VCM 62 fL, RDW 19%, plaquetas 520.000/mm³. Ferritina 5 ng/mL. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Transfundir concentrado de hemácias, pois a hemoglobina é inferior a 9 g/dL."},{id:"B",texto:"Prescrever ferro por via intravenosa, que corrige a anemia mais rapidamente que o ferro oral."},{id:"C",texto:"Indicar eletroforese de hemoglobina e aguardar o resultado antes de qualquer tratamento específico."},{id:"D",texto:"Iniciar ferro oral em dose terapêutica, orientar a dieta e reavaliar a hemoglobina em quatro semanas."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: criança de **1 ano e 8 meses**, com **dieta rica em leite de vaca e pobre em ferro**, anemia **microcítica** (VCM de 62 fL), **RDW elevado** (19%, anisocitose), plaquetas aumentadas e **ferritina de 5 ng/mL** (muito baixa): anemia ferropriva, a principal carência nutricional na infância. O tratamento é **ferro elementar por via oral**, em dose terapêutica de 3 a 5 mg/kg/dia, correção da dieta (reduzir o leite de vaca para menos de 500 mL/dia, oferecer carne e vegetais ricos em ferro e vitamina C) e **reavaliação da hemoglobina em 4 semanas**, esperando aumento de pelo menos 1 g/dL (resposta que confirma o diagnóstico). O ferro é mantido por alguns meses depois de normalizar a hemoglobina, para repor os estoques. A alternativa A está errada: a transfusão é reservada para anemia grave com repercussão hemodinâmica. A alternativa B está errada: o ferro intravenoso é para intolerância ou falha do oral. A alternativa C está errada: a eletroforese serve para suspeita de talassemia, em que a ferritina é normal ou alta, e não deve atrasar o tratamento.",
  explicacoesAlternativas:{},
  referencias:"Sociedade Brasileira de Pediatria, Consenso sobre anemia ferropriva: mais que uma doença, uma urgência médica (2018); Ministério da Saúde, Manual de condutas gerais do Programa Nacional de Suplementação de Ferro (2013); WHO, Guideline on the use of ferritin concentrations (2020). Nível de confirmação: memória. A SBP publicou em 17/03/2026 a Diretriz nº 32, atualização das recomendações sobre deficiência de ferro e anemia ferropriva em lactentes, alinhada ao Ministério da Saúde: profilaxia em dose fixa de 10 a 12,5 mg/dia de ferro elementar, em dois ciclos iniciados aos 6 e aos 12 meses, segundo fonte secundária em 29/10/2026; a dose terapêutica desta questão (3 a 5 mg/kg/dia) não foi conferida na nova diretriz.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q88 da prova-unifesp-2026
{
  id:"q-adap26-088", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-infectoped", assuntoId:"ass-dda",
  enunciado:"Menino, 2 anos de idade, tem diarreia aquosa há 2 dias, com 8 evacuações por dia, e vômitos ocasionais. Exame físico: irritado, com sede, olhos fundos, mucosas secas, pulso rápido, retorno do pinçamento da pele lento (1 a 2 segundos) e peso de 11 kg. Aceita líquidos e não tem sangue nas fezes. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Plano B: solução de reidratação oral de 50 a 100 mL/kg, em 4 a 6 horas, na unidade de saúde, com reavaliação."},{id:"B",texto:"Plano A: aumento da oferta de líquidos em casa, com retorno somente se aparecerem sinais de alarme."},{id:"C",texto:"Plano C: reidratação intravenosa com solução salina em fase rápida, de 100 mL/kg em 3 horas."},{id:"D",texto:"Antibiótico por via oral, associado à suspensão da alimentação por 24 horas, para acelerar a recuperação."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: diarreia aquosa de 2 dias, criança **irritada**, **com sede**, **olhos fundos**, **mucosas secas** e **retorno lento da prega** (1 a 2 segundos), aceitando líquidos, sem sinais de choque: **desidratação** (leve a moderada, com dois ou mais sinais). Pela classificação do Ministério da Saúde/OMS, **sem desidratação** (Plano A) exige que a criança esteja bem, alerta, sem sede e sem sinais; **com desidratação** (Plano B) tem dois ou mais sinais (irritação, sede, olhos fundos, boca seca, prega lenta); **desidratação grave** (Plano C) tem letargia, incapacidade de beber, olhos muito fundos e prega muito lenta (mais de 2 segundos). O Plano B consiste em **solução de reidratação oral de 50 a 100 mL/kg em 4 a 6 horas**, em pequenos volumes frequentes, com observação na unidade. Para 11 kg, são cerca de 550 a 1.100 mL. A alternativa B está errada: o Plano A não corrige o déficit já instalado. A alternativa C está errada: o Plano C é para desidratação grave ou falha da via oral. A alternativa D está errada: a diarreia aquosa tem causa viral na maioria dos casos, a alimentação não é suspensa e antibiótico não é indicado.",
  explicacoesAlternativas:{},
  referencias:"Ministério da Saúde, Manejo do paciente com diarreia (2017); Sociedade Brasileira de Pediatria, Diarreia aguda: diagnóstico e tratamento (2017); Guarino A et al. ESPGHAN/ESPID evidence-based guidelines for the management of acute gastroenteritis in children (J Pediatr Gastroenterol Nutr 2014). Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q89 da prova-unifesp-2026
{
  id:"q-adap26-089", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-infectoped", assuntoId:"ass-bronquiolite",
  enunciado:"Lactente de 5 meses de idade, sem comorbidades, nascido a termo, com coriza há 3 dias, tosse, taquipneia leve e sibilos, sem febre. Exame físico: bom estado geral, FR 52 irpm, discreta retração subcostal, SpO2 de 96% em ar ambiente, hidratado e aceitando bem a mamada. Os pais pedem «uma inalação com bombinha e um remédio de corticoide para não piorar». Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Prescrever salbutamol inalatório de 4 em 4 horas e prednisolona oral por 5 dias, para evitar a progressão da doença."},{id:"B",texto:"Orientar cuidados de suporte, como aspiração nasal, fracionamento da dieta e hidratação, e sinais de alarme."},{id:"C",texto:"Prescrever amoxicilina por 7 dias, pois a evolução com sibilos e coriza indica superinfecção bacteriana comprovada."},{id:"D",texto:"Internar para oxigenoterapia e inalação com adrenalina, mesmo com saturação normal, por precaução do plantonista."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: lactente de **5 meses**, pródromo de coriza seguido de tosse, taquipneia e sibilos: **bronquiolite viral aguda**, geralmente pelo vírus sincicial respiratório. Está em **bom estado geral**, com **SpO2 de 96%** (acima de 90 a 92%), hidratado e mamando bem: quadro **leve**, tratado em casa. O tratamento é de **suporte**: higiene nasal, aspiração das secreções, dieta fracionada, hidratação e antitérmico se houver febre, com orientação dos sinais de alarme (piora da respiração, recusa alimentar, apneia, cianose). As diretrizes da Academia Americana de Pediatria e da Sociedade Brasileira de Pediatria **não recomendam** broncodilatador, corticoide, antibiótico ou adrenalina de rotina, pois não alteram o curso nem a necessidade de internação. A alternativa A está errada: salbutamol e corticoide não têm benefício comprovado e têm efeitos adversos. A alternativa C está errada: a etiologia é viral, e o antibiótico não se justifica sem sinais de infecção bacteriana. A alternativa D está errada: não há indicação de internação nem de oxigênio com saturação normal.",
  explicacoesAlternativas:{},
  referencias:"Ralston SL et al. Clinical Practice Guideline: The Diagnosis, Management, and Prevention of Bronchiolitis (Pediatrics 2014); Sociedade Brasileira de Pediatria, Diretrizes de bronquiolite viral aguda (2017). Nível de confirmação: memória. Não localizei substituição da diretriz da AAP de 2014 para bronquiolite até 29/10/2026; existe a atualização australiana de 2025 (J Paediatr Child Health), que não substitui a da AAP.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q90 da prova-unifesp-2026
{
  id:"q-adap26-090", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-neo-descrresp",
  enunciado:"Recém-nascido a termo (39 semanas), 3.400 g, nascido de cesariana eletiva sem trabalho de parto, Apgar de 8 e 9. Com 1 hora de vida, apresenta taquipneia de 78 irpm, discreta retração subcostal e gemência leve, com SpO2 de 92% em ar ambiente que sobe para 98% com oxigênio inalatório a 30%. A radiografia de tórax mostra hiperinsuflação, trama vascular proeminente e líquido nas cisuras. Há melhora gradual e, com 36 horas, o desconforto desaparece. Qual é o diagnóstico mais provável?",
  alternativas:[{id:"A",texto:"Taquipneia transitória do recém-nascido, por retardo na reabsorção do líquido pulmonar fetal."},{id:"B",texto:"Síndrome do desconforto respiratório por deficiência de surfactante, pela imaturidade pulmonar."},{id:"C",texto:"Síndrome de aspiração de mecônio, por sofrimento fetal com eliminação de mecônio no líquido amniótico."},{id:"D",texto:"Pneumonia neonatal precoce por estreptococo do grupo B, adquirida por via ascendente."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: recém-nascido **a termo**, nascido de **cesariana eletiva sem trabalho de parto** (não houve o estímulo hormonal que ativa a reabsorção do líquido pulmonar), com taquipneia e desconforto leve desde a primeira hora, necessidade de **oxigênio em baixa concentração (30%)**, radiografia com **hiperinsuflação, trama vascular proeminente e líquido nas cisuras** e **resolução em cerca de 36 horas**: taquipneia transitória do recém-nascido, a causa mais comum de desconforto respiratório no recém-nascido a termo. É autolimitada em 24 a 72 horas, e o tratamento é de suporte (oxigênio, observação e nutrição conforme a taquipneia). A alternativa B está errada: o déficit de surfactante é de prematuros, e a radiografia mostra infiltrado reticulogranular com baixo volume pulmonar. A alternativa C está errada: a aspiração de mecônio ocorre em pós-termo ou com sofrimento fetal, com líquido meconial e infiltrado grosseiro. A alternativa D está errada: a pneumonia por estreptococo do grupo B tem fatores de risco (bolsa rota, febre materna), mantém-se grave e não resolve em 36 horas.",
  explicacoesAlternativas:{},
  referencias:"Sociedade Brasileira de Pediatria, Documento científico: desconforto respiratório do recém-nascido a termo; Hermansen CL, Lorah KN. Respiratory distress in the newborn (Am Fam Physician 2007); Kliegman RM et al. Nelson Textbook of Pediatrics, 21ª ed. Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q91 da prova-unifesp-2026
{
  id:"q-adap26-091", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-urologia", assuntoId:"ass-uro-litiase",
  enunciado:"Homem, 38 anos de idade, tem o terceiro episódio de cólica renal em quatro anos, com eliminação espontânea de cálculos de oxalato de cálcio. Está assintomático no momento. Exames: creatinina 0,9 mg/dL, cálcio e PTH séricos normais, ácido úrico 5,2 mg/dL e urina tipo 1 sem infecção. Na urina de 24 horas: volume de 1.100 mL, cálcio de 380 mg, citrato de 520 mg, ácido úrico de 480 mg, oxalato de 32 mg e sódio de 260 mEq. Qual é a estratégia de prevenção mais adequada?",
  alternativas:[{id:"A",texto:"Tiazídico, dieta pobre em sódio, aumento da ingestão de líquidos (diurese de 2,5 L ao dia) e cálcio normal na dieta."},{id:"B",texto:"Restrição rigorosa do cálcio da dieta e suspensão de laticínios, para reduzir a calciúria e a formação de cristais."},{id:"C",texto:"Alopurinol em dose plena e alcalinização da urina com citrato, para dissolver os cálculos de oxalato."},{id:"D",texto:"Acidificação da urina com cloreto de amônio e vitamina C em dose alta, para impedir a precipitação dos cristais."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: litíase recorrente de **oxalato de cálcio**, com **hipercalciúria idiopática** (cálcio de 380 mg/24 h; o limite é 300 mg no homem), cálcio e PTH séricos normais (afasta hiperparatireoidismo), **sódio urinário elevado** (aumenta a calciúria) e **volume urinário baixo** (1.100 mL, abaixo da meta de 2,0 a 2,5 L). A prevenção combina: **ingestão hídrica** para diurese de 2,5 L por dia, **redução do sódio** (menos de 2 a 3 g de sódio/dia), **cálcio dietético normal** (1.000 a 1.200 mg/dia, pois a restrição aumenta a absorção intestinal de oxalato) e **tiazídico** (hidroclorotiazida, clortalidona ou indapamida), que reduz a calciúria em cerca de 30 a 50%. O citrato de potássio é acrescentado se houver hipocitratúria. A alternativa B está errada: a restrição de cálcio na dieta aumenta o risco de cálculos. A alternativa C está errada: o alopurinol é para hiperuricosúria, que não existe aqui, e o oxalato de cálcio não se dissolve com alcalinização. A alternativa D está errada: a vitamina C em dose alta aumenta o oxalato urinário, e a acidificação favorece cálculos de ácido úrico.",
  explicacoesAlternativas:{},
  referencias:"EAU Guidelines on Urolithiasis (2024); Pearle MS et al. Medical management of kidney stones: AUA guideline (J Urol 2014); Sociedade Brasileira de Urologia, Diretrizes de litíase urinária. Nível de confirmação: memória. A EAU publicou atualização limitada de urolitíase em 2025 e revisão completa em 2026 (cólica renal, terapia expulsiva, litotripsia e antitrombóticos), segundo o site da EAU em 29/10/2026; as condutas desta questão não foram conferidas nelas.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q92 da prova-unifesp-2026
{
  id:"q-adap26-092", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-psiquiatria", assuntoId:"ass-psiq-infantil",
  enunciado:"Menino, 8 anos de idade, cursa o 3º ano do ensino fundamental e é levado à consulta porque, desde a pré-escola, não conclui tarefas, perde objetos, não presta atenção em sala de aula e se levanta da carteira com frequência, além de agir sem pensar em casa e na escola. Os sintomas ocorrem em ambos os ambientes, há mais de 6 meses, com prejuízo escolar e nas relações com colegas. A avaliação de audição, visão e do desenvolvimento intelectual é normal, e não há tiques, ansiedade ou sintomas de humor. Qual é o tratamento inicial mais adequado?",
  alternativas:[{id:"A",texto:"Risperidona em dose baixa, que reduz a hiperatividade e a impulsividade e melhora o rendimento escolar."},{id:"B",texto:"Metilfenidato associado a orientação aos pais e à escola e a intervenções comportamentais."},{id:"C",texto:"Fluoxetina em dose baixa, que melhora a atenção e é bem tolerada na faixa etária da criança."},{id:"D",texto:"Aguardar a maturação neurológica até a adolescência, com reforço escolar e acompanhamento a cada ano."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **desatenção** (perde objetos, não conclui tarefas) e **hiperatividade e impulsividade** (levanta-se da carteira, age sem pensar), com início antes dos 12 anos, **em dois ou mais ambientes** (casa e escola), por **mais de 6 meses**, com **prejuízo funcional**, e sem outra causa que explique o quadro (audição, visão, intelecto, humor e ansiedade normais): transtorno de déficit de atenção e hiperatividade (TDAH, critérios do DSM-5). Em escolares com sintomas moderados a graves, o tratamento de primeira linha é **medicamentoso, com psicoestimulante (metilfenidato)**, associado a **psicoeducação**, orientação à família e à escola e intervenção comportamental. Na faixa pré-escolar (menos de 6 anos) ou com sintomas leves, começa-se pelas intervenções comportamentais. Alternativas são a lisdexanfetamina e os não estimulantes (atomoxetina, guanfacina). A alternativa A está errada: o antipsicótico não é o tratamento do TDAH, e tem efeitos metabólicos importantes. A alternativa C está errada: o antidepressivo ISRS não trata o TDAH. A alternativa D está errada: o TDAH não se resolve com a espera, e o prejuízo escolar e social pede intervenção.",
  explicacoesAlternativas:{},
  referencias:"Wolraich ML et al. Clinical Practice Guideline for the Diagnosis, Evaluation, and Treatment of ADHD in Children and Adolescents (Pediatrics 2019); American Psychiatric Association, DSM-5-TR (2022); Associação Brasileira do Déficit de Atenção, consenso brasileiro. Nível de confirmação: memória. A página da AAP, atualizada em 03/03/2026, ainda traz a diretriz de TDAH de 2019 (Wolraich et al., Pediatrics 2019;144:e20192528) como vigente, sem revisão posterior localizada em 29/10/2026.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q93 da prova-unifesp-2026
{
  id:"q-adap26-093", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-orl", assuntoId:"ass-orl-viasaereas",
  enunciado:"Menino, 6 anos de idade, tem ronco alto todas as noites, pausas respiratórias observadas pelos pais, sono agitado e enurese secundária. Durante o dia, respira pela boca e está irritado. IMC no percentil 50. Oroscopia: amígdalas palatinas grau 4 que quase se tocam na linha média. A polissonografia mostra índice de apneia-hipopneia de 9,5 eventos por hora e saturação mínima de oxigênio de 84%. Qual é o tratamento de primeira linha?",
  alternativas:[{id:"A",texto:"Pressão positiva contínua nas vias aéreas (CPAP) noturno, por ser o tratamento de escolha em crianças com apneia."},{id:"B",texto:"Corticoide nasal e montelucaste, de uso contínuo, com reavaliação em 12 meses, sem indicação cirúrgica."},{id:"C",texto:"Observação e orientação de higiene do sono, pois o quadro costuma desaparecer espontaneamente até a adolescência."},{id:"D",texto:"Adenoamigdalectomia, que é o tratamento de primeira linha da apneia do sono em crianças com hipertrofia."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: criança de **6 anos**, com ronco, **pausas observadas**, sono agitado e **enurese secundária**, **amígdalas grau 4** (obstrução importante) e polissonografia com **índice de apneia-hipopneia de 9,5 eventos/h** (em crianças, o diagnóstico é a partir de 1 evento/h; de 5 a 10 eventos/h é apneia moderada, e acima de 10, grave) e **saturação mínima de 84%**, sem obesidade: apneia obstrutiva do sono por hipertrofia adenoamigdaliana. O tratamento de primeira linha é a **adenoamigdalectomia**, que cura a doença em cerca de 60 a 80% das crianças, e o seguimento com polissonografia é indicado nos casos graves ou persistentes. O corticoide nasal é opção na apneia leve, em quem não pode operar ou na persistência após a cirurgia. O CPAP é alternativa para quem tem persistência ou contraindicação. A alternativa A está errada: o CPAP não é a primeira linha em crianças com hipertrofia adenoamigdaliana. A alternativa B está errada: o tratamento clínico isolado é insuficiente em apneia moderada a grave. A alternativa C está errada: a apneia grave com hipoxemia causa prejuízo cardiovascular, neurocognitivo e do crescimento, e não deve ser apenas observada.",
  explicacoesAlternativas:{},
  referencias:"Marcus CL et al. Diagnosis and management of childhood obstructive sleep apnea syndrome (Pediatrics 2012); Mitchell RB et al. Clinical Practice Guideline: Tonsillectomy in Children, update (Otolaryngol Head Neck Surg 2019); Associação Brasileira de Otorrinolaringologia, apneia do sono na infância. Nível de confirmação: memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q94 da prova-unifesp-2026
{
  id:"q-adap26-094", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-bioetica", assuntoId:"ass-cuidadospaliativos",
  enunciado:"Homem, 70 anos de idade, com câncer de pulmão avançado, sem possibilidade de tratamento modificador de doença e com expectativa de vida de poucas semanas, sob cuidados paliativos domiciliares, refere falta de ar intensa ao repouso e angústia. Exame: FR 28 irpm, SpO2 de 91% em ar ambiente, sem sibilos nem sinais de infecção, uso de musculatura acessória. A dispneia persiste apesar de broncodilatador, otimização do tratamento de causas reversíveis, medidas não farmacológicas (ventilador direcionado à face, posicionamento) e oxigênio. Qual é a medicação indicada para o alívio sintomático?",
  alternativas:[{id:"A",texto:"Morfina por via oral ou subcutânea em dose baixa, titulada conforme a resposta e o conforto do paciente."},{id:"B",texto:"Haloperidol isolado, que é o fármaco de escolha para controle da dispneia refratária do paciente."},{id:"C",texto:"Corticoide em dose alta, que alivia a dispneia em qualquer paciente com câncer de pulmão avançado."},{id:"D",texto:"Sedação profunda contínua com midazolam desde o início, antes de tentar outras medidas."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: câncer de pulmão avançado em **fase final**, **dispneia ao repouso refratária** a causas reversíveis, broncodilatador, oxigênio e medidas não farmacológicas; **SpO2 de 91%** (a hipoxemia leve não explica a intensidade da dispneia, que é uma percepção subjetiva). Os **opioides** são a primeira linha para o alívio da dispneia refratária em doença avançada: morfina oral 2,5 a 5 mg a cada 4 horas (ou 1 a 2,5 mg por via subcutânea), com titulação e prevenção da constipação, e a segurança é boa nas doses habituais, sem acelerar a morte. Os benzodiazepínicos (lorazepam, midazolam) são adjuvantes quando há ansiedade intensa. A alternativa B está errada: o haloperidol é antiemético e trata o delirium, e não é o fármaco da dispneia. A alternativa C está errada: o corticoide ajuda em casos selecionados (linfangite, obstrução de via aérea, síndrome da veia cava superior), e não em qualquer paciente. A alternativa D está errada: a sedação paliativa é último recurso, para sintoma refratário a todas as medidas e com consentimento.",
  explicacoesAlternativas:{},
  referencias:"Hui D et al. Management of dyspnea in advanced cancer: ASCO Guideline (J Clin Oncol 2021); Academia Nacional de Cuidados Paliativos, Manual de cuidados paliativos, 2ª ed.; Currow DC et al. Regular, sustained-release morphine for chronic breathlessness: a multicentre, double-blind, randomised, placebo-controlled trial (Thorax 2020). Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q95 da prova-unifesp-2026
{
  id:"q-adap26-095", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-pneumo", assuntoId:"ass-asma",
  enunciado:"Mulher, 28 anos de idade, apresenta tosse e chiado ao esforço e à noite cerca de uma vez por semana, nos últimos três meses, que melhoram com salbutamol. Não teve exacerbação grave e não usa nenhum medicamento de controle. A espirometria mostra relação VEF1/CVF de 0,72 e VEF1 de 88% do previsto, com aumento de 14% (350 mL) depois do broncodilatador. Qual é o tratamento anti-inflamatório inicial mais adequado, segundo a estratégia atual do GINA?",
  alternativas:[{id:"A",texto:"Salbutamol inalatório sob demanda, isolado, por ser a opção de menor custo para sintomas leves."},{id:"B",texto:"Budesonida-formoterol em dose baixa, inalatória, usada sob demanda sempre que houver sintomas."},{id:"C",texto:"Montelucaste diário, que dispensa o corticoide inalatório e tem eficácia equivalente na asma leve."},{id:"D",texto:"Prednisona oral por sete dias a cada trimestre, para evitar a progressão da doença."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: sintomas de **tosse e sibilos semanais**, melhora com broncodilatador e **resposta ao broncodilatador de 14% e 350 mL** (acima de 12% e 200 mL, que confirma a obstrução variável): asma leve, não controlada pelo uso de beta-2 agonista de curta ação, em adulta sem tratamento de manutenção. O GINA (desde 2019) **não recomenda mais o beta-2 agonista de curta ação isolado** em adultos e adolescentes, pois o tratamento exclusivo do broncoespasmo não trata a inflamação e se associa a exacerbações graves. A estratégia preferida na etapa 1 e 2 (**trilha 1**) é a combinação de **corticoide inalatório com formoterol em dose baixa, usada sob demanda** (budesonida-formoterol, por exemplo), que reduz exacerbações graves em cerca de 60% em relação ao beta-2 agonista de curta ação isolado. A alternativa A está errada: o uso isolado do beta-2 agonista de curta ação deixou de ser recomendado. A alternativa C está errada: o montelucaste é menos eficaz que o corticoide inalatório e tem alerta de eventos neuropsiquiátricos. A alternativa D está errada: o corticoide sistêmico é para exacerbações, e não para tratamento de manutenção.",
  explicacoesAlternativas:{},
  referencias:"Global Initiative for Asthma. Global Strategy for Asthma Management and Prevention (relatório 2024; as edições 2025 e 2026 não foram conferidas em texto integral); O'Byrne PM et al. Inhaled combined budesonide-formoterol as needed in mild asthma (N Engl J Med 2018); Bateman ED et al. SYGMA 2 (N Engl J Med 2018); Sociedade Brasileira de Pneumologia e Tisiologia, Diretrizes para o manejo da asma. Nível de confirmação: memória; GINA 2025 existe (maio/2025; correção menor em 14/11/2025), confirmada em resumos em 29/10/2026; texto integral não aberto.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q96 da prova-unifesp-2026
{
  id:"q-adap26-096", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-crescdesenv", assuntoId:"ass-calendariovacinal",
  enunciado:"Menino, 4 anos de idade, em tratamento de leucemia linfoide aguda, em fase de manutenção da quimioterapia, com contagem de neutrófilos de 1.100/mm³ e linfócitos de 900/mm³, é levado ao posto de saúde porque a mãe notou que a caderneta de vacinação está incompleta. Faltam as vacinas contra sarampo, caxumba e rubéola (tríplice viral) e contra varicela, além do reforço da vacina pneumocócica. Qual é a orientação correta sobre a vacinação?",
  alternativas:[{id:"A",texto:"Adiar as vacinas de vírus vivos (tríplice viral e varicela) e aplicar as inativadas, com orientação do CRIE."},{id:"B",texto:"Aplicar todas as vacinas em atraso no mesmo dia, pois a leucemia em tratamento aumenta o risco das doenças."},{id:"C",texto:"Suspender todas as vacinas até um ano após o fim da quimioterapia, inclusive as inativadas, pela imunossupressão."},{id:"D",texto:"Aplicar somente as vacinas de vírus vivos atenuados, que induzem imunidade mais duradoura em imunossuprimidos."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: criança com **leucemia linfoide aguda em quimioterapia de manutenção**, **imunossuprimida** (neutrófilos de 1.100/mm³ e linfócitos de 900/mm³, que é baixo para a idade), com vacinas de **vírus vivos atenuados** pendentes (tríplice viral e varicela) e vacina **inativada** (pneumocócica). As vacinas de vírus vivos são **contraindicadas durante a quimioterapia** pelo risco de doença disseminada pelo vírus vacinal; costumam ser aplicadas cerca de **3 a 6 meses depois do fim do tratamento**, quando linfócitos e imunidade se recuperam, com orientação do Centro de Referência para Imunobiológicos Especiais (CRIE). As vacinas **inativadas** são seguras e podem ser feitas, embora a resposta seja menor, e a pneumocócica é recomendada com esquema ampliado. Os contatos domiciliares devem estar vacinados. A alternativa B está errada: vacina de vírus vivo em quimioterapia ativa é contraindicada e a resposta vacinal é pior. A alternativa C está errada: as inativadas não precisam ser adiadas. A alternativa D está errada: as vacinas de vírus vivos são as que apresentam risco.",
  explicacoesAlternativas:{},
  referencias:"Ministério da Saúde, Manual dos Centros de Referência para Imunobiológicos Especiais, 5ª ed. (2019); Sociedade Brasileira de Imunizações, Calendário de vacinação do paciente especial; Rubin LG et al. 2013 IDSA clinical practice guideline for vaccination of the immunocompromised host (Clin Infect Dis 2014). Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q97 da prova-unifesp-2026
{
  id:"q-adap26-097", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-alergiaimuno", assuntoId:"ass-alergia-anafilaxia",
  enunciado:"Mulher, 30 anos de idade, 65 kg, é levada ao pronto-socorro 10 minutos depois de ser picada por abelha. Apresenta urticária difusa, edema de lábios, estridor e sibilos, náuseas, PA de 78 x 40 mmHg e FC de 124 bpm, com pele fria e sudorese. Qual é o medicamento que deve ser administrado primeiro?",
  alternativas:[{id:"A",texto:"Difenidramina intravenosa, que reverte o prurido e o edema de forma imediata, com melhora da pressão arterial."},{id:"B",texto:"Hidrocortisona intravenosa em dose alta, para impedir a recorrência tardia do quadro e reduzir o edema."},{id:"C",texto:"Salbutamol inalatório em dose alta, para reverter o broncoespasmo e melhorar a oxigenação do paciente."},{id:"D",texto:"Adrenalina intramuscular, 0,5 mg (solução 1 mg/mL) na face anterolateral da coxa, repetida se necessário."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: exposição a alérgeno (picada de abelha) com envolvimento de **pele** (urticária, edema de lábios), **vias aéreas** (estridor e sibilos), **hipotensão** (PA de 78 x 40 mmHg) e sintomas gastrointestinais, em **poucos minutos**: anafilaxia (critérios do NIAID/FAAN: dois ou mais sistemas após exposição provável, ou hipotensão após alérgeno conhecido). O tratamento de primeira linha, imediato, é a **adrenalina intramuscular** na face anterolateral da coxa, na dose de **0,01 mg/kg** (0,3 a 0,5 mg em adultos), que pode ser repetida a cada 5 a 15 minutos. Em seguida: posição supina com pernas elevadas, oxigênio, acesso venoso e reposição de volume. Anti-histamínicos, corticoides e broncodilatadores são adjuvantes e não substituem a adrenalina. A alternativa A está errada: o anti-histamínico alivia sintomas cutâneos, mas não reverte hipotensão nem obstrução de vias aéreas. A alternativa B está errada: o corticoide tem início de ação lento (horas) e não previne a recorrência de forma comprovada. A alternativa C está errada: o salbutamol trata o broncoespasmo, mas não a hipotensão e o edema de laringe.",
  explicacoesAlternativas:{},
  referencias:"Cardona V et al. World Allergy Organization Anaphylaxis Guidance 2020 (World Allergy Organ J 2020); Shaker MS et al. Anaphylaxis: a 2020 practice parameter update (J Allergy Clin Immunol 2020); Associação Brasileira de Alergia e Imunologia, Guia prático de anafilaxia (2022). Nível de confirmação: memória. A AAAAI/ACAAI tem atualizações do parâmetro prático de anafilaxia (2022 a 2024, segundo fontes secundárias em 29/10/2026), que desaconselham corticoide e anti-histamínico de rotina para prevenir fase bifásica e consideram que, com adrenalina precoce e resolução completa, a ida ao pronto-socorro nem sempre é necessária, com observação mais longa na anafilaxia grave ou com mais de uma dose; a conduta desta questão deve ser conferida nessas edições.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q98 da prova-unifesp-2026
{
  id:"q-adap26-098", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-sepseneonatal",
  enunciado:"Recém-nascido de 36 semanas de idade gestacional, 2.650 g, nascido de parto vaginal após rotura de membranas por 22 horas, com febre materna de 38,6 °C no trabalho de parto, sem profilaxia intraparto para estreptococo do grupo B (cultura materna não realizada). Com 3 horas de vida, apresenta gemência, taquipneia de 76 irpm, tiragem e temperatura de 35,6 °C, com FC de 172 bpm e má perfusão periférica. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Colher hemocultura e iniciar de imediato ampicilina associada a gentamicina."},{id:"B",texto:"Manter observação em berçário por 48 horas, pois os sinais podem representar adaptação à vida extrauterina."},{id:"C",texto:"Iniciar apenas oxigenoterapia e aguardar o hemograma antes do antibiótico, para evitar uso desnecessário."},{id:"D",texto:"Prescrever aciclovir e ceftriaxona, por ser o esquema padrão da sepse neonatal precoce."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **fatores de risco para sepse neonatal precoce** (prematuridade tardia de 36 semanas, **bolsa rota por 22 horas** e **febre materna de 38,6 °C**, ou corioamnionite, sem profilaxia intraparto para estreptococo do grupo B) e **sinais clínicos** (gemência, taquipneia, temperatura de 35,6 °C, taquicardia e má perfusão) em 3 horas de vida. É **sepse neonatal precoce até prova em contrário**: colher hemocultura (e hemograma, PCR e líquor quando possível, sem atrasar) e **iniciar antibiótico imediatamente**, com **ampicilina associada a gentamicina**, que cobre estreptococo do grupo B, *Escherichia coli* e *Listeria*. O atraso do antibiótico aumenta a mortalidade. A alternativa B está errada: com sinais clínicos não se faz observação isolada. A alternativa C está errada: não se aguarda o hemograma para tratar um recém-nascido sintomático. A alternativa D está errada: a ceftriaxona é evitada no recém-nascido (risco de kernicterus por deslocamento da bilirrubina e de precipitação com cálcio), e o aciclovir se reserva à suspeita de herpes.",
  explicacoesAlternativas:{},
  referencias:"Puopolo KM et al. Management of neonates born at 35 0/7 or more weeks with risk factors for early-onset sepsis (Pediatrics 2018); Sociedade Brasileira de Pediatria, Sepse neonatal precoce (2021); Ministério da Saúde, Atenção à saúde do recém-nascido, vol. 3. Nível de confirmação: memória. O arcabouço da AAP de 2018 segue como referência em 29/10/2026; a calculadora de sepse precoce foi atualizada em 2024 por coorte da Kaiser Permanente, sem substituição da diretriz da AAP localizada.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q99 da prova-unifesp-2026
{
  id:"q-adap26-099", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-gastro", assuntoId:"ass-intolerancialactose",
  enunciado:"Lactente de 7 meses de idade, em aleitamento misto, teve gastroenterite aguda há 10 dias, tratada com reidratação oral, com melhora inicial. Desde então, mantém evacuações líquidas, explosivas, ácidas, 5 a 6 vezes ao dia, com distensão abdominal e assadura perianal, sem sangue, muco ou febre. Ganho de peso estacionado. O exame das fezes mostra pH de 5,0 e substâncias redutoras de 2+. A criança está hidratada e ativa. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Suspender todo o leite e iniciar fórmula de aminoácidos por seis meses, como na alergia à proteína do leite de vaca."},{id:"B",texto:"Iniciar antibiótico oral para tratar supercrescimento bacteriano intestinal, por ser causa de fezes ácidas."},{id:"C",texto:"Manter a fórmula habitual e associar probiótico, pois o quadro é funcional e se resolve espontaneamente."},{id:"D",texto:"Substituir temporariamente por fórmula sem lactose, com reintrodução gradual do leite após a recuperação intestinal."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: diarreia líquida, **explosiva e ácida**, com assadura, **iniciada após gastroenterite aguda**, com **pH fecal de 5,0** (abaixo de 5,5) e **substâncias redutoras positivas** (acima de 0,5%, indicando açúcar não absorvido): intolerância à lactose **secundária** à lesão da borda em escova do enterócito pela infecção, com deficiência transitória de lactase. A conduta é a **substituição temporária por fórmula sem lactose** (ou com baixo teor) por algumas semanas, mantendo a oferta de líquidos e a nutrição, seguida de **reintrodução gradual do leite** quando o epitélio se recupera (em geral de 2 a 4 semanas). O aleitamento materno deve ser mantido. A alternativa A está errada: a alergia à proteína do leite de vaca cursa com sangue, muco, vômitos ou dermatite, e a fórmula de aminoácidos é reservada a casos graves. A alternativa B está errada: o antibiótico não está indicado, e a causa é a carência transitória de lactase. A alternativa C está errada: o ganho estacionado e a perda ácida indicam a necessidade de intervenção, e o probiótico isolado não resolve.",
  explicacoesAlternativas:{},
  referencias:"Heyman MB, Committee on Nutrition. Lactose intolerance in infants, children, and adolescents (Pediatrics 2006); Sociedade Brasileira de Pediatria, Diarreia aguda e persistente; Ministério da Saúde, Manejo do paciente com diarreia. Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
// adaptada da estrutura da Q100 da prova-unifesp-2026
{
  id:"q-adap26-100", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-oncogineco", assuntoId:"ass-caovario",
  enunciado:"Mulher, 19 anos de idade, nuligesta, com aumento do volume abdominal e dor pélvica há 2 meses. A ressonância magnética mostra massa sólida, lobulada, de 14 cm no ovário esquerdo, com septos fibrovasculares realçados, sem ascite, sem implantes peritoneais e com ovário direito e útero normais. LDH de 1.450 U/L (muito elevado), alfafetoproteína e beta-hCG normais, tomografia de tórax e abdome sem linfonodos aumentados. A paciente deseja preservar a fertilidade. Na cirurgia, o tumor está confinado ao ovário esquerdo, com cápsula íntegra, e a congelação é compatível com tumor de células germinativas. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Histerectomia total com salpingo-ooforectomia bilateral e omentectomia, como tratamento definitivo de todo tumor de ovário."},{id:"B",texto:"Quimioterapia exclusiva com bleomicina, etoposídeo e cisplatina, sem abordagem cirúrgica por tratar-se de tumor sensível."},{id:"C",texto:"Salpingo-ooforectomia unilateral com estadiamento cirúrgico, preservando o útero e o ovário contralateral, e seguimento."},{id:"D",texto:"Radioterapia pélvica e abdominal adjuvante, pois o disgerminoma é um tumor muito radiossensível."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: mulher de **19 anos** que deseja preservar a fertilidade, massa sólida lobulada com **septos fibrovasculares**, **LDH muito elevado** (1.450 U/L) e alfafetoproteína e beta-hCG normais, e congelação compatível com **tumor de células germinativas**; o **LDH muito elevado**, com alfafetoproteína e beta-hCG normais, aponta o disgerminoma, o equivalente ovariano do seminoma, que corresponde a cerca de 30 a 40% dos tumores germinativos malignos do ovário. A doença está confinada ao ovário com cápsula íntegra (**estádio IA**, pela FIGO), e a conduta é a **salpingo-ooforectomia unilateral** com **estadiamento cirúrgico** (lavado peritoneal, inspeção da cavidade, biópsias peritoneais e omentais e avaliação linfonodal), preservando o útero e o ovário contralateral. No estádio IA, não há quimioterapia adjuvante, e o seguimento clínico com marcadores e imagem é suficiente (recidivas, quando ocorrem, respondem bem à quimioterapia). Estádios mais avançados recebem quimioterapia com BEP. A alternativa A está errada: a cirurgia radical é desnecessária e leva à perda da fertilidade. A alternativa B está errada: a cirurgia é a base do tratamento inicial e fornece o estadiamento. A alternativa D está errada: a radioterapia causa falência ovariana e foi substituída pela quimioterapia.",
  explicacoesAlternativas:{},
  referencias:"Ray-Coquard I et al. Non-epithelial ovarian cancer: ESMO Clinical Practice Guidelines (Ann Oncol 2018); Brown J et al. Gynecologic Cancer InterGroup consensus review for ovarian germ cell tumors (Int J Gynecol Cancer 2014); NCCN Guidelines Ovarian Cancer (versão 2025). Nível de confirmação: memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-20"
},
]);
