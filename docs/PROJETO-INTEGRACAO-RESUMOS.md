# Projeto: integrar resumos e questões num cronograma

Aberto em 22/11/2026. Liga os resumos adaptativos (`resumos/`, ver `docs/PROJETO-RESUMOS.md`) às questões e à meta, e pergunta no primeiro acesso como o aluno quer começar. Nada daqui está implementado ainda: este documento é o plano e a memória das decisões.

## 1. O que o aluno escolhe no primeiro acesso

| Perfil (já existe no cadastro) | Pergunta | Caminho |
|---|---|---|
| Graduando (não 6º ano) | nenhuma | **do zero**, sempre pelo calendário da turma (como hoje) |
| 6º ano | "Construir do zero" ou "Reparar falhas" | do zero = calendário do 6º ano; reparar = trilha por tema (seção 3) |
| Formado(a) | "Construir do zero" ou "Reparar falhas" | do zero = **projeto de construção** (seção 2); reparar = continuar como está **ou** trilha por tema (seção 3) |

A escolha fica em `u.modoDeInicio` (`"zero"` / `"reparar"`), muda no Perfil a qualquer momento, e a tela diz o que cada uma faz (regra da casa: a plataforma explica). Entra na seção "PRIMEIRO ACESSO" de `07-telas-iniciais.js`, ao lado da escolha de modo da plataforma (06c). Sincroniza como os outros campos do usuário.

## 2. Construção do zero (Formado)

Unidade = **tema com resumo** (hoje 78 prontos; previsão ≈ 150). Cada tema é um ciclo:

1. **Ler o resumo** (botão abre `abrirResumo`, 09e; marca "lido" ao chegar ao fim ou por botão).
2. **Pós-leitura:** o conjunto planejado de 20 questões do tema (seção 4).
3. Acerto < 75% → o resumo é reaberto já marcado pelos erros (o 09e faz isso) e o tema volta na revisão espaçada mais cedo.

Ordem dos temas: a mesma fila da trilha de Formados (`dados/trilha-formados.js`, demanda × pré-requisitos), agrupando os assuntos pelo resumo que os cobre. Tema sem resumo ainda continua no cronograma atual de Formados (só questões) até o resumo existir — o projeto funciona desde já e melhora a cada resumo novo.

## 3. Reparar falhas

Duas opções, a pessoa escolhe:

- **Continuar como está** (cronograma atual: trilha por erro, revisão sugerida).
- **Trilha por tema:** os mesmos 20 questões planejados de cada tema, sem leitura antes. Ao fechar o tema, acerto < 75% → cartão "Recomendamos ler o resumo de *X*" com botão que leva direto ao resumo (já marcado pelos erros). ≥ 75% → tema consolidado, entra só na revisão espaçada.

Os dois caminhos usam **o mesmo conjunto de 20**: quem construiu do zero e quem reparou falhas são medidos pela mesma régua, e o painel da turma compara.

## 4. O conjunto planejado de 20 questões por tema

Não é sorteio. Os resumos já ligam cada questão a um fragmento/seção (`npm run resumo -- <tema>`), então "cobrir nuances diferentes" vira um problema de **cobertura**:

1. Candidatas: questões ativas do tema, sem imagem pendente, sem anuladas (reposições valem).
2. Escolha gulosa: a cada passo, pega a questão que cobre a **seção ainda não coberta** com mais peso (peso da seção = quantas questões das provas caem nela). Empate: prova mais recente, depois dificuldade que ainda falta na mistura (≈ 30% fácil, 50% média, 20% difícil).
3. Duas questões do mesmo fragmento só entram depois que todas as seções tiveram uma.
4. Tema com menos de 20 candidatas usa todas.

O conjunto é **gerado por ferramenta e congelado** em `dados/conjuntos-por-tema.js` (como `trilha-formados.js`): é auditável, igual para todos os alunos e muda só quando se roda a ferramenta de novo (resumo novo, questões novas). Proposta: `npm run conjuntos-por-tema` (`-- <tema>` mostra quais seções cada questão cobre e quais ficaram sem questão).

**Depois das 20:** o que passar disso no tema vem do banco geral (aleatório ponderado por erro, como a trilha 05d), e a tela diz que é "prática extra".

## 5. Meta e prazo (reta final em meados de setembro)

A meta diária/semanal continua (`progressoDaMeta`, 05b). O cronograma só **calcula e sugere**:

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
| 0 | ferramenta `conjuntos-por-tema` + `dados/conjuntos-por-tema.js`; conferência (cobertura de seções, nenhum id inválido) no `npm run conferir` | `ferramentas/`, `dados/` (zona B) |
| 1 | pergunta do primeiro acesso + `u.modoDeInicio` (migração em `loadState`, sync) + cartão no Perfil | 07, 06c/10c, 02 |
| 2 | ciclo do tema (ler → 20 → resultado → recomendação de resumo com botão) | arquivo novo `05g-ciclo-por-tema.js` (05c já está perto do limite de linhas) + 09e |
| 3 | cálculo da meta sugerida e repartição por tema; data-alvo no Perfil; modo revisão após a data | 05b, 10b |
| 4 | `simular-formado` passa a simular o "do zero" e o "reparar" (`--exigir`: 20 por tema sem repetir seção antes de cobrir todas; prazo cumprido com a meta sugerida) | `ferramentas/` |
| 5 | Painel da Turma: temas concluídos, % ≥ 75%, quem está atrasado para setembro | 11d |

Fases 0 e 1 são independentes e podem andar juntas; a 2 depende das duas.

## 7. Decisões em aberto

- Data-alvo padrão: 15/09 fixo ou por banca escolhida no cadastro?
- 75% é por tema inteiro ou também por seção (recomendar só a seção do resumo onde errou)? Proposta: tema decide, e o resumo já abre marcado nas seções erradas.
- Graduando de anos anteriores ao 6º: aparece o resumo como leitura opcional ligada ao calendário da turma?

## 8. Andamento

| Data | Feito |
|---|---|
| 22/11/2026 | projeto aberto: perfis e caminhos, conjunto planejado por cobertura de seções, cálculo da meta até setembro, fases |
