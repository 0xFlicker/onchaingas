/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  OnchainGasView,
  OnchainGasViewInterface,
} from "../../../contracts/ViewGas.sol/OnchainGasView";

const _abi = [
  {
    inputs: [],
    name: "blockGas",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "blockGasDiv",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060d78061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80636fce7887146037578063bfa07fa314604f575b600080fd5b603d6054565b60405190815260200160405180910390f35b48603d565b60006062633b9aca00486067565b905090565b600082609c577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b50049056fea26469706673582212200a7da6a814ab464e2fa0a442aa80d7935362f9e7a4411559bc038ae791c3a88164736f6c63430008100033";

type OnchainGasViewConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OnchainGasViewConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OnchainGasView__factory extends ContractFactory {
  constructor(...args: OnchainGasViewConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OnchainGasView> {
    return super.deploy(overrides || {}) as Promise<OnchainGasView>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): OnchainGasView {
    return super.attach(address) as OnchainGasView;
  }
  override connect(signer: Signer): OnchainGasView__factory {
    return super.connect(signer) as OnchainGasView__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OnchainGasViewInterface {
    return new utils.Interface(_abi) as OnchainGasViewInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OnchainGasView {
    return new Contract(address, _abi, signerOrProvider) as OnchainGasView;
  }
}