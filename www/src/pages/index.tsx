import Head from "next/head";
import { DefaultProvider } from "context/default";
import { GetStaticProps, NextPage } from "next";
import "@react-three/fiber";
import { ThreeCanvas } from "features/home/Canvas";
import { MobileThreeCanvas } from "features/home/MobileCanvas";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Router, useRouter } from "next/router";
import { useState, useEffect, FC } from "react";
import { visuallyHidden } from "@mui/utils";
import { useDetectWebgl } from "hooks/useDetectWebgl";
import { Contract, providers, utils } from "ethers";

const ScreenReaderButton: FC = () => {
  return (
    <Button style={visuallyHidden} aira-label="Proceed to website">
      Proceed to website
    </Button>
  );
};

const HOUR_SECONDS = 60 * 60;

function numberToMaxThreeDecimals(number: number) {
  return Math.round(number * 1000) / 1000;
}
export const getStaticProps: GetStaticProps<{
  sharePrice: string;
}> = async () => {
  try {
    const provider = new providers.JsonRpcProvider("https://mainnet.base.org", {
      chainId: 8453,
      name: "base",
    });
    const contract = new Contract(
      "0xcf205808ed36593aa40a44f10c7f7c2f67d4a4d4",
      [
        {
          inputs: [
            {
              internalType: "address",
              name: "sharesSubject",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "getBuyPrice",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ]
    );
    const sharePrice = await contract
      .connect(provider)
      .getBuyPrice("0x90348e325bc286c7b7c1Ec575Cbb775b4b1903F0", 1);
    return {
      props: {
        sharePrice: `${numberToMaxThreeDecimals(
          Number(utils.formatEther(sharePrice))
        )} E`,
      },
      revalidate: HOUR_SECONDS,
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        sharePrice: "unknown",
      },
      revalidate: HOUR_SECONDS,
    };
  }
};

const HomePage: NextPage<{
  sharePrice: string;
}> = ({ sharePrice }) => {
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
  const description = `friend.tech 0xflick share price: ${sharePrice}`;
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
        <meta name="fc:frame" content="\vNext" />
        <meta
          name="fc:frame:image"
          content="https://0xflick.xyz/marketing/home.jpeg"
        />
        <meta name="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta
          name="fc:frame:button:1"
          content={`friendtech key: ${sharePrice}`}
        />
        <meta name="fc:frame:button:1:action" content="link" />
        <meta
          name="fc:frame:button:1:target"
          content="https://www.friend.tech/rooms/0x90348e325bc286c7b7c1ec575cbb775b4b1903f0"
        />
        <meta name="fc:frame:button:2" content="twitter / x" />
        <meta name="fc:frame:button:2:action" content="link" />
        <meta
          name="fc:frame:button:2:target"
          content="https://twitter.com/0xflick"
        />
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
