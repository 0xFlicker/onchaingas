import { useScroll } from "hooks/useScroll";
import { Color, Euler, useFrame, Vector2, Vector3 } from "@react-three/fiber";
import { FC, forwardRef, useMemo, useRef } from "react";
import "shader/grid";
import { FrontSide, Mesh, ShaderMaterial } from "three";
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
  const scroll = useScroll();
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

  let last = 0;
  useFrame(() => {
    if (!shaderRef.current) return;
    const offset = scroll.offset;
    const delta = last - offset;
    last = offset;
    const gridShaderUniforms = shaderRef.current.uniforms;
    gridShaderUniforms.offsetX.value += speed;
    gridShaderUniforms.offsetX.value -= delta * 0.85;
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

type Props = {
  rotation?: Euler;
  position?: Vector3;
  name?: string;
  scale?: Vector3;
  color: Color;
  opacity: number;
  glow: number;
  width: number;
  spacing: Vector2;
  speed: number;
};
export const GridRect: FC<Props> = forwardRef<Mesh, Props>(function GridRect(
  {
    rotation,
    name,
    position,
    scale,
    color,
    opacity,
    glow,
    width,
    spacing,
    speed,
  },
  ref
) {
  return (
    <mesh
      rotation={rotation}
      position={position}
      scale={scale}
      ref={ref}
      name={name}
    >
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
});
