# Auditoria do Simulado EPM 3

Gerada em 19/10/2026 a partir de `dados/banco-simulado-epm-3.js` e `dados/simulados-equipe.js` (simulado `sim-epm3`, 100 questões, 240 minutos, sem bloco recomendado). Os números são **posições no simulado**, que seguem a ordem da prova da UNIFESP-EPM 2022 (a questão *n* do simulado é a adaptação da questão *n* da prova real). O id da questão no banco é `q-adap22-NNN`, com NNN igual à posição.

As medidas se repetem com `node ferramentas/medir-banco-adaptado.mjs banco-simulado-epm-3 prova-unifesp-2022 --direcao acima` (ou `npm run medir-bancos`); a figura, com `node ferramentas/figuras-banco-simulado-epm-3.mjs`; a conferência de números, com `npm run conferir-numeros -- banco-simulado-epm-3`.

## 1. Regra de construção

- Cada questão é **autoral** (banca "Esc — Banco Didático", `real: false`, ano 2027), no **mesmo assunto da taxonomia** e na **mesma posição** da questão da prova real de 2022 que lhe serve de guia, com caso clínico, dados e alternativas próprios. Onde a regra ou a conduta da questão real mudou (ou onde repetiria uma decisão já presente no banco), a questão nova trata **outra decisão do mesmo assunto**.
- O gabarito é **a alternativa anterior à da prova real** ("uma alternativa acima": B→A, C→B, D→C, A→D; no EPM 2 foi "uma abaixo"). A questão 52, anulada em 2022, recebeu **D**, que fecha o equilíbrio das quatro letras.
- Quatro alternativas por questão, como na prova real. Distribuição por área **idêntica** à da prova real: Cirurgia Geral 21, Pediatria 8, Medicina Preventiva e Social 17, Clínica Médica 35, Ginecologia e Obstetrícia 19.

## 2. Medidas

| Critério | Resultado | Alvo | Situação |
|---|---|---|---|
| Letra do gabarito | A 25, B 26, C 25, D 24 | ~25% cada | ok |
| Posição do gabarito por tamanho (1ª = mais longa) | 1ª 27, 2ª 23, 3ª 26, 4ª 24 (9 com empate) | ~25% cada | ok |
| Maior margem da alternativa mais longa sobre a 2ª | 9.8%; 0 posição(ões) acima do limite | no máximo 10% | ok |
| Distribuição por área | area-cg 21, area-cm 35, area-go 19, area-mps 17, area-ped 8 | idêntica à da prova real | ok |
| Gabarito = letra anterior à da prova real | 1 posição(ões) livre(s) (anuladas): 52 | B→A, C→B… | ok |
| Semelhança do enunciado com a questão real correspondente | máxima 47.8% (posição 73); média 18.6%; 0 acima do limite | no máximo 50% | ok |
| Repete outra questão do banco | 0 | 0 | ok |
| Alternativas erradas comentadas na explicação | 300 de 300 | todas | — |



## 3. Diretrizes: o que foi e o que não foi conferido

**Nenhum texto oficial de diretriz pôde ser aberto nesta rodada** (a rede do ambiente bloqueia os sites; só a busca na web funcionou, e ela devolve resumos e páginas de terceiros). Cada questão tem um dos níveis da seção 6: **busca** (10 questões: o que decide a questão foi confirmado em resumo obtido pela busca), **parcial** (12: parte confirmada, o resto de memória) e **memória** (78). Nenhuma chegou a **fonte**.

**Itens em que a regra mudou desde a prova real, ou em que a questão real estava defasada, e a questão foi ajustada**

