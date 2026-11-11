/* codigo/02b-corpos-das-questoes.js — a questão em duas partes: FICHA (sempre na memória) e CORPO (o texto, que chega por arquivo de prova quando preciso).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   2-B. FICHA E CORPO DA QUESTÃO (docs/PROJETO-CARGA-INICIAL.md, fase 2)
   ==========================================================================
   Carregar e manter na memória o texto de 12 mil questões custava 30 MB antes da primeira tela,
   para o aluno usar dezenas por sessão. Agora cada questão da semente é uma FICHA pequena (id,
   assunto, banca, ano, status, gabarito, estatísticas…, vinda de dados/indice-questoes.js) e o
   CORPO (CAMPOS_DO_CORPO: enunciado, alternativas, explicações, referências, imagem) fica no
   arquivo de prova dela e só é baixado quando alguém precisa.

   Para o resto do código nada muda: `q.enunciado` continua valendo. A ficha herda de
   PROTO_QUESTAO, cujos acessos leem do corpo carregado (window.EscDados.corpos). Escrever um
   campo do corpo (a equipe edita a questão) cria a propriedade na própria questão e ela vence o
   texto da semente, como a diferença guardada sempre venceu. Questão que não é da semente
   (criada, importada, enviada) traz tudo como propriedade própria e nunca passa por aqui.

   Ler um campo do corpo que ainda não chegou devolve um valor vazio, pede o arquivo e redesenha
   a tela quando ele chega. Isso é a REDE DE SEGURANÇA: quem sabe a lista de questões antes de
   desenhar (sessão, simulado, PDF, revisão…) chama garantirCorpos(ids) antes, para a tela já
   nascer inteira. Com window.ESC_CORPO_ESTRITO a leitura sem corpo lança erro — é como os testes
   acham o caminho que esqueceu de pedir. */
const CAMPOS_DO_CORPO = ["enunciado", "alternativas", "explicacaoGeral", "explicacoesAlternativas", "referencias",
  "imagemUrl", "imagemLegenda", "respostaEsperada"];   // mesma lista de ferramentas/lib-indice.mjs
const CORPO_DE_CAMPO = new Set(CAMPOS_DO_CORPO);
const VALOR_ENQUANTO_NAO_CHEGA = { enunciado: "", alternativas: [], explicacaoGeral: "", explicacoesAlternativas: {}, referencias: "" };
const _arquivoDaQuestao = new Map();       // id da questão da semente -> arquivo de prova que guarda o corpo
const _arquivosFalhos = new Set();         // arquivo que não carregou: não fica pedindo de novo a cada leitura
const _arquivosEmCarga = new Map();        // arquivo -> Promise
const _pedidosPorLeitura = new Set();      // arquivos pedidos por leitura sem corpo, ainda não enviados
let _pedidoPorLeituraAgendado = false;
let _coletaDeCorpos = null;                // Set durante o render(): leituras sem corpo anotam o arquivo em vez de pedir (ver coletarTextoDaTela)
const LIMITE_DE_ARQUIVOS_EM_PARALELO = 4;

const PROTO_QUESTAO = {};
CAMPOS_DO_CORPO.forEach(campo => Object.defineProperty(PROTO_QUESTAO, campo, {
  configurable: true, enumerable: false,
  get(){
    const corpo = window.EscDados.corpos[this.id];
    if(corpo) return corpo[campo];
    return corpoAindaNaoChegou(this, campo);
  },
  set(valor){ Object.defineProperty(this, campo, { value: valor, writable: true, enumerable: true, configurable: true }); },
}));

/* JSON.stringify / copiaProfunda de uma ficha leva o texto junto (o que já chegou): quem copia uma
   questão da semente continua recebendo a questão inteira, como antes da divisão em ficha e corpo. */
Object.defineProperty(PROTO_QUESTAO, "toJSON", { configurable: true, enumerable: false, value: function(){ return questaoInteira(this); } });

function ehFichaDaSemente(q){ return !!q && Object.getPrototypeOf(q) === PROTO_QUESTAO; }
/* O texto de um campo do corpo vindo só da semente carregada, SEM disparar carga (para conferências
   que rodam na abertura). undefined = o corpo ainda não chegou ou a questão não o tem. */
