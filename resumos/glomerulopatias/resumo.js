/* resumos/glomerulopatias/resumo.js — resumo adaptativo de síndromes glomerulares: exame de urina e
   hematúria glomerular, síndrome nefrótica (fisiopatologia, complicações, lesão mínima na criança,
   GESF, membranosa, causas secundárias), síndrome nefrítica (pós-estreptocócica, IgA), glomerulonefrite
   rapidamente progressiva e tabela comparativa no fim. Molde: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- glomerulopatias */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "glomerulopatias",
  titulo: "Síndromes glomerulares",
  assunto: "ass-nefro-glomerulopatias",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "kdigo-glomerulo", texto: "KDIGO 2021 Clinical Practice Guideline for the Management of Glomerular Diseases (e atualizações de nefropatia por IgA e membranosa, 2025)", lidoEm: "2026-11-19" },
    { id: "ipna-nefrotica", texto: "IPNA — Clinical practice recommendations for the diagnosis and management of children with steroid-sensitive nephrotic syndrome (2022)", lidoEm: null },
    { id: "sbp-nefrotica", texto: "SBP — Síndrome nefrótica e glomerulonefrite difusa aguda na criança (documentos científicos)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "litíase renal, tema de outro assunto", questoes: ["q-sirio2024-019"] },
  ],
  doencas: [
    {
      id: "urina", titulo: "O que a urina diz",
      introducao: `[[A hemácia que atravessa o glomérulo lesado sai deformada (dismórfica) e se cola na proteína do túbulo formando cilindros hemáticos; hematúria com cilindro hemático, dismorfismo ou proteinúria acima de 500 mg/dia é glomerular.|q-amrigs2022-010,q-iamspe2021-007]] [[Cada cilindro aponta um lugar: hemático, glomérulo inflamado; gorduroso (corpos ovais com lipídio), síndrome nefrótica; granuloso pigmentado, necrose tubular aguda.|q-sirio2023-004,q-scmsp2025-009,q-usprp2022-074]]

Veja também: **Hipertensão arterial** e **Diabetes mellitus** (proteinúria e proteção renal) e **Diarreia aguda e desidratação** (síndrome hemolítico-urêmica).`,
      fragmentos: [
        { id: "uri-cilindros", titulo: "Cilindros e hematúria glomerular", conferir: true,
          questoes: ["q-amrigs2022-010","q-iamspe2021-007","q-sirio2023-004","q-scmsp2025-009","q-usprp2022-074","q-tp20222-010"],
          texto: `- Hematúria glomerular: cilindros **hemáticos**. {q-amrigs2022-010}
- Proteinúria **≥ 500 mg/dia** sugere hematúria glomerular. {q-iamspe2021-007}
- Cilindros **granulosos**: necrose tubular aguda. {q-sirio2023-004}
- Nefrótica: cilindros **gordurosos**, lipidúria. {q-scmsp2025-009,q-usprp2022-074}
- Proteinúria glomerular: **inflamação e dano da membrana basal** aumentam a permeabilidade. {q-tp20222-010}` },
      ],
    },
    {
      id: "nefrotica", titulo: "Síndrome nefrótica",
      introducao: `[[Quando a barreira de filtração (podócito e membrana basal) perde a seletividade, passa proteína em grande quantidade: proteinúria acima de 3,5 g/1,73 m² por dia no adulto (ou 40 mg/m²/h na criança), albumina baixa, edema e dislipidemia, porque o fígado aumenta a síntese de lipoproteínas.|q-sirio2021-003,q-tp20212-047,q-scmsp2022-034,q-einstein2024-038,q-famema2021-098]] [[A urina também perde antitrombina e imunoglobulinas: daí as tromboses (veia renal, seio venoso, embolia pulmonar), mais comuns na membranosa, e as infecções por germes encapsulados, sobretudo a peritonite pelo pneumococo.|q-scmsp2026-014,q-sessp2023-036,q-scmsp2021-042,q-udisc20262-026,q-tp20251-006,q-usp2025-063,q-unifesp2023-074,q-tp20251-046]]

[[Na criança de 1 a 10 anos, a causa quase sempre é a lesão mínima: edema que começa nas pálpebras pela manhã, sem hematúria, hipertensão nem complemento baixo, e responde a corticoide, que se dá sem biópsia; a resposta ao corticoide é o maior fator prognóstico.|q-scmsp2026-056,q-adap21-042,q-uspsp5-116,q-simepm89-099,q-usprp2026-060,q-sirio2022-049]] [[No adulto, as primárias são a membranosa (anti-PLA2R, que dispensa biópsia em muitos casos; secundária a câncer, hepatite B, lúpus e drogas), a GESF (mais comum no adulto negro e jovem; colapsante no HIV) e a lesão mínima (AINE, linfoma).|q-adap22-093,q-fmabc2024-010,q-famerp2024-072,q-sirio2023-011,q-sirio2022-010]]`,
      fragmentos: [
        { id: "nef-fisio", titulo: "Definição e complicações", conferir: true,
          figuras: [{ arquivo: "figuras/nefrotica.svg", legenda: "Esquema autoral: as perdas urinárias da síndrome nefrótica e suas consequências." }],
          casos: ["q-unesp2026-016"],
          questoes: ["q-sirio2021-003","q-tp20212-047","q-scmsp2022-034","q-einstein2024-038","q-famema2021-098","q-scmsp2026-014","q-sessp2023-036","q-scmsp2021-042","q-udisc20262-026","q-tp20251-006","q-usp2025-063","q-unifesp2023-074","q-tp20251-046","q-unesp2026-016","q-einstein2021-026"],
          texto: `- Nefrótica: **proteinúria > 3,5 g**, dislipidemia; pode ser secundária (tuberculose). {q-sirio2021-003}
- Criança: **proteinúria maciça e colesterol alto**; HDL baixo. {q-tp20212-047,q-scmsp2022-034,q-einstein2024-038}
- Lesão mínima: **proteinúria > 50 mg/kg/dia e hipoalbuminemia** (sem hipergamaglobulinemia). {q-famema2021-098}
- Riscos: **hipovolemia e trombose**. {q-scmsp2026-014,q-sessp2023-036}
- Cefaleia e convulsão em nefrótica: **trombose de seio venoso**. {q-scmsp2021-042}
- Dor no flanco súbita: trombose de veia renal, mais na **membranosa**. {q-udisc20262-026}
- Dispneia súbita: **embolia pulmonar**. {q-tp20251-006}
- Infecção: perda urinária de **imunoglobulinas**; peritonite por ***S. pneumoniae***. {q-usp2025-063,q-unifesp2023-074}
- Febre, dor e ascite: **peritonite bacteriana**, punção e antibiótico. {q-tp20251-046}
- Percussão positiva para ascite: **anasarca** na recidiva. {q-unesp2026-016}
- Menos esperado na lesão mínima: **complemento baixo**. {q-einstein2021-026}` },
        { id: "nef-crianca", titulo: "Lesão mínima na criança: diagnóstico e tratamento", conferir: true, diretrizes: ["ipna-nefrotica","sbp-nefrotica"],
          questoes: ["q-scmsp2026-056","q-adap21-042","q-uspsp5-116","q-simepm89-099","q-usprp2026-060","q-sirio2022-049","q-iamspe2023-048","q-tp20231-047","q-unesp2021-011","q-sirio2025-042","q-amrigs2020-079","q-uspsp4-112","q-usp2022-055","q-usp2023-087","q-unicampdis2022-032","q-unicampdis2024-025"],
          prosa: `[[O tratamento é prednisona 60 mg/m²/dia (máximo 60 mg) por 4 a 6 semanas, seguida de dias alternados, com dieta sem sal; albumina com furosemida só no edema grave ou com repercussão.|q-adap21-042,q-uspsp5-116,q-amrigs2020-079,q-uspsp4-112]] Investiga-se causa secundária (biópsia) quando a idade foge de 1 a 10 anos, há hematúria, hipertensão, complemento baixo, insuficiência renal ou não há resposta ao corticoide.`,
          texto: `- 3 anos, edema e ascite sem hematúria: **lesão mínima**. {q-scmsp2026-056,q-sirio2022-049}
- Distribuição por idade: pico **entre 2 e 6 anos**. {q-usprp2026-060}
- **Prednisona 60 mg/m²/dia**, sem biópsia inicial. {q-adap21-042,q-uspsp5-116,q-iamspe2023-048}
- Confirma: **proteinúria e albuminemia**; trata com prednisona, albumina e furosemida se grave. {q-tp20231-047,q-sirio2025-042,q-unicampdis2022-032,q-unicampdis2024-025}
- Pode haver hematúria discreta com proteinúria e **hipoalbuminemia**. {q-unesp2021-011}
- Controle do edema: **restrição de sal**. {q-amrigs2020-079}
- Congestão com desconforto respiratório: **furosemida**. {q-uspsp4-112}
- Prognóstico: **resposta ao corticoide e recidivas**. {q-simepm89-099}
- Corticodependente que melhorou: **alta e seguimento**. {q-usp2022-055}
- Achado atípico nos exames: **investigar secundária**. {q-usp2023-087}` },
        { id: "nef-adulto", titulo: "Adulto: membranosa, GESF e causas secundárias", conferir: false, diretrizes: ["kdigo-glomerulo"],
          casos: ["q-tp20261-017"],
          questoes: ["q-adap22-093","q-fmabc2024-010","q-famerp2024-072","q-sirio2023-011","q-sirio2022-010","q-tp20251-032","q-tp20261-017","q-usprp2023-074","q-iamspe2022-012","q-amrigs2020-012","q-tp20241-034","q-usprp2023-075"],
          texto: `- **Anti-PLA2R** alto: membranosa primária, muitas vezes sem biópsia. {q-adap22-093}
- Membranosa com anti-PLA2R negativo no idoso: procurar **câncer** (TC de tórax). {q-fmabc2024-010}
- Jovem com nefrótica e hipertensão: **GESF**. {q-famerp2024-072}
- Esclerose de parte do glomérulo: **GESF**; colapso das alças: colapsante. {q-tp20251-032,q-tp20261-017}
- **Colapsante**: HIV, Still, bifosfonato. {q-sirio2023-011,q-iamspe2022-012}
- AINE: **lesão mínima e membranosa**. {q-sirio2022-010}
- Após IVAS com lipidúria e sem hematúria: **lesão mínima**. {q-usprp2023-074}
- Hepatite C: **membranoproliferativa**. {q-amrigs2020-012}
- Lúpus: pode dar **síndrome nefrótica**. {q-tp20241-034}
- Proteinúria em hipertenso: associar **BRA**. {q-usprp2023-075}` },
      ],
    },
    {
      id: "nefritica", titulo: "Síndrome nefrítica",
      introducao: `[[Na síndrome nefrítica, a inflamação do glomérulo reduz a filtração e retém sal e água: hematúria (urina cor de coca-cola), edema, hipertensão e oligúria, com proteinúria menor.|q-tp20231-008,q-famema2021-090,q-usprp2021-042]] [[A glomerulonefrite pós-estreptocócica aparece 1 a 3 semanas depois da faringite ou 3 a 6 depois da piodermite, com C3 baixo que volta ao normal em até 8 semanas e anticorpos contra o estreptococo (ASLO após faringite, anti-DNase B após pele); o tratamento é de suporte — sal, água, furosemida —, e a hematúria microscópica pode durar até 18 meses.|q-sessp2024-046,q-unesp2024-012,q-einstein2025-032,q-adap23-074,q-einstein2026-041,q-famema2021-039,q-famema2021-040]]

[[A nefropatia por IgA é a glomerulonefrite mais comum no mundo: hematúria macroscópica dias depois (1 a 2) de uma infecção de vias aéreas, complemento normal, depósitos mesangiais de IgA.|q-adap21-117,q-unifesp2022-093,q-usprp2024-070]]`,
      fragmentos: [
        { id: "nefr-gnpe", titulo: "Glomerulonefrite pós-estreptocócica", conferir: true, diretrizes: ["sbp-nefrotica"],
          casos: ["q-usp2022-047"],
          questoes: ["q-tp20231-008","q-famema2021-090","q-usprp2021-042","q-sessp2024-046","q-unesp2024-012","q-einstein2025-032","q-adap23-074","q-einstein2026-041","q-famema2021-039","q-famema2021-040","q-usprp2023-015","q-uspsp3-029","q-tp20222-055","q-usp2022-047","q-unicampdis2023-032","q-sessp2023-036"],
          texto: `- Edema, hipertensão e hematúria: **síndrome nefrítica**; anti-hipertensivo se necessário. {q-tp20231-008,q-famema2021-090,q-usprp2021-042,q-unicampdis2023-032}
- **C3 baixo** em cerca de 95%. {q-sessp2024-046,q-famema2021-039,q-unesp2024-012}
- Após piodermite: **anti-DNase B**; restrição e furosemida. {q-einstein2025-032}
- Tratamento: **sal, água, furosemida**, anti-hipertensivo, antibiótico para erradicar, **sem corticoide**. {q-adap23-074,q-usprp2023-015,q-uspsp3-029}
- Hipertensão estágio 2 na criança: **furosemida**. {q-tp20222-055}
- Hipercalemia e congestão: **gluconato de cálcio, furosemida, restrição hídrica**. {q-usp2022-047}
- Imunofluorescência: **granular, IgG e C3** ("céu estrelado"). {q-famema2021-040}
- Hematúria microscópica **até 18 meses** sem mau prognóstico. {q-einstein2026-041}` },
        { id: "nefr-iga", titulo: "Nefropatia por IgA", conferir: false, diretrizes: ["kdigo-glomerulo"],
          questoes: ["q-adap21-117","q-unifesp2022-093","q-usprp2024-070","q-simepm89-057","q-fmabc2023-016"],
          texto: `- Hematúria com complemento normal após IVAS: **IgA** (depósitos mesangiais). {q-adap21-117,q-unifesp2022-093}
- Episódios recorrentes de hematúria: **proteinúria** reforça. {q-usprp2024-070}
- Proteinúria persistente pesa no prognóstico: a KDIGO 2021 dá **IECA/BRA na dose máxima tolerada acima de 0,5 g/dia** e considera alto risco acima de **0,75–1 g/dia** (as provas citam 300 mg). {q-simepm89-057}
- **IECA/BRA** na IgA com proteinúria. {q-fmabc2023-016}` },
      ],
    },
    {
      id: "gnrp", titulo: "Glomerulonefrite rapidamente progressiva",
      introducao: `[[A glomerulonefrite rapidamente progressiva perde a função em dias a semanas e mostra crescentes em mais de metade dos glomérulos; é urgência de biópsia e imunossupressão.|q-tp20212-032,q-usprp2021-117]] [[Quando o pulmão sangra junto (síndrome pulmão-rim), pensa-se em anti-membrana basal (Goodpasture), vasculites ANCA e lúpus — não em membranosa.|q-udisc20262-029]] A síndrome hemolítica-urêmica, após diarreia com sangue, também derruba a função renal, por microangiopatia.`,
      fragmentos: [
        { id: "gnrp-diag", titulo: "Crescentes e pulmão-rim", conferir: false, diretrizes: ["kdigo-glomerulo"],
          questoes: ["q-tp20212-032","q-usprp2021-117","q-udisc20262-029","q-sessp2026-058"],
          texto: `- Crescentes em 60%: **GNRP**. {q-tp20212-032}
- Oligúria rápida com hematúria em jovem: **biópsia renal**. {q-usprp2021-117}
- Não causa pulmão-rim: **membranosa**. {q-udisc20262-029}
- Diarreia sanguinolenta e anemia com plaquetas baixas: **SHU**, suporte. {q-sessp2026-058}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `A tabela resume os dois capítulos principais.`,
      fragmentos: [
        { id: "comp-sindromes", titulo: "Nefrótica × nefrítica e as principais causas", conferir: true,
          questoes: ["q-scmsp2026-056","q-unesp2024-012","q-unifesp2022-093"],
          prosa: `| | Nefrótica | Nefrítica |
|---|---|---|
| Proteinúria | **> 3,5 g/dia** | < 3,5 g/dia |
| Hematúria | ausente ou discreta | **macroscópica, cilindros hemáticos** |
| Edema | intenso (anasarca) | moderado |
| Hipertensão | rara (lesão mínima) | **comum** |
| Albumina e lipídios | **baixa; colesterol alto** | normais |

| Doença | Quem | Complemento | Pista |
|---|---|---|---|
| Lesão mínima | criança 2–6 anos | normal | resposta ao corticoide |
| GESF | adulto jovem, negro | normal | hipertensão, HIV (colapsante) |
| Membranosa | adulto | normal | anti-PLA2R, câncer, trombose |
| Pós-estreptocócica | criança | **C3 baixo**, volta em 8 semanas | 1–3 semanas após faringite |
| IgA | adulto jovem | normal | 1–2 dias após IVAS |`,
          texto: `- Criança sem hematúria: **lesão mínima**. {q-scmsp2026-056}
- Coca-cola com C3 baixo: **pós-estreptocócica**. {q-unesp2024-012}
- Hematúria com complemento normal após IVAS: **IgA**. {q-unifesp2022-093}` },
      ],
    },
  ],
});
