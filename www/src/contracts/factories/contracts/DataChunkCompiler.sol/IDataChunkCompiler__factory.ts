/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IDataChunkCompiler,
  IDataChunkCompilerInterface,
} from "../../../contracts/DataChunkCompiler.sol/IDataChunkCompiler";

const _abi = [
  {
    inputs: [],
    name: "BEGIN_JSON",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "bool",
        name: "omitQuotes",
        type: "bool",
      },
    ],
    name: "BEGIN_METADATA_VAR",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "BEGIN_SCRIPT",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BEGIN_SCRIPT_DATA",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BEGIN_SCRIPT_DATA_COMPRESSED",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "END_JSON",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "omitQuotes",
        type: "bool",
      },
    ],
    name: "END_METADATA_VAR",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "END_SCRIPT",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "END_SCRIPT_DATA",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "END_SCRIPT_DATA_COMPRESSED",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "HTML_HEAD",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        internalType: "bool",
        name: "omitQuotes",
        type: "bool",
      },
    ],
    name: "SCRIPT_VAR",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "chunk1",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk2",
        type: "address",
      },
    ],
    name: "compile2",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "chunk1",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk2",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk3",
        type: "address",
      },
    ],
    name: "compile3",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "chunk1",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk2",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk3",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk4",
        type: "address",
      },
    ],
    name: "compile4",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "chunk1",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk2",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk3",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk4",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk5",
        type: "address",
      },
    ],
    name: "compile5",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "chunk1",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk2",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk3",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk4",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk5",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk6",
        type: "address",
      },
    ],
    name: "compile6",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "chunk1",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk2",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk3",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk4",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk5",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk6",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk7",
        type: "address",
      },
    ],
    name: "compile7",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "chunk1",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk2",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk3",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk4",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk5",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk6",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk7",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk8",
        type: "address",
      },
    ],
    name: "compile8",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "chunk1",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk2",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk3",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk4",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk5",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk6",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk7",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk8",
        type: "address",
      },
      {
        internalType: "address",
        name: "chunk9",
        type: "address",
      },
    ],
    name: "compile9",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IDataChunkCompiler__factory {
  static readonly abi = _abi;
  static createInterface(): IDataChunkCompilerInterface {
    return new utils.Interface(_abi) as IDataChunkCompilerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IDataChunkCompiler {
    return new Contract(address, _abi, signerOrProvider) as IDataChunkCompiler;
  }
}
