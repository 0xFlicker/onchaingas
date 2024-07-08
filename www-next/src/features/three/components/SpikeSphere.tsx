import { Sphere, Cone } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { FC, useMemo, useRef } from "react";
import { ComponentPropsWithoutRef } from "react";
import * as THREE from "three";

const { Select } = require("@react-three/postprocessing");

const useSpikePositionsAndRotations = (): ComponentPropsWithoutRef<
  typeof Cone
>[] => {
  return useMemo(() => {
    const positionsAndRotations: ComponentPropsWithoutRef<typeof Cone>[] = [];
    const numSpikes = 6;
    const radius = 0.8;
    const offset = 2 / numSpikes;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numSpikes; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;

      const position = [x * radius, y * radius, z * radius];
      const normalizedPosition = position.map((coord) => coord / radius) as [
        number,
        number,
        number
      ];
      const coneHeight = 1.5;
      const yOffset = coneHeight / 2;
      const tipPosition: [number, number, number] = [
        position[0] + normalizedPosition[0] * yOffset,
        position[1] + normalizedPosition[1] * yOffset,
        position[2] + normalizedPosition[2] * yOffset,
      ];

      const upVector = new THREE.Vector3(0, 1, 0);
      const spikeDirection = new THREE.Vector3(...normalizedPosition);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        upVector,
        spikeDirection
      );
      const eulerRotation = new THREE.Euler().setFromQuaternion(quaternion);

      positionsAndRotations.push({
        position: tipPosition,
        rotation: eulerRotation,
        args: [0.5, coneHeight, 32],
      });
    }

    return positionsAndRotations;
  }, []);
};
export const SpikedBall: FC<
  GroupProps & {
    autoSpin?: boolean;
  }
> = ({ autoSpin = false, ...groupProps }) => {
  const spinRef = useRef<THREE.Group>();
  const spikePositionsAndRotations = useSpikePositionsAndRotations();

  useFrame(() => {
    if (autoSpin && spinRef.current) {
      spinRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <group {...groupProps}>
        <group ref={spinRef as any}>
          <Select enabled layers={1}>
            {spikePositionsAndRotations.map((spike, index) => (
              <Cone
                key={index}
                args={spike.args}
                position={spike.position}
                rotation={spike.rotation}
                scale={[1, 1, 1]}
                layers={2}
              >
                <meshPhysicalMaterial
                  reflectivity={0.8}
                  roughness={0.5}
                  metalness={0.8}
                  color={new THREE.Color(0x444444)}
                />
              </Cone>
            ))}
          </Select>
          <Select enabled layers={1}>
            <Sphere
              args={[1, 32, 32]}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={[1, 1, 1]}
            >
              <meshPhysicalMaterial
                reflectivity={0.8}
                roughness={0.5}
                color={new THREE.Color(0x444444)}
                metalness={0.8}
              />
            </Sphere>
          </Select>
        </group>
      </group>
    </>
  );
};

/*
<mesh position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
  <sphereGeometry args={[1, 32, 32]} />
  <meshPhysicalMaterial
    reflectivity={0.2}
    roughness={0.2}
    color={new THREE.Color(0x333333)}
  />
</mesh>
*/
