# Auditoria do Simulado didático EPM

Gerada em 29/10/2026 a partir de `dados/banco-simulado-didatico-epm.js` e `dados/simulados-equipe.js` (simulado `sim-didatico-epm`, 100 questões, 240 minutos, sem bloco recomendado). Diferente dos simulados EPM 2 a 6, que seguem a ordem de **uma** prova real, este usa como base **as cinco provas de residência da UNIFESP-EPM (2022 a 2026)** e mistura as áreas ao longo da prova (Clínica Médica, Cirurgia, Ginecologia e Obstetrícia, Pediatria e Medicina Preventiva e Social, nessa ordem, 20 vezes).

As medidas foram feitas com a função `medir` de `ferramentas/medir-banco-adaptado.mjs`, usando como referência as 100 questões reais de origem (seção 3); como o banco usa cinco provas, ele **não** está em `ferramentas/bancos-adaptados.json` (que associa um banco a uma prova só) e não há comando pronto para repetir a medida. A conferência de números se repete com `npm run conferir-numeros -- banco-simulado-didatico-epm`.

## 1. Regra de construção

- **Equilíbrio entre as áreas:** 20 questões de cada uma das 5 áreas, e, dentro de cada área, 4 de cada ano de prova de origem (2022, 2023, 2024, 2025 e 2026), isto é, 20 questões de cada ano.
- Cada questão fica no **mesmo assunto da taxonomia** de uma questão real dessas provas (seção 3), mas é escrita do zero (`real: false`, banca "Esc — Banco Didático", ano 2027), com **caso clínico, enunciado e alternativas próprios**.
- **Questões diferentes das já criadas.** Os bancos EPM 2 a 6 já cobrem, nos mesmos assuntos, os pontos clássicos de cada prova. Por isso este banco não repete a decisão da questão real nem a de nenhuma questão dos bancos adaptados: cada questão foi comparada com as demais questões autorais do projeto (palavras do enunciado, trechos de 4 palavras, texto da resposta correta e assunto) e, onde o ponto cobrado coincidia, foi trocada por outro ponto do mesmo assunto. Na primeira versão, 59 das 100 questões coincidiam com algum banco existente em decisão ou em vocabulário e foram substituídas (por exemplo: fibrinólise no infarto sem hemodinâmica, hiponatremia sintomática tratada com salina a 3%, reação hansênica tipo 1, distocia de ombro com manobra de McRoberts, clozapina na esquizofrenia resistente, drenagem do empiema pleural, corpo estranho em via aérea, estenose do piloro, meningite tuberculosa e cervicite por gonococo e clamídia). Depois das trocas, a comparação de conteúdo (TF-IDF do enunciado e da resposta correta contra as demais questões autorais) não encontra mais coincidência de conduta; a maior semelhança é de 0,46, entre a tuberculose na gestação (posição 81) e uma questão de tuberculose em outro contexto.
- **Gabarito não vem da prova real.** A letra é sorteada com semente fixa, com 25 de cada letra e sem 3 iguais em sequência. A posição por tamanho da alternativa certa também foi equilibrada (25 em cada posição) e a alternativa mais longa nunca passa de 10% a segunda.
- **Alternativas próprias.** Todas as alternativas foram escritas para este banco (a comparação automática não achou repetição) e os distratores são erros reais: conduta certa para outro paciente, momento errado, dose de outra diretriz.
- **A justificativa ensina o conceito:** dicas do enunciado em destaque, mecanismo, contexto epidemiológico, motivo de cada alternativa errada (300 de 300) e o trecho «Para fixar o conceito».
- Não há figura: todas as questões foram escritas só com texto, com os dados no enunciado.

## 2. Medidas

