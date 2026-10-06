import React from 'react';
import { motion } from 'framer-motion';

const ctaVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.04,
    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.35)',
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
  tap: { scale: 0.97 },
};

export default function CTAButton({ href, children, variant = 'primary', ...props }) {
  const isPrimary = variant === 'primary';

  const baseClass = 'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

  const variantClass = isPrimary
    ? 'bg-accent text-white hover:bg-accent-hover'
    : 'bg-surface-2 text-text border border-border hover:border-border-hover';

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variants={ctaVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={`${baseClass} ${variantClass}`}
      {...props}
    >
      {children}
    </motion.a>
  );
}