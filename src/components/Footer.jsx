import React from 'react';
import Icon from './Icon';
import { contactInfo } from '../data';

const socials = [
  { href: contactInfo.github, label: 'GitHub Daffa', icon: 'github' },
  { href: contactInfo.linkedin, label: 'LinkedIn Daffa', icon: 'linkedin' },
  { href: contactInfo.whatsapp, label: 'WhatsApp Daffa', icon: 'whatsapp' },
  {
    href: `mailto:${contactInfo.email}?subject=Ajakan%20Kerjasama%20Backend%20Development`,
    label: 'Email Daffa',
    icon: 'mail',
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container">
        <div className="flex flex-col items-center gap-4 text-center">
          <a href="#hero" className="text-base font-semibold text-text hover:opacity-80">
            Daffa Aria
          </a>
          <p className="max-w-md text-sm text-text-secondary">
            Junior Backend Developer — membangun API yang cepat, sistem yang stabil, dan solusi
            yang menyelesaikan masalah nyata.
          </p>
          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                {...(social.icon === 'mail'
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' })}
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-border-hover hover:bg-surface-2 hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Icon name={social.icon} size={18} />
              </a>
            ))}
          </div>
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} Muhammad Daffa Aria Firmansyah
          </p>
        </div>
      </div>
    </footer>
  );
}
