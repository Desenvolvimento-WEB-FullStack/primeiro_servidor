import express from "express";
import cors from "cors";

import Cliente from "./classes/Cliente.js";
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
    const cliente = new Cliente(
      meusDados.nome,
      meusDados.salario,
      meusDados.habilitacao,
    );

    cliente.criar();

    response.status(201).send({ data: {} });
  }
});

app.get("/clientes", (request, response) => {
  const clientes_atuais = db.data.clientes;
  response.send(clientes_atuais);
});

app.get("/clientes/:id", (request, response) => {
  const idCliente = Number(request.params.id);
  const clientes = db.data.clientes;

  cliente.buscar(idCliente);

  const clienteEncontrado = clientes.find(
    (cliente) => cliente.id === idCliente,
  );

  if (!clienteEncontrado) {
    response.status(404).send({ error: "Cliente nao encontrado na base" });
  } else {
    response.send(clienteEncontrado);
  }
});

/*
  MANEIRA NAO OTIMIZADA
  let clienteEncontrado = null;
 
  clientes.forEach((cliente) => {
    if (cliente.id === idCliente) {
      clienteEncontrado = cliente;
    }
  });
  response.send(clienteEncontrado);
  */

app.delete("/clientes/:id", async (request, response) => {
  const idCliente = Number(request.params.id);

  const clienteEncontrado = db.data.clientes.some(
    (cliente) => cliente.id === idCliente,
  );

  if (!clienteEncontrado) {
    response.status(404).send({ error: "Cliente nao encontrado" });
  } else {
    const clientesFiltrados = db.data.clientes.filter(
      (cliente) => cliente.id !== idCliente,
    );

    db.data.clientes = clientesFiltrados;

    await db.write();

    // response.send({ mensagem: "Deletado com sucesso" });
    response.status(204).send();
  }
});

app.put("/clientes/:id", async (request, response) => {
  // Captura dados do body e da rota
  const idCliente = Number(request.params.id);
  const dadosNoBody = request.body;

  /* ETAPA  1 - VALIDICACAO */

  // validação: se o campo `nome` foi enviado, então deve ser string não vazia
  if (
    dadosNoBody.nome !== undefined &&
    (typeof dadosNoBody.nome !== "string" || dadosNoBody.nome.trim() === "")
  ) {
    response.status(400).send({ error: "Nome nao deve ser vazio" });
    return;
  }

  // validação: se o campo `salario` foi enviado
  if (
    dadosNoBody.salario !== undefined &&
    (typeof dadosNoBody.salario !== "number" || dadosNoBody.salario < 0)
  ) {
    response.status(400).send({ error: "salario deve ser maior que 0" });
    return;
  }

  // validação: se o campo `habilitacao` foi enviado
  if (
    dadosNoBody.habilitacao !== undefined &&
    typeof dadosNoBody.habilitacao !== "boolean"
  ) {
    response.status(400).send({ error: "A habilitacao deve ser um booleano" });
    return;
  }

  const clienteEncontrado = db.data.clientes.some(
    (cliente) => cliente.id === idCliente,
  );

  if (!clienteEncontrado) {
    response.status(404).send({ error: "Cliente nao encontrado" });
  } else {
    // ETAPA 2 - MAPEAMENTO
    const clientesAlterados = db.data.clientes.map((cliente) => {
      if (cliente.id === idCliente) {
        if (dadosNoBody.nome !== undefined) {
          cliente.nome = dadosNoBody.nome;
        }

        if (dadosNoBody.salario !== undefined) {
          cliente.salario = dadosNoBody.salario;
        }

        if (dadosNoBody.habilitacao !== undefined) {
          cliente.habilitacao = dadosNoBody.habilitacao;
        }
      }
      return cliente;
    });

    // ETAPA 3 - PERSISTENCIA
    db.data.clientes = clientesAlterados;
    await db.write();

    response.send({ mensagem: "atualizado com sucesso " });
  }
  /*FIM DA VALIDACAO */
});

app.get("/sorteio", (request, response) => {
  const nomesRecebidos = request.query.nomes.split(",");

  const tamanhoDoArray = nomesRecebidos.length;
  const posicaoNoArray = Math.random() * tamanhoDoArray;
  const posicaoNoArrayArrendondada = Math.trunc(posicaoNoArray);

  const cliente = new Cliente(
    nomesRecebidos[posicaoNoArrayArrendondada],
    0,
    false,
  );

  cliente.criar();

  response.send({ resultado: nomesRecebidos[posicaoNoArrayArrendondada] });
});

app.listen(PORTA, () => {
  console.log("Servidor está rodando");
});
