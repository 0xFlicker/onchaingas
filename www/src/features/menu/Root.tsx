import { FC } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useSpring, animated } from "react-spring";
import { LinkCard } from "./LinkCard";
import { Typography } from "@mui/material";

const defaultCardMediaProps = {
  component: "img",
  height: "240",
  sx: {
    objectFit: "contain",
    px: 2,
  },
};

export const RootMenu: FC = () => {
  const delayGenerator = (() => {
    let delay = 250;
    return () => {
      delay += 250;
      return delay;
    };
  })();
  const header1Props = useSpring({
    to: {
      opacity: 1,
      x: "0%",
    },
    from: {
      opacity: 0,
      x: "100%",
    },
    delay: delayGenerator(),
  });
  const header1aProps = useSpring({
    to: {
      opacity: 1,
      x: "0%",
    },
    from: {
      opacity: 0,
      x: "100%",
    },
    delay: delayGenerator(),
  });
  const header2Props = useSpring({
    to: {
      opacity: 1,
      x: "0%",
    },
    from: {
      opacity: 0,
      x: "100%",
    },
    delay: delayGenerator(),
  });
  const header2aProps = useSpring({
    to: {
      opacity: 1,
      x: "0%",
    },
    from: {
      opacity: 0,
      x: "100%",
    },
    delay: delayGenerator(),
  });
  const header2bProps = useSpring({
    to: {
      opacity: 1,
      x: "0%",
    },
    from: {
      opacity: 0,
      x: "100%",
    },
    delay: delayGenerator(),
  });

  const AnimatedCard = animated(Card);
  const AnimatedLinkCard = animated(LinkCard);

  return (
    <Grid container spacing={2} maxWidth="md">
      <Grid item xs={12} md={12}>
        <AnimatedCard variant="outlined" style={header1Props}>
          <CardHeader title="Current Projects" />
        </AnimatedCard>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box paddingLeft={8}>
          <AnimatedCard variant="outlined" style={header1Props}>
            <CardHeader title="????" />
            <CardContent>
              <Typography>
                Tools for creators to reward their community with airdrops
              </Typography>
            </CardContent>
          </AnimatedCard>
        </Box>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box paddingLeft={8}>
          <AnimatedLinkCard
            to="https://www.bitflick.xyz"
            headerTitle="Bitflick"
            CardMediaProps={{
              ...defaultCardMediaProps,
              image: "/206.png",
            }}
            style={header1Props}
            content="Ordinals inscription website for lazy mints of recursive ordinals"
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box paddingLeft={8}>
          <AnimatedLinkCard
            to="https://fameladysociety.com"
            headerTitle="Fame Lady Society"
            CardMediaProps={{
              ...defaultCardMediaProps,
              image: "/fls-wrap.gif",
            }}
            style={header1aProps}
            content="NFT wrapper and website for the Fame Lady Society"
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={12}>
        <AnimatedCard variant="outlined" style={header1Props}>
          <CardHeader title="Asleep Projects" />
        </AnimatedCard>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box paddingLeft={8}>
          <AnimatedLinkCard
            to="https://nameflick.com"
            headerTitle="NameflickENS"
            CardMediaProps={{
              ...defaultCardMediaProps,
              image: "/flick.png",
            }}
            style={header1aProps}
            content="Nameflick gives your ENS super-powers"
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={12}>
        <AnimatedCard variant="outlined" style={header2Props}>
          <CardHeader title="Past Mints" />
        </AnimatedCard>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box paddingLeft={8}>
          <AnimatedLinkCard
            to="/gas"
            headerTitle="On Chain Gas"
            CardMediaProps={{
              ...defaultCardMediaProps,
              image: "/preview.gif",
            }}
            style={header2aProps}
            content="The OG on-chain gas meter"
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box paddingLeft={8}>
          <AnimatedLinkCard
            to="/check"
            headerTitle="On Chain Check Gas"
            CardMediaProps={{
              ...defaultCardMediaProps,
              image: "/check_preview.gif",
            }}
            style={header2bProps}
            content={
              <>
                <Typography>Derivative check on chain gas meter</Typography>
                <Typography>
                  Free claim for OG holders and open edition
                </Typography>
              </>
            }
          />
        </Box>
      </Grid>
    </Grid>
  );
};
