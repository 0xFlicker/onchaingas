/**
 * turn into 0x[chartsToKeep]...[charsToKeep]
 * @param hash
 * @param charsToKeep
 */
export function shortenHash(hash: string, charsToKeep: number) {
  return `0x${hash.slice(2, charsToKeep + 2)}...${hash.slice(-charsToKeep)}`;
}
