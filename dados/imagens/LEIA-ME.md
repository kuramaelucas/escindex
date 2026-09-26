# `dados/imagens/` — as figuras das provas

Algumas questões reais dependem de uma figura da prova original — um ECG, uma
tabela 2×2, uma radiografia, um antibiograma. Enquanto a figura não está aqui,
a questão mostra um aviso ("esta questão tinha uma imagem na prova original,
que ainda não foi anexada") com a descrição do que a prova mostrava, em vez de
uma imagem quebrada.

## Como anexar

1. Recorte a figura do PDF oficial da prova (um print da região basta).
2. Salve aqui com o **nome da questão**: `q-unifesp2026-036.png`.
   `.jpg`, `.jpeg` e `.webp` também servem — a plataforma tenta as quatro.
3. Publique o site de novo (com a pasta `dados/` junto). Nada mais precisa mudar:
   a questão já aponta para esse arquivo.

Prefira imagens com até ~1600 px de largura e até ~400 KB: elas descem para o
celular de cada aluno.

## O que falta hoje

A lista sempre atualizada sai do conferidor: `npm run conferir` (ou
`node testes/conferir-dados.mjs`) lista cada questão que ainda espera figura e
o nome exato do arquivo. Em 26/09/2026 eram 45 — 13 da UNIFESP e 32 da Santa Casa:

| Arquivo | O que a prova mostrava |
| --- | --- |
| `q-unifesp2022-046.png` | Tabela 2×2 do estudo de coorte (exposição × doença em 5 anos) |
| `q-unifesp2022-048.png` | Tabela 2×2 do ensaio clínico (para o cálculo do NNT) |
| `q-unifesp2022-081.png` | ECG de 12 derivações da admissão |
| `q-unifesp2023-023.png` | Gráfico da projeção do orçamento federal para ASPS |
| `q-unifesp2024-045.png` | Exame de imagem da pelve (achado tubário) |
| `q-unifesp2024-047.png` | Mamografia, complemento e ultrassonografia (questão anulada) |
| `q-unifesp2025-053.png` | Curva ROC com os pontos I a IV |
| `q-unifesp2026-033.png` | Resultado da cultura com antibiograma |
| `q-unifesp2026-036.png` | Radiografia de tórax |
| `q-unifesp2026-040.png` | Tabela da espirometria |
| `q-unifesp2026-060.png` | Ultrassonografia abdominal (vesícula, com setas) |
| `q-unifesp2026-061.png` | Imagens do exame da coluna lombar |
| `q-unifesp2026-074.png` | Quadro do estudo de fratura de fêmur por sexo e idade |
| `q-scmsp2022-011.png` | Cortes axiais de TC de crânio sem contraste |
| `q-scmsp2022-013.png` | Diagrama corporal das áreas queimadas (anulada) |
| `q-scmsp2022-023.png` | Curva de IMC para idade (meninas, OMS) |
| `q-scmsp2022-025.png` | Radiografia de tórax na sala de emergência |
| `q-scmsp2022-054.png` | Foto da placenta após a dequitação |
| `q-scmsp2022-056.png` | Foto do exame físico da mama da puérpera |
| `q-scmsp2023-010.png` | Eletrocardiograma |
| `q-scmsp2023-015.png` | Curvas de pressão e fluxo do ventilador |
| `q-scmsp2023-017.png` | Ultrassonografia à beira do leito (quatro câmaras) |
| `q-scmsp2023-018.png` | Tomografia de crânio |
| `q-scmsp2023-019.png` | Radiografia de tórax |
| `q-scmsp2023-045.png` | Cartão de vacinas |
| `q-scmsp2023-049.png` | Nomograma de Bhutani |
| `q-scmsp2023-075.png` | Polo cefálico fetal (fontanelas e suturas) |
| `q-scmsp2023-076.png` | Pelvimetria interna |
| `q-scmsp2025-038.png` | Tomografia de abdome (diverticulite) |
| `q-scmsp2025-040.png` | Tomografia de abdome (pancreatite) |
| `q-scmsp2025-044.png` | Gráfico de coqueluche × cobertura vacinal |
| `q-scmsp2025-063.png` | Urocultura com antibiograma |
| `q-scmsp2025-064.png` | Tabela dos controles glicêmicos |
| `q-scmsp2026-010.png` | Eletrocardiograma |
| `q-scmsp2026-017.png` | Tomografia de tórax |
| `q-scmsp2026-021.png` | Angiotomografia cervical |
| `q-scmsp2026-023.png` | Tomografia de abdome (íleo biliar) |
| `q-scmsp2026-029.png` | Tomografia de tórax (massa central) |
| `q-scmsp2026-033.png` | Tomografia de abdome (abscesso esplênico) |
| `q-scmsp2026-034.png` | Tomografia de abdome |
| `q-scmsp2026-035.png` | Tomografia de abdome (corpo estranho no duodeno) |
| `q-scmsp2026-036.png` | Tomografia do períneo/pelve |
| `q-scmsp2026-039.png` | Tomografia de abdome (vesícula) |
| `q-scmsp2026-040.png` | Tomografia de abdome (via biliar) |
| `q-scmsp2026-042.png` | Gráfico da mortalidade infantil 2006–2023 |

As provas da Santa Casa de 2022 a 2026 chegaram sem as figuras (o arquivo de
origem só tinha o texto); as 7 figuras da prova de 2021 já estão aqui
(`q-scmsp2021-*`), recortadas do caderno de questões.

## Questão nova com imagem

No arquivo da prova, acrescente à questão:

```js
imagemUrl:"dados/imagens/q-usp2027-012.png", imagemLegenda:"ECG de 12 derivações",
```

Se a figura ainda não estiver pronta, acrescente também
`imagemPendente:"o que a prova mostrava"` — é o texto do aviso, e é o que faz o
conferidor listar a questão como pendência em vez de acusar erro.
