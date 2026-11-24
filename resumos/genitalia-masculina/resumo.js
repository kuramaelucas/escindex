/* resumos/genitalia-masculina/resumo.js — resumo adaptativo de genitália masculina e disfunção
   sexual (ass-uro-escroto): escroto agudo (torção testicular, epididimite, torção de apêndice),
   criptorquidia, hidrocele, hérnia e cisto de cordão, fimose e parafimose, disfunção erétil e
   inibidor da fosfodiesterase, fases da resposta sexual, hipogonadismo primário e trauma de uretra;
   armadilhas e tabela do escroto agudo.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- genitalia-masculina */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "genitalia-masculina",
  titulo: "Genitália masculina e disfunção sexual",
  assunto: "ass-uro-escroto",
  criadoEm: "2026-11-24",
  fontes: [
    { id: "eau", texto: "EAU Guidelines — Paediatric Urology, Sexual and Reproductive Health, Urological Trauma (2026)", lidoEm: null },
    { id: "aua-criptorquidia", texto: "AUA — Evaluation and Treatment of Cryptorchidism (2014/2018)", lidoEm: null },
    { id: "pcdt-ist", texto: "Ministério da Saúde — PCDT de Infecções Sexualmente Transmissíveis (2022): orquiepididimite", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição.", questoes: ["q-usprp2025-085"] },
  ],
  doencas: [
    {
      id: "escroto-agudo", titulo: "Escroto agudo",
      introducao: `[[Dor escrotal aguda é **torção testicular** até prova em contrário, porque o testículo torcido sobre o cordão perde o sangue em poucas horas. A torção acontece em quem tem o testículo mal fixado (o defeito "em badalo de sino", que costuma ser **bilateral**), sobretudo na puberdade, quando o testículo cresce.|q-tp20222-073,q-fmabc2024-033,q-unesp2021-067]]

Veja também: **Hérnias**, **IST**, **Litíase urinária** e **Próstata**.`,
      fragmentos: [
        { id: "agu-torcao", titulo: "Torção testicular", conferir: true, diretrizes: ["eau"],
          figuras: [{ arquivo: "figuras/escroto-agudo.svg", legenda: "Esquema autoral: as três causas de escroto agudo, como se reconhecem e a conduta." }],
          questoes: ["q-tp20212-058","q-tp20222-073","q-unesp2021-067","q-sirio2027-036","q-sirio2022-056","q-fmabc2023-041","q-fmabc2024-033"],
          prosa: `[[Adolescente com **dor escrotal súbita e intensa**, muitas vezes com **náusea e vômito** e às vezes episódios prévios que passaram sozinhos (torção e distorção espontânea); o testículo fica **elevado e horizontal**, o **reflexo cremastérico some** e elevar o testículo **não alivia** a dor (Prehn negativo).|q-tp20212-058,q-tp20222-073,q-sirio2022-056,q-fmabc2023-041,q-unesp2021-067]] [[A conduta é **exploração cirúrgica de urgência**, sem esperar exame: distorcer, avaliar a viabilidade e fazer **orquidopexia bilateral**, porque o outro lado tem o mesmo defeito. Até cerca de 6 horas quase todos os testículos são salvos. O Doppler só se faz quando a dúvida é real e não atrasa a cirurgia.|q-sirio2027-036,q-fmabc2024-033,q-unesp2021-067]]`,
          texto: `- Dor súbita + vômito + testículo alto + **cremastérico ausente**: **torção**. {q-tp20212-058,q-tp20222-073,q-sirio2022-056,q-fmabc2023-041}
- **Explorar já** e **fixar os dois lados**; Doppler não é obrigatório. {q-sirio2027-036,q-fmabc2024-033,q-unesp2021-067}` },
        { id: "agu-epididimite", titulo: "Epididimite e orquiepididimite", conferir: true, diretrizes: ["pcdt-ist"],
          questoes: ["q-usprp2023-097","q-amrigs2020-036","q-usprp2025-094","q-usp2026-032"],
          prosa: `[[A epididimite começa **devagar**, com **disúria**, epidídimo endurecido e doloroso, e a dor **melhora ao elevar o testículo** (sinal de **Prehn** positivo). No homem jovem sexualmente ativo, os agentes são os da uretrite: **_Chlamydia trachomatis_** e gonococo.|q-usprp2023-097,q-amrigs2020-036,q-usprp2025-094]] [[O tratamento é **ceftriaxona em dose única e doxiciclina por 10 dias**, com anti-inflamatório e reavaliação. O Doppler mostra o testículo **aumentado com mais fluxo** (inflamação), o contrário da torção.|q-usp2026-032,q-usprp2023-097]]`,
          texto: `- Dor gradual + disúria + **Prehn positivo**: epididimite (**clamídia**). {q-usprp2023-097,q-amrigs2020-036,q-usprp2025-094}
- **Ceftriaxona + doxiciclina 10 dias**; Doppler com fluxo aumentado. {q-usp2026-032,q-usprp2023-097}` },
        { id: "agu-apendice", titulo: "Torção do apêndice testicular", conferir: true,
          questoes: ["q-einstein2027-037"],
          prosa: `[[Na **criança** antes da puberdade, dor moderada localizada no **polo superior**, testículo em posição normal e **reflexo cremastérico presente** é torção do **apêndice testicular** (às vezes com um ponto azulado). É autolimitada: analgesia e repouso.|q-einstein2027-037]]`,
          texto: `- Criança, testículo no lugar, cremastérico presente: **torção do apêndice**. {q-einstein2027-037}` },
      ],
    },
    {
      id: "pediatria", titulo: "Criança: testículo fora da bolsa, hidrocele e prepúcio",
      introducao: `[[O testículo desce do abdome para o escroto no fim da gestação, puxando consigo um prolongamento do peritônio (o conduto peritoniovaginal), que deveria fechar. Testículo que não termina a descida é **criptorquidia**; conduto que não fecha dá **hidrocele comunicante** ou **hérnia**.|q-usp2025-061,q-fmabc2021-086,q-unicampdis2024-074]]`,
      fragmentos: [
        { id: "ped-criptorquidia", titulo: "Criptorquidia", conferir: true, diretrizes: ["aua-criptorquidia"],
          questoes: ["q-usp2025-061","q-usprp2023-089","q-tp20202-072","q-tp20212-062","q-unicamp2023-023"],
          prosa: `[[O testículo ainda pode descer sozinho nos **primeiros 6 meses**: aos 2 ou 3 meses, **observa-se** e reavalia-se. Antes de tudo, descarta-se o **testículo retrátil** (que vai à bolsa com manobra e fica), que não precisa de nada.|q-usp2025-061,q-usprp2023-089,q-unicamp2023-023]] [[Depois dos 6 meses, a **orquidopexia** deve ser feita **o quanto antes** (idealmente até 18 meses), pela fertilidade e pelo risco de câncer. Ultrassom e hormônio não mudam a conduta.|q-tp20202-072,q-tp20212-062]]`,
          texto: `- Até 6 meses: **observar**; descartar **testículo retrátil**. {q-usp2025-061,q-usprp2023-089,q-unicamp2023-023}
- Depois: **orquidopexia o quanto antes**, sem US nem hormônio. {q-tp20202-072,q-tp20212-062}` },
        { id: "ped-hidrocele", titulo: "Hidrocele, hérnia e cisto de cordão", conferir: true,
          questoes: ["q-usprp2022-022","q-fmabc2021-086","q-unicampdis2024-074","q-unicamp2023-023"],
          prosa: `[[**Hidrocele comunicante**: o escroto enche ao longo do dia (vespertino) e esvazia em repouso, com **transiluminação positiva**; a não comunicante do recém-nascido costuma sumir sozinha no primeiro ano.|q-unicampdis2024-074,q-unicamp2023-023]] [[Abaulamento que aumenta ao chorar e entra no abdome, sobretudo no prematuro, é **hérnia inguinal**: **cirurgia** sem esperar, pelo risco de encarceramento.|q-fmabc2021-086]] [[Nódulo **tenso, indolor e irredutível** no canal inguinal, separado do testículo, é **cisto de cordão** (líquido preso num trecho do conduto).|q-usprp2022-022]]`,
          texto: `- Enche à tarde, transilumina: **hidrocele comunicante**. {q-unicampdis2024-074,q-unicamp2023-023}
- Aumenta ao chorar: **hérnia → operar**. {q-fmabc2021-086}
- Nódulo tenso irredutível no canal: **cisto de cordão**. {q-usprp2022-022}` },
        { id: "ped-prepucio", titulo: "Fimose e parafimose", conferir: true,
          casos: ["q-unesp2023-078"],
          questoes: ["q-unesp2023-078","q-unicamp2023-023"],
          prosa: `[[No lactente, o prepúcio que não retrai é **fisiológico**: conduta expectante.|q-unicamp2023-023]] [[Prepúcio **retraído à força** que fica preso atrás da glande e a estrangula, com edema e dor, é **parafimose**: urgência, com redução manual (ou incisão do anel).|q-unesp2023-078]]`,
          texto: `- Fimose do lactente: **expectante**. {q-unicamp2023-023}
- Prepúcio retraído preso com edema: **parafimose**. {q-unesp2023-078}` },
      ],
    },
    {
      id: "sexual", titulo: "Disfunção sexual e hipogonadismo",
      introducao: `[[A ereção é um fenômeno **vascular**: o óxido nítrico liberado pelo estímulo sexual aumenta o GMP cíclico, relaxa o músculo liso dos corpos cavernosos e o sangue enche o pênis. Por isso diabetes, tabagismo e hipertensão, que lesam o endotélio, são as principais causas de **disfunção erétil**, e ela costuma anunciar doença coronariana.|q-adap24-062,q-unifesp2024-016,q-usprp2023-047]]`,
      fragmentos: [
        { id: "sex-eretil", titulo: "Disfunção erétil e inibidor da fosfodiesterase", conferir: true, diretrizes: ["eau"],
          questoes: ["q-adap24-062","q-unifesp2024-016","q-usprp2023-047","q-tp20251-069"],
          prosa: `[[O tratamento de primeira linha é o **inibidor da fosfodiesterase tipo 5** (sildenafila, tadalafila), que impede a degradação do GMP cíclico. Alfabloqueador e inibidor da 5-alfarredutase tratam a próstata, não a ereção; testosterona só se estiver baixa.|q-adap24-062,q-unifesp2024-016,q-usprp2023-047]] [[A única contraindicação absoluta é o uso de **nitrato** (hipotensão grave). Em quem tem doença coronariana estável, avalia-se o risco cardiovascular antes; sem nitrato, o remédio pode ser usado.|q-adap24-062,q-tp20251-069]]`,
          texto: `- Disfunção erétil: **inibidor da fosfodiesterase 5**. {q-adap24-062,q-unifesp2024-016,q-usprp2023-047}
- Contraindicação: **nitrato**; coronariopata estável sem nitrato pode usar. {q-adap24-062,q-tp20251-069}` },
        { id: "sex-fases", titulo: "Fases da resposta sexual", conferir: true,
          questoes: ["q-usp2024-095"],
          prosa: `[[A resposta sexual tem fases: **desejo**, excitação, orgasmo e resolução. Perda de interesse com tristeza e cansaço aponta para a **fase do desejo**, com **depressão** como causa provável. Ausência de desejo sexual sem sofrimento, por toda a vida, pode ser **assexualidade**, uma orientação, não um transtorno.|q-usp2024-095]]`,
          texto: `- Sem vontade, triste: **fase do desejo, depressão**; assexualidade não é disfunção. {q-usp2024-095}` },
        { id: "sex-hipogonadismo", titulo: "Hipogonadismo primário", conferir: true,
          questoes: ["q-tp20222-020"],
          prosa: `[[Testosterona **baixa com LH e FSH altos** indica que a hipófise está mandando o sinal e o **testículo não responde**: **hipogonadismo primário** (falência testicular). Testosterona baixa com LH baixo seria problema da hipófise.|q-tp20222-020]]`,
          texto: `- Testosterona baixa + **LH alto**: **falência testicular primária**. {q-tp20222-020}` },
      ],
    },
    {
      id: "trauma", titulo: "Trauma da uretra",
      introducao: `[[Na fratura de bacia ou na queda a cavaleiro, a uretra pode romper. Passar uma sonda às cegas transforma uma lesão parcial em completa, por isso o **sangue no meato** muda a sequência do atendimento.|q-unesp2026-065]]`,
      fragmentos: [
        { id: "tra-uretra", titulo: "Sangue no meato: uretrografia antes da sonda", conferir: true, diretrizes: ["eau"],
          questoes: ["q-unesp2026-065"],
          prosa: `[[**Sangue no meato**, retenção urinária e **hematoma perineal em borboleta** indicam lesão de uretra: **uretrocistografia retrógrada antes de qualquer sondagem**; confirmada a lesão, a bexiga se drena por cistostomia.|q-unesp2026-065]]`,
          texto: `- Sangue no meato: **uretrografia antes de sondar**. {q-unesp2026-065}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["eau"],
          questoes: ["q-tp20251-069","q-unesp2021-067","q-usp2026-032","q-fmabc2024-033"],
          prosa: `[[**Inibidor da fosfodiesterase no coronariopata**: sem nitrato, usa-se na dose habitual após avaliar o risco; a tp20251-069, com stents recentes, cobrou **metade da dose** como segura.|q-tp20251-069]] [[**Doppler na suspeita de torção**: não é obrigatório e não pode atrasar a cirurgia; a unesp2021-067 marcou exatamente isso.|q-unesp2021-067]] [[**Testículo heterogêneo e hipoecoico**: pode ser tumor; com fluxo aumentado, disúria e exposição sexual, a usp2026-032 tratou como **orquiepididimite**, reavaliando depois.|q-usp2026-032]] [[**Recuperação depois de 24 h**: a chance de salvar o testículo cai muito depois de 6 horas; a fmabc2024-033 cobrou a **fixação do outro testículo** como regra.|q-fmabc2024-033]]`,
          texto: `- Stent sem nitrato: a prova cobrou **meia dose**. {q-tp20251-069}
- Torção: Doppler **não obrigatório**. {q-unesp2021-067}
- Hipoecoico com fluxo e disúria: **tratar infecção** e reavaliar. {q-usp2026-032}
- **Fixar os dois lados**. {q-fmabc2024-033}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: escroto agudo",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-escroto", titulo: "Início, exame e conduta", conferir: true,
          questoes: ["q-sirio2022-056","q-usprp2023-097","q-einstein2027-037","q-tp20222-073"],
          prosa: `[[O início da dor e o reflexo cremastérico separam as três.|q-sirio2022-056,q-usprp2023-097,q-einstein2027-037,q-tp20222-073]]

| Causa | Idade | Início | Cremastérico | Prehn | Conduta |
|---|---|---|---|---|---|
| Torção testicular | puberdade | súbito, com vômito | ausente | negativo | explorar já, fixar os dois |
| Epididimite | adulto jovem | gradual, com disúria | presente | positivo | ceftriaxona + doxiciclina |
| Torção do apêndice | criança | súbito, dor moderada | presente | — | analgesia |`,
          texto: `- Torção: **cremastérico ausente**. {q-sirio2022-056,q-tp20222-073}
- Epididimite: **Prehn positivo**. {q-usprp2023-097}
- Apêndice: **criança, testículo no lugar**. {q-einstein2027-037}` },
      ],
    },
  ],
});
