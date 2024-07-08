import { base, sepolia } from "viem/chains";

export function claimToFameFromNetwork(
  chainId: typeof sepolia.id | typeof base.id
) {
  switch (chainId) {
    case sepolia.id:
      return "0x4b455Cf06719515bb73b94647a6b56e7924B756e" as const;
    case base.id:
      return "0x4b455Cf06719515bb73b94647a6b56e7924B756e" as const;
  }
}
