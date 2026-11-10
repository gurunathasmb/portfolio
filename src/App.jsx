// src/App.jsx
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ThreeBG from './components/ThreeBG';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MLOpsPipeline from './components/MLOpsPipeline';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Certificate from './components/Certificate';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#07080a] text-[#e2e8f0] font-sans selection:bg-white/10 selection:text-white">
      {/* Minimalist Dot Cursor */}
      <CustomCursor />

      {/* Cinematic Film Title Intro */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Deep Atmospheric Backdrop */}
      <ThreeBG />

      {/* Film grain + scroll progress */}
      <div className="grain-overlay" aria-hidden="true" />
      <ScrollProgress />

      {/* Minimal Navigation */}
      <Navbar />

      {/* Film Story Flow */}
      <main className="relative z-10">
        <Hero ready={!loading} />
        <About />
        <Experience />
        <MLOpsPipeline />
        <Projects />
        <Skills />
        <Certificate />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}