const themeToggle = document.getElementById('theme-toggle');

const getSavedTheme = () => localStorage.getItem('netflixTheme');
const getPreferredTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? 'Modo claro' : 'Modo escuro';
    localStorage.setItem('netflixTheme', theme);
};
 
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
};

const initTheme = () => {
    const savedTheme = getSavedTheme();
    const theme = savedTheme || getPreferredTheme();
    applyTheme(theme);
};

const saveSelectedProfile = (event) => {
    const card = event.currentTarget;
    const nome = card.dataset.name;
    const imagem = card.dataset.image;

    if (nome && imagem) {
        localStorage.setItem('perfilAtivoNome', nome);
        localStorage.setItem('perfilAtivoImagem', imagem);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    themeToggle.addEventListener('click', toggleTheme);

    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach((card) => {
        card.addEventListener('click', saveSelectedProfile);
    });
});
