// src/components/3d/CinematicHeroScene.jsx
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Precision Machined Aerospace Aerofoil / Turbine Blisk Component
function AerospaceMachinedSpecimen() {
  const groupRef = useRef();

  // Create array of aerodynamic stator blades around a central titanium hub
  const blades = useMemo(() => {
    const count = 12;
    const items = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      items.push({
        id: i,
        rotation: [0.3, angle, 0.45],
        position: [Math.cos(angle) * 1.4, Math.sin(angle) * 1.4, 0],
      });
    }
    return items;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (groupRef.current) {
      // Cinematic gentle poise: NO fast constant spinning
      const t = clock.getElapsedTime() * 0.12;
      // Gentle cinematic sway influenced subtly by mouse parallax
      groupRef.current.rotation.y = Math.sin(t) * 0.25 + pointer.x * 0.3;
      groupRef.current.rotation.x = 0.35 + Math.cos(t * 0.8) * 0.08 - pointer.y * 0.2;
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0.5, 0, 0]}>
      {/* Central Machined Titanium Hub Ring */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.35, 1.35, 0.65, 48]} />
        <meshStandardMaterial
          color="#1e232d"
          metalness={0.92}
          roughness={0.24}
        />
      </mesh>

      {/* Internal Precision Bore / Shaft */}
      <mesh>
        <cylinderGeometry args={[0.75, 0.75, 0.75, 36]} />
        <meshStandardMaterial
          color="#0d0f14"
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* Retaining Lip Ring with subtle edge highlight */}
      <mesh position={[0, 0.34, 0]}>
        <torusGeometry args={[1.35, 0.04, 16, 64]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.98}
          roughness={0.12}
        />
      </mesh>
      <mesh position={[0, -0.34, 0]}>
        <torusGeometry args={[1.35, 0.04, 16, 64]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.98}
          roughness={0.12}
        />
      </mesh>

      {/* Sculpted Aerodynamic Blades */}
      {blades.map((blade) => (
        <mesh
          key={blade.id}
          position={blade.position}
          rotation={blade.rotation}
          castShadow
          receiveShadow
        >
          {/* Tapered aerofoil blade shape */}
          <boxGeometry args={[0.32, 1.1, 0.08]} />
          <meshStandardMaterial
            color="#28303d"
            metalness={0.94}
            roughness={0.22}
          />
        </mesh>
      ))}

      {/* Outer Shroud Ring (Dark Carbon / Titanium composite) */}
      <mesh>
        <torusGeometry args={[2.0, 0.06, 16, 64]} />
        <meshStandardMaterial
          color="#151921"
          metalness={0.88}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}

// Atmospheric Airborne Dust Particles
function AtmosphericHaze({ count = 80 }) {
  const pointsRef = useRef();

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return [pos];
  }, [count]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#cbd5e1"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function CinematicHeroScene() {
  return (
    <div className="w-full h-full relative pointer-events-none sm:pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        {/* Soft Ambient Laboratory Darkness */}
        <ambientLight intensity={0.4} />

        {/* Dramatic Key Light from Top Left (Sculpting surfaces) */}
        <directionalLight
          position={[-4, 6, 5]}
          intensity={2.4}
          color="#f8fafc"
          castShadow
        />

        {/* Cool Rim Light from Back Right (Highlighting metallic silhouette) */}
        <directionalLight
          position={[5, -2, -3]}
          intensity={1.8}
          color="#64748b"
        />

        {/* Restrained Aerospace Emerald Accent Reflection */}
        <spotLight
          position={[0, -4, 2]}
          intensity={0.6}
          color="#22c55e"
          angle={0.6}
          penumbra={1}
        />

        <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.2}>
          <AerospaceMachinedSpecimen />
          <AtmosphericHaze />
        </Float>
      </Canvas>
    </div>
  );
}
