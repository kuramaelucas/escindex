# Auditoria do Simulado EPM 4

Gerada em 20/10/2026 a partir de `dados/banco-simulado-epm-4.js` e `dados/simulados-equipe.js` (simulado `sim-epm4`, 100 questões, 240 minutos, sem bloco recomendado). Os números são **posições no simulado**, que seguem a ordem da prova da UNIFESP-EPM 2026 (Acesso Direto, `prova-unifesp-2026`).

As medidas se repetem com `node ferramentas/medir-banco-adaptado.mjs banco-simulado-epm-4 prova-unifesp-2026` (ou `npm run medir-bancos`); a conferência de números, com `npm run conferir-numeros -- banco-simulado-epm-4`.

## 1. Regra de construção

- Cada questão é **autoral** (banca "Esc — Banco Didático", `real: false`, ano 2027), no **mesmo assunto da taxonomia** e na **mesma posição** da questão da prova real de 2026, com caso clínico, dados e alternativas próprios.
- O gabarito é **a alternativa seguinte à da prova real** ("uma alternativa abaixo": A→B, B→C, C→D, D→A, como no EPM 2). As questões **53, 55 e 100**, anuladas em 2026, foram escritas como questões normais, com gabarito **C**; a letra C foi a que mais aproximou as quatro, porque as outras 97 posições já dão B 28, A 25, D 24 e C 20.
- Quatro alternativas por questão. Distribuição por área **idêntica** à da prova real: Cirurgia Geral 25, Pediatria 9, Medicina Preventiva e Social 17, Clínica Médica 31, Ginecologia e Obstetrícia 18.
- Nove questões tiveram de ser trocadas por outra decisão do mesmo assunto, porque a medição achou que repetiam decisões já testadas em simulados anteriores do banco (pneumonia com derrame, trombólise de membro, cálculo infectado, NNT, IC95% com valor nulo, valor preditivo, distocia de ombro, surfactante e razão de verossimilhança) e, depois da revisão, o aborto retido (agora, abortamento infectado).
- Não há figura: as seis questões da prova real que tinham imagem (33, 36, 40, 60, 61, 74) foram escritas só com texto, e os dados que a figura traria constam do enunciado.

## 2. Medidas

| Critério | Resultado | Alvo | Situação |
|---|---|---|---|
| Letra do gabarito | A 25, B 28, C 23, D 24 | ~25% cada (± 4 pontos) | ok |
| Posição do gabarito por tamanho (1ª = mais longa) | 1ª 26, 2ª 25, 3ª 27, 4ª 22 (6 com empate) | ~25% cada | ok |
| Maior margem da alternativa mais longa sobre a 2ª | 9,5%; 0 posição acima do limite | no máximo 10% | ok |
| Distribuição por área | area-cg 25, area-cm 31, area-go 18, area-mps 17, area-ped 9 | idêntica à da prova real | ok |
| Gabarito = letra seguinte à da prova real | 3 posições livres (anuladas): 53, 55, 100 | A→B, B→C… | ok |
| Semelhança do enunciado com a questão real correspondente | máxima 43,6% (posição 15); média 22,7%; 0 acima do limite | no máximo 50% | ok |
| Repete outra questão do banco | 0 | 0 | ok |
| Alternativas erradas comentadas na explicação | 300 de 300 | todas | — |
| Número do enunciado ≠ da explicação | 0 de 100 | 0 | ok |
| Dificuldade marcada | fundamental 41, intermediário 57, avançado 2 | alvo calibrado 30/50/20 | informativo |

Na primeira escrita, a letra do gabarito por tamanho saiu desigual (a correta mais longa em 13 de 40); o equilíbrio foi acertado lote a lote, com o montador mostrando a distribuição a cada dez questões.

## 3. Diretrizes: o que foi e o que não foi conferido

**A rede esteve aberta, mas os textos integrais de diretriz quase não puderam ser lidos** (sites da AHA, da AAP, do FIGO, da SBPT e do Ministério da Saúde respondem 403 ou erro de nome para robôs; só a busca devolveu resumos). Níveis: **busca** (2 questões: 34 e 73) e **memória** (98). Nenhuma questão chegou a «fonte».

**Itens em que a regra mudou desde a prova real ou desde a diretriz que a questão cita**

