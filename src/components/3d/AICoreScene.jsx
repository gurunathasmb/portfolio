import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Neural Orbiting Particles & Data Nodes
function NeuralParticles({ count = 280 }) {
  const points = useRef();
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color('#00FF88');
    const colorB = new THREE.Color('#00F0FF');
    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Golden spiral distribution on sphere shell
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 2.4 + Math.sin(i * 0.5) * 0.4;

      pos[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      tempColor.lerpColors(colorA, colorB, Math.random());
      col[i * 3] = tempColor.r;
      col[i * 3 + 1] = tempColor.g;
      col[i * 3 + 2] = tempColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (points.current) {
      const t = clock.getElapsedTime() * 0.15;
      points.current.rotation.y = t;
      points.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Tech Ring with Orbiting Data Markers
function OrbitalRings() {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.2;
      ring1.current.rotation.y = t * 0.35;
    }
    if (ring2.current) {
      ring2.current.rotation.y = -t * 0.25;
      ring2.current.rotation.z = t * 0.18;
    }
    if (ring3.current) {
      ring3.current.rotation.x = -t * 0.15;
      ring3.current.rotation.z = -t * 0.3;
    }
  });

  return (
    <group>
      {/* Equatorial Ring */}
      <mesh ref={ring1}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#00FF88" transparent opacity={0.6} />
      </mesh>
      
      {/* Polar Inclined Ring */}
      <mesh ref={ring2} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.7, 0.012, 16, 120]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.45} />
      </mesh>

      {/* Outer Gyro Ring */}
      <mesh ref={ring3} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[3.1, 0.008, 16, 120]} />
        <meshBasicMaterial color="#00FF88" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Pulsing Inner Quantum AI Core
function QuantumCore() {
  const coreRef = useRef();
  const wireRef = useRef();

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.4 + pointer.x * 0.5;
      coreRef.current.rotation.x = pointer.y * 0.3;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.3 + pointer.x * 0.3;
      wireRef.current.rotation.z = t * 0.2;
      const s = 1 + Math.sin(t * 2) * 0.04;
      wireRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      {/* Distorted Liquid Neural Energy Center */}
      <Sphere ref={coreRef} args={[1.25, 64, 64]}>
        <MeshDistortMaterial
          color="#06181B"
          emissive="#00FF88"
          emissiveIntensity={0.65}
          roughness={0.1}
          metalness={0.9}
          distort={0.4}
          speed={2.2}
          wireframe={false}
        />
      </Sphere>

      {/* Exterior Geodesic Wireframe Shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.7, 2]} />
        <meshStandardMaterial
          color="#00FF88"
          emissive="#00FF88"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Floating Center Singularity Light */}
      <pointLight color="#00FF88" intensity={4} distance={6} />
      <pointLight color="#00F0FF" intensity={2} distance={8} position={[2, 2, 2]} />
    </group>
  );
}

export default function AICoreScene() {
  return (
    <div className="w-full h-full relative" data-cursor="3d" data-cursor-text="ORBIT">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, -5, -3]} intensity={0.8} color="#00F0FF" />

        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
          <QuantumCore />
          <NeuralParticles />
          <OrbitalRings />
        </Float>
      </Canvas>
      
      {/* Overlay telemetry reticle corners */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-[#00FF88]/60 tracking-widest pointer-events-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-ping" />
        NEURAL CORE // ACTIVE
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#00F0FF]/60 tracking-widest pointer-events-none">
        FREQ: 432.8 THz | SYNC: 100%
      </div>
    </div>
  );
}
