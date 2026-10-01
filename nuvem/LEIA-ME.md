# A nuvem — conta de verdade e estudo em vários aparelhos

Sem nuvem, a plataforma funciona inteira, mas os dados ficam **só no navegador
daquele computador**: quem estuda no notebook não continua de onde parou no
celular, e perder o navegador é perder o histórico.

Com a nuvem ligada, cada pessoa tem uma conta (e-mail e senha) e o estudo dela
— respostas, repetição espaçada, favoritos (questões, com a anotação pessoal
de cada uma, e flashcards), cartões pessoais, sessões e notas de simulado —
sobe para um banco de dados e desce em qualquer aparelho onde ela entrar.

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

A nuvem **já está configurada**. Em `codigo/01-config.js`, procure por
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

Esse arquivo cria as tabelas, liga o RLS em todas elas, cria as funções da
turma (percentil e Painel da Turma) e deixa pronto o gatilho que transforma cada cadastro novo num perfil pendente de aprovação.
Pode ser rodado de novo quando quiser, sem estragar o que já existe — e roda
também num projeto novo, do zero (até esta versão, num banco vazio ele parava
na linha 58; isso foi corrigido e agora é testado automaticamente a cada
envio, num PostgreSQL de verdade, junto com as regras de segurança).

> **Se o seu banco já existia antes desta versão, rode o `esquema.sql` de novo.**
> Dezoito novidades precisam disso, e o arquivo já traz as linhas que acrescentam
> cada uma sem mexer no que existe:
>
> | O que é | O que o arquivo faz |
> |---|---|
> | **Feedback da plataforma** ("Enviar feedback", "Quero contribuir") chegando aos administradores | cria a tabela `feedbacks` e a função `e_admin()` (quem escreve vê o seu; administradores veem todos e marcam como lido) |
> | **Consertos das questões da pasta `dados/`** (Questões para Atualizar: a figura que faltava, texto cortado, gabarito revisto) chegando à turma inteira | cria a tabela `correcoes_questoes` (todos leem; grava equipe e residentes); a figura usa o espaço de imagens `questoes` |
> | **Questões enviadas pela plataforma** (com as imagens) chegando à equipe para aprovar e, aprovadas, à turma inteira | cria a tabela `questoes_enviadas`, a função `e_aprovado()` e o espaço de imagens `questoes` no Storage, com as regras de quem envia e quem aprova |
> | **Comentários e dúvidas** nas questões chegando à turma e à Fila de Dúvidas | cria a tabela `comentarios` (todos leem; cada um grava o seu; só revisor dá resposta oficial) |
> | **Percentil de simulado** com as notas da turma inteira | cria a função `notas_do_simulado()` (devolve só id aleatório e nota) |
> | **Painel da Turma** (professor e coordenação) — só uso por pessoa, a equipe incluída, e o acerto só somado por ano e turma (mínimo de 3 alunos) | recria `painel_turma()` (sem acerto individual), cria `acerto_por_turma()` e atualiza `atividade_por_semana()` (só a equipe recebe linhas) |
> | A anotação pessoal da questão salva | `alter table public.favoritos add column if not exists nota text ...` |
> | Quantos flashcards você fez em cada dia | `alter table public.dias_cartoes add column if not exists quantidade integer ...` |
> | Os **flashcards favoritados** | cria a tabela `favoritos_cartoes`, com RLS e permissões |
> | As **questões escondidas** ("não mostrar mais") | cria a tabela `questoes_ocultas`, com RLS e permissões |
> | Os **destaques de texto** em questões e flashcards | cria a tabela `destaques`, com RLS e permissões (cada pessoa lê e grava os seus) |
> | Os **avisos da coordenação** (Enviar Avisos) chegando a todos os aparelhos | cria a tabela `avisos` (toda conta aprovada lê; só o administrador grava) e `alter table public.perfis add column if not exists avisos_lidos jsonb ...` (o que a pessoa já dispensou) |
> | O **segundo grupo da pessoa, só de questões** (Meu Grupo > Só questões) | `alter table public.perfis add column if not exists grupo_questoes_id text;` |
> | A **ordem própria dos estágios do 6º ano** (Meu Grupo > Meus estágios) | `alter table public.perfis add column if not exists ordem_estagios jsonb ...` |
> | O **Livro de Ouro** para toda a turma | cria a tabela `livro_ouro` (todos leem, a equipe grava) |
> | A **formatação aprovada** em Revisar Formatação | cria a tabela `formatacao_aprovada` e a função `e_revisor()` (grava equipe e residentes) |
> | A tela de **primeiro acesso** não reaparecer em outro aparelho | `alter table public.perfis add column if not exists boas_vindas_em date` |
> | **Grupos na nuvem** (01/10/2026): o grupo, o pedido de entrada e a aprovação pelo dono, os integrantes, os grupos de estudo, as **questões enviadas para o grupo** (só os membros veem) e os **cartões**: sugeridos à equipe (o professor aprova) ou compartilhados com o grupo | cria as tabelas `grupos`, `grupo_membros`, `subgrupos` e `flashcards_enviados`, as funções `e_do_grupo()` e `e_dono_do_grupo()` e `alter table public.questoes_enviadas add column if not exists grupo_id text`, com RLS e permissões. Sem rodar, os grupos e os cartões continuam só no navegador (e as questões de grupo esperam na fila) — nada se perde |
>
> Enquanto o SQL não for rodado, **a plataforma continua funcionando e nada se
> perde**: ela percebe a coluna ou a tabela que falta, reenvia o resto sem
> ela, segue sincronizando todo o restante e guarda o que sobrou no navegador.
> Em *Perfil > Conta e sincronização* aparece um aviso dizendo exatamente o
> que falta. Depois de rodar o SQL, recarregue a página (F5) e tudo passa a
> subir junto.

