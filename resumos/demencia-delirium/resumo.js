/* resumos/demencia-delirium/resumo.js — resumo adaptativo de demência e delirium (ass-geriatria-demencia):
   delirium (mecanismo, CAM, fatores, causas, prevenção e tratamento), queixa cognitiva (CCL, depressão,
   investigação e causas reversíveis), doença de Alzheimer, corpos de Lewy, frontotemporal, vascular,
   hidrocefalia de pressão normal e hematoma subdural, estadiamento, armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- demencia-delirium */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "demencia-delirium",
  titulo: "Demência e delirium",
  assunto: "ass-geriatria-demencia",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "nice-delirium", texto: "NICE — Delirium: prevention, diagnosis and management in hospital and long-term care (CG103, atualização 2023) e American Geriatrics Society (delirium pós-operatório, 2015)", lidoEm: null },
    { id: "abn-demencia", texto: "Academia Brasileira de Neurologia — Recomendações para o diagnóstico e tratamento da doença de Alzheimer e das demências (Dement Neuropsychol 2022)", lidoEm: null },
    { id: "lewy-consenso", texto: "McKeith et al. — Diagnosis and management of dementia with Lewy bodies: fourth consensus report of the DLB Consortium (Neurology 2017)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-sirio2025-020"] },
  ],
  doencas: [
    {
      id: "delirium", titulo: "Delirium",
      introducao: `[[Delirium é a falência aguda do cérebro: um cérebro com pouca reserva (idade, demência, déficit sensorial, Parkinson) encontra um insulto (infecção, cirurgia, droga, distúrbio metabólico, desidratação, dor, retenção urinária) e a rede de atenção desaba. O que define é o início agudo e a flutuação, com desatenção, mais pensamento desorganizado ou alteração do nível de consciência; alucinações visuais e inversão do sono-vigília são comuns. É urgência médica: a causa pode matar, e o próprio delirium aumenta mortalidade e declínio.|q-amrigs2025-002,q-unesp2025-045,q-usp2024-072,q-famerp2024-075,q-einstein2025-014,q-sirio2021-011]]

Veja também: **Intoxicações** (anticolinérgicos), **Sepse**, **Cuidados perioperatórios**, **Hidroeletrolítico** (hiponatremia) e **Transtornos do humor** (depressão no idoso) quando houver resumo.`,
      fragmentos: [
        { id: "del-diagnostico", titulo: "Diagnóstico e causas", conferir: true, diretrizes: ["nice-delirium"],
          figuras: [{ arquivo: "figuras/delirium-demencia.svg", legenda: "Esquema autoral: como o delirium e a demência se comportam no tempo e o que procurar." }],
          questoes: ["q-amrigs2025-002","q-unesp2025-045","q-usp2024-072","q-famerp2024-075","q-einstein2025-014","q-sirio2021-011","q-unifesp2022-095","q-unifesp2026-032","q-usp2023-048","q-amrigs2021-019","q-iamspe2023-001","q-famema2025-084","q-unesp2024-059","q-uspsp2-013","q-uspsp1-061","q-sessp2023-072","q-sirio2023-029","q-sirio2026-013","q-tp20212-040"],
          prosa: `[[O Confusion Assessment Method pede início agudo e curso flutuante e desatenção, mais pensamento desorganizado ou nível de consciência alterado; a atenção é a função que mais falha. Pode ser hiperativo (agitação, arrancar cateteres) ou hipoativo (sonolência, apatia), este mais comum e mais esquecido.|q-amrigs2025-002,q-unesp2025-045,q-usp2024-072,q-usp2023-048,q-unifesp2026-032]] [[No idoso com demência, uma piora súbita de comportamento em dias é delirium sobreposto até prova em contrário: procuram-se infecção (urina, pulmão), distúrbios hidroeletrolíticos, desidratação, retenção urinária, dor e remédios (benzodiazepínicos como o midazolam, anticolinérgicos, opioides). Os exames iniciais são hemograma, urina, eletrólitos e função renal; imagem só com sinal focal ou queda.|q-unifesp2022-095,q-uspsp1-061,q-sessp2023-072,q-sirio2023-029,q-sirio2026-013]] [[Pós-operatório, UTI e internação são os cenários clássicos: fator predisponente (idade acima de 65, demência, Parkinson) somado a precipitante (infecção, cirurgia). Delirium não é transtorno psicótico primário nem demência nova, e resolvido o fator, não impede a alta.|q-iamspe2023-001,q-famema2025-084,q-unesp2024-059,q-uspsp2-013,q-amrigs2021-019,q-tp20212-040]]`,
          texto: `- Delirium: **déficit de atenção e de consciência**. {q-amrigs2025-002}
- CAM: **alteração aguda do estado mental e desatenção**. {q-unesp2025-045}
- Função mais afetada: **atenção**. {q-usp2024-072}
- Confusão há 2 dias com recusa alimentar: **delirium, urgência médica**. {q-famerp2024-075}
- Fatores: **idade, Parkinson e pneumonia**. {q-einstein2025-014}
- Predisponente, precipitante, prevenção: **idade, infecção, luz de dia e escuro à noite**. {q-sirio2021-011}
- Demente com agitação há 2 dias: **demência e delirium**. {q-unifesp2022-095}
- Agitação ao entardecer com quedas: **delirium hiperativo**. {q-unifesp2026-032}
- Sonolência há 3 dias na demente: **delirium flutuante**. {q-usp2023-048}
- Incorreta: **transtorno delirante prévio**. {q-amrigs2021-019}
- Após prótese de joelho: **não impede a alta, afastadas as causas**. {q-iamspe2023-001}
- Pós-operatório de coluna: **delirium pós-operatório**. {q-famema2025-084}
- Pneumonia com desorientação e ideias persecutórias: **delirium**. {q-unesp2024-059}
- Sepse na UTI: **tratar a causa**. {q-uspsp2-013}
- Alzheimer estável que piorou de repente: **procurar infecção na emergência**. {q-uspsp1-061}
- Diarreia e apatia: **hemograma, urina, eletrólitos e função renal**. {q-sessp2023-072}
- Pós-colecistectomia: **revisar remédios e eletrólitos**. {q-sirio2023-029}
- Associação com delirium: **midazolam**. {q-sirio2026-013}
- Antes da cirurgia de próstata: **delirium; butirofenona**. {q-tp20212-040}` },
        { id: "del-tratamento", titulo: "Prevenção e tratamento", conferir: true, diretrizes: ["nice-delirium"],
          questoes: ["q-unesp2022-050","q-amrigs2024-020","q-iamspe2022-001","q-unicamp2023-001","q-usprp2022-065","q-usprp2025-070"],
          prosa: `[[O tratamento é tratar a causa e as medidas não farmacológicas, que também previnem: reorientar (relógio, calendário, família), óculos e aparelho auditivo, mobilizar cedo, hidratar, dormir à noite (luz e silêncio), evitar contenção e cateteres. Antipsicótico não previne nem trata a doença: fica para agitação com risco para o próprio paciente, na menor dose e pelo menor tempo (haloperidol em dose baixa; quetiapina quando há parkinsonismo). Benzodiazepínico piora, exceto na abstinência de álcool ou benzodiazepínico. Contenção física nunca é medida isolada.|q-unesp2022-050,q-amrigs2024-020,q-iamspe2022-001,q-unicamp2023-001,q-usprp2022-065,q-usprp2025-070]]`,
          texto: `- Prevenção: **mobilidade, hidratação, orientação, sono**. {q-unesp2022-050}
- Incorreta: antipsicótico **para prevenção e tratamento**. {q-amrigs2024-020}
- Tratar os fatores; contenção física **nunca isolada**. {q-iamspe2022-001}
- Delirium apesar de sono e óculos: **mobilizar precocemente**. {q-unicamp2023-001}
- Agitação na pneumonia: **haloperidol**. {q-usprp2022-065}
- Agitação após fratura de fêmur: **quetiapina**. {q-usprp2025-070}` },
      ],
    },
    {
      id: "cognicao", titulo: "Queixa cognitiva e investigação",
      introducao: `[[Demência é declínio cognitivo adquirido, em um ou mais domínios (nem sempre a memória), que tira a independência nas atividades da vida diária. Comprometimento cognitivo leve é o declínio objetivo sem perda funcional clara: acompanha-se e trata-se o risco vascular. A depressão no idoso imita demência (queixa-se muito da memória, rende pouco por desinteresse, escala de depressão alta, teste cognitivo preservado).|q-unesp2023-050,q-uspsp5-023,q-usprp2023-044,q-amrigs2021-086]]`,
      fragmentos: [
        { id: "cog-investigacao", titulo: "Diagnóstico, causas reversíveis e estadiamento", conferir: true, diretrizes: ["abn-demencia"],
          questoes: ["q-unesp2023-050","q-uspsp5-023","q-usprp2023-044","q-uspsp4-076","q-amrigs2021-086","q-usp2022-010","q-uspsp2-007","q-sirio2021-019","q-sessp2023-063","q-unifesp2025-026"],
          prosa: `[[O diagnóstico é clínico (história com informante, teste cognitivo, função), mas a investigação procura causas tratáveis: vitamina B12, função tireoidiana, sífilis, HIV, eletrólitos e cálcio, função renal e hepática, e neuroimagem. Deficiência de vitamina D não causa demência; remédios, sim.|q-amrigs2021-086,q-usp2022-010,q-uspsp2-007,q-sirio2021-019]] [[Esquecimento progressivo com perda de autonomia (o filho administra os remédios, ela se perde) é síndrome demencial e pede supervisão. A gravidade se mede com escalas de estágio funcional (FAST) e o Clinical Dementia Rating.|q-sessp2023-063,q-uspsp4-076,q-unifesp2025-026]]`,
          texto: `- CCL: **sem prejuízo funcional claro**. {q-unesp2023-050}
- Esquecimento com MEEM limítrofe e independente: **CCL; monitorar e estilo de vida**. {q-uspsp5-023}
- MEEM 28 e escala de depressão 8: **transtorno depressivo**. {q-usprp2023-044}
- MEEM 26 e GDS 5: **síndrome demencial** (a prova). {q-uspsp4-076}
- Depressão **mascara** demência; diagnóstico clínico com exames. {q-amrigs2021-086}
- Investigação: **B12, TSH, T4L, sífilis, HIV e tomografia**. {q-usp2022-010}
- Exame inicial: **B12 e tireoide**. {q-uspsp2-007}
- Não é causa reversível: **deficiência de vitamina D**. {q-sirio2021-019}
- Perdeu a autonomia: **síndrome demencial, supervisão**. {q-sessp2023-063}
- Estadiar: **FAST e CDR**. {q-unifesp2025-026}` },
      ],
    },
    {
      id: "tipos", titulo: "Tipos de demência",
      introducao: `[[Na doença de Alzheimer, placas de beta-amiloide e emaranhados de tau destroem primeiro o hipocampo e os neurônios colinérgicos do núcleo basal de Meynert: o primeiro sintoma é a memória recente (repete perguntas, perde objetos), depois linguagem, orientação e praxia. Falta acetilcolina, e por isso os inibidores da colinesterase (donepezila, rivastigmina, galantamina) ajudam na fase leve a moderada; a memantina entra na moderada a grave.|q-adap22-095,q-tp20241-028,q-tp20252-056]]`,
      fragmentos: [
        { id: "tip-alzheimer-lewy", titulo: "Alzheimer e corpos de Lewy", conferir: true, diretrizes: ["abn-demencia","lewy-consenso"],
          questoes: ["q-adap22-095","q-tp20241-028","q-tp20252-056","q-adap25-026","q-adap26-032","q-usp2025-096","q-usprp2021-111","q-amrigs2023-020","q-amrigs2025-019","q-tp20222-040","q-unicampdis2025-005","q-sirio2025-019"],
          prosa: `[[Na demência com corpos de Lewy, a alfa-sinucleína atinge córtex e tronco: flutuação marcante da atenção, alucinações visuais bem formadas (crianças, animais), parkinsonismo e distúrbio comportamental do sono REM (sonhos encenados), com atenção e função executiva piores que a memória no começo. Se a demência vem antes ou até um ano depois do parkinsonismo, é Lewy; se aparece anos depois de um Parkinson estabelecido, é demência da doença de Parkinson. Esses pacientes são muito sensíveis a antipsicóticos (rigidez grave): trata-se com rivastigmina, que melhora cognição e alucinações; a levodopa piora as alucinações.|q-adap25-026,q-adap26-032,q-usp2025-096,q-usprp2021-111,q-amrigs2023-020,q-amrigs2025-019,q-tp20222-040,q-unicampdis2025-005,q-sirio2025-019]]`,
          texto: `- Alzheimer leve: **donepezila 5 → 10 mg**. {q-adap22-095}
- Neurotransmissor: **acetilcolina**. {q-tp20241-028,q-tp20252-056}
- Flutuação, alucinações, sono REM e rigidez: **rivastigmina**. {q-adap25-026}
- Mesmo quadro: **corpos de Lewy**. {q-adap26-032,q-usprp2021-111,q-amrigs2023-020,q-amrigs2025-019,q-unicampdis2025-005,q-sirio2025-019}
- Confusão à tarde e crianças imaginárias: **Lewy; rivastigmina**. {q-usp2025-096}
- Alucinações que pioram com levodopa: **corpos de Lewy**. {q-tp20222-040}` },
        { id: "tip-outras", titulo: "Frontotemporal, vascular e causas cirúrgicas", conferir: true,
          casos: ["q-uspsp2-022","q-tp20251-028","q-tp20202-039"],
          questoes: ["q-adap21-111","q-tp20231-012","q-uspsp2-022","q-tp20251-028","q-tp20202-039"],
          prosa: `[[A demência frontotemporal começa mais cedo (50 a 65 anos) e pelo comportamento: desinibição, apatia, perda de empatia, compulsão por doces, rituais e hipersexualidade, com memória e orientação relativamente preservadas no início; não responde a anticolinesterásicos, e os inibidores de recaptação de serotonina controlam o comportamento.|q-adap21-111,q-tp20231-012]] [[Duas causas têm tratamento cirúrgico. A hidrocefalia de pressão normal junta marcha magnética (passos curtos, pés grudados), incontinência urinária e declínio cognitivo, com ventrículos grandes desproporcionais aos sulcos; melhora com derivação. O hematoma subdural crônico, no idoso frágil que cai, dá piora cognitiva e déficit focal em semanas.|q-uspsp2-022,q-tp20251-028,q-tp20202-039]]`,
          texto: `- Desinibição, doces e higiene, memória boa: **frontotemporal comportamental**. {q-adap21-111}
- Rituais e hipersexualidade: **lobos frontal e temporal; ISRS**. {q-tp20231-012}
- Marcha, urgência e esquecimento: **hidrocefalia de pressão normal**. {q-uspsp2-022,q-tp20251-028}
- Idoso que cai, demência e fraqueza à direita: **imagem do hematoma subdural** (1). {q-tp20202-039}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["nice-delirium"],
          questoes: ["q-uspsp4-076","q-usprp2022-065","q-usprp2025-070","q-unesp2023-050"],
          prosa: `[[**Demência com dados limítrofes**: TSH de 7,2 e MEEM 26 pedem tratar a tireoide e reavaliar; a uspsp4-076 fechou síndrome demencial pela história de perda de autonomia.|q-uspsp4-076]] [[**Antipsicótico no delirium**: não há droga preferida por evidência forte; haloperidol em dose baixa é o clássico (usprp2022-065) e a quetiapina, a preferida quando há parkinsonismo ou demência com risco de rigidez (usprp2025-070).|q-usprp2022-065,q-usprp2025-070]] [[**Memória obrigatória**: o DSM-5 aceita demência sem perda de memória (frontotemporal, Lewy); a unesp2023-050 usou essa ideia na alternativa errada.|q-unesp2023-050]]`,
          texto: `- TSH alto e MEEM 26: a prova fechou **demência**. {q-uspsp4-076}
- Antipsicótico: **haloperidol ou quetiapina** conforme o paciente. {q-usprp2022-065,q-usprp2025-070}
- Demência **sem** perda de memória existe. {q-unesp2023-050}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: delirium, demências e depressão",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-tipos", titulo: "Como separar", conferir: true,
          questoes: ["q-unifesp2022-095","q-adap22-095","q-adap26-032","q-adap21-111","q-usprp2023-044"],
          prosa: `[[Início, primeiro sintoma e curso separam os quadros.|q-unifesp2022-095,q-adap22-095,q-adap26-032,q-adap21-111,q-usprp2023-044]]

| | Delirium | Alzheimer | Corpos de Lewy | Frontotemporal | Depressão |
|---|---|---|---|---|---|
| Início | horas a dias | insidioso | insidioso | insidioso, 50–65 anos | semanas a meses |
| Primeiro sintoma | desatenção, flutuação | memória recente | flutuação, alucinações visuais | comportamento | humor, queixa de memória |
| Achados | causa orgânica | — | parkinsonismo, sono REM | desinibição, compulsões | GDS alta, MEEM preservado |
| Tratamento | tratar a causa | anticolinesterásico | rivastigmina; evitar antipsicótico | ISRS | antidepressivo |`,
          texto: `- Agudo e flutuante: **delirium**. {q-unifesp2022-095}
- Memória recente: **Alzheimer**. {q-adap22-095}
- Alucinações e sono REM: **Lewy**. {q-adap26-032}
- Comportamento: **frontotemporal**. {q-adap21-111}
- GDS alta: **depressão**. {q-usprp2023-044}` },
      ],
    },
  ],
});
