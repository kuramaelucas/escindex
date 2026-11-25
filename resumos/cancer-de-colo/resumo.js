/* resumos/cancer-de-colo/resumo.js — resumo adaptativo de câncer do colo do útero: HPV e prevenção, rastreamento
   com DNA-HPV (Portaria 13/2025) e quem rastrear, conduta na citologia alterada, colposcopia e tratamento das
   lesões precursoras, câncer invasor (diagnóstico, estadiamento FIGO 2018 e tratamento).
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- cancer-de-colo */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "cancer-de-colo",
  titulo: "Câncer do colo do útero e lesões precursoras",
  assunto: "ass-cacolo",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "rastreio-colo", texto: "Ministério da Saúde — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero com teste de DNA-HPV, Portaria Conjunta SAES/SECTICS nº 13, de 29/07/2025", lidoEm: null },
    { id: "inca-2016", texto: "INCA — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero, 2ª edição (2016): conduta na citologia alterada", lidoEm: null },
    { id: "figo-colo", texto: "FIGO — estadiamento do câncer do colo do útero (2018, corrigido em 2019)", lidoEm: null },
    { id: "calendario-vacinal", texto: "Ministério da Saúde — Calendário Nacional de Vacinação 2026 (HPV)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas ou desatualizadas pela Portaria 13/2025; as desatualizadas entram pelas reposições", questoes: ["q-unifesp2026-053","q-unicamp2022-063","q-tp20202-090","q-tp20232-095","q-tp20251-097","q-tp20261-030"] },
  ],
  doencas: [
    {
      id: "hpv", titulo: "HPV, rastreamento e prevenção",
      introducao: `[[O câncer do colo nasce da infecção persistente por HPV oncogênico, sobretudo os tipos 16 e 18: as proteínas E6 e E7 desligam p53 e Rb, e a célula da zona de transformação acumula mutações ao longo de anos.|q-iamspe2023-052,q-sirio2023-090]] A maioria das infecções some em 1 a 2 anos; é a persistência, somada a tabagismo e imunossupressão, que leva à lesão de alto grau. [[Iniciação sexual precoce, muitos parceiros, multiparidade, tabagismo e baixo nível socioeconômico aumentam o risco.|q-sessp2025-067]]

[[A zona de transformação é onde o epitélio colunar vira escamoso (metaplasia), na junção escamocolunar; na jovem ela está para fora (ectopia, que é normal e não se trata), e depois da menopausa entra no canal.|q-amrigs2023-045,q-iamspe2022-051]] [[O efeito do HPV na célula é a coilocitose; corpúsculos de inclusão intranucleares sugerem herpes.|q-amrigs2021-051,q-udisc20262-100]]

[[A vacina previne a infecção, por isso funciona antes do início da vida sexual: hoje é dose única para meninas e meninos de 9 a 14 anos, e vacinada também se rastreia.|q-famema2022-059,q-tp20241-115,q-adap23-060,q-tp20252-083]]

Veja também: **IST** (verrugas pelo HPV, dono das lesões genitais benignas), **Câncer de endométrio** (células glandulares atípicas e sangramento após 35 anos), **Calendário vacinal** (HPV).`,
      fragmentos: [
        { id: "hpv-agente", titulo: "HPV, zona de transformação e vacina", conferir: true, diretrizes: ["calendario-vacinal"],
          questoes: ["q-iamspe2023-052","q-sessp2025-067","q-sirio2023-090","q-amrigs2021-051","q-udisc20262-100","q-amrigs2023-045","q-iamspe2022-051","q-sirio2024-065","q-famema2022-059","q-tp20241-115","q-adap23-060"],
          casos: ["q-amrigs2021-051"],
          prosa: `[[Citologia com células escamosas, metaplásicas, bacilos e alguns leucócitos é normal: metaplasia é o próprio processo da zona de transformação.|q-sirio2024-065]]`,
          texto: `- Principal fator: **infecção persistente pelo HPV** oncogênico. {q-iamspe2023-052}
- Risco real: persistência de **HPV 16 e 18**. {q-sirio2023-090}
- Fatores: **multiparidade, sexarca precoce, baixo nível socioeconômico**. {q-sessp2025-067}
- Acetobranco com pontilhado e coilócitos: **HPV**. {q-amrigs2021-051}
- Inclusões intranucleares: **herpes**. {q-udisc20262-100}
- JEC dentro do canal: **pós-menopausa**. {q-amrigs2023-045}
- Ectopia assintomática: **expectante**. {q-iamspe2022-051}
- Metaplasia e bacilos: **exame normal**. {q-sirio2024-065}
- Vacina: meninas e meninos de **9 a 14 anos**. {q-famema2022-059,q-tp20241-115}
- Menina de 12 anos não vacinada: **dose única** e rastreio na vida adulta. {q-adap23-060}` },
        { id: "hpv-rastreio", titulo: "Rastreamento com DNA-HPV (2025)", conferir: true, diretrizes: ["rastreio-colo"],
          figuras: [{ arquivo: "figuras/rastreio-hpv.svg", legenda: "Esquema autoral: o rastreamento com teste de DNA-HPV e o caminho de cada resultado." }],
          questoes: ["q-adap25-067","q-tp20202-090-ia","q-tp20232-095-ia","q-tp20251-097-ia","q-tp20261-030-ia","q-iamspe2026-042","q-sessp2026-074","q-unesp2025-031","q-sirio2026-062","q-udisc20262-098","q-uspsp4-082","q-einstein2026-055","q-tp20252-083"],
          prosa: `[[Desde agosto de 2025, o exame primário é o teste de DNA-HPV oncogênico, dos 25 aos 64 anos, a cada 5 anos se negativo: ele é mais sensível que a citologia, e um negativo garante proteção longa.|q-adap25-067,q-iamspe2026-042,q-uspsp4-082,q-udisc20262-098,q-tp20202-090-ia,q-tp20232-095-ia,q-tp20251-097-ia]] [[HPV 16 ou 18 positivo vai direto à colposcopia; outros tipos oncogênicos fazem citologia da mesma amostra (reflexa): alterada, colposcopia; normal, novo teste de HPV em 1 ano.|q-unesp2025-031,q-sirio2026-062]] [[Não se faz citologia junto com o HPV (coteste), e quem já tinha indicação de colposcopia pelo rastreio citológico vai à colposcopia sem precisar do teste.|q-sessp2026-074,q-einstein2026-055]] [[Onde o teste ainda não chegou, segue a citologia: os dois primeiros exames anuais e, se normais, a cada 3 anos.|q-tp20261-030-ia]]`,
          texto: `- Exame primário: **DNA-HPV** a partir dos 25 anos, a cada **5 anos** se negativo. {q-adap25-067,q-iamspe2026-042,q-uspsp4-082,q-udisc20262-098}
- Vacinada também rastreia: **DNA-HPV**. {q-adap25-067,q-tp20252-083}
- 23 anos: **iniciar aos 25**, com DNA-HPV. {q-tp20202-090-ia}
- Exame primário indicado aos 30: **DNA-HPV**. {q-tp20232-095-ia}
- HPV negativo: repetir em **5 anos**. {q-tp20251-097-ia}
- HPV **16**: **colposcopia**. {q-unesp2025-031,q-sirio2026-062}
- Citologia **não** é feita junto com o teste. {q-sessp2026-074}
- Quem já tinha indicação de colposcopia **não precisa** testar HPV antes. {q-einstein2026-055}
- Sem teste disponível: citologia, **anual nas duas primeiras** e depois a cada 3 anos. {q-tp20261-030-ia}` },
        { id: "hpv-quem", titulo: "Quem rastrear e como coletar", conferir: true, diretrizes: ["rastreio-colo","inca-2016"],
          questoes: ["q-scmsp2025-096","q-famema2023-045","q-famema2025-055","q-sessp2022-069","q-uspsp5-027","q-uspsp3-011","q-fmabc2021-047","q-fmabc2022-068","q-einstein2023-062","q-unifesp2025-067","q-unicamp2023-062","q-usp2026-114","q-usp2023-028","q-usp2023-070","q-famema2021-068","q-tp20232-114","q-amrigs2021-052","q-unicamp2022-056"],
          casos: ["q-amrigs2021-052"],
          prosa: `[[O rastreio é para quem tem colo e já teve relação com penetração, dos 25 aos 64 anos; antes dos 25 as lesões regridem e o tratamento faria mais mal (prematuridade) que bem.|q-uspsp5-027,q-fmabc2021-047,q-uspsp3-011,q-famema2025-055]] [[Para depois dos 64, com exames negativos recentes; sem colo por doença benigna, para; com histerectomia por lesão de alto grau, continua.|q-famema2023-045,q-unicamp2023-062,q-fmabc2022-068,q-unifesp2025-067]] [[Homem trans com colo, lésbica e bissexual também rastreiam; a testosterona atrofia o epitélio (mais células basais, pior leitura), e estrogênio tópico antes da coleta ajuda.|q-famema2021-068,q-tp20232-114,q-usp2023-028,q-usp2023-070,q-scmsp2025-096]] [[A imunossuprimida (HIV) começa ao iniciar a vida sexual e repete anualmente.|q-usp2026-114]]`,
          texto: `- Faixa prioritária: **25 a 64 anos**. {q-famema2025-055}
- Início aos **25 anos**, mesmo com vida sexual antes. {q-uspsp5-027,q-fmabc2021-047,q-sessp2022-069}
- 20 anos assintomática: só **sorologias**, sem citologia nem ultrassom. {q-uspsp3-011}
- Dispensa: **≥ 64 anos** com dois exames negativos recentes. {q-famema2023-045,q-unicamp2023-062}
- Histerectomia por mioma: **dispensa**. {q-fmabc2022-068}
- Histerectomia com NIC 3 prévia: **manter o rastreio**. {q-unifesp2025-067}
- Sem relação há 15 anos com exames normais: **sem coleta**. {q-einstein2023-062}
- Lésbica após o 1º exame: **anual** nos dois primeiros. {q-scmsp2025-096}
- HIV com CD4 alto: **citologia anual**. {q-usp2026-114}
- Homem trans com colo: **Papanicolau**. {q-famema2021-068,q-tp20232-114}
- Testosterona: mais **células basais**, pior acurácia. {q-usp2023-028}
- Ressecamento pela testosterona: **estrogênio tópico** antes e lubrificante à base de água. {q-usp2023-070}
- Coleta dupla: espéculo de **Collins**, espátula 360° na ectocérvice, escova no canal. {q-amrigs2021-052}
- Gestante com exame atrasado: **coletar no pré-natal**. {q-unicamp2022-056}` },
      ],
    },
    {
      id: "citologia", titulo: "Conduta na citologia alterada",
      introducao: `[[A citologia é uma triagem: alteração de baixo grau (ASC-US, LSIL) reflete quase sempre infecção transitória e regride, por isso se repete; alteração de alto grau (ASC-H, HSIL), glandular (AGC) ou suspeita de invasão vai direto à colposcopia.|q-023,q-adap24-033,q-tp20231-097,q-sirio2022-079]] No rastreio com DNA-HPV, a citologia passou a ser o passo seguinte ao teste positivo para outros tipos, mas as condutas abaixo seguem valendo para quem é rastreada por citologia.

[[Abaixo de 25 anos, ASC-US e LSIL repetem a citologia em 3 anos; de 25 a 29, ASC-US repete em 12 meses; a partir de 30, ASC-US e LSIL (esta a partir de 25) repetem em 6 meses; dois resultados alterados seguidos levam à colposcopia.|q-unifesp2024-048,q-usprp2021-061,q-fmabc2024-062,q-famerp2024-041,q-famerp2025-025,q-einstein2025-052]] [[A imunossuprimida vai à colposcopia com qualquer alteração.|q-usprp2022-055,q-unicampdis2022-047]]`,
      fragmentos: [
        { id: "cit-baixo", titulo: "ASC-US e LSIL", conferir: true, diretrizes: ["inca-2016"],
          questoes: ["q-scmsp2021-065","q-unifesp2024-048","q-scmsp2025-070","q-usprp2021-061","q-usprp2022-055","q-usprp2025-052","q-famema2021-056","q-famerp2023-046","q-famerp2024-041","q-famerp2025-025","q-sirio2022-079","q-fmabc2024-062","q-fmabc2021-042","q-einstein2024-058","q-einstein2023-052","q-einstein2025-052","q-unicampdis2022-047","q-unicampdis2023-043","q-sirio2025-083","q-usprp2024-004"],
          casos: ["q-usprp2024-004"],
          texto: `- LSIL aos 16–22 anos: **citologia em 3 anos**. {q-unifesp2024-048,q-usprp2021-061}
- ASC-US aos 22 anos: **3 anos**. {q-einstein2024-058}
- LSIL aos 23 com HPV negativo: **3 anos**. {q-scmsp2021-065}
- ASC-US aos 19: **nova coleta após os 25**. {q-fmabc2021-042}
- ASC-US aos 25–29: **12 meses**. {q-sirio2022-079,q-fmabc2024-062,q-usprp2025-052}
- ASC-US ≥ 30: **6 meses**. {q-famerp2024-041}
- LSIL ≥ 25: **6 meses**. {q-famema2021-056,q-famerp2023-046,q-famerp2025-025}
- Resultado da figura aos 45 anos: **6 meses**. {q-usprp2024-004}
- Segundo exame alterado: **colposcopia**. {q-einstein2023-052,q-einstein2025-052}
- ASC-US seguido de normal: próxima em **6 meses**, até dois normais. {q-unicampdis2023-043,q-sirio2025-083}
- HIV com LSIL ou ASC-US: **colposcopia**. {q-usprp2022-055,q-unicampdis2022-047}
- Adolescente vacinada com LSIL: banca, **12 meses**. {q-scmsp2025-070}` },
        { id: "cit-alto", titulo: "ASC-H, HSIL e células glandulares", conferir: true, diretrizes: ["inca-2016"],
          questoes: ["q-023","q-adap24-033","q-tp20202-086","q-tp20212-097","q-tp20222-096","q-tp20231-097","q-tp20241-094","q-famerp2026-022","q-usprp2023-039","q-unicamp2023-060","q-unicampdis2024-106","q-unesp2024-033","q-fmabc2025-067","q-adap21-061"],
          prosa: `[[Células glandulares atípicas podem vir do canal ou do endométrio: colposcopia com avaliação do canal e, a partir de 35 anos (ou com sangramento anormal), avaliação do endométrio.|q-unesp2024-033,q-fmabc2025-067,q-adap21-061,q-unicamp2023-060]] [[Vaginose ou tricomoníase junto do HSIL não atrasam a colposcopia: trata-se a infecção e se encaminha.|q-tp20212-097,q-tp20222-096]]`,
          texto: `- HSIL: **colposcopia com biópsia**. {q-023,q-adap24-033,q-tp20202-086,q-tp20241-094,q-famerp2026-022}
- ASC-H: **colposcopia**. {q-tp20231-097}
- HSIL com Gardnerella aos 57: **colposcopia**. {q-tp20212-097}
- HSIL com tricomonas: **tratar e colposcopia**. {q-tp20222-096}
- AGC: **colposcopia**. {q-usprp2023-039,q-unicamp2023-060,q-unicampdis2024-106}
- AGC ≥ 35 anos: colposcopia, **canal e endométrio**. {q-unesp2024-033,q-fmabc2025-067,q-adap21-061}` },
      ],
    },
    {
      id: "colposcopia", titulo: "Colposcopia e tratamento das lesões precursoras",
      introducao: `[[Na colposcopia, o ácido acético coagula proteínas das células com núcleo grande, que ficam brancas (acetobranco); o lugol cora de marrom o epitélio maduro rico em glicogênio, e a lesão fica clara (Schiller positivo, iodo negativo).|q-usp2024-106,q-uspsp2-035]] [[Acetobranco denso, mosaico e pontilhado grosseiros são de alto grau; vasos atípicos, superfície irregular, ulceração e cor diferente sugerem invasão.|q-amrigs2022-048,q-unifesp2023-060]]

[[A zona de transformação tipo 1 é toda visível na ectocérvice; a tipo 2 entra no canal mas se vê o limite; a tipo 3 não se vê inteira. O tipo define o tamanho da exérese (EZT tipos 1, 2 e 3).|q-unesp2022-034,q-unesp2024-035,q-adap26-053]] [[NIC 2 e 3 na mulher adulta se tratam por exérese da zona de transformação, que também dá o diagnóstico da peça; abaixo de 25 anos, NIC 2 e mesmo HSIL podem ser seguidos, porque regridem e a cirurgia aumenta prematuridade.|q-adap26-053,q-scmsp2022-045,q-famerp2022-037,q-famerp2025-028]]`,
      fragmentos: [
        { id: "col-exame", titulo: "Colposcopia e biópsia",
          questoes: ["q-usp2024-106","q-amrigs2022-048","q-uspsp2-035","q-uspsp3-061","q-simepm89-032","q-unifesp2023-060"],
          casos: ["q-usp2024-106","q-uspsp3-061"],
          texto: `- Branco no exame especular: **ácido acético**. {q-usp2024-106}
- Sugerem invasão: **vasos atípicos, superfície irregular, cor alterada**. {q-amrigs2022-048}
- Epitélio branco denso, iodo negativo: **biópsia dirigida**. {q-uspsp2-035,q-simepm89-032}
- HSIL com a imagem da figura: **biópsia**. {q-uspsp3-061}
- Gestante com vasos atípicos e ulceração: **biópsia dirigida**. {q-unifesp2023-060}` },
        { id: "col-tratamento", titulo: "Exérese da zona de transformação e situações especiais", conferir: true, diretrizes: ["inca-2016"],
          questoes: ["q-adap26-053","q-usp2025-009","q-scmsp2022-045","q-unesp2022-034","q-unesp2024-035","q-famerp2025-028","q-famerp2022-037","q-adap22-030","q-sessp2024-068","q-sirio2025-072"],
          casos: ["q-usp2025-009"],
          prosa: `[[Na gestante, o colo só se biopsia se houver suspeita de invasão; a NIC é seguida e tratada depois do parto, porque a progressão na gestação é rara.|q-adap22-030]] [[Adenocarcinoma in situ e lesões que entram no canal pedem conização, que tira um cone mais profundo.|q-sirio2025-072,q-sessp2024-068]] [[No "ver e tratar", com HSIL, zona tipo 1 ou 2 e achado maior sem suspeita de invasão, a exérese é feita na primeira colposcopia.|q-unesp2022-034]]`,
          texto: `- NIC 3 aos 31: **EZT tipo 1 ou 2** com análise da peça. {q-adap26-053}
- Procedimento para alto grau: **cirurgia de alta frequência** (exérese com alça). {q-usp2025-009}
- ZT tipo 2 com NIC 2: **CAF tipo 2**. {q-scmsp2022-045}
- HSIL com ZT tipo 1 visível: **ver e tratar**. {q-unesp2022-034}
- JEC não vista, ASC-H: **CAF**. {q-unesp2024-035}
- NIC 2 aos 19 anos: **seguimento semestral** por 2 anos. {q-famerp2022-037}
- NIC 3 aos 18 anos: **seguimento semestral** por 2 anos. {q-famerp2025-028}
- Gestante com NIC 3: **colposcopia por trimestre**, reavaliar após o parto. {q-adap22-030}
- Lesão endocervical sem invasão: **conização** com margens livres. {q-sessp2024-068}
- Adenocarcinoma in situ: **conização**. {q-sirio2025-072}` },
      ],
    },
    {
      id: "invasor", titulo: "Câncer invasor",
      introducao: `[[O câncer invasor se mostra por sangramento pós-coito e lesão vegetante ou ulcerada que sangra; o tipo mais comum é o carcinoma de células escamosas.|q-unicampdis2025-039,q-unesp2023-031,q-famerp2023-048]] [[A FIGO estadia pelo exame clínico, imagem e patologia: IA é microscópico (IA1 até 3 mm de invasão, IA2 de 3 a 5 mm); IB é maior, restrito ao colo (IB1 até 2 cm, IB2 até 4, IB3 acima); II passa do colo sem atingir a parede pélvica; IIIB pega a parede ou causa hidronefrose; IIIC são linfonodos; IV, bexiga, reto ou à distância.|q-adap25-081,q-einstein2022-061,q-unifesp2022-030]]

[[O tratamento segue o tamanho: até IA1 sem invasão linfovascular, a conização basta; tumores pequenos operam (histerectomia radical, ou traquelectomia radical em quem quer engravidar); do IB3 e localmente avançados em diante, quimiorradiação com cisplatina e braquiterapia, porque a cirurgia deixaria doença e somaria a radioterapia.|q-adap23-043,q-einstein2025-050,q-adap24-030,q-unifesp2025-081,q-unifesp2023-043,q-famerp2023-048]]`,
      fragmentos: [
        { id: "inv-diagnostico", titulo: "Diagnóstico, sangramento e estadiamento", conferir: true, diretrizes: ["figo-colo"],
          questoes: ["q-unesp2023-031","q-unesp2022-036","q-unicampdis2025-039","q-unicampdis2025-084","q-einstein2022-061","q-iamspe2025-044"],
          casos: ["q-unesp2023-031"],
          prosa: `[[Tumor que sangra muito se controla com tamponamento vaginal e estabilização.|q-unicampdis2025-084]] [[Lesão visível se biopsia; diagnóstico incerto entre micro e invasor se define por conização antes de operar, para não fazer cirurgia insuficiente.|q-unicampdis2025-039,q-iamspe2025-044,q-unesp2022-036]] [[Os linfonodos se avaliam por PET-CT.|q-einstein2022-061]]`,
          texto: `- Lesão sangrante no colo: **biópsia**. {q-unicampdis2025-039,q-unesp2022-036}
- Hemorragia pelo tumor: **tamponamento vaginal**. {q-unicampdis2025-084}
- Peça da figura: **câncer avançado**. {q-unesp2023-031}
- Linfonodos no IB1: **PET-CT**. {q-einstein2022-061}
- Histerectomia simples achou invasão > 5 mm: devia ter feito **conização** antes. {q-iamspe2025-044}` },
        { id: "inv-tratamento", titulo: "Tratamento por estádio", conferir: true, diretrizes: ["figo-colo"],
          questoes: ["q-adap24-030","q-adap25-081","q-adap23-043","q-unifesp2025-081","q-einstein2025-050","q-famerp2023-048","q-unifesp2022-030","q-unifesp2023-043"],
          prosa: `[[Hidronefrose bilateral com uremia é IIIB: desobstrui-se o rim (duplo J ou nefrostomia) para poder dar quimiorradiação.|q-unifesp2022-030,q-unifesp2023-043]]`,
          texto: `- IA1 sem invasão linfovascular, margens livres: **seguimento** (conização basta). {q-adap23-043,q-einstein2025-050}
- IB1 querendo gestar: **traquelectomia**. {q-adap24-030}
- IA2 com êmbolos linfáticos, quer gestar: **traquelectomia radical** e linfadenectomia. {q-unifesp2025-081}
- Localmente avançado: **radioterapia + cisplatina** e braquiterapia. {q-adap25-081,q-famerp2023-048}
- Hidronefrose e uremia: **duplo J/nefrostomia**, depois radio e quimio. {q-unifesp2022-030}
- Sem tratamento ainda, com hidronefrose: **radioterapia com quimio**. {q-unifesp2023-043}` },
      ],
    },
    {
      id: "vulva", titulo: "Vulva: líquen escleroso, lesões precursoras e câncer",
      introducao: `[[O câncer de vulva tem dois caminhos. Na **mulher idosa**, nasce do **líquen escleroso** (inflamação crônica que deixa a pele **branca, fina, "papel de seda"**, com **prurido** de anos e apagamento dos pequenos lábios) passando pela **NIV diferenciada**, sem HPV. Na **mulher mais jovem**, vem do **HPV** (lesão intraepitelial de alto grau, **multicêntrica e recidivante**, com **tabagismo** e imunossupressão como fatores). Nos dois, a regra é **biopsiar** a lesão que coça e não melhora: muitas são tratadas meses como "micose".|q-didepm-088,q-unicamp2023-064,q-unicampdis2024-043,q-fmabc2025-062,q-unifesp2026-045]]`,
      fragmentos: [
        { id: "vul-conduta", titulo: "Biópsia, líquen e tratamento do câncer", conferir: true,
          questoes: ["q-didepm-088","q-unicamp2023-064","q-unicampdis2024-043","q-fmabc2025-062","q-usprp2023-032","q-scmsp2022-044","q-adap26-045","q-unifesp2026-045"],
          prosa: `[[**Líquen escleroso**: **clobetasol 0,05%** (corticoide potente) e seguimento, biopsiando área suspeita. Lesão branca, ulcerada ou elevada na idosa: **biópsia** (incisional, da borda). Lesão intraepitelial: **excisão com margens**.|q-didepm-088,q-unicamp2023-064,q-fmabc2025-062,q-usprp2023-032,q-scmsp2022-044]] [[Carcinoma espinocelular invasor: **excisão local radical com margem de 1 cm**. Com invasão de **até 1 mm** (estádio IA), **sem avaliação linfonodal**; mais profundo, avaliar a virilha — **linfonodo sentinela** se a lesão tem menos de 4 cm e é unifocal, ou esvaziamento.|q-adap26-045,q-unifesp2026-045]]`,
          texto: `- Prurido crônico, pele branca fina: **líquen escleroso** → clobetasol. {q-didepm-088,q-unicamp2023-064}
- Lesão vulvar na idosa: **biópsia**. {q-fmabc2025-062,q-usprp2023-032}
- Lesão de alto grau multicêntrica: **HPV**; tratar com **excisão**. {q-unicampdis2024-043,q-scmsp2022-044}
- Invasão ≤ 1 mm: **excisão radical sem linfonodo**; maior: **sentinela**. {q-adap26-045,q-unifesp2026-045}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-scmsp2025-070","q-famerp2023-046","q-usp2026-114"],
          texto: `- Abaixo de 25 anos, LSIL repete em **3 anos**; a banca, com adolescente vacinada, deu **12 meses**. {q-scmsp2025-070}
- NIC é diagnóstico **histológico**; a prova chamou a citologia de "NIC-I" e cobrou a regra do LSIL (**6 meses**). {q-famerp2023-046}
- As provas anteriores a 2025 cobram a citologia; no rastreio com DNA-HPV a pergunta muda para o **teste e seu genótipo**. Na imunossuprimida, a prova manteve a **citologia anual**. {q-usp2026-114}` },
      ],
    },
  ],
});