### 3. Ajustar o login por e-mail (confirmação que volta para o site)

Em **Authentication > Providers > Email** (em alguns painéis, *Sign In /
Providers*):

- **Confirm email**: ligado, a pessoa precisa tocar num link no e-mail antes
  do primeiro acesso. **Recomendado**: garante que o e-mail existe e é de
  quem se cadastrou (é para ele que vai o "esqueci a senha").
- **Minimum password length**: 6 é o mínimo aceito pela tela de cadastro.

Em **Authentication > URL Configuration** — é isto que faz o link do e-mail
**voltar para o Esc**, e não para uma página do Supabase:

- **Site URL**: o endereço do site, exatamente como os alunos abrem
  (por exemplo `https://esc.exemplo.com.br/`).
- **Redirect URLs**: acrescente o mesmo endereço com `**` no fim, para
  aceitar a página com qualquer detalhe depois
  (por exemplo `https://esc.exemplo.com.br/**`). Se o site tiver
  mais de um endereço (domínio próprio, Netlify), acrescente cada um.

Como funciona: ao cadastrar, reenviar a confirmação ou pedir "esqueci a
senha", o site manda junto o endereço da própria página (`redirect_to`). O
Supabase só aceita esse endereço se ele estiver na lista acima — se não
estiver, o link cai no *Site URL*. Na volta, o Esc lê o resultado do
endereço, apaga o token dele na hora e mostra a tela certa:

| O link era de… | O que a pessoa vê |
|---|---|
| confirmação do cadastro | "E-mail confirmado — agora falta a coordenação aprovar" (ou entra direto, se já aprovada) |
| "esqueci a senha" | a tela para escolher a senha nova |
| um link vencido ou já usado | "Este link não vale mais", com os botões para pedir outro |

Se o site tiver um endereço fixo diferente da página onde a pessoa se
cadastra, preencha `CONFIG.nuvem.enderecoDoSite` em `codigo/01-config.js`.

Os textos dos e-mails ficam em **Authentication > Emails > Templates**. Vale
traduzir o de *Confirm signup* e o de *Reset password* (mantendo o
`{{ .ConfirmationURL }}`, que é o link).

### 4. Colar os dois valores em `codigo/01-config.js`

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

### O que é de todos (e não de uma pessoa)

Além do estudo de cada um, sobem e descem para a turma inteira:

- a **sequência de blocos** de cada ano (Admin > Blocos de Estudo);
- o **Livro de Ouro**;
- a **formatação aprovada** em Revisar Formatação;
- os **comentários e dúvidas** nas questões — o aluno escreve, a dúvida
  aparece na **Fila de Dúvidas** de residentes e professores em qualquer
  aparelho, e a resposta oficial volta para a questão. O nome de quem
  escreveu vai junto. Quem escreveu, professor e administrador podem
  remover um comentário (ele some para todos);
