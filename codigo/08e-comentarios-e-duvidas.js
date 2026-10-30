/* codigo/08e-comentarios-e-duvidas.js — comentários e dúvidas em cada questão, regra das áreas de atuação, sinalizar questão desatualizada, padrão de justificativa e prompt de dúvida para IA (seção 11-D).
   Scripts comuns carregados em ordem pelo index.html (ESC_ARQUIVOS): o que se declara aqui vale nos outros arquivos. Guia: CLAUDE.md. */

/* ==========================================================================
   11-D. COMENTÁRIOS E DÚVIDAS — o que a pessoa escreve sobre a questão
   ========================================================================== */
/* ---------- comentários / dúvidas em cada questão ----------
   Com a nuvem ligada, o comentário sobe para a tabela `comentarios` e chega
   a todo mundo — é o que faz a dúvida do aluno aparecer na Fila de Dúvidas
   do residente, que antes só existia no navegador de quem escreveu. O nome
   de quem escreveu vai junto (autorNome), porque ninguém enxerga o perfil
   dos outros. Remover não apaga: marca `removido`, para a remoção também
   viajar. */
function comentariosAtivos(){ return (db.comentarios || []).filter(c => !c.removido); }
function nomeAutorComentario(c){ const a = getUsuario(c.usuarioId); return (a && a.nome) || c.autorNome || "Usuário"; }
function registrarComentario(questaoId, texto, oficial){
  const u = usuarioAtual();
  const c = { id: uid("com"), questaoId, usuarioId: u.id, autorNome: u.nome || "", papelAutor: u.papel, texto, data: hojeISO(), respostaOficial: !!oficial };
  db.comentarios.push(c);
  nuvemMarcarGlobalPendente("comentarios", c.id);
  saveState();
  return c;
}
function podeRemoverComentario(c){
  const u = usuarioAtual();
  return !!u && (c.usuarioId === u.id || u.papel === "professor" || u.papel === "admin");
}
function removerComentario(id){
  const c = (db.comentarios || []).find(x => x.id === id); if(!c || !podeRemoverComentario(c)) return;
  if(!confirm("Remover este comentário? Ele some para todo mundo.")) return;
  c.removido = true;
  nuvemMarcarGlobalPendente("comentarios", c.id);
  saveState(); toast("Comentário removido."); render();
}
function renderComentarios(questaoId){
  const comentarios = comentariosAtivos().filter(c=>c.questaoId===questaoId).sort((a,b)=>a.data.localeCompare(b.data));
  return `<div class="mt-3" style="border-top:1px solid var(--border);padding-top:1rem">
    <div style="font-weight:600;font-size:var(--fs-md);margin-bottom:.6rem">${iconeSvg("message")} Comentários e dúvidas (${comentarios.length})</div>
    ${comentarios.map(c=>{
      return `<div class="card-flat mb-1" ${c.respostaOficial?'style="border-color:var(--accent)"':""}>
        <div class="flex items-center gap-1"><span class="text-sm peso-600">${escapeHtml(nomeAutorComentario(c))}</span>${badgePapel(c.papelAutor)}${c.respostaOficial?'<span class="badge badge-accent">Resposta oficial</span>':""}</div>
        <div class="text-sm mt-1">${escapeHtml(c.texto)}</div>
        <div class="text-xs muted mt-1">${formatDataBR(c.data)}${podeRemoverComentario(c) ? ` · <button class="link-btn text-xs" onclick="removerComentario('${c.id}')">remover</button>` : ""}</div>
      </div>`;
    }).join("") || '<div class="text-sm muted">Nenhum comentário ainda. Seja o primeiro a comentar.</div>'}
    <div class="mt-2">
      <textarea class="textarea" id="novoComentario-${questaoId}" placeholder="Escreva um comentário ou dúvida sobre esta questão..." style="min-height:70px"></textarea>
      <button class="btn btn-secondary btn-sm mt-1" onclick="enviarComentario('${questaoId}')">Enviar comentário</button>
    </div>
  </div>`;
}
function enviarComentario(questaoId){
  const el = document.getElementById("novoComentario-"+questaoId);
  const texto = el.value.trim(); if(!texto) return;
  const u = usuarioAtual();
  registrarComentario(questaoId, texto, (u.papel==="professor"||u.papel==="residente"||u.papel==="admin") && !state.modoAluno);
  toast(nuvemConectado() ? "Comentário enviado — ele chega à turma e à fila de dúvidas." : "Comentário enviado."); render();
}
// se o usuário (professor/residente) tiver áreas de atuação definidas,
// restringe o que ele vê a essas áreas; sem áreas definidas, vê tudo
// (mantém o comportamento das contas de demonstração, que não têm isso)
function dentroDaAreaDeAtuacao(usuario, areaId){
  return !usuario.areasAtuacao || !usuario.areasAtuacao.length || usuario.areasAtuacao.includes(areaId);
}
/* ---------- regra das grandes áreas de professor/residente ----------------
   Teto de CONFIG.maxAreasAtuacao áreas, sendo no máximo UMA clínica; a
   Preventiva (CONFIG.areaTransversalId) é a única que pode ser somada. As
   funções abaixo são a fonte única dessa regra: o formulário de cadastro, a
   validação do envio e a migração de contas antigas (loadState) usam todas
   elas — mudar o teto é mexer só no CONFIG. */
