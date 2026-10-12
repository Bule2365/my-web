import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import CTAButton from './CTAButton';
import { assetUrl } from '../utils/assetUrl';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerChildren = {
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero min-h-screen flex items-center pt-20" id="hero">
      <div className="container">
        <motion.div
          className="hero__content grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          transition={reduceMotion ? { duration: 0 } : undefined}
        >
          <motion.div className="hero__content" variants={fadeUp} transition={reduceMotion ? { duration: 0 } : undefined}>
            <motion.p
              className="hero__greeting text-sm font-medium text-accent uppercase tracking-widest mb-3"
              variants={fadeUp}
              transition={reduceMotion ? { duration: 0 } : undefined}
            >
              Daffa Aria
            </motion.p>
            <motion.h1
              className="hero__title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              variants={fadeUp}
              transition={reduceMotion ? { duration: 0 } : undefined}
            >
              Junior Backend Developer
            </motion.h1>
            <motion.p
              className="hero__desc text-lg text-text-secondary max-w-md mb-6"
              variants={fadeUp}
              transition={reduceMotion ? { duration: 0 } : undefined}
            >
              Bangun backend yang tangguh. Selesaikan masalah yang sebenarnya.
            </motion.p>
            <motion.div
              className="hero__tech flex flex-wrap gap-2 mb-8"
              variants={fadeUp}
              transition={reduceMotion ? { duration: 0 } : undefined}
            >
              {['Python', 'FastAPI', 'Laravel', 'AI Automation'].map((tag) => (
                <span key={tag} className="chip">{tag}</span>
              ))}
            </motion.div>
            <motion.div
              className="hero__actions flex flex-wrap gap-3"
              variants={fadeUp}
              transition={reduceMotion ? { duration: 0 } : undefined}
            >
              <CTAButton href="#proyek" variant="primary">Lihat Proyek</CTAButton>
              <CTAButton href={assetUrl('documents/CV-Daffa_v6.pdf')} variant="secondary" download="CV-Daffa_v6.pdf">
                <i className="bi bi-download" aria-hidden="true" />
                Unduh CV
              </CTAButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__image flex justify-center"
          >
            <motion.div
              className="hero__image-wrapper w-56 h-56 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border border-border shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              <img
                src={assetUrl('assets/images/profile.webp')}
                alt="Foto profil Daffa Aria"
                width="320"
                height="320"
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}