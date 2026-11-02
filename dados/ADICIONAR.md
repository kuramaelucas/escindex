# Adicionar questões em `dados/` (entrada compacta)

Leia só este arquivo para subir prova ou lote novo. Molde da questão e política de conteúdo: `dados/LEIA-ME.md`; padrão da explicação: `dados/PADRAO-EXPLICACAO.md`.


Prova nova, do zero:

```
npm run nova-prova -- usp-2027 "USP-SP (FMUSP)" 2027 --total 120
npm run dados -- taxonomia cardio                  # ids de assunto, só os que interessam
npm run adicionar-questoes -- usp-2027 lote-1.json # lotes de 20–30; cada um é conferido
npm run publicar
```

`nova-prova` cria `dados/prova-usp-2027.js` com o cabeçalho no padrão e a
**ficha** da prova (`@ficha {...}`: banca, ano, prefixo dos ids, nº de
alternativas, tipo) e a põe em `manifesto.js`. O arquivo de lote é uma lista
JSON em que cada questão traz **só o que é dela** — a ferramenta completa
`id`, `banca`, `ano`, `real`, `areaId`/`especialidadeId` (pelo assunto),
`estatisticas`, `criadoPor`/`criadoEm`, e escreve no formato das outras provas:

```json
[{ "n": 1, "assunto": "ass-sca",
   "enunciado": "Homem, 58 anos, dor torácica…",
   "alt": ["texto da A", "texto da B", "texto da C", "texto da D"],
   "gabarito": "C",
   "explicacao": "A alternativa C está correta. Dicas do enunciado: **…** …",
   "referencias": "Diretriz X, 2025 (texto lido em 02/11/2026 em gov.br).",
   "dificuldade": "intermediario" }]
```

**Questão dissertativa** (o aluno escreve a resposta, diz a confiança, vê a
esperada e se avalia): no lugar de `alt` e `gabarito`, `"tipo":"dissertativa"`
e `"resposta"` (a resposta esperada pela banca). A explicação segue o mesmo
padrão (dicas do enunciado, parâmetros em `**destaque**`), menos o item das
alternativas, que não existem. Fica fora de simulado e de PDF.

```json
[{ "n": 5, "assunto": "ass-sepse", "tipo": "dissertativa",
   "enunciado": "Descreva a conduta na primeira hora do choque séptico.",
   "resposta": "Reposição volêmica, antibiótico em até 1 hora, noradrenalina se PAM < 65.",
   "explicacao": "Dicas do enunciado: **choque séptico** …" }]
```

Opcionais: `status:"anulada"` (com `motivo` e `gabarito:""`), `figura:"png"`
(ou `"jpg"`; a imagem tem de estar em `dados/imagens/<id>.png`),
`imagemPendente:"ECG de admissão"`, `imagemLegenda`, `explicacoesAlternativas`.
`"alterada":"o que mudou"` marca a **questão alterada** (ver "Questão real que a
equipe alterou", abaixo): grava `questaoAlterada` e a plataforma mostra o selo.
É **tudo ou nada**: se uma questão do lote falha (assunto que não existe,
gabarito fora das letras, número repetido, explicação fora do padrão de
justificativa, campo desconhecido), nada é gravado e o problema vem com o
número da questão; `--simular` só confere. Depois de gravar, o conferidor
completo roda de novo e, se achar erro nessas questões, o arquivo volta ao que era.

Para **mudar a plataforma sem mexer em questões** vale o inverso: o
conteúdo não conhece o código (só o molde acima), o teste de conteúdo
(`npm run testar-mudanca`) escolhe sozinho o que rodar conforme o que mudou, e o
hash do conteúdo não muda enquanto esta pasta não mudar.