| Critério | Resultado | Alvo | Situação |
|---|---|---|---|
| Letra do gabarito | A 25, B 25, C 25, D 25 | ~25% cada (± 4 pontos) | ok |
| Posição do gabarito por tamanho (1ª = mais longa) | 1ª 25, 2ª 25, 3ª 25, 4ª 25 (10 com empate) | ~25% cada | ok |
| Maior margem da alternativa mais longa sobre a 2ª | 9,4%; 0 posição acima do limite | no máximo 10% | ok |
| Distribuição por área | Clínica Médica 20, Cirurgia 20, Ginecologia e Obstetrícia 20, Pediatria 20, Medicina Preventiva e Social 20 | 20 de cada | ok |
| Distribuição por ano de origem | 20 de cada ano (2022 a 2026), 4 por área e ano | igual | ok |
| Semelhança do enunciado com a questão real de origem | máxima 44,2% (posição 96); média 20,7%; 0 acima do limite | no máximo 50% | ok |
| Repete outra questão do banco (trechos de 4 palavras ≥ 25% ou vocabulário ≥ 60%) | 0 | 0 | ok |
| Alternativas erradas comentadas na explicação | 300 de 300 | todas | ok |
| Número do enunciado ≠ da explicação | 4 sinalizadas, todas por cálculo (soma ou diferença) feito pela explicação | 0 sem motivo | ok (conferidas à mão) |
| Dificuldade marcada | fundamental 22, intermediário 48, avançado 30 | alvo calibrado 15/45/40 | informativo (faltam avançadas) |

Não se aplica a este banco a regra «gabarito = letra seguinte/anterior à da prova real» do medidor, porque as questões não seguem a posição nem a decisão da questão real.

## 3. Mapa de origem

Posição no simulado, área, assunto da taxonomia e a questão real das provas da UNIFESP-EPM de que o assunto foi tirado.

