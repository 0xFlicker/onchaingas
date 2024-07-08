import { useEffect, useRef, useState } from "react";
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
import { useRelativeOrientationSensor } from "../hooks/useDeviceMotion";
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

export const Lips = () => {
  const { viewport } = useThree();
  const { rotation, position } = useSpring({
    from: { rotation: [0, 0, 0], position: [0, 0, 0] },
    to: async (next) => {
      await next({ rotation: [0, -Math.PI / 4, 0] });
      await new Promise((r) => setTimeout(r, 1000));
      await next({ rotation: [0, Math.PI / 4, 0] });
      await new Promise((r) => setTimeout(r, 1000));
      await next({ rotation: [0, 0, 0] });
      await new Promise((r) => setTimeout(r, 1000));
      await next({ position: [0, 0, 5] });
    },
  });
  const imageRef = useRef<THREE.Group>(null);

  const texture = useTexture("/images/lips.webp");
  return (
    <>
      {/* <color attach="background" args={["#000000"]} /> */}
      <animated.group
        ref={imageRef}
        position={position as any}
        rotation={rotation as any}
      >
        <Plane
          args={[1, 1]}
          position={[0, 0, 0]}
          rotation={[Math.PI, Math.PI, Math.PI]}
        >
          <meshBasicMaterial map={texture} transparent />
        </Plane>
      </animated.group>
    </>
  );
};
