import CIBeforeAfter from '@cloudimage/before-after';
import { initConfigurator } from './configurator';

// Local demo images
import kitchenBefore from './images/kitchen-before.svg';
import kitchenAfter from './images/kitchen-after.svg';

// === Nav behaviour ===
const nav = document.getElementById('demo-nav');
const burger = document.getElementById('nav-burger');
const navLinks = nav?.querySelector('.demo-nav-links');

// Burger toggle
burger?.addEventListener('click', () => {
  const isOpen = nav!.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(isOpen));
});

// Close menu on link click (mobile)
navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    burger?.setAttribute('aria-expanded', 'false');
  });
});

// Scroll shadow
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

// Active link tracking
const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));
const links = Array.from(navLinks?.querySelectorAll('a') ?? []);

function updateActiveLink(): void {
  const scrollY = window.scrollY + 100;
  let current = '';
  for (const section of sections) {
    if (section.offsetTop <= scrollY) current = section.id;
  }
  links.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();
import landscapeBefore from './images/landscape-before.svg';
import landscapeAfter from './images/landscape-after.svg';

// Hero slider
new CIBeforeAfter('#hero-slider', {
  beforeSrc: kitchenBefore,
  afterSrc: kitchenAfter,
  beforeAlt: 'Kitchen before renovation',
  afterAlt: 'Kitchen after renovation',
  zoom: true,
  labels: { before: 'Before', after: 'After' },
  animate: { duration: 1000 },
  theme: 'dark',
  handleStyle: 'arrows',
});

// Interaction modes
new CIBeforeAfter('#mode-drag', {
  beforeSrc: landscapeBefore,
  afterSrc: landscapeAfter,
  mode: 'drag',
  labels: { before: 'Before', after: 'After' },
  fullscreenButton: false,
});

new CIBeforeAfter('#mode-hover', {
  beforeSrc: landscapeBefore,
  afterSrc: landscapeAfter,
  mode: 'hover',
  labels: { before: 'Before', after: 'After' },
  fullscreenButton: false,
});

new CIBeforeAfter('#mode-click', {
  beforeSrc: landscapeBefore,
  afterSrc: landscapeAfter,
  mode: 'click',
  labels: { before: 'Before', after: 'After' },
  fullscreenButton: false,
});

// Orientations
new CIBeforeAfter('#orientation-horizontal', {
  beforeSrc: kitchenBefore,
  afterSrc: kitchenAfter,
  orientation: 'horizontal',
  labels: true,
  fullscreenButton: false,
});

new CIBeforeAfter('#orientation-vertical', {
  beforeSrc: kitchenBefore,
  afterSrc: kitchenAfter,
  orientation: 'vertical',
  labels: true,
  fullscreenButton: false,
});

// Themes
new CIBeforeAfter('#theme-light', {
  beforeSrc: landscapeBefore,
  afterSrc: landscapeAfter,
  theme: 'light',
  labels: true,
  fullscreenButton: false,
});

new CIBeforeAfter('#theme-dark', {
  beforeSrc: landscapeBefore,
  afterSrc: landscapeAfter,
  theme: 'dark',
  labels: true,
  fullscreenButton: false,
});

// Zoom demo
new CIBeforeAfter('#zoom-demo', {
  beforeSrc: kitchenBefore,
  afterSrc: kitchenAfter,
  zoom: true,
  zoomMax: 4,
  labels: { before: 'Original', after: 'Renovated' },
  handleStyle: 'arrows',
});

// Interactive configurator
initConfigurator();

// === Copy-to-clipboard for all code blocks (except configurator, handled there) ===
document.querySelectorAll('.demo-code-wrap .demo-copy-btn').forEach((btn) => {
  // Skip the configurator copy button — it's wired up in configurator.ts
  if (btn.id === 'copy-code-btn') return;

  btn.addEventListener('click', () => {
    const code = btn.closest('.demo-code-wrap')?.querySelector('code');
    if (!code) return;
    navigator.clipboard.writeText(code.textContent || '').then(() => {
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 2000);
    });
  });
});
