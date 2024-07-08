import {
  fameSaleAddress as sepoliaFameSaleAddress,
  fameSaleTokenAddress as sepoliaFameSaleTokenAddress,
} from "@/wagmi";
import { base, sepolia } from "viem/chains";

export function fameSaleAddress(chainId: typeof sepolia.id | typeof base.id) {
  return chainId === 11155111
    ? sepoliaFameSaleAddress[chainId]
    : "0x2d78B13a2E735Bc96ec797A37AaF4e17C4431C83";
}

export function fameSaleTokenAddress(
  chainId: typeof sepolia.id | typeof base.id,
) {
  return chainId === 11155111
    ? sepoliaFameSaleTokenAddress[chainId]
    : "0xf09326082a0B360567c72b6FEd67c22Fe2f76B60";
}

export function fameFromNetwork(chainId: typeof sepolia.id | typeof base.id) {
  switch (chainId) {
    case sepolia.id:
      return "0x59affac6818b58324487be3c8b49cf1de1224928" as const;
    case base.id:
      return "0x59affac6818b58324487be3c8b49cf1de1224928" as const;
  }
}
