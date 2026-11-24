/* resumos/sindromes-gripais/resumo.js — resumo adaptativo de síndromes gripais (ass-infecto-covid): influenza
   (vírus e variação antigênica, clínica, síndrome gripal × SRAG, oseltamivir, vacina e quimioprofilaxia),
   covid-19 (vírus, clínica e imagem, gravidade, tratamento, isolamento, vacinas e leitura de gráficos, gestação),
   síndrome inflamatória multissistêmica pediátrica, armadilhas e tabela influenza × covid.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- sindromes-gripais */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "sindromes-gripais",
  titulo: "Síndromes gripais: influenza, SRAG e covid-19",
  assunto: "ass-infecto-covid",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "ms-influenza", texto: "Ministério da Saúde — Guia de manejo e tratamento de influenza 2023 e Guia de Vigilância em Saúde (influenza e SRAG)", lidoEm: "2026-11-19" },
    { id: "oms-covid", texto: "OMS — Clinical management of COVID-19 / Therapeutics and COVID-19: living guideline (edição vigente)", lidoEm: null },
    { id: "ms-covid", texto: "Ministério da Saúde — Guia de Vigilância Epidemiológica da covid-19 (2021/2022) e Manual de recomendações para assistência à gestante e puérpera frente à covid-19", lidoEm: null },
    { id: "sbp-simp", texto: "Sociedade Brasileira de Pediatria — Síndrome inflamatória multissistêmica em crianças e adolescentes associada à covid-19 (nota de alerta) e definição da OMS (2020)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-tp20202-105"] },
  ],
  doencas: [
    {
      id: "influenza", titulo: "Influenza",
      introducao: `[[O vírus influenza é um RNA segmentado com duas proteínas de superfície: a hemaglutinina (H), que gruda no epitélio respiratório e o faz entrar na célula, e a neuraminidase (N), que corta a saída das partículas novas. Mutações pontuais nelas (deriva) trocam um pouco o vírus a cada ano, e por isso a vacina é anual; a troca de segmentos inteiros entre vírus humanos e animais (rearranjo), só possível no tipo A, que infecta homem, porco, cavalo, aves e mamíferos marinhos, cria vírus novos e pandemias, como o H1N1 de 2009, que atingiu adultos jovens saudáveis. O tipo B infecta só o homem.|q-gdinfluenza-005,q-gdinfluenza-006,q-gdinfluenza-019,q-gdinfluenza-009]] [[A incubação é curta (1 a 4 dias) e o vírus é transmitido desde a véspera dos sintomas; o quadro começa de repente com febre alta (mais alta na criança), mialgia, cefaleia e prostração, e depois predominam tosse e cansaço por uma a duas semanas.|q-gdinfluenza-008,q-gdinfluenza-007,q-sirio2021-081]]

Veja também: **Pneumonia adquirida na comunidade** (complicação bacteriana), **Imunização** e **Calendário vacinal** (vacina de influenza e covid), **Vigilância em saúde** (notificação), **Exantemáticas** (Kawasaki) e **HIV** (pneumocistose).`,
      fragmentos: [
        { id: "inf-virus", titulo: "Vírus, clínica e grupos de risco", conferir: true,
          questoes: ["q-gdinfluenza-005","q-gdinfluenza-006","q-gdinfluenza-007","q-gdinfluenza-008","q-gdinfluenza-019","q-sirio2021-081","q-gdinfluenza-011"],
          prosa: `[[O risco de complicação é maior nos extremos de idade, na gestação e no puerpério, nas doenças crônicas (pulmão, coração, rim, fígado, diabetes, obesidade grave) e na imunossupressão. Na pneumonia viral grave pela influenza A H1N1, a DHL alta marca a lesão pulmonar extensa e o pior prognóstico.|q-gdinfluenza-019,q-gdinfluenza-011]] [[Comparada à influenza, a covid tem incubação mais longa, é mais contagiosa e também se transmite antes dos sintomas.|q-sirio2021-081]]`,
          texto: `- Hemaglutinina: **entrada na célula**; neuraminidase: **saída**. {q-gdinfluenza-005}
- Tipo A em homem, porco, cavalo e aves; **tipo B só no homem**. {q-gdinfluenza-006}
- Errada: sintomas respiratórios **por 3 a 4 semanas** após a febre. {q-gdinfluenza-007}
- Errada: febre **menos** acentuada na criança. {q-gdinfluenza-008}
- H1N1 2009: **formas graves em adultos jovens saudáveis**. {q-gdinfluenza-019}
- Errada: homens com **mais risco nas duas** infecções. {q-sirio2021-081}
- Gravidade no H1N1: **DHL**. {q-gdinfluenza-011}` },
        { id: "inf-srag", titulo: "Síndrome gripal × SRAG e vigilância", conferir: false, diretrizes: ["ms-influenza"],
          figuras: [{ arquivo: "figuras/sg-srag.svg", legenda: "Esquema autoral: da síndrome gripal à SRAG e a conduta em cada caso." }],
          questoes: ["q-gdinfluenza-001","q-gdinfluenza-002","q-gdinfluenza-004","q-gdinfluenza-012","q-gdinfluenza-016"],
          prosa: `[[Síndrome gripal é febre (mesmo referida) com tosse ou dor de garganta, mais cefaleia, mialgia ou artralgia. Vira síndrome respiratória aguda grave (SRAG) quando há dispneia ou desconforto respiratório, saturação abaixo de 95% em ar ambiente, pressão persistente no tórax, cianose, hipotensão ou piora da doença de base. Febre alta isolada não é critério.|q-gdinfluenza-004,q-gdinfluenza-012,q-gdinfluenza-016]] [[Toda SRAG hospitalizada é notificada no SIVEP-Gripe e tem secreção respiratória colhida para pesquisa viral (vigilância universal), sem que o tratamento espere o resultado; no hospital, precaução para gotículas.|q-gdinfluenza-001,q-gdinfluenza-002]]`,
          texto: `- Vigilância da SRAG: **pesquisa laboratorial do vírus**. {q-gdinfluenza-001}
- No hospital: **notificar os casos que se encaixam na definição**. {q-gdinfluenza-002}
- Errada: SRAG = **febre com sintomas respiratórios** (isso é síndrome gripal). {q-gdinfluenza-004}
- Não é critério de SRAG (a prova): **desconforto avaliado independentemente da idade**. {q-gdinfluenza-012}
- Não é critério: **febre alta súbita**. {q-gdinfluenza-016}` },
        { id: "inf-tratamento", titulo: "Oseltamivir", conferir: false, diretrizes: ["ms-influenza"],
          questoes: ["q-famerp2026-011","q-gdinfluenza-003","q-gdinfluenza-010","q-gdinfluenza-013","q-gdinfluenza-014","q-gdinfluenza-015","q-gdinfluenza-017","q-gdinfluenza-018"],
          prosa: `[[O oseltamivir inibe a neuraminidase e impede o vírus de sair da célula; funciona melhor nas primeiras 48 horas, mas na SRAG e no grupo de risco se dá a qualquer momento, sem esperar exame. Indicação: toda SRAG e toda síndrome gripal em quem tem fator de risco (gestante, idoso, doença crônica, criança pequena), mesmo vacinado. Dose do adulto: 75 mg de 12 em 12 horas por 5 dias, com comida para reduzir a náusea; receita simples.|q-famerp2026-011,q-gdinfluenza-003,q-gdinfluenza-010,q-gdinfluenza-013,q-gdinfluenza-014,q-gdinfluenza-015,q-gdinfluenza-017,q-gdinfluenza-018]]`,
          texto: `- Asmático com síndrome gripal: **oseltamivir, de preferência em 48 h**. {q-famerp2026-011}
- Hipoxemia após viagem: **oseltamivir**. {q-gdinfluenza-003}
- Errada: administrar **nas primeiras 6 horas**. {q-gdinfluenza-010}
- Oseltamivir: **75 mg 12/12 h por 5 dias**, com comida para reduzir a náusea; encurta os sintomas se começa em até 2 dias. {q-gdinfluenza-013}
- Indicação: **grupo de risco** (gestante, idoso). {q-gdinfluenza-014}
- Gestante: **oseltamivir**. {q-gdinfluenza-015}
- SRAG em idosa: **PCR viral, oxigênio e oseltamivir**. {q-gdinfluenza-017}
- Antiviral da influenza: **oseltamivir**. {q-gdinfluenza-018}` },
        { id: "inf-prevencao", titulo: "Vacina e quimioprofilaxia", conferir: true, diretrizes: ["ms-influenza"],
          questoes: ["q-sirio2023-007","q-gdinfluenza-020","q-gdinfluenza-009"],
          prosa: `[[A prevenção principal é a vacina anual, antes do outono e do inverno, que reduz infecção, internação e morte; a quimioprofilaxia com antiviral fica para situações específicas (expostos de alto risco não vacinados, surtos em instituições). O antiviral inativa a vacina de vírus vivo atenuado: ela só pode ser dada 48 horas depois de parar o antiviral.|q-sirio2023-007,q-gdinfluenza-020,q-gdinfluenza-009]]`,
          texto: `- Profilaxia principal: **vacina**. {q-sirio2023-007}
- Vacina de vírus vivo: **48 h após suspender o antiviral**. {q-gdinfluenza-020}
- Errada: a vacina **não reduz o agravamento**. {q-gdinfluenza-009}` },
      ],
    },
    {
      id: "covid", titulo: "Covid-19",
      introducao: `[[O SARS-CoV-2 é um coronavírus envelopado com genoma de RNA de fita simples longo; a proteína spike se liga ao receptor ECA2 do epitélio respiratório. A doença tem duas fases: a viral, na primeira semana (febre, tosse, anosmia), e a inflamatória, a partir do 7º dia, quando a resposta do hospedeiro inflama o pulmão (hipoxemia, vidro fosco) e a coagulação (tromboses). É por isso que o antiviral serve cedo e o corticoide serve tarde, no paciente que precisa de oxigênio.|q-tp20202-015,q-adap22-097,q-einstein2021-009]]`,
      fragmentos: [
        { id: "cov-clinica", titulo: "Clínica, imagem e gravidade", conferir: true,
          casos: ["q-usp2022-011","q-unicampdis2022-049"],
          questoes: ["q-tp20202-015","q-usp2022-011","q-iamspe2021-009","q-sirio2021-098","q-unicampdis2022-049","q-famema2023-006","q-sessp2024-044","q-adap21-024"],
          prosa: `[[A tomografia mostra opacidades em vidro fosco bilaterais e periféricas; escavação, derrame e linfonodo falam contra. Os fatores de risco para doença grave são idade, obesidade, doença renal, câncer, diabetes e gestação.|q-usp2022-011,q-iamspe2021-009,q-sirio2021-098,q-unicampdis2022-049]] [[Na criança a maioria tem quadro leve ou é assintomática; doença moderada é pneumonia sem hipoxemia. A letalidade da covid em 2020 foi muito menor que a da AIDS nos anos 1980.|q-sessp2024-044,q-famema2023-006]] [[O RT-PCR pode continuar positivo por semanas depois da cura, com Ct alto, detectando RNA residual sem vírus viável: não é reinfecção nem exige novo isolamento.|q-adap21-024]]`,
          texto: `- SARS-CoV-2: **envelopado, RNA longo**. {q-tp20202-015}
- Obeso com 10 dias de febre e vidro fosco: **covid-19**. {q-usp2022-011}
- Tomografia: **vidro fosco bilateral**. {q-iamspe2021-009}
- Não é fator de risco (CDC, a prova): **demência**. {q-sirio2021-098}
- Associação estatística com gravidade: **câncer**. {q-unicampdis2022-049}
- Letalidade da AIDS nos anos 1980 **maior** que a da covid em 2020. {q-famema2023-006}
- Criança moderada: **pneumonia sem hipoxemia**. {q-sessp2024-044}
- PCR positivo com Ct 35 após 45 dias: **RNA residual**. {q-adap21-024}` },
        { id: "cov-tratamento", titulo: "Tratamento do paciente internado", conferir: true, diretrizes: ["oms-covid"],
          casos: ["q-unicampdis2025-058"],
          questoes: ["q-adap22-097","q-einstein2021-009","q-usprp2025-090","q-unicampdis2025-058"],
          prosa: `[[No internado com hipoxemia, oxigênio e dexametasona 6 mg por até 10 dias (o estudo RECOVERY mostrou menos mortes em quem usava oxigênio, nenhum benefício sem oxigênio) e profilaxia de tromboembolismo com heparina; antibiótico só com suspeita bacteriana. Ivermectina, hidroxicloroquina e azitromicina não funcionam.|q-adap22-097,q-einstein2021-009]] [[A profilaxia é com heparina em dose profilática, e o AAS que o paciente já usava por doença arterial continua.|q-usprp2025-090]] [[No imunossuprimido com corticoide, pneumonia intersticial com hipoxemia pode ser pneumocistose: sulfametoxazol-trimetoprima.|q-unicampdis2025-058]]`,
          texto: `- 7º dia, SpO2 88%: **oxigênio, dexametasona 6 mg e profilaxia de TEV**. {q-adap22-097}
- Dexametasona **reduziu mortalidade em quem usava oxigênio**. {q-einstein2021-009}
- Claudicante internado com covid: **manter AAS e HNF profilática**. {q-usprp2025-090}
- Prednisona 40 mg há 60 dias com pneumonia intersticial: **sulfametoxazol-trimetoprima**. {q-unicampdis2025-058}` },
        { id: "cov-isolamento", titulo: "Isolamento, contatos, máscara e vacinas", conferir: true, diretrizes: ["ms-covid"],
          casos: ["q-unesp2023-096","q-iamspe2022-073"],
          questoes: ["q-unifesp2022-097","q-famema2022-015","q-sirio2022-099","q-unesp2022-100","q-unesp2023-099","q-iamspe2022-073","q-unesp2023-096","q-usprp2021-024"],
          prosa: `[[Com sintomas, afasta-se logo, testa-se (RT-PCR nos primeiros dias, antígeno) e rastreiam-se os contatos: quem mora junto, quem ficou a menos de 1 metro por 15 minutos sem máscara, quem teve contato físico. O caso grave ou imunossuprimido isola por mais tempo (cerca de 20 dias, com 24 horas sem febre).|q-famema2022-015,q-sirio2022-099,q-unifesp2022-097]] [[A máscara de tecido filtra conforme o tecido e as camadas; a N95 com válvula não protege os outros. A maioria dos infectados não é detectada, o que explica a propagação. As vacinas reduziram casos graves e mortes; o reforço com plataforma diferente (heteróloga) foi recomendado sobretudo para quem recebeu Coronavac. Num gráfico de casos e mortes, o país em que os casos sobem e as mortes não acompanham tem cobertura vacinal alta, mas a queda das mortes também pode começar antes da vacinação em massa por outros motivos.|q-unesp2022-100,q-usprp2021-024,q-unesp2023-099,q-unesp2023-096,q-iamspe2022-073]]`,
          texto: `- Grave na UTI: **isolamento por 20 dias e 24 h sem febre**. {q-unifesp2022-097}
- Sintomas: **afastar, testar e rastrear contatos**. {q-famema2022-015}
- Não é contato próximo: **quem é o próprio caso confirmado**. {q-sirio2022-099}
- Máscara caseira: **filtra conforme o tecido**. {q-unesp2022-100}
- Reforço heterólogo: **sobretudo após Coronavac**. {q-unesp2023-099}
- Queda das mortes **antes da cobertura vacinal ampla**. {q-iamspe2022-073}
- Casos altos com poucas mortes: **país 1 com cobertura alta**. {q-unesp2023-096}
- Inquérito sorológico: **a maioria dos infectados não é detectada**. {q-usprp2021-024}` },
        { id: "cov-gestacao", titulo: "Covid-19 na gestação", conferir: true, diretrizes: ["ms-covid"],
          questoes: ["q-scmsp2022-022","q-unesp2022-040","q-sirio2023-083","q-einstein2023-064"],
          prosa: `[[A gestante com covid tem mais risco de internação e UTI, e a vacina reduz esse risco. O quadro leve (sem dispneia) trata-se em casa com sintomáticos e orientação de sinais de alerta; não há malformação nem exame fetal invasivo indicado. A amamentação continua, com máscara e higiene das mãos.|q-unesp2022-040,q-sirio2023-083,q-einstein2023-064,q-scmsp2022-022]]`,
          texto: `- Parturiente com covid: **amamentação mantida**. {q-scmsp2022-022}
- Gestantes: **mais internação e UTI**. {q-unesp2022-040}
- 33 semanas sem dispneia: **leve, tratamento domiciliar**. {q-sirio2023-083}
- 20 semanas com tosse: **sintomáticos e sinais de alerta**. {q-einstein2023-064}` },
        { id: "cov-simp", titulo: "Síndrome inflamatória multissistêmica pediátrica", conferir: true, diretrizes: ["sbp-simp"],
          questoes: ["q-scmsp2021-059","q-scmsp2022-036","q-famema2023-090","q-unesp2022-014","q-fmabc2023-043","q-einstein2021-028","q-einstein2022-041"],
          prosa: `[[Semanas depois da infecção (com PCR já negativo e IgG positiva), uma resposta imune desregulada inflama vasos e órgãos: febre por 3 dias ou mais, com envolvimento de dois sistemas ou mais (coração com disfunção e choque, que é o achado mais frequente; trato gastrointestinal com dor, vômito e diarreia; pele e conjuntiva, como no Kawasaki), marcadores inflamatórios altos e outra causa afastada. Atinge mais escolares que lactentes. Tratamento: imunoglobulina, corticoide e AAS, suporte e, enquanto não se afasta sepse, antibiótico de amplo espectro.|q-scmsp2021-059,q-scmsp2022-036,q-famema2023-090,q-unesp2022-014,q-fmabc2023-043,q-einstein2021-028,q-einstein2022-041]]`,
          texto: `- SIM-P: **alterações cardiovasculares e gastrointestinais** frequentes. {q-scmsp2021-059}
- Choque com febre e dor abdominal: **antibiótico de amplo espectro** enquanto se investiga. {q-scmsp2022-036}
- Critério com febre: **vômito, diarreia ou dor abdominal**. {q-famema2023-090}
- Covid há 1 mês, dor abdominal, placas e sonolência: **SIM-P**. {q-unesp2022-014}
- Achado mais frequente: **disfunção miocárdica**. {q-fmabc2023-043}
- Lembra: **Kawasaki**. {q-einstein2021-028}
- Confirma exposição: **IgG para covid elevada**. {q-einstein2022-041}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["ms-influenza","ms-covid"],
          questoes: ["q-gdinfluenza-012","q-gdinfluenza-010","q-unifesp2022-097","q-gdinfluenza-009","q-sirio2021-081"],
          prosa: `[[**Critérios de SRAG**: desconforto respiratório e frequência respiratória aumentada, avaliados conforme a idade, são critério; a gdinfluenza-012 deu como exceção a frase "avaliada independentemente da idade", que é o detalhe errado.|q-gdinfluenza-012]] [[**Janela do oseltamivir**: o ideal é até 48 horas, não 6 (gdinfluenza-010); na SRAG e no grupo de risco dá-se mesmo depois.|q-gdinfluenza-010]] [[**Isolamento**: os prazos mudaram ao longo da pandemia (10, 7 ou 5 dias nos leves; 20 dias nos graves e imunossuprimidos); a unifesp2022-097 cobrou a regra de 2021-2022.|q-unifesp2022-097]] [[**Vacina de influenza**: reduz a gravidade e as mortes; a gdinfluenza-009 usou a negação dessa ideia como alternativa errada.|q-gdinfluenza-009]] [[**Sexo e gravidade**: o masculino pesa na covid, não claramente na influenza (sirio2021-081).|q-sirio2021-081]]`,
          texto: `- SRAG: desconforto avaliado **conforme a idade**. {q-gdinfluenza-012}
- Oseltamivir: **até 48 h** é o ideal. {q-gdinfluenza-010}
- Isolamento: a prova cobrou **20 dias no grave**. {q-unifesp2022-097}
- A vacina **reduz** o agravamento. {q-gdinfluenza-009}
- Sexo masculino: risco na **covid**. {q-sirio2021-081}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: influenza × covid-19",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-influenza-covid", titulo: "Vírus, quadro e tratamento", conferir: true,
          questoes: ["q-sirio2021-081","q-gdinfluenza-018","q-adap22-097","q-iamspe2021-009"],
          prosa: `[[As duas causam síndrome gripal e SRAG; diferem no ritmo e no tratamento.|q-sirio2021-081,q-gdinfluenza-018,q-adap22-097,q-iamspe2021-009]]

| | Influenza | Covid-19 |
|---|---|---|
| Vírus | RNA segmentado, H e N | coronavírus envelopado, spike-ECA2 |
| Incubação | 1 a 4 dias | mais longa (2 a 14 dias) |
| Pico | primeiros dias | piora inflamatória após o 7º dia |
| Imagem | variável | vidro fosco bilateral periférico |
| Antiviral | oseltamivir (48 h; SRAG e risco a qualquer tempo) | antivirais só cedo no grupo de risco |
| Fase grave | suporte, oseltamivir | oxigênio, dexametasona, profilaxia de trombose |
| Prevenção | vacina anual | vacina e reforços |`,
          texto: `- Covid **mais contagiosa**, incubação mais longa. {q-sirio2021-081}
- Influenza: **oseltamivir**. {q-gdinfluenza-018}
- Covid com hipoxemia: **dexametasona**. {q-adap22-097}
- Covid: **vidro fosco**. {q-iamspe2021-009}` },
      ],
    },
  ],
});
