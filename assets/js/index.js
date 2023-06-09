$(document).ready(function () {

  var retorno = localStorage.getItem('retorno');
  var userid = retorno;

  
  if (retorno && retorno.userid != 'undefined') {
    $('#retorno-container').text(retorno);
  }else{
    localStorage.clear();
    window.location.href = 'login.html';
  }

  $.post("http://localhost:3000/transactions-busca", { userid: userid }, function (data) {
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


  $.post("http://localhost:3000/finances-busca", { userid: userid }, function (finances) {
    // Receitas
    var receitas = 0;
    for (var i = 0; i < finances.length; i++) {
      if (finances[i].value > 0) {
        receitas += finances[i].value;
      }
    }
    $("#receitas").text("R$ " + receitas.toFixed(2));

    $.post("http://localhost:3000/transactions-busca", { userid: userid }, function (transactions) {
      // Despesas
      var despesas = 0;
      for (var i = 0; i < transactions.length; i++) {
        despesas += Math.abs(transactions[i].value);
      }

      $("#despesas").text("R$ " + despesas.toFixed(2));

      // Saldo
      var saldo = receitas - despesas;
      $('#limite-utilizado').text("R$ " + despesas.toFixed(2));
      $("#saldo").text("R$ " + saldo.toFixed(2));
    });
  });



  $.post("http://localhost:3000/cartoes-busca", { userid: userid }, function (response) {
    if (response.success) {
      var cartoes = response.cartoes;
      var totalSaldo = 0;

      cartoes.forEach(function (cartao) {
        if (cartao.cardSaldo) {
          var saldo = parseFloat(cartao.cardSaldo);
          if (!isNaN(saldo)) {
            totalSaldo += saldo;
        }
        var dispensasSaldo = totalSaldo - despesas
      }
      });
     console.log(totalSaldo );
      $('#limite-total').text("R$ " + totalSaldo.toFixed(2));
      $('#limite-disponivel').text("R$ " + totalSaldo.toFixed(2));
    }
  });
});

