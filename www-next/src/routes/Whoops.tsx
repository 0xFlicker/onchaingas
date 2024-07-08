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

const NextPage: FC<{
  errorMessage: string;
  goBack?: string;
  goBackTitle?: string;
}> = ({ errorMessage, goBack, goBackTitle }) => {
  return (
    <DefaultProvider>
      <Main
        disableConnect
        title={
          <Typography variant="h5" component="h1" marginLeft={2}>
            Whoops
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
                  <Typography variant="body1">{errorMessage}</Typography>
                </CardContent>
              </Card>
            </Grid2>
            <Grid2 xs={12}>
              <Card>
                <CardActionArea href={goBack ?? "/"}>
                  <CardContent>
                    <Typography variant="body1">
                      {goBackTitle ?? "Click here to go back to the home page."}
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
