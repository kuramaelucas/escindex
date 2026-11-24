/* resumos/imunizacao/resumo.js — resumo adaptativo de imunização do adulto, da gestante e de grupos especiais:
   imunidade coletiva, contraindicações e eventos adversos, vacinas na gestação, no idoso e na asplenia, e
   profilaxia pós-exposição (raiva, tétano, hepatites). O calendário da criança é de `calendario-vacinal` (dono).
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- imunizacao */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "imunizacao",
  titulo: "Imunização: adultos, gestantes, grupos especiais e pós-exposição",
  assunto: "ass-imunizacao",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "calendario-vacinal", texto: "Ministério da Saúde — Calendário Nacional de Vacinação (adulto, idoso, gestante; edição vigente na tabela de edições)", lidoEm: null },
    { id: "manual-vacinacao", texto: "Ministério da Saúde — Manual de Normas e Procedimentos para Vacinação e Manual de Vigilância Epidemiológica de Eventos Adversos Pós-Vacinação", lidoEm: null },
    { id: "crie", texto: "Ministério da Saúde — Manual dos Centros de Referência para Imunobiológicos Especiais (CRIE): imunossuprimidos, asplenia, HIV, transplantados", lidoEm: null },
    { id: "raiva-2022", texto: "Ministério da Saúde — Protocolo de profilaxia da raiva humana (esquema de quatro doses, 0, 3, 7 e 14, desde 2022) e esquema de profilaxia do tétano", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada, sem reposição.", questoes: ["q-sirio2025-043"] },
  ],
  doencas: [
    {
      id: "principios", titulo: "Imunidade, imunidade coletiva e vacinação",
      introducao: `[[A vacina funciona porque o sistema imune guarda memória: o antígeno (vivo atenuado, inativado, toxoide, subunidade, RNA mensageiro) é apresentado às células imunes, e a resposta de linfócitos T e B se mantém para o contato real. A **imunização ativa** vem da vacina (ou do toxoide); a **passiva** vem de anticorpos prontos (imunoglobulinas) ou da passagem transplacentária.|q-amrigs2022-002,q-tp20222-013]]

[[A **imunidade coletiva** protege quem não se vacinou, porque o agente deixa de encontrar suscetíveis para manter a cadeia; por isso a queda das coberturas ameaça a população inteira.|q-adap26-082,q-unifesp2026-082,q-tp20222-107]]

Veja também: **Calendário vacinal** (a criança, dono dessa matéria), **Vigilância em saúde** (surtos, bloqueio e notificação), **Medidas epidemiológicas** (eficácia e efetividade) e **Infecções sexualmente transmissíveis** (HPV e hepatite B).`,
      fragmentos: [
        { id: "imu-principios", titulo: "Mecanismos, limiar de imunidade coletiva e cobertura", conferir: true,
          figuras: [{ arquivo: "figuras/imunidade-coletiva.svg", legenda: "Esquema autoral: limiar de imunidade coletiva = 1 − 1/R0, corrigido pela eficácia da vacina." }],
          questoes: ["q-amrigs2022-002","q-scmsp2021-088","q-tp20222-013","q-adap26-082","q-unifesp2026-082","q-tp20222-107","q-usprp2025-038","q-usprp2022-020","q-unesp2021-099","q-tp20261-023"],
          prosa: `[[A vacina de **mRNA** contra a covid-19 faz as células apresentadoras capturarem a proteína **spike** produzida e apresentarem fragmentos aos **linfócitos T CD4+** pelas moléculas de **MHC de classe II** (e aos CD8+ pelas de classe I), com produção de anticorpos.|q-tp20222-013]] A **imunização ativa** vem do toxoide (tétano, difteria) ou da vacina; as **globulinas imunes** são feitas a partir de plasma de doadores imunes e dão proteção **passiva** imediata e curta.

O desenvolvimento de vacinas segue **fases clínicas**: a fase II define imunogenicidade e dose; [[o **NNT** costuma ser obtido a partir da fase IIb/III, enquanto o número necessário para causar dano vem de fases posteriores, com a vigilância pós-comercialização.|q-scmsp2021-088]]

[[O **limiar de imunidade coletiva** é **1 − 1/R0** da população imune: R0 = 4 exige 75%; R0 = 3, cerca de 67%; se a vacina tem **eficácia de 90%**, a cobertura precisa ser maior: 67% ÷ 0,90 ≈ **74%**.|q-unifesp2026-082,q-adap26-082]] Por isso a família vacinada confere ao lavrador que recusou a vacina proteção **parcial** apenas para o que tem efeito coletivo (hepatite B por contatos domiciliares é parcial) e **nenhuma** para a febre amarela, que é transmitida por vetor e não de pessoa a pessoa.

[[A queda das **coberturas vacinais** na última década associa-se à **baixa percepção do risco** de doenças que já não são frequentes: a própria vitória da vacina reduz a motivação. No Programa Expandido de Imunizações (OMS, 1974), a vacinação da poliomielite, em comparação com as demais, impactou pouco a sobrevida, mas evitou sequelas.|q-tp20222-107,q-usprp2025-038]] [[O **sorogrupo C** do meningococo suplantou o B e se tornou o predominante no Brasil nas últimas duas décadas, o que guiou a política de vacinação (meningo C conjugada).|q-unesp2021-099]] Na influenza, a cobertura caiu depois da pandemia em crianças, gestantes e puérperas.`,
          texto: `- **Imunização ativa**: vacina ou toxoide; **passiva**: globulina imune (plasma de doadores). {q-amrigs2022-002}
- **mRNA**: spike apresentada a **linfócitos T CD4+** por **MHC II**. {q-tp20222-013}
- **NNT** a partir da fase IIb/III; o número necessário para causar dano, de fases posteriores. {q-scmsp2021-088}
- **Limiar de imunidade coletiva** = 1 − 1/R0: R0 = 4 → **75%**. {q-unifesp2026-082}
- R0 = 3 com eficácia de 90%: cobertura de cerca de **74%** (67% ÷ 0,90). {q-adap26-082}
- Lavrador que recusa a vacina: a vacinação da família protege **parcialmente** contra hepatite B e **nada** contra febre amarela. {q-usprp2022-020}
- Queda das coberturas: **baixa percepção do risco** de doenças que já não são frequentes. {q-tp20222-107}
- Programa Expandido de Imunizações (OMS, 1974): a vacina da poliomielite impactou pouco a sobrevida, mas evitou sequelas. {q-usprp2025-038}
- Meningococo: o sorogrupo **C** suplantou o B no Brasil. {q-unesp2021-099}
- Cobertura de influenza: queda após a pandemia em crianças, gestantes e puérperas. {q-tp20261-023}` },
      ],
    },
    {
      id: "seguranca", titulo: "Contraindicações, eventos adversos e imunossupressão",
      introducao: `[[Poucas situações impedem uma vacina. A **verdadeira contraindicação** é a **reação anafilática** confirmada à dose anterior ou a um componente; o resfriado, o uso de antibiótico oral e a prematuridade **não** contraindicam e não devem adiar a vacinação.|q-adap21-023]] [[Nas **vacinas de agentes vivos** o risco vem do próprio agente atenuado: em quem tem **imunossupressão grave** (transplantados, CD4 baixo, quimioterapia) o vírus vacinal pode se replicar, por isso as vivas são em geral contraindicadas e as inativadas liberadas, ainda que com resposta menor.|q-inf-28,q-tp20212-105]]`,
      fragmentos: [
        { id: "seg-contraindicacoes", titulo: "Contraindicações, imunossupressão, coadministração e eventos adversos", conferir: true, diretrizes: ["manual-vacinacao","crie"],
          questoes: ["q-adap21-023","q-inf-28","q-tp20212-105","q-udisc20262-035","q-einstein2025-005","q-einstein2022-064","q-tp20232-119","q-einstein2022-070","q-famerp2022-053"],
          prosa: `A **febre amarela** (vacina viva) é contraindicada se o **CD4 está abaixo de 200 células/mm³**, e **não** pela idade acima de 50 anos, pela asma leve ou pelo HIV assintomático. [[O viajante com HIV, CD4 de 640 e carga viral indetectável **não** tem risco maior que a população geral e pode receber a vacina; a resposta à vacina é adequada.|q-tp20212-105,q-udisc20262-035]] [[No paciente com doença de Crohn em uso de adalimumabe (imunossupressor biológico), as vacinas **vivas** são em geral evitadas e as inativadas, recomendadas; a prova cobrou a **dengue tetravalente em duas doses** (ver armadilhas).|q-einstein2025-005]]

[[Os **eventos adversos pós-vacinação** têm manual de vigilância: o **abscesso quente** no local 55 horas depois da DTP é um evento adverso local que **se notifica** e, em novas doses, se mantém a vacina que o causou (DTP). A **reação de Arthus** (eritema, enduração, edema e dor intensos horas depois da dose, por imunocomplexos em quem já tem muito anticorpo) trata-se com compressa gelada e anti-histamínico.|q-einstein2022-064,q-tp20232-119]] [[A **coadministração** de vacinas diferentes no mesmo dia é aceitável e sem forte evidência de aumento de eventos adversos: influenza (no SUS, de vírus **inativado**) e segunda dose de AstraZeneca no mesmo dia, por dificuldade de locomoção do idoso, é aceitável.|q-einstein2022-070]] No idoso que teve pneumonia, o que se oferece é influenza e herpes zoster (vacina recombinante), além do pneumococo.`,
          texto: `- **Verdadeira contraindicação**: anafilaxia confirmada à dose anterior ou a um componente. {q-adap21-023}
- Resfriado, antibiótico oral e prematuridade **não** contraindicam. {q-adap21-023}
- **Imunossupressão grave**: vacinas **vivas** (febre amarela, tríplice viral, varicela) em geral contraindicadas; inativadas liberadas. {q-inf-28}
- Febre amarela: contraindicada se **CD4 < 200**; não é idade > 50 nem asma leve nem HIV assintomático. {q-tp20212-105}
- HIV com CD4 640 e carga indetectável viajando à África: **sem risco maior** com as vacinas. {q-udisc20262-035}
- Crohn em adalimumabe: evitar as vivas; a dengue tetravalente em duas doses foi a cobrada. {q-einstein2025-005}
- **Abscesso quente** 55 horas após DTP: manter DTP e **notificar**. {q-einstein2022-064}
- **Reação de Arthus** após a pneumocócica 13: compressa gelada e anti-histamínico. {q-tp20232-119}
- **Coadministração** de influenza e covid no mesmo dia: aceitável. {q-einstein2022-070}
- Idoso pós-pneumonia: **influenza** e **herpes zoster**. {q-famerp2022-053}` },
      ],
    },
    {
      id: "grupos", titulo: "Gestantes, idosos e grupos de risco",
      introducao: `[[Na **gestação**, o princípio é proteger a mãe e o recém-nascido por **anticorpos passivos** transplacentários, e **evitar as vacinas vivas** (risco teórico ao feto). Por isso se oferece a **dTpa** (a cada gestação, a partir da 20ª semana), a **influenza**, a **hepatite B** (se não imune), a **covid-19** e a **vacina contra o VSR** (a partir da 28ª semana); a tríplice viral e a febre amarela, em regra, esperam.|q-usprp2026-033,q-amrigs2024-087,q-famerp2026-015,q-sirio2027-048]]`,
      fragmentos: [
        { id: "grp-gestantes", titulo: "Vacinas na gestação e no puerpério", conferir: true, diretrizes: ["calendario-vacinal"],
          questoes: ["q-usprp2021-023","q-usprp2026-033","q-amrigs2024-087","q-amrigs2025-088","q-tp20231-111","q-tp20252-078","q-einstein2024-067","q-famerp2026-015","q-unicampdis2024-097","q-tp20241-103","q-unicampdis2023-028","q-sirio2027-048","q-sirio2026-096","q-unicampdis2024-093"],
          prosa: `[[A **dTpa** (difteria, tétano e coqueluche acelular) é feita **a partir da 20ª semana de gestação**, em **toda gestação**, mesmo que seja a primeira dose da série; o reforço **aumenta os anticorpos maternos** que passam pela placenta e protegem o lactente nos primeiros meses, constituindo imunização passiva do recém-nascido.|q-amrigs2025-088,q-famerp2026-015,q-unicampdis2024-097,q-einstein2024-067]]

[[As vacinas oferecidas a **toda gestante no SUS** são **dTpa, hepatite B, influenza e covid-19**: no terceiro trimestre, orientam-se essas quatro; numa gestante de 25 semanas com o cartão em dia, faltam a tríplice bacteriana acelular, a covid-19 e a influenza. Com teste rápido de hepatite B negativo no pré-natal, **vacinar**.|q-usprp2026-033,q-amrigs2024-087,q-tp20252-078,q-tp20241-103]]

[[A **vacina contra a raiva** não é contraindicada na gestação (é pós-exposição e salva vidas), e a dupla adulto pode ser feita; a **febre amarela** (viva) em gestante sem risco imediato **aguarda** o fim da gestação e o desmame; a mãe que **amamenta** lactente com menos de 6 meses e precisa da vacina em área com circulação do vírus deve **interromper o aleitamento por 10 dias** (com ordenha), porque o vírus vacinal pode passar ao bebê.|q-tp20231-111,q-usprp2021-023,q-unicampdis2023-028]]

[[A vacina contra o **VSR** (a partir da 28ª semana, em qualquer época do ano) e o **nirsevimabe** (anticorpo para o lactente) protegem o bebê na primeira temporada; lactente de 4 meses com as vacinas do calendário em dia não tem outra vacina a acrescentar. A puérpera com **varicela** no 3º dia de puerpério (lesões em vários estágios) recebe **imunoglobulina humana antivaricela-zóster**.|q-sirio2027-048,q-sirio2026-096,q-unicampdis2024-093]]`,
          texto: `- **dTpa** em **toda gestação**, a partir da **20ª semana**, inclusive se for a primeira dose da série. {q-amrigs2025-088,q-famerp2026-015}
- O reforço de dTpa **aumenta os anticorpos maternos**: imunização passiva do recém-nascido. {q-famerp2026-015}
- Gestante com carteira que não tem dTpa nesta gestação: **indicar dTpa**. {q-unicampdis2024-097}
- Gestante de 20 semanas sem queixas: **dTpa e influenza**. {q-einstein2024-067}
- Vacinas da gestante no SUS: **dTpa, hepatite B, influenza e covid-19**. {q-usprp2026-033,q-amrigs2024-087}
- Gestante de 25 semanas: faltam **tríplice bacteriana acelular, covid-19 e influenza**. {q-tp20252-078}
- Pré-natal com teste rápido de hepatite B negativo: **vacinar contra hepatite B**. {q-tp20241-103}
- **Raiva** na gestação: administrar a vacina e a dupla adulto. {q-tp20231-111}
- **Febre amarela** na gestante: aguardar o fim da gestação e o desmame. {q-usprp2021-023}
- Lactante de 4 meses cuja mãe recebe febre amarela em área de circulação: interromper o aleitamento por **10 dias**, mantendo a ordenha. {q-unicampdis2023-028}
- **VSR**: vacina na gestante **a partir da 28ª semana**, em qualquer época do ano. {q-sirio2027-048}
- Lactente com calendário em dia: **sem vacina adicional** indicada. {q-sirio2026-096}
- Puérpera com varicela: **imunoglobulina antivaricela-zóster**. {q-unicampdis2024-093}` },
        { id: "grp-adultos-idosos", titulo: "Adultos e idosos: dT, pneumocócica, influenza e campanhas", conferir: true, diretrizes: ["calendario-vacinal"],
          questoes: ["q-inf-29","q-amrigs2023-009","q-tp20212-116","q-tp20251-029","q-tp20261-043","q-famema2023-010","q-sessp2026-075","q-famema2025-078"],
          prosa: `[[O adulto com esquema completo na infância recebe o reforço de **dT a cada 10 anos**; quem não tem esquema recebe **três doses iniciais com intervalo de 60 dias** e reforço a cada 10 anos.|q-inf-29,q-amrigs2023-009]] O **idoso** recebe **influenza anual** a partir dos 60 anos, a **pneumocócica 23-valente** (a idosa acamada de 74 anos recebe uma dose, sem necessidade de reforço, junto com a dupla adulto, com reforço a cada 10 anos) e, depois de pneumonia, a vacina contra o herpes zoster.

[[Na campanha de influenza de 2022, **todos os trabalhadores da saúde** dos serviços públicos e privados estavam entre os grupos prioritários; a campanha em idosos acamados é feita em **domicílio**.|q-famema2023-010,q-tp20251-029]]

A vacina contra o **HPV** é oferecida pelo SUS para meninas e meninos e, em **imunossuprimidos e transplantados, de 9 a 45 anos**; a **hepatite B** é uma das ISTs prevenidas por vacina (sífilis, HIV e tricomoníase não).`,
          texto: `- **dT** a cada **10 anos** em quem completou o esquema; três doses (intervalo de 60 dias) se não vacinado. {q-inf-29,q-amrigs2023-009}
- **Influenza** anual a partir dos 60 anos: a ação preventiva indicada a **todos** os idosos. {q-tp20212-116}
- Idosa acamada: **pneumocócica 23-valente** hoje (sem reforço) e **dupla adulto** (reforço a cada 10 anos). {q-tp20251-029,q-tp20261-043}
- **Influenza 2022**: grupos prioritários incluem todos os **trabalhadores da saúde**. {q-famema2023-010}
- **HPV**: imunossuprimidos e transplantados de 9 a 45 anos recebem gratuitamente. {q-sessp2026-075}
- IST prevenível por vacina: **hepatite B**. {q-famema2025-078}` },
        { id: "grp-especiais", titulo: "Asplenia, exposição ocupacional, surtos e viagem", conferir: true, diretrizes: ["crie","calendario-vacinal"],
          questoes: ["q-usprp2023-055","q-famerp2023-064","q-unicamp2023-026","q-famerp2023-017","q-sessp2026-099","q-scmsp2026-001","q-einstein2023-074","q-einstein2021-044"],
          prosa: `[[Sem baço, o organismo perde o principal filtro contra **bactérias encapsuladas** (pneumococo, meningococo, *Haemophilus influenzae* tipo b). Por isso quem fez **esplenectomia** (trauma, 4º dia de pós-operatório) ou vai fazê-la eletivamente deve receber **pneumocócica, meningocócica e Hib**, de preferência **pelo menos 2 semanas antes** da cirurgia eletiva; no trauma, antes da alta.|q-famerp2023-064,q-unicamp2023-026,q-usprp2023-055]]

[[Na **exposição ocupacional** ao vírus da hepatite B (residente de cirurgia, material perfurocortante), indica-se, conforme o estado vacinal e o anti-HBs do profissional, **imunoglobulina humana anti-hepatite B** (0,06 mL/kg IM, nas primeiras horas) mais vacina; na **hepatite A** em surto de creche, a contactante de 32 anos recebe **uma dose da vacina**.|q-famerp2023-017,q-sessp2026-099]]

[[A vacina **meningocócica** (conjugada) é indicada a pessoas com **anemia falciforme, asplenia, HIV** e outros grupos do CRIE, em esquema próprio; no **surto de meningite C** em São Paulo, o **bloqueio** com meningo C se fez **entre 3 meses e 64 anos**. A **febre amarela** vale para quem mora ou viaja a área de risco (na criança, dose aos 9 meses e reforço aos 4 anos; a partir dos 5 anos, dose única).|q-scmsp2026-001,q-einstein2023-074,q-einstein2021-044]]`,
          texto: `- **Esplenectomia**: **pneumocócica, meningocócica e Hib** (bactérias encapsuladas). {q-famerp2023-064,q-unicamp2023-026}
- Cirurgia eletiva em asplênico: vacinar **2 semanas antes**. {q-usprp2023-055}
- Acidente perfurocortante em residente: **imunoglobulina anti-hepatite B** (0,06 mL/kg IM) nas primeiras horas, conforme o estado vacinal. {q-famerp2023-017}
- **Hepatite A** em surto de creche, contato suscetível: **uma dose da vacina**. {q-sessp2026-099}
- **Meningocócica**: indicada na anemia falciforme (e outros grupos do CRIE). {q-scmsp2026-001}
- **Bloqueio** do surto de meningite C: entre **3 meses e 64 anos**. {q-einstein2023-074}
- **Febre amarela** no calendário nacional: **9 meses e reforço aos 4 anos**; dose única para quem se vacina a partir dos 5 anos. {q-einstein2021-044}` },
      ],
    },
    {
      id: "pos-exposicao", titulo: "Profilaxia pós-exposição: raiva e tétano",
      introducao: `[[A profilaxia pós-exposição **decide pelo risco**: no tétano, pela **gravidade e sujidade da ferida** e pelo **estado vacinal**; na raiva, pelo **tipo de animal** (observável, domiciliar, silvestre) e pela **gravidade da lesão**. O mecanismo é o de **dar anticorpo imediato** (soro ou imunoglobulina) quando a vacina ainda não teria tempo de agir, e **vacina** para a proteção duradoura.|q-usprp2021-001,q-famema2025-012]]`,
      fragmentos: [
        { id: "pos-raiva", titulo: "Raiva: observar, vacinar, soro", conferir: true, diretrizes: ["raiva-2022"],
          questoes: ["q-adap21-001","q-scmsp2025-042","q-usprp2022-008","q-usprp2024-017","q-usprp2026-039","q-iamspe2026-021","q-famema2021-092","q-famema2025-012"],
          prosa: `A conduta começa por **lavar a ferida** com água e sabão. [[Para **animais silvestres** (macaco, sagui, morcego), mesmo domiciliados e **observáveis**, indica-se **soro e vacina** (sorovacinação), porque não se pode confiar na observação deles; o mesmo vale para o cão que **fugiu** ou não foi localizado, com lesão **profunda** ou em **cabeça, braços e face**.|q-usprp2024-017,q-iamspe2026-021,q-adap21-001,q-famema2021-092]]

[[Para o **cão sadio, conhecido e observável**, com lesão profunda, observa-se o animal por **10 dias em reclusão** e só se inicia soro e vacina se ele adoecer, morrer ou desaparecer. O esquema vacinal atual é de **4 doses (0, 3, 7 e 14)**, e não de 5; o **contato indireto com morcego** também recebe 4 doses. A criança de 8 anos atacada por **porco** (animal de produção) recebe **quatro doses de vacina, sem soro**.|q-usprp2026-039,q-famema2025-012,q-usprp2022-008]]

Quando a mordedura é de macaco, além da raiva, avalia-se o **tétano**: a criança de 12 anos que tem vacina em dia recebe a **vacina antitetânica e a antirrábica**, não antibiótico nem aciclovir.`,
          texto: `- Lavar a ferida com água e sabão sempre; ferida profunda por cão que **fugiu**: **soro infiltrado + vacina** em 4 doses (0, 3, 7, 14). {q-adap21-001,q-famema2021-092}
- **Sagui** e outros primatas, mesmo observáveis: **soro e vacina**. {q-usprp2024-017,q-iamspe2026-021}
- Macaco mordeu o rosto de criança: **vacina antitetânica e antirrábica** (em esquema em dia). {q-scmsp2025-042}
- **Cão sadio** observável com mordedura profunda: observar **10 dias**; vacina e soro só se tiver sinais. {q-usprp2026-039}
- Esquema atual: **4 doses**; contato indireto com morcego: 4 doses. {q-famema2025-012}
- Ataque por **porco doméstico**: **quatro doses de vacina, sem soro**. {q-usprp2022-008}` },
        { id: "pos-tetano", titulo: "Tétano: vacina e soro antitetânico", conferir: true, diretrizes: ["raiva-2022"],
          questoes: ["q-usprp2021-001","q-tp20231-058"],
          prosa: `[[A ferida **profunda e contaminada** num adulto com **esquema incompleto ou desconhecido** pede **dT e soro antitetânico** (ou imunoglobulina), porque ele não tem anticorpos para a toxina; quem tem o esquema **completo** recebe apenas o reforço quando está vencido, **sem soro**.|q-usprp2021-001,q-tp20231-058]] Num acampamento, o adolescente de 14 anos com ferida contusa profunda contaminada por terra, **vacinado**, não precisa de soro antitetânico.`,
          texto: `- Ferida profunda em lavrador com cartão incompleto: **dT (uma dose) e soro antitetânico**. {q-usprp2021-001}
- Ferida profunda contaminada em quem tem esquema completo: **sem soro antitetânico**. {q-tp20231-058}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-einstein2021-044","q-usprp2021-023","q-einstein2025-005"],
          prosa: `[[A **febre amarela** confunde porque tem duas regras: a criança recebe **uma dose aos 9 meses e reforço aos 4 anos** (desde 2020, mantido no calendário de 2026), e quem se vacina **a partir dos 5 anos** recebe **dose única** na vida. A prova do Einstein de 2021 cobrou o **reforço aos 4 anos**, de acordo com a regra da criança.|q-einstein2021-044]] [[Na gestação, a regra é evitar vacinas vivas, mas a febre amarela é indicada em área com circulação do vírus; a USP-RP 2021 cobrou aguardar o fim da gestação e o desmame.|q-usprp2021-023]] [[Em imunossuprimido com anti-TNF, as vacinas vivas são em geral contraindicadas; a prova do Einstein de 2025 deu a dengue tetravalente (viva atenuada) como a vacina indicada.|q-einstein2025-005]]`,
          texto: `- Febre amarela: criança, **9 meses + reforço aos 4 anos**; a partir dos 5 anos, **dose única**. A prova (Einstein 2021) cobrou o reforço aos 4 anos, como a regra. {q-einstein2021-044}
- Regra: na gestação, as vivas esperam; a prova (USP-RP 2021) cobrou **aguardar o término da gestação e o desmame** para a febre amarela. {q-usprp2021-023}
- Regra: vivas em imunossuprimido são contraindicadas; a prova (Einstein 2025) cobrou a **dengue tetravalente em duas doses**. {q-einstein2025-005}` },
      ],
    },
  ],
});
