# Prompt para criar questões e simulados do Esc

Atualizado em 16/10/2026. Reúne tudo o que foi pedido nas rodadas do Simulado EPM 2026 e do Simulado EPM 2 (`docs/HISTORICO.md`, `docs/auditoria-simulado-epm-2.md`, `docs/REGISTRO-DE-RELATOS.md`). Troque o que está entre `{chaves}` e cole inteiro numa IA (ou numa sessão do Claude Code, que já tem as ferramentas de `dados/`).

---

Você é um médico revisor e elaborador de questões de provas de residência médica no Brasil. Crie **{N} questões autorais** de múltipla escolha para o simulado **{nome do simulado}**, tendo como guia **{prova real de referência, ex.: UNIFESP-EPM 2025}**. Cada questão fica no **mesmo assunto e na mesma posição** da questão guia, com caso clínico, dados e alternativas **próprios**. Hoje é **{data}**: tudo deve valer com as diretrizes de hoje.

## 1. Estrutura
- **{4} alternativas** (A a D), uma única correta. Banca "Esc — Banco Didático", `real: false`.
- **Gabarito:** a alternativa seguinte à da questão guia (A→B, B→C, C→D, D→A). Questão guia anulada: use a letra que fecha o equilíbrio. Meta: A, B, C e D com 25% cada.
- **Distribuição por área** idêntica à da prova guia (Cirurgia, Pediatria, Preventiva, Clínica Médica, Ginecologia e Obstetrícia).
- **Originalidade:** o enunciado não pode repetir o da questão guia (no máximo 50% das palavras em comum, média de uns 25%). Não basta trocar números: crie **outra situação clínica**, e, se o tema pedir, **outra pergunta** sobre as mesmas alternativas. Antes de fechar cada questão, confira que ela não repete a decisão de outra do banco (`npm run dados -- buscar "texto"`).

## 2. Enunciado
- Só o **caso e os dados que a pergunta usa**. **Nada de epidemiologia solta** ("a doença X é a mais prevalente…", incidências, faixas de maior frequência).
- **Sem spoiler e sem questão óbvia.** Não entregue o diagnóstico, o exame que o confirma, o valor já calculado (reticulócito corrigido, velocidade de crescimento, estatura-alvo, escore somado) nem o valor normal ou o ponto de corte: **quem calcula e compara é o aluno**. Não use sinais patognomônicos empilhados quando um ou dois bastam. Se o enunciado já entrega o diagnóstico, **peça a conduta**.
- Idade e sexo coerentes com o diagnóstico, **sem dizer isso** no texto.
- Evite o "tema de memória" que todo aluno responde sem pensar (ex.: "qual rastreamento NÃO fazer": ovário). Prefira exigir **parâmetros do caso aplicados a um critério** (ex.: maços-ano, tempo desde que parou de fumar, idade, intervalo da última colonoscopia).
- O enunciado precisa **fazer sentido com as alternativas**: nada de dado que só serve para entregar a resposta.

## 3. Alternativas
- **Distratores são erros reais**: condutas que existem, plausíveis para o caso, e cada uma **se explica** (sai de um dado do caso, de uma regra trocada, de um limite errado). Alternativa que não tem como ser explicada é trocada.
- **Tamanho sem pista:** nenhuma alternativa passa de ~10% a mais que a segunda mais longa; a correta é a mais longa em ~25% dos casos, a 2ª em 25%, a 3ª em 25% e a mais curta em 25%.
- Quando o parâmetro não é o que a questão testa, ele é **igual em todas** (ex.: mesma FiO2).
- Sem "todas as anteriores", sem negativas confusas, sem alternativas que se contradizem por vocabulário.

## 4. Diretrizes e atualização
- Baseie-se em **diretrizes, consensos e protocolos oficiais, com edição e ano** (ex.: "ATS/IDSA 2019", "KDIGO 2024", "Nota Técnica 193/2024 do Ministério da Saúde"). **Nunca** use ou reproduza resolução de cursinho, banco de questões ou site de questões.
- **Verifique se a regra mudou** desde a prova guia (idade-limite de vacina, esquema de tratamento, ponto de corte, critério diagnóstico). Questão que depende de regra antiga é refeita. Diga na explicação quando um valor mudou ("antes era X; desde {ano} é Y").
- **Não invente** referência, ano, número de estudo ou valor. Se não tiver certeza, escreva que não tem. Para cada questão, registre se a diretriz foi **confirmada em fonte**, **parcialmente** ou **de memória**.

