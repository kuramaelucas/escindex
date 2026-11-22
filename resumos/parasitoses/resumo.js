/* resumos/parasitoses/resumo.js — resumo adaptativo de parasitoses intestinais e esquistossomose: helmintos (ciclo pulmonar, ascaridíase,
   ancilostomíase, tricuríase, enterobíase, estrongiloidíase, larva migrans, toxocaríase), protozoários (giardíase, amebíase),
   cestódeos e esquistossomose (formas aguda e hepatoesplênica).
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- parasitoses */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "parasitoses",
  titulo: "Parasitoses intestinais e esquistossomose",
  assunto: "ass-parasitoses",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "ms-parasitoses", texto: "Ministério da Saúde — Guia de Vigilância em Saúde (geo-helmintíases, esquistossomose, amebíase, giardíase) e orientações de tratamento e controle das helmintíases", lidoEm: null },
    { id: "sbp-parasitoses", texto: "Sociedade Brasileira de Pediatria — Parasitoses intestinais na infância: diagnóstico e tratamento", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "anuladas pela banca (gabarito do material de origem em desacordo com a literatura, alternativas idênticas ou duas respostas aceitáveis)", questoes: ["q-gdparasitoses-005","q-gdparasitoses-053","q-gdparasitoses-056","q-gdparasitoses-066","q-gdparasitoses-072","q-gdparasitoses-128","q-gdparasitoses-150"] },
  ],
  doencas: [
    {
      id: "helmintos", titulo: "Helmintíases intestinais",
      introducao: `Os **geo-helmintos** (*Ascaris*, ancilostomídeos, *Trichuris*) completam parte do ciclo no solo e são **doenças negligenciadas**, ligadas a pobreza e falta de saneamento. [[A **carga parasitária** é o fator decisivo para o dano, e o que separa os vermes é **como entram** (ovo ingerido ou larva que fura a pele) e **se passam pelo pulmão** (as larvas de *Ascaris*, ancilostomídeos e *Strongyloides* sim; *Trichuris* e *Enterobius* não).|q-gdparasitoses-008,q-gdparasitoses-117,q-gdparasitoses-130,q-gdparasitoses-047]]

Veja também: **Pneumonia, bronquiolite e coqueluche na criança** (Löffler que imita pneumonia), **Diarreia e desidratação**, **Infecções da pele** (larva migrans), **Cirrose** e **Hipertensão portal** (esquistossomose).`,
      fragmentos: [
        { id: "epid-tratamento", titulo: "Controle, tratamento em massa e princípios de tratamento", conferir: true, diretrizes: ["ms-parasitoses"],
          questoes: ["q-famema2022-096","q-gdparasitoses-008","q-gdparasitoses-022","q-gdparasitoses-023","q-gdparasitoses-027","q-gdparasitoses-034","q-gdparasitoses-054","q-gdparasitoses-086","q-gdparasitoses-140","q-gdparasitoses-012","q-gdparasitoses-117","q-gdparasitoses-049","q-gdparasitoses-090","q-gdparasitoses-111","q-gdparasitoses-110","q-gdparasitoses-165","q-amrigs2021-006"],
          figuras: [{ arquivo: "figuras/helmintos-ciclos.svg", legenda: "Esquema autoral: como cada helminto entra, se passa pelo pulmão e como se trata." }],
          prosa: `[[O **controle das helmintíases** segue a prevalência: em regiões de **baixa prevalência (menos de 20 %)** o tratamento é **individualizado**; o **tratamento periódico de comunidades vulneráveis**, junto com higiene e saneamento, **diminui a prevalência**; e a **infecção mais comum do mundo** é a cárie, não uma parasitose.|q-famema2022-096,q-gdparasitoses-027,q-gdparasitoses-008,q-gdparasitoses-022]] [[O **albendazol 400 mg em dose única** trata **ascaridíase, enterobíase e ancilostomíase**; a **nitazoxanida por 3 dias** é o antiparasitário de **amplo espectro** (helmintos e protozoários) quando se suspeita de vários agentes; a **ivermectina** trata estrongiloidíase (e oncocercose, filariose, ascaridíase, pediculose); o **albendazol não trata amebíase**, que pede nitroimidazólico; e no **poliparasitismo** tratam-se **primeiro os vermes com potencial de migração** (como o *Ascaris*) e se eliminam os migradores antes de **anestesia, quimioterapia ou corticoide**.|q-gdparasitoses-034,q-gdparasitoses-012,q-amrigs2021-006,q-gdparasitoses-086,q-gdparasitoses-090,q-gdparasitoses-111,q-gdparasitoses-110,q-gdparasitoses-140,q-gdparasitoses-054]] [[A **eosinofilia intensa** acompanha as helmintíases com **fase tecidual**; o **Enterobius** não a causa; e as amebas **comensais** (*Endolimax nana*, *Entamoeba dispar*) **não** são patogênicas nem pedem tratamento.|q-gdparasitoses-165,q-gdparasitoses-117,q-gdparasitoses-049,q-gdparasitoses-023]]`,
          texto: `- Geo-helmintíases são **doenças negligenciadas** da OMS e acometem populações pobres. {q-gdparasitoses-008}
- Profilaxia **individualizada** em regiões de **baixa prevalência (< 20 %)**. {q-famema2022-096}
- A **infecção mais comum do mundo** é a **cárie**. {q-gdparasitoses-022}
- ***Strongyloides* é nematódeo**, não protozoário. {q-gdparasitoses-023}
- **Tratamento periódico de comunidades vulneráveis** com higiene reduz a prevalência. {q-gdparasitoses-027}
- Albendazol 400 mg em dose única: **ascaridíase, enterobíase, ancilostomíase**. {q-gdparasitoses-034}
- A **oxaminiquina** não é tratamento da ascaridíase (item errado). {q-gdparasitoses-054}
- Albendazol **não** trata amebíase. {q-gdparasitoses-086}
- Poliparasitismo: tratar **primeiro os migradores**; amplo espectro; eliminar migradores antes de anestesia ou quimioterapia. {q-gdparasitoses-140}
- Anemia moderada com eosinofilia e suspeita de várias parasitoses: **nitazoxanida por 3 dias**. {q-gdparasitoses-012}
- A **carga parasitária** é decisiva (afirmar o contrário é o erro). {q-gdparasitoses-117}
- Amebas comensais *Endolimax nana* e *Entamoeba dispar* **não** exigem tratamento. {q-gdparasitoses-049}
- Combinações: **albendazol–ascaridíase, metronidazol–amebíase, mebendazol–enterobíase, praziquantel–teníase, ivermectina–estrongiloidíase**. {q-gdparasitoses-090,q-gdparasitoses-111}
- Ascaris, *Strongyloides* e *Giardia*: **albendazol, ivermectina e tinidazol**, respectivamente. {q-gdparasitoses-110}
- Helminto com ovos nas fezes em área sem saneamento: **eosinofilia intensa**. {q-gdparasitoses-165}
- **Ivermectina**: estrongiloidíase, oncocercose, filariose, ascaridíase e pediculose. {q-amrigs2021-006}` },
        { id: "ciclo-pulmonar", titulo: "Ciclo pulmonar e síndrome de Löffler", conferir: true, diretrizes: ["ms-parasitoses"],
          questoes: ["q-tp20212-055","q-gdparasitoses-002","q-gdparasitoses-013","q-gdparasitoses-018","q-gdparasitoses-030","q-gdparasitoses-036","q-gdparasitoses-037","q-gdparasitoses-038","q-gdparasitoses-047","q-gdparasitoses-051","q-gdparasitoses-052","q-gdparasitoses-061","q-gdparasitoses-083","q-gdparasitoses-103","q-gdparasitoses-106","q-gdparasitoses-112","q-gdparasitoses-130","q-unesp2022-015","q-gdparasitoses-115","q-gdparasitoses-120","q-gdparasitoses-080","q-gdparasitoses-102"],
          prosa: `[[A **síndrome de Löffler** é uma **pneumonite eosinofílica transitória por hipersensibilidade** à **passagem das larvas pelo pulmão**: **tosse seca, sibilos, infiltrado pulmonar migratório (que muda de lobo a cada radiografia) e eosinofilia**; vem de ***Ascaris*, ancilostomídeos (*Necator*, *Ancylostoma duodenale*) e *Strongyloides***, e **não do *Enterobius*** nem da *Giardia* (protozoário), e a criança com "pneumonia" de um mês que **não melhora com antibióticos** deve levantar essa hipótese.|q-gdparasitoses-002,q-gdparasitoses-013,q-gdparasitoses-036,q-gdparasitoses-037,q-gdparasitoses-047,q-gdparasitoses-051,q-gdparasitoses-052,q-gdparasitoses-083,q-gdparasitoses-103,q-gdparasitoses-106,q-gdparasitoses-112,q-gdparasitoses-130,q-tp20212-055,q-gdparasitoses-038,q-gdparasitoses-018,q-gdparasitoses-030,q-gdparasitoses-061]] [[A **eosinofilia** é causada pelos helmintos de fase tecidual, e **não** pelo ***Enterobius***, que vive na luz do intestino; o *Strongyloides* e o *Enterobius* aparecem juntos como "causas de eosinofilia" numa prova antiga, e **anemia** liga-se à ancilostomíase e **eosinofilia** à ascaridíase.|q-gdparasitoses-120,q-unesp2022-015,q-gdparasitoses-115]]`,
          texto: `- Pré-escolar com "pneumonia" há 30 dias sem melhora com três antibióticos: **síndrome de Löffler**. {q-tp20212-055}
- Löffler: **ancilostomídeos, *Strongyloides* e *Ascaris***. {q-gdparasitoses-002}
- Ascaris, ancilostomídeo e *Strongyloides* têm **ciclo pulmonar**. {q-gdparasitoses-013,q-gdparasitoses-130}
- Verme cilíndrico nas fezes, tosse seca, sibilos e eosinofilia: **ascaridíase com Löffler; albendazol**. {q-gdparasitoses-018}
- Criança de 4 anos, sibilos, infiltrado bilateral, eosinofilia de 18 %: **Löffler; albendazol por 3 dias**. {q-gdparasitoses-030}
- Com ciclo pulmonar: ***Ascaris* e *Strongyloides***. {q-gdparasitoses-036}
- A parasitose com ciclo pulmonar é a **ascaridíase**. {q-gdparasitoses-037}
- Infiltrados que **mudam de lobo** na radiografia durante um mês: **Löffler**. {q-gdparasitoses-038}
- Todos passam pelo pulmão, **exceto a *Giardia***. {q-gdparasitoses-047}
- Pneumonia eosinofílica migratória: ***Strongyloides***. {q-gdparasitoses-051}
- Löffler: **ascaridíase e estrongiloidíase**. {q-gdparasitoses-052}
- Criança rural com tosse, febre baixa e infiltrados fugazes: ***Ascaris lumbricoides***. {q-gdparasitoses-061}
- Agentes da Löffler, **exceto o *Enterobius***. {q-gdparasitoses-083}
- Ciclo pulmonar obrigatório: ***Strongyloides* e *Ancylostoma duodenale***. {q-gdparasitoses-103}
- Ascaris e *Strongyloides* têm manifestações pulmonares parecidas com a Löffler. {q-gdparasitoses-106}
- Löffler: ***Strongyloides* e *Necator americanus***. {q-gdparasitoses-112}
- A eosinofilia **não** é causada pelo *Enterobius*. {q-gdparasitoses-120}
- Löffler é pneumonia eosinofílica por larvas de helmintos como o *Ascaris* (item certo). {q-gdparasitoses-080}
- Corretas: *S. stercoralis* entra pela pele; ancilostomídeos dão dermatite, pneumonite e anemia; protozoários, por cistos; enterobíase em clima temperado; o *Trichuris* se transmite por **ovos**, não por larva pela pele. {q-gdparasitoses-102}
- **Anemia** (ancilostomíase) e **eosinofilia** (ascaridíase). {q-gdparasitoses-115}
- Eosinofilia associada a *Strongyloides* e *Enterobius* (a prova). {q-unesp2022-015}` },
        { id: "ascaridiase", titulo: "Ascaridíase", conferir: true, diretrizes: ["ms-parasitoses"],
          questoes: ["q-tp20231-054","q-udisc20262-028","q-gdparasitoses-017","q-gdparasitoses-045","q-gdparasitoses-133","q-gdparasitoses-145","q-gdparasitoses-155","q-gdparasitoses-156","q-gdparasitoses-077","q-gdparasitoses-105","q-gdparasitoses-042","q-gdparasitoses-138","q-gdparasitoses-046","q-unicamp2022-035"],
          prosa: `[[O ***Ascaris lumbricoides*** é a **helmintíase mais prevalente**, transmitida pela **ingestão de ovos embrionados** (solo, hortaliças, frutas e água contaminadas por esgoto); o verme adulto vive no **intestino delgado**; a **principal complicação é a oclusão intestinal por novelo de vermes** (e a **migração para a via biliar e o pâncreas**, que dá pancreatite com dor epigástrica irradiada para o dorso), e o tratamento é **albendazol** (ou mebendazol).|q-gdparasitoses-156,q-udisc20262-028,q-gdparasitoses-017,q-gdparasitoses-155,q-gdparasitoses-133,q-tp20231-054,q-gdparasitoses-045,q-gdparasitoses-077,q-gdparasitoses-145]] [[As associações clássicas são **ascaridíase com tosse e consolidação pulmonar (Löffler)** e suboclusão, **tricuríase com disenteria e prolapso**, **giardíase com esteatorreia** e **ancilostomíase com anemia**; e o parasitológico é **negativo** quando só há **vermes machos**.|q-gdparasitoses-105,q-gdparasitoses-042,q-gdparasitoses-138,q-gdparasitoses-046,q-unicamp2022-035,q-gdparasitoses-145]]`,
          texto: `- Criança com dor epigástrica irradiada ao dorso, amilase alta, hipocalcemia e hipoglicemia: ***Ascaris lumbricoides*** (pancreatite). {q-tp20231-054}
- Os ovos estão no **solo, em hortaliças, frutas e água** contaminados com fezes. {q-udisc20262-028}
- Ascaridíase e amebíase se transmitem por **alimentos vegetais e água** contaminados. {q-gdparasitoses-017}
- Vômitos com Ascaris, distensão e parada de fezes: **suboclusão; mebendazol em solução**. {q-gdparasitoses-045}
- Adultos vivem no **intestino delgado**. {q-gdparasitoses-155}
- Helmintíase mais prevalente na infância, por **ingestão de ovos**: **ascaridíase**. {q-gdparasitoses-156}
- **Principal complicação**: oclusão intestinal. {q-gdparasitoses-133}
- Vermes eliminados pelo vômito, sem sinais de obstrução: **albendazol 400 mg em dose única** (ou mebendazol por 3 dias). {q-gdparasitoses-077}
- Dor abdominal, lordose e protrusão, depois broncoespasmo: **ascaridíase; parasitológico negativo se só houver vermes machos**. {q-gdparasitoses-145}
- Ascaris-tosse e consolidação; Enterobius-vulvovaginite; Giardia-esteatorreia; Trichuris-prolapso. {q-gdparasitoses-105}
- Esteatorreia–giardíase; prolapso–tricuríase; anemia–ancilostomíase; hiperinfecção–estrongiloidíase; obstrução–ascaridíase (5/3/2/4/1). {q-gdparasitoses-042}
- Prolapso e enterorragia–*Trichuris*; prurido anal–*Enterobius*; anemia–ancilostomíase; bacteremia por Gram-negativos–*Strongyloides*. {q-gdparasitoses-138}
- **Tricuríase não** causa prurido anal noturno (é da enterobíase). {q-gdparasitoses-046}
- Ascaris-suboclusão e cada parasita com a complicação típica. {q-unicamp2022-035}` },
        { id: "ancilo-tricuriase", titulo: "Ancilostomíase e tricuríase", conferir: true, diretrizes: ["ms-parasitoses"],
          questoes: ["q-famema2025-080","q-adap24-014","q-simepm89-096","q-fmabc2022-043","q-gdparasitoses-003","q-gdparasitoses-025","q-gdparasitoses-028","q-gdparasitoses-029","q-gdparasitoses-032","q-gdparasitoses-035","q-gdparasitoses-040","q-gdparasitoses-050","q-gdparasitoses-057","q-gdparasitoses-064","q-gdparasitoses-094","q-gdparasitoses-096","q-gdparasitoses-098","q-gdparasitoses-100","q-gdparasitoses-125"],
          prosa: `[[A **ancilostomíase** ("amarelão") se adquire pela **penetração da larva pela pele** de quem anda **descalço em solo contaminado** (e não por ovos ingeridos); o verme se fixa na mucosa do duodeno e **suga sangue**, o que causa **anemia ferropriva, hipoproteinemia e desnutrição**, com tosse pela passagem pulmonar; o tratamento é **albendazol 400 mg**.|q-famema2025-080,q-gdparasitoses-096,q-gdparasitoses-064,q-gdparasitoses-025,q-gdparasitoses-029,q-gdparasitoses-028,q-gdparasitoses-057]] [[A **tricuríase** vive no **ceco e cólon ascendente** e, na **infestação maciça** (lactente desnutrido, criança em moradia sem saneamento), dá **diarreia crônica ou disenteria com sangue e muco, tenesmo, anemia microcítica e prolapso retal**; trata-se com **albendazol** ou **mebendazol**.|q-gdparasitoses-032,q-gdparasitoses-035,q-gdparasitoses-040,q-gdparasitoses-050,q-gdparasitoses-094,q-gdparasitoses-098,q-gdparasitoses-100,q-simepm89-096,q-fmabc2022-043,q-adap24-014,q-gdparasitoses-003]]`,
          texto: `- "Amarelão" se contrai pela **penetração das larvas pela pele** de quem anda descalço. {q-famema2025-080}
- Criança descalça com diarreia mucossanguinolenta há 8 meses, tenesmo e piora do ganho: **tricuríase**. {q-adap24-014}
- Lesões no cólon até o reto, enterorragia e **prolapso retal**, em lactentes desnutridos: ***Trichocephalus trichiurus***. {q-simepm89-096}
- Menino de 5 anos em ocupação sem saneamento, disenteria recorrente: **tricuríase**. {q-fmabc2022-043}
- Só a afirmativa II (tricuríase maciça: diarreia sanguinolenta e prolapso) é correta. {q-gdparasitoses-003}
- Palestra sobre ancilostomíase: **anemia e desnutrição**. {q-gdparasitoses-025}
- Tosse, dor abdominal recorrente e anemia em pré-escolar: **ancilostomíase**. {q-gdparasitoses-028}
- Ancilostomíase causa **anemia e hipoproteinemia**. {q-gdparasitoses-029}
- *Trichuris* se localiza no **ceco e cólon ascendente** e trata-se com mebendazol. {q-gdparasitoses-032}
- Diarreia crônica com **tenesmo e prolapso retal**: tricuríase. {q-gdparasitoses-035}
- Prolapso retal em infestação maciça: ***Trichuris trichiura***. {q-gdparasitoses-040,q-gdparasitoses-050}
- Morador do campo com astenia, palidez e diarreia: **albendazol 400 mg**. {q-gdparasitoses-057}
- A ancilostomíase **não** se adquire por ovos deglutidos (a afirmativa é a incorreta). {q-gdparasitoses-064}
- Diarreia crônica com sangue, prolapso e anemia microcítica: ***Trichocephalus***. {q-gdparasitoses-094}
- Transmissão da ancilostomíase: **contato com o solo contaminado**. {q-gdparasitoses-096}
- Disenteria crônica, prolapso e anemia: ***Trichuris trichiura***. {q-gdparasitoses-098}
- *Trichuris trichiura* é **nematódeo** (helminto), não protozoário (item errado). {q-gdparasitoses-125}
- Prolapso retal e sangue nas fezes em criança de 5 anos: **albendazol**. {q-gdparasitoses-100}` },
        { id: "enterobiase", titulo: "Enterobíase (oxiurose)", conferir: true, diretrizes: ["ms-parasitoses"],
          questoes: ["q-sessp2023-026","q-gdparasitoses-007","q-gdparasitoses-011","q-gdparasitoses-015","q-gdparasitoses-016","q-gdparasitoses-019","q-gdparasitoses-055","q-gdparasitoses-062","q-gdparasitoses-068","q-gdparasitoses-070","q-gdparasitoses-088","q-gdparasitoses-097","q-gdparasitoses-113","q-gdparasitoses-137","q-gdparasitoses-158"],
          prosa: `[[A fêmea do ***Enterobius vermicularis*** põe os ovos **na região perianal à noite**, e o **prurido anal noturno** (que acorda a criança, causa irritabilidade e sono agitado) é a marca; o **homem é o único reservatório**, os ovos resistem cerca de **3 semanas** no ambiente da casa, a **autoinfecção e o contágio familiar** são comuns e o clima **temperado** favorece; a fêmea migra até a **vulva** e causa **vulvovaginite, corrimento e disúria**, e a **apendicite** é complicação possível.|q-gdparasitoses-062,q-gdparasitoses-070,q-gdparasitoses-097,q-gdparasitoses-088,q-sessp2023-026,q-gdparasitoses-007,q-gdparasitoses-137,q-gdparasitoses-158,q-gdparasitoses-068,q-gdparasitoses-011,q-gdparasitoses-015,q-gdparasitoses-016]] [[O diagnóstico é pela **fita gomada** (swab anal), pois o **parasitológico de fezes costuma ser negativo**; o tratamento é **albendazol, mebendazol ou pamoato de pirantel em dose única, repetida em 2 semanas**, tratando a **família**, e o **pamoato de pirvínio** é específico da oxiurose.|q-gdparasitoses-113,q-gdparasitoses-055,q-gdparasitoses-015,q-gdparasitoses-016,q-gdparasitoses-019,q-gdparasitoses-011]]`,
          texto: `- Menina de 7 anos com corrimento e prurido anal noturno que acorda: ***Enterobius vermicularis***. {q-sessp2023-026}
- Menina de 4 anos com corrimento, prurido anal noturno e disúria: ***Enterobius***. {q-gdparasitoses-007}
- Lactente com prurido anal: **pamoato de pirvínio em dose única, repetida em 14 dias**. {q-gdparasitoses-011}
- Dois irmãos com prurido anal noturno: **albendazol e pamoato de pirvínio**. {q-gdparasitoses-015,q-gdparasitoses-016}
- O pamoato de pirvínio é específico da **oxiuríase**. {q-gdparasitoses-019}
- Enterobíase: **pirantel, mebendazol ou albendazol**, dose única, repetida em duas semanas. {q-gdparasitoses-055}
- Vermes finos como fio na região perianal e sono conturbado: **ovo, deglutição, intestino grosso**. {q-gdparasitoses-062}
- Menina de 3 anos com prurido anal noturno e verme na região anal: **enterobíase**. {q-gdparasitoses-068}
- Causada pelo *Enterobius vermicularis*, tem o **homem** como reservatório; ovos resistem **três semanas**. {q-gdparasitoses-070}
- Lactente irritável à noite e irmão com prurido: **pode ocorrer apendicite**. {q-gdparasitoses-088}
- Helmintíase mais comum em clima temperado, com autoinfecção e contágio familiar: **enterobíase**. {q-gdparasitoses-097}
- O diagnóstico **não** é pelo parasitológico de fezes (afirmativa incorreta); usa-se a **fita gomada**. {q-gdparasitoses-113}
- Criança de creche com prurido perianal noturno e secreção vaginal: ***Enterobius vermicularis***. {q-gdparasitoses-137}
- Ardor ao urinar, prurido anal e vulva hiperemiada: **oxiuríase**. {q-gdparasitoses-158}` },
        { id: "estrongiloidiase", titulo: "Estrongiloidíase e hiperinfecção", conferir: true, diretrizes: ["ms-parasitoses"],
          questoes: ["q-adap21-116","q-gdparasitoses-010","q-gdparasitoses-026","q-gdparasitoses-033","q-gdparasitoses-069","q-gdparasitoses-085","q-gdparasitoses-087","q-gdparasitoses-092","q-gdparasitoses-126","q-gdparasitoses-194"],
          prosa: `[[O ***Strongyloides stercoralis*** entra por **penetração percutânea** da larva filarioide, passa pelo pulmão (tosse, sibilos, infiltrado e **eosinofilia**) e **faz autoinfecção** no intestino; na pele deixa a **larva currens** (lesão linear serpiginosa, pruriginosa, em nádegas e região perianal); com **corticoide ou imunossupressão** a autoinfecção se acelera e dá a **síndrome de hiperinfecção**, em que as larvas migram em massa e **carregam bactérias entéricas** (bacteremia por Gram-negativos, púrpura periumbilical, hemorragia alveolar).|q-gdparasitoses-087,q-gdparasitoses-069,q-gdparasitoses-010,q-gdparasitoses-026,q-gdparasitoses-085,q-gdparasitoses-033,q-gdparasitoses-092]] [[A **pesquisa de larvas** se faz pelo método de **Baermann-Moraes** (hidrotropismo e termotropismo), e não pelo exame direto; o tratamento é **ivermectina em dose única** (a prova antiga deu tiabendazol), e antes de iniciar **corticoide ou imunossupressor** em quem tem larvas, **trata-se a estrongiloidíase antes ou junto**.|q-gdparasitoses-126,q-gdparasitoses-194,q-adap21-116,q-gdparasitoses-010,q-gdparasitoses-026,q-gdparasitoses-085]]`,
          texto: `- Lavrador com sarcoidose que vai iniciar prednisona 40 mg, diarreia e lesões serpiginosas: **tratar a estrongiloidíase com ivermectina antes ou junto do corticoide**. {q-adap21-116}
- Pré-escolar com tosse, sibilos, infiltrado hilar e eosinofilia de 25 %: ***Strongyloides*, tiabendazol** (a prova). {q-gdparasitoses-010,q-gdparasitoses-026,q-gdparasitoses-085}
- Transplantado com febre, hemorragia alveolar e bacteremia: **hiperinfecção por estrongiloide**. {q-gdparasitoses-033}
- Lesões em linhas serpiginosas nas nádegas, esteatorreia e tosse: ***Strongyloides stercoralis***. {q-gdparasitoses-069}
- Transmissão **percutânea**: ***Strongyloides***. {q-gdparasitoses-087}
- Pulsoterapia com corticoide e lesões em larva currens: **hiperinfecção por *Strongyloides***. {q-gdparasitoses-092}
- **Baermann-Moraes** pesquisa larvas de *Strongyloides*. {q-gdparasitoses-126}
- O método de escolha para larvas **não** é o exame de fezes direto (item errado). {q-gdparasitoses-194}` },
        { id: "larva-migrans", titulo: "Larva migrans cutânea e toxocaríase", conferir: true, diretrizes: ["sbp-parasitoses"],
          casos: ["q-tp20232-057","q-tp20241-057","q-unicamp2023-033"],
          questoes: ["q-tp20232-057","q-tp20241-057","q-unicamp2023-033","q-gdparasitoses-079","q-gdparasitoses-004","q-gdparasitoses-039","q-gdparasitoses-084","q-gdparasitoses-135","q-gdparasitoses-148"],
          prosa: `[[A **larva migrans cutânea** ("bicho geográfico") vem de larvas de ***Ancylostoma braziliensis*** (de cães e gatos, adquiridas na areia) que **migram sem completar o ciclo**: lesão **eritematosa, serpiginosa, pruriginosa e de borda elevada** no pé, mão ou nádegas; o tratamento é **ivermectina em dose única (200 µg/kg)** ou albendazol, e a **larva migrans não é do *A. duodenale***.|q-tp20232-057,q-tp20241-057,q-unicamp2023-033,q-gdparasitoses-079]] [[A **toxocaríase visceral** (larva migrans visceral, por ovos de *Toxocara*) é a "pneumonia" de **semanas** da criança pequena com **febre, tosse, sibilos sem atopia, hepatomegalia, palidez e leucocitose com eosinofilia** de 65 %, que não melhora com antibiótico nem broncodilatador.|q-gdparasitoses-004,q-gdparasitoses-039,q-gdparasitoses-084,q-gdparasitoses-135,q-gdparasitoses-148]]`,
          texto: `- Lesão eritematosa serpiginosa de borda elevada no pé: **ivermectina 200 µg/kg em dose única**. {q-tp20232-057}
- Prurido e lesão "em túnel" na região tenar depois de viagem ao litoral: **albendazol**. {q-tp20241-057}
- Lesão linear serpiginosa no dorso do pé: ***Ancylostoma braziliensis***. {q-unicamp2023-033}
- A larva migrans **não** é provocada pelo *A. duodenale* (item errado). {q-gdparasitoses-079}
- Febre e tosse há um mês, sibilos, hepatomegalia, 50.000 leucócitos e 65 % de eosinófilos: **toxocaríase**. {q-gdparasitoses-004,q-gdparasitoses-039,q-gdparasitoses-084,q-gdparasitoses-148}
- Criança de 3 anos com febre, dor abdominal, sibilos sem atopia, hepatomegalia e palidez: **toxocaríase**. {q-gdparasitoses-135}` },
      ],
    },
    {
      id: "protozoarios", titulo: "Protozoários e cestódeos",
      introducao: `[[A **giardíase** é infecção **não invasiva** do duodeno e jejuno (por cistos em água e alimentos), e a **amebíase** é a que **invade** a mucosa do cólon e pode formar **abscesso hepático**; a **teníase** vem da carne mal cozida e a **cisticercose** da ingestão de ovos de *Taenia solium*.|q-gdparasitoses-131,q-gdparasitoses-152,q-gdparasitoses-082]]`,
      fragmentos: [
        { id: "giardiase", titulo: "Giardíase", conferir: true, diretrizes: ["sbp-parasitoses"],
          questoes: ["q-usp2026-086","q-gdparasitoses-001","q-gdparasitoses-014","q-gdparasitoses-024","q-gdparasitoses-031","q-gdparasitoses-043","q-gdparasitoses-044","q-gdparasitoses-059","q-gdparasitoses-091","q-gdparasitoses-107","q-gdparasitoses-149","q-gdparasitoses-151","q-gdparasitoses-154","q-gdparasitoses-157","q-gdparasitoses-164","q-gdparasitoses-168","q-gdparasitoses-131"],
          prosa: `[[A ***Giardia lamblia*** (protozoário) adere à **borda em escova do duodeno** e causa **má absorção sem invasão**: **diarreia aquosa, fétida e espumosa, com restos alimentares, flatulência, distensão pós-prandial, esteatorreia e perda ou desaceleração do ganho de peso**, **sem sangue nem leucócitos fecais**; entra no diferencial de desnutrição, intolerância à lactose e doença celíaca; adquire-se por **banho em lagoa, cachoeira ou água contaminada**, e o homem em PrEP com sexo anal pode contrair por via fecal-oral.|q-gdparasitoses-043,q-gdparasitoses-151,q-gdparasitoses-164,q-gdparasitoses-107,q-gdparasitoses-149,q-gdparasitoses-014,q-gdparasitoses-024,q-gdparasitoses-044,q-gdparasitoses-168,q-gdparasitoses-001,q-usp2026-086,q-gdparasitoses-131]] [[O tratamento é com **nitroimidazólicos: metronidazol (por 5 dias no lactente), tinidazol em dose única ou nitazoxanida**; o **praziquantel não** se usa; e o **protoparasitológico com *Giardia* e *E. histolytica*** em criança trata-se com **metronidazol**, que cobre as duas.|q-gdparasitoses-001,q-gdparasitoses-059,q-gdparasitoses-091,q-gdparasitoses-157,q-gdparasitoses-154,q-gdparasitoses-031]]`,
          texto: `- Adolescente com banho em lagoa e cistos nas fezes: **metronidazol é a droga mais comum**. {q-gdparasitoses-001}
- Diarreia intermitente, fezes líquidas espumosas com restos: **giardíase**. {q-gdparasitoses-014}
- Fezes volumosas com alimentos mal digeridos e distensão pós-prandial: **giardíase**. {q-gdparasitoses-024}
- *Giardia* e *E. histolytica* no exame: **metronidazol**. {q-gdparasitoses-031}
- Diarreia aquosa fétida, distensão, flatulência e perda de peso: **giardíase**. {q-gdparasitoses-043,q-gdparasitoses-151}
- A *Giardia* entra no diferencial de desnutrição, diarreia aguda, DII e celíaca. {q-gdparasitoses-044}
- Giardíase em criança: **tinidazol ou nitazoxanida**. {q-gdparasitoses-059}
- Lactente com giardíase: **metronidazol por 5 dias**. {q-gdparasitoses-091}
- Diarreia com restos alimentares sem sangue: **giardíase** (a prova citou albendazol). {q-gdparasitoses-107}
- Diarreia líquida sem sangue por semanas, dor e anorexia: **giardíase**. {q-gdparasitoses-149}
- **Praziquantel não** trata giardíase. {q-gdparasitoses-154}
- **Tinidazol** em dose única trata giardíase sintomática. {q-gdparasitoses-157}
- Diarreia líquida com esteatorreia, distensão e perda de peso: **giardíase**. {q-gdparasitoses-164}
- Hidrogênio expirado positivo depois de banho de cachoeira: **giardíase**. {q-gdparasitoses-168}
- A *Giardia* **não** dá leucócitos fecais (diarreia não invasiva). {q-gdparasitoses-131}
- Homem em PrEP com diarreia malcheirosa sem sangue por 20 dias: ***Giardia lamblia***. {q-usp2026-086}` },
        { id: "amebiase", titulo: "Amebíase", conferir: true, diretrizes: ["sbp-parasitoses"],
          questoes: ["q-gdparasitoses-009","q-gdparasitoses-124","q-gdparasitoses-152","q-gdparasitoses-183","q-sessp2026-057","q-gdparasitoses-144"],
          prosa: `[[A ***Entamoeba histolytica*** é **protozoário** (não bactéria), e o ciclo começa com a **ingestão de cistos**; ela **invade a mucosa do cólon** e causa a **colite disentérica**, com dor abdominal, fezes líquidas com **sangue e muco**, tenesmo e febre ausente ou baixa, e pode chegar ao fígado e formar **abscesso hepático** (febre alta, dor em hipocôndrio direito irradiada ao dorso); a infecção por *E. histolytica* se trata **sempre**, mesmo no portador, e o diagnóstico prático é a **pesquisa de antígeno fecal por ELISA**, que distingue a histolítica da *dispar*.|q-gdparasitoses-124,q-gdparasitoses-152,q-sessp2026-057,q-gdparasitoses-009,q-gdparasitoses-183]] [[O **metronidazol** também serve à doença de Crohn com fístula perianal (diarreia de 3 meses, emagrecimento, febre baixa, artralgias e inflamação do íleo terminal), um diferencial da colite infecciosa.|q-gdparasitoses-144]]`,
          texto: `- As infestações por *E. histolytica* devem ser tratadas **sempre**. {q-gdparasitoses-009}
- *E. histolytica* é **protozoário**, não bactéria (item errado). {q-gdparasitoses-124}
- Colite disentérica: ***E. histolytica***, dor, fezes líquidas com sangue e muco, tenesmo. {q-gdparasitoses-152}
- Diagnóstico prático: **antígeno fecal por ELISA**. {q-gdparasitoses-183}
- Adolescente com febre, dor em hipocôndrio direito irradiada ao dorso: **abscesso hepático amebiano**. {q-sessp2026-057}
- Diarreia de 3 meses, fístula perianal e íleo terminal inflamado: **metronidazol** (Crohn perianal). {q-gdparasitoses-144}` },
        { id: "cestodeos", titulo: "Teníase, himenolepíase e cisticercose", conferir: true, diretrizes: ["sbp-parasitoses"],
          questoes: ["q-amrigs2025-055","q-gdparasitoses-041","q-gdparasitoses-058","q-gdparasitoses-063","q-gdparasitoses-076","q-gdparasitoses-078","q-gdparasitoses-082","q-gdparasitoses-160","q-unicampdis2022-002"],
          prosa: `[[A **teníase** é causada por ***Taenia solium*** (carne de **porco** mal cozida) e ***Taenia saginata*** (carne **bovina** mal cozida), eliminando **proglótides ("fitas brancas") nas fezes**, com dor leve e diarreia; o tratamento é **praziquantel (ou niclosamida)**, também na gestante da prova; o **hospedeiro intermediário da *T. saginata* é o bovino**, e a **neurocisticercose** vem de ovos de *T. solium*; e a ***Hymenolepis nana*** em criança com anemia leve trata-se com **praziquantel**, e a *Giardia* associada, com metronidazol.|q-amrigs2025-055,q-gdparasitoses-058,q-gdparasitoses-082,q-gdparasitoses-160,q-gdparasitoses-078,q-gdparasitoses-041,q-gdparasitoses-076,q-gdparasitoses-063,q-unicampdis2022-002]]`,
          texto: `- Gestante com "fitas brancas" nas fezes após carne de porco: **teníase, praziquantel**. {q-amrigs2025-055}
- Praziquantel e niclosamida: **teníase**. {q-gdparasitoses-041}
- Teníase: *T. solium* (porco) e *T. saginata* (boi). {q-gdparasitoses-058,q-gdparasitoses-082}
- Ovos de *H. nana* e cistos de *Giardia*: **praziquantel e metronidazol**. {q-gdparasitoses-063}
- Praziquantel é a primeira escolha na **teníase**. {q-gdparasitoses-076}
- *T. saginata* tem o **bovino** como hospedeiro; a neurocisticercose vem da *T. solium*. {q-gdparasitoses-078}
- Carne de vaca mal cozida, dose única de praziquantel: **teníase saginata**. {q-gdparasitoses-160}
- Cefaleia por 6 meses e crises convulsivas tardias com imagens: **neurocisticercose**. {q-unicampdis2022-002}` },
      ],
    },
    {
      id: "esquistossomose", titulo: "Esquistossomose mansônica",
      introducao: `[[A **esquistossomose** é causada pelo trematódeo ***Schistosoma mansoni***: a **cercária**, liberada pelo caramujo em água doce de **açudes e lagoas**, **penetra ativamente na pele íntegra** de quem se banha, e os **ovos presos no fígado** provocam **granuloma e fibrose periportal**.|q-gdparasitoses-021,q-usp2022-024,q-gdhepatoesplenomegalias-054]]`,
      fragmentos: [
        { id: "esquisto-diagnostico", titulo: "Ciclo, quadro, diagnóstico e tratamento", conferir: true, diretrizes: ["ms-parasitoses"],
          questoes: ["q-usp2022-024","q-tp20212-006","q-gdparasitoses-020","q-gdparasitoses-021","q-gdhepatoesplenomegalias-003","q-gdhepatoesplenomegalias-004","q-gdhepatoesplenomegalias-012","q-gdhepatoesplenomegalias-013","q-gdhepatoesplenomegalias-016","q-gdhepatoesplenomegalias-032","q-gdhepatoesplenomegalias-054","q-gdhepatoesplenomegalias-063"],
          prosa: `[[A infecção humana é pela **penetração ativa da cercária na pele**, que pode dar **prurido (dermatite cercariana)** no início; o caso suspeito é o de **residente ou procedente de área endêmica** com quadro sugestivo; o diagnóstico é o **parasitológico seriado de fezes** (ovos) e, quando as fezes são negativas, a **biópsia de mucosa retal**, que acha **ovos em trânsito ou retidos**; e a **droga de primeira escolha é o praziquantel** (dose única), pois a **oxamniquina**, que a prova antiga citava, saiu de uso.|q-usp2022-024,q-gdparasitoses-021,q-gdhepatoesplenomegalias-013,q-gdhepatoesplenomegalias-054,q-gdhepatoesplenomegalias-003,q-gdhepatoesplenomegalias-032,q-tp20212-006,q-gdhepatoesplenomegalias-016,q-gdparasitoses-020,q-gdhepatoesplenomegalias-012,q-gdhepatoesplenomegalias-004]] [[A **esquistossomose com salmonelose septicêmica prolongada** (criança de área endêmica com febre, diarreia, hepatoesplenomegalia e eosinofilia) se investiga com **mielocultura e ovos nas fezes** e se trata com **praziquantel e antibiótico (cloranfenicol)**, pois a bactéria adere ao tegumento do verme.|q-gdhepatoesplenomegalias-063]]`,
          texto: `- A infecção humana é pela **penetração ativa** do agente pela pele íntegra. {q-usp2022-024}
- Biópsia de mucosa retal: pesquisa de **ovos em trânsito ou retidos**. {q-tp20212-006}
- **Oxamniquina** para esquistossomose (a prova antiga; hoje, praziquantel). {q-gdparasitoses-020,q-gdhepatoesplenomegalias-012}
- A forma infectante é a **cercária**. {q-gdparasitoses-021,q-gdhepatoesplenomegalias-013}
- Caso suspeito: residente ou procedente de **área endêmica** com quadro sugestivo. {q-gdhepatoesplenomegalias-003}
- Doença negligenciada causada por trematódeos; a coleção de água favorece. {q-gdhepatoesplenomegalias-004}
- Primeira escolha: **praziquantel**. {q-gdhepatoesplenomegalias-016}
- Diarreia sanguinolenta há 8 meses em área endêmica: **parasitológico seriado de fezes**. {q-gdhepatoesplenomegalias-032}
- Pode começar com **prurido na pele**. {q-gdhepatoesplenomegalias-054}
- Criança de Pernambuco com febre prolongada e hepatoesplenomegalia: **mielocultura, ovos nas fezes; praziquantel e cloranfenicol**. {q-gdhepatoesplenomegalias-063}` },
        { id: "esquisto-hepatoesplenica", titulo: "Forma hepatoesplênica e hipertensão portal pré-sinusoidal", conferir: true, diretrizes: ["ms-parasitoses"],
          casos: ["q-usprp2021-116"],
          questoes: ["q-adap24-013","q-usp2026-003","q-gdhepatoesplenomegalias-008","q-gdhepatoesplenomegalias-011","q-gdhepatoesplenomegalias-028","q-gdhepatoesplenomegalias-045","q-gdhepatoesplenomegalias-049","q-gdhepatoesplenomegalias-051","q-gdhepatoesplenomegalias-064","q-gdhepatoesplenomegalias-074","q-gdhepatoesplenomegalias-092","q-gdhepatoesplenomegalias-093","q-usprp2021-116"],
          prosa: `[[Os ovos no fígado causam **fibrose periportal (de Symmers)**, que obstrui o fluxo **antes do sinusoide** (**hipertensão portal pré-sinusoidal**): por isso a **função hepática fica preservada**, e surgem **esplenomegalia, hiperesplenismo e varizes esofágicas**, de modo que o **sangramento por ruptura de varizes** é a manifestação mais provável e a **hemorragia digestiva** é a porta de entrada ao diagnóstico; os **shunts esplenorrenais naturais** desviam o sangue, e a bilirrubina **indireta** fica maior que a direta.|q-gdhepatoesplenomegalias-045,q-gdhepatoesplenomegalias-064,q-gdhepatoesplenomegalias-049,q-gdhepatoesplenomegalias-011,q-gdhepatoesplenomegalias-051,q-gdhepatoesplenomegalias-093,q-adap24-013,q-gdhepatoesplenomegalias-028,q-gdhepatoesplenomegalias-008,q-gdhepatoesplenomegalias-092]] [[A **profilaxia primária** do sangramento nas varizes de grosso calibre da forma hepatoesplênica usa **betabloqueador não seletivo (carvedilol)** ou ligadura; e a **pancitopenia intensa** num jovem do Nordeste com ovos de *S. mansoni* **não** se explica só pela esquistossomose: pede **mielograma**, porque a **leishmaniose visceral** coexiste na mesma área e se trata com **anfotericina B** (febre, esplenomegalia e pancitopenia, com amastigotas no mielograma).|q-usp2026-003,q-gdhepatoesplenomegalias-074,q-usprp2021-116]]`,
          texto: `- Lavrador de Pernambuco com hematêmese de grande volume: **esquistossomose hepatoesplênica**. {q-adap24-013}
- Duas varizes esofágicas de grosso calibre sem sangramento: **carvedilol** (profilaxia primária). {q-usp2026-003}
- Mulher da Bahia com varizes e sem etilismo: investigar com **parasitológico, testes imunológicos e biópsia hepática**. {q-gdhepatoesplenomegalias-008}
- A hepatopatia por *S. mansoni* leva a **varizes esofágicas**. {q-gdhepatoesplenomegalias-011,q-gdhepatoesplenomegalias-051,q-gdhepatoesplenomegalias-093}
- Jovem de Barreiras com hemorragia digestiva e abdome volumoso: **ruptura de varizes esofágicas**. {q-gdhepatoesplenomegalias-028}
- A esquistossomose causa **hipertensão portal pré-sinusoidal** (intra-hepática). {q-gdhepatoesplenomegalias-045,q-gdhepatoesplenomegalias-064}
- Na forma hepatoesplênica a **função hepática está preservada**. {q-gdhepatoesplenomegalias-049}
- Jovem do Nordeste com pancitopenia e ovos nas fezes: **mielograma e biópsia de medula**. {q-gdhepatoesplenomegalias-074}
- Bilirrubina **indireta** maior que a direta: esquistossomose com **shunts esplenorrenais**. {q-gdhepatoesplenomegalias-092}
- Febre diária, esplenomegalia, pancitopenia e estruturas ovaladas em macrófagos: **anfotericina B** (leishmaniose visceral). {q-usprp2021-116}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual (drogas antigas e textos de referência desatualizados). Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-gdparasitoses-020","q-gdhepatoesplenomegalias-012","q-gdparasitoses-107","q-gdparasitoses-059","q-gdparasitoses-010","q-gdparasitoses-026","q-gdparasitoses-085","q-gdparasitoses-012","q-gdparasitoses-091","q-unesp2022-015"],
          prosa: `[[**Esquistossomose**: a primeira escolha é o **praziquantel**; a prova (gdparasitoses-020 e gdhepatoesplenomegalias-012) deu a **oxamniquina** como droga de escolha.|q-gdparasitoses-020,q-gdhepatoesplenomegalias-012]] [[**Estrongiloidíase**: a regra atual é a **ivermectina**; as provas antigas (gdparasitoses-010, 026 e 085) deram o **tiabendazol**.|q-gdparasitoses-010,q-gdparasitoses-026,q-gdparasitoses-085]] [[**Giardíase**: a regra é o **nitroimidazólico** (metronidazol, tinidazol) ou a nitazoxanida; a prova (gdparasitoses-107) deu o **albendazol**, e no lactente cobrou **metronidazol por 5 dias**.|q-gdparasitoses-107,q-gdparasitoses-059,q-gdparasitoses-091]] [[**Eosinofilia**: a regra é que o *Enterobius* **não** a causa; a prova (Unesp 2022) deu *Strongyloides* e *Enterobius* como causas; e a **nitazoxanida** de amplo espectro foi a resposta para o poliparasitismo suspeito.|q-unesp2022-015,q-gdparasitoses-012]]`,
          texto: `- Regra: praziquantel; a prova deu **oxamniquina**. {q-gdparasitoses-020,q-gdhepatoesplenomegalias-012}
- Regra: ivermectina; a prova deu **tiabendazol**. {q-gdparasitoses-010,q-gdparasitoses-026,q-gdparasitoses-085}
- Regra: nitroimidazólico na giardíase; a prova deu **albendazol**. {q-gdparasitoses-107}
- Giardíase: tinidazol ou nitazoxanida; lactente com metronidazol por 5 dias. {q-gdparasitoses-059,q-gdparasitoses-091}
- Regra: *Enterobius* não causa eosinofilia; a prova listou o *Enterobius*. {q-unesp2022-015}
- Poliparasitismo suspeito: **nitazoxanida por 3 dias**. {q-gdparasitoses-012}` },
      ],
    },
  ],
});
