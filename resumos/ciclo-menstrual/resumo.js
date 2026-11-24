/* resumos/ciclo-menstrual/resumo.js — resumo adaptativo de ciclo menstrual e seus distúrbios: fisiologia (eixo,
   duas células, ovulação), amenorreia primária e secundária (investigação e causas), síndrome dos ovários
   policísticos e outros hiperandrogenismos, sangramento uterino anormal (PALM-COEIN) e tratamento, dismenorreia
   e transtorno disfórico pré-menstrual. Molde e regras: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- ciclo-menstrual */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "ciclo-menstrual",
  titulo: "Ciclo menstrual, amenorreia, SOP e sangramento uterino anormal",
  assunto: "ass-ciclomenstrual",
  criadoEm: "2026-11-19",
  fontes: [
    { id: "figo-palm-coein", texto: "FIGO — sistemas 1 e 2 do sangramento uterino anormal na idade reprodutiva (PALM-COEIN), revisão de 2018 (Munro et al., Int J Gynaecol Obstet 2018)", lidoEm: null },
    { id: "sop-2023", texto: "International evidence-based guideline for the assessment and management of polycystic ovary syndrome 2023 (Teede et al., Eur J Endocrinol 2023;189:G43-G64, doi 10.1093/ejendo/lvad096; resumo lido no PubMed em 19/11/2026, texto completo não aberto)", lidoEm: null },
    { id: "eshre-iop", texto: "ESHRE — Guideline on premature ovarian insufficiency (2024)", lidoEm: null },
    { id: "febrasgo-amenorreia", texto: "FEBRASGO — Protocolos de amenorreia e de sangramento uterino anormal", lidoEm: null },
    { id: "dsm5", texto: "APA — DSM-5-TR, transtorno disfórico pré-menstrual (2022)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas pela banca, sem reposição", questoes: ["q-usp2023-023","q-amrigs2021-054"] },
  ],
  doencas: [
    {
      id: "fisiologia", titulo: "Fisiologia do ciclo menstrual",
      introducao: `[[O ciclo depende de um eixo íntegro: o hipotálamo libera GnRH em pulsos, a hipófise responde com FSH e LH, o ovário produz estrogênio e progesterona, e um útero com endométrio responsivo e trato de saída pérvio descama todo mês.|q-unesp2025-034,q-sirio2021-064,q-tp20212-010]] É essa cadeia que organiza a investigação de qualquer amenorreia: compartimento I (útero e trato), II (ovário), III (hipófise) e IV (hipotálamo).

[[Pela teoria das duas células, o LH faz a teca produzir androgênios, e o FSH faz a granulosa converter esses androgênios em estradiol pela aromatase.|q-scmsp2022-046,q-sirio2026-063,q-einstein2027-057]] [[Na fase folicular, os pulsos de GnRH são frequentes, a progesterona é baixa e o estradiol sobe; quando o estradiol se mantém alto, o efeito vira positivo e dispara o pico de LH no meio do ciclo, e a ovulação vem 10 a 12 horas depois do pico de LH (24 a 36 horas depois do pico de estradiol).|q-sirio2027-080,q-scmsp2026-076,q-sirio2023-067,q-fmabc2022-065,q-fmabc2023-077]] [[O recrutamento inicial dos folículos primordiais não depende de gonadotrofina; depois vêm seleção e dominância, que dependem do FSH.|q-unesp2023-037,q-unesp2022-031]] [[A progesterona do corpo lúteo para a proliferação do endométrio e o torna secretor.|q-fmabc2024-068]]

Veja também: **Climatério** (falência ovariana fisiológica), **Endometriose** (dismenorreia secundária), **Câncer de endométrio** (sangramento na pós-menopausa), **Contracepção** (contraceptivos usados aqui como tratamento), **Crescimento e puberdade** (pediatria: puberdade e atraso).`,
      fragmentos: [
        { id: "fis-eixo", titulo: "Eixo, folículos, ovulação e androgênios",
          figuras: [{ arquivo: "figuras/ciclo.svg", legenda: "Esquema autoral: hormônios ao longo do ciclo de 28 dias e o que cada fase faz no ovário e no endométrio." }],
          questoes: ["q-scmsp2022-046","q-scmsp2026-076","q-unesp2023-037","q-unesp2022-031","q-sirio2023-067","q-sirio2026-063","q-sirio2027-080","q-sirio2021-064","q-fmabc2024-068","q-fmabc2022-065","q-fmabc2023-077","q-tp20212-010","q-unesp2025-034","q-einstein2027-057","q-iamspe2026-049","q-sirio2023-073"],
          casos: ["q-sirio2021-064"],
          prosa: `[[A di-hidrotestosterona nasce só da conversão periférica da testosterona pela 5-alfa-redutase, no folículo piloso; por isso a finasterida atua no hirsutismo.|q-sirio2023-073]] [[A veia ovariana esquerda drena para a veia renal esquerda; a direita, direto para a cava.|q-iamspe2026-049]]`,
          texto: `- FSH induz a **aromatase** na granulosa. {q-scmsp2022-046,q-sirio2026-063}
- Predomínio de LH: a **teca** faz mais androgênio (androstenediona). {q-einstein2027-057}
- Pico de LH no **meio do ciclo**. {q-scmsp2026-076}
- Ovulação **10–12 h após o pico de LH** e 24–36 h após o de estradiol. {q-fmabc2022-065,q-fmabc2023-077,q-sirio2023-067}
- Fase folicular: GnRH **frequente**, progesterona baixa, estrogênio subindo. {q-sirio2027-080}
- Recrutamento inicial **independente** de gonadotrofinas; depois seleção e dominância. {q-unesp2023-037,q-unesp2022-031}
- Na figura: **inibina, estradiol, progesterona, FSH, GnRH**. {q-sirio2021-064}
- Ovulação no ovário implantado: **FSH e LH** (hipófise) e **estrogênios** (ovário). {q-tp20212-010}
- Progesterona: para a proliferação e **diferencia as glândulas**. {q-fmabc2024-068}
- Ciclo normal exige eixo íntegro, tireoide e adrenal normais e **trato pérvio**. {q-unesp2025-034}
- Androgênio só periférico: **di-hidrotestosterona**. {q-sirio2023-073}
- Veia ovariana esquerda → **renal esquerda**. {q-iamspe2026-049}` },
      ],
    },
    {
      id: "amenorreia", titulo: "Amenorreia",
      introducao: `[[Toda amenorreia começa por excluir gravidez com beta-hCG, inclusive em quem acha que não pode engravidar.|q-famema2021-055,q-einstein2024-050]] [[Depois, TSH e prolactina, porque hipotireoidismo e hiperprolactinemia são causas comuns e tratáveis; o FSH separa a falência ovariana (FSH alto) da causa central (FSH baixo ou normal).|q-amrigs2022-053,q-tp20202-082]]

[[O teste da progesterona mede o estrogênio: se a progestina causa sangramento, há estrogênio e trato de saída pérvio (anovulação, como na SOP); se não sangra, dá-se estrogênio com progestina, e sangramento aí aponta falta de estrogênio (ovário ou centro), enquanto a falta dele aponta o útero (Asherman).|q-famema2023-044,q-uspsp5-032,q-amrigs2024-045,q-scmsp2025-067,q-simepm89-035]]

[[Na amenorreia primária com mama desenvolvida e sem útero, o defeito é dos ductos paramesonéfricos (Mayer-Rokitansky-Küster-Hauser, cariótipo 46,XX, ovários e pelos normais) ou insensibilidade completa aos androgênios (46,XY, testículos inguinais, pelos escassos, testosterona masculina).|q-iamspe2021-052,q-iamspe2025-042,q-unesp2023-034,q-tp20232-093,q-adap26-047]]`,
      fragmentos: [
        { id: "ame-primaria", titulo: "Amenorreia primária",
          questoes: ["q-adap26-047","q-iamspe2021-052","q-iamspe2025-042","q-unesp2023-034","q-tp20232-093","q-tp20212-095","q-unesp2024-030","q-iamspe2023-053"],
          prosa: `[[Sem mamas e com FSH alto, a gônada não funciona: disgenesia gonadal, e o cariótipo é obrigatório (Turner; com Y, a gônada sai pelo risco de tumor).|q-tp20212-095]] [[Sem mamas e com FSH e LH baixos, o centro falha; com anosmia, é Kallmann (hipogonadismo hipogonadotrófico).|q-unesp2024-030]] [[A histeroscopia vê a cavidade, mas não o fundo externo: separar útero septado de bicorno pede ressonância ou ultrassom 3D.|q-iamspe2023-053]]`,
          texto: `- Mama normal, sem útero, ovários normais: **Rokitansky** (ductos **paramesonéfricos**). {q-iamspe2021-052,q-iamspe2025-042,q-unesp2023-034,q-tp20232-093}
- Testosterona masculina e gônadas inguinais: **insensibilidade completa aos androgênios**. {q-adap26-047}
- M1P1 com FSH muito alto: **disgenesia gonadal**, cariótipo. {q-tp20212-095}
- M1P1, anosmia, FSH e LH baixos: **hipogonadismo hipogonadotrófico**. {q-unesp2024-030}
- Septado × bicorno: a histeroscopia **não diferencia**. {q-iamspe2023-053}` },
        { id: "ame-investigar", titulo: "Investigar a amenorreia secundária", conferir: true, diretrizes: ["febrasgo-amenorreia"],
          questoes: ["q-famema2021-055","q-amrigs2022-053","q-tp20202-082","q-famema2023-044","q-uspsp1-084","q-uspsp5-032","q-amrigs2024-045","q-scmsp2025-067","q-unesp2021-030","q-einstein2024-050","q-usp2022-081"],
          prosa: `[[Perto dos 45 anos, sem queixas, alguns meses sem menstruar podem ser só a transição menopausal.|q-unesp2021-030,q-usp2022-081]]`,
          texto: `- Primeiro passo: **β-hCG**, inclusive no homem trans sem testosterona. {q-famema2021-055,q-einstein2024-050}
- Depois: **TSH e prolactina**. {q-amrigs2022-053}
- Aos 48 anos: **FSH, prolactina e hCG**. {q-tp20202-082}
- Teste da progesterona positivo: **estrogênio presente** e trato pérvio. {q-famema2023-044,q-uspsp5-032}
- Sangrou com progestina, ciclos irregulares: **anovulação/SOP**, progestagênio cíclico. {q-amrigs2024-045,q-uspsp5-032}
- Obesa com acantose: a progesterona **vai fazer sangrar**. {q-scmsp2025-067}
- Causas secundárias: **anovulação crônica, falência ovariana, Sheehan**. {q-uspsp1-084}
- 45 anos sem queixas: **expectante**. {q-unesp2021-030}
- 43 anos com 60 dias de atraso e teste negativo: banca, **bloqueio de gonadotrofinas**. {q-usp2022-081}` },
        { id: "ame-causas", titulo: "Prolactina, hipotálamo, falência ovariana e Asherman", conferir: true, diretrizes: ["eshre-iop"],
          questoes: ["q-scmsp2021-061","q-adap22-022","q-unicampdis2024-107","q-unicampdis2025-083","q-usprp2025-057","q-usp2022-089","q-sirio2027-074","q-fmabc2022-063","q-usp2022-086","q-famerp2025-027","q-simepm89-035"],
          casos: ["q-usp2022-086"],
          prosa: `[[A prolactina alta inibe o GnRH: amenorreia, às vezes galactorreia.|q-scmsp2021-061]] [[Estresse, perda de peso e exercício intenso cortam os pulsos de GnRH: FSH e LH baixos, estrogênio baixo e perda óssea, por isso a densitometria.|q-unicampdis2025-083,q-usprp2025-057,q-sirio2027-074,q-fmabc2022-063,q-usp2022-089]] [[Antes dos 40 anos, alteração menstrual por 4 meses ou mais com FSH acima de 25 UI/L é insuficiência ovariana prematura (a ESHRE 2024 pede uma dosagem e só repete em 4–6 semanas na dúvida; as provas cobram duas): pede cariótipo e pré-mutação do FMR1 e terapia hormonal até a idade da menopausa.|q-adap22-022,q-unicampdis2024-107]] [[Curetagem agressiva destrói a camada basal e cola as paredes (Asherman): o teste com estrogênio e progestina não sangra, e a histeroscopia faz o diagnóstico e libera as aderências.|q-famerp2025-027,q-simepm89-035,q-usp2022-086]]`,
          texto: `- Amenorreia com prolactina alta: **hiperprolactinemia**. {q-scmsp2021-061}
- FSH muito baixo, sem outras causas: **amenorreia hipotalâmica funcional**. {q-unicampdis2025-083,q-sirio2027-074}
- FSH e LH baixos, vagina hipotrófica: **hipogonadismo hipogonadotrófico**. {q-fmabc2022-063}
- Hipotalâmica: pedir **densitometria**. {q-usprp2025-057}
- FSH 62 repetido aos 32 anos: **insuficiência ovariana prematura**, cariótipo, FMR1 e terapia hormonal até 50. {q-adap22-022,q-unicampdis2024-107}
- Atleta com fratura de estresse: além de dieta, a banca escolheu **contraceptivo combinado**. {q-usp2022-089}
- Amenorreia após curetagem: **Asherman**. {q-famerp2025-027,q-usp2022-086}
- Asherman: histerossalpingografia e **histeroscopia com lise de aderências**. {q-simepm89-035}` },
      ],
    },
    {
      id: "sop", titulo: "Síndrome dos ovários policísticos e hiperandrogenismo",
      introducao: `[[Na SOP, o pulso rápido de GnRH favorece o LH sobre o FSH; o LH faz a teca produzir androgênio, e sem FSH suficiente o folículo não amadurece: anovulação, ciclos longos e hiperandrogenismo.|q-usp2023-024,q-einstein2027-057,q-sirio2022-058]] [[A resistência à insulina agrava tudo: a insulina alta estimula a teca e baixa a SHBG (mais testosterona livre), e aparece na pele como acantose nigricans.|q-scmsp2021-069,q-sessp2025-064,q-sirio2027-073,q-einstein2023-055]]

[[O diagnóstico (Rotterdam, mantido pelo consenso internacional de 2023) pede dois de três — oligo ou anovulação, hiperandrogenismo clínico ou laboratorial, ovários policísticos (ou hormônio antimülleriano alto, só no adulto) — depois de excluir tireoide, prolactina, hiperplasia adrenal não clássica (17-OH-progesterona) e tumor.|q-famema2021-047,q-adap25-069,q-tp20241-089,q-einstein2025-060]] Na adolescente, os critérios são só os dois primeiros, porque ovário multifolicular é normal nos primeiros anos após a menarca.`,
      fragmentos: [
        { id: "sop-diagnostico", titulo: "Diagnóstico e riscos da SOP", conferir: true, diretrizes: ["sop-2023"],
          questoes: ["q-adap25-069","q-unifesp2022-022","q-scmsp2021-069","q-usp2023-024","q-usp2025-001","q-famema2021-047","q-sessp2023-048","q-tp20241-089","q-tp20252-009","q-famerp2025-032","q-einstein2023-055","q-einstein2025-060","q-sirio2022-058","q-unesp2023-035","q-sessp2025-064","q-sirio2027-073"],
          casos: ["q-usp2025-001"],
          prosa: `[[Os fenótipos combinam os critérios: A tem os três; B, anovulação e hiperandrogenismo sem ovário policístico; C, hiperandrogenismo e ovário policístico com ciclos regulares; D, anovulação e ovário policístico sem hiperandrogenismo.|q-unifesp2022-022,q-sessp2023-048]] [[A SOP traz risco de pré-diabetes, apneia do sono e, na gestação, pré-eclâmpsia e diabetes.|q-unesp2023-035]]`,
          texto: `- Antes de fechar SOP: **TSH, prolactina e 17-OH-progesterona**. {q-adap25-069,q-einstein2025-060}
- Investigação completa: **β-hCG, FSH, TSH, PRL, testosterona, 17OHP, DHEAS**. {q-tp20241-089}
- Rotterdam: **2 de 3**. {q-famema2021-047,q-famerp2025-032}
- Ciclos irregulares, hiperandrogenismo, ovários normais: **fenótipo B**. {q-unifesp2022-022,q-sessp2023-048}
- Laboratório típico: **LH alto em relação ao FSH**. {q-usp2023-024}
- Imagem ovariana: muitos folículos periféricos. {q-usp2025-001}
- Hormônio dos sintomas: **testosterona**. {q-sirio2022-058}
- Amenorreia pós-pílula com exames normais: **SOP**. {q-tp20252-009}
- Associação mais frequente: **resistência insulínica**. {q-scmsp2021-069,q-einstein2023-055}
- Acantose: **resistência à insulina, hiperinsulinemia**. {q-sessp2025-064,q-sirio2027-073}
- Riscos: **apneia do sono, pré-diabetes, pré-eclâmpsia**. {q-unesp2023-035}` },
        { id: "sop-tratamento", titulo: "Tratamento da SOP", conferir: true, diretrizes: ["sop-2023"],
          questoes: ["q-adap24-034","q-scmsp2023-062","q-usp2025-002","q-usp2025-003","q-usprp2024-084","q-usprp2026-070","q-amrigs2025-049","q-famema2022-054","q-fmabc2021-048"],
          prosa: `[[A base é perder peso e se exercitar: 5 a 10% de perda já faz voltar a ovular.|q-fmabc2021-048]] [[O contraceptivo combinado suprime o LH (menos androgênio na teca), aumenta a SHBG e protege o endométrio da hiperplasia; é a primeira linha para ciclo e hirsutismo.|q-usp2025-002,q-amrigs2025-049,q-famema2022-054,q-scmsp2023-062]] [[Antiandrogênios (espironolactona, finasterida) entram com contracepção segura.|q-usp2025-003]] [[A metformina trata o metabolismo (pré-diabetes) e o letrozol é a primeira escolha para induzir ovulação.|q-usprp2024-084,q-usprp2026-070,q-adap24-034]]`,
          texto: `- Primeira conduta: **perder peso e atividade física**. {q-fmabc2021-048}
- Contraceptivo combinado: **reduz o efeito do LH na teca**. {q-usp2025-002}
- Primeira linha para hirsutismo e ciclo: **contraceptivo combinado**. {q-amrigs2025-049,q-famema2022-054,q-scmsp2023-062}
- Acne androgênica (com contracepção): **finasterida**. {q-usp2025-003}
- Glicemia alterada: **metformina**. {q-usprp2024-084,q-usprp2026-070}
- Quer engravidar, trompas e sêmen normais: **inibidor de aromatase** (letrozol). {q-adap24-034}` },
        { id: "sop-outros", titulo: "Outras causas de hiperandrogenismo",
          questoes: ["q-adap23-050","q-unifesp2023-050","q-unifesp2025-069","q-famema2025-056"],
          prosa: `[[Virilização rápida (voz grossa, clitoromegalia) com testosterona acima de cerca de 200 ng/dL é tumor até prova em contrário: ovário e adrenal se examinam por imagem.|q-adap23-050]] [[Na pós-menopausa, virilização progressiva sugere hipertecose ovariana.|q-unifesp2025-069]] [[A hiperplasia adrenal não clássica (deficiência de 21-hidroxilase) imita a SOP e se reconhece pela 17-OH-progesterona alta.|q-famema2025-056]] [[Hirsutismo com ciclos e androgênios normais é idiopático.|q-unifesp2023-050]]`,
          texto: `- Virilização rápida com testosterona 280: **tumor**, imagem de ovário e adrenais. {q-adap23-050}
- 61 anos, virilização em 6 meses: **hipertecose**. {q-unifesp2025-069}
- 17-OHP de 800: **hiperplasia adrenal congênita**. {q-famema2025-056}
- Hirsutismo com ciclos e exames normais: **idiopático**. {q-unifesp2023-050}` },
      ],
    },
    {
      id: "sangramento", titulo: "Sangramento uterino anormal",
      introducao: `[[Na mulher em idade reprodutiva, o primeiro exame do sangramento anormal é o beta-hCG, e o segundo, o hemograma, porque gravidez e anemia mudam a conduta na hora.|q-amrigs2024-041,q-unesp2024-019,q-unesp2025-039]] [[A FIGO organiza as causas em PALM (estruturais: pólipo, adenomiose, leiomioma, malignidade e hiperplasia) e COEIN (não estruturais: coagulopatia, disfunção ovulatória, endometrial, iatrogênica e não classificada).|q-uspsp4-032,q-amrigs2020-054,q-einstein2025-058]]

[[Na adolescente, o eixo ainda imaturo não ovula: sem progesterona, o endométrio cresce sem controle e descama de modo irregular e intenso. A anovulação é a causa mais comum, mas sangramento grave na menarca pede pesquisar coagulopatia (von Willebrand).|q-tp20231-093,q-sirio2026-065]] [[Com ciclos regulares e exames normais, o aumento do volume é endometrial ou ovulatório: os mecanismos locais de hemostasia do endométrio falham.|q-usprp2023-031,q-einstein2022-048]]`,
      fragmentos: [
        { id: "sua-causas", titulo: "Classificar e investigar (PALM-COEIN)", conferir: true, diretrizes: ["figo-palm-coein"],
          questoes: ["q-amrigs2024-041","q-amrigs2020-054","q-usprp2023-031","q-amrigs2024-042","q-sessp2023-044","q-tp20222-092","q-tp20222-093","q-tp20252-094","q-uspsp4-032","q-einstein2021-038","q-einstein2022-048","q-einstein2025-058","q-fmabc2025-066","q-fmabc2024-069","q-unesp2024-019","q-unesp2025-039","q-sirio2026-065","q-tp20231-093"],
          casos: ["q-tp20252-094","q-uspsp4-032"],
          prosa: `[[A adenomiose, endométrio dentro do miométrio, dá útero globoso, miométrio heterogêneo e zona juncional espessa, com sangramento e dismenorreia.|q-einstein2021-038,q-fmabc2025-066]] [[Pólipo aparece como imagem ecogênica com pedículo vascular; mesmo benigno, a histeroscopia diagnostica e retira.|q-sessp2023-044,q-tp20252-094,q-fmabc2024-069]] [[Endométrio espesso com anovulação de longa data pede biópsia, pela hiperplasia.|q-tp20222-093]] [[Útero aumentado na perimenopausa pede ultrassom transvaginal antes do tratamento.|q-tp20222-092]]`,
          texto: `- Sempre **excluir gravidez**. {q-amrigs2024-041}
- Imediato na adolescente que sangra: **β-hCG e hemograma**. {q-unesp2024-019,q-unesp2025-039}
- Vaginite **não** é causa de SUA; endometriose também não. {q-amrigs2020-054,q-einstein2025-058}
- Na figura FIGO: **SUA-P e SUA-L**. {q-uspsp4-032}
- Miométrio heterogêneo e zona juncional aumentada: **SUA-A**. {q-einstein2021-038}
- Sangramento + dismenorreia: **adenomiose**. {q-fmabc2025-066}
- Imagem com pedículo: **pólipo**, histeroscopia. {q-sessp2023-044,q-tp20252-094,q-fmabc2024-069}
- Endométrio de 14 mm aos 40 anos: **hiperplasia**, biópsia. {q-tp20222-093}
- Útero globoso aos 48 anos: **ultrassom transvaginal**. {q-tp20222-092}
- Pólipo cervical saindo pelo colo: **encaminhar**. {q-amrigs2024-042}
- Endometrial: ciclos **regulares**, ultrassom normal. {q-usprp2023-031}
- Aos 47 anos com exames normais: **ovulatória**. {q-einstein2022-048}
- Adolescente com hemorragia: **anovulação** (disfunção ovulatória). {q-tp20231-093,q-sirio2026-065}` },
        { id: "sua-tratamento", titulo: "Tratar o sangramento", conferir: true, diretrizes: ["figo-palm-coein"],
          questoes: ["q-usp2024-098","q-famerp2022-034","q-udisc20262-092","q-unicampdis2022-045","q-sirio2024-080","q-fmabc2023-071"],
          prosa: `[[O ácido tranexâmico bloqueia a fibrinólise do endométrio e reduz o volume sem hormônio; no sangramento grave, estabiliza-se primeiro (transfusão se preciso).|q-usp2024-098,q-famerp2022-034,q-udisc20262-092]] [[O progestagênio (oral, injetável, DIU ou implante) atrofia o endométrio e é a terapia hormonal da causa endometrial; o contraceptivo combinado também serve, e a escolha respeita o desejo de gestar.|q-unicampdis2022-045,q-sirio2024-080,q-fmabc2023-071]]`,
          texto: `- Via oral sem hormônio: **ácido tranexâmico**. {q-usp2024-098,q-famerp2022-034}
- Sangramento com anemia grave: **transfusão e tranexâmico** EV. {q-udisc20262-092}
- Endometrial: **progestagênio** (oral, injetável, DIU ou implante). {q-unicampdis2022-045}
- Útero bicorno com miométrio heterogêneo: **etinilestradiol + drospirenona**. {q-sirio2024-080}
- Conduta conforme o **desejo reprodutivo**. {q-fmabc2023-071}` },
      ],
    },
    {
      id: "dor", titulo: "Dismenorreia e transtorno disfórico pré-menstrual",
      introducao: `[[A dismenorreia primária é a cólica sem doença pélvica, que começa com os primeiros ciclos ovulatórios: as prostaglandinas do endométrio que descama contraem o miométrio e causam isquemia; por isso os anti-inflamatórios, que bloqueiam a síntese, tratam, e o contraceptivo, que afina o endométrio e suprime a ovulação, previne.|q-usp2022-088,q-amrigs2025-042,q-uspsp5-034,q-unifesp2026-047]] Dor que piora com os anos, dor fora da menstruação ou dispareunia apontam a secundária (endometriose, adenomiose).

[[O transtorno disfórico pré-menstrual é a forma grave da síndrome pré-menstrual: sintomas de humor na fase lútea que somem poucos dias após a menstruação, causados por uma resposta anormal do cérebro à oscilação normal de estrogênio e progesterona.|q-amrigs2025-060,q-amrigs2021-060,q-sirio2023-071]]`,
      fragmentos: [
        { id: "dor-dismenorreia", titulo: "Dismenorreia",
          questoes: ["q-unifesp2026-047","q-usp2022-088","q-amrigs2025-042","q-uspsp5-034"],
          texto: `- Cólica desde as primeiras menstruações, exame normal: **AINE** (ácido mefenâmico). {q-usp2022-088,q-amrigs2025-042}
- Sem melhora, virgem com ultrassom normal: **contraceptivo combinado**. {q-uspsp5-034}
- Dismenorreia incapacitante com ultrassom normal: **progestagênio contínuo**. {q-unifesp2026-047}` },
        { id: "dor-tdpm", titulo: "Transtorno disfórico pré-menstrual", conferir: true, diretrizes: ["dsm5"],
          questoes: ["q-amrigs2025-060","q-amrigs2020-060","q-amrigs2021-060","q-uspsp1-049","q-uspsp4-025","q-sirio2023-071"],
          prosa: `[[O DSM-5 pede cinco ou mais sintomas na última semana da fase lútea, na maioria dos ciclos, com pelo menos um afetivo (labilidade, irritabilidade, humor deprimido ou ansiedade), e prejuízo funcional.|q-amrigs2020-060,q-sirio2023-071]] [[O inibidor seletivo de recaptação de serotonina funciona em dias, contínuo ou só na fase lútea, e é a primeira linha.|q-uspsp1-049,q-uspsp4-025]]`,
          texto: `- Fase em que ocorre: **lútea**. {q-amrigs2025-060}
- Sintomas que somem com a menstruação: **disfórico pré-menstrual**. {q-amrigs2021-060}
- Critério obrigatório: um sintoma **afetivo** (humor, ansiedade, irritabilidade). {q-sirio2023-071}
- Critério do DSM-5: **labilidade afetiva**. {q-amrigs2020-060}
- Primeira linha: **sertralina**, contínua ou na fase lútea. {q-uspsp1-049,q-uspsp4-025}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-usp2022-089","q-usp2022-081","q-amrigs2024-042","q-famerp2022-040"],
          texto: `- Amenorreia hipotalâmica da atleta: corrigir energia; se preciso de estrogênio, prefere-se o **estradiol transdérmico**; o gabarito deu **contraceptivo combinado**. {q-usp2022-089}
- Atraso aos 43 anos com teste negativo é, em geral, **transição menopausal**; a banca chamou de **bloqueio de gonadotrofinas**. {q-usp2022-081}
- A progesterona baixa sugere anovulação, mas a banca respondeu **pólipo cervical** pelo exame especular. {q-amrigs2024-042}
- Ciclos regulares e muitos folículos **sem** hiperandrogenismo não fecham SOP; a banca aceitou o diagnóstico. {q-famerp2022-040}` },
      ],
    },
  ],
});
