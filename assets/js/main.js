/* Hamburger + sidebar */
const hamburger = document.getElementById('hamburgerBtn');
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('sidebar-overlay');
const closeBtn  = document.getElementById('sidebar-close');

function openMenu() {
  hamburger.classList.add('open');
  sidebar.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () =>
  sidebar.classList.contains('open') ? closeMenu() : openMenu()
);
overlay.addEventListener('click', closeMenu);
closeBtn.addEventListener('click', closeMenu);

// Close on any sidebar link click
document.querySelectorAll('.sidebar-link[data-close]').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close with Escape, and if the screen grows past the tablet breakpoint (matches responsive.css)
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});
window.matchMedia('(min-width: 992px)').addEventListener('change', e => {
  if (e.matches) closeMenu();
});

/* Scroll reveal */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

/* Navbar shadow on scroll */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(0,0,0,0.18)'
    : 'none';
}, { passive: true });

document.documentElement.style.scrollBehavior = "smooth";

/* Active navigation
   This is the Mentors page, so the Mentors link stays highlighted (set in the HTML).
   Other nav links are placeholders, so no scroll-based highlighting is needed. */