import React, { FC, useMemo } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import { onChainCheckGasAbi } from "@/wagmi";
import Skeleton from "@mui/material/Skeleton";
import { ClaimCard } from "./ClaimCards";
import { useAccount, useReadContract } from "wagmi";
import { onChainCheckGasAddress } from "@/viem/mainnet-client";

export const OnChainCheckGasClaimCard: FC<{
  chainId: 8453 | 11155111;
}> = ({ chainId }) => {
  const { address } = useAccount();

  const { data, isLoading, error } = useReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: "tokensOfOwner",
    args: address ? [address] : undefined,
    chainId: 1,
  });

  const tokenIds = useMemo(() => data?.map(Number) ?? [], [data]);
  console.log("tokenIds", tokenIds);
  console.log("error", error);

  return (
    <Grid2 xs={12}>
      {isLoading ? (
        <Skeleton variant="rectangular" height={200} />
      ) : (
        <ClaimCard
          title="Claim OnChainCheckGas Tokens"
          chainId={chainId}
          contractAddress={onChainCheckGasAddress}
          tokenIds={tokenIds}
        />
      )}
    </Grid2>
  );
};
