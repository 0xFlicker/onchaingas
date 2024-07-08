import { allocatePercentages } from "@/utils/claim";
import { useMemo } from "react";
import snapshot from "@/app/fame/admin/test-claim.json";
import { isBannedToken } from "@/service/bannedTokenIds";
import { FLS_TOKENS } from "./constants";

export function getFlsPoolAllocation(rankBoost: number, ageBoost: number) {
  // find the max blockHeightMinted
  let maxBlockHeightMinted = 0;
  for (const item of snapshot) {
    if (
      item.blockHeightMinted &&
      Number(item.blockHeightMinted) > maxBlockHeightMinted
    ) {
      maxBlockHeightMinted = Number(item.blockHeightMinted);
    }
  }
  return allocatePercentages(
    snapshot
      .filter(({ tokenId }) => !isBannedToken(tokenId))
      .map(({ ogRank, tokenId, blockHeightMinted }) => ({
        blockHeightMinted:
          (blockHeightMinted && Number(blockHeightMinted)) ||
          maxBlockHeightMinted,
        ogRank: Number(ogRank),
        tokenId: Number(tokenId),
      })),
    rankBoost,
    ageBoost,
  ).reduce((acc, { tokenId, percentage }) => {
    acc.set(tokenId, BigInt(percentage * Number(FLS_TOKENS)));
    return acc;
  }, new Map<number, bigint>());
}

export function useSnapshot(rankBoost: number, ageBoost: number) {
  const flsPoolAllocation = useMemo(
    () => getFlsPoolAllocation(rankBoost, ageBoost),
    [rankBoost, ageBoost],
  );

  return {
    flsPoolAllocation,
    snapshot,
  };
}
