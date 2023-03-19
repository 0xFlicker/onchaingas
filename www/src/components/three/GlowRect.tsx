import { Color, Euler, useFrame, Vector2, Vector3 } from "@react-three/fiber";
import { FC, useMemo } from "react";
import { outlineShader } from "shader/outline";
import { BackSide, FrontSide } from "three";

export const GridRect: FC<{
  rotation: Euler;
  grid;
  position: Vector3;
  scale: Vector3;
  color: Color;
  opacity: number;
  glow: number;
  width: number;
}> = ({ rotation, position, scale, color, opacity, glow, width }) => {
  const outlineShaderUniforms = useMemo(() => {
    return {
      color: { value: color },
      opacity: { value: opacity },
      width: { value: width },
      glow: { value: glow },
    };
  }, [color, opacity, width, glow]);
  return (
    <mesh rotation={rotation} position={position} scale={scale}>
      <planeBufferGeometry attach="geometry" args={[1, 1, 1, 1]} />

      <shaderMaterial
        attach="material"
        fragmentShader={outlineShader.fragmentShader}
        vertexShader={outlineShader.vertexShader}
        uniforms={outlineShaderUniforms}
        side={FrontSide}
        transparent
      />
    </mesh>
  );
};
