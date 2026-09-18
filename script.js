
(function () {
  'use strict';

  /* ── Custom Cursor ── */
  const cur  = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  (function animateCursor() {
    cur.style.left  = mx + 'px';
    cur.style.top   = my + 'px';
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateCursor);
  })();


  // Enlarge ring on interactive elements
  document.querySelectorAll('a, button, .proj-card, .cert-card, .platform-card, .tool-chip').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width   = '56px';
      ring.style.height  = '56px';
      ring.style.opacity = '.7';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width   = '34px';
      ring.style.height  = '34px';
      ring.style.opacity = '.45';
    });
  });

  /* ── Dynamic greeting & live time ── */
  const heroDesc = document.querySelector('.hero-desc');
  if (heroDesc) {
    const greeting = document.createElement('p');
    greeting.className = 'hero-greeting';
    heroDesc.appendChild(greeting);

    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();
      let message = 'Welcome to my portfolio';

      if (hour < 12) message = 'Good morning 👋 Welcome to my portfolio';
      else if (hour < 18) message = 'Good afternoon 👋 Welcome to my portfolio';
      else message = 'Good evening 🌙 Welcome to my portfolio';

      greeting.textContent = `${message} | ${now.toLocaleString()}`;
    };

    updateGreeting();
    setInterval(updateGreeting, 1000);
  }

  /* ── Hero Floating Particles ── */
  const particleContainer = document.getElementById('particles');
  if (particleContainer) {
    const colors = [
      'rgba(45,212,191,0.55)',
      'rgba(59,130,246,0.5)',
      'rgba(129,140,248,0.45)'
    ];
    for (let i = 0; i < 20; i++) {
      const d = document.createElement('div');
      const size = Math.random() * 3 + 1;
      d.className = 'particle';
      Object.assign(d.style, {
        width:             size + 'px',
        height:            size + 'px',
        left:              Math.random() * 100 + '%',
        background:        colors[Math.floor(Math.random() * colors.length)],
        animationDuration: (Math.random() * 16 + 10) + 's',
        animationDelay:    (Math.random() * 12) + 's'
      });
      particleContainer.appendChild(d);
    }
  }

  /* ── Scroll Reveal ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.09 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Skill Bar Animation ── */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          const target = parseFloat(bar.getAttribute('data-width'));
          bar.style.transform = `scaleX(${target})`;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  const skillGrid = document.querySelector('.skills-grid');
  if (skillGrid) skillObserver.observe(skillGrid);

  /* ── Active Nav Highlight on Scroll ── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks  = document.querySelectorAll('nav a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--teal)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObserver.observe(s));

  /* ── Navbar background on scroll ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(8,12,16,0.97)';
    } else {
      nav.style.background = 'rgba(8,12,16,0.9)';
    }
  });

  /* ── Typing effect for hero role line ── */
  const roleEl = document.querySelector('.hero-role');
  if (roleEl) {
    const roles = [
      'Data Analyst · Business Intelligence Specialist · Statistical Modeler',
      'Turning Data into Intelligence 🚀',
      'Building Predictive Models · Driving Insights',
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeRole() {
      const current = roles[roleIndex];
      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      roleEl.innerHTML = `${current.substring(0, charIndex)}`;

      let speed = isDeleting ? 40 : 70;
      if (!isDeleting && charIndex === current.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
      }
      setTimeout(typeRole, speed);
    }

    // Start typing after hero animations settle
    setTimeout(typeRole, 1400);
  }

  /* ── Counter animation for stats ── */
  function animateCounter(el, target, suffix) {
    let current = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(interval);
    }, 40);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.hero-stat-num').forEach(el => {
          const raw = el.textContent.trim();
          const num = parseInt(raw);
          const suf = raw.replace(String(num), '');
          animateCounter(el, num, suf);
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsRow = document.querySelector('.hero-stats');
  if (statsRow) statObserver.observe(statsRow);

  /* ── Contact form submission ── */
  const formBtn = document.querySelector('.form-submit');
  if (formBtn) {
    formBtn.addEventListener('click', (e) => {
      e.preventDefault();
      formBtn.textContent = '✓ Message Sent!';
      formBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      setTimeout(() => {
        formBtn.textContent = 'Send Message 🚀';
        formBtn.style.background = '';
      }, 3000);
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
