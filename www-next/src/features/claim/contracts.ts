import { base, sepolia } from "viem/chains";

export function claimToFameFromNetwork(
  chainId: typeof sepolia.id | typeof base.id
) {
  switch (chainId) {
    case sepolia.id:
      return "0x4b455Cf06719515bb73b94647a6b56e7924B756e" as const;
    case base.id:
      return "0xF2844803aA31d195291F8a94c76D83aedd4C5d57" as const;
  }
}
