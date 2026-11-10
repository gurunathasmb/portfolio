// src/components/ThreeBG.jsx
import React from 'react';

// Fixed atmospheric backdrop: slow drifting aurora blobs over deep obsidian.
export default function ThreeBG() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#07080a]">
      <div className="aurora-blob left-[-10%] top-[-15%] h-[38rem] w-[38rem] bg-teal-500/[0.07]" />
      <div className="aurora-blob right-[-12%] top-[30%] h-[34rem] w-[34rem] bg-violet-500/[0.07] [animation-delay:-8s]" />
      <div className="aurora-blob left-[20%] bottom-[-20%] h-[30rem] w-[30rem] bg-sky-500/[0.05] [animation-delay:-16s]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,8,10,0.85)_100%)]" />
    </div>
  );
}
