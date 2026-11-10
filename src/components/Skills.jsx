// src/components/Skills.jsx
import React from 'react';
import { Brain, Eye, Bot, Code2, Server } from 'lucide-react';
import { Section, SectionHeader, FadeIn } from './ui/Section';

const domains = [
  {
    icon: Server,
    title: 'MLOps & Cloud',
    span: 'lg:col-span-2',
    items: ['Docker', 'CI/CD', 'AWS (EC2 / S3)', 'FastAPI serving', 'Model monitoring', 'Linux', 'Git', 'PostgreSQL', 'MongoDB'],
  },
  {
    icon: Brain,
    title: 'Machine & Deep Learning',
    span: '',
    items: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'CNNs', 'LSTMs', 'Attention U-Net'],
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    span: '',
    items: ['OpenCV', 'Defect detection', 'Segmentation', '3D MRI', 'Preprocessing'],
  },
  {
    icon: Bot,
    title: 'Generative AI & Agents',
    span: '',
    items: ['LangChain', 'LangGraph', 'Multi-agent', 'RAG', 'Chroma / Pinecone', 'Tool calling'],
  },
  {
    icon: Code2,
    title: 'Full-Stack Engineering',
    span: '',
    items: ['Python', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Three.js', 'REST / GraphQL'],
  },
];

const marquee = ['PyTorch', 'Docker', 'FastAPI', 'LangGraph', 'OpenCV', 'AWS', 'React', 'Three.js', 'MLflow', 'RAG', 'CI/CD', 'Transformers'];

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeader
        index="05"
        eyebrow="Toolkit"
        title="The stack behind"
        accent="the systems."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {domains.map(({ icon: Icon, title, items, span }, i) => (
          <FadeIn key={title} delay={i * 0.06} className={span}>
            <div className="glass-card group relative h-full overflow-hidden rounded-3xl p-7">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-400/0 blur-3xl transition-colors duration-700 group-hover:bg-teal-400/15" />
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-300/20 to-violet-400/20 text-teal-200">
                  <Icon size={22} />
                </div>
                <h3 className="film-title text-2xl text-white">{title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Infinite marquee */}
      <div className="marquee-mask mt-16 overflow-hidden">
        <div className="marquee flex w-max gap-10">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i} className="film-title whitespace-nowrap text-3xl sm:text-4xl text-white/15">
              {t} <span className="text-teal-300/40">✦</span>
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
