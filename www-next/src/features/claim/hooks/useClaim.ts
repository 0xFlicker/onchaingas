import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { base, sepolia } from "viem/chains";
import type {
  Input,
  Output,
} from "@/app/api/[network]/[contractAddress]/claim/route";

function networkName(chainId: typeof sepolia.id | typeof base.id) {
  switch (chainId) {
    case sepolia.id:
      return "sepolia";
    case base.id:
      return "base";
  }
}
export const useClaim = ({
  address,
  contractAddress,
  chainId,
  tokenIds,
}: {
  address?: `0x${string}`;
  contractAddress: `0x${string}`;
  tokenIds: number[];
  chainId: typeof sepolia.id | typeof base.id;
}) => {
  const enabled = !!address && tokenIds.length > 0;
  return useQuery<Output>({
    enabled,
    queryKey: [chainId, "claim", contractAddress, tokenIds],
    queryFn: () =>
      fetch(`/api/${networkName(chainId)}/${contractAddress}/claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          tokenIds,
        } as Input),
      }).then((res) => res.json()),
  });
};
