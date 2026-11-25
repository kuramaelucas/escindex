/* resumos/urologia/resumo.js — resumo adaptativo de urologia oncológica e malformações do trato
   urinário: hematúria e câncer de bexiga, tumor renal e cistos, câncer de testículo, câncer de próstata
   localizado; refluxo vesicoureteral e investigação depois de ITU na criança, válvula de uretra
   posterior, duplicidade, criptorquidia, hipospádia e fimose. Assuntos: ass-uro-oncologia (principal)
   e ass-uro-malformacoes. Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- urologia */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "urologia",
  titulo: "Urologia: tumores e malformações",
  assunto: "ass-uro-oncologia",
  criadoEm: "2026-11-25",
  fontes: [
    { id: "eau-onco", texto: "EAU Guidelines 2024 — non-muscle-invasive and muscle-invasive bladder cancer, renal cell carcinoma, testicular cancer", lidoEm: null },
    { id: "aap-itu", texto: "AAP 2011/2016 — infecção urinária febril de 2 a 24 meses; SBP — investigação por imagem depois da ITU", lidoEm: null },
    { id: "eau-pediatria", texto: "EAU/ESPU 2024 — Paediatric Urology (criptorquidia, hipospádia, refluxo vesicoureteral, válvula de uretra posterior)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "tumores", titulo: "Tumores urológicos",
      introducao: `[[**Hematúria macroscópica indolor** em adulto, sobretudo **tabagista** acima de 40 anos, é **câncer urotelial** (bexiga, mais raramente pelve renal e ureter) até prova em contrário: o tabaco elimina carcinógenos pela urina, que fica horas em contato com a mucosa da bexiga. Investiga-se o trato **superior** com **tomografia com fase excretora (urotomografia)** e o **inferior** com **cistoscopia**, além de urina e função renal.|q-unifesp2023-080,q-unifesp2025-015,q-unesp2021-068,q-unesp2024-068]]

Veja também: **Próstata** (hiperplasia e rastreio), **Genitália masculina** (escroto agudo), **Infecção urinária** (diagnóstico e tratamento da ITU na criança), **Litíase urinária** e **Trauma abdominal**.`,
      fragmentos: [
        { id: "tum-bexiga", titulo: "Câncer de bexiga", conferir: true, diretrizes: ["eau-onco"],
          questoes: ["q-unifesp2023-080","q-unifesp2025-015","q-unesp2021-068","q-unesp2024-068","q-adap25-015","q-didepm-072","q-sirio2024-033"],
          prosa: `[[O tratamento começa pela **ressecção transuretral** (diagnostica e estadia). **Sem invasão da camada muscular** (a maioria): ressecção completa e, se **alto grau** ou risco intermediário/alto, **BCG intravesical** (indução e manutenção), que reduz recidiva e progressão. **Invasão da muscular própria**: **quimioterapia neoadjuvante com cisplatina** e **cistectomia radical** com linfadenectomia.|q-adap25-015,q-didepm-072]] [[Hematúria depois de trauma com **fratura de pelve**: lesão de bexiga — a **extraperitoneal** (a mais comum) se trata com **sonda vesical**; a intraperitoneal, com cirurgia.|q-sirio2024-033]]`,
          texto: `- Hematúria indolor em tabagista: **carcinoma urotelial** → **urotomografia + cistoscopia**. {q-unifesp2023-080,q-unifesp2025-015,q-unesp2021-068,q-unesp2024-068}
- Não músculo-invasivo de alto grau: **BCG intravesical**. {q-adap25-015}
- Músculo-invasivo: **QT neoadjuvante + cistectomia**. {q-didepm-072}
- Fratura de pelve + lesão extraperitoneal: **sondagem**. {q-sirio2024-033}` },
        { id: "tum-rim", titulo: "Massa renal e cisto", conferir: true, diretrizes: ["eau-onco"],
          questoes: ["q-sirio2025-023","q-adap23-080","q-unicampdis2025-015","q-unesp2022-071","q-unicamp2023-028","q-scmsp2026-025"],
          prosa: `[[O **carcinoma de células renais** hoje é quase sempre **achado de imagem**; a tríade dor lombar, massa e hematúria é tardia. Lesão sólida que **realça pelo contraste** e **não tem gordura** (a gordura macroscópica é do **angiomiolipoma**, benigno) é carcinoma. Tumor **até 4 cm (T1a)** confinado ao rim: **nefrectomia parcial**, preservando néfrons; maiores, radical.|q-sirio2025-023,q-adap23-080,q-unicampdis2025-015]] [[**Cisto simples** (anecoico, parede fina, sem septos nem conteúdo espesso; Bosniak I) é benigno e **não precisa de mais exames**. Massa **retroperitoneal** heterogênea com gordura, fora do rim: lipossarcoma possível — **biópsia por agulha** antes de decidir.|q-unesp2022-071,q-unicamp2023-028,q-scmsp2026-025]]`,
          texto: `- Tabagista com hematúria e dor lombar: **TC → carcinoma renal**. {q-sirio2025-023}
- Sólida que realça, sem gordura: **carcinoma**; ≤ 4 cm: **nefrectomia parcial**. {q-unicampdis2025-015,q-adap23-080}
- Cisto simples: **sem investigação**. {q-unesp2022-071,q-unicamp2023-028}
- Massa retroperitoneal com gordura: **biópsia**. {q-scmsp2026-025}` },
        { id: "tum-testiculo-prostata", titulo: "Testículo e próstata", conferir: true, diretrizes: ["eau-onco"],
          questoes: ["q-usp2022-073","q-usprp2024-033","q-amrigs2022-017","q-tp20252-080","q-unesp2023-061","q-tp20251-068","q-tp20252-031"],
          prosa: `[[**Nódulo testicular endurecido e indolor** num homem de 15 a 40 anos (risco maior com **criptorquidia**) é câncer até prova em contrário — o trauma só chama a atenção. Pedir **ultrassonografia** e marcadores (**AFP, beta-hCG, DHL**) e fazer **orquiectomia por via inguinal** (nunca escrotal, para não abrir outra drenagem linfática). É curável em mais de 95%; seminoma e não seminoma diferem nos marcadores. Tumor de **células de Leydig** é estromal, pode produzir hormônio. A cirurgia inguinal pode lesar o **nervo ilioinguinal** (parestesia na face medial da coxa e bolsa).|q-usp2022-073,q-usprp2024-033,q-amrigs2022-017,q-tp20252-080,q-unesp2023-061]] [[Câncer de próstata **localizado** (nódulo ao toque, PSA pouco elevado, lesão confinada na ressonância) num homem com boa expectativa de vida: **prostatectomia radical** (ou radioterapia).|q-tp20251-068,q-tp20252-031]]`,
          texto: `- Nódulo testicular: **USG + AFP, beta-hCG, DHL** → **orquiectomia inguinal**. {q-usp2022-073,q-usprp2024-033,q-amrigs2022-017}
- Tumor estromal: **Leydig**. {q-tp20252-080}
- Parestesia na face medial da coxa após orquiectomia: **ilioinguinal**. {q-unesp2023-061}
- Próstata localizada, homem saudável: **prostatectomia radical**. {q-tp20251-068,q-tp20252-031}` },
      ],
    },
    {
      id: "malformacoes", titulo: "Malformações do trato urinário e da genitália",
      introducao: `[[As malformações urinárias aparecem de dois jeitos: **hidronefrose no ultrassom pré-natal** e **infecção urinária febril** no lactente. A mais comum é o **refluxo vesicoureteral**, uma válvula ureterovesical incompetente que deixa a urina voltar ao rim: as ITU febris repetidas deixam **cicatrizes renais**, hipertensão e, no extremo, doença renal crônica.|q-adap24-055,q-tp20222-054,q-unesp2023-010]]`,
      fragmentos: [
        { id: "mal-refluxo", titulo: "Depois da ITU febril: quando e o que investigar", conferir: true, diretrizes: ["aap-itu"],
          questoes: ["q-adap24-055","q-tp20222-054","q-usp2026-066","q-unifesp2024-096","q-amrigs2025-065","q-unesp2023-010","q-unesp2026-015","q-unifesp2022-012"],
          prosa: `[[Primeira ITU febril no lactente: **ultrassonografia de rins e vias urinárias**. A **uretrocistografia miccional** (que mostra e gradua o refluxo) entra quando o ultrassom mostra **hidronefrose**, cicatriz ou sinais de obstrução, ou depois de **ITU febril recorrente**. A **cintilografia com DMSA** é o exame das **cicatrizes renais**. Refluxo **de baixo grau (I e II)** costuma desaparecer sozinho: a profilaxia antibiótica não é obrigatória (a prova a mandou suspender). Criança com ITU de repetição tem risco de lesão renal: medir **pressão arterial**, creatinina e albuminúria e acompanhar.|q-adap24-055,q-tp20222-054,q-usp2026-066,q-unifesp2024-096,q-amrigs2025-065,q-unesp2023-010]] [[A decisão também pesa a **dilatação pré-natal** e o germe (não *E. coli* sugere anomalia). **Duplicidade pieloureteral**: o polo superior obstrui (ureterocele, ureter ectópico) e o inferior reflui; o tratamento depende da **função do polo** na cintilografia.|q-unesp2026-015,q-unifesp2022-012]]`,
          texto: `- 1ª ITU febril: **USG de rins e vias urinárias**. {q-adap24-055}
- Hidronefrose ou recorrência: **uretrocistografia miccional**. {q-tp20222-054,q-usp2026-066}
- Cicatriz: **DMSA**. {q-unifesp2024-096}
- Refluxo grau II: resolve sozinho (a prova: suspender profilaxia). {q-amrigs2025-065}
- ITU de repetição: **PA, creatinina, albuminúria**, especialista. {q-unesp2023-010}
- Dilatação pré-natal e germe pesam; duplicidade: **função do polo**. {q-unesp2026-015,q-unifesp2022-012}` },
        { id: "mal-obstrucao-disfuncao", titulo: "Válvula de uretra posterior e disfunção miccional", conferir: true, diretrizes: ["eau-pediatria"],
          questoes: ["q-adap22-012","q-unicampdis2024-032","q-tp20232-047","q-tp20241-049","q-unesp2024-011"],
          prosa: `[[Menino com **jato urinário fraco e gotejante**, **bexiga palpável** e **hidronefrose bilateral** no pré-natal: **válvula de uretra posterior** — **sondagem vesical** para descomprimir, **uretrocistografia miccional** para confirmar e **ablação endoscópica**.|q-adap22-012,q-unicampdis2024-032]] [[Menina que teve ITU de repetição **depois de tirar as fraldas**, com urgência, incontinência diurna, pouca micção e **constipação**: **disfunção do trato urinário inferior** — **uroterapia** (horários de micção, postura), **tratar a constipação** e fisioterapia do assoalho pélvico. Menino que molha os pés ao urinar (jato desviado/gotejante): uretrocistografia.|q-tp20232-047,q-tp20241-049,q-unesp2024-011]]`,
          texto: `- Menino, jato fraco, bexiga palpável, hidronefrose bilateral: **válvula de uretra posterior**. {q-adap22-012,q-unicampdis2024-032}
- ITU após tirar fralda + constipação + urgência: **uroterapia e laxativo**. {q-tp20232-047,q-tp20241-049}
- Jato alterado no menino: **uretrocistografia**. {q-unesp2024-011}` },
        { id: "mal-genitalia", titulo: "Criptorquidia, hipospádia e fimose", conferir: true, diretrizes: ["eau-pediatria"],
          questoes: ["q-unesp2023-079","q-tp20241-070","q-tp20232-070","q-einstein2026-043","q-unifesp2023-099","q-adap23-099","q-sirio2023-024","q-fmabc2026-057"],
          prosa: `[[O testículo que não desceu até os **6 meses** não desce mais: **orquidopexia** a partir daí, **antes de 18 meses**, para preservar a fertilidade e permitir vigiar o **risco de câncer** (que varia com a localização). **Palpável** no canal: orquidopexia inguinal eletiva; **não palpável**: **videolaparoscopia**. **Criptorquidia bilateral não palpável** (ou com hipospádia) é distúrbio do desenvolvimento sexual até prova em contrário — numa família com morte neonatal por vômitos, pensar em **hiperplasia adrenal congênita** numa menina virilizada: começar por **ultrassonografia pélvica** e cariótipo.|q-unesp2023-079,q-tp20241-070,q-tp20232-070,q-einstein2026-043,q-unifesp2023-099]] [[**Hipospádia**: meato na face ventral, prepúcio em capuz dorsal. **Não circuncidar** (o prepúcio serve para a correção, entre **6 e 18 meses**). Cariótipo só é obrigatório se for **proximal** ou vier com criptorquidia ou micropênis. **Fimose fisiológica** do lactente é normal: **não forçar** a abertura com massagens.|q-adap23-099,q-sirio2023-024,q-fmabc2026-057]]`,
          texto: `- Testículo no canal aos 7 meses: **orquidopexia eletiva**. {q-unesp2023-079,q-tp20241-070}
- Não palpável: **videolaparoscopia até 18 meses**; riscos: **infertilidade e câncer**. {q-tp20232-070,q-einstein2026-043}
- Bilateral não palpável + óbito neonatal na família: **USG pélvica** (DDS). {q-unifesp2023-099}
- Hipospádia: **não circuncidar**; cariótipo só se proximal/criptorquidia. {q-adap23-099,q-sirio2023-024}
- Fimose no lactente: **não forçar**. {q-fmabc2026-057}` },
      ],
    },
  ],
});
