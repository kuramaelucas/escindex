/* resumos/emergencias-respiratorias-pcr/resumo.js — resumo adaptativo de emergências pediátricas:
   avaliação do paciente grave, insuficiência respiratória e via aérea, crise de asma, parada
   cardiorrespiratória (PALS) e as emergências circulatórias que caem junto (choque no trauma, arritmias).
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- emergencias-respiratorias-pcr */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "emergencias-respiratorias-pcr",
  titulo: "Emergências pediátricas: insuficiência respiratória e parada",
  assunto: "ass-emergped-respiratoria",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "aha-rcp", texto: "American Heart Association — Pediatric Basic and Advanced Life Support (PALS); as questões citam a edição de 2020, e a vigente é a de 2025", lidoEm: null },
    { id: "gina", texto: "Global Initiative for Asthma (GINA) — relatório anual", lidoEm: null },
    { id: "palicc", texto: "PALICC-2 — Pediatric Acute Lung Injury Consensus Conference (2023)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada: sem gabarito para medir o erro", questoes: ["q-scmsp2023-053"] },
  ],
  doencas: [
    {
      id: "avaliacao", titulo: "A criança grave e a insuficiência respiratória",
      introducao: `[[Na criança, a parada cardíaca quase nunca começa no coração: ela é o fim de uma hipóxia ou de um choque que não foi revertido.|q-iamspe2021-035,q-amrigs2023-073]] Por isso o atendimento pediátrico é organizado para **reconhecer cedo** o desconforto e a insuficiência respiratória, numa sequência que se repete: [[avaliar, identificar, intervir e reavaliar.|q-iamspe2021-036]]

**Fisiopatologia.** No desconforto, a criança compensa com taquipneia, tiragem e taquicardia. [[Quando a compensação se esgota, a frequência respiratória cai, a consciência rebaixa e a hipoxemia leva à bradicardia: respiração lenta e superficial num paciente sonolento não é melhora, é insuficiência respiratória, e pede ventilação com bolsa-válvula-máscara.|q-unifesp2022-065,q-usprp2025-004,q-uspsp3-031,q-amrigs2022-067]] [[A bradicardia com pulso na criança é quase sempre hipóxica: corrige-se primeiro a ventilação.|q-scmsp2023-055,q-uspsp5-103]]`,
      fragmentos: [
        { id: "ava-reconhecer", titulo: "Reconhecer e ventilar", conferir: true, diretrizes: ["aha-rcp"],
          questoes: ["q-iamspe2021-035","q-iamspe2021-036","q-unifesp2022-065","q-usprp2025-004","q-uspsp3-031","q-scmsp2023-055","q-uspsp5-103","q-einstein2027-038","q-usp2023-083","q-unesp2023-014","q-amrigs2025-076"],
          casos: ["q-usp2023-083"],
          texto: `- Causa principal de PCR na criança: **hipóxia**. {q-iamspe2021-035}
- Sequência: **avaliar → identificar → intervir → reavaliar**. {q-iamspe2021-036}
- Sonolência, **FR baixa**, respiração superficial e SpO2 baixa: **ventilação com bolsa-válvula-máscara**, não máscara de O2. {q-unifesp2022-065,q-usprp2025-004,q-uspsp3-031,q-einstein2027-038}
- Bradicardia **com pulso** (FC 40): **ventilar** com bolsa-válvula-máscara. {q-scmsp2023-055}
- Respira mal, tem pulso: **1 ventilação a cada 2 a 3 segundos** (as provas citam "a cada 3 s"). {q-uspsp5-103}
- Máscara que cobre **boca e nariz sem tocar os olhos**, coxim sob os ombros no lactente, mão em "C-E". {q-usp2023-083}
- **Máscara de Venturi**: FiO2 definida por adaptadores de cor. {q-unesp2023-014}
- Afogamento: a lesão a tratar com mais agressividade é a **hipoxemia**. {q-amrigs2025-076}` },
        { id: "ava-intubar", titulo: "Intubação e via aérea avançada", conferir: true, diretrizes: ["aha-rcp"],
          questoes: ["q-amrigs2022-067","q-tp20232-054","q-tp20241-053","q-usp2026-049","q-sirio2022-044","q-einstein2023-044","q-didepm-009"],
          casos: ["q-usp2026-049"],
          texto: `- Asmático **sem sibilos**, bradipneico, com acidose respiratória: **intubar** em sequência rápida, com **quetamina**. {q-amrigs2022-067}
- Letargia com hipotensão e esforço intenso: **intubação orotraqueal**. {q-tp20232-054}
- Glasgow ≤ 8 a 10 com hipoxemia: intubar, depois aquecer e transferir. {q-tp20241-053,q-usp2026-049}
- Padrão-ouro para a posição da cânula: **radiografia de tórax**. {q-sirio2022-044}
- Piora após intubar: pensar em **DOPE** (deslocamento/**intubação seletiva**, obstrução, pneumotórax, equipamento). {q-einstein2023-044}
- **Epiglotite**: criança sentada inclinada para a frente, boca aberta, salivando; **não examinar a garganta**, manter no colo e garantir a via aérea **no centro cirúrgico**. {q-didepm-009}` },
        { id: "ava-pards", titulo: "PARDS e atelectasia", conferir: true, diretrizes: ["palicc"],
          questoes: ["q-einstein2027-044","q-usp2025-059"],
          casos: ["q-einstein2027-044","q-usp2025-059"],
          texto: `- Gravidade da **PARDS** na criança intubada: pelo **índice de oxigenação**. {q-einstein2027-044}
- Atelectasia pós-infecciosa com desconforto: **fisioterapia, VNI e higiene pulmonar**. {q-usp2025-059}` },
      ],
    },
    {
      id: "asma", titulo: "Crise de asma e sibilância",
      introducao: `[[Na crise de asma, broncoespasmo, edema e muco estreitam as vias aéreas; o ar entra mas sai com dificuldade, e a criança se cansa empurrando-o para fora.|q-sessp2022-043,q-tp20232-044]] [[O silêncio torácico é o sinal mais grave: quando o fluxo é tão baixo que nem produz sibilo, o murmúrio some e a falência está perto.|q-adap22-065,q-amrigs2022-067]]

Nem todo lactente que sibila tem asma. [[O primeiro episódio de sibilância no lactente com coriza é bronquiolite, que não responde a broncodilatador.|q-adap21-043]] [[A radiografia ajuda a separar asma de corpo estranho, malformação ou cardiopatia quando o quadro foge do habitual.|q-iamspe2025-073]]`,
      fragmentos: [
        { id: "asm-crise", titulo: "Tratamento da crise", conferir: true, diretrizes: ["gina"],
          questoes: ["q-tp20232-044","q-famema2021-081","q-sessp2022-043","q-adap22-065","q-famema2021-082","q-adap21-043","q-iamspe2025-073","q-einstein2026-033"],
          texto: `- Crise leve a moderada: **salbutamol a cada 20 minutos na 1ª hora** (spray com espaçador), oxigênio se necessário. {q-tp20232-044,q-famema2021-081}
- Crise grave: **O2 para SpO2 94 a 98%**, salbutamol + **ipratrópio** + **corticoide sistêmico**. {q-sessp2022-043}
- Sem resposta: **sulfato de magnésio IV 50 mg/kg (máx. 2 g)**, salbutamol contínuo, UTI. {q-adap22-065}
- Alta: **corticoide oral + salbutamol por 5 dias** e **corticoide inalatório** de manutenção. {q-famema2021-082}
- Lactente com 1º episódio de sibilância e coriza: **suporte, sem broncodilatador** (bronquiolite). {q-adap21-043}
- Radiografia: útil para afastar **corpo estranho** e outras causas de sibilância. {q-iamspe2025-073}
- Menor de 5 anos com sibilância frequente e atopia: **corticoide inalatório diário** + salbutamol sob demanda (GINA). {q-einstein2026-033}` },
      ],
    },
    {
      id: "pcr", titulo: "Parada cardiorrespiratória",
      introducao: `A ressuscitação pediátrica segue a ordem **C-A-B**: compressões, via aérea, respiração. [[As compressões vêm primeiro porque, sem fluxo, o oxigênio que já está no sangue não chega ao cérebro; a ventilação entra logo depois, porque na criança a causa costuma ser respiratória.|q-sessp2024-051,q-uspsp3-043]]

[[Na criança, compressões são indicadas não só sem pulso: frequência abaixo de 60 com má perfusão, apesar de boa ventilação, já é parada iminente.|q-usp2025-062]] [[Os ritmos se dividem em chocáveis (fibrilação ventricular e taquicardia ventricular sem pulso), em que o choque reorganiza a atividade elétrica, e não chocáveis (assistolia e atividade elétrica sem pulso), em que só a adrenalina e a busca da causa ajudam.|q-sessp2024-052,q-famema2023-098,q-fmabc2025-046]]`,
      fragmentos: [
        { id: "pcr-basico", casos: ["q-usp2025-062"], titulo: "Suporte básico: sequência e compressões", conferir: true, diretrizes: ["aha-rcp"],
          questoes: ["q-sessp2024-051","q-uspsp3-043","q-sirio2024-052","q-unicamp2022-037","q-sirio2023-042","q-unicamp2023-042","q-scmsp2021-050","q-unicampdis2024-028","q-usp2025-062","q-uspsp3-026"],
          texto: `- Sequência **C-A-B**. {q-sessp2024-051}
- Sozinho, PCR não presenciada: **2 minutos de RCP, depois pedir ajuda**. {q-uspsp3-043}
- Lactente: verificar consciência, chamar ajuda, respiração e **pulso braquial**. {q-sirio2024-052,q-unicamp2022-037}
- Profundidade: **1/3 do diâmetro anteroposterior**; frequência **100 a 120/min**. {q-sirio2023-042,q-unicamp2023-042}
- Com via aérea avançada: compressões **contínuas** e **1 ventilação a cada 2 a 3 s** (20 a 30/min). {q-scmsp2021-050,q-unicamp2023-042,q-unicampdis2024-028}
- FC **< 60** com má perfusão apesar da ventilação: **compressões**. {q-usp2025-062}
- DEA disponível: **usar logo**. {q-uspsp3-026}` },
        { id: "pcr-chocavel", figuras: [{ arquivo: "figuras/pcr-ritmos.svg", legenda: "Esquema autoral: os dois caminhos da parada, chocável e não chocável." }], titulo: "Ritmos chocáveis", conferir: true, diretrizes: ["aha-rcp"],
          questoes: ["q-sessp2024-052","q-famema2023-098","q-famema2025-046","q-sessp2023-035","q-sessp2025-053","q-usprp2021-043","q-famerp2025-057","q-uspsp1-003","q-sirio2026-053","q-sirio2027-054","q-sirio2021-044","q-famerp2026-043"],
          casos: ["q-usprp2021-043","q-uspsp1-003"],
          texto: `- Chocáveis: **fibrilação ventricular** e **taquicardia ventricular sem pulso**. {q-sessp2024-052,q-famema2023-098}
- QRS largo e bizarro sem pulso: **desfibrilação não sincronizada**. {q-famema2025-046,q-sirio2026-053}
- 1º choque: **2 J/kg**, seguido **imediatamente de 2 minutos de RCP**; depois **4 J/kg**. {q-sessp2023-035,q-usprp2021-043,q-famerp2025-057,q-sirio2027-054,q-uspsp1-003}
- TV no monitor: **checar pulso**; sem pulso, desfibrilar. {q-sessp2025-053}
- Adolescente com porte de adulto: carga de adulto (**120 a 200 J** bifásico). {q-sirio2021-044}
- **Amiodarona** (ou lidocaína) **após o 3º choque**; adrenalina após o 2º. {q-famerp2026-043}` },
        { id: "pcr-nao-chocavel", titulo: "Ritmos não chocáveis, drogas e vias", conferir: true, diretrizes: ["aha-rcp"],
          questoes: ["q-fmabc2025-046","q-sessp2022-046","q-unesp2026-009","q-uspsp3-027","q-simepm89-081","q-scmsp2023-054","q-unicampdis2023-034","q-amrigs2023-073"],
          casos: ["q-uspsp3-027"],
          texto: `- Assistolia e AESP: **adrenalina o quanto antes** + RCP de 2 minutos. {q-fmabc2025-046,q-sessp2022-046}
- Adrenalina: **0,01 mg/kg IV/IO a cada 3 a 5 min**; investigar causas reversíveis (5 H e 5 T). {q-unesp2026-009,q-uspsp3-027}
- Pela cânula traqueal, a adrenalina vai em **dose 10 vezes maior**. {q-simepm89-081}
- Acesso intraósseo é temporário: trocar em até **24 horas**. {q-unicampdis2023-034}
- Pós-PCR: evitar **hipertermia e hipoxemia**; vias IV e IO; adrenalina é a droga padrão. {q-amrigs2023-073}` },
      ],
    },
    {
      id: "circulacao", titulo: "Choque no trauma, pneumotórax e arritmias",
      introducao: `[[No choque hemorrágico do trauma, cristaloide em excesso dilui a coagulação e não leva oxigênio: por isso a expansão, quando possível, já é com sangue.|q-scmsp2021-049,q-iamspe2022-037]] [[No pneumotórax hipertensivo, o ar preso empurra o mediastino e dobra as veias que voltam ao coração: o choque é obstrutivo e só a punção imediata o desfaz.|q-scmsp2022-025]]

[[A taquicardia supraventricular do lactente tem frequência fixa e muito alta, acima de 220, sem variar com choro ou febre, porque é um circuito de reentrada; por isso responde a manobra vagal e a adenosina, que interrompem a condução no nó atrioventricular.|q-scmsp2026-057,q-sirio2025-056]]`,
      fragmentos: [
        { id: "cir-trauma", titulo: "Trauma: choque, pneumotórax e hipertensão intracraniana", conferir: true, diretrizes: ["aha-rcp"],
          questoes: ["q-scmsp2021-049","q-iamspe2022-037","q-scmsp2022-025","q-fmabc2023-055","q-sessp2022-049"],
          casos: ["q-scmsp2022-025"],
          texto: `- Choque hemorrágico no trauma: expandir com **concentrado de hemácias / hemoderivados** se disponíveis. {q-scmsp2021-049,q-iamspe2022-037}
- Desvio do mediastino com hipotensão: **punção imediata** do hemitórax. {q-scmsp2022-025}
- Via aérea e respiração estáveis: passar ao C, **monitorizar e corrigir a hipovolemia**. {q-fmabc2023-055}
- Tríade de Cushing (bradicardia, hipertensão, alteração respiratória): tratar a HIC; **corticoide não** tem papel no trauma craniano. {q-sessp2022-049}` },
        { id: "cir-arritmias", titulo: "Taquicardia supraventricular e crise hipoxêmica", conferir: true, diretrizes: ["aha-rcp"],
          questoes: ["q-scmsp2026-057","q-sirio2025-056","q-scmsp2021-051"],
          casos: ["q-sirio2025-056"],
          texto: `- QRS estreito, FC fixa > 220 (lactente), **sem onda P**: **taquicardia supraventricular**. {q-sirio2025-056,q-scmsp2026-057}
- Perfusão preservada: **manobra vagal** (gelo na face no lactente) e, se refratária, **adenosina IV rápida**. {q-scmsp2026-057}
- Crise hipoxêmica na tetralogia de Fallot: **oxigênio, morfina, expansão**; se não melhorar, transfusão e **betabloqueador**. {q-scmsp2021-051}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a diretriz atual. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-scmsp2023-054"],
          texto: `- Intraósseo na criança: **tíbia proximal** (também fêmur distal e úmero proximal no maior); o **esterno** é local do adulto, mas uma banca o deu como resposta. {q-scmsp2023-054}` },
      ],
    },
  ],
});
