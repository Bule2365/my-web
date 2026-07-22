(function () {
  'use strict';

  const projectImages = {
    'ai-assistant': [
      { src: 'assets/images/projects/ai-assistant/a.webp', alt: 'AI Assistant — interface utama' },
      { src: 'assets/images/projects/ai-assistant/b.webp', alt: 'AI Assistant — fitur interaksi' },
      { src: 'assets/images/projects/ai-assistant/c.webp', alt: 'AI Assistant — output hasil' },
      { src: 'assets/images/projects/ai-assistant/d.webp', alt: 'AI Assistant — dashboard' }
    ],
    'realtime-analytics': [
      { src: 'assets/images/projects/realtime-analytics/a.webp', alt: 'Realtime Analytics — dashboard utama' },
      { src: 'assets/images/projects/realtime-analytics/b.webp', alt: 'Realtime Analytics — visualisasi data' },
      { src: 'assets/images/projects/realtime-analytics/c.webp', alt: 'Realtime Analytics — monitoring panel' },
      { src: 'assets/images/projects/realtime-analytics/d.webp', alt: 'Realtime Analytics — konfigurasi' },
      { src: 'assets/images/projects/realtime-analytics/e.webp', alt: 'Realtime Analytics — laporan' },
      { src: 'assets/images/projects/realtime-analytics/f.webp', alt: 'Realtime Analytics — detail metrik' },
      { src: 'assets/images/projects/realtime-analytics/g.webp', alt: 'Realtime Analytics — ringkasan' }
    ]
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  function lockBodyScroll() {
    var scrollbarWidth = getScrollbarWidth();
    document.body.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
    document.body.classList.add('no-scroll');
  }

  function unlockBodyScroll() {
    document.body.classList.remove('no-scroll');
    document.body.style.removeProperty('--scrollbar-width');
  }

  // Theme toggle
  var themeToggle = document.getElementById('themeToggle');
  var htmlEl = document.documentElement;
  var savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    htmlEl.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isLight = htmlEl.getAttribute('data-theme') === 'light';
      if (isLight) {
        htmlEl.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        htmlEl.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // Header scroll
  var header = document.getElementById('header');
  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Mobile menu
  var navToggle = document.querySelector('.nav__toggle');
  var navMenu = document.getElementById('nav-menu');
  var menuBackdrop = document.getElementById('menu-backdrop');

  function openMenu() {
    navToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('open');
    if (menuBackdrop) {
      menuBackdrop.classList.add('visible');
    }
    lockBodyScroll();
    navToggle.focus();
  }

  function closeMenu() {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
    if (menuBackdrop) {
      menuBackdrop.classList.remove('visible');
    }
    unlockBodyScroll();
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

    if (menuBackdrop) {
      menuBackdrop.addEventListener('click', closeMenu);
    }

    navMenu.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // Active nav on scroll
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  function updateActiveNav() {
    var current = '';
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

  // Back to top
  var backToTop = document.getElementById('backToTop');
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

  // Scroll reveal
  if (!prefersReducedMotion) {
    var revealElements = document.querySelectorAll(
      '.section__header, .tentang__grid, .keahlian__group, .project-card, .cert-card, .cv__content, .kontak__grid, .footer__content'
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

  // Certificate filter
  var filterBtns = document.querySelectorAll('.filter-btn');
  var certCards = document.querySelectorAll('.cert-card');

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

  // Lightbox
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox.querySelector('.lightbox__image');
  var lightboxCounter = lightbox.querySelector('.lightbox__counter');
  var lightboxClose = lightbox.querySelector('.lightbox__close');
  var lightboxPrev = lightbox.querySelector('.lightbox__prev');
  var lightboxNext = lightbox.querySelector('.lightbox__next');
  var lightboxPrevSm = lightbox.querySelector('.lightbox__prev-sm');
  var lightboxNextSm = lightbox.querySelector('.lightbox__next-sm');
  var lightboxBackdrop = lightbox.querySelector('.lightbox__backdrop');

  var currentProject = '';
  var currentIndex = 0;

  function openLightbox(projectId) {
    if (!projectImages[projectId]) return;
    currentProject = projectId;
    currentIndex = 0;
    showLightboxImage();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    lockBodyScroll();
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    unlockBodyScroll();
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

  // Smooth scroll for anchor links
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

  // Dynamic copyright year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
