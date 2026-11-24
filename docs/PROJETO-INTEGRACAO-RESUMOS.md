# Projeto: integrar resumos e questões num cronograma

Aberto em 22/11/2026. Liga os resumos adaptativos (`resumos/`, ver `docs/PROJETO-RESUMOS.md`) às questões e à meta, e pergunta no primeiro acesso como o aluno quer começar. Nada daqui está implementado ainda: este documento é o plano e a memória das decisões.

## 1. O que o aluno escolhe no primeiro acesso

| Perfil (já existe no cadastro) | Pergunta | Caminho |
|---|---|---|
| Graduando (não 6º ano) | nenhuma | **do zero**, sempre pelo calendário da turma, com **leitura do resumo obrigatória** antes das questões de cada tema (seção 2-B) |
| 6º ano | "Construir do zero" ou "Reparar falhas" | do zero = calendário do 6º ano; reparar = trilha por tema (seção 3) |
| Formado(a) | "Construir do zero" ou "Reparar falhas" | do zero = **projeto de construção** (seção 2); reparar = continuar como está **ou** trilha por tema (seção 3) |

A escolha fica em `u.modoDeInicio` (`"zero"` / `"reparar"`), muda no Perfil a qualquer momento, e a tela diz o que cada uma faz (regra da casa: a plataforma explica). Entra na seção "PRIMEIRO ACESSO" de `07-telas-iniciais.js`, ao lado da escolha de modo da plataforma (06c). Sincroniza como os outros campos do usuário.

## 2. Construção do zero (Formado)

Unidade = **tema com resumo** (hoje 78 prontos; previsão ≈ 150). Cada tema é um ciclo:

1. **Ler o resumo** (botão abre `abrirResumo`, 09e; marca "lido" ao chegar ao fim ou por botão).
2. **Pós-leitura:** o conjunto planejado de 20 questões do tema (seção 4).
3. Acerto < 75% **no tema** → sugestão de **releitura opcional** do resumo, que abre já marcado pelos erros (o 09e faz isso); o tema volta na revisão espaçada mais cedo. A releitura nunca trava o avanço: o aluno pode seguir para o próximo tema.

Ordem dos temas: a mesma fila da trilha de Formados (`dados/trilha-formados.js`, demanda × pré-requisitos), agrupando os assuntos pelo resumo que os cobre. Assunto sem resumo entra só com o conjunto provisório de questões (seção 4-B) — o projeto funciona desde já e melhora a cada resumo novo.

## 2-B. Graduando antes do 6º ano: leitura obrigatória, mais de uma passagem

O calendário da turma passa por um tema (pediatria, por exemplo) **mais de uma vez** ao longo da graduação. Regra:

- **1ª passagem pelo tema:** leitura do resumo obrigatória (se o tema tiver resumo; sem resumo, seção 4-B); as questões do tema só abrem depois de marcar "li".
- **Passagens seguintes:** a leitura vira opcional (cartão "Você leu este resumo em DD/MM; reler?"), e as questões continuam o conjunto planejado **de onde parou** — não repete as 20 da primeira passagem enquanto houver questões novas do tema; esgotado o conjunto, segue a prática extra (seção 4). Se o acerto da passagem anterior ficou < 75%, a releitura aparece em destaque, ainda opcional.
- Guarda-se por tema: `leituras: [datas]`, posição no conjunto, acerto por passagem. O calendário diz qual tema é da semana; o resumo é o mesmo do Formado.

## 3. Reparar falhas

Duas opções, a pessoa escolhe:

- **Continuar como está** (cronograma atual: trilha por erro, revisão sugerida).
- **Trilha por tema:** os mesmos 20 questões planejados de cada tema, sem leitura antes. Ao fechar o tema, acerto < 75% **no tema** → cartão "Recomendamos ler o resumo de *X*" com botão que leva direto ao resumo (já marcado pelos erros). ≥ 75% → tema consolidado, entra só na revisão espaçada.

Os dois caminhos usam **o mesmo conjunto de 20**: quem construiu do zero e quem reparou falhas são medidos pela mesma régua, e o painel da turma compara.

## 4. O conjunto planejado de 20 questões por tema

Não é sorteio. Os resumos já ligam cada questão a um fragmento/seção (`npm run resumo -- <tema>`), então "cobrir nuances diferentes" vira um problema de **cobertura**:

