document.addEventListener('DOMContentLoaded', () => {
    // Simula o nome do médico logado (em um sistema real, viria do backend)
    const medicoNome = "Helena Costa"; // Substitua pelo nome do médico real
    document.getElementById('medicoNomeDisplay').textContent = medicoNome;
    document.getElementById('welcomeMedicoNome').textContent = medicoNome;

    // Simula dados para os cards de resumo (em um sistema real, viria do backend)
    document.getElementById('consultasHoje').textContent = Math.floor(Math.random() * 5) + 2; // Entre 2 e 6
    document.getElementById('proximasConsultas').textContent = Math.floor(Math.random() * 10) + 5; // Entre 5 e 14
    document.getElementById('totalPacientes').textContent = Math.floor(Math.random() * 100) + 50; // Entre 50 e 149

    // Adiciona eventos de clique para os botões de ação rápida
    document.getElementById('btnGerenciarAgenda').addEventListener('click', () => {
        alert('Redirecionando para Gerenciar Agenda... (medico_agenda.html)');
        window.location.href = 'medico_agenda.html'; // Próxima página a ser criada
    });

    document.getElementById('btnBuscarPaciente').addEventListener('click', () => {
        alert('Redirecionando para Buscar Paciente... (medico_historico_paciente.html)');
        window.location.href = 'medico_historico_paciente.html'; // Próxima página a ser criada
    });

    document.getElementById('btnAtenderConsulta').addEventListener('click', () => {
        alert('Redirecionando para Iniciar Atendimento de Consulta... (medico_atendimento_consulta.html)');
        window.location.href = 'medico_atendimento_consulta.html'; // Próxima página a ser criada
    });

    document.getElementById('btnVerEstoque').addEventListener('click', () => {
        alert('Redirecionando para Ver Estoque de Medicamentos... (estoque_medicamentos.html)');
        window.location.href = 'estoque_medicamentos.html'; // Página a ser criada
    });
});