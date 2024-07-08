import { OG_AGE_BOOST, OG_RANK_BOOST } from "@/features/claim/hooks/constants";
import { useSnapshot } from "@/features/claim/hooks/useSnapshot";

export function useFlsTokenAllocation(tokenId?: number) {
  const { flsPoolAllocation } = useSnapshot(OG_RANK_BOOST, OG_AGE_BOOST);

  return tokenId ? flsPoolAllocation.get(tokenId) : undefined;
}
