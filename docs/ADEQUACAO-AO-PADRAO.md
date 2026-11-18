# Adequação das questões ao padrão da plataforma

Gerado por `npm run auditoria-padrao` em 18/11/2026. Mede **todas** as questões (também as anteriores aos cortes de data que o conferidor usa) contra `dados/PADRAO-EXPLICACAO.md`: justificativa (`faltasDeJustificativa`) e referência com data de leitura. "Completa" = forma da justificativa sem falta, **mecanismo e epidemiologia presentes (heurística por palavra-chave, não prova qualidade)** e referência datada. Não é erro: `npm run conferir` só cobra o padrão de conteúdo novo.

```
12137 questões em 156 arquivos; 1572 já cumprem forma + mecanismo/epidemiologia + referência datada (13.0%).
Conteúdo (heurística por palavra-chave, itens 7 e 8): 12057 de 12137 mencionam mecanismo E epidemiologia (99.3%). Forma da justificativa (itens 1–4): 12135 de 12137 sem falta (100.0%).
Referências: 1578 lidas e datadas, 45 de livro-texto indicadas sem leitura, 9101 sem data, 36 vazias, 1377 fracas.
Justificativa — o que falta:
     80  sem mecanismo/fisiopatologia
      2  sem Dicas do enunciado
      1  corpo curto
      1  sem destaque **
Mapa: 39 diretrizes da tabela + 17 famílias; 36 questões sem referência.
```

## Por arquivo (mais questões a adequar primeiro)

