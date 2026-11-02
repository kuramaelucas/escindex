# Padrão da explicação (justificativa)

Leia só este arquivo ao escrever ou revisar explicações. Conferido por `npm run conferir`.

## Como escrever a explicação (o padrão de justificativa)

Além de dizer por que a correta é correta e por que cada uma das outras está
errada, a explicação segue uma regra para os casos em que **um número decide
o diagnóstico ou a conduta** — sinal vital, exame laboratorial, medida de
imagem, tempo, dose, idade-limite ou escore:

1. **Destaque o parâmetro** entre dois asteriscos, já com o valor do caso:
   `**PAS 82 mmHg**`, `**Glasgow 8**`, `**CURB-65 = 3**`. Na tela ele aparece
   com realce próprio (é diferente do destaque amarelo que o aluno faz).
2. **Diga o valor normal ou esperado** (ou o alvo terapêutico), com unidade:
   `(normal: 90–120 mmHg)`.
3. **Diga o ponto de corte que muda a conduta** e o que ele muda:
   `< 90 mmHg define choque → expansão volêmica`.
4. **Escore validado** (Glasgow, APGAR, CURB-65, qSOFA, Wells, CHA2DS2-VASc,
   Child-Pugh, MELD, Alvarado…): calcule-o para o caso, mostre a soma item a
   item e a faixa de risco/conduta correspondente.
   **Não deixe o escore colado no ponto de corte**: monte o caso com um valor
   claramente de um lado da faixa (a resposta não pode depender de um ponto
   só). E **ensine a gravidade**: diga por que cada item pontua daquele jeito
   (o que a idade, a ureia, a PA etc. medem no organismo), em vez de só somar.
5. Valores e pontos de corte são os da diretriz citada em `referencias`; se
   mudam com idade, sexo, gestação ou método, diga para quem valem. Sem
   certeza do número, escreva isso — não invente.
   **Prefira diretrizes brasileiras** (PCDT/Ministério da Saúde, Conitec, SBC,
   SBD, SBPT, SBP, FEBRASGO, SBU, AMB) às internacionais, citando a fonte; se
   divergirem, explique a diferença.
6. Asteriscos só nos parâmetros (poucos por explicação, nunca em título nem
   em palavra comum). Questão que não depende de número não leva asterisco.

7. **Fisiopatologia:** depois das dicas, 1 a 3 frases com o **mecanismo** que liga
   os achados do caso ao diagnóstico ou à conduta (por que o sinal aparece, por
   que o exame se altera, por que o tratamento funciona). "É o quadro típico"
   não basta.
8. **Epidemiologia:** o contexto que torna a hipótese provável naquele
   paciente (frequência entre as causas, faixa etária e sexo, fator de risco
   presente, incidência ou prevalência quando houver fonte, e se vale para o
   Brasil). Número só com a fonte em `referencias`; sem certeza, não invente.
   Se o mecanismo explica por que uma alternativa errada falha, use-o no motivo
   dela.

Exemplo: `"… o paciente está em choque: **PAS 82 mmHg** (normal: 90–120 mmHg;
< 90 mmHg = choque) com **FC 128 bpm** (normal: 60–100). A conduta é expansão
volêmica antes de qualquer investigação…"`.

Esse é o texto que a plataforma põe nos prompts de transcrição (Importar,
Enviar Questões e Central de Provas) e no de *Tirar dúvida com IA*
(`regraDeParametrosObjetivos`, em `codigo/08-sessao-e-revisao.js`): a IA
responde do mesmo jeito em qualquer caminho. Explicações antigas continuam
valendo como estão; para melhorá-las, use *Questões para Atualizar*.

### Padrão de justificativa de prova nova (conferido sozinho)

Toda questão **real** de uma prova nova — de qualquer banca, com ou sem
comentário oficial — tem de trazer a justificativa completa, e quem confere é
`npm run conferir` (e o teste `conteudo.test.mjs`), que **falha** se faltar algo:

1. corpo suficiente (300 caracteres ou mais);
2. os dados objetivos e as dicas que levam à resposta **em destaque** entre
   `** **` (sinal vital, exame com o valor, ponto de corte, escore, achado da imagem);
3. o rótulo **"Dicas do enunciado:"** (ou "Dicas da imagem:", "da figura:"…), que
   mostra ONDE no caso está a resposta;
4. **cada alternativa errada** com o seu motivo (cada letra errada aparece no
   texto). Questão anulada só fica dispensada deste item.

Abertura recomendada: `A alternativa C está correta. Dicas do enunciado: **…**: diagnóstico…`.
Hoje **todas** as provas reais do banco cumprem o padrão: a lista
`PROVAS_ANTERIORES_AO_PADRAO` (em `testes/conferir-dados.mjs`) está vazia e
fica assim. Prova nova **não** se acrescenta a ela: tem de cumprir a regra. O mesmo texto
está nos prompts de importação (`regrasDeConteudoImportacao`), para a IA já
entregar a explicação no padrão.
