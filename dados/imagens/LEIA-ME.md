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
o nome exato do arquivo. Em 26/09/2026 eram 71 — 13 da UNIFESP, 32 da Santa Casa e 26 da USP-SP
(estas listadas numa tabela à parte, mais abaixo):

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

### USP-SP (FMUSP) 2022–2026 — 26 figuras

O arquivo de origem das provas da USP-SP trouxe só o texto. As figuras de
**2022, 2024, 2025 e 2026** e as das questões 1 a 76 de **2023** foram recortadas depois dos cadernos de questões
em PDF (edições da Medway só com a prova, sem comentários) e já estão nesta
pasta, em `.png` (tabelas, traçados, esquemas) ou `.jpg` (fotos e exames de
imagem). Quando a figura era só texto — tabela de prescrições, quadro de
vacinas, tabela de razões de verossimilhança —, ela foi transcrita nas
alternativas e a questão ficou sem imagem.

Ainda faltam:

- **25 figuras de 2023**, das questões 77 a 120 (a segunda metade do caderno
  ainda não chegou) — na tabela abaixo;
- **`q-usp2026-063.png`** — fotografia do exame físico de uma criança, que a
  edição consultada substituiu pelo aviso "imagem removida nos termos do
  Estatuto da Criança e do Adolescente". Só o caderno oficial a tem.

Nas questões de 2023 com **alternativas que são só imagem**, as alternativas
aparecem como "Alternativa A (ver figura)" e a explicação termina com o
lembrete "(Descrição ... a completar pela equipe quando a figura original for
acrescentada)". Ao anexar a figura, vale relê-la e completar a explicação.

<details><summary>USP-SP 2023 — 25 figuras</summary>

| Arquivo | O que a prova mostrava |
| --- | --- |
| `q-usp2023-077.png` | Tabela com as associações entre as variantes genéticas e o câncer de mama (OR e IC 95%) |
| `q-usp2023-078.png` | Tabela com os desfechos do ensaio clínico (ivermectina versus controle) |
| `q-usp2023-079.png` | Tabela da associação entre tipos de bullying e transtorno alimentar (OR e IC 95%) |
| `q-usp2023-081.png` | Fotografia da lesão no braço (local da picada) |
| `q-usp2023-082.png` | Radiografia de tórax (moeda no esôfago) |
| `q-usp2023-083.png` | As quatro alternativas são fotografias de ventilação com bolsa-válvula-máscara (A, B, C e D) |
| `q-usp2023-085.png` | Radiografias de tórax atual (figura 1) e da alta anterior (figura 2) |
| `q-usp2023-086.png` | Tabela dos exames iniciais |
| `q-usp2023-087.png` | Tabela dos exames iniciais |
| `q-usp2023-088.png` | Figura A (fezes) e fotografia do abdome distendido |
| `q-usp2023-095.png` | Tabelas de referência (curvas da OMS de IMC e estatura e tabela de pressão arterial da 7ª Diretriz Brasileira) |
| `q-usp2023-097.png` | As quatro alternativas são radiografias de tórax (A, B, C e D) |
| `q-usp2023-098.png` | Fotografia das lesões de pele |
| `q-usp2023-102.png` | Eletrocardiograma e tela da monitorização invasiva (curva de pressão arterial) |
| `q-usp2023-104.png` | Tela da monitorização da ventilação mecânica (curvas de pressão e fluxo) |
| `q-usp2023-105.png` | Imagens da ultrassonografia pélvica; as quatro alternativas são fotografias do exame especular (A, B, C e D) |
| `q-usp2023-106.png` | As quatro alternativas são imagens de exames (A, B, C e D) |
| `q-usp2023-112.png` | Tabela com os casos de doença meningocócica no município por ano |
| `q-usp2023-113.png` | As quatro alternativas são tabelas com as intervenções por horário (A, B, C e D) |
| `q-usp2023-114.png` | As quatro alternativas são imagens de tomografia de crânio (A, B, C e D) |
| `q-usp2023-115.png` | Radiografia de tórax |
| `q-usp2023-116.png` | Radiografia de tórax; as quatro alternativas são imagens de ultrassom pulmonar (A, B, C e D) |
| `q-usp2023-117.png` | As quatro alternativas são fotografias de dispositivos de nutrição (A, B, C e D) |
| `q-usp2023-119.png` | As quatro alternativas são imagens de FAST (A, B, C e D) |
| `q-usp2023-120.png` | Figura da lesão hepática; as quatro alternativas são ilustrações de condutas operatórias (A, B, C e D) |

</details>

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
