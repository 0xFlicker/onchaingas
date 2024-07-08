import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

import NextImage from "next/image";
import { Box } from "@mui/material";
import { FullscreenCanvas } from "../three/components/FullscreenCanvas";

import { StageLight } from "../three/components/StageLight";
import { SpikedBall } from "../three/components/SpikeSphere";
import { useThree } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { Vector3, MathUtils, PerspectiveCamera } from "three";

import { KernelSize } from "postprocessing";
const {
  EffectComposer,
  Outline,
  Selection,
} = require("@react-three/postprocessing");

const AnimatedImage = animated(NextImage);

const StageContent: FC<{
  spikeBallX: number;
  spikeBallY: number;
  showSpikeBall: boolean;
}> = ({ spikeBallX = 0, spikeBallY = 0, showSpikeBall }) => {
  const { viewport, camera } = useThree();
  return (
    <Selection enabled>
      <Center
        onCentered={({ container, width }) => {
          container.scale.setScalar(viewport.width / width / 4.5);
          // Place spikeball using prop coordinates, which are in screen space
          // the viewport covers the whole screen, so we can use the viewport
          // width and height to convert the screen coordinates to viewport
          if (camera instanceof PerspectiveCamera) {
            const { innerWidth: screenWidth, innerHeight: screenHeight } =
              window;
            const { width, height } = viewport;
            const ndcX = MathUtils.mapLinear(
              spikeBallX,
              0,
              screenWidth,
              -width / 2,
              width / 2
            );
            const ndcY = MathUtils.mapLinear(
              spikeBallY,
              0,
              screenHeight,
              height / 2,
              -height / 2
            );

            container.position.set(ndcX, ndcY, 0);
          }
        }}
      >
        <SpikedBall autoSpin scale={[0.15, 0.15, 0.15]} />
      </Center>
      <StageLight />
      <EffectComposer autoClear={false}>
        <Outline
          selectionLayer={1}
          visibleEdgeColor={0xffffff}
          xRay={false}
          edgeStrength={3}
          kernelSize={KernelSize.SMALL}
          blur
        />
      </EffectComposer>
    </Selection>
  );
};

export const HomeHero: FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spikeScreenPosition, setSpikeScreenPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [showSpikeBall, setShowSpikeBall] = useState(false);
  const fameSocietyProps = useSpring({
    from: { transform: "translateX(-100vw)" },
    to: { transform: "translateX(0)" },
    config: {
      duration: 1000,
      mass: 1,
      tension: 100,
      friction: 10,
      delay: 1000,
    },
    onRest: () => {
      setShowSpikeBall(true);
      onScroll();
    },
  });
  const ladyProps = useSpring({
    from: { transform: "translateX(100vw)" },
    to: { transform: "translateX(0)" },
    config: {
      duration: 1000,
      mass: 1,
      tension: 100,
      friction: 10,
      delay: 1000,
    },
  });
  function onScroll() {
    if (boxRef.current) {
      const { left, right, top, width, height } =
        boxRef.current.getBoundingClientRect();
      const x = right - width / 5.5;
      const y = top + height / 3;

      setSpikeScreenPosition({ x, y });
    }
  }
  useEffect(() => {
    if (showSpikeBall) {
      // doing this the hard way, fadeing in the opacity on the canvas style manually
      let opacity = 0;
      const fadeInInterval = setInterval(() => {
        if (opacity > 1) {
          clearInterval(fadeInInterval);
        }
        if (canvasRef.current) {
          canvasRef.current.style.opacity = `${opacity}`;
          opacity += 1 / 60;
        }
      }, 1000 / 60);
      return () => {
        clearInterval(fadeInInterval);
      };
    }
  }, [showSpikeBall]);

  useLayoutEffect(() => {
    // use resize observer to update the position of the spike ball when the window is resized
    if (canvasRef.current) {
      canvasRef.current.style.opacity = "0";
    }
    const resizeObserver = new ResizeObserver((entries) => {
      onScroll();
    });
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }
    window.addEventListener("scroll", onScroll);
    setTimeout(() => {
      onScroll();
    }, 2000);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <Box component="div" ref={boxRef} sx={{ position: "relative" }}>
        <AnimatedImage
          src="/images/reveal/Flsociety_1.png"
          alt="Fame"
          layout="responsive"
          width={1920}
          height={1080 / 3}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            ...fameSocietyProps,
          }}
        />
        <AnimatedImage
          src="/images/reveal/Flsociety_2.png"
          alt="Fame"
          layout="responsive"
          width={1920}
          height={1080 / 3}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            ...ladyProps,
          }}
        />
        <AnimatedImage
          src="/images/reveal/Flsociety_3.png"
          alt="Fame"
          layout="responsive"
          width={1920}
          height={1080 / 3}
          style={{
            display: "block",
            top: 0,
            left: 0,
            ...fameSocietyProps,
          }}
        />
      </Box>
      <FullscreenCanvas ref={canvasRef}>
        <StageContent
          spikeBallX={spikeScreenPosition.x}
          spikeBallY={spikeScreenPosition.y}
          showSpikeBall={showSpikeBall}
        />
      </FullscreenCanvas>
    </>
  );
};
