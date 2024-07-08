import Details from "@/routes/Details";
import {
  client as sepoliaClient,
  flsTokenAddress as sepoliaFlsTokenAddress,
} from "@/viem/sepolia-client";
import {
  client as mainnetClient,
  flsTokenAddress as mainnetFlsTokenAddress,
} from "@/viem/mainnet-client";
import { fetchJson } from "@/ipfs/client";
import { erc721Abi } from "viem";
import { readContract } from "viem/actions";
import { IMetadata } from "@/utils/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customize Lady",
  description: "Customize your Fame Lady.",
};

export default async function Page({
  params,
}: {
  params: { tokenId: string; network: string };
}) {
  const { tokenId, network } = params;
  switch (network) {
    case "sepolia": {
      const tokenUri = await readContract(sepoliaClient, {
        abi: erc721Abi,
        address: sepoliaFlsTokenAddress,
        functionName: "tokenURI",
        args: [BigInt(tokenId)],
      });
      const metadata = await fetchJson<IMetadata>({
        cid: tokenUri.replace("ipfs://", ""),
      });
      return (
        <Details
          metadata={metadata}
          tokenId={Number(tokenId)}
          network="sepolia"
        />
      );
    }
    case "mainnet": {
      const tokenUri = await readContract(mainnetClient, {
        abi: erc721Abi,
        address: mainnetFlsTokenAddress,
        functionName: "tokenURI",
        args: [BigInt(tokenId)],
      });
      const metadata = await fetchJson<IMetadata>({
        cid: tokenUri.replace("ipfs://", ""),
      });
      return (
        <Details
          metadata={metadata}
          tokenId={Number(tokenId)}
          network="mainnet"
        />
      );
    }
  }
}

export const dynamic = "force-dynamic";
