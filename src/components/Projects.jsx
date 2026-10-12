import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { projectImages } from "../data";
import { assetUrl } from "../utils/assetUrl";

const projects = [
  {
    id: "ai-assistant",
    tags: ["Python", "FastAPI", "AI/LLM"],
    title: "AI Code Review Assistant (v1.5)",
    desc: "AI-powered code review dan automation dashboard yang mengintegrasikan Gemini 2.5 Flash dengan backend FastAPI untuk diagnosis kode secara otonom.",
    details: [
      "Diagnosis otomatis: security review, performance, code style, complexity",
      "AST Python untuk validasi sintaks lokal sebelum analisis AI",
      "Pipeline API & CORS aman untuk .py, .js, .jsx",
    ],
    github: "https://github.com/Bule2365/AI-code-review-assistant",
  },
  {
    id: "realtime-analytics",
    tags: ["Python", "FastAPI", "Machine Learning"],
    title: "Intelligent Search & Recommendation Engine",
    desc: "Search engine dan recommendation system e-commerce hybrid yang menggabungkan BM25, semantic search, dan collaborative filtering.",
    details: [
      "BM25 search latency rata-rata 4,6ms per query pada 2.000 produk",
      "Hybrid search atasi vocabulary mismatch",
      "Cold start fallback tanpa error atau hasil kosong",
    ],
    github:
      "https://github.com/Bule2365/intelligent-search-recommendation-engine",
  },
];

