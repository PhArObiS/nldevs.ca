"use client";

import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { CSSProperties } from "react";
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

type LogoDriftStyle = CSSProperties & Record<`--${string}`, string>;

const LOGO_DRIFTS: Array<{ className: string; style: LogoDriftStyle }> = [
  {
    className:
      "left-[7%] top-[18%] h-12 w-12 opacity-30 md:h-16 md:w-16",
    style: {
      animationDelay: "0s",
      animationDuration: "22s",
      "--float-x1": "34px",
      "--float-y1": "-28px",
      "--float-x2": "-22px",
      "--float-y2": "24px",
      "--float-r1": "120deg",
      "--float-r2": "255deg",
      "--float-r3": "40deg",
    },
  },
  {
    className:
      "right-[10%] top-[30%] h-10 w-10 opacity-25 md:h-14 md:w-14",
    style: {
      animationDelay: "-8s",
      animationDuration: "28s",
      "--float-x1": "-42px",
      "--float-y1": "30px",
      "--float-x2": "26px",
      "--float-y2": "-34px",
      "--float-r1": "-145deg",
      "--float-r2": "-310deg",
      "--float-r3": "-70deg",
    },
  },
  {
    className:
      "bottom-[16%] left-[18%] h-9 w-9 opacity-20 md:h-12 md:w-12",
    style: {
      animationDelay: "-15s",
      animationDuration: "32s",
      "--float-x1": "28px",
      "--float-y1": "36px",
      "--float-x2": "-36px",
      "--float-y2": "-18px",
      "--float-r1": "95deg",
      "--float-r2": "280deg",
      "--float-r3": "55deg",
    },
  },
  {
    className:
      "right-[22%] bottom-[22%] h-8 w-8 opacity-20 md:h-11 md:w-11",
    style: {
      animationDelay: "-4s",
      animationDuration: "26s",
      "--float-x1": "40px",
      "--float-y1": "-16px",
      "--float-x2": "-28px",
      "--float-y2": "-42px",
      "--float-r1": "160deg",
      "--float-r2": "360deg",
      "--float-r3": "84deg",
    },
  },
  {
    className:
      "left-[44%] top-[12%] h-7 w-7 opacity-[0.18] md:h-10 md:w-10",
    style: {
      animationDelay: "-11s",
      animationDuration: "34s",
      "--float-x1": "-38px",
      "--float-y1": "-22px",
      "--float-x2": "32px",
      "--float-y2": "34px",
      "--float-r1": "-110deg",
      "--float-r2": "-250deg",
      "--float-r3": "-45deg",
    },
  },
  {
    className:
      "right-[42%] bottom-[10%] h-8 w-8 opacity-[0.15] md:h-10 md:w-10",
    style: {
      animationDelay: "-20s",
      animationDuration: "38s",
      "--float-x1": "24px",
      "--float-y1": "-46px",
      "--float-x2": "-48px",
      "--float-y2": "10px",
      "--float-r1": "135deg",
      "--float-r2": "300deg",
      "--float-r3": "62deg",
    },
  },
  {
    className:
      "left-[72%] top-[64%] h-7 w-7 opacity-[0.15] md:h-9 md:w-9",
    style: {
      animationDelay: "-24s",
      animationDuration: "30s",
      "--float-x1": "-30px",
      "--float-y1": "38px",
      "--float-x2": "42px",
      "--float-y2": "-24px",
      "--float-r1": "-160deg",
      "--float-r2": "-340deg",
      "--float-r3": "-92deg",
    },
  },
];

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
      {LOGO_DRIFTS.map((logo, index) => (
        <div
          key={index}
          className={`floating-logo absolute ${logo.className}`}
          style={logo.style}
        >
          <Image
            src="/NavLogo.png"
            alt=""
            fill
            sizes="64px"
            className="object-contain drop-shadow-[0_0_18px_rgba(251,146,60,0.5)]"
            priority={index === 0}
          />
        </div>
      ))}
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
