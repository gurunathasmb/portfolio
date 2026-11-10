// src/components/3d/AerospaceScannerScene.jsx
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Realistic Aerospace Specimen on Dark Inspection Stand
function AerospaceTestSpecimen({ scanProgress }) {
  const specimenRef = useRef();

  useFrame(({ clock, pointer }) => {
    if (specimenRef.current) {
      // Gentle cinematic re-orientation
      const t = clock.getElapsedTime() * 0.15;
      specimenRef.current.rotation.y = Math.sin(t) * 0.2 + pointer.x * 0.25;
      specimenRef.current.rotation.x = 0.2 - pointer.y * 0.15;
    }
  });

  return (
    <group ref={specimenRef} position={[0, -0.2, 0]}>
      {/* Precision Curved Titanium Aerofoil / Fuselage Specimen */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.3, 3.2, 48, 16, true, -Math.PI / 3, (2 * Math.PI) / 3]} />
        <meshStandardMaterial
          color="#1e232d"
          metalness={0.92}
          roughness={0.28}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Internal Structural Stringers / Stiffener Ribs */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.48, 1.28, 3.22, 12, 4, true, -Math.PI / 3, (2 * Math.PI) / 3]} />
        <meshStandardMaterial
          color="#0f1218"
          metalness={0.85}
          roughness={0.4}
          wireframe={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Dark Matte Inspection Support Mount */}
      <mesh position={[0, -1.8, 0]}>
        <cylinderGeometry args={[1.8, 2.0, 0.4, 32]} />
        <meshStandardMaterial
          color="#0a0c10"
          metalness={0.6}
          roughness={0.6}
        />
      </mesh>

      {/* Thin Optical Laser Scanning Beam Plane */}
      <group position={[0, scanProgress, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.2, 3.2]} />
          <meshBasicMaterial
            color="#22c55e"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Slender green optical reference line */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.29, 1.34, 32]} />
          <meshBasicMaterial
            color="#22c55e"
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

function ScannerContent() {
  const [scanY, setScanY] = useState(0);

  useFrame(({ clock }) => {
    // Slow, measured vertical scan across the specimen [-1.2, 1.2]
    const y = Math.sin(clock.getElapsedTime() * 0.9) * 1.2;
    setScanY(y);
  });

  return (
    <>
      <ambientLight intensity={0.35} />

      {/* Direct Overhead Inspection Spotlight */}
      <directionalLight
        position={[2, 6, 4]}
        intensity={2.0}
        color="#f8fafc"
      />

      {/* Soft Fill Light */}
      <directionalLight
        position={[-4, -1, -2]}
        intensity={0.8}
        color="#64748b"
      />

      {/* Restrained Optical Laser Highlight */}
      <pointLight
        position={[0, scanY, 1.8]}
        intensity={1.2}
        color="#22c55e"
        distance={4}
      />

      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.15}>
        <AerospaceTestSpecimen scanProgress={scanY} />
      </Float>
    </>
  );
}

export default function AerospaceScannerScene() {
  return (
    <div className="w-full h-full min-h-[460px] lg:min-h-[560px] relative bg-[#0a0c10] rounded-2xl overflow-hidden border border-white/10">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 44 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ScannerContent />
      </Canvas>

      {/* Minimal, elegant typographic annotations */}
      <div className="absolute top-6 left-6 font-sans text-xs tracking-wider text-slate-400">
        <span className="text-white block font-medium">National Aerospace Laboratories</span>
        <span className="text-slate-500 text-[11px]">Surface Inspection Rig — Optical Profiling</span>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-sans text-slate-500 border-t border-white/5 pt-3">
        <span className="flex items-center gap-2 text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Optical defect detection simulation
        </span>
        <span className="hidden sm:inline text-slate-600">
          Specimen: Ti-6Al-4V Alloy Profile
        </span>
      </div>
    </div>
  );
}
