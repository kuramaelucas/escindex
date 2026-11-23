/* resumos/sindromes-geneticas/resumo.js — resumo adaptativo de síndromes genéticas e teratógenos
   (ass-genetica-sindromes): não disjunção e aneuploidia, padrões de herança, síndrome de Down
   (cariótipo, translocação, cardiopatia, seguimento), Edwards e Patau, Turner, Klinefelter, Noonan,
   insensibilidade androgênica, Marfan, neurocutâneas, Alport, Prader-Willi e X frágil, isotretinoína
   e defeitos do tubo neural; armadilhas e tabela das cromossomopatias.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- sindromes-geneticas */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "sindromes-geneticas",
  titulo: "Síndromes genéticas e teratógenos",
  assunto: "ass-genetica-sindromes",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "ms-down", texto: "Ministério da Saúde — Diretrizes de Atenção à Pessoa com Síndrome de Down (2013)", lidoEm: null },
    { id: "aap-down", texto: "American Academy of Pediatrics — Health Supervision for Children and Adolescents With Down Syndrome (Pediatrics, 2022)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição.", questoes: ["q-amrigs2020-075"] },
  ],
  doencas: [
    {
      id: "bases", titulo: "Como os cromossomos e os genes adoecem",
      introducao: `[[Na meiose, cada par de cromossomos homólogos precisa se separar para que o gameta leve uma cópia de cada um. Quando o par **não se separa** (**não disjunção**), um gameta sai com duas cópias e outro com nenhuma; fecundados por um gameta normal, dão **trissomia** (47 cromossomos) ou **monossomia** (45). Isso acontece sobretudo na **meiose I do ovócito**, que fica parado desde a vida fetal da mãe, e por isso o risco sobe com a **idade materna**.|q-tp20212-007,q-tp20222-005,q-tp20231-050]]

[[Fora dos cromossomos inteiros, a doença pode vir de um único gene. O jeito como ela passa pela família (o **heredograma**) diz se o gene está num autossomo ou no X, e se basta uma cópia alterada (dominante) ou são precisas duas (recessiva).|q-adap25-063,q-unifesp2025-063,q-tp20261-024]]

Veja também: **Cardiopatias congênitas**, **Crescimento e puberdade**, **Triagem neonatal** e **Pré-natal**.`,
      fragmentos: [
        { id: "bas-aneuploidia", titulo: "Não disjunção e aneuploidia", conferir: true,
          figuras: [{ arquivo: "figuras/nao-disjuncao.svg", legenda: "Esquema autoral: a não disjunção na meiose produz gametas com duas cópias ou nenhuma, e daí trissomias e monossomias." }],
          casos: ["q-tp20222-005"],
          questoes: ["q-tp20212-007","q-tp20222-005","q-tp20231-050"],
          prosa: `[[Alteração **numérica** muda a quantidade de cromossomos. Se falta ou sobra um cromossomo isolado, é **aneuploidia** (47,XY,+18; 45,X); se muda o conjunto inteiro (69 ou 92 cromossomos), é euploidia anormal (poliploidia). Alteração **estrutural** é perda (deleção), ganho de um pedaço (duplicação) ou troca de lugar (translocação).|q-tp20212-007]] [[O erro mais comum é na **anáfase da meiose I**, quando os homólogos deveriam ir para polos opostos.|q-tp20222-005,q-tp20231-050]]`,
          texto: `- 47,+18 ou 45,X: **numérica, aneuploidia**. {q-tp20212-007}
- Erro na **meiose I** (anáfase), materno, cresce com a idade. {q-tp20222-005,q-tp20231-050}` },
        { id: "bas-heranca", titulo: "Ler o heredograma", conferir: true,
          casos: ["q-adap25-063"],
          questoes: ["q-adap25-063","q-unifesp2025-063","q-tp20261-024","q-unesp2025-017"],
          prosa: `[[**Autossômica dominante**: afetados em **todas as gerações**, homens e mulheres, e transmissão de pai para filho; cada filho de afetado tem 50% de chance. Exemplos: Marfan, neurofibromatose tipo 1.|q-unifesp2025-063,q-tp20261-024]] [[**Recessiva ligada ao X**: quase só **homens afetados**, que recebem o gene da **mãe portadora** sadia; **nunca de pai para filho** homem (o pai passa o Y ao filho). Exemplos: distrofia muscular de Duchenne e a forma mais comum da síndrome de Alport.|q-adap25-063,q-unesp2025-017]] Autossômica recessiva salta gerações e aparece em irmãos filhos de pais sadios, muitas vezes consanguíneos.`,
          texto: `- Todas as gerações, os dois sexos, pai → filho: **autossômica dominante**. {q-unifesp2025-063,q-tp20261-024}
- Homens afetados por mãe portadora, sem pai → filho: **recessiva ligada ao X**. {q-adap25-063,q-unesp2025-017}` },
      ],
    },
    {
      id: "down", titulo: "Síndrome de Down",
      introducao: `[[A síndrome de Down é a cromossomopatia mais comum entre os nascidos vivos. O terceiro cromossomo 21 aumenta a dose de genes que atuam no desenvolvimento do coração, do cérebro, da tireoide e da medula óssea; daí a hipotonia, a deficiência intelectual, a cardiopatia, o hipotireoidismo e o risco maior de leucemia.|q-adap21-031,q-fmabc2024-051,q-udisc20262-053]]`,
      fragmentos: [
        { id: "dow-cariotipo", titulo: "Fenótipo e cariótipo: livre, translocação, mosaico", conferir: true, diretrizes: ["ms-down"],
          casos: ["q-unesp2022-005"],
          questoes: ["q-adap21-031","q-unesp2022-005","q-fmabc2024-051"],
          prosa: `[[O recém-nascido tem **hipotonia**, perfil achatado, **fendas palpebrais oblíquas para cima**, pele redundante na nuca, orelhas pequenas e **prega palmar única**. A suspeita é clínica; o **cariótipo** confirma e define o tipo.|q-adap21-031,q-fmabc2024-051]] [[Cerca de 95% são **trissomia livre** (não disjunção, sem risco aumentado para os irmãos além do da idade materna). Uma minoria tem **translocação robertsoniana** (o 21 grudado em outro acrocêntrico, como o 14: o cariótipo mostra 46 cromossomos): pode ser nova ou herdada de um pai portador equilibrado, e por isso se faz o **cariótipo dos pais**, pelo risco de repetir. O **mosaicismo** (parte das células normal) tende a dar quadro mais leve.|q-unesp2022-005]]`,
          texto: `- Suspeita clínica; **cariótipo** confirma. {q-adap21-031,q-fmabc2024-051}
- Translocação robertsoniana: **cariótipo dos pais**, risco de repetir. {q-unesp2022-005}` },
        { id: "dow-coracao", titulo: "A cardiopatia: defeito do septo atrioventricular", conferir: true, diretrizes: ["ms-down"],
          questoes: ["q-udisc20262-053","q-adap21-031","q-fmabc2024-051"],
          prosa: `[[Cerca de metade tem cardiopatia, e a mais típica é o **defeito do septo atrioventricular** (canal AV). Como o recém-nascido pode não ter sopro (a pressão pulmonar ainda está alta), **todos fazem ecocardiograma** nas primeiras semanas, com ou sem sopro.|q-adap21-031,q-fmabc2024-051]] [[Quando a resistência pulmonar cai, o canal AV total desvia muito sangue da esquerda para a direita: **insuficiência cardíaca** com **taquipneia, hepatomegalia** e baixo ganho de peso, sem cianose no início.|q-udisc20262-053]]`,
          texto: `- **Ecocardiograma para todos**, mesmo sem sopro. {q-adap21-031,q-fmabc2024-051}
- Canal AV total: **taquipneia e hepatomegalia** (IC), sem cianose. {q-udisc20262-053}` },
        { id: "dow-seguimento", titulo: "Seguimento: exames, estimulação e cuidados", conferir: true, diretrizes: ["ms-down","aap-down"],
          questoes: ["q-unesp2024-006","q-fmabc2024-051","q-unesp2026-005","q-tp20231-036","q-unesp2023-006"],
          prosa: `[[Além das triagens de todo recém-nascido (pezinho, orelhinha, coraçãozinho, linguinha), a criança com Down faz **ecocardiograma, cariótipo, hemograma** (a medula pode fazer doença mieloproliferativa transitória, policitemia e, mais tarde, leucemia) e **TSH e T4 livre** (o hipotireoidismo é frequente), que se repetem no seguimento junto com avaliação de visão e audição.|q-unesp2024-006,q-fmabc2024-051,q-unesp2026-005]] [[A frouxidão ligamentar pode causar **instabilidade atlantoaxial**: dor cervical ou sinal neurológico pede **radiografia da coluna cervical**.|q-unesp2026-005]] [[O atraso motor é esperado e responde à **estimulação precoce** com equipe multiprofissional, começada já no diagnóstico e continuada em casa pela família. A primeira avaliação da boca também é precoce, nos primeiros meses.|q-tp20231-036,q-unesp2023-006]] Na adolescência entram vacinas, sono, exercício, escola, orientação vocacional e sexual.`,
          texto: `- **Eco, cariótipo, hemograma, TSH/T4L**, além das triagens. {q-unesp2024-006,q-fmabc2024-051}
- Dor cervical: **radiografia cervical** (instabilidade atlantoaxial). {q-unesp2026-005}
- **Estimulação precoce** multiprofissional desde já; avaliação bucal precoce. {q-tp20231-036,q-unesp2023-006}` },
      ],
    },
    {
      id: "trissomias", titulo: "Edwards e Patau",
      introducao: `[[As trissomias do 18 e do 13 vêm da mesma não disjunção, também mais comum com mãe mais velha, mas são muito mais graves: malformações múltiplas, restrição de crescimento e, na maioria, morte no primeiro ano. Cada uma tem um conjunto de sinais que aponta o cromossomo.|q-tp20222-004,q-tp20251-055,q-sirio2023-052]]`,
      fragmentos: [
        { id: "tri-edwards", titulo: "Trissomia 18 (Edwards)", conferir: true,
          questoes: ["q-tp20222-004","q-tp20212-007"],
          prosa: `[[Edwards: **occipício proeminente**, **micrognatia**, **mãos fechadas com dedos sobrepostos** (o indicador sobre o médio), **pés em mata-borrão** (calcanhar proeminente), cardiopatia e baixo peso. O cariótipo é **47,+18**.|q-tp20222-004,q-tp20212-007]]`,
          texto: `- Mãos fechadas com dedos sobrepostos, occipício, pés em mata-borrão: **+18**. {q-tp20222-004,q-tp20212-007}` },
        { id: "tri-patau", titulo: "Trissomia 13 (Patau)", conferir: true,
          questoes: ["q-tp20251-055","q-sirio2023-052","q-sirio2021-052"],
          prosa: `[[Patau é a trissomia da **linha média**: **holoprosencefalia** (o cérebro anterior não se divide), **fenda labiopalatina**, **microftalmia** e olhos próximos, **polidactilia pós-axial**, defeito do couro cabeludo e cardiopatia. O cariótipo é **47,+13**.|q-tp20251-055,q-sirio2023-052,q-sirio2021-052]]`,
          texto: `- Holoprosencefalia, fenda, microftalmia, polidactilia: **+13**. {q-tp20251-055,q-sirio2023-052,q-sirio2021-052}` },
      ],
    },
    {
      id: "sexuais", titulo: "Cromossomos sexuais e diferenças do desenvolvimento sexual",
      introducao: `[[O X a menos ou a mais quase não muda o recém-nascido, mas aparece na **puberdade**: as gônadas não funcionam e a hipófise sobe o FSH e o LH (**hipogonadismo hipergonadotrófico**). A baixa estatura da menina sem puberdade e o rapaz alto com testículos pequenos são as duas pistas.|q-scmsp2025-059,q-tp20231-050,q-famerp2023-029]]`,
      fragmentos: [
        { id: "sex-turner", titulo: "Turner (45,X)", conferir: true,
          questoes: ["q-scmsp2025-059","q-amrigs2022-062","q-tp20231-050","q-einstein2026-042"],
          prosa: `[[No recém-nascido, Turner aparece como **linfedema de mãos e pés** e **pescoço alado** (resto do higroma cervical fetal). Depois vêm **baixa estatura**, tórax largo com mamilos afastados, **4º metacarpo curto** e cúbito valgo.|q-amrigs2022-062,q-einstein2026-042]] [[Os ovários viram fitas fibrosas (**falência ovariana**): falta de puberdade e **amenorreia primária**. Procuram-se **valva aórtica bicúspide** e coarctação, e rim em ferradura. A inteligência costuma ser normal.|q-scmsp2025-059,q-tp20231-050,q-einstein2026-042]]`,
          texto: `- RN: **linfedema e pescoço alado**; depois baixa estatura, 4º metacarpo curto. {q-amrigs2022-062,q-einstein2026-042}
- **Falência ovariana** e **aorta bicúspide**/coarctação. {q-scmsp2025-059,q-tp20231-050,q-einstein2026-042}` },
        { id: "sex-klinefelter", titulo: "Klinefelter (47,XXY)", conferir: true,
          questoes: ["q-famerp2023-029"],
          prosa: `[[O X a mais no menino leva a **testículos pequenos e firmes**, que produzem pouca testosterona: **alta estatura** com membros longos (as epífises demoram a fechar), **ginecomastia**, pouca pilificação, infertilidade e dificuldade escolar.|q-famerp2023-029]]`,
          texto: `- Alto, membros longos, ginecomastia, testículos pequenos: **47,XXY**. {q-famerp2023-029}` },
        { id: "sex-noonan", titulo: "Noonan: parece Turner, mas o cariótipo é normal", conferir: true,
          questoes: ["q-iamspe2022-041","q-amrigs2022-062"],
          prosa: `[[A síndrome de Noonan é **autossômica dominante** (gene da via RAS, como o PTPN11), com **cariótipo normal**, em meninos e meninas. Tem baixa estatura, **ptose palpebral**, pescoço alado e **tórax alterado** (pectus), mas a cardiopatia é do **lado direito**: **estenose pulmonar valvar** (ou miocardiopatia hipertrófica). O hormônio de crescimento melhora a estatura.|q-iamspe2022-041,q-amrigs2022-062]]`,
          texto: `- Ptose, pescoço alado, pectus, **estenose pulmonar**, cariótipo normal: **Noonan**. {q-iamspe2022-041,q-amrigs2022-062}` },
        { id: "sex-androgenio", titulo: "Insensibilidade aos andrógenos (46,XY)", conferir: true,
          casos: ["q-usprp2023-007"],
          questoes: ["q-usprp2023-007"],
          prosa: `[[Na **insensibilidade completa aos andrógenos** o cariótipo é 46,XY e há testículos, mas o **receptor de andrógeno não funciona**: a genitália externa fica feminina. O testículo produz o hormônio antimülleriano, então **não há útero**. Por isso a sexagem fetal mostra XY e a ultrassonografia, genitália feminina.|q-usprp2023-007]]`,
          texto: `- 46,XY, genitália feminina, **sem útero**: **insensibilidade androgênica**. {q-usprp2023-007}` },
      ],
    },
    {
      id: "genicas", titulo: "Síndromes de um gene",
      introducao: `[[Nas síndromes de um gene, o defeito numa proteína explica o quadro inteiro: fibrilina fraca deixa a aorta e o cristalino frouxos; o colágeno IV alterado lesa o glomérulo e o ouvido; a neurofibromina sem função libera o crescimento de tumores nos nervos.|q-unifesp2025-063,q-unesp2025-017,q-tp20261-024]]`,
      fragmentos: [
        { id: "gen-marfan", titulo: "Marfan", conferir: true,
          casos: ["q-usprp2021-031"],
          questoes: ["q-unifesp2025-063","q-usprp2021-031"],
          prosa: `[[Marfan é **autossômica dominante** (gene da **fibrilina-1**). Alta estatura com envergadura maior que a altura, **aracnodactilia** (sinais do polegar e do punho), pectus, escoliose, frouxidão ligamentar, **luxação do cristalino** e **dilatação da raiz da aorta**.|q-unifesp2025-063,q-usprp2021-031]] [[A aorta dilatada pode **dissecar**: esporte competitivo intenso e de contato fica contraindicado até a avaliação cardiológica com ecocardiograma.|q-usprp2021-031]]`,
          texto: `- Aracnodactilia, cristalino luxado, aorta dilatada: **Marfan, dominante**. {q-unifesp2025-063,q-usprp2021-031}
- Esporte intenso: **não liberar** (risco de **dissecção da aorta**). {q-usprp2021-031}` },
        { id: "gen-neurocutaneas", titulo: "Neurofibromatose tipo 1 e Sturge-Weber", conferir: true,
          questoes: ["q-tp20261-024","q-amrigs2023-065"],
          prosa: `[[Na **neurofibromatose tipo 1** (autossômica dominante) há **manchas café com leite**, efélides nas axilas, neurofibromas e nódulos de Lisch. O **glioma das vias ópticas** pode invadir o hipotálamo e acionar cedo o eixo gonadal: **puberdade precoce central** (testículos crescem, não só pelos).|q-tp20261-024]] [[A **mancha vinho do Porto** na face, no território do ramo oftálmico do trigêmeo, levanta a suspeita de **Sturge-Weber** (angiomatose das leptomeninges, com convulsão e glaucoma); o exame é **ressonância com contraste** do crânio.|q-amrigs2023-065]]`,
          texto: `- Café com leite + puberdade precoce central: **glioma óptico (NF1)**. {q-tp20261-024}
- Mancha vinho do Porto na face: **ressonância** (Sturge-Weber). {q-amrigs2023-065}` },
        { id: "gen-alport", titulo: "Alport", conferir: true,
          questoes: ["q-unesp2025-017"],
          prosa: `[[O **colágeno IV** forma a membrana basal do glomérulo, da cóclea e do cristalino. Alterado (forma mais comum **ligada ao X**), dá **hematúria e nefrite progressiva**, **surdez neurossensorial** de altas frequências e lenticone anterior.|q-unesp2025-017]]`,
          texto: `- Nefrite + **surdez neurossensorial**: **Alport**. {q-unesp2025-017}` },
        { id: "gen-imprinting", titulo: "Prader-Willi e X frágil", conferir: true,
          questoes: ["q-tp20252-005","q-usprp2024-078","q-tp20261-068"],
          prosa: `[[Na região **15q11-q13** só a cópia **paterna** de alguns genes funciona (imprinting). Perdida a cópia paterna (deleção ou duas cópias maternas), surge **Prader-Willi**: hipotonia e **má sucção** no lactente, depois **fome insaciável e obesidade**, baixa estatura, mãos e pés pequenos, micropênis e deficiência intelectual leve. Perdida a cópia materna, é Angelman.|q-tp20252-005,q-usprp2024-078]] [[No **X frágil** há **expansão de trinucleotídeos CGG** no gene **FMR1**: deficiência intelectual, comportamento autista, face alongada, orelhas grandes e **macro-orquidismo**. Mulheres com pré-mutação têm **menopausa precoce**. O exame é a **PCR do FMR1**, não o cariótipo.|q-tp20261-068]]`,
          texto: `- Hipotonia e má sucção, depois **hiperfagia**: **Prader-Willi (deleção paterna 15q)**. {q-tp20252-005,q-usprp2024-078}
- DI + macro-orquidismo + menopausa precoce na mãe: **X frágil, PCR do FMR1**. {q-tp20261-068}` },
      ],
    },
    {
      id: "teratogenos", titulo: "Teratógenos e defeitos do tubo neural",
      introducao: `[[O embrião é mais vulnerável na **organogênese**, entre a 3ª e a 8ª semana, muitas vezes antes de a mulher saber da gravidez. Por isso a prevenção vem antes: contracepção para quem usa droga teratogênica e ácido fólico para quem pode engravidar.|q-tp20251-057,q-tp20261-064,q-tp20222-006]]`,
      fragmentos: [
        { id: "ter-isotretinoina", titulo: "Isotretinoína", conferir: true,
          questoes: ["q-tp20251-057","q-tp20261-064"],
          prosa: `[[A isotretinoína é um retinoide: atrapalha a **proliferação, a migração e a diferenciação das células da crista neural** cranial, que formam orelha, face, timo e parte do coração. Daí **microtia**, fenda palatina, cardiopatia conotruncal e **hidrocefalia**. Exige contracepção eficaz durante o uso e um mês depois.|q-tp20251-057,q-tp20261-064]]`,
          texto: `- Microtia, fenda, hidrocefalia após isotretinoína: **crista neural**. {q-tp20251-057,q-tp20261-064}` },
        { id: "ter-tubo-neural", titulo: "Defeitos do tubo neural e ácido fólico", conferir: true,
          casos: ["q-tp20222-006"],
          questoes: ["q-tp20222-006","q-tp20231-055"],
          prosa: `[[O tubo neural se fecha na **neurulação primária**, na **3ª e 4ª semanas**. Falha de fechamento dá anencefalia ou mielomeningocele, e o **ácido fólico (vitamina B9)** antes da concepção reduz o risco.|q-tp20222-006]] [[A forma mais branda é a **espinha bífida oculta**: falha na fusão dos arcos vertebrais, **sem saída** de meninge ou medula, às vezes marcada só por um **tufo de pelos** na região lombar.|q-tp20231-055]]`,
          texto: `- Neurulação primária, **3ª–4ª semana**; prevenção com **ácido fólico (B9)**. {q-tp20222-006}
- Tufo de pelos lombar, arco aberto sem protrusão: **espinha bífida oculta**. {q-tp20231-055}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["ms-down","aap-down"],
          questoes: ["q-unesp2026-005","q-adap21-031","q-iamspe2022-041","q-famerp2023-029","q-tp20231-050"],
          prosa: `[[**Radiografia cervical na síndrome de Down**: a diretriz brasileira de 2013 previa radiografia em idades marcadas; a da AAP de 2022 a reserva para quem tem sintoma. Com **dor cervical**, como na unesp2026-005, ela entra; sem sintoma, não vem antes do ecocardiograma e do cariótipo (adap21-031).|q-unesp2026-005,q-adap21-031]] [[**Turner × Noonan**: o pescoço alado é dos dois; cariótipo normal, menino possível e estenose pulmonar são de Noonan.|q-iamspe2022-041]] [[**XXY × XYY**: o rapaz alto com testículos pequenos e ginecomastia é 47,XXY; o 47,XYY é alto, mas tem testículos normais.|q-famerp2023-029]] [[**45,X**: monossomia por não disjunção; 47,XXX (e não "45,XXX") é a trissomia do X.|q-tp20231-050]]`,
          texto: `- RX cervical: **com sintoma**; a diretriz de 2013 previa rotina. {q-unesp2026-005,q-adap21-031}
- **Noonan**: cariótipo normal, estenose pulmonar. {q-iamspe2022-041}
- Testículos pequenos: **XXY**, não XYY. {q-famerp2023-029}
- Turner é **45,X**. {q-tp20231-050}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: as cromossomopatias",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-cromossomos", titulo: "Cariótipo, sinais e o que procurar", conferir: true,
          questoes: ["q-adap21-031","q-tp20222-004","q-tp20251-055","q-scmsp2025-059","q-famerp2023-029"],
          prosa: `[[Cada cariótipo tem a sua marca.|q-adap21-031,q-tp20222-004,q-tp20251-055,q-scmsp2025-059,q-famerp2023-029]]

| Síndrome | Cariótipo | Sinais que apontam | Procurar |
| Down | 47,+21 (ou translocação) | hipotonia, fendas oblíquas, prega palmar única | canal AV, hipotireoidismo, leucemia |
| Edwards | 47,+18 | dedos sobrepostos, occipício, pés em mata-borrão | cardiopatia; sobrevida curta |
| Patau | 47,+13 | holoprosencefalia, fenda, polidactilia | cardiopatia; sobrevida curta |
| Turner | 45,X | baixa estatura, pescoço alado, linfedema | falência ovariana, aorta bicúspide |
| Klinefelter | 47,XXY | alto, ginecomastia, testículos pequenos | infertilidade, hipogonadismo |`,
          texto: `- Down: **canal AV**. {q-adap21-031}
- Edwards: **dedos sobrepostos**. {q-tp20222-004}
- Patau: **holoprosencefalia**. {q-tp20251-055}
- Turner: **45,X**. {q-scmsp2025-059}
- Klinefelter: **XXY**. {q-famerp2023-029}` },
      ],
    },
  ],
});
