import { ComponentProps, FC, forwardRef, PropsWithChildren } from "react";
import { Text3D } from "@react-three/drei";
import typeface from "./texts/orbitron_regular.json";
import { Mesh } from "three";

type Props = PropsWithChildren<Omit<ComponentProps<typeof Text3D>, "font">>;

export const Orbitron= forwardRef<Mesh, Props>(function OrbitronComponent(
  { children, ...props },
  ref
) {
  return (
    <Text3D name="text" font={typeface as unknown as any} {...props} ref={ref}>
      {children}
    </Text3D>
  );
});