function valorDoCorpoCarregado(id, campo){
  const corpo = window.EscDados.corpos[id];
  return corpo ? corpo[campo] : undefined;
}

function corpoAindaNaoChegou(q, campo){
  const arquivo = _arquivoDaQuestao.get(q.id);
  // o arquivo já chegou e esta questão não está nele (ou nunca chega): vazio de verdade, sem pedir de novo
  if(!arquivo || window.EscDados.arquivosComCorpo[arquivo] || _arquivosFalhos.has(arquivo)) return VALOR_ENQUANTO_NAO_CHEGA[campo];
  if(_coletaDeCorpos){ _coletaDeCorpos.add(arquivo); return VALOR_ENQUANTO_NAO_CHEGA[campo]; }
  if(window.ESC_CORPO_ESTRITO) throw new Error("O texto da questão " + q.id + " (" + campo + ") ainda não foi carregado: chame garantirCorpos() antes de desenhar.");
  _pedidosPorLeitura.add(arquivo);
  if(!_pedidoPorLeituraAgendado){
    _pedidoPorLeituraAgendado = true;
    setTimeout(() => {
      _pedidoPorLeituraAgendado = false;
      const nomes = [..._pedidosPorLeitura]; _pedidosPorLeitura.clear();
      garantirArquivosDeProva(nomes).then(() => {
        // o texto chegou: redesenha, salvo se a pessoa está digitando (o redesenho apagaria o que ela escreveu)
        if(typeof render === "function" && db && !(typeof haTrabalhoNaoSalvo === "function" && haTrabalhoNaoSalvo())) render();
      });
    }, 0);
  }
  return VALOR_ENQUANTO_NAO_CHEGA[campo];
}

/* O campo de uma questão SE já está na memória (próprio, ou do corpo carregado), sem pedir arquivo:
   para telas que listam milhares de questões (busca) e preferem um texto menor a baixar tudo. */
function campoJaDisponivel(q, campo){
  if(!ehFichaDaSemente(q) || Object.prototype.hasOwnProperty.call(q, campo)) return q[campo];
  return valorDoCorpoCarregado(q.id, campo);
}

/* Cria as fichas a partir do índice (uma vez, antes do banco). SEED_QUESTOES é a lista estável que
   o EscDados entregou; sem índice (ferramentas, ou índice que não chegou) ela já tem as questões
   inteiras e nada muda. */
function montarFichasDaSemente(){
  const indice = window.EscDados.indice;
  if(!indice || SEED_QUESTOES.length) return;
  const { campos, arquivos, linhas } = indice, n = campos.length;
  for(const linha of linhas){
    const q = Object.create(PROTO_QUESTAO);
    for(let i = 0; i < n; i++) if(linha[i] !== null) q[campos[i]] = linha[i];
    SEED_QUESTOES.push(q);
    _arquivoDaQuestao.set(q.id, arquivos[linha[n]]);
  }
}

/* A cópia de um item da semente para o banco (db.questoes): a ficha continua ficha. */
function copiaDaSemente(item){
  const copia = JSON.parse(JSON.stringify({ ...item }));   // só os campos próprios: a cópia da semente é a ficha, sem o texto
  return ehFichaDaSemente(item) ? Object.assign(Object.create(PROTO_QUESTAO), copia) : copia;
}
/* A questão inteira como objeto comum (para exportar, comparar ou enviar): os campos próprios
   mais o corpo carregado. Sem o corpo carregado, os campos do corpo ficam de fora. */
function questaoInteira(q){
  const o = { ...q };
  if(ehFichaDaSemente(q)){
    const corpo = window.EscDados.corpos[q.id] || {};
    CAMPOS_DO_CORPO.forEach(c => { if(!(c in o) && corpo[c] !== undefined) o[c] = corpo[c]; });
  }
  return o;
}

