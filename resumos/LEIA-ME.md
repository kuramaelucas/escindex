# Resumos adaptativos — condições de criação

Projeto iniciado em 18/11/2026. Os resumos são **textos de estudo no formato de livro-texto**, escritos a partir das questões reais do banco. Cada parte do texto é ligada às questões que ela responde, e a marcação muda **conforme o erro de quem lê**.

Na plataforma, os resumos aparecem em **Estudar › Resumos (Beta)** (`codigo/09e-resumos.js`). Esta pasta guarda só o conteúdo e fica fora de `dados/`: a plataforma lê `catalogo.js` quando a pessoa abre a tela, e cada resumo só quando ele é aberto. Assim nada pesa na abertura do site. Mexer no texto de um resumo não exige tocar em `codigo/`.

## Estrutura

```
resumos/
  LEIA-ME.md          estas condições
  catalogo.js         a lista dos resumos (id = nome da pasta, título, área, assunto)
  <tema>/resumo.js    o resumo: window.EscResumos.registrar({...})
  <tema>/figuras/     ilustrações do resumo (SVG autoral ou foto de licença livre)
  visualizar.html     prévia fora da plataforma (dois cliques): lê um backup ou usa um aluno de exemplo
```

**Resumo novo:** crie `<tema>/resumo.js` (copie o molde de `exantematicas/`), acrescente a linha em `catalogo.js` e rode `npm run resumo -- <tema>`. O comando mostra a cobertura e falha se uma ligação citar questão inexistente. Depois, `npm run publicar` e `npm run testar-mudanca`.

## Formato do `resumo.js`

```js
registrar({
  id, titulo, assunto, criadoEm,
  fontes: [{ id, texto, lidoEm }],                   // id = o de ferramentas/edicoes-vigentes.json quando existir; lidoEm = AAAA-MM-DD ou null
  foraDoEscopo: [{ motivo, questoes: [ids] }],
  doencas: [{                                        // capítulo
    id, titulo,
    introducao: `parágrafos de livro-texto`,         // separados por linha em branco
    fragmentos: [{                                   // seção
      id, titulo, conferir: true,
      diretrizes: [ids de fontes],                   // só em seção de conduta/ponto de corte/dose/esquema
      questoes: [ids],                               // as questões que a seção responde (mede o erro)
      prosa: `texto corrido da seção`,               // opcional; um parágrafo em Markdown de tabela (| a | b |) vira tabela
      texto: `- ponto-chave {q-a,q-b}`,              // um tópico por linha; {…} = questões daquele tópico
      figuras: [{ arquivo: "figuras/x.svg", legenda,   // opcional: ilustração própria (esquema autoral)
                  credito, fonte }],                 // obrigatórios em foto de terceiros: "Autor, licença" e página do arquivo
      casos: [ids],                                  // opcional: questões COM FIGURA mostradas como "caso ilustrado"
    }],
  }],
});
```

Marcações dentro do texto:
- `**dado**`: negrito, para o dado objetivo que a banca cobra.
- `*Streptococcus*`: itálico.
- `[[frase|q-a,q-b]]`, só em `introducao` e `prosa`: a frase que **explica** um ponto-chave. É ela que se sublinha quando o aluno erra aquelas questões e para onde o ponto-chave leva ("no texto ↑"). O ponto-chave acha sozinho a frase do mesmo capítulo com mais questões em comum.

## Condições de criação (valem para todo resumo novo)

