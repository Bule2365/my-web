(function () {
  'use strict';

  // ============================================
  // Project data — gallery images
  // ============================================
  const projectImages = {
    'ai-assistant': [
      { src: 'assets/images/projects/ai-assistant/a.png', alt: 'AI Assistant — interface utama' },
      { src: 'assets/images/projects/ai-assistant/b.png', alt: 'AI Assistant — fitur interaksi' },
      { src: 'assets/images/projects/ai-assistant/c.png', alt: 'AI Assistant — output hasil' },
      { src: 'assets/images/projects/ai-assistant/d.png', alt: 'AI Assistant — dashboard' }
    ],
    'realtime-analytics': [
      { src: 'assets/images/projects/realtime-analytics/a.png', alt: 'Realtime Analytics — dashboard utama' },
      { src: 'assets/images/projects/realtime-analytics/b.png', alt: 'Realtime Analytics — visualisasi data' },
      { src: 'assets/images/projects/realtime-analytics/c.png', alt: 'Realtime Analytics — monitoring panel' },
      { src: 'assets/images/projects/realtime-analytics/d.png', alt: 'Realtime Analytics — konfigurasi' },
      { src: 'assets/images/projects/realtime-analytics/e.png', alt: 'Realtime Analytics — laporan' },
      { src: 'assets/images/projects/realtime-analytics/f.png', alt: 'Realtime Analytics — detail metrik' },
      { src: 'assets/images/projects/realtime-analytics/g.png', alt: 'Realtime Analytics — ringkasan' }
    ],
    'sync-engine': [
      { src: 'assets/images/projects/sync-engine/a.png', alt: 'Sync Engine — arsitektur sistem' },
      { src: 'assets/images/projects/sync-engine/b.png', alt: 'Sync Engine — flow sinkronisasi' },
      { src: 'assets/images/projects/sync-engine/c.png', alt: 'Sync Engine — performa data' },
      { src: 'assets/images/projects/sync-engine/d.png', alt: 'Sync Engine — hasil test' },
      { src: 'assets/images/projects/sync-engine/e.png', alt: 'Sync Engine — monitoring' }
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

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('open');
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    navMenu.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
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
  const lightboxBackdrop = lightbox.querySelector('.lightbox__backdrop');

  let currentProject = '';
  let currentIndex = 0;

  function openLightbox(projectId) {
    if (!projectImages[projectId]) return;
    currentProject = projectId;
    currentIndex = 0;
    showLightboxImage();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
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

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

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
