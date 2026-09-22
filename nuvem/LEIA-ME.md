# A nuvem — conta de verdade e estudo em vários aparelhos

Sem nuvem, a plataforma funciona inteira, mas os dados ficam **só no navegador
daquele computador**: quem estuda no notebook não continua de onde parou no
celular, e perder o navegador é perder o histórico.

Com a nuvem ligada, cada pessoa tem uma conta (e-mail e senha) e o estudo dela
— respostas, repetição espaçada, favoritos (com a anotação pessoal de cada
questão salva), cartões pessoais, sessões e notas de simulado — sobe para um
banco de dados e desce em qualquer aparelho onde ela entrar.

**O conteúdo não vai para a nuvem.** As questões e os flashcards da equipe são
iguais para todo mundo e continuam na pasta `dados/`, ao lado do `index.html`.

**Exceção: o calendário de blocos.** Diferente das questões, a sequência de
blocos que professor/administrador edita em **Admin > Blocos de Estudo** *sobe
sozinha* para a nuvem e desce para qualquer aluno com conta, em poucos
segundos — sem precisar exportar arquivo nem publicar o site de novo. É a
única coisa de "conteúdo" com esse tratamento, porque muda com frequência
(datas do semestre) e é a mesma para toda a turma de um ano. As **turmas**
(quem está em qual, o bloco de início de cada uma) continuam só no navegador
de quem criou — ver "O que a nuvem não guarda" mais abaixo.

## Como está agora

A nuvem **já está configurada** neste arquivo. Em `index.html`, procure por
`nuvem:` dentro do bloco `CONFIG`:

```js
nuvem: {
  url: "https://jznocvgmcgiovgcwhrvi.supabase.co",
  chaveAnon: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…",
},
```

Para **desligar** a nuvem e voltar ao funcionamento só-neste-navegador, deixe
os dois valores vazios (`url: "", chaveAnon: ""`). Nada mais precisa mudar: a
plataforma volta a se comportar exatamente como antes.

> **A chave anônima é pública de propósito.** Ela vai no HTML, e qualquer
> pessoa que abrir o site a enxerga — é assim que o Supabase funciona. Quem
> protege os dados não é o segredo da chave, é a regra no banco (Row Level
> Security), que amarra cada linha ao dono dela. Por isso o `esquema.sql`
> aqui do lado não é opcional: **sem ele, o banco fica aberto.**
>
> A outra chave do Supabase, a `service_role`, ignora todas as regras.
> **Ela nunca entra neste arquivo, nem em nenhum outro do site.**

## Ligar do zero (uns 10 minutos, uma vez só)

### 1. Criar o projeto

1. Entre em [supabase.com](https://supabase.com) e crie uma conta (o plano
   gratuito dá conta de uma turma inteira).
2. **New project**. Dê um nome, escolha uma senha de banco (guarde-a) e a
   região mais próxima — **South America (São Paulo)**, para o site responder
   rápido no Brasil.
3. Espere uns dois minutos até o projeto ficar pronto.

### 2. Criar as tabelas e as regras de segurança

1. No menu da esquerda, **SQL Editor** > **New query**.
2. Abra o arquivo `esquema.sql` (nesta mesma pasta), copie **tudo** e cole lá.
3. Clique em **Run**. Deve aparecer *Success. No rows returned*.

Esse arquivo cria as dez tabelas, liga o RLS em todas elas, e deixa pronto o
gatilho que transforma cada cadastro novo num perfil pendente de aprovação.
Pode ser rodado de novo quando quiser, sem estragar o que já existe.

> **Se o seu banco já existia antes desta versão, rode o `esquema.sql` de novo.**
> A anotação pessoal das questões salvas ("não entendi por que não é a C")
> mora numa coluna nova, `favoritos.nota`, e o `create table if not exists`
> sozinho não mexe numa tabela que já está lá — por isso o arquivo traz também
> a linha que acrescenta a coluna a quem já tinha a tabela:
>
> ```sql
> alter table public.favoritos add column if not exists nota text not null default '';
> ```
>
> Enquanto a coluna não existir, a plataforma continua funcionando e a
> anotação continua guardada no navegador: ela só não sobe para a nuvem, e os
> favoritos sincronizam normalmente, sem a anotação. Depois de rodar o SQL,
> recarregue a página (F5) e a anotação passa a subir junto.

### 3. Ajustar o login por e-mail

Em **Authentication > Providers > Email**:

- **Confirm email**: se ligado, a pessoa precisa clicar num link no e-mail
  antes de entrar. A plataforma lida bem com as duas opções — com o
  *Confirm email* desligado, o cadastro é mais simples, e quem controla
  quem entra passa a ser só a aprovação da coordenação.
- **Minimum password length**: 6 é o mínimo aceito pela tela de cadastro.

Em **Authentication > URL Configuration**, ponha o endereço do site em **Site
URL** (por exemplo `https://esc.netlify.app` ou o seu domínio próprio). É para
lá que o link de confirmação leva.

