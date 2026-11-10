// src/components/CustomCursor.jsx
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Dot + lagging ring cursor (fine pointers only). Uses motion values so it
// never re-renders React on mouse move.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHovered(!!e.target.closest('a, button, [role="button"], input, textarea, canvas'));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div
        style={{ x, y }}
        className="fixed left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-teal-200 shadow-[0_0_12px_rgba(94,234,212,0.8)]"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovered ? 1.8 : 1, opacity: hovered ? 0.9 : 0.45 }}
        transition={{ duration: 0.25 }}
        className="fixed left-0 top-0 -ml-4 -mt-4 h-8 w-8 rounded-full border border-teal-200/70 mix-blend-difference"
      />
    </div>
  );
}
