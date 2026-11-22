/* resumos/crescimento-puberdade/resumo.js — resumo adaptativo de crescimento, baixa estatura,
   puberdade (normal, variantes benignas e precoce) e avaliação nutricional do escolar e do adolescente.
   Molde e regras: resumos/LEIA-ME.md. Conferência: npm run resumo -- crescimento-puberdade */
(window.EscResumos = window.EscResumos || { lista: [], registrar(r){ this.lista.push(r); } }).registrar({
  id: "crescimento-puberdade",
  titulo: "Crescimento e puberdade",
  assunto: "ass-crescimentopuberdade",
  criadoEm: "2026-11-18",
  fontes: [
    { id: "oms-crescimento", texto: "OMS — Padrões de crescimento (2006) e referências de 5 a 19 anos (2007)", lidoEm: null },
    { id: "ms-caderneta", texto: "Ministério da Saúde — Caderneta da Criança e Caderneta do Adolescente", lidoEm: null },
    { id: "sbp-obesidade", texto: "Sociedade Brasileira de Pediatria — Manual de Orientação: Obesidade na infância e adolescência", lidoEm: null },
    { id: "sbp-puberdade", texto: "Sociedade Brasileira de Pediatria — Puberdade precoce e Adrenarca precoce e telarca precoce (documentos científicos do Departamento de Endocrinologia) e Avaliação do crescimento: o que o pediatra precisa saber, sbp.com.br", lidoEm: "2026-11-22" },
  ],
  foraDoEscopo: [
    { motivo: "Anuladas: sem gabarito para medir o erro (as reposições -ia estão nas seções)",
      questoes: ["q-usprp2023-059","q-amrigs2024-066","q-einstein2025-044"] },
  ],
  doencas: [
    {
      id: "crescimento", titulo: "Como avaliar o crescimento",
      introducao: `[[O crescimento é contínuo, mas não tem velocidade constante: é rápido no primeiro ano, desacelera até um ritmo estável de cerca de 5 a 6 cm por ano na infância e acelera de novo no estirão puberal.|q-amrigs2021-061]] Cada fase tem um motor diferente: a nutrição domina o primeiro ano, o eixo do hormônio de crescimento e a tireoide dominam a infância, e os esteroides sexuais somam-se ao GH na puberdade.

[[Uma medida isolada diz pouco; o que separa o normal do doente é a velocidade de crescimento, porque a criança saudável segue o seu canal e a doença a faz cruzar canais para baixo.|q-sirio2021-055,q-unicamp2022-039,q-einstein2027-035]] Duas outras referências completam a leitura: a **altura-alvo**, que diz onde a genética dos pais coloca a criança, e a **idade óssea**, que mostra quanto crescimento ainda resta. [[Quanto mais atrasada a idade óssea em relação à cronológica, mais tempo de crescimento a criança ainda tem pela frente.|q-unicampdis2024-095,q-udisc20262-055]]

Veja também: **Puericultura** (curvas e consulta) e **Tireoidopatias**.`,
      fragmentos: [
        { id: "cre-ferramentas", titulo: "Canal, velocidade, alvo e idade óssea", conferir: false, diretrizes: ["oms-crescimento","ms-caderneta"],
          questoes: ["q-amrigs2021-061","q-sirio2021-055","q-unicamp2022-039","q-einstein2027-035","q-iamspe2026-078","q-einstein2023-039","q-famema2022-084","q-sirio2025-049","q-unicampdis2024-095","q-udisc20262-055","q-sessp2025-054"],
          casos: ["q-einstein2023-039"],
          prosa: `Uma medida isolada diz onde a criança está; duas medidas separadas por meses dizem para onde ela vai. Por isso a **velocidade** é o dado mais importante: a criança baixa que cresce na velocidade normal segue seu canal genético; a que desacelera e cruza canais tem algo freando o crescimento. A idade óssea diz quanto crescimento ainda resta, porque o fim é o fechamento das cartilagens.`,
          texto: `- O crescimento é **constante, com velocidade variável**. {q-amrigs2021-061}
- Melhor parâmetro para o prognóstico e para decidir investigar: **velocidade de crescimento**. {q-sirio2021-055,q-unicamp2022-039}
- **Cruzar dois canais para baixo** justifica investigar, mesmo com a estatura ainda dentro da faixa normal. {q-einstein2027-035,q-iamspe2026-078,q-einstein2023-039}
- Criança pequena e saudável numa consulta: **marcar retorno em 4 a 6 meses** para medir a velocidade. {q-famema2022-084}
- **Altura-alvo**: média das alturas dos pais, **−6,5 cm na menina** e **+6,5 cm no menino**, com variação de **±5 cm**. {q-sirio2025-049}
- Idade óssea mais atrasada = **mais crescimento pela frente**; ela **não** atrasa na pseudopuberdade precoce (avança). {q-unicampdis2024-095,q-udisc20262-055}
- A adolescência forma **50 a 75% da massa óssea** do adulto. {q-sessp2025-054}` },
      ],
    },
    {
      id: "baixa-estatura", titulo: "Baixa estatura",
      introducao: `Baixa estatura é a estatura abaixo do percentil 3 (escore z −2). A maioria dessas crianças é **saudável**: ou herdou a altura dos pais, ou amadurece mais devagar. [[Na baixa estatura familiar, a criança é baixa porque os pais são baixos: cresce com velocidade normal, a idade óssea acompanha a cronológica e a altura final fica dentro do alvo.|q-adap24-097,q-famerp2025-059,q-usprp2026-023]] [[No atraso constitucional, o relógio biológico está atrasado: a idade óssea atrasa junto com a puberdade, a criança cresce por mais tempo e chega a uma altura final normal; costuma haver um pai ou mãe que amadureceu tarde.|q-unifesp2024-098,q-usprp2023-059-ia,q-didepm-059,q-fmabc2024-047]]

[[A causa patológica se denuncia pela velocidade baixa: hipotireoidismo, doença renal, doenças crônicas e déficit de GH freiam o crescimento e atrasam a idade óssea.|q-adap25-096,q-unicampdis2024-035,q-unifesp2025-096]] [[As síndromes genéticas e as displasias esqueléticas mostram desproporção corporal ou dismorfismos, e na menina baixa sem explicação é preciso pensar em Turner.|q-usprp2022-098,q-usprp2021-046]]`,
      fragmentos: [
        { id: "bxe-variantes", casos: ["q-usprp2026-023"], titulo: "Familiar × constitucional", conferir: true,
          questoes: ["q-adap24-097","q-famerp2025-059","q-usprp2026-023","q-unifesp2024-098","q-usprp2023-059-ia","q-didepm-059","q-fmabc2024-047","q-simepm89-095"],
          prosa: `| | Baixa estatura familiar | Atraso constitucional |
|---|---|---|
| Pais | **baixos** | estatura normal; um deles amadureceu **tarde** |
| Velocidade de crescimento | normal | normal (desacelera antes da puberdade tardia) |
| Idade óssea | **igual** à cronológica | **atrasada** |
| Puberdade | na idade normal | **tardia** |
| Altura final | baixa, **dentro do alvo** | **normal**, dentro do alvo |`,
          texto: `- Pais baixos, velocidade normal, **idade óssea = cronológica**: **baixa estatura familiar**, seguimento. {q-adap24-097,q-famerp2025-059,q-usprp2026-023}
- Velocidade normal, **idade óssea atrasada**, puberdade atrasada, pai/mãe que amadureceu tarde: **atraso constitucional**, seguimento. {q-unifesp2024-098,q-usprp2023-059-ia,q-didepm-059}
- Exame que confirma o atraso constitucional: **radiografia de punho (idade óssea)**. {q-fmabc2024-047}
- Atraso constitucional que sofre muito: **ciclo curto de testosterona** é opção. {q-didepm-059}
- Estatura em z 0 e pais preocupados: **desenvolvimento normal**. {q-simepm89-095}` },
        { id: "bxe-patologica", casos: ["q-usprp2022-098"], titulo: "Quando é doença", conferir: true,
          questoes: ["q-adap25-096","q-unicampdis2024-035","q-unifesp2025-096","q-usprp2022-098","q-usprp2021-046","q-amrigs2023-077"],
          casos: ["q-usprp2021-046"],
          prosa: `Doença que freia o crescimento costuma frear também a maturação óssea e aparecer com outros sinais: hormônio (hipotireoidismo, falta de GH, excesso de cortisol), doença crônica (rim, intestino, coração) ou alteração genética (Turner, displasias). A desproporção entre tronco e membros aponta para o osso; o FSH alto na menina baixa aponta para o ovário que não funciona.`,
          texto: `- Velocidade baixa com **idade óssea muito atrasada**: começar por **TSH e T4 livre**. {q-adap25-096}
- Parada de crescimento com apatia, pele seca, bradicardia e mixedema: **hipotireoidismo adquirido**. {q-unicampdis2024-035}
- Antecedente de oligoidrâmnio e baixa estatura: investigar **função renal** (urina, ureia, creatinina, eletrólitos). {q-unifesp2025-096}
- **Desproporção corporal** (relação segmento superior/inferior alterada): **displasia esquelética**. {q-usprp2022-098}
- Menina baixa com **FSH alto**: **cariótipo** (síndrome de Turner). {q-usprp2021-046}
- Turner e Klinefelter: hipogonadismo **hipergonadotrófico** nas duas. {q-amrigs2023-077}` },
      ],
    },
    {
      id: "puberdade", titulo: "Puberdade normal",
      introducao: `A puberdade começa quando o hipotálamo passa a liberar GnRH em pulsos, que estimulam LH e FSH e, por eles, as gônadas. [[O primeiro sinal é o efeito do estrogênio ou da testosterona sobre o órgão-alvo mais sensível: a mama na menina (telarca, de 8 a 13 anos) e o testículo no menino (volume de 4 mL ou mais, de 9 a 14 anos).|q-fmabc2025-054,q-sessp2026-078,q-scmsp2021-048]]

[[A sequência feminina é previsível: telarca, pico de velocidade de crescimento cedo (por volta de M2-M3), depois desaceleração e só então a menarca, em média 2 anos após a telarca.|q-famema2023-086,q-scmsp2025-045,q-usp2024-022]] [[No menino o estirão é tardio, em G4: por isso o menino que começou a puberdade ainda não acelerou o crescimento.|q-usp2024-023]] Os pelos (pubarca, axilar) e o odor dependem dos andrógenos da suprarrenal, um eixo à parte (adrenarca).`,
      fragmentos: [
        { id: "pub-tanner", figuras: [{ arquivo: "figuras/tanner.svg", legenda: "Esquema autoral: os estágios de mama e genital e o momento do estirão." }], titulo: "Estágios de Tanner", conferir: true,
          questoes: ["q-fmabc2025-054","q-amrigs2020-063","q-famerp2023-026","q-einstein2025-038","q-sirio2023-051","q-famema2025-047","q-usp2024-022","q-usp2024-023"],
          prosa: `A puberdade começa quando o hipotálamo passa a liberar GnRH em pulsos: LH e FSH sobem e as gônadas produzem estrogênio e testosterona. Por isso o primeiro sinal é da gônada (mama na menina, testículo de 4 mL no menino); os pelos dependem também dos andrógenos da suprarrenal.`,
          texto: `- Primeiro sinal: **telarca** na menina, **aumento do volume testicular** no menino. {q-fmabc2025-054}
- Menino: **G2** aumento testicular e pele do escroto; **G3** pênis cresce em **comprimento**; **G4** em **diâmetro**. {q-amrigs2020-063}
- **G2P2**: testículos aumentados, escroto pigmentado, poucos pelos longos na base do pênis; normal aos 12 anos. {q-famerp2023-026,q-einstein2025-038}
- **M2**: broto mamário (pode começar de um lado só). {q-sirio2023-051}
- **M4**: aréola e papila formam um **segundo contorno** sobre a mama; a menarca está próxima. {q-famema2025-047}
- Volume testicular **< 4 mL** = pré-púbere (G1). {q-usp2024-023}
- Menina em **M3** está no **pico do estirão**. {q-usp2024-022}` },
        { id: "pub-sequencia", titulo: "Sequência e tempos", conferir: true,
          questoes: ["q-famema2023-086","q-scmsp2025-045","q-scmsp2021-048","q-sessp2026-078","q-usp2024-023"],
          prosa: `O estirão vem cedo na menina (por volta de M2–M3) e tarde no menino (G4); a menarca chega depois do pico de velocidade, quando o crescimento já desacelera. Essa ordem explica por que a menina que menstruou cresce pouco mais e por que o menino que ainda não fez G4 tem estirão pela frente.`,
          texto: `- Depois de M2P2 ainda vêm: **pico de velocidade → desaceleração → menarca**. {q-famema2023-086}
- Telarca na idade normal **não** é precoce; a menarca vem **18 a 24 meses** depois. {q-scmsp2025-045}
- Telarca e pubarca a partir dos 8 anos na menina: **puberdade normal**. {q-scmsp2021-048,q-sessp2026-078}
- Menino G1P1 ainda **não** iniciou a puberdade nem o estirão. {q-usp2024-023}` },
      ],
    },
    {
      id: "variantes", titulo: "Variantes benignas: telarca, adrenarca e ginecomastia",
      introducao: `Nem todo sinal puberal precoce é puberdade precoce. [[Na telarca precoce isolada, há só mama, sem pelos, sem aceleração do crescimento e com idade óssea igual à cronológica, porque o eixo não foi ativado; a conduta é reavaliar a cada 3 a 4 meses.|q-tp20232-038,q-tp20252-050,q-tp20261-014,q-uspsp5-030,q-usprp2022-051]]

[[Na adrenarca prematura, a suprarrenal amadurece cedo e produz andrógenos fracos: surgem pelos pubianos e odor axilar, sem mama, sem aumento testicular e sem aceleração importante do crescimento.|q-scmsp2026-044,q-usprp2025-026,q-tp20241-039]] [[A ginecomastia do menino púbere vem do desequilíbrio transitório entre estrogênio e testosterona e regride sozinha na maioria.|q-tp20252-076]]`,
      fragmentos: [
        { id: "var-telarca", titulo: "Telarca precoce isolada e lipomastia", conferir: false,
          questoes: ["q-tp20232-038","q-tp20252-050","q-tp20261-014","q-uspsp5-030","q-usprp2022-051","q-tp20241-035","q-usprp2026-023"],
          casos: ["q-tp20252-050"],
          prosa: `Na telarca precoce isolada, o ovário produz um pouco de estrogênio de forma transitória, sem ativar o eixo inteiro: só a mama cresce, sem estirão nem avanço da idade óssea. A gordura da criança obesa imita a mama (lipomastia).`,
          texto: `- Só mama (M2P1), velocidade normal, **idade óssea = cronológica**, LH e estradiol pré-puberais: **telarca precoce isolada**, reavaliar a cada **3 a 4 meses**. {q-tp20232-038,q-tp20252-050,q-tp20261-014,q-uspsp5-030,q-usprp2022-051}
- "Mama" em criança obesa M1: **lipomastia** (obesidade), não telarca. {q-tp20241-035}
- Menino baixo crescendo no canal, G2P2, idade óssea próxima: puericultura de rotina. {q-usprp2026-023}` },
        { id: "var-adrenarca", titulo: "Adrenarca e ginecomastia", conferir: true,
          questoes: ["q-scmsp2026-044","q-usprp2025-026","q-tp20241-039","q-tp20252-076"],
          prosa: `Na adrenarca, a suprarrenal amadurece e produz andrógenos fracos: pelos e odor, sem mama nem aumento testicular. A ginecomastia do púbere vem do predomínio transitório do estrogênio sobre a testosterona e regride sozinha.`,
          texto: `- Pelos pubianos e odor, **sem** mama e sem aumento testicular: **adrenarca (pubarca) precoce**. {q-usprp2025-026,q-tp20241-039}
- Benigna, mas associada a maior risco de **síndrome dos ovários policísticos**. {q-scmsp2026-044}
- **Ginecomastia** leve no púbere: **tranquilizar** e acompanhar (com dieta e exercício se há sobrepeso). {q-tp20252-076}` },
      ],
    },
    {
      id: "precoce", titulo: "Puberdade precoce",
      introducao: `Puberdade precoce é o início dos caracteres sexuais **antes dos 8 anos na menina** e **antes dos 9 anos no menino**. [[Na forma central, o eixo hipotálamo-hipófise-gônada foi ativado cedo: o LH sobe, as gônadas respondem, o crescimento acelera e a idade óssea avança; na menina quase sempre é idiopática, no menino costuma haver lesão do sistema nervoso.|q-adap21-046,q-tp20202-042,q-tp20251-048,q-usp2026-108]]

[[Na forma periférica, os esteroides sexuais vêm de fora do eixo (gônada, suprarrenal ou hormônio externo) e o LH fica suprimido.|q-sirio2022-072,q-usprp2024-080,q-simepm89-089]] Por isso o exame que separa as duas é o LH: alto na central, baixo na periférica.`,
      fragmentos: [
        { id: "pre-central", titulo: "Central: diagnóstico e tratamento", conferir: false, diretrizes: ["sbp-puberdade"],
          questoes: ["q-adap21-046","q-tp20202-042","q-tp20251-048","q-usp2026-108","q-unicampdis2024-090"],
          prosa: `Na puberdade precoce central o eixo hipotálamo-hipófise-gônada acordou cedo: tudo acontece na ordem normal, só que antes da hora, com LH puberal e idade óssea avançada. No menino a causa costuma ser uma lesão do sistema nervoso, e por isso a ressonância é obrigatória. O análogo do GnRH dessensibiliza a hipófise e desliga o eixo.`,
          texto: `- Mama e pelos antes dos 8 anos, **LH basal puberal** (acima de 0,3 UI/L), idade óssea avançada: **puberdade precoce central**. {q-adap21-046,q-unicampdis2024-090}
- Exame que confirma: **LH** (basal ou após estímulo com GnRH). {q-unicampdis2024-090}
- Menino com **testículos de 8 mL**, estirão e idade óssea avançada: **central**. {q-tp20202-042}
- Sempre **ressonância de encéfalo**; manchas café com leite e hemianopsia sugerem lesão (glioma óptico na neurofibromatose). {q-tp20251-048,q-usp2026-108}
- Tratamento: **análogo de GnRH**. {q-adap21-046}` },
        { id: "pre-periferica", titulo: "Periférica e exógena", conferir: true,
          questoes: ["q-sirio2022-072","q-usprp2024-080","q-simepm89-089","q-scmsp2026-043","q-udisc20262-055"],
          casos: ["q-usprp2024-080"],
          prosa: `Na periférica, os hormônios vêm de fora do eixo (cisto ovariano, tumor de suprarrenal ou gônada, hiperplasia adrenal, creme de hormônio de um familiar): o LH fica suprimido, porque o hipotálamo é freado pelo excesso de esteroide.`,
          texto: `- Causa periférica que se destaca: **cisto ovariano funcional**. {q-sirio2022-072}
- LH suprimido com esteroide alto e sem fonte endógena: **causa exógena** (gel ou creme de hormônio de um familiar). {q-usprp2024-080}
- Pelos e virilização sem mama: dosar **andrógenos** e fazer **US de suprarrenais**. {q-simepm89-089}
- Idade óssea **avança** na pseudopuberdade precoce. {q-udisc20262-055}
- **Desreguladores endócrinos** (bisfenol, ftalatos) se acumulam e interferem nos hormônios. {q-scmsp2026-043}` },
      ],
    },
    {
      id: "nutricao", titulo: "Estado nutricional e obesidade",
      introducao: `Na criança, o peso só tem sentido em relação à idade e à estatura: por isso se classifica pelo **IMC para a idade**, em escores z das curvas da OMS. [[A criança obesa por excesso de comida cresce bem, muitas vezes acima do canal, porque a insulina e a leptina estimulam o crescimento; obesidade com estatura parando de crescer aponta causa endócrina, como hipotireoidismo ou excesso de cortisol.|q-usprp2022-094,q-udisc20262-042,q-sirio2025-058]]`,
      fragmentos: [
        { id: "nut-classificacao", casos: ["q-scmsp2022-023"], titulo: "Classificação pelo IMC (OMS)", conferir: true, diretrizes: ["oms-crescimento","ms-caderneta"],
          questoes: ["q-scmsp2022-023","q-amrigs2020-067","q-einstein2025-044-ia","q-einstein2021-024","q-sirio2026-042","q-fmabc2026-060","q-unicampdis2025-080"],
          casos: ["q-amrigs2020-067"],
          prosa: `O IMC muda com a idade (a criança emagrece depois do primeiro ano e engorda de novo na adolescência), e por isso se usa o escore z para a idade e o sexo. Os cortes mudam aos 5 anos, porque o excesso de peso abaixo dessa idade se classifica de forma mais conservadora.`,
          texto: `- **0 a 5 anos**: **+1 a +2 risco de sobrepeso**, **+2 a +3 sobrepeso**, **> +3 obesidade**. {q-amrigs2020-067,q-einstein2021-024}
- **5 a 19 anos**: **+1 a +2 sobrepeso**, **+2 a +3 obesidade**, **> +3 obesidade grave**. {q-scmsp2022-023,q-einstein2025-044-ia,q-fmabc2026-060}
- IMC entre **−2 e +1**: **eutrofia** (mesmo abaixo da média). {q-sirio2026-042}
- IMC muito baixo em criança com paralisia cerebral: **desnutrição grave**, rever a dieta (calorias e consistência). {q-unicampdis2025-080}` },
        { id: "nut-obesidade", casos: ["q-einstein2026-039", "q-einstein2023-066"], titulo: "Obesidade: o que investigar", conferir: true, diretrizes: ["sbp-obesidade"],
          questoes: ["q-einstein2026-039","q-einstein2023-066","q-udisc20262-042","q-usprp2022-094","q-sirio2025-058","q-iamspe2023-035","q-fmabc2026-060"],
          prosa: `A obesidade comum vem com estatura normal ou alta, porque o excesso de energia acelera o crescimento. A criança obesa que **desacelera a estatura** sugere doença endócrina (hipotireoidismo, excesso de cortisol), que se investiga antes de tratar.`,
          texto: `- Obesidade exógena: **glicemia de jejum, perfil lipídico e TGP** (SBP); com acantose, também **insulina**. {q-einstein2026-039,q-udisc20262-042}
- Menor de 5 anos com excesso de peso: **dieta e atividade física**. {q-einstein2023-066}
- Obesidade **com desaceleração da estatura**: investigar causa endócrina **antes** de tratar. {q-usprp2022-094}
- Cortisol elevado leva a **lipogênese visceral** e resistência à leptina. {q-sirio2025-058}
- Obesidade grave (> z +3) em adolescente: pensar em síndrome genética ou endócrina. {q-fmabc2026-060}
- Prematuridade, RCIU e filho de mãe diabética: causas de **hipoglicemia neonatal transitória**. {q-iamspe2023-035}` },
      ],
    },
  ],
});