function ehAreaTransversal(areaId){ return areaId === CONFIG.areaTransversalId; }
function areasClinicas(areas){ return (areas||[]).filter(a=>!ehAreaTransversal(a)); }
function validarAreasAtuacao(areas){
  areas = [...new Set((areas||[]).filter(Boolean))];
  if(!areas.length) return {ok:false, msg:"Selecione pelo menos uma grande área de atuação."};
  if(areas.length > CONFIG.maxAreasAtuacao) return {ok:false, msg:"São no máximo "+CONFIG.maxAreasAtuacao+" grandes áreas por pessoa."};
  if(areasClinicas(areas).length > 1){
    return {ok:false, msg:"Escolha uma única grande área clínica. A segunda vaga é de "+nomeArea(CONFIG.areaTransversalId)+", que é transversal e pode ser somada a qualquer uma."};
  }
  return {ok:true};
}
// devolve a seleção já dentro da regra: mantém a primeira área clínica e, se
// houver, a Preventiva. Serve à migração de cadastros feitos antes da regra.
function normalizarAreasAtuacao(areas){
  areas = [...new Set((areas||[]).filter(Boolean))];
  return [areasClinicas(areas)[0], areas.find(ehAreaTransversal)].filter(Boolean);
}
// um professor não pode se oferecer para responder dúvida de área que não cobre
function assuntosAjudaDentroDasAreas(assuntos, areas){
  return (assuntos||[]).filter(id=>{
    const e = getEspecialidade(id);
    return e && (areas||[]).includes(e.areaId);
  });
}
function duvidasPendentes(usuario){
  // uma dúvida é considerada "pendente" se, entre os comentários daquela questão
  // feitos por um aluno, nenhum comentário oficial posterior a ela responde
  const todos = comentariosAtivos();
  const deAlunos = todos.filter(c=>!c.respostaOficial);
  let pendentes = deAlunos.filter(c=>{
    return !todos.some(r=>r.questaoId===c.questaoId && r.respostaOficial && r.data>=c.data);
  });
  if(usuario) pendentes = pendentes.filter(c=>{ const q=getQuestao(c.questaoId); return q && dentroDaAreaDeAtuacao(usuario, q.areaId); });
  return pendentes;
}

