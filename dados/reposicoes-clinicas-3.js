/* ==========================================================================
   REPOSIÇÕES — meningite viral (Guia de Vigilância) e trabalho de parto prematuro (NICE)
   ==========================================================================
   Versão corrigida de duas questões desatualizadas ou discutíveis: Teste de
   Progresso 2022.2 nº 28 (a glicose do líquor era incompatível com o padrão
   viral; trocada para 62 mg/dL) e Sírio-Libanês 2021 nº 74 (colo impérvio, sem
   indicação de tocolítico de imediato). As originais continuam em suas provas;
   estas são as REPOSIÇÕES (`reposicaoDe`). Conteúdo, não código.
   ========================================================================== */
window.EscDados.registrarQuestoes("reposicoes-clinicas-3", [
 {
  "id": "q-tp20222-028-ia",
  "banca": "Teste de Progresso NIEPAEM",
  "real": false,
  "ano": 2022,
  "semestre": 2,
  "tipoProva": "graduacao",
  "reposicaoDe": "q-tp20222-028",
  "areaId": "area-cm",
  "especialidadeId": "esp-infecto",
  "assuntoId": "ass-meningites",
  "enunciado": "Mulher, 26 anos, previamente hígida, foi levada ao Pronto- Socorro por quadro de dor de cabeça intensa há 4 dias, acompanhada de vômitos e febre de 38,5ºC. Exame físico: mau estado geral, desidratada, com rigidez de nuca. FC = 120bpm, T = 38,7ºC, glicemia = 92mg/dL. O líquor teve o seguinte resultado: Aspecto Citrino Volume 4mL Celularidade 439/mm³ Linfócitos 88% Neutrófilos 11% Eosinófilos 1% Proteínas 67mg/dL Glicose 62mg/dL Hemácias Ausentes O agente etiológico mais provável é:",
  "alternativas": [
   {
    "id": "A",
    "texto": "Cryptococcus neoformans"
   },
   {
    "id": "B",
    "texto": "Streptococcus pneumoniae"
   },
   {
    "id": "C",
    "texto": "Neisseria meningitidis"
   },
   {
    "id": "D",
    "texto": "Enterovirus"
   }
  ],
  "gabarito": "D",
  "explicacaoGeral": "A alternativa D está correta. Dicas do enunciado: **mulher de 26 anos, hígida, com cefaleia, vômitos, febre e rigidez de nuca; líquor citrino com 439 células/mm³ (88% de linfócitos), proteínas de 67 mg/dL e glicose de 62 mg/dL (glicemia de 92)**: **meningite de padrão viral**. Dados objetivos: o Guia de Vigilância em Saúde (6ª edição revisada, 2024) descreve na meningite viral líquor **límpido**, **glicose normal** (referência 45 a 100 mg/dL), **proteínas levemente aumentadas** (referência 15 a 50 mg/dL) e **5 a 500 linfócitos**; os **enterovírus** são os agentes mais frequentes, e as formas bacterianas cursam com **glicose diminuída**. Mecanismo: o vírus infecta as meninges sem consumir a glicose do líquor, e a resposta celular é linfocitária. Epidemiologia: a meningite viral é a mais comum entre as meningites e costuma ter evolução benigna. A (*Cryptococcus*) está errada porque ocorre em imunossuprimidos, com poucas células, e aqui a paciente é hígida. B (pneumococo) e C (meningococo) estão erradas porque a meningite bacteriana tem predomínio de neutrófilos e glicose diminuída, o que não é o caso.",
  "referencias": "Ministério da Saúde. Guia de Vigilância em Saúde, 6ª edição revisada (2024), volume 1, quadro de alterações do líquor nas meningites virais: texto lido em 03/11/2026 em bvsms.saude.gov.br. Alteração em relação à questão original: a glicose do líquor foi trocada de 26 para 62 mg/dL, valor que corresponde ao padrão viral. Conferido em 03/11/2026.",
  "dificuldadeManual": "avancado",
  "status": "ativa",
  "estatisticas": {
   "respostas": 0,
   "acertos": 0,
   "distribuicaoAlternativas": {}
  },
  "criadoPor": "seed",
  "criadoEm": "2026-11-03"
 },
 {
  "id": "q-sirio2021-074-ia",
  "banca": "Sírio-Libanês (SP)",
  "real": false,
  "ano": 2021,
  "reposicaoDe": "q-sirio2021-074",
  "areaId": "area-go",
  "especialidadeId": "esp-obstetricia",
  "assuntoId": "ass-partopretermo",
  "enunciado": "Mulher, 31 anos, gestante de 31 semanas, refere contrações uterinas regulares de forte intensidade há 2 horas, foi atendida no pronto-socorro. Exame físico: dinâmica uterina 3/10 minutos, tônus uterino normal, 148 batimentos cardíacos fetais por minuto, colo impérvio. A conduta mais adequada nesse momento, dentre as abaixo, é:",
  "alternativas": [
   {
    "id": "A",
    "texto": "Parto cesárea."
   },
   {
    "id": "B",
    "texto": "Prescrição de oxitocina."
   },
   {
    "id": "C",
    "texto": "Prescrição de progesterona via vaginal."
   },
   {
    "id": "D",
    "texto": "Cerclagem uterina imediata."
   },
   {
    "id": "E",
    "texto": "Medir o comprimento do colo por ultrassonografia transvaginal (ou fibronectina fetal) para estimar a chance de parto em 48 horas antes de decidir por tocolítico e outras medidas."
   }
  ],
  "gabarito": "E",
  "explicacaoGeral": "A alternativa E está correta. Dicas do enunciado: **31 semanas, contrações regulares (3 em 10 minutos) há 2 horas, tônus normal, BCF 148 e colo impérvio**: suspeita de trabalho de parto prematuro **sem modificação cervical**. Dados objetivos: a diretriz NICE NG25 (atualizada em junho de 2022) orienta que, em suspeita de trabalho de parto prematuro com **30+0 semanas ou mais**, se **considere a medida do colo por ultrassonografia transvaginal** (ou fibronectina fetal) para estimar a probabilidade de parto em 48 horas: com colo **> 15 mm** é improvável trabalho de parto, pensa-se em outros diagnósticos e discutem-se os riscos de ir para casa ou ficar em observação; com colo **≤ 15 mm** trata-se como trabalho de parto prematuro (tocolítico e corticoide antenatal). Mecanismo: contrações sem alteração do colo costumam não levar ao parto, e tratar todas expõe a gestante e o feto a medicamentos sem benefício. Epidemiologia: a maioria das mulheres com ameaça de trabalho de parto prematuro não pare em 48 horas, por isso a estratificação evita tratamento desnecessário. A está errada porque a cesárea não tem indicação. B está errada porque a ocitocina estimula contrações. C está errada porque a progesterona é profilaxia, não tratamento da contração. D está errada porque a cerclagem de urgência é para insuficiência istmocervical.",
  "referencias": "National Institute for Health and Care Excellence (NICE). Preterm labour and birth, NG25, atualizada em 10/06/2022 (seções de diagnóstico de trabalho de parto prematuro em ≥ 30+0 semanas e de tocolítico): texto lido em 03/11/2026 em nice.org.uk. A conduta de ACOG não foi relida. Conferido em 03/11/2026.",
  "dificuldadeManual": "intermediario",
  "status": "ativa",
  "estatisticas": {
   "respostas": 0,
   "acertos": 0,
   "distribuicaoAlternativas": {}
  },
  "criadoPor": "seed",
  "criadoEm": "2026-11-03"
 }
]);
