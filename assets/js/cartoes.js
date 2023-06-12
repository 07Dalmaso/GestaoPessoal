
// function atualizarSaldo() {

//   var slider = document.getElementById("saldo");
//   var saldo = document.getElementById("saldoAtual");
//   saldo.innerHTML = 'R$ ' + " " + slider.value;

// }

// atualizarSaldo();

// function atualizarSaldo1() {

//   var slider = document.getElementById("saldo1");
//   var saldo = document.getElementById("saldoAtual1");
//   saldo.innerHTML = 'R$ ' + " " + slider.value;

// }

// atualizarSaldo1();

// function atualizarSaldo2() {

//   var slider = document.getElementById("saldo2");
//   var saldo = document.getElementById("saldoAtual2");
//   saldo.innerHTML = 'R$ ' + " " + slider.value;

// }

// atualizarSaldo2();

$(document).ready(function () {
  $('#cartao-form').submit(function (event) {
    event.preventDefault();

    // Obter os dados do cartão do formulário
    var cardType = $('#card-type').val();
    var cardNumber = $('#card-number').val();
    var cardName = $('#card-name').val();
    var cardExpiry = $('#card-expiry').val();
    var cardCVV = $('#card-cvv').val();

    // Enviar os dados do cartão para o servidor
    $.ajax({
      url: 'http://localhost:3000/cartoes',
      method: 'POST',
      data: {
        cardType: cardType,
        cardNumber: cardNumber,
        cardName: cardName,
        cardExpiry: cardExpiry,
        cardCVV: cardCVV
      },
      success: function (response) {
        if (response.success) {
          alert('Cartão adicionado com sucesso!');
          // Faça o que for necessário após adicionar o cartão
        } else {
          alert('Erro ao adicionar cartão.');
        }
      },
      error: function () {
        alert('Ocorreu um erro ao processar a solicitação.');
      }
    });
  });
});






