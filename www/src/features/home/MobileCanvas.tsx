import { FC, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Content } from "./Content";
import { ScrollControls } from "@react-three/drei";
import { useSwipeable } from "react-swipeable";
import { MAX_PAGE } from "./constants";
import { ScrollProvider } from "hooks/useScroll";

export const MobileThreeCanvas: FC<{}> = () => {
  const [page, setPage] = useState(0);
  const handlers = useSwipeable({
    onSwipedUp: () => {
      setPage((prev) => Math.min(prev + 1, 6));
    },
    onSwipedDown: () => {
      setPage((prev) => Math.max(prev - 1, 0));
    },
    ...(page === 0 ? {} : { preventDefaultTouchmoveEvent: true }),
  });
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      onCreated={({ gl }) => {
        gl.setClearColor("#000000");
      }}
      style={{ height: "100vh", width: "100vw" }}
      frameloop="always"
      {...handlers}
    >
      <ScrollProvider swipeOnly pages={MAX_PAGE}>
        <Content animatedToPage={page} />
      </ScrollProvider>
    </Canvas>
  );
};
