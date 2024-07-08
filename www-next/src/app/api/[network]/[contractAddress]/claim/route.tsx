import { createClient } from "@vercel/kv";
import { type NextRequest, NextResponse } from "next/server";
import {
  client as mainnetClient,
  flsTokenAddress,
  onChainGasAddress,
  onChainCheckGasAddress,
} from "@/viem/mainnet-client";
import {
  client as baseClient,
  walletClient as baseWalletClient,
  claimToFameAddress as baseClaimToFameAddress,
  createSignerAccount as baseCreateSignerAccount,
} from "@/viem/base-client";
import {
  client as sepoliaClient,
  walletClient as sepoliaWalletClient,
  claimToFameAddress as sepoliaClaimToFameAddress,
  createSignerAccount as sepoliaCreateSignerAccount,
} from "@/viem/sepolia-client";
import { claimToFameAbi } from "@/wagmi";
import { encodePacked, erc721Abi, formatUnits, keccak256 } from "viem";
import { getFlsPoolAllocation } from "@/features/claim/hooks/useSnapshot";
import {
  OG_AGE_BOOST,
  OG_RANK_BOOST,
  TOTAL_TOKENS,
} from "@/features/claim/hooks/constants";
import { sessionFromCookies } from "@/service/session";

interface Params {
  network: string;
  contractAddress: `0x${string}`;
}

export interface Input {
  address: `0x${string}`;
  tokenIds: number[];
}

export interface Claim {
  tokenIds: number[];
  destination: `0x${string}`;
  deadlineSeconds: number;
  address: `0x${string}`;
  signature: `0x${string}`;
  nonce: number;
  amount: string;
}

function asNetwork(network: string) {
  if (["base", "sepolia"].includes(network)) {
    return network as "base" | "sepolia";
  }
  return null;
}

function publicClientForNetwork(network: "base" | "sepolia") {
  if (network === "base") {
    return baseClient;
  }
  if (network === "sepolia") {
    return sepoliaClient;
  }
  throw new Error("invalid network");
}

function walletClientForNetwork(network: "base" | "sepolia") {
  if (network === "base") {
    return baseWalletClient;
  }
  if (network === "sepolia") {
    return sepoliaWalletClient;
  }
  throw new Error("invalid network");
}

function createSignerAccountForNetwork(network: "base" | "sepolia") {
  if (network === "base") {
    return baseCreateSignerAccount();
  }
  if (network === "sepolia") {
    return sepoliaCreateSignerAccount();
  }
  throw new Error("invalid network");
}

function claimToFameAddressForNetwork(network: "base" | "sepolia") {
  if (network === "base") {
    return baseClaimToFameAddress;
  }
  if (network === "sepolia") {
    return sepoliaClaimToFameAddress;
  }
  throw new Error("invalid network");
}

async function wasClaimed({
  contractAddress,
  network,
  tokenIds,
}: {
  contractAddress: `0x${string}`;
  network: "base" | "sepolia";
  tokenIds: number[];
}) {
  const client = publicClientForNetwork(network);
  const claimToFameAddress = claimToFameAddressForNetwork(network);
  const claimed = await client.readContract({
    abi: claimToFameAbi,
    address: claimToFameAddress,
    functionName: "isClaimedBatch",
    args: [
      contractAddress,
      tokenIds.map((tokenId) => BigInt(tokenId)),
    ] as const,
  });
  return claimed;
}

async function signClaimRequest({
  address,
  contractAddress,
  account,
  client,
  amount,
  deadlineSeconds,
  tokenIds,
  nonce,
}: {
  address: `0x${string}`;
  contractAddress: `0x${string}`;
  account: ReturnType<typeof createSignerAccountForNetwork>;
  client: ReturnType<typeof walletClientForNetwork>;
  amount: bigint;
  network: "base" | "sepolia";
  deadlineSeconds: number;
  tokenIds: number[];
  nonce: bigint;
}) {
  const hash = keccak256(
    encodePacked(
      ["address", "address", "uint256", "uint256", "uint16[]", "uint256"],
      [
        address,
        contractAddress,
        amount,
        BigInt(deadlineSeconds),
        tokenIds,
        nonce,
      ]
    )
  );

  return await client.signMessage({
    message: { raw: hash },
    account,
  });
}

