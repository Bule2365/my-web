import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CTAButton from './CTAButton';
import { contactInfo } from '../data';

const navLinks = [
  { href: '#tentang', label: 'Tentang' },
  { href: '#keahlian', label: 'Keahlian' },
  { href: '#proyek', label: 'Proyek' },
  { href: '#sertifikat', label: 'Sertifikat' },
  { href: '/my-web/documents/CV-Daffa_v6.pdf', label: 'CV', isExternal: true },
  { href: '#kontak', label: 'Kontak' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('id'));
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      closeMenu();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

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
                  onClick={(e) => handleNavClick(e, link.href)}
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
            className="md:hidden flex flex-col gap-[5px] p-2 z-50 relative"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-bg/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xl font-medium text-text-secondary hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next === 'light' ? 'light' : '');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '');
  }, [theme]);

  return (
    <button
      onClick={toggle}
      aria-label="Ganti tema tampilan"
      type="button"
      className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary border border-border hover:text-text hover:border-border-hover transition-all flex-shrink-0 relative"
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