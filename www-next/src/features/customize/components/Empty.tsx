import React, { FC } from "react";
import { WrappedLink } from "@/components/WrappedLink";
import { MagicEdenIcon } from "@/components/icons/magiceden";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";

export const Empty: FC<{}> = ({}) => {
  return (
    <Grid2 xs={12} sx={{ mt: 16 }}>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        my={2}
        gap={2}
      >
        <WrappedLink href="https://magiceden.io/collections/ethereum/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574">
          <Box
            component="div"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <MagicEdenIcon />
            <Typography component="span" color="white">
              Go get a Fame Lady on Magic Eden
            </Typography>
          </Box>
        </WrappedLink>
        <Box
          component="div"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <Typography component="span" color="white">
            Have a Fame Lady?
          </Typography>
          <WrappedLink href="/wrap">
            <Typography component="span" color="white">
              Wrap it
            </Typography>
          </WrappedLink>
        </Box>
      </Box>
    </Grid2>
  );
};
