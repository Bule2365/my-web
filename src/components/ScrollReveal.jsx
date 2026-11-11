import React from 'react';
import { m, useReducedMotion } from 'framer-motion';

const EASE = [0.25, 0.46, 0.45, 0.94];

export default function ScrollReveal({ children, className = '', itemClassName = '' }) {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: reduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0 } : { duration: 0.6, ease: EASE },
    },
  };

  return (
    <m.div
      variants={containerVariants}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <m.div variants={itemVariants} className={itemClassName}>
          {child}
        </m.div>
      ))}
    </m.div>
  );
}
