import Head from "next/head";
import { DefaultProvider } from "context/default";
import { NextPage } from "next";
import { HomeMenu } from "layouts/HomeMenu";

const HomePage: NextPage<{}> = () => {
  const title = "Home";
  const description = "The personal website of 0xflick.";

  return (
    <DefaultProvider>
      <Head>
        <title>0xflick home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:site_name" content="0xflick.xyz" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* <meta
          property="og:image"
          content="https://0xflick.xyz/check_preview.gif"
        /> */}
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta content="verification" name="LR1011" />
        {/* <meta
          property="twitter:image"
          content="https://0xflick.xyz/check_preview.png"
        /> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@0xflick" />
      </Head>
      <HomeMenu />
    </DefaultProvider>
  );
};
export default HomePage;
