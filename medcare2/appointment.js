document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Ícone de 'X' quando o menu está aberto
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // Ícone de hambúrguer quando o menu está fechado
            }
        });

        // Fechar o menu ao clicar em um link (para mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // Lógica para o formulário de agendamento (apenas para demonstração)
    const appointmentForm = document.querySelector('.appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Captura alguns dados do formulário para o alerta
            const firstName = document.getElementById('firstName').value;
            const specialty = document.getElementById('specialty').value;
            const preferredDate = document.getElementById('preferredDate').value;
            const preferredTime = document.getElementById('preferredTime').value;

            // Em um ambiente real, você enviaria esses dados para um servidor aqui
            alert(`Solicitação de agendamento enviada com sucesso, ${firstName}! \n\nEspecialidade: ${specialty}\nData Preferencial: ${preferredDate}\nHorário Preferencial: ${preferredTime}\n\nNossa equipe entrará em contato em breve para confirmar.`);

            // Limpa o formulário após o envio
            appointmentForm.reset();
        });
    }

    // Defina a data mínima para o campo de data (para não permitir agendamentos no passado)
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const year = today.getFullYear();
    const minDate = `${year}-${month}-${day}`;
    document.getElementById('preferredDate').setAttribute('min', minDate);
});