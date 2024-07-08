import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { useChainContracts } from "./useChainContracts";

export function useHasRoleOrOwner(roleName: "TREASURER_ROLE") {
  const { address } = useAccount();
  const { wrappedNftContractAbi, wrappedNftContractAddress } =
    useChainContracts();
  const { data: reads, isLoading: rolesIsLoading } = useReadContracts({
    contracts: [
      {
        abi: wrappedNftContractAbi,
        address: wrappedNftContractAddress,
        functionName: "owner",
      },
      {
        abi: wrappedNftContractAbi,
        address: wrappedNftContractAddress,
        functionName: roleName,
      },
    ],
  });
  let isOwner: `0x${string}` | undefined;
  let role: `0x${string}` | undefined;
  if (reads) {
    isOwner = reads[0].result;
    role = reads[1].result;
  }

  const { data: hasRole, isLoading: hasTreasurerRoleIsLoading } =
    useReadContract({
      abi: wrappedNftContractAbi,
      address: wrappedNftContractAddress,
      functionName: "hasRole",
      args: role && address ? [role, address] : undefined,
    });

  const isLoading = rolesIsLoading || hasTreasurerRoleIsLoading;

  return {
    hasRole: isOwner === address || hasRole,
    isLoading,
  };
}
