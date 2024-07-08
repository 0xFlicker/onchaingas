import React, {
  ChangeEventHandler,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import * as sentry from "@sentry/nextjs";
import Grid2 from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { useNotifications } from "@/features/notifications/Context";
import { fameSaleAbi, fameSaleTokenAbi } from "@/wagmi";
import {
  useAccount,
  useBalance,
  useChainId,
  useReadContracts,
  useWriteContract,
} from "wagmi";
import { useProof } from "../hooks/useProof";
import {
  ContractFunctionExecutionError,
  formatEther,
  formatUnits,
  parseUnits,
} from "viem";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import { WrappedLink } from "@/components/WrappedLink";
import { Transaction, TransactionsModal } from "./TransactionsModal";

import { styled } from "@mui/material/styles";
import MuiInput from "@mui/material/Input";
import { shortenHash } from "@/utils/hash";
import { ThankYouCard } from "./ThankYouCard";
import { fameSaleAddress, fameSaleTokenAddress } from "../contract";
import { ContributionGauge } from "./ContributionGauge";
import { useAllocation } from "@/features/claim/hooks/useAllocation";
import { ClaimEnoughModal } from "./ClaimEnoughModal";

const Input = styled(MuiInput)`
  width: 96px;
`;

const bigIntMax = (...args: bigint[]) => args.reduce((m, e) => (e > m ? e : m));
const bigIntMin = (...args: bigint[]) => args.reduce((m, e) => (e < m ? e : m));

function formatUnit(amount: bigint) {
  return Math.floor(Number(formatUnits(amount, 18)));
}

export const PresaleCard: FC<{}> = () => {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [requestBuy, setRequestBuy] = useState<bigint>(0n);

  const { address, chain } = useAccount();
  const chainId = useChainId() as 11155111 | 8453;
  const { proof } = useProof();

  const { total } = useAllocation({
    address,
    rankBoost: 3,
    ageBoost: 1.5,
  });

  const { data: userBalance } = useBalance({
    address,
  });

  const {
    data: [
      remaining,
      canProve,
      maxBuy,
      paused,
      currentBalance,
      totalSupply,
      maxRaise,
    ] = [],
    refetch,
  } = useReadContracts({
    contracts: [
      {
        abi: fameSaleAbi,
        address: fameSaleAddress(chainId),
        functionName: "raiseRemaining",
      },
      {
        abi: fameSaleAbi,
        address: fameSaleAddress(chainId),
        functionName: "canProve",
        args: proof && address ? [proof, address] : undefined,
      },
      {
        abi: fameSaleAbi,
        address: fameSaleAddress(chainId),
        functionName: "maxBuy",
      },
      {
        abi: fameSaleAbi,
        address: fameSaleAddress(chainId),
        functionName: "isPaused",
      },
      {
        abi: fameSaleTokenAbi,
        address: fameSaleTokenAddress(chainId),
        functionName: "balanceOf",
        args: address ? [address] : undefined,
      },
      {
        abi: fameSaleAbi,
        address: fameSaleAddress(chainId),
        functionName: "fameTotalSupply",
      },
      {
        abi: fameSaleAbi,
        address: fameSaleAddress(chainId),
        functionName: "maxRaise",
      },
    ],
  });

  const totalRaiseContributed =
    totalSupply?.status === "success"
      ? Number(formatEther(totalSupply.result))
      : 0;
  const maxAvailableRaise =
    maxRaise?.status === "success" ? Number(formatEther(maxRaise.result)) : 6;

  const totalPersonalContributed =
    currentBalance?.status === "success"
      ? Number(formatEther(currentBalance.result))
      : 0;
  const maxPersonal =
    maxBuy?.status === "success" ? Number(formatEther(maxBuy.result)) : 1;

  const remainingBuy =
    currentBalance?.status === "success" &&
    remaining?.status === "success" &&
    maxBuy?.status === "success" &&
    canProve?.status === "success"
      ? bigIntMin(remaining.result, maxBuy.result - currentBalance.result)
      : 0n;

  const isValidBuy = requestBuy > 0n && requestBuy <= remainingBuy;

  const {
    writeContractAsync: writeFameSaleBuy,
    status: writeFameSaleBuyStatus,
  } = useWriteContract();

  // false means user has not requested a transaction
  // null means we want a transaction but can't send it yet
  // `0x` means we have a transaction hash
  const [isPendingTransaction, setIsPendingTransaction] = useState<
    false | null | Transaction[]
  >(false);
  const { addNotification, removeNotification } = useNotifications();
  const onBuy = useCallback(async () => {
    if (isValidBuy && !proof) {
      setIsPendingTransaction(null);
      return;
    }
    if (isValidBuy && proof && writeFameSaleBuyStatus !== "pending") {
      try {
        const result = await writeFameSaleBuy({
          abi: fameSaleAbi,
          address: fameSaleAddress(chainId),
          functionName: "buy",
          args: [proof],
          value: requestBuy,
        });
        setIsPendingTransaction([
          {
            hash: result,
            kind: "buy",
          },
        ]);
        addNotification({
          id: "buy-pending",
          message: chain?.blockExplorers?.default.url ? (
            <Typography color="black">
              transaction submitted{" "}
              <WrappedLink
                href={`${chain?.blockExplorers?.default.url}/tx/${result}`}
              >
                {shortenHash(result, 4)}
              </WrappedLink>
            </Typography>
          ) : (
            "transaction submitted"
          ),
          type: "success",
          autoHideMs: 5000,
        });
      } catch (e: unknown) {
        console.error(e);
        sentry.captureException(e);
        if (e instanceof ContractFunctionExecutionError) {
          // console.log(JSON.stringify(e, null, 2));
          const result = (
            e.cause as unknown as {
              data?: {
                errorName?: string;
              };
            }
          ).data;
          if (result?.errorName === "Paused") {
            return addNotification({
              id: "buy-error",
              message: "presale paused",
              type: "error",
              autoHideMs: 5000,
            });
          }
          return addNotification({
            id: "buy-error",
            message: "transaction reverted",
            type: "error",
            autoHideMs: 5000,
          });
        }
        addNotification({
          id: "buy-error",
          message: "transaction error",
          type: "error",
          autoHideMs: 5000,
        });
      }
    }
  }, [
    isValidBuy,
    proof,
    writeFameSaleBuyStatus,
    writeFameSaleBuy,
    chainId,
    requestBuy,
    addNotification,
    chain?.blockExplorers?.default.url,
  ]);

  const onCloseTransactionModal = useCallback(() => {}, []);

  const onTransactionConfirmed = useCallback(() => {
    removeNotification("buy-pending");
    addNotification({
      id: "buy-confirmed",
      message: "transaction confirmed",
      type: "success",
      autoHideMs: 2000,
    });
    setIsPendingTransaction(false);
    refetch();
  }, [addNotification, refetch, removeNotification]);
  useEffect(() => {
    if (isPendingTransaction === null && proof) {
      onBuy();
    }
  }, [isPendingTransaction, proof, onBuy]);

  const hasFullContribution =
    currentBalance?.status === "success" &&
    maxBuy?.status === "success" &&
    currentBalance.result === maxBuy.result;

  const onBuyClick = useCallback(() => setIsBuyModalOpen(true), []);
  const onCloseModal = useCallback(() => setIsBuyModalOpen(false), []);

  return (
    <>
      <Grid2 xs={12}>
        <Card>
          <CardHeader title="Presale status" />
          <CardContent>
            <>
              {currentBalance?.status === "success" &&
                maxBuy?.status === "success" &&
                canProve?.status === "success" &&
                currentBalance.result < maxBuy.result && (
                  <Typography variant="body1">
                    {canProve.result
                      ? "You are allowed to participate in the presale."
                      : "Your address is not allowed to participate in the presale."}
                  </Typography>
                )}

              {currentBalance?.status === "success" &&
                maxBuy?.status === "success" &&
                currentBalance.result >= maxBuy.result && (
                  <Typography variant="body1">
                    You have already contributed the maximum amount.
                  </Typography>
                )}
              {remaining?.status === "success" && remaining.result > 0n && (
                <Typography variant="body1">
                  {paused?.result
                    ? "The presale is paused."
                    : "The presale is currently running."}
                </Typography>
              )}
              {remaining?.status === "success" && remaining.result === 0n && (
                <Typography variant="body1">The presale is full.</Typography>
              )}
            </>
          </CardContent>
        </Card>
      </Grid2>
      {canProve?.status === "success" && canProve.result && (
        <Grid2 xs={12}>
          <Card>
            <CardHeader title="Presale" />
            {hasFullContribution ? (
              <ThankYouCard />
            ) : (
              <>
                <CardContent>
                  <Typography variant="body2" component="p">
                    Your current free claim allocation:{" "}
                    {formatUnit(total).toLocaleString()} $FAME
                  </Typography>
                  <Typography variant="body2" component="p">
                    Your max remaining contribution: {formatEther(remainingBuy)}{" "}
                    E
                  </Typography>
                  <Typography variant="body2" component="p">
                    Your wallet balance: {formatEther(userBalance?.value ?? 0n)}{" "}
                    E
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={onBuyClick}>buy</Button>
                </CardActions>
              </>
            )}
          </Card>
        </Grid2>
      )}
      <Grid2 xs={12} md={6}>
        <Card>
          <CardHeader title="Your contribution" />
          <CardContent>
            <ContributionGauge
              value={totalPersonalContributed}
              step={0.05}
              min={0}
              max={maxPersonal}
              formatStepLabel={(value) => `${value} E`}
            />
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 xs={12} md={6}>
        <Card>
          <CardHeader title="Presale progress" />
          <CardContent>
            <ContributionGauge
              value={totalRaiseContributed}
              step={0.5}
              min={0}
              max={maxAvailableRaise}
              formatStepLabel={(value) => `${value} E`}
            />
          </CardContent>
        </Card>
      </Grid2>

      <TransactionsModal
        open={!!isPendingTransaction}
        onClose={onCloseTransactionModal}
        transactions={isPendingTransaction ? isPendingTransaction : []}
        onTransactionConfirmed={onTransactionConfirmed}
      />
      {isBuyModalOpen && (
        <ClaimEnoughModal
          currentBuyin={currentBalance?.result ?? 0n}
          remainingBuy={remainingBuy}
          totalAllocation={total}
          maxRaise={maxRaise?.result ?? 0n}
          onUpdateBuy={(value) => {
            if (value) {
              setRequestBuy(value);
            }
          }}
          onClose={onCloseModal}
          onBuy={onBuy}
        />
      )}
    </>
  );
};
