const header = document.getElementById('site-header');
const menuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const yearEl = document.getElementById('year');

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 50);
};

window.addEventListener('scroll', setHeaderState, { passive: true });
setHeaderState();

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('[data-reveal]');

revealItems.forEach((item) => {
  item.classList.add('reveal');
});

if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => observer.observe(item));
}
