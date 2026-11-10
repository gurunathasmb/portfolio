// src/components/ui/TiltCard.jsx
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// 3D perspective tilt with a moving specular glare. Disabled on touch.
export default function TiltCard({ children, className = '', max = 10, glare = true, onClick }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 180, damping: 18 });
  const sy = useSpring(py, { stiffness: 180, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glareBg = useTransform(
    [sx, sy],
    ([x, y]) => `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.16), transparent 55%)`
  );

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 1100 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        onClick={onClick}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`relative h-full ${className}`}
      >
        {children}
        {glare && (
          <motion.div
            style={{ background: glareBg }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </motion.div>
    </div>
  );
}
