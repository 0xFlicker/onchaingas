import { config } from "dotenv";
import { defineConfig } from "@wagmi/cli";
import { etherscan, react, foundry } from "@wagmi/cli/plugins";
import { sepolia, mainnet, base } from "wagmi/chains";

config({
  path: ".env.local",
});

export default defineConfig({
  out: "src/wagmi/index.ts",
  contracts: [],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: sepolia.id,
      contracts: [
        {
          name: "BulkMinter",
          address: {
            [sepolia.id]: "0x71E57b37b4BeA589673D0aFE1992A6457ca754b3",
          },
        },
        {
          name: "WrappedNFT",
          address: {
            [sepolia.id]: "0x9EFf37047657a0f50b989165b48012834eDB2212",
          },
        },
        {
          name: "FameSale",
          address: {
            [sepolia.id]: "0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3",
            // [base.id]: "0x2d78B13a2E735Bc96ec797A37AaF4e17C4431C83",
          },
        },
        {
          name: "FameSaleToken",
          address: {
            [sepolia.id]: "0x233A9630e1fC80688E5cc2bb988836e0D5034328",
            // [base.id]: "0xf09326082a0B360567c72b6FEd67c22Fe2f76B60",
          },
        },
      ],
    }),
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: mainnet.id,
      contracts: [
        {
          name: "OnChainGas",
          address: {
            [mainnet.id]: "0x25ec84abe25174650220b83841e0cfb39d8aab87",
          },
        },
        {
          name: "OnChainCheckGas",
          address: {
            [mainnet.id]: "0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D",
          },
        },
        {
          name: "FameLadySociety",
          address: {
            [mainnet.id]: "0x6cf4328f1ea83b5d592474f9fcdc714faafd1574",
          },
        },
        {
          name: "FameLadySquad",
          address: {
            [mainnet.id]: "0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47",
          },
        },
        {
          name: "NamedLadyRenderer",
          address: {
            [sepolia.id]: "0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a",
            [mainnet.id]: "0xC7A29659c34CB2551Aec0dc589e6450aF342bf24",
          },
        },
      ],
    }),
    foundry({
      project: "../../fame-contracts",
      include: [
        "ClaimToFame.sol/**",
        "Fame.sol/**",
        "FameMirror.sol/**",
        "IBalanceOf.sol/**",
      ],
    }),
    react(),
  ],
});
