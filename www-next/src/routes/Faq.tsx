"use client";
import { DefaultProvider } from "@/context/default";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Main } from "@/layouts/Main";
import { SiteMenu } from "@/features/appbar/components/SiteMenu";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "@/theme";
import FAQ from "@/features/faq";
import Box from "@mui/material/Box";
import { LinksMenuItems } from "@/features/appbar/components/LinksMenuItems";
import { FC } from "react";

export const FaqPage: FC<{}> = () => {
  const roomForTitle = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <DefaultProvider>
      <Main
        menu={
          <>
            <MenuList dense disablePadding>
              <LinksMenuItems />
              <SiteMenu isFaq />
            </MenuList>
          </>
        }
        title={
          <Typography variant="h5" component="h1" marginLeft={2}>
            {roomForTitle ? "frequently asked questions" : "FAQ"}
          </Typography>
        }
      >
        <Container maxWidth="lg">
          <Box component="div" sx={{ mt: 4 }} />
          <FAQ />
        </Container>
      </Main>
    </DefaultProvider>
  );
};
