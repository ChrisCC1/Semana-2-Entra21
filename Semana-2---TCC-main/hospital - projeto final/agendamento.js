document.addEventListener('DOMContentLoaded', () => {
    const especialidadeSelect = document.getElementById('especialidade');
    const medicoSelect = document.getElementById('medico');
    const dataConsultaInput = document.getElementById('dataConsulta');
    const horaConsultaSelect = document.getElementById('horaConsulta');
    const agendamentoForm = document.getElementById('agendamentoForm');

    // Mapeamento de médicos por especialidade (simulação de dados do backend)
    const medicosPorEspecialidade = {
        clinico_geral: [
            { id: 'dr_joao', nome: 'Dr. João Silva' },
            { id: 'dra_maria', nome: 'Dra. Maria Santos' }
        ],
        dermatologia: [
            { id: 'dra_ana', nome: 'Dra. Ana Costa' },
            { id: 'dr_carlos', nome: 'Dr. Carlos Mendes' }
        ],
        cardiologia: [
            { id: 'dr_fernando', nome: 'Dr. Fernando Dias' }
        ],
        pediatria: [
            { id: 'dra_rita', nome: 'Dra. Rita Pereira' }
        ],
        ginecologia: [
            { id: 'dra_bia', nome: 'Dra. Beatriz Almeida' }
        ]
    };

    // Mapeamento de horários disponíveis por médico e data (simulação)
    const horariosDisponiveis = {
        'dr_joao_2025-07-28': ['09:00', '10:00', '11:00'],
        'dr_joao_2025-07-29': ['14:00', '15:00'],
        'dra_ana_2025-07-30': ['08:30', '09:30', '10:30', '11:30'],
        // ... adicione mais horários para outros médicos e datas
    };

    // Função para limpar e preencher selects
    function populateSelect(selectElement, options, placeholder) {
        selectElement.innerHTML = `<option value="">${placeholder}</option>`;
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.id || option; // Pode ser ID do médico ou o próprio horário
            opt.textContent = option.nome || option; // Nome do médico ou o próprio horário
            selectElement.appendChild(opt);
        });
        selectElement.disabled = false;
    }

    // Event Listener para Especialidade
    especialidadeSelect.addEventListener('change', () => {
        const especialidadeSelecionada = especialidadeSelect.value;
        medicoSelect.disabled = true;
        dataConsultaInput.disabled = true;
        horaConsultaSelect.disabled = true;
        medicoSelect.innerHTML = '<option value="">Selecione o Médico</option>';
        dataConsultaInput.value = '';
        horaConsultaSelect.innerHTML = '<option value="">Selecione o Horário</option>';

        document.getElementById('especialidadeError').textContent = '';
        document.getElementById('medicoError').textContent = '';
        document.getElementById('dataConsultaError').textContent = '';
        document.getElementById('horaConsultaError').textContent = '';

        if (especialidadeSelecionada) {
            const medicos = medicosPorEspecialidade[especialidadeSelecionada] || [];
            populateSelect(medicoSelect, medicos, 'Selecione o Médico');
        }
    });

    // Event Listener para Médico
    medicoSelect.addEventListener('change', () => {
        dataConsultaInput.disabled = true;
        horaConsultaSelect.disabled = true;
        dataConsultaInput.value = '';
        horaConsultaSelect.innerHTML = '<option value="">Selecione o Horário</option>';

        document.getElementById('medicoError').textContent = '';
        if (medicoSelect.value) {
            dataConsultaInput.disabled = false;
            // Define a data mínima para hoje (ou próxima data disponível do médico)
            const today = new Date().toISOString().split('T')[0];
            dataConsultaInput.min = today; 
        }
    });

    // Event Listener para Data da Consulta
    dataConsultaInput.addEventListener('change', () => {
        horaConsultaSelect.disabled = true;
        horaConsultaSelect.innerHTML = '<option value="">Selecione o Horário</option>';

        document.getElementById('dataConsultaError').textContent = '';
        const medicoSelecionado = medicoSelect.value;
        const dataSelecionada = dataConsultaInput.value;

        if (medicoSelecionado && dataSelecionada) {
            const key = `${medicoSelecionado}_${dataSelecionada}`;
            const horarios = horariosDisponiveis[key] || [];
            populateSelect(horaConsultaSelect, horarios, 'Selecione o Horário');
            if (horarios.length === 0) {
                horaConsultaSelect.disabled = true;
                horaConsultaSelect.innerHTML = '<option value="">Nenhum horário disponível</option>';
            }
        }
    });

    // Event Listener para Hora da Consulta (apenas para limpar erro)
    horaConsultaSelect.addEventListener('change', () => {
        document.getElementById('horaConsultaError').textContent = '';
    });


    // Validação e Envio do Formulário
    agendamentoForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        let isValid = true;

        // Limpa mensagens de erro anteriores
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Validação da Especialidade
        if (especialidadeSelect.value === '') {
            document.getElementById('especialidadeError').textContent = 'Por favor, selecione uma especialidade.';
            isValid = false;
        }

        // Validação do Médico
        if (medicoSelect.value === '') {
            document.getElementById('medicoError').textContent = 'Por favor, selecione um médico.';
            isValid = false;
        }

        // Validação da Data
        if (dataConsultaInput.value === '') {
            document.getElementById('dataConsultaError').textContent = 'Por favor, selecione uma data.';
            isValid = false;
        }

        // Validação do Horário
        if (horaConsultaSelect.value === '') {
            document.getElementById('horaConsultaError').textContent = 'Por favor, selecione um horário.';
            isValid = false;
        }

        if (isValid) {
            // Coleta os dados para enviar ao backend
            const agendamentoData = {
                especialidade: especialidadeSelect.options[especialidadeSelect.selectedIndex].text,
                medico: medicoSelect.options[medicoSelect.selectedIndex].text,
                data: dataConsultaInput.value,
                hora: horaConsultaSelect.value
            };
            
            // Simulação de envio
            alert('Agendamento confirmado!\n\n' +
                  'Especialidade: ' + agendamentoData.especialidade + '\n' +
                  'Médico: ' + agendamentoData.medico + '\n' +
                  'Data: ' + agendamentoData.data + '\n' +
                  'Hora: ' + agendamentoData.hora + '\n\n' +
                  '(Em um sistema real, estes dados seriam enviados para o servidor via AJAX ou formulário)');
            
            // Resetar o formulário após o "envio"
            agendamentoForm.reset();
            medicoSelect.disabled = true;
            dataConsultaInput.disabled = true;
            horaConsultaSelect.disabled = true;
            medicoSelect.innerHTML = '<option value="">Selecione o Médico</option>';
            horaConsultaSelect.innerHTML = '<option value="">Selecione o Horário</option>';

            // Opcional: Redirecionar para a página de "Minhas Consultas"
            // window.location.href = 'consultas.html';
        }
    });
});