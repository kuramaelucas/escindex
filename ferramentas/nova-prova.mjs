/* ==========================================================================
   NOVA PROVA — cria o arquivo vazio de uma prova em dados/ e o põe na lista
   ==========================================================================
   Uma linha, sem abrir arquivo nenhum:

     npm run nova-prova -- usp-2027 "USP-SP (FMUSP)" 2027 --total 120
     npm run nova-prova -- tp-2027-1 "Teste de Progresso NIEPAEM" 2027 --tipo graduacao --semestre 1

   Opções (todas opcionais):
     --total N            quantas questões a prova tem (só vai no cabeçalho)
     --alternativas 4|5   quantas alternativas (padrão 4)
     --titulo "…"         o resto do título ("Residência Médica, R1 Acesso Direto")
     --tipo graduacao     prova da faculdade (o padrão é residência)
     --semestre 1|2       aplicação do ano (Teste de Progresso): a instituição é a mesma, o semestre separa as provas
     --prefixo q-scmsp2027  o começo do id das questões (padrão: q- + nome sem hífens)

   O que faz: grava dados/prova-<nome>.js com o cabeçalho no padrão e a "ficha"
   da prova (banca, ano, prefixo — o que toda questão repete), e acrescenta o
   nome à lista de dados/manifesto.js. Nada em codigo/ nem no index.html.
   Depois, as questões entram em lotes: npm run adicionar-questoes.
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { RAIZ, registrarNoManifesto } from "./lib-dados.mjs";

function lerArgs(argv){
  const pos = [], opc = {};
  for(let i = 0; i < argv.length; i++){
    if(argv[i].startsWith("--")) opc[argv[i].slice(2)] = argv[++i];
    else pos.push(argv[i]);
  }
  return { pos, opc };
}

export function criarProva({ nome, banca, ano, total, alternativas = 4, titulo = "", tipo = "", prefixo = "", semestre = 0 }){
  nome = nome.replace(/^prova-/, "");
  if(!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(nome)) throw new Error(`nome "${nome}" inválido: use minúsculas, números e hífens (ex.: usp-2027)`);
  if(!banca || !Number.isInteger(ano)) throw new Error('faltam a banca e o ano: npm run nova-prova -- usp-2027 "USP-SP (FMUSP)" 2027');
  const slug = "prova-" + nome;
  const arq = path.join(RAIZ, "dados", slug + ".js");
  if(fs.existsSync(arq)) throw new Error(`dados/${slug}.js já existe`);
  const ficha = { banca, ano, prefixo: prefixo || "q-" + nome.replace(/-/g, ""), alternativas };
  if(total) ficha.total = total;
  if(tipo && tipo !== "residencia") ficha.tipoProva = tipo;
  if(semestre){ if(![1, 2].includes(semestre)) throw new Error("--semestre é 1 ou 2"); ficha.semestre = semestre; }
  const letras = "ABCDE".slice(0, alternativas);
  const linha = "=".repeat(74);
  const cab = `/* ${linha}
   ${banca} ${ano}${titulo ? " — " + titulo : ""}
   (${total ? total + " questões reais" : "questões reais"}, ${alternativas} alternativas ${letras[0]}–${letras[letras.length - 1]})
   ${linha}
   Enunciado, alternativas e gabarito de prova pública são transcritos; as
   explicações são autorais, escritas pela equipe a partir de fontes primárias
   (dados/LEIA-ME.md, "Política de conteúdo"). Todas as questões marcam
   \`real: true\`. A origem do gabarito e o que ficou pendente (anuladas,
   figuras) se anotam aqui, neste cabeçalho.

   @ficha ${JSON.stringify(ficha)}
   ${linha} */
window.EscDados.registrarQuestoes("${slug}", [
]);
`;
  fs.writeFileSync(arq, cab);
  registrarNoManifesto(slug);
  return { slug, arquivo: "dados/" + slug + ".js", ficha };
}

if(process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])){
  try{
    const { pos, opc } = lerArgs(process.argv.slice(2));
    const r = criarProva({
      nome: pos[0] || "", banca: pos[1], ano: Number(pos[2]),
      total: opc.total ? Number(opc.total) : 0, alternativas: opc.alternativas ? Number(opc.alternativas) : 4,
      titulo: opc.titulo || "", tipo: opc.tipo || "", prefixo: opc.prefixo || "", semestre: opc.semestre ? Number(opc.semestre) : 0,
    });
    console.log(`Criado ${r.arquivo} e acrescentado a dados/manifesto.js.`);
    console.log(`Ficha: ${JSON.stringify(r.ficha)}`);
    console.log(`Próximo: npm run adicionar-questoes -- ${r.slug} lote-1.json   (formato: dados/LEIA-ME.md, "Entrada compacta")`);
  }catch(e){ console.error("Erro: " + e.message); process.exit(1); }
}
