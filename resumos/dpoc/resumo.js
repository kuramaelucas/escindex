/* resumos/dpoc/resumo.js — resumo adaptativo de DPOC (ass-dpoc): mecanismo (enfisema, bronquite,
   hiperinsuflação), diagnóstico espirométrico, classificação GOLD (graus e grupos ABE, antigos ABCD),
   tratamento de manutenção (LAMA/LABA, corticoide inalatório pelos eosinófilos), medidas que mudam a
   história (parar de fumar, oxigênio, reabilitação), exacerbação, insuficiência respiratória e VNI,
   cor pulmonale; armadilhas e tabela.  Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- dpoc */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "dpoc",
  titulo: "Doença pulmonar obstrutiva crônica",
  assunto: "ass-dpoc",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "gold-2025", texto: "Global Initiative for Chronic Obstructive Lung Disease — GOLD 2025 Report (Global Strategy for Prevention, Diagnosis and Management of COPD)", lidoEm: null },
    { id: "sbpt-dpoc", texto: "Sociedade Brasileira de Pneumologia e Tisiologia — Recomendações para o tratamento farmacológico da DPOC (J Bras Pneumol 2021/2023)", lidoEm: null },
    { id: "ers-ats-vni", texto: "ERS/ATS — Clinical practice guidelines: noninvasive ventilation for acute respiratory failure (Eur Respir J 2017)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada; entra a reposição q-amrigs2022-014-ia", questoes: ["q-amrigs2022-014"] },
  ],
  doencas: [
    {
      id: "mecanismo", titulo: "Mecanismo e diagnóstico",
      introducao: `[[A fumaça inflama a via aérea e o parênquima por décadas. Na pequena via aérea, inflamação, muco e fibrose estreitam o calibre (bronquite); no alvéolo, proteases destroem as paredes e a **retração elástica** (enfisema). Sem a tração elástica que mantém os bronquíolos abertos, eles colapsam na expiração: o ar fica preso, o pulmão fica **mais complacente e hiperinsuflado**, e o tórax vira barril, hipersonoro, com murmúrio reduzido. No esforço, a frequência sobe, o tempo de expirar encurta e o ar se acumula ainda mais — a **hiperinsuflação dinâmica** é o que limita o paciente.|q-usprp2024-056,q-usprp2027-036,q-udisc20262-004]]

Veja também: **Asma**, **Tabagismo**, **Insuficiência respiratória e ventilação**, **Hipertensão pulmonar** e **Distúrbios ácido-base** quando houver resumo.`,
      fragmentos: [
        { id: "mec-espirometria", titulo: "Espirometria e o que mais pedir", conferir: true, diretrizes: ["gold-2025"],
          figuras: [{ arquivo: "figuras/dpoc-ciclo.svg", legenda: "Esquema autoral: da perda de retração elástica à hiperinsuflação dinâmica e à hipoxemia crônica." }],
          casos: ["q-tp20202-035","q-tp20241-009"],
          questoes: ["q-usprp2024-056","q-usprp2027-036","q-udisc20262-004","q-iamspe2025-009","q-amrigs2024-016","q-amrigs2022-014-ia","q-tp20232-004","q-uspsp4-017"],
          prosa: `[[O diagnóstico é espirométrico: **VEF1/CVF pós-broncodilatador abaixo de 0,70** em quem tem exposição e sintomas; a espirometria mede CVF e VEF1, e é por isso o padrão-ouro. O VEF1 em porcentagem do previsto dá a gravidade da obstrução (GOLD 1 ≥ 80%, 2 50–79%, 3 30–49%, 4 < 30%).|q-iamspe2025-009,q-amrigs2024-016,q-amrigs2022-014-ia]] [[Carga tabágica = maços por dia × anos (30 cigarros por dia por 40 anos = 60 maços-ano). DPOC antes dos 45 anos, em quem pouco fumou, pede **alfa-1-antitripsina**.|q-amrigs2022-014-ia,q-amrigs2024-016]] [[Primeiro episódio de sibilância num fumante, sem espirometria: trata-se o sintoma com **broncodilatador de resgate** e confirma-se o diagnóstico antes de manutenção.|q-uspsp4-017]] [[Dor torácica e dispneia súbita num enfisematoso grave: **pneumotórax** por ruptura de bolha.|q-tp20232-004]]`,
          texto: `- **VEF1/CVF < 0,70** pós-BD; VEF1% dá o grau. {q-iamspe2025-009,q-amrigs2024-016,q-amrigs2022-014-ia}
- Jovem ou pouco tabagismo: **alfa-1-antitripsina**. {q-amrigs2024-016}
- Sem espirometria: **resgate** e confirmar. {q-uspsp4-017}
- Piora súbita: **pneumotórax**. {q-tp20232-004}
- Mecanismo: **complacência alta**, **hiperinsuflação dinâmica**. {q-usprp2024-056,q-usprp2027-036,q-udisc20262-004}` },
      ],
    },
    {
      id: "manutencao", titulo: "Tratamento de manutenção",
      introducao: `[[O tratamento olha para duas coisas: quanto o paciente sofre (dispneia pela mMRC, CAT) e quanto ele exacerba no último ano. Pelo GOLD atual, grupo **A** tem poucos sintomas e exacerbações; **B**, muitos sintomas; **E**, duas ou mais exacerbações moderadas ou uma internação, independentemente dos sintomas (os antigos C e D se fundiram em E).|q-uspsp1-058,q-tp20241-009,q-tp20202-035,q-unifesp2023-014]]`,
      fragmentos: [
        { id: "man-broncodilatador", titulo: "Broncodilatadores e corticoide inalatório", conferir: true, diretrizes: ["gold-2025","sbpt-dpoc"],
          casos: ["q-uspsp1-058","q-usp2025-093","q-unifesp2026-040","q-uspsp3-081"],
          questoes: ["q-uspsp1-058","q-tp20241-009","q-tp20202-035","q-unifesp2023-014","q-einstein2027-005","q-sessp2026-003","q-unesp2023-048","q-unifesp2026-040","q-uspsp3-081","q-amrigs2022-014-ia","q-einstein2024-015","q-einstein2024-014","q-adap21-098","q-usp2025-093","q-famema2021-036","q-scmsp2021-007"],
          prosa: `[[O broncodilatador de longa ação abre a via aérea, reduz a hiperinsuflação e diminui exacerbações: no grupo A, um broncodilatador (o **LAMA**, tiotrópio, é o mais usado); no B e no E, **LAMA + LABA** (umeclidínio/vilanterol, tiotrópio/olodaterol), com salbutamol de resgate.|q-uspsp1-058,q-tp20241-009,q-tp20202-035,q-einstein2027-005,q-sessp2026-003,q-unesp2023-048,q-amrigs2022-014-ia]] [[O corticoide inalatório isolado ou com LABA não é a base: no DPOC sem asma, **LAMA/LABA é preferível a LABA/corticoide**, que aumenta pneumonia. Quem está em LABA/corticoide sem benefício passa a LAMA/LABA.|q-unifesp2026-040,q-uspsp3-081,q-amrigs2022-014-ia]] [[O corticoide inalatório entra (terapia tripla) quando o paciente **exacerba apesar de LAMA/LABA e tem eosinófilos ≥ 300/mm³** (ou ≥ 100 com exacerbações). Por isso o **hemograma** ajuda a ajustar o tratamento.|q-einstein2024-015,q-einstein2024-014,q-adap21-098,q-usp2025-093,q-famema2021-036,q-unifesp2023-014]] [[Broncodilatador reduz sintoma e exacerbação, mas não mortalidade; essa diferença aparece em afirmativas de prova.|q-scmsp2021-007]]`,
          texto: `- A: **um broncodilatador**; B e E: **LAMA + LABA**. {q-uspsp1-058,q-tp20241-009,q-tp20202-035,q-einstein2027-005,q-sessp2026-003,q-unesp2023-048}
- LABA/CI sem benefício: trocar por **LAMA/LABA**. {q-unifesp2026-040,q-uspsp3-081,q-amrigs2022-014-ia}
- Exacerba + **eosinófilos ≥ 300**: tripla. {q-einstein2024-015,q-einstein2024-014,q-adap21-098,q-usp2025-093,q-famema2021-036,q-unifesp2023-014}
- Broncodilatador **não** reduz mortalidade. {q-scmsp2021-007}` },
        { id: "man-historia", titulo: "O que muda a história natural", conferir: true, diretrizes: ["gold-2025"],
          questoes: ["q-adap21-109","q-adap26-040","q-scmsp2025-013","q-famema2021-027","q-fmabc2021-025","q-iamspe2021-008","q-uspsp3-081","q-sessp2026-098","q-amrigs2020-007","q-amrigs2024-016"],
          prosa: `[[**Parar de fumar** é a única medida que reduz a perda acelerada do VEF1; com apoio comportamental e vareniclina ou bupropiona.|q-adap21-109]] [[**Oxigênio domiciliar contínuo** (≥ 15 horas por dia) **reduz mortalidade** na hipoxemia crônica em repouso, medida na fase estável: **PaO2 ≤ 55 mmHg ou SatO2 ≤ 88%**; ou **PaO2 56–59 / SatO2 89%** com policitemia (hematócrito > 55%), hipertensão pulmonar ou cor pulmonale. Meta de saturação ≥ 90%.|q-adap26-040,q-scmsp2025-013,q-famema2021-027,q-fmabc2021-025,q-iamspe2021-008,q-uspsp3-081]] [[A **reabilitação pulmonar** melhora tolerância ao esforço, dispneia e qualidade de vida, e é o próximo passo de quem já usa broncodilatador duplo e continua limitado sem exacerbar. Em casos selecionados entram azitromicina diária (exacerbadores), redução de volume pulmonar e teofilina (pouco usada pela toxicidade).|q-sessp2026-098,q-amrigs2020-007,q-amrigs2024-016]]`,
          texto: `- **Parar de fumar**: único que freia o VEF1. {q-adap21-109}
- **O2 ≥ 15 h/dia** reduz mortalidade: PaO2 ≤ 55 ou 56–59 com policitemia/cor pulmonale. {q-adap26-040,q-scmsp2025-013,q-famema2021-027,q-fmabc2021-025,q-iamspe2021-008,q-uspsp3-081}
- Limitado sem exacerbar: **reabilitação**. {q-sessp2026-098,q-amrigs2020-007}` },
      ],
    },
    {
      id: "exacerbacao", titulo: "Exacerbação e insuficiência respiratória",
      introducao: `[[Exacerbação é a piora aguda de dispneia, tosse e escarro, em geral por infecção viral ou bacteriana. A via aérea já estreita inflama, a hiperinsuflação piora, o trabalho respiratório sobe e o músculo cansa: o CO2 retido é o sinal de que a bomba está falhando.|q-002,q-sessp2024-096,q-didepm-021]]`,
      fragmentos: [
        { id: "exa-tratamento", titulo: "Broncodilatador, corticoide e antibiótico", conferir: true, diretrizes: ["gold-2025"],
          questoes: ["q-002","q-sessp2024-096","q-didepm-021","q-famema2021-035","q-unicamp2022-013","q-usprp2021-109","q-einstein2025-010"],
          prosa: `[[Tratamento: **broncodilatador de curta ação** (beta-2 com ou sem ipratrópio) em doses repetidas, **prednisona 40 mg por 5 dias**, e **antibiótico** quando o escarro fica purulento com aumento de volume ou dispneia (critérios de Anthonisen) ou há necessidade de ventilação. Sem acidose, sem sinais de gravidade, o tratamento pode ser ambulatorial.|q-002,q-sessp2024-096,q-didepm-021]] [[Sem melhora após broncodilatadores no pronto-socorro, com saturação baixa e taquipneia: **internar**.|q-famema2021-035]] [[O oxigênio busca **SpO2 de 88 a 92%**. Oxigênio demais (máscara com reservatório a 15 L/min) piora a relação ventilação-perfusão e retira o estímulo hipóxico: o CO2 sobe, a consciência cai — **narcose por CO2**.|q-unicamp2022-013,q-usprp2021-109]] [[Edema, hepatomegalia e piora da dispneia sem sinais de infecção num DPOC estável pedem imagem do tórax, D-dímero e oxigênio; **corticoide sistêmico não** está indicado sem exacerbação.|q-einstein2025-010]]`,
          texto: `- **SABA + prednisona 5 dias + antibiótico** se escarro purulento. {q-002,q-sessp2024-096,q-didepm-021}
- Não melhorou no PS: **internar**. {q-famema2021-035}
- **SpO2 88–92%**; O2 em excesso → narcose por CO2. {q-unicamp2022-013,q-usprp2021-109}
- Sem exacerbação: **sem corticoide**. {q-einstein2025-010}` },
        { id: "exa-vni", titulo: "Gasometria e ventilação não invasiva", conferir: true, diretrizes: ["ers-ats-vni"],
          casos: ["q-usp2025-094"],
          questoes: ["q-adap23-014","q-usprp2022-075","q-einstein2024-013","q-usp2025-094","q-tp20202-002","q-iamspe2021-008"],
          prosa: `[[Exacerbação com **acidose respiratória (pH < 7,35, PaCO2 > 45)** é a melhor indicação de **VNI** em dois níveis: ela descansa o músculo, reduz intubação e mortalidade. Reavalia-se clínica e gasometria em 1–2 horas.|q-adap23-014,q-usprp2022-075,q-einstein2024-013]] [[Ajuste inicial típico: **EPAP 5–6 cmH2O** (compensa a auto-PEEP) e **IPAP 12–15** (ventila, tira CO2), com FiO2 mínima para a meta.|q-usp2025-094]] [[Bicarbonato alto com pH quase normal é acidose respiratória **crônica compensada**; bicarbonato acima do esperado, alcalose metabólica associada (diurético). Bicarbonato baixo com CO2 alto é **acidose mista** (por exemplo, pneumonia com sepse).|q-tp20202-002,q-iamspe2021-008]]`,
          texto: `- pH < 7,35 e CO2 alto: **VNI**. {q-adap23-014,q-usprp2022-075,q-einstein2024-013}
- **EPAP 6, IPAP 14**. {q-usp2025-094}
- HCO3 baixo com CO2 alto: **mista**. {q-tp20202-002,q-iamspe2021-008}` },
        { id: "exa-cor", titulo: "Hipertensão pulmonar e cor pulmonale", conferir: true, diretrizes: ["gold-2025"],
          questoes: ["q-usprp2021-098","q-usprp2025-078","q-tp20251-023","q-tp20261-070"],
          prosa: `[[A hipóxia crônica contrai as arteríolas pulmonares (vasoconstrição hipóxica) e o enfisema destrói o leito vascular: a **resistência vascular pulmonar** sobe, o ventrículo direito hipertrofia e depois falha — estase jugular, hepatomegalia, edema, B2 hiperfonética, eixo desviado à direita. A medida que trata a causa é o **oxigênio**.|q-usprp2021-098,q-usprp2025-078,q-tp20251-023,q-tp20261-070]]`,
          texto: `- Hipóxia → **resistência vascular pulmonar** → cor pulmonale; tratar com **O2**. {q-usprp2021-098,q-usprp2025-078,q-tp20251-023,q-tp20261-070}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["gold-2025"],
          questoes: ["q-unifesp2023-014","q-tp20202-035","q-tp20241-009","q-uspsp1-058","q-famema2021-036","q-scmsp2025-013"],
          prosa: `[[**Grupos ABCD**: desde o GOLD 2023, C e D viraram **E**. As provas antigas classificaram em **GOLD 3D** com tripla (unifesp2023-014), **2C** com LAMA (tp20202-035), **2B** (tp20241-009) e **2A** com tiotrópio (uspsp1-058).|q-unifesp2023-014,q-tp20202-035,q-tp20241-009,q-uspsp1-058]] [[**Corticoide inalatório como passo definitivo**: a regra exige exacerbações e eosinófilos; a famema2021-036 escolheu **associar corticoide inalatório** sem citar eosinófilos.|q-famema2021-036]] [[**Pontos de corte do oxigênio**: a regra é PaO2 ≤ 55 / Sat ≤ 88% (ou 56–59 com cor pulmonale); a scmsp2025-013 usou **≤ 59 mmHg e ≤ 89%**, porque o caso tinha repercussão.|q-scmsp2025-013]]`,
          texto: `- Provas antigas usam **A–D**; hoje C+D = **E**. {q-unifesp2023-014,q-tp20202-035,q-tp20241-009,q-uspsp1-058}
- Corticoide inalatório sem eosinófilos: a prova aceitou. {q-famema2021-036}
- O2 com **≤ 59 e ≤ 89%**. {q-scmsp2025-013}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: estável e exacerbado",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-dpoc", titulo: "Situação e conduta", conferir: true,
          questoes: ["q-sessp2026-003","q-adap21-098","q-adap26-040","q-002","q-adap23-014"],
          prosa: `[[Cada situação tem uma medida principal.|q-sessp2026-003,q-adap21-098,q-adap26-040,q-002,q-adap23-014]]

| Situação | Medida principal | Por quê |
|---|---|---|
| Estável, sintomático | LAMA + LABA, resgate, reabilitação | abre via aérea, reduz hiperinsuflação |
| Exacerba com eosinófilos ≥ 300 | + corticoide inalatório | reduz exacerbações nesse fenótipo |
| PaO2 ≤ 55 em repouso | O2 ≥ 15 h/dia | reduz mortalidade |
| Exacerbação | SABA, prednisona 5 dias, antibiótico se purulento | trata inflamação e infecção |
| Acidose respiratória | VNI | descansa o músculo, evita intubação |`,
          texto: `- Estável: **LAMA + LABA**. {q-sessp2026-003}
- Eosinófilos altos: **+ CI**. {q-adap21-098}
- Hipoxemia crônica: **O2**. {q-adap26-040}
- Exacerbação: **SABA + corticoide ± ATB**. {q-002}
- Acidose: **VNI**. {q-adap23-014}` },
      ],
    },
  ],
});
