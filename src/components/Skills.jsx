import React from 'react';
import ScrollReveal from './ScrollReveal';
import { skills } from '../data';

const skillGroups = [
  { title: 'Bahasa Pemrograman', items: skills.languages },
  { title: 'Database', items: skills.databases },
  { title: 'Framework', items: skills.frameworks },
  { title: 'Tools', items: skills.tools },
  { title: 'Fokus Utama', items: skills.focus, accent: true },
];

export default function Skills() {
  return (
    <section className="section" id="keahlian">
      <div className="container">
        <ScrollReveal>
          <div className="section__header">
            <h2 className="section__title">Keahlian Teknis</h2>
            <p className="section__subtitle">Teknologi dan tools yang saya gunakan sehari-hari</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="skills__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillGroups.map((group) => (
              <div key={group.title} className="skill__group p-6 bg-surface border border-border rounded-xl">
                <h3 className="skill__group-title text-xs font-semibold text-text-tertiary uppercase tracking-widest mb-4">
                  {group.title}
                </h3>
                <div className="skill__chips flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`chip ${group.accent ? 'chip--accent' : ''}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}