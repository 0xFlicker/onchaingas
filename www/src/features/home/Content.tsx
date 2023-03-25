import {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GridTunnel } from "components/three/GridTunnel";
import {
  AnimationClip,
  AnimationMixer,
  Euler,
  Group,
  InterpolateSmooth,
  MathUtils,
  Object3D,
  PerspectiveCamera,
  SpotLight,
  Vector3,
  VectorKeyframeTrack,
} from "three";
import { FitToWidth } from "components/three/FitToWidth";
import { useScroll } from "hooks/useScroll";
import { useFrame, useThree } from "@react-three/fiber";
import { Orbitron } from "./Orbitron";
import {
  ANIMATION_PART,
  GRID_COLOR,
  MARGIN_PERCENT,
  NEON_BLUE,
  TUNNEL_POSITION_DESKTOP,
  TUNNEL_ROTATION,
} from "./constants";
import {
  createTextKeyframeTracks,
  createTrailingTextKeyframeTracks,
} from "./tracks";
import { useRouter } from "next/router";
import { Chevron } from "components/three/Chevron";
import { ScrollAnimatable } from "components/three/ScrollAnimatable";
import { Center, OnCenterCallbackProps } from "@react-three/drei";
import { Animatable } from "components/three/Animatable";
import { ClickToSkipText } from "./ClickToSkipText";

