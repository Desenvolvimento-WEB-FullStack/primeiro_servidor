import { useState } from "react";

function App2() {
  const [nomes, setNomes] = useState("");

  async function sortear(e) {
    e.preventDefault();

    const resposta = await fetch(
      "http://localhost:8888/sorteio?nomes=" + nomes,
    );
    const dados = await resposta.json();

    alert(dados.resultado);
  }

  return (
    <div>
      <h1>Rifa de nomes</h1>
      <form onSubmit={sortear}>
        <textarea
          value={nomes}
          onChange={(e) => setNomes(e.target.value)}
        ></textarea>
        <button type="submit">Sortear</button>
      </form>
    </div>
  );
}

export default App2;
