import React, { FC, useMemo } from "react";

import Grid2 from "@mui/material/Unstable_Grid2";
import { useLadies } from "@/features/customize/hooks/useLadies";
import Skeleton from "@mui/material/Skeleton";
import { ClaimCard } from "./ClaimCards";
import { useAccount } from "wagmi";
import { flsTokenAddress } from "@/viem/mainnet-client";

export const FameLadySocietyClaimCard: FC<{
  chainId: 8453 | 11155111;
}> = ({ chainId }) => {
  const { address } = useAccount();
  const { data: ladies, isLoading: isLadiesLoading } = useLadies({
    owner: address,
    chainId: 1,
    first: 1000,
  });
  const tokenIds = useMemo(() => ladies.map(Number), [ladies]);
  console.log("tokenIds", tokenIds);
  return (
    <Grid2 xs={12}>
      {isLadiesLoading ? (
        <Skeleton variant="rectangular" height={200} />
      ) : (
        <ClaimCard
          title="Claim Fame Lady Society Tokens"
          chainId={chainId}
          contractAddress={flsTokenAddress}
          tokenIds={tokenIds}
        />
      )}
    </Grid2>
  );
};
