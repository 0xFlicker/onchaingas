import {
  FC,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GridTunnel } from "components/three/GridTunnel";
import {
  Box3,
  Color,
  Euler,
  Group,
  Mesh,
  PerspectiveCamera,
  Vector3,
} from "three";
import { Flick } from "./Flick";
import { FitToWidth } from "components/three/FitToWidth";
import { OnCenterCallbackProps, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

const GRID_COLOR = new Color("#00FF00");
const TUNNEL_POSITION = new Vector3(0, -0.25, 0);
const TUNNEL_ROTATION = new Euler(0, 0, 0).setFromVector3(
  new Vector3(0, 0, 0).sub(new Vector3(Math.PI / 18, 0, 0))
);
const MAX_PAGE = 2;
const MARGIN_PERCENT = 0.15;

export const Content: FC = () => {
  const [viewport, camera] = useThree(
    (state) => [state.viewport, state.camera] as const
  );
  const flickTextRef = useRef<Group>();
  const [size, setSize] = useState(1);
  const [speed, setSpeed] = useState(0.0001);
  const [pos, setPos] = useState(0);

  const scroll = useScroll();
  useFrame(() => {
    const { offset, pages } = scroll;
    // increase speed as we scroll
    // setSpeed(offset * 0.001);
    setPos(offset);
    if (flickTextRef.current) {
      console.log(offset);
      flickTextRef.current.position.z = -offset * 8 + 6;
    }
  });

  const onCentered = useCallback(({ width }) => {
    setSize(width);
  }, []);

  // useLayoutEffect(() => {
  //   if (!flickTextRef.current) return;
  //   flickTextRef.current.matrixWorld.identity();
  //   const box3 = new Box3().setFromObject(flickTextRef.current, true);
  //   const width = box3.max.x - box3.min.x;
  //   const center = new Vector3();
  //   box3.getCenter(center);
  //   flickTextRef.current.position.set(-center.x, -center.y, -center.z);
  //   if (camera instanceof PerspectiveCamera) {
  //     // Calculate the frustum width at the depth of the container from the near clipping plane
  //     const nearPos = new Vector3(0, 0, camera.near).unproject(camera);
  //     const zDepth = Math.abs(nearPos.z - flickTextRef.current.position.z);
  //     const frustumHeight =
  //       2 * zDepth * Math.tan(camera.fov * 0.5 * (Math.PI / 180));
  //     const frustumWidth = frustumHeight * camera.aspect;

  //     // Calculate margin
  //     const margin = MARGIN_PERCENT * frustumWidth;

  //     // Scale the container to fit the frustum width, considering the maxWidth and margin
  //     let scale = (frustumWidth - margin) / width;
  //     flickTextRef.current.scale.setScalar(scale);
  //   } else {
  //     // Fall back to the viewport for non-perspective cameras
  //     flickTextRef.current.scale.setScalar(viewport.width / width);
  //   }
  //   setSize(width * 1.1);
  // }, [camera, viewport.width]);
  return (
    <>
      <GridTunnel
        position={TUNNEL_POSITION}
        rotation={TUNNEL_ROTATION}
        color={GRID_COLOR}
        size={size}
        opacity={1}
        glow={5}
        width={0.5}
        spacing={[0.15, 0.25]}
        speed={speed}
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