- **22** (insuficiência ovariana prematura): ESHRE 2024, FSH acima de 25 UI/L, uma dosagem com quadro típico basta; em 2015 eram duas.
- **25** (contracepção): critérios de elegibilidade da OMS (5ª ed., 2015; a 6ª, de 2025, não foi conferida) e do CDC (2024); a prova de 2022 já usava a classificação da OMS.
- **31** (hemorragia pós-parto): pacote de tratamento recomendado pela OMS em 2023 (ocitocina, ácido tranexâmico precoce, medida calibrada da perda).
- **44** (vigilância): a lista nacional de notificação compulsória foi alterada em 2025, e fontes secundárias citam nova portaria em 2026; a questão nova trata da investigação de surto, que não depende da lista.
- **56** (infecções sexualmente transmissíveis): esquema do PCDT de IST de 2022 (ceftriaxona 500 mg e azitromicina 1 g); a busca não achou atualização posterior.
- **60** (HIV na gestação): a questão real de 2022 trata da profilaxia do recém-nascido; como o esquema vigente não pôde ser conferido, a nova trata do início imediato do tratamento da gestante com tenofovir, lamivudina e dolutegravir.
- **66** (diarreia): Plano B com ondansetrona em dose única (consenso de 2023 relatado em resumos); a questão real de 2022 era sobre o zinco.
- **69** e **86** (asma): GINA, com associação de corticoide inalatório e formoterol como manutenção e resgate (a busca só confirmou edições de 2021 a 2023).
- **73** (estado nutricional): pontos de corte da OMS de 5 a 19 anos, diferentes dos de menores de 5 anos usados na questão real.
- **80** (síndrome coronariana aguda): ESC 2023 e ACC/AHA 2025; a questão trata do infarto **sem** supra de ST (a real, do com supra, repetiria a decisão do EPM 2).
- **84** (nódulo de tireoide): ACR TI-RADS (soma de 12 pontos, TR5 a partir de 7); ATA 2015 e 2025 (a de 2025, vista só em resumos, recomenda lobectomia até 2 cm).
- **89** (geriatria): critérios de Beers de 2023.
- **97** (covid-19): a regra de isolamento da questão real foi substituída por outra decisão (dexametasona e oxigênio, RECOVERY).
- **98** (sepse): Surviving Sepsis Campaign de 2021 e de 2026 (controle do foco "idealmente em até 6 horas", visto só em resumo da busca).
- **20, 15, 3, 10**: AVC (AHA/ASA 2026, equivalência da tenecteplase), câncer de pulmão (9ª edição do TNM, que mantém T1b N0 como IA2), via aérea difícil (DAS 2025 existe; a técnica descrita é a de 2015) e trauma (ATLS 11ª edição existe; os limites numéricos da tabela de classes são os da 9ª).

## 4. Questões com ressalva

- **Só de memória**, sem checagem: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 21, 23, 24, 26, 27, 28, 29, 32, 33, 34, 35, 36, 38, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 55, 57, 58, 59, 60, 61, 63, 64, 65, 67, 68, 70, 71, 74, 75, 76, 77, 78, 79, 81, 82, 83, 85, 87, 88, 90, 91, 92, 93, 94, 95, 96, 97, 99, 100. As de bioestatística e medidas (42, 43, 45, 46, 48, 53 e 54) foram conferidas à mão e estão certas.
- **22** e **25**: a revisão independente achou erro no texto da explicação (a ESHRE 2024 não "reduziu" o corte; o implante é categoria 2 nas duas fontes); corrigidos.
- **10**: os limites de frequência cardíaca, de frequência respiratória e de diurese da classificação de hemorragia são os da 9ª edição do ATLS; classes III e IV são discutíveis sem eles.
- **14**: a BTS 2023 deixou de usar o corte de 2 cm; o enunciado agora diz que o paciente não tem dispneia.
- **30**: o prazo de reavaliação depois do parto varia (ASCCP, 4 semanas; material brasileiro, cerca de 90 dias); a alternativa não fixa data.
- **72**: a dose de amoxicilina varia conforme a diretriz (50 a 90 mg/kg/dia).
- **73**: a revisão achou que o peso original dava IMC acima de +3 DP; o peso passou de 47 para 41 kg (IMC de 23,5 kg/m²). A tabela exata da OMS não pôde ser aberta.
- **80**: o escore GRACE deixou de ser dado pronto no enunciado, porque a soma informada não fechava.
- **84**: a soma do TI-RADS foi corrigida (12 pontos, não 9; TR5 é de 7 pontos ou mais).
- **60**: a edição vigente do protocolo de transmissão vertical não foi aberta; a de 2022 foi a mais recente achada.

## 5. Figuras

Uma figura por código (`ferramentas/figuras-banco-simulado-epm-3.mjs`, modelo `taquicardiaSupraventricular` de `figuras-modelos.mjs`): **81**, traçado de taquicardia regular de QRS estreito a 168 bpm, sem onda P visível (ilustração esquemática; a legenda diz isso). As tabelas 2 x 2 das questões de bioestatística da prova real entraram como texto no enunciado. Nenhuma questão ficou com `imagemPendente`.

## 6. Tabela por questão

