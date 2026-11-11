/* ==========================================================================
   OTIMIZAR IMAGENS — figuras de dados/imagens/ em WebP, sem mudar o que se vê
   ==========================================================================
     npm run otimizar-imagens              converte os PNG/JPG novos (o que já é .webp não é tocado)
     npm run otimizar-imagens -- --simular só mostra quanto se economizaria

   Por quê: as figuras somavam 163 MB (PNG de até 1,4 MB) e cada uma é baixada
   por quem abre a questão. WebP encolhe bastante, e o service worker já guarda
   cada arquivo. Regras (para o texto das figuras continuar legível):
     - figura pequena (até 150 KB: tabelas, esquemas) -> WebP SEM perda;
     - figura grande (foto, ECG, exame) -> WebP com qualidade 88, largura máxima 1600 px;
     - se o WebP não sair menor que o original, o arquivo fica como está.
   Depois de converter, os endereços "dados/imagens/X.png" nos arquivos de
   dados/*.js passam a ".webp" e o original é apagado.
   Precisa do ImageMagick (`convert` ou `magick`) com suporte a WebP.
   Rode `npm run publicar` em seguida (o conteúdo mudou). */
import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { RAIZ } from "./lib-dados.mjs";

const PASTA = path.join(RAIZ, "dados", "imagens");
const LIMITE_SEM_PERDA = 150 * 1024;
const simular = process.argv.includes("--simular");
const im = ["magick", "convert"].find(c => spawnSync(c, ["-version"]).status === 0);
if(!im){ console.error("Falta o ImageMagick (convert/magick) com WebP."); process.exit(1); }

const arquivos = fs.readdirSync(PASTA).filter(f => /\.(png|jpe?g)$/i.test(f));
let antes = 0, depois = 0, convertidos = 0;
const trocas = new Map();   // "dados/imagens/X.png" -> "dados/imagens/X.webp"
for(const f of arquivos){
  const origem = path.join(PASTA, f), destino = origem.replace(/\.(png|jpe?g)$/i, ".webp");
  const tam = fs.statSync(origem).size;
  const semPerda = /\.png$/i.test(f) && tam <= LIMITE_SEM_PERDA;
  const args = [origem, "-resize", "1600x1600>", "-define", "webp:method=6",
    ...(semPerda ? ["-define", "webp:lossless=true"] : ["-quality", "88"]), destino];
  execFileSync(im, args, { stdio: "ignore" });
  const novo = fs.statSync(destino).size;
  antes += tam;
  if(novo >= tam){ fs.unlinkSync(destino); depois += tam; continue; }
  depois += novo; convertidos++;
  trocas.set("dados/imagens/" + f, "dados/imagens/" + path.basename(destino));
  if(simular) fs.unlinkSync(destino); else fs.unlinkSync(origem);
}
if(!simular && trocas.size){
  const dados = path.join(RAIZ, "dados");
  for(const f of fs.readdirSync(dados).filter(f => f.endsWith(".js"))){
    const c = path.join(dados, f); let t = fs.readFileSync(c, "utf8");
    const novo = t.replace(/dados\/imagens\/[A-Za-z0-9_.-]+\.(?:png|jpe?g)/gi, m => trocas.get(m) || m);
    if(novo !== t) fs.writeFileSync(c, novo);
  }
}
const mb = n => (n / 1048576).toFixed(1) + " MB";
console.log(`${convertidos} de ${arquivos.length} figuras ${simular ? "seriam convertidas" : "convertidas"}: ${mb(antes)} -> ${mb(depois)}.`);
if(!simular && convertidos) console.log("Rode: npm run publicar");
