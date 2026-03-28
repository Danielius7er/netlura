const themeToggle = document.getElementById('theme-toggle');

/**
 * Read the theme selected by the user from localStorage.
 * @returns {string | null}
 */
const getSavedTheme = () => localStorage.getItem('netflixTheme');

/**
 * Read the preferred theme from the operating system.
 * @returns {string}
 */
const getPreferredTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

/**
 * Apply the theme to the document and persist the choice.
 * @param {string} theme
 */
const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? 'Modo claro' : 'Modo escuro';
    localStorage.setItem('netflixTheme', theme);
};
 
/**
 * Toggle between dark and light mode.
 */
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
};

/**
 * Save the selected profile to localStorage before navigation.
 * @param {MouseEvent} event
 */
const saveSelectedProfile = (event) => {
    const card = event.currentTarget;
    const name = card.dataset.name;
    const image = card.dataset.image;

    if (name && image) {
        localStorage.setItem('perfilAtivoNome', name);
        localStorage.setItem('perfilAtivoImagem', image);
    }
};

/**
 * Initialize page settings after DOM content is ready.
 */
const initTheme = () => {
    const savedTheme = getSavedTheme();
    const theme = savedTheme || getPreferredTheme();
    applyTheme(theme);
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    themeToggle.addEventListener('click', toggleTheme);

    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach((card) => {
        card.addEventListener('click', saveSelectedProfile);
    });
});
