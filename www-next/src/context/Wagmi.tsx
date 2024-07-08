"use client";
import { siweClient } from "@/utils/siweClient";
import { SIWEConfig, SIWESession } from "connectkit";
import { WagmiProvider, createConfig, fallback, http } from "wagmi";
import { base, mainnet, sepolia, polygon as polygonChain } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren, useMemo } from "react";
import { SiweMessage } from "siwe";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { Chain, Transport } from "viem";
import { SerializedSession } from "@/service/session";

export const mainnetSepolia = {
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
    ),
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
    ),
  },
} as const;

export const baseSepolia = {
  chains: [base, sepolia],
  transports: {
    [base.id]: fallback([
      http(process.env.NEXT_PUBLIC_BASE_RPC_URL_1!, {
        batch: true,
      }),
      http(process.env.NEXT_PUBLIC_BASE_RPC_URL_2!, {
        batch: true,
      }),
    ]),
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
    ),
  },
} as const;

export const polygonOnly = {
  chains: [polygonChain],
  transports: {
    [polygonChain.id]: fallback([
      http(process.env.NEXT_PUBLIC_POLYGON_RPC_URL_1!, {
        batch: true,
      }),
      http(process.env.NEXT_PUBLIC_POLYGON_RPC_URL_2!, {
        batch: true,
      }),
    ]),
  },
} as const;

const SIWE_API_PATH = "/siwe";

export const defaultConfig = {
  ...mainnetSepolia,
  // Required API Keys
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  multiInjectedProviderDiscovery: true,

  // Required App Info
  appName: "Fame Lady Society",

  // Optional App Info
  appDescription: "The good place",
  appUrl: "https://www.fameladysociety.com", // your app's url
  appIcon: "https://www.fameladysociety.com/images/fame/bala.png",

  ssr: true,
};

const siweConfig = {
  getNonce: async () => {
    const res = await fetch(SIWE_API_PATH, { method: "PUT" });
    if (!res.ok) throw new Error("Failed to fetch SIWE nonce");
    return res.text();
  },
  createMessage: ({ nonce, address, chainId }) => {
    return new SiweMessage({
      nonce,
      chainId,
      address,
      version: "1",
      uri: window.location.origin,
      domain: window.location.host,
      statement: "Sign In With Ethereum to prove you control this wallet.",
    }).prepareMessage();
  },
  verifyMessage: async ({ message, signature }) => {
    const res = await fetch(SIWE_API_PATH, {
      method: "POST",
      body: JSON.stringify({ message, signature }),
      headers: { "Content-Type": "application/json" },
    });
    return res.ok;
  },
  getSession: async () => {
    const res = await fetch(SIWE_API_PATH);
    if (!res.ok) throw new Error("Failed to fetch SIWE session");
    const { address, chainId } = (await res.json()) as SerializedSession;
    return address && chainId ? { address, chainId } : null;
  },
  signOut: async () => {
    const res = await fetch(SIWE_API_PATH, { method: "DELETE" });
    return res.ok;
  },
} as SIWEConfig;

const queryClient = new QueryClient();

export const Web3Provider: FC<
  PropsWithChildren<{
    siwe?: boolean;
    transports?: Record<number, Transport>;
    chains: readonly [Chain, ...Chain[]];
  }>
> = ({ children, siwe = false, transports, chains }) => {
  const config = useMemo(
    () =>
      createConfig(
        getDefaultConfig({
          ...defaultConfig,
          ...(chains && chains.length && { chains }),
          ...(transports && { transports }),
        })
      ),
    [chains, transports]
  );
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <siweClient.Provider
          enabled={siwe}
          nonceRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
          sessionRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
          signOutOnDisconnect={true} // defaults true
          signOutOnAccountChange={true} // defaults true
          signOutOnNetworkChange={true} // defaults true
          {...siweConfig}
        >
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </siweClient.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
