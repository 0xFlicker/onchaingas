import { useState, useEffect, useMemo } from "react";
import { useAccount } from "wagmi";
import { toHex, keccak256 } from "viem";

export function useProof() {
  const { address } = useAccount();
  const [proof, setProof] = useState<`0x${string}`[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!address) {
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`/fame/proof/${address}`)
      .then((res) => res.json())
      .then((data) => setProof(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [address]);

  const leaf = useMemo(
    () => (address ? keccak256(toHex(address)) : null),
    [address],
  );

  return {
    proof,
    leaf,
    loading,
    error,
  };
}