- as **questões enviadas pela plataforma** (Enviar/Importar Questões,
  Central de Provas, Nova questão), com a **imagem** de cada uma. Ver
  "Questões enviadas e as imagens delas", logo abaixo.

### Questões enviadas e as imagens delas

1. **Quem envia** (qualquer conta aprovada) sobe a questão para a tabela
   `questoes_enviadas`. A imagem anexada vai antes, como arquivo, para o
   **Storage** do Supabase (balde `questoes`, na pasta com o id da pessoa);
   a questão guarda só o endereço dela. Aluno envia sempre como
   **pendente**; residente e equipe podem publicar já **aprovada**.
2. **A equipe** (professor e administrador) recebe as pendentes, de
   qualquer aparelho, em *Controle de Qualidade › Enviadas pela Turma* — e
   um aviso no Início. Confere, corrige se precisar e **aprova**: a questão
   entra no banco de todos na sincronização seguinte. **Recusar** pede um
   motivo, que volta para quem enviou (*Enviar Questões › Suas questões
   enviadas*). **Excluir** uma já aprovada a tira dos aparelhos de todos.
3. **Para anexar de vez ao banco da pasta `dados/`**: *Banco de Questões ›
   Exportar … para a pasta dados/* baixa um arquivo pronto
   (`questoes-enviadas-AAAA-MM-DD.js`); ponha-o na pasta, acrescente o nome
   à lista `ESC_ARQUIVOS.dados` do `index.html` e rode `npm run conferir`.
   A partir daí a questão vale também sem nuvem e entra no conferidor.

Quem já tinha questões criadas só no navegador (antes desta versão) vê em
*Enviar Questões* o botão **Enviar para a nuvem**, que sobe todas de uma vez.

Se o espaço de imagens ainda não existir (o `esquema.sql` desta versão não
foi rodado), a questão com imagem espera na fila, sem travar o resto, e
*Perfil › Conta e sincronização* avisa. As imagens ficam no Storage, e não
nas tabelas: o **backup automático diário não as inclui** — o arquivo
exportado para `dados/` guarda o endereço de cada uma.

E, sem sair do banco, dois cálculos da turma:

- o **percentil de simulado** compara a nota com as tentativas da turma
  inteira (a função devolve só números, sem ninguém nelas);
- o **Painel da Turma** (menu de professor e da coordenação) mostra, por ano
  da faculdade e por turma, quem está usando a plataforma e quanto (a equipe
  também), semana a semana, e quem parou — somado dentro do banco, uma linha
  por pessoa. **O acerto de ninguém sai do banco**: só a média de cada ano e
  turma, e só com 3 alunos ou mais (`acerto_por_turma()`). Residente e aluno
  não recebem nada dessas funções.

## O que a nuvem **não** guarda

Estas coisas continuam vivendo só no navegador de quem as fez:

- As **cargas de prova em andamento** da Central de Provas (a contabilidade
  dos lotes — as questões publicadas, essas sobem) e os **cartões da
  equipe** criados pela plataforma. Para virarem conteúdo de todo mundo, os
  cartões precisam ir para a pasta `dados/` — ver `dados/LEIA-ME.md` (há
  botão de exportar pronto).
- As **questões de um grupo de estudo** (restritas à turma que as criou).
- As turmas (quem está em qual turma, e o bloco em que cada turma começa).
  O feedback da plataforma sobe desde 28/09 (tabela `feedbacks`). A **sequência** de blocos de cada ano é a exceção: ela sobe
  e desce sozinha — ver a nota no topo deste arquivo.
- A conta de demonstração de aluno, que é local e continua servindo para
  conhecer a plataforma sem criar conta.

## Backup automático da nuvem (uma vez por dia, criptografado)

O backup em *Configurações* copia o que está **naquele navegador** — com a
nuvem ligada, isso não é o estudo da turma. A cópia da turma inteira é feita
pelo GitHub, pelo arquivo `.github/workflows/backup-nuvem.yml`, todo dia às
3h (Brasília):

- `banco-public.sql` — todas as tabelas do Esc, com as regras de segurança;
- `contas-auth.sql` — as contas de login (senha só em hash);
- `contas.csv` — a lista legível: e-mail e datas, nunca senha.

Os três vão num arquivo **criptografado com uma senha que só a coordenação
sabe** e ficam guardados 30 dias em *Actions > Backup da nuvem*. Sem a senha,
o arquivo não abre — nem para quem o baixar.

**Para ligar** (uma vez), no GitHub: *Settings > Secrets and variables >
Actions > New repository secret*, cadastre dois segredos:

| Nome | Valor |
|---|---|
| `SUPABASE_DB_URL` | No Supabase: *Project Settings > Database > Connection string > URI*, modo **Session pooler**, com a senha do banco no lugar de `[YOUR-PASSWORD]`. |
| `BACKUP_SENHA` | Uma senha longa, **guardada fora do GitHub** (num cofre de senhas). Perdeu a senha, perdeu os backups. |

Enquanto os dois não existirem, o fluxo roda e só avisa que está desligado.
Para testar na hora: *Actions > Backup da nuvem > Run workflow*.

**Para abrir um backup**, baixe o arquivo em *Actions > Backup da nuvem >
(o dia)* e, num computador com `openssl`:

```bash
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -in backup.tar.gz.enc -out backup.tar.gz
tar xzf backup.tar.gz
```

**Para restaurar:**

- *No mesmo projeto* (o caso comum — alguém apagou o que não devia): rode no
  SQL Editor só o trecho de `banco-public.sql` da tabela que precisa voltar.
- *Num projeto novo*: com `psql`, rode `contas-auth.sql` **primeiro** e
  `banco-public.sql` **depois** (as tabelas apontam para as contas); o aviso
  `schema "public" already exists` é esperado. Por fim, rode o `esquema.sql`,
  que recria o gatilho de cadastro novo em `auth.users`. Esse caminho foi
  testado num PostgreSQL com a mesma estrutura: todas as tabelas, vínculos e
  regras voltam.

Cada pessoa também pode baixar **o próprio estudo** em *Perfil > Seus dados >
Baixar uma cópia do meu estudo*.

## Publicar o site (Netlify, GitHub Pages ou qualquer um)

O site é estático: não tem servidor, nem build, nem instalação. Publicar é
subir a pasta inteira — **`index.html` mais as pastas `codigo/`, `dados/` e
`icones/`, e os arquivos `sw.js` e `manifest.webmanifest`** (estes dois fazem
o site virar aplicativo instalável). As pastas `nuvem/` e `testes/` são
documentação e teste; podem ir junto ou não.

No Netlify, o caminho mais curto é arrastar a pasta para
[app.netlify.com/drop](https://app.netlify.com/drop), ou ligar o repositório
com **publish directory** na raiz e **build command** vazio. Depois de
publicar, volte ao Supabase e ponha o endereço do site em
**Authentication > URL Configuration > Site URL**.

Se a pasta `dados/` não for junto, o site abre com uma tarja amarela no alto
avisando exatamente isso; se a `codigo/` não for, a página diz qual arquivo
faltou em vez de abrir em branco.

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
- **Contas de demonstração.** Com a nuvem ligada, as de **professor,
  residente e administrador** (`admin@esc.demo` e companhia) ficam
  desligadas: a senha delas está escrita na documentação, e num computador
  compartilhado abririam as telas de administração daquele navegador. A de
  **aluno** continua (acesso rápido), só local: não sincroniza nada, e o
  cartão avisa isso. Para religar as outras num teste, mude
  `CONFIG.contasDemoDaEquipeComNuvem` para `true`.

| O que aparece | O que costuma ser |
| --- | --- |
| "E-mail ou senha incorretos." | Senha errada, ou a conta ainda não existe nesse projeto do Supabase. |
| "Falta confirmar o e-mail" | *Confirm email* está ligado e a pessoa ainda não tocou no link. A própria janela oferece **Reenviar o link**. |
| O link do e-mail abre uma página do Supabase ou `localhost` | O endereço do site não está em *Authentication > URL Configuration* (Site URL e Redirect URLs). Ver o passo 3. |
| "Este link não vale mais" | O link expirou ou já foi usado. A tela tem os botões para pedir outro. |
| Painel da Turma: "o banco ainda não tem as funções do painel" | Rode o `esquema.sql` de novo (ele cria `painel_turma()`, `acerto_por_turma()` e `atividade_por_semana()`). |
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
