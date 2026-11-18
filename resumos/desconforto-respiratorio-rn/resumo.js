/* resumos/desconforto-respiratorio-rn/resumo.js — resumo adaptativo de desconforto respiratório do
   recém-nascido: avaliação (Silverman-Andersen), taquipneia transitória, síndrome do desconforto
   respiratório (doença da membrana hialina), aspiração de mecônio, escape de ar, hipertensão pulmonar
   persistente e causas obstrutivas. Fecha com a tabela comparativa (docs/PROJETO-RESUMOS.md, seção 5).
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- desconforto-respiratorio-rn */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "desconforto-respiratorio-rn",
  titulo: "Desconforto respiratório do recém-nascido",
  assunto: "ass-neo-descrresp",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "europeu-sdr", texto: "European Consensus Guidelines on the Management of Respiratory Distress Syndrome (atualização mais recente)", lidoEm: null },
    { id: "sbp-prn", texto: "Sociedade Brasileira de Pediatria — Programa de Reanimação Neonatal (2022)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada: sem gabarito para medir o erro", questoes: ["q-iamspe2022-046"] },
  ],
  doencas: [
    {
      id: "avaliar", titulo: "Avaliar o recém-nascido que respira mal",
      introducao: `O recém-nascido com desconforto respira rápido (mais de 60 por minuto), geme, abre as asas do nariz e puxa as costelas. [[O boletim de Silverman-Andersen soma cinco sinais de esforço — balanço toracoabdominal, tiragem intercostal, retração xifoide, batimento de asa de nariz e gemido expiratório — e quanto maior a nota, maior o esforço.|q-sirio2021-051,q-unifesp2024-091]]

[[O recém-nascido respira obrigatoriamente pelo nariz: se as coanas estão fechadas, ele fica cianótico em repouso e rosado quando chora, porque o choro abre a boca.|q-famerp2022-024]] [[A conduta inicial comum a quase todas as causas é o CPAP nasal, que mantém os alvéolos abertos no fim da expiração.|q-sirio2023-043,q-unifesp2025-093,q-unesp2026-001]]`,
      fragmentos: [
        { id: "ava-sinais", titulo: "Sinais, CPAP e causas obstrutivas", conferir: true, diretrizes: ["sbp-prn"],
          questoes: ["q-sirio2021-051","q-famerp2022-024","q-sirio2023-043","q-simepm89-091","q-unicampdis2025-025"],
          texto: `- Silverman-Andersen: **balanço toracoabdominal**, tiragem intercostal, retração xifoide, batimento de asa nasal e gemido. {q-sirio2021-051}
- Cianose que **melhora com o choro**: **atresia de coanas**. {q-famerp2022-024}
- Esforço com SpO2 pré-ductal de 90%: **CPAP nasal**. {q-sirio2023-043}
- Entrada de ar diminuída num lobo superior com hiperinsuflação: **enfisema lobar congênito**. {q-simepm89-091}
- Mecônio espesso, hipotônico, FC 80 após os passos iniciais: **VPP com máscara** (não intubar para aspirar). {q-unicampdis2025-025}` },
      ],
    },
    {
      id: "causas", titulo: "As causas mais cobradas",
      introducao: `[[Na taquipneia transitória, o líquido que enche o pulmão fetal demora a ser absorvido — sobretudo após cesárea sem trabalho de parto, que não ativa os canais de sódio do epitélio —: o bebê de termo respira rápido, com pouco esforço, e melhora em 24 a 72 horas.|q-unifesp2024-091,q-iamspe2026-061,q-adap26-090,q-usprp2026-056]]

[[Na síndrome do desconforto respiratório do prematuro (doença da membrana hialina), falta surfactante: os alvéolos colapsam a cada expiração, o pulmão fica pequeno e a radiografia mostra o infiltrado reticulogranular com broncograma aéreo. O corticoide antenatal amadurece o pulmão, e CPAP e surfactante tratam.|q-adap24-054,q-fmabc2022-046,q-sirio2025-055,q-adap25-093,q-adap26-085]]

[[O mecônio aspirado tampa parcialmente os brônquios como uma válvula — o ar entra e não sai —, inflama o pulmão e inativa o surfactante; daí áreas hiperinsufladas ao lado de áreas colapsadas.|q-iamspe2026-062]] [[Quando a pressão pulmonar não cai ao nascer, o sangue desvia da direita para a esquerda pelo canal arterial e pelo forame oval: é a hipertensão pulmonar persistente, tratada com óxido nítrico inalatório.|q-sirio2023-045,q-iamspe2026-064,q-didepm-069]]`,
      fragmentos: [
        { id: "cau-ttrn", titulo: "Taquipneia transitória", conferir: true,
          questoes: ["q-unifesp2024-091","q-iamspe2026-061","q-adap26-090","q-usprp2026-056","q-sessp2026-052","q-unesp2021-003","q-unesp2026-001","q-fmabc2024-049","q-fmabc2026-053"],
          casos: ["q-fmabc2024-049"],
          texto: `- Mecanismo: **atraso na reabsorção do líquido pulmonar fetal** (pelos linfáticos). {q-unifesp2024-091,q-iamspe2026-061,q-unesp2021-003}
- Radiografia: **hiperinsuflação, trama vascular proeminente e líquido nas cisuras**. {q-adap26-090,q-usprp2026-056,q-unesp2021-003,q-fmabc2026-053}
- Melhora em **24 a 72 h**; suporte com **CPAP**, normotermia e monitoração. {q-adap26-090,q-sessp2026-052,q-unesp2026-001}
- Hemograma e PCR normais com o quadro típico: **taquipneia transitória** (pulmão úmido). {q-fmabc2024-049}` },
        { id: "cau-sdr", titulo: "Síndrome do desconforto respiratório (membrana hialina)", conferir: true, diretrizes: ["europeu-sdr"],
          questoes: ["q-adap24-054","q-fmabc2022-046","q-sirio2025-055","q-unifesp2025-093","q-adap25-093","q-adap26-085"],
          texto: `- Mecanismo: **deficiência de surfactante**. {q-adap24-054}
- Radiografia: **infiltrado reticulogranular difuso** (vidro moído), **broncograma aéreo** e volume pulmonar baixo. {q-fmabc2022-046,q-sirio2025-055}
- Tratamento inicial: **CPAP nasal** (e surfactante se a necessidade de O2 sobe). {q-unifesp2025-093}
- Prevenção: **betametasona 12 mg IM, 2 doses com 24 h**, o mais cedo possível no trabalho de parto prematuro. {q-adap25-093,q-adap26-085}` },
        { id: "cau-outras", titulo: "Mecônio, escape de ar, hipertensão pulmonar e apneia", conferir: true,
          questoes: ["q-iamspe2026-062","q-unifesp2026-090","q-famerp2026-034","q-sirio2023-045","q-iamspe2026-064","q-didepm-069","q-unifesp2026-085"],
          texto: `- Aspiração de mecônio: **obstrução parcial com mecanismo de válvula** (hiperinsuflação alternando com colapso). {q-iamspe2026-062}
- Desconforto logo após VPP na sala de parto: **escape de ar** (ruptura da bainha broncoalveolar). {q-unifesp2026-090}
- Piora súbita em CPAP: **pneumotórax**. {q-famerp2026-034}
- Termo, filho de mãe diabética, labilidade de oxigenação e **B2 hiperfonética**: **hipertensão pulmonar persistente**. {q-sirio2023-045}
- Tratamento específico: **óxido nítrico inalatório** (20 ppm, depois reduzir), com ventilação e suporte hemodinâmico. {q-iamspe2026-064,q-didepm-069}
- Prematuro com apneias e sepse pouco provável: **cafeína**. {q-unifesp2026-085}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `A prova descreve um recém-nascido com desconforto e pede a causa. A tabela junta o que os capítulos explicaram.`,
      fragmentos: [
        { id: "cmp-tabela", titulo: "As causas lado a lado", conferir: true,
          questoes: ["q-adap26-090","q-fmabc2022-046","q-iamspe2026-062","q-sirio2023-045"],
          prosa: `| | Taquipneia transitória | Síndrome do desconforto (membrana hialina) | Aspiração de mecônio | Hipertensão pulmonar persistente |
|---|---|---|---|---|
| Quem | **termo**, cesárea eletiva | **prematuro** | termo ou pós-termo, **líquido meconial** | termo, asfixia, mecônio, mãe diabética |
| Mecanismo | líquido pulmonar **não reabsorvido** | **falta de surfactante** | **válvula**, inflamação, surfactante inativado | pressão pulmonar **não cai**, shunt D→E |
| Radiografia | hiperinsuflação, **líquido nas cisuras** | **reticulogranular**, broncograma, volume baixo | **hiperinsuflação + áreas de colapso** | pode ser quase normal |
| Evolução e tratamento | melhora em **24–72 h**; CPAP | **CPAP + surfactante**; corticoide antenatal previne | suporte; risco de escape de ar | **óxido nítrico** |`,
          texto: `- Termo, cesárea, cisuras com líquido: taquipneia transitória. {q-adap26-090}
- Prematuro com reticulogranular: falta de surfactante. {q-fmabc2022-046}
- Mecônio com hiperinsuflação irregular: aspiração meconial. {q-iamspe2026-062}
- Hipoxemia lábil com B2 forte: hipertensão pulmonar. {q-sirio2023-045}` },
      ],
    },
  ],
});
