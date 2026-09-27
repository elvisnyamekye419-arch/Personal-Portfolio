/* =========================================================
   ELVIS NYAMEKYE — PORTFOLIO SCRIPT
   Theme: "The Desk" — no broadcast bits here, just the
   interactions a working newsroom page needs.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Hero role cycler (typewriter) ---------- */
  const roles = [
    'Front-End Developer',
    'Student Journalist',
    'Mental Health Advocate',
    'Public Speaker',
    'CS Student, UDS Nyankpala'
  ];
  const roleEl = document.getElementById('roleCycle');

  if (roleEl) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = false;

    function tick() {
      const current = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        if (charIndex > current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        if (charIndex < 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          charIndex = 0;
        }
      }

      roleEl.textContent = current.slice(0, charIndex) || roles[roleIndex].slice(0, 1);
      const delay = deleting ? 35 : 65;
      setTimeout(tick, delay);
    }

    // Kick off after the initial static text has been visible briefly
    setTimeout(() => {
      charIndex = 0;
      roleEl.textContent = '';
      tick();
    }, 1800);
  }

  /* ---------- Desk tabs (Focus section) ---------- */
  const deskTabs = document.querySelectorAll('.desk-tab');
  const deskPanels = document.querySelectorAll('.desk-panel');

  deskTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      deskTabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      deskPanels.forEach(p => p.classList.remove('is-active'));

      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      document.getElementById(tab.dataset.target).classList.add('is-active');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.skill-card, .project-card, .journey-highlight, .role-list li, .contact-card, .about-grid, .journey-grid'
  );

  if ('IntersectionObserver' in window) {
    revealTargets.forEach(el => el.classList.add('reveal-init'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => observer.observe(el));
  }

  /* ---------- Award stamp: slams into place on scroll ---------- */
  const stamp = document.querySelector('.award-stamp');
  if (stamp && 'IntersectionObserver' in window) {
    stamp.classList.add('stamp-init');
    const stampObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('stamp-in');
          stampObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    stampObserver.observe(stamp);
  }

  /* ---------- Sticky nav shadow on scroll ---------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 12
        ? '0 4px 20px rgba(0,0,0,0.08)'
        : 'none';
    }, { passive: true });
  }

  /* ---------- Back to top button ---------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Contact form - WhatsApp ---------- */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('formStatus');

  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = 'Please fill in your name, email, and message.';
        status.style.color = '#B23A2E';
        return;
      }

      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const subject = form.querySelector('#subject').value.trim();
      const message = form.querySelector('#message').value.trim();

      // Your WhatsApp number
      const phone = '233544597981';

      // Message that will appear in WhatsApp
      const whatsappMessage = `Hello Elvis,

Name: ${name}
Email: ${email}
Subject: ${subject || 'No subject'}

Message:
${message}`;

      // Create WhatsApp link
      const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;

      // Open WhatsApp
      window.open(whatsappURL, '_blank');

      status.style.color = '#74886B';
      status.textContent = `Thanks, ${name}! Opening WhatsApp...`;

      form.reset();
    });
  }

  /* Small extra keyframes/styles that pair with the JS-driven
     reveal and stamp interactions above. */
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    .reveal-init { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal-in { opacity: 1; transform: translateY(0); }

    .stamp-init { opacity: 0; transform: rotate(-6deg) scale(1.8); }
    .stamp-in { opacity: 1; transform: rotate(-6deg) scale(1); transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.2,1.4,.4,1); }
  `;
  document.head.appendChild(styleTag);

}); // <-- this closing "});" was missing — it closes the DOMContentLoaded callback + addEventListener call
