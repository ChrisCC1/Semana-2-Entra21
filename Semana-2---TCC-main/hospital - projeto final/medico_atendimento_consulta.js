document.addEventListener('DOMContentLoaded', () => {
    const medicoNomeDisplay = document.getElementById('medicoNomeDisplayAtendimento');
    // Simula o nome do médico (reutilizado, ou viria do backend)
    const medicoNome = "Helena Costa"; 
    medicoNomeDisplay.textContent = medicoNome;

    // Simula informações da consulta (em um sistema real, viria dos parâmetros da URL ou de uma API)
    document.getElementById('infoPacienteNome').textContent = "Paciente: Maria Silva";
    document.getElementById('infoConsultaData').textContent = "28/07/2025";
    document.getElementById('infoConsultaHora').textContent = "10:30";

    const atendimentoForm = document.getElementById('atendimentoForm');
    const medicamentosList = document.getElementById('medicamentosList');
    const addMedicamentoBtn = document.getElementById('addMedicamento');
    const exameList = document.getElementById('examesList');
    const addExameBtn = document.getElementById('addExame');
    const gerarAtestadoBtn = document.getElementById('gerarAtestado');
    const finalizarConsultaBtn = document.getElementById('finalizarConsulta');

    // Funções de validação básica
    function validateField(fieldId, errorId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.getElementById(errorId);
        if (field.value.trim() === '') {
            errorDiv.textContent = message;
            return false;
        }
        errorDiv.textContent = '';
        return true;
    }

    // --- Lógica para Adicionar/Remover Medicamentos ---
    addMedicamentoBtn.addEventListener('click', () => {
        const medicamento = document.getElementById('medicamento').value.trim();
        const dosagem = document.getElementById('dosagem').value.trim();
        const posologia = document.getElementById('posologia').value.trim();

        if (medicamento && dosagem && posologia) {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('added-item');
            itemDiv.innerHTML = `
                <div class="item-details">
                    <strong>${medicamento}</strong> - ${dosagem} (${posologia})
                </div>
                <button type="button" class="item-remove-btn">Remover</button>
            `;
            medicamentosList.appendChild(itemDiv);

            // Adiciona evento para remover o item
            itemDiv.querySelector('.item-remove-btn').addEventListener('click', () => {
                itemDiv.remove();
            });

            // Limpa os campos
            document.getElementById('medicamento').value = '';
            document.getElementById('dosagem').value = '';
            document.getElementById('posologia').value = '';
        } else {
            alert('Por favor, preencha todos os campos do medicamento (Nome, Dosagem, Posologia).');
        }
    });

    // --- Lógica para Adicionar/Remover Exames ---
    addExameBtn.addEventListener('click', () => {
        const exameNome = document.getElementById('exameNome').value.trim();
        const exameJustificativa = document.getElementById('exameJustificativa').value.trim();

        if (exameNome) {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('added-item');
            itemDiv.innerHTML = `
                <div class="item-details">
                    <strong>${exameNome}</strong> ${exameJustificativa ? `(Justificativa: ${exameJustificativa})` : ''}
                </div>
                <button type="button" class="item-remove-btn">Remover</button>
            `;
            exameList.appendChild(itemDiv);

            // Adiciona evento para remover o item
            itemDiv.querySelector('.item-remove-btn').addEventListener('click', () => {
                itemDiv.remove();
            });

            // Limpa os campos
            document.getElementById('exameNome').value = '';
            document.getElementById('exameJustificativa').value = '';
        } else {
            alert('Por favor, preencha o nome do exame.');
        }
    });

    // --- Lógica para Gerar Atestado/Declaração ---
    gerarAtestadoBtn.addEventListener('click', () => {
        const tipoDocumento = document.getElementById('tipoDocumento').value;
        const diasAfastamento = document.getElementById('diasAfastamento').value;
        const textoAtestado = document.getElementById('textoAtestado').value.trim();

        if (!tipoDocumento) {
            alert('Por favor, selecione o tipo de documento (Atestado ou Declaração).');
            return;
        }

        let atestadoContent = `Hospital Connect\n\n`;
        atestadoContent += `Atesto para os devidos fins que o(a) paciente ${document.getElementById('infoPacienteNome').textContent.replace('Paciente: ', '')},\n`;
        atestadoContent += `esteve em atendimento médico nesta unidade em ${document.getElementById('infoConsultaData').textContent} às ${document.getElementById('infoConsultaHora').textContent}.\n\n`;

        if (tipoDocumento === 'atestado') {
            const dias = parseInt(diasAfastamento);
            if (isNaN(dias) || dias < 0) {
                alert('Por favor, insira um número válido de dias de afastamento para o atestado.');
                return;
            }
            atestadoContent += `Necessita de afastamento de suas atividades por ${dias} dia(s) a partir desta data.\n\n`;
        } else if (tipoDocumento === 'declaracao') {
            atestadoContent += `Apenas declaração de comparecimento.\n\n`;
        }

        if (textoAtestado) {
            atestadoContent += `Observações: ${textoAtestado}\n\n`;
        }

        atestadoContent += `Dr(a). ${medicoNome} - CRM: XXXX\n`;
        atestadoContent += `Data de Emissão: ${new Date().toLocaleDateString('pt-BR')}\n`;

        // Simula a geração de um PDF ou um arquivo de texto
        if (confirm('Deseja realmente gerar este documento? (Seria um PDF no sistema real)')) {
            alert('Documento gerado com sucesso! (Em um sistema real, um PDF seria baixado ou salvo no histórico do paciente)');
            console.log("Conteúdo do Documento:\n", atestadoContent);
            // Em um sistema real, você faria uma chamada ao backend para gerar o PDF
            // e então o paciente poderia acessá-lo no histórico.
        }
    });

    // --- Lógica para Salvar e Finalizar Consulta ---
    atendimentoForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão

        // Validações principais
        let isValid = true;
        isValid = validateField('anamnese', 'anamneseError', 'A anamnese é obrigatória.') && isValid;
        isValid = validateField('evolucao', 'evolucaoError', 'A evolução clínica é obrigatória.') && isValid;

        if (isValid) {
            // Coletar todos os dados do formulário
            const atendimentoData = {
                pacienteNome: document.getElementById('infoPacienteNome').textContent.replace('Paciente: ', ''),
                consultaData: document.getElementById('infoConsultaData').textContent,
                consultaHora: document.getElementById('infoConsultaHora').textContent,
                anamnese: document.getElementById('anamnese').value.trim(),
                evolucao: document.getElementById('evolucao').value.trim(),
                diagnostico: document.getElementById('diagnostico').value.trim(),
                medicamentos: [],
                exames: [],
                atestado: {
                    tipo: document.getElementById('tipoDocumento').value,
                    diasAfastamento: document.getElementById('diasAfastamento').value,
                    textoAdicional: document.getElementById('textoAtestado').value.trim()
                }
            };

            // Coleta medicamentos
            medicamentosList.querySelectorAll('.added-item').forEach(item => {
                const details = item.querySelector('.item-details').textContent;
                // Exemplo simplificado de como extrair dados, em um sistema real, você salvaria os campos originais
                const match = details.match(/(.*?) - (.*?) \((.*?)\)/);
                if (match) {
                    atendimentoData.medicamentos.push({
                        nome: match[1].trim(),
                        dosagem: match[2].trim(),
                        posologia: match[3].trim()
                    });
                }
            });

            // Coleta exames
            exameList.querySelectorAll('.added-item').forEach(item => {
                const details = item.querySelector('.item-details').textContent;
                const match = details.match(/(.*?)(?:\s+\(Justificativa:\s*(.*?)\))?$/);
                if (match) {
                    atendimentoData.exames.push({
                        nome: match[1].trim(),
                        justificativa: match[2] ? match[2].trim() : ''
                    });
                }
            });

            console.log('Dados do Atendimento a serem salvos:', atendimentoData);
            alert('Atendimento salvo com sucesso! (Dados seriam enviados ao backend)');
            // Em um sistema real, você enviaria atendimentoData para o backend
            // fetch('/api/atendimentos/salvar', { method: 'POST', body: JSON.stringify(atendimentoData), headers: { 'Content-Type': 'application/json' }})
            //    .then(response => response.json())
            //    .then(data => alert('Atendimento salvo!'))
            //    .catch(error => console.error('Erro ao salvar:', error));
        } else {
            alert('Por favor, preencha todos os campos obrigatórios antes de salvar.');
        }
    });

    finalizarConsultaBtn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja finalizar esta consulta? (Isso geralmente fecha o atendimento e salva tudo)')) {
            alert('Consulta finalizada! (Lógica de backend para marcar como finalizada)');
            // Em um sistema real, após finalizar, você poderia redirecionar para o dashboard ou agenda
            window.location.href = 'medico_dashboard.html'; 
        }
    });
});