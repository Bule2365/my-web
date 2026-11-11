import React, { useEffect, useRef } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import useBodyScrollLock from '../hooks/useBodyScrollLock';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export default function Modal({
  children,
  onClose,
  label,
  panelClassName = '',
  backdropClassName = 'bg-black/85 backdrop-blur-sm',
}) {
  const panelRef = useRef(null);
  const previouslyFocused = useRef(null);
  const reduceMotion = useReducedMotion();

  useBodyScrollLock(true);

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    const panel = panelRef.current;

    const getFocusable = () =>
      panel
        ? Array.from(panel.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
            (element) => element.offsetParent !== null,
          )
        : [];

    const first = getFocusable()[0];
    first?.focus();

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const items = getFocusable();
      if (items.length === 0) {
        event.preventDefault();
        panel?.focus();
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

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      const previous = previouslyFocused.current;
      if (previous && typeof previous.focus === 'function' && document.contains(previous)) {
        previous.focus();
      }
    };
  }, [onClose]);

  return (
    <m.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
    >
      <div
        className={`absolute inset-0 ${backdropClassName}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <m.div
        ref={panelRef}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className={`relative z-10 max-h-[calc(100dvh-2rem)] w-full overflow-y-auto outline-none ${panelClassName}`.trim()}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
