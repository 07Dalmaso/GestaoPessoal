var firebaseConfig = {
  apiKey: "AIzaSyBTfelcQpbRMa49SWRcZ98MPsZa00k1jyg",
  authDomain: "tecweb-63df8.firebaseapp.com",
  databaseURL: "https://tecweb-63df8-default-rtdb.firebaseio.com",
  projectId: "tecweb-63df8",
  storageBucket: "tecweb-63df8.appspot.com",
  messagingSenderId: "599740366986",
  appId: "1:599740366986:web:0b25c591837d3a253ead73"
};

firebase.initializeApp(firebaseConfig);

// Obtenha uma referência para o banco de dados
var database = firebase.database();

// Obtenha referências para os elementos do formulário
var form = document.querySelector('form');
var tableBody = document.querySelector('#transaction-table-body');

// Adicione um evento de envio ao formulário
form.addEventListener('submit', function(event) {
  event.preventDefault();

  var date = event.target.elements['transaction-date'].value;
  var description = event.target.elements['transaction-description'].value;
  var value = event.target.elements['transaction-value'].value;
  var category = event.target.elements['transaction-category'].value;

  // Crie um objeto com os dados da transação
  var transactionData = {
    date: date,
    description: description,
    value: value,
    category: category
  };

  // Envie os dados para o banco de dados
  database.ref('transactions').push(transactionData);

  form.reset();
  form.elements['transaction-date'].focus();
});

// Crie uma função para renderizar as transações no HTML
function renderTransactions(transactions) {
  tableBody.innerHTML = '';

  for (var key in transactions) {
    var transaction = transactions[key];

    var row = tableBody.insertRow();
    var dateCell = row.insertCell();
    var descriptionCell = row.insertCell();
    var valueCell = row.insertCell();
    var categoryCell = row.insertCell();

    dateCell.textContent = transaction.date;
    descriptionCell.textContent = transaction.description;
    valueCell.textContent = transaction.value;
    categoryCell.textContent = transaction.category;
  }
}

// Obtenha as transações do banco de dados e atualize a tabela
database.ref('transactions').on('value', function(snapshot) {
  var transactions = snapshot.val();
  renderTransactions(transactions);
});