/* resumos/hepatites/resumo.js — resumo adaptativo de hepatites (ass-hepatites): padrão das enzimas e
   da icterícia, hepatite A (surtos, insuficiência hepática aguda), hepatite B (marcadores, fases,
   quando tratar, transmissão vertical), hepatite C (anti-HCV × RNA, estadiamento, tratamento), outras
   (alcoólica, CBP, colangite IgG4, esteatose e FIB-4, exercício); armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- hepatites */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "hepatites",
  titulo: "Hepatites virais e outras hepatopatias",
  assunto: "ass-hepatites",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "pcdt-hbv", texto: "Ministério da Saúde — PCDT de Hepatite B e Coinfecções (2023)", lidoEm: null },
    { id: "pcdt-hcv", texto: "Ministério da Saúde — PCDT de Hepatite C e Coinfecções (2019; atualização 2023)", lidoEm: null },
    { id: "pcdt-tv", texto: "Ministério da Saúde — PCDT para Prevenção da Transmissão Vertical de HIV, Sífilis e Hepatites Virais (2022)", lidoEm: null },
    { id: "easl-outras", texto: "EASL — Clinical Practice Guidelines: primary biliary cholangitis (2017), MASLD (2024) e acute liver failure (2017)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada; entra a reposição q-fmabc2021-027-ia", questoes: ["q-fmabc2021-027"] },
  ],
  doencas: [
    {
      id: "padrao", titulo: "O padrão hepatocelular",
      introducao: `[[Na hepatite o hepatócito inflama e morre: as **transaminases** (enzimas de dentro da célula) sobem a centenas ou milhares, e a icterícia é **intra-hepática** — o hepatócito doente não consegue excretar a bilirrubina conjugada, que volta ao sangue (urina escura). É diferente da colestase, em que sobem mais fosfatase alcalina e GGT.|q-tp20202-032,q-usprp2027-028,q-fmabc2023-006]]

Veja também: **Cirrose e hipertensão portal**, **Colangite e via biliar**, **Infecções na gestação e pré-natal** e **Vacinação** quando houver resumo.`,
      fragmentos: [
        { id: "pad-enzimas", titulo: "Ler as enzimas", conferir: true, diretrizes: ["easl-outras"],
          figuras: [{ arquivo: "figuras/marcadores-hbv.svg", legenda: "Esquema autoral: os marcadores da hepatite B no tempo, na infecção que cura e na que cronifica." }],
          questoes: ["q-tp20202-032","q-usprp2027-028","q-fmabc2023-006","q-famema2025-006","q-sirio2027-010","q-unifesp2024-022","q-uspsp2-010","q-simepm89-012"],
          prosa: `[[Transaminases em milhares com icterícia após pródromo gripal: **lesão hepatocelular** (viral, tóxica, isquêmica). **AST/ALT > 2 com AST < 500** sugere álcool (a vitamina B6 deficiente reduz a ALT). Pequena elevação em jovem sadio, sem fatores de risco: lembrar de **exercício intenso** (enzimas também do músculo).|q-tp20202-032,q-usprp2027-028,q-fmabc2023-006,q-famema2025-006]] [[Esteatose com FIB-4 intermediário: **elastografia** decide se há fibrose significativa.|q-sirio2027-010]] [[Mulher de meia-idade com **prurido**, fadiga e fosfatase alcalina e GGT altas: **colangite biliar primária**, confirmada pelo **anticorpo antimitocôndria**. Estenose biliar benigna com pancreatite autoimune: doença por IgG4, ácido ursodesoxicólico e dilatação.|q-unifesp2024-022,q-uspsp2-010,q-simepm89-012]]`,
          texto: `- Milhares: **hepatocelular**; AST/ALT > 2 com AST < 500: **álcool**; jovem sadio: exercício. {q-tp20202-032,q-usprp2027-028,q-fmabc2023-006,q-famema2025-006}
- FIB-4 intermediário: **elastografia**. {q-sirio2027-010}
- Prurido + FA: **CBP**, antimitocôndria. {q-unifesp2024-022,q-uspsp2-010,q-simepm89-012}` },
      ],
    },
    {
      id: "hav", titulo: "Hepatite A",
      introducao: `[[Vírus de transmissão **fecal-oral**, autolimitado, que não cronifica; em criança é quase sempre leve. O diagnóstico é o **anti-HAV IgM**.|q-unicampdis2024-089,q-einstein2026-037]]`,
      fragmentos: [
        { id: "hav-quadro", titulo: "Suporte, surtos e insuficiência hepática", conferir: true, diretrizes: ["easl-outras"],
          questoes: ["q-unicampdis2024-089","q-einstein2026-037","q-usp2025-104","q-scmsp2021-043","q-tp20231-017"],
          prosa: `[[Tratamento de **suporte**: hidratação, alimentação leve, observação; sem dieta especial nem repouso absoluto.|q-unicampdis2024-089,q-einstein2026-037]] [[Os surtos recentes em homens jovens em São Paulo vieram de **transmissão sexual oro-anal ou dígito-anal**.|q-usp2025-104]] [[**Insuficiência hepática aguda**: encefalopatia (confusão) e INR alto (> 1,5) numa hepatite aguda — **internar e avaliar transplante** imediatamente. Hepatite A sobre hepatite B crônica (HBsAg+, anti-HBc IgG+, anti-HAV IgM+) é mais grave.|q-scmsp2021-043,q-tp20231-017]]`,
          texto: `- Anti-HAV IgM; **suporte**. {q-unicampdis2024-089,q-einstein2026-037}
- Surto em homens jovens: **sexual**. {q-usp2025-104}
- Confusão + INR alto: **transplante**. {q-scmsp2021-043,q-tp20231-017}` },
      ],
    },
    {
      id: "hbv", titulo: "Hepatite B",
      introducao: `[[Cada marcador conta uma parte da história: **HBsAg** = vírus presente (mais de 6 meses = crônica); **anti-HBc** = houve contato (IgM recente, IgG antigo); **anti-HBs** = proteção (só ele, vacina; com anti-HBc, cura); **HBeAg** = replicação alta; anti-HBe = replicação menor.|q-usprp2023-068,q-iamspe2021-010,q-famema2022-027]]`,
      fragmentos: [
        { id: "hbv-sorologia", titulo: "Ler a sorologia", conferir: true, diretrizes: ["pcdt-hbv"],
          casos: ["q-fmabc2021-027-ia"],
          questoes: ["q-usprp2023-068","q-iamspe2021-010","q-iamspe2021-011","q-usprp2027-039","q-famema2022-027","q-tp20251-015","q-sirio2025-016","q-einstein2027-015","q-fmabc2021-027-ia","q-unicampdis2025-004"],
          prosa: `[[**Só anti-HBs** (título > 10): imunidade por **vacina**. **Anti-HBc IgG + anti-HBs**: contato e **cura**, não precisa de intervenção. Tudo negativo: nunca teve contato (vacinar).|q-iamspe2021-010,q-usprp2027-039,q-usprp2023-068,q-famema2022-027,q-iamspe2021-011]] [[**HBsAg + anti-HBc IgG, IgM negativo, anti-HBs negativo**: infecção **crônica**; com **HBeAg positivo**, vírus replicante. HBsAg ainda positivo 3 meses depois de hepatite aguda: ainda pode curar (crônica é após 6 meses).|q-tp20251-015,q-sirio2025-016,q-einstein2027-015,q-fmabc2021-027-ia]] [[Ascite, edema e ginecomastia com HBsAg positivo: **cirrose por hepatite B**.|q-unicampdis2025-004]]`,
          texto: `- Só anti-HBs: **vacina**; + anti-HBc: **cura**. {q-iamspe2021-010,q-usprp2027-039,q-usprp2023-068,q-famema2022-027,q-iamspe2021-011}
- HBsAg + anti-HBc IgG: **crônica**; HBeAg+ replica. {q-tp20251-015,q-sirio2025-016,q-fmabc2021-027-ia}
- Crônica só depois de **6 meses**. {q-einstein2027-015}` },
        { id: "hbv-fases", titulo: "Fases e quando tratar", conferir: true, diretrizes: ["pcdt-hbv"],
          questoes: ["q-uspsp4-022","q-tp20232-034","q-tp20261-009"],
          prosa: `[[O sistema imune é quem lesa o fígado. Jovem com HBeAg positivo, carga viral altíssima e fígado quase normal: **imunotolerância** — observar. Trata-se quando há atividade (ALT alta com carga viral significativa), fibrose avançada ou cirrose. Carga viral baixa (180 UI/mL) sem fibrose: **não tratar**, monitorar.|q-uspsp4-022,q-tp20232-034,q-tp20261-009]]`,
          texto: `- HBeAg+, DNA altíssimo, fígado normal: **imunotolerância**. {q-uspsp4-022}
- Carga baixa sem fibrose: **não tratar**. {q-tp20232-034,q-tp20261-009}` },
        { id: "hbv-gestacao", titulo: "Gestação e recém-nascido", conferir: true, diretrizes: ["pcdt-tv"],
          questoes: ["q-usprp2024-094","q-iamspe2022-064","q-usprp2022-044","q-udisc20262-043","q-uspsp1-019","q-uspsp4-103","q-unicampdis2024-092"],
          prosa: `[[Gestante HBsAg positiva: pedir **carga viral** — a transmissão depende do HBV-DNA e do **HBeAg** no parto; carga alta (> 200.000 UI/mL) ou HBeAg+ indica **tenofovir** no 3.º trimestre. A via de parto é obstétrica e a **amamentação é permitida**.|q-usprp2024-094,q-iamspe2022-064,q-usprp2022-044]] [[Recém-nascido: **banho em água corrente logo após o nascimento**, **vacina e imunoglobulina (HBIG)** nas primeiras **12 horas**, em locais diferentes; juntas protegem 85–95%.|q-udisc20262-043,q-uspsp1-019,q-uspsp4-103,q-unicampdis2024-092]]`,
          texto: `- Gestante: **carga viral**; tenofovir se alta; **amamenta**. {q-usprp2024-094,q-iamspe2022-064,q-usprp2022-044}
- RN: banho, **vacina + HBIG em 12 h**. {q-udisc20262-043,q-uspsp1-019,q-uspsp4-103,q-unicampdis2024-092}` },
      ],
    },
    {
      id: "hcv", titulo: "Hepatite C",
      introducao: `[[O anti-HCV mostra que houve contato, mas cerca de um quarto cura sozinho: o **RNA do HCV** separa infecção ativa de cicatriz sorológica. A hepatite C cronifica em silêncio e se revela décadas depois como cirrose.|q-fmabc2026-013,q-usprp2025-068]]`,
      fragmentos: [
        { id: "hcv-manejo", titulo: "Diagnóstico, estadiamento e tratamento", conferir: true, diretrizes: ["pcdt-hcv"],
          questoes: ["q-fmabc2026-013","q-usprp2025-068","q-fmabc2022-012","q-fmabc2025-016","q-tp20222-036","q-sirio2022-098"],
          prosa: `[[Anti-HCV reagente: **solicitar RNA-HCV**; só ele diagnostica a infecção. No recém-nascido de mãe infectada, o anticorpo materno atravessa a placenta, e o **RNA** caracteriza a transmissão vertical.|q-fmabc2026-013,q-usprp2025-068,q-fmabc2022-012]] [[Com viremia, estadia-se a fibrose (**elastografia** ou biópsia) e trata-se **todos** com antiviral de ação direta (cura > 95%); cirrótico segue em vigilância de hepatocarcinoma mesmo curado.|q-fmabc2025-016,q-tp20222-036]] [[No Brasil, as maiores taxas de detecção ficam em faixas mais velhas, e mais em homens.|q-sirio2022-098]]`,
          texto: `- Anti-HCV+: **RNA-HCV**. {q-fmabc2026-013,q-usprp2025-068,q-fmabc2022-012}
- **Elastografia**; tratar todos com antiviral. {q-fmabc2025-016,q-tp20222-036}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["pcdt-hbv","pcdt-tv"],
          questoes: ["q-usprp2023-068","q-usprp2022-044","q-iamspe2021-011","q-tp20232-034"],
          prosa: `[[**"Cura funcional"**: o termo técnico é perda do HBsAg na hepatite crônica tratada; a usprp2023-068 chamou de **cura funcional** o perfil anti-HBc IgG + anti-HBs (imunidade natural).|q-usprp2023-068]] [[**Parto e carga viral**: a via de parto não muda pela hepatite B; a usprp2022-044 confirmou **parto vaginal e amamentação** com carga baixa.|q-usprp2022-044]] [[**Sorologia incompleta**: sem o anti-HBc não dá para afirmar "nunca teve contato"; a iamspe2021-011 aceitou essa leitura com HBsAg e anti-HBs negativos.|q-iamspe2021-011]] [[**Anti-HBe com viremia baixa e ALT pouco alta**: a tp20232-034 não tratou o vírus B e considerou o C **curado** com RNA indetectável.|q-tp20232-034]]`,
          texto: `- A prova chamou de **cura funcional**. {q-usprp2023-068}
- **Parto vaginal e amamentação**. {q-usprp2022-044}
- Sem anti-HBc: a prova disse "**sem contato**". {q-iamspe2021-011}
- Não tratar B; C curado. {q-tp20232-034}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: perfis sorológicos da hepatite B",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-hbv", titulo: "Marcadores e significado", conferir: true,
          questoes: ["q-iamspe2021-010","q-famema2022-027","q-tp20251-015","q-sirio2025-016","q-einstein2027-015"],
          prosa: `[[Combinar os marcadores conta a história.|q-iamspe2021-010,q-famema2022-027,q-tp20251-015,q-sirio2025-016,q-einstein2027-015]]

| HBsAg | anti-HBc | anti-HBs | Significado |
| − | − | + | vacinado |
| − | IgG + | + | infecção passada, curada |
| + | IgM + | − | aguda |
| + | IgG + | − | crônica (> 6 meses); HBeAg+ = replicante |
| − | − | − | suscetível: vacinar |`,
          texto: `- Só anti-HBs: **vacina**. {q-iamspe2021-010}
- anti-HBc + anti-HBs: **cura**. {q-famema2022-027}
- HBsAg + IgG: **crônica**. {q-tp20251-015,q-sirio2025-016}
- HBsAg em 3 meses: **ainda aguda**. {q-einstein2027-015}` },
      ],
    },
  ],
});
