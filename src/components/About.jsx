import React from 'react';
import ScrollReveal from './ScrollReveal';
import Icon from './Icon';
import { assetUrl } from '../utils/assetUrl';

const highlights = [
  { icon: 'wrench', label: 'Problem solving teknis' },
  { icon: 'network', label: 'Sistem backend & automation' },
  { icon: 'cpu', label: 'AI & solusi digital' },
];

export default function About() {
  return (
    <section className="section" id="tentang">
      <div className="container">
        <ScrollReveal>
          <div className="section__header">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Tentang</p>
            <h2 className="section__title">Tentang Saya</h2>
            <p className="section__subtitle">
              Pendekatan, fokus, dan nilai yang saya bawa dalam setiap proyek
            </p>
          </div>
        </ScrollReveal>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-base text-text-secondary">
                Saya <strong>Junior Backend Developer</strong> yang fokus pada hasil nyata: API
                yang cepat, sistem yang stabil, dan kode yang terstruktur. Pendekatan saya: pahami
                masalah dulu, baru tulis kode. Saya percaya sistem yang baik lahir dari kejelasan
                tujuan, struktur yang rapi, dan eksekusi yang konsisten.
              </p>
              <p className="mt-4 text-base text-text-secondary">
                Saat ini saya aktif membangun proyek mandiri — intelligent search engine, AI code
                review assistant, dan aplikasi web berbasis Laravel — sambil memperdalam AI,
                automation, dan software engineering melalui sertifikasi dan eksperimen langsung.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl border border-border bg-surface/70 p-3 text-sm font-medium text-text"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-accent">
                      <Icon name={item.icon} size={18} />
                    </span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <figure className="relative mx-auto w-full max-w-md">
              <div
                className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-accent/25 via-accent-2/20 to-accent-3/20 blur-xl"
                aria-hidden="true"
              />
              <img
                src={assetUrl('assets/images/about-collaboration.webp')}
                alt="Daffa berkolaborasi saat mengerjakan proyek"
                width="720"
                height="540"
                loading="lazy"
                className="relative w-full rounded-2xl border border-border object-cover shadow-lg"
              />
              <figcaption className="relative mt-4 flex items-center gap-2 text-xs text-text-tertiary">
                <Icon name="map-pin" size={14} className="text-accent" />
                Berbasis di Cinere, Depok — terbuka untuk kerja remote.
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