/* ---------------------------- carregar os textos ---------------------------- */
function _carregarArquivoDeProva(nome){
  if(window.EscDados.arquivosComCorpo[nome]) return Promise.resolve();
  if(_arquivosEmCarga.has(nome)) return _arquivosEmCarga.get(nome);
  const p = new Promise(resolve => {
    const s = document.createElement("script");
    s.src = window.escEndereco("dados", nome);
    s.onload = () => { _arquivosEmCarga.delete(nome); resolve(); };
    s.onerror = () => { _arquivosEmCarga.delete(nome); _arquivosFalhos.add(nome); window.ESC_FALTOU.push("dados/" + nome + ".js"); s.remove(); resolve(); };
    document.head.appendChild(s);
  });
  _arquivosEmCarga.set(nome, p);
  return p;
}
/* Baixa uma lista de arquivos de prova com no máximo LIMITE_DE_ARQUIVOS_EM_PARALELO por vez.
   aoProgresso(feitos, total) deixa a tela mostrar uma barra. */
function garantirArquivosDeProva(nomes, aoProgresso){
  const fila = [...new Set(nomes)].filter(n => !window.EscDados.arquivosComCorpo[n] && !_arquivosFalhos.has(n));
  const total = fila.length; let feitos = 0;
  if(!total) return Promise.resolve();
  return new Promise(resolve => {
    let ativos = 0;
    const andar = () => {
      while(ativos < LIMITE_DE_ARQUIVOS_EM_PARALELO && fila.length){
        const nome = fila.shift(); ativos++;
        _carregarArquivoDeProva(nome).then(() => { ativos--; feitos++; if(aoProgresso) aoProgresso(feitos, total); if(!fila.length && !ativos) resolve(); else andar(); });
      }
    };
    andar();
  });
}
/* Os arquivos de prova que guardam o texto destas questões (ids, ou as próprias questões) e ainda não chegaram. */
function arquivosQueFaltamParaAsQuestoes(lista){
  const nomes = new Set();
  for(const x of lista || []){
    const id = typeof x === "string" ? x : x && x.id;
    const arquivo = _arquivoDaQuestao.get(id);
    if(arquivo && !window.EscDados.arquivosComCorpo[arquivo] && !_arquivosFalhos.has(arquivo)) nomes.add(arquivo);
  }
  return [...nomes];
}
/* O ponto de pré-carga: a Promise resolve quando o texto de todas essas questões está na memória. */
function garantirCorpos(lista, aoProgresso){
  return garantirArquivosDeProva(arquivosQueFaltamParaAsQuestoes(lista), aoProgresso);
}
/* Todos os textos (telas da equipe que listam e filtram o banco inteiro); mostra progresso numa janela. */
function todosOsArquivosDeProva(){ return [...new Set(_arquivoDaQuestao.values())]; }
function garantirTodosOsCorpos(aoProgresso){ return garantirArquivosDeProva(todosOsArquivosDeProva(), aoProgresso); }
function faltaCorpoDeAlgumaQuestao(){ return todosOsArquivosDeProva().some(n => !window.EscDados.arquivosComCorpo[n] && !_arquivosFalhos.has(n)); }

/* Pré-carga para ações e janelas: se o texto das questões ainda não chegou, baixa e CONTINUA
   (`continuar`) quando chegar; devolve true quando precisou esperar (quem chamou deve parar). */
function depoisDosCorpos(lista, continuar){
  if(!arquivosQueFaltamParaAsQuestoes(lista).length) return false;
  toast("Baixando o texto da questão…");
  garantirCorpos(lista).then(continuar);
  return true;
}

/* Monta o HTML de uma tela e descobre, pelo uso, quais arquivos de prova ela leu sem ter o texto:
   devolve { html, faltam }. Se faltam não está vazio o HTML não deve ser desenhado (saiu com
   texto em branco): baixa-se faltam e monta-se de novo. É assim que Revisão, Favoritos, Histórico
   e as demais listas nascem inteiras sem cada uma precisar saber a sua lista de ids antes. */
function coletarTextoDaTela(montar){
  _coletaDeCorpos = new Set();
  try{
    const html = montar();
    return { html, faltam: [..._coletaDeCorpos] };
  } finally { _coletaDeCorpos = null; }
}
