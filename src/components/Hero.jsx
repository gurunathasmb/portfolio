// src/components/Hero.jsx
import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Move3d } from 'lucide-react';

const PortraitHologram = lazy(() => import('./3d/PortraitHologram'));

const ease = [0.16, 1, 0.3, 1];

const STATS = [
  { value: 'Now', label: 'MLOps @ Nivaris' },
  { value: '8.67', label: 'CGPA / 10' },
  { value: '9+', label: 'AI systems built' },
];

function Reveal({ children, delay = 0 }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero({ ready = true }) {
  const d = ready ? 0 : 2.6; // wait for the intro screen

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden pt-28 pb-16 px-6 sm:px-12 lg:px-20">
      <div className="pointer-events-none absolute -right-40 top-10 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.16),transparent_62%)] blur-2xl" />
      <div className="pointer-events-none absolute right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.14),transparent_65%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-0 hero-grid" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12 min-h-[calc(100vh-11rem)]">
        {/* ---------- Copy ---------- */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <motion.a
            href="#experience"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: d + 0.1 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-4 text-xs text-slate-300 backdrop-blur hover:border-teal-300/40 transition-colors"
          >
            <span className="rounded-full bg-teal-300/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-teal-200">
              Now
            </span>
            MLOps Engineer at Nivaris Healthcare
            <ArrowUpRight size={13} className="text-slate-500" />
          </motion.a>

          <h1 className="film-title text-[2.6rem] sm:text-6xl xl:text-[5rem] text-white leading-[0.95] mb-6">
            <Reveal delay={d + 0.2}>Gurunathagouda</Reveal>
            <Reveal delay={d + 0.32}>
              <span className="text-gradient italic">ships intelligence.</span>
            </Reveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: d + 0.5 }}
            className="max-w-xl text-lg sm:text-xl font-light leading-relaxed text-slate-300 mb-10"
          >
            MLOps &amp; machine learning engineer taking models from notebook to
            production — computer vision, LLM agents and the pipelines that keep
            them reliable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: d + 0.65 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <a href="#projects" className="btn-glow group">
              <span>Explore my work</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="/Guru_1DS22AI016.pdf" download className="btn-ghost">
              Download CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: d + 0.85 }}
            className="grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10"
          >
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#07080a]/80 px-4 py-4 backdrop-blur">
                <div className="film-title text-2xl text-white">{s.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">{s.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: d + 1 }}
            className="mt-8 flex items-center gap-6 text-xs text-slate-500"
          >
            <a href="https://github.com/gurunathasmb" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <span>/</span>
            <a href="https://linkedin.com/in/gurunathasmb" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <span>/</span>
            <a href="mailto:gurunathagoudambiradar@gmail.com" className="hover:text-white transition-colors">Email</a>
          </motion.div>
        </div>

        {/* ---------- 3D portrait bundle ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: d, ease }}
          className="relative lg:col-span-6 order-1 lg:order-2 h-[62vh] sm:h-[72vh] lg:h-[84vh]"
        >
          <div className="absolute inset-0">
            {ready && (
              <Suspense fallback={null}>
                <PortraitHologram ready={ready} />
              </Suspense>
            )}
          </div>

          <div className="hud-corner left-2 top-2" />
          <div className="hud-corner right-2 top-2 rotate-90" />
          <div className="hud-corner right-2 bottom-2 rotate-180" />
          <div className="hud-corner left-2 bottom-2 -rotate-90" />

          <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-teal-300/80">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-300" />
            holo-link · live
          </div>

          <div className="pointer-events-none absolute right-5 top-5 hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:flex">
            <Move3d size={14} /> Drag to rotate
          </div>

          {/* HUD readouts */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: d + 3.2 }}
            className="hud-panel pointer-events-none absolute left-3 top-[14%] hidden w-40 xl:block"
          >
            <div className="hud-label">Subject</div>
            <div className="hud-value">G. M. Biradar</div>
            <div className="hud-label mt-3">Role</div>
            <div className="hud-value">MLOps Engineer</div>
            <div className="hud-label mt-3">Org</div>
            <div className="hud-value">Nivaris Healthcare</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: d + 3.4 }}
            className="hud-panel pointer-events-none absolute right-3 top-[14%] hidden w-40 text-right xl:block"
          >
            <div className="hud-label">Core stack</div>
            {['PyTorch', 'Docker · CI/CD', 'Computer Vision', 'LLM Agents · RAG'].map((k, i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: d + 3.6 + i * 0.12 }}
                className="mt-2 flex items-center justify-end gap-2 font-mono text-[11px] text-slate-300"
              >
                <span className="h-1 w-1 rounded-full bg-teal-300" />
                {k}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-500 lg:flex">
        <span>Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
