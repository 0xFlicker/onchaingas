import { useAccount, useReadContract } from "wagmi";
import { useChainContracts } from "./useChainContracts";

const roleToBytes32 = (role: string): `0x${string}` => {
  switch (role) {
    case "TREASURER_ROLE":
      return "0x3496e2e73c4d42b75d702e60d9e48102720b8691234415963a5a857b86425d07";
    default:
      throw new Error("Unknown role");
  }
};

export function useHasRole(roleName: "TREASURER_ROLE") {
  const { address } = useAccount();
  const { wrappedNftContractAbi, wrappedNftContractAddress } =
    useChainContracts();

  const { data: hasRole, isLoading } = useReadContract({
    abi: wrappedNftContractAbi,
    address: wrappedNftContractAddress,
    functionName: "hasRole",
    args: address ? [roleToBytes32(roleName), address] : undefined,
  });
  return {
    hasRole,
    isLoading,
  };
}
