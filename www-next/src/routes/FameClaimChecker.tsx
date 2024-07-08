"use client";
import React, { FC } from "react";
import { DefaultProvider } from "@/context/default";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { Main } from "@/layouts/Main";

import { AdjustableChecker } from "@/features/claim/components/AdjustableChecker";

const NextPage: FC<{}> = () => {
  return (
    <DefaultProvider mainnet>
      <Main
        title={
          <Typography variant="h5" component="h1" marginLeft={2}>
            admin
          </Typography>
        }
      >
        <Container sx={{ mt: 8 }}>
          <Grid2 container spacing={2}>
            <Grid2 xs={12}>
              <AdjustableChecker />
            </Grid2>
          </Grid2>
        </Container>
      </Main>
    </DefaultProvider>
  );
};
export default NextPage;