/* ---------- sinalizar questão desatualizada ---------- */
function abrirSinalizarDesatualizada(qid){
  abrirModal(`
    ${cabecalhoJanela("Sinalizar questão")}
    <p class="text-sm muted">Isso avisa a coordenação para revisar a questão. Ela continua disponível normalmente até que um professor ou administrador confirme a alteração.</p>
    <div class="field mt-2"><label class="label">O que parece desatualizado ou incorreto? (opcional)</label><textarea class="textarea" id="motivoSinalizacao" placeholder="Ex.: a diretriz citada mudou em 2025..."></textarea></div>
    <div class="flex gap-1"><button class="btn btn-primary" onclick="confirmarSinalizacao('${qid}')">Enviar sinalização</button><button class="btn btn-secondary" onclick="fecharModalComConfirmacao()">Cancelar</button></div>`);
}
function confirmarSinalizacao(qid){
  const q = getQuestao(qid);
  if(!q.sinalizacoes) q.sinalizacoes = [];
  const eu = usuarioAtual();
  const sinal = {id:uid("sin"), usuarioId:eu.id, autorNome:eu.nome||"", data:hojeISO(), comentario:(document.getElementById("motivoSinalizacao").value||"").trim()};
  // só sobe a sinalização da conta conectada: conta local deste navegador não tem dono na nuvem
  if(nuvemConectado() && eu.id === nuvemSessao.usuarioId){ sinal.naNuvem = true; q.sinalizacoes.push(sinal); nuvemMarcarSinalizacao(sinal.id); }
  else q.sinalizacoes.push(sinal);
  saveState(); fecharModal();
  toast("Sinalização enviada. Obrigado — isso ajuda a manter o banco de questões confiável.");
}

/* ---------- o padrão de justificativa: parâmetro objetivo em destaque ----------
   Quando o que decide o diagnóstico ou a conduta é um número (sinal vital,
   exame, medida de imagem, tempo, dose, idade-limite, escore), a explicação
   tem de mostrar o número, o valor normal ou esperado e o ponto de corte que
   muda a conduta — não só dizer "está alterado". Esta é a ÚNICA definição
   dessa regra: o prompt de importação/transcrição (12a, 12b) e o de tirar
   dúvida com IA (abaixo) usam este mesmo texto, para uma IA responder a
   questão do mesmo jeito em qualquer caminho. Na tela, os "**" viram o
   realce do parâmetro (separarEnfase, seção 11-B). */
function regraDeParametrosObjetivos(){
  return "QUANDO A CONDUTA OU O DIAGNÓSTICO DEPENDE DE UM PARÂMETRO OBJETIVO (sinal vital, exame laboratorial, medida de imagem, tempo, dose, idade-limite ou escore):\n"+
  "- Destaque o parâmetro entre dois asteriscos, já com o valor do caso: **PAS 82 mmHg**, **Glasgow 8**, **CURB-65 = 3**, **TSH 12 mUI/L**.\n"+
  "- Ao lado, diga o valor normal ou esperado (ou o alvo terapêutico), com a unidade: \"(normal: 90–120 mmHg)\".\n"+
  "- Diga o ponto de corte que muda a conduta e o que ele muda: \"< 90 mmHg define choque → expansão volêmica\".\n"+
  "- Se houver escore validado (Glasgow, APGAR, CURB-65, qSOFA, Wells, CHA2DS2-VASc, HAS-BLED, Child-Pugh, MELD, Alvarado, Ranson, Bishop, Framingham etc.), calcule-o para o caso apresentado, mostre a soma item a item e a faixa de risco ou a conduta que ele indica. Ao montar o caso, NÃO deixe o escore colado no ponto de corte (nada de CURB-65 = 2 quando o limiar é 2, nem Wells no limite entre as faixas): escolha um valor claramente de um lado, para a resposta não depender de uma unidade de pontuação. E ENSINE a gravidade: diga por que cada item vale o que vale (por exemplo, por que a idade, a ureia ou a PA entram no escore e pesam daquele jeito, e o que isso mede no organismo), para o aluno entender o escore e não decorar a soma.\n"+
  "- Prefira, sempre que existirem, as diretrizes BRASILEIRAS (Ministério da Saúde/PCDT, Conitec, sociedades como SBC, SBD, SBPT, SBP, FEBRASGO, SBU, AMB/CFM) e só então as internacionais; diga qual é a fonte usada e, se a conduta brasileira diferir da internacional, explique a diferença.\n"+
  "- Os valores de referência e os pontos de corte são os da diretriz citada em REFERENCIAS; se o valor muda com idade, sexo, gestação ou método do laboratório, diga para qual população vale. Se você não tiver certeza do número, diga que não tem, em vez de inventar.\n"+
  "- Use os asteriscos só nesses parâmetros (poucos por explicação; nunca em títulos nem em palavras comuns). Se a questão não depende de nenhum parâmetro objetivo, explique normalmente, sem asteriscos.\n";
}