export default function Projects() {
  const reduceMotion = useReducedMotion();
  const [lightboxProject, setLightboxProject] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lightboxRef = useRef(null);
  const lastFocusedEl = useRef(null);

  const openLightbox = useCallback((projectId) => {
    setLightboxIndex(0);
    setLightboxProject(projectId);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxProject(null);
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex(
      (prev) => (prev + 1) % (projectImages[lightboxProject]?.length || 1),
    );
  }, [lightboxProject]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => {
      const len = projectImages[lightboxProject]?.length || 1;
      return (prev - 1 + len) % len;
    });
  }, [lightboxProject]);

  useEffect(() => {
    if (lightboxProject) {
      lastFocusedEl.current = document.activeElement;
    }
  }, [lightboxProject]);

  useEffect(() => {
    if (lightboxProject && lightboxRef.current) {
      const closeButton = lightboxRef.current.querySelector(".lightbox__close");
      if (closeButton) {
        closeButton.focus();
      }
    }
  }, [lightboxProject]);

  useEffect(() => {
    if (!lightboxProject && lastFocusedEl.current) {
      lastFocusedEl.current.focus();
      lastFocusedEl.current = null;
    }
  }, [lightboxProject]);

  useEffect(() => {
    if (!lightboxProject) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        closeLightbox();
      }

      if (e.key === "ArrowRight") {
        nextImage();
      }

      if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxProject, closeLightbox, nextImage, prevImage]);

  const currentImages = lightboxProject ? projectImages[lightboxProject] : [];

  return (
    <section className="section" id="proyek">
      <div className="container">
        <ScrollReveal>
          <div className="section__header">
            <h2 className="section__title">Proyek Unggulan</h2>
            <p className="section__subtitle">
              Proyek nyata yang menunjukkan kemampuan teknis dan cara saya
              menyelesaikan masalah
            </p>
          </div>
        </ScrollReveal>

        <div className="projects__grid grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id}>
              <article
                className="project-card bg-surface border border-border rounded-2xl overflow-hidden group-focus-within hover:border-border-hover hover:shadow-lg transition-all duration-300"
                style={reduceMotion ? {} : undefined}
              >
                <div className="project-card__image relative overflow-hidden aspect-video bg-surface-2 border-b border-border">
                  <img
                    src={assetUrl(
                      `assets/images/projects/${project.id}/a.webp`,
                    )}
                    alt={`${project.title} — tampilan utama`}
                    width="800"
                    height="450"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    style={reduceMotion ? {} : undefined}
                  />
                  <div
                    className="project-card__overlay absolute inset-0 z-2 flex items-center justify-center gap-3 bg-black/40 opacity-0 group-focus-within:opacity-100 hover:opacity-100 transition-opacity duration-300"
                    style={reduceMotion ? {} : undefined}
                  >
                    <button
                      className="btn btn--ghost btn--small text-white/90 border-white/20 backdrop-blur-sm hover:bg-white/15 hover:text-white hover:border-white/30"
                      aria-label="Lihat galeri"
                      onClick={() => openLightbox(project.id)}
                    >
                      <i className="bi bi-images" aria-hidden="true" /> Lihat
                      Galeri
                    </button>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--ghost btn--small text-white/90 border-white/20 backdrop-blur-sm hover:bg-white/15 hover:text-white hover:border-white/30"
                      aria-label="Buka repositori di GitHub"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="bi bi-github" aria-hidden="true" /> GitHub
                    </a>
                  </div>
                </div>
                <div className="project-card__body p-6">
                  <div className="project-card__tags flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="project-card__title text-xl font-bold mb-3">
                    {project.title}
                  </h3>
                  <p className="project-card__desc text-text-secondary mb-4">
                    {project.desc}
                  </p>
                  <ul className="project-card__details flex flex-col gap-2">
                    {project.details.map((d) => (
                      <li
                        key={d}
                        className="relative pl-4 text-sm text-text-tertiary leading-relaxed"
                      >
                        <span className="absolute left-0 top-2 w-[4px] h-[4px] rounded-full bg-accent" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <Lightbox
        images={currentImages}
        index={lightboxIndex}
        isOpen={!!lightboxProject}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
        lightboxRef={lightboxRef}
      />
    </section>
  );
}

function Lightbox({
  images,
  index,
  isOpen,
  onClose,
  onNext,
  onPrev,
  lightboxRef,
}) {
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const current = images[index];
  const total = images.length;

  return (
    <motion.div
      className={`lightbox fixed inset-0 z-[200] flex items-center justify-center ${isOpen ? "active" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Galeri Gambar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="lightbox__backdrop absolute inset-0 bg-black/90" />
      <div
        className="lightbox__container relative w-[90vw] max-w-[1000px] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={lightboxRef}
          className="lightbox__close absolute -top-10 right-0 flex items-center justify-center w-11 h-11 text-text-secondary bg-white/10 rounded-full hover:text-white hover:bg-white/20 transition-colors z-[2]"
          aria-label="Tutup galeri"
          type="button"
          onClick={onClose}
        >
          <i className="bi bi-x-lg text-xl" aria-hidden="true" />
        </button>

        <button
          className="lightbox__nav lightbox__prev absolute left-[-3.5rem] top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 text-text-secondary bg-white/10 rounded-full hover:text-white hover:bg-white/20 transition-colors z-[2] hidden md:flex"
          aria-label="Gambar sebelumnya"
          type="button"
          onClick={onPrev}
        >
          <i className="bi bi-chevron-left text-xl" aria-hidden="true" />
        </button>

        <button
          className="lightbox__nav lightbox__next absolute right-[-3.5rem] top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 text-text-secondary bg-white/10 rounded-full hover:text-white hover:bg-white/20 transition-colors z-[2] hidden md:flex"
          aria-label="Gambar berikutnya"
          type="button"
          onClick={onNext}
        >
          <i className="bi bi-chevron-right text-xl" aria-hidden="true" />
        </button>

        <figure className="lightbox__figure flex flex-col items-center w-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={current?.src || ""}
              alt={current?.alt || ""}
              width={1200}
              height={800}
              className="lightbox__image max-w-full max-h-[75vh] object-contain rounded-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              onTouchStart={(e) => setTouchStart(e.changedTouches[0].screenX)}
              onTouchEnd={(e) => {
                const dx = e.changedTouches[0].screenX - touchStart;
                if (Math.abs(dx) > 50) {
                  dx > 0 ? onPrev() : onNext();
                }
              }}
            />
          </AnimatePresence>
          <figcaption className="lightbox__counter mt-3 text-sm text-text-tertiary">
            {index + 1} / {total}
          </figcaption>
        </figure>
      </div>
    </motion.div>
  );
}
