$(document).ready(function() {
  $('#login-form').submit(function(event) {
    event.preventDefault();

    var username = $('#username').val();
    var password = $('#password').val();
    console.log(username, password);

    if (username.trim() === '' || password.trim() === '') {
      alert('Por favor, preencha o usuário e a senha.');
    } else {
      $.ajax({
        url: 'http://localhost:3000/verificar-login',
        method: 'POST',
        data: {
          username: username,
          password: password
        },
        success: function(response) {
          console.log(response.retorno);
          if (response.success) {
            alert('Login realizado com sucesso!');
            localStorage.setItem('retorno', response.retorno);
            window.location.href = 'index.html'; 
          } else {
            alert('Usuário ou senha inválidos.');
          }
        },
        error: function() {
          alert('Ocorreu um erro ao processar a solicitação.');
        }
      });
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

function showAddAccountForm() {
url = 'cadastro.html';
window.location.href = url;
}


function hideAddAccountForm() {
var addAccountForm = document.getElementById("add-account-form");
addAccountForm.style.display = "none";
}

