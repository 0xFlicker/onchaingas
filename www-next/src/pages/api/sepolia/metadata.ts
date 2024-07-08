import * as sentry from "@sentry/nextjs";
import {
  client as viemClient,
  flsTokenAddress,
  namedLadyRendererAddress,
  walletClient,
  createSignerAccount,
} from "@/viem/sepolia-client";
import { createWalletClient, encodePacked, erc721Abi, keccak256 } from "viem";
import { readContract, signMessage } from "viem/actions";
import { IMetadata, defaultDescription } from "@/utils/metadata";
import { fetchJson, upload } from "@/ipfs/client";
import { siweServer } from "@/utils/siweServer";
import { NextApiHandler } from "next";
import { sepolia } from "viem/chains";
import { namedLadyRendererAbi } from "@/wagmi";

type IUpdateMetadata = {
  name: string;
  description: string;
  tokenId: number;
};

export default (async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { address, chainId } = await siweServer.getSession(req, res);
  if (!address) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (chainId !== sepolia.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { name, description, tokenId } = JSON.parse(
    req.body,
  ) as IUpdateMetadata;
  if (!name && !description) {
    return res.status(400).json({ error: "Invalid request" });
  }
  if (name.length > 256) {
    return res.status(400).json({ error: "Name too long" });
  }
  if (description.length > 2048) {
    return res.status(400).json({ error: "Description too long" });
  }
  try {
    // check that address is an owner for the token
    const [ownerOfToken, tokenUri, nonce] = await Promise.all([
      readContract(viemClient, {
        abi: erc721Abi,
        address: flsTokenAddress,
        functionName: "ownerOf",
        args: [BigInt(tokenId)],
      }),
      readContract(viemClient, {
        abi: erc721Abi,
        address: flsTokenAddress,
        functionName: "tokenURI",
        args: [BigInt(tokenId)],
      }),
      readContract(viemClient, {
        abi: namedLadyRendererAbi,
        address: namedLadyRendererAddress,
        functionName: "currentNonce",
        args: [address as `0x${string}`],
      }),
    ]);
    if (ownerOfToken !== address) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const metadata = await fetchJson<IMetadata>({
      cid: tokenUri.replace("ipfs://", ""),
    });
    metadata.name = name;
    metadata.description =
      typeof description !== "undefined" && description.length > 0
        ? `${description}\n\n${defaultDescription}`
        : defaultDescription;
    // find an existing property with the "Named" attribute
    const namedAttribute = metadata.attributes?.find(
      (attribute) => attribute.trait_type === "Named",
    );
    if (namedAttribute) {
      namedAttribute.value = "true";
    } else {
      metadata.attributes?.push({
        trait_type: "Named",
        value: "true",
      });
    }

    const cid = await upload(JSON.stringify(metadata));
    const tokenUriRequest = encodePacked(
      ["uint256", "string", "uint256"],
      [BigInt(tokenId), `ipfs://${cid}`, nonce],
    );
    const hash = keccak256(tokenUriRequest);
    const signature = await signMessage(walletClient, {
      account: createSignerAccount(),
      message: {
        raw: hash,
      },
    });
    res.status(200).json({ tokenUri: `ipfs://${cid}`, signature });
  } catch (error) {
    console.error(error);
    sentry.captureException(error);
    res.status(500).json({ error: "Internal server error" });
  }
} as NextApiHandler);
