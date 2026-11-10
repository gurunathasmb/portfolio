// src/components/3d/PortraitHologram.jsx
// Sci-fi hologram of the portrait in /guru-hd.jpg:
//  - intro: a particle cloud assembles into the portrait, then a scan line
//    reveals a projected holo-image (depth-displaced mesh) from bottom to top.
//  - holo-image: cyan duotone keeping real skin tones, glowing silhouette rim,
//    scanlines, sweep band, flicker and occasional row glitch.
//  - a holo-projector base with a volumetric light beam and rising rings.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Preferred: a clean portrait on a plain black background (public/guru-hd.jpg).
// Falls back to the original event photo, which needs heavier masking.
const PHOTO_HD = '/guru-hd.jpg';
const PHOTO_FALLBACK = '/guru.jpg';
const PHOTO_ASPECT = 1080 / 1011; // both photos are ~1.07 : 1
const PORTRAIT_H = 3.6;
const PORTRAIT_W = PORTRAIT_H * PHOTO_ASPECT;

// ---------------------------------------------------------------------------
// Subject isolation. The photo has a busy banner backdrop, so the person is
// isolated with two soft ellipses (head + torso) and the white / yellow / blue
// banner tones are keyed out. UV here has v = 0 at the TOP of the image.
// ---------------------------------------------------------------------------
const HEAD = { x: 0.485, y: 0.22, rx: 0.15, ry: 0.22 };
const BODY = { x: 0.52, y: 0.92, rx: 0.37, ry: 0.56 };

function ellipse(u, v, e) {
  const dx = (u - e.x) / e.rx;
  const dy = (v - e.y) / e.ry;
  return dx * dx + dy * dy; // < 1 inside
}

function subjectMask(u, v) {
  const h = ellipse(u, v, HEAD);
  const b = v > 0.38 ? ellipse(u, v, BODY) : 9;
  return Math.min(h, b);
}

function isBackdropColor(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  const white = max > 0.72 && sat < 0.22;
  const yellow = r > 0.55 && g > r * 0.88 && b < g * 0.6;
  const blueShield = b > 0.5 && b > r * 1.6 && sat > 0.45;
  return white || yellow || blueShield;
}

// Sculpted depth: domed head + rounded torso + a little luminance relief.
function depthAt(u, v, lum) {
  const h = ellipse(u, v, HEAD);
  const head = h < 1 ? Math.sqrt(1 - h) * 0.55 : 0;
  const dx = (u - 0.52) / 0.36;
  const torso = v > 0.4 ? Math.max(0, 1 - dx * dx) * 0.32 : 0;
  return Math.max(head, torso) + lum * 0.12;
}

