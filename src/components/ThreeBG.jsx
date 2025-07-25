// src/components/ThreeBG.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

export default function ThreeBG() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Stars radius={100} depth={50} count={10000} factor={4} saturation={0} fade />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
        </Suspense>
      </Canvas>
    </div>
  );
}
