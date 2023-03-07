import {
  Color,
  useFrame,
  Vector2 as FVector2,
  Vector3 as FVector3,
  Euler as FEuler,
} from "@react-three/fiber";
import { FC, useMemo, useState } from "react";
import { Vector3, Euler } from "three";
import { GridRect } from "./GridRect";

/**
 * Creates a "grid tunnel" effect by creating an open box where each rect face is a gridrect
 * The gridrects are positioned and rotated to create a tunnel effect
 * The offset of the gridrects is animated to create an effect of moving through the tunnel
 *
 */

export const GridTunnel: FC<{
  color: Color;
  position?: Vector3;
  rotation?: FEuler;
  size: number;
  opacity: number;
  glow: number;
  width: number;
  spacing: FVector2;
  speed: number;
}> = ({
  position = new Vector3(0, 0, 0),
  rotation = new Euler(0, 0, 0),
  color,
  size,
  opacity,
  glow,
  width,
  spacing,
  speed,
}) => {
  const scale = useMemo(() => {
    return new Vector3(size * 10, size * 2, 1);
  }, [size]);
  const leftWallRotation = useMemo(() => {
    return new Euler(0, 0, 0).setFromVector3(
      new Vector3(0, 0, 0).sub(new Vector3(0, -Math.PI / 2, 0))
    );
  }, []);
  const leftWallPosition = useMemo(() => {
    return new Vector3(-size, 0, 0).add(position);
  }, [position, size]);
  const bottomWallRotation = useMemo(() => {
    return new Euler(0, 0, 0).setFromVector3(
      new Vector3(0, 0, 0).sub(new Vector3(Math.PI / 2, 0, -Math.PI / 2))
    );
  }, []);
  const bottomWallPosition = useMemo(() => {
    return new Vector3(0, -size, 0).add(position);
  }, [position, size]);
  const rightWallRotation = useMemo(() => {
    return new Euler(0, 0, 0).setFromVector3(
      new Vector3(0, 0, 0).sub(new Vector3(0, Math.PI / 2, Math.PI))
    );
  }, []);
  const rightWallPosition = useMemo(() => {
    return new Vector3(size, 0, 0).add(position);
  }, [position, size]);
  const topWallRotation = useMemo(() => {
    return new Euler(0, 0, 0).setFromVector3(
      new Vector3(0, 0, 0).sub(new Vector3(-Math.PI / 2, 0, Math.PI / 2))
    );
  }, []);
  const topWallPosition = useMemo(() => {
    return new Vector3(0, size, 0).add(position);
  }, [position, size]);
  return (
    <>
      <group rotation={rotation}>
        <GridRect
          rotation={leftWallRotation}
          position={leftWallPosition}
          scale={scale}
          color={color}
          opacity={opacity}
          glow={glow}
          width={width}
          spacing={spacing}
          offsetX={0}
          offsetY={0}
          speed={speed}
        />
        <GridRect
          rotation={bottomWallRotation}
          position={bottomWallPosition}
          scale={scale}
          color={color}
          opacity={opacity}
          glow={glow}
          width={width}
          spacing={spacing}
          offsetX={0}
          offsetY={0}
          speed={speed}
        />
        <GridRect
          rotation={rightWallRotation}
          position={rightWallPosition}
          scale={scale}
          color={color}
          opacity={opacity}
          glow={glow}
          width={width}
          spacing={spacing}
          offsetX={0}
          offsetY={0}
          speed={speed}
        />
        <GridRect
          rotation={topWallRotation}
          position={topWallPosition}
          scale={scale}
          color={color}
          opacity={opacity}
          glow={glow}
          width={width}
          spacing={spacing}
          offsetX={0}
          offsetY={0}
          speed={speed}
        />
      </group>
    </>
  );
};
