import { useState } from "react";

function AppProdutos() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0);
  const [ativo, setAtivo] = useState(true);
  const [estoque, setEstoque] = useState(0);

  async function salvarProduto(e: React.SubmitEvent) {
    e.preventDefault();

    const resposta = await fetch("http://localhost:8888/produtos", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        preco: preco,
        ativo: ativo,
        estoque: estoque,
      }),
    });

    const dados = await resposta.json();
  }

  return (
    <div>
      <h1>Cadastro de produto</h1>
      <form onSubmit={salvarProduto}>
        <input
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="preco do produto"
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
        />
        <br />
        <input
          type="checkbox"
          checked={ativo}
          onChange={(e) => setAtivo(e.target.checked)}
        />{" "}
        Ativo ?
        <br />
        <input
          type="number"
          placeholder="QTd items"
          value={estoque}
          onChange={(e) => setEstoque(Number(e.target.value))}
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default AppProdutos;
