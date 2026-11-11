import React, { useEffect, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import Icon from './Icon';
import Modal from './Modal';

export default function Lightbox({ images, index, onClose, onNext, onPrev }) {
  const reduceMotion = useReducedMotion();
  const [touchStart, setTouchStart] = useState(null);
  const [failed, setFailed] = useState(false);
  const current = images[index];
  const total = images.length;

  useEffect(() => {
    setFailed(false);
  }, [index, current?.src]);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext();
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrev();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [onNext, onPrev]);

  return (
    <Modal
      onClose={onClose}
      label="Galeri gambar proyek"
      panelClassName="max-w-5xl"
      backdropClassName="bg-black/90 backdrop-blur-sm"
    >
      <div className="relative">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm text-white/70" aria-live="polite">
            Gambar {index + 1} dari {total}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup galeri"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <Icon name="x" size={20} />
          </button>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            {failed ? (
              <m.div
                key={`fallback-${index}`}
                className="mx-auto flex min-h-[40dvh] max-w-3xl flex-col items-center justify-center gap-3 rounded-lg border border-white/15 bg-white/5 p-8 text-center"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
              >
                <Icon name="images" size={32} className="text-white/40" />
                <p className="text-sm text-white/70">Gambar tidak dapat dimuat.</p>
                {current?.src ? (
                  <a
                    href={current.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-white underline underline-offset-2"
                  >
                    Buka gambar di tab baru
                  </a>
                ) : null}
              </m.div>
            ) : (
              <m.img
                key={index}
                src={current?.src || ''}
                alt={current?.alt || ''}
                width={1200}
                height={800}
                className="mx-auto max-h-[70dvh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
                initial={reduceMotion ? false : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: -40 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
                onError={() => setFailed(true)}
                onTouchStart={(event) => setTouchStart(event.changedTouches[0].screenX)}
                onTouchEnd={(event) => {
                  if (touchStart === null) return;
                  const dx = event.changedTouches[0].screenX - touchStart;
                  setTouchStart(null);
                  if (Math.abs(dx) > 50) {
                    if (dx > 0) onPrev();
                    else onNext();
                  }
                }}
              />
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={onPrev}
            aria-label="Gambar sebelumnya"
            className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 transition-colors hover:bg-black/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:flex"
          >
            <Icon name="chevron-left" size={22} />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Gambar berikutnya"
            className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 transition-colors hover:bg-black/70 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:flex"
          >
            <Icon name="chevron-right" size={22} />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Gambar sebelumnya"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          >
            <Icon name="chevron-left" size={22} />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Gambar berikutnya"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          >
            <Icon name="chevron-right" size={22} />
          </button>
        </div>
      </div>
    </Modal>
  );
}
