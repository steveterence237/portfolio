// ===== Thème clair / sombre =====
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');

try {
  const saved = localStorage.getItem('theme');
  if (saved) root.dataset.theme = saved;
} catch (e) { /* stockage indisponible : on garde le thème par défaut */ }

themeBtn.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// ===== Menu mobile =====
const navLinks = document.getElementById('navLinks');
document.getElementById('hamburger').addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => navLinks.classList.remove('active'))
);

// ===== Bouton retour en haut =====
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('show', window.scrollY > 300);
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== Formulaire : ouvre ton application mail avec le message prêt =====
const EMAIL = 'ton.email@exemple.com'; // <-- remplace par ton adresse
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    feedback.textContent = 'Remplis tous les champs.';
    return;
  }
  if (!email.includes('@') || !email.includes('.')) {
    feedback.textContent = 'Entre une adresse email valide.';
    return;
  }

  const subject = encodeURIComponent('Message de ' + name);
  const body = encodeURIComponent(message + '\n\n' + name + ' (' + email + ')');
  window.location.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
  feedback.textContent = 'Ton application mail va s’ouvrir.';
  form.reset();
});
