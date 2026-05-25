function calcularImposto(valor) {
  const TAXA_IMPOSTO_SOBRE_VALOR = 0.175;
  const resultado = valor * TAXA_IMPOSTO_SOBRE_VALOR;
  return resultado;
}

const TAXA_IMPOSTO_SOBRE_VALOR = 0.175;
const calcularImpostoAnonimo = (valor) => valor * TAXA_IMPOSTO_SOBRE_VALOR;

console.log(calcularImpostoAnonimo(1576));

function calcularImpostoIsencao(valor) {
  const resultado = valor * TAXA_IMPOSTO_SOBRE_VALOR;
  if (valor > 2000) {
    return resultado;
  } else {
    return 0;
  }
}

const resultadoIsencao = calcularImpostoIsencao(1000);

if (resultadoIsencao === 0) {
  console.log("Tem isenção");
} else {
  console.log("O imposto a pagar é" + resultadoIsencao);
}
