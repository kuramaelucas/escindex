/* resumos/hemostasia/resumo.js — resumo adaptativo de distúrbios da hemostasia (ass-hemato-hemostasia):
   plaquetas (trombocitopenia imune, pseudoplaquetopenia, disfunção urêmica, transfusão), microangiopatias
   trombóticas (PTT), trombocitopenia induzida pela heparina, coagulograma, hemofilias e von Willebrand,
   doença hemorrágica do recém-nascido, varfarina e reversão, heparina e anticoagulantes diretos, trombofilias e
   síndrome antifosfolípide, armadilhas e tabela das púrpuras. Molde: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- hemostasia */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "hemostasia",
  titulo: "Distúrbios da hemostasia e anticoagulação",
  assunto: "ass-hemato-hemostasia",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "ash-pti", texto: "ASH — 2019 guidelines for immune thrombocytopenia (Neunert et al., Blood Adv 2019) e consenso internacional de PTI (2019)", lidoEm: null },
    { id: "ash-hit", texto: "ASH — 2018 guidelines for management of venous thromboembolism: heparin-induced thrombocytopenia (Cuker et al., Blood Adv 2018)", lidoEm: null },
    { id: "chest-reversao", texto: "ACC — Expert consensus decision pathway on management of bleeding in patients on oral anticoagulants (2020) e CHEST (varfarina)", lidoEm: null },
    { id: "wfh-hemofilia", texto: "World Federation of Hemophilia — Guidelines for the management of hemophilia, 3ª ed. (2020)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição", questoes: ["q-unesp2021-056"] },
  ],
  doencas: [
    {
      id: "plaquetas", titulo: "Plaquetas: trombocitopenias e disfunção",
      introducao: `[[A hemostasia tem dois tempos. No primário, as plaquetas aderem ao colágeno do vaso lesado pelo fator de von Willebrand e se agregam: falha aqui dá sangramento de pele e mucosa (petéquias, equimoses, gengivorragia, epistaxe, menorragia) logo depois do trauma. No secundário, a cascata de coagulação forma fibrina que firma o tampão: falha aqui dá sangramento profundo e tardio (hemartrose, hematoma muscular).|q-tp20202-024,q-simepm89-084,q-adap23-062]] [[A trombocitopenia imune é a destruição das plaquetas por anticorpos IgG, no baço: a medula, normal, aumenta os megacariócitos, e as plaquetas que saem são grandes. Na criança vem semanas depois de virose ou vacina, com petéquias num menino ou menina que está bem, e a maioria cura sozinha em semanas a meses; no adulto tende a ficar crônica.|q-unifesp2023-062,q-unifesp2022-085,q-uspsp4-107,q-einstein2027-045]]

Veja também: **Neoplasias hematológicas** (leucemia como diferencial da plaquetopenia), **Anemias** (hemólise), **Arritmias** e **AVC** (anticoagulação na fibrilação atrial), **Doença péptica** (sangramento com anticoagulante) e **Hipertensão na gestação** (HELLP).`,
      fragmentos: [
        { id: "pla-pti", titulo: "Trombocitopenia imune", conferir: true, diretrizes: ["ash-pti"],
          casos: ["q-uspsp3-036","q-usp2025-051"],
          questoes: ["q-adap21-115","q-unifesp2022-085","q-unifesp2023-062","q-usp2023-030","q-usp2025-051","q-usprp2024-077","q-tp20202-024","q-unicampdis2025-022","q-uspsp4-107","q-uspsp3-036","q-sirio2021-059","q-sirio2022-048","q-fmabc2022-050","q-einstein2027-045","q-sirio2025-044","q-iamspe2022-059"],
          prosa: `[[O diagnóstico é de exclusão: plaquetopenia isolada (hemoglobina, leucócitos e esfregaço normais, com macroplaquetas), sem baço grande, sem gânglios, sem febre nem dor óssea. Mielograma só se algo não encaixa (outra citopenia, idade avançada para decidir tratamento, falha do tratamento).|q-tp20202-024,q-unicampdis2025-022,q-sirio2021-059,q-einstein2027-045,q-usprp2024-077,q-fmabc2022-050,q-unifesp2022-085]] [[Na criança sem sangramento importante, observa-se, mesmo com plaquetas muito baixas, e orienta-se a família; trata-se (corticoide ou imunoglobulina) quando há sangramento de mucosa relevante. No adulto com sangramento ou plaquetas abaixo de 20 a 30 mil, corticoide (prednisona 1 mg/kg ou dexametasona em pulso); a adolescente com menorragia e petéquias também recebe corticoide. Sangramento com risco de vida (intracraniano) pede transfusão de plaquetas junto de corticoide e imunoglobulina.|q-usp2025-051,q-uspsp4-107,q-uspsp3-036,q-sirio2022-048,q-adap21-115,q-usp2023-030,q-sirio2025-044]] [[Na gestante, o anticorpo IgG atravessa a placenta e pode baixar as plaquetas do feto.|q-iamspe2022-059]]`,
          texto: `- Sangramento de mucosa com plaquetas baixas isoladas: **corticoide**. {q-adap21-115}
- Idosa após vacina com megacariócitos aumentados: **trombocitopenia imune**. {q-unifesp2022-085}
- Mecanismo: **destruição no sistema reticuloendotelial**. {q-unifesp2023-062}
- Adolescente com menorragia e petéquias: **corticosteroide**. {q-usp2023-030}
- Criança com petéquias, bem: **expectante e seguimento**. {q-usp2025-051,q-usprp2024-077,q-uspsp4-107,q-sirio2022-048}
- Jovem com equimoses e gengivorragia: **trombocitopenia imune**. {q-tp20202-024,q-unicampdis2025-022,q-sirio2021-059,q-einstein2027-045}
- Criança após vacina: **hemograma; observar ou tratar conforme o sangramento**. {q-uspsp3-036}
- Evolução autolimitada: **orientar**, sem mielograma. {q-fmabc2022-050}
- Hemorragia intracraniana: **plaquetas, corticoide e imunoglobulina**. {q-sirio2025-044}
- Gestante: **IgG atravessa a placenta**. {q-iamspe2022-059}` },
        { id: "pla-outras", titulo: "Pseudoplaquetopenia, uremia e transfusão", conferir: true,
          questoes: ["q-famerp2024-079","q-unifesp2023-011","q-famema2025-095","q-amrigs2020-014"],
          prosa: `[[Plaquetopenia num exame de rotina de pessoa sem sangramento pode ser artefato: o anticoagulante EDTA do tubo faz as plaquetas grudarem e o contador não as vê; repete-se em tubo de citrato. A ureia alta prejudica a função das plaquetas, que sangram mesmo com contagem normal (sangramento urêmico).|q-famerp2024-079,q-unifesp2023-011]] [[Para procedimentos, as plaquetas alvo variam com o risco: endoscopia e cirurgia, acima de 50 mil; neurocirurgia, acima de 100 mil. Na transfusão maciça repõem-se plasma, plaquetas e hemácias em proporção 1:1:1; em urgência com anticorpos irregulares, a escolha da bolsa depende da identificação dos anticorpos e do risco.|q-famema2025-095,q-amrigs2020-014]]`,
          texto: `- Plaquetopenia isolada no check-up: **repetir em citrato**. {q-famerp2024-079}
- Sangramento com creatinina 3,4: **disfunção plaquetária**. {q-unifesp2023-011}
- Endoscopia: **> 50.000**. {q-famema2025-095}
- Incorreta na transfusão: a regra para **anticorpos irregulares em urgência** (a prova). {q-amrigs2020-014}` },
        { id: "pla-ptt", titulo: "Púrpura trombocitopênica trombótica", conferir: true,
          casos: ["q-usprp2021-115"],
          questoes: ["q-usprp2021-115","q-tp20232-029","q-tp20232-030","q-tp20261-085","q-tp20241-002","q-sirio2024-041"],
          prosa: `[[Na PTT falta a ADAMTS13 (por anticorpo, quase sempre), a enzima que corta os multímeros gigantes do fator de von Willebrand; eles prendem plaquetas na microcirculação, formam microtrombos e rasgam as hemácias (esquizócitos). O quadro é anemia hemolítica microangiopática (DHL alta, bilirrubina indireta, reticulócitos) com plaquetopenia grave, e pode vir com confusão mental, febre e alteração renal. Mata em dias sem tratamento: plasmaférese urgente (retira o anticorpo e repõe a enzima), com corticoide. Transfundir plaquetas alimenta os trombos.|q-usprp2021-115,q-tp20232-029,q-tp20232-030,q-tp20261-085,q-tp20241-002,q-sirio2024-041]]`,
          texto: `- Confusão, plaquetas 9.000 e esquizócitos: **plasmaférese**. {q-usprp2021-115}
- Letargia, petéquias, icterícia e anemia: **PTT**. {q-tp20232-029}
- Gestante com hemólise, plaquetas 7.000 e confusão: **plasmaférese**. {q-tp20232-030,q-tp20261-085}
- Confusão, petéquias, creatinina alta e esquizócitos: **PTT**. {q-tp20241-002}
- Criança com esquizócitos e plaquetopenia: **PTT** (a prova). {q-sirio2024-041}` },
        { id: "pla-hit", titulo: "Trombocitopenia induzida pela heparina", conferir: true, diretrizes: ["ash-hit"],
          questoes: ["q-adap23-011","q-sirio2022-015","q-einstein2026-050"],
          prosa: `[[Anticorpos contra o complexo heparina e fator plaquetário 4 ativam as plaquetas: elas caem (mais de 50%, entre o 5º e o 10º dia de heparina) e formam trombos, venosos e arteriais. O risco é trombose, não sangramento. A conduta é suspender toda heparina (inclusive a de baixo peso e as lavagens de cateter) e anticoagular com droga não heparínica (argatrobana, fondaparinux, anticoagulante direto); varfarina só depois das plaquetas recuperadas, e plaqueta não se transfunde. Vale também na gestante.|q-adap23-011,q-sirio2022-015,q-einstein2026-050]]`,
          texto: `- TVP com queda das plaquetas no 7º dia de enoxaparina: **suspender heparina; argatrobana ou fondaparinux**. {q-adap23-011,q-sirio2022-015}
- Gestante com SAF e trombocitopenia pela heparina: **suspender a heparina**. {q-einstein2026-050}` },
      ],
    },
    {
      id: "coagulacao", titulo: "Coagulação: coagulograma, hemofilias e von Willebrand",
      introducao: `[[O coagulograma localiza o defeito. O tempo de protrombina (TP, expresso em INR) mede a via extrínseca, o fator VII, e é o primeiro a alargar quando falta vitamina K ou se usa varfarina (o VII tem a meia-vida mais curta). O TTPa mede a via intrínseca (fatores XII, XI, IX e VIII) e alarga nas hemofilias e com heparina. Os dois juntos alargados apontam para a via comum (X, V, II, fibrinogênio), hepatopatia ou coagulação intravascular disseminada. Com tudo normal e sangramento de mucosa, o problema é de plaqueta ou de fator de von Willebrand.|q-usprp2023-008,q-einstein2024-031,q-sirio2023-053,q-uspsp4-030]]`,
      fragmentos: [
        { id: "coa-hemofilia", titulo: "Hemofilias e doença de von Willebrand", conferir: true, diretrizes: ["wfh-hemofilia"],
          figuras: [{ arquivo: "figuras/coagulograma.svg", legenda: "Esquema autoral: o que o TP e o TTPa alargados apontam." }],
          questoes: ["q-adap23-062","q-usp2022-051","q-usprp2023-008","q-usprp2025-013","q-simepm89-084","q-sirio2023-053","q-sirio2025-048","q-einstein2024-031","q-uspsp4-030","q-sirio2023-008"],
          prosa: `[[A hemofilia A (falta de fator VIII) e a B (fator IX) são ligadas ao X: meninos com hematoma depois de vacina, hemartrose e sangramento muscular, TTPa alargado com TP e plaquetas normais. A gravidade segue a atividade do fator (abaixo de 1% é grave e sangra espontaneamente). O tratamento é repor o fator que falta: na hemartrose, elevar a 40 a 60%; no trauma de crânio, a 100% antes mesmo da tomografia; e o hemofílico grave faz profilaxia contínua para não destruir as articulações. AAS e injeção intramuscular são proibidos; desmopressina só serve na hemofilia A leve.|q-adap23-062,q-usp2022-051,q-simepm89-084,q-sirio2023-053,q-einstein2024-031,q-sirio2025-048]] [[A doença de von Willebrand é o distúrbio hereditário de sangramento mais comum, autossômica: sangramento de mucosa (epistaxe, gengiva, menorragia desde a menarca) e de cortes, com plaquetas normais, tempo de sangramento longo e TTPa às vezes alargado (o fator protege o VIII). A menorragia melhora com ácido tranexâmico; desmopressina libera o fator dos estoques. A forma adquirida aparece sobretudo nas doenças linfoproliferativas.|q-usprp2025-013,q-uspsp4-030,q-sirio2023-008]] [[TP alargado isolado com sangramento numa criança sem anticoagulante sugere deficiência de fator VII.|q-usprp2023-008]]`,
          texto: `- Hemartrose na hemofilia A grave: **fator VIII a 40–60%**. {q-adap23-062}
- Hemofílico com TCE e vômitos: **fator VIII a 100% e tomografia**. {q-usp2022-051}
- TP isolado alargado: **deficiência de fator VII**. {q-usprp2023-008}
- Corte que sangra e petéquias raras: **von Willebrand**. {q-usprp2025-013}
- Hematoma após vacina em menino: **hemofilia; dosar VIII e IX**. {q-simepm89-084}
- Hemartrose: **TTPa**. {q-sirio2023-053,q-einstein2024-031}
- Equimoses e hematoma muscular com TTPa longo: **hemofilia A grave; profilaxia**. {q-sirio2025-048}
- Menorragia com von Willebrand baixo: **ácido tranexâmico**. {q-uspsp4-030}
- Von Willebrand adquirido: **doença linfoproliferativa**. {q-sirio2023-008}` },
        { id: "coa-rn", titulo: "Doença hemorrágica do recém-nascido", conferir: true,
          casos: ["q-usp2025-055"],
          questoes: ["q-usp2025-055","q-uspsp5-108"],
          prosa: `[[O recém-nascido tem pouca vitamina K (passa mal pela placenta, o leite materno tem pouco e o intestino ainda não tem flora). A forma precoce (primeiras 24 horas) vem de droga materna que antagoniza a vitamina K (fenitoína, fenobarbital, varfarina); a clássica, do 2º ao 7º dia, no bebê em aleitamento que não recebeu vitamina K ao nascer; a tardia, semanas depois, com má absorção. A vitamina K intramuscular na sala de parto previne todas.|q-usp2025-055,q-uspsp5-108]]`,
          texto: `- Mãe em fenitoína, sangramento nas primeiras horas: **forma precoce, por medicamento**. {q-usp2025-055}
- 36 horas sem vitamina K, em aleitamento: **forma clássica**. {q-uspsp5-108}` },
      ],
    },
    {
      id: "anticoagulacao", titulo: "Anticoagulantes: uso e reversão",
      introducao: `[[A varfarina bloqueia a reciclagem da vitamina K e impede o fígado de completar os fatores II, VII, IX e X e também as proteínas C e S, anticoagulantes naturais. A proteína C e o fator VII caem primeiro: nos primeiros dias o sangue fica pró-trombótico, e por isso a varfarina começa junto com heparina até o INR ficar no alvo por 2 dias.|q-unesp2022-065,q-sessp2025-018]]`,
      fragmentos: [
        { id: "ant-varfarina", titulo: "INR alto e sangramento com varfarina", conferir: true, diretrizes: ["chest-reversao"],
          casos: ["q-tp20231-018","q-einstein2023-025"],
          questoes: ["q-adap22-085","q-usp2025-046","q-sessp2026-001","q-tp20231-018","q-unicampdis2023-019","q-einstein2023-025","q-unesp2022-065"],
          prosa: `[[A conduta segue o sangramento, não só o número. INR alto sem sangramento: suspender a varfarina e, se acima de 10, vitamina K oral em dose baixa (2,5 mg). Sangramento menor (hematúria leve, hematomas): suspender e vitamina K oral 2,5 a 5 mg. Sangramento grave (hemorragia digestiva com choque, intracraniano): vitamina K venosa (5 a 10 mg, que age em horas) mais concentrado de complexo protrombínico de 4 fatores, que corrige na hora; o plasma é a alternativa quando não há complexo. Antibiótico (azitromicina, por exemplo) e anti-inflamatório potencializam a varfarina.|q-adap22-085,q-usp2025-046,q-sessp2026-001,q-tp20231-018,q-unicampdis2023-019]] [[Dor abdominal em quem usa varfarina pode ser hematoma da bainha do reto ou retroperitoneal: o primeiro exame é o INR.|q-einstein2023-025]]`,
          texto: `- INR 11,4 sem sangramento: **suspender e vitamina K oral 2,5 mg**. {q-adap22-085}
- Melena com INR 5,1 e Hb 6,3: **complexo protrombínico**. {q-usp2025-046}
- Hematêmese com choque e INR 10,5: **vitamina K venosa e complexo protrombínico**. {q-sessp2026-001}
- Hematúria intermitente estável: **suspender e vitamina K 2,5–5 mg**. {q-tp20231-018}
- Hematúria com INR 4,87 e prótese: **vitamina K**. {q-unicampdis2023-019}
- Dor abdominal com varfarina: **INR**. {q-einstein2023-025}
- Heparina junto no início: **varfarina reduz também as proteínas C e S**. {q-unesp2022-065}` },
        { id: "ant-heparina-doac", titulo: "Heparina e anticoagulantes diretos", conferir: true, diretrizes: ["chest-reversao"],
          casos: ["q-unicamp2023-012"],
          questoes: ["q-unicamp2023-012","q-sirio2026-009"],
          prosa: `[[A heparina não fracionada se reverte com protamina, que se liga a ela; é o que se faz quando surge hemorragia intracraniana durante a heparinização. Os anticoagulantes diretos têm reversores próprios (idarucizumabe para dabigatrana; andexanete para os anti-Xa) reservados ao sangramento grave; com sangramento pequeno e paciente estável, basta suspender e observar, porque a meia-vida é curta.|q-unicamp2023-012,q-sirio2026-009]]`,
          texto: `- Hemorragia cerebral com heparina não fracionada: **protamina**. {q-unicamp2023-012}
- Hematêmese com dabigatrana, estável e Hb normal: **observação**. {q-sirio2026-009}` },
      ],
    },
    {
      id: "trombofilias", titulo: "Trombofilias e síndrome antifosfolípide",
      introducao: `[[Trombose em jovem, sem fator provocador, com história familiar, em local incomum ou com perdas gestacionais pede investigação de trombofilia. As hereditárias são falta de anticoagulantes naturais (antitrombina, proteína C, proteína S) ou excesso de pró-coagulantes (fator V de Leiden, mutação da protrombina); a adquirida mais importante é a síndrome antifosfolípide.|q-sirio2026-017,q-sirio2021-017,q-sessp2025-018]]`,
      fragmentos: [
        { id: "tro-saf", titulo: "Investigação e síndrome antifosfolípide", conferir: true,
          questoes: ["q-sessp2025-018","q-sessp2025-019","q-sirio2026-017","q-sirio2021-017","q-einstein2024-001"],
          prosa: `[[Dosar proteína C, S e antitrombina durante a trombose aguda ou em anticoagulação engana (consumo, varfarina e heparina as baixam): a investigação vem depois de suspensa a anticoagulação.|q-sirio2026-017]] [[A síndrome antifosfolípide junta trombose (venosa ou arterial) ou perdas gestacionais com anticorpos persistentes: anticoagulante lúpico, anticardiolipina e anti-beta-2-glicoproteína 1. O anticoagulante lúpico alarga o TTPa no tubo, mas no corpo causa trombose. O tratamento é varfarina (com heparina no início); os anticoagulantes diretos falham na síndrome de alto risco (triplo positivo, trombose arterial).|q-sessp2025-018,q-sessp2025-019,q-sirio2021-017,q-einstein2024-001]]`,
          texto: `- SAF com DRC e TVP: **internar, heparina e varfarina até o INR alvo**. {q-sessp2025-018}
- Anticorpos: **anticardiolipina, anti-beta-2-glicoproteína 1 e anticoagulante lúpico**. {q-sessp2025-019}
- Proteína C e S: **investigar depois de suspender o anticoagulante**. {q-sirio2026-017}
- Abortos e TVP: **anti-beta-2-glicoproteína 1**. {q-sirio2021-017}
- Antifosfolípides: **TTPa alargado e trombose**. {q-einstein2024-001}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["ash-pti","ash-hit"],
          questoes: ["q-einstein2024-001","q-famerp2024-079","q-sirio2024-041","q-sirio2022-015","q-amrigs2020-014"],
          prosa: `[[**TTPa longo que trombosa**: o anticoagulante lúpico alarga o TTPa no laboratório e causa trombose no paciente; a einstein2024-001 explora essa inversão.|q-einstein2024-001]] [[**Pseudoplaquetopenia**: antes de investigar plaquetopenia isolada sem sangramento, repete-se em citrato (famerp2024-079).|q-famerp2024-079]] [[**PTT × síndrome hemolítico-urêmica na criança**: com diarreia e insuficiência renal predominante, na criança, pensa-se primeiro em síndrome hemolítico-urêmica; a sirio2024-041 deu PTT a uma escolar com febre e esquizócitos.|q-sirio2024-041]] [[**Trombocitopenia por heparina**: troca-se por anticoagulante não heparínico; trocar por heparina não fracionada (alternativa da sirio2022-015) mantém o problema.|q-sirio2022-015]] [[**Proporção 1:1:1** na transfusão maciça é a regra do trauma; a amrigs2020-014 cobrou como incorreta a afirmação sobre anticorpos irregulares.|q-amrigs2020-014]]`,
          texto: `- Anticoagulante lúpico: **TTPa longo e trombose**. {q-einstein2024-001}
- Plaquetopenia isolada: **repetir em citrato**. {q-famerp2024-079}
- Criança com esquizócitos: a prova deu **PTT**; pensar também em SHU. {q-sirio2024-041}
- HIT: **nenhuma heparina**. {q-sirio2022-015}
- Transfusão maciça **1:1:1**. {q-amrigs2020-014}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: as púrpuras com plaquetas baixas",
      introducao: `Resumo dos capítulos de plaquetas.`,
      fragmentos: [
        { id: "cmp-purpuras", titulo: "PTI, PTT e HIT", conferir: true,
          questoes: ["q-tp20202-024","q-tp20241-002","q-adap23-011","q-usprp2021-115"],
          prosa: `[[O que acompanha a plaquetopenia separa as três.|q-tp20202-024,q-tp20241-002,q-adap23-011,q-usprp2021-115]]

| | Trombocitopenia imune | PTT | Trombocitopenia pela heparina |
|---|---|---|---|
| Mecanismo | anticorpo contra plaqueta, destruição no baço | falta de ADAMTS13, microtrombos | anticorpo heparina-PF4 ativa plaquetas |
| Hemácias | normais | hemólise com esquizócitos | normais |
| Clínica | petéquias, mucosa | confusão, febre, rim | trombose |
| Tratamento | observar (criança) ou corticoide, imunoglobulina | plasmaférese | suspender heparina; anticoagulante não heparínico |
| Plaquetas na transfusão | só no sangramento grave | não (piora) | não |`,
          texto: `- Plaquetopenia isolada: **PTI**. {q-tp20202-024}
- Esquizócitos e confusão: **PTT**. {q-tp20241-002}
- Queda no 7º dia de heparina com TVP: **HIT**. {q-adap23-011}
- PTT: **plasmaférese**. {q-usprp2021-115}` },
      ],
    },
  ],
});
