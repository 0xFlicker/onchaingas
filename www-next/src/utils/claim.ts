interface Item {
  tokenId: number;
  ogRank: number;
  blockHeightMinted: number;
}

interface ItemPercentage {
  tokenId: number;
  percentage: number;
}

export function allocatePercentages(
  items: Item[],
  rankFactor: number,
  ageFactor: number,
): ItemPercentage[] {
  // Find the highest and lowest ranks
  const maxRank = Math.max(...items.map((item) => item.ogRank));
  const minRank = Math.min(...items.map((item) => item.ogRank));

  // Find the highest (most recent) and lowest (oldest) block heights
  const maxBlockHeight = Math.max(
    ...items.map((item) => item.blockHeightMinted),
  );
  const minBlockHeight = Math.min(
    ...items.map((item) => item.blockHeightMinted),
  );

  // Calculate the base rank and block height weights
  const rankWeights = items.map(
    (item) =>
      rankFactor ** ((maxRank - item.ogRank) / (maxRank - minRank || 1)),
  );
  const blockHeightWeights = items.map(
    (item) =>
      ageFactor **
      ((maxBlockHeight - item.blockHeightMinted) /
        (maxBlockHeight - minBlockHeight || 1)),
  );

  // Compute the total weight per item and the sum of all weights
  const totalWeights = items.map(
    (_, index) => rankWeights[index] * blockHeightWeights[index],
  );
  const sumWeights = totalWeights.reduce((acc, weight) => acc + weight, 0);

  // Calculate the percentage each item receives based on its total weight
  return items.map((item, index) => ({
    tokenId: item.tokenId,
    percentage: totalWeights[index] / sumWeights,
  }));
}

interface ItemAllocation {
  tokenId: number;
  allocation: bigint;
}

export function allocatePool(
  items: Item[],
  rankFactor: number,
  ageFactor: number,
  pool: bigint,
): ItemAllocation[] {
  // Check if no rank or age boost is applied and set weights uniformly
  const uniformRankWeight = rankFactor === 1;
  const uniformAgeWeight = ageFactor === 1;

  // Convert factors to BigInt
  const logRankFactor = BigInt(Math.floor(Math.log(Number(rankFactor)) * 1e8)); // Scale the log for precision
  const logAgeFactor = BigInt(Math.floor(Math.log(Number(ageFactor)) * 1e8));

  // Find the highest and lowest ranks and block heights
  const maxRank = BigInt(Math.max(...items.map((item) => item.ogRank)));
  const maxBlockHeight =
    BigInt(Math.max(...items.map((item) => item.blockHeightMinted))) + 1000n; // Add 1000 to avoid division by zero

  // Calculate weights using BigInt and logarithmic scaling
  const rankWeights = items.map((item) => {
    if (uniformRankWeight) {
      return BigInt(1); // Uniform weight when rank factor is 1
    } else {
      const rankDifference = maxRank - BigInt(item.ogRank);
      return logRankFactor * rankDifference;
    }
  });

  const blockHeightWeights = items.map((item) => {
    if (uniformAgeWeight) {
      return BigInt(1); // Uniform weight when age factor is 1
    } else {
      const heightDifference = maxBlockHeight - BigInt(item.blockHeightMinted);
      return logAgeFactor * heightDifference;
    }
  });

  // Compute total weight per item and sum all weights using BigInt
  const totalWeights = items.map(
    (_, index) => rankWeights[index] * blockHeightWeights[index],
  );
  const sumWeights = totalWeights.reduce(
    (acc, weight) => acc + weight,
    BigInt(0),
  );

  // Calculate the BigInt allocation each item receives based on its weight
  return items.map((item, index) => {
    const itemWeight = totalWeights[index];
    const allocation = (itemWeight * pool) / sumWeights;
    return {
      tokenId: item.tokenId,
      allocation: allocation,
    };
  });
}
