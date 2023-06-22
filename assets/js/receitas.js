document.addEventListener('DOMContentLoaded', () => {
  const formMongo = document.querySelector('#finance-form');
  const tableBody = document.querySelector('#finance-table-body');
  var retorno = localStorage.getItem('retorno');

  formMongo.addEventListener('submit', async (event) => {
    event.preventDefault();

    const date = moment(event.target.elements['finance-date'].value, 'YYYY-MM-DD').format('DD/MM/YYYY');
    const description = event.target.elements['finance-description'].value;
    const value = event.target.elements['finance-value'].value;
    const userid = retorno
    try {
      const response = await fetch('http://localhost:3000/finances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, description, value, userid }),
      });

      if (response.ok) {
        formMongo.reset();
        formMongo.elements['finance-date'].focus();
        updateFinanceList();
      } else {
        console.error('Erro ao adicionar receita:', response.status);
      }
    } catch (error) {
      console.error('Erro ao adicionar receita:', error);
    }
  });

  async function updateFinanceList() {
    var userid = localStorage.getItem('retorno');
    try {
      const response = await fetch('http://localhost:3000/finances-busca',
      {
        method: 'POST',
        body: JSON.stringify({ userid }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const finances = await response.json();

        // Ordenar as receitas por data
        ordenarPorData(finances);

        tableBody.innerHTML = '';

        finances.forEach((finance) => {
          const row = document.createElement('tr');

          const dateCell = document.createElement('td');
          dateCell.textContent = moment(finance.date).format('DD/MM/YYYY');
          row.appendChild(dateCell);

          const descriptionCell = document.createElement('td');
          descriptionCell.textContent = finance.description;
          row.appendChild(descriptionCell);

          const valueCell = document.createElement('td');
          valueCell.textContent = finance.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          row.appendChild(valueCell);

          tableBody.appendChild(row);
        });
      } else {
        console.error('Erro ao buscar receitas:', response.status);
      }
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
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

  updateFinanceList();
});