/* FISIOPATOLOGIA E EPIDEMIOLOGIA NA EXPLICAÇÃO. Explicação que só diz "é o
   quadro típico" faz o aluno decorar a resposta; o que fixa é o mecanismo (por
   que o achado aparece, por que a conduta funciona) e o contexto que torna a
   hipótese provável naquele paciente (frequência, idade, fator de risco). Esta
   é a ÚNICA definição dessa regra, como a de parâmetros acima: o prompt de
   importação/transcrição (12a, 12b) e o de tirar dúvida com IA usam este texto. */
function regraDeFisiopatologiaEEpidemiologia(){
  return "FISIOPATOLOGIA E EPIDEMIOLOGIA (a explicação ENSINA, não só aponta a resposta):\n"+
  "- Depois das dicas do enunciado, explique em 1 a 3 frases o MECANISMO fisiopatológico que liga os achados do caso ao diagnóstico ou à conduta: por que o sinal ou o sintoma aparece, por que o exame se altera, por que o tratamento funciona. Não basta dizer \"é o quadro típico\".\n"+
  "- Dê o contexto EPIDEMIOLÓGICO que torna a hipótese provável neste paciente: frequência relativa entre as causas possíveis, faixa etária e sexo mais afetados, fatores de risco presentes no caso e, quando souber, incidência ou prevalência; diga se o dado vale para o Brasil.\n"+
  "- Se o mecanismo explica por que uma alternativa errada falha (efeito adverso, contraindicação, ação em outro nível da cadeia), use-o no motivo daquela alternativa.\n"+
  "- Número epidemiológico só com a fonte em REFERENCIAS; se não tiver certeza do número, diga que não tem, em vez de inventar.\n";
}

/* ---------- prompt pronto para tirar dúvida com uma IA ---------- */
/* A dúvida do aluno entra logo depois da questão e vem pedida em primeiro
   lugar: sem isso ela se perde no meio das instruções gerais, e a pergunta
   que ele fez é justamente a que ele quer ver respondida. */
