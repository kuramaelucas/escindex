# Plano de lançamento comercial do Esc

Objetivo duplo: gerar uma renda e **democratizar** o preparo para residência (preço muito abaixo dos cursinhos + bolsas).
Escrito em 11/11/2026. Atualize as caixas conforme avançar.

## 0. Antes de cobrar (semanas 1–4)

- [ ] **Direitos das questões.** Questão real transcrita de prova pública fica no **plano gratuito**; o que se vende é o trabalho **autoral** (explicações, simulados adaptados, cronogramas, trilha, estatísticas). Consultar advogado de propriedade intelectual (poucas horas, ou NPJ de faculdade de Direito) antes de vender.
- [ ] Explicações sempre autorais, nunca copiadas de cursinho (regra que já vale em `dados/LEIA-ME.md`) — agora também proteção jurídica.
- [ ] **LGPD:** Termos de Uso (`docs/lancamento/TERMOS-DE-USO.md`, rascunho) e Política de Privacidade publicados numa tela pública; canal para pedido de exclusão.
- [ ] **Formalização:** MEI (treinamento/edição de conteúdo digital); ME no Simples se crescer. Emitir nota fiscal das assinaturas.
- [ ] **Custos da nuvem:** conferir limites do plano grátis do Supabase; prever o Pro (~US$ 25/mês) ao passar de algumas centenas de alunos ativos.

## 1. Modelo: freemium + bolsas

| Plano | Inclui | Preço sugerido |
|---|---|---|
| Gratuito | provas antigas completas, responder, gabarito, revisão básica | R$ 0 |
| Pro | explicações autorais, simulados autorais, cronograma de Formados/6º ano, trilha, repetição espaçada, desempenho e nota estimada, PDF | R$ 29–39/mês ou R$ 199–249/ano |
| Bolsa | Pro gratuito | Prouni/FIES, renda, universidade pública do interior — justificativa simples |

- Cota pública de bolsas (ex.: 1 bolsa a cada 5 assinantes) — divulgar o número.
- Pagamento: Mercado Pago ou Asaas (Pix + cartão recorrente, sem mensalidade fixa).
- Preço de fundador para quem participou do beta (ex.: R$ 149/ano).

## 2. Divulgação (custo ~zero)

Público: 5º/6º ano e recém-formados.

1. Instagram/TikTok diário: "questão do dia" em carrossel; "o que mais cai na USP/UNIFESP" (dados de `npm run prioridade-formados`); gabarito comentado logo após cada prova (pico do ano).
2. Embaixadores: 1–2 por faculdade com Pro grátis, divulgando nos grupos de turma.
3. Ligas acadêmicas e centros acadêmicos: simulado gratuito da liga com ranking (percentil e Painel da Turma já existem).
4. Indicação: "indique um amigo, ganhe 1 mês".
5. SEO: página pública por prova ("Prova USP 2026 com gabarito comentado"), só com o conteúdo gratuito.
6. Narrativa: feito por quem estuda medicina, preço acessível, bolsas.

## 3. Cronograma

| Quando | O quê |
|---|---|
| Semanas 1–2 | MEI, termos/privacidade, decidir gratuito × Pro, Instagram diário |
| Semanas 3–4 | Beta gratuito com 30–50 alunos de 2–3 turmas; ouvir pela tela de Feedback |
| Mês 2 | Pagamento + trava Pro; preço de fundador; abrir bolsas |
| Mês 3+ | Embaixadores, ligas, gabaritos na temporada de provas |

**Métricas:** cadastros, retenção em 7 dias, conversão gratuito → Pro (2–5% é normal), custo de nuvem por aluno.

## 4. Adaptações na plataforma antes de vender

Em ordem de prioridade. Estado em 11/11/2026: nenhuma feita; não há tela de termos/privacidade.

### Obrigatórias
1. **Tela pública de Termos e Privacidade** + aceite no cadastro (guardar data e versão aceita no perfil da nuvem).
2. **Conta na nuvem obrigatória para o Pro** — hoje a plataforma funciona sem login na nuvem (localStorage); assinatura precisa de identidade.
3. **Tabela `assinaturas`** no `nuvem/esquema.sql` (usuário, plano, origem: pagamento/bolsa/cortesia, válido até). RLS: o aluno **só lê** a própria linha; **ninguém grava pelo site** — só uma Edge Function com `service_role` (chave fora do repositório).
4. **Webhook do pagamento** (Edge Function) que cria/renova/cancela a assinatura; testes em `testes/sql/regras.sql`.
5. **Separar o conteúdo Pro do conteúdo aberto.** Ponto crítico: hoje explicações e simulados ficam em `dados/*.js`, arquivos públicos que qualquer um baixa. Trava só na tela é contornável pelo console. Opções:
   - (a) **começo honesto:** trava só na tela, aceitando vazamento enquanto o público é pequeno;
   - (b) **definitivo:** explicações autorais e simulados saem de `dados/` e passam a vir de uma tabela da nuvem protegida por RLS (`assinatura ativa`). Mexe na carga (zona A3, `docs/PROJETO-CARGA-INICIAL.md`) e no modo offline (corpo baixado só para assinante).
6. **Tela de Planos** (rota nova, menu, guia em `13-tutorial.js`) e **selo Pro** no Perfil; a tela diz por que algo está bloqueado (regra da casa: a plataforma explica o que faz).
7. **Pedido de bolsa** (formulário → fila para o administrador aprovar, gravando assinatura com origem "bolsa").
8. **Exclusão de conta e exportação de dados** completas (LGPD) — conferir se "Seus dados" (10c) cobre a nuvem.

### Recomendadas
- Cupons/preço de fundador e indicação.
- Páginas públicas por prova para SEO (hoje o site é uma SPA; páginas estáticas geradas por ferramenta).
- Aviso claro de que a plataforma é material de estudo, não conduta clínica.
- Monitorar uso do Supabase (linhas, banda, Storage).
