(function () {
  'use strict';

  // ============================================
  // Project data — gallery images
  // ============================================
  const projectImages = {
    'ai-assistant': [
      { src: 'assets/images/projects/ai-assistant/a.webp', fallback: 'assets/images/projects/ai-assistant/a.png', alt: 'AI Assistant — interface utama' },
      { src: 'assets/images/projects/ai-assistant/b.webp', fallback: 'assets/images/projects/ai-assistant/b.png', alt: 'AI Assistant — fitur interaksi' },
      { src: 'assets/images/projects/ai-assistant/c.webp', fallback: 'assets/images/projects/ai-assistant/c.png', alt: 'AI Assistant — output hasil' },
      { src: 'assets/images/projects/ai-assistant/d.webp', fallback: 'assets/images/projects/ai-assistant/d.png', alt: 'AI Assistant — dashboard' }
    ],
    'realtime-analytics': [
      { src: 'assets/images/projects/realtime-analytics/a.webp', fallback: 'assets/images/projects/realtime-analytics/a.png', alt: 'Realtime Analytics — dashboard utama' },
      { src: 'assets/images/projects/realtime-analytics/b.webp', fallback: 'assets/images/projects/realtime-analytics/b.png', alt: 'Realtime Analytics — visualisasi data' },
      { src: 'assets/images/projects/realtime-analytics/c.webp', fallback: 'assets/images/projects/realtime-analytics/c.png', alt: 'Realtime Analytics — monitoring panel' },
      { src: 'assets/images/projects/realtime-analytics/d.webp', fallback: 'assets/images/projects/realtime-analytics/d.png', alt: 'Realtime Analytics — konfigurasi' },
      { src: 'assets/images/projects/realtime-analytics/e.webp', fallback: 'assets/images/projects/realtime-analytics/e.png', alt: 'Realtime Analytics — laporan' },
      { src: 'assets/images/projects/realtime-analytics/f.webp', fallback: 'assets/images/projects/realtime-analytics/f.png', alt: 'Realtime Analytics — detail metrik' },
      { src: 'assets/images/projects/realtime-analytics/g.webp', fallback: 'assets/images/projects/realtime-analytics/g.png', alt: 'Realtime Analytics — ringkasan' }
    ]
  };

  // ============================================
  // Utility
  // ============================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================
  // Header scroll
  // ============================================
  const header = document.getElementById('header');
  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ============================================
  // Mobile menu toggle
  // ============================================
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.getElementById('nav-menu');
  const navClose = document.querySelector('.nav__close');
  let scrollPos = 0;

  function openMenu() {
    scrollPos = window.scrollY;
    navToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('open');
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + scrollPos + 'px';
    document.body.style.width = '100%';
  }

  function closeMenu() {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPos);
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isExpanded = this.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (navClose) {
      navClose.addEventListener('click', function () {
        closeMenu();
      });
    }

    navMenu.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });
  }

  // ============================================
  // Active nav on scroll
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function updateActiveNav() {
    let current = '';
    sections.forEach(function (section) {
      var top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ============================================
  // Back to top
  // ============================================
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  // ============================================
  // Scroll reveal
  // ============================================
  if (!prefersReducedMotion) {
    var revealElements = document.querySelectorAll(
      '.section__header, .tentang__grid, .keahlian__group, .project-card, .cert-card, .cv__content, .timeline__item, .kontak__grid, .footer__content'
    );
    revealElements.forEach(function (el) { el.classList.add('reveal'); });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) { revealObserver.observe(el); });
  }

  // ============================================
  // Certificate filter
  // ============================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      certCards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ============================================
  // Lightbox
  // ============================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox.querySelector('.lightbox__image');
  const lightboxCounter = lightbox.querySelector('.lightbox__counter');
  const lightboxClose = lightbox.querySelector('.lightbox__close');
  const lightboxPrev = lightbox.querySelector('.lightbox__prev');
  const lightboxNext = lightbox.querySelector('.lightbox__next');
  const lightboxPrevSm = lightbox.querySelector('.lightbox__prev-sm');
  const lightboxNextSm = lightbox.querySelector('.lightbox__next-sm');
  const lightboxBackdrop = lightbox.querySelector('.lightbox__backdrop');

  let currentProject = '';
  let currentIndex = 0;
  let lightboxScrollPos = 0;

  function openLightbox(projectId) {
    if (!projectImages[projectId]) return;
    currentProject = projectId;
    currentIndex = 0;
    showLightboxImage();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxScrollPos = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + lightboxScrollPos + 'px';
    document.body.style.width = '100%';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, lightboxScrollPos);
  }

  function showLightboxImage() {
    var images = projectImages[currentProject];
    if (!images || !images[currentIndex]) return;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + images.length;
  }

  function nextImage() {
    var images = projectImages[currentProject];
    currentIndex = (currentIndex + 1) % images.length;
    showLightboxImage();
  }

  function prevImage() {
    var images = projectImages[currentProject];
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showLightboxImage();
  }

  document.querySelectorAll('[data-lightbox]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openLightbox(this.getAttribute('data-lightbox'));
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
  if (lightboxNextSm) lightboxNextSm.addEventListener('click', nextImage);
  if (lightboxPrevSm) lightboxPrevSm.addEventListener('click', prevImage);

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // Touch swipe for lightbox
  var touchStartX = 0;
  var touchStartY = 0;
  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].screenX - touchStartX;
    var dy = e.changedTouches[0].screenY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) prevImage();
      else nextImage();
    }
  }, { passive: true });

  // ============================================
  // Spotlight neon glow + Parallax tilt 3D
  // ============================================
  if (!prefersReducedMotion) {
    document.querySelectorAll('.project-card__image').forEach(function (cardImage) {
      var spotlight = cardImage.querySelector('.spotlight');
      var img = cardImage.querySelector('img');

      cardImage.addEventListener('mousemove', function (e) {
        var rect = cardImage.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        // Spotlight position
        if (spotlight) {
          cardImage.style.setProperty('--mouse-x', x + 'px');
          cardImage.style.setProperty('--mouse-y', y + 'px');
        }

        // Parallax tilt 3D
        if (img) {
          var centerX = rect.width / 2;
          var centerY = rect.height / 2;
          var rotateX = ((y - centerY) / centerY) * -8;
          var rotateY = ((x - centerX) / centerX) * 8;
          cardImage.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
        }
      });

      cardImage.addEventListener('mouseleave', function () {
        if (spotlight) {
          cardImage.style.setProperty('--mouse-x', '50%');
          cardImage.style.setProperty('--mouse-y', '50%');
        }
        cardImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // ============================================
  // Smooth scroll for anchor links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

})();
