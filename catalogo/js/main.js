import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';

/**
 * Render the active profile and load carousel sections.
 */
document.addEventListener('DOMContentLoaded', () => {
    const activeProfileName = localStorage.getItem('perfilAtivoNome');
    const activeProfileImage = localStorage.getItem('perfilAtivoImagem');

    if (activeProfileName && activeProfileImage) {
        const profileNameLink = document.querySelector('.kids-link');
        const profileIcon = document.querySelector('.profile-icon');

        if (profileNameLink) profileNameLink.textContent = activeProfileName;
        if (profileIcon) profileIcon.src = activeProfileImage;
    }

    const container = document.getElementById('main-content');
    if (!container) return;

    categories.forEach((category) => {
        const carousel = createCarousel(category);
        container.appendChild(carousel);
    });
});
