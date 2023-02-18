import MenuList from "@mui/material/MenuList";
import Grid from "@mui/material/Grid";
import { FC } from "react";
import { Main } from "./Main";
import { SiteMenu } from "features/appbar/components/SiteMenu";
import { ClaimCard } from "features/mint";
import { ExampleCard } from "features/mint/components/CheckExampleCard";
import { InfoCard } from "features/mint/components/CheckInfoCard";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { CheckClaimCard } from "features/mint/components/CheckClaimCard";

export const Check: FC = () => {
  return (
    <Main
      title="Onchain Gas Check NFT"
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
          <Grid container spacing={2} maxWidth="md">
            <Grid item xs={12} md={12}>
              <CheckClaimCard />
            </Grid>
            <Grid item xs={12} md={12}>
              <ClaimCard />
            </Grid>
            <Grid item xs={12} lg={6}>
              <ExampleCard />
            </Grid>
            <Grid item xs={12} lg={6}>
              <InfoCard />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Main>
  );
};
