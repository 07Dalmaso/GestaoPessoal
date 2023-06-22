let chart;

async function loadChartData(year) {
  var retorno = localStorage.getItem('retorno');
  var userid = retorno;
  try {
    const financesResponse = await axios.get('http://localhost:3000/finances-busca', {userid: userid});
    const transactionsResponse = await axios.post('http://localhost:3000/transactions-busca', { userid: userid });

    const finances = financesResponse.data;
    const transactions = transactionsResponse.data;

    const filteredFinances = finances.filter(finance => {
      const financeYear = moment(finance.date).year();
      return financeYear === year;
    });

    const filteredTransactions = transactions.filter(transaction => {
      const transactionYear = moment(transaction.date).year();
      return transactionYear === year;
    });

    const data = [];
    for (let month = 1; month <= 12; month++) {
      const monthFinances = filteredFinances.filter(finance => {
        const financeMonth = moment(finance.date).get('month') + 1;
        return financeMonth === month;
      });

      const monthTransactions = filteredTransactions.filter(transaction => {
        const transactionMonth = moment(transaction.date).get('month') + 1;
        return transactionMonth === month;
      });

      const totalRevenue = monthFinances.reduce((sum, finance) => sum + finance.value, 0);
      const totalExpenses = monthTransactions.reduce((sum, transaction) => sum + transaction.value, 0);

      data.push({
        month: moment().month(month - 1).locale('pt-br').format('MMMM').charAt(0).toUpperCase() + moment().month(month - 1).locale('pt-br').format('MMMM').slice(1),
        revenue: totalRevenue,
        expenses: totalExpenses
      });
    }

    const options = {
      chart: {
        type: 'bar',
        height: '500px' // Ajuste a altura do gráfico conforme necessário
      },
      series: [{
        name: 'Receitas',
        data: data.map(item => item.revenue)
      }, {
        name: 'Despesas',
        data: data.map(item => item.expenses)
      }],
      xaxis: {
        categories: data.map(item => item.month)
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return Math.abs(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          }
        }
      }
    };

    if (chart) {
      chart.updateOptions(options);
    } else {
      chart = new ApexCharts(document.querySelector('#chart'), options);
      chart.render();
    }
  } catch (error) {
    console.error('Erro ao carregar dados do gráfico:', error);
  }
}

async function updateYearSelect() {
  const yearSelect = document.querySelector('#year-select');
  const currentYear = moment().year();
  yearSelect.value = currentYear;
  await loadChartData(currentYear);
}

async function updateChart() {
  const yearSelect = document.querySelector('#year-select');
  const selectedYear = parseInt(yearSelect.value);
  await loadChartData(selectedYear);
}

document.addEventListener('DOMContentLoaded', updateYearSelect);
const yearSelect = document.querySelector('#year-select');
yearSelect.addEventListener('change', updateChart);
