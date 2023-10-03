import Head from "next/head";
import { DefaultProvider } from "context/default";
import { GetStaticProps, NextPage } from "next";
import { Contract, providers, utils } from "ethers";
import { useEffect } from "react";

const HOUR_SECONDS = 60 * 60;

function numberToMaxThreeDecimals(number: number) {
  return Math.round(number * 1000) / 1000;
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export const getStaticProps: GetStaticProps<{
  sharePrice: string;
  twitterUsername: string;
  twitterPfpUrl: string;
  roomAddress: string;
}> = async ({ params }) => {
  const holder = Array.isArray(params.holder)
    ? params.holder[0]
    : params.holder;
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
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "sharesBalance",
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
    ).connect(provider);
    const [sharePrice, balanceOfFlick, { twitterUsername, twitterPfpUrl }] =
      await Promise.all([
        contract.getBuyPrice(holder, 1),
        contract.sharesBalance(
          "0x90348e325bc286c7b7c1ec575cbb775b4b1903f0",
          holder
        ),
        fetch(`https://prod-api.kosetto.com/users/${holder}`).then(
          (r) =>
            r.json() as Promise<{
              twitterUsername: string;
              twitterPfpUrl: string;
            }>
        ),
      ]);
    const isFlickHolder = balanceOfFlick.gt(0);
    if (!isFlickHolder) {
      return {
        redirect: {
          destination: "https://0xflick.xyz/ft",
          permanent: false,
        },
        revalidate: HOUR_SECONDS,
      };
    }
    return {
      props: {
        sharePrice: `${numberToMaxThreeDecimals(
          Number(utils.formatEther(sharePrice))
        )} E`,
        twitterUsername,
        roomAddress: holder,
        twitterPfpUrl,
      },
      revalidate: HOUR_SECONDS,
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        sharePrice: "unknown",
        twitterUsername: "unknown",
        twitterPfpUrl: "https://0xflick.xyz/marketing/home.jpeg",
        roomAddress: holder,
      },
      revalidate: HOUR_SECONDS / 60,
    };
  }
};

const HomePage: NextPage<{
  roomAddress: string;
  sharePrice: string;
  twitterUsername: string;
  twitterPfpUrl: string;
}> = ({ sharePrice, twitterUsername, twitterPfpUrl, roomAddress }) => {
  useEffect(() => {
    (
      window as Window
    ).location = `https://www.friend.tech/rooms/${roomAddress}`;
  }, [roomAddress]);

  const title = `key: ${sharePrice}`;
  const description = `@${twitterUsername}'s friendtech room`;
  return (
    <DefaultProvider>
      <Head>
        <title>{twitterUsername}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:site_name" content={twitterUsername} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={twitterPfpUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta content="verification" name="LR1011" />
        <meta property="twitter:image" content={twitterPfpUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={twitterUsername} />
      </Head>
    </DefaultProvider>
  );
};
export default HomePage;
