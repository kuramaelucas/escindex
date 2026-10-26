# Auditoria do Simulado EPM 5

Gerada em 26/10/2026 a partir de `dados/banco-simulado-epm-5.js` e `dados/simulados-equipe.js` (simulado `sim-epm5`, 100 questões, 240 minutos, sem bloco recomendado). Os números são **posições no simulado**, que seguem a ordem da prova da UNIFESP-EPM 2023 (Acesso Direto, `prova-unifesp-2023`), a única prova de residência da UNIFESP-EPM que ainda não era referência de um banco adaptado (2022, 2024, 2025 e 2026 já eram; a Avaliação Discente do Internato 2026.2 é prova da graduação e não entra).

As medidas se repetem com `node ferramentas/medir-banco-adaptado.mjs banco-simulado-epm-5 prova-unifesp-2023 --direcao abaixo` (ou `npm run medir-bancos`); a conferência de números, com `npm run conferir-numeros -- banco-simulado-epm-5`.

## 1. Regra de construção

- Cada questão é **autoral** (banca "Esc — Banco Didático", `real: false`, ano 2027), no **mesmo assunto da taxonomia** e na **mesma posição** da questão da prova real de 2023, com caso clínico, dados e alternativas próprios.
- O gabarito é **a alternativa seguinte à da prova real** (A→B, B→C, C→D, D→A, como no EPM 2 e no EPM 4). As questões **32, 34, 38 e 48**, anuladas em 2023, foram escritas como questões normais, com gabaritos **D, D, D e A**, que fecham o equilíbrio das letras.
- Quatro alternativas por questão. Distribuição por área **idêntica** à da prova real: Clínica Médica 38, Cirurgia Geral 25, Medicina Preventiva e Social 15, Ginecologia e Obstetrícia 15, Pediatria 7.
- **A justificativa ensina o conceito** (pedido de 26/10/2026): além do padrão (dicas do enunciado em destaque, mecanismo, contexto epidemiológico e o motivo de cada alternativa errada), cada questão traz um trecho **«Para fixar o conceito»** com a regra geral, o raciocínio que se repete em outras provas e o que diferencia condutas parecidas (por exemplo, as doses de albumina da cirrose, as faixas do LIRAa, o quadro de escolha do teste estatístico, as cores da Portaria 344).
- Quatro questões foram trocadas durante a construção porque repetiam decisões de bancos anteriores: a 12 (dissecção de aorta, que repetia a 018 do EPM 4, virou crise de feocromocitoma), a 36 (inibidor de SGLT2 na doença renal, que repetia a 055 do EPM 2, virou hipoglicemia por sulfonilureia), a 69 (crise de asma na criança, parecida com uma questão real da USP, virou interpretação de espirometria) e a 92 (tamponamento cardíaco, que repetia a 008 do EPM 4, virou fratura pélvica instável).
- Não há figura: as questões de 2023 que dependiam de imagem ou gráfico foram escritas só com texto, com os dados no enunciado.

## 2. Medidas

| Critério | Resultado | Alvo | Situação |
|---|---|---|---|
| Letra do gabarito | A 24, B 26, C 28, D 22 | ~25% cada (± 4 pontos) | ok |
| Posição do gabarito por tamanho (1ª = mais longa) | 1ª 24, 2ª 25, 3ª 29, 4ª 22 (7 com empate) | ~25% cada | ok |
| Maior margem da alternativa mais longa sobre a 2ª | 9%; 0 posição acima do limite | no máximo 10% | ok |
| Distribuição por área | area-cg 25, area-cm 38, area-go 15, area-mps 15, area-ped 7 | idêntica à da prova real | ok |
| Gabarito = letra seguinte à da prova real | 4 posições livres (anuladas): 32, 34, 38, 48 | A→B, B→C… | ok |
| Semelhança do enunciado com a questão real correspondente | máxima 38,9% (posição 8); média 18,3%; 0 acima do limite | no máximo 50% | ok |
| Repete outra questão do banco | 0 | 0 | ok |
| Alternativas erradas comentadas na explicação | 300 de 300 | todas | — |
| Número do enunciado ≠ da explicação | 0 de 100 | 0 | ok |
| Dificuldade marcada | fundamental 18, intermediário 55, avançado 27 | alvo calibrado 15/45/40 | informativo (faltam avançadas) |

