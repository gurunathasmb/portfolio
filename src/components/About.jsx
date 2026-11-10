// src/components/About.jsx
import React from 'react';
import { MapPin, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { Section, SectionHeader, FadeIn } from './ui/Section';
import TiltCard from './ui/TiltCard';

const facts = [
  { icon: Briefcase, label: 'Role', value: 'MLOps Engineer · Nivaris Healthcare' },
  { icon: GraduationCap, label: 'Degree', value: 'B.E. AI & ML · DSCE · 8.67' },
  { icon: MapPin, label: 'Based in', value: 'Bengaluru, India' },
];

const pillars = [
  { title: 'Production MLOps', desc: 'Pipelines, serving, CI/CD and monitoring.' },
  { title: 'Computer Vision', desc: 'Inspection, segmentation, classification.' },
  { title: 'LLM Agents & RAG', desc: 'Multi-agent orchestration with tools & memory.' },
  { title: 'Full-Stack ML', desc: 'APIs and interfaces that put models in hands.' },
];

export default function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-16 lg:grid-cols-12">
        {/* Collector ID card */}
        <div className="lg:col-span-5">
          <FadeIn>
            <TiltCard max={6} glare={false} className="group mx-auto max-w-md">
              <div className="gradient-border rounded-[28px] p-px">
                <div className="relative overflow-hidden rounded-[27px] bg-black">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src="/guru-hd.jpg"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/guru.jpg';
                      }}
                      alt="Gurunathagouda M Biradar"
                      className="h-full w-full object-cover object-top"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(94,234,212,0.12),transparent_60%)]" />
                  </div>
                  <div className="relative space-y-3 border-t border-white/10 bg-[#0b0e14] p-6">
                    <div className="film-title text-2xl text-white">Gurunathagouda M Biradar</div>
                    {facts.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3 text-sm">
                        <Icon size={15} className="mt-0.5 shrink-0 text-teal-300" />
                        <span className="w-16 shrink-0 pt-0.5 text-[10px] uppercase tracking-widest text-slate-500">{label}</span>
                        <span className="text-slate-200">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </FadeIn>
        </div>

        <div className="lg:col-span-7">
          <SectionHeader index="01" eyebrow="About" title="I turn models into" accent="dependable products." />
          <FadeIn delay={0.1}>
            <div className="space-y-5 text-base sm:text-lg font-light leading-relaxed text-slate-300 -mt-6">
              <p>
                I'm an MLOps and machine learning engineer who cares about the unglamorous half of AI — the
                pipelines, deployments and monitoring that let a model keep working long after the demo.
              </p>
              <p className="text-slate-400">
                Today I do that at <span className="text-white">Nivaris Healthcare</span>. Before that I built
                surface-defect vision systems at <span className="text-white">National Aerospace Laboratories</span>{' '}
                and RF propagation models at <span className="text-white">Nokia</span>.
              </p>
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <FadeIn key={p.title} delay={0.15 + i * 0.05}>
                <div className="glass-card group flex items-start gap-3 rounded-2xl p-5">
                  <Sparkles size={16} className="mt-1 shrink-0 text-violet-300 transition-transform group-hover:rotate-12" />
                  <div>
                    <div className="film-title text-lg text-white">{p.title}</div>
                    <div className="text-sm font-light text-slate-400">{p.desc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
