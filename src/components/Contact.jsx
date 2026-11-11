import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import CTAButton from './CTAButton';
import Icon from './Icon';
import { contactInfo } from '../data';

const mailto = `mailto:${contactInfo.email}?subject=Ajakan%20Kerjasama%20Backend%20Development&body=Halo%20Daffa%2C%0A%0ASaya%20tertarik%20untuk%20berdiskusi%20mengenai%20peluang%20kerja%20sama%20backend%20development.%0A%0AMohon%20informasinya%20lebih%20lanjut.%0A%0ATerima%20kasih.%0A%0ASalam%2C%0A%5BNama%20Pengirim%5D`;

function displayUrl(url) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    // Tampilkan umpan balik segera; kembalikan bila kedua mekanisme gagal.
    setCopied(true);

    try {
      await navigator.clipboard.writeText(contactInfo.email);
      return;
    } catch {
      // Clipboard API bisa diblokir; gunakan fallback lama.
    }

    let textarea;
    try {
      textarea = document.createElement('textarea');
      textarea.value = contactInfo.email;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const copiedNow = document.execCommand('copy');
      if (!copiedNow) setCopied(false);
    } catch {
      setCopied(false);
    } finally {
      textarea?.remove();
    }
  };

  const items = [
    {
      icon: 'mail',
      label: 'Email',
      value: contactInfo.email,
      href: mailto,
    },
    {
      icon: 'whatsapp',
      label: 'WhatsApp',
      value: contactInfo.phone,
      href: contactInfo.whatsapp,
      external: true,
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      value: displayUrl(contactInfo.linkedin),
      href: contactInfo.linkedin,
      external: true,
    },
    {
      icon: 'github',
      label: 'GitHub',
      value: displayUrl(contactInfo.github),
      href: contactInfo.github,
      external: true,
    },
    {
      icon: 'map-pin',
      label: 'Lokasi',
      value: contactInfo.location,
    },
  ];

  return (
    <section className="section" id="kontak">
      <div className="container">
        <ScrollReveal>
          <div className="section__header">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Kontak
            </p>
            <h2 className="section__title">Hubungi Saya</h2>
            <p className="section__subtitle">
              Tertarik berkolaborasi? Pilih kanal yang paling nyaman untuk Anda.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <div className="flex flex-col gap-5">
              {items.map((item) => {
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-subtle text-accent">
                      <Icon name={item.icon} size={19} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium uppercase tracking-widest text-text-tertiary">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block truncate font-medium text-text">
                        {item.value}
                      </span>
                    </span>
                  </>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="flex items-start gap-4 rounded-xl transition-colors hover:text-accent"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="flex items-start gap-4">
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col justify-center rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-text">Siap untuk Kolaborasi?</h3>
              <p className="mt-3 max-w-[440px] text-text-secondary">
                Saya selalu terbuka untuk proyek baru, ide segar, dan kesempatan belajar. Jika
                Anda mencari backend developer yang serius dan detail-oriented, mari bicara.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <CTAButton href={mailto} variant="primary">
                  <Icon name="mail" size={17} /> Kirim Email
                </CTAButton>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-live="polite"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-surface-2 px-5 py-3 text-sm font-medium text-text transition-colors hover:border-border-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Icon name={copied ? 'check' : 'copy'} size={17} />
                  {copied ? 'Email tersalin' : 'Salin email'}
                </button>
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-emerald-600/30 px-5 py-3 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-emerald-400"
                >
                  <Icon name="whatsapp" size={17} /> WhatsApp
                </a>
              </div>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
