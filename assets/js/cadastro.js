document.addEventListener('DOMContentLoaded', () => {
    const formMongo = document.querySelector('#cadastro');

    formMongo.addEventListener('submit', async (event) => {
        event.preventDefault();


        const password = document.getElementById('new-password').value;
        const name = document.getElementById('new-username').value;
        const email = document.getElementById('new-email').value;
        const endereco = document.getElementById('new-endereco').value;
        const telefone = document.getElementById('new-numero').value;

        try {
            const response = await fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, name, email, endereco, telefone }),
            });

            if (response.ok) {
                url = 'index.html';
                window.location.href = url;
            } else {
                console.error('Erro ao adicionar Usuario:', response.status);
            }
        } catch (error) {
            console.error('Erro ao adicionar Usuario:', error);
        }
    });
});