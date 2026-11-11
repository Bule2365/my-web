import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import Icon from './Icon';
import Lightbox from './Lightbox';
import { projectImages, projects } from '../data';

const EMPTY_IMAGES = [];

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = activeProjectId ? projectImages[activeProjectId] || EMPTY_IMAGES : EMPTY_IMAGES;
  const imageCount = images.length;

  const openLightbox = useCallback((projectId) => {
    setLightboxIndex(0);
    setActiveProjectId(projectId);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveProjectId(null);
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((current) => (current + 1) % (imageCount || 1));
  }, [imageCount]);

  const prevImage = useCallback(() => {
    setLightboxIndex((current) => (current - 1 + (imageCount || 1)) % (imageCount || 1));
  }, [imageCount]);

  useEffect(() => {
    if (!activeProjectId || imageCount === 0) return;
    const next = images[(lightboxIndex + 1) % imageCount];
    if (next?.src) {
      const preload = new Image();
      preload.src = next.src;
    }
  }, [activeProjectId, lightboxIndex, images, imageCount]);

  return (
    <section className="section section-tint" id="proyek">
      <div className="container">
        <ScrollReveal>
          <div className="section__header">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Proyek
            </p>
            <h2 className="section__title">Proyek Unggulan</h2>
            <p className="section__subtitle">
              Proyek nyata yang menunjukkan kemampuan teknis dan cara saya menyelesaikan masalah.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-8">
          {projects.map((project, index) => {
            const gallery = projectImages[project.id] || [];
            const reversed = index % 2 === 1;

            return (
              <ScrollReveal key={project.id}>
                <article className="group overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-hover">
                  <div className="grid lg:grid-cols-2">
                    <div
                      className={`relative aspect-video overflow-hidden border-b border-border bg-surface-2 lg:aspect-auto lg:min-h-full ${
                        reversed ? 'lg:order-2 lg:border-b-0 lg:border-l' : 'lg:border-b-0 lg:border-r'
                      }`}
                    >
                      <img
                        src={gallery[0]?.src}
                        alt={`${project.title} — tampilan utama`}
                        width="960"
                        height="540"
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        <Icon name="images" size={13} />
                        {gallery.length} screenshot
                      </span>
                    </div>

                    <div className="flex flex-col justify-center p-6 sm:p-8">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="mt-4 text-xl font-bold text-text sm:text-2xl">{project.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                        {project.desc}
                      </p>

                      <div className="mt-5 inline-flex w-fit items-baseline gap-2 rounded-xl border border-accent-border bg-accent-subtle px-4 py-2.5">
                        <span className="text-xl font-bold text-gradient sm:text-2xl">
                          {project.metric.value}
                        </span>
                        <span className="text-xs text-text-secondary">{project.metric.label}</span>
                      </div>

                      <ul className="mt-5 flex flex-col gap-2">
                        {project.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-2 text-sm text-text-secondary">
                            <Icon name="check" size={16} className="mt-0.5 text-accent" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => openLightbox(project.id)}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-text transition-colors hover:border-border-hover"
                        >
                          <Icon name="images" size={16} />
                          Lihat Galeri
                          <span className="text-text-tertiary">({gallery.length})</span>
                        </button>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-accent-border px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent-subtle"
                        >
                          <Icon name="github" size={16} />
                          GitHub
                          <Icon name="external-link" size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeProjectId && (
          <Lightbox
            key="project-lightbox"
            images={images}
            index={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
