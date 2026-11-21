// Project filter: builds one button per technology from the cards' data-tech, then shows/hides cards.
const cards = [...document.querySelectorAll('#project-list .project-card')];
const bar = document.querySelector('#filter-bar');
const count = document.querySelector('#result-count');

const technologies = [...new Set(cards.flatMap((card) => card.dataset.tech.split(',')))].sort();

function applyFilter(choice) {
  let shown = 0;
  cards.forEach((card) => {
    const match = choice === 'All' || card.dataset.tech.split(',').includes(choice);
    card.hidden = !match;
    if (match) shown++;
  });
  bar.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.textContent === choice)));
  count.textContent = choice === 'All' ? `Showing all ${shown} projects` : `${shown} of ${cards.length} projects use ${choice}`;
}

['All', ...technologies].forEach((tech) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'filter-button';
  button.textContent = tech;
  button.addEventListener('click', () => applyFilter(tech));
  bar.appendChild(button);
});

applyFilter('All');
