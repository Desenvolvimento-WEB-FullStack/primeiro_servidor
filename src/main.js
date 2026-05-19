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

  console.log(meusDados.nome);

  if (!meusDados.nome || typeof meusDados.nome !== "string") {
    response.status(400).send({ error: "Nome é obrigatório" });
  } else if (typeof meusDados.preco !== "number" || meusDados.preco <= 0) {
    response.status(400).send({ error: "Preço deve ser númerico e maior 0" });
  } else if (typeof meusDados.estoque !== "number" || meusDados.estoque < 0) {
    response
      .status(400)
      .send({ error: "Estoque dever ser númerico e no mínimo 0" });
  } else if (typeof meusDados.ativo !== "boolean") {
    response.status(400).send({ error: "O status deve sert um booleano" });
  } else {
    meusDados.id = contadorProdutos;
    contadorProdutos++;

    produtos.push(meusDados);

    response
      .status(201)
      .send({ data: { id: meusDados.id, nome: meusDados.nome } });
  }
});

app.listen(PORTA_APP, () => console.log(" 🚀🚀🚀 Servidor rodando"));
