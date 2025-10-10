const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const html = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');

// Determine and apply saved theme or auto-detect
let savedTheme = localStorage.getItem('theme');
if (!savedTheme || savedTheme === 'auto') {
  savedTheme = prefersDark ? 'dark' : 'light';
}
html.setAttribute('data-theme', savedTheme);
toggleBtn.textContent = `theme: ${localStorage.getItem('theme') || 'auto'}`;

// Toggle theme in a cycle: auto → light → dark → auto
toggleBtn.onclick = () => {
  const current = localStorage.getItem('theme') || 'auto';
  let next;

  if (current === 'auto') {
    next = 'light';
  } else if (current === 'light') {
    next = 'dark';
  } else {
    next = 'auto';
  }

  // Save the theme and apply it
  localStorage.setItem('theme', next);
  toggleBtn.textContent = `theme: ${next}`;

  if (next === 'auto') {
    html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    html.setAttribute('data-theme', next);
  }
};
