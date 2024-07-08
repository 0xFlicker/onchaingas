import { forwardRef, useEffect, useRef, useState } from "react";
import {
  extend,
  Canvas as ThreeCanvas,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import {
  Image as Image_,
  SpotLight,
  Environment,
  Plane,
  useTexture,
  MeshReflectorMaterial,
} from "@react-three/drei";
import * as THREE from "three";
extend({
  ThreeCanvas,
  Image_,
});

// const AnimatedPlane = animated(Plane);

// export const Please: FC = () => {
//   return (
//     <>
//       <ThreeCanvas
//         gl={{ preserveDrawingBuffer: true }}
//         dpr={1.5}
//         frameloop="demand"
//         camera={{ position: [0, 0.5, 6], fov: 35 }}
//       >
//         <FrameLimiter fps={60} />
//         <Content />
//       </ThreeCanvas>
//     </>
//   );
// };

function lookingAt(obj: THREE.Object3D) {
  var direction = new THREE.Vector3(0, 0, 3);
  direction.applyMatrix4(obj.matrix);
  return direction;
}

export const StageLight = forwardRef<THREE.PointLight>(function SpotlightRef(
  _,
  ref
) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight ref={ref} position={[10, 10, 10]} />
    </>
  );
});
