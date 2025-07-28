document.addEventListener('DOMContentLoaded', () => {
    const medicoNomeDisplay = document.getElementById('medicoNomeDisplayHistorico');
    const medicoNome = "Helena Costa"; 
    medicoNomeDisplay.textContent = medicoNome;

    const patientSearchInput = document.getElementById('patientSearchInput');
    const searchPatientBtn = document.getElementById('searchPatientBtn');
    const searchResultsDiv = document.getElementById('searchResults');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const patientHistoryDetailsDiv = document.getElementById('patientHistoryDetails');
    const selectedPatientNameDisplay = document.getElementById('selectedPatientName');

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Dados de pacientes simulados
    const pacientesSimulados = [
        { id: 1, nome: 'Ana Paula Teixeira', cpf: '123.456.789-00', 
            historico: {
                consultas: [
                    { data: '15/05/2025', medico: 'Dr(a). João Santos', motivo: 'Dor de cabeça persistente.', diagnostico: 'Cefaleia tensional.', prescricao: 'Analgesico.' },
                    { data: '01/03/2025', medico: 'Dr(a). Maria Oliveira', motivo: 'Check-up anual.', diagnostico: 'Saudável.', prescricao: 'Vitaminas.' }
                ],
                exames: [
                    { data: '05/03/2025', nome: 'Hemograma Completo', resultado: 'Normal' },
                    { data: '20/01/2025', nome: 'Glicemia em Jejum', resultado: '95 mg/dL' }
                ],
                receitas: [
                    { data: '15/05/2025', medicamento: 'Paracetamol 500mg', posologia: '1 comprimido a cada 8h' },
                    { data: '01/03/2025', medicamento: 'Amoxicilina 875mg', posologia: '1 cápsula a cada 12h' }
                ]
            }
        },
        { id: 2, nome: 'Carlos Eduardo Brito', cpf: '987.654.321-00',
            historico: {
                consultas: [
                    { data: '10/06/2025', medico: 'Dr(a). Helena Costa', motivo: 'Dor no joelho.', diagnostico: 'Tendinite patelar.', prescricao: 'Anti-inflamatório, fisioterapia.' }
                ],
                exames: [
                    { data: '12/06/2025', nome: 'Ressonância Magnética do Joelho', resultado: 'Achados de tendinopatia.' }
                ],
                receitas: [
                    { data: '10/06/2025', medicamento: 'Ibuprofeno 600mg', posologia: '1 comprimido a cada 12h' }
                ]
            }
        },
        { id: 3, nome: 'Fernanda Lima Souza', cpf: '456.789.012-33',
            historico: {
                consultas: [],
                exames: [],
                receitas: []
            }
        }
    ];

    // --- Lógica de Pesquisa de Pacientes ---
    function performSearch() {
        const searchTerm = patientSearchInput.value.trim().toLowerCase();
        searchResultsDiv.innerHTML = ''; // Limpa resultados anteriores
        patientHistoryDetailsDiv.style.display = 'none'; // Esconde detalhes do histórico

        if (searchTerm.length < 3) {
            noResultsMessage.style.display = 'block';
            noResultsMessage.textContent = 'Digite pelo menos 3 caracteres para pesquisar.';
            return;
        }
        noResultsMessage.style.display = 'none'; // Esconde mensagem "Nenhum paciente encontrado"

        const filteredPatients = pacientesSimulados.filter(p => 
            p.nome.toLowerCase().includes(searchTerm) || p.cpf.includes(searchTerm)
        );

        if (filteredPatients.length === 0) {
            noResultsMessage.style.display = 'block';
            noResultsMessage.textContent = 'Nenhum paciente encontrado.';
        } else {
            filteredPatients.forEach(patient => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('search-result-item');
                resultItem.setAttribute('data-patient-id', patient.id);
                resultItem.innerHTML = `
                    <span class="patient-name">${patient.nome}</span> - CPF: ${patient.cpf}
                    <button class="btn-sm btn-action-blue view-history-btn">Ver Histórico</button>
                `;
                searchResultsDiv.appendChild(resultItem);
            });
            addHistoryViewListeners(); // Adiciona listeners aos novos botões "Ver Histórico"
        }
    }

    searchPatientBtn.addEventListener('click', performSearch);
    patientSearchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // --- Lógica de Exibição de Histórico do Paciente ---
    function addHistoryViewListeners() {
        document.querySelectorAll('.view-history-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const patientId = parseInt(event.target.closest('.search-result-item').dataset.patientId);
                const selectedPatient = pacientesSimulados.find(p => p.id === patientId);

                if (selectedPatient) {
                    selectedPatientNameDisplay.textContent = selectedPatient.nome;
                    patientHistoryDetailsDiv.style.display = 'block'; // Mostra a seção de detalhes

                    // Ativa a primeira aba por padrão (Consultas)
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    document.querySelector('.tab-button[data-tab="consultas"]').classList.add('active');
                    document.getElementById('tabContent-consultas').classList.add('active');
                    
                    renderPatientHistory(selectedPatient.historico);
                }
            });
        });
    }

    function renderPatientHistory(historico) {
        // Renderizar Consultas
        const consultasListDiv = document.getElementById('consultasHistoricoList');
        consultasListDiv.innerHTML = '';
        if (historico.consultas && historico.consultas.length > 0) {
            historico.consultas.forEach(consulta => {
                const item = document.createElement('div');
                item.classList.add('historico-item');
                item.innerHTML = `
                    <div class="historico-date">Data: ${consulta.data}</div>
                    <div class="historico-doctor">Médico: ${consulta.medico}</div>
                    <p class="historico-summary">Motivo: ${consulta.motivo} Diagnóstico: ${consulta.diagnostico} Prescrição: ${consulta.prescricao}</p>
                    <button class="btn-sm btn-action-blue btn-view-document">Ver Receita/Documentos</button>
                `;
                consultasListDiv.appendChild(item);
            });
            document.getElementById('noConsultasHistorico').style.display = 'none';
        } else {
            document.getElementById('noConsultasHistorico').style.display = 'block';
        }
        
        // Renderizar Exames
        const examesListDiv = document.getElementById('examesHistoricoList');
        examesListDiv.innerHTML = '';
        if (historico.exames && historico.exames.length > 0) {
            historico.exames.forEach(exame => {
                const item = document.createElement('div');
                item.classList.add('historico-item');
                item.innerHTML = `
                    <div class="historico-date">Data: ${exame.data}</div>
                    <p class="historico-summary">Exame: ${exame.nome}. Resultado: ${exame.resultado}.</p>
                    <button class="btn-sm btn-action-blue btn-view-document">Ver Laudo</button>
                `;
                examesListDiv.appendChild(item);
            });
            document.getElementById('noExamesHistorico').style.display = 'none';
        } else {
            document.getElementById('noExamesHistorico').style.display = 'block';
        }

        // Renderizar Receitas
        const receitasListDiv = document.getElementById('receitasHistoricoList');
        receitasListDiv.innerHTML = '';
        if (historico.receitas && historico.receitas.length > 0) {
            historico.receitas.forEach(receita => {
                const item = document.createElement('div');
                item.classList.add('historico-item');
                item.innerHTML = `
                    <div class="historico-date">Data: ${receita.data}</div>
                    <p class="historico-summary">Medicamento: ${receita.medicamento}. Posologia: ${receita.posologia}.</p>
                    <button class="btn-sm btn-action-blue btn-view-document">Ver Receita</button>
                `;
                receitasListDiv.appendChild(item);
            });
            document.getElementById('noReceitasHistorico').style.display = 'none';
        } else {
            document.getElementById('noReceitasHistorico').style.display = 'block';
        }

        // Adiciona listeners para os botões "Ver Documento" no histórico exibido
        document.querySelectorAll('.btn-view-document').forEach(button => {
            button.addEventListener('click', () => {
                alert('Funcionalidade de visualizar documento. (Em um sistema real, abriria o PDF/imagem ou um modal com detalhes)');
            });
        });
    }

    // --- Lógica das Abas ---
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Adiciona 'active' ao botão clicado e ao conteúdo correspondente
            button.classList.add('active');
            const tabId = button.dataset.tab;
            document.getElementById(`tabContent-${tabId}`).classList.add('active');
        });
    });
});