import React, { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import Icon from './Icon';
import PdfPreview from './PdfPreview';
import { certificates } from '../data';

const filters = ['all', 'ai', 'productivity', 'security', 'microsoft'];

const filterLabels = {
  all: 'Semua',
  ai: 'AI',
  productivity: 'Productivity',
  security: 'Security',
  microsoft: 'Microsoft',
};

const MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

function formatDate(value) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  const monthName = MONTHS[month - 1] ?? '';
  return day ? `${day} ${monthName} ${year}` : `${monthName} ${year}`;
}

const sortedCertificates = [...certificates].sort((a, b) => {
  if (a.date && b.date) return b.date.localeCompare(a.date);
  if (a.date) return -1;
  if (b.date) return 1;
  return a.title.localeCompare(b.title);
});

export default function Certificates() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [previewCertificate, setPreviewCertificate] = useState(null);

  const filtered =
    activeFilter === 'all'
      ? sortedCertificates
      : sortedCertificates.filter((certificate) => certificate.category === activeFilter);

  const counts = filters.reduce((accumulator, filter) => {
    accumulator[filter] =
      filter === 'all'
        ? sortedCertificates.length
        : sortedCertificates.filter((certificate) => certificate.category === filter).length;
    return accumulator;
  }, {});

  const closePreview = useCallback(() => setPreviewCertificate(null), []);

  return (
    <section className="section" id="sertifikat">
      <div className="container">
        <ScrollReveal>
          <div className="section__header">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {String(certificates.length).padStart(2, '0')} Kredensial
            </p>
            <h2 className="section__title">Sertifikat</h2>
            <p className="section__subtitle">
              Bukti kompetensi dan pembelajaran berkelanjutan — terbaru lebih dulu.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter sertifikat">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveFilter(filter)}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-accent-solid bg-accent-solid text-white'
                        : 'border-border text-text-secondary hover:border-border-hover hover:text-text'
                    }`}
                  >
                    {filterLabels[filter]}
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[11px] ${
                        isActive ? 'bg-white/20 text-white' : 'bg-surface-2 text-text-tertiary'
                      }`}
                    >
                      {counts[filter]}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-sm text-text-tertiary" aria-live="polite">
              Menampilkan {filtered.length} dari {sortedCertificates.length} sertifikat
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-border bg-surface py-12 text-center text-text-secondary">
              <p>Tidak ada sertifikat pada kategori ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((certificate) => {
                const dateLabel = formatDate(certificate.date);
                return (
                  <article
                    key={certificate.id}
                    className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-hover"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-subtle text-accent">
                        <Icon name="award" size={19} />
                      </span>
                      <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
                        {filterLabels[certificate.category] ?? certificate.category}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold leading-snug text-text">
                      {certificate.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-text-secondary">
                      <Icon name="building" size={14} className="text-text-tertiary" />
                      {certificate.issuer}
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-xs text-text-tertiary">
                      <Icon name="calendar" size={13} />
                      {dateLabel ? (
                        <time dateTime={certificate.date}>{dateLabel}</time>
                      ) : (
                        <span>Tanggal tidak tercantum</span>
                      )}
                    </div>

                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      <button
                        type="button"
                        onClick={() => setPreviewCertificate(certificate)}
                        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-accent-border px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent-subtle"
                      >
                        <Icon name="eye" size={14} />
                        Pratinjau
                      </button>
                      <a
                        href={certificate.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-border-hover hover:text-text"
                      >
                        <Icon name="external-link" size={14} />
                        Buka PDF
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </ScrollReveal>
      </div>

      <AnimatePresence>
        {previewCertificate && (
          <PdfPreview
            key="certificate-preview"
            certificate={previewCertificate}
            onClose={closePreview}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
