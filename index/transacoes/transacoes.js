document.addEventListener('DOMContentLoaded', () => {
  const formMongo = document.querySelector('#transaction-form');
  const tableBody = document.querySelector('#transaction-table-body');

  formMongo.addEventListener('submit', async (event) => {
    event.preventDefault();

    const date = event.target.elements['transaction-date'].value;
    const description = event.target.elements['transaction-description'].value;
    const value = event.target.elements['transaction-value'].value;
    const category = event.target.elements['transaction-category'].value;

    try {
      const response = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, description, value, category }),
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
      const response = await fetch('http://localhost:3000/transactions');

      if (response.ok) {
        const transactions = await response.json();

        tableBody.innerHTML = '';

        transactions.forEach((transaction) => {
          const row = document.createElement('tr');

          const dateCell = document.createElement('td');
          dateCell.textContent = transaction.date;
          row.appendChild(dateCell);

          const descriptionCell = document.createElement('td');
          descriptionCell.textContent = transaction.description;
          row.appendChild(descriptionCell);

          const valueCell = document.createElement('td');
          valueCell.textContent = transaction.value;
          row.appendChild(valueCell);

          const categoryCell = document.createElement('td');
          categoryCell.textContent = transaction.category;
          row.appendChild(categoryCell);

          tableBody.appendChild(row);
        });
      } else {
        console.error('Erro ao buscar transações:', response.status);
      }
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  }

  updateTransactionList();
});