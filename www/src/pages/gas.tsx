import Head from "next/head";
import { DefaultProvider } from "context/default";
import { GetStaticProps, NextPage } from "next";
import { Gas } from "layouts/Gas";
import {
  infuraKey,
  defaultChain,
  nftOnChainGasContractAddress,
} from "utils/config";
import { providers } from "ethers";
import { OnchainGas__factory } from "contracts";

const HOUR_SECONDS = 60 * 60;

export const getStaticProps: GetStaticProps<{
  totalMinted: number;
  maxSupply: number;
}> = async () => {
  try {
    const provider = new providers.InfuraProvider(
      defaultChain.get().network,
      infuraKey.get()
    );
    const contract = OnchainGas__factory.connect(
      nftOnChainGasContractAddress.get(),
      provider
    );
    const [totalMinted, maxSupply] = await Promise.all([
      contract.totalSupply(),
      contract.maxSupply(),
    ]);
    return {
      props: {
        totalMinted: totalMinted.toNumber(),
        maxSupply: maxSupply.toNumber(),
      },
      revalidate: HOUR_SECONDS,
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        totalMinted: 0,
        maxSupply: 0,
      },
      revalidate: HOUR_SECONDS,
    };
  }
};

const HomePage: NextPage<{
  totalMinted: number;
  maxSupply: number;
}> = ({ totalMinted, maxSupply }) => {
  const title = "--> mint here <--";
  const description = `(${totalMinted}/${maxSupply}) minted. 100% on-chain gas visualizer that packs an entire website displaying a 3D visualization of current onchain gas prices`;
  return (
    <DefaultProvider>
      <Head>
        <title>Onchain Gas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:site_name" content="On Chain Gas" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://0xflick.xyz/preview.gif" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta content="verification" name="LR1011" />
        <meta
          property="twitter:image"
          content="https://0xflick.xyz/preview.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@0xflick" />
      </Head>
      <Gas />
    </DefaultProvider>
  );
};
export default HomePage;
