import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function About() {
  return (
    <section className="section" id="tentang">
      <div className="container">
        <ScrollReveal>
          <div className="section__header">
            <h2 className="section__title">Tentang Saya</h2>
            <p className="section__subtitle">Pendekatan, fokus, dan nilai yang saya bawa dalam setiap proyek</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="about__content max-w-xl">
            <p className="about__text text-text-secondary mb-4">
              Saya <strong>Junior Backend Developer</strong> yang fokus pada hasil nyata: API yang cepat, sistem yang stabil, dan kode yang terstruktur. Pendekatan saya: pahami masalah dulu, baru tulis kode. Saya percaya sistem yang baik lahir dari kejelasan tujuan, struktur yang rapi, dan eksekusi yang konsisten.
            </p>
            <p className="about__text text-text-secondary mb-6">
              Saat ini saya aktif membangun proyek mandiri — intelligent search engine, AI code review assistant, dan aplikasi web berbasis Laravel — sambil memperdalam AI, automation, dan software engineering melalui sertifikasi dan eksperimen langsung.
            </p>
            <div className="about__highlights grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: 'bi-gear-wide-connected', label: 'Problem solving teknis' },
                { icon: 'bi-diagram-3', label: 'Sistem backend & automation' },
                { icon: 'bi-cpu', label: 'AI & solusi digital' },
              ].map((item) => (
                <div key={item.label} className="about__highlight inline-flex items-center gap-3 text-sm font-medium text-text">
                  <i className={`${item.icon} text-accent text-lg flex-shrink-0`} aria-hidden="true" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}