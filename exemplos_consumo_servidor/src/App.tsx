import { useState } from "react";

function App() {
  const [mensagem, setMensagem] = useState("");

  async function pegarMensagem() {
    const resposta = await fetch("http://localhost:8888/mensagem");
    const dados = await resposta.json();

    setMensagem(dados.mensagem);
  }

  return (
    <div>
      <h1>Mensagem do dia</h1>
      <button onClick={pegarMensagem}>Gerar mensagem</button>
      {mensagem}
    </div>
  );
}

export default App;
