import express from "express";
import cors from "cors";

// criar váriavel pra receber o express
const app = express();
const PORTA_APP = 8888;

const mensagens = [
  "Acredite no seu potencial — grandes conquistas começam com um único passo.",
  "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
  "Não espere pela oportunidade perfeita. Crie-a.",
  "Cada dia é uma nova chance de ser melhor do que ontem.",
  "A persistência transforma o impossível em possível.",
  "Você é mais forte do que pensa e mais capaz do que imagina.",
  "O único limite que existe é aquele que você mesmo cria.",
  "Grandes resultados exigem grandes comprometimentos.",
  "Errar faz parte do processo — desistir é a única derrota real.",
  "Foque no progresso, não na perfeição.",
];

app.use(cors());

app.get("/bem_vindo", (request, response) => {
  response.send({ mensagem: "Bem vindo" });
});

app.get("/mensagem", (request, response) => {
  const numeroAleatorio = Math.random() * 10;
  const numeroArrendodado = Math.trunc(numeroAleatorio);

  console.log(numeroAleatorio);
  console.log(numeroArrendodado);

  response.send({ mensagem: mensagens[numeroArrendodado] });
});

app.get("/sorteio", (request, response) => {
  const nomesRecebidos = request.query.nomes.split(",");

  const tamanhoDoArray = nomesRecebidos.length;
  const posicaoNoArray = Math.random() * tamanhoDoArray;
  const posicaoNoArrayArrendondada = Math.trunc(posicaoNoArray);

  response.send({ resultado: nomesRecebidos[posicaoNoArrayArrendondada] });
});

app.listen(PORTA_APP, () => console.log(" 🚀🚀🚀 Servidor rodando"));

// GET POST DELETE PUT
// path
