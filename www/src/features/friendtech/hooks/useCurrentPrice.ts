import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";

const FRIEND_TECH_SHARES_CONTRACT_ADDRESS =
  "0xcf205808ed36593aa40a44f10c7f7c2f67d4a4d4";
const ONE = BigNumber.from(1);

export function useCurrentPrice(address: `0x${string}`) {
  const { data: price } = useContractRead({
    chainId: 8453,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "sharesSubject",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "getBuyPrice",
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
    ] as const,
    address: FRIEND_TECH_SHARES_CONTRACT_ADDRESS,
    args: [address, ONE],
    functionName: "getBuyPrice",
  });

  return price;
}