1. Candidatas: questões ativas do tema, sem imagem pendente, sem anuladas (reposições valem).
2. Escolha gulosa: a cada passo, pega a questão que cobre a **seção ainda não coberta** com mais peso (peso da seção = quantas questões das provas caem nela). Empate: prova mais recente, depois dificuldade que ainda falta na mistura (≈ 30% fácil, 50% média, 20% difícil).
3. Duas questões do mesmo fragmento só entram depois que todas as seções tiveram uma.
4. Tema com menos de 20 candidatas usa todas.

O conjunto é **gerado por ferramenta e congelado** em `resumos/conjuntos-por-tema.js` (fica junto dos resumos, que a plataforma já carrega sob demanda, e não pesa na abertura): é auditável, igual para todos os alunos e muda só quando se roda a ferramenta de novo. `npm run conjuntos-por-tema` (visão geral) · `-- <tema>` (cada questão e o fragmento que cobre) · `-- --gravar` (escreve o arquivo; rode depois de resumo novo ou lote de questões). `npm run conferir` dá **erro** se o arquivo citar questão inexistente ou que deixou de servir, e **aviso** se ficou atrás do banco. Regra em `ferramentas/lib-conjuntos.mjs`. Na prática a unidade é o **fragmento** do resumo (cada um lista as questões daquele conceito).

**Depois das 20:** o que passar disso no tema vem do banco geral (aleatório ponderado por erro, como a trilha 05d), e a tela diz que é "prática extra".

## 4-B. Assunto ainda sem resumo

Hoje 77 temas têm resumo e **160 assuntos com questões não têm** (o projeto prevê ≈ 150 resumos, e parte dos assuntos pequenos nunca terá resumo próprio). O cronograma não espera por eles:

- **Conjunto provisório:** sem fragmentos, a diversidade sai do texto — escolha gulosa da questão **menos parecida** com as já escolhidas (Jaccard das palavras do enunciado + alternativa correta), com a dificuldade que falta e a prova recente de desempate. Fica no mesmo arquivo, com chave = id do assunto e `semResumo: true`. Quando o resumo do assunto sai, `--gravar` troca pelo conjunto de fragmentos. Assunto agrupado num resumo vizinho (≥ metade das suas questões nos fragmentos) conta como coberto.
- **Ciclo sem leitura:** o tema entra só com as questões; a leitura obrigatória (graduando) e a recomendação de leitura < 75% **não aparecem** — no lugar, a tela diz "Este assunto ainda não tem resumo" e, < 75%, sugere a revisão dos erros e os cartões do assunto. Quando o resumo sair, o aluno que já fez o assunto recebe o aviso "saiu o resumo de *X*" (leitura opcional).
- **Conjunto curto:** 89 desses assuntos têm menos de 20 questões que servem; usam todas, e a meta reparte o que sobra para os outros temas (seção 5).
- **Ordem:** a trilha de Formados já ordena por assunto, então os sem resumo entram na fila no lugar deles, sem tratamento à parte.

## 5. Meta e prazo (reta final em meados de setembro)

A meta diária/semanal continua (`progressoDaMeta`, 05b). O cronograma só **calcula e sugere**. A **data-alvo não é fixa**: o padrão recomendado é 15/09 do ano da prova (justificativa na tela: "reta final: depois disso, só revisão e simulados"), e o aluno pode mudá-la no Perfil.

```
semanas  = semanas até a data-alvo (padrão 15/09 do ano da prova; ajustável)
novas    = temas × questões por tema
revisão  ≈ 25% do volume (repetição espaçada)
sugerido = (novas × 1,25) ÷ semanas   → questões por semana
leitura  = temas ÷ semanas            → resumos por semana (só no "do zero")
```

Exemplo hoje (22/11/2026 → 15/09/2027 ≈ 42 semanas, 150 temas × 20): 3.000 novas + 750 de revisão ≈ **90 questões e 3–4 resumos por semana** (≈ 18/dia em 5 dias).

**Quando a meta escolhida não cabe**, a tela não esconde: mostra quantas questões por tema cabem e reparte pelo peso do tema. Ex.: 20/dia × 3 dias = 60/semana × 42 = 2.520; tirando revisão ≈ 2.000 novas → média 13 por tema. Proposta de repartição:

