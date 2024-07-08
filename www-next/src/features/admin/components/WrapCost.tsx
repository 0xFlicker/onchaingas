import React, { FC, useCallback, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircle from "@mui/icons-material/CheckCircle";
import DeniedIcon from "@mui/icons-material/NotInterested";
import { useChainContracts } from "@/hooks/useChainContracts";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
} from "wagmi";
import { TransactionsModal } from "@/features/wrap/components/TransactionsModal";
import { WriteContractData } from "wagmi/query";
import { Transaction } from "@/features/wrap/types";
import { useHasRole } from "@/hooks/useHasRole";
import { formatEther, parseEther } from "viem";

export const WrapCost: FC<{}> = ({}) => {
  const { address } = useAccount();
  const [pendingTransaction, setPendingTransaction] =
    useState<null | WriteContractData>(null);
  const [sendToInput, setSendToInput] = useState<string>();
  const { wrappedNftContractAbi, wrappedNftContractAddress } =
    useChainContracts();
  const {
    data: wrapCost,
    isLoading: wrapCostIsLoading,
    refetch: refetchWrapCost,
  } = useReadContract({
    abi: wrappedNftContractAbi,
    address: wrappedNftContractAddress,
    functionName: "wrapCost",
  });
  const { hasRole: hasTreasurerRole, isLoading } = useHasRole("TREASURER_ROLE");
  const { writeContractAsync } = useWriteContract();
  const isValidCostInput = !Number.isNaN(Number(sendToInput));
  const onSubmit = useCallback(() => {
    writeContractAsync({
      args: [parseEther(sendToInput!)],
      address: wrappedNftContractAddress!,
      abi: wrappedNftContractAbi,
      functionName: "setWrapCost",
    }).then((hash) => {
      setPendingTransaction(hash);
    });
  }, [
    sendToInput,
    wrappedNftContractAbi,
    wrappedNftContractAddress,
    writeContractAsync,
  ]);

  const closeTransactionModal = useCallback(() => {
    setPendingTransaction(null);
  }, [setPendingTransaction]);
  const onTransactionConfirmed = useCallback(() => {
    refetchWrapCost();
    setPendingTransaction(null);
  }, [refetchWrapCost, setPendingTransaction]);
  const pendingTransactions: Transaction[] = useMemo(() => {
    return pendingTransaction
      ? [
          {
            hash: pendingTransaction,
            kind: "set wrap cost",
          },
        ]
      : [];
  }, [pendingTransaction]);
  const endAdornment = useMemo(() => {
    if (isLoading) {
      return <CircularProgress color="inherit" size={20} />;
    }
    if (hasTreasurerRole) {
      return isValidCostInput ? <CheckCircle color="success" /> : null;
    }
    return <DeniedIcon />;
  }, [isLoading, hasTreasurerRole, isValidCostInput]);
  return (
    <>
      <Card
        sx={{
          p: 2,
        }}
      >
        <CardHeader title="Update Wrap Cost" />
        <CardContent>
          <FormGroup onSubmit={onSubmit}>
            <TextField
              sx={{
                my: 1,
              }}
              label={`update wrap cost${wrapCostIsLoading ? "" : ` (current cost: ${formatEther(wrapCost!)} E)`}`}
              variant="outlined"
              onChange={(e) => {
                setSendToInput(e.target.value);
              }}
              InputProps={{
                endAdornment,
              }}
            />
          </FormGroup>
        </CardContent>
        <CardActions>
          <Button
            onClick={onSubmit}
            disabled={!isValidCostInput}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </CardActions>
      </Card>
      <TransactionsModal
        open={!!pendingTransaction}
        onClose={closeTransactionModal}
        transactions={pendingTransactions}
        onTransactionConfirmed={onTransactionConfirmed}
      />
    </>
  );
};
