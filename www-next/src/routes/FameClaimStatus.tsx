"use client";
import React, { FC } from "react";
import { DefaultProvider } from "@/context/default";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";

import { Main } from "@/layouts/Main";
import { SlimChecker } from "@/features/claim/components/SlimChecker";
import { OG_AGE_BOOST, OG_RANK_BOOST } from "@/features/claim/hooks/constants";
import { isAddress } from "viem";

const NextPage: FC<{
  address: string;
}> = ({ address }) => {
  const isValid = isAddress(address);
  return (
    <DefaultProvider mainnet base>
      <Main
        title={
          <Typography variant="h5" component="h1" marginLeft={2}>
            Claim to $FAME
          </Typography>
        }
      >
        <Container sx={{ mt: 8 }}>
          <Grid2 container spacing={2}>
            <Grid2 xs={12}>
              <Card
                sx={{
                  marginTop: 4,
                }}
              >
                <CardContent>
                  <Typography variant="body1">
                    These numbers are an estimate and subject to change.
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
            <Grid2 xs={12}>
              {isValid && (
                <SlimChecker
                  address={address}
                  chainId={8453}
                  ageBoost={OG_AGE_BOOST}
                  rankBoost={OG_RANK_BOOST}
                />
              )}
            </Grid2>
            <Grid2 xs={12}>
              <Card>
                <CardActionArea href="/fame">
                  <CardContent>
                    <Typography variant="body1">
                      Click here for more information on $FAME.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid2>
          </Grid2>
        </Container>
      </Main>
    </DefaultProvider>
  );
};
export default NextPage;
