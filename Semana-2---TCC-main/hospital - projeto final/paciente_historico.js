document.addEventListener('DOMContentLoaded', () => {
    // Simula o nome do paciente logado
    const pacienteNome = "Maria Santos"; 
    const pacienteNomeDisplayHeader = document.getElementById('pacienteNomeDisplayHistorico');
    if (pacienteNomeDisplayHeader) {
        pacienteNomeDisplayHeader.textContent = pacienteNome;
    }

    const tabLinks = document.querySelectorAll('.tab-link');
    const historySections = document.querySelectorAll('.history-section');
    const consultasList = document.getElementById('consultasList');
    const examesTableBody = document.getElementById('examesTableBody');
    const receitasTableBody = document.getElementById('receitasTableBody');
    const atestadosTableBody = document.getElementById('atestadosTableBody');

    // --- Dados Simulados do Histórico (em um sistema real, viriam do backend) ---
    const consultas = [
        {
            id: 1,
            data: '10/05/2025',
            horario: '14:30',
            medico: 'Dr. Pedro Alves',
            especialidade: 'Clínico Geral',
            diagnostico: 'Resfriado comum, recomendado repouso e hidratação.',
            observacoes: 'Paciente apresentou sintomas leves, sem complicações. Prescrito analgésico e antitérmico.',
            receita: [
                'Paracetamol 500mg - 1 comprimido a cada 6h',
                'Hidratante nasal - 2x ao dia'
            ],
            exames: [
                'Hemograma Completo (Solicitado)',
                'Teste Rápido Gripe (Resultado: Negativo)'
            ]
        },
        {
            id: 2,
            data: '22/03/2025',
            horario: '09:00',
            medico: 'Dra. Ana Costa',
            especialidade: 'Dermatologia',
            diagnostico: 'Dermatite de contato, devido a uso de novo sabonete.',
            observacoes: 'Orientação sobre evitar alérgenos e uso de creme tópico.',
            receita: ['Creme com corticoide (uso tópico) - 2x ao dia por 7 dias'],
            exames: []
        },
        {
            id: 3,
            data: '05/01/2025',
            horario: '11:00',
            medico: 'Dr. João Silva',
            especialidade: 'Cardiologia',
            diagnostico: 'Check-up de rotina, sem anormalidades significativas.',
            observacoes: 'Recomendado manter hábitos de vida saudáveis e retorno anual.',
            receita: [],
            exames: ['Eletrocardiograma (Normal)', 'Colesterol Total (Valores normais)']
        }
    ];

    const exames = [
        { id: 101, data: '15/05/2025', tipo: 'Hemograma Completo', medico: 'Dr. Pedro Alves', arquivo: 'hemograma-15-05-2025.pdf' },
        { id: 102, data: '07/01/2025', tipo: 'Eletrocardiograma', medico: 'Dr. João Silva', arquivo: 'eletro-07-01-2025.pdf' },
        { id: 103, data: '20/02/2025', tipo: 'Glicemia em Jejum', medico: 'Dr. Carlos Lima', arquivo: 'glicemia-20-02-2025.pdf' }
    ];

    const receitas = [
        { id: 201, data: '10/05/2025', medico: 'Dr. Pedro Alves', medicamentos: 'Paracetamol 500mg, Hidratante nasal', arquivo: 'receita-paracetamol-10-05-2025.pdf' },
        { id: 202, data: '22/03/2025', medico: 'Dra. Ana Costa', medicamentos: 'Creme com corticoide', arquivo: 'receita-dermatite-22-03-2025.pdf' }
    ];

    const atestados = [
        { id: 301, data: '10/05/2025', medico: 'Dr. Pedro Alves', periodo: '2 dias (10/05 a 11/05)', arquivo: 'atestado-resfriado-10-05-2025.pdf' },
        { id: 302, data: '15/03/2025', medico: 'Dra. Luiza Melo', periodo: '1 dia (15/03)', arquivo: 'atestado-gripe-15-03-2025.pdf' }
    ];


    // --- Funções para Renderizar Conteúdo ---

    function renderConsultas() {
        consultasList.innerHTML = ''; // Limpa conteúdo anterior
        if (consultas.length === 0) {
            consultasList.innerHTML = '<p class="no-data">Nenhuma consulta anterior encontrada.</p>';
            return;
        }

        consultas.forEach(consulta => {
            const card = document.createElement('div');
            card.classList.add('consultas-card');
            card.innerHTML = `
                <h4>
                    <span>${consulta.especialidade}</span>
                    <span class="date">${consulta.data} - ${consulta.horario}</span>
                </h4>
                <h5>Dr. ${consulta.medico}</h5>
                <p><strong>Diagnóstico:</strong> ${consulta.diagnostico}</p>
                <p><strong>Observações:</strong> ${consulta.observacoes}</p>
                ${consulta.receita && consulta.receita.length > 0 ? `
                    <h6>Receita:</h6>
                    <ul>
                        ${consulta.receita.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                ` : ''}
                ${consulta.exames && consulta.exames.length > 0 ? `
                    <h6>Exames Relacionados:</h6>
                    <ul>
                        ${consulta.exames.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                ` : ''}
                <a href="#" class="btn-outline-secondary">Ver Detalhes Completos</a>
            `;
            consultasList.appendChild(card);
        });
    }

    function renderTable(data, tableBodyElement, type) {
        tableBodyElement.innerHTML = ''; // Limpa conteúdo anterior
        if (data.length === 0) {
            tableBodyElement.innerHTML = `<tr><td colspan="4" class="no-data">Nenhum(a) ${type} encontrado(a).</td></tr>`;
            return;
        }

        data.forEach(item => {
            const row = document.createElement('tr');
            let content = '';
            let downloadFileName = ''; // Variável para o nome do arquivo para download

            if (type === 'exame') {
                content = `
                    <td>${item.data}</td>
                    <td>${item.tipo}</td>
                    <td>${item.medico}</td>
                `;
                downloadFileName = `${item.tipo.replace(/\s/g, '-')}-${item.data.replace(/\//g, '-')}.pdf`;
            } else if (type === 'receita') {
                content = `
                    <td>${item.data}</td>
                    <td>${item.medico}</td>
                    <td>${item.medicamentos}</td>
                `;
                downloadFileName = `receita-${item.medico.replace(/\s/g, '-')}-${item.data.replace(/\//g, '-')}.pdf`;
            } else if (type === 'atestado') {
                content = `
                    <td>${item.data}</td>
                    <td>${item.medico}</td>
                    <td>${item.periodo}</td>
                `;
                downloadFileName = `atestado-${item.medico.replace(/\s/g, '-')}-${item.data.replace(/\//g, '-')}.pdf`;
            }

            row.innerHTML = `
                ${content}
                <td>
                    <a href="#" class="btn-download" download="${downloadFileName}" data-file="${item.arquivo}">
                        <i class="fa-solid fa-download"></i> Baixar
                    </a>
                </td>
            `;
            tableBodyElement.appendChild(row);
        });
    }

    // --- Lógica de Abas ---

    function showSection(sectionId) {
        // Oculta todas as seções
        historySections.forEach(section => {
            section.style.display = 'none';
        });

        // Mostra a seção desejada
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }

        // Remove a classe 'active' de todos os links de aba
        tabLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Adiciona a classe 'active' ao link da aba clicada
        const activeLink = document.querySelector(`.tab-link[data-target="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Renderiza o conteúdo da seção ativada (se for a primeira vez ou se precisar atualizar)
        if (sectionId === 'consultas-anteriores') {
            renderConsultas();
        } else if (sectionId === 'exames') {
            renderTable(exames, examesTableBody, 'exame');
        } else if (sectionId === 'receitas') {
            renderTable(receitas, receitasTableBody, 'receita');
        } else if (sectionId === 'atestados') {
            renderTable(atestados, atestadosTableBody, 'atestado');
        }
    }

    // Adiciona event listeners para os links das abas
    tabLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link
            const targetId = event.target.dataset.target;
            showSection(targetId);
            // Atualiza a URL sem recarregar a página, para manter a aba ativa no refresh
            history.pushState(null, '', `#${targetId}`);
        });
    });

    // Lógica para carregar a aba correta ao carregar a página (se houver hash na URL)
    const initialHash = window.location.hash.substring(1); // Remove o '#'
    if (initialHash && document.getElementById(initialHash)) {
        showSection(initialHash);
    } else {
        showSection('consultas-anteriores'); // Padrão: mostra consultas anteriores
    }
});