| Posição | Área | Assunto | Origem do assunto | Gabarito | Dificuldade |
|---|---|---|---|---|---|
| 1 | Clínica Médica | sca | UNIFESP 2022 nº 80 | D | intermediario |
| 2 | Cirurgia | diverticulite | UNIFESP 2022 nº 7 | B | intermediario |
| 3 | Ginecologia e Obstetrícia | sangramentos | UNIFESP 2022 nº 31 | B | intermediario |
| 4 | Pediatria | reanimacao | UNIFESP 2022 nº 74 | C | avancado |
| 5 | Medicina Preventiva e Social | vigilancia | UNIFESP 2022 nº 44 | C | intermediario |
| 6 | Clínica Médica | drc | UNIFESP 2022 nº 76 | B | intermediario |
| 7 | Cirurgia | cirtorax-pleura | UNIFESP 2022 nº 14 | D | avancado |
| 8 | Ginecologia e Obstetrícia | dmg | UNIFESP 2022 nº 33 | C | fundamental |
| 9 | Pediatria | emergped-respiratoria | UNIFESP 2022 nº 65 | D | avancado |
| 10 | Medicina Preventiva e Social | bioestatistica | UNIFESP 2022 nº 45 | C | intermediario |
| 11 | Clínica Médica | cirrose | UNIFESP 2022 nº 79 | C | intermediario |
| 12 | Cirurgia | cirvasc-arterial | UNIFESP 2022 nº 18 | D | intermediario |
| 13 | Ginecologia e Obstetrícia | ists | UNIFESP 2022 nº 36 | A | intermediario |
| 14 | Pediatria | puericultura | UNIFESP 2022 nº 70 | C | fundamental |
| 15 | Medicina Preventiva e Social | cuidadospaliativos | UNIFESP 2022 nº 55 | A | avancado |
| 16 | Clínica Médica | psiq-psicoses | UNIFESP 2022 nº 99 | B | avancado |
| 17 | Cirurgia | uro-litiase | UNIFESP 2022 nº 4 | C | avancado |
| 18 | Ginecologia e Obstetrícia | abortamento | UNIFESP 2022 nº 39 | A | intermediario |
| 19 | Pediatria | neo-ecn | UNIFESP 2022 nº 11 | B | intermediario |
| 20 | Medicina Preventiva e Social | esf | UNIFESP 2022 nº 58 | A | fundamental |
| 21 | Clínica Médica | dpoc | UNIFESP 2023 nº 14 | D | intermediario |
| 22 | Cirurgia | cagastrico | UNIFESP 2023 nº 82 | D | avancado |
| 23 | Ginecologia e Obstetrícia | dheg | UNIFESP 2023 nº 51 | C | intermediario |
| 24 | Pediatria | ictericia | UNIFESP 2023 nº 73 | D | intermediario |
| 25 | Medicina Preventiva e Social | desenhosestudo | UNIFESP 2023 nº 21 | C | intermediario |
| 26 | Clínica Médica | tep | UNIFESP 2023 nº 20 | B | fundamental |
| 27 | Cirurgia | hernias | UNIFESP 2023 nº 85 | A | intermediario |
| 28 | Ginecologia e Obstetrícia | caendometrio | UNIFESP 2023 nº 45 | C | intermediario |
| 29 | Pediatria | neo-prematuridade | UNIFESP 2023 nº 68 | A | fundamental |
| 30 | Medicina Preventiva e Social | farmacovigilancia | UNIFESP 2023 nº 29 | A | intermediario |
| 31 | Clínica Médica | dm | UNIFESP 2023 nº 36 | D | fundamental |
| 32 | Cirurgia | queimaduras | UNIFESP 2023 nº 89 | A | intermediario |
| 33 | Ginecologia e Obstetrícia | camama | UNIFESP 2023 nº 46 | A | intermediario |
| 34 | Pediatria | dda | UNIFESP 2023 nº 76 | B | intermediario |
| 35 | Medicina Preventiva e Social | saudetrabalhador | UNIFESP 2023 nº 33 | B | fundamental |
| 36 | Clínica Médica | reumato-vasculites | UNIFESP 2023 nº 10 | D | avancado |
| 37 | Cirurgia | neurocir-tce | UNIFESP 2023 nº 97 | A | avancado |
| 38 | Ginecologia e Obstetrícia | prenatal | UNIFESP 2023 nº 55 | B | avancado |
| 39 | Pediatria | emergped-maustratos | UNIFESP 2023 nº 66 | C | intermediario |
| 40 | Medicina Preventiva e Social | niveisatencao | UNIFESP 2023 nº 24 | B | fundamental |
| 41 | Clínica Médica | dii | UNIFESP 2024 nº 23 | C | avancado |
| 42 | Cirurgia | colangite | UNIFESP 2024 nº 7 | D | intermediario |
| 43 | Ginecologia e Obstetrícia | infertilidade | UNIFESP 2024 nº 45 | B | avancado |
| 44 | Pediatria | calendariovacinal | UNIFESP 2024 nº 84 | C | fundamental |
| 45 | Medicina Preventiva e Social | tabagismo | UNIFESP 2024 nº 32 | D | intermediario |
| 46 | Clínica Médica | ic | UNIFESP 2024 nº 30 | C | avancado |
| 47 | Cirurgia | cirbariatrica | UNIFESP 2024 nº 11 | A | intermediario |
| 48 | Ginecologia e Obstetrícia | contracepcao | UNIFESP 2024 nº 50 | B | intermediario |
| 49 | Pediatria | neo-triagemneonatal | UNIFESP 2024 nº 88 | B | fundamental |
| 50 | Medicina Preventiva e Social | medidasepi | UNIFESP 2024 nº 70 | C | intermediario |
| 51 | Clínica Médica | neuro-desmielinizante | UNIFESP 2024 nº 41 | B | avancado |
| 52 | Cirurgia | cacolorretal | UNIFESP 2024 nº 12 | D | avancado |
| 53 | Ginecologia e Obstetrícia | trabalhoparto | UNIFESP 2024 nº 59 | A | intermediario |
| 54 | Pediatria | infectoped-pneumonia | UNIFESP 2024 nº 99 | D | intermediario |
| 55 | Medicina Preventiva e Social | vigilanciasanitaria | UNIFESP 2024 nº 73 | D | intermediario |
| 56 | Clínica Médica | reumato-cristais | UNIFESP 2024 nº 40 | A | intermediario |
| 57 | Cirurgia | traumaabd | UNIFESP 2024 nº 15 | D | intermediario |
| 58 | Ginecologia e Obstetrícia | climaterio | UNIFESP 2024 nº 49 | C | avancado |
| 59 | Pediatria | crescimentopuberdade | UNIFESP 2024 nº 98 | B | intermediario |
| 60 | Medicina Preventiva e Social | bioestatistica | UNIFESP 2024 nº 79 | C | fundamental |
| 61 | Clínica Médica | doencapeptica | UNIFESP 2025 nº 18 | C | intermediario |
| 62 | Cirurgia | cirvasc-disseccao | UNIFESP 2025 nº 4 | B | avancado |
| 63 | Ginecologia e Obstetrícia | aloimunizacaorh | UNIFESP 2025 nº 74 | A | fundamental |
| 64 | Pediatria | neo-malformacoesdigestivas | UNIFESP 2025 nº 6 | A | avancado |
| 65 | Medicina Preventiva e Social | assistenciasocial | UNIFESP 2025 nº 29 | D | intermediario |
| 66 | Clínica Médica | paratireoide | UNIFESP 2025 nº 22 | D | fundamental |
| 67 | Cirurgia | pancreatite | UNIFESP 2025 nº 5 | B | avancado |
| 68 | Ginecologia e Obstetrícia | doencatrofoblastica | UNIFESP 2025 nº 75 | C | avancado |
| 69 | Pediatria | neo-descrresp | UNIFESP 2025 nº 93 | C | avancado |
| 70 | Medicina Preventiva e Social | gestaosaude | UNIFESP 2025 nº 47 | B | intermediario |
| 71 | Clínica Médica | hidroeletrolitico | UNIFESP 2025 nº 33 | A | intermediario |
| 72 | Cirurgia | uro-oncologia | UNIFESP 2025 nº 15 | C | avancado |
| 73 | Ginecologia e Obstetrícia | gestacaomultipla | UNIFESP 2025 nº 79 | D | avancado |
| 74 | Pediatria | neo-infeccoescongenitas | UNIFESP 2025 nº 99 | A | avancado |
| 75 | Medicina Preventiva e Social | prevencao | UNIFESP 2025 nº 52 | D | intermediario |
| 76 | Clínica Médica | hanseniase | UNIFESP 2025 nº 35 | C | fundamental |
| 77 | Cirurgia | orto-ligamentos | UNIFESP 2025 nº 20 | B | fundamental |
| 78 | Ginecologia e Obstetrícia | miomatose | UNIFESP 2025 nº 70 | B | intermediario |
| 79 | Pediatria | reanimacao | UNIFESP 2025 nº 89 | A | intermediario |
| 80 | Medicina Preventiva e Social | comunicacaoclinica | UNIFESP 2025 nº 95 | A | intermediario |
| 81 | Clínica Médica | tuberculose | UNIFESP 2026 nº 36 | C | intermediario |
| 82 | Cirurgia | traumatorax | UNIFESP 2026 nº 8 | A | intermediario |
| 83 | Ginecologia e Obstetrícia | endometriose | UNIFESP 2026 nº 44 | B | fundamental |
| 84 | Pediatria | bronquiolite | UNIFESP 2026 nº 89 | A | intermediario |
| 85 | Medicina Preventiva e Social | principiosbioetica | UNIFESP 2026 nº 67 | B | avancado |
| 86 | Clínica Médica | reumato-les | UNIFESP 2026 nº 86 | D | avancado |
| 87 | Cirurgia | cirtorax-esofago | UNIFESP 2026 nº 16 | A | fundamental |
| 88 | Ginecologia e Obstetrícia | cavulva | UNIFESP 2026 nº 45 | C | intermediario |
| 89 | Pediatria | transmissaoverticalhiv | UNIFESP 2026 nº 84 | A | intermediario |
| 90 | Medicina Preventiva e Social | medidasepi | UNIFESP 2026 nº 74 | D | avancado |
| 91 | Clínica Médica | psiq-humor | UNIFESP 2026 nº 65 | B | avancado |
| 92 | Cirurgia | apendicite | UNIFESP 2026 nº 11 | D | intermediario |
| 93 | Ginecologia e Obstetrícia | diagnosticoprenatal | UNIFESP 2026 nº 59 | B | avancado |
| 94 | Pediatria | sepseneonatal | UNIFESP 2026 nº 98 | A | avancado |
| 95 | Medicina Preventiva e Social | bioestatistica | UNIFESP 2026 nº 80 | D | fundamental |
| 96 | Clínica Médica | intolerancialactose | UNIFESP 2026 nº 99 | D | fundamental |
| 97 | Cirurgia | orto-ombro | UNIFESP 2026 nº 21 | A | fundamental |
| 98 | Ginecologia e Obstetrícia | uroginecologia | UNIFESP 2026 nº 48 | D | intermediario |
| 99 | Pediatria | calendariovacinal | UNIFESP 2026 nº 96 | C | fundamental |
| 100 | Medicina Preventiva e Social | principiossus | UNIFESP 2026 nº 70 | B | fundamental |

