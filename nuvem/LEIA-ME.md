# Nuvem — estudar em vários aparelhos

Sem isto, cada navegador guarda o próprio estudo e nada é compartilhado entre o
computador e o celular. Ligando a nuvem, cada pessoa tem **uma conta de
verdade**, e o que ela responde num aparelho aparece no outro.

**O site continua no GitHub Pages.** Ele não muda de lugar e não passa a precisar
de servidor: o que muda é que a página passa a conversar com um banco de dados
hospedado (Supabase), por HTTPS.

Enquanto `CONFIG.nuvem` estiver vazio no `index.html`, **nada disto roda** — a
plataforma funciona exatamente como sempre funcionou, só com o navegador.

---

## O que sobe e o que não sobe

| Sobe para a nuvem | Fica de fora |
|---|---|
| Respostas, repetição espaçada (questões e cartões), favoritos, cartões pessoais, histórico de sessões, notas de simulado, metas, a fila de questões inacabada | As questões, a taxonomia e os flashcards da equipe — isso é conteúdo, vem da pasta `dados/` e é igual para todo mundo |

Guardar uma cópia das 635 questões por aluno só encheria o banco sem motivo.

---

## Instalação (uma vez só, ~15 minutos)

### 1. Criar o projeto

1. Entre em [supabase.com](https://supabase.com) e crie uma conta.
2. **New project**. Dê um nome (ex.: `esc`), escolha uma senha para o banco
   (guarde-a; você não vai precisar dela no dia a dia) e a região mais próxima
   (`South America (São Paulo)`, se existir).
3. Espere alguns minutos até o projeto ficar pronto.

### 2. Criar as tabelas

1. No menu lateral, **SQL Editor** → **New query**.
2. Abra o arquivo `nuvem/esquema.sql` deste repositório, copie **tudo** e cole ali.
3. **Run**. Deve terminar sem erro. Pode rodar de novo quantas vezes quiser.

### 3. Copiar as duas chaves para o `index.html`

1. No menu lateral, **Project Settings** → **API**.
2. Copie o **Project URL** e a chave **anon public**.
3. No `index.html`, procure por `CONFIG.nuvem` e preencha:

```js
nuvem: {
  url: "https://seuprojeto.supabase.co",
  chaveAnon: "eyJhbGciOi...",
},
```

A chave `anon` é pública de propósito — ela vai no código que qualquer pessoa
pode ler. Quem protege os dados é a regra no banco (Row Level Security), que o
`esquema.sql` já criou: no servidor, cada conta só enxerga as próprias linhas.
**A chave `service_role` nunca entra aqui** — essa ignora todas as regras.

### 4. Liberar o endereço do site

Em **Authentication → URL Configuration**, acrescente em *Redirect URLs* o
endereço do seu site (ex.: `https://seuusuario.github.io/escindex/`). Se você
também abre o arquivo direto do computador, o Supabase aceita a chamada do mesmo
jeito — a API REST não exige origem cadastrada.

### 5. Confirmação de e-mail

Em **Authentication → Providers → Email**, decida:

- **Confirmação ligada** (padrão): a pessoa precisa clicar no link do e-mail.
  Mais seguro, mas o Supabase gratuito envia poucos e-mails por hora — para uma
  turma inteira se cadastrando no mesmo dia, pode travar.
- **Confirmação desligada**: o cadastro entra na hora e fica *pendente* até a
  coordenação aprovar dentro da própria plataforma. Para turma fechada, é o
  caminho mais prático.

### 6. Criar a sua conta e virar administrador

1. Abra o site, clique em **Solicitar cadastro** e crie a sua conta
   (senha de 6 caracteres ou mais).
2. Volte ao **SQL Editor** e rode, trocando o e-mail pelo seu:

```sql
update public.perfis
   set papel = 'admin', nivel_admin = 'master', status = 'aprovado'
 where email = 'voce@exemplo.com';
```

3. Entre no site com essa conta. **A partir daqui você não precisa mais de SQL:**
   os cadastros da turma aparecem em *Aprovar Cadastros*, com botão de aprovar e
   recusar.

### 7. Conferir

Entre e abra **Perfil**. O cartão *Conta e sincronização* deve mostrar "Tudo
sincronizado". Responda uma questão, abra o site no celular com a mesma conta e
confirme que ela aparece lá.

---

## Como funciona no dia a dia

- **Primeiro o navegador, depois a nuvem.** Tudo continua sendo salvo localmente
  na hora. O que muda entra numa fila e sobe alguns segundos depois, em bloco.
- **Sem internet funciona.** A fila espera. Quando a conexão volta — ou quando a
  aba volta a ficar visível — ela sobe sozinha. O ícone no alto da tela mostra o
  estado; *Perfil* mostra por extenso.
- **Trocar de aparelho.** Basta entrar com a mesma conta. O estudo desce, e até a
  fila de questões inacabada atravessa: "continuar de onde parei" funciona entre
  o computador e o celular.
- **Quem já estudava neste navegador** recebe, no primeiro login, a oferta de
  trazer esse histórico para a conta. Nada é duplicado: cada registro mantém o
  identificador que já tinha.

### Conflito entre dois aparelhos

- Respostas, sessões e notas de simulado **se juntam**, nunca se sobrescrevem.
- Repetição espaçada, favoritos, metas e cartões pessoais valem **pela versão
  mais recente**, questão a questão. Estudar a mesma questão nos dois aparelhos
  ao mesmo tempo é o único caso em que um dos dois resultados prevalece — e
  ambos ficam registrados no histórico de respostas.

---

## Limites que esta etapa ainda tem

1. **Só o progresso do aluno está na nuvem.** Grupos/turmas, fila de dúvidas,
   percentil de simulado entre alunos, banco de questões compartilhado e
   relatório de turma continuam locais a cada navegador. É a etapa 2.
2. **O bloqueio de conta pendente é da aplicação, não do banco.** A tela impede
   de entrar, e o banco impede de ler dados dos outros — mas uma conta pendente
   ainda consegue gravar as próprias linhas se alguém insistir pelo console. Para
   uma turma fechada é aceitável; se um dia o cadastro for aberto ao público,
   vale acrescentar a checagem de status nas políticas.
3. **Imagens em cartões e questões continuam embutidas no texto** (base64). Se o
   uso de imagem crescer, o certo é migrar para o Storage do Supabase.
4. **O plano gratuito do Supabase hiberna** projetos sem uso por alguns dias (e
   os limites mudam com o tempo — confira os atuais no site). Ao hibernar, o site
   continua abrindo e estudando; só a sincronização fica esperando o projeto
   voltar.
5. **Dado pessoal.** A partir do momento em que o desempenho de alunos
   identificados sai do computador deles, a LGPD se aplica: diga a eles o que é
   guardado, quem administra, e apague os dados de quem pedir (`delete from
   auth.users where email = '…'` apaga a conta e, em cascata, tudo dela).

---

## Desligar a nuvem

Apague os dois valores de `CONFIG.nuvem` no `index.html`. A plataforma volta ao
modo local na hora, e o que estava na nuvem continua lá, intacto, até você
religar ou apagar o projeto.

---

## Resolver problemas

| O que aparece | Provável causa |
|---|---|
| "Endereço da nuvem não encontrado" | `CONFIG.nuvem.url` errado (tem de ser o *Project URL*, sem barra no fim) |
| "E-mail ou senha incorretos" | Conta não existe ou senha errada — confira em *Authentication → Users* |
| "Confirme o e-mail antes de entrar" | Confirmação ligada e link não clicado (veja o passo 5) |
| "Seu cadastro ainda está aguardando aprovação" | Falta aprovar em *Aprovar Cadastros* (ou o `update` do passo 6) |
| "Sem permissão para esta operação" | O `esquema.sql` não rodou inteiro; rode de novo e veja se dá erro |
| Ícone de fila que não zera | Sem internet, ou o projeto hibernou — *Perfil → Sincronizar agora* mostra o motivo |
