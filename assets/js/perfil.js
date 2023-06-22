$(document).ready(function () {
	
	var retorno = localStorage.getItem('retorno');
	var userid = retorno;

	if (userid) {
		$('#retorno-container').text(userid);
	  }else{
		localStorage.clear();
		window.location.href = 'login.html';
	  }

	$.ajax({
	  url: 'http://localhost:3000/user-busca',
	  method: 'POST',
	  data: {
		userid: userid
	  },
	  success: function (response) {
		if (response.success) {
		  const user = response.user[0];
		  const perfil = document.getElementById("perfil");
			const perfilDiv = document.createElement("div");
			perfilDiv.classList.add("row");
			perfilDiv.innerHTML = `
			<form>
			<label for="nome">Nomes:</label>
			<input type="text" id="nome" name="nome" value="${user.name}" disabled>
			<label for="email">Email:</label>
			<input type="email" id="email" name="email" value="${user.email}" disabled>
			<label for="telefone">Telefone:</label>
			<input type="text" id="telefone" name="telefone" value="${user.telefone}" disabled>
			<label for="endereco">Endereço:</label>
			<input type="text" id="endereco" name="endereco" value="${user.endereco}" disabled>
			<button type="button" id="editar" onclick="editarPerfil()"> Editar Perfil</button>
			<button type="button" id="sair" onclick="logout()"> Sair </button>
			</form>
				  `;
			perfil.appendChild(perfilDiv);
		} else {
		  alert('Erro ao buscar cartões.');
		}
	  },
	  error: function () {
		alert('Ocorreu um erro ao processar a solicitação.');
	  }
	});
});


function logout() {
	localStorage.clear();
	window.location.href = 'login.html';
  }
  
  
  function editarPerfil() {
	window.location.href = 'edt_perfil.html';
  }


  
  
  
  