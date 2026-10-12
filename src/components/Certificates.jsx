import React, { useState } from "react";
import { useReducedMotion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import CTAButton from "./CTAButton";
import { certificates } from "../data";

const filters = ["all", "ai", "productivity", "security", "microsoft"];

const filterLabels = {
  all: "Semua",
  ai: "AI",
  productivity: "Productivity",
  security: "Security",
  microsoft: "Microsoft",
};

export default function Certificates() {
  const [activeFilter, setActiveFilter] = useState("all");
  const reduceMotion = useReducedMotion();

  const filtered =
    activeFilter === "all"
      ? certificates
      : certificates.filter((c) => c.category === activeFilter);

  return (
    <section className="section" id="sertifikat">
      <div className="container">
        <ScrollReveal>
          <div className="section__header">
            <h2 className="section__title">Sertifikat</h2>
            <p className="section__subtitle">
              Bukti kompetensi dan pembelajaran berkelanjutan
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div
            className="certs__filters flex flex-wrap gap-2 mb-8"
            role="group"
            aria-label="Filter sertifikat"
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className={`certs__filter px-4 py-2 text-sm font-medium rounded-full border border-border text-text-secondary transition-all hover:text-text hover:border-border-hover ${
                  activeFilter === f ? "text-white bg-accent border-accent" : ""
                }`}
                aria-pressed={activeFilter === f}
                onClick={() => setActiveFilter(f)}
              >
                {filterLabels[f]}
              </button>
            ))}
          </div>
          <div className="sr-only" aria-live="polite">
            Menampilkan {filtered.length} sertifikat
          </div>
        </ScrollReveal>

        <ScrollReveal>
          {filtered.length === 0 ? (
            <div className="text-center text-text-secondary py-12">
              <p>Tidak ada sertifikat pada kategori ini.</p>
            </div>
          ) : (
            <div className="certs__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((cert) => (
                <div
                  key={cert.id}
                  className="cert-card p-6 bg-surface border border-border rounded-xl hover:border-border-hover hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  style={reduceMotion ? {} : undefined}
                >
                  <div className="cert-card__icon flex items-center justify-center w-10 h-10 rounded-lg bg-accent-subtle text-accent text-xl mb-4">
                    <i className="bi bi-award-fill" aria-hidden="true" />
                  </div>
                  <h3 className="cert-card__title font-semibold mb-1">
                    {cert.title}
                  </h3>
                  <div className="cert-card__issuer flex items-center gap-2 text-sm text-text-secondary mb-1">
                    <i className="bi bi-building text-xs" aria-hidden="true" />
                    {cert.issuer}
                  </div>
                  {cert.date && (
                    <div className="cert-card__date flex items-center gap-2 text-xs text-text-tertiary mb-4">
                      <i className="bi bi-calendar3" aria-hidden="true" />
                      {cert.date}
                    </div>
                  )}
                  <div className="cert-card__actions">
                    <CTAButton
                      href={cert.image}
                      variant="outline"
                      className="text-xs px-3 py-1.5"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-eye" aria-hidden="true" /> Lihat
                      Sertifikat
                    </CTAButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
