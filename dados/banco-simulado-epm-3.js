/* ==========================================================================
   BANCO SIMULADO EPM 3 (base: UNIFESP-EPM 2022) — 100 questões autorais
   ==========================================================================
   Cada questão parte do ASSUNTO e da posição de uma questão da prova da
   UNIFESP-EPM 2022, mas é escrita do zero: caso clínico, dados e alternativas
   próprios, e a resposta correta é a alternativa ANTERIOR à da prova real
   (B→A, C→B, D→C, A→D; a questão 52, anulada em 2022, recebeu D, que fecha o
   equilíbrio das quatro letras). Não são questões reais: marcam `real: false`
   e instituição "Esc — Banco Didático" (nunca "UNIFESP-EPM 2022"), para não se
   misturarem à prova de 2022 em Provas Antigas. A explicação segue o padrão de
   justificativa e cada questão cita a diretriz de base com edição e ano; o que
   não pôde ser conferido no texto oficial está dito na referência da questão
   e em docs/auditoria-simulado-epm-3.md.
   ========================================================================== */
window.EscDados.registrarQuestoes("banco-simulado-epm-3", [
// adaptada da estrutura da Q1 da UNIFESP 2022
{
  id:"q-adap22-001", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-anestesio", assuntoId:"ass-anestesio-complicacoes",
  enunciado:"Homem, 58 anos, 62 kg, será submetido à fixação de fratura de rádio sob bloqueio do plexo braquial por via supraclavicular guiado por ultrassom, com 40 mL de bupivacaína a 0,5% (200 mg). Cinco minutos após a injeção, queixa-se de zumbido, formigamento ao redor da boca e gosto metálico; em seguida apresenta crise tônico-clônica generalizada e, logo depois, taquicardia ventricular com QRS alargado, PA 70 x 40 mmHg. A via aérea foi assegurada, a ventilação com oxigênio a 100% está em curso e as compressões torácicas foram iniciadas. Qual é o tratamento específico indicado para esse quadro?",
  alternativas:[{id:"A",texto:"Epinefrina 1 mg intravenosa a cada 3 a 5 minutos, como em qualquer parada, e novo choque a cada ciclo."},{id:"B",texto:"Bicarbonato de sódio e propofol em bolus para suprimir a convulsão e estabilizar o ritmo ventricular."},{id:"C",texto:"Vasopressina 40 U intravenosa, seguida de cardioversão sincronizada, sem outras medidas específicas."},{id:"D",texto:"Emulsão lipídica a 20% em bolus de 1,5 mL/kg e infusão contínua, com o suporte de vida em curso."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: sintomas prodrômicos de **zumbido, parestesia perioral e gosto metálico** minutos depois de **200 mg de bupivacaína** (a dose máxima é de cerca de **2,5 mg/kg**, ou **155 mg** para 62 kg), seguidos de **convulsão** e de **colapso cardiovascular com arritmia ventricular**: toxicidade sistêmica por anestésico local, com a sequência clássica de excitação do sistema nervoso central e depois da condução cardíaca. O tratamento específico é a **emulsão lipídica a 20%**: bolus de **1,5 mL/kg** em 2 a 3 minutos (cerca de 93 mL para 62 kg; acima de 70 kg, o checklist da ASRA usa 100 mL fixos), infusão de **0,25 mL/kg/min**, repetição do bolus se não houver estabilidade, e manutenção da infusão por pelo menos 10 minutos depois do retorno da circulação, sempre com via aérea, oxigenação e compressões. As convulsões se tratam com benzodiazepínico; o propofol em grande dose deprime o miocárdio. Na parada por esse mecanismo, a epinefrina é dada em doses pequenas (menos de 1 mcg/kg), e a vasopressina, os bloqueadores de canal de cálcio e os betabloqueadores devem ser evitados. A está errada porque a epinefrina em dose plena (1 mg) piora o desfecho nessa intoxicação e retarda a recuperação, além de prejudicar a ação da emulsão lipídica. B está errada porque o bicarbonato não trata a toxicidade do anestésico e o propofol em bolus, em quem já tem colapso circulatório, aprofunda a hipotensão. C está errada porque a vasopressina é desaconselhada nessa parada e, sem a emulsão lipídica, a arritmia por bloqueio de canal de sódio não responde à cardioversão isolada.",
  explicacoesAlternativas:{},
  referencias:"Neal JM et al. The Third American Society of Regional Anesthesia and Pain Medicine Practice Advisory on Local Anesthetic Systemic Toxicity: Executive Summary 2017. Reg Anesth Pain Med 2018;43:113-23; ASRA Pain Medicine. Checklist for treatment of local anesthetic systemic toxicity, 2020. Texto oficial não aberto nesta rodada (rede bloqueada); doses conferidas de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q2 da UNIFESP 2022
{
  id:"q-adap22-002", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-anestesio", assuntoId:"ass-anestesio-complicacoes",
  enunciado:"Mulher, 68 anos, ASA II, é submetida à artroplastia total de joelho sob raquianestesia com bupivacaína hiperbárica e 100 mcg de morfina intratecal. Oito horas depois, na enfermaria, é encontrada sonolenta, com frequência respiratória de 8 irpm, SpO2 de 89% em ar ambiente, pupilas puntiformes e PA 118 x 70 mmHg. Não recebeu outros sedativos. Além de oferecer oxigênio e estimular a paciente, qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Flumazenil 0,2 mg intravenoso, repetido a cada minuto até a paciente despertar plenamente e respirar bem."},{id:"B",texto:"Naloxona em doses pequenas e tituladas (0,04 a 0,1 mg), com monitorização contínua por 24 horas."},{id:"C",texto:"Naloxona 2 mg intravenosa em bolus único, suspendendo a monitorização assim que ela despertar."},{id:"D",texto:"Apenas oxigênio e observação, porque a depressão por morfina neuraxial é benigna e autolimitada."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **morfina intratecal (100 mcg)**, depressão respiratória com **FR de 8 irpm**, **SpO2 de 89%** e **miose** oito horas depois: a morfina é hidrofílica e se espalha em direção ao tronco cerebral, de modo que a depressão respiratória pode ser **tardia**, entre 6 e 12 horas depois da injeção. A conduta é oxigênio, estímulo e **naloxona fracionada** (0,04 a 0,1 mg por via venosa, repetida até frequência respiratória adequada, com infusão se necessário), pois uma dose grande reverte também a analgesia e pode causar dor aguda, hipertensão e edema pulmonar. Como a meia-vida da naloxona é curta e a da morfina é longa, a paciente precisa de **monitorização contínua** (frequência respiratória, oximetria e sedação) por pelo menos 24 horas depois de morfina neuraxial em dose única, segundo a diretriz da ASA. A está errada porque o flumazenil antagoniza benzodiazepínicos, e a paciente não os recebeu; ele não reverte opioide. C está errada porque o bolus de 2 mg reverte a analgesia de forma abrupta, e retirar a monitorização expõe à ressedação quando a naloxona acabar. D está errada porque a depressão respiratória por morfina neuraxial é uma complicação potencialmente fatal, sobretudo com SpO2 de 89% e pupilas puntiformes, e exige tratamento ativo.",
  explicacoesAlternativas:{},
  referencias:"American Society of Anesthesiologists Task Force. Practice Guidelines for the Prevention, Detection, and Management of Respiratory Depression Associated with Neuraxial Opioid Administration: an updated report. Anesthesiology 2016;124:535-52. Texto oficial não aberto (rede bloqueada); doses de naloxona e tempo de monitorização de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q3 da UNIFESP 2022
{
  id:"q-adap22-003", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-anestesio", assuntoId:"ass-anestesio-viaaerea",
  enunciado:"Mulher, 52 anos, 118 kg, IMC 42 kg/m², será submetida a colecistectomia videolaparoscópica. Após indução com propofol, fentanil e rocurônio, a laringoscopia direta é malsucedida em três tentativas, e a videolaringoscopia, em uma tentativa. A ventilação com máscara facial e com dispositivo supraglótico de segunda geração não produz movimento torácico nem curva de capnografia. A SpO2 cai de 98% para 62% e a FC passa de 90 para 48 bpm. O bloqueio neuromuscular foi confirmado por monitor. Qual é a conduta imediata?",
  alternativas:[{id:"A",texto:"Nova tentativa de intubação com lâmina maior e pressão cricóidea, antes de qualquer outra medida."},{id:"B",texto:"Reversão do bloqueio com sugamadex e espera da respiração espontânea antes de nova abordagem."},{id:"C",texto:"Chamar o otorrinolaringologista para traqueostomia cirúrgica, mantendo a máscara facial até ele chegar."},{id:"D",texto:"Cricotireoidostomia por bisturi, bougie e tubo, como acesso cervical anterior de emergência."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **falha de intubação** (três laringoscopias diretas e uma videolaringoscopia), **falha de ventilação com máscara facial e com dispositivo supraglótico de segunda geração**, **ausência de capnografia** e **SpO2 de 62% com bradicardia**: é a situação de **não intubo, não oxigeno** (CICO). O bloqueio neuromuscular já está confirmado, então não há mais manobra de otimização. No algoritmo da Difficult Airway Society, a falha em oxigenar com as três vias esgotadas leva diretamente ao **acesso cervical anterior** pela técnica do bisturi: incisão horizontal na membrana cricotireóidea, rotação do bisturi, passagem do bougie e de um tubo de 6,0 com cuff. O tempo até a parada hipóxica é de poucos minutos, e a bradicardia mostra que ele já está se esgotando. A está errada porque nova laringoscopia repete uma estratégia que falhou quatro vezes e retarda a oxigenação; a pressão cricóidea ainda pode piorar a visão. B está errada porque o sugamadex pode ser dado em paralelo, mas esperar a ventilação espontânea não é possível com SpO2 de 62%, e a paciente obesa pode não respirar a tempo. C está errada porque a traqueostomia por especialista leva tempo que a paciente não tem, e a ventilação por máscara facial já falhou.",
  explicacoesAlternativas:{},
  referencias:"Frerk C et al. Difficult Airway Society 2015 guidelines for management of unanticipated difficult intubation in adults. Br J Anaesth 2015;115:827-48. A DAS publicou nova diretriz em 2025 (Br J Anaesth, PubMed 41203471, confirmada em 29/10/2026); resumos de fontes secundárias mantêm a sequência Plano A-D e a cricotireoidostomia por bisturi, bougie e tubo como técnica do Plano D. Texto integral não aberto.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q4 da UNIFESP 2022
{
  id:"q-adap22-004", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-urologia", assuntoId:"ass-uro-litiase",
  enunciado:"Mulher, 40 anos, chega ao pronto-socorro com dor lombar esquerda em cólica há 2 dias, febre de 38,9 °C e calafrios. Exame físico: PA 100 x 60 mmHg, FC 112 bpm, FR 24 irpm, lúcida, punho-percussão lombar esquerda dolorosa. Exames: leucócitos 18.400/mm³ com 12% de bastões, creatinina 1,4 mg/dL (basal 0,8), urina com leucocitúria e nitrito positivo. A tomografia sem contraste mostra cálculo de 8 mm no ureter proximal esquerdo, com hidronefrose moderada e borramento da gordura perirrenal. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Descompressão urgente da via urinária (duplo J ou nefrostomia), com hemoculturas e antibiótico venoso; cálculo depois."},{id:"B",texto:"Antibiótico venoso, analgesia e terapia expulsiva com tansulosina por 7 dias, programando litotripsia se o cálculo não sair."},{id:"C",texto:"Ureterolitotripsia flexível imediata com laser, que remove o cálculo e trata a obstrução em um único tempo."},{id:"D",texto:"Litotripsia extracorporal por ondas de choque na mesma tarde, associada ao antibiótico por via venosa."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: cálculo ureteral com **hidronefrose** e sinais de infecção: **febre de 38,9 °C**, **leucocitose de 18.400/mm³ com bastões**, **nitrito positivo** e **hipotensão (PA 100 x 60 mmHg)** com **taquipneia (FR 24)**. Pelo **qSOFA** (pressão sistólica de 100 mmHg ou menos; FR de 22 ou mais; alteração do estado mental), a paciente soma **2 de 3 pontos**, o que indica risco de sepse. Pielonefrite obstrutiva é emergência urológica: o rim infectado e obstruído precisa ser **descomprimido de imediato**, por stent duplo J ou nefrostomia percutânea (as duas têm resultado equivalente), com antibiótico venoso e hemoculturas; o cálculo é tratado só depois da resolução da infecção, em geral em 1 a 2 semanas. B está errada porque a terapia expulsiva com tansulosina é para cálculo não complicado, e adiar a descompressão em sepse obstrutiva aumenta a mortalidade. C está errada porque manipular o ureter e irrigar um sistema infectado e obstruído pode causar bacteremia e choque séptico. D está errada porque a litotripsia extracorporal também fragmenta o cálculo em sistema infectado, com risco de sepse, e é contraindicada em infecção ativa.",
  explicacoesAlternativas:{},
  referencias:"EAU Guidelines on Urolithiasis, edição de 2024 (European Association of Urology). Singer M et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA 2016;315:801-10. Texto oficial da EAU não aberto (rede bloqueada). A EAU publicou atualização limitada de urolitíase em 2025 e revisão completa em 2026 (cólica renal, terapia expulsiva, litotripsia e antitrombóticos), segundo o site da EAU em 29/10/2026; as condutas desta questão não foram conferidas nelas.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q5 da UNIFESP 2022
{
  id:"q-adap22-005", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-cardio", assuntoId:"ass-dac-cronica",
  enunciado:"Homem, 62 anos, diabético e hipertenso, com angina classe II da CCS há 8 meses apesar de metoprolol, anlodipino e isossorbida em doses adequadas. Ecocardiograma com fração de ejeção de 55%. Coronariografia: lesão de 70% no tronco da coronária esquerda e lesão de 80% na artéria descendente anterior proximal, com circunflexa e coronária direita sem lesões significativas. O escore SYNTAX calculado é de 35. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Cirurgia de revascularização do miocárdio, com maior benefício de sobrevida que a angioplastia nesse perfil anatômico."},{id:"B",texto:"Intervenção coronária percutânea com stent farmacológico, pois tem o mesmo resultado em qualquer valor do escore SYNTAX."},{id:"C",texto:"Manter o tratamento clínico e aumentar as doses, pois a angina é de classe funcional II e a função ventricular está preservada."},{id:"D",texto:"Intervenção coronária percutânea apenas da descendente anterior, deixando o tronco para depois do teste de isquemia."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **lesão de 70% no tronco da coronária esquerda** (obstrução de 50% ou mais já é indicação de revascularização), **acometimento da descendente anterior proximal**, **diabetes** e **escore SYNTAX de 35**. O SYNTAX estratifica a complexidade anatômica: **22 ou menos** (baixo), **23 a 32** (intermediário) e **33 ou mais** (alto). Para lesão de tronco com SYNTAX alto, a **cirurgia de revascularização** é a recomendação de classe I, com melhor sobrevida e menos reintervenção; a angioplastia fica para SYNTAX baixo ou intermediário, em pacientes selecionados. Aqui há ainda angina refratária e diabetes, que reforçam a cirurgia. B está errada porque a equivalência entre angioplastia e cirurgia vale só para anatomia de baixa complexidade, e com SYNTAX de 35 há mais eventos e reintervenção. C está errada porque lesão de tronco é indicação de revascularização por prognóstico, independentemente da classe da angina, e os sintomas já persistem com tratamento clínico adequado. D está errada porque tratar só a descendente anterior deixa o tronco sem tratamento, o que não corrige a lesão que ameaça a maior parte do miocárdio; o teste de isquemia não muda a indicação anatômica.",
  explicacoesAlternativas:{},
  referencias:"Lawton JS et al. 2021 ACC/AHA/SCAI Guideline for Coronary Artery Revascularization. Circulation 2022;145:e18-e114; Vrints C et al. 2024 ESC Guidelines for the management of chronic coronary syndromes. Eur Heart J 2024;45:3415-537. Textos oficiais não abertos (rede bloqueada). A diretriz ESC 2024 de síndromes coronarianas crônicas está publicada (Eur Heart J 2024;45, doi 10.1093/eurheartj/ehae177), confirmada em resumos em 29/10/2026.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q6 da UNIFESP 2022
{
  id:"q-adap22-006", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-anestesio", assuntoId:"ass-anestesio-complicacoes",
  enunciado:"Mulher, 34 anos, 62 kg, sem alergias conhecidas, é submetida a cirurgia ortopédica. Cinco minutos depois da indução com propofol, rocurônio e cefazolina, surgem eritema difuso e urticária no tronco, aumento da pressão de pico inspiratória de 18 para 42 cmH2O com sibilos à ausculta, SpO2 de 90% e PA de 60 x 30 mmHg, FC 140 bpm. A cirurgia ainda não começou. Qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Hidrocortisona 200 mg e difenidramina intravenosas, aguardando a resposta antes de qualquer outra medida."},{id:"B",texto:"Salbutamol inalatório e corticoide para o broncoespasmo, com vasopressor só se a pressão não melhorar em 30 minutos."},{id:"C",texto:"Epinefrina intravenosa em bolus de 50 a 100 mcg, titulada, com cristaloide, oxigênio a 100% e suspensão dos suspeitos."},{id:"D",texto:"Noradrenalina em infusão contínua e metilprednisolona, reservando a epinefrina para o caso de parada cardíaca."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: reação poucos minutos depois de **rocurônio e cefazolina** (os bloqueadores neuromusculares e os antibióticos são as causas mais comuns), com **urticária e eritema**, **broncoespasmo** (pressão de pico de 18 para **42 cmH2O**, sibilos, SpO2 de 90%) e **hipotensão com taquicardia** (60 x 30 mmHg, FC 140): anafilaxia perioperatória. Pela classificação de **Ring e Messmer**, é **grau III** (reação com broncoespasmo e/ou choque), que é a de maior risco (grau IV é a parada). A epinefrina é o tratamento de primeira linha: sob anestesia e monitorização, usa-se **50 a 100 mcg por via venosa, titulados** (infusão de 0,05 a 0,1 mcg/kg/min se persistir), com **expansão volêmica** de 20 mL/kg de cristaloide, oxigênio a 100% e suspensão dos agentes suspeitos. Anti-histamínico e corticoide são adjuvantes; não substituem a epinefrina. A está errada porque anti-histamínico e corticoide têm início lento e não revertem choque nem broncoespasmo; adiar a epinefrina aumenta a mortalidade. B está errada porque o broncoespasmo da anafilaxia é só uma parte do quadro, e esperar 30 minutos para tratar a hipotensão é perigoso. D está errada porque a epinefrina é o fármaco de escolha desde o grau III; a noradrenalina é de segunda linha e o corticoide não trata o choque agudo.",
  explicacoesAlternativas:{},
  referencias:"Garvey LH et al. Management of suspected immediate perioperative allergic reactions: an international overview and consensus recommendations. Br J Anaesth 2019;123:e50-e64; Ring J, Messmer K. Incidence and severity of anaphylactoid reactions to colloid volume substitutes. Lancet 1977;1:466-9. Textos oficiais não abertos (rede bloqueada).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q7 da UNIFESP 2022
{
  id:"q-adap22-007", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-abdagudo", assuntoId:"ass-diverticulite",
  enunciado:"Homem, 66 anos, diabético, apresenta dor em fossa ilíaca esquerda há 4 dias, que se tornou difusa nas últimas 12 horas, com febre de 38,7 °C e vômitos. Exame físico: PA 112 x 70 mmHg, FC 106 bpm, abdome rígido, com descompressão brusca dolorosa em todos os quadrantes. Leucócitos 21.000/mm³. A tomografia com contraste mostra espessamento do sigmoide com divertículos, grande quantidade de líquido livre com material fecaloide e ar livre na cavidade, sem coleção organizada. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Antibiótico venoso e drenagem percutânea guiada por tomografia, reavaliando o paciente em 48 horas."},{id:"B",texto:"Lavagem peritoneal laparoscópica com drenos, sem ressecar o sigmoide, para poupar o paciente de colostomia."},{id:"C",texto:"Sigmoidectomia, com colostomia terminal (Hartmann) ou anastomose com ileostomia de proteção, conforme a estabilidade."},{id:"D",texto:"Antibiótico por via oral e dieta líquida em casa, com retorno se houver piora ou febre."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: diverticulite com **peritonite difusa** (abdome rígido, descompressão brusca em todos os quadrantes), **ar livre e líquido livre** na tomografia e **ausência de coleção organizada**. Pela classificação de **Hinchey**, o quadro é **Hinchey IV** (peritonite fecal; o III é a purulenta generalizada): I é abscesso pericólico; II, abscesso pélvico ou distante; III, peritonite purulenta; IV, peritonite fecal. A peritonite generalizada exige **cirurgia de urgência com ressecção do segmento doente**: a operação de Hartmann (sigmoidectomia e colostomia terminal) é a mais segura no instável ou com comorbidades, e a anastomose primária com ileostomia de proteção é opção em paciente estável e selecionado. A está errada porque a drenagem percutânea trata abscesso (Hinchey Ib e II) com coleção acessível, o que não existe aqui; com peritonite difusa, ela retarda a cirurgia. B está errada porque a lavagem laparoscópica isolada mostrou mais reintervenções e abscessos residuais em ensaios clínicos, e não é recomendada de rotina quando há ar livre e líquido difuso. D está errada porque o tratamento ambulatorial só serve para diverticulite não complicada, sem sinais de peritonite.",
  explicacoesAlternativas:{},
  referencias:"Hall J et al. The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for the Management of Left-Sided Colonic Diverticulitis. Dis Colon Rectum 2020;63:728-47; Hinchey EJ et al. Treatment of perforated diverticular disease of the colon. Adv Surg 1978;12:85-109. Texto oficial não aberto (rede bloqueada). Não localizei atualização da ASCRS de diverticulite além da de 2020 até 29/10/2026; a diretriz da ACP de 2022 tem recomendações semelhantes.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q8 da UNIFESP 2022
{
  id:"q-adap22-008", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-trauma", assuntoId:"ass-traumaabd",
  enunciado:"Mulher, 25 anos, motociclista, sofre queda com impacto no flanco esquerdo. À chegada: PA 118 x 74 mmHg, FC 96 bpm, SpO2 98%, lúcida, dor à palpação do hipocôndrio esquerdo. O FAST mostra pequena quantidade de líquido perisplênico. A tomografia com contraste mostra laceração esplênica de 4 cm de profundidade, sem extravasamento ativo de contraste e com pequeno hemoperitônio. Hemoglobina 12,4 g/dL, estável na segunda coleta. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Laparotomia exploradora imediata, pois o FAST positivo em trauma fechado, por si só, indica cirurgia."},{id:"B",texto:"Tratamento não operatório, com internação monitorizada, repouso, exame abdominal e hemograma seriados."},{id:"C",texto:"Esplenectomia por via laparoscópica no mesmo dia, por tratar-se de laceração profunda do parênquima."},{id:"D",texto:"Angioembolização esplênica imediata, que está indicada em toda laceração de grau III, com ou sem blush."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: trauma fechado com **estabilidade hemodinâmica** (PA 118 x 74 mmHg, FC 96 bpm), **lúcida**, **hemoglobina estável** em duas coletas e tomografia com **laceração de 4 cm** (grau III da AAST, que vai de I, hematoma subcapsular pequeno, a V, baço destruído ou desvascularizado) **sem extravasamento ativo de contraste (blush)**. O paciente estável com lesão esplênica isolada é tratado de forma **não operatória** (taxa de sucesso acima de 90%), com internação monitorizada, exame abdominal e hemograma seriados e repouso. Indicam cirurgia a instabilidade hemodinâmica, a peritonite e a falha do tratamento não operatório; indicam angioembolização o blush, as lesões de grau IV ou V e a queda progressiva da hemoglobina. A está errada porque o FAST positivo, em paciente estável, não indica laparotomia: a tomografia define a lesão. C está errada porque a esplenectomia retira um órgão que se preserva em quase todos os casos estáveis, com risco de infecção grave pós-esplenectomia. D está errada porque a angioembolização não é obrigatória no grau III: é indicada quando há blush ou outro sinal de sangramento ativo, o que a tomografia descartou.",
  explicacoesAlternativas:{},
  referencias:"American College of Surgeons. ATLS – Advanced Trauma Life Support, 10ª ed., 2018 (a 11ª ed., de 2025, existe e não teve o texto conferido; resumos de fontes secundárias em 29/10/2026 citam o controle da hemorragia exsanguinante antes da via aérea (xABCDE) e não a tabela de classes de hemorragia); Coccolini F et al. Splenic trauma: WSES classification and guidelines for adult and pediatric patients. World J Emerg Surg 2017;12:40; Kozar RA et al. Organ injury scaling 2018 update: spleen, liver, and kidney. J Trauma Acute Care Surg 2018;85:1119-22. Textos oficiais não abertos (rede bloqueada).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q9 da UNIFESP 2022
{
  id:"q-adap22-009", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-orl", assuntoId:"ass-orl-fratura",
  enunciado:"Menino, 14 anos, recebe uma bolada no nariz durante partida de futebol. No dia seguinte, queixa-se de obstrução nasal completa e dor. Exame físico: edema discreto do dorso nasal, sem desvio da pirâmide; à rinoscopia anterior, as duas fossas nasais mostram abaulamento azulado e mole do septo, que cede à palpação com haste. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Redução fechada da pirâmide nasal em 5 a 7 dias, quando o edema tiver cedido por completo."},{id:"B",texto:"Incisão e drenagem do hematoma septal, com tamponamento nasal bilateral e antibiótico."},{id:"C",texto:"Compressas frias e descongestionante tópico, com retorno em 7 dias para nova avaliação clínica."},{id:"D",texto:"Septoplastia com enxerto de cartilagem no mesmo dia, para reconstruir o septo traumatizado."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: trauma nasal seguido de **obstrução completa**, dor e **abaulamento azulado, mole e flutuante do septo nas duas fossas**: hematoma septal. A cartilagem septal não tem vascularização própria e depende do mucopericôndrio; o hematoma a separa dessa irrigação e, em **24 a 72 horas**, pode causar **necrose da cartilagem**, abscesso e deformidade em sela. O tratamento é a **drenagem imediata** (incisão no ponto mais baixo), seguida de **tamponamento bilateral** para evitar recidiva e antibiótico para prevenir abscesso. A está errada porque o prazo de 5 a 7 dias é para a redução da fratura nasal; esperar com hematoma septal permite a necrose da cartilagem. C está errada porque o hematoma não reabsorve com medidas conservadoras e a infecção do coágulo é frequente. D está errada porque a reconstrução com enxerto é feita meses depois, se houver sequela, e não no hematoma agudo, que é tratado com drenagem simples.",
  explicacoesAlternativas:{},
  referencias:"Flint PW et al. Cummings Otolaryngology: Head and Neck Surgery, 7ª ed. Elsevier, 2021 (capítulo sobre trauma nasal e septal); Sociedade Brasileira de Otorrinolaringologia. Tratado de Otorrinolaringologia, 3ª ed. Textos de referência não abertos nesta rodada; conduta de memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q10 da UNIFESP 2022
{
  id:"q-adap22-010", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-trauma", assuntoId:"ass-atls",
  enunciado:"Homem, 28 anos, é trazido após ferimento por projétil de arma de fogo no abdome. Exame: confuso, pele fria e pegajosa, PA 84 x 58 mmHg, FC 128 bpm, FR 34 irpm, diurese de 10 mL/h na sonda vesical, abdome distendido. Hemoglobina 9,1 g/dL. Acesso venoso periférico calibroso já obtido. Qual é a classe de choque hemorrágico e a conduta inicial de ressuscitação mais adequada?",
  alternativas:[{id:"A",texto:"Classe II; infusão de 3 litros de cristaloide aquecido, com reavaliação da resposta hemodinâmica depois."},{id:"B",texto:"Classe IV; hemotransfusão maciça sem reavaliação, com laparotomia antes de qualquer exame de imagem."},{id:"C",texto:"Classe III; até 1 litro de cristaloide aquecido e hemácias, plasma e plaquetas precoces em proporção balanceada."},{id:"D",texto:"Classe III; 2 litros de cristaloide em bolus rápido antes de qualquer hemocomponente, para elevar a pressão."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **FC de 128 bpm** (acima de 120), **FR de 34 irpm** (30 a 40), **PA reduzida**, **confusão mental** e **diurese de 10 mL/h** (5 a 15 mL/h) correspondem à **classe III da tabela clássica do ATLS** (limites numéricos da 9ª edição), com perda de **31% a 40%** do volume (1.500 a 2.000 mL). A classificação do ATLS: **classe I**, até 15% da volemia, sem alteração de sinais; **classe II**, 15% a 30%, FC acima de 100 e diurese 20 a 30 mL/h; **classe III**, 31% a 40%, FC acima de 120, queda da pressão, FR 30 a 40, diurese 5 a 15 mL/h; **classe IV**, mais de 40%, FC acima de 140, FR acima de 35, letargia e diurese mínima. Na ressuscitação, o ATLS limita o cristaloide a **1 litro** e inicia **hemocomponentes precocemente** em proporção balanceada, porque o excesso de cristaloide dilui os fatores de coagulação e agrava a hipotermia e a acidose; o controle do sangramento (cirurgia) é o tratamento definitivo. A está errada porque os sinais não são de classe II (FC 100 a 120, pressão preservada) e 3 litros de cristaloide é o volume antigo, abandonado. B está errada porque a classe IV exige FC acima de 140 e letargia, e porque a hemotransfusão sem reavaliação não faz parte da conduta. D está errada porque 2 litros de cristaloide em bolus retardam o sangue e pioram a coagulopatia.",
  explicacoesAlternativas:{},
  referencias:"American College of Surgeons. ATLS – Advanced Trauma Life Support, 9ª ed., 2012 (limites numéricos da tabela de classes de hemorragia); a 10ª (2018) e a 11ª (2025) não foram conferidas quanto à tabela. Texto oficial não aberto (rede bloqueada); classes e limites de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q11 da UNIFESP 2022
{
  id:"q-adap22-011", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-neo-ecn",
  enunciado:"Recém-nascido de 30 semanas, 1.250 g, no 9º dia de vida, em dieta enteral plena com leite materno, apresenta vômitos biliosos, distensão abdominal progressiva, fezes com sangue, apneias e hipotensão. Exames: plaquetas 48.000/mm³, acidose metabólica (pH 7,18; excesso de bases -14 mEq/L) e proteína C reativa elevada. A radiografia de abdome com raios horizontais mostra pneumatose intestinal e ar livre sob o diafragma. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Manter jejum, sonda gástrica aberta e antibióticos, reavaliando em 48 horas, pois a perfuração pode fechar sozinha."},{id:"B",texto:"Iniciar alimentação trófica com leite materno ordenhado e antibiótico oral, mantendo vigilância clínica."},{id:"C",texto:"Drenagem peritoneal à beira do leito como tratamento definitivo, dispensando a laparotomia em qualquer peso."},{id:"D",texto:"Estabilização clínica e laparotomia, com ressecção do segmento necrótico e estomias, mantendo jejum e antibióticos."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: pré-termo em dieta enteral com **vômitos biliosos, distensão, sangue nas fezes, instabilidade hemodinâmica, plaquetopenia (48.000/mm³) e acidose metabólica**, e radiografia com **pneumatose** e **pneumoperitônio**: enterocolite necrosante em perfuração. Pela classificação de **Bell modificada por Walsh e Kliegman**, é o **estágio IIIB** (doença avançada, com perfuração intestinal): o estágio I é suspeita (sinais inespecíficos); o II é doença definida, com pneumatose (IIA leve, IIB moderada, com acidose e plaquetopenia); o III é doença avançada, com instabilidade (IIIA sem perfuração, IIIB com perfuração). A perfuração é indicação absoluta de cirurgia: depois de estabilizar o recém-nascido (ventilação, volume, antibióticos de amplo espectro, correção de plaquetas e acidose), faz-se a laparotomia com **ressecção do segmento necrótico** e estomias, com preservação máxima de intestino. A está errada porque a perfuração não fecha sozinha; a peritonite por conteúdo intestinal leva à sepse e à morte, e esperar 48 horas retarda a cirurgia. B está errada porque a alimentação está contraindicada na enterocolite necrosante, em qualquer estágio, e o antibiótico oral não trata a necrose transmural. C está errada porque a drenagem peritoneal é usada como ponte em prematuros extremos instáveis demais para a laparotomia, e não substitui a cirurgia em todo recém-nascido, sobretudo com 1.250 g.",
  explicacoesAlternativas:{},
  referencias:"Walsh MC, Kliegman RM. Necrotizing enterocolitis: treatment based on staging criteria. Pediatr Clin North Am 1986;33:179-201; Neu J, Walker WA. Necrotizing enterocolitis. N Engl J Med 2011;364:255-64. Textos não abertos nesta rodada; conduta de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q12 da UNIFESP 2022
{
  id:"q-adap22-012", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-urologia", assuntoId:"ass-uro-malformacoes",
  enunciado:"Recém-nascido a termo, sexo masculino, 5 dias de vida, com jato urinário fraco e gotejante desde o nascimento e bexiga palpável acima da sínfise. A ultrassonografia do pré-natal já mostrava hidronefrose bilateral. Ultrassonografia atual: hidronefrose e ureteres dilatados bilateralmente, bexiga de paredes espessadas, sem dilatação isolada da pelve renal. Creatinina sérica de 1,5 mg/dL, acima do esperado para a idade. Qual é o diagnóstico mais provável e a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Estenose da junção pieloureteral bilateral; cintilografia com DTPA e pieloplastia no primeiro mês."},{id:"B",texto:"Refluxo vesicoureteral primário grau V; reimplante ureteral bilateral antes da alta da maternidade."},{id:"C",texto:"Válvula de uretra posterior; sondagem vesical e uretrocistografia miccional, depois ablação endoscópica."},{id:"D",texto:"Ureterocele ectópica; ultrassonografia da bexiga cheia e incisão endoscópica da ureterocele de urgência."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **recém-nascido do sexo masculino** com **jato fraco e gotejante**, **bexiga palpável**, **hidronefrose e ureterohidronefrose bilaterais**, **bexiga de parede espessada** e **creatinina de 1,5 mg/dL** (acima do esperado): obstrução infravesical, que no menino de termo é, até prova em contrário, **válvula de uretra posterior**. A conduta inicial é **drenar a bexiga** (sonda de alimentação 5 ou 6 Fr), corrigir distúrbios hidroeletrolíticos e infecção, e confirmar o diagnóstico com **uretrocistografia miccional**, que mostra a uretra posterior dilatada e a bexiga trabeculada; o tratamento definitivo é a **ablação endoscópica das válvulas**. A creatinina que se mantém acima de 0,8 mg/dL no primeiro ano é fator de mau prognóstico renal. A está errada porque a estenose da junção pieloureteral dilata a pelve e os cálices sem dilatar os ureteres nem espessar a bexiga, e em geral é unilateral. B está errada porque o refluxo primário não explica o jato fraco nem a bexiga espessada, e o reimplante não é conduta neonatal. D está errada porque a ureterocele ectópica ocorre em sistema duplo, quase sempre em meninas e unilateral, e se vê como falha de enchimento na bexiga, sem o quadro de obstrução bilateral.",
  explicacoesAlternativas:{},
  referencias:"EAU/ESPU. EAU Guidelines on Paediatric Urology (capítulos sobre uropatia obstrutiva e válvula de uretra posterior), edição de 2024; Partin AW et al. Campbell-Walsh-Wein Urology, 12ª ed. Elsevier, 2020. Textos não abertos nesta rodada; conduta de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q13 da UNIFESP 2022
{
  id:"q-adap22-013", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-abdagudo", assuntoId:"ass-obstrucao",
  enunciado:"Lactente de 5 semanas, nascido a termo, em aleitamento materno exclusivo, apresenta vômitos não biliosos após todas as mamadas, cada vez mais intensos e em jato, há 10 dias. Mostra-se faminto após vomitar e perdeu 300 g desde a última consulta. Está desidratado (mucosas secas e fontanela deprimida). Exames: pH 7,52, bicarbonato 34 mEq/L, sódio 134 mEq/L, potássio 3,0 mEq/L e cloro 84 mEq/L. A ultrassonografia mostra músculo pilórico com 5 mm de espessura e canal com 19 mm de comprimento. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Piloromiotomia imediata, pois a cirurgia é a única forma de corrigir a alcalose do lactente."},{id:"B",texto:"Corrigir a alcalose e a desidratação com salina, glicose e potássio, e depois fazer a piloromiotomia."},{id:"C",texto:"Dilatação endoscópica do piloro com balão, que dispensa a anestesia geral e a cicatriz abdominal."},{id:"D",texto:"Atropina por via oral em doses crescentes por 3 semanas, com acompanhamento ambulatorial do ganho de peso."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: lactente de 5 semanas com **vômitos não biliosos em jato**, faminto depois de vomitar, com **perda de peso**, **alcalose metabólica hipoclorêmica e hipopotassêmica** (pH 7,52; bicarbonato 34 mEq/L; cloro 84 mEq/L; potássio 3,0 mEq/L) e ultrassonografia com **músculo pilórico de 5 mm** (o critério é 3 mm ou mais, ou 4 mm, conforme o serviço) e **canal de 19 mm** (17 mm ou mais): estenose hipertrófica do piloro. A cirurgia (piloromiotomia de Ramstedt) não é emergência: é indicada **depois de corrigir** a desidratação, a hipocloremia (alvo de cloro acima de 100 mEq/L) e a alcalose (bicarbonato abaixo de 30 mEq/L), porque a alcalose provoca hipoventilação e apneia pós-anestésica. A reposição é com solução salina a 0,9% com glicose a 5% e potássio, em volume de manutenção mais a reposição do déficit, assim que houver diurese. A está errada porque operar com alcalose não corrigida expõe a apneia e instabilidade na anestesia; a urgência é a reposição, não a cirurgia. C está errada porque a dilatação endoscópica com balão não trata a hipertrofia muscular e não é método de escolha. D está errada porque o tratamento clínico com atropina é longo, de eficácia inferior e exige internação ou acompanhamento intenso, e não se aplica a um lactente desidratado e com distúrbio metabólico.",
  explicacoesAlternativas:{},
  referencias:"Ashcraft KW et al. Pediatric Surgery, 7ª ed. Elsevier, 2019 (capítulo sobre estenose hipertrófica do piloro); Hernanz-Schulman M. Infantile hypertrophic pyloric stenosis. Radiology 2003;227:319-31. Textos não abertos nesta rodada; valores de corte de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q14 da UNIFESP 2022
{
  id:"q-adap22-014", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-cirtoracica", assuntoId:"ass-cirtorax-pleura",
  enunciado:"Homem, 20 anos, 1,86 m e 62 kg, tabagista, procura o pronto-socorro com dor torácica discreta à direita, que piora com a inspiração, sem dispneia, iniciada em repouso há 6 horas. Sem doença pulmonar prévia. Exame: FR 18 irpm, FC 80 bpm, PA 120 x 70 mmHg, SpO2 98% em ar ambiente, murmúrio vesicular diminuído no ápice direito, sem desvio de traqueia. A radiografia de tórax mostra descolamento pleural apical de 1 cm, sem desvio do mediastino. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Observação com oxigênio e radiografia de controle em 24 a 48 horas, com retorno se piorar."},{id:"B",texto:"Drenagem torácica em selo d'água, pois todo pneumotórax com dor ou dispneia exige dreno."},{id:"C",texto:"Pleurodese por videotoracoscopia imediata, para evitar a recorrência já no primeiro episódio."},{id:"D",texto:"Aspiração com cateter e agulha, seguida de internação por 72 horas com dreno de segurança."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: homem jovem, alto, magro e **tabagista**, sem doença pulmonar, com **pneumotórax espontâneo primário pequeno** (descolamento apical de **1 cm**), **sintomas mínimos** (FR de 18 irpm, SpO2 de 98%) e **estabilidade hemodinâmica**. Pela diretriz da British Thoracic Society de 2010, considera-se grande o pneumotórax com mais de **2 cm** de distância entre a parede torácica e a margem do pulmão ao nível do hilo, e a de 2023 passa a privilegiar os **sintomas** (e não só o tamanho): o paciente sem dor ou dispneia significativas pode ser **observado**, com oxigênio suplementar (que acelera a reabsorção), controle radiográfico em 24 a 48 horas e retorno se piorar. O paciente deve ser orientado a **parar de fumar**, e evitar voo e mergulho até a resolução. A aspiração por agulha é a primeira escolha quando o pneumotórax é grande (mais de 2 cm) ou o paciente tem dispneia; o dreno entra se a aspiração falha, se há instabilidade ou no secundário. B está errada porque o dreno é invasivo e desnecessário para pneumotórax pequeno e pouco sintomático. C está errada porque a pleurodese cirúrgica é indicada na recorrência, no escape aéreo persistente ou em profissões de risco, não no primeiro episódio pequeno. D está errada porque a aspiração é para o pneumotórax grande ou sintomático, e a internação por 72 horas com dreno de segurança não tem justificativa aqui.",
  explicacoesAlternativas:{},
  referencias:"MacDuff A et al. Management of spontaneous pneumothorax: British Thoracic Society Pleural Disease Guideline 2010. Thorax 2010;65(Suppl 2):ii18-31 e Roberts ME et al. BTS Pleural Disease Guideline 2023, Thorax 2023;78(Suppl 3) (conferida só em resumos). Texto oficial não aberto (rede bloqueada).",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q15 da UNIFESP 2022
{
  id:"q-adap22-015", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-cirtoracica", assuntoId:"ass-cirtorax-neoplasia",
  enunciado:"Homem, 74 anos, tabagista de 60 maços-ano, com doença pulmonar obstrutiva crônica grave e dispneia aos mínimos esforços. Espirometria: VEF1 de 0,7 L (28% do previsto); DLCO de 30% do previsto. Tomografia: nódulo de 2,0 cm no lobo superior direito, periférico, com biópsia que mostra adenocarcinoma. PET-CT sem captação em linfonodos nem à distância; mediastinoscopia negativa. Estadiamento clínico: T1b N0 M0. Recusa tratamento que exija ventilação prolongada. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Radioterapia estereotáxica corporal, com intenção curativa."},{id:"B",texto:"Lobectomia superior direita por videotoracoscopia, que é o padrão de tratamento e pode ser feita com reabilitação."},{id:"C",texto:"Quimioterapia com cisplatina e pemetrexede isolada, pois a doença não tem indicação de tratamento local."},{id:"D",texto:"Segmentectomia aberta com esvaziamento mediastinal, porque a ressecção sublobar tolera função pulmonar baixa."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: adenocarcinoma de **2,0 cm** (T1b), **N0 e M0** por PET-CT e mediastinoscopia: pela 9ª edição do TNM (vigente desde 2025; a 8ª também dava **estádio IA2** a T1b N0 M0). A cirurgia (lobectomia) é o tratamento padrão, mas o paciente tem **VEF1 de 28% do previsto** (a ressecção é arriscada com VEF1 pós-operatório previsto abaixo de 40%) e **DLCO de 30%** (também abaixo de 40%): ambos indicam **risco cirúrgico proibitivo**. Nesses pacientes com tumor inicial, a **radioterapia estereotáxica corporal (SBRT)** é a alternativa com intenção curativa, com controle local acima de 85% em 3 anos e baixa toxicidade. B está errada porque ressecção pulmonar com VEF1 e DLCO tão baixos tem mortalidade e incapacidade respiratória inaceitáveis, e a VATS não elimina esse risco. C está errada porque quimioterapia isolada não é tratamento curativo do estádio I e o paciente tem indicação de tratamento local. D está errada porque a segmentectomia, mesmo sublobar, é uma cirurgia sob anestesia geral e ventilação, inadequada com VEF1 de 28%, e o esvaziamento mediastinal é desnecessário num N0 confirmado por PET e mediastinoscopia.",
  explicacoesAlternativas:{},
  referencias:"Postmus PE et al. Early and locally advanced non-small-cell lung cancer (NSCLC): ESMO Clinical Practice Guidelines. Ann Oncol 2017;28(Suppl 4):iv1-iv21 (a atualização da ESMO de 2021 não foi conferida); Detterbeck FC et al. The Eighth Edition Lung Cancer Stage Classification. Chest 2017;151:193-203. Textos oficiais não abertos (rede bloqueada).",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q16 da UNIFESP 2022
{
  id:"q-adap22-016", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-pneumo", assuntoId:"ass-pneumo-bronquiectasias",
  enunciado:"Mulher, 45 anos, relata tosse produtiva diária com expectoração mucopurulenta há mais de 10 anos, com episódios de pneumonia sempre no mesmo lado. Exame físico: baqueteamento digital discreto e estertores grossos na base do pulmão direito. A radiografia de tórax mostra opacidades lineares paralelas e imagens em trilho na base direita. Qual é o exame mais adequado para confirmar o diagnóstico e definir a extensão do acometimento?",
  alternativas:[{id:"A",texto:"Broncoscopia flexível com lavado broncoalveolar, que visualiza o brônquio dilatado."},{id:"B",texto:"Broncografia com contraste iodado, que é o exame de referência para o diagnóstico."},{id:"C",texto:"Espirometria com prova broncodilatadora, que confirma o padrão obstrutivo característico."},{id:"D",texto:"Tomografia computadorizada de tórax de alta resolução, com cortes finos."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **tosse com expectoração mucopurulenta diária por anos**, **pneumonias de repetição no mesmo território**, **baqueteamento**, **estertores grossos** e radiografia com **opacidades em trilho**: bronquiectasias. O diagnóstico é confirmado pela **tomografia de tórax de alta resolução**: brônquio dilatado com **relação broncoarterial maior que 1** (anel de sinete), **ausência de afilamento** em direção à periferia e brônquios visíveis a menos de 1 cm da pleura; a tomografia também mostra a extensão e a presença de impactação mucoide. Depois, investiga-se a causa (imunoglobulinas, fibrose cística, aspergilose, discinesia ciliar, sequela de infecção). A está errada porque a broncoscopia mostra a árvore brônquica por dentro, não mede a dilatação dos brônquios distais e é reservada para obstrução ou hemoptise. B está errada porque a broncografia foi o exame de referência no passado, mas foi abandonada pela tomografia, que é não invasiva e mais precisa. C está errada porque a espirometria avalia a função, pode ser obstrutiva, restritiva ou normal, e não confirma o diagnóstico anatômico.",
  explicacoesAlternativas:{},
  referencias:"Polverino E et al. European Respiratory Society guidelines for the management of adult bronchiectasis. Eur Respir J 2017;50:1700629 (atualização posterior da ERS não conferida). Texto oficial não aberto (rede bloqueada). A diretriz ERS de bronquiectasia foi atualizada em dezembro de 2025 (Chalmers JD et al., Eur Respir J 2025, doi 10.1183/13993003.01126-2025), com testagem para micobactérias não tuberculosas em todos os pacientes e depuração das vias aéreas como recomendação forte, segundo fonte secundária em 29/10/2026; o diagnóstico por tomografia de alta resolução desta questão não muda.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q17 da UNIFESP 2022
{
  id:"q-adap22-017", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-ortopedia", assuntoId:"ass-orto-osteometabolicas",
  enunciado:"Menino, 6 anos, com osteogênese imperfeita tipo III confirmada por variante em gene do colágeno tipo I, apresenta 7 fraturas de ossos longos nos últimos 2 anos, dor óssea crônica e deformidade em arqueamento dos fêmures, e usa cadeira de rodas. Densitometria de coluna lombar com escore Z de -4,2. Qual abordagem terapêutica é a mais adequada?",
  alternativas:[{id:"A",texto:"Teriparatida diária, aprovada para crianças com osteogênese imperfeita grave por estimular a formação óssea."},{id:"B",texto:"Hormônio de crescimento isolado, para aumentar a estatura e a massa óssea da criança."},{id:"C",texto:"Bisfosfonato endovenoso cíclico (pamidronato), com fisioterapia, hastes intramedulares e vitamina D e cálcio."},{id:"D",texto:"Suplementação isolada de cálcio e vitamina D em dose alta, sem outra medicação."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: osteogênese imperfeita **tipo III** (grave e progressiva deformante), **7 fraturas em 2 anos**, **dor óssea**, **deformidades dos fêmures** e **escore Z de -4,2** na coluna lombar (o normal é entre -2 e +2). O tratamento é **multidisciplinar**: o **bisfosfonato endovenoso cíclico** (pamidronato ou zoledronato) aumenta a densidade mineral, reduz a dor e melhora a mobilidade, e há redução de fraturas vertebrais; associa-se **vitamina D e cálcio** para evitar hipocalcemia, **fisioterapia** com carga progressiva e **cirurgia ortopédica** com hastes intramedulares telescópicas para corrigir deformidades e prevenir novas fraturas. A está errada porque a teriparatida não é aprovada para crianças, que têm placas de crescimento abertas, pelo risco teórico de osteossarcoma. B está errada porque o hormônio de crescimento não corrige o defeito do colágeno e só se considera em casos selecionados, nunca isolado. D está errada porque cálcio e vitamina D são adjuvantes e não alteram a taxa de fraturas nem a dor na forma grave.",
  explicacoesAlternativas:{},
  referencias:"Glorieux FH et al. Cyclic administration of pamidronate in children with severe osteogenesis imperfecta. N Engl J Med 1998;339:947-52; Dwan K et al. Bisphosphonate therapy for osteogenesis imperfecta. Cochrane Database Syst Rev 2016;10:CD005088. Textos não abertos nesta rodada.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q18 da UNIFESP 2022
{
  id:"q-adap22-018", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-cirvascular", assuntoId:"ass-cirvasc-arterial",
  enunciado:"Mulher, 72 anos, com fibrilação atrial permanente, sem anticoagulação, refere dor súbita e intensa no pé esquerdo há 4 horas. Exame físico: pé frio e pálido, pulso femoral presente e poplíteo e distais ausentes à esquerda, hipoestesia apenas nos dedos, força muscular preservada. Ao Doppler, o sinal arterial no tornozelo é inaudível e o sinal venoso é audível. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Anticoagulação oral com varfarina e reavaliação em 24 horas, aguardando a formação de colaterais."},{id:"B",texto:"Heparina não fracionada intravenosa imediata e revascularização urgente, com embolectomia por cateter de Fogarty."},{id:"C",texto:"Amputação transfemoral primária, porque o pé já está frio e pálido há 4 horas."},{id:"D",texto:"Angiotomografia eletiva em 48 horas, antes de qualquer anticoagulação, para definir o nível da oclusão."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **fibrilação atrial sem anticoagulação** (fonte embólica), dor súbita com os seis P, **4 horas** de evolução, **perda sensitiva apenas nos dedos**, **sem déficit motor**, **sinal arterial inaudível e venoso audível**. Pela classificação de **Rutherford**, é a **categoria IIa** (ameaça marginal): I é viável (sem perda sensitiva nem motora, sinais arterial e venoso audíveis); IIa é ameaça marginal (perda sensitiva mínima nos dedos, sem fraqueza, sinal arterial em geral inaudível); IIb é ameaça imediata (perda sensitiva além dos dedos e fraqueza leve a moderada); III é irreversível (paralisia, anestesia e sinal venoso inaudível). O membro é salvável, e o tempo é crucial: **heparina não fracionada** em bolus e infusão imediatamente, e **revascularização urgente** (embolectomia por cateter de Fogarty, ou trombólise dirigida se for oclusão trombótica). A está errada porque a varfarina demora dias para agir, e o membro marginalmente ameaçado não espera. C está errada porque a amputação é para o membro irreversível (categoria III), o que não é o caso: há função motora e sinal venoso. D está errada porque adiar a heparina e a revascularização por 48 horas faz o membro evoluir para a categoria III; a imagem, se preciso, é feita em horas e não retarda a heparina.",
  explicacoesAlternativas:{},
  referencias:"Björck M et al. Editor's Choice – European Society for Vascular Surgery (ESVS) 2020 Clinical Practice Guidelines on the Management of Acute Limb Ischaemia. Eur J Vasc Endovasc Surg 2020;59:173-218; Rutherford RB et al. Recommended standards for reports dealing with lower extremity ischemia. J Vasc Surg 1997;26:517-38. Textos oficiais não abertos (rede bloqueada).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q19 da UNIFESP 2022
{
  id:"q-adap22-019", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-cirvascular", assuntoId:"ass-cirvasc-venosa",
  enunciado:"Homem, 60 anos, obeso, com varizes e edema do membro inferior direito há 15 anos, apresenta lesão ulcerada de 4 cm na região maleolar medial direita há 3 meses, com bordas irregulares, fundo com tecido de granulação e fibrina, pele ao redor escurecida e endurecida, e pouca dor. Pulsos pedioso e tibial posterior palpáveis; índice tornozelo-braquial de 1,1. Qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Antibioticoterapia oral prolongada empírica e curativo oclusivo sem compressão, para evitar edema na bandagem."},{id:"B",texto:"Enxertia de pele imediata, sem tratar o refluxo venoso, para fechar a lesão mais depressa."},{id:"C",texto:"Repouso absoluto com o membro em declive e curativo diário com pomada de antibiótico tópico."},{id:"D",texto:"Terapia compressiva (bandagem multicamadas ou bota de Unna) com curativo, e avaliação do refluxo para tratamento venoso."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: úlcera **maleolar medial**, de **bordas irregulares**, com **tecido de granulação**, **dermatite ocre e lipodermatoesclerose** ao redor, **pouca dor**, em obeso com varizes e edema crônicos, e **índice tornozelo-braquial de 1,1** (normal entre 0,9 e 1,3): úlcera venosa. Na classificação **CEAP**, é a **classe clínica C6** (úlcera ativa), com etiologia primária (Ep) quando não há trombose prévia; as classes vão de C0 (sem sinais) a C1 (telangiectasias), C2 (varizes), C3 (edema), C4 (alterações de pele), C5 (úlcera cicatrizada) e C6 (úlcera ativa). O tratamento de base é a **terapia compressiva** (bandagem multicamadas, bota de Unna ou meia de alta compressão), segura com ITB acima de 0,8 e contraindicada abaixo de 0,5, com curativo adequado; em seguida, avalia-se o **refluxo** (duplex) para tratamento venoso (ablação ou cirurgia), que reduz a recidiva. A está errada porque antibiótico sem sinais de infecção não cicatriza a úlcera e retirar a compressão mantém a hipertensão venosa que a causa. B está errada porque o enxerto sobre a úlcera sem corrigir a hipertensão venosa não pega e recidiva. C está errada porque o declive aumenta o edema e a hipertensão venosa; o membro deve ser elevado, e o antibiótico tópico sensibiliza.",
  explicacoesAlternativas:{},
  referencias:"De Maeseneer MG et al. Editor's Choice – European Society for Vascular Surgery (ESVS) 2022 Clinical Practice Guidelines on the Management of Chronic Venous Disease of the Lower Limbs. Eur J Vasc Endovasc Surg 2022;63:184-267; Lurie F et al. The 2020 update of the CEAP classification system. J Vasc Surg Venous Lymphat Disord 2020;8:342-52. Textos oficiais não abertos (rede bloqueada).",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q20 da UNIFESP 2022
{
  id:"q-adap22-020", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-neuro", assuntoId:"ass-neuro-avc",
  enunciado:"Mulher, 66 anos, chega ao pronto-socorro 90 minutos após o início súbito de hemiparesia direita e afasia. NIHSS de 12; glicemia capilar de 112 mg/dL; PA de 196 x 108 mmHg na chegada e 194 x 106 mmHg dez minutos depois. A tomografia de crânio sem contraste não mostra hemorragia nem hipodensidade extensa. Não usa anticoagulante, não foi operada nem teve sangramento recente; plaquetas de 220.000/mm³ e INR de 1,0. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Iniciar o trombolítico imediatamente, pois a pressão arterial não é critério de exclusão dentro da janela de 4,5 horas."},{id:"B",texto:"Reduzir a pressão arterial para menos de 185 x 110 mmHg com anti-hipertensivo venoso e, mantida nesse nível, administrar o trombolítico."},{id:"C",texto:"Não fazer trombólise, porque pressão acima de 185 x 110 mmHg é contraindicação absoluta; dar ácido acetilsalicílico e controlar a pressão."},{id:"D",texto:"Reduzir a pressão em 50% em uma hora com nitroprussiato e aguardar 24 horas para decidir sobre a trombólise."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: AVC isquêmico com **90 minutos** de evolução (dentro da janela de 4,5 horas), **NIHSS de 12** (a escala vai de 0 a 42: 1 a 4 déficit leve; 5 a 15 moderado; 16 a 20 moderado a grave; acima de 20 grave), tomografia sem hemorragia, glicemia, plaquetas e INR sem contraindicação, e **PA de 196 x 108 mmHg** (acima de 185 x 110 mmHg). A pressão elevada é uma **contraindicação reversível**: reduz-se com anti-hipertensivo venoso de ação curta (nicardipina ou labetalol) para **menos de 185 x 110 mmHg** e, mantida nesse nível, faz-se o trombolítico (alteplase 0,9 mg/kg ou tenecteplase 0,25 mg/kg), mantendo a pressão abaixo de **180 x 105 mmHg** nas 24 horas seguintes. A está errada porque a pressão acima de 185 x 110 mmHg antes do trombolítico eleva o risco de hemorragia intracraniana e precisa ser corrigida primeiro. C está errada porque não é contraindicação absoluta: pode ser corrigida em minutos, e perder a trombólise por isso significa abrir mão do tratamento que mais muda o desfecho. D está errada porque reduzir a pressão em 50% é inadequado no AVC isquêmico (a hipoperfusão aumenta a lesão), e 24 horas fora da janela de 4,5 horas impedem a trombólise.",
  explicacoesAlternativas:{},
  referencias:"Powers WJ et al. Guidelines for the Early Management of Patients With Acute Ischemic Stroke: 2019 Update (AHA/ASA). Stroke 2019;50:e344-e418; a diretriz AHA/ASA de 2026 existe (doi 10.1161/STR.0000000000000513); resumos de fontes secundárias, em 29/10/2026, confirmam a equivalência da tenecteplase (0,25 mg/kg) à alteplase e a manutenção de 185/110 mmHg antes da trombólise; o alvo <180/105 mmHg por 24 h após a trombólise não foi confirmado na edição 2026 e deve ser conferido no texto; o texto integral não foi aberto.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q21 da UNIFESP 2022
{
  id:"q-adap22-021", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-genetica", assuntoId:"ass-genetica-heranca",
  enunciado:"Mulher, 28 anos, tem um irmão com hemofilia A grave e um tio materno também afetado; a mãe é portadora, e a paciente foi confirmada portadora da mesma variante no gene F8 por teste molecular. O marido não tem hemofilia. Em consulta de aconselhamento pré-concepcional, ela pergunta sobre o modo de herança e o risco de ter um filho com a doença. Qual é a resposta correta?",
  alternativas:[{id:"A",texto:"Recessiva ligada ao X: 50% de risco de afetar cada filho do sexo masculino e 50% de a filha ser portadora."},{id:"B",texto:"Herança autossômica recessiva: todos os filhos, de ambos os sexos, têm 25% de risco de serem afetados."},{id:"C",texto:"Herança dominante ligada ao X: todas as filhas serão afetadas e nenhum filho do sexo masculino terá a doença."},{id:"D",texto:"Herança mitocondrial: a doença será transmitida a todos os filhos, pois vem da linhagem materna."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **afetados apenas do sexo masculino na família materna** (irmão e tio materno), mãe portadora e a paciente confirmada **portadora de variante em F8**, gene localizado no cromossomo X: herança **recessiva ligada ao X**. Uma mulher portadora (heterozigota) tem um cromossomo X com a variante e outro normal; a cada gestação, transmite o X alterado em **50%** dos casos. O filho do sexo masculino, com um só X, é afetado quando recebe esse X (**50%** de risco); a filha recebe o X do pai, normal, e será portadora em 50% das vezes (e afetada só em situações raras, como inativação desigual do X ou pai afetado). O diagnóstico pré-natal ou a seleção embrionária por teste genético são opções a discutir. B está errada porque na herança autossômica recessiva os dois sexos seriam afetados e os pais teriam de ser portadores; o risco de 25% se aplicaria ao casal de heterozigotos, o que não se vê aqui. C está errada porque na herança dominante ligada ao X as mulheres seriam afetadas na mesma frequência em todas as gerações, e aqui a mãe e a paciente são portadoras assintomáticas. D está errada porque a herança mitocondrial transmite o DNA mitocondrial pela mãe a todos os filhos de ambos os sexos, mas a hemofilia A não está no genoma mitocondrial e afeta só homens.",
  explicacoesAlternativas:{},
  referencias:"Nussbaum RL, McInnes RR, Willard HF. Thompson & Thompson Genetics and Genomics in Medicine, 9ª ed. Elsevier, 2016 (herança ligada ao X); Srivastava A et al. WFH Guidelines for the Management of Hemophilia, 3ª ed. Haemophilia 2020;26(Suppl 6):1-158. Textos não abertos nesta rodada; riscos de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q22 da UNIFESP 2022
{
  id:"q-adap22-022", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-ginecologia", assuntoId:"ass-ciclomenstrual",
  enunciado:"Mulher, 32 anos, nuligesta, com ciclos regulares até 8 meses atrás, apresenta amenorreia há 6 meses, fogachos, secura vaginal e insônia. Nega uso de medicamentos e prática de exercício intenso; IMC de 23 kg/m². Beta-hCG negativo; TSH e prolactina normais. FSH de 62 UI/L e estradiol de 12 pg/mL, repetidos com intervalo de 5 semanas com resultados semelhantes. Qual é o diagnóstico mais provável e a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Síndrome dos ovários policísticos; anticoncepcional oral combinado e metformina por 6 meses."},{id:"B",texto:"Amenorreia hipotalâmica funcional; orientar ganho de peso e psicoterapia, sem exames adicionais."},{id:"C",texto:"Insuficiência ovariana prematura; pedir cariótipo e FMR1 e iniciar terapia hormonal até os 50 anos."},{id:"D",texto:"Menopausa precoce irreversível; prescrever só cálcio e vitamina D, sem terapia hormonal por risco de câncer."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: mulher com **menos de 40 anos**, **amenorreia há 6 meses** (o critério é de pelo menos 4 meses de oligo ou amenorreia), **sintomas de hipoestrogenismo** (fogachos e secura vaginal), **FSH de 62 UI/L em duas dosagens com mais de 4 semanas de intervalo** (o critério atual é FSH acima de **25 UI/L**) e **estradiol baixo**, com beta-hCG, TSH e prolactina normais: **insuficiência ovariana prematura** (IOP). Pelo consenso da ESHRE de 2024, o diagnóstico exige oligo ou amenorreia por pelo menos 4 meses e FSH acima de 25 UI/L em mulher com menos de 40 anos; a diretriz de 2024 aceita uma dosagem com quadro típico e manda repetir em 4 a 6 semanas quando há dúvida (a de 2015 exigia duas dosagens). A investigação etiológica inclui **cariótipo**, **pré-mutação do gene FMR1** e anticorpos adrenais; a **terapia hormonal** é indicada até a idade média da menopausa natural (cerca de **50 a 51 anos**) para proteger ossos e coração, e não tem o risco da terapia da mulher mais velha. A está errada porque a síndrome dos ovários policísticos cursa com androgênios elevados e FSH normal, não com FSH de 62 UI/L e hipoestrogenismo. B está errada porque a amenorreia hipotalâmica tem FSH baixo ou normal, e o FSH elevado exclui esse diagnóstico. D está errada porque a IOP não é sinônimo de menopausa irreversível (cerca de 5% a 10% ovulam espontaneamente), e a terapia hormonal é indicada, não contraindicada, até a idade da menopausa natural.",
  explicacoesAlternativas:{},
  referencias:"Panay N et al. Evidence-based guideline: premature ovarian insufficiency. Hum Reprod Open 2024; ESHRE, 2024 (corte de FSH de 25 UI/L, uma dosagem com quadro típico, repetição em 4 a 6 semanas se houver dúvida; conferido só em resumos). Texto oficial não aberto (rede bloqueada); critérios e conduta de memória.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q23 da UNIFESP 2022
{
  id:"q-adap22-023", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-ginecologia", assuntoId:"ass-climaterio",
  enunciado:"Mulher, 49 anos, com útero íntegro, queixa-se de fogachos intensos, 10 episódios por dia, e insônia há 8 meses. Os ciclos, antes regulares, agora ocorrem a cada 70 a 90 dias. Exame físico e mamografia recente normais; IMC de 24 kg/m²; sem hipertensão, tabagismo, trombose prévia, enxaqueca com aura ou câncer de mama na família. Deseja tratamento. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Estradiol oral isolado em dose baixa, porque a progesterona aumentaria o risco de câncer de mama e não é necessária."},{id:"B",texto:"Fitoestrogênios de soja como primeira linha, porque a terapia hormonal é contraindicada antes da menopausa estabelecida."},{id:"C",texto:"Venlafaxina como primeira escolha, já que a terapia hormonal não deve ser usada antes dos 60 anos de idade."},{id:"D",texto:"Estradiol por via transdérmica associado à progesterona micronizada, com reavaliação anual do benefício e do risco."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **49 anos**, **ciclos com intervalo de 70 a 90 dias** e sintomas vasomotores intensos: pela classificação **STRAW+10**, a transição menopausal tardia (estágio -1) caracteriza-se por intervalos de 60 dias ou mais entre as menstruações; a menopausa só se define depois de **12 meses de amenorreia**. Ela tem **menos de 60 anos**, está na **janela de oportunidade** e não tem contraindicação (sem tromboembolismo, câncer de mama, sangramento não investigado, doença hepática ou doença cardiovascular). A terapia hormonal é o tratamento **mais eficaz** para fogachos. Como tem **útero**, o estrogênio precisa vir com **progestagênio** para proteger o endométrio; a via transdérmica evita a passagem hepática e tem menor risco de trombose que a oral, e a progesterona micronizada tem perfil favorável. Reavalia-se o benefício e o risco ao menos uma vez ao ano. A está errada porque o estrogênio isolado em mulher com útero aumenta o risco de hiperplasia e de câncer de endométrio. B está errada porque os fitoestrogênios têm eficácia próxima à do placebo e a terapia hormonal não é contraindicada na transição menopausal. C está errada porque os antidepressivos são opção para quem tem contraindicação ou recusa a terapia hormonal, e o limite de 60 anos é o da janela de oportunidade, não uma proibição antes dela.",
  explicacoesAlternativas:{},
  referencias:"The 2022 Hormone Therapy Position Statement of The North American Menopause Society. Menopause 2022;29:767-94; Harlow SD et al. Executive summary of the Stages of Reproductive Aging Workshop + 10 (STRAW+10). Menopause 2012;19:387-95. Textos não abertos nesta rodada; conduta de memória. Em novembro de 2025 a FDA anunciou a retirada do alerta de caixa preta de muitos produtos de terapia hormonal da menopausa, e a Menopause Society apoiou a retirada para estrogênio vaginal em baixa dose e manteve a avaliação individual do risco sistêmico, segundo fontes secundárias em 29/10/2026; não localizei atualização do position statement de 2022, e a conduta desta questão (janela de menos de 60 anos ou 10 anos de menopausa) segue coerente com as fontes.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q24 da UNIFESP 2022
{
  id:"q-adap22-024", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-oncogineco", assuntoId:"ass-caovario",
  enunciado:"Mulher, 19 anos, nuligesta, procura atendimento por aumento do volume abdominal e dor pélvica leve há 2 meses. Exame: massa pélvica de 14 cm, endurecida, móvel. Ultrassonografia e ressonância: massa sólida, multilobulada, de ovário direito, com septos espessos e vascularização intensa; útero e ovário esquerdo normais; sem ascite ou linfonodomegalia. Exames: DHL de 1.150 U/L (elevado); AFP e beta-hCG dentro dos limites normais; CA 125 de 48 U/mL. A biópsia por congelação intraoperatória confirma disgerminoma. Qual é o tratamento cirúrgico inicial mais adequado?",
  alternativas:[{id:"A",texto:"Salpingo-ooforectomia unilateral com estadiamento cirúrgico, preservando o útero e o ovário esquerdo."},{id:"B",texto:"Histerectomia total com anexectomia bilateral e omentectomia, que é o tratamento-padrão dos tumores ovarianos."},{id:"C",texto:"Ooforectomia bilateral isolada, seguida de reposição hormonal permanente."},{id:"D",texto:"Cistectomia ovariana com preservação do ovário direito e seguimento clínico semestral."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: mulher de **19 anos** com **massa ovariana sólida de 14 cm**, **DHL elevado** (1.150 U/L) e **AFP e beta-hCG normais**, com anatomia patológica de **disgerminoma**, o tumor maligno de células germinativas mais comum, que acomete mulheres jovens. O disgerminoma é muito sensível à quimioterapia e à radioterapia, e as pacientes são jovens com desejo reprodutivo; por isso o tratamento cirúrgico é **conservador**: **salpingo-ooforectomia unilateral** com **estadiamento cirúrgico** (lavado peritoneal, inspeção da cavidade, omento, linfonodos e biópsias), **preservando o útero e o ovário contralateral**, mesmo em doença avançada. A quimioterapia com BEP (bleomicina, etoposídeo e cisplatina) é dada em estádios acima de IA. A fertilidade é preservada em mais de 80% dos casos. B está errada porque a cirurgia radical não melhora a sobrevida num tumor altamente quimiossensível e elimina a fertilidade sem necessidade. C está errada porque retirar o ovário normal contralateral e condenar a jovem à menopausa precoce não tem justificativa. D está errada porque a cistectomia deixa tumor maligno residual e não faz o estadiamento; a lesão exige a retirada do ovário e dos anexos acometidos.",
  explicacoesAlternativas:{},
  referencias:"Ray-Coquard I et al. Non-epithelial ovarian cancer: ESMO Clinical Practice Guidelines for diagnosis, treatment and follow-up. Ann Oncol 2018;29(Suppl 4):iv1-iv18 (atualização posterior não conferida); FIGO Committee on Gynecologic Oncology. Staging of ovarian cancer, 2014. Textos não abertos nesta rodada; conduta de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q25 da UNIFESP 2022
{
  id:"q-adap22-025", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-planfamiliar", assuntoId:"ass-contracepcao",
  enunciado:"Mulher, 27 anos, G2P2, está no 15º dia após o parto vaginal, em aleitamento materno exclusivo, sem comorbidades, e quer iniciar um método contraceptivo. Segundo os critérios médicos de elegibilidade da Organização Mundial da Saúde e do CDC, qual dos métodos a seguir está na categoria 4, ou seja, o risco inaceitável contraindica o uso?",
  alternativas:[{id:"A",texto:"Implante subdérmico de etonogestrel."},{id:"B",texto:"Dispositivo intrauterino de cobre, inserido hoje mesmo."},{id:"C",texto:"Pílula de progestagênio isolado, a base de desogestrel."},{id:"D",texto:"Pílula combinada de etinilestradiol e progestagênio."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **15 dias após o parto**, **amamentando de forma exclusiva** e sem outros fatores de risco. Os critérios de elegibilidade usam quatro categorias: **1** (sem restrição), **2** (vantagens superam riscos), **3** (riscos superam vantagens) e **4** (risco inaceitável). Os **contraceptivos combinados** (pílula, anel e adesivo) estão na **categoria 4** nas primeiras semanas depois do parto, pelo risco aumentado de tromboembolismo venoso no puerpério (a OMS mantém a categoria 4 até a sexta semana e, depois, a categoria 3 enquanto houver amamentação nos primeiros 6 meses, pois o estrogênio pode reduzir o volume de leite). Os métodos só de progestagênio e o dispositivo intrauterino não pioram o risco de trombose e não diminuem a produção de leite; a inserção do dispositivo intrauterino entre 48 horas e 4 semanas é categoria 3 pela OMS e 2 pelo CDC, nunca 4. A está errada porque o implante de etonogestrel é categoria 2 nas duas fontes para a lactante nesse período, e não contraindica o uso. B está errada porque o dispositivo de cobre, depois de 48 horas e antes de 4 semanas, é categoria 3 (OMS) ou 2 (CDC), sem ser contraindicação absoluta. C está errada porque a pílula só de progestagênio (desogestrel) é categoria 2 nas duas fontes e é adequada à lactante.",
  explicacoesAlternativas:{},
  referencias:"World Health Organization. Medical eligibility criteria for contraceptive use, 5ª ed., 2015 (a 6ª ed., de 2025, existe; fontes secundárias em 29/10/2026 citam mudanças em progestagênios, como o DMPA, e não confirmaram a categoria dos combinados no puerpério, que deve ser conferida no texto); Nguyen AT et al. U.S. Medical Eligibility Criteria for Contraceptive Use, 2024. MMWR Recomm Rep 2024;73(4):1-126. Categorias de memória; as divergências entre as fontes só valem para o DIU.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q26 da UNIFESP 2022
{
  id:"q-adap22-026", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-ginecologia", assuntoId:"ass-uroginecologia",
  enunciado:"Mulher, 78 anos, hipertensa e diabética, queixa-se de sensação de peso e de uma bola saindo pela vagina há 1 ano, pior ao final do dia. Sem atividade sexual há 15 anos. Exame físico: ponto C a +1 cm do hímen e parede vaginal anterior com ponto Ba a +2 cm, sem perda urinária. Resíduo pós-miccional normal. Prefere evitar cirurgia, se possível. Qual é a abordagem inicial mais adequada?",
  alternativas:[{id:"A",texto:"Histerectomia vaginal com colporrafia anterior e posterior sob raquianestesia, como único tratamento eficaz."},{id:"B",texto:"Pessário vaginal, associado a estrogênio tópico, com orientação sobre uso e acompanhamento periódico."},{id:"C",texto:"Sling de polipropileno transobturatório, indicado para qualquer queixa de peso vaginal."},{id:"D",texto:"Colpocleise de Le Fort como primeira escolha, sem oferecer antes nenhuma alternativa conservadora."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: prolapso com **ponto C a +1 cm** e **Ba a +2 cm do hímen**. Na classificação **POP-Q**, o estágio é dado pelo ponto de maior prolapso: **0**, sem prolapso; **I**, o ponto mais distal está a mais de 1 cm acima do hímen (menor que -1); **II**, entre -1 e +1 cm do hímen; **III**, mais de +1 cm do hímen, porém sem protrusão total (até o comprimento vaginal total menos 2 cm); **IV**, eversão completa. Aqui o ponto Ba (+2 cm) e o C (+1 cm) definem o **estágio III**, sintomático. O tratamento inicial é conservador: o **pessário vaginal** é eficaz em grande parte das mulheres, de qualquer idade, e é opção segura para quem tem comorbidades; o **estrogênio tópico** reduz a erosão e a infecção, e a paciente deve ser acompanhada com retirada e limpeza periódicas. A cirurgia fica para quem recusa o pessário ou falha com ele. A está errada porque a histerectomia vaginal com colporrafia é opção cirúrgica e não trata o motivo de a paciente preferir evitar a cirurgia, além de acrescentar risco anestésico. C está errada porque o sling trata a incontinência de esforço, e ela não tem perda urinária. D está errada porque a colpocleise é uma excelente opção cirúrgica para mulheres idosas sem atividade sexual, mas só depois de oferecer o pessário e de a paciente aceitar a cirurgia irreversível.",
  explicacoesAlternativas:{},
  referencias:"American College of Obstetricians and Gynecologists. Practice Bulletin No. 214: Pelvic Organ Prolapse. Obstet Gynecol 2019;134:e126-42; Bump RC et al. The standardization of terminology of female pelvic organ prolapse and pelvic floor dysfunction. Am J Obstet Gynecol 1996;175:10-7. Textos não abertos nesta rodada.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q27 da UNIFESP 2022
{
  id:"q-adap22-027", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-oncogineco", assuntoId:"ass-camama",
  enunciado:"Mulher, 46 anos, assintomática, realiza mamografia de rastreamento, que mostra assimetria no quadrante superolateral da mama esquerda, sem calcificações suspeitas, vista em apenas uma das incidências. Exame clínico normal. O laudo é BI-RADS 0. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Repetir a mamografia em 12 meses, pois o achado não é conclusivo e não parece suspeito."},{id:"B",texto:"Biópsia cirúrgica com marcação pré-operatória da área da assimetria, sem outro exame."},{id:"C",texto:"Imagem adicional, com incidências complementares e ultrassonografia."},{id:"D",texto:"Ressonância magnética das mamas imediata, antes de qualquer outra avaliação por imagem."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **rastreamento** em mulher assintomática, com **assimetria** visível em apenas uma incidência e laudo **BI-RADS 0**. As categorias do BI-RADS são: **0**, avaliação adicional por imagem necessária; **1**, negativo; **2**, achado benigno; **3**, provavelmente benigno (risco de malignidade de até 2%), com seguimento em 6 meses; **4**, suspeito (4A, 4B e 4C, de 2% a 95%), com biópsia; **5**, altamente sugestivo de malignidade (95% ou mais); **6**, malignidade comprovada. A categoria 0 indica que o exame é **inconclusivo**: o próximo passo é completar a avaliação com **incidências adicionais** (compressão localizada, magnificação) e **ultrassonografia direcionada**, e então reclassificar. Muitas assimetrias focais são sobreposição de tecido normal. A está errada porque deixar um laudo inconclusivo para 12 meses atrasa o diagnóstico de um possível câncer. B está errada porque a biópsia cirúrgica é invasiva e prematura: a lesão ainda nem foi caracterizada, e a biópsia por agulha vem antes da cirurgia quando há indicação. D está errada porque a ressonância não é o exame de complementação de rotina de um BI-RADS 0 e tem custo e falsos-positivos maiores.",
  explicacoesAlternativas:{},
  referencias:"American College of Radiology. ACR BI-RADS Atlas, 5ª ed., 2013; Urban LABD et al. Recomendações do Colégio Brasileiro de Radiologia, da Sociedade Brasileira de Mastologia e da FEBRASGO para o rastreamento do câncer de mama (edição vigente não conferida). Textos não abertos nesta rodada.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q28 da UNIFESP 2022
{
  id:"q-adap22-028", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-ginecologia", assuntoId:"ass-miomatose",
  enunciado:"Mulher, 42 anos, G2P2, laqueadura tubária prévia, assintomática, tem em ultrassonografia de rotina um mioma intramural de 4 cm na parede anterior do útero. Os ciclos são regulares, de 28 dias, com fluxo de 4 dias e sem coágulos; sem dor pélvica, sintomas urinários ou intestinais. Hemoglobina de 13,4 g/dL. Não deseja nova gestação. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Acompanhamento clínico, com ultrassonografia periódica ou novo exame se surgirem sintomas."},{id:"B",texto:"Miomectomia laparoscópica, para evitar sangramento e crescimento do mioma nos próximos anos."},{id:"C",texto:"Embolização das artérias uterinas, por ser método menos invasivo que a cirurgia e eficaz."},{id:"D",texto:"Agonista do GnRH por 6 meses, para reduzir o volume do mioma e evitar a cirurgia depois."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: mioma **intramural de 4 cm** (**FIGO tipo 4**: intramural, sem contato com a cavidade nem com a serosa), **achado ocasional**, **ciclos regulares**, **sem sangramento aumentado** (hemoglobina de 13,4 g/dL), **sem sintomas compressivos** e sem desejo de gestar. A maioria dos miomas **assintomáticos** não precisa de tratamento: o risco de crescimento rápido ou de malignidade (leiomiossarcoma) é muito baixo, e o tratamento tem riscos. O manejo é **expectante**, com reavaliação clínica e ultrassonográfica periódica, ou se surgirem sintomas (sangramento, dor, compressão, aumento rápido). B está errada porque a miomectomia envolve riscos de aderência, hemorragia e rotura uterina em gestações futuras, e não está indicada em mioma assintomático. C está errada porque a embolização trata miomas sintomáticos e tem risco de insuficiência ovariana e de dor pós-procedimento; não se aplica ao assintomático. D está errada porque o agonista do GnRH é usado por curto prazo, em geral até 6 meses, como preparo de cirurgia, e o volume volta a crescer ao suspender o medicamento.",
  explicacoesAlternativas:{},
  referencias:"American College of Obstetricians and Gynecologists. Practice Bulletin No. 228: Management of Symptomatic Uterine Leiomyomas. Obstet Gynecol 2021;137:e100-15; Munro MG et al. The two FIGO systems for normal and abnormal uterine bleeding symptoms and classification of causes of AUB. Int J Gynaecol Obstet 2011;113:3-13. Textos não abertos nesta rodada.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q29 da UNIFESP 2022
{
  id:"q-adap22-029", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-ginecologia", assuntoId:"ass-miomatose",
  enunciado:"Mulher, 41 anos, G3P3, queixa-se de menstruações muito volumosas, com coágulos, há 2 anos, e fraqueza. Hemoglobina de 8,9 g/dL e ferritina baixa. Ultrassonografia: útero de 420 cm³ com três miomas intramurais de 5 a 6 cm, sem componente submucoso. Prole completa, recusa a histerectomia e quer um tratamento que preserve o útero e evite a cirurgia aberta. Já usou ácido tranexâmico e dispositivo intrauterino de levonorgestrel, sem controle do sangramento. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Histerectomia vaginal obrigatória, porque mioma com anemia só se resolve com a retirada do útero."},{id:"B",texto:"Embolização das artérias uterinas, que é opção para miomas sintomáticos em mulheres que querem preservar o útero."},{id:"C",texto:"Agonista do GnRH contínuo por 2 anos, que controla o sangramento e reduz os miomas de forma definitiva."},{id:"D",texto:"Miomectomia histeroscópica, que trata miomas intramurais volumosos pela cavidade uterina."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **sangramento menstrual intenso** com anemia (**hemoglobina de 8,9 g/dL**), **três miomas intramurais** (FIGO tipo 4), **útero de 420 cm³**, **prole completa**, falha de tratamento clínico (ácido tranexâmico e dispositivo de levonorgestrel) e desejo de **preservar o útero**. Para mulher sintomática que não deseja gestar, a **embolização das artérias uterinas** é opção eficaz e minimamente invasiva, que reduz o volume uterino em cerca de 40% a 60% e controla o sangramento em cerca de 85% a 90% dos casos, sem laparotomia; o risco é de falha, dor pós-embolização e, em mulheres mais velhas, de insuficiência ovariana. A miomectomia e a histerectomia também são opções, e a escolha deve ser compartilhada. A está errada porque a histerectomia é uma alternativa, mas não a única nem obrigatória, e a paciente a recusa; impor a retirada do útero contraria a preferência dela. C está errada porque o agonista do GnRH deve ser usado por no máximo 6 meses, pelo risco de perda óssea e de sintomas de hipoestrogenismo, e o mioma volta a crescer ao suspendê-lo. D está errada porque a miomectomia histeroscópica serve para miomas submucosos (tipos 0, 1 e 2), e os miomas desta paciente são intramurais, fora do alcance da cavidade.",
  explicacoesAlternativas:{},
  referencias:"American College of Obstetricians and Gynecologists. Practice Bulletin No. 228: Management of Symptomatic Uterine Leiomyomas. Obstet Gynecol 2021;137:e100-15; Os percentuais de redução do volume e de controle do sangramento são de memória e a referência do ensaio EMMY (embolização versus histerectomia) não foi conferida. Textos não abertos nesta rodada.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q30 da UNIFESP 2022
{
  id:"q-adap22-030", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-oncogineco", assuntoId:"ass-cacolo",
  enunciado:"Gestante, 26 anos, com 16 semanas de gestação, tem citologia com lesão intraepitelial de alto grau. A colposcopia é satisfatória, com achados maiores no colo, sem sinais de invasão. A biópsia dirigida mostra neoplasia intraepitelial cervical grau 3 (NIC 3), sem invasão do estroma. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Seguimento com colposcopia a cada trimestre; reavaliar depois do parto e tratar só se persistir."},{id:"B",texto:"Conização com bisturi frio imediata, pois a lesão é de alto grau e não deve esperar muito."},{id:"C",texto:"Histerectomia total com preservação da gestação, para tratar de forma definitiva a lesão."},{id:"D",texto:"Excisão eletrocirúrgica com alça (CAF) no consultório, na própria semana do diagnóstico."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **16 semanas de gestação**, **NIC 3 sem invasão do estroma** confirmado por biópsia dirigida e **colposcopia satisfatória** sem sinais de câncer. Na gestação, o risco de progressão do NIC 3 para câncer invasor é muito baixo (cerca de 0,4%) e a regressão pós-parto é frequente; o tratamento excisional durante a gravidez tem risco de hemorragia, perda gestacional e parto prematuro. A conduta é o **seguimento colposcópico a cada trimestre** (com biópsia só se a lesão piorar ou houver suspeita de invasão) e a reavaliação **depois do parto** (a ASCCP admite a partir de 4 semanas e o material brasileiro costuma indicar cerca de 90 dias), quando se decide o tratamento excisional. Se houver suspeita de invasão, faz-se a biópsia e a conização diagnóstica. B está errada porque a conização na gestação só se justifica diante de suspeita de câncer invasor, e traz risco de hemorragia grave e de abortamento. C está errada porque a histerectomia seria desproporcional para um NIC 3 sem invasão e interromperia a gestação. D está errada porque a excisão com alça, assim como a conização, é adiada para depois do parto; a CAF também sangra e pode causar complicações obstétricas.",
  explicacoesAlternativas:{},
  referencias:"Perkins RB et al. 2019 ASCCP Risk-Based Management Consensus Guidelines for Abnormal Cervical Cancer Screening Tests and Cancer Precursors. J Low Genit Tract Dis 2020;24:102-31; Brasil. Ministério da Saúde/INCA. Diretrizes brasileiras para o rastreamento do câncer do colo do útero, 2ª ed., 2016. Textos não abertos nesta rodada. Buscas na web em 29/10/2026 não confirmaram atualização das diretrizes ASCCP de 2019, embora listagens de aplicativo mencionem recomendações sobre autocoleta de HPV, sem data; o texto oficial não foi aberto.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q31 da UNIFESP 2022
{
  id:"q-adap22-031", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-sangramentos",
  enunciado:"Secundigesta, 29 anos, parto vaginal a termo sem intercorrências, recebeu 10 UI de ocitocina por via intramuscular após o desprendimento do ombro anterior. A placenta saiu íntegra. Dez minutos depois, a perda sanguínea medida em campo coletor calibrado é de 650 mL e o sangramento continua. PA 98 x 60 mmHg, FC 118 bpm, pele fria. O útero está amolecido e acima da cicatriz umbilical, e o canal de parto não tem lacerações visíveis. Além de pedir ajuda, qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Misoprostol 800 mcg por via sublingual como primeira escolha, aguardando 30 minutos para avaliar a resposta antes de usar outras medidas."},{id:"B",texto:"Ácido tranexâmico apenas depois da falha de ocitocina e ergometrina, e somente dentro de 3 horas, porque antes disso não tem benefício comprovado."},{id:"C",texto:"Histerectomia de urgência, pois a perda de 650 mL com sinais de choque indica a retirada do útero, sem tentar tratamento clínico antes."},{id:"D",texto:"Massagem uterina, ocitocina e ácido tranexâmico 1 g por via venosa, cristaloide, esvaziamento da bexiga e revisão do canal."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: parto vaginal com **perda de 650 mL medida em campo calibrado** (o critério de hemorragia pós-parto é **500 mL ou mais**, ou 300 mL com instabilidade), **PA de 98 x 60 mmHg e FC de 118 bpm** e **útero amolecido acima da cicatriz umbilical**: atonia uterina. O **índice de choque** (FC dividida pela pressão sistólica) é de 118/98, **1,2** (o normal é de 0,5 a 0,7, e acima de 0,9 prediz transfusão), o que indica choque. A OMS (2023, mantido nas recomendações consolidadas OMS/FIGO/ICM de 2025) recomenda o uso do **pacote de tratamento** E-MOTIVE logo após a detecção: **massagem uterina, ocitocina por via venosa, ácido tranexâmico 1 g por via venosa em 10 minutos, cristaloide, exame do canal de parto e da placenta, esvaziamento da bexiga** e escalonamento (balão, transferência) se não houver resposta em 15 minutos. No ensaio E-MOTIVE, o pacote reduziu em cerca de 60% a hemorragia grave depois do parto vaginal. A está errada porque o misoprostol é alternativa quando a ocitocina não está disponível, e esperar 30 minutos sem as demais medidas é inadequado. B está errada porque o ácido tranexâmico é parte do tratamento inicial, dado em até 3 horas, e não somente depois da falha de outros fármacos. C está errada porque a histerectomia é medida de salvamento, depois de falharem o tratamento clínico, o balão e as suturas compressivas.",
  explicacoesAlternativas:{},
  referencias:"World Health Organization. WHO recommendations on the assessment of postpartum blood loss and treatment bundles for postpartum haemorrhage, 2023; Gallos I et al. Randomized trial of early detection and treatment of postpartum hemorrhage. N Engl J Med 2023;389:11-21. Confirmado só em resumos obtidos pela busca (texto oficial da OMS não aberto: rede bloqueada). Em outubro de 2025 saíram as recomendações consolidadas OMS/FIGO/ICM sobre hemorragia pós-parto (51 recomendações, 20 novas ou atualizadas), que mandam agir já com 300 mL de perda ou sinais vitais alterados e acionar o pacote MOTIVE logo após o diagnóstico, segundo fontes secundárias em 29/10/2026; doses e condutas específicas não foram conferidas no texto.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q32 da UNIFESP 2022
{
  id:"q-adap22-032", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-trabalhoparto",
  enunciado:"Primigesta, 24 anos, 39 semanas, em trabalho de parto, bolsa íntegra. Às 8h: dilatação de 5 cm, apresentação cefálica no plano 0 de DeLee, dinâmica uterina de 2 contrações de 30 segundos em 10 minutos, BCF de 140 bpm. Às 12h: dilatação de 6 cm, plano 0, dinâmica uterina inalterada, BCF de 138 bpm, sem variações patológicas. Paciente confortável, sem febre, pelve clinicamente adequada e feto de peso estimado em 3.200 g. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Cesárea imediata por parada de progressão, uma vez que 4 horas foram suficientes para o diagnóstico de distocia."},{id:"B",texto:"Aguardar mais 4 horas sem intervenção, porque na fase ativa a dilatação lenta é normal em primigestas."},{id:"C",texto:"Amniotomia e ocitocina, com avaliação da dinâmica e da cardiotocografia, por dinâmica insuficiente."},{id:"D",texto:"Aplicação de fórcipe de alívio, para acelerar o desprendimento e abreviar o sofrimento da parturiente."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **5 cm de dilatação** (início da fase ativa na definição atual da OMS), **progressão de apenas 1 cm em 4 horas** (menos de 1 cm por hora é lento; a progressão é considerada anormal quando a dilatação não avança em 2 a 4 horas com contrações adequadas), **2 contrações em 10 minutos** (o adequado é de **3 a 5 em 10 minutos, com mais de 40 segundos**) e **bolsa íntegra**, com feto e pelve normais: **hipoatividade uterina**. A conduta é **amniotomia** (que acelera o trabalho de parto e permite avaliar o líquido) e **ocitocina** para corrigir a dinâmica, com monitoração das contrações e da frequência cardíaca fetal; a maioria evolui para o parto vaginal. A está errada porque a cesárea por distocia só se indica depois de corrigida a dinâmica uterina, e a progressão lenta sem ocitocina não é falha do trabalho de parto. B está errada porque 4 horas sem progressão com contrações insuficientes não são esperadas e se corrigem; esperar mais tempo aumenta infecção e exaustão. D está errada porque o fórcipe exige dilatação completa e apresentação em plano baixo, o que não acontece com 6 cm e plano 0.",
  explicacoesAlternativas:{},
  referencias:"World Health Organization. WHO recommendations: intrapartum care for a positive childbirth experience, 2018, e Labour Care Guide, 2020; American College of Obstetricians and Gynecologists. Obstetric Care Consensus No. 1: Safe Prevention of the Primary Cesarean Delivery, 2014 (reafirmado). Textos não abertos nesta rodada; conduta de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q33 da UNIFESP 2022
{
  id:"q-adap22-033", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-dmg",
  enunciado:"Gestante, 31 anos, IMC de 31 kg/m², com 27 semanas e glicemia de jejum de 84 mg/dL na primeira consulta, é submetida a teste oral de tolerância à glicose com 75 g de glicose, com resultados de 88 mg/dL em jejum, 183 mg/dL em 1 hora e 146 mg/dL em 2 horas. Considerando os critérios do IADPSG, adotados pela OMS e pelo Ministério da Saúde, qual é o diagnóstico e a conduta inicial?",
  alternativas:[{id:"A",texto:"Tolerância normal, porque a glicemia em jejum e a de 2 horas estão abaixo dos pontos de corte."},{id:"B",texto:"Diabetes mellitus pré-gestacional, por haver valor de 1 hora acima de 180 mg/dL; iniciar insulina de imediato."},{id:"C",texto:"Resultado duvidoso; repetir o teste em 4 semanas antes de qualquer orientação, sem restrição alimentar."},{id:"D",texto:"Diabetes gestacional (um valor alterado basta); dieta, atividade física e automonitorização glicêmica."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: TOTG com 75 g às 27 semanas e **valor de 1 hora de 183 mg/dL**. Os pontos de corte do IADPSG são: **jejum de 92 a 125 mg/dL**, **1 hora de 180 mg/dL ou mais** e **2 horas de 153 a 199 mg/dL**; **um único valor alterado** basta para o diagnóstico de **diabetes mellitus gestacional**. Aqui o jejum (88) e as 2 horas (146) estão abaixo do corte, mas a hora 1 (183) o ultrapassa. Valores de jejum de 126 mg/dL ou mais, ou de 2 horas de 200 mg/dL ou mais, indicariam diabetes mellitus manifesto na gestação. A conduta inicial é **orientação nutricional**, **atividade física** e **automonitorização glicêmica**; a insulina entra se as metas (jejum abaixo de 95 mg/dL e 1 hora pós-prandial abaixo de 140 mg/dL, ou 2 horas abaixo de 120 mg/dL) não forem atingidas em 1 a 2 semanas. A está errada porque um único valor alterado já fecha o diagnóstico; não é preciso que todos estejam alterados. B está errada porque o corte de 180 mg/dL na hora 1 define diabetes gestacional, não pré-gestacional, e a insulina não é a primeira escolha. C está errada porque repetir o teste atrasa o tratamento de uma condição com risco de macrossomia e de complicações neonatais.",
  explicacoesAlternativas:{},
  referencias:"International Association of Diabetes and Pregnancy Study Groups Consensus Panel. Diabetes Care 2010;33:676-82; American Diabetes Association. Standards of Care in Diabetes — 2025, seção 15 (gestação). Diabetes Care 2025;48(Suppl 1). Textos não abertos nesta rodada; pontos de corte de memória. As Standards of Care 2026 foram publicadas (Diabetes Care 2026;49 Suppl 1, dez/2025); a seção correspondente não foi conferida nelas (29/10/2026).",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q34 da UNIFESP 2022
{
  id:"q-adap22-034", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-trabalhoparto",
  enunciado:"Parto vaginal de gestante de 33 anos, diabética gestacional em uso de insulina, feto com peso estimado de 4.300 g. Depois do desprendimento da cabeça, esta retrai contra o períneo, e a tração moderada não consegue desprender o ombro anterior, que está impactado atrás da sínfise púbica. Não há circular de cordão. A equipe foi chamada e anotou o horário. Qual é a manobra inicial mais adequada?",
  alternativas:[{id:"A",texto:"Tração vigorosa da cabeça fetal para baixo e para a frente, com dois profissionais, até soltar o ombro."},{id:"B",texto:"Compressão do fundo uterino (manobra de Kristeller) por um assistente, associada à tração da cabeça."},{id:"C",texto:"Manobra de McRoberts, com hiperflexão das coxas sobre o abdome, associada a pressão suprapúbica."},{id:"D",texto:"Cesariana de emergência para recolocar a cabeça no canal (manobra de Zavanelli) como primeira medida."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **diabetes gestacional**, **macrossomia** (4.300 g), **retração da cabeça contra o períneo** (sinal da tartaruga) e **ombro anterior impactado** sem se desprender com tração moderada: **distocia de ombro**. A conduta inicial é pedir ajuda, anotar o horário e executar a **manobra de McRoberts** (hiperflexão e abdução das coxas, que retifica a lordose lombar e rotaciona a sínfise) com **pressão suprapúbica** (manobra de Rubin I) no ombro impactado; essas duas medidas resolvem cerca de 40% a 60% dos casos. O mnemônico **HELPERR** organiza os passos: pedir ajuda (Help), avaliar a episiotomia (Evaluate), pernas (Legs, McRoberts), pressão suprapúbica (Pressure), manobras internas (Enter: Rubin II, Woods), remover o braço posterior (Remove) e rolar a paciente (Roll, posição de quatro apoios). A está errada porque a tração vigorosa da cabeça pode lesionar o plexo braquial do feto e não resolve a impactação. B está errada porque a pressão no fundo uterino empurra o ombro contra a sínfise e agrava a distocia. D está errada porque a manobra de Zavanelli é o último recurso, depois de falharem todas as outras.",
  explicacoesAlternativas:{},
  referencias:"American College of Obstetricians and Gynecologists. Practice Bulletin No. 178: Shoulder Dystocia. Obstet Gynecol 2017;129:e123-33 (reafirmado). Texto oficial não aberto (rede bloqueada); percentuais de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q35 da UNIFESP 2022
{
  id:"q-adap22-035", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-trabalhoparto",
  enunciado:"Gestante, 28 anos, G2P1, com 33 semanas e 2 dias confirmadas por ultrassonografia do primeiro trimestre, procura a maternidade com perda de líquido claro pela vagina há 6 horas. Sem contrações, sem febre, sem sangramento. Exame: temperatura de 36,8 °C, útero indolor, BCF de 144 bpm; ao exame especular, saída de líquido claro pelo colo, com teste de ruptura positivo. Ultrassonografia: apresentação cefálica e índice de líquido amniótico de 4 cm. A cultura para estreptococo do grupo B é desconhecida. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Alta com repouso domiciliar e retorno em 7 dias, pois a ruptura ainda não evoluiu para trabalho de parto."},{id:"B",texto:"Internação expectante com corticoide antenatal, antibiótico de latência e profilaxia do GBS; parto com 34 semanas."},{id:"C",texto:"Tocólise com nifedipina e sulfato de magnésio, para prolongar a gestação até 37 semanas."},{id:"D",texto:"Indução imediata do parto com ocitocina, sem corticoide, pelo risco de infecção ovular."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **33 semanas e 2 dias**, **ruptura de membranas há 6 horas com teste positivo**, **sem sinais de infecção** (temperatura de 36,8 °C, útero indolor, BCF normal) e **sem trabalho de parto**: rotura prematura de membranas pré-termo. Antes de **34 semanas**, a conduta é **expectante, em internação**: **corticoide antenatal** (betametasona 12 mg, 2 doses com 24 horas de intervalo) para maturação pulmonar, **antibiótico de latência** (ampicilina e amoxicilina por 7 dias, associadas à azitromicina), que prolonga a gestação e reduz a infecção neonatal, **profilaxia para estreptococo do grupo B** (cultura desconhecida) durante o trabalho de parto e **monitoração de infecção**. O parto é indicado a partir de **34 semanas** (ou antes, se houver corioamnionite, descolamento, sofrimento fetal ou trabalho de parto). Na pré-termo tardia (34 0/7 a 36 6/7), o parto é recomendado sem prolongar a conduta expectante. A está errada porque a alta com ruptura confirmada expõe a mãe e o feto a infecção ovular e à falta de maturação pulmonar. C está errada porque a tocólise não é recomendada na rotura prematura de membranas, pelo risco de corioamnionite e sem benefício. D está errada porque induzir o parto sem corticoide, com 33 semanas, expõe o recém-nascido à doença da membrana hialina evitável.",
  explicacoesAlternativas:{},
  referencias:"American College of Obstetricians and Gynecologists. Practice Bulletin No. 217: Prelabor Rupture of Membranes. Obstet Gynecol 2020;135:e80-97. Texto oficial não aberto (rede bloqueada); esquemas de memória. Buscas na web em 29/10/2026 não localizaram revisão posterior do Practice Bulletin nº 217 (2020), dos corticoides antenatais (2017, reafirmados) nem do parecer sobre corioamnionite (2017); o texto oficial não foi aberto.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q36 da UNIFESP 2022
{
  id:"q-adap22-036", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-ginecologia", assuntoId:"ass-ists",
  enunciado:"Gestante, 27 anos, 36 semanas, teve o primeiro episódio de herpes genital com 28 semanas, tratado com aciclovir por 7 dias, com cicatrização completa. Está assintomática, sem lesões ao exame, e quer saber como evitar a transmissão ao recém-nascido. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Aciclovir supressivo desde 36 semanas; cesárea só se houver lesão ativa ou pródromos no parto."},{id:"B",texto:"Cesárea eletiva às 39 semanas para toda gestante com antecedente de herpes, haja ou não lesão ativa."},{id:"C",texto:"Aciclovir somente durante o trabalho de parto, e parto vaginal em qualquer caso, mesmo com lesões."},{id:"D",texto:"Nenhum tratamento, pois a infecção ocorreu há mais de 8 semanas e as lesões já cicatrizaram."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **primeira infecção com 28 semanas**, tratada, **hoje sem lesões** e com 36 semanas. O risco de herpes neonatal é maior quando a primoinfecção ocorre no fim da gestação e quando há **lesão ativa** no parto, e a transmissão acontece pelo contato com secreção no canal de parto. Por isso, a gestante com herpes genital recebe **aciclovir (400 mg 3 vezes ao dia) ou valaciclovir (500 mg 2 vezes ao dia) a partir de 36 semanas**, que reduz as lesões e a excreção viral no parto; a **cesárea** é indicada apenas se houver **lesões genitais ativas ou sintomas prodrômicos** no início do trabalho de parto. Na ausência de lesões, o parto vaginal é permitido. B está errada porque o antecedente de herpes, sem lesão no parto, não é indicação de cesárea. C está errada porque aciclovir só durante o trabalho de parto não reduz a excreção viral, e o parto vaginal com lesões ativas expõe o recém-nascido ao risco de infecção. D está errada porque a primoinfecção no terceiro trimestre é justamente a situação de maior risco, e a profilaxia supressiva reduz recorrências no parto.",
  explicacoesAlternativas:{},
  referencias:"American College of Obstetricians and Gynecologists. Practice Bulletin No. 220: Management of Genital Herpes in Pregnancy. Obstet Gynecol 2020;135:e193-202; Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis, 2022. Textos não abertos nesta rodada. Buscas na web em 29/10/2026 não localizaram edição do PCDT de IST posterior a 2022 além da portaria de março de 2026 que amplia a doxiciclina como profilaxia pós-exposição; o texto oficial não foi aberto.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q37 da UNIFESP 2022
{
  id:"q-adap22-037", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-prenatal",
  enunciado:"Mulher de 38 anos, primigesta, com idade gestacional de 12 semanas, obesa (IMC de 34 kg/m²) e hipertensa crônica em uso de metildopa, inicia o acompanhamento obstétrico. A PA no consultório é de 138 x 88 mmHg. Qual medida reduz o risco de pré-eclâmpsia nessa paciente?",
  alternativas:[{id:"A",texto:"Ácido acetilsalicílico em dose baixa (81 a 150 mg/dia), à noite, iniciado entre 12 e 16 semanas."},{id:"B",texto:"Ácido acetilsalicílico 500 mg por dia a partir do terceiro trimestre, associado a cálcio isolado."},{id:"C",texto:"Heparina de baixo peso molecular profilática durante toda a gestação, para prevenir lesão placentária."},{id:"D",texto:"Nenhuma profilaxia farmacológica, apenas vigilância da pressão arterial a cada consulta."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **hipertensão crônica**, **obesidade (IMC de 34 kg/m²)**, **idade de 38 anos** e **nuliparidade**: ela tem um fator de **risco alto** (hipertensão crônica) e vários de risco moderado (obesidade, idade acima de 35 anos, nuliparidade). A FIGO, a ACOG e a USPSTF recomendam **ácido acetilsalicílico em dose baixa** (81 a 150 mg por dia, conforme o protocolo; a FIGO sugere 150 mg), **à noite**, iniciado **entre 12 e 16 semanas** (idealmente antes de 16) e mantido **até 36 semanas pela FIGO** (a ACOG e a USPSTF mantêm até o parto), o que reduz a pré-eclâmpsia pré-termo em cerca de 60% a 70% quando bem iniciado. Em populações com baixa ingestão de cálcio, a suplementação de 1,5 a 2 g por dia também é recomendada. B está errada porque a dose de 500 mg não é a profilática e o início no terceiro trimestre é tardio, fora da janela em que a prevenção funciona. C está errada porque a heparina não previne a pré-eclâmpsia e não é indicada para essa finalidade. D está errada porque a paciente tem indicação de profilaxia, e só vigiar a pressão perde a oportunidade de prevenir.",
  explicacoesAlternativas:{},
  referencias:"Poon LC et al. The International Federation of Gynecology and Obstetrics (FIGO) initiative on pre-eclampsia: A pragmatic guide for first-trimester screening and prevention. Int J Gynaecol Obstet 2019;145(Suppl 1):1-33; US Preventive Services Task Force. Aspirin use to prevent preeclampsia and related morbidity and mortality. JAMA 2021;326:1186-91. Textos não abertos nesta rodada; doses de memória. Não localizei substituição do ACOG Practice Bulletin nº 222 até 29/10/2026; uma revisão sistemática de 2026 no AJOG indica doses de aspirina de 75 a 162 mg/dia nas diretrizes internacionais, com início e critérios variáveis; o texto oficial não foi aberto.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q38 da UNIFESP 2022
{
  id:"q-adap22-038", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-dmg",
  enunciado:"Puérpera de 30 anos, no 2º dia após parto vaginal a termo, tinha diabetes gestacional controlado apenas com dieta e atividade física. Glicemias capilares em jejum no puerpério de 82 e 88 mg/dL. O recém-nascido está bem. Na alta, qual é a orientação mais adequada para o seguimento metabólico da mãe?",
  alternativas:[{id:"A",texto:"Não é necessário seguimento, pois o diabetes gestacional cura com a saída da placenta."},{id:"B",texto:"Dosar a glicemia em jejum em 1 semana e, se normal, encerrar o seguimento metabólico."},{id:"C",texto:"TOTG com 75 g entre 6 e 12 semanas depois do parto, com seguimento periódico."},{id:"D",texto:"Hemoglobina glicada em 2 semanas, com início de metformina profilática se for maior que 5,7%."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: diabetes gestacional **controlado com dieta**, glicemias de jejum **normais** no puerpério (82 e 88 mg/dL). Mesmo assim, a mulher que teve diabetes gestacional tem **risco de cerca de 50% de desenvolver diabetes mellitus tipo 2 em 10 a 20 anos**. A recomendação é fazer o **teste oral de tolerância à glicose com 75 g entre 6 e 12 semanas depois do parto** (que dá o diagnóstico de diabetes, pré-diabetes ou normalidade) e, se for normal, repetir a avaliação **a cada 1 a 3 anos**; orientar manutenção do peso e atividade física, e estimular o aleitamento, que reduz o risco. A glicemia de jejum isolada é menos sensível que o teste de tolerância. A está errada porque a cura do estado gestacional não elimina o risco futuro de diabetes tipo 2. B está errada porque a glicemia de jejum em 1 semana é muito precoce, a hiperglicemia da gestação pode persistir ou reaparecer, e a avaliação não se encerra com um único exame. D está errada porque a hemoglobina glicada em 2 semanas é afetada pela gestação e pelo sangramento puerperal, e a metformina não é profilaxia nesse momento.",
  explicacoesAlternativas:{},
  referencias:"American Diabetes Association. Standards of Care in Diabetes — 2025, seção 15 (gestação). Diabetes Care 2025;48(Suppl 1); Sociedade Brasileira de Diabetes. Diretriz da SBD, edição vigente não conferida. Textos não abertos nesta rodada. As Standards of Care 2026 foram publicadas (Diabetes Care 2026;49 Suppl 1, dez/2025); a seção correspondente não foi conferida nelas (29/10/2026).",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q39 da UNIFESP 2022
{
  id:"q-adap22-039", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-obstetricia", assuntoId:"ass-abortamento",
  enunciado:"Mulher, 25 anos, G1P0, com 9 semanas pela data da última menstruação, procura atendimento por sangramento vaginal leve e desaparecimento das náuseas. Exame: colo fechado, útero compatível com 7 semanas, sem dor intensa; hemodinamicamente estável. A ultrassonografia transvaginal mostra embrião com comprimento cabeça-nádega de 9 mm, sem batimentos cardíacos, e saco gestacional de 30 mm. Ela prefere evitar internação. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Curetagem uterina cortante sob anestesia, que continua sendo o método de escolha nesse quadro."},{id:"B",texto:"Ocitocina 10 UI por via intramuscular e alta, aguardando a eliminação espontânea do tecido em 3 meses."},{id:"C",texto:"Aguardar 8 semanas sem acompanhamento e retornar somente se houver sangramento intenso."},{id:"D",texto:"Misoprostol 800 mcg por via vaginal (repetível em 24 a 48 horas) ou aspiração manual intrauterina."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **embrião com 9 mm** (o critério ultrassonográfico de falha gestacional é **comprimento cabeça-nádega de 7 mm ou mais sem batimentos**), **sem batimentos cardíacos**, **colo fechado**, sangramento leve e estabilidade hemodinâmica: aborto retido (perda gestacional precoce). As opções para o esvaziamento são a **conduta expectante**, o **tratamento medicamentoso** com **misoprostol 800 mcg por via vaginal**, que pode ser repetido em 24 a 48 horas e resolve o quadro em cerca de 85% a 90% dos casos, e a **aspiração intrauterina** (a manual é a de escolha para a maioria, e a elétrica, em serviço equipado). A escolha é da paciente, com informação sobre dor, sangramento e a possibilidade de falha. A está errada porque a curetagem cortante foi substituída pela aspiração, que é mais segura e tem menos risco de perfuração e de síndrome de Asherman. B está errada porque a ocitocina intramuscular não esvazia o útero em aborto retido do primeiro trimestre. C está errada porque aguardar 8 semanas sem acompanhamento expõe à hemorragia e à infecção, e a conduta expectante exige orientação e reavaliação programadas.",
  explicacoesAlternativas:{},
  referencias:"American College of Obstetricians and Gynecologists. Practice Bulletin No. 200: Early Pregnancy Loss. Obstet Gynecol 2018;132:e197-207; World Health Organization. Abortion care guideline, 2022. Textos não abertos nesta rodada; esquemas de memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q40 da UNIFESP 2022
{
  id:"q-adap22-040", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-oftalmo", assuntoId:"ass-oft-glaucoma",
  enunciado:"Homem, 62 anos, míope, é encaminhado por escavação do disco óptico aumentada em exame de rotina. A pressão intraocular é de 17 mmHg em ambos os olhos, em três medidas em horários diferentes; a gonioscopia mostra ângulo aberto; a relação escavação/disco é de 0,8 no olho direito e 0,6 no esquerdo, com afilamento da rima neural inferior no direito. A campimetria computadorizada mostra defeito arqueado superior à direita. Sem uso de corticoide e sem trauma. Qual é o diagnóstico e a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Olho normal; reavaliar em 5 anos, pois a pressão intraocular normal exclui o diagnóstico de glaucoma."},{id:"B",texto:"Glaucoma primário de ângulo aberto, mesmo com pressão normal; reduzir a pressão em 30% com colírio."},{id:"C",texto:"Hipertensão ocular; apenas observar, pois a lesão do campo visual ainda não se instalou."},{id:"D",texto:"Glaucoma agudo de ângulo fechado; iridotomia a laser imediata em ambos os olhos, de urgência."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **escavação do disco de 0,8** com **afilamento da rima neural**, **defeito arqueado de campo visual** concordante com a lesão (superior à direita corresponde à rima inferior), **ângulo aberto** na gonioscopia e **pressão intraocular de 17 mmHg** (o normal é de 10 a 21 mmHg): glaucoma primário de ângulo aberto **com pressão normal**, ou de pressão normal. A pressão elevada é fator de risco, não condição para o diagnóstico: o glaucoma é uma **neuropatia óptica** com alteração estrutural e funcional característica. O tratamento é **reduzir a pressão em pelo menos 30%** em relação ao valor inicial, e a primeira escolha é um **colírio de análogo de prostaglandina** (uma vez à noite), com avaliação periódica do campo visual e do disco. A está errada porque a pressão normal não exclui glaucoma, e o paciente tem lesão estrutural e funcional comprovadas. C está errada porque hipertensão ocular é pressão elevada sem lesão do disco ou do campo, o contrário deste paciente, que tem as duas lesões e pressão normal. D está errada porque o glaucoma agudo cursa com dor, olho vermelho, visão turva e ângulo fechado, e aqui o ângulo é aberto e o quadro é assintomático.",
  explicacoesAlternativas:{},
  referencias:"Weinreb RN, Aung T, Medeiros FA. The pathophysiology and treatment of glaucoma: a review. JAMA 2014;311:1901-11; European Glaucoma Society. Terminology and Guidelines for Glaucoma, 5ª ed. Br J Ophthalmol 2021;105(Suppl 1):1-169. Textos não abertos nesta rodada.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q41 da UNIFESP 2022
{
  id:"q-adap22-041", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-go", especialidadeId:"esp-planfamiliar", assuntoId:"ass-contracepcao",
  enunciado:"Mulher, 24 anos, IMC de 34 kg/m², procura a unidade de saúde 60 horas depois de uma relação sexual sem proteção, na segunda semana do ciclo. Não usa método contraceptivo, não tem contraindicação a nenhum método e deseja evitar a gravidez. Qual é a melhor orientação?",
  alternativas:[{id:"A",texto:"Levonorgestrel 1,5 mg em dose única, que tem a mesma eficácia em todas as faixas de peso e de IMC."},{id:"B",texto:"Dispositivo intrauterino de cobre, que é o método mais eficaz, ou acetato de ulipristal 30 mg em dose única."},{id:"C",texto:"Pílula combinada em dois blocos de 4 comprimidos (método de Yuzpe), com intervalo de 12 horas entre eles."},{id:"D",texto:"Nenhuma medida, pois já se passaram mais de 24 horas e a contracepção de emergência perde o efeito."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: relação desprotegida há **60 horas**, em **segunda semana do ciclo** (perto da ovulação), e **IMC de 34 kg/m²**. A contracepção de emergência pode ser usada até **120 horas** (5 dias) depois da relação. O **dispositivo intrauterino de cobre** inserido em até 5 dias é o método **mais eficaz** (falha menor que 1%) e serve também como contracepção contínua; o **acetato de ulipristal 30 mg** é eficaz até 120 horas e mantém a eficácia melhor que o levonorgestrel em mulheres com **IMC de 30 kg/m² ou mais**, nas quais o levonorgestrel é menos eficaz. A está errada porque a eficácia do levonorgestrel diminui com o aumento de peso e de IMC, e cai depois de 72 horas (a eficácia cai mais quanto mais tarde). C está errada porque o método de Yuzpe é menos eficaz e causa mais náuseas que o levonorgestrel, e só é lembrado quando nenhum outro está disponível. D está errada porque o prazo é de 120 horas, e não de 24 horas; ainda há dois métodos eficazes disponíveis.",
  explicacoesAlternativas:{},
  referencias:"Faculty of Sexual and Reproductive Healthcare. FSRH Clinical Guideline: Emergency Contraception, 2023; American College of Obstetricians and Gynecologists. Practice Bulletin No. 152: Emergency Contraception. Obstet Gynecol 2015;126:e1-11 (reafirmado). Textos não abertos nesta rodada; conduta de memória. A 4ª edição das Selected Practice Recommendations da OMS foi publicada em novembro de 2025 (ISBN 978-92-4-011560-6), segundo o catálogo da OMS em 29/10/2026; o conteúdo sobre ulipristal, levonorgestrel e IMC não foi conferido nela.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q42 da UNIFESP 2022
{
  id:"q-adap22-042", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-bioestatistica",
  enunciado:"Um estudo de coorte avaliou a associação entre o uso de determinado medicamento e a ocorrência de um evento adverso em 5 anos. O risco relativo estimado foi de 1,8, com intervalo de confiança de 95% de 0,9 a 3,4 e valor de p de 0,09. Qual é a interpretação mais adequada desse resultado?",
  alternativas:[{id:"A",texto:"O medicamento é seguro, porque o estudo provou que não há associação com o evento adverso."},{id:"B",texto:"O medicamento aumenta o risco, com 91% de certeza, e deve ser retirado do mercado imediatamente."},{id:"C",texto:"Sem significância a 5%, mas o intervalo admite aumento importante do risco; o poder pode ser pequeno."},{id:"D",texto:"O valor de p de 0,09 indica que a probabilidade de a hipótese nula ser verdadeira é de 9%."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **risco relativo de 1,8**, **intervalo de confiança de 95% de 0,9 a 3,4** (inclui o valor 1, que indica ausência de efeito) e **p de 0,09**, acima do nível de significância convencional de **0,05**. Isso significa que os dados são compatíveis com o **valor nulo** (RR = 1), e não permitem rejeitar a hipótese nula ao nível de 5%. Porém, o intervalo vai de uma redução de 10% a um aumento de mais de 3 vezes: é amplo, e compatível com um efeito clinicamente importante. A ausência de significância reflete **imprecisão** (amostra ou número de eventos insuficiente, ou seja, baixo poder), e não prova a ausência de efeito. O que o p de 0,09 diz é a probabilidade de se obter dados tão ou mais extremos que os observados **se a hipótese nula fosse verdadeira**. A está errada porque ausência de significância não prova ausência de efeito (ausência de evidência não é evidência de ausência). B está errada porque o p de 0,09 não significa 91% de certeza de efeito, e o intervalo inclui o 1. D está errada porque o valor de p não é a probabilidade de a hipótese nula ser verdadeira, mas a probabilidade dos dados dada a hipótese nula.",
  explicacoesAlternativas:{},
  referencias:"Greenland S et al. Statistical tests, P values, confidence intervals, and power: a guide to misinterpretations. Eur J Epidemiol 2016;31:337-50; Altman DG, Bland JM. Absence of evidence is not evidence of absence. BMJ 1995;311:485. Textos não abertos nesta rodada.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q43 da UNIFESP 2022
{
  id:"q-adap22-043", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-medidasepi",
  enunciado:"Em um município com 50.000 habitantes, havia 400 pessoas com determinada doença crônica no dia 1º de janeiro. Durante o ano, surgiram 150 casos novos, e 50 doentes (todos eles do grupo de 400 que já existia) morreram. Não houve cura nem migração. Considere a população de 50.000 estável. Qual é o coeficiente de incidência acumulada no ano (por 1.000 pessoas em risco) e a prevalência em 31 de dezembro (por 1.000 habitantes)?",
  alternativas:[{id:"A",texto:"Incidência de 3,0/1.000 e prevalência de 10/1.000."},{id:"B",texto:"Incidência de 3,0 por 1.000 e prevalência de 8,0 por 1.000."},{id:"C",texto:"Incidência de 3,0 por 1.000 e prevalência de 11 por 1.000."},{id:"D",texto:"Incidência de 12 por 1.000 e prevalência de 10 por 1.000."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **400 casos existentes em 1º de janeiro** (prevalentes), **150 casos novos** (incidentes) e **50 óbitos entre os doentes**, em população de **50.000**. A **incidência acumulada** é o número de casos novos dividido pela **população em risco no início do período**, isto é, os que ainda não tinham a doença: 50.000 - 400 = **49.600**; 150/49.600 = **0,003024**, ou **3,0 por 1.000**. A **prevalência** em 31 de dezembro é o total de casos existentes nesse dia: 400 + 150 - 50 = **500 casos**, e 500/50.000 = **0,01**, ou **10 por 1.000** (1%). Vale a relação aproximada **prevalência = incidência x duração média da doença**. B está errada porque usa 400/50.000 = 8 por 1.000, a prevalência de 1º de janeiro, e ignora os casos novos e os óbitos. C está errada porque soma os casos novos aos prevalentes (550/50.000 = 11 por 1.000) e esquece os 50 óbitos. D está errada porque 12 por 1.000 (600/50.000) soma prevalentes, casos novos e óbitos como se todos fossem incidentes; a incidência usa só os 150 casos novos, divididos pela população em risco.",
  explicacoesAlternativas:{},
  referencias:"Medronho RA et al. Epidemiologia, 2ª ed. Atheneu, 2009 (medidas de frequência); Rothman KJ. Epidemiology: An Introduction, 2ª ed. Oxford University Press, 2012. Textos não abertos nesta rodada.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q44 da UNIFESP 2022
{
  id:"q-adap22-044", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-vigilancia",
  enunciado:"A vigilância epidemiológica de um município recebe, em um fim de semana, cinco notificações de gastroenterite aguda em moradores de bairros diferentes, que não se conhecem, todos com vômitos e diarreia 6 a 12 horas depois de comer fora de casa. Qual é o primeiro passo da investigação do possível surto?",
  alternativas:[{id:"A",texto:"Confirmar o diagnóstico e ver se os casos superam o esperado para o local e o período."},{id:"B",texto:"Aplicar medidas de controle em todos os locais de venda de alimentos, antes de verificar os casos."},{id:"C",texto:"Calcular o risco relativo de cada alimento servido, antes mesmo de definir quem é caso."},{id:"D",texto:"Comunicar o ocorrido à imprensa, para que as pessoas que participaram procurem atendimento."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **cinco casos de gastroenterite** em pessoas sem vínculo conhecido, com **período de incubação curto** (6 a 12 horas, compatível com toxina bacteriana pré-formada, como a do Bacillus cereus ou a do Staphylococcus aureus): ainda não se sabe se há um surto. A investigação de surto segue passos: (1) **confirmar o diagnóstico** e verificar se há **excesso de casos** em relação ao esperado, ou seja, se há de fato um surto; (2) definir **caso** (tempo, lugar, pessoa e quadro clínico); (3) **buscar casos** adicionais; (4) fazer a **descrição** por tempo, lugar e pessoa (curva epidêmica); (5) formular **hipóteses**; (6) **testar hipóteses** (risco relativo em coorte, odds ratio em caso-controle); (7) **coletar amostras** de alimentos, de fezes e de vômito; (8) adotar **medidas de controle**; (9) **comunicar** os resultados. As medidas de controle imediatas, se necessárias, não esperam o fim da investigação, mas o primeiro passo continua sendo a confirmação. B está errada porque agir em todos os locais sem saber qual alimento e qual caso gera custo e não resolve. C está errada porque calcular risco relativo exige antes uma definição de caso e a busca de casos e de não casos. D está errada porque a comunicação à imprensa é uma etapa final e controlada, e antes de confirmar pode causar pânico ou estigma.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Guia de Vigilância em Saúde, 6ª ed., 2023 (investigação de surtos); Centers for Disease Control and Prevention. Principles of Epidemiology in Public Health Practice, 3ª ed. (Lesson 6). Textos não abertos nesta rodada; sequência de passos de memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q45 da UNIFESP 2022
{
  id:"q-adap22-045", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-bioestatistica",
  enunciado:"Um estudo de coorte seguiu 200 trabalhadores expostos a um solvente e 300 trabalhadores não expostos, durante 10 anos. Nesse período, a doença de interesse ocorreu em 40 dos expostos e em 30 dos não expostos. Qual é o risco relativo e a diferença de risco (risco atribuível) associados à exposição?",
  alternativas:[{id:"A",texto:"Risco relativo de 2,0; diferença de risco de 10 pontos percentuais."},{id:"B",texto:"Risco relativo de 2,25; diferença de risco de 10 pontos percentuais."},{id:"C",texto:"Risco relativo de 2,0; diferença de risco de 20 pontos percentuais."},{id:"D",texto:"Risco relativo de 0,5; diferença de risco de -10 pontos percentuais."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **coorte** com **200 expostos (40 doentes)** e **300 não expostos (30 doentes)**. O **risco nos expostos** (incidência acumulada) é 40/200 = **20%**; nos não expostos, 30/300 = **10%**. O **risco relativo** é a razão entre os dois: 20/10 = **2,0** (o risco é o dobro). A **diferença de risco** (ou risco atribuível) é a subtração: 20% - 10% = **10 pontos percentuais**, ou seja, 10 casos a mais por 100 expostos em 10 anos atribuíveis à exposição; a **fração atribuível nos expostos** é 10/20 = **50%**, e o **NNH** é 1/0,10 = **10**. B está errada porque 2,25 é a razão de chances: (40/160)/(30/270) = 0,25/0,111 = 2,25, e a medida de efeito em coorte com seguimento completo é o risco relativo, a menos que se peça a razão de chances. C está errada porque confunde a diferença de risco com o risco nos expostos (20%). D está errada porque inverte a razão (10/20 = 0,5) e o sinal da diferença, o que sugeriria um fator de proteção.",
  explicacoesAlternativas:{},
  referencias:"Medronho RA et al. Epidemiologia, 2ª ed. Atheneu, 2009 (medidas de associação e de impacto); Rothman KJ. Epidemiology: An Introduction, 2ª ed. Oxford University Press, 2012. Textos não abertos nesta rodada; cálculos conferidos à mão.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q46 da UNIFESP 2022
{
  id:"q-adap22-046", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-bioestatistica",
  enunciado:"Um ensaio piloto comparou a ocorrência de infecção de ferida operatória entre dois antissépticos. No grupo A, 1 de 12 pacientes teve infecção; no grupo B, 5 de 11 pacientes tiveram infecção. Pela distribuição dos dados, duas das quatro caselas da tabela 2 x 2 têm frequência esperada menor que 5 sob a hipótese de nulidade. Qual é o teste de hipótese mais adequado para comparar as proporções de infecção?",
  alternativas:[{id:"A",texto:"Teste qui-quadrado de Pearson, com 1 grau de liberdade, por se tratar de duas variáveis categóricas."},{id:"B",texto:"Teste exato de Fisher, porque há frequências esperadas pequenas em uma tabela 2 x 2."},{id:"C",texto:"Teste t de Student para amostras pareadas, pois cada paciente foi comparado ao seu antisséptico."},{id:"D",texto:"Coeficiente de correlação de Pearson, que mede a força da associação entre as duas variáveis."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: duas **variáveis categóricas** (antisséptico A ou B; infecção sim ou não) em **grupos independentes**, **amostras pequenas** (12 e 11 pacientes) e **duas caselas com frequência esperada menor que 5**: a regra clássica para usar o qui-quadrado é que **todas** as frequências esperadas sejam de **5 ou mais** (ou, na versão mais permissiva, que menos de 20% sejam menores que 5 e nenhuma menor que 1). Quando isso não se cumpre numa tabela 2 x 2, usa-se o **teste exato de Fisher**, que calcula a probabilidade exata, sem aproximação pela distribuição qui-quadrado. A está errada porque o qui-quadrado é uma aproximação que fica inadequada com frequências esperadas pequenas e superestima a significância. C está errada porque o teste t pareado compara médias de variável numérica no mesmo indivíduo, e aqui os grupos são independentes e a variável é categórica. D está errada porque o coeficiente de Pearson mede a correlação linear entre duas variáveis numéricas, o que não é o caso.",
  explicacoesAlternativas:{},
  referencias:"Fletcher RH, Fletcher SW, Fletcher GS. Clinical Epidemiology: The Essentials, 6ª ed. Wolters Kluwer, 2020; Altman DG. Practical Statistics for Medical Research. Chapman & Hall, 1991. Textos não abertos nesta rodada.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q47 da UNIFESP 2022
{
  id:"q-adap22-047", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-saudefamilia", assuntoId:"ass-esf",
  enunciado:"Em uma unidade básica de saúde, a equipe de Saúde da Família discute com a equipe multiprofissional (eMulti) o caso de uma mulher com depressão e dor crônica que usa vários fármacos e tem dificuldade de adesão. A coordenadora afirma que a eMulti atua pelo apoio matricial. Qual alternativa descreve corretamente esse modo de funcionar?",
  alternativas:[{id:"A",texto:"A eMulti assume o cuidado dos casos complexos e os retira do acompanhamento da equipe de referência."},{id:"B",texto:"A eMulti funciona como porta de entrada do sistema, recebendo diretamente a demanda espontânea da comunidade."},{id:"C",texto:"Combina suporte técnico-pedagógico e clínico à equipe de referência, que mantém o vínculo."},{id:"D",texto:"A eMulti substitui o encaminhamento ao serviço especializado, que deixa de existir quando há apoio matricial."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: caso complexo discutido entre **equipe de Saúde da Família (equipe de referência)** e **equipe multiprofissional (eMulti)**, com a coordenadora citando o **apoio matricial**. O apoio matricial é um arranjo em que profissionais de outras áreas dão **retaguarda especializada** à equipe de referência em duas dimensões: **técnico-pedagógica** (educação permanente, discussão de casos, construção de projetos terapêuticos) e **clínico-assistencial** (atendimentos conjuntos ou compartilhados). A **equipe de referência mantém o vínculo e a responsabilidade** pelo cuidado, e a corresponsabilização é a base. A eMulti foi instituída pela Portaria GM/MS nº 635/2023, em substituição aos antigos núcleos ampliados (NASF-AB). A está errada porque o apoio matricial não retira o caso da equipe de referência: o cuidado é compartilhado, e transferi-lo fragmenta o cuidado. B está errada porque a porta de entrada do sistema são as equipes de Saúde da Família, e a eMulti apoia essas equipes, sem acesso direto. D está errada porque o apoio matricial amplia a resolutividade da atenção primária, mas não substitui os serviços especializados, que continuam sendo referência quando necessário.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Portaria GM/MS nº 635, de 22 de maio de 2023 (institui, define e cria incentivo financeiro das equipes multiprofissionais na atenção primária à saúde); Campos GWS, Domitti AC. Apoio matricial e equipe de referência. Cad Saude Publica 2007;23:399-407. Textos não abertos nesta rodada; número da portaria de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q48 da UNIFESP 2022
{
  id:"q-adap22-048", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-bioestatistica",
  enunciado:"Um teste rápido foi avaliado em 300 pessoas, comparado a um padrão de referência. Entre as 100 pessoas com a doença, o teste foi positivo em 90; entre as 200 pessoas sem a doença, o teste foi positivo em 30. Qual é a razão de verossimilhança positiva do teste e como ela se interpreta?",
  alternativas:[{id:"A",texto:"0,9; o resultado positivo reduz a chance de doença, pois o valor é menor que 1."},{id:"B",texto:"1,5; o resultado positivo aumenta pouco a probabilidade de doença, pois o valor é próximo de 1."},{id:"C",texto:"0,12; o resultado positivo é 12% mais frequente nos doentes do que nos sadios."},{id:"D",texto:"6; o resultado positivo é seis vezes mais frequente em quem tem a doença do que em quem não tem."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **100 doentes com 90 testes positivos** (verdadeiros-positivos 90 e falsos-negativos 10) e **200 sadios com 30 testes positivos** (falsos-positivos 30 e verdadeiros-negativos 170). A **sensibilidade** é 90/100 = **90%**; a **especificidade** é 170/200 = **85%**; a taxa de falsos-positivos é 1 - 0,85 = **15%**. A **razão de verossimilhança positiva** é sensibilidade/(1 - especificidade) = 0,90/0,15 = **6**: o resultado positivo é **6 vezes mais frequente** nos doentes que nos sadios. Valores de RV+ acima de 10 alteram muito a probabilidade, de 5 a 10 moderadamente, de 2 a 5 pouco e próximos de 1 quase nada. A razão de verossimilhança **negativa** seria (1 - 0,90)/0,85 = **0,12**. A está errada porque 0,9 é só a sensibilidade, e a razão de verossimilhança positiva maior que 1 aumenta a probabilidade de doença. B está errada porque 1,5 não corresponde a nenhum cálculo com esses dados e a razão de 6 é moderada a grande, não próxima de 1. C está errada porque 0,12 é a razão de verossimilhança negativa, e ela não mede a frequência relativa do resultado positivo.",
  explicacoesAlternativas:{},
  referencias:"Fletcher RH, Fletcher SW, Fletcher GS. Clinical Epidemiology: The Essentials, 6ª ed. Wolters Kluwer, 2020; Sackett DL et al. Evidence-Based Medicine: How to Practice and Teach EBM, 2ª ed. Churchill Livingstone, 2000. Textos não abertos nesta rodada; cálculos conferidos à mão.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q49 da UNIFESP 2022
{
  id:"q-adap22-049", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-vigilancia",
  enunciado:"Um município recebeu reclamações de moradores de um bairro sobre água turva e com odor de cloro muito forte nas torneiras. A secretaria de saúde quer organizar a ação do setor saúde. Qual é a atribuição da vigilância da qualidade da água para consumo humano (Vigiagua)?",
  alternativas:[{id:"A",texto:"Coletar amostras na rede e nos reservatórios e analisar cloro residual, turbidez e coliformes, conforme a norma."},{id:"B",texto:"Fiscalizar a rotulagem e a validade dos alimentos vendidos no bairro, para evitar a contaminação por alimentos adulterados."},{id:"C",texto:"Operar a estação de tratamento e corrigir a dosagem de cloro, que é responsabilidade direta da secretaria de saúde."},{id:"D",texto:"Notificar os acidentes de trabalho ocorridos na empresa que fornece a água, para ações de saúde do trabalhador."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: queixa de **água turva** e **odor forte de cloro** nas torneiras do bairro, e a pergunta é sobre o papel da vigilância da **qualidade da água para consumo humano**. O Vigiagua é o componente da vigilância em saúde ambiental que **monitora a qualidade da água** distribuída à população: coleta amostras na rede de distribuição, em reservatórios e em soluções alternativas, analisa parâmetros como **cloro residual livre**, **turbidez** e **coliformes totais e Escherichia coli**, e verifica a conformidade com a norma de potabilidade (Portaria GM/MS nº 888/2021, que alterou o Anexo XX da Portaria de Consolidação nº 5/2017). Ele não substitui o controle feito pelo prestador do serviço, mas o fiscaliza e orienta a população, e aciona a assistência à saúde se houver risco. B está errada porque a fiscalização de rotulagem e de validade de alimentos é atribuição da vigilância sanitária. C está errada porque operar a estação de tratamento e ajustar o cloro cabe ao prestador do serviço de abastecimento (a empresa de saneamento), não à vigilância em saúde. D está errada porque a notificação de acidentes de trabalho é do campo da vigilância em saúde do trabalhador e não do monitoramento da água.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Portaria GM/MS nº 888, de 4 de maio de 2021 (altera o Anexo XX da Portaria de Consolidação GM/MS nº 5/2017: controle e vigilância da qualidade da água para consumo humano e padrão de potabilidade); Guia de Vigilância em Saúde, 6ª ed., 2023. Textos não abertos nesta rodada.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q50 da UNIFESP 2022
{
  id:"q-adap22-050", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-vigilancia",
  enunciado:"Mulher, 40 anos, hipertensa, atendida na unidade básica de saúde, relata que consome diariamente refrigerante, biscoito recheado, macarrão instantâneo e salgadinhos de pacote, e raramente cozinha em casa por falta de tempo. O médico quer orientá-la de acordo com o Guia Alimentar para a População Brasileira. Qual é a recomendação central a oferecer?",
  alternativas:[{id:"A",texto:"Contar as calorias de cada refeição e limitar o consumo total a 1.200 kcal por dia."},{id:"B",texto:"Substituir todas as fontes de proteína animal por proteína vegetal, sem outras mudanças."},{id:"C",texto:"Preferir alimentos in natura ou minimamente processados e evitar ultraprocessados."},{id:"D",texto:"Trocar os alimentos por suplementos e produtos dietéticos com baixo teor de gordura."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: consumo diário de **refrigerante, biscoito recheado, macarrão instantâneo e salgadinho**, todos **ultraprocessados**, em paciente **hipertensa**. O Guia Alimentar para a População Brasileira (2014) classifica os alimentos pelo grau de processamento (classificação NOVA): **in natura ou minimamente processados** (grupo 1), **ingredientes culinários** (grupo 2), **processados** (grupo 3) e **ultraprocessados** (grupo 4). A regra de ouro do Guia é: **fazer de alimentos in natura ou minimamente processados a base da alimentação**, usar óleo, sal e açúcar com moderação, **limitar os processados** e **evitar os ultraprocessados**, que têm excesso de sódio, açúcar e gorduras e pouca fibra. Também recomenda comer com regularidade e atenção, em companhia, e desenvolver habilidades culinárias. A está errada porque o Guia não baseia a orientação em contagem de calorias nem em dieta restritiva padronizada. B está errada porque o Guia não propõe eliminar a proteína animal, e sim equilibrar a base de alimentos in natura. D está errada porque suplementos e produtos dietéticos industrializados contrariam a orientação de priorizar alimentos de verdade.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Guia Alimentar para a População Brasileira, 2ª ed., 2014; Monteiro CA et al. Ultra-processed foods: what they are and how to identify them. Public Health Nutr 2019;22:936-41. Textos não abertos nesta rodada.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q51 da UNIFESP 2022
{
  id:"q-adap22-051", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-prevencao",
  enunciado:"Uma secretaria municipal implanta um programa em que adultos de 50 a 74 anos, assintomáticos, recebem convite para a pesquisa de sangue oculto nas fezes, com colonoscopia para os que têm resultado positivo. Em relação ao modelo de história natural da doença de Leavell e Clark, a que nível de prevenção o programa corresponde?",
  alternativas:[{id:"A",texto:"Prevenção primária, pois impede que as pessoas adoeçam ao tratar o fator de risco antes de qualquer lesão."},{id:"B",texto:"Prevenção secundária, pois busca o diagnóstico precoce, em fase assintomática, para tratar a tempo."},{id:"C",texto:"Prevenção terciária, pois limita a incapacidade e reabilita quem já teve o diagnóstico do câncer."},{id:"D",texto:"Prevenção quaternária, pois evita intervenções médicas desnecessárias e o excesso de medicalização."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **pessoas assintomáticas** de 50 a 74 anos, **pesquisa de sangue oculto nas fezes** e **colonoscopia** para os positivos: é um programa de **rastreamento**, que busca a doença (ou a lesão precursora) em fase **pré-clínica**, antes dos sintomas, para tratamento precoce. No modelo de Leavell e Clark, a **prevenção primária** atua no período pré-patogênico, antes da doença (promoção da saúde, como a alimentação saudável, e proteção específica, como a vacinação); a **secundária** atua na doença já instalada, ainda assintomática: **diagnóstico precoce** e tratamento imediato (rastreamento); a **terciária** limita a incapacidade e reabilita; a **quaternária** (Jamoulle) evita o excesso de intervenção e a medicalização desnecessária. Como a polipectomia na colonoscopia também retira lesões precursoras, o rastreamento do câncer colorretal tem efeito de prevenção, mas o nível em que o programa se enquadra é o secundário. A está errada porque a prevenção primária age antes da doença, sobre fatores de risco ou com proteção específica, e não busca lesões. C está errada porque a prevenção terciária atua sobre quem já tem doença sintomática ou sequelas, e aqui os participantes são assintomáticos. D está errada porque a prevenção quaternária protege o paciente do excesso de exames e tratamentos, o que não define um programa de rastreamento organizado.",
  explicacoesAlternativas:{},
  referencias:"Leavell HR, Clark EG. Medicina Preventiva. McGraw-Hill, 1976; Jamoulle M. Quaternary prevention, an answer of family doctors to overmedicalization. Int J Health Policy Manag 2015;4:61-4. Textos não abertos nesta rodada.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q52 da UNIFESP 2022
{
  id:"q-adap22-052", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-desenhosestudo",
  enunciado:"Um pesquisador seleciona 150 pessoas com câncer de pulmão, atendidas em um hospital, e 300 pessoas sem a doença, da mesma faixa etária e de mesmo sexo. Entrevista todas sobre o consumo de cigarros ao longo da vida e compara a história de tabagismo entre os dois grupos. Qual é o desenho do estudo e a medida de associação que ele fornece?",
  alternativas:[{id:"A",texto:"Estudo de coorte; risco relativo, calculado a partir da incidência nos expostos e nos não expostos."},{id:"B",texto:"Estudo transversal; razão de prevalências, calculada em um único momento no tempo."},{id:"C",texto:"Ensaio clínico randomizado; número necessário para tratar, calculado a partir da redução absoluta do risco."},{id:"D",texto:"Estudo de caso-controle; razão de chances (odds ratio), pois o investigador parte do desfecho e compara a exposição."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: o pesquisador **parte do desfecho** (150 casos de câncer de pulmão e 300 controles sem a doença, **pareados por idade e sexo**) e **investiga a exposição passada** (tabagismo ao longo da vida): é um estudo de **caso-controle**, retrospectivo. Como não se acompanha uma população para medir incidência, não é possível calcular o risco relativo; a medida de associação é a **razão de chances (odds ratio)**, que compara a chance de exposição entre casos e controles e, para doenças raras, aproxima o risco relativo. O desenho é eficiente para doenças raras e de longo período de latência, mas está sujeito a viés de memória e de seleção. A está errada porque a coorte parte da exposição e acompanha os grupos até o desfecho, medindo incidência. B está errada porque o estudo transversal mede exposição e desfecho no mesmo momento em uma amostra da população, sem escolher por desfecho. C está errada porque o ensaio clínico randomizado atribui a intervenção ao acaso, e o pesquisador não intervém aqui.",
  explicacoesAlternativas:{},
  referencias:"Medronho RA et al. Epidemiologia, 2ª ed. Atheneu, 2009 (desenhos de estudo); Fletcher RH, Fletcher SW, Fletcher GS. Clinical Epidemiology: The Essentials, 6ª ed. Wolters Kluwer, 2020. Textos não abertos nesta rodada.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q53 da UNIFESP 2022
{
  id:"q-adap22-053", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-bioestatistica",
  enunciado:"Um pesquisador compara a redução média do colesterol LDL, em mg/dL, após 12 semanas de três dietas diferentes, cada uma aplicada a um grupo de 30 voluntários diferentes (90 pessoas ao todo). Os dados de cada grupo têm distribuição aproximadamente normal e variâncias semelhantes. Qual é o teste de hipótese mais adequado para comparar as três médias?",
  alternativas:[{id:"A",texto:"Teste t de Student para amostras independentes, aplicado a cada par de dietas, três vezes."},{id:"B",texto:"Teste qui-quadrado de independência, pois são três categorias de dieta."},{id:"C",texto:"Teste de Wilcoxon para amostras pareadas, porque os grupos têm o mesmo número de pessoas."},{id:"D",texto:"ANOVA de um fator, com comparações múltiplas se o resultado for significativo."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **desfecho numérico contínuo** (redução do LDL em mg/dL), **três grupos independentes** de 30 pessoas, **distribuição aproximadamente normal** e **variâncias semelhantes**: são as condições da **análise de variância (ANOVA) de um fator**, que compara médias de **três ou mais grupos** em um único teste, controlando o erro tipo I global em 5%. Se o teste for significativo (p < 0,05), indica que pelo menos uma média difere, e fazem-se **comparações múltiplas** (Tukey, Bonferroni) para saber quais pares diferem. Se os dados não fossem normais, usaria-se o teste de Kruskal-Wallis. A está errada porque aplicar o teste t três vezes aumenta o erro tipo I global: com 3 comparações, a chance de ao menos um falso-positivo passa de 5% para cerca de 14%. B está errada porque o qui-quadrado compara proporções entre variáveis categóricas, e aqui o desfecho é numérico. C está errada porque o teste de Wilcoxon pareado serve para dois momentos no mesmo indivíduo, e os grupos aqui são independentes; ter o mesmo número de pessoas não os torna pareados.",
  explicacoesAlternativas:{},
  referencias:"Altman DG. Practical Statistics for Medical Research. Chapman & Hall, 1991; Vieira S. Introdução à Bioestatística, 5ª ed. Elsevier, 2016. Textos não abertos nesta rodada; cálculo de 14% conferido à mão.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q54 da UNIFESP 2022
{
  id:"q-adap22-054", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-epidemio", assuntoId:"ass-bioestatistica",
  enunciado:"Um pesquisador planeja um ensaio clínico para detectar uma diferença de 5 mmHg na pressão arterial sistólica entre dois tratamentos, com poder de 80% e nível de significância de 5%, e o cálculo mostra que a amostra planejada é menor do que a necessária, mas é possível recrutar mais participantes. Sem alterar a diferença que deseja detectar, qual das alternativas aumentaria o poder do estudo?",
  alternativas:[{id:"A",texto:"Reduzir o nível de significância de 5% para 1%, para tornar o resultado mais confiável."},{id:"B",texto:"Usar um desfecho com mais variabilidade entre os participantes, que amplia o desvio padrão."},{id:"C",texto:"Reduzir o número de participantes do estudo, porque amostras menores são mais homogêneas."},{id:"D",texto:"Aumentar o tamanho da amostra, o que reduz o erro padrão e a variabilidade da estimativa."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: a diferença a detectar (**5 mmHg**), o poder desejado (**80%**) e o nível de significância (**5%**) estão fixos, e a pergunta é como aumentar o poder (probabilidade de rejeitar a hipótese nula quando ela é falsa, ou seja, **1 menos o erro tipo II**, beta). O poder aumenta quando: **aumenta o tamanho da amostra** (o erro padrão diminui), **aumenta a diferença real** entre os grupos, **diminui a variabilidade** do desfecho (desvio padrão menor) e **aumenta o nível de significância alfa** (por exemplo, de 1% para 5%). A fórmula de n envolve (z alfa + z beta) ao quadrado, o desvio padrão ao quadrado e a diferença ao quadrado. A está errada porque reduzir o alfa para 1% diminui o poder: o corte para rejeitar a hipótese nula fica mais rigoroso. B está errada porque maior variabilidade aumenta o erro padrão e reduz o poder. C está errada porque diminuir a amostra aumenta o erro padrão e reduz o poder; amostras pequenas têm menos chance de detectar diferenças reais.",
  explicacoesAlternativas:{},
  referencias:"Altman DG. Practical Statistics for Medical Research. Chapman & Hall, 1991 (poder e tamanho de amostra); Vieira S. Introdução à Bioestatística, 5ª ed. Elsevier, 2016. Textos não abertos nesta rodada.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q55 da UNIFESP 2022
{
  id:"q-adap22-055", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-bioetica", assuntoId:"ass-cuidadospaliativos",
  enunciado:"Homem, 70 anos, com câncer de próstata metastático para ossos, queixa-se de dor lombar e em bacia de intensidade 8/10 na escala numérica, que o impede de dormir. Usa dipirona 1 g a cada 6 horas e tramadol 50 mg a cada 8 horas, com alívio parcial. Mantém-se lúcido, sem insuficiência renal, hepática ou respiratória. Qual é a conduta mais adequada para o controle da dor?",
  alternativas:[{id:"A",texto:"Aumentar a dipirona para 2 g a cada 4 horas e aguardar 1 semana, para evitar a dependência de opioide forte."},{id:"B",texto:"Prescrever morfina oral titulada, com laxante desde o início, corticoide adjuvante e radioterapia."},{id:"C",texto:"Suspender o tramadol e evitar qualquer opioide, pelo risco de dependência e de depressão respiratória."},{id:"D",texto:"Reservar os opioides fortes para as últimas 24 horas de vida, quando a dor for insuportável."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: dor oncológica de **intensidade 8/10** (grave), **óssea**, que persiste com **analgésico simples** (dipirona) e **opioide fraco** (tramadol) em doses adequadas. Pela **escada analgésica da OMS**, a dor de moderada a intensa, ou que não responde ao degrau anterior, indica um **opioide forte** (a morfina oral é a primeira escolha, com liberação imediata para titulação, e depois, a de liberação prolongada), em dose individualizada, com **doses de resgate** e **laxante desde o início**, porque a constipação por opioide é universal e não desenvolve tolerância. Os **adjuvantes** (corticoide, anti-inflamatório, bisfosfonato) e a **radioterapia** paliativa tratam a dor óssea metastática, além de medidas não farmacológicas. A está errada porque aumentar um analgésico simples tem teto de efeito e deixa o paciente em dor intensa por uma semana, sem justificativa. C está errada porque o medo de dependência e de depressão respiratória não deve impedir o uso de opioide na dor oncológica; em doses tituladas, os riscos são pequenos. D está errada porque a dor deve ser tratada ao longo de toda a doença, e reservar os opioides para o fim de vida é negar alívio ao paciente.",
  explicacoesAlternativas:{},
  referencias:"Fallon M et al. Management of cancer pain in adult patients: ESMO Clinical Practice Guidelines. Ann Oncol 2018;29(Suppl 4):iv166-91; World Health Organization. Cancer pain relief, 2ª ed., 1996. Textos não abertos nesta rodada; conduta de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q56 da UNIFESP 2022
{
  id:"q-adap22-056", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-infecto", assuntoId:"ass-ist",
  enunciado:"Homem, 24 anos, queixa-se de corrimento uretral purulento e disúria há 3 dias, iniciados 4 dias depois de relação sexual desprotegida com parceira ocasional. Exame físico: secreção uretral amarelada e abundante, sem lesões genitais. O Gram da secreção uretral mostra numerosos leucócitos polimorfonucleares com diplococos Gram-negativos intracelulares. Qual é o tratamento mais adequado, segundo o protocolo brasileiro de infecções sexualmente transmissíveis?",
  alternativas:[{id:"A",texto:"Ceftriaxona 500 mg IM e azitromicina 1 g VO, em dose única, e tratamento da parceria."},{id:"B",texto:"Ciprofloxacino 500 mg por via oral em dose única, mais metronidazol 2 g, ambos em dose única."},{id:"C",texto:"Penicilina benzatina 2,4 milhões de UI por via intramuscular em dose única, que cobre gonococo e sífilis."},{id:"D",texto:"Doxiciclina 100 mg por via oral a cada 12 horas por 7 dias, isoladamente, pois cobre todos os agentes."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **corrimento uretral purulento** de início 4 dias depois de exposição, **leucócitos polimorfonucleares com diplococos Gram-negativos intracelulares** no Gram: uretrite gonocócica. O protocolo brasileiro (PCDT de IST, 2022) trata a uretrite sem etiologia definida, ou com gonococo, com **ceftriaxona 500 mg por via intramuscular em dose única** associada a **azitromicina 1 g por via oral em dose única**, para cobrir também a **Chlamydia trachomatis**, que coexiste em até metade dos casos. Devem ser orientados o **tratamento da parceria sexual**, o uso de preservativo, a testagem para HIV, sífilis e hepatites e a abstinência até o fim do tratamento. B está errada porque as quinolonas não são mais recomendadas, pela resistência do gonococo, e o metronidazol é para tricomoníase. C está errada porque a penicilina benzatina trata a sífilis e não cobre o gonococo resistente, e não trata clamídia. D está errada porque a doxiciclina isolada não trata de forma confiável a gonorreia; ela serve para clamídia.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (IST), 2022 (a terapia dupla ceftriaxona 500 mg IM com azitromicina 1 g VO segue como esquema da gonorreia não complicada em fontes secundárias de 29/10/2026, com aumento da resistência à azitromicina apontado em 2023; sem edição posterior localizada, exceto a portaria de março de 2026 sobre doxiciclina como profilaxia pós-exposição). Texto oficial não aberto.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q57 da UNIFESP 2022
{
  id:"q-adap22-057", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-sus", assuntoId:"ass-principiossus",
  enunciado:"A organização dos serviços do Sistema Único de Saúde em níveis de complexidade crescente, com referência e contrarreferência entre eles, em uma área geográfica com população definida, corresponde a qual diretriz do sistema?",
  alternativas:[{id:"A",texto:"Descentralização político-administrativa, com direção única em cada esfera de governo."},{id:"B",texto:"Regionalização e hierarquização da rede de serviços."},{id:"C",texto:"Participação da comunidade, por meio de conferências e conselhos de saúde."},{id:"D",texto:"Universalidade do acesso aos serviços de saúde em todos os níveis de assistência."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: serviços **organizados em níveis de complexidade crescente** (atenção primária, secundária e terciária), com **referência e contrarreferência** e **base territorial com população definida**: é a **regionalização e hierarquização** da rede. A regionalização organiza os serviços em territórios (regiões de saúde) com população adscrita, e a hierarquização distribui as ações por complexidade tecnológica, de modo que a atenção primária seja a porta de entrada e coordenadora do cuidado. Estão na Constituição (art. 198) e na Lei 8.080/1990: a regionalização e a hierarquização vêm do caput do art. 198 e do art. 8º da Lei 8.080; as diretrizes do art. 198 incluem a **descentralização** com direção única em cada esfera, o **atendimento integral** e a **participação da comunidade**; os princípios doutrinários são **universalidade, equidade e integralidade**. A está errada porque a descentralização distribui poder e responsabilidade entre União, estados e municípios, e não a organização por complexidade. C está errada porque a participação da comunidade se refere ao controle social, por conselhos e conferências. D está errada porque a universalidade é o princípio de que a saúde é direito de todos, independentemente de contribuição, e não define a organização por níveis.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Constituição da República Federativa do Brasil de 1988, art. 198; Lei nº 8.080, de 19 de setembro de 1990, arts. 7º e 8º. Textos não abertos nesta rodada; conteúdo de memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q58 da UNIFESP 2022
{
  id:"q-adap22-058", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-saudefamilia", assuntoId:"ass-esf",
  enunciado:"Em reunião de equipe, a enfermeira propõe que a unidade ofereça horários estendidos e acolhimento sem barreiras para que os moradores a procurem antes de qualquer outro serviço, diante de cada nova queixa. Segundo Starfield, qual atributo essencial da atenção primária essa proposta valoriza?",
  alternativas:[{id:"A",texto:"Longitudinalidade, ou seja, o acompanhamento da pessoa ao longo do tempo pela mesma equipe."},{id:"B",texto:"Coordenação do cuidado, a integração dos serviços e das informações entre os níveis."},{id:"C",texto:"Integralidade, a oferta de ações de promoção, prevenção, cura e reabilitação."},{id:"D",texto:"Acesso de primeiro contato, a unidade como porta de entrada a cada novo problema."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: horários estendidos e acolhimento sem barreiras para que as pessoas **procurem a unidade primeiro, a cada novo problema**: é o **acesso de primeiro contato**. Para Starfield, a atenção primária tem quatro atributos essenciais: **primeiro contato** (acessibilidade e utilização do serviço a cada novo problema), **longitudinalidade** (fonte regular de cuidado e vínculo ao longo do tempo), **integralidade** (ofertas de ações de promoção, prevenção, cura e reabilitação e reconhecimento das necessidades) e **coordenação** (integração do cuidado entre serviços e continuidade da informação). Os atributos derivados são a **orientação familiar**, a **orientação comunitária** e a **competência cultural**. A está errada porque a longitudinalidade é o vínculo contínuo com a mesma equipe, e a proposta trata da entrada no serviço, não do seguimento. B está errada porque a coordenação é a articulação entre os níveis de atenção, o que a proposta não menciona. C está errada porque a integralidade é a amplitude das ações e dos problemas atendidos, e não a facilidade de acesso.",
  explicacoesAlternativas:{},
  referencias:"Starfield B. Atenção Primária: equilíbrio entre necessidades de saúde, serviços e tecnologia. Brasília: UNESCO/Ministério da Saúde, 2002. Texto não aberto nesta rodada; atributos de memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q59 da UNIFESP 2022
{
  id:"q-adap22-059", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-orl", assuntoId:"ass-orl-viasaereas",
  enunciado:"Menino, 2 anos, previamente saudável, começa a tossir e a chiar de forma súbita enquanto brincava com castanhas, 4 horas antes da consulta. Mantém-se ativo, afebril, FR de 32 irpm, SpO2 de 96% em ar ambiente. Ausculta pulmonar: sibilo e redução do murmúrio vesicular no hemitórax direito. A radiografia de tórax em inspiração e expiração mostra hiperinsuflação do pulmão direito, que se mantém na expiração, com desvio discreto do mediastino para a esquerda. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Manobra de Heimlich repetida, até a expulsão do corpo estranho da via aérea da criança."},{id:"B",texto:"Antibiótico por via oral e reavaliação em 48 horas, pois o quadro sugere pneumonia."},{id:"C",texto:"Broncoscopia rígida sob anestesia geral, para identificar e retirar o corpo estranho."},{id:"D",texto:"Broncodilatador inalatório e radiografia de controle em 7 dias."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **engasgo súbito** durante brincadeira com **castanhas** (alimento de risco em menores de 3 anos), **sibilo e diminuição do murmúrio** unilaterais e radiografia com **aprisionamento aéreo** à direita, que persiste na expiração: **corpo estranho em brônquio** direito, de efeito valvular. A criança está estável e **ventila**, de modo que não é caso de manobra de desobstrução. A conduta é a **broncoscopia rígida sob anestesia geral**, que permite retirar o corpo estranho e manter a ventilação; a flexível é diagnóstica em casos duvidosos. O atraso do diagnóstico leva a pneumonia recorrente, atelectasia e bronquiectasia. A está errada porque a manobra de Heimlich é para obstrução completa da via aérea em criança que não consegue respirar; aqui o corpo estranho está em brônquio, e a manobra pode deslocá-lo e causar obstrução da laringe. B está errada porque o quadro agudo com história de aspiração não é pneumonia, e o antibiótico não remove o corpo estranho. D está errada porque o broncodilatador não trata a obstrução mecânica, e esperar 7 dias deixa o corpo estranho instalado.",
  explicacoesAlternativas:{},
  referencias:"Sociedade Brasileira de Pediatria. Tratado de Pediatria, 5ª ed. Manole, 2021 (corpo estranho de vias aéreas); Fidkowski CW et al. Anesthetic considerations for tracheobronchial foreign bodies in children. Paediatr Anaesth 2006;16:1-6. Textos não abertos nesta rodada; conduta de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q60 da UNIFESP 2022
{
  id:"q-adap22-060", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-infecto", assuntoId:"ass-hiv",
  enunciado:"Gestante, 29 anos, G3P2, com 32 semanas, recebe o diagnóstico de infecção pelo HIV em teste rápido confirmado por teste complementar, feito na rotina do pré-natal. Está assintomática, sem uso prévio de antirretrovirais, e sem comorbidades. A carga viral e o CD4 foram coletados no dia da consulta, e os resultados só ficam prontos em 15 dias. Qual é a conduta mais adequada em relação ao início do tratamento?",
  alternativas:[{id:"A",texto:"Iniciar de imediato tenofovir, lamivudina e dolutegravir, sem esperar carga viral, CD4 ou genotipagem."},{id:"B",texto:"Aguardar a carga viral e o CD4 e iniciar o tratamento só se o CD4 estiver abaixo de 350 células/mm³."},{id:"C",texto:"Postergar o tratamento até depois do parto, pelo risco de teratogenicidade do esquema."},{id:"D",texto:"Iniciar zidovudina isolada até o parto, pois a monoterapia é suficiente para prevenir a transmissão vertical."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **32 semanas**, diagnóstico recente de HIV, **sem tratamento prévio**, e resultados de carga viral e CD4 que **demoram 15 dias**. O objetivo é alcançar a **supressão viral o mais rápido possível** antes do parto: cada semana de atraso reduz a chance de carga viral indetectável no parto e aumenta o risco de transmissão vertical. Por isso, a terapia antirretroviral é iniciada **imediatamente**, **sem aguardar** carga viral, CD4 ou genotipagem, com o esquema preferencial do protocolo brasileiro: **tenofovir + lamivudina + dolutegravir**, um inibidor de integrase de ação rápida e boa tolerância, seguro na gestação (as informações iniciais sobre defeitos do tubo neural não se confirmaram). O ajuste é feito depois, com os exames. B está errada porque o início não depende da contagem de CD4: todas as gestantes com HIV tratam, independentemente do CD4. C está errada porque adiar o tratamento por meses mantém a viremia no parto, e o risco de teratogenicidade do esquema recomendado não justifica a espera. D está errada porque a monoterapia com zidovudina não suprime a carga viral e foi abandonada em favor do esquema tríplice.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas para Prevenção da Transmissão Vertical de HIV, Sífilis e Hepatites Virais, 2022 (2ª ed., 2022; o dolutegravir é o antirretroviral preferencial para gestantes desde a Portaria SCTIE/MS nº 55/2020 e a edição de 2022 mantém a conduta, segundo fontes secundárias em 29/10/2026; edição posterior não localizada). Texto oficial não aberto.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q61 da UNIFESP 2022
{
  id:"q-adap22-061", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-ortopedia", assuntoId:"ass-orto-infeccoes",
  enunciado:"Menina, 5 anos, previamente saudável, apresenta febre de 38,9 °C há 2 dias e recusa-se a apoiar a perna esquerda, com dor à mobilização do quadril, que fica em flexão e rotação externa. Exames: leucócitos 16.200/mm³, VHS de 58 mm na primeira hora. A radiografia do quadril é normal e a ultrassonografia mostra derrame articular volumoso. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Anti-inflamatório e repouso por 48 horas, pois o quadro é compatível com sinovite transitória."},{id:"B",texto:"Ressonância magnética programada para a semana seguinte, mantendo o antibiótico oral até lá."},{id:"C",texto:"Alta com antibiótico oral e retorno em 5 dias, já que a radiografia está normal."},{id:"D",texto:"Punção articular e drenagem cirúrgica urgentes, com antibiótico venoso após a coleta."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: criança com **febre acima de 38,5 °C** (38,9 °C), **recusa de apoio**, **VHS acima de 40 mm/h** (58) e **leucócitos acima de 12.000/mm³** (16.200), com derrame articular volumoso: preenche os **quatro critérios de Kocher** para artrite séptica do quadril (febre, não apoiar o membro, VHS elevado e leucocitose). A probabilidade de artrite séptica é de cerca de **0%, 3%, 40%, 93% e 99%** com 0, 1, 2, 3 e 4 critérios, respectivamente; com 4 critérios, o diagnóstico é praticamente certo. A artrite séptica do quadril é **emergência ortopédica**: a drenagem cirúrgica urgente (artrotomia ou artroscopia) evita a necrose da cabeça femoral por pressão e por infecção, e coleta-se material para cultura antes do **antibiótico venoso** (cobrindo Staphylococcus aureus, o agente mais comum). A está errada porque a sinovite transitória tem poucos critérios de Kocher (em geral 0 ou 1) e febre baixa, e o quadro desta criança é de infecção. B está errada porque atrasar a drenagem por uma semana permite a destruição da cartilagem e a necrose da cabeça femoral. C está errada porque a radiografia normal não exclui artrite séptica, que se manifesta antes das alterações radiográficas, e o antibiótico oral não drena o pus.",
  explicacoesAlternativas:{},
  referencias:"Kocher MS et al. Differentiating between septic arthritis and transient synovitis of the hip in children: an evidence-based clinical prediction algorithm. J Bone Joint Surg Am 1999;81:1662-70; Caird MS et al. Factors distinguishing septic arthritis from transient synovitis of the hip in children. J Bone Joint Surg Am 2006;88:1251-7. Textos não abertos nesta rodada; probabilidades de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q62 da UNIFESP 2022
{
  id:"q-adap22-062", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-reumato", assuntoId:"ass-reumato-febrereumatica",
  enunciado:"Menina, 9 anos, 3 semanas depois de uma faringoamigdalite, apresenta poliartrite migratória, febre e, ao exame, sopro sistólico mitral de regurgitação 3+/6+ com galope, taquicardia e cardiomegalia. Ecocardiograma: insuficiência mitral moderada e dilatação das câmaras esquerdas, com fração de ejeção de 52%; sinais leves de congestão. ASLO elevada, PCR de 48 mg/L. Diagnóstico de febre reumática com cardite moderada. Qual é a conduta anti-inflamatória mais adequada?",
  alternativas:[{id:"A",texto:"Ácido acetilsalicílico em dose anti-inflamatória plena, que é o tratamento de escolha da cardite e da artrite."},{id:"B",texto:"Repouso absoluto e analgésico simples, pois a cardite é leve e regride sem medicação específica."},{id:"C",texto:"Prednisona 1 a 2 mg/kg/dia por 2 a 3 semanas, com redução gradual, diurético e inibidor da ECA."},{id:"D",texto:"Pulsoterapia com metilprednisolona e imunoglobulina endovenosa, como primeira linha para toda cardite."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **poliartrite migratória**, **sopro de regurgitação mitral** com **galope e cardiomegalia**, **insuficiência mitral moderada** ao ecocardiograma, **ASLO elevada** e **PCR de 48 mg/L**, 3 semanas depois de faringite: febre reumática com **cardite moderada** (a leve tem apenas sopro e sem aumento da área cardíaca; a moderada, cardiomegalia leve e/ou insuficiência cardíaca leve; a grave, insuficiência cardíaca importante, pericardite ou lesão valvar grave). Segundo a diretriz brasileira, a cardite moderada e grave se trata com corticoide (textos da SBP também o indicam na cardite leve), a saber, **prednisona 1 a 2 mg/kg/dia** (máximo 80 mg) por 2 a 3 semanas, com **redução gradual**, e a insuficiência cardíaca com diuréticos e inibidores da ECA; mantém-se **repouso relativo**, e a penicilina benzatina é iniciada em seguida para a profilaxia secundária. A está errada porque o ácido acetilsalicílico trata a artrite (e a cardite leve, por alguns), mas na cardite moderada o corticoide é preferido. B está errada porque a cardite moderada exige tratamento, e o repouso não basta. D está errada porque a pulsoterapia e a imunoglobulina não são primeira linha e ficam para casos graves refratários.",
  explicacoesAlternativas:{},
  referencias:"Barbosa PJB et al. Diretrizes brasileiras para o diagnóstico, tratamento e prevenção da febre reumática. Arq Bras Cardiol 2009;93(3 supl 4):1-18 (edição posterior brasileira não conferida); Gewitz MH et al. Revision of the Jones Criteria for the diagnosis of acute rheumatic fever in the era of Doppler echocardiography. Circulation 2015;131:1806-18. Textos não abertos nesta rodada. Os critérios de Jones de 2015 seguem como a versão vigente em 29/10/2026, segundo o CDC e a busca na web; não achei revisão posterior da AHA.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q63 da UNIFESP 2022
{
  id:"q-adap22-063", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-emergped", assuntoId:"ass-emergped-maustratos",
  enunciado:"Menino, 4 anos, é levado ao pronto-socorro pela mãe, por dor ao movimentar o braço direito depois de uma queda da cama. Exame: hematomas em estágios diferentes de cicatrização no tronco, nas coxas e nas orelhas, marcas arredondadas de 7 mm compatíveis com queimadura de cigarro nas costas, e atitude de medo. O relato da queda é vago e muda durante a consulta. A radiografia mostra fratura em espiral do úmero direito. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Imobilizar a fratura e liberar a criança com a mãe, orientando retorno em 7 dias para a revisão."},{id:"B",texto:"Aguardar a perícia confirmar o maus-tratos antes de notificar qualquer órgão, para não acusar a família."},{id:"C",texto:"Internar para proteção, notificar o Conselho Tutelar, investigar e acionar a equipe multiprofissional."},{id:"D",texto:"Chamar a polícia e retirar a criança da família na própria noite, sem registro no prontuário."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **lesões em estágios diferentes** de cicatrização (múltiplos episódios), **queimaduras de cigarro**, **fratura em espiral do úmero** em criança de 4 anos, **história vaga e inconsistente** e **comportamento de medo**: o conjunto é de forte suspeita de **maus-tratos físicos**. A conduta é **internar** para proteger a criança, documentar o exame, **completar a investigação** (radiografias do esqueleto, avaliação de cabeça e abdome e de coagulação, quando indicado), acionar a **equipe multiprofissional** (serviço social, psicologia) e **notificar ao Conselho Tutelar**. O Estatuto da Criança e do Adolescente (art. 13) determina que a **suspeita ou a confirmação** de maus-tratos seja obrigatoriamente comunicada ao Conselho Tutelar, sem prejuízo de outras providências; a notificação também se faz na ficha de violência do Sinan. A está errada porque devolver a criança ao ambiente suspeito de violência a expõe a novos episódios. B está errada porque a lei exige a notificação diante da suspeita, não da confirmação, e a perícia não é pré-requisito. D está errada porque a medida de proteção é decidida pela rede (Conselho Tutelar e Justiça), e a falta de registro no prontuário prejudica a proteção da criança e a responsabilidade do profissional.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Lei nº 8.069, de 13 de julho de 1990 (Estatuto da Criança e do Adolescente), art. 13, e Lei nº 13.010/2014; Sociedade Brasileira de Pediatria. Guia prático de atualização: violência física contra crianças e adolescentes. Textos não abertos nesta rodada.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q64 da UNIFESP 2022
{
  id:"q-adap22-064", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-cirurgiaonco", assuntoId:"ass-oncopediatrica",
  enunciado:"Menina, 2 anos e 3 meses, com febre baixa, irritabilidade e dor nas pernas há 3 semanas, apresenta massa abdominal endurecida e irregular, que ultrapassa a linha média, equimoses periorbitárias bilaterais e palidez. Ultrassonografia: massa retroperitoneal heterogênea com calcificações. Qual é o conjunto de exames mais adequado para a confirmação diagnóstica e o estadiamento?",
  alternativas:[{id:"A",texto:"Alfa-fetoproteína e beta-hCG séricas e tomografia de crânio, para tumor de células germinativas."},{id:"B",texto:"Catecolaminas urinárias (VMA e HVA), cintilografia com MIBG, mielograma e biópsia da massa."},{id:"C",texto:"Dosagem de DHL e ácido úrico e biópsia de medula óssea apenas, para linfoma de Burkitt."},{id:"D",texto:"Nefrectomia imediata e ultrassonografia de abdome seriada, para tumor de Wilms."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: criança de 2 anos com **massa abdominal dura, irregular, que ultrapassa a linha média**, **calcificações** na ultrassonografia, **equimoses periorbitárias bilaterais** (olhos de guaxinim, por metástases orbitárias), **dor óssea** (nas pernas) e **palidez** (infiltração da medula): neuroblastoma, tumor do sistema nervoso simpático. O diagnóstico exige **biópsia** da massa (ou medula óssea com **catecolaminas urinárias elevadas**), e o estadiamento inclui **catecolaminas urinárias** (ácido vanilmandélico e homovanílico, elevados em cerca de 90% dos casos), **cintilografia com MIBG** (capta nas metástases), **mielograma e biópsia de medula**, tomografia ou ressonância e a pesquisa de **amplificação de MYCN**, que define o risco. O sistema INRG classifica o risco com idade, estádio, histologia, MYCN e ploidia. A está errada porque a alfa-fetoproteína e a beta-hCG se elevam nos tumores germinativos, o que não explica o quadro. C está errada porque o linfoma de Burkitt dá massa abdominal de crescimento muito rápido, sem calcificações nem equimoses periorbitárias. D está errada porque o tumor de Wilms não cruza a linha média, raramente calcifica e não dá equimoses periorbitárias, e a nefrectomia sem biópsia seria inadequada.",
  explicacoesAlternativas:{},
  referencias:"Monclair T et al. The International Neuroblastoma Risk Group (INRG) staging system: an INRG Task Force report. J Clin Oncol 2009;27:298-303; Pizzo PA, Poplack DG. Principles and Practice of Pediatric Oncology, 7ª ed. Wolters Kluwer, 2015. Textos não abertos nesta rodada; frequências de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q65 da UNIFESP 2022
{
  id:"q-adap22-065", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-emergped", assuntoId:"ass-emergped-respiratoria",
  enunciado:"Menino, 7 anos, 24 kg, asmático grave, chega ao pronto-socorro em crise há 6 horas, com tiragem intercostal e subcostal, fala em palavras isoladas, FR de 38 irpm, FC de 148 bpm e SpO2 de 88% em ar ambiente. Recebeu, na primeira hora, oxigênio, 3 doses de salbutamol em spray com espaçador e brometo de ipratrópio, além de corticoide sistêmico por via oral há 30 minutos, sem melhora. Ausculta com sibilos escassos e murmúrio muito diminuído. Qual é a conduta mais adequada neste momento?",
  alternativas:[{id:"A",texto:"Aminofilina em bolus venoso de 6 mg/kg, que é a próxima etapa da escada de resgate e substitui o broncodilatador."},{id:"B",texto:"Intubação orotraqueal imediata, antes de qualquer outra medida, por tratar-se de crise com risco de parada."},{id:"C",texto:"Antibiótico venoso de amplo espectro e radiografia de tórax, pois a falta de resposta indica pneumonia bacteriana."},{id:"D",texto:"Sulfato de magnésio venoso (50 mg/kg, máximo de 2 g) e salbutamol contínuo, com oxigênio, em ambiente de terapia intensiva."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **crise grave de asma** (tiragem, fala em palavras, **FC de 148 bpm**, **SpO2 de 88%**), **sem resposta** à primeira hora de tratamento (oxigênio, salbutamol repetido, ipratrópio e corticoide) e **murmúrio muito diminuído** com poucos sibilos (sinal de obstrução grave, com pouco fluxo de ar). Na crise que não responde ao tratamento inicial, o passo seguinte é o **sulfato de magnésio venoso** (**50 mg/kg**, máximo de **2 g**, em 20 minutos), que relaxa a musculatura brônquica e reduz a internação, mantendo o **salbutamol contínuo ou em doses repetidas**, o oxigênio (alvo de SpO2 de 94% ou mais), o corticoide e o ipratrópio, em **unidade de terapia intensiva**, com vigilância de fadiga respiratória. A está errada porque a aminofilina tem pior margem de segurança e não é superior ao magnésio. B está errada porque a intubação é de risco elevado na asma grave e fica para a falência respiratória (exaustão, cianose, alteração do estado mental) após esgotadas as medidas; a criança ainda fala e ventila. C está errada porque a falta de resposta na asma grave é explicada pela obstrução e não pela pneumonia, e o antibiótico não está indicado sem sinais de infecção.",
  explicacoesAlternativas:{},
  referencias:"Topjian AA et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 AHA Guidelines for CPR and ECC. Circulation 2020;142(Suppl 2):S469-523; Global Initiative for Asthma. Global Strategy for Asthma Management and Prevention, edição de 2023 (edições posteriores não conferidas). Textos não abertos nesta rodada; doses de memória.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q66 da UNIFESP 2022
{
  id:"q-adap22-066", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-infectoped", assuntoId:"ass-dda",
  enunciado:"Lactente de 14 meses, 10 kg, com diarreia aquosa há 2 dias e vômitos repetidos nas últimas 12 horas, que impedem a hidratação oral em casa. Exame: irritado, bebe com avidez, mucosas secas, olhos levemente fundos, sem lágrimas, prega cutânea que desfaz lentamente, pulso cheio e enchimento capilar normal. Não há sangue nas fezes nem febre alta. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Hidratação venosa imediata em todos os lactentes que vomitam, pois a via oral está contraindicada."},{id:"B",texto:"Sais de reidratação oral supervisionada, com ondansetrona em dose única se os vômitos persistirem."},{id:"C",texto:"Metoclopramida e loperamida por via oral, para controlar os vômitos e o número de evacuações."},{id:"D",texto:"Jejum de 6 horas para repouso do intestino, com chá e água de arroz, antes de reintroduzir o leite."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **sede aumentada**, **mucosas secas**, **olhos levemente fundos**, **sem lágrimas**, **prega que desfaz lentamente** e **pulso cheio com enchimento capilar normal**: desidratação **leve a moderada**, sem sinais de choque. Na classificação da OMS, a presença de dois ou mais sinais entre irritabilidade, olhos fundos, sede e prega lenta caracteriza **algum grau de desidratação** (plano B); os sinais de choque (letargia, pulso fraco, enchimento lento) caracterizam a desidratação grave (plano C). O plano B é feito com **solução de reidratação oral** (50 a 100 mL/kg em 4 horas) supervisionada, e o **vômito** não é contraindicação: o antiemético **ondansetrona**, em dose única, reduz a necessidade de hidratação venosa e a internação, e a reidratação deve ser oferecida em pequenos volumes, frequentes. Depois, reavalia-se e mantém-se a alimentação, com zinco. A está errada porque a via oral continua sendo a de escolha, mesmo com vômitos, e a via venosa fica para choque ou falha da terapia oral. C está errada porque a metoclopramida tem efeitos extrapiramidais em crianças e a loperamida é contraindicada em menores de 2 anos. D está errada porque o jejum prolongado agrava a desnutrição e a evolução; recomenda-se manter a alimentação e o leite.",
  explicacoesAlternativas:{},
  referencias:"World Health Organization. The treatment of diarrhoea: a manual for physicians and other senior health workers, 4ª revisão, 2005; Freedman SB et al. Oral ondansetron for gastroenteritis in a pediatric emergency department. N Engl J Med 2006;354:1698-705. Texto do Ministério da Saúde vigente não aberto; conduta conferida em resumos da busca.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q67 da UNIFESP 2022
{
  id:"q-adap22-067", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-mps", especialidadeId:"esp-bioetica", assuntoId:"ass-comunicacaoclinica",
  enunciado:"Mulher, 45 anos, volta ao consultório para receber o resultado de uma biópsia de mama, que confirmou carcinoma ductal invasor. A médica, que a atendeu apenas uma vez antes, vai dar a notícia e quer seguir o protocolo SPIKES. Qual é a primeira etapa a cumprir?",
  alternativas:[{id:"A",texto:"Preparar o ambiente e o contexto: privacidade, tempo, sentar-se e evitar interrupções."},{id:"B",texto:"Dar a má notícia de forma direta e rápida, para evitar falsas esperanças e expectativas."},{id:"C",texto:"Explorar as emoções da paciente e respondê-las com empatia, antes de qualquer outra coisa."},{id:"D",texto:"Resumir a estratégia terapêutica e combinar o seguimento, encerrando a consulta de modo objetivo."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: resultado de **biópsia confirmando câncer** e médica que vai **comunicar uma má notícia** e quer seguir o **protocolo SPIKES**. O SPIKES é um roteiro de seis etapas: **S** (Setting up), preparar o ambiente e o contexto (privacidade, tempo disponível, sentar-se, desligar o telefone, convidar acompanhante se a paciente quiser); **P** (Perception), avaliar a percepção da paciente sobre sua situação; **I** (Invitation), descobrir quanto ela deseja saber; **K** (Knowledge), dar a informação com linguagem clara, em pequenas porções, e uma frase de aviso; **E** (Emotions), reconhecer e responder às emoções com empatia; **S** (Strategy and Summary), resumir e combinar o plano. A primeira etapa é, portanto, **preparar o ambiente**. B está errada porque a notícia é dada na quarta etapa, depois de conhecer a percepção da paciente e quanto ela quer saber; ser direto demais, sem preparo, é lesivo. C está errada porque a exploração das emoções é a quinta etapa e responde à reação da paciente depois da informação. D está errada porque o resumo e o plano são a última etapa e dependem das anteriores.",
  explicacoesAlternativas:{},
  referencias:"Baile WF et al. SPIKES — A six-step protocol for delivering bad news: application to the patient with cancer. Oncologist 2000;5:302-11. Texto não aberto nesta rodada; etapas de memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q68 da UNIFESP 2022
{
  id:"q-adap22-068", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-genetica", assuntoId:"ass-genetica-heranca",
  enunciado:"Casal não consanguíneo tem um menino de 3 anos com síndrome de Down, cujo cariótipo mostrou 46 cromossomos com translocação robertsoniana entre os cromossomos 14 e 21 (46,XY,der(14;21)(q10;q10),+21). O cariótipo da mãe revelou 45,XX,der(14;21)(q10;q10); o do pai, 46,XY normal. O casal quer saber o risco de um novo filho ter síndrome de Down. Qual é o risco aproximado?",
  alternativas:[{id:"A",texto:"Cerca de 1%, risco da idade materna, pois a translocação não aumenta a chance de recorrência."},{id:"B",texto:"Cerca de 25%, pelo padrão de herança autossômica recessiva, em cada nova gestação."},{id:"C",texto:"Cerca de 10% a 15%, pois a mãe é portadora balanceada e transmite o cromossomo derivado."},{id:"D",texto:"100%, porque toda gestação de portadora de translocação 14;21 resulta em trissomia do 21."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: síndrome de Down por **translocação robertsoniana 14;21 herdada da mãe**, que tem **45 cromossomos** (**portadora balanceada**, fenotipicamente normal, com o cromossomo derivado que contém o 14 e o 21 fundidos) e pai com cariótipo normal. Na meiose, a portadora pode produzir quatro tipos de gameta; os fetos viáveis são o normal, o portador balanceado e o com trissomia do 21 funcional (por receber o cromossomo derivado mais um 21 normal), e a monossomia e a trissomia do 14 costumam levar à perda gestacional. O **risco empírico de nascer um filho com síndrome de Down** é de **cerca de 10% a 15% quando a portadora é a mãe** e de **cerca de 1% a 2% quando é o pai**; para a translocação 21;21, o risco é de 100%. O aconselhamento inclui o diagnóstico pré-natal (amniocentese ou biópsia de vilo corial) e a investigação dos outros familiares. A está errada porque o risco da idade materna se aplica à trissomia livre; na translocação herdada o risco é bem maior. B está errada porque a translocação robertsoniana não segue a herança autossômica recessiva. D está errada porque o risco de 100% é próprio da translocação 21;21, e na 14;21 uma parte dos gametas é normal ou balanceada.",
  explicacoesAlternativas:{},
  referencias:"Nussbaum RL, McInnes RR, Willard HF. Thompson & Thompson Genetics and Genomics in Medicine, 9ª ed. Elsevier, 2016 (translocações robertsonianas e riscos empíricos). Texto não aberto nesta rodada; riscos de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q69 da UNIFESP 2022
{
  id:"q-adap22-069", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-pneumo", assuntoId:"ass-asma",
  enunciado:"Menino, 4 anos, com asma há 1 ano, usa budesonida em spray 100 mcg ao dia, com espaçador e máscara, e salbutamol de resgate. Nas últimas 8 semanas, tem sintomas diurnos quase todos os dias e acorda 3 vezes por semana à noite com tosse e sibilos, o que levou a duas consultas de urgência. A mãe afirma que usa a medicação regularmente. Qual é o primeiro passo mais adequado antes de intensificar o tratamento?",
  alternativas:[{id:"A",texto:"Rever técnica inalatória, adesão, desencadeantes e o diagnóstico antes de escalonar a terapia."},{id:"B",texto:"Associar um beta-2 agonista de longa duração à budesonida, que é o passo seguinte da escada."},{id:"C",texto:"Prescrever prednisolona oral contínua por 3 meses, para controle mais rápido dos sintomas."},{id:"D",texto:"Trocar a budesonida por montelucaste isolado, que tem melhor adesão que o corticoide inalatório."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **4 anos**, **sintomas diurnos quase diários** e **3 despertares noturnos por semana** com duas consultas de urgência: asma **não controlada**, apesar do corticoide inalatório em dose baixa. Antes de aumentar a medicação, a diretriz da GINA manda **verificar**: a **técnica inalatória** (espaçador e máscara bem posicionados, criança que não chora durante a inalação), a **adesão** (o relato da mãe nem sempre corresponde ao uso real), os **fatores desencadeantes** (tabagismo, alérgenos, infecções) e se **o diagnóstico está correto** (outras causas de sibilância). Só depois se escalona; para menores de 6 anos, o passo seguinte é **dobrar a dose do corticoide inalatório**, e não associar um beta-2 de longa duração, que não é a primeira escolha nessa idade. B está errada porque a associação ao beta-2 de longa duração não é a primeira escolha em pré-escolares, em quem se prefere aumentar a dose do corticoide inalatório depois de checar os fatores. C está errada porque o corticoide oral contínuo causa efeitos adversos importantes (supressão do crescimento e da adrenal) e não é estratégia de controle. D está errada porque o montelucaste é menos eficaz que o corticoide inalatório e tem alerta de eventos neuropsiquiátricos.",
  explicacoesAlternativas:{},
  referencias:"Global Initiative for Asthma. Global Strategy for Asthma Management and Prevention, edição de 2023 (edições posteriores, inclusive 2025, não conferidas: a busca só trouxe versões de 2021 a 2023); Sociedade Brasileira de Pediatria. Diretrizes de asma na infância. Textos não abertos nesta rodada. GINA 2025 existe (maio/2025; correção menor em 14/11/2025), confirmada em resumos em 29/10/2026; texto integral não aberto.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q70 da UNIFESP 2022
{
  id:"q-adap22-070", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-crescdesenv", assuntoId:"ass-puericultura",
  enunciado:"Lactente de 6 meses, nascido a termo, em aleitamento materno exclusivo, com ganho de peso e desenvolvimento adequados, senta com apoio e mostra interesse pelos alimentos da família. A mãe pergunta como e quando começar a alimentação complementar. Qual é a orientação mais adequada?",
  alternativas:[{id:"A",texto:"Iniciar aos 4 meses com sucos de frutas e papas de cereal, para que o bebê se acostume com sabores novos."},{id:"B",texto:"Substituir o leite materno pelo leite de vaca integral desde os 6 meses, por ser mais nutritivo."},{id:"C",texto:"Oferecer papas de leite engrossado com açúcar e mel, que dão energia e ajudam a criar o hábito."},{id:"D",texto:"Iniciar aos 6 meses, mantendo o leite materno, com alimentos in natura e sem sal, açúcar e mel."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **6 meses** de idade, **aleitamento materno exclusivo**, **ganho de peso adequado**, **senta com apoio** e **interesse pelos alimentos**: sinais de prontidão para a **alimentação complementar**. O Guia Alimentar para Crianças Brasileiras Menores de 2 Anos (Ministério da Saúde, 2019) recomenda **aleitamento exclusivo até 6 meses** e **continuado até 2 anos ou mais**, com introdução, aos 6 meses, de **alimentos in natura ou minimamente processados** (frutas, legumes, verduras, carnes, ovos, feijão e outros), em **consistência pastosa** (amassados, nunca liquidificados, e depois em pedaços), em 3 refeições ao dia (2 de frutas e 1 salgada, ao início), **sem sal, açúcar, mel ou ultraprocessados** no primeiro ano. O mel é contraindicado antes de 1 ano pelo risco de botulismo infantil. A está errada porque a introdução antes dos 6 meses não traz benefício e aumenta o risco de infecção, alergia e desmame; e sucos de frutas não devem ser oferecidos. B está errada porque o leite de vaca integral não substitui o materno antes de 1 ano, pela baixa quantidade de ferro e pelo risco de anemia e de hemorragia digestiva oculta. C está errada porque açúcar e mel devem ser evitados no primeiro ano.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Guia alimentar para crianças brasileiras menores de 2 anos, 2019; Sociedade Brasileira de Pediatria. Manual de alimentação: orientações para alimentação do lactente ao adolescente, 4ª ed., 2018. Textos não abertos nesta rodada.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q71 da UNIFESP 2022
{
  id:"q-adap22-071", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-crescdesenv", assuntoId:"ass-puericultura",
  enunciado:"Lactente de 4 meses, nascido a termo, comparece à consulta de puericultura. A mãe notou que a cabeça cresce depressa e que o bebê olha para baixo com frequência. Perímetro cefálico de 45,5 cm (escore Z de +3,4 pelas curvas da OMS, que era +1 aos 2 meses). Fontanela anterior abaulada e tensa, com veias do couro cabeludo dilatadas e olhar com desvio para baixo. Sem febre, vacinas em dia. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Manter o acompanhamento mensal na puericultura, pois o crescimento do perímetro cefálico é familiar."},{id:"B",texto:"Prescrever antibiótico oral e retorno em 7 dias, pela suspeita de meningite subaguda."},{id:"C",texto:"Pedir ultrassonografia transfontanelar ou imagem do crânio e encaminhar ao neurocirurgião."},{id:"D",texto:"Orientar a mãe a evitar a posição deitada de costas e reavaliar o perímetro cefálico em 3 meses."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **perímetro cefálico com escore Z de +3,4** (acima de +2 é macrocefalia) e **crescimento acelerado** (Z passou de +1 para +3,4 em 2 meses), **fontanela abaulada e tensa**, **veias do couro cabeludo dilatadas** e **desvio do olhar para baixo** (sinal do «sol poente»): hipertensão intracraniana, com suspeita de **hidrocefalia**. O exame inicial é a **ultrassonografia transfontanelar**, não invasiva e disponível enquanto a fontanela está aberta, ou a tomografia ou a ressonância; o encaminhamento ao neurocirurgião é urgente, pois pode ser necessário derivar o líquor (derivação ventrículo-peritoneal ou ventriculostomia). A medida do perímetro cefálico a cada consulta e o seu escore Z, e não só o valor absoluto, são o que permite detectar o desvio da trajetória. A está errada porque variação familiar é a explicação para a macrocefalia estável com cabeça grande desde o nascimento, não para uma aceleração com sinais de hipertensão intracraniana. B está errada porque o quadro não sugere infecção (sem febre) e o antibiótico não trata hidrocefalia. D está errada porque a posição da criança não tem relação com o quadro e esperar 3 meses expõe a lesão cerebral irreversível.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Caderneta da Criança (curvas da OMS de perímetro cefálico); Sociedade Brasileira de Pediatria. Tratado de Pediatria, 5ª ed. Manole, 2021 (hidrocefalia). Textos não abertos nesta rodada; conduta de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q72 da UNIFESP 2022
{
  id:"q-adap22-072", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-pneumo", assuntoId:"ass-pneumonia",
  enunciado:"Menino, 3 anos, 14 kg, com febre alta há 3 dias, tosse e coriza. Está ativo, aceita bem a dieta, sem vômitos. FR de 44 irpm (sem tiragem), SpO2 de 96% em ar ambiente, FC de 128 bpm. Ausculta: estertores crepitantes e redução do murmúrio no terço inferior do pulmão direito. Radiografia: consolidação lobar à direita, sem derrame. As vacinas estão em dia. A família mora perto do serviço e tem como retornar. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Internação e ceftriaxona venosa, porque toda criança com pneumonia lobar precisa ser hospitalizada."},{id:"B",texto:"Amoxicilina por via oral em dose ajustada ao peso (50 a 90 mg/kg/dia), em casa, com retorno em 48 horas."},{id:"C",texto:"Azitromicina por via oral por 5 dias como primeira escolha, por cobrir os agentes mais comuns da idade."},{id:"D",texto:"Sintomáticos sem antibiótico, pois a pneumonia nessa idade é quase sempre viral e se resolve sozinha."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: criança de **3 anos** com **febre, tosse e taquipneia leve** (o limite de taquipneia para essa idade é de **FR acima de 40 irpm**, na faixa de 1 a 5 anos), **sem tiragem, com SpO2 de 96%**, boa aceitação alimentar e **consolidação lobar** sem derrame: pneumonia bacteriana comunitária **não grave**. O tratamento é ambulatorial, com **amoxicilina oral** (de **50 a 90 mg/kg/dia**, conforme a diretriz: a IDSA/PIDS usa 90 mg/kg/dia, e diretrizes brasileiras e o ensaio CAP-IT aceitam doses menores; em duas ou três tomadas, por 5 a 7 dias), cobrindo o Streptococcus pneumoniae, com retorno em 48 horas ou se piorar. São sinais de gravidade e indicação de internação: **SpO2 abaixo de 92%**, tiragem, gemência, dificuldade de alimentação, vômitos, desidratação, derrame importante e falha do tratamento oral. A está errada porque a pneumonia lobar, sem sinais de gravidade, não exige internação, e o antibiótico venoso é reservado a casos graves. C está errada porque o macrolídeo não é a primeira escolha em pré-escolares com pneumonia lobar, em que o pneumococo é o agente principal, e a resistência é elevada. D está errada porque febre alta, consolidação lobar e estertores sugerem etiologia bacteriana, que requer antibiótico.",
  explicacoesAlternativas:{},
  referencias:"Bradley JS et al. The management of community-acquired pneumonia in infants and children older than 3 months of age: IDSA/PIDS guidelines. Clin Infect Dis 2011;53:e25-76; Harris M et al. British Thoracic Society guidelines for the management of community acquired pneumonia in children. Thorax 2011;66(Suppl 2):ii1-23. Textos não abertos nesta rodada; dose de memória. A IDSA/PIDS publicou em 2026 a primeira parte da revisão da diretriz de pneumonia pediátrica de 2011, sobre derrame parapneumônico em maiores de 3 meses; a parte de tratamento ambulatorial segue na versão de 2011, segundo fontes secundárias em 29/10/2026.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q73 da UNIFESP 2022
{
  id:"q-adap22-073", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-crescdesenv", assuntoId:"ass-puericultura",
  enunciado:"Menina, 9 anos e 2 meses, é levada à consulta de rotina na unidade básica de saúde. Peso de 41 kg e estatura de 1,32 m. O escore Z do índice de massa corporal para a idade, pelas curvas da OMS, é de +2,4, e o da estatura para a idade, de -0,4. Qual é o diagnóstico nutricional?",
  alternativas:[{id:"A",texto:"Obesidade, pelo escore Z do IMC para idade."},{id:"B",texto:"Sobrepeso, pelo escore Z do IMC para a idade."},{id:"C",texto:"Risco de sobrepeso, pelo escore Z do IMC."},{id:"D",texto:"Obesidade grave, pelo escore Z do IMC."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: criança de **9 anos e 2 meses** (faixa de **5 a 19 anos**), com **escore Z do IMC para a idade de +2,4** e estatura adequada (Z de -0,4, dentro de -2 a +2). Para a faixa de **5 a 19 anos**, a classificação da OMS é: **magreza acentuada**, abaixo de Z -3; **magreza**, de -3 a abaixo de -2; **eutrofia**, de -2 a +1 (inclusive); **sobrepeso**, acima de +1 até +2; **obesidade**, acima de +2 até +3; **obesidade grave**, acima de +3. Com **+2,4**, a classificação é **obesidade**. Para menores de 5 anos os pontos de corte são diferentes (risco de sobrepeso acima de +1, sobrepeso acima de +2 e obesidade acima de +3), e essa diferença é uma fonte comum de erro. O IMC aqui é 41/1,32² = **23,5 kg/m²**, mas a classificação não usa o valor absoluto, e sim o escore Z da curva por idade e sexo. B está errada porque o sobrepeso, nessa faixa etária, é Z entre +1 e +2. C está errada porque «risco de sobrepeso» é categoria dos menores de 5 anos. D está errada porque a obesidade grave exige Z acima de +3.",
  explicacoesAlternativas:{},
  referencias:"World Health Organization. Growth reference data for 5-19 years (WHO Reference 2007); Brasil. Ministério da Saúde. Orientações para a coleta e análise de dados antropométricos em serviços de saúde (Norma Técnica do SISVAN), 2011. Textos não abertos nesta rodada; pontos de corte de memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q74 da UNIFESP 2022
{
  id:"q-adap22-074", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-ped", especialidadeId:"esp-neonato", assuntoId:"ass-reanimacao",
  enunciado:"Recém-nascido a termo, adequado para a idade gestacional, nasce de parto vaginal com líquido amniótico claro. Cerca de 30 segundos depois, após ser levado ao berço aquecido, posicionado, seco e estimulado, mantém apneia, hipotonia e cianose generalizada. A frequência cardíaca, medida por ausculta, é de 80 bpm. Qual é a conduta imediata mais adequada?",
  alternativas:[{id:"A",texto:"Intubação orotraqueal imediata e adrenalina pelo tubo, antes de ventilar com máscara."},{id:"B",texto:"Ventilação com pressão positiva por máscara, ar ambiente (21%) e oxímetro de pulso."},{id:"C",texto:"Compressões torácicas com ventilação na relação 3:1, iniciando já a massagem cardíaca."},{id:"D",texto:"Oxigênio inalatório livre a 100% e nova avaliação em 1 minuto, sem ventilar."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **recém-nascido a termo**, que após os **passos iniciais** (aquecer, posicionar, aspirar se necessário, secar e estimular) permanece em **apneia** com **FC de 80 bpm** (abaixo de 100 bpm), aos 30 segundos. No fluxograma de reanimação neonatal (AHA/AAP e SBP), se há **apneia, respiração irregular ou FC abaixo de 100 bpm**, inicia-se a **ventilação com pressão positiva** (máscara e balão autoinflável ou peça em T), na frequência de **40 a 60 ventilações por minuto** (SBP 2022; a AHA/AAP 2025 ampliou a faixa para 30 a 60), com **ar ambiente (21%)** nos recém-nascidos com 35 semanas ou mais e **oxímetro de pulso** no membro superior direito para guiar a titulação do oxigênio. Isso deve ocorrer dentro do **primeiro minuto de vida** (o «minuto de ouro»). Se, após 30 segundos de ventilação efetiva, a FC permanecer abaixo de 60 bpm, iniciam-se as compressões torácicas. A está errada porque a intubação e a adrenalina são passos posteriores, para quando a ventilação com máscara falha e há FC abaixo de 60 bpm com compressões. C está errada porque as compressões só se iniciam se a FC estiver abaixo de 60 bpm depois de 30 segundos de ventilação efetiva; a relação é de 3:1. D está errada porque o oxigênio inalatório livre não resolve a apneia e a ventilação é o passo que reverte a bradicardia neonatal.",
  explicacoesAlternativas:{},
  referencias:"Aziz K et al. Part 5: Neonatal Resuscitation: 2020 AHA Guidelines for CPR and ECC. Circulation 2020;142(Suppl 2):S524-50 (a AHA/AAP publicou nova edição em 2025, com ventilação de 30 a 60 por minuto e clampeamento tardio do cordão por 60 s ou mais, segundo resumos de fontes secundárias em 29/10/2026; texto integral não aberto); Sociedade Brasileira de Pediatria. Diretrizes da SBP: reanimação do recém-nascido >=34 semanas em sala de parto, 2022. Textos não abertos nesta rodada.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q75 da UNIFESP 2022
{
  id:"q-adap22-075", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-neurocirurgia", assuntoId:"ass-neurocir-tumores",
  enunciado:"Homem, 58 anos, com cefaleia progressiva há 6 semanas e uma crise convulsiva focal com generalização. Exame: sem déficit motor, Karnofsky de 90. Ressonância de crânio: lesão frontal esquerda de 4 cm, com realce periférico em anel e centro necrótico, edema perilesional extenso e cruzamento do joelho do corpo caloso. A ressecção é possível sem sequela neurológica importante. A anatomia patológica da peça mostra glioblastoma, IDH selvagem. Qual é o tratamento padrão para esse paciente?",
  alternativas:[{id:"A",texto:"Radioterapia isolada, sem cirurgia, pois a lesão é infiltrativa e não pode ser ressecada."},{id:"B",texto:"Observação com corticoide e anticonvulsivante, reservando o tratamento à progressão neurológica."},{id:"C",texto:"Quimioterapia com temozolomida isolada, que dispensa a cirurgia e a radioterapia."},{id:"D",texto:"Ressecção máxima segura, seguida de radioterapia com temozolomida e temozolomida adjuvante."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: lesão frontal com **realce em anel**, **necrose central**, **edema** e **infiltração do corpo caloso** (imagem típica de glioblastoma), paciente com **bom estado funcional** (Karnofsky de 90; considera-se tratamento intensivo com Karnofsky de 70 ou mais) e **anatomia patológica de glioblastoma, IDH selvagem** (a classificação da OMS de 2021 de tumores do sistema nervoso central o define como glioma difuso de grau 4). O tratamento padrão, desde o estudo de Stupp (2005), é a **ressecção máxima segura**, seguida de **radioterapia fracionada (60 Gy)** com **temozolomida concomitante** e depois **6 ciclos de temozolomida adjuvante**, que aumentam a sobrevida mediana de cerca de 12 para 15 meses. A metilação do promotor de MGMT prediz melhor resposta. A está errada porque a lesão é ressecável, e a cirurgia amplia a sobrevida e dá diagnóstico; a radioterapia isolada é para o paciente sem condição cirúrgica. B está errada porque a observação sem tratamento é inadequada num tumor agressivo. C está errada porque a quimioterapia isolada não é o tratamento padrão e a temozolomida isolada só se considera em idosos frágeis com tumor de promotor de MGMT metilado, sem radioterapia.",
  explicacoesAlternativas:{},
  referencias:"Stupp R et al. Radiotherapy plus concomitant and adjuvant temozolomide for glioblastoma. N Engl J Med 2005;352:987-96; Louis DN et al. The 2021 WHO Classification of Tumors of the Central Nervous System. Neuro Oncol 2021;23:1231-51. Textos não abertos nesta rodada; dados de sobrevida de memória.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q76 da UNIFESP 2022
{
  id:"q-adap22-076", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-nefro", assuntoId:"ass-drc",
  enunciado:"Mulher, 62 anos, hipertensa, é avaliada na unidade básica de saúde. Exames do mês, repetidos após 3 meses com resultados semelhantes: creatinina de 1,6 mg/dL, taxa de filtração glomerular estimada de 38 mL/min/1,73 m² e relação albumina/creatinina urinária de 450 mg/g. Ultrassonografia: rins com contornos regulares e tamanho levemente reduzido. Qual é a classificação da doença renal crônica e a conduta mais adequada?",
  alternativas:[{id:"A",texto:"G3a A2, risco moderado; manter o acompanhamento anual na atenção básica."},{id:"B",texto:"G4 A1, risco alto; encaminhar à diálise em 30 dias."},{id:"C",texto:"G3b A3, risco muito alto; encaminhar ao nefrologista e controlar pressão e albuminúria."},{id:"D",texto:"G2 A1, risco baixo; apenas orientação dietética e repetir os exames em 1 ano, na UBS."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: alteração **persistente por mais de 3 meses** (doença renal crônica), **taxa de filtração glomerular de 38 mL/min/1,73 m²** e **relação albumina/creatinina de 450 mg/g**. A classificação do KDIGO combina a categoria de TFG (**G1**, 90 ou mais; **G2**, 60 a 89; **G3a**, 45 a 59; **G3b**, 30 a 44; **G4**, 15 a 29; **G5**, abaixo de 15) com a de albuminúria (**A1**, abaixo de 30 mg/g; **A2**, 30 a 300; **A3**, acima de 300). Com TFG de 38 (**G3b**) e RAC de 450 mg/g (**A3**), a paciente está em **G3b A3**, que é de **risco muito alto** de progressão e de eventos cardiovasculares (zona vermelha do mapa de calor). O encaminhamento ao **nefrologista** é indicado com TFG abaixo de 30, albuminuria de 300 mg/g ou mais, queda rápida da TFG ou outros critérios, e a atenção básica otimiza a pressão (meta abaixo de 120 mmHg sistólica, se tolerada, com bloqueio do SRA) e a albuminúria. A está errada porque G3a A2 não corresponde aos valores: a TFG é 38 e a albuminúria, 450. B está errada porque G4 requer TFG de 15 a 29 e A1, albuminúria abaixo de 30, e a diálise não se indica com TFG de 38. D está errada porque G2 A1 é quase normal e subestima a gravidade; a paciente tem alto risco.",
  explicacoesAlternativas:{},
  referencias:"KDIGO CKD Work Group. KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int 2024;105(4S):S117-S314. Texto oficial não aberto (rede bloqueada); categorias de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q77 da UNIFESP 2022
{
  id:"q-adap22-077", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-gastro", assuntoId:"ass-gastro-constipacao",
  enunciado:"Mulher, 32 anos, queixa-se de evacuar 2 vezes por semana, com esforço e fezes endurecidas em cíbalos, há 2 anos, sem outros sintomas. Ingere pouca fibra e pouca água. Não perdeu peso, não tem sangue nas fezes, anemia ou história familiar de câncer colorretal; o exame físico, incluindo o toque retal, é normal. Não usa medicamentos que causem constipação. Qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Colonoscopia imediata para excluir neoplasia, pois toda constipação crônica exige avaliação do cólon."},{id:"B",texto:"Enemas diários de fosfato de sódio, que são a base do tratamento de manutenção."},{id:"C",texto:"Laxante estimulante (bisacodil) todos os dias por tempo indeterminado, como primeira escolha."},{id:"D",texto:"Fibras, água e hábito intestinal, e laxante osmótico (polietilenoglicol) como 1ª escolha."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: mulher jovem com **menos de 3 evacuações por semana**, **esforço** e **fezes endurecidas** há mais de 6 meses (os critérios de Roma IV de constipação funcional), **sem sinais de alarme** (sangue nas fezes, anemia, perda de peso, início após os 50 anos, história familiar de câncer colorretal, massa) e com exame físico normal. A conduta inicial é **sem exames**: orientar **fibras** (20 a 30 g por dia), **água**, atividade física e regularidade de horário, e acrescentar **laxante osmótico** (polietilenoglicol ou lactulose) como primeira opção farmacológica; se não houver resposta, investigam-se distúrbios da evacuação (manometria anorretal) e se escalona o tratamento. A está errada porque a colonoscopia é para quem tem sinais de alarme ou rastreamento por idade; sem eles, não muda a conduta. B está errada porque os enemas são para desimpactação ou resgate, e o uso diário de fosfato de sódio tem risco de distúrbio hidroeletrolítico e de lesão renal. C está errada porque o laxante estimulante é medicação de segunda linha ou de resgate, com uso diário prolongado associado a cólica e tolerância.",
  explicacoesAlternativas:{},
  referencias:"Mearin F et al. Bowel disorders. Gastroenterology 2016;150:1393-407 (critérios de Roma IV); American Gastroenterological Association. Technical review / ACG-AGA guidelines on chronic idiopathic constipation (edição de 2023 não conferida). Textos não abertos nesta rodada. Os critérios de Roma V foram publicados em 2026 (Gastroenterology 2026;170(6), doi 10.1053/j.gastro.2026.02.003), com o termo constipação crônica no lugar de funcional, segundo fonte secundária em 29/10/2026; esta questão usa os critérios de Roma IV e a conduta não foi conferida na nova edição.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q78 da UNIFESP 2022
{
  id:"q-adap22-078", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-dermato", assuntoId:"ass-derm-infeccoes",
  enunciado:"Homem, 28 anos, queixa-se de prurido intenso, pior à noite, há 3 semanas, com pequenas pápulas e túneis lineares entre os dedos das mãos, nos punhos e na região periumbilical. A esposa e o filho de 2 anos também têm coceira. Não há lesões no rosto. Qual é a conduta terapêutica mais adequada?",
  alternativas:[{id:"A",texto:"Corticoide tópico potente por 4 semanas e anti-histamínico, tratando só o paciente."},{id:"B",texto:"Permetrina a 5% do pescoço para baixo, repetida em 7 dias, e tratar os contactantes."},{id:"C",texto:"Albendazol 400 mg em dose única, repetido em 2 semanas, para tratar a parasitose intestinal associada."},{id:"D",texto:"Antibiótico oral por 10 dias e hidratação da pele, pois o quadro é uma piodermite disseminada."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **prurido noturno intenso**, **pápulas e túneis lineares** nos espaços interdigitais, nos punhos e na região periumbilical, e **familiares com o mesmo quadro**, sem acometimento do rosto (nos adultos): escabiose, causada pelo ácaro Sarcoptes scabiei var. hominis. O tratamento é **permetrina a 5%** em loção ou creme, aplicada **do pescoço para baixo** à noite, com **banho depois de 8 a 12 horas**, **repetida em 7 dias**, ou **ivermectina oral 200 mcg/kg** em duas doses com 7 a 14 dias de intervalo (não recomendada para crianças com menos de 15 kg e para gestantes). É essencial **tratar ao mesmo tempo todos os contactantes íntimos**, mesmo os assintomáticos, e lavar roupas de cama e de uso a 60 °C ou isolá-las por 72 horas. O prurido pode persistir por 2 a 4 semanas depois da cura. A está errada porque o corticoide alivia o prurido mas não elimina o ácaro, e tratar só o paciente leva à reinfestação. C está errada porque o albendazol trata helmintíases e não escabiose. D está errada porque o quadro não é piodermite, e o antibiótico oral só se justifica se houver impetiginização.",
  explicacoesAlternativas:{},
  referencias:"Salavastru CM et al. European guideline for the management of scabies. J Eur Acad Dermatol Venereol 2017;31:1248-53; Brasil. Ministério da Saúde. Guia de Vigilância em Saúde, 6ª ed., 2023. Textos não abertos nesta rodada; esquemas de memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q79 da UNIFESP 2022
{
  id:"q-adap22-079", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-gastro", assuntoId:"ass-cirrose",
  enunciado:"Homem, 55 anos, etilista, com cirrose e ascite, internado por piora do abdome há 2 dias, com dor difusa leve e febre de 37,9 °C. Exame: abdome distendido, doloroso à palpação, sem sinais de peritonite franca; Glasgow 15. Creatinina de 1,1 mg/dL. A paracentese diagnóstica mostra líquido turvo, com 480 polimorfonucleares/mm³, proteína de 0,9 g/dL; a cultura está em andamento. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Ceftriaxona 2 g por dia por via venosa e albumina 1,5 g/kg no dia 1 e 1 g/kg no dia 3."},{id:"B",texto:"Aguardar o resultado da cultura para iniciar o antibiótico, pois o líquido pode ser colonizado."},{id:"C",texto:"Norfloxacino 400 mg por dia por via oral por 5 dias e alta, já que o paciente está estável."},{id:"D",texto:"Paracentese de grande volume sem reposição de albumina, para aliviar a distensão e a dor."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: cirrose com **ascite**, dor abdominal, febre baixa e **paracentese com 480 polimorfonucleares/mm³** (o diagnóstico de **peritonite bacteriana espontânea** é feito com **250 células polimorfonucleares/mm³ ou mais**, independentemente da cultura): o limite é de 250, e o líquido tem quase o dobro. O tratamento deve ser **imediato**, com antibiótico empírico de amplo espectro, e a primeira escolha é a **ceftriaxona 2 g por dia por via venosa** (5 dias), ajustada pela cultura. A **albumina** (**1,5 g/kg** no primeiro dia e **1 g/kg** no terceiro dia) reduz a incidência de síndrome hepatorrenal e a mortalidade, e é indicada principalmente com creatinina acima de 1 mg/dL, ureia acima de 30 mg/dL ou bilirrubina acima de 4 mg/dL; muitos serviços a dão em todos os casos. Após o episódio, indica-se **profilaxia secundária** com antibiótico. B está errada porque aguardar a cultura atrasa o antibiótico, e cada hora de atraso aumenta a mortalidade; a cultura é negativa em até metade dos casos. C está errada porque o norfloxacino oral é para profilaxia, não para o tratamento, e o paciente tem infecção ativa que exige antibiótico venoso e internação. D está errada porque a paracentese de grande volume sem albumina aumenta o risco de disfunção circulatória e deve ser evitada num paciente infectado.",
  explicacoesAlternativas:{},
  referencias:"Biggins SW et al. Diagnosis, evaluation, and management of ascites, spontaneous bacterial peritonitis and hepatorenal syndrome: 2021 practice guidance by the AASLD. Hepatology 2021;74:1014-48; European Association for the Study of the Liver. EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis. J Hepatol 2018;69:406-60. Textos não abertos nesta rodada; doses de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q80 da UNIFESP 2022
{
  id:"q-adap22-080", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-cardio", assuntoId:"ass-sca",
  enunciado:"Homem, 66 anos, diabético e hipertenso, chega ao pronto-socorro de hospital com serviço de hemodinâmica 24 horas, com dor torácica em aperto em repouso há 90 minutos, que cedeu parcialmente com nitrato. O ECG mostra infradesnivelamento do segmento ST de 1,5 mm em V4 a V6, sem supradesnivelamento. Troponina ultrassensível seis vezes acima do limite superior, PA de 128 x 76 mmHg, FC de 98 bpm, sem sinais de insuficiência cardíaca; sem parada cardíaca. Está sem dor no momento. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Estratégia invasiva precoce, com coronariografia em até 24 horas, antiagregação dupla e anticoagulação."},{id:"B",texto:"Fibrinólise imediata com tenecteplase, pois a troponina elevada confirma o infarto com oclusão total."},{id:"C",texto:"Teste ergométrico em 72 horas e alta com ácido acetilsalicílico, se negativo."},{id:"D",texto:"Alta com ácido acetilsalicílico e retorno ambulatorial em 7 dias, pois a dor cedeu."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: dor típica **em repouso**, **infradesnivelamento do ST** sem supradesnivelamento, **troponina seis vezes acima do limite superior** (infarto sem supra de ST), diabetes e **ausência de instabilidade** (sem dor refratária, arritmia grave, choque ou insuficiência cardíaca aguda). Pelas diretrizes (ESC 2023 e ACC/AHA), os critérios de **alto risco** (diagnóstico de infarto sem supra por troponina, alterações dinâmicas do ST ou da onda T, **GRACE acima de 140**) indicam **estratégia invasiva precoce, em até 24 horas**; a de **muito alto risco** (instabilidade hemodinâmica, dor refratária, arritmia ventricular, insuficiência cardíaca aguda, complicação mecânica) exige **coronariografia imediata, em até 2 horas**. O tratamento clínico inclui **ácido acetilsalicílico**, segundo antiplaquetário (ticagrelor ou clopidogrel, de acordo com o plano), **anticoagulação parenteral** (heparina), estatina, betabloqueador e controle dos fatores de risco. B está errada porque a fibrinólise é para infarto com supra de ST (ou bloqueio de ramo novo) quando a angioplastia primária não é possível, e é prejudicial no infarto sem supra. C está errada porque o teste de esforço é para risco baixo, e este paciente tem troponina elevada e alto risco. D está errada porque a alta de um paciente com infarto sem supra e alto risco expõe a morte e reinfarto; a dor ter cedido não afasta o risco.",
  explicacoesAlternativas:{},
  referencias:"Byrne RA et al. 2023 ESC Guidelines for the management of acute coronary syndromes. Eur Heart J 2023;44:3720-826; Rao SV et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute Coronary Syndromes. Circulation 2025 (texto oficial não aberto; confirmados apenas o limite de 120 minutos e a angiografia em 2 a 24 horas após fibrinólise, em resumos; em 29/10/2026 fontes secundárias divergiram sobre o início da angiografia após fibrinólise, 2 ou 3 horas). Valores do GRACE de memória.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q81 da UNIFESP 2022
{
  id:"q-adap22-081", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-cardio", assuntoId:"ass-arritmias",
  enunciado:"Mulher, 31 anos, sem antecedentes patológicos, procura o pronto-socorro com palpitações de início súbito há 40 minutos, sem dor torácica, síncope ou dispneia. PA de 118 x 74 mmHg, FC de 168 bpm, SpO2 de 99%, lúcida e bem perfundida. O traçado do monitor na derivação DII está na figura. Qual é a conduta inicial mais adequada?",
  alternativas:[{id:"A",texto:"Cardioversão elétrica sincronizada com 50 a 100 J, imediatamente, sob sedação."},{id:"B",texto:"Amiodarona 300 mg por via venosa em infusão, como primeira medida."},{id:"C",texto:"Manobra de Valsalva modificada (sopro em seringa e pernas elevadas), com monitorização."},{id:"D",texto:"Adenosina 12 mg em bolus rápido, direto, antes de tentar qualquer manobra vagal."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas da imagem: ritmo **regular**, de **QRS estreito** (menos de 120 ms), a cerca de **168 bpm** e **sem ondas P identificáveis**; dicas do enunciado: **início súbito**, paciente **jovem, sem cardiopatia**, **estável** (PA de 118 x 74 mmHg, lúcida, sem dor, sem dispneia nem sinais de choque): taquicardia supraventricular paroxística por reentrada (nodal ou por via acessória). Na taquicardia regular de QRS estreito **estável**, o primeiro passo são as **manobras vagais**: a **manobra de Valsalva modificada** (esforço expiratório de 15 segundos contra resistência, como soprar numa seringa de 10 mL, seguido de deitar a paciente e elevar passivamente as pernas por 15 segundos) reverte cerca de 43% dos casos, contra cerca de 17% da manobra-padrão, no estudo REVERT. Se falhar, vem a **adenosina**, em bolus rápido de **6 mg** e depois **12 mg**, seguido de soro; depois, bloqueadores de canal de cálcio ou betabloqueadores. A **cardioversão** é para instabilidade. A está errada porque a cardioversão elétrica é reservada à instabilidade (hipotensão, dor, dispneia, alteração do estado mental) ou à falha dos fármacos. B está errada porque a amiodarona não é a primeira escolha na taquicardia supraventricular estável e tem efeitos adversos. D está errada porque a adenosina começa com 6 mg, não com 12 mg, e só depois das manobras vagais.",
  explicacoesAlternativas:{},
  referencias:"Page RL et al. 2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia. Circulation 2016;133:e506-74; Appelboom A et al. Postural modification to the standard Valsalva manoeuvre for emergency treatment of supraventricular tachycardias (REVERT). Lancet 2015;386:1747-53. Textos não abertos nesta rodada; taxas de reversão de memória. Não localizei substituição da diretriz ACC/AHA/HRS de 2015 para taquicardia supraventricular até 29/10/2026; a dose de adenosina e o resultado do estudo REVERT não foram conferidos.",
  imagemUrl:"dados/imagens/q-adap22-081.png", imagemLegenda:"Traçado do monitor na derivação DII, ritmo regular de QRS estreito (ilustração esquemática).",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q82 da UNIFESP 2022
{
  id:"q-adap22-082", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-reumato", assuntoId:"ass-reumato-cristais",
  enunciado:"Homem, 55 anos, hipertenso, com três crises de artrite gotosa no último ano e um tofo no cotovelo. Está fora de crise há 6 semanas. Exames: ácido úrico de 9,2 mg/dL; creatinina de 1,0 mg/dL, taxa de filtração glomerular estimada de 80 mL/min/1,73 m². Usa hidroclorotiazida. Qual é a conduta mais adequada para o tratamento de longo prazo?",
  alternativas:[{id:"A",texto:"Alopurinol 600 mg por dia desde o primeiro dia, para atingir rápido o alvo de ácido úrico."},{id:"B",texto:"Alopurinol em dose baixa, aumento gradual até urato < 6 mg/dL e colchicina por 3 a 6 meses."},{id:"C",texto:"Colchicina diária isolada, indefinidamente, que reduz o ácido úrico e dispensa o hipouricemiante."},{id:"D",texto:"Alopurinol iniciado somente durante a próxima crise, para tratar a inflamação e baixar o urato."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: gota com **três crises por ano**, **tofo** e **ácido úrico de 9,2 mg/dL**, ou seja, com **indicação de terapia hipouricemiante** (duas ou mais crises por ano, tofos ou lesão articular). Fora de crise, inicia-se o **alopurinol em dose baixa** (**100 mg por dia**, ou menos se a função renal estiver reduzida), com **aumento gradual** a cada 2 a 5 semanas até o alvo de **ácido úrico abaixo de 6 mg/dL** (abaixo de 5 mg/dL se houver tofos, segundo a EULAR), e dá-se **profilaxia anti-inflamatória** (colchicina em dose baixa, anti-inflamatório ou prednisona em dose baixa) por **3 a 6 meses**, porque a mobilização de urato nos primeiros meses precipita crises. A diretriz do ACR de 2020 também recomenda trocar a hidroclorotiazida, quando possível, por losartana, que tem efeito uricosúrico. A está errada porque a dose alta desde o início aumenta o risco de crises e de reações de hipersensibilidade ao alopurinol. C está errada porque a colchicina previne crises, mas não baixa o ácido úrico. D está errada porque o alopurinol não trata a crise e, iniciado no meio dela sem cobertura anti-inflamatória, pode prolongá-la; a ACR admite começá-lo durante a crise só com anti-inflamatório associado, e aqui o paciente já está fora da crise, com o início programado e a profilaxia.",
  explicacoesAlternativas:{},
  referencias:"FitzGerald JD et al. 2020 American College of Rheumatology Guideline for the Management of Gout. Arthritis Care Res 2020;72:744-60. Texto oficial não aberto (rede bloqueada); doses e prazos de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q83 da UNIFESP 2022
{
  id:"q-adap22-083", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cg", especialidadeId:"esp-ortopedia", assuntoId:"ass-orto-osteometabolicas",
  enunciado:"Mulher, 66 anos, menopausa aos 50 anos, sem fraturas prévias, não fuma, ingere pouco cálcio. Densitometria óssea: T-score de -2,7 no colo do fêmur e de -2,4 na coluna lombar. Creatinina de 0,8 mg/dL, cálcio e vitamina D normais, sem doença esofágica. Qual é o tratamento farmacológico inicial mais adequado?",
  alternativas:[{id:"A",texto:"Estrogênio isolado por 10 anos, para prevenção de fraturas em qualquer idade."},{id:"B",texto:"Raloxifeno como primeira linha, para reduzir o risco de fraturas de quadril."},{id:"C",texto:"Calcitonina nasal diária, que é o antirreabsortivo de maior eficácia contra fraturas."},{id:"D",texto:"Alendronato 70 mg por semana, com cálcio e vitamina D, e orientação de atividade física."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: mulher na **pós-menopausa** com **T-score de -2,7 no colo do fêmur** (a osteoporose se define por T-score de **-2,5 ou menos**, segundo a OMS), **sem fratura prévia**, **função renal normal** e **sem doença esofágica**: osteoporose sem fratura, com indicação de tratamento. A primeira escolha em grande parte das diretrizes é o **bisfosfonato oral**, em geral o **alendronato 70 mg por semana** (ou risedronato), que reduz fraturas vertebrais (cerca de 50%) e de quadril (cerca de 40%), com **cálcio e vitamina D** em quantidades adequadas e atividade física; a duração é de 5 anos, com reavaliação. Para quem tem risco muito alto (fratura recente, T-score abaixo de -3,0 ou fraturas múltiplas), consideram-se fármacos anabólicos primeiro. A está errada porque a terapia hormonal não é indicada como primeira linha só para prevenir fraturas em mulher de 66 anos, pelo risco cardiovascular e de câncer de mama. B está errada porque o raloxifeno reduz fraturas vertebrais, mas não as de quadril, e aumenta o risco de tromboembolismo. C está errada porque a calcitonina tem eficácia fraca e associação com câncer, e não é primeira linha.",
  explicacoesAlternativas:{},
  referencias:"Camacho PM et al. American Association of Clinical Endocrinologists/American College of Endocrinology Clinical Practice Guidelines for the diagnosis and treatment of postmenopausal osteoporosis, 2020 update. Endocr Pract 2020;26(Suppl 1):1-46; Radominski SC et al. Diretrizes brasileiras para o diagnóstico e tratamento da osteoporose em mulheres na pós-menopausa. Rev Bras Reumatol 2017;57(Suppl 2):452-66. Textos não abertos nesta rodada.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q84 da UNIFESP 2022
{
  id:"q-adap22-084", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-endocrino", assuntoId:"ass-tireoide",
  enunciado:"Mulher, 38 anos, assintomática, tem nódulo tireoidiano de 1,8 cm em lobo direito, achado em ultrassonografia: sólido, hipoecogênico, com margens irregulares e focos ecogênicos puntiformes, mais alto que largo. TSH de 1,6 mUI/L. A punção aspirativa com agulha fina mostra citologia Bethesda VI (maligna, carcinoma papilífero), sem linfonodos suspeitos ao ultrassom cervical. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Iodo radioativo isolado, sem cirurgia, pois o carcinoma papilífero é sensível ao iodo."},{id:"B",texto:"Levotiroxina em dose supressora e nova ultrassonografia em 1 ano, sem outra medida."},{id:"C",texto:"Tireoidectomia (lobectomia ou total, conforme o risco), sem iodo radioativo inicial."},{id:"D",texto:"Repetir a punção em 3 meses, pois a citologia maligna exige confirmação por segunda amostra."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: nódulo **sólido (2 pontos)**, **hipoecogênico (2)**, **mais alto que largo (3)**, de **margem irregular (2)** e com **focos ecogênicos puntiformes (3)** soma **12 pontos** no ACR TI-RADS, ou seja, **TR5** (7 pontos ou mais: altamente suspeito; faz-se punção se o nódulo tem 1 cm ou mais; TR4 vai de 4 a 6 pontos), e a citologia é **Bethesda VI** (maligna: risco de malignidade de 97% a 99%), com **carcinoma papilífero de 1,8 cm**, sem linfonodos suspeitos. Pela diretriz da ATA de 2015, para o câncer papilífero de **1 a 4 cm**, sem extensão extratireoidiana e sem metástase, a cirurgia pode ser **lobectomia** ou **tireoidectomia total**, conforme as preferências e fatores de risco; a ATA de 2025 (vista só em resumos) recomenda a lobectomia para tumor restrito a um lobo de até 2 cm, como este de 1,8 cm; a tireoidectomia total é indicada para tumores maiores que 4 cm, extensão extratireoidiana, metástases ou história de radiação. O **iodo radioativo** não é rotina em baixo risco. A está errada porque o iodo radioativo trata resíduo e metástases depois da cirurgia, e não substitui a cirurgia do tumor primário. B está errada porque a supressão do TSH não trata o câncer, e a observação não é adequada a um tumor de 1,8 cm Bethesda VI. D está errada porque a citologia Bethesda VI é suficiente para a decisão cirúrgica; repetir a punção só atrasa o tratamento.",
  explicacoesAlternativas:{},
  referencias:"Haugen BR et al. 2015 American Thyroid Association Management Guidelines for Adult Patients with Thyroid Nodules and Differentiated Thyroid Cancer. Thyroid 2016;26:1-133; Tessler FN et al. ACR Thyroid Imaging, Reporting and Data System (TI-RADS): White Paper of the ACR TI-RADS Committee. J Am Coll Radiol 2017;14:587-95. Textos não abertos nesta rodada; pontuação do TI-RADS de memória. ATA 2025 para câncer diferenciado de tireoide existe (Thyroid 2025, doi 10.1177/10507256251363120), com uso mais seletivo do radioiodo e estratificação de risco em quatro níveis, segundo resumos de fontes secundárias em 29/10/2026; a recomendação de lobectomia citada na explicação deve ser conferida no texto.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q85 da UNIFESP 2022
{
  id:"q-adap22-085", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-hemato", assuntoId:"ass-hemato-hemostasia",
  enunciado:"Mulher, 78 anos, com fibrilação atrial permanente em uso de varfarina, procura o pronto-socorro após exame de rotina, que mostrou INR de 11,4. Há 5 dias tomou azitromicina por uma infecção respiratória. Está assintomática, sem sangramento, hemodinamicamente estável, sem queda ou trauma recente. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Plasma fresco congelado 15 mL/kg por via venosa, para reverter o efeito da varfarina o mais rápido possível."},{id:"B",texto:"Suspender a varfarina e dar vitamina K oral em dose baixa (cerca de 2,5 mg), com novo INR em 24 horas."},{id:"C",texto:"Concentrado de complexo protrombínico de 4 fatores, que é a primeira escolha para qualquer INR acima de 9."},{id:"D",texto:"Manter a varfarina na mesma dose e repetir o INR em 1 semana, pois não há sangramento."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **INR de 11,4** (o alvo da fibrilação atrial é de **2,0 a 3,0**), **sem sangramento**, paciente hemodinamicamente estável e **interação medicamentosa** provável (a azitromicina potencializa a varfarina). Pela diretriz do ACCP, a conduta depende do INR e do sangramento: em **INR entre 4,5 e 10 sem sangramento**, **não se usa vitamina K de rotina** (suspende-se uma ou duas doses e monitora-se o INR); em **INR acima de 10 sem sangramento**, como neste caso, sugere-se **vitamina K oral em dose baixa** (cerca de 2,5 mg), que reduz o INR em 24 horas sem tornar o paciente refratário à nova anticoagulação, além de suspender a varfarina e repetir o INR no dia seguinte. O plasma e o complexo protrombínico ficam para o sangramento grave. A está errada porque o plasma fresco tem risco de sobrecarga de volume e de reação transfusional, e não se indica sem sangramento. C está errada porque o complexo protrombínico é reservado à hemorragia que ameaça a vida, e custa caro e causa trombose. D está errada porque manter a dose com INR de 11,4 expõe a hemorragia grave, e o risco aumenta com a idade.",
  explicacoesAlternativas:{},
  referencias:"Holbrook A et al. Evidence-based management of anticoagulant therapy: Antithrombotic Therapy and Prevention of Thrombosis, 9ª ed.: ACCP Evidence-Based Clinical Practice Guidelines. Chest 2012;141(Suppl 2):e152S-84S. Texto oficial não aberto (rede bloqueada); a conduta para INR entre 4,5 e 10 foi interpretada de memória.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q86 da UNIFESP 2022
{
  id:"q-adap22-086", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-pneumo", assuntoId:"ass-asma",
  enunciado:"Mulher, 30 anos, com asma, usa budesonida 200 mcg duas vezes ao dia, com técnica inalatória adequada e adesão confirmada, e salbutamol de resgate. Nas últimas 6 semanas, tem sintomas diurnos em 4 dias por semana, acorda duas vezes por semana à noite e usa o resgate cerca de 5 vezes por semana. Espirometria com VEF1 de 78% do previsto. Sem tabagismo, sem rinite não tratada. Qual é a alteração terapêutica mais adequada, segundo a GINA?",
  alternativas:[{id:"A",texto:"Substituir por budesonida-formoterol em dose baixa, de manutenção e de resgate (MART)."},{id:"B",texto:"Manter a budesonida e acrescentar montelucaste, que é a opção preferencial de escalonamento."},{id:"C",texto:"Prescrever prednisona oral contínua em dose baixa por 6 meses, para estabilizar o quadro."},{id:"D",texto:"Trocar a budesonida por salmeterol isolado, que é broncodilatador de longa duração."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: asma **não controlada** (sintomas diurnos em mais de 2 dias por semana, despertar noturno e uso de resgate mais de 2 vezes por semana, três critérios positivos dos quatro do GINA), apesar de **corticoide inalatório em dose baixa** e **técnica e adesão adequadas**, sem comorbidade mal controlada. O passo seguinte (**passo 3**) preferencial é a **associação de corticoide inalatório com formoterol em dose baixa** usada como **manutenção e resgate (MART, terapia SMART)**, que reduz as exacerbações graves em comparação com o corticoide inalatório com SABA de resgate; o formoterol tem início rápido, o que permite usá-lo como resgate. O **trajeto 1** do GINA usa o ICS-formoterol como resgate em todos os passos. B está errada porque os antileucotrienos são menos eficazes que a associação de corticoide inalatório com LABA e não são a opção preferencial. C está errada porque o corticoide oral contínuo causa efeitos adversos graves e não é estratégia de controle. D está errada porque o LABA isolado, sem corticoide inalatório, aumenta o risco de exacerbações graves e de morte e é contraindicado na asma.",
  explicacoesAlternativas:{},
  referencias:"Global Initiative for Asthma. Global Strategy for Asthma Management and Prevention, edição de 2023 (edições posteriores não conferidas; a busca confirmou só versões de 2021 a 2023); Sociedade Brasileira de Pneumologia e Tisiologia. Diretrizes da SBPT para o manejo da asma, 2020. J Bras Pneumol 2020;46:e20190307. Textos não abertos nesta rodada. GINA 2025 existe (maio/2025; correção menor em 14/11/2025), confirmada em resumos em 29/10/2026; texto integral não aberto.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q87 da UNIFESP 2022
{
  id:"q-adap22-087", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-neuro", assuntoId:"ass-neuro-movimento",
  enunciado:"Homem, 72 anos, relata lentidão progressiva dos movimentos e tremor na mão direita em repouso, há 1 ano. Exame: tremor de repouso de 4 a 6 Hz na mão direita, bradicinesia e rigidez em roda denteada no membro superior direito, marcha com passos curtos e redução do balançar do braço direito, reflexos posturais preservados. Sem demência, hipotensão ortostática ou alucinações. Qual é a conduta farmacológica inicial mais adequada?",
  alternativas:[{id:"A",texto:"Triexifenidil, anticolinérgico preferido no idoso por controlar o tremor."},{id:"B",texto:"Amantadina isolada em dose plena, por ser o fármaco de maior eficácia sobre a bradicinesia."},{id:"C",texto:"Levodopa com inibidor da dopa-descarboxilase, iniciada em dose baixa e aumentada aos poucos."},{id:"D",texto:"Agonista dopaminérgico em dose alta, como primeira escolha por evitar discinesias."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **tremor de repouso unilateral**, **bradicinesia**, **rigidez em roda denteada** e **marcha de passos curtos** em homem de 72 anos, com **reflexos posturais preservados** (estágio 1 de Hoehn e Yahr: doença unilateral): doença de Parkinson. A **levodopa associada a inibidor da dopa-descarboxilase** (benserazida ou carbidopa) é o fármaco de **maior eficácia** sobre os sintomas motores e de melhor tolerabilidade; em **idosos** (a partir de 65 a 70 anos) ou com prejuízo funcional, é a **primeira escolha**, iniciada em dose baixa e aumentada gradualmente. Os agonistas dopaminérgicos ficam para os pacientes mais jovens, quando se busca atrasar as discinesias, mas causam sonolência, alucinações e transtorno do controle de impulsos. A está errada porque os anticolinérgicos pioram a cognição, a retenção urinária e o delirium no idoso, e são evitados nesta idade. B está errada porque a amantadina tem eficácia modesta e é opção para discinesias, não de primeira linha isolada. D está errada porque os agonistas em dose alta no idoso causam efeitos neuropsiquiátricos e hipotensão, e não são a primeira escolha.",
  explicacoesAlternativas:{},
  referencias:"Fox SH et al. International Parkinson and Movement Disorder Society evidence-based medicine review: update on treatments for the motor symptoms of Parkinson's disease. Mov Disord 2018;33:1248-66; Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas da Doença de Parkinson (a edição de 2025 existe: Portaria Conjunta SAES/SECTICS nº 16, de 01/08/2025, segundo fonte secundária em 29/10/2026; conteúdo clínico não aberto). Textos não abertos nesta rodada.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q88 da UNIFESP 2022
{
  id:"q-adap22-088", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-hemato", assuntoId:"ass-hemato-anemias",
  enunciado:"Homem, 66 anos, vegetariano há muitos anos, queixa-se de cansaço, língua dolorida e formigamento nos pés há 6 meses, com dificuldade para andar no escuro. Exame: palidez, glossite com língua lisa e vermelha, redução da sensibilidade vibratória nos pés. Hemoglobina de 8,1 g/dL, VCM de 118 fL, leucócitos de 3.400/mm³, plaquetas de 110.000/mm³, DHL elevado, neutrófilos hipersegmentados no esfregaço; vitamina B12 de 90 pg/mL e anticorpos anti-fator intrínseco positivos. Qual é o tratamento mais adequado?",
  alternativas:[{id:"A",texto:"Vitamina B12 por via intramuscular em ataque e depois mensal, por toda a vida, com acompanhamento."},{id:"B",texto:"Ácido fólico 5 mg por dia isolado, que corrige a anemia e também as alterações neurológicas."},{id:"C",texto:"Sulfato ferroso oral por 3 meses, para corrigir a anemia e a glossite associadas."},{id:"D",texto:"Transfusão de concentrado de hemácias seguida de alta, sem reposição vitamínica específica."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **anemia macrocítica** (**VCM de 118 fL**; o normal é de 80 a 100 fL), com **pancitopenia leve**, **DHL elevado**, **neutrófilos hipersegmentados**, **glossite** e **sinais neurológicos** (parestesias, redução da sensibilidade vibratória): deficiência de **vitamina B12** (**90 pg/mL**; o normal é acima de 200 a 300 pg/mL), em paciente com **anticorpos anti-fator intrínseco positivos**, ou seja, **anemia perniciosa**. O tratamento é a **reposição de vitamina B12 por via intramuscular** (cianocobalamina 1.000 mcg em esquema de ataque, em dias alternados ou diários por 1 a 2 semanas, depois semanal e então **mensal por toda a vida**, já que a causa é a falta de absorção), com resposta reticulocitária em 5 a 7 dias; também se pode usar B12 oral em dose alta (1.000 a 2.000 mcg por dia). Como há risco de hipocalemia no início, monitora-se o potássio; e como há risco de câncer gástrico, a endoscopia pode ser considerada. B está errada porque o ácido fólico isolado corrige a anemia, mas não as alterações neurológicas, que podem piorar. C está errada porque a anemia é macrocítica, e não há deficiência de ferro demonstrada. D está errada porque a transfusão é para anemia grave e instável, e não trata a causa.",
  explicacoesAlternativas:{},
  referencias:"Stabler SP. Vitamin B12 deficiency. N Engl J Med 2013;368:149-60; Hunt A et al. Pernicious anaemia: BMJ 2014;349:g5226. Textos não abertos nesta rodada; esquemas de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q89 da UNIFESP 2022
{
  id:"q-adap22-089", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-geriatria", assuntoId:"ass-geriatria-polifarmacia",
  enunciado:"Mulher, 82 anos, mora com a filha, tem hipertensão e osteoporose e usa diazepam 10 mg à noite há 6 anos, para insônia. Teve duas quedas no último ano, sem fratura. Mini Exame do Estado Mental de 24 pontos. A filha pergunta o que fazer. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Suspender o diazepam hoje, sem substituto, pois o idoso se adapta rapidamente à falta do fármaco."},{id:"B",texto:"Reduzir a dose de forma gradual (10% a 25% a cada 2 semanas), com higiene do sono e TCC."},{id:"C",texto:"Trocar o diazepam por zolpidem, que é um hipnótico seguro no idoso e não causa quedas."},{id:"D",texto:"Manter o diazepam, pois a tolerância de seis anos mostra que o organismo já se adaptou ao fármaco."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **82 anos**, **diazepam por 6 anos**, **duas quedas** e **cognição limítrofe** (Mini Exame do Estado Mental de 24 pontos). Os **critérios de Beers (AGS 2023)** recomendam **evitar benzodiazepínicos** e hipnóticos não benzodiazepínicos em idosos, pelo risco de **quedas, fraturas, delirium e prejuízo cognitivo**, e em quem usa há muito tempo a conduta é a **desprescrição gradual**: redução de **10% a 25% da dose a cada 2 semanas** (ou mais lenta), com apoio de **higiene do sono** e **terapia cognitivo-comportamental para insônia**, que mantém o efeito depois da retirada. A suspensão abrupta pode causar abstinência (insônia de rebote, ansiedade, convulsão). A está errada porque a retirada súbita, depois de 6 anos de uso, é perigosa. C está errada porque o zolpidem também consta nos critérios de Beers, com risco semelhante de quedas, fraturas e delirium. D está errada porque a tolerância e a dependência são razões para retirar o fármaco, e não para mantê-lo, e as quedas e a cognição reduzida mostram o dano.",
  explicacoesAlternativas:{},
  referencias:"2023 American Geriatrics Society Beers Criteria Update Expert Panel. American Geriatrics Society 2023 updated AGS Beers Criteria for potentially inappropriate medication use in older adults. J Am Geriatr Soc 2023;71:2052-81; Pottie K et al. Deprescribing benzodiazepine receptor agonists: evidence-based clinical practice guideline. Can Fam Physician 2018;64:339-51. Confirmado só em resumos obtidos pela busca.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q90 da UNIFESP 2022
{
  id:"q-adap22-090", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-cardio", assuntoId:"ass-has",
  enunciado:"Homem, 64 anos, hipertenso sem tratamento regular, é levado ao pronto-socorro com dispneia intensa há 2 horas. Exame: PA de 230 x 130 mmHg, FC de 112 bpm, FR de 32 irpm, SpO2 de 86% em ar ambiente, sudorese, estertores crepitantes até os ápices pulmonares, B3 à ausculta. O eletrocardiograma mostra sobrecarga ventricular esquerda sem supradesnivelamento do ST. Radiografia com congestão pulmonar bilateral. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Captopril sublingual e liberação para casa com retorno em 24 horas."},{id:"B",texto:"Nitroprussiato de sódio associado a betabloqueador venoso, para reduzir a pressão e a frequência."},{id:"C",texto:"Nitroglicerina venosa e furosemida, com oxigênio ou ventilação não invasiva, em unidade monitorizada."},{id:"D",texto:"Hidralazina intramuscular e repouso, pois a elevação da pressão é a causa do quadro."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **PA de 230 x 130 mmHg** com **lesão aguda de órgão-alvo**: **edema agudo de pulmão** (dispneia, **SpO2 de 86%**, estertores até os ápices, B3 e congestão na radiografia). Isso é **emergência hipertensiva**, e não urgência: exige redução **imediata** da pressão, com fármaco venoso, em ambiente monitorizado. Na emergência hipertensiva com edema agudo de pulmão, o tratamento é **nitroglicerina venosa** (vasodilatador venoso que reduz a pré-carga e a pós-carga), **diurético de alça** (furosemida), **oxigênio** e, se necessário, **ventilação não invasiva**, com redução da pressão arterial média de **até 25% na primeira hora**, para evitar hipoperfusão. A urgência hipertensiva, sem lesão aguda de órgão-alvo, trata-se com fármaco oral e ajuste do tratamento, sem queda abrupta. A está errada porque este é um quadro de emergência, com risco de morte, e o paciente não pode ser liberado; o captopril sublingual também reduz a pressão de modo imprevisível. B está errada porque o betabloqueador é contraindicado no edema agudo de pulmão com congestão (reduz o inotropismo), e o nitroprussiato não é a primeira escolha aqui. D está errada porque a hidralazina intramuscular tem efeito imprevisível, causa taquicardia e hipotensão, e não trata a congestão.",
  explicacoesAlternativas:{},
  referencias:"Barroso WKS et al. Diretrizes Brasileiras de Hipertensão Arterial – 2020. Arq Bras Cardiol 2021;116:516-658 (a edição 2025 da SBC existe; em 29/10/2026, resumos de fontes secundárias não indicaram mudança da conduta desta questão, mas a classificação por estágios, as metas (<130/80 mmHg na nova diretriz) e a definição de crise citadas na explicação devem ser conferidas no texto de 2025.. Texto oficial não aberto (rede bloqueada); esquemas e metas de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q91 da UNIFESP 2022
{
  id:"q-adap22-091", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-pneumo", assuntoId:"ass-pneumonia",
  enunciado:"Homem, 70 anos, hipertenso, internado com pneumonia adquirida na comunidade não grave, trata-se com ceftriaxona e azitromicina. No 3º dia de tratamento, está afebril desde o início do tratamento, ou seja, há mais de 48 horas, com FC de 88 bpm, FR de 18 irpm, PA de 132 x 78 mmHg, SpO2 de 95% em ar ambiente, alimentando-se e lúcido. A cultura de escarro isolou Streptococcus pneumoniae sensível. Qual é a conduta mais adequada em relação à duração do antibiótico?",
  alternativas:[{id:"A",texto:"Completar 14 dias de antibiótico, como em toda pneumonia em paciente idoso internado."},{id:"B",texto:"Completar 10 dias, pois é a duração padrão para qualquer pneumonia comunitária bacteriana."},{id:"C",texto:"Manter o antibiótico até a normalização completa da radiografia de tórax, em 4 a 6 semanas."},{id:"D",texto:"Completar 5 dias no total, pois já atingiu a estabilidade clínica."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: no 3º dia, o paciente está **afebril há mais de 48 horas**, com **FC de 88 bpm** (abaixo de 100), **FR de 18 irpm** (abaixo de 24), **PA sistólica de 132 mmHg** (90 ou mais), **SpO2 de 95%** (90% ou mais), alimentando-se e **lúcido**: preenche todos os **critérios de estabilidade clínica**. A diretriz da ATS/IDSA (2019) recomenda que o tratamento da pneumonia comunitária dure **no mínimo 5 dias** e que só seja suspenso quando o paciente alcança **estabilidade clínica**; como ele já está estável, completar **5 dias no total** é suficiente. Cursos mais longos não melhoram o desfecho e aumentam efeitos adversos, resistência e custo. A está errada porque 14 dias é reservado a situações específicas (como bacteriemia por S. aureus ou patógenos atípicos), e não à pneumonia comunitária comum. B está errada porque 10 dias eram o padrão antigo e não são necessários quando há estabilidade clínica. C está errada porque a radiografia demora semanas para normalizar e não serve de critério para suspender o antibiótico.",
  explicacoesAlternativas:{},
  referencias:"Metlay JP et al. Diagnosis and Treatment of Adults with Community-acquired Pneumonia: An Official Clinical Practice Guideline of the American Thoracic Society and Infectious Diseases Society of America. Am J Respir Crit Care Med 2019;200:e45-e67; a atualização de 2025 da ATS existe e, segundo resumos de fontes secundárias em 29/10/2026, sugere 5 dias ou mais de antibiótico na pneumonia grave e duração menor, mínimo de 3 dias, no ambulatório com estabilidade clínica, sem mudar a conduta desta questão; a IDSA não endossou a atualização. Textos não abertos nesta rodada.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q92 da UNIFESP 2022
{
  id:"q-adap22-092", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-alergiaimuno", assuntoId:"ass-alergia-anafilaxia",
  enunciado:"Mulher, 24 anos, é atendida no pronto-socorro por anafilaxia desencadeada por amendoim (urticária generalizada, angioedema de lábios, sibilos e PA de 80 x 50 mmHg), tratada com adrenalina intramuscular, com resolução completa dos sintomas em 20 minutos. Está estável há 5 horas de observação, sem sintomas e sem nova dose de adrenalina. Mora a 40 minutos do hospital. Qual é a conduta mais adequada na alta?",
  alternativas:[{id:"A",texto:"Adrenalina autoinjetável, treino de uso, plano de ação escrito, evitar o alérgeno e alergologista."},{id:"B",texto:"Liberar com anti-histamínico oral por 5 dias, que previne a recorrência da reação."},{id:"C",texto:"Liberar sem observação adicional e sem prescrições, pois os sintomas cederam por completo."},{id:"D",texto:"Prescrever prednisona oral por 5 dias, que evita a reação bifásica com segurança."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **anafilaxia por alérgeno alimentar** (amendoim) com **comprometimento cutâneo, respiratório e cardiovascular** (hipotensão), tratada com **adrenalina intramuscular** e **observação de 5 horas** sem recorrência. Os critérios para anafilaxia (NIAID/FAAN) incluem início agudo com acometimento de pele e mucosas e comprometimento respiratório ou queda da pressão. Na alta, as medidas essenciais são: **receita de adrenalina autoinjetável** (duas unidades, com treino de uso), **plano de ação escrito** com os sinais de alarme e quando usar, **orientação para evitar o alérgeno** e ler rótulos, **encaminhamento ao alergologista** para confirmar o alérgeno e discutir imunoterapia, e identificação (pulseira). A observação de **4 a 6 horas** é prática comum para reações moderadas a graves (reações muito graves ou com mais de uma dose de adrenalina podem pedir mais tempo, conforme o serviço), pelo risco de reação bifásica (cerca de 5%). B está errada porque anti-histamínicos tratam a urticária, mas não previnem recorrência de anafilaxia e não substituem a adrenalina. C está errada porque a alta sem plano de ação e sem adrenalina exige preparo, e a paciente mora longe; sem isso, ela fica exposta a nova reação. D está errada porque os corticoides não previnem de forma comprovada a reação bifásica e não são rotina na alta.",
  explicacoesAlternativas:{},
  referencias:"Shaker MS et al. Anaphylaxis — a 2020 practice parameter update, systematic review, and Grading of Recommendations, Assessment, Development and Evaluation (GRADE) analysis. J Allergy Clin Immunol 2020;145:1082-123; Sampson HA et al. Second symposium on the definition and management of anaphylaxis (NIAID/FAAN). J Allergy Clin Immunol 2006;117:391-7. Textos não abertos nesta rodada.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q93 da UNIFESP 2022
{
  id:"q-adap22-093", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-nefro", assuntoId:"ass-nefro-glomerulopatias",
  enunciado:"Homem, 56 anos, queixa-se de edema de membros inferiores e espuma na urina há 2 meses. PA de 138 x 84 mmHg. Exames: albumina sérica de 2,1 g/dL, colesterol total de 340 mg/dL, creatinina de 1,0 mg/dL, proteinúria de 24 horas de 7,8 g, urina sem hemácias dismórficas, complemento normal e anti-HIV, anti-HCV e HBsAg negativos. O anticorpo anti-receptor de fosfolipase A2 (anti-PLA2R) é positivo em título alto. Qual é a interpretação e a conduta mais adequadas?",
  alternativas:[{id:"A",texto:"Biópsia renal obrigatória e imediata em todos os casos, pois nenhum exame de sangue substitui a histologia."},{id:"B",texto:"Nefrite lúpica classe V, que exige pulsoterapia com metilprednisolona antes de qualquer outro exame."},{id:"C",texto:"Doença de lesões mínimas do adulto, tratada com prednisona e sem outras investigações."},{id:"D",texto:"Nefropatia membranosa primária; o anti-PLA2R positivo dispensa a biópsia em muitos casos."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: **síndrome nefrótica** (proteinúria de 7,8 g/24 horas, acima de 3,5 g; **albumina de 2,1 g/dL**, abaixo de 3,0; edema e **colesterol de 340 mg/dL**) com **função renal normal**, **sem hematúria dismórfica**, **complemento normal**, **sorologias virais negativas** e **anti-PLA2R positivo em título alto**: nefropatia membranosa primária. Em adulto com síndrome nefrótica, **anti-PLA2R positivo** (sensibilidade de cerca de 70% e especificidade acima de 95%) e sem causa secundária, a diretriz KDIGO 2021 admite o diagnóstico **sem biópsia**; o tratamento de suporte inclui **bloqueio do sistema renina-angiotensina**, diurético, estatina e anticoagulação se a albumina for muito baixa (abaixo de 2,0 a 2,5 g/dL), e o imunossupressor (rituximabe, ciclofosfamida com corticoide ou inibidor de calcineurina) é decidido pelo risco de progressão; faz-se **rastreio de neoplasia** conforme a idade (cerca de 10% a 20% das nefropatias membranosas em maiores de 60 anos são secundárias a câncer). A está errada porque, com anti-PLA2R positivo, a biópsia não é obrigatória; ela fica para casos duvidosos, anti-PLA2R negativo, ou piora atípica. B está errada porque a nefrite lúpica teria complemento baixo, anticorpos e outras manifestações, e o anti-PLA2R é específico da membranosa primária. C está errada porque a doença de lesões mínimas no adulto é diagnosticada pela biópsia e não se associa ao anti-PLA2R.",
  explicacoesAlternativas:{},
  referencias:"Kidney Disease: Improving Global Outcomes (KDIGO) Glomerular Diseases Work Group. KDIGO 2021 Clinical Practice Guideline for the Management of Glomerular Diseases. Kidney Int 2021;100(4S):S1-S276. Texto oficial não aberto (rede bloqueada); sensibilidade e especificidade de memória. O KDIGO atualiza a diretriz de doenças glomerulares de 2021 por capítulos (IgA e vasculite IgA, síndrome nefrótica pediátrica 2025), segundo fontes secundárias em 29/10/2026; não localizei atualização do capítulo de nefropatia membranosa.",
  dificuldadeManual:"avancado", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q94 da UNIFESP 2022
{
  id:"q-adap22-094", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-nefro", assuntoId:"ass-ira",
  enunciado:"Mulher, 72 anos, diabética e hipertensa, com doença renal crônica (creatinina de 1,8 mg/dL e taxa de filtração glomerular estimada de 29 mL/min/1,73 m²), usa ibuprofeno para dor lombar. Será submetida a uma coronariografia eletiva em 5 dias, por angina estável. Qual é a medida mais adequada para reduzir o risco de lesão renal pelo contraste?",
  alternativas:[{id:"A",texto:"Furosemida profilática antes do procedimento, para forçar a diurese e eliminar o contraste."},{id:"B",texto:"Hidratação com salina isotônica, suspender o anti-inflamatório e usar menos contraste."},{id:"C",texto:"N-acetilcisteína oral isolada, que dispensa a hidratação por proteger o rim."},{id:"D",texto:"Manitol venoso antes do exame, o que reduz a toxicidade do contraste."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **doença renal crônica avançada** (taxa de filtração glomerular de 29 mL/min/1,73 m², categoria G4), **diabetes**, **idade de 72 anos** e uso de **anti-inflamatório não esteroide**: ela tem risco alto de **nefropatia induzida por contraste**, definida como aumento da creatinina de 0,3 mg/dL ou mais em 48 horas, ou de 1,5 vez a basal em 7 dias (critérios do KDIGO para lesão renal aguda: estágio 1 com aumento de 0,3 mg/dL ou 1,5 a 1,9 vez; estágio 2 com 2,0 a 2,9 vezes; estágio 3 com 3,0 vezes ou mais, ou terapia renal substitutiva). A prevenção eficaz é: **expansão volêmica com solução salina isotônica** antes e depois do procedimento, **suspensão dos nefrotóxicos** (anti-inflamatório não esteroide, aminoglicosídeos), **menor volume de contraste** de baixa ou iso-osmolaridade, e considerar métodos de imagem que dispensem contraste. A está errada porque a furosemida profilática não protege o rim e pode causar hipovolemia, aumentando o risco. C está errada porque a N-acetilcisteína não tem benefício comprovado e jamais substitui a hidratação. D está errada porque o manitol não reduz a lesão renal por contraste e pode piorá-la.",
  explicacoesAlternativas:{},
  referencias:"Kidney Disease: Improving Global Outcomes (KDIGO) Acute Kidney Injury Work Group. KDIGO Clinical Practice Guideline for Acute Kidney Injury. Kidney Int Suppl 2012;2:1-138; American College of Radiology. ACR Manual on Contrast Media (edição vigente não conferida). Textos não abertos nesta rodada. A revisão KDIGO 2026 de lesão e doença renal aguda estava em consulta pública até maio de 2026, e a versão final não foi localizada em 29/10/2026.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q95 da UNIFESP 2022
{
  id:"q-adap22-095", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-geriatria", assuntoId:"ass-geriatria-demencia",
  enunciado:"Mulher, 78 anos, viúva, vem com a filha à consulta por esquecimentos progressivos há 2 anos: repete perguntas, perde objetos e esqueceu o caminho de volta do mercado. Ainda cuida da casa com ajuda. Exame: Mini Exame do Estado Mental de 20 pontos, sem déficits focais. TSH, vitamina B12, hemograma, sódio, cálcio, glicemia e sorologia para sífilis normais; tomografia de crânio com atrofia temporal mesial e sem lesões vasculares. Qual é a conduta farmacológica inicial mais adequada?",
  alternativas:[{id:"A",texto:"Memantina isolada em dose plena, que é o fármaco indicado para a doença leve a moderada."},{id:"B",texto:"Haloperidol em dose baixa, para melhorar a memória e a cognição na fase inicial."},{id:"C",texto:"Donepezila, inibidor de colinesterase, iniciada com 5 mg e aumentada para 10 mg em 4-6 semanas."},{id:"D",texto:"Vitamina E em altas doses, que retarda a progressão da doença em todos os pacientes."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **declínio progressivo da memória em 2 anos**, **repetição de perguntas e desorientação espacial**, **perda funcional parcial** (instrumental), **Mini Exame do Estado Mental de 20 pontos** (o declínio cognitivo leve a moderado corresponde a 10 a 24 pontos), **exames de causas reversíveis normais** e **atrofia temporal mesial** sem lesão vascular: doença de Alzheimer provável, de estágio leve a moderado. O tratamento sintomático de primeira linha são os **inibidores da colinesterase** (**donepezila**, rivastigmina ou galantamina), com a donepezila iniciada em **5 mg** à noite e aumentada para **10 mg** após 4 a 6 semanas, se tolerada; o benefício é modesto, na cognição e na funcionalidade, e é preciso monitorar bradicardia, síncope e efeitos digestivos. A memantina fica para a fase moderada a grave, isoladamente ou em associação. A está errada porque a memantina isolada é a opção para fases moderada a grave, e o inibidor da colinesterase é o de escolha na fase leve a moderada. B está errada porque o haloperidol piora a cognição, aumenta a mortalidade em idosos com demência e é reservado a agitação grave sem outra opção. D está errada porque a vitamina E não demonstrou benefício consistente para a progressão e tem risco em doses altas.",
  explicacoesAlternativas:{},
  referencias:"Brasil. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas da Doença de Alzheimer (edição vigente não conferida); Livingston G et al. Dementia prevention, intervention, and care: 2020 report of the Lancet Commission. Lancet 2020;396:413-46. Textos não abertos nesta rodada.",
  dificuldadeManual:"fundamental", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q96 da UNIFESP 2022
{
  id:"q-adap22-096", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-oftalmo", assuntoId:"ass-oft-glaucoma",
  enunciado:"Lactente de 3 meses, sexo masculino, é levado ao oftalmologista porque, desde as primeiras semanas de vida, apresenta lacrimejamento excessivo, fotofobia intensa, piscar forçado (blefarospasmo) e olhos «grandes». Exame: córnea esbranquiçada e aumentada de diâmetro (13 mm) à direita, com estrias na membrana de Descemet; pressão intraocular de 32 mmHg à direita, sob sedação. Sem infecção. Qual é a conduta de tratamento mais adequada?",
  alternativas:[{id:"A",texto:"Colírio de pilocarpina a 2% quatro vezes ao dia, que reduz a pressão ao abrir o ângulo."},{id:"B",texto:"Timolol colírio em dose pediátrica, isoladamente, com seguimento a cada 6 meses."},{id:"C",texto:"Cirurgia do ângulo camerular (goniotomia ou trabeculotomia)."},{id:"D",texto:"Observação até os 2 anos, para operar quando o olho estiver maior e a córnea mais clara."}],
  gabarito:"C",
  explicacaoGeral:"A alternativa C está correta. Dicas do enunciado: **lactente de 3 meses** com a tríade de **epífora, fotofobia e blefarospasmo**, **córnea aumentada de diâmetro** (13 mm; o normal ao nascer é de cerca de 10 mm e, no adulto, de 11 mm) e **turva**, com **estrias de Descemet (estrias de Haab)** e **pressão intraocular de 32 mmHg** (o normal é de 10 a 21 mmHg): glaucoma congênito primário, por mau desenvolvimento do ângulo camerular. O tratamento é **cirúrgico** e precoce: **goniotomia** (se a córnea estiver clara) ou **trabeculotomia** (se estiver turva), que abre o ângulo para a drenagem do humor aquoso; os colírios são adjuvantes ou ponte, e o acompanhamento é por toda a vida (amblíopia, miopia). O atraso leva a cegueira irreversível. A está errada porque a pilocarpina não funciona no glaucoma congênito, no qual o ângulo é malformado, e pode paradoxalmente piorar o quadro. B está errada porque os colírios, sozinhos, não controlam a pressão no glaucoma congênito e o tratamento é cirúrgico. D está errada porque esperar até os 2 anos permite a lesão do nervo óptico e da córnea, com perda visual definitiva.",
  explicacoesAlternativas:{},
  referencias:"Weinreb RN, Grajewski A, Papadopoulos M, Grigg J, Freedman S, eds. Childhood Glaucoma: The 9th Consensus Report of the World Glaucoma Association. Amsterdam: Kugler Publications, 2013; Allingham RR et al. Shields' Textbook of Glaucoma, 6ª ed. Lippincott Williams & Wilkins, 2011. Textos não abertos nesta rodada; conduta de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q97 da UNIFESP 2022
{
  id:"q-adap22-097", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-infecto", assuntoId:"ass-infecto-covid",
  enunciado:"Homem, 62 anos, hipertenso e obeso, chega ao pronto-socorro no 7º dia de febre, tosse seca e dispneia progressiva, com RT-PCR para SARS-CoV-2 positivo. Exame: FR de 28 irpm, SpO2 de 88% em ar ambiente, FC de 98 bpm, PA de 134 x 80 mmHg; estertores bilaterais. A tomografia mostra opacidades em vidro fosco bilaterais com acometimento de 40% do parênquima. Sem sinais de infecção bacteriana (procalcitonina baixa). Qual é a conduta terapêutica mais adequada?",
  alternativas:[{id:"A",texto:"Ivermectina por 3 dias e hidroxicloroquina, que reduzem a mortalidade na fase inflamatória da doença."},{id:"B",texto:"Azitromicina e hidroxicloroquina por 5 dias, conforme o kit usado na fase inicial da doença."},{id:"C",texto:"Antibiótico de amplo espectro por 10 dias e metilprednisolona em pulso, sem oxigênio, por coinfecção."},{id:"D",texto:"Oxigênio e dexametasona 6 mg ao dia por até 10 dias, com profilaxia de tromboembolismo venoso."}],
  gabarito:"D",
  explicacaoGeral:"A alternativa D está correta. Dicas do enunciado: covid-19 no **7º dia de sintomas**, **hipoxemia** (**SpO2 de 88%**), **taquipneia** (FR de 28 irpm), acometimento de **40% do parênquima** na tomografia e **ausência de coinfecção bacteriana** (procalcitonina baixa): doença **grave**, na fase inflamatória, que requer oxigênio. O ensaio RECOVERY demonstrou que a **dexametasona 6 mg ao dia por até 10 dias** reduz a mortalidade em pacientes que usam **oxigênio** ou ventilação mecânica (cerca de um terço em ventilados e um quinto nos que usam oxigênio), sem benefício e com possível dano em quem não precisa de oxigênio. Associam-se **oxigênio suplementar** (alvo de SpO2 de 92% a 96%), **profilaxia de tromboembolismo venoso** (heparina) e, conforme o caso, tocilizumabe ou baricitinibe em quem progride, sem antibiótico se não há coinfecção. A está errada porque a ivermectina e a hidroxicloroquina não reduziram mortalidade nem internação em ensaios clínicos. B está errada porque o kit de hidroxicloroquina e azitromicina não tem benefício e a azitromicina não é indicada sem coinfecção. C está errada porque antibiótico sem evidência de infecção não tem indicação, e a metilprednisolona em pulso de 1 g por 3 dias não faz parte do tratamento padrão e aumenta o risco de infecção.",
  explicacoesAlternativas:{},
  referencias:"RECOVERY Collaborative Group. Dexamethasone in hospitalized patients with Covid-19. N Engl J Med 2021;384:693-704; World Health Organization. Therapeutics and COVID-19: living guideline (edição vigente não conferida). Textos não abertos nesta rodada; percentuais de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q98 da UNIFESP 2022
{
  id:"q-adap22-098", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-infecto", assuntoId:"ass-sepse",
  enunciado:"Homem, 68 anos, diabético, em choque séptico há 6 horas, por diverticulite complicada com abscesso pélvico de 8 cm identificado em tomografia. Recebeu cristaloide, noradrenalina e já está em uso de piperacilina-tazobactam desde a primeira hora. Mantém lactato de 5,1 mmol/L e PAM de 62 mmHg com noradrenalina em dose crescente. Qual é a medida adicional que mais pode mudar o desfecho?",
  alternativas:[{id:"A",texto:"Manter o mesmo antibiótico por 72 horas antes de qualquer decisão sobre o abscesso, aguardando a resposta."},{id:"B",texto:"Controle do foco por drenagem percutânea ou cirúrgica do abscesso o mais cedo possível, idealmente em até 6 horas."},{id:"C",texto:"Ampliar a cobertura com carbapenêmico e antifúngico, sem abordar o abscesso, pois a falha é microbiológica."},{id:"D",texto:"Hidrocortisona em dose alta em todos os casos de sepse, antes de qualquer procedimento invasivo."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **choque séptico** (necessidade de vasopressor para PAM de 65 mmHg ou mais **e lactato acima de 2 mmol/L** após reposição volêmica, critérios do Sepsis-3), **foco abdominal identificado** (abscesso pélvico de **8 cm**), antibiótico adequado e precoce já iniciado e **piora persistente** apesar dele. O antibiótico não atinge concentração eficaz dentro de uma coleção volumosa; sem **controle do foco** (drenagem percutânea guiada por imagem ou cirúrgica, conforme a anatomia e a estabilidade), o choque não se resolve. A campanha Surviving Sepsis recomenda o controle do foco **o mais cedo possível**: a edição de 2026 (vista só em resumos) sugere **idealmente em até 6 horas** do diagnóstico, e a de 2021 dava 6 a 12 horas, usando o método menos invasivo eficaz. A está errada porque aguardar 72 horas sem drenar o abscesso permite a evolução do choque, com falência de órgãos. C está errada porque ampliar o espectro sem tratar o abscesso não resolve a falha, que é de penetração do antibiótico e de carga bacteriana. D está errada porque a hidrocortisona é considerada em choque refratário a vasopressor (dose de 200 mg por dia), mas não substitui o controle do foco e não se usa em todos os casos de sepse.",
  explicacoesAlternativas:{},
  referencias:"Evans L et al. Surviving Sepsis Campaign: international guidelines for management of sepsis and septic shock 2021. Intensive Care Med 2021;47:1181-247; edição de 2026 confirmada no PubMed em 29/10/2026 (Intensive Care Med 2026;52:863-936, doi 10.1007/s00134-026-08361-1); texto das recomendações não aberto. Singer M et al. Sepsis-3. JAMA 2016;315:801-10. Textos não abertos nesta rodada.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q99 da UNIFESP 2022
{
  id:"q-adap22-099", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-psiquiatria", assuntoId:"ass-psiq-psicoses",
  enunciado:"Homem, 22 anos, com diagnóstico de primeiro episódio de esquizofrenia há 1 semana: 7 meses de isolamento, delírio persecutório, alucinações auditivas que comentam seus atos e discurso desorganizado. Exames laboratoriais, ressonância e triagem toxicológica normais. Sem antecedentes de uso de antipsicóticos, IMC de 23 kg/m², sem diabetes ou cardiopatia. Aceita tratamento. Qual é a conduta farmacológica inicial mais adequada?",
  alternativas:[{id:"A",texto:"Haloperidol em dose alta crônica, associado a anticolinérgico contínuo, como esquema padrão do primeiro episódio."},{id:"B",texto:"Antipsicótico atípico em dose baixa a moderada (por exemplo, risperidona), com psicoeducação e reavaliação em 2 a 4 semanas."},{id:"C",texto:"Clozapina desde o início, por ser o antipsicótico de maior eficácia para o primeiro episódio psicótico."},{id:"D",texto:"Benzodiazepínico isolado por 3 meses, que trata o delírio e as alucinações sem os efeitos de antipsicóticos."}],
  gabarito:"B",
  explicacaoGeral:"A alternativa B está correta. Dicas do enunciado: **primeiro episódio de esquizofrenia** (mais de 6 meses de sintomas, com **delírio persecutório**, **alucinações auditivas comentando os atos** e **desorganização**), **sem causa orgânica ou tóxica**, sem uso prévio de antipsicótico e sem fatores metabólicos de risco. A primeira escolha é um **antipsicótico de segunda geração** em **dose baixa a moderada** (por exemplo, risperidona 2 a 4 mg por dia, olanzapina ou aripiprazol), escolhido pelo perfil de efeitos adversos, com **psicoeducação**, abordagem familiar e psicossocial e **reavaliação em 2 a 4 semanas**: sem resposta adequada, trocam-se para outro antipsicótico depois de uma tentativa adequada, e a **clozapina** é reservada à esquizofrenia **resistente** (falha de dois antipsicóticos em dose e tempo adequados). O tratamento deve ser mantido por pelo menos 1 a 2 anos depois do primeiro episódio. A está errada porque doses altas de haloperidol causam sintomas extrapiramidais e abandono, e o anticolinérgico contínuo não é rotina. C está errada porque a clozapina tem risco de agranulocitose e miocardite e fica para a resistência ao tratamento. D está errada porque o benzodiazepínico alivia a agitação, mas não trata a psicose, que continua se agravando.",
  explicacoesAlternativas:{},
  referencias:"Keepers GA et al. The American Psychiatric Association Practice Guideline for the Treatment of Patients With Schizophrenia. Am J Psychiatry 2020;177:868-72; National Institute for Health and Care Excellence. Psychosis and schizophrenia in adults: prevention and management (CG178), 2014 (atualização posterior não conferida). Textos não abertos nesta rodada.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
// adaptada da estrutura da Q100 da UNIFESP 2022
{
  id:"q-adap22-100", banca:"Esc — Banco Didático", real:false, ano:2027,
  justificativaEm:"2026-10",
  areaId:"area-cm", especialidadeId:"esp-psiquiatria", assuntoId:"ass-psiq-substancias",
  enunciado:"Homem, 48 anos, etilista pesado, é internado por fratura de tíbia. Parou de beber com a internação; 36 horas depois, está ansioso, com tremor de mãos, sudorese, náuseas, FC de 112 bpm, PA de 162 x 98 mmHg e alucinações visuais com insetos, mas orientado e sem febre. A pontuação na escala de abstinência de álcool CIWA-Ar é de 24. Função hepática normal, glicemia de 98 mg/dL. Qual é a conduta mais adequada?",
  alternativas:[{id:"A",texto:"Benzodiazepínico guiado pelos sintomas, com tiamina antes da glicose."},{id:"B",texto:"Haloperidol isolado, em dose alta, para tratar as alucinações e a agitação."},{id:"C",texto:"Carbamazepina em dose de ataque como único tratamento, dispensando benzodiazepínicos."},{id:"D",texto:"Observação sem medicamentos e contenção física, pois o quadro é leve e cede em 24 horas."}],
  gabarito:"A",
  explicacaoGeral:"A alternativa A está correta. Dicas do enunciado: **etilismo pesado**, parada do álcool há **36 horas**, **tremor, sudorese, taquicardia e hipertensão**, **alucinações visuais** com orientação preservada e **pontuação de 24 na CIWA-Ar**: síndrome de abstinência alcoólica **grave** (as alucinações com orientação preservada sugerem alucinose alcoólica, mas os sinais autonômicos intensos e a pontuação alta exigem o mesmo tratamento; o delirium tremens teria desorientação) (a CIWA-Ar vai de 0 a 67; abaixo de 8 a 10 é leve, de 8 a 15 é moderada e acima de 15 é grave, com risco de convulsão e delirium tremens). O tratamento de escolha são os **benzodiazepínicos**, administrados conforme os **sintomas** (diazepam, de ação longa, ou lorazepam, preferido na doença hepática), que reduzem convulsões e delirium tremens e a mortalidade, com **tiamina** (100 mg ou mais por via venosa ou intramuscular) **antes de glicose**, para evitar a encefalopatia de Wernicke, e hidratação com correção de eletrólitos (magnésio e potássio). B está errada porque o haloperidol isolado não previne convulsão, reduz o limiar convulsivo e piora o quadro; é adjuvante no delirium, depois do benzodiazepínico. C está errada porque a carbamazepina é alternativa em quadros leves e ambulatoriais, e não substitui o benzodiazepínico no quadro grave. D está errada porque a pontuação de 24 indica quadro grave, com risco de convulsão e delirium tremens, e a contenção sem tratamento aumenta a agitação.",
  explicacoesAlternativas:{},
  referencias:"Mayo-Smith MF et al. Management of alcohol withdrawal delirium: an evidence-based practice guideline. Arch Intern Med 2004;164:1405-12; American Society of Addiction Medicine. The ASAM Clinical Practice Guideline on Alcohol Withdrawal Management. J Addict Med 2020;14(3S Suppl 1):1-72. Textos não abertos nesta rodada; pontos de corte de memória.",
  dificuldadeManual:"intermediario", status:"ativa",
  estatisticas:{respostas:0, acertos:0, distribuicaoAlternativas:{}},
  criadoPor:"seed", criadoEm:"2026-10-19"
},
]);
