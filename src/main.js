import express from "express";

// criar váriavel pra receber o express
const app = express();
const PORTA_APP = 8888;

app.get("/bem_vindo", (request, response) => {
  response.send({ adocoes: 1000, familias: 200 });
});

app.listen(PORTA_APP, () => console.log(" 🚀🚀🚀 Servidor rodando"));

// GET POST DELETE PUT
// path
