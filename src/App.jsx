import React, { useEffect } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function App() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return undefined;

    let cancelled = false;
    const scrollToHash = () => {
      if (cancelled) return;
      let target = null;
      try {
        target = document.getElementById(decodeURIComponent(hash));
      } catch {
        target = document.getElementById(hash);
      }
      target?.scrollIntoView({ block: 'start', behavior: 'instant' });
    };

    const frame = window.requestAnimationFrame(scrollToHash);
    // Font web dapat menggeser layout setelah render pertama.
    document.fonts?.ready.then(() => window.requestAnimationFrame(scrollToHash));

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="min-h-screen bg-bg font-sans text-text antialiased">
        <a className="skip-link" href="#main">
          Lewati ke konten utama
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <About />
          <Journey />
          <Skills />
          <Projects />
          <Certificates />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </LazyMotion>
  );
}
