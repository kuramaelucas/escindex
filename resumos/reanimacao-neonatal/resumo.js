/* resumos/reanimacao-neonatal/resumo.js — resumo adaptativo de reanimação neonatal em sala de parto
   (Programa de Reanimação Neonatal da SBP): transição ao nascer, clampeamento do cordão, passos
   iniciais, ventilação com pressão positiva, via aérea avançada, massagem cardíaca e medicações.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- reanimacao-neonatal */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "reanimacao-neonatal",
  titulo: "Reanimação neonatal",
  assunto: "ass-reanimacao",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "sbp-prn", texto: "Sociedade Brasileira de Pediatria — Programa de Reanimação Neonatal: diretrizes para RN ≥ 34 semanas e < 34 semanas (2022)", lidoEm: null },
    { id: "ilcor-neonatal", texto: "ILCOR / AHA — Neonatal Life Support (consenso de ciência e recomendações de tratamento)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada: sem gabarito para medir o erro", questoes: ["q-fmabc2026-055"] },
  ],
  doencas: [
    {
      id: "transicao", titulo: "O nascimento e a primeira avaliação",
      introducao: `No útero, o pulmão está cheio de líquido e quase não recebe sangue: a resistência vascular pulmonar é alta e o sangue desvia pelo forame oval e pelo canal arterial. [[Ao nascer, as primeiras respirações e o choro expandem os alvéolos, ajudam a reabsorver o líquido pulmonar e, com a entrada de oxigênio, fazem a resistência vascular pulmonar cair, levando sangue ao pulmão.|q-unifesp2022-074]]

[[Por isso a ventilação é o centro da reanimação neonatal: quase todo recém-nascido que precisa de ajuda precisa só de ar nos pulmões, e a frequência cardíaca sobe quando os alvéolos se abrem.|q-014,q-adap22-074,q-usp2022-054]] [[A avaliação ao nascer faz três perguntas — a gestação é a termo? respira ou chora? tem tônus em flexão? — e uma resposta negativa já leva o bebê ao berço aquecido.|q-usprp2022-085,q-usprp2023-018,q-iamspe2022-034]]

Veja também: **Desconforto respiratório do recém-nascido** e **Prematuridade**.`,
      fragmentos: [
        { id: "tra-avaliar", titulo: "Avaliação, Apgar e temperatura", conferir: true, diretrizes: ["sbp-prn"],
          figuras: [{ arquivo: "figuras/fluxo-prn.svg", legenda: "Esquema autoral: a sequência da reanimação em sala de parto." }],
          questoes: ["q-unifesp2022-074","q-usprp2022-085","q-usprp2023-018","q-iamspe2025-079","q-unesp2022-002","q-didepm-079"],
          prosa: `Ao nascer, o pulmão troca líquido por ar e a circulação fetal se desfaz: o choro abre os alvéolos e a resistência pulmonar cai. O bebê que não faz essa transição sozinho é reconhecido em segundos por três perguntas: termo, respira ou chora, tem bom tônus. O Apgar descreve o bebê depois, mas não guia a reanimação.`,
          texto: `- O choro **reabsorve o líquido pulmonar** e **reduz a resistência vascular pulmonar**. {q-unifesp2022-074}
- **Hipotonia** (ou apneia, respiração irregular) leva o RN **ao berço de reanimação**. {q-usprp2022-085}
- RN vigoroso no colo da mãe: seguir **avaliando FC, tônus e respiração**. {q-usprp2023-018}
- **Apgar**: frequência cardíaca, respiração, cor, tônus e reflexo (não decide a reanimação). {q-iamspe2025-079}
- Temperatura do RN **36,5 a 37,5 °C**; sala de parto **23 a 26 °C**. {q-unesp2022-002}
- Prematuro **< 34 semanas**: **saco plástico sem secar**, touca e calor radiante. {q-didepm-079}` },
      ],
    },
    {
      id: "cordao", titulo: "Clampeamento do cordão",
      introducao: `[[Esperar para clampear o cordão deixa passar ao bebê o sangue da placenta: aumenta a hemoglobina e as reservas de ferro e, no prematuro, ajuda a estabilidade circulatória.|q-unesp2026-004,q-famerp2026-037]] [[Mas o tempo de espera só vale para quem nasce bem: o bebê que não respira ou está hipotônico precisa de ventilação, e o clampeamento é imediato.|q-iamspe2022-034,q-unesp2022-001,q-tp20251-038]] [[O mecônio no líquido amniótico não muda a conduta do bebê vigoroso.|q-famema2023-083,q-sessp2022-044,q-einstein2023-038]]`,
      fragmentos: [
        { id: "cor-quando", titulo: "Quando esperar e quando clampear já", conferir: true, diretrizes: ["sbp-prn"],
          questoes: ["q-amrigs2024-061","q-unesp2026-004","q-famerp2026-037","q-famema2023-083","q-sessp2022-044","q-einstein2023-038","q-sirio2027-056","q-iamspe2022-034","q-unesp2022-001","q-tp20251-038","q-scmsp2025-041","q-famerp2024-049","q-unesp2021-001","q-einstein2024-044"],
          prosa: `O clampeamento tardio deixa passar sangue da placenta, o que aumenta o ferro e a estabilidade circulatória; mas só vale se o bebê respira. Se não respira, o prioritário é ventilar, e o cordão é clampeado já.`,
          texto: `- RN ≥ 34 semanas com boa vitalidade: **clampear após 60 segundos**, pele a pele, amamentar na 1ª hora. {q-amrigs2024-061,q-unesp2026-004,q-famerp2026-037}
- **Mecônio** com bebê vigoroso: mesma conduta (clampeamento tardio, junto à mãe). {q-famema2023-083,q-sessp2022-044,q-einstein2023-038}
- Prematuro < 34 semanas que nasce bem: clampear em **30 a 60 segundos**. {q-sirio2027-056}
- Não respira ou hipotônico: **estímulo tátil no dorso até 2 vezes**; sem melhora, **clampeamento imediato** e berço aquecido. {q-tp20251-038,q-scmsp2025-041,q-famerp2024-049,q-iamspe2022-034,q-unesp2022-001}
- Circulação placentária comprometida (descolamento, sangramento): **clampeamento imediato**. {q-unesp2021-001}
- Respiração irregular e flácido: clampear já e levar à mesa; aspirar só se a via aérea estiver obstruída. {q-einstein2024-044}` },
      ],
    },
    {
      id: "vpp", titulo: "Passos iniciais e ventilação",
      introducao: `[[Os passos iniciais preparam a via aérea: calor, cabeça em leve extensão do pescoço, aspiração apenas se houver secreção obstruindo, e secar; tudo em cerca de 30 segundos.|q-adap21-033,q-famerp2025-051,q-sirio2022-045,q-uspsp1-015]]

[[Se depois deles o bebê está em apneia, respira irregularmente ou tem FC abaixo de 100, inicia-se a ventilação com pressão positiva com máscara ainda no primeiro minuto de vida, com oxímetro no pulso direito.|q-014,q-adap22-074,q-usp2022-054,q-fmabc2025-057]] [[O oxigênio em excesso lesa: o RN a termo começa em ar ambiente (21%), e o prematuro abaixo de 34 semanas em 30%, ajustando pela saturação alvo de cada minuto.|q-unicampdis2024-031,q-famema2025-035,q-unesp2026-003]] [[Quando a FC não sobe, o problema quase sempre é a ventilação: primeiro corrige-se a técnica (escape da máscara, posição, secreção), e só depois se pensa em via aérea avançada.|q-einstein2025-039,q-unifesp2025-089,q-uspsp4-100]]`,
      fragmentos: [
        { id: "vpp-passos", titulo: "Passos iniciais", conferir: true, diretrizes: ["sbp-prn"],
          questoes: ["q-adap21-033","q-famerp2025-051","q-sirio2022-045","q-uspsp1-015"],
          prosa: `Os passos iniciais existem para evitar o que piora a transição: o frio (que aumenta o consumo de oxigênio) e a via aérea mal posicionada. Duram segundos: se o bebê não respira depois deles, ventila-se ainda no primeiro minuto.`,
          texto: `- **Calor radiante, secar e retirar campos úmidos, cabeça em leve extensão, aspirar boca e narinas só se necessário**. {q-famerp2025-051,q-sirio2022-045}
- Depois de aquecer: **secar e estimular**. {q-uspsp1-015}
- Persistindo a apneia: **VPP com máscara ainda no 1º minuto**. {q-adap21-033}` },
        { id: "vpp-indicacao", titulo: "Ventilação com pressão positiva", conferir: true, diretrizes: ["sbp-prn"],
          questoes: ["q-014","q-adap22-074","q-usp2022-054","q-unesp2023-002","q-famema2022-081","q-tp20261-066","q-unesp2026-003","q-unicamp2023-046","q-sirio2024-056","q-sirio2025-054","q-sirio2026-057","q-fmabc2025-057","q-fmabc2024-048","q-unicampdis2024-031","q-famema2025-035","q-unicampdis2022-025","q-usp2024-012","q-unesp2025-001"],
          casos: ["q-usp2024-012"],
          prosa: `A parada do recém-nascido é quase sempre respiratória: a frequência cardíaca cai porque falta oxigênio. Por isso a **ventilação** é a intervenção que salva, e a frequência cardíaca é o melhor sinal de que ela está funcionando. Começa-se com ar ambiente no bebê de 34 semanas ou mais, porque o excesso de oxigênio também lesa.`,
          texto: `- Apneia, respiração irregular ou **FC < 100**: **VPP com máscara**, guiada por oxímetro. {q-014,q-usp2022-054,q-famema2022-081,q-tp20261-066,q-sirio2024-056,q-unesp2023-002,q-usp2024-012}
- FC inaudível ou 50 a 60 após os passos iniciais: **também VPP primeiro**, não massagem. {q-sirio2025-054,q-unicampdis2022-025,q-unesp2026-003,q-unicamp2023-046}
- RN ≥ 34 semanas: **ar ambiente (21%)**, ainda no **1º minuto**. {q-adap22-074,q-sirio2026-057,q-fmabc2025-057,q-fmabc2024-048}
- Prematuro < 34 semanas: **FiO2 inicial de 30%**. {q-unicampdis2024-031,q-famema2025-035}
- Prematuro com desconforto, respirando e FC > 100: **CPAP**. {q-unesp2025-001}` },
        { id: "vpp-avancada", titulo: "Sem resposta: técnica e via aérea avançada", conferir: true, diretrizes: ["sbp-prn"],
          questoes: ["q-einstein2025-039","q-unifesp2025-089","q-uspsp4-100","q-usp2026-072"],
          casos: ["q-usp2026-072"],
          prosa: `Quando a frequência não sobe, a falha quase sempre é da técnica (escape na máscara, cabeça mal posicionada, secreção, pressão baixa), e não do bebê; por isso se corrige a técnica antes de partir para intubação ou máscara laríngea.`,
          texto: `- FC não sobe após 30 s de VPP: **corrigir escape e posição** e repetir. {q-einstein2025-039}
- Técnica corrigida e O2 aumentado sem melhora: **intubar** (ou **máscara laríngea**). {q-unifesp2025-089,q-uspsp4-100}
- Material: **máscara laríngea**, **laringoscópio de lâmina reta** e **cânula sem balonete**. {q-usp2026-072}` },
      ],
    },
    {
      id: "massagem", titulo: "Massagem cardíaca e medicações",
      introducao: `[[A massagem só começa quando a FC continua abaixo de 60 depois de 30 segundos de ventilação efetiva, porque sem pulmão aberto a compressão leva ao coração sangue sem oxigênio.|q-uspsp2-065,q-uspsp5-106,q-adap25-089]] Nesse momento o bebê é intubado, o oxigênio vai a 100% e as compressões se coordenam com as ventilações.

[[Se mesmo assim a FC não passa de 60 após 60 segundos de compressões e ventilação eficazes, entra a adrenalina, de preferência pela veia umbilical.|q-didepm-004,q-sirio2026-058]]`,
      fragmentos: [
        { id: "mas-tecnica", titulo: "Massagem: quando e como", conferir: true, diretrizes: ["sbp-prn"],
          questoes: ["q-uspsp2-065","q-uspsp5-106","q-adap25-089","q-usprp2021-033","q-scmsp2022-028","q-usp2025-071","q-unicampdis2024-088","q-unesp2021-002"],
          prosa: `A massagem só entra depois de ventilação eficaz, porque um coração hipóxico não responde à compressão. A relação 3:1 mantém a ventilação, que continua sendo o principal tratamento.`,
          texto: `- **FC < 60 após 30 s de VPP eficaz**: **intubar, FiO2 100% e massagem**. {q-uspsp5-106,q-adap25-089,q-usprp2021-033}
- Relação **3 compressões : 1 ventilação** (90 compressões e 30 ventilações por minuto). {q-scmsp2022-028,q-usp2025-071,q-unicampdis2024-088}
- Massagem **intercalada com ventilação pela cânula, com O2 a 100%**. {q-unesp2021-002}
- Reavaliar após **60 segundos**; revisar a técnica de ventilação. {q-uspsp2-065,q-usprp2021-033}` },
        { id: "mas-drogas", titulo: "Adrenalina e via de acesso", conferir: true, diretrizes: ["sbp-prn","ilcor-neonatal"],
          questoes: ["q-didepm-004","q-sirio2026-058","q-amrigs2021-073"],
          prosa: `A adrenalina aumenta a pressão diastólica da aorta e, com ela, o fluxo nas coronárias; só funciona se a ventilação e a massagem já estão adequadas. A veia umbilical é o acesso mais rápido no recém-nascido.`,
          texto: `- FC < 60 após 60 s de massagem e ventilação eficazes: **adrenalina 1:10.000 na veia umbilical**, seguida de flush de soro. {q-didepm-004}
- Via preferencial para adrenalina e expansor: **veia umbilical**. {q-sirio2026-058}
- Enquanto não há acesso venoso: adrenalina **endotraqueal em dose maior (0,05 a 0,1 mg/kg)**. {q-amrigs2021-073}` },
      ],
    },
  ],
});
