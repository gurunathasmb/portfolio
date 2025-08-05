// src/components/LoadingScreen.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { motion } from "framer-motion";

// --- GLSL Shader: Green Energy Waves ---
const WaveShaderMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color("#3AFF00") },
  // Vertex Shader
  `
    uniform float uTime;
    varying vec2 vUv;
    varying float vWave;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float waveX = sin(pos.x * 4.0 + uTime * 2.0) * 0.1;
      float waveY = cos(pos.y * 6.0 + uTime * 2.0) * 0.1;
      pos.z += waveX + waveY;
      vWave = waveX;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uColor;
    varying vec2 vUv;
    varying float vWave;

    void main() {
      float alpha = 0.5 + vWave * 2.0;
      gl_FragColor = vec4(uColor, alpha);
    }
  `
);
extend({ WaveShaderMaterial });

const EnergyWave = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uTime = clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[10, 10, 64, 64]} />
      <waveShaderMaterial ref={ref} side={THREE.DoubleSide} />
    </mesh>
  );
};

const letterAnimation = {
  hidden: { opacity: 0, y: -50, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 500,
      damping: 20,
    },
  }),
};

const glowAnimation = {
  animate: {
    textShadow: [
      "0 0 10px #3AFF00",
      "0 0 20px #3AFF00",
      "0 0 30px #3AFF00",
      "0 0 40px #3AFF00",
    ],
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1.5,
    },
  },
};

const LoadingScreen = () => {
  const welcomeText = "Welcome";

  return (
    <div className="fixed inset-0 z-50">
      {/* Three.js Canvas Background */}
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <EnergyWave />
      </Canvas>

      {/* Overlay Animated Text */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/70">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex space-x-1 text-[#3AFF00] text-6xl font-extrabold"
        >
          {welcomeText.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
            >
              <motion.span variants={glowAnimation} animate="animate">
                {char}
              </motion.span>
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
