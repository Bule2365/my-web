import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-hover border border-transparent',
  secondary: 'bg-surface-2 text-text border border-border hover:border-border-hover',
  outline: 'bg-transparent text-accent border border-accent-border hover:bg-accent-subtle hover:border-accent',
};

export default function CTAButton({
  href,
  children,
  variant = 'primary',
  className = '',
  target,
  rel,
  download,
  external = false,
  ...anchorProps
}) {
  const reduceMotion = useReducedMotion();
  const finalTarget = target ?? (external ? '_blank' : undefined);
  const finalRel = finalTarget === '_blank'
    ? (rel ?? 'noopener noreferrer')
    : rel;

  const baseClass = [
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-6 py-3',
    'text-sm font-medium transition-colors duration-200',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' ');

  return (
    <motion.a
      href={href}
      target={finalTarget}
      rel={finalRel}
      download={download}
      className={`${baseClass} ${variants[variant] ?? variants.primary} ${className}`.trim()}
      whileHover={reduceMotion ? undefined : { y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      {...anchorProps}
    >
      {children}
    </motion.a>
  );
}