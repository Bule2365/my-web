import React from 'react';
import Icon from './Icon';
import Modal from './Modal';

export default function PdfPreview({ certificate, onClose }) {
  if (!certificate) return null;

  return (
    <Modal
      onClose={onClose}
      label={`Pratinjau sertifikat ${certificate.title}`}
      panelClassName="max-w-4xl"
      backdropClassName="bg-black/85 backdrop-blur-sm"
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-text">{certificate.title}</h3>
            <p className="text-sm text-text-secondary">{certificate.issuer}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={certificate.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:border-border-hover hover:bg-surface-2"
            >
              <Icon name="external-link" size={16} /> Buka
            </a>
            <a
              href={certificate.file}
              download={`${certificate.title}.pdf`}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-accent-border px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent-subtle"
            >
              <Icon name="download" size={16} /> Unduh
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup pratinjau"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-border-hover hover:text-text"
            >
              <Icon name="x" size={18} />
            </button>
          </div>
        </div>
        <object
          data={`${certificate.file}#view=FitH`}
          type="application/pdf"
          className="h-[68dvh] w-full bg-surface-2"
          aria-label={`Dokumen PDF ${certificate.title}`}
        >
          <div className="flex h-[50vh] flex-col items-center justify-center gap-3 p-8 text-center">
            <Icon name="file-text" size={32} className="text-text-tertiary" />
            <p className="text-sm text-text-secondary">
              Pratinjau PDF tidak tersedia di perangkat ini.
            </p>
            <a
              href={certificate.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent hover:underline"
            >
              Buka sertifikat di tab baru
            </a>
          </div>
        </object>
      </div>
    </Modal>
  );
}
