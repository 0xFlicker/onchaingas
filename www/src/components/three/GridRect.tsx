import { Color, Euler, useFrame, Vector2, Vector3 } from "@react-three/fiber";
import { FC, useMemo, useRef } from "react";
import { GridMaterial } from "shader/grid";
import { FrontSide, ShaderMaterial } from "three";
import { v4 as uuidv4 } from "uuid";

const key = uuidv4();

const ShaderComponent: FC<{
  color: Color;
  opacity: number;
  width: number;
  glow: number;
  spacing: Vector2;
  speed: number;
}> = ({ color, opacity, width, glow, spacing, speed }) => {
  const shaderRef = useRef<ShaderMaterial>();
  const uniforms = useMemo(() => {
    return {
      color: { value: color },
      opacity: { value: opacity },
      width: { value: width },
      glow: { value: glow },
      spacing: { value: spacing },
      offsetX: { value: 0 },
      offsetY: { value: 0 },
    };
  }, [color, glow, opacity, spacing, width]);

  useFrame(() => {
    if (!shaderRef.current) return;
    const gridShaderUniforms = shaderRef.current.uniforms;
    gridShaderUniforms.offsetX.value += speed;
    if (gridShaderUniforms.offsetX.value > 1) {
      gridShaderUniforms.offsetX.value -= 1;
    }
  });

  return (
    <gridMaterial
      ref={shaderRef}
      key={key}
      uniforms={uniforms}
      attach="material"
      side={FrontSide}
      transparent
    />
  );
};

export const GridRect: FC<{
  rotation?: Euler;
  position?: Vector3;
  scale?: Vector3;
  color: Color;
  opacity: number;
  glow: number;
  width: number;
  spacing: Vector2;
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
  speed,
}) => {
  return (
    <mesh rotation={rotation} position={position} scale={scale}>
      <planeGeometry attach="geometry" args={[1, 1, 1, 1]} />
      <ShaderComponent
        color={color}
        opacity={opacity}
        width={width}
        glow={glow}
        spacing={spacing}
        speed={speed}
      />
    </mesh>
  );
};
