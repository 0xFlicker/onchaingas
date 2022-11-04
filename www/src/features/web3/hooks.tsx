import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { AppDispatch, useAppDispatch, useAppSelector } from "app/store";
import { useAccount, useConnect, Chain, allChains, Connector } from "wagmi";
import {
  actions as web3Actions,
  selectors as web3Selectors,
  WalletStatus,
  WalletType,
} from "./redux";
import {
  isCoinbaseWalletConnector,
  isInjectedConnector,
  isMetamaskConnector,
  isWalletConnector,
  TAppConnectors,
} from "./wagmi";

export type TChain = Chain & {
  chainImageUrl: string;
};
export function decorateChainImageUrl(chain: Chain): TChain {
  let chainImageUrl = "/chains/unknown.png";
  switch (chain?.id) {
    case 1:
      chainImageUrl = "/chains/homestead.png";
      break;
    case 111_55_111:
      chainImageUrl = "/chains/sepolia.png";
      break;
  }
  return {
    ...chain,
    chainImageUrl,
  };
}

function createOnConnectionChanged(
  dispatch: AppDispatch,
  connector: Connector
) {
  const c = connector as TAppConnectors;

  if (isMetamaskConnector(c)) {
    dispatch(web3Actions.walletConnected(WalletType.METAMASK));
  } else if (isWalletConnector(c)) {
    dispatch(web3Actions.walletConnected(WalletType.WALLET_CONNECT));
  } else if (isCoinbaseWalletConnector(c)) {
    dispatch(web3Actions.walletConnected(WalletType.COINBASE_WALLET));
  } else if (isInjectedConnector(c)) {
    dispatch(web3Actions.walletConnected(WalletType.INJECTED));
  } else {
    dispatch(web3Actions.connected());
  }
}

export function useWeb3Context() {
  const dispatch = useAppDispatch();
  const chainId = useAppSelector(web3Selectors.currentChainId);
  const walletPendingType = useAppSelector(web3Selectors.pendingType);
  const walletStatus = useAppSelector(web3Selectors.status);
  const chain = useMemo<TChain | null>(() => {
    const c = chainId && allChains.find((chain) => chain.id === chainId);
    if (c) {
      return decorateChainImageUrl(c);
    }
    return null;
  }, [chainId]);
  const {
    connector: activeConnector,
    isConnected,
    address,
  } = useAccount({
    onConnect: ({ address, connector }) => {
      createOnConnectionChanged(dispatch, connector);
      dispatch(web3Actions.setAccounts([address]));
    },
    onDisconnect: () => {
      dispatch(web3Actions.disconnected());
    },
  });

  const {
    connect,
    error,
    isLoading,
    pendingConnector,
    connectors,
    reset,
    data: provider,
  } = useConnect({
    onSettled: ({ connector: c }) => {},
  });
  useEffect(() => {
    if (address) {
      dispatch(web3Actions.setAccounts([address]));
    }
  }, [address, dispatch]);
  useEffect(() => {
    if (walletStatus === WalletStatus.RESET) {
      reset();
    }
  }, [walletStatus, reset]);
  useEffect(() => {
    if (connectors.length && walletPendingType) {
      const connector = connectors.find((c) => {
        switch (walletPendingType) {
          case WalletType.METAMASK:
            return isMetamaskConnector(c as TAppConnectors);
          case WalletType.WALLET_CONNECT:
            return isWalletConnector(c as TAppConnectors);
          case WalletType.COINBASE_WALLET:
            return isCoinbaseWalletConnector(c as TAppConnectors);
          default:
            return isInjectedConnector(c as TAppConnectors);
        }
      });
      if (connector) {
        connect({
          connector,
          chainId,
        });
      }
    }
  }, [connectors, connect, chainId, walletPendingType]);

  useEffect(() => {
    if (activeConnector) {
      activeConnector.getChainId().then((chainId) => {
        dispatch(web3Actions.setChainId(chainId));
      });
    }
  }, [activeConnector, dispatch]);

  const result = {
    currentChain: chain,
    provider: provider?.provider,
    selectedAddress: address,
    connect,
    activeConnector,
    isConnected,
    isLoading,
  };
  return result;
}

type TContext = ReturnType<typeof useWeb3Context>;
const Web3Provider = createContext<TContext | null>(null);

export const Provider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const context = useWeb3Context();
  return (
    <Web3Provider.Provider value={context}>{children}</Web3Provider.Provider>
  );
};

export function useWeb3() {
  const context = useContext(Web3Provider);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
}
