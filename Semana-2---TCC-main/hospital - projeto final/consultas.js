document.addEventListener('DOMContentLoaded', () => {
    // Simula o nome do paciente (em um sistema real, viria do login)
    const nomePaciente = "Maria Silva"; 
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Olá, ${nomePaciente}!`;
    }

    // Lógica para simular se há consultas ou não
    // Em um sistema real, você faria uma requisição para o backend aqui
    const hasConsultas = true; // Altere para 'false' para testar a mensagem de "nenhuma consulta"

    const consultasList = document.getElementById('consultasList');
    const noConsultasMessage = document.getElementById('noConsultasMessage');

    if (hasConsultas) {
        consultasList.style.display = 'flex'; // Mostra a lista de consultas
        noConsultasMessage.style.display = 'none'; // Esconde a mensagem
    } else {
        consultasList.style.display = 'none'; // Esconde a lista de consultas
        noConsultasMessage.style.display = 'block'; // Mostra a mensagem
    }

    // Adiciona evento de clique para o botão "Cancelar Consulta" (exemplo)
    document.querySelectorAll('.btn-cancel').forEach(button => {
        button.addEventListener('click', (event) => {
            const consultaItem = event.target.closest('.consulta-item');
            const data = consultaItem.querySelector('.consulta-date').textContent;
            const medico = consultaItem.querySelector('.consulta-details').textContent;
            if (confirm(`Tem certeza que deseja cancelar a consulta de ${data} com ${medico}?`)) {
                // Em um sistema real, você enviaria uma requisição para o backend para cancelar a consulta
                alert('Consulta cancelada! (Em um sistema real, seria processado pelo servidor)');
                consultaItem.remove(); // Remove o item da lista visualmente
                // Lógica para verificar se não há mais consultas e mostrar a mensagem 'no-consultas'
                if (document.querySelectorAll('.consulta-item').length === 0) {
                     consultasList.style.display = 'none';
                     noConsultasMessage.style.display = 'block';
                }
            }
        });
    });

    // Adiciona evento de clique para o botão "Agendar Nova Consulta"
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', () => {
          window.location.href = 'agendamento.html'
            // window.location.href = 'agendamento.html'; // Futuramente, você pode criar esta página
        });
    });
});