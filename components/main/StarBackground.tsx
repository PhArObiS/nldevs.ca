"use client";

import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

function StarBackground(props: any) {
  const ref = useRef<any>(null);

  // ✅ Generate positions once
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(5000), { radius: 1.15 }),
    []
  );

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function StarsCanvas() {
  return (
    // ✅ Don’t block clicks; keep it behind UI
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
      </Canvas>
    </div>
  );
}


// "use client"

// import React, { useRef, Suspense, use } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial, Preload } from "@react-three/drei";
// // @ts-ignore
// import * as random from "maath/random/dist/maath-random.esm";

// const StarBackground = (props: any) => {
//   const ref: any = useRef();
//   const sphere = random.inSphere(new Float32Array(5000), { radius: 1.15 });

//   useFrame((state, delta) => {
//     ref.current.rotation.x -= delta / 10;
//     ref.current.rotation.y -= delta / 15;
//   });

//   return (
//     <group rotation={[0, 0, Math.PI / 4]}>
//       <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
//         <PointMaterial
//           transparent
//           color="$fff"
//           size={0.002}
//           sizeAttenuation={true}
//           depthWrite={false} // Corrected typo here
//         />
//       </Points>
//     </group>
//   );
// };

// const StarsCanvas = () => (
//   <div className="w-full h-auto fixed inset-0 z-[20]">
//     <Canvas camera={{ position: [0, 0, 1] }}>
//       <Suspense fallback={null}>
//         <StarBackground />
//       </Suspense>
//     </Canvas>
//   </div>
// );

// export default StarsCanvas;