- piso de **8 por tema** (as 8 primeiras do conjunto planejado, que já cobrem as seções de maior peso — a ordem gulosa garante isso);
- o que sobra vai aos temas de maior demanda até o teto de 20;
- texto: "Com 60 questões por semana até 15/09, cabem em média 13 por tema. Os temas que mais caem ficam com 20; os demais com 8. Para fazer os 20 em todos, a meta seria 90/semana." + botões "Usar a sugestão" / "Manter minha meta".

Depois de 15/09 o cronograma entra em **modo revisão**: sem tema novo, só revisão espaçada, erros e simulados — por isso o prazo é antes da prova, não no dia dela.

## 6. Fases

| Fase | Entrega | Onde |
|---|---|---|
| 0 ✓ | ferramenta `conjuntos-por-tema` + `resumos/conjuntos-por-tema.js`; conferência no `npm run conferir` | `ferramentas/`, `resumos/` |
| 1 ✓ | pergunta do primeiro acesso + `u.modoDeInicio` (migração em `loadState`, sync) + cartão no Perfil | 07, 06c/10c, 02 |
| 2 ✓ | ciclo do tema (ler → 20 → resultado → releitura opcional com botão; passagens do graduando, seção 2-B) | arquivo novo `05g-ciclo-por-tema.js` (05c já está perto do limite de linhas) + 09e |
| 3 | cálculo da meta sugerida e repartição por tema; data-alvo no Perfil; modo revisão após a data | 05b, 10b |
| 4 | `simular-formado` passa a simular o "do zero" e o "reparar" (`--exigir`: 20 por tema sem repetir seção antes de cobrir todas; prazo cumprido com a meta sugerida) | `ferramentas/` |
| 5 | Painel da Turma: temas concluídos, % ≥ 75%, quem está atrasado para setembro | 11d |

Fases 0 e 1 são independentes e podem andar juntas; a 2 depende das duas.

## 7. Decisões (22/11/2026)

- Releitura do resumo depois da pós-leitura: **opcional**, sempre.
- Data-alvo: **não fixa**; 15/09 recomendado, ajustável.
- Corte de 75%: **por tema**.
- Graduando antes do 6º ano: **leitura obrigatória** na 1ª passagem pelo tema; nas seguintes, opcional e continuando o conjunto (seção 2-B).
- Recomendações da seção 4–6 aprovadas.

### Revisão das decisões (24/11/2026) — substitui o que conflitar acima

- **Leitura nunca obrigatória** (vale também para o graduando; derruba a trava da seção 2-B): "Ler o resumo (recomendado)" é o botão principal, com a opção de pular direto para as questões do tema.
- **Formado:** fica o "construir do zero", **único caminho alinhado aos resumos**. Novo conceito **"Não esquecer"** (manutenção): questões do jeito atual, metas diárias pequenas, prioridade às questões dos conjuntos pós-resumo ainda não feitas. A falar: se o "reparar por tema" continua para Formado.
- **Meta que não cabe:** 20 por tema é o padrão; se a meta não comporta, a tela mostra e explica o corte para 8 nos temas que menos caem (seção 5).
- **Revisão:** não é sorteio com peso igual. **Para cada questão errada, surge uma questão nova do mesmo assunto** (par erro → nova), além da própria errada no espaçamento da repetição espaçada.
- **Conjunto de 20 intocado** para todos os perfis. A proporção da origem (Teste de Progresso × residência, pelo perfil) só muda na **prática extra, acima das 20** do tema.
- **Escolha livre e direcionada:** o aluno escolhe qualquer tema ou área; a trilha sugere o próximo. O ensino médico é espiral (o mesmo tema volta em níveis), então pré-requisito **não ordena nem bloqueia**: só os vínculos fortes de `ferramentas/prerequisitos-formados.json` (hoje poucos, a maioria dos assuntos sem nenhum) geram um aviso "este tema usa conceitos de X, que você ainda não leu".
- **Meta não cumprida:** o que faltou fica registrado como **atrasado**, num espaço próprio ("Pôr em dia"). O cronograma **não anda para trás nem empurra datas**: os temas seguintes chegam na data prevista, e o atrasado é feito à parte, quando o aluno quiser.
- **Flashcards:** criar cartão continua em todo lugar (trecho do resumo, questão, lote). **Revisar cartões e o conjunto sugerido de cartões ficam só na aba Flashcards** (saem do Início, da sessão recomendada e da sugestão < 75% de tema sem resumo).
- **Medida (fase 5):** comparar quem leu o resumo antes das 20 com quem pulou (acerto nas 20, temas fechados por semana). No Painel da Turma, uma barra pequena que expande para uma tela com filtros (turma, faculdade, período) e gráficos diferentes por recorte.
- **Decidido:** Formado escolhe entre dois caminhos — **construir do zero** (com resumos) ou **reparar e manter**, que junta "reparar por tema" e "Não esquecer" num modo só, em dois estágios: 1º passa pelos temas com as 20 questões (diagnóstico; < 75% recomenda o resumo), 2º o tema ≥ 75% entra na manutenção do "Não esquecer".