// ---------------------------------------------------------------------------
// Shared photo assets: image, soft subject mask (canvas + data) and pixels.
// ---------------------------------------------------------------------------
let assetPromise = null;
function loadPhotoAssets() {
  if (assetPromise) return assetPromise;
  assetPromise = new Promise((resolve) => {
    const img = new Image();
    let clean = true;
    img.onerror = () => {
      clean = false;
      img.onerror = null;
      img.src = PHOTO_FALLBACK;
    };
    img.src = PHOTO_HD;
    img.onload = () => {
      const W = clean ? 432 : 270;
      const H = Math.round(W / PHOTO_ASPECT);
      const src = document.createElement('canvas');
      src.width = W;
      src.height = H;
      const sctx = src.getContext('2d', { willReadFrequently: true });
      sctx.drawImage(img, 0, 0, W, H);
      const photoPx = sctx.getImageData(0, 0, W, H).data;

      const maskImg = sctx.createImageData(W, H);
      const md = maskImg.data;
      if (clean) {
        // Flood-fill the black backdrop from the borders; everything not
        // reachable through near-black pixels is the subject (keeps dark hair).
        const bg = new Uint8Array(W * H);
        const dark = (j) => Math.max(photoPx[j * 4], photoPx[j * 4 + 1], photoPx[j * 4 + 2]) < 14;
        const stack = [];
        for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
        for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
        while (stack.length) {
          const j = stack.pop();
          if (bg[j] || !dark(j)) continue;
          bg[j] = 1;
          const x = j % W;
          if (x > 0) stack.push(j - 1);
          if (x < W - 1) stack.push(j + 1);
          if (j >= W) stack.push(j - W);
          if (j < W * (H - 1)) stack.push(j + W);
        }
        for (let j = 0; j < W * H; j++) {
          md[j * 4] = md[j * 4 + 1] = md[j * 4 + 2] = 255;
          md[j * 4 + 3] = bg[j] ? 0 : 255;
        }
      } else for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4;
          const m = subjectMask(x / W, y / H);
          const keep =
            m < 1 && !isBackdropColor(photoPx[i] / 255, photoPx[i + 1] / 255, photoPx[i + 2] / 255);
          const a = keep ? Math.round(Math.min(1, (1 - m) / 0.25) * 255) : 0;
          md[i] = md[i + 1] = md[i + 2] = 255;
          md[i + 3] = a;
        }
      }
      const raw = document.createElement('canvas');
      raw.width = W;
      raw.height = H;
      raw.getContext('2d').putImageData(maskImg, 0, 0);

      // Blur to close pinholes and soften the silhouette.
      const mask = document.createElement('canvas');
      mask.width = W;
      mask.height = H;
      const mctx = mask.getContext('2d', { willReadFrequently: true });
      mctx.filter = clean ? 'blur(0.8px)' : 'blur(1.6px)';
      mctx.drawImage(raw, 0, 0);
      const maskData = mctx.getImageData(0, 0, W, H).data;

      resolve({ img, W, H, photoPx, mask, maskData, clean });
    };
  });
  return assetPromise;
}

function usePhotoAssets() {
  const [assets, setAssets] = useState(null);
  useEffect(() => {
    let alive = true;
    loadPhotoAssets().then((a) => alive && setAssets(a));
    return () => {
      alive = false;
    };
  }, []);
  return assets;
}

// ---------------------------------------------------------------------------
// Timeline (seconds after the scene starts)
// ---------------------------------------------------------------------------
const T_ASSEMBLE = 2.4; // particles fly in
const T_REVEAL_START = 1.9; // holo-image scan starts
const T_REVEAL = 1.4; // scan duration
const BASE_Y = -PORTRAIT_H / 2 - 0.05;

function useTimeline() {
  const start = useRef(null);
  return (clock) => {
    if (start.current === null) start.current = clock.elapsedTime;
    return clock.elapsedTime - start.current;
  };
}

// ---------------------------------------------------------------------------
// Intro particles (settle into a faint shimmer once the image is revealed)
// ---------------------------------------------------------------------------
function buildParticles(assets, cols) {
  const { img } = assets;
  const W = cols;
  const H = Math.round(cols / PHOTO_ASPECT);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, W, H);
  const px = ctx.getImageData(0, 0, W, H).data;

  const targets = [];
  const randoms = [];
  const seeds = [];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const u = x / W;
      const v = y / H;
      const mx = Math.min(assets.W - 1, Math.floor(u * assets.W));
      const my = Math.min(assets.H - 1, Math.floor(v * assets.H));
      if (assets.maskData[(my * assets.W + mx) * 4 + 3] < 128) continue;
      const i = (y * W + x) * 4;
      const lum = (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) / 255;
      targets.push((u - 0.5) * PORTRAIT_W, (0.5 - v) * PORTRAIT_H, depthAt(u, v, lum) + 0.02);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const rad = 4 + Math.random() * 6;
      randoms.push(
        rad * Math.sin(phi) * Math.cos(theta),
        rad * Math.sin(phi) * Math.sin(theta),
        rad * Math.cos(phi) - 2
      );
      seeds.push(Math.random());
    }
  }
  return {
    targets: new Float32Array(targets),
    randoms: new Float32Array(randoms),
    seeds: new Float32Array(seeds),
  };
}

