function salvarPerfil() {
	// Obter os valores dos campos de formulário
	var nome = document.getElementById("nome").value;
	var email = document.getElementById("email").value;
	var telefone = document.getElementById("telefone").value;
	var endereco = document.getElementById("endereco").value;

	// Salvar os valores em localStorage
	localStorage.setItem("nome", nome);
	localStorage.setItem("email", email);
	localStorage.setItem("telefone", telefone);
	localStorage.setItem("endereco", endereco);

	// Exibir mensagem de sucesso
	var mensagem = document.getElementById("mensagem");
	mensagem.innerHTML = "Perfil salvo com sucesso!";
}
