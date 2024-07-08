"use client";
import { DefaultProvider } from "@/context/default";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { Main } from "@/layouts/Main";
import Box, { BoxProps } from "@mui/material/Box";
import NextImage from "next/image";
import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";
import { Parallax, ParallaxProvider, useParallax } from "react-scroll-parallax";
import { TwitterIcon } from "@/components/icons/twitter";
import { WrappedLink } from "@/components/WrappedLink";
import { MagicEdenIcon } from "@/components/icons/magiceden";
import { SlimChecker } from "@/features/claim/components/SlimChecker";
import MenuList from "@mui/material/MenuList";
import { LinksMenuItems } from "@/features/appbar/components/LinksMenuItems";
import { SiteMenu } from "@/features/appbar/components/SiteMenu";
import { useAccount, useReadContract } from "wagmi";
import {
  fameLadySocietyAbi,
  fameLadySocietyAddress,
  fameSaleAbi,
} from "@/wagmi";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { fameSaleAddress } from "@/features/fame/contract";
import { FameFAQ } from "@/features/fame/components/FameFAQ";
import { OG_AGE_BOOST, OG_RANK_BOOST } from "@/features/claim/hooks/constants";
import { SingleTokenChecker } from "@/features/claim/components/SingleTokenChecker";

const AnimatedBox = animated(Box);

const AnimatedBoxFallIn: FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...rest
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5, // Adjusts when the animation triggers
  });

  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(-150px)",
    config: { mass: 1, tension: 210, friction: 20 },
  });

  return (
    <AnimatedBox style={props} ref={ref} {...rest}>
      {children}
    </AnimatedBox>
  );
};

const AnimatedBoxFallUp: FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...rest
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5, // Adjusts when the animation triggers
  });

  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(150px)",
    config: { mass: 1, tension: 210, friction: 20 },
  });

  return (
    <AnimatedBox style={props} ref={ref} {...rest}>
      {children}
    </AnimatedBox>
  );
};

const AnimatedBoxFadeIn: FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...rest
}) => {
  const { ref, inView } = useInView({
    threshold: 1, // Adjusts when the animation triggers
  });

  const props = useSpring({
    opacity: inView ? 1 : 0,
    config: { mass: 10, tension: 120, friction: 50 },
  });

  return (
    <AnimatedBox style={props} ref={ref} {...rest}>
      {children}
    </AnimatedBox>
  );
};

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

const AnimatedSlideInLeft: FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...rest
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1, // Adjusts when the animation triggers
  });

  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-150px)",
    config: { mass: 2, tension: 50, friction: 20 },
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

