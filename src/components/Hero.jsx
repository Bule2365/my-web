import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import CTAButton from './CTAButton';
import Icon from './Icon';
import { assetUrl } from '../utils/assetUrl';
import { certificates, projects } from '../data';

const ease = [0.25, 0.46, 0.45, 0.94];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.65, ease },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: reduceMotion ? { duration: 0 } : { staggerChildren: 0.08, delayChildren: 0.12 },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-24 sm:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-accent-2/15 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-accent-3/10 blur-3xl" />
      </div>

      <div className="container">
        <m.div
          variants={stagger}
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14"
        >
          <div>
            <m.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-border bg-accent-subtle px-3 py-1.5 text-xs font-medium text-accent">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                Fokus Backend Development
              </span>
            </m.div>

            <m.p
              variants={fadeUp}
              className="mt-5 text-sm font-medium uppercase tracking-[0.2em] text-text-tertiary"
            >
              Daffa Aria — Cinere, Depok
            </m.p>

            <m.h1
              variants={fadeUp}
              className="mt-3 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-balance md:text-5xl lg:text-6xl"
            >
              Junior <span className="text-gradient">Backend Developer</span>
            </m.h1>

            <m.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-lg text-text-secondary"
            >
              Bangun backend yang tangguh. Selesaikan masalah yang sebenarnya — API cepat,
              sistem stabil, dan kode yang mudah dirawat.
            </m.p>

            <m.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
              {['Python', 'FastAPI', 'Laravel', 'AI Automation'].map((tag) => (
                <span key={tag} className="chip">
                  <Icon name="code" size={13} className="text-accent" />
                  {tag}
                </span>
              ))}
            </m.div>

            <m.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <CTAButton href="#proyek" variant="primary">
                <Icon name="arrow-right" size={17} /> Lihat Proyek
              </CTAButton>
              <CTAButton
                href={assetUrl('documents/CV-Daffa_v8.pdf')}
                variant="secondary"
                download="CV-Daffa_v8.pdf"
              >
                <Icon name="download" size={17} /> Unduh CV
              </CTAButton>
            </m.div>

            <m.dl
              variants={fadeUp}
              className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-border rounded-xl border border-border bg-surface/70 p-1"
            >
              {[
                { value: String(projects.length), label: 'proyek unggulan' },
                { value: String(certificates.length), label: 'sertifikasi' },
                { value: '4,6ms', label: 'latensi pencarian' },
              ].map((stat) => (
                <div key={stat.label} className="px-3 py-3 text-center sm:px-4">
                  <dt className="text-lg font-bold text-text sm:text-xl">{stat.value}</dt>
                  <dd className="mt-0.5 text-[11px] leading-tight text-text-tertiary sm:text-xs">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </m.dl>
          </div>

          <m.div variants={fadeUp} className="flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent via-accent-2 to-accent-3 opacity-25 blur-2xl"
                aria-hidden="true"
              />
              <m.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.25 }}
                className="relative h-60 w-60 overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-lg sm:h-72 sm:w-72 lg:h-80 lg:w-80"
              >
                <img
                  src={assetUrl('assets/images/profile.webp')}
                  alt="Foto profil Daffa Aria"
                  width="420"
                  height="420"
                  loading="eager"
                  fetchPriority="high"
                  className="h-full w-full object-cover"
                />
              </m.div>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