| Arquivo | Questões | Completas | Mecanismo + epidem. | Ref. sem data/vazia/fraca | Principais faltas |
|---|---:|---:|---:|---|---|
| didatico-grad-hiv | 218 | 0 | 218 | 218/0/0 | — |
| didatico-grad-parasitoses | 198 | 0 | 198 | 198/0/0 | — |
| didatico-grad-tuberculose | 182 | 0 | 182 | 182/0/0 | — |
| didatico-grad-meningites | 180 | 0 | 180 | 180/0/0 | — |
| didatico-grad-pneumonias | 142 | 0 | 142 | 142/0/0 | — |
| didatico-grad-iras | 127 | 0 | 127 | 127/0/0 | — |
| didatico-grad-antibioticos | 126 | 4 | 126 | 122/0/0 | — |
| didatico-grad-arboviroses | 121 | 0 | 121 | 121/0/0 | — |
| unicamp-2024-dissertativa | 120 | 0 | 120 | 120/0/0 | — |
| uspsp-simulado-3 | 120 | 1 | 120 | 119/0/0 | — |
| tp-2023-1 | 120 | 2 | 120 | 118/0/0 | — |
| tp-2025-2 | 120 | 3 | 120 | 117/0/0 | — |
| simulado-epm-6 | 120 | 4 | 120 | 115/0/1 | — |
| tp-2021-2 | 120 | 4 | 120 | 116/0/0 | — |
| tp-2026-1 | 120 | 4 | 120 | 116/0/0 | — |
| usprp-2021 | 120 | 5 | 120 | 115/0/0 | — |
| tp-2022-2 | 120 | 5 | 119 | 115/0/0 | sem mecanismo/fisiopatologia (1) |
| tp-2024-1 | 120 | 5 | 120 | 115/0/0 | — |
| tp-2023-2 | 120 | 6 | 120 | 114/0/0 | — |
| tp-2025-1 | 120 | 6 | 120 | 114/0/0 | — |
| uspsp-simulado-1 | 120 | 6 | 113 | 112/0/0 | sem mecanismo/fisiopatologia (7) |
| uspsp-simulado-2 | 120 | 6 | 115 | 113/0/0 | sem mecanismo/fisiopatologia (5) |
| uspsp-simulado-4 | 120 | 6 | 115 | 112/0/0 | sem mecanismo/fisiopatologia (5) |
| tp-2020-2 | 120 | 7 | 120 | 111/2/0 | — |
| uspsp-simulado-5 | 120 | 7 | 120 | 113/0/0 | — |
| santacasa-2022 | 100 | 1 | 100 | 99/0/0 | — |
| unicamp-2025-dissertativa | 100 | 1 | 100 | 99/0/0 | — |
| fmabc-2024 | 100 | 1 | 96 | 0/0/99 | sem mecanismo/fisiopatologia (4) |
| fmabc-2021 | 100 | 1 | 98 | 0/0/99 | sem mecanismo/fisiopatologia (2) |
| didatico-grad-sepse | 100 | 1 | 100 | 99/0/0 | — |
| santacasa-2026 | 100 | 2 | 100 | 98/0/0 | — |
| famema-2023 | 100 | 2 | 100 | 98/0/0 | — |
| famema-2025 | 100 | 2 | 100 | 98/0/0 | — |
| sessp-2026 | 100 | 2 | 100 | 98/0/0 | — |
| sirio-2023 | 100 | 2 | 86 | 98/0/0 | sem mecanismo/fisiopatologia (14) |
| fmabc-2025 | 100 | 2 | 93 | 0/0/98 | sem mecanismo/fisiopatologia (7) |
| fmabc-2022 | 100 | 2 | 100 | 0/0/98 | — |
| fmabc-2023 | 100 | 2 | 95 | 0/0/98 | sem mecanismo/fisiopatologia (5) |
| didatico-grad-piodermites | 98 | 0 | 98 | 98/0/0 | — |
| sessp-2025 | 100 | 3 | 100 | 97/0/0 | — |
| sirio-2025 | 100 | 3 | 95 | 97/0/0 | sem mecanismo/fisiopatologia (5) |
| sirio-2026 | 100 | 3 | 100 | 97/0/0 | — |
| sirio-2021 | 100 | 3 | 95 | 97/0/0 | sem mecanismo/fisiopatologia (5) |
| sirio-2022 | 100 | 3 | 95 | 97/0/0 | sem mecanismo/fisiopatologia (5) |
| amrigs-2022 | 100 | 4 | 100 | 96/0/0 | — |
| amrigs-2023 | 100 | 4 | 100 | 96/0/0 | — |
| amrigs-2020 | 100 | 4 | 100 | 96/0/0 | — |
| famema-2022 | 100 | 4 | 100 | 96/0/0 | — |
| sessp-2023 | 100 | 4 | 100 | 96/0/0 | — |
| sirio-2024 | 100 | 4 | 93 | 96/0/0 | sem mecanismo/fisiopatologia (7) |
| sirio-2027 | 100 | 4 | 96 | 96/0/0 | sem mecanismo/fisiopatologia (4) |
| santacasa-2021 | 100 | 5 | 100 | 95/0/0 | — |
| santacasa-2025 | 100 | 5 | 100 | 95/0/0 | — |
| amrigs-2021 | 100 | 5 | 100 | 95/0/0 | — |
| sessp-2022 | 100 | 5 | 100 | 95/0/0 | — |
| unesp-2021 | 100 | 5 | 100 | 95/0/0 | — |
| santacasa-2023 | 100 | 6 | 100 | 94/0/0 | — |
| usprp-2022 | 100 | 6 | 100 | 94/0/0 | — |
| amrigs-2024 | 100 | 6 | 100 | 94/0/0 | — |
| iamspe-2025 | 100 | 6 | 100 | 94/0/0 | — |
| unesp-2023 | 100 | 6 | 100 | 94/0/0 | — |
| sessp-2024 | 100 | 6 | 100 | 94/0/0 | — |
| simulado-epm-2026-10 | 100 | 6 | 99 | 94/0/0 | sem mecanismo/fisiopatologia (1) |
| usprp-2023 | 100 | 7 | 100 | 93/0/0 | — |
| usprp-2026 | 100 | 7 | 100 | 93/0/0 | — |
| amrigs-2025 | 100 | 7 | 100 | 93/0/0 | — |
| famema-2021 | 100 | 7 | 100 | 93/0/0 | — |
| unesp-2022 | 100 | 7 | 100 | 93/0/0 | — |
| unesp-2026 | 100 | 7 | 100 | 93/0/0 | — |
| fmabc-2026 | 100 | 7 | 98 | 0/0/93 | sem mecanismo/fisiopatologia (2) |
| didatico-grad-hepatoesplenomegalias | 93 | 0 | 93 | 93/0/0 | — |
| usprp-2024 | 100 | 8 | 100 | 92/0/0 | — |
| usprp-2025 | 100 | 8 | 100 | 92/0/0 | — |
| unesp-2025 | 100 | 8 | 100 | 92/0/0 | — |
| unesp-2024 | 100 | 9 | 100 | 91/0/0 | — |
| simulado-didatico-epm | 100 | 9 | 100 | 91/0/0 | — |
| iamspe-2026 | 100 | 14 | 100 | 86/0/0 | — |
| simulado-epm-5 | 100 | 16 | 100 | 51/0/33 | — |
| simulado-epm-4 | 100 | 20 | 100 | 43/0/37 | — |
| didatico | 135 | 56 | 135 | 0/34/0 | corpo curto (1); sem destaque ** (1); sem Dicas do enunciado (1) |
| iamspe-2023 | 80 | 1 | 80 | 79/0/0 | — |
| simulado-epm-2 | 100 | 23 | 100 | 68/0/8 | sem Dicas do enunciado (1) |
| iamspe-2021 | 80 | 3 | 80 | 77/0/0 | — |
| iamspe-2022 | 80 | 3 | 80 | 77/0/0 | — |
| famerp-2022 | 80 | 3 | 80 | 77/0/0 | — |
| unicamp-2022 | 80 | 3 | 80 | 77/0/0 | — |
| simulado-epm-3 | 100 | 24 | 100 | 44/0/32 | — |
| unicamp-2023 | 80 | 4 | 80 | 76/0/0 | — |
| unifesp-2022 | 100 | 25 | 100 | 1/0/74 | — |
| famerp-2025 | 80 | 5 | 80 | 75/0/0 | — |
| einstein-2027 | 75 | 0 | 74 | 0/0/75 | sem mecanismo/fisiopatologia (1) |
| didatico-grad-neutropenia | 75 | 0 | 75 | 75/0/0 | — |
| famerp-2023 | 80 | 7 | 80 | 73/0/0 | — |
| didatico-grad-micoses | 73 | 0 | 73 | 73/0/0 | — |
| einstein-2022 | 75 | 3 | 75 | 0/0/72 | — |
| einstein-2023 | 75 | 3 | 75 | 0/0/72 | — |
| einstein-2025 | 75 | 3 | 75 | 0/0/72 | — |
| einstein-2026 | 75 | 3 | 75 | 0/0/72 | — |
| famerp-2024 | 74 | 3 | 74 | 71/0/0 | — |
| einstein-2024 | 75 | 5 | 75 | 0/0/70 | — |
| unifesp-2024-adaptado | 100 | 31 | 100 | 69/0/0 | — |
| unifesp-2023 | 100 | 31 | 100 | 4/0/65 | — |
| famerp-2026 | 71 | 4 | 71 | 67/0/0 | — |
| didatico-grad-endocardite | 63 | 0 | 63 | 63/0/0 | — |
| unicamp-2023-dissertativa | 60 | 0 | 60 | 60/0/0 | — |
| unicamp-2022-dissertativa | 60 | 1 | 60 | 59/0/0 | — |
| einstein-2021 | 50 | 3 | 50 | 0/0/47 | — |
| usp-2022 | 100 | 60 | 100 | 0/0/40 | — |
| didatico-grad-sfiha | 35 | 0 | 35 | 35/0/0 | — |
| didatico-grad-leptospirose | 32 | 0 | 32 | 32/0/0 | — |
| didatico-grad-malaria | 27 | 0 | 27 | 27/0/0 | — |
| didatico-grad-influenza | 20 | 0 | 20 | 20/0/0 | — |
| unifesp-2025 | 100 | 88 | 100 | 7/0/5 | — |
| unifesp-2026 | 100 | 94 | 100 | 3/0/3 | — |
| unifesp-2024 | 100 | 95 | 100 | 3/0/2 | — |
| usp-2023 | 120 | 115 | 120 | 0/0/5 | — |
| usp-2025 | 120 | 117 | 120 | 0/0/3 | — |
| usp-2024 | 120 | 118 | 120 | 0/0/2 | — |
| usp-2026 | 120 | 119 | 120 | 0/0/1 | — |
| unifesp-discente-2026-2 | 100 | 99 | 100 | 0/0/1 | — |
| reposicoes-amrigs-2021 | 0 | 0 | 0 | 0/0/0 | — |
| reposicoes-rotavirus | 4 | 4 | 4 | 0/0/0 | — |
| reposicoes-colo-e-lei | 5 | 5 | 5 | 0/0/0 | — |
| reposicoes-clinicas-1 | 4 | 4 | 4 | 0/0/0 | — |
| reposicoes-clinicas-2 | 2 | 2 | 2 | 0/0/0 | — |
| reposicoes-pcdt-1 | 2 | 2 | 2 | 0/0/0 | — |
| reposicoes-pcdt-2 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-pcdt-3 | 4 | 4 | 4 | 0/0/0 | — |
| reposicoes-pcdt-4 | 3 | 3 | 3 | 0/0/0 | — |
| reposicoes-gina-1 | 2 | 2 | 2 | 0/0/0 | — |
| reposicoes-clinicas-3 | 2 | 2 | 2 | 0/0/0 | — |
| reposicoes-sbd-1 | 2 | 2 | 2 | 0/0/0 | — |
| reposicoes-ferro-1 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-rastreio-pre-eclampsia-1 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-acerto-1 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-colecistite-gestante-1 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-queimaduras-1 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-pancreatite-1 | 2 | 2 | 2 | 0/0/0 | — |
| reposicoes-diverticulite-1 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-saude-trabalhador-1 | 2 | 2 | 2 | 0/0/0 | — |
| reposicoes-puberdade-1 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-vacinas-2 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-asma-pediatrica-1 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-bioestatistica-1 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-has-pediatrica-1 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-fa-1 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-valvopatias-1 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-pre-eclampsia-1 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-climaterio-1 | 2 | 2 | 2 | 0/0/0 | — |
| reposicoes-contracepcao-1 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-vacinas-1 | 3 | 3 | 3 | 0/0/0 | — |
| reposicoes-sbc-1 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-epidemiologia-1 | 5 | 5 | 5 | 0/0/0 | — |
| reposicoes-imagens-1 | 2 | 2 | 2 | 0/0/0 | — |
| reposicoes-imagens-2 | 1 | 1 | 1 | 0/0/0 | — |
| reposicoes-ist-1 | 3 | 3 | 3 | 0/0/0 | — |

Para ver questão a questão: `npm run auditoria-padrao -- prova <nome>`.
