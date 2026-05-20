import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app = express();
const PORTA_APP = 8888;

app.use(cors());
app.use(express.json());

let contadorProdutos = 1;
const produtos = [];

// Configuração do banco de dados
const adapter = new JSONFile("db.json");
const db = new Low(adapter, { produtos: [], contadorProdutos: 1 });
await db.read();
// fim da configuracao do lowDb

app.get("/produtos", (request, response) => {
  response.send(db.data.produtos);
});

app.post("/produtos", (request, response) => {
  const meusDados = request.body;

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
    const novoProduto = { id: db.data.contadorProdutos++, ...meusDados };
    db.data.produtos.push(novoProduto);
    db.write();

    response.status(201).send({ data: novoProduto });
  }
});

app.listen(PORTA_APP, () => console.log(" 🚀🚀🚀 Servidor rodando"));
