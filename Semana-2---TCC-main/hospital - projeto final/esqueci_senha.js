document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');

    forgotPasswordForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        let isValid = true;

        // Limpa mensagens de erro anteriores
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Validação do E-mail
        const emailRecuperacao = document.getElementById('emailRecuperacao');
        if (emailRecuperacao.value.trim() === '') {
            document.getElementById('emailRecuperacaoError').textContent = 'O e-mail é obrigatório.';
            isValid = false;
        } else if (!isValidEmail(emailRecuperacao.value.trim())) {
            document.getElementById('emailRecuperacaoError').textContent = 'Por favor, insira um e-mail válido.';
            isValid = false;
        }

        if (isValid) {
            // Em um sistema real, você enviaria este e-mail para o backend para processar a recuperação
            const email = emailRecuperacao.value.trim();

            alert('Instruções de recuperação de senha enviadas para: ' + email + '\n\n' +
                  '(Em um sistema real, um e-mail com um link de redefinição seria enviado.)');
            
            // Opcional: Redirecionar para a página de login após o "envio"
            // window.location.href = 'index.html'; 
        }
    });

    // Função para validar formato de e-mail (reutilizada do script.js, mas aqui para ser autossuficiente)
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});