import { fameSaleAbi, fameSaleTokenAbi } from "@/wagmi";
import { useReadContracts } from "wagmi";
import type { sepolia, base } from "viem/chains";
import {
  fameSaleAddress,
  fameSaleTokenAddress,
} from "@/features/fame/contract";
import { presaleAmountToTokens } from "@/utils/fame";

export function usePresaleAmount({
  address,
  chainId,
}: {
  address?: `0x${string}`;
  chainId?: typeof sepolia.id | typeof base.id;
}) {
  const { data, ...rest } = useReadContracts({
    allowFailure: false,
    contracts: chainId
      ? [
          {
            abi: fameSaleTokenAbi,
            address: fameSaleTokenAddress(chainId),
            functionName: "balanceOf",
            args: address ? [address] : undefined,
            chainId,
          },
          {
            abi: fameSaleAbi,
            address: fameSaleAddress(chainId),
            functionName: "maxRaise",
            chainId,
          },
        ]
      : [],
  });

  const amount =
    data && data.length ? presaleAmountToTokens(data[0], data[1]) : undefined;

  return {
    amount,
    ...rest,
  };
}
