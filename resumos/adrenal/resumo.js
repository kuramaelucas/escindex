/* resumos/adrenal/resumo.js — resumo adaptativo de doenças da adrenal (ass-adrenal): eixo e camadas,
   insuficiência adrenal (primária, secundária/terciária, crise, dose de estresse), hiperplasia adrenal
   congênita, síndrome de Cushing, hiperaldosteronismo primário, feocromocitoma, incidentaloma e
   carcinoma; armadilhas e tabela.  Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- adrenal */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "adrenal",
  titulo: "Doenças da adrenal",
  assunto: "ass-adrenal",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "es-insuficiencia", texto: "Endocrine Society — Diagnosis and Treatment of Primary Adrenal Insufficiency (2016) e Glucocorticoid-Induced Adrenal Insufficiency (ESE/ES 2024)", lidoEm: null },
    { id: "es-cushing", texto: "Endocrine Society — The Diagnosis of Cushing's Syndrome (2008) e Consensus on diagnosis and management of Cushing's disease (Lancet Diabetes Endocrinol 2021)", lidoEm: null },
    { id: "es-aldosteronismo", texto: "Endocrine Society — Management of Primary Aldosteronism (2016; atualização 2025)", lidoEm: null },
    { id: "es-feo", texto: "Endocrine Society — Pheochromocytoma and Paraganglioma (2014)", lidoEm: null },
    { id: "ese-incidentaloma", texto: "ESE/ENSAT — Management of adrenal incidentalomas (Eur J Endocrinol 2023)", lidoEm: null },
    { id: "es-hac", texto: "Endocrine Society — Congenital Adrenal Hyperplasia Due to Steroid 21-Hydroxylase Deficiency (2018)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "insuficiencia", titulo: "Insuficiência adrenal",
      introducao: `[[A adrenal tem três camadas que respondem a comandos diferentes: a **glomerulosa** faz aldosterona sob a renina e o potássio; a **fasciculada** faz cortisol sob o ACTH; a **reticular**, andrógenos. Na insuficiência **primária** (Addison, em geral autoimune) as três se perdem: falta cortisol (hipotensão, hipoglicemia, náuseas, dor abdominal) e falta aldosterona (**hiponatremia, hipercalemia, acidose**); o ACTH sobe e escurece pele e mucosas. Na **secundária** (hipófise) e **terciária** (hipotálamo, ou supressão por corticoide exógeno) falta só o ACTH: a aldosterona é preservada, o potássio é normal e não há hiperpigmentação.|q-scmsp2025-003,q-udisc20262-023,q-usprp2022-063,q-iamspe2021-001,q-sessp2026-022,q-sirio2022-051]]

Veja também: **Hipertensão secundária**, **Hiponatremia e hipercalemia**, **Hipófise**, **Sepse** e **Ambiguidade genital** quando houver resumo.`,
      fragmentos: [
        { id: "ins-diagnostico", titulo: "Primária × secundária e quem a provoca", conferir: true, diretrizes: ["es-insuficiencia"],
          figuras: [{ arquivo: "figuras/eixo-adrenal.svg", legenda: "Esquema autoral: as camadas da adrenal, seus comandos e o que falta ou sobra em cada doença." }],
          casos: ["q-usprp2026-055"],
          questoes: ["q-scmsp2025-003","q-udisc20262-023","q-usprp2022-063","q-iamspe2021-001","q-sessp2026-022","q-sirio2022-051","q-fmabc2021-023","q-usprp2026-055","q-sessp2022-019","q-amrigs2021-004","q-fmabc2025-008"],
          prosa: `[[Fraqueza, emagrecimento, hipotensão postural, **hiperpigmentação**, sódio baixo e potássio alto: **Addison**, cuja causa mais comum hoje é a autoimune. Trata-se com **glicocorticoide e fludrocortisona** (repondo a aldosterona).|q-scmsp2025-003,q-udisc20262-023,q-usprp2022-063,q-iamspe2021-001]] [[A causa mais comum de insuficiência adrenal é a **suspensão de corticoide** usado por semanas: o eixo fica suprimido e não responde ao estresse — hipotensão e hipoglicemia com **potássio normal**. Vale para prednisona oral, dexametasona prolongada no lactente e até corticoide inalatório em dose alta.|q-sessp2026-022,q-sirio2022-051,q-fmabc2021-023,q-usprp2026-055]] [[No pan-hipopituitarismo, **repor o cortisol antes da tiroxina**: o hormônio tireoidiano acelera o metabolismo do cortisol e pode precipitar crise.|q-sessp2022-019]] [[Corticoide é seguro, mas pode causar sintomas psicóticos.|q-amrigs2021-004,q-fmabc2025-008]]`,
          texto: `- Primária: **Na baixo, K alto, pele escura** → glicocorticoide + fludrocortisona. {q-scmsp2025-003,q-udisc20262-023,q-usprp2022-063,q-iamspe2021-001}
- Suspensão de corticoide: **K normal**. {q-sessp2026-022,q-sirio2022-051,q-fmabc2021-023,q-usprp2026-055}
- Hipopituitarismo: **cortisol antes da tiroxina**. {q-sessp2022-019}
- Corticoide pode causar psicose. {q-amrigs2021-004,q-fmabc2025-008}` },
        { id: "ins-crise", titulo: "Crise adrenal e dose de estresse", conferir: true, diretrizes: ["es-insuficiencia"],
          questoes: ["q-adap21-107","q-einstein2027-010","q-usp2026-024","q-amrigs2025-072"],
          prosa: `[[Choque com hiponatremia, hipercalemia e hipoglicemia num paciente de risco: **hidrocortisona 100 mg IV imediatamente**, soro fisiológico e glicose, **sem esperar exames** e antes do vasopressor — sem cortisol, os vasos não respondem à noradrenalina.|q-adap21-107,q-einstein2027-010]] [[Doença leve (gripe com febre) em quem já usa reposição: **dobrar ou triplicar a hidrocortisona** em casa; vômitos ou instabilidade pedem a dose venosa.|q-usp2026-024]] [[No lactente, a parada cardíaca da crise vem da **hipercalemia** (fibrilação ventricular).|q-amrigs2025-072]]`,
          texto: `- Crise: **hidrocortisona IV já**, antes do vasopressor. {q-adap21-107,q-einstein2027-010}
- Doença leve: **aumentar a dose** em casa. {q-usp2026-024}
- Parada: **hipercalemia**. {q-amrigs2025-072}` },
        { id: "ins-hac", titulo: "Hiperplasia adrenal congênita", conferir: true, diretrizes: ["es-hac"],
          questoes: ["q-famema2025-040","q-sessp2022-042","q-amrigs2024-062","q-sirio2021-078","q-usp2025-006"],
          prosa: `[[Na deficiência de **21-hidroxilase** a adrenal não faz cortisol nem aldosterona; o ACTH sobe, os precursores (**17-hidroxiprogesterona**) acumulam e são desviados para **andrógenos**. A menina nasce virilizada (é a causa mais comum de genitália atípica, ADS 46,XX); o menino, sem sinal, aparece na 2.ª semana com **crise perdedora de sal**: vômitos, desidratação, hiponatremia, hipercalemia, acidose. Trata-se com volume e **hidrocortisona** (mais sal e fludrocortisona).|q-famema2025-040,q-sessp2022-042,q-amrigs2024-062]] [[A forma não clássica aparece na mulher adulta como hirsutismo, acne e oligomenorreia, com 17-OH-progesterona alta: trata-se com **glicocorticoide** (prednisolona) para frear o ACTH.|q-sirio2021-078,q-usp2025-006]]`,
          texto: `- 21-hidroxilase: **17-OHP alta**, virilização, **perda de sal** no menino. {q-famema2025-040,q-sessp2022-042,q-amrigs2024-062}
- Não clássica: hirsutismo → **glicocorticoide**. {q-sirio2021-078,q-usp2025-006}` },
      ],
    },
    {
      id: "excesso", titulo: "Excesso hormonal",
      introducao: `[[Cada camada pode produzir demais: a fasciculada dá **Cushing**, a glomerulosa dá **hiperaldosteronismo**, a medula dá **feocromocitoma**. Os três são causas tratáveis de hipertensão, e o caminho é sempre o mesmo: primeiro provar o excesso hormonal, depois achar a lesão na imagem.|q-usprp2021-107,q-uspsp2-012,q-uspsp2-014]]`,
      fragmentos: [
        { id: "exc-cushing", titulo: "Síndrome de Cushing", conferir: true, diretrizes: ["es-cushing"],
          casos: ["q-tp20202-029"],
          questoes: ["q-usprp2021-107","q-tp20212-034","q-tp20231-024","q-einstein2024-005","q-tp20202-029","q-scmsp2026-019","q-tp20212-056","q-fmabc2024-013"],
          prosa: `[[Os sinais que distinguem Cushing de obesidade comum são os de **catabolismo**: estrias violáceas largas (> 1 cm), equimoses, pele fina, fraqueza proximal, membros finos com gordura central, giba e pletora, com hipertensão e diabetes.|q-usprp2021-107,q-tp20212-034,q-tp20231-024]] [[Rastreio: **cortisol após 1 mg de dexametasona** (normal < 1,8 µg/dL), **cortisol salivar à noite** ou **cortisol urinário de 24 h**. ACTH pela manhã não rastreia.|q-usprp2021-107,q-tp20212-034,q-tp20231-024,q-einstein2024-005]] [[Confirmado o hipercortisolismo, o **ACTH** separa: baixo = adrenal; alto = hipófise (doença de Cushing) ou ectópico.|q-tp20202-029]] [[Cortisol em excesso ocupa o receptor mineralocorticoide: **hipocalemia e alcalose metabólica**, com aldosterona e renina baixas.|q-scmsp2026-019,q-fmabc2024-013]] [[Na criança, Cushing com virilização e crescimento acelerado aponta para **tumor de adrenal**.|q-tp20212-056]]`,
          texto: `- Estrias violáceas, equimose, fraqueza: **Cushing**. {q-usprp2021-107,q-tp20212-034,q-tp20231-024}
- Rastreio: **dexametasona 1 mg**, salivar, urinário. {q-usprp2021-107,q-tp20212-034,q-tp20231-024,q-einstein2024-005}
- Depois: **ACTH**. {q-tp20202-029}
- **Hipocalemia e alcalose**. {q-scmsp2026-019,q-fmabc2024-013}` },
        { id: "exc-aldosterona", titulo: "Hiperaldosteronismo primário", conferir: true, diretrizes: ["es-aldosteronismo"],
          casos: ["q-tp20251-013","q-usprp2027-025"],
          questoes: ["q-tp20251-013","q-uspsp2-012","q-sessp2026-011","q-uspsp3-087","q-usprp2027-025"],
          prosa: `[[A aldosterona autônoma retém sódio e troca potássio e hidrogênio no túbulo: **hipertensão resistente, hipocalemia, alcalose metabólica** e **renina suprimida** pelo volume expandido. É a causa endócrina mais comum de hipertensão secundária, e muitos têm potássio normal.|q-tp20251-013,q-uspsp3-087,q-usprp2027-025]] [[Rastreio: **relação aldosterona/renina**. Confirmação: **teste de supressão** (sobrecarga salina, fludrocortisona, captopril) — se a aldosterona não cai, é autônoma. Depois, tomografia e cateterismo das veias adrenais para separar adenoma (cirurgia) de hiperplasia bilateral (espironolactona).|q-tp20251-013,q-uspsp2-012,q-sessp2026-011]]`,
          texto: `- Hipertensão resistente, **K baixo, renina baixa**. {q-tp20251-013,q-uspsp3-087,q-usprp2027-025}
- **Aldosterona/renina** → **supressão salina**. {q-uspsp2-012,q-sessp2026-011}` },
        { id: "exc-feo", titulo: "Feocromocitoma", conferir: true, diretrizes: ["es-feo"],
          questoes: ["q-tp20202-054","q-unicamp2022-003","q-uspsp2-014","q-amrigs2025-010","q-sessp2026-011"],
          prosa: `[[Catecolaminas em pulsos: **crises de cefaleia, sudorese e palpitação** com hipertensão grave ou lábil, flushing e tremor.|q-tp20202-054,q-unicamp2022-003]] [[Rastreio: **metanefrinas plasmáticas ou urinárias fracionadas**; valores acima de 3–4 vezes o limite são quase diagnósticos, e elevação leve que cai com clonidina afasta o tumor. Depois, **tomografia de abdome**. O tumor ocorre igualmente em homens e mulheres, da 3.ª à 5.ª década, e o seguimento com metanefrinas é anual por toda a vida.|q-uspsp2-014,q-amrigs2025-010,q-sessp2026-011]]`,
          texto: `- Crises de **cefaleia, sudorese, palpitação**. {q-tp20202-054,q-unicamp2022-003}
- **Metanefrinas** → **TC de abdome**; seguimento anual. {q-uspsp2-014,q-amrigs2025-010}` },
        { id: "exc-incidentaloma", titulo: "Incidentaloma e carcinoma", conferir: true, diretrizes: ["ese-incidentaloma"],
          questoes: ["q-iamspe2023-031","q-famema2023-075","q-famerp2023-059","q-famerp2025-074","q-simepm89-015"],
          prosa: `[[Massa adrenal achada por acaso é, na maioria, **adenoma não funcionante**. Investiga-se função (dexametasona 1 mg, metanefrinas, aldosterona/renina se hipertenso) e aspecto: **< 10 UH sem contraste** é adenoma rico em gordura, benigno.|q-iamspe2023-031,q-famema2023-075,q-famerp2023-059]] [[Densidade > 10 UH com washout baixo é **indeterminada**; tamanho grande e crescimento apontam cirurgia.|q-famerp2025-074]] [[Virilização rápida com **testosterona e DHEA-S** muito altos: **carcinoma adrenocortical**.|q-simepm89-015]]`,
          texto: `- Incidentaloma: **adenoma**; < 10 UH benigno. {q-iamspe2023-031,q-famema2023-075,q-famerp2023-059}
- Indeterminado: a prova operou. {q-famerp2025-074}
- DHEA-S alto e virilização: **carcinoma**. {q-simepm89-015}` },
      ],
    },
    {
      id: "neuroendocrinos", titulo: "Tumores neuroendócrinos do pâncreas e do intestino",
      introducao: `[[As células neuroendócrinas espalhadas pelo pâncreas e pelo tubo digestivo produzem hormônios e aminas; o tumor delas se reconhece **pelo hormônio que sobra**, não pela massa. O **insulinoma** é o mais comum e o de **menor malignidade** (cerca de 90% benigno); gastrinoma e VIPoma são mais frequentemente malignos. O tumor **carcinoide** é mais comum no **intestino delgado (íleo)**.|q-udisc20262-067,q-udisc20262-073]] [[Na **NEM 1** (paratireoide, hipófise e pâncreas), o tumor pancreático funcionante mais comum é o **gastrinoma**; feocromocitoma e carcinoma medular são da NEM 2 (ver o capítulo do feocromocitoma).|q-famema2022-078]]`,
      fragmentos: [
        { id: "net-insulinoma", titulo: "Hipoglicemia: insulinoma ou insulina de fora", conferir: true,
          questoes: ["q-famema2022-061","q-tp20202-037"],
          prosa: `[[A **tríade de Whipple** (sintomas de hipoglicemia, glicemia baixa documentada e melhora com glicose) abre a investigação; o padrão-ouro é o **jejum supervisionado de 72 horas**, dosando glicose, insulina, **peptídeo C** e pró-insulina no momento da hipoglicemia.|q-famema2022-061]] [[O peptídeo C sai do pâncreas junto com a insulina: **insulina alta com peptídeo C alto** = produção própria (insulinoma ou sulfonilureia); **insulina alta com peptídeo C suprimido** = **insulina aplicada** (hipoglicemia factícia).|q-tp20202-037]]`,
          texto: `- Whipple: **jejum de 72 h** é o padrão-ouro. {q-famema2022-061}
- Insulina alta + **peptídeo C baixo**: insulina exógena. {q-tp20202-037}` },
        { id: "net-diarreia", titulo: "Diarreia secretora: VIPoma e síndrome carcinoide", conferir: true,
          questoes: ["q-famema2022-062","q-famerp2026-072","q-fmabc2024-007","q-famema2023-076","q-famema2022-076"],
          prosa: `[[O **VIPoma (síndrome de Verner-Morrison)** dá **diarreia aquosa volumosa que persiste em jejum**, **hipocalemia** e acloridria (WDHA), às vezes rubor. Conduta: **corrigir água e potássio**, controlar a diarreia com **análogo da somatostatina** (octreotida, muito eficaz) e **ressecar o tumor**.|q-famema2022-062,q-famerp2026-072,q-fmabc2024-007]] [[A **síndrome carcinoide** (serotonina e outras aminas) aparece quando há **metástase hepática** (o fígado deixa de inativar as aminas): **rubor, diarreia, broncoespasmo** e lesão de valva direita; hiperqueratose não faz parte. O **carcinoide de apêndice de até 1–2 cm**, distal e ressecado, é curado pela **apendicectomia**: observação.|q-famema2023-076,q-famema2022-076]]`,
          texto: `- Diarreia aquosa em jejum + **hipocalemia**: **VIPoma**; somatostatina e cirurgia. {q-famema2022-062,q-famerp2026-072,q-fmabc2024-007}
- Carcinoide: rubor, diarreia, broncoespasmo (não hiperqueratose). {q-famema2023-076}
- Carcinoide de apêndice de 1 cm, distal: **observação**. {q-famema2022-076}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["ese-incidentaloma","es-insuficiencia"],
          questoes: ["q-famerp2025-074","q-sirio2022-051","q-sessp2022-042","q-fmabc2024-013"],
          prosa: `[[**Nódulo indeterminado de 3 cm**: a diretriz europeia de 2023 admite repetir imagem em 6–12 meses ou operar, decidido em equipe; a famerp2025-074 respondeu **adrenalectomia**.|q-famerp2025-074]] [[**Corticoide exógeno**: a supressão é do hipotálamo e da hipófise; a sirio2022-051 chamou de **terciária**, outras provas chamam de secundária — ambas significam ACTH baixo com mineralocorticoide preservado.|q-sirio2022-051]] [[**Crise perdedora de sal no RN**: hidratação, hidrocortisona, ECG pela hipercalemia; a sessp2022-042 marcou como **incorreto considerar antibiótico**, embora o RN letárgico costume receber cobertura até excluir sepse.|q-sessp2022-042]] [[**Aldosterona e renina ambas baixas** com hipertensão: excesso de outro mineralocorticoide; a fmabc2024-013 respondeu **síndrome de Cushing**.|q-fmabc2024-013]]`,
          texto: `- Indeterminado 3 cm: a prova operou. {q-famerp2025-074}
- Corticoide exógeno = **terciária** na prova. {q-sirio2022-051}
- RN: antibiótico marcado **incorreto**. {q-sessp2022-042}
- Aldo e renina baixas: **Cushing**. {q-fmabc2024-013}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: as doenças da adrenal",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-adrenal", titulo: "Eletrólitos, rastreio e tratamento", conferir: true,
          questoes: ["q-scmsp2025-003","q-sessp2026-022","q-usprp2021-107","q-tp20251-013","q-uspsp2-014"],
          prosa: `[[O potássio e o rastreio separam as doenças.|q-scmsp2025-003,q-sessp2026-022,q-usprp2021-107,q-tp20251-013,q-uspsp2-014]]

| | Addison | Secundária / corticoide | Cushing | Hiperaldosteronismo | Feocromocitoma |
|---|---|---|---|---|---|
| Potássio | alto | normal | baixo | baixo | normal |
| Pele / sinal | escura | normal | estrias violáceas | — | crises adrenérgicas |
| Rastreio | cortisol matinal, ACTH alto | cortisol baixo, ACTH baixo | dexametasona 1 mg | aldosterona/renina | metanefrinas |
| Tratamento | hidrocortisona + fludrocortisona | hidrocortisona | cirurgia da causa | cirurgia ou espironolactona | alfabloqueio e cirurgia |`,
          texto: `- K alto e pele escura: **Addison**. {q-scmsp2025-003}
- K normal após corticoide: **supressão**. {q-sessp2026-022}
- Dexametasona 1 mg: **Cushing**. {q-usprp2021-107}
- Aldo/renina: **hiperaldosteronismo**. {q-tp20251-013}
- Metanefrinas: **feo**. {q-uspsp2-014}` },
      ],
    },
  ],
});
