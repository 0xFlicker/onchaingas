import { FC, PropsWithChildren, useEffect, useMemo } from "react";
import * as Sentry from "@sentry/nextjs";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import flsTheme from "@/theme";
import { Web3Provider, baseSepolia, mainnetSepolia } from "./Wagmi";
import { NotificationsProvider } from "@/features/notifications/Context";
import { Notifications } from "@/features/notifications/Notifications";
import { useAccount, useEnsName } from "wagmi";
import { Chain, Transport } from "viem";

const Config: FC<PropsWithChildren> = ({ children }) => {
  const { address, chain } = useAccount();
  const { data: ensName } = useEnsName({ address });

  useEffect(() => {
    if (address) {
      Sentry.setUser({ id: address, chain: chain?.name, ens: ensName });
    } else {
      Sentry.setUser(null);
    }
  }, [address, chain?.name, ensName]);
  return <>{children}</>;
};

export const DefaultProvider: FC<
  PropsWithChildren<{ siwe?: boolean; mainnet?: boolean; base?: boolean }>
> = ({ siwe, children, mainnet, base }) => {
  const chains = useMemo<readonly [Chain, ...Chain[]]>(() => {
    const chainSet = new Set<Chain>();
    if (mainnet) {
      for (const chain of mainnetSepolia.chains) {
        chainSet.add(chain);
      }
    }
    if (base) {
      for (const chain of baseSepolia.chains) {
        chainSet.add(chain);
      }
    }
    return Array.from(chainSet) as [Chain, ...Chain[]];
  }, [mainnet, base]);

  const transports = useMemo(() => {
    const transportMap: Record<number, Transport> = {};
    if (mainnet) {
      for (const [chainId, transport] of Object.entries(
        mainnetSepolia.transports,
      )) {
        transportMap[Number(chainId)] = transport;
      }
    }
    if (base) {
      for (const [chainId, transport] of Object.entries(
        baseSepolia.transports,
      )) {
        transportMap[Number(chainId)] = transport;
      }
    }
    return transportMap;
  }, [mainnet, base]);

  return (
    <ThemeProvider theme={flsTheme}>
      <CssBaseline />
      <Web3Provider siwe={siwe} chains={chains} transports={transports}>
        <NotificationsProvider>
          <Config>{children}</Config>
          <Notifications />
        </NotificationsProvider>
      </Web3Provider>
    </ThemeProvider>
  );
};
