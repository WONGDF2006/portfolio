// Dark mode toggle: starts from the system setting, remembers the visitor's choice.
const toggle = document.querySelector('#theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === 'dark';
  toggle.setAttribute('aria-pressed', String(dark));
  toggle.querySelector('.label').textContent = dark ? 'Light mode' : 'Dark mode';
}

let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) { /* storage blocked: just follow the system */ }
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved || (systemDark ? 'dark' : 'light'));

toggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) { /* not saved, still switches */ }
});
