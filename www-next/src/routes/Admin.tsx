import { DefaultProvider } from "@/context/default";
import { type NextPage } from "next";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import { Main } from "@/layouts/Main";
import { SiteMenu } from "@/features/appbar/components/SiteMenu";
import { LinksMenuItems } from "@/features/appbar/components/LinksMenuItems";

export const Admin: NextPage<{}> = () => {
  return (
    <DefaultProvider mainnet base>
      <Main
        menu={
          <>
            <MenuList dense disablePadding>
              <LinksMenuItems />
              <SiteMenu isWrap />
            </MenuList>
          </>
        }
        title={
          <Typography variant="h5" component="h1" marginLeft={2}>
            admin
          </Typography>
        }
      >
        <Container sx={{ mt: 8 }}>
          <Grid2 container spacing={2}>
            <Grid2 xs={12}>
              {/*
                 there should be some kind of admin content here
                  */}
            </Grid2>
          </Grid2>
        </Container>
      </Main>
    </DefaultProvider>
  );
};
export default Admin;
