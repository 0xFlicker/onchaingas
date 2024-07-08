import { FC } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import NextImage from "next/image";
import TwitterIcon from "@mui/icons-material/Twitter";
import BackIcon from "@mui/icons-material/ArrowBack";
import { EtherscanIcon } from "@/components/icons/etherscan";
import { OpenSeaIcon } from "@/components/icons/opensea";
import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import { WrappedLink } from "@/components/WrappedLink";

const tweetText = encodeURIComponent(
  "🔥 Just wrapped my FameLadySquad tokens into the @FameLadySociety collection! Flaunt with us, be a part of HERstory in this true community-run project, and embrace WebWE transparency! 🎉💪💋 #ItsAWrap",
);

export const Success: FC<{
  txHash: string;
  tokenIds: string[];
}> = ({ txHash, tokenIds }) => {
  const router = useRouter();

  return (
    <Container maxWidth="lg">
      <Grid2 container>
        <Grid2 xs={12}>
          <Card sx={{ mt: 6 }}>
            <CardActions>
              <Button
                variant="text"
                onClick={() => {
                  router.back();
                }}
              >
                <Box
                  component="div"
                  display="flex"
                  justifyContent="center"
                  mb={2}
                  alignItems="center"
                  height="32px"
                >
                  <BackIcon />
                  <Typography
                    component="span"
                    sx={{
                      flex: "0 0 auto",
                      mx: 1,
                    }}
                  >
                    Back
                  </Typography>
                </Box>
              </Button>
            </CardActions>
          </Card>
        </Grid2>
        <Grid2 xs={12}>
          <Card>
            <CardContent>
              <Typography variant="body1" textAlign="center">
                You have successfully wrapped your Fame Lady Squad tokens into
                the Fame Lady Society collection!
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        {tokenIds.map((tokenId) => (
          <Grid2
            key={tokenId}
            xs={4}
            lg={2}
            p={{
              xs: 0,
              lg: 2,
            }}
          >
            <Card>
              <CardMedia
                component="img"
                image={`https://fls-prod-imagestoragef1b24905-1ftqhtk2cy7nl.s3.amazonaws.com/thumb/${tokenId}.png`}
                sx={{
                  objectFit: "contain",
                  width: "100%",
                }}
              />
            </Card>
          </Grid2>
        ))}
        <Grid2 xs={12}>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Grid2 container rowSpacing={8}>
                <Grid2 xs={12}>
                  <Box
                    component="div"
                    display="flex"
                    justifyContent="center"
                    mb={2}
                    alignItems="center"
                    height="32px"
                  >
                    <WrappedLink
                      href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      height="32px"
                    >
                      <Typography
                        component="span"
                        variant="body1"
                        sx={{ flex: "0 0 auto", mr: 1 }}
                      >
                        Share on Twitter
                      </Typography>
                      <TwitterIcon />
                    </WrappedLink>
                  </Box>
                </Grid2>
                <Grid2 xs={12} lg={6}>
                  <Box
                    component="div"
                    display="flex"
                    justifyContent="center"
                    mb={2}
                    alignItems="center"
                    height="32px"
                  >
                    <WrappedLink
                      href={`https://etherscan.io/tx/${txHash}`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      height="32px"
                    >
                      <Typography
                        component="span"
                        variant="body1"
                        sx={{ flex: "0 0 auto", mr: 1 }}
                      >
                        View your transaction on
                      </Typography>
                      <EtherscanIcon
                        style={{ fontSize: "8rem" }}
                        width="100%"
                        height="32px"
                      />
                    </WrappedLink>
                  </Box>
                </Grid2>
                <Grid2 xs={12} lg={6}>
                  <Box
                    component="div"
                    display="flex"
                    justifyContent="center"
                    mb={2}
                    alignItems="center"
                    height="32px"
                  >
                    <WrappedLink
                      href="https://opensea.io/collection/fameladysociety/activity?search[eventTypes][0]=ASSET_TRANSFER"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      height="32px"
                    >
                      <Typography
                        component="span"
                        variant="body1"
                        sx={{ flex: "0 0 auto", mr: 1 }}
                      >
                        View your Fame Ladies on
                      </Typography>
                      <OpenSeaIcon
                        style={{ fontSize: "8rem" }}
                        width="100%"
                        height="32px"
                      />
                    </WrappedLink>
                  </Box>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
};
