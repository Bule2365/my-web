import React from 'react';
import ScrollReveal from './ScrollReveal';
import Icon from './Icon';
import { education, experience } from '../data';

function TimelineItem({ icon, title, subtitle, period, points }) {
  return (
    <li className="relative pl-12">
      <span
        className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-2 text-accent"
        aria-hidden="true"
      >
        <Icon name={icon} size={17} />
      </span>
      <div className="rounded-xl border border-border bg-surface/70 p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h4 className="font-semibold text-text">{title}</h4>
            <p className="mt-0.5 text-sm text-text-secondary">{subtitle}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs text-text-tertiary">
            <Icon name="calendar" size={12} />
            {period}
          </span>
        </div>
        {points?.length ? (
          <ul className="mt-4 flex flex-col gap-2">
            {points.map((point) => (
              <li
                key={point}
                className="relative pl-4 text-sm leading-relaxed text-text-secondary"
              >
                <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}

export default function Journey() {
  return (
    <section className="section section-tint" id="perjalanan">
      <div className="container">
        <ScrollReveal>
          <div className="section__header">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Perjalanan
            </p>
            <h2 className="section__title">Pendidikan &amp; Pengalaman</h2>
            <p className="section__subtitle">
              Latar belakang akademik dan pengalaman kerja yang membentuk cara saya membangun
              perangkat lunak.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <ScrollReveal>
              <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                <Icon name="graduation-cap" size={17} className="text-accent" /> Pendidikan
              </h3>
            </ScrollReveal>
            <ScrollReveal>
              <ol className="relative flex flex-col gap-6 before:absolute before:bottom-0 before:left-[18px] before:top-0 before:w-px before:bg-border">
                {education.map((item) => (
                  <TimelineItem
                    key={item.institution}
                    icon="graduation-cap"
                    title={item.institution}
                    subtitle={item.degree + (item.note ? ` — ${item.note}` : '')}
                    period={item.period}
                  />
                ))}
              </ol>
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal>
              <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                <Icon name="briefcase" size={17} className="text-accent" /> Pengalaman
              </h3>
            </ScrollReveal>
            <ScrollReveal>
              <ol className="relative flex flex-col gap-6 before:absolute before:bottom-0 before:left-[18px] before:top-0 before:w-px before:bg-border">
                {experience.map((item) => (
                  <TimelineItem
                    key={item.company}
                    icon="briefcase"
                    title={item.company}
                    subtitle={item.role}
                    period={item.period}
                    points={item.points}
                  />
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
