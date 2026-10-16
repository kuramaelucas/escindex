/* ferramentas/medir-banco-adaptado.mjs — mede um banco de questões adaptadas (autorais) em
   relação à prova real em que se inspiram, sem abrir arquivo nenhum.

   Uso: node ferramentas/medir-banco-adaptado.mjs banco-simulado-epm-2 prova-unifesp-2025

   O que mede (os números que o pedido de simulado exige):
   - a letra do gabarito (cada uma perto de 25%) e a sequência mais longa da mesma letra;
   - a posição do gabarito por tamanho de alternativa (1ª a 4ª, cada uma perto de 25%) e a
     margem da alternativa mais longa sobre a segunda (alvo: no máximo ~10%);
   - a distribuição por área, comparada com a da prova real;
   - a semelhança de cada enunciado com o da prova real correspondente (proporção das
     palavras de 3 letras ou mais do enunciado novo que também aparecem no real; o teto é 50%)
     e com as outras questões reais da mesma prova;
   - o que repete o banco: trechos de 4 palavras e vocabulário em comum com outras questões.
   Só lê o conteúdo de dados/ (pela lista do manifesto); não grava nada. */
import { carregar } from "./lib-dados.mjs";

const [nomeBanco, nomeProva] = process.argv.slice(2);
if(!nomeBanco || !nomeProva){ console.error("uso: node ferramentas/medir-banco-adaptado.mjs <banco> <prova-real>"); process.exit(1); }
const { D, arquivos } = carregar();
const acharArquivo = (nome) => { const a = arquivos.find(x => x.nome === nome); if(!a || !a.questoes) throw new Error(`${nome} não é um arquivo de questões de dados/`); return a.questoes; };
const novas = acharArquivo(nomeBanco), reais = acharArquivo(nomeProva);

const semAcento = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const palavras = (t) => new Set(semAcento(t).match(/[a-z0-9]{3,}/g) || []);
const trechos = (t, k = 4) => { const w = semAcento(t).match(/[a-z0-9]+/g) || []; const s = new Set(); for(let i = 0; i + k <= w.length; i++) s.add(w.slice(i, i + k).join(" ")); return s; };
const proporcao = (a, b) => { const A = palavras(a), B = palavras(b); return A.size ? [...A].filter(w => B.has(w)).length / A.size : 0; };
const contar = (lista, chave) => lista.reduce((m, x) => { const k = chave(x); m[k] = (m[k] || 0) + 1; return m; }, {});

console.log(`${nomeBanco}: ${novas.length} questões (prova real de referência: ${nomeProva}, ${reais.length} questões)`);

// letras e posição por tamanho
const posicoes = novas.map(q => {
  const tam = q.alternativas.map(a => a.texto.length), gi = q.alternativas.findIndex(a => a.id === q.gabarito);
  const ordem = tam.map((t, i) => [t, i]).sort((a, b) => b[0] - a[0]);
  return { q, tam, empate: tam.filter(t => t === tam[gi]).length > 1, pos: ordem.findIndex(o => o[1] === gi) + 1, margem: ordem[0][0] / ordem[1][0] };
});
console.log("letras do gabarito:", contar(novas, q => q.gabarito));
console.log("posição do gabarito por tamanho (1 = mais longa):", contar(posicoes, p => p.pos), `— ${posicoes.filter(p => p.empate).length} com empate de tamanho`);
console.log("maior margem da alternativa mais longa sobre a 2ª:", ((Math.max(...posicoes.map(p => p.margem)) - 1) * 100).toFixed(1) + "%");
let seq = 1, maior = 1; novas.forEach((q, i) => { if(i && q.gabarito === novas[i - 1].gabarito) seq++; else seq = 1; maior = Math.max(maior, seq); });
console.log("maior sequência da mesma letra:", maior);
console.log("por área:", contar(novas, q => q.areaId), "\nna prova real:", contar(reais, q => q.areaId));

// semelhança com a prova real
const semelhancas = novas.map((q, i) => reais[i] ? proporcao(q.enunciado, reais[i].enunciado) : 0);
const maxSim = Math.max(...semelhancas), quem = semelhancas.indexOf(maxSim) + 1;
console.log(`semelhança máxima com a questão real correspondente: ${(maxSim * 100).toFixed(0)}% (nº ${quem}); média ${(semelhancas.reduce((a, b) => a + b, 0) / semelhancas.length * 100).toFixed(0)}%; acima de 50%: ${semelhancas.filter(s => s > 0.5).length}`);
let cruzada = [0, ""]; novas.forEach((q, i) => reais.forEach((r, j) => { if(i === j) return; const s = proporcao(q.enunciado, r.enunciado); if(s > cruzada[0]) cruzada = [s, `nº ${i + 1} × real ${j + 1}`]; }));
console.log(`maior semelhança com OUTRA questão real da mesma prova: ${(cruzada[0] * 100).toFixed(0)}% (${cruzada[1]})`);

// repetição de outras questões do banco
const ids = new Set(novas.map(q => q.id)), outras = D.questoes.filter(q => !ids.has(q.id));
const repetidas = [];
novas.forEach(q => {
  const t = trechos(q.enunciado); let melhor = [0, ""];
  if(t.size) for(const o of outras){ const ot = trechos(o.enunciado); let c = 0; for(const x of t) if(ot.has(x)) c++; if(c / t.size > melhor[0]) melhor = [c / t.size, o.id]; }
  const pal = palavras(q.enunciado); let vocab = [0, ""];
  for(const o of outras){ const po = palavras(o.enunciado); let c = 0; for(const w of pal) if(po.has(w)) c++; if(pal.size && c / pal.size > vocab[0]) vocab = [c / pal.size, o.id]; }
  if(melhor[0] >= 0.25 || vocab[0] >= 0.6) repetidas.push(`${q.id}: trechos iguais ${(melhor[0] * 100).toFixed(0)}% (${melhor[1]}), vocabulário em comum ${(vocab[0] * 100).toFixed(0)}% (${vocab[1]})`);
});
console.log(`questões com ≥25% de trechos de 4 palavras iguais ou ≥60% do vocabulário em comum com outra questão do banco: ${repetidas.length}`);
repetidas.forEach(r => console.log("  " + r));
