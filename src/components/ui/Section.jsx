// src/components/ui/Section.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

export function FadeIn({ children, delay = 0, y = 28, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({ index, eyebrow, title, accent, subtitle, align = 'left' }) {
  const center = align === 'center';
  return (
    <div className={`mb-16 sm:mb-20 ${center ? 'mx-auto text-center max-w-3xl' : 'max-w-3xl'}`}>
      <FadeIn>
        <div className={`mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-slate-500 ${center ? 'justify-center' : ''}`}>
          <span className="font-mono text-teal-300/80">{index}</span>
          <span className="h-px w-10 bg-gradient-to-r from-teal-300/60 to-transparent" />
          <span>{eyebrow}</span>
        </div>
      </FadeIn>
      <FadeIn delay={0.08}>
        <h2 className="film-title text-4xl sm:text-6xl text-white leading-[1.02]">
          {title} {accent && <span className="text-gradient italic">{accent}</span>}
        </h2>
      </FadeIn>
      {subtitle && (
        <FadeIn delay={0.16}>
          <p className="mt-5 text-base sm:text-lg font-light leading-relaxed text-slate-400">{subtitle}</p>
        </FadeIn>
      )}
    </div>
  );
}

export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative px-6 sm:px-12 lg:px-20 py-28 sm:py-36 ${className}`}>
      <div className="relative mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
