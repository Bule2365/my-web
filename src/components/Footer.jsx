import React from 'react';
import { motion } from 'framer-motion';
import { contactInfo } from '../data';

export default function Footer() {
  return (
    <footer className="footer py-12 border-t border-border">
      <div className="container">
        <motion.div
          className="footer__content flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="footer__social flex gap-3">
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener"
              aria-label="GitHub Daffa"
              className="flex items-center justify-center w-10 h-10 text-text-secondary border border-border rounded-full hover:text-text hover:border-border-hover hover:bg-surface-2 transition-all"
            >
              <i className="bi bi-github text-lg" aria-hidden="true" />
            </a>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn Daffa"
              className="flex items-center justify-center w-10 h-10 text-text-secondary border border-border rounded-full hover:text-text hover:border-border-hover hover:bg-surface-2 transition-all"
            >
              <i className="bi bi-linkedin text-lg" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${contactInfo.email}?subject=Ajakan%20Kerjasama%20Backend%20Development`}
              aria-label="Email Daffa"
              className="flex items-center justify-center w-10 h-10 text-text-secondary border border-border rounded-full hover:text-text hover:border-border-hover hover:bg-surface-2 transition-all"
            >
              <i className="bi bi-envelope text-lg" aria-hidden="true" />
            </a>
          </div>
          <p className="footer__copy text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} Muhammad Daffa Aria Firmansyah
          </p>
        </motion.div>
      </div>
    </footer>
  );
}