const Content: FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isTinyScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const imageWidth = isSmallScreen ? window.innerWidth * 0.8 : 1000;
  const imageHeight = 383;
  const eyesRef = useRef<HTMLImageElement>(null);
  const eyesContainer = useParallax<HTMLDivElement>({
    onProgressChange: (progress) => {
      if (eyesRef.current) {
        // when progress is at 0.5, opacity is 1, when progress is at 0 or 1, opacity is 0
        eyesRef.current.style.opacity = (progress * (1 - progress)).toString();
      }
    },
  });

  return (
    <Grid2 container spacing={2} sx={{ mt: 2, mx: 4 }}>
      <Grid2
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        mt={8}
        overflow="hidden"
      >
        <NextImage
          src="/images/fame/Cool_Lady.jpeg"
          alt="Fame Society"
          width={Math.floor(imageWidth)}
          height={Math.floor(imageWidth * 0.683)}
        />
      </Grid2>
      <Grid2
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        overflow="hidden"
      >
        <AnimatedBoxFadeIn
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
          marginBottom={6}
        >
          <Typography variant="h2" textTransform="uppercase">
            presents
          </Typography>
        </AnimatedBoxFadeIn>
      </Grid2>
      <Grid2 xs={12}>
        <AnimatedBoxPopAndFadeIn
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
          marginBottom={8}
          overflow="hidden"
        >
          <NextImage
            src="/images/fame/fame.png"
            alt="Fame Society"
            width={isTinyScreen ? 250 : 500}
            height={isTinyScreen ? 250 : 500}
          />
        </AnimatedBoxPopAndFadeIn>
      </Grid2>
      <Grid2 xs={12}>
        <AnimatedBoxPopAndFadeIn
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
          marginBottom={8}
          overflow="hidden"
        >
          <Typography variant="h3" textTransform="uppercase" textAlign="center">
            a community token
          </Typography>
        </AnimatedBoxPopAndFadeIn>
      </Grid2>
      <Grid2
        lg={3}
        sm={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        overflow="hidden"
      >
        <AnimatedSlideInLeft
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
          marginBottom={8}
        >
          <NextImage
            src="/images/fame/bala.png"
            alt="Fame Society"
            width={isTinyScreen ? 150 : 300}
            height={isTinyScreen ? 150 : 300}
            style={{ marginTop: 32 }}
          />
        </AnimatedSlideInLeft>
      </Grid2>
      <Grid2
        lg={6}
        sm={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        overflow="hidden"
      >
        <AnimatedBoxFallIn
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
          marginBottom={8}
        >
          <NextImage
            src="/images/fame/zepeto.png"
            alt="Fame Society"
            width={isTinyScreen ? 225 : 550}
            height={isTinyScreen ? 200 : 400}
          />
        </AnimatedBoxFallIn>
      </Grid2>
      <Grid2
        lg={3}
        sm={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        overflow="hidden"
      >
        <AnimatedSlideInRight
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
          marginBottom={8}
        >
          <NextImage
            src="/images/fame/gm-bri-bam2.png"
            alt="Fame Society"
            width={isTinyScreen ? 125 : 250}
            height={isTinyScreen ? 200 : 400}
          />
        </AnimatedSlideInRight>
      </Grid2>
      <Grid2 xs={12} overflow="hidden">
        <AnimatedBoxPopAndFadeIn
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
          marginBottom={8}
        >
          <Typography variant="h3" textTransform="uppercase" textAlign="center">
            by and for the fame ladies
          </Typography>
        </AnimatedBoxPopAndFadeIn>
      </Grid2>
      <Grid2
        ref={eyesContainer.ref}
        xs={12}
        marginBottom={20}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        overflow="hidden"
      >
        <Parallax speed={-30}>
          <NextImage
            ref={eyesRef}
            src="/images/fame/eyes.png"
            alt="Fame Society"
            width={1000}
            height={500}
            style={{
              position: "relative",
              top: 180,
              marginBottom: 32,
            }}
          />
        </Parallax>
        <Parallax speed={10}>
          <Typography
            variant="h3"
            textTransform="uppercase"
            textAlign="center"
            marginTop={2}
            marginBottom={50}
            position="relative"
            top={-100}
          >
            a DN404 project
          </Typography>
        </Parallax>
      </Grid2>
      <Grid2 xs={12}>
        <AnimatedBoxFadeIn
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
          marginBottom={8}
        >
          <Typography variant="h5" textAlign="left">
            The Fame Lady Society (FLSoc) is a vibrant community of NFT
            collectors and creators dedicated to the original Fame Lady Squad
            (FLS) NFTs, the pioneering all-female generative PFP project on the
            Ethereum blockchain. With a strong focus on transparency, community
            governance, inclusivity, and women&apos;s empowerment, FLSoc aims to
            transform Web3 into &lsquo;webWE,&rsquo; fostering a collaborative
            and supportive environment.
          </Typography>
        </AnimatedBoxFadeIn>
      </Grid2>
      <Grid2 xs={12}>
        <AnimatedBoxFadeIn
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
          marginBottom={8}
        >
          <Typography variant="h5" textAlign="left">
            Fame Lady Society&apos;s mission is to ensure that every member has
            a voice in shaping the project&apos;s future, promoting true
            decentralization and sustainability for the benefit of the entire
            community. FLSoc emerged from the challenges faced by the original
            FLS, including a fraudulent foundation and a community-driven
            takeover led by passionate members determined to reclaim and honor
            the project&apos;s promise.
          </Typography>
        </AnimatedBoxFadeIn>
      </Grid2>
      <Grid2 xs={12}>
        <AnimatedBoxFadeIn
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
          marginBottom={16}
        >
          <Typography variant="h5" textAlign="left">
            Established on December 11, 2022, the Fame Lady Society continues to
            fight for the return of the original smart contract while offering
            an alternative through a newly created smart contract by 0xflick.
            This effort ensures that the community can maintain ownership and
            governance of their assets, reinforcing the society&apos;s
            commitment to a decentralized and inclusive future.
          </Typography>
        </AnimatedBoxFadeIn>
      </Grid2>
      <Grid2 xs={12} marginY="4">
        <AnimatedBoxFadeIn
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
          marginBottom={8}
        >
          <Typography variant="h4" textAlign="center">
            Join the Society
          </Typography>
        </AnimatedBoxFadeIn>
      </Grid2>
      <Grid2
        xs={12}
        sm={6}
        md={3}
        marginBottom={2}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <AnimatedBoxFallUp component="div">
          <WrappedLink
            href="https://x.com/fameladysociety"
            underline="none"
            target="_blank"
            rel="noreferrer"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <TwitterIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1">Twitter</Typography>
          </WrappedLink>
        </AnimatedBoxFallUp>
      </Grid2>
      <Grid2
        xs={12}
        sm={6}
        md={3}
        marginBottom={2}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <AnimatedBoxFallUp component="div">
          <WrappedLink
            href="https://discord.gg/fameladysociety"
            underline="none"
            target="_blank"
            rel="noreferrer"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <NextImage
              src="/images/reveal/discord-dark.png"
              alt="discord"
              width={90}
              height={25}
              style={{
                maxWidth: "100%",
                height: "auto",
                marginRight: 8,
              }}
            />
            <Typography variant="body1" color="white">
              invite
            </Typography>
          </WrappedLink>
        </AnimatedBoxFallUp>
      </Grid2>
      <Grid2
        xs={12}
        sm={6}
        md={3}
        marginBottom={2}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <AnimatedBoxFallUp component="div">
          <WrappedLink
            href="https://buy.fameladysociety.com"
            underline="none"
            target="_blank"
            rel="noreferrer"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <NextImage
              src="/images/logos/reservoir.svg"
              alt="reservoir"
              width={25}
              height={25}
              style={{
                maxWidth: "100%",
                height: "auto",
                marginRight: 8,
              }}
            />
            <Typography variant="body1">Marketplace</Typography>
          </WrappedLink>
        </AnimatedBoxFallUp>
      </Grid2>
      <Grid2
        xs={12}
        sm={6}
        md={3}
        marginBottom={2}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <AnimatedBoxFallUp component="div">
          <WrappedLink
            href="https://magiceden.io/collections/ethereum/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574"
            underline="none"
            target="_blank"
            rel="noreferrer"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <MagicEdenIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1">Magic Eden</Typography>
          </WrappedLink>
        </AnimatedBoxFallUp>
      </Grid2>
      <Grid2
        xs={12}
        sx={{
          marginTop: 8,
        }}
      >
        <SingleTokenChecker />
      </Grid2>
      <Grid2
        xs={12}
        sx={{
          marginTop: 8,
        }}
      >
        <SlimChecker ageBoost={OG_AGE_BOOST} rankBoost={OG_RANK_BOOST} />
      </Grid2>
      <Grid2 xs={12} marginY="4">
        <Typography variant="body1" textAlign="center">
          $FAME is a community token for the Fame Lady Society. No intrinsic
          value, expectation of financial return, or utility is guaranteed
          outside of the use of the token within the community.
        </Typography>
      </Grid2>

      <Grid2 xs={12} marginY="4">
        <Card>
          <CardContent>
            <FameFAQ />
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

const Header: FC = () => {
  const { address } = useAccount();
  const { data: balance } = useReadContract({
    address: fameLadySocietyAddress[1],
    abi: fameLadySocietyAbi,
    chainId: 1,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });
  const { data: isPaused } = useReadContract({
    abi: fameSaleAbi,
    address: fameSaleAddress(8453),
    functionName: "isPaused",
    chainId: 1,
  });

  const theme = useTheme();
  const tinyScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Main
      menu={
        <>
          <MenuList dense disablePadding>
            <LinksMenuItems />
            <SiteMenu isFame />
          </MenuList>
        </>
      }
      title={
        <>
          {tinyScreen ? null : (
            <Typography variant="h5" component="h1" marginLeft={2}>
              $FAME
            </Typography>
          )}
          {balance && !isPaused && (
            <Button
              component={WrappedLink}
              href="/fame/presale"
              variant="outlined"
              sx={{ ml: 2 }}
            >
              <Typography variant="h5" component="h1">
                {smallScreen ? "presale" : "join the presale"}
              </Typography>
            </Button>
          )}
        </>
      }
    >
      <ParallaxProvider>
        <Content />
      </ParallaxProvider>
    </Main>
  );
};

export const Fame: FC<{}> = () => {
  return (
    <DefaultProvider mainnet base>
      <Header />
    </DefaultProvider>
  );
};