1. **Começa pelas questões, não pelo livro.** Liste as questões do assunto (`npm run resumo -- <tema>`, `npm run dados -- taxonomia <palavra>`). Veja os conceitos que se repetem entre as bancas: eles definem os capítulos e as seções.
2. **Seleção explícita.** Questão do assunto da taxonomia que fica fora do resumo vai para `foraDoEscopo`, com o motivo. Exemplo: coqueluche está em `ass-exantematicas`, mas não é exantemática e terá resumo próprio.
3. **Livro-texto, não gabarito comentado.** Cada capítulo abre com `introducao`: epidemiologia, agente, **fisiopatologia** e o porquê dos sinais. Quem entende o mecanismo deduz o quadro em vez de decorar. As seções têm `prosa` (texto corrido) e fecham com **pontos-chave** (`texto`), curtos e com o dado em negrito (agente, ponto de corte, prazo, dose).
4. **Uma seção = um conceito cobrável.** Separe agente, quadro clínico, diagnóstico, complicações, tratamento, vigilância e prevenção. Cada seção lista em `questoes` os ids que ela ajuda a responder. Sem questão ligada não há como medir o erro: a seção pode existir, mas fica sempre sem cor.
5. **Ligue fino.** Cada ponto-chave termina com `{q-…}` quando dá para dizer qual questão ele responde. Cada ponto-chave importante deve ter no texto uma frase `[[…|q-…]]` que o justifique. Toda questão citada num tópico tem de estar no `questoes` da seção (`npm run resumo` recusa).
6. **Marcação pelo erro de quem lê** (regra da tela, `09e`):
   - Por questão vale a **última** resposta da pessoa. Acerto com confiança "chute" conta como meio erro.
   - Taxa = (erros + ½ chutes) ÷ questões feitas. **≥ 50 %** = revise com prioridade (tijolo), **20–49 %** = vale revisar (ocre), **< 20 %** = você já domina (verde, só no sumário).
   - Capítulos e seções ficam na ordem do que a pessoa mais erra, depois os ainda sem resposta e por último os verdes (já domina). Sem nenhuma questão feita, ficam na ordem do autor e sem cor.
7. **Sinal discreto.** A tela não mostra números, porcentagens nem "você erra aqui": só a cor, explicada na legenda do topo.
   - A frase ligada fica com sublinhado **fraco** e acende (cor cheia) quando a pessoa clica nela.
   - O ponto-chave em que ela erra ganha fundo leve e o link "no texto ↑".
8. **O que é da pessoa** (já pronto na tela, não precisa de nada no resumo):
   - Selecionar um trecho oferece **Destacar**, em azul-claro nos dois temas, e **Flashcard**, com o trecho no verso e o assunto do resumo. O destaque é o mesmo dos destaques de texto (08b), com alvo `r:<resumo>:<trecho>`, e sobe para a nuvem.
   - Cada seção tem um botão pequeno **cartão**.
   - **A− / A+** muda o tamanho da letra só neste aparelho (localStorage).
   - **Feedback** entra no feedback geral, com `resumoId` (coluna `resumo_id`). Os administradores filtram por **Sobre resumos** em Feedback dos Usuários.
   - Os alvos dos trechos usam os ids de capítulo e seção e a posição do parágrafo. Por isso, **não renomeie ids** de um resumo publicado: os destaques dos alunos se perderiam. Corrigir o texto não tem esse problema, porque o destaque procura o trecho no texto novo.