class NotAnOwnerError extends Error {
  public tokenIds: bigint[];

  get message() {
    return `Not an owner of token${this.tokenIds.length > 1 ? "s" : ""} ${this.tokenIds.join(", ")}`;
  }
}

class BannedTokenId extends Error {
  public tokenIds: bigint[];
  constructor(tokenIds: bigint[]) {
    super(
      `Token${tokenIds.length > 1 ? "s" : ""} ${tokenIds.join(", ")} is banned`
    );
    this.tokenIds = tokenIds;
  }
}

async function verifyClaim({
  address,
  contractAddress,
  tokenIds,
  client,
}: {
  address: `0x${string}`;
  contractAddress: `0x${string}`;
  tokenIds: bigint[];
  client: typeof mainnetClient | typeof sepoliaClient;
}) {
  let error: Error | null = null;
  await Promise.all(
    tokenIds.map((tokenId) =>
      client
        .readContract({
          abi: erc721Abi,
          address: contractAddress,
          functionName: "ownerOf",
          args: [tokenId],
        })
        .then((owner) => {
          if (owner !== address && !error) {
            error = new NotAnOwnerError();
          }
          return tokenId;
        })
    )
  ).then(() => {
    if (error) {
      throw error;
    }
  });
}

const allocation = getFlsPoolAllocation(OG_RANK_BOOST, OG_AGE_BOOST);
async function societyClaim(address: `0x${string}`, tokenIds: bigint[]) {
  if (
    tokenIds.some((tokenId) => allocation.get(Number(tokenId)) === undefined)
  ) {
    throw new BannedTokenId(
      tokenIds.filter(
        (tokenId) => allocation.get(Number(tokenId)) === undefined
      )
    );
  }
  await verifyClaim({
    address,
    contractAddress: flsTokenAddress,
    tokenIds,
    client: mainnetClient,
  });

  return tokenIds.reduce(
    (acc, tokenId) => acc + allocation.get(Number(tokenId))!,
    0n
  );
}
async function onChainGasClaim(address: `0x${string}`, tokenIds: bigint[]) {
  await verifyClaim({
    address,
    contractAddress: onChainGasAddress,
    tokenIds,
    client: mainnetClient,
  });

  return (BigInt(tokenIds.length) * (TOTAL_TOKENS * 5n)) / 1000000n;
}

async function onChainCheckGasClaim(
  address: `0x${string}`,
  tokenIds: bigint[]
) {
  await verifyClaim({
    address,
    contractAddress: onChainCheckGasAddress,
    tokenIds,
    client: mainnetClient,
  });

  return (BigInt(tokenIds.length) * (TOTAL_TOKENS * 5n)) / 1000000n;
}

