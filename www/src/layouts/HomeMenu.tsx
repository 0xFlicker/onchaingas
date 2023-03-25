import MenuList from "@mui/material/MenuList";
import { FC } from "react";
import { Main } from "./Main";
import { SiteMenu } from "features/appbar/components/SiteMenu";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { RootMenu } from "features/menu/Root";
import { Fade } from "transitions/Fade";

export const HomeMenu: FC = () => {
  return (
    <Fade in duration={1000}>
      <Main
        title="Home"
        menu={
          <>
            <MenuList dense disablePadding>
              <SiteMenu />
            </MenuList>
          </>
        }
      >
        <Container
          maxWidth={false}
          sx={{
            mt: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <RootMenu />
          </Box>
        </Container>
      </Main>
    </Fade>
  );
};
