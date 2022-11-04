import { FC, PropsWithChildren, useMemo } from "react";
import { WagmiConfig } from "wagmi";
import { Provider as Web3Provider } from "./hooks";
import { wagmiClient } from "./wagmi";

const ProviderWithWagmi: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <Web3Provider>{children}</Web3Provider>;
};
export const Provider: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient.get()}>
      <ProviderWithWagmi>{children}</ProviderWithWagmi>
    </WagmiConfig>
  );
};
