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
o nome exato do arquivo. Em 24/09/2026 eram 13:

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

## Questão nova com imagem

No arquivo da prova, acrescente à questão:

```js
imagemUrl:"dados/imagens/q-usp2027-012.png", imagemLegenda:"ECG de 12 derivações",
```

Se a figura ainda não estiver pronta, acrescente também
`imagemPendente:"o que a prova mostrava"` — é o texto do aviso, e é o que faz o
conferidor listar a questão como pendência em vez de acusar erro.
