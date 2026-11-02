/* ferramentas/lib-referencias.mjs — as regras sobre o campo `referencias` das questões de dados/.

   Existe para que a conferência de referências (feita à mão em 29/10/2026, ver docs/CONFERENCIA-DE-REFERENCIAS-NA-WEB.md)
   passe a valer sozinha para tudo que for criado depois. O conferidor (testes/conferir-dados.mjs) e o
   adicionar-questoes usam `problemasDeReferencia`; `npm run referencias-a-conferir` usa as duas listas.

   A regra para questão criada a partir de CORTE (campo `criadoEm`), de prova real ou autoral, nova ou não:
     1. tem `referencias`;
     2. as referências trazem uma data de conferência (DD/MM/AAAA): quem conferiu, onde e quando;
     3. "de memória", "não conferida" ou "texto não aberto" só valem se dito com data, como registro honesto do que
        faltou ("texto oficial não aberto, domínio X bloqueado, 05/12/2026"): a data da regra 2 já cobre isso, e
        a questão continua na fila de `npm run referencias-a-conferir` até alguém abrir o texto;
     4. se cita uma diretriz que está na tabela `edicoes-vigentes.json` e não menciona a edição vigente
        (nem uma posterior), a questão tem de decidir: citar a vigente e conferir o que mudou, ou dizer que
        usa a antiga de propósito, com a vigente mencionada.
   Questões anteriores ao CORTE não falham: entram na fila de `npm run referencias-a-conferir`. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const CORTE_DA_CONFERENCIA = "2026-11-02";
export const FRACA = /(não foi conferid|não conferid|não foram conferid|não aberto|não abert|rede bloqueada|Nível de confirmação: memória|de memória|em resumos)/i;
export const COM_DATA = /\b\d{2}\/\d{2}\/20\d{2}\b/;
const ANO = /(?<![\d/,.])(19[89]\d|20[0-4]\d)(?![\d])/g;

const CAMINHO = path.join(path.dirname(fileURLToPath(import.meta.url)), "edicoes-vigentes.json");
let _tabela;
/* \b do JavaScript não entende acento ("pá|gina" casaria GINA). Por isso as siglas (2 a 6 maiúsculas) do `termo`
   ganham fronteira que olha letras Unicode, e o \b que sobrar sai. */
export const prepararTermo = (t) => t.replace(/\\b/g, "").replace(/(?<![\p{L}\\])([A-Z]{2,6})(?![\p{L}])/gu, "(?<![\\p{L}])$1(?![\\p{L}])");
export function edicoesVigentes(){
  if(!_tabela) _tabela = JSON.parse(fs.readFileSync(CAMINHO, "utf8")).edicoes.map(e => ({ ...e, re: new RegExp(prepararTermo(e.termo), "iu") }));
  return _tabela;
}

/* As entradas da tabela cuja diretriz a referência cita sem mencionar a edição vigente (nem uma posterior). */
export function alertasDeEdicao(referencias, tabela = edicoesVigentes()){
  const ref = String(referencias || "");
  if(!ref.trim()) return [];
  const anos = (ref.match(ANO) || []).map(Number);
  return tabela.filter(e => e.re.test(ref) && !anos.some(a => a >= e.vigente));
}

/* Lista de textos de problema (vazia = cumpre). Só vale para questão criada a partir de CORTE. */
export function problemasDeReferencia(q){
  if(String(q.criadoEm || "") < CORTE_DA_CONFERENCIA) return [];
  const ref = String(q.referencias || "").trim(), p = [];
  if(!ref) return ["sem referências: cite a diretriz ou obra, com edição e ano (e leia o texto: npm run texto-oficial)"];
  if(!COM_DATA.test(ref)) p.push('referências sem data de conferência: registre o que foi lido, onde e quando ("… conferido em DD/MM/AAAA"; npm run anotar-conferencia)');
  alertasDeEdicao(ref).forEach(e => p.push(`cita ${e.nome} sem a edição vigente (${e.edicao}): cite a vigente e confira o que mudou, ou mencione-a ao justificar o uso da anterior`));
  return p;
}
