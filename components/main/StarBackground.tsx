"use client";

import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { Points as ThreePoints } from "three";

const RADIUS = 1.18;

const STAR_LAYERS = [
  {
    count: 1100,
    radius: RADIUS,
    color: "#ffffff",
    size: 0.002,
    speedX: -0.1,
    speedY: -0.07,
  },
  {
    count: 520,
    radius: 1.05,
    color: "#22d3ee",
    size: 0.0028,
    speedX: -0.06,
    speedY: 0.1,
  },
  {
    count: 430,
    radius: 0.95,
    color: "#c084fc",
    size: 0.0032,
    speedX: 0.08,
    speedY: -0.05,
  },
  {
    count: 220,
    radius: 0.82,
    color: "#fb923c",
    size: 0.0036,
    speedX: 0.04,
    speedY: 0.08,
  },
] as const;

/**
 * Uniformly distributed points inside a sphere.
 *
 * Previously this came from `maath/random/dist/maath-random.esm`, which was
 * never declared in package.json — it only resolved as a transitive dependency
 * of @react-three/drei, so any hoisting change would have broken the build.
 */
function randomPointsInSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    // cbrt keeps the distribution uniform by volume rather than clustered at the core
    const r = Math.cbrt(Math.random()) * radius;
    const sinPhi = Math.sin(phi);

    positions[i * 3] = r * sinPhi * Math.cos(theta);
    positions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  return positions;
}

function StarLayer({
  count,
  radius,
  color,
  size,
  speedX,
  speedY,
}: (typeof STAR_LAYERS)[number]) {
  const ref = useRef<ThreePoints>(null);
  const sphere = useMemo(() => randomPointsInSphere(count, radius), [count, radius]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * speedX;
    ref.current.rotation.y += delta * speedY;
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function StarField() {
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {STAR_LAYERS.map((layer) => (
        <StarLayer key={layer.color} {...layer} />
      ))}
    </group>
  );
}

export default function StarsCanvas() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);

    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    // Fixed and click-through so it never intercepts pointer events
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.28),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(236,72,153,0.20),transparent_28%),radial-gradient(circle_at_50%_84%,rgba(251,146,60,0.16),transparent_30%),linear-gradient(180deg,rgba(3,0,20,0.08),rgba(3,0,20,0.84))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        // Render a single frame instead of a continuous loop for users who
        // have asked for reduced motion.
        frameloop={reducedMotion ? "demand" : "always"}
        // Cap the pixel ratio so high-DPI phones don't render 3x the pixels
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
      </Canvas>
    </div>
  );
}
