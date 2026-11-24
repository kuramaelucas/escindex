/* resumos/vitalidade-fetal/resumo.js — resumo adaptativo de vitalidade fetal (ass-vitalidadefetal):
   fisiologia da oxigenação fetal, cardiotocografia anteparto (feto ativo/hipoativo, reativo) e intraparto
   (linha de base, variabilidade, acelerações, DIP I/II/umbilical, categorias I–III, reanimação
   intrauterina, taquissistolia), perfil biofísico e líquido amniótico, pós-datismo, índice de Bishop e
   indução, óbito fetal; armadilhas e tabela.
   Molde: resumos/LEIA-ME.md. Conferência: npm run resumo -- vitalidade-fetal */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "vitalidade-fetal",
  titulo: "Vitalidade fetal, pós-datismo e indução do parto",
  assunto: "ass-vitalidadefetal",
  criadoEm: "2026-11-23",
  fontes: [
    { id: "acog-ctg", texto: "ACOG Practice Bulletin 106 (Intrapartum fetal heart rate monitoring, 2009) e 116 (Management of intrapartum FHR tracings, 2010); NICHD 2008", lidoEm: null },
    { id: "acog-indução", texto: "ACOG Practice Bulletin 107 (Induction of labor) e 146 (Late-term and postterm pregnancies, 2014); ARRIVE trial (NEJM 2018)", lidoEm: null },
    { id: "febrasgo-vitalidade", texto: "Febrasgo — Avaliação da vitalidade fetal anteparto e intraparto (Protocolos, 2021) e Ministério da Saúde — Diretriz de assistência ao parto normal (2017)", lidoEm: null },
    { id: "acog-obito", texto: "ACOG Obstetric Care Consensus 10 — Management of stillbirth (2020)", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "ctg", titulo: "Cardiotocografia",
      introducao: `[[A frequência cardíaca fetal é regulada pelo tronco cerebral, que recebe sinais de quimiorreceptores e barorreceptores. Um feto bem oxigenado tem sistema nervoso que **oscila** (variabilidade) e **acelera** quando se mexe. Quando a contração aperta os vasos do útero, o fluxo para o espaço interviloso cai por segundos; a placenta normal tem reserva para isso, a insuficiente não — e o coração fetal mostra a diferença.|q-famerp2023-042,q-famerp2022-042,q-uspsp3-049]]

Veja também: **Assistência ao parto**, **Pré-eclâmpsia**, **Restrição de crescimento fetal**, **Rotura prematura de membranas** e **Óbito fetal** quando houver resumo.`,
      fragmentos: [
        { id: "ctg-anteparto", titulo: "Anteparto: feto ativo e reativo", conferir: true, diretrizes: ["febrasgo-vitalidade"],
          casos: ["q-uspsp3-051","q-sirio2025-079","q-uspsp1-095"],
          questoes: ["q-sirio2021-072","q-uspsp3-051","q-sirio2025-079","q-uspsp1-095","q-fmabc2024-079","q-tp20212-083","q-unicamp2022-050"],
          prosa: `[[Feto **ativo e reativo**: linha de base 110–160, variabilidade de 6–25 bpm e **acelerações transitórias** (≥ 15 bpm por ≥ 15 s), espontâneas, com movimento ou com estímulo sonoro. Traçado assim fecha boa oxigenação naquele momento, e a conduta segue o caso (indução na pré-eclâmpsia a termo, alta sem trabalho de parto).|q-sirio2021-072,q-uspsp3-051,q-tp20212-083,q-unicamp2022-050]] [[Feto **hipoativo**: poucos movimentos e acelerações, comum no sono fetal, após sedativos ou analgesia, ou jejum; o estímulo sonoro ou o tempo maior de exame recuperam a reatividade — se não, investigar.|q-sirio2025-079,q-uspsp1-095,q-fmabc2024-079]]`,
          texto: `- Ativo/reativo: **acelerações**, variabilidade 6–25. {q-sirio2021-072,q-uspsp3-051,q-tp20212-083,q-unicamp2022-050}
- Hipoativo: sono, analgesia; **estímulo sonoro**. {q-sirio2025-079,q-uspsp1-095,q-fmabc2024-079}` },
        { id: "ctg-intraparto", titulo: "Intraparto: desacelerações e categorias", conferir: true, diretrizes: ["acog-ctg"],
          figuras: [{ arquivo: "figuras/desaceleracoes.svg", legenda: "Esquema autoral: a relação no tempo entre contração e desaceleração na DIP I, na DIP II e na desaceleração variável." }],
          casos: ["q-amrigs2021-046","q-famema2025-058","q-famerp2024-036","q-famerp2025-020","q-uspsp4-040","q-uspsp3-058"],
          questoes: ["q-famerp2023-042","q-famerp2022-042","q-uspsp3-049","q-famerp2026-030","q-uspsp3-058","q-famerp2025-020","q-amrigs2021-046","q-famema2025-058","q-famerp2024-036","q-uspsp4-040"],
          prosa: `[[**DIP I (precoce)**: espelha a contração, por compressão do polo cefálico (reflexo vagal) — fisiológica. **DIP II (tardia)**: começa e termina depois da contração; é a reserva placentária falhando: **insuficiência placentária e hipóxia**. **Desaceleração variável (umbilical)**: queda abrupta, forma em V ou U, sem relação fixa com a contração — **compressão do cordão** (oligoâmnio, circular, prolapso).|q-famerp2023-042,q-famerp2022-042,q-uspsp3-049,q-famerp2025-020]] [[**Categoria I**: linha de base normal, variabilidade moderada, sem DIP II nem variáveis (precoces podem existir) — conduta habitual com ausculta intermitente. **Categoria III**: **variabilidade ausente** com DIP II recorrentes, variáveis recorrentes ou bradicardia, ou padrão sinusoidal — hipóxia grave, **parto imediato**. **Categoria II** é tudo o que fica entre elas: reanimar, reavaliar e preparar a equipe.|q-famerp2026-030,q-uspsp3-058,q-amrigs2021-046,q-famema2025-058,q-famerp2024-036,q-uspsp4-040]]`,
          texto: `- DIP I = **cabeça**; DIP II = **placenta**; variável = **cordão**. {q-famerp2023-042,q-famerp2022-042,q-uspsp3-049,q-famerp2025-020}
- Cat. I: habitual; **Cat. III**: variabilidade ausente + DIP → **parto já**; Cat. II: reanimar. {q-famerp2026-030,q-uspsp3-058,q-amrigs2021-046,q-famema2025-058,q-famerp2024-036,q-uspsp4-040}` },
        { id: "ctg-reanimacao", titulo: "Reanimação intrauterina e taquissistolia", conferir: true, diretrizes: ["acog-ctg"],
          casos: ["q-tp20241-091","q-tp20252-037","q-unesp2026-025","q-udisc20262-090","q-unicamp2023-057","q-tp20232-092"],
          questoes: ["q-tp20232-092","q-tp20241-091","q-tp20261-001","q-tp20252-037","q-unesp2026-025","q-udisc20262-090","q-unicamp2023-057"],
          prosa: `[[Com traçado categoria II, a primeira resposta é **reanimação intrauterina**: decúbito lateral esquerdo, hidratação, corrigir hipotensão, e **suspender ou reduzir a ocitocina**. Contrações demais (**taquissistolia**, > 5 em 10 minutos) encurtam o intervalo em que o espaço interviloso se reabastece de oxigênio; parar a ocitocina devolve esse tempo, e a **terbutalina** relaxa o útero quando preciso. Persistindo, preparar o parto.|q-tp20232-092,q-tp20241-091,q-tp20261-001,q-tp20252-037,q-unesp2026-025,q-udisc20262-090,q-unicamp2023-057]]`,
          texto: `- Categoria II: **reanimação intrauterina**; **tirar ocitocina**; terbutalina na taquissistolia. {q-tp20232-092,q-tp20241-091,q-tp20261-001,q-tp20252-037,q-unesp2026-025,q-udisc20262-090,q-unicamp2023-057}` },
      ],
    },
    {
      id: "perfil", titulo: "Perfil biofísico, líquido e pós-datismo",
      introducao: `[[O líquido amniótico no fim da gestação é urina fetal: quando a placenta falha, o feto desvia sangue para cérebro e coração e tira dos rins, e o líquido diminui. Por isso o **oligoâmnio** é marcador crônico de sofrimento, enquanto a cardiotocografia, os movimentos, a respiração e o tônus mostram o estado agudo.|q-tp20222-091,q-sirio2024-070]]`,
      fragmentos: [
        { id: "per-pbf", titulo: "Perfil biofísico e oligoâmnio", conferir: true, diretrizes: ["febrasgo-vitalidade"],
          casos: ["q-uspsp4-045"],
          questoes: ["q-sirio2024-070","q-tp20222-091","q-famema2022-049","q-uspsp4-045"],
          prosa: `[[O perfil biofísico soma 2 pontos para cada: cardiotocografia reativa, movimentos respiratórios, movimentos corporais, tônus e líquido (maior bolsão ≥ 2 cm). Nota **8/10** com líquido normal é tranquilizadora; falta de movimentos respiratórios isolada pode ser sono.|q-sirio2024-070]] [[**Maior bolsão < 2 cm ou ILA ≤ 5 cm** é oligoâmnio: no feto pequeno, complementar com **Doppler**; a termo, **resolver a gestação** (indução com preparo do colo por balão ou misoprostol).|q-tp20222-091,q-famema2022-049,q-uspsp4-045]]`,
          texto: `- PBF 8/10 com líquido normal: **tranquilizador**. {q-sirio2024-070}
- Oligoâmnio: **Doppler** se feto pequeno; a termo, **induzir**. {q-tp20222-091,q-famema2022-049,q-uspsp4-045}` },
        { id: "per-posdatismo", titulo: "Pós-datismo", conferir: true, diretrizes: ["acog-indução"],
          questoes: ["q-uspsp2-044","q-famerp2023-041","q-unicampdis2023-041","q-uspsp1-091","q-famerp2024-038","q-fmabc2022-078"],
          prosa: `[[Depois de 40 semanas a placenta envelhece e o risco de óbito fetal, mecônio e macrossomia sobe. Com **41 semanas** oferece-se **indução** (antes de 42), e nesse intervalo vigia-se líquido e cardiotocografia. Na UBS, gestante com 42 semanas vai para a maternidade para avaliar vitalidade e induzir.|q-uspsp2-044,q-famerp2023-041,q-unicampdis2023-041,q-uspsp1-091]] [[Mecônio espesso com colo pérvio em pós-termo foi resolvido por **cesárea** em prova antiga; o pós-datismo deve ser pensado junto da insuficiência placentária.|q-famerp2024-038,q-fmabc2022-078]]`,
          texto: `- **41 semanas: induzir**; 42 na UBS: maternidade. {q-uspsp2-044,q-famerp2023-041,q-unicampdis2023-041,q-uspsp1-091}
- Pós-datismo ↔ **insuficiência placentária**. {q-famerp2024-038,q-fmabc2022-078}` },
      ],
    },
    {
      id: "inducao", titulo: "Indução e óbito fetal",
      introducao: `[[Induzir com colo desfavorável raramente dá certo: o colo precisa amolecer, encurtar e abrir antes que a ocitocina tenha o que fazer. O **índice de Bishop** mede isso — dilatação, esvaecimento, altura da apresentação, consistência e posição do colo.|q-sirio2026-077,q-sessp2023-052]]`,
      fragmentos: [
        { id: "ind-bishop", titulo: "Bishop e preparo do colo", conferir: true, diretrizes: ["acog-indução"],
          questoes: ["q-sirio2026-077","q-sessp2023-052","q-sirio2024-068","q-sirio2022-063"],
          prosa: `[[Cada item vale 0–3 (consistência e posição, 0–2). **Bishop < 6** (colo desfavorável): **preparar o colo** com misoprostol ou balão; **≥ 6–8**: ocitocina, colo favorável ao parto vaginal.|q-sirio2026-077,q-sessp2023-052,q-sirio2024-068,q-sirio2022-063]]`,
          texto: `- **Bishop < 6**: misoprostol/balão; ≥ 6: ocitocina. {q-sirio2026-077,q-sessp2023-052,q-sirio2024-068,q-sirio2022-063}` },
        { id: "ind-obito", titulo: "Óbito fetal", conferir: true, diretrizes: ["acog-obito"],
          questoes: ["q-einstein2022-058","q-sirio2027-069","q-einstein2024-047"],
          prosa: `[[Confirmado o óbito fetal no terceiro trimestre, sem contraindicação ao parto vaginal, a conduta preferida é a **indução com misoprostol**: a cesárea não ajuda o feto e acrescenta risco à mulher. A espera de semanas é possível, mas o risco de coagulopatia e o sofrimento emocional crescem.|q-einstein2022-058,q-sirio2027-069,q-einstein2024-047]]`,
          texto: `- Óbito fetal: **misoprostol**. {q-einstein2022-058,q-sirio2027-069}
- Expectante é possível, com vigilância. {q-einstein2024-047}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas em que a prova cobrou algo diferente da regra atual ou que exploram uma confusão comum. Em cada item, primeiro a regra; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true, diretrizes: ["acog-obito","acog-indução"],
          questoes: ["q-einstein2024-047","q-famerp2024-038","q-fmabc2022-078","q-uspsp3-051"],
          prosa: `[[**Óbito fetal a termo**: a regra prefere induzir com misoprostol (einstein2022-058, sirio2027-069); a einstein2024-047 respondeu **conduta expectante por até 4 semanas** com retorno semanal.|q-einstein2024-047]] [[**Mecônio no pós-termo**: mecônio não indica cesárea por si; a famerp2024-038 respondeu **cesárea** com colo pérvio e mecônio na amnioscopia.|q-famerp2024-038]] [[**Seguimento após a DPP**: a regra é vigiar a vitalidade e induzir em 41 semanas; a fmabc2022-078 marcou como certa uma frase de redação confusa sobre **não** associar o pós-datismo à insuficiência placentária.|q-fmabc2022-078]] [[**Classificação anteparto × intraparto**: as categorias I–III são para o trabalho de parto; fora dele, a uspsp3-051 classificou o traçado como **feto ativo**.|q-uspsp3-051]]`,
          texto: `- Óbito fetal: a prova deu **expectante 4 semanas**. {q-einstein2024-047}
- Mecônio: a prova deu **cesárea**. {q-famerp2024-038}
- Pós-datismo e insuficiência placentária andam juntos; uma prova, com redação confusa, marcou o contrário. {q-fmabc2022-078}
- Anteparto: **feto ativo**, não categoria. {q-uspsp3-051}` },
      ],
    },
    {
      id: "comparativo", titulo: "Tabela: categorias da cardiotocografia",
      introducao: `Resumo dos capítulos.`,
      fragmentos: [
        { id: "cmp-categorias", titulo: "Categoria e conduta", conferir: true,
          questoes: ["q-famerp2026-030","q-tp20252-037","q-famerp2024-036","q-sirio2021-072"],
          prosa: `[[A categoria decide a conduta no trabalho de parto.|q-famerp2026-030,q-tp20252-037,q-famerp2024-036,q-sirio2021-072]]

| | Categoria I | Categoria II | Categoria III |
|---|---|---|---|
| Linha de base | 110–160 | taqui ou bradicardia sem ausência de variabilidade | bradicardia com variabilidade ausente |
| Variabilidade | moderada (6–25) | mínima ou acentuada | ausente |
| Desacelerações | ausentes ou precoces | tardias ou variáveis com variabilidade | tardias ou variáveis recorrentes; sinusoidal |
| Conduta | habitual | reanimação intrauterina, reavaliar | parto imediato |`,
          texto: `- Cat. I: **habitual**. {q-famerp2026-030}
- Cat. II: **reanimar**. {q-tp20252-037}
- Cat. III: **parto imediato**. {q-famerp2024-036}` },
      ],
    },
  ],
});
