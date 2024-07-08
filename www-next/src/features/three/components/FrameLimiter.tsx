import { useFrame } from "@react-three/fiber";
import { FC, useState } from "react";
import * as THREE from "three";

export const FrameLimiter: FC<{ fps: number }> = (props) => {
  const [clock] = useState(new THREE.Clock());

  useFrame((state) => {
    const timeUntilNextFrame = 1000 / props.fps - clock.getDelta();

    setTimeout(() => {
      state.invalidate();
    }, Math.max(0, timeUntilNextFrame));
  });

  return <></>;
};
