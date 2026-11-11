import React from 'react';
import ScrollReveal from './ScrollReveal';
import Icon from './Icon';
import { skills } from '../data';

const primaryGroups = [
  { title: 'Bahasa Pemrograman', icon: 'code', items: skills.languages },
  { title: 'Framework', icon: 'layers', items: skills.frameworks },
  { title: 'Database', icon: 'database', items: skills.databases },
];

const supportGroups = [
  { title: 'Tools & Platform', icon: 'wrench', items: skills.tools },
  { title: 'Fokus Utama', icon: 'target', items: skills.focus, accent: true },
];

export default function Skills() {
  return (
    <section className="section" id="keahlian">
      <div className="container">
        <ScrollReveal>
          <div className="section__header">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Keahlian
            </p>
            <h2 className="section__title">Keahlian Teknis</h2>
            <p className="section__subtitle">
              Teknologi yang saya gunakan sehari-hari untuk membangun backend dan sistem
              otomasi.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-3">
          {primaryGroups.map((group) => (
            <ScrollReveal key={group.title} className="h-full" itemClassName="h-full">
              <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-hover">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-subtle text-accent">
                    <Icon name={group.icon} size={19} />
                  </span>
                  <h3 className="text-sm font-semibold text-text">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm font-medium text-text-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {supportGroups.map((group) => (
            <ScrollReveal key={group.title} className="h-full" itemClassName="h-full">
              <div className="h-full rounded-xl border border-border bg-surface/60 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Icon name={group.icon} size={16} className="text-text-tertiary" />
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                    {group.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className={`chip ${group.accent ? 'chip--accent' : ''}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
