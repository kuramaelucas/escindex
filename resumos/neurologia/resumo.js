/* resumos/neurologia/resumo.js — resumo adaptativo de neurologia clínica: epilepsia e estado de mal,
   coma e morte encefálica, cefaleias, tontura e vertigem, distúrbios do movimento (Parkinson, tremor
   essencial, parkinsonismo por drogas). Assuntos: ass-neuro-epilepsia (principal), ass-neuro-coma,
   ass-neuro-cefaleias, ass-neuro-vertigem, ass-neuro-movimento.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- neurologia */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "neurologia",
  titulo: "Neurologia: epilepsia, coma, cefaleia, vertigem e movimento",
  assunto: "ass-neuro-epilepsia",
  criadoEm: "2026-11-25",
  fontes: [
    { id: "ilae", texto: "ILAE 2014/2017 — definição operacional de epilepsia e classificação das crises; Neurocritical Care Society/AES — manejo do estado de mal epiléptico", lidoEm: null },
    { id: "cfm-me", texto: "Resolução CFM nº 2.173/2017 — critérios do diagnóstico de morte encefálica", lidoEm: null },
    { id: "ichd3", texto: "ICHD-3 (Classificação Internacional das Cefaleias, 3ª ed.) e consenso da SBCe sobre tratamento da migrânea", lidoEm: null },
    { id: "mds-parkinson", texto: "MDS 2015 — critérios clínicos da doença de Parkinson", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anulada pela banca", questoes: ["q-sessp2024-054"] },
  ],
  doencas: [
    {
      id: "epilepsia", titulo: "Crises epilépticas e epilepsia",
      introducao: `[[A crise epiléptica é uma descarga **excessiva e síncrona** de neurônios corticais; o freio natural dessa excitação é o **GABA**. Por isso as drogas do estado de mal (benzodiazepínicos, fenobarbital) **potencializam a inibição GABAérgica**: abrem o canal de cloreto e hiperpolarizam o neurônio.|q-tp20202-008,q-tp20232-033,q-tp20241-029,q-tp20261-080]] [[Crise **provocada** (sintomática aguda) tem causa imediata — **hipoglicemia, hiponatremia, uremia, hipocalcemia**, abstinência, infecção do SNC, AVC, trauma — e se trata a causa; **epilepsia** é a tendência a crises **não provocadas**: duas com mais de 24 h de intervalo, ou uma com risco alto de repetir (lesão na imagem, EEG epileptiforme), ou uma síndrome epiléptica.|q-tp20202-034,q-famerp2022-055,q-einstein2027-012]]

Veja também: **Convulsão febril**, **Meningites**, **Acidente vascular cerebral**, **Traumatismo cranioencefálico** e **Demência e delirium**.`,
      fragmentos: [
        { id: "epi-primeira-crise", titulo: "Primeira crise: investigar a causa", conferir: true, diretrizes: ["ilae"],
          questoes: ["q-tp20202-034","q-famerp2022-055","q-famerp2026-063","q-einstein2027-012","q-unesp2021-098"],
          prosa: `[[Diante da primeira crise, procure o que a provocou: **glicemia, sódio, cálcio, magnésio, ureia**, tomografia de crânio e ECG; **líquor** se há febre, imunossupressão ou alteração do comportamento que sugere **encefalite** (viral, herpética, autoimune).|q-tp20202-034,q-famerp2022-055,q-famerp2026-063]] [[Uma crise **não provocada isolada**, com exame e investigação normais, **ainda não é epilepsia**. A epilepsia do **lobo temporal** é a mais comum do adulto, ligada à **esclerose hipocampal**, e quando resiste aos remédios tem **tratamento cirúrgico**.|q-einstein2027-012,q-unesp2021-098]]`,
          texto: `- Idoso encontrado caído, sonolento, metabólico alterado: **crise provocada**. {q-tp20202-034}
- Investigar: **TC, eletrólitos, glicemia, ECG; líquor** se febre/encefalite. {q-famerp2022-055,q-famerp2026-063}
- Uma crise não provocada: **não é epilepsia** ainda. {q-einstein2027-012}
- Temporal: **esclerose hipocampal**, cirurgia possível. {q-unesp2021-098}` },
        { id: "epi-estado-de-mal", titulo: "Estado de mal epiléptico", conferir: true, diretrizes: ["ilae"],
          questoes: ["q-tp20222-057","q-scmsp2023-051","q-uspsp5-114","q-usp2024-018","q-usprp2025-015","q-unicamp2022-036","q-unesp2026-008","q-scmsp2023-052","q-unesp2022-058","q-tp20202-008","q-tp20232-033","q-tp20241-029","q-tp20261-080"],
          prosa: `[[**Estado de mal** é crise que dura **5 minutos ou mais**, ou crises repetidas sem recuperar a consciência entre elas: depois disso ela raramente para sozinha e começa a lesar neurônios. Tempo zero: via aérea, oxigênio, **glicemia**. **Primeira linha: benzodiazepínico** — com acesso venoso, **diazepam IV (0,3 mg/kg na criança)** ou lorazepam; **sem acesso**, **midazolam IM, intranasal ou bucal**. Pode repetir uma vez.|q-tp20222-057,q-scmsp2023-051,q-uspsp5-114,q-usp2024-018,q-usprp2025-015,q-unicamp2022-036]] [[Persistindo, **segunda linha**: **fenitoína 20 mg/kg em infusão lenta** (até 50 mg/min, em 20–30 minutos, com **monitorização cardíaca** — **nunca em bolus**, causa arritmia e hipotensão), ou valproato, levetiracetam, fenobarbital. A crise focal motora contínua (epilepsia parcial contínua) no diabético descompensado também é estado de mal: benzodiazepínico, fenitoína e **corrigir a glicemia**.|q-unesp2026-008,q-scmsp2023-052,q-unesp2022-058]]`,
          texto: `- Crise ≥ 5 min: **estado de mal** → benzodiazepínico já. {q-tp20222-057}
- Com veia: **diazepam IV**; sem veia: **midazolam IM/intranasal**. {q-scmsp2023-051,q-uspsp5-114,q-usp2024-018,q-usprp2025-015,q-unicamp2022-036}
- Mecanismo: **potencializa o GABA**. {q-tp20202-008,q-tp20232-033,q-tp20241-029,q-tp20261-080}
- 2ª linha: **fenitoína 20 mg/kg lenta, sem bolus**, monitorizada. {q-unesp2026-008,q-scmsp2023-052}
- Focal contínua no diabético: **midazolam, fenitoína e glicemia**. {q-unesp2022-058}` },
        { id: "epi-infancia", titulo: "Síndromes da infância e convulsão neonatal", conferir: true, diretrizes: ["ilae"],
          questoes: ["q-amrigs2025-066","q-amrigs2025-067","q-amrigs2025-068","q-amrigs2022-077"],
          prosa: `[[**Síndrome de West**: lactente de 3 a 12 meses com **espasmos em salvas** (flexão súbita do tronco, ao despertar), **regressão** do desenvolvimento e **hipsarritmia** no EEG; urgência neurológica, tratada com ACTH, corticoide ou vigabatrina. **Ausência típica**: escolar com desligamentos de segundos, muitas vezes ao dia, desencadeados pela **hiperventilação** (ponta-onda de 3 Hz): **etossuximida, valproato ou lamotrigina**. **Epilepsia rolândica** (autolimitada com pontas centrotemporais): criança de 3 a 13 anos com crises **noturnas** que pegam **face e orofaringe** (sialorreia, fala travada), consciente; benigna, some na adolescência.|q-amrigs2025-066,q-amrigs2025-067,q-amrigs2025-068]] [[No **recém-nascido**, a causa mais comum de crise é a **encefalopatia hipóxico-isquêmica**; depois, AVC, hemorragia, infecção e distúrbios metabólicos.|q-amrigs2022-077]]`,
          texto: `- Espasmos em salvas + regressão: **West**. {q-amrigs2025-066}
- Ausência: **etossuximida, valproato, lamotrigina**. {q-amrigs2025-067}
- Crise noturna de face na criança: **rolândica**. {q-amrigs2025-068}
- RN: **encefalopatia hipóxico-isquêmica**. {q-amrigs2022-077}` },
      ],
    },
    {
      id: "coma", titulo: "Coma e morte encefálica",
      introducao: `[[A consciência depende do **sistema reticular ativador** do tronco e dos dois hemisférios: coma é lesão do tronco ou dos **dois** hemisférios, ou um problema difuso (tóxico, metabólico). O exame localiza: **pupilas médio-fixas** = mesencéfalo; puntiformes = ponte ou opioide; **midríase de um lado sem reação** = compressão do III nervo (**herniação do uncus**, aneurisma, às vezes enxaqueca); **decorticação** (flexão dos braços, extensão das pernas) = lesão acima do mesencéfalo; descerebração (extensão de tudo) = mais baixa e pior.|q-usp2024-068,q-amrigs2022-008,q-amrigs2025-062]]`,
      fragmentos: [
        { id: "com-avaliacao", titulo: "Avaliar o paciente em coma", conferir: true,
          questoes: ["q-usp2024-068","q-amrigs2022-008","q-amrigs2025-062","q-usp2024-069","q-amrigs2024-077","q-tp20251-022"],
          prosa: `[[A **escala de Glasgow** vale para coma **traumático e não traumático**: abertura ocular (1–4), verbal (1–5) e motora (1–6); **3 é o mínimo**, coma profundo, **não é morte**. A **prova calórica** testa o tronco: **água fria** num ouvido com tronco íntegro dá **desvio tônico do olhar para o lado irrigado**; a fase rápida do nistagmo para o outro lado só aparece se o córtex funciona.|q-amrigs2024-077,q-usp2024-069]] [[Antes de tudo, **glicemia capilar**: o diabético em uso de sulfonilureia que "não acordou" está hipoglicêmico até prova em contrário.|q-tp20251-022]]`,
          texto: `- Médio-fixas: **mesencéfalo**; midríase unilateral: **III nervo** (herniação, enxaqueca). {q-usp2024-068,q-amrigs2022-008}
- Decorticação: lesão **acima** do mesencéfalo. {q-amrigs2025-062}
- Água fria: desvio **para o lado irrigado**. {q-usp2024-069}
- Glasgow: traumático e não traumático; 3 não é morte. {q-amrigs2024-077}
- Coma no diabético: **glicemia capilar**. {q-tp20251-022}` },
        { id: "com-morte-encefalica", titulo: "Protocolo de morte encefálica", conferir: true, diretrizes: ["cfm-me"],
          questoes: ["q-unicampdis2025-017","q-unicamp2022-022","q-usprp2022-034","q-sirio2023-056","q-einstein2022-014","q-udisc20262-002","q-unicampdis2023-005","q-tp20231-014","q-famema2023-067","q-usp2024-070"],
          prosa: `[[Pré-requisitos (CFM 2.173/2017): **lesão encefálica de causa conhecida e irreversível**, **sem confundidores** (hipotermia, sedativos, distúrbio metabólico grave), temperatura > 35 °C, PAM adequada e **observação mínima de 6 horas** — **24 horas** depois de **lesão anóxica** (parada cardíaca, estrangulamento). A família é **comunicada** quando o protocolo começa.|q-unicampdis2025-017,q-unicamp2022-022,q-usprp2022-034]] [[O protocolo tem: **dois exames clínicos** por médicos diferentes (coma não perceptivo, **ausência de reflexos de tronco**, pupilas médio-fixas ou midriáticas) com intervalo mínimo conforme a idade — **1 hora a partir de 2 anos**, 12 h de 2 a 24 meses, 24 h de 7 dias a 2 meses; **um teste de apneia** (positivo se **não há movimento respiratório com PaCO2 > 55 mmHg**; se não chegar a 55, é inconclusivo e se repete); e **um exame complementar** (angiografia, Doppler transcraniano, EEG). O **horário do óbito** é o da **conclusão do último procedimento**. **Doador efetivo** é aquele em que a cirurgia de captação começou.|q-sirio2023-056,q-einstein2022-014,q-udisc20262-002,q-unicampdis2023-005,q-tp20231-014,q-famema2023-067,q-usp2024-070]]`,
          texto: `- Após PCR/anóxia: esperar **24 h**; sem confundidores; comunicar a família ao abrir. {q-unicamp2022-022,q-unicampdis2025-017,q-usprp2022-034}
- **2 exames clínicos + 1 apneia + 1 complementar**. {q-sirio2023-056,q-usp2024-070}
- Apneia: **PaCO2 > 55** sem movimento; abaixo disso, repetir. {q-einstein2022-014,q-udisc20262-002}
- Hora do óbito: **último procedimento**. {q-unicampdis2023-005,q-tp20231-014}
- Doador efetivo: **iniciada a captação**. {q-famema2023-067}` },
      ],
    },
    {
      id: "cefaleias", titulo: "Cefaleias",
      introducao: `[[A maior parte das cefaleias é **primária** (a dor é a doença): **tensional** (a mais comum), **enxaqueca** e cefaleias trigeminoautonômicas (**salvas**). O primeiro passo é procurar os **sinais de alarme** de cefaleia **secundária**: sintomas sistêmicos (febre, perda de peso), sinais neurológicos, **início súbito ("em trovoada")**, início depois dos 50 anos, mudança de padrão, piora com Valsalva ou posição, **gestação/puerpério** e **imunossupressão**.|q-scmsp2022-070,q-amrigs2025-001,q-iamspe2022-014]]`,
      fragmentos: [
        { id: "cef-enxaqueca", titulo: "Enxaqueca: crise e profilaxia", conferir: true, diretrizes: ["ichd3"],
          questoes: ["q-tp20232-050","q-tp20261-028","q-sessp2025-002","q-unicampdis2023-001","q-tp20251-021","q-tp20261-048","q-amrigs2021-078","q-usp2022-002"],
          prosa: `[[Enxaqueca: crises de **4 a 72 horas** (na criança, a partir de 2 h e muitas vezes bilateral), dor **unilateral, pulsátil**, moderada a forte, que **piora com esforço**, com **náusea** ou **foto e fonofobia**. É uma ativação do sistema trigeminovascular, com neuropeptídeos (CGRP) que inflamam os vasos meníngeos.|q-tp20232-050,q-tp20261-028,q-unicampdis2023-001]] [[Crise forte no pronto-socorro com náusea: **metoclopramida** (antiemético e analgésico), dipirona ou AINE e **dexametasona** para reduzir a recorrência; triptano se não há contraindicação. **Profilaxia** quando há **4 ou mais crises por mês** ou crises incapacitantes: **topiramato** (bom no obeso, emagrece), **amitriptilina**, **divalproato**, propranolol. Analgésico em **10 a 15 dias por mês** transforma a enxaqueca em **cefaleia por uso excessivo de medicação**: suspender o abuso e iniciar profilaxia.|q-sessp2025-002,q-unicampdis2023-001,q-tp20251-021,q-tp20261-048,q-amrigs2021-078,q-usp2022-002]]`,
          texto: `- Criança: frontotemporal pulsátil, foto/fonofobia, horas: **migrânea sem aura**. {q-tp20232-050,q-tp20261-028}
- Crise com náusea: **metoclopramida + dexametasona**. {q-sessp2025-002}
- ≥ 4 crises/mês: **profilaxia**; obesa: **topiramato**; também amitriptilina e valproato. {q-unicampdis2023-001,q-tp20251-021,q-tp20261-048,q-amrigs2021-078}
- Analgésico frequente: **cefaleia por uso excessivo**. {q-usp2022-002}` },
        { id: "cef-tensional-salvas", titulo: "Tensional, salvas e trovoada", conferir: true, diretrizes: ["ichd3"],
          questoes: ["q-iamspe2022-014","q-famema2023-035","q-amrigs2025-001","q-tp20202-055","q-tp20241-050","q-sirio2024-011","q-einstein2025-065","q-usprp2024-059","q-unicampdis2025-053","q-uspsp3-093","q-scmsp2022-070"],
          prosa: `[[**Tensional**: **bilateral, em peso ou aperto**, leve a moderada, **não piora com esforço**, **sem náusea** e com **no máximo um** entre foto e fonofobia; exame normal. Episódica: **AINE** e medidas não farmacológicas (massagem, sono, identificar gatilhos, inclusive na criança). **Crônica** (15 dias ou mais por mês): **amitriptilina**. A pressão alta não é a causa da cefaleia tensional.|q-iamspe2022-014,q-famema2023-035,q-amrigs2025-001,q-tp20202-055,q-tp20241-050,q-sirio2024-011,q-einstein2025-065]] [[**Salvas**: homem jovem, dor **estritamente unilateral, orbitária ou temporal, excruciante, de 15 a 180 minutos**, várias por dia, muitas vezes à noite, em períodos de semanas, com **lacrimejamento, hiperemia conjuntival, rinorreia e ptose do mesmo lado**. Crise: **oxigênio a 100% (10–15 L/min)** e **sumatriptano subcutâneo**; profilaxia com verapamil. Na **primeira** crise intensa, afastar causa secundária com **tomografia e angiotomografia**.|q-usprp2024-059,q-unicampdis2025-053,q-uspsp3-093,q-scmsp2022-070]]`,
          texto: `- Bilateral em aperto, sem náusea: **tensional** (a mais comum); crônica: **amitriptilina**. {q-iamspe2022-014,q-famema2023-035,q-amrigs2025-001,q-sirio2024-011}
- Criança: **gatilhos e ibuprofeno**. {q-tp20202-055,q-tp20241-050}
- Hipertensa com tensional: **AINE e medidas não farmacológicas**. {q-einstein2025-065}
- Unilateral orbitária + lacrimejamento: **salvas** → **O2 100% + sumatriptano SC**. {q-usprp2024-059,q-unicampdis2025-053}
- Primeira crise intensa: **TC e angio-TC**. {q-uspsp3-093}
- Alarme: sistêmicos, **gestação, imunossupressão**. {q-scmsp2022-070}` },
      ],
    },
    {
      id: "vertigem", titulo: "Tontura e vertigem",
      introducao: `[[Vertigem é a ilusão de **rotação**: assimetria entre os dois labirintos ou entre as vias vestibulares centrais. A pergunta que decide é **periférica ou central**. Periférica (labirinto, nervo vestibular): vertigem intensa com náusea, nistagmo **horizontal-torcional que bate para um lado e melhora fixando o olhar**, sem outros sinais neurológicos, e a pessoa **consegue ficar de pé**. Central (tronco, cerebelo — quase sempre **AVC da circulação posterior**): **idoso com fatores de risco cardiovascular**, tontura contínua, **incapacidade de ficar de pé**, nistagmo vertical ou que muda de direção, sonolência, disartria, diplopia.|q-adap25-019,q-sirio2024-086,q-einstein2024-066]]`,
      fragmentos: [
        { id: "ver-periferica", titulo: "VPPB, neurite vestibular e Ménière", conferir: true,
          questoes: ["q-famema2025-011","q-einstein2023-009","q-unifesp2025-019","q-usp2024-053","q-uspsp3-073","q-unicamp2023-004","q-famerp2025-016","q-uspsp5-012"],
          prosa: `[[**VPPB**: crises de **segundos** desencadeadas por **mudar a cabeça de posição** (deitar, virar na cama), por otólitos soltos no canal semicircular posterior. Diagnóstico pela **manobra de Dix-Hallpike** (nistagmo **torcional batendo para a orelha de baixo**); tratamento pela **manobra de reposição (Epley)**, não por remédio.|q-famema2025-011,q-einstein2023-009]] [[**Neurite vestibular**: vertigem **súbita e contínua por dias**, com náusea e vômitos, que piora ao mexer a cabeça, **sem perda auditiva**. **Doença de Ménière**: excesso de endolinfa — **crises de minutos a horas** com **zumbido, plenitude auricular e perda auditiva neurossensorial flutuante em graves**, que pede **audiometria**; afeta os dois sexos igualmente, a partir da 4ª–5ª década. Perda **condutiva + neurossensorial** na audiometria (gap aéreo-ósseo e via óssea rebaixada) = **perda mista**.|q-unifesp2025-019,q-usp2024-053,q-uspsp3-073,q-unicamp2023-004,q-famerp2025-016,q-uspsp5-012]]`,
          texto: `- Segundos, ao mudar de posição: **VPPB** → **Dix-Hallpike** (torcional para a orelha de baixo). {q-famema2025-011,q-einstein2023-009}
- Súbita, contínua, sem perda auditiva: **neurite vestibular**. {q-unifesp2025-019}
- Minutos a horas + zumbido + plenitude + hipoacusia: **Ménière** → **audiometria**. {q-usp2024-053,q-uspsp3-073,q-unicamp2023-004,q-famerp2025-016}
- Condução + neurossensorial: **perda mista**. {q-uspsp5-012}` },
        { id: "ver-central", titulo: "Vertigem central: pensar em AVC", conferir: true,
          questoes: ["q-adap25-019","q-sirio2024-086","q-einstein2024-066","q-sessp2024-011","q-usprp2026-028","q-uspsp5-090"],
          prosa: `[[Idoso hipertenso e diabético com **tontura contínua há horas ou dias**, sem gatilho posicional, com **sonolência** ou incapaz de andar: **vertigem central**, AVC de fossa posterior até prova em contrário. Encaminhar **com urgência** e investigar com **ressonância** (a tomografia vê mal a fossa posterior e é normal nas primeiras horas).|q-adap25-019,q-sirio2024-086,q-einstein2024-066,q-sessp2024-011,q-usprp2026-028,q-uspsp5-090]]`,
          texto: `- Contínua, idoso com risco CV, não fica de pé: **AVC posterior**. {q-adap25-019,q-sirio2024-086,q-einstein2024-066}
- Investigar com **ressonância**, em **urgência**. {q-sessp2024-011,q-usprp2026-028,q-uspsp5-090}` },
      ],
    },
    {
      id: "movimento", titulo: "Distúrbios do movimento",
      introducao: `[[Na **doença de Parkinson**, morrem os neurônios dopaminérgicos da **substância negra**; o estriado sem dopamina freia o movimento. O núcleo do diagnóstico é a **bradicinesia** (lentidão com perda de amplitude — a letra e a **espiral vão diminuindo, micrografia**) com **tremor de repouso de 4 a 6 Hz** (melhora ao mover) ou **rigidez em roda denteada**, **assimétricos** no início. Anos antes do motor vêm os sintomas **pré-motores**: **anosmia, constipação, transtorno comportamental do sono REM** e depressão.|q-adap24-042,q-adap22-087,q-unesp2023-057,q-uspsp4-011]]`,
      fragmentos: [
        { id: "mov-parkinson", titulo: "Parkinson e parkinsonismo por drogas", conferir: true, diretrizes: ["mds-parkinson"],
          questoes: ["q-adap24-042","q-adap22-087","q-unesp2023-057","q-uspsp4-011","q-usp2024-071","q-usp2026-020","q-sessp2023-077","q-tp20232-011","q-tp20241-011"],
          prosa: `[[Tratamento: **levodopa associada a inibidor da dopa-descarboxilase** (carbidopa, benserazida), começando em dose baixa; agonistas e IMAO-B são alternativas no jovem. Com os anos vêm flutuações e, em cerca de **20%**, **psicose** (alucinações, delírios), ligada à doença avançada e aos dopaminérgicos.|q-adap22-087,q-usp2024-071]] [[**Parkinsonismo induzido por droga**: **simétrico**, instalado em semanas depois de um **bloqueador dopaminérgico** — antieméticos (**metoclopramida, bromoprida**), **cinarizina/flunarizina**, antipsicóticos típicos e **risperidona/olanzapina**. Conduta: **suspender**; se o antipsicótico for necessário, trocar por **clozapina ou quetiapina**, que quase não bloqueiam o receptor D2 estriatal.|q-usp2026-020,q-sessp2023-077,q-tp20232-011,q-tp20241-011]]`,
          texto: `- Bradicinesia + tremor de repouso + rigidez, assimétricos: **Parkinson**; micrografia. {q-adap24-042,q-uspsp4-011}
- Pré-motores: **anosmia, constipação, sono REM**. {q-unesp2023-057}
- Tratamento: **levodopa + inibidor da descarboxilase**. {q-adap22-087}
- Psicose em ~**20%**, na fase avançada. {q-usp2024-071}
- Após bromoprida, cinarizina, risperidona: **parkinsonismo por droga** → suspender; **clozapina**. {q-usp2026-020,q-sessp2023-077,q-tp20232-011,q-tp20241-011}` },
        { id: "mov-outros", titulo: "Tremor essencial, mioclonia e ataxia", conferir: true,
          questoes: ["q-adap24-087","q-unifesp2024-081","q-amrigs2020-096","q-unifesp2022-087"],
          prosa: `[[**Tremor essencial**: tremor **postural e de ação** (ao segurar a xícara), bilateral, de longa data, **familiar** (autossômico dominante), que **melhora com álcool**; sem bradicinesia. Diagnóstico **clínico**, sem exames; tratar quando atrapalha: **propranolol** ou primidona.|q-adap24-087,q-unifesp2024-081]] [[**Mioclonia**: contrações **súbitas, breves (< 100 ms), em choque**. **Ataxia de marcha** (base alargada, cambaleante) no etilista: degeneração do **cerebelo** (vermis).|q-amrigs2020-096,q-unifesp2022-087]]`,
          texto: `- Tremor de ação familiar: **essencial**; clínico; **propranolol**. {q-adap24-087,q-unifesp2024-081}
- Abalos breves em choque: **mioclonia**. {q-amrigs2020-096}
- Etilista com marcha instável: **ataxia cerebelar**. {q-unifesp2022-087}` },
      ],
    },
  ],
});
