import express from "express";
import cors from "cors";

const app = express();
const PORTA_APP = 8888;

app.use(cors());
app.use(express.json());

let contadorProdutos = 1;
const produtos = [];

app.get("/produtos", (request, response) => {
  response.send({ produtos });
});

app.post("/produtos", (request, response) => {
  const meusDados = request.body;

  meusDados.id = contadorProdutos;
  contadorProdutos++;

  produtos.push(meusDados);

  response.send({ mensagem: "cadastro com sucesso" });
});

app.listen(PORTA_APP, () => console.log(" 🚀🚀🚀 Servidor rodando"));