function blocoDuvidaEspecifica(duvida){
  const d = String(duvida||"").trim();
  return d ? "--- MINHA DÚVIDA ESPECÍFICA ---\n"+d+"\n--- FIM DA DÚVIDA ---\nResponda PRIMEIRO a essa dúvida, de forma direta e com base em fontes primárias; depois siga a análise estruturada abaixo.\n\n" : "";
}
function gerarPromptDuvida(q, duvida){
  if(ehDissertativa(q)) return "Aja como um médico revisor especialista em provas de residência médica no Brasil.\n\n"+
    "Analise CRITICAMENTE a questão dissertativa abaixo, com base em diretrizes e fontes primárias atuais, e diga se a resposta esperada está correta, completa e atualizada.\n\n"+
    "--- QUESTÃO ("+q.banca+", "+anoDaProva(q)+") ---\n"+q.enunciado+"\n\nResposta esperada pela banca: "+(q.respostaEsperada||"(não informada)")+"\nJustificativa atual da plataforma: "+q.explicacaoGeral+"\n--- FIM DA QUESTÃO ---\n\n"+blocoDuvidaEspecifica(duvida)+
    "Responda de forma estruturada:\n1) A resposta esperada está correta e completa? O que falta ou está desatualizado?\n2) Quais pontos uma resposta de nota máxima precisa trazer?\n3) Quais diretrizes/referências (com nome e, se souber, ano) sustentam isso?\n\n"+
    regraDeParametrosObjetivos();
  const alts = q.alternativas.map(a=>a.id+") "+a.texto).join("\n");
  return "Aja como um médico revisor especialista em questões de concursos de residência médica no Brasil.\n\n"+
  "Analise CRITICAMENTE a questão abaixo. Baseie-se em evidências científicas atuais e em fontes primárias: diretrizes e consensos de sociedades de especialidade, protocolos e PCDT do Ministério da Saúde, revisões sistemáticas e artigos originais. NÃO use nem reproduza resoluções de sites de questões, bancos comerciais ou cursinhos. NÃO invente referências ou dados — se não souber ou não tiver certeza de algo, diga isso explicitamente em vez de arriscar uma resposta incorreta.\n\n"+
  "Considere também a possibilidade de a questão estar mal formulada, ambígua, desatualizada, ou de o gabarito considerado estar incorreto — isso acontece de verdade em provas de residência e costuma gerar recursos administrativos.\n\n"+
  "--- QUESTÃO ("+q.banca+", "+anoDaProva(q)+") ---\n"+q.enunciado+"\n\nAlternativas:\n"+alts+"\n\n"+
  "Gabarito considerado correto pela plataforma: "+q.gabarito+"\nExplicação atual da plataforma: "+q.explicacaoGeral+"\n--- FIM DA QUESTÃO ---\n\n"+blocoDuvidaEspecifica(duvida)+
  "Responda de forma estruturada:\n"+
  "1) Você concorda com o gabarito? Justifique clinicamente.\n"+
  "2) Há alguma ambiguidade, erro ou desatualização na questão ou nas alternativas? Se sim, qual e por quê?\n"+
  "3) Quais diretrizes/referências (com nome e, se souber, ano) sustentam a resposta correta?\n"+
  "4) Percorra TODAS as alternativas incorretas, uma por uma, na ordem (A, B, C...), e explique por que cada uma está errada. "+
  "Em cada uma, comece pelo que o PRÓPRIO ENUNCIADO diz: cite o dado do caso que a descarta — idade, sexo, tempo de evolução, "+
  "sinal ou sintoma presente ou ausente, achado de exame físico, resultado de exame, comorbidade, medicação em uso, contexto "+
  "epidemiológico. Diga o que teria de ser diferente no enunciado para aquela alternativa passar a ser a correta. "+
  "Quando a alternativa estiver errada por conhecimento que não vem do caso (uma dose errada, uma conduta que não existe, um "+
  "conceito trocado), diga isso explicitamente, em vez de forçar uma justificativa que o enunciado não sustenta.\n"+
  "5) Aponte a pegadinha da questão: qual alternativa é a \"quase certa\", o que a torna atraente e qual detalhe do enunciado a derruba.\n"+
  "6) Parâmetros objetivos: se a conduta ou o diagnóstico depende de um número, siga o padrão abaixo (é o mesmo das explicações da plataforma).\n"+
  "7) Fisiopatologia e epidemiologia: explique o mecanismo que liga os achados do caso à resposta e o contexto epidemiológico que torna a hipótese provável, no padrão do último bloco abaixo.\n\n"+
  regraDeParametrosObjetivos()+"\n"+
  regraDeFisiopatologiaEEpidemiologia();
}
/* ---------- para onde o aluno leva o prompt ----------
   O prompt de dúvida tem 3,5 a 9,5 mil caracteres (13 mil+ na URL), mais do
   que os sites de IA aceitam de forma confiável num endereço. Por isso o
   caminho é sempre o mesmo e nunca corta nada: copiar o prompt inteiro e só
   então abrir a IA, para a pessoa colar. As quatro conhecidas já vêm
   prontas; quem usa outra cadastra o endereço dela em Perfil. */
