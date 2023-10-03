import { createClient, configureChains } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from "wagmi/connectors/injected";
import { appName, infuraKey, supportedChains } from "utils/config";
import { lazySingleton } from "utils/factory";

export const appProviders = [
  infuraProvider({
    apiKey: infuraKey.get(),
  }),
  publicProvider(),
];

export const appChains = lazySingleton(() => {
  return configureChains(supportedChains.get() as any, appProviders);
});

export type TAppConnectors =
  | MetaMaskConnector
  | WalletConnectConnector
  | CoinbaseWalletConnector
  | InjectedConnector;
export const appConnectors = lazySingleton<TAppConnectors[]>(() => {
  const { chains } = appChains.get();
  if (typeof window === "undefined") {
    return [];
  }
  return [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: appName.get(),
      },
    }),
    new InjectedConnector({ chains }),
  ];
});

export function isMetamaskConnector(connector: TAppConnectors) {
  return connector instanceof MetaMaskConnector;
}
export const metamaskConnector = lazySingleton(function metamaskConnector() {
  return appConnectors.get().find(isMetamaskConnector);
});
export function isWalletConnector(connector: TAppConnectors) {
  return connector instanceof WalletConnectConnector;
}
export const walletConnectConnector = lazySingleton(
  function walletConnectConnector() {
    return appConnectors.get().find(isWalletConnector);
  }
);
export function isCoinbaseWalletConnector(connector: TAppConnectors) {
  return connector instanceof CoinbaseWalletConnector;
}
export const coinbaseWalletConnector = lazySingleton(function coinbaseWallet() {
  return appConnectors.get().find(isCoinbaseWalletConnector);
});
export function isInjectedConnector(connector: TAppConnectors) {
  return connector instanceof InjectedConnector;
}
export const injectedConnector = lazySingleton(function injectedConnector() {
  return appConnectors.get().find(isInjectedConnector);
});

export const wagmiClient = lazySingleton(() => {
  const { provider, webSocketProvider } = appChains.get();
  return createClient({
    connectors: appConnectors.get(),
    provider,
    webSocketProvider,
  });
});
