/* resumos/iras/resumo.js — resumo adaptativo de infecções relacionadas à assistência à saúde: definições, higiene das mãos e precauções,
   infecção do sítio cirúrgico e antibioticoprofilaxia, cateter venoso central, pneumonia hospitalar, colite por C. difficile.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- iras */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "iras",
  titulo: "Infecções relacionadas à assistência à saúde",
  assunto: "ass-iras",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "anvisa-iras", texto: "ANVISA — Critérios diagnósticos de infecção relacionada à assistência à saúde, Medidas de prevenção de ISC e Portaria MS 2.616/1998 (infecção hospitalar)", lidoEm: null },
    { id: "oms-maos", texto: "OMS — Cinco momentos para a higiene das mãos e Programa Nacional de Segurança do Paciente (meta de higienização das mãos)", lidoEm: null },
    { id: "idsa-cdi", texto: "IDSA/SHEA — Clinical Practice Guideline for Clostridioides difficile infection (2017, atualização de 2021) e IDSA — infecção da corrente sanguínea associada a cateter (2009)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anuladas pela banca (gabarito do material de origem incorreto ou duas afirmativas incorretas)", questoes: ["q-gdiras-026","q-gdiras-036","q-gdiras-067","q-gdiras-086"] },
  ],
  doencas: [
    {
      id: "prevencao", titulo: "Definição, higiene das mãos e precauções",
      introducao: `[[A **infecção hospitalar** é a **adquirida após a admissão** que se manifesta **na internação ou depois da alta**, se relacionada à internação ou a procedimentos; quando o período de incubação é desconhecido, convenciona-se hospitalar a que aparece **a partir de 72 horas** da admissão; e a **mais eficaz e barata** medida de prevenção é a **higiene das mãos**, que impede a **transmissão cruzada** pelas mãos dos profissionais.|q-gdiras-114,q-gdiras-102,q-inf-30,q-gdiras-023,q-gdiras-014]]

Veja também: **Cuidados perioperatórios** (antibioticoprofilaxia e preparo), **Complicações cirúrgicas** (infecção de ferida), **Pneumonia no adulto** (hospitalar e PAV), **Sepse**, **Neutropenia febril**, **Tuberculose** e **Exantemáticas** (isolamento).`,
      fragmentos: [
        { id: "iras-definicao", titulo: "Conceitos e agentes das IRAS", conferir: true, diretrizes: ["anvisa-iras"],
          questoes: ["q-gdiras-102","q-gdiras-114","q-gdiras-105","q-gdiras-017","q-unifesp2024-028","q-sirio2022-019","q-gdiras-030"],
          prosa: `[[Pela **Portaria 2.616/98**, a infecção **comunitária** é a constatada ou **em incubação na admissão**, sem relação com internação anterior; a **hospitalar** é adquirida depois da admissão e **não se limita à data da alta**; e a **principal causa de infecção hospitalar no pós-operatório** é a **infecção do sítio cirúrgico**; o **ambiente hospitalar** é reservatório de bactérias resistentes e fonte para os pacientes.|q-gdiras-102,q-gdiras-114,q-gdiras-105,q-gdiras-017]] [[A ***Candida auris*** pesa por **colonizar pacientes por muito tempo, resistir a antifúngicos e causar surtos**; as bacteremias de **residências de idosos** são por ***E. coli*** e as de **unidade de queimados** por ***Pseudomonas***; e **assepsia** é o conjunto de medidas que **impede a introdução** de patógenos, enquanto **antissepsia** é o uso de produtos microbicidas no tecido vivo.|q-unifesp2024-028,q-sirio2022-019,q-gdiras-030]]`,
          texto: `- Infecção hospitalar: **adquirida após a admissão, durante a internação ou depois da alta**; não se limita à alta (afirmar isso é o erro). {q-gdiras-102}
- Presumida hospitalar a partir de **72 horas** da admissão quando a incubação é desconhecida. {q-gdiras-114}
- Principal causa de infecção hospitalar pós-operatória: **infecção do sítio cirúrgico**. {q-gdiras-105}
- O ambiente hospitalar é **reservatório de bactérias resistentes**. {q-gdiras-017}
- *Candida auris*: **colonização prolongada, resistência e surtos**. {q-unifesp2024-028}
- Bacteremia de casa de repouso: ***E. coli***; de unidade de queimados: ***Pseudomonas aeruginosa***. {q-sirio2022-019}
- **Assepsia** impede a introdução de agentes; **antissepsia** usa microbicidas. {q-gdiras-030}` },
        { id: "higiene-maos", titulo: "Higiene das mãos", conferir: true, diretrizes: ["oms-maos"],
          questoes: ["q-inf-30","q-gdiras-023","q-gdiras-029","q-gdiras-066","q-gdiras-074","q-gdiras-083","q-gdiras-098","q-gdiras-108","q-gdiras-014","q-usprp2022-007"],
          prosa: `[[A **higiene das mãos** é a medida isolada **mais eficaz e barata**, a **principal maneira de prevenir infecção cruzada** e a **meta de segurança do paciente** de maior impacto; faz-se **antes e depois do contato com o paciente** (**mesmo com luvas**), **antes de manusear dispositivos invasivos**, **ao passar de um sítio contaminado a um limpo** no mesmo paciente e **logo depois de tirar as luvas**, e o momento 2 (antes de procedimento asséptico) vale **mesmo que se tenha higienizado antes do contato**; as luvas têm microperfurações e contaminam as mãos.|q-inf-30,q-gdiras-023,q-gdiras-029,q-gdiras-066,q-usprp2022-007,q-gdiras-014]] [[A **água e sabão** é obrigatória quando há **sujidade visível** (o **talco** das luvas), e **superior ao álcool na colite por *C. difficile***, porque o álcool **não destrói os esporos**; a eficácia depende de **duração, técnica e agente**, **joias e relógios saem**, e a lavagem com água e sabão **dura de 40 a 60 segundos**, não menos de 1 minuto é o item incorreto.|q-gdiras-083,q-gdiras-108,q-gdiras-098,q-gdiras-074]]`,
          texto: `- A medida isolada mais eficaz e barata é a **higienização das mãos nos cinco momentos da OMS**. {q-inf-30}
- Lavar antes e depois de manipular pacientes é a melhor forma de evitar **infecção cruzada**. {q-gdiras-023}
- A **higienização das mãos** é a meta de segurança do paciente de maior impacto. {q-gdiras-029}
- Indicações: antes e depois do contato (mesmo com luvas), antes de dispositivos invasivos, entre sítios, após luvas. {q-gdiras-066}
- A água e sabão com técnica correta **não** leva "menos de 1 minuto" (item incorreto). {q-gdiras-074}
- **Talco** persistente nas mãos: **água e sabão**. {q-gdiras-083}
- Corretas I, III, V: eficácia depende de duração, técnica e agente; remove sujidade; água e sabão, álcool ou antisséptico; **joias saem**. {q-gdiras-098}
- Água e sabão é **superior ao álcool gel** na **colite pseudomembranosa**. {q-gdiras-108}
- Transmissão de viroses respiratórias a profissionais: **higiene inadequada das mãos**. {q-gdiras-014}
- Momento 2: higienizar as mãos **mesmo que já o tenha feito antes do contato**. {q-usprp2022-007}` },
        { id: "precaucoes", titulo: "Precauções e isolamento", conferir: true, diretrizes: ["anvisa-iras"],
          questoes: ["q-usp2025-052","q-usprp2026-048","q-gdiras-008","q-gdiras-024","q-gdiras-033","q-gdiras-042","q-gdiras-051","q-gdiras-070","q-gdiras-125","q-udisc20262-019","q-scmsp2026-051","q-fmabc2024-098","q-gdiras-069"],
          prosa: `[[A precaução segue **como o agente se transmite**: **aerossóis** (**tuberculose bacilífera, sarampo, varicela**) pedem **quarto privativo com pressão negativa, trocas de ar e filtração** e **máscara PFF2 (N95)** do profissional; **gotículas** (**meningite bacteriana, coqueluche, bronquiolite pelo VSR**) pedem **máscara cirúrgica e quarto privativo ou coorte**; e **contato** (parainfluenza 3 e VSR em quarto compartilhado, *C. difficile*, MRSA, bactérias multirresistentes) pede **luvas e capote**; o **antraz** (esporos) só pede **precauções-padrão**.|q-gdiras-008,q-gdiras-051,q-gdiras-033,q-gdiras-024,q-gdiras-125,q-gdiras-042,q-gdiras-070,q-usprp2026-048,q-usp2025-052,q-udisc20262-019]] [[O ***C. difficile*** exige **higiene das mãos com água e sabão** e, no **surto** com muitos casos ligados, **bloquear as internações nas enfermarias afetadas**; a **criança colonizada por MRSA** antes de cirurgia cardíaca recebe **banho de clorexidina 2 % diário, mupirocina nasal por 5 dias e precaução de contato**.|q-scmsp2026-051,q-fmabc2024-098,q-gdiras-069]]`,
          texto: `- Três crianças com bronquiolite: **isolamento com precaução de gotícula** para a de quadro diferente e **contato** para as de VSR e parainfluenza em quarto compartilhado. {q-usp2025-052}
- Lactente de 3 meses com tosse em acessos há 11 dias e vômitos: **precaução para gotículas** (coqueluche). {q-usprp2026-048}
- Tuberculose bacilífera: **aerossol**, pressão negativa, trocas de ar e **PFF2**. {q-gdiras-008}
- Lactente com exantema morbiliforme e manchas de Koplik: **aerossóis** (sarampo). {q-gdiras-024}
- Indicação **absoluta** de quarto de isolamento na pediatria: **varicela**. {q-gdiras-033}
- Bronquiolite: **precaução respiratória por gotícula**. {q-gdiras-042}
- Sarampo: **respiratória para aerossol**. {q-gdiras-051}
- Meningite bacteriana aguda: **gotícula**. {q-gdiras-070}
- Gotículas e aerossóis: **meningite meningocócica e varicela**. {q-gdiras-125}
- Antraz: esporos latentes até 6 semanas e **precauções-padrão**. {q-udisc20262-019}
- Higiene das mãos com água e sabão, não álcool: ***Clostridioides difficile***. {q-scmsp2026-051}
- Surto de *C. difficile* em várias enfermarias: **bloquear as internações**. {q-fmabc2024-098}
- Criança colonizada por MRSA antes de cirurgia cardíaca: **clorexidina, mupirocina e contato**. {q-gdiras-069}` },
      ],
    },
    {
      id: "sitio-cirurgico", titulo: "Infecção do sítio cirúrgico e antibioticoprofilaxia",
      introducao: `[[A **infecção do sítio cirúrgico (ISC)** é a infecção da incisão, do órgão ou do espaço **até 30 dias da cirurgia** (ou **até 90 dias** com **prótese ou implante**), e o ***Staphylococcus aureus*** é o agente mais comum; a prevenção soma **normotermia, oxigenação, antissepsia, tricotomia correta e antibiótico profilático**, e este **não substitui** os demais cuidados.|q-gdiras-075,q-fmabc2024-036,q-gdiras-097,q-gdiras-034]]`,
      fragmentos: [
        { id: "isc-risco", titulo: "Fatores de risco, prevenção e manejo da ISC", conferir: true, diretrizes: ["anvisa-iras"],
          questoes: ["q-fmabc2024-036","q-gdiras-003","q-gdiras-006","q-gdiras-007","q-gdiras-021","q-gdiras-034","q-gdiras-035","q-gdiras-037","q-gdiras-039","q-gdiras-057","q-gdiras-071","q-gdiras-073","q-gdiras-075","q-gdiras-078","q-gdiras-090","q-gdiras-094","q-gdiras-097","q-gdiras-100","q-gdiras-104","q-gdiras-109","q-gdiras-116","q-gdiras-119","q-gdiras-050","q-gdiras-076"],
          prosa: `[[São **fatores de risco** da ISC a **maior duração da cirurgia, tabagismo, imunossupressão, obesidade, transfusão, neoplasia, corticoide, idade acima de 65 anos e hiperglicemia**; **não** são a profilaxia (que previne), a **hipertermia**, a **hipertensão**, a **infância** nem a internação prévia com alta há mais de 3 meses; e o **homem jovem em hernioplastia** é o perfil de menor risco.|q-gdiras-039,q-gdiras-090,q-gdiras-037,q-gdiras-035,q-gdiras-094,q-gdiras-100,q-gdiras-104,q-gdiras-021,q-gdiras-007]] [[A **hipotermia intraoperatória** aumenta a ISC (menos fluxo e função dos neutrófilos), e a **normotermia com aquecimento ativo** e a **FiO2 de 80 %** a reduzem; a **tricotomia** se evita ou se faz **pouco antes, sem lâmina** (2 dias antes aumenta a infecção); a **clorexidina** é o antisséptico de pele de menor taxa de infecção; e a **drenagem abdominal de rotina não reduz** a infecção.|q-gdiras-006,q-gdiras-003,q-gdiras-034,q-gdiras-073,q-gdiras-109,q-gdiras-119,q-gdiras-050,q-gdiras-116,q-gdiras-076]] [[Na ISC superficial, as **primeiras etapas são abrir a ferida e examinar** a incisão (**curativo por segunda intenção**); com prótese a ISC vale por **até 1 ano** na definição tradicional; o ***S. aureus*** é o agente mais frequente.|q-gdiras-071,q-gdiras-078,q-gdiras-057,q-gdiras-097,q-fmabc2024-036,q-gdiras-075]]`,
          texto: `- *S. aureus* é o agente mais comum, e sua resistência é desafio. {q-fmabc2024-036}
- O **aquecimento ativo** mantém a normotermia e reduz a ISC. {q-gdiras-003}
- A **hipotermia intraoperatória** moderada a grave aumenta a ISC. {q-gdiras-006}
- Sem risco aumentado: homem de 25 anos em hernioplastia inguinal. {q-gdiras-007}
- **Internação prévia com alta há mais de 3 meses** não é fator de risco. {q-gdiras-021}
- Normotermia e FiO2 de 80 % reduzem a ISC; o *S. aureus* é o principal agente; a profilaxia é **antes da incisão**. {q-gdiras-034}
- A **profilaxia** é medida de prevenção, não fator de risco. {q-gdiras-035}
- Idade acima de 65 anos e hiperglicemia: **fatores de risco**. {q-gdiras-037}
- Maior duração da cirurgia, tabagismo e imunossupressão. {q-gdiras-039}
- Tricotomia **2 dias antes** é medida que **não** se faz. {q-gdiras-050}
- Com prótese, ISC conta por **até um ano**. {q-gdiras-057}
- Primeiras etapas da ISC: **abrir e examinar** a ferida. {q-gdiras-071}
- Febre e fístula entérica no pós-operatório: a **normotermia** intraoperatória reduz ISC. {q-gdiras-073}
- ISC: superficial, profunda, de órgão ou espaço, até 30 dias (90 com prótese). {q-gdiras-075}
- A **drenagem abdominal de rotina** não reduz a infecção. {q-gdiras-076}
- Apendicectomia, ferida com dor, edema e hiperemia: **abrir a ferida e curativo por segunda intenção**. {q-gdiras-078}
- Fatores do paciente: obesidade, imunossupressão, transfusão, tabagismo, idade, neoplasia e esteroides. {q-gdiras-090}
- **Hipertermia** não é fator de risco. {q-gdiras-094}
- O agente mais frequente da ISC: ***S. aureus***. {q-gdiras-097}
- **Hipertensão** não é fator de risco. {q-gdiras-100}
- **Infância** não é fator de risco. {q-gdiras-104}
- ISC depois de colecistectomia com exploração: **manter normotermia**. {q-gdiras-109}
- Antisséptico de pele de menor taxa de infecção: **clorexidina**. {q-gdiras-116}
- Tricotomia: **evitar lâminas**. {q-gdiras-119}` },
        { id: "classificacao-feridas", titulo: "Classificação da ferida cirúrgica", conferir: true, diretrizes: ["anvisa-iras"],
          questoes: ["q-gdiras-048","q-gdiras-054","q-gdiras-060","q-gdiras-088","q-gdiras-089","q-gdiras-106","q-gdiras-117"],
          prosa: `[[A classe da cirurgia vem do **grau de contaminação**: **limpa** não abre vísceras (hernioplastia inguinal, tireoidectomia, bypass aortofemoral com prótese); **potencialmente contaminada** abre o trato de forma controlada (colecistectomia eletiva); **contaminada** tem **grande derramamento de conteúdo entérico** (perfuração de alça com perda de material); e **suja ou infectada** é a drenagem de abscesso (classe IV), que pede cefazolina com metronidazol; a **fratura exposta** não é cirurgia limpa.|q-gdiras-048,q-gdiras-088,q-gdiras-117,q-gdiras-106,q-gdiras-054,q-gdiras-060,q-gdiras-089]]`,
          texto: `- A cirurgia da hérnia inguinal é **limpa**, pois não abre vísceras. {q-gdiras-048,q-gdiras-088}
- Perfuração de alça com perda de grande quantidade de material entérico: **contaminada**. {q-gdiras-054}
- Abscesso perianal drenado: **suja e infectada (classe IV)**; cefazolina com metronidazol. {q-gdiras-060}
- **Redução de fratura exposta** não é cirurgia limpa. {q-gdiras-089}
- Colecistectomia eletiva: **potencialmente contaminada**. {q-gdiras-106}
- Bypass aortofemoral: **limpa**, com **profilaxia com cefazolina** (há prótese). {q-gdiras-117}` },
        { id: "profilaxia-regras", titulo: "Antibioticoprofilaxia: momento, dose, repique e duração", conferir: true, diretrizes: ["anvisa-iras"],
          figuras: [{ arquivo: "figuras/profilaxia-cirurgica.svg", legenda: "Esquema autoral: como dar, quando indicar e quando dispensar a profilaxia." }],
          questoes: ["q-gdiras-001","q-gdiras-004","q-gdiras-009","q-gdiras-010","q-gdiras-012","q-gdiras-013","q-gdiras-019","q-gdiras-020","q-gdiras-041","q-gdiras-053","q-gdiras-055","q-gdiras-064","q-gdiras-065","q-gdiras-077","q-gdiras-091","q-gdiras-103","q-gdiras-107","q-gdiras-110","q-gdiras-126"],
          prosa: `[[A profilaxia dá **concentração tecidual eficaz no momento da contaminação**, por isso se administra **até 1 hora antes da incisão (na indução anestésica)**, com antimicrobiano de **espectro estreito** (**cefazolina**), e **por curto período, limitada ao ato operatório**: **dias de antibiótico em casa não** reduzem a infecção e favorecem resistência; e a profilaxia **mal feita** (horário, dose, duração, fármaco) é **ineficaz e até prejudicial**; **tricotomia, preparo de cólon e antibiótico de largo espectro por 48 horas não são indispensáveis**.|q-gdiras-053,q-gdiras-064,q-gdiras-065,q-gdiras-091,q-gdiras-103,q-gdiras-012,q-gdiras-001,q-gdiras-107,q-gdiras-010,q-gdiras-013,q-gdiras-009]] [[A **dose se repete** na **cirurgia longa** (cerca de 4 horas para a cefazolina) e no **sangramento volumoso** (mais de 1.500 mL com reposição maciça), porque a perda e a hemodiluição baixam a concentração tecidual (o **repique** não é contraindicado); a **cesariana** recebe o antibiótico **antes da incisão**, e não depois do clampeamento do cordão; a **cirurgia limpa com prótese** também recebe; e a **colecistectomia com abertura acidental de vesícula** e bile normal **não pede doses extras**.|q-gdiras-019,q-gdiras-020,q-gdiras-041,q-gdiras-077,q-gdiras-110,q-gdiras-004,q-gdiras-126,q-gdiras-055]]`,
          texto: `- Colectomia de 4 horas sem contaminação fecal: **até 1 hora antes da incisão, repetindo a cada 2 ou 4 horas apenas durante o ato**. {q-gdiras-001}
- Profilaxia em cirurgia limpa **com prótese** é possível. {q-gdiras-004}
- Colectomia: tricotomia, preparo de cólon e antibiótico de largo espectro por 48 horas **não** são indispensáveis. {q-gdiras-009}
- Herniorrafia com prótese e abscesso dentário: **não** se afirma antibiótico por 2 dias em casa. {q-gdiras-010}
- Primeira dose por via venosa **na indução anestésica**. {q-gdiras-012}
- Profilaxia mal administrada é **ineficaz e pode prejudicar**. {q-gdiras-013}
- **Repetir** a dose em cirurgia longa. {q-gdiras-019}
- Gastrectomia com sangramento volumoso: **repetir a cefazolina agora**. {q-gdiras-020}
- Hepatectomia com sangramento e transfusão: o sangramento **pode ter reduzido a eficácia**. {q-gdiras-041}
- Melhor momento: **até 1 hora antes da cirurgia**. {q-gdiras-053,q-gdiras-064,q-gdiras-091,q-gdiras-103}
- Abertura acidental da vesícula com bile normal: **sem outras doses**. {q-gdiras-055}
- Operações abdominais eletivas: **dentro de 1 hora antes e por curto período**. {q-gdiras-065}
- Doses complementares **não** são contraindicadas (afirmar o contrário é o erro). {q-gdiras-077}
- O antibiótico profilático **não** deve ser de amplo espectro. {q-gdiras-107}
- Na cesariana o antibiótico é **antes da incisão** (não depois do clampeamento). {q-gdiras-110}
- "Nunca está indicada em cirurgias limpas" é **incorreto**. {q-gdiras-126}` },
        { id: "profilaxia-indicacoes", titulo: "Antibioticoprofilaxia: quando indicar e com qual droga", conferir: true, diretrizes: ["anvisa-iras"],
          questoes: ["q-gdiras-027","q-gdiras-028","q-gdiras-031","q-gdiras-032","q-gdiras-038","q-gdiras-040","q-gdiras-043","q-gdiras-046","q-gdiras-058","q-gdiras-059","q-gdiras-061","q-gdiras-080","q-gdiras-082","q-gdiras-092","q-gdiras-099","q-gdiras-101","q-gdiras-111","q-gdiras-112","q-gdiras-113","q-gdiras-118","q-gdiras-120","q-gdiras-124"],
          prosa: `[[A **prótese ou tela** muda a indicação: **hernioplastia com tela** (incisional em grandes hérnias, e a inguinal na maioria das provas), **cirurgia vascular com prótese**, **cardíaca**, **esplenectomia** e **craniotomia** recebem profilaxia; já **tireoidectomia por bócio, fundoplicatura, traqueostomia** e a **colecistectomia videolaparoscópica eletiva de baixo risco** podem dispensá-la; e a **hérnia com tela em baixo risco** é o ponto em que as provas divergem.|q-gdiras-040,q-gdiras-043,q-gdiras-058,q-gdiras-082,q-gdiras-092,q-gdiras-101,q-gdiras-113,q-gdiras-124,q-gdiras-038,q-gdiras-032,q-gdiras-099,q-gdiras-059]] [[A **droga** segue a flora do sítio: **cefazolina** é a base (colecistectomia, gastrectomia, drenagem de tórax em trauma), mas **no colorretal ela não basta**: soma-se **metronidazol** (ou cefalosporina com ação em anaeróbios, como a **cefoxitina**, que também serve à apendicectomia por 24 horas); na **apendicectomia** a profilaxia é feita **em todos os casos**; no **colorretal eletivo** o antibiótico **pós-operatório não é rotina**; e na **alergia grave a betalactâmicos** usa-se **clindamicina com gentamicina**.|q-gdiras-046,q-gdiras-028,q-gdiras-027,q-gdiras-118,q-gdiras-120,q-gdiras-112,q-gdiras-111,q-gdiras-031,q-gdiras-061,q-gdiras-080]]`,
          texto: `- Toracostomia em trauma em condições não estéreis: **cefazolina**. {q-gdiras-027}
- Gastrectomia subtotal com Y de Roux: **cefalosporina de 1ª geração**. {q-gdiras-028}
- Antibiótico pós-operatório em cólon eletivo: **caso a caso**, com a CCIH. {q-gdiras-031}
- **Traqueostomia** não tem profilaxia. {q-gdiras-032}
- **Fundoplicatura** não tem profilaxia. {q-gdiras-038}
- A única com indicação: **hernioplastia inguinal à Lichtenstein** (usa tela). {q-gdiras-040}
- Hernioplastia incisional com tela em grandes hérnias: **cefazolina**. {q-gdiras-043}
- Colecistectomia videolaparoscópica: **cefazolina** de primeira linha. {q-gdiras-046}
- Herniorrafia inguinal: **indicada** (a prova). {q-gdiras-058,q-gdiras-082}
- Hernioplastia com tela em paciente de **baixo risco**: **não indicada**. {q-gdiras-059}
- Alergia grave a betalactâmicos em colectomia: **clindamicina com gentamicina**. {q-gdiras-061}
- Histerectomia com alergia comprovada à penicilina: **clindamicina e gentamicina**. {q-gdiras-080}
- Cirurgia vascular com prótese: **indicar profilaxia**. {q-gdiras-092}
- Colecistectomia laparoscópica eletiva de baixo risco: profilaxia **questionável**. {q-gdiras-099}
- Esplenectomia, hernioplastia incisional, inguinal e cirurgia cardíaca: **indicação**. {q-gdiras-101}
- Apendicectomia por apendicite aguda: **em todos os casos**. {q-gdiras-111}
- Apendicectomia no adulto jovem: **cefoxitina por 24 horas**. {q-gdiras-112}
- Drenagem de hematoma intracraniano: **indicada**. {q-gdiras-113}
- **Cirurgia colorretal**: a cefazolina isolada não basta. {q-gdiras-118}
- Apendicectomia: cefazolina com metronidazol; colorretal: cobertura de anaeróbios. {q-gdiras-120}
- **Tireoidectomia total por bócio**: sem profilaxia. {q-gdiras-124}` },
      ],
    },
    {
      id: "dispositivos", titulo: "Cateter, pneumonia hospitalar e outras IRAS",
      introducao: `[[Os **cateteres venosos centrais** rompem a barreira da pele e levam à **infecção da corrente sanguínea**, cujo agente mais frequente é o **estafilococo coagulase-negativo**; a **pneumonia hospitalar** vem de aspiração e ventilação; e **todo caso de febre** em paciente com dispositivo pede procurar o foco.|q-gdiras-011,q-gdiras-084,q-sessp2026-021]]`,
      fragmentos: [
        { id: "cateter", titulo: "Infecção da corrente sanguínea associada ao cateter", conferir: true, diretrizes: ["idsa-cdi"],
          casos: ["q-usp2024-037","q-usp2026-055"],
          questoes: ["q-usp2024-037","q-usp2026-055","q-uspsp4-019","q-einstein2023-013","q-gdiras-002","q-gdiras-011","q-gdiras-045","q-gdiras-072","q-gdiras-084","q-gdiras-087","q-gdiras-096","q-gdiras-079"],
          prosa: `[[O agente mais frequente é o **estafilococo coagulase-negativo**; o **S. aureus nunca é contaminante** na hemocultura e exige tratamento por **pelo menos 2 semanas** (uma semana é o item incorreto), e, no dialítico com cateter de longa permanência e MRSA, **mantém-se a vancomicina**; a **candidemia** em paciente hospitalizado **sempre se trata**, qualquer que seja o número de amostras positivas.|q-gdiras-011,q-gdiras-084,q-usp2026-055,q-gdiras-096,q-gdiras-079]] [[Diante de **febre sem outro foco com cateter** (nutrição parenteral há 35 dias, 8º dia de UTI), **retira-se o cateter**, colhe-se **hemocultura** e se envia a ponta para cultura; no **choque com cateter há 12 dias**, retira-se o cateter e se inicia **vancomicina com meropenem**; o **sítio doloroso, hiperemiado e com secreção** pede **hemocultura e retirada**; a **cultura só da ponta** não distingue colonização, infecção e contaminação; o **tempo de permanência acima de 10 dias não é indicação de troca**; e a inserção exige **barreira máxima** (capote e luvas estéreis, gorro, máscara e campos).|q-usp2024-037,q-gdiras-002,q-uspsp4-019,q-einstein2023-013,q-gdiras-045,q-gdiras-072,q-gdiras-087]]`,
          texto: `- Nutrição parenteral há 35 dias e febre de 38,5 °C: **retirar o cateter e aguardar a hemocultura**. {q-usp2024-037}
- Dialítico com cateter e *S. aureus* resistente à oxacilina: **manter vancomicina**. {q-usp2026-055}
- Ventilação há 10 dias, cateter há 12 e febre com hipotensão: **vancomicina e meropenem; retirar o cateter**. {q-uspsp4-019}
- Cateter central há 6 dias com sítio doloroso e secreção: **hemocultura e remover o acesso**. {q-einstein2023-013}
- 8º dia de UTI com febre e leucocitose sem foco: **ICS por cateter; retirar com cultura**. {q-gdiras-002}
- Agente mais frequente: **estafilococo coagulase-negativo**. {q-gdiras-011,q-gdiras-084}
- Cultura apenas da ponta com *Acinetobacter*: colonização, infecção ou contaminação (todas). {q-gdiras-045}
- Tempo acima de 10 dias **não** indica troca. {q-gdiras-072}
- Barreira máxima: **capote e luva estéril, gorro, máscara e campos**. {q-gdiras-087}
- *S. aureus* requer **pelo menos 2 semanas** (uma semana é o erro). {q-gdiras-096}
- **Candidemia** em hospitalizado: **tratar sempre**. {q-gdiras-079}` },
        { id: "pneumonia-hospitalar", titulo: "Pneumonia hospitalar e associada à ventilação", conferir: true, diretrizes: ["anvisa-iras"],
          questoes: ["q-usp2026-019","q-sessp2024-009","q-sessp2026-021","q-fmabc2025-038","q-einstein2026-003"],
          prosa: `[[A **pneumonia do 8º dia de internação** em cardiopata recebe **piperacilina-tazobactam**; a **intubada que febrila no 4º dia com infiltrado novo** é **PAV** e se trata com **meropenem e vancomicina**; a **sonda nasoenteral** facilita **broncoaspiração e translocação bacteriana**; a **obesidade** não é fator de risco de PAV; e, na pneumonia hospitalar do 5º dia, o **painel molecular para vírus respiratórios não** muda a conduta.|q-usp2026-019,q-sessp2024-009,q-sessp2026-021,q-fmabc2025-038,q-einstein2026-003]]`,
          texto: `- IC descompensada com pneumonia no 8º dia: **piperacilina-tazobactam**. {q-usp2026-019}
- Intubada, febre no 4º dia e infiltrado novo: **meropenem e vancomicina; pneumonia nosocomial em ventilação**. {q-sessp2024-009}
- Sonda nasoenteral é fator de risco por **broncoaspiração e translocação**. {q-sessp2026-021}
- **Obesidade** não é fator de risco de PAV. {q-fmabc2025-038}
- No 5º dia com pneumonia hospitalar: painel molecular de vírus **não recomendado**. {q-einstein2026-003}` },
        { id: "outras-iras", titulo: "Outras situações de febre no paciente hospitalizado", conferir: true, diretrizes: ["anvisa-iras"],
          questoes: ["q-unesp2022-051","q-unicampdis2025-001"],
          prosa: `[[O paciente **neutropênico em quimioterapia intensa** com febre e foco (celulite perianal ou mucosite) recebe **antibiótico de amplo espectro antes de confirmar o diagnóstico**; já a **tosse seca isolada por menos de 3 semanas depois de infecção viral**, com exame normal, se conduz de modo **expectante, sem exames nem antibiótico**.|q-unesp2022-051,q-unicampdis2025-001]]`,
          texto: `- Linfoma no D14 de quimioterapia, febre e hiperemia: **antibiótico de amplo espectro antes da confirmação**. {q-unesp2022-051}
- Tosse seca há 18 dias depois de infecção viral, exame normal: **conduta expectante, sem antibiótico**. {q-unicampdis2025-001}` },
      ],
    },
    {
      id: "cdiff", titulo: "Colite por Clostridioides difficile",
      introducao: `[[O ***C. difficile***, bacilo formador de esporos, prolifera quando o **antibiótico desequilibra a flora intestinal** e produz **toxinas A e B** que lesam o cólon; **qualquer causa de alteração da flora** a favorece, mas o **antibiótico prévio** é o fator mais frequente (**clindamicina, cefalosporinas e quinolonas**), e a doença começa em geral **4 a 9 dias** depois.|q-gdiras-052,q-gdiras-123,q-gdiras-016,q-gdiras-025]]`,
      fragmentos: [
        { id: "cdiff-clinica", titulo: "Quadro, fatores de risco e diagnóstico", conferir: true, diretrizes: ["idsa-cdi"],
          questoes: ["q-scmsp2025-012","q-sessp2025-008","q-famema2022-032","q-gdiras-005","q-gdiras-015","q-gdiras-016","q-gdiras-047","q-gdiras-052","q-gdiras-063","q-gdiras-068","q-gdiras-081","q-gdiras-085","q-gdiras-093","q-gdiras-095","q-gdiras-115","q-gdiras-121","q-gdiras-123","q-gdiras-127"],
          prosa: `[[O quadro é **diarreia aquosa (10 ou mais evacuações), dor abdominal e febre** em paciente internado que usou antibiótico (**clindamicina no 5º dia, ceftriaxona por 12 a 14 dias, ciprofloxacino**), e se **suspende o antibiótico** quando possível e **pesquisam-se toxinas A e B** (ou PCR do gene da toxina, o de **maior sensibilidade**); o **antígeno GDH** é sensível, mas **não diferencia estirpes toxigênicas**, servindo de triagem; e a **toxina positiva sem diarreia** é **colonização, não se trata**.|q-gdiras-015,q-gdiras-047,q-gdiras-095,q-gdiras-115,q-gdiras-121,q-gdiras-063,q-gdiras-068,q-scmsp2025-012,q-sessp2025-008,q-famema2022-032]] [[Os **esporos sobrevivem muito tempo no ambiente** (a afirmação de que a sobrevida é efêmera é o erro); a infecção **adquirida na comunidade** tem **menos exposição hospitalar e antibiótico e mais uso de inibidor de bomba de prótons**; o **tabagismo** não é fator de risco; e a **diarreia febril aguda no HIV com CD4 de 380** tem a bactéria entérica comum e o **metronidazol** como droga da prova.|q-gdiras-005,q-gdiras-093,q-gdiras-081,q-gdiras-085,q-gdiras-127,q-gdiras-016]]`,
          texto: `- Toxina positiva em rastreamento, sem sintomas gastrointestinais: **não tratar** (colonização). {q-scmsp2025-012}
- Diarreia recorrente com febre baixa 2 semanas depois do ciprofloxacino: **pesquisa de *C. difficile* e vancomicina oral empírica**. {q-sessp2025-008}
- Idoso internado, pós-operatório, diarreia aquosa de 10 evacuações: **vancomicina oral**. {q-famema2022-032}
- Os esporos **não** têm sobrevida efêmera (a afirmativa é o erro). {q-gdiras-005}
- Diarreia aquosa, febre e dor no 5º dia de clindamicina: ***Clostridium difficile***. {q-gdiras-015}
- Classe **mais recentemente associada**: **quinolonas**. {q-gdiras-016}
- Diarreia, febre e dor depois de 12 dias de ceftriaxona e clindamicina: **pesquisa de toxinas A e B**. {q-gdiras-047,q-gdiras-095}
- Ocorre com a **alteração da flora intestinal**, qualquer que seja a causa. {q-gdiras-052}
- Exame de maior sensibilidade: **PCR para *C. difficile*** nas fezes. {q-gdiras-063}
- GDH é sensível, mas **não distingue a toxigenicidade**; serve de rastreio. {q-gdiras-068}
- **Tabagismo** não é fator de risco. {q-gdiras-081}
- Agente da colite pseudomembranosa: ***Clostridium difficile***. {q-gdiras-085}
- Comunitária × hospitalar: **uso de inibidor de bomba de prótons** é característico da comunitária. {q-gdiras-093}
- Diarreia aquosa após ceftriaxona: **toxina ou PCR**. {q-gdiras-115}
- Clindamicina por 5 dias com 10 evacuações: **suspender o antibiótico e pesquisar a toxina**. {q-gdiras-121}
- Fator de risco mais frequente: **antibioticoterapia prévia**. {q-gdiras-123}
- HIV com CD4 de 380, diarreia aquosa aguda: **metronidazol** (a prova). {q-gdiras-127}` },
        { id: "cdiff-tratamento", titulo: "Tratamento e recorrência", conferir: true, diretrizes: ["idsa-cdi"],
          questoes: ["q-gdiras-018","q-gdiras-022","q-gdiras-025","q-gdiras-044","q-gdiras-049","q-gdiras-056","q-gdiras-062","q-gdiras-122"],
          prosa: `[[A **vancomicina oral** (125 a 500 mg a cada 6 horas) é o tratamento da colite grave, junto de **metronidazol venoso** nos casos mais graves (ou como alternativa ao metronidazol, nas provas antigas); a **fidaxomicina** é antibiótico novo aprovado para a doença; a **linezolida (oxazolidinona)** não é primeira escolha; e o **transplante de microbiota fecal** tem a evidência mais forte nos **casos recorrentes**.|q-gdiras-056,q-gdiras-122,q-gdiras-018,q-gdiras-044,q-gdiras-062,q-gdiras-022,q-gdiras-025,q-gdiras-049]]`,
          texto: `- Diarreia após 4 semanas de ciprofloxacino e clindamicina: **metronidazol venoso mais vancomicina oral**. {q-gdiras-018}
- **Oxazolidinonas** não são primeira escolha na colite. {q-gdiras-022}
- **Transplante de microbiota fecal** nos casos recorrentes. {q-gdiras-025,q-gdiras-049}
- **Fidaxomicina** é um dos antibióticos do tratamento. {q-gdiras-044,q-gdiras-062}
- Idoso com mais de 10 evacuações: colite grave; **vancomicina oral 125 a 500 mg a cada 6 horas**. {q-gdiras-056}
- Tratamento habitual: **metronidazol ou vancomicina**. {q-gdiras-122}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual (textos antigos de profilaxia cirúrgica e de colite). Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-gdiras-058","q-gdiras-082","q-gdiras-059","q-gdiras-040","q-gdiras-049","q-gdiras-127","q-gdiras-018","q-gdiras-122","q-gdiras-012","q-gdiras-001"],
          prosa: `[[**Hernioplastia com tela**: a regra moderna é **não dar profilaxia em baixo risco** (gdiras-059), mas as provas deram **herniorrafia inguinal como a única com indicação** (gdiras-040, 058 e 082).|q-gdiras-059,q-gdiras-040,q-gdiras-058,q-gdiras-082]] [[**Colite por *C. difficile***: a regra atual é **vancomicina oral (ou fidaxomicina)**; a prova antiga deu **metronidazol** (gdiras-127, em HIV com CD4 de 380) e **metronidazol venoso com vancomicina oral** (gdiras-018) e "metronidazol ou vancomicina" (gdiras-122).|q-gdiras-127,q-gdiras-018,q-gdiras-122,q-gdiras-049]] [[**Momento da profilaxia**: a regra é **até 1 hora antes da incisão**; a prova (gdiras-012) disse "na indução" e a (gdiras-001) "até uma hora antes, com repetição a cada 2 ou 4 horas".|q-gdiras-012,q-gdiras-001]]`,
          texto: `- Regra moderna: sem profilaxia na hérnia com tela de baixo risco; as provas deram a herniorrafia inguinal como indicada. {q-gdiras-059,q-gdiras-040,q-gdiras-058,q-gdiras-082}
- Regra atual: vancomicina oral ou fidaxomicina; a prova antiga deu metronidazol. {q-gdiras-127,q-gdiras-018,q-gdiras-122}
- Regra: até 1 hora antes da incisão; a prova usou "na indução". {q-gdiras-012,q-gdiras-001}
- Transplante fecal: evidência forte só na recorrência. {q-gdiras-049}` },
      ],
    },
  ],
});
