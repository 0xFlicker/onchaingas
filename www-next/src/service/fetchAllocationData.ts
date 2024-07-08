import {
  HUNNYS_CONTRACT,
  MARKET_CAP,
  MERMAIDS_CONTRACT,
  METAVIXEN_CONTRACT,
  OG_AGE_BOOST,
  OG_RANK_BOOST,
  SISTER_TOKENS,
  SQUAD_CONTRACT,
} from "@/features/claim/hooks/constants";
import { getFlsPoolAllocation } from "@/features/claim/hooks/useSnapshot";
import { getBuiltGraphSDK } from "@/graphclient";
import { client as mainnetClient } from "@/viem/mainnet-client";
import { client as polygonClient } from "@/viem/polygon-client";
import { fameLadySquadAbi } from "@/wagmi";
import { erc721Abi } from "viem";
import snapshot from "@/app/fame/admin/test-claim.json";
import bannedClaimAddresses from "./bannedClaimAddresses";

export async function fetchBannedTokenIds() {
  // For each address in bannedClaimAddresses, fetch the token IDs in the squad contract
  const bannedTokenIds = await Promise.all(
    bannedClaimAddresses.map(async (address) => {
      const result = await mainnetClient.readContract({
        abi: erc721Abi,
        address: SQUAD_CONTRACT,
        functionName: "balanceOf",
        args: [address],
      });

      return await Promise.all(
        Array.from({ length: Number(result) }, (_, i) =>
          mainnetClient.readContract({
            abi: fameLadySquadAbi,
            address: SQUAD_CONTRACT,
            functionName: "tokenOfOwnerByIndex",
            args: [address, BigInt(i)],
          }),
        ),
      );
    }),
  );
  return bannedTokenIds.flat();
}

export async function fetchAllocationData({
  address,
}: {
  address: `0x${string}`;
}) {
  const sdk = getBuiltGraphSDK();
  const [result, hunnysResult, squadResult, mermaidsResult, metavixenResult] =
    await Promise.all([
      sdk.MainnetTokenByOwner({
        owner: address,
        first: 1000,
        orderDirection: "asc",
        skip: 0,
      }),
      mainnetClient.readContract({
        abi: erc721Abi,
        address: HUNNYS_CONTRACT,
        functionName: "balanceOf",
        args: [address],
      }),
      mainnetClient.readContract({
        abi: erc721Abi,
        address: SQUAD_CONTRACT,
        functionName: "balanceOf",
        args: [address],
      }),
      mainnetClient.readContract({
        abi: erc721Abi,
        address: MERMAIDS_CONTRACT,
        functionName: "balanceOf",
        args: [address],
      }),
      polygonClient.readContract({
        abi: erc721Abi,
        address: METAVIXEN_CONTRACT,
        functionName: "balanceOf",
        args: [address],
      }),
    ]);

  const squadTokenIds =
    squadResult > 0n
      ? await Promise.all(
          Array.from({ length: Number(squadResult) }, (_, i) =>
            mainnetClient.readContract({
              abi: fameLadySquadAbi,
              address: SQUAD_CONTRACT,
              functionName: "tokenOfOwnerByIndex",
              args: [address, BigInt(i)],
            }),
          ),
        )
      : [];

  const societyTokenIds = result.ownerships.map((ownership) =>
    BigInt(ownership.tokenId),
  );

  const flsPoolAllocation = getFlsPoolAllocation(OG_RANK_BOOST, OG_AGE_BOOST);

  const flsTokens = snapshot
    .filter((item) => societyTokenIds.includes(BigInt(item.tokenId)))
    .map(({ tokenId }) => flsPoolAllocation.get(Number(tokenId))!);
  const flsAllocation = flsTokens.reduce(
    (acc, allocation) => acc + allocation,
    0n,
  );
  const squadAllocation = snapshot
    .filter((item) => squadTokenIds.includes(BigInt(item.tokenId)))
    .map(({ tokenId }) => flsPoolAllocation.get(Number(tokenId))!);
  const squadTotal = squadAllocation.reduce(
    (acc, allocation) => acc + allocation,
    0n,
  );

  const hunnysAllocation = hunnysResult
    ? BigInt(
        ((Number(hunnysResult) * 0.03) / MARKET_CAP) * Number(SISTER_TOKENS),
      )
    : 0n;
  const mermaidsAllocation = mermaidsResult
    ? BigInt(
        ((Number(mermaidsResult) * 0.03) / MARKET_CAP) * Number(SISTER_TOKENS),
      )
    : 0n;
  const metavixensAllocation = metavixenResult
    ? BigInt(
        ((Number(metavixenResult) * 0.03) / MARKET_CAP) * Number(SISTER_TOKENS),
      )
    : 0n;

  return {
    flsAllocation,
    squadTotal,
    hunnysAllocation,
    mermaidsAllocation,
    metavixensAllocation,
    total:
      flsAllocation +
      squadTotal +
      hunnysAllocation +
      mermaidsAllocation +
      metavixensAllocation,
  };
}
