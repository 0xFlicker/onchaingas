"use client";
import { DefaultProvider } from "@/context/default";
import { NextPage } from "next";
import Button from "@mui/material/Button";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import { Main } from "@/layouts/Main";
import { SiteMenu } from "@/features/appbar/components/SiteMenu";
import { PostReveal } from "@/features/reveal/components/PostReveal";
import { LinksMenuItems } from "@/features/appbar/components/LinksMenuItems";
import { WrappedLink } from "@/components/WrappedLink";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "@/theme";

const HomePage: NextPage<{}> = () => {
  const tinyScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const roomForTitle = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <DefaultProvider mainnet base>
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
          <>
            {tinyScreen ? null : (
              <Typography variant="h5" component="h1" marginLeft={2}>
                {roomForTitle ? "Fame Lady Society" : "FLS"}
              </Typography>
            )}
            <Button
              component={WrappedLink}
              href="/fame"
              variant="outlined"
              sx={{ ml: 2 }}
            >
              <Typography variant="h5" component="h1">
                FAME
              </Typography>
            </Button>
            <Button
              component={WrappedLink}
              href="/wrap"
              variant="outlined"
              sx={{ ml: 2 }}
            >
              <Typography variant="h5" component="h1">
                {roomForTitle ? "wrap here" : "wrap"}
              </Typography>
            </Button>
          </>
        }
      >
        <PostReveal />
      </Main>
    </DefaultProvider>
  );
};
export default HomePage;
