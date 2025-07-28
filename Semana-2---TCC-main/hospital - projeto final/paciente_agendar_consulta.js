document.addEventListener('DOMContentLoaded', () => {
    // Simula o nome do paciente logado
    const pacienteNome = "Maria Santos"; 
    const pacienteNomeDisplayHeader = document.getElementById('pacienteNomeDisplayAgenda');
    if (pacienteNomeDisplayHeader) {
        pacienteNomeDisplayHeader.textContent = pacienteNome;
    }

    const especialidadeSelect = document.getElementById('especialidade');
    const medicoSelect = document.getElementById('medico');
    const dataConsultaInput = document.getElementById('dataConsulta');
    const horariosDisponiveisDiv = document.getElementById('horariosDisponiveis');
    const agendamentoForm = document.getElementById('agendamentoForm');

    // Elementos de erro
    const especialidadeError = document.getElementById('especialidadeError');
    const medicoError = document.getElementById('medicoError');
    const dataConsultaError = document.getElementById('dataConsultaError');
    const horarioError = document.getElementById('horarioError');

    let selectedHorario = null; // Para armazenar o horário selecionado

    // --- Dados Simulados ---
    // Em um sistema real, estes dados viriam do backend
    const medicos = [
        { id: 1, nome: 'Dr. João Silva', especialidade: 'Cardiologia' },
        { id: 2, nome: 'Dra. Ana Costa', especialidade: 'Dermatologia' },
        { id: 3, nome: 'Dr. Pedro Alves', especialidade: 'Ortopedia' },
        { id: 4, nome: 'Dra. Luiza Melo', especialidade: 'Pediatria' },
        { id: 5, nome: 'Dr. Carlos Lima', especialidade: 'Clínica Geral' },
        { id: 6, nome: 'Dra. Beatriz Fernandes', especialidade: 'Cardiologia' }
    ];

    // Horários disponíveis simulados por médico e data (simplificado)
    const horariosSimulados = {
        '1-2025-07-30': ['09:00', '10:00', '11:00', '14:00', '15:00'], // Dr. João, 30/07/2025
        '1-2025-07-31': ['08:30', '09:30', '10:30', '13:00'], // Dr. João, 31/07/2025
        '2-2025-07-30': ['09:00', '11:00', '16:00'], // Dra. Ana, 30/07/2025
        '3-2025-08-01': ['10:00', '11:00', '14:00'], // Dr. Pedro, 01/08/2025
        '5-2025-07-30': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'], // Dr. Carlos, 30/07/2025
        // Adicione mais horários para outros médicos e datas conforme necessário
    };

    // --- Funções de Validação ---
    function validateField(element, errorElement, message) {
        if (!element.value) {
            errorElement.textContent = message;
            return false;
        }
        errorElement.textContent = '';
        return true;
    }

    function validateSelectedHorario() {
        if (!selectedHorario) {
            horarioError.textContent = 'Por favor, selecione um horário.';
            return false;
        }
        horarioError.textContent = '';
        return true;
    }

    // --- Lógica do Formulário ---

    // 1. Carregar Médicos por Especialidade
    especialidadeSelect.addEventListener('change', () => {
        medicoSelect.innerHTML = '<option value="">Selecione um médico</option>'; // Limpa opções anteriores
        medicoSelect.disabled = true; // Desabilita médico até especialidade ser válida
        dataConsultaInput.disabled = true; // Desabilita data também
        horariosDisponiveisDiv.innerHTML = '<p class="no-times-message">Selecione uma data para ver os horários.</p>';
        selectedHorario = null;
        validateField(especialidadeSelect, especialidadeError, 'Por favor, selecione uma especialidade.');

        const especialidadeSelecionada = especialidadeSelect.value;
        if (especialidadeSelecionada) {
            const medicosFiltrados = medicos.filter(medico => medico.especialidade === especialidadeSelecionada);
            medicosFiltrados.forEach(medico => {
                const option = document.createElement('option');
                option.value = medico.id;
                option.textContent = medico.nome;
                medicoSelect.appendChild(option);
            });
            medicoSelect.disabled = false; // Habilita o select de médico
        }
    });

    // 2. Habilitar Data após Médico Selecionado
    medicoSelect.addEventListener('change', () => {
        dataConsultaInput.disabled = true; // Desabilita data até médico ser válido
        horariosDisponiveisDiv.innerHTML = '<p class="no-times-message">Selecione uma data para ver os horários.</p>';
        selectedHorario = null;
        validateField(medicoSelect, medicoError, 'Por favor, selecione um médico.');

        if (medicoSelect.value) {
            dataConsultaInput.disabled = false; // Habilita o input de data
            // Define a data mínima para hoje
            const today = new Date();
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            dataConsultaInput.min = `${year}-${month}-${day}`;
        }
    });

    // 3. Carregar Horários Disponíveis ao Selecionar Data
    dataConsultaInput.addEventListener('change', () => {
        horariosDisponiveisDiv.innerHTML = ''; // Limpa horários anteriores
        selectedHorario = null; // Reseta o horário selecionado
        validateField(dataConsultaInput, dataConsultaError, 'Por favor, selecione uma data.');

        const medicoId = medicoSelect.value;
        const dataSelecionada = dataConsultaInput.value; // Formato YYYY-MM-DD

        if (medicoId && dataSelecionada) {
            const key = `${medicoId}-${dataSelecionada}`;
            const horarios = horariosSimulados[key] || [];

            if (horarios.length > 0) {
                horarios.forEach(horario => {
                    const horarioBtn = document.createElement('button');
                    horarioBtn.type = 'button';
                    horarioBtn.classList.add('horario-btn');
                    horarioBtn.textContent = horario;
                    horarioBtn.addEventListener('click', () => {
                        // Remove seleção de outros botões
                        document.querySelectorAll('.horario-btn').forEach(btn => btn.classList.remove('selected'));
                        // Adiciona seleção ao botão clicado
                        horarioBtn.classList.add('selected');
                        selectedHorario = horario;
                        horarioError.textContent = ''; // Limpa erro ao selecionar
                    });
                    horariosDisponiveisDiv.appendChild(horarioBtn);
                });
            } else {
                horariosDisponiveisDiv.innerHTML = '<p class="no-times-message">Não há horários disponíveis para esta data.</p>';
            }
        }
    });

    // 4. Lidar com o Envio do Formulário
    agendamentoForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão

        // Valida todos os campos novamente no submit
        const isEspecialidadeValid = validateField(especialidadeSelect, especialidadeError, 'Selecione uma especialidade.');
        const isMedicoValid = validateField(medicoSelect, medicoError, 'Selecione um médico.');
        const isDataValid = validateField(dataConsultaInput, dataConsultaError, 'Selecione uma data.');
        const isHorarioValid = validateSelectedHorario();

        if (isEspecialidadeValid && isMedicoValid && isDataValid && isHorarioValid) {
            // Se tudo estiver válido, simula o agendamento
            const especialidade = especialidadeSelect.options[especialidadeSelect.selectedIndex].textContent;
            const medicoNome = medicoSelect.options[medicoSelect.selectedIndex].textContent;
            const dataConsulta = new Date(dataConsultaInput.value + 'T00:00:00').toLocaleDateString('pt-BR'); // Formata para BR
            const horario = selectedHorario;

            const confirmacao = `Confirmar agendamento:\n\n` +
                                `Especialidade: ${especialidade}\n` +
                                `Médico: ${medicoNome}\n` +
                                `Data: ${dataConsulta}\n` +
                                `Horário: ${horario}\n\n` +
                                `Deseja confirmar?`;

            if (confirm(confirmacao)) {
                // Em um sistema real, você enviaria estes dados para o backend:
                // fetch('/api/agendar-consulta', { method: 'POST', body: JSON.stringify({ pacienteId, medicoId, data, horario }) })
                //    .then(response => response.json())
                //    .then(data => { if (data.success) { alert('Agendamento realizado!'); redireciona; } else { erro; } })
                
                alert('Agendamento realizado com sucesso!');
                // Opcional: Redirecionar para uma página de "minhas consultas" ou dashboard
                window.location.href = 'paciente_dashboard.html';
            }
        } else {
            alert('Por favor, preencha todos os campos e selecione um horário para agendar a consulta.');
        }
    });

    // Define a data mínima para hoje assim que a página carrega
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    dataConsultaInput.min = `${year}-${month}-${day}`;
});