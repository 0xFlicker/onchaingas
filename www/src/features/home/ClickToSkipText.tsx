import { MeshProps } from "@react-three/fiber";
import { FC } from "react";
import { NEON_BLUE } from "./constants";
import { Orbitron } from "./Orbitron";
import { useSpring, animated } from "react-spring";

const AnimatedOrbitron = animated(Orbitron);
export const ClickToSkipText: FC<
  {
    appear: boolean;
    offScreenBottom: number;
    onSkip?: () => void;
  } & MeshProps
> = ({
  appear,
  position: visiblePosition,
  onSkip,
  offScreenBottom,
  ...rest
}) => {
  const { position } = useSpring({
    position: appear
      ? visiblePosition
      : [visiblePosition[0], offScreenBottom, visiblePosition[2]],
  });

  return (
    <>
      <AnimatedOrbitron position={position as any} onClick={onSkip} {...rest}>
        skip
        <meshStandardMaterial transparent color={NEON_BLUE} />
      </AnimatedOrbitron>
    </>
  );
};
