// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ['hero', ...LINKS.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5 sm:py-7'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-12">
        <a href="#hero" className="film-title text-xl sm:text-2xl text-white">
          Guru<span className="text-gradient">.</span>
        </a>

        <nav
          className={`hidden items-center gap-1 rounded-full border p-1 text-xs transition-all duration-500 md:flex ${
            scrolled ? 'border-white/10 bg-[#07080a]/70 backdrop-blur-xl' : 'border-transparent'
          }`}
        >
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative rounded-full px-4 py-2 tracking-wide transition-colors ${
                active === l.id ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.08]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </a>
          ))}
        </nav>

        <a href="/Guru_1DS22AI016.pdf" download className="btn-ghost hidden !py-2 !px-4 !text-xs md:inline-flex">
          Resume
        </a>

        <button onClick={() => setOpen(!open)} className="text-slate-300 hover:text-white md:hidden" aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mt-3 rounded-2xl border border-white/10 bg-[#07080a]/95 p-4 backdrop-blur-xl md:hidden"
          >
            {LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white">
                {l.label}
              </a>
            ))}
            <a href="/Guru_1DS22AI016.pdf" download className="block rounded-xl px-4 py-3 text-sm text-teal-200">
              Download resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
