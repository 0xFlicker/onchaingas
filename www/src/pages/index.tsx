import Head from "next/head";
import { DefaultProvider } from "context/default";
import { NextPage } from "next";
import "@react-three/fiber";
import { ThreeCanvas } from "features/home/Canvas";

const HomePage: NextPage<{
  totalMinted: number;
  maxSupply: number;
}> = ({ totalMinted, maxSupply }) => {
  const title = "--> mint here <--";
  const description = `(${totalMinted}/${maxSupply}) minted. 100% on-chain gas visualizer that packs an entire website displaying a 3D visualization of current onchain gas prices`;
  return (
    <DefaultProvider>
      <Head>
        <title>0xflick</title>
      </Head>
      <ThreeCanvas />
    </DefaultProvider>
  );
};
export default HomePage;
