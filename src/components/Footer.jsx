// src/components/Footer.jsx
import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-6 py-10 sm:px-12 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="film-title text-base text-white">Gurunathagouda</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-300" /> Bengaluru, India
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-slate-300 transition-colors hover:border-teal-300/50 hover:text-white"
        >
          Back to top <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}
