"use client";

import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { Points as ThreePoints } from "three";

const STAR_COUNT = 1800;
const RADIUS = 1.15;

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

function StarField() {
  const ref = useRef<ThreePoints>(null);
  const sphere = useMemo(() => randomPointsInSphere(STAR_COUNT, RADIUS), []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
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
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
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
