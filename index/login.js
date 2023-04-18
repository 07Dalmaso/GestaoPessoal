const form = document.querySelector('form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;
  
  const users = [
    { username: 'lucas', password: '1234' },
    { username: 'sabrina', password: '123' },
    { username: 'teste', password: '@123' }
  ];
  
  let userFound = false;
  
  for (let i = 0; i < users.length; i++) {
    if (username === users[i].username && password === users[i].password) {
      userFound = true;
      break;
    }
  }
  
  if (userFound) {
    window.location.href = 'index.html';
  } else {
    alert('Senha ou Usuário Inválido.');
  }
});

//   fetch('users.json')
//     .then(response => response.json())
//     .then(data => {
//       const users = data.users;
//       const username = usernameInput.value;
//       const password = passwordInput.value;
//       const user = users.find(user => user.username === username && user.password === password);
      
//       if (user) {
//         window.location.href = 'index.html';
//       } else {
//         alert('Senha ou Usuário Inválido.');
//       }
//     });



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

