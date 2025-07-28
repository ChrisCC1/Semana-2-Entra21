document.addEventListener('DOMContentLoaded', () => {
    // Simula um atraso antes de redirecionar para dar tempo de ler a mensagem
    // Em um sistema real, o logout no backend ocorreria aqui antes do redirecionamento
    setTimeout(() => {
        // Redireciona para a página inicial (ou de login)
        window.location.href = 'index.html'; // Ou 'paciente_login.html' para ir direto para o login
    }, 3000); // Redireciona após 3 segundos
});