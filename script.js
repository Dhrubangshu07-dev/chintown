/* ─── THE CHINA TOWN — Main Script ─── */

// ─── NAV SCROLL ───
(function() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ─── HAMBURGER ───
(function() {
  const btn = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    links.classList.toggle('open');
    btn.classList.toggle('active');
  });
  // close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('active');
    });
  });
})();

// ─── SCROLL REVEAL ───
(function() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

// ─── COUNTER ANIMATION ───
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
}

// trigger counters once in viewport
(function() {
  const statsSection = document.querySelector('.stats-section');
  if (!statsSection) return;
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      io.disconnect();
    }
  }, { threshold: 0.3 });
  io.observe(statsSection);
})();

// ─── ACTIVE NAV LINK ───
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html') || (path === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ─── MENU FILTER & VEG TOGGLE ─── (handled inline in menu.html)

// ─── REVIEW STARS ───
(function() {
  document.querySelectorAll('.star-fill').forEach(bar => {
    const pct = bar.dataset.pct;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.transition = 'width 1s ease';
      bar.style.width = pct + '%';
    }, 400);
  });
})();

// ─── PARALLAX HERO ───
(function() {
  const hero = document.querySelector('.hero-bg');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    hero.style.transform = `translateY(${y * 0.35}px)`;
  }, { passive: true });
})();