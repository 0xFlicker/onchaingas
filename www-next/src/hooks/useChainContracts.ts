import { useChainId } from "wagmi";
import {
  bulkMinterAbi,
  bulkMinterAddress,
  wrappedNftAbi,
  wrappedNftAddress,
  fameLadySquadAbi,
  fameLadySquadAddress,
  fameLadySocietyAbi,
  fameLadySocietyAddress,
  namedLadyRendererAbi,
  namedLadyRendererAddress,
} from "@/wagmi";

function isSupportChain(chainId: number): chainId is 1 | 11155111 {
  return [1, 11155111].includes(chainId);
}

export function useChainContracts(chainId?: number) {
  const detectedChainId = useChainId();
  if (chainId === undefined) {
    chainId = detectedChainId;
  }

  if (!isSupportChain(chainId)) {
    // return mainnet contracts for unsupported chains
    return {
      targetContractAbi: fameLadySquadAbi,
      targetContractAddress: fameLadySquadAddress[1],
      wrappedNftContractAbi: wrappedNftAbi,
      wrappedNftContractAddress: wrappedNftAddress[1],
      namedLadyRendererAbi,
      namedLadyRendererAddress: namedLadyRendererAddress[1],
    };
  }

  const targetContractAbi = chainId === 1 ? fameLadySquadAbi : bulkMinterAbi;
  const targetContractAddress =
    chainId === 1
      ? fameLadySquadAddress[chainId]
      : chainId === 11155111
        ? bulkMinterAddress[chainId]
        : undefined;
  const wrappedNftContractAbi =
    chainId === 1 ? wrappedNftAbi : fameLadySocietyAbi;
  const wrappedNftContractAddress =
    chainId === 1
      ? fameLadySocietyAddress[chainId]
      : chainId === 11155111
        ? wrappedNftAddress[chainId]
        : undefined;

  return {
    targetContractAbi,
    targetContractAddress,
    wrappedNftContractAbi,
    wrappedNftContractAddress,
    namedLadyRendererAbi,
    namedLadyRendererAddress: namedLadyRendererAddress[chainId] ?? undefined,
  };
}
