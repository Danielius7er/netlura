import { getYouTubeId, getRandomMatchScore, getRandomDuration, getRandomAgeBadge } from '../utils.js';

/**
 * Cria um card de filme com pré-visualização e controles básicos.
 * @param {Object} item
 * @returns {HTMLElement}
 */
export function createCard(item) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    if (item.progress) {
        card.classList.add('has-progress');
    }

    const img = document.createElement('img');
    img.src = item.img;
    img.alt = 'Capa da produção';

    const iframe = document.createElement('iframe');
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; encrypted-media';

    const videoId = getYouTubeId(item.youtube);

    card.appendChild(iframe);
    card.appendChild(img);

    const ageBadge = getRandomAgeBadge();

    const details = document.createElement('div');
    details.className = 'card-details';
    details.innerHTML = `
        <div class="details-buttons">
            <div class="left-buttons">
                <button class="btn-icon btn-play-icon" aria-label="Reproduzir"><i class="fas fa-play"></i></button>
                ${item.progress ? '<button class="btn-icon" aria-label="Continuar assistindo"><i class="fas fa-check"></i></button>' : '<button class="btn-icon" aria-label="Adicionar à minha lista"><i class="fas fa-plus"></i></button>'}
                <button class="btn-icon" aria-label="Curtir"><i class="fas fa-thumbs-up"></i></button>
            </div>
            <div class="right-buttons">
                <button class="btn-icon" aria-label="Mais informações"><i class="fas fa-chevron-down"></i></button>
            </div>
        </div>
        <div class="details-info">
            <span class="match-score">${getRandomMatchScore()}% relevante</span>
            <span class="age-badge ${ageBadge.class}">${ageBadge.text}</span>
            <span class="duration">${getRandomDuration(item.progress)}</span>
            <span class="resolution">HD</span>
        </div>
        <div class="details-tags">
            <span>Empolgante</span>
            <span>Animação</span>
            <span>Ficção</span>
        </div>
    `;
    card.appendChild(details);

    if (item.progress) {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar-container';

        const progressValue = document.createElement('div');
        progressValue.className = 'progress-value';
        progressValue.style.width = `${item.progress}%`;

        progressBar.appendChild(progressValue);
        card.appendChild(progressBar);
    }

    let previewTimeout;

    card.addEventListener('mouseenter', () => {
        const rect = card.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        if (rect.left < 100) {
            card.classList.add('origin-left');
        } else if (rect.right > windowWidth - 100) {
            card.classList.add('origin-right');
        }

        previewTimeout = setTimeout(() => {
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}`;
            iframe.classList.add('playing');
            img.classList.add('playing-video');
        }, 600);
    });

    card.addEventListener('mouseleave', () => {
        clearTimeout(previewTimeout);
        iframe.classList.remove('playing');
        img.classList.remove('playing-video');
        iframe.src = '';
        card.classList.remove('origin-left', 'origin-right');
    });

    return card;
}
