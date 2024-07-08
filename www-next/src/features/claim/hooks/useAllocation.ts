import { useMemo } from "react";
import { erc721Abi } from "viem";
import { useReadContracts } from "wagmi";
import { createConfig } from "wagmi";
import { mainnet, polygon } from "viem/chains";
import { getDefaultConfig } from "connectkit";
import {
  HUNNYS_CONTRACT,
  MERMAIDS_CONTRACT,
  METAVIXEN_CONTRACT,
  SQUAD_CONTRACT,
  ALLOCATION_PER_SISTER_TOKEN,
  METAVIXEN_BOOST,
} from "./constants";
import { useSnapshot } from "./useSnapshot";
import { fameLadySquadAbi } from "@/wagmi";
import { useLadies } from "@/features/customize/hooks/useLadies";

export function useAllocation({
  address,
  rankBoost,
  ageBoost,
}: {
  address?: `0x${string}`;
  rankBoost: number;
  ageBoost: number;
}) {
  const { data: mainnetData, isLoading: isContractDataLoading } =
    useReadContracts({
      contracts: address
        ? [
            {
              abi: erc721Abi,
              address: HUNNYS_CONTRACT,
              functionName: "balanceOf",
              args: [address],
              chainId: mainnet.id,
            },
            {
              abi: erc721Abi,
              address: MERMAIDS_CONTRACT,
              functionName: "balanceOf",
              args: [address],
              chainId: mainnet.id,
            },
            {
              abi: fameLadySquadAbi,
              address: SQUAD_CONTRACT,
              functionName: "balanceOf",
              args: [address],
              chainId: mainnet.id,
            },
          ]
        : [],
    });

  const { data: polygonData, isLoading: isPolygonDataLoading } =
    useReadContracts({
      contracts: address
        ? [
            {
              abi: erc721Abi,
              address: METAVIXEN_CONTRACT,
              functionName: "balanceOf",
              args: [address],
              chainId: polygon.id,
            },
          ]
        : [],
    });

  const squadBalance = mainnetData?.[2]?.result;
  const { data: squadTokenResults, isLoading: isSquadDataLoading } =
    useReadContracts({
      contracts: address
        ? Array.from({
            length: squadBalance ? Number(squadBalance) : 0,
          }).map(
            (_, index) =>
              ({
                abi: fameLadySquadAbi,
                address: SQUAD_CONTRACT,
                functionName: "tokenOfOwnerByIndex",
                args: [address, BigInt(index)],
                chainId: mainnet.id,
              }) as const
          )
        : [],
    });

  const mainnetHunnys = mainnetData?.[0]?.result;
  const mainnetMermaids = mainnetData?.[1]?.result;
  const polygonMetavixens = polygonData?.[0]?.result;

  const { flsPoolAllocation, snapshot } = useSnapshot(rankBoost, ageBoost);

  const { data: flsTokenIds, isLoading: isGraphqlLoading } = useLadies({
    owner: address,
    first: 1000,
    chainId: 1,
  });

  return useMemo(() => {
    const lowerCaseAddress = address?.toLowerCase();
    const flsTokens = lowerCaseAddress
      ? snapshot
          .filter((item) => flsTokenIds.includes(BigInt(item.tokenId)))
          .filter(({ tokenId }) => flsPoolAllocation.has(Number(tokenId)))
          .map(({ tokenId }) => flsPoolAllocation.get(Number(tokenId))!)
      : [];
    const flsAllocation = flsTokens.reduce(
      (acc, allocation) => acc + allocation,
      0n
    );

    const squadTokenIds =
      squadTokenResults
        ?.filter(({ status }) => status === "success")
        .map((result) => result.result as bigint) ?? [];

    const squadAllocation = lowerCaseAddress
      ? snapshot
          .filter((item) => squadTokenIds.includes(BigInt(item.tokenId)))
          .filter(({ tokenId }) => flsPoolAllocation.has(Number(tokenId)))
          .map(({ tokenId }) => flsPoolAllocation.get(Number(tokenId))!)
      : [];
    const squadTotal = squadAllocation.reduce(
      (acc, allocation) => acc + allocation,
      0n
    );

    const hunnysAllocation = mainnetHunnys
      ? mainnetHunnys * ALLOCATION_PER_SISTER_TOKEN
      : 0n;
    const mermaidsAllocation = mainnetMermaids
      ? mainnetMermaids * ALLOCATION_PER_SISTER_TOKEN
      : 0n;
    const metavixensAllocation = polygonMetavixens
      ? polygonMetavixens * ALLOCATION_PER_SISTER_TOKEN * METAVIXEN_BOOST
      : 0n;

    return {
      isLoading:
        isContractDataLoading ||
        isPolygonDataLoading ||
        isGraphqlLoading ||
        isSquadDataLoading,
      hunnys: hunnysAllocation,
      mermaids: mermaidsAllocation,
      metavixens: metavixensAllocation,
      fls: flsAllocation,
      squad: squadTotal,
      total:
        flsAllocation +
        squadTotal +
        hunnysAllocation +
        mermaidsAllocation +
        metavixensAllocation,
    };
  }, [
    address,
    flsPoolAllocation,
    flsTokenIds,
    isContractDataLoading,
    isGraphqlLoading,
    isPolygonDataLoading,
    isSquadDataLoading,
    mainnetHunnys,
    mainnetMermaids,
    polygonMetavixens,
    snapshot,
    squadTokenResults,
  ]);
}