const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uPixelRatio;
  uniform vec3 uMouse;
  attribute vec3 aTarget;
  attribute vec3 aRandom;
  attribute float aSeed;
  varying float vSeed;
  void main() {
    float delay = aSeed * 0.45;
    float p = clamp((uProgress - delay) / 0.55, 0.0, 1.0);
    p = p * p * (3.0 - 2.0 * p);
    vec3 pos = mix(aRandom, aTarget, p);
    pos += vec3(sin(uTime * 1.1 + aSeed * 50.0), cos(uTime * 0.9 + aSeed * 30.0), 0.0) * 0.012 * p;

    vec3 diff = pos - uMouse;
    float force = smoothstep(0.6, 0.0, length(diff.xy)) * p;
    pos.xy += normalize(diff.xy + 0.0001) * force * 0.4;
    pos.z += force * 0.7;

    vSeed = aSeed;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.2 + force * 6.0) * uPixelRatio * (8.0 / -mv.z);
  }
`;

const particleFragment = /* glsl */ `
  uniform float uAlpha;
  uniform float uTime;
  varying float vSeed;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float twinkle = 0.6 + 0.4 * sin(uTime * 3.0 + vSeed * 60.0);
    vec3 col = mix(vec3(0.35, 1.0, 0.9), vec3(0.75, 0.7, 1.0), step(0.8, vSeed));
    gl_FragColor = vec4(col, smoothstep(0.5, 0.0, d) * uAlpha * twinkle);
  }
`;

function ParticleCloud({ assets, ready }) {
  const data = useMemo(() => {
    const fine = window.matchMedia('(pointer: fine)').matches && window.innerWidth > 900;
    return buildParticles(assets, fine ? 170 : 110);
  }, [assets]);
  const matRef = useRef();
  const hover = useRef(false);
  const time = useTimeline();
  const { gl } = useThree();

  useEffect(() => {
    const el = gl.domElement;
    const on = () => (hover.current = true);
    const off = () => (hover.current = false);
    el.addEventListener('pointermove', on);
    el.addEventListener('pointerleave', off);
    return () => {
      el.removeEventListener('pointermove', on);
      el.removeEventListener('pointerleave', off);
    };
  }, [gl]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uAlpha: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
    }),
    [gl]
  );

  useFrame(({ clock, pointer, viewport }) => {
    if (!matRef.current || !ready) return;
    const t = time(clock);
    const u = matRef.current.uniforms;
    u.uTime.value = clock.elapsedTime;
    u.uProgress.value = Math.min(1, t / T_ASSEMBLE);
    // Bright while assembling, then a faint shimmer over the revealed image.
    const settle = THREE.MathUtils.smoothstep(t, T_REVEAL_START, T_REVEAL_START + T_REVEAL);
    u.uAlpha.value = THREE.MathUtils.lerp(0.95, 0.08, settle);
    if (hover.current) {
      u.uMouse.value.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0);
    } else {
      u.uMouse.value.set(99, 99, 0);
    }
  });

  return (
    <points frustumCulled={false} renderOrder={3}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.targets, 3]} />
        <bufferAttribute attach="attributes-aTarget" args={[data.targets, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[data.randoms, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[data.seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Projected holo-image
// ---------------------------------------------------------------------------
const holoVertex = /* glsl */ `
  uniform sampler2D uMask;
  varying vec2 vUv;
  float ellipse(vec2 p, vec2 c, vec2 r) { vec2 d = (p - c) / r; return dot(d, d); }
  void main() {
    vUv = uv;
    vec2 t = vec2(uv.x, 1.0 - uv.y);
    float h = ellipse(t, vec2(${HEAD.x}, ${HEAD.y}), vec2(${HEAD.rx}, ${HEAD.ry}));
    float head = h < 1.0 ? sqrt(1.0 - h) * 0.5 : 0.0;
    float dx = (t.x - 0.52) / 0.36;
    float torso = t.y > 0.4 ? max(0.0, 1.0 - dx * dx) * 0.3 : 0.0;
    float m = texture2D(uMask, uv).a;
    float z = max(head, torso) * smoothstep(0.2, 0.9, m);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xy, z, 1.0);
  }
