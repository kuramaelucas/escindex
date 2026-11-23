/* resumos/itu/resumo.js — resumo adaptativo de infecção do trato urinário (ass-itu): mecanismo e agentes,
   bacteriúria assintomática, cistite, pielonefrite e prostatite no adulto, sepse urinária e obstrução,
   gestação, ITU recorrente e sonda, criança (coleta, diagnóstico, tratamento e imagem), armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- itu */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "itu",
  titulo: "Infecção do trato urinário",
  assunto: "ass-itu",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "idsa-amr", texto: "IDSA — 2026 Guidance on the Treatment of Antimicrobial-Resistant Gram-Negative Infections (AMR Guidance, idsociety.org): ESBL na cistite e na ITU complicada", lidoEm: "2026-11-23" },
    { id: "idsa-cistite", texto: "IDSA/ESCMID — International clinical practice guidelines for the treatment of acute uncomplicated cystitis and pyelonephritis in women (Gupta et al., Clin Infect Dis 2011)", lidoEm: null },
    { id: "idsa-bacteriuria", texto: "IDSA — Clinical practice guideline for the management of asymptomatic bacteriuria: 2019 update (Nicolle et al., Clin Infect Dis 2019)", lidoEm: null },
    { id: "sbp-itu", texto: "Sociedade Brasileira de Pediatria — Infecção do trato urinário (documento científico, Departamento de Nefrologia) e AAP — UTI in febrile infants and children 2 to 24 months (2011, reafirmada 2016)", lidoEm: null },
    { id: "ms-prenatal", texto: "Ministério da Saúde/FEBRASGO — Manual de gestação de alto risco (2022) e protocolo de infecção urinária na gestação", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas, sem reposição", questoes: ["q-iamspe2021-014","q-gdsepse-090"] },
  ],
  doencas: [
    {
      id: "adulto", titulo: "ITU no adulto",
      introducao: `[[A ITU é quase sempre ascendente: bactérias do intestino colonizam o períneo e o introito, sobem pela uretra (curta na mulher, e a relação sexual empurra a bactéria) e se fixam no urotélio pelas fímbrias. *E. coli* responde pela maioria. O que protege é o fluxo: a urina que sai lava a bexiga, e por isso estase, resíduo pós-miccional, obstrução, cálculo e sonda são os grandes fatores de risco.|q-iamspe2021-044,q-adap23-054,q-gdsepse-070]] [[A leucocitúria e o nitrito mostram a resposta e a bactéria: as enterobactérias reduzem o nitrato da dieta a nitrito, mas enterococo e estafilococo não, e a urina que passa pouco tempo na bexiga também dá nitrito negativo.|q-amrigs2025-006,q-amrigs2021-064]]

Veja também: **Sepse** (versão completa da sepse urinária), **Antibioticoterapia e resistência bacteriana** (ESBL), **Pré-natal** (rastreio na gestação), **Infecções relacionadas à assistência à saúde** (sonda vesical) e **Febre sem sinais localizatórios** no resumo de pediatria correspondente.`,
      fragmentos: [
        { id: "ad-bacteriuria", titulo: "Bacteriúria assintomática: quando não tratar", conferir: true, diretrizes: ["idsa-bacteriuria"],
          questoes: ["q-inf-08","q-scmsp2022-048","q-tp20232-007","q-tp20241-004","q-unicamp2022-015","q-adap21-094","q-usprp2027-060","q-usprp2021-094"],
          prosa: `[[Bactéria na urina sem sintomas é colonização: tratar não previne pielonefrite nem lesão renal, só seleciona resistência e expõe a efeitos adversos. Por isso não se rastreia nem se trata em idosos, diabéticos, mulheres não grávidas, crianças e pacientes com sonda; urina turva ou com cheiro forte não é sintoma. Trata-se só na gestante e antes de procedimento urológico com sangramento de mucosa.|q-inf-08,q-scmsp2022-048,q-tp20232-007,q-tp20241-004,q-unicamp2022-015,q-adap21-094,q-usprp2027-060]] [[A sonda de demora é a fonte de bacteriúria e de infecção: retira-se assim que possível, e quem precisa esvaziar a bexiga (bexiga neurogênica) faz cateterismo intermitente limpo.|q-adap21-094,q-usprp2021-094]]`,
          texto: `- Tratar só em **gestantes e antes de procedimento urológico**. {q-inf-08,q-scmsp2022-048}
- Diabética assintomática com *E. coli*: **não tratar**. {q-tp20232-007,q-tp20241-004,q-unicamp2022-015}
- Sonda com urina turva, sem sintomas: **não tratar e retirar a sonda**. {q-adap21-094}
- Criança assintomática: **não tratar nem rastrear**. {q-usprp2027-060}
- Bexiga neurogênica com sonda: **cateterismo intermitente limpo**. {q-usprp2021-094}` },
        { id: "ad-cistite", titulo: "Cistite não complicada", conferir: true, diretrizes: ["idsa-cistite"],
          questoes: ["q-inf-07","q-usp2026-106","q-usprp2026-091","q-amrigs2025-043","q-einstein2023-056","q-usprp2027-076","q-amrigs2025-006"],
          prosa: `[[Mulher não grávida com disúria, polaciúria e urgência, sem febre, dor lombar nem corrimento, tem cistite: o diagnóstico é clínico, sem urina 1, urocultura ou imagem. Hematúria pode acontecer (inflamação da mucosa da bexiga).|q-einstein2023-056,q-usprp2027-076,q-amrigs2025-043,q-usp2026-106]] [[O tratamento empírico é nitrofurantoína (5 dias) ou fosfomicina em dose única: concentram-se na urina, poupam a flora e ainda têm boa sensibilidade. A quinolona fica reservada para infecções mais graves, para não gastar a droga e não selecionar resistência. Homem com cistite é ITU complicada e pede urocultura.|q-inf-07,q-usp2026-106,q-usprp2026-091,q-amrigs2025-043,q-amrigs2025-006]]`,
          texto: `- Cistite não complicada: **nitrofurantoína ou fosfomicina**; quinolona reservada. {q-inf-07}
- Disúria com DIU, sem febre: **nitrofurantoína sem exames**. {q-usp2026-106,q-usprp2026-091}
- Disúria após relação, sem corrimento: **cistite; nitrofurantoína 5 dias**. {q-amrigs2025-043}
- **Sem exames** para cistite não complicada. {q-einstein2023-056}
- Disúria com hematúria macroscópica, sem febre: **cistite não complicada**. {q-usprp2027-076}
- Nitrito: só **enterobactérias** convertem o nitrato. {q-amrigs2025-006}` },
        { id: "ad-pielonefrite", titulo: "Pielonefrite e prostatite", conferir: true, diretrizes: ["idsa-cistite","idsa-amr"],
          questoes: ["q-adap24-007","q-unifesp2024-010","q-einstein2026-010","q-tp20251-012","q-sessp2024-015","q-sirio2022-009","q-gdantibioticos-008","q-einstein2023-014"],
          prosa: `[[Febre, calafrio, dor lombar e Giordano positivo indicam que a infecção subiu ao rim. Sem náusea, vômito ou instabilidade, trata-se em casa por via oral (quinolona ou cefalosporina por 7 a 14 dias), podendo dar a primeira dose venosa no pronto-socorro; com vômitos, sepse, gestação ou obstrução, interna-se e trata-se por via venosa. Com alergia grave a betalactâmico, a quinolona é a escolha.|q-adap24-007,q-einstein2026-010,q-unifesp2024-010,q-tp20251-012]] [[Na enterobactéria com ESBL o carbapenêmico é a escolha da infecção grave (o ertapenem, de dose única diária, permite completar o tratamento fora do hospital).|q-sessp2024-015,q-gdantibioticos-008]] [[No diabético, bactérias que fermentam glicose formam gás no parênquima (pielonefrite enfisematosa), quadro grave que pede imagem e, muitas vezes, drenagem.|q-sirio2022-009]] [[A prostatite bacteriana aguda dá disúria, dor perineal e peso pélvico com leucocitúria; a próstata inflamada deixa a quinolona entrar, e o tratamento é longo (cerca de 4 semanas) para não cronificar.|q-einstein2023-014]]`,
          texto: `- Pielonefrite com bom estado e tolerando via oral: **antibiótico oral para Gram-negativos**. {q-adap24-007}
- Febre e dor lombar (a prova): **antibiótico venoso para Gram-negativos**. {q-unifesp2024-010}
- Pielonefrite com náuseas: **primeira dose de ceftriaxona venosa no PS**, depois oral. {q-einstein2026-010}
- Anafilaxia à amoxicilina: **ciprofloxacino**. {q-tp20251-012}
- Pielonefrite por ESBL com alta: **ertapenem 1 g/dia**. {q-sessp2024-015}
- Choque com ESBL prévia: **ertapenem** (entre as opções). {q-gdantibioticos-008}
- Pielonefrite enfisematosa: **diabetes**. {q-sirio2022-009}
- Prostatite aguda: **ciprofloxacino por 28 dias**. {q-einstein2023-014}` },
        { id: "ad-sepse", titulo: "Sepse urinária e obstrução", conferir: true,
          questoes: ["q-gdsepse-008","q-gdsepse-018","q-gdsepse-070","q-gdsepse-073","q-gdsepse-074","q-gdsepse-086","q-gdsepse-096"],
          prosa: `[[Pielonefrite com hipotensão ou disfunção orgânica é sepse: hemoculturas e urocultura sem atrasar, antibiótico venoso na primeira hora e cristaloide 30 mL/kg nas primeiras 3 horas se houver hipoperfusão.|q-gdsepse-008,q-gdsepse-018,q-gdsepse-096,q-gdsepse-073]] [[Febre que não cede em 48 a 72 horas de antibiótico certo, ou sepse com cálculo, pede ultrassonografia: urina represada atrás de obstrução é abscesso, e o antibiótico não resolve sem desobstruir (cateter duplo J ou nefrostomia).|q-gdsepse-070,q-gdsepse-073]] [[A nomenclatura mudou: com o Sepsis-3 não existe mais "sepse grave"; ou é sepse (com disfunção) ou choque séptico. A versão completa está no resumo **Sepse**.|q-gdsepse-074,q-gdsepse-086]]`,
          texto: `- Choque urinário: **30 mL/kg de cristaloide nas primeiras 3 horas**. {q-gdsepse-008}
- Pielonefrite hipotensa: **culturas imediatas, cristaloide e ceftriaxona**. {q-gdsepse-018}
- Sepse com hidronefrose por cálculo: **cateter duplo J**. {q-gdsepse-070}
- Febre persistente com taquicardia e letargia: **acesso e volume** primeiro. {q-gdsepse-073}
- Hipotensão com piúria (a prova antiga): **"sepse grave"**. {q-gdsepse-074,q-gdsepse-086}
- **Hemoculturas antes** do antimicrobiano. {q-gdsepse-096}` },
        { id: "ad-recorrente", titulo: "ITU recorrente", conferir: true, diretrizes: ["idsa-cistite"],
          questoes: ["q-adap23-054","q-tp20202-117","q-gdantibioticos-020"],
          prosa: `[[Recorrente é 2 ou mais episódios em 6 meses ou 3 em 1 ano. Na mulher sem alteração anatômica, a prevenção é comportamental (hidratação, micção após a relação) e, se não basta, profilaxia antibiótica em dose baixa contínua ou pós-coito (nitrofurantoína) por 6 a 12 meses; cranberry sozinho não tem a mesma eficácia.|q-adap23-054,q-tp20202-117]] [[No homem a ITU recorrente tem causa (próstata, obstrução, resíduo): trata-se a causa, e a profilaxia contínua com nitrofurantoína não é a solução, sobretudo com cepa de sensibilidade intermediária.|q-gdantibioticos-020]]`,
          texto: `- Quatro cistites pós-coito: **medidas comportamentais e profilaxia em dose baixa**. {q-adap23-054}
- Quatro episódios em 6 meses: **profilaxia por 6 meses**. {q-tp20202-117}
- Hiperplasia prostática com nitrofurantoína contínua: **suspender**. {q-gdantibioticos-020}` },
      ],
    },
    {
      id: "gestacao", titulo: "ITU na gestação",
      introducao: `[[A progesterona relaxa a musculatura do ureter e o útero comprime o ureter direito: a urina fica parada e a bacteriúria que na não grávida some sozinha sobe para o rim. Por isso a gestante faz urocultura de rotina e a bacteriúria assintomática é tratada, para evitar pielonefrite (que associa parto prematuro).|q-scmsp2026-063,q-adap21-054,q-unicampdis2023-044]]`,
      fragmentos: [
        { id: "ges-bacteriuria", titulo: "Bacteriúria e cistite", conferir: true, diretrizes: ["ms-prenatal"],
          casos: ["q-scmsp2025-063"],
          questoes: ["q-scmsp2026-063","q-adap21-054","q-scmsp2025-063","q-sirio2027-071","q-sirio2022-074","q-usprp2026-079","q-gdantibioticos-034","q-gdantibioticos-040","q-iamspe2025-012"],
          prosa: `[[Urocultura positiva sem sintomas na gestante é bacteriúria assintomática e se trata guiado pelo antibiograma (cefalexina, amoxicilina-clavulanato, fosfomicina em dose única, nitrofurantoína), com urocultura de controle 7 a 10 dias depois e, se negativa, mensal até o parto. A cistite da gestante também se trata logo, sem esperar a cultura.|q-scmsp2026-063,q-adap21-054,q-scmsp2025-063,q-sirio2027-071,q-sirio2022-074,q-usprp2026-079]] [[Quinolonas, tetraciclinas e aminoglicosídeos ficam fora. A nitrofurantoína serve na maior parte da gestação, mas evita-se perto do termo: no recém-nascido, com pouca G6PD e glutationa, ela pode causar hemólise.|q-gdantibioticos-034,q-gdantibioticos-040,q-iamspe2025-012]]`,
          texto: `- Urocultura positiva sem sintomas: **bacteriúria assintomática**. {q-scmsp2026-063}
- 14 semanas com *E. coli*: **cefalexina 7 dias e urocultura de controle**. {q-adap21-054}
- Urocultura de rotina positiva: **amoxicilina-clavulanato 7 dias**. {q-scmsp2025-063}
- 36 semanas com *Klebsiella*: **fosfomicina 3 g dose única**. {q-sirio2027-071}
- Disúria e hematúria com 30 semanas: **fosfomicina dose única**. {q-sirio2022-074}
- Controle: **urocultura 7 a 10 dias após e mensal**. {q-usprp2026-079}
- Melhor opção (entre as listadas): **nitrofurantoína**. {q-gdantibioticos-034}
- 38 semanas: **não** nitrofurantoína. {q-gdantibioticos-040,q-iamspe2025-012}` },
        { id: "ges-pielonefrite", titulo: "Pielonefrite na gestação", conferir: true, diretrizes: ["ms-prenatal"],
          questoes: ["q-unifesp2023-054","q-usprp2021-054","q-sirio2023-077","q-unicampdis2023-044"],
          prosa: `[[A gestante com pielonefrite interna, recebe betalactâmico venoso (cefuroxima, ceftriaxona) e faz ultrassonografia das vias urinárias para afastar obstrução; febre que volta depois da alta é pielonefrite complicada. Depois de uma pielonefrite, mantém-se profilaxia diária até o fim da gestação.|q-unifesp2023-054,q-usprp2021-054,q-sirio2023-077,q-unicampdis2023-044]]`,
          texto: `- Febre e dor lombar após alta recente: **pielonefrite complicada**. {q-unifesp2023-054}
- Falha da norfloxacina com Giordano positivo: **cefuroxima e ultrassonografia**. {q-usprp2021-054}
- Após pielonefrite: **profilaxia diária no pré-natal**. {q-sirio2023-077}
- Dor, calafrio e vômito com 28 semanas: **pielonefrite**. {q-unicampdis2023-044}` },
      ],
    },
    {
      id: "crianca", titulo: "ITU na criança",
      introducao: `[[No lactente a ITU não tem sintoma urinário: é febre sem foco, irritabilidade, vômito, recusa alimentar. Por isso todo lactente com febre sem sinais localizatórios (sobretudo menina e menino não circuncidado nos primeiros meses) faz urina 1 e urocultura. A infecção no rim em crescimento pode deixar cicatriz, e é isso que a investigação procura evitar.|q-iamspe2021-038,q-uspsp1-011,q-usprp2025-095,q-fmabc2025-055]] [[O refluxo vesicoureteral, a malformação e a disfunção vesical (segurar a urina e as fezes, constipação) mantêm urina parada e predispõem à recorrência.|q-iamspe2021-044,q-sessp2026-047,q-uspsp3-047]]`,
      fragmentos: [
        { id: "cri-diagnostico", titulo: "Coleta e diagnóstico", conferir: true, diretrizes: ["sbp-itu"],
          questoes: ["q-iamspe2021-038","q-uspsp1-011","q-usprp2025-095","q-famema2022-097","q-udisc20262-052","q-unicampdis2024-085","q-fmabc2025-055","q-amrigs2021-064","q-iamspe2021-044","q-sessp2026-047","q-usprp2022-095","q-fmabc2023-054"],
          prosa: `[[Na criança sem controle esfincteriano a urina para cultura é colhida por sondagem vesical ou punção suprapúbica; o saco coletor contamina com a pele, e só o resultado negativo vale (afasta ITU). Saco coletor com dois germes ou contagem baixa é provável contaminação e pede nova coleta por sonda.|q-famema2022-097,q-udisc20262-052,q-unicampdis2024-085]] [[O diagnóstico junta exame de urina (leucocitúria, nitrito) e urocultura; a piúria pode faltar mesmo com infecção, e a densidade alta indica desidratação.|q-fmabc2025-055,q-amrigs2021-064]] [[Febre, dor que irradia para o dorso e urina turva na criança maior é pielonefrite. A menina com sintomas miccionais, pouca febre e leucocitúria discreta, que segura a urina, pode ter vulvite ou disfunção: medidas locais e aguardar a cultura. A cistite afebril tratada e curada não pede investigação nem nova cultura.|q-fmabc2023-054,q-sessp2026-047,q-usprp2022-095]] [[No recém-nascido com malformação anorretal, a fístula leva fezes à via urinária: febre com massa em flanco é foco urinário.|q-usprp2025-095]]`,
          texto: `- Febre de 3 dias com criança bem: **febre sem sinais localizatórios**. {q-iamspe2021-038}
- Lactente febril após diarreia: **urina 1 e urocultura**. {q-uspsp1-011}
- RN com anomalia anorretal e massa em flanco: **foco urinário**. {q-usprp2025-095}
- Saco coletor com dois germes: **confirmar por sondagem**. {q-famema2022-097}
- Saco coletor duvidoso: **punção suprapúbica ou sondagem**. {q-udisc20262-052}
- Lactente de 4 meses: **sondagem vesical ou punção**. {q-unicampdis2024-085}
- Confirmação: **sedimento urinário e urocultura**. {q-fmabc2025-055}
- Densidade alta = desidratação; **piúria pode faltar**. {q-amrigs2021-064}
- Principal fator do hospedeiro: **estase e resíduo pós-miccional**. {q-iamspe2021-044}
- Menina que segura urina, pouca febre: **banho de assento e aguardar urocultura**. {q-sessp2026-047}
- Cistite afebril já tratada: **manter puericultura**. {q-usprp2022-095}
- Febre com dor irradiada ao dorso: **pielonefrite**. {q-fmabc2023-054}` },
        { id: "cri-tratamento", titulo: "Tratamento", conferir: true, diretrizes: ["sbp-itu"],
          questoes: ["q-amrigs2022-074","q-sirio2026-049","q-fmabc2024-053","q-tp20202-052","q-einstein2026-032","q-famerp2023-035","q-uspsp3-047","q-usp2022-041"],
          prosa: `[[A via oral (cefuroxima, amoxicilina-clavulanato, cefalexina) funciona tão bem quanto a venosa na criança que está bem e aceita líquidos, com retorno em 48 horas. A via parenteral fica para o recém-nascido e o lactente jovem (até 2 a 3 meses), a criança toxêmica, com vômitos ou sepse, e passa-se para oral quando a febre cede. Nitrofurantoína não serve na ITU febril (não atinge o rim).|q-amrigs2022-074,q-sirio2026-049,q-fmabc2024-053,q-tp20202-052,q-einstein2026-032,q-famerp2023-035]] [[Com malformação e infecção prévia por *Pseudomonas*, o empírico cobre *Pseudomonas*.|q-uspsp3-047]] [[Se a urocultura vem negativa, não havia ITU: suspende-se o antibiótico (e o exantema que apareceu não pede outro remédio).|q-usp2022-041]]`,
          texto: `- Parenteral: **recém-nascidos e lactentes jovens**. {q-amrigs2022-074}
- Lactente de 4 meses bem: **cefuroxima oral**. {q-sirio2026-049,q-fmabc2024-053}
- 6 meses bem, com fimose: **antibiótico oral e retorno com a urocultura**. {q-tp20202-052}
- Toxêmica com dor no flanco: **ceftriaxona venosa e oral após 48 h sem febre**. {q-einstein2026-032}
- Sepse que melhorou: **US na fase aguda e passar para via oral**. {q-famerp2023-035}
- Malformação e *Pseudomonas* prévia: **cobrir *Pseudomonas*; DMSA e UCM depois**. {q-uspsp3-047}
- Urocultura negativa: **suspender o antibiótico**. {q-usp2022-041}` },
        { id: "cri-imagem", titulo: "Investigação por imagem", conferir: true, diretrizes: ["sbp-itu"],
          figuras: [{ arquivo: "figuras/imagem-crianca.svg", legenda: "Esquema autoral: ordem dos exames de imagem depois da ITU febril na criança." }],
          questoes: ["q-einstein2022-031","q-einstein2023-032","q-usprp2024-001","q-uspsp2-058","q-uspsp5-119","q-unesp2021-010","q-uspsp3-047","q-famerp2023-035"],
          prosa: `[[Depois da primeira ITU febril faz-se ultrassonografia de rins e vias urinárias (procura dilatação, malformação, rim pequeno), na internação ou em até 6 semanas; se normal no primeiro episódio, a investigação para aí. A uretrocistografia miccional, que mostra o refluxo, vem quando a ultrassonografia é alterada, na ITU atípica ou na recorrente (segundo episódio febril). A cintilografia com DMSA mostra o parênquima: na fase aguda confirma a pielonefrite quando a cultura falha; meses depois, mostra cicatriz. Profilaxia por um ano depois do primeiro episódio não é rotina.|q-einstein2022-031,q-einstein2023-032,q-usprp2024-001,q-uspsp5-119,q-unesp2021-010,q-uspsp3-047,q-famerp2023-035,q-uspsp2-058]]`,
          texto: `- Primeira ITU febril: **ultrassonografia em até 6 semanas**. {q-einstein2022-031,q-einstein2023-032,q-usprp2024-001}
- US normal após a primeira (a prova): **uretrocistografia miccional**. {q-uspsp2-058}
- Segunda ITU febril com US normal: **UCM e DMSA**. {q-uspsp5-119}
- Cultura negativa sob cefalexina, quadro de pielonefrite: **DMSA**. {q-unesp2021-010}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["sbp-itu","idsa-amr"],
          questoes: ["q-uspsp2-058","q-unifesp2024-010","q-adap24-007","q-gdsepse-074","q-gdsepse-086","q-gdantibioticos-008","q-gdsepse-073"],
          prosa: `[[**Imagem depois da primeira ITU febril**: a regra (AAP, SBP) é ultrassonografia e, se normal, parar; UCM só com ultrassonografia alterada, ITU atípica ou recorrente. A uspsp2-058 pediu UCM depois de ultrassonografia normal.|q-uspsp2-058]] [[**Via na pielonefrite**: a regra é via oral na paciente bem, que tolera comprimidos (adap24-007); a unifesp2024-010, com enunciado curto, deu antibiótico venoso.|q-unifesp2024-010,q-adap24-007]] [[**"Sepse grave"**: termo extinto em 2016; as provas antigas (gdsepse-074 e 086) ainda o usaram para hipotensão ou disfunção.|q-gdsepse-074,q-gdsepse-086]] [[**ESBL em choque**: a IDSA prefere meropenem ou imipenem no paciente grave; o ertapenem fica para o estável. A gdantibioticos-008 deu ertapenem em choque séptico.|q-gdantibioticos-008]] [[**Febre que não cede**: a regra é procurar obstrução ou abscesso com imagem; a gdsepse-073 cobrou o passo anterior, ressuscitar a paciente instável.|q-gdsepse-073]]`,
          texto: `- Regra: UCM só com US alterada ou recorrência; a prova pediu **UCM após US normal**. {q-uspsp2-058}
- Regra: oral na pielonefrite estável; uma prova deu **venoso**. {q-unifesp2024-010,q-adap24-007}
- "Sepse grave" é termo **antigo**. {q-gdsepse-074,q-gdsepse-086}
- Regra IDSA: meropenem no grave; a prova deu **ertapenem** em choque. {q-gdantibioticos-008}
- Febre persistente instável: **volume antes** da investigação. {q-gdsepse-073}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: as formas de ITU",
      introducao: `Resumo dos capítulos para separar o que se trata, como e onde.`,
      fragmentos: [
        { id: "cmp-formas", titulo: "Bacteriúria, cistite, pielonefrite e gestante", conferir: true,
          questoes: ["q-inf-08","q-inf-07","q-adap24-007","q-adap21-054","q-sirio2026-049"],
          prosa: `[[Sintoma, febre e terreno decidem a conduta.|q-inf-08,q-inf-07,q-adap24-007,q-adap21-054,q-sirio2026-049]]

| | Bacteriúria assintomática | Cistite não complicada | Pielonefrite | Gestante | Criança febril |
| Quadro | urocultura positiva sem sintomas | disúria, polaciúria, sem febre | febre, dor lombar, Giordano | qualquer bacteriúria | febre sem foco |
| Exames | não rastrear (exceto gestante) | nenhum | urina 1, urocultura; imagem se grave | urocultura de rotina e de controle | urina por sonda e urocultura; US |
| Tratamento | não tratar | nitrofurantoína ou fosfomicina | quinolona ou cefalosporina, oral se estável | betalactâmico, fosfomicina; sem quinolona | cefalosporina oral; venosa no lactente jovem ou toxêmico |`,
          texto: `- Bacteriúria: **só gestante e procedimento**. {q-inf-08}
- Cistite: **nitrofurantoína ou fosfomicina**. {q-inf-07}
- Pielonefrite estável: **oral**. {q-adap24-007}
- Gestante: **tratar a bacteriúria**. {q-adap21-054}
- Lactente bem: **cefuroxima oral**. {q-sirio2026-049}` },
      ],
    },
  ],
});
