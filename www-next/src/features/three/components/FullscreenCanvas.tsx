import { FC, forwardRef } from "react";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { PropsWithChildren } from "react";
import { WebGL1Renderer } from "three";
import { FrameLimiter } from "./FrameLimiter";

export const FullscreenCanvas = forwardRef<
  HTMLCanvasElement,
  PropsWithChildren<{
    opacity?: number;
  }>
>(function Component({ opacity = 1, children }, ref) {
  return (
    <ThreeCanvas
      ref={ref}
      gl={{ alpha: true, antialias: false, preserveDrawingBuffer: true }}
      dpr={1.5}
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        opacity,
      }}
      frameloop="demand"
      camera={{ position: [0, 0.5, 6], fov: 35 }}
      onCreated={({ gl }) => {
        if (gl instanceof WebGL1Renderer) {
          gl.context.getExtension("OES_standard_derivatives");
        }
      }}
    >
      <FrameLimiter fps={60} />
      {children}
    </ThreeCanvas>
  );
});
