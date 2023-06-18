$(document).ready(function () {

  $('#cartao-form').submit(function (event) {
    event.preventDefault();

    // Obter os dados do cartão do formulário
    var cardType = $('#card-type-input').val();
    var cardNumber = $('#card-number-input').val();
    var cardName = $('#card-name-input').val();
    var cardExpiry = $('#card-expiry-input').val();
    var cardCVV = $('#card-cvv-input').val();
    var cardSaldo = $('#card-saldo-input').val();
    var cardTp = $('#card-tp-input').val();

    console.log(cardType, cardNumber, cardName, cardExpiry, cardCVV, cardSaldo, cardTp);

    $.ajax({
      url: 'http://localhost:3000/cartoes',
      method: 'POST',
      data: {
        cardType: cardType,
        cardNumber: cardNumber,
        cardName: cardName,
        cardExpiry: cardExpiry,
        cardCVV: cardCVV,
        cardSaldo: cardSaldo,
        cardTp: cardTp
      },
      success: function (response) {
        if (response.success) {
          alert('Cartão adicionado com sucesso!');
          window.location.href ='cartoes.html';
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


$(document).ready(function () {
  usarDadosDosCartoes();

  const campo1 = $('#card-number-span-test');
  const campo2 = $('#card-number-input');
  const campoNmInput = $('#card-name-input');
  const cardNameDiv = $('#card-name');
  const campoExpiryInput = $('#card-expiry-input');
  const cardExpiryDiv = $('#card-expiry');
  const campoCvvInput = $('#card-cvv-input');
  const cardCvvDiv = $('#card-cvv');
  const campoTypeInput = $('#card-type-input');
  const cardTypeDiv = $('#card-type');

  campo2.on('input', function () {
    campo1.val(campo2.val());
  });

  campoNmInput.on('input', function () {
    cardNameDiv.text(campoNmInput.val());
  });

  campoExpiryInput.on('input', function () {
    cardExpiryDiv.text(campoExpiryInput.val());
  });

  campoCvvInput.on('input', function () {
    cardCvvDiv.text(campoCvvInput.val());
  });

  campoTypeInput.on('input', function () {
    cardTypeDiv.text(campoTypeInput.val());
  });

  const cardExpiryInput = $('#card-expiry-input');
  cardExpiryInput.inputmask('99/99');

});

async function usarDadosDosCartoes() {
  $.ajax({
    url: 'http://localhost:3000/cartoes',
    method: 'GET',
    success: function (response) {
      console.log('aqui', response);
      if (response.success) {
        const cartoes = response.cartoes;
        const cardContainer = document.getElementById("card-container");
        cartoes.forEach((cartao, index) => {
          const cardDiv = document.createElement("div");
          cardDiv.classList.add("row");
          cardDiv.innerHTML = `
                    <div class="card">
                        <div class="card-front">
                            <div class="card-type"><i class="fab fa-cc-visa"></i> ${cartao.cardType}</div>
                            <div class="card-number">
                                <span>****</span>
                                <span>****</span>
                                <span>****</span>
                                <span>${cartao.cardNumber}</span>
                            </div>
                            <div class="card-name">${cartao.cardName}</div>
                            <div class="card-expiry">${cartao.cardExpiry}</div>
                        </div>
                        <div class="card-back">
                            <div class="card-cvv">${cartao.cardCVV}</div>
                        </div>
                    </div>
                    <br><br>
                    <div class="card-limit">Limite de crédito: R$ ${cartao.cardSaldo}</span>
                    </div>
                    <div class="card-limit">Nome do cartão: ${cartao.cardTp}</span>
                    </div>
                `;
          cardContainer.appendChild(cardDiv);
        });
      } else {
        alert('Erro ao buscar cartões.');
      }
    },
    error: function () {
      alert('Ocorreu um erro ao processar a solicitação.');
    }
  });
}

function addCard(){
  window.location.href = "add_cartoes.html";
};





