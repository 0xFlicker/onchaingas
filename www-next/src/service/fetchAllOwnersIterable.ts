import { client as mainnetClient } from "@/viem/mainnet-client";

const ABI = [
  {
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
] as const;

export async function fetchAllOwnersIterable({
  contractAddress,
}: {
  contractAddress: `0x${string}`;
}) {
  const totalSupply = await mainnetClient.readContract({
    abi: ABI,
    address: contractAddress,
    functionName: "totalSupply",
  });

  const ownerBalanceOfMap = new Map<`0x${string}`, number>();
  await Promise.all(
    Array.from({ length: Number(totalSupply) }).map(async (_, index) => {
      const owner = await mainnetClient.readContract({
        abi: ABI,
        address: contractAddress,
        functionName: "ownerOf",
        args: [BigInt(index + 1)],
      });
      ownerBalanceOfMap.set(owner, (ownerBalanceOfMap.get(owner) ?? 0) + 1);
    })
  );
  return ownerBalanceOfMap;
}