9. **Texto autoral e verificável.** Nada copiado de cursinho ou de site de questões. As fontes primárias ficam em `fontes`, com a data em que foram lidas. Enquanto a seção não tiver a leitura conferida, ela leva `conferir: true` e a tela mostra "a conferir".
10. **Pegadinhas viram seção própria** ("Armadilhas"). Ligue-as às questões em que a alternativa errada explora a confusão (ex.: exantema súbito × alergia à amoxicilina).
11. **Casos ilustrados** (`casos`): quando o achado se aprende vendo (foto de exantema, radiografia, curva de crescimento, pega na amamentação), a seção mostra a questão real com figura logo após a prosa. A figura fica à vista; o caso abre em "Ler o caso e tentar responder", e a alternativa escolhida mostra gabarito e explicação **sem gravar resposta** (a marcação pelo erro mede o que a pessoa sabia, não o que acabou de ler). Prefira figura clínica a tabela; um ou dois por seção. `npm run resumo` recusa caso sem figura.
12. **Ilustrações próprias** (`figuras`, arquivos em `<tema>/figuras/`): esquemas autorais em SVG (linha do tempo, critérios, ciclos, faixas) para o que nenhuma questão do banco mostra. O SVG traz fundo branco (vale nos dois temas), a legenda começa com "Esquema autoral" e o conteúdo não pode dizer nada que o texto da seção não diga. `npm run resumo` recusa arquivo que não existe.
    **Foto de terceiros** (ex.: Wikimedia Commons) segue este passo a passo:
    1. Busque pela API do Commons (`commons.wikimedia.org/w/api.php`, `prop=imageinfo&iiprop=extmetadata`). Anote licença (`LicenseShortName`), autor (`Artist`) e a página do arquivo.
    2. Só entra domínio público ou CC BY / CC BY-SA. Fica de fora NC, ND e "uso justo".
    3. **Veja a foto antes de usar.** A descrição não basta: confirme que ela mostra o achado da seção e que não identifica o paciente (rosto sem tarja só em domínio público de fonte oficial, como o CDC).
    4. Salve em `<tema>/figuras/` (WebP ou JPG, largura até 1.000 px). Preencha `credito: "Autor, CC BY 2.0"` e `fonte: "<página do arquivo>"`. A tela mostra o crédito com link, e `npm run resumo` recusa foto sem os dois.
    5. Rede da nuvem: `upload.wikimedia.org` costuma devolver 429 (endereço de saída compartilhado). Nesse caso, peça as fotos a quem pode baixar e registre a pendência em `PENDENCIAS.md`, item 11, que já lista as escolhidas.
13. **Diretriz por seção.** Conduta, ponto de corte, dose e esquema ficam em seção própria, com `diretrizes` (ids de `fontes`); a tela mostra "Conduta conforme: …". Edição nova: `npm run auditoria-padrao -- diretriz <nome>` lista as seções a reescrever (`docs/PROJETO-RESUMOS.md`, seção 4).
14. **Tabela comparativa no fim** dos temas de doenças que a banca faz diferenciar: capítulo `comparativo`, tabela na `prosa`, com as questões de diferencial em `questoes`. Só resume os capítulos, sem dado novo.
15. **Não muda gabarito.** Se o resumo discordar do gabarito de uma questão, a questão vai para revisão pelo caminho normal (zona B1/B3). O resumo não é alterado para "encaixar" no gabarito.

16. **Toda seção se explica.** Cada seção tem `prosa` com o mecanismo (o porquê da conduta), ou a introdução do capítulo traz uma frase `[[…]]` ligada às questões dela. Lista de "situação → conduta" sem explicação é gabarito comentado, não livro-texto. `npm run resumo` avisa.
17. **A regra primeiro; a divergência à parte.** Ponto-chave ensina o que é certo pela diretriz atual. Quando uma banca cobrou outra coisa (gabarito antigo, dose diferente, gabarito marcado como duvidoso), o item vai para o capítulo `armadilhas` ("Armadilhas e divergências entre provas", antes da tabela comparativa), escrito como "regra; o que a prova cobrou". A palavra "gabarito" não aparece em tópico fora desse capítulo. `npm run resumo` avisa.
18. **Sem mnemônicos**, exceto no calendário vacinal (seção `cri-mnemonicos`), onde a família pediu para manter. `npm run resumo` avisa.
19. **Seção = um conceito, no máximo 30 questões.** Passou disso, divida por conceito (nova seção com id novo; a antiga mantém o id). Questão autoral também se lê antes de ligar: ligar por palavra-chave do enunciado põe questão no conceito errado e estraga a marcação.
20. **Todo ponto-chave termina em `{q-…}`.** O que não responde a nenhuma questão vira frase da `prosa`, não tópico solto (exceção: seção sem questões, como a de vitaminas).
21. **Veja também.** A introdução do primeiro capítulo termina com "Veja também:", nomeando os resumos vizinhos. Tema repetido em dois resumos tem um **dono** (a versão completa); o outro só resume e diz onde está o resto, para os dois não se contradizerem.
22. **Esquema autoral conferido renderizado** (Playwright, captura de tela): nenhum texto encosta ou sai da caixa, e cada afirmação do esquema existe no texto da seção.
23. **Fonte lida antes de publicar.** Leia o texto oficial (`npm run texto-oficial`) das diretrizes das seções de conduta e preencha `lidoEm`; só então tire o `conferir: true` daquelas seções. Sem a leitura, a seção continua "a conferir".

