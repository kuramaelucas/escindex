/* resumos/oftalmologia/resumo.js — resumo adaptativo de oftalmologia para o generalista: olho vermelho
   (conjuntivites, ceratite, uveíte, glaucoma agudo), celulite pré e pós-septal, glaucoma, catarata e
   leucocoria, vias lacrimais e refração na criança, trauma ocular e retina (diabética, oclusão,
   descolamento). Assuntos: ass-oft-olhovermelho (principal), ass-oft-glaucoma, ass-oft-catarata,
   ass-oft-trauma, ass-oft-retina, ass-oft-refracao.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- oftalmologia */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "oftalmologia",
  titulo: "Oftalmologia para o generalista",
  assunto: "ass-oft-olhovermelho",
  criadoEm: "2026-11-25",
  fontes: [
    { id: "aao-ppp", texto: "American Academy of Ophthalmology — Preferred Practice Patterns (conjuntivite, glaucoma primário de ângulo aberto e fechado, retinopatia diabética, 2020–2024)", lidoEm: null },
    { id: "sbd-retinopatia", texto: "Diretriz da Sociedade Brasileira de Diabetes — rastreamento da retinopatia diabética", lidoEm: null },
  ],
  foraDoEscopo: [],
  doencas: [
    {
      id: "olho-vermelho", titulo: "Olho vermelho",
      introducao: `[[Diante do olho vermelho, a primeira pergunta é **se a visão e a córnea estão em risco**. Conjuntivite dá **hiperemia que predomina longe da córnea**, secreção e incômodo, **sem baixa visual nem dor forte**. Os sinais que mandam ao oftalmologista **com urgência** são: **dor ocular intensa**, **baixa da acuidade visual**, **fotofobia importante**, **hiperemia pericerática** (em volta da córnea), **opacidade corneana ou hipópio** e **pupila alterada** — é o que separa ceratite, uveíte e glaucoma agudo.|q-oft-03,q-famema2025-094]]

Veja também: **Infecções congênitas** (conjuntivite neonatal), **Triagem neonatal** (teste do olhinho), **Diabetes**, **Puericultura** (obstrução lacrimal) e **Artrites** (uveíte da espondiloartrite).`,
      fragmentos: [
        { id: "ov-conjuntivites", titulo: "Conjuntivites, pterígio e pinguécula", conferir: true, diretrizes: ["aao-ppp"],
          questoes: ["q-oft-01","q-oft-02","q-tp20232-075","q-tp20241-074","q-usp2022-056","q-usprp2021-019","q-usprp2027-090"],
          prosa: `[[**Viral** (adenovírus): bilateral em dias, **secreção aquosa**, sensação de areia, **linfonodo pré-auricular**, contato com doente; muito contagiosa. Tratamento de suporte — **higiene, compressas frias, lubrificante** — sem antibiótico. **Bacteriana**: **secreção mucopurulenta** abundante, **pálpebras coladas ao acordar**: **colírio antibiótico** de amplo espectro.|q-oft-01,q-oft-02,q-tp20232-075,q-tp20241-074]] [[No recém-nascido, conjuntivite que começa na **2ª ou 3ª semana** é de **clamídia** (adquirida no parto): tratar com **azitromicina ou eritromicina oral** (pode dar pneumonia); a gonocócica é dos primeiros dias e explosiva.|q-usp2022-056]] [[O sol e o vento do trabalho rural fazem crescer tecido fibrovascular da conjuntiva: **pinguécula** é a elevação amarelada que **não invade a córnea**; o **pterígio** é a prega triangular que **avança sobre a córnea** e pode precisar de cirurgia.|q-usprp2021-019,q-usprp2027-090]]`,
          texto: `- Aquosa + pré-auricular + contato: **viral** → higiene e compressas. {q-oft-01}
- Mucopurulenta, pálpebras coladas: **bacteriana** → colírio antibiótico. {q-oft-02,q-tp20232-075,q-tp20241-074}
- RN de 19 dias: **clamídia**. {q-usp2022-056}
- Invade a córnea: **pterígio**; amarelada sem invadir: **pinguécula**. {q-usprp2021-019,q-usprp2027-090}` },
        { id: "ov-ceratite-uveite", titulo: "Ceratite e uveíte: o olho vermelho que dói", conferir: true, diretrizes: ["aao-ppp"],
          questoes: ["q-oft-03","q-tp20251-050","q-tp20252-019","q-tp20261-091","q-unicamp2022-014","q-adap21-019","q-famema2025-094"],
          prosa: `[[Usuário de **lente de contato** (sobretudo quem dorme com ela ou a lava com água) com **dor intensa, fotofobia, baixa visual** e **infiltrado ou úlcera** na córnea: **ceratite bacteriana** (*Pseudomonas*), que perfura em dias — oftalmologista no mesmo dia, colírio antibiótico intensivo, suspender a lente; *Acanthamoeba* é a temida pela água.|q-tp20251-050,q-tp20252-019,q-tp20261-091]] [[**Uveíte anterior**: dor, fotofobia, hiperemia pericerática, **pupila pequena** e células na câmara anterior; no jovem com **lombalgia inflamatória** (espondiloartrite, HLA-B27) é a manifestação extra-articular mais comum. Tratamento: **colírio de corticoide** intensivo e **cicloplégico** (alivia o espasmo e evita sinéquias), com o oftalmologista.|q-unicamp2022-014,q-adap21-019]]`,
          texto: `- Olho vermelho + dor forte, baixa visual, fotofobia, hipópio: **urgência**. {q-oft-03}
- Lente de contato + dor + úlcera: **ceratite bacteriana**. {q-tp20251-050,q-tp20252-019,q-tp20261-091}
- Lombalgia inflamatória + olho vermelho doloroso: **uveíte anterior** → corticoide + cicloplégico. {q-unicamp2022-014,q-adap21-019}
- Média-midríase fixa: **glaucoma agudo**. {q-famema2025-094}` },
        { id: "ov-celulite", titulo: "Celulite pré-septal × orbitária", conferir: true,
          questoes: ["q-tp20241-015","q-tp20232-021","q-tp20261-119","q-unifesp2023-039","q-oft-14","q-uspsp5-099","q-unesp2025-019"],
          prosa: `[[O **septo orbitário** separa a pálpebra da órbita. **Pré-septal**: edema e eritema da pálpebra, **sem dor à movimentação ocular, sem proptose e com visão normal** — antibiótico **oral** e reavaliar em 48 h. **Orbitária (pós-septal)**, quase sempre complicação de **sinusite** (etmoidal): **proptose, dor ao mover o olho, oftalmoplegia**, baixa visual, febre — **internar, antibiótico venoso e tomografia de órbita e seios** (procura abscesso subperiosteal). Quando o quadro não cede ao tratamento oral, ou há dúvida, também se pede tomografia.|q-tp20241-015,q-tp20232-021,q-tp20261-119,q-unifesp2023-039,q-oft-14,q-uspsp5-099]] [[A infecção da face e dos seios drena por veias sem válvulas para o **seio cavernoso**: febre alta, proptose e **oftalmoplegia bilateral** depois de sinusite é **trombose do seio cavernoso**.|q-unesp2025-019]]`,
          texto: `- Só pálpebra, sem dor ao mover o olho: **pré-septal** → antibiótico oral. {q-tp20241-015}
- Proptose, dor ao mover, oftalmoplegia: **orbitária** → **internar, antibiótico IV, TC**. {q-oft-14,q-uspsp5-099,q-unifesp2023-039}
- Pálpebra que não melhora: **TC de órbita e seios**. {q-tp20232-021,q-tp20261-119}
- Sinusite + oftalmoplegia bilateral: **trombose do seio cavernoso**. {q-unesp2025-019}` },
      ],
    },
    {
      id: "glaucoma", titulo: "Glaucoma",
      introducao: `[[Glaucoma é a **neuropatia óptica** progressiva — o disco óptico **escava** e o campo visual se perde da periferia para o centro — em geral pela pressão intraocular alta para aquele nervo. O humor aquoso sai pelo **ângulo** entre a íris e a córnea (malha trabecular): no glaucoma de **ângulo aberto** o filtro funciona mal devagar; no de **ângulo fechado**, a íris tampa a saída de repente.|q-oft-05,q-adap22-040]]`,
      fragmentos: [
        { id: "gla-agudo", titulo: "Glaucoma agudo de ângulo fechado", conferir: true, diretrizes: ["aao-ppp"],
          questoes: ["q-oft-04","q-tp20222-077","q-tp20251-074","q-tp20261-051","q-unesp2026-058","q-einstein2027-017","q-unesp2021-073","q-adap23-040","q-unifesp2022-096","q-unifesp2023-040"],
          prosa: `[[Quem tem **câmara anterior rasa** (hipermétrope, mulher, idosa — na lanterna oblíqua, sombra na íris nasal) fecha o ângulo quando a pupila dilata: **penumbra**, colírio midriático, drogas **anticolinérgicas** ou adrenérgicas. Quadro: **dor ocular intensa** com cefaleia, **náuseas e vômitos** (confundem com abdome ou enxaqueca), **visão borrada com halos coloridos**, olho vermelho, **córnea embaçada (edema)**, **pupila em média-midríase fixa** e olho "duro".|q-oft-04,q-tp20222-077,q-tp20251-074,q-tp20261-051,q-unesp2026-058,q-einstein2027-017,q-unifesp2023-040]] [[Conduta: **baixar a pressão já** — **manitol** venoso, **acetazolamida** (inibe a produção do humor), betabloqueador tópico e **pilocarpina** (contrai a pupila e puxa a íris do ângulo) — e oftalmologista com urgência. O definitivo é a **iridotomia periférica a laser**, **nos dois olhos** (o outro também tem ângulo estreito). Nunca colírio midriático.|q-einstein2027-017,q-unesp2021-073,q-adap23-040,q-unifesp2022-096]]`,
          texto: `- Dor + vômitos + halos + média-midríase fixa: **glaucoma agudo**. {q-oft-04,q-tp20222-077,q-tp20251-074,q-tp20261-051,q-unesp2026-058}
- Penumbra precipita; câmara rasa: evitar anticolinérgico (estatina não tem esse risco). {q-unesp2021-073,q-unifesp2023-040}
- **Manitol, acetazolamida, pilocarpina** → **iridotomia nos dois olhos**. {q-einstein2027-017,q-adap23-040,q-unifesp2022-096}` },
        { id: "gla-cronico-congenito", titulo: "Ângulo aberto e glaucoma congênito", conferir: true, diretrizes: ["aao-ppp"],
          questoes: ["q-oft-05","q-unifesp2022-040","q-adap22-040","q-adap22-096","q-usp2025-057","q-amrigs2022-064","q-unesp2022-018"],
          prosa: `[[O **glaucoma de ângulo aberto** é **assintomático por anos** e só se descobre no exame: **escavação do disco aumentada** e perda de campo periférico. Risco: **idade acima de 60**, **raça negra**, história familiar, **miopia**, diabetes. A pressão pode ser **normal** (glaucoma de pressão normal): o tratamento é **baixar a pressão cerca de 30%** com colírio (análogo de prostaglandina), laser ou cirurgia.|q-oft-05,q-unifesp2022-040,q-adap22-040]] [[**Glaucoma congênito**: o olho do bebê ainda é elástico e cresce com a pressão — **córnea grande** ("olhos grandes"), **turva**, **lacrimejamento, fotofobia e blefarospasmo** (a tríade). Tratamento **cirúrgico** do ângulo (goniotomia ou trabeculotomia).|q-adap22-096,q-usp2025-057,q-amrigs2022-064,q-unesp2022-018]]`,
          texto: `- Assintomático, escavação do disco: **ângulo aberto**; risco: **> 60 anos, míope**. {q-oft-05,q-unifesp2022-040}
- Pressão normal com escavação: tratar, **reduzir 30%**. {q-adap22-040}
- Córnea grande e turva + lacrimejamento + fotofobia: **glaucoma congênito** → **cirurgia**. {q-adap22-096,q-usp2025-057,q-amrigs2022-064,q-unesp2022-018}` },
      ],
    },
    {
      id: "crianca-cristalino", titulo: "Catarata, leucocoria e a visão da criança",
      introducao: `[[O **reflexo vermelho** é a luz que volta da retina; se algo no caminho a barra ou reflete branco, aparece a **leucocoria** — no teste do olhinho ou na foto com flash. As causas que não podem esperar são **retinoblastoma**, **catarata congênita**, retinopatia da prematuridade e toxoplasmose ocular: **encaminhamento oftalmológico imediato**.|q-oft-07,q-einstein2022-045,q-tp20241-051]]`,
      fragmentos: [
        { id: "cri-catarata", titulo: "Catarata, leucocoria e tumores intraoculares", conferir: true,
          questoes: ["q-oft-07","q-einstein2022-045","q-tp20241-051","q-tp20232-051","q-oft-06","q-tp20212-077","q-adap24-024","q-unifesp2024-034"],
          prosa: `[[**Catarata congênita** precisa operar cedo, antes de a visão daquele olho deixar de se desenvolver (ambliopia). **Retinoblastoma** (reflexo branco na foto, estrabismo) é o tumor intraocular da criança. No recém-nascido de **parto a fórceps**, reflexo vermelho alterado pode ser **hemorragia retiniana**, que costuma reabsorver.|q-tp20241-051,q-einstein2022-045,q-tp20232-051]] [[**Catarata senil**: baixa visual **lenta e indolor**, ofuscamento à noite, troca frequente de óculos e às vezes **melhora para perto** (o cristalino fica mais convergente); **reflexo vermelho diminuído**. Tratamento **cirúrgico** (facoemulsificação com lente intraocular).|q-oft-06,q-tp20212-077]] [[No adulto, o tumor intraocular mais comum é a **metástase de coroide** (lesão **amelanótica**; pulmão no homem, mama na mulher); o primário é o **melanoma de coroide** (pigmentado), que dá metástase sobretudo para o **fígado**.|q-adap24-024,q-unifesp2024-034]]`,
          texto: `- Reflexo vermelho ausente: **oftalmologia imediata** (retinoblastoma, catarata). {q-oft-07,q-einstein2022-045,q-tp20241-051}
- RN de fórceps com reflexo alterado: **hemorragia retiniana**. {q-tp20232-051}
- Baixa visual lenta, indolor, idoso: **catarata** → cirurgia. {q-oft-06,q-tp20212-077}
- Lesão amelanótica em tabagista: metástase de **pulmão**; melanoma de coroide → **fígado**. {q-adap24-024,q-unifesp2024-034}` },
        { id: "cri-lacrimal-refracao", titulo: "Via lacrimal, refração e estrabismo", conferir: true,
          questoes: ["q-tp20231-041","q-unesp2025-020","q-unesp2026-020","q-oft-15","q-usp2026-060","q-tp20202-056","q-tp20251-036"],
          prosa: `[[**Obstrução congênita do ducto lacrimonasal**: lacrimejamento e secreção com cílios grudados, **conjuntiva calma**, desde as primeiras semanas. Abre sozinha na maioria até 1 ano com **massagem do saco lacrimal**; persistindo, **sondagem**.|q-tp20231-041,q-unesp2025-020,q-unesp2026-020]] [[Na **miopia** o olho é longo e a imagem cai **antes** da retina: corrige-se com lente **divergente (negativa)**; na **hipermetropia**, o contrário, lente positiva. Escolar com **cefaleia, ardor e queda no rendimento**: **ametropia**, óculos. No rastreio com tabela de Snellen (com os óculos), encaminha-se acuidade **< 0,7** ou diferença de duas linhas entre os olhos. **Estrabismo** depois dos 4–6 meses (ou constante) vai ao oftalmologista: o olho desviado perde visão (ambliopia).|q-oft-15,q-usp2026-060,q-tp20202-056,q-tp20251-036]]`,
          texto: `- Lacrimejamento com conjuntiva calma: **obstrução lacrimal** → massagem; persistente → sondagem. {q-tp20231-041,q-unesp2025-020,q-unesp2026-020}
- Miopia: **lente negativa**. {q-oft-15}
- Snellen < 0,7: **alterado**. {q-usp2026-060}
- Cefaleia e queda escolar: **ametropia**. {q-tp20202-056}
- Desvio no lactente de 1 ano: **encaminhar**. {q-tp20251-036}` },
      ],
    },
    {
      id: "trauma-retina", titulo: "Trauma ocular e retina",
      introducao: `[[As urgências oculares mais graves são **queimadura química** e **perfuração do globo**. Na queimadura, o **álcali** (soda, cal) é pior que o ácido: penetra e continua lesando enquanto há contato, por isso **lavar já**, no local, antes de qualquer exame. No trauma com objeto pontiagudo ou martelada em metal, o olho que "solta água quente" está **perfurado**.|q-oft-12,q-unesp2022-098,q-unesp2023-018]]`,
      fragmentos: [
        { id: "tra-trauma", titulo: "Queimadura química, perfuração e corpo estranho", conferir: true,
          questoes: ["q-oft-12","q-unesp2022-098","q-unesp2023-018","q-unesp2021-017","q-adap23-039","q-oft-13","q-usp2023-043"],
          prosa: `[[Química: **irrigação copiosa e prolongada** (água, soro ou Ringer) começando no local, depois o oftalmologista. Suspeita de **perfuração**: **não examinar à força nem comprimir**, **escudo rígido sem pressão**, **jejum** (vai para a sutura), antibiótico sistêmico e **profilaxia do tétano**.|q-oft-12,q-unesp2022-098,q-unesp2023-018,q-unesp2021-017,q-adap23-039]] [[**Abrasão corneana** (lixar metal sem óculos): fluoresceína mostra a lesão; antibiótico tópico e analgesia — **nunca colírio anestésico para casa**, que impede a cicatrização e mascara úlcera. Corpo estranho escuro **sobre a córnea** pede avaliação oftalmológica urgente.|q-oft-13,q-usp2023-043]]`,
          texto: `- Química: **irrigar já**, no local. {q-oft-12,q-unesp2022-098}
- Suspeita de perfuração: **escudo sem pressão, jejum, antibiótico, tétano**. {q-unesp2023-018,q-unesp2021-017,q-adap23-039}
- Abrasão: **sem anestésico para casa**. {q-oft-13}
- Corpo estranho na córnea: **urgência**. {q-usp2023-043}` },
        { id: "tra-retina", titulo: "Retinopatia diabética, oclusão arterial e descolamento", conferir: true, diretrizes: ["sbd-retinopatia"],
          questoes: ["q-oft-08","q-oft-09","q-usp2022-001","q-famema2025-067","q-uspsp3-075","q-oft-10","q-oft-11"],
          prosa: `[[A **retinopatia diabética** é uma das principais causas de **cegueira irreversível**: a hiperglicemia lesa a microcirculação e dá **microaneurismas, micro-hemorragias e exsudatos duros** (não proliferativa) até a isquemia estimular **neovasos** (proliferativa), que sangram e descolam a retina. Risco: **tempo de doença e mau controle**. Rastreio com fundoscopia: **DM2 no diagnóstico**, **DM1 a partir de 5 anos** de doença, depois anual. A proliferativa se trata com **panfotocoagulação a laser** (e anti-VEGF no edema macular).|q-oft-08,q-oft-09,q-usp2022-001,q-famema2025-067,q-uspsp3-075]] [[**Oclusão da artéria central da retina**: perda visual **súbita, indolor e total** num olho, retina pálida com **mancha vermelho-cereja** — é um AVC do olho (procurar fonte embólica). **Flashes, moscas volantes e uma cortina** que sobe ou desce no campo: **descolamento de retina**, urgência oftalmológica.|q-oft-10,q-oft-11]]`,
          texto: `- Rastreio: **DM2 ao diagnóstico; DM1 após 5 anos**; anual. {q-oft-08}
- Micro-hemorragias e exsudatos duros: **não proliferativa**; neovasos → **laser**. {q-usp2022-001,q-oft-09,q-uspsp3-075}
- Causa de **cegueira irreversível**. {q-famema2025-067}
- Súbita, indolor, vermelho-cereja: **oclusão da artéria central**. {q-oft-10}
- Flashes + cortina: **descolamento de retina**. {q-oft-11}` },
      ],
    },
  ],
});