## 4. Diretrizes: o que foi e o que não foi conferido

**Nenhum texto oficial de diretriz foi aberto nesta rodada.** Todas as 100 questões estão no nível «memória» (cada referência diz isso). Os pontos em que a regra muda com o tempo ou em que a versão citada pode estar velha, e que merecem conferência na edição vigente:

- **99, 44 e 49** (calendário e vacinas, triagem neonatal): protocolos do Ministério da Saúde e do Programa Nacional de Imunizações mudam com frequência; conferir esquemas e idades na versão vigente.
- **76, 81 e 13** (hanseníase, tuberculose na gestação, doença inflamatória pélvica): esquemas do Ministério da Saúde de 2019 a 2022.
- **35** (exame de retorno ao trabalho): redação da NR-7 pode ter sido atualizada (o prazo é o de 30 dias de afastamento; o momento é antes de o trabalhador reassumir a função).
- **61, 21, 41, 46, 86 e 62**: GOLD, ESC, ECCO, KDIGO e AHA citados sem confirmação da edição mais nova.
- **53, 38 e 43**: critérios de conduta obstétrica e de infertilidade (RCOG, CDC/ACOG, OMS 2021) citados de memória.
- **72, 52 e 22**: protocolos oncológicos (cisplatina neoadjuvante, triagem de Lynch, FLOT) mudam com novos estudos.
- Questões com cálculo (10, 50, 60, 90): conferidas à mão.