### 4. Colar os dois valores no `index.html`

Em **Project Settings > API**, copie:

- **Project URL** → vai em `CONFIG.nuvem.url`
- **anon public** (a chave `anon`, não a `service_role`) → vai em
  `CONFIG.nuvem.chaveAnon`

### 5. Criar a sua conta e virar administrador

1. Abra o site, clique em **Criar conta** e cadastre-se.
2. Volte ao **SQL Editor** do Supabase e rode, trocando o e-mail:

```sql
update public.perfis
   set papel = 'admin', nivel_admin = 'master', status = 'aprovado'
 where email = 'voce@exemplo.com';
```

Sem esse passo ninguém consegue aprovar o primeiro cadastro — nem o seu.

### 6. Conferir

```sql
select nome, email, papel, nivel_admin, status from public.perfis;
```

Entre no site com a sua conta. Em **Perfil** deve aparecer o cartão *Conta e
sincronização* dizendo **Tudo sincronizado**. Responda uma questão, abra o
site em outro aparelho, entre com a mesma conta: a resposta tem de estar lá.

## O dia a dia

### Quem entra

Todo cadastro novo nasce **pendente**. A coordenação libera em
**Aprovar Cadastros** — a tela mostra os pendentes da nuvem no alto, com
**Aprovar** e **Recusar**, e ninguém precisa abrir o painel do Supabase.

Só professor e administrador enxergam e alteram o perfil dos outros. O aluno
enxerga e altera apenas o próprio, e **não consegue se promover**: há um
gatilho no banco que devolve `papel`, `status` e `nivel_admin` ao valor
antigo se a tentativa não vier de alguém da equipe.

### Sem internet

A plataforma continua funcionando normalmente. O que a pessoa faz entra numa
**fila** guardada no navegador e sobe sozinho quando a conexão volta — ao
voltar a internet, ao voltar para a aba, ou alguns segundos depois de cada
gravação. O cartão em **Perfil** mostra quantos itens estão na fila.

Sair da conta com fila pendente pergunta antes: dá para **sincronizar e sair**
ou **sair mesmo assim** (a fila fica guardada naquele navegador e sobe quando
a pessoa entrar de novo, do mesmo aparelho).

### Quem já estudava antes da nuvem

Ao entrar pela primeira vez com uma conta da nuvem, se houver estudo salvo
naquele navegador sem conta, a plataforma oferece **Trazer estudo deste
navegador** — as respostas e os cartões passam a ser da conta e sobem. Nada é
apagado sem a pessoa mandar.

### Dois aparelhos ao mesmo tempo

- **Registros** (respostas, sessões, notas de simulado) nunca se
  sobrescrevem: responder no celular e no computador resulta nas duas
  respostas, como tem de ser.
- **Estado** (repetição espaçada, favoritos, metas, cartões pessoais) vale a
  versão mais recente, guardada questão a questão — não num bloco único —
  para que uma divergência afete um item, nunca o histórico inteiro.

## O que a nuvem **não** guarda

Estas coisas continuam vivendo só no navegador de quem as fez:

- **Questões criadas ou importadas pela plataforma** (Admin > Importar
  Questões e Admin > Central de Provas), inclusive as cargas de prova em
  andamento. Para virar conteúdo de todo mundo, elas precisam ir para a pasta
  `dados/` — ver `dados/LEIA-ME.md`.
- Comentários e dúvidas nas questões, feedbacks, o Livro de Ouro e as turmas
  (quem está em qual turma, e o bloco em que cada turma começa). A
  **sequência** de blocos de cada ano é a exceção: ela sobe e desce sozinha —
  ver a nota no topo deste arquivo.
- As contas de demonstração (`admin@esc.demo` e companhia), que são locais e
  continuam servindo para testar sem criar conta nenhuma.

## Publicar o site (Netlify, GitHub Pages ou qualquer um)

O site é estático: não tem servidor, nem build, nem instalação. Publicar é
subir a pasta inteira — **`index.html` mais a pasta `dados/`**. A pasta
`nuvem/` é documentação; pode ir junto ou não.

