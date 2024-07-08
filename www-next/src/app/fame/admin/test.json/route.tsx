import { NextRequest, NextResponse } from "next/server";
import data from "../test-claim.json";
import { allocatePercentages, allocatePool } from "@/utils/claim";

export async function GET(req: NextRequest) {
  // find the max blockHeightMinted
  let maxBlockHeightMinted = 0;
  for (const item of data) {
    if (
      item.blockHeightMinted &&
      Number(item.blockHeightMinted) > maxBlockHeightMinted
    ) {
      maxBlockHeightMinted = Number(item.blockHeightMinted);
    }
  }
  // const weights = allocatePool(
  //   data.map(({ ogRank, tokenId, blockHeightMinted }) => ({
  //     blockHeightMinted:
  //       (blockHeightMinted && Number(blockHeightMinted)) ||
  //       maxBlockHeightMinted,
  //     ogRank: Number(ogRank),
  //     tokenId: Number(tokenId),
  //   })),
  //   1.2,
  //   1.2,
  //   235_000_000n * 10n ** 18n,
  // );

  const weights = allocatePercentages(
    data.map(({ ogRank, tokenId, blockHeightMinted }) => ({
      blockHeightMinted:
        (blockHeightMinted && Number(blockHeightMinted)) ||
        maxBlockHeightMinted,
      ogRank: Number(ogRank),
      tokenId: Number(tokenId),
    })),
    1,
    1,
  );

  const transformedData: {
    tokenId: number;
    ogRank: number;
    blockHeightMinted?: number;
    blockTimestampMinted?: number;
    owner?: string | null;
    percentage: string;
    allocation: string;
  }[] = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const tokenId = Number(item.tokenId);
    const ogRank = Number(item.ogRank);
    // to find the allocation in decimal form, take the allocation and divide by 10^18,
    // but convert to a string and use the right most 18 digits as the decimal part
    // and the left most digits as the integer part
    // const allocation =
    //   `${weights[i].allocation}`.slice(0, -18) +
    //   "." +
    //   `${weights[i].allocation}`.slice(-18);

    transformedData.push({
      tokenId,
      ogRank,
      ...(item.blockHeightMinted
        ? { blockHeightMinted: Number(item.blockHeightMinted) }
        : {}),
      ...(item.blockTimestampMinted
        ? { blockTimestampMinted: Number(item.blockTimestampMinted) }
        : {}),
      ...(item.owner ? { owner: item.owner } : {}),
      percentage: `${weights[i].percentage}`,
      allocation: `${weights[i].percentage * 235_000_000}`,
    });
  }

  // sum the allocations
  // const totalAllocation = weights.reduce(
  //   (acc, { allocation }) => acc + allocation,
  //   0n,
  // );

  let minAllocation = Infinity;
  let maxAllocation = 0;
  let minAllocationForUnwrapped = Infinity;
  let maxAllocationForUnwrapped = 0;
  let totalAllocationForUnwrapped = 0;
  let totalUnwrapped = 0;
  let minAllocationForWrapped = Infinity;
  let maxAllocationForWrapped = 0;
  let totalAllocationForWrapped = 0;
  let totalWrapped = 0;

  for (const item of transformedData) {
    const allocation = Number(item.allocation);
    if (allocation < minAllocation) {
      minAllocation = allocation;
    }
    if (allocation > maxAllocation) {
      maxAllocation = allocation;
    }
    if (item.blockHeightMinted) {
      if (allocation < minAllocationForWrapped) {
        minAllocationForWrapped = allocation;
      }
      if (allocation > maxAllocationForWrapped) {
        maxAllocationForWrapped = allocation;
      }
      totalAllocationForWrapped += allocation;
      totalWrapped += 1;
    } else {
      if (allocation < minAllocationForUnwrapped) {
        minAllocationForUnwrapped = allocation;
      }
      if (allocation > maxAllocationForUnwrapped) {
        maxAllocationForUnwrapped = allocation;
      }
      totalAllocationForUnwrapped += allocation;
      totalUnwrapped += 1;
    }
  }
  const averageAllocationSize =
    (totalAllocationForUnwrapped + totalAllocationForWrapped) /
    (totalUnwrapped + totalWrapped);
  const averageForUnwrapped = totalAllocationForUnwrapped / totalUnwrapped;
  const averageForWrapped = totalAllocationForWrapped / totalWrapped;
  const avgTokensForWrappedToGetOneMillion = 1_000_000 / averageForWrapped;
  const avgTokensForUnwrappedToGetOneMillion = 1_000_000 / averageForUnwrapped;

  console.log("average allocation size              ", averageAllocationSize);
  console.log("average allocation size for unwrapped", averageForUnwrapped);
  console.log("average allocation size for wrapped  ", averageForWrapped);
  console.log("min allocation                       ", minAllocation);
  console.log("max allocation                       ", maxAllocation);
  console.log(
    "min allocation for unwrapped         ",
    minAllocationForUnwrapped,
  );
  console.log(
    "max allocation for unwrapped         ",
    maxAllocationForUnwrapped,
  );
  console.log("min allocation for wrapped           ", minAllocationForWrapped);
  console.log("max allocation for wrapped           ", maxAllocationForWrapped);
  console.log(
    "total allocation for unwrapped       ",
    totalAllocationForUnwrapped,
  );
  console.log(
    "total allocation for wrapped         ",
    totalAllocationForWrapped,
  );
  console.log("total unwrapped                      ", totalUnwrapped);
  console.log(
    "average number of unwrapped for 1 NFT",
    avgTokensForUnwrappedToGetOneMillion,
  );
  console.log("total wrapped                        ", totalWrapped);
  console.log(
    "average number of wrapped for 1 NFT  ",
    avgTokensForWrappedToGetOneMillion,
  );

  const response = new NextResponse(JSON.stringify(transformedData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export const dynamic = "force-dynamic";
