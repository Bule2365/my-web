import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { assetUrl } from '../utils/assetUrl';
import ThemeToggle from './ThemeToggle';
import Icon from './Icon';
import useBodyScrollLock from '../hooks/useBodyScrollLock';

const navLinks = [
  { href: '#tentang', label: 'Tentang' },
  { href: '#perjalanan', label: 'Perjalanan' },
  { href: '#keahlian', label: 'Keahlian' },
  { href: '#proyek', label: 'Proyek' },
  { href: '#sertifikat', label: 'Sertifikat' },
  { href: assetUrl('documents/CV-Daffa_v8.pdf'), label: 'CV', isExternal: true },
  { href: '#kontak', label: 'Kontak' },
];

const SECTION_IDS = ['hero', 'tentang', 'perjalanan', 'keahlian', 'proyek', 'sertifikat', 'kontak'];
const SCROLL_OFFSET = 96;

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const handleChange = () => setMatches(media.matches);

    handleChange();

    if (media.addEventListener) {
      media.addEventListener('change', handleChange);
      return () => media.removeEventListener('change', handleChange);
    }

    media.addListener(handleChange);
    return () => media.removeListener(handleChange);
  }, [query]);

  return matches;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const restoreFocusRef = useRef(false);
  const wasOpenRef = useRef(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const reduceMotion = useReducedMotion();

  useBodyScrollLock(isOpen && !isDesktop);

  const closeMenu = useCallback(({ restoreFocus = false } = {}) => {
    restoreFocusRef.current = restoreFocus;
    setIsOpen(false);
  }, []);

  const toggleMenu = useCallback(() => setIsOpen((current) => !current), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    let frame = null;

    const updateActive = () => {
      let current = '';
      const scrollPos = window.scrollY + SCROLL_OFFSET;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          current = section.id;
        }
      });

      if (!current && sections.length > 0) {
        const firstTop = sections[0].offsetTop;
        const last = sections[sections.length - 1];
        const lastBottom = last.offsetTop + last.offsetHeight;
        if (window.scrollY < firstTop) current = 'hero';
        else if (window.scrollY >= lastBottom - SCROLL_OFFSET) current = 'kontak';
      }

      setActiveSection(current);
    };

    const handleScroll = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        updateActive();
        frame = null;
      });
    };

    updateActive();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (isOpen && isDesktop) {
      closeMenu();
    }
  }, [isOpen, isDesktop, closeMenu]);

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      const timer = window.setTimeout(() => {
        const firstControl = menuRef.current?.querySelector('a[href], button:not([disabled])');
        firstControl?.focus();
      }, 30);
      return () => window.clearTimeout(timer);
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      if (restoreFocusRef.current) {
        restoreFocusRef.current = false;
        toggleRef.current?.focus();
      }
    }
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || isDesktop) return undefined;

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu({ restoreFocus: true });
        return;
      }

      if (event.key !== 'Tab') return;

      const menu = menuRef.current;
      if (!menu) return;

      const items = Array.from(menu.querySelectorAll('a[href], button:not([disabled])')).filter(
        (element) => element.offsetParent !== null,
      );

      if (items.length === 0) {
        event.preventDefault();
        return;
      }

      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isOpen, isDesktop, closeMenu]);

  useEffect(() => {
    if (!isOpen || isDesktop) return undefined;

    const regions = [document.querySelector('main'), document.querySelector('footer')].filter(Boolean);
    regions.forEach((region) => region.setAttribute('inert', ''));

    return () => {
      regions.forEach((region) => region.removeAttribute('inert'));
    };
  }, [isOpen, isDesktop]);

  const handleNavClick = () => {
    closeMenu();
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-border bg-bg/85 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="container flex items-center justify-between py-3" aria-label="Navigasi utama">
          <a
            href="#hero"
            onClick={handleNavClick}
            className="text-lg font-semibold tracking-tight text-text transition-opacity hover:opacity-80"
          >
            Daffa Aria
          </a>

          <div className="flex items-center gap-2">
            <ul className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1) && !link.isExternal;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      onClick={handleNavClick}
                      aria-current={isActive ? 'location' : undefined}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-surface-2 text-text'
                          : 'text-text-secondary hover:bg-surface-2 hover:text-text'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <ThemeToggle />

            <button
              ref={toggleRef}
              type="button"
              className={`relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[5px] p-2 md:hidden ${
                isOpen ? 'invisible' : ''
              }`}
              onClick={toggleMenu}
              aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
              aria-controls="nav-menu"
              aria-expanded={isOpen}
            >
              <span
                className={`block h-[2px] w-[22px] rounded-[2px] bg-text transition-all duration-300 ${
                  isOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-[2px] w-[22px] rounded-[2px] bg-text transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-[2px] w-[22px] rounded-[2px] bg-text transition-all duration-300 ${
                  isOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && !isDesktop && (
          <m.button
            key="nav-backdrop"
            type="button"
            tabIndex={-1}
            aria-label="Tutup menu"
            onClick={() => closeMenu({ restoreFocus: true })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[55] cursor-default bg-black/50 md:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && !isDesktop && (
          <m.nav
            key="nav-drawer"
            id="nav-menu"
            ref={menuRef}
            aria-label="Navigasi mobile"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeInOut' }}
            className="fixed inset-y-0 right-0 z-[60] flex w-72 max-w-[85vw] flex-col gap-2 border-l border-border bg-bg/95 p-6 pt-20 backdrop-blur-lg md:hidden"
          >
            <button
              type="button"
              onClick={() => closeMenu({ restoreFocus: true })}
              aria-label="Tutup menu"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-border-hover hover:text-text"
            >
              <Icon name="x" size={18} />
            </button>

            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1) && !link.isExternal;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.isExternal ? '_blank' : undefined}
                  rel={link.isExternal ? 'noopener noreferrer' : undefined}
                  onClick={handleNavClick}
                  aria-current={isActive ? 'location' : undefined}
                  className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-surface-2 text-text'
                      : 'text-text-secondary hover:bg-surface-2 hover:text-text'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <div className="mt-auto border-t border-border pt-4">
              <p className="mb-2 text-xs uppercase tracking-widest text-text-tertiary">Tema</p>
              <ThemeToggle />
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </>
  );
}
