/* ferramentas/figuras-banco-adaptado.mjs — gera as figuras (PNG) das questões do
   banco adaptado da UNIFESP 2024 que pedem imagem em vez de descrição.

   Uso: node ferramentas/figuras-banco-adaptado.mjs
   Saída: dados/imagens/q-adap24-NNN.png (001, 020, 021, 043, 078, 081).

   São ilustrações esquemáticas, desenhadas por código a partir dos números do
   próprio enunciado (capnograma, MAPA, Holter, EEG) ou de dados fictícios
   declarados (forest plot, diagrama de dispersão). Nenhuma é exame de um
   paciente de verdade, e cada legenda diz isso. Determinístico: rodar de novo
   gera os mesmos arquivos. Usa o Chromium que o Playwright já traz.

   Os desenhos estão em figuras-modelos.mjs; aqui só está qual modelo vai em qual questão. */
import { gerarPng } from "./lib-figuras.mjs";
import { MODELOS } from "./figuras-modelos.mjs";

const FIGURAS = {
  "q-adap24-001": ["capnograma"], "q-adap24-020": ["mapa"], "q-adap24-021": ["holter"], "q-adap24-043": ["eeg"], "q-adap24-078": ["floresta"], "q-adap24-081": ["dispersao"],
};

await gerarPng(Object.fromEntries(Object.entries(FIGURAS).map(([id, [modelo, parametros]]) => [id, () => MODELOS[modelo].desenhar(parametros)])), process.argv.slice(2));
