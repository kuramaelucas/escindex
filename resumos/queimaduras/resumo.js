/* resumos/queimaduras/resumo.js — resumo adaptativo de queimaduras (ass-queimaduras): profundidade,
   extensão (regra dos nove, Lund-Browder), primeiro atendimento, via aérea e inalação, reposição
   volêmica (Parkland, ATLS 2 mL, ABA 2024, criança) e diurese, escarotomia e síndrome compartimental,
   queimadura elétrica e rabdomiólise, química, curativos; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- queimaduras */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "queimaduras",
  titulo: "Queimaduras",
  assunto: "ass-queimaduras",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "atls", texto: "American College of Surgeons — ATLS, 10.ª (2018) e 11.ª (2025) edições, capítulo de lesões térmicas", lidoEm: null },
    { id: "aba-2024", texto: "American Burn Association — Clinical Practice Guideline on Burn Shock Resuscitation (J Burn Care Res 2024)", lidoEm: null },
    { id: "ms-queimados", texto: "Ministério da Saúde — Cartilha para tratamento de emergência das queimaduras (2012) e Sociedade Brasileira de Queimaduras", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas, sem reposição", questoes: ["q-scmsp2022-013","q-unicamp2023-027"] },
    { motivo: "Anulada; entra a reposição q-sessp2023-009-ia", questoes: ["q-sessp2023-009"] },
  ],
  doencas: [
    {
      id: "avaliacao", titulo: "Profundidade e extensão",
      introducao: `[[O calor coagula proteína: no centro da lesão há necrose irreversível; em volta, uma zona de estase que pode morrer ou se recuperar conforme a perfusão; na periferia, hiperemia. O que se faz nas primeiras horas (resfriar, hidratar, não comprimir) decide o destino da zona de estase. Acima de cerca de 20% da superfície, a inflamação abre os capilares do corpo todo e o plasma sai para o interstício: o **choque do queimado** é hipovolêmico e distributivo.|q-fmabc2024-034,q-fmabc2026-029,q-sessp2025-035]]

Veja também: **Atendimento inicial ao trauma**, **Via aérea**, **Rabdomiólise e lesão renal aguda**, **Choque** e **Intoxicação por monóxido de carbono** quando houver resumo.`,
      fragmentos: [
        { id: "ava-profundidade", titulo: "Graus e espessura", conferir: true, diretrizes: ["atls"],
          casos: ["q-tp20252-059"],
          questoes: ["q-fmabc2024-034","q-fmabc2026-029","q-usprp2024-025","q-iamspe2026-032","q-tp20232-073","q-tp20261-060","q-tp20241-072","q-tp20252-059"],
          prosa: `[[**Primeiro grau** (epiderme): eritema doloroso, sem bolha — insolação; não entra no cálculo de hidratação e se trata com analgesia, hidratação oral e umectante, mesmo extenso.|q-tp20232-073,q-tp20261-060,q-tp20241-072]] [[**Segundo grau (espessura parcial)**: bolhas, fundo rosado e úmido, muita dor — o superficial cicatriza em 2–3 semanas; o profundo, mais pálido, pode precisar de enxerto. **Terceiro grau (espessura total)**: leito seco, branco ou marrom, **sem dor** e sem enchimento capilar, pode alcançar músculo e osso; não cicatriza sozinho.|q-fmabc2024-034,q-fmabc2026-029,q-usprp2024-025,q-iamspe2026-032,q-tp20252-059]]`,
          texto: `- 1.º grau: eritema, **sem bolha** → oral e analgesia. {q-tp20232-073,q-tp20261-060,q-tp20241-072}
- 2.º: **bolhas, dor**; 3.º: **seco, sem dor**. {q-fmabc2024-034,q-fmabc2026-029,q-usprp2024-025,q-iamspe2026-032,q-tp20252-059}` },
        { id: "ava-extensao", titulo: "Regra dos nove", conferir: true, diretrizes: ["atls"],
          figuras: [{ arquivo: "figuras/regra-dos-nove.svg", legenda: "Esquema autoral: a regra dos nove no adulto e as diferenças da criança." }],
          questoes: ["q-tp20202-075","q-amrigs2021-033","q-scmsp2023-029"],
          prosa: `[[No adulto: cabeça 9%, cada membro superior 9%, tronco anterior 18%, posterior 18%, cada membro inferior 18%, períneo 1%. Metade do tronco anterior (9%) com um membro inferior (18%) = **27%**; tronco inteiro e um braço = **45%** (só o tronco anterior e o braço, 27%). Na criança a cabeça é maior (até 18%) e as pernas menores; a palma da mão do paciente vale cerca de 1%.|q-tp20202-075,q-amrigs2021-033]] [[Só **segundo e terceiro graus** entram na conta da reposição.|q-scmsp2023-029]]`,
          texto: `- Regra dos nove: tronco 18+18, MMII 18, MMSS e cabeça 9. {q-tp20202-075,q-amrigs2021-033}
- Só **2.º e 3.º** entram no cálculo. {q-scmsp2023-029}` },
      ],
    },
    {
      id: "atendimento", titulo: "Atendimento inicial e reposição",
      introducao: `[[O queimado é um traumatizado: ABCDE, parar a queimadura, via aérea primeiro, depois volume. Calor e fumaça lesam a via aérea acima da glote, que incha em horas; o edema fecha a laringe antes de o paciente parecer grave.|q-unesp2022-067,q-uspsp5-072,q-einstein2026-025]]`,
      fragmentos: [
        { id: "ate-via", titulo: "Primeiros minutos e via aérea", conferir: true, diretrizes: ["atls","ms-queimados"],
          casos: ["q-usprp2021-085"],
          questoes: ["q-adap24-059","q-unifesp2024-004","q-sessp2024-021","q-unesp2022-067","q-uspsp5-072","q-einstein2026-025","q-usprp2021-085","q-usprp2022-024","q-famerp2024-024"],
          prosa: `[[Parar o processo: retirar roupas e adornos e **resfriar com água corrente em temperatura ambiente por cerca de 20 minutos**, mantendo o paciente aquecido; nada de gelo. Piche: irrigar e cobrir; não arrancar.|q-adap24-059,q-unifesp2024-004,q-sessp2024-021]] [[Sinais de **lesão inalatória**: incêndio em ambiente fechado, **rouquidão**, estridor, escarro com fuligem, **vibrissas e cílios queimados**, queimadura de face e pescoço. Com eles, **intubar cedo** e dar **O2 a 100%** (que também desloca o monóxido de carbono).|q-uspsp5-072,q-einstein2026-025,q-usprp2021-085]] [[Depois: acesso venoso, sonda vesical para medir diurese, avaliação da profundidade, **analgesia com opioide**, profilaxia do **tétano**.|q-unesp2022-067,q-usprp2022-024,q-famerp2024-024]]`,
          texto: `- **Água corrente ~20 min**, tirar adornos. {q-adap24-059,q-unifesp2024-004,q-sessp2024-021}
- Rouquidão, vibrissas: **intubar** e O2 100%. {q-uspsp5-072,q-einstein2026-025,q-usprp2021-085}
- Sonda vesical, opioide, **tétano**. {q-unesp2022-067,q-usprp2022-024,q-famerp2024-024}` },
        { id: "ate-volume", titulo: "Quanto de cristaloide", conferir: true, diretrizes: ["atls","aba-2024"],
          questoes: ["q-adap23-089","q-tp20222-076","q-amrigs2021-033","q-fmabc2022-040","q-fmabc2021-016","q-usprp2023-094","q-iamspe2026-032","q-sessp2023-009-ia","q-usprp2026-012","q-unicampdis2022-023","q-famema2025-036","q-einstein2027-025"],
          prosa: `[[A conta usa **peso × % de SCQ (2.º e 3.º graus)**. **Parkland**: 4 mL × kg × %, metade nas **primeiras 8 horas contadas da queimadura** e metade nas 16 seguintes. **ATLS 10 e ABA 2024**: começar com **2 mL × kg × %** (4 mL no elétrico, na criança 3 mL e soro com glicose de manutenção), também metade em 8 horas, descontando o que já foi infundido e o tempo que já passou.|q-adap23-089,q-tp20222-076,q-amrigs2021-033,q-fmabc2022-040,q-fmabc2021-016,q-usprp2023-094,q-iamspe2026-032,q-sessp2023-009-ia,q-famema2025-036]] [[A fórmula é só o ponto de partida: quem manda é a **diurese** — **0,5 mL/kg/h** no adulto (cerca de 30–50 mL/h), 1 mL/kg/h na criança pequena. Diurese baixa: **aumentar gradualmente** a infusão; diurese alta: reduzir, porque o excesso de volume (fluid creep) causa síndrome compartimental e edema pulmonar.|q-usprp2026-012,q-unicampdis2022-023,q-einstein2027-025]]`,
          texto: `- **2 mL** (ATLS/ABA) ou **4 mL** (Parkland) × kg × %; **metade em 8 h** da queimadura. {q-adap23-089,q-tp20222-076,q-fmabc2022-040,q-fmabc2021-016,q-usprp2023-094,q-sessp2023-009-ia,q-famema2025-036}
- Ajuste pela **diurese 0,5 mL/kg/h**. {q-usprp2026-012,q-unicampdis2022-023,q-einstein2027-025}` },
      ],
    },
    {
      id: "complicacoes", titulo: "Escarotomia, elétrica e cuidado da ferida",
      introducao: `[[A pele de espessura total vira uma casca rígida (escara) que não estica; quando o edema cresce por baixo dela em volta de um membro ou do tórax, a pressão sobe como num compartimento fechado.|q-sessp2025-035,q-uspsp4-072,q-didepm-032]]`,
      fragmentos: [
        { id: "com-escarotomia", titulo: "Escarotomia e queimadura elétrica", conferir: true, diretrizes: ["atls"],
          questoes: ["q-sessp2025-035","q-uspsp4-072","q-didepm-032","q-adap21-085"],
          prosa: `[[Queimadura **circunferencial** de membro com pé ou mão fria, enchimento lento, pulso fraco e parestesia, ou de tórax que impede a ventilação: **escarotomia** imediata, incisões longitudinais (mediais e laterais) pela escara.|q-sessp2025-035,q-uspsp4-072,q-didepm-032]] [[A corrente elétrica destrói músculo por dentro com pele quase intacta: **rabdomiólise** (urina escura, CPK alta), arritmia e síndrome compartimental. Hidratar para **diurese de 1–1,5 mL/kg/h** até a urina clarear, monitorizar o coração e vigiar compartimentos.|q-adap21-085]]`,
          texto: `- Circunferencial com isquemia: **escarotomia**. {q-sessp2025-035,q-uspsp4-072,q-didepm-032}
- Elétrica: rabdomiólise, **diurese 1–1,5 mL/kg/h**, monitor. {q-adap21-085}` },
        { id: "com-ferida", titulo: "Curativo, internação e enxerto", conferir: true, diretrizes: ["ms-queimados"],
          questoes: ["q-tp20212-076","q-tp20252-059","q-usp2023-014","q-unesp2025-073","q-unifesp2023-089","q-amrigs2021-033"],
          prosa: `[[Segundo grau pequeno e ambulatorial: analgesia, limpeza, **curativo não aderente** (gaze com ácidos graxos essenciais ou similar), troca em 48 horas. Não há antibiótico profilático sistêmico.|q-tp20212-076,q-tp20252-059]] [[Interna-se quem tem queimadura extensa (adulto > 10–20% de 2.º grau), de **face, mãos, pés, períneo e articulações** (áreas nobres, mesmo pequenas), inalação, elétrica ou química, ou comorbidade.|q-usp2023-014,q-amrigs2021-033]] [[Espessura total que não cicatriza vai a **enxerto**: na pálpebra, enxerto de pele total, que retrai menos e evita ectrópio.|q-unifesp2023-089]]`,
          texto: `- Pequena: **curativo não aderente**, sem antibiótico. {q-tp20212-076,q-tp20252-059}
- Face, mãos, períneo, articulações: **internar**. {q-usp2023-014,q-amrigs2021-033}
- Pálpebra: **enxerto de pele total**. {q-unifesp2023-089}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["atls","aba-2024"],
          questoes: ["q-adap23-089","q-fmabc2022-040","q-usprp2026-012","q-unesp2025-073","q-usp2023-014","q-unicampdis2022-023"],
          prosa: `[[**Fórmula**: provas mais antigas usam **Parkland 4 mL** (adap23-089); o ATLS 10 e a ABA 2024 usam **2 mL** (fmabc2022-040); a dissertativa unicampdis2022-023 aceitou de 2 a 4 mL (1.540 a 3.080 mL).|q-adap23-089,q-fmabc2022-040,q-unicampdis2022-023]] [[**ATLS 11 (2025)**: a usprp2026-012 calculou 2 × 80 × 30 = **4.800 mL** a 300 mL/h e meta de diurese de 40 mL/h.|q-usprp2026-012]] [[**Antibiótico**: não se usa profilaxia sistêmica na queimadura simples; a unesp2025-073 respondeu **analgesia venosa e antibiótico oral**.|q-unesp2025-073]] [[**Flictenas**: a conduta varia entre serviços; a usp2023-014 escolheu **desbridar as flictenas** e internar.|q-usp2023-014]]`,
          texto: `- **4 mL** em provas antigas; **2 mL** hoje. {q-adap23-089,q-fmabc2022-040,q-unicampdis2022-023}
- ATLS 11: **4.800 mL a 300 mL/h**. {q-usprp2026-012}
- A prova deu **antibiótico oral**. {q-unesp2025-073}
- **Desbridar flictenas**. {q-usp2023-014}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: profundidade e conduta",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-profundidade", titulo: "Como reconhecer e tratar", conferir: true,
          questoes: ["q-tp20241-072","q-tp20252-059","q-usprp2024-025","q-uspsp4-072"],
          prosa: `[[A aparência diz a profundidade e a conduta.|q-tp20241-072,q-tp20252-059,q-usprp2024-025,q-uspsp4-072]]

| | 1.º grau | 2.º superficial | 2.º profundo | 3.º grau |
|---|---|---|---|---|
| Aspecto | eritema seco | bolhas, rosado, úmido | pálido, bolhas rotas | seco, branco/marrom, coriáceo |
| Dor | sim | intensa | menor | ausente |
| Entra na hidratação | não | sim | sim | sim |
| Evolução | 5–7 dias | 2–3 semanas | pode enxertar | enxerto; escarotomia se circunferencial |`,
          texto: `- 1.º: **não conta**. {q-tp20241-072}
- 2.º: **curativo**. {q-tp20252-059}
- 3.º: **sem dor**; circunferencial → escarotomia. {q-usprp2024-025,q-uspsp4-072}` },
      ],
    },
  ],
});
