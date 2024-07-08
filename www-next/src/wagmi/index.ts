import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BulkMinter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const bulkMinterAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'uri', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'ApprovalCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'ApprovalQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
  { type: 'error', inputs: [], name: 'InvalidQueryRange' },
  { type: 'error', inputs: [], name: 'MintERC2309QuantityExceedsLimit' },
  { type: 'error', inputs: [], name: 'MintToZeroAddress' },
  { type: 'error', inputs: [], name: 'MintZeroQuantity' },
  { type: 'error', inputs: [], name: 'NotCompatibleWithSpotMints' },
  { type: 'error', inputs: [], name: 'OwnerQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'OwnershipNotInitializedForExtraData' },
  { type: 'error', inputs: [], name: 'SequentialMintExceedsLimit' },
  { type: 'error', inputs: [], name: 'SequentialUpToTooSmall' },
  { type: 'error', inputs: [], name: 'SpotMintTokenIdTooSmall' },
  { type: 'error', inputs: [], name: 'TokenAlreadyExists' },
  { type: 'error', inputs: [], name: 'TransferCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
  { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
  { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
  { type: 'error', inputs: [], name: 'URIQueryForNonexistentToken' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'ConsecutiveTransfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_SUPPLY',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'explicitOwnershipOf',
    outputs: [
      {
        name: 'ownership',
        internalType: 'struct IERC721A.TokenOwnership',
        type: 'tuple',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'burned', internalType: 'bool', type: 'bool' },
          { name: 'extraData', internalType: 'uint24', type: 'uint24' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'explicitOwnershipsOf',
    outputs: [
      {
        name: '',
        internalType: 'struct IERC721A.TokenOwnership[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'burned', internalType: 'bool', type: 'bool' },
          { name: 'extraData', internalType: 'uint24', type: 'uint24' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastMintedTokenId',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'count', internalType: 'uint128', type: 'uint128' }],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'tokensOfOwner',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'stop', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokensOfOwnerIn',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const bulkMinterAddress = {
  11155111: '0x71E57b37b4BeA589673D0aFE1992A6457ca754b3',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const bulkMinterConfig = {
  address: bulkMinterAddress,
  abi: bulkMinterAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ClaimToFame
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const claimToFameAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_fameToken', internalType: 'address', type: 'address' },
      { name: '_signer', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cancelOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'packedTokenIds', internalType: 'bytes', type: 'bytes' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'claimWithData',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenIds', internalType: 'uint16[]', type: 'uint16[]' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'claimWithTokens',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pendingOwner', internalType: 'address', type: 'address' },
    ],
    name: 'completeOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fameToken',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'generatePackedData',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'packedData', internalType: 'bytes', type: 'bytes' }],
    name: 'generateTokenIds',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'grantRoles',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hasAllRoles',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hasAnyRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'packedTokenIds', internalType: 'bytes', type: 'bytes' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hashClaimDataRequest',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenIds', internalType: 'uint16[]', type: 'uint16[]' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hashClaimTokensRequest',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isClaimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'isClaimedBatch',
    outputs: [{ name: '', internalType: 'bool[]', type: 'bool[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: 'result', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pendingOwner', internalType: 'address', type: 'address' },
    ],
    name: 'ownershipHandoverExpiresAt',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'tokenIds', internalType: 'uint16[]', type: 'uint16[]' },
    ],
    name: 'primeClaim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'packedTokenIds', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'primeClaimWithData',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'roles', internalType: 'uint256', type: 'uint256' }],
    name: 'renounceRoles',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'requestOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeRoles',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'roleClaimPrimer',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'roleSigner',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'roleTreasurer',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'rolesOf',
    outputs: [{ name: 'roles', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_signer', internalType: 'address', type: 'address' }],
    name: 'setSigner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'signatureNonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'packedTokenIds', internalType: 'bytes', type: 'bytes' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verifyClaimDataRequest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'contractAddress', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenIds', internalType: 'uint16[]', type: 'uint16[]' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'verifyClaimTokensRequest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawErc20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdrawEth',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pendingOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipHandoverCanceled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pendingOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipHandoverRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'roles',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'RolesUpdated',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'AlreadyCalimed',
  },
  { type: 'error', inputs: [], name: 'AlreadyInitialized' },
  { type: 'error', inputs: [], name: 'InvalidSignature' },
  { type: 'error', inputs: [], name: 'NewOwnerIsZeroAddress' },
  { type: 'error', inputs: [], name: 'NoHandoverRequest' },
  { type: 'error', inputs: [], name: 'PastDeadline' },
  { type: 'error', inputs: [], name: 'Unauthorized' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fame
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fameAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
      { name: 'claimToFameAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'fallback', stateMutability: 'payable' },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'burnedPoolManager',
    outputs: [
      {
        name: '',
        internalType: 'contract IBurnedPoolManager',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cancelOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pendingOwner', internalType: 'address', type: 'address' },
    ],
    name: 'completeOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'fromTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'toTokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'emitBatchMetadataUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'emitMetadataUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fameMirror',
    outputs: [
      { name: '', internalType: 'contract FameMirror', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'getSkipNFT',
    outputs: [{ name: 'result', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'grantRoles',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hasAllRoles',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hasAnyRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'launchPublic',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'mirrorERC721',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: 'result', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pendingOwner', internalType: 'address', type: 'address' },
    ],
    name: 'ownershipHandoverExpiresAt',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renderer',
    outputs: [
      {
        name: '',
        internalType: 'contract ITokenURIGenerator',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'roles', internalType: 'uint256', type: 'uint256' }],
    name: 'renounceRoles',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'requestOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeRoles',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'rolesOf',
    outputs: [{ name: 'roles', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'baseURI_', internalType: 'string', type: 'string' }],
    name: 'setBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newBurnedPoolManager',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'setBurnedPoolManager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newRenderer', internalType: 'address', type: 'address' }],
    name: 'setRenderer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'skipNFT', internalType: 'bool', type: 'bool' }],
    name: 'setSkipNFT',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'skip', internalType: 'bool', type: 'bool' },
    ],
    name: 'setSkipNftForAccount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pendingOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipHandoverCanceled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pendingOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipHandoverRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'roles',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'RolesUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'status', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'SkipNFTSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  { type: 'error', inputs: [], name: 'AlreadyInitialized' },
  { type: 'error', inputs: [], name: 'AlreadyLaunched' },
  { type: 'error', inputs: [], name: 'ApprovalCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'DNAlreadyInitialized' },
  { type: 'error', inputs: [], name: 'DNNotInitialized' },
  { type: 'error', inputs: [], name: 'FnSelectorNotRecognized' },
  { type: 'error', inputs: [], name: 'InsufficientAllowance' },
  { type: 'error', inputs: [], name: 'InsufficientBalance' },
  { type: 'error', inputs: [], name: 'InvalidUnit' },
  { type: 'error', inputs: [], name: 'LinkMirrorContractFailed' },
  { type: 'error', inputs: [], name: 'MirrorAddressIsZero' },
  { type: 'error', inputs: [], name: 'NewOwnerIsZeroAddress' },
  { type: 'error', inputs: [], name: 'NoHandoverRequest' },
  { type: 'error', inputs: [], name: 'NoTransferWhenStaked' },
  { type: 'error', inputs: [], name: 'NotLaunched' },
  { type: 'error', inputs: [], name: 'SenderNotMirror' },
  { type: 'error', inputs: [], name: 'TokenDoesNotExist' },
  { type: 'error', inputs: [], name: 'TotalSupplyOverflow' },
  { type: 'error', inputs: [], name: 'TransferCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
  { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
  { type: 'error', inputs: [], name: 'Unauthorized' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FameLadySociety
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const fameLadySocietyAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'nftContract', internalType: 'address', type: 'address' },
      { name: 'tokenRenderer', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'DevTipFailed' },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'MustOwnToken',
  },
  { type: 'error', inputs: [], name: 'MustWrapOneToken' },
  { type: 'error', inputs: [], name: 'NoContractUri' },
  {
    type: 'error',
    inputs: [{ name: 'required', internalType: 'uint256', type: 'uint256' }],
    name: 'NotEnoughEther',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'OperatorNotAllowed',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'TokenNotWrapped',
  },
  { type: 'error', inputs: [], name: 'WithdrawFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'EMIT_METADATA_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'OPERATOR_FILTER_REGISTRY',
    outputs: [
      {
        name: '',
        internalType: 'contract IOperatorFilterRegistry',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'TREASURER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPDATE_RENDERER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'claimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'contractURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultRoyaltyInfo',
    outputs: [
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'royaltyFraction', internalType: 'uint96', type: 'uint96' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'emitMetadataUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'isWrapped',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renderer',
    outputs: [
      {
        name: '',
        internalType: 'contract ITokenURIGenerator',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '_salePrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'royaltyInfo',
    outputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: 'royaltyAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'uri', internalType: 'string', type: 'string' }],
    name: 'setContractURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'feeNumerator', internalType: 'uint96', type: 'uint96' },
    ],
    name: 'setDefaultRoyalty',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newRenderer', internalType: 'address', type: 'address' }],
    name: 'setRenderer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'cost', internalType: 'uint256', type: 'uint256' }],
    name: 'setWrapCost',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'unwrap',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'unwrapMany',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'wrap',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'wrapCost',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'wrapTo',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'wrappedNft',
    outputs: [{ name: '', internalType: 'contract IERC721', type: 'address' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const fameLadySocietyAddress = {
  1: '0x6cF4328f1Ea83B5d592474F9fCDC714FAAfd1574',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const fameLadySocietyConfig = {
  address: fameLadySocietyAddress,
  abi: fameLadySocietyAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FameLadySquad
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const fameLadySquadAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'baseURI', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_LADY_SUPPLY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'SALE_START_TIMESTAMP',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'baseURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'baseURI', internalType: 'string', type: 'string' }],
    name: 'changeBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'getNFTPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'numberOfLadies', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mintLady',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const fameLadySquadAddress = {
  1: '0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const fameLadySquadConfig = {
  address: fameLadySquadAddress,
  abi: fameLadySquadAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FameMirror
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fameMirrorAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  { type: 'fallback', stateMutability: 'payable' },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'nftOwner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'baseERC20',
    outputs: [{ name: 'base', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'fromTokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'toTokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'emitBatchMetadataUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'emitMetadataUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'nftOwner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerAt',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pullOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: 'result', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'isApproved',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  { type: 'error', inputs: [], name: 'AlreadyLinked' },
  { type: 'error', inputs: [], name: 'FnSelectorNotRecognized' },
  { type: 'error', inputs: [], name: 'NotLinked' },
  { type: 'error', inputs: [], name: 'OnlyERC20CanCall' },
  { type: 'error', inputs: [], name: 'SenderNotBase' },
  { type: 'error', inputs: [], name: 'SenderNotDeployer' },
  { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FameSale
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const fameSaleAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'error', inputs: [], name: 'AlreadyInitialized' },
  { type: 'error', inputs: [], name: 'MaxBuyExceeded' },
  { type: 'error', inputs: [], name: 'MaxRaisedExceeded' },
  { type: 'error', inputs: [], name: 'NewOwnerIsZeroAddress' },
  { type: 'error', inputs: [], name: 'NoFundsAvailable' },
  { type: 'error', inputs: [], name: 'NoHandoverRequest' },
  { type: 'error', inputs: [], name: 'NoRefundAvailable' },
  { type: 'error', inputs: [], name: 'NotAllowed' },
  { type: 'error', inputs: [], name: 'Paused' },
  { type: 'error', inputs: [], name: 'Unauthorized' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pendingOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipHandoverCanceled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pendingOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipHandoverRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'roles',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'RolesUpdated',
  },
  {
    type: 'function',
    inputs: [
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'buy',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'proof', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: 'check', internalType: 'address', type: 'address' },
    ],
    name: 'canProve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cancelOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pendingOwner', internalType: 'address', type: 'address' },
    ],
    name: 'completeOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'fameBalanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fameSaleToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fameTotalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'grantRoles',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hasAllRoles',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hasAnyRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isPaused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxBuy',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxRaise',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'merkleRoot',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: 'result', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pendingOwner', internalType: 'address', type: 'address' },
    ],
    name: 'ownershipHandoverExpiresAt',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'raiseRemaining',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'refund',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'roles', internalType: 'uint256', type: 'uint256' }],
    name: 'renounceRoles',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'requestOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeRoles',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'roleAllowlist',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'roleExecutive',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'roleTreasurer',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'rolesOf',
    outputs: [{ name: 'roles', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_maxBuy', internalType: 'uint256', type: 'uint256' }],
    name: 'setMaxBuy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_maxRaise', internalType: 'uint256', type: 'uint256' }],
    name: 'setMaxRaise',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_merkleRoot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'setMerkleRoot',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const fameSaleAddress = {
  11155111: '0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const fameSaleConfig = {
  address: fameSaleAddress,
  abi: fameSaleAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FameSaleToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const fameSaleTokenAbi = [
  {
    type: 'constructor',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'AllowanceOverflow' },
  { type: 'error', inputs: [], name: 'AllowanceUnderflow' },
  { type: 'error', inputs: [], name: 'AlreadyInitialized' },
  { type: 'error', inputs: [], name: 'InsufficientAllowance' },
  { type: 'error', inputs: [], name: 'InsufficientBalance' },
  { type: 'error', inputs: [], name: 'InvalidPermit' },
  { type: 'error', inputs: [], name: 'NewOwnerIsZeroAddress' },
  { type: 'error', inputs: [], name: 'NoHandoverRequest' },
  { type: 'error', inputs: [], name: 'PermitExpired' },
  { type: 'error', inputs: [], name: 'TotalSupplyOverflow' },
  { type: 'error', inputs: [], name: 'Unauthorized' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pendingOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipHandoverCanceled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pendingOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipHandoverRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'roles',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'RolesUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: 'result', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cancelOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pendingOwner', internalType: 'address', type: 'address' },
    ],
    name: 'completeOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'grantRoles',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hasAllRoles',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hasAnyRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'hasHolder',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'holders',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: 'result', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pendingOwner', internalType: 'address', type: 'address' },
    ],
    name: 'ownershipHandoverExpiresAt',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'roles', internalType: 'uint256', type: 'uint256' }],
    name: 'renounceRoles',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'requestOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeRoles',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'roleBurner',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'roleController',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'roleMinter',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'rolesOf',
    outputs: [{ name: 'roles', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'payable',
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const fameSaleTokenAddress = {
  11155111: '0x233A9630e1fC80688E5cc2bb988836e0D5034328',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const fameSaleTokenConfig = {
  address: fameSaleTokenAddress,
  abi: fameSaleTokenAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IBalanceOf
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iBalanceOfAbi = [
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NamedLadyRenderer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const namedLadyRendererAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_baseURI', internalType: 'string', type: 'string' },
      { name: 'emitableNft', internalType: 'address', type: 'address' },
      { name: '_signer', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'AlreadyInitialized' },
  { type: 'error', inputs: [], name: 'InvalidSignature' },
  { type: 'error', inputs: [], name: 'NewOwnerIsZeroAddress' },
  { type: 'error', inputs: [], name: 'NoHandoverRequest' },
  { type: 'error', inputs: [], name: 'NotTokenOwnerOrApproved' },
  { type: 'error', inputs: [], name: 'Unauthorized' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pendingOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipHandoverCanceled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pendingOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipHandoverRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'roles',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'RolesUpdated',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ban',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cancelOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pendingOwner', internalType: 'address', type: 'address' },
    ],
    name: 'completeOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'currentNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'grantRoles',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hasAllRoles',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hasAnyRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'uri', internalType: 'string', type: 'string' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'hashUpdateRequest',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'metadataEmit',
    outputs: [
      {
        name: '',
        internalType: 'contract ITokenMetadataEmit',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'metadataRole',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: 'result', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pendingOwner', internalType: 'address', type: 'address' },
    ],
    name: 'ownershipHandoverExpiresAt',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'roles', internalType: 'uint256', type: 'uint256' }],
    name: 'renounceRoles',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'requestOwnershipHandover',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'roles', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeRoles',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'rolesOf',
    outputs: [{ name: 'roles', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_baseURI', internalType: 'string', type: 'string' }],
    name: 'setBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_signer', internalType: 'address', type: 'address' }],
    name: 'setSigner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'uri', internalType: 'string', type: 'string' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setTokenUri',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'signerRole',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'trustRole',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const namedLadyRendererAddress = {
  1: '0xC7A29659c34CB2551Aec0dc589e6450aF342bf24',
  11155111: '0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const namedLadyRendererConfig = {
  address: namedLadyRendererAddress,
  abi: namedLadyRendererAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OnChainCheckGas
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const onChainCheckGasAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'renderer', internalType: 'address', type: 'address' },
      { name: 'freeClaimNft', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'ApprovalCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'ApprovalQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
  { type: 'error', inputs: [], name: 'InvalidQueryRange' },
  { type: 'error', inputs: [], name: 'MintERC2309QuantityExceedsLimit' },
  { type: 'error', inputs: [], name: 'MintToZeroAddress' },
  { type: 'error', inputs: [], name: 'MintZeroQuantity' },
  { type: 'error', inputs: [], name: 'OwnerQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'OwnershipNotInitializedForExtraData' },
  { type: 'error', inputs: [], name: 'TransferCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
  { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
  { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
  { type: 'error', inputs: [], name: 'URIQueryForNonexistentToken' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'ConsecutiveTransfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'availableMint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'mintAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'claimAndMint',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'claimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cost',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'explicitOwnershipOf',
    outputs: [
      {
        name: '',
        internalType: 'struct IERC721A.TokenOwnership',
        type: 'tuple',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'burned', internalType: 'bool', type: 'bool' },
          { name: 'extraData', internalType: 'uint24', type: 'uint24' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'explicitOwnershipsOf',
    outputs: [
      {
        name: '',
        internalType: 'struct IERC721A.TokenOwnership[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'burned', internalType: 'bool', type: 'bool' },
          { name: 'extraData', internalType: 'uint24', type: 'uint24' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getGasPriceAtMint',
    outputs: [{ name: '', internalType: 'uint24', type: 'uint24' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getTokenSeed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'mintAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'gift',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxMint',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'mintAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'publicSaleActive',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newCost', internalType: 'uint256', type: 'uint256' }],
    name: 'setCost',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newMintActive', internalType: 'bool', type: 'bool' }],
    name: 'setMintActive',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'tokensOfOwner',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'stop', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokensOfOwnerIn',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const onChainCheckGasAddress = {
  1: '0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const onChainCheckGasConfig = {
  address: onChainCheckGasAddress,
  abi: onChainCheckGasAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OnChainGas
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const onChainGasAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_compiler', internalType: 'address', type: 'address' },
      { name: 'chunk1', internalType: 'address', type: 'address' },
      { name: 'chunk2', internalType: 'address', type: 'address' },
      { name: 'chunk3', internalType: 'address', type: 'address' },
      { name: 'chunk4', internalType: 'address', type: 'address' },
      { name: 'chunk5', internalType: 'address', type: 'address' },
      { name: 'chunk6', internalType: 'address', type: 'address' },
      { name: 'chunk7', internalType: 'address', type: 'address' },
      { name: 'chunk8', internalType: 'address', type: 'address' },
      { name: 'chunk9', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'ApprovalCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'ApprovalQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
  { type: 'error', inputs: [], name: 'InvalidQueryRange' },
  { type: 'error', inputs: [], name: 'MintERC2309QuantityExceedsLimit' },
  { type: 'error', inputs: [], name: 'MintToZeroAddress' },
  { type: 'error', inputs: [], name: 'MintZeroQuantity' },
  { type: 'error', inputs: [], name: 'OwnerQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'OwnershipNotInitializedForExtraData' },
  { type: 'error', inputs: [], name: 'TransferCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
  { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
  { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
  { type: 'error', inputs: [], name: 'URIQueryForNonexistentToken' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'ConsecutiveTransfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'availableMint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cost',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'explicitOwnershipOf',
    outputs: [
      {
        name: '',
        internalType: 'struct IERC721A.TokenOwnership',
        type: 'tuple',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'burned', internalType: 'bool', type: 'bool' },
          { name: 'extraData', internalType: 'uint24', type: 'uint24' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'explicitOwnershipsOf',
    outputs: [
      {
        name: '',
        internalType: 'struct IERC721A.TokenOwnership[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'burned', internalType: 'bool', type: 'bool' },
          { name: 'extraData', internalType: 'uint24', type: 'uint24' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getTokenSeed',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'mintAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'gift',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxMint',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'mintAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'publicSaleActive',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newCost', internalType: 'uint256', type: 'uint256' }],
    name: 'setCost',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newMintActive', internalType: 'bool', type: 'bool' }],
    name: 'setMintActive',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_rpc', internalType: 'string', type: 'string' }],
    name: 'setRpc',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'tokensOfOwner',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'stop', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokensOfOwnerIn',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const onChainGasAddress = {
  1: '0x25Ec84aBe25174650220b83841E0cfB39D8Aab87',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const onChainGasConfig = {
  address: onChainGasAddress,
  abi: onChainGasAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WrappedNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const wrappedNftAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'nftContract', internalType: 'address', type: 'address' },
      { name: 'tokenRenderer', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'DevTipFailed' },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'MustOwnToken',
  },
  { type: 'error', inputs: [], name: 'MustWrapOneToken' },
  { type: 'error', inputs: [], name: 'NoContractUri' },
  {
    type: 'error',
    inputs: [{ name: 'required', internalType: 'uint256', type: 'uint256' }],
    name: 'NotEnoughEther',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'OperatorNotAllowed',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'TokenNotWrapped',
  },
  { type: 'error', inputs: [], name: 'WithdrawFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'EMIT_METADATA_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'OPERATOR_FILTER_REGISTRY',
    outputs: [
      {
        name: '',
        internalType: 'contract IOperatorFilterRegistry',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'TREASURER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPDATE_RENDERER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'claimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'contractURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'defaultRoyaltyInfo',
    outputs: [
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'royaltyFraction', internalType: 'uint96', type: 'uint96' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'emitMetadataUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'isWrapped',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renderer',
    outputs: [
      {
        name: '',
        internalType: 'contract ITokenURIGenerator',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '_salePrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'royaltyInfo',
    outputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: 'royaltyAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'uri', internalType: 'string', type: 'string' }],
    name: 'setContractURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'feeNumerator', internalType: 'uint96', type: 'uint96' },
    ],
    name: 'setDefaultRoyalty',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newRenderer', internalType: 'address', type: 'address' }],
    name: 'setRenderer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'cost', internalType: 'uint256', type: 'uint256' }],
    name: 'setWrapCost',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'unwrap',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'unwrapMany',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'wrap',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'wrapCost',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'wrapTo',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'wrappedNft',
    outputs: [{ name: '', internalType: 'contract IERC721', type: 'address' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const wrappedNftAddress = {
  11155111: '0x9EFf37047657a0f50b989165b48012834eDB2212',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const wrappedNftConfig = {
  address: wrappedNftAddress,
  abi: wrappedNftAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bulkMinterAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useReadBulkMinter = /*#__PURE__*/ createUseReadContract({
  abi: bulkMinterAbi,
  address: bulkMinterAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"MAX_SUPPLY"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useReadBulkMinterMaxSupply = /*#__PURE__*/ createUseReadContract({
  abi: bulkMinterAbi,
  address: bulkMinterAddress,
  functionName: 'MAX_SUPPLY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useReadBulkMinterBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: bulkMinterAbi,
  address: bulkMinterAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"explicitOwnershipOf"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useReadBulkMinterExplicitOwnershipOf =
  /*#__PURE__*/ createUseReadContract({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'explicitOwnershipOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"explicitOwnershipsOf"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useReadBulkMinterExplicitOwnershipsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'explicitOwnershipsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"getApproved"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useReadBulkMinterGetApproved = /*#__PURE__*/ createUseReadContract(
  {
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'getApproved',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useReadBulkMinterIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"lastMintedTokenId"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useReadBulkMinterLastMintedTokenId =
  /*#__PURE__*/ createUseReadContract({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'lastMintedTokenId',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useReadBulkMinterName = /*#__PURE__*/ createUseReadContract({
  abi: bulkMinterAbi,
  address: bulkMinterAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"ownerOf"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useReadBulkMinterOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: bulkMinterAbi,
  address: bulkMinterAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useReadBulkMinterSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useReadBulkMinterSymbol = /*#__PURE__*/ createUseReadContract({
  abi: bulkMinterAbi,
  address: bulkMinterAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"tokenURI"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useReadBulkMinterTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: bulkMinterAbi,
  address: bulkMinterAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"tokensOfOwner"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useReadBulkMinterTokensOfOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'tokensOfOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"tokensOfOwnerIn"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useReadBulkMinterTokensOfOwnerIn =
  /*#__PURE__*/ createUseReadContract({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'tokensOfOwnerIn',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useReadBulkMinterTotalSupply = /*#__PURE__*/ createUseReadContract(
  {
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'totalSupply',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bulkMinterAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useWriteBulkMinter = /*#__PURE__*/ createUseWriteContract({
  abi: bulkMinterAbi,
  address: bulkMinterAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useWriteBulkMinterApprove = /*#__PURE__*/ createUseWriteContract({
  abi: bulkMinterAbi,
  address: bulkMinterAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useWriteBulkMinterMint = /*#__PURE__*/ createUseWriteContract({
  abi: bulkMinterAbi,
  address: bulkMinterAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useWriteBulkMinterSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useWriteBulkMinterSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useWriteBulkMinterTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bulkMinterAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useSimulateBulkMinter = /*#__PURE__*/ createUseSimulateContract({
  abi: bulkMinterAbi,
  address: bulkMinterAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useSimulateBulkMinterApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useSimulateBulkMinterMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useSimulateBulkMinterSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useSimulateBulkMinterSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link bulkMinterAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useSimulateBulkMinterTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bulkMinterAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useWatchBulkMinterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bulkMinterAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useWatchBulkMinterApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bulkMinterAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useWatchBulkMinterApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bulkMinterAbi}__ and `eventName` set to `"ConsecutiveTransfer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useWatchBulkMinterConsecutiveTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    eventName: 'ConsecutiveTransfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link bulkMinterAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x71E57b37b4BeA589673D0aFE1992A6457ca754b3)
 */
export const useWatchBulkMinterTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: bulkMinterAbi,
    address: bulkMinterAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__
 */
export const useReadClaimToFame = /*#__PURE__*/ createUseReadContract({
  abi: claimToFameAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"fameToken"`
 */
export const useReadClaimToFameFameToken = /*#__PURE__*/ createUseReadContract({
  abi: claimToFameAbi,
  functionName: 'fameToken',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"generatePackedData"`
 */
export const useReadClaimToFameGeneratePackedData =
  /*#__PURE__*/ createUseReadContract({
    abi: claimToFameAbi,
    functionName: 'generatePackedData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"generateTokenIds"`
 */
export const useReadClaimToFameGenerateTokenIds =
  /*#__PURE__*/ createUseReadContract({
    abi: claimToFameAbi,
    functionName: 'generateTokenIds',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"hasAllRoles"`
 */
export const useReadClaimToFameHasAllRoles =
  /*#__PURE__*/ createUseReadContract({
    abi: claimToFameAbi,
    functionName: 'hasAllRoles',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"hasAnyRole"`
 */
export const useReadClaimToFameHasAnyRole = /*#__PURE__*/ createUseReadContract(
  { abi: claimToFameAbi, functionName: 'hasAnyRole' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"hashClaimDataRequest"`
 */
export const useReadClaimToFameHashClaimDataRequest =
  /*#__PURE__*/ createUseReadContract({
    abi: claimToFameAbi,
    functionName: 'hashClaimDataRequest',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"hashClaimTokensRequest"`
 */
export const useReadClaimToFameHashClaimTokensRequest =
  /*#__PURE__*/ createUseReadContract({
    abi: claimToFameAbi,
    functionName: 'hashClaimTokensRequest',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"isClaimed"`
 */
export const useReadClaimToFameIsClaimed = /*#__PURE__*/ createUseReadContract({
  abi: claimToFameAbi,
  functionName: 'isClaimed',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"isClaimedBatch"`
 */
export const useReadClaimToFameIsClaimedBatch =
  /*#__PURE__*/ createUseReadContract({
    abi: claimToFameAbi,
    functionName: 'isClaimedBatch',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"owner"`
 */
export const useReadClaimToFameOwner = /*#__PURE__*/ createUseReadContract({
  abi: claimToFameAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"ownershipHandoverExpiresAt"`
 */
export const useReadClaimToFameOwnershipHandoverExpiresAt =
  /*#__PURE__*/ createUseReadContract({
    abi: claimToFameAbi,
    functionName: 'ownershipHandoverExpiresAt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"roleClaimPrimer"`
 */
export const useReadClaimToFameRoleClaimPrimer =
  /*#__PURE__*/ createUseReadContract({
    abi: claimToFameAbi,
    functionName: 'roleClaimPrimer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"roleSigner"`
 */
export const useReadClaimToFameRoleSigner = /*#__PURE__*/ createUseReadContract(
  { abi: claimToFameAbi, functionName: 'roleSigner' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"roleTreasurer"`
 */
export const useReadClaimToFameRoleTreasurer =
  /*#__PURE__*/ createUseReadContract({
    abi: claimToFameAbi,
    functionName: 'roleTreasurer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"rolesOf"`
 */
export const useReadClaimToFameRolesOf = /*#__PURE__*/ createUseReadContract({
  abi: claimToFameAbi,
  functionName: 'rolesOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"signatureNonces"`
 */
export const useReadClaimToFameSignatureNonces =
  /*#__PURE__*/ createUseReadContract({
    abi: claimToFameAbi,
    functionName: 'signatureNonces',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__
 */
export const useWriteClaimToFame = /*#__PURE__*/ createUseWriteContract({
  abi: claimToFameAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 */
export const useWriteClaimToFameCancelOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'cancelOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"claimWithData"`
 */
export const useWriteClaimToFameClaimWithData =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'claimWithData',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"claimWithTokens"`
 */
export const useWriteClaimToFameClaimWithTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'claimWithTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 */
export const useWriteClaimToFameCompleteOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'completeOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"grantRoles"`
 */
export const useWriteClaimToFameGrantRoles =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'grantRoles',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"primeClaim"`
 */
export const useWriteClaimToFamePrimeClaim =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'primeClaim',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"primeClaimWithData"`
 */
export const useWriteClaimToFamePrimeClaimWithData =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'primeClaimWithData',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteClaimToFameRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"renounceRoles"`
 */
export const useWriteClaimToFameRenounceRoles =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'renounceRoles',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"requestOwnershipHandover"`
 */
export const useWriteClaimToFameRequestOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'requestOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"revokeRoles"`
 */
export const useWriteClaimToFameRevokeRoles =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'revokeRoles',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"setSigner"`
 */
export const useWriteClaimToFameSetSigner =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'setSigner',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteClaimToFameTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"verifyClaimDataRequest"`
 */
export const useWriteClaimToFameVerifyClaimDataRequest =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'verifyClaimDataRequest',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"verifyClaimTokensRequest"`
 */
export const useWriteClaimToFameVerifyClaimTokensRequest =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'verifyClaimTokensRequest',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"withdrawErc20"`
 */
export const useWriteClaimToFameWithdrawErc20 =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'withdrawErc20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"withdrawEth"`
 */
export const useWriteClaimToFameWithdrawEth =
  /*#__PURE__*/ createUseWriteContract({
    abi: claimToFameAbi,
    functionName: 'withdrawEth',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__
 */
export const useSimulateClaimToFame = /*#__PURE__*/ createUseSimulateContract({
  abi: claimToFameAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 */
export const useSimulateClaimToFameCancelOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'cancelOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"claimWithData"`
 */
export const useSimulateClaimToFameClaimWithData =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'claimWithData',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"claimWithTokens"`
 */
export const useSimulateClaimToFameClaimWithTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'claimWithTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 */
export const useSimulateClaimToFameCompleteOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'completeOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"grantRoles"`
 */
export const useSimulateClaimToFameGrantRoles =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'grantRoles',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"primeClaim"`
 */
export const useSimulateClaimToFamePrimeClaim =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'primeClaim',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"primeClaimWithData"`
 */
export const useSimulateClaimToFamePrimeClaimWithData =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'primeClaimWithData',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateClaimToFameRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"renounceRoles"`
 */
export const useSimulateClaimToFameRenounceRoles =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'renounceRoles',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"requestOwnershipHandover"`
 */
export const useSimulateClaimToFameRequestOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'requestOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"revokeRoles"`
 */
export const useSimulateClaimToFameRevokeRoles =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'revokeRoles',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"setSigner"`
 */
export const useSimulateClaimToFameSetSigner =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'setSigner',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateClaimToFameTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"verifyClaimDataRequest"`
 */
export const useSimulateClaimToFameVerifyClaimDataRequest =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'verifyClaimDataRequest',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"verifyClaimTokensRequest"`
 */
export const useSimulateClaimToFameVerifyClaimTokensRequest =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'verifyClaimTokensRequest',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"withdrawErc20"`
 */
export const useSimulateClaimToFameWithdrawErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'withdrawErc20',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link claimToFameAbi}__ and `functionName` set to `"withdrawEth"`
 */
export const useSimulateClaimToFameWithdrawEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: claimToFameAbi,
    functionName: 'withdrawEth',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link claimToFameAbi}__
 */
export const useWatchClaimToFameEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: claimToFameAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link claimToFameAbi}__ and `eventName` set to `"OwnershipHandoverCanceled"`
 */
export const useWatchClaimToFameOwnershipHandoverCanceledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: claimToFameAbi,
    eventName: 'OwnershipHandoverCanceled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link claimToFameAbi}__ and `eventName` set to `"OwnershipHandoverRequested"`
 */
export const useWatchClaimToFameOwnershipHandoverRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: claimToFameAbi,
    eventName: 'OwnershipHandoverRequested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link claimToFameAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchClaimToFameOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: claimToFameAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link claimToFameAbi}__ and `eventName` set to `"RolesUpdated"`
 */
export const useWatchClaimToFameRolesUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: claimToFameAbi,
    eventName: 'RolesUpdated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__
 */
export const useReadFame = /*#__PURE__*/ createUseReadContract({ abi: fameAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadFameAllowance = /*#__PURE__*/ createUseReadContract({
  abi: fameAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadFameBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: fameAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"burnedPoolManager"`
 */
export const useReadFameBurnedPoolManager = /*#__PURE__*/ createUseReadContract(
  { abi: fameAbi, functionName: 'burnedPoolManager' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadFameDecimals = /*#__PURE__*/ createUseReadContract({
  abi: fameAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"fameMirror"`
 */
export const useReadFameFameMirror = /*#__PURE__*/ createUseReadContract({
  abi: fameAbi,
  functionName: 'fameMirror',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"getSkipNFT"`
 */
export const useReadFameGetSkipNft = /*#__PURE__*/ createUseReadContract({
  abi: fameAbi,
  functionName: 'getSkipNFT',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"hasAllRoles"`
 */
export const useReadFameHasAllRoles = /*#__PURE__*/ createUseReadContract({
  abi: fameAbi,
  functionName: 'hasAllRoles',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"hasAnyRole"`
 */
export const useReadFameHasAnyRole = /*#__PURE__*/ createUseReadContract({
  abi: fameAbi,
  functionName: 'hasAnyRole',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"mirrorERC721"`
 */
export const useReadFameMirrorErc721 = /*#__PURE__*/ createUseReadContract({
  abi: fameAbi,
  functionName: 'mirrorERC721',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"name"`
 */
export const useReadFameName = /*#__PURE__*/ createUseReadContract({
  abi: fameAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"owner"`
 */
export const useReadFameOwner = /*#__PURE__*/ createUseReadContract({
  abi: fameAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"ownershipHandoverExpiresAt"`
 */
export const useReadFameOwnershipHandoverExpiresAt =
  /*#__PURE__*/ createUseReadContract({
    abi: fameAbi,
    functionName: 'ownershipHandoverExpiresAt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"renderer"`
 */
export const useReadFameRenderer = /*#__PURE__*/ createUseReadContract({
  abi: fameAbi,
  functionName: 'renderer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"rolesOf"`
 */
export const useReadFameRolesOf = /*#__PURE__*/ createUseReadContract({
  abi: fameAbi,
  functionName: 'rolesOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadFameSymbol = /*#__PURE__*/ createUseReadContract({
  abi: fameAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadFameTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: fameAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"unit"`
 */
export const useReadFameUnit = /*#__PURE__*/ createUseReadContract({
  abi: fameAbi,
  functionName: 'unit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__
 */
export const useWriteFame = /*#__PURE__*/ createUseWriteContract({
  abi: fameAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteFameApprove = /*#__PURE__*/ createUseWriteContract({
  abi: fameAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 */
export const useWriteFameCancelOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameAbi,
    functionName: 'cancelOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 */
export const useWriteFameCompleteOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameAbi,
    functionName: 'completeOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"emitBatchMetadataUpdate"`
 */
export const useWriteFameEmitBatchMetadataUpdate =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameAbi,
    functionName: 'emitBatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"emitMetadataUpdate"`
 */
export const useWriteFameEmitMetadataUpdate =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameAbi,
    functionName: 'emitMetadataUpdate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"grantRoles"`
 */
export const useWriteFameGrantRoles = /*#__PURE__*/ createUseWriteContract({
  abi: fameAbi,
  functionName: 'grantRoles',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"launchPublic"`
 */
export const useWriteFameLaunchPublic = /*#__PURE__*/ createUseWriteContract({
  abi: fameAbi,
  functionName: 'launchPublic',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteFameRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"renounceRoles"`
 */
export const useWriteFameRenounceRoles = /*#__PURE__*/ createUseWriteContract({
  abi: fameAbi,
  functionName: 'renounceRoles',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"requestOwnershipHandover"`
 */
export const useWriteFameRequestOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameAbi,
    functionName: 'requestOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"revokeRoles"`
 */
export const useWriteFameRevokeRoles = /*#__PURE__*/ createUseWriteContract({
  abi: fameAbi,
  functionName: 'revokeRoles',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const useWriteFameSetBaseUri = /*#__PURE__*/ createUseWriteContract({
  abi: fameAbi,
  functionName: 'setBaseURI',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"setBurnedPoolManager"`
 */
export const useWriteFameSetBurnedPoolManager =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameAbi,
    functionName: 'setBurnedPoolManager',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"setRenderer"`
 */
export const useWriteFameSetRenderer = /*#__PURE__*/ createUseWriteContract({
  abi: fameAbi,
  functionName: 'setRenderer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"setSkipNFT"`
 */
export const useWriteFameSetSkipNft = /*#__PURE__*/ createUseWriteContract({
  abi: fameAbi,
  functionName: 'setSkipNFT',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"setSkipNftForAccount"`
 */
export const useWriteFameSetSkipNftForAccount =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameAbi,
    functionName: 'setSkipNftForAccount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteFameTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: fameAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteFameTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: fameAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteFameTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteFameWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: fameAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__
 */
export const useSimulateFame = /*#__PURE__*/ createUseSimulateContract({
  abi: fameAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateFameApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: fameAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 */
export const useSimulateFameCancelOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'cancelOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 */
export const useSimulateFameCompleteOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'completeOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"emitBatchMetadataUpdate"`
 */
export const useSimulateFameEmitBatchMetadataUpdate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'emitBatchMetadataUpdate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"emitMetadataUpdate"`
 */
export const useSimulateFameEmitMetadataUpdate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'emitMetadataUpdate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"grantRoles"`
 */
export const useSimulateFameGrantRoles =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'grantRoles',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"launchPublic"`
 */
export const useSimulateFameLaunchPublic =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'launchPublic',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateFameRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"renounceRoles"`
 */
export const useSimulateFameRenounceRoles =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'renounceRoles',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"requestOwnershipHandover"`
 */
export const useSimulateFameRequestOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'requestOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"revokeRoles"`
 */
export const useSimulateFameRevokeRoles =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'revokeRoles',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const useSimulateFameSetBaseUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'setBaseURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"setBurnedPoolManager"`
 */
export const useSimulateFameSetBurnedPoolManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'setBurnedPoolManager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"setRenderer"`
 */
export const useSimulateFameSetRenderer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'setRenderer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"setSkipNFT"`
 */
export const useSimulateFameSetSkipNft =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'setSkipNFT',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"setSkipNftForAccount"`
 */
export const useSimulateFameSetSkipNftForAccount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'setSkipNftForAccount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateFameTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: fameAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateFameTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateFameTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateFameWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: fameAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameAbi}__
 */
export const useWatchFameEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: fameAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchFameApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameAbi}__ and `eventName` set to `"OwnershipHandoverCanceled"`
 */
export const useWatchFameOwnershipHandoverCanceledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameAbi,
    eventName: 'OwnershipHandoverCanceled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameAbi}__ and `eventName` set to `"OwnershipHandoverRequested"`
 */
export const useWatchFameOwnershipHandoverRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameAbi,
    eventName: 'OwnershipHandoverRequested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchFameOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameAbi}__ and `eventName` set to `"RolesUpdated"`
 */
export const useWatchFameRolesUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameAbi,
    eventName: 'RolesUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameAbi}__ and `eventName` set to `"SkipNFTSet"`
 */
export const useWatchFameSkipNftSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameAbi,
    eventName: 'SkipNFTSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchFameTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySociety = /*#__PURE__*/ createUseReadContract({
  abi: fameLadySocietyAbi,
  address: fameLadySocietyAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"EMIT_METADATA_ROLE"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyEmitMetadataRole =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'EMIT_METADATA_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"OPERATOR_FILTER_REGISTRY"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyOperatorFilterRegistry =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'OPERATOR_FILTER_REGISTRY',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"TREASURER_ROLE"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyTreasurerRole =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'TREASURER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"UPDATE_RENDERER_ROLE"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyUpdateRendererRole =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'UPDATE_RENDERER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"claimed"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyClaimed =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'claimed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"contractURI"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyContractUri =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'contractURI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"defaultRoyaltyInfo"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyDefaultRoyaltyInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'defaultRoyaltyInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"getApproved"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"hasRole"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyHasRole =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'hasRole',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"isWrapped"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyIsWrapped =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'isWrapped',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyName = /*#__PURE__*/ createUseReadContract({
  abi: fameLadySocietyAbi,
  address: fameLadySocietyAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyOwner = /*#__PURE__*/ createUseReadContract({
  abi: fameLadySocietyAbi,
  address: fameLadySocietyAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"ownerOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'ownerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyPendingOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"renderer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyRenderer =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'renderer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"royaltyInfo"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyRoyaltyInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'royaltyInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietySupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietySymbol = /*#__PURE__*/ createUseReadContract(
  {
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'symbol',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"tokenURI"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyTokenUri =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'tokenURI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"wrapCost"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyWrapCost =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'wrapCost',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"wrappedNft"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useReadFameLadySocietyWrappedNft =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'wrappedNft',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySociety = /*#__PURE__*/ createUseWriteContract({
  abi: fameLadySocietyAbi,
  address: fameLadySocietyAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietyAcceptOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietyApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"emitMetadataUpdate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietyEmitMetadataUpdate =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'emitMetadataUpdate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"grantRole"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietyGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"onERC721Received"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietyOnErc721Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietyRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"renounceRole"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietyRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"revokeRole"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietyRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietySafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietySetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"setContractURI"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietySetContractUri =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'setContractURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"setDefaultRoyalty"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietySetDefaultRoyalty =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'setDefaultRoyalty',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"setRenderer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietySetRenderer =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'setRenderer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"setWrapCost"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietySetWrapCost =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'setWrapCost',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietyTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietyTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"unwrap"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietyUnwrap =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'unwrap',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"unwrapMany"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietyUnwrapMany =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'unwrapMany',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietyWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"wrap"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietyWrap = /*#__PURE__*/ createUseWriteContract(
  {
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'wrap',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"wrapTo"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWriteFameLadySocietyWrapTo =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'wrapTo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySociety =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietyAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietyApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"emitMetadataUpdate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietyEmitMetadataUpdate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'emitMetadataUpdate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"grantRole"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietyGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"onERC721Received"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietyOnErc721Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietyRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"renounceRole"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietyRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"revokeRole"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietyRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietySafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietySetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"setContractURI"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietySetContractUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'setContractURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"setDefaultRoyalty"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietySetDefaultRoyalty =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'setDefaultRoyalty',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"setRenderer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietySetRenderer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'setRenderer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"setWrapCost"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietySetWrapCost =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'setWrapCost',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietyTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietyTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"unwrap"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietyUnwrap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'unwrap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"unwrapMany"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietyUnwrapMany =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'unwrapMany',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietyWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"wrap"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietyWrap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'wrap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `functionName` set to `"wrapTo"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useSimulateFameLadySocietyWrapTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    functionName: 'wrapTo',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameLadySocietyAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWatchFameLadySocietyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWatchFameLadySocietyApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWatchFameLadySocietyApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWatchFameLadySocietyBatchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `eventName` set to `"MetadataUpdate"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWatchFameLadySocietyMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWatchFameLadySocietyOwnershipTransferStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWatchFameLadySocietyOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWatchFameLadySocietyRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWatchFameLadySocietyRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWatchFameLadySocietyRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameLadySocietyAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6cf4328f1ea83b5d592474f9fcdc714faafd1574)
 */
export const useWatchFameLadySocietyTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameLadySocietyAbi,
    address: fameLadySocietyAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquad = /*#__PURE__*/ createUseReadContract({
  abi: fameLadySquadAbi,
  address: fameLadySquadAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"MAX_LADY_SUPPLY"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquadMaxLadySupply =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'MAX_LADY_SUPPLY',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"SALE_START_TIMESTAMP"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquadSaleStartTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'SALE_START_TIMESTAMP',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquadBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"baseURI"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquadBaseUri = /*#__PURE__*/ createUseReadContract({
  abi: fameLadySquadAbi,
  address: fameLadySquadAddress,
  functionName: 'baseURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"getApproved"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquadGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"getNFTPrice"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquadGetNftPrice =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'getNFTPrice',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquadIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquadName = /*#__PURE__*/ createUseReadContract({
  abi: fameLadySquadAbi,
  address: fameLadySquadAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquadOwner = /*#__PURE__*/ createUseReadContract({
  abi: fameLadySquadAbi,
  address: fameLadySquadAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"ownerOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquadOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: fameLadySquadAbi,
  address: fameLadySquadAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquadSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquadSymbol = /*#__PURE__*/ createUseReadContract({
  abi: fameLadySquadAbi,
  address: fameLadySquadAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"tokenByIndex"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquadTokenByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'tokenByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquadTokenOfOwnerByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'tokenOfOwnerByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"tokenURI"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquadTokenUri = /*#__PURE__*/ createUseReadContract(
  {
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'tokenURI',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useReadFameLadySquadTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySquadAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useWriteFameLadySquad = /*#__PURE__*/ createUseWriteContract({
  abi: fameLadySquadAbi,
  address: fameLadySquadAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useWriteFameLadySquadApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"changeBaseURI"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useWriteFameLadySquadChangeBaseUri =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'changeBaseURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"mintLady"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useWriteFameLadySquadMintLady =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'mintLady',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useWriteFameLadySquadRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useWriteFameLadySquadSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useWriteFameLadySquadSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useWriteFameLadySquadTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useWriteFameLadySquadTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useWriteFameLadySquadWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySquadAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useSimulateFameLadySquad = /*#__PURE__*/ createUseSimulateContract(
  { abi: fameLadySquadAbi, address: fameLadySquadAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useSimulateFameLadySquadApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"changeBaseURI"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useSimulateFameLadySquadChangeBaseUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'changeBaseURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"mintLady"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useSimulateFameLadySquadMintLady =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'mintLady',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useSimulateFameLadySquadRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useSimulateFameLadySquadSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useSimulateFameLadySquadSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useSimulateFameLadySquadTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useSimulateFameLadySquadTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameLadySquadAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useSimulateFameLadySquadWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameLadySquadAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useWatchFameLadySquadEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameLadySquadAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useWatchFameLadySquadApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameLadySquadAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useWatchFameLadySquadApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameLadySquadAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useWatchFameLadySquadOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameLadySquadAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xf3E6DbBE461C6fa492CeA7Cb1f5C5eA660EB1B47)
 */
export const useWatchFameLadySquadTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameLadySquadAbi,
    address: fameLadySquadAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameMirrorAbi}__
 */
export const useReadFameMirror = /*#__PURE__*/ createUseReadContract({
  abi: fameMirrorAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadFameMirrorBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: fameMirrorAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"baseERC20"`
 */
export const useReadFameMirrorBaseErc20 = /*#__PURE__*/ createUseReadContract({
  abi: fameMirrorAbi,
  functionName: 'baseERC20',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadFameMirrorGetApproved = /*#__PURE__*/ createUseReadContract(
  { abi: fameMirrorAbi, functionName: 'getApproved' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadFameMirrorIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: fameMirrorAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"name"`
 */
export const useReadFameMirrorName = /*#__PURE__*/ createUseReadContract({
  abi: fameMirrorAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"owner"`
 */
export const useReadFameMirrorOwner = /*#__PURE__*/ createUseReadContract({
  abi: fameMirrorAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"ownerAt"`
 */
export const useReadFameMirrorOwnerAt = /*#__PURE__*/ createUseReadContract({
  abi: fameMirrorAbi,
  functionName: 'ownerAt',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadFameMirrorOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: fameMirrorAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadFameMirrorSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: fameMirrorAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadFameMirrorSymbol = /*#__PURE__*/ createUseReadContract({
  abi: fameMirrorAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadFameMirrorTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: fameMirrorAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadFameMirrorTotalSupply = /*#__PURE__*/ createUseReadContract(
  { abi: fameMirrorAbi, functionName: 'totalSupply' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameMirrorAbi}__
 */
export const useWriteFameMirror = /*#__PURE__*/ createUseWriteContract({
  abi: fameMirrorAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteFameMirrorApprove = /*#__PURE__*/ createUseWriteContract({
  abi: fameMirrorAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"emitBatchMetadataUpdate"`
 */
export const useWriteFameMirrorEmitBatchMetadataUpdate =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameMirrorAbi,
    functionName: 'emitBatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"emitMetadataUpdate"`
 */
export const useWriteFameMirrorEmitMetadataUpdate =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameMirrorAbi,
    functionName: 'emitMetadataUpdate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"pullOwner"`
 */
export const useWriteFameMirrorPullOwner = /*#__PURE__*/ createUseWriteContract(
  { abi: fameMirrorAbi, functionName: 'pullOwner' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteFameMirrorSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameMirrorAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteFameMirrorSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameMirrorAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteFameMirrorTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameMirrorAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameMirrorAbi}__
 */
export const useSimulateFameMirror = /*#__PURE__*/ createUseSimulateContract({
  abi: fameMirrorAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateFameMirrorApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameMirrorAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"emitBatchMetadataUpdate"`
 */
export const useSimulateFameMirrorEmitBatchMetadataUpdate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameMirrorAbi,
    functionName: 'emitBatchMetadataUpdate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"emitMetadataUpdate"`
 */
export const useSimulateFameMirrorEmitMetadataUpdate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameMirrorAbi,
    functionName: 'emitMetadataUpdate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"pullOwner"`
 */
export const useSimulateFameMirrorPullOwner =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameMirrorAbi,
    functionName: 'pullOwner',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateFameMirrorSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameMirrorAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateFameMirrorSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameMirrorAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameMirrorAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateFameMirrorTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameMirrorAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameMirrorAbi}__
 */
export const useWatchFameMirrorEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: fameMirrorAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameMirrorAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchFameMirrorApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameMirrorAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameMirrorAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchFameMirrorApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameMirrorAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameMirrorAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const useWatchFameMirrorBatchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameMirrorAbi,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameMirrorAbi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const useWatchFameMirrorMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameMirrorAbi,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameMirrorAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchFameMirrorOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameMirrorAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameMirrorAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchFameMirrorTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameMirrorAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSale = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"canProve"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleCanProve = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'canProve',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"fameBalanceOf"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleFameBalanceOf = /*#__PURE__*/ createUseReadContract(
  { abi: fameSaleAbi, address: fameSaleAddress, functionName: 'fameBalanceOf' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"fameSaleToken"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleFameSaleToken = /*#__PURE__*/ createUseReadContract(
  { abi: fameSaleAbi, address: fameSaleAddress, functionName: 'fameSaleToken' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"fameTotalSupply"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleFameTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'fameTotalSupply',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"hasAllRoles"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleHasAllRoles = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'hasAllRoles',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"hasAnyRole"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleHasAnyRole = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'hasAnyRole',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"isPaused"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleIsPaused = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'isPaused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"maxBuy"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleMaxBuy = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'maxBuy',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"maxRaise"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleMaxRaise = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'maxRaise',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"merkleRoot"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleMerkleRoot = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'merkleRoot',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleOwner = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"ownershipHandoverExpiresAt"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleOwnershipHandoverExpiresAt =
  /*#__PURE__*/ createUseReadContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'ownershipHandoverExpiresAt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"raiseRemaining"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleRaiseRemaining =
  /*#__PURE__*/ createUseReadContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'raiseRemaining',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"roleAllowlist"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleRoleAllowlist = /*#__PURE__*/ createUseReadContract(
  { abi: fameSaleAbi, address: fameSaleAddress, functionName: 'roleAllowlist' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"roleExecutive"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleRoleExecutive = /*#__PURE__*/ createUseReadContract(
  { abi: fameSaleAbi, address: fameSaleAddress, functionName: 'roleExecutive' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"roleTreasurer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleRoleTreasurer = /*#__PURE__*/ createUseReadContract(
  { abi: fameSaleAbi, address: fameSaleAddress, functionName: 'roleTreasurer' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"rolesOf"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useReadFameSaleRolesOf = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'rolesOf',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSale = /*#__PURE__*/ createUseWriteContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"buy"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSaleBuy = /*#__PURE__*/ createUseWriteContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'buy',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSaleCancelOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'cancelOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSaleCompleteOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'completeOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"grantRoles"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSaleGrantRoles = /*#__PURE__*/ createUseWriteContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'grantRoles',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"pause"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSalePause = /*#__PURE__*/ createUseWriteContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"refund"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSaleRefund = /*#__PURE__*/ createUseWriteContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'refund',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSaleRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"renounceRoles"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSaleRenounceRoles =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'renounceRoles',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"requestOwnershipHandover"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSaleRequestOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'requestOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"revokeRoles"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSaleRevokeRoles = /*#__PURE__*/ createUseWriteContract(
  { abi: fameSaleAbi, address: fameSaleAddress, functionName: 'revokeRoles' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"setMaxBuy"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSaleSetMaxBuy = /*#__PURE__*/ createUseWriteContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'setMaxBuy',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"setMaxRaise"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSaleSetMaxRaise = /*#__PURE__*/ createUseWriteContract(
  { abi: fameSaleAbi, address: fameSaleAddress, functionName: 'setMaxRaise' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"setMerkleRoot"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSaleSetMerkleRoot =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'setMerkleRoot',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSaleTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"unpause"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSaleUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWriteFameSaleWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSale = /*#__PURE__*/ createUseSimulateContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"buy"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSaleBuy = /*#__PURE__*/ createUseSimulateContract({
  abi: fameSaleAbi,
  address: fameSaleAddress,
  functionName: 'buy',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSaleCancelOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'cancelOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSaleCompleteOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'completeOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"grantRoles"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSaleGrantRoles =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'grantRoles',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"pause"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSalePause = /*#__PURE__*/ createUseSimulateContract(
  { abi: fameSaleAbi, address: fameSaleAddress, functionName: 'pause' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"refund"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSaleRefund =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'refund',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSaleRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"renounceRoles"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSaleRenounceRoles =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'renounceRoles',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"requestOwnershipHandover"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSaleRequestOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'requestOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"revokeRoles"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSaleRevokeRoles =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'revokeRoles',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"setMaxBuy"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSaleSetMaxBuy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'setMaxBuy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"setMaxRaise"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSaleSetMaxRaise =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'setMaxRaise',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"setMerkleRoot"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSaleSetMerkleRoot =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'setMerkleRoot',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSaleTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"unpause"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSaleUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useSimulateFameSaleWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameSaleAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWatchFameSaleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: fameSaleAbi,
  address: fameSaleAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameSaleAbi}__ and `eventName` set to `"OwnershipHandoverCanceled"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWatchFameSaleOwnershipHandoverCanceledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    eventName: 'OwnershipHandoverCanceled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameSaleAbi}__ and `eventName` set to `"OwnershipHandoverRequested"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWatchFameSaleOwnershipHandoverRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    eventName: 'OwnershipHandoverRequested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameSaleAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWatchFameSaleOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameSaleAbi}__ and `eventName` set to `"RolesUpdated"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x740Af42cff003acd5e366b3A5392E38FF6b9e4F3)
 */
export const useWatchFameSaleRolesUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameSaleAbi,
    address: fameSaleAddress,
    eventName: 'RolesUpdated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleToken = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleTokenAbi,
  address: fameSaleTokenAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenDecimals = /*#__PURE__*/ createUseReadContract(
  {
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'decimals',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"hasAllRoles"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenHasAllRoles =
  /*#__PURE__*/ createUseReadContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'hasAllRoles',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"hasAnyRole"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenHasAnyRole =
  /*#__PURE__*/ createUseReadContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'hasAnyRole',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"hasHolder"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenHasHolder =
  /*#__PURE__*/ createUseReadContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'hasHolder',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"holders"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenHolders = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleTokenAbi,
  address: fameSaleTokenAddress,
  functionName: 'holders',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenName = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleTokenAbi,
  address: fameSaleTokenAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"nonces"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenNonces = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleTokenAbi,
  address: fameSaleTokenAddress,
  functionName: 'nonces',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenOwner = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleTokenAbi,
  address: fameSaleTokenAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"ownershipHandoverExpiresAt"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenOwnershipHandoverExpiresAt =
  /*#__PURE__*/ createUseReadContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'ownershipHandoverExpiresAt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"roleBurner"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenRoleBurner =
  /*#__PURE__*/ createUseReadContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'roleBurner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"roleController"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenRoleController =
  /*#__PURE__*/ createUseReadContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'roleController',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"roleMinter"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenRoleMinter =
  /*#__PURE__*/ createUseReadContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'roleMinter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"rolesOf"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenRolesOf = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleTokenAbi,
  address: fameSaleTokenAddress,
  functionName: 'rolesOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: fameSaleTokenAbi,
  address: fameSaleTokenAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useReadFameSaleTokenTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleTokenAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWriteFameSaleToken = /*#__PURE__*/ createUseWriteContract({
  abi: fameSaleTokenAbi,
  address: fameSaleTokenAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWriteFameSaleTokenApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWriteFameSaleTokenBurn = /*#__PURE__*/ createUseWriteContract({
  abi: fameSaleTokenAbi,
  address: fameSaleTokenAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWriteFameSaleTokenCancelOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'cancelOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWriteFameSaleTokenCompleteOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'completeOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"grantRoles"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWriteFameSaleTokenGrantRoles =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'grantRoles',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWriteFameSaleTokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: fameSaleTokenAbi,
  address: fameSaleTokenAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"permit"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWriteFameSaleTokenPermit = /*#__PURE__*/ createUseWriteContract(
  {
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'permit',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWriteFameSaleTokenRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"renounceRoles"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWriteFameSaleTokenRenounceRoles =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'renounceRoles',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"requestOwnershipHandover"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWriteFameSaleTokenRequestOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'requestOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"revokeRoles"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWriteFameSaleTokenRevokeRoles =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'revokeRoles',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWriteFameSaleTokenTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWriteFameSaleTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWriteFameSaleTokenTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleTokenAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useSimulateFameSaleToken = /*#__PURE__*/ createUseSimulateContract(
  { abi: fameSaleTokenAbi, address: fameSaleTokenAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useSimulateFameSaleTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"burn"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useSimulateFameSaleTokenBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useSimulateFameSaleTokenCancelOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'cancelOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useSimulateFameSaleTokenCompleteOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'completeOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"grantRoles"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useSimulateFameSaleTokenGrantRoles =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'grantRoles',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useSimulateFameSaleTokenMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"permit"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useSimulateFameSaleTokenPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'permit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useSimulateFameSaleTokenRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"renounceRoles"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useSimulateFameSaleTokenRenounceRoles =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'renounceRoles',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"requestOwnershipHandover"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useSimulateFameSaleTokenRequestOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'requestOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"revokeRoles"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useSimulateFameSaleTokenRevokeRoles =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'revokeRoles',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useSimulateFameSaleTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useSimulateFameSaleTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useSimulateFameSaleTokenTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameSaleTokenAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWatchFameSaleTokenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWatchFameSaleTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `eventName` set to `"OwnershipHandoverCanceled"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWatchFameSaleTokenOwnershipHandoverCanceledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    eventName: 'OwnershipHandoverCanceled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `eventName` set to `"OwnershipHandoverRequested"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWatchFameSaleTokenOwnershipHandoverRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    eventName: 'OwnershipHandoverRequested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWatchFameSaleTokenOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `eventName` set to `"RolesUpdated"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWatchFameSaleTokenRolesUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    eventName: 'RolesUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link fameSaleTokenAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x233A9630e1fC80688E5cc2bb988836e0D5034328)
 */
export const useWatchFameSaleTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: fameSaleTokenAbi,
    address: fameSaleTokenAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iBalanceOfAbi}__
 */
export const useReadIBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: iBalanceOfAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iBalanceOfAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadIBalanceOfBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: iBalanceOfAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link namedLadyRendererAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useReadNamedLadyRenderer = /*#__PURE__*/ createUseReadContract({
  abi: namedLadyRendererAbi,
  address: namedLadyRendererAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"currentNonce"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useReadNamedLadyRendererCurrentNonce =
  /*#__PURE__*/ createUseReadContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'currentNonce',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"hasAllRoles"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useReadNamedLadyRendererHasAllRoles =
  /*#__PURE__*/ createUseReadContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'hasAllRoles',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"hasAnyRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useReadNamedLadyRendererHasAnyRole =
  /*#__PURE__*/ createUseReadContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'hasAnyRole',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"hashUpdateRequest"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useReadNamedLadyRendererHashUpdateRequest =
  /*#__PURE__*/ createUseReadContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'hashUpdateRequest',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"metadataEmit"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useReadNamedLadyRendererMetadataEmit =
  /*#__PURE__*/ createUseReadContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'metadataEmit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"metadataRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useReadNamedLadyRendererMetadataRole =
  /*#__PURE__*/ createUseReadContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'metadataRole',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useReadNamedLadyRendererOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"ownershipHandoverExpiresAt"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useReadNamedLadyRendererOwnershipHandoverExpiresAt =
  /*#__PURE__*/ createUseReadContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'ownershipHandoverExpiresAt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"rolesOf"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useReadNamedLadyRendererRolesOf =
  /*#__PURE__*/ createUseReadContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'rolesOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"signerRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useReadNamedLadyRendererSignerRole =
  /*#__PURE__*/ createUseReadContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'signerRole',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"tokenURI"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useReadNamedLadyRendererTokenUri =
  /*#__PURE__*/ createUseReadContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'tokenURI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"trustRole"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useReadNamedLadyRendererTrustRole =
  /*#__PURE__*/ createUseReadContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'trustRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link namedLadyRendererAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWriteNamedLadyRenderer = /*#__PURE__*/ createUseWriteContract({
  abi: namedLadyRendererAbi,
  address: namedLadyRendererAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"ban"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWriteNamedLadyRendererBan =
  /*#__PURE__*/ createUseWriteContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'ban',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWriteNamedLadyRendererCancelOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'cancelOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWriteNamedLadyRendererCompleteOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'completeOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"grantRoles"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWriteNamedLadyRendererGrantRoles =
  /*#__PURE__*/ createUseWriteContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'grantRoles',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWriteNamedLadyRendererRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"renounceRoles"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWriteNamedLadyRendererRenounceRoles =
  /*#__PURE__*/ createUseWriteContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'renounceRoles',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"requestOwnershipHandover"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWriteNamedLadyRendererRequestOwnershipHandover =
  /*#__PURE__*/ createUseWriteContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'requestOwnershipHandover',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"revokeRoles"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWriteNamedLadyRendererRevokeRoles =
  /*#__PURE__*/ createUseWriteContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'revokeRoles',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"setBaseURI"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWriteNamedLadyRendererSetBaseUri =
  /*#__PURE__*/ createUseWriteContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'setBaseURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"setSigner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWriteNamedLadyRendererSetSigner =
  /*#__PURE__*/ createUseWriteContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'setSigner',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"setTokenUri"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWriteNamedLadyRendererSetTokenUri =
  /*#__PURE__*/ createUseWriteContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'setTokenUri',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWriteNamedLadyRendererTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link namedLadyRendererAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useSimulateNamedLadyRenderer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"ban"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useSimulateNamedLadyRendererBan =
  /*#__PURE__*/ createUseSimulateContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'ban',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"cancelOwnershipHandover"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useSimulateNamedLadyRendererCancelOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'cancelOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"completeOwnershipHandover"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useSimulateNamedLadyRendererCompleteOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'completeOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"grantRoles"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useSimulateNamedLadyRendererGrantRoles =
  /*#__PURE__*/ createUseSimulateContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'grantRoles',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useSimulateNamedLadyRendererRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"renounceRoles"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useSimulateNamedLadyRendererRenounceRoles =
  /*#__PURE__*/ createUseSimulateContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'renounceRoles',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"requestOwnershipHandover"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useSimulateNamedLadyRendererRequestOwnershipHandover =
  /*#__PURE__*/ createUseSimulateContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'requestOwnershipHandover',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"revokeRoles"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useSimulateNamedLadyRendererRevokeRoles =
  /*#__PURE__*/ createUseSimulateContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'revokeRoles',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"setBaseURI"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useSimulateNamedLadyRendererSetBaseUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'setBaseURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"setSigner"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useSimulateNamedLadyRendererSetSigner =
  /*#__PURE__*/ createUseSimulateContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'setSigner',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"setTokenUri"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useSimulateNamedLadyRendererSetTokenUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'setTokenUri',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useSimulateNamedLadyRendererTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link namedLadyRendererAbi}__
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWatchNamedLadyRendererEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `eventName` set to `"OwnershipHandoverCanceled"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWatchNamedLadyRendererOwnershipHandoverCanceledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    eventName: 'OwnershipHandoverCanceled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `eventName` set to `"OwnershipHandoverRequested"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWatchNamedLadyRendererOwnershipHandoverRequestedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    eventName: 'OwnershipHandoverRequested',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWatchNamedLadyRendererOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link namedLadyRendererAbi}__ and `eventName` set to `"RolesUpdated"`
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC7A29659c34CB2551Aec0dc589e6450aF342bf24)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xDaE12D4fB5d0A173cEf2f8C69e5Dd32280f71c9a)
 */
export const useWatchNamedLadyRendererRolesUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: namedLadyRendererAbi,
    address: namedLadyRendererAddress,
    eventName: 'RolesUpdated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGas = /*#__PURE__*/ createUseReadContract({
  abi: onChainCheckGasAbi,
  address: onChainCheckGasAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"availableMint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasAvailableMint =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'availableMint',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"claimed"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasClaimed =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'claimed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"cost"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasCost = /*#__PURE__*/ createUseReadContract({
  abi: onChainCheckGasAbi,
  address: onChainCheckGasAddress,
  functionName: 'cost',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"explicitOwnershipOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasExplicitOwnershipOf =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'explicitOwnershipOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"explicitOwnershipsOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasExplicitOwnershipsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'explicitOwnershipsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"getApproved"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"getGasPriceAtMint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasGetGasPriceAtMint =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'getGasPriceAtMint',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"getTokenSeed"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasGetTokenSeed =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'getTokenSeed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"maxMint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasMaxMint =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'maxMint',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasName = /*#__PURE__*/ createUseReadContract({
  abi: onChainCheckGasAbi,
  address: onChainCheckGasAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasOwner = /*#__PURE__*/ createUseReadContract({
  abi: onChainCheckGasAbi,
  address: onChainCheckGasAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"ownerOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'ownerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"publicSaleActive"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasPublicSaleActive =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'publicSaleActive',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasSymbol = /*#__PURE__*/ createUseReadContract(
  {
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'symbol',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"tokenURI"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasTokenUri =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'tokenURI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"tokensOfOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasTokensOfOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'tokensOfOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"tokensOfOwnerIn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasTokensOfOwnerIn =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'tokensOfOwnerIn',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useReadOnChainCheckGasTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainCheckGasAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWriteOnChainCheckGas = /*#__PURE__*/ createUseWriteContract({
  abi: onChainCheckGasAbi,
  address: onChainCheckGasAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWriteOnChainCheckGasApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"claim"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWriteOnChainCheckGasClaim =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'claim',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"claimAndMint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWriteOnChainCheckGasClaimAndMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'claimAndMint',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"gift"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWriteOnChainCheckGasGift = /*#__PURE__*/ createUseWriteContract(
  {
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'gift',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWriteOnChainCheckGasMint = /*#__PURE__*/ createUseWriteContract(
  {
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'mint',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWriteOnChainCheckGasRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWriteOnChainCheckGasSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWriteOnChainCheckGasSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"setCost"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWriteOnChainCheckGasSetCost =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'setCost',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"setMintActive"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWriteOnChainCheckGasSetMintActive =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'setMintActive',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWriteOnChainCheckGasTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWriteOnChainCheckGasTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWriteOnChainCheckGasWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainCheckGasAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useSimulateOnChainCheckGas =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useSimulateOnChainCheckGasApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"claim"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useSimulateOnChainCheckGasClaim =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'claim',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"claimAndMint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useSimulateOnChainCheckGasClaimAndMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'claimAndMint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"gift"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useSimulateOnChainCheckGasGift =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'gift',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useSimulateOnChainCheckGasMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useSimulateOnChainCheckGasRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useSimulateOnChainCheckGasSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useSimulateOnChainCheckGasSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"setCost"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useSimulateOnChainCheckGasSetCost =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'setCost',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"setMintActive"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useSimulateOnChainCheckGasSetMintActive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'setMintActive',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useSimulateOnChainCheckGasTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useSimulateOnChainCheckGasTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useSimulateOnChainCheckGasWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link onChainCheckGasAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWatchOnChainCheckGasEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWatchOnChainCheckGasApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWatchOnChainCheckGasApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `eventName` set to `"ConsecutiveTransfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWatchOnChainCheckGasConsecutiveTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    eventName: 'ConsecutiveTransfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWatchOnChainCheckGasOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link onChainCheckGasAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9489bB7Ba72Dc427D559956008e3F3aE84897D5D)
 */
export const useWatchOnChainCheckGasTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: onChainCheckGasAbi,
    address: onChainCheckGasAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGas = /*#__PURE__*/ createUseReadContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"availableMint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasAvailableMint =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'availableMint',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"cost"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasCost = /*#__PURE__*/ createUseReadContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
  functionName: 'cost',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"explicitOwnershipOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasExplicitOwnershipOf =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'explicitOwnershipOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"explicitOwnershipsOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasExplicitOwnershipsOf =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'explicitOwnershipsOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"getApproved"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasGetApproved = /*#__PURE__*/ createUseReadContract(
  {
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'getApproved',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"getTokenSeed"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasGetTokenSeed =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'getTokenSeed',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"maxMint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasMaxMint = /*#__PURE__*/ createUseReadContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
  functionName: 'maxMint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"maxSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasMaxSupply = /*#__PURE__*/ createUseReadContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
  functionName: 'maxSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasName = /*#__PURE__*/ createUseReadContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasOwner = /*#__PURE__*/ createUseReadContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"ownerOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"publicSaleActive"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasPublicSaleActive =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'publicSaleActive',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasSymbol = /*#__PURE__*/ createUseReadContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"tokenURI"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"tokensOfOwner"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasTokensOfOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'tokensOfOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"tokensOfOwnerIn"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasTokensOfOwnerIn =
  /*#__PURE__*/ createUseReadContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'tokensOfOwnerIn',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useReadOnChainGasTotalSupply = /*#__PURE__*/ createUseReadContract(
  {
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'totalSupply',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainGasAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWriteOnChainGas = /*#__PURE__*/ createUseWriteContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWriteOnChainGasApprove = /*#__PURE__*/ createUseWriteContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"gift"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWriteOnChainGasGift = /*#__PURE__*/ createUseWriteContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
  functionName: 'gift',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWriteOnChainGasMint = /*#__PURE__*/ createUseWriteContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWriteOnChainGasRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWriteOnChainGasSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWriteOnChainGasSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"setCost"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWriteOnChainGasSetCost = /*#__PURE__*/ createUseWriteContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
  functionName: 'setCost',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"setMintActive"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWriteOnChainGasSetMintActive =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'setMintActive',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"setRpc"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWriteOnChainGasSetRpc = /*#__PURE__*/ createUseWriteContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
  functionName: 'setRpc',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWriteOnChainGasTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWriteOnChainGasTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWriteOnChainGasWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainGasAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useSimulateOnChainGas = /*#__PURE__*/ createUseSimulateContract({
  abi: onChainGasAbi,
  address: onChainGasAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useSimulateOnChainGasApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"gift"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useSimulateOnChainGasGift =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'gift',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"mint"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useSimulateOnChainGasMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useSimulateOnChainGasRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useSimulateOnChainGasSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useSimulateOnChainGasSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"setCost"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useSimulateOnChainGasSetCost =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'setCost',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"setMintActive"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useSimulateOnChainGasSetMintActive =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'setMintActive',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"setRpc"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useSimulateOnChainGasSetRpc =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'setRpc',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useSimulateOnChainGasTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useSimulateOnChainGasTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link onChainGasAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useSimulateOnChainGasWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link onChainGasAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWatchOnChainGasEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: onChainGasAbi,
    address: onChainGasAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link onChainGasAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWatchOnChainGasApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link onChainGasAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWatchOnChainGasApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link onChainGasAbi}__ and `eventName` set to `"ConsecutiveTransfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWatchOnChainGasConsecutiveTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    eventName: 'ConsecutiveTransfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link onChainGasAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWatchOnChainGasOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link onChainGasAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x25ec84abe25174650220b83841e0cfb39d8aab87)
 */
export const useWatchOnChainGasTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: onChainGasAbi,
    address: onChainGasAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNft = /*#__PURE__*/ createUseReadContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"EMIT_METADATA_ROLE"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftEmitMetadataRole =
  /*#__PURE__*/ createUseReadContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'EMIT_METADATA_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"OPERATOR_FILTER_REGISTRY"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftOperatorFilterRegistry =
  /*#__PURE__*/ createUseReadContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'OPERATOR_FILTER_REGISTRY',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"TREASURER_ROLE"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftTreasurerRole =
  /*#__PURE__*/ createUseReadContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'TREASURER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"UPDATE_RENDERER_ROLE"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftUpdateRendererRole =
  /*#__PURE__*/ createUseReadContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'UPDATE_RENDERER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"claimed"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftClaimed = /*#__PURE__*/ createUseReadContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'claimed',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"contractURI"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftContractUri = /*#__PURE__*/ createUseReadContract(
  {
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'contractURI',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"defaultRoyaltyInfo"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftDefaultRoyaltyInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'defaultRoyaltyInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"getApproved"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftGetApproved = /*#__PURE__*/ createUseReadContract(
  {
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'getApproved',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"hasRole"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftHasRole = /*#__PURE__*/ createUseReadContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"isWrapped"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftIsWrapped = /*#__PURE__*/ createUseReadContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'isWrapped',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftName = /*#__PURE__*/ createUseReadContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftOwner = /*#__PURE__*/ createUseReadContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"ownerOf"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"pendingOwner"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftPendingOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"renderer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftRenderer = /*#__PURE__*/ createUseReadContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'renderer',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"royaltyInfo"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftRoyaltyInfo = /*#__PURE__*/ createUseReadContract(
  {
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'royaltyInfo',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftSymbol = /*#__PURE__*/ createUseReadContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"tokenURI"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"wrapCost"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftWrapCost = /*#__PURE__*/ createUseReadContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'wrapCost',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"wrappedNft"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useReadWrappedNftWrappedNft = /*#__PURE__*/ createUseReadContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'wrappedNft',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNft = /*#__PURE__*/ createUseWriteContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftAcceptOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftApprove = /*#__PURE__*/ createUseWriteContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"emitMetadataUpdate"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftEmitMetadataUpdate =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'emitMetadataUpdate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"grantRole"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftGrantRole = /*#__PURE__*/ createUseWriteContract(
  { abi: wrappedNftAbi, address: wrappedNftAddress, functionName: 'grantRole' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"onERC721Received"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftOnErc721Received =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"renounceRole"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"revokeRole"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"setContractURI"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftSetContractUri =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'setContractURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"setDefaultRoyalty"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftSetDefaultRoyalty =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'setDefaultRoyalty',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"setRenderer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftSetRenderer =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'setRenderer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"setWrapCost"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftSetWrapCost =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'setWrapCost',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"unwrap"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftUnwrap = /*#__PURE__*/ createUseWriteContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'unwrap',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"unwrapMany"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftUnwrapMany =
  /*#__PURE__*/ createUseWriteContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'unwrapMany',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"wrap"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftWrap = /*#__PURE__*/ createUseWriteContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'wrap',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"wrapTo"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWriteWrappedNftWrapTo = /*#__PURE__*/ createUseWriteContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
  functionName: 'wrapTo',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNft = /*#__PURE__*/ createUseSimulateContract({
  abi: wrappedNftAbi,
  address: wrappedNftAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"acceptOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftAcceptOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"emitMetadataUpdate"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftEmitMetadataUpdate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'emitMetadataUpdate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"grantRole"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"onERC721Received"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftOnErc721Received =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"renounceRole"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"revokeRole"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"setContractURI"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftSetContractUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'setContractURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"setDefaultRoyalty"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftSetDefaultRoyalty =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'setDefaultRoyalty',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"setRenderer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftSetRenderer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'setRenderer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"setWrapCost"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftSetWrapCost =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'setWrapCost',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"unwrap"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftUnwrap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'unwrap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"unwrapMany"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftUnwrapMany =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'unwrapMany',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"withdraw"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"wrap"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftWrap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'wrap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wrappedNftAbi}__ and `functionName` set to `"wrapTo"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useSimulateWrappedNftWrapTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    functionName: 'wrapTo',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wrappedNftAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWatchWrappedNftEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wrappedNftAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWatchWrappedNftApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wrappedNftAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWatchWrappedNftApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wrappedNftAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWatchWrappedNftBatchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wrappedNftAbi}__ and `eventName` set to `"MetadataUpdate"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWatchWrappedNftMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wrappedNftAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWatchWrappedNftOwnershipTransferStartedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wrappedNftAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWatchWrappedNftOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wrappedNftAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWatchWrappedNftRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wrappedNftAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWatchWrappedNftRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wrappedNftAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWatchWrappedNftRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wrappedNftAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x9EFf37047657a0f50b989165b48012834eDB2212)
 */
export const useWatchWrappedNftTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wrappedNftAbi,
    address: wrappedNftAddress,
    eventName: 'Transfer',
  })
