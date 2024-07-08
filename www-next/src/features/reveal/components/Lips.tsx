import { FC } from "react";
import { useSpring, animated, to } from "@react-spring/web";
import NextImage from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const AnimatedImage = animated(NextImage);
const AnimatedBox = animated(Box);

export const Lips: FC = () => {
  const props = useSpring({
    from: { x: 0, scale: 1 },
    to: async (next) => {
      await new Promise((r) => setTimeout(r, 1000));
      await next({ x: -Math.PI / 4 });
      await new Promise((r) => setTimeout(r, 1000));
      await next({ x: Math.PI / 4 });
      await new Promise((r) => setTimeout(r, 1000));
      await next({ x: 0 });
      await new Promise((r) => setTimeout(r, 1000));
      await next({ scale: 5 });
    },
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }} component="div">
        <NextImage
          src="/images/Flsociety_morg_mock.png"
          alt="hero"
          width={1920}
          height={1080}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
        <AnimatedBox
          sx={{
            mt: 10,
            ml: 10,
            width: 200,
            height: 200,
          }}
          style={{
            transform: to(
              [props.x, props.scale],
              (value, scale) =>
                `rotateY(${value}rad) scale(${scale}) rotateZ(0deg)`,
            ),
          }}
        >
          <AnimatedImage
            src="/images/lips.webp"
            layout="fill"
            alt="lips"
            // style={{
            //   transform: to(
            //     [props.x, props.scale],
            //     (value, scale) => `rotateY(${value}rad)`
            //   ),
            // }}
          />
        </AnimatedBox>
      </Box>
    </Container>
  );
};
