import Head from "next/head";
import { DefaultProvider } from "context/default";
import { GetStaticProps, NextPage } from "next";
import { Check } from "layouts/Check";
import {
  infuraKey,
  defaultChain,
  nftOnChainCheckContractAddress,
} from "utils/config";
import { providers } from "ethers";
import { OnchainCheckGas__factory } from "contracts";

const HOUR_SECONDS = 60 * 60;

export const getStaticProps: GetStaticProps<{
  totalMinted: number;
}> = async () => {
  try {
    const provider = new providers.InfuraProvider(
      defaultChain.get().network,
      infuraKey.get()
    );
    const contract = OnchainCheckGas__factory.connect(
      nftOnChainCheckContractAddress.get(),
      provider
    );
    const [totalMinted] = await Promise.all([contract.totalSupply()]);
    return {
      props: {
        totalMinted: totalMinted.toNumber(),
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
}> = ({ totalMinted }) => {
  const title = "--> mint here <--";
  const description = `${totalMinted} minted. 100% on-chain checks gas visualizer.`;
  return (
    <DefaultProvider>
      <Head>
        <title>Onchain Gas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:site_name" content="On Chain Check Gas" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://0xflick.xyz/check_preview.gif"
        />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta content="verification" name="LR1011" />
        <meta
          property="twitter:image"
          content="https://0xflick.xyz/check_preview.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@0xflick" />
      </Head>
      <Check />
    </DefaultProvider>
  );
};
export default HomePage;
