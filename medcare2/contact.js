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

    // Lógica para o formulário de contato (opcional, apenas para demonstração)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Em um ambiente real, você enviaria esses dados para um servidor aqui
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');

            // Limpa o formulário após o envio
            contactForm.reset();
        });
    }
});