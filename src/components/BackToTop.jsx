import React, { useEffect, useState } from 'react';

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 400);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      aria-label="Kembali ke atas"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={scrollToTop}
      className={[
        'backtotop fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center',
        'rounded-full border border-border bg-surface-2 text-text-secondary transition-all duration-300',
        'hover:border-border-hover hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent',
        visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0 pointer-events-none',
      ].join(' ')}
    >
      <i className="bi bi-chevron-up text-lg" aria-hidden="true" />
    </button>
  );
}

export default BackToTop;