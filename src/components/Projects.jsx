// src/components/Projects.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { Section, SectionHeader, FadeIn } from './ui/Section';
import TiltCard from './ui/TiltCard';

const caseStudies = [
  {
    num: '01',
    title: 'Real-Time Speech Recognition System',
    category: 'Signal Processing & NLP',
    image: '/1.png',
    repo: 'https://github.com/gurunathasmb/NLPhackthon',
    problem: 'Live conversational audio streaming suffers from high word error rates under ambient room noise and strict low-latency requirements.',
    solution: 'Engineered an asynchronous speech processing pipeline utilizing acoustic filtering and NLP language modeling to deliver real-time transcription via Web APIs.',
    tech: ['Python', 'NLP', 'Audio Signal Processing', 'FastAPI', 'WebSockets'],
  },
  {
    num: '02',
    title: 'AI Fashion Style Classification',
    category: 'Computer Vision',
    image: '/2.png',
    repo: 'https://github.com/gurunathasmb/CNN-Model-',
    problem: 'Multi-class visual attribute detection across diverse fashion datasets with varying lighting, drape, and occlusions.',
    solution: 'Designed and trained a deep convolutional neural network (CNN) pipeline with extensive data augmentation to predict clothing categories and style patterns.',
    tech: ['Python', 'PyTorch', 'CNN', 'OpenCV', 'Scikit-Learn'],
  },
  {
    num: '03',
    title: 'GUDBLOOD Emergency Response Platform',
    category: 'Full Stack Engineering',
    image: '/3.png',
    repo: 'https://github.com/gurunathasmb/GUDBLOOD',
    problem: 'Life-critical time delays in locating compatible emergency blood donors in immediate geographic proximity.',
    solution: 'Constructed an end-to-end platform connecting donors and healthcare recipients in real time, featuring indexed geospatial queries and high-availability database architecture.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    num: '04',
    title: 'Cow Breed Vision Backend',
    category: 'Computer Vision',
    image: '/4.png',
    repo: 'https://github.com/gurunathasmb/cow-breed-backend',
    problem: 'Automated identification of livestock breeds from non-standardized field photography for veterinary and agricultural record systems.',
    solution: 'Developed an OpenCV image preprocessing pipeline and feature extraction backend to classify breed morphology from image inputs.',
    tech: ['Python', 'OpenCV', 'Computer Vision', 'Flask APIs'],
  },
  {
    num: '05',
    title: 'Binary Sentiment Analysis Engine',
    category: 'NLP & Machine Learning',
    image: '/5.png',
    repo: 'https://github.com/gurunathasmb/electronix_ai',
    problem: 'Rapid polarity classification over high-volume text streams where complex large models introduce unnecessary compute costs.',
    solution: 'Implemented high-throughput statistical NLP classifiers utilizing TF-IDF representations, Logistic Regression, and Naive Bayes for sub-millisecond evaluation.',
    tech: ['Python', 'Scikit-Learn', 'NLP', 'TF-IDF', 'Statistical ML'],
  },
  {
    num: '06',
    title: 'Synthesis Multi-Agent LLM System',
    category: 'Generative AI & Agentic Systems',
    image: '/9.png',
    repo: 'https://github.com/gurunathasmb/synthetic-agent',
    problem: 'Complex multi-step engineering queries often hallucinate when handled by single-pass LLM prompts.',
    solution: 'Built a multi-agent orchestration architecture using LangChain/LangGraph coordinating research, reasoning, code, and tool-calling agents with shared vector memory.',
    tech: ['LangGraph', 'LangChain', 'Multi-Agent', 'Vector RAG', 'Tool Calling'],
  },
  {
    num: '07',
    title: '3D Brain Tumor Segmentation & Classification',
    category: 'Medical AI & Computer Vision',
    image: '/8.png',
    repo: 'https://github.com/gurunathasmb/brain-tumor-ai',
    problem: 'Precise delineation of glioma tumor boundaries across multimodal 3D MRI scans with high anatomical variability.',
    solution: 'Engineered a 3D medical vision pipeline integrating Attention U-Net for volumetric spatial segmentation and hybrid ResNet-Transformers for multi-class tumor grading.',
    tech: ['PyTorch', 'Attention U-Net', '3D MRI Vision', 'Transformers'],
  },
  {
    num: '08',
    title: 'AI Talking Avatar Generator',
    category: 'Generative Vision & Audio',
    image: '/7.png',
    repo: 'https://github.com/gurunathasmb/lipscyn',
    problem: 'Realistic facial lip-sync animation from arbitrary audio speech without requiring expensive 3D motion capture rigs.',
    solution: 'Implemented generative speech-to-video synthesis adapting Wav2Lip and GAN architectures to synchronize lip kinematics on static portrait photos.',
    tech: ['PyTorch', 'Wav2Lip', 'GANs', 'OpenCV', 'Audio-Visual Sync'],
  },
  {
    num: '09',
    title: 'Academic Project Management System',
    category: 'Full Stack Web Architecture',
    image: '/6.png',
    repo: 'https://github.com/gurunathasmb/project_managment',
    problem: 'Managing student-teacher project submissions, grading milestones, and review loops with role-based access control.',
    solution: 'Full-stack MERN platform with granular RBAC permissions, document uploads, and evaluation tracking.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT Auth'],
  },
];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const cats = ['All', 'Computer Vision', 'GenAI & NLP', 'Full Stack'];
  const match = (p) => {
    if (filter === 'All') return true;
    const c = p.category.toLowerCase();
    if (filter === 'Computer Vision') return c.includes('vision');
    if (filter === 'GenAI & NLP') return c.includes('nlp') || c.includes('generative') || c.includes('signal');
    return c.includes('full stack');
  };
  const list = caseStudies.filter(match);

  return (
    <Section id="projects">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          index="04"
          eyebrow="Selected work"
          title="Systems I've"
          accent="built & shipped."
          subtitle="Computer vision, generative AI and full-stack platforms — each with a real problem behind it."
        />
        <FadeIn className="mb-16 sm:mb-20">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-4 py-2 text-xs transition-all ${
                  filter === c
                    ? 'border-transparent bg-gradient-to-r from-teal-300 to-violet-300 text-black'
                    : 'border-white/10 text-slate-300 hover:border-white/30'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </FadeIn>
      </div>

      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense">
        <AnimatePresence mode="popLayout">
          {list.map((project, idx) => {
            const featured = filter === 'All' && idx === 0;
            return (
              <motion.article
                layout
                key={project.num}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={featured ? 'lg:col-span-2 lg:row-span-1' : ''}
              >
                <TiltCard max={6} className="group">
                  <div className="glass-card flex h-full flex-col overflow-hidden rounded-3xl">
                    <div className={`relative overflow-hidden ${featured ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/10 to-transparent" />
                      <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-teal-200 backdrop-blur">
                        {project.category}
                      </div>
                      <div className="absolute right-4 top-4 font-mono text-xs text-white/50">{project.num}</div>
                    </div>

                    <div className="flex flex-1 flex-col p-6" style={{ transform: 'translateZ(30px)' }}>
                      <h3 className="film-title text-2xl text-white">{project.title}</h3>
                      <p className="mt-3 text-sm font-light leading-relaxed text-slate-400">
                        <span className="text-slate-300">Problem · </span>{project.problem}
                      </p>
                      <p className={`mt-2 text-sm font-light leading-relaxed text-slate-400 ${featured ? '' : 'line-clamp-3'}`}>
                        <span className="text-slate-300">Build · </span>{project.solution}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span key={t} className="chip">{t}</span>
                        ))}
                      </div>
                      <div className="mt-auto pt-6">
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-teal-200"
                        >
                          <Github size={15} />
                          <span>View code</span>
                          <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
