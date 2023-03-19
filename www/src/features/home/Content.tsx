import { FC, useCallback, useMemo, useRef, useState } from "react";
import { GridTunnel } from "components/three/GridTunnel";
import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  Color,
  Euler,
  Group,
  Vector3,
  VectorKeyframeTrack,
} from "three";
import { Flick } from "./Flick";
import { FitToWidth } from "components/three/FitToWidth";
import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

const GRID_COLOR = new Color("#00FF00");
const TUNNEL_POSITION = new Vector3(0, -2.5, -20);
const TUNNEL_ROTATION = new Euler(0, 0, 0).setFromVector3(
  new Vector3(0, 0, 0).sub(new Vector3(Math.PI / 18, 0, 0))
);
const MAX_PAGE = 2;
const MARGIN_PERCENT = 0.15;

// Project the position of 0xflick starting from [0, -0.15, 4] to [0, -0.15, 8] in local space
// to world space with a rotation of [PI/18, 0 , 0]
const startPos = new Vector3(0, -0.15, -4);
const endPos = new Vector3(0, -0.15, 8);
const worldStartPos = startPos.applyEuler(TUNNEL_ROTATION);
const worldEndPos = endPos.applyEuler(TUNNEL_ROTATION);
const positionKF = new VectorKeyframeTrack(
  ".position",
  [0, 1],
  [...worldStartPos.toArray(), ...worldEndPos.toArray()]
);
const flickClip = new AnimationClip("Flick", 1, [positionKF]);

export const Content: FC = () => {
  const flickTextRef = useRef<Group>();
  const [size, setSize] = useState(1);

  let mix: AnimationMixer;
  let action: AnimationAction;

  const scroll = useScroll();
  useFrame(() => {
    if (!flickTextRef.current) return;
    if (!mix) {
      mix = new AnimationMixer(flickTextRef.current);
    }
    if (!action) {
      action = mix.clipAction(flickClip);
      action.play();
    }
    const { offset, pages } = scroll;
    mix.setTime(offset);
  });

  const onCentered = useCallback(({ width }) => {
    setSize(width);
  }, []);
  const spacing = useMemo(() => [0.15, 0.25] as const, []);
  const scale = useMemo(
    () => new Vector3(size * 2, size * 2, size * 10),
    [size]
  );

  return (
    <>
      <GridTunnel
        position={TUNNEL_POSITION}
        rotation={TUNNEL_ROTATION}
        color={GRID_COLOR}
        scale={scale}
        opacity={1}
        glow={5}
        width={0.5}
        spacing={spacing}
        speed={0.001}
      />
      <FitToWidth
        scale={0.25}
        marginPercent={MARGIN_PERCENT}
        onCentered={onCentered}
        ref={flickTextRef}
      >
        <Flick />
      </FitToWidth>
    </>
  );
};
