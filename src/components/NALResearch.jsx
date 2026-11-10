// src/components/NALResearch.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AerospaceScannerScene from './3d/AerospaceScannerScene';

const stages = [
  { step: '01', title: 'Aerospace Component', desc: 'Precision-machined structural panel or aerofoil positioned under controlled illumination.' },
  { step: '02', title: 'Process Monitoring', desc: 'Continuous sensor acquisition monitoring thermal, spatial, and surface conditions.' },
  { step: '03', title: 'Vision Capture', desc: 'High-resolution optical profiling capturing fine surface textures.' },
  { step: '04', title: 'AI Analysis', desc: 'Convolutional feature extraction isolating micro-topological irregularities.' },
  { step: '05', title: 'Surface Defect Detection', desc: 'Localization of non-destructive surface micro-cracks and void formations.' },
  { step: '06', title: 'Inspection Insight', desc: 'Structural integrity grading without destructive laboratory testing.' },
  { step: '07', title: 'Engineering Decision', desc: 'Immediate automated feedback loop into manufacturing quality control.' },
];

const pipeline = [
  'Input',
  'Sensor Data',
  'Preprocessing',
  'Computer Vision',
  'AI Model',
  'Defect Detection',
  'Analysis',
  'Inspection',
];

export default function NALResearch() {
  const [activeStage, setActiveStage] = useState(3);

  return (
    <section id="nal-research" className="py-32 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto relative bg-[#07080a]">
      {/* Chapter Tag */}
      <div className="text-xs font-sans tracking-[0.25em] text-slate-500 uppercase mb-4">
        Chapter 02 — Aerospace AI Research
      </div>

      {/* Main Title in DM Serif Display */}
      <div className="max-w-4xl mb-16">
        <h2 className="film-title text-4xl sm:text-6xl lg:text-7xl text-white font-normal mb-6">
          National Aerospace Laboratories
        </h2>
        <div className="text-lg sm:text-2xl text-slate-300 font-sans font-light mb-4">
          AI-Driven Process Monitoring & Surface Defect Detection for Aerospace Applications
        </div>
        <div className="text-sm font-sans text-emerald-400 tracking-wider uppercase mb-6">
          Research Experience — 3 Months
        </div>
        <p className="text-base sm:text-lg text-slate-400 font-sans font-light leading-relaxed max-w-3xl">
          Worked on AI-driven approaches for process monitoring and surface defect detection with applications in aerospace manufacturing and inspection.
        </p>
      </div>

      {/* Main Cinematic 3D Scene + Contextual Story Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Left: 3D Scanner (7 cols) */}
        <div className="lg:col-span-7">
          <AerospaceScannerScene />
        </div>

        {/* Right: Narrative Story Progression (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-xs font-sans uppercase tracking-widest text-slate-500 mb-2">
            Inspection Stages
          </div>

          <div className="space-y-4">
            {stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <div
                  key={stage.step}
                  onClick={() => setActiveStage(idx)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.04] border-white/20'
                      : 'bg-transparent border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans text-xs tracking-wider text-slate-400">
                      Phase {stage.step}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    )}
                  </div>
                  <h4 className="film-title text-lg text-white mb-1">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans font-light leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Clean Minimalist Data Pipeline Flow */}
      <div className="border-t border-white/10 pt-12">
        <div className="text-xs font-sans uppercase tracking-widest text-slate-500 mb-6">
          Detection Workflow Pipeline
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-sans text-slate-300">
          {pipeline.map((item, i) => (
            <React.Fragment key={item}>
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
                {item}
              </span>
              {i < pipeline.length - 1 && (
                <span className="text-slate-600">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
