/* ferramentas/figuras-banco-simulado-epm-2.mjs — gera as figuras (PNG) das
   questões do banco adaptado da UNIFESP 2025 em que o dado é visual por natureza
   (eletrocardiograma, ritmo, curva ROC, heredograma, cardiotocografia, curva de crescimento).

   Uso: node ferramentas/figuras-banco-simulado-epm-2.mjs [id ...]
   Saída: dados/imagens/q-adap25-NNN.png

   São ilustrações esquemáticas, desenhadas por código a partir dos números do
   próprio enunciado. Nenhuma é exame de paciente real, e cada legenda diz isso.
   Determinístico: rodar de novo gera os mesmos arquivos. Usa o Chromium que o
   Playwright já traz.

   Os desenhos estão em figuras-modelos.mjs; aqui só está qual modelo vai em qual questão. */
import { gerarPng } from "./lib-figuras.mjs";
import { MODELOS } from "./figuras-modelos.mjs";

const FIGURAS = {
  "q-adap25-021": ["ecg12"], "q-adap25-030": ["fibrilacaoAtrial"], "q-adap25-053": ["curvaRoc"], "q-adap25-063": ["heredograma"], "q-adap25-080": ["cardiotocografia"],
};

await gerarPng(Object.fromEntries(Object.entries(FIGURAS).map(([id, [modelo, parametros]]) => [id, () => MODELOS[modelo].desenhar(parametros)])), process.argv.slice(2));
