import { Chain, mainnet, goerli, sepolia } from "@wagmi/chains";
import { lazySingleton } from "utils/factory";

export const supportedAppChains = [
  mainnet,
  goerli,
  sepolia,
  {
    id: 8453,
    network: "base",
    name: "Base",
    nativeCurrency: { name: "Base", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: {
        http: ["https://mainnet.base.org"],
      },
      public: {
        http: ["https://mainnet.base.org"],
      },
    },
    blockExplorers: {
      blockscout: {
        name: "Basescout",
        url: "https://base.blockscout.com",
      },
      default: {
        name: "Basescan",
        url: "https://basescan.org",
      },
      etherscan: {
        name: "Basescan",
        url: "https://basescan.org",
      },
    },
    contracts: {
      multicall3: {
        address: "0xca11bde05977b3631167028862be2a173976ca11",
        blockCreated: 5022,
      },
    },
  } as Chain,
] as const;

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

export const nftOnChainGasContractAddress = {
  get() {
    if (!process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS) {
      throw new Error("NEXT_PUBLIC_NFT_CONTRACT_ADDRESS not set");
    }
    return process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`;
  },
};

export const nftOnChainCheckContractAddress = {
  get() {
    if (!process.env.NEXT_PUBLIC_NFT_CHECK_CONTRACT_ADDRESS) {
      throw new Error("NEXT_PUBLIC_NFT_CHECK_CONTRACT_ADDRESS not set");
    }
    return process.env.NEXT_PUBLIC_NFT_CHECK_CONTRACT_ADDRESS as `0x${string}`;
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
  return supportedAppChains;
});

export const defaultChain = lazySingleton(() => {
  if (!process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID) {
    throw new Error("NEXT_PUBLIC_DEFAULT_CHAIN_ID is not set");
  }
  const chainId = process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID;
  const wagmiChain = supportedChains
    .get()
    .find(({ id }) => id === Number(chainId));
  return wagmiChain;
});
