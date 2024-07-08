import React, { FC, useCallback, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { claimToFameAbi, fameAbi } from "@/wagmi";
import { claimToFameFromNetwork } from "../contracts";
import { fameFromNetwork } from "@/features/fame/contract";
import {
  ContractFunctionExecutionError,
  parseUnits,
  encodeFunctionData,
} from "viem";
import {
  useReadContracts,
  useWriteContract,
  useAccount,
  useSimulateContract,
} from "wagmi";
import { base, sepolia } from "viem/chains";
import { useClaim } from "../hooks/useClaim";
import { formatFame } from "@/utils/fame";
import { useNotifications } from "@/features/notifications/Context";
import { TransactionProgress } from "@/components/TransactionProgress";
import { Claim } from "@/app/api/[network]/[contractAddress]/claim/route";

export const ClaimCard: FC<{
  chainId: typeof sepolia.id | typeof base.id;
  contractAddress: `0x${string}`;
  tokenIds: number[];
  title?: string;
}> = ({ chainId, contractAddress, tokenIds, title }) => {
  const { addNotification } = useNotifications();
  const { address } = useAccount();

  const {
    data: [signatureNonces, isClaimedBatch] = [],
    isLoading: isReadContractLoading,
    refetch,
    error: readContractError,
  } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        abi: claimToFameAbi,
        address: claimToFameFromNetwork(chainId),
        functionName: "signatureNonces",
        chainId,
        args: address ? [address] : undefined,
      },
      {
        abi: claimToFameAbi,
        address: claimToFameFromNetwork(chainId),
        functionName: "isClaimedBatch",
        chainId,
        args: [contractAddress, tokenIds.map(BigInt)],
      },
    ],
  });

  const {
    writeContract,
    isPending: isWritePending,
    data: hash,
    isError: isWriteError,
    error: writeError,
    reset,
  } = useWriteContract();

  useEffect(() => {
    if (writeError instanceof ContractFunctionExecutionError) {
      addNotification({
        message: "Transaction simulation failed",
        id: "claim-error",
        type: "error",
      });
    } else if (writeError) {
      console.error(writeError);
      addNotification({
        message: writeError.message,
        id: "claim-error",
        type: "error",
      });
    }
  }, [writeError, addNotification]);

  const notYetClaimedTokenIds = useMemo(
    () =>
      isClaimedBatch?.length === tokenIds.length
        ? tokenIds.filter((_, index) => !isClaimedBatch[index])
        : undefined,
    [isClaimedBatch, tokenIds]
  );

  const { data: claimData, isLoading: isClaimLoading } = useClaim({
    chainId,
    contractAddress,
    address,
    tokenIds: notYetClaimedTokenIds ?? [],
  });

  console.log({
    tokenIds,
    notYetClaimedTokenIds,
    isClaimedBatch,
    claimData,
  });

  // for all claim data, find the claims that are equal to or greater than the current nonce and sort ascending so that the first claim is the next claim
  const unconfirmedClaim = useMemo(() => {
    if (typeof signatureNonces === "undefined") {
      return null;
    }
    if (!claimData?.claims) {
      return null;
    }
    const sg = Number(signatureNonces);
    //  claimData.claims
    // .filter((claim) => claim.nonce >= sg)
    // .sort((a, b) => a.nonce - b.nonce);
    let lestClaim: Claim | null = null;
    for (const claim of claimData.claims) {
      if (claim.nonce >= sg) {
        if (!lestClaim) {
          lestClaim = claim;
        } else if (claim.nonce < lestClaim.nonce) {
          lestClaim = claim;
        }
      }
    }
    return lestClaim;
  }, [claimData, signatureNonces]);

  const {
    data: simulateContractClaim,
    isError: isSimulationError,
    error: simulationError,
  } = useSimulateContract({
    abi: claimToFameAbi,
    chainId,
    address: claimToFameFromNetwork(chainId),
    functionName: "claimWithTokens",
    args: unconfirmedClaim
      ? ([
          unconfirmedClaim.address,
          contractAddress,
          parseUnits(unconfirmedClaim.amount, 18),
          BigInt(unconfirmedClaim.deadlineSeconds),
          unconfirmedClaim.tokenIds,
          unconfirmedClaim.signature,
        ] as const)
      : undefined,
  });

  const onClaim = useCallback(() => {
    if (notYetClaimedTokenIds && address && unconfirmedClaim) {
      console.log(
        `Submitting data: ${encodeFunctionData({
          abi: claimToFameAbi,
          functionName: "claimWithTokens",
          args: [
            unconfirmedClaim.address,
            contractAddress,
            parseUnits(unconfirmedClaim.amount, 18),
            BigInt(unconfirmedClaim.deadlineSeconds),
            unconfirmedClaim.tokenIds,
            unconfirmedClaim.signature,
          ],
        })}`
      );
      writeContract({
        abi: claimToFameAbi,
        chainId,
        address: claimToFameFromNetwork(chainId),
        functionName: "claimWithTokens",
        /*
          address account,
          uint256 amount,
          uint256 deadline,
          uint16[] calldata tokenIds,
          bytes calldata signature
        */
        args: [
          unconfirmedClaim.address,
          contractAddress,
          parseUnits(unconfirmedClaim.amount, 18),
          BigInt(unconfirmedClaim.deadlineSeconds),
          unconfirmedClaim.tokenIds,
          unconfirmedClaim.signature,
        ],
      });
      addNotification({
        message: "Submitting claim to wallet",
        id: "claim-submit",
        type: "info",
        autoHideMs: 2000,
      });
    } else {
      addNotification({
        message: "Unable to claim",
        id: "claim-error",
        type: "error",
      });
    }
  }, [
    notYetClaimedTokenIds,
    address,
    unconfirmedClaim,
    contractAddress,
    writeContract,
    chainId,
    addNotification,
  ]);

  const onSubmitted = useCallback(() => {
    refetch();
    reset();
  }, [refetch, reset]);

  return (
    <>
      <Card>
        <CardHeader title={title ?? "Claim"} />
        <CardContent>
          {isClaimLoading ? (
            <Typography variant="body1" marginY={2}>
              Fetching claim data...
            </Typography>
          ) : null}
          {!isSimulationError && unconfirmedClaim ? (
            <Typography variant="body1" marginY={2}>
              Claiming {formatFame(parseUnits(unconfirmedClaim.amount, 18))}
            </Typography>
          ) : null}
          {notYetClaimedTokenIds?.length && isSimulationError ? (
            <Typography variant="body1" color="red" marginY={2}>
              Simulation failed....
            </Typography>
          ) : null}
          {hash ? (
            <TransactionProgress
              transactionHash={hash}
              onConfirmed={onSubmitted}
            />
          ) : (
            <Box component="div" height={32} />
          )}
        </CardContent>
        <CardActions>
          <Button
            onClick={onClaim}
            disabled={
              !!hash ||
              !notYetClaimedTokenIds ||
              notYetClaimedTokenIds?.length === 0 ||
              !address ||
              isClaimLoading ||
              isWritePending
            }
          >
            {notYetClaimedTokenIds && notYetClaimedTokenIds.length
              ? `Claim ${notYetClaimedTokenIds.length} token${notYetClaimedTokenIds.length > 1 ? "s" : ""}`
              : "no claim available"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
