

$(document).ready(function() {
  $('#login-form').submit(function(event) {
    event.preventDefault();

    var username = $('#username').val();
    var password = $('#password').val();

    if (username.trim() === '' || password.trim() === '') {
      alert('Por favor, preencha o usuário e a senha.');
    } else {
      $.ajax({
        url: '/verificar-login',
        method: 'GET',
        data: {
          username: username,
          password: password
        },
        success: function(response) {
          if (response.success) {
            alert('Login realizado com sucesso!');
            // Redirecionar o usuário para outra página
            // window.location.href = 'outra_pagina.html';
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
