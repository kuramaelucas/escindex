/* resumos/abdome-agudo-rn/resumo.js — resumo adaptativo de abdome agudo e malformações digestivas do
   recém-nascido: atresia de esôfago, estenose hipertrófica do piloro, atresias intestinais, má rotação
   com volvo, Hirschsprung, malformação anorretal e VACTERL, enterocolite necrosante, defeitos de parede
   (onfalocele × gastrosquise), hérnia diafragmática e anomalias do ducto onfalomesentérico.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- abdome-agudo-rn */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "abdome-agudo-rn",
  titulo: "Abdome agudo e malformações digestivas do recém-nascido",
  assunto: "ass-neo-malformacoesdigestivas",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "cirurgia-pediatrica", texto: "Tratado de cirurgia pediátrica (malformações digestivas e da parede abdominal)", lidoEm: null },
    { id: "sbp-ecn", texto: "Sociedade Brasileira de Pediatria — Enterocolite necrosante (documento científico)", lidoEm: null },
  ],
  foraDoEscopo: [
    { motivo: "Anulada: sem gabarito para medir o erro", questoes: ["q-unifesp2025-007"] },
  ],
  doencas: [
    {
      id: "alta", titulo: "Esôfago e estômago",
      introducao: `[[O feto engole o líquido amniótico; quando o esôfago é interrompido ele não consegue, e o líquido sobra: polidrâmnio na gestação e, ao nascer, saliva que escorre pela boca e uma sonda que não passa.|q-famerp2025-060,q-simepm89-094,q-usp2022-072]] [[O tipo mais comum é o C, com o coto superior em fundo cego e uma fístula do esôfago distal com a traqueia; o ar no estômago na radiografia mostra que a fístula existe.|q-fmabc2026-034,q-adap25-007,q-uspsp3-035]]

[[Na estenose hipertrófica do piloro, o músculo pilórico engrossa nas primeiras semanas e fecha a saída do estômago: o vômito é em jato, sem bile, e a perda de suco gástrico leva embora ácido clorídrico, daí a alcalose metabólica hipoclorêmica.|q-usprp2025-093,q-fmabc2024-052,q-tp20202-068]]`,
      fragmentos: [
        { id: "alt-esofago", titulo: "Atresia de esôfago", conferir: true,
          figuras: [{ arquivo: "figuras/nivel-obstrucao.svg", legenda: "Esquema autoral: o nível da obstrução pelo vômito, pela idade e pela radiografia." }],
          questoes: ["q-famerp2025-060","q-simepm89-094","q-usp2022-072","q-usp2024-013","q-fmabc2026-034","q-adap25-007","q-uspsp3-035"],
          casos: ["q-uspsp3-035","q-fmabc2026-034"],
          texto: `- **Polidrâmnio** e **salivação abundante** ao nascer: **atresia de esôfago**. {q-famerp2025-060,q-simepm89-094}
- Conduta imediata: **passar sonda**; confirma com **radiografia de tórax e abdome com a sonda** (enrolada no coto). {q-simepm89-094,q-usp2022-072,q-usp2024-013,q-uspsp3-035}
- Tipo mais comum: **C** (fístula traqueoesofágica distal). {q-fmabc2026-034}
- Antes da cirurgia: **jejum, cabeceira elevada e aspiração contínua do coto** (sonda de duplo lúmen). {q-adap25-007}` },
        { id: "alt-piloro", titulo: "Estenose hipertrófica do piloro", conferir: true,
          questoes: ["q-scmsp2025-055","q-usprp2022-028","q-tp20202-068","q-fmabc2021-020","q-usprp2025-093","q-fmabc2024-052","q-unesp2023-013","q-uspsp4-071"],
          casos: ["q-uspsp4-071"],
          texto: `- Lactente de **2 a 6 semanas** com **vômito em jato, não bilioso**, fome e perda de peso: **estenose hipertrófica do piloro**. {q-scmsp2025-055,q-usprp2022-028,q-tp20202-068}
- Exame: **oliva palpável** no epigástrio e **ondas peristálticas** visíveis. {q-scmsp2025-055,q-fmabc2021-020,q-tp20202-068}
- Gasometria: **alcalose metabólica hipoclorêmica**. {q-usprp2025-093,q-fmabc2024-052}
- Diagnóstico: **ultrassom** (alta sensibilidade), que mostra o músculo pilórico espessado e alongado. {q-unesp2023-013,q-uspsp4-071}` },
      ],
    },
    {
      id: "intestino", titulo: "Obstruções do intestino",
      introducao: `[[Vômito bilioso no recém-nascido significa obstrução abaixo da papila duodenal, e a causa que não pode esperar é o volvo de intestino médio: na má rotação, o intestino fica preso por uma base estreita, gira sobre a artéria mesentérica e necrosa em horas.|q-adap24-064,q-unifesp2024-019]] [[Na atresia duodenal, ar no estômago e no duodeno dilatados faz a dupla bolha, sem gás adiante; quanto mais baixa a atresia, mais alças distendidas.|q-adap25-006,q-unifesp2025-006]]

[[No Hirschsprung faltam as células ganglionares no segmento final do cólon, que fica contraído e não deixa as fezes passarem: o mecônio atrasa, o cólon de cima dilata e o toque retal provoca saída explosiva.|q-tp20251-078,q-tp20261-096,q-tp20212-061,q-adap21-087]]`,
      fragmentos: [
        { id: "int-alta", titulo: "Atresias e volvo", conferir: true, diretrizes: ["cirurgia-pediatrica"],
          questoes: ["q-adap25-006","q-unifesp2025-006","q-adap24-064","q-unifesp2024-019","q-fmabc2024-032"],
          texto: `- **Dupla bolha** sem gás distal: **atresia duodenal** (abaixo da papila de Vater). {q-adap25-006}
- Vômitos biliosos, grande distensão, mecônio presente: **atresia jejunal**. {q-unifesp2025-006}
- Vômito bilioso, choque e sangue nas fezes: **volvo por má rotação**; ressuscitar e **laparotomia (Ladd)** de urgência. {q-adap24-064,q-unifesp2024-019}
- Intestino curto após ressecções: **Bianchi** (alongamento) para ganhar superfície. {q-fmabc2024-032}` },
        { id: "int-hirschsprung", titulo: "Doença de Hirschsprung", conferir: true,
          questoes: ["q-tp20251-078","q-tp20261-096","q-tp20212-061","q-adap21-087","q-unesp2021-076","q-tp20252-074","q-unicampdis2024-016","q-usprp2025-089","q-unesp2024-072","q-usprp2021-095"],
          casos: ["q-unicampdis2024-016","q-usprp2021-095"],
          texto: `- Defeito: **ausência de células ganglionares** (plexos mioentérico e submucoso) no segmento distal. {q-tp20251-078,q-tp20261-096}
- **Mecônio após 48 h**, distensão e **saída explosiva** ao toque ou estímulo: **Hirschsprung**. {q-tp20212-061,q-tp20252-074,q-unicampdis2024-016}
- Padrão-ouro: **biópsia retal por sucção**; lavagens até a cirurgia. {q-adap21-087,q-unesp2021-076}
- Complicação temida: **enterocolite** (febre, distensão, diarreia), inclusive após a cirurgia; **lavagem intestinal** e antibiótico. {q-usprp2025-089,q-unesp2024-072,q-usprp2021-095}` },
        { id: "int-anorretal", titulo: "Malformação anorretal e VACTERL", conferir: true,
          questoes: ["q-uspsp5-104","q-usprp2021-087"],
          texto: `- Ânus ausente com anomalia vertebral, de membro ou cardíaca: **VACTERL**; conduta inicial, **sonda nasogástrica** (descompressão). {q-uspsp5-104}
- Menina com orifício perineal único (cloaca) e massa abdominal: **hidronefrose** associada. {q-usprp2021-087}` },
      ],
    },
    {
      id: "ecn", titulo: "Enterocolite necrosante",
      introducao: `[[A enterocolite necrosante atinge o prematuro alimentado: a mucosa imatura, a circulação instável e a flora anormal permitem que bactérias invadam a parede, e o gás que produzem aparece na radiografia como pneumatose.|q-unifesp2022-011,q-unicampdis2025-065,q-adap22-011]] [[O leite humano é a medida com melhor evidência para preveni-la.|q-didepm-019]]`,
      fragmentos: [
        { id: "ecn-tudo", titulo: "Quadro, tratamento e prevenção", conferir: true, diretrizes: ["sbp-ecn"],
          questoes: ["q-unifesp2022-011","q-unicampdis2025-065","q-adap22-011","q-didepm-019","q-unifesp2024-019"],
          texto: `- Prematuro com distensão, sangue nas fezes, vômito bilioso, parede abdominal brilhante: **enterocolite necrosante**. {q-unifesp2022-011,q-unicampdis2025-065}
- Tratamento clínico: **jejum, sonda gástrica aberta e antibióticos**. {q-unifesp2022-011,q-unicampdis2025-065}
- **Pneumoperitônio** (ar livre): **laparotomia** com ressecção e estomias. {q-adap22-011}
- Prevenção: **leite humano**, dieta trófica precoce e progressão lenta. {q-didepm-019}
- Prematuro grave que piora com distensão: pensar em **ECN ou volvo**. {q-unifesp2024-019}` },
      ],
    },
    {
      id: "parede", titulo: "Defeitos da parede abdominal, diafragma e umbigo",
      introducao: `[[A onfalocele é o intestino que não voltou para o abdome no fim da 10ª semana: fica coberto por membrana, com o cordão no ápice, e se associa a outras malformações e síndromes (Beckwith-Wiedemann, cardiopatias).|q-tp20212-008,q-unesp2026-074,q-adap21-095,q-fmabc2026-035]] [[A gastrosquise é um defeito ao lado do cordão, sem membrana: as alças ficam expostas e perdem calor e água, e por isso são envolvidas em plástico logo ao nascer.|q-famema2021-093,q-adap26-002]]

[[Na hérnia diafragmática de Bochdalek, à esquerda e posterior, as alças sobem para o tórax durante a vida fetal e o pulmão daquele lado não se desenvolve: ao nascer, desconforto grave, abdome escavado e coração desviado para a direita.|q-tp20232-065,q-tp20241-065,q-didepm-064]]`,
      fragmentos: [
        { id: "par-defeitos", titulo: "Onfalocele × gastrosquise", conferir: true, diretrizes: ["cirurgia-pediatrica"],
          questoes: ["q-tp20212-008","q-unesp2026-074","q-adap21-095","q-fmabc2026-035","q-famema2021-093","q-adap26-002","q-tp20222-068"],
          casos: ["q-unesp2026-074","q-tp20222-068"],
          prosa: `| | Onfalocele | Gastrosquise |
|---|---|---|
| Local | **na linha média**, no umbigo | **à direita do cordão** |
| Cobertura | **membrana** (saco), cordão no ápice | **sem membrana**, alças expostas e espessadas |
| Malformações associadas | **frequentes** (cardíacas, Beckwith-Wiedemann) | raras (atresia intestinal) |
| Primeiros cuidados | cobrir o saco, sonda, glicose se hipoglicemia | **envolver em plástico**, sonda, acesso e volume |`,
          texto: `- **Onfalocele**: falha do retorno das alças no fim da **10ª semana**; **cordão no ápice** do saco. {q-tp20212-008,q-unesp2026-074,q-fmabc2026-035}
- Onfalocele com macroglossia e **hipoglicemia**: **Beckwith-Wiedemann**; cobrir o saco e dar glicose. {q-adap21-095}
- **Gastrosquise**: alças expostas ao lado do cordão; **envelopar em plástico**, sonda aberta, acesso e volume. {q-famema2021-093,q-adap26-002}
- Defeito exposto: cobrir com compressas estéreis úmidas e mornas até o cirurgião. {q-tp20222-068}` },
        { id: "par-diafragma-umbigo", titulo: "Hérnia diafragmática e ducto onfalomesentérico", conferir: true,
          questoes: ["q-tp20232-065","q-tp20241-065","q-didepm-064","q-unifesp2026-002","q-fmabc2023-021","q-uspsp3-034"],
          casos: ["q-tp20241-065"],
          texto: `- Desconforto ao nascer, alças no hemitórax esquerdo e coração à direita: **hérnia de Bochdalek**. {q-tp20232-065,q-tp20241-065}
- Conduta: **intubar logo** (não ventilar com máscara), sonda orogástrica aberta, estabilizar e operar depois. {q-didepm-064}
- Secreção fecaloide pelo umbigo: **persistência do ducto onfalomesentérico**. {q-unifesp2026-002}
- Parte intestinal do ducto que persiste: **divertículo de Meckel**. {q-fmabc2023-021}
- Colestase com o sinal do cordão triangular no US: atresia biliar, **portoenteroanastomose (Kasai)**. {q-uspsp3-034}` },
      ],
    },
  ],
});
