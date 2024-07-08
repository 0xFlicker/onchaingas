import React, { FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAccount, useSwitchChain } from "wagmi";

export const SwitchToChainBanner: FC<{ chainId: 11155111 | 1 }> = ({
  chainId,
}) => {
  const { switchChain } = useSwitchChain();
  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="body1" sx={{ mb: 2 }}>
        {`This page is only available on the ${chainId === 11155111 ? "Sepolia" : "Ethereum"} chain.`}
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          switchChain({
            chainId,
          });
        }}
      >
        Switch to {chainId === 11155111 ? "Sepolia" : "Ethereum"}
      </Button>
    </Box>
  );
};
