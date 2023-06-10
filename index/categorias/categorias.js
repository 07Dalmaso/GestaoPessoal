document.addEventListener('DOMContentLoaded', () => {
  const categoriasBody = document.querySelector('#categorias-body');

  async function fetchTransactionsByCategory() {
    try {
      const response = await fetch('http://localhost:3000/transactions');
      if (!response.ok) {
        throw new Error('Erro ao buscar transações');
      }
      const transactions = await response.json();

      const categorias = {};

      transactions.forEach((transaction) => {
        const { category, value } = transaction;
        if (categorias[category]) {
          categorias[category] += parseFloat(value);
        } else {
          categorias[category] = parseFloat(value);
        }
      });

      categoriasBody.innerHTML = '';

      for (const categoria in categorias) {
        const row = document.createElement('tr');
        const categoriaCell = document.createElement('td');
        categoriaCell.textContent = categoria;
        row.appendChild(categoriaCell);
        const valorCell = document.createElement('td');
        const formattedValue = categorias[categoria].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        valorCell.textContent = formattedValue;
        row.appendChild(valorCell);
        categoriasBody.appendChild(row);
      }
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  }

  fetchTransactionsByCategory();
});