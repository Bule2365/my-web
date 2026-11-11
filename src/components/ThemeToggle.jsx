import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import Icon from './Icon';
import { useTheme } from '../theme';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Aktifkan tema terang' : 'Aktifkan tema gelap'}
      aria-pressed={!isDark}
      onClick={toggleTheme}
      title={isDark ? 'Aktifkan tema terang' : 'Aktifkan tema gelap'}
      className={[
        'inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border',
        'text-text-secondary transition-colors hover:border-border-hover hover:text-text',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        className,
      ].join(' ')}
    >
      <m.span
        key={theme}
        initial={reduceMotion ? false : { opacity: 0, rotate: isDark ? -90 : 90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
        className="flex"
      >
        <Icon name={isDark ? 'sun' : 'moon'} size={18} />
      </m.span>
    </button>
  );
}
