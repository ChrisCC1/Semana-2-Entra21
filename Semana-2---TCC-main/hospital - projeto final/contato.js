document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const assuntoInput = document.getElementById('assunto');
    const mensagemInput = document.getElementById('mensagem');

    const nomeError = document.getElementById('nomeError');
    const emailError = document.getElementById('emailError');
    const assuntoError = document.getElementById('assuntoError');
    const mensagemError = document.getElementById('mensagemError');

    // Função de validação genérica
    function validateField(inputElement, errorElement, message) {
        if (!inputElement.value.trim()) {
            errorElement.textContent = message;
            inputElement.classList.add('input-error'); // Adiciona classe para estilizar input com erro
            return false;
        }
        errorElement.textContent = '';
        inputElement.classList.remove('input-error');
        return true;
    }

    // Validação de e-mail específica
    function validateEmail(emailInputElement, errorElement, message) {
        const email = emailInputElement.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errorElement.textContent = 'O e-mail é obrigatório.';
            emailInputElement.classList.add('input-error');
            return false;
        }
        if (!emailRegex.test(email)) {
            errorElement.textContent = message;
            emailInputElement.classList.add('input-error');
            return false;
        }
        errorElement.textContent = '';
        emailInputElement.classList.remove('input-error');
        return true;
    }

    // Event Listeners para validação em tempo real (ao digitar)
    nomeInput.addEventListener('input', () => validateField(nomeInput, nomeError, 'O nome é obrigatório.'));
    emailInput.addEventListener('input', () => validateEmail(emailInput, emailError, 'Por favor, insira um e-mail válido.'));
    assuntoInput.addEventListener('input', () => validateField(assuntoInput, assuntoError, 'O assunto é obrigatório.'));
    mensagemInput.addEventListener('input', () => validateField(mensagemInput, mensagemError, 'A mensagem é obrigatória.'));

    // Event Listener para envio do formulário
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Realiza todas as validações no momento do submit
        const isNomeValid = validateField(nomeInput, nomeError, 'O nome é obrigatório.');
        const isEmailValid = validateEmail(emailInput, emailError, 'Por favor, insira um e-mail válido.');
        const isAssuntoValid = validateField(assuntoInput, assuntoError, 'O assunto é obrigatório.');
        const isMensagemValid = validateField(mensagemInput, mensagemError, 'A mensagem é obrigatória.');

        if (isNomeValid && isEmailValid && isAssuntoValid && isMensagemValid) {
            // Se todas as validações passarem, simula o envio
            alert('Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.');
            contactForm.reset(); // Limpa o formulário
            // Em um sistema real, aqui você enviaria os dados para um backend:
            // const formData = {
            //     nome: nomeInput.value.trim(),
            //     email: emailInput.value.trim(),
            //     assunto: assuntoInput.value.trim(),
            //     mensagem: mensagemInput.value.trim()
            // };
            // fetch('/api/send-contact-form', { method: 'POST', body: JSON.stringify(formData) })
            //     .then(response => response.json())
            //     .then(data => { /* Lida com a resposta do servidor */ });
        } else {
            alert('Por favor, preencha todos os campos corretamente para enviar a mensagem.');
        }
    });
});