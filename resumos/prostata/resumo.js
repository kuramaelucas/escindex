/* resumos/prostata/resumo.js — resumo adaptativo de próstata (ass-uro-prostata): hiperplasia
   prostática benigna (mecanismo, avaliação, PSA na HPB, alfabloqueador, inibidor da 5-alfarredutase,
   terapia combinada, indicações de cirurgia, RTU e enucleação, síndrome pós-RTU, retenção urinária)
   e câncer de próstata (rastreamento e decisão compartilhada, PSA alterado, ressonância e biópsia,
   vigilância ativa e prostatectomia); armadilhas e tabela HPB × câncer.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- prostata */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "prostata",
  titulo: "Próstata: hiperplasia e câncer",
  assunto: "ass-uro-prostata",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "eau", texto: "EAU Guidelines — Management of Non-neurogenic Male LUTS e Prostate Cancer (2026)", lidoEm: null },
    { id: "inca-prostata", texto: "INCA/Ministério da Saúde — Detecção precoce do câncer de próstata (nota técnica e recomendações vigentes)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "hpb", titulo: "Hiperplasia prostática benigna",
      introducao: `[[A próstata envolve a uretra logo abaixo da bexiga. Com a idade e sob o estímulo da **di-hidrotestosterona** (feita da testosterona pela 5-alfarredutase), a **zona de transição**, que fica em volta da uretra, cresce e a aperta. A obstrução tem dois componentes: o **estático**, o volume da glândula, e o **dinâmico**, o tônus do músculo liso prostático, mediado por receptores alfa-1. Daí os sintomas de esvaziamento (jato fraco, hesitação, esforço, gotejamento, esvaziamento incompleto) e de armazenamento (noctúria, frequência), que se medem pelo **IPSS**.|q-tp20251-116,q-fmabc2021-013,q-unesp2025-069]]

Veja também: **Litíase urinária**, **Infecção urinária**, **Lesão renal aguda** e **Prevenção** (rastreamento).`,
      fragmentos: [
        { id: "hpb-clinica", titulo: "Sintoma, não tamanho, decide", conferir: true, diretrizes: ["eau"],
          figuras: [{ arquivo: "figuras/prostata-zonas.svg", legenda: "Esquema autoral: a hiperplasia nasce na zona de transição, em volta da uretra; o câncer, na zona periférica, onde o toque retal o alcança." }],
          questoes: ["q-tp20251-116","q-fmabc2021-013","q-tp20222-072","q-scmsp2022-095"],
          prosa: `[[A HPB é muito comum (a maioria dos homens acima de 60 anos) e não é pré-maligna. No toque, a próstata está **aumentada, fibroelástica, lisa**, com o sulco mediano apagado e sem nódulos.|q-tp20251-116,q-fmabc2021-013]] [[O que se trata é o **incômodo** e a **complicação**, não o volume: próstata grande com sintoma leve e sem complicação fica em **acompanhamento**, com orientação de hábitos (menos líquido à noite, menos cafeína e álcool).|q-tp20222-072,q-scmsp2022-095]]`,
          texto: `- Próstata aumentada, fibroelástica, sem nódulo: **HPB**. {q-tp20251-116,q-fmabc2021-013}
- Sintoma leve sem complicação, mesmo com próstata grande: **acompanhar**. {q-tp20222-072,q-scmsp2022-095}` },
        { id: "hpb-avaliacao", titulo: "Avaliação inicial e o PSA na HPB", conferir: true, diretrizes: ["eau"],
          questoes: ["q-tp20231-067","q-unifesp2024-009","q-adap24-006","q-unicampdis2025-063"],
          prosa: `[[A avaliação começa pelo **toque retal** (tamanho, consistência, nódulo), urina tipo 1 e PSA quando o resultado mudaria a conduta. Ultrassonografia não é obrigatória no início.|q-tp20231-067,q-unifesp2024-009]] [[Mas **creatinina subindo** em homem com obstrução pede **ultrassonografia** do aparelho urinário: a bexiga pode não esvaziar e o rim pode estar sofrendo com a pressão (hidronefrose, resíduo alto).|q-adap24-006]] [[O PSA é produzido pelo tecido prostático **benigno** também: próstata de 70 g tem PSA mais alto só pelo volume. Por isso o PSA se lê junto com o tamanho da glândula.|q-unicampdis2025-063]]`,
          texto: `- Início: **toque retal**, urina, PSA. {q-tp20231-067,q-unifesp2024-009}
- Creatinina subindo: **ultrassonografia**. {q-adap24-006}
- Próstata grande eleva PSA: **HPB** é a causa mais provável. {q-unicampdis2025-063}` },
        { id: "hpb-alfa", titulo: "Alfabloqueador: o primeiro remédio", conferir: true, diretrizes: ["eau"],
          questoes: ["q-unesp2025-069","q-tp20232-069","q-unesp2026-063","q-unifesp2024-009","q-unicampdis2024-024"],
          prosa: `[[O **alfabloqueador** (tansulosina, doxazosina) relaxa o músculo liso do colo vesical e da próstata e alivia em **dias**. É a **primeira linha** para sintomas moderados a graves que incomodam. Não diminui a próstata nem o risco de retenção a longo prazo.|q-unesp2025-069,q-tp20232-069,q-unifesp2024-009,q-unicampdis2024-024]] [[Em próstata **pequena** (até 30 a 40 g), começa-se só com ele e se reavalia; urodinâmica e cirurgia não vêm antes.|q-unesp2026-063]]`,
          texto: `- Primeira linha: **alfabloqueador** (alívio rápido, não reduz volume). {q-unesp2025-069,q-tp20232-069,q-unifesp2024-009,q-unicampdis2024-024}
- Próstata pequena: **alfabloqueador sozinho** e reavaliar. {q-unesp2026-063}` },
        { id: "hpb-combinada", titulo: "Inibidor da 5-alfarredutase e terapia combinada", conferir: true, diretrizes: ["eau"],
          questoes: ["q-adap25-016","q-unesp2024-070","q-simepm89-051","q-scmsp2022-095"],
          prosa: `[[O **inibidor da 5-alfarredutase** (finasterida, dutasterida) corta a di-hidrotestosterona: a próstata **diminui** ao longo de meses, e caem o risco de **retenção urinária** e de **cirurgia**. Não alivia de imediato e reduz o PSA à metade.|q-simepm89-051,q-scmsp2022-095]] [[Em próstata **aumentada** (mais de 40 g) com sintomas importantes, a **combinação** alfabloqueador + inibidor da 5-alfarredutase é melhor que cada um isolado; o anticolinérgico sozinho não trata obstrução.|q-adap25-016,q-unesp2024-070]]`,
          texto: `- 5-alfarredutase: **reduz volume, retenção e cirurgia**; efeito lento. {q-simepm89-051,q-scmsp2022-095}
- Próstata > 40 g sintomática: **alfabloqueador + inibidor da 5-alfarredutase**. {q-adap25-016,q-unesp2024-070}` },
        { id: "hpb-cirurgia", titulo: "Quando operar e qual cirurgia", conferir: true, diretrizes: ["eau"],
          questoes: ["q-unesp2023-062","q-simepm89-020","q-adap26-012","q-unifesp2026-012"],
          prosa: `[[A cirurgia está indicada nas **complicações** da obstrução: **retenção urinária de repetição** ou refratária, **infecção urinária de repetição**, **cálculo vesical**, hematúria persistente, **dilatação do trato urinário superior** ou perda de função renal; e quando o remédio falha. PSA que não cai com o inibidor não é indicação de ressecção.|q-unesp2023-062,q-simepm89-020,q-unifesp2026-012]] [[A técnica depende do volume: até cerca de 80 g, **ressecção transuretral (RTU)**; em próstata **grande**, **enucleação com laser** ou **adenomectomia**. Prostatectomia radical é tratamento de câncer, não de HPB. Mesmo no câncer metastático controlado, a obstrução local se trata com **RTU**.|q-adap26-012,q-unifesp2026-012]]`,
          texto: `- Complicação (retenção, ITU de repetição, cálculo, hidronefrose): **cirurgia**. {q-unesp2023-062,q-simepm89-020}
- Até ~80 g: **RTU**; maior: **enucleação ou adenomectomia**. {q-adap26-012,q-unifesp2026-012}` },
        { id: "hpb-sindrome-rtu", titulo: "Síndrome pós-RTU", conferir: true,
          questoes: ["q-einstein2021-017"],
          prosa: `[[Na RTU **monopolar** a bexiga é irrigada com solução **sem sódio** (glicina), que entra pelos seios venosos abertos. Resultado: **hiponatremia dilucional** e sobrecarga de volume, com náusea, confusão, bradicardia e hipertensão no paciente acordado sob raquianestesia. Conduta: **hemostasia, encerrar a cirurgia** e tratar clinicamente (diurético, correção do sódio). A ressecção bipolar com soro fisiológico reduz o risco.|q-einstein2021-017]]`,
          texto: `- Confusão e bradicardia durante RTU monopolar: **intoxicação hídrica**; encerrar e tratar. {q-einstein2021-017}` },
        { id: "hpb-retencao", titulo: "Retenção urinária aguda", conferir: true, diretrizes: ["eau"],
          questoes: ["q-unifesp2025-016","q-uspsp3-107","q-sessp2025-033"],
          prosa: `[[Bexiga cheia que não esvazia (globo palpável, perda em gotas por transbordamento, dor suprapúbica) se resolve **esvaziando pela uretra**: **sonda vesical**, deixada de **demora** depois de grande volume, com seguimento urológico e nova tentativa de urinar com alfabloqueador.|q-unifesp2025-016,q-uspsp3-107]] [[Se a sonda não passa pela uretra, o caminho é a **cistostomia** suprapúbica por punção. Aumentar a dose do remédio não esvazia a bexiga.|q-sessp2025-033]]`,
          texto: `- Retenção: **sonda vesical de demora** e urologia ambulatorial. {q-unifesp2025-016,q-uspsp3-107}
- Sonda não passa: **cistostomia**. {q-sessp2025-033}` },
      ],
    },
    {
      id: "cancer", titulo: "Câncer de próstata",
      introducao: `[[O câncer de próstata é o mais frequente no homem fora a pele. Nasce na **zona periférica**, longe da uretra: o tumor localizado quase **nunca dá sintoma**, e muitos tumores são tão lentos que o homem morre **com** o câncer e não **dele**. É por isso que o rastreamento é discutido caso a caso: achar cedo cura alguns, mas também leva a biópsias e tratamentos de tumores que nunca fariam mal.|q-sessp2025-036,q-amrigs2024-006,q-iamspe2026-027]]`,
      fragmentos: [
        { id: "can-rastreamento", titulo: "Rastreamento: decisão compartilhada", conferir: true, diretrizes: ["inca-prostata","eau"],
          questoes: ["q-amrigs2024-006","q-sessp2025-036","q-iamspe2026-027","q-usprp2026-001","q-einstein2027-019"],
          prosa: `[[O Ministério da Saúde e o INCA **não recomendam rastreamento populacional** de homens sem sintomas; quem pede deve ser informado de benefícios e riscos e decidir junto com o médico. Por isso não é verdade que "todo homem a partir de 45 anos deve fazer toque e PSA".|q-amrigs2024-006,q-sessp2025-036]] [[Quando se rastreia, o risco ajusta a conduta: homem com **história familiar** forte (pai ou irmão jovem) ou negro pode começar **mais cedo**, a partir dos 45 anos ou antes; PSA baixo permite intervalos de **2 a 4 anos**; PSA normal e estável em sintomas leves volta em um ano.|q-einstein2027-019,q-iamspe2026-027,q-usprp2026-001]]`,
          texto: `- MS/INCA: **sem rastreamento populacional**; decisão compartilhada. {q-amrigs2024-006,q-sessp2025-036}
- História familiar: **começar mais cedo**; PSA baixo: intervalo de **2–4 anos**. {q-einstein2027-019,q-iamspe2026-027,q-usprp2026-001}` },
        { id: "can-investigacao", titulo: "PSA alterado: ressonância e biópsia", conferir: true, diretrizes: ["eau"],
          questoes: ["q-tp20202-071","q-tp20212-074","q-tp20241-069","q-usprp2027-077"],
          prosa: `[[Suspeita vem de **nódulo** ao toque, PSA alto ou **PSA subindo rápido** (de 1,2 para 2,6 em um ano já chama atenção), e pesa mais com pai que morreu da doença. O passo seguinte é a **ressonância magnética multiparamétrica**, que localiza a lesão (PI-RADS) e guia a **biópsia** para o alvo. Tomografia, cintilografia e fosfatase alcalina são estadiamento de câncer já confirmado.|q-tp20202-071,q-tp20212-074,q-tp20241-069,q-usprp2027-077]]`,
          texto: `- PSA subindo, nódulo ou história familiar: **ressonância multiparamétrica → biópsia**. {q-tp20202-071,q-tp20212-074,q-tp20241-069,q-usprp2027-077}` },
        { id: "can-tratamento", titulo: "Localizado: vigiar ou operar", conferir: true, diretrizes: ["eau"],
          questoes: ["q-unicampdis2023-018","q-tp20261-038"],
          prosa: `[[O tumor de **baixo risco** (Gleason 3+3, pouco tumor na biópsia, PSA abaixo de 10) quase nunca progride: a conduta é **vigilância ativa**, com PSA, toque e nova biópsia periódicos, tratando só se mudar.|q-unicampdis2023-018]] [[Tumor localizado de risco **intermediário** em homem jovem e saudável, com longa expectativa de vida, se trata com intenção curativa: **prostatectomia radical** (ou radioterapia). Quimioterapia e castração ficam para a doença avançada.|q-tp20261-038]]`,
          texto: `- Baixo risco: **vigilância ativa**. {q-unicampdis2023-018}
- Localizado, jovem e saudável: **prostatectomia radical**. {q-tp20261-038}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["inca-prostata","eau"],
          questoes: ["q-amrigs2024-006","q-sessp2025-036","q-einstein2027-019","q-sessp2025-033","q-unifesp2025-016","q-tp20202-071","q-tp20212-074"],
          prosa: `[[**Rastreamento**: as provas que seguem o Ministério da Saúde (amrigs2024-006, sessp2025-036) marcam como errado rastrear todo homem a partir dos 45 anos; a einstein2027-019, que segue as sociedades de urologia, começa antes dos 50 em quem tem história familiar. As duas leituras convivem: não rastrear a população, mas oferecer a decisão a quem tem risco.|q-amrigs2024-006,q-sessp2025-036,q-einstein2027-019]] [[**Sonda de alívio ou de demora**: depois de esvaziar uma retenção grande, a sonda fica; a sessp2025-033 começou pela sonda de alívio e só passou a de demora se não resolvesse, enquanto a unifesp2025-016 foi direto à de demora.|q-sessp2025-033,q-unifesp2025-016]] [[**O mesmo caso do Teste de Progresso em dois anos**: com PSA subindo, a tp20212-074 pediu só a ressonância; a tp20202-071, ressonância e biópsia.|q-tp20202-071,q-tp20212-074]]`,
          texto: `- Rastrear a partir dos 45: **errado** para o MS; antes dos 50 com história familiar para as sociedades. {q-amrigs2024-006,q-sessp2025-036,q-einstein2027-019}
- Retenção: a prova cobrou **alívio antes da demora**. {q-sessp2025-033,q-unifesp2025-016}
- PSA subindo: **ressonância** (± biópsia). {q-tp20202-071,q-tp20212-074}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: hiperplasia × câncer",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-hpb-cancer", titulo: "Zona, toque, PSA e conduta", conferir: true,
          questoes: ["q-fmabc2021-013","q-tp20251-116","q-tp20261-038","q-unicampdis2025-063"],
          prosa: `[[Doenças diferentes, que podem coexistir no mesmo homem.|q-fmabc2021-013,q-tp20251-116,q-tp20261-038,q-unicampdis2025-063]]

| | Hiperplasia benigna | Câncer |
|---|---|---|
| Zona | transição (em volta da uretra) | periférica |
| Sintomas | jato fraco, noctúria, esvaziamento incompleto | geralmente nenhum quando localizado |
| Toque retal | aumentada, fibroelástica, lisa | nódulo endurecido |
| PSA | sobe com o volume | sobe, ou sobe rápido |
| Conduta | alfabloqueador, 5-alfarredutase, cirurgia na complicação | ressonância, biópsia; vigiar, operar ou irradiar |`,
          texto: `- HPB: **fibroelástica, lisa**. {q-fmabc2021-013,q-tp20251-116}
- Câncer: **nódulo**, ressonância e biópsia. {q-tp20261-038}
- PSA sobe nas duas. {q-unicampdis2025-063}` },
      ],
    },
  ],
});
