import { FC, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { GridTunnel } from "components/three/GridTunnel";
import { Color, Vector3 } from "three";

export const ThreeCanvas: FC = () => {
  const gridColor = useMemo(() => {
    return new Color("#00FF00");
  }, []);
  const tunnelPosition = useMemo(() => {
    return new Vector3(0, -0.25, 0);
  }, []);
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      onCreated={({ gl }) => {
        gl.setClearColor("#000000");
      }}
      style={{ height: "100vh", width: "100vw" }}
      frameloop="always"
    >
      <GridTunnel
        position={tunnelPosition}
        color={gridColor}
        size={1}
        opacity={1}
        glow={0.05}
        width={0.01}
        spacing={[0.15, 0.25]}
        speed={0.001}
      />
    </Canvas>
  );
};
