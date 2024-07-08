import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import CircleIcon from "@mui/icons-material/Circle";
import Stack from "@mui/material/Stack";
import { useTransaction, useWaitForTransactionReceipt } from "wagmi";

// Transactions have three steps:
// 1. Waiting for the user to sign the transaction
// 2. Waiting for the transaction to be submitted
// 3. Waiting for the transaction to be confirmed
// This component displays a linear progress bar over two circles to indicate:
// 1. The user has signed the transaction (33%)
// 2. The transaction has been mined (66%) and is waiting for confirmation
// 3. The transaction has been confirmed (100%)

export const TransactionProgress: FC<{
  transactionHash?: `0x${string}`;
  onConfirmed?: () => void;
}> = ({ transactionHash, onConfirmed }) => {
  const {
    data: transactionResult,
    isFetching,
    isPending,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  useEffect(() => {
    if (transactionResult) {
      setTimeout(() => {
        onConfirmed?.();
      }, 1000);
    }
  }, [onConfirmed, transactionResult]);

  const status = (() => {
    if (isPending && isFetching) {
      return "broadcasting";
    }
    return;
  })();

  const progress = (() => {
    if (isPending && !isFetching) {
      return 0;
    }
    if (isPending && isFetching) {
      return 50;
    }
    if (transactionResult) {
      return 100;
    }
    return 0;
  })();

  return (
    <Box
      component="div"
      sx={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <Stack sx={{ position: "relative", mr: 1 }} alignItems="center">
        <CircularProgress
          size={32}
          thickness={5}
          sx={{
            color:
              status === "broadcasting" ? "primary.main" : "action.disabled",
          }}
        />
        <Box
          component="div"
          sx={{
            position: "absolute",
            zIndex: 2,
          }}
        >
          <CircleIcon
            color={status === "broadcasting" ? "primary" : "disabled"}
            sx={{ fontSize: "2rem" }}
          />
        </Box>
      </Stack>
      <Box component="div" sx={{ position: "relative", flexGrow: 1 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ zIndex: 1 }}
        />
        <Box
          component="div"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        >
          <CircleIcon
            color={status === "broadcasting" ? "primary" : "action"}
            sx={{ fontSize: "1rem" }}
          />
        </Box>
        <Box
          component="div"
          sx={{
            position: "absolute",
            left: "100%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        >
          <CircleIcon
            color={transactionHash ? "primary" : "action"}
            sx={{ fontSize: "1rem" }}
          />
        </Box>
      </Box>
    </Box>
  );
};
