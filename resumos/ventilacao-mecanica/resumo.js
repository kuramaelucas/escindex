/* resumos/ventilacao-mecanica/resumo.js — resumo adaptativo de ventilação mecânica (ass-vm):
   indicações e VNI, modos (VCV, PCV, PSV) e ciclagem, ajuste inicial (6 mL/kg do peso predito),
   oxigenação × ventilação, SDRA (Berlim/2023, protetora, platô, driving pressure, PEEP, prona), doença
   obstrutiva (auto-PEEP, hiperinsuflação), curvas e capnografia, assincronia, desmame e TRE,
   pediatria; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- ventilacao-mecanica */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "ventilacao-mecanica",
  titulo: "Ventilação mecânica",
  assunto: "ass-vm",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "amib-vm", texto: "AMIB/SBPT — Diretrizes Brasileiras de Ventilação Mecânica (2013)", lidoEm: null },
    { id: "sdra-2023", texto: "ARDS Definition Task Force — Berlin definition (JAMA 2012) e nova definição global (Am J Respir Crit Care Med 2024); ATS/ESICM/SCCM 2017 e ESICM 2023 (ventilação na SDRA)", lidoEm: null },
    { id: "desmame", texto: "ACCP/ATS — Liberation from mechanical ventilation in critically ill adults (2017)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "fundamentos", titulo: "Quando e como ventilar",
      introducao: `[[O ventilador faz duas coisas que se ajustam separadamente: **ventilar** (tirar CO2) depende do **volume-minuto** = volume corrente × frequência; **oxigenar** depende da **FiO2** e da **PEEP** (que mantém alvéolos abertos e aumenta a pressão média). Por isso CO2 alto se corrige com frequência ou volume, e PaO2 baixa com FiO2 ou PEEP.|q-unicamp2023-016,q-einstein2021-002,q-usprp2024-024]]

Veja também: **DPOC**, **Asma**, **Sepse e choque**, **Pneumonia** e **Distúrbios ácido-base** quando houver resumo.`,
      fragmentos: [
        { id: "fun-indicacao", titulo: "Indicação, VNI e modos", conferir: true, diretrizes: ["amib-vm"],
          figuras: [{ arquivo: "figuras/pressao-via-aerea.svg", legenda: "Esquema autoral: pressão de pico, platô e PEEP numa respiração controlada a volume, e o que cada diferença mede." }],
          casos: ["q-scmsp2023-015","q-usp2023-104","q-usprp2026-010"],
          questoes: ["q-unicampdis2024-007","q-uspsp3-078","q-scmsp2023-015","q-usp2023-104","q-unesp2026-047","q-usprp2026-010","q-unicamp2023-016","q-einstein2021-002","q-usprp2024-024"],
          prosa: `[[Confusão, taquipneia, hipoxemia e **respiração paradoxal** (abdome sobe na inspiração, diafragma fadigado): **intubar** — VNI não serve com rebaixamento de consciência. A VNI em dois níveis é para a exacerbação de DPOC com acidose respiratória (IPAP ventila, EPAP compensa a auto-PEEP).|q-unicampdis2024-007,q-uspsp3-078]] [[**VCV**: o volume é garantido e a pressão varia; ciclado a volume, com fluxo programado (o fluxo quadrado facilita calcular resistência). **PCV**: a pressão é garantida e o volume varia com a mecânica; **ciclado a tempo**. PSV: o paciente cicla por queda do fluxo.|q-scmsp2023-015,q-usp2023-104,q-unesp2026-047,q-usprp2026-010]] [[PaCO2 alta com acidose: aumentar a **frequência** (ou volume); PaO2 baixa: subir **PEEP** ou FiO2.|q-unicamp2023-016,q-einstein2021-002,q-usprp2024-024]]`,
          texto: `- Paradoxal + confusão: **intubar**; VNI na DPOC hipercápnica. {q-unicampdis2024-007,q-uspsp3-078}
- VCV garante volume; **PCV garante pressão, cicla a tempo**. {q-scmsp2023-015,q-usp2023-104,q-unesp2026-047,q-usprp2026-010}
- CO2: **frequência/volume**; O2: **PEEP/FiO2**. {q-unicamp2023-016,q-einstein2021-002,q-usprp2024-024}` },
        { id: "fun-ajuste", titulo: "Ajuste inicial", conferir: true, diretrizes: ["amib-vm"],
          casos: ["q-usp2024-067","q-famema2023-038"],
          questoes: ["q-adap24-026","q-unifesp2024-039","q-unifesp2026-027","q-unicampdis2023-007","q-scmsp2021-010","q-usp2024-067","q-famema2023-038"],
          prosa: `[[Ajuste inicial: modo controlado, **volume corrente 6 (até 8) mL/kg do peso predito pela altura** — não pelo peso real —, PEEP 5 (mais se hipoxêmico), FiO2 100% e depois reduzir, FR para o volume-minuto necessário (12–20; maior se acidose), I:E 1:2. Homem de 1,70 m ≈ 70 kg preditos → 420 mL; 80 kg preditos → 480 mL. Volume de 10–12 mL/kg é lesivo.|q-adap24-026,q-unifesp2024-039,q-unifesp2026-027,q-unicampdis2023-007,q-scmsp2021-010]] [[A **capnografia** confirma o tubo na traqueia (onda quadrada repetida); a curva em barbatana de tubarão (subida lenta) indica **broncoconstrição**.|q-usp2024-067,q-famema2023-038]]`,
          texto: `- **6 mL/kg do peso predito**, PEEP 5, FiO2 100%, I:E 1:2. {q-adap24-026,q-unifesp2024-039,q-unifesp2026-027,q-unicampdis2023-007,q-scmsp2021-010}
- Capnografia: tubo; **barbatana** = broncoespasmo. {q-usp2024-067,q-famema2023-038}` },
      ],
    },
    {
      id: "sdra", titulo: "SDRA",
      introducao: `[[Na SDRA, a inflamação enche alvéolos de líquido e o pulmão "útil" fica pequeno (baby lung): o mesmo volume que seria normal **hiperdistende** o que sobrou. Por isso a ventilação **protetora** limita volume e pressão e aceita CO2 mais alto.|q-amrigs2021-003,q-unicampdis2025-013,q-fmabc2026-001]]`,
      fragmentos: [
        { id: "sdra-protetora", titulo: "Diagnóstico e ventilação protetora", conferir: true, diretrizes: ["sdra-2023"],
          casos: ["q-einstein2026-036"],
          questoes: ["q-amrigs2021-003","q-unicampdis2025-013","q-fmabc2026-001","q-unicamp2023-030","q-udisc20262-003","q-unicampdis2025-010","q-uspsp4-016","q-sessp2026-010","q-sirio2027-013","q-einstein2022-039","q-einstein2026-036"],
          prosa: `[[SDRA: início em até 1 semana, **opacidades bilaterais** (radiografia, tomografia ou ultrassonografia na definição nova) não explicadas por cardiogênico, e **PaO2/FiO2 ≤ 300** com PEEP ≥ 5 — leve 201–300, moderada 101–200, **grave ≤ 100**.|q-amrigs2021-003,q-unicampdis2025-013,q-fmabc2026-001,q-unicamp2023-030]] [[Protetora: **6 mL/kg do peso predito**, **platô ≤ 30**, **driving pressure (platô − PEEP) < 15**, PEEP pela tabela ou titulada, **hipercapnia permissiva** (pH ≥ 7,20–7,25). Com parâmetros já protetores e acidose aceitável, **manter**.|q-udisc20262-003,q-unicampdis2025-010,q-einstein2026-036]] [[Na moderada a grave refratária: **posição prona** por mais de 12–16 horas por dia (sedado, com ou sem bloqueador). PEEP alta pode comprimir o retorno venoso e **reduzir o débito cardíaco** (PA cai): reduzir a PEEP e pronar. Em PCV, alongar o tempo inspiratório aumenta a pressão média e a oxigenação, vigiando auto-PEEP.|q-amrigs2021-003,q-uspsp4-016,q-sessp2026-010,q-sirio2027-013,q-einstein2022-039]]`,
          texto: `- **P/F ≤ 300**, bilateral; grave ≤ 100. {q-amrigs2021-003,q-unicampdis2025-013,q-fmabc2026-001,q-unicamp2023-030}
- **6 mL/kg, platô ≤ 30, driving < 15**, hipercapnia permissiva. {q-udisc20262-003,q-unicampdis2025-010,q-einstein2026-036}
- **Prona**; PEEP alta derruba o débito. {q-uspsp4-016,q-sessp2026-010,q-sirio2027-013,q-einstein2022-039}` },
      ],
    },
    {
      id: "obstrutivos", titulo: "Doença obstrutiva, curvas e desmame",
      introducao: `[[Na asma e na DPOC, o ar demora a sair: se a próxima respiração começa antes de o fluxo expiratório zerar, o ar se acumula (**auto-PEEP**, **hiperinsuflação dinâmica**), a pressão sobe e o retorno venoso cai. A solução é dar **tempo para expirar**.|q-uspsp3-092,q-uspsp3-094,q-einstein2027-016]]`,
      fragmentos: [
        { id: "obs-curvas", titulo: "Auto-PEEP, assincronia e asma", conferir: true, diretrizes: ["amib-vm"],
          casos: ["q-uspsp3-092","q-uspsp3-094","q-uspsp3-082"],
          questoes: ["q-uspsp3-092","q-uspsp3-094","q-einstein2027-016","q-usprp2027-048","q-uspsp3-082"],
          prosa: `[[Fluxo expiratório que **não volta a zero** na curva: **hiperinsuflação dinâmica**; a **pausa expiratória** mede a PEEP intrínseca. Ajuste: **reduzir a frequência**, **aumentar o fluxo inspiratório** (inspiração mais curta, expiração mais longa) e I:E 1:3 ou mais.|q-uspsp3-092,q-uspsp3-094,q-einstein2027-016]] [[Na criança asmática intubada: PEEP baixa, pressão moderada, FR baixa e **I:E 1:3**.|q-usprp2027-048]] [[Paciente inquieto com curva de pressão "côncava" em VCV: **fome de fluxo** — aumentar o fluxo ou passar para PCV, em que o paciente pega o fluxo que precisa; a prova aceitou diminuir o fluxo ou mudar o modo.|q-uspsp3-082]]`,
          texto: `- Fluxo não zera: **auto-PEEP**; ↓ FR, ↑ fluxo, I:E 1:3. {q-uspsp3-092,q-uspsp3-094,q-einstein2027-016,q-usprp2027-048}
- Assincronia de fluxo: ajustar fluxo ou **PCV**. {q-uspsp3-082}` },
        { id: "obs-desmame", titulo: "Desmame", conferir: true, diretrizes: ["desmame"],
          questoes: ["q-adap26-027","q-famema2025-098","q-fmabc2021-036"],
          prosa: `[[Causa resolvida, tosse e drive presentes, **estabilidade hemodinâmica sem vasopressor** (ou dose mínima), PaO2/FiO2 > 150–200 com PEEP ≤ 8 e FiO2 ≤ 0,4: fazer o **teste de respiração espontânea** (30–120 minutos em PSV baixa ou tubo T) e **extubar** se tolerar.|q-adap26-027,q-famema2025-098,q-fmabc2021-036]]`,
          texto: `- Causa resolvida, estável, PEEP ≤ 8: **TRE 30–120 min → extubar**. {q-adap26-027,q-famema2025-098,q-fmabc2021-036}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["sdra-2023","amib-vm"],
          questoes: ["q-unicamp2023-030","q-uspsp3-078","q-uspsp3-082","q-fmabc2026-001"],
          prosa: `[[**SRAG × SDRA**: P/F < 300 é critério da **SDRA**; a unicamp2023-030 chamou de "síndrome respiratória aguda grave".|q-unicamp2023-030]] [[**IPAP baixa na DPOC**: costuma-se começar com IPAP 12–15; a uspsp3-078 escolheu **IPAP 10 / EPAP 5**.|q-uspsp3-078]] [[**Fome de fluxo**: o lógico é aumentar o fluxo; a uspsp3-082 deu como resposta **diminuir o fluxo ou mudar para PCV**.|q-uspsp3-082]] [[**Imagem na SDRA**: a definição nova aceita **ultrassonografia**; a fmabc2026-001 marcou como critério aceitar **exclusivamente** radiografia ou tomografia.|q-fmabc2026-001]]`,
          texto: `- P/F < 300 chamado de **SRAG**. {q-unicamp2023-030}
- **IPAP 10**. {q-uspsp3-078}
- **Diminuir o fluxo** ou PCV. {q-uspsp3-082}
- Só RX ou TC. {q-fmabc2026-001}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: problema e ajuste",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-ajustes", titulo: "O que mexer", conferir: true,
          questoes: ["q-unicamp2023-016","q-einstein2021-002","q-udisc20262-003","q-einstein2027-016","q-uspsp4-016"],
          prosa: `[[Cada problema tem um botão.|q-unicamp2023-016,q-einstein2021-002,q-udisc20262-003,q-einstein2027-016,q-uspsp4-016]]

| Problema | Ajuste | Cuidado |
| PaCO2 alta | ↑ frequência ou volume | auto-PEEP na obstrução |
| PaO2 baixa | ↑ PEEP ou FiO2 | PEEP alta reduz débito |
| Platô > 30 ou driving ≥ 15 | ↓ volume corrente | tolerar CO2 |
| Fluxo expiratório não zera | ↓ FR, ↑ fluxo, I:E 1:3 | hipotensão por hiperinsuflação |
| Hipoxemia refratária na SDRA | prona, bloqueio | ECMO em centros |`,
          texto: `- CO2: **frequência**. {q-unicamp2023-016,q-einstein2021-002}
- Platô: **↓ volume**. {q-udisc20262-003}
- Auto-PEEP: **↓ FR**. {q-einstein2027-016}
- Refratária: **prona**. {q-uspsp4-016}` },
      ],
    },
  ],
});
