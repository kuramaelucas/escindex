/* resumos/pre-natal/resumo.js — resumo adaptativo de pré-natal: diagnóstico da gravidez e fisiologia materna,
   placenta e líquido amniótico, idade gestacional e calendário de consultas, exames de rotina (urina, anemia),
   infecções rastreadas (toxoplasmose, sífilis, hepatites, outras), vacinas, ácido fólico e ganho de peso,
   intercorrências e doenças maternas, colo curto e vitalidade anteparto. Molde e regras: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- pre-natal */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "pre-natal",
  titulo: "Pré-natal",
  assunto: "ass-prenatal",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "calendario-vacinal", texto: "Ministério da Saúde — Calendário Nacional de Vacinação 2026, ciclo de vida: gestante (PNI, gov.br)", lidoEm: "2026-11-19" },
    { id: "ms-prenatal", texto: "Ministério da Saúde — Cadernos de Atenção Básica nº 32: Atenção ao Pré-natal de Baixo Risco (2012) e Caderneta da Gestante", lidoEm: null },
    { id: "ms-alto-risco", texto: "Ministério da Saúde — Manual de Gestação de Alto Risco (2022)", lidoEm: null },
    { id: "pcdt-tv", texto: "Ministério da Saúde — PCDT para Prevenção da Transmissão Vertical de HIV, Sífilis e Hepatites Virais (Portaria SCTIE/MS nº 55/2020; 2ª ed. revisada 2022), gov.br/saude", lidoEm: "2026-11-19" },
    { id: "ms-ferro", texto: "Ministério da Saúde — Programa Nacional de Suplementação de Ferro: manual de condutas gerais (2013)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas pela banca (a de vacina e a de ferro entram pelas reposições)", questoes: ["q-scmsp2023-073","q-amrigs2020-049","q-tp20202-091"] },
    { motivo: "Infecção puerperal (abscesso mamário, endometrite): ficam no resumo de puerpério", questoes: ["q-scmsp2022-056","q-scmsp2025-073"] },
  ],
  doencas: [
    {
      id: "fisiologia", titulo: "Diagnóstico da gravidez e fisiologia materna",
      introducao: `[[O beta-hCG é produzido pelo trofoblasto logo após a implantação e mantém o corpo lúteo, que segura a progesterona até a placenta assumir; por isso ele aparece no sangue e na urina antes do atraso menstrual ficar longo.|q-scmsp2023-071,q-scmsp2026-071,q-usprp2024-096]] [[O cisto do corpo lúteo, sustentado pelo hCG, é achado comum e benigno no primeiro trimestre e regride sozinho.|q-unifesp2023-055]]

[[A gestação é um estado de adaptação: o volume plasmático sobe mais que a massa de hemácias (anemia dilucional), o débito cardíaco aumenta, a progesterona faz hiperventilar e reduz o volume residual, e o metabolismo é anabólico na primeira metade e catabólico na segunda, para levar glicose ao feto.|q-iamspe2021-059,q-amrigs2020-043,q-scmsp2021-071,q-einstein2027-049]]

Veja também: **Trabalho de parto e parto**, **Diabetes gestacional**, **Hipertensão na gestação**, **Sangramentos na gestação**, **Parto pré-termo e rotura de membranas** (dono do colo curto e da progesterona), **Infecções congênitas** (pediatria: o recém-nascido), **Calendário vacinal** e **IST** (dono da sífilis).`,
      fragmentos: [
        { id: "fis-diagnostico", titulo: "Diagnóstico da gravidez",
          questoes: ["q-scmsp2023-071","q-scmsp2026-071","q-usprp2024-096","q-iamspe2021-057","q-sessp2026-069","q-sirio2023-062","q-sirio2021-069","q-unifesp2023-055"],
          prosa: `[[No ultrassom transvaginal, a sequência de aparecimento é reação decidual, saco gestacional, vesícula vitelínica, embrião e batimentos.|q-sessp2026-069]] [[Os sinais de presunção (mamas doloridas, náusea) vêm antes; os de probabilidade, ao toque, depois: o amolecimento do istmo (Hegar) aparece por volta de 6 a 8 semanas.|q-sirio2021-069,q-iamspe2021-057]] [[Teste de urina negativo com atraso curto pode ser cedo demais: repete-se em 15 dias.|q-usprp2024-096]]`,
          texto: `- Função principal do hCG: **sustentar o corpo lúteo**. {q-scmsp2023-071}
- Atraso, mamas doloridas e náusea: **teste imunológico de urina** para β-hCG. {q-scmsp2026-071}
- Teste negativo com atraso de 1 semana: **repetir em 15 dias**. {q-usprp2024-096}
- Cerca de 10 semanas: **sinal de Hegar**. {q-iamspe2021-057}
- Atraso de 3 dias: espera-se só **sensibilidade mamária**. {q-sirio2021-069}
- Sequência no ultrassom: **decídua, saco, vesícula, embrião, batimentos**. {q-sessp2026-069}
- Falso-positivo: **hipotireoidismo, anticonvulsivantes**. {q-sirio2023-062}
- Cisto de 6 cm com vascularização periférica no 1º trimestre (corpo lúteo): **expectante**. {q-unifesp2023-055}` },
        { id: "fis-modificacoes", titulo: "Modificações maternas e queixas comuns",
          questoes: ["q-scmsp2021-071","q-amrigs2020-043","q-iamspe2021-059","q-einstein2027-049","q-tp20251-082","q-usp2024-108","q-usp2023-036","q-famema2025-063","q-fmabc2022-070"],
          casos: ["q-usp2023-036"],
          prosa: `[[O estrogênio e a progesterona fazem a mama crescer por hiperplasia glandular.|q-tp20251-082]] [[Dor no baixo ventre e no ligamento inguinal com colo fechado é estiramento do ligamento redondo, não trabalho de parto.|q-usp2024-108]] [[A gengiva fica hiperemiada e sangra (gengivite gravídica, às vezes com granuloma piogênico); trata-se com higiene e dentista, porque a doença periodontal se associa a prematuridade.|q-usp2023-036,q-famema2025-063]] [[A frequência cardíaca fetal normal é 110 a 160 bpm e sobe com a movimentação.|q-fmabc2022-070]]`,
          texto: `- Volemia aumenta à custa do **plasma**. {q-iamspe2021-059}
- Respiratório: **volume residual diminui**. {q-amrigs2020-043}
- Metabolismo lipídico **anabólico** no início e **catabólico** no fim. {q-scmsp2021-071,q-einstein2027-049}
- Mamas maiores: **hiperplasia glandular** por estrogênio e progesterona. {q-tp20251-082}
- Dor inguinal no 3º trimestre: **ligamento redondo**. {q-usp2024-108}
- Lesão gengival vermelha que sangra: **higiene bucal**. {q-usp2023-036}
- Gengivite: **encaminhar ao dentista** (risco de prematuridade). {q-famema2025-063}
- FCF de **110 a 160 bpm**. {q-fmabc2022-070}` },
        { id: "fis-placenta", titulo: "Placenta e líquido amniótico",
          questoes: ["q-scmsp2023-072","q-amrigs2024-053","q-amrigs2024-058","q-sessp2025-071","q-sessp2025-072","q-sirio2021-068","q-amrigs2022-044","q-amrigs2022-045","q-iamspe2026-058","q-amrigs2025-057"],
          casos: ["q-amrigs2024-058"],
          prosa: `[[A placenta troca por difusão simples (gases), transporte ativo (aminoácidos) e pinocitose (imunoglobulina G e albumina).|q-amrigs2024-053,q-sessp2025-072]] [[Na segunda metade, o líquido amniótico é sobretudo urina fetal e sai pela deglutição; por isso agenesia renal ou insuficiência placentária reduzem o líquido, e obstrução digestiva ou diabetes o aumentam.|q-scmsp2023-072,q-amrigs2022-045,q-iamspe2026-058]] [[O índice de líquido abaixo de 5 cm é oligodrâmnio; ausência de líquido no termo é indicação de interromper a gestação.|q-amrigs2022-044,q-amrigs2025-057]]`,
          texto: `- Transporte placentário: **difusão, transporte ativo e pinocitose**. {q-amrigs2024-053}
- Imunoglobulinas e albumina: **pinocitose**. {q-sessp2025-072}
- Estrutura da figura: **córion frondoso** (futura placenta). {q-amrigs2024-058}
- Células de Hofbauer no âmnio: camada **fibroblástica**. {q-sessp2025-071}
- Volume regulado por **diurese e deglutição fetal**. {q-scmsp2023-072}
- Líquido **turvo** perto do termo, por células descamadas. {q-sirio2021-068}
- Oligodrâmnio: ILA **< 5**. {q-amrigs2022-044}
- Polidrâmnio: causa mais comum **idiopática**; pós-datismo **não** causa. {q-amrigs2022-045,q-iamspe2026-058}
- Adramnia com 41 semanas: **interromper**. {q-amrigs2025-057}` },
      ],
    },
    {
      id: "acompanhamento", titulo: "Idade gestacional, consultas e risco",
      introducao: `[[A idade gestacional conta da data da última menstruação (DUM); a regra de Nägele dá a data provável do parto somando 7 dias e 9 meses (ou subtraindo 3).|q-famema2021-050,q-unesp2025-021,q-fmabc2025-073,q-fmabc2022-069]] [[O ultrassom mais precoce é o mais exato, porque no início todos os embriões crescem igual; a DUM é trocada pelo ultrassom do primeiro trimestre quando a diferença passa de 7 dias.|q-tp20261-035,q-fmabc2023-061,q-amrigs2024-060]]

[[O pré-natal de risco habitual tem no mínimo seis consultas, mensais até 28 semanas, quinzenais até 36 e semanais depois, com a primeira até o 4º mês e a classificação de risco revista a cada consulta.|q-scmsp2026-087,q-uspsp4-048,q-sessp2024-072,q-unesp2025-099,q-amrigs2023-043]]`,
      fragmentos: [
        { id: "aco-idade", titulo: "Calcular a idade gestacional e a data do parto",
          questoes: ["q-famema2021-050","q-unesp2025-021","q-fmabc2025-073","q-fmabc2022-069","q-sirio2021-073","q-tp20261-035","q-fmabc2023-061","q-amrigs2024-060","q-amrigs2024-050"],
          casos: ["q-amrigs2024-060"],
          prosa: `[[O ultrassom de 11 a 14 semanas mede a translucência nucal e faz a primeira avaliação morfológica.|q-amrigs2024-050]] [[A fecundação acontece cerca de 14 dias após a DUM no ciclo de 28 dias; a relação dessa data aponta a paternidade.|q-sirio2021-073]]`,
          texto: `- DUM 10/08/2024: DPP **17/05/2025** (Nägele). {q-fmabc2025-073}
- DUM 26/01/24 em 12/03/24: **6 semanas e 4 dias**, DPP **01/11/24**. {q-unesp2025-021}
- Ultrassom de 10 semanas: DUM e DPP calculadas de trás para frente. {q-famema2021-050}
- 6 4/7 semanas: batimentos **já visíveis** ao transvaginal. {q-fmabc2022-069}
- DUM 28/10 com relações em 10/11 e 20/11: DPP **04/08**, pai **A**. {q-sirio2021-073}
- Ultrassom de 8 semanas prevalece: **25 semanas e 2 dias**. {q-tp20261-035}
- Troca pela ultrassonografia precoce se diferença **> 7 dias**. {q-fmabc2023-061}
- Erro da datação **cresce** com a idade gestacional. {q-amrigs2024-060}
- Com 11 semanas: **morfológico de 1º trimestre** (translucência nucal). {q-amrigs2024-050}` },
        { id: "aco-consultas", titulo: "Consultas, risco e cuidado", conferir: true, diretrizes: ["ms-prenatal","ms-alto-risco"],
          questoes: ["q-scmsp2026-087","q-amrigs2023-043","q-uspsp4-048","q-sessp2024-072","q-unesp2025-099","q-usp2023-109","q-usp2026-074","q-sirio2024-084","q-unicamp2022-054","q-scmsp2025-062","q-fmabc2021-052","q-usp2024-109","q-amrigs2023-054"],
          casos: ["q-amrigs2023-054"],
          prosa: `[[Epilepsia, óbito fetal anterior e doenças crônicas levam ao pré-natal de alto risco, que investiga a causa e antecipa a vigilância.|q-sirio2024-084,q-unicamp2022-054,q-scmsp2025-062]] [[Para a gestante que falta, a pergunta aberta sobre as barreiras funciona melhor que a cobrança; a gestante tem estabilidade no emprego.|q-usp2023-109,q-usp2026-074]] [[O cinto de três pontos passa abaixo do abdome, sobre a pelve, e a faixa diagonal entre as mamas.|q-amrigs2023-054]] Altura uterina maior que o esperado no termo pede ultrassom para estimar o peso.`,
          texto: `- Consultas **mensais até 28**, **quinzenais até 36**, **semanais** depois. {q-scmsp2026-087,q-uspsp4-048}
- Com 22 semanas, sem queixa: retorno em **30 dias**. {q-amrigs2023-043}
- Mínimo de **6 consultas**, com consulta odontológica e puerperal. {q-sessp2024-072}
- Humanização: 1ª consulta **até o 4º mês** e risco em toda consulta. {q-unesp2025-099}
- Adesão: perguntar **o que impede** a vinda. {q-usp2023-109}
- Primeiro trimestre com vômitos e risco psicossocial: orientar **direitos trabalhistas**. {q-usp2026-074}
- **Epilepsia**: pré-natal de alto risco. {q-sirio2024-084}
- Antecedente de óbito fetal: **alto risco**; banca: investigar trombofilias. {q-unicamp2022-054}
- Óbito fetal anterior com 37 sem: ácido fólico, **vitalidade após 32 sem**, parto com **39 sem**. {q-scmsp2025-062}
- 42 anos, com antecedentes: **ecocardiograma fetal** com 28 semanas. {q-fmabc2021-052}
- Altura uterina grande a termo: **ultrassom para peso fetal**. {q-usp2024-109}
- Cinto: **abaixo do abdome**, diagonal entre as mamas. {q-amrigs2023-054}` },
      ],
    },
    {
      id: "exames", titulo: "Exames de rotina, urina e anemia",
      introducao: `[[Os exames de rotina buscam o que se trata e muda o desfecho: anemia, diabetes, sífilis, HIV, hepatites, toxoplasmose e bacteriúria.|q-uspsp2-099,q-iamspe2025-049,q-unifesp2022-037]] HIV e sífilis se repetem no terceiro trimestre; o teste de tolerância à glicose fica para 24–28 semanas.

[[A bacteriúria assintomática se trata na gestação porque a progesterona dilata os ureteres e o útero comprime, e a infecção sobe para o rim e provoca parto prematuro.|q-uspsp2-048,q-einstein2022-060]] [[A anemia mais comum é a ferropriva: a demanda de ferro triplica e as reservas costumam ser baixas.|q-unifesp2025-076,q-uspsp4-038]]`,
      fragmentos: [
        { id: "exa-rotina", titulo: "O que pedir e quando", conferir: true, diretrizes: ["ms-prenatal"],
          questoes: ["q-unifesp2022-037","q-scmsp2023-092","q-iamspe2025-049","q-uspsp2-099","q-einstein2023-061","q-sirio2021-079","q-unesp2026-022"],
          casos: ["q-sirio2021-079"],
          prosa: `[[Doar sangue não substitui as sorologias da gestação: hepatite B, hepatite C e HIV se pedem do mesmo jeito.|q-einstein2023-061]] [[No terceiro trimestre se repetem hemograma, HIV e sífilis.|q-unifesp2022-037,q-sirio2021-079]] [[Toxoplasmose IgG positiva antes da gestação é imunidade; HTLV positivo contraindica o aleitamento.|q-unesp2026-022]]`,
          texto: `- Exames de rotina: detectam **anemia, diabetes e infecções**. {q-uspsp2-099}
- 1ª consulta **não** inclui o TOTG 75 g. {q-iamspe2025-049}
- 3º trimestre: **hemograma, HIV e sífilis**. {q-unifesp2022-037}
- Repetir **sífilis e HIV** no 2º e 3º trimestres. {q-sirio2021-079}
- Com 30 semanas no risco habitual, **não** pede cultura para estreptococo. {q-scmsp2023-092}
- Doadora de sangue: **hepatite B, hepatite C e HIV**. {q-einstein2023-061}
- TOTG com 24–28 sem; toxo IgG+ é **imune**; HTLV positivo: **sem aleitamento**. {q-unesp2026-022}` },
        { id: "exa-urina", titulo: "Bacteriúria e infecção urinária",
          questoes: ["q-uspsp2-048","q-einstein2022-060","q-unesp2025-028","q-uspsp1-085"],
          texto: `- Bacteriúria assintomática: **antibiótico oral** e urocultura de controle. {q-uspsp2-048}
- Opção em dose única: **fosfomicina**. {q-einstein2022-060}
- *E. coli* ESBL: **carbapenêmico** no hospital. {q-unesp2025-028}
- Segunda infecção na gestação: **profilaxia** até o fim da gestação. {q-uspsp1-085}` },
        { id: "exa-anemia", titulo: "Anemia e suplementação de ferro", conferir: true, diretrizes: ["ms-ferro"],
          questoes: ["q-unifesp2025-076","q-tp20202-091-ia","q-unicamp2023-055","q-uspsp4-038","q-sirio2025-069","q-uspsp5-045","q-unesp2026-031","q-usp2026-097"],
          prosa: `[[Toda gestante recebe 40 mg de ferro elementar ao dia da primeira consulta até o fim da gestação; hemoglobina abaixo de 11 g/dL é anemia e pede dose de tratamento (160–200 mg).|q-tp20202-091-ia,q-unicamp2023-055,q-unifesp2025-076,q-uspsp4-038]] [[O cálcio do leite atrapalha a absorção do ferro.|q-uspsp5-045]] [[Anemia macrocítica aponta folato ou B12; plaquetas um pouco baixas no fim da gestação, com o resto normal, são plaquetopenia gestacional.|q-sirio2025-069,q-unesp2026-031]] [[Sopro e cansaço na gestante anêmica, com sopro sistólico funcional, são da anemia, não da valva.|q-usp2026-097]]`,
          texto: `- Profilaxia: **40 mg** de ferro elementar até o fim da gestação. {q-tp20202-091-ia,q-unicamp2023-055}
- Ferropriva (ferritina 10): **160–200 mg/dia**, reavaliar em 4 semanas. {q-unifesp2025-076}
- Hb 10 com sintomas: **dose terapêutica** e investigar. {q-uspsp4-038}
- Normocítica? Não: **macrocítica** = folato ou B12. {q-sirio2025-069}
- Ferro **sem leite**. {q-uspsp5-045}
- Plaquetas 98 mil com 35 sem, resto normal: **observação**. {q-unesp2026-031}
- Prolapso mitral, cansaço e sopro: **anemia sintomática**. {q-usp2026-097}` },
      ],
    },
    {
      id: "infeccoes", titulo: "Infecções no pré-natal",
      introducao: `[[Na toxoplasmose, a IgG que existe antes da gestação protege; o perigo é a infecção aguda na gestação, e a transmissão ao feto aumenta com a idade gestacional, enquanto a gravidade diminui.|q-sessp2022-071,q-famema2021-048,q-amrigs2021-049]] [[IgM e IgG positivas no primeiro trimestre pedem avidez: avidez alta antes de 16 semanas data a infecção como anterior à gestação; baixa, ou idade acima de 16 semanas, trata com espiramicina, que diminui a passagem pela placenta.|q-adap21-049,q-uspsp3-060,q-tp20241-088,q-fmabc2025-069,q-unicampdis2022-039]] [[Quando o feto já pode estar infectado (soroconversão na segunda metade, ou PCR do líquido positiva), o tratamento passa a sulfadiazina, pirimetamina e ácido folínico, que atravessam a placenta.|q-unesp2023-027,q-iamspe2023-058]]

[[A sífilis na gestação se trata só com penicilina benzatina, a única que trata o feto; alérgica é dessensibilizada.|q-iamspe2025-054,q-famerp2023-039]]`,
      fragmentos: [
        { id: "inf-toxo", titulo: "Toxoplasmose", conferir: true, diretrizes: ["ms-prenatal"],
          questoes: ["q-adap21-049","q-scmsp2021-075","q-scmsp2022-057","q-usprp2022-046","q-iamspe2023-058","q-unesp2023-027","q-famema2021-048","q-sessp2022-071","q-tp20241-088","q-tp20261-075","q-unicampdis2022-039","q-uspsp3-053","q-uspsp3-060","q-fmabc2025-069","q-amrigs2021-049"],
          casos: ["q-unesp2023-027"],
          figuras: [{ arquivo: "figuras/toxoplasmose.svg", legenda: "Esquema autoral: a sorologia de toxoplasmose no primeiro trimestre e o que fazer com cada resultado." }],
          prosa: `[[IgG e IgM negativas é gestante suscetível: orienta-se a prevenção (carne bem passada, lavar frutas e verduras, luvas para terra e areia de gato) e se repete a sorologia.|q-uspsp3-053,q-famema2021-048]]`,
          texto: `- IgG+ e IgM− no 1º trimestre: **imune**, sem conduta. {q-famema2021-048}
- IgM e IgG+ no 1º trimestre: **avidez e espiramicina**. {q-tp20241-088,q-tp20261-075,q-fmabc2025-069,q-usprp2022-046,q-unicampdis2022-039}
- Avidez **alta** antes de 16 semanas: infecção prévia, **não tratar**. {q-adap21-049}
- Avidez **< 30%**: espiramicina. {q-uspsp3-060}
- IgG− e IgM+: pode ser inicial; **repetir em 2 semanas**. {q-uspsp3-053}
- IgM e IgG+ após 16–26 sem: **espiramicina e amniocentese** (PCR). {q-scmsp2021-075,q-scmsp2022-057}
- Soroconversão com 30 semanas: **sulfadiazina, pirimetamina e ácido folínico**, sem amniocentese. {q-unesp2023-027}
- No esquema tríplice: ultrassom com Doppler da cerebral média (anemia fetal). {q-iamspe2023-058}
- Transmissão **proporcional** à idade gestacional. {q-sessp2022-071,q-amrigs2021-049}` },
        { id: "inf-sifilis", titulo: "Sífilis e hepatites", conferir: false, diretrizes: ["pcdt-tv"],
          questoes: ["q-iamspe2025-054","q-famerp2023-039","q-famerp2024-039","q-udisc20262-089","q-fmabc2024-078","q-fmabc2022-073","q-tp20252-047","q-unicamp2023-050","q-sirio2023-079"],
          casos: ["q-tp20252-047"],
          prosa: `[[Teste rápido treponêmico reagente na gestante já dispara a penicilina, sem esperar o confirmatório, porque cada semana conta para o feto; VDRL baixo isolado pede o treponêmico.|q-fmabc2022-073,q-fmabc2024-078]] [[O seguimento é com VDRL mensal na gestação; tratamento adequado é penicilina completa iniciada até 30 dias antes do parto, e a parceria não entra mais no critério.|q-famerp2024-039,q-udisc20262-089]] [[Hepatite B com HBeAg positivo ou carga viral alta recebe tenofovir no terceiro trimestre, e o recém-nascido, vacina e imunoglobulina; anti-HBs e anti-HBc positivos são infecção passada.|q-unicamp2023-050,q-sirio2023-079]] O detalhe da sífilis está em **IST**.`,
          texto: `- Única opção eficaz: **benzilpenicilina**. {q-iamspe2025-054}
- Alérgica: **dessensibilizar** e penicilina 2,4 milhões/semana × 3. {q-famerp2023-039}
- Seguimento: VDRL **mensal** na gestação. {q-famerp2024-039}
- Penicilina correta, título caindo, > 30 dias antes do parto: **adequadamente tratada**. {q-udisc20262-089}
- Teste rápido positivo: **penicilina já**, gestante e parceria. {q-fmabc2022-073}
- VDRL 1/2 isolado: **teste treponêmico**. {q-fmabc2024-078}
- Pior diagnóstico tardio no gráfico: **Nordeste**. {q-tp20252-047}
- HBeAg+: **tenofovir**; RN com vacina e imunoglobulina. {q-unicamp2023-050}
- Anti-HBs+ e anti-HBc+: **hepatite B resolvida**. {q-sirio2023-079}` },
        { id: "inf-outras", titulo: "Citomegalovírus, parvovírus, varicela, influenza e estreptococo", conferir: true, diretrizes: ["ms-alto-risco"],
          questoes: ["q-adap24-076","q-unifesp2024-061","q-iamspe2023-061","q-sessp2026-084","q-sirio2024-067","q-usprp2021-049","q-simepm89-025","q-didepm-038"],
          prosa: `[[No citomegalovírus, IgG antes da gestação significa infecção passada; IgM nova com IgG antiga é reativação, sem conduta; soroconversão com avidez baixa pede amniocentese a partir de 21 semanas e 6 semanas após a infecção.|q-adap24-076,q-unifesp2024-061]] [[O parvovírus destrói precursores de hemácias e pode causar anemia e hidropisia fetal.|q-iamspe2023-061]] [[Gestante suscetível exposta à varicela recebe imunoglobulina, porque a vacina é de vírus vivo.|q-sessp2026-084,q-sirio2024-067]] [[A gestante com síndrome gripal grave recebe oseltamivir sem esperar o teste.|q-usprp2021-049]] [[Cultura positiva para estreptococo do grupo B ou bacteriúria por ele indicam penicilina cristalina no trabalho de parto.|q-simepm89-025,q-didepm-038]]`,
          texto: `- CMV com soroconversão e avidez baixa: **amniocentese** após 21 semanas e 6 semanas da infecção. {q-adap24-076}
- IgG prévia positiva e IgM nova: **observação**. {q-unifesp2024-061}
- Febre, exantema e artralgia após viagem: **parvovírus B19**, sorologia. {q-iamspe2023-061}
- Contato com varicela, sem imunidade: **imunoglobulina** (CRIE). {q-sessp2026-084,q-sirio2024-067}
- Gestante obesa com síndrome respiratória grave: **oseltamivir**, heparina profilática e antibiótico. {q-usprp2021-049}
- Estreptococo: **penicilina cristalina** 5 milhões + 2,5–3 milhões a cada 4 h. {q-simepm89-025,q-didepm-038}` },
      ],
    },
    {
      id: "prevencao", titulo: "Vacinas, ácido fólico, nutrição e ganho de peso",
      introducao: `[[Vacina de vírus vivo (tríplice viral, varicela, febre amarela na maioria dos casos) não se dá na gestação pelo risco teórico ao feto; a suscetível à rubéola se vacina no puerpério.|q-adap24-072,q-amrigs2021-042,q-fmabc2025-077,q-fmabc2021-051,q-sessp2026-062,q-sirio2027-065]] [[A dTpa se aplica em toda gestação a partir de 20 semanas: os anticorpos contra coqueluche passam pela placenta e protegem o recém-nascido antes de ele poder ser vacinado.|q-adap25-076,q-unifesp2024-052,q-unesp2021-023]] Pelo calendário de 2026, a gestante recebe também hepatite B, influenza e covid-19 em qualquer fase e a vacina contra o vírus sincicial respiratório a partir de 28 semanas.

[[O tubo neural fecha entre 21 e 28 dias após a concepção, antes de muitas mulheres saberem que estão grávidas: por isso o ácido fólico começa pelo menos um mês antes.|q-amrigs2023-055,q-famema2025-064,q-adap25-098]]`,
      fragmentos: [
        { id: "pre-vacinas", titulo: "Vacinas na gestação", conferir: false, diretrizes: ["calendario-vacinal"],
          questoes: ["q-adap24-072","q-adap25-076","q-unifesp2024-052","q-scmsp2023-073-ia","q-scmsp2026-061","q-usp2024-115","q-amrigs2021-042","q-unesp2023-024","q-unesp2021-023","q-unesp2025-022","q-sessp2026-062","q-sirio2027-065","q-fmabc2025-077","q-fmabc2021-051","q-famema2025-062"],
          casos: ["q-unesp2025-022"],
          prosa: `[[O esquema contra tétano se completa na gestação: sem doses, três; com uma, mais uma dT e a dTpa a partir de 20 semanas; com duas ou mais, só a dTpa.|q-scmsp2023-073-ia,q-unesp2021-023]] [[Hepatite B sem registro de vacina e HBsAg não reagente: iniciar ou completar o esquema.|q-unesp2023-024,q-unesp2025-022]] [[Cardiopata crônica tem indicação de pneumocócica no CRIE.|q-scmsp2026-061]]`,
          texto: `- Contraindicada: **tríplice viral** (sarampo, rubéola). {q-adap24-072,q-amrigs2021-042,q-fmabc2025-077,q-fmabc2021-051}
- Rubéola IgG negativa: **tríplice viral no puerpério**. {q-sessp2026-062,q-sirio2027-065}
- dTpa **em toda gestação**, a partir de 20 semanas. {q-adap25-076,q-unifesp2024-052,q-famema2025-062}
- Duas doses de dT antes: **uma dTpa** a partir de 20 sem. {q-unesp2021-023}
- Uma dose antes, com 21 semanas: **dT e dTpa**, a dTpa já. {q-scmsp2023-073-ia}
- Carteira incompleta: **influenza, covid, hepatite B** e dTpa com 20 sem. {q-unesp2025-022,q-usp2024-115}
- HBsAg negativo sem vacina: **iniciar esquema**. {q-unesp2023-024}
- Cardiopata: **pneumocócica**. {q-scmsp2026-061}` },
        { id: "pre-nutricao", titulo: "Ácido fólico, nutrição, álcool e ganho de peso", conferir: true, diretrizes: ["ms-prenatal"],
          questoes: ["q-adap25-098","q-amrigs2023-055","q-famema2025-064","q-fmabc2023-062","q-sirio2024-075","q-fmabc2024-075","q-usprp2021-060","q-tp20222-082","q-tp20232-082","q-tp20252-053","q-tp20231-082","q-tp20241-109","q-unifesp2025-098"],
          casos: ["q-tp20252-053"],
          prosa: `[[Filho anterior com defeito de tubo neural pede 4 mg de ácido fólico; para as demais, 0,4 mg.|q-adap25-098]] [[O ganho de peso se mede pela curva de IMC por semana: a inclinação deve acompanhar a faixa do estado nutricional inicial; quem começa com sobrepeso ganha menos (7 a 11,5 kg), e quem começa obesa ainda menos.|q-usprp2021-060,q-tp20222-082,q-tp20232-082,q-tp20252-053,q-tp20231-082]] [[Não há dose segura de álcool: a exposição causa o espectro alcoólico fetal.|q-unifesp2025-098]] [[Atividade física moderada, como caminhar, vale do início ao fim sem contraindicação.|q-tp20241-109]]`,
          texto: `- Filho com mielomeningocele: **4 mg/dia** um mês antes até 12 sem. {q-adap25-098}
- Tubo neural fecha **21–28 dias** após a concepção. {q-amrigs2023-055}
- Ácido fólico para **toda** mulher que pode engravidar. {q-famema2025-064}
- Banca: **metilfolato** desde a pré-concepção. {q-fmabc2023-062}
- Cálcio igual em **não grávida, grávida e lactante**. {q-sirio2024-075}
- Suplementos isolados **não mudam** o peso ao nascer. {q-fmabc2024-075}
- IMC 25,6: mínimo **230 g/semana**, **7 kg** no total. {q-usprp2021-060}
- Curva acompanhando a faixa: ganho **adequado**. {q-tp20222-082,q-tp20232-082}
- Curva acima da faixa: **reorientar dieta e atividade**. {q-tp20252-053}
- Ganho de 0,5 kg em 10 semanas: **reavaliar e orientar dieta**. {q-tp20231-082}
- **Caminhada** do início ao fim. {q-tp20241-109}
- Álcool: **abstinência**. {q-unifesp2025-098}` },
      ],
    },
    {
      id: "intercorrencias", titulo: "Intercorrências e doenças maternas",
      introducao: `[[A hiperêmese é o vômito que desidrata e emagrece; o hCG alto estimula a tireoide e dá TSH baixo com T4 livre normal ou pouco alto, que não se trata. O risco imediato é a hipopotassemia com alcalose metabólica e a encefalopatia de Wernicke: repõe-se potássio e se dá tiamina antes de glicose.|q-adap21-060,q-usp2022-091,q-usp2026-102,q-unesp2024-025]]

[[A demanda de hormônio tireoidiano sobe 25–30% logo no início, quando o feto ainda depende da tiroxina materna.|q-adap21-057,q-einstein2027-050]] [[A anti-D protege a Rh negativa não sensibilizada: com 28 semanas, depois de procedimento invasivo e após o parto se o recém-nascido for Rh positivo.|q-adap23-055,q-uspsp5-043]]`,
      fragmentos: [
        { id: "int-hiperemese", titulo: "Náuseas e hiperêmese",
          questoes: ["q-adap21-060","q-usp2022-091","q-usp2026-102","q-unesp2024-025"],
          casos: ["q-usp2022-091"],
          texto: `- Hiperêmese com K 2,9: **internar, hidratar, potássio, tiamina antes da glicose**, antiemético. {q-adap21-060}
- ECG de hipocalemia: **potássio endovenoso**. {q-usp2022-091}
- TSH suprimido com T4 livre normal: **hipertiroidismo transitório**, só suporte. {q-usp2026-102}
- Vômitos que pioram: **internação e suporte**. {q-unesp2024-025}` },
        { id: "int-cronicas", titulo: "Tireoide, Rh, cardiopatia, trombose e remédios", conferir: true, diretrizes: ["ms-alto-risco"],
          questoes: ["q-adap21-057","q-einstein2027-050","q-adap22-037","q-sirio2026-075","q-adap23-055","q-uspsp5-043","q-amrigs2022-041","q-usprp2023-023","q-sirio2023-084","q-uspsp4-039"],
          prosa: `[[O ácido acetilsalicílico em baixa dose, de 12 a 16 semanas, reduz a pré-eclâmpsia nas de alto risco (hipertensa crônica, gemelar).|q-adap22-037,q-sirio2026-075]] [[A hipertensão pulmonar é a cardiopatia que mais mata na gestação, porque o ventrículo direito não suporta o aumento do volume.|q-amrigs2022-041]] [[Varfarina é teratogênica no primeiro trimestre e se troca por enoxaparina; IECA e espironolactona também se suspendem antes de engravidar.|q-usprp2023-023,q-uspsp4-039]] [[TEV prévio é o maior fator de risco de trombose na gestação.|q-sirio2023-084]]`,
          texto: `- Hashimoto controlado que engravida: **aumentar levotiroxina 25–30%**, TSH a cada 4 sem. {q-adap21-057}
- Hipotireoidismo diagnosticado na gestação: levotiroxina **~2 µg/kg/dia**. {q-einstein2027-050}
- Hipertensa e obesa: **AAS 81–150 mg** à noite, de 12 a 16 sem. {q-adap22-037}
- Principal motivo para AAS: **gemelar**. {q-sirio2026-075}
- Rh negativo, Coombs indireto negativo: **anti-D 300 µg com 28 sem** e após o parto. {q-adap23-055}
- Anti-D recebida na amniocentese: **anti-D no puerpério** se RN Rh+. {q-uspsp5-043}
- Maior mortalidade: **hipertensão pulmonar**. {q-amrigs2022-041}
- Varfarina com 16 sem: **trocar por enoxaparina terapêutica**. {q-usprp2023-023}
- TEV prévio com hormônio: **alto risco** de trombose. {q-sirio2023-084}
- Antes de engravidar: suspender **enalapril e espironolactona**, usar metildopa. {q-uspsp4-039}` },
        { id: "int-colo", titulo: "Colo curto",
          questoes: ["q-usp2026-111","q-usprp2022-041","q-usprp2026-072"],
          casos: ["q-usp2026-111"],
          prosa: `[[O colo que encurta no segundo trimestre antecipa o parto prematuro: progesterona vaginal reduz o risco, e a cerclagem entra no colo que já dilata ou encurta muito com prematuro anterior.|q-usp2026-111,q-usprp2022-041,q-usprp2026-072]] O detalhe está em **Parto pré-termo e rotura de membranas**.`,
          texto: `- Colo dilatando com prematuro anterior: **cerclagem de emergência**. {q-usp2026-111}
- Em uso de progesterona, colo de 2,6 cm: **manter a progesterona**. {q-usprp2022-041}
- Colo normal: **pré-natal de risco habitual**. {q-usprp2026-072}` },
      ],
    },
    {
      id: "vitalidade", titulo: "Vitalidade e crescimento fetal",
      introducao: `[[A cardiotocografia anteparto reativa (acelerações com os movimentos) mostra um feto bem oxigenado; a não reativa pede mais tempo, estímulo ou perfil biofísico, e o padrão sinusoidal sugere anemia fetal grave.|q-usprp2023-026,q-usp2023-037,q-iamspe2025-058,q-usprp2021-057]] [[Restrição de crescimento por insuficiência placentária aumenta a resistência na artéria umbilical; o feto pequeno com Doppler normal é apenas pequeno para a idade gestacional e nasce perto do termo.|q-iamspe2021-062,q-unesp2023-030,q-amrigs2022-042,q-usp2025-018]]`,
      fragmentos: [
        { id: "vit-anteparto", titulo: "Cardiotocografia e perfil biofísico", conferir: true, diretrizes: ["ms-alto-risco"],
          questoes: ["q-usp2022-097","q-usp2023-037","q-usprp2021-057","q-usprp2023-026","q-usprp2024-093","q-usprp2026-071","q-iamspe2025-058","q-usp2023-107"],
          casos: ["q-iamspe2025-058","q-usprp2024-093"],
          texto: `- Sem movimentos percebidos: **auscultar após estímulo**. {q-usprp2021-057}
- Traçado não reativo a termo: **perfil biofísico**. {q-usprp2023-026}
- Traçado tranquilizador: **bem-estar fetal**. {q-usp2023-037}
- Gestante febril com taquicardia fetal: **oxigênio e manter monitorização**. {q-usp2022-097}
- Traçado patológico em hipertensa com 33 sem: **cesárea imediata**. {q-usprp2024-093}
- Perfil alterado com 37 sem: **indução**. {q-usprp2026-071}
- Padrão **sinusoidal**: alto risco de óbito. {q-iamspe2025-058}
- Hipertensa com feto pequeno a termo: **não aguardar** o trabalho espontâneo. {q-usp2023-107}` },
        { id: "vit-crescimento", titulo: "Feto pequeno e restrição de crescimento", conferir: true, diretrizes: ["ms-alto-risco"],
          questoes: ["q-amrigs2022-042","q-iamspe2021-062","q-unesp2023-030","q-usp2025-018"],
          texto: `- Placentação inadequada: **resistência aumentada** na umbilical. {q-iamspe2021-062}
- Percentil 8 com Doppler normal: **pequeno para a idade gestacional**. {q-unesp2023-030}
- Percentil 3–10 sem comprometimento: parto **a partir de 39 sem**. {q-amrigs2022-042}
- Adolescente com Doppler normal: **parto com 40 sem**. {q-usp2025-018}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-fmabc2023-062","q-unicamp2022-054","q-unesp2026-022","q-scmsp2023-073-ia","q-amrigs2022-042"],
          texto: `- Ácido fólico comum (0,4 mg) basta; a banca cobrou **metilfolato**. {q-fmabc2023-062}
- Óbito fetal anterior: investigar a causa; a banca escolheu **trombofilias** como resposta. {q-unicamp2022-054}
- HTLV contraindica a amamentação; o gabarito **liberou o aleitamento**. {q-unesp2026-022}
- A questão de vacina original foi anulada (dTpa "a partir de 28 semanas"); vale **20 semanas**. {q-scmsp2023-073-ia}
- Feto entre os percentis 3 e 10 com Doppler normal: as fontes vão de **37 a 39 semanas**; a prova pediu **39**. {q-amrigs2022-042}` },
      ],
    },
  ],
});