## 8. Andamento

| Data | Feito |
|---|---|
| 22/11/2026 | projeto aberto: perfis e caminhos, conjunto planejado por cobertura de seções, cálculo da meta até setembro, fases |
| 22/11/2026 | decisões da seção 7. **Fase 0 feita**: 77 temas, 1.540 questões; todos com 20; só `trabalho-de-parto` tem mais fragmentos (22) que 20 questões (21 cobertos). Ex. convulsão febril: 5/5 fragmentos nas 5 primeiras. Próximo: fase 1 (pergunta do primeiro acesso). |
| 22/11/2026 | **assuntos sem resumo** (seção 4-B): 160 assuntos ganharam conjunto provisório por diversidade de texto (2.462 questões; 89 com menos de 20). |
| 22/11/2026 | **Fase 1 feita** (`codigo/06e-modo-de-inicio.js`): `u.modoDeInicio` = `zero` · `reparar-tema` · `reparar` (este só Formado); pergunta uma vez no Início logo depois da do modo da plataforma, sem fechar por clique fora; cartão "Como você estuda" no Perfil (antes do 6º ano explica por que não há escolha); escolha fora do ano vale `zero` sem ser apagada; nuvem `perfis.modo_inicio` (rodar `esquema.sql` de novo). Por enquanto só grava e explica: o cronograma passa a obedecer na fase 2. Teste: `testes/modo-de-inicio.test.mjs`. |
| 23/11/2026 | **Fase 2 feita** (`codigo/05g-ciclo-por-tema.js`, cartão "Seu tema" no Início): nada novo guardado — leitura = `resumosLidos`, progresso = primeira resposta a cada questão do conjunto (revisão não conta; a passagem seguinte continua de onde parou); ordem pelo bloco atual (graduando, 6º ano do zero) ou pela trilha de Formados (Formado do zero, reparar por tema); leitura trava as questões só para quem constrói do zero e só antes de ler; < 75% no tema sugere reler (some quando a marca de lido é posterior ao fechamento); tema sem resumo vai direto às questões. Teste: `testes/ciclo-por-tema.test.mjs`. Ainda falta: a sessão recomendada não puxa sozinha as questões do tema (o aluno usa o botão do cartão) — entra junto com a fase 3, que reparte a meta por tema. |
| 23/11/2026 | **No ar só a pós-leitura** (pedido do usuário): `CONFIG.integracaoResumos = { posLeitura: true, modoDeInicio: false, cicloNoInicio: false }`. No fim do resumo marcado como lido aparece o conjunto planejado do tema (`htmlPosLeituraDoResumo`, 05g). A pergunta do modo de início (06e) e o cartão "Seu tema" (05g) ficam no código, desligados, e se ligam com a fase 3; os testes os ligam para continuar conferindo. Ao ligar: devolver ao guia (13) os textos "Como começar" e "Seu tema" (estão no histórico do git, commit da fase 2). |

## 9. Plano de ação (24/11/2026) — para começar numa conversa nova

Comece lendo **só** esta seção e a seção 7 (as decisões de 24/11 valem sobre as anteriores). Zona A5 do roteador do `CLAUDE.md`.

### Limitações da plataforma que moldam o plano

