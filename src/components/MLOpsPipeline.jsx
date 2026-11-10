// src/components/MLOpsPipeline.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Zap, Package, Cloud, Activity } from 'lucide-react';
import { Section, SectionHeader } from './ui/Section';

const stages = [
  { icon: Database, name: 'Data', tech: 'Validation · Feature store', desc: 'Schema checks, versioned datasets and balanced sampling.' },
  { icon: Cpu, name: 'Train', tech: 'PyTorch · Experiment tracking', desc: 'Tracked experiments, tuned hyper-parameters, reproducible runs.' },
  { icon: Zap, name: 'Serve', tech: 'FastAPI · Async', desc: 'Typed, low-latency inference endpoints with batching.' },
  { icon: Package, name: 'Package', tech: 'Docker · Multi-stage', desc: 'Lean, reproducible images that start fast.' },
  { icon: Cloud, name: 'Deploy', tech: 'CI/CD · AWS', desc: 'Automated tests and zero-downtime rollouts.' },
  { icon: Activity, name: 'Monitor', tech: 'Drift · Telemetry', desc: 'Latency, errors and prediction drift — with alerts.' },
];

export default function MLOpsPipeline() {
  return (
    <Section id="pipeline">
      <SectionHeader
        index="03"
        eyebrow="How I ship"
        title="From raw signal to"
        accent="production system."
        subtitle="The loop I run for every model — the same discipline I bring to healthcare ML at Nivaris."
      />

      <div className="relative">
        {/* Flowing connector (desktop) */}
        <div className="pointer-events-none absolute left-0 right-0 top-[34px] hidden h-px bg-white/10 lg:block">
          <div className="flow-line h-px w-full" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {stages.map(({ icon: Icon, name, tech, desc }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <div className="relative z-10 mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-white/10 bg-[#0b0e14] text-teal-200 shadow-[0_0_0_6px_#07080a] transition-all duration-500 group-hover:border-teal-300/50 group-hover:shadow-[0_0_0_6px_#07080a,0_0_40px_rgba(94,234,212,0.35)]">
                <Icon size={24} />
                <span className="absolute -right-2 -top-2 rounded-full bg-[#07080a] px-1.5 font-mono text-[10px] text-slate-500">
                  0{i + 1}
                </span>
              </div>
              <div className="film-title text-2xl text-white">{name}</div>
              <div className="mt-1 text-xs text-teal-200/80">{tech}</div>
              <p className="mt-3 text-sm font-light leading-relaxed text-slate-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
