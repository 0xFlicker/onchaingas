import { Color, Euler, useFrame, Vector2, Vector3 } from "@react-three/fiber";
import { FC, useMemo } from "react";
import { gridShader } from "shader/grid";
import { BackSide, FrontSide } from "three";

export const GridRect: FC<{
  rotation: Euler;
  position: Vector3;
  scale: Vector3;
  color: Color;
  opacity: number;
  glow: number;
  width: number;
  spacing: Vector2;
  offsetX: number;
  offsetY: number;
  speed: number;
}> = ({
  rotation,
  position,
  scale,
  color,
  opacity,
  glow,
  width,
  spacing,
  offsetX,
  offsetY,
  speed,
}) => {
  const gridShaderUniforms = useMemo(() => {
    return {
      color: { value: color },
      opacity: { value: opacity },
      width: { value: width },
      glow: { value: glow },
      spacing: { value: spacing },
      offsetX: { value: offsetX },
      offsetY: { value: offsetY },
    };
  }, [color, opacity, width, glow, spacing, offsetX, offsetY]);
  useFrame(() => {
    gridShaderUniforms.offsetX.value += speed;
    if (gridShaderUniforms.offsetX.value > 1) {
      gridShaderUniforms.offsetX.value -= 1;
    }
  });
  return (
    <mesh rotation={rotation} position={position} scale={scale}>
      <planeBufferGeometry attach="geometry" args={[1, 1, 1, 1]} />

      <shaderMaterial
        attach="material"
        fragmentShader={gridShader.fragmentShader}
        vertexShader={gridShader.vertexShader}
        uniforms={gridShaderUniforms}
        side={FrontSide}
        transparent
      />
    </mesh>
  );
};
