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


$(document).ready(function () {
  $.get("http://localhost:3000/finances", function (finances) {
    // Receitas
    var receitas = 0;
    for (var i = 0; i < finances.length; i++) {
      if (finances[i].value > 0) {
        receitas += finances[i].value;
      }
    }
    $("#receitas").text("R$ " + receitas.toFixed(2));

    $.get("http://localhost:3000/transactions", function (transactions) {
      // Despesas
      var despesas = 0;
      for (var i = 0; i < transactions.length; i++) {
        despesas += Math.abs(transactions[i].value);
      }

      $("#despesas").text("R$ " + despesas.toFixed(2));

      // Saldo
      var saldo = receitas - despesas;
      $("#saldo").text("R$ " + saldo.toFixed(2));
    });
  });
});


$(document).ready(function () {
  $.get("http://localhost:3000/cartoes", function (response) {
    if (response.success) {
      var cartoes = response.cartoes;
      var totalSaldo = 0;

      cartoes.forEach(function (cartao) {
        if (cartao.cardSaldo) {
          var saldo = parseFloat(cartao.cardSaldo);
          if (!isNaN(saldo)) {
            totalSaldo += saldo;
        }
      }
      });
      $('#limite-total').text("R$ " + totalSaldo);
      $('#limite-utilizado').text("R$ " + totalSaldo);
      $('#limite-disponivel').text("R$ " + totalSaldo);
    }
  });
});
