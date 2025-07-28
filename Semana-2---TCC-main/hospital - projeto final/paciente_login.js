document.addEventListener('DOMContentLoaded', () => {
    const pacienteLoginForm = document.getElementById('pacienteLoginForm');

    pacienteLoginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        let isValid = true;

        // Limpa mensagens de erro anteriores
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Validação do Identificador (E-mail ou CPF)
        const pacienteIdentificador = document.getElementById('pacienteIdentificador');
        if (pacienteIdentificador.value.trim() === '') {
            document.getElementById('pacienteIdentificadorError').textContent = 'O e-mail ou CPF é obrigatório.';
            isValid = false;
        }

        // Validação da Senha
        const pacienteSenha = document.getElementById('pacienteSenha');
        if (pacienteSenha.value.trim() === '') {
            document.getElementById('pacienteSenhaError').textContent = 'A senha é obrigatória.';
            isValid = false;
        }

        if (isValid) {
            // Em um sistema real, você enviaria estes dados para o backend para autenticação
            const identificador = pacienteIdentificador.value.trim();
            const senha = pacienteSenha.value.trim();

            alert('Tentativa de login como paciente!\n\n' +
                  'Identificador: ' + identificador + '\n' +
                  'Senha: ' + senha + '\n\n' +
                  '(Em um sistema real, o backend verificaria as credenciais)');
            
            // Simulação: Se o login fosse bem-sucedido, redirecionaria para a área do paciente
            // window.location.href = 'consultas.html'; // Redireciona para a página de consultas do paciente
        }
    });
});