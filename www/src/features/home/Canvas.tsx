import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Content } from "./Content";
import { ScrollControls } from "@react-three/drei";

export const ThreeCanvas: FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      onCreated={({ gl }) => {
        gl.setClearColor("#000000");
      }}
      style={{ height: "100vh", width: "100vw" }}
      frameloop="always"
    >
      <ScrollControls pages={2}>
        <Content />
      </ScrollControls>
    </Canvas>
  );
};
