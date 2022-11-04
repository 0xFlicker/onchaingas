import { allChains, chain, Chain } from "wagmi";
import { lazySingleton } from "utils/factory";

export const infuraKey = {
  get() {
    if (!process.env.NEXT_PUBLIC_INFURA_KEY) {
      throw new Error("INFURA_KEY not set");
    }
    return process.env.NEXT_PUBLIC_INFURA_KEY;
  },
};

export const appName = {
  get() {
    if (!process.env.NEXT_PUBLIC_APP_NAME) {
      throw new Error("NEXT_PUBLIC_APP_NAME not set");
    }
    return process.env.NEXT_PUBLIC_APP_NAME;
  },
};

export const nftContractAddress = {
  get() {
    if (!process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS) {
      throw new Error("NEXT_PUBLIC_NFT_CONTRACT_ADDRESS not set");
    }
    return process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
  },
};

export const blockchainExplorerUrl = {
  get() {
    if (!process.env.NEXT_PUBLIC_BLOCK_EXPLORER) {
      throw new Error("NEXT_PUBLIC_BLOCK_EXPLORER not set");
    }
    return process.env.NEXT_PUBLIC_BLOCK_EXPLORER;
  },
};

export const supportedChains = lazySingleton(() => {
  if (!process.env.NEXT_PUBLIC_SUPPORTED_CHAINS) {
    throw new Error("SUPPORTED_CHAINS is not set");
  }
  const supportedChainNames: keyof typeof chain = JSON.parse(
    process.env.NEXT_PUBLIC_SUPPORTED_CHAINS
  );
  const chains: Chain[] = [];
  for (const chainName of supportedChainNames) {
    const wagmiChain = allChains.find(({ network }) => network === chainName);
    if (wagmiChain) {
      chains.push(wagmiChain);
    }
  }
  return chains;
});

export const defaultChain = lazySingleton(() => {
  if (!process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID) {
    throw new Error("NEXT_PUBLIC_DEFAULT_CHAIN_ID is not set");
  }
  const chainId = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID;
  const wagmiChain = allChains.find(({ id }) => id === Number(chainId));
  return wagmiChain;
});
