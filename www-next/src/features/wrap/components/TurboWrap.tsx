import { FC, useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
import { DevTipModal, TipCloseReason } from "./DevTipModal";
import { useAccount, useEnsAddress } from "wagmi";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { isAddress } from "viem";

export const TurboWrap: FC<{
  tokenIds: readonly bigint[];
  isApprovedForAll?: boolean;
  wrapCost?: bigint;
  transactionInProgress?: boolean;
  onApprove: () => void;
  onWrapTo: (o: { args: [`0x${string}`, bigint[]]; value: bigint }) => void;
  onWrap: (o: { args: [bigint[]]; value: bigint }) => void;
  nonce: number;
}> = ({
  tokenIds,
  isApprovedForAll,
  wrapCost = 0n,
  transactionInProgress,
  onApprove,
  onWrapTo,
  onWrap,
  nonce,
}) => {
  const [transferTo, setTransferTo] = useState(false);
  const [isTipRequested, setIsTipRequested] = useState(false);
  const [tipState, setTipState] = useState<{
    reason?: TipCloseReason;
    value?: bigint;
    wrapTo?: boolean;
  }>({});
  const [sendToInput, setSendToInput] = useState<string>("");
  const { data: sendTo, isLoading: ensAddressIsLoading } = useEnsAddress({
    name: sendToInput,
  });

  const { address } = useAccount();

  useEffect(() => {
    if (nonce) {
      setTipState({});
    }
  }, [nonce]);
  const onRequestWrapTip = useCallback(() => {
    setIsTipRequested(true);
  }, []);
  const onHandleTipClose = useCallback(
    async (reason: TipCloseReason, tip?: bigint) => {
      setIsTipRequested(false);
      if (reason === "confirm") {
        setTipState({
          reason,
          value: tip,
          wrapTo: transferTo && isAddress(sendTo || sendToInput),
        });
      }
    },
    [sendTo, sendToInput, transferTo],
  );
  useEffect(() => {
    if (tipState.reason === "confirm") {
      if (tipState.wrapTo && isAddress(sendTo || sendToInput)) {
        onWrapTo({
          args: [
            (sendTo || sendToInput) as `0x${string}`,
            tokenIds
              .filter((tokenId) => tokenId !== null)
              .map((n) => BigInt(n)),
          ],
          value: wrapCost * BigInt(tokenIds.length) + (tipState.value || 0n),
        });
      } else {
        onWrap({
          args: [
            tokenIds
              .filter((tokenId) => tokenId !== null)
              .map((n) => BigInt(n)),
          ],
          value: wrapCost * BigInt(tokenIds.length) + (tipState.value || 0n),
        });
      }
    }
  }, [
    tipState,
    transferTo,
    sendTo,
    tokenIds,
    onWrapTo,
    onWrap,
    wrapCost,
    sendToInput,
  ]);

  const resolvedAddress = sendTo || sendToInput;
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            turbo wrap
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            wrap all your NFTs in one click
          </Typography>
          <FormGroup>
            <FormControlLabel
              onClick={(event) => {
                event.preventDefault();
                setTransferTo(!transferTo);
              }}
              control={<Switch checked={transferTo} />}
              label={"wrap and transfer"}
            />
            <TextField
              sx={{
                my: 1,
              }}
              label="send wrapped tokens to"
              variant="outlined"
              disabled={!transferTo}
              onChange={(e) => {
                setSendToInput(e.target.value);
              }}
              InputProps={{
                endAdornment: ensAddressIsLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : sendTo ? (
                  <CheckCircle color="success" />
                ) : null,
              }}
            />
          </FormGroup>
          <Box component="div" sx={{ height: 32 }}>
            {transactionInProgress && isApprovedForAll === false && (
              <Typography variant="body2" color="text.warning">
                you must approve the contract to wrap your tokens
              </Typography>
            )}
            {!transactionInProgress &&
              isApprovedForAll === true &&
              (() => {
                if (
                  tokenIds.length &&
                  transferTo &&
                  resolvedAddress &&
                  isAddress(resolvedAddress) &&
                  resolvedAddress !== address
                ) {
                  return (
                    <Typography variant="body2" color="text.secondary">
                      {`send wrapped tokens to ${resolvedAddress}`}
                    </Typography>
                  );
                } else if (
                  sendToInput.length &&
                  transferTo &&
                  !(resolvedAddress && isAddress(resolvedAddress))
                ) {
                  return (
                    <Typography variant="body2" color="error">
                      Invalid address
                    </Typography>
                  );
                } else if (tokenIds.length) {
                  return (
                    <Typography variant="body2" color="text.secondary">
                      wrapped tokens will be sent back to your wallet
                    </Typography>
                  );
                } else {
                  return null;
                }
              })()}
          </Box>
        </CardContent>
        <CardActions>
          {isApprovedForAll === false && (
            <Button onClick={onApprove}>Approve</Button>
          )}
          <Button
            onClick={onRequestWrapTip}
            disabled={
              transactionInProgress ||
              !isApprovedForAll ||
              tokenIds.length === 0 ||
              (transferTo && !(resolvedAddress && isAddress(resolvedAddress)))
            }
          >
            {!transactionInProgress && tokenIds.length > 0
              ? `turbo wrap ${tokenIds.length} token${tokenIds.length ? "s" : ""}`
              : "no tokens to wrap"}
          </Button>
        </CardActions>
      </Card>
      <DevTipModal
        open={isTipRequested}
        handleClose={onHandleTipClose}
        numberOfTokens={tokenIds.length}
        wrapCost={wrapCost}
      />
    </>
  );
};
