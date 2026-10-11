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
  q.sinalizacoes.push({usuarioId:usuarioAtual().id, data:hojeISO(), comentario:(document.getElementById("motivoSinalizacao").value||"").trim()});
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
  "- Se houver escore validado (Glasgow, APGAR, CURB-65, qSOFA, Wells, CHA2DS2-VASc, HAS-BLED, Child-Pugh, MELD, Alvarado, Ranson, Bishop, Framingham etc.), calcule-o para o caso apresentado, mostre a soma item a item e a faixa de risco ou a conduta que ele indica.\n"+
  "- Os valores de referência e os pontos de corte são os da diretriz citada em REFERENCIAS; se o valor muda com idade, sexo, gestação ou método do laboratório, diga para qual população vale. Se você não tiver certeza do número, diga que não tem, em vez de inventar.\n"+
  "- Use os asteriscos só nesses parâmetros (poucos por explicação; nunca em títulos nem em palavras comuns). Se a questão não depende de nenhum parâmetro objetivo, explique normalmente, sem asteriscos.\n";
}

/* ---------- prompt pronto para tirar dúvida com uma IA ---------- */
function gerarPromptDuvida(q){
  if(ehDissertativa(q)) return "Aja como um médico revisor especialista em provas de residência médica no Brasil.\n\n"+
    "Analise CRITICAMENTE a questão dissertativa abaixo, com base em diretrizes e fontes primárias atuais, e diga se a resposta esperada está correta, completa e atualizada.\n\n"+
    "--- QUESTÃO ("+q.banca+", "+anoDaProva(q)+") ---\n"+q.enunciado+"\n\nResposta esperada pela banca: "+(q.respostaEsperada||"(não informada)")+"\nJustificativa atual da plataforma: "+q.explicacaoGeral+"\n--- FIM DA QUESTÃO ---\n\n"+
    "Responda de forma estruturada:\n1) A resposta esperada está correta e completa? O que falta ou está desatualizado?\n2) Quais pontos uma resposta de nota máxima precisa trazer?\n3) Quais diretrizes/referências (com nome e, se souber, ano) sustentam isso?\n\n"+
    regraDeParametrosObjetivos();
  const alts = q.alternativas.map(a=>a.id+") "+a.texto).join("\n");
  return "Aja como um médico revisor especialista em questões de concursos de residência médica no Brasil.\n\n"+
  "Analise CRITICAMENTE a questão abaixo. Baseie-se em evidências científicas atuais e em fontes primárias: diretrizes e consensos de sociedades de especialidade, protocolos e PCDT do Ministério da Saúde, revisões sistemáticas e artigos originais. NÃO use nem reproduza resoluções de sites de questões, bancos comerciais ou cursinhos. NÃO invente referências ou dados — se não souber ou não tiver certeza de algo, diga isso explicitamente em vez de arriscar uma resposta incorreta.\n\n"+
  "Considere também a possibilidade de a questão estar mal formulada, ambígua, desatualizada, ou de o gabarito considerado estar incorreto — isso acontece de verdade em provas de residência e costuma gerar recursos administrativos.\n\n"+
  "--- QUESTÃO ("+q.banca+", "+anoDaProva(q)+") ---\n"+q.enunciado+"\n\nAlternativas:\n"+alts+"\n\n"+
  "Gabarito considerado correto pela plataforma: "+q.gabarito+"\nExplicação atual da plataforma: "+q.explicacaoGeral+"\n--- FIM DA QUESTÃO ---\n\n"+
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
  "6) Parâmetros objetivos: se a conduta ou o diagnóstico depende de um número, siga o padrão abaixo (é o mesmo das explicações da plataforma).\n\n"+
  regraDeParametrosObjetivos();
}
function abrirPromptDuvida(qid){
  const prompt = gerarPromptDuvida(getQuestao(qid));
  abrirModal(`
    ${cabecalhoJanela("Prompt para tirar dúvida com uma IA")}
    <p class="text-sm muted mb-2">Copie o texto abaixo e cole em qualquer assistente de IA (Claude, ChatGPT, Gemini...) para obter uma segunda opinião, com evidências, sobre esta questão.</p>
    <textarea class="textarea textarea-mono" style="min-height:280px" readonly id="promptDuvidaTexto">${escapeHtml(prompt)}</textarea>
    <div class="flex gap-1 mt-2">
      <button class="btn btn-primary" onclick="copiarTexto(document.getElementById('promptDuvidaTexto').value,'Prompt copiado! Cole em uma IA de sua confiança.')">${iconeSvg("search")} Copiar prompt</button>
      <button class="btn btn-secondary" onclick="fecharModal()">Fechar</button>
    </div>`, "lg");
}