`;

const holoFragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform sampler2D uMask;
  uniform float uTime;
  uniform float uReveal;
  uniform float uGlitch;
  varying vec2 vUv;

  float hash(float n) { return fract(sin(n) * 43758.5453); }

  void main() {
    vec2 uv = vUv;
    // Row-shift glitch.
    float row = floor(uv.y * 70.0);
    float g = uGlitch * (hash(row + floor(uTime * 24.0)) - 0.5) * 0.05;
    uv.x += g;

    float m = texture2D(uMask, uv).a;
    if (m < 0.02) discard;

    float ca = 0.0018 + abs(g) * 0.4;
    vec3 c = vec3(
      texture2D(uMap, uv + vec2(ca, 0.0)).r,
      texture2D(uMap, uv).g,
      texture2D(uMap, uv - vec2(ca, 0.0)).b
    );
    float lum = dot(c, vec3(0.299, 0.587, 0.114));

    // Cyan duotone blended with true colour so the face stays recognisable.
    vec3 holo = mix(vec3(0.02, 0.16, 0.24), vec3(0.6, 1.0, 0.96), pow(lum, 0.7));
    vec3 col = mix(holo, c * 1.15, 0.5);

    // Glowing silhouette rim.
    float e = 0.007;
    float mn = min(
      min(texture2D(uMask, uv + vec2(e, 0.0)).a, texture2D(uMask, uv - vec2(e, 0.0)).a),
      min(texture2D(uMask, uv + vec2(0.0, e)).a, texture2D(uMask, uv - vec2(0.0, e)).a)
    );
    float rim = clamp((m - mn) * 3.0, 0.0, 1.0);
    col += vec3(0.35, 1.0, 0.9) * rim * 1.2;

    // Fine screen-space scanlines + slow sweep band.
    col *= 0.86 + 0.14 * sin(gl_FragCoord.y * 1.7);
    float band = smoothstep(0.025, 0.0, abs(fract(uTime * 0.11) - uv.y));
    col += vec3(0.35, 1.0, 0.9) * band * 0.35;

    // Bottom-up reveal with a bright scan edge.
    float rv = uReveal * 1.08;
    float shown = smoothstep(rv, rv - 0.04, uv.y);
    float edge = smoothstep(0.025, 0.0, abs(uv.y - rv)) * (1.0 - step(0.999, uReveal));
    col += vec3(0.6, 1.0, 0.95) * edge * 2.5;

    float flick = 0.95 + 0.05 * sin(uTime * 41.0) * sin(uTime * 7.0);
    float alpha = m * clamp(shown + edge, 0.0, 1.0) * flick * 0.96;
    gl_FragColor = vec4(col, alpha);
  }
`;