const IAS_PARA_DUVIDA = [
  {id:"chatgpt", nome:"ChatGPT", url:"https://chatgpt.com/"},
  {id:"claude", nome:"Claude", url:"https://claude.ai/new"},
  {id:"gemini", nome:"Gemini", url:"https://gemini.google.com/app"},
  {id:"perplexity", nome:"Perplexity", url:"https://www.perplexity.ai/"},
];
// só endereço web (https ou http): o campo é do aluno e vira link que abre numa aba
function urlDeIaValida(texto){
  try{ const u = new URL(String(texto||"").trim()); return (u.protocol==="https:" || u.protocol==="http:") ? u.href : null; }
  catch(e){ return null; }
}
function iaPropriaDoUsuario(u){
  const p = u && u.iaPropria;
  return p && p.nome && urlDeIaValida(p.url) ? {id:"propria", nome:String(p.nome), url:urlDeIaValida(p.url)} : null;
}
function opcoesDeIa(u){ const p = iaPropriaDoUsuario(u); return p ? [...IAS_PARA_DUVIDA, p] : IAS_PARA_DUVIDA; }
// sem escolha feita, o ChatGPT (o mais conhecido) é o ponto de partida; a troca fica à vista
function iaEscolhidaDoUsuario(u){
  const lista = opcoesDeIa(u);
  return lista.find(x=>x.id===(u && u.iaPreferida)) || lista[0];
}
function escolherIaPreferida(id){
  const u = usuarioAtual(); if(!u || !opcoesDeIa(u).some(x=>x.id===id)) return;
  u.iaPreferida = id; saveState();
  const ia = iaEscolhidaDoUsuario(u);
  const botao = document.getElementById("botaoAbrirIa");
  if(botao) botao.innerHTML = iconeSvg("chevron-r") + " 2. Abrir " + escapeHtml(ia.nome);
  const sel = document.getElementById("iaDoPrompt"); if(sel) sel.value = id;
  if(state.route==="perfil") render();
}
function salvarIaPropria(){
  const u = usuarioAtual();
  const nome = document.getElementById("iaPropriaNome").value.trim();
  const url = urlDeIaValida(document.getElementById("iaPropriaUrl").value);
  if(!nome){ toast("Dê um nome para a sua IA (por exemplo, DeepSeek).", "err"); return; }
  if(!url){ toast("Cole o endereço completo da IA, começando por https://", "err"); return; }
  u.iaPropria = {nome: nome.slice(0, 30), url}; u.iaPreferida = "propria"; saveState();
  toast(nome + " cadastrada e escolhida."); render();
}
function removerIaPropria(){
  const u = usuarioAtual(); delete u.iaPropria;
  if(u.iaPreferida==="propria") delete u.iaPreferida;
  saveState(); render();
}
function renderCardIaDuvidas(u){
  const ia = iaEscolhidaDoUsuario(u), propria = iaPropriaDoUsuario(u);
  return `<div class="card mt-2" style="max-width:460px">
    <div class="card-title">IA para tirar dúvidas</div>
    <p class="text-sm muted">Em cada questão, <em>Tirar dúvida com IA</em> prepara um prompt completo. Escolha aqui a IA que abre depois de você copiá-lo.</p>
    <div class="field mt-1">
      ${opcoesDeIa(u).map(o=>`<label class="checkbox-row"><input type="radio" name="iaPreferida" ${o.id===ia.id?"checked":""} onchange="escolherIaPreferida('${o.id}')"> ${escapeHtml(o.nome)}${o.id==="propria"?` <span class="muted text-xs">(a sua)</span>`:""}</label>`).join("")}
    </div>
    <details class="mt-1">
      <summary class="text-sm">${propria ? "Trocar a minha IA" : "Uso outra IA — cadastrar"}</summary>
      <ol class="text-sm muted mt-1" style="padding-left:1.2rem">
        <li>Abra no navegador a IA que você prefere (DeepSeek, Copilot, Grok, Maritaca…).</li>
        <li>Copie o endereço da barra do navegador, na página onde você começa uma conversa nova.</li>
        <li>Cole abaixo, dê um nome e salve. Pronto: ela passa a ser a escolhida.</li>
      </ol>
      <div class="field mt-1"><label class="label" for="iaPropriaNome">Nome</label><input class="input" id="iaPropriaNome" maxlength="30" value="${escapeHtml(propria?propria.nome:"")}" placeholder="Ex.: DeepSeek"></div>
      <div class="field"><label class="label" for="iaPropriaUrl">Endereço</label><input class="input" id="iaPropriaUrl" value="${escapeHtml(propria?propria.url:"")}" placeholder="https://chat.deepseek.com/"></div>
      <div class="flex gap-1 quebra"><button class="btn btn-primary btn-sm" onclick="salvarIaPropria()">Salvar minha IA</button>${propria?`<button class="btn btn-ghost btn-sm" onclick="removerIaPropria()">Remover</button>`:""}</div>
    </details>
  </div>`;
}
// a dúvida muda o prompt: o que já tinha sido copiado deixa de valer, então o botão da IA volta a esperar uma nova cópia
function digitarDuvidaEspecifica(qid, texto){
  document.getElementById("promptDuvidaTexto").value = gerarPromptDuvida(getQuestao(qid), texto);
  const b = document.getElementById("botaoAbrirIa");
  if(b){ b.disabled = true; b.title = "Copie o prompt primeiro"; }
  const c = document.getElementById("passoCopiado"); if(c) c.hidden = true;
}
function copiarPromptDuvida(){
  copiarTexto(document.getElementById("promptDuvidaTexto").value, "Prompt copiado! Agora abra a IA e cole (Ctrl+V).");
  const b = document.getElementById("botaoAbrirIa");
  if(b){ b.disabled = false; b.title = ""; }
  const c = document.getElementById("passoCopiado"); if(c) c.hidden = false;
}
function abrirIaDoUsuario(){
  const ia = iaEscolhidaDoUsuario(usuarioAtual());
  // No celular o link da IA é entregue ao aplicativo instalado; com "_blank" o
  // navegador abria uma aba nova antes disso e ela ficava aberta depois do app.
  // Navegando na própria aba não sobra aba; o prompt já foi copiado e o estado
  // fica salvo, então voltar à plataforma não perde nada.
  const celular = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  if(celular) window.location.href = ia.url;
  else window.open(ia.url, "_blank", "noopener");
}
function abrirPromptDuvida(qid){
  const prompt = gerarPromptDuvida(getQuestao(qid));
  const u = usuarioAtual(), ia = iaEscolhidaDoUsuario(u);
  abrirModal(`
    ${cabecalhoJanela("Prompt para tirar dúvida com uma IA")}
    <p class="text-sm muted mb-2">Dois passos: <strong>copie o prompt</strong> e, em seguida, <strong>abra a IA</strong> e cole (Ctrl+V). O botão da IA só libera depois de copiar, para você não abrir a IA de mãos vazias.</p>
    <div class="field">
      <label class="label" for="duvidaEspecifica">Sua dúvida específica <span class="muted peso-400">(opcional)</span></label>
      <textarea class="textarea" id="duvidaEspecifica" rows="3" maxlength="1500" placeholder="Ex.: Por que não é a alternativa C, se o paciente tem febre há 3 dias?" oninput="digitarDuvidaEspecifica('${qid}', this.value)"></textarea>
      <div class="hint">Ela entra no prompt logo depois da questão, e a IA responde a ela primeiro.</div>
    </div>
    <label class="label" for="promptDuvidaTexto">Prompt que será copiado</label>
    <textarea class="textarea textarea-mono" style="min-height:220px" readonly id="promptDuvidaTexto">${escapeHtml(prompt)}</textarea>
    <div class="flex gap-1 mt-2 quebra">
      <button class="btn btn-primary" onclick="copiarPromptDuvida()">${iconeSvg("search")} 1. Copiar prompt</button>
      <button class="btn btn-secondary" id="botaoAbrirIa" disabled title="Copie o prompt primeiro" onclick="abrirIaDoUsuario()">${iconeSvg("chevron-r")} 2. Abrir ${escapeHtml(ia.nome)}</button>
      <button class="btn btn-ghost" onclick="fecharModal()">Fechar</button>
    </div>
    <div class="text-sm mt-1" id="passoCopiado" hidden>${iconeSvg("check")} Prompt copiado. Agora é só abrir a IA e colar.</div>
    <div class="flex gap-1 mt-2 quebra" style="align-items:center">
      <label class="text-xs muted" for="iaDoPrompt">IA:</label>
      <select class="select" id="iaDoPrompt" style="max-width:220px" onchange="escolherIaPreferida(this.value)">${opcoesDeIa(u).map(o=>`<option value="${o.id}" ${o.id===ia.id?"selected":""}>${escapeHtml(o.nome)}</option>`).join("")}</select>
      <button class="link-btn text-xs" onclick="fecharModal(); navigate('perfil')">usar outra IA (cadastrar no Perfil)</button>
    </div>`, "lg");
}
