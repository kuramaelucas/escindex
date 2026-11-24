/* resumos/zoonoses-e-febres-hemorragicas/resumo.js — resumo adaptativo de zoonoses por vetores e
   febres hemorrágicas (ass-febremaculosa): febre maculosa brasileira (agente, vetor e hospedeiros,
   quadro e exantema, doxiciclina empírica, sorologia pareada, notificação), doença de Lyme, síndrome
   cardiopulmonar por hantavírus e doença pelo vírus Ebola; armadilhas e tabela comparativa.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- zoonoses-e-febres-hemorragicas */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "zoonoses-e-febres-hemorragicas",
  titulo: "Febre maculosa, Lyme, hantavírus e Ebola",
  assunto: "ass-febremaculosa",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "gvs-zoonoses", texto: "Ministério da Saúde — Guia de Vigilância em Saúde (2024): febre maculosa e outras riquetsioses, hantavirose; protocolo de vigilância da doença pelo vírus Ebola", lidoEm: null },
    { id: "idsa-lyme", texto: "IDSA/AAN/ACR — Guidelines for the prevention, diagnosis and treatment of Lyme disease (2020)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "maculosa", titulo: "Febre maculosa brasileira",
      introducao: `[[A febre maculosa é causada pela bactéria intracelular **_Rickettsia rickettsii_**, transmitida pela picada do **carrapato _Amblyomma_** (carrapato-estrela, *A. sculptum*), que vive em **capivaras e cavalos** perto de rios e matas, sobretudo no Sudeste. A riquétsia infecta o **endotélio**: a vasculite explica o exantema, as petéquias, o edema e, nas formas graves, o sangramento, a insuficiência renal e o coma. No interior de São Paulo, a letalidade passa de 50%.|q-gdsfiha-027,q-uspsp2-111,q-amrigs2023-006]]

Veja também: **Arboviroses**, **Leptospirose**, **Exantemáticas** e **Vigilância em saúde**.`,
      fragmentos: [
        { id: "mac-agente", titulo: "Agente, vetor e vigilância", conferir: true, diretrizes: ["gvs-zoonoses"],
          questoes: ["q-gdsfiha-027","q-uspsp2-111","q-amrigs2023-006"],
          prosa: `[[O agente é a **_Rickettsia rickettsii_** (bactéria, não vírus); *Amblyomma* é o vetor e a capivara (*Hydrochoerus*), o hospedeiro amplificador. O carrapato precisa ficar **preso à pele por horas** para transmitir, por isso examinar o corpo e retirá-lo logo protege. A **incubação** vai de **2 a 14 dias** depois da picada.|q-gdsfiha-027,q-amrigs2023-006]] [[A vigilância ambiental faz **pesquisa ativa de carrapatos** nos hospedeiros (capivaras, cavalos) e no ambiente do local provável de infecção.|q-uspsp2-111]]`,
          texto: `- **_Rickettsia rickettsii_**, carrapato **_Amblyomma_**, capivara; incubação **2–14 dias**. {q-gdsfiha-027,q-amrigs2023-006}
- Vigilância: **pesquisa de carrapatos** nos hospedeiros. {q-uspsp2-111}` },
        { id: "mac-quadro", titulo: "Quadro e exantema", conferir: true, diretrizes: ["gvs-zoonoses"],
          questoes: ["q-famema2023-040","q-fmabc2022-017","q-gdsfiha-005","q-gdsfiha-018","q-gdsfiha-010"],
          prosa: `[[Começa como gripe forte: **febre súbita**, **cefaleia** e **mialgia intensa**, prostração. Entre o **3º e o 5º dia** surge **exantema maculopapular** que começa nos **punhos e tornozelos**, atinge **palmas e plantas** e sobe para o tronco (**centrípeto**), podendo ficar petequial.|q-famema2023-040,q-fmabc2022-017,q-gdsfiha-005,q-gdsfiha-018]] [[Na forma grave aparecem **icterícia, sufusões hemorrágicas, torpor**, insuficiência renal e respiratória. Febre com exantema palmoplantar e história de carrapato **notifica-se** como suspeita de febre maculosa.|q-gdsfiha-010,q-gdsfiha-018]]`,
          texto: `- Febre súbita + mialgia, exantema no **3º–5º dia**, **palmas e plantas**, centrípeto. {q-famema2023-040,q-fmabc2022-017,q-gdsfiha-005,q-gdsfiha-018}
- Grave: **icterícia, hemorragia, torpor**; notificar. {q-gdsfiha-010,q-gdsfiha-018}` },
        { id: "mac-tratamento", titulo: "Doxiciclina sem esperar", conferir: true, diretrizes: ["gvs-zoonoses"],
          figuras: [{ arquivo: "figuras/febre-maculosa-tempo.svg", legenda: "Esquema autoral: evolução da febre maculosa e o momento de tratar." }],
          questoes: ["q-usprp2025-073","q-gdsfiha-011","q-gdsfiha-010","q-famema2023-040"],
          prosa: `[[A mortalidade sobe a cada dia sem antibiótico e o exantema pode demorar ou faltar. Por isso, **febre com história de carrapato** ou área de risco já indica **doxiciclina imediata**, em **qualquer idade** (inclusive criança), **sem esperar exantema nem exame**.|q-gdsfiha-011,q-usprp2025-073]] [[A alternativa é o **cloranfenicol**. O tratamento dura até **3 dias sem febre** (cerca de 7 dias), não 15. Sulfametoxazol-trimetoprima e penicilina não agem sobre riquétsia.|q-gdsfiha-010,q-famema2023-040,q-usprp2025-073]]`,
          texto: `- Suspeita (febre + carrapato): **doxiciclina já**, qualquer idade. {q-gdsfiha-011,q-usprp2025-073}
- Alternativa: **cloranfenicol**; até 3 dias afebril. {q-gdsfiha-010,q-famema2023-040}` },
        { id: "mac-diagnostico", titulo: "Sorologia pareada", conferir: true, diretrizes: ["gvs-zoonoses"],
          questoes: ["q-unicampdis2024-086","q-famema2023-040"],
          prosa: `[[A confirmação é a **imunofluorescência indireta (RIFI)** em **duas amostras** colhidas com intervalo de **14 a 21 dias**: o aumento de 4 vezes no título (soroconversão) confirma. A primeira amostra costuma ser negativa e não autoriza parar o tratamento.|q-unicampdis2024-086,q-famema2023-040]]`,
          texto: `- RIFI em **duas amostras com 14–21 dias** de intervalo. {q-unicampdis2024-086,q-famema2023-040}` },
      ],
    },
    {
      id: "lyme", titulo: "Doença de Lyme",
      introducao: `[[A doença de Lyme é causada pela espiroqueta **_Borrelia burgdorferi_**, transmitida por carrapato do gênero *Ixodes*. A bactéria se espalha a partir da picada pela pele e depois pelo sangue, atingindo **articulações, nervos e coração**. No Brasil, há uma doença semelhante (síndrome de Baggio-Yoshinari).|q-gdsfiha-034,q-sirio2021-013,q-gdsfiha-013]]`,
      fragmentos: [
        { id: "lym-quadro", titulo: "Eritema migrans e as fases", conferir: true, diretrizes: ["idsa-lyme"],
          casos: ["q-sirio2021-013"],
          questoes: ["q-sirio2021-013","q-gdsfiha-013","q-gdsfiha-025","q-gdsfiha-032","q-gdsfiha-034"],
          prosa: `[[O sinal inicial é o **eritema migrans**: mancha vermelha **indolor** que **cresce em alvo**, com centro mais claro, no local da picada, com febre, mialgia e artralgia. Nem todos têm a lesão.|q-sirio2021-013,q-gdsfiha-013,q-gdsfiha-034]] [[Semanas depois vêm a **neuroborreliose** (meningite linfocitária, **paralisia facial**, radiculite) e a **cardite** com **bloqueio atrioventricular** (bradicardia, tontura). O diagnóstico é a **sorologia (ELISA)** para *Borrelia*, e o tratamento, **doxiciclina**.|q-gdsfiha-025,q-gdsfiha-032,q-gdsfiha-013]]`,
          texto: `- Mancha que cresce em alvo após viagem rural: **eritema migrans (Lyme)**. {q-sirio2021-013,q-gdsfiha-013,q-gdsfiha-034}
- Depois: **meningite, paralisia facial, bloqueio AV** → **ELISA para Borrelia**. {q-gdsfiha-025,q-gdsfiha-032,q-gdsfiha-013}` },
      ],
    },
    {
      id: "hantavirus", titulo: "Hantavirose",
      introducao: `[[O hantavírus vive em **roedores silvestres** e sai na urina, nas fezes e na saliva; a pessoa se infecta **inalando aerossóis** desses resíduos ao limpar galpões, silos ou paióis, na zona rural. É o único buniavírus que não é transmitido por artrópode.|q-gdsfiha-023,q-sirio2027-008,q-gdsfiha-006]]`,
      fragmentos: [
        { id: "han-cardiopulmonar", titulo: "Síndrome cardiopulmonar", conferir: true, diretrizes: ["gvs-zoonoses"],
          questoes: ["q-gdsfiha-006","q-gdsfiha-019","q-gdsfiha-023","q-sirio2027-008"],
          prosa: `[[Depois de dias de febre, mialgia (sobretudo lombar) e dor abdominal, surgem **tosse seca e dispneia rapidamente progressiva**, **taquicardia** e hipotensão: a **síndrome cardiopulmonar por hantavírus**, com edema pulmonar não cardiogênico e infiltrado intersticial bilateral.|q-gdsfiha-006,q-gdsfiha-019,q-gdsfiha-023]] [[O vírus não destrói o endotélio; as **citocinas** o tornam permeável: **extravasamento capilar** com **hemoconcentração** (hematócrito alto), **hipoalbuminemia**, **plaquetopenia** e **imunoblastos** no sangue. Por isso o suporte usa **inotrópico cedo** e **pouco volume**, que encharcaria o pulmão.|q-sirio2027-008]]`,
          texto: `- Febre e depois **tosse seca, dispneia rápida, taquicardia**: **hantavírus** (cardiopulmonar). {q-gdsfiha-006,q-gdsfiha-019,q-gdsfiha-023}
- Hematócrito alto, plaquetas baixas, imunoblastos; **inotrópico cedo, pouco volume**. {q-sirio2027-008}` },
      ],
    },
    {
      id: "ebola", titulo: "Doença pelo vírus Ebola",
      introducao: `[[O vírus Ebola passa de pessoa a pessoa pelo **contato com sangue, secreções e fluidos** do doente (vivo ou morto) e com **objetos contaminados**; não se transmite antes dos sintomas nem pelo ar. A incubação é de até **21 dias**, e esse é o prazo que define o caso suspeito em quem volta de área com transmissão.|q-gdsfiha-026,q-gdsfiha-028,q-gdsfiha-031]]`,
      fragmentos: [
        { id: "ebo-caso", titulo: "Caso suspeito", conferir: true, diretrizes: ["gvs-zoonoses"],
          questoes: ["q-gdsfiha-026","q-gdsfiha-031","q-gdsfiha-030","q-gdsfiha-033"],
          prosa: `[[**Caso suspeito**: pessoa que, nos **últimos 21 dias**, esteve em país com transmissão (como Guiné, Serra Leoa, Libéria) e apresenta **febre**, com ou sem cefaleia, mialgia, fraqueza, vômitos, diarreia, dor abdominal ou **sangramento**; a hemorragia não é obrigatória.|q-gdsfiha-026,q-gdsfiha-031,q-gdsfiha-030]] [[O quadro inicial é inespecífico (febre alta, cefaleia, mialgia, hiperemia conjuntival, faringite, exantema), e o que leva à suspeita é a **procedência**.|q-gdsfiha-033]]`,
          texto: `- Procedente de área de transmissão **em 21 dias** + **febre**: caso suspeito; sangramento não é exigido. {q-gdsfiha-026,q-gdsfiha-031,q-gdsfiha-030}
- Quadro inespecífico; a **viagem** sugere. {q-gdsfiha-033}` },
        { id: "ebo-transmissao", titulo: "Transmissão e contatos", conferir: true, diretrizes: ["gvs-zoonoses"],
          questoes: ["q-gdsfiha-028","q-gdsfiha-029"],
          prosa: `[[O vírus **se dissemina por objetos contaminados** (roupas, agulhas, instrumentos). Por isso, se o doente for confirmado, estão em risco **todos os que tiveram contato** com o sangue e os fluidos dele, profissionais de saúde, **familiares e amigos**, e todos são monitorados por 21 dias.|q-gdsfiha-028,q-gdsfiha-029]]`,
          texto: `- Objetos contaminados **transmitem**; contatos (família, amigos) em risco. {q-gdsfiha-028,q-gdsfiha-029}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["gvs-zoonoses"],
          questoes: ["q-amrigs2023-006","q-famema2023-040","q-gdsfiha-010","q-gdsfiha-023"],
          prosa: `[[**Febre maculosa não é viral e não se trata só com suporte**: a afirmativa da amrigs2023-006 que dizia isso está errada; só a incubação de 2 a 14 dias está certa.|q-amrigs2023-006]] [[**Doxiciclina por 15 dias** é falso; 15 dias é o intervalo entre as duas sorologias.|q-famema2023-040]] [[**Centrípeto ou centrífugo**: o exantema da febre maculosa começa nas extremidades e sobe (centrípeto); a gdsfiha-010 descreveu "centrífugo", mas o que ela cobrou foi o tratamento (doxiciclina ou cloranfenicol).|q-gdsfiha-010]] [[**Tosse produtiva com bradicardia** não é hantavirose: a tosse é seca e há taquicardia.|q-gdsfiha-023]]`,
          texto: `- FMB: **bactéria, com antibiótico**. {q-amrigs2023-006}
- 15 dias é o intervalo **da sorologia**, não do tratamento. {q-famema2023-040}
- Exantema **centrípeto**; a prova escreveu centrífugo. {q-gdsfiha-010}
- Hanta: tosse **seca**, **taquicardia**. {q-gdsfiha-023}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: as quatro doenças",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-zoonoses", titulo: "Agente, como pega, quadro e tratamento", conferir: true,
          questoes: ["q-gdsfiha-027","q-gdsfiha-034","q-gdsfiha-006","q-gdsfiha-026"],
          prosa: `[[O modo de transmissão é a primeira pista.|q-gdsfiha-027,q-gdsfiha-034,q-gdsfiha-006,q-gdsfiha-026]]

| Doença | Agente | Como pega | Quadro marcante | Tratamento |
| Febre maculosa | *Rickettsia rickettsii* | carrapato *Amblyomma* | febre, mialgia, exantema palmoplantar | doxiciclina imediata |
| Lyme | *Borrelia burgdorferi* | carrapato *Ixodes* | eritema migrans; meningite, bloqueio AV | doxiciclina |
| Hantavirose | hantavírus | aerossol de excreta de roedor | tosse seca, edema pulmonar, hemoconcentração | suporte, inotrópico |
| Ebola | vírus Ebola | sangue e fluidos de doente | febre após viagem; sangramento | suporte, isolamento |`,
          texto: `- FMB: **_Rickettsia_, carrapato**. {q-gdsfiha-027}
- Lyme: **_Borrelia_**. {q-gdsfiha-034}
- Hanta: **roedor, aerossol**. {q-gdsfiha-006}
- Ebola: **fluidos, 21 dias**. {q-gdsfiha-026}` },
      ],
    },
  ],
});