function HoloImage({ assets, ready }) {
  const matRef = useRef();
  const time = useTimeline();
  const glitch = useRef({ until: 0, next: 6 });

  const uniforms = useMemo(() => {
    const map = new THREE.Texture(assets.img);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 8;
    map.needsUpdate = true;
    const mask = new THREE.CanvasTexture(assets.mask);
    return {
      uMap: { value: map },
      uMask: { value: mask },
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uGlitch: { value: 0 },
    };
  }, [assets]);

  useFrame(({ clock }) => {
    if (!matRef.current || !ready) return;
    const t = time(clock);
    const u = matRef.current.uniforms;
    u.uTime.value = clock.elapsedTime;
    u.uReveal.value = THREE.MathUtils.clamp((t - T_REVEAL_START) / T_REVEAL, 0, 1);
    // Occasional short glitch bursts.
    const g = glitch.current;
    if (t > g.next) {
      g.until = t + 0.18;
      g.next = t + 5 + Math.random() * 6;
    }
    u.uGlitch.value = t < g.until ? 1 : 0;
  });

  return (
    <mesh renderOrder={2}>
      <planeGeometry args={[PORTRAIT_W, PORTRAIT_H, 160, 150]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={holoVertex}
        fragmentShader={holoFragment}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Holo-projector: emitter disc, light beam and rising rings
// ---------------------------------------------------------------------------
const simpleVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const discFragment = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vec2 p = vUv - 0.5;
    float r = length(p) * 2.0;
    if (r > 1.0) discard;
    float core = pow(smoothstep(1.0, 0.0, r), 2.0) * 0.55;
    float rim = smoothstep(0.06, 0.0, abs(r - 0.92)) * 1.2;
    float rings = (0.5 + 0.5 * sin(r * 70.0 - uTime * 4.0)) * smoothstep(1.0, 0.3, r) * 0.18;
    float ticks = step(0.94, fract(atan(p.y, p.x) * 9.549 + uTime * 0.2)) * smoothstep(0.06, 0.0, abs(r - 0.8));
    gl_FragColor = vec4(vec3(0.35, 1.0, 0.9), core + rim + rings + ticks * 0.8);
  }
`;

const beamVertex = /* glsl */ `
  varying vec2 vUv;
  varying float vFres;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 n = normalize(normalMatrix * normal);
    vFres = 1.0 - abs(dot(n, normalize(-mv.xyz)));
    gl_Position = projectionMatrix * mv;
  }
`;

const beamFragment = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vFres;
  void main() {
    float fade = pow(1.0 - vUv.y, 1.8);
    float streaks = 0.65 + 0.35 * sin(vUv.x * 90.0 + uTime * 0.8) * sin(vUv.x * 23.0 - uTime * 0.5);
    float a = fade * streaks * (0.25 + 0.75 * vFres) * 0.22;
    gl_FragColor = vec4(vec3(0.35, 1.0, 0.9), a);
  }
`;

function Projector() {
  const rings = useRef([]);
  const discUniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const beamUniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const beamH = PORTRAIT_H + 0.5;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    discUniforms.uTime.value = t;
    beamUniforms.uTime.value = t;
    rings.current.forEach((r, i) => {
      if (!r) return;
      const k = (t * 0.35 + i / 3) % 1;
      r.position.y = BASE_Y + 0.05 + k * 1.6;
      r.scale.setScalar(1 - k * 0.25);
      r.material.opacity = (1 - k) * 0.55;
    });
  });

  return (
    <group>
      <mesh position={[0, BASE_Y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 3.6]} />
        <shaderMaterial
          uniforms={discUniforms}
          vertexShader={simpleVertex}
          fragmentShader={discFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Emitter housing */}
      <mesh position={[0, BASE_Y - 0.13, 0]}>
        <cylinderGeometry args={[1.75, 1.95, 0.22, 96]} />
        <meshBasicMaterial color="#0a1418" />
      </mesh>
      <mesh position={[0, BASE_Y - 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.75, 0.012, 8, 160]} />
        <meshBasicMaterial color="#5eead4" />
      </mesh>
      <mesh position={[0, BASE_Y + beamH / 2, 0]} renderOrder={1}>
        <cylinderGeometry args={[2.05, 1.62, beamH, 96, 1, true]} />
        <shaderMaterial
          uniforms={beamUniforms}
          vertexShader={beamVertex}
          fragmentShader={beamFragment}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => (rings.current[i] = el)} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.6, 1.64, 128]} />
          <meshBasicMaterial color="#5eead4" transparent depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Scene
// ---------------------------------------------------------------------------
// Gentle hover so the projection feels suspended in the beam.
function Hover({ children }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.y = 0.06 + Math.sin(clock.elapsedTime * 0.8) * 0.04;
  });
  return <group ref={ref}>{children}</group>;
}

function Rig({ ready }) {
  const group = useRef();
  const assets = usePhotoAssets();

  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.3 + Math.sin(t * 0.3) * 0.06, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.08, 0.05);
  });

  return (
    <group ref={group} position={[0, 0.15, 0]}>
      <Projector />
      {assets && ready && (
        <Hover>
          <HoloImage assets={assets} ready={ready} />
          <ParticleCloud assets={assets} ready={ready} />
        </Hover>
      )}
    </group>
  );
}

export default function PortraitHologram({ ready = true }) {
  const [finePointer, setFinePointer] = useState(false);
  useEffect(() => {
    setFinePointer(window.matchMedia('(pointer: fine)').matches);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.5, 8.9], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ touchAction: finePointer ? 'none' : 'pan-y' }}
    >
      <Rig ready={ready} />
      <Sparkles count={70} scale={[7, 6, 4]} size={2} speed={0.3} color="#5eead4" opacity={0.5} />
      {finePointer && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 2 - 0.35}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minAzimuthAngle={-0.6}
          maxAzimuthAngle={0.6}
          enableDamping
        />
      )}
    </Canvas>
  );
}
