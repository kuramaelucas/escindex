/* resumos/asma/resumo.js — resumo adaptativo de asma e rinite alérgica: fisiopatologia, diagnóstico
   (espirometria, pico de fluxo, asma ocupacional), controle, tratamento de manutenção pela GINA no
   adulto e na criança, crise (adulto e criança), situações especiais e rinite, com tabela no fim.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- asma */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "asma",
  titulo: "Asma e rinite alérgica",
  assunto: "ass-asma",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "gina", texto: "GINA — Global Strategy for Asthma Management and Prevention, 2026 (Strategy Report, maio/2026), ginasthma.org", lidoEm: "2026-11-17" },
    { id: "sbpt-asma", texto: "SBPT — Recomendações para o manejo da asma (2020) e PCDT de asma do Ministério da Saúde", lidoEm: null },
    { id: "aria", texto: "ARIA — Allergic Rhinitis and its Impact on Asthma (2019/2020)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anuladas com reposição; as reposições (-ia) entram no resumo", questoes: ["q-iamspe2023-043","q-sessp2023-034","q-unesp2024-051","q-famerp2025-061","q-famerp2026-041","q-fmabc2026-059"] },
    { motivo: "anulada, sem reposição", questoes: ["q-fmabc2021-090"] },
    { motivo: "desatualizada, sem reposição", questoes: ["q-unesp2026-042"] },
  ],
  doencas: [
    {
      id: "diagnostico", titulo: "Fisiopatologia e diagnóstico",
      introducao: `[[A asma é inflamação crônica das vias aéreas, quase sempre tipo 2: alérgenos ativam mastócitos sensibilizados por IgE, que liberam histamina e leucotrienos, e eosinófilos e linfócitos Th2 mantêm a inflamação; o resultado é hiper-responsividade brônquica e obstrução variável e reversível.|q-iamspe2025-020,q-usprp2025-077,q-tp20222-014]] [[O diagnóstico exige sintomas variáveis (tosse, chiado, dispneia, aperto no peito, piores à noite, no esforço e com gatilhos) e a prova da obstrução variável: espirometria com VEF1/CVF reduzida e resposta ao broncodilatador (aumento de 12% e 200 mL no VEF1), ou variação do pico de fluxo.|q-adap23-069,q-iamspe2025-001,q-iamspe2026-014,q-tp20231-028,q-unesp2021-053]]

[[Na criança pequena, que não faz espirometria, pesa o padrão: chiado fora das viroses, com exercício, riso ou alérgenos, atopia pessoal ou familiar e resposta ao tratamento.|q-famerp2026-041-ia,q-fmabc2026-059-ia,q-usprp2025-014]] [[A asma ocupacional melhora longe do trabalho e se confirma com pico de fluxo seriado no trabalho e fora dele.|q-usp2022-020]]

Veja também: **Emergências pediátricas** (parada e insuficiência respiratória) e **Bronquiolite, pneumonia e coqueluche** (o lactente que sibila com vírus).`,
      fragmentos: [
        { id: "dia-provas", titulo: "Espirometria, pico de fluxo e quadro", conferir: false, diretrizes: ["gina"],
          casos: ["q-tp20231-028"],
          questoes: ["q-iamspe2025-020","q-usprp2025-077","q-tp20222-014","q-adap23-069","q-iamspe2025-001","q-iamspe2026-014","q-tp20231-028","q-unesp2021-053","q-unifesp2025-087","q-scmsp2021-045","q-sirio2024-049","q-famerp2026-041-ia","q-fmabc2026-059-ia","q-usprp2025-014","q-usp2022-020","q-fmabc2024-004","q-sirio2026-045","q-einstein2023-001","q-unicampdis2023-012"],
          texto: `- Mecanismo: **mastócitos** liberam mediadores; **hiper-responsividade**; alergia **IgE (tipo 1)**. {q-iamspe2025-020,q-usprp2025-077,q-tp20222-014}
- VEF1/CVF baixa e **resposta ao broncodilatador**: obstrução reversível. {q-adap23-069,q-tp20231-028,q-unesp2021-053}
- Confirmar: **espirometria com prova broncodilatadora**. {q-iamspe2025-001,q-iamspe2026-014,q-unifesp2025-087,q-scmsp2021-045,q-sirio2024-049}
- Criança pequena: chiado com **exercício, riso, alérgenos**, não só em viroses. {q-famerp2026-041-ia,q-fmabc2026-059-ia}
- Lactente sibilante com atopia: **corticoide inalatório**. {q-usprp2025-014}
- Suspeita ocupacional: **pico de fluxo no trabalho e fora**. {q-usp2022-020}
- **Celularidade do escarro** induzido é útil (eosinófilos). {q-fmabc2024-004}
- Dor torácica e dispneia em jovem asmático: **crise asmática**. {q-sirio2026-045,q-einstein2023-001}
- Tosse crônica com rinite sem melhora: pensar em **asma** (tosse variante). {q-unicampdis2023-012}` },
      ],
    },
    {
      id: "manutencao", titulo: "Controle e tratamento de manutenção",
      introducao: `[[O controle se mede pelas últimas 4 semanas: sintomas diurnos e uso de resgate mais de 2 vezes por semana, despertar noturno e limitação de atividade; nenhum desses é controlada, 1–2 parcialmente, 3–4 não controlada.|q-unesp2022-007,q-amrigs2021-014,q-tp20202-048,q-unifesp2022-086]] [[Antes de subir o degrau, confere-se técnica inalatória, adesão, gatilhos, comorbidades (rinite, refluxo, obesidade) e drogas como betabloqueador e AINE; a má adesão é a causa mais comum de descontrole.|q-adap22-069,q-amrigs2020-006,q-usprp2022-003,q-tp20241-117,q-tp20261-033,q-sirio2021-015]]

[[A GINA tirou o salbutamol isolado do adolescente e do adulto, porque ele alivia sem tratar a inflamação e aumenta o risco de crise grave: o caminho preferido (track 1) usa budesonida-formoterol, primeiro só quando necessário na asma leve e depois em dose baixa de manutenção e resgate (MART).|q-iamspe2023-043-ia,q-adap25-087,q-adap26-095,q-simepm89-058,q-unesp2024-051-ia,q-unesp2022-056,q-unesp2023-047,q-einstein2026-001]] [[Abaixo de 6 anos, a manutenção é corticoide inalatório em dose baixa com espaçador; de 6 a 11 anos, corticoide inalatório e, no degrau seguinte, associação com LABA ou MART.|q-unifesp2023-069,q-unifesp2022-069,q-sirio2022-043,q-sirio2025-060,q-einstein2025-042,q-unesp2026-017]]`,
      fragmentos: [
        { id: "man-controle", titulo: "Avaliar controle e o que checar antes de subir", conferir: false, diretrizes: ["gina"],
          questoes: ["q-unesp2022-007","q-amrigs2021-014","q-tp20202-048","q-unifesp2022-086","q-adap22-069","q-amrigs2020-006","q-usprp2022-003","q-tp20241-117","q-tp20261-033","q-sirio2021-015","q-unicamp2022-046","q-einstein2025-008","q-adap21-032","q-usprp2026-096"],
          texto: `- Tosse 4 dias e resgate 3 vezes na semana: **parcialmente controlada**. {q-unesp2022-007}
- Sintomas frequentes: **não controlada**, iniciar ou subir CI. {q-amrigs2021-014,q-tp20202-048}
- Antes de subir: **técnica, adesão, gatilhos, diagnóstico**. {q-adap22-069,q-usprp2022-003}
- Causa mais comum de descontrole: **má adesão**. {q-amrigs2020-006}
- Asmático com propranolol: **retirar o betabloqueador**. {q-tp20241-117,q-tp20261-033}
- AINE e refluxo pioram; **vacina de influenza anual**. {q-sirio2021-015}
- Rinite descontrolada e uso irregular: **asma grave não controlada?** — tratar rinite e adesão. {q-unicamp2022-046}
- Asma de difícil controle: **aumentar o degrau**. {q-einstein2025-008}
- Controlada há meses: **manter** o tratamento (reduzir só com estabilidade). {q-adap21-032}
- Gestante asmática: **manter os inalatórios**. {q-usprp2026-096}` },
        { id: "man-degraus", titulo: "Degraus no adulto e na criança", conferir: false, diretrizes: ["gina"],
          figuras: [{ arquivo: "figuras/degraus.svg", legenda: "Esquema autoral: o caminho preferido da GINA (track 1) no adolescente e no adulto." }],
          questoes: ["q-iamspe2023-043-ia","q-adap25-087","q-adap26-095","q-simepm89-058","q-unesp2024-051-ia","q-unesp2022-056","q-unesp2023-047","q-einstein2026-001","q-tp20241-046","q-adap22-086","q-usprp2025-032","q-amrigs2023-015","q-unicamp2023-013","q-uspsp2-024"],
          prosa: `**Atenção às provas antigas:** antes da GINA 2019, a asma leve tratava com salbutamol isolado e o segundo degrau era aumentar a dose do corticoide inalatório; algumas bancas ainda seguem essa lógica.`,
          texto: `- Adulto e adolescente: **nunca SABA isolado**. {q-iamspe2023-043-ia,q-unesp2024-051-ia}
- Asma leve: **budesonida-formoterol se necessário** (track 1). {q-adap25-087,q-adap26-095,q-simepm89-058,q-unesp2022-056,q-unesp2023-047,q-tp20241-046,q-einstein2026-001}
- Descontrole com CI: **budesonida-formoterol de manutenção e resgate** (ou CI + LABA). {q-adap22-086,q-usprp2025-032,q-amrigs2023-015,q-unicamp2023-013,q-uspsp2-024}` },
        { id: "man-crianca", titulo: "Degraus na crian\u00e7a", conferir: false, diretrizes: ["gina"],
          questoes: ["q-unifesp2023-069", "q-unifesp2022-069", "q-sirio2022-043", "q-sessp2025-060", "q-sirio2025-060", "q-einstein2025-042", "q-unesp2026-017", "q-usprp2023-004", "q-usp2026-063", "q-famerp2025-061-ia", "q-usp2024-004", "q-sirio2027-053"],
          prosa: `Abaixo de 6 anos não há espirometria nem dados para budesonida-formoterol: a base é o corticoide inalatório diário em dose baixa, com espaçador e máscara, e o salbutamol só no resgate. De 6 a 11 anos, quando o corticoide em dose baixa não controla, sobe-se para a associação com LABA ou para a terapia de manutenção e resgate. Depois de uma crise que levou ao pronto-socorro, a alta já sai com corticoide inalatório de manutenção.`,
          texto: `- < 6 anos: **CI em dose baixa com espaçador e máscara**. {q-unifesp2023-069,q-unifesp2022-069,q-sirio2022-043,q-sessp2025-060}
- 6–11 anos não controlado com CI: **CI + LABA** ou MART. {q-sirio2025-060,q-einstein2025-042,q-unesp2026-017,q-usprp2023-004}
- Descontrole na criança: ajustar a **dose do CI** (beclometasona 200 µg 12/12 h). {q-usp2026-063,q-famerp2025-061-ia}
- Alta após crise: **CI de manutenção** (dose baixa) e plano escrito. {q-usp2024-004,q-sirio2027-053}` },
      ],
    },
    {
      id: "crise", titulo: "Crise de asma",
      introducao: `[[Na crise, a gravidade se mede por fala, consciência, uso de musculatura, frequência, saturação e pico de fluxo; silêncio no tórax, confusão e saturação baixa indicam risco de vida.|q-unifesp2026-095,q-uspsp1-012,q-uspsp2-072,q-sirio2024-003]] [[O tratamento é broncodilatador de curta ação repetido a cada 20 minutos na primeira hora (spray com espaçador, 4–10 jatos), oxigênio para saturação de 93–95% (94–98% na criança), corticoide sistêmico precoce, ipratrópio nas crises moderadas a graves e sulfato de magnésio venoso nas graves que não respondem.|q-scmsp2022-021,q-iamspe2026-072,q-tp20232-006,q-usprp2024-065,q-usp2024-003,q-uspsp2-051,q-sessp2023-034-ia]] [[O beta-2 agonista dilata o brônquio por ação direta no receptor beta-2 do músculo liso, e a taquicardia vem do estímulo cardíaco.|q-tp20202-017]]`,
      fragmentos: [
        { id: "cri-conduta", titulo: "Gravidade e conduta", conferir: false, diretrizes: ["gina"],
          casos: ["q-usp2026-070"],
          questoes: ["q-unifesp2026-095","q-uspsp1-012","q-uspsp2-072","q-sirio2024-003","q-scmsp2022-021","q-iamspe2026-072","q-tp20232-006","q-usprp2024-065","q-usp2024-003","q-uspsp2-051","q-sessp2023-034-ia","q-tp20202-017","q-usprp2021-032","q-uspsp5-102","q-sirio2022-046","q-fmabc2021-091","q-usp2023-115","q-usp2026-070"],
          texto: `- Classificar: moderada × **grave** (frase curta, saturação baixa, FC/FR altas). {q-unifesp2026-095,q-uspsp1-012,q-uspsp2-072}
- Adulto com crise grave: **UTI e sulfato de magnésio**. {q-sirio2024-003}
- Primeiro: **SABA a cada 20 min** na 1ª hora. {q-scmsp2022-021,q-iamspe2026-072,q-tp20232-006,q-sirio2022-046}
- **Corticoide oral** precoce e SABA em dose alta. {q-usprp2024-065,q-fmabc2021-091}
- Moderada a grave: **SABA + ipratrópio**. {q-usp2024-003,q-uspsp2-051,q-usprp2021-032,q-uspsp5-102}
- Ipratrópio **não** se mantém de horário na internação. {q-sessp2023-034-ia}
- Taquicardia do fenoterol: estímulo **beta**; a melhora é ação no **beta-2**. {q-tp20202-017}
- Crise com pneumonia: salbutamol repetido, corticoide e **antibiótico** (penicilina) se houver pneumonia bacteriana. {q-usp2023-115}
- Beta-2 contínuo com FC 198, QRS estreito e hipotensão: **TSV instável, cardioversão sincronizada**. {q-usp2026-070}` },
      ],
    },
    {
      id: "rinite", titulo: "Rinite alérgica",
      introducao: `[[A rinite alérgica é a mesma inflamação IgE-mediada no nariz — espirros, prurido, coriza aquosa e obstrução —, anda com a asma (uma via aérea só) e piora o controle dela.|q-tp20222-014,q-tp20252-017,q-unicamp2022-046]] [[O tratamento é controle ambiental, lavagem nasal com soro e corticoide intranasal; o vasoconstritor nasal usado por muito tempo causa rinite medicamentosa e deve ser suspenso.|q-fmabc2021-082,q-tp20252-021]]`,
      fragmentos: [
        { id: "rin-tratamento", titulo: "Tratamento da rinite", conferir: true, diretrizes: ["aria"],
          questoes: ["q-tp20252-017","q-fmabc2021-082","q-tp20252-021"],
          texto: `- Criança com rinite: **soro e corticoide nasais**, anti-histamínico nas crises. {q-tp20252-017,q-fmabc2021-082}
- Uso crônico de vasoconstritor: **suspender e iniciar corticoide intranasal**. {q-tp20252-021}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-unifesp2022-086"],
          texto: `- Asma não controlada em uso de CI (ACT 18): a regra atual é **trocar para budesonida-formoterol (MART)**; uma banca, na lógica anterior à GINA 2019, dá como certo **aumentar a dose de budesonida**. {q-unifesp2022-086}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `A tabela resume o controle da asma.`,
      fragmentos: [
        { id: "comp-controle", titulo: "Nível de controle (últimas 4 semanas)", conferir: true,
          questoes: ["q-unesp2022-007","q-amrigs2021-014"],
          prosa: `| Critério | Controlada | Parcialmente | Não controlada |
|---|---|---|---|
| Sintomas diurnos > 2×/semana | não | | |
| Despertar noturno | não | 1–2 critérios | **3–4 critérios** |
| Resgate > 2×/semana | não | presentes | presentes |
| Limitação de atividade | não | | |`,
          texto: `- 1–2 critérios: **parcialmente controlada**. {q-unesp2022-007}
- Sintomas frequentes: **não controlada**. {q-amrigs2021-014}` },
      ],
    },
  ],
});
