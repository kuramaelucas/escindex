/* resumos/saude-do-trabalhador/resumo.js — resumo adaptativo de saúde do trabalhador: política e Renast, acidente
   de trabalho (CAT, notificação, afastamento), NRs (PCMSO, CIPA), doenças por agente (ruído, agrotóxicos, metais,
   poeiras, ergonomia, saúde mental) e a história da medicina do trabalho. Molde e regras: resumos/LEIA-ME.md.
   Conferência: npm run resumo -- saude-do-trabalhador */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "saude-do-trabalhador",
  titulo: "Saúde do trabalhador",
  assunto: "ass-saudetrabalhador",
  criadoEm: "2026-11-22",
  fontes: [
    { id: "pnstt", texto: "Ministério da Saúde — Política Nacional de Saúde do Trabalhador e da Trabalhadora (Portaria GM/MS nº 1.823/2012), RENAST e Lista de Doenças Relacionadas ao Trabalho (LDRT)", lidoEm: null },
    { id: "lei-8213", texto: "Lei nº 8.213/1991 (acidente do trabalho, CAT, trajeto) e Portaria de Consolidação nº 4/2017 (notificação compulsória dos agravos relacionados ao trabalho no SINAN)", lidoEm: null },
    { id: "nr-7", texto: "NR-7 (PCMSO: exames admissional, periódico, de retorno, mudança de risco e demissional; Quadros 1 e 2, audiometria) e NR-5 (CIPA)", lidoEm: null },
    { id: "nr-15", texto: "NR-15, Anexo 1 (limites de tolerância para ruído contínuo ou intermitente)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas com reposição `-ia` no resumo (as reposições entram).", questoes: ["q-amrigs2021-089", "q-famerp2026-008"] },
    { motivo: "Anuladas, sem reposição.", questoes: ["q-unifesp2024-068", "q-famerp2026-005"] },
  ],
  doencas: [
    {
      id: "conceito", titulo: "Saúde do trabalhador: conceito, política e história",
      introducao: `[[A **saúde do trabalhador** é o campo da saúde pública que estuda a relação **produção-consumo-saúde**: o trabalho como **determinante** do processo saúde-doença, e não só como cenário. Suas ações são de **promoção, assistência e vigilância** em saúde do trabalhador.|q-adap24-099,q-unicampdis2024-111,q-fmabc2022-082]]

[[O **SUS** tem competência para ações de saúde do trabalhador (Lei nº 8.080/1990), incluindo informar o trabalhador e o sindicato sobre os resultados das fiscalizações e participar da revisão da lista de doenças relacionadas ao trabalho; a **PNSTT** (2012) abrange **todos** os trabalhadores, formais ou informais, urbanos ou rurais, e é transversal aos níveis de atenção.|q-fmabc2022-082,q-adap24-099]]

Veja também: **Vigilância em saúde** (notificação, SINAN), **Estratégia Saúde da Família** (território e ACS), **Prevenção** (níveis de prevenção) e **Princípios do SUS** (competências).`,
      fragmentos: [
        { id: "st-politica", titulo: "PNSTT, Renast, vigilância e atuação da atenção básica", conferir: true, diretrizes: ["pnstt"],
          questoes: ["q-adap24-099","q-unesp2025-082","q-simepm89-064","q-famema2025-074","q-unicampdis2024-111","q-fmabc2022-082","q-famema2023-013","q-unicamp2022-074","q-tp20232-110"],
          prosa: `A **PNSTT** (Portaria GM/MS nº 1.823/2012) é um conjunto de ações do SUS que vê o trabalho como determinante do processo saúde-doença; **não** se restringe aos trabalhadores formais. A **RENAST** (Rede Nacional de Atenção Integral à Saúde do Trabalhador) articula a rede de serviços, e os **CEREST** são centros de referência para apoio técnico. [[A **atenção primária** reconhece e **identifica a população trabalhadora** do território e seu perfil sócio-ocupacional, mapeia as atividades produtivas, incorpora a **história ocupacional** na anamnese e notifica; ela **não** multa empresas, que é atribuição da fiscalização do trabalho.|q-famema2025-074,q-simepm89-064,q-unicamp2022-074]]

[[Quando cinco caixas de supermercado procuram a UBS com queixas sobre as condições de trabalho (preços divergentes, ritmo, pressão), a equipe avalia a saúde das trabalhadoras e **aciona a vigilância em saúde do trabalhador**, que inspeciona o ambiente: o problema é coletivo e a solução, na fonte.|q-famema2023-013]]

A **Lista de Doenças Relacionadas ao Trabalho (LDRT)**, instituída pelo Ministério da Saúde, orienta o **uso clínico e epidemiológico** (adotar procedimentos de diagnóstico, elaborar projetos terapêuticos mais acurados, orientar ações de vigilância e proteção). [[Direitos trabalhistas fazem parte da proteção: até o bebê completar seis meses, a mãe tem direito a **dois períodos de meia hora por dia** para amamentar, conforme a CLT.|q-unesp2025-082,q-tp20232-110]]`,
          texto: `- **PNSTT** (Portaria 1.823/2012): ações do SUS, transversais aos níveis de atenção, com o trabalho como **determinante** da saúde; **não** se restringe a trabalhadores formais. {q-adap24-099}
- **Saúde do trabalhador** = promoção, assistência e vigilância em saúde do trabalhador. {q-unicampdis2024-111}
- Lei 8.080: informar o trabalhador e o sindicato sobre os resultados de fiscalizações, avaliações ambientais e exames. {q-fmabc2022-082}
- **LDRT**: orienta uso clínico e epidemiológico (diagnóstico, projeto terapêutico, vigilância). {q-unesp2025-082}
- Na **RENAST**, a APS identifica a **população trabalhadora** e seu perfil sócio-ocupacional; não aplica multas. {q-famema2025-074}
- A UBS identifica as **ocupações** da população e as atividades produtivas do território. {q-simepm89-064}
- **Anamnese ocupacional**: relacionar a ocupação ao agravo (pedreiro e dermatite de contato). {q-unicamp2022-074}
- Queixas coletivas das trabalhadoras de um supermercado: **avaliar a saúde e acionar a vigilância**. {q-famema2023-013}
- **Amamentação**: dois períodos de meia hora por dia até o bebê completar seis meses. {q-tp20232-110}` },
        { id: "st-historia", titulo: "Marcos históricos da medicina do trabalho", conferir: true,
          questoes: ["q-famerp2026-002","q-famerp2026-007","q-famerp2023-002","q-tp20202-115"],
          prosa: `[[**Bernardino Ramazzini**, o "pai da medicina do trabalho", escreveu o *De Morbis Artificum Diatriba* (1700) e padronizou a pergunta que deve ser feita a todo paciente: **"Qual é a sua ocupação?"**. **Plínio** (século I) descreveu o primeiro EPI: a **membrana de bexiga de carneiro** usada pelos trabalhadores das minas contra as poeiras.|q-famerp2026-002,q-famerp2026-007]] [[**Percivall Pott** descreveu o primeiro câncer ocupacional, o **câncer de escroto** em limpadores de chaminé, expostos à fuligem.|q-famerp2023-002]]

[[A fração atribuível a fatores de risco ocupacionais é alta nas doenças respiratórias: a **asma ocupacional** em padeiros e marceneiros (poeira de farinha e madeira) é o exemplo mais citado, e a pneumoconiose é a de mineiros de carvão, não de fazendeiros.|q-tp20202-115]]`,
          texto: `- **Ramazzini**: pai da medicina do trabalho; pergunta **"Qual é a sua ocupação?"**. {q-famerp2026-002}
- **Plínio**: primeiro EPI, a **membrana de bexiga de carneiro**. {q-famerp2026-007}
- **Pott**: primeiro câncer ocupacional, o de **escroto** (limpadores de chaminé). {q-famerp2023-002}
- **Asma ocupacional** em padeiros e marceneiros; a **pneumoconiose** é a doença dos mineiros de carvão. {q-tp20202-115}` },
      ],
    },
    {
      id: "acidente", titulo: "Acidente de trabalho: CAT, notificação, afastamento e comissões",
      introducao: `[[O **acidente de trabalho** é o que ocorre pelo exercício do trabalho a serviço da empresa, provocando lesão, perda ou redução da capacidade, ou morte. Divide-se em **típico** (no local e no exercício do trabalho) e de **trajeto** (no percurso casa-trabalho-casa); a doença relacionada ao trabalho é equiparada a acidente.|q-famerp2024-013,q-famerp2025-040,q-iamspe2023-079]]

[[Há dois documentos com funções diferentes: a **CAT** (Comunicação de Acidente de Trabalho) é **previdenciária**, para o trabalhador segurado; a **notificação no SINAN** é **de vigilância**, para **todos** os acidentes e doenças do trabalho, inclusive de quem não tem carteira assinada.|q-scmsp2021-087,q-tp20222-115,q-tp20251-106,q-sirio2026-094]] O que um não faz o outro não substitui.`,
      fragmentos: [
        { id: "at-cat-notificacao", titulo: "Quem emite a CAT e quando notificar no SINAN", conferir: true, diretrizes: ["lei-8213"],
          figuras: [{ arquivo: "figuras/acidente-trabalho.svg", legenda: "Esquema autoral: acidente de trabalho, CAT (previdência) e notificação no SINAN (vigilância), com o afastamento." }],
          questoes: ["q-adap26-066","q-unifesp2026-066","q-scmsp2021-087","q-scmsp2026-098","q-iamspe2023-079","q-sessp2023-083","q-tp20222-115","q-tp20251-106","q-sirio2026-094","q-famerp2023-001","q-famerp2026-004","q-famerp2024-013","q-famerp2025-039","q-unifesp2023-033","q-famema2023-007","q-famema2025-065"],
          prosa: `A **CAT** deve ser emitida pela **empresa** até o primeiro dia útil seguinte ao acidente (imediatamente, se houve morte). [[Se a empresa não a emite, podem fazê-lo o **médico assistente**, o próprio **trabalhador**, seus **dependentes**, o **sindicato** ou a autoridade pública; o médico que atende o acidentado não deve esperar a empresa. Ela vale para o **trabalhador com vínculo** (segurado).|q-adap26-066,q-famerp2025-039,q-scmsp2021-087]]

[[A **notificação no SINAN** é **compulsória** para acidentes e doenças relacionados ao trabalho **independentemente do vínculo**, da gravidade ou de ocorrer no trajeto: o motofretista de aplicativo sem contrato, o trabalhador informal que cai em cacos de vidro no caminho, o cozinheiro que amputa o dedo. Os acidentes **graves** (amputação) e **fatais** são de notificação **imediata** (24 horas); o desabamento que mata 10 e fere 10 exige notificação de **todos** os casos; a morte de quatro pessoas em temporal (entregador, trabalhadora doméstica, seguranças) deve ser notificada como acidente de trabalho em todas as que estavam em atividade laboral.|q-sirio2026-094,q-tp20222-115,q-tp20251-106,q-unifesp2026-066,q-famema2023-007,q-famema2025-065,q-sessp2023-083]]

[[O **trajeto** conta como acidente do trabalho quando o percurso é o habitual casa-trabalho; o enfermeiro que **desvia** para fazer compras do mês no supermercado deixa de estar em trajeto e o evento é **acidente de trânsito**.|q-famerp2023-001,q-famerp2026-004,q-iamspe2023-079]] Quem sofre acidente a caminho do trabalho é atendido **pelo SUS**, que é universal, independentemente de quem é o responsável.

[[Na causa do acidente, a falta do **EPI** não fornecido pela empresa é **condição insegura** (do ambiente ou da organização), e não "ato inseguro" do trabalhador: o médico, ao atender, preenche a CAT e verifica o funcionamento da **CIPA** e o fornecimento de equipamentos.|q-unifesp2023-033,q-famerp2024-010]]`,
          texto: `- **CAT**: emitida pela **empresa**; na omissão, pelo médico assistente, trabalhador, dependentes ou sindicato. {q-adap26-066,q-famerp2025-039}
- A **CAT** e a **notificação no SINAN** são distintas: CAT é previdenciária; o SINAN é de **vigilância**. {q-scmsp2021-087,q-scmsp2026-098}
- **SINAN**: notificar acidente de trabalho **independentemente do vínculo**, da gravidade ou do trajeto. {q-sirio2026-094,q-tp20251-106,q-tp20222-115}
- Motoboy em primeiro emprego atingido a caminho do trabalho: notificar no SINAN em até **24 horas** e emitir a **CAT**. {q-sessp2023-083}
- Amputação de dedo em cozinheiro: notificação **imediata**. {q-unifesp2026-066}
- Desabamento com 10 mortos e 10 feridos: **todos** os casos são notificados. {q-famema2023-007}
- Quatro mortes em temporal (entregador, doméstica, seguranças): **todos** são acidentes de trabalho. {q-famema2025-065}
- **Acidente de trajeto** (casa-trabalho) é acidente do trabalho; desvio para compras = **acidente de trânsito**. {q-famerp2023-001,q-famerp2026-004}
- Classificação: acidente **típico** e de **trajeto**. {q-famerp2024-013}
- Maria, a caminho do trabalho, fratura a fíbula: atendimento pelo **SUS**. {q-iamspe2023-079}
- Estilhaço no olho com óculos no bolso: emitir **CAT** e verificar a **CIPA**. {q-unifesp2023-033}` },
        { id: "at-afastamento-nrs", titulo: "Afastamento, retorno, PCMSO, CIPA e responsabilidades", conferir: true, diretrizes: ["nr-7"],
          questoes: ["q-famerp2024-010","q-famerp2024-011","q-famerp2023-004","q-famerp2023-005","q-famerp2023-006","q-famerp2024-012","q-famerp2024-016","q-didepm-035","q-sirio2025-095","q-famerp2023-003","q-famerp2025-042","q-tp20232-107","q-unicamp2022-072"],
          prosa: `Nos acidentes com afastamento, **a empresa paga os primeiros 15 dias** e a Previdência (**INSS**) o restante; o trabalhador afastado por 78 dias recebe da empresa os 15 primeiros e do INSS os demais. [[O **exame de retorno ao trabalho** do PCMSO (NR-7) é feito **no primeiro dia da volta**, antes de reassumir a função, quando o afastamento foi de **30 dias ou mais** (por doença ou acidente); a alta do INSS não dispensa. Se o retorno tem limitações (lesão de coluna em operador de máquinas pesadas), avalia-se o ambiente e se **adapta a função**.|q-famerp2024-011,q-didepm-035,q-sirio2025-095]]

[[O **PCMSO** (NR-7) prevê exames **admissional, periódico, de retorno, de mudança de risco e demissional**. Para quem **manipula alimentos**, as provas cobraram como complementares **hemograma, urina tipo I, parasitológico e cultura de fezes**; a NR-7 não fixa esse painel: os exames vêm dos riscos do PGR/PCMSO e das normas sanitárias locais.|q-famerp2023-003,q-famerp2025-042]]

[[A **CIPA** (NR-5) é **paritária**: metade dos membros nomeada pela empresa (que designa o presidente) e metade **eleita** pelos empregados; o membro eleito tem **estabilidade**; ela se obriga por empresas com **20 funcionários** ou mais; a CIPA **não julga** responsabilidade, e emite relatório anual das ocorrências. Num acidente com óbito, a perícia da polícia técnica e a reunião de emergência da CIPA são o procedimento correto; na ação indenizatória, o juiz do trabalho determina perícia técnica e **ambas as partes** podem indicar assistentes.|q-famerp2023-006,q-famerp2024-012,q-famerp2024-016,q-famerp2023-004,q-famerp2023-005]]

Na dor lombar relacionada ao trabalho (dor baixa, sem irradiação), a conduta inclui o **afastamento** e a **notificação**; no forneiro com dor no cotovelo, notificar no SINAN como doença relacionada ao trabalho.`,
          texto: `- **Afastamento**: a empresa paga os **15 primeiros dias**; o INSS, o restante. {q-famerp2024-011}
- **Exame de retorno ao trabalho**: no **primeiro dia da volta**, antes de reassumir, se o afastamento foi de **30 dias ou mais**. {q-didepm-035}
- Lesão de coluna e retorno: **avaliar os riscos** do ambiente e adaptar a função. {q-sirio2025-095}
- **PCMSO**: admissional, periódico, retorno, mudança de risco e demissional. {q-famerp2023-003}
- Processamento de alimentos: **hemograma, urina I, parasitológico e cultura de fezes**. {q-famerp2023-003,q-famerp2025-042}
- **CIPA**: 50% indicados pela empresa e 50% eleitos; eleito tem estabilidade; mínimo de **20 funcionários**. {q-famerp2023-006,q-famerp2024-016}
- A CIPA emite relatório **anual** sobre as ocorrências; **não** avalia culpa. {q-famerp2024-012}
- Falta de óculos não fornecidos: **condição insegura** (responsabilidade da empresa). {q-famerp2024-010}
- Óbito em metalúrgica: **perícia da polícia técnica** e reunião de emergência da **CIPA**. {q-famerp2023-004}
- Ação indenizatória: perícia nomeada pelo juiz; **assistentes técnicos** das duas partes. {q-famerp2023-005}
- Dor lombar baixa relacionada ao trabalho: **afastamento** por 30 dias e **notificação**. {q-tp20232-107}
- Forneiro com dor no cotovelo: **notificar no SINAN** como doença relacionada ao trabalho. {q-unicamp2022-072}` },
      ],
    },
    {
      id: "agentes", titulo: "Doenças relacionadas ao trabalho por agente",
      introducao: `[[A pergunta típica descreve a **ocupação e o quadro** e pede o agente ou o diagnóstico; o raciocínio é nexo **ocupação → exposição → lesão no órgão-alvo**. Quem sabe o que o agente faz no corpo deduz o quadro.|q-unicamp2022-074,q-fmabc2024-083]] A conduta comum a todos é a mesma: **afastar da exposição, notificar, emitir a CAT quando há vínculo e propor medidas na fonte** (coletivas) antes do EPI individual.`,
      fragmentos: [
        { id: "ag-ruido", titulo: "Perda auditiva induzida por ruído (PAIR)", conferir: true, diretrizes: ["nr-15","nr-7"],
          questoes: ["q-scmsp2025-088","q-adap23-033","q-amrigs2021-089-ia","q-unicamp2023-066","q-famerp2024-009","q-famerp2025-040","q-famerp2025-041","q-famerp2026-006","q-famerp2026-001","q-famerp2024-014"],
          prosa: `O ruído intenso e prolongado lesiona o **órgão de Corti** (células ciliadas da cóclea), por isso a PAIR é **neurossensorial, geralmente bilateral, irreversível e progressiva**. [[A audiometria mostra, no início, a **"gota acústica"**: queda em 4.000 e 6.000 Hz com **recuperação em 8.000 Hz** e frequências baixas normais.|q-famerp2024-009,q-unicamp2023-066,q-famerp2026-001]] O operador de britadeira que também toca tamborim apresenta PAIR ocupacional (mesmo havendo ruído extraocupacional), e a conduta é tratar, **notificar no SINAN** e elaborar relatório.

[[A **NR-15** fixa **85 dB(A) como limite de tolerância para 8 horas** de jornada, e o tempo máximo cai para **4 horas** quando o nível sobe (90 dB(A)); a exposição acima de 115 dB(A) sem proteção é vedada. A **NR-7** manda fazer a **audiometria na admissão, 6 meses depois e depois anualmente** em quem está exposto acima do limite.|q-amrigs2021-089-ia,q-famerp2024-014]]

[[Com ruído médio de 115 dB, o EPI mais adequado é o **protetor tipo concha**, que atenua mais que o de inserção. No controle, as **medidas coletivas na fonte** (enclausurar, manter a máquina) vêm **antes** do protetor individual.|q-famerp2025-041,q-famerp2026-006,q-adap23-033]] A PAIR é um **acidente do trabalho** (doença do trabalho equiparada) e deve ser comunicada com CAT.`,
          texto: `- **PAIR**: neurossensorial, bilateral, irreversível e progressiva; lesa o **órgão de Corti**. {q-unicamp2023-066,q-famerp2024-009}
- **Gota acústica**: alteração em 4.000 e 6.000 Hz com recuperação em 8.000 Hz. {q-famerp2026-001}
- **NR-15**: **85 dB(A)** para 8 horas; o tempo diminui com o aumento do nível; acima de 115 dB(A), sem proteção, é vedado. {q-amrigs2021-089-ia}
- **Audiometria** (NR-7): admissão, 6 meses depois e **anual**. {q-famerp2024-014}
- Operador de britadeira há 38 anos: **PAIR ocupacional**, notificar no SINAN, relatório. {q-scmsp2025-088}
- Operador de prensa com zumbido: **notificar, emitir CAT, afastar** e propor **medidas coletivas na fonte** antes do protetor. {q-adap23-033}
- Perda auditiva em siderúrgico: **acidente do trabalho** (doença do trabalho). {q-famerp2025-040}
- Ruído médio de 115 dB: protetor **tipo concha**. {q-famerp2025-041,q-famerp2026-006}` },
        { id: "ag-agrotoxicos", titulo: "Agrotóxicos: organofosforados, carbamatos e glifosato", conferir: true, diretrizes: ["nr-7"],
          questoes: ["q-famerp2026-008-ia","q-sessp2026-097","q-unicamp2023-072","q-unicampdis2024-110","q-unicampdis2024-116","q-unicampdis2024-118","q-unicampdis2023-060"],
          prosa: `Os **organofosforados e carbamatos** inibem a **acetilcolinesterase**, o que acumula acetilcolina nas sinapses: [[o quadro é **colinérgico** (salivação, sudorese, bradicardia, broncorreia, roncos e sibilos, miose, fraqueza e fasciculações) e o **tratamento agudo é a atropina**, que bloqueia os receptores muscarínicos ("atropinização"); a **pralidoxima** reativa a enzima nos organofosforados.|q-unicampdis2024-110,q-unicampdis2024-116,q-sessp2026-097]]

[[O **indicador biológico** da exposição (NR-7, Quadro 1) é a atividade da **acetilcolinesterase eritrocitária** (colinesterase "verdadeira") ou da butirilcolinesterase plasmática, que está **reduzida** em quem se expõe; ela vale também para investigar a esposa que lava as roupas contaminadas.|q-famerp2026-008-ia,q-sessp2026-097,q-unicampdis2024-118]]

[[Quando trabalhadores de uma horta têm tontura, cefaleia, cansaço e náuseas, e um colega tem sintomas semelhantes, a conduta é **solicitar exames, afastar da exposição e investigar as condições de trabalho e os produtos usados**, em vez de apenas tratar sintomas ou notificar intoxicação crônica. O parkinsonismo secundário em vigilante que aplicou herbicida levou à suspeita do **glifosato**.|q-unicamp2023-072,q-unicampdis2023-060]]`,
          texto: `- **Organofosforados e carbamatos**: inibem a acetilcolinesterase; quadro **colinérgico**. {q-unicampdis2024-110,q-sessp2026-097}
- **Antídoto** na fase aguda: **atropina** (atropinização). {q-unicampdis2024-116}
- **Indicador biológico** (NR-7): **acetilcolinesterase eritrocitária** ou butirilcolinesterase plasmática, **reduzida**. {q-famerp2026-008-ia,q-sessp2026-097}
- Investigação da exposição da esposa que lava as roupas: **acetilcolinesterase eritrocitária**. {q-unicampdis2024-118}
- Trabalhadores de horta com sintomas semelhantes: **exames, afastar e investigar** condições e produtos. {q-unicamp2023-072}
- Vigilante com parkinsonismo secundário que aplicou herbicida: **glifosato**. {q-unicampdis2023-060}` },
        { id: "ag-metais-quimicos", titulo: "Metais, solventes e outros agentes químicos", conferir: true,
          questoes: ["q-famerp2024-015","q-unicampdis2023-056","q-famerp2026-003","q-famerp2023-012","q-famerp2022-009","q-unicampdis2022-059","q-fmabc2024-083","q-unicampdis2023-055","q-unicampdis2024-119"],
          prosa: `[[O **cromo** (vapor ou névoa, em linhas de aço inoxidável e cromagem) é irritante e corrosivo: causa **úlcera e perfuração do septo nasal**, crostas, epistaxe e dermatite, e é carcinógeno do pulmão. O **níquel** causa **dermatite alérgica de contato** nos pontos de contato com metais (brincos, relógio, botão da calça).|q-famerp2024-015,q-unicampdis2023-056,q-famerp2026-003]]

[[O **chumbo** (cerâmica, baterias, tintas) causa o **saturnismo**: cólica abdominal, palidez (anemia), neuropatia. Exames: **chumbo no sangue (plumbemia)** e **ácido delta-aminolevulínico urinário**; o **tolueno** é monitorado pelo **ácido hipúrico** e a metil-etil-cetona pela própria substância urinária; o **ruído** (audiometria) entra no mesmo pacote do pintor a revólver.|q-unicampdis2022-059,q-famerp2023-012]] [[Na coqueria, o conjunto de monitoramento inclui hemograma, ácido metil-hipúrico urinário e audiometria.|q-famerp2022-009]]

[[As **aminas aromáticas** dos corantes na indústria têxtil causam **câncer de bexiga**. Mecânicos com graxas e óleos sem EPI têm a **elaioconiose** (dermatite folicular com "pontos pretos"). A radiação ultravioleta e a solda lesam o olho (**catarata, conjuntivite, ceratite**).|q-fmabc2024-083,q-unicampdis2023-055,q-unicampdis2024-119]]`,
          texto: `- **Cromo**: perfuração do **septo nasal**, crostas, epistaxe (linha de aço inoxidável). {q-famerp2024-015,q-unicampdis2023-056}
- **Níquel**: dermatite alérgica de contato (brincos, relógio, botão). {q-famerp2026-003}
- **Chumbo**: saturnismo (cólica, palidez); **plumbemia** e **ALA urinário**. {q-unicampdis2022-059,q-famerp2023-012}
- **Tolueno**: ácido hipúrico urinário; ruído: audiometria. {q-famerp2023-012}
- Coqueria: hemograma, ácido metil-hipúrico e audiometria. {q-famerp2022-009}
- **Corantes têxteis** (aminas aromáticas): **câncer de bexiga**. {q-fmabc2024-083}
- **Elaioconiose** (graxas e óleos): dermatite folicular em mecânicos. {q-unicampdis2023-055}
- Solda e radiação: **catarata, conjuntivite ou ceratite**. {q-unicampdis2024-119}` },
        { id: "ag-respiratorio-musculo-mental", titulo: "Doenças respiratórias, musculoesqueléticas e do sofrimento mental relacionadas ao trabalho", conferir: true,
          questoes: ["q-unesp2021-088","q-unicampdis2025-092","q-unicampdis2024-120","q-tp20241-104","q-unicampdis2025-043","q-unesp2025-083","q-unesp2025-084","q-unicampdis2022-054","q-unicampdis2022-055","q-unesp2023-093","q-unicamp2022-073"],
          prosa: `[[A **asma ocupacional** é a que aparece **pela primeira vez em adulto sem antecedente**, causada por agente do trabalho (poeira de madeira no carpinteiro, farinha no padeiro); a **asma relacionada ao trabalho** é a asma preexistente **desencadeada ou agravada** no trabalho. O sinal é melhorar nos fins de semana e nas férias, e a conduta inclui afastar do agente.|q-unesp2021-088,q-unicampdis2025-092]] [[A **sílica livre** causa **silicose**, **câncer de pulmão** e a **síndrome de Caplan** (nódulos pulmonares em artríticos).|q-unicampdis2024-120]]

[[As **lesões por esforço e posturas** têm nexo com o gesto: o roçador que opera roçadeira de cabo longo desenvolve **hérnia de disco lombar**; o operador que eleva peças de modo repetitivo, a **síndrome do impacto do ombro**; o montador de calçados, a síndrome do túnel do carpo. Quando o trabalho causa dano, a notificação é compulsória.|q-tp20241-104,q-unicampdis2025-043]]

[[A **saúde mental** também se relaciona ao trabalho. O **esgotamento profissional (burnout)** com depressão aparece após reestruturações, ameaças de demissão e desmoralização; o **assédio moral** (humilhação, ranking de vendas e ameaça de demissão em banco) leva a ideação suicida; e o **uso abusivo de álcool e drogas** surge ou se intensifica como **recurso para enfrentar** situações difíceis do trabalho.|q-unesp2025-083,q-unicampdis2022-054,q-unicampdis2022-055,q-unesp2025-084]] [[Nos trabalhadores da saúde, a covid-19 aumentou com longas jornadas, privação de sono e dificuldade de acesso a proteções individuais; a covid relacionada ao trabalho é notificada no SINAN quando há exposição possível no trabalho.|q-unesp2023-093,q-unicamp2022-073]]`,
          texto: `- **Asma ocupacional**: início em adulto sem antecedente; **relacionada ao trabalho**: preexistente, desencadeada ou agravada. {q-unesp2021-088}
- Carpinteiro com dispneia e chiado, melhora longe do trabalho: **asma ocupacional**. {q-unicampdis2025-092}
- **Sílica**: câncer de pulmão e **síndrome de Caplan**. {q-unicampdis2024-120}
- Roçador com esforço postural: **hérnia de disco lombar**. {q-tp20241-104}
- Operador com elevação repetitiva de peças: **síndrome do impacto do ombro**. {q-unicampdis2025-043}
- **Burnout** e depressão após reestruturação e ameaça de demissão. {q-unesp2025-083,q-unicampdis2022-054}
- **Assédio moral**: ranking de vendas com ameaça de demissão; ideação suicida. {q-unicampdis2022-055}
- Álcool e drogas: uso iniciado ou intensificado como **recurso** diante de situações difíceis do trabalho. {q-unesp2025-084}
- Covid em profissionais de saúde: jornadas longas, privação de sono e falta de EPI. {q-unesp2023-093}
- Covid relacionada ao trabalho: **notificar no SINAN** os casos com exposição possível no trabalho. {q-unicamp2022-073}` },
      ],
    },
    {
      id: "armadilhas", titulo: "Armadilhas e divergências entre provas",
      introducao: `Aqui ficam as respostas que mudam de banca para banca ou que contrariam a regra mais simples. Em cada item, primeiro a regra que se deve aprender; depois, o que a prova cobrou. O gabarito nunca é alterado para caber no resumo.`,
      fragmentos: [
        { id: "arm-divergencias", titulo: "A regra e o que a prova cobrou", conferir: true,
          questoes: ["q-scmsp2026-098","q-famerp2023-001","q-famerp2024-016","q-tp20251-106"],
          prosa: `[[A regra é que o acidente de trabalho tem **duas** providências, a CAT e a notificação no SINAN; a Santa Casa de 2026 deu como correta só "emitir a CAT" no caso da auxiliar de limpeza que escorregou no supermercado, enquanto as demais bancas pedem as duas.|q-scmsp2026-098,q-tp20251-106]] [[A regra de **trajeto** é a do percurso habitual; a FAMERP deu "acidente de trânsito" para o desvio para fazer compras.|q-famerp2023-001]] [[A CIPA é obrigatória a partir de 20 empregados na prova da FAMERP 2024; o dimensionamento da NR-5 depende do grau de risco e do número de empregados.|q-famerp2024-016]]`,
          texto: `- Regra: CAT e notificação no SINAN são providências distintas; a prova (SCMSP 2026) cobrou só **emitir a CAT**. {q-scmsp2026-098}
- Regra: para o trabalhador informal, a notificação no SINAN vale como acidente de trabalho; a prova (TP 2025) cobrou **notificar como acidente de trabalho**. {q-tp20251-106}
- Regra: trajeto = percurso habitual; a prova (FAMERP 2023) cobrou **acidente de trânsito** no desvio para compras. {q-famerp2023-001}
- Regra: o dimensionamento da CIPA depende do grau de risco; a prova (FAMERP 2024) cobrou **20 funcionários**. {q-famerp2024-016}` },
      ],
    },
  ],
});