export const ClickToSkip: FC<{
  onSkip?: () => void;
  isTouchDevice: boolean;
}> = ({ onSkip, isTouchDevice }) => {
  const { viewport, camera } = useThree();
  const [updated, setUpdated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [skipTextScale, setSkipTextScale] = useState(0);
  const [skipTextPosition, setSkipTextPosition] = useState([0, 0, 0] as [
    number,
    number,
    number
  ]);
  const [offScreenBottom, setOffScreenBottom] = useState(0);

  const spotlightRef = useRef<SpotLight>();
  const clickableRef = useRef<Group>();

  const onPointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  const onPointerLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Point spotlight at the center of the screen
  useLayoutEffect(() => {
    if (!spotlightRef.current || !clickableRef.current) return;
    spotlightRef.current.lookAt(clickableRef.current.position);
  }, [spotlightRef]);

  const defaultChevronProps = useMemo(
    () => ({
      cornerRadius: 1,
      height: 10,
      width: 15,
      scale: 0.05,
      rotation: new Euler(0, 0, 0).setFromVector3(new Vector3(0, 0, 0)),
      extrudeGeometryOptions: {
        depth: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSegments: 1,
        bevelOffset: 0.1,
        bevelSize: 0.5,
        curveSegments: 10,
      },
    }),
    []
  );

  const chevronAnimationClip = useCallback((ref: React.RefObject<Object3D>) => {
    const mixer = new AnimationMixer(ref.current);
    const bounceTrack = new VectorKeyframeTrack(
      `${ref.current.name}.position`,
      [0, 0.5, 1],
      [0, 0.05, 0].map((y) => [0, ref.current.position.y + y, 0]).flat(),
      InterpolateSmooth
    );
    const clip = new AnimationClip("firstChevronAnimationClip", 1, [
      bounceTrack,
    ]);
    const action = mixer.clipAction(clip);
    return { mixer, action };
  }, []);

  const chevronOne = (
    <Chevron
      position={new Vector3(0, 0, 0)}
      {...defaultChevronProps}
      renderOrder={1}
    >
      <meshStandardMaterial color={NEON_BLUE} />
    </Chevron>
  );
  const chevronTwo = (
    <Chevron
      position={new Vector3(0, -0.25, 0)}
      {...defaultChevronProps}
      renderOrder={1}
    >
      <meshStandardMaterial color={NEON_BLUE} />
    </Chevron>
  );

  return (
    <>
      <spotLight ref={spotlightRef} position={[0, 0, 10]} intensity={0.5} />
      <Center
        ref={clickableRef}
        onCentered={({ container }) => {
          if (!updated) {
            setUpdated(true);
            // Make 1/10 of the min dimension of the screen
            container.scale.setScalar(
              Math.min(viewport.width, viewport.height) / 10
            );
            // Position in the bottom right corner}
            container.position.set(
              viewport.width / 2 - container.scale.x * 1.5,
              -viewport.height / 2 + container.scale.y * 1.5,
              0
            );
            if (camera instanceof PerspectiveCamera) {
              const frustumHeight =
                2 *
                camera.position.z *
                Math.tan(MathUtils.degToRad(camera.fov) / 2);
              const screenHeight = camera.getFilmHeight();
              const viewportPositionY =
                (screenHeight / frustumHeight) * -camera.position.z;

              setOffScreenBottom(viewportPositionY);
            }
            // set the skipTextPosition to be to the left of the chevron
            setSkipTextPosition([
              container.position.x - container.scale.x * 2.5,
              container.position.y - container.scale.y * 0.25,
              container.position.z,
            ]);
            // set the skipTextScale to be 1/6 of the screen width
            setSkipTextScale(Math.min(viewport.width, viewport.height) / 16);
          }
        }}
      >
        <group
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onClick={onSkip}
        >
          <mesh position={[0, -0.125, -0.001]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial opacity={0} transparent />
          </mesh>
          {isHovered || isTouchDevice ? (
            <>
              <Animatable
                animationClip={chevronAnimationClip}
                autoPlay
                delay={250}
              >
                {chevronOne}
              </Animatable>
              <Animatable animationClip={chevronAnimationClip} autoPlay>
                {chevronTwo}
              </Animatable>
            </>
          ) : (
            <>
              {chevronOne}
              {chevronTwo}
            </>
          )}
        </group>
      </Center>
      {skipTextScale && (
        <ClickToSkipText
          offScreenBottom={offScreenBottom}
          appear={isHovered || isTouchDevice}
          position={skipTextPosition}
          scale={skipTextScale}
          onSkip={isTouchDevice ? onSkip : undefined}
        />
      )}
    </>
  );
};

export const Content: FC<{
  animatedToPage?: number;
}> = ({ animatedToPage }) => {
  const [size, setSize] = useState(1);
  const [done, setDone] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (done) {
      router.push("/home", "/");
    }
  }, [done, router]);
  const scroll = useScroll();
  const { scrollTo } = scroll;
  useEffect(() => {
    if (typeof window === "undefined") return;
    let top = 0;
    const chunk = ANIMATION_PART;
    switch (animatedToPage) {
      case 0:
        top = 0;
        break;
      case 1:
        top = chunk * 3;
        break;
      case 2:
        top = chunk * 5.8;
        break;
      case 3:
        top = chunk * 8.8;
        break;
      case 4:
        top = chunk * 11.8;
        break;
      case 5:
        top = chunk * 14.8;
        break;
      default:
        top = 1;
    }
    scrollTo({
      top,
      behavior: "smooth",
    });
  }, [animatedToPage, scrollTo]);

  const goToHome = useCallback(() => {
    scrollTo({
      top: 1,
      behavior: "smooth",
    });
  }, [scrollTo]);

  const firstAnimationClip = useCallback((ref: React.RefObject<Object3D>) => {
    const mixer = new AnimationMixer(ref.current);
    const action = mixer.clipAction(
      createTextKeyframeTracks({
        name: "startText",
        startPosition: new Vector3(0, -0.5, -4).applyEuler(TUNNEL_ROTATION),
        endPosition: new Vector3(0, -0.5, 8).applyEuler(TUNNEL_ROTATION),
        startTime: 0,
        endTime: ANIMATION_PART,
      })
    );
    return { mixer, action };
  }, []);

  const secondAnimationClip = useCallback((ref: React.RefObject<Object3D>) => {
    const mixer = new AnimationMixer(ref.current);
    const action = mixer.clipAction(
      createTrailingTextKeyframeTracks({
        name: "trailing",
        startPosition: new Vector3(0, -0.5, -20).applyEuler(TUNNEL_ROTATION),
        endPosition: new Vector3(0, -0.5, 8).applyEuler(TUNNEL_ROTATION),
        startTime: ANIMATION_PART,
        endTime: ANIMATION_PART * 4,
      })
    );
    return { mixer, action };
  }, []);

  const thirdAnimationClip = useCallback((ref: React.RefObject<Object3D>) => {
    const mixer = new AnimationMixer(ref.current);
    const action = mixer.clipAction(
      createTrailingTextKeyframeTracks({
        name: "trailing2",
        startPosition: new Vector3(0, -0.5, -20).applyEuler(TUNNEL_ROTATION),
        endPosition: new Vector3(0, -0.5, 8).applyEuler(TUNNEL_ROTATION),
        startTime: ANIMATION_PART * 4,
        endTime: ANIMATION_PART * 7,
      })
    );
    return { mixer, action };
  }, []);

  const fourthAnimationClip = useCallback((ref: React.RefObject<Object3D>) => {
    const mixer = new AnimationMixer(ref.current);
    const action = mixer.clipAction(
      createTrailingTextKeyframeTracks({
        name: "trailing3",
        startPosition: new Vector3(0, -0.5, -20).applyEuler(TUNNEL_ROTATION),
        endPosition: new Vector3(0, -0.5, 8).applyEuler(TUNNEL_ROTATION),
        startTime: ANIMATION_PART * 7,
        endTime: ANIMATION_PART * 10,
      })
    );
    return { mixer, action };
  }, []);

  const fifthAnimationClip = useCallback((ref: React.RefObject<Object3D>) => {
    const mixer = new AnimationMixer(ref.current);
    const action = mixer.clipAction(
      createTrailingTextKeyframeTracks({
        name: "trailing4",
        startPosition: new Vector3(0, -0.5, -20).applyEuler(TUNNEL_ROTATION),
        endPosition: new Vector3(0, -0.5, 8).applyEuler(TUNNEL_ROTATION),
        startTime: ANIMATION_PART * 10,
        endTime: ANIMATION_PART * 13,
      })
    );
    return { mixer, action };
  }, []);

  const sixthAnimationClip = useCallback((ref: React.RefObject<Object3D>) => {
    const mixer = new AnimationMixer(ref.current);
    const action = mixer.clipAction(
      createTrailingTextKeyframeTracks({
        name: "trailing5",
        startPosition: new Vector3(0, -0.5, -20).applyEuler(TUNNEL_ROTATION),
        endPosition: new Vector3(0, -0.5, 8).applyEuler(TUNNEL_ROTATION),
        startTime: ANIMATION_PART * 13,
        endTime: ANIMATION_PART * 16,
      })
    );
    return { mixer, action };
  }, []);

  const tunnelAnimationClip = useCallback((ref: React.RefObject<Object3D>) => {
    const mixer = new AnimationMixer(ref.current);
    const startTime = ANIMATION_PART * 15;
    const endTime = ANIMATION_PART * 16;
    const startPosition = TUNNEL_POSITION_DESKTOP;
    // end position is found by moving tunnelRef.current +40 z in local space
    const endPosition = new Vector3(0, 0, 40).applyQuaternion(
      ref.current.quaternion
    );
    const positionKF = new VectorKeyframeTrack(
      ".position",
      [startTime, endTime],
      [...startPosition.toArray(), ...endPosition.toArray()]
    );
    const opacityRightKF = new VectorKeyframeTrack(
      "right.material.opacity",
      [0, startTime, endTime],
      [1, 1, 0]
    );
    const opacityLeftKF = new VectorKeyframeTrack(
      "left.material.opacity",
      [0, startTime, endTime],
      [1, 1, 0]
    );
    const opacityBottomKF = new VectorKeyframeTrack(
      "bottom.material.opacity",
      [0, startTime, endTime],
      [1, 1, 0]
    );
    const opacityTopKF = new VectorKeyframeTrack(
      "top.material.opacity",
      [0, startTime, endTime],
      [1, 1, 0]
    );
    const clip = new AnimationClip("end", 1.00001, [
      positionKF,
      opacityRightKF,
      opacityLeftKF,
      opacityBottomKF,
      opacityTopKF,
    ]);
    const action = mixer.clipAction(clip);
    return { mixer, action };
  }, []);

  useFrame(() => {
    const offset = scroll.offset;
    if (offset > 0.99) {
      setDone(true);
    }
  });
  useEffect(() => {
    router.prefetch("/home");
  }, [router]);

  const onCentered = useCallback(({ width }) => {
    setSize(width);
  }, []);
  const spacing = useMemo(() => [0.075, 0.25] as const, []);
  const scale = useMemo(
    () => new Vector3(size * 2, size * 2, size * 20),
    [size]
  );
  // check if touch device is available
  const isTouchDevice = useMemo(() => {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  }, []);

  return (
    <>
      <ClickToSkip onSkip={goToHome} isTouchDevice={isTouchDevice} />
      <ScrollAnimatable animationClip={tunnelAnimationClip} scroll={scroll}>
        <GridTunnel
          position={TUNNEL_POSITION_DESKTOP}
          rotation={TUNNEL_ROTATION}
          color={GRID_COLOR}
          scale={scale}
          opacity={1}
          glow={5}
          width={0.5}
          spacing={spacing}
          speed={0.0}
        />
      </ScrollAnimatable>
      <ScrollAnimatable animationClip={firstAnimationClip} scroll={scroll}>
        <FitToWidth marginPercent={MARGIN_PERCENT}>
          <Orbitron>
            {isTouchDevice ? "swipe up" : "scroll down"}
            <meshNormalMaterial transparent opacity={0} />
          </Orbitron>
        </FitToWidth>
      </ScrollAnimatable>
      <ScrollAnimatable animationClip={secondAnimationClip} scroll={scroll}>
        <FitToWidth marginPercent={MARGIN_PERCENT} onCentered={onCentered}>
          <Orbitron>
            0xflick
            <meshNormalMaterial transparent opacity={0} />
          </Orbitron>
        </FitToWidth>
      </ScrollAnimatable>
      <ScrollAnimatable animationClip={thirdAnimationClip} scroll={scroll}>
        <FitToWidth marginPercent={MARGIN_PERCENT}>
          <Orbitron>
            crypto
            <meshNormalMaterial attach="material" transparent opacity={0} />
          </Orbitron>
        </FitToWidth>
      </ScrollAnimatable>
      <ScrollAnimatable animationClip={fourthAnimationClip} scroll={scroll}>
        <FitToWidth marginPercent={MARGIN_PERCENT}>
          <Orbitron>
            nfts
            <meshNormalMaterial attach="material" transparent opacity={0} />
          </Orbitron>
        </FitToWidth>
      </ScrollAnimatable>
      <ScrollAnimatable animationClip={fifthAnimationClip} scroll={scroll}>
        <FitToWidth marginPercent={MARGIN_PERCENT}>
          <Orbitron>
            {"    smart\ncontracts"}
            <meshNormalMaterial attach="material" transparent opacity={0} />
          </Orbitron>
        </FitToWidth>
      </ScrollAnimatable>
      <ScrollAnimatable animationClip={sixthAnimationClip} scroll={scroll}>
        <FitToWidth marginPercent={MARGIN_PERCENT}>
          <Orbitron>
            websites
            <meshNormalMaterial attach="material" transparent opacity={0} />
          </Orbitron>
        </FitToWidth>
      </ScrollAnimatable>
    </>
  );
};
