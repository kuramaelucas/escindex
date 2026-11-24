/* resumos/pancreatite-aguda/resumo.js — resumo adaptativo de pancreatite aguda: diagnóstico e etiologia, imagem, gravidade
   (Atlanta, Ranson), tratamento inicial e nutrição, colecistectomia na pancreatite biliar, coleções e necrose (step-up),
   complicações vasculares e pancreatite crônica.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- pancreatite-aguda */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "pancreatite-aguda",
  titulo: "Pancreatite aguda e crônica",
  assunto: "ass-pancreatite",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "acg-pancreatite", texto: "ACG — diretriz de manejo da pancreatite aguda (Am J Gastroenterol 2024)", edicao: "2024", lidoEm: null },
    { id: "atlanta-2012", texto: "Classificação de Atlanta revisada (2012): gravidade, coleções e necrose", lidoEm: null },
    { id: "iap-apa", texto: "IAP/APA — diretrizes de pancreatite aguda (hidratação, nutrição, antibiótico, intervenção na necrose)", lidoEm: null },
    { id: "wses-pancreatite", texto: "WSES — diretriz de pancreatite aguda grave (2019): imagem, necrose infectada e colecistectomia", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anuladas pela banca (as reposições, q-scmsp2021-034-ia e q-unicamp2022-027-ia, entram no resumo)", questoes: ["q-scmsp2021-034","q-unicamp2022-027"] },
  ],
  doencas: [
    {
      id: "diagnostico", titulo: "Diagnóstico, etiologia e imagem",
      introducao: `[[A pancreatite aguda é a **autodigestão** da glândula por enzimas ativadas dentro dela: a dor é súbita, em **barra**, no andar superior do abdome, com irradiação para o **dorso**, e piora em decúbito dorsal; o diagnóstico exige **dois de três critérios**: dor típica, **lipase ou amilase com pelo menos três vezes o limite superior** e imagem compatível (esta só quando há dúvida).|q-iamspe2026-015,q-sirio2025-015,q-udisc20262-027]] A causa mais comum no Ocidente é a **litíase biliar**, seguida do álcool, e a ordem de investigação é: confirmar, achar a causa, medir a gravidade.

Veja também: **Colecistite e coledocolitíase** (cálculo na via biliar e CPRE), **Obstrução intestinal** e **Complicações cirúrgicas** (síndrome compartimental), **Cuidados perioperatórios** (nutrição e líquidos), **Cirrose e complicações** (hipertensão portal) e **Cuidados do paciente crítico**.`,
      fragmentos: [
        { id: "dx-clinico", titulo: "Quadro clínico, enzimas e sinais", conferir: true, diretrizes: ["acg-pancreatite"],
          questoes: ["q-sirio2025-036","q-fmabc2025-014","q-iamspe2026-015","q-sirio2025-015","q-famerp2023-053","q-sessp2024-030","q-udisc20262-027","q-iamspe2025-002","q-unicamp2023-029"],
          prosa: `[[A dor epigástrica súbita e intensa, irradiada para o dorso, com náuseas e vômitos e **sem irritação peritoneal**, é pancreatite aguda até prova em contrário; o exame que confirma é a **lipase (ou amilase) com três vezes o limite superior**, e não as transaminases, a fosfatase alcalina ou a gasometria; e ele precede a tomografia.|q-sirio2025-036,q-fmabc2025-014,q-sirio2025-015,q-iamspe2026-015,q-famerp2023-053]] A leucocitose e a hiperglicemia acompanham a inflamação.

[[A **magnitude** da elevação das enzimas **não** se correlaciona com a gravidade; a lipase é o melhor indicador em quem chega vários dias depois do início; a amilase pode estar normal na pancreatite letal, pela destruição da glândula; a elevação persistente da amilase sugere complicação (pseudocisto, abscesso); e a amilase também aparece nos derrames pleurais e peritoneais pancreáticos.|q-sessp2024-030]] [[A dor piora em decúbito dorsal e alivia na posição genupeitoral; na forma grave, o distúrbio metabólico é **hipocalcemia, hiperglicemia e acidose**, não hipercalcemia.|q-udisc20262-027]] [[Nas formas hemorrágicas, a equimose do **flanco** (Grey-Turner), a **periumbilical** (Cullen) e a **inguinal** (Fox) mostram sangue no retroperitônio; Lenander é da apendicite e Jobert, da úlcera duodenal perfurada.|q-udisc20262-027,q-iamspe2025-002,q-unicamp2023-029]]`,
          texto: `- Dor súbita em abdome superior irradiada para o dorso, sem irritação peritoneal: **pancreatite aguda**. {q-sirio2025-036}
- Dor epigástrica intensa, glicemia 245, leucocitose e amilase e lipase elevadas: **pancreatite aguda**. {q-fmabc2025-014}
- Diagnóstico: quadro típico e **amilase ou lipase de 3 vezes ou mais** o limite superior, mais imagem quando indicada. {q-iamspe2026-015}
- O exame laboratorial que confirma é a **lipase de pelo menos 3 vezes** o limite superior. {q-sirio2025-015}
- Colelitíase, icterícia e hipotensão com dor epigástrica: **dosar as enzimas pancreáticas** primeiro. {q-famerp2023-053}
- Os níveis de enzimas **não** acompanham a gravidade; a lipase é melhor em quem chega tardiamente. {q-sessp2024-030}
- A dor piora em decúbito dorsal; grave: **hipocalcemia, hiperglicemia, acidose**. {q-udisc20262-027}
- **Fox**: equimose inguinal da pancreatite hemorrágica; **Cullen**: periumbilical. {q-iamspe2025-002,q-unicamp2023-029}` },
        { id: "etiologia", titulo: "Causas: biliar, álcool, fármacos e a causa oculta", conferir: true, diretrizes: ["acg-pancreatite"],
          casos: ["q-usprp2023-084"],
          questoes: ["q-scmsp2025-024","q-tp20252-016","q-amrigs2025-031","q-amrigs2022-006","q-einstein2026-045","q-usp2022-064","q-usprp2023-084"],
          prosa: `[[A **litíase biliar** é a causa mais comum no Ocidente, sobretudo em mulheres de 50 a 70 anos: o cálculo pequeno (menor que 5 mm) migra, obstrui transitoriamente a papila e faz refluxo de bile para o ducto pancreático; o triglicerídeo de 380 mg/dL é causa menos provável que a litíase, que fica no topo da lista.|q-scmsp2025-024,q-tp20252-016,q-amrigs2025-031]] [[A elevação da **ALT acima de três vezes o limite superior** tem bom valor preditivo para etiologia biliar; a lesão focal da cabeça do pâncreas, com pancreatite autoimune (IgG4) ou neoplasia, entra no diferencial no homem mais velho com icterícia.|q-amrigs2022-006]]

Outras causas: [[a **CPRE**: a pancreatite é a complicação mais comum do procedimento (3 a 10 %), em geral leve e mais comum em mulheres jovens; o **ácido valproico** causa pancreatite (lipase de 650 em criança de 4 anos com transaminases normais); e o **tabagismo** potencializa o álcool, e não o reduz.|q-amrigs2025-031,q-einstein2026-045]] [[Após uma pancreatite leve **sem cálculo** ao ultrassom e sem álcool, a investigação da causa oculta (microlitíase) é a **ecoendoscopia**.|q-usp2022-064]] [[A paciente com icterícia e cálculos nas imagens tem pancreatite biliar com colestase, e o cálculo que migrou do cístico para o colédoco é o responsável.|q-usprp2023-084]]`,
          texto: `- Causa mais comum da pancreatite aguda: **colelitíase**. {q-scmsp2025-024}
- Hipertrigliceridemia de 380 com cálculos: o diagnóstico etiológico é **litíase biliar**. {q-tp20252-016}
- A **litíase biliar** é a principal causa no Ocidente; a **pancreatite é a complicação mais comum da CPRE**; o tabagismo **potencializa** o álcool. {q-amrigs2025-031}
- **ALT acima de 3 vezes** o limite sugere cálculo biliar; amilase **não** dá prognóstico. {q-amrigs2022-006}
- Criança em uso de **ácido valproico** com dor, amilase e lipase altas: **pancreatite por valproato**. {q-einstein2026-045}
- Pancreatite leve sem cálculo ao ultrassom e sem álcool: **ecoendoscopia**. {q-usp2022-064}
- Icterícia e pancreatite com cálculos: o que migrou pelo cístico ao colédoco é o responsável. {q-usprp2023-084}` },
        { id: "imagem", titulo: "Ultrassonografia, tomografia e momento do exame", conferir: true, diretrizes: ["wses-pancreatite","acg-pancreatite"],
          questoes: ["q-010","q-scmsp2021-034-ia","q-sessp2024-029","q-famerp2022-071","q-uspsp3-104","q-unicamp2022-027-ia"],
          prosa: `[[O **primeiro exame de imagem** da pancreatite aguda já diagnosticada é a **ultrassonografia de abdome superior**, para procurar cálculos e dilatação da via biliar (etiologia), não a tomografia, a endoscopia ou as dosagens seriadas de amilase; a CPRE não é de rotina.|q-uspsp3-104,q-unicamp2022-027-ia,q-sessp2024-029]]

[[A **tomografia com contraste** não é necessária na maioria dos pacientes e **não se faz antes de 72 horas**, exceto se houver dúvida diagnóstica: nas primeiras 72 horas ela subestima a necrose, que só se delimita depois; indica-se, idealmente 72 a 96 horas após o início, na pancreatite grave ou quando a evolução clínica é desfavorável.|q-010,q-scmsp2021-034-ia,q-famerp2022-071]] A tomografia sem contraste não define necrose.`,
          texto: `- Etilista com lipase 850 e evolução desfavorável: **tomografia com contraste após 72 a 96 horas**. {q-010}
- WSES 2019: tomografia **desnecessária** na maioria; na grave, **72 a 96 horas** do início. {q-scmsp2021-034-ia}
- **Branda**: a tomografia **não** é necessária; a CPRE **não** é de rotina; a ultrassonografia não detecta necrose. {q-sessp2024-029}
- Tomografia **não antes de 3 dias**, salvo dúvida diagnóstica; ela não define a gravidade nas primeiras horas. {q-famerp2022-071}
- Amilase 1.280, lipase 2.500 e ALT 313: **ultrassonografia de abdome superior** como exame adicional. {q-uspsp3-104}
- Pancreatite já estabelecida pela dor e enzimas: **ultrassonografia** para investigar a etiologia. {q-unicamp2022-027-ia}` },
      ],
    },
    {
      id: "gravidade", titulo: "Gravidade: Atlanta, Ranson e marcadores",
      introducao: `[[Pela classificação de **Atlanta revisada**, a gravidade se define pela **falência de órgãos** (persistente por mais de 48 horas) e pelas complicações locais, não pela quantidade de necrose nem pelo valor das enzimas: **leve** é sem falência nem complicação local; **moderada**, falência transitória ou complicação local; **grave**, falência persistente.|q-sessp2023-016,q-sirio2023-025]]`,
      fragmentos: [
        { id: "gravidade", titulo: "Como reconhecer a pancreatite grave", conferir: true, diretrizes: ["atlanta-2012"],
          questoes: ["q-sirio2023-025","q-usprp2021-083","q-iamspe2026-007","q-amrigs2023-022","q-fmabc2022-021","q-unesp2021-063","q-einstein2021-012","q-sessp2023-016"],
          prosa: `A pancreatite grave perde líquido para o terceiro espaço e libera mediadores inflamatórios: o paciente fica **hemoconcentrado**, com **azotemia**, **hipoxemia**, **acidose** e oligúria. [[A paciente com amilase de 1.300, creatinina de 1,9, hipoxemia, acidose e oligúria tem **pancreatite grave** (disfunção de órgão), sem indicação de tomografia precoce nem de necrosectomia de urgência e com pressão intra-abdominal de 10 mmHg (sem síndrome compartimental); a **hemoconcentração** (hematócrito de 55 %) e a **azotemia** (ureia 150, creatinina 2,8), com taquicardia, taquipneia e coleções, justificam a transferência para hospital terciário com UTI.|q-sirio2023-025,q-usprp2021-083]]

[[A **proteína C-reativa acima de 150 mg/L** em 48 a 72 horas é o marcador laboratorial isolado de gravidade e de complicação; a **hipocalcemia** (saponificação da gordura peripancreática) e a **hiperglicemia** são critérios de gravidade; os **critérios de Ranson** não incluem exame de imagem e se dividem em admissão (idade, leucócitos, glicemia, LDH, TGO) e 48 horas (hematócrito, ureia, cálcio, PaO2, déficit de bases, sequestro); o Balthazar é tomográfico, e não ultrassonográfico.|q-iamspe2026-007,q-fmabc2022-021,q-unesp2021-063,q-amrigs2023-022]] [[A gestante com pancreatite biliar sem falência de órgão (estado geral bom, FC 90) é **leve** e fica sem antibiótico e sem outros exames de imagem; a hipertrigliceridemia e a hipercalcemia também são causas.|q-einstein2021-012,q-sessp2023-016]]`,
          texto: `- Atlanta: gravidade pela **falência de órgãos**; só necrose acima de 30 % **não** define a grave. {q-sessp2023-016}
- Creatinina 1,9, hipoxemia, acidose e oligúria: **pancreatite aguda grave**; sem tomografia precoce nem necrosectomia de urgência. {q-sirio2023-025}
- Hematócrito 55 %, ureia 150 e creatinina 2,8 com coleções: **hemoconcentração e azotemia**, transferência para hospital com UTI. {q-usprp2021-083}
- **PCR acima de 150 mg/L** em 48 a 72 horas: marcador de gravidade e necrose. {q-iamspe2026-007}
- **Ranson**: LDH e TGO na admissão; não inclui exame de imagem; PaO2 entra em 48 horas. {q-amrigs2023-022}
- Forma grave: **hiperglicemia e hipocalcemia**; Balthazar é tomográfico; a necrosectomia não é tratamento da maioria. {q-fmabc2022-021}
- **Hipocalcemia** é critério de gravidade; antibiótico profilático não está indicado. {q-unesp2021-063}
- Gestante com pancreatite biliar sem falência: **leve**, sem antibiótico. {q-einstein2021-012}` },
      ],
    },
    {
      id: "tratamento", titulo: "Tratamento inicial e nutrição",
      introducao: `[[O tratamento é de **suporte**: **hidratação precoce e moderada com Ringer lactato**, **analgesia** e **dieta oral logo que a dor melhorar**; antibiótico profilático e nutrição parenteral de rotina **não** se usam, e a CPRE urgente só vale para a colangite ou a obstrução biliar persistente.|q-adap21-083,q-famerp2026-080,q-sirio2021-035]]`,
      fragmentos: [
        { id: "trat-inicial", titulo: "Hidratação, analgesia e o que não fazer", conferir: true, diretrizes: ["acg-pancreatite","iap-apa"],
          figuras: [{ arquivo: "figuras/primeiras-24-horas.svg", legenda: "Esquema autoral: o que fazer e o que evitar no início da pancreatite aguda." }],
          questoes: ["q-adap21-083","q-tp20222-066","q-tp20232-063","q-tp20261-037","q-tp20241-063","q-tp20252-049","q-famerp2023-054","q-famerp2026-080","q-iamspe2021-031","q-einstein2025-016","q-sirio2021-035","q-iamspe2025-026"],
          prosa: `A inflamação desloca líquido para o retroperitônio, e a hipovolemia lesa o rim e agrava a necrose: por isso a **reposição volêmica** é o pilar. [[Usa-se **Ringer lactato** de forma **moderadamente agressiva** (cerca de **1,5 mL/kg/h**, após bolus se hipotenso), guiada por metas, com analgesia (**opioides e anti-inflamatórios não são contraindicados**); o paciente etilista, desidratado, com PA 98/71 e FC 102, e o com hemoconcentração e creatinina de 3 mg/dL recebem **hidratação e analgesia**, sem antibiótico, sem tomografia na admissão e sem CPRE.|q-adap21-083,q-famerp2026-080,q-tp20222-066,q-tp20232-063,q-tp20261-037,q-tp20241-063]] [[A proteína C-reativa alta **não** indica carbapenêmico; e a pancreatite biliar leve, com febre de 37,8 °C, bilirrubina de 3 e creatinina de 1,5, estável e sem colangite, recebe **monitorização clínica e laboratorial**, e não CPRE, antibiótico, tomografia ou ressonância.|q-famerp2026-080,q-sirio2021-035]]

[[Na pancreatite grave, com hemoglobina de 19,4, creatinina de 2,81 e pressão intra-abdominal de 17 mmHg, a conduta é **expansão volêmica e transferência para UTI**, e não drenagem nem laparotomia.|q-iamspe2025-026]] [[Com dor intensa e vômitos incoercíveis, a gestante ou a paciente hipovolêmica (FC 126, ureia 90) recebe monitorização, Ringer lactato, analgesia, antiemético e sondagem vesical.|q-einstein2025-016,q-famerp2023-054]]`,
          texto: `- Etilista com lipase 2.400, hematócrito 52 %, estável: **Ringer lactato guiado por metas**, analgesia, dieta precoce, sem antibiótico. {q-adap21-083}
- Obesa com dor, vômitos, hipertensa e amilase 1.578: **hidratação agressiva com cristaloide**. {q-tp20222-066}
- Etilista desidratado com dor epigástrica: **hidratação endovenosa e analgesia**. {q-tp20232-063,q-tp20261-037}
- Hemoconcentração, creatinina 3 e hipotensão: **Ringer lactato e analgesia**, sem imipenem nem tomografia. {q-tp20241-063}
- Pancreatite biliar leve: **reposição hídrica, controle da dor e alimentação oral precoce**. {q-famerp2023-054}
- **Ringer lactato 1,5 mL/kg/h**; opioides e AINE **não** são contraindicados; PCR alta **não** indica carbapenêmico. {q-famerp2026-080}
- Biliar estável, 37,8 °C, sem colangite: **monitorização clínica e laboratorial**. {q-sirio2021-035}
- Hipovolemia (ureia 90, creatinina 1,9): **Ringer lactato, analgesia, antiemético e sondagem vesical**. {q-einstein2025-016}
- Hemoglobina 19,4, creatinina 2,81 e PIA 17: **expansão volêmica e UTI**. {q-iamspe2025-026}
- Quatro itens: só o **tripé hidratação, analgesia e repouso digestivo** foi dado como certo (ver Armadilhas). {q-iamspe2021-031}
- Dor intensa há 24 horas com álcool e amilase 800: a prova cobrou **jejum absoluto, hidratação e analgesia** (ver Armadilhas). {q-tp20252-049}` },
        { id: "nutricao", titulo: "Quando e como alimentar", conferir: true, diretrizes: ["acg-pancreatite","iap-apa"],
          questoes: ["q-unifesp2025-005","q-iamspe2021-019","q-sessp2022-036"],
          prosa: `O jejum prolongado atrofia a mucosa e favorece a translocação bacteriana, que infecta a necrose. [[A **dieta oral** volta **assim que a dor melhora**, em 24 a 48 horas, sem esperar a normalização da amilase nem da tomografia; na pancreatite grave, a **nutrição enteral precoce** (24 a 72 horas, por via oral ou por sonda) reduz infecção, falência de órgãos e mortalidade, e é preferível à parenteral.|q-unifesp2025-005,q-iamspe2021-019,q-sessp2022-036]]`,
          texto: `- Pancreatite biliar provavelmente leve: **dieta oral entre 24 e 48 horas**. {q-unifesp2025-005}
- Suporte nutricional precoce mais indicado: **pancreatite aguda grave**. {q-iamspe2021-019}
- Dieta oral **assim que a dor melhora**; persistindo a dor após 48 horas, a prova cobrou **sonda pós-papila e dieta enteral**. {q-sessp2022-036}` },
      ],
    },
    {
      id: "biliar", titulo: "Pancreatite biliar: quando tirar a vesícula",
      introducao: `[[A vesícula com cálculos é a fonte da próxima crise: na pancreatite biliar **leve**, a **colecistectomia videolaparoscópica** se faz **na mesma internação**, depois da melhora; na grave, com necrose ou coleções, a operação precoce aumenta as complicações e se **adia** até a resolução, cerca de 6 semanas ou mais.|q-adap25-005,q-iamspe2026-036,q-uspsp5-060]]`,
      fragmentos: [
        { id: "bil-colecistectomia", titulo: "Colecistectomia e coledocolitíase", conferir: true, diretrizes: ["acg-pancreatite","wses-pancreatite"],
          questoes: ["q-adap25-005","q-iamspe2026-036","q-famerp2025-075","q-uspsp1-028","q-uspsp2-075","q-uspsp2-095","q-famerp2025-076","q-uspsp5-060"],
          prosa: `[[A paciente com colelitíase, pancreatite leve, sem insuficiência de órgão, sem coleções, sem dilatação biliar e com bilirrubina normal, que melhora em 24 a 72 horas, faz **colecistectomia videolaparoscópica na mesma internação**; a CPRE com papilotomia, o ácido ursodesoxicólico e a espera de seis meses ou seis semanas estão errados; e a colecistectomia é aberta ou fechada, com ducto biliar normal.|q-adap25-005,q-iamspe2026-036,q-famerp2025-075]] [[O homem com pancreatite biliar há dois meses e múltiplos cálculos tem **colecistectomia eletiva**; a **gestante** de 14 semanas, com microcálculos, faz **colecistectomia**, no segundo trimestre, pela alta recorrência sem cirurgia.|q-uspsp2-075,q-uspsp2-095]]

[[Quando há **coleção aguda** (Balthazar D, sete dias de evolução) com coledocolitíase **anictérica**, adia-se a colecistectomia até a resolução das coleções (cerca de 6 semanas) e faz-se **controle radiológico em 6 a 8 semanas**, tratando antes só se surgir colangite ou icterícia; na pancreatite **grave** com trombose de veia porta e microlitíase, a paciente tem alta e **programa a colecistectomia ambulatorial**, sem colangiografia, pela ausência de dilatação biliar.|q-famerp2025-076,q-uspsp5-060]] [[A paciente estável, em bom estado geral, com colelitíase, amilase de 1.300 e colédoco não visualizado, recebe **jejum, hidratação e colecistectomia programada em um segundo momento**.|q-uspsp1-028]]`,
          texto: `- Colelitíase, lipase 5 vezes, melhora em 72 horas, sem coleção: **colecistectomia videolaparoscópica na mesma internação**. {q-adap25-005}
- Pancreatite biliar leve com melhora em 24 horas: **colecistectomia na mesma internação**. {q-iamspe2026-036}
- Pancreatite biliar leve, ducto normal, recuperação em 4 dias: **colecistectomia**. {q-famerp2025-075}
- Bom estado geral, amilase 1.300, colelitíase: **hidratação e colecistectomia em segundo momento** (ver Armadilhas). {q-uspsp1-028}
- Pancreatite biliar há 2 meses e cálculos: **colecistectomia eletiva**. {q-uspsp2-075}
- Gestante de 14 semanas, microcálculos: **colecistectomia**. {q-uspsp2-095}
- Balthazar D e coledocolitíase anictérica: **controle radiológico em 6 a 8 semanas**. {q-famerp2025-076}
- Pancreatite grave com trombose portal e microlitíase: **alta e colecistectomia ambulatorial**. {q-uspsp5-060}` },
      ],
    },
    {
      id: "complicacoes", titulo: "Coleções, necrose e complicações vasculares",
      introducao: `[[A pancreatite **edematosa intersticial** evolui para **coleção líquida aguda** e, depois de quatro semanas, **pseudocisto**; a **necrosante** evolui para **coleção necrótica aguda** e, depois, **necrose encapsulada** (walled-off); a coleção **sem sintoma e sem infecção** se observa, a **infectada** (febre, leucocitose, gás) se trata com antibiótico e **drenagem**.|q-iamspe2022-030,q-usp2025-036,q-uspsp3-112]]`,
      fragmentos: [
        { id: "col-aguda-pseudocisto", titulo: "Coleção aguda, pseudocisto e necrose encapsulada", conferir: true, diretrizes: ["atlanta-2012","iap-apa"],
          figuras: [{ arquivo: "figuras/colecoes-atlanta.svg", legenda: "Esquema autoral: coleções da pancreatite aguda pela classificação de Atlanta revisada e conduta." }],
          questoes: ["q-iamspe2022-030","q-scmsp2025-040","q-usp2025-036","q-unesp2022-073","q-iamspe2021-024","q-famerp2024-023","q-amrigs2025-036"],
          prosa: `[[A pancreatite **necrosante** produz coleções diferentes da edematosa: a necrosante tem coleção necrótica aguda e depois necrose encapsulada; a edematosa, coleção líquida e pseudocisto; **a necrosante não exige cirurgia o mais cedo possível**, e o acesso percutâneo ou endoscópico é eficaz.|q-iamspe2022-030]] [[A **coleção sem infecção** e sem sintoma (paciente afebril, aceitando dieta, no 16º dia; ou melhora clínica com APACHE II de 5) **não se drena**: faz-se **nutrição enteral, observação e controle de imagem** (tomografia em três meses); a idosa com coleção em delimitação, enzimas normais e afebril recebe **tratamento conservador, sem antibiótico e com suporte nutricional**; a coleção cística junto do estômago, duas semanas depois da pancreatite, também se **observa com imagem**.|q-scmsp2025-040,q-usp2025-036,q-iamspe2021-024,q-unesp2022-073]]

[[O **pseudocisto** (coleção com parede, depois de quatro semanas) pode causar saciedade precoce, vômitos e perda de peso por compressão gástrica, com amilase elevada; a coleção de 8 cm, com conteúdo líquido e sólido, parede definida e perda de peso, seis semanas depois, é **necrose encapsulada**, e não pseudocisto nem abscesso.|q-famerp2024-023,q-amrigs2025-036]]`,
          texto: `- Atlanta: necrosante tem **coleção necrótica aguda e necrose encapsulada**; edematosa, **coleção líquida e pseudocisto**; não se opera cedo. {q-iamspe2022-030}
- Recorrente biliar, APACHE II de 5, coleção sem infecção: **nutrição enteral e observação**. {q-scmsp2025-040}
- Coleção assintomática no 16º dia, sem febre: **alta e tomografia em 3 meses**. {q-usp2025-036}
- Coleção cística junto ao estômago duas semanas depois: **observação e imagem**. {q-unesp2022-073}
- Massa e coleção em delimitação, enzimas normais, afebril: **conservador, sem antibiótico, com suporte nutricional**. {q-iamspe2021-024}
- Coleções circunscritas com parede, compressão gástrica e perda de 25 kg: **pseudocisto**. {q-famerp2024-023}
- Coleção de 8 cm com sólido e líquido, 6 semanas: **necrose pancreática encapsulada**. {q-amrigs2025-036}` },
        { id: "necrose-infectada", titulo: "Necrose infectada: antibiótico, drenagem e abordagem escalonada", conferir: true, diretrizes: ["iap-apa","wses-pancreatite"],
          questoes: ["q-famema2021-003","q-uspsp3-112","q-didepm-067","q-einstein2027-027"],
          prosa: `A necrose é estéril no início e se infecta, em geral depois da segunda semana, por bactérias do intestino. [[O gás na coleção, a febre e a leucocitose indicam **necrose infectada**, e a estratégia é a **abordagem escalonada (step-up)**: antibiótico e **drenagem percutânea (ou endoscópica)** primeiro, e **desbridamento** só se não houver melhora; a necrosectomia aberta imediata não é o tratamento padrão; a **colecistectomia** imediata e o jejum com parenteral também não.|q-uspsp3-112,q-didepm-067]] [[A **nutrição enteral precoce** reduz a incidência da infecção da necrose, e a sonda serve para nutrir, e não para descomprimir; o antibiótico profilático prolongado não previne a complicação.|q-einstein2027-027]] [[A exceção é a necrose infectada com **síndrome compartimental e falência de órgãos**, em que a prova cobrou **laparotomia com descompressão e drenagem**.|q-famema2021-003]]`,
          texto: `- Pancreatite grave há 23 dias, coleção com gás, piora com imipenem: **drenagem percutânea** (step-up). {q-uspsp3-112}
- Necrose infectada em 4 semanas: **antibióticos e drenagem percutânea ou endoscópica**, desbridamento se não melhorar. {q-didepm-067}
- Necrose infectada tardia: a **nutrição enteral precoce** reduz sua incidência; a sonda nutre. {q-einstein2027-027}
- Necrose infectada com síndrome compartimental: a prova cobrou **laparotomia e drenagem** (ver Armadilhas). {q-famema2021-003}` },
        { id: "vasculares", titulo: "Trombose portal e esplênica e hipertensão portal segmentar", conferir: true,
          questoes: ["q-uspsp5-059","q-einstein2027-023"],
          prosa: `A inflamação e o pseudocisto comprimem e lesam as veias vizinhas. [[A **trombose de veia porta** em pancreatite grave (veia sem realce normal na tomografia) se trata com **anticoagulação plena** e sonda nasoenteral para nutrição, e não com nutrição parenteral nem antibiótico.|q-uspsp5-059]] [[A hematêmese meses depois de pancreatite necrosante, com **varizes restritas ao fundo gástrico**, esplenomegalia e fígado normal, é **hipertensão portal segmentar** por trombose da veia esplênica, e o tratamento é a **esplenectomia**, não TIPS nem embolização.|q-einstein2027-023]]`,
          texto: `- Pancreatite grave com trombose de veia porta: **sonda nasoenteral e anticoagulação plena**. {q-uspsp5-059}
- Hematêmese após necrosante, varizes de fundo gástrico e esplenomegalia: **trombose da veia esplênica**, **esplenectomia**. {q-einstein2027-023}` },
      ],
    },
    {
      id: "cronica", titulo: "Pancreatite crônica",
      introducao: `[[Na pancreatite crônica a inflamação repetida destrói a glândula e a substitui por fibrose e calcificações: o etilista de longa data, com dor epigástrica em faixa recorrente, perda de peso e **esteatorreia** (fezes volumosas, oleosas, que flutuam), tem insuficiência **exócrina** e, depois, **endócrina** (diabetes).|q-usp2024-044,q-usprp2026-088,q-sessp2026-037]]`,
      fragmentos: [
        { id: "cron-quadro", titulo: "Quadro, imagem e tratamento", conferir: true, diretrizes: ["acg-pancreatite"],
          questoes: ["q-usp2024-044","q-usprp2026-088","q-sessp2026-037"],
          prosa: `[[A tomografia da pancreatite crônica mostra **calcificações pancreáticas** e atrofia com dilatação ductal; a causa da diarreia crônica volumosa, fétida e oleosa, com dor pós-prandial e perda de peso, é a **insuficiência exócrina**, e não a síndrome do intestino irritável nem o supercrescimento bacteriano; o quadro é **irreversível**, com insuficiência exócrina e endócrina, e o tratamento é **suporte nutricional e reposição de enzimas**.|q-usp2024-044,q-usprp2026-088,q-sessp2026-037]]`,
          texto: `- Dor em faixa recorrente, perda de peso, diarreia e etilismo: **pancreatite crônica**; tomografia com **calcificações**. {q-usp2024-044}
- Fezes oleosas que flutuam, dor pós-prandial e perda de 8 kg: **insuficiência exócrina**. {q-usprp2026-088}
- Pâncreas atrófico com calcificações, diabetes e esteatorreia: **irreversível**; **suporte nutricional e reposição enzimática**. {q-sessp2026-037}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-tp20252-049","q-iamspe2021-031","q-sessp2022-036","q-famema2021-003","q-famerp2025-076","q-uspsp1-028","q-tp20222-066"],
          prosa: `[[A regra atual é **reintroduzir a dieta assim que a dor melhora**; a Teste de Progresso 2025 cobrou **jejum absoluto, hidratação e analgesia**, o IAMSPE 2021 deu como certo o tripé "jejum, hidratação e analgesia" e a SES-SP 2022 cobrou a **sonda endoscópica pós-papila** se a dor persistisse após 48 horas.|q-tp20252-049,q-iamspe2021-031,q-sessp2022-036]] [[A regra é o **step-up** na necrose infectada; a FAMEMA 2021 cobrou **laparotomia com descompressão** no caso com síndrome compartimental.|q-famema2021-003]] [[Na pancreatite biliar leve a colecistectomia é na mesma internação; a USP-SP 2025 cobrou **hidratação e colecistectomia em um segundo momento** na paciente estável, e a FAMERP 2025 cobrou **controle radiológico em 6 a 8 semanas** na coleção com coledocolitíase anictérica.|q-uspsp1-028,q-famerp2025-076]] [[A reposição é **moderada** (cerca de 1,5 mL/kg/h); a Teste de Progresso 2022 cobrou **hidratação agressiva com cristaloides**.|q-tp20222-066]]`,
          texto: `- Regra: dieta assim que a dor melhora; a prova (TP 2025) cobrou **jejum absoluto**, a (IAMSPE 2021), o tripé com **jejum**, e a (SES-SP 2022), **sonda pós-papila após 48 horas**. {q-tp20252-049,q-iamspe2021-031,q-sessp2022-036}
- Regra: necrose infectada se trata por **step-up**; a prova (FAMEMA 2021) cobrou **laparotomia** com síndrome compartimental. {q-famema2021-003}
- Regra: colecistectomia na **mesma internação** na biliar leve; a prova (USP-SP 2025) cobrou **segundo momento** e a (FAMERP 2025), **controle radiológico** em 6 a 8 semanas com coleção. {q-uspsp1-028,q-famerp2025-076}
- Regra: hidratação **moderada**; a prova (TP 2022) cobrou **hidratação agressiva**. {q-tp20222-066}` },
      ],
    },
  ],
});
