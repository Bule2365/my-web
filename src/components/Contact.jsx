import React from 'react';
import ScrollReveal from './ScrollReveal';
import CTAButton from './CTAButton';
import { contactInfo } from '../data';

export default function Contact() {
  const mailto = `mailto:${contactInfo.email}?subject=Ajakan%20Kerjasama%20Backend%20Development&body=Halo%20Daffa%2C%0A%0ASaya%20tertarik%20untuk%20berdiskusi%20mengenai%20peluang%20kerja%20sama%20backend%20development.%0A%0AMohon%20informasinya%20lebih%20lanjut.%0A%0ATerima%20kasih.%0A%0ASalam%2C%0A%5BNama%20Pengirim%5D`;

  return (
    <section className="section" id="kontak">
      <div className="container">
        <ScrollReveal>
          <div className="section__header">
            <h2 className="section__title">Hubungi Saya</h2>
            <p className="section__subtitle">Tertarik berkolaborasi? Jangan ragu untuk menghubungi</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="contact__content grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="contact__info flex flex-col gap-6">
              <div className="contact__item flex items-start gap-4">
                <i className="bi bi-envelope text-accent flex-shrink-0 text-xl mt-[2px]" aria-hidden="true" />
                <div>
                  <p className="contact__item-label text-xs font-medium text-text-tertiary uppercase tracking-widest mb-1">Email</p>
                  <a href={mailto} className="contact__item-value font-medium hover:text-accent transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <div className="contact__item flex items-start gap-4">
                <i className="bi bi-linkedin text-accent flex-shrink-0 text-xl mt-[2px]" aria-hidden="true" />
                <div>
                  <p className="contact__item-label text-xs font-medium text-text-tertiary uppercase tracking-widest mb-1">LinkedIn</p>
                  <a href={contactInfo.linkedin} target="_blank" rel="noopener" className="contact__item-value font-medium hover:text-accent transition-colors">
                    linkedin.com/in/leaddaf
                  </a>
                </div>
              </div>
              <div className="contact__item flex items-start gap-4">
                <i className="bi bi-github text-accent flex-shrink-0 text-xl mt-[2px]" aria-hidden="true" />
                <div>
                  <p className="contact__item-label text-xs font-medium text-text-tertiary uppercase tracking-widest mb-1">GitHub</p>
                  <a href={contactInfo.github} target="_blank" rel="noopener" className="contact__item-value font-medium hover:text-accent transition-colors">
                    github.com/Bule2365
                  </a>
                </div>
              </div>
            </div>

            <div className="contact__cta p-8 bg-surface border border-border rounded-2xl flex flex-col justify-center">
              <h3 className="contact__cta-title text-xl font-semibold mb-3">Siap untuk Kolaborasi?</h3>
              <p className="contact__cta-text text-text-secondary mb-6 max-w-[440px]">
                Saya selalu terbuka untuk proyek baru, ide segar, dan kesempatan belajar. Jika Anda mencari backend developer yang serius dan detail-oriented, mari bicara.
              </p>
              <CTAButton href={mailto} variant="primary">
                <i className="bi bi-envelope" aria-hidden="true" /> Kirim Email
              </CTAButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}