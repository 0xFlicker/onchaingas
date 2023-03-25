import { MeshProps } from "@react-three/fiber";
import { FC, forwardRef, PropsWithChildren } from "react";
import { ExtrudeGeometryOptions, Shape } from "three";

// Draw a chevron

function createChevronShape(width, height, cornerRadius) {
  const shape = new Shape();
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  shape.moveTo(-halfWidth - cornerRadius / 2, -halfHeight + cornerRadius);
  shape.lineTo(0 - cornerRadius, halfHeight - cornerRadius);
  shape.quadraticCurveTo(
    0,
    halfHeight + cornerRadius,
    0 + cornerRadius,
    halfHeight - cornerRadius
  );
  shape.lineTo(halfWidth + cornerRadius / 2, -halfHeight + cornerRadius);
  shape.quadraticCurveTo(
    halfWidth + cornerRadius,
    -halfHeight - cornerRadius,
    halfWidth - cornerRadius / 2,
    -halfHeight + cornerRadius
  );
  shape.lineTo(0 + cornerRadius / 2, halfHeight - cornerRadius * 2);
  shape.quadraticCurveTo(
    0,
    halfHeight - cornerRadius,
    0 - cornerRadius / 2,
    halfHeight - cornerRadius * 2
  );
  shape.lineTo(-halfWidth + cornerRadius / 2, -halfHeight + cornerRadius);
  shape.quadraticCurveTo(
    -halfWidth - cornerRadius,
    -halfHeight - cornerRadius,
    -halfWidth - cornerRadius / 2,
    -halfHeight + cornerRadius
  );
  return shape;
}

export const Chevron: FC<
  MeshProps &
    PropsWithChildren<{
      width: number;
      height: number;
      cornerRadius: number;
      extrudeGeometryOptions?: ExtrudeGeometryOptions;
    }>
> = forwardRef(function Extrude(
  { width, height, cornerRadius, extrudeGeometryOptions, children, ...props },
  ref
) {
  return (
    <mesh
      ref={ref}
      name="chevron"
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={[1, 1, 1]}
      {...props}
    >
      <extrudeGeometry
        args={[
          createChevronShape(width, height, cornerRadius),
          {
            depth: 1,
            bevelEnabled: false,
            ...extrudeGeometryOptions,
          },
        ]}
      />
      {children}
    </mesh>
  );
});