- **Sem servidor:** tudo que comparar alunos (leu × pulou, por turma/faculdade) só existe com a nuvem ligada e vem do que **já sincroniza**. `perfis.resumos_lidos` e as respostas já sobem; logo "leu antes" se **deriva** (data da leitura < data da 1ª resposta do conjunto do tema), sem campo novo. Sem nuvem, a comparação mostra só o próprio aluno.
- **Nada guardado que possa ser calculado:** atrasados também se derivam (meta da semana × questões feitas nas semanas passadas) — campo novo exige migração em `loadState`, `LINHAS_DE_RESPOSTA`/`NUVEM_TABELAS` e `esquema.sql` rodado de novo por quem tem a nuvem.
- **Carga:** `resumos/conjuntos-por-tema.js` é sob demanda; o Início não pode depender dele antes de `db` existir (`aposBancoPronto`) e lista de questões usa `garantirCorpos`.
- **Limite de 1.400 linhas** por arquivo (`higiene.test.mjs`): 05a (1.064), 05b (955) e 07 (873) já estão grandes — lógica nova vai para 05g ou arquivo novo (`05h-...`), e o mapa do `CLAUDE.md` ganha a linha.
- **Chaves desligadas:** `CONFIG.integracaoResumos` (01, linha ~236) — `modoDeInicio` e `cicloNoInicio` estão `false`. Toda mudança entra atrás dessas chaves; ligar é o último passo de cada etapa.
- **Modos já gravados:** `u.modoDeInicio` aceita `zero` · `reparar-tema` · `reparar` e já sincroniza (`perfis.modo_inicio`). Trocar os valores pede migração, não renomear.

### Etapas (uma por commit, cada uma com teste e `npm run testar-mudanca`)

| # | Entrega | Onde | Teste | Cuidado |
|---|---|---|---|---|
| 1 | Leitura nunca obrigatória: "Ler o resumo (recomendado)" + "Pular para as questões" | 05g (`estadoDoTema`, cartão) | `ciclo-por-tema.test.mjs`: tema não trava sem leitura | o graduando também (derruba 2-B) |
| 2 | Formado com dois caminhos: `zero` e `reparar-manter`; migração `reparar-tema`/`reparar` → `reparar-manter`; 2º estágio: tema ≥ 75% vai à manutenção ("Não esquecer": metas pequenas, conjuntos pós-resumo não feitos primeiro) | 06e, 05g, 02 (migração), 03a (aceitar o valor vindo da nuvem) | `modo-de-inicio.test.mjs` + caso de migração em `regras.test.mjs` | o valor antigo ainda pode chegar da nuvem — mapear na leitura também |
| 3 | Revisão: cada erro gera uma questão nova do mesmo assunto (par erro → nova), errada segue o espaçamento | 05a/05f (`montarRevisaoSugerida`) | `regras.test.mjs`: 3 erros → 3 novas do mesmo assunto, sem repetir já respondida | assunto sem questão nova → dizer na tela, não completar com outro |
| 4 | Prática extra (acima das 20): origem por perfil (Teste de Progresso × residência); conjunto de 20 intocado | 05g | caso em `ciclo-por-tema.test.mjs` | `conjuntos-por-tema.js` não muda |
| 5 | Flashcards: revisão e conjunto sugerido só na aba; criar continua em todo lugar | 07 (linhas ~523–589: botões e "cartões vencidos" do Início), 05c (sessão recomendada), 05g (sugestão < 75%) | ajustar testes que procuram o botão no Início (`grep -l "Flashcards" testes/`) | atualizar o guia (13) |
| 6 | Fase 3: meta sugerida pela data-alvo, piso 8/teto 20 com explicação, **"Pôr em dia"** (atrasados derivados, cronograma não muda) | 05b, 10b, 05g | `simular-formado -- --exigir` + teste novo | atrasado nunca empurra o tema da semana |
| 7 | Ligar `modoDeInicio` e `cicloNoInicio`; devolver ao guia (13) "Como começar" e "Seu tema" (histórico do git, commit da fase 2) | 01, 13 | `npm test` inteiro | — |
| 8 | Fase 5: comparação leu × pulou — barra no Painel da Turma que expande (filtros turma/faculdade/período, gráficos SVG à mão) | 11d (ou `11f-...` se passar do limite) | teste com nuvem de mentira (modelo `atualizacoes-e-feedback.test.mjs`) | grupos pequenos: não mostrar recorte com < 5 alunos (privacidade e ruído) |

### Para minimizar erro

- Antes de cada etapa: `npm run mapa -- <palavra>` e ler só o trecho; nunca `dados/prova-*.js`.
- Rodar `ESC_SOB_DEMANDA=1` no teste das etapas que listam questões (3, 4, 6).
- Cada etapa termina com `npm run publicar` + `npm run testar-mudanca`, uma linha na seção 8 e no `docs/HISTORICO.md`.
- Ordem importa: 1→2 antes de 7 (ligar); 6 depende de 2; 8 pode correr em paralelo depois de 1.
