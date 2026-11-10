// src/components/Certificate.jsx
import React, { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionHeader, FadeIn } from './ui/Section';
import TiltCard from './ui/TiltCard';

const certificates = [
  { id: 1, title: 'Google Cloud Career Launchpad', issuer: 'Google Cloud', image: '/certificates/google.jpg' },
  { id: 2, title: 'Deep Learning Institute Credential', issuer: 'Nvidia', image: '/certificates/nvidia.png' },
  { id: 3, title: 'Machine Learning Internship Credential', issuer: 'Nokia Networks', image: '/certificates/Nokia.jpg' },
  { id: 4, title: 'Generative AI Engineering', issuer: 'Microsoft', image: '/certificates/GenAI.jpg' },
  { id: 5, title: 'Infosys AI Certification', issuer: 'Infosys', image: '/certificates/AI.jpg' },
  { id: 6, title: 'Explore ML using Python', issuer: 'Google / Partner', image: '/certificates/ML.jpg' },
  { id: 7, title: 'Reinforcement Learning', issuer: 'NPTEL / IIT', image: '/certificates/RL.jpg' },
  { id: 8, title: 'Full Stack Engineering Internship', issuer: 'Nuverea Infotech', image: '/certificates/fullstack.png' },
];

export default function Certificate() {
  const [activeCert, setActiveCert] = useState(null);

  return (
    <Section id="certificate">
      <SectionHeader index="06" eyebrow="Credentials" title="Certified by" accent="industry leaders." />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {certificates.map((cert, i) => (
          <FadeIn key={cert.id} delay={(i % 4) * 0.06}>
            <TiltCard max={10} className="group cursor-pointer" onClick={() => setActiveCert(cert)}>
              <div className="glass-card h-full overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-white/70 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <Maximize2 size={13} />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-teal-200/80">{cert.issuer}</div>
                  <h4 className="film-title mt-1 text-lg text-white">{cert.title}</h4>
                </div>
              </div>
            </TiltCard>
          </FadeIn>
        ))}
      </div>

      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="gradient-border w-full max-w-3xl rounded-3xl p-px"
            >
              <div className="rounded-3xl bg-[#0b0e14] p-6 sm:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-teal-200/80">{activeCert.issuer}</div>
                    <h3 className="film-title text-2xl text-white">{activeCert.title}</h3>
                  </div>
                  <button onClick={() => setActiveCert(null)} className="rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white">
                    <X size={20} />
                  </button>
                </div>
                <div className="flex max-h-[65vh] items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-black">
                  <img src={activeCert.image} alt={activeCert.title} className="max-h-[60vh] w-auto object-contain" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
