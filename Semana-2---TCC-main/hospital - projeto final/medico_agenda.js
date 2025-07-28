document.addEventListener('DOMContentLoaded', () => {
    const medicoNomeDisplay = document.getElementById('medicoNomeDisplayAgenda');
    const agendaDateInput = document.getElementById('agendaDate');
    const selectedDateDisplay = document.getElementById('selectedDateDisplay');
    const consultasList = document.getElementById('consultasList');
    const noConsultasMessage = document.getElementById('noConsultasMessage');

    // Simula o nome do médico (reutilizado do dashboard, ou viria do backend)
    const medicoNome = "Helena Costa"; 
    medicoNomeDisplay.textContent = medicoNome;

    // Dados de consulta simulados (em um sistema real, viria do backend)
    const consultasSimuladas = {
        '2025-07-28': [
            { time: '09:00', patient: 'Ana Paula Teixeira', status: 'Confirmada' },
            { time: '10:00', patient: 'Carlos Eduardo Brito', status: 'Confirmada' },
            { time: '11:00', patient: 'Fernanda Lima Souza', status: 'Confirmada' }
        ],
        '2025-07-29': [
            { time: '14:00', patient: 'Gabriela Alves Costa', status: 'Confirmada' },
            { time: '15:00', patient: 'Ricardo Mendes Pereira', status: 'Aguardando' }
        ],
        '2025-07-30': [
            { time: '08:00', patient: 'Mariana Oliveira Santos', status: 'Confirmada' }
        ]
        // Adicione mais datas e consultas conforme necessário para teste
    };

    // Função para formatar a data para exibição
    function formatarDataParaExibicao(dataString) {
        const [ano, mes, dia] = dataString.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    // Função para carregar e exibir consultas para uma dada data
    function carregarConsultas(data) {
        const formattedDate = formatarDataParaExibicao(data);
        selectedDateDisplay.textContent = formattedDate; // Atualiza a data exibida no título

        const consultasDoDia = consultasSimuladas[data] || [];
        consultasList.innerHTML = ''; // Limpa a lista atual

        if (consultasDoDia.length === 0) {
            noConsultasMessage.style.display = 'block';
            consultasList.style.display = 'none';
        } else {
            noConsultasMessage.style.display = 'none';
            consultasList.style.display = 'flex'; // Garante que a lista é exibida

            consultasDoDia.forEach(consulta => {
                const consultaItem = document.createElement('div');
                consultaItem.classList.add('consulta-item');
                consultaItem.innerHTML = `
                    <div class="consulta-time">${consulta.time}</div>
                    <div class="consulta-details">
                        <p class="consulta-patient-name">Paciente: ${consulta.patient}</p>
                        <p class="consulta-status">Status: ${consulta.status}</p>
                        <button class="btn-sm btn-action-blue btn-iniciar-atendimento">Iniciar Atendimento</button>
                        <button class="btn-sm btn-action-red btn-cancelar-consulta">Cancelar</button>
                    </div>
                `;
                consultasList.appendChild(consultaItem);
            });

            // Adiciona eventos de clique aos botões recém-criados
            document.querySelectorAll('.btn-iniciar-atendimento').forEach(button => {
                button.addEventListener('click', (event) => {
                    const patientName = event.target.closest('.consulta-details').querySelector('.consulta-patient-name').textContent;
                    alert(`Iniciando atendimento para ${patientName}. (Redirecionaria para medico_atendimento_consulta.html)`);
                    window.location.href = 'medico_atendimento_consulta.html'; // Próxima página a ser criada
                });
            });

            document.querySelectorAll('.btn-cancelar-consulta').forEach(button => {
                button.addEventListener('click', (event) => {
                    const patientName = event.target.closest('.consulta-details').querySelector('.consulta-patient-name').textContent;
                    if (confirm(`Tem certeza que deseja cancelar a consulta com ${patientName}?`)) {
                        alert(`Consulta com ${patientName} cancelada! (Lógica de backend para cancelar)`);
                        // Em um sistema real, você faria uma chamada API para cancelar a consulta
                        // e então recarregaria a lista de consultas
                    }
                });
            });
        }
    }

    // Define a data atual como padrão e carrega as consultas
    const today = new Date();
    // Ajusta para o fuso horário local para evitar problemas de dia
    const offset = today.getTimezoneOffset() * 60000; // offset in milliseconds
    const localToday = (new Date(today.getTime() - offset)).toISOString().split('T')[0];
    
    agendaDateInput.value = localToday; // Preenche o input com a data de hoje
    carregarConsultas(localToday); // Carrega consultas para hoje

    // Event Listener para quando a data muda
    agendaDateInput.addEventListener('change', (event) => {
        carregarConsultas(event.target.value);
    });
});