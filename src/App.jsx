import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Certificates from './Certificates';
import Contact from './Contact';
import Footer from './Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text font-sans antialiased">
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />

      <button
        className="backtotop fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-surface-2 border border-border text-text-secondary opacity-0 invisible translate-y-2 transition-all duration-300 hover:text-text hover:border-border-hover"
        id="backToTop"
        aria-label="Kembali ke atas"
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="bi bi-chevron-up text-lg" aria-hidden="true" />
      </button>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var btn = document.getElementById('backToTop');
              if (!btn) return;
              window.addEventListener('scroll', function() {
                if (window.scrollY > 400) {
                  btn.classList.add('visible');
                  btn.style.opacity = '1';
                  btn.style.visibility = 'visible';
                  btn.style.transform = 'translateY(0)';
                } else {
                  btn.classList.remove('visible');
                  btn.style.opacity = '0';
                  btn.style.visibility = 'hidden';
                  btn.style.transform = 'translateY(8px)';
                }
              }, { passive: true });
            })();
          `,
        }}
      />
    </div>
  );
}