## 3. Diretrizes: o que foi e o que não foi conferido

**Nenhum texto oficial de diretriz foi aberto nesta rodada.** Todas as 100 questões estão no nível «memória», e cada referência diz isso. Pontos em que a regra muda com o tempo ou em que a versão citada pode estar velha:

- **8 e 15** (sepse): Surviving Sepsis Campaign 2021; a atualização de 2026 não foi conferida (prazos de antibiótico e hidrocortisona).
- **13 e 92** (trauma): ATLS 10ª edição; a 11ª (2025) não foi conferida. Os 1.500 mL / 200 mL por hora do hemotórax são os da 10ª.
- **53** (AVC): AHA/ASA 2019; atualização de 2026 e janelas para tenecteplase não conferidas.
- **14** (DPOC) e **69** (asma): GOLD e GINA citados sem ano, na edição vigente; os critérios usados são estáveis.
- **23** (financiamento): os pisos de 15% (municípios) e 12% (estados) são da Lei Complementar 141/2012; a regra da **União** mudou (Emenda Constitucional 95/2016, arcabouço fiscal de 2023) e não foi conferida em texto.
- **60** (vacina HPV): dose única para 9 a 14 anos, esquema de 2024 do Programa Nacional de Imunizações; a vigência atual **precisa ser confirmada** no calendário. O trecho sobre rastreamento (DNA-HPV a partir de 2025) segue o que o histórico do projeto já registra.
- **31, 66, 70 e 18** (IST e hanseníase): protocolos do Ministério da Saúde de 2022; o esquema de **70** (penicilina benzatina em dose única para recém-nascido de mãe não tratada, com exames normais) segue o cenário correspondente do protocolo, que admite também a penicilina cristalina por 10 dias se o seguimento não for garantido; texto não aberto.
- **29** (Portaria 344/1998): as cores e prazos são os clássicos; a receita digital vem mudando as regras, e a norma vigente deve ser conferida.
- **1** (fibrilação atrial): citadas a diretriz brasileira de 2023 e as de 2023-2024 (AHA/ACC e ESC); o escore CHA2DS2-VASc tem versão nova (CHA2DS2-VA, ESC 2024) que dispensa o sexo — a questão não depende dessa diferença.
- **63, 38, 82, 86**: critérios do IMWG, I2 da metanálise, critérios japoneses de ressecção endoscópica e margens do melanoma são os clássicos, sem edição mais nova conferida.

## 4. Questões com ressalva

- **70** (sífilis congênita): conduta conforme o protocolo de 2022, de memória; ver acima.
- **60** (HPV): esquema de 2024 sujeito a mudança.
- **23** (financiamento): regra da União fora do que a questão cobra, mas citada na explicação.
- **29** (receitas): a regra de validade e quantidade (30 dias e até 60 dias de tratamento para B1 e C1) deve ser conferida na versão em vigor da Portaria 344.
- **47** (fístula urogenital): o teste do tampão está descrito com azul de metileno na bexiga e índigo carmim (ou fenazopiridina) por via venosa; variações de técnica existem.
- **80** (rim): conduta do estágio T1a; limiar de 4 cm da AUA/EAU não conferido na edição mais recente.

## 5. Revisão independente

**Não feita nesta rodada.** Nos simulados anteriores, dois revisores independentes releram as 100 questões (resposta igual ao gabarito) e acharam ajustes de conteúdo; aqui isso ainda precisa ser feito antes de o simulado ser dado a alunos. O que foi feito: medição por script, conferência de números, busca de repetição contra as cerca de 8.000 questões do banco, e uma releitura própria que corrigiu a sequência vacinal citada na explicação da 67 e a justificativa do esquema de penicilina da 70.
