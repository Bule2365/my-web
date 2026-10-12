import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { contactInfo } from '../data';
import { assetUrl } from '../utils/assetUrl';
import { readTheme, applyTheme } from '../theme';

const navLinks = [
  { href: '#tentang', label: 'Tentang' },
  { href: '#keahlian', label: 'Keahlian' },
  { href: '#proyek', label: 'Proyek' },
  { href: '#sertifikat', label: 'Sertifikat' },
  { href: assetUrl('documents/CV-Daffa_v6.pdf'), label: 'CV', isExternal: true },
  { href: '#kontak', label: 'Kontak' },
];

const SCROLL_OFFSET = 96;

function useBodyScrollLock(lock) {
  useEffect(() => {
    if (!lock) {
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [lock]);
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.addEventListener) {
      media.addEventListener('change', () => setMatches(media.matches));
      setMatches(media.matches);
      return () => media.removeEventListener('change', () => setMatches(media.matches));
    } else {
      media.addListener(() => setMatches(media.matches));
      setMatches(media.matches);
      return () => media.removeListener(() => setMatches(media.matches));
    }
  }, [query]);

  return matches;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useBodyScrollLock(isOpen && !isDesktop);

  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);

    const updateActive = () => {
      let current = '';
      const scrollPos = window.scrollY + SCROLL_OFFSET;
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          current = section.id;
        }
      }
      if (!current && sections.length > 0) {
        const firstTop = sections[0].offsetTop;
        const lastBottom = sections[sections.length - 1].offsetTop + sections[sections.length - 1].offsetHeight;
        if (window.scrollY < firstTop) {
          current = 'hero';
        } else if (window.scrollY >= lastBottom - SCROLL_OFFSET) {
          current = 'kontak';
        }
      }
      setActiveSection(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  useEffect(() => {
    if (isOpen && isDesktop) {
      closeMenu();
    }
  }, [isOpen, isDesktop, closeMenu]);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isOpen, closeMenu]);

  const handleNavClick = (href) => {
    closeMenu();
  };

  const reduceMotion = useReducedMotion();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/85 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container flex items-center justify-between py-4" aria-label="Navigasi utama">
        <a href="#hero" className="text-lg font-semibold tracking-tight opacity-80 hover:opacity-100 transition-opacity">
          Daffa Aria
        </a>

        <div className="flex items-center gap-2">
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.isExternal ? '_blank' : undefined}
                  rel={link.isExternal ? 'noopener noreferrer' : undefined}
                  onClick={() => handleNavClick(link.href)}
                  aria-current={activeSection === link.href.slice(1) && !link.isExternal ? 'location' : undefined}
                  className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === link.href.slice(1) && !link.isExternal
                      ? 'text-white bg-surface-2'
                      : 'text-text-secondary hover:text-text hover:bg-surface-2'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <button
            ref={toggleRef}
            type="button"
            className="md:hidden flex flex-col gap-[5px] p-2 z-50 relative"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            aria-controls="nav-menu"
            aria-expanded={isOpen}
          >
            <span
              className={`block w-[22px] h-[2px] bg-text rounded-[2px] transition-all duration-300 ${
                isOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-[22px] h-[2px] bg-text rounded-[2px] transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-[22px] h-[2px] bg-text rounded-[2px] transition-all duration-300 ${
                isOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="nav-menu"
            ref={menuRef}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeInOut' }}
            className="md:hidden fixed inset-y-0 right-0 z-40 w-64 bg-bg/95 backdrop-blur-lg flex flex-col gap-4 p-6 pt-16"
            onClick={(e) => e.target === e.currentTarget && closeMenu()}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                onClick={() => handleNavClick(link.href)}
                aria-current={activeSection === link.href.slice(1) && !link.isExternal ? 'location' : undefined}
                className="text-lg font-medium text-text-secondary hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-auto pt-4">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const SECTION_IDS = ['hero', 'tentang', 'keahlian', 'proyek', 'sertifikat', 'kontak'];

function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return (
    <button
      type="button"
      aria-label={theme === 'dark' ? 'Aktifkan tema terang' : 'Aktifkan tema gelap'}
      aria-pressed={theme === 'light'}
      onClick={toggle}
      className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-text-secondary border border-border hover:text-text hover:border-border-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors"
    >
      <motion.i
        key={theme}
        initial={{ opacity: 0, rotate: theme === 'dark' ? -90 : 90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.2 }}
        className={`bi text-lg ${theme === 'dark' ? 'bi-moon-fill' : 'bi-sun-fill'}`}
      />
    </button>
  );
}