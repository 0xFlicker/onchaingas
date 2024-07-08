import React, { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { useAccount, useReadContract } from "wagmi";
import { formatFame } from "@/utils/fame";
import { fameFromNetwork } from "@/features/fame/contract";
import { base, sepolia } from "viem/chains";
import { fameAbi } from "@/wagmi";

export const FameBalanceCard: FC<{
  chainId: typeof sepolia.id | typeof base.id;
}> = ({ chainId }) => {
  const { address } = useAccount();
  const { data: fameBalance } = useReadContract({
    abi: fameAbi,
    address: fameFromNetwork(chainId),
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId,
  });
  return typeof fameBalance === "undefined" ? (
    <Skeleton variant="rectangular" height={65} />
  ) : (
    <Card>
      <CardContent>
        <Typography variant="body1">
          You have {formatFame(fameBalance)}
        </Typography>
      </CardContent>
    </Card>
  );
};
