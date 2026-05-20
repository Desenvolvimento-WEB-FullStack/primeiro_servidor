import express from "express";
import cors from "cors";
import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";

const app = express();
const PORTA = 8888;

app.use(cors()); // Abre aplicação para receber requisicoes de outros lugares
app.use(express.json()); // habilita reconhecimento de contéudo no formato JSON chegando servidor

//Configuração de banco de dados no arquivo JSON
const adapter = new JSONFile("db_clientes.json");
const db = new Low(adapter, { clientes: [], contador_clientes: 1 });
db.read();
// fim da configuracao

/*
  Crie uma rota para cadastrar um novo cliente por nome(string), salario(numero) e habilitacao(booleano)
*/

app.post("/clientes", async (request, response) => {
  const meusDados = request.body;

  if (!meusDados.nome || typeof meusDados.nome !== "string") {
    response.status(400).send({ error: "Nome é obrigatório" });
  } else if (typeof meusDados.salario !== "number" || meusDados.salario < 0) {
    response
      .status(400)
      .send({ error: "Salario deve ser maior ou igual a 0 " });
  } else if (typeof meusDados.habilitacao !== "boolean") {
    response.status(400).send({ error: "A habilitacao deve ser true/false " });
  } else {
    const novoCliente = { id: db.data.contador_clientes++, ...meusDados };

    db.data.clientes.push(novoCliente);
    await db.write();

    response.status(201).send({ data: novoCliente });
  }
  // Fazer validação
});

app.listen(PORTA, () => {
  console.log("Servidor está rodando");
});