async function verifyClaimForContract({
  address,
  contractAddress,
  tokenIds,
}: {
  address: `0x${string}`;
  contractAddress: `0x${string}`;
  tokenIds: bigint[];
}) {
  switch (contractAddress) {
    case flsTokenAddress:
      return societyClaim(address, tokenIds);
    case onChainGasAddress:
      return onChainGasClaim(address, tokenIds);
    case onChainCheckGasAddress:
      return onChainCheckGasClaim(address, tokenIds);
    default:
      throw new Error("invalid contract address");
  }
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  const network = asNetwork(params.network);

  if (!network) {
    return NextResponse.json({ error: "invalid network" }, { status: 400 });
  }

  const contractAddress = params.contractAddress;
  // TODO verify contract address

  const session = await sessionFromCookies(req.cookies);

  try {
    let data: Input;
    try {
      data = await req.json();
    } catch (error) {
      return NextResponse.json({ error: "invalid input" }, { status: 400 });
    }

    if (data.address !== session.address) {
      return NextResponse.json({ error: "unauthorized" }, { status: 403 });
    }

    // expect all tokens to be found in the allocation
    const tokenIds = data.tokenIds;

    // expect all tokens to be owned by the address

    // expect all tokens to be unclaimed
    const claimed = await wasClaimed({ contractAddress, network, tokenIds });
    if (claimed.includes(true)) {
      console.warn(
        `some tokens [${claimed
          .map((c, i) => (c ? tokenIds[i] : null))
          .filter(Boolean)
          .join(", ")}] already claimed for address ${data.address}`
      );
      return NextResponse.json(
        {
          error: "some tokens already claimed",
          tokenIds: tokenIds.filter((_, i) => claimed[i]),
        },
        { status: 400 }
      );
    }

    const kv = createClient({
      token: process.env.KV_REST_API_TOKEN,
      url: process.env.KV_REST_API_URL,
    });

    // console.log("kv connected");

    const tokensAlreadyHasActiveClaimId = new Map<number, string>();
    // For each token, check if it exists in the KV store
    await Promise.all(
      tokenIds.map(async (tokenId) => {
        const claim = await kv.get<string>(`claim-id:${network}:${tokenId}`);
        if (claim) {
          console.log(
            `Token ${tokenId} already has an active signature: ${claim}`
          );
          tokensAlreadyHasActiveClaimId.set(tokenId, claim);
        }
      })
    );
    const uniqueClaimIds = new Set<string>();
    const tokensAlreadyHasActiveClaim = new Map<string, Claim>();
    // For each token, check if it exists in the KV store
    const claimPromises = Array.from(
      tokensAlreadyHasActiveClaimId.values()
    ).map(async (claimId) => {
      if (uniqueClaimIds.has(claimId)) {
        return;
      }
      uniqueClaimIds.add(claimId);
      const claim = await kv.get<Claim>(`claim:${claimId}`);
      if (claim) {
        tokensAlreadyHasActiveClaim.set(claimId, claim);
      }
    });

    // console.log("checking active claims");
    await Promise.all(claimPromises);
    // console.log("checked active claims");
    // if (tokensAlreadyHasActiveClaim.size > 0) {
    //   console.warn(
    //     `Found ${tokensAlreadyHasActiveClaim.size} tokens with active claims: ${JSON.stringify(Array.from(tokensAlreadyHasActiveClaim.values()))}`,
    //   );
    // }

    // Filter out tokens that already have an active claim
    const tokensWithoutActiveClaim = tokenIds
      .filter((tokenId) => !tokensAlreadyHasActiveClaimId.has(tokenId))
      .sort((a, b) => a - b);

    // console.log(
    //   `Found ${tokensWithoutActiveClaim.length} tokens without active claims`,
    // );

    const claimedAmount = await verifyClaimForContract({
      address: data.address,
      contractAddress,
      tokenIds: tokensWithoutActiveClaim.map(BigInt),
    });

    let claims = Array.from(tokensAlreadyHasActiveClaim.values());
    if (tokensWithoutActiveClaim.length > 0) {
      const client = publicClientForNetwork(network);
      const claimToFameAddress = claimToFameAddressForNetwork(network);
      const account = createSignerAccountForNetwork(network);

      const nonce = await client.readContract({
        abi: claimToFameAbi,
        address: claimToFameAddress,
        functionName: "signatureNonces",
        args: [data.address],
      });
      // console.log("nonce", nonce);

      const deadlineSeconds = Math.floor((Date.now() + 1000 * 60 * 8) / 1000); // 8 minutes
      // console.log(`Signing claim with ${account.address}`);
      const signature = await signClaimRequest({
        account,
        address: data.address,
        contractAddress,
        amount: claimedAmount,
        client: walletClientForNetwork(network),
        deadlineSeconds,
        network,
        nonce,
        tokenIds: tokensWithoutActiveClaim,
      });

      // console.log("signature", signature);

      const claim: Claim = {
        tokenIds: tokensWithoutActiveClaim,
        destination: data.address,
        signature,
        nonce: Number(nonce),
        address: data.address,
        amount: formatUnits(claimedAmount, 18),
        deadlineSeconds,
      };

      await Promise.all([
        kv.set(`claim:${signature}`, claim, {
          ex: 60 * 10, // 10 minutes
        }),
        ...tokensWithoutActiveClaim.map((tokenId) =>
          kv.set(`claim-id:${network}:${tokenId}`, signature, {
            ex: 60 * 10, // 10 minutes
          })
        ),
      ]);
      claims.push(claim);
    }
    // Sort claims in ascending nonce order
    claims.sort((a, b) => a.nonce - b.nonce);
    return NextResponse.json({
      claims,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof NotAnOwnerError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof BannedTokenId) {
      return NextResponse.json(
        { error: error.message, bannedTokenIds: error.tokenIds },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export type Output = {
  claims?: Claim[];
  bannedTokenIds?: number[];
  error?: string;
};
