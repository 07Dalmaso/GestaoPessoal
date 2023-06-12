$(document).ready(function () {
    $.get("http://localhost:3000/transactions", function (data) {
      // Total de transações realizadas
      var totalTransacoes = data.length;
      $("#transacoes-realizadas").text(totalTransacoes);

      // Valor total das transações
      var valorTotal = 0;
      for (var i = 0; i < data.length; i++) {
        valorTotal += data[i].value;
      }
      $("#valor-total-transacoes").text("R$ " + valorTotal.toFixed(2));

      // Categoria mais gasta
      var categorias = {};
      var categoriaMaisGasta = "";
      var valorCategoriaMaisGasta = 0;

      for (var i = 0; i < data.length; i++) {
        var categoria = data[i].category;
        var valor = data[i].value;

        if (categoria in categorias) {
          categorias[categoria] += valor;
        } else {
          categorias[categoria] = valor;
        }

        if (categorias[categoria] > valorCategoriaMaisGasta) {
          categoriaMaisGasta = categoria;
          valorCategoriaMaisGasta = categorias[categoria];
        }
      }

      $("#categoria-mais-gasta").text(categoriaMaisGasta);
    });
  });