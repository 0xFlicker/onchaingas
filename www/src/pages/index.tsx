import Head from "next/head";
import { DefaultProvider } from "context/default";
import { NextPage } from "next";
import { Home } from "layouts/Home";

const HomePage: NextPage<{}> = () => {
  return (
    <DefaultProvider>
      <Head>
        <title>Onchain Gas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Home />
    </DefaultProvider>
  );
};
export default HomePage;
