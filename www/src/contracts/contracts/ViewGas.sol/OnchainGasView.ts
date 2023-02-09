/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface OnchainGasViewInterface extends utils.Interface {
  functions: {
    "blockGas()": FunctionFragment;
    "blockGasDiv()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "blockGas" | "blockGasDiv"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "blockGas", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "blockGasDiv",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "blockGas", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "blockGasDiv",
    data: BytesLike
  ): Result;

  events: {};
}

export interface OnchainGasView extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: OnchainGasViewInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    blockGas(overrides?: CallOverrides): Promise<[BigNumber]>;

    blockGasDiv(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  blockGas(overrides?: CallOverrides): Promise<BigNumber>;

  blockGasDiv(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    blockGas(overrides?: CallOverrides): Promise<BigNumber>;

    blockGasDiv(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    blockGas(overrides?: CallOverrides): Promise<BigNumber>;

    blockGasDiv(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    blockGas(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    blockGasDiv(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}