// src/components/Qualifications.jsx
import React from 'react';

const experiences = [
  {
    period: 'Recent',
    role: 'Aerospace AI Researcher',
    org: 'National Aerospace Laboratories (NAL)',
    emphasis: true,
    desc: 'Conducted a 3-month research engagement on AI-driven process monitoring and surface defect detection for aerospace manufacturing. Built computer vision pipelines to isolate surface irregularities and structural anomalies on aerospace components without destructive testing.',
  },
  {
    period: 'Internship',
    role: 'Machine Learning Intern',
    org: 'Nokia',
    emphasis: false,
    desc: 'Formulated ML-based radio propagation loss models combining RF theoretical formulas (FSPL, Hata, COST-231) with regression models to forecast 4G/5G signal metrics and automated network evaluation pipelines.',
  },
  {
    period: 'Internship',
    role: 'Full-Stack ML Intern',
    org: 'Techmiya Solutions',
    emphasis: false,
    desc: 'Developed full-stack web modules with integrated machine learning features and asynchronous API-driven automation workflows.',
  },
  {
    period: 'Internship',
    role: 'Engineering Intern',
    org: 'Nuverea Infotech',
    emphasis: false,
    desc: 'Engineered a MERN analytics dashboard for real-time data telemetry and optimized MongoDB query indexing.',
  },
];

const education = [
  {
    period: '2022 — 2026',
    degree: 'B.E. in Artificial Intelligence & Machine Learning',
    institution: 'Dayananda Sagar College of Engineering',
    score: 'Cumulative GPA: 8.67 / 10.0',
  },
  {
    period: '2020 — 2022',
    degree: 'Pre-University Education (PCMB)',
    institution: "Patil's Oxford PU Science College",
    score: 'Percentage: 89.85%',
  },
  {
    period: '2019 — 2020',
    degree: 'Secondary School Certificate',
    institution: 'GOVT High School Rajanakolur',
    score: 'Percentage: 78.4%',
  },
];

export default function Qualifications() {
  return (
    <section id="experience" className="py-32 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto relative bg-[#07080a]">
      <div className="text-xs font-sans tracking-[0.25em] text-slate-500 uppercase mb-4">
        Chapter 06 — Track Record
      </div>

      <div className="max-w-3xl mb-20">
        <h2 className="film-title text-4xl sm:text-6xl text-white font-normal mb-4">
          Experience & Education
        </h2>
        <p className="text-slate-400 text-base sm:text-lg font-sans font-light leading-relaxed">
          Chronology of research appointments, engineering internships, and academic foundation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Professional & Research Experience (7 cols) */}
        <div className="lg:col-span-7">
          <div className="text-xs font-sans uppercase tracking-widest text-slate-500 mb-8 border-b border-white/10 pb-3">
            Research & Industry
          </div>

          <div className="space-y-12">
            {experiences.map((item) => (
              <div
                key={item.org}
                className={`border-l-2 pl-6 sm:pl-8 ${
                  item.emphasis ? 'border-emerald-400' : 'border-white/10'
                }`}
              >
                <div className="text-xs font-sans text-slate-500 uppercase tracking-wider mb-1">
                  {item.period} {item.emphasis && '• Flagship Research'}
                </div>
                <h3 className="film-title text-2xl text-white mb-1">
                  {item.role}
                </h3>
                <div className="text-sm font-sans text-slate-300 mb-3">
                  {item.org}
                </div>
                <p className="text-sm font-sans font-light text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Academic Degrees (5 cols) */}
        <div className="lg:col-span-5">
          <div className="text-xs font-sans uppercase tracking-widest text-slate-500 mb-8 border-b border-white/10 pb-3">
            Academic Background
          </div>

          <div className="space-y-10">
            {education.map((edu) => (
              <div key={edu.degree} className="border-l-2 border-white/10 pl-6">
                <div className="text-xs font-sans text-slate-500 mb-1">
                  {edu.period}
                </div>
                <h4 className="film-title text-xl text-white mb-1">
                  {edu.degree}
                </h4>
                <div className="text-sm font-sans text-slate-300 mb-1">
                  {edu.institution}
                </div>
                <div className="text-xs font-sans text-emerald-400">
                  {edu.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
