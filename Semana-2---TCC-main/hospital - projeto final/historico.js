document.addEventListener('DOMContentLoaded', () => {
    // Lógica para simular se há histórico de consultas ou não
    // Em um sistema real, você faria uma requisição para o backend aqui
    const hasHistorico = true; // Altere para 'false' para testar a mensagem de "nenhum histórico"

    const historicoList = document.getElementById('historicoList');
    const noHistoricoMessage = document.getElementById('noHistoricoMessage');

    if (hasHistorico) {
        historicoList.style.display = 'flex'; // Mostra a lista de histórico
        noHistoricoMessage.style.display = 'none'; // Esconde a mensagem
    } else {
        historicoList.style.display = 'none'; // Esconde a lista de histórico
        noHistoricoMessage.style.display = 'block'; // Mostra a mensagem
    }

    // Adiciona evento de clique para o botão "Ver Receitas/Documentos"
document.querySelectorAll('.btn-view-details').forEach(button => {
    button.addEventListener('click', (event) => {
        const historicoItem = event.target.closest('.historico-item');
        const data = historicoItem.querySelector('.historico-date').textContent;
        const medico = historicoItem.querySelector('.historico-doctor').textContent;

        // Simulação de como você buscaria e exibira os documentos
        alert(`Buscando documentos para a consulta de ${data} com ${medico}. (Em um sistema real, aqui você faria uma chamada ao backend para obter os documentos e exibi-los em um modal ou nova página.)`);

        // Futuramente, você faria algo como:
        // const consultaId = historicoItem.dataset.consultaId; // Assumindo que você terá um ID no HTML
        // fetch(`/api/consultas/${consultaId}/documentos`)
        //     .then(response => response.json())
        //     .then(documentos => {
        //         // Lógica para exibir os documentos (ex: abrir um modal, listar PDFs)
        //         console.log('Documentos recebidos:', documentos);
        //         // displayDocumentsInModal(documentos);
        //     })
        //     .catch(error => console.error('Erro ao buscar documentos:', error));
    });
});

    // Adiciona evento de clique para o botão "Agendar Nova Consulta" (na área de ação)
    document.querySelectorAll('.action-area .btn-primary, .no-historico .btn-primary').forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = 'agendamento.html'
            // window.location.href = 'agendamento.html'; // Futuramente, você pode criar esta página
        });
    });

     // Altera o link do menu de navegação "Minhas Consultas" para o arquivo correto
    document.querySelector('.nav-menu a[href="#"]').setAttribute('href', 'consultas.html');
});