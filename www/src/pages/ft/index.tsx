import Head from "next/head";
import { DefaultProvider } from "context/default";
import { GetStaticProps, NextPage } from "next";
import { Contract, providers, utils } from "ethers";
import { useEffect } from "react";

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
  useEffect(() => {
    (window as Window).location =
      "https://www.friend.tech/rooms/0x90348e325bc286c7b7c1ec575cbb775b4b1903f0";
  }, []);
  const title = `key: ${sharePrice}`;
  const description = "My friendtech room";
  return (
    <DefaultProvider>
      <Head>
        <title>0xflick</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:site_name" content="0xflick" />
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
    </DefaultProvider>
  );
};
export default HomePage;
