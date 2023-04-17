const form = document.querySelector('form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  fetch('users.json')
    .then(response => response.json())
    .then(data => {
      const users = data.users;
      const username = usernameInput.value;
      const password = passwordInput.value;
      const user = users.find(user => user.username === username && user.password === password);
      
      if (user) {
        alert('Login successful!');
        window.location.href = 'index.html';
      } else {
        alert('Invalid username or password.');
      }
    });
});


// função para exibir ou ocultar a senha
function togglePasswordVisibility() {
    var passwordInput = document.getElementById('password');
    var showPasswordCheckbox = document.getElementById('show-password');
    
    if (showPasswordCheckbox.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// recupera o objeto JSON de contas usando fetch()
fetch('users.json')
  .then(response => response.json())
  .then(data => {
    accounts = data;
  });

// variável para armazenar as contas
var accounts = [];

// função para exibir o formulário de adicionar conta
function showAddAccountForm() {
  document.getElementById('add-account-form').style.display = 'block';
}

// função para ocultar o formulário de adicionar conta
function hideAddAccountForm() {
  document.getElementById('add-account-form').style.display = 'none';
}

// função para adicionar uma nova conta
function addNewAccount(event) {
  event.preventDefault(); // evita o comportamento padrão do formulário

  // recupera o usuário e senha digitados no formulário
  var newUsername = document.getElementById('new-username').value;
  var newPassword = document.getElementById('new-password').value;

  // adiciona a nova conta ao objeto JSON
  accounts.users.push({ username: newUsername, password: newPassword });

  // salva o objeto JSON em um arquivo
  var data = JSON.stringify(accounts);
  console.log(data);
  var url = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
  console.log(url);
  var downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', url);
  downloadAnchor.setAttribute('download', 'users.json');
  downloadAnchor.click();
  console.log(downloadAnchor);  

  // exibe uma mensagem de sucesso
  alert('Conta adicionada com sucesso!');

  // esconde o formulário de adicionar conta
  hideAddAccountForm();
}

// adiciona um evento de submit para o formulário de adicionar conta
document.getElementById('new-account-form').addEventListener('submit', addNewAccount);
b