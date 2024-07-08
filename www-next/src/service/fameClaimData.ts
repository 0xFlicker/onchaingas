import { fetchJson } from "@/ipfs/client";
import { retryWithBackOff } from "@/utils/retry";
import { mergeMap, catchError } from "rxjs/operators";
import { range, EMPTY } from "rxjs";
import { type IMetadata } from "@/utils/metadata";
import {
  getBuiltGraphSDK,
  MainnetMintsQuery,
  MainnetOwnersQuery,
} from "@/graphclient";

const FAME_LADY_SOCIETY_IPFS_METADATA_CID =
  "bafybeifilzfx3asubemd3sgirkgeaeymu3d3n5qg6ekxakobldmnfkb3zu";

export async function fetchFameLadySocietyMetadata(tokenId: number) {
  return retryWithBackOff(
    async () => {
      // if (tokenId % 1000 === 0) {
      //   console.log("fetching metadata for tokenId", tokenId);
      // }
      const metadata = await fetchJson<IMetadata>({
        cid: `${FAME_LADY_SOCIETY_IPFS_METADATA_CID}/${tokenId}`,
        next: { cache: "force-cache" },
      });
      metadata.tokenId = tokenId.toString();
      return metadata;
    },
    10,
    250,
  );
}

function fetchAllFameLadySocietyMetadata() {
  return range(0, 8888).pipe(
    mergeMap((tokenId) => fetchFameLadySocietyMetadata(tokenId), 12),
    catchError((e) => {
      console.error(e);
      return EMPTY;
    }),
  );
}

async function fetchAllMints() {
  const sdk = getBuiltGraphSDK();
  const responses: MainnetMintsQuery[] = [];
  let skip = 0;
  let hasMore = true;
  while (hasMore) {
    // console.log("fetching mints", skip);
    const data = await sdk.MainnetMints(
      {
        first: 100,
        skip,
        orderDirection: "asc",
      },
      {
        next: { cache: "force-cache", revalidate: 86400 },
      },
    );
    responses.push(data);
    skip += data.transfers.length;
    hasMore = !!data.transfers.length;
  }
  return responses.map((response) => response.transfers).flat();
}

function reduceMints(mints: MainnetMintsQuery["transfers"]) {
  // iterate through all transfers and only keep the min block number for any given FameLadySociety_id
  const minBlockNumberByTokenId = new Map<
    number,
    MainnetMintsQuery["transfers"][0]
  >();
  for (const mint of mints) {
    const tokenId = mint.FameLadySociety_id;
    const blockNumber = mint.blockNumber;
    if (!minBlockNumberByTokenId.has(tokenId)) {
      minBlockNumberByTokenId.set(tokenId, mint);
    } else {
      const existing = minBlockNumberByTokenId.get(tokenId)!;
      minBlockNumberByTokenId.set(
        tokenId,
        blockNumber < existing.blockNumber ? mint : existing,
      );
    }
  }
  return minBlockNumberByTokenId.values();
}

export async function fetchAllOwners() {
  const sdk = getBuiltGraphSDK();
  const responses: MainnetOwnersQuery[] = [];
  let skip = 0;
  let hasMore = true;
  while (hasMore) {
    // console.log("fetching owners", skip);
    const data = await sdk.MainnetOwners(
      {
        first: 100,
        skip,
      },
      {
        next: { cache: "force-cache", revalidate: 86400 },
      },
    );
    responses.push(data);
    skip += data.ownerships.length;
    hasMore = !!data.ownerships.length;
  }
  return responses.map((response) => response.ownerships).flat();
}

export function zipUp(
  metadatas: IMetadata[],
  mints: MainnetMintsQuery["transfers"],
  owners: MainnetOwnersQuery["ownerships"],
) {
  const tokenMintMap = new Map<number, MainnetMintsQuery["transfers"][0]>();
  const tokenOwnerMap = new Map<number, MainnetOwnersQuery["ownerships"][0]>();

  for (const mint of mints) {
    tokenMintMap.set(Number(mint.FameLadySociety_id), mint);
  }

  for (const owner of owners) {
    tokenOwnerMap.set(Number(owner.tokenId), owner);
  }

  const result: {
    tokenId: number;
    blockHeightMinted?: number;
    blockTimestampMinted?: number;
    owner?: string;
    ogRank: number;
  }[] = [];
  for (let i = 0; i < metadatas.length; i++) {
    const metadata = metadatas[i];
    const tokenId = Number(metadata.tokenId!);
    const mint = tokenMintMap.get(tokenId);
    const owner = tokenOwnerMap.get(tokenId);
    const ogRank = Number(
      metadata.attributes?.find((attr) => attr.trait_type === "OG Rank")?.value,
    );
    result.push({
      tokenId,
      ...(mint && {
        blockHeightMinted: mint.blockNumber,
        blockTimestampMinted: mint.blockTimestamp,
      }),
      ...(owner && { owner: owner.owner }),
      ogRank: ogRank!,
    });
  }
  return result;
}

export async function fetchFameClaimData() {
  console.log("fetching metadata, mints, and owners");
  const [metadatas, mints, owners] = await Promise.all([
    new Promise<IMetadata[]>((resolve, reject) => {
      const metadatas: IMetadata[] = [];
      fetchAllFameLadySocietyMetadata().subscribe({
        next(value) {
          metadatas.push(value);
        },
        error(e) {
          console.error(e);
          reject(e);
        },
        complete() {
          resolve(metadatas);
        },
      });
    }),
    fetchAllMints().then(reduceMints),
    fetchAllOwners(),
  ]);
  console.log("done fetching metadata, mints, and owners");

  const allMints = [...mints];

  console.log("fetched", metadatas.length, "metadata");
  console.log("fetched", allMints.length, "mints");
  console.log("fetched", owners.length, "owners");
  const data = zipUp(metadatas, allMints, owners);
  return data;
}
