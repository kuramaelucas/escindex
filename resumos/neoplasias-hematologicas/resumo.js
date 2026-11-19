/* resumos/neoplasias-hematologicas/resumo.js — resumo adaptativo de neoplasias hematológicas: leucemias agudas
   (criança e adulto, neutropenia febril), lise tumoral e ciclo celular, neoplasias mieloproliferativas (LMC,
   trombocitemia) e mielodisplasia, leucemia linfocítica crônica, linfomas, mieloma, armadilhas e tabela das leucemias.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- neoplasias-hematologicas */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "neoplasias-hematologicas",
  titulo: "Neoplasias hematológicas",
  assunto: "ass-hemato-neoplasias",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "nccn", texto: "NCCN Clinical Practice Guidelines in Oncology — leucemias, linfomas e mieloma (versões vigentes)", lidoEm: null },
    { id: "oms-icc", texto: "Classificação da OMS (5ª edição, 2022) e International Consensus Classification (2022) das neoplasias hematológicas", lidoEm: null },
    { id: "imwg", texto: "IMWG — critérios diagnósticos atualizados de mieloma múltiplo (2014) e recomendações de imagem (2019)", lidoEm: null },
    { id: "idsa-neutropenia", texto: "IDSA/ASCO — Outpatient management of fever and neutropenia (2018) e diretrizes de neutropenia febril pediátrica (2023)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anulada, sem reposição", questoes: ["q-iamspe2023-014"] },
  ],
  doencas: [
    {
      id: "agudas", titulo: "Leucemias agudas",
      introducao: `[[Na leucemia aguda um precursor (blasto) para de amadurecer e se multiplica, ocupando a medula: faltam as três linhagens normais, e isso explica o quadro. A anemia é normocítica com reticulócitos baixos (falta produção), a plaquetopenia dá petéquias e sangramentos, e a neutropenia dá febre e infecção; a medula expandida e a infiltração do periósteo dão dor óssea, que na criança costuma ser noturna e migratória.|q-unifesp2023-063,q-scmsp2025-056,q-usprp2023-001,q-tp20202-049,q-tp20232-045,q-tp20241-047,q-unesp2024-003,q-unicampdis2024-029]] [[Na criança predomina a leucemia linfoide aguda (pico entre 2 e 5 anos, risco maior na síndrome de Down), com linfonodos, baço e fígado aumentados; no adulto, a mieloide.|q-simepm89-093,q-tp20251-043,q-unicampdis2024-029]]

Veja também: **Anemias** (o hemograma das anemias de produção), **Distúrbios hidroeletrolíticos** (lise tumoral e realimentação) e **Tuberculose** (o linfonodo que é diagnóstico diferencial do linfoma).`,
      fragmentos: [
        { id: "agu-crianca", titulo: "Leucemia na criança: dor óssea, palidez e sangramento", conferir: true,
          questoes: ["q-unifesp2023-063","q-scmsp2025-056","q-usprp2023-001","q-tp20202-049","q-tp20232-045","q-tp20241-047","q-unesp2024-003","q-simepm89-093","q-tp20251-043","q-unicampdis2024-029"],
          prosa: `[[Dor óssea ou articular que acorda a criança, com palidez, febre, manchas roxas e visceromegalia, é leucemia até prova em contrário, e não artrite idiopática nem febre reumática: o mielograma confirma, e a criança é encaminhada a centro especializado.|q-usprp2023-001,q-tp20202-049,q-tp20232-045,q-tp20241-047,q-unesp2024-003,q-tp20251-043]] Corticoide antes do mielograma pode mascarar a LLA e atrasar o diagnóstico.`,
          texto: `- Anemia **normocítica com reticulócitos baixos**. {q-unifesp2023-063}
- Dor articular noturna, palidez, equimoses: **leucemia aguda**. {q-tp20202-049,q-tp20232-045,q-tp20241-047,q-unesp2024-003,q-scmsp2025-056}
- Dor que acorda: **mielograma**. {q-usprp2023-001}
- Linfocitose com plaquetopenia e adenomegalia na criança: **LLA**. {q-simepm89-093}
- Bicitopenia, linfonodos e baço: **encaminhar a centro especializado**. {q-tp20251-043}
- Síndrome de Down com equimoses: **leucemia aguda**. {q-unicampdis2024-029}` },
        { id: "agu-adulto", titulo: "Leucemia aguda no adulto e neutropenia febril", conferir: true, diretrizes: ["idsa-neutropenia","nccn"],
          questoes: ["q-usp2025-092","q-usp2024-008"],
          prosa: `[[Pancitopenia com sangramento, febre e reticulócitos baixos em adulto jovem é leucemia aguda: suporte transfusional, antibiótico, controle do sangramento e estudo da medula; a leucemia promielocítica sangra por coagulopatia e é emergência.|q-usp2025-092]] [[Febre em quem fez quimioterapia há poucos dias é neutropenia febril até prova em contrário: interna-se, colhem-se culturas e começa-se antibiótico com ação contra *Pseudomonas* (cefepima) sem esperar o hemograma.|q-usp2024-008]]`,
          texto: `- Adulto com pancitopenia e sangramento: **leucemia aguda**, suporte e medula. {q-usp2025-092}
- Febre após quimioterapia: **internar e cefepima** depois das culturas. {q-usp2024-008}` },
      ],
    },
    {
      id: "lise", titulo: "Lise tumoral e ciclo celular",
      introducao: `[[Tumores de multiplicação rápida e grande massa (LLA com leucocitose alta, linfoma de Burkitt, massa mediastinal) liberam o conteúdo das células quando morrem, espontaneamente ou com a quimioterapia: potássio, fosfato e ácidos nucleicos que viram ácido úrico. O fosfato precipita com cálcio (hipocalcemia), e ácido úrico e fosfato de cálcio entopem o túbulo (lesão renal).|q-tp20222-051,q-sessp2024-049,q-usprp2023-071,q-usp2023-086,q-scmsp2023-009]]`,
      fragmentos: [
        { id: "lis-conduta", titulo: "Reconhecer e prevenir a lise tumoral", conferir: true, diretrizes: ["nccn"],
          questoes: ["q-scmsp2023-009","q-sessp2024-049","q-tp20222-051","q-tp20252-077","q-tp20261-100","q-usprp2023-071","q-usp2023-086"],
          prosa: `[[O critério laboratorial (Cairo-Bishop) pede duas alterações em 3 dias antes ou 7 depois da quimioterapia: ácido úrico ≥ 8 mg/dL, potássio ≥ 6 mEq/L, fósforo ≥ 4,5 mg/dL (6,5 na criança) ou cálcio ≤ 7 mg/dL, ou variação de 25% do valor basal.|q-scmsp2023-009]] [[A prevenção é hidratação vigorosa, alopurinol (ou rasburicase no alto risco) e monitorização de eletrólitos e função renal; transfundir sem necessidade aumenta a viscosidade em quem tem leucocitose muito alta.|q-tp20252-077,q-tp20261-100]] [[Criança com massa mediastinal e insuficiência respiratória precisa de DHL, fósforo e ácido úrico antes de qualquer conduta.|q-usp2023-086]]`,
          texto: `- Critério: **ácido úrico ≥ 8**, ou aumento de 25%. {q-scmsp2023-009}
- Laboratório: **hiperuricemia, hipercalemia, hiperfosfatemia, hipocalcemia**. {q-tp20222-051,q-usprp2023-071}
- Maior divisão celular, **maior risco**. {q-sessp2024-049}
- Prevenção: **hidratação, alopurinol, monitorização**. {q-tp20252-077,q-tp20261-100}
- Massa mediastinal na criança: **DHL, fósforo e ácido úrico**. {q-usp2023-086}` },
        { id: "lis-ciclo", titulo: "Ciclo celular e quimioterápicos", conferir: true,
          questoes: ["q-tp20231-031","q-tp20241-031"],
          prosa: `[[Os quimioterápicos agem em fases do ciclo: o metotrexato bloqueia a síntese de nucleotídeos na fase S, e a vincristina impede os microtúbulos na fase M (mitose).|q-tp20231-031]] [[O Ki-67 marca células fora do repouso (G1, S, G2 e M): quanto maior, mais células se preparando para dividir.|q-tp20241-031]]`,
          texto: `- Metotrexato: **fase S**; vincristina: **fase M**. {q-tp20231-031}
- Ki-67 positivo: **preparação para a divisão**. {q-tp20241-031}` },
      ],
    },
    {
      id: "mieloproliferativas", titulo: "Neoplasias mieloproliferativas e mielodisplasia",
      introducao: `[[Na leucemia mieloide crônica, a translocação t(9;22) gera o cromossomo Philadelphia e o gene BCR::ABL1, uma tirosinoquinase sempre ligada: a medula produz granulócitos que amadurecem, e o sangue mostra leucocitose com todas as fases (mielócitos, metamielócitos, bastões), basofilia e eosinofilia, com esplenomegalia volumosa (saciedade precoce, macicez no espaço de Traube).|q-adap23-007,q-usprp2026-083,q-uspsp1-072,q-uspsp2-009,q-tp20251-004,q-scmsp2022-075]] [[O imatinibe bloqueia essa quinase e é o tratamento da fase crônica.|q-sirio2026-016]]

[[Na trombocitemia essencial e na policitemia (mutação JAK2), as plaquetas em excesso podem ocluir pequenos vasos dos pés: eritromelalgia, dor em queimação e vermelhidão que melhoram no frio e com aspirina.|q-iamspe2022-016]] [[Na síndrome mielodisplásica a medula é cheia mas produz mal (displasia), com citopenias que não respondem a vitaminas; o risco de virar leucemia mieloide aguda depende dos blastos, da citogenética e das citopenias.|q-tp20251-005,q-tp20261-101,q-uspsp2-017]]`,
      fragmentos: [
        { id: "mie-lmc", titulo: "Leucemia mieloide crônica", conferir: true, diretrizes: ["nccn","oms-icc"],
          questoes: ["q-adap23-007","q-usprp2026-083","q-uspsp1-072","q-uspsp2-009","q-sirio2026-016","q-tp20202-004","q-tp20251-004","q-scmsp2022-075"],
          prosa: `[[O diagnóstico se confirma pelo BCR::ABL1: cariótipo, FISH ou PCR. Se o cariótipo não mostra metáfases, o FISH detecta a fusão em núcleos que não estão dividindo.|q-tp20202-004,q-usprp2026-083,q-uspsp2-009]]`,
          texto: `- Leucocitose com todas as fases, basófilos e baço grande: **LMC**. {q-adap23-007,q-uspsp1-072,q-tp20251-004}
- Confirmar: **BCR::ABL1**. {q-usprp2026-083,q-uspsp2-009}
- Cariótipo sem metáfases: **FISH** para t(9;22). {q-tp20202-004}
- Tratamento: **imatinibe**. {q-sirio2026-016}
- Macicez no Traube: **esplenomegalia**. {q-scmsp2022-075}` },
        { id: "mie-smd", titulo: "Trombocitemia e síndrome mielodisplásica", conferir: true, diretrizes: ["oms-icc"],
          questoes: ["q-iamspe2022-016","q-tp20251-005","q-tp20261-101","q-uspsp2-017"],
          prosa: `[[Quimioterapia e radioterapia prévias lesam o DNA da célula-tronco: a mielodisplasia secundária aparece anos depois, com pancitopenia e displasia no sangue.|q-uspsp2-017]]`,
          texto: `- Pés quentes e vermelhos com plaquetas altas: **eritromelalgia**. {q-iamspe2022-016}
- Displasia com < 5% de blastos e cariótipo normal: **baixo risco** de LMA. {q-tp20251-005}
- Mielodisplasia: risco de **evoluir para LMA**. {q-tp20261-101}
- Pancitopenia anos após quimioterapia: **SMD secundária**. {q-uspsp2-017}` },
      ],
    },
    {
      id: "llc", titulo: "Leucemia linfocítica crônica",
      introducao: `[[A LLC é acúmulo de linfócitos B maduros que não morrem, típica do idoso: linfocitose absoluta (≥ 5.000 B monoclonais), muitas vezes achada por acaso, com linfonodos fibroelásticos; a imunofenotipagem do sangue periférico confirma (CD5 e CD23), sem precisar de medula.|q-unifesp2023-007,q-uspsp5-013,q-amrigs2023-007]] [[O linfócito B doente também desregula a imunidade: hipogamaglobulinemia e autoimunidade, como anemia hemolítica com Coombs direto positivo.|q-udisc20262-024]]`,
      fragmentos: [
        { id: "llc-conduta", titulo: "Diagnóstico e complicações da LLC", conferir: true, diretrizes: ["nccn"],
          questoes: ["q-unifesp2023-007","q-uspsp5-013","q-udisc20262-024","q-amrigs2023-007"],
          prosa: `[[Prurido e emagrecimento em idosa com linfocitose não se tratam com hidratante: são motivo para investigar doença linfoproliferativa.|q-amrigs2023-007]]`,
          texto: `- Idoso com linfocitose madura: **imunofenotipagem do sangue periférico**. {q-unifesp2023-007,q-uspsp5-013}
- LLC com anemia nova: **Coombs direto**. {q-udisc20262-024}
- Prurido, emagrecimento e linfocitose: **investigar**. {q-amrigs2023-007}` },
      ],
    },
    {
      id: "linfomas", titulo: "Linfomas",
      introducao: `[[Linfoma é a proliferação clonal de linfócitos no linfonodo: linfonodomegalia indolor, firme, progressiva, às vezes com sintomas B (febre, sudorese noturna, perda de mais de 10% do peso em 6 meses). Só a biópsia excisional do linfonodo inteiro mostra a arquitetura e permite classificar; punção aspirativa não basta.|q-tp20232-028,q-tp20241-001,q-famerp2023-069,q-unicampdis2025-011,q-unesp2023-015,q-usp2026-016]] [[O linfoma de Hodgkin acomete adulto jovem, se espalha de cadeia em cadeia (cervical, supraclavicular, mediastino) e tem poucas células malignas de Reed-Sternberg num fundo inflamatório; prurido e dor no linfonodo com álcool são típicos.|q-scmsp2025-005,q-tp20222-024,q-sirio2024-045,q-sirio2027-018,q-usp2026-016]] [[O linfoma de Burkitt, de crescimento muito rápido, nasce da translocação que liga o MYC ao gene das imunoglobulinas.|q-tp20222-003]]`,
      fragmentos: [
        { id: "lin-diagnostico", titulo: "Linfonodo suspeito, Hodgkin e não Hodgkin", conferir: true, diretrizes: ["nccn"],
          questoes: ["q-scmsp2025-005","q-usp2026-016","q-unesp2023-015","q-tp20222-003","q-tp20222-024","q-tp20232-028","q-tp20241-001","q-tp20252-075","q-famerp2023-069","q-unicampdis2025-011","q-sirio2024-045","q-sirio2027-018"],
          prosa: `[[Linfonodo supraclavicular, maior que 2 cm, endurecido ou que persiste por mais de 4 semanas vai à biópsia, sem tentar antes antibiótico ou corticoide (o corticoide mascara o linfoma).|q-famerp2023-069,q-unesp2023-015]] [[Massa mediastinal que comprime a veia cava superior dá edema de face e pescoço, circulação colateral e dispneia; no idoso com sintomas B, o linfoma não Hodgkin é a causa mais comum.|q-tp20252-075,q-usp2026-016]]`,
          texto: `- Linfonodo suspeito: **biópsia excisional**. {q-tp20232-028,q-tp20241-001,q-unicampdis2025-011,q-unesp2023-015}
- Supraclavicular em adulto: **biópsia**, não antibiótico. {q-famerp2023-069}
- Hodgkin II-B com axila: espera-se captação no **mediastino**. {q-scmsp2025-005}
- Jovem, cervical, sintomas B: **Hodgkin**. {q-tp20222-024,q-sirio2024-045}
- Hodgkin: **Reed-Sternberg** em minoria. {q-sirio2027-018}
- Burkitt: **translocação do MYC**. {q-tp20222-003}
- Edema facial e massa mediastinal: **linfoma com síndrome da veia cava superior**. {q-tp20252-075,q-usp2026-016}` },
      ],
    },
    {
      id: "mieloma", titulo: "Mieloma múltiplo e gamopatias",
      introducao: `[[No mieloma, um clone de plasmócitos ocupa a medula e produz uma imunoglobulina (ou só cadeia leve) monoclonal. As lesões de órgão vêm do clone: o plasmócito ativa osteoclastos (lesões líticas, dor lombar, hipercalcemia com confusão e constipação), as cadeias leves entopem o túbulo (insuficiência renal), a medula ocupada dá anemia, e as imunoglobulinas normais caem (infecções).|q-adap23-063,q-scmsp2025-007,q-tp20232-019,q-tp20241-021,q-tp20261-018,q-famerp2022-051,q-unesp2025-044,q-einstein2022-010]] [[O excesso de proteína faz as hemácias se empilharem (rouleaux) e aumenta o VHS; a eletroforese mostra o pico monoclonal.|q-einstein2022-010,q-unesp2024-047,q-scmsp2025-007]]`,
      fragmentos: [
        { id: "mie-diagnostico", titulo: "Investigar o mieloma", conferir: true, diretrizes: ["imwg"],
          figuras: [{ arquivo: "figuras/mieloma.svg", legenda: "Esquema autoral: as lesões de órgão do mieloma e de onde cada uma vem." }],
          casos: ["q-usp2026-007"],
          questoes: ["q-adap23-063","q-scmsp2025-007","q-usp2026-007","q-tp20232-019","q-tp20241-021","q-tp20261-018","q-unesp2024-047","q-unesp2025-044","q-famerp2022-051","q-uspsp2-015","q-einstein2022-010"],
          prosa: `[[A investigação junta eletroforese e imunofixação de proteínas, cadeias leves livres no soro, biópsia de medula (mieloma = 10% ou mais de plasmócitos clonais com lesão de órgão) e imagem do esqueleto.|q-adap23-063,q-scmsp2025-007,q-unesp2024-047,q-uspsp2-015]] [[Pico monoclonal sem anemia, insuficiência renal, hipercalcemia ou lesão óssea começa por imunofixação e cadeias leves para classificar a gamopatia (MGUS ou mieloma latente).|q-usp2026-007]] [[Idoso confuso com dor óssea: dosar o cálcio é o primeiro passo.|q-tp20232-019,q-tp20241-021,q-tp20261-018]]`,
          texto: `- Dor lombar, anemia, cálcio e creatinina altos: **eletroforese de proteínas**. {q-scmsp2025-007,q-famerp2022-051}
- Confirmar: **medula com ≥ 10% de plasmócitos clonais**. {q-adap23-063,q-unesp2024-047}
- Pico sem lesão de órgão: **imunofixação e cadeias leves**. {q-usp2026-007}
- Confusão e dor óssea: **cálcio sérico**. {q-tp20232-019,q-tp20241-021,q-tp20261-018}
- Infecções e hipogamaglobulinemia no idoso: **gamopatia monoclonal**. {q-unesp2025-044}
- Esfregaço: **rouleaux**. {q-einstein2022-010}
- Imagem do esqueleto: **inventário ósseo**. {q-uspsp2-015}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Os exames de imagem e de genética mudaram nas classificações recentes.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-uspsp2-015","q-tp20202-004"],
          prosa: `[[A imagem preferida no mieloma passou a ser a tomografia de corpo inteiro de baixa dose (ou PET-TC), mais sensível que a radiografia; provas ainda cobram o inventário radiológico simples.|q-uspsp2-015]] [[O BCR::ABL1 pode ser pesquisado por FISH ou PCR também no sangue periférico; a prova pediu FISH na medula.|q-tp20202-004]]`,
          texto: `- Mieloma: **TC de baixa dose ou PET-TC**; a prova cobrou **radiografia do esqueleto**. {q-uspsp2-015}
- BCR::ABL1: **sangue ou medula**; a prova pediu **FISH na medula**. {q-tp20202-004}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `As leucemias que a prova manda separar, resumidas pelos capítulos acima.`,
      fragmentos: [
        { id: "comp-leucemias", titulo: "Leucemias agudas e crônicas", conferir: true,
          questoes: ["q-tp20251-004","q-unifesp2023-007","q-simepm89-093","q-usp2025-092"],
          prosa: `| Leucemia | Quem | Sangue | Confirma |
| --- | --- | --- | --- |
| LLA | criança 2–5 anos | blastos, citopenias | mielograma e imunofenotipagem |
| LMA | adulto | blastos, citopenias, sangramento | mielograma |
| LMC | adulto | leucocitose com todas as fases, basófilos | BCR::ABL1 |
| LLC | idoso | linfocitose madura | imunofenotipagem do sangue |

[[Aguda é blasto que não amadurece e derruba as outras linhagens; crônica é célula madura demais, com a medula ainda produzindo.|q-tp20251-004,q-unifesp2023-007,q-simepm89-093,q-usp2025-092]]`,
          texto: `- Granulócitos em todas as fases: **LMC**. {q-tp20251-004}
- Linfocitose madura no idoso: **LLC**. {q-unifesp2023-007}
- Criança com linfocitose e plaquetopenia: **LLA**. {q-simepm89-093}
- Adulto com pancitopenia e sangramento: **aguda**. {q-usp2025-092}` },
      ],
    },
  ],
});
