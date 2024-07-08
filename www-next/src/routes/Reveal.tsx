import Head from "next/head";
import { DefaultProvider } from "@/context/default";
import { NextPage } from "next";
import { PostReveal } from "@/features/reveal/components/PostReveal";
import Typography from "@mui/material/Typography";
import MenuList from "@mui/material/MenuList";
import { SiteMenu } from "@/features/appbar/components/SiteMenu";
import { Main } from "@/layouts/Main";
import { LinksMenuItems } from "@/features/appbar/components/LinksMenuItems";

const RevealPage: NextPage<{}> = () => {
  const title = "Fame Lady Society";
  const description = "Unstoppable";
  return (
    <DefaultProvider mainnet>
      <Head>
        <title>Fame Lady Society</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:site_name" content="#itsawrap" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://fameladysociety.com/images/fls-wrap.gif"
        />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta content="verification" name="LR1011" />
        <meta
          property="twitter:image"
          content="https://fameladysociety.com/images/Flsociety_morg_mock.jpeg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@FameLadySociety" />
      </Head>
      <Main
        menu={
          <>
            <MenuList dense disablePadding>
              <LinksMenuItems />
              <SiteMenu isHome />
            </MenuList>
          </>
        }
        title={
          <Typography variant="h5" component="h1" marginLeft={2}>
            Fame Lady Society
          </Typography>
        }
      >
        <PostReveal />
      </Main>
    </DefaultProvider>
  );
};
export default RevealPage;
