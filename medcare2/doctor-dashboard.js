document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const logoutBtn = document.querySelector('.logout-btn');

    // Função para mostrar a seção ativa e esconder as outras
    const showSection = (targetId) => {
        contentSections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    };

    // Função para ativar o link de navegação correto
    const activateNavLink = (targetId) => {
        navLinks.forEach(link => {
            if (link.dataset.target === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // Adiciona evento de clique aos links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link
            const targetId = link.dataset.target; // Pega o ID da seção alvo
            showSection(targetId);
            activateNavLink(targetId);
        });
    });

    // Manipulador para o botão de "Sair"
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link
            const confirmLogout = confirm('Tem certeza que deseja sair do painel?');
            if (confirmLogout) {
                window.location.href = 'doctor-login.html'; // Redireciona para a página de login
            }
        });
    }

    // Defina a data mínima para o campo de data de consulta
    const consultationDateInput = document.getElementById('consultationDate');
    if (consultationDateInput) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        const year = today.getFullYear();
        const minDate = `${year}-${month}-${day}`;
        consultationDateInput.setAttribute('min', minDate);
    }

    // Ações para a tabela de consultas (botões "Ver" e "Editar")
    const viewAppointmentModal = document.getElementById('viewAppointmentModal');
    const closeModalButton = document.getElementById('closeModalButton');
    const closeButtonSpan = viewAppointmentModal ? viewAppointmentModal.querySelector('.close-button') : null; // O "x" no canto

    const modalPatientName = document.getElementById('modalPatientName');
    const modalConsultationDate = document.getElementById('modalConsultationDate');
    const modalConsultationTime = document.getElementById('modalConsultationTime');
    const modalPatientPhone = document.getElementById('modalPatientPhone');
    const modalConsultationStatus = document.getElementById('modalConsultationStatus');
    const modalMainComplaint = document.getElementById('modalMainComplaint');
    const modalDiagnosis = document.getElementById('modalDiagnosis');
    const modalMedications = document.getElementById('modalMedications');
    const modalObservations = document.getElementById('modalObservations');
    const editModalButton = document.getElementById('editModalButton');

    // Dados simulados de exemplo para detalhes da consulta (em um sistema real, viriam do backend)
    const simulatedConsultationDetails = {
        'Maria Oliveira': {
            mainComplaint: 'Dor de cabeça persistente há 3 dias, acompanhada de sensibilidade à luz.',
            diagnosis: 'Cefaleia tensional. Descartado migrânea e outras causas neurológicas.',
            medications: 'Paracetamol 500mg, 1 comprimido a cada 6 horas se dor. Relaxante muscular 5mg à noite.',
            observations: 'Paciente orientada sobre hidratação e repouso. Retorno em 7 dias se sintomas persistirem. Sugerido evitar telas por longos períodos.'
        },
        'João Pereira': {
            mainComplaint: 'Febre alta (39°C), tosse seca e dor de garganta.',
            diagnosis: 'Infecção de vias aéreas superiores (IVAS), provavelmente viral.',
            medications: 'Dipirona 1g, 1 comprimido a cada 6 horas para febre/dor. Xarope para tosse (ambroxol) 5ml, 3x ao dia.',
            observations: 'Repouso, hidratação. Alerta para procurar PA se dificuldade respiratória. Exame de COVID-19 solicitado (resultado pendente).'
        },
        'Beatriz Santos': {
            mainComplaint: 'Dor abdominal no quadrante inferior direito, náuseas.',
            diagnosis: 'Gastrite leve, provável dispepsia funcional. Descartado apendicite por exame físico.',
            medications: 'Omeprazol 20mg, 1 comprimido antes do café da manhã por 14 dias. Buscopan para cólicas se necessário.',
            observations: 'Orientação dietética. Evitar alimentos gordurosos e condimentados. Acompanhamento clínico em 10 dias. Solicitação de endoscopia caso não haja melhora.'
        },
        'Ana Souza': {
            mainComplaint: 'Queimação ao urinar, aumento da frequência urinária.',
            diagnosis: 'Infecção do Trato Urinário (ITU) não complicada.',
            medications: 'Ciprofloxacino 500mg, 1 comprimido a cada 12 horas por 7 dias. Analgésico urinário conforme necessidade.',
            observations: 'Hidratação abundante. Evitar reter urina. Retorno se não houver melhora em 48h. Cultura de urina solicitada.'
        },
        'Carlos Lima': {
            mainComplaint: 'Dificuldade para dormir, ansiedade e palpitações.',
            diagnosis: 'Transtorno de ansiedade generalizada (TAG) leve.',
            medications: 'Fitoterápico calmante (Valeriana) 1 cápsula à noite. Orientação para higiene do sono.',
            observations: 'Sugestão de terapia cognitivo-comportamental. Avaliação psiquiátrica se sintomas se agravarem. Reavaliação em 3 semanas.'
        },
        'Lucas Martins': {
            mainComplaint: 'Erupções cutâneas pruriginosas no braço e pescoço.',
            diagnosis: 'Dermatite de contato, provável reação alérgica.',
            medications: 'Creme de hidrocortisona a 1%, aplicar 2x ao dia. Anti-histamínico oral (loratadina) à noite.',
            observations: 'Identificar e evitar o agente causador. Não coçar. Retorno se não houver melhora ou piora das lesões.'
        },
        'Carla Fernandes': {
            mainComplaint: 'Cansaço excessivo, palidez, falta de ar aos esforços.',
            diagnosis: 'Anemia ferropriva (suspeita).',
            medications: 'Sulfato Ferroso 300mg, 1 comprimido ao dia. Suplemento de Vitamina C.',
            observations: 'Solicitado hemograma completo, ferritina e ferro sérico. Orientação sobre dieta rica em ferro. Reavaliação com resultados dos exames.'
        },
        'Rafael Gomes': {
            mainComplaint: 'Dor no joelho esquerdo após atividade física intensa.',
            diagnosis: 'Tendinite patelar (suspeita).',
            medications: 'Anti-inflamatório não esteroidal (AINE) tópico, aplicar 2x ao dia. Analgésico oral se dor forte.',
            observations: 'Repouso relativo. Compressas de gelo. Fisioterapia recomendada. Evitar atividades de alto impacto. Reavaliação em 15 dias.'
        },
        'Juliana Costa': {
            mainComplaint: 'Pressão alta verificada em casa, dor na nuca.',
            diagnosis: 'Hipertensão arterial sistêmica (HAS) recém-diagnosticada. Crise hipertensiva controlada.',
            medications: 'Losartana 50mg, 1 comprimido ao dia. Diurético (hidroclorotiazida) 12.5mg ao dia.',
            observations: 'Orientação sobre mudança de estilo de vida (dieta hipossódica, exercícios). Monitoramento da pressão arterial em casa. Retorno em 7 dias para ajuste de dose.'
        },
        'Fernando Dantas': {
            mainComplaint: 'Aumento de peso, fadiga, queda de cabelo.',
            diagnosis: 'Hipotireoidismo (suspeita).',
            medications: 'Nenhum medicamento prescrito ainda.',
            observations: 'Solicitado TSH e T4 livre. Orientação sobre sintomas. Retorno com resultados dos exames para confirmação diagnóstica e início de tratamento.'
        }
    };

    document.querySelectorAll('.consultations-table .actions button').forEach(button => {
        button.addEventListener('click', (event) => {
            const action = event.currentTarget.textContent.trim();
            const row = event.currentTarget.closest('tr');
            const patientName = row.children[0].textContent;
            const consultationDate = row.children[1].textContent;
            const consultationTime = row.children[2].textContent;
            const patientPhone = row.children[3].textContent;
            const consultationStatus = row.children[4].querySelector('.status-badge').textContent;
            const statusClass = row.children[4].querySelector('.status-badge').className.split(' ').find(cls => cls.startsWith('status-badge'));

            if (action.includes('Ver')) {
                // Preenche o modal com os dados da linha
                modalPatientName.textContent = patientName;
                modalConsultationDate.textContent = consultationDate;
                modalConsultationTime.textContent = consultationTime;
                modalPatientPhone.textContent = patientPhone;
                modalConsultationStatus.textContent = consultationStatus;
                modalConsultationStatus.className = `status-badge ${statusClass.replace('status-badge', '').trim()}`; // Re-aplica a classe de status

                // Preenche com dados simulados detalhados
                const details = simulatedConsultationDetails[patientName] || {
                    mainComplaint: 'N/A',
                    diagnosis: 'N/A',
                    medications: 'Nenhum medicamento prescrito.',
                    observations: 'Sem observações adicionais.'
                };
                modalMainComplaint.textContent = details.mainComplaint;
                modalDiagnosis.textContent = details.diagnosis;
                modalMedications.textContent = details.medications;
                modalObservations.textContent = details.observations;

                viewAppointmentModal.classList.add('active'); // Mostra o modal
            } else if (action.includes('Editar')) {
                // Aqui, em um sistema real, você pré-preencheria o formulário de registro de consulta
                // com os dados do paciente para edição.
                alert(`Simulando edição da consulta do paciente: ${patientName}.`);
                // Redireciona/ativa a seção de registro de consulta para edição
                // showSection('record-appointment'); 
                // activateNavLink('record-appointment');
            }
        });
    });

    // Fechar o modal ao clicar no 'x' ou no botão 'Fechar'
    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            viewAppointmentModal.classList.remove('active');
        });
    }

    if (closeButtonSpan) {
        closeButtonSpan.addEventListener('click', () => {
            viewAppointmentModal.classList.remove('active');
        });
    }

    // Fechar o modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === viewAppointmentModal) {
            viewAppointmentModal.classList.remove('active');
        }
    });

    // Simular o botão "Editar Consulta" dentro do modal (opcional)
    if (editModalButton) {
        editModalButton.addEventListener('click', () => {
            const patientName = modalPatientName.textContent;
            alert(`Você clicou em editar consulta para ${patientName} (simulado).`);
            viewAppointmentModal.classList.remove('active'); // Fecha o modal
            // Em um sistema real, você carregaria os dados no formulário de edição
            showSection('record-appointment');
            activateNavLink('record-appointment');
            // Aqui você pode adicionar lógica para pré-popular o formulário 'record-appointment'
            // com os dados da consulta que estava sendo visualizada.
            // Ex: document.getElementById('patientName').value = patientName;
        });
    }
}); // <-- chave de fechamento adicionada aqui
