document.addEventListener('DOMContentLoaded', () => {
    // Captura os elementos div dos cards, não os botões internos
    const btnAcessoMedico = document.getElementById('btnAcessoMedico');
    const btnAcessoPaciente = document.getElementById('btnAcessoPaciente');

    if (btnAcessoMedico) {
        btnAcessoMedico.addEventListener('click', () => {
            window.location.href = 'medico_login.html'; // Redireciona para o login do médico
        });
    }

    if (btnAcessoPaciente) {
        btnAcessoPaciente.addEventListener('click', () => {
            window.location.href = 'paciente_login.html'; // Redireciona para o login do paciente
        });
    }

    // (Opcional) Lógica para os botões de login no cabeçalho, se houver necessidade de manipulação extra
    document.querySelectorAll('.nav-main-menu .btn-small-primary, .nav-main-menu .btn-small-ghost').forEach(button => {
        button.addEventListener('click', (event) => {
            // O navegador já faz o redirecionamento pelo href, mas você pode adicionar um alert aqui para testes
            // alert(`Redirecionando pelo cabeçalho para ${event.currentTarget.href}`);
        });
    });
});