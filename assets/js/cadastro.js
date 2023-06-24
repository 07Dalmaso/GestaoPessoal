document.addEventListener('DOMContentLoaded', () => {
    const formMongo = document.querySelector('#cadastro');

    formMongo.addEventListener('submit', async (event) => {
        event.preventDefault();


        const password = document.getElementById('new-password').value;
        const name = document.getElementById('new-username').value;
        const email = document.getElementById('new-email').value;
        const endereco = document.getElementById('new-endereco').value;
        const telefone = document.getElementById('new-numero').value;
        const fileInput = document.getElementById('profile-image');
        const fileInput2 = document.getElementById('profile-image').value;
        const imageFile = fileInput.files[0];


        const formData = new FormData();
        formData.append('password', password);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('endereco', endereco);
        formData.append('telefone', telefone);
        formData.append('imageFile', imageFile);

        try {
            const response = await fetch('http://localhost:3000/user', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const responseData = await response.json();
                const redirectUrl = responseData.redirectUrl;
                window.location.replace(redirectUrl);
            } else {
                console.error('Erro ao adicionar Usuario:', response.status);
            }
        } catch (error) {
            console.error('Erro ao adicionar Usuario:', error);
        }
    });
});