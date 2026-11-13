# Adequação das questões ao padrão da plataforma

Gerado por `npm run auditoria-padrao` em 13/11/2026. Mede **todas** as questões (também as anteriores aos cortes de data que o conferidor usa) contra `dados/PADRAO-EXPLICACAO.md`: justificativa (`faltasDeJustificativa`) e referência com data de leitura. "Completa" = forma da justificativa sem falta, **mecanismo e epidemiologia presentes (heurística por palavra-chave, não prova qualidade)** e referência datada. Não é erro: `npm run conferir` só cobra o padrão de conteúdo novo.

```
12137 questões em 156 arquivos; 975 já cumprem forma + mecanismo/epidemiologia + referência datada (8.0%).
Conteúdo (heurística por palavra-chave, itens 7 e 8): 2140 de 12137 mencionam mecanismo E epidemiologia (17.6%). Forma da justificativa (itens 1–4): 12014 de 12137 sem falta (99.0%).
Referências: 1158 datadas, 9444 sem data, 137 vazias, 1398 fracas.
Justificativa — o que falta:
   7886  sem mecanismo/fisiopatologia
   7619  sem epidemiologia
    122  sem Dicas do enunciado
    121  sem destaque **
    120  errada sem motivo
     61  corpo curto
Mapa: 39 diretrizes da tabela + 17 famílias; 137 questões sem referência.
```

## Por arquivo (mais questões a adequar primeiro)

| Arquivo | Questões | Completas | Mecanismo + epidem. | Ref. sem data/vazia/fraca | Principais faltas |
|---|---:|---:|---:|---|---|
| didatico-grad-hiv | 218 | 0 | 30 | 218/0/0 | sem epidemiologia (188) |
| didatico-grad-parasitoses | 198 | 0 | 23 | 198/0/0 | sem epidemiologia (175); corpo curto (1) |
| didatico-grad-tuberculose | 182 | 0 | 35 | 182/0/0 | sem epidemiologia (146); sem mecanismo/fisiopatologia (2) |
| didatico-grad-meningites | 180 | 0 | 26 | 180/0/0 | sem epidemiologia (154) |
| didatico-grad-pneumonias | 142 | 0 | 42 | 142/0/0 | sem epidemiologia (100) |
| didatico | 135 | 0 | 15 | 0/135/0 | sem destaque ** (121); sem Dicas do enunciado (121); errada sem motivo (120) |
| didatico-grad-iras | 127 | 0 | 20 | 127/0/0 | sem epidemiologia (107) |
| didatico-grad-antibioticos | 126 | 0 | 12 | 126/0/0 | sem epidemiologia (114) |
| didatico-grad-arboviroses | 121 | 0 | 19 | 121/0/0 | sem epidemiologia (102) |
| simulado-epm-6 | 120 | 0 | 2 | 115/0/1 | sem mecanismo/fisiopatologia (112); sem epidemiologia (68) |
| usprp-2021 | 120 | 0 | 1 | 120/0/0 | sem mecanismo/fisiopatologia (116); sem epidemiologia (104) |
| tp-2020-2 | 120 | 0 | 3 | 115/2/0 | sem mecanismo/fisiopatologia (114); sem epidemiologia (99) |
| tp-2021-2 | 120 | 0 | 0 | 119/0/0 | sem mecanismo/fisiopatologia (119); sem epidemiologia (99) |
| tp-2022-2 | 120 | 0 | 1 | 120/0/0 | sem mecanismo/fisiopatologia (117); sem epidemiologia (97) |
| tp-2023-1 | 120 | 0 | 1 | 120/0/0 | sem mecanismo/fisiopatologia (115); sem epidemiologia (99) |
| tp-2023-2 | 120 | 0 | 0 | 117/0/0 | sem mecanismo/fisiopatologia (118); sem epidemiologia (104) |
| tp-2024-1 | 120 | 0 | 0 | 118/0/0 | sem mecanismo/fisiopatologia (115); sem epidemiologia (105) |
| tp-2025-1 | 120 | 0 | 0 | 117/0/0 | sem mecanismo/fisiopatologia (115); sem epidemiologia (108) |
| tp-2025-2 | 120 | 0 | 1 | 120/0/0 | sem mecanismo/fisiopatologia (117); sem epidemiologia (98) |
| tp-2026-1 | 120 | 0 | 1 | 117/0/0 | sem mecanismo/fisiopatologia (116); sem epidemiologia (100) |
| unicamp-2024-dissertativa | 120 | 0 | 1 | 120/0/0 | sem mecanismo/fisiopatologia (117); sem epidemiologia (82) |
| uspsp-simulado-1 | 120 | 0 | 0 | 120/0/0 | sem mecanismo/fisiopatologia (115); sem epidemiologia (88) |
| uspsp-simulado-2 | 120 | 0 | 1 | 120/0/0 | sem mecanismo/fisiopatologia (118); sem epidemiologia (82) |
| uspsp-simulado-5 | 120 | 0 | 1 | 120/0/0 | sem mecanismo/fisiopatologia (114); sem epidemiologia (83) |
| uspsp-simulado-4 | 120 | 0 | 1 | 120/0/0 | sem mecanismo/fisiopatologia (118); sem epidemiologia (81) |
| uspsp-simulado-3 | 120 | 0 | 98 | 120/0/0 | sem mecanismo/fisiopatologia (22); sem epidemiologia (12) |
| unifesp-2024-adaptado | 100 | 0 | 1 | 79/0/0 | sem mecanismo/fisiopatologia (98); sem epidemiologia (61) |
| simulado-epm-2 | 100 | 0 | 0 | 70/0/11 | sem mecanismo/fisiopatologia (95); sem epidemiologia (89); sem Dicas do enunciado (1) |
| simulado-epm-3 | 100 | 0 | 1 | 45/0/36 | sem mecanismo/fisiopatologia (97); sem epidemiologia (81) |
| simulado-epm-4 | 100 | 0 | 1 | 45/0/42 | sem mecanismo/fisiopatologia (99); sem epidemiologia (84) |
| simulado-epm-5 | 100 | 0 | 1 | 55/0/38 | sem mecanismo/fisiopatologia (94); sem epidemiologia (54) |
| santacasa-2021 | 100 | 0 | 5 | 100/0/0 | sem mecanismo/fisiopatologia (93); sem epidemiologia (81) |
| santacasa-2022 | 100 | 0 | 7 | 100/0/0 | sem mecanismo/fisiopatologia (91); sem epidemiologia (85) |
| santacasa-2023 | 100 | 0 | 7 | 100/0/0 | sem mecanismo/fisiopatologia (92); sem epidemiologia (79) |
| santacasa-2025 | 100 | 0 | 1 | 100/0/0 | sem mecanismo/fisiopatologia (98); sem epidemiologia (87) |
| santacasa-2026 | 100 | 0 | 1 | 100/0/0 | sem mecanismo/fisiopatologia (98); sem epidemiologia (87) |
| usprp-2022 | 100 | 0 | 0 | 100/0/0 | sem mecanismo/fisiopatologia (100); sem epidemiologia (85) |
| usprp-2023 | 100 | 0 | 2 | 100/0/0 | sem mecanismo/fisiopatologia (97); sem epidemiologia (84) |
| usprp-2024 | 100 | 0 | 0 | 100/0/0 | sem mecanismo/fisiopatologia (99); sem epidemiologia (78) |
| usprp-2025 | 100 | 0 | 1 | 100/0/0 | sem mecanismo/fisiopatologia (95); sem epidemiologia (74) |
| usprp-2026 | 100 | 0 | 0 | 100/0/0 | sem mecanismo/fisiopatologia (98); sem epidemiologia (84) |
| amrigs-2022 | 100 | 0 | 3 | 100/0/0 | sem mecanismo/fisiopatologia (94); sem epidemiologia (81) |
| amrigs-2023 | 100 | 0 | 1 | 100/0/0 | sem mecanismo/fisiopatologia (98); sem epidemiologia (77) |
| amrigs-2024 | 100 | 0 | 3 | 100/0/0 | sem mecanismo/fisiopatologia (96); sem epidemiologia (76) |
| amrigs-2025 | 100 | 0 | 3 | 100/0/0 | sem mecanismo/fisiopatologia (94); sem epidemiologia (79) |
| amrigs-2020 | 100 | 0 | 12 | 100/0/0 | sem mecanismo/fisiopatologia (88); sem epidemiologia (75) |
| amrigs-2021 | 100 | 0 | 7 | 100/0/0 | sem mecanismo/fisiopatologia (91); sem epidemiologia (84) |
| iamspe-2025 | 100 | 0 | 3 | 100/0/0 | sem mecanismo/fisiopatologia (90); sem epidemiologia (82) |
| iamspe-2026 | 100 | 0 | 1 | 100/0/0 | sem mecanismo/fisiopatologia (94); sem epidemiologia (82) |
| unesp-2023 | 100 | 0 | 0 | 100/0/0 | sem mecanismo/fisiopatologia (98); sem epidemiologia (86) |
| famema-2021 | 100 | 0 | 1 | 100/0/0 | sem mecanismo/fisiopatologia (99); sem epidemiologia (94) |
| famema-2022 | 100 | 0 | 0 | 100/0/0 | sem mecanismo/fisiopatologia (99); sem epidemiologia (91) |
| famema-2023 | 100 | 0 | 1 | 100/0/0 | sem mecanismo/fisiopatologia (98); sem epidemiologia (89) |
| famema-2025 | 100 | 0 | 0 | 100/0/0 | sem mecanismo/fisiopatologia (99); sem epidemiologia (90) |
| sessp-2022 | 100 | 0 | 3 | 100/0/0 | sem mecanismo/fisiopatologia (95); sem epidemiologia (85) |
| sessp-2023 | 100 | 0 | 9 | 100/0/0 | sem mecanismo/fisiopatologia (88); sem epidemiologia (82) |
| sessp-2024 | 100 | 0 | 8 | 100/0/0 | sem mecanismo/fisiopatologia (90); sem epidemiologia (83) |
| sessp-2025 | 100 | 0 | 1 | 100/0/0 | sem mecanismo/fisiopatologia (97); sem epidemiologia (91) |
| sessp-2026 | 100 | 0 | 0 | 100/0/0 | sem mecanismo/fisiopatologia (96); sem epidemiologia (87) |
| unesp-2021 | 100 | 0 | 3 | 100/0/0 | sem mecanismo/fisiopatologia (95); sem epidemiologia (82) |
| unesp-2022 | 100 | 0 | 0 | 100/0/0 | sem mecanismo/fisiopatologia (98); sem epidemiologia (87) |
| unesp-2024 | 100 | 0 | 1 | 100/0/0 | sem mecanismo/fisiopatologia (98); sem epidemiologia (83) |
| unesp-2025 | 100 | 0 | 0 | 100/0/0 | sem mecanismo/fisiopatologia (98); sem epidemiologia (83) |
| unesp-2026 | 100 | 0 | 0 | 100/0/0 | sem mecanismo/fisiopatologia (99); sem epidemiologia (75) |
| unicamp-2025-dissertativa | 100 | 0 | 1 | 100/0/0 | sem mecanismo/fisiopatologia (98); sem epidemiologia (81) |
| simulado-epm-2026-10 | 100 | 0 | 84 | 100/0/0 | sem epidemiologia (12); sem mecanismo/fisiopatologia (5) |
| sirio-2023 | 100 | 0 | 7 | 100/0/0 | sem mecanismo/fisiopatologia (93) |
| sirio-2024 | 100 | 0 | 1 | 100/0/0 | sem mecanismo/fisiopatologia (99) |
| sirio-2025 | 100 | 0 | 9 | 100/0/0 | sem mecanismo/fisiopatologia (91); sem epidemiologia (1) |
| sirio-2026 | 100 | 0 | 4 | 100/0/0 | sem mecanismo/fisiopatologia (96) |
| sirio-2027 | 100 | 0 | 9 | 100/0/0 | sem mecanismo/fisiopatologia (91) |
| sirio-2021 | 100 | 0 | 0 | 100/0/0 | sem mecanismo/fisiopatologia (100) |
| sirio-2022 | 100 | 0 | 2 | 100/0/0 | sem mecanismo/fisiopatologia (98) |
| fmabc-2025 | 100 | 0 | 13 | 0/0/99 | sem mecanismo/fisiopatologia (87) |
| fmabc-2024 | 100 | 0 | 9 | 0/0/99 | sem mecanismo/fisiopatologia (91); sem epidemiologia (1) |
| fmabc-2021 | 100 | 0 | 8 | 0/0/99 | sem mecanismo/fisiopatologia (92) |
| fmabc-2022 | 100 | 0 | 3 | 0/0/98 | sem mecanismo/fisiopatologia (97) |
| fmabc-2023 | 100 | 0 | 5 | 0/0/98 | sem mecanismo/fisiopatologia (95) |
| simulado-didatico-epm | 100 | 0 | 1 | 99/0/0 | sem mecanismo/fisiopatologia (96); sem epidemiologia (56) |
| didatico-grad-sepse | 100 | 0 | 18 | 100/0/0 | sem epidemiologia (82); sem mecanismo/fisiopatologia (2) |
| didatico-grad-piodermites | 98 | 0 | 12 | 98/0/0 | sem epidemiologia (86) |
| fmabc-2026 | 100 | 7 | 91 | 0/0/93 | sem mecanismo/fisiopatologia (9) |
| didatico-grad-hepatoesplenomegalias | 93 | 0 | 16 | 93/0/0 | sem epidemiologia (77) |
| iamspe-2021 | 80 | 0 | 5 | 80/0/0 | sem mecanismo/fisiopatologia (71); sem epidemiologia (58) |
| iamspe-2022 | 80 | 0 | 4 | 80/0/0 | sem mecanismo/fisiopatologia (75); sem epidemiologia (65) |
| iamspe-2023 | 80 | 0 | 6 | 80/0/0 | sem mecanismo/fisiopatologia (73); sem epidemiologia (54) |
| famerp-2023 | 80 | 0 | 0 | 80/0/0 | sem mecanismo/fisiopatologia (79); sem epidemiologia (76) |
| famerp-2025 | 80 | 0 | 4 | 80/0/0 | sem mecanismo/fisiopatologia (75); sem epidemiologia (65) |
| famerp-2022 | 80 | 0 | 1 | 80/0/0 | sem mecanismo/fisiopatologia (78); sem epidemiologia (68) |
| unicamp-2022 | 80 | 0 | 3 | 80/0/0 | sem mecanismo/fisiopatologia (76); sem epidemiologia (63) |
| unicamp-2023 | 80 | 0 | 1 | 80/0/0 | sem mecanismo/fisiopatologia (77); sem epidemiologia (68) |
| unifesp-2022 | 100 | 24 | 81 | 1/0/75 | sem epidemiologia (18); sem mecanismo/fisiopatologia (6) |
| einstein-2022 | 75 | 0 | 24 | 0/0/72 | sem epidemiologia (51); sem mecanismo/fisiopatologia (1) |
| einstein-2024 | 75 | 0 | 19 | 0/0/70 | sem epidemiologia (56) |
| einstein-2025 | 75 | 0 | 14 | 0/0/72 | sem epidemiologia (61) |
| einstein-2026 | 75 | 0 | 7 | 0/0/72 | sem epidemiologia (68) |
| einstein-2027 | 75 | 0 | 73 | 0/0/75 | sem mecanismo/fisiopatologia (2) |
| didatico-grad-neutropenia | 75 | 0 | 8 | 75/0/0 | sem epidemiologia (67) |
| famerp-2024 | 74 | 0 | 0 | 74/0/0 | sem mecanismo/fisiopatologia (74); sem epidemiologia (69) |
| einstein-2023 | 75 | 1 | 20 | 0/0/72 | sem epidemiologia (55); sem mecanismo/fisiopatologia (1) |
| didatico-grad-micoses | 73 | 0 | 18 | 73/0/0 | sem epidemiologia (55) |
| unifesp-2023 | 100 | 29 | 86 | 4/0/65 | sem epidemiologia (13); sem mecanismo/fisiopatologia (10) |
| famerp-2026 | 71 | 0 | 4 | 71/0/0 | sem mecanismo/fisiopatologia (66); sem epidemiologia (60) |
| didatico-grad-endocardite | 63 | 0 | 9 | 63/0/0 | sem epidemiologia (54) |
| unicamp-2022-dissertativa | 60 | 0 | 1 | 60/0/0 | sem mecanismo/fisiopatologia (59); sem epidemiologia (46) |
| unicamp-2023-dissertativa | 60 | 0 | 0 | 60/0/0 | sem mecanismo/fisiopatologia (59); sem epidemiologia (42) |
| einstein-2021 | 50 | 0 | 16 | 0/0/47 | sem epidemiologia (32); sem mecanismo/fisiopatologia (2) |
| usp-2022 | 100 | 59 | 100 | 0/0/41 | — |
| didatico-grad-sfiha | 35 | 0 | 9 | 35/0/0 | sem epidemiologia (26) |
| didatico-grad-leptospirose | 32 | 0 | 7 | 32/0/0 | sem epidemiologia (25) |
| unifesp-2025 | 100 | 70 | 82 | 7/0/5 | sem epidemiologia (17); sem mecanismo/fisiopatologia (12) |
| didatico-grad-malaria | 27 | 0 | 10 | 27/0/0 | sem epidemiologia (17) |
| unifesp-2024 | 100 | 79 | 84 | 3/0/2 | sem epidemiologia (15); sem mecanismo/fisiopatologia (4) |
| didatico-grad-influenza | 20 | 0 | 4 | 20/0/0 | sem epidemiologia (16) |
| unifesp-2026 | 100 | 81 | 87 | 3/0/3 | sem epidemiologia (12); sem mecanismo/fisiopatologia (7) |
| unifesp-discente-2026-2 | 100 | 89 | 91 | 0/0/2 | sem epidemiologia (8); sem mecanismo/fisiopatologia (6) |
| usp-2023 | 120 | 115 | 120 | 0/0/5 | — |
| usp-2025 | 120 | 117 | 120 | 0/0/3 | — |
| usp-2024 | 120 | 118 | 120 | 0/0/2 | — |
| usp-2026 | 120 | 119 | 120 | 0/0/1 | — |
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
