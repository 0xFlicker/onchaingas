import React, { FC, useMemo } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import { onChainGasAbi } from "@/wagmi";
import Skeleton from "@mui/material/Skeleton";
import { ClaimCard } from "./ClaimCards";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { onChainGasAddress } from "@/viem/mainnet-client";

export const OnChainGasClaimCard: FC<{
  chainId: 8453 | 11155111;
}> = ({ chainId }) => {
  const { address } = useAccount();

  const { data, isLoading } = useReadContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: "tokensOfOwner",
    args: address ? [address] : undefined,
    chainId: 1,
  });

  const tokenIds = useMemo(() => data?.map(Number) ?? [], [data]);

  return (
    <Grid2 xs={12}>
      {isLoading ? (
        <Skeleton variant="rectangular" height={200} />
      ) : (
        <ClaimCard
          title="Claim OnChainGas Tokens"
          chainId={chainId}
          contractAddress={onChainGasAddress}
          tokenIds={tokenIds}
        />
      )}
    </Grid2>
  );
};
