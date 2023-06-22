document.addEventListener('DOMContentLoaded', () => {
  const formMongo = document.querySelector('#transaction-form');
  const tableBody = document.querySelector('#transaction-table-body');
  var retorno = localStorage.getItem('retorno');

  formMongo.addEventListener('submit', async (event) => {
    event.preventDefault();

    const date = moment(event.target.elements['transaction-date'].value, 'YYYY-MM-DD').format('DD/MM/YYYY');
    const description = event.target.elements['transaction-description'].value;
    const value = event.target.elements['transaction-value'].value;
    const category = event.target.elements['transaction-category'].value;
    const cardTp = event.target.elements['tipos-cartao-dropdown'].value;
    const pagamento = event.target.elements['transaction-pag'].value;
    const userid = retorno

    try {
      const response = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, description, value, category, pagamento, cardTp, userid }),
      });

      if (response.ok) {
        formMongo.reset();
        formMongo.elements['transaction-date'].focus();
        updateTransactionList();
      } else {
        console.error('Erro ao adicionar transação:', response.status);
      }
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
    }
  });

  async function updateTransactionList() {
    try {
      var retorno = localStorage.getItem('retorno');
      const userid = retorno
      const response = await fetch('http://localhost:3000/transactions-busca', {
        method: 'POST',
        body: JSON.stringify({ userid }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const transactions = await response.json();
        console.log(response, transactions);

        // Ordenar as transações por data
        ordenarPorData(transactions);

        tableBody.innerHTML = '';

        transactions.forEach((transaction) => {
          const row = document.createElement('tr');

          const dateCell = document.createElement('td');
          dateCell.textContent = moment(transaction.date).format('DD/MM/YYYY');
          row.appendChild(dateCell);

          const descriptionCell = document.createElement('td');
          descriptionCell.textContent = transaction.description;
          row.appendChild(descriptionCell);

          const valueCell = document.createElement('td');
          valueCell.textContent = transaction.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          row.appendChild(valueCell);

          const categoryCell = document.createElement('td');
          categoryCell.textContent = transaction.category;
          row.appendChild(categoryCell);
          
          const pagamentoCell = document.createElement('td');
          pagamentoCell.textContent = transaction.pagamento;
          row.appendChild(pagamentoCell);

          const cardTpCell = document.createElement('td');
          cardTpCell.textContent = transaction.cardTp;
          row.appendChild(cardTpCell);

          tableBody.appendChild(row);
        });
      } else {
        console.error('Erro ao buscar transações:', response.status);
      }
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  }

  // Função para ordenar a lista por data
  function ordenarPorData(lista) {
    lista.sort(function(a, b) {
      var dataA = new Date(a.date);
      var dataB = new Date(b.date);
      return dataA - dataB;
    });
  }

  updateTransactionList();
});


$(document).ready(function () {
  var retorno = localStorage.getItem('retorno');
  var userid = retorno;

  $.post("http://localhost:3000/cartoes-busca", { userid: userid }, function (response) {
    if (response.success) {
      var cartoes = response.cartoes;
      var tiposCartao = [];

      // Extrair os tipos de cartão únicos
      cartoes.forEach(function (cartao) {
        console.log(cartao);
        var cardTp = cartao.cardTp;
        if (cardTp && !tiposCartao.includes(cardTp)) {
          tiposCartao.push(cardTp);
        }
      });

      // Gerar as opções do dropdown list
      var dropdownList = $('#tipos-cartao-dropdown');
      tiposCartao.forEach(function (tipo) {
        console.log(tipo);
        var option = $('<option></option>').text(tipo);
        dropdownList.append(option);
      });
    }
  });

  $('#cartao-container').hide();

  $('#transaction-pag').on('change', function() {
    var selectedOption = $(this).val();
    console.log(selectedOption);

    if (selectedOption === 'Cartão') {
      $('#cartao-container').show();
    } else {
      $('#cartao-container').hide();
    }
  });
});