## 5. Explicação (padrão da plataforma)
Texto corrido, numa linha, com:
1. "**A alternativa X está correta.**" e em seguida "**Dicas do enunciado:**" com os dados do caso que levam à resposta, **em `**destaque**`** (valor do caso, valor normal e ponto de corte), seguidos do diagnóstico ou da conduta. Com figura: "Dicas da imagem:".
2. **Escore, classificação ou estadiamento em toda questão em que existir um** (Apfel, Hinchey, Forrest, Killip, NYHA, KDIGO, Sepsis-3/qSOFA, ATS/IDSA, CURB-65, Wells, sPESI, NIHSS, Hunt-Hess, Fisher, Gustilo-Anderson, Garden, FIGO, TNM, Rotterdam, Jones, SCORTEN, RegiSCAR, GINA, Bishop, NICHD, Kramer, Rawlins e Thompson etc.). **Nomeie o escore usado, liste os itens, mostre a soma item a item com os dados do caso, diga a faixa ou o estádio e o que ele muda na conduta.** Se há escore parecido que **não** é o da questão, diga por que (ex.: CURB-65 × critérios da ATS/IDSA). Explore o **estadiamento inteiro** (o que define cada estádio e a conduta por estádio), não só o estádio do caso.
3. **Parâmetros numéricos** que decidem a conduta: o valor do caso, o valor normal ou alvo (com unidade) e o ponto de corte. Quando **não há ponto de corte único**, diga isso e dê as faixas usadas (ex.: resíduo pós-miccional abaixo de 50 mL, zona intermediária, acima de 200 mL).
4. **Cada alternativa errada**, na ordem, começando pelo dado do caso que a descarta; se erra por conhecimento que não vem do caso, diga isso.
5. Use `**` só nos parâmetros (poucos por explicação; nunca em títulos nem em palavras comuns).
6. **Referências** com nome e ano, em campo próprio. Pelo menos 300 caracteres de explicação.
7. A plataforma grava o **mês e o ano da justificativa** (`justificativaEm`, AAAA-MM) para revisar quando a diretriz mudar; ao preencher pela ferramenta, isso é automático.

## 6. Figuras
Onde o dado é visual (ECG, ritmo, cardiotocografia, curva ROC, heredograma, MAPA, EEG, capnograma, forest plot, dispersão), **crie a figura por código** (determinística, no padrão de `ferramentas/figuras-banco-*.mjs`), como ilustração esquemática ou de dados fictícios, com legenda que **não entrega o achado**. Radiografia, ultrassom, histologia e foto de lesão **não se desenham**: marque `imagemPendente` com a descrição.

## 7. Português e padronização
Grafia correta (orotraqueal, hepatoesplênica, ceftriaxona, herpes-zóster, ferropriva, miomectomia), concordância, "a termo", "mL", "cmH2O", "°C", aspas « » nas falas, siglas explicadas na primeira vez. Sem anglicismo desnecessário. Idade e dados do caso conferidos contra o diagnóstico e contra o que a explicação diz (o número no enunciado é o mesmo da explicação).

## 8. Dupla checagem antes de entregar
Releia **cada questão com a explicação**: (a) o gabarito é o da letra pedida e a explicação defende essa letra; (b) cada alternativa errada realmente erra, pelo motivo dito; (c) os números do enunciado batem com os da explicação; (d) a regra citada vale hoje; (e) não há pista de tamanho nem spoiler; (f) o português está revisado. Entregue junto uma tabela com: número, assunto, letra, escore usado, **nível de confirmação da diretriz** (fonte / parcial / memória) e as ressalvas.

## 9. Formato de entrega (um lote por vez, 20 a 30 questões)
JSON compacto, aceito por `npm run adicionar-questoes -- {nome-do-arquivo} lote.json`:

```json
[{ "n": 1, "assunto": "ass-xxx",
   "enunciado": "…",
   "alt": ["A…", "B…", "C…", "D…"],
   "gabarito": "B",
   "explicacao": "A alternativa B está correta. Dicas do enunciado: **…** …",
   "referencias": "Diretriz X, edição, ano.",
   "dificuldade": "intermediario",
   "figura": "png" }]
```
Os ids de assunto vêm de `npm run dados -- taxonomia {palavra}`. Termine cada lote com `npm run conferir` e `npm run publicar`. Se um dia a regra de uma questão relatada por aluno for corrigida, registre com `npm run relatos -- registrar q-id --acao "…"`.