"Gabarito" mostra a letra da prova real e a da questão nova. "Escore ou classificação" é o que a explicação nomeia (detectado pelo texto, sem garantia de ser completo). "Nível": busca, parcial ou memória, como na seção 3.

| Pos. | Questão | Assunto | Gabarito | Escore ou classificação | Nível |
|---:|---|---|:-:|---|:-:|
| 1 | 001 | anestesio-complicacoes | A → D | — | parcial |
| 2 | 002 | anestesio-complicacoes | C → B | — | memória |
| 3 | 003 | anestesio-viaaerea | A → D | — | memória |
| 4 | 004 | uro-litiase | B → A | qSOFA | memória |
| 5 | 005 | dac-cronica | B → A | SYNTAX | memória |
| 6 | 006 | anestesio-complicacoes | D → C | Ring e Messmer | memória |
| 7 | 007 | diverticulite | D → C | Hinchey | memória |
| 8 | 008 | traumaabd | C → B | AAST | memória |
| 9 | 009 | orl-fratura | C → B | — | memória |
| 10 | 010 | atls | D → C | ATLS (classes de hemorragia) | memória |
| 11 | 011 | neo-ecn | A → D | Bell modificada | memória |
| 12 | 012 | uro-malformacoes | D → C | — | memória |
| 13 | 013 | obstrucao | C → B | — | memória |
| 14 | 014 | cirtorax-pleura | B → A | — | busca |
| 15 | 015 | cirtorax-neoplasia | B → A | — | busca |
| 16 | 016 | pneumo-bronquiectasias | A → D | — | memória |
| 17 | 017 | orto-osteometabolicas | D → C | — | memória |
| 18 | 018 | cirvasc-arterial | C → B | Rutherford; critérios de elegibilidade (OMS/CDC) | memória |
| 19 | 019 | cirvasc-venosa | A → D | CEAP | memória |
| 20 | 020 | neuro-avc | C → B | NIHSS | parcial |
| 21 | 021 | genetica-heranca | B → A | — | memória |
| 22 | 022 | ciclomenstrual | D → C | — | busca |
| 23 | 023 | climaterio | A → D | STRAW+10 | memória |
| 24 | 024 | caovario | B → A | — | memória |
| 25 | 025 | contracepcao | A → D | critérios de elegibilidade (OMS/CDC) | busca |
| 26 | 026 | uroginecologia | C → B | POP-Q | memória |
| 27 | 027 | camama | D → C | BI-RADS; critérios de elegibilidade (OMS/CDC) | memória |
| 28 | 028 | miomatose | B → A | — | memória |
| 29 | 029 | miomatose | C → B | — | memória |
| 30 | 030 | cacolo | B → A | — | parcial |
| 31 | 031 | sangramentos | A → D | índice de choque | busca |
| 32 | 032 | trabalhoparto | D → C | — | memória |
| 33 | 033 | dmg | A → D | IADPSG | memória |
| 34 | 034 | trabalhoparto | D → C | HELPERR | memória |
| 35 | 035 | trabalhoparto | C → B | — | memória |
| 36 | 036 | ists | B → A | — | memória |
| 37 | 037 | prenatal | B → A | — | parcial |
| 38 | 038 | dmg | D → C | — | memória |
| 39 | 039 | abortamento | A → D | — | parcial |
| 40 | 040 | oft-glaucoma | C → B | — | memória |
| 41 | 041 | contracepcao | C → B | — | memória |
| 42 | 042 | bioestatistica | D → C | — | memória |
| 43 | 043 | medidasepi | B → A | — | memória |
| 44 | 044 | vigilancia | B → A | — | memória |
| 45 | 045 | bioestatistica | B → A | — | memória |
| 46 | 046 | bioestatistica | C → B | — | memória |
| 47 | 047 | esf | D → C | — | memória |
| 48 | 048 | bioestatistica | A → D | — | memória |
| 49 | 049 | vigilancia | B → A | — | busca |
| 50 | 050 | vigilancia | D → C | classificação NOVA | memória |
| 51 | 051 | prevencao | C → B | Leavell e Clark | memória |
| 52 | 052 | desenhosestudo | anulada → D | — | memória |
| 53 | 053 | bioestatistica | A → D | classificação NOVA | memória |
| 54 | 054 | bioestatistica | A → D | — | memória |
| 55 | 055 | cuidadospaliativos | C → B | escada da OMS | memória |
| 56 | 056 | ist | B → A | — | busca |
| 57 | 057 | principiossus | C → B | — | memória |
| 58 | 058 | esf | A → D | Starfield | memória |
| 59 | 059 | orl-viasaereas | D → C | — | memória |
| 60 | 060 | hiv | B → A | — | memória |
| 61 | 061 | orto-infeccoes | A → D | Kocher | memória |
| 62 | 062 | reumato-febrereumatica | D → C | — | parcial |
| 63 | 063 | emergped-maustratos | D → C | — | memória |
| 64 | 064 | oncopediatrica | C → B | — | memória |
| 65 | 065 | emergped-respiratoria | A → D | — | memória |
| 66 | 066 | dda | C → B | — | parcial |
| 67 | 067 | comunicacaoclinica | B → A | SPIKES | memória |
| 68 | 068 | genetica-heranca | D → C | — | memória |
| 69 | 069 | asma | B → A | — | parcial |
| 70 | 070 | puericultura | A → D | — | memória |
| 71 | 071 | puericultura | D → C | — | memória |
| 72 | 072 | pneumonia | C → B | — | parcial |
| 73 | 073 | puericultura | B → A | critérios de elegibilidade (OMS/CDC) | parcial |
| 74 | 074 | reanimacao | C → B | — | memória |
| 75 | 075 | neurocir-tumores | A → D | — | memória |
| 76 | 076 | drc | D → C | KDIGO (G e A); critérios de elegibilidade (OMS/CDC) | memória |
| 77 | 077 | gastro-constipacao | A → D | Roma IV | memória |
| 78 | 078 | derm-infeccoes | C → B | — | memória |
| 79 | 079 | cirrose | B → A | — | memória |
| 80 | 080 | sca | B → A | GRACE | parcial |
| 81 | 081 | arritmias | D → C | — | memória |
| 82 | 082 | reumato-cristais | C → B | — | memória |
| 83 | 083 | orto-osteometabolicas | A → D | — | memória |
| 84 | 084 | tireoide | D → C | ACR TI-RADS; Bethesda | busca |
| 85 | 085 | hemato-hemostasia | C → B | — | memória |
| 86 | 086 | asma | B → A | — | parcial |
| 87 | 087 | neuro-movimento | D → C | Hoehn e Yahr | memória |
| 88 | 088 | hemato-anemias | B → A | — | memória |
| 89 | 089 | geriatria-polifarmacia | C → B | Beers | busca |
| 90 | 090 | has | D → C | — | memória |
| 91 | 091 | pneumonia | A → D | critérios de estabilidade (Halm) | memória |
| 92 | 092 | alergia-anafilaxia | B → A | — | memória |
| 93 | 093 | nefro-glomerulopatias | A → D | KDIGO (G e A) | memória |
| 94 | 094 | ira | C → B | KDIGO (G e A); critérios de elegibilidade (OMS/CDC) | memória |
| 95 | 095 | geriatria-demencia | D → C | — | memória |
| 96 | 096 | oft-glaucoma | D → C | — | memória |
| 97 | 097 | infecto-covid | A → D | — | memória |
| 98 | 098 | sepse | C → B | — | busca |
| 99 | 099 | psiq-psicoses | C → B | — | memória |
| 100 | 100 | psiq-substancias | B → A | CIWA-Ar | memória |

## 7. Revisão independente

Dois revisores independentes, que não escreveram as questões, leram as posições 1 a 50 e 51 a 100. Cada um respondeu à pergunta sem ver o gabarito: **100 de 100 iguais ao gabarito**. Não houve gabarito errado. Achados corrigidos: erro de conteúdo na explicação (22, 25, 73, 84), dado desatualizado ou impreciso (1, 3, 10, 14, 15, 20, 30, 37, 98, 82, 72, 62, 57, 69), enunciado que repetia ou entregava o raciocínio (7, 24, 27, 44, 54, 58, 60, 74, 80, 91, 96) e forma (9, 12, 32, 41, 43, 55, 75, 76, 77, 100).

**Não aplicado, por decisão de redação:** o valor do escore SYNTAX dado pronto na 5 (o aluno não o calcula de cabeça); o CIWA-Ar dado na 100; o diagnóstico já dito no enunciado em 62, 75, 84, 88, 93 e 99, onde a pergunta é de conduta; pequenas diferenças de grafia entre alternativas (73, 77).