No Netlify, o caminho mais curto é arrastar a pasta para
[app.netlify.com/drop](https://app.netlify.com/drop), ou ligar o repositório
com **publish directory** na raiz e **build command** vazio. Depois de
publicar, volte ao Supabase e ponha o endereço do site em
**Authentication > URL Configuration > Site URL**.

Se a pasta `dados/` não for junto, o site abre com uma tarja amarela no alto
avisando exatamente isso.

## Quando algo não funciona

O caminho mais curto é **Perfil > Conta e sincronização > Testar a nuvem**.
Esse teste percorre, nesta ordem, as causas possíveis — internet deste
aparelho, projeto do Supabase de pé, tabelas criadas, sessão válida, cadastro
aprovado, fila — e diz em português o que fazer em cada caso. Ele funciona
mesmo sem estar em uma conta, e é o primeiro lugar a olhar quando alguém diz
que não está sincronizando.

Três coisas que o cartão de sincronização mostra e valem uma explicação:

- **Sessão expirada.** Depois de muitos dias sem abrir o site, o token vence e
  não consegue mais se renovar. Antes, todas as chamadas seguintes falhavam
  com "sem permissão" e a fila nunca subia; agora o cartão diz *Sessão
  expirada* e oferece **Entrar de novo**. A fila fica guardada: nada se perde.
- **Registros recusados.** Se o banco recusa um registro de vez (quase sempre
  `esquema.sql` desatualizado no Supabase), só aquele registro sai da fila e
  fica listado com o motivo, no Perfil — o resto do estudo continua subindo e
  descendo. Um registro ruim não trava mais a sincronização inteira.
- **Contas de demonstração.** `admin@esc.demo` e companhia continuam sendo
  locais, mesmo com a nuvem ligada: quem entra com elas não sincroniza nada,
  e o cartão avisa que o estudo ficou só neste navegador.

| O que aparece | O que costuma ser |
| --- | --- |
| "E-mail ou senha incorretos." | Senha errada, ou a conta ainda não existe nesse projeto do Supabase. |
| "Confirme o e-mail antes de entrar." | *Confirm email* está ligado em Authentication > Providers > Email. |
| "Conta sem perfil na nuvem." | O `esquema.sql` não foi rodado (ou foi rodado depois de a conta ser criada). Rode o arquivo e crie a conta de novo, ou insira o perfil à mão. |
| "Seu cadastro ainda está aguardando aprovação." | Está tudo certo: falta a coordenação aprovar em Aprovar Cadastros. |
| "Endereço da nuvem não encontrado" | `CONFIG.nuvem.url` está com erro de digitação. |
| "Sem permissão para ler/gravar em «tabela»" | Aquela tabela ficou sem política de RLS ou sem permissão — rode o `esquema.sql` de novo por inteiro. O **Testar a nuvem** lista todas as tabelas que recusam o acesso de uma vez. |
| "Pendente" e a fila não baixa | Veja o erro no cartão de *Perfil*; quase sempre é internet, ou o projeto do Supabase pausado por inatividade (o plano gratuito pausa depois de uma semana sem uso — basta reativar no painel). |
| "Sessão expirada" | O token venceu e não renovou. Clique em **Entrar de novo** e entre com e-mail e senha; a fila sobe em seguida. |
| "N registros recusados pela nuvem" | O banco entendeu e recusou aqueles registros. Rode o `esquema.sql` inteiro de novo (é o caso comum: banco criado por uma versão anterior) e mostre os motivos listados no Perfil à coordenação. |
| "A nuvem não permitiu excluir este cadastro" | A política `perfis_excluir` é nova. Rode o `esquema.sql` inteiro de novo no SQL Editor e tente outra vez. Enquanto isso, **Inativar** já bloqueia a entrada. |

### Onde vejo quem eu aprovei

Em **Admin > Usuários**, no cartão *Cadastros da nuvem*. A tela *Aprovar
Cadastros* mostra só quem está **pendente** — aprovar alguém tira a pessoa
dali de propósito, e a partir daí ela aparece em Usuários, junto com o resto
da turma, com o papel, o nível e o status editáveis. Ali também ficam os
botões de **Inativar** (tira o acesso, guarda o estudo) e **Excluir** (apaga
o cadastro; não tem volta).

Ler a lista inteira é permissão de professor e administrador, pela política
`perfis_ler`. Um aluno logado enxerga só o próprio perfil — é o RLS
funcionando, não um defeito.

### Excluir de verdade uma pessoa

Excluir pela plataforma apaga a linha de `perfis`, e é isso que corta a
entrada: sem cadastro, o site recusa o login mesmo com e-mail e senha
certos. Duas coisas continuam no projeto, porque removê-las exige a chave
`service_role`, que nunca entra num arquivo publicado:

- a **conta de autenticação** (`auth.users`);
- as **respostas e o estudo** que a pessoa já tinha sincronizado — essas
  tabelas se ligam à conta, não ao cadastro.

Para apagar tudo, remova a conta em **Authentication > Users** no painel do
Supabase: todas as tabelas de estudo apontam para ela com `on delete
cascade`, então o estudo sai junto.

Um teste rápido, fora da plataforma, para saber se o projeto está de pé e com
as tabelas criadas (troque a chave se ela mudar):

```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  "https://jznocvgmcgiovgcwhrvi.supabase.co/rest/v1/perfis?select=id&limit=1" \
  -H "apikey: SUA_CHAVE_ANON"
```

- `401` — o projeto está de pé e a tabela está protegida. **É o esperado**
  (sem login, ninguém lê nada).
- `404` — o `esquema.sql` ainda não foi rodado.
- sem resposta — projeto pausado, endereço errado, ou sem internet.
