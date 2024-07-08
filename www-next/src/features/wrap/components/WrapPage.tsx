import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { MintCard } from "@/features/wrap/components/MintCard";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import useLocalStorage from "use-local-storage";
import { AgreeModal } from "@/features/wrap/components/AgreeModal";
import {
  bulkMinterAbi,
  bulkMinterAddress,
  fameLadySquadAddress,
  fameLadySquadAbi,
} from "@/wagmi";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
} from "wagmi";
import { WriteContractData } from "wagmi/query";
import { useRouter } from "next/navigation";
import { WrapCard } from "./WrapCard";
import { TurboWrap } from "./TurboWrap";
import { TransactionsModal } from "./TransactionsModal";
import { Transaction } from "../types";
import { UnwrapCard } from "./UnwrapCard";
import { useChainContracts } from "@/hooks/useChainContracts";
import { useNotifications } from "@/features/notifications/Context";
import { ContractFunctionRevertedError, UserRejectedRequestError } from "viem";

export const WrapPage: FC<{
  network: "mainnet" | "sepolia";
}> = ({ network }) => {
  const router = useRouter();
  const { address, chain } = useAccount();
  const [hasAgreed, setHasAgreed] = useLocalStorage("agree-to-risk", false);
  const [nonce, setNonce] = useState<number>(0);
  const { addNotification } = useNotifications();
  const { writeContractAsync } = useWriteContract({
    mutation: {
      onError: (e) => {
        let message = e.message;
        if (e.cause instanceof UserRejectedRequestError) {
          message = e.cause.details;
        } else if (e.cause instanceof ContractFunctionRevertedError) {
          message = e.cause.shortMessage;
        }
        addNotification({
          id: "error",
          message,
          type: "error",
          autoHideMs: 5000,
        });
        setNonce((n) => n + 1);
      },
    },
  });

  const [pendingTransactions, setPendingTransactions] = useState(false);
  const [activeTransactionHashList, setActiveTransactionHashList] = useState<
    Transaction<unknown>[]
  >([]);
  const [completedTransactionHashList, setCompletedTransactionHashList] =
    useState<{ kind: string; hash: WriteContractData }[]>([]);
  useEffect(() => {
    if (activeTransactionHashList.length > 0) {
      setPendingTransactions(true);
    } else {
      setPendingTransactions(false);
    }
  }, [activeTransactionHashList]);

  const mintTransactionInProgress = useMemo(() => {
    return activeTransactionHashList.some(
      (tx) => tx.kind === "mint testnet token",
    );
  }, [activeTransactionHashList]);

  const wrapTransactionInProgress = useMemo(() => {
    return activeTransactionHashList.some((tx) => tx.kind === "wrap");
  }, [activeTransactionHashList]);

  const unwrapTransactionInProgress = useMemo(() => {
    return activeTransactionHashList.some((tx) => tx.kind === "unwrap");
  }, [activeTransactionHashList]);

  const approveTransactionInProgress = useMemo(() => {
    return activeTransactionHashList.some(
      (tx) => tx.kind === "approve collection to be wrapped",
    );
  }, [activeTransactionHashList]);

  const closeTransactionModal = useCallback(() => {
    setPendingTransactions(false);
  }, []);

  const {
    targetContractAbi: targetNftAbi,
    targetContractAddress: targetNftAddress,
    wrappedNftContractAbi: wrapperNftAbi,
    wrappedNftContractAddress: wrapperNftAddress,
  } = useChainContracts();

  const onMint = useCallback(
    async (count: bigint) => {
      if (writeContractAsync) {
        try {
          const response = await writeContractAsync({
            args: [count],
            abi: bulkMinterAbi,
            address: bulkMinterAddress[11155111],
            functionName: "mint",
          });
          setActiveTransactionHashList((r) => [
            ...r,
            {
              kind: "mint testnet token",
              hash: response,
            },
          ]);
        } catch (e) {
          console.error(e);
        }
      }
    },
    [writeContractAsync],
  );

  const isValidToCheckApproval = address && wrapperNftAddress !== undefined;

  const {
    data: isWrappedApprovedForAll,
    refetch: refetchWrappedIsApprovedForAll,
  } = useReadContract({
    abi: targetNftAbi,
    address: targetNftAddress,
    functionName: "isApprovedForAll",
    ...(isValidToCheckApproval && {
      args: [address, wrapperNftAddress],
    }),
  });

  // This only work on the test bulk minter contract, not fame lady squad
  const { data: ownedTestTokens, refetch: refetchTokens } = useReadContract({
    abi: bulkMinterAbi,
    address: chain?.id && bulkMinterAddress[chain?.id],
    functionName: "tokensOfOwner",
    args: address && [address],
  });

  // This is only needed for fame lady squad
  const { data: balanceOf } = useReadContract({
    abi: targetNftAbi,
    address: targetNftAddress,
    functionName: "balanceOf",
    ...(address !== undefined && {
      args: [address],
    }),
  });

  const { data: fameLadySquadTokens, refetch: refetchFameLadySquadTokens } =
    useReadContracts({
      contracts: Array.from({ length: balanceOf ? Number(balanceOf) : 0 })?.map(
        (_, index) => ({
          abi: fameLadySquadAbi,
          address: chain?.id && fameLadySquadAddress[chain?.id],
          functionName: "tokenOfOwnerByIndex",
          args: [address, BigInt(index)],
        }),
      ) as {
        abi: typeof fameLadySquadAbi;
        address: `0x${string}`;
        functionName: "tokenOfOwnerByIndex";
        args: [`0x${string}`, bigint];
      }[],
    });

  const tokenIds = useMemo(
    () =>
      ownedTestTokens ||
      (fameLadySquadTokens
        ?.filter((t) => t.status === "success")
        .map((t) => t.result!) ??
        []),
    [ownedTestTokens, fameLadySquadTokens],
  );

  const { data: wrapCost } = useReadContract({
    abi: wrapperNftAbi,
    address: wrapperNftAddress,
    functionName: "wrapCost",
  });

  const onWrapTo = useCallback(
    async ({
      args,
      value,
    }: {
      args: [`0x${string}`, bigint[]];
      value: bigint;
    }) => {
      if (writeContractAsync) {
        try {
          const response = await writeContractAsync({
            abi: wrapperNftAbi,
            address: wrapperNftAddress!,
            functionName: "wrapTo",
            args,
            value,
          });
          setActiveTransactionHashList((txs) => [
            ...txs,
            {
              kind: "wrap to",
              hash: response,
              context: args[0],
            },
          ]);
        } catch (e) {
          console.error(e);
        }
      }
    },
    [wrapperNftAbi, wrapperNftAddress, writeContractAsync],
  );

  const onWrap = useCallback(
    async ({ args, value }: { args: [bigint[]]; value: bigint }) => {
      if (writeContractAsync) {
        try {
          const response = await writeContractAsync({
            abi: wrapperNftAbi,
            address: wrapperNftAddress!,
            functionName: "wrap",
            args,
            value,
          });
          setActiveTransactionHashList((txs) => [
            ...txs,
            {
              kind: "wrap",
              hash: response,
              context: args[0],
            },
          ]);
        } catch (e) {
          console.error(e);
        }
      }
    },
    [wrapperNftAbi, wrapperNftAddress, writeContractAsync],
  );

  const onUnwrapMany = useCallback(
    async (args: [`0x${string}`, bigint[]]) => {
      if (writeContractAsync) {
        try {
          const response = await writeContractAsync({
            abi: wrapperNftAbi,
            address: wrapperNftAddress!,
            functionName: "unwrapMany",
            args,
          });
          setActiveTransactionHashList((txs) => [
            ...txs,
            {
              kind: "unwrap",
              hash: response,
            },
          ]);
        } catch (e) {
          console.error(e);
        }
      }
    },
    [wrapperNftAbi, wrapperNftAddress, writeContractAsync],
  );

  const onApprove = useCallback(async () => {
    if (writeContractAsync) {
      try {
        const response = await writeContractAsync({
          abi: targetNftAbi,
          address: targetNftAddress!,
          functionName: "setApprovalForAll",
          args: [wrapperNftAddress!, true],
        });
        setActiveTransactionHashList((txs) => [
          ...txs,
          {
            kind: "approve collection to be wrapped",
            hash: response,
          },
        ]);
      } catch (e) {
        console.error(e);
      }
    }
  }, [targetNftAbi, targetNftAddress, wrapperNftAddress, writeContractAsync]);

  const onTransactionConfirmed = useCallback(
    (tx: Transaction<unknown>) => {
      switch (tx.kind) {
        case "wrap": {
          const t = tx as Transaction<[bigint[]]>;
          setCompletedTransactionHashList((txs) => [
            ...txs,
            {
              kind: "wrapped tokens",
              hash: tx.hash,
            },
          ]);
          const params = new URLSearchParams();
          params.set("tokenIds", t.context!.map((t) => t.toString()).join(","));
          params.set("txHash", tx.hash ?? "");
          router.push(`/wrap/success?${params.toString()}`);
          break;
        }
        case "wrap to": {
          const t = tx as Transaction<[bigint[]]>;
          setCompletedTransactionHashList((txs) => [
            ...txs,
            {
              kind: "wrapped tokens",
              hash: tx.hash,
            },
          ]);
          const params = new URLSearchParams();
          params.set("tokenIds", t.context!.map((t) => t.toString()).join(","));
          params.set("txHash", tx.hash ?? "");
          router.push(`/wrap/success?${params.toString()}`);
          break;
        }
        case "approve collection to be wrapped": {
          setCompletedTransactionHashList((txs) => [
            ...txs,
            {
              kind: "approved tokens",
              hash: tx.hash,
            },
          ]);
          refetchWrappedIsApprovedForAll();
        }
        case "mint testnet token": {
          setCompletedTransactionHashList((txs) => [
            ...txs,
            {
              kind: "minted tokens",
              hash: tx.hash,
            },
          ]);
          refetchTokens();
        }
        case "unwrap": {
          setCompletedTransactionHashList((txs) => [
            ...txs,
            {
              kind: "unwrapped tokens",
              hash: tx.hash,
            },
          ]);
          refetchTokens();
          break;
        }
      }
      setActiveTransactionHashList((txs) =>
        txs.filter((t) => tx.hash !== t.hash),
      );
    },
    [refetchWrappedIsApprovedForAll, refetchTokens, router],
  );

  return (
    <>
      <Grid2 container spacing={2} maxWidth="lg" sx={{ mt: 6, mx: 4 }}>
        {network === "sepolia" ? (
          <Grid2 xs={12} sm={12} md={12}>
            <Box component="div" sx={{ mt: 4 }}>
              <MintCard
                onMint={onMint}
                transactionInProgress={mintTransactionInProgress}
              />
            </Box>
          </Grid2>
        ) : null}
        <Grid2 xs={12} sm={12} md={12}>
          <Box component="div" sx={{ mt: 4 }}>
            <TurboWrap
              isApprovedForAll={isWrappedApprovedForAll}
              onApprove={onApprove}
              tokenIds={tokenIds ?? []}
              wrapCost={wrapCost}
              onWrap={onWrap}
              onWrapTo={onWrapTo}
              transactionInProgress={
                wrapTransactionInProgress || approveTransactionInProgress
              }
              nonce={nonce}
            />
          </Box>
        </Grid2>
        <Grid2 xs={12} sm={12} md={12}>
          <Box component="div" sx={{ mt: 4 }}>
            <WrapCard
              isApprovedForAll={isWrappedApprovedForAll}
              onApprove={onApprove}
              tokenIds={tokenIds ?? []}
              wrapCost={wrapCost}
              onWrap={onWrap}
              onWrapTo={onWrapTo}
              transactionInProgress={
                wrapTransactionInProgress || approveTransactionInProgress
              }
              nonce={nonce}
            />
          </Box>
        </Grid2>
        <Grid2 xs={12} sm={12} md={12}>
          <Box component="div" sx={{ mt: 4 }}>
            <UnwrapCard
              onUnwrapMany={onUnwrapMany}
              transactionInProgress={unwrapTransactionInProgress}
            />
          </Box>
        </Grid2>
      </Grid2>
      {!hasAgreed && (
        <AgreeModal open={!hasAgreed} onClose={() => setHasAgreed(true)} />
      )}
      <TransactionsModal
        open={pendingTransactions}
        onClose={closeTransactionModal}
        transactions={activeTransactionHashList}
        onTransactionConfirmed={onTransactionConfirmed}
      />
    </>
  );
};
