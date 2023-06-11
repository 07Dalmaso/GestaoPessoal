document.addEventListener('DOMContentLoaded', () => {
  const categoriasBody = document.querySelector('#categorias-body');
  const selectCategoria = document.querySelector('#select-categoria');
  const transacoesTable = document.querySelector('#transacoes-categoria tbody');

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
        const formattedValue = categorias[categoria].toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        valorCell.textContent = formattedValue;
        row.appendChild(valorCell);
        categoriasBody.appendChild(row);
      }

      selectCategoria.innerHTML = '<option value="">Selecione uma categoria</option>';
      for (const categoria in categorias) {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        selectCategoria.appendChild(option);
      }

      selectCategoria.addEventListener('change', () => {
        const categoriaSelecionada = selectCategoria.value;
        const transacoesFiltradas = transactions.filter(
          (transaction) => transaction.category === categoriaSelecionada
        );

        transacoesTable.innerHTML = '';

        if (transacoesFiltradas.length > 0) {
          transacoesFiltradas.forEach((transaction) => {
            const row = document.createElement('tr');
            const dataCell = document.createElement('td');
            const descricaoCell = document.createElement('td');
            const valorCell = document.createElement('td');

            dataCell.textContent = moment(transaction.date).format('DD/MM/YYYY');
            descricaoCell.textContent = transaction.description;
            valorCell.textContent = transaction.value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            });

            row.appendChild(dataCell);
            row.appendChild(descricaoCell);
            row.appendChild(valorCell);
            transacoesTable.appendChild(row);
          });
        } else {
          const row = document.createElement('tr');
          const noDataCell = document.createElement('td');
          noDataCell.setAttribute('colspan', '3');
          noDataCell.textContent = 'Nenhuma transação encontrada para essa categoria.';
          row.appendChild(noDataCell);
          transacoesTable.appendChild(row);
        }
      });
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  }

  fetchTransactionsByCategory();
});
