/* resumos/calendario-vacinal/resumo.js — resumo adaptativo do Calendário Nacional de Vacinação.
   Molde e regras: resumos/LEIA-ME.md. Seções de calendário e conduta levam `diretrizes`:
   o calendário muda quase todo ano, e é por elas que a edição nova acha o que reescrever.
   Os "Para decorar" são mnemônicos autorais; só repetem o que o texto da seção já diz.
   Conferência: npm run resumo -- calendario-vacinal */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "calendario-vacinal",
  titulo: "Calendário vacinal",
  assunto: "ass-calendariovacinal",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "calendario-vacinal", texto: "Ministério da Saúde — Calendário Nacional de Vacinação e Instrução Normativa do ano (PNI)", edicao: "2026", lidoEm: null },
    { id: "ms-normas-vacinacao", texto: "Ministério da Saúde — Manual de Normas e Procedimentos para Vacinação (2014)", lidoEm: null },
    { id: "ms-crie", texto: "Ministério da Saúde — Manual dos Centros de Referência para Imunobiológicos Especiais (CRIE)", lidoEm: null },
    { id: "ms-esavi", texto: "Ministério da Saúde — Manual de Vigilância Epidemiológica de Eventos Supostamente Atribuíveis à Vacinação ou Imunização (ESAVI)", lidoEm: null },
    { id: "nt-rotavirus", texto: "Ministério da Saúde — Nota Técnica nº 193/2024 (faixa etária da vacina rotavírus humano)", lidoEm: null },
    { id: "ms-guia-vigilancia", texto: "Ministério da Saúde — Guia de Vigilância em Saúde (sarampo, tétano acidental)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas: sem gabarito para medir o erro",
      questoes: ["q-usp2024-079","q-iamspe2022-048","q-iamspe2026-076","q-famerp2025-054","q-sirio2023-100","q-fmabc2025-099","q-einstein2025-045","q-unicampdis2022-033"] },
    { motivo: "Desatualizadas: entram as reposições (-ia), que já estão nas seções",
      questoes: ["q-unifesp2025-083","q-scmsp2021-060","q-usp2023-094","q-amrigs2021-072","q-sessp2026-049"] },
  ],
  doencas: [
    {
      id: "logica", titulo: "A lógica do calendário",
      introducao: `O calendário não é uma lista arbitrária: cada vacina entra na idade em que **o risco da doença** e **a capacidade de responder à vacina** se cruzam. O recém-nascido recebe já na maternidade o que o ameaça desde o primeiro dia (tuberculose grave e hepatite B de transmissão vertical). As vacinas inativadas e conjugadas começam aos **2 meses**, quando o lactente já responde a elas e os anticorpos que vieram da mãe começam a cair.

[[As vacinas de vírus vivo injetáveis contra sarampo, caxumba e rubéola esperam os 12 meses porque os anticorpos maternos, passados pela placenta, neutralizariam o vírus vacinal antes que ele induzisse imunidade.|q-didepm-044,q-uspsp4-099]] Os **reforços** existem porque a resposta do lactente às primeiras doses é curta: a memória imunológica só se consolida com nova exposição ao antígeno.

[[Atrasar não obriga a recomeçar: a imunidade das doses já dadas persiste, e o esquema continua de onde parou, respeitando intervalo mínimo e idade máxima de cada vacina.|q-einstein2021-025,q-famerp2025-043,q-adap25-083]]`,
      fragmentos: [
        { id: "log-regras", titulo: "Regras gerais que a banca cobra", conferir: true, diretrizes: ["ms-normas-vacinacao"],
          questoes: ["q-einstein2021-025","q-famerp2025-043","q-adap25-083","q-tp20251-040","q-usp2024-021","q-scmsp2026-091","q-uspsp5-094"],
          casos: ["q-uspsp5-094"],
          prosa: `[[Antitérmico antes da vacina não é recomendado: não previne a convulsão febril e pode reduzir a resposta de anticorpos; trata-se a febre se ela vier.|q-usp2024-021,q-scmsp2026-091]] Criança sem comprovante de vacina é tratada como **não vacinada**: aplica-se o calendário da idade atual.`,
          texto: `- Esquema atrasado **não se reinicia**: aplica-se hoje tudo o que é devido para a idade, respeitando **intervalo mínimo** e **idade máxima**. {q-einstein2021-025,q-famerp2025-043}
- Rotavírus é a vacina com **idade máxima** que mais cai: passada ela, não se inicia mais. {q-adap25-083}
- Sem carteira: **considerar não vacinado** e adequar ao calendário da idade. {q-tp20251-040}
- **Não** prescrever antitérmico profilático antes das vacinas; febre leve pós-vacina é esperada e se trata com sintomático. {q-usp2024-021,q-scmsp2026-091}
- Família com medo de vacina: **acolher**, indicar fontes seguras, discutir riscos e benefícios e **vacinar o que está devido** (vacina não causa autismo). {q-uspsp5-094}` },
      ],
    },
    {
      id: "crianca", titulo: "O calendário da criança, idade por idade",
      introducao: `A espinha do calendário é o primeiro ano. Ao nascer, **BCG** e **hepatite B**. Aos 2, 4 e 6 meses, o "pacote" das inativadas: **pentavalente** (difteria, tétano, coqueluche, *Haemophilus influenzae* b e hepatite B) e **VIP** (poliomielite inativada). Rotavírus e pneumocócica acompanham os 2 e 4 meses; a meningocócica C fica nos meses ímpares, 3 e 5.

[[A substituição da VOP pela VIP no esquema veio para eliminar a poliomielite associada à vacina oral: o vírus vivo atenuado da VOP pode reverter e causar paralisia, risco que a vacina inativada não tem.|q-iamspe2025-080,q-fmabc2024-041,q-sirio2027-049]]

Depois do primeiro ano vêm a segunda metade das vacinas virais (tríplice viral, varicela, hepatite A, febre amarela) e os reforços das inativadas aos 15 meses e aos 4 anos.`,
      fragmentos: [
        { id: "cri-nascer", titulo: "Ao nascer: BCG e hepatite B", conferir: true, diretrizes: ["calendario-vacinal"],
          questoes: ["q-iamspe2021-065","q-iamspe2026-089","q-fmabc2022-097"],
          texto: `- Na maternidade: **BCG (dose única)** e **hepatite B**. {q-iamspe2021-065,q-iamspe2026-089}
- BCG é **dose única, ao nascer**; não há reforço. {q-fmabc2022-097}` },
        { id: "cri-primeiro-ano", casos: ["q-scmsp2023-045"], titulo: "Do 2º ao 9º mês", conferir: true, diretrizes: ["calendario-vacinal"],
          questoes: ["q-015","q-iamspe2026-074","q-usp2022-044","q-sirio2027-049","q-usprp2023-043","q-fmabc2023-046","q-scmsp2023-045","q-amrigs2021-072-ia","q-unifesp2025-083-ia","q-einstein2021-025"],
          figuras: [{ arquivo: "figuras/primeiro-ano.svg", legenda: "Esquema autoral: as vacinas do primeiro ano, mês a mês." }],
          casos: ["q-usprp2023-043"],
          texto: `- **2 e 4 meses**: pentavalente, **VIP**, **rotavírus** e **pneumocócica 10-valente**. {q-015,q-iamspe2026-074,q-usp2022-044,q-fmabc2023-046}
- A pólio do esquema básico é a **VIP, intramuscular**, desde a primeira dose. {q-sirio2027-049}
- **3 e 5 meses**: **meningocócica C**. {q-usprp2023-043,q-iamspe2026-074}
- **6 meses**: pentavalente e VIP (3ª dose); rotavírus e pneumocócica já terminaram. Influenza e covid-19 a partir dos 6 meses. {q-unifesp2025-083-ia,q-einstein2021-025}
- **9 meses**: **febre amarela**. {q-amrigs2021-072-ia,q-scmsp2023-045}` },
        { id: "cri-12-15", titulo: "12 e 15 meses", conferir: true, diretrizes: ["calendario-vacinal"],
          questoes: ["q-didepm-044","q-uspsp4-099","q-iamspe2026-076-ia","q-usprp2021-012","q-usprp2023-014","q-usprp2026-035","q-famema2023-089","q-scmsp2023-045"],
          texto: `- **12 meses**: **tríplice viral (SCR)**, **reforço da pneumocócica 10** e **reforço da meningocócica**, que desde 2025 é feito com a **ACWY** (antes, com a C). {q-didepm-044,q-uspsp4-099,q-iamspe2026-076-ia,q-scmsp2023-045}
- **15 meses**: **1º reforço da DTP**, **reforço da pólio (VIP desde 2024; antes VOP)**, **hepatite A** e **tetraviral** (2ª dose de SCR + varicela). {q-usprp2026-035,q-usprp2023-014,q-usprp2021-012}
- Questões antigas trazem **VOP** aos 15 meses e 4 anos: era o calendário da época. {q-usprp2021-012,q-famema2023-089}` },
        { id: "cri-4-anos", titulo: "4 anos", conferir: true, diretrizes: ["calendario-vacinal"],
          questoes: ["q-scmsp2026-058","q-fmabc2026-050","q-famema2025-070"],
          prosa: `Aos 4 anos fecham-se os reforços: [[o segundo reforço da DTP, o reforço da febre amarela e a segunda dose da varicela renovam a proteção que caiu desde as doses do primeiro e do segundo ano.|q-scmsp2026-058,q-fmabc2026-050]] O reforço de pólio nessa idade aparece nos gabaritos de 2026, mas a leitura do quadro de 2026 feita para estas questões não é unânime: confira na Instrução Normativa vigente.`,
          texto: `- **4 anos**: **2º reforço da DTP**, **reforço da febre amarela**, **2ª dose da varicela**; os gabaritos de 2026 incluem o **reforço da pólio**. {q-scmsp2026-058,q-fmabc2026-050}
- Pneumocócica 23-valente aos 5 anos só no calendário dos **povos indígenas**. {q-famema2025-070}` },
        { id: "cri-mnemonicos", titulo: "Para decorar: o calendário em imagens", conferir: true, diretrizes: ["calendario-vacinal"],
          questoes: ["q-015","q-iamspe2026-074","q-usprp2023-043","q-didepm-044","q-usprp2026-035","q-scmsp2026-058","q-iamspe2021-065"],
          texto: `- **"Nasceu? B e B."** **B**CG e hepatite **B**: as duas que começam com B saem da maternidade. {q-iamspe2021-065}
- **Meses pares (2, 4, 6) = "PaVi"**: **Pa**ra a pentavalente, **Vi** para a VIP, nas três. {q-015,q-iamspe2026-074}
- **"Roda e pneu só no 2 e no 4"**: **ro**tavírus e **pneu**mocócica andam juntos e param no 4º mês. {q-015}
- **"Meningo é ímpar"**: meningocócica C aos **3 e 5** meses. {q-usprp2023-043}
- **"9 meses, amarelo maduro"**: febre amarela aos **9** meses (e reforço aos 4 anos).
- **"Bolo de 1 ano com 3 velas"**: **SCR**, **reforço da pneumo** e **reforço da meningo**. {q-didepm-044}
- **"Débora VIu A TEtra"** aos **15 meses**: **D**TP, **VI**P, hepatite **A**, **Te**traviral. {q-usprp2026-035}
- **"4 anos: Dá Febre, Varicela"**: **D**TP, **F**ebre amarela, **V**aricela (2ª dose). {q-scmsp2026-058}` },
      ],
    },
    {
      id: "adolescente", titulo: "Adolescente, gestante e campanhas",
      introducao: `No adolescente, o calendário mira o que ele vai encontrar a seguir. [[A vacina HPV é dada antes do início da vida sexual porque protege contra a infecção, não trata a que já existe; por isso a faixa é de 9 a 14 anos.|q-iamspe2025-048,q-famema2022-002,q-sirio2024-094]] [[A meningocócica ACWY aos 11 a 14 anos existe porque o adolescente é o principal portador do meningococo na nasofaringe: vaciná-lo protege a ele e corta a transmissão.|q-iamspe2026-075,q-iamspe2022-080]]

Na gestante, a lógica é proteger o bebê antes de ele poder ser vacinado. [[A dTpa na gestação faz a mãe produzir IgG contra a coqueluche, que atravessa a placenta e protege o lactente nos primeiros meses, quando a coqueluche é mais grave e ele ainda não completou a pentavalente.|q-uspsp2-038,q-uspsp4-037,q-usp2026-056]]`,
      fragmentos: [
        { id: "ado-hpv", titulo: "HPV", conferir: true, diretrizes: ["calendario-vacinal"],
          questoes: ["q-iamspe2025-048","q-famema2022-002","q-sirio2024-094","q-scmsp2025-099","q-amrigs2023-050","q-sessp2024-066","q-scmsp2026-091","q-sessp2023-025","q-iamspe2026-045","q-sirio2022-100","q-usp2024-024","q-usprp2024-074"],
          texto: `- Vacina **quadrivalente (6, 11, 16, 18)**, para **meninas e meninos de 9 a 14 anos**. {q-iamspe2025-048,q-famema2022-002,q-usp2024-024}
- Desde 2024, **dose única** no PNI. {q-scmsp2025-099,q-iamspe2025-048}
- Questões mais antigas (e algumas recentes) cobram o esquema anterior, de **2 doses com 6 meses** de intervalo: leia o ano da prova. {q-amrigs2023-050,q-sessp2024-066,q-scmsp2026-091}
- Provas mais antigas trazem a faixa anterior, **11 a 14 anos**. {q-sirio2024-094}
- **Imunossuprimidos e pacientes oncológicos: 3 doses**. {q-sessp2023-025}
- **Não** se vacina gestante contra HPV. {q-iamspe2026-045}
- A bivalente (16, 18) não é a vacina do PNI. {q-sirio2022-100}
- Adolescente: HPV e meningocócica ACWY são as que protegem contra **HPV e meningite**. {q-usprp2024-074}` },
        { id: "ado-meningo-dengue", titulo: "Meningocócica ACWY e dengue", conferir: true, diretrizes: ["calendario-vacinal"],
          questoes: ["q-iamspe2026-075","q-iamspe2022-080","q-unesp2022-012","q-usp2024-024","q-uspsp5-084","q-sessp2025-044","q-sirio2023-100-ia"],
          texto: `- **Meningocócica ACWY: dose única dos 11 aos 14 anos**. {q-iamspe2026-075,q-usp2024-024}
- Adolescente de 12 anos que parou aos 4: **HPV + ACWY hoje**. {q-iamspe2022-080,q-unesp2022-012}
- **Dengue (Qdenga)**: **tetravalente de vírus vivos atenuados**, **2 doses com 3 meses** de intervalo, de **10 a 14 anos**, nas regiões prioritárias. {q-uspsp5-084,q-sessp2025-044,q-sirio2023-100-ia}
- **Para decorar: "a escada 9-10-11"**: **9** anos HPV, **10** dengue, **11** meningo; todas até os **14**. {q-iamspe2026-075,q-uspsp5-084}` },
        { id: "ado-gestante", titulo: "Gestante", conferir: true, diretrizes: ["calendario-vacinal"],
          questoes: ["q-uspsp2-038","q-uspsp4-037","q-usp2026-056","q-scmsp2025-044"],
          casos: ["q-usp2026-056"],
          texto: `- **dTpa em toda gestação, a partir da 20ª semana**, além de influenza (e hepatite B e covid-19 conforme a situação). {q-uspsp2-038,q-uspsp4-037}
- Lactente com coqueluche cuja mãe não recebeu dTpa: a doença seria prevenida com **dTpa materna**. {q-usp2026-056}
- A vacina tríplice bacteriana de células inteiras (DTP) é indicada **só até os 7 anos**. {q-scmsp2025-044}
- **Para decorar: "vinte e toda vez"**: dTpa a partir da **20ª** semana, **em toda** gestação. {q-uspsp4-037}` },
        { id: "ado-sarampo-influenza", titulo: "Sarampo e influenza: campanhas e doses extras", conferir: true, diretrizes: ["calendario-vacinal","ms-guia-vigilancia"],
          questoes: ["q-scmsp2021-058","q-sirio2021-099","q-sirio2023-089","q-sirio2026-048","q-didepm-099","q-fmabc2026-050"],
          texto: `- **Dose zero** de tríplice viral (6 a 11 meses, em surto) **não conta**: mantêm-se as doses dos **12 e 15 meses**. {q-sirio2023-089,q-sirio2026-048}
- Adultos de **30 a 59 anos** não vacinados: **1 dose** de tríplice viral (ampliação de 2020). {q-scmsp2021-058,q-sirio2021-099}
- **Influenza**: de 6 meses a menos de 9 anos, na **primeira vez, 2 doses com 30 dias**; depois, 1 dose por ano. {q-didepm-099,q-fmabc2026-050}` },
      ],
    },
    {
      id: "especificas", titulo: "Vacina a vacina: o que cada uma cobra",
      introducao: `Cada vacina tem uma particularidade que vira questão. [[A BCG depende do peso porque o recém-nascido muito pequeno tem resposta imune celular menor e pele fina para a aplicação intradérmica; por isso espera-se 2.000 g.|q-fmabc2025-044,q-uspsp5-107,q-famerp2024-051]] [[As demais vacinas do prematuro seguem a idade cronológica: esperar a idade corrigida deixaria desprotegido justamente quem tem mais risco.|q-fmabc2025-051,q-uspsp2-063,q-iamspe2023-039]]

[[O filho de mãe HBsAg positivo recebe vacina e imunoglobulina nas primeiras 12 horas porque a transmissão ocorre no parto: a imunoglobulina neutraliza o vírus recebido e a vacina garante a proteção duradoura.|q-adap21-012,q-famerp2022-021]]`,
      fragmentos: [
        { id: "esp-bcg", titulo: "BCG", conferir: true, diretrizes: ["calendario-vacinal","ms-normas-vacinacao"],
          questoes: ["q-fmabc2025-044","q-uspsp5-107","q-famerp2024-051","q-amrigs2021-066","q-unesp2021-006","q-usp2023-096","q-usprp2026-050","q-famerp2026-048"],
          casos: ["q-usprp2026-050"],
          texto: `- Única vacina que depende do **peso: 2.000 g**. {q-fmabc2025-044,q-amrigs2021-066}
- Prematuro com 2.000 g ou mais: **vacinar já**; abaixo disso, adiar até atingir o peso. {q-famerp2024-051,q-uspsp5-107}
- Proteção leva **cerca de 12 semanas**; não há dose aos 6 meses. {q-amrigs2021-066}
- Evolução esperada: nódulo, pústula, úlcera e **cicatriz**; **linfonodo axilar pequeno, sem flutuação: observar**. {q-usp2023-096,q-usprp2026-050}
- Complicações mais comuns: **abscesso, úlcera maior que o esperado e linfonodo fistulizado**. {q-unesp2021-006}
- Mãe em uso de **biológico imunossupressor** (ex.: rituximabe) na gestação: hepatite B normal, **BCG adiada**. {q-famerp2026-048}
- **Para decorar: "BCG pesa 2 quilos"**. {q-fmabc2025-044}` },
        { id: "esp-hepb-prematuro", titulo: "Hepatite B ao nascer e o prematuro", conferir: true, diretrizes: ["calendario-vacinal","ms-crie"],
          questoes: ["q-adap21-012","q-famerp2022-021","q-fmabc2025-051","q-uspsp2-063","q-iamspe2023-039"],
          texto: `- Mãe **HBsAg+**: **vacina + imunoglobulina (HBIG)** em locais diferentes, **de preferência nas primeiras 12 horas**. {q-adap21-012,q-famerp2022-021}
- Prematuro: **idade cronológica**, exceto a BCG (peso). {q-fmabc2025-051,q-uspsp2-063}
- A resposta imune do prematuro **pode ser menor** que a do bebê de termo. {q-iamspe2023-039}` },
        { id: "esp-rota-polio", titulo: "Rotavírus e poliomielite", conferir: true, diretrizes: ["calendario-vacinal","nt-rotavirus"],
          questoes: ["q-adap24-089","q-unifesp2024-084","q-iamspe2025-064","q-famerp2025-054-ia","q-scmsp2021-060-ia","q-adap25-083","q-scmsp2023-047","q-iamspe2023-070","q-iamspe2025-080","q-fmabc2024-041","q-usp2023-094-ia"],
          texto: `- Rotavírus **contraindicada**: **invaginação intestinal prévia**, **imunodeficiência combinada grave** e alergia a componente. {q-adap24-089,q-unifesp2024-084,q-iamspe2025-064,q-famerp2025-054-ia}
- Filho de mãe com HIV, assintomático, **pode** receber rotavírus. {q-scmsp2021-060-ia}
- Faixa ampliada em 2024: **1ª dose até 11 meses e 29 dias**; passou disso, não se inicia. {q-adap25-083}
- **VOP contraindicada** em pessoas com HIV e em **seus comunicantes** (o vírus vacinal é eliminado nas fezes). {q-scmsp2023-047}
- VIP entrou em **2012 (2 doses)** e passou a **3 doses em 2016**; a VOP saiu do calendário em **2024**. {q-iamspe2023-070,q-fmabc2024-041,q-iamspe2025-080}
- Criança em uso de corticoide e antibiótico: **não** se dá a vacina de vírus vivo que estava devida (na reposição, **febre amarela**). {q-usp2023-094-ia}` },
      ],
    },
    {
      id: "contra", titulo: "Contraindicações, adiamentos e situações especiais",
      introducao: `[[Vacina de agente vivo atenuado é contraindicada no imunodeprimido porque, sem imunidade celular, o agente vacinal pode se multiplicar e causar a própria doença; as inativadas não têm esse risco, só podem responder menos.|q-unicamp2022-042,q-adap26-096,q-unifesp2026-096]] Por isso, antes de transplante ou imunossupressão programada, vacina-se antes.

[[Adia-se a tríplice viral e a varicela depois de transfusão ou imunoglobulina porque os anticorpos recebidos neutralizam o vírus vacinal; a doença febril grave adia qualquer vacina para não confundir o quadro.|q-unesp2026-092,q-famema2022-086]]`,
      fragmentos: [
        { id: "con-vivos", titulo: "Vírus vivos e imunossupressão", conferir: true, diretrizes: ["ms-crie"],
          questoes: ["q-unicamp2022-042","q-adap26-096","q-unifesp2026-096","q-sirio2024-053","q-famema2025-048","q-tp20251-040","q-einstein2027-063","q-sessp2022-051","q-fmabc2022-054"],
          texto: `- Corticoide em dose imunossupressora + ciclosporina: **contraindicadas varicela e febre amarela** (vírus vivos). {q-unicamp2022-042}
- Imunodeprimido: **adiar as vivas** e aplicar as inativadas, com orientação do **CRIE**. {q-adap26-096}
- Transplantado: covid-19 **indicada, com doses adicionais**. {q-unifesp2026-096}
- Antes de imunossupressão programada: atualizar o calendário cerca de **30 dias antes**. {q-sirio2024-053}
- **Síndrome de Down**: pneumocócica conjugada seguida da **polissacarídica 23-valente**. {q-famema2025-048}
- **Asma**: calendário habitual, com **influenza** anual; asma grave também recebe **pneumocócica 23**. {q-einstein2027-063,q-tp20251-040}
- Mãe que amamenta bebê **menor de 6 meses** e recebe **febre amarela**: suspender o aleitamento por **10 dias**. {q-sessp2022-051}
- Viagem para área de febre amarela com lactente abaixo de 6 meses: vacina-se **o adulto** que não tem a vacina. {q-fmabc2022-054}
- **Para decorar: os vivos são "FAVORiTos" da BCG**: **F**ebre **A**marela, **V**aricela, **O**ral da pólio (VOP), **R**otavírus, **T**ríplice/tetraviral, mais dengue e a **BCG**. {q-unicamp2022-042,q-adap26-096}` },
        { id: "con-adiar", titulo: "Quando adiar", conferir: true, diretrizes: ["ms-normas-vacinacao"],
          questoes: ["q-unesp2026-092","q-famema2022-086"],
          texto: `- Adiar: **doença febril grave**; **até 3 meses após imunoglobulina** para tríplice viral e varicela. {q-unesp2026-092}
- Transfusão recente: **adiar a tríplice viral**, dar as demais. {q-famema2022-086}` },
      ],
    },
    {
      id: "eventos", titulo: "Eventos adversos e tétano",
      introducao: `[[O componente pertussis de células inteiras é o mais reatogênico do calendário: é dele que vêm a febre alta, o choro persistente, a convulsão febril e o episódio hipotônico-hiporresponsivo nas primeiras 48 horas.|q-usprp2024-016,q-sessp2024-053,q-fmabc2025-099-ia,q-sirio2024-060]] Esses eventos assustam, mas não deixam sequela; o que muda é a vacina das próximas doses, que passa a ser a acelular (DTPa) no CRIE.

[[O tétano acidental depende da ferida e do esquema: ferida de risco em quem não tem esquema confiável pede limpeza, vacina e imunoglobulina; ferida limpa em quem está em dia não pede nada além do curativo.|q-udisc20262-044,q-fmabc2023-049]]`,
      fragmentos: [
        { id: "eve-pertussis", titulo: "O componente pertussis", conferir: true, diretrizes: ["ms-esavi"],
          questoes: ["q-usprp2024-016","q-sessp2024-053","q-fmabc2025-099-ia","q-sirio2024-060","q-usp2023-084"],
          texto: `- **Episódio hipotônico-hiporresponsivo**: causado pelo **componente pertussis** (pentavalente/DTP). {q-usprp2024-016,q-sirio2024-060}
- **Choro persistente** após as vacinas dos 2 meses: **pentavalente**. {q-fmabc2025-099-ia}
- O pertussis responde pelo **maior número de reações** (febre, irritabilidade, sonolência). {q-sessp2024-053}
- Episódio resolvido, criança estável: **não precisa de investigação adicional**. {q-usp2023-084}
- **Para decorar: "P de pertussis, P de problema"**: febre alta, choro, convulsão e hipotonia vêm do P. {q-usprp2024-016}` },
        { id: "eve-tetano", titulo: "Profilaxia do tétano acidental", conferir: true, diretrizes: ["ms-guia-vigilancia"],
          questoes: ["q-udisc20262-044","q-fmabc2023-049"],
          texto: `- Ferida **de alto risco** (perfurante, necrose) com vacinação **incerta**: **desbridamento + vacina + imunoglobulina antitetânica**. {q-udisc20262-044}
- Ferida limpa e suturada, **vacinação em dia**: só cuidados locais. {q-fmabc2023-049}` },
      ],
    },
  ],
});
