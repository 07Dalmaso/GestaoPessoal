$(document).ready(function () {

    var retorno = localStorage.getItem('retorno');
    var userid = retorno;

    if (userid) {
        $('#retorno-container').text(userid);
    } else {
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
                const perfil = document.getElementById("perfil-editar");
                const perfilDiv = document.createElement("div");
                perfilDiv.classList.add("row");
                perfilDiv.innerHTML = `
			<form>
			<label for="nome">Nomes:</label>
			<input type="text" id="nome" name="nome" value="${user.name}" >
			<label for="email">Email:</label>
			<input type="email" id="email" name="email" value="${user.email}" >
			<label for="telefone">Telefone:</label>
			<input type="text" id="telefone" name="telefone" value="${user.telefone}">
			<label for="endereco">Endereço:</label>
			<input type="text" id="endereco" name="endereco" value="${user.endereco}">
			<button type="button" id="salvar-perfil" onclick="salvarPerfil()"> Salvar Perfil</button>
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

function salvarPerfil() {

    var retorno = localStorage.getItem('retorno');
    var userid = retorno;
    var name = $('#nome').val();
    var email = $('#email').val();
    var telefone = $('#telefone').val();
    var endereco = $('#endereco').val();

    $.ajax({
        url: 'http://localhost:3000/user-editar',
        method: 'POST',
        data: {
            userid: userid,
            name: name,
            email: email,
            telefone: telefone,
            endereco: endereco
        },
        success: function (response) {
            if (response.success) {
                alert('Perfil salvo com sucesso.');
                window.location.href = 'perfil.html';
            } else {
                alert('Erro ao editar perfil');
            }
        },
        error: function () {
            alert('Ocorreu um erro ao processar a solicitação.');
        }
    });
}