import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import NextImage from "next/image";

import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";
import Container from "@mui/material/Container";
import Box, { BoxProps } from "@mui/material/Box";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Card, CardActionArea, Typography } from "@mui/material";
import { WrappedLink } from "@/components/WrappedLink";
import { FC, PropsWithChildren, useLayoutEffect } from "react";

const AnimatedBox = animated(Box);

const AnimatedBoxPopAndFadeIn: FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...rest
}) => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Adjusts when the animation triggers
  });

  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "scale(1)" : "scale(0.5)",
    config: { mass: 1, tension: 210, friction: 20 },
  });

  return (
    <AnimatedBox style={props} ref={ref} {...rest}>
      {children}
    </AnimatedBox>
  );
};

const AnimatedSlideInRight: FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...rest
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1, // Adjusts when the animation triggers
  });

  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(150px)",
    config: { mass: 2, tension: 50, friction: 20 },
  });

  return (
    <AnimatedBox style={props} ref={ref} {...rest}>
      {children}
    </AnimatedBox>
  );
};

export const PostReveal = () => {
  return (
    <>
      <Parallax pages={3}>
        <ParallaxLayer offset={0} speed={1}>
          <Container maxWidth="lg" sx={{ mt: 8 }}>
            <Box component="div">
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
            </Box>

            <Typography variant="h6" align="center">
              down
            </Typography>
            <Typography variant="h6" align="center">
              \/
            </Typography>
          </Container>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={1.5}>
          <Container component={WrappedLink} maxWidth="xl" href="/fame">
            <AnimatedBoxPopAndFadeIn
              component="div"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              marginTop={2}
              marginBottom={2}
            >
              <NextImage
                src="/images/fame/fame.png"
                alt="Fame Society"
                width={500}
                height={500}
              />
            </AnimatedBoxPopAndFadeIn>
            <AnimatedSlideInRight
              component="div"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              marginTop={4}
              marginBottom={8}
            >
              <Typography
                variant="h3"
                textTransform="uppercase"
                textAlign="center"
              >
                coming soon
              </Typography>
            </AnimatedSlideInRight>
          </Container>
        </ParallaxLayer>

        <ParallaxLayer offset={2.1}>
          <Container maxWidth="xl">
            <Grid2 container justifyContent="flex-end" alignContent="end">
              <Grid2 xs={6} sm={6} md={4} lg={3}>
                <NextImage
                  src="/images/reveal/fls_wrap.png"
                  alt="hero"
                  width={440}
                  height={800}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </Grid2>
            </Grid2>
          </Container>
        </ParallaxLayer>
        <ParallaxLayer offset={2.1}>
          <Container maxWidth="xl">
            <Grid2 container justifyContent="flex-start" alignContent="start">
              <Grid2
                xs={6}
                sm={6}
                md={4}
                lg={3}
                sx={{
                  ml: {
                    sm: 0,
                    md: 4,
                  },
                }}
              >
                <Box component="div" display="flex" flexDirection="column">
                  <NextImage
                    src="/images/Flsociety_morg_mock.png"
                    alt="hero"
                    width={640}
                    height={480}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                  <Box
                    component="div"
                    minHeight={{
                      xs: 10,
                      sm: 10,
                      md: 100,
                      lg: 100,
                      xl: 200,
                    }}
                  />
                  <Card variant="elevation">
                    <WrappedLink
                      href="https://discord.gg/fameladysociety"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Typography variant="h6" align="center">
                        Join our
                      </Typography>
                      <Box component="div" paddingX={2}>
                        <NextImage
                          src="/images/reveal/discord-dark.png"
                          alt="discord"
                          width={240}
                          height={60}
                          sizes="100vw"
                          style={{
                            width: "100%",
                            height: "auto",
                          }}
                        />
                      </Box>
                      <Typography variant="h6" align="center">
                        for more information
                      </Typography>
                    </WrappedLink>
                  </Card>
                </Box>
              </Grid2>
            </Grid2>
          </Container>
        </ParallaxLayer>
      </Parallax>
    </>
  );
};