Antes do commit: `npm run resumo -- <tema> --exigir` (os avisos das condições 16 a 21 viram erro) e `node --test testes/resumos.test.mjs`.

## Ainda por fazer

- Botão "fazer as questões desta seção", que abriria uma sessão com as questões ligadas.
- Conferir as fontes dos três resumos e tirar o `conferir: true` das seções conferidas.

## Resumos

| Tema | Assunto | Questões no resumo | Fora do escopo |
|---|---|---|---|
| `exantematicas` | `ass-exantematicas` | 53 | 7 (coqueluche, que está em `pneumonia-bronquiolite`) |
| `puericultura` | `ass-puericultura` | 156 | — |
| `calendario-vacinal` | `ass-calendariovacinal` | 95 | 13 (8 anuladas; 5 desatualizadas, que entram pelas reposições) |
| `pneumonia-bronquiolite` | `ass-infectoped-pneumonia` | 75 (+7 de coqueluche, de `ass-exantematicas`) | 2 (1 escarlatina; 1 anulada) |
| `crescimento-puberdade` | `ass-crescimentopuberdade` | 69 | 3 (anuladas) |
| `emergencias-respiratorias-pcr` | `ass-emergped-respiratoria` | 66 | 1 (anulada) |
| `diarreia-desidratacao` | `ass-dda` | 62 | 3 (anuladas) |
| `infeccoes-congenitas` | `ass-neo-infeccoescongenitas` | 62 | 1 (anulada) |
| `reanimacao-neonatal` | `ass-reanimacao` | 57 | 1 (anulada) |
| `vias-aereas-superiores` | `ass-ivas` | 47 | 1 (desatualizada sem reposição) |
| `ictericia-neonatal` | `ass-ictericia` | 48 | 1 (anulada) |
| `triagem-neonatal` | `ass-neo-triagemneonatal` | 50 | — |
| `abdome-agudo-rn` | `ass-neo-malformacoesdigestivas` | 49 | 1 (anulada) |
| `maus-tratos` | `ass-emergped-maustratos` | 32 | 1 (anulada) |
| `convulsao-febril` | `ass-convulsaofebril` | 28 | — |
| `prematuridade` | `ass-neo-prematuridade` | 26 | 1 (anulada) |
| `desconforto-respiratorio-rn` | `ass-neo-descrresp` | 27 | 1 (anulada) |
| `insuficiencia-cardiaca` | `ass-ic` | 79 | 8 (6 de miocardite viral pediátrica; 2 anuladas) |
| `ist` | `ass-ist` | 196 | 6 (3 anuladas e 1 desatualizada, com reposição no resumo; 1 de toxoplasmose; 1 de anatomia) |
| `diabetes` | `ass-dm` | 140 | 4 (2 anuladas com reposição no resumo; 1 anulada e 1 desatualizada sem reposição) |
| `hipertensao` | `ass-has` | 109 | 7 (4 anuladas com reposição no resumo; 1 anulada sem reposição; veia cava superior; vacina de covid) |
| `cirrose` | `ass-cirrose` | 81 | 1 (anulada) |
| `tireoide` | `ass-tireoide` | 80 | 2 (anuladas) |
| `anemias` | `ass-hemato-anemias` | 75 | — |
| `glomerulopatias` | `ass-nefro-glomerulopatias` | 73 | 1 (litíase) |
| `tuberculose` | `ass-tuberculose` | 251 (69 reais e 182 autorais) | 9 (autorais anuladas) |
| `asma` | `ass-asma` | 80 | 8 (6 anuladas com reposição no resumo; 1 anulada e 1 desatualizada sem reposição) |
| `arritmias` | `ass-arritmias` | 78 | 2 (1 anulada com reposição no resumo; 1 anulada sem reposição) |
| `hidroeletrolitico` | `ass-hidroeletrolitico` | 70 | 2 (anuladas sem reposição) |
| `doenca-coronariana` | `ass-sca` | 72 | 1 (acidose láctica pela metformina, fora do tema) |
| `infeccoes-de-pele` | `ass-derm-infeccoes` | 65 | — |
| `neoplasias-hematologicas` | `ass-hemato-neoplasias` | 60 | 1 (anulada sem reposição) |
| `intoxicacoes` | `ass-emerg-intoxicacoes` | 58 | — |
| `trabalho-de-parto` | `ass-trabalhoparto` | 188 | 5 (anuladas sem reposição) |
| `pre-natal` | `ass-prenatal` | 157 | 5 (3 anuladas, 2 com reposição no resumo; 2 de infecção puerperal, que vão para `puerperio`) |
| `ciclo-menstrual` | `ass-ciclomenstrual` | 110 | 2 (anuladas sem reposição) |
| `contracepcao` | `ass-contracepcao` | 107 | 4 (3 anuladas e 1 desatualizada; 2 com reposição no resumo) |
| `cancer-de-colo` | `ass-cacolo` | 106 | 6 (2 anuladas; 4 desatualizadas pela Portaria 13/2025, com reposição no resumo) |
| `cancer-de-mama` | `ass-camama` | 92 | 4 (2 anuladas e 1 desatualizada sem reposição; 1 sobre endométrio, que vai para `cancer-de-endometrio`) |
| `hipertensao-na-gestacao` | `ass-dheg` | 82 | 3 (2 anuladas com reposição no resumo; 1 desatualizada sem reposição) |
| `climaterio` | `ass-climaterio` | 80 | 4 (anuladas; 2 com reposição no resumo) |
| `uroginecologia` | `ass-uroginecologia` | 80 | — |
| `sangramentos-na-gestacao` | `ass-sangramentos` | 79 | — |
| `diabetes-gestacional` | `ass-dmg` | 82 | 2 (anuladas, com reposição no resumo) |
| `puerperio` | `ass-puerperio` | 58 (+2 de infecção puerperal de `ass-prenatal`) | — |
| `parto-pretermo-e-rotura` | `ass-partopretermo` | 54 | 2 (desatualizadas, com reposição no resumo) |
| `cancer-de-endometrio` | `ass-caendometrio` | 52 (+1 de `ass-camama` sobre endométrio) | 1 (anulada) |
| `endometriose` | `ass-endometriose` | 51 | — |
| `estrategia-saude-familia` | `ass-esf` | 173 | 2 (anuladas) |
| `desenhos-de-estudo` | `ass-desenhosestudo` | 168 | 3 (anuladas) |
| `medidas-epidemiologicas` | `ass-medidasepi` | 156 | 3 (anuladas com reposição no resumo) |
| `vigilancia-em-saude` | `ass-vigilancia` | 138 | 1 (anulada) |
| `bioestatistica` | `ass-bioestatistica` | 124 (4 são reposições) | 10 (6 anuladas ou desatualizadas sem reposição; 4 com reposição no resumo) |
| `principios-do-sus` | `ass-principiossus` | 113 | 1 (anulada) |
| `prevencao` | `ass-prevencao` | 88 | 2 (anuladas) |
| `saude-do-trabalhador` | `ass-saudetrabalhador` | 79 (2 são reposições) | 4 (2 anuladas com reposição no resumo; 2 anuladas sem reposição) |
| `imunizacao` | `ass-imunizacao` | 59 | 1 (anulada) |
| `comunicacao-clinica` | `ass-comunicacaoclinica` | 54 | 1 (anulada) |
| `atls` | `ass-atls` | 109 | 1 (anulada) |
| `trauma-abdominal` | `ass-traumaabd` | 86 | — |
| `hernias` | `ass-hernias` | 85 | 1 (anulada) |
| `obstrucao-intestinal` | `ass-obstrucao` | 75 | 1 (anulada) |
| `complicacoes-cirurgicas` | `ass-complicacoescir` | 68 | 1 (anulada) |
| `cuidados-perioperatorios` | `ass-cuidadosperi` | 68 | 4 (1 anulada com reposição no resumo; 3 fora do tema) |
| `pancreatite-aguda` | `ass-pancreatite` | 69 | 2 (anuladas, com reposição no resumo) |
| `colecistite-e-coledocolitiase` | `ass-colecistite` | 61 | 1 (anulada, com reposição no resumo) |
| `tce` | `ass-neurocir-tce` | 62 | — |
| `apendicite-aguda` | `ass-apendicite` | 58 | 1 (anulada) |
| `trauma-de-torax` | `ass-traumatorax` | 59 | — |
| `hiv` | `ass-hiv` | 248 | — |
| `meningites` | `ass-meningites` | 220 | — |
| `pneumonia-comunitaria` | `ass-pneumonia` | 198 | — |
| `arboviroses` | `ass-arboviroses` | 195 | — |
| `parasitoses` | `ass-parasitoses` | 163 | — |
| `sepse` | `ass-sepse` | 132 | — |
| `iras` | `ass-iras` | 147 | — |
| `pele-partes-moles` | `ass-peleparte` | 188 | — |
| `antibioticoterapia` | `ass-atb` | 120 | 5 (anuladas sem reposição) |
| `protozooses` | `ass-leishmaniose` | 101 (malária, leishmaniose visceral e tegumentar, Chagas) | 4 (anuladas sem reposição) |
| `endocardite` | `ass-endocardite` | 85 (13 dissertativas) | 5 (anuladas sem reposição) |
| `neutropenia-febril` | `ass-neutropeniafebril` | 73 (3 dissertativas) | 4 (anuladas sem reposição) |
| `micoses-invasivas` | `ass-micosesinvasivas` | 76 (1 dissertativa) | 1 (anulada sem reposição) |
| `itu` | `ass-itu` | 72 (2 dissertativas) | 2 (anuladas sem reposição) |
| `fios-e-cicatrizacao` | `ass-toce-fios` | 57 (1 dissertativa) | 6 (2 anuladas; 4 de doença orificial classificadas por engano) |
| `cancer-colorretal` | `ass-cacolorretal` | 57 (3 dissertativas) | 2 (anuladas sem reposição) |
| `avc` | `ass-neuro-avc` | 57 | 1 (anulada sem reposição) |
| `doenca-peptica` | `ass-doencapeptica` | 57 (1 dissertativa) | 1 (anulada sem reposição) |
| `isquemia-arterial` | `ass-cirvasc-arterial` | 57 (4 dissertativas) | — |
| `hemostasia` | `ass-hemato-hemostasia` | 55 (2 dissertativas) | 1 (anulada sem reposição) |
| `sindromes-gripais` | `ass-infecto-covid` | 54 (2 dissertativas) | 1 (anulada sem reposição) |
| `drge-esofago` | `ass-drge` | 55 (1 dissertativa) | — |
| `populacoes-especificas` | `ass-saudepopulacoes` | 54 (2 dissertativas) | — |
| `bioetica` | `ass-principiosbioetica` | 53 (4 dissertativas) | 1 (anulada sem reposição) |
| `pleura` | `ass-cirtorax-pleura` | 53 (3 dissertativas) | 1 (desatualizada sem reposição) |
| `niveis-atencao` | `ass-niveisatencao` | 52 | 1 (anulada sem reposição) |
| `demencia-delirium` | `ass-geriatria-demencia` | 52 (1 dissertativa) | 1 (anulada sem reposição) |
| `drc` | `ass-drc` | 53 questões (1 anulada fora); KDIGO G×A, nefroproteção, DMO, TRS; 2 figuras, 2 casos |
| `abortamento` | `ass-abortamento` | 52 questões (3 anuladas fora); formas, inviabilidade, esvaziamento, ectópica, perda de repetição, aborto legal; 1 figura, 6 casos |
| `miomatose` | `ass-miomatose` | 51 questões; FIGO, STEP-W, observar × clínico × histeroscopia × miomectomia × histerectomia, adenomiose; 1 figura, 7 casos |
| `vasculites` | `ass-reumato-vasculites` | 48 questões; calibre, ACG/polimialgia, Takayasu, PAN, Kawasaki, IgA, ANCA, crio, SAF/ES; 1 figura, 5 casos |
| `humor` | `ass-psiq-humor` | 48 questões (1 anulada fora); depressão, ISRS, perinatal, suicídio, bipolar, lítio; 1 figura |
| `dpoc` | `ass-dpoc` | 48 questões (1 anulada com reposição); mecanismo, GOLD, LAMA/LABA/CI, O2, exacerbação, VNI, cor pulmonale; 1 figura, 7 casos |
| `infertilidade` | `ass-infertilidade` | 47 questões; investigação, reserva, SOP/indução, tubário/uterino, espermograma, IIU/FIV/ICSI; 1 figura, 2 casos |
| `diverticulite` | `ass-diverticulite` | 47 questões (1 anulada com reposição); TC, Hinchey/WSES, antibiótico × drenagem × Hartmann, fístula, HDB; 1 figura, 7 casos |
| `vigilancia-sanitaria` | `ass-vigilanciasanitaria` | 44 questões; vigilâncias e Anvisa, receituários e resíduos, notificação imediata × semanal, declaração de óbito; 1 figura |
| `adrenal` | `ass-adrenal` | 42 questões; insuficiência e crise, HAC, Cushing, hiperaldosteronismo, feocromocitoma, incidentaloma; 1 figura, 4 casos |
| `politicas-nacionais` | `ass-politicasnacionais` | 42 questões; PNH, mulher/criança/homem/idoso/população negra, violência, saúde mental, alimentação, DCNT, telessaúde, transplantes; 1 figura |
| `vitalidade-fetal` | `ass-vitalidadefetal` | 41 questões; cardiotocografia anteparto e intraparto, categorias, reanimação, PBF, pós-datismo, Bishop, óbito fetal; 1 figura, 16 casos |
| `queimaduras` | `ass-queimaduras` | 41 questões (3 anuladas, 1 com reposição); profundidade, regra dos nove, via aérea, Parkland × 2 mL, diurese, escarotomia, elétrica; 1 figura, 2 casos |
| `leptospirose` | `ass-leptospirose` | 41 questões (2 anuladas fora); transmissão, fases, Weil, rim com hipocalemia, MAT, doxiciclina/penicilina, profilaxia; 1 figura, 1 caso |
| `ira` | `ass-ira` | 41 questões (1 anulada fora); KDIGO, pré-renal × NTA × pós-renal, contraste, rabdomiólise, lise tumoral, SHU, hipercalemia, diálise; 1 figura, 5 casos |
| `colangite` | `ass-colangite` | 41 questões (1 anulada fora); icterícia obstrutiva, CPRE × colangiorressonância, Tóquio 2018, Klatskin, Courvoisier, cisto de colédoco; 1 figura, 10 casos |
| `valvopatias` | `ass-valvopatias` | 40 questões (1 anulada com reposição); sopros, EAo/TAVI, IAo, EM/valvuloplastia, IM, tricúspide, gestação e prótese; 1 figura, 10 casos |
| `artrites` | `ass-reumato-artrites` | 40 questões; padrão articular, séptica/gonocócica/gota, AR, espondiloartrites, psoriásica, AIJ/Still, fibromialgia; 1 figura, 6 casos |
| `hepatites` | `ass-hepatites` | 40 questões (1 anulada com reposição); padrão enzimático, hepatite A e insuficiência aguda, marcadores e fases da B, transmissão vertical, hepatite C, CBP; 1 figura, 1 caso |
| `neuromuscular` | `ass-neuro-neuromuscular` | 40 questões (1 anulada fora); topografia, Guillain-Barré, miastenia, ELA, EM, neurite óptica, NMO, anti-NMDA; 1 figura, 2 casos |
| `cuidados-paliativos` | `ass-cuidadospaliativos` | 40 questões (1 anulada fora); indicação, PPS, DAV, distanásia/ortotanásia, morfina, dispneia, alimentação no fim de vida, luto; 1 figura |
| `cardiopatias-congenitas` | `ass-cardiopatiascongenitas` | 39 questões (1 anulada fora); shunts, coraçãozinho, hiperóxia, IC no lactente, sopro inocente, CIV, CIA, coarctação, Fallot; 1 figura |
| `cancer-gastrico` | `ass-cagastrico` | 39 questões; H. pylori/CagA, Lauren, estadiamento e laparoscopia, D2 e quimio perioperatória, dumping, GIST, linfoma, esôfago; 1 figura, 9 casos |
| `lupus` | `ass-reumato-les` | 38 questões (1 anulada fora); LES, anticorpos, nefrite lúpica, lúpus induzido, anti-Ro na gestação, SAF, esclerose sistêmica, dermatomiosite, Sjögren; 1 figura, 7 casos |
| `psiquiatria-infantil` | `ass-psiq-infantil` | 37 questões; TDAH, aprendizagem/dislexia, TEA e M-CHAT-R, ansiedade, enurese, autolesão, telas; 1 figura, 3 casos |
| `financiamento` | `ass-financiamento` | 37 questões (1 anulada fora); gasto público × privado, LC 141, Previne/cofinanciamento, privado complementar, ANS, rol, ressarcimento; 1 figura, 2 casos |
| `anafilaxia` | `ass-alergia-anafilaxia` | 37 questões; IgE/mastócito, critérios, adrenalina IM, glucagon, observação 6 h, triptase, látex, urticária aguda, angioedema; 1 figura, 4 casos |
| `ventilacao-mecanica` | `ass-vm` | 35 questões; indicação e VNI, modos, ajuste inicial, SDRA e protetora, prona, auto-PEEP, curvas, capnografia, desmame; 1 figura, 8 casos |
| `litiase-urinaria` | `ass-uro-litiase` | 35 questões; cólica, TC × US, AINE, alfabloqueador, obstrução infectada, LECO/ureteroscopia/percutânea, tipos de cálculo e investigação metabólica; 1 figura, 3 casos |
| `hanseniase` | `ass-hanseniase` | 34 questões (1 anulada com reposição no resumo); espectro Th1×Th2, formas, biópsia, neural pura, sinais cardinais, histamina, baciloscopia e classificação, PQT-U, síndrome da sulfona, reações 1 e 2, neurite, contatos e BCG; PCDT 2022 lido; 1 figura, 10 casos |
| `sindromes-geneticas` | `ass-genetica-sindromes` | 34 questões (1 anulada fora); não disjunção, heredograma, Down (cariótipo, canal AV, seguimento), Edwards, Patau, Turner, Klinefelter, Noonan, insensibilidade androgênica, Marfan, NF1/Sturge-Weber, Alport, Prader-Willi, X frágil, isotretinoína, tubo neural; 1 figura, 5 casos |
| `doenca-venosa` | `ass-cirvasc-venosa` | 35 questões; Virchow, Wells, D-dímero e Doppler, anticoagulação, câncer, filtro de cava, profilaxia, tromboflebite, CEAP, ablação, úlcera venosa; 1 figura, 5 casos |
| `neoplasia-pulmonar` | `ass-cirtorax-neoplasia` | 33 questões (1 anulada e 1 desatualizada fora); nódulo, biópsia, Pancoast, veia cava superior, silhueta, PET/EBUS/mediastinoscopia, N2, pequenas células, lobectomia, SBRT/ablação, carcinoide, mesotelioma, cisto broncogênico; 1 figura, 7 casos |
| `prostata` | `ass-uro-prostata` | 34 questões (3 dissertativas); HPB (avaliação, alfabloqueador, 5-alfarredutase, cirurgia, síndrome pós-RTU, retenção) e câncer (rastreamento, ressonância e biópsia, vigilância × prostatectomia); 1 figura |