## 5. Revisão externa de 29/10/2026 (questões 5 e 11)

Um parecer externo ("Justificativas da revisão", 29/10/2026) apontou dois problemas. Os dois foram conferidos nas fontes enviadas e corrigidos:

- **Questão 5 (profilaxia da raiva): erro confirmado e questão refeita.** A Nota Técnica nº 8/2022-CGZV/DEIDT/SVS/MS (Quadro 3 e fluxograma) manda, para cão ou gato **sadio e passível de observação por 10 dias**, em exposição leve **ou grave**, lavar o ferimento, **não iniciar a profilaxia** e observar o animal; só se ele adoecer, morrer ou desaparecer se indica vacina (4 doses, dias 0, 3, 7 e 14) e, na exposição grave, soro (40 UI/kg) ou imunoglobulina (20 UI/kg). O esquema de 2 doses (dias 0 e 3) que eu havia dado como correto era o do protocolo antigo, revogado por essa nota; a questão ficou sem resposta certa. Agora o gabarito é "lavar, não iniciar a profilaxia e observar o cão por 10 dias", e o esquema antigo virou distrator. O quadro de 10/07/2026 citado no parecer não pôde ser aberto, mas a conduta para cão sadio observável é a mesma da nota técnica (a nota é de 2022: vale conferir se algo mudou depois).
- **Questão 11 (colangite biliar primária): gabarito mantido, explicação atualizada.** A diretriz AASLD/AGA de 2026 (Levy C et al., Hepatology) confirma o ácido ursodesoxicólico (13 a 15 mg/kg ao dia) como primeira linha, avaliação da resposta entre 6 e 12 meses, e, na resposta inadequada, **agonistas PPAR (elafibranor, seladelpar)** como adição, ou isolados se houver intolerância ao ácido ursodesoxicólico; fibratos ficam fora da bula, e o ácido obeticólico não é recomendado. A retirada do ácido obeticólico do mercado dos Estados Unidos foi confirmada em notícias da imprensa médica; a revogação pela agência europeia e o comunicado da AASLD de 06/11/2025 citados no parecer **não foram verificados** por mim, e o PCDT brasileiro também não foi aberto. A explicação deixou de apresentar o ácido obeticólico como opção de rotina.

O parecer registra que não valida as demais 98 questões, e eu também não as revalidei: as demais referências continuam no nível «memória».

## 6. Revisão pela equipe

Foi uma releitura pela mesma autoria. A revisão por pessoas da equipe (leitura cega, com resposta de cada questão comparada ao gabarito) continua recomendada antes de dar o simulado a alunos.
