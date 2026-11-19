/* resumos/ist/resumo.js — resumo adaptativo de infecções sexualmente transmissíveis: abordagem
   sindrômica e prevenção, sífilis (estágios, testes, tratamento, gestante, seguimento), úlceras
   genitais, uretrites e cervicites, gonococcemia, doença inflamatória pélvica, corrimentos vaginais,
   HPV e tabela comparativa no fim. Molde e regras: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- ist */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "ist",
  titulo: "Infecções sexualmente transmissíveis",
  assunto: "ass-ist",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "pcdt-ist", texto: "Ministério da Saúde — Protocolo Clínico e Diretrizes Terapêuticas para Atenção Integral às Pessoas com Infecções Sexualmente Transmissíveis (PCDT-IST), 2022", lidoEm: "2026-11-19" },
    { id: "pcdt-tv", texto: "Ministério da Saúde — PCDT para Prevenção da Transmissão Vertical de HIV, Sífilis e Hepatites Virais, 2022", lidoEm: null },
    { id: "cdc-ist", texto: "CDC — Sexually Transmitted Infections Treatment Guidelines, 2021 (MMWR 2021;70(RR-4))", lidoEm: null },
    { id: "acog-herpes", texto: "ACOG — Management of Genital Herpes in Pregnancy (Practice Bulletin 220, 2020)", lidoEm: null },
    { id: "calendario-vacinal", texto: "Ministério da Saúde — Calendário Nacional de Vacinação (HPV), Instrução Normativa 2026", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anuladas; as reposições (-ia) entram no resumo", questoes: ["q-scmsp2021-012","q-scmsp2023-086","q-amrigs2020-053"] },
    { motivo: "desatualizada (ciprofloxacino na gonorreia); a reposição entra no resumo", questoes: ["q-sirio2021-065"] },
    { motivo: "toxoplasmose na gestação, tema de infecções congênitas", questoes: ["q-tp20232-091"] },
    { motivo: "anatomia da vulva, sem IST", questoes: ["q-amrigs2024-047"] },
  ],
  doencas: [
    {
      id: "abordagem", titulo: "Abordagem das IST e prevenção",
      introducao: `[[As IST se transmitem pelo contato de mucosas e se agrupam em poucas síndromes — úlcera genital, corrimento uretral, corrimento vaginal e cervicite, dor pélvica e verrugas —, e por isso o Ministério da Saúde organiza o atendimento por fluxogramas: a pessoa sai da primeira consulta tratada, sem esperar exame.|q-unifesp2023-031,q-sirio2026-095]] [[Uma IST aumenta o risco de outra: a úlcera e a inflamação abrem porta ao HIV, e a mesma exposição pode ter trazido várias infecções; por isso toda pessoa com IST recebe testes rápidos para HIV, sífilis e hepatites B e C.|q-sirio2022-073,q-sirio2026-095]]

[[O rastreio não espera sintoma: sífilis, HIV e hepatites se testam periodicamente em quem tem vida sexual ativa e risco, e a vacina contra o HPV protege mais quando dada antes do início da vida sexual.|q-sirio2023-074,q-famerp2026-024]]

Veja também: **Infecções congênitas** (o recém-nascido de mãe com sífilis, completo lá) e **Maus-tratos** (violência sexual na criança).`,
      fragmentos: [
        { id: "abo-sindromes", titulo: "Abordagem sindrômica e o que oferecer na consulta", diretrizes: ["pcdt-ist"],
          questoes: ["q-unifesp2023-031","q-sirio2026-095","q-sirio2022-073","q-sirio2023-074"],
          texto: `- Úlcera, corrimento e verruga anogenital: **consulta imediata**, não agendada. {q-unifesp2023-031}
- Corrimento uretral: **tratamento sindrômico na hora**, testagem para HIV, sífilis e hepatites, prevenção e convocação das parcerias. {q-sirio2026-095}
- Infecção urinária **não** é IST. {q-sirio2022-073}
- Teste para sífilis: **anual em jovens até 30 anos** com vida sexual ativa (e mais vezes em quem tem maior risco). {q-sirio2023-074}` },
      ],
    },
    {
      id: "sifilis", titulo: "Sífilis",
      introducao: `[[O *Treponema pallidum* entra pela mucosa, multiplica-se no local (cancro duro, indolor, de bordas endurecidas e fundo limpo, com linfonodo inguinal indolor) e em poucas semanas se espalha pelo sangue.|q-inf-20,q-iamspe2021-012,q-unicamp2022-060,q-tp20222-027]] [[A disseminação produz a sífilis secundária, semanas a meses depois: exantema não pruriginoso que pega palmas e plantas, lesões mucosas, condiloma plano, febre e linfonodos generalizados — a fase de maior título de VDRL e maior transmissão.|q-tp20202-028,q-tp20231-004,q-tp20241-110,q-scmsp2025-098,q-usp2025-120,q-amrigs2023-088]] Depois vem a fase latente, sem sinais (recente até 1 ano de infecção; tardia depois disso), e, em parte dos não tratados, a terciária (gomas, aortite, neurossífilis).

[[O diagnóstico usa dois tipos de teste: o treponêmico (teste rápido, FTA-Abs, ELISA, quimioluminescência) detecta anticorpo contra o treponema e fica positivo para sempre; o não treponêmico (VDRL, RPR) detecta anticorpo contra cardiolipina, tem título que acompanha a atividade da doença e serve para seguir o tratamento.|q-scmsp2021-011,q-amrigs2022-013,q-fmabc2023-014,q-sirio2022-076]] [[A penicilina benzatina é o tratamento de escolha porque o treponema se divide devagar e só é morto com nível sanguíneo prolongado de penicilina: uma dose na sífilis recente, três doses semanais na tardia ou de duração ignorada.|q-famema2023-037,q-tp20212-114,q-einstein2023-012]]`,
      fragmentos: [
        { id: "sif-clinica", titulo: "Estágios e quadro clínico", conferir: true,
          casos: ["q-unicamp2022-060"],
          questoes: ["q-inf-20","q-iamspe2021-012","q-unicamp2022-060","q-tp20222-027","q-einstein2022-004","q-fmabc2025-072","q-amrigs2020-053-ia","q-tp20202-028","q-tp20231-004","q-tp20241-110","q-scmsp2025-098","q-usp2025-120","q-sirio2025-017","q-scmsp2025-014","q-amrigs2023-088"],
          prosa: `[[Na prova, a úlcera única, indolor, de base endurecida e fundo limpo é sífilis primária até prova em contrário, e se trata na mesma consulta com penicilina benzatina em dose única, sem esperar o VDRL, que só fica positivo cerca de duas semanas depois do cancro.|q-tp20222-027,q-einstein2022-004,q-fmabc2025-072,q-amrigs2023-088]] O cancro duro é da sífilis **primária** — a alternativa que o chama de lesão secundária está errada.`,
          texto: `- Cancro duro: úlcera **única, indolor, base endurecida, fundo limpo**, linfonodo inguinal **indolor**; campo escuro mostra **espiroquetas**. {q-inf-20,q-iamspe2021-012,q-unicamp2022-060}
- Úlcera indolor de fundo limpo (mesmo no paciente que veio por corrimento): **penicilina benzatina 2,4 milhões UI dose única** já. {q-tp20222-027,q-einstein2022-004,q-fmabc2025-072}
- Cancro duro é da sífilis **primária**, não da secundária. {q-amrigs2020-053-ia}
- VDRL positiva **cerca de 2 semanas após o cancro** e tem o **maior título na secundária**. {q-amrigs2023-088}
- Secundária: **exantema não pruriginoso com palmas e plantas**, lesões mucosas, febre, linfonodos generalizados. {q-tp20202-028,q-tp20231-004,q-tp20241-110,q-scmsp2025-098}
- Secundária é **muito transmissível** (inclusive por sexo oral). {q-usp2025-120}
- Confirmação na secundária: **teste rápido e VDRL reagentes**. {q-sirio2025-017}
- Exantema com palmas e plantas semanas após uretrite tratada: **sífilis secundária**, benzatina dose única. {q-scmsp2025-014}` },
        { id: "sif-testes", titulo: "Testes treponêmicos e não treponêmicos", diretrizes: ["pcdt-ist"],
          figuras: [{ arquivo: "figuras/testes-sifilis.svg", legenda: "Esquema autoral: como ler a combinação de teste treponêmico e não treponêmico." }],
          questoes: ["q-scmsp2021-011","q-amrigs2022-013","q-fmabc2023-014","q-sirio2022-076","q-unesp2025-100","q-usprp2025-042","q-sirio2025-061","q-unicampdis2024-039","q-unesp2021-022","q-famema2021-021","q-scmsp2022-055"],
          prosa: `[[Teste treponêmico positivo com não treponêmico negativo é discordância: pode ser sífilis muito recente, sífilis tratada (cicatriz) ou latente antiga com VDRL negativado, e se resolve com um novo teste treponêmico de método diferente (o terceiro teste do fluxograma).|q-usprp2025-042,q-sirio2025-061,q-unicampdis2024-039]] [[Não treponêmico positivo com treponêmico negativo também é discordância: o PCDT pede um terceiro teste treponêmico de outro método; reagente, é sífilis ou cicatriz sorológica; não reagente, o primeiro era falso-reagente (gestação, doença autoimune, outras infecções).|q-scmsp2022-055,q-sirio2022-076]] Os dois negativos afastam sífilis, salvo exposição de poucas semanas (janela), quando se repete o teste. **Cicatriz sorológica**, pelo PCDT, é a persistência de teste reagente (treponêmico, ou não treponêmico em título baixo) depois de tratamento adequado documentado, com queda de pelo menos duas diluições.`,
          texto: `- Teste rápido é **treponêmico** (a afirmativa que o chama de não treponêmico é a incorreta). {q-scmsp2021-011}
- VDRL em título baixo **não confirma** sozinho; treponêmico **não serve para seguimento**. {q-amrigs2022-013}
- Sífilis latente: diagnóstico **só por testes imunológicos**. {q-fmabc2023-014}
- Teste rápido positivo sem lesão: pode ser **latente ou já tratada**; confirmar com VDRL. {q-unesp2025-100,q-famema2021-021}
- Treponêmico + e VDRL −: **outro treponêmico** de método diferente; sem tratamento prévio, na gestante, **tratar como duração ignorada**. {q-usprp2025-042,q-sirio2025-061,q-unicampdis2024-039}
- Parceiro com VDRL + e treponêmico +: **sífilis presumida**, tratar. {q-unesp2021-022}
- VDRL + em gestante com lúpus: **teste treponêmico** antes de tratar; testar o parceiro. {q-scmsp2022-055}` },
        { id: "sif-tratamento", titulo: "Tratamento por estágio e reação de Jarisch-Herxheimer", diretrizes: ["pcdt-ist"],
          questoes: ["q-famema2023-037","q-tp20212-114","q-einstein2023-012","q-unifesp2022-036","q-usprp2026-036","q-famerp2023-019","q-unesp2025-029","q-scmsp2021-012-ia","q-scmsp2023-086-ia","q-sirio2025-018","q-iamspe2022-057"],
          prosa: `| Estágio | Penicilina benzatina | Seguimento |
|---|---|---|
| Recente (primária, secundária, latente < 1 ano) | **2,4 milhões UI IM, dose única** | VDRL trimestral |
| Tardia (latente > 1 ano, duração ignorada, terciária) | **2,4 milhões UI IM semanal × 3 (7,2 milhões)** | VDRL trimestral |
| Neurossífilis | **cristalina 18–24 milhões UI/dia IV por 10–14 dias** | líquor a cada 6 meses |

[[Sem saber quando a infecção começou, trata-se como tardia: três doses.|q-unifesp2022-036,q-usprp2026-036,q-einstein2023-012,q-scmsp2023-086-ia]] [[Horas depois da primeira dose pode vir a reação de Jarisch-Herxheimer — febre, mal-estar e piora das lesões pela liberação de antígenos dos treponemas mortos —, que se trata com sintomático e não é alergia à penicilina; na gestante pode desencadear contrações.|q-sirio2025-018,q-iamspe2022-057]]`,
          texto: `- Primária: **dose única** de benzatina; seguimento com **não treponêmico**. {q-famema2023-037}
- Assintomático com VDRL + e TR + e duração ignorada: **7,2 milhões UI** (3 doses semanais). {q-tp20212-114,q-unifesp2022-036,q-usprp2026-036,q-einstein2023-012,q-scmsp2023-086-ia}
- Lesões de secundária no passado e sem tratamento, hoje sem lesão: **latente de duração ignorada**, 7,2 milhões. {q-unesp2025-029}
- Neurossífilis: **penicilina cristalina**; doxiciclina só como alternativa fora da gestação. {q-scmsp2021-012-ia}
- Febre e piora das lesões **horas após** a benzatina: **Jarisch-Herxheimer**, tratar com **antitérmico** (dipirona). {q-sirio2025-018}
- Na gestante, Jarisch-Herxheimer pode dar **contrações e sofrimento fetal**. {q-iamspe2022-057}` },
        { id: "sif-gestante", titulo: "Sífilis na gestação", conferir: true, diretrizes: ["pcdt-tv"],
          questoes: ["q-sirio2023-086","q-sirio2025-100","q-einstein2024-064","q-famema2021-064","q-scmsp2026-072","q-uspsp2-047","q-uspsp5-044","q-tp20202-100","q-fmabc2025-072","q-unicampdis2025-085","q-sirio2026-072","q-usprp2024-095","q-simepm89-024","q-adap24-041","q-tp20252-097","q-unifesp2024-060","q-tp20222-090","q-usp2023-110","q-einstein2025-054"],
          prosa: `[[Na gestante, o teste rápido reagente já autoriza a primeira dose de penicilina na mesma consulta, sem esperar o VDRL, porque cada semana de atraso aumenta o risco de sífilis congênita.|q-sirio2023-086,q-sirio2025-100,q-famema2021-064]] [[Só a penicilina atravessa a placenta e trata o feto: a gestante alérgica é dessensibilizada, nunca tratada com outra droga.|q-sirio2026-072,q-unicampdis2025-085]] [[O intervalo entre as doses semanais não pode passar de 7 dias na gestação (fora dela, tolera-se até 14); dose perdida significa reiniciar o esquema.|q-usprp2024-095,q-simepm89-024]]

[[Gestante tratada de forma adequada antes, com VDRL baixo e estável, não precisa de novo tratamento; mas subida de duas diluições, ou nova exposição sem proteção, é reinfecção e se trata de novo.|q-unifesp2024-060,q-tp20252-097,q-adap24-041,q-tp20222-090,q-usp2023-110,q-einstein2025-054]] A parceria sexual é testada e tratada, mas a adequação do tratamento da gestante **não depende** mais do tratamento do parceiro (PCDT 2022).`,
          texto: `- Teste rápido + na gestante: **1ª dose de benzatina na hora** e convocar parcerias. {q-sirio2023-086,q-sirio2025-100,q-einstein2024-064,q-famema2021-064}
- Assintomática, duração ignorada: **7,2 milhões UI** (3 doses semanais). {q-scmsp2026-072,q-uspsp2-047,q-uspsp5-044,q-einstein2024-064}
- Gestante com cancro duro (sífilis primária): **dose única**. {q-fmabc2025-072}
- Sorologia negativa no 1º trimestre e positiva agora: **recente**, dose única. {q-tp20202-100,q-unicampdis2025-085}
- Alergia à penicilina: **dessensibilização**. {q-sirio2026-072,q-unicampdis2025-085}
- Intervalo > 7 dias entre doses: **reiniciar** as 3 doses. {q-usprp2024-095,q-simepm89-024}` },
        { id: "sif-gestante-retrat", titulo: "Gestante j\u00e1 tratada: seguimento e retratamento", conferir: true, diretrizes: ["pcdt-tv"],
          questoes: ["q-tp20231-112", "q-uspsp1-098", "q-usprp2021-050", "q-unifesp2024-060", "q-tp20222-090", "q-usp2023-110", "q-einstein2025-054"],
          prosa: `Na gestante com sífilis no passado, a pergunta é se o tratamento foi documentado e adequado e se o título caiu. Tratamento sem registro conta como não feito; título baixo e estável após tratamento adequado é cicatriz e só se acompanha; título que sobe ou exposição nova é reinfecção e se retrata. A parceria é testada e tratada, mas não define mais se o tratamento da gestante foi adequado.`,
          texto: `- Sífilis prévia sem tratamento documentado, VDRL 1:2: **tratar** (7,2 milhões) e seguir com **VDRL mensal**. {q-tp20231-112}
- Tratada com 7,2 milhões: **adequada independentemente do parceiro**. {q-uspsp1-098}
- Parceiro de gestante com sífilis, mesmo com sorologia negativa: **dose única presuntiva**. {q-usprp2021-050}
- Tratada adequadamente há 6 meses com VDRL 1:2: **só pedir VDRL** (seguimento). {q-unifesp2024-060}
- VDRL que **sobe duas diluições** ou novos parceiros: **retratar**; o parceiro atual recebe dose. {q-tp20222-090,q-usp2023-110,q-einstein2025-054}` },
        { id: "sif-seguimento", titulo: "Seguimento, falha e neurossífilis", conferir: true, diretrizes: ["pcdt-ist","pcdt-tv"],
          questoes: ["q-inf-21","q-uspsp2-033","q-unicampdis2025-006","q-scmsp2022-088","q-uspsp4-096","q-uspsp1-070","q-unicamp2023-015","q-unicampdis2024-068","q-uspsp5-005"],
          prosa: `[[Resposta adequada fora da gestação é a queda de pelo menos duas diluições (quatro vezes) do VDRL em até 6 meses na sífilis recente e em até 12 meses na tardia; depois o título pode estabilizar baixo (cicatriz sorológica).|q-inf-21,q-uspsp2-033,q-unicampdis2025-006]] [[Subida de duas diluições, ou ausência de queda no prazo, é falha ou reinfecção: retrata-se e, na falha sem nova exposição (sobretudo com HIV), investiga-se neurossífilis com líquor.|q-uspsp1-070,q-unicamp2023-015,q-unicampdis2024-068]] [[Sintoma ocular (uveíte) ou auditivo na sífilis é neurossífilis para fins de tratamento: penicilina cristalina venosa.|q-uspsp5-005]]

**Por que as provas divergem.** O PCDT de IST (2022) registra o critério tradicional (queda de duas diluições em até 3 meses e de quatro em até 6) e adota o atual (duas diluições em até 6 meses na sífilis recente e em até 12 na tardia). Uma banca aplicou o atual e achou adequada a queda de uma diluição em 3 meses; outra, na gestante, aplicou o tradicional e a achou inadequada.`,
          texto: `- Resposta adequada: **queda de 2 diluições** em **6 meses (recente) ou 12 meses (tardia)**. {q-inf-21,q-uspsp2-033}
- VDRL 1:128 → 1:8 em um ano, sem nova exposição: **cicatriz sorológica**, sem retratar. {q-unicampdis2025-006}
- Título que **sobe** após tratamento adequado: **reinfecção**, retratar. {q-uspsp1-070}
- Sobe após tratamento e sem nova exposição: **reativação/falha**, retratar e **colher líquor**. {q-unicamp2023-015}
- HIV com queda de só uma diluição em 8 meses: **líquor** e retratamento conforme o resultado. {q-unicampdis2024-068}
- Uveíte com VDRL 1:64: **punção lombar** e **penicilina cristalina 4 milhões UI 4/4 h por 10–14 dias**, qualquer que seja o líquor. {q-uspsp5-005}` },
        { id: "sif-congenita", titulo: "A criança exposta e a sífilis congênita", conferir: true, diretrizes: ["pcdt-tv"],
          questoes: ["q-adap23-070","q-unifesp2022-056","q-unifesp2023-070"],
          prosa: `[[O recém-nascido de mãe não tratada, assintomático e com exames normais, recebe penicilina benzatina em dose única e seguimento; o filho de mãe adequadamente tratada, com exames normais, é só criança exposta, seguida com VDRL até 18 meses.|q-adap23-070,q-unifesp2022-056]] [[As manifestações tardias da sífilis congênita (depois dos 2 anos) são as de cicatriz da inflamação crônica: surdez, ceratite intersticial, dentes de Hutchinson, tíbia em sabre.|q-unifesp2023-070]] O detalhe de cada cenário está no resumo de infecções congênitas.`,
          texto: `- Mãe não tratada, RN assintomático com líquor, raio X e VDRL normais: **benzatina 50.000 UI/kg dose única** e seguimento. {q-adap23-070}
- Mãe tratada, RN com exames normais: **criança exposta**, VDRL com **1, 3, 6, 12 e 18 meses**. {q-unifesp2022-056}
- Manifestação tardia da congênita: **surdez** (VIII par). {q-unifesp2023-070}` },
      ],
    },
    {
      id: "ulceras", titulo: "Úlceras genitais",
      introducao: `[[As úlceras genitais transmissíveis se distinguem pela dor, pelo número e pelo fundo: o herpes dá vesículas agrupadas que viram úlceras rasas e dolorosas; o cancro mole (*Haemophilus ducreyi*) dá úlceras múltiplas, dolorosas, de fundo purulento e bordas irregulares, com bubão que pode fistulizar; a sífilis dá úlcera única e indolor.|q-scmsp2021-013,q-scmsp2026-079,q-uspsp2-031,q-uspsp4-035,q-famema2023-050]] [[O linfogranuloma venéreo (*Chlamydia trachomatis* L1–L3) começa com pápula fugaz e chama atenção pelo bubão inguinal; a donovanose (*Klebsiella granulomatis*) é a úlcera crônica, indolor, vermelho-carne, que sangra fácil.|q-sessp2022-063,q-uspsp4-077]]

[[O herpes nunca se cura: o vírus fica latente nos gânglios sensitivos sacrais e reativa, mais no HSV-2; por isso o primeiro episódio é o mais intenso e as recidivas são mais curtas.|q-sessp2025-070,q-unicampdis2023-038]] [[Como o exame clínico erra, o Ministério da Saúde trata a úlcera sem vesículas na mesma consulta como sífilis e cancro mole, e a que dura mais de 4 semanas também como donovanose e linfogranuloma.|q-famema2025-054,q-usprp2021-065,q-usp2022-028]]`,
      fragmentos: [
        { id: "ulc-herpes", titulo: "Herpes genital, inclusive na gestação", conferir: true, diretrizes: ["pcdt-ist","acog-herpes"],
          casos: ["q-unesp2025-071","q-usprp2023-021"],
          questoes: ["q-scmsp2021-013","q-sessp2025-070","q-unicampdis2023-038","q-unesp2025-071","q-uspsp1-075","q-adap21-050","q-usprp2023-021","q-einstein2026-072","q-adap22-036","q-famerp2026-031","q-iamspe2021-058"],
          prosa: `[[Na gestante, o risco para o recém-nascido vem sobretudo da primoinfecção no fim da gestação, quando a mãe ainda não passou anticorpos ao feto; aciclovir supressivo a partir de 36 semanas reduz lesões no parto, e a cesárea só se indica com lesão ativa ou pródromos na hora do parto.|q-adap22-036,q-famerp2026-031,q-iamspe2021-058]]`,
          texto: `- Vesículas agrupadas → **úlceras rasas e dolorosas**, febre e mal-estar no primeiro episódio: **herpes**. {q-unesp2025-071,q-uspsp1-075,q-unicampdis2023-038}
- Diferencial do herpes: **cancroide, sífilis, LGV, donovanose**. {q-scmsp2021-013}
- **Recorrente e incurável**; recidivas mais comuns com **HSV-2**. {q-sessp2025-070}
- Tratamento: **aciclovir 400 mg VO 8/8 h por 7–10 dias** (primeiro episódio); confirmação por **PCR da lesão**. {q-adap21-050,q-uspsp1-075}
- Gestante com lesões herpéticas: **aciclovir oral** (400 mg 8/8 h); testar sífilis. {q-usprp2023-021,q-einstein2026-072}
- Supressão na gestação: **aciclovir a partir de 36 semanas** até o parto. {q-adap22-036,q-famerp2026-031}` },
        { id: "ulc-bacterianas", titulo: "Cancro mole, linfogranuloma e donovanose", conferir: true, diretrizes: ["pcdt-ist"],
          casos: ["q-uspsp2-031"],
          questoes: ["q-scmsp2026-079","q-uspsp2-031","q-uspsp4-035","q-scmsp2025-068","q-sessp2022-063","q-uspsp4-077"],
          texto: `- Úlceras **múltiplas, dolorosas, fundo purulento, bordas irregulares**, bubão doloroso: ***Haemophilus ducreyi*** (cancro mole). {q-scmsp2026-079,q-uspsp2-031,q-uspsp4-035}
- Úlceras dolorosas com linfonodos inflamados: tratar com **azitromicina + penicilina benzatina** (cancroide e sífilis). {q-scmsp2025-068}
- LGV: **azitromicina** é um dos tratamentos (doxiciclina por 21 dias é o de escolha). {q-sessp2022-063}
- Úlcera indolor há **4 semanas**: **donovanose**, azitromicina 1 g semanal até cicatrizar (mínimo 3 semanas). {q-uspsp4-077}` },
        { id: "ulc-fluxograma", titulo: "Fluxograma da úlcera genital e outras lesões", conferir: true, diretrizes: ["pcdt-ist"],
          figuras: [{ arquivo: "figuras/fluxograma-ulcera.svg", legenda: "Esquema autoral: tratamento sindrômico da úlcera genital pelo Ministério da Saúde." }],
          questoes: ["q-famema2025-054","q-usprp2021-065","q-usp2022-028","q-famema2023-050","q-famema2021-021","q-scmsp2022-017","q-usprp2025-072","q-amrigs2023-046"],
          texto: `- Sem vesícula e **< 4 semanas**: tratar **sífilis e cancro mole** (benzatina + azitromicina). {q-famema2025-054,q-usp2022-028}
- Úlcera genital: **sífilis, donovanose, herpes** (e cancro mole); diferencial com LGV. {q-famema2023-050,q-famema2021-021}
- Úlcera e secreção anal no HSH: **sífilis, herpes, cancroide e donovanose**. {q-scmsp2022-017}
- Trabalhador do sexo com úlcera: tratar na hora, **PrEP** e **vacinas de hepatite A e B** (PEP só até 72 h). {q-usp2022-028}
- Lesões umbilicadas que evoluem em fases, com linfonodos e pródromo: **mpox**. {q-usprp2025-072}
- Pápula rósea, **umbilicada**, indolor: **molusco contagioso**. {q-amrigs2023-046}` },
      ],
    },
    {
      id: "uretrite", titulo: "Uretrites, cervicites e gonococcemia",
      introducao: `[[A *Neisseria gonorrhoeae* e a *Chlamydia trachomatis* infectam o epitélio colunar da uretra e do colo: no homem dão corrimento uretral (o gonococo, purulento e abrupto; a clamídia, mucoide e discreto) e na mulher, cervicite, muitas vezes sem sintoma — colo friável, sangramento ao coito, muco purulento.|q-adap22-056,q-sirio2023-070,q-einstein2022-049,q-fmabc2026-078]] [[Como as duas andam juntas e a clamídia é difícil de cultivar, o tratamento sem exame cobre ambas: ceftriaxona intramuscular para o gonococo e um segundo antibiótico para a clamídia.|q-tp20251-009,q-fmabc2026-002,q-einstein2022-003,q-sirio2024-077]]

[[O gonococo pode cair no sangue (gonococcemia disseminada), sobretudo em mulheres durante a menstruação e na gestação, e dá a tríade de tenossinovite, lesões pustulosas na pele e poliartralgia migratória, ou artrite séptica de um joelho.|q-scmsp2026-002,q-famema2021-025,q-tp20252-041]]`,
      fragmentos: [
        { id: "ure-tratamento", titulo: "Tratamento da uretrite e da cervicite", conferir: true, diretrizes: ["pcdt-ist","cdc-ist"],
          casos: ["q-unesp2021-035"],
          questoes: ["q-adap22-056","q-usp2026-110","q-iamspe2025-013","q-tp20251-009","q-sirio2026-095","q-uspsp5-088","q-fmabc2026-002","q-einstein2022-003","q-sirio2021-065-ia","q-unesp2021-035","q-unesp2022-038","q-simepm89-036","q-sirio2023-070","q-sirio2024-077","q-fmabc2025-065","q-fmabc2026-078","q-einstein2022-049"],
          prosa: `[[A ciprofloxacina saiu do tratamento do gonococo pela resistência; o esquema do protocolo brasileiro de 2022 é ceftriaxona 500 mg IM com azitromicina 1 g VO, ambas em dose única, e o tratamento da parceria.|q-adap22-056,q-usp2026-110,q-sirio2021-065-ia]] Na uretrite sem agente definido, o próprio PCDT dá como segunda opção a doxiciclina 100 mg 12/12 h por 7 dias no lugar da azitromicina; é o esquema preferido do CDC (2021), porque cura melhor a clamídia.`,
          texto: `- Diplococos **Gram-negativos intracelulares**: gonococo. {q-adap22-056,q-sirio2021-065-ia}
- Uretrite ou cervicite sem exame: **ceftriaxona 500 mg IM + azitromicina 1 g VO**, dose única, e tratar a parceria. {q-adap22-056,q-usp2026-110,q-tp20251-009,q-fmabc2026-002,q-einstein2022-003,q-sirio2024-077,q-fmabc2025-065,q-einstein2022-049,q-sirio2021-065-ia}
- Diagnóstico do gonococo e da clamídia: **PCR (NAAT)**; tratamento com **ceftriaxona**. {q-iamspe2025-013}
- Tratamento sindrômico imediato e oferta de testes e prevenção. {q-sirio2026-095}
- Colo **friável, muco purulento, sangramento ao coito**: cervicite; tratar. {q-unesp2021-035,q-sirio2023-070,q-fmabc2026-078}
- Clamídia na citologia de assintomática: **tratar** mesmo sem sintoma. {q-unesp2022-038}` },
        { id: "ure-disseminada", titulo: "Gonococcemia disseminada e artrite gonocócica", conferir: true,
          casos: ["q-usp2024-049"],
          questoes: ["q-scmsp2026-002","q-famema2021-025","q-tp20252-041","q-tp20212-005","q-tp20231-099","q-usp2024-049"],
          texto: `- Fatores de risco: **gestação e menstruação** (e deficiência de complemento). {q-scmsp2026-002}
- Artrite, **pústulas** no tronco e extremidades, febre: **gonocócica**. {q-famema2021-025}
- Artralgia migratória que vira artrite de joelho: pedir **cultura para gonococo** (meio Thayer-Martin). {q-tp20252-041}
- Diplococos Gram-negativos no líquido articular após cervicite: ***N. gonorrhoeae***. {q-tp20212-005,q-tp20231-099}
- Artrite séptica sem Gram ainda: **ceftriaxona + cobertura de estafilococo** até a cultura. {q-usp2024-049}` },
      ],
    },
    {
      id: "dip", titulo: "Doença inflamatória pélvica",
      introducao: `[[A doença inflamatória pélvica é a infecção que sobe do colo para endométrio, tubas e peritônio, quase sempre a partir de gonococo, clamídia e da flora da vaginose (anaeróbios); por isso o tratamento cobre os três grupos.|q-scmsp2023-067,q-tp20251-093,q-famema2025-053,q-didepm-013]] [[O diagnóstico é clínico: dor pélvica com dor à mobilização do colo e dor anexial são os critérios maiores; febre, corrimento, leucocitose e PCR elevada reforçam.|q-scmsp2021-063,q-tp20251-093,q-famema2025-053]]

[[A inflamação pode formar abscesso tubo-ovariano, e a peri-hepatite (Fitz-Hugh-Curtis) dá dor no hipocôndrio direito que imita colecistite; a sequela é a obstrução tubária, com infertilidade, gravidez ectópica e dor crônica.|q-unesp2025-032,q-unesp2023-038,q-uspsp1-083]]`,
      fragmentos: [
        { id: "dip-diagnostico", titulo: "Diagnóstico e complicações", conferir: true, diretrizes: ["pcdt-ist"],
          casos: ["q-uspsp1-083"],
          questoes: ["q-scmsp2021-063","q-scmsp2023-067","q-tp20251-093","q-famema2025-053","q-iamspe2025-057","q-usp2023-105","q-udisc20262-093","q-uspsp1-083","q-unesp2025-032"],
          texto: `- Critério maior: **dor à mobilização do colo** (e dor anexial). {q-scmsp2021-063}
- Dor pélvica, febre, corrimento e β-hCG negativo: **DIP**. {q-scmsp2023-067,q-tp20251-093,q-famema2025-053,q-usp2023-105}
- Ultrassom: tubas de **parede espessada e distendidas** (piossalpinge). {q-udisc20262-093}
- Massa anexial complexa com febre: **abscesso tubo-ovariano**. {q-uspsp1-083}
- **Fitz-Hugh-Curtis**: dor no hipocôndrio direito que confunde com colecistite. {q-unesp2025-032}` },
        { id: "dip-tratamento", titulo: "Tratamento, internação e DIU", conferir: true, diretrizes: ["pcdt-ist","cdc-ist"],
          questoes: ["q-didepm-013","q-usprp2022-052","q-tp20252-061","q-fmabc2026-075","q-einstein2025-059","q-famema2025-093","q-uspsp5-036","q-iamspe2026-048","q-unesp2023-038","q-unesp2025-040","q-unesp2022-035","q-uspsp5-031"],
          prosa: `[[O tratamento ambulatorial é ceftriaxona 500 mg IM em dose única com doxiciclina 100 mg 12/12 h e metronidazol 500 mg 12/12 h por 14 dias, com reavaliação em 48 a 72 horas; interna-se quando há abscesso, sepse, gestação, vômitos que impedem a via oral ou falta de resposta.|q-didepm-013,q-usprp2022-052,q-fmabc2026-075,q-einstein2025-059,q-famema2025-093]] [[O DIU não precisa sair: retira-se só se não houver melhora em 48 a 72 horas.|q-usprp2022-052,q-tp20252-061,q-unesp2025-040]] [[O abscesso roto, a sepse e o abscesso grande (acima de cerca de 10 cm) vão para drenagem ou cirurgia.|q-iamspe2026-048,q-unesp2023-038]]`,
          texto: `- Ambulatorial: **ceftriaxona 500 mg IM + doxiciclina + metronidazol por 14 dias**. {q-didepm-013,q-usprp2022-052,q-fmabc2026-075,q-einstein2025-059}
- **Manter o DIU** e reavaliar em **48 h**. {q-usprp2022-052,q-tp20252-061,q-unesp2025-040}
- Sepse: **ceftriaxona, doxiciclina e metronidazol** com internação. {q-famema2025-093}
- Abscesso sem ruptura, internada: **ceftriaxona e metronidazol parenterais** (com doxiciclina). {q-uspsp5-036}
- Abscesso **roto**: internar, antibiótico e **drenagem**. {q-iamspe2026-048}
- Cirurgia de urgência: **séptica, roto ou > 10 cm**. {q-unesp2023-038}
- Parceiro assintomático: **ceftriaxona + azitromicina** em dose única. {q-unesp2022-035,q-uspsp5-031}` },
      ],
    },
    {
      id: "corrimento", titulo: "Corrimentos vaginais",
      introducao: `[[A vagina saudável é ácida (pH 3,8 a 4,5) porque os lactobacilos fermentam o glicogênio em ácido lático; quando eles somem, anaeróbios e *Gardnerella* proliferam, sobe o pH e as aminas voláteis dão o odor de peixe — é a vaginose bacteriana, que não é inflamatória e não é IST.|q-iamspe2021-050,q-uspsp5-085,q-iamspe2026-044,q-sessp2025-062]] [[A candidíase é a proliferação de levedura em meio ácido: prurido intenso, corrimento grumoso e pH normal (até 4,5), favorecida por antibiótico, diabetes, gestação e estrogênio.|q-iamspe2022-056,q-tp20241-098,q-usprp2026-080]] [[A tricomoníase é IST por protozoário flagelado: corrimento amarelo-esverdeado bolhoso, colo em framboesa (colpite macular), pH alto, e o parceiro é tratado.|q-tp20212-089,q-sirio2027-077,q-fmabc2022-062]]

[[Quando os lactobacilos são demais (vaginose citolítica), o pH fica muito ácido e as células epiteliais se rompem, imitando candidíase sem fungo; na vaginite aeróbia, ao contrário, faltam lactobacilos e há inflamação por bactérias intestinais e estreptococos.|q-iamspe2023-054,q-usp2025-005,q-fmabc2026-076,q-einstein2021-033,q-fmabc2024-061]]`,
      fragmentos: [
        { id: "cor-vaginose", titulo: "Vaginose bacteriana", conferir: true, diretrizes: ["pcdt-ist"],
          casos: ["q-usp2024-114"],
          questoes: ["q-adap21-065","q-scmsp2021-064","q-usp2024-114","q-usprp2022-001","q-amrigs2025-046","q-iamspe2021-050","q-iamspe2025-043","q-iamspe2026-044","q-sessp2025-062","q-tp20222-100","q-tp20251-099","q-tp20261-065","q-famema2021-053","q-famema2021-054","q-uspsp5-085","q-einstein2023-048","q-fmabc2023-073","q-unicampdis2024-098","q-uspsp4-027"],
          prosa: `[[O diagnóstico usa os critérios de Amsel — corrimento fino acinzentado, pH acima de 4,5, teste das aminas positivo e células-chave (clue cells) — e o tratamento é metronidazol 500 mg 12/12 h por 7 dias, sem tratar o parceiro.|q-adap21-065,q-uspsp5-085,q-tp20222-100,q-famema2021-054]] [[Achado de *Gardnerella* na citologia de mulher sem sintoma não se trata, e a recorrência (três ou mais episódios no ano) pede supressão com metronidazol gel por meses.|q-tp20251-099,q-tp20261-065]] Um gabarito manda tratar a assintomática; o protocolo trata só a sintomática e a gestante sintomática.`,
          texto: `- Corrimento acinzentado, **pH > 4,5**, **aminas +**, **clue cells**: vaginose. {q-adap21-065,q-iamspe2021-050,q-tp20222-100,q-uspsp4-027,q-unicampdis2024-098,q-usp2024-114}
- Agente associado: ***Gardnerella vaginalis***. {q-iamspe2025-043,q-iamspe2026-044,q-sessp2025-062}
- Tratamento: **metronidazol 500 mg 12/12 h por 7 dias**; **não tratar parceiro** de rotina. {q-adap21-065,q-usprp2022-001,q-uspsp5-085,q-famema2021-054}
- Alternativas: **metronidazol gel vaginal 5 dias**, **secnidazol 2 g dose única**. {q-scmsp2021-064,q-amrigs2025-046}
- Abordagem: anamnese, exame especular, **pH e KOH a 10%**; a citologia oncótica **não** é diagnóstico de corrimento. {q-famema2021-053}
- Não é IST, mas **aumenta o risco** de IST e HIV. {q-uspsp5-085,q-fmabc2023-073}
- *Gardnerella* na citologia, sem sintoma: **não tratar**. {q-tp20251-099}
- Recorrente: **metronidazol oral + gel vaginal por 4 a 6 meses**. {q-tp20261-065}` },
        { id: "cor-candida", titulo: "Candidíase", diretrizes: ["pcdt-ist"],
          casos: ["q-tp20202-089"],
          questoes: ["q-iamspe2022-056","q-tp20241-098","q-usprp2026-080","q-tp20202-089","q-tp20251-100","q-tp20232-099","q-scmsp2025-078"],
          texto: `- Fatores: **antibiótico, diabetes, gestação**. {q-iamspe2022-056}
- Prurido, corrimento **grumoso**, **pH < 4,5**, **pseudo-hifas**: *Candida albicans*. {q-tp20251-100,q-tp20202-089}
- Tratamento vaginal no SUS: **miconazol creme**. {q-tp20202-089}
- Gestante: **só tópico** (miconazol 7–14 noites), sem azol oral. {q-usprp2026-080}
- Recorrente (**≥ 4 episódios/ano**): **fluconazol 3 doses e depois semanal por 6 meses**. {q-tp20241-098}
- Três episódios no ano com gatilho claro: **episódios isolados** de candidíase simples, não recorrente. {q-scmsp2025-078}` },
        { id: "cor-tricomonas", titulo: "Tricomoníase", conferir: true, diretrizes: ["pcdt-ist"],
          casos: ["q-tp20252-040"],
          questoes: ["q-tp20212-089","q-sirio2027-077","q-fmabc2022-062","q-tp20202-016","q-tp20252-040","q-tp20261-090","q-unesp2022-032","q-simepm89-034","q-fmabc2021-050"],
          texto: `- Corrimento amarelo-esverdeado, **bolhoso**, **colo em framboesa**, pH > 5. {q-tp20212-089,q-sirio2027-077,q-simepm89-034}
- Confirmação: **exame a fresco** (protozoário **móvel**). {q-tp20212-089,q-sirio2027-077,q-tp20202-016,q-tp20252-040,q-tp20261-090}
- Tratamento: **metronidazol 500 mg 12/12 h por 7 dias** (ou 2 g dose única). {q-fmabc2022-062,q-unesp2022-032,q-simepm89-034}
- IST: **tratar parceiro** e pedir sorologias. {q-fmabc2021-050}` },
        { id: "cor-outras", titulo: "Vaginose citolítica e vaginite aeróbia", conferir: true,
          questoes: ["q-iamspe2023-054","q-usp2025-005","q-fmabc2026-076","q-einstein2021-033","q-fmabc2024-061","q-einstein2025-051"],
          texto: `- Citolítica: **pH ácido, lactobacilos aumentados**, citólise, sem fungo. {q-iamspe2023-054,q-fmabc2026-076}
- Tratamento da citolítica: **bicarbonato de sódio** vaginal. {q-usp2025-005}
- Vaginite aeróbia: ***E. coli*, *S. aureus*, *S. agalactiae*, enterococo**. {q-einstein2021-033}
- Corrimento que não melhora com cremes: pensar em **vaginite aeróbia**. {q-fmabc2024-061}
- Homem trans com testosterona (hipoestrogenismo), erosões e pH alcalino: **vaginite aeróbia**. {q-einstein2025-051}` },
      ],
    },
    {
      id: "hpv", titulo: "HPV e verrugas anogenitais",
      introducao: `[[O HPV infecta a camada basal do epitélio por microlesões; os tipos de baixo risco (6 e 11) dão condilomas acuminados, e os de alto risco (16 e 18) dão as neoplasias intraepiteliais e o câncer de colo, ânus e pênis.|q-scmsp2023-022,q-scmsp2021-014]] [[O tratamento das verrugas é destrutivo e local; na gestação valem só os métodos físicos e o ácido tricloroacético, porque podofilina e imiquimode são contraindicados.|q-adap23-031,q-usprp2022-047,q-sessp2024-025]]

[[A vacina gera anticorpos que inativam o vírus antes de ele entrar na célula; por isso funciona melhor antes do início da vida sexual, e a mulher adulta fora da faixa do SUS ainda pode se vacinar na rede privada.|q-famerp2026-024,q-famerp2026-023,q-tp20251-114,q-tp20261-082]]`,
      fragmentos: [
        { id: "hpv-tratamento", titulo: "Tratamento das verrugas e vacina", conferir: true, diretrizes: ["pcdt-ist","calendario-vacinal"],
          casos: ["q-usprp2022-047"],
          questoes: ["q-scmsp2023-022","q-scmsp2021-014","q-adap23-031","q-usprp2022-047","q-sessp2024-025","q-amrigs2024-048","q-scmsp2026-077","q-unesp2022-039","q-famerp2026-024","q-famerp2026-023","q-tp20251-114","q-tp20261-082"],
          texto: `- Ligadas ao HPV: **condiloma, papulose bowenoide, Buschke-Löwenstein, doença de Bowen, NIA**. {q-scmsp2023-022}
- Verrugas **não indicam cesárea** (exceto obstrução do canal ou sangramento). {q-scmsp2021-014}
- Gestante: **ácido tricloroacético 80–90%** ou crioterapia. {q-adap23-031,q-usprp2022-047}
- ATA 80–90% **semanal por 8 a 10 semanas**, na unidade de saúde. {q-amrigs2024-048}
- **Podofilina 25%**: margem anal, prepúcio, glande, grandes lábios, **fora da gestação**. {q-sessp2024-025}
- Verruga vulvar em couve-flor: **cauterizar**. {q-scmsp2026-077}
- Mulher com HIV controlado: **ATA 90%** ambulatorial. {q-unesp2022-039}
- Adolescente com verrugas: tratar e **vacinar**. {q-tp20251-114,q-tp20261-082}
- Vacina: eficácia máxima **antes do início sexual**. {q-famerp2026-024}
- Adulta fora da faixa do SUS: **nonavalente na rede privada, 0-2-6 meses**. {q-famerp2026-023}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-sirio2022-076", "q-famerp2023-019", "q-adap24-041", "q-tp20252-097", "q-scmsp2022-088", "q-uspsp4-096", "q-adap22-036", "q-iamspe2021-058", "q-usprp2021-065", "q-uspsp5-088", "q-simepm89-036", "q-sirio2023-070", "q-iamspe2025-057", "q-einstein2023-048", "q-tp20232-099"],
          texto: `- Não treponêmico + com treponêmico −: **terceiro treponêmico** de outro método; reagente = sífilis **ou cicatriz**, não reagente = falso-reagente. A banca que deu "pode ser cicatriz" segue esse fluxograma do PCDT 2022. {q-sirio2022-076}
- Parceria assintomática com VDRL +: estágio depende do tempo de infecção; sem como datar, seriam **3 doses**; um gabarito dá **dose única** por considerar exposição recente. {q-famerp2023-019}
- Gestante já tratada com nova exposição: subida de título ou parceria nova sem proteção é **reinfecção** e se retrata (dose única se recente); duas bancas aplicaram isso com VDRL 1:16 e com VDRL 1:1. {q-adap24-041,q-tp20252-097}
- Queda de **uma** diluição em 3 meses: uma banca chama de **seguimento adequado** (prazo de 6 meses)… {q-scmsp2022-088}
- …e outra, seguindo o PCDT de transmissão vertical, chama a mesma queda de **inadequada** (2 diluições em 3 meses). {q-uspsp4-096}
- Herpes na gestação: **cesárea só com lesão ativa ou pródromo no parto**; com primoinfecção no 3º trimestre, uma banca (ACOG) já **programa a cesárea**. {q-adap22-036,q-iamspe2021-058}
- Úlcera **> 4 semanas**: cobrir **donovanose e LGV** e biopsiar; o esquema do gabarito é doxiciclina + penicilina + ciprofloxacino. {q-usprp2021-065}
- Uretrite sem agente identificado (PCDT 2022): 1ª opção **ceftriaxona + azitromicina**; 2ª opção **ceftriaxona + doxiciclina 7 dias**, que é também o esquema do CDC 2021 cobrado num gabarito recente. {q-uspsp5-088}
- Clamídia confirmada: **doxiciclina 100 mg 12/12 h por 7 dias**; o diagnóstico é por **biologia molecular** (um gabarito cita captura híbrida). {q-simepm89-036,q-sirio2023-070}
- Dor pélvica e febre após a menstruação é **DIP** até prova em contrário (ceftriaxona 500 mg + doxiciclina + metronidazol); um gabarito chama de endometrite e usa ceftriaxona 250 mg (dose antiga). {q-iamspe2025-057}
- Vaginose **assintomática** não se trata (exceto antes de procedimento ginecológico); uma banca deu tratar como certo. {q-einstein2023-048}
- Candidíase complicada (grave ou de repetição) usa **fluconazol 150 mg em 3 doses (a cada 72 h)**; a recorrente (≥ 4/ano) acrescenta supressão semanal por 6 meses. {q-tp20232-099}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela comparativa",
      introducao: `As duas tabelas resumem os capítulos de úlceras e de corrimentos.`,
      fragmentos: [
        { id: "comp-tabelas", titulo: "Úlceras genitais e corrimentos vaginais lado a lado", conferir: true,
          questoes: ["q-uspsp1-082","q-sirio2023-088","q-famema2023-050"],
          prosa: `| Úlcera | Agente | Dor | Lesão | Linfonodo | Tratamento |
|---|---|---|---|---|---|
| Sífilis primária | *T. pallidum* | **indolor** | única, base endurecida, fundo limpo | indolor | benzatina dose única |
| Herpes | HSV-2 (e 1) | **dolorosa** | vesículas agrupadas → úlceras rasas | doloroso | aciclovir |
| Cancro mole | *H. ducreyi* | **dolorosa** | múltiplas, fundo purulento, bordas irregulares | bubão que fistuliza | azitromicina |
| Linfogranuloma | *C. trachomatis* L1–L3 | pouca | pápula fugaz | **bubão** inguinal | doxiciclina 21 dias |
| Donovanose | *K. granulomatis* | **indolor** | crônica, vermelho-carne, sangra | ausente | azitromicina semanal |

| Corrimento | pH | Aspecto | Teste/microscopia | Parceiro |
|---|---|---|---|---|
| Vaginose bacteriana | **> 4,5** | fino, acinzentado, odor de peixe | aminas +, clue cells | não trata |
| Candidíase | **≤ 4,5** | grumoso, prurido intenso | pseudo-hifas | não trata |
| Tricomoníase | **> 5** | amarelo-esverdeado, bolhoso, colo em framboesa | protozoário móvel | **trata** |
| Citolítica | **< 4** | branco, prurido | lactobacilos em excesso, citólise | não trata |`,
          texto: `- Três pacientes: grumoso com KOH + = **candidíase**; esverdeado com protozoário = **tricomoníase**; acinzentado com pH > 4,5 = **vaginose**. {q-uspsp1-082}
- Corrimento bolhoso, odor fétido, piora após o coito: **metronidazol** (vaginose ou tricomoníase). {q-sirio2023-088}
- Úlceras de IST: **sífilis, donovanose e herpes**. {q-famema2023-050}` },
      ],
    },
  ],
});
