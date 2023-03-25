import {
  Color,
  Vector2 as FVector2,
  Euler as FEuler,
} from "@react-three/fiber";
import { FC, forwardRef, RefAttributes, useMemo } from "react";
import { Vector3, Euler, Group } from "three";
import { GridRect } from "./GridRect";

/**
 * Creates a "grid tunnel" effect by creating an open box where each rect face is a gridrect
 * The gridrects are positioned and rotated to create a tunnel effect
 * The offset of the gridrects is animated to create an effect of moving through the tunnel
 *
 */

type Props = {
  color: Color;
  position?: Vector3;
  rotation?: FEuler;
  scale?: Vector3;
  opacity: number;
  glow: number;
  width: number;
  spacing: FVector2;
  speed: number;
};
export const GridTunnel: FC<Props & RefAttributes<Group>> = forwardRef<
  Group,
  Props
>(function GridTunnel(
  {
    position = new Vector3(0, 0, 0),
    rotation = new Euler(0, 0, 0),
    scale = new Vector3(1, 1, 1),
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
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      ref={ref}
      renderOrder={-5}
    >
      <GridRect
        rotation={new Euler(0, 0, 0).setFromVector3(
          new Vector3(0, 0, 0).sub(new Vector3(0, -Math.PI / 2, 0))
        )}
        position={new Vector3(-0.5, 0, 0)}
        color={color}
        opacity={opacity}
        glow={glow}
        width={width}
        spacing={spacing}
        speed={speed}
        name="left"
      />
      <GridRect
        rotation={new Euler(0, 0, 0).setFromVector3(
          new Vector3(0, 0, 0).sub(new Vector3(Math.PI / 2, 0, -Math.PI / 2))
        )}
        position={new Vector3(0, -0.5, 0)}
        color={color}
        opacity={opacity}
        glow={glow}
        width={width}
        spacing={spacing}
        speed={speed}
        name="bottom"
      />
      <GridRect
        rotation={new Euler(0, 0, 0).setFromVector3(
          new Vector3(0, 0, 0).sub(new Vector3(0, Math.PI / 2, Math.PI))
        )}
        position={new Vector3(0.5, 0, 0)}
        color={color}
        opacity={opacity}
        glow={glow}
        width={width}
        spacing={spacing}
        speed={speed}
        name="right"
      />
      <GridRect
        rotation={new Euler(0, 0, 0).setFromVector3(
          new Vector3(0, 0, 0).sub(new Vector3(-Math.PI / 2, 0, Math.PI / 2))
        )}
        position={new Vector3(0, 0.5, 0)}
        color={color}
        opacity={opacity}
        glow={glow}
        width={width}
        spacing={spacing}
        speed={speed}
        name="top"
      />
    </group>
  );
});
