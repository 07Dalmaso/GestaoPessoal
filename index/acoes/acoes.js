var listaGastos = [];

function adicionarGasto() {
  var nome = document.getElementById("nome").value;
  var valor = parseFloat(document.getElementById("valor").value);

  if (!nome || isNaN(valor)) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  var gasto = {nome: nome, valor: valor};
  listaGastos.push(gasto);

  atualizarListaGastos();
}

function atualizarListaGastos() {
  var lista = document.getElementById("gastos");
  var total = 0;

  // Limpa a lista de gastos
  lista.innerHTML = "";

  // Adiciona cada gasto à lista
  listaGastos.forEach(function(gasto) {
    var item = document.createElement("li");
    item.innerText = gasto.nome + ": R$ " + gasto.valor.toFixed(2);
    lista.appendChild(item);

    // Soma o valor do gasto ao total
    total += gasto.valor;
  });

  // Exibe o total
  var totalElement = document.getElementById("total");
  totalElement.innerText = "Total: R$ " + total.toFixed(2);
}
