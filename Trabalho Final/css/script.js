// Função para detectar dispositivos móveis
function isMobile() {
    return window.innerWidth <= 1023;
}

// Callback armazenada para referência
let dropdownClickHandler = function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    const dropdown = this.parentElement;
    dropdown.classList.toggle('active'); // Alterna a classe active

    // Fecha outros dropdowns se necessário
    document.querySelectorAll('.dropdown').forEach(function(otherDropdown) {
        if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('active');
        }
    });
};

// Função para ativar o menu dropdown no mobile
function activateMobileDropdown() {
    document.querySelectorAll('.dropdown > a').forEach(function(dropdownToggle) {
        dropdownToggle.addEventListener('click', dropdownClickHandler); // Aplica o evento
    });

    // Fecha o dropdown ao clicar fora
    document.addEventListener('click', closeDropdownsOnClickOutside);
}

// Função para desativar o dropdown no desktop
function deactivateMobileDropdown() {
    document.querySelectorAll('.dropdown > a').forEach(function(dropdownToggle) {
        dropdownToggle.removeEventListener('click', dropdownClickHandler); // Remove o evento de clique
    });

    // Remove o evento de fechar ao clicar fora
    document.removeEventListener('click', closeDropdownsOnClickOutside);
}

// Função para fechar dropdowns ao clicar fora (com referência)
function closeDropdownsOnClickOutside(event) {
    if (!event.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(function(dropdown) {
            dropdown.classList.remove('active');
        });
    }
}

// Função para gerenciar a ativação do menu dependendo do tamanho da tela
function handleResize() {
    if (isMobile()) {
        activateMobileDropdown();
    } else {
        deactivateMobileDropdown(); // Remove eventos de clique quando for desktop
        document.querySelectorAll('.dropdown').forEach(function(dropdown) {
            dropdown.classList.remove('active'); // Remove classes 'active' ao mudar para desktop
        });
    }
}

// Executa a verificação ao carregar a página
handleResize();

// Verifica quando a tela é redimensionada
window.addEventListener('resize', handleResize);
