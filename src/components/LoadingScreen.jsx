// src/components/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 400);   // Light emerges
    const t2 = setTimeout(() => setStage(2), 1100);  // Name in DM Serif
    const t3 = setTimeout(() => setStage(3), 1800);  // Role subtitle
    const t4 = setTimeout(() => onComplete && onComplete(), 2600); // Complete

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[99999] bg-[#07080a] flex flex-col items-center justify-center select-none"
    >
      {/* Subtle Atmospheric Light Flare */}
      <div className="relative flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: stage >= 1 ? 0.35 : 0,
            scale: stage >= 1 ? 1.2 : 0.6,
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-48 h-48 rounded-full bg-radial from-emerald-500/20 via-transparent to-transparent blur-2xl absolute pointer-events-none"
        />

        {/* Cinematic Title in DM Serif Display */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: stage >= 2 ? 1 : 0,
            y: stage >= 2 ? 0 : 15,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="film-title text-4xl sm:text-6xl text-white font-normal tracking-tight mb-3"
        >
          Gurunathagouda
        </motion.h1>

        {/* Role Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 3 ? 1 : 0 }}
          transition={{ duration: 0.7 }}
          className="text-xs font-sans tracking-[0.3em] uppercase text-slate-400"
        >
          AI • Machine Learning • Engineering
        </motion.p>
      </div>

      {/* Skip button */}
      <button
        onClick={() => onComplete && onComplete()}
        className="absolute bottom-10 text-xs font-sans text-slate-600 hover:text-slate-300 transition-colors uppercase tracking-widest"
      >
        Skip intro
      </button>
    </motion.div>
  );
}
