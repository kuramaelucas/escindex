/* resumos/intoxicacoes/resumo.js — resumo adaptativo de intoxicações exógenas: toxíndromes e abordagem inicial
   (descontaminação, antídotos), organofosforados, sedativos e opioides, medicamentos (tricíclico, salicilato,
   paracetamol, lítio, antipsicóticos), álcoois tóxicos, gases, cáusticos e metais, animais peçonhentos, armadilhas e
   tabela das toxíndromes. Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- intoxicacoes */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "intoxicacoes",
  titulo: "Intoxicações exógenas e animais peçonhentos",
  assunto: "ass-emerg-intoxicacoes",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "aha-rcp", texto: "AHA — Guidelines for CPR and ECC 2025 e AHA 2023 Focused Update on the management of patients with cardiac arrest or life-threatening toxicity due to poisoning", lidoEm: null },
    { id: "ms-peconhentos", texto: "Ministério da Saúde — Guia de animais peçonhentos do Brasil (2024) e Manual de diagnóstico e tratamento de acidentes por animais peçonhentos (versão de 2024 no gov.br)", lidoEm: "2026-11-19" },
    { id: "aact-descontaminacao", texto: "AACT/EAPCCT — Position papers sobre carvão ativado, lavagem gástrica e descontaminação (atualizações 2005–2013)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "abordagem", titulo: "Toxíndromes e abordagem inicial",
      introducao: `[[O intoxicado se trata antes de se saber o tóxico: via aérea, respiração, circulação e glicemia; depois o exame procura uma toxíndrome, o conjunto de sinais que revela o receptor atingido. Excesso de acetilcolina (colinérgica) dá miose, secreções, broncorreia e bradicardia; bloqueio muscarínico (anticolinérgica) dá midríase, pele e mucosa secas e quentes, taquicardia, retenção urinária e delirium; excesso de catecolaminas (simpatomimética) dá midríase com sudorese; opioide dá miose, bradipneia e coma.|q-usp2023-049,q-usp2024-009,q-unicampdis2022-031,q-unicampdis2025-029,q-sirio2022-047,q-uspsp4-014,q-einstein2023-008,q-sessp2023-076,q-sirio2022-001]] [[A pele separa as duas síndromes de pupila grande: seca na anticolinérgica, molhada na simpatomimética.|q-unicampdis2022-031,q-einstein2023-008,q-uspsp4-014]]

Veja também: **Distúrbios hidroeletrolíticos e ácido-base** (ânion gap e gap osmolar), **ECG, arritmias e síncope** (QRS largo e torsades), **Emergências pediátricas** (via aérea da criança) e **Maus-tratos** (intoxicação como forma de violência).`,
      fragmentos: [
        { id: "abo-sindromes", titulo: "Reconhecer a toxíndrome", conferir: true,
          figuras: [{ arquivo: "figuras/toxindromes.svg", legenda: "Esquema autoral: pupila e pele separam as quatro toxíndromes mais cobradas." }],
          casos: ["q-usp2024-009"],
          questoes: ["q-usp2023-049","q-usp2024-009","q-unicampdis2022-031","q-unicampdis2025-029","q-sirio2022-047","q-uspsp4-014","q-einstein2023-008","q-sessp2023-076","q-sirio2022-001","q-famema2023-022","q-unicampdis2025-075"],
          prosa: `[[Inibidores da colinesterase usados como remédio (rivastigmina) em excesso reproduzem a síndrome colinérgica.|q-usp2023-049]] [[Anti-histamínicos, tricíclicos e escopolamina são anticolinérgicos: criança com rubor, midríase, boca seca e febre depois de mexer na caixa de remédios.|q-unicampdis2025-029,q-sirio2022-047,q-usp2024-009]] [[Descongestionante no lactente pode dar síndrome simpatomimética (taquicardia, hipertermia, sudorese, midríase); a agitação simpatomimética se acalma com benzodiazepínico, e a anticolinérgica pede suporte.|q-unicampdis2022-031]] [[A metoclopramida bloqueia dopamina e pode causar distonia aguda (caretas, protrusão de língua, espasmos), que cede com anticolinérgico ou anti-histamínico.|q-unicampdis2025-075]] [[O digitálico em excesso dá taquicardia atrial com bloqueio e onda P ausente em ritmos juncionais.|q-famema2023-022]]`,
          texto: `- Miose, broncorreia, bradicardia: **colinérgica** (rivastigmina, organofosforado). {q-usp2023-049,q-sessp2023-076}
- Midríase, mucosa seca, bexiga cheia: **bloqueio muscarínico**. {q-usp2024-009,q-uspsp4-014}
- Criança com rubor e midríase: **anti-histamínico** (loratadina). {q-unicampdis2025-029,q-sirio2022-047}
- Pele seca, hipertermia, delirium: **imipramina**. {q-einstein2023-008}
- Midríase com sudorese no lactente com descongestionante: **simpatomimética**. {q-unicampdis2022-031}
- Opioide: **bradicardia e miose**. {q-sirio2022-001}
- Caretas após metoclopramida: **síndrome extrapiramidal**. {q-unicampdis2025-075}
- Digitálico: **onda P ausente**. {q-famema2023-022}` },
        { id: "abo-conduta", titulo: "Suporte, descontaminação e antídotos", conferir: true, diretrizes: ["aact-descontaminacao","aha-rcp"],
          questoes: ["q-unesp2021-045","q-sirio2027-019","q-uspsp1-002","q-sessp2022-047","q-fmabc2023-005","q-fmabc2022-008"],
          prosa: `[[O carvão ativado adsorve a droga ainda no intestino e vale até cerca de 1 hora após a ingestão; não adsorve metais, álcoois, cáusticos e gases. Doses múltiplas aumentam a eliminação de fenobarbital, carbamazepina e teofilina, que recirculam pelo intestino.|q-unesp2021-045,q-sirio2027-019]] [[Bradipneia com hipoxemia por depressão central não melhora com máscara: o primeiro passo é a via aérea.|q-uspsp1-002]] [[Os antídotos agem no mecanismo: cálcio (e insulina em dose alta) no bloqueador de canal de cálcio; glucagon no betabloqueador, porque estimula o AMPc por outro receptor; hidroxocobalamina no cianeto; etanol ou fomepizol no metanol e no etilenoglicol.|q-sessp2022-047,q-fmabc2023-005,q-fmabc2022-008]]`,
          texto: `- Carvão ativado serve no **paracetamol**, não em metais nem cáusticos. {q-unesp2021-045}
- Fenobarbital: **carvão em doses múltiplas**. {q-sirio2027-019}
- Criança com FR 8 e hipoxemia: **intubar** e falar com o centro de toxicologia. {q-uspsp1-002}
- Anlodipino: **gluconato de cálcio**. {q-sessp2022-047}
- Betabloqueador: **glucagon**. {q-fmabc2023-005}
- Cianeto: **hidroxocobalamina**. {q-fmabc2022-008}` },
      ],
    },
    {
      id: "colinergicos", titulo: "Organofosforados e carbamatos",
      introducao: `[[Organofosforados e carbamatos (inclusive o "chumbinho") inibem a acetilcolinesterase, e a acetilcolina sobra nos receptores muscarínicos (miose, sialorreia, lacrimejamento, broncorreia, broncoespasmo, bradicardia, diarreia), nicotínicos (fasciculações e fraqueza) e no sistema nervoso central (coma, convulsão). Na criança, os sinais nicotínicos podem dar taquicardia e hipertensão.|q-usprp2025-065,q-simepm89-088,q-einstein2021-008,q-einstein2027-008,q-fmabc2024-059,q-sirio2027-047]]`,
      fragmentos: [
        { id: "col-tratamento", titulo: "Atropina até secar o pulmão", conferir: true,
          questoes: ["q-usprp2025-065","q-simepm89-088","q-einstein2021-008","q-einstein2027-008","q-fmabc2024-059","q-sirio2027-047"],
          prosa: `[[A atropina bloqueia o receptor muscarínico e se repete até secar as secreções brônquicas (o alvo é o pulmão, não a pupila); a pralidoxima reativa a enzima no organofosforado se dada cedo. Descontaminar a pele e as roupas protege também a equipe.|q-usprp2025-065,q-einstein2021-008,q-einstein2027-008,q-sirio2027-047]]`,
          texto: `- Trabalhador rural com secreções: **atropina EV**. {q-usprp2025-065,q-einstein2027-008}
- Criança com miose, broncorreia e fasciculações: **atropina**. {q-simepm89-088,q-fmabc2024-059}
- Síndrome colinérgica: **atropina, pralidoxima e suporte**. {q-einstein2021-008}
- Garrafa pet com veneno: **organofosforado ou carbamato**, atropina. {q-sirio2027-047}` },
      ],
    },
    {
      id: "sedativos", titulo: "Opioides, benzodiazepínicos e imidazolinas",
      introducao: `[[O opioide ativa o receptor mu no tronco e reduz a resposta ao CO2: miose puntiforme, bradipneia e coma; a naloxona desloca o opioide do receptor por competição e reverte em minutos, mas dura menos que muitos opioides, e o paciente fica observado.|q-iamspe2026-019,q-sessp2022-009,q-unicampdis2024-064,q-usprp2023-020]] [[O benzodiazepínico potencializa o GABA: sonolência com respiração em geral preservada; o flumazenil é antagonista competitivo e reverte, mas pode desencadear convulsão em usuário crônico ou quando há tricíclico junto.|q-amrigs2025-071,q-sessp2025-052,q-fmabc2025-043]] [[As imidazolinas dos descongestionantes nasais (nafazolina) agem como agonistas alfa-2 centrais: na criança dão sonolência, bradicardia, hipotensão, miose e hipotermia, como um opioide.|q-sirio2025-052]]`,
      fragmentos: [
        { id: "sed-antidotos", titulo: "Naloxona, flumazenil e suporte", conferir: true, diretrizes: ["aha-rcp"],
          questoes: ["q-usprp2023-020","q-iamspe2026-019","q-sessp2022-009","q-unicampdis2024-064","q-amrigs2025-071","q-sessp2025-052","q-fmabc2025-043","q-sirio2025-052"],
          prosa: `[[Na intoxicação por nafazolina, a bradicardia persistente se trata com atropina, junto com volume e aquecimento.|q-sirio2025-052]]`,
          texto: `- Criança sonolenta após fentanil: **naloxona**. {q-usprp2023-020}
- Naloxona: **desloca o opioide do receptor**. {q-iamspe2026-019}
- Miose e bradipneia: **naloxona**. {q-sessp2022-009,q-unicampdis2024-064}
- Benzodiazepínico: antídoto **flumazenil**; risco: **depressão respiratória**. {q-amrigs2025-071,q-sessp2025-052,q-fmabc2025-043}
- Nafazolina com bradicardia: **volume e atropina**. {q-sirio2025-052}` },
      ],
    },
    {
      id: "medicamentos", titulo: "Intoxicação por medicamentos",
      introducao: `[[O tricíclico bloqueia canais de sódio do miocárdio (QRS largo, arritmia, hipotensão), receptores muscarínicos (síndrome anticolinérgica) e alfa: coma, convulsão e QRS > 100 ms pedem bicarbonato de sódio, que dá sódio e alcaliniza.|q-unicamp2022-010]] [[O salicilato estimula o centro respiratório e desacopla a fosforilação oxidativa: alcalose respiratória com acidose metabólica de ânion gap aumentado, taquipneia e zumbido.|q-usprp2024-075]] [[O paracetamol em excesso esgota o glutationa, e o metabólito NAPQI necrosa o fígado: a N-acetilcisteína repõe o glutationa e é dada mesmo tardiamente.|q-famema2022-028]]

[[O lítio tem janela estreita e é eliminado pelo rim: diarreia, vômito, diurético ou IECA o elevam; a intoxicação dá tremor grosseiro, confusão, mioclonias, convulsão e alterações de ECG, e a hemodiálise o remove.|q-tp20231-011,q-uspsp3-074,q-fmabc2026-019]] [[Antipsicóticos que bloqueiam D2 podem causar síndrome neuroléptica maligna: febre, rigidez em cano de chumbo, disautonomia e CPK alta; suspende-se o antipsicótico e trata-se com resfriamento, hidratação e dantrolene ou bromocriptina.|q-uspsp4-003,q-sirio2026-002]]`,
      fragmentos: [
        { id: "med-condutas", titulo: "Tricíclico, salicilato, paracetamol, lítio e outros", conferir: true,
          questoes: ["q-unicamp2022-010","q-usprp2024-075","q-famema2022-028","q-tp20231-011","q-uspsp3-074","q-fmabc2026-019","q-famema2025-092","q-uspsp4-003","q-sirio2026-002","q-sessp2026-013"],
          prosa: `[[A fenitoína em excesso afeta o cerebelo: nistagmo, ataxia, disartria e diplopia.|q-famema2025-092]] [[O nitroprussiato libera cianeto, que bloqueia a respiração mitocondrial: uso prolongado dá acidose láctica.|q-sessp2026-013]]`,
          texto: `- Depressivo com amitriptilina, confuso: **tricíclico**. {q-unicamp2022-010}
- pH alto com HCO3 baixo: **ácido acetilsalicílico**. {q-usprp2024-075}
- Paracetamol com hepatite: **N-acetilcisteína**. {q-famema2022-028}
- Tremor, diarreia e convulsão no bipolar: **litemia**. {q-tp20231-011}
- Lítio: **ECG**; grave: **hemodiálise**. {q-uspsp3-074,q-fmabc2026-019}
- Nistagmo e ataxia: **fenitoína**. {q-famema2025-092}
- Haloperidol com febre e rigidez: **suspender, hidratar, dantrolene**. {q-uspsp4-003}
- Neuroléptica maligna: bloqueio **D2**. {q-sirio2026-002}
- Nitroprussiato prolongado: **acidose láctica**. {q-sessp2026-013}` },
      ],
    },
    {
      id: "quimicos", titulo: "Álcoois tóxicos, gases, cáusticos e metais",
      introducao: `[[Metanol e etilenoglicol são pouco tóxicos até a álcool-desidrogenase transformá-los em ácidos (fórmico, glicólico, oxálico): acidose metabólica de ânion gap alto com gap osmolar alto; o metanol lesa o nervo óptico (papiledema, cegueira) e o etilenoglicol (anticongelante de radiador) precipita oxalato de cálcio no rim e dá hipocalcemia.|q-udisc20262-031,q-unicampdis2025-051,q-usprp2026-051]] [[O monóxido de carbono do incêndio se liga à hemoglobina e a oximetria comum não mostra: cefaleia e tontura depois de fumaça pedem oxigênio a 100% por máscara.|q-tp20251-076]]

[[Os cáusticos lesam por contato: não se induz vômito, não se faz lavagem nem carvão, não se tenta neutralizar; a endoscopia nas primeiras 12–24 horas mostra a extensão. Água sanitária doméstica em pequena quantidade costuma pedir só observação.|q-unicamp2022-024,q-uspsp3-044,q-sirio2024-030]] [[O mercúrio orgânico do peixe contaminado é neurotóxico; na intoxicação crônica o quelante é o DMSA (ácido dimercaptossuccínico).|q-amrigs2023-018,q-famema2022-099]]`,
      fragmentos: [
        { id: "qui-condutas", titulo: "Reconhecer e tratar", conferir: true,
          questoes: ["q-udisc20262-031","q-unicampdis2025-051","q-usprp2026-051","q-tp20251-076","q-unicamp2022-024","q-uspsp3-044","q-sirio2024-030","q-amrigs2023-018","q-famema2022-099"],
          texto: `- Papiledema com acidose: **metanol**. {q-udisc20262-031,q-unicampdis2025-051}
- Fluido de radiador: **acidose de ânion gap aumentado**. {q-usprp2026-051}
- Fumaça de incêndio: **oxigênio por máscara**. {q-tp20251-076}
- Soda cáustica: **analgesia** e lesões orais, sem neutralizar. {q-unicamp2022-024}
- Água sanitária: **observação e suporte**. {q-uspsp3-044}
- Corrosivo com sialorreia: **endoscopia**. {q-sirio2024-030}
- Mercúrio crônico: **DMSA**; sintomas **neurológicos**. {q-amrigs2023-018,q-famema2022-099}` },
      ],
    },
    {
      id: "peconhentos", titulo: "Animais peçonhentos",
      introducao: `[[O veneno do escorpião (*Tityus serrulatus*) abre canais de sódio e descarrega catecolaminas e acetilcolina: dor local intensa e, na criança, vômitos, sudorese, agitação, taquicardia e, no grave, miocardite com choque cardiogênico e edema pulmonar.|q-usprp2022-086,q-usprp2024-072,q-usprp2025-003,q-usprp2026-027]] [[Na jararaca (botrópico, o acidente mais comum) o veneno é proteolítico e coagulante: dor, edema e sangramento; na cascavel (crotálico) é neurotóxico e miotóxico, com pouca dor local, ptose e diplopia (fácies miastênica) e urina escura por rabdomiólise.|q-amrigs2024-072,q-usprp2022-069]] [[A picada da aranha-marrom (*Loxosceles*), comum dentro de casa e entre tijolos, é pouco dolorosa no início e vira placa marmórea que necrosa.|q-usprp2026-040]] Este capítulo é a síntese; a versão completa (gravidade, soro, afogamento e hipotermia) está em **Emergências ambientais**.`,
      fragmentos: [
        { id: "pec-condutas", titulo: "Escorpião, serpentes e aranhas", conferir: false, diretrizes: ["ms-peconhentos"],
          casos: ["q-usprp2022-069","q-usprp2026-040"],
          questoes: ["q-usprp2022-069","q-usprp2022-086","q-usprp2024-072","q-usprp2025-003","q-usprp2026-027","q-usprp2026-040","q-amrigs2024-072"],
          prosa: `[[O escorpionismo moderado (vômitos, sudorese, taquicardia) e o grave recebem soro antiescorpiônico o quanto antes, ainda na unidade, antes de transferir; no choque cardiogênico usa-se dobutamina.|q-usprp2026-027,q-usprp2022-086,q-usprp2024-072]] [[Na criança com choque, a pressão medida pode parecer normal enquanto o pulso periférico some, porque sistólica e diastólica convergem.|q-usprp2025-003]]`,
          texto: `- Escorpião com vômitos e sudorese: **soro antes de transferir**. {q-usprp2026-027}
- Choque após escorpião: **cardiogênico**, **dobutamina**. {q-usprp2024-072,q-usprp2022-086}
- Pressões **convergentes** com pulso fino. {q-usprp2025-003}
- Pouca dor, urina escura: crotálico, **diplopia**. {q-usprp2022-069}
- Enchentes: acidente **botrópico**. {q-amrigs2024-072}
- Placa necrótica após tijolos: ***Loxosceles***. {q-usprp2026-040}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `O antídoto do benzodiazepínico e o momento da via aérea dividem as provas.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-amrigs2025-071","q-uspsp3-084","q-sessp2025-052"],
          prosa: `[[O flumazenil não é rotina no adulto que tomou vários remédios, porque pode precipitar convulsão; é aceito na criança com ingestão acidental só de benzodiazepínico. Uma prova o deu como conduta mais efetiva em adolescente com Glasgow 6 e hipotenso, situação em que a via aérea vem primeiro.|q-amrigs2025-071,q-sessp2025-052]] [[Glasgow 7 costuma indicar via aérea definitiva; a prova preferiu observar porque a respiração e a saturação estavam preservadas e a ingestão era benzodiazepínico.|q-uspsp3-084]]`,
          texto: `- Flumazenil: **não de rotina**; a prova o quis com Glasgow 6. {q-amrigs2025-071}
- Criança só com clonazepam: **flumazenil** aceito. {q-sessp2025-052}
- Glasgow 7 com ventilação preservada: a prova quis **observar**. {q-uspsp3-084}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `As toxíndromes, resumidas pelo primeiro capítulo.`,
      fragmentos: [
        { id: "comp-toxindromes", titulo: "Toxíndromes", conferir: true,
          questoes: ["q-usp2023-049","q-einstein2023-008","q-unicampdis2022-031","q-sessp2023-076"],
          prosa: `| Síndrome | Pupila | Pele | FC | Exemplo | Antídoto |
| --- | --- | --- | --- | --- | --- |
| Colinérgica | miose | úmida, secreções | baixa | organofosforado | atropina |
| Anticolinérgica | midríase | seca, quente | alta | tricíclico, anti-histamínico | suporte |
| Simpatomimética | midríase | úmida | alta | descongestionante, cocaína | benzodiazepínico |
| Opioide | miose puntiforme | normal | baixa | morfina, fentanil | naloxona |

[[Pupila e pele bastam para separar as quatro síndromes à beira do leito.|q-usp2023-049,q-einstein2023-008,q-unicampdis2022-031,q-sessp2023-076]]`,
          texto: `- Miose com secreções: **colinérgica**. {q-usp2023-049,q-sessp2023-076}
- Midríase com pele seca: **anticolinérgica**. {q-einstein2023-008}
- Midríase com sudorese: **simpatomimética**. {q-unicampdis2022-031}` },
      ],
    },
  ],
});
