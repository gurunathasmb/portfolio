// src/components/Contact.jsx
import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Github, Linkedin, FileText, Phone } from 'lucide-react';
import { Section, FadeIn } from './ui/Section';

const EMAIL = 'gurunathagoudambiradar@gmail.com';

const links = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/gurunathasmb', ext: true },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/gurunathasmb', ext: true },
  { icon: FileText, label: 'Resume', href: '/Guru_1DS22AI016.pdf', download: true },
  { icon: Phone, label: '+91 81977 36731', href: 'tel:+918197736731' },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <Section id="contact">
      <FadeIn>
        <div className="gradient-border relative overflow-hidden rounded-[36px] p-px">
          <div className="relative overflow-hidden rounded-[35px] bg-[#0a0d12] px-6 py-16 sm:px-14 sm:py-24">
            <div className="pointer-events-none absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-teal-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -right-20 h-[30rem] w-[30rem] rounded-full bg-violet-500/15 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 hero-grid opacity-60" />

            <div className="relative mx-auto max-w-4xl text-center">
              <div className="mb-6 text-[11px] uppercase tracking-[0.3em] text-slate-500">
                <span className="font-mono text-teal-300/80">07</span> · Contact
              </div>
              <h2 className="film-title text-5xl sm:text-7xl lg:text-8xl leading-[0.95] text-white">
                Let's build something <span className="text-gradient italic">intelligent.</span>
              </h2>
              <p className="mx-auto mt-8 max-w-xl text-lg font-light leading-relaxed text-slate-300">
                Open to MLOps, machine learning engineering and research collaborations.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href={`mailto:${EMAIL}`} className="btn-glow group">
                  <span>Say hello</span>
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <button onClick={copy} className="btn-ghost gap-2">
                  {copied ? <Check size={15} className="text-teal-300" /> : <Copy size={15} />}
                  <span className="max-w-[16rem] truncate">{copied ? 'Copied!' : EMAIL}</span>
                </button>
              </div>

              <div className="mt-12 flex flex-wrap justify-center gap-3">
                {links.map(({ icon: Icon, label, href, ext, download }) => (
                  <a
                    key={label}
                    href={href}
                    {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(download ? { download: true } : {})}
                    className="chip inline-flex items-center gap-2 !px-4 !py-2 hover:!border-teal-300/50 hover:!text-white"
                  >
                    <Icon size={14} /> {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
