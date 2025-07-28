document.addEventListener('DOMContentLoaded', () => {
    const medicoNomeDisplay = document.getElementById('medicoNomeDisplayEstoque');
    const medicoNome = "Helena Costa"; 
    medicoNomeDisplay.textContent = medicoNome;

    const medicamentoSearchInput = document.getElementById('medicamentoSearchInput');
    const searchMedicamentoBtn = document.getElementById('searchMedicamentoBtn');
    const estoqueTableBody = document.getElementById('estoqueTableBody');
    const noMedicamentosMessage = document.getElementById('noMedicamentosMessage');
    const addMedicamentoBtn = document.getElementById('addMedicamentoBtn');

    // Dados de estoque simulados
    const estoqueMedicamentos = [
        { id: 1, nome: 'Paracetamol', concentracao: '500mg', quantidade: 1500, validade: '2026-12-31' },
        { id: 2, nome: 'Ibuprofeno', concentracao: '400mg', quantidade: 800, validade: '2025-09-15' },
        { id: 3, nome: 'Amoxicilina', concentracao: '875mg', quantidade: 300, validade: '2025-03-01' }, // Exemplo de vencido
        { id: 4, nome: 'Omeprazol', concentracao: '20mg', quantidade: 1200, validade: '2027-01-20' },
        { id: 5, nome: 'Dipirona', concentracao: '1g', quantidade: 75, validade: '2025-10-05' }, // Exemplo de baixo estoque
        { id: 6, nome: 'Cloridrato de Propranolol', concentracao: '40mg', quantidade: 500, validade: '2026-06-30' }
    ];

    // Função para formatar data e determinar status da validade
    function getValidityStatus(validadeDateString) {
        const today = new Date();
        const validade = new Date(validadeDateString);
        validade.setHours(0,0,0,0); // Zera a hora para comparação de apenas data

        const diffTime = validade.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) return 'status-critical'; // Vencido ou vence hoje
        if (diffDays <= 90) return 'status-warning'; // Menos de 90 dias para vencer
        return 'status-ok';
    }

    // Função para renderizar a tabela
    function renderTable(medicamentosToRender) {
        estoqueTableBody.innerHTML = ''; // Limpa as linhas existentes
        if (medicamentosToRender.length === 0) {
            noMedicamentosMessage.style.display = 'block';
        } else {
            noMedicamentosMessage.style.display = 'none';
            medicamentosToRender.forEach(medicamento => {
                const row = document.createElement('tr');
                const validityStatusClass = getValidityStatus(medicamento.validade);

                row.innerHTML = `
                    <td data-label="Medicamento">${medicamento.nome}</td>
                    <td data-label="Concentração">${medicamento.concentracao}</td>
                    <td data-label="Quantidade">${medicamento.quantidade} ${medicamento.nome.includes('ml') || medicamento.nome.includes('L') ? 'ml' : 'unidades'}</td>
                    <td data-label="Validade" class="${validityStatusClass}">${new Date(medicamento.validade).toLocaleDateString('pt-BR')}</td>
                    <td data-label="Ações" class="actions-column">
                        <button class="btn-sm btn-action-blue edit-btn" data-id="${medicamento.id}">Editar</button>
                        <button class="btn-sm btn-action-red remove-btn" data-id="${medicamento.id}">Remover</button>
                    </td>
                `;
                estoqueTableBody.appendChild(row);
            });
            addTableActionListeners(); // Adiciona listeners aos botões de editar/remover
        }
    }

    // Função para adicionar listeners aos botões da tabela (Editar/Remover)
    function addTableActionListeners() {
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const medicamentoId = event.target.dataset.id;
                alert(`Editar medicamento ID: ${medicamentoId} (Esta ação abriria um modal de edição ou nova página)`);
                // Futuramente: window.location.href = `editar_medicamento.html?id=${medicamentoId}`;
            });
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const medicamentoId = event.target.dataset.id;
                if (confirm(`Tem certeza que deseja remover o medicamento ID: ${medicamentoId} do estoque?`)) {
                    alert(`Medicamento ID: ${medicamentoId} removido! (Lógica de backend para remover)`);
                    // Em um sistema real, você faria uma chamada API para remover o medicamento
                    // e então recarregaria a tabela. Por enquanto, apenas simula.
                    const rowIndex = Array.from(estoqueTableBody.children).findIndex(row => 
                        row.querySelector('.edit-btn').dataset.id == medicamentoId
                    );
                    if (rowIndex > -1) {
                        estoqueTableBody.children[rowIndex].remove();
                    }
                    if (estoqueTableBody.children.length === 0) {
                        noMedicamentosMessage.style.display = 'block';
                    }
                }
            });
        });
    }

    // --- Lógica de Pesquisa ---
    function performSearch() {
        const searchTerm = medicamentoSearchInput.value.trim().toLowerCase();
        const filteredMedicamentos = estoqueMedicamentos.filter(m => 
            m.nome.toLowerCase().includes(searchTerm) || 
            m.concentracao.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredMedicamentos);
    }

    searchMedicamentoBtn.addEventListener('click', performSearch);
    medicamentoSearchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // --- Lógica para Adicionar Novo Medicamento ---
    addMedicamentoBtn.addEventListener('click', () => {
        alert('Funcionalidade de adicionar novo medicamento. (Esta ação abriria um modal ou nova página para cadastro)');
        // Futuramente: window.location.href = 'add_medicamento.html';
    });

    // Renderiza a tabela inicial com todos os medicamentos
    renderTable(estoqueMedicamentos);
});