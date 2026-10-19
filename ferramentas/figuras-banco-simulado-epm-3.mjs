/* ferramentas/figuras-banco-simulado-epm-3.mjs — gera a figura (PNG) da questão do Simulado EPM 3
   (banco adaptado da UNIFESP 2022) em que o dado é visual por natureza.

   Uso: node ferramentas/figuras-banco-simulado-epm-3.mjs [id ...]
   Saída: dados/imagens/q-adap22-NNN.png

   Ilustração esquemática, desenhada por código; não é exame de paciente real, e a legenda diz isso.
   Os desenhos estão em figuras-modelos.mjs; aqui só está qual modelo vai em qual questão. */
import { gerarPng } from "./lib-figuras.mjs";
import { MODELOS } from "./figuras-modelos.mjs";

const FIGURAS = {
  "q-adap22-081": ["taquicardiaSupraventricular"],
};

await gerarPng(Object.fromEntries(Object.entries(FIGURAS).map(([id, [modelo, parametros]]) => [id, () => MODELOS[modelo].desenhar(parametros)])), process.argv.slice(2));
