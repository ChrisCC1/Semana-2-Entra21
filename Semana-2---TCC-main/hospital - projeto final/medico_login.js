document.addEventListener('DOMContentLoaded', () => {
    const medicoLoginForm = document.getElementById('medicoLoginForm');

    medicoLoginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        let isValid = true;

        // Limpa mensagens de erro anteriores
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Validação do Identificador (E-mail ou CRM)
        const medicoIdentificador = document.getElementById('medicoIdentificador');
        if (medicoIdentificador.value.trim() === '') {
            document.getElementById('medicoIdentificadorError').textContent = 'O e-mail ou CRM é obrigatório.';
            isValid = false;
        }

        // Validação da Senha
        const medicoSenha = document.getElementById('medicoSenha');
        if (medicoSenha.value.trim() === '') {
            document.getElementById('medicoSenhaError').textContent = 'A senha é obrigatória.';
            isValid = false;
        }

        if (isValid) {
            // Em um sistema real, você enviaria estes dados para o backend para autenticação
            const identificador = medicoIdentificador.value.trim();
            const senha = medicoSenha.value.trim();

            alert('Tentativa de login como médico!\n\n' +
                  'Identificador: ' + identificador + '\n' +
                  'Senha: ' + senha + '\n\n' +
                  '(Em um sistema real, o backend verificaria as credenciais)');
            
            // Simulação: Se o login fosse bem-sucedido, redirecionaria para a área do médico
            // window.location.href = 'medico_dashboard.html'; // Página que criaremos depois
        }
    });
});