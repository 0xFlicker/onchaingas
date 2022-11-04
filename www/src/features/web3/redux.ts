import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { utils } from "ethers";
import { defaultChain } from "utils/config";

export enum WalletType {
  NONE = "NONE",
  METAMASK = "METAMASK",
  WALLET_CONNECT = "WALLET_CONNECT",
  COINBASE_WALLET = "COINBASE_WALLET",
  INJECTED = "INJECTED",
}

export enum WalletStatus {
  UNKNOWN = "UNKNOWN",
  IDLE = "IDLE",
  INIT = "INIT",
  CONNECTED = "CONNECTED",
  SIGNED_IN = "SIGNED_IN",
  DISCONNECTED = "DISCONNECTED",
  WRONG_NETWORK = "WRONG_NETWORK",
  SWITCH_CHAIN = "SWITCH_CHAIN",
  ERROR = "ERROR",
  RESET = "RESET",
}

export interface IState {
  walletType: WalletType;
  pendingWalletType?: WalletType;
  status: WalletStatus;
  isWalletSelectModalOpen: boolean;
  accounts: string[];
  currentChainId: number;
  pendingChainId?: number;
  error?: {
    message: string;
    name: string;
    stack?: string;
  };
}

const initialState: IState = {
  walletType: WalletType.NONE,
  status: WalletStatus.UNKNOWN,
  isWalletSelectModalOpen: false,
  accounts: [],
  currentChainId: defaultChain.get().id,
};

const slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    reset(state) {
      state.walletType = WalletType.NONE;
      state.pendingWalletType = undefined;
      state.status = WalletStatus.RESET;
      state.isWalletSelectModalOpen = false;
      state.error = undefined;
      state.accounts = [];
    },
    openWalletSelectModal(state) {
      state.isWalletSelectModalOpen = true;
    },
    closeWalletSelectModal(state) {
      state.isWalletSelectModalOpen = false;
    },
    walletPending(state, action: PayloadAction<WalletType>) {
      if (state.walletType !== action.payload) {
        state.pendingWalletType = action.payload;
        state.status = WalletStatus.INIT;
      }
    },
    walletConnected(state, action: PayloadAction<WalletType>) {
      state.walletType = action.payload;
      state.pendingWalletType = undefined;
      state.status = WalletStatus.CONNECTED;
    },
    idle(state) {
      state.status = WalletStatus.IDLE;
    },
    init(state) {
      state.status = WalletStatus.INIT;
    },
    connected(state) {
      state.status = WalletStatus.CONNECTED;
      state.pendingWalletType = undefined;
    },
    signedIn(state) {
      state.status = WalletStatus.SIGNED_IN;
    },
    disconnected(state) {
      state.status = WalletStatus.DISCONNECTED;
    },
    wrongNetwork(state) {
      state.status = WalletStatus.WRONG_NETWORK;
    },
    switchChain(state) {
      state.status = WalletStatus.SWITCH_CHAIN;
    },
    error(
      state: IState,
      action: PayloadAction<{
        message: string;
        name: string;
        stack?: string;
      }>
    ) {
      state.status = WalletStatus.ERROR;
      state.error = {
        message: action.payload.message,
        name: action.payload.name,
        stack: action.payload.stack,
      };
    },
    setAccounts(state, action: PayloadAction<string[]>) {
      state.accounts = action.payload.map(utils.getAddress);
    },
    switchToChain(state, action: PayloadAction<number>) {
      state.pendingChainId = action.payload;
    },
    setChainId(state, action: PayloadAction<number>) {
      state.currentChainId = action.payload;
      state.pendingChainId = undefined;
    },
  },
});

const selectRoot = (state: { web3: IState }) => state.web3;
const selectIsWalletSelectModalOpen = createSelector(
  selectRoot,
  (state) => state.isWalletSelectModalOpen
);
const selectWalletType = createSelector(
  selectRoot,
  (state) => state.walletType
);
const selectPendingWalletType = createSelector(
  selectRoot,
  (state) => state.pendingWalletType
);
const selectWalletStatus = createSelector(selectRoot, (state) => state.status);
const selectIsWrongNetwork = createSelector(
  selectWalletStatus,
  (state) => state === WalletStatus.WRONG_NETWORK
);
const selectIsConnected = createSelector(
  selectWalletStatus,
  (state) => state === WalletStatus.CONNECTED
);
const selectAddress = createSelector(
  selectRoot,
  (state) =>
    state.accounts &&
    (state.accounts.length > 0 ? state.accounts[0] : undefined)
);
const selectCurrentChainId = createSelector(
  selectRoot,
  (state) => state.currentChainId
);
const selectPendingChainId = createSelector(
  selectRoot,
  (state) => state.pendingChainId
);

export const selectors = {
  isWalletSelectModalOpen: selectIsWalletSelectModalOpen,
  isWrongNetwork: selectIsWrongNetwork,
  isConnected: selectIsConnected,
  type: selectWalletType,
  pendingType: selectPendingWalletType,
  status: selectWalletStatus,
  address: selectAddress,
  currentChainId: selectCurrentChainId,
  pendingChainId: selectPendingChainId,
};

export const { actions, reducer } = slice;
