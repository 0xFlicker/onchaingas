import { ComponentProps, FC, forwardRef } from "react";
import { Text3D } from "@react-three/drei";
import typeface from "./texts/0xflick.json";

type Props = Omit<ComponentProps<typeof Text3D>, "font">;

export const Flick: FC<Props> = forwardRef(function FlickComponent(
  { ...props },
  ref
) {
  return (
    <Text3D font={typeface as unknown as any} {...props} ref={ref}>
      0xflick
      <meshNormalMaterial />
    </Text3D>
  );
});
