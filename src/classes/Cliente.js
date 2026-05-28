import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

class Cliente {
  constructor(nome, salario, habilitacao) {
    this.nome = nome;
    this.salario = salario;
    this.habilitacao = habilitacao;
  }

  async criar() {
    const adapter = new JSONFile("db_clientes.json");
    const db = new Low(adapter, { clientes: [], contador_clientes: 1 });
    await db.read();

    db.data.clientes.push({
      id: db.data.contador_clientes++,
      nome: this.nome,
      salario: this.salario,
      habilitacao: this.habilitacao,
    });

    await db.write();
  }
}

export default Cliente;
