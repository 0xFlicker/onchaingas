import { useEffect, useMemo, useState } from "react";
import {
  execute,
  SepoliaTokenByOwnerQuery,
  getBuiltGraphSDK,
  MainnetTokenByOwnerQuery,
  MainnetTokenByOwnerQueryVariables,
} from "@/graphclient";
import { useAccount } from "wagmi";

export function useLadies({
  owner,
  first = 100,
  skip,
  sorted,
  chainId: defaultChainId,
}: {
  owner?: `0x${string}`;
  first?: number;
  skip?: number;
  sorted?: "asc" | "desc";
  chainId?: number;
}) {
  const { chainId: accountChainId } = useAccount();

  const [data, setData] = useState<
    SepoliaTokenByOwnerQuery | MainnetTokenByOwnerQuery
  >();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(true);
  const chainId = defaultChainId ?? accountChainId;
  useEffect(() => {
    if (owner) {
      setIsLoading(true);
      const sdk = getBuiltGraphSDK();

      const action: (
        v: MainnetTokenByOwnerQueryVariables,
      ) => Promise<MainnetTokenByOwnerQuery | SepoliaTokenByOwnerQuery> =
        chainId === 1
          ? sdk.MainnetTokenByOwner.bind(sdk)
          : chainId === 11155111
            ? sdk.SepoliaTokenByOwner.bind(sdk)
            : undefined;
      if (!action) {
        throw new Error("Unsupported chainId");
      }
      action({ owner, first, skip: skip ?? 0, orderDirection: sorted ?? "asc" })
        .then((result) => {
          setData(result);
        })
        .catch((e) => {
          setError(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [chainId, first, owner, setData, skip, sorted]);

  const lookup =
    chainId === 1
      ? "ownerships"
      : chainId === 11155111
        ? "sepolia_ownerships"
        : undefined;
  const tokenIds = useMemo(() => {
    const t =
      (lookup &&
        (data?.[lookup] as MainnetTokenByOwnerQuery["ownerships"] | undefined)
          ?.filter(
            (o) => o?.tokenId !== null || typeof o?.tokenId !== "undefined",
          )
          .map((o) => BigInt(o.tokenId.toString()))) ??
      [];
    return t;
  }, [data, lookup]);
  return { data: tokenIds, error, isLoading };
}
