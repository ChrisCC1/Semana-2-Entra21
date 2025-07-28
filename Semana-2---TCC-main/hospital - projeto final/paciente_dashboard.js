document.addEventListener('DOMContentLoaded', () => {
    // Simula o nome do paciente logado (em um sistema real, viria do backend)
    const pacienteNome = "Maria Santos"; 

    // Atualiza o nome do paciente no cabeçalho
    const pacienteNomeDisplayHeader = document.getElementById('pacienteNomeDisplayDashboard');
    if (pacienteNomeDisplayHeader) {
        pacienteNomeDisplayHeader.textContent = pacienteNome;
    }

    // Atualiza o nome do paciente na mensagem de boas-vindas
    const welcomePacienteNome = document.getElementById('welcomePacienteNome');
    if (welcomePacienteNome) {
        welcomePacienteNome.textContent = pacienteNome;
    }

    // --- Configuração dos botões de ação do Dashboard ---
    const btnAgendarConsulta = document.getElementById('btnAgendarConsulta');
    const btnProximasConsultas = document.getElementById('btnProximasConsultas');
    const btnAcessarHistorico = document.getElementById('btnAcessarHistorico');
    const btnExamesReceitas = document.getElementById('btnExamesReceitas');

    if (btnAgendarConsulta) {
        btnAgendarConsulta.addEventListener('click', () => {
            alert('Redirecionando para a página de Agendamento de Consulta...');
            window.location.href = 'paciente_agendar_consulta.html';
        });
    }

    if (btnProximasConsultas) {
        btnProximasConsultas.addEventListener('click', () => {
            alert('Redirecionando para a página de Próximas Consultas...');
            // Pode ser uma seção do histórico ou uma página específica
            window.location.href = 'paciente_historico.html#proximas-consultas'; // Exemplo de âncora
        });
    }

    if (btnAcessarHistorico) {
        btnAcessarHistorico.addEventListener('click', () => {
            alert('Redirecionando para a página de Histórico Completo...');
            window.location.href = 'paciente_historico.html';
        });
    }

    if (btnExamesReceitas) {
        btnExamesReceitas.addEventListener('click', () => {
            alert('Redirecionando para a seção de Exames e Receitas no Histórico...');
            window.location.href = 'paciente_historico.html#exames-receitas'; // Exemplo de âncora
        });
    }
});