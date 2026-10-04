# Provas para o grupo "Lucas G1"

Arquivos no formato do importador da plataforma (`.txt`, um bloco por questão,
gabarito e explicação no padrão da casa). **Não estão em `dados/`** de propósito:
tudo que está lá é público para todos. Importadas pela tela, as questões ficam
só no grupo.

| Arquivo | Prova | Questões | Gabarito |
|---|---|---|---|
| `simulado-5ano-01-2025.txt` | Simulado MSP5210/MSP6210 01/2025 — 5º ano | 120 | gabarito oficial (PDF "Simulado 05/04") |
| `simulado-4-todo-conteudo-04-2025.txt` | Simulado MSP6210 04/2025 — todo o conteúdo | 120 | gabarito comentado oficial (PDF) |

## Como importar (logado como Lucas Kuramae)

1. Importar Questões → modo "Prova inteira" → enviar o `.txt`.
2. Em "Destino", escolher **Questões do grupo Lucas G1**.
3. Conferir a pré-visualização e confirmar.

O destino "grupo" só aparece para o papel **aluno** (`opcoesDestinoImportacao`,
`codigo/12a-importacao.js`), e o grupo precisa estar ativo como grupo de
questões da conta. Se a conta for de professor/administrador, a opção não
aparece: use uma conta de aluno que seja membro do grupo.

## O que ficou de fora e por quê

- **Figuras** (ECG, tomografia, fotos, gráficos): os blocos marcam `IMAGEM: sim —
  <descrição>`; o arquivo da figura é anexado na pré-visualização, questão por
  questão. As questões de alternativas em imagem (68, 93 do 5º ano; 49, 71, 115
  do Simulado 4) trazem "figura do caderno" no lugar do texto da alternativa.
- **Duplicadas do banco público**: o importador as desmarca sozinho (5º ano:
  23, 24, 35; Simulado 4: 75, 100); marque à mão se quiser a versão com a
  explicação nova.
- **UNIFESP — avaliação discente 2026.2** e **Simulado 3 (6º ano)**: faltam os
  gabaritos (a tabela de respostas do `.docx` está em branco e o caderno do
  Simulado 3 não veio com gabarito). Entram assim que o gabarito chegar.

## Pontos que merecem conferência

- Os trechos "Dicas da imagem" foram escritos a partir das figuras dos PDFs; vale
  conferir cada um ao anexar a figura.
- Gabarito discutível ou com divergência no próprio material (está dito na
  explicação de cada uma):
  - 5º ano: Q10 (lactente de 50 dias, critérios de Rochester), Q24, Q27, Q65,
    Q70, Q88 (partograma com ocitocina em dose baixa; B também é defensável),
    Q91 (a alternativa A parece inconsistente), Q93, Q95.
  - Simulado 4: Q4 (cabeçalho do PDF diz B, comentário aponta C), Q44, Q59
    (comentário fala de apendagite, mas o enunciado indica colecistite), Q106
    (cabeçalho diz C, comentário descreve a alternativa B), Q113.
