import Head from "next/head";
import { DefaultProvider } from "context/default";
import { NextPage } from "next";
import "@react-three/fiber";
import { ThreeCanvas } from "features/home/Canvas";
import { MobileThreeCanvas } from "features/home/MobileCanvas";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Router, useRouter } from "next/router";
import { useState, useEffect, FC } from "react";
import { visuallyHidden } from "@mui/utils";
import { useDetectWebgl } from "hooks/useDetectWebgl";

const ScreenReaderButton: FC = () => {
  return (
    <Button style={visuallyHidden} aira-label="Proceed to website">
      Proceed to website
    </Button>
  );
};

const HomePage: NextPage<{}> = () => {
  const isWebglSupported = useDetectWebgl();
  const router = useRouter();
  useEffect(() => {
    if (isWebglSupported === false) {
      router.push("/home", "/");
    }
  }, [isWebglSupported, router]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  const title = "Home";
  const description = "The personal website of 0xflick.";
  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("only screen and (max-width: 768px)").matches;
  return (
    <DefaultProvider>
      <Head>
        <title>0xflick</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:site_name" content="0xflick.xyz" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://0xflick.xyz/marketing/home.jpeg"
        />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta content="verification" name="LR1011" />
        <meta
          property="twitter:image"
          content="https://0xflick.xyz/marketing/home.jpeg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@0xflick" />
      </Head>
      {loading ? (
        <Box />
      ) : isMobile && isTouchDevice ? (
        <MobileThreeCanvas />
      ) : (
        <ThreeCanvas />
      )}
      <ScreenReaderButton />
    </DefaultProvider>
  );
};
export default HomePage;
