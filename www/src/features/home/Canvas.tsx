import { FC, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Content } from "./Content";
import { ScrollControls } from "@react-three/drei";
import { MAX_PAGE } from "./constants";
import { ScrollProvider } from "hooks/useScroll";
import Router from "next/router";
import Box from "@mui/material/Box";

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
      <ScrollControls
        pages={MAX_PAGE}
        style={{
          left: "15px",
        }}
      >
        <ScrollProvider pages={MAX_PAGE}>
          <Content />
        </ScrollProvider>
      </ScrollControls>
    </Canvas>
  );
};