- **34** (anemia na doença renal crônica): a diretriz KDIGO de 2026 (visto em resumo) mudou os limiares de deficiência de ferro para doença renal crônica sem diálise; o caso (ferritina 280, saturação 14%) cabe nos dois critérios, e a explicação diz «antes era… hoje é…».
- **23** (estenose aórtica): ESC/EACTS 2025 baixou de 75 para 70 anos a idade a partir da qual se recomenda o TAVI; o gabarito não muda.
- **6** (câncer de pulmão): a 9ª edição do TNM está em vigor desde 2025; para T1c N0 a classificação (IA3) é a mesma da 8ª.
- **43** (contracepção) e **40** (DPOC): edição mais nova da OMS (elegibilidade) e do GOLD (2026) não foi conferida.
- **8, 19, 41**: o ATLS tem 11ª edição (2025), não conferida; os limites usados são os da 10ª.
- **9** (arterial periférica) e **18** (aorta): existem a ACC/AHA 2024 de doença arterial periférica e a ESC 2024 de doenças arteriais e aórticas; as referências foram atualizadas, e a conduta não muda.
- **30**: o sistema Bethesda tem 3ª edição (2023), agora citada.
- **49** (abortamento): a OMS (2022) dispensa a imunoglobulina anti-D antes de 12 semanas e o Ministério da Saúde a mantém; por isso a questão trata do abortamento infectado, e não do aborto retido com tipagem Rh.
- **73** (recusa de transfusão): o art. 11 da Resolução CFM 2.232/2019 manda tratar a emergência «independentemente da recusa»; a tese do STF (RE 1212272, tema 1069, 2024, vista só em resumos) é que a recusa livre, informada e inequívoca de paciente capaz deve ser respeitada. A explicação cita os dois.
- **84** (HIV no recém-nascido): nos Estados Unidos admite-se amamentar com carga viral sustentadamente indetectável; no Brasil o protocolo do Ministério da Saúde mantém a contraindicação (texto não aberto).
- **53** (colo do útero): a atualização de 2025 das diretrizes brasileiras trata do rastreamento (DNA-HPV); o manejo de NIC 3 segue a edição de 2016 e está em revisão.

## 4. Questões com ressalva

- **Só de memória**: todas, exceto 34 e 73 (busca). Destaque para as que dependem de valor numérico ou de norma brasileira: 3, 11, 12, 13, 14, 17, 25, 33, 36, 37, 45, 51, 55, 57, 58, 66, 71, 72, 82, 83, 84, 86, 91, 96.
- **36** (HIV e tuberculose): o corte de CD4 (50 células/mm³; 2 e 8 semanas) é o do protocolo anterior; o protocolo atual do Ministério da Saúde não foi aberto e pode ter encurtado os intervalos. O gabarito vale para CD4 de 38.
- **45** (câncer de vulva): o limite de margem patológica varia entre as diretrizes (3 a 8 mm); a ESGO 2023 não foi aberta.
- **65** (depressão bipolar): quetiapina e lurasidona são as opções com respaldo na CANMAT/ISBD 2018; as mais novas (lumateperona, cariprazina) foram retiradas da explicação por falta de fonte.
- **71** (anencefalia): a Resolução CFM 1.989/2012 e a ADPF 54 não tiveram vigência confirmada em texto oficial.
- **95** (asma): GINA 2024 citado; as edições 2025 e 2026 não foram conferidas em texto integral (a Trilha 1 se mantém, segundo resumo secundário).

## 5. Revisão independente

Dois revisores (posições 1–50 e 51–100) responderam sem ver o gabarito: **100 de 100 iguais ao gabarito**. Nenhum erro de gabarito. Achados aceitos e corrigidos:

- conteúdo: SCORTEN sem dados na questão 39; critérios de cirurgia na questão 41 (Glasgow 10 não preenche o de Glasgow menor que 9); N do reto (17, cN1b); pontos do TI-RADS (30, ecogenicidade do enunciado alinhada à pontuação); art. 11 da resolução do CFM (73); aleitamento (84); intervalo de descompressão na cauda equina (61); distrator com conta que não fechava (76); anti-D (49, questão trocada);
- forma: valores de referência e interpretações que estavam no enunciado (25, 37, 47, 59, 83, 91, 74); diagnóstico entregue (100); alternativa correta com alvo numérico exclusivo (35) ou com descrição do achado (16); grafia (tamsulosina, pHmetria); termo «manutenção» na pergunta da asma (95); fontanela em criança de 2 anos (88); «pericardiocentese de repouso» (8).
- Não aceito: nada. Itens que o revisor não pôde confirmar (36, 45) ficaram com a ressalva da seção 4.

## 6. Nível de confirmação por questão

| Nível | Questões |
|---|---|
| busca | 34, 73 |
| memória | as outras 98 |

Referência de cada questão: no campo `referencias` do `dados/banco-simulado-epm-4.js`, com edição e ano e, quando houve, a frase «não conferido».
