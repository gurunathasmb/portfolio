// src/components/Experience.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, GitBranch, Server, ShieldCheck, GraduationCap } from 'lucide-react';
import { Section, SectionHeader, FadeIn } from './ui/Section';

// Current role. Edit `highlights` to match your actual day-to-day work.
const current = {
  role: 'MLOps Engineer',
  org: 'Nivaris Healthcare Pvt Ltd',
  period: 'Present',
  summary:
    'Building and operating the machine learning platform behind healthcare products — taking models from experimentation to reliable, monitored production services.',
  highlights: [
    { icon: GitBranch, title: 'ML pipelines', desc: 'Reproducible training & evaluation pipelines with versioned data and models.' },
    { icon: Server, title: 'Model serving', desc: 'Containerised inference APIs deployed through automated CI/CD.' },
    { icon: Activity, title: 'Monitoring', desc: 'Latency, drift and data-quality tracking for models in production.' },
    { icon: ShieldCheck, title: 'Healthcare-grade', desc: 'Engineering with privacy, auditability and reliability in mind.' },
  ],
  stack: ['Python', 'Docker', 'CI/CD', 'FastAPI', 'AWS', 'MLflow', 'Monitoring'],
};

const past = [
  {
    period: 'Research Internship · 3 months',
    role: 'AI Research Intern',
    org: 'National Aerospace Laboratories (NAL)',
    desc: 'Computer-vision pipelines for process monitoring and surface-defect detection on aerospace components.',
  },
  {
    period: 'Internship',
    role: 'Machine Learning Intern',
    org: 'Nokia',
    desc: 'ML-based radio propagation loss models combining FSPL, Hata and COST-231 with regression to forecast 4G/5G signal metrics.',
  },
  {
    period: 'Internship',
    role: 'Full-Stack ML Intern',
    org: 'Techmiya Solutions',
    desc: 'Full-stack web modules with integrated ML features and asynchronous API-driven automation.',
  },
  {
    period: 'Internship',
    role: 'Engineering Intern',
    org: 'Nuverea Infotech',
    desc: 'MERN analytics dashboard for real-time telemetry, with optimised MongoDB indexing.',
  },
];

const education = [
  {
    period: '2022 — 2026',
    degree: 'B.E. Artificial Intelligence & Machine Learning',
    institution: 'Dayananda Sagar College of Engineering',
    score: 'CGPA 8.67 / 10',
  },
  {
    period: '2020 — 2022',
    degree: 'Pre-University (PCMB)',
    institution: "Patil's Oxford PU Science College",
    score: '89.85%',
  },
  {
    period: '2019 — 2020',
    degree: 'Secondary School Certificate',
    institution: 'GOVT High School Rajanakolur',
    score: '78.4%',
  },
];

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeader
        index="02"
        eyebrow="Experience"
        title="Where I'm"
        accent="building now."
        subtitle="Currently running ML in production for healthcare — backed by research at NAL and industry internships."
      />

      {/* ---------- Featured current role ---------- */}
      <FadeIn>
        <div className="gradient-border relative overflow-hidden rounded-3xl p-px">
          <div className="relative rounded-3xl bg-[#0a0d12]/95 p-7 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-teal-200">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
                  </span>
                  Current role · {current.period}
                </div>
                <h3 className="film-title text-4xl sm:text-5xl text-white">{current.role}</h3>
                <div className="mt-2 text-lg text-slate-300">{current.org}</div>
                <p className="mt-6 font-light leading-relaxed text-slate-400">{current.summary}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {current.stack.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                {current.highlights.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 * i }}
                    className="glass-card rounded-2xl p-6"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-300/20 to-violet-400/20 text-teal-200">
                      <Icon size={18} />
                    </div>
                    <div className="film-title text-xl text-white">{title}</div>
                    <p className="mt-2 text-sm font-light leading-relaxed text-slate-400">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ---------- Timeline + education ---------- */}
      <div className="mt-20 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <FadeIn>
            <div className="mb-8 text-[11px] uppercase tracking-[0.3em] text-slate-500">Previously</div>
          </FadeIn>
          <div className="relative space-y-10 border-l border-white/10 pl-8">
            {past.map((item, i) => (
              <FadeIn key={item.org} delay={i * 0.06}>
                <div className="relative">
                  <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-[#07080a] bg-gradient-to-br from-teal-300 to-violet-400 shadow-[0_0_12px_rgba(94,234,212,0.6)]" />
                  <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{item.period}</div>
                  <h4 className="film-title mt-1 text-2xl text-white">{item.role}</h4>
                  <div className="text-sm text-teal-200/80">{item.org}</div>
                  <p className="mt-2 text-sm font-light leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <FadeIn>
            <div className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-500">
              <GraduationCap size={14} /> Education
            </div>
          </FadeIn>
          <div className="space-y-4">
            {education.map((e, i) => (
              <FadeIn key={e.degree} delay={i * 0.06}>
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="text-[11px] text-slate-500">{e.period}</div>
                    <div className="text-xs font-medium text-teal-200">{e.score}</div>
                  </div>
                  <div className="film-title mt-2 text-xl text-white">{e.degree}</div>
                  <div className="mt-1 text-sm text-slate-400">{e.institution